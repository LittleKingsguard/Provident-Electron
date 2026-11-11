// src/main/view-record/index.ts — THE CROSSING'S SECOND DECLARATION SET: the app's VIEW RECORD (D-87, D-91).
//
// THE THREE DATA SETS THIS MODULE EXISTS FOR, AND WHY THEY COULD NOT LEAVE THE FROZEN GRAPH STORE BEFORE IT DID
// (`src/renderer/store-core-graph.ts`, the purge's last deletion): the app's PANE GEOMETRY — a pane's `width` and
// `height` (`size` until `D-189` split it), its optional `bounds` and its optional `zone`, read at
// `src/renderer/renderer.ts`'s `readPaneSize`/`readPaneBounds` and written at its `release` — the ZONE
// FAMILY, the drag flow's four stored members per zone, read by the composition's render turn (`:1799-1805`) and by
// `candidatesFor` (`:1935-1941`) — and the APPEARANCE RECORD, the mechanism's own answer for the setting the authored
// control produced (D-97, D-98). Nothing outside that store held any of them, so the store could not be deleted until
// each had an address; this module is the address. **A FOURTH SET, THE FOCUS MIRROR, LEFT WITH `D-142`**: it was a SECOND
// SPELLING of a fact `['tabs']` already owns, so the address table was three roots and every site it took with it is gone
// rather than defaulted. **AND THE DRAG'S IN-PROCESS READING IS THE FOURTH ROOT THAT STANDS NOW** (`D-132`): `['drag']` at
// `temp`, DECLARED and UNPAIRED — an address, a tier constant and a `viewDeclaredRoots()` entry, with no declaration
// behind it, because a repair whose subject is "no drag has started" would mint a placeholder for data whose absence IS
// the product.
//
// IT CONSTRUCTS NOTHING, OPENS NO FILE AND OWNS NO INSTANCE (D-63, D-64): the boot hands it the central store it already
// built the tab record's six declarations into (D-65), and this module reads and writes FOUR of that instance's roots
// through it — three paired, and the drag's `temp` root DECLARED AND UNPAIRED (D-132, D-101).
//
// **FOUR ROOTS, `['panes']`, `['zones']`, `['theme']` AND `['drag']`, AND NOT ONE ROOT WITH FOUR MEMBERS — MEASURED, NOT
// PREFERRED (D-87, D-91, D-97, D-132).**
// The tab record's pattern is ONE root with members (`['tabs']`, `['tabs','order']`, `['tabs','landing']`), and it was
// followed until the TIER decided it: a value at an address lives at ONE tier and a read can name it, so a single root
// could carry the pane geometry at `file` only by also carrying a `mem` family there — and a `mem` family can never
// come from a file (`D-84`'s own measurement, restated at clause 3 below). The measured mechanics, on the installed
// `provident-storeroom@1.9.1`, one fresh instance per arm:
//   · a nested write does NOT create its parent — `write(['view','panes'], 'file', …)` over a fresh store answers
//     `AddressNotFound: 'view' does not exist in '', it holds no keys` — so a one-root shape would need a THIRD
//     declaration minting the parent branch, and that parent's own body would be handed `undefined` at the
//     registration instant (its address holds no value, only children);
//   · a root written at `file` answers its descendants at `file` and answers `TierNotFound` at `mem`, so the two
//     families inside one value could not be read back at their own tiers.
// So each family is ONE WHOLE VALUE at ITS OWN root, under its own existence declaration — which is the tab record's
// pattern applied once per tier rather than once per family.
//
// **BOTH ROOTS STAND ON THE NORMAL CROSSING** (`createProfileStore`, `src/main/main.ts`), and D-87 records the evidence:
// the tab record — UI state with no security character — already stands there, and both of these families are the same
// kind of state; the secure crossing is the operator's security record, and a resize is not an authority act; and the
// decisive one is that THE SECURE CROSSING ALREADY HOLDS the LEGACY `file.*` ROWS these two families project — the address
// `D-78` measured and `D-81` ruled on, whose content is the frozen store's own `file.*` mirror — so the new addresses must
// stand in the OTHER store for the purge to delete that address and its rows without touching anything this pass creates
// (D-78's item (f), D-81).
import { isCommitCarrier, type TabsCommitCarrier } from '../tabs-record/index.js'
import type { TabsRecordStore } from '../tabs-record/index.js'
// **THE SHAPE'S VOCABULARY IS `src/shared/view-shape.ts`'S AND THIS MODULE RE-EXPORTS IT** (D-88): the renderer reads the
// same two families through the same member, and two realm-local copies of the types, the measured defaults and the
// per-pane derivation would be two answers to one question. Every name below keeps its site of use in this file; only its
// DECLARATION moved, which is why no cite into this module changes.
import {
  DECLARED_PANE_IDS,
  DECLARED_ZONE_IDS,
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  paneGeometryIn,
  viewPanesPlaceholder,
  viewThemePlaceholder,
  viewZonesPlaceholder,
  zoneIn,
  type ViewGeometrySource,
  type ViewPaneGeometry,
  type ViewThemeDeclaration,
  type ViewThemeRecord,
  type ViewZone,
} from '../../shared/view-shape.js'
export {
  DECLARED_PANE_IDS,
  DECLARED_ZONE_IDS,
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  paneGeometryIn,
  viewPanesPlaceholder,
  viewThemePlaceholder,
  viewZonesPlaceholder,
  zoneIn,
  type ViewGeometrySource,
  type ViewPaneGeometry,
  type ViewThemeDeclaration,
  type ViewThemeRecord,
  type ViewZone,
}
// **THE APPEARANCE MECHANISM, CONSUMED AT THE CROSSING AND NOWHERE ELSE** (D-97; `D-96`'s ruling that the mechanism is OWED
// a consumer, and `docs/specs/theme.md` §2.5 item 3's licence for a later pass to import it). The resolution is PRODUCED BY
// A CONSTRAINT REPAIR: this module is the one place `resolveTheme`/`applyThemeDeclaration` are called, the record it writes
// carries their answer, and the renderer applies that answer as provident data. **THE MECHANISM IS NOT WIDENED AND NOT
// RE-SPELLED** — it computes, this module carries, and the renderer writes.
import { applyThemeDeclaration, resolveTheme } from '../../shared/theme.js'

type Store = TabsRecordStore
/** The store handle this module works over, re-exported under this module's own name so the surface can declare it
 *  without re-deriving the package's type — `TabsRecordStore`'s own reason for existing, applied to a second module.
 *  **THE PACKAGE IS NAMED NOWHERE IN THIS FILE, AND THAT IS A CENSUS FACT AND NOT A STYLE ONE**: `tests/e2e/
 *  central-data/scenarios.test.ts` `S-9` pins the importing FILES at exactly three (the seam, the operator-settings
 *  instance and the tab record's own instance), so a fourth IMPORT of the package here would red a gating row — and would
 *  be a fourth import of a package this module does not need to name. **AND THE CENSUS READS RAW BYTES**, so this
 *  docblock names the package without ever spelling the import statement it forbids. */
export type ViewRecordStore = Store

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE ADDRESSES, THE TWO IDS AND THE MEASURED DEFAULTS
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE PANE GEOMETRY'S ROOT — ONE WHOLE VALUE AT `file`.** Its family is one member per pane id, each a
 *  `{width, height, bounds?, zone?}` record; the spelling of the leaf is this module's and is stated in
 *  `docs/L2/view-record/interface.md` §1. **NO `file.` PREFIX AND NO RESERVED ROOT**: the six `file` roots this address
 *  had to stay clear of were the FROZEN graph store's (`window·tabs·layout·settings·tracked·modules`), persisted by its
 *  `Y-2` seam through `STORE_FILE_PUT`, which projected every `file.*`-keyed spelling of the graph's translation into the
 *  operator record. **THAT PROJECTION IS DELETED AND THE SIX NAMES HAVE NO HOLDER** (`D-93`: the seam, the channel, the
 *  handlers and the projection loop all went with the store), so no root outside them is owed this collision rule any
 *  more — `['panes']` is simply the address this family declares, and a `file` root that no projection reads cannot
 *  collide with one. The reason is recorded rather than deleted, because it is why the spelling was chosen. */
export const VIEW_PANES_ADDRESS: readonly string[] = ['panes']
/** **THE PANES' EXISTENCE PAIR'S id** — exported beside the tab record's six so the boot's batch is a census a reader
 *  can name, and so no caller spells an id. */
export const VIEW_PANES_MUST_STAND_ID = 'panes-must-stand'
/** **THE ZONE FAMILY'S ROOT — ONE WHOLE VALUE AT `mem`, AND `mem` IS THE MEASUREMENT RATHER THAN A CHOICE (D-91).** The
 *  frozen store kept the four members at ONE tier and nothing else: `mem`, under a zone id, read by the render turn and by
 *  `candidatesFor`, with **no `file` copy anywhere in the tree** (`grep -rn "settings\.zone\|file\.[a-z.]*zone" src/`
 *  answers nothing) — so there is no durable image to inherit and no ascending read to collapse. A `mem` address can never
 *  come from a file (`D-84`, unmoved), which makes **a repair at the creation instant its only lawful boot source**: the
 *  family is RE-MINTED AT EVERY BOOT and the profile's bytes never carry it. That is the shape `panes-must-stand` gave at
 *  `file`, and the third clause of the convention is answered by the repair rather than deviated from.
 *  **ITS ID DOMAIN IS CLOSED, AND ITS PLACEHOLDER NAMES EVERY DECLARED ZONE — THIS DOCBLOCK'S OWN EARLIER CLAIM IS
 *  SUPERSEDED BY POINTER AND NOT REWORDED** (`D-46`, `D-151`, `D-139`). It read *"ITS IDS ARE OPEN AND ITS PLACEHOLDER
 *  NAMES NO ZONE: a zone id is the caller's own … so this module cannot name a closed set and does not try"*, and that
 *  premise is exactly what `D-139` assumed and `D-151` measured this module forbidding. The set is
 *  `src/shared/view-shape.ts`'s `DECLARED_ZONE_IDS` — the FOUR ids `top`/`bottom`/`left`/`right` since `D-181`, and
 *  `DEFAULT_ZONE_ID` went with its readers at `D-192` — the creation repair writes each declared id
 *  with an EMPTY record (`viewZonesPlaceholder`), and a caller naming any other id is REFUSED (`UNDECLARED_ZONE_REASON`)
 *  rather than silently creating a zone. **WHY IT HAD TO CLOSE**: the store creates no parent (measured at this node, and
 *  even an EMPTY family is not enough — the ZONE'S OWN NODE must stand), so `['zones', id]` must be GUARANTEED to stand
 *  for every id the route is handed, and only a closed set can guarantee one. **AND A WRITE MAY LAND AT A LEAF INSIDE THE
 *  VALUE** — a fact about the address and not about the family's identity (D-151), which is what the route's per-member
 *  leaves below are. */
export const VIEW_ZONES_ADDRESS: readonly string[] = ['zones']
/** **THE APPEARANCE FAMILY'S ROOT — ONE WHOLE VALUE AT `file`, BESIDE `['panes']`, BECAUSE APPEARANCE PREFERENCES ARE
 *  DURABLE** (`D-98`, on the user's ruling **"Appearance preferences should be durable"**). **THIS TIER WAS `mem` AT
 *  `D-97` AND THE `file` TIER IS THAT ROW OVERTURNED, NOT UNNOTICED**: `D-97` reasoned from *"the app persists no
 *  appearance setting today"* and from the ambient store's prohibition row, and the RULING answers the second ground and
 *  the ruling is the higher authority. **What that prohibition row says, precisely, and what is now false**: it denies
 *  *"a store, a persisted preference, a cookie, `localStorage`, a file write or an ambient environment read"* as a
 *  consequence of the demonstration card generalised into a shipped appearance UI, and **the clause that a durable
 *  appearance preference must not exist is FALSE for this app** — superseded BY POINTER from `D-98`, its dated text
 *  untouched (`D-46`). So the row's own words still stand where they bind, and the denial they carry no longer reaches
 *  this address.
 *
 *  **AND THE TIER IS NOW THE ONE THE STORE SAVES**: `file`-tier registration repairs ARE saved by
 *  `provident-storeroom@1.9.1` and `mem`-tier ones are not (measured, `D-97`), so the creation instant's placeholder
 *  becomes a DURABLE write and the record a file's boot datum (`D-84`'s clause-3 shape, the same as `['panes']`).
 *  **Measured on the installed package** (the probe `D-98` records): boot two answers the record a boot ONE wrote, its
 *  bytes UNMOVED across the restart; the placeholder repair fires only where the address is ABSENT; and a record whose
 *  carried declaration is out of date is still refused `stale-theme` and repaired over a restarted store. **A fresh
 *  profile therefore carries an appearance record BEFORE any act** — the creation repair's placeholder, which names no
 *  attribute and so applies nothing. */
export const VIEW_THEME_ADDRESS: readonly string[] = ['theme']
/** **THE APPEARANCE FAMILY'S EXISTENCE-AND-CONSISTENCY PAIR'S id** — one of the boot's ONE namespace (the tab
 *  record's six and this module's three), minted against that batch and spelled nowhere else. */
export const VIEW_THEME_MUST_STAND_ID = 'theme-must-stand'
/** **THE ZONE FAMILY'S EXISTENCE PAIR'S id** — one of the boot's ONE namespace (the tab record's six and this
 *  module's three), minted against that batch and spelled nowhere else. */
export const VIEW_ZONES_MUST_STAND_ID = 'zones-must-stand'
/** **THE DRAG'S IN-PROCESS READING'S ROOT — ONE WHOLE VALUE AT `temp`, AND THIS IS THE ONE FAMILY THAT IS DECLARED AND
 *  UNPAIRED** (D-132, D-101). Its family is one member per pane id, each carrying the ADJUSTABLE axis's own member —
 *  `{ width }` or `{ height }`, `D-189` — the placement the gesture read —
 *  present while a drag is in process and **ABSENT once it ends** (L2 §1, §6).
 *
 *  **WHY NO PAIR STANDS HERE, IN TWO CLAUSES.** No invariant holds the family, a `temp` reading being a gesture's
 *  transient fact that nothing else needs; and a repair's subject would be *"no drag has started"*, so a pair could only
 *  mint a placeholder for data whose ABSENCE IS THE PRODUCT. The root therefore carries an address, a tier constant and a
 *  `viewDeclaredRoots()` entry, and `viewConstraintDeclarations` gains no row.
 *
 *  **WHAT THE ENTRY BUYS IS THE FAMILY'S ONE JUDGEMENT, AND IT IS THE TIER'S**: `declaredTierLedger` keys on the roots it is
 *  HANDED rather than on the batch, so a `file` or `mem` write at this root is refused `declared-tier` ahead of any store
 *  verb — which is the whole of what a `temp` family needs (D-101).
 *
 *  **IT IS ALSO THE ONLY FAMILY WITH NEITHER A COMPOSER NOR A BOOT DATUM** (D-135, D-138): `['drag']` is a root holding one
 *  member and no sibling, so nothing is left to preserve and the first move writes the root itself. The gesture's durable
 *  half is `['panes']`' own value, written by the release's unchanged `commitPane`. **AND NO PLACEHOLDER VALUE IS EVER
 *  WRITTEN HERE**: the gesture ends with a DELETE, so the address answers `absent` once a drag is over. */
