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
// IT IS THE SHAPE AND NOT A STORE (D-78's ruling 3, D-88). Nothing here holds anything: these are type declarations, FIVE
// constants (the measured pane defaults, the zone the app has, and the declared zone ids derived from it) and FIVE PURE
// functions (the two placeholders and the three derivations). No address space, no persistence, no constraint, no
// listener, no instance — a value of these types is thrown away and rebuilt on every delivery, which is exactly what makes
// it a projection rather than a record.
//
// **THE MEASURED DEFAULTS ARE THE TREE'S OWN AND NOT THIS FILE'S INVENTION** (D-87's ground, quoted rather than re-derived):
// the authored pane's `props` read `size '100'`, `min '0'`, `max '200'`, and `gutterSeamExample`'s `startSizeOf`/`boundsOf`
// fall back to the same three figures. The frozen store the view record replaces held NO pane default at all, so a read that
// MISSed at both of its tiers answered `undefined` — an unusable value that made the release refuse `'unusable-default'`
// with ZERO writes and made every move INVALID. The default is therefore the placeholder a REPAIR mints at the store's
// creation (`panes-must-stand`), and the same value this file's derivation answers for a pane the standing family does not
// name — one authority read from both sides. **THE ZONE FAMILY HAS NO SUCH DEFAULT MEMBER AND THIS FILE INVENTS NONE**
// (D-91): its members are the frozen store's four, the read that MISSed them answered `undefined`, and so its derivation's
// missing arm is `null` rather than a geometry. **AND ITS PLACEHOLDER IS NO LONGER *"THE FAMILY THAT NAMES NO ZONE"***:
// that sentence is SUPERSEDED BY POINTER and not reworded (`D-46`) — the creation repair now writes EVERY DECLARED ZONE ID
// WITH AN EMPTY RECORD (`{'zone-1': {}}`, `viewZonesPlaceholder` below), because a leaf write needs the zone's OWN NODE to
// stand under it and an open id set could not guarantee one (`D-151`, `D-139`).

/** One pane's geometry, admitted field by field: an unknown member is dropped, never carried. */
export interface ViewPaneGeometry {
  readonly id: string
  readonly size: number
  readonly bounds: { readonly min: number; readonly max: number }
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
 *  by the crossing's boundary domain and carried as `unknown`. `size` is the zone's stored width, whose `0` IS THE
 *  CALLER'S MINIMIZE MARKER (the composition's `DRAG_MINIMIZE_MARKER`) and which is never negative; `distance` is the
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
/** **THE MEASURED DEFAULT SIZE** — the authored pane's `props.size`, and the value `panes-must-stand` repairs to. */
export const DEFAULT_PANE_SIZE = 100
/** **THE MEASURED DEFAULT BOUNDS PAIR** — the authored pane's `props.min`/`props.max`. A VALUE, copied into a fresh record
 *  by `defaultPaneGeometry` rather than handed out by reference, so no caller can move this file's own constant. */
export const DEFAULT_PANE_BOUNDS: { readonly min: number; readonly max: number } = { min: 0, max: 200 }

/** **THE ZONE THE APP HAS, MEASURED AND NOT CHOSEN** — `DEFAULT_PANE_ID`'s pattern applied to the zone family (D-151): the
 *  id the drag composition's render turn hard-codes and the id `zoneIdOf` falls back to when a caller's element carries
 *  none. It is spelled ONCE, so the two zone turns' fallback and the declared set below cannot drift apart — and the
 *  renderer's two literals becoming this name is a finding routed to that module, not a byte of this one (D-3, D-87). */
