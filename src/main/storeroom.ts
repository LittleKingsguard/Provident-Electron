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
// installed package (`provident-storeroom@1.9.3`, `Object.getOwnPropertyNames(store)` → 14 string
// members in this order) — the same fourteen the `1.6.2` and `1.7.0` reviews read, so neither the
// release that lifted the cross-kind address exclusion (`1.7.0`) nor `1.9.0` nor `1.9.2` moved a
// member of the store. **THE SYMBOL FIGURE IS THE ONE THAT MOVED WITH `1.9.0`, and it was
// RE-MEASURED rather than carried**: at that release `1.7.0` read 11 own symbols and `1.9.0` read
// 12, the twelfth being `Symbol(provident-storeroom.repair-leg)` (measured 2026-11-02 on the
// installed bytes, at construction; see `symbolCount` below for the read that comes after a write).
// **AND IT MOVED AGAIN WITH `1.9.1`, BY ONE, AND THE STRING LIST DID NOT MOVE WITH IT** (measured
// 2026-11-03 on both installed trees, one fresh instance each): 12 at construction becomes **13**,
// the thirteenth being `Symbol(provident-storeroom.registration-save)` — the marker of the release
// whose refusing registration rolls its own landing back — and the two lists match member for member
// apart from it. **`1.9.2` MOVED NEITHER LIST AND `1.9.3` MOVES NEITHER**, which is the reading this
// header is re-measured at rather than an assumption: 15 string members in this order — `1.10.0`'s
// `readTiered` being the fifteenth, the ONE addition since the pin (`D-134`) — and the same 13 own
// symbols at construction, one fresh instance each (2026-11-03 at `D-103`, 2026-11-04 at `D-109`,
// the member re-read at `1.10.0`).
// **WHAT `1.9.2` ADDED IS IN NEITHER LIST, AND ITS ABSENCE FROM BOTH IS THE WHOLE OF THE
// NARROWING BELOW**: a passing act's record now answers with the commit's log, carried
// NON-ENUMERABLY, so it moves no name and no symbol — see `commitLog`, the one declared reader.
// `tests/storeroom-surface.test.ts` pins the MEMBER list and the pin itself, and
// `tests/e2e/central-data/scenarios.test.ts` `S-9` pins the two counts: a version bump that adds,
// removes or re-orders a member reddens a row HERE and a count that moves reddens there, in a
// message that names the drift, rather than surfacing as an undefined-is-not-a-function somewhere
// downstream.

import { storeCreate, type LogEntry, type StoreConfig, type StoreInstance } from 'provident-storeroom'