export const VIEW_DRAG_ADDRESS: readonly string[] = ['drag']

// **THE THREE MEASURED DEFAULTS ARE `src/shared/view-shape.ts`'S AND ARE RE-EXPORTED ABOVE** (D-88): the same figures the
// authored pane states, read by this module's repair (`panes-must-stand`) and by the renderer's pane read alike. Their
// measured ground — `props.size '100'`, `props.min '0'`, `props.max '200'`, and the frozen store's ZERO pane defaults,
// which made a MISSed read answer `undefined` and the release refuse `'unusable-default'` with zero writes — is recorded
// there, once, and `D-87` is where it was measured.

/** **THE REASON TOKENS THIS MODULE MINTS, AND THEY ARE THIS MODULE'S AND NOT THE STORE'S** (the `SEAT_NAME_REASON`
 *  precedent, D-76): a shape arm answers one of these before ANY store verb, so the store never answers a word this
 *  module invented. **THE BLOCK'S OLD SENTENCE — *"two per family, because each family has two distinguishable faults"* —
 *  IS SUPERSEDED IN FACT AND NOT REWORDED AWAY** (`D-46`): the two closed ID DOMAINS have each handed their family a THIRD
 *  distinguishable fault since `D-152` (zones) and since rev 13 (panes), and that fault is neither a PAYLOAD's shape nor a
 *  MEMBER's domain but the id's own DOMAIN — so the block now carries the two DOMAIN tokens beside the shape and member
 *  ones, and a reader counting three per paired id domain is reading it correctly (`D-151`, D-138). */
export const PANE_SHAPE_REASON = 'malformed-pane'
export const PANE_GEOMETRY_REASON = 'malformed-geometry'
export const ZONE_SHAPE_REASON = 'malformed-zone'
export const ZONE_MEMBER_REASON = 'malformed-zone-member'
/** **THE THIRD ZONE TOKEN, AND IT IS THE CLOSED ID DOMAIN'S** (D-151, `docs/L2/view-record/interface.md` §5):
 *  `malformed-zone` names a PAYLOAD's shape and `malformed-zone-member` a MEMBER's domain, while a WELL-FORMED id this
 *  record does not declare is NEITHER — it is a fault of the id's DOMAIN, which is why the closed set gains a member
 *  rather than an arm. The domain is judged AFTER the id's shape and BEFORE any payload, so an undeclared id answers this
 *  and never `malformed-zone`, and the act it closes is the one that would have silently created a zone (`ASM-7`).
 *  **THE SET CLOSES AT TWO SEATS AND THIS IS ONE OF THEM** (`ASM-9`): here at the route, and at `zoneNodeAdmits` for
 *  every value a `data.write` can land — a route-only closure would leave an outside writer free to mint the zone it
 *  refuses. */
export const UNDECLARED_ZONE_REASON = 'undeclared-zone'
/** **THE THIRD PANE TOKEN, AND IT IS THE CLOSED ID DOMAIN'S — THE ZONE ONE READ ONE FAMILY OVER** (D-138, `ASM-12`,
 *  `docs/L2/view-record/interface.md` §5). `malformed-pane` names a PAYLOAD's shape and `malformed-geometry` a MEMBER's
 *  domain, while a WELL-FORMED pane id this record does not declare is NEITHER: it is a fault of the id's DOMAIN, so the
 *  same reading that gave the zone family a third token gives this family one. The domain is judged AFTER the id's shape
 *  and BEFORE any payload, so an undeclared id answers this and never `malformed-pane`, and the act it closes is the one
 *  that would have silently created a pane. **THE SET CLOSES AT TWO SEATS AND THIS IS ONE OF THEM** (`ASM-14`): here at the
 *  route, and at `paneNodeAdmits` for every value a `data.write` can land — a route-only closure would leave an outside
 *  writer free to mint the pane it refuses. */
export const UNDECLARED_PANE_REASON = 'undeclared-pane'
/** **THE APPEARANCE FAMILY'S TWO TOKENS, AND THE SECOND ONE IS WHAT MAKES THE PAIR A *REPAIR* RATHER THAN A PRESENCE CHECK**
 *  (D-97). `malformed-theme` is the route's shape arm — no token that can be a setting, or no attribute name a caller can
 *  hold. `stale-theme` is the CONSTRAINT's own arm and it is not a refusal a caller can make: a record carrying a
 *  resolution the mechanism would not produce for the setting it carries is INTERNALLY CONTRADICTORY, and the pair
 *  repairs it to the current resolution rather than refusing the write that exposed it. **The token is minted here and
 *  answered by nothing else**: the crossing never says `stale-theme`, because it never judges a derivation. */
export const THEME_SHAPE_REASON = 'malformed-theme'
export const THEME_STALE_REASON = 'stale-theme'

/** The sentences, in the register of the tab record's own (`MALFORMED_ROW_MESSAGE`, `SEAT_NAME_MESSAGE`): each names the
 *  FAULT and not the act, because both routes of a family refuse the same one. */
export const PANE_SHAPE_MESSAGE = 'the pane family names no pane id, or carries no plain geometry record'
/** **THE MEMBER-DOMAIN SENTENCE, AND AT REV 16 IT SPEAKS THE RECORD'S OWN MEMBER NAMES** (`D-189`, `D-191`): a supplied
 *  `width` or `height` that is not a finite non-negative number, **both axis members supplied in one act, or the one
 *  supplied being a member the pane's own `zone` does not make ADJUSTABLE** — *"a `width` handed to a sidebar pane is a
 *  fault, not an update"*, and a pane carrying no `zone` (the stage) admits `height` and refuses `width` by the same
 *  clause, `C-12` — or a STATED `bounds` that is not two finite numbers with `min ≤ max`. **THE REFUSED-AXIS CLAUSE IS A
 *  CLAUSE ON THIS ONE TOKEN AND NO NINTH TOKEN IS MINTED**: the fault it names is a member's domain, which is what this
 *  sentence has always named. It is the panes' token and the drag's, exactly as before (`D-132`, `D-191`). */
export const PANE_GEOMETRY_MESSAGE =
  "the pane geometry carries no finite non-negative width or height, or an axis member the pane's own zone does not make adjustable, or both axis members in one act, or a bounds pair that is not two finite numbers whose min does not exceed its max"
export const ZONE_SHAPE_MESSAGE = 'the zone family names no zone id, or carries no plain zone record'
export const ZONE_MEMBER_MESSAGE =
  'the zone carries a size that is not a finite non-negative number, a distance that is not a finite number, a display that is not a string, or a slot no value the store carries'
export const UNDECLARED_ZONE_MESSAGE =
  'the zone id names no zone this record declares, and the zone family is addressed only by its declared ids'
export const UNDECLARED_PANE_MESSAGE =
  'the pane id names no pane this record declares, and the pane family is addressed only by its declared ids'
export const THEME_SHAPE_MESSAGE =
  'the appearance act carries no setting token that can be an appearance setting, or no attribute name that can be one — a route of this module writes the pair those two name and nothing else'
export const THEME_STALE_MESSAGE =
  'the appearance record carries a declaration the mechanism would not produce for the setting and the attribute it carries, so the record and its own resolution contradict each other'

/** **THE FAMILIES' OWN TIERS, EACH NAMED ONCE.** A value's tier is the address's (`guide §3.1`), and these
 *  constants are the whole of what says which — so no read, no write and no repair of this module spells a tier
 *  literal, and a family cannot half-move to the other tier. **FOUR CONSTANTS AND FOUR FAMILIES**: the drag root's word is
 *  the fourth, and the union below is derived from all of them (D-132). */
const PANES_TIER = 'file'
const ZONES_TIER = 'mem'
/** **THE APPEARANCE FAMILY'S TIER — `file`, THE USER'S RULING ON DURABILITY** (`D-98`; `mem` was `D-97`'s and is
 *  superseded by pointer). It is the same tier as `['panes']` and the same crossing, so the address a fresh boot
 *  repairs to the placeholder is the address a second boot reads back. */
const THEME_TIER = 'file'
/** **THE DRAG FAMILY'S TIER — `temp`, THE TIER THAT PERSISTS NOWHERE** (D-132). A drag is a gesture's transient fact: it is
 *  present while the gesture is in process and must be ABSENT once it ends, so a restart cannot resurrect one and a fresh
 *  profile carries no `drag` key (L2 §6). It is spelled here and nowhere else, so this family spells no tier literal. */
const DRAG_TIER = 'temp'
/** **THE TIER UNION THIS MODULE USES, DERIVED FROM THE TIER CONSTANTS AND NOT RE-SPELLED FROM THE PACKAGE'S `Tier`.** The
 *  package's own domain is `'mem' | 'file' | 'temp'`; this module needs those words and needs them to be
 *  assignable to `write`'s `tier` position, so the type is taken from the constants themselves — one spelling of each
 *  word in this file, and a fourth family would have to add its constant rather than widen a table. */
type ViewTier = typeof PANES_TIER | typeof ZONES_TIER | typeof THEME_TIER | typeof DRAG_TIER

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RECORD'S SHAPES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

// **THE SHAPE DECLARATIONS ARE `src/shared/view-shape.ts`'S AND ARE RE-EXPORTED ABOVE** (D-88): `ViewPaneGeometry`,
// `ViewZone`, `ViewThemeRecord` and `ViewGeometrySource`, with the measured ground each carries — the boundary's domain
// for a zone's opaque `slot`, the appearance record's stored derivation, and `'record'`/`'default'` naming a real
// difference. **THE MIRROR'S TWO TYPES LEFT WITH THE FAMILY** (`D-142`): a type carries no `tsc` flag, so the leftover a
// deletion must not leave is exactly the kind this line names.

export interface ViewPaneReading {
  readonly status: 'committed'
  readonly pane: ViewPaneGeometry
  readonly source: ViewGeometrySource
}

/** **ONE ZONE OUT OF A READING — and the absent arm is `null`, the measured answer `zoneIn` gives** (D-91). This reading
 *  is a family read WHOLE, and then one member of it. */
export interface ViewZoneReading {
  readonly status: 'committed'
  readonly zone: ViewZone | null
  readonly source: ViewGeometrySource
}

/** **THE WHOLE VIEW: the pane family as the record admits it, the zone family as the record admits that, and the
 *  appearance family as the mechanism's own answer stands** (D-97). **THE `source` MEMBERS ARE PER FAMILY AND NOT PER
 *  MEMBER**: a family is one value, so it either stands (and each member it names is the record's) or it
 *  does not (and every pane answers the measured default, every zone answers its absence, and the appearance family answers
 *  the placeholder that has no attribute name to apply). **THREE FAMILIES AND THREE `source` WORDS, WITH NO FOURTH MEMBER
 *  ON EITHER SIDE OF THE WIRE** (D-142). */
export interface ViewRecordReading {
  readonly status: 'committed'
  readonly panes: readonly ViewPaneGeometry[]
  readonly zones: readonly ViewZone[]
  readonly theme: ViewThemeRecord
  readonly source: {
    readonly panes: ViewGeometrySource
    readonly zones: ViewGeometrySource
    readonly theme: ViewGeometrySource
  }
}

/** **THE ANSWER A WRITE ROUTE GIVES — AND IT CARRIES NO `repaired` MEMBER, WHICH IS A DECISION AND NOT AN OMISSION**
 *  (`D-70`'s rule about a member that names nothing, read at this module's own routes). The tab record derives
 *  `repaired` because its six pairs can change a record INSIDE the commit that wrote it. This module's three pairs have
 *  TWO arms each — the address does not stand, and a standing value the read cannot state (`D-105`) — and NEITHER can
 *  fire at a route of this module's: a route writes a value its own read admits — **at rev 13 BOTH PAIRED GEOMETRY ROUTES
 *  WRITE LEAVES, one per supplied member, judged by the family's own predicate before the first store verb** (`D-151`,
 *  `ASM-8`; `D-138`, `ASM-13`), **and the appearance act composes the whole family through its ONE composer, which is a
 *  DERIVATION and stays** (`D-136`'s split) — and a read writes nothing. A `repaired` member here
 *  could therefore only ever be `false` on a `true`-shaped claim, which is why the member stays absent while the pair's
 *  second arm answers the store's own status to a caller that names the address directly. **The landing arm DOES exist and
 *  IS
 *  reachable — a `provident.data.delete` at either root is a client act on the same instance — and it is implemented and
 *  driven rather than left to a second instance's assumption; what is absent is the member, because this module's own
 *  routes cannot produce the difference the member would report.** */
export interface ViewRecordAnswer {
  readonly status: 'committed' | 'refused'
  readonly reason?: string
  readonly message?: string
  readonly address?: readonly (string | number)[] | null
}

export interface ViewRecordOptions {
  /** THE APP'S ONE STORE (D-64, D-65): the view record lives at this instance's three roots and owns no instance. */
  readonly store: Store
  /** **THE CROSSING'S DELIVERY, BUILT BEFORE THIS STORE EXISTED** (`D-219`; `docs/L3/view-record/delivery.md` §1). The
   *  registration is the CONSTRUCTION's: this object's `entries` were adopted by `cfg.listeners` when the instance was
   *  created, so the creation's repairs already delivered to it. What this record takes is the other half — the fan-out a
   *  later consumer subscribes to — and it runs no store verb to have it (`D-129`: one registration per address). */
  readonly delivery: ViewDelivery
}

/** **THE ROUTES A CLIENT NEEDS, AND FIVE OF THEM — one per act, and no act without one** (the appearance route is D-97's).
 *  The renderer reads a pane's geometry (`:1700-1722`), writes one (`:1823-1825`), reads a zone's four members twice
 *  (`:1799-1805`, `:1935-1941`) and commits the appearance act its authored control produced. `read` is ONE route
 *  because all three families are read at once by the one consumer, and `subscribe` is the push's fan-out — so no route of
 *  this module stands without an answer site, which is the defect `docs/L2/central-data/interface.md` §2 records against a
 *  bridge member nothing calls. **THE FOURTH ROUTE THAT STOOD HERE LEFT WITH ITS FAMILY AND NOTHING REPLACES IT** (`D-142`):
 *  a route that left one side alone would be a channel with a handler and no caller. */