export const DEFAULT_ZONE_ID = 'zone-1'
/** **THE ZONE FAMILY'S ID DOMAIN, CLOSED — AND CLOSED BECAUSE A LEAF WRITE NEEDS IT TO BE** (D-151, D-139). `['zones', id]`
 *  must be GUARANTEED to stand for every id the route is handed, and the store creates no parent (measured at this node):
 *  an OPEN id set can guarantee nothing, so the domain closes and the creation repair writes exactly these ids, each with
 *  an EMPTY record. **IT IS DERIVED FROM `DEFAULT_ZONE_ID` AND NOT SPELLED BESIDE IT**, which is the same reason
 *  `defaultPaneGeometry` copies `DEFAULT_PANE_BOUNDS` rather than sharing it. **ONE ID IS A MEASUREMENT AND NOT A
 *  NARROWING CHOSEN HERE**: the render turn names `zone-1` literally, `zoneIdOf` falls back to it, no authored element
 *  under `src/` carries a `zoneId`, and no file of `src/` spells another id FOR THIS FAMILY — so declaring more would mint
 *  records nothing reads (`ASM-10`). */
export const DECLARED_ZONE_IDS: readonly string[] = [DEFAULT_ZONE_ID]

/** **THE ZONE FAMILY'S PLACEHOLDER: EVERY DECLARED ZONE ID WITH AN EMPTY RECORD** — `{'zone-1': {}}`, and **A FRESH RECORD
 *  ON EVERY CALL**, both for the family and for each zone in it, so no caller can move this file's constant or the set it
 *  is built from (`viewThemePlaceholder`'s rule). **IT REPLACES `D-91`'S *"THE FAMILY THAT NAMES NO ZONE"* BY POINTER AND
 *  NOT BY REWORDING** (`D-46`, `D-151`): that value cannot satisfy the leaf write's precondition, while `{}` IS a zone
 *  this file's vocabulary admits (`zoneIn` names a memberless zone and `main`'s `zoneOf` answers `{id}` for one), and the
 *  record it creates is the NODE a leaf write stands under. A route supplying no member therefore writes nothing and
 *  answers `committed`: the declared empty record IS the state that act names (`D-53`'s reading, at this family). */
export const viewZonesPlaceholder = (): Record<string, unknown> => {
  const family: Record<string, unknown> = {}
  for (const id of DECLARED_ZONE_IDS) family[id] = {}
  return family
}

/** The measured default geometry for one pane — a FRESH record every call, so no caller holds the constant above. */
export const defaultPaneGeometry = (id: string): ViewPaneGeometry => ({
  id,
  size: DEFAULT_PANE_SIZE,
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
  return held === undefined
    ? { status: 'committed', pane: defaultPaneGeometry(id), source: 'default' }
    : {
        status: 'committed',
        pane: { id: held.id, size: held.size, bounds: { min: held.bounds.min, max: held.bounds.max } },
        source: 'record',
      }
}

/** **ONE ZONE OUT OF A READING — AND ITS MISSING ARM IS `null`, WHICH IS A MEASUREMENT AND NOT AN OVERSIGHT** (D-91).
 *  This function is `paneGeometryIn`'s counterpart and it deliberately does NOT answer a default record, because the zone
 *  family has **no measured placeholder for the derivation to give**: the frozen store held no zone default at all, a
 *  read that MISSed at its one tier answered `undefined`, the render turn handed that `undefined` straight to its layout
 *  call (`renderer.ts:1799-1805`), and `candidatesFor` answered `[]` (`:1935-1941`). So `null` here IS the answer the
 *  app's own paths give today for a zone nothing names, and the creation repair mints no geometry — **it writes every
 *  DECLARED zone id with an EMPTY record, and `D-91`'s *"the family that names no zone"* is SUPERSEDED BY POINTER and not
 *  reworded** (`D-46`, `D-151`) — so this derivation's two absent-looking arms are told apart by THIS function: a declared
 *  zone nothing has written yet answers a MEMBERLESS record (`{id}`), and `null` answers only for an id this record does
 *  not declare. A derivation that answered `{size: 100}` would be a second authority beside the read, which is exactly the
 *  fault `D-91` refuses. **AND ITS OUTPUT DOES NOT MOVE WITH THE CLOSED DOMAIN**: the two zone readers' layouts are
 *  `undefined` on both arms and `candidatesFor` answers `[]` on both, so what moves is the VOCABULARY and not a reader
 *  (`D-151` (b), (c)).
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
