// src/main/view-record/index.ts — THE CROSSING'S SECOND DECLARATION SET: the app's VIEW RECORD (D-87).
//
// THE TWO DATA SETS THIS MODULE EXISTS FOR, AND WHY THEY COULD NOT LEAVE THE FROZEN GRAPH STORE BEFORE IT DID
// (`src/renderer/store-core-graph.ts`, the purge's last deletion): the app's PANE GEOMETRY — a pane's `size` and
// `bounds`, read at `src/renderer/renderer.ts`'s `readPaneSize`/`readPaneBounds` and written at its `release` — and the
// FOCUS MIRROR — the entries the focus model seats and the id that is active, read by `mirrorStateOf` and committed by
// `answerForCarrier` and by `createFocusCarrier`'s `persistTarget`. Nothing outside that store held either, so the store
// could not be deleted until both had an address; this module is the address.
//
// IT CONSTRUCTS NOTHING, OPENS NO FILE AND OWNS NO INSTANCE (D-63, D-64): the boot hands it the central store it already
// built the tab record's six declarations into (D-65), and this module reads and writes two of that instance's roots
// through it.
//
// **TWO ROOTS, `['panes']` AND `['focus']`, AND NOT ONE ROOT WITH TWO MEMBERS — MEASURED, NOT PREFERRED (D-87).**
// The tab record's pattern is ONE root with members (`['tabs']`, `['tabs','order']`, `['tabs','landing']`), and it was
// followed until the TIER decided it: a value at an address lives at ONE tier and a read can name it, so a single root
// could carry the pane geometry at `file` only by also carrying the focus mirror there — and a `mem` family can never
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
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  defaultPaneGeometry,
  paneGeometryIn,
  type ViewFocusEntry,
  type ViewFocusMirror,
  type ViewGeometrySource,
  type ViewPaneGeometry,
} from '../../shared/view-shape.js'
export {
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  paneGeometryIn,
  type ViewFocusEntry,
  type ViewFocusMirror,
  type ViewGeometrySource,
  type ViewPaneGeometry,
}

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
 *  `{size, bounds}` record; the spelling of the leaf is this module's and is stated in
 *  `docs/L2/view-record/interface.md` §1. **NO `file.` PREFIX AND NO RESERVED ROOT**: the crossing's `file` tier already
 *  carries the frozen store's `window·tabs·layout·settings·tracked·modules` projection and `Y-2` (`STORE_FILE_PUT`)
 *  projects every `file.*`-keyed spelling of the graph's translation into the operator record, so a root outside those
 *  six names is the one shape a later projection cannot collide with. */
export const VIEW_PANES_ADDRESS: readonly string[] = ['panes']
/** **THE FOCUS MIRROR'S ROOT — ONE WHOLE VALUE AT `mem`.** A `mem` address can never come from a file (`D-84`): its
 *  only lawful source is a repair at the creation instant, and `provident-storeroom@1.9.1` saves a `file`-tier
 *  registration repair and no `mem` one (measured, this pass) — so this family is RE-MINTED AT EVERY BOOT and the
 *  profile's bytes never carry it. That is clause 3 answered for it, and it is `operator-exclusion-must-stand`'s shape. */
export const VIEW_FOCUS_ADDRESS: readonly string[] = ['focus']
/** **THE PANES' EXISTENCE PAIR'S id** — exported beside the tab record's six so the boot's batch is a census a reader
 *  can name, and so no caller spells an id. */
export const VIEW_PANES_MUST_STAND_ID = 'panes-must-stand'
/** **THE FOCUS MIRROR'S EXISTENCE PAIR'S id.** `panes-must-stand`, `focus-must-stand` and the tab record's six are ONE
 *  namespace (`guide §7.2`: a repeated id in one supplied list is REJECTED), and this module's two are minted against
 *  that batch's six — neither spelling occurs in `tabsConstraintDeclarations`, and the listener handles below carry a
 *  third prefix again (`D-71`'s one cross-kind rule reads the HANDLE). */
export const VIEW_FOCUS_MUST_STAND_ID = 'focus-must-stand'

// **THE THREE MEASURED DEFAULTS ARE `src/shared/view-shape.ts`'S AND ARE RE-EXPORTED ABOVE** (D-88): the same figures the
// authored pane states, read by this module's repair (`panes-must-stand`) and by the renderer's pane read alike. Their
// measured ground — `props.size '100'`, `props.min '0'`, `props.max '200'`, and the frozen store's ZERO pane defaults,
// which made a MISSed read answer `undefined` and the release refuse `'unusable-default'` with zero writes — is recorded
// there, once, and `D-87` is where it was measured.

