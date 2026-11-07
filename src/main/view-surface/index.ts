// src/main/view-surface/index.ts — the view record's surface module: it holds the ONE reference to the record over the
// boot's instance and is the only file a channel handler reaches it through (the `tabs-surface` arrangement, itself the
// `settings-surface` arrangement the operator's store already uses).
//
// **IT CONSTRUCTS NOTHING** — not the record's store, and (unlike `tabs-surface`, whose `createTabsRecord` call is its own
// construction) not even an instance-owning object: `createViewRecord` is handed the boot's store and owns no file, so
// this surface is a reference to the boot's store plus the one subscription the push needs. **THE SHAPE ARMS ARE THIS
// FILE'S AND THEY ARE ITS FIRST ACT**: `commitPane`, `commitZones` and `commitTheme` take `unknown` on purpose, because a
// typed parameter would move the check into the type system where the renderer's boundary cannot reach it
// (`docs/L3/store-tabs-record/signatures.md` §3). A malformed id or value never reaches a store verb, and each arm
// reuses the module's own reason token and sentence rather than minting a second vocabulary.
import {
  createViewRecord,
  PANE_SHAPE_MESSAGE,
  PANE_SHAPE_REASON,
  THEME_SHAPE_MESSAGE,
  THEME_SHAPE_REASON,
  ZONE_SHAPE_MESSAGE,
  ZONE_SHAPE_REASON,
  type ViewRecord,
  type ViewRecordAnswer,
  type ViewRecordStore,
  type ViewThemeRecord,
} from '../view-record/index.js'

/** **THE READ IS TOTAL AND CARRIES NO REFUSED ARM**, which is the module's own measurement and not an omission: a read
 *  that MISSes answers the family's declared default and one that refuses is caught at the same place, so there is no
 *  value this route can answer that is not a reading. The tab record's read keeps a refused arm because its `read` is
 *  handed the store's own refusal; this one composes its answer from admissions that are total. **AND IT ANSWERS THE
 *  THREE SURVIVING FAMILIES AND NO FOURTH**, with one `source` word per family (D-142). */
export type ViewReadAnswer = {
  readonly status: 'committed'
  readonly panes: readonly import('../view-record/index.js').ViewPaneGeometry[]
  readonly zones: readonly import('../view-record/index.js').ViewZone[]
  readonly theme: ViewThemeRecord
  readonly source: {
    readonly panes: 'record' | 'default'
    readonly zones: 'record' | 'default'
    readonly theme: 'record' | 'default'
  }
}

export interface ViewSurface {
  read(): ViewReadAnswer
  commitPane(id: unknown, geometry: unknown): ViewRecordAnswer
  commitZones(id: unknown, zone: unknown): ViewRecordAnswer
  commitTheme(token: unknown, attributeName: unknown): ViewRecordAnswer
  attach(): void
  detach(): void
}

export interface ViewSurfaceOptions {
  /** THE APP'S ONE STORE (D-64, D-65, D-87): the surface neither constructs nor owns one. */
  readonly store: ViewRecordStore
  /** The change push: called once per committed change of EITHER family's root, and never handed the value — the
   *  delivery names that the view moved, and a renderer that needs the value re-reads (L2 §2). */
  readonly onChanged?: () => void
}

export function createViewSurface(options: ViewSurfaceOptions): ViewSurface {
  // THE RECORD IS HELD HERE, ONCE: one reference over the boot's one instance (design §1).
  const record: ViewRecord = createViewRecord({ store: options.store })
  let off: (() => void) | null = null

  return {
    read(): ViewReadAnswer {
      const answer = record.read()
      return {
        status: 'committed',
        panes: answer.panes,
        zones: answer.zones,
        theme: answer.theme,
        source: answer.source,
      }
    },

    commitPane(id: unknown, geometry: unknown): ViewRecordAnswer {
      // the shape arm, before any store verb
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      return record.commitPane(id, geometry)
    },

    commitZones(id: unknown, zone: unknown): ViewRecordAnswer {
      // the same two arms for the third family: an id that names no zone, and a record that is not one (D-91)
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: ZONE_SHAPE_REASON, message: ZONE_SHAPE_MESSAGE, address: null }
      }
      if (zone === null || typeof zone !== 'object' || Array.isArray(zone)) {
        return { status: 'refused', reason: ZONE_SHAPE_REASON, message: ZONE_SHAPE_MESSAGE, address: null }
      }
      return record.commitZones(id, zone)
    },

    commitTheme(token: unknown, attributeName: unknown): ViewRecordAnswer {
      // the two arms for the appearance act: a setting that is not a string, and an attribute name a caller could not
      // compose a write from (D-97). Both answer the module's own token and sentence, before any store verb.
      if (typeof token !== 'string') {
        return { status: 'refused', reason: THEME_SHAPE_REASON, message: THEME_SHAPE_MESSAGE, address: null }
      }
      if (typeof attributeName !== 'string' || attributeName.length === 0) {
        return { status: 'refused', reason: THEME_SHAPE_REASON, message: THEME_SHAPE_MESSAGE, address: null }
      }
      return record.commitTheme(token, attributeName)
    },

    /** The change push: ONE subscription over ALL THREE roots, held here so `detach` can withdraw exactly what `attach`
     *  took. */
    attach(): void {
      if (off !== null) return
      off = record.subscribe(() => options.onChanged?.())
    },

    detach(): void {
      if (off === null) return
      off()
      off = null
    },
  }
}