export interface ViewRecord {
  read(): ViewRecordReading
  /** **WRITE ONE PANE'S SUPPLIED MEMBERS, AND NEVER A PATH** (D-138; `D-87`'s member rule, at the closed domain): the id
   *  names a MEMBER of the family at the one root — a DECLARED one and no other, the domain being judged after the id's
   *  shape and before any payload — and each supplied member lands as ONE LEAF WRITE of its own, at THAT MEMBER'S OWN NAME,
   *  in `ViewPaneGeometry`'s order, so no composer touches the family: a leaf write cannot erase a sibling member, cannot
   *  erase a sibling pane,
   *  and needs no copy of the family to be one delivery stale. **A MEMBER THE CALLER DOES NOT SUPPLY IS NOT WRITTEN AT
   *  ALL**, so it keeps what stands by not being touched — the standing value is no longer read, merged and rewritten, and
   *  the measured default now answers only a pane the family does not name at all (`paneGeometryIn`'s own arm, which is the
   *  read's and not this route's). **AND THE ARGUMENT IS THE RECORD'S OWN MEMBER SET** (`D-191`): `{ width?, height?,
   *  bounds? }`, with at most one axis member and that one the member this pane's `zone` makes ADJUSTABLE — `width` in a
   *  `top`/`bottom` zone, `height` in a `left`/`right` one, and `height` where `zone` is absent, the stage being
   *  sidebar-equivalent (`C-9`, `C-12`). A `width` handed to a sidebar pane is a fault and not an update: it answers
   *  `malformed-geometry`, the token this family already mints, and no ninth token arrives. */
  commitPane(id: string, geometry: unknown): ViewRecordAnswer
  /** **WRITE ONE ZONE'S SUPPLIED MEMBERS, AND NEVER A PATH** (D-151; `D-91`'s composition is superseded by pointer): the
   *  id names a MEMBER of the family at the one root — a DECLARED one and no other, the domain being judged after the id's
   *  shape and before any payload — and each supplied member lands as ONE LEAF WRITE of its own, in `ViewZone`'s order, so
   *  no composer touches the family: a leaf write cannot erase a sibling member, cannot erase a sibling zone, and needs no
   *  copy of the family to be one delivery stale. It takes one zone and not the whole family because the drag's turn names
   *  ONE zone (the caller's own declared id). **A SUPPLIED
   *  MEMBER IS JUDGED BEFORE THE FIRST VERB AND AN ABSENT ONE IS NOT WRITTEN AT ALL**, so the members that stand are the
   *  members that remain; and a zone supplying NONE writes nothing and answers `committed`. */
  commitZones(id: string, zone: unknown): ViewRecordAnswer
  /** **THE APPEARANCE ROUTE — THE USER ACTION'S ONE WRITE, AND IT WRITES THE ACT AND NOT ITS RESOLUTION** (D-97). It takes
   *  the setting TOKEN the app's authored control produced and the caller-held attribute NAME, both as the caller supplied
   *  them, and writes that pair as ONE whole legal value at the family's root. **THE RESOLUTION IS THE PAIR'S**: the engine
   *  re-runs `theme-must-stand` inside this very commit, the pair finds the pair-with-no-declaration STALE, and its repair
   *  writes the declaration `resolveTheme` + `applyThemeDeclaration` produce — so no route of this module computes a
   *  declaration, and a caller cannot spell one. That is the whole of the instruction this module answers: *no boot-time
   *  declarations; constraint repairs*.
   *
   *  **THE ATTRIBUTE NAME IS A REQUIRED ARGUMENT AND NOT A CONSTANT OF THIS MODULE**, which is the corpus's rule and not a
   *  preference: `docs/specs/theme-control.md` §2.1 item 4 and §2.4 item 2 hold the appearance control's attribute name to
   *  be a CALLER-SUPPLIED string carried by the consuming WIRING, `themeWiringRole` in `src/renderer/renderer.ts` — so this
   *  module spells no attribute name anywhere, the caller hands its own, and the mechanism echoes it by identity into the
   *  declaration the record carries. */
  commitTheme(token: string, attributeName: string): ViewRecordAnswer
  /** **THE DRAG'S MOVE — ONE PANE'S IN-PROCESS PLACEMENT, AND NEVER A PATH** (D-132, D-135, D-136). The id names a MEMBER of
   *  the `temp` family at the one root, so a caller cannot compose an address, and the value is ONE whole family the CALLER
   *  formatted: nothing stands at a sibling to preserve, so no composer touches it. **EXACTLY ONE AXIS MEMBER IS REQUIRED
   *  HERE — the pane's ADJUSTABLE one, AND ITS OWN NAME IS ITS AXIS** (`D-191`, `D-189`): a pane commit may supply NO
   *  member, because each supplied member is a leaf write of its own and the member it does not name is simply never
   *  touched, while the drag family's member IS the placement — and `undefined` is not a value the crossing carries
   *  (`isBoundary`, at this file). So `{ width }` for a `top`/`bottom` pane and `{ height }` for a sidebar pane or `pane-a`,
   *  and `bounds` never: the act carries one axis member and nothing else. **NOTHING JUDGES THE VALUE AT `temp`** (D-105):
   *  the shape arms are the whole gate and the store's own boundary is the rest, and no token of this family's own is
   *  minted — its two faults ARE the panes' two. */
  commitDrag(id: string, geometry: unknown): ViewRecordAnswer
  /** **THE DRAG'S CLEAR — THE GESTURE'S END, AND A DELETE RATHER THAN A PLACEHOLDER** (D-132, ASM-2). The address must answer
   *  `absent` once a drag is over, so no empty family is written and no boot datum is left standing. **IT TAKES NOTHING**:
   *  a `null` argument is the spelling `D-140` spent a row removing. **AND IT IS `committed` WHETHER OR NOT THE FAMILY
   *  STOOD**, which needs no arm of its own: a delete that removes nothing is the store's own success (`tiers: []`), the
   *  fact the tab record's `remove` relies on at its own already-absent branch (D-53). */
  clearDrag(): ViewRecordAnswer
  subscribe(handler: () => void): () => void
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE REPAIR'S RETURN AND THE REPAIR'S WRITE — `D-72` AND `D-73`, SPELLED BY THIS MODULE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE CREDITED ARM, AND `repairAnswer` IS ITS ONE CONSTRUCTOR IN THIS MODULE** (`D-72`): the kernel credits a repair
 *  only through `landedOp`, so a repair STATES the op its own write landed. **`op` IS A MEMBER AND NEVER A MAYBE.** */
export interface ViewRepairCredited {
  readonly ok: true
  readonly op: unknown
}

/** The declared FAILED arm. **IT IS THE ONLY OTHER LAWFUL RETURN** — the two arms are the whole set. */
export interface ViewRepairFailed {
  readonly ok: false
  readonly message: string
}

/** **A REPAIR ANSWERS ONE OF THESE TWO ARMS AND NOTHING ELSE: `undefined`, `void` AND A BARE `{ok: true}` ARE NOT
 *  WRITTEN HERE** (`D-72`), and the rule is STRUCTURAL rather than conventional — this union is `ViewRepair`'s declared
 *  return, so a repair that returns nothing is a COMPILE ERROR in this repo (`npm run typecheck`). The installed
 *  `1.9.1` credits a repair by the legs its own write wrote and would accept the sloppier answer; this tree does not
 *  write it, exactly as `TabsRepairAnswer` says at its own site. */
export type ViewRepairAnswer = ViewRepairCredited | ViewRepairFailed

/** **WHAT THE ENGINE INVOKES INSIDE THE ATTEMPT'S OWN COMMIT**: the repair's own record — whose shape differs by
 *  INSTANT, not by family — and one of the two arms. */
export type ViewRepair = (context: unknown) => ViewRepairAnswer

/** **WHAT A CONSTRAINT BODY MAY ANSWER, IN THE PACKAGE'S CLOSED THREE-ARM SET** (`guide §7.2`, `§7.6`): `true`, a
 *  repairable violation, or one no repair answers — and **THE UNREPAIRABLE ARM SPELLS `repair?: never`**, which is the
 *  whole of its job: written as a bare `{message: string}`, a `void` repair rides it (excess-property checking reads the
 *  union's WHOLE member set), so `never` is what keeps the two arms one decision. */
export type ViewConstraintAnswer =
  | true
  | { readonly message: string; readonly repair: ViewRepair }
  | { readonly message: string; readonly repair?: never }

/** One element of the batch the boot constructs the instance with (`D-65`) — the same record the tab record's six are. */
export interface ViewConstraintDeclaration {
  readonly address: readonly string[]
  readonly id: string
  readonly constraint: (context: unknown) => ViewConstraintAnswer
}

/** **THE REPAIR'S CREDITED ARM, IN ITS ONE HOME** (`D-72`): every credited answer this module gives is some call of
 *  this function's answer, so the shape is spelled once and the two repairs cannot drift apart in what they answer. */
const repairAnswer = (receipt: unknown): ViewRepairCredited => ({
  ok: true,
  op: plain(receipt) ? receipt['op'] : null,
})

/** **THE MODULE'S ONE REPAIR WRITE — AND IT BRANCHES ON THE RECORD'S OWN `write` MEMBER, NEVER ON THE INSTANT'S NAME**
 *  (`D-69`'s two arities, `D-73`'s one required carrier). **A REGISTRATION-INSTANT RECORD CARRIES A `write` FUNCTION and
 *  the store's own THREE positions** — measured on the installed `1.9.1`, one fresh instance per arm, the record being
 *  `{address, id, tier, value, op, pending, write}` with `write` a function and `tier: null`; a fourth position there is a
 *  `TypeError` thrown before any store act, so naming the commit would refuse the registration rather than make the
 *  family stand. **A LANDING-INSTANT RECORD CARRIES NO `write` and the commit it is part of MUST be named at `write`'s
 *  FOURTH position** — `writeJoinedAt`'s required second position, so a repair that names no commit is an ARITY ERROR
 *  here rather than a convention a reviewer holds. **BOTH ARMS ANSWER THROUGH `repairAnswer`**, and the failed arm is
 *  STATED rather than fallen into: a repair that reached no route and holds no store says so. */
const writeWholeValue =
  (getStore: () => Store | null) =>
  (context: unknown, address: readonly string[], tier: ViewTier, whole: unknown): ViewRepairAnswer => {
    const route = plain(context) ? context['write'] : undefined
    if (typeof route === 'function') {
      const routeWrite = route as (target: readonly string[], onTier: string, value: unknown) => unknown
      // THREE POSITIONS, AND NO FOURTH: supplying the commit here is the refusal this branch exists to avoid.
      return repairAnswer(routeWrite(address, tier, whole))
    }
    const store = getStore()
    if (store === null) {
      return { ok: false, message: 'the view record does not stand, and this repair reached no write route' }
    }
    if (!isCommitCarrier(context)) {
      // A LANDING record that names no commit is not written here (`D-73`): the failed arm, never a second attempt's write.
      return { ok: false, message: 'the family does not stand, and this repair was handed no commit to create it in' }
    }
    return repairAnswer(writeJoinedAt(store, context, address, tier, whole))
  }

/** **THE ONE CALL A LANDING-INSTANT REPAIR NAMES ITS COMMIT AT — `write`'s FOURTH POSITION, AND IT IS REQUIRED** (`D-73`).
 *  It is exported for the reason the tab record's `writeJoined` is: a signature a battery can annotate against is a
 *  signature that cannot be widened silently (`npm run typecheck:tests` reds the moment `commit` becomes optional).
 *  **`isCommitCarrier` IS THE TAB RECORD'S AND IS IMPORTED RATHER THAN RE-SPELLED** — that predicate mirrors the
 *  installed package's own `commitPositionRefusal` check for check (`Proxy`, own-`pending`, the pair-list shape), and a
 *  second copy of it here would be a second answer to "what is a commit" (`D-73`; the one-spelling rule). */
export const writeJoinedAt = (
  store: Store,
  commit: TabsCommitCarrier,
  address: readonly string[],
  tier: ViewTier,
  value: unknown,
): unknown => store.write(address, tier, value, commit)

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// ADMISSION — THE ONE PARSE OF EACH FAMILY, FROM A VALUE AND NEVER FROM A HANDLE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

const plain = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

const finiteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)

/** **THE STORE'S BOUNDARY DOMAIN, SPELLED HERE BECAUSE A REPAIR'S VALUE IS REFUSED AT IT** (measured on the installed
 *  `1.9.1`: `ValueRefusedAtBoundary`, *"the crossing carries strings, booleans, finite numbers, plain objects and
 *  arrays"*). A zone's `slot` is opaque to this module but not to the crossing, so a slot carrying a `null` or an
 *  `undefined` anywhere would make the WHOLE family unwritable and the refusal would arrive as a thrown boundary form
 *  rather than as this module's own sentence. The predicate is total and walks the value once. */
const isBoundary = (value: unknown): boolean => {
  if (typeof value === 'string' || typeof value === 'boolean') return true
  if (typeof value === 'number') return Number.isFinite(value)
  if (Array.isArray(value)) return value.every(isBoundary)
  if (plain(value)) return Object.values(value).every(isBoundary)
  return false
}

/** **ONE PANE'S GEOMETRY, ADMITTED FIELD BY FIELD, OR `null`.** A record with no usable `width` or no usable `height` is
 *  not a geometry — **both axis members are REQUIRED and both must be finite and non-negative** (`D-189`) — while
 *  `bounds` and `zone` are OPTIONAL and LAWFUL WHERE ABSENT, each ENFORCED WHERE STATED (`D-129`, `D-186`): a stated
 *  `bounds` must be a pair of two finite numbers whose `min` does not exceed its `max`, and a stated `zone` must name one of
 *  `DECLARED_ZONE_IDS` — **so a pane naming an UNDECLARED zone is refused here rather than silently DROPPED**, which is
 *  `D-105`'s fault and the reason `PANE_UNUSABLE_MESSAGE` gains its clause (`C-9`, `D-183`). This is the same admission
 *  `rowOf` performs for a tab, and its answer feeds both the READ (a member it cannot admit is not a pane the family
 *  names) and the FAMILY JUDGE — `panesAdmitAt` at a record's own node, never a composition, because rev 13's route writes
 *  LEAVES and composes nothing (`D-138`). */
const paneOf = (id: string, held: unknown): ViewPaneGeometry | null => {
  if (!plain(held)) return null
  const width = held['width']
  const height = held['height']
  if (!finiteNumber(width) || width < 0) return null
  if (!finiteNumber(height) || height < 0) return null
  const pane: {
    id: string
    width: number
    height: number
    bounds?: { readonly min: number; readonly max: number }
    zone?: string
  } = { id, width, height }
  // **`bounds` IS JUDGED ONLY WHERE STATED** (`D-186`): a zone-resident pane's clamp is the LAYOUT's, and its absence is
  // the ordinary state rather than a fault to repair — no repair of this module ever invents one, and none may read
  // `['zones']` to compute one.
  if (Object.hasOwn(held, 'bounds')) {
    const bounds = held['bounds']
    if (!plain(bounds)) return null
    const min = bounds['min']
    const max = bounds['max']
    if (!finiteNumber(min) || !finiteNumber(max) || min > max) return null
    pane.bounds = { min, max }
  }
  // **`zone` SELECTS WHICH AXIS IS ADJUSTABLE AND IT NAMES A DECLARED ID OR NOTHING** (`C-9`, `D-183`, `D-189`): an absent
  // member is the STAGE and is lawful; a member naming an undeclared id is the fault this parse refuses.
  if (Object.hasOwn(held, 'zone')) {
    const zone = held['zone']
    if (typeof zone !== 'string' || !DECLARED_ZONE_IDS.includes(zone)) return null
    pane.zone = zone
  }
  return pane
}

/** **THE PANE FAMILY AS ONE VALUE** — `null` when the address holds nothing this module can read as a family (`D-83`'s
 *  `viewFrom`, applied to this family), and otherwise every pane the value names whose geometry this module admits. A
 *  member the family names and this parse cannot admit is DROPPED from the read's answer, which is the disposition
 *  `viewFrom` takes for a seat naming no row: a family is the panes it can state, and the missing one answers the
 *  measured default rather than a guess. */
