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
const exactlyOneActive = (store: Store) => (): true | { message: string } => {
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
  return active > 1 ? { message: 'the tab record carries more than one active tab' } : true
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
      constraints: [
        {
          address: TABS_RECORD_ADDRESS,
          id: TABS_CONSTRAINT_ID,
          constraint: (context: unknown) => {
            void context
            return exactlyOneActive(store as Store)()
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
