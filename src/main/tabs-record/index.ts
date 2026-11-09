// src/main/tabs-record/index.ts — THE CROSSING: the tab record as one address of the APP'S ONE STORE (D-63, D-64).
// It constructs nothing, opens no file and owns no instance; the boot hands it the central store it already built the
// four declarations into (D-65), and this module reads and writes the `['tabs']` subtree through it.
//
// THE RECORD'S OPERATIVE SHAPE IS THE L1 §1 FAMILY: the `order` SEAT and one member per tab whose NAME is the tab id —
// the spelling the renderer's graph store already carries, so the crossing moved the record without renaming it
// (`docs/L2/store-tabs-record/interface.md` §1). **THE LANDING WITNESS IS DERIVED AND NOT STORED** (D-76): the entry that
// was the family's second singleton seat is an ordinary member keyed by its id, and `read()`'s `landing` member is the id
// of the row reading active. **THE `order` SEAT IS A BIJECTION WITH THE ROWS** (D-156): every id it names holds a plain
// row and every own key besides the seat is named, so a dangling id, an unseated row and a stray key are ONE fault with
// ONE sentence and ONE repair. **NEITHER ACT WRITES A WHOLE VALUE** (D-156, D-158): `commit` writes ONE ROW at the tab's
// own leaf, the seat pair refuses that stray key INSIDE the commit and its `'seat'` repair APPENDS the id to `order`,
// and `remove` is ONE `delete` of the row — so the act that settles the seat and the activeness is the engine's, and each
// act composes only the expectation its `repaired` member is judged against (§3, §4).
//
// THE INVARIANTS ARE THE ENGINE'S (design §4): `exactly-one-active`, the three field pairs, the EXISTENCE pair that mints
// the root and the SEAT pair that names the record's own tabs are DECLARATIONS this module exports
// (`tabsConstraintDeclarations`) and the boot batches into the instance's construction. Their repairs carry the renderer's
// referent discipline rule for rule and return the op their write landed — the two facts this pass had to measure before
// the crossing answered anything but `refused`. `tabs-must-stand` is the one that makes `['tabs']` an ENFORCED INVARIANT
// rather than a side effect of the first commit (D-69), so the record exists — landing page seated and active — from the
// instant the instance is constructed; `order-names-its-tabs` is the one that makes the `order` SEAT an invariant at that
// same instant (D-83), so a seat that arrives from the file naming no row the record holds, or naming one twice, is the
// engine's to correct before any act of a caller's reaches it.
import { types } from 'node:util'

import { storeCreate } from 'provident-storeroom'
import type { TriggerPair } from 'provident-storeroom'
import type { TabsRecordRow } from '../../shared/types.js'

type Store = ReturnType<typeof storeCreate>
/** The store handle this module works over, named so the surface can declare it without re-deriving the package's type. */
export type TabsRecordStore = Store

export type { TabsRecordRow } from '../../shared/types.js'

export interface TabsRecordAnswer {
  readonly status: 'committed' | 'refused'
  readonly reason?: string
  readonly message?: string
  readonly address?: readonly (string | number)[] | null
  /** **`repaired: true` WHEN THE RECORD THAT STANDS IS NOT THE RECORD THIS ACT INTENDED** — the engine's repair changed
   *  it inside the same commit (`design.md` §4, L2 §3). **ABSENT ON A CLEAN ACT AND NEVER `false`**: the member is a
   *  signal, and a `false` would be a second spelling of its absence. It is DERIVED from the store, never predicted —
   *  the write record carries no member for the repair that ran in its own commit (`guide §6.4`) — see
   *  `standsAsIntended`. **THERE IS NO `cursor` MEMBER**, and its absence is the correction of a member that named
   *  nothing: the store's write receipt is `{op, watched, triggered}` and `grep -n 'cursor'
   *  node_modules/provident-storeroom/index.d.ts` is empty, so the member was read off a receipt that never carried it
   *  and could not have been produced by any act (D-70). */
  readonly repaired?: boolean
}

export interface TabsRecordReading {
  readonly status: 'committed'
  readonly order: readonly string[]
  /** **DERIVED, NEVER STORED** (D-76): the id of the row reading active — `'landing'` when the landing ENTRY is the shown
   *  tab, and `''` on a record no legal act has left yet. It is not a pointer a caller may read back as state: the rows are
   *  the state, and this is the one member of them that answers "which tab's page is the terminal". */
  readonly landing: string
  readonly rows: readonly TabsRecordRow[]
}

export interface TabsRecordOptions {
  /** THE APP'S ONE STORE (D-64, D-65): the tab record lives at its `['tabs']` addresses and owns no instance. */
  readonly store: Store
}

export interface TabsRecord {
  read(): TabsRecordReading | TabsRecordAnswer
  /** **CREATE OR UPDATE A TAB, AND THE ACT WRITES ONE ROW** (L2 §2's second route; D-158): one
   *  `write(['tabs', row.id], TABS_RECORD_TIER, row)` at the tab's own leaf — the caller's row as admitted, and no
   *  composed record at all. **THE KEY IT LEAVES UNSEATED IS WHAT IS REFUSED INSIDE THE COMMIT**: `order-names-its-tabs`
   *  answers *carries no sequence of exactly its own tabs, once each* and its `'seat'` repair APPENDS the id it found a
   *  row under, preserving every `active` flag — so the append position is the repair's answer and never the act's
   *  promise (§4). The act fills no field either: `healedFamily` lands the three defaults in BOTH scopes, and a second
   *  authority here would suppress `repaired` (§7). Its `repaired` member compares the record that stands against the
   *  CREATION EXPECTATION — the pre reading's `order` plus the id the seat did not already name, and its rows plus this
   *  admitted row — composed and never written (§8). An id the record ALREADY seats is an UPDATE: no stray key, the
   *  bijection holds, the seat pair passes and no repair runs.
   *
   *  **THE TWO ARMS BEFORE ANY STORE VERB ARE UNCHANGED**: `malformed-row` twice, and the `namesASeat` arm — which is now
   *  the ONLY guard standing there and is therefore structural rather than tidy, because a leaf write at
   *  `['tabs','order']` would replace the seat and the `'seat'` repair would DROP the row the caller wrote (D-76, D-158).
   *  A legal unseated row is never refused here: **that write IS the creation**, the pair refuses it inside the commit,
   *  and its repair seats it. */
  commit(row: TabsRecordRow): TabsRecordAnswer
  /** **REMOVE A TAB** (L2 §2's fourth route): THE ROW IS DELETED AND NOTHING IS COMPOSED (D-156) — one
   *  `delete(['tabs', id], TABS_RECORD_TIER)` at the tab's own leaf, no value written at all. The record that stands
   *  afterwards is the two repairs': `order-names-its-tabs` owns the MEMBERSHIP (the seat drops the id it can no longer
   *  justify) and `exactly-one-active` owns the ACTIVENESS (which survivor reads active). So the act chooses no successor
   *  and no sequence, and its `repaired` member compares the record that stands against the DELETE-ONLY expectation —
   *  the pre reading's `order` and rows minus the id, flags untouched (§3, §8). A delete that removes nothing is the
   *  store's own SUCCESS (`tiers: []`, `guide §5.3`) — the tab was already absent, so the act answers `committed` over an
   *  id the seat does not name and reaches no store verb at all. */
  remove(id: string): TabsRecordAnswer
  subscribe(handler: () => void): () => void
}

/** **THE REPAIR'S CREDITED ARM, AND `repairAnswer` IS ITS ONE CONSTRUCTOR IN THIS MODULE** (`D-67`, `D-72`). The kernel
 *  credits a repair only through `landedOp` — a non-empty `opId` absent from the attempt's own ops, whose `seq` stands
 *  strictly above the op the repair was invoked for — so a repair STATES the op its own write landed. **`op` IS A MEMBER
 *  AND NEVER A MAYBE**: the failed arm below carries no `op` at all — not `op: null`, not `op: undefined`. */
export interface TabsRepairCredited {
  readonly ok: true
  readonly op: unknown
}

/** The declared FAILED arm: the repair reached no write it could be credited for, and says so in its own sentence. **IT IS
 *  THE ONLY OTHER LAWFUL RETURN** — the two arms are the whole set, and a third shape is one this module does not write. */
export interface TabsRepairFailed {
  readonly ok: false
  readonly message: string
}

/** **A REPAIR ANSWERS ONE OF THESE TWO ARMS AND NOTHING ELSE: `undefined`, `void` AND A BARE `{ok: true}` ARE NOT WRITTEN
 *  HERE** (`D-72`). **AND THE RULE IS STRUCTURAL, NOT CONVENTIONAL** — this union is `TabsRepair`'s declared return and
 *  every body's `repair` member is typed by it, so a repair that returns nothing is a COMPILE ERROR in this repo
 *  (`npm run typecheck`), not a habit a reviewer has to hold.
 *
 *  **IT IS DELIBERATELY NOT SPELLED BY THE PACKAGE'S OWN TYPE, AND `1.9.0` IS WHY THE REASON IS NOW A NARROWER ONE RATHER
 *  THAN AN ABSENCE.** At the previously installed `1.7.0` a constraint body was typed `(context: unknown) => unknown`,
 *  so the two-arm return was prose in a docblock and not a type a consumer could annotate. **`1.9.0` declares it**:
 *  `Constraint = (context: AttemptContext) => ConstraintOutcome`, with the closed three-arm
 *  `true | {message, repair: (context: RepairContext | RegistrationRepairContext) => RepairOutcome} | {message}` and
 *  `RepairOutcome = void | {ok: true; op?: …} | {ok: false; message}` — **and that union admits EXACTLY what this row
 *  forbids**: `void`, and an "ok" with no `op`, because the release credits a repair by the LEGS ITS OWN WRITE WROTE
 *  rather than by the value it returned. **This module takes none of that licence**, so borrowing the release's union
 *  here would re-open the hole the local type closes. `undefined` is the shape `ST-F2` was measured on: a repair that made
 *  its correction and returned nothing was refused with a sentence naming the CALLER's address instead of the address the
 *  repair wrote (`strata/records/store-tabs-record-unit.md` §1 — filed upstream, never patched here, D-5). **So the
 *  explicit arm stays on every version, and `RepairOutcome` is imported NOWHERE in this tree** — the return states the
 *  intent rather than leaving the next reader to work out which release credits what (`D-72`). */
export type TabsRepairAnswer = TabsRepairCredited | TabsRepairFailed

/** **WHAT THE ENGINE INVOKES INSIDE THE ATTEMPT'S OWN COMMIT**: one argument — the repair's OWN record, which is not the
 *  constraint's (`guide §7.6`) — and one of the two arms. **THE DECLARED RETURN IS THE ENFORCEMENT**: a `() => void` does
 *  not assign here, so the type-level row in the crossing battery reds the moment this is widened (`D-72`). */
export type TabsRepair = (context: unknown) => TabsRepairAnswer

/** **THE COMMIT CARRIER — THE FOURTH POSITION'S OWN CLASS TEST, EXPORTED SO A REPAIR WRITE CANNOT NAME NOTHING** (`D-73`). A
 *  repair is invoked INSIDE an attempt and the write it makes must JOIN that attempt; the only way to join is to name the
 *  commit the repair was handed, and the only position that names one is `write`'s **FOURTH**. **AND SINCE `1.9.0` THAT
 *  POSITION IS DECLARED AS THIS TYPE, NOT MERELY TESTED FOR IT** — `node_modules/provident-storeroom/index.d.ts` at the
 *  installed `1.9.0` declares `write(address: Address, tier: Tier, value: unknown, commit?: CommitCarrier): WriteRecord`
 *  beside `interface CommitCarrier { readonly pending: readonly TriggerPair[] }`: **one member, the same `TriggerPair`
 *  spelling this interface carries**, so a `TabsCommitCarrier` is assignable to the position with NO assertion — which is
 *  what let `writeJoined` lose its `commit as CommitRecord` on this bump.
 *
 *  **THE PREVIOUSLY INSTALLED RELEASE DECLARED A DIFFERENT TYPE THERE, AND THE DIFFERENCE IS THE WHOLE OF WHY A CAST ONCE
 *  STOOD HERE**: `1.7.0` declared `commit?: CommitRecord`, **four members** `{attempt: AttemptRef; op: JournalOp;
 *  triggered: readonly TriggerPair[]; pending: readonly TriggerPair[]}`, while **a landing repair's record is the
 *  six-member `{address, id, op, tier, value, pending}` and carries NO `attempt`** — it satisfied the position's CLASS TEST
 *  and not that DECLARATION, so `commit as CommitRecord` bridged the two. `1.9.0` closes the gap at the declaration
 *  (measured 2026-11-02 on its own bytes, and re-measured end to end: a repair handed the six-member record writes through
 *  it with no assertion and lands its op). **The interface below is UNCHANGED by that release**, because it was already the
 *  shape the position now declares.
 *
 *  **THE POSITION'S CLASS TEST STILL ADMITS LESS THAN ITS DECLARATION DOES**, so `isCommitCarrier` is not replaced by the
 *  release's type: a non-null, non-`Proxy`, non-array object carrying an OWN, present, non-`undefined` `pending` member,
 *  every other form a `TypeError` thrown before any store act (`src/entry/delivery.mjs`, `commitPositionRefusal`, read at
 *  its own bytes — byte-identical at `1.7.0` and `1.9.0`; its docblock is `surface.md §2.4` item 9 (g) item 1). The
 *  release's own docblock on `CommitCarrier` names the three forms its TYPE admits and its RUNTIME refuses — an INHERITED
 *  `pending`, a `Proxy`, and a SUPPLIED `undefined` at the `?` — and **the runtime refusal is what keeps the domain**.
 *
 *  **THIS TYPE IS THE CLASS TEST AND ONE MEMBER, SPELLED THE PACKAGE'S OWN WAY**: `TriggerPair` is imported rather than
 *  re-spelled, so the member's element type is the kernel's and not this module's guess.
 *  Exported because the boot and any later renderer work annotate against ONE rule rather than against a release's licence. */
export interface TabsCommitCarrier {
  readonly pending: readonly TriggerPair[]
}

/** **WHAT A CONSTRAINT BODY MAY ANSWER, IN THE PACKAGE'S OWN CLOSED THREE-ARM SET** (`guide §7.2`, `§7.6`): `true` is the
 *  only pass value; `{message, repair}` is a repairable violation; `{message}` is one no repair answers. **NO FOURTH ARM AND
 *  NO `undefined`**: a body that falls off its own end answers nothing at all, which the kernel reads as an outcome this
 *  module never wrote — so the arm is declared rather than left to fall through (`D-72`, the batch of `D-65`).
 *
 *  **AND THE UNREPAIRABLE ARM SPELLS `repair?: never`, WHICH IS THE WHOLE OF ITS JOB — MEASURED 2026-11-02.** Written as a
 *  bare `{message: string}`, the union was assignable from `{message, repair: () => void}`: excess-property checking reads
 *  the union's WHOLE member set, so `repair` was a known member (from the repairable arm) while the literal satisfied the
 *  bare arm — a `void` repair riding a shape whose type says nothing is there. `never` makes the unrepairable arm refuse the
 *  member outright, so the two arms stay one decision and neither can be reached by the other's shape. */
