// src/renderer/view-client.ts — THE VIEW RECORD'S SHAPE, HELD IN THIS REALM AND FILLED BY DELIVERIES (D-88).
//
// ═══ WHAT THIS IS, IN THE CONVENTION'S OWN TERMS ═══
// `D-78` ruling 3, verbatim: **"The provident-ssr graph is not a store. It is a rendering engine. Do not refer to it as a
// store. Do not use it as one. It controls the render and the data shape is driven by the listener events."** The chain
// that sentence fixes is **store acts (creation load, constraint/repair passes) → listener deliveries → the read → the
// data shape → the rendering engine renders it**. This module is the fourth link and nothing else: it holds THE DATA SHAPE,
// it is refilled by DELIVERIES (`onChanged` → re-read → `adopt`), and it is read SYNCHRONOUSLY by the paths that cannot
// await — the pane drag's `startSizeOf`/`boundsOf` (`renderer.ts:1700-1722` before this pass) and the focus model's
// mirror read (`:1104-1105`).
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
//   · WRITES are SENT and their receipt arrives a tick later (`writeOutcome()` is where it lands). No caller's answer is
//     composed from a receipt: the pane drag's `release` returns `void` (it already did — the old receipts were
//     discarded), and the focus route's answer is the MODEL's next state, which it already had in hand before writing.
//   · NOTHING HERE POLLS, TIMES, RETRIES OR WRITES ON A READ (`D-82` clause 4). There is exactly ONE stated boot read
//     (`fill()`), because a boot's own store acts happened before this realm subscribed and a cold profile changes nothing
//     afterwards — so no delivery exists to carry the first fill — and every later fill is a delivery's.
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
  zoneIn,
  type ViewFocusEntry,
  type ViewFocusMirror,
  type ViewGeometrySource,
  type ViewPaneGeometry,
  type ViewZone,
} from '../shared/view-shape.js'

/** THE FOCUS MODEL'S OWN STATE SHAPE, AS THE RENDERER ALREADY CONSUMES IT (`src/shared/focus-model.ts`'s `FocusState`).
 *  Declared here rather than imported so this module's read is narrowed to what the routes carry: `entries` is the mirror's
 *  own list and `activeId` is `FocusId | null`, the absent active mapped back from the crossing's ABSENCE. */
export interface ViewFocusState {
  readonly entries: readonly ViewFocusEntry[]
  readonly activeId: string | number | boolean | null
}

/** **THE READING'S COMMITTED ARM — `docs/L2/view-record/interface.md` §2's declared answer, verbatim**: the THREE families
 *  and the per-family `source` that says whether the record answered or the declared default did. It is required member
 *  for required member, so an answer that carries two families and not the third reaches the caller as `unread` rather
 *  than as a shape derived from a partial record — the strictness this file states once, applied to the whole reading. */
