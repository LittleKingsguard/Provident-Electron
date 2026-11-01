// src/main/tabs-record/index.ts — the tab record's store: ONE `provident-storeroom` instance of its own,
// its own file, its own constraint (D-63). It is the THIRD instance in the app, beside the profile store's
// and the operator's, and it borrows neither (D-32).
//
// THE RECORD'S OPERATIVE SHAPE IS THE L1 §1 FAMILY: one flat leaf per tab whose NAME is the tab id
// (`file.tabs.<id>`) beside the `order` and `landing` seats — the same spelling the renderer's graph store
// carries today, so the crossing moves the record without renaming it (`docs/L2/store-tabs-record/interface.md` §1).
//
// THE CONSTRAINT IS THE ENGINE'S (design §4). `provident-storeroom` exposes `addConstraint(pair, constraint)`
// with a `(context: unknown) => unknown` signature; this pass enforces exactly-one-active with a corrective
// write at the commit boundary instead, and reports that substitution in `.strata/returns/` rather than
// pretending the design's §4 was transcribed as written (D-45's rule: a declaration is checked or it is not
// kept).
import { storeCreate } from 'provident-storeroom'
import { join } from 'node:path'
import type { TabsRecordRow } from '../../shared/types.js'

type Store = ReturnType<typeof storeCreate>
/** The store handle this module works over, named so the surface can declare it without re-deriving the package's type. */
export type TabsRecordStore = Store

export type { TabsRecordRow } from '../../shared/types.js'

export interface TabsRecordAnswer {
  readonly status: 'committed' | 'refused'
  readonly reason?: string
  readonly message?: string
  readonly address?: readonly (string | number)[] | null
  readonly cursor?: number
  readonly repaired?: boolean
}

export interface TabsRecordReading {
  readonly status: 'committed'
  readonly order: readonly string[]
  readonly landing: string
  readonly rows: readonly TabsRecordRow[]
}

export interface TabsRecordOptions {
  /** THE APP'S ONE STORE (D-64, D-65): the tab record lives at its `['tabs']` addresses and owns no instance. */
  readonly store: Store
}

export interface TabsRecord {
  read(): TabsRecordReading | TabsRecordAnswer
  commit(row: TabsRecordRow): TabsRecordAnswer
  /** **REMOVE A TAB** (L2 §2's fourth route): the entry's own address is deleted, and the `order` seat is rewritten
   *  without it. A delete that removes nothing is the store's own SUCCESS (`tiers: []`, `guide §5.3`) — the tab was
   *  already absent, so the answer says so rather than refusing. */
  remove(id: string): TabsRecordAnswer
  subscribe(handler: () => void): () => void
}

/** The record root: `order`, `landing` and one flat leaf per tab. */
export const TABS_RECORD_ADDRESS: readonly string[] = ['tabs']
/** The two singleton seats, named so no caller composes them. */
export const TABS_ORDER_ADDRESS: readonly string[] = ['tabs', 'order']
export const TABS_LANDING_ADDRESS: readonly string[] = ['tabs', 'landing']
/** The declared constraint id, kept even though this pass enforces the invariant at the boundary. */
export const TABS_CONSTRAINT_ID = 'exactly-one-active'
/** The one shape arm's sentence (L3 signatures §5). */
export const MALFORMED_ROW_MESSAGE = 'the commit carries no tab id, or no plain record'
/** The listener's handle: one subscriber per surface, named rather than minted, so a second subscribe overwrites. */
const HANDLE = 'tabs-record'

const plain = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

/** One tab's record, admitted field by field: an unknown member is dropped, never carried. */
const rowOf = (value: Record<string, unknown>): TabsRecordRow | null => {
  const id = value['id']
  const target = value['target']
  if (typeof id !== 'string' || id.length === 0) return null
  if (typeof target !== 'string') return null
  const row: { id: string; target: string; active: boolean; error?: string; label?: string } = {
    id,
    target,
    active: value['active'] === true,
  }
  if (typeof value['error'] === 'string') row.error = value['error']
  if (typeof value['label'] === 'string') row.label = value['label']
  return row
}