export type TabsConstraintAnswer =
  | true
  | { readonly message: string; readonly repair: TabsRepair }
  | { readonly message: string; readonly repair?: never }

/** One element of the batch the boot constructs the instance with (`D-65`): the pair, and the body the engine asks. */
export interface TabsConstraintDeclaration {
  readonly address: readonly string[]
  readonly id: string
  readonly constraint: (context: unknown) => TabsConstraintAnswer
}

/** The record root: the `order` seat and one flat leaf per tab — the landing ENTRY's among them (D-76). */
export const TABS_RECORD_ADDRESS: readonly string[] = ['tabs']
/** **THE RECORD'S OWN TIER, SPELLED ONCE** (`D-101`). Every `write`, every `read`, the repair route and both
 *  whole-record writes of this module drive this constant, so the family cannot half-move to another tier. It is
 *  PRIVATE and is published only through `tabsDeclaredRoots` below, so the module has ONE spelling of the word and
 *  no second export that a reader could confuse for a second authority. */
const TABS_RECORD_TIER = 'file' as const
/** **THE ONE SINGLETON SEAT**, named so no caller composes it: the ordered place of every tab id. */
export const TABS_ORDER_ADDRESS: readonly string[] = ['tabs', 'order']
/** **THE LANDING ENTRY'S KEY, SPELLED ONCE.** It is the second element of `TABS_LANDING_ADDRESS` below, and it is the id
 *  the landing entry DOES carry (`TABS_LANDING_ID`, below) — one spelling rather than two that must be kept equal by hand.
 *  A legacy install's retired STRING seat may still sit at this address in an old file: `landingOf` reads only a ROW there, so
 *  a stale string answers nothing rather than naming a tab, and the first whole-record write replaces it whole. */
const LANDING_ENTRY_KEY = 'landing'
/** **THE LANDING ENTRY'S OWN LEAF — `file.tabs.landing` — AND NO LONGER A SEAT OF ITS OWN** (D-76). This address used to
 *  hold a STRING: the witness naming which tab is active, written beside `order` in the same flat object. **That string is
 *  the collision `D-75` measured**: a member's key and a seat's name are one namespace, so an entry whose id spelled the
 *  seat could not be held — the seat string took the key and `read()` named a landing row the record did not hold. So the
 *  witness is DERIVED (the id of the row reading active, `landingOf`) and this address is the landing ENTRY's record,
 *  exactly as the renderer's `file.tabs.landing` already was. **And now the entry's own id IS `LANDING_ENTRY_KEY`, so this
 *  address is `['tabs', TABS_LANDING_ID]` and the two are one thing** (D-76). */
export const TABS_LANDING_ADDRESS: readonly string[] = ['tabs', LANDING_ENTRY_KEY]
/** The declared constraint id, kept even though this pass enforces the invariant at the boundary. */
export const TABS_CONSTRAINT_ID = 'exactly-one-active'
/** **THE EXISTENCE PAIR'S id** — `['tabs']` must stand, and its repair is the one act that creates it. Exported beside
 *  `TABS_CONSTRAINT_ID` so the registered list is nameable without a caller spelling either id (`D-69`). */
export const TABS_MUST_STAND_ID = 'tabs-must-stand'
/** The one shape arm's sentence (L3 signatures §5). */
export const MALFORMED_ROW_MESSAGE = 'the commit carries no tab id, or no plain record'

/** **THE SEAT-NAME ARM'S `reason` — THE SECOND TOKEN THIS MODULE MINTS, AND IT IS A FAULT THE SHAPE ARM'S IS NOT** (D-76).
 *  The record's family keys one member per tab in the SAME flat object that holds its seat, so an entry id equal to a SEAT
 *  name is unrepresentable: the seat and the member are one namespace, and whichever wrote last is what a read answers.
 *  `malformed-row` is therefore the wrong token for it — that sentence is about a row carrying no id or no plain record,
 *  and a caller sent it here would look for a shape fault in a row whose shape is fine. **This token is minted by this
 *  module and by nothing else**: the store never answers it, and the two routes that take an id (`commit`, `remove`) answer
 *  it before any store act, so the record is untouched when it is refused. */
export const SEAT_NAME_REASON = 'seat-name'
/** **AND THE SENTENCE THAT SAYS WHAT IS WRONG**, in the same register as `MALFORMED_ROW_MESSAGE`: the id spells the record's
 *  own `order` seat, and a member and a seat are one name in this family — so the entry cannot be held beside the seat that
 *  is already there. It names the seat rather than the act, because the fault is the id and both routes refuse the same
 *  one. **THE SEAT SET IS `TABS_ORDER_ADDRESS`'S, NOT A SECOND SPELLING**: `SEAT_NAMES` below reads the address constant,
 *  and the sentence's `'order'` is that constant's own text. */
export const SEAT_NAME_MESSAGE = "the tab id spells the record's own 'order' seat, and a member and a seat are one name in this family"

/** **THE SEAT'S OWN KEY, SPELLED ONCE — the second element of `TABS_ORDER_ADDRESS`, which is what the record root's
 *  object holds the sequence under.** Three bodies read it (`orderNamesItsTabs`'s arm, `repairOrderSeat`'s own-key parse
 *  and the seat-name guard below), and a second spelling of one address is the rename that half-lands. */
const ORDER_SEAT_KEY = TABS_ORDER_ADDRESS[1] as string
/** **THE ONE NAME AN ENTRY ID MAY NOT TAKE — DERIVED FROM THE ADDRESS CONSTANT, NEVER RE-SPELLED.** After D-76 derived the
 *  landing witness the record has exactly ONE stored singleton seat left, `order`; an entry under that key would be written
 *  into the same object the seat occupies, so the record could hold one or the other and never both. `landing` is NOT in
 *  this list: `['tabs','landing']` is now the landing ENTRY's own leaf, which is the whole point of the derivation. */
const SEAT_NAMES: readonly string[] = [ORDER_SEAT_KEY]
const namesASeat = (id: string): boolean => SEAT_NAMES.includes(id)
/** **THE CHANGE LISTENER STANDS AT THE RECORD ROOT ITSELF — `['tabs']`, BESIDE ALL FIVE PAIRS — AND FROM `1.7.0` THAT IS
 *  THE LAW AND NOT AN ARGUMENT** (`guide §7.3`'s clause of 2026-11-01, items (i) and (iii); `D-71`). **A CONSTRAINT PAIR
 *  AND A LISTENER MAY STAND AT ONE ADDRESS**: different handles, one address, both reached by the act — the pair ASKED by
 *  the pass, the listener DELIVERED after it. **THE ONLY CROSS-KIND RESTRICTION IS THE HANDLE**: a listener whose handle
 *  equals a constraint pair's `id` is `AddressMalformed` at `listen`/`register`/`addConstraint`, in both directions, and
 *  the address is named by no rule at all. **MEASURED 2026-11-01 on the published `1.7.0`, a fresh instance carrying this
 *  module's five pairs at `['tabs']` (the five that release's batch carried, D-83 added the sixth):** a live registered listener at `['tabs']` was accepted, and one whole-record write
 *  there answered `triggered` naming ALL FIVE pair ids and the listener, every entry at `['tabs']` — `[{handle:
 *  'tabs-must-stand', address: ['tabs']}, …, {handle: 'tabs-record:1@tabs', address: ['tabs']}]` — and fired the listener
 *  ONCE; a write a pair REFUSED threw the pass's own form and delivered ZERO — the pairs are asked, then the thrown form,
 *  and no delivery follows a refused commit.
 *
 *  **WHAT THIS REPLACES IS A WORKAROUND, AND ITS READING IS KEPT AS THAT TREE'S OWN** (2026-11-01, the then-installed
 *  `1.6.2`): `store.listen('tabs-record', [['tabs']])` threw the plain form `{status: 'AddressMalformed', message: "… the
 *  listener 'tabs-record' cannot be installed at tabs: the constraint 'tabs-must-stand' stands there, and a listener and a
 *  constraint do not share one"}`, so the push installed at the `order` descendant — the seat the one whole value every act
 *  writes always touches — and `subscribe` swallowed that refusal in its own `catch` (D-70). The address was never the
 *  objection `1.7.0` keeps; the HANDLE is, and that release re-derived the rule sentence in place to say so.
 *
 *  **ONE DELIVERY PER COMMITTED CHANGE, MEASURED OVER THE DESCENDANT THIS NO LONGER NEEDS** (2026-11-01, the installed
 *  `1.6.2`): a `commit` of a NEW tab fired it once, a `commit` that only UPDATED an existing tab's `label` fired it once, a
 *  `remove` fired it once, the `['tabs']` delete whose `tabs-must-stand` repair re-creates the record inside the same
 *  commit fired it once, and a `mem` write at `['elsewhere']` fired it ZERO times — one notification per committed change,
 *  and none for a write that touches no part of the record. **AND THE ROOT IS THE ONE ADDRESS THAT CANNOT MISS**: a
 *  descendant hears a delete only through `TOUCHED` (`guide §6.3` item 2, D-66), while a listener at the pair's own
 *  address is a PREFIX of every address under it. `TABS_RECORD_ADDRESS` is reused rather than re-spelled: a second
 *  spelling of one address is the rename that half-lands. */

/** **ONE HANDLE PER SUBSCRIPTION, MINTED HERE — MEASURED, NOT PREFERRED** (2026-11-01, the installed `1.6.2`). The store's
 *  registry is the INSTANCE's — two instances spelling one name see none of each other's deliveries — but within one
 *  instance `register` REPLACES the function held under a handle and `unlisten` withdraws the handle WHOLE
 *  (`guide §6.2`). **Driven over one store with ONE spelled name:** two subscriptions answered `{first: 0, second: 1}`
 *  for a commit, and `{first: 0, second: 1}` again after the FIRST withdrawal — the second subscriber silently starved
 *  the first, and the first's teardown silenced the second. **With a name per subscription the same drive answers
 *  `{h1: 1, h2: 1}` and then `{h1: 1, h2: 2}`.** A fixed `'tabs-record'` name therefore encoded "one subscriber" as a
 *  fact about the SPELLING, and a second `subscribe` is not impossible in this app: the surface holds exactly one
 *  subscription (`attach`/`detach` guard their own), while `subscribe` is a route of this module's own interface that
 *  nothing refuses a second caller — the crossing battery itself builds a second record over one store. So the name is
 *  minted, and the one-subscriber arrangement stays where it belongs, in the surface. */
let issuance = 0
/** **AND THE MINTED SPELLING CAN NEVER EQUAL A CONSTRAINT `id`, WHICH IS THE WHOLE OF THE ONE RULE THAT SURVIVES** (D-71):
 *  the six ids this module declares are `tabs-must-stand`, `order-names-its-tabs`, `exactly-one-active`, `tab-has-title`,
 *  `tab-has-content` and
 *  `tab-has-lastActiveAt` (`tabsConstraintDeclarations`), and this handle is `tabs-record:<n>@tabs` — a FIXED `tabs-record:`
 *  prefix no id carries, plus a MINTED ORDINAL that only ever grows, plus the address it is bound at. A table of literals
 *  cannot spell either part, so no `register`, no `listen` and no `addConstraint` of this module's can meet a cross-kind
 *  duplicate; the six pairs and a live listener stand at `['tabs']` at once, measured on the published `1.7.0` with the five
 *  that release's batch carried, and re-measured at six on this head 2026-11-02 (`D-83`). */
const handleFor = (): string => {
  issuance += 1
  return 'tabs-record:' + String(issuance) + '@' + TABS_RECORD_ADDRESS.join('/')
}


/** **THE PACKAGE'S THROWN FORM IS A PLAIN OBJECT** (`{status, message, log}`, `guide §8` — never an `Error` subclass), so a
 *  refusal read through `instanceof Error` loses its own status and sentence. This reads both shapes. */
const refusalOfThrown = (caught: unknown): { reason: string; message: string } => {
  if (caught !== null && typeof caught === 'object') {
    const record = caught as Record<string, unknown>
    const reason = typeof record['status'] === 'string' ? record['status'] : 'refused'
    const message = typeof record['message'] === 'string' ? record['message'] : 'the store refused the tab record'
    return { reason, message }
  }
  return { reason: 'refused', message: caught instanceof Error ? caught.message : 'the store refused the tab record' }
}

const plain = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

/** **THE CLASS TEST ITSELF, PREDICATE FOR PREDICATE — MIRRORED FROM THE INSTALLED PACKAGE'S BYTES, NOT REASONED ABOUT**
 *  (`D-73`). The position is refused unless the value is (i) a non-null object, (ii) NOT a `Proxy`, (iii) NOT an array, and
 *  (iv) carries an own `pending` whose read does not throw and is not `undefined` — `src/entry/delivery.mjs`'s
 *  `commitPositionRefusal` at its own bytes, **byte-identical at `1.7.0` and at the installed `1.9.0`** (read at both
 *  trees' bytes 2026-11-02, so this predicate carries over the bump unmoved), whose member read is wrapped because a hostile
 *  getter is outside the position's domain (`JS-1`), and whose `Proxy` arm is `types.isProxy` (the same `node:util`
 *  predicate used here, so the two agree case for case). **EVERY CHECK IS TAKEN, INCLUDING THE `Proxy` ONE**: a `Proxy`
 *  carrying an own `pending` passes (i), (iii) and (iv) and would be refused by the store alone — a rejection this module
 *  cannot see and would therefore report as a thrown `TypeError` out of a repair instead of the failed arm.
 *
 *  **THE ONE CHECK THAT IS THIS MODULE'S AND NOT THE CLASS TEST'S IS THE MEMBER'S SHAPE**: the class test admits ANY present,
 *  non-`undefined` `pending`, while `TabsCommitCarrier` spells the `readonly TriggerPair[]` the kernel's own `CommitRecord`
 *  declares — so a `pending` that is present but not a list answers the failed arm here rather than being carried as a member
 *  this module cannot honestly type. The kernel mints that list and nothing else (`CommitRecord.pending`, seeded as a clone of
 *  `triggered`), so the arm is stated rather than discovered at a write. **`pending` IS NEVER READ FOR ITS CONTENT**: the
 *  carrier is a TOKEN — naming the commit is what joins the attempt, and the op the repair lands is the whole of what the
 *  kernel credits it for (`repairAnswer`, `landedOp`).
 *
 *  **AND THE VALUE IS PASSED ON AS IT WAS HANDED, NEVER REBUILT**: the commit carries its log under a symbol key
 *  (`state.mjs`'s `COMMIT_LOG`), read by the store's refusal path to report what the commit already held — a fresh
 *  `{pending}` built here would answer `[]` there, so the predicate NARROWS and nothing constructs. */
