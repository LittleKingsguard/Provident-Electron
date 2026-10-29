// src/main/data/journal.ts — the bounded in-memory change window, cursors minted from 1
// (`persistence.md` §6; D-12). The store's own journal is neither readable nor enumerable, so this
// module OBSERVES: each commit it causes hands back the store's own op, and what is retained is
// `{ cursor, kind, path, changedTo }` — no value is copied in, so nothing in the window can be
// replayed into the register (D-12).
//
// The window is this process's own and starts empty again at the next boot; a cursor naming a
// previous process's position is `cursor-unknown`, and the refusal carries both bounds so a caller
// re-anchors (`behaviour.md` §3, §6; D-12).

import { DEFAULT_JOURNAL_LENGTH } from '../storeroom.js'
import type { DataJournalEntry, DataPath } from './types.js'

export type ChangeJournal = {
  append(kind: 'write' | 'delete', path: DataPath, changedTo: 'present' | 'absent'): number
  window(
    from: number,
  ):
    | { ok: true; from: number; floor: number; through: number; entries: readonly DataJournalEntry[] }
    | { ok: false; floor: number; through: number }
}

/** `journalLength` is honoured only where it is a POSITIVE safe integer; otherwise the seam's
 *  `DEFAULT_JOURNAL_LENGTH` stands (ASM-L3-4). */
function lengthOf(length: unknown): number {
  return typeof length === 'number' && Number.isSafeInteger(length) && length > 0 ? length : DEFAULT_JOURNAL_LENGTH
}

export function createJournal(length: unknown): ChangeJournal {
  const retained = lengthOf(length)
  const entries: DataJournalEntry[] = []
  /** The last minted cursor; `0` before the first committed change. */
  let through = 0
  /** The highest cursor that fell out of the window; `0` while nothing has. */
  let floor = 0

  return {
    append(kind, path, changedTo) {
      through += 1
      // The path is a FRESH copy, so nothing in the window aliases a caller's array (G10).
      entries.push({ cursor: through, kind, path: [...path], changedTo })
      while (entries.length > retained) {
        const dropped = entries.shift()
        if (dropped !== undefined) floor = dropped.cursor
      }
      return through
    },

    window(from) {
      if (from < floor || from > through) return { ok: false, floor, through }
      const tail = entries
        .filter((entry) => entry.cursor > from)
        .map((entry) => ({ cursor: entry.cursor, kind: entry.kind, path: [...entry.path], changedTo: entry.changedTo }))
      return { ok: true, from, floor, through, entries: tail }
    },
  }
}
