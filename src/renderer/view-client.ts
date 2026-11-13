// src/renderer/view-client.ts — THE VIEW RECORD'S SHAPE, HELD IN THIS REALM AND FILLED BY DELIVERIES (D-88).
//
// ═══ WHAT THIS IS, IN THE CONVENTION'S OWN TERMS ═══
// `D-78` ruling 3, verbatim: **"The provident-ssr graph is not a store. It is a rendering engine. Do not refer to it as a
// store. Do not use it as one. It controls the render and the data shape is driven by the listener events."** The chain
// that sentence fixes is **store acts (creation load, constraint/repair passes) → listener deliveries → the read → the
// data shape → the rendering engine renders it**. This module is the fourth link and nothing else: it holds THE DATA SHAPE,
// it is refilled by DELIVERIES (`onChanged` → re-read → `adopt`), and it is read SYNCHRONOUSLY by the paths that cannot
// await — the pane drag's `startSizeOf`/`boundsOf` (`renderer.ts:1700-1722` before this pass) and its zone turns.
// **THE FOCUS MIRROR'S READ LEFT WITH ITS FAMILY** (`D-142`): no member here answers one, and the shape carries three
// families and no fourth.
//
// **IT IS NOT A STORE, AND THE DISTINCTION IS THE WHOLE POINT OF THE PURGE (`D-78`, and `D-82` clause 3).** A store is a
// `provident-storeroom` instance, and there are to be exactly two — the normal crossing and the secure crossing. This
// object is none of that: it **holds no address space** (a caller names a pane id and a member, never a path or a tier), it
// **owns no persistence** (it opens no file, mints nothing and writes nothing anywhere a store would), it **carries no
// constraint, no repair, no journal, no listener registration and no instance**, and it **is thrown away and rebuilt from
// the last delivery's answer** — every `adopt` REPLACES the whole shape; nothing accumulates, nothing is amended in place,
// and a value it answers is only ever one it READ. A store survives a restart by design; this survives exactly one
// delivery, which is why it cannot be used as one and must never be named one.
//
// **WHAT THE ASYNC CROSSING CHANGES, STATED ONCE HERE AND AT EVERY CALL SITE.** The frozen store this replaces was
// synchronous and in-realm: `resolve`/`commit` answered a receipt in the caller's own turn. The crossing is IPC and
// asynchronous, so:
//   · READS are answered from the shape and stay SYNCHRONOUS — that is the reason the shape exists at all. A read is
//     therefore ALWAYS one delivery stale at worst, and the delivery is exactly what the store's own commit caused.
//   · WRITES are SENT and their receipt arrives a tick later, at ONE REGISTER'S TWO ADJACENT MEMBERS (L2 §9): the STATE
//     is `writeOutcome()`, which HOLDS the last sent write's declared answer, and the EVENT is
//     `onWriteOutcome(handler)`, which PUSHES that same record from the very continuation that assigns the hold — the
//     place the answer's arrival already is, so nothing is asked twice and nothing is read on a turn of its own. There
//     is no poll, no timer, no retry and no getter-instead-of-push here (`D-82` clause 4). No caller's answer is
//     composed from a receipt: the pane drag's `release` returns `void` (it already did — the old receipts were
//     discarded), so the drag's next read is the shape a delivery refilled.
//   · NOTHING HERE POLLS, TIMES, RETRIES OR WRITES ON A READ (`D-82` clause 4). There is exactly ONE stated boot read
//     (`fill()`), and **IT IS NO LONGER THE FIRST FILL: THE DELIVERY IS** (`D-219`, `D-217`). The crossing's construction
//     adopted its listener in `cfg.listeners`, so the creation's own repairs deliver, the queue holds that address until
//     this realm arrives, and the flushed push reaches the subscription registered above — so the first fill is a
//     DELIVERY's turn and not a read's. **THE READ IS STILL OWED ITS SITE**: it is the one channel for a realm whose bridge
//     carries no `view` member, for a registration that threw, and for the RELOAD — an arrival whose arm is already spent,
//     which no creation can deliver to and which therefore runs its own read (`D-98`).
//
// **NO `provident-storeroom` IMPORT, AND NO MAIN-PROCESS IMPORT EITHER.** The renderer bundle is a browser bundle: the
// shape's vocabulary comes from `src/shared/view-shape.ts`, the bridge is narrowed structurally by LOCAL types (the
// `tabs-client.ts` precedent and the `Tier1StoreSurface` one in `renderer.ts`), and `window.provident.view` is read at CALL
// TIME so a realm with no bridge at all — the node suite's layout-less shim, a plain page, an older preload — is the
// declared ABSENT case rather than a `ReferenceError`. Nothing throws on any arm, so no caller needs a `try`.

import {
  DEFAULT_PANE_BOUNDS,
  paneGeometryIn,
  defaultPaneGeometry,
  viewThemePlaceholder,
  zoneIn,
  type ViewGeometrySource,
  type ViewPaneGeometry,
  type ViewThemeRecord,
  type ViewZone,
} from '../shared/view-shape.js'

/** **THE READING'S COMMITTED ARM — `docs/L2/view-record/interface.md` §2's declared answer, verbatim**: the THREE families
 *  and the per-family `source` that says whether the record answered or the declared default did. It is required member
 *  for required member, so an answer that carries two families and not the third reaches the caller as `unread` rather
 *  than as a shape derived from a partial record — the strictness this file states once, applied to the whole reading.
 *  **NO FOURTH MEMBER STANDS ON EITHER SIDE OF THE WIRE** (D-142): the answer is three families and three `source`
 *  words. */