const panesFrom = (whole: unknown): ViewPaneGeometry[] | null => {
  if (!plain(whole)) return null
  const panes: ViewPaneGeometry[] = []
  for (const id of Object.keys(whole)) {
    if (id.length === 0) continue
    const geometry = paneOf(id, whole[id])
    if (geometry !== null) panes.push(geometry)
  }
  return panes
}

/** **ONE ZONE, ADMITTED MEMBER BY MEMBER, OR `null` — and every member is OPTIONAL, which is the measurement and not a
 *  leniency** (D-91): the tree's own writers seed `size`+`display` for three zones and `slot` alone for another, and its
 *  two zone batteries write `slot`+`distance` with neither of the other two. So presence is tested per member
 *  (`Object.hasOwn`), a member that IS present must be usable — a size that is not a finite non-negative number, a
 *  distance that is not finite, a display that is not a string, a slot the crossing's boundary would refuse — and a member
 *  that is absent is simply not carried. **A RECORD CARRYING NO ADMISSIBLE MEMBER IS STILL A ZONE**: an empty record under
 *  a zone id is the caller having named a zone and stored nothing about it yet, which is a state the family may hold.
 *  (`paneOf` cannot admit that state because a pane's two axis members are required; a zone's are not.) */
const zoneOf = (id: string, held: unknown): ViewZone | null => {
  if (!plain(held)) return null
  const zone: { id: string; slot?: unknown; distance?: number; size?: number; display?: string } = { id }
  if (Object.hasOwn(held, 'slot')) {
    const slot = held['slot']
    if (!isBoundary(slot)) return null
    zone.slot = slot
  }
  if (Object.hasOwn(held, 'distance')) {
    const distance = held['distance']
    if (!finiteNumber(distance)) return null
    zone.distance = distance
  }
  if (Object.hasOwn(held, 'size')) {
    const size = held['size']
    if (!finiteNumber(size) || size < 0) return null
    zone.size = size
  }
  if (Object.hasOwn(held, 'display')) {
    const display = held['display']
    if (typeof display !== 'string') return null
    zone.display = display
  }
  return zone
}

/** **THE ZONE FAMILY AS ONE VALUE** — `null` when the address holds nothing this module can read as a family, and otherwise
 *  every zone the value names whose record this module admits. A member the family names and this parse cannot admit is
 *  DROPPED (`panesFrom`'s disposition): a family is the zones it can state, and the one it cannot answers its absence
 *  rather than a guess. */
const zonesFrom = (whole: unknown): ViewZone[] | null => {
  if (!plain(whole)) return null
  const zones: ViewZone[] = []
  for (const id of Object.keys(whole)) {
    if (id.length === 0) continue
    const zone = zoneOf(id, whole[id])
    if (zone !== null) zones.push(zone)
  }
  return zones
}

/** **THE ZONE FAMILY HAS NO COMPOSER, AND THE COMPOSER THAT STOOD HERE IS DELETED WHOLE WITH ITS ONLY HELPER**
 *  (`composeZones`/`zoneValueOf`, `D-151` H7, `D-139`). It merged a caller's members over what the zone stood at and
 *  carried every SIBLING zone along, because one write at the family's root replaces the family whole. The route now
 *  writes ONE LEAF PER SUPPLIED MEMBER (`[VIEW_ZONES_ADDRESS[0], id, member]`), and a leaf write cannot drop a sibling
 *  member, cannot drop a sibling zone, and needs no copy of the family to be anything: so nothing is composed, nothing can
 *  be one delivery stale, and this helper has no reader after it (`D-135`, `D-138`). **`zoneOf`/`zonesFrom` keep their
 *  readers** (the read and the admission). **AND THE SENTENCE THIS TOMBSTONE ONCE ENDED WITH — *"`composePanes` is
 *  untouched, its own leaf write being `D-138`'s and not this module's"* — IS ITSELF SUPERSEDED AND CORRECTED IN PLACE**
 *  (`D-46`, `D-138`): the panes family's own leaf write landed at rev 13, `composePanes` is deleted at the tombstone
 *  below, and a reader asking whether any composer still stands in this file should find this sentence instead of the old
 *  one — the file must not deny its own body. */

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE APPEARANCE FAMILY — THE MECHANISM CONSUMED ONCE, THE DERIVATION STORED, AND THE PAIR THAT JUDGES AGREEMENT
// (D-97; `D-96`'s ruling, `docs/specs/theme.md` §2.5 item 3's licence, `D-82` clause 1)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE RECORD'S TWO CARRIED INPUTS, AS THE STORE HOLDS THEM — `null` where the value names neither.** The setting and
 *  the attribute name are the pair the mechanism resolves; both are written as ABSENCE when they are `null`, because the
 *  crossing's boundary refuses `null` (`D-87`, `D-91`), and both read back as `null` here so no caller sees the difference
 *  between "absent" and "empty" — the mechanism declares those two the same thing (`resolveTheme` answers `null` for `''`). */
const carriedThemePair = (held: Record<string, unknown>): { token: string | null; attribute: string | null } => ({
  token: typeof held['token'] === 'string' && held['token'] !== '' ? held['token'] : null,
  attribute: typeof held['attribute'] === 'string' && held['attribute'] !== '' ? held['attribute'] : null,
})

/** **THE RECORD'S DERIVATION — `resolveTheme` AND `applyThemeDeclaration`, CALLED, AND THE ONLY SITE IN THE TREE THAT CALLS
 *  THEM** (D-97): the renderer no longer computes a declaration, it applies one. Three statements, each the mechanism's:
 *  the token is normalised to `resolveTheme`'s `setting` member (a string, or `null` for the empty setting), the
 *  attribute name is carried as given, and the declaration is `applyThemeDeclaration`'s answer for exactly that pairing,
 *  **copied member by member so no caller holds the mechanism's own object**.
 *
 *  **THE ENVIRONMENT CLAIM IS OMITTED, AND THAT IS A MEASUREMENT RATHER THAN A SIMPLIFICATION.** `resolveTheme`'s `env`
 *  argument is *"a CALLER CLAIM ABOUT AN ENVIRONMENT, never an OS behaviour this repo can observe"* (`docs/specs/theme.md`
 *  §2.3 item 2), the browser's media-query surface is banned corpus-wide (`U-THEME-CONTROL`'s prohibition row R-2 names it
 *  beside the ambient storage route; neither token is re-spelled here), and no surface of this tree can reach one from the
 *  MAIN process — the crossing is where the pair runs and it holds no window, so no window can be asked. So the claim is OMITTED, `resolveTheme` answers its own `degraded-env` reading, and nothing is
 *  fabricated to fill it. **AND IT MOVES NOTHING IN THE DECLARATION, WHICH IS WHY THE RECORD DOES NOT CARRY IT**:
 *  `applyThemeDeclaration` is handed the SETTING and never the claim, so `prefersDark` and `source` have no effect on the
 *  three members stored here — a record carrying them would be a member naming nothing (`D-70`). */
const derivedTheme = (held: Record<string, unknown>): ViewThemeRecord => {
  const pair = carriedThemePair(held)
  const resolution = resolveTheme(pair.token, undefined)
  const declaration = applyThemeDeclaration(pair.attribute, resolution.setting)
  return {
    token: resolution.setting,
    attribute: pair.attribute,
    declaration: { name: declaration.name, value: declaration.value, removal: declaration.removal },
  }
}

/** **THE RECORD AS THE CROSSING MUST CARRY IT: EVERY `null` MEMBER IS WRITTEN AS ABSENCE.** `null` is refused at the
 *  boundary (`measured`), so the placeholder's three-member declaration is written as `{value: '', removal: true}` with
 *  no `name`, and a record naming no setting writes no `token`.
 *  The admission maps both absences back to `null`, so the value standing at the address and the reading are one fact. */
const composeTheme = (record: ViewThemeRecord): Record<string, unknown> => {
  const whole: Record<string, unknown> = {}
  if (record.token !== null) whole['token'] = record.token
  if (record.attribute !== null) whole['attribute'] = record.attribute
  const declaration: Record<string, unknown> = {}
  if (record.declaration.name !== null) declaration['name'] = record.declaration.name
  declaration['value'] = record.declaration.value
  declaration['removal'] = record.declaration.removal
  whole['declaration'] = declaration
  return whole
}

/** **A STRUCTURAL COMPARISON, AND IT IS NOT `JSON.stringify` — MEASURED, NOT PREFERRED.** The crossing NORMALISES the key
 *  order of a plain object on the way in (measured on the installed `1.9.1`: a value written as `{value, removal}` reads
 *  back as `{removal, value}`), so a serialisation comparison of "what I would write" against "what stands" answers
 *  `false` over a record that agrees member for member — and the pair would then repair a legal record on every boot and
 *  every write. So the comparison walks the value: key sets by name, order never consulted, arrays by position. */
const sameThemeValue = (left: unknown, right: unknown): boolean => {
  if (left === right) return true
  if (left === null || right === null) return false
  if (typeof left !== 'object' || typeof right !== 'object') return false
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) return false
    if (left.length !== right.length) return false
    return left.every((entry, index) => sameThemeValue(entry, right[index]))
  }
  const leftRecord = left as Record<string, unknown>
  const rightRecord = right as Record<string, unknown>
  const leftKeys = Object.keys(leftRecord)
  if (leftKeys.length !== Object.keys(rightRecord).length) return false
  return leftKeys.every((key) => Object.hasOwn(rightRecord, key) && sameThemeValue(leftRecord[key], rightRecord[key]))
}

/** **THE APPEARANCE FAMILY AS ONE VALUE, OR `null`** — `null` when the address holds nothing this module can read as the
 *  family, and the family otherwise. **ITS DECLARATION MEMBER IS REQUIRED AND IS NOT DEFAULTED**: a value carrying no
 *  readable `{value, removal}` pair is not the record this module writes, so it is not the family (the `panesFrom`
 *  disposition, applied to a family whose derived member is the whole point). A record that arrives so broken from a
 *  caller's own `provident.data.write` is repaired inside that commit by the pair — a read never repairs, and never hides
 *  a fault behind an invented declaration. */
const themeFrom = (whole: unknown): ViewThemeRecord | null => {
  if (!plain(whole)) return null
  const held = whole['declaration']
  if (!plain(held)) return null
  const value = held['value']
  const removal = held['removal']
  if (typeof value !== 'string' || typeof removal !== 'boolean') return null
  const pair = carriedThemePair(whole)
  const name = typeof held['name'] === 'string' && held['name'] !== '' ? held['name'] : null
  return { token: pair.token, attribute: pair.attribute, declaration: { name, value, removal } }
}

/** **THE FOUR FAMILIES' ONE READ EACH, AT THEIR OWN TIER.** A read that refuses answers the family's declared default —
 *  the arm NO declaration can reach, because a refused read has no address that a repair could have made stand, which is
 *  `D-84`'s own measurement about a refused construction and `D-85`'s about the read-side defaults being kept rather
 *  than deleted. **NOTHING IS WRITTEN HERE**: a read that MISSed leaves the miss, and it is the CREATION repair that
 *  makes a family stand (clause 1), never a read (`D-82` clause 4: no write on read). */
const panesOf = (store: Store): { panes: ViewPaneGeometry[]; source: ViewGeometrySource } => {
  try {
    const read = panesFrom(store.read(VIEW_PANES_ADDRESS, PANES_TIER))
    if (read !== null) return { panes: read, source: 'record' }
  } catch {
    // a refused read is the declared-default arm below, and never a write
  }
  return { panes: [], source: 'default' }
}

const zonesOf = (store: Store): { zones: ViewZone[]; source: ViewGeometrySource } => {
  try {
    const read = zonesFrom(store.read(VIEW_ZONES_ADDRESS, ZONES_TIER))
    if (read !== null) return { zones: read, source: 'record' }
  } catch {
    // as above: the declared empty family answers, and nothing is repaired at a read
  }
  return { zones: [], source: 'default' }
}

/** **THE APPEARANCE FAMILY'S READ — AND ITS DECLARED DEFAULT IS THE PLACEHOLDER, WHICH HAS NO ATTRIBUTE NAME TO APPLY.** The
 *  default answers only where the family does not stand at all, which the creation repair makes unreachable on any boot
 *  whose batch carried the pair; it exists so the read is total, exactly as the other two families' defaults do. */
const themeOf = (store: Store): { theme: ViewThemeRecord; source: ViewGeometrySource } => {
  try {
    const read = themeFrom(store.read(VIEW_THEME_ADDRESS, THEME_TIER))
    if (read !== null) return { theme: read, source: 'record' }
  } catch {
    // as above: the declared placeholder answers, and nothing is repaired at a read
  }
  return { theme: viewThemePlaceholder(), source: 'default' }
}

/** **THE PANE FAMILY HAS NO COMPOSER EITHER, AND THE COMPOSER THAT STOOD HERE IS DELETED WHOLE** (`composePanes`,
 *  `D-138` H16, `D-135`, `D-139`). It took the family as the read answered it, kept every SIBLING pane and merged the
 *  caller's two members over what the named pane stood at, because ONE write at `['panes']` replaces the family whole and
 *  a width-only act would otherwise have dropped the standing `bounds`. **THE ROUTE NOW WRITES ONE LEAF PER SUPPLIED
 *  MEMBER** — `[VIEW_PANES_ADDRESS[0], id, 'width']` or `'height'`, then the same leaf with `'bounds'` carrying its PAIR — so a leaf
 *  write cannot drop a sibling member, cannot drop a sibling pane, and needs no copy of the family to be anything:
 *  nothing is composed, nothing can be one delivery stale, and this composer has no reader after it (`D-135`, `D-138`).
 *  **NOTHING DIES WITH IT**, unlike the zone composer's helper: it had no helper of its own. `paneOf`/`panesFrom` (the
 *  admission and the family parse), `panesOf` (the read), `defaultPaneGeometry` (the derivation, `viewPanesPlaceholder`
 *  above and `paneIdOf`'s default) and `nodeOf`/`writeInstant`/`writeWholeValue`/`repairAnswer` (the two value arms and
 *  the one repair path) all keep their readers. **AND IT IS A HUNK AND NOT A COMPILER'S REMINDER**: `tsc` does not flag
 *  a leftover here because `noUnusedLocals` is off at this checkout, the fact the zone deletion records for its own
 *  (`D-9`, `D-152`). **THE ONE MOVEMENT IT LEAVES IS UNDER THE READ AND NOT IN IT** (`ASM-13`): a member `paneOf` ignores
 *  used to be DROPPED by the next commit's whole-family rewrite and now SURVIVES one, because nothing re-writes the
 *  family from a read copy any more. */

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE VALUE ARMS — A FAMILY THAT STANDS BUT CARRIES A VALUE ITS OWN READ CANNOT STATE IS REFUSED (D-105)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE INSTANT A BODY IS ASKED AT, READ OFF ITS OWN CONTEXT — MEASURED, NOT ASSUMED.** A REGISTRATION instant hands
 *  the body `{address, tier, value, attempt, op}` with `tier`, `attempt` and `op` ALL NULL; a WRITE's landing instant
 *  hands `{address, attempt, op, tier, value}` with all three SET. So `tier` non-null is the write's own instant, and
 *  **THE DISTINCTION IS LOAD-BEARING RATHER THAN TIDY**: a body answering the unrepairable arm at a registration
 *  instant REFUSES THE CONSTRUCTION — `provident-storeroom@1.9.2` throws `ConstraintRefusedAtRegistration` before the
 *  instance exists (measured 2026-11-03 at this head, over a profile seeded by hand with a value the arm refuses), so a
 *  corrupt value in the profile's BYTES would make the app unable to start. There is no standing record for a rollback to
 *  protect at that instant, so the value arms answer `true` there and refuse only where a write's own rollback exists. */
