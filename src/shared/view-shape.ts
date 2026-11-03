// src/shared/view-shape.ts — THE VIEW RECORD'S DECLARED SHAPE, ONE SPELLING FOR BOTH REALMS (D-88).
//
// WHY THIS FILE EXISTS AT ALL, AND WHY IT IS `shared/` RATHER THAN `main/`. The crossing declares the view record's two
// families in `src/main/view-record/index.ts` (D-87), and the RENDERER now reads the same two families through the same
// member (`src/renderer/view-client.ts`). Two realm-local copies of the shapes, the measured defaults and the per-pane
// derivation would be two answers to "what is a pane geometry" — the one-spelling rule (`D-73`) applied to a vocabulary
// rather than to a function. So the vocabulary is here, `main` re-exports every name from its own module (no cite moves),
// and the renderer imports it instead of reaching into a main-process module.
//
// IT IS THE SHAPE AND NOT A STORE (D-78's ruling 3, D-88). Nothing here holds anything: these are type declarations, three
// measured constants and two PURE functions. No address space, no persistence, no constraint, no listener, no instance —
// a value of these types is thrown away and rebuilt on every delivery, which is exactly what makes it a projection rather
// than a record.
//
// **THE MEASURED DEFAULTS ARE THE TREE'S OWN AND NOT THIS FILE'S INVENTION** (D-87's ground, quoted rather than re-derived):
// the authored pane's `props` read `size '100'`, `min '0'`, `max '200'`, and `gutterSeamExample`'s `startSizeOf`/`boundsOf`
// fall back to the same three figures. The frozen store the view record replaces held NO pane default at all, so a read that
// MISSed at both of its tiers answered `undefined` — an unusable value that made the release refuse `'unusable-default'`
// with ZERO writes and made every move INVALID. The default is therefore the placeholder a REPAIR mints at the store's
// creation (`panes-must-stand`), and the same value this file's derivation answers for a pane the standing family does not
// name — one authority read from both sides.

/** One pane's geometry, admitted field by field: an unknown member is dropped, never carried. */
export interface ViewPaneGeometry {
  readonly id: string
  readonly size: number
  readonly bounds: { readonly min: number; readonly max: number }
}

/** **THE FOCUS ENTRY, AS THE MIRROR CARRIES IT — `src/shared/focus-model.ts`'s `FocusEntry`, narrowed to what the store's
 *  boundary admits and to what one identity test can compare.** The model declares `id` and `target` as `unknown` and
 *  compares ids with `===`; the crossing carries strings, booleans, finite numbers, plain objects and arrays and refuses
 *  `null` and `undefined` at the boundary. So `id` is narrowed to the three primitives `===` compares BY VALUE, while
 *  `target` stays opaque because the model never consults it, and `label` stays the model's own optional string. */
export interface ViewFocusEntry {
  readonly id: string | number | boolean
  readonly target: unknown
  readonly label?: string
}

/** **THE MIRROR ITSELF — `FocusState` with the absent active spelled as ABSENCE.** The model's `activeId` is
 *  `FocusId | null` and `null` is not a value the store's boundary admits, so a mirror with nothing active is a record
 *  carrying NO `activeId` member at all; every read maps that absence back to `null`, which is exactly the declared empty
 *  pair the focus model already answers for a MISS. */
export interface ViewFocusMirror {
  readonly entries: readonly ViewFocusEntry[]
  readonly activeId: string | number | boolean | null
}

/** **WHERE ONE PANE'S GEOMETRY CAME FROM, AND IT NAMES A REAL DIFFERENCE**: `'record'` when the family names this pane and
 *  `'default'` when the measured default answered because it does not. The member exists because the alternative is a read
 *  that cannot be told from a store that answered `100` — the distinction `D-84` insisted on when it refused to let a
 *  placeholder be substituted at the READ and called a record. */
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