export interface ViewCommittedReading {
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

/** **THE CLIENT'S READING — the committed arm plus the TWO STATEMENTS this module can make and must never hide**: the
 *  member is not there (`absent`) and the route did not answer (`unread`). L2 §2's read carries no `refused` arm (a read
 *  that misses answers the declared default and a refused read is caught at the same place), so those two arms are the
 *  whole of what stands beside `committed`. No arm throws, so `reading()`/`fill()` are total. */
export type ViewClientReading =
  | ViewCommittedReading
  | { readonly status: 'absent'; readonly reason: 'no-view-member' | 'no-read-route' }
  | { readonly status: 'unread'; readonly reason: 'route-threw' | 'answer-not-declared'; readonly detail: string | null }

/** **THE SHAPE — WHAT THE RENDERING ENGINE'S PATHS READ.** `filled` is the honest statement of whether ANY delivery or boot
 *  read has answered yet: `false` means the three families are the declared empty/default pair because nothing has been
 *  read, never because a store said so. `panes`/`zones`/`theme` are the last reading's admitted families, REPLACED whole
 *  on every `adopt`. */
export interface ViewShape {
  readonly filled: boolean
  readonly panes: readonly ViewPaneGeometry[]
  readonly zones: readonly ViewZone[]
  readonly theme: ViewThemeRecord
  readonly source: {
    readonly panes: ViewGeometrySource
    readonly zones: ViewGeometrySource
    readonly theme: ViewGeometrySource
  }
}

/** **A WRITE'S SYNCHRONOUS STATEMENT — THE WHOLE ANSWER THIS REALM CAN GIVE IN THE CALLER'S OWN TURN, AND NEVER THE
 *  COMMIT'S OUTCOME.** `sent` says the route was handed the write; the receipt is a tick later, and it arrives at BOTH
 *  halves of ONE register — HELD at `writeOutcome()` (the state) and PUSHED to `onWriteOutcome()`'s handlers (the event).
 *  `absent` is a realm with no crossing member or no such route: **the write went NOWHERE**, nothing was sent, so NO
 *  RECEIPT WILL EVER ARRIVE and `send` records nothing for it. **THAT ASYMMETRY IS THE SHARPEST FACT ABOUT THE PAIR**:
 *  a reader of the getter alone STRUCTURALLY CANNOT SEE a write that went nowhere — it would be handed an older receipt,
 *  or `null` — which is why this statement is read by its own synchronous reader and why the push is not a substitute
 *  for it either. A caller can say so instead of assuming it landed (the gutter's `L-5` lesson, applied to a route that
 *  no longer answers in the caller's turn). */
export type ViewWriteStatement =
  | { readonly status: 'sent' }
  | { readonly status: 'absent'; readonly reason: 'no-view-member' | 'no-route' }

/** **THE LAST WRITE'S DECLARED ANSWER, AS IT ARRIVED** — `{status:'committed'}` or the crossing's own refusal record, or
 *  `unread` where the route threw or answered a shape L2 does not declare. It is held so a REFUSED write is a reading
 *  rather than a silent no-op; nothing composes a decision from it. **THE SAME RECORD IS ALSO PUSHED, AND THAT IS THE
 *  POINT OF HOLDING IT** (L2 §9): `send`'s TWO continuations — the resolve arm that mints this record and the reject arm
 *  that mints the `route-threw` one — hand it to every `onWriteOutcome()` handler, so the two registers cannot disagree
 *  about one receipt. **`route` NAMES THE FAMILY THE RECEIPT BELONGS TO**, and `'drag'` is the fourth word: the `temp`
 *  family has no member on a reading, so this word is how a caller tells a drag's receipt from the three commits' (D-132). */
export interface ViewWriteOutcome {
  readonly route: 'pane' | 'zone' | 'theme' | 'drag'
  readonly answer: unknown
  readonly status: 'committed' | 'refused' | 'unread'
  readonly reason: string | null
  readonly message: string | null
}

/** THE SUBSCRIPTION'S OWN ANSWER — the `tabs-client` shape: whether it installed, why it did not, and a withdrawal that is
 *  always callable and never throws. */
export interface ViewSubscription {
  readonly subscribed: boolean
  readonly reason: 'no-view-member' | 'no-changed-route' | 'register-threw' | null
  readonly release: () => void
}

/** **THE BRIDGE MEMBER THIS CLIENT USES — SEVEN ROUTES, `docs/L2/view-record/interface.md` §2's whole set.** Every answer
 *  is `unknown` on purpose: a bridge is a TRUST BOUNDARY, so a shape that arrived is checked before it is read, and a
 *  member answering a value its own declaration does not admit reaches the caller as `unread` rather than as a shape
 *  derived from a partial record. **THE DRAG PAIR IS THE SIXTH AND SEVENTH AND ITS TEXT IS THE `view` MEMBER'S OWN**
 *  (`D-132`, D-112): the clear takes NOTHING, which is the `null` arm `D-140` spent a row removing. */
export interface ViewClientBridge {
  read(): Promise<unknown>
  commitPane(id: string, geometry: unknown): Promise<unknown>
  commitZones(id: string, zone: unknown): Promise<unknown>
  commitTheme(token: string, attributeName: string): Promise<unknown>
  commitDrag(id: string, geometry: unknown): Promise<unknown>
  clearDrag(): Promise<unknown>
  onChanged(handler: () => void): () => void
}

export interface ViewClientOptions {
  /** The member to read and write through. OMITTED (and never `null`) means **read the ambient `window.provident.view` at
   *  each call**, which is what the app does and what a node test drives by installing (or not installing) a stub;
   *  `null` states the ABSENT case on a realm where a member would otherwise be found. */
  readonly bridge?: ViewClientBridge | null
}

/** **THE CLIENT — the shape, the synchronous reads the drag needs, the FIVE WRITE routes it SENDS (`commitPane`/`commitZones`/`commitTheme`/`commitDrag`/`clearDrag`), and the TWO RECEIPT members that stand beside them (`writeOutcome()`'s HOLD and `onWriteOutcome()`'s PUSH, one register's state and event — L2 §9); the BRIDGE's SEVEN are those five plus `read` and `onChanged`, which this client reaches as `fill()` and `subscribe()`.** */
export interface ViewClient {
  /** THE SHAPE AS IT STANDS — `filled: false` before anything has answered. */
  shape(): ViewShape
  /** **THE DRAG'S SIZE READ — SYNCHRONOUS, over the shape, AND IT ANSWERS THE PANE'S ADJUSTABLE MEMBER NAMED BY THE PANE'S
   *  OWN `zone`** (`D-189`, `D-191`; `docs/L2/renderer-wiring/interface.md` §3). The pane's `zone` selects which of its two
   *  STORED axis members a gesture may move — `width` under `top`/`bottom`, `height` under `left`/`right` or where the
   *  member is absent (the stage, `C-9`/`C-12`) — so this answer is the figure the move writes and the release commits, and
   *  it is ONE number because a gesture moves ONE axis. **THE PAIR IS NOT HIDDEN BY THAT**: both members cross the wire and
   *  stand on `shape().panes`, admitted member for member by `paneOf`; this read names its axis (`adjustableMemberOf`) so a
   *  single figure can never be mistaken for the other axis's. A pane the standing family does not name answers the MEASURED
   *  DEFAULT (`paneGeometryIn`, the crossing's own derivation, called here and not re-spelled). */
  paneSizeOf(id: string): unknown
  /** **THE DRAG'S BOUNDS READ — SYNCHRONOUS, AND `undefined` IS A LAWFUL ANSWER** (`D-186`, `D-129`): the pair AS STORED,
   *  never a clamped policy, and a zone-resident pane stores none because its clamp is the LAYOUT's. A fresh copy on the
   *  default arm so no caller can move the measured constant; the pane's pair when the family names one. */
  paneBoundsOf(id: string): unknown
  /** **THE APPEARANCE READ — SYNCHRONOUS, AND IT ANSWERS THE CROSSING'S OWN RECORD** (D-97): the setting it carries, the
   *  attribute name the last act supplied, and **THE DECLARATION THE MECHANISM COMPUTED FOR THE PAIR**. This module never
   *  computes one: `resolveTheme` and `applyThemeDeclaration` are the crossing's (`src/main/view-record/index.ts`) and this
   *  realm applies what the record says. A shape nothing has filled answers the declared placeholder, whose `name` is
   *  `null` — so there is no `props.<name>` to write and nothing can be applied from it. */
  themeRecord(): ViewThemeRecord
  /** **THE DRAG'S ZONE READ — SYNCHRONOUS, AND ITS MISSING ARM IS `null`** (D-91): the zone the standing family names,
   *  carrying exactly the members the record admitted, or `null` where it names none. **NO DEFAULT ANSWERS HERE AND THAT IS
   *  THE MEASUREMENT**: the frozen store held no zone default, its read answered `undefined` on a MISS and `candidatesFor`
   *  answered `[]`, so `null` is what the app's own paths answer today — a derivation inventing a geometry would be a
   *  second authority beside the creation repair. */
  zoneOf(id: string): ViewZone | null
  /** **THE PANE ROUTE.** Sent, never awaited; the shape is refilled by the delivery the commit causes. */
  commitPane(id: string, geometry: unknown): ViewWriteStatement
  /** **THE ZONE ROUTE.** One zone id and the members this caller has, sent; the crossing composes the family from what
   *  stands, so a client one delivery stale cannot erase a zone it has not read. */
  commitZones(id: string, zone: unknown): ViewWriteStatement
  /** **THE APPEARANCE ROUTE — THE USER ACTION'S ONE WRITE** (D-97): the setting the authored control produced and the
   *  attribute name this realm holds, sent AS THE ACT and never as a resolution. The crossing's pair derives the
   *  declaration inside the same commit and the change push carries it back, which is why nothing here awaits an answer:
   *  the shape is refilled by the delivery the commit causes. */
  commitTheme(token: string, attributeName: string): ViewWriteStatement
  /** **THE DRAG'S MOVE — ONE PANE'S IN-PROCESS PLACEMENT, SENT** (D-132): a pane **id** and the placement the gesture read,
   *  and never a path and never a tier — the address is the crossing's. The shape is refilled by the delivery the commit
   *  causes, so nothing here awaits an answer, and **nothing here composes the value**: the placement the caller formatted
   *  is the value the crossing writes (D-135, D-136). */
  commitDrag(id: string, geometry: unknown): ViewWriteStatement
  /** **THE DRAG'S END — SENT WITH NO ARGUMENT AT ALL** (D-132, D-140): the crossing DELETES the `temp` family, so the
   *  address answers `absent` once the gesture is over. A `null` argument is the spelling `D-140` removed, so this member
   *  carries none. */
  clearDrag(): ViewWriteStatement
  /** **THE ONE STATED BOOT READ** (`D-78`'s chain, `D-88`): the answer is ADOPTED into the shape, and every later fill is a
   *  delivery's. Total: every arm is a value. */
  fill(): Promise<ViewClientReading>
  /** **THE DELIVERY'S DUTY**: one subscription over the member's push, each delivery re-reading and adopting. The push
   *  carries an ADDRESS and never a value, so a re-read is the only correct answer to it. */
  subscribe(handler: (reading: ViewClientReading) => void): ViewSubscription
  /** **THE REFILL — the single act `fill()` and every delivery end in.** Replaces the whole shape by value; a reading whose
   *  answer is not L2 §2's leaves the shape as it stood and is reported, because a partial record must never become the
   *  shape a renderer renders. */
  adopt(reading: ViewClientReading): void
  /** The last reading, or `null` before the first. */
  reading(): ViewClientReading | null
  /** The last write's declared answer, or `null` before the first. */
  writeOutcome(): ViewWriteOutcome | null
  /** **THE RECEIPT'S EVENT — THE PUSH THAT STANDS BESIDE `writeOutcome()`'S HOLD** (L2 §9, `D-167`'s routing of the three
   *  drag routes). Each receipt is handed to every registered handler FROM `send`'s OWN CONTINUATION, which is the place
   *  the answer arrives and the place `lastWrite` is assigned — so nothing is asked twice, nothing is read on a turn of
   *  its own, and the handler is handed THE SAME RECORD the getter holds.
   *
   *  **IT CANNOT FAIL AND IT ANSWERS THE WITHDRAWAL**: this realm's registration has no bridge half to refuse, so it is
   *  `() => void` and not a `ViewSubscription`. The withdrawal is IDEMPOTENT — calling it twice is not an error — and it
   *  never throws. **A THROWING HANDLER IS CONTAINED**: it stops at its own call and affects neither the write path nor
   *  the record, which is already held.
   *
   *  **WHY A PUSH AT ALL**: a promise handed back from a route would re-grain `ViewWriteStatement` and every statement
   *  battery, and a read on a later turn would be a poll for a turn that never comes — a refusal produces NO delivery,
   *  so the shape's subscription cannot be this reader. **THE GETTER IS NOT A SUBSTITUTE FOR IT**: `send` records nothing
   *  for an `absent` statement, so a getter-only reader structurally cannot see a write that went nowhere. `writeOutcome()`
   *  is the STATE and this is the EVENT — the relation `reading()`/`subscribe()` already are, one register up. */
  onWriteOutcome(handler: (outcome: ViewWriteOutcome) => void): () => void
}

/** The shape before anything has answered: the declared empty pair and the measured-default source. **IT IS NOT A
 *  SUBSTITUTION AT THE READ AND IT DOES NOT PRETEND TO BE ONE** — `filled: false` says no delivery has arrived, and
 *  `source: 'default'` is the same word the crossing uses for a family that stands at its placeholder. */
const emptyShape = (): ViewShape => ({
  filled: false,
  panes: [],
  zones: [],
  theme: viewThemePlaceholder(),
  source: { panes: 'default', zones: 'default', theme: 'default' },
})

/** THE AMBIENT MEMBER, READ AT CALL TIME — never at construction, so a bridge installed after the client was built is still
 *  found, and a realm with no `window` at all is the absent case rather than a `ReferenceError`. TOTAL: every step is a
 *  `typeof` guard. */
function ambientViewMember(): unknown {
  if (typeof window === 'undefined') return null
  const provident = (window as unknown as { provident?: unknown }).provident
  if (provident === null || provident === undefined || typeof provident !== 'object') return null
  const member = (provident as { view?: unknown }).view
  return member === null || member === undefined ? null : member
}

const isObject = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object'

const finiteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)

