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
  readonly userDataDir: string
  readonly journalLength?: number
}

export interface TabsRecord {
  read(): TabsRecordReading | TabsRecordAnswer
  commit(row: TabsRecordRow): TabsRecordAnswer
  subscribe(handler: () => void): () => void
}

/** The instance's own file name. Nothing outside `tabs-surface/` spells it (design §1's absence claim). */
export const TABS_RECORD_FILE_NAME = 'provident-tabs-record.json'
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


/** THE `exactly-one-active` CONSTRAINT — the module's own function, registered into the engine (D-63; `guide §7.2`
 *  route one, `cfg.constraints`). The engine invokes it with the attempt's own context and reads its answer:
 *  **`true` is the only pass value**, and an object carrying a `message` is a rejection (`guide §7.2`, `§7.5`,
 *  and the `landing-page-must-stand` example at `§7.7`).
 *
 *  THE BODY READS THE RECORD, which `guide §7.6` says is the caller's work and not a defect: a constraint that
 *  cares about a location other than the one it judges **reads that location**, and a read inside a body brackets
 *  no commit and is judged by nothing (`§7.6`'s measured clause of 2026-10-28). */
const exactlyOneActive = (store: Store) => (): true | { message: string; repair: () => void } => {
  let order: string[] = []
  try {
    const read = store.read(TABS_ORDER_ADDRESS, 'file') as unknown
    if (Array.isArray(read)) order = read.filter((id): id is string => typeof id === 'string')
  } catch {
    return true // a record with no order seat carries no tabs, so it carries no second active tab
  }
  let active = 0
  for (const id of order) {
    try {
      const value = store.read(['tabs', id], 'file') as unknown
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        if ((value as { active?: unknown }).active === true) active += 1
      }
    } catch {
      // an id whose record the store does not hold cannot be an active tab
    }
  }
  if (active <= 1) return true
  return {
    message: 'the tab record carries more than one active tab',
    // **THE REPAIR IS A FUNCTION ON THE RETURNED OUTCOME** (`provident-storeroom`'s constraint contract,
    // `docs/specs/storeroom-constraints/contract.md` §(viii): the outcome object's `message` and `repair` members
    // are what the kernel reads; `bindings/js/src/entry/kernel-attempt.mjs` reads an own `repair` and, where it is
    // a function, invokes it as `repair(repairContext)` through `repairInCommit` — so the writes below JOIN the
    // attempt's own commit rather than opening a second one (upstream `D-45`, `D-46` item 2).
    //
    // It keeps the last tab in the order active and deactivates the rest: the same rule the boundary applied
    // before the arm was documented, now expressed where the engine evaluates it.
    repair: () => {
      const rows: TabsRecordRow[] = []
      for (const id of order) {
        try {
          const value = store.read(['tabs', id], 'file') as unknown
          if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            const row = { ...(value as Record<string, unknown>), id } as unknown as TabsRecordRow
            if (row.active === true) rows.push(row)
          }
        } catch {
          // an id whose record the store does not hold cannot be an active tab
        }
      }
      if (rows.length <= 1) return
      const keep = rows[rows.length - 1]
      for (const row of rows) {
        if (row.id === keep.id) continue
        try {
          store.write(['tabs', row.id], 'file', { ...row, active: false })
        } catch {
          // a write the store refuses leaves the engine's own refusal to answer; this body adds no sentence of its own
        }
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

export function createTabsRecord(options: TabsRecordOptions): TabsRecord {
  let store: Store | null = null
  let refusal: TabsRecordAnswer | null = null
  try {
    store = storeCreate({
      journalLength: options.journalLength ?? 1024,
      listeners: [],
      // THE CONSTRAINT IS ARMED AT CONSTRUCTION (`guide §7.2` route one): the element carries the pair AND the
      // function, and a construction that refused the list would throw before any filesystem act.
      // THE BATCHED DECLARATIONS (D-65): one list, one construction act, and the ids are unique within it — a
      // repeated id in one supplied list is REJECTED by the package (`guide §7.2`), so the four are named apart.
      constraints: [
        {
          address: TABS_RECORD_ADDRESS,
          id: TABS_CONSTRAINT_ID,
          constraint: (context: unknown) => {
            void context
            return exactlyOneActive(store as Store)()
          },
        },
        {
          address: TABS_RECORD_ADDRESS,
          id: 'tab-has-title',
          constraint: (context: unknown) => {
            void context
            return tabHasTitle(store as Store)()
          },
        },
        {
          address: TABS_RECORD_ADDRESS,
          id: 'tab-has-content',
          constraint: (context: unknown) => {
            void context
            return tabHasContent(store as Store)()
          },
        },
        {
          address: TABS_RECORD_ADDRESS,
          id: 'tab-has-lastActiveAt',
          constraint: (context: unknown) => {
            void context
            return tabHasLastActiveAt(store as Store)()
          },
        },
      ],
      filePath: join(options.userDataDir, TABS_RECORD_FILE_NAME),
    })
  } catch (caught) {
    refusal = {
      status: 'refused',
      reason: caught instanceof Error && typeof (caught as { status?: unknown }).status === 'string'
        ? String((caught as { status?: unknown }).status)
        : 'FilePathUnreachable',
      message: 'the tab record could not stand, so no tab can be read or committed',
      address: null,
    }
  }

  const standing = store
  if (standing === null) {
    return {
      read: () => refusal as TabsRecordAnswer,
      commit: () => refusal as TabsRecordAnswer,
      subscribe: () => () => undefined,
    }
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
      return { status: 'committed', order, landing, rows: rowsNow(order) }
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
      // THE CORRECTIVE WRITE (design §4's invariant, enforced here — see this file's header): a commit that
      // makes a tab active deactivates every other active tab, so the set answers one active at rest.
      const repaired = row.active && rowsNow(order).some((other) => other.id !== row.id && other.active)
      try {
        if (repaired) {
          for (const other of rowsNow(order)) {
            if (other.id !== row.id && other.active) {
              const quiet: TabsRecordRow = { ...other, active: false }
              standing.write(['tabs', other.id], 'file', quiet)
            }
          }
        }
        const answer = standing.write(['tabs', row.id], 'file', row) as unknown
        standing.write(TABS_ORDER_ADDRESS, 'file', next)
        if (row.active) standing.write(TABS_LANDING_ADDRESS, 'file', row.id)
        const cursor = plain(answer) && typeof answer['cursor'] === 'number' ? answer['cursor'] : undefined
        return { status: 'committed', ...(cursor === undefined ? {} : { cursor }), ...(repaired ? { repaired: true } : {}) }
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
