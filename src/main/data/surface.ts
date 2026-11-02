// src/main/data/surface.ts — `createDataSurface` and the five operations: ONE answer site for a
// tool call and for its bridge route (`interface.md` §2, §5; D-11).
//
// The five share one preamble and its order is the order the checks run in (`design.md` §3):
//
//   parse(args)            — the declared member set by name, then the path or cursor domain
//   probe()                — THE reading of §2, taken before any store: occupied | absent | unreachable
//   unreachable            — all five answer the reading's ledger, `journal` included, with no store
//
// An `absent` name is the COLD TIER for `read`/`list`/`delete` and the WINDOW ALONE for `journal`;
// the first `write` is where a construction this surface OWES can refuse — and in the app it owes
// none: `main.ts` supplies the boot's store, so every operation acts through that one instance
// (D-79). Every failure is a value: no
// operation throws for any argument or any store state (G1; `interface.md` §6).

import { parseDelete, parseJournal, parseList, parseRead, parseWrite, pathText } from './args.js'
import { createJournal } from './journal.js'
import { readOutcome, refusalLedger, sentence } from './mapper.js'
import { createStorePort } from './store.js'
import type {
  DataDeleteAnswer,
  DataJournalAnswer,
  DataListAnswer,
  DataPath,
  DataReadAnswer,
  DataSurface,
  DataSurfaceOptions,
  DataTier,
  DataWriteAnswer,
} from './types.js'

/** The durability unit: one `file`-tier token, never an array and never a supplied `undefined`
 *  (`guide §3.3, §5.2`; G11). */
const FILE_TIER: DataTier = 'file'

/** Built at the first operation that needs it, so the factory itself constructs nothing, reads
 *  nothing and touches no file (`design.md` §2; `behaviour.md` §1). */
function once<T>(make: () => T): () => T {
  let made: { value: T } | null = null
  return () => {
    if (made === null) made = { value: make() }
    return made.value
  }
}

/** Every answer carries its own array, so nothing served aliases a caller's or the module's state
 *  (G10). */
function copy(path: DataPath): DataPath {
  return [...path]
}

/** `delete` where no row stands: `committed`, nothing removed, no tier named, no cursor minted —
 *  reached with NO store refusal leaving this module (`behaviour.md` §6; ASM-L2-6; G7). */
function emptyReceipt(path: DataPath): DataDeleteAnswer {
  return { status: 'committed', path: copy(path), removed: false, tiers: [], cursor: null }
}

/** The row paths beneath a value: a scalar IS a row, a branch is composed from its children, and
 *  an empty container emits nothing — so a branch is never reported as a row (ASM-L2-2; `guide §4`,
 *  arms `R-2`/`R-3`/`W-4`). */
function walk(value: unknown, at: DataPath): DataPath[] {
  if (Array.isArray(value)) {
    const rows: DataPath[] = []
    for (let index = 0; index < value.length; index += 1) rows.push(...walk(value[index], [...at, index]))
    return rows
  }
  if (value !== null && typeof value === 'object') {
    const branch = value as Record<string, unknown>
    const rows: DataPath[] = []
    for (const key of Object.keys(branch)) rows.push(...walk(branch[key], [...at, key]))
    return rows
  }
  return [copy(at)]
}

/** `list`'s order: the path's own JSON text (ASM-L2-2). */
function order(left: DataPath, right: DataPath): number {
  const a = pathText(left)
  const b = pathText(right)
  return a < b ? -1 : a > b ? 1 : 0
}