export const isCommitCarrier = (value: unknown): value is TabsCommitCarrier => {
  if (!plain(value)) return false // (i) non-null object, (iii) not an array — the one admission the module already carries
  if (types.isProxy(value)) return false
  if (!Object.hasOwn(value, 'pending')) return false
  let pending: unknown
  try {
    pending = value['pending']
  } catch {
    return false // the class test's own guarded read: a getter that throws is outside the position's domain
  }
  return pending !== undefined && Array.isArray(pending)
}

/** **THE ONE PLACE A REPAIR'S WRITE IS MADE — AND ITS `commit` POSITION IS REQUIRED, SO A REPAIR CANNOT WRITE WITHOUT ONE**
 *  (`D-73`). A repair write names the commit it was handed at `write`'s **FOURTH** position, which is what makes it JOIN the
 *  open attempt instead of opening a second `K-2` at the address that already holds one — measured 2026-11-01 both ways: with
 *  no commit, `write(['tabs'], …)` inside a pass opened at `['tabs']` was refused *"a constraint attempt is already open at
 *  tabs; it is disposed of by its own K-3 and by no other act"* (`KC-7`); with the commit, the same write answered
 *  `{op: {opId: 'op-2', seq: 2}}` and the pass re-ran green (`D-67`). **THE SIGNATURE IS THE RULE**: `healRecord` and
 *  `mintRecord` are the module's two repair bodies, both go through this call, and the carrier is a REQUIRED second position —
 *  so a repair that names no commit is an ARITY ERROR at compile time, not a convention a reviewer holds. The type-level rows
 *  in `tests/integration/store-tabs-record/crossing.test.ts` red the moment this position is widened to optional or to
 *  `unknown` (`npm run typecheck:tests`).
 *
 *  **THE REGISTRATION INSTANT NEVER REACHES THIS HELPER, AND THAT IS STRUCTURAL RATHER THAN REMEMBERED**: a repair handed the
 *  registration's record writes through the `write` MEMBER that record carries, three positions and no fourth — a fourth there
 *  is a `TypeError` thrown before any store act (`mintRecord`'s first branch, `guide §7.2`'s dated clause of 2026-11-02, item
 *  (4)). That route's handle is a three-position FUNCTION and not the store, so handing it to this helper is a type error of
 *  its own: there is no shape in which this call supplies a fourth position to the registration route.
 *
 *  **NO CAST STANDS IN THIS MODULE'S REPAIR PATH ANY MORE, AND THE ONE THAT DID WAS REMOVED BY `1.9.0` RATHER THAN BY
 *  A LOOSENING HERE**: the then-installed `1.7.0` declared the position `commit?: CommitRecord` — four members
 *  `{attempt, op, triggered, pending}` — while the six-member `{address, id, op, tier, value, pending}` record a landing
 *  repair is genuinely handed carries NO `attempt`, so it satisfied the position's class test and not its declaration and
 *  `commit as CommitRecord` bridged the two. **`1.9.0` DECLARES `commit?: CommitCarrier`, one member `readonly pending:
 *  readonly TriggerPair[]`** — the shape `TabsCommitCarrier` already IS — so the carrier is assignable on its own and the
 *  assertion is gone (measured 2026-11-02: `npm run typecheck` clean without it, and this call still lands its op inside a
 *  live `exactly-one-active` repair, `tests/integration/store-tabs-record/crossing.test.ts` green). The carrier is passed on
 *  AS IT WAS HANDED, never rebuilt: it carries its log under a symbol key the store's refusal path reads. */
export const writeJoined = (store: Store, commit: TabsCommitCarrier, value: unknown): unknown =>
  store.write(TABS_RECORD_ADDRESS, TABS_RECORD_TIER, value, commit)

/** One tab's record, admitted field by field: an unknown member is dropped, never carried. **EVERY MEMBER OF
 *  `TabsRecordRow` IS CARRIED**, because this is the same admission `read` reports through and the one `commit` writes
 *  back: the row it lands at the tab's own leaf IS this admitted row (`D-158`), so a member dropped here is a member
 *  `read` cannot report AND a member `commit` cannot land. **AND THE TAB-AT-LARGE ERASURE THIS SENTENCE ONCE WARNED OF
 *  IS `commit`'s NO LONGER**: it writes ONE row and rebuilds no record at all, so it cannot take a member from any
 *  OTHER tab — the whole-record rebuild is the THREE REPAIRS' (`healedFamily`, composed by `composeRecord` and written
 *  by `writeWholeRecord`) and the TWO COMPARATORS' (`remove`'s delete-only and `commit`'s creation expectation, composed
 *  and never written), and both rebuild from a RAW SPREAD of the record rather than through this admission. Which is how
 *  `lastActiveAt` was lost on the first pass of this battery: the omission is here, in what this function carries. */
const rowOf = (value: Record<string, unknown>): TabsRecordRow | null => {
  const id = value['id']
  const target = value['target']
  if (typeof id !== 'string' || id.length === 0) return null
  if (typeof target !== 'string') return null
  const row: {
    id: string
    target: string
    active: boolean
    error?: string
    label?: string
    lastActiveAt?: string
  } = {
    id,
    target,
    active: value['active'] === true,
  }
  if (typeof value['error'] === 'string') row.error = value['error']
  if (typeof value['label'] === 'string') row.label = value['label']
  if (typeof value['lastActiveAt'] === 'string') row.lastActiveAt = value['lastActiveAt']
  return row
}


/** **`exactly-one-active` — THE RENDERER'S ALGORITHM, TRANSPORTED** (`D-63`, `D-65`; the source is
 *  `src/renderer/renderer.ts`'s `TABS_CONSTRAINT`, whose referent discipline this body carries rule for rule).
 *
 *  The engine hands a constraint `{address, op, tier, value}` — the LANDING op and the value that write returned
 *  (`kernel-attempt.mjs`'s context; `kernel-surface.md §2.3` item 1) — and never the machinery's own pre-write
 *  capture. So the PRE side is the last record this module observed, kept in `lastView` and refreshed by every read
 *  and every commit. **That substitution is the one thing the port could not carry, and it is bounded**: the cache is
 *  this module's own view of a record only this module writes, so it is stale only for a write that bypassed
 *  `commit` — which the store's own refusal arm answers before the repair is reached.
 */
interface RecordView {
  readonly order: string[]
  readonly entries: Record<string, TabsRecordRow>
}

let lastView: RecordView | null = null

/** **THE RECORD AS ONE VIEW, FROM A VALUE RATHER THAN FROM A HANDLE — and the reason it is a function of a VALUE is the
 *  CREATION instant** (`D-83`): a repair invoked at a registration instant has no store handle to read through (the boot
 *  binds its holder only after `storeCreate` answers, `src/main/main.ts`), and what it is handed instead is the record
 *  itself. So the ONE parse of the family is spelled here, `viewOf` reads the store through it, and the sixth declaration's
 *  repair composes from the value it was handed through the same one. **`null` means "no record at this value"** — an
 *  absent address, a primitive, or a record whose `order` is not an array; each of those is a state the caller decides
 *  about, and none of them is an empty view. */
const viewFrom = (whole: unknown): RecordView | null => {
  if (!plain(whole)) return null
  const record = whole
  const seated = record['order']
  if (!Array.isArray(seated)) return null
  const order: string[] = []
  const entries: Record<string, TabsRecordRow> = {}
  for (const id of seated) {
    if (typeof id !== 'string') continue
    order.push(id)
    const row = record[id]
    if (plain(row)) entries[id] = { ...row, id } as unknown as TabsRecordRow
  }
  return { order, entries }
}

/** The record as one view: the order seat and every entry the store still holds under it. */
const viewOf = (store: Store): RecordView => {
  const order: string[] = []
  const entries: Record<string, TabsRecordRow> = {}
  // **THE BODY READS THE OBJECT AT THE PAIR'S OWN ADDRESS** (D-66): a sub-property write changes what `['tabs']` reads,
  // which is why the watch fires, and the object read there is the record to judge.
  try {
    const whole = viewFrom(store.read(TABS_RECORD_ADDRESS, TABS_RECORD_TIER) as unknown)
    if (whole !== null) return whole
  } catch {
    // the split seats below are the fallback the module's own writes keep readable
  }
  try {
    const read = store.read(TABS_ORDER_ADDRESS, TABS_RECORD_TIER) as unknown
    if (Array.isArray(read)) for (const id of read) if (typeof id === 'string') order.push(id)
  } catch {
    return { order, entries }
  }
  for (const id of order) {
    try {
      const value = store.read(['tabs', id], TABS_RECORD_TIER) as unknown
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        entries[id] = { ...(value as Record<string, unknown>), id } as unknown as TabsRecordRow
      }
    } catch {
      // an id whose record the store does not hold is not an entry
    }
  }
  return { order, entries }
}

const readActive = (row: TabsRecordRow | undefined): boolean => row !== undefined && row.active === true

/** **WHICH NODE AN ACT IS AT — THE DISCRIMINATOR THE TWO UNWRAPPED BODIES JUDGE BY, AND IT IS THE ACT'S ADDRESS AND NOT
 *  "a handle stands"** (`design.md` §4; D-135's rule, `guide §7.6` with D-56/D-66's membership clause).
 *
 *  A pair at `['tabs']` is asked for acts at `['tabs']` ITSELF and at every address UNDER it, and it is handed the act's
 *  own `address`, `tier` and `value` — measured 2026-11-09 on the installed `1.10.0`, three acts, one recording body per
 *  act: a ROOT write hands the whole record as `value`; a LEAF write at `['tabs','tab-9']` hands THE ROW; a descendant
 *  DELETE at `['tabs','tab-1']` hands `value: undefined`. So a body that took its view from the act's value would read a
 *  ROW as the family on the second act and NOTHING as the family on the third — measured, the second replaced the record
 *  with one tab row and the third minted the landing floor over the siblings it erased (`D-156`'s faults (a) and (b)).
 *
 *  **AND IT IS THE ADDRESS RATHER THAN THE HANDLE, BECAUSE A CALLER'S OWN CONTEXT IS A CONTEXT TOO**: `central-data`'s
 *  `VA-14` hands the seat declaration a hand-made `{address, tier, value}` WHILE a real store stands, and a body that
 *  answered from that store would ignore the value it was given and call a legal record legal whatever it was asked
 *  about. The address is the one member both instants and both drivers spell, so it is the one member this decides on.
 *  **Nothing deeper than the root is judged from a value**, and the root itself — the registration ask, a root write and
 *  a hand-driven row alike — is. */
const deeperThanRecord = (address: unknown): boolean =>
  Array.isArray(address) &&
  address.length > TABS_RECORD_ADDRESS.length &&
  TABS_RECORD_ADDRESS.every((segment, at) => address[at] === segment)

/** **THE RECORD AS THE STORE HOLDS IT, READ RAW AT `['tabs']` — the other half of the address rule, and `undefined`
 *  where the root does not stand.** This is NOT `viewOf`: that one is SEAT-SEATED (`viewFrom` walks `order`), and the
 *  body that judges the SEAT cannot be seated from the seat it is judging. An unreadable root answers `undefined` rather
 *  than throwing, so a body answering at a deeper address abstains instead of refusing for a reason it cannot see. */
const rawRecord = (store: Store | null): unknown => {
  if (store === null) return undefined
  try {
    return store.read(TABS_RECORD_ADDRESS, TABS_RECORD_TIER) as unknown
  } catch {
    return undefined
  }
}

/** **THE RECORD PARSED BY ITS OWN KEYS — THE SEAT REPAIR'S VIEW, AND THE ONE THING A SEAT-SEATED VIEW CANNOT GIVE IT**
 *  (`design.md` §4's third hunk, D-156).
 *
 *  `viewFrom` builds its entries by WALKING `order`, which is right for every body that judges the record the seat
 *  describes and wrong for the one body that repairs the seat: an id in `order` with no row under it and a row under an
 *  id the seat never names are the SAME fault, and a repair that kept the seat's parse could only DROP the second — so a
 *  caller's just-written leaf would vanish and the act would answer `committed` over a tab that is gone. So this parses
 *  the record by what it HOLDS:
 *
 *  1. **THE SEAT'S IDS THAT HOLD A PLAIN ROW**, in seat order and ONCE EACH — the ids the record can keep exactly as the
 *     seat ranks them, and the reason a repeated seat is one row and not two (`D-83`'s measured stuck record);
 *  2. **THEN EVERY OTHER OWN KEY HOLDING A PLAIN ROW**, in the record's own key order — the rows the seat does not name,
 *     which are what makes this repair SEAT as well as drop;
 *  3. **AND NOTHING ELSE**: a non-string seat member, an id with no row, a repeated id, a legacy STRING seat and a
 *     scalar key the seat does not name are all simply not in the view, which is what lets ONE repair answer all three
 *     of them (`order ≡ rows`).
 *
 *  The row's `id` member is the KEY it is held under — the family's own rule, the spelling `viewFrom` gives its entries. */
const seatViewFrom = (whole: unknown): RecordView => {
  const order: string[] = []
  const entries: Record<string, TabsRecordRow> = {}
  if (!plain(whole)) return { order, entries }
  const record = whole
  const seat = record[ORDER_SEAT_KEY]
  if (Array.isArray(seat)) {
    for (const id of seat) {
      if (typeof id !== 'string' || id.length === 0) continue
      if (order.includes(id)) continue
      const row = record[id]
      if (!plain(row)) continue
      order.push(id)
      entries[id] = { ...row, id } as unknown as TabsRecordRow
    }
  }
  for (const key of Object.keys(record)) {
    if (key === ORDER_SEAT_KEY) continue
    if (order.includes(key)) continue
    const row = record[key]
    if (!plain(row)) continue
    order.push(key)
    entries[key] = { ...row, id: key } as unknown as TabsRecordRow
  }
  return { order, entries }
}