/** **`exactly-one-active` — THE RENDERER'S ALGORITHM, TRANSPORTED** (`D-63`, `D-65`; the source is
 *  `src/renderer/renderer.ts`'s `TABS_CONSTRAINT`, whose referent discipline this body carries rule for rule).
 *
 *  The engine hands a constraint `{address, op, tier, value}` — the LANDING op and the value that write returned
 *  (`kernel-attempt.mjs`'s context; `kernel-surface.md §2.3` item 1) — and never the machinery's own pre-write
 *  capture. So the PRE side is the last record this module observed, kept in `lastView` and refreshed by every read
 *  and every commit. **That substitution is the one thing the port could not carry, and it is bounded**: the cache is
 *  this module's own view of a record only this module writes, so it is stale only for a write that bypassed
 *  `commit` — which the store's own refusal arm answers before the repair is reached.
 */
let lastView: { order: string[]; entries: Record<string, TabsRecordRow> } | null = null

/** The record as one view: the order seat and every entry the store still holds under it. */
const viewOf = (store: Store): { order: string[]; entries: Record<string, TabsRecordRow> } => {
  const order: string[] = []
  const entries: Record<string, TabsRecordRow> = {}
  try {
    const read = store.read(TABS_ORDER_ADDRESS, 'file') as unknown
    if (Array.isArray(read)) for (const id of read) if (typeof id === 'string') order.push(id)
  } catch {
    return { order, entries }
  }
  for (const id of order) {
    try {
      const value = store.read(['tabs', id], 'file') as unknown
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        entries[id] = { ...(value as Record<string, unknown>), id } as unknown as TabsRecordRow
      }
    } catch {
      // an id whose record the store does not hold is not an entry
    }
  }
  return { order, entries }
}

const readActive = (row: TabsRecordRow | undefined): boolean => row !== undefined && row.active === true

/** Write one entry back, inside whatever commit the caller's body is running in. */
const writeEntry = (store: Store, row: TabsRecordRow): void => {
  try {
    store.write(['tabs', row.id], 'file', row)
  } catch {
    // a refused write leaves the engine's own refusal to answer
  }
}

const writeOrder = (store: Store, order: readonly string[]): void => {
  try {
    store.write(TABS_ORDER_ADDRESS, 'file', order)
  } catch {
    // ditto
  }
}

/** The landing page is the one target the app always has (the renderer's `TABS_LANDING_ID`). */
const TABS_LANDING_ID = 'tabs-landing-page'