const writeInstant = (context: unknown): boolean => plain(context) && context['tier'] !== null && context['tier'] !== undefined

/** **THE NODE A PASS IS AT, RELATIVE TO ITS FAMILY'S ROOT — AND THE MEASUREMENT IS WHY THIS IS A SUBTRACTION AND NOT A
 *  GUESS.** A pass is asked at the WRITE's own address (`context.address`), not at the pair's: a write at
 *  `['panes','pane-a','width']` hands this family's pair the context `{address: ['panes','pane-a','width'], tier: 'file',
 *  …}`, so the family's root is a PREFIX of it and the remainder names the node the value is. The store's own address
 *  domain is THREE segments, so a remainder is at most two long (`['pane-a']`, `['pane-a','width']`): nothing deeper can
 *  reach a body at all. `null` where the context names no address under this root, which is an arm no measured act
 *  reaches and the one that must not refuse. */
const nodeOf = (context: unknown, root: readonly string[]): readonly string[] | null => {
  const at = plain(context) ? context['address'] : undefined
  if (!Array.isArray(at) || at.length < root.length) return null
  for (let index = 0; index < root.length; index += 1) if (at[index] !== root[index]) return null
  return at.slice(root.length) as readonly string[]
}

/** The boundary pair a pane's `bounds` is, spelled once so the three nodes that carry it — the record, the member, its
 *  two fields — cannot disagree: **this is `paneOf`'s own test, lifted onto the node a pass is handed**. */
const boundsAdmit = (value: unknown): boolean => {
  if (!plain(value)) return false
  const min = value['min']
  const max = value['max']
  return finiteNumber(min) && finiteNumber(max) && min <= max
}

/** **ONE PANE AT ONE NODE OF ITS OWN SHAPE.** A pane's record carries the two axis members and, optionally, `bounds` and
 *  `zone` (`paneOf`), and each is a node of its own — so a write AT the record is judged by `paneOf`, a write at `width` or
 *  at `height` by that member's own rule, a write at `bounds` (or at one of its two fields) by `boundsAdmit`, and a write at
 *  `zone` by the declared domain it names (`D-189`, `D-186`). **AND THE ID'S DOMAIN IS JUDGED HERE AT EVERY DEPTH**
 *  (`D-138` H14, `D-151` H5 one family over): beside the id's SHAPE test, an id outside `DECLARED_PANE_IDS` answers `false`,
 *  so `panesAdmitAt` refuses a family NAMING an undeclared pane exactly as it refuses
 *  a write AT one. **THAT IS THE CLOSURE'S SECOND SEAT AND IT IS DELIBERATE** (`ASM-14`): closing the route alone would
 *  leave a `data.write` free to mint the very pane the ruling refuses, and the family's own judge is the only thing an
 *  outside writer meets. **A MEMBER THE SHAPE NO LONGER NAMES IS REFUSED BY THE SAME TOTALITY**: `['panes', id, 'size']` now
 *  answers `false`, because `size` is a member `D-189` split into two and a leaf write carrying it is the retired spelling
 *  (`D-105`, `D-186`). */
const paneNodeAdmits = (node: readonly string[], value: unknown): boolean => {
  const id = node[0]
  if (typeof id !== 'string' || id.length === 0) return false
  if (!DECLARED_PANE_IDS.includes(id)) return false
  if (node.length === 1) return paneOf(id, value) !== null
  const member = node[1]
  if (node.length === 2) {
    if (member === 'width' || member === 'height') return finiteNumber(value) && value >= 0
    if (member === 'bounds') return boundsAdmit(value)
    if (member === 'zone') return typeof value === 'string' && DECLARED_ZONE_IDS.includes(value)
    return false
  }
  return member === 'bounds' && (node[2] === 'min' || node[2] === 'max') && finiteNumber(value)
}

/** **THE PANE FAMILY AT ONE NODE — the root's is the family WHOLE**, one member per pane id and every one of them a
 *  record `paneOf` admits; every node below it is `paneNodeAdmits`' own. A value naming a member the read would DROP
 *  is not this family, which is the fault the arm refuses: the read is total and answers the measured default for what
 *  it cannot state, so a dropped member is a pane the app had and no longer has. */
const panesAdmitAt = (node: readonly string[], value: unknown): boolean => {
  if (node.length > 0) return paneNodeAdmits(node, value)
  if (!plain(value)) return false
  for (const id of Object.keys(value)) if (!paneNodeAdmits([id], value[id])) return false
  return true
}

/** **ONE ZONE AT ONE NODE OF ITS OWN SHAPE** — the four members are independently OPTIONAL and each present one must be
 *  usable (`zoneOf`'s own per-member rules), a record carrying none of them is still a zone, and `slot` is opaque to
 *  this module but not to the crossing (`isBoundary`). **AND THE ID'S DOMAIN IS JUDGED HERE AT EVERY DEPTH** (D-151
 *  H5): beside the id's SHAPE test, an id outside `DECLARED_ZONE_IDS` answers `false`, so `zonesAdmitAt` refuses a family
 *  NAMING an undeclared zone exactly as it refuses a write AT one. **THAT IS THE CLOSURE'S SECOND SEAT AND IT IS
 *  DELIBERATE** (`ASM-9`): closing the route alone would leave a `data.write` free to mint the very zone the ruling
 *  refuses, and the family's own judge is the only thing an outside writer meets. */
const zoneNodeAdmits = (node: readonly string[], value: unknown): boolean => {
  const id = node[0]
  if (typeof id !== 'string' || id.length === 0) return false
  if (!DECLARED_ZONE_IDS.includes(id)) return false
  if (node.length === 1) return zoneOf(id, value) !== null
  const member = node[1]
  if (node.length === 2) return zoneMemberAdmits(member, value)
  return member === 'slot' && isBoundary(value)
}

/** One zone member's own domain, by the name it is carried under — `zoneOf`'s four rules, each at its own node. */
const zoneMemberAdmits = (member: string | undefined, value: unknown): boolean => {
  if (member === 'slot') return isBoundary(value)
  if (member === 'distance') return finiteNumber(value)
  if (member === 'size') return finiteNumber(value) && value >= 0
  return member === 'display' && typeof value === 'string'
}

/** **THE ZONE FAMILY AT ONE NODE — the root's is the family WHOLE**, one member per zone id, each a record `zoneOf`
 *  admits. The declared ids each stand as an EMPTY record after the repair (`viewZonesPlaceholder`), so a family the
 *  repair wrote is admitted member by member; the root's own test is TOTAL over an empty family, which is the arm `ASM-9`
 *  keeps: **a `data.write` that replaces the family with a record naming NONE of the declared ids is ADMITTED**, because
 *  the family is judged by the ids it NAMES and the record's existence is the REPAIR's subject and not the value's — so
 *  what the closure buys is the creation plus an honest `AddressNotFound` at the next leaf write (`D-135`), never a
 *  silently wrong value. */
const zonesAdmitAt = (node: readonly string[], value: unknown): boolean => {
  if (node.length > 0) return zoneNodeAdmits(node, value)
  if (!plain(value)) return false
  for (const id of Object.keys(value)) if (!zoneNodeAdmits([id], value[id])) return false
  return true
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE THREE DECLARATIONS — CLAUSE 1 OF THE CONVENTION: EXISTENCE, REPAIRED WITH A PLACEHOLDER — AND THE APPEARANCE
// FAMILY'S SECOND ARM, CONSISTENCY, WHICH IS THE ONE THE INSTRUCTION NAMES (D-97)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE TWO SENTENCES THE VALUE ARMS ANSWER, IN THE REGISTER OF THE ROUTES' OWN** (`PANE_GEOMETRY_MESSAGE` and the
 *  others above): each names the FAMILY and the FAULT a standing value carries, never the act — a write refused at this
 *  arm and a value read back from the profile's bytes are one fault, wherever they came from (`D-105`). **NO ROUTE OF
 *  THIS MODULE ANSWERS EITHER** — and since rev 13 that is true of the pane one for the leaf writes' reason and not a
 *  composer's (`D-138`, `D-151`): a route writes leaves, each judged by the same predicate this arm applies at that node,
 *  so only a caller that names the store's own address — `provident.data.*`, or the crossing's raw surface — can meet
 *  these. **THE THIRD SENTENCE LEFT WITH THE
 *  FAMILY IT NAMED** (`D-142`), because no declaration stands at that address to answer it. */
export const PANE_UNUSABLE_MESSAGE =
  'the pane geometry carries a member that is no geometry — no finite non-negative width or height, or a bounds pair of two finite numbers whose min does not exceed its max, or a zone the pane names that this record does not declare, or a pane id this record does not declare'
export const ZONE_UNUSABLE_MESSAGE =
  'the zone family holds a member that is no record, or a zone carrying a size that is not finite and non-negative, a distance that is not finite, a display that is not a string, or a slot the crossing refuses, or a zone id this record does not declare'

/** **`panes-must-stand` — THE PANE GEOMETRY IS AN ENFORCED INVARIANT, NOT A SIDE EFFECT OF THE FIRST DRAG.**
 *
 *  **IT JUDGES `context.value` AND NEVER REACHES FOR THE INSTANCE** — `tabsMustStand`'s shape, and the reason is
 *  measured rather than stylistic: at the CONSTRUCTION instant the boot's holder is genuinely unassigned
 *  (`src/main/main.ts` binds it only after `createProfileStore` returns), so a body that read through a handle would
 *  abstain at the exact instant it is the only one that can act. A registration instant hands the body the CURRENT VALUE
 *  at its own address — measured on the installed `1.9.1`, the record being `{address, tier, value, attempt, op}` with
 *  `tier: null` — so absence needs no handle, and the handle is wanted by the REPAIR alone, which runs at an instant where
 *  the route is on the record or one exists.
 *
 *  **THE FIRST ARM IS ABSENCE, AND IT IS THE FAMILY ROOT'S** (`D-138` H13, `D-151` H4 one family over) — this is the hunk
 *  without which the per-member write cannot land at all. `context.value` is the value the act LANDED (`guide §7.6`) and
 *  the pair asked here sits at an ANCESTOR of the act's address (`D-56`), so a LEAF write hands this body a SCALAR:
 *  answering that as absence would write the measured default AT THE ROOT and REPLACE the whole pane family — the caller's
 *  own value and every sibling pane with it — inside a commit that still answers `committed`. So absence is answered only
 *  at `node === null || node.length === 0`, and a write AT or BELOW a pane id is judged at its own node and NEVER
 *  REPAIRED.
 *  **THE SECOND IS THE VALUE'S, AND IT IS `D-105`'s** (it was `D-87`'s owed clause): a value that STANDS and names a
 *  member `paneOf` cannot state is REFUSED, with no repair, because the read would DROP that member and answer the
 *  measured default while `source.panes` still said `'record'`. **IT IS ONE DECLARATION AT ONE NODE AND NOT A SECOND
 *  DECLARATION WEARING THIS ONE'S SENTENCE** — the boundary `D-84` drew for `operator-exclusion-must-stand` and `D-83`
 *  drew for the `order` seat's own pair: `panesAdmitAt` is the SAME admission the read uses, and the node it judges is
 *  the write's own address, so a write at `['panes','pane-a']` is judged as that member.
 *
 *  **AND THE SENTENCE THAT ONCE STOOD IN THIS BODY — *"THE EXISTENCE ARM ABOVE STAYS FIRST AND IS UNCHANGED"* — IS
 *  SUPERSEDED, NOT ANNOTATED** (`D-46` covers `D-n` rows; this is a comment in code, so it is rewritten in place): it was
 *  true only while every panes act wrote the family whole, and it became FALSE the moment `commitPane` wrote a leaf,
 *  because the arm it protected is exactly the one a leaf write falsifies. */
const panesMustStand = (getStore: () => Store | null) => (context: unknown): ViewConstraintAnswer => {
  const held = plain(context) ? context['value'] : undefined
  const node = nodeOf(context, VIEW_PANES_ADDRESS)
  // **ABSENCE IS JUDGED AT THE ROOT** (D-138 H13): only the family's own address holding nothing is the fault the repair
  // answers. A value landed at or below a pane id is a member of the family, and a scalar there is the shape a leaf write
  // legitimately carries — never the absence of the family.
  if ((node === null || node.length === 0) && !plain(held)) {
    return {
      message: 'the pane geometry does not stand',
      repair: repairPanes(getStore),
    }
  }
  // **THE VALUE ARM (`D-105`), AT THE NODE THE WRITE IS AT.** A pane whose `width` is a string, a member that is no record
  // at all, a bounds pair whose `min` exceeds its `max`, a `zone` naming an undeclared id, or an id this record does not
  // declare is a family the read can only answer by DROPPING the member — and a dropped member answers the measured
  // default, so the app loses the geometry it had while `source` still says `'record'`. Refused with no repair, so the
  // store's rollback leaves the standing family and the profile's bytes exactly as they were.
  if (node === null || panesAdmitAt(node, held)) return true
  if (!writeInstant(context)) return true
  return { message: PANE_UNUSABLE_MESSAGE }
}

/** **THE PANES' REPAIR: EVERY DECLARED PANE ID WITH ITS DECLARED DEFAULT GEOMETRY, AS ONE WHOLE LEGAL VALUE** —
 *  `{'pane-a': { width: 100, height: 100, bounds: { min: 0, max: 200 } }, 'pane-menus': { width: 100, height: 100,
 *  zone: 'top' }}` at the family's own root and its own tier, written through this module's ONE repair-write path. **IT
 *  PERFORMS THE THING IT KEYS** (the `D-85` pattern): the repair does not assert that a pane record stands, it CREATES
 *  each declared one with its geometry, which is the node a leaf write at `['panes', id, member]` stands under (`D-138`,
 *  `D-183`).
 *
 *  **IT WRITES BOTH AXIS MEMBERS OF BOTH PANES AT `DEFAULT_PANE_SIZE`** (`D-191` as CORRECTED at `D-192`), and the value is
 *  built from `DECLARED_PANE_IDS` rather than composed, so the set and the placeholder cannot drift. **AND IT NEVER READS
 *  `['zones']`** — that is `D-186`'s constraint and not a preference: the top zone's width is derived from the window and
 *  stored nowhere, so there is no stored max to copy, and a repair reading the other family would be this corpus's first
 *  family-crossing repair storing a figure the layout already computes. The zone-resident pane's clamp is the LAYOUT's
 *  (`max-width`/flex against the zone's extent), which is why its `bounds` is absent and lawful.
 *
 *  **THE BYTES DO MOVE AT THIS REV, WHICH IS THE ONE THING THE OLD SENTENCE DENIED**: `pane-a`'s stored member is RENAMED
 *  (`size: 100` → `height: 100`, `D-189`) and a `width` is minted from the same figure, so a profile written by an earlier
 *  head carries a member this parse no longer admits. `paneOf` therefore drops that member from the READ while the family
 *  still STANDS, and the repair does not rewrite it: the repair fires only where the address is ABSENT, and rewriting a
 *  state a writer stated is the second-authority class `C-9` refuses. A fresh profile — every row's, and every boot that
 *  meets an absent family — carries the value above. */