/** **THE LANDING ENTRY'S ID IS `'landing'`, SPELLED ONCE AND EXPORTED** — the user's decision (D-75) as it now stands in the
 *  record (D-76). It is `LANDING_ENTRY_KEY`, the same literal `TABS_LANDING_ADDRESS` is spelled from, so the entry's id, the
 *  address it is seated at and the `order` member that names it are ONE spelling rather than three that must agree. **The
 *  move was not a rename, and the measurement is why it needed a derivation first**: the family keyed one member per tab in
 *  the SAME flat object as its two SEATS, so with this id the composer wrote the row at that key and then the `landing` seat
 *  over it — the construction instant's own bytes answered `{"landing":"landing","order":["landing"]}` at `['tabs']` with
 *  `read()` answering `rows: []`, the first `commit({id:'landing',…})` was refused `ConstraintPassRefused`, and on a HEALTHY
 *  record the same commit was ANSWERED `committed` while leaving `order` naming a row the record did not hold. The seat is
 *  DERIVED AND NO LONGER STORED (`landingOf`; the composer writes no witness at all), and that is what freed the spelling.
 *
 *  **Exported because the renderer pass reads ONE spelling** (D-76): its own `TABS_LANDING_ID` is this value, and a second
 *  literal in a client is the rename that half-lands. **IT IS NOT THE PAGE NODE'S ID** (`src/shared/demo-envelope.ts`'s
 *  `TABS_LANDING_PAGE_ID`, which AUTHORS the node and stays `'tabs-landing-page'`) **AND NOT A CONTENT TARGET**
 *  (`TAB_CONTENT_FALLBACK` below, which stays the authored page because a row's `target` is the content it contains while its
 *  `id` is its identity — and `'landing'` names no authored node at all): four spellings shared these letters before this
 *  move, and exactly one of them — this entry's id — has changed. */
export const TABS_LANDING_ID: string = LANDING_ENTRY_KEY

/** Every tab carries a TITLE. The record's own title field is the row's `label`. */
const TAB_TITLE_REPAIR = 'untitled'
/** **A CONTENT REFERENCE AND NOT AN ID, SO THIS DID NOT MOVE WHEN THE ENTRY'S ID DID** (D-75, `D-76`). A row's `target` is the
 *  content the tab CONTAINS (`src/shared/types.ts`'s docblock on the row) and its `id` is the tab's IDENTITY; the two
 *  coincided here only because the landing tab's content is the landing page. **What decides it is that `'landing'` names no
 *  authored node**: the one node a client can resolve for that page is `TABS_LANDING_PAGE_ID` (L2 §6 — both page nodes are the
 *  ENVELOPE's, resolved through `Runtime.elementForNodeId`), so a blank target repaired to `'landing'` would point a tab at
 *  content that resolves to NOTHING — the unresolvable-target terminal the error page exists for, minted by the repair meant to
 *  prevent it. So `landingRow` spells its own `target` through THIS constant rather than through `TABS_LANDING_ID`, and the two
 *  now genuinely differ (`'tabs-landing-page'` the content, `'landing'` the id) where before they were one string by accident. */
const TAB_CONTENT_FALLBACK = 'tabs-landing-page'

/** A field that is absent, not a string, or blank is a field the record cannot be read for. */
const blank = (value: unknown): boolean => typeof value !== 'string' || value.trim().length === 0

/** **THE SEAT AN EMPTY RECORD NEVER KEEPS: the landing ENTRY, seated and active, with all three field defaults already
 *  filled** — `id` and `label` are the entry's spelling and `target` is the authored landing page
 *  (`TAB_CONTENT_FALLBACK`), because identity and content are two things (D-75). Two bodies mint it and they must mint the
 *  SAME one — `healRecord`'s `order.length === 0` branch, where the invariant refuses a record holding no tab at all, and
 *  `mintRecord`, where the address holds nothing and the record itself has to be created. A second spelling of this row is
 *  a second answer to "what is a record with no tabs", and the engine's re-run would judge whichever one wrote last.
 *
 *  **AND "RESERVED" IS HALF-ANSWERED NOW, WHERE `D-75` MEASURED A HOLE (D-76).** The renderer guards the spelling twice
 *  (`mintTabId('landing')` answers `'reserved-spelling'`; its store answers `remove('file.tabs.landing')`
 *  `'reserved-name'`), and this module was expected to answer the same reservation with an UPDATE on `commit` and the
 *  empty-sequence REPAIR on `remove`. **The derivation is what makes that true for `landing`**: the entry is an ordinary
 *  member keyed by its id, so `remove` of the last tab re-mints this row at that key and a `commit` under that id updates
 *  it in place — measured 2026-11-02, `commit({id:'landing',…})` on a healthy record was answered `committed` and wrote
 *   NO `landing` row member at all, because the seat string took the key; the seat is now derived and no act writes it.
 *  **WHAT IS STILL OWED IS THE OTHER SEAT**: `order` stays a stored singleton, so an entry id of `order` is unrepresentable
 *  in the same way, and no route refuses it yet (the guard is the step after this derivation, reported in D-75 and built
 *  one commit later in D-76). */
const landingRow = (stamp: string): TabsRecordRow => ({
  id: TABS_LANDING_ID,
  target: TAB_CONTENT_FALLBACK,
  active: true,
  label: TABS_LANDING_ID,
  lastActiveAt: stamp,
})

/** **THE SEATED PAIRS: THE SEAT DECIDES WHICH ROWS EXIST** (`D-156`, `D-160`). For each id the seat `order` names, in seat
 *  order, that id's row **IF the entries map holds one** — so the value this answers can never carry an id the seat does
 *  not name, whatever the map holds, and **that is the reason a record composed from it is bijective by construction**
 *  rather than by a caller's care: `order-names-its-tabs` demands the seat and the rows name one another, this answers
 *  exactly one half of that sentence, and the assembly below takes its members from here, so the two halves cannot be
 *  spelled apart.
 *
 *  **IT IS THE ONE ELEMENT OF THE COMPOSER THAT IS PROMOTED, AND THE MEASUREMENT IS WHY** (`D-160` §11): no call site uses
 *  the seat COPY, the seat-FIRST placement or this DROP alone — every one of the five takes the whole value, and the copy
 *  is dead defence at all of them — so a function per element would be three indirections bought for a nine-line body.
 *  What survives is the relation this module spells four times (`viewFrom`'s entries build, `canonicalRecord`'s rows
 *  projection and `healedFamily`'s rows build beside this one) and negates once on purpose (`seatViewFrom`'s own-key tail,
 *  which APPENDS a row the seat does not name, because a caller's just-written leaf must not vanish). A name is a second
 *  copy of a rule to keep right, so exactly one is promoted and no second name stands beside it (D-1, `D-155`). */
const rowsSeatedUnder = (
  order: readonly string[],
  entries: Record<string, TabsRecordRow>,
): [string, TabsRecordRow][] => {
  const seated: [string, TabsRecordRow][] = []
  for (const id of order) {
    const row = entries[id]
    if (row !== undefined) seated.push([id, row])
  }
  return seated
}

/** **THE RECORD IS COMPOSED FROM `order` AND THE ROWS IT NAMES, AND NOT EVERY SITE OF IT IS AN ACT** (`D-155`, `D-156`).
 *
 *  1. **A NESTED WRITE DOES NOT CREATE ITS PARENT** (`guide §2`'s fifth rule: *"write a whole structured value at the
 *     key, which mints the branch tree beneath it in one call"*). The first version wrote `['tabs','tab-1']` on a fresh
 *     store and was answered `AddressNotFound` with an EMPTY `log`, so that refusal came from the address rung and not
 *     from a verdict. **THAT MEASUREMENT STANDS AND IS NO LONGER THIS COMPOSER'S REASON**: `tabs-must-stand` mints the
 *     root at the construction instant and `viewOf` reads `['tabs', id]` per id, so the parent is ENFORCED and trusted
 *     present here (`D-135`'s rule at this family, `design.md` §10). **WHAT REMAINS IS THE THREE REPAIRS' REASON**
 *     (`D-83`: a repair must write the rows it names) **AND THE TWO COMPARATORS'** (`D-158`): `remove`'s delete-only
 *     expectation and `commit`'s creation expectation are this function's only other callers, and each is COMPOSED,
 *     COMPARED by `standsAsIntended` and NEVER WRITTEN — no act writes a composed value any more (§3, §8), so no act of
 *     either kind is a writer among this composer's reasons.
 *  2. **A REPAIR MAY WRITE AT THE ATTEMPT'S OWN ADDRESS — IF IT NAMES THE COMMIT IT WAS GIVEN.** A repair is handed
 *     `{address, id, op, tier, value, pending}`, whose `pending` is the commit's own member (`surface.md §2.11` clause
 *     6: the repair *"should be using the package surface functions … so that they can make their own write call use
 *     that commit"*). Passing that position at `write`'s FOURTH slot makes the repair's write **join** the open attempt,
 *     so it meets no `KC-7` hold and lands its op inside the same commit. Measured twice:
 *     **without** the commit, `write(['tabs'], …)` inside a pass opened at `['tabs']` was refused *"a constraint attempt
 *     is already open at tabs; it is disposed of by its own K-3 and by no other act"*; **with** it, the same write
 *     answered `{op: {opId: 'op-2', seq: 2}}` and the pass re-ran green. **So the hold is not a ban on the address — it
 *     is a ban on a SECOND `K-2` there**, and naming the commit is how a repair avoids opening one.
 *
 *  A repair must also RETURN the op its write landed — `{ok: true, op: receipt.op}` — because the kernel credits a repair
 *  only through `landedOp`, and a `void` return carries "no op" (`ST-F2`, `strata/records/store-tabs-record-unit.md` §1).
 *  Together: **every repair writes one whole record, joined, and returns its op — and NEITHER ACT WRITES A COMPOSED
 *  VALUE** (rev 15, `D-158`): `commit`'s product from this function is the CREATION expectation and `remove`'s the
 *  delete-only one, and both are values that are COMPARED by `standsAsIntended` and never stored (§3, §8).
 *
 *  **AND THE VALUE IT COMPOSES CARRIES NO `landing` SEAT, WHICH IS THE WHOLE OF D-76's DERIVATION.** The family it writes is
 *  the `order` array and one member per pair `rowsSeatedUnder` answers — the landing ENTRY among them, keyed by its own id —
 *  so nothing here can overwrite a tab's member with a witness string: measured 2026-11-02, the composer that emitted
 *  `whole['landing']` after the members wrote the construction instant as `{"landing":"landing","order":["landing"],…}`
 *  once the id was `'landing'`, and a `commit({id:'landing',…})` on a healthy record was answered `{status:'committed'}`
 *  while `order` gained a `landing` member the object did not hold (`docs/L2/store-tabs-record/interface.md` §1). The
 *  witness is now DERIVED at read (`landingOf`) and never written, so an entry id and a seat name are no longer one
 *  namespace.
 *
 *  **AND ITS `order` IS THE MEMBERSHIP ITSELF NOW** (`D-156`): the value it composes names exactly the ids it writes a row
 *  for, which is the bijection `order-names-its-tabs` demands — **and it writes a row for exactly the pairs
 *  `rowsSeatedUnder` answers, so the membership is the named relation's and not a loop of this function's own** (`D-160`).
 *  What remains here is the assembly, and it is two expressions rather than nine indivisible lines: the seat **copied**
 *  and placed **first**, then one member per seated pair. **AND BOTH ACTS' USES OF IT ARE EXPECTATIONS, NOT
 *  WRITES** (rev 15, `D-158`): the membership is the seat repair's to keep inside a caller's commit, so no value composed
 *  here has to satisfy §4 by construction — `commit`'s creation expectation and `remove`'s delete-only one are COMPARED
 *  and never stored (§3, §8). */
const composeRecord = (
  order: readonly string[],
  entries: Record<string, TabsRecordRow>,
): Record<string, unknown> => {
  const whole: Record<string, unknown> = { order: [...order] }
  for (const [id, row] of rowsSeatedUnder(order, entries)) whole[id] = row
  return whole
}

/** **THE RECORD'S CANONICAL FORM — ONE SPELLING, SO THE COMPARISON IS ABOUT THE RECORD AND NOT ABOUT HOW IT WAS BUILT.**
 *
 *  Two records that STAND the same are routinely spelled differently, and either difference would make a naive
 *  `JSON.stringify` on the two objects lie about whether a repair ran:
 *
 *  1. **MEMBER ORDER IS NOT PART OF THE RECORD.** The intent is composed here (`order`, then one member per seated id;
 *     each row `id`, `target`, `active`, then its optional members) while the record a READ returns is
 *     rebuilt by the store from its own byte image, members in the image's order. `JSON.stringify` is order-sensitive, so
 *     a raw comparison reports a difference on every clean commit — a FALSE POSITIVE that would make `repaired` say
 *     nothing.
 *  2. **ABSENCE HAS ONE SPELLING.** A row is admitted
 *     field by field, so a record carrying no `error` and one carrying `error: null` name the same absence; both project
 *     to the JSON literal `null` here, and a present empty string stays distinct from it.
 *
 *  So each record is projected onto exactly the shape L1 §1 declares — the `order` array and each seated row in a FIXED
 *  field order — and the two projections are compared as text. **The retired `landing` SEAT is NOT projected**: it is
 *  derived at read and never written (D-76), so a member under those letters is either the landing ENTRY's row — compared
 *  inside `rows` like any other tab — or a legacy string this family does not read, and folding either into the comparison
 *  would report a repair the act did not run. Nothing outside that family can reach this function: `read` and `commit`
 *  both admit the record field by field (`rowOf`). */
const canonicalRecord = (record: Record<string, unknown>): string => {
  const order: string[] = []
  if (Array.isArray(record['order'])) for (const id of record['order']) if (typeof id === 'string') order.push(id)
  const text = (value: unknown): string | null => (typeof value === 'string' ? value : null)
  const rows = order.map((id) => {
    const held = record[id]
    const row: Record<string, unknown> = plain(held) ? held : {}
    return [id, text(row['id']), text(row['target']), row['active'] === true, text(row['label']), text(row['error']), text(row['lastActiveAt'])]
  })
  return JSON.stringify({ order, rows })
}

/** **WHETHER A REPAIR RAN IS A FACT OF THE STORE, SO IT IS READ BACK AND NOT PREDICTED.** The engine's repairs write
 *  inside the commit this module opened (`design.md` §4), and the write's own record carries no member saying one did
 *  (`guide §6.4`): so the ONE honest derivation is to hold the record this act EXPECTED THE REPAIRS TO LEAVE, **DO NOT
 *  WRITE IT**, and compare it with the record that STANDS afterwards. **THE EXPECTATION IS COMPOSED IN MEMORY AND NEVER
 *  WRITTEN AT EITHER CALL SITE** (`D-156`, `D-157`, `D-158`): `remove` is ONE `delete` and writes no value, `commit`
 *  writes ONE ROW and no record, so neither act has a written value of its own for this comparison — the record that
 *  stands is the two repairs', and the expectation is what this module meant those repairs to leave standing. **A
 *  difference means a repair changed the OUTCOME** — the answer then carries `repaired: true` and the renderer re-reads,
 *  rendering what the store says rather than what this module thought (L2 §3).
 *
 *  **An unreadable standing record answers DIFFERING, not equal**: the claim `repaired` would suppress is "the record that
 *  stands is the one I intended", and a read that refuses has established no such thing. That is the one arm this
 *  derivation cannot see, and it errs toward the renderer re-reading, which is what the member asks for anyway. */