/** **ONE PANE, ADMITTED FIELD BY FIELD, FROM THE WIRE** — the same admission the crossing performs on its own store, applied
 *  on this side of the boundary because the answer crossed a trust boundary to get here. A member this module cannot admit
 *  is DROPPED, which is the crossing's own disposition: a family is the panes it can state, and the missing one answers the
 *  measured default rather than a guess.
 *
 *  **BOTH AXIS MEMBERS ARE REQUIRED AND EACH IS READ AT ITS OWN NAME** (`D-189`, `D-190`; L2 §1, §3): `width` and `height`
 *  replace the one `size` this function used to parse, because a record carrying no `width` or no `height` is one the
 *  family cannot state at all — the crossing's `paneOf` drops it, so a pane arriving here without one is a divergence and
 *  not a pane with a member this realm leaves off. **`bounds` AND `zone` ARE OPTIONAL AND BOTH ARE CARRIED WHERE STATED**
 *  (`D-186`, `D-129`; L2 §3's *"every member it admits"*): a zone-resident pane's absent `bounds` is LAWFUL — its clamp is
 *  the layout's — and dropping a member the family admits while `source.panes` still says `'record'` is `D-105`'s fault
 *  exactly. An `id` is the family's key rather than a member of the value.
 *
 *  **AND SO IS `index` — THE PANE'S PLACE AMONG THE DECLARED PANES, WHICH IS THE RECORD'S ORDER** (the user's definition of
 *  rearrangement: *"dragging menu to the right of inspector should change the order to inspector, menu"*;
 *  `shared/view-shape.ts`'s block on the member states why it is per-pane and why the creation repair states none). **IT IS
 *  CARRIED WHERE STATED AND ABSENT WHERE NOT**, `bounds`/`zone`'s rule: a member the crossing admits and this side drops is
 *  `D-105`'s fault, and an ABSENT one is lawful — the reading's own order is then the order, which is the state every fresh
 *  family is in. A stated one is judged exactly as the crossing judges it (a non-negative integer), because a member this
 *  realm would round is a placement the record did not state. */
