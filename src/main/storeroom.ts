// src/main/storeroom.ts — THE STOREROOM SEAM.
//
// What this file is, exactly, and what it is NOT:
//
//  - IT IS one of the app's TWO imports of `provident-storeroom` — the seam that declares its
//    surface; `storeCreate` in the operator-settings instance is the other (`brief.md` §2, D-16).
//    The package is the object of this repo's defect catalogue (`docs/defects.md`, handoff
//    `docs/HANDOFF.md`): the app is the implementation test, and one that never imports it is a
//    paper exercise. This module is where the surface is pinned, so there is ONE seam to point at.
//  - IT IS NOT a capability. Nothing here is exposed over MCP, rendered, or persisted to the
//    operator's profile, and no contract in `docs/specs/**` names a storeroom feature. Adding
//    such a capability is a UNIT — proposal gate, spec, red set — and it is not been admitted.
//    Until one is, this seam constructs a store and hands it to whoever asked; it wires nothing.
//
// THE DECLARED SURFACE BELOW IS A CENSUS, NOT A DERIVATION. Every entry was measured against the
// installed package (`provident-storeroom@1.6.1`, `Object.getOwnPropertyNames(store)` → 14 string
// members in this order, 11 own symbols) during the 1.6.x review. `tests/storeroom-surface.test.ts`
// pins it: a version bump that adds, removes or re-orders a member reddens that row HERE, in a
// message that names the drift, rather than surfacing as an undefined-is-not-a-function somewhere
// downstream.

import { storeCreate, type StoreConfig, type StoreInstance } from 'provident-storeroom'

/** The store's own string members, in the order `getOwnPropertyNames` reports them. */
const MEMBERS = [
  'read',
  'readLiteral',
  'write',
  'delete',
  'rollback',
  'listen',
  'unlisten',
  'addConstraint',
  'constraintOn',
  'constraintOff',
  'constraints',
  'removeListener',
  'removeConstraint',
  'register',
] as const

/**
 * The declared surface census. `memberCount` is stated as a LITERAL so that a package which
 * silently grows a member fails the census instead of passing it by length.
 */
export const STOREROOM_DECLARED_SURFACE = {
  members: MEMBERS,
  memberCount: 14,
  /** Own symbols on the installed instance; non-enumerable and internal, pinned as a count only. */
  symbolCount: 11,
} as const

/** The journal length a profile store opens with when the caller does not decide. */
export const DEFAULT_JOURNAL_LENGTH = 4096

export interface ProfileStoreOptions {
  /** The journal length. Defaults to {@link DEFAULT_JOURNAL_LENGTH}. */
  journalLength?: number
  /** Pairs registered at construction. Defaults to none. */
  constraints?: StoreConfig['constraints']
  /** Listener handles declared at construction. Defaults to none. */
  listeners?: StoreConfig['listeners']
  /** The file the `file` tier is backed by, where one is declared. ABSENT is in domain and leaves
   *  the register at `mem`: a store's register tier is FIXED at creation and never moves, so a store
   *  built without a `filePath` can never reach the `file` tier (`guide §3.1`, `§9.1`). It is passed
   *  through only where a string is supplied — supplied and absent are not the same call. */
  filePath?: string
}

/**
 * Construct a storeroom store for this app. No file tier is opened unless the caller supplies a
 * `filePath`, nothing is persisted without one, and no listener or constraint is registered unless
 * the caller passes one — the defaults are the empty set, which is what a fresh profile store is.
 */
export function createProfileStore(opts: ProfileStoreOptions = {}): StoreInstance {
  const config: StoreConfig = {
    journalLength: opts.journalLength ?? DEFAULT_JOURNAL_LENGTH,
    listeners: opts.listeners ?? [],
    constraints: opts.constraints ?? [],
  }
  // A SUPPLIED `filePath` is passed through and an absent one is left out, because the two are not
  // the same call: an absent `filePath` leaves the register at `mem`, and a supplied, absent path is
  // created exclusively at construction (`guide §3.3`, `§9.1`; `persistence.md` §1).
  return storeCreate(opts.filePath === undefined ? config : { ...config, filePath: opts.filePath })
}