const standsAsIntended = (store: Store, intended: Record<string, unknown>): boolean => {
  try {
    const held = store.read(TABS_RECORD_ADDRESS, TABS_RECORD_TIER) as unknown
    return plain(held) && canonicalRecord(held) === canonicalRecord(intended)
  } catch {
    return false
  }
}

/** **A REPAIR'S ANSWER, IN THE ONLY SHAPE THE KERNEL CREDITS ON THE RECORD THIS MODULE WRITES** (`landedOp`: a non-empty
 *  `opId` absent from the attempt's own ops, whose `seq` stands strictly above the op the repair was invoked for).
 *  **RETURNING `void` USED TO FAIL `KC-4` WITH *"the repair … produced no op"*, naming the CALLER's address — the defect
 *  `ST-F2` files upstream — AND AT THE INSTALLED `1.9.0` IT NO LONGER DOES**: measured 2026-11-02 on both trees, a repair
 *  whose write corrects the record and which returns `undefined` is REFUSED by `1.7.0` with exactly that sentence and is
 *  CREDITED by `1.9.0`, which credits a repair by the legs its own write wrote. **SO THE RULE IS THIS MODULE'S NOW AND NOT
 *  THE PACKAGE'S** (`D-72`): `TabsRepairAnswer` is what makes a `void` return a COMPILE ERROR here, and this function is the
 *  one home of the credited arm — the store would accept the sloppier answer, and this tree does not write it.
 *
 *  **AND THIS IS THE ONE CONSTRUCTOR OF `TabsRepairCredited` IN THIS MODULE** (`D-72`): every credited arm in this file is
 *  some call of this function's answer, so the explicit return has ONE HOME and no repair spells the shape itself — which is
 *  also why the two routes at `mintRecord` cannot drift apart in what they answer. */
const repairAnswer = (receipt: unknown): TabsRepairCredited => ({
  ok: true,
  op: plain(receipt) ? receipt['op'] : null,
})

/** What a repair needs to know about how the record got here: the entries the caller detached, the entry it wrote, and
 *  the order it stood in before. The renderer's `TABS_CONSTRAINT` derived all three from a pre/post pair; the engine
 *  hands a body the landing op only, so this module keeps the pre side itself (`lastView`). */
interface HealHints {
  readonly removals: readonly string[]
  readonly written: string | null
  readonly removed: string | null
  readonly preOrder: readonly string[]
}

/** **ONE HEALING BODY, CALLED BY EVERY REPAIR — AND THAT IS THE CONVERGENCE RULE, NOT A SHORTCUT.** A repair runs during
 *  the pass and the re-run reads what it left, so a repair that corrected only ITS OWN field would hand the re-run a
 *  record that still violates the others: measured on 2026-10-30, `tab-has-title`'s repair write was itself refused
 *  `ConstraintPassRefused` because the next check found no stamp, and each repair nested another until the restart
 *  budget was spent. **The GATE stays one pair per invariant** — a violation is a fact about one field and the
 *  refusal's sentence must name it, which is why there are six declarations and not one — **while the `'family'` REPAIR
 *  leaves one record that satisfies all six**, so the field pairs' extra pass is one and it passes — `mintRecord`'s
 *  included, which lands the landing row with all three field defaults already filled.
 *
 *  **AND NO LONGER EVERY REPAIR LEAVES A RECORD THAT SATISFIES ALL SIX** (`D-156`): the SEAT repair passes `'seat'` and
 *  deliberately leaves the `active` flags as they stand, so the record it lands may still carry no active row or two —
 *  that is `exactly-one-active`'s fault, and the engine asks it on the record the seat repair left. Measured on the
 *  installed `1.10.0`: a delete whose two faults both stand is asked seat, seat, active — THREE asks and two restarts,
 *  not "at most one extra pass" — and the two repairs' ownership is exactly what makes that sequence deterministic
 *  (`healedFamily`'s `scope`, and the batch's contract order).
 *
 *  It reads the record at the moment it is invoked (`§7.6`: a body reads the location it judges), never the state
 *  this body judged — an earlier repair in the same pass may already have written.
 *
 *  **AND ITS WRITE NAMES THE COMMIT IT WAS HANDED** (`D-73`): this is a LANDING-instant repair, so its one write goes through
 *  `writeJoined`, whose `commit` position is required — the fourth position at the store, `pending` named, joining the
 *  attempt rather than opening a second one (`KC-7`; `D-67`). **A repair handed a record the class test refuses writes
 *  NOTHING and says so in the failed arm** (`isCommitCarrier`), because a write naming no commit is not written here: it would
 *  open a second attempt and be refused or misjudged, which the package declares unsupported and this project treats as
 *  unwritten. That arm is unreachable through the engine — the kernel hands its own six-member record, `pending` among them —
 *  and it exists so the module never falls back to a write that names nothing. */
/** **THE CORRECTED FAMILY, COMPOSED ONCE FROM A VIEW — the ONE home of the convergence rule, and `D-83` is why it is a
 *  function of a VIEW rather than of the store.** Every repair this module runs leaves one record of ONE SHAPE: the
 *  `order` seat and one member per surviving id, all three field defaults filled, never empty. The landing-instant
 *  repairs reach it through `viewOf` (they hold the store), the seat repair through `seatViewFrom` (it holds the record
 *  by its own keys, §4) and the creation-instant one through `viewFrom` (it holds only the record it was handed), and **a
 *  repair that composed its own version would be a second answer to "what is a corrected record"** — the failure mode
 *  `healRecord`'s docblock measured on 2026-10-30.
 *
 *  **`order` IS THE RECORD'S IDS, ONCE EACH** (`D-83`, measured): a seat repeated in `order` names ONE held row twice, so
 *  `exactly-one-active` counted two actives over one id and its repair could not fix it — the record was stuck and every
 *  later act was REFUSED `ConstraintPassRefused`, *"the pair tabs#exactly-one-active violated a re-run and its repair had
 *  already been applied"*. A sequence is a set here, so the survivor list is deduped before anything judges it.
 *
 *  **AND THE REQUIRED `scope` IS WHICH FAULT THIS HEAL IS REPAIRING — `'seat'` OR `'family'`** (`D-156`, §4 and §7). One
 *  fault is the SEAT disagreeing with the rows and one is the ACTIVE COUNT, and they have two owners: a `'seat'` heal
 *  resolves the membership, keeps every `active` flag EXACTLY as the record stands and never chooses a survivor (it mints
 *  the landing floor where no row survives, which is the one row it CREATES), while a `'family'` heal does all of that
 *  AND applies §7's successor precedence from the hints. **BOTH SCOPES COMPUTE THE SAME `order` AND THE SAME `rows` FROM
 *  THE SAME RECORD AND DIFFER ONLY IN WHETHER THE ACTIVE ARM RUNS**, so `family` absorbs `seat` — `seat(family(x))` and
 *  `family(seat(x))` are both `family(x)`, because `seat` never touches `lastView`, the one store of the pre-delete order
 *  that supplies arm (ii). **THE SCOPE IS REQUIRED ON PURPOSE**: every call site states which fault it is repairing, so a
 *  second owner of activeness cannot be introduced by an omission, and the alternative is measured — a full-heal seat
 *  repair resolves arm (iii) instead of arm (ii) and, because its write leaves exactly one active, `exactly-one-active` is
 *  never asked again, so removing the active tab would silently re-seat the seat's own first row. */
const healedFamily = (
  view: RecordView,
  hints: HealHints,
  stamp: string,
  scope: 'seat' | 'family',
): { order: string[]; rows: Record<string, TabsRecordRow> } => {
  // AN ID IS A SURVIVOR ONLY IF THE RECORD STILL HOLDS IT, AND ONLY ONCE: a seat left in `order` with no member under it
  // is a removal made in the wrong order, and a seat repeated is one row counted twice — keeping either would hand the
  // re-run the same broken seat.
  const order = view.order.filter(
    (id, at) => !hints.removals.includes(id) && view.entries[id] !== undefined && view.order.indexOf(id) === at,
  )
  const rows: Record<string, TabsRecordRow> = {}
  for (const id of order) {
    const row = view.entries[id]
    if (row === undefined) continue
    // A RECORD'S ROW IS READONLY TO EVERY CALLER, and the repair is the one body that must write into a copy of it, so
    // the mutable view is spelled here rather than by loosening the shared type.
    const healed: { -readonly [K in keyof TabsRecordRow]: TabsRecordRow[K] } = { ...row }
    // THE THREE FIELD DEFAULTS, EACH THE ONE ITS OWN PAIR DECLARES: a title, the data object a tab contains, and the
    // activation stamp. Filled here so a record healed for ANY reason leaves all three satisfied.
    if (blank(healed.label)) healed.label = TAB_TITLE_REPAIR
    if (blank(healed.target)) healed.target = TAB_CONTENT_FALLBACK
    if (blank(healed.lastActiveAt)) healed.lastActiveAt = stamp
    rows[id] = healed
  }
  if (order.length === 0) {
    // AN EMPTY SEQUENCE NEVER SURVIVES: the landing ENTRY is the one tab the app always has, so it takes the seat. **THE
    // SEAT IS A MEMBER KEYED BY AN ORDINARY ID NOW** (D-76), so this branch is exactly what the renderer's `'reserved-name'`
    // guard answers with its other machinery: a removal that empties the sequence is repaired by re-minting the entry.
    // **IT IS THE ONE ROW EITHER SCOPE CREATES, AND NEITHER SCOPE CHOOSES IT** (D-156): it is the floor, and it is active
    // because a record with no tab at all has no other row that could be.
    order.push(TABS_LANDING_ID)
    rows[TABS_LANDING_ID] = landingRow(stamp)
  } else if (scope === 'family') {
    // **THE ACTIVE ARM IS THE `'family'` SCOPE'S ALONE** (D-156): `'seat'` has already done everything above it — the
    // membership, the three defaults and the floor — and PRESERVES every `active` flag as it stands, because which row
    // reads active is `exactly-one-active`'s fact and never the seat repair's. A seat heal that also normalised would
    // resolve §7's arm (iii) and leave one active, so the activeness pair would never be asked and the removal would
    // re-seat the seat's first survivor instead of the removed entry's pre-position (§7's measured alternative).
    const standing = order.filter((id) => readActive(rows[id]))
    if (standing.length === 0) {
      // THE REFERENT: the caller's own written entry if it survives, else the removed entry's pre-position folded onto
      // the survivors, else the first survivor.
      let index = 0
      if (hints.written !== null && order.includes(hints.written)) index = order.indexOf(hints.written)
      else if (hints.removed !== null && hints.preOrder.includes(hints.removed)) index = hints.preOrder.indexOf(hints.removed)
      index = ((index % order.length) + order.length) % order.length
      const survivor = order[index]
      const row = survivor === undefined ? undefined : rows[survivor]
      if (row !== undefined) rows[survivor as string] = { ...row, active: true }
    } else if (standing.length > 1) {
      // KEEP ONE BY THE SAME PRECEDENCE; the rest are deactivated IN THE SAME OBJECT, so the re-run reads one corrected
      // record rather than an intermediate state.
      let keep: string = standing[0] as string
      if (hints.written !== null && standing.includes(hints.written)) keep = hints.written
      else if (hints.removed !== null && hints.preOrder.includes(hints.removed)) {
        const rest = standing.filter((id) => id !== hints.removed)
        if (rest.length > 0) {
          const at = hints.preOrder.indexOf(hints.removed)
          keep = rest[((at % rest.length) + rest.length) % rest.length] as string
        }
      }
      for (const id of standing) {
        const row = rows[id]
        if (row === undefined || id === keep) continue
        rows[id] = { ...row, active: false }
      }
    }
  }
  return { order, rows }
}

/** **THE MODULE'S ONE WRITE OF A WHOLE RECORD FROM A REPAIR, AT EITHER INSTANT — AND THE BRANCH IS THE RECORD'S OWN
 *  `write` MEMBER, NEVER THE INSTANT'S NAME** (`D-69`'s two arities, `D-73`'s one required carrier; `D-83` is why it is
 *  now a shared helper rather than `mintRecord`'s body). A registration-instant record carries a `write` FUNCTION and the
 *  store's own three positions, and a fourth position there is a `TypeError` thrown before any store act; a landing-instant
 *  record is the six-member one and its commit MUST be named at `write`'s fourth, which is what `writeJoined` requires.
 *  **Both arms answer through `repairAnswer`** — the credited arm's one home (`D-72`) — and **the failed arm is stated
 *  rather than fallen into**: a repair that reached no route and holds no store says so, and one handed no carrier does
 *  not write a second attempt's record. */
const writeWholeRecord =
  (getStore: () => Store | null) =>
  (context: unknown, whole: Record<string, unknown>): TabsRepairAnswer => {
    const route = plain(context) ? context['write'] : undefined
    if (typeof route === 'function') {
      const routeWrite = route as (address: readonly string[], tier: string, value: unknown) => unknown
      // THREE POSITIONS, AND NO FOURTH: supplying the commit here is the refusal this branch exists to avoid.
      return repairAnswer(routeWrite(TABS_RECORD_ADDRESS, TABS_RECORD_TIER, whole))
    }
    const store = getStore()
    if (store === null) {
      // NEITHER ROUTE: no store to write through and no route on the record, so the record cannot be made to stand and
      // the repair says so in the failed arm's own two members rather than answering `void`, which carries "no op".
      return { ok: false, message: 'the tab record does not stand, and this repair reached no write route' }
    }
    if (!isCommitCarrier(context)) {
      // A LANDING record that names no commit is not written here (`D-73`): the failed arm, never a second attempt's write.
      return { ok: false, message: 'the record does not stand, and this repair was handed no commit to create it in' }
    }
    return repairAnswer(writeJoined(store, context, whole))
  }

const healRecord = (store: Store, hints: HealHints) => (context: unknown): TabsRepairAnswer => {
  // **`'family'` IS THIS REPAIR'S SCOPE, AND IT IS THE ONLY BODY THAT PASSES IT** (D-156): this is the pair that owns
  // ACTiveness, so its heal applies §7's successor precedence beside the membership the seat repair shares with it.
  const { order, rows } = healedFamily(viewOf(store), hints, new Date().toISOString(), 'family')
  // **ONE WRITE OF ONE CORRECTED OBJECT, JOINED TO THE ATTEMPT** — the whole point: the re-run reads this, so the pass
  // converges on the next evaluation instead of re-violating. **AND NO WITNESS RIDES IN IT ANY MORE**: the landing member is
  // derived at read (D-76), so this repair writes the corrected family — `order` and one member per surviving id — and the
  // one active row among them IS the landing the next read answers.
  // NOTHING IS SWALLOWED HERE: a repair whose write fails must SAY so, because a swallowed refusal reads as a violation
  // of the invariant the caller broke rather than as the repair's own failure. **THE CARRIER IS WHAT MAKES THIS WRITE JOIN
  // THE ATTEMPT** instead of opening a second `K-2` at the address that already holds one (`surface.md §2.11` clause 6), the
  // op it lands is what the kernel credits — see `repairAnswer` — and **A REPAIR HANDED NO CARRIER WRITES NOTHING** (`D-73`):
  // the arm below is the failed one, not a write that names no commit.
  if (!isCommitCarrier(context)) {
    return {
      ok: false,
      message: 'the repair was handed no commit at its own position, so the record it corrects is not written here',
    }
  }
  return repairAnswer(writeJoined(store, context, composeRecord(order, rows)))
}