/** **THE REASON TOKENS THIS MODULE MINTS, AND THEY ARE THIS MODULE'S AND NOT THE STORE'S** (the `SEAT_NAME_REASON`
 *  precedent, D-76): a shape arm answers one of these before ANY store verb, so the store never answers a word this
 *  module invented. Two per family, because each family has two distinguishable faults — the record's own shape, and a
 *  member that cannot be a value of the family. */
export const PANE_SHAPE_REASON = 'malformed-pane'
export const PANE_GEOMETRY_REASON = 'malformed-geometry'
export const FOCUS_SHAPE_REASON = 'malformed-focus'
export const DANGLING_ACTIVE_REASON = 'dangling-active'

/** The sentences, in the register of the tab record's own (`MALFORMED_ROW_MESSAGE`, `SEAT_NAME_MESSAGE`): each names the
 *  FAULT and not the act, because both routes of a family refuse the same one. */
export const PANE_SHAPE_MESSAGE = 'the pane family names no pane id, or carries no plain geometry record'
export const PANE_GEOMETRY_MESSAGE =
  'the pane geometry carries no finite size, or no bounds pair of two finite numbers whose min does not exceed its max'
export const FOCUS_SHAPE_MESSAGE =
  'the focus mirror carries no entry list, or an entry whose id is not a string, number or boolean, or whose target is no value the store carries'
export const DANGLING_ACTIVE_MESSAGE =
  'the focus mirror names an active id that is no entry of its own list, so the mirror names a tab it does not hold'

/** **THE TWO FAMILIES' OWN TIERS, EACH NAMED ONCE.** A value's tier is the address's (`guide §3.1`), and these two
 *  constants are the whole of what says which — so no read, no write and no repair of this module spells a tier
 *  literal, and a family cannot half-move to the other tier. */
const PANES_TIER = 'file'
const FOCUS_TIER = 'mem'
/** **THE TIER UNION THIS MODULE USES, DERIVED FROM THE TWO CONSTANTS AND NOT RE-SPELLED FROM THE PACKAGE'S `Tier`.** The
 *  package's own domain is `'mem' | 'file' | 'temp'`; this module needs two of those words and needs them to be
 *  assignable to `write`'s `tier` position, so the type is taken from the constants themselves — one spelling of each
 *  word in this file, and a third family would have to add its constant rather than widen a table. */
type ViewTier = typeof PANES_TIER | typeof FOCUS_TIER

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RECORD'S SHAPES
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

// **THE FOUR SHAPE DECLARATIONS ARE `src/shared/view-shape.ts`'S AND ARE RE-EXPORTED ABOVE** (D-88): `ViewPaneGeometry`,
// `ViewFocusEntry`, `ViewFocusMirror` and `ViewGeometrySource`, with the measured ground each carries — the boundary's
// domain for a focus entry, the absent active spelled as ABSENCE, and `'record'`/`'default'` naming a real difference.

export interface ViewPaneReading {
  readonly status: 'committed'
  readonly pane: ViewPaneGeometry
  readonly source: ViewGeometrySource
}

export interface ViewFocusReading {
  readonly status: 'committed'
  readonly focus: ViewFocusMirror
  readonly source: ViewGeometrySource
}

/** The whole view: the pane family as the record admits it, and the mirror as it stands. **THE `source` MEMBERS ARE
 *  PER FAMILY AND NOT PER PANE**: the family is one value, so it either stands (and each pane it names is the record's)
 *  or it does not (and every pane answers the measured default). */
export interface ViewRecordReading {
  readonly status: 'committed'
  readonly panes: readonly ViewPaneGeometry[]
  readonly focus: ViewFocusMirror
  readonly source: { readonly panes: ViewGeometrySource; readonly focus: ViewGeometrySource }
}