const repairPanes = (getStore: () => Store | null) => (context: unknown): ViewRepairAnswer =>
  writeWholeValue(getStore)(context, VIEW_PANES_ADDRESS, PANES_TIER, viewPanesPlaceholder())

/** **`zones-must-stand` — THE ZONE FAMILY'S EXISTENCE, AND ITS PLACEHOLDER IS EVERY DECLARED ZONE ID WITH AN EMPTY
 *  RECORD** (D-151; `D-91`'s *"the family that names no zone"* is SUPERSEDED BY POINTER and not reworded, `D-46`).
 *
 *  **THE PLACEHOLDER MINTS NO MEMBER, WHICH IS THE HALF OF `D-91` THAT STANDS.** The zone family has NO default value
 *  anywhere in the tree: the frozen store held none, a read that MISSed its tier answered `undefined`, the render turn
 *  handed that `undefined` straight to its layout call, and `candidatesFor` answered `[]` — so a repair minting a geometry
 *  (`{width: 100}` or the demo's `160`) would make the repair and the read two authorities over one question. What it
 *  writes is therefore EVERY DECLARED ZONE ID WITH AN EMPTY RECORD — four ids since `D-181`, `{'top': {}, 'bottom': {},
 *  'left': {}, 'right': {}}` — and not `{}`: each DECLARED id with an EMPTY record, because `{}` IS a zone this
 *  module admits (`zoneOf(id, {})` answers `{id}`) and the record it creates is the node a LEAF write needs standing under
 *  it. `panes-must-stand`'s shape, with a declared-empty family where that family's placeholder is the measured default.
 *
 *  **THE EXISTENCE ARM IS THE FAMILY ROOT'S, AND `nodeOf` IS TAKEN FIRST** (D-151 H4) — this is the hunk without which the
 *  per-member write cannot land at all. `context.value` is the value the act LANDED (`guide §7.6`) and the pair asked
 *  here sits at an ANCESTOR of the act's address (`D-56`), so a LEAF write hands this body a SCALAR: answering that as
 *  absence would write the placeholder AT THE ROOT and REPLACE the whole family — the caller's own value included —
 *  inside a commit that still answers `committed`. So absence is answered only at `node === null || node.length === 0`,
 *  and a write AT or BELOW a zone id is judged at its own node and NEVER REPAIRED.
 *
 *  **IT JUDGES `context.value` AND NEVER REACHES FOR THE INSTANCE**, `panesMustStand`'s shape and its measured reason: at
 *  the construction instant the boot's holder is unassigned, so a handle-reading body would abstain at the one instant it
 *  is the only one that can act. **THE SECOND ARM IS THE VALUE'S (`D-105`, and now the DOMAIN'S too)**: a family that
 *  STANDS and carries a member `zoneOf` cannot admit — or names an undeclared zone id — is REFUSED with no repair, where
 *  before it was the read's dropped-member disposition, and the disposition is exactly why the arm is owed rather than
 *  cheap: the dropped member answers its absence, so the app lost a zone it had while `source.zones` still said
 *  `'record'`. **A ZONE THAT CARRIES NOTHING IS STILL LEGAL** (`{}` at a declared zone id), because that state is the
 *  family's own shape and not a fault. */
const zonesMustStand = (getStore: () => Store | null) => (context: unknown): ViewConstraintAnswer => {
  const held = plain(context) ? context['value'] : undefined
  const node = nodeOf(context, VIEW_ZONES_ADDRESS)
  // **ABSENCE IS JUDGED AT THE ROOT** (D-151 H4): only the family's own address holding nothing is the fault the repair
  // answers. A value landed at or below a zone id is a member of the family, and a scalar there is the shape a leaf write
  // legitimately carries — never the absence of the family.
  if ((node === null || node.length === 0) && !plain(held)) {
    return {
      message: 'the zone family does not stand',
      repair: repairZones(getStore),
    }
  }
  // **THE VALUE ARM (`D-105`), AT THE NODE THE WRITE IS AT.** A zone whose `size` is a string, a member that is no
  // record at all, a `slot` the crossing refuses, or an id this record does not declare is a family the read can only
  // answer by DROPPING the member — and a dropped member answers its absence, so the app loses a zone it had while
  // `source` still says `'record'`. Refused with no repair, so the store's rollback leaves the standing family and the
  // profile's bytes exactly as they were.
  if (node === null || zonesAdmitAt(node, held)) return true
  if (!writeInstant(context)) return true
  return { message: ZONE_UNUSABLE_MESSAGE }
}

/** **THE ZONES' REPAIR: EVERY DECLARED ZONE ID WITH AN EMPTY RECORD, AS ONE WHOLE LEGAL VALUE** — the FOUR
 *  `{'top': {}, 'bottom': {}, 'left': {}, 'right': {}}` at the family's own root and its own tier, through the module's
 *  one repair-write path. **IT PERFORMS THE THING IT KEYS** (the `D-85` pattern): the repair does not assert that a zone
 *  record stands, it CREATES each declared one, which is what makes `['zones', id]` a node the route's leaf writes can land
 *  under (D-151). It mints no MEMBER, so it is not a second authority beside the read; and because the tier is `mem`,
 *  nothing of it reaches the profile (D-84, measured at this address). **AND THE READ VOCABULARY MOVED WITH IT** (D-151
 *  (b)): `read().zones` names each declared zone where the family answered none, while `zoneIn`'s `null` starts meaning
 *  *"an id this record does not declare"* — the two states told apart with NO new member on the reading, and no reader's
 *  output moved (both zone readers answer `undefined`/`[]` on a memberless zone exactly as they did on an absent one). */
const repairZones = (getStore: () => Store | null) => (context: unknown): ViewRepairAnswer =>
  writeWholeValue(getStore)(context, VIEW_ZONES_ADDRESS, ZONES_TIER, viewZonesPlaceholder())

/** **`theme-must-stand` — THE APPEARANCE RECORD HAS TWO ARMS, AND THE SECOND IS THE WHOLE OF THE INSTRUCTION (D-97).**
 *
 *  **THE FIRST ARM IS EXISTENCE**, `tabs-must-stand`'s and `panes-must-stand`'s: a value that is not a plain record — the
 *  address holding nothing, a primitive, an array — is the fault the pair names, and the repair writes the PLACEHOLDER,
 *  which is the mechanism's own answer for the absent pair and carries no attribute name, so nothing can be applied from
 *  it.
 *
 *  **THE SECOND ARM IS STALENESS, AND IT IS A CONSTRAINT OVER A *DERIVATION*, WHICH NOTHING ELSE IN THIS MODULE JUDGES.** A
 *  record that STANDS but whose carried declaration is not the one the mechanism would produce for the setting and the
 *  attribute it carries is INTERNALLY CONTRADICTORY: it names a resolution for a token it no longer carries — a record
 *  written by an older head, by a caller's own `provident.data.write`, or by the ROUTE below, whose whole write is the
 *  caller's pair and no declaration at all. So the pair re-derives from the value's OWN two members and compares
 *  STRUCTURALLY (`sameThemeValue`; the crossing normalises key order, measured). Equal answers `true`, and the record
 *  stands; unequal is `stale-theme` and the repair writes the derivation — **so the resolution is produced by a constraint
 *  repair and by nothing else**, which is the shape the instruction asks for: *no boot-time declarations; use constraint
 *  repairs*.
 *
 *  **IT JUDGES `context.value` AND NEVER REACHES FOR THE INSTANCE** — `panesMustStand`'s shape and its measured reason (the
 *  boot binds its holder only after `createProfileStore` returns, so a handle-reading body abstains at the one instant it
 *  is the only one that can act). **AND THE HANDLE IS WANTED BY THE REPAIR ALONE**, which runs at an instant where one
 *  exists or the record lends it a route. */
const themeMustStand = (getStore: () => Store | null) => (context: unknown): ViewConstraintAnswer => {
  const held = plain(context) ? context['value'] : undefined
  if (!plain(held)) {
    return { message: 'the appearance record does not stand', repair: repairTheme(getStore) }
  }
  if (sameThemeValue(composeTheme(derivedTheme(held)), held)) return true
  return { message: THEME_STALE_MESSAGE, repair: repairTheme(getStore) }
}

/** **THE APPEARANCE FAMILY'S REPAIR: THE MECHANISM'S ANSWER FOR WHAT THE VALUE CARRIES, AS ONE WHOLE LEGAL VALUE** — and it
 *  is ONE body for both arms on purpose. A value that stands is re-derived from its own token and attribute name; a value
 *  that does not stand is derived from the empty pair, which is the mechanism's answer for `(null, null)` and therefore
 *  the placeholder. **NO MEMBER IS JUDGED HERE**: the body cannot disagree with the pair above about what a legal value is,
 *  because both read the same derivation and the same composer, and the write goes through the module's ONE repair-write
 *  path (`writeWholeValue`), answering the credited arm through `repairAnswer` (`D-72`, `D-73`). */
const repairTheme = (getStore: () => Store | null) => (context: unknown): ViewRepairAnswer => {
  const held = plain(context) ? context['value'] : undefined
  const whole = composeTheme(derivedTheme(plain(held) ? held : {}))
  return writeWholeValue(getStore)(context, VIEW_THEME_ADDRESS, THEME_TIER, whole)
}

/** **THE BATCHED DECLARATIONS, COLLECTED BY THE BOOT** (D-65's first act; D-87's second set; D-91's third family). The boot gathers these
 *  beside the tab record's six and constructs the central store ONCE with the whole batch, so a constraint is a
 *  DECLARATION here rather than a constructor call, and the two modules' ids stand in ONE namespace without a repeated
 *  spelling. **THE ORDER IS THE DEPENDENCY ORDER OF THE THREE FAMILIES AND NOTHING MORE**: no pair's subject is
 *  another's, so the panes pair stands first only because its root is the one the app writes most.
 *
 *  **THE RETURN IS TYPED** where the package's own licence would admit `void` (`D-72`): every element is a
 *  `ViewConstraintDeclaration`, so a body or a repair that answers nothing is a COMPILE ERROR here. **THREE ROWS STAND,
 *  AND THE FOURTH LEFT WITH ITS FAMILY**, nothing having been re-ordered in its place (`D-142`). */
export function viewConstraintDeclarations(getStore: () => Store | null): readonly ViewConstraintDeclaration[] {
  return [
    { address: VIEW_PANES_ADDRESS, id: VIEW_PANES_MUST_STAND_ID, constraint: panesMustStand(getStore) },
    { address: VIEW_ZONES_ADDRESS, id: VIEW_ZONES_MUST_STAND_ID, constraint: zonesMustStand(getStore) },
    { address: VIEW_THEME_ADDRESS, id: VIEW_THEME_MUST_STAND_ID, constraint: themeMustStand(getStore) },
  ]
}

/** **ONE DECLARED ROOT AS ANOTHER MODULE READS IT — THE ADDRESS AND THE FAMILY'S OWN TIER** (`D-101`). The tier
 *  is the one the address is pinned to (`guide §3.1`), and this module is its authority: the tier
 *  constants above are the only spelling of any of those two words in this file, so a pair here cannot
 *  disagree with what this module's own reads, writes and repairs actually do. */
export interface ViewDeclaredRoot {
  readonly address: readonly string[]
  readonly tier: ViewTier
}

/** **THE THREE PAIRED ROOTS `viewConstraintDeclarations` DECLARES, EACH WITH THE TIER IT IS DECLARED AT, PLUS THE ONE ROOT
 *  THAT IS DECLARED AND UNPAIRED** (`D-101`, `D-132`).
 *
 *  **IT IS NOT A SECOND SPELLING OF THE ADDRESSES**: every `address` below is the exported constant the batch
 *  above uses, and every `tier` is the constant that batch's own pair writes at — so a family that moves tier
 *  moves here without a word, and `tests/integration/central-data/declared-root.test.ts`'s set row refuses the
 *  day one of the two lists gains an entry the other does not have (`D-101`). **THE FOURTH ENTRY IS THE DRAG ROOT AND IT
 *  HAS NO PAIR BEHIND IT, WHICH IS LAWFUL RATHER THAN AN OMISSION**: no invariant holds a `temp` reading, and a repair whose
 *  subject is "no drag has started" could only mint a placeholder for data whose ABSENCE is the product — so the entry is
 *  the whole of it, and what it buys is the family's ONE judgement, which is the tier's (`declaredTierLedger` keys on the
 *  roots it is HANDED rather than on the batch, so a `file` or `mem` write at `['drag']` is refused `declared-tier` ahead
 *  of any store verb).
 *
 *  **THE TWO LISTS ARE ONE EDIT** (`D-142`, `D-101`): a declaration and its entry leave in the same hunk, because an
 *  entry outliving its declaration hands the guard a tier for a family that is gone, and a declaration outliving its
 *  entry leaves the family standing undeclared with no root for the guard's sentence to name. **AND AN ENTRY WITHOUT A
 *  DECLARATION IS THE ONE LAWFUL ASYMMETRY**, stated here so a reader does not read the rule as forbidding it.
 *
 *  **ITS CALLER IS THE `data.*` SURFACE, AND THE REASON IS ONE DEFECT.** While the surface wrote a tier of its
 *  own, a `data.write` at a root this file declares at one tier created a version of it at the other:
 *  the family's `read()` answered that family's `default` word from that instant on, a restart did not heal it and
 *  a `data.delete` at the root removed nothing. The surface can refuse that only where it can be TOLD which
 *  roots are declared and at which tier, and this is that telling — the module's own, from its own constants. A root
 *  NO crossing declares is admitted to the store verb and judged by the store's own constraints and nothing else, which
 *  is the arm the deleted address is measured at. */
