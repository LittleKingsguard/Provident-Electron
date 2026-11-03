// src/main/data/surface.ts — `createDataSurface` and the five operations: ONE answer site for a
// tool call and for its bridge route (`interface.md` §2, §5; D-11).
//
// The five share one preamble and its order is the order the checks run in (`design.md` §3):
//
//   parse(args)            — the declared member set by name, then the path, tier or cursor domain
//   declaredTier()         — a write or a delete at a root a CROSSING declares, at that root's own tier (D-101)
//   probe()                — THE reading of §2, taken before any store: occupied | absent | unreachable
//   unreachable            — all five answer the reading's ledger, `journal` included, with no store
//
// An `absent` name is the COLD TIER for `read`/`list`/`delete` and the WINDOW ALONE for `journal`;
// `write` is where a store is needed and where a supplied one lands — and this surface owes no
// construction of its own: `main.ts` supplies the boot's store, the option is required, and
// `src/main/data/` opens no file at all (D-79, D-80). Every failure is a value: no operation
// throws for any argument or any store state (G1; `interface.md` §6).
//
// **THE TIER IS THE CALLER'S AND THE ADDRESS SPACE IS NOW THIS SURFACE'S (D-101).** `write`, `delete`
// and `read` each take an optional `tier` from the store's own three tokens; a `write` that omits it
// gets `file`, the tier this surface has always written, and a read or a delete that omits it gets
// the store's own unqualified verb (`args.ts`). AND THE ONE THING THE CALLER CANNOT CHOOSE is a
// DECLARED root's tier: the roots the two crossings declare — `['tabs']`, `['panes']`, `['focus']`,
// `['zones']` and the view record's fourth, which `D-98` moved to the durable tier — are split between
// the two tiers, and this file SPELLS none of them in code: the pairs arrive as
// `DataSurfaceOptions.declaredRoots`, so a write or a delete at one of those roots is admitted only
// at the family's own tier and is refused `declared-tier` otherwise, ahead of the reading and of any
// byte. **THE ROOT NAMES AND THE TIER WORDS STAND IN THE MODULES THAT DECLARE THEM AND NOWHERE HERE**:
// a family that moves tier moves in one place, and this guard cannot drift from it (D-53).

import { parseDelete, parseJournal, parseList, parseRead, parseWrite, pathText } from './args.js'
import { createJournal } from './journal.js'
import { readOutcome, refusalLedger, sentence } from './mapper.js'
import { createStorePort } from './store.js'
import type {
  DataDeclaredRoot,
  DataDeleteAnswer,
  DataJournalAnswer,
  DataLedger,
  DataListAnswer,
  DataPath,
  DataReadAnswer,
  DataSurface,
  DataSurfaceOptions,
  DataTier,
  DataWriteAnswer,
} from './types.js'

/** Built at the first operation that needs it, so the factory itself constructs nothing, reads
 *  nothing and touches no file (`design.md` §2; `behaviour.md` §1). */
function once<T>(make: () => T): () => T {
  let made: { value: T } | null = null
  return () => {
    if (made === null) made = { value: make() }
    return made.value
  }
}

/** **THE DECLARED ROOTS AS ONE LOOKUP, KEYED BY THE ROOT'S OWN FIRST SEGMENT** (`D-101`). A family is ONE whole
 *  value at its root (`D-87`), and every address at or below a root answers the same tier, so the root alone
 *  decides — a root's own address and every address under it are one tier, never two.
 *
 *  **THE PAIRS ARE THE CALLER'S AND NOT THIS FILE'S IMPORT** (`DataSurfaceOptions.declaredRoots`): the two
 *  modules that declare the app's families publish them, the composition hands their union here, and this module
 *  spells no root and no tier of its own — a second spelling is the drift the corpus keeps catching (D-53), and a
 *  family that moves tier has to move in one place. The import is the composition's for a second reason the GATING
 *  `tests/e2e/` isolation rows state: reaching the crossings from here would put them in the MCP stack's own
 *  closure, which those rows require to name neither the operator instance nor its addresses (`D-18`). */
function declaredRootTable(roots: readonly DataDeclaredRoot[]): ReadonlyMap<string, DataTier> {
  const table = new Map<string, DataTier>()
  for (const root of roots) {
    const first = root.address.length > 0 ? root.address[0] : undefined
    if (typeof first === 'string') table.set(first, root.tier)
  }
  return table
}

