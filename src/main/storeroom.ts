// src/main/storeroom.ts — THE STOREROOM SEAM.
//
// What this file is, exactly, and what it is NOT:
//
//  - IT IS one of the app's THREE imports of `provident-storeroom` — the seam that declares its
//    surface. The second is the rebuilt SECURE crossing's own module and the third (D-63) is the tab
//    record's own instance (`brief.md` §2, D-16, D-63). **THE FIGURE WAS TWO HERE AND WAS RE-MEASURED,
//    NOT READ OFF THIS COMMENT**: `grep -rn "from 'provident-storeroom'" src/` answers three files and
//    four statements at this head, and no file under `src/main/data/` names the package at all — which
//    is the census `tests/e2e/central-data/scenarios.test.ts` `S-9` pins and the count the decision row
//    for this pass records with the three paths in full, `strata/decisions.md` being where a
//    cross-module name belongs and the MCP import closure being no place for one (measured 2026-11-02;
//    the closure row `S-11` reds on a path spelled here).
//    The package is the object of this repo's defect catalogue (`docs/defects.md`, handoff
//    `docs/HANDOFF.md`): the app is the implementation test, and one that never imports it is a
//    paper exercise. This module is where the surface is pinned, so there is ONE seam to point at.
//  - IT IS NOT a capability. Nothing here is exposed over MCP, rendered, or persisted to the
//    operator's profile, and no contract in `docs/specs/**` names a storeroom feature. Adding
//    such a capability is a UNIT — proposal gate, spec, red set — and it is not been admitted.
//    Until one is, this seam constructs a store and hands it to whoever asked; it wires nothing.
//
// THE DECLARED SURFACE BELOW IS A CENSUS, NOT A DERIVATION. Every entry was measured against the
// installed package (`provident-storeroom@1.9.0`, `Object.getOwnPropertyNames(store)` → 14 string
// members in this order) — the same fourteen the `1.6.2` and `1.7.0` reviews read, so neither the
// release that lifted the cross-kind address exclusion (`1.7.0`) nor `1.9.0` moved a member of the
// store. **THE SYMBOL FIGURE IS THE ONE THAT MOVED WITH `1.9.0`, and it was RE-MEASURED rather than
// carried**: `1.7.0` read 11 own symbols and `1.9.0` reads 12, the twelfth being
// `Symbol(provident-storeroom.repair-leg)` (measured 2026-11-02 on the installed bytes, at
// construction; see `symbolCount` below for the read that comes after a write).
// `tests/storeroom-surface.test.ts` pins the MEMBER list and the pin itself, and
// `tests/e2e/central-data/scenarios.test.ts` `S-9` pins the two counts: a version bump that adds,
// removes or re-orders a member reddens a row HERE and a count that moves reddens there, in a
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
  /**
   * **Own symbols on the installed instance AT CONSTRUCTION; non-enumerable and internal, pinned as a count only.**
   * `1.9.0` reads **12** where `1.7.0` read **11**, and the release's whole contribution is the one member between
   * them: `Symbol(provident-storeroom.repair-leg)` (measured 2026-11-02 on both installed trees, one fresh instance
   * each — the two symbol lists match member for member apart from it). **AND ONE WRITE INSTALLS A THIRTEENTH**,
   * `Symbol(provident-storeroom.kernel)`, absent on a fresh store and present after the first `write` — on `1.7.0`
   * as well (its 11 becomes 12 the same way), so that growth is the store's own and not this release's. The census
   * is therefore read at **construction**, the one instant every construction path shares, and no string member
   * moves either way.
   */
  symbolCount: 12,
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
