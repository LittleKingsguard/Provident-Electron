// src/main/data/store.ts — the profile's ONE written name, THE REACHABILITY READING, the deferred
// construction, and the port the operations drive (`design.md` §1, §2; `persistence.md` §1;
// `behaviour.md` §5, §9).
//
// THE READING IS THE HEART OF THIS FILE. It is taken at the top of every operation, BEFORE any
// store instance exists or is consulted, and it answers ONE question: can the profile's one name,
// `<profileDir>/provident-profile.json`, be occupied here at all? It answers one of three words:
//
//   occupied     — the name stands and can back a store file: a regular file this process may
//                  write, or a symlink resolving to one (`guide §9.1`).
//   absent       — the name does not stand and nothing forbids it: its parent is absent, or is a
//                  directory that admits a create. This is the COLD TIER until a write constructs.
//   unreachable  — the name cannot be occupied: `lstat` fails with anything but `ENOENT`, the name
//                  stands as something that cannot back a store file, or it is absent under a
//                  parent that exists and is not a writable directory (`guide §8.2`).
//
// It is not a store call and it moves nothing: no instance, no byte, no directory. THIS MODULE'S
// OWN FILESYSTEM ACTS ARE THE READING AND NOTHING ELSE (`persistence.md` §1; D-13), and every
// failure of it is an answer, never a throw (G1).

import { accessSync, constants, lstatSync, statSync, type Stats } from 'node:fs'
import { dirname, join } from 'node:path'
import { DEFAULT_JOURNAL_LENGTH, createProfileStore } from '../storeroom.js'
import { unreachableLedger } from './mapper.js'
import type { DataLedger, DataSurfaceOptions } from './types.js'

/** The one written name this module adds: `<profileDir>/provident-profile.json` (D-13). The
 *  directory is the caller's; the name is this module's own choice, so no other module spells it. */
export const PROFILE_FILE_NAME = 'provident-profile.json'

/** The store's type, named through the seam so no file here spells a package type (D-5). */
export type ProfileStore = ReturnType<typeof createProfileStore>

/** THE READING, as one word (`design.md` §2; `signatures.md` §2). */
export type ProfileReading =
  | { kind: 'occupied' }
  | { kind: 'absent' }
  | { kind: 'unreachable'; ledger: DataLedger }

export type StorePort = {
  /** Taken first, at the top of every operation, before any store instance (§2). */
  probe(): ProfileReading
  /** Built at most once, at the first operation whose reading did not answer `unreachable`. */
  construct(): { kind: 'ready'; store: ProfileStore } | { kind: 'unreachable'; ledger: DataLedger }
}

function unreachable(): ProfileReading {
  return { kind: 'unreachable', ledger: unreachableLedger() }
}

/** What an `lstat` at a name said: the entry, its absence, or a failure that is not ENOENT. */
type Looked = { kind: 'standing'; stats: Stats } | { kind: 'none' } | { kind: 'failed' }

function errorCode(caught: unknown): unknown {
  return caught !== null && typeof caught === 'object' ? (caught as { code?: unknown }).code : undefined
}

function look(path: string): Looked {
  try {
    return { kind: 'standing', stats: lstatSync(path) }
  } catch (caught) {
    return errorCode(caught) === 'ENOENT' ? { kind: 'none' } : { kind: 'failed' }
  }
}

/** Can the standing entry at `name` back a store file: a regular file this process may write, or a
 *  symlink resolving to one. A directory, a dangling symlink, an unwritable file and a device each
 *  answer no (`guide §8.2`, `§9.1`). */
function backsStoreFile(name: string): boolean {
  try {
    if (!statSync(name).isFile()) return false
    accessSync(name, constants.W_OK)
    return true
  } catch {
    return false
  }
}

/** THE READING (`design.md` §2). Probes only: it creates nothing, writes no byte, and throws
 *  nothing — every failure of it is an answer. */
export function readProfile(profileDir: string): ProfileReading {
  try {
    const name = join(profileDir, PROFILE_FILE_NAME)
    const at = look(name)
    if (at.kind === 'standing') return backsStoreFile(name) ? { kind: 'occupied' } : unreachable()
    // Anything but ENOENT — ENOTDIR where the directory is a regular file, EACCES, ELOOP, a name
    // too long — is a name that cannot be occupied.
    if (at.kind === 'failed') return unreachable()
    // The name does not stand. An ABSENT PARENT is `absent`'s business: the construction is where
    // it refuses (`guide §8.2`; `behaviour.md` §9; ASM-L3-U2).
    const parent = dirname(name)
    const holder = look(parent)
    if (holder.kind === 'none') return { kind: 'absent' }
    if (holder.kind === 'failed') return unreachable()
    if (!holder.stats.isDirectory()) return unreachable()
    try {
      accessSync(parent, constants.W_OK)
    } catch {
      return unreachable()
    }
    return { kind: 'absent' }
  } catch {
    return unreachable()
  }
}

/** `journalLength` is honoured only where it is a POSITIVE safe integer; otherwise the seam's
 *  `DEFAULT_JOURNAL_LENGTH` stands (ASM-L3-4). */
function journalLengthOf(length: unknown): number {
  return typeof length === 'number' && Number.isSafeInteger(length) && length > 0 ? length : DEFAULT_JOURNAL_LENGTH
}

/** The construction: ONE store per surface, at most once, at the profile's one name. A refused
 *  construction answers `store-unreachable` and creates nothing — not even `profileDir`
 *  (`guide §8.2`, `§9.1`; `behaviour.md` §9). */
function constructStore(
  options: DataSurfaceOptions,
): { kind: 'ready'; store: ProfileStore } | { kind: 'unreachable'; ledger: DataLedger } {
  try {
    const store = createProfileStore({
      journalLength: journalLengthOf(options.journalLength),
      filePath: join(options.profileDir, PROFILE_FILE_NAME),
    })
    return { kind: 'ready', store }
  } catch {
    return { kind: 'unreachable', ledger: unreachableLedger() }
  }
}

export function createStorePort(options: DataSurfaceOptions): StorePort {
  let built: { kind: 'ready'; store: ProfileStore } | { kind: 'unreachable'; ledger: DataLedger } | null = null
  return {
    probe: () => {
      try {
        return readProfile(options.profileDir)
      } catch {
        return unreachable()
      }
    },
    construct: () => {
      if (built === null) built = constructStore(options)
      return built
    },
  }
}