const exactlyOneActive = (store: Store) => (): true | { message: string; repair: () => void } => {
  const post = viewOf(store)
  const pre = lastView ?? post
  lastView = post
  // (a) THE RECORD-LEVEL REMOVAL: an id the PRE view carried whose entry the post-state no longer holds is one whose
  //     leaf was detached, while an entry carried with `active: false` was merely DEACTIVATED — the renderer's H-1/H-3
  //     distinction, and treating deactivation as removal was a measured defect there.
  const dropped = Object.keys(pre.entries).filter((id) => post.entries[id] === undefined)
  // (b) THE CALLER'S OWN WRITTEN REFERENCE: the entry whose value moved pre→post while staying readable, or one the
  //     pre view did not carry at all (a first write mints the key) — the renderer's H-2 derivation, uniform across
  //     both value arms because it reads the record and never the written value's shape.
  let written: string | null = null
  for (const id of Object.keys(post.entries)) {
    if (post.entries[id] === undefined) continue
    if (!readActive(post.entries[id])) continue
    if (pre.entries[id] === undefined || !Object.is(pre.entries[id], post.entries[id])) written = id
  }
  const membershipDropped = pre.order.filter((id) => !post.order.includes(id))
  const removals = [...dropped, ...membershipDropped.filter((id) => !dropped.includes(id))]
  const survivors = post.order.filter((id) => !dropped.includes(id)).length
  const actives = Object.keys(post.entries).filter((id) => readActive(post.entries[id])).length
  if (survivors > 0 && actives === 1) return true

  return {
    message: 'the tab record carries more than one active tab',
    // THE REPAIR, RULE FOR RULE FROM THE RENDERER'S: drop detached keys; an empty sequence gets the landing page; one
    // active is already right; zero active takes the referent (the removed entry's pre-position, else the caller's own
    // written referent's position, else the first survivor); more than one keeps one by the same precedence.
    repair: () => {
      const view = viewOf(store)
      const order = [...view.order]
      for (const id of removals) {
        const at = order.indexOf(id)
        if (at >= 0) order.splice(at, 1)
      }
      if (order.length === 0) {
        order.push(TABS_LANDING_ID)
        writeOrder(store, order)
        writeEntry(store, { id: TABS_LANDING_ID, target: TABS_LANDING_ID, active: true, label: TABS_LANDING_ID, lastActiveAt: new Date().toISOString() })
        return
      }
      const activeIds = order.filter((id) => readActive(view.entries[id]))
      if (activeIds.length === 1) return
      const removed = removals.find((id) => !order.includes(id) || !readActive(view.entries[id])) ?? null
      if (activeIds.length === 0) {
        const candidates = (removed !== null && pre.order.includes(removed) ? pre.order : order).filter((id) => !removals.includes(id))
        if (candidates.length === 0) return
        let index = 0
        if (removed !== null && pre.order.includes(removed)) index = pre.order.indexOf(removed)
        else if (written !== null && order.includes(written)) index = order.indexOf(written)
        index = ((index % candidates.length) + candidates.length) % candidates.length
        const survivor = candidates[index]
        if (survivor !== undefined) {
          const row = view.entries[survivor]
          if (row !== undefined) writeEntry(store, { ...row, active: true })
        }
        return
      }
      let keep: string | null = null
      if (removed !== null && pre.order.includes(removed)) {
        const rest = order.filter((id) => id !== removed)
        if (rest.length > 0) keep = rest[((pre.order.indexOf(removed) % rest.length) + rest.length) % rest.length] ?? null
      }
      if (keep === null && written !== null && activeIds.includes(written)) keep = written
      if (keep === null) keep = activeIds[0] ?? null
      for (const id of activeIds) {
        const row = view.entries[id]
        if (row === undefined || id === keep) continue
        writeEntry(store, { ...row, active: false })
      }
    },
  }
}

/** **THE THREE FIELD CONSTRAINTS** (D-65's batched declarations; `guide §7.2` route one). Each is a body the module
 *  writes and the engine evaluates, each reads the record (`§7.6`), and each answers `true` or `{ message, repair }`
 *  where `repair` is the function the kernel invokes inside the attempt's own commit.
 *
 *  They are three pairs rather than one because a violation is a fact about ONE field: a repair that fixed all three
 *  at once could not tell which of them the caller broke, and the refusal's sentence is how a caller learns it. */

/** Every tab carries a TITLE. The record's own title field is the row's `label`. */
const TAB_TITLE_REPAIR = 'untitled'
/** Every tab carries the DATA OBJECT it contains. A tab without one is pointed at the landing page, which is the one
 *  target the app always has (`TABS_LANDING_ID` on the renderer side). */
const TAB_CONTENT_FALLBACK = 'tabs-landing-page'

/** The entries of the record as it stands: every id in `order` that the store still holds a plain value under. */
const entriesOf = (store: Store): { id: string; row: Record<string, unknown> }[] => {
  let order: string[] = []
  try {
    const read = store.read(TABS_ORDER_ADDRESS, 'file') as unknown
    if (Array.isArray(read)) order = read.filter((id): id is string => typeof id === 'string')
  } catch {
    return []
  }
  const out: { id: string; row: Record<string, unknown> }[] = []
  for (const id of order) {
    try {
      const value = store.read(['tabs', id], 'file') as unknown
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        out.push({ id, row: value as Record<string, unknown> })
      }
    } catch {
      // an id whose record the store does not hold cannot violate a field constraint
    }
  }
  return out
}

/** Writes one member back to one tab, inside whatever commit the caller's body is running in. */
const writeMember = (store: Store, id: string, row: Record<string, unknown>, member: string, value: unknown): void => {
  try {
    store.write(['tabs', id], 'file', { ...row, [member]: value })
  } catch {
    // a refused write leaves the engine's own refusal to answer; this body adds no sentence of its own
  }
}