/** **THE ANSWER A WRITE ROUTE GIVES — AND IT CARRIES NO `repaired` MEMBER, WHICH IS A DECISION AND NOT AN OMISSION**
 *  (`D-70`'s rule about a member that names nothing, read at this module's own routes). The tab record derives
 *  `repaired` because its six pairs can change a record INSIDE the commit that wrote it. This module's two pairs have
 *  ONE arm each — the address does not stand — and no route of this module can leave either address absent: a commit
 *  writes the whole family and a read writes nothing. So a repair cannot fire at a landing instant of THIS module's, and
 *  a `repaired` member here could only ever be `false` on a `true`-shaped claim. **The landing arm DOES exist and IS
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
  /** THE APP'S ONE STORE (D-64, D-65): the view record lives at this instance's two roots and owns no instance. */
  readonly store: Store
}

/** **THE ROUTES A CLIENT NEEDS, AND FOUR OF THEM — the tab record's own number, arrived at from the other side.** The
 *  renderer reads a pane's geometry (`:1700-1722`), writes one (`:1823-1825`), reads the mirror (`:1104-1105`), writes it
 *  (`:1152-1153`, `:1967-1968`) and re-reads after a push. `read` is ONE route because both families are read at once by
 *  the one consumer, and `subscribe` is the push's own — so no route of this module stands without an answer site,
 *  which is the defect `docs/L2/central-data/interface.md` §2 records against a bridge member nothing calls. */