export function viewDeclaredRoots(): readonly ViewDeclaredRoot[] {
  return [
    { address: VIEW_PANES_ADDRESS, tier: PANES_TIER },
    { address: VIEW_ZONES_ADDRESS, tier: ZONES_TIER },
    { address: VIEW_THEME_ADDRESS, tier: THEME_TIER },
    { address: VIEW_DRAG_ADDRESS, tier: DRAG_TIER },
  ]
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RECORD OVER THE CENTRAL INSTANCE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **WHICH AXIS A PANE'S `zone` MAKES ADJUSTABLE — ONE DECLARED NODE'S ONE MEMBER, READ FOR JUDGEMENT AND NEVER MERGED
 *  INTO THE WRITE** (`D-191`, `D-186`, `D-189`, `C-11`). `width` under `top`/`bottom`, `height` under `left`/`right`, and
 *  **`height` where the `zone` member ITSELF is absent**, because `C-9` makes an absent member the STAGE and `C-12` makes a
 *  stage pane sidebar-equivalent — so a stage pane adjusts its height as `pane-a` always has.
 *
 *  **A JUDGEMENT READ IS NOT A COMPOSER** (`D-135`, `D-138`): the composer's reason was a MERGE over a copy of the family,
 *  and this reads one member of one declared pane and copies nothing.
 *
 *  **AND A PANE WHOSE RECORD CANNOT BE READ OR ADMITTED LEAVES THE AXIS ARM NOTHING TO JUDGE**, so it answers `null` and the
 *  member then lands BY ITS OWN NAME with only the store's own `AddressNotFound` to answer — a hole rev 16 NAMES rather
 *  than hides, reachable only by an outside writer removing a declared pane's node (`D-105`). */
const adjustableMemberOf = (store: Store, id: string): 'width' | 'height' | null => {
  let held: unknown
  try {
    held = store.read([VIEW_PANES_ADDRESS[0] as string, id], PANES_TIER)
  } catch {
    return null
  }
  const pane = paneOf(id, held)
  if (pane === null) return null
  const zone = pane.zone
  if (zone === undefined) return 'height'
  return zone === 'top' || zone === 'bottom' ? 'width' : 'height'
}

/** **ONE HANDLE PER SUBSCRIPTION PER ADDRESS, MINTED HERE — MEASURED, NOT PREFERRED** (the tab record's `handleFor`, whose
 *  reading is that `register` REPLACES the function under a handle and `unlisten` withdraws the handle WHOLE, so one
 *  spelled name starves a second subscriber). **AND THE SPELLING CAN NEVER EQUAL A CONSTRAINT `id`**, which is the one
 *  cross-kind rule that survives (`D-71`): this module's three are `panes-must-stand`, `zones-must-stand` and
 *  `theme-must-stand`, and the tab record's six are its own, while these handles carry a FIXED `view-record:` prefix no
 *  id has, a MINTED ORDINAL that only grows, and the address the handle is bound at. **EACH OF THIS MODULE'S THREE
 *  CARRIES THE `-must-stand` SUFFIX NO TAB-RECORD ID REPEATS** (D-97's is the third), and the fourth that stood here
 *  left with its family (`D-142`). */
let issuance = 0
const handleFor = (address: readonly string[]): string => {
  issuance += 1
  return 'view-record:' + String(issuance) + '@' + address.join('/')
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE DELIVERY — BUILT BEFORE THE STORE, ADOPTED BY IT (`D-219`; `docs/L3/view-record/delivery.md` §1–§3)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **THE FOUR ROOTS THIS MODULE DECLARES, IN ONE ARRAY, AND THAT IS `D-137`'s RULE KEPT RATHER THAN REPEALED**: *"a root the
 *  array omits is a write the renderer NEVER HEARS"*. What moved is WHERE the list is consumed — `cfg.listeners` at the
 *  construction instead of a `subscribe` loop after it — so a fifth root added later is still ONE edit (`D-137`, `D-219`).
 *  **IT IS NOT A SECOND SPELLING OF THE ADDRESSES**: every element is one of the four exported constants above, and
 *  `viewDeclaredRoots()` carries the same four with their tiers. */
const VIEW_DECLARED_ADDRESSES: readonly (readonly string[])[] = [
  VIEW_PANES_ADDRESS,
  VIEW_ZONES_ADDRESS,
  VIEW_THEME_ADDRESS,
  VIEW_DRAG_ADDRESS,
]

/** **ONE `cfg.listeners[]` ELEMENT — THREE OWN MEMBERS WITH THE THIRD REQUIRED** (`guide §6`, `:533`–`:560`; `D-219`). A
 *  two-member element is refused `AddressMalformed` (subject `listeners`) before any filesystem act, so this is not a shape
 *  a caller may narrow: `address` is ONE address, `handle` the string `handleFor` minted for it, and `listener` the function
 *  the adopted handle fires with that address as its one argument. **IT CARRIES NO VALUE AND NEVER A READING** (`D-92`). */
export interface ViewDeliveryEntry {
  readonly address: readonly string[]
  readonly handle: string
  readonly listener: (address: readonly string[]) => void
}

/** **THE CROSSING'S DELIVERY — TWO HALVES OF ONE THING, BUILT BEFORE THE STORE EXISTS** (`D-219`; §1). `entries` is what
 *  `createProfileStore`'s `listeners` adopts, so a creation delivery has a destination from the instant a repair writes;
 *  `subscribe` is the fan-out a later consumer takes, and it runs no store verb — the construction already took the one
 *  registration this crossing is allowed (`D-129`, `D-71`). */
export interface ViewDelivery {
  readonly entries: readonly ViewDeliveryEntry[]
  subscribe(handler: () => void): () => void
}

/** **THE DELIVERY THE BOOT BUILDS BEFORE `createProfileStore` AND HANDS TO IT** (`D-219`; `docs/L3/app-shell/delivery.md`
 *  §3). `sink` is the app's TOTAL, UNINTERPRETED destination: it is handed the ADDRESS the delivery carried — no reading,
 *  no family, no formatted value — and the consumer's only correct answer to it is its own re-read (`D-92`, `D-137`).
 *
 *  **THE ENTRY'S BODY IS ONE ACT AND TWO GUARANTEES.** It **writes nothing** — a listener body's write opens a commit of
 *  its own inside the one that fired it (`guide §6.5` item 1) — and **it contains its own throw**, because at a
 *  registration instant an uncontained throw refuses the act at rank `21` `ListenerBodyThrew`, which at the creation means
 *  `storeCreate` refuses and the app takes `D-80`'s fatal arm (`guide §6`, `:513`–`:516`, `D-124` item 2).
 *
 *  **THE ORDER INSIDE THE BODY IS THE FAN-OUT, THEN THE SINK, AND THE TWO CANNOT DISAGREE**: a subscriber standing hears
 *  the delivery first and the app's sink is called after it, on every delivery, armed or not — so a queue's `held` list and
 *  a subscriber's calls are two readings of ONE event and never two paths through different code. In the app exactly one
 *  destination stands (the sink: `main()` registers no subscriber), so no delivery is duplicated (`D-92`).
 *
 *  **AND THE FOUR HANDLES ARE MINTED HERE AND NEVER WITHDRAWN**: the entry the construction adopts is the instance's for
 *  the instance's life, which is the app's, so no second subscriber is possible and the starvation `D-71` measured has
 *  nothing to guard — while the SPELLING is unmoved, because the reason for a minted ordinal is `register`'s replacement
 *  and `unlisten`'s whole-withdrawal and neither stopped being true of the package (`D-71`). */
export function createViewDelivery(sink: (address: readonly string[]) => void): ViewDelivery {
  // THE FAN-OUT'S OWN LIST: one entry per subscriber, appended and dropped locally, and never a store act (`D-71`).
  const handlers: (() => void)[] = []
  const notify = (address: readonly string[]): void => {
    for (const handler of [...handlers]) {
      try {
        handler()
      } catch {
        // THE CALLER'S THROW STOPS AT THE FAN-OUT: the family moved and the delivery happened, and the subscriber's own
        // failure is the subscriber's (`guide §6.5a`, `D-105`).
      }
    }
    sink(address)
  }
  const entries: ViewDeliveryEntry[] = VIEW_DECLARED_ADDRESSES.map((address) => ({
    address,
    handle: handleFor(address),
    listener: (delivered: readonly string[]): void => {
      try {
        notify(delivered)
      } catch {
        // THE ENTRY CONTAINS ITS OWN THROW (`D-124`, `G-2`): an uncontained one refuses the act that fired it at rank `21`.
      }
    },
  }))
  return {
    entries,
    subscribe(handler: () => void): () => void {
      // ONE ENTRY APPENDED TO ONE LIST AND ONE REMOVAL RETURNED (`D-71`, §3): the withdrawal is LOCAL, idempotent, and runs
      // no store verb — the registration the construction adopted is not this subscription's to withdraw.
      handlers.push(handler)
      let live = true
      return () => {
        if (!live) return
        live = false
        const at = handlers.indexOf(handler)
        if (at >= 0) handlers.splice(at, 1)
      }
    },
  }
}

/** **THE VIEW RECORD OVER THE CENTRAL INSTANCE** (D-64, D-65, D-87; the appearance family is D-97's): this
 *  module constructs nothing and owns no file — it is handed the app's one store and reads and writes its FOUR roots
 *  through it, the drag's `temp` root among them (D-132). */
export function createViewRecord(options: ViewRecordOptions): ViewRecord {
  const standing: Store = options.store
  // THE DELIVERY THE CONSTRUCTION ADOPTED (`D-219`): this record reads the other half of it and takes no registration.
  const delivery: ViewDelivery = options.delivery

  const reading = (): ViewRecordReading => {
    const panes = panesOf(standing)
    const zones = zonesOf(standing)
    const theme = themeOf(standing)
    return {
      status: 'committed',
      panes: panes.panes,
      zones: zones.zones,
      theme: theme.theme,
      source: { panes: panes.source, zones: zones.source, theme: theme.source },
    }
  }

  return {
    read(): ViewRecordReading {
      // **A READ WRITES NOTHING** (D-82 clause 4): a MISSed family answers its declared default and the CREATION repair is
      // what makes it stand, so no re-derivation runs on a read — the arm the corpus measured a whole clause on.
      return reading()
    },

    commitPane(id: string, geometry: unknown): ViewRecordAnswer {
      // ── THE ID'S SHAPE ARM AND THEN ITS DOMAIN ARM, BEFORE ANY PAYLOAD AND BEFORE ANY STORE VERB (`D-138` H11) ──
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      // **THE ID'S DOMAIN IS PART OF WHAT AN ID MUST BE, SO IT IS JUDGED HERE AND BEFORE THE PAYLOAD** (`ASM-12`): a
      // well-formed id this record does not declare is refused rather than silently creating a pane. A leaf write needs
      // `['panes', id]` to STAND and the store creates no parent, so the declared set is the whole of what the route may be
      // handed — and this is one of the closure's TWO seats, the other being `paneNodeAdmits` (`ASM-14`). `commitZones`' arm,
      // one family over.
      if (!DECLARED_PANE_IDS.includes(id)) {
        return {
          status: 'refused',
          reason: UNDECLARED_PANE_REASON,
          message: UNDECLARED_PANE_MESSAGE,
          address: [VIEW_PANES_ADDRESS[0] as string, id],
        }
      }
      const value: unknown = geometry
      if (!plain(value)) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      // **A SUPPLIED MEMBER MUST BE USABLE, AND AN ABSENT ONE SIMPLY IS NOT WRITTEN** — the member a route does not name is
      // the member this act leaves STANDING, and the member it names is judged before the first store verb. **AT REV 16 THE
      // ACT SPEAKS THE RECORD'S OWN MEMBER NAMES**: `{ width?, height?, bounds? }`, with **AT MOST ONE AXIS MEMBER** — at
      // any instant exactly one axis is the pane's and the other is the zone's (`D-189`'s table) — and **that one the member
      // the pane's own `zone` makes ADJUSTABLE** (`D-191`). `{ size, axis }` is refused because it states one fact twice and
      // lets a caller contradict the pane's `zone`; a member the zone does not make adjustable is *"a `width` handed to a
      // sidebar pane is a fault, not an update"*, and a pane carrying no `zone` (the stage) admits `height` and refuses
      // `width` by the same clause (`C-12`). **BOTH AXIS MEMBERS IN ONE ACT IS THE SAME REFUSAL, AND IT MINTED NO NINTH
      // TOKEN**: it is a clause on `malformed-geometry`, which names a member's domain. EVERY SUPPLIED MEMBER IS JUDGED
      // HERE, BEFORE THE FIRST STORE VERB, which is what keeps a data fault from splitting an act.
      const supplied: { width?: number; height?: number; bounds?: { min: number; max: number } } = {}
      const suppliesWidth = Object.hasOwn(value, 'width')
      const suppliesHeight = Object.hasOwn(value, 'height')
      if (suppliesWidth) {
        const width = value['width']
        if (!finiteNumber(width) || width < 0) {
          return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_PANES_ADDRESS[0] as string, id] }
        }
        supplied.width = width
      }
      if (suppliesHeight) {
        const height = value['height']
        if (!finiteNumber(height) || height < 0) {
          return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_PANES_ADDRESS[0] as string, id] }
        }
        supplied.height = height
      }
      if (suppliesWidth && suppliesHeight) {
        return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_PANES_ADDRESS[0] as string, id] }
      }
      if (suppliesWidth || suppliesHeight) {
        // THE PANE'S `zone`, READ OFF ITS OWN RECORD AT THE ACT'S INSTANT — the judgement and never a second write (`D-191`).
        const adjustable = adjustableMemberOf(standing, id)
        const named: 'width' | 'height' = suppliesWidth ? 'width' : 'height'
        if (adjustable !== null && adjustable !== named) {
          return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_PANES_ADDRESS[0] as string, id] }
        }
      }
      if (Object.hasOwn(value, 'bounds')) {
        const bounds = value['bounds']
        const min = plain(bounds) ? bounds['min'] : undefined
        const max = plain(bounds) ? bounds['max'] : undefined
        if (!finiteNumber(min) || !finiteNumber(max) || min > max) {
          return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_PANES_ADDRESS[0] as string, id] }
        }
        supplied.bounds = { min, max }
      }
      // **ONE LEAF WRITE PER SUPPLIED MEMBER, ONE LEAF PER MEMBER AT THAT MEMBER'S OWN NAME** (`D-138` H11, `D-191`,
      // `D-151`'s shape one family over): `width`, then `height`, then `bounds`, each at the family's own tier and each
      // handing THAT MEMBER's own value — `['panes', id, 'width']`, `['panes', id, 'height']`, `['panes', id, 'bounds']`,
      // and NOTHING IS TRANSLATED ON THE WIRE, because the member's name is its axis. **A MEMBER THE ACT DOES NOT NAME IS NOT
      // WRITTEN AT ALL and keeps standing**, so a `top` pane's stored `height` survives a width commit untouched — the memory
      // `D-189` asked for, proven at the wire rather than asserted at the record. A leaf write cannot drop a sibling member
      // and cannot drop a sibling pane, so nothing is composed and nothing can be one delivery stale (`D-135`, `D-138`) —
      // which is why `composePanes` is deleted whole, and why **NO `panesOf` READ STANDS ON THIS PATH**. **`BOUNDS` IS ONE
      // MEMBER AND NOT TWO FIELD WRITES** (`ASM-13`): the pair goes as the pair, so a mixed `{min: 300}` over a standing
      // `max: 200` is unreachable — `paneNodeAdmits` admits `['panes', id, 'bounds']` through `boundsAdmit`, the same pair
      // `paneOf` applies, and the payload's own arm above requires both members with `min ≤ max`.
      //
      // **A REFUSAL AFTER THE FIRST LEAF LEAVES THE FIRST LANDED, AND THAT IS ADMISSIBLE RATHER THAN ATOMISM MISSED**
      // (`D-138` H12): (i) every supplied member is judged above, by the same predicate the pair applies at that node
      // (`paneNodeAdmits`), so no DATA fault can split an act; (ii) the arm that can still refuse is the store's OWN
      // BOUNDARY — the pane's node removed by an outside writer between the two writes — and a landed leaf is a state the
      // pair ADMITS, `paneOf` requiring both axis members and both standing whichever order they land in; (iii) the answer
      // names the LEAF that refused, so a caller reads back what landed; and (iv) **THE INTERMEDIATE IS THE STATE THE DRAG
      // PRODUCES ON PURPOSE** — `{width: new, bounds: old}` IS every width-only act's landing, the release turn being the
      // only producer under `src/`, so a split act and a complete one are indistinguishable to a reader. **ATOMICITY WOULD
      // COST THE COMPOSER**: one write at `['panes', id]` REPLACES the pane whole (`D-135`), so it would have to merge over
      // a copy of what stands — `composePanes` under a new name.
      //
      // **ZERO SUPPLIED MEMBERS WRITES NOTHING AND ANSWERS `committed`**: the declared pane's node already stands with its
      // geometry, which IS the state that act names — the tab record's "a delete that removes nothing is the store's own
      // success" (`D-53`) read at this family, and the drag's own `clearDrag` reading. **AND A MEMBER THE SHAPE NO LONGER
      // NAMES — `size` — IS NOT ONE OF THE THREE**, so an act carrying only it supplies no member: it writes nothing and
      // answers `committed` rather than being refused, because no clause of `malformed-geometry` names an unknown member.
      for (const member of ['width', 'height', 'bounds'] as const) {
        if (!Object.hasOwn(supplied, member)) continue
        const leaf = [VIEW_PANES_ADDRESS[0] as string, id, member]
        try {
          standing.write(leaf, PANES_TIER, supplied[member])
        } catch (caught) {
          const refused = refusalOfThrown(caught)
          return { status: 'refused', reason: refused.reason, message: refused.message, address: leaf }
        }
      }
      return { status: 'committed' }
    },

    commitZones(id: string, zone: unknown): ViewRecordAnswer {
      // ── THE ID'S SHAPE ARM AND THEN ITS DOMAIN ARM, BEFORE ANY PAYLOAD AND BEFORE ANY STORE VERB (`D-151`, H2) ──
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: ZONE_SHAPE_REASON, message: ZONE_SHAPE_MESSAGE, address: null }
      }
      // **THE ID'S DOMAIN IS PART OF WHAT AN ID MUST BE, SO IT IS JUDGED HERE AND BEFORE THE PAYLOAD**: a well-formed id
      // this record does not declare is refused rather than silently creating a zone (`ASM-7`). A leaf write needs
      // `['zones', id]` to STAND and the store creates no parent, so the declared set is the whole of what the route may be
      // handed — and this is one of the closure's TWO seats, the other being `zoneNodeAdmits` (`ASM-9`).
      if (!DECLARED_ZONE_IDS.includes(id)) {
        return {
          status: 'refused',
          reason: UNDECLARED_ZONE_REASON,
          message: UNDECLARED_ZONE_MESSAGE,
          address: [VIEW_ZONES_ADDRESS[0] as string, id],
        }
      }
      const value: unknown = zone
      if (!plain(value)) {
        return { status: 'refused', reason: ZONE_SHAPE_REASON, message: ZONE_SHAPE_MESSAGE, address: null }
      }
      // **A SUPPLIED MEMBER MUST BE USABLE AND AN ABSENT ONE SIMPLY IS NOT WRITTEN** — the four members are independently
      // optional in this family (measured), so the arm is per member and the refusal names the member's own fault. EVERY
      // SUPPLIED MEMBER IS JUDGED HERE, BEFORE THE FIRST STORE VERB, which is what keeps a data fault from splitting an act.
      const memberAddress = [VIEW_ZONES_ADDRESS[0] as string, id]
      const supplied: { slot?: unknown; distance?: number; size?: number; display?: string } = {}
      if (Object.hasOwn(value, 'slot')) {
        const slot = value['slot']
        if (!isBoundary(slot)) {
          return { status: 'refused', reason: ZONE_MEMBER_REASON, message: ZONE_MEMBER_MESSAGE, address: memberAddress }
        }
        supplied.slot = slot
      }
      if (Object.hasOwn(value, 'distance')) {
        const distance = value['distance']
        if (!finiteNumber(distance)) {
          return { status: 'refused', reason: ZONE_MEMBER_REASON, message: ZONE_MEMBER_MESSAGE, address: memberAddress }
        }
        supplied.distance = distance
      }
      if (Object.hasOwn(value, 'size')) {
        const size = value['size']
        if (!finiteNumber(size) || size < 0) {
          return { status: 'refused', reason: ZONE_MEMBER_REASON, message: ZONE_MEMBER_MESSAGE, address: memberAddress }
        }
        supplied.size = size
      }
      if (Object.hasOwn(value, 'display')) {
        const display = value['display']
        if (typeof display !== 'string') {
          return { status: 'refused', reason: ZONE_MEMBER_REASON, message: ZONE_MEMBER_MESSAGE, address: memberAddress }
        }
        supplied.display = display
      }
      // **ONE LEAF WRITE PER SUPPLIED MEMBER, IN THE SHAPE'S OWN ORDER — `ViewZone`'s, and not an order of importance**
      // (`D-151`, `ASM-8`): `slot`, then `distance`, then `size`, then `display`, each at the family's own tier and each
      // handing THAT MEMBER's own value. A leaf write cannot drop a sibling member and cannot drop a sibling zone, so
      // nothing is composed and nothing can be one delivery stale (`D-135`, `D-138`) — which is why `composeZones` and its
      // helper are deleted whole, and why **NO `zonesOf` READ STANDS ON THIS PATH**.
      //
      // **A REFUSAL AFTER THE FIRST LEAF LEAVES THE FIRST LANDED, AND THAT IS ADMISSIBLE RATHER THAN ATOMISM MISSED**
      // (`D-151` H3): (i) every supplied member is judged above, by the same predicate the pair applies at that node, so no
      // DATA fault can split an act; (ii) the arm that can still refuse is the store's own boundary — a declared zone's
      // node removed by an outside writer — and a landed leaf is a state the pair ADMITS, a zone carrying any subset of
      // the four being the family's measured shape (`ViewZone`'s members are each optional); and (iii) the answer names the
      // LEAF that refused, so a caller reads back what landed. **ATOMICITY WOULD COST THE COMPOSER**: one write at
      // `['zones', id]` REPLACES the zone whole (measured), so it would have to merge over a copy of what stands —
      // `composeZones` under a new name.
      //
      // **ZERO SUPPLIED MEMBERS WRITES NOTHING AND ANSWERS `committed`**: the declared zone already stands as `{}`, which
      // IS the state that act names — the tab record's "a delete that removes nothing is the store's own success"
      // (`D-53`) read at this family.
      for (const member of ['slot', 'distance', 'size', 'display'] as const) {
        if (!Object.hasOwn(supplied, member)) continue
        const leaf = [VIEW_ZONES_ADDRESS[0] as string, id, member]
        try {
          standing.write(leaf, ZONES_TIER, supplied[member])
        } catch (caught) {
          const refused = refusalOfThrown(caught)
          return { status: 'refused', reason: refused.reason, message: refused.message, address: leaf }
        }
      }
      return { status: 'committed' }
    },

    commitTheme(token: string, attributeName: string): ViewRecordAnswer {
      // ── THE SHAPE ARMS, BEFORE ANY STORE VERB — `commitPane`'s rule, at this family (D-97) ──
      // A SETTING IS A STRING, and the EMPTY STRING is admitted on purpose: it is what the authored handler writes for an
      // absent argument, and the mechanism declares it as the absence the declaration's removal arm is made of. A
      // non-string is not a setting. An ATTRIBUTE NAME is a non-empty string, because a declaration the renderer cannot
      // compose a `props.<name>` write from is a declaration it could not apply — and it is the CALLER's string, never
      // this module's (see `commitTheme`'s declaration above).
      if (typeof token !== 'string') {
        return { status: 'refused', reason: THEME_SHAPE_REASON, message: THEME_SHAPE_MESSAGE, address: null }
      }
      if (typeof attributeName !== 'string' || attributeName.length === 0) {
        return { status: 'refused', reason: THEME_SHAPE_REASON, message: THEME_SHAPE_MESSAGE, address: null }
      }
      // **ONE WRITE OF THE CALLER'S PAIR, AND NOT OF A DECLARATION** — the resolution is the PAIR's: the engine re-runs
      // `theme-must-stand` inside this commit, finds the pair-with-no-declaration stale, and its repair writes the whole
      // legal record. So this route composes nothing, and the value it lands is the caller's act verbatim.
      try {
        standing.write(VIEW_THEME_ADDRESS, THEME_TIER, { token, attribute: attributeName })
        return { status: 'committed' }
      } catch (caught) {
        const refused = refusalOfThrown(caught)
        return { status: 'refused', reason: refused.reason, message: refused.message, address: [VIEW_THEME_ADDRESS[0] as string] }
      }
    },

    commitDrag(id: string, geometry: unknown): ViewRecordAnswer {
      // ── THE SHAPE ARMS, BEFORE ANY STORE VERB — `commitPane`'s rule, at the `temp` family (D-132) ──
      // **THE TWO TOKENS ARE THE PANES' OWN AND NO THIRD ARRIVES**: no pane id or no plain geometry record is
      // `malformed-pane`, and a placement no act can be — both axis members or neither, a figure that is not finite and
      // non-negative, or the one supplied being a member this pane's `zone` does not make adjustable — is
      // `malformed-geometry`: the vocabulary §5 declares for the panes family, reused rather than re-minted for a family
      // that mints none of its own.
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      const value: unknown = geometry
      if (!plain(value)) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      // **EXACTLY ONE AXIS MEMBER IS THE PLACEMENT, AND THE AXIS IS THE MEMBER'S NAME** (`D-191`, `D-189`, L2 §2): a
      // pane commit may supply NO member (each supplied member being a leaf write of its own), while the drag family's
      // member IS the placement — there is no sibling to preserve and nothing to merge — so an act naming both axes or
      // neither is a fault and not an omission. **AND IT IS THE PANE'S ADJUSTABLE MEMBER**: *"a `width` or `height` … that
      // this pane's `zone` does not make adjustable"* is `malformed-geometry`, the panes' own token, and no third token is
      // minted for a family nothing judges (D-132, rev 16 §5). `['drag']` therefore carries `{ [id]: { width } }` or
      // `{ [id]: { height } }` — the SAME axis-named member the release commits, so the in-process reading and the durable
      // write cannot disagree about which axis moved.
      const suppliesWidth = Object.hasOwn(value, 'width')
      const suppliesHeight = Object.hasOwn(value, 'height')
      if (suppliesWidth === suppliesHeight) {
        return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_DRAG_ADDRESS[0] as string, id] }
      }
      const member: 'width' | 'height' = suppliesWidth ? 'width' : 'height'
      const figure = value[member]
      if (!finiteNumber(figure) || figure < 0) {
        return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_DRAG_ADDRESS[0] as string, id] }
      }
      const adjustable = adjustableMemberOf(standing, id)
      if (adjustable !== null && adjustable !== member) {
        return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_DRAG_ADDRESS[0] as string, id] }
      }
      // **ONE WHOLE VALUE THE CALLER FORMATTED, AND NO COMPOSER** (D-135, D-136, D-138): `['drag']` is a root holding one
      // member and no sibling, so the first move writes the root itself and nothing is left to preserve. **AND NOTHING
      // JUDGES THE VALUE AT `temp`** (D-105): no pair stands here, so these arms are the whole gate and the store's own
      // boundary is the rest.
      try {
        standing.write(VIEW_DRAG_ADDRESS, DRAG_TIER, { [id]: { [member]: figure } })
        return { status: 'committed' }
      } catch (caught) {
        const refused = refusalOfThrown(caught)
        return { status: 'refused', reason: refused.reason, message: refused.message, address: [VIEW_DRAG_ADDRESS[0] as string, id] }
      }
    },

    clearDrag(): ViewRecordAnswer {
      // **THE GESTURE'S END IS A DELETE AND NEVER A PLACEHOLDER** (D-132, ASM-2): an empty family written at the root would
      // leave a `temp` node STANDING and make "the drag is over" weaker than the absence it is. At the family's own tier, so
      // the address answers `absent` afterwards and no other tier's version is touched (`guide §5.3`).
      // **AND IT IS `committed` WHETHER OR NOT THE FAMILY STOOD** — a delete that removes nothing is the store's own success
      // (`tiers: []`), which needs no arm of this body (`D-53`, the reading the tab record's `remove` makes at its
      // already-absent branch). **NO ARGUMENT AND NO SHAPE CHECK**: the act carries nothing, so there is nothing to refuse.
      try {
        standing.delete(VIEW_DRAG_ADDRESS, DRAG_TIER)
        return { status: 'committed' }
      } catch (caught) {
        const refused = refusalOfThrown(caught)
        return { status: 'refused', reason: refused.reason, message: refused.message, address: [VIEW_DRAG_ADDRESS[0] as string] }
      }
    },

    subscribe(handler: () => void): () => void {
      // **THE SIGNATURE STANDS VERBATIM, ITS MEANING STANDS, AND THE STORE ACT IS GONE** (`docs/L3/view-record/delivery.md`
      // §3): a committed change of any of the four roots calls `handler` once and the answer withdraws that handler — what
      // left is the `listen`/`register`/`unlisten` third of the body, because the CONSTRUCTION adopted those four entries
      // and the package armed their bodies (`D-219`, `guide §6`, `:557`).
      //
      // **WHAT REMAINS IS ONE ENTRY APPENDED TO ONE LIST AND ONE REMOVAL RETURNED** (`D-71`, `D-137`), and the removal is
      // LOCAL: it drops this one handler, is idempotent, and runs no store verb — the entry the construction adopted is
      // the instance's for the instance's life, which is the app's (`D-70`: a member whose only act would be a no-op
      // `unlisten` is a name without a reader). **AND `D-71`'s *"a registration that could not stand leaves nothing behind"*
      // LOSES ITS SITE WITHOUT LOSING ITS FORCE**: `storeCreate` either adopts every entry or refuses the construction, and
      // a refused construction is `D-80`'s fatal arm — there is no half-registration left to withdraw.
      //
      // **THE CONTAINMENT MOVED FROM THIS BODY TO THE ENTRY'S** (§2, §3): a handler's throw is still contained where it
      // always was, at the fan-out, and the entry's own containment is the registration instant's guard. **THE LISTENER IS
      // TIER-BLIND** — `cfg.listeners` binds an ADDRESS and no tier, so an outside `provident.data.write({path: ['drag'],
      // tier: 'temp'})` fires the same delivery the drag's own commit does, and the consumer's only answer is a re-read
      // (`P-3`, `D-92`).
      return delivery.subscribe(handler)
    },
  }
}

/** **A STORE'S REFUSAL IS A PLAIN OBJECT** (`{status, message, log}`, `guide §8` — never an `Error` subclass), so a
 *  refusal read through `instanceof Error` loses its own status and sentence. This reads both shapes — the tab
 *  record's `refusalOfThrown`, rule for rule. */
function refusalOfThrown(caught: unknown): { reason: string; message: string } {
  if (caught !== null && typeof caught === 'object') {
    const record = caught as Record<string, unknown>
    const reason = typeof record['status'] === 'string' ? record['status'] : 'refused'
    const message = typeof record['message'] === 'string' ? record['message'] : 'the store refused the view record'
    return { reason, message }
  }
  return { reason: 'refused', message: caught instanceof Error ? caught.message : 'the store refused the view record' }
}