/** **`tab-has-title`** — a tab with no title, or an empty one, is repaired to `'untitled'`. */
const tabHasTitle = (store: Store) => (): true | { message: string; repair: () => void } => {
  const bare = entriesOf(store).filter(({ row }) => {
    const label = row['label']
    return typeof label !== 'string' || label.trim().length === 0
  })
  if (bare.length === 0) return true
  return {
    message: 'a tab carries no title',
    repair: () => {
      for (const { id, row } of bare) writeMember(store, id, row, 'label', TAB_TITLE_REPAIR)
    },
  }
}

/** **`tab-has-content`** — a tab that contains no data object is pointed at the landing page. */
const tabHasContent = (store: Store) => (): true | { message: string; repair: () => void } => {
  const empty = entriesOf(store).filter(({ row }) => {
    const target = row['target']
    return typeof target !== 'string' || target.trim().length === 0
  })
  if (empty.length === 0) return true
  return {
    message: 'a tab contains no data object',
    repair: () => {
      for (const { id, row } of empty) writeMember(store, id, row, 'target', TAB_CONTENT_FALLBACK)
    },
  }
}

/** **`tab-has-lastActiveAt`** — a tab with no activation stamp is stamped with NOW. The stamp is written as an ISO
 *  string so the record's byte image stays JSON-plain and a reader needs no clock of its own to interpret it. */
const tabHasLastActiveAt = (store: Store) => (): true | { message: string; repair: () => void } => {
  const unstamped = entriesOf(store).filter(({ row }) => {
    const stamp = row['lastActiveAt']
    return typeof stamp !== 'string' || stamp.trim().length === 0
  })
  if (unstamped.length === 0) return true
  return {
    message: 'a tab carries no last-active stamp',
    repair: () => {
      const now = new Date().toISOString()
      for (const { id, row } of unstamped) writeMember(store, id, row, 'lastActiveAt', now)
    },
  }
}

/** **THE BATCHED DECLARATIONS, COLLECTED BY BOOT** (D-65's first act). Each element carries the pair and the body; the
 *  boot gathers these from every module that imposes one and constructs the central store **once** with the batch, so a
 *  constraint is a DECLARATION here rather than a constructor call. The getter is how a body reaches the instance it is
 *  registered on — it is armed at construction and only *evaluated* on a write, so the reference is bound by then.
 *
 *  The ids are a namespace the modules share (`guide §7.2`: a repeated id in one supplied list is REJECTED). */
