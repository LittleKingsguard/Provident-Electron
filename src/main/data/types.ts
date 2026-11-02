// src/main/data/types.ts — the module's declared vocabulary, in one home (`design.md` §1;
// `signatures.md` §1). Nothing outside `index.ts` reaches into this file's exports: the five
// operations, their answer shapes and the five tool names are the surface `interface.md` §2
// declares, and `DATA_TOOL_NAMES` is the only member of it that is a value.
//
// IT NOW CARRIES ONE IMPORT, AND IT IS A TYPE (D-79): `ProfileStore` is `store.ts`'s name for the seam's own
// return type, so the composition can hand this module the store it already owns without any file here spelling
// the package (S-9). A type import is erased at build, so nothing of `store.ts` reaches the bundle through it.

import type { ProfileStore } from './store.js'

/** The store's own address shape: a DENSE array of string keys and non-negative safe-integer
 *  indices (`guide §4`, rules 1-5). A dotted string is one key that happens to carry a dot. */
export type DataPath = readonly (string | number)[]

/** The store's three persistence tokens (`guide §5.2`); this surface writes the durable one. */
export type DataTier = 'file' | 'mem' | 'temp'

export type DataRefusalReason =
  | 'malformed-arguments' | 'root-not-writable' | 'volatile-path' | 'cursor-unknown' | 'store-unreachable'
  | 'address-malformed' | 'parent-absent' | 'container-kind-conflict' | 'value-not-admitted' | 'write-failed'
  | 'store-refused'

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

export interface DataSurfaceOptions {
  /** The app's profile directory; the FILE's name is this module's own choice (D-13). */
  profileDir: string
  /** Bounds this module's own change window. Defaults to the seam's `DEFAULT_JOURNAL_LENGTH`. */
  journalLength?: number
  /**
   * **THE STORE THE CALLER ALREADY OWNS, THREADED IN SO THIS MODULE CONSTRUCTS NOTHING** (D-79). In the app the
   * boot's one instance is passed here (`src/main/main.ts:132` → `:297`), so `data.*` writes through the NORMAL
   * CROSSING — the instance that carries the five tab-record declarations — instead of opening a second one on the
   * same `provident-profile.json`. Before this option existed the surface opened its OWN instance there: a third
   * store holding its own register and journal over that file, whose every flush discarded what the other instance
   * had written (measured 2026-11-02 across three sequences; D-79).
   *
   * **IT IS OPTIONAL, AND THE ABSENT ARM IS THE MODULE'S OWN BATTERIES, NOT THE APP.** An operation whose reading
   * answers `absent` answers the cold tier WITHOUT constructing anything, so a battery that must exercise that tier
   * stands the surface alone on a directory it seeded and hands it no store. Supplying one there would CONSTRUCT the
   * profile file — a construction creates its `filePath` exclusively — the reading would then answer `occupied`, and
   * the cold tier would stop being expressible at all. The app never takes that arm.
   */
  store?: ProfileStore
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