function paneOf(held: unknown): ViewPaneGeometry | null {
  if (!isObject(held) || Array.isArray(held)) return null
  const id = held['id']
  if (typeof id !== 'string' || id.length === 0) return null
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
    index?: number
  } = { id, width, height }
  if (Object.hasOwn(held, 'bounds')) {
    const bounds = held['bounds']
    if (!isObject(bounds) || Array.isArray(bounds)) return null
    const min = bounds['min']
    const max = bounds['max']
    if (!finiteNumber(min) || !finiteNumber(max) || min > max) return null
    pane.bounds = { min, max }
  }
  if (Object.hasOwn(held, 'zone')) {
    const zone = held['zone']
    if (typeof zone !== 'string' || zone.length === 0) return null
    pane.zone = zone
  }
  if (Object.hasOwn(held, 'index')) {
    const index = held['index']
    if (!finiteNumber(index) || !Number.isInteger(index) || index < 0) return null
    pane.index = index
  }
  return pane
}

/** **THE MEMBER ONE PANE'S `zone` MAKES ADJUSTABLE, NAMED BY THE SELECTION AND NEVER BY A RE-INTERPRETATION** (`D-189`,
 *  `D-191`; `docs/L2/view-record/interface.md` §1): `width` in a `top`/`bottom` zone, `height` in a `left`/`right` one, and
 *  **`height` where the `zone` member is ABSENT** — the STAGE, which `C-9` derives and `C-12` makes sidebar-equivalent, so
 *  `pane-a` adjusts its height as it always has. It selects WHICH of the two stored members a gesture may move; it never
 *  says what a figure measures, because each member's own name already does (`D-189`). */