export function createDataSurface(options: DataSurfaceOptions): DataSurface {
  const port = once(() => createStorePort(options))
  const window = once(() => createJournal(options.journalLength))

  function read(args: unknown): DataReadAnswer {
    try {
      const parsed = parseRead(args)
      if (!parsed.ok) return parsed.ledger
      const path = parsed.value.path
      const reading = port().probe()
      if (reading.kind === 'unreachable') return reading.ledger
      // An absent name is the cold tier: the register holds nothing, and no store is constructed
      // for a profile that is merely new (`behaviour.md` §1; ASM-L3-U2).
      if (reading.kind === 'absent') {
        return path.length === 0
          ? { status: 'read', kind: 'branch', path: [], value: {} }
          : { status: 'absent', path: copy(path) }
      }
      const built = port().construct()
      if (built.kind === 'unreachable') return built.ledger
      const store = built.store
      if (path.length === 0) return { status: 'read', kind: 'branch', path: [], value: store.read([]) }
      try {
        return { status: 'read', kind: 'row', path: copy(path), value: store.readLiteral(path) }
      } catch (caught) {
        const outcome = readOutcome(caught)
        if (outcome.kind === 'branch') {
          return { status: 'read', kind: 'branch', path: copy(path), value: store.read(path) }
        }
        if (outcome.kind === 'absent') return { status: 'absent', path: copy(path) }
        return outcome.ledger
      }
    } catch (caught) {
      return refusalLedger(caught)
    }
  }

  function write(args: unknown): DataWriteAnswer {
    try {
      const parsed = parseWrite(args)
      if (!parsed.ok) return parsed.ledger
      const { path, value } = parsed.value
      const reading = port().probe()
      if (reading.kind === 'unreachable') return reading.ledger
      // `write` always needs a store: an absent name is where the construction's own exclusive
      // create brings the file into being, and where it can refuse (`behaviour.md` §9).
      const built = port().construct()
      if (built.kind === 'unreachable') return built.ledger
      try {
        built.store.write(path, FILE_TIER, value)
        return { status: 'committed', path: copy(path), cursor: window().append('write', path, 'present') }
      } catch (caught) {
        // A refused call mints no cursor and appends no entry: the store's own rollback has already
        // run, and this module adds no compensation (G2; `behaviour.md` §4).
        return refusalLedger(caught, path)
      }
    } catch (caught) {
      return refusalLedger(caught)
    }
  }

  function remove(args: unknown): DataDeleteAnswer {
    try {
      const parsed = parseDelete(args)
      if (!parsed.ok) return parsed.ledger
      const path = parsed.value.path
      const reading = port().probe()
      if (reading.kind === 'unreachable') return reading.ledger
      if (reading.kind === 'absent') return emptyReceipt(path)
      const built = port().construct()
      if (built.kind === 'unreachable') return built.ledger
      // A delete names ONE row and never the store's whole-target arm, so it asks whether a row
      // stands before it acts: the shipped `delete` throws where nothing stands, and no
      // `AddressNotFound` leaves this module as an answer (`behaviour.md` §6; ASM-L2-6; G7).
      try {
        built.store.readLiteral(path)
      } catch (caught) {
        const outcome = readOutcome(caught)
        return outcome.kind === 'ledger' ? outcome.ledger : emptyReceipt(path)
      }
      try {
        const record = built.store.delete(path, FILE_TIER)
        const removed = record.tiers.length > 0
        const cursor = removed ? window().append('delete', path, 'absent') : null
        return { status: 'committed', path: copy(path), removed, tiers: [...record.tiers], cursor }
      } catch (caught) {
        const outcome = readOutcome(caught)
        return outcome.kind === 'ledger' ? outcome.ledger : emptyReceipt(path)
      }
    } catch (caught) {
      return refusalLedger(caught)
    }
  }

  function list(args: unknown): DataListAnswer {
    try {
      const parsed = parseList(args)
      if (!parsed.ok) return parsed.ledger
      const prefix = parsed.value.prefix
      const reading = port().probe()
      if (reading.kind === 'unreachable') return reading.ledger
      if (reading.kind === 'absent') {
        return { status: 'read', prefix: prefix === null ? null : copy(prefix), paths: [], count: 0 }
      }
      const built = port().construct()
      if (built.kind === 'unreachable') return built.ledger
      const store = built.store
      const rows: DataPath[] = []
      if (prefix === null || prefix.length === 0) {
        rows.push(...walk(store.read([]), []))
      } else {
        try {
          store.readLiteral(prefix)
          rows.push(copy(prefix))
        } catch (caught) {
          const outcome = readOutcome(caught)
          if (outcome.kind === 'ledger') return outcome.ledger
          if (outcome.kind === 'branch') rows.push(...walk(store.read(prefix), copy(prefix)))
        }
      }
      rows.sort(order)
      return { status: 'read', prefix: prefix === null ? null : copy(prefix), paths: rows, count: rows.length }
    } catch (caught) {
      return refusalLedger(caught)
    }
  }

  function journalWindow(args: unknown): DataJournalAnswer {
    try {
      const parsed = parseJournal(args)
      if (!parsed.ok) return parsed.ledger
      // The reading IS consulted — a window is not "empty" where the profile can never be built —
      // and the store is NOT: the window remains this process's own (D-12; `behaviour.md` §9).
      const reading = port().probe()
      if (reading.kind === 'unreachable') return reading.ledger
      const retained = window().window(parsed.value.from)
      if (!retained.ok) {
        return {
          status: 'refused',
          reason: 'cursor-unknown',
          message: sentence('cursor-unknown'),
          floor: retained.floor,
          through: retained.through,
        }
      }
      return {
        status: 'read',
        from: retained.from,
        through: retained.through,
        floor: retained.floor,
        entries: retained.entries,
        count: retained.entries.length,
      }
    } catch (caught) {
      return refusalLedger(caught)
    }
  }

  return { read, write, delete: remove, list, journal: journalWindow }
}