export interface ViewRecord {
  read(): ViewRecordReading
  /** **WRITE ONE PANE'S GEOMETRY, AND NEVER A PATH**: the id names a MEMBER of the family at the one root, so a caller
   *  cannot compose an address — the tab record's `commit` rule, rule for rule. A member the caller does not supply is
   *  taken from what stands, and then from the measured default, so a caller writing a size alone does not erase the
   *  pane's bounds. */
  commitPane(id: string, geometry: unknown): ViewRecordAnswer
  /** **WRITE THE WHOLE MIRROR.** The mirror is one value and the model hands out the whole of it on every transition
   *  (`persist(seam, state)`), so the route takes the whole of it and composes nothing of its own. */
  commitFocus(mirror: unknown): ViewRecordAnswer
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
 *  arrays"*). A member of the mirror — an entry's `target` — is opaque to the focus model but not to the crossing, so a
 *  target carrying a `null` or a `undefined` anywhere would make the WHOLE mirror unwritable and the refusal would
 *  arrive as a thrown boundary form rather than as this module's own sentence. The predicate is total and walks the
 *  value once. */
const isBoundary = (value: unknown): boolean => {
  if (typeof value === 'string' || typeof value === 'boolean') return true
  if (typeof value === 'number') return Number.isFinite(value)
  if (Array.isArray(value)) return value.every(isBoundary)
  if (plain(value)) return Object.values(value).every(isBoundary)
  return false
}

/** **ONE PANE'S GEOMETRY, ADMITTED FIELD BY FIELD, OR `null`.** A record with no usable `size` or no usable bounds pair
 *  is not a geometry: this is the same admission `rowOf` performs for a tab, and its answer feeds both the READ (a
 *  member it cannot admit is not a pane the family names) and the FAMILY COMPOSITION a caller's write leaves. */
const paneOf = (id: string, held: unknown): ViewPaneGeometry | null => {
  if (!plain(held)) return null
  const size = held['size']
  if (!finiteNumber(size) || size < 0) return null
  const bounds = held['bounds']
  if (!plain(bounds)) return null
  const min = bounds['min']
  const max = bounds['max']
  if (!finiteNumber(min) || !finiteNumber(max) || min > max) return null
  return { id, size, bounds: { min, max } }
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

/** The focus entry as the mirror carries it, or `null` — the id narrowed to the three primitives `===` compares by
 *  value, the target carried opaquely through the boundary's own domain, the label the model's optional string. */
const focusEntryOf = (held: unknown): ViewFocusEntry | null => {
  if (!plain(held)) return null
  const id = held['id']
  if (typeof id !== 'string' && typeof id !== 'number' && typeof id !== 'boolean') return null
  if (typeof id === 'number' && !Number.isFinite(id)) return null
  const target = held['target']
  if (!isBoundary(target)) return null
  const entry: { id: string | number | boolean; target: unknown; label?: string } = { id, target }
  if (typeof held['label'] === 'string') entry.label = held['label']
  return entry
}

/** **THE MIRROR AS ONE VALUE, OR `null`.** A value that is not a plain record, or whose `entries` is not a list, is not
 *  this family; an entry this module cannot admit is DROPPED (the `panesFrom` disposition); and **A DROPPED ENTRY TAKES
 *  A DANGLING `activeId` WITH IT** — a mirror whose active id names an entry it no longer carries is the state
 *  `dangling-active` refuses at the write route, so the read cannot answer one and then refuse to write it back. */
const mirrorFrom = (whole: unknown): ViewFocusMirror | null => {
  if (!plain(whole)) return null
  const held = whole['entries']
  if (!Array.isArray(held)) return null
  const entries: ViewFocusEntry[] = []
  const named = new Set<string>()
  for (const candidate of held) {
    const entry = focusEntryOf(candidate)
    if (entry === null) continue
    const key = String(entry.id)
    if (named.has(key)) continue
    named.add(key)
    entries.push(entry)
  }
  const active = whole['activeId']
  const activeId = typeof active === 'string' || typeof active === 'number' || typeof active === 'boolean' ? active : null
  if (activeId !== null && !named.has(String(activeId))) return { entries, activeId: null }
  return { entries, activeId }
}

/** **THE TWO FAMILIES' ONE READ EACH, AT THEIR OWN TIER.** A read that refuses answers the family's declared default —
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

const mirrorOf = (store: Store): { focus: ViewFocusMirror; source: ViewGeometrySource } => {
  try {
    const read = mirrorFrom(store.read(VIEW_FOCUS_ADDRESS, FOCUS_TIER))
    if (read !== null) return { focus: read, source: 'record' }
  } catch {
    // as above: the declared empty pair answers, and nothing is repaired at a read
  }
  return { focus: { entries: [], activeId: null }, source: 'default' }
}

/** **THE WHOLE FAMILY A CALLER'S WRITE LEAVES: ONE LEGAL VALUE, COMPOSED FROM WHAT STANDS.** The pane the caller named
 *  takes the members it supplied, each missing member falling to what that pane stands at and then to the measured
 *  default; every OTHER pane the family holds is admitted field by field and kept, so one act cannot erase a sibling's
 *  geometry. This is the `healedFamily` role (`D-83`) for a family with no seat to salvage. */
const composePanes = (panes: readonly ViewPaneGeometry[], id: string, supplied: { size?: number; bounds?: { min: number; max: number } }): Record<string, unknown> => {
  const whole: Record<string, unknown> = {}
  const standing = panes.find((pane) => pane.id === id)
  for (const pane of panes) {
    if (pane.id !== id) whole[pane.id] = { size: pane.size, bounds: { min: pane.bounds.min, max: pane.bounds.max } }
  }
  const base = standing ?? defaultPaneGeometry(id)
  whole[id] = {
    size: supplied.size ?? base.size,
    bounds: { min: supplied.bounds?.min ?? base.bounds.min, max: supplied.bounds?.max ?? base.bounds.max },
  }
  return whole
}

/** **THE MIRROR AS THE STORE MUST CARRY IT: THE ABSENT ACTIVE IS SPELLED AS ABSENCE.** `null` is refused at the
 *  crossing's boundary and `undefined` with it (measured), so the empty-active arm writes NO member and the read maps
 *  that absence back to `null` (`mirrorFrom`). The `entries` list is copied, so the caller keeps ownership of the array
 *  it handed in. */
const composeMirror = (mirror: ViewFocusMirror): Record<string, unknown> => {
  const whole: Record<string, unknown> = { entries: mirror.entries.map((entry) => ({ ...entry })) }
  if (mirror.activeId !== null) whole['activeId'] = mirror.activeId
  return whole
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE TWO DECLARATIONS — CLAUSE 1 OF THE CONVENTION: EXISTENCE, REPAIRED WITH A PLACEHOLDER
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

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
 *  **THE ARM IS ABSENCE, AND ONLY ABSENCE**: a value that is not a plain record — the address holding nothing, a
 *  primitive, an array — is the fault this pair names and repairs. **A FAMILY THAT STANDS BUT CARRIES AN UNUSABLE
 *  GEOMETRY IS NOT THIS PAIR'S ARM** and is reported as owed rather than invented (`D-87`): this pair's repair must
 *  leave ONE WHOLE LEGAL VALUE, and a body that also judged each pane's members would be a second declaration wearing
 *  this one's sentence — which is the boundary `D-84` drew for `operator-exclusion-must-stand` and `D-83` drew when it
 *  gave the `order` seat a pair of its own instead of widening the field pairs. The read's admitted family answers the
 *  measured default for any pane it cannot state, so the state this pair leaves unrepaired is answered and not lost. */
const panesMustStand = (getStore: () => Store | null) => (context: unknown): ViewConstraintAnswer => {
  const held = plain(context) ? context['value'] : undefined
  if (plain(held)) return true
  return {
    message: 'the pane geometry does not stand',
    repair: repairPanes(getStore),
  }
}

/** **THE PANES' REPAIR: THE MEASURED DEFAULT, AS ONE WHOLE LEGAL VALUE** — the pane the app has, at the size and the
 *  bounds pair the tree states, written at the family's own root and its own tier. It is the analogue of
 *  `mintRecord`'s landing row and it is composed by the ONE family composer, so a family the engine re-runs sees a value
 *  this module's own read admits. */
const repairPanes = (getStore: () => Store | null) => (context: unknown): ViewRepairAnswer => {
  const seed = defaultPaneGeometry(DEFAULT_PANE_ID)
  const whole = composePanes([], DEFAULT_PANE_ID, { size: seed.size, bounds: { min: seed.bounds.min, max: seed.bounds.max } })
  return writeWholeValue(getStore)(context, VIEW_PANES_ADDRESS, PANES_TIER, whole)
}

/** **`focus-must-stand` — THE MIRROR'S EXISTENCE, AND IT IS THE `mem` FAMILY'S WHOLE CLAUSE-3 ANSWER.**
 *
 *  A `mem` address can never come from a file (`D-84`'s measurement, unmoved): the register a store keeps at `mem` is
 *  the instance's and `provident-storeroom@1.9.1` settles only a `file`-tier registration repair into the file
 *  (measured, this pass: a `mem` repair leaves the profile's bytes exactly as they stood and the next boot's context
 *  answers the address ABSENT). So this pair is asked at EVERY construction and re-mints the mirror every boot, which is
 *  `operator-exclusion-must-stand`'s shape at the other crossing — and the family's boot data is a REPAIR and never the
 *  file, which is clause 3 answered rather than deviated from. */
const focusMustStand = (getStore: () => Store | null) => (context: unknown): ViewConstraintAnswer => {
  const held = plain(context) ? context['value'] : undefined
  if (plain(held)) return true
  return {
    message: 'the focus mirror does not stand',
    repair: repairMirror(getStore),
  }
}

/** **THE MIRROR'S REPAIR: THE DECLARED EMPTY PAIR, AS ONE WHOLE LEGAL VALUE** — `{entries: []}` with the absent active
 *  spelled as ABSENCE, so the read answers `activeId: null` (`mirrorFrom`) and the mirror's default is the model's own
 *  (`mirrorStateOf`'s declared empty pair) rather than a fourth spelling of it. */
const repairMirror = (getStore: () => Store | null) => (context: unknown): ViewRepairAnswer =>
  writeWholeValue(getStore)(context, VIEW_FOCUS_ADDRESS, FOCUS_TIER, composeMirror({ entries: [], activeId: null }))

/** **THE BATCHED DECLARATIONS, COLLECTED BY THE BOOT** (D-65's first act; D-87's second set). The boot gathers these
 *  beside the tab record's six and constructs the central store ONCE with the whole batch, so a constraint is a
 *  DECLARATION here rather than a constructor call, and the two modules' ids stand in ONE namespace without a repeated
 *  spelling. **THE ORDER IS THE DEPENDENCY ORDER OF THE TWO FAMILIES AND NOTHING MORE**: neither pair's subject is the
 *  other's, so the panes pair stands first only because its root is the one the app writes most.
 *
 *  **THE RETURN IS TYPED** where the package's own licence would admit `void` (`D-72`): every element is a
 *  `ViewConstraintDeclaration`, so a body or a repair that answers nothing is a COMPILE ERROR here. */
export function viewConstraintDeclarations(getStore: () => Store | null): readonly ViewConstraintDeclaration[] {
  return [
    { address: VIEW_PANES_ADDRESS, id: VIEW_PANES_MUST_STAND_ID, constraint: panesMustStand(getStore) },
    { address: VIEW_FOCUS_ADDRESS, id: VIEW_FOCUS_MUST_STAND_ID, constraint: focusMustStand(getStore) },
  ]
}

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// THE RECORD OVER THE CENTRAL INSTANCE
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

/** **ONE HANDLE PER SUBSCRIPTION PER ADDRESS, MINTED HERE — MEASURED, NOT PREFERRED** (the tab record's `handleFor`, whose
 *  reading is that `register` REPLACES the function under a handle and `unlisten` withdraws the handle WHOLE, so one
 *  spelled name starves a second subscriber). **AND THE SPELLING CAN NEVER EQUAL A CONSTRAINT `id`**, which is the one
 *  cross-kind rule that survives (`D-71`): this module's two are `panes-must-stand` and `focus-must-stand` and the tab
 *  record's six are its own, while these handles carry a FIXED `view-record:` prefix no id has, a MINTED ORDINAL that
 *  only grows, and the address the handle is bound at. */
let issuance = 0
const handleFor = (address: readonly string[]): string => {
  issuance += 1
  return 'view-record:' + String(issuance) + '@' + address.join('/')
}

/** **THE VIEW RECORD OVER THE CENTRAL INSTANCE** (D-64, D-65, D-87): this module constructs nothing and owns no file — it
 *  is handed the app's one store and reads and writes its two roots through it. */
export function createViewRecord(options: ViewRecordOptions): ViewRecord {
  const standing: Store = options.store

  const reading = (): ViewRecordReading => {
    const panes = panesOf(standing)
    const mirror = mirrorOf(standing)
    return {
      status: 'committed',
      panes: panes.panes,
      focus: mirror.focus,
      source: { panes: panes.source, focus: mirror.source },
    }
  }

  return {
    read(): ViewRecordReading {
      // **A READ WRITES NOTHING** (D-82 clause 4): a MISSed family answers its declared default and the CREATION repair is
      // what makes it stand, so no re-derivation runs on a read — the arm the corpus measured a whole clause on.
      return reading()
    },

    commitPane(id: string, geometry: unknown): ViewRecordAnswer {
      // ── THE SHAPE ARMS, BEFORE ANY STORE VERB (`docs/L3/store-tabs-record/signatures.md` §3's rule at this module) ──
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      const value: unknown = geometry
      if (!plain(value)) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      // **A SUPPLIED MEMBER MUST BE USABLE; AN ABSENT ONE KEEPS WHAT STANDS** — the renderer's release turn writes a size
      // and nothing else, and its own gate is *"a non-useful `final` (a non-number or `NaN`) is NEVER written"*. An absent
      // member is not that act: it is a caller naming one member of a value, which the whole-value write fills in.
      const supplied: { size?: number; bounds?: { min: number; max: number } } = {}
      if (Object.hasOwn(value, 'size')) {
        const size = value['size']
        if (!finiteNumber(size) || size < 0) {
          return { status: 'refused', reason: PANE_GEOMETRY_REASON, message: PANE_GEOMETRY_MESSAGE, address: [VIEW_PANES_ADDRESS[0] as string, id] }
        }
        supplied.size = size
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
      // **ONE WRITE OF ONE WHOLE FAMILY AT ITS ROOT** — a nested write does not create its parent (measured), so the
      // family is composed whole and written where the pair stands.
      try {
        standing.write(VIEW_PANES_ADDRESS, PANES_TIER, composePanes(panesOf(standing).panes, id, supplied))
        return { status: 'committed' }
      } catch (caught) {
        const refused = refusalOfThrown(caught)
        return { status: 'refused', reason: refused.reason, message: refused.message, address: [VIEW_PANES_ADDRESS[0] as string, id] }
      }
    },

    commitFocus(mirror: unknown): ViewRecordAnswer {
      const value: unknown = mirror
      if (!plain(value)) {
        return { status: 'refused', reason: FOCUS_SHAPE_REASON, message: FOCUS_SHAPE_MESSAGE, address: null }
      }
      const held = value['entries']
      if (!Array.isArray(held)) {
        return { status: 'refused', reason: FOCUS_SHAPE_REASON, message: FOCUS_SHAPE_MESSAGE, address: null }
      }
      const entries: ViewFocusEntry[] = []
      const named = new Set<string>()
      for (const candidate of held) {
        const entry = focusEntryOf(candidate)
        if (entry === null) {
          return { status: 'refused', reason: FOCUS_SHAPE_REASON, message: FOCUS_SHAPE_MESSAGE, address: null }
        }
        // **ONE MEMBER PER ID, AND A REPEAT IS REFUSED RATHER THAN DEDUPED**: the model's `open` answers
        // `duplicate-id` and never creates this state, so a mirror arriving with one is a caller's own composition —
        // and a dedupe here would silently drop an entry the caller asked to keep.
        if (named.has(String(entry.id))) {
          return { status: 'refused', reason: FOCUS_SHAPE_REASON, message: FOCUS_SHAPE_MESSAGE, address: null }
        }
        named.add(String(entry.id))
        entries.push(entry)
      }
      const active = value['activeId']
      let activeId: ViewFocusMirror['activeId'] = null
      if (active !== null && active !== undefined) {
        if (typeof active !== 'string' && typeof active !== 'number' && typeof active !== 'boolean') {
          return { status: 'refused', reason: FOCUS_SHAPE_REASON, message: FOCUS_SHAPE_MESSAGE, address: null }
        }
        if (typeof active === 'number' && !Number.isFinite(active)) {
          return { status: 'refused', reason: FOCUS_SHAPE_REASON, message: FOCUS_SHAPE_MESSAGE, address: null }
        }
        // **THE DANGLING ARM, AND IT IS THIS MODULE'S OWN TOKEN** (the `seat-name` precedent, D-76): a mirror whose active
        // id names no entry of its own list is a mirror naming a tab it does not hold, which is the `order` seat's fault
        // at the other family — so it is refused under a token and a sentence naming the FAULT, never `malformed-focus`.
        if (!named.has(String(active))) {
          return { status: 'refused', reason: DANGLING_ACTIVE_REASON, message: DANGLING_ACTIVE_MESSAGE, address: [VIEW_FOCUS_ADDRESS[0] as string, 'activeId'] }
        }
        activeId = active
      }
      try {
        standing.write(VIEW_FOCUS_ADDRESS, FOCUS_TIER, composeMirror({ entries, activeId }))
        return { status: 'committed' }
      } catch (caught) {
        const refused = refusalOfThrown(caught)
        return { status: 'refused', reason: refused.reason, message: refused.message, address: [VIEW_FOCUS_ADDRESS[0] as string, 'activeId'] }
      }
    },

    subscribe(handler: () => void): () => void {
      // **THE REGISTRATION IS TWO ACTS PER ADDRESS, NOT ONE** (`guide §6.2`, `§6.3`): `listen` installs the ENTRY and
      // `register` installs the FUNCTION under it; an entry `listen` wrote and `register` never filled is a lawful, silent
      // reservation. **A LISTENER AND A CONSTRAINT PAIR MAY STAND AT ONE ADDRESS** (`1.7.0`'s clause, `D-71`) — the only
      // cross-kind restriction is the HANDLE — so each pair of this module and its family's listener share a root.
      //
      // **THE BODY IS A NOTIFICATION AND NOTHING ELSE** (`guide §6.5` item 1): a listener's write opens its own commit, so
      // a delivery path that wrote would be a second writer inside the one that fired it. The renderer RE-READS. **AND
      // THE CALLER'S THROW IS CONTAINED HERE** — a listener body's throw is neither caught nor reported by the store and
      // crosses every hop back into the write that fired it (`guide §6.5a`), which the tab record measured as a LANDED
      // commit answering `refused`.
      const body = (): void => {
        try {
          handler()
        } catch {
          // the family moved and the delivery happened; the subscriber's own failure stops at the subscriber
        }
      }
      const handles: string[] = []
      for (const address of [VIEW_PANES_ADDRESS, VIEW_FOCUS_ADDRESS]) {
        const handle = handleFor(address)
        try {
          standing.listen(handle, [address])
          standing.register(handle, body)
          handles.push(handle)
        } catch {
          // A REGISTRATION THAT COULD NOT STAND LEAVES NOTHING BEHIND: an entry `listen` wrote that `register` could not
          // fill would fire nothing and would hold this subscription's name against a later one.
          try {
            standing.unlisten(handle)
          } catch {
            // a withdrawal answers nothing, not even a failure
          }
        }
      }
      let live = true
      return () => {
        // **THE WITHDRAWAL IS THIS SUBSCRIPTION'S OWN ANSWER** and it is idempotent: one `unlisten` per handle, a plain
        // no-op success over a handle already withdrawn, and never a throw to the caller (`guide §6.2`).
        if (!live) return
        live = false
        for (const handle of handles) {
          try {
            standing.unlisten(handle)
          } catch {
            // a withdrawal the store refuses leaves the listener to the instance's lifetime, not a throw
          }
        }
      }
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