/** The hints a FIELD repair can honestly state: it knows nothing of a referent, so it derives the removals from the
 *  record it can see and lets the active normalisation follow them. */
const liveHints = (store: Store): HealHints => {
  const view = viewOf(store)
  const pre = lastView ?? view
  const dropped = Object.keys(pre.entries).filter((id) => view.entries[id] === undefined)
  const membershipDropped = pre.order.filter((id) => !view.order.includes(id))
  const removals = [...dropped, ...membershipDropped.filter((id) => !dropped.includes(id))]
  return { removals, written: null, removed: removals[0] ?? null, preOrder: pre.order }
}

const exactlyOneActive = (store: Store) => (): TabsConstraintAnswer => {
  const post = viewOf(store)
  const pre = lastView ?? post
  lastView = post
  // (a) THE RECORD-LEVEL REMOVAL: an id the PRE view carried whose entry the post-state no longer holds is one whose
  //     key was detached, while an entry carried with `active: false` was merely DEACTIVATED — the renderer's H-1/H-3
  //     distinction, and treating deactivation as removal was a measured defect there.
  const dropped = Object.keys(pre.entries).filter((id) => post.entries[id] === undefined)
  const membershipDropped = pre.order.filter((id) => !post.order.includes(id))
  const removals = [...dropped, ...membershipDropped.filter((id) => !dropped.includes(id))]
  // (b) THE CALLER'S OWN WRITTEN REFERENT: the active entry whose VALUE moved pre→post, or one the pre view did not
  //     carry at all (a first write mints the key) — the renderer's H-2 derivation, uniform across both arms because
  //     it reads the record and never the written value's shape. The comparison is STRUCTURAL: every view hands out
  //     freshly built rows, so identity never matches and an `Object.is` test would always name the last active entry.
  let written: string | null = null
  for (const id of Object.keys(post.entries)) {
    const row = post.entries[id]
    if (row === undefined || !readActive(row)) continue
    const before = pre.entries[id]
    if (before === undefined || JSON.stringify(before) !== JSON.stringify(row)) written = id
  }
  // A SURVIVOR IS AN ID THE POST STATE BOTH SEATS AND HOLDS: an id left in `order` with no record under it is a removal
  // the caller made in the wrong order, and counting it as a survivor would let a dangling seat pass the gate.
  const survivors = post.order.filter((id) => post.entries[id] !== undefined && !removals.includes(id))
  const activeIds = survivors.filter((id) => readActive(post.entries[id]))
  if (survivors.length > 0 && activeIds.length === 1) return true
  const removed = removals.find((id) => !post.order.includes(id)) ?? removals[0] ?? null

  return {
    message:
      survivors.length === 0
        ? 'the tab record holds no tab at all'
        : activeIds.length === 0
          ? 'the tab record carries no active tab'
          : 'the tab record carries more than one active tab',
    repair: healRecord(store, { removals, written, removed, preOrder: pre.order }),
  }
}

/** **THE THREE FIELD CONSTRAINTS** (D-65's batched declarations; `guide §7.2` route one). Each is a body the module
 *  writes and the engine evaluates, each reads the record (`§7.6`), and each answers `true` or `{ message, repair }`
 *  where `repair` is the function the kernel invokes inside the attempt's own commit.
 *
 *  They are three pairs rather than one because a violation is a fact about ONE field: the refusal's sentence is how a
 *  caller learns which default was applied, and a body that tested all three could not say. The repairs still leave one
 *  record that satisfies all six — see `healRecord`. */

/** The entries of the record as it stands: every id in `order` the record holds a member for. Read through `viewOf`,
 *  which reads the ONE object at `TABS_RECORD_ADDRESS` — the object a body must judge (`§7.6`: a body reads the
 *  location it cares about rather than trusting whatever the terminal op happened to hand it). */
const entriesOf = (store: Store): { id: string; row: Record<string, unknown> }[] => {
  const view = viewOf(store)
  const out: { id: string; row: Record<string, unknown> }[] = []
  for (const id of view.order) {
    const row = view.entries[id]
    if (row !== undefined) out.push({ id, row: row as unknown as Record<string, unknown> })
  }
  return out
}

/** **THE LANDING WITNESS, DERIVED — AND `read()`'s `landing` MEMBER IS THIS DERIVATION AND NOT A STORED POINTER** (D-76).
 *
 *  The family's second singleton seat used to hold a STRING at `['tabs','landing']`: the id of the tab whose page is the
 *  terminal. **That member and a tab's own member are one namespace**, so the seat was unrepresentable beside an entry that
 *  spelled it (D-75's measurement, quoted at `composeRecord`), and it is retired: the arm below reads the landing ENTRY's
 *  own leaf — a ROW — and everything else is the record's own answer.
 *
 *  1. **The row the record seats at `['tabs','landing']`, when it is the ACTIVE one.** That member is the landing ENTRY's
 *     record once the entry's id is `LANDING_ENTRY_KEY` (`TABS_LANDING_ID`), which is why this arm and the one below
 *     coincide from that point: the landing entry is the landing exactly when it is the row reading active. The ACTIVE test
 *     is what keeps the two readings one — a seated-but-inactive landing row is a tab that is not being shown, and a
 *     derivation that answered it would name a landing the record does not show. **Before the id moves this arm cannot fire
 *     at all**: nothing is seated at that key, and a legacy install's string there is not a row, so it answers nothing
 *     rather than naming a tab.
 *  2. **Else the record's own active entry** — `order`'s first id whose row reads `active: true`. `exactly-one-active` is
 *     the pair that makes this total: on a legal record exactly one row reads active, and a record with none is the state
 *     that pair repairs by seating the landing entry again (`healRecord`'s empty branch).
 *
 *  `null` is the honest answer for a record no legal act has left yet — an empty `order`, or a record written by a caller
 *  that bypassed every pair — and `read()` spells it `''` rather than inventing an id. */
const landingOf = (store: Store): string | null => {
  const view = viewOf(store)
  const seated = view.entries[LANDING_ENTRY_KEY]
  if (seated !== undefined && readActive(seated)) return LANDING_ENTRY_KEY
  return view.order.find((id) => readActive(view.entries[id])) ?? null
}

/** **`tab-has-title`** — a tab with no title, or an empty one, is repaired to `'untitled'`. */
const tabHasTitle = (store: Store) => (): TabsConstraintAnswer => {
  if (!entriesOf(store).some(({ row }) => blank(row['label']))) return true
  return {
    message: 'a tab carries no title',
    repair: healRecord(store, liveHints(store)),
  }
}

/** **`tab-has-content`** — a tab that contains no data object is pointed at the landing page. */
const tabHasContent = (store: Store) => (): TabsConstraintAnswer => {
  if (!entriesOf(store).some(({ row }) => blank(row['target']))) return true
  return {
    message: 'a tab contains no data object',
    repair: healRecord(store, liveHints(store)),
  }
}

/** **`tab-has-lastActiveAt`** — a tab with no activation stamp is stamped with NOW. The stamp is written as an ISO
 *  string so the record's byte image stays JSON-plain and a reader needs no clock of its own to interpret it. */
const tabHasLastActiveAt = (store: Store) => (): TabsConstraintAnswer => {
  if (!entriesOf(store).some(({ row }) => blank(row['lastActiveAt']))) return true
  return {
    message: 'a tab carries no last-active stamp',
    repair: healRecord(store, liveHints(store)),
  }
}

/** **THE ONE WRITE THAT CREATES THE ROOT, AND THE TWO ROUTES IT MAY TAKE — BECAUSE A REPAIR'S RECORD IS NOT THE SAME
 *  SHAPE AT THE TWO INSTANTS A PAIR IS ASKED.**
 *
 *  - **AT A REGISTRATION INSTANT** — construction, a boot over an existing `filePath`, `addConstraint`, a re-arm — the
 *    record carries a `write` MEMBER and nothing else does (`guide §7.2`'s dated clause of 2026-11-02, item (4); the
 *    carrier is `kernel-registration.mjs`'s `registrationRepairContext`, whose own comment says the member exists *"at
 *    this instant and at no other"*). **THAT ROUTE TAKES THE STORE'S OWN THREE POSITIONS AND NO FOURTH** —
 *    `write(address, tier, value)`: the commit is the registration's own and cannot be named, and a call supplying a
 *    fourth position is a `TypeError` thrown **before any store act**, so naming the commit here would refuse the
 *    registration rather than make the record stand.
 *  - **AT A LANDING INSTANT** the record is the six-member `{address, id, op, tier, value, pending}` and carries no
 *    `write`, and **the commit it is part of MUST be named**: passing that record at `write`'s fourth position on the
 *    store this module holds is what makes the write JOIN the attempt instead of opening a second `K-2` at the address
 *    that already holds one (`D-67`; `healRecord`'s call at the bottom of that function does the same with the same
 *    reason). The two rules are not two spellings of one — they are two instants' own contracts, and a single call shape
 *    cannot satisfy both.
 *
 *  **THE BRANCH IS THE RECORD'S OWN `write` MEMBER, NEVER THE INSTANT'S NAME**: a repair runs with no handle of its own
 *  at the first instant (the boot has not bound one yet) and with this module's store at the second, so the record it is
 *  handed is the only thing that can say which route is lawful. **Both arms answer through `repairAnswer`** — the kernel
 *  credits a repair only through `landedOp`, whatever route landed the op (`ST-F2`).
 *
 *  **THE WRITE RUNS NO PASS OF ITS OWN**: the pair is judged by the registration's own RE-RUN over the op this returns,
 *  so the body above is asked twice — once absent, once over the created record, where `value` is that record and the
 *  answer is `true`. That is why the created value must be one the body itself admits — and why `landingRow` is the value
 *  written rather than a bare root: the other four pairs read the same re-run, and it satisfies them too.
 *
 *  **BOTH ARMS NAME A COMMIT, AND EACH NAMES IT THE WAY ITS INSTANT'S CONTRACT ALLOWS** (`D-73`): the registration arm hands
 *  its three positions to the ROUTE the record carries — never to `store.write`, and never a fourth position, which that
 *  route answers with a `TypeError` before any store act — while the landing arm goes through `writeJoined`, whose carrier
 *  position is required, so the commit it was handed is named at `write`'s fourth. **THE ROUTES CANNOT DRIFT**: their handles
 *  are different KINDS (a three-position function the record lent us, and the store itself), so the helper is not applicable
 *  to the route and the route is not applicable to the store — the arity each takes is fixed by the shape it is spelled on.
 *  **A landing record the class test refuses writes nothing** and answers the failed arm, exactly as `healRecord` does. */
const mintRecord = (getStore: () => Store | null) => (context: unknown): TabsRepairAnswer =>
  writeWholeRecord(getStore)(context, composeRecord([TABS_LANDING_ID], { [TABS_LANDING_ID]: landingRow(new Date().toISOString()) }))

/** **`tabs-must-stand` — THE RECORD ROOT IS AN ENFORCED INVARIANT, NOT A SIDE EFFECT OF THE FIRST COMMIT** (D-69).
 *
 *  Until this pair stood, `['tabs']` was minted only by the first whole-record write, so between the boot and that write
 *  the address held NOTHING and `read()` answered an empty record with no `landing` seat — a state indistinguishable
 *  from one a caller had emptied. The pair makes the root the ENGINE's to demand and its repair the one act that creates
 *  it, so the record stands from the instant the instance is constructed.
 *
 *  **IT JUDGES `context.value` AND NEVER REACHES FOR THE INSTANCE — the only body in this batch that cannot go through
 *  the `body` wrapper below.** At the CONSTRUCTION instant the store handle is genuinely unassigned (`src/main/main.ts`
 *  binds its holder only after `createProfileStore` returns), so the wrapper's `getStore() === null` arm answers `true`
 *  and this pair would never be asked; the engine asks it all the same, with **the current value read at the address**:
 *  a registration's five-member `AttemptContext` carries `value: readCurrent(store, address)`, which is `undefined` where
 *  that read refuses. **Absence therefore needs no handle** — and the handle is only wanted by the REPAIR, which runs at
 *  an instant where one exists.
 *
 *  **ABSENCE IS THE WHOLE ARM, AND THAT IS MEASURED, NOT CHOSEN** (`guide §7.2`'s dated clause of 2026-11-02, item (3)):
 *  the pair is CARRIED and applied at every instant its PARENT resolves, and `['tabs']`'s parent is the empty address —
 *  the register, which always resolves — so the pair is asked over an empty store at construction, which is the one arm
 *  a repair can rescue (a pair under an ABSENT parent is never asked at all). A record that STANDS but holds no tab is a
 *  different arm and stays the other pairs': `exactly-one-active` answers *"the tab record holds no tab at all"* and its
 *  repair mints the same `landingRow`.
 *
 *  **AND ABSENCE IS REFUSED AT THE RECORD'S ROOT ONLY, JUDGED AT THE ACT'S OWN ADDRESS** (`D-156`'s fifth hunk, measured
 *  2026-11-09 on the installed `1.10.0`): the pair stands at `['tabs']`, so it is asked for every act AT OR UNDER that
 *  address and is handed the ACT'S value — and a descendant `delete(['tabs','tab-1'])` hands it `value: undefined`,
 *  because the leaf is gone and the act's value is the leaf's. **An unconditional absence arm therefore MINTS THE
 *  LANDING FLOOR OVER A RECORD HOLDING OTHER TABS**: measured, one delete of one tab erased the sibling row and
 *  re-stamped the floor, and the removal this module now performs is exactly that act (§3). So a deeper address is not
 *  this pair's to judge at all: it answers `true`, and the record's existence is the ROOT act's business. */
const tabsMustStand = (getStore: () => Store | null) => (context: unknown): TabsConstraintAnswer => {
  const address = plain(context) ? context['address'] : undefined
  // A DESCENDANT ACT'S ABSENCE IS THE LEAF'S AND NEVER THE RECORD'S (D-156): only the root is judged here.
  if (deeperThanRecord(address)) return true
  if (plain(context) && context['value'] !== undefined) return true
  return {
    message: 'the tab record does not stand',
    repair: mintRecord(getStore),
  }
}