/** The store's own string members, in the order `getOwnPropertyNames` reports them. */
const MEMBERS = [
  'read',
  'readLiteral',
  // `1.10.0`'s own name, and the FIRST release since the seam was pinned to ADD one: the third read verb, which answers
  // the durability tier at every node it returns (`D-134`).
  'readTiered',
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
  memberCount: 15,
  /**
   * **Own symbols on the installed instance AT CONSTRUCTION; non-enumerable and internal, pinned as a count only.**
   * The figure was **12** under `1.9.0` where `1.7.0` read **11**, that release's whole contribution being
   * `Symbol(provident-storeroom.repair-leg)` (measured 2026-11-02 on both trees then installed, one fresh instance
   * each — the two symbol lists match member for member apart from it). **THE INSTALLED TREE READS 13, AT `1.9.1`
   * AND AGAIN AT `1.9.2`**: the thirteenth, `Symbol(provident-storeroom.registration-save)`, is `1.9.1`'s own and
   * sits fifth in `getOwnPropertySymbols`' order (measured 2026-11-03 on the `1.9.0`, `1.9.1` and `1.9.2` trees, one
   * fresh instance each — the two later lists identical member for member, which is why `D-103`'s bump left it alone).
   * **AND ONE WRITE INSTALLS ANOTHER**, `Symbol(provident-storeroom.kernel)`, absent on a fresh store and present
   * after the first `write` — so the read after that act is **14** here, 13 under `1.9.0` and 12 under `1.7.0`, the
   * one-member growth being the store's own and not either release's. The census is therefore read at
   * **construction**, the one instant every construction path shares, and no string member moves either way.
   */
  symbolCount: 13,
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

/**
 * **THE PACKAGE'S OWN LOG ENTRY, RE-EXPORTED AND NOT RE-SPELLED** (`D-103`). `LogEntry` is the declaration's
 * name for the record a constraint pass appends — *"exactly FIVE members — `kind` · `id` · `message` · `opId` ·
 * `state`"*, its set CLOSED, `kind` from the kernel's four-member set and `state` its `KC` token on the `outcome`
 * entry alone. It is re-exported rather than duplicated so the surface that answers with one (`src/main/data/`)
 * reads the package's vocabulary and not a second spelling of it (`D-53`): a consumer of this seam has ONE name
 * for the entry, and a later release that types the passing member changes this alias and nothing downstream.
 */
export type { LogEntry }

/**
 * **THE COMMIT'S LOG, MATERIALIZED — AND THIS IS THE ONE DECLARED READER OF IT** (`D-103`). `provident-storeroom`
 * `1.9.2` answers a PASSING act with the entries its commit appended (`RELEASE-NOTES.md` §1.9.2 item 1: *"A
 * passing call answers with the commit's log"*), at `record.log` on a `write`'s record and a `delete`'s receipt.
 *
 * **THREE PROPERTIES OF THE MEMBER ARE WHY THIS FUNCTION EXISTS, EACH MEASURED ON THE INSTALLED BYTES:**
 *
 * 1. **IT IS NON-ENUMERABLE.** The member stands under its own name and `getOwnPropertyDescriptor` reports
 *    `enumerable: false`, so `Object.keys`, `JSON.stringify`, `{...record}` and `Object.assign({}, record)` ALL
 *    DROP IT — measured on both the repaired and the clean arm. **So a caller cannot pass the record on and
 *    expect the log to travel**: this function COPIES the array into a fresh plain one, which is what makes the
 *    answer survive every serialisation a tool answer goes through (`G10`: nothing served aliases the store's
 *    state either, so the array and each entry is copied rather than handed over).
 * 2. **IT IS UNTYPED.** `index.d.ts`'s diff between `1.9.1` and `1.9.2` is docblocks and NOTHING ELSE — zero code
 *    lines — so `record.log` is a TYPE ERROR at this release and the narrowing has to be declared here, at the
 *    seam, over the runtime shape. **THE ASSERTED TYPE IS THE PACKAGE'S OWN `LogEntry`**, measured to be the
 *    shape the member carries: every entry's `Object.keys` reads exactly `['kind','id','opId','message','state']`
 *    on all four arms driven (repaired write, clean write, no pair at all, `delete`). **A LATER RELEASE THAT
 *    TYPES THE MEMBER REMOVES THIS ASSERTION AND NOT THIS FUNCTION** — the signature below is already the one a
 *    typed member would give it, so the day `WriteRecord.log` is declared the body loses its cast and no caller
 *    moves.
 * 3. **ABSENT IS NOT EMPTY, AND THE TWO MUST NEVER BE FOLDED.** A TOP-LEVEL `write`/`delete` carries the member on
 *    every arm measured, and `[]` is NOT among the answers: a clean write over a store whose pair passed answers
 *    TWO entries (`constraint-check` · `commit`), a write over a store carrying NO pair answers ONE (`commit`), and
 *    a repaired write answers FOUR (`constraint-check` · `repair-run` · `constraint-check` · `commit`). **A REPAIR'S
 *    OWN JOINED WRITE CARRIES NO MEMBER AT ALL** — `undefined`, contradicting the package's own docblock — and
 *    that is the record this function answers `null` for. So `null` means *"this record was never handed a
 *    list"* and never *"the list was empty"*, and `readonly LogEntry[]` with a length answers the act's own
 *    entries. **NOTHING IN THIS TREE READS `.log` OFF A REPAIR'S JOINED WRITE**: the tab record's `writeJoined`
 *    and the view record's `writeJoinedAt` are exactly that shape and neither reads it (`D-103`).
 *
 * 4. **THE REFUSAL ARM IS THE SAME LIST AND NOT THE SAME MEMBER, AND THIS FUNCTION IS ITS READER TOO** (`D-107`,
 *    taking `D-103`'s named residue). A store refusal is thrown as `{status, message, log, address}` — the same
 *    shape the passing act answers with — and its `log` is an **ENUMERABLE** own array (measured on the installed
 *    `1.9.2`: `enumerable:true`, `writable:true`, `configurable:true`, an array of the same five-member entries, and
 *    `JSON.stringify(caught)` carries it), so the property read below finds it exactly as it finds the passing
 *    arm's. A `ConstraintPassRefused` from a family's value arm carries TWO entries — the pair's own
 *    `constraint-check` and the refusal's `outcome` — while `[]` is what a refusal composed BEFORE any pass
 *    carries (`ParentAnchorMonotonicityViolation`, `AddressMalformed`). **SO `[]` HERE MEANS *"NO PASS RAN"***, and
 *    that is the one reading that separates the two arms of this accessor: `null` is *"no record was handed a
 *    list"*, `[]` is *"the record was handed an empty one"*, and the two are never folded. This is why NO SECOND
 *    ACCESSOR IS MINTED: the member moved from non-enumerable to enumerable, and a property read is indifferent
 *    to which (`D-107`).
 *
 * `null` is also the answer for anything that is not an object or whose member is not an array, so a caller can
 * treat the return as total and never catch: this seam throws nothing, at any argument.
 */
export function commitLog(record: unknown): readonly LogEntry[] | null {
  if (record === null || typeof record !== 'object') return null
  // A PROPERTY READ FINDS A NON-ENUMERABLE OWN MEMBER; enumeration does not (`Object.keys` drops it, measured).
  const carried = (record as { readonly log?: unknown }).log
  if (!Array.isArray(carried)) return null
  // COPIED ONE BY ONE, so neither the array nor an entry aliases the store's own release (G10).
  return carried.map((entry) => ({ ...(entry as LogEntry) }))
}