function adjustableMemberOf(pane: ViewPaneGeometry): 'width' | 'height' {
  return pane.zone === 'top' || pane.zone === 'bottom' ? 'width' : 'height'
}

/** **ONE ZONE, ADMITTED FROM THE WIRE** — the crossing's own admission, member for member, applied on this side of the
 *  boundary because the answer crossed a trust boundary to get here (D-91). **ALL FOUR MEMBERS ARE OPTIONAL AND AN
 *  UNKNOWN MEMBER IS DROPPED, NEVER CARRIED**: the frozen store's zone record names the members its writer supplied, and
 *  an `id` is the family's key rather than a member of the value. **`slot` IS CARRIED WITHOUT A BOUNDARY CHECK AND THE
 *  OTHER THREE ARE NOT**, which is not a gap: a slot is opaque to this whole module and the crossing refuses an
 *  inadmissible one at its WRITE, so a slot that arrived here crossed that gate — while `size`, `distance` and `display`
 *  are values a layout call compares, and a member this module cannot state is a member it must not hand on. */
function zoneOfWire(held: unknown): ViewZone | null {
  if (!isObject(held) || Array.isArray(held)) return null
  const id = held['id']
  if (typeof id !== 'string' || id.length === 0) return null
  const zone: { id: string; slot?: unknown; distance?: number; size?: number; display?: string } = { id }
  if (Object.hasOwn(held, 'slot')) zone.slot = held['slot']
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

/** **THE APPEARANCE RECORD, ADMITTED FROM THE WIRE — AND ITS DERIVED MEMBER IS REQUIRED** (D-97). The crossing carries
 *  `{token?, attribute?, declaration: {name?, value, removal}}` with every `null` written as ABSENCE; this side maps the
 *  absences back to `null` and REFUSES a record whose declaration is not a readable `{value, removal}` pair, because the
 *  declaration is the whole member this realm acts on and a record missing it is a partial record, never a placeholder.
 *  **NOTHING IS DERIVED HERE**: the three members are copied, and the only thing this function decides is whether the
 *  answer is the shape L2 §2 declares (`paneOf`'s and `zoneOfWire`'s rule, applied at the one member a write depends on). */
function themeOfWire(held: unknown): ViewThemeRecord | null {
  if (!isObject(held) || Array.isArray(held)) return null
  const declaration = held['declaration']
  if (!isObject(declaration) || Array.isArray(declaration)) return null
  const value = declaration['value']
  const removal = declaration['removal']
  if (typeof value !== 'string' || typeof removal !== 'boolean') return null
  const nameRaw = declaration['name']
  if (nameRaw !== undefined && nameRaw !== null && typeof nameRaw !== 'string') return null
  const tokenRaw = held['token']
  if (tokenRaw !== undefined && tokenRaw !== null && typeof tokenRaw !== 'string') return null
  const attributeRaw = held['attribute']
  if (attributeRaw !== undefined && attributeRaw !== null && typeof attributeRaw !== 'string') return null
  const name = typeof nameRaw === 'string' && nameRaw !== '' ? nameRaw : null
  const token = typeof tokenRaw === 'string' && tokenRaw !== '' ? tokenRaw : null
  const attribute = typeof attributeRaw === 'string' && attributeRaw !== '' ? attributeRaw : null
  return { token, attribute, declaration: { name, value, removal } }
}

/** L2 §2's TWO ARMS, CHECKED RATHER THAN ASSUMED. A `committed` answer must carry ALL THREE families and all three
 *  `source` words; anything else is this module's own `answer-not-declared` with the divergence named, NEVER a shape
 *  derived from a partial record. **NO ROW IS INVENTED AND NONE IS SILENTLY KEPT**: an unadmitted member is dropped exactly
 *  where the crossing drops one. A fourth member is simply not consulted, so an answer still carrying one is not a shape
 *  this design declares (D-142). */
function committedOrDivergence(raw: unknown): { readonly reading: ViewCommittedReading } | { readonly detail: string } {
  if (!isObject(raw)) return { detail: `answer is ${raw === null ? 'null' : typeof raw}` }
  const status = raw['status']
  if (status !== 'committed') return { detail: `status is ${typeof status === 'string' ? `'${status}'` : typeof status}` }
  const heldPanes = raw['panes']
  if (!Array.isArray(heldPanes)) return { detail: 'panes is not an array' }
  const panes: ViewPaneGeometry[] = []
  for (const candidate of heldPanes) {
    const pane = paneOf(candidate)
    if (pane !== null) panes.push(pane)
  }
  const heldZones = raw['zones']
  if (!Array.isArray(heldZones)) return { detail: 'zones is not an array' }
  const zones: ViewZone[] = []
  for (const candidate of heldZones) {
    const zone = zoneOfWire(candidate)
    if (zone !== null) zones.push(zone)
  }
  const theme = themeOfWire(raw['theme'])
  if (theme === null) return { detail: 'theme is not the record L2 §2 declares' }
  const sourceRaw = raw['source']
  if (!isObject(sourceRaw) || Array.isArray(sourceRaw)) return { detail: 'source is not a plain record' }
  const panesSource = sourceRaw['panes']
  const zonesSource = sourceRaw['zones']
  const themeSource = sourceRaw['theme']
  if (panesSource !== 'record' && panesSource !== 'default') return { detail: 'source.panes is not record|default' }
  if (zonesSource !== 'record' && zonesSource !== 'default') return { detail: 'source.zones is not record|default' }
  if (themeSource !== 'record' && themeSource !== 'default') return { detail: 'source.theme is not record|default' }
  return {
    reading: {
      status: 'committed',
      panes,
      zones,
      theme,
      source: { panes: panesSource, zones: zonesSource, theme: themeSource },
    },
  }
}

/** L2 §2's ONE ANSWER, CHECKED. No `refused` arm exists on this route (the interface's own measurement), so an answer that
 *  carries one is a divergence and is reported as such rather than carried as a state no declaration names. */
function readingOrDivergence(raw: unknown): { readonly reading: ViewCommittedReading } | { readonly detail: string } {
  return committedOrDivergence(raw)
}

/** A THROWN OR REJECTED ROUTE, STATED — the message where the value has one, its spelling where it does not. */
function detailOf(error: unknown): string {
  if (error !== null && typeof error === 'object' && typeof (error as { message?: unknown }).message === 'string') {
    return (error as { message: string }).message
  }
  return typeof error === 'string' ? error : 'the route rejected with no message'
}

/** **THE CLIENT FACTORY.** It holds ONE binding — the shape — and every member is TOTAL. The shape is replaced whole by
 *  `adopt` and by nothing else, so no member can leave a partially-updated projection behind. */
export function createViewClient(options: ViewClientOptions = {}): ViewClient {
  let shape: ViewShape = emptyShape()
  let lastReading: ViewClientReading | null = null
  let lastWrite: ViewWriteOutcome | null = null
  /** **THE RECEIPT'S HANDLERS — THE EVENT BESIDE THE STATE** (L2 §9): ONE array, registered beside the one hold, so the
   *  two members of this register cannot drift apart. It is written by `onWriteOutcome` and by its withdrawal and by
   *  nothing else, and `publish` is its only reader. */
  const writeHandlers: Array<(outcome: ViewWriteOutcome) => void> = []
  /** The member, at THIS call: an injected one where the caller supplied one (including `null`, the stated absent case),
   *  the ambient `window.provident.view` otherwise. */
  const memberFor = (): unknown => (options.bridge === undefined ? ambientViewMember() : options.bridge)

  const routeOf = (member: unknown, name: 'read' | 'commitPane' | 'commitZones' | 'commitTheme' | 'commitDrag' | 'clearDrag'): ((...args: unknown[]) => Promise<unknown>) | null => {
    if (member === null) return null
    const route = (member as Record<string, unknown>)[name]
    return typeof route === 'function' ? (route as (...args: unknown[]) => Promise<unknown>).bind(member) : null
  }

  /** **ONE RECEIPT, HELD AND PUSHED — the register's ONE write, so the state and the event can never disagree about one
   *  answer** (L2 §9). The hold is assigned FIRST, before any handler runs: **EACH HANDLER CALL IS CONTAINED**, so a
   *  throwing handler can neither break the write path nor swallow the record — it loses only its own report, exactly as
   *  a throwing delivery handler does one register up. The array is copied before the loop, so a handler that withdraws
   *  itself (or its neighbour) during the push cannot skip a handler or shorten the iteration. */
  function publish(outcome: ViewWriteOutcome): void {
    lastWrite = outcome
    for (const handler of [...writeHandlers]) {
      try {
        handler(outcome)
      } catch {
        /* the caller's handler, the caller's error */
      }
    }
  }

  /** ONE WRITE, SENT — the receipt is published when it lands and composes nothing. **BOTH CONTINUATIONS PUBLISH THE SAME
   *  RECORD this getter will answer** (L2 §9): the resolve arm mints it through `outcomeOf` and the reject arm mints the
   *  `route-threw` one, and each hands it to `publish`, which is where the answer's arrival already is — so no reader
   *  needs a poll, a timer, a retry or a second read, and `writeOutcome()` is not a substitute for the push. **NOTHING IS
   *  RECORDED FOR `absent`**: a statement that never reached a route has no receipt, so a getter-only reader structurally
   *  cannot see a write that went nowhere and would answer an OLDER receipt instead. **THE ROUTE WORD NAMES THE FAMILY
   *  AND `'drag'` IS THE FOURTH**: a `temp` reading has no member on any reading, so the receipt is the one place a
   *  caller can see which family a write belonged to (D-132). */
  function send(route: 'pane' | 'zone' | 'theme' | 'drag', call: ((...args: unknown[]) => Promise<unknown>) | null, args: unknown[]): ViewWriteStatement {
    if (call === null) return { status: 'absent', reason: memberFor() === null ? 'no-view-member' : 'no-route' }
    void call(...args).then(
      (answer: unknown) => {
        publish(outcomeOf(route, answer))
      },
      (error: unknown) => {
        publish({ route, answer: null, status: 'unread', reason: 'route-threw', message: detailOf(error) })
      },
    )
    return { status: 'sent' }
  }

  function adopt(reading: ViewClientReading): void {
    lastReading = reading
    if (reading.status !== 'committed') return
    shape = {
      filled: true,
      panes: reading.panes,
      zones: reading.zones,
      theme: reading.theme,
      source: { panes: reading.source.panes, zones: reading.source.zones, theme: reading.source.theme },
    }
  }

  async function fill(): Promise<ViewClientReading> {
    const member = memberFor()
    if (member === null) return report({ status: 'absent', reason: 'no-view-member' })
    const readRoute = routeOf(member, 'read')
    if (readRoute === null) return report({ status: 'absent', reason: 'no-read-route' })
    let raw: unknown
    try {
      raw = await readRoute()
    } catch (error) {
      // A ROUTE THAT THREW IS A STATEMENT ABOUT THE TRANSPORT, NOT ABOUT THE RECORD: the store refused nothing here, so
      // the record is UNKNOWN and the shape keeps what it last read instead of being emptied.
      return report({ status: 'unread', reason: 'route-threw', detail: detailOf(error) })
    }
    let resolved: ReturnType<typeof readingOrDivergence>
    try {
      resolved = readingOrDivergence(raw)
    } catch (error) {
      return report({ status: 'unread', reason: 'answer-not-declared', detail: detailOf(error) })
    }
    if ('detail' in resolved) return report({ status: 'unread', reason: 'answer-not-declared', detail: resolved.detail })
    adopt(resolved.reading)
    return resolved.reading
  }

  /** A READING THAT FILLS NOTHING IS STILL THE LAST READING — the shape keeps what it last read, and the statement is held
   *  so a caller can tell "nothing has answered" from "the last answer was unreadable". */
  function report(reading: ViewClientReading): ViewClientReading {
    lastReading = reading
    return reading
  }

  return {
    shape(): ViewShape {
      return shape
    },

    paneSizeOf(id: string): unknown {
      // THE ADJUSTABLE MEMBER, SELECTED BY THE PANE'S OWN `zone` — never a re-interpretation of one standing number (`D-189`).
      const pane = paneGeometryIn(shape.panes, id).pane
      return pane[adjustableMemberOf(pane)]
    },

    paneBoundsOf(id: string): unknown {
      // THE PAIR AS STORED, OR `undefined` WHERE THE PANE STORES NONE: a zone-resident pane's clamp is the layout's
      // (`D-186`), so an invented pair here would be `D-91`'s second authority. The default arm's pair is COPIED.
      const pane = paneGeometryIn(shape.panes, id).pane
      if (pane.bounds === undefined) return undefined
      return { min: pane.bounds.min, max: pane.bounds.max }
    },

    themeRecord(): ViewThemeRecord {
      // THE SHAPE'S OWN RECORD, HANDED OUT AS A FRESH VALUE so no caller can move the shape the next delivery replaces
      // (`paneBoundsOf`'s reason, applied to a record with one nested object in it).
      const theme = shape.theme
      return {
        token: theme.token,
        attribute: theme.attribute,
        declaration: { name: theme.declaration.name, value: theme.declaration.value, removal: theme.declaration.removal },
      }
    },

    zoneOf(id: string): ViewZone | null {
      // THE ONE ZONE DERIVATION, CALLED AND NOT RE-SPELLED — and the miss is `null`, the answer the app's own paths give
      // for a zone nothing names (`zoneIn`'s own note). A cold shape answers `null` for every zone, exactly as the frozen
      // store's cold read answered `undefined`; nothing here invents a geometry to fill the gap.
      return zoneIn(shape.zones, id)
    },

    commitPane(id: string, geometry: unknown): ViewWriteStatement {
      const member = memberFor()
      return send('pane', routeOf(member, 'commitPane'), [id, geometry])
    },

    commitZones(id: string, zone: unknown): ViewWriteStatement {
      const member = memberFor()
      return send('zone', routeOf(member, 'commitZones'), [id, zone])
    },

    commitTheme(token: string, attributeName: string): ViewWriteStatement {
      // THE ACT, SENT — and never a declaration: the crossing's pair resolves it inside the commit and the change push
      // carries the record back, so this member's whole answer is `sent` or `absent` (D-97).
      const member = memberFor()
      return send('theme', routeOf(member, 'commitTheme'), [token, attributeName])
    },

    commitDrag(id: string, geometry: unknown): ViewWriteStatement {
      // THE PLACEMENT, SENT (D-132): the pane id and the value the caller formatted, and nothing else — no path, no tier,
      // and no composition here (`D-135`, `D-136`). The crossing's own arms answer a fault; this realm only says `sent`.
      const member = memberFor()
      return send('drag', routeOf(member, 'commitDrag'), [id, geometry])
    },

    clearDrag(): ViewWriteStatement {
      // **NO ARGUMENT AT ALL** (`D-132`, `D-140`): the act is the gesture's end, and the crossing deletes the family there.
      const member = memberFor()
      return send('drag', routeOf(member, 'clearDrag'), [])
    },

    fill,

    subscribe(handler: (reading: ViewClientReading) => void): ViewSubscription {
      const noop = (): void => undefined
      const member = memberFor()
      if (member === null) return { subscribed: false, reason: 'no-view-member', release: noop }
      const changedRoute = (member as { onChanged?: unknown }).onChanged
      if (typeof changedRoute !== 'function') return { subscribed: false, reason: 'no-changed-route', release: noop }
      let withdrawn: unknown
      try {
        withdrawn = (changedRoute as (h: () => void) => unknown).call(member, () => {
          // **THE DELIVERY'S ONLY CORRECT ANSWER IS A FRESH READ** (`guide §6.4`: the push carries an address and never a
          // value), and the read's answer REPLACES the shape. The caller's handler is handed the reading and a handler's
          // own throw stops at the handler.
          void fill().then(
            (reading) => {
              try {
                handler(reading)
              } catch {
                /* the caller's handler, the caller's error */
              }
            },
            () => undefined,
          )
        })
      } catch {
        return { subscribed: false, reason: 'register-threw', release: noop }
      }
      const bridgeWithdrawal = typeof withdrawn === 'function' ? (withdrawn as () => void) : noop
      return {
        subscribed: true,
        reason: null,
        release: () => {
          try {
            bridgeWithdrawal.call(member)
          } catch {
            /* a withdrawal that threw has still withdrawn nothing further; it never escapes here */
          }
        },
      }
    },

    adopt,

    reading(): ViewClientReading | null {
      return lastReading
    },

    writeOutcome(): ViewWriteOutcome | null {
      return lastWrite
    },

    /** **THE RECEIPT'S REGISTRATION — TOTAL IN BOTH DIRECTIONS** (L2 §9): a handler that is not a function registers
     *  nothing and still receives a callable withdrawal, and the withdrawal is IDEMPOTENT by construction — a `withdrawn`
     *  flag is set on the first call and the second returns at it, so a handler already gone is never looked for twice
     *  and a double withdrawal is not an error. Nothing here throws and nothing here reads a receipt. */
    onWriteOutcome(handler: (outcome: ViewWriteOutcome) => void): () => void {
      const noop = (): void => undefined
      if (typeof handler !== 'function') return noop
      writeHandlers.push(handler)
      let withdrawn = false
      return (): void => {
        if (withdrawn) return
        withdrawn = true
        const at = writeHandlers.indexOf(handler)
        if (at >= 0) writeHandlers.splice(at, 1)
      }
    },
  }
}

/** **A WRITE'S DECLARED ANSWER, AS IT ARRIVED** — `committed`, the crossing's own refusal record (`status: 'refused'` with
 *  its `reason`/`message`), or `unread` for a shape L2 §2 does not declare. The refusal vocabulary stays the store's: this
 *  module mints no word of its own. */
function outcomeOf(route: 'pane' | 'zone' | 'theme' | 'drag', answer: unknown): ViewWriteOutcome {
  if (!isObject(answer)) return { route, answer, status: 'unread', reason: 'answer-not-declared', message: null }
  const status = answer['status']
  if (status === 'committed') return { route, answer, status: 'committed', reason: null, message: null }
  if (status === 'refused') {
    return {
      route,
      answer,
      status: 'refused',
      reason: typeof answer['reason'] === 'string' ? answer['reason'] : null,
      message: typeof answer['message'] === 'string' ? answer['message'] : null,
    }
  }
  return { route, answer, status: 'unread', reason: 'answer-not-declared', message: null }
}

/** The measured default geometry, re-exported for a caller that must state a pane's placeholder without holding the client
 *  — `DEFAULT_PANE_BOUNDS`' own figures, and never a second spelling of them. */
export { DEFAULT_PANE_BOUNDS, defaultPaneGeometry }