/** **`order-names-its-tabs` — THE `order` SEAT IS TESTED AT THE INSTANT THE RECORD ARRIVES, AND ITS REPAIR WRITES THE
 *  CORRECTED ORDER (`D-83`).** The five pairs beside it gate a record's EXISTENCE, its active count and its three fields, and
 *  not one of them judges the seat every other judgement is seated from: `viewOf` takes the family from `order`, so an
 *  `order` that names nothing the record holds is read as a record with no tabs, one that repeats a seat is read as two
 *  active tabs over one row, and one that is not a sequence at all falls through to the split-seat fallback and answers
 *  the empty view. **Measured 2026-11-02 on this head, one fresh instance per arm, over a profile written before the
 *  batch was constructed** — `read()` after the construction instant answered, for each: `order: []` with `rows: []` over
 *  a record holding `tab-1` and no `order`; the same over `order: 'x'`; the same over `order: []`; `order: ['landing']`
 *  with `rows: []` over the LEGACY STRING SEAT `{order: ['landing'], landing: 'landing'}`; `order: ['landing', 'ghost']`
 *  with ONE row, a read naming a tab the record did not hold; and `order: ['landing', 'landing']` with the SAME ROW
 *  COUNTED TWICE — the last of which no legal act could then recover from, a later `commit` being REFUSED
 *  `ConstraintPassRefused` with *"the pair tabs#exactly-one-active violated a re-run and its repair had already been
 *  applied"*, because both seats named the one held row and the repair had nothing to choose between.
 *
 *  **IT IS TESTED ON STORE CREATION, WHICH IS WHY IT IS NOT WRAPPED BY `body`.** The wrapper's `getStore() === null` arm
 *  answers `true`, and at the construction instant the boot has bound no handle yet (`src/main/main.ts` binds its holder
 *  only after `createProfileStore` returns) — so every wrapped body abstains there and a seat that arrives BROKEN FROM
 *  THE FILE stands until some later write happens to repair it, or forever. **The judgement therefore needs no handle**:
 *  a registration's context carries `value: readCurrent(store, address)`, and at this pair's address that is the record
 *  itself (measured: the same five-member context a write hands, `tier: null` where the write's carries `'file'`). **The
 *  handle is wanted by the REPAIR only** — and the repair is handed the record at that same instant, so it takes its view
 *  from the value it was given there, and from the STORE at a landing instant, where the value is the ACT'S and may be a
 *  row or an absence (`repairOrderSeat`, §4).
 *
 *  **THE ARM IS THE SEAT, AND IT IS SIX CLAUSES, EACH A FAULT A CALLER CAN NAME — the last of them the direction no body
 *  ever tested** (`D-156`, `design.md` §4): the seat is absent or not an array; it is empty; a member is not a non-empty
 *  string; a member repeats one already named; a member is one the record holds no ROW under; **or an own key of the
 *  record other than `order` is one the seat does not name, whatever it holds**. The first five test `order ⊆ rows` and
 *  the sixth tests `order ⊇ rows`, so together they are `order ≡ rows` — a BIJECTION — and a dangling id, an unseated row
 *  and a stray key (a legacy `landing` string, a scalar) are ONE fault with one sentence and one repair. **That widening
 *  IS a contract change and is stated as one**: no id, `reason`, address, tier or route moves, but a record that passes at
 *  this head refuses at the next write. **A record that does not stand is NOT this pair's arm** — that is
 *  `tabs-must-stand`'s sentence, and a body answering `true` over an absent value is what keeps two pairs from both
 *  minting the root on one instant. */
const ORDER_NAMES_ITS_TABS_ID = 'order-names-its-tabs'
/** **THE SIXTH SENTENCE, IN THE REGISTER OF THE OTHER FIVE, AND RE-GRAINED TO THE BIJECTION** (L2 §3, `D-156`): it names
 *  the SEAT and the fault — a sequence of EXACTLY the record's own tabs, once each — rather than the generic "the record
 *  is malformed", so a caller holding it knows the tab SET is what to look at and not a row's shape (`malformed-row`) or
 *  an id's spelling (`seat-name`). **One sentence for both directions**, because one repair answers both: the word
 *  *exactly* is the whole of the change, and a `'⊆'`-only sentence would describe a record this pair now refuses. */
const ORDER_SEAT_MESSAGE = "the tab record's 'order' seat carries no sequence of exactly its own tabs, once each"

/** The hints a seat repair states: it knows nothing of a referent, a removal or a written entry — its subject is the
 *  MEMBERSHIP itself, so it states none of them. **AND ITS SCOPE IS WHY THAT IS SAFE NOW** (`D-156`): the seat repair
 *  passes `'seat'` to `healedFamily`, so it chooses NO survivor at all and preserves every `active` flag; the successor
 *  is `exactly-one-active`'s and is chosen from ITS hints, on the record this repair leaves. */
const NO_HINTS: HealHints = { removals: [], written: null, removed: null, preOrder: [] }

const orderNamesItsTabs = (getStore: () => Store | null) => (context: unknown): TabsConstraintAnswer => {
  // **THE RECORD JUDGED IS THE ONE THE ACT IS AT** (`D-156`'s second hunk, and §4's address rule): at `['tabs']` — a
  // registration ask, a root write, a hand-driven context — the act HANDS the record; at any deeper address it hands the
  // LEAF (a row on a leaf write, absence on a descendant delete), so the record is read RAW through the handle instead.
  // A view taken from the act's value at a deeper address is the measured wipe: two tab rows erased by one leaf write.
  const address = plain(context) ? context['address'] : undefined
  const held = deeperThanRecord(address) ? rawRecord(getStore()) : plain(context) ? context['value'] : undefined
  // A RECORD THAT DOES NOT STAND IS THE EXISTENCE PAIR'S, NOT THIS ONE'S: answering `true` here keeps two bodies from
  // minting one root inside one instant, and the minted record is judged by the re-run like any other. A deeper address
  // whose raw record cannot be read answers the same way, for the same reason — it has established nothing to refuse.
  if (!plain(held)) return true
  const refuse: TabsConstraintAnswer = { message: ORDER_SEAT_MESSAGE, repair: repairOrderSeat(getStore) }
  const seat = held[ORDER_SEAT_KEY]
  if (!Array.isArray(seat) || seat.length === 0) return refuse
  const named = new Set<string>()
  for (const id of seat) {
    if (typeof id !== 'string' || id.length === 0) return refuse
    if (named.has(id) || !plain(held[id])) return refuse
    named.add(id)
  }
  // THE SIXTH CLAUSE, AND THE DIRECTION NOTHING TESTED BEFORE IT: every own key besides the seat must be one the seat
  // names. A row under an id the seat never names is INVISIBLE to every other pair and every view — `viewFrom` builds its
  // entries from `order` — so it was not merely legal, it was unreadable, and only this clause can see it.
  for (const key of Object.keys(held)) {
    if (key === ORDER_SEAT_KEY) continue
    if (!named.has(key)) return refuse
  }
  return true
}

/** **THE REPAIR WRITES THE CORRECTED FAMILY — never a seat alone — AND IT PARSES THE RECORD BY ITS OWN KEYS, SO IT SEATS
 *  AS WELL AS DROPS** (`D-156`'s third hunk; `design.md` §4).
 *
 *  Measured 2026-11-02, and it is the finding that fixed this pair's ADDRESS: a pair standing at `['tabs','order']` is
 *  handed the SEAT at a registration instant (`['landing','ghost']`, measured), so a repair there can write an `order` and
 *  cannot write the ROWS it names — and `{order: ['landing']}` over a record holding no `landing` row is exactly the state
 *  this pair refuses. **The record is what a legal repair must leave, so the pair stands where the record is** (`['tabs']`,
 *  the address `composeRecord` writes the order into and `viewOf` reads it from), and the repair composes the family
 *  through the one home of the convergence rule.
 *
 *  **THE VIEW IS THE STORE'S AT A LANDING INSTANT AND THE HANDED RECORD'S AT A REGISTRATION ONE, AND THE BRANCH IS THE
 *  RECORD'S OWN `write` MEMBER** (`D-69`'s two arities, `D-83`) — the registration instant's repair record carries a
 *  `write` FUNCTION and a landing instant's carries none, and at the installed `1.10.0` BOTH carry `pending`, so the
 *  class test cannot be the discriminator and the member can. **The value is not usable at a landing instant at all**:
 *  a leaf write hands the ROW and a descendant delete hands ABSENCE, so a repair taking its view from the act's value
 *  would replace the family with one row or mint the floor over every sibling (both measured, `D-156`'s faults (a) and
 *  (b)) — and the landing instant HAS a store, which is the one thing the registration instant does not.
 *
 *  **AND THE VIEW IS `seatViewFrom`'s, NOT `viewFrom`'s**: the seat-seated parse walks `order`, so it could only DROP a
 *  row the seat does not name — and a caller's just-written leaf would vanish while the act answered `committed` over a
 *  tab that is gone. The own-key parse keeps the seat's own ranking where it can and APPENDS every other row the record
 *  holds, which is what makes one repair answer both directions of the bijection (§4).
 *
 *  **THE EMPTY-VIEW FLOOR SURVIVES AT THE REGISTRATION INSTANT, AND THAT IS A MEASUREMENT** (`D-156`): there is no handle
 *  there, and a file whose record is `{order:'x'}` or holds no row at all has no other route back to the floor — a
 *  registration repair answering the failed arm makes `storeCreate` REFUSE, and the app's construction is unconditional.
 *  An unreadable record therefore parses to the empty view at either instant, and `healedFamily`'s own empty branch mints
 *  the landing entry, which is the ONE row that branch creates and no row it chooses.
 *
 *  **AND THE WRITE NAMES ITS COMMIT AT EITHER INSTANT** — `writeWholeRecord` is the one route, three positions at a
 *  registration instant and `writeJoined`'s fourth at a landing one — so this repair is credited exactly as `D-72`/`D-73`
 *  require, and the registration's own RE-RUN judges the record it landed. **ITS SCOPE IS `'seat'`**: it repairs the
 *  MEMBERSHIP and leaves every `active` flag exactly as it stands, so `exactly-one-active` is asked on the record it left
 *  and remains the one owner of which tab is shown (§7). */
const repairOrderSeat = (getStore: () => Store | null) => (context: unknown): TabsRepairAnswer => {
  const registration = typeof (plain(context) ? context['write'] : undefined) === 'function'
  const handed = plain(context) ? context['value'] : undefined
  const whole = registration ? handed : (rawRecord(getStore()) ?? handed)
  const { order, rows } = healedFamily(seatViewFrom(whole), NO_HINTS, new Date().toISOString(), 'seat')
  return writeWholeRecord(getStore)(context, composeRecord(order, rows))
}

/** **THE BATCHED DECLARATIONS, COLLECTED BY BOOT** (D-65's first act). Each element carries the pair and the body; the
 *  boot gathers these from every module that imposes one and constructs the central store **once** with the batch, so a
 *  constraint is a DECLARATION here rather than a constructor call. The getter is how a body reaches the instance it is
 *  registered on — it is armed at construction and only *evaluated* on a write, so the reference is bound by then.
 *
 *  The ids are a namespace the modules share (`guide §7.2`: a repeated id in one supplied list is REJECTED).
 *
 *  **SIX, AND THE ONE THAT IS LISTED FIRST IS NOT THE ONLY ONE THAT ACTS AT THE CREATION INSTANT** (`D-83`): the batch's
 *  order is `tabs-must-stand`, then `order-names-its-tabs`, then the active-count pair, then the three field pairs.
 *  `tabs-must-stand` is registered and not wrapped by `body`, because the wrapper's null-store arm would silence it at the
 *  exact instant it is the only pair that can act (`tabsMustStand`); it stands ahead of the rest because it is the
 *  precondition of their subject — a record that does not exist has no seat to name and no field to judge. **The second is
 *  unwrapped for the same reason and is the precondition of the other four's SUBJECT** (`orderNamesItsTabs`): the family is
 *  read from the `order` seat, so a seat that names no row the record holds is a record with no tabs at all, and a seat
 *  that repeats one is two actives over one row. The pairs below it are silent at the creation instant for a reason of
 *  their own: their bodies read through the same handle and the wrapper is what tells them to abstain.
 *
 *  **AND THE ORDER IS WHAT MAKES THE TWO REPAIRS' OWNERSHIP DETERMINISTIC, RATHER THAN A RACE** (`D-156`, §4): the pass
 *  asks ONE refusal at a time and re-runs from the top (measured: a delete whose two faults both stand is asked seat,
 *  seat, active — three asks, two of them restarts), so the seat pair's repair lands FIRST and `exactly-one-active` is
 *  asked on the record it left. That is the arm (ii) invocation a removal of the active tab needs, and it is why the seat
 *  repair may not choose a survivor: a full heal there would leave one active, the re-run would pass, and the removal
 *  would silently re-seat the seat's own first row instead of the removed entry's pre-position.
 *
 *  **AND THE RETURN OF THIS FUNCTION IS TYPED, WHERE IT USED TO BE `(context: unknown) => unknown`** (`D-72`): the six
 *  bodies answer `TabsConstraintAnswer` and their repairs answer `TabsRepairAnswer` — `true` or `{message, repair}`, and
 *  `{ok: true, op}` or `{ok: false, message}` — so **a body or a repair that returns nothing is a COMPILE ERROR here**,
 *  every element is a `TabsConstraintDeclaration`, and no site needs a cast to say so. That is the point of the types: the
 *  package's own declared return admits far more (and, from `1.9.0`, admits `void` outright), and this module's whole answer
 *  to that is a local type the boot and any later renderer work can annotate against. The wrapper carries the same rule as
 *  the elements: its pass arm is `true` and its other arm is the body's own answer, never a fall-through. */
