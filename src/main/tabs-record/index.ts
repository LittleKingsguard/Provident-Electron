// src/main/tabs-record/index.ts — THE CROSSING: the tab record as one address of the APP'S ONE STORE (D-63, D-64).
// It constructs nothing, opens no file and owns no instance; the boot hands it the central store it already built the
// four declarations into (D-65), and this module reads and writes the `['tabs']` subtree through it.
//
// THE RECORD'S OPERATIVE SHAPE IS THE L1 §1 FAMILY: `order`, `landing`, and one member per tab whose NAME is the tab id
// — the spelling the renderer's graph store already carries, so the crossing moved the record without renaming it
// (`docs/L2/store-tabs-record/interface.md` §1). **It is written as ONE WHOLE VALUE at `['tabs']`, never as a leaf per
// tab**, because a nested write does not create its parent — the measured rule quoted at `composeRecord`.
//
// THE INVARIANTS ARE THE ENGINE'S (design §4): `exactly-one-active`, the three field pairs and the EXISTENCE pair that
// mints the root are DECLARATIONS this module exports (`tabsConstraintDeclarations`) and the boot batches into the
// instance's construction. Their repairs carry the renderer's referent discipline rule for rule and return the op their
// write landed — the two facts this pass had to measure before the crossing answered anything but `refused`. The fifth,
// `tabs-must-stand`, is the one that makes `['tabs']` an ENFORCED INVARIANT rather than a side effect of the first commit
// (D-69), so the record exists — landing page seated and active — from the instant the instance is constructed.
import { storeCreate } from 'provident-storeroom'
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
  readonly landing: string
  readonly rows: readonly TabsRecordRow[]
}

export interface TabsRecordOptions {
  /** THE APP'S ONE STORE (D-64, D-65): the tab record lives at its `['tabs']` addresses and owns no instance. */
  readonly store: Store
}

export interface TabsRecord {
  read(): TabsRecordReading | TabsRecordAnswer
  commit(row: TabsRecordRow): TabsRecordAnswer
  /** **REMOVE A TAB** (L2 §2's fourth route): the entry's own address is deleted, and the `order` seat is rewritten
   *  without it. A delete that removes nothing is the store's own SUCCESS (`tiers: []`, `guide §5.3`) — the tab was
   *  already absent, so the answer says so rather than refusing. */
  remove(id: string): TabsRecordAnswer
  subscribe(handler: () => void): () => void
}

/** The record root: `order`, `landing` and one flat leaf per tab. */
export const TABS_RECORD_ADDRESS: readonly string[] = ['tabs']
/** The two singleton seats, named so no caller composes them. */
export const TABS_ORDER_ADDRESS: readonly string[] = ['tabs', 'order']
export const TABS_LANDING_ADDRESS: readonly string[] = ['tabs', 'landing']
/** The declared constraint id, kept even though this pass enforces the invariant at the boundary. */
export const TABS_CONSTRAINT_ID = 'exactly-one-active'
/** **THE EXISTENCE PAIR'S id** — `['tabs']` must stand, and its repair is the one act that creates it. Exported beside
 *  `TABS_CONSTRAINT_ID` so the registered list is nameable without a caller spelling either id (`D-69`). */
export const TABS_MUST_STAND_ID = 'tabs-must-stand'
/** The one shape arm's sentence (L3 signatures §5). */
export const MALFORMED_ROW_MESSAGE = 'the commit carries no tab id, or no plain record'
/** **THE CHANGE LISTENER STANDS AT THE RECORD ROOT ITSELF — `['tabs']`, BESIDE ALL FIVE PAIRS — AND FROM `1.7.0` THAT IS
 *  THE LAW AND NOT AN ARGUMENT** (`guide §7.3`'s clause of 2026-11-01, items (i) and (iii); `D-71`). **A CONSTRAINT PAIR
 *  AND A LISTENER MAY STAND AT ONE ADDRESS**: different handles, one address, both reached by the act — the pair ASKED by
 *  the pass, the listener DELIVERED after it. **THE ONLY CROSS-KIND RESTRICTION IS THE HANDLE**: a listener whose handle
 *  equals a constraint pair's `id` is `AddressMalformed` at `listen`/`register`/`addConstraint`, in both directions, and
 *  the address is named by no rule at all. **MEASURED 2026-11-01 on the published `1.7.0`, a fresh instance carrying this
 *  module's five pairs at `['tabs']`:** a live registered listener at `['tabs']` was accepted, and one whole-record write
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
 *  the five ids this module declares are `tabs-must-stand`, `exactly-one-active`, `tab-has-title`, `tab-has-content` and
 *  `tab-has-lastActiveAt` (`tabsConstraintDeclarations`), and this handle is `tabs-record:<n>@tabs` — a FIXED `tabs-record:`
 *  prefix no id carries, plus a MINTED ORDINAL that only ever grows, plus the address it is bound at. A table of literals
 *  cannot spell either part, so no `register`, no `listen` and no `addConstraint` of this module's can meet a cross-kind
 *  duplicate; the five pairs and a live listener stand at `['tabs']` at once, measured on the published `1.7.0`. */
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

