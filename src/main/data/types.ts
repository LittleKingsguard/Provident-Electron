// src/main/data/types.ts — the module's declared vocabulary, in one home (`design.md` §1;
// `signatures.md` §1). Nothing outside `index.ts` reaches into this file's exports: the five
// operations, their answer shapes and the five tool names are the surface `interface.md` §2
// declares, and `DATA_TOOL_NAMES` is the only member of it that is a value.
//
// IT NOW CARRIES ONE IMPORT, AND IT IS A TYPE (D-79, D-80): `ProfileStore` is `store.ts`'s name for the seam's own
// return type, so the composition can hand this module the store it already owns without any file here spelling
// the package (S-9). A type import is erased at build, so nothing of `store.ts` reaches the bundle through it, and
// the option that names it is REQUIRED — the surface has no way to build an instance of its own.

import type { ProfileStore } from './store.js'

/** The store's own address shape: a DENSE array of string keys and non-negative safe-integer
 *  indices (`guide §4`, rules 1-5). A dotted string is one key that happens to carry a dot. */
export type DataPath = readonly (string | number)[]

/** **The store's three persistence tokens, and now they are THE CALLER'S** (`guide §5.2`; `D-101`). The domain
 *  is the store's own and this module adds no fourth word to it; what moved is who chooses. While the tier was
 *  a module constant the surface could not express a `mem` or a `temp` address at all, which is how one
 *  `write` call created a `file` version of a root a crossing declares at `mem`. */
export type DataTier = 'file' | 'mem' | 'temp'

/** **THE CLOSED LEDGER, TWELVE WORDS, AND THE TWELFTH IS THIS PASS'S** (`D-101`). `declared-tier` is a write
 *  or a delete at an address whose ROOT one of the app's two crossings declares, asking for a tier that is not
 *  the family's. It is not `volatile-path`: that word refuses a path by its SPELLING, and its sentence says
 *  this surface "holds the durable profile only" — false from the moment the tier is the caller's — so reusing
 *  it would have meant re-wording a word that still means exactly what it says. */
export type DataRefusalReason =
  | 'malformed-arguments' | 'root-not-writable' | 'volatile-path' | 'cursor-unknown' | 'store-unreachable'
  | 'address-malformed' | 'parent-absent' | 'container-kind-conflict' | 'value-not-admitted' | 'write-failed'
  | 'declared-tier' | 'store-refused'

/** The closed refusal ledger: a VALUE, never a throw (`interface.md` §3; D-11). `floor` and
 *  `through` ride the `cursor-unknown` arm alone, `storeStatus` the `store-refused` arm alone. */
export type DataLedger = {
  status: 'refused'
  reason: DataRefusalReason
  message: string
  floor?: number
  through?: number
  storeStatus?: string
  path?: DataPath
}

export type DataReadAnswer =
  | { status: 'read'; kind: 'row' | 'branch'; path: DataPath; value: unknown }
  | { status: 'absent'; path: DataPath }
  | DataLedger

export type DataWriteAnswer = { status: 'committed'; path: DataPath; cursor: number } | DataLedger

export type DataDeleteAnswer =
  | { status: 'committed'; path: DataPath; removed: boolean; tiers: readonly DataTier[]; cursor: number | null }
  | DataLedger

export type DataListAnswer = { status: 'read'; prefix: DataPath | null; paths: readonly DataPath[]; count: number } | DataLedger

export interface DataJournalEntry {
  cursor: number
  kind: 'write' | 'delete'
  path: DataPath
  changedTo: 'present' | 'absent'
}

export type DataJournalAnswer =
  | { status: 'read'; from: number; through: number; floor: number; entries: readonly DataJournalEntry[]; count: number }
  | DataLedger

/**
 * **ONE ROOT A CROSSING HAS DECLARED, AND THE TIER IT IS DECLARED AT** (`D-101`). The two modules that own the
 * app's families publish their own — `tabs-record`'s `tabsDeclaredRoots` and `view-record`'s `viewDeclaredRoots`,
 * each built from the same address and tier constants its constraint batch is built from — and the composition
 * hands the union here. **THIS MODULE SPELLS NO ROOT OF ITS OWN**: a second spelling of `['focus']` or of `'mem'`
 * in `src/main/data/` would be the drift the corpus keeps catching (D-53), and a family that moves tier has to
 * move in one place.
 */
export interface DataDeclaredRoot {
  readonly address: readonly (string | number)[]
  readonly tier: DataTier
}

/**
 * Three members, and each one is READ by this module and nothing else — no member here opens a file, and none was
 * left behind by a deleted path (D-80).
 */
