// src/main/tabs-surface/index.ts — the tab record's surface module: it CONSTRUCTS the instance once, holds the
// one reference, and is the only file that may name it (design §1; the `settings-surface` arrangement the
// operator's store already uses, `docs/L1/security-store-storeroom.md` §4).
//
// THE SHAPE ARM IS THIS FILE'S, and it is the surface's FIRST act: `commit` takes `unknown` on purpose, because
// a typed parameter would move the check into the type system where the renderer's boundary cannot reach it
// (`docs/L3/store-tabs-record/signatures.md` §3). A malformed row never reaches a store verb.
import { createTabsRecord, type TabsDelivery, type TabsRecord, type TabsRecordAnswer, type TabsRecordRow } from '../tabs-record/index.js'

export type TabsReadAnswer =
  | { readonly status: 'committed'; readonly order: readonly string[]; readonly landing: string; readonly rows: readonly TabsRecordRow[] }
  | { readonly status: 'refused'; readonly reason: string; readonly message: string; readonly address: readonly (string | number)[] | null }

export interface TabsSurface {
  read(): TabsReadAnswer
  commit(row: unknown): TabsRecordAnswer
  /** L2 §2's fourth route: a tab leaves by name, and the order seat is rewritten without it. */
  remove(id: unknown): TabsRecordAnswer
}

export interface TabsSurfaceOptions {
  /** THE APP'S ONE STORE (D-64, D-65): this surface neither constructs nor owns one. */
  readonly store: import('../tabs-record/index.js').TabsRecordStore
  /** **THE CROSSING'S DELIVERY, BUILT BEFORE THE STORE AND ADOPTED BY IT** (`D-219`; `docs/L3/store-tabs-record/delivery.md`
   *  §4). Its one entry at `['tabs']` is the ONE registration this crossing is allowed and the construction took it, so this
   *  surface takes no subscription: it hands the delivery to the record, whose `subscribe` is the fan-out and nothing else.
   *  **The push carries an ADDRESS and never the record** — the renderer re-reads (L2 §2, `D-92`). */
  readonly delivery: TabsDelivery
}

const plain = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

export function createTabsSurface(options: TabsSurfaceOptions): TabsSurface {
  // THE INSTANCE IS CONSTRUCTED HERE, ONCE, AND HELD HERE: one reference, one file, one constraint (design §6) — and over
  // the delivery the store's construction already adopted, so this surface takes no registration of its own (`D-219`).
  const record: TabsRecord = createTabsRecord({ store: options.store, delivery: options.delivery })

  return {
    read(): TabsReadAnswer {
      const answer = record.read()
      if ('order' in answer) {
        return { status: 'committed', order: answer.order, landing: answer.landing, rows: answer.rows }
      }
      if (answer.status === 'refused') {
        return {
          status: 'refused',
          reason: answer.reason ?? 'refused',
          message: answer.message ?? 'the tab record refused the read',
          address: answer.address ?? null,
        }
      }
      return { status: 'refused', reason: 'refused', message: 'the tab record refused the read', address: null }
    },

    commit(row: unknown): TabsRecordAnswer {
      // the shape arm, before any store verb
      if (!plain(row)) {
        return { status: 'refused', reason: 'malformed-row', message: 'the commit carries no tab id, or no plain record', address: null }
      }
      return record.commit(row as unknown as TabsRecordRow)
    },

    remove(id: unknown): TabsRecordAnswer {
      // the shape arm before any store verb, as `commit`'s is
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: 'malformed-row', message: 'the removal names no tab id', address: null }
      }
      return record.remove(id)
    },
  }
}