/** One tab's record, admitted field by field: an unknown member is dropped, never carried. **EVERY MEMBER OF
 *  `TabsRecordRow` IS CARRIED**, because this is the same admission the module writes back: a member dropped here is a
 *  member `read` cannot report AND a member `commit` silently erases from every OTHER tab when it rebuilds the record
 *  from `rowsNow` — which is how `lastActiveAt` was lost on the first pass of this battery. */
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
let lastView: { order: string[]; entries: Record<string, TabsRecordRow> } | null = null

/** The record as one view: the order seat and every entry the store still holds under it. */
const viewOf = (store: Store): { order: string[]; entries: Record<string, TabsRecordRow> } => {
  const order: string[] = []
  const entries: Record<string, TabsRecordRow> = {}
  // **THE BODY READS THE OBJECT AT THE PAIR'S OWN ADDRESS** (D-66): a sub-property write changes what `['tabs']` reads,
  // which is why the watch fires, and the object read there is the record to judge.
  try {
    const whole = store.read(TABS_RECORD_ADDRESS, 'file') as unknown
    if (whole !== null && typeof whole === 'object' && !Array.isArray(whole)) {
      const record = whole as Record<string, unknown>
      const seated = record['order']
      if (Array.isArray(seated)) {
        for (const id of seated) {
          if (typeof id !== 'string') continue
          order.push(id)
          const row = record[id]
          if (row !== null && typeof row === 'object' && !Array.isArray(row)) {
            entries[id] = { ...(row as Record<string, unknown>), id } as unknown as TabsRecordRow
          }
        }
        return { order, entries }
      }
    }
  } catch {
    // the split seats below are the fallback the module's own writes keep readable
  }
  try {
    const read = store.read(TABS_ORDER_ADDRESS, 'file') as unknown
    if (Array.isArray(read)) for (const id of read) if (typeof id === 'string') order.push(id)
  } catch {
    return { order, entries }
  }
  for (const id of order) {
    try {
      const value = store.read(['tabs', id], 'file') as unknown
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

/** The landing page is the one target the app always has (the renderer's `TABS_LANDING_ID`). */
const TABS_LANDING_ID = 'tabs-landing-page'

/** Every tab carries a TITLE. The record's own title field is the row's `label`. */
const TAB_TITLE_REPAIR = 'untitled'
/** Every tab carries the DATA OBJECT it contains. A tab without one is pointed at the landing page, which is the one
 *  target the app always has (`TABS_LANDING_ID` on the renderer side). */
const TAB_CONTENT_FALLBACK = 'tabs-landing-page'

/** A field that is absent, not a string, or blank is a field the record cannot be read for. */
const blank = (value: unknown): boolean => typeof value !== 'string' || value.trim().length === 0

/** **THE SEAT AN EMPTY RECORD NEVER KEEPS: the landing page, seated and active, with all three field defaults already
 *  filled.** Two bodies mint it and they must mint the SAME one — `healRecord`'s `order.length === 0` branch, where the
 *  invariant refuses a record holding no tab at all, and `mintRecord`, where the address holds nothing and the record
 *  itself has to be created. A second spelling of this row is a second answer to "what is a record with no tabs", and the
 *  engine's re-run would judge whichever one wrote last. */
const landingRow = (stamp: string): TabsRecordRow => ({
  id: TABS_LANDING_ID,
  target: TABS_LANDING_ID,
  active: true,
  label: TABS_LANDING_ID,
  lastActiveAt: stamp,
})

/** **THE RECORD IS WRITTEN WHOLE, AND A REPAIR NAMES THE COMMIT IT WAS HANDED.** Both halves were measured on
 *  2026-11-01, and the second one corrects a rule this file once stated wrongly:
 *
 *  1. **A NESTED WRITE DOES NOT CREATE ITS PARENT** (`guide §2`'s fifth rule: *"write a whole structured value at the
 *     key, which mints the branch tree beneath it in one call"*). The first version wrote `['tabs','tab-1']` on a fresh
 *     store and was answered `AddressNotFound` with an EMPTY `log` — no constraint was ever asked, so that refusal came
 *     from the address rung and not from a verdict. One whole value at `TABS_RECORD_ADDRESS` mints the root, the `order`
 *     seat and every tab's member in the same call, so no seed and no ordering are needed.
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
 *  Together: **the terminal act writes one whole record; the repair writes one whole record, joined, and returns its op.** */
const composeRecord = (
  order: readonly string[],
  entries: Record<string, TabsRecordRow>,
  landing: string | null,
): Record<string, unknown> => {
  const whole: Record<string, unknown> = { order: [...order] }
  for (const id of order) {
    const row = entries[id]
    if (row !== undefined) whole[id] = row
  }
  if (landing !== null) whole['landing'] = landing
  return whole
}

/** **THE RECORD'S CANONICAL FORM — ONE SPELLING, SO THE COMPARISON IS ABOUT THE RECORD AND NOT ABOUT HOW IT WAS BUILT.**
 *
 *  Two records that STAND the same are routinely spelled differently, and either difference would make a naive
 *  `JSON.stringify` on the two objects lie about whether a repair ran:
 *
 *  1. **MEMBER ORDER IS NOT PART OF THE RECORD.** The intent is composed here (`order`, then one member per seated id,
 *     then `landing`; each row `id`, `target`, `active`, then its optional members) while the record a READ returns is
 *     rebuilt by the store from its own byte image, members in the image's order. `JSON.stringify` is order-sensitive, so
 *     a raw comparison reports a difference on every clean commit — a FALSE POSITIVE that would make `repaired` say
 *     nothing.
 *  2. **ABSENCE HAS ONE SPELLING.** `composeRecord` omits `landing` where a removal takes it away, and a row is admitted
 *     field by field, so a record carrying no `error` and one carrying `error: null` name the same absence; both project
 *     to the JSON literal `null` here, and a present empty string stays distinct from it.
 *
 *  So each record is projected onto exactly the shape L1 §1 declares — the `order` array, the `landing` string, and each
 *  seated row in a FIXED field order — and the two projections are compared as text. Nothing outside that family can
 *  reach this function: `read` and `commit` both admit the record field by field (`rowOf`). */
const canonicalRecord = (record: Record<string, unknown>): string => {
  const order: string[] = []
  if (Array.isArray(record['order'])) for (const id of record['order']) if (typeof id === 'string') order.push(id)
  const text = (value: unknown): string | null => (typeof value === 'string' ? value : null)
  const rows = order.map((id) => {
    const held = record[id]
    const row: Record<string, unknown> = plain(held) ? held : {}
    return [id, text(row['id']), text(row['target']), row['active'] === true, text(row['label']), text(row['error']), text(row['lastActiveAt'])]
  })
  return JSON.stringify({ order, landing: text(record['landing']), rows })
}

/** **WHETHER A REPAIR RAN IS A FACT OF THE STORE, SO IT IS READ BACK AND NOT PREDICTED.** The engine's repairs write
 *  inside the commit this module opened (`design.md` §4), and the write's own record carries no member saying one did
 *  (`guide §6.4`): so the ONE honest derivation is to hold the record this act INTENDED, write it, and compare it with the
 *  record that STANDS afterwards. **A difference means a repair changed it** — the answer then carries `repaired: true`
 *  and the renderer re-reads, rendering what the store says rather than what this module thought (L2 §3).
 *
 *  **An unreadable standing record answers DIFFERING, not equal**: the claim `repaired` would suppress is "the record that
 *  stands is the one I intended", and a read that refuses has established no such thing. That is the one arm this
 *  derivation cannot see, and it errs toward the renderer re-reading, which is what the member asks for anyway. */
const standsAsIntended = (store: Store, intended: Record<string, unknown>): boolean => {
  try {
    const held = store.read(TABS_RECORD_ADDRESS, 'file') as unknown
    return plain(held) && canonicalRecord(held) === canonicalRecord(intended)
  } catch {
    return false
  }
}

/** **A REPAIR'S ANSWER, IN THE ONLY SHAPE THE KERNEL CREDITS** (`landedOp`: a non-empty `opId` absent from the attempt's
 *  own ops, whose `seq` stands strictly above the op the repair was invoked for). Returning `void` fails `KC-4` with
 *  *"the repair … produced no op"* naming the CALLER's address, which is the defect `ST-F2` files upstream. */
const repairAnswer = (receipt: unknown): { ok: true; op: unknown } => ({
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
 *  refusal's sentence must name it, which is why there are five declarations and not one — **while the REPAIR leaves
 *  one record that satisfies all five**, so at most one extra pass runs and that pass passes — `mintRecord`'s included,
 *  which lands the landing row with all three field defaults already filled.
 *
 *  It reads the record at the moment it is invoked (`§7.6`: a body reads the location it judges), never the state
 *  this body judged — an earlier repair in the same pass may already have written. */
const healRecord = (store: Store, hints: HealHints) => (context: unknown): { ok: true; op: unknown } => {
  const view = viewOf(store)
  const stamp = new Date().toISOString()
  // AN ID IS A SURVIVOR ONLY IF THE RECORD STILL HOLDS IT: a seat left in `order` with no member under it is a removal
  // made in the wrong order, and keeping it would hand the re-run the same dangling seat.
  const order = view.order.filter((id) => !hints.removals.includes(id) && view.entries[id] !== undefined)
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
    // AN EMPTY SEQUENCE NEVER SURVIVES: the landing page is the one target the app always has, so it takes the seat.
    order.push(TABS_LANDING_ID)
    rows[TABS_LANDING_ID] = landingRow(stamp)
  } else {
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
  // **ONE WRITE OF ONE CORRECTED OBJECT, JOINED TO THE ATTEMPT** — the whole point: the re-run reads this, so the pass
  // converges on the next evaluation instead of re-violating, and `landing` rides in the same value (`D-66`).
  const landing = order.find((id) => readActive(rows[id])) ?? null
  // NOTHING IS SWALLOWED HERE: a repair whose write fails must SAY so, because a swallowed refusal reads as a violation
  // of the invariant the caller broke rather than as the repair's own failure. **THE CONTEXT AT `write`'S FOURTH POSITION
  // IS WHAT MAKES THIS WRITE JOIN THE ATTEMPT** instead of opening a second `K-2` at the address that already holds one
  // (`surface.md §2.11` clause 6), and the op it lands is what the kernel credits — see `repairAnswer`.
  const receipt = store.write(TABS_RECORD_ADDRESS, 'file', composeRecord(order, rows, landing), context as never) as unknown
  return repairAnswer(receipt)
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

const exactlyOneActive = (store: Store) => (): true | { message: string; repair: (context: unknown) => unknown } => {
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
 *  record that satisfies all five — see `healRecord`. */

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

/** The `landing` seat as the record holds it, or `null` where the record carries none. */
const landingOf = (store: Store): string | null => {
  const view = viewOf(store)
  try {
    const read = store.read(TABS_LANDING_ADDRESS, 'file') as unknown
    if (typeof read === 'string') return read
  } catch {
    // a record with no landing seat answers null rather than inventing one
  }
  return view.order.find((id) => readActive(view.entries[id])) ?? null
}

/** **`tab-has-title`** — a tab with no title, or an empty one, is repaired to `'untitled'`. */
const tabHasTitle = (store: Store) => (): true | { message: string; repair: (context: unknown) => unknown } => {
  if (!entriesOf(store).some(({ row }) => blank(row['label']))) return true
  return {
    message: 'a tab carries no title',
    repair: healRecord(store, liveHints(store)),
  }
}

/** **`tab-has-content`** — a tab that contains no data object is pointed at the landing page. */
const tabHasContent = (store: Store) => (): true | { message: string; repair: (context: unknown) => unknown } => {
  if (!entriesOf(store).some(({ row }) => blank(row['target']))) return true
  return {
    message: 'a tab contains no data object',
    repair: healRecord(store, liveHints(store)),
  }
}

/** **`tab-has-lastActiveAt`** — a tab with no activation stamp is stamped with NOW. The stamp is written as an ISO
 *  string so the record's byte image stays JSON-plain and a reader needs no clock of its own to interpret it. */
const tabHasLastActiveAt = (store: Store) => (): true | { message: string; repair: (context: unknown) => unknown } => {
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
 *  written rather than a bare root: the other four pairs read the same re-run, and it satisfies them too. */
const mintRecord = (getStore: () => Store | null) => (context: unknown): unknown => {
  const whole = composeRecord([TABS_LANDING_ID], { [TABS_LANDING_ID]: landingRow(new Date().toISOString()) }, TABS_LANDING_ID)
  const route = plain(context) ? context['write'] : undefined
  if (typeof route === 'function') {
    const write = route as (address: readonly string[], tier: string, value: unknown) => unknown
    // THREE POSITIONS, AND NO FOURTH: supplying the commit here is the refusal this branch exists to avoid.
    return repairAnswer(write(TABS_RECORD_ADDRESS, 'file', whole))
  }
  const store = getStore()
  if (store === null) {
    // NEITHER ROUTE: no store to write through and no route on the record, so the record cannot be made to stand and
    // the repair says so in the failed arm's own two members rather than answering `void`, which carries "no op".
    return { ok: false, message: 'the tab record does not stand, and this repair reached no write route' }
  }
  return repairAnswer(store.write(TABS_RECORD_ADDRESS, 'file', whole, context as never) as unknown)
}

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
 *  repair mints the same `landingRow`. */
const tabsMustStand = (getStore: () => Store | null) => (context: unknown): unknown => {
  if (plain(context) && context['value'] !== undefined) return true
  return {
    message: 'the tab record does not stand',
    repair: mintRecord(getStore),
  }
}

/** **THE BATCHED DECLARATIONS, COLLECTED BY BOOT** (D-65's first act). Each element carries the pair and the body; the
 *  boot gathers these from every module that imposes one and constructs the central store **once** with the batch, so a
 *  constraint is a DECLARATION here rather than a constructor call. The getter is how a body reaches the instance it is
 *  registered on — it is armed at construction and only *evaluated* on a write, so the reference is bound by then.
 *
 *  The ids are a namespace the modules share (`guide §7.2`: a repeated id in one supplied list is REJECTED).
 *
 *  **FIVE, AND THE FIFTH IS LISTED FIRST**: `tabs-must-stand` is registered and not wrapped by `body`, because the
 *  wrapper's null-store arm would silence it at the exact instant it is the only pair that can act (`tabsMustStand`), and
 *  it stands ahead of the other four because it is the precondition of their subject — a record that does not exist has
 *  no field to judge and no tab to activate. The pairs it writes past are silent at that instant for a reason of their
 *  own: their bodies read through the same handle and the wrapper is what tells them to abstain. */
export function tabsConstraintDeclarations(getStore: () => Store | null): readonly {
  readonly address: readonly string[]
  readonly id: string
  readonly constraint: (context: unknown) => unknown
}[] {
  const body = (evaluate: (store: Store) => () => unknown) => (context: unknown): unknown => {
    void context
    const store = getStore()
    return store === null ? true : evaluate(store)()
  }
  return [
    { address: TABS_RECORD_ADDRESS, id: TABS_MUST_STAND_ID, constraint: tabsMustStand(getStore) },
    { address: TABS_RECORD_ADDRESS, id: TABS_CONSTRAINT_ID, constraint: body(exactlyOneActive) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-title', constraint: body(tabHasTitle) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-content', constraint: body(tabHasContent) },
    { address: TABS_RECORD_ADDRESS, id: 'tab-has-lastActiveAt', constraint: body(tabHasLastActiveAt) },
  ]
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
  // profile's landing seat and a record carried over from a previous run, which is the PRE side of the first evaluation
  // alike. **NOTHING IN THIS MODULE DEPENDS ON THE OLD EMPTINESS** — `seats()` reads the order seat, `landingOf` reads the
  // landing seat and falls back to the active entry, and every write composes the whole record from what stands — so the
  // one thing that changes is that the first `commit` now APPENDS to a record holding `tabs-landing-page` instead of
  // creating the root, and `read()` answers a landing-seated record before any commit.
  lastView = viewOf(standing)

  /** The order seat and the landing witness, read as the record holds them. */
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
      // **ONE WRITE OF ONE WHOLE RECORD** — and that single value mints the record root, the `order` seat and this tab's
      // member in the same call (the rule at `composeRecord`), which is why there is no seed and no per-seat ordering.
      // **NO CORRECTIVE WRITE HERE** (`D-65`): the caller's row is written as the caller asked for it, and the engine's
      // evaluations make the state legal inside the same commit. One home for every invariant, and it is the engine's.
      const { order } = seats()
      const next = order.includes(row.id) ? order : [...order, row.id]
      const entries: Record<string, TabsRecordRow> = Object.fromEntries(rowsNow(next).map((seated) => [seated.id, seated]))
      entries[row.id] = row
      const active = [...next].reverse().find((id) => entries[id]?.active === true) ?? null
      // **THE RECORD THIS ACT INTENDS, COMPOSED ONCE AND WRITTEN ONCE.** What the engine's repairs then do to it is
      // measured, not guessed: the record that stands is read back and compared with this intent (`standsAsIntended`),
      // which is how a commit that triggered a repair came to answer `{status: 'committed'}` and nothing else — the
      // member `docs/L3/store-tabs-record/design.md` §4 declares and no code produced (D-70).
      const intent = composeRecord(next, entries, active ?? landingOf(standing))
      try {
        standing.write(TABS_RECORD_ADDRESS, 'file', intent)
        // THE OBSERVED VIEW MOVES WITH THE WRITE: a commit is a write this module made and saw, so the constraint's PRE
        // side must be the record as it stands afterwards — otherwise the next evaluation compares against a record two
        // acts old and reads the caller's own change as a removal.
        lastView = viewOf(standing)
        // THE MEMBER IS OMITTED ON A CLEAN ACT AND NEVER ANSWERED `false`: a repair that ran is the only thing that makes
        // the standing record differ from the intent, so its presence IS the signal (L2 §3).
        return standsAsIntended(standing, intent)
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
      const { order } = seats()
      // AN ALREADY-ABSENT TAB IS THE STORE'S OWN SUCCESS (`guide §5.3`: a delete that removes nothing answers `tiers: []`)
      // — so this answers `committed` without asking the store to refuse a removal of nothing.
      if (!order.includes(id)) return { status: 'committed' }
      // **ONE WRITE OF ONE WHOLE RECORD WITHOUT THE TAB.** If the tab being removed was the ACTIVE one this leaves zero
      // active, `exactly-one-active` refuses, and its repair picks the successor by the renderer's referent discipline
      // (the removed entry's pre-position) and files the whole corrected record. This body therefore does not choose a
      // successor at all — there is one place that decides, and it is the engine's.
      const next = order.filter((other) => other !== id)
      const entries: Record<string, TabsRecordRow> = Object.fromEntries(rowsNow(next).map((seated) => [seated.id, seated]))
      const landing = landingOf(standing)
      // **ONE WHOLE RECORD WITHOUT THE TAB, AND THE SAME DERIVATION AS `commit`'S**: `landing` is omitted where the removal
      // takes the seat away with the tab, so a removal that needs no repair leaves exactly the intent (`composeRecord`
      // omits the member), and one whose repair seated a survivor differs from it (D-70).
      const intent = composeRecord(next, entries, landing === id ? null : landing)
      try {
        standing.write(TABS_RECORD_ADDRESS, 'file', intent)
        lastView = viewOf(standing)
        return standsAsIntended(standing, intent)
          ? { status: 'committed' }
          : { status: 'committed', repaired: true }
      } catch (caught) {
        const refused = refusalOfThrown(caught)
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
      // **THE LISTENER STANDS AT `['tabs']` ITSELF, beside all five of this module's pairs** — lawful from `1.7.0`, whose
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