/** A write or a delete may not cross a declared family: the address's root is the CROSSING's, and so is the
 *  tier (`D-101`). The refusal has the register of the other argument arms — the call is wrong whatever the
 *  store's state — and its sentence names the root, the tier the family declares and the tier this call asks
 *  for, so a caller can correct it without reading a document. */
function declaredTierLedger(
  table: ReadonlyMap<string, DataTier>,
  path: DataPath,
  tier: DataTier,
  verb: 'write' | 'delete',
): DataLedger | null {
  const first = path.length > 0 ? path[0] : undefined
  if (typeof first !== 'string') return null
  const declared = table.get(first)
  if (declared === undefined || declared === tier) return null
  return {
    status: 'refused',
    reason: 'declared-tier',
    message: `${sentence('declared-tier')}: '${first}' is declared at '${declared}' and this ${verb} asks for '${tier}'`,
    path: [...path],
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
  const declared = once(() => declaredRootTable(options.declaredRoots))

  function read(args: unknown): DataReadAnswer {
    try {
      const parsed = parseRead(args)
      if (!parsed.ok) return parsed.ledger
      const path = parsed.value.path
      // **A READ'S TIER IS A NARROWING AND NEVER A DEFAULT** (`D-101`): `null` is the store's own unqualified
      // read, which is what this surface has always asked for, and a named token narrows it to that one tier —
      // where an address holding nothing AT THAT TIER answers `absent` like any other absence (`mapper.ts`).
      // A read crosses no family's ownership, so the declared-root guard is a write's and a delete's alone.
      const tier = parsed.value.tier
      const reading = port().probe()
      if (reading.kind === 'unreachable') return reading.ledger
      // An absent name is the cold tier: the register holds nothing, and no store is constructed
      // for a profile that is merely new (`behaviour.md` §1; ASM-L3-U2).
      if (reading.kind === 'absent') {
        return path.length === 0
          ? { status: 'read', kind: 'branch', path: [], value: {} }
          : { status: 'absent', path: copy(path) }
      }
      const store = port().store()
      if (path.length === 0) {
        return { status: 'read', kind: 'branch', path: [], value: tier === null ? store.read([]) : store.read([], tier) }
      }
      try {
        return {
          status: 'read',
          kind: 'row',
          path: copy(path),
          value: tier === null ? store.readLiteral(path) : store.readLiteral(path, tier),
        }
      } catch (caught) {
        const outcome = readOutcome(caught)
        if (outcome.kind === 'branch') {
          return {
            status: 'read',
            kind: 'branch',
            path: copy(path),
            value: tier === null ? store.read(path) : store.read(path, tier),
          }
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
      const { path, value, tier } = parsed.value
      // THE DECLARED ROOT IS THE CROSSING'S, AHEAD OF THE READING AND OF ANY BYTE (`D-101`).
      const disagreement = declaredTierLedger(declared(), path, tier, 'write')
      if (disagreement !== null) return disagreement
      const reading = port().probe()
      if (reading.kind === 'unreachable') return reading.ledger
      // `write` always needs the store, and it is the caller's: a supplied instance recreates its
      // own file where that file was removed under the process (`behaviour.md` §9; D-80).
      const store = port().store()
      try {
        store.write(path, tier, value)
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
      const { path, tier } = parsed.value
      // A DELETE OF A DECLARED ROOT IS THE SAME CROSSING (`D-101`): the tier is the family's, and a delete that
      // named another one would report `removed:false` over a row that stands — the second half of the defect.
      const disagreement = declaredTierLedger(declared(), path, tier, 'delete')
      if (disagreement !== null) return disagreement
      const reading = port().probe()
      if (reading.kind === 'unreachable') return reading.ledger
      if (reading.kind === 'absent') return emptyReceipt(path)
      const store = port().store()
      // A delete names ONE row and never the store's whole-target arm, so it asks whether a row
      // stands before it acts: the shipped `delete` throws where nothing stands, and no
      // `AddressNotFound` leaves this module as an answer (`behaviour.md` §6; ASM-L2-6; G7). The probe
      // asks at the SAME tier the delete will name, so a row standing at another tier is that other
      // tier's row and this call's answer is the empty receipt (`D-101`).
      try {
        store.readLiteral(path, tier)
      } catch (caught) {
        const outcome = readOutcome(caught)
        return outcome.kind === 'ledger' ? outcome.ledger : emptyReceipt(path)
      }
      try {
        const record = store.delete(path, tier)
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
      const store = port().store()
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