export function tabsConstraintDeclarations(getStore: () => Store | null): readonly {
  readonly address: readonly string[]
  readonly id: string
  readonly constraint: (context: unknown) => unknown
}[] {
  const body = (evaluate: (store: Store) => () => unknown) => (context: unknown): unknown => {
    void context
    const store = getStore()
    return store === null ? true : evaluate(store)()
  }
  return [
    { address: TABS_RECORD_ADDRESS, id: TABS_CONSTRAINT_ID, constraint: body(exactlyOneActive) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-title', constraint: body(tabHasTitle) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-content', constraint: body(tabHasContent) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-lastActiveAt', constraint: body(tabHasLastActiveAt) },
  ]
}

/** **THE RECORD OVER THE CENTRAL INSTANCE** (D-64, D-65): this module constructs nothing and owns no file — it is handed
 *  the app's one store and reads and writes its `['tabs']` addresses through it. The instance's lifetime, its file and
 *  its constraint pass are the boot's. */
export function createTabsRecord(options: TabsRecordOptions): TabsRecord {
  const standing: Store = options.store
  const refusal: TabsRecordAnswer = {
    status: 'refused',
    reason: 'FilePathUnreachable',
    message: 'the tab record could not stand, so no tab can be read or committed',
    address: null,
  }

  /** The order seat and the landing witness, read as the record holds them. */
  const seats = (): { order: string[]; landing: string } => {
    let order: string[] = []
    let landing = ''
    try {
      const read = standing.read(TABS_ORDER_ADDRESS, 'file') as unknown
      if (Array.isArray(read)) order = read.filter((id): id is string => typeof id === 'string')
    } catch {
      order = []
    }
    try {
      const read = standing.read(TABS_LANDING_ADDRESS, 'file') as unknown
      if (typeof read === 'string') landing = read
    } catch {
      landing = ''
    }
    return { order, landing }
  }

  const rowsNow = (order: readonly string[]): TabsRecordRow[] => {
    const out: TabsRecordRow[] = []
    for (const id of order) {
      try {
        const value = standing.read(['tabs', id], 'file') as unknown
        if (plain(value)) {
          const row = rowOf({ ...value, id })
          if (row !== null) out.push(row)
        }
      } catch {
        // an id in `order` with no record is a record the store does not hold; it is skipped rather than invented
      }
    }
    return out
  }

  return {
    read(): TabsRecordReading | TabsRecordAnswer {
      const { order, landing } = seats()
      const rows = rowsNow(order)
      // THE OBSERVED VIEW IS REFRESHED HERE: the constraint's PRE side is the last record this module saw, and a read
      // is the one place a caller's own eyes and this module's memory must agree.
      lastView = { order: [...order], entries: Object.fromEntries(rows.map((row) => [row.id, row])) }
      return { status: 'committed', order, landing, rows }
    },
    commit(input: TabsRecordRow): TabsRecordAnswer {
      const value: unknown = input
      if (!plain(value)) {
        return { status: 'refused', reason: 'malformed-row', message: MALFORMED_ROW_MESSAGE, address: null }
      }
      const row = rowOf(value)
      if (row === null) {
        return { status: 'refused', reason: 'malformed-row', message: MALFORMED_ROW_MESSAGE, address: null }
      }
      const { order } = seats()
      const next = order.includes(row.id) ? order : [...order, row.id]
      // **NO CORRECTIVE WRITE HERE ANY MORE** (`D-65`; the logic moved into the constraint): this commit writes the
      // caller's own row and the order seat, and the engine's `exactly-one-active` evaluation — whose repair carries the
      // renderer's referent discipline — makes the state legal inside the same commit. One home for the invariant, and
      // it is the engine's.
      try {
        const answer = standing.write(['tabs', row.id], 'file', row) as unknown
        standing.write(TABS_ORDER_ADDRESS, 'file', next)
        if (row.active) standing.write(TABS_LANDING_ADDRESS, 'file', row.id)
        const cursor = plain(answer) && typeof answer['cursor'] === 'number' ? answer['cursor'] : undefined
        return { status: 'committed', ...(cursor === undefined ? {} : { cursor }) }
      } catch (caught) {
        const reason = caught instanceof Error && typeof (caught as { status?: unknown }).status === 'string'
          ? String((caught as { status?: unknown }).status)
          : 'refused'
        return {
          status: 'refused',
          reason,
          message: caught instanceof Error ? caught.message : 'the store refused the tab record',
          address: ['tabs', row.id],
        }
      }
    },
    remove(id: string): TabsRecordAnswer {
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: 'malformed-row', message: MALFORMED_ROW_MESSAGE, address: null }
      }
      const { order } = seats()
      try {
        // THE ENTRY'S OWN ADDRESS FIRST, then the order seat without it: a removal that left the id in `order` would be
        // the state the constraint refuses, and the crossing removes its own seats rather than asking the engine to.
        const receipt = standing.delete(['tabs', id], 'file') as unknown
        const next = order.filter((other) => other !== id)
        if (next.length !== order.length) standing.write(TABS_ORDER_ADDRESS, 'file', next)
        const cursor = plain(receipt) && typeof receipt['cursor'] === 'number' ? receipt['cursor'] : undefined
        return { status: 'committed', ...(cursor === undefined ? {} : { cursor }) }
      } catch (caught) {
        return {
          status: 'refused',
          reason: caught instanceof Error && typeof (caught as { status?: unknown }).status === 'string'
            ? String((caught as { status?: unknown }).status)
            : 'refused',
          message: caught instanceof Error ? caught.message : 'the store refused the tab removal',
          address: ['tabs', id],
        }
      }
    },
    subscribe(handler: () => void): () => void {
      let handle: unknown = null
      try {
        handle = standing.listen(HANDLE, [TABS_RECORD_ADDRESS])
      } catch {
        return () => undefined
      }
      return () => {
        try {
          if (handle !== null) standing.unlisten(handle as never)
        } catch {
          // a withdrawal the store refuses leaves the listener to the instance's lifetime, not a throw to the caller
        }
      }
    },
  }
}