export function tabsConstraintDeclarations(getStore: () => Store | null): readonly TabsConstraintDeclaration[] {
  const body =
    (evaluate: (store: Store) => () => TabsConstraintAnswer) =>
    (context: unknown): TabsConstraintAnswer => {
      void context
      const store = getStore()
      return store === null ? true : evaluate(store)()
    }
  return [
    { address: TABS_RECORD_ADDRESS, id: TABS_MUST_STAND_ID, constraint: tabsMustStand(getStore) },
    { address: TABS_RECORD_ADDRESS, id: ORDER_NAMES_ITS_TABS_ID, constraint: orderNamesItsTabs(getStore) },
    { address: TABS_RECORD_ADDRESS, id: TABS_CONSTRAINT_ID, constraint: body(exactlyOneActive) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-title', constraint: body(tabHasTitle) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-content', constraint: body(tabHasContent) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-lastActiveAt', constraint: body(tabHasLastActiveAt) },
  ]
}

/** **THE ONE ROOT `tabsConstraintDeclarations` DECLARES, AT THE TIER THIS MODULE WRITES IT** (`D-101`). All six
 *  of that batch's declarations stand at `TABS_RECORD_ADDRESS` and every one of them judges the value of the one
 *  whole record, so the family is ONE root — deduplicated here by construction rather than by six entries.
 *
 *  **ITS CALLER IS THE `data.*` SURFACE**: that surface may not create a version of a declared root at a tier the
 *  declaring module does not use, and it can know which is which only by being told. The telling is this
 *  function's, and both of its members are this module's own constants — `TABS_RECORD_ADDRESS` above and
 *  `TABS_RECORD_TIER`, which every write and read of this file drives. */
export function tabsDeclaredRoots(): readonly { readonly address: readonly string[]; readonly tier: typeof TABS_RECORD_TIER }[] {
  return [{ address: TABS_RECORD_ADDRESS, tier: TABS_RECORD_TIER }]
}

/** **THE RECORD OVER THE CENTRAL INSTANCE** (D-64, D-65): this module constructs nothing and owns no file — it is handed
 *  the app's one store and reads and writes its `['tabs']` addresses through it. The instance's lifetime, its file and
 *  its constraint pass are the boot's. */
export function createTabsRecord(options: TabsRecordOptions): TabsRecord {
  const standing: Store = options.store
  // **NOTHING IS WRITTEN HERE, AND THE ROOT IS NO LONGER THE FIRST COMMIT'S TO MINT** (D-69). This module still writes
  // nothing at construction — but the address is no longer absent when it is handed over: `tabs-must-stand` was asked at
  // the INSTANCE's construction, before this function existed, and its repair created the record with the landing page
  // seated and active. So the observed view starts from what the store already holds on both counts at once: a fresh
  // profile's landing entry and a record carried over from a previous run, which is the PRE side of the first evaluation
  // alike. **NOTHING IN THIS MODULE DEPENDS ON THE OLD EMPTINESS** — `seats()` reads the order seat, `landingOf` DERIVES the
  // witness from the active row (D-76), and neither act composes a value: `commit` writes ONE ROW at the tab's own leaf and
  // the seat repair APPENDS it, `remove` is ONE delete (D-158) — so the one thing that changes is that a first `commit`
  // now APPENDS to a record holding the landing entry instead of creating the root, and `read()` answers a
  // landing-seated record before any commit.
  lastView = viewOf(standing)

  /** The order seat, and the landing witness DERIVED from the rows rather than read off a seat (D-76). */
  const seats = (): { order: string[]; landing: string } => {
    const view = viewOf(standing)
    return { order: [...view.order], landing: landingOf(standing) ?? '' }
  }

  /** The record's rows, admitted field by field — through the one object at `TABS_RECORD_ADDRESS`. */
  const rowsNow = (order: readonly string[]): TabsRecordRow[] => {
    const view = viewOf(standing)
    const out: TabsRecordRow[] = []
    for (const id of order) {
      const value = view.entries[id]
      if (value === undefined) continue
      const row = rowOf({ ...(value as unknown as Record<string, unknown>), id })
      if (row !== null) out.push(row)
    }
    return out
  }

  return {
    read(): TabsRecordReading | TabsRecordAnswer {
      const { order, landing } = seats()
      const rows = rowsNow(order)
      // THE OBSERVED VIEW IS REFRESHED HERE: the constraint's PRE side is the last record this module saw, and a read
      // is the one place a caller's own eyes and this module's memory must agree.
      lastView = { order: [...order], entries: Object.fromEntries(rows.map((row) => [row.id, row])) }
      return { status: 'committed', order, landing, rows }
    },
    commit(input: TabsRecordRow): TabsRecordAnswer {
      const value: unknown = input
      if (!plain(value)) {
        return { status: 'refused', reason: 'malformed-row', message: MALFORMED_ROW_MESSAGE, address: null }
      }
      const row = rowOf(value)
      if (row === null) {
        return { status: 'refused', reason: 'malformed-row', message: MALFORMED_ROW_MESSAGE, address: null }
      }
      // **THE SEAT-NAME ARM, BEFORE ANY STORE ACT** (D-76): an id equal to the record's own `order` seat cannot be held
      // beside it, so it is refused rather than written — measured 2026-11-02, this commit was ANSWERED `committed` and left
      // `order` naming a member the object did not hold, which is the same hole the retired `landing` seat had.
      if (namesASeat(row.id)) {
        return { status: 'refused', reason: SEAT_NAME_REASON, message: SEAT_NAME_MESSAGE, address: ['tabs', row.id] }
      }
      // **THE PRE VIEW, TAKEN ONCE AND USED TWICE** (`D-158`, §7 of `design.md`): it is the base of the creation
      // expectation below AND the observation the next evaluation compares against — and **THE SECOND USE IS
      // LOAD-BEARING, NOT SYMMETRY**. `viewFrom` builds `entries` by WALKING `order`, so an unseated row is invisible to
      // every view taken through the handle; a STALE `lastView` that still carried this id's row (a whole-record write
      // through `data.write` never refreshes the observation) would make `exactly-one-active`'s `before !== undefined`,
      // its `written` referent would fall to `null`, and `healedFamily`'s default (`keep = standing[0]`) would DEACTIVATE
      // the tab the caller just created. Refreshing here is the whole difference between the creation taking the seat and
      // losing it.
      const pre = viewOf(standing)
      lastView = pre
      // **THE CREATION EXPECTATION, COMPOSED AND NEVER WRITTEN** (§8): the pre reading's `order` with the id APPENDED
      // where the seat did not already name it — an id it does name is an UPDATE and moves no seat — and its rows plus
      // this admitted row. **IT NAMES NO POSITION AND NO SUCCESSOR**: the append is the seat repair's, the survivor is
      // §7's precedence, and a second copy of either here would erase the one signal `repaired` carries (D-70).
      const expectation = composeRecord(
        pre.order.includes(row.id) ? pre.order : [...pre.order, row.id],
        { ...pre.entries, [row.id]: row },
      )
      try {
        // **ONE STORE ACT, ONE LEAF, ONE ROW** (`D-158`, §3): the caller's admitted row at the TAB'S OWN LEAF, and no
        // composed record at all. The key it leaves unseated is what `order-names-its-tabs` refuses INSIDE this commit,
        // whose `'seat'` repair APPENDS the id and preserves every `active` flag — so the record that stands afterwards is
        // the two repairs' and never a value this act spelled. **A LEAF WRITE IS LAWFUL HERE BECAUSE THE PARENT IS
        // ENFORCED AND TRUSTED PRESENT** (`tabs-must-stand` mints it at construction, §4): a vanished root therefore
        // reaches the caller as the store's own `AddressNotFound` through the refusal arm below rather than as a silent
        // re-mint, and the `namesASeat` arm above is what keeps this write off the seat's own key.
        standing.write(['tabs', row.id], TABS_RECORD_TIER, row)
        // THE OBSERVED VIEW IS REFRESHED AGAIN, AFTER THE ATTEMPT (both arms, §3): the next evaluation's PRE side is the
        // record that stands, repairs included, so a later act is not compared against a record two acts old.
        lastView = viewOf(standing)
        // THE MEMBER IS OMITTED ON A CLEAN ACT AND NEVER ANSWERED `false`: a repair that ran is the only thing that makes
        // the standing record differ from the creation expectation, so its presence IS the signal (L2 §2, §8).
        return standsAsIntended(standing, expectation)
          ? { status: 'committed' }
          : { status: 'committed', repaired: true }
      } catch (caught) {
        const refused = refusalOfThrown(caught)
        // THE REFUSAL LEAVES THE OBSERVED VIEW WHERE THE STORE LEFT THE RECORD: a refused attempt restores its own state
        // (`guide §5.4`), so this module's memory must be re-read rather than assumed unchanged.
        lastView = viewOf(standing)
        return { status: 'refused', reason: refused.reason, message: refused.message, address: ['tabs', row.id] }
      }
    },
    remove(id: string): TabsRecordAnswer {
      if (typeof id !== 'string' || id.length === 0) {
        return { status: 'refused', reason: 'malformed-row', message: MALFORMED_ROW_MESSAGE, address: null }
      }
      // **THE SAME ARM AT THE OTHER ENTRY POINT, AND FOR THE SAME REASON** (D-76): a removal of the seat's own name is not a
      // removal of a tab — `order` is no member — so it is refused here rather than answered as the store's own success
      // over a name that is not a tab's.
      if (namesASeat(id)) {
        return { status: 'refused', reason: SEAT_NAME_REASON, message: SEAT_NAME_MESSAGE, address: ['tabs', id] }
      }
      // **THE PRE VIEW, TAKEN ONCE AND HANDED TO THE OBSERVATION BEFORE THE STORE IS TOUCHED** (`D-156`, §3): the engine
      // hands a body no pre-write capture, so this module keeps its own — and the record the delete lands AGAINST is the
      // record whose `order` supplies the removed entry's pre-position, which is the referent arm (ii) needs.
      const pre = viewOf(standing)
      lastView = pre
      // AN ALREADY-ABSENT TAB IS ANSWERED WITHOUT A STORE VERB AT ALL: under the closed bijection the `order` seat IS the
      // membership index (§4), and a `delete` of a leaf the record does not hold is refused `AddressNotFound` — measured
      // 2026-11-09 on the installed `1.10.0` — so the arm is this one and not the store's own empty success.
      if (!pre.order.includes(id)) return { status: 'committed' }
      // **THE DELETE-ONLY EXPECTATION, COMPOSED AND NEVER WRITTEN** (§3, §8): the pre reading's `order` and its rows MINUS
      // the id, with every `active` flag untouched. **AND `pre.entries` IS PASSED WHOLE, STILL HOLDING THE REMOVED ROW**:
      // `rowsSeatedUnder` is the site that excludes it — the seat this call hands over is the pre `order` FILTERED, so the
      // assembly walks a seat that no longer names the id and the map's row is never seated (`D-160`). Filtering the map
      // here instead would be a second spelling of a decision the seat has already made. It is what the removal MEANT, so
      // the `repaired` member says exactly one thing — that something other than the removal changed the record — and
      // nothing here predicts a successor: the successor is `§7`'s precedence at `healedFamily`, and a second copy of it
      // in the act would erase the renderer's one signal (D-70). **THE `landing === id` ARM IS GONE WITH THE SEAT**
      // (D-76): a removal of the active tab leaves no active row, and which survivor takes the seat is the engine's
      // answer at the next read.
      const expectation = composeRecord(
        pre.order.filter((other) => other !== id),
        pre.entries,
      )
      try {
        // **ONE STORE ACT, ONE LEAF, NO VALUE** (`D-156`): the row leaves; the two repairs settle membership and
        // activeness inside this same commit (`order-names-its-tabs` first, by the batch's contract order, then
        // `exactly-one-active`). **THE RECEIPT IS NOT READ**: its null `op` is the store's statement about versions, and
        // reading it would be a second membership test beside the one the seat pair owns.
        standing.delete(['tabs', id], TABS_RECORD_TIER)
        // THE OBSERVED VIEW IS REFRESHED AGAIN, AFTER THE ATTEMPT (both arms, §3): the next evaluation's PRE side is the
        // record that stands, repairs included, so a later act is not compared against a record two acts old.
        lastView = viewOf(standing)
        return standsAsIntended(standing, expectation)
          ? { status: 'committed' }
          : { status: 'committed', repaired: true }
      } catch (caught) {
        const refused = refusalOfThrown(caught)
        // A REFUSED ATTEMPT RESTORES ITS OWN STATE (`guide §5.4`), so this module's memory is re-read rather than assumed.
        lastView = viewOf(standing)
        return { status: 'refused', reason: refused.reason, message: refused.message, address: ['tabs', id] }
      }
    },
    subscribe(handler: () => void): () => void {
      // **THE REGISTRATION IS TWO ACTS, NOT ONE** (`guide §6.2`, `§6.3`): `listen(handle, addresses)` installs the ENTRY
      // and `register(handle, listener)` installs the FUNCTION under it — the store answers the triggered set and invokes
      // nothing it was not registered with. **An entry `listen` wrote and `register` never filled is a LAWFUL, SILENT
      // RESERVATION** (`§6.3` rule 1: *"an unregistered handle fires nothing, silently"*) — the package's own record calls
      // it "a reservation, `off: true`, no function" — and it holds nothing against anything, which is why the push is
      // built on it: `register` runs at once, and the entry is withdrawn where `register` fails (D-71). **The body this
      // replaces called `listen` alone and dropped `handler` on the floor: the push existed in name only** (D-70).
      //
      // **THE LISTENER STANDS AT `['tabs']` ITSELF, beside all six of this module's pairs** — lawful from `1.7.0`, whose
      // one cross-kind rule reads the HANDLE and never the address (`guide §7.3`'s clause of 2026-11-01; the listener's own
      // docblock above, and `D-71`).
      //
      // **THE BODY IS A NOTIFICATION AND NOTHING ELSE.** It calls the caller's `handler` and writes nothing at all: a
      // listener's write opens its own commit (`guide §6.5` item 1), so a delivery path that wrote would be a second
      // writer inside the one that fired it, with no loop guard to bound it (`§7.9` item 2). The renderer RE-READS.
      //
      // **THE CALLER'S THROW IS CONTAINED HERE, AND THAT IS MEASURED RATHER THAN DEFENSIVE** (2026-11-01, the installed
      // `1.6.2`): a listener body's throw is neither caught nor reported by the store and crosses every hop back into the
      // write that fired it (`guide §6.5a`), so an uncontained subscriber made a LANDED commit — the tab seated, the
      // repair filed — answer `{status: 'refused', reason: 'refused', message: 'boom-in-subscriber'}`. The act's answer is
      // the act's; the subscriber's failure is the subscriber's.
      const body = (): void => {
        try {
          handler()
        } catch {
          // the record moved and the delivery happened; the subscriber's own failure stops at the subscriber
        }
      }
      const handle = handleFor()
      try {
        standing.listen(handle, [TABS_RECORD_ADDRESS])
        standing.register(handle, body)
      } catch {
        // **A REGISTRATION THAT COULD NOT STAND LEAVES NOTHING BEHIND**: an entry `listen` wrote that `register` could not
        // fill would fire nothing and would hold this subscription's name against a later one, so it is withdrawn here.
        try {
          standing.unlisten(handle)
        } catch {
          // a withdrawal answers nothing, not even a failure
        }
        return () => undefined
      }
      let live = true
      return () => {
        // **THE WITHDRAWAL IS THIS SUBSCRIPTION'S OWN ANSWER** and it is idempotent: one `unlisten` per handle, a plain
        // no-op success over a handle already withdrawn, and never a throw to the caller (`guide §6.2`). The flag keeps
        // the second call from withdrawing whatever a later minted name might own.
        if (!live) return
        live = false
        try {
          standing.unlisten(handle)
        } catch {
          // a withdrawal the store refuses leaves the listener to the instance's lifetime, not a throw to the caller
        }
      }
    },
  }
}