export interface DataSurfaceOptions {
  /**
   * The app's profile directory: the directory the READING names — `<profileDir>/provident-profile.json` is
   * `lstat`ed, `stat`ed and `access`ed by `readProfile`, never opened, and the FILE's name is this module's own
   * choice (D-13). **IT IS KEPT BECAUSE THE READING STILL READS IT AND NOTHING ELSE CAN**: the reading is taken
   * before the store is consulted and answers at a NAME (`occupied` / `absent` / `unreachable`), so it cannot be
   * derived from the instance — a store carries no address for its own file — and without the directory the
   * surface would lose §3's `store-unreachable` arm, the cold tier and the `profile` that every refusal sentence
   * names. It fed the deleted construction too; that is a second use and not the reason it stands (D-80).
   */
  profileDir: string
  /**
   * Bounds this module's own change window — the in-memory `{ cursor, kind, path, changedTo }` sequence
   * `journal.ts` retains, and nothing else. Defaults to the seam's `DEFAULT_JOURNAL_LENGTH` (ASM-L3-4). The
   * deleted construction sized the caller's store from it as well; the store's journal is set at its own creation
   * and never moves, so a supplied instance fixes this figure and this option cannot (D-79, D-80).
   */
  journalLength?: number
  /**
   * **THE ONE STORE THIS SURFACE ACTS THROUGH, AND IT IS REQUIRED** (D-80). In the app the boot's one instance is
   * passed here (`src/main/main.ts:132` → `:374`), so `data.*` acts through the NORMAL CROSSING — the instance
   * carrying the tab record's six declarations and the view record's four — and one register stands over the one
   * `provident-profile.json`.
   *
   * **THE OPTIONAL FORM WAS THE DEFECT THIS TYPING REMOVES.** While `store` could be omitted, this module owned a
   * construction that opened its own instance on the boot's own file — a third register and a third journal over one
   * set of bytes, whose every flush discarded what the other instance had written (measured 2026-11-02, D-79) — and
   * the fallback was kept only because four gating rows pinned a cold tier a constructed store cannot express.
   * A surface that CAN build an instance is a surface one caller away from a second store, so the fallback is deleted
   * rather than left unreachable: with `store` required there is no arm a caller can reach that constructs anything.
   *
   * **THE COLD TIER MOVED, AND IT DID NOT DISAPPEAR.** A supplied store creates its `filePath` at its own
   * construction, so the reading of a freshly booted profile answers `occupied` over an EMPTY register: `list` serves
   * `count:0`, `read` serves `{status:'absent'}` at an unwritten path, and the FILE STANDS — the state "a first-ever
   * profile with no store file" is the one this product no longer has. The cold tier is now the name being REMOVED
   * under a live process, which is `behaviour.md` §9's own row (D-80).
   */
  store: ProfileStore
  /**
   * **THE ADDRESS SPACE THIS SURFACE MAY NOT CROSS, AND IT IS REQUIRED FOR `store`'s REASON** (`D-101`): a surface
   * that is not told which roots a crossing declares cannot refuse a write that creates a second version of one,
   * and an OPTIONAL member here would leave exactly that unguarded surface reachable — one caller away from the
   * defect the guard exists to close. So the union is handed in, and the composition is what imports it.
   *
   * **IT IS THE COMPOSITION'S AND NOT THIS MODULE'S IMPORT, AND THAT IS A MEASUREMENT AND NOT A TASTE.** Reaching
   * `tabs-record`/`view-record` from `src/main/data/` would put `view-record` into the MCP stack's import closure,
   * and two GATING `tests/e2e/` rows assert that no file that closure reaches names the operator instance or its
   * addresses — a closure the crossings are deliberately outside (`D-18`; `interface.md` §5). `src/main/main.ts`
   * already imports both modules for their declarations, so this member costs that line a third comma and no
   * import at all. An EMPTY array is in domain and is the honest answer for a caller that declares no crossing:
   * it guards nothing, and it says so.
   */
  declaredRoots: readonly DataDeclaredRoot[]
}

export interface DataSurface {
  read(args: unknown): DataReadAnswer
  write(args: unknown): DataWriteAnswer
  delete(args: unknown): DataDeleteAnswer
  list(args: unknown): DataListAnswer
  journal(args: unknown): DataJournalAnswer
}

export type DataToolName =
  | 'provident.data.read' | 'provident.data.write' | 'provident.data.delete'
  | 'provident.data.list' | 'provident.data.journal'

/** The five tool names in `interface.md` §1's declared order (`signatures.md` §1). */
export const DATA_TOOL_NAMES: readonly DataToolName[] = [
  'provident.data.read',
  'provident.data.write',
  'provident.data.delete',
  'provident.data.list',
  'provident.data.journal',
]
