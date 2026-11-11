// src/main/view-surface/index.ts — the view record's surface module: it holds the ONE reference to the record over the
// boot's instance and is the only file a channel handler reaches it through (the `tabs-surface` arrangement, itself the
// `settings-surface` arrangement the operator's store already uses).
//
// **IT CONSTRUCTS NOTHING** — not the record's store, and (unlike `tabs-surface`, whose `createTabsRecord` call is its own
// construction) not even an instance-owning object: `createViewRecord` is handed the boot's store and owns no file, so
// this surface is a reference to the boot's store plus the crossing's DELIVERY, which the boot built and the store's
// construction already adopted — **NO `attach` AND NO `detach`, because the one registration is the construction's**
// (`D-219`, `D-70`). **THE SHAPE ARMS ARE THIS
// FILE'S AND THEY ARE ITS FIRST ACT**: `commitPane`, `commitZones`, `commitTheme` and `commitDrag` take `unknown` on
// purpose, because a typed parameter would move the check into the type system where the renderer's boundary cannot reach
// it (`docs/L3/store-tabs-record/signatures.md` §3). A malformed id or value never reaches a store verb, and each arm
// reuses the module's own reason token and sentence rather than minting a second vocabulary. **AND `clearDrag` TAKES
// NOTHING AND CHECKS NOTHING** (D-132, D-140): the act carries no argument, so its whole body is the record's delete.
import {
  createViewRecord,
  PANE_SHAPE_MESSAGE,
  PANE_SHAPE_REASON,
  THEME_SHAPE_MESSAGE,
  THEME_SHAPE_REASON,
  ZONE_SHAPE_MESSAGE,
  ZONE_SHAPE_REASON,
  type ViewDelivery,
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
  /** **THE DRAG'S MOVE — the `temp` family's one write** (D-132): `unknown` on `commitPane`'s reason, because a typed
   *  parameter would move the check into the type system where the renderer's boundary cannot reach it — so this arm
   *  answers its shape arms before any store verb exactly as the three above do. */
  commitDrag(id: unknown, geometry: unknown): ViewRecordAnswer
  /** **THE DRAG'S END — the act that ENDS the family** (D-132): it takes nothing, and the record's `clearDrag` is a DELETE
   *  rather than a placeholder, so the address answers `absent` once the gesture is over. */
  clearDrag(): ViewRecordAnswer
}

export interface ViewSurfaceOptions {
  /** THE APP'S ONE STORE (D-64, D-65, D-87): the surface neither constructs nor owns one. */
  readonly store: ViewRecordStore
  /** **THE CROSSING'S DELIVERY, BUILT BEFORE THE STORE AND ADOPTED BY IT** (`D-219`; `docs/L3/view-record/delivery.md` §4).
   *  Its four entries are the ONE registration this crossing is allowed and the construction took it, so this surface
   *  takes no subscription: it hands the delivery to the record, whose `subscribe` is the fan-out and nothing else. **The
   *  push carries an ADDRESS and never a value** — the renderer re-reads (`D-92`, L2 §2). */
  readonly delivery: ViewDelivery
}

export function createViewSurface(options: ViewSurfaceOptions): ViewSurface {
  // THE RECORD IS HELD HERE, ONCE: one reference over the boot's one instance (design §1), and over the delivery the
  // construction adopted — the surface takes no registration of its own (`D-219`, `D-129`).
  const record: ViewRecord = createViewRecord({ store: options.store, delivery: options.delivery })

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
      // the same two arms for the third family: an id that names no zone, and a record that is not one (D-91). The id's
      // DECLARED domain is the RECORD's arm and not this one (`D-151`): a well-formed id outside `DECLARED_ZONE_IDS` — `zone-2`
      // — passes both arms here and comes back `undeclared-zone`, because the declared set is read where the family is judged
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

    commitDrag(id: unknown, geometry: unknown): ViewRecordAnswer {
      // the drag's two arms ARE the panes' two (`D-132`, L2 §5): no pane id, and no plain geometry record — `commitPane`'s
      // shape arms, at the family whose member IS the placement. The `size`-required arm is the RECORD's, because it needs
      // `finiteNumber`'s own domain and the record is where `isBoundary` and the crossing's boundary are read.
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      if (geometry === null || typeof geometry !== 'object' || Array.isArray(geometry)) {
        return { status: 'refused', reason: PANE_SHAPE_REASON, message: PANE_SHAPE_MESSAGE, address: null }
      }
      return record.commitDrag(id, geometry)
    },

    clearDrag(): ViewRecordAnswer {
      // NOTHING IS CHECKED HERE BECAUSE THE ACT CARRIES NOTHING (`D-132`, D-140): the record's clear is a DELETE at the
      // family's own tier, so this arm is the delegation and no second vocabulary.
      return record.clearDrag()
    },
  }
}