export interface ViewCommittedReading {
  readonly status: 'committed'
  readonly panes: readonly ViewPaneGeometry[]
  readonly focus: ViewFocusMirror
  readonly zones: readonly ViewZone[]
  readonly source: { readonly panes: ViewGeometrySource; readonly focus: ViewGeometrySource; readonly zones: ViewGeometrySource }
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
 *  read, never because a store said so. `panes`/`focus`/`zones` are the last reading's admitted families, REPLACED whole
 *  on every `adopt`. */
export interface ViewShape {
  readonly filled: boolean
  readonly panes: readonly ViewPaneGeometry[]
  readonly focus: ViewFocusMirror
  readonly zones: readonly ViewZone[]
  readonly source: { readonly panes: ViewGeometrySource; readonly focus: ViewGeometrySource; readonly zones: ViewGeometrySource }
}

/** **A WRITE'S SENT ARM.** `sent` says the route was handed the write and the receipt is not the answer — it lands in
 *  `writeOutcome()` a tick later. `absent` is a realm with no crossing member or no such route: the write went NOWHERE, and
 *  a caller can say so instead of assuming it landed (the gutter's `L-5` lesson, applied to a route that no longer answers
 *  in the caller's turn). */
export type ViewWriteStatement =
  | { readonly status: 'sent' }
  | { readonly status: 'absent'; readonly reason: 'no-view-member' | 'no-route' }

/** **THE LAST WRITE'S DECLARED ANSWER, AS IT ARRIVED** — `{status:'committed'}` or the crossing's own refusal record, or
 *  `unread` where the route threw or answered a shape L2 does not declare. It is held so a REFUSED write is a reading
 *  rather than a silent no-op; nothing composes a decision from it. */
export interface ViewWriteOutcome {
  readonly route: 'pane' | 'focus' | 'zone'
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

/** **THE BRIDGE MEMBER THIS CLIENT USES — FIVE ROUTES, `docs/L2/view-record/interface.md` §2's whole set.** Every answer
 *  is `unknown` on purpose: a bridge is a TRUST BOUNDARY, so a shape that arrived is checked before it is read, and a
 *  member answering a value its own declaration does not admit reaches the caller as `unread` rather than as a shape
 *  derived from a partial record. */
export interface ViewClientBridge {
  read(): Promise<unknown>
  commitPane(id: string, geometry: unknown): Promise<unknown>
  commitFocus(mirror: unknown): Promise<unknown>
  commitZones(id: string, zone: unknown): Promise<unknown>
  onChanged(handler: () => void): () => void
}

export interface ViewClientOptions {
  /** The member to read and write through. OMITTED (and never `null`) means **read the ambient `window.provident.view` at
   *  each call**, which is what the app does and what a node test drives by installing (or not installing) a stub;
   *  `null` states the ABSENT case on a realm where a member would otherwise be found. */
  readonly bridge?: ViewClientBridge | null
}

/** **THE CLIENT — the shape, the two synchronous reads the drag and the focus model need, and the two routes.** */
export interface ViewClient {
  /** THE SHAPE AS IT STANDS — `filled: false` before anything has answered. */
  shape(): ViewShape
  /** **THE DRAG'S SIZE READ — SYNCHRONOUS, over the shape.** The named pane's stored size, and the MEASURED DEFAULT for a
   *  pane the standing family does not name (`paneGeometryIn`, the crossing's own derivation, called here and not
   *  re-spelled). */
  paneSizeOf(id: string): unknown
  /** **THE DRAG'S BOUNDS READ — SYNCHRONOUS.** The pair AS STORED, never a clamped policy; a fresh copy on the default arm
   *  so no caller can move the measured constant. */
  paneBoundsOf(id: string): unknown
  /** **THE FOCUS MODEL'S MIRROR READ — SYNCHRONOUS.** The declared empty pair where nothing has been read or where the
   *  mirror is empty; the absent active is `null`. */
  focusState(): ViewFocusState
  /** **THE DRAG'S ZONE READ — SYNCHRONOUS, AND ITS MISSING ARM IS `null`** (D-91): the zone the standing family names,
   *  carrying exactly the members the record admitted, or `null` where it names none. **NO DEFAULT ANSWERS HERE AND THAT IS
   *  THE MEASUREMENT**: the frozen store held no zone default, its read answered `undefined` on a MISS and `candidatesFor`
   *  answered `[]`, so `null` is what the app's own paths answer today — a derivation inventing a geometry would be a
   *  second authority beside the creation repair. */
  zoneOf(id: string): ViewZone | null
  /** **THE PANE ROUTE.** Sent, never awaited; the shape is refilled by the delivery the commit causes. */
  commitPane(id: string, geometry: unknown): ViewWriteStatement
  /** **THE FOCUS ROUTE.** The whole mirror the model produced, sent as one value — the crossing composes nothing. */
  commitFocus(mirror: unknown): ViewWriteStatement
  /** **THE ZONE ROUTE.** One zone id and the members this caller has, sent; the crossing composes the family from what
   *  stands, so a client one delivery stale cannot erase a zone it has not read. */
  commitZones(id: string, zone: unknown): ViewWriteStatement
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
}

/** The shape before anything has answered: the declared empty pair and the measured-default source. **IT IS NOT A
 *  SUBSTITUTION AT THE READ AND IT DOES NOT PRETEND TO BE ONE** — `filled: false` says no delivery has arrived, and
 *  `source: 'default'` is the same word the crossing uses for a family that stands at its placeholder. */
const emptyShape = (): ViewShape => ({
  filled: false,
  panes: [],
  focus: { entries: [], activeId: null },
  zones: [],
  source: { panes: 'default', focus: 'default', zones: 'default' },
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
 *  measured default rather than a guess. */
function paneOf(held: unknown): ViewPaneGeometry | null {
  if (!isObject(held) || Array.isArray(held)) return null
  const id = held['id']
  if (typeof id !== 'string' || id.length === 0) return null
  const size = held['size']
  if (!finiteNumber(size) || size < 0) return null
  const bounds = held['bounds']
  if (!isObject(bounds) || Array.isArray(bounds)) return null
  const min = bounds['min']
  const max = bounds['max']
  if (!finiteNumber(min) || !finiteNumber(max) || min > max) return null
  return { id, size, bounds: { min, max } }
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

/** **ONE FOCUS ENTRY, ADMITTED FROM THE WIRE** — the id narrowed to the three primitives `===` compares by value, `target`
 *  carried opaquely, `label` the model's optional string. */
function entryOf(held: unknown): ViewFocusEntry | null {
  if (!isObject(held) || Array.isArray(held)) return null
  const id = held['id']
  if (typeof id !== 'string' && typeof id !== 'number' && typeof id !== 'boolean') return null
  if (typeof id === 'number' && !Number.isFinite(id)) return null
  if (!('target' in held)) return null
  const entry: { id: string | number | boolean; target: unknown; label?: string } = { id, target: held['target'] }
  if (typeof held['label'] === 'string') entry.label = held['label']
  return entry
}

/** L2 §2's TWO ARMS, CHECKED RATHER THAN ASSUMED. A `committed` answer must carry ALL THREE families and all three
 *  `source` words; anything else is this module's own `answer-not-declared` with the divergence named, NEVER a shape
 *  derived from a partial record. **NO ROW AND NO ENTRY IS INVENTED AND NONE IS SILENTLY KEPT**: an unadmitted member is dropped exactly
 *  where the crossing drops one, and a dangling `activeId` — an id naming no entry of the list — is read back as the
 *  absent active, which is the state the crossing's own `dangling-active` refusal exists to prevent a caller from
 *  writing. */
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
  const heldFocus = raw['focus']
  if (!isObject(heldFocus) || Array.isArray(heldFocus)) return { detail: 'focus is not a plain record' }
  const heldEntries = heldFocus['entries']
  if (!Array.isArray(heldEntries)) return { detail: 'focus.entries is not an array' }
  const entries: ViewFocusEntry[] = []
  for (const candidate of heldEntries) {
    const entry = entryOf(candidate)
    if (entry !== null) entries.push(entry)
  }
  const activeRaw = heldFocus['activeId']
  let activeId: ViewFocusMirror['activeId'] =
    typeof activeRaw === 'string' || typeof activeRaw === 'number' || typeof activeRaw === 'boolean' ? activeRaw : null
  if (typeof activeId === 'number' && !Number.isFinite(activeId)) activeId = null
  if (activeId !== null && !entries.some((entry) => entry.id === activeId)) activeId = null
  const heldZones = raw['zones']
  if (!Array.isArray(heldZones)) return { detail: 'zones is not an array' }
  const zones: ViewZone[] = []
  for (const candidate of heldZones) {
    const zone = zoneOfWire(candidate)
    if (zone !== null) zones.push(zone)
  }
  const sourceRaw = raw['source']
  if (!isObject(sourceRaw) || Array.isArray(sourceRaw)) return { detail: 'source is not a plain record' }
  const panesSource = sourceRaw['panes']
  const focusSource = sourceRaw['focus']
  const zonesSource = sourceRaw['zones']
  if (panesSource !== 'record' && panesSource !== 'default') return { detail: 'source.panes is not record|default' }
  if (focusSource !== 'record' && focusSource !== 'default') return { detail: 'source.focus is not record|default' }
  if (zonesSource !== 'record' && zonesSource !== 'default') return { detail: 'source.zones is not record|default' }
  return {
    reading: {
      status: 'committed',
      panes,
      focus: { entries, activeId },
      zones,
      source: { panes: panesSource, focus: focusSource, zones: zonesSource },
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
  /** The member, at THIS call: an injected one where the caller supplied one (including `null`, the stated absent case),
   *  the ambient `window.provident.view` otherwise. */
  const memberFor = (): unknown => (options.bridge === undefined ? ambientViewMember() : options.bridge)

  const routeOf = (member: unknown, name: 'read' | 'commitPane' | 'commitFocus' | 'commitZones'): ((...args: unknown[]) => Promise<unknown>) | null => {
    if (member === null) return null
    const route = (member as Record<string, unknown>)[name]
    return typeof route === 'function' ? (route as (...args: unknown[]) => Promise<unknown>).bind(member) : null
  }

  /** ONE WRITE, SENT — the receipt is recorded when it lands and composes nothing. */
  function send(route: 'pane' | 'focus' | 'zone', call: ((...args: unknown[]) => Promise<unknown>) | null, args: unknown[]): ViewWriteStatement {
    if (call === null) return { status: 'absent', reason: memberFor() === null ? 'no-view-member' : 'no-route' }
    void call(...args).then(
      (answer: unknown) => {
        lastWrite = outcomeOf(route, answer)
      },
      (error: unknown) => {
        lastWrite = { route, answer: null, status: 'unread', reason: 'route-threw', message: detailOf(error) }
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
      focus: reading.focus,
      zones: reading.zones,
      source: { panes: reading.source.panes, focus: reading.source.focus, zones: reading.source.zones },
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
      return paneGeometryIn(shape.panes, id).pane.size
    },

    paneBoundsOf(id: string): unknown {
      const pane = paneGeometryIn(shape.panes, id).pane
      return { min: pane.bounds.min, max: pane.bounds.max }
    },

    focusState(): ViewFocusState {
      return { entries: shape.focus.entries, activeId: shape.focus.activeId }
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

    commitFocus(mirror: unknown): ViewWriteStatement {
      const member = memberFor()
      return send('focus', routeOf(member, 'commitFocus'), [mirror])
    },

    commitZones(id: string, zone: unknown): ViewWriteStatement {
      const member = memberFor()
      return send('zone', routeOf(member, 'commitZones'), [id, zone])
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
  }
}

/** **A WRITE'S DECLARED ANSWER, AS IT ARRIVED** — `committed`, the crossing's own refusal record (`status: 'refused'` with
 *  its `reason`/`message`), or `unread` for a shape L2 §2 does not declare. The refusal vocabulary stays the store's: this
 *  module mints no word of its own. */
function outcomeOf(route: 'pane' | 'focus' | 'zone', answer: unknown): ViewWriteOutcome {
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
