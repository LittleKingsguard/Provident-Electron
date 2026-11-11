// tests/integration/store-tabs-record/crossing.test.ts — THE L3 BATTERY for `store-tabs-record`, part 1: the crossing
// over the central instance.
//
// THE CONTRACT: `docs/L3/store-tabs-record/design.md` §4 — SIX registered pairs at `['tabs']` (`tabs-must-stand`, the
// existence pair that mints the root; `order-names-its-tabs`, the seat pair that names the record's own tabs, D-83;
// `exactly-one-active`; and the three field invariants), each answering `true` or
// `{ message, repair }`, where the repair leaves ONE corrected record and RETURNS the op its write landed
// (`{ ok: true, op }`, the shape the kernel credits through `landedOp`), and `docs/L2/store-tabs-record/interface.md` §2 —
// four routes; and design §5 — the change push, which is a listener REGISTERED under a handle (`subscribe`).
//
// **THE FOUR MACHINERY RULES THIS FILE PINS, EACH MEASURED AND NOT ASSUMED (the first three 2026-11-01; the fourth on the
// package's own clause stamped 2026-11-02, measured here 2026-11-01):**
//  1. a nested write does not create its parent, so a value is written WHOLE at `['tabs']` — one value that mints the
//     root, the `order` seat and every tab member in the same call — **which is the THREE REPAIRS' act and no act's**
//     (`D-156`, `D-158`, design §3/§8): `remove` writes no value at all, being ONE `delete(['tabs', id], 'file')`, and
//     `commit` writes ONE ROW at the tab's own leaf, whose unseated key the seat pair refuses so that its `'seat'` repair
//     APPENDS the id to `order` inside the same commit — so on either act the record that stands afterwards is the two
//     repairs' — the seat's membership, then `exactly-one-active`'s;
//  2. a repair may write at the attempt's OWN address when it names the commit it was handed at `write`'s fourth
//     position — without it the same write is refused `KC-7` *"a constraint attempt is already open"*;
//  3. a repair that returns `void` is refused *"the repair … produced no op"* (`ST-F2`, filed upstream) — **THAT WAS THE
//     PACKAGE'S RULE AT `1.7.0` AND IT IS NOT ONE AT THE INSTALLED `1.9.0`**, which credits an op-less repair by the legs its
//     own write wrote (measured 2026-11-02 on both trees). **THE RULE IS THIS MODULE'S NOW**: the `@ts-expect-error` rows
//     further down are what make a `void` repair a COMPILE ERROR in this repo, and no runtime row below asks the package to
//     refuse one — so nothing here moves when the package's licence widens;
//  4. a pair whose own key is ABSENT is APPLIED where its parent resolves, and its repair may create the key — the route
//     it takes there carries the store's THREE positions and no fourth (`guide §7.2`'s dated clause, items (3) and (4);
//     D-69). That is what makes `['tabs']` stand BEFORE the first commit rather than as a side effect of it.
//  5. a repair's write NAMES the commit it was handed, and it does so through `writeJoined`, whose carrier position is
//     REQUIRED — so a repair write that names no commit is an ARITY ERROR here rather than a convention (D-73). The
//     type-level rows below red the moment that position is widened.
//
// **AND THREE FACTS ABOUT THE DELIVERY, PINNED HERE (D-70, D-71):** from the consumed `provident-storeroom 1.7.0` a
// constraint pair and a LIVE LISTENER may stand at ONE address — the pair asked by the pass, the listener delivered after
// it, the only cross-kind restriction being the HANDLE — so the push installs at `['tabs']` itself, beside all six of this
// module's pairs; `repaired` is DERIVED by comparing the record this act MEANT with the record that stands, because the
// store's write record carries no member for the repair that ran in its own commit — **and FROM `D-158` NEITHER ACT
// WRITES WHAT IT MEANT: each composes an EXPECTATION that is compared and never stored** — on `remove` the pre reading's
// `order` and rows minus the id, every flag untouched (§8, D-156), and on `commit` the CREATION expectation: that same
// reading PLUS the admitted row PLUS a seat naming it, composed from the `order` the reading carried and never from a
// position the act predicts (§8, D-158); and **a write a pair REFUSES delivers
// nothing**, the pair asked and the pass thrown with the delivery window never opened.
//
// This authority is this repo's (`docs/L3`, `docs/L2`) and the package's own guide, never the package's internals.
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import {
  createTabsDelivery,
  createTabsRecord,
  isCommitCarrier,
  SEAT_NAME_MESSAGE,
  SEAT_NAME_REASON,
  tabsConstraintDeclarations,
  writeJoined,
} from '../../../src/main/tabs-record'
import type {
  TabsCommitCarrier,
  TabsConstraintAnswer,
  TabsConstraintDeclaration,
  TabsDelivery,
  TabsRecord,
  TabsRecordStore,
  TabsRepair,
  TabsRepairAnswer,
} from '../../../src/main/tabs-record'
import type { TabsRecordRow } from '../../../src/shared/types'

const PROFILE_FILE = 'provident-profile.json'

let dir: string
let holder: TabsRecordStore | null = null
let record: TabsRecord
/** **THE CROSSING'S DELIVERY, BUILT BEFORE THE STORE AND ADOPTED BY ITS CONSTRUCTION** (`D-219`;
 *  `docs/L3/store-tabs-record/delivery.md` §1–§2): its ONE entry at `['tabs']` is the one registration the crossing is
 *  allowed and the construction takes it, so the six declarations' creation repairs deliver from the instant they write. */
let delivery: TabsDelivery
/** **WHAT THE SINK WAS HANDED** — the delivered ADDRESSES, in order. A creation's deliveries are EVIDENCE (`D-219`), and a
 *  row that counts what an act caused reads a DELTA of this list rather than its total. */
let sunk: (readonly string[])[] = []

/** A row's own crossing: one delivery, built before the store that adopts it. */
const deliveries = (): { delivery: TabsDelivery; sunk: (readonly string[])[] } => {
  const recorded: (readonly string[])[] = []
  return { delivery: createTabsDelivery((address) => recorded.push([...address])), sunk: recorded }
}

/** A record over a real store built the way the app builds it: the six declarations batched at construction (D-65, D-83)
 *  **AND THE CROSSING'S ONE LISTENER ENTRY ADOPTED BY THAT SAME CALL** (`D-219`, `docs/L3/app-shell/delivery.md` §5 `A-3`). */
const open = (): void => {
  dir = mkdtempSync(join(tmpdir(), 'tabs-crossing-'))
  holder = null
  sunk = []
  delivery = createTabsDelivery((address) => sunk.push([...address]))
  const store = createProfileStore({
    filePath: join(dir, PROFILE_FILE),
    constraints: tabsConstraintDeclarations(() => holder).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
    listeners: [...delivery.entries],
  })
  holder = store as unknown as TabsRecordStore
  record = createTabsRecord({ store: holder, delivery })
}

beforeEach(open)

afterEach(() => {
  // THE STORE IS RELEASED BY DROPPING IT — the package declares no `close()` and no finalizer (`guide §2.1`), so the
  // file handle is the instance's own lifetime and the scratch directory is what must go.
  holder = null
  rmSync(dir, { recursive: true, force: true })
})

const row = (id: string, extra: Partial<TabsRecordRow> = {}): TabsRecordRow => ({
  id,
  target: `page://${id}`,
  active: true,
  ...extra,
})

const reading = (): { order: string[]; landing: string; rows: TabsRecordRow[] } => {
  const answer = record.read()
  // THE NARROWING IS BY MEMBER, NOT BY STATUS: an answer and a reading both carry `status: 'committed'`, so the status
  // cannot discriminate the two arms — the reading's own members can.
  if (!('rows' in answer)) throw new Error('the record refused a read the battery needs')
  return { order: [...answer.order], landing: answer.landing, rows: [...answer.rows] }
}

const actives = (): string[] => reading().rows.filter((each) => each.active === true).map((each) => each.id)

// ═══════════════ THE REPAIR'S RETURN: TYPED IN THE MODULE, AND READ AT THE ENGINE (D-72) ═══════════════
//
// **THE TYPE-LEVEL ROW, AND IT IS A ROW AND NOT A COMMENT.** `npm run typecheck:tests` compiles THIS file, so each
// `@ts-expect-error` below passes only while the error it suppresses is really there — and the property that makes that a
// measurement is what a WIDENING does: put `void` back into `TabsRepairAnswer` and the two directives that ride on it become
// UNUSED, which `tsc` reports as `TS2578` ("Unused '@ts-expect-error' directive") and this leg reds. **MEASURED 2026-11-02
// on this tree: `| void` added to the credited arm → `TS2578` twice, at the first directive and at the `repair` member
// below, while `npm run typecheck` over `src/**` stayed green — so the leg that catches the revert is THIS one; restore →
// clean.** The third directive rides on `TabsConstraintAnswer` instead, which does not derive from the repair's own return.
// The rule asserted is D-72's: a repair answers its credited arm `{ok: true, op}` or the declared failed arm
// `{ok: false, message}`, and `undefined`, `void` and a bare `{ok: true}` are not written in this module. No directive here
// suppresses a cast: each one covers a value the module would accept only by breaking the rule.

// @ts-expect-error — an answer that IS `void` is not a `TabsRepairAnswer`: the arm is stated, never left to fall through
const voidRepairAnswer: TabsRepairAnswer = undefined as unknown as void

const voidRepairDeclaration: TabsConstraintDeclaration = {
  address: ['tabs'],
  id: 'a-void-repair',
  constraint: () => ({
    message: 'a violation',
    // @ts-expect-error — a `() => void` is not the `repair` member a declaration's answer accepts
    repair: (): void => undefined,
  }),
}

// @ts-expect-error — and a BODY that answers nothing is not a `TabsConstraintAnswer` either: `true` or one of the two arms
const voidConstraintBody: TabsConstraintDeclaration = { address: ['tabs'], id: 'a-void-body', constraint: (): void => undefined }

// ═══════════════ THE REPAIR'S WRITE: A CARRIER IS REQUIRED, SO NO CARRIER IS A COMPILE ERROR (D-73) ═══════════════
//
// **THE SECOND TYPE-LEVEL ROW, AND IT GUARDS THE OTHER HALF OF THE SAME REPAIR.** `writeJoined` is the module's ONE repair
// write: its `commit` position is second and REQUIRED, and it is what a repair hands the commit it was given to `write`'s
// FOURTH store position — the act that makes the write JOIN the attempt instead of opening a second `K-2` (`D-67`, `KC-7`).
// Each `@ts-expect-error` below rides on that position and passes only while the error it suppresses is really there, and the
// property that makes it a measurement is the same one the block above has: **widen the position and the directive is UNUSED**,
// which `tsc` reports as `TS2578` and this leg reds. **MEASURED 2026-11-02 on this tree, three widenings, each restored before
// the next: `commit?: TabsCommitCarrier` → `TS1016` *"A required parameter cannot follow an optional parameter"* at the helper
// AND `TS2578` at the omission row; `commit: TabsCommitCarrier | undefined` → `TS2578` at THAT row alone, and `npm run
// typecheck` over `src/**` STILL GREEN, because the widening breaks no call site — so THE LEG THAT CATCHES IT IS THIS ONE;
// `commit: unknown` → three `TS2578`, one per row. Restore → both legs clean and the battery green.** The bodies live in
// arrows that are never invoked: these rows measure a SIGNATURE, and calling them would drive a store this file has not
// opened.
declare const aStore: TabsRecordStore
const anIntendedRecord: unknown = { order: [] }
const aCarrier: TabsCommitCarrier = { pending: [] }

// The positive control: a carrier IS accepted here, so the three directives below are about the position and not about the call.
const joinedRepairWrite = (): unknown => writeJoined(aStore, aCarrier, anIntendedRecord)

// @ts-expect-error — A REPAIR WRITE WITH NO CARRIER DOES NOT COMPILE: the omission is an arity fault, not a convention
const carrierlessRepairWrite = (): unknown => writeJoined(aStore, undefined, anIntendedRecord)

// @ts-expect-error — a carrier-SHAPED position given an ARRAY is not a commit: the class test refuses an array before a read
const arrayCarrierRepairWrite = (): unknown => writeJoined(aStore, [], anIntendedRecord)

// @ts-expect-error — nor is `null` a commit: the position admits a non-null object, and naming nothing is not naming a commit
const nullCarrierRepairWrite = (): unknown => writeJoined(aStore, null, anIntendedRecord)

describe('store-tabs-record · the crossing', () => {
  it('THE CONSTRUCTION INSTANT: `tabs-must-stand` creates the record BEFORE ANY COMMIT — a store built over a scratch file path answers a root holding the landing ENTRY, seated and active under the id `landing`, and `read()` on the never-committed record is a reading', () => {
    // THE ABSENCE→REPAIR PATH, DRIVEN FROM ITS OWN STORE so the row measures the CONSTRUCTION rather than a record this
    // file already opened: nothing is committed and no verb of the module has been called when the record is read.
    const instant = mkdtempSync(join(tmpdir(), 'tabs-construction-'))
    const path = join(instant, PROFILE_FILE)
    let bound: TabsRecordStore | null = null
    // **THE DELIVERY IS BUILT BEFORE THE STORE BECAUSE THE CONSTRUCTION'S `listeners` ARRAY IS READ INSIDE THE CALL THAT
    // CREATES IT** (`D-219`; `docs/L3/store-tabs-record/delivery.md` §2).
    const { delivery: instantDelivery, sunk: instantSunk } = deliveries()
    const store = createProfileStore({
      filePath: path,
      constraints: tabsConstraintDeclarations(() => bound).map((declaration) => ({
        address: declaration.address,
        id: declaration.id,
        constraint: declaration.constraint,
      })) as never,
      listeners: [...instantDelivery.entries],
    })
    // THE HANDLE IS BOUND AFTER THE CONSTRUCTION, exactly as the boot binds it (`src/main/main.ts`), so the pair that runs
    // DURING the construction reaches no store at all — and creates the root anyway, through its repair's own route.
    bound = store as unknown as TabsRecordStore
    try {
      // THE ROOT EXISTS AT THE STORE'S OWN ADDRESS BEFORE ANY COMMIT: `read` of a never-committed record is a READING
      // and not "does not exist", which is the whole difference this pair makes.
      const answer = store.read(['tabs'] as never) as unknown
      expect(answer, 'the existence pair minted the root at construction').toMatchObject({ order: ['landing'] })
      // **AND THE CREATION'S OWN REPAIR ALREADY DELIVERED, BEFORE THIS RECORD EXISTED**: the sink carries `['tabs']`,
      // which is the event `D-218` measured as absent and `D-219` closed upstream (`docs/L3/app-shell/delivery.md` §1).
      expect(instantSunk.map((address) => address.join('/')), 'the construction delivered at `[\'tabs\']` to its adopted entry').toContain('tabs')
      const fresh = createTabsRecord({ store: bound, delivery: instantDelivery })
      const read = fresh.read()
      if (!('rows' in read)) throw new Error('a record created at construction must answer a reading')
      expect([...read.order], 'the fresh record seats the landing ENTRY — id `landing` — and nothing else').toEqual(['landing'])
      expect(read.landing, "and `read()`'s DERIVED witness names it, from the row and not from a seat").toBe('landing')
      expect(read.rows.map((each) => each.id)).toEqual(['landing'])
      expect(read.rows.filter((each) => each.active === true).map((each) => each.id), 'seated AND active').toEqual([
        'landing',
      ])
      // AND IT IS THE INSTANCE'S, NOT A PASS THE MODULE REMEMBERS: the assertion above is the STORE's own read, taken
      // before `createTabsRecord` was called at all. **MEASURED 2026-11-01: the construction write lands in the instance and
      // NOT in the profile file's bytes** — over this same scratch shape the file stands at 0 bytes until the first write's
      // terminal act materialises it (345 bytes after ONE `commit`) — so a fresh profile's listing is UNCHANGED by this
      // pair and the record a boot hands out is minted again at each construction. `DECLARED_WRITTEN_JSON` in
      // `tests/store-compliance-live.mjs` therefore still holds at its two names: this pair writes the central instance's
      // `provident-profile.json`, which the record already lived in, and creates no third name (that battery's `SC-B-01`
      // reads `undeclaredJsonNames: []` over a live profile).
    } finally {
      bound = null
      rmSync(instant, { recursive: true, force: true })
    }
  })

  it('a first commit is ANSWERED committed and APPENDS to the record the existence pair created: `[landing, tab-1]`, exactly one active — the committed tab — and the derived witness on it', () => {
    const answer = record.commit(row('tab-1'))
    expect(answer.status).toBe('committed')
    const { order, landing, rows } = reading()
    expect(order).toEqual(['landing', 'tab-1'])
    expect(landing).toBe('tab-1')
    expect(rows).toHaveLength(2)
    expect(actives()).toEqual(['tab-1'])
  })

  it('`tab-has-title`, `tab-has-content` and `tab-has-lastActiveAt` → a row carrying no title, a BLANK target and no stamp is answered committed with all three defaults written by the repair', () => {
    const answer = record.commit({ id: 'bare', target: '', active: true })
    expect(answer.status, 'a violation the pair can repair is not a refusal').toBe('committed')
    const seated = reading().rows.find((each) => each.id === 'bare')
    expect(seated?.label, 'tab-has-title → "untitled"').toBe('untitled')
    expect(seated?.target, 'tab-has-content → the landing page, a CONTENT reference and not the entry\'s id').toBe('tabs-landing-page')
    expect(seated?.lastActiveAt, 'tab-has-lastActiveAt → now, as an ISO string').toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('`exactly-one-active` → a second ACTIVE tab is committed and the first is deactivated, so the invariant holds after the act rather than at it', () => {
    record.commit(row('tab-1'))
    expect(record.commit(row('tab-2')).status).toBe('committed')
    const { order } = reading()
    expect(order).toEqual(['landing', 'tab-1', 'tab-2'])
    expect(actives(), 'the engine repair keeps the caller\'s own referent').toEqual(['tab-2'])
    expect(reading().landing).toBe('tab-2')
  })

  it('`exactly-one-active` → a second INACTIVE tab leaves the active one alone', () => {
    record.commit(row('tab-1'))
    expect(record.commit(row('tab-2', { active: false })).status).toBe('committed')
    expect(actives()).toEqual(['tab-1'])
    expect(reading().order).toEqual(['landing', 'tab-1', 'tab-2'])
  })

  it('`remove` → removing the ACTIVE tab is answered committed and a survivor takes the seat, chosen by the removed entry\'s pre-position', () => {
    record.commit(row('tab-1'))
    record.commit(row('tab-2', { active: false }))
    expect(record.remove('tab-1').status).toBe('committed')
    const { order, rows } = reading()
    expect(order).toEqual(['landing', 'tab-2'])
    expect(rows.map((each) => each.id), 'the tab is gone from the record, not merely unseated').toEqual([
      'landing',
      'tab-2',
    ])
    expect(actives(), 'exactly one active survives a removal of the active tab').toEqual(['tab-2'])
  })

  it('`remove` → removing the LAST tab — the landing ENTRY itself, since a fresh record starts holding it — leaves the record non-empty: the empty-sequence repair mints the landing entry back into `order`, under the id the renderer spells', () => {
    record.commit(row('tab-1'))
    // THE FRESH RECORD ALREADY SEATS THE LANDING ENTRY (D-69), so the empty sequence the invariant refuses is reached by
    // removing THAT after the tab, and not by removing the only tab a record has.
    record.remove('tab-1')
    expect(record.remove('landing').status).toBe('committed')
    const { order, landing } = reading()
    expect(order, 'the record never stands empty').toHaveLength(1)
    expect(order).toEqual(['landing'])
    expect(actives()).toEqual(['landing'])
    expect(landing).toBe(order[0])
  })

  it('the SHAPE ARMS answer before any verb is reached: a row with no id and a removal with no id are both refused `malformed-row`, and the record stands as the construction left it', () => {
    expect(record.commit({ target: 'page://x', active: true } as unknown as TabsRecordRow)).toMatchObject({
      status: 'refused',
      reason: 'malformed-row',
    })
    expect(record.commit(null as unknown as TabsRecordRow)).toMatchObject({ status: 'refused', reason: 'malformed-row' })
    expect(record.remove('')).toMatchObject({ status: 'refused', reason: 'malformed-row' })
    expect(reading().order, 'no refused act moved the record — it holds what the existence pair created').toEqual([
      'landing',
    ])
  })

  // ═══════════════ THE SEAT-NAME GUARD: ONE NAMESPACE, SO A SEAT'S OWN NAME IS NOT AN ID (D-76) ═══════════════

  it('THE SEAT-NAME GUARD — an entry id equal to the record\'s own `order` seat is REFUSED by BOTH routes that take an id, under this module\'s own reason and sentence rather than the shape arm\'s, before any store act: the record stands byte-identical afterwards', () => {
    record.commit(row('tab-1', { label: 'one', lastActiveAt: '2026-11-02T00:00:00.000Z' }))
    const before = reading()
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    const bytes = JSON.stringify(store.read(['tabs'] as never))

    // THE ROW IS WELL FORMED — an id, a `target`, a plain record — so `malformed-row` is the WRONG sentence here and the
    // reason is the whole of what says this refusal is about the NAME. **MEASURED 2026-11-02 WITH THE GUARD REMOVED**: this
    // very commit was ANSWERED `committed` and wrote `order: [..., 'order']` with no member under that key, so a read named
    // a tab the record did not hold — the same hole the retired `landing` seat had (D-75).
    const committed = record.commit(row('order', { label: 'a seat is not a tab' }))
    expect(committed, 'the commit is refused under the seat-name arm').toMatchObject({
      status: 'refused',
      reason: SEAT_NAME_REASON,
      message: SEAT_NAME_MESSAGE,
    })
    expect(committed.reason, 'and NOT under the shape arm, whose sentence names a fault this row does not have').not.toBe('malformed-row')

    // THE SAME NAME AT THE OTHER ENTRY POINT: `remove` takes an id too, and a removal of the seat's own name is not the
    // removal of a tab — without this arm it would be answered `committed` as the store's own success over a name that is
    // not a member.
    expect(record.remove('order'), 'the removal is refused under the same arm').toMatchObject({
      status: 'refused',
      reason: SEAT_NAME_REASON,
      message: SEAT_NAME_MESSAGE,
    })

    // AND NO STORE ACT RAN EITHER TIME: a guard placed AFTER the write would pass both sets of expectations above and fail
    // here, which is why the record is read back through this module AND through the store's own bytes.
    expect(reading(), 'the record stands as the last lawful act left it').toEqual(before)
    expect(JSON.stringify(store.read(['tabs'] as never)), 'and the store\'s own value is byte-identical').toBe(bytes)

    // **AND THE CONTROL THAT KEEPS THE GUARD FROM BEING OVER-BROAD**: `landing` is NOT a seat name any more — the derivation
    // made it an entry's own key (D-76) — so an act under that id is ACCEPTED. A guard that refused both spellings would pass
    // every expectation above and lose the entire point of the change.
    expect(record.commit(row('landing', { active: false, label: 'the landing entry, updated in place', lastActiveAt: '2026-11-02T00:00:00.000Z' })).status, '`landing` is an ordinary entry id: the commit is accepted').toBe('committed')
    expect(reading().rows.find((each) => each.id === 'landing')?.label, 'and it UPDATED the landing entry rather than being lost behind a seat string').toBe('the landing entry, updated in place')
  })

  it('THE ID THE DERIVATION FREED — the landing entry\'s id is `landing`, the renderer\'s own spelling: the fresh record seats it under that id, its `target` is the authored CONTENT reference, a `commit` under that id updates ONE member, and `remove` of it as the last tab re-mints it', () => {
    // THE WHOLE CHANGE, READ AT THE ROUTES A CLIENT HAS. Before D-76 every expectation in this row was unreachable: the id
    // `landing` wrote a member that the seat string then overwrote, so `order` named a tab the record did not hold.
    const fresh = reading()
    expect(fresh.order, 'the fresh record seats the landing entry under the renderer\'s spelling').toEqual(['landing'])
    expect(fresh.landing, "and `read()`'s witness names it — DERIVED from the active row, not read off a seat").toBe('landing')
    const entry = fresh.rows[0]
    expect(entry?.id, 'the member is keyed by the id and its own `id` member spells it').toBe('landing')
    expect(entry?.label, 'its label is the same spelling').toBe('landing')
    // THE CONTENT REFERENCE IS A DIFFERENT THING AND DID NOT MOVE: `'landing'` names no authored node, so the page a client
    // resolves for it stays the envelope's `tabs-landing-page` (L2 §6).
    expect(entry?.target, 'the CONTENT it contains is the authored landing page, not the id').toBe('tabs-landing-page')

    // ONE MEMBER, NOT A SECOND SEAT: a commit under that id UPDATES the landing entry in place.
    expect(record.commit(row('landing', { label: 'updated', lastActiveAt: '2026-11-02T00:00:00.000Z' })).status).toBe('committed')
    expect(reading().order, 'the same id is one member and not a second seat').toEqual(['landing'])
    expect(reading().rows, 'and the record holds exactly the one row it held before').toHaveLength(1)
    expect(reading().rows[0]?.label).toBe('updated')

    // AND THE EMPTY SEQUENCE STILL NEVER SURVIVES: removing the landing entry as the record's last tab is answered
    // `committed` and the repair re-mints it — with the fresh row's own defaults, which is why the label is the id again.
    expect(record.remove('landing').status, 'the removal is a committed act').toBe('committed')
    const after = reading()
    expect(after.order, 'the repair re-minted the landing entry rather than leaving the record empty').toEqual(['landing'])
    expect(after.rows[0]?.label, 'and it is the minted row, not the updated one').toBe('landing')
    expect(after.landing, 'the witness follows the re-minted entry').toBe('landing')
  })

  it('a removal of a tab the record does not hold is the store\'s own SUCCESS, not a refusal', () => {
    record.commit(row('tab-1'))
    expect(record.remove('never-was').status).toBe('committed')
    expect(reading().order).toEqual(['landing', 'tab-1'])
  })

  it('`commit` UPDATES a tab the record already seats, so the same id is one member and not a second seat', () => {
    record.commit(row('tab-1', { label: 'first' }))
    record.commit(row('tab-1', { label: 'second' }))
    const { order, rows } = reading()
    expect(order).toEqual(['landing', 'tab-1'])
    expect(rows).toHaveLength(2)
    expect(rows.find((each) => each.id === 'tab-1')?.label).toBe('second')
  })

  it('the record SURVIVES a restart of the instance, because it is written through the store\'s own file tier', () => {
    record.commit(row('tab-1', { label: 'kept' }))
    const path = join(dir, PROFILE_FILE)
    holder = null
    // A SECOND instance over the same file: the same boot route, the same declarations (D-65).
    let second: TabsRecordStore | null = null
    const { delivery: secondDelivery } = deliveries()
    const store = createProfileStore({
      filePath: path,
      constraints: tabsConstraintDeclarations(() => second).map((declaration) => ({
        address: declaration.address,
        id: declaration.id,
        constraint: declaration.constraint,
      })) as never,
      listeners: [...secondDelivery.entries],
    })
    second = store as unknown as TabsRecordStore
    const reopened = createTabsRecord({ store: second, delivery: secondDelivery })
    const answer = reopened.read()
    expect(answer.status).toBe('committed')
    if (!('rows' in answer)) throw new Error('a reopened record must answer a reading')
    expect([...answer.order]).toEqual(['landing', 'tab-1'])
    expect(answer.rows.find((each) => each.id === 'tab-1')?.label).toBe('kept')
  })

  // ═══════════════ THE CHANGE DELIVERY (L2 §2's fourth route, design §5; D-70) — the push that shipped as a name ═══════════════

  it('THE DELIVERY HAPPENS AND THE WITHDRAWAL IS LOCAL — **RE-GRAINED FOR `D-219`: THE LIVE LISTENER AT `[\'tabs\']` IS THE CONSTRUCTION\'S `cfg.listeners` ENTRY, AND `subscribe` IS THE FAN-OUT THAT NO LONGER RUNS A STORE VERB** (`D-71`, `D-83`, `docs/L3/store-tabs-record/delivery.md` §2–§3). A `commit` fires the handler ONCE, a `remove` fires it AGAIN, and the release STOPPES that handler — a counter, because a fan-out nobody reaches fires nothing, silently', () => {
    // THE COUNT IS THE WHOLE MEASUREMENT: the module's `subscribe` once installed nothing at all — it asked for `['tabs']`
    // while a pre-`1.7.0` package refused a listener beside a constraint there, and swallowed the refusal — so the counter
    // read `0` while every one of these acts answered `committed` (D-70). The first `commit` below is also the one that runs
    // `exactly-one-active`'s repair, whose write joins the same commit and is therefore ONE delivery and not two.
    // **THE BASELINE IS THE CREATION'S OWN DELIVERY**: the construction's repairs already fired the adopted entry before
    // `open()` answered (`D-219`), so a row reading the sink's TOTAL would be counting the boot's act as this row's.
    const queued = sunk.length
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    expect(record.commit(row('tab-1')).status, 'the commit that fires the delivery commits').toBe('committed')
    expect(delivered, 'a commit of a NEW tab delivers exactly one notification').toBe(1)
    expect(record.remove('tab-1').status, 'the removal that fires it again commits').toBe('committed')
    expect(delivered, 'a `remove` delivers exactly one more — the removal is a committed change of the record like any other').toBe(2)
    // **AND THE SINK AGREES WITH THE COUNTER, WHICH IS THE CLAIM `docs/L3/store-tabs-record/delivery.md` §2 MAKES FOR THE TWO
    // HALVES OF ONE THING**: the fan-out runs before the sink on every delivery, so a construction that fired its entry
    // without fanning out — or fanned out without reaching the app's queue — would red one of the two readings here.
    expect(sunk.length - queued, 'the sink was handed exactly the two deliveries the fan-out counted: two readings of one event').toBe(2)
    expect(sunk.slice(queued).every((address) => address[0] === 'tabs'), 'and each of them carries an ADDRESS rooted at `[\'tabs\']` — the leaf the removal targeted, never the record').toBe(true)
    off()
    expect(record.commit(row('tab-2')).status, 'a commit after the withdrawal still commits').toBe('committed')
    expect(delivered, 'the withdrawal is the answer: no delivery follows it').toBe(2)
  })

  it('THE CONTROL FOR THAT ROW: a store write that touches NO PART of the record does not notify, and the SAME subscription then delivers on a commit — so the zero above is not a dead subscription', () => {
    // WITHOUT THIS ROW the delivery row could pass for the wrong reason: a listener bound at an address the write touches
    // anyway would deliver on the wrong act, and a subscription that had silently died would deliver on nothing.
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    let delivered = 0
    record.subscribe(() => {
      delivered += 1
    })
    // A `mem` write at an address the record does not name: the store answers its own receipt and fires no trigger.
    store.write(['elsewhere'] as never, 'mem', { note: 'not the record' })
    expect(delivered, 'a write outside the record does not notify: the listener is bound to the record, not to the store').toBe(0)
    // AND THE POSITIVE HALF ON THE SAME SUBSCRIPTION, so a subscription that never registered cannot pass this row.
    expect(record.commit(row('tab-1', { label: 'one', lastActiveAt: '2026-11-01T00:00:00.000Z' })).status).toBe('committed')
    expect(delivered, 'and the very same subscription delivers when the record does move').toBe(1)
  })

  // ═══════════════ THE PATTERN THIS CHANGE RESTS ON (D-71): ONE ADDRESS, BOTH KINDS ═══════════════

  it('THE PATTERN THE WHOLE CHANGE RESTS ON: a LIVE LISTENER and ALL SIX pairs stand at ONE address — `[\'tabs\']` — where one whole-record write there ASKS the pairs and DELIVERS the listener exactly once, the write record names the listener AT `[\'tabs\']` (the address it was BOUND at, guide §6.4), and a write a pair REFUSES delivers NOTHING', () => {
    // ITS OWN INSTANCE, BUILT THE WAY THE BOOT BUILDS IT, WITH ITS OWN INSTRUMENT: the six declarations are WRAPPED so the
    // row can see the pass ask each pair — an observation, not an inference from the record the act leaves — and the
    // wrapper returns the module's own answer untouched, so the machinery measured here is the module's and not a
    // stand-in for it.
    const instant = mkdtempSync(join(tmpdir(), 'tabs-one-address-'))
    let bound: TabsRecordStore | null = null
    const asked: string[] = []
    // **AND ITS LISTENER IS THE CONSTRUCTION'S ENTRY, WHICH IS THE ROW'S WHOLE SUBJECT SINCE `D-219`**: the live listener this
    // row measures standing beside the six pairs is adopted by `cfg.listeners` rather than taken by `subscribe`, and the
    // write's own record names it at the SAME address for the same reason (`guide §6.4`).
    const { delivery: hereDelivery, sunk: hereSunk } = deliveries()
    const store = createProfileStore({
      filePath: join(instant, PROFILE_FILE),
      constraints: tabsConstraintDeclarations(() => bound).map((declaration) => ({
        address: declaration.address,
        id: declaration.id,
        constraint: (context: unknown) => {
          asked.push(declaration.id)
          return declaration.constraint(context)
        },
      })) as never,
      listeners: [...hereDelivery.entries],
    })
    bound = store as unknown as TabsRecordStore
    try {
      const recordHere = createTabsRecord({ store: bound, delivery: hereDelivery })
      // ALL SIX PAIRS ARE AT THE ONE ADDRESS, read off the store's own registered-pair read — where `address` is the
      // pair's own SET, so one address reads `[['tabs']]` (`guide §7.4`). **THE SIXTH IS `order-names-its-tabs`** (`D-83`):
      // the seat pair, listed second because it is the precondition of the four field pairs' SUBJECT, as `tabs-must-stand`
      // is the precondition of their existence.
      expect(store.constraints().map((pair) => [pair.id, pair.address])).toEqual([
        ['tabs-must-stand', [['tabs']]],
        ['order-names-its-tabs', [['tabs']]],
        ['exactly-one-active', [['tabs']]],
        ['tab-has-title', [['tabs']]],
        ['tab-has-content', [['tabs']]],
        ['tab-has-lastActiveAt', [['tabs']]],
      ])
      let delivered = 0
      const off = recordHere.subscribe(() => {
        delivered += 1
      })
      const stamp = '2026-11-01T00:00:00.000Z'
      const intent = {
        order: ['landing', 'tab-1'],
        'landing': {
          id: 'landing',
          target: 'tabs-landing-page', // THE CONTENT REFERENCE, unmoved by the id change (D-76)
          active: false,
          label: 'landing',
          lastActiveAt: stamp,
        },
        'tab-1': { id: 'tab-1', target: 'page://tab-1', active: true, label: 'one', lastActiveAt: stamp },
      }
      asked.length = 0
      // THE ONE ACT BOTH KINDS ARE REACHED BY — a whole record at `['tabs']`, written through the store so this row can read
      // the write's OWN record, which `commit` answers nothing of (`store's write receipt`: `{op, watched, triggered}`).
      const receipt = store.write(['tabs'] as never, 'file', intent)
      expect(asked, 'the pass ASKS every pair standing at that one address').toEqual([
        'tabs-must-stand',
        'order-names-its-tabs',
        'exactly-one-active',
        'tab-has-title',
        'tab-has-content',
        'tab-has-lastActiveAt',
      ])
      // THE TRIGGERED ENTRY IS THE MEASUREMENT, AND IT IS WHAT A REVERT CANNOT SURVIVE — TWICE OVER: `TriggerPair.address` is
      // the address the listener was BOUND at and NEVER the address the write targeted (`guide §6.4`), and the minted handle
      // spells that same address after its `@` (`handleFor`). A listener moved back to `['tabs','order']` therefore reads
      // `['tabs','order']` and `tabs-record:<n>@tabs/order` here — measured 2026-11-01 on the published `1.7.0`, and on the
      // reverted tree. **THE ORDINAL IS NOT PINNED**: `issuance` is the module's and moves with every subscription the file
      // made before this row, which is the minting working and not a fact this row needs.
      const listenerEntries = receipt.triggered.filter((entry) => entry.handle.startsWith('tabs-record:'))
      expect(listenerEntries, 'the triggered set names the listener beside the six pairs, both kinds in one list').toHaveLength(1)
      expect(listenerEntries[0]?.address, 'and it names the ONE address both kinds stand at').toEqual(['tabs'])
      expect(listenerEntries[0]?.handle, 'and the handle spells the same address after its `@`').toMatch(/^tabs-record:\d+@tabs$/)
      expect(delivered, 'AND THE DELIVERY IS EXACTLY ONE per committed change, the pairs\' asking being no delivery at all').toBe(1)

      // **THE OTHER HALF: A WRITE A PAIR REFUSES DELIVERS NOTHING.** The refusing pair is this ROW's instrument and not the
      // module's — all six of the module's pairs REPAIR rather than refuse, so a refusal has to be asked for — and it is
      // also the HANDLE rule's second demonstration: it is added at `['tabs']` WHERE A LIVE LISTENER STANDS, and it is
      // accepted because its `id` is not that listener's handle (`guide §7.3` item (ii): multiple pairs at one address are
      // lawful).
      //
      // **THE INSTRUMENT'S FAULT HAS TO BE ONE NO REPAIR TOUCHES, AND THAT IS WHAT DECIDES WHICH FAULT IT IS** (`D-156`).
      // This row used to mark the record with a STRAY OWN KEY — `note: 'refuse-me'` — and rely on nothing repairing it,
      // which was true until the seat pair gained its SIXTH CLAUSE: that clause refuses a key the seat does not name AND
      // its repair DROPS it, so the pair was asked, the repair landed inside the caller's own commit, the re-run read the
      // corrected record, this instrument passed, NOTHING THREW and the delivery count below was measuring a write that
      // had been ANSWERED. **THE GENERAL FORM OF THAT TRAP IS THE POINT OF THE RE-GRAIN: every one of the six clauses has
      // a repair, so a REPAIRED fault is not a REFUSED write, and no fault this module can name is unrepairable** — only a
      // pair outside the module can refuse.
      //
      // So the marker moves INSIDE a row, into a member the record's own admission carries and NO repair rewrites: a
      // `label`. `tab-has-title` passes it because it is a non-blank string, and `healedFamily` copies every row member
      // through, so the marker survives every repair that could run and this instrument still refuses on the re-run. **AND
      // THE INSTRUMENT'S OWN ARM IS THE UNREPAIRABLE ONE — `{message}` WITH NO `repair`** (`guide §7.6`'s closed three-arm
      // set), which is what makes the store REFUSE the write instead of correcting it; the count below is then a
      // measurement of zero rather than of a repair.
      store.addConstraint({ address: ['tabs'] as never, id: 'no-marked-title' } as never, ((context: unknown) => {
        const value = (context as { value?: unknown }).value
        const held = value !== null && typeof value === 'object' ? Object.values(value as Record<string, unknown>) : []
        const marked = held.some((row) => row !== null && typeof row === 'object' && !Array.isArray(row) && (row as Record<string, unknown>)['label'] === 'refuse-me')
        return marked ? { message: 'no tab of this record may be titled "refuse-me"' } : true
      }) as never)
      let refusal: unknown = null
      // THE WRITE IS OTHERWISE THE ONE THAT WAS JUST COMMITTED: the marker is the ONLY difference, so the refusal is about
      // the instrument's sentence and not about a record some other pair would have corrected.
      const markedIntent = {
        ...intent,
        'tab-1': { ...intent['tab-1'], label: 'refuse-me' },
      }
      try {
        store.write(['tabs'] as never, 'file', markedIntent)
      } catch (caught) {
        refusal = caught
      }
      expect((refusal as { status?: string }).status, 'the pair REFUSES, and the pass throws the store\'s own form').toBe('ConstraintPassRefused')
      expect(delivered, 'and the listener standing at that same address delivers NOTHING: the pair is asked, then the thrown form, and no delivery follows a refused write').toBe(1)
      expect(recordHere.read().status, 'while the record stands exactly as the committed write left it').toBe('committed')
      // AND THE MARKER DID NOT LAND: a refused write moves no state (`guide §5.4`), so the row still carries the title the
      // committed write gave it. Without this half the count above would be consistent with a write that had silently
      // landed and been re-read.
      const after = recordHere.read()
      if (!('rows' in after)) throw new Error('the refused write must leave a record that reads')
      expect(after.rows.find((each) => each.id === 'tab-1')?.label, 'the refused title landed nowhere').toBe('one')
      off()
    } finally {
      bound = null
      rmSync(instant, { recursive: true, force: true })
    }
  })

  // ═══════════════ `repaired` — DERIVED FROM THE STANDING RECORD, NOT PREDICTED (L2 §3, design §4; D-70) ═══════════════

  it('`repaired: true` — a commit that makes TWO tabs active is answered `committed` WITH `repaired`, and the record shows what the repair did: the second active tab deactivated and the active seat moved to the caller\'s own referent', () => {
    // **THE GLOSS IS RE-GRAINED AND EVERY ASSERTION BELOW STANDS** (`D-158`, design §8/§11): what `standsAsIntended`
    // compares is no longer the composed record this act used to write — it is the CREATION EXPECTATION, the pre
    // reading's `order` plus the id the seat did not already name and its rows plus the admitted row, composed and never
    // written (§4, §8). The trace that makes the answer `repaired` is the batch's contract read at its sites: the leaf
    // write leaves `tab-2` UNSEATED, so only the seat pair can refuse first — `exactly-one-active` would pass, because an
    // unseated row is invisible to a seat-seated view — its `'seat'` repair APPENDS the id preserving both flags, and on
    // that record `exactly-one-active` refuses and keeps §7's arm (i), the WRITTEN referent. **Which tab the engine keeps
    // is therefore §7's choice and not this act's**: the assertion below reads the record the repair left.
    record.commit(row('tab-1', { label: 'one', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    const answer = record.commit(row('tab-2', { label: 'two', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    expect(answer.status, 'a repaired commit is `committed`, never `refused`').toBe('committed')
    // ASSERTED BY MEMBERSHIP AND VALUE: the member is a signal, and an answer that merely carried `repaired: false` would
    // pass a `toBe(false)`-shaped row while saying nothing.
    expect('repaired' in answer, 'the answer CARRIES the member').toBe(true)
    expect(answer.repaired, 'and it says a repair ran').toBe(true)
    const { rows, landing } = reading()
    expect(rows.find((each) => each.id === 'tab-1')?.active, 'the record shows the repair: the first active tab is deactivated').toBe(false)
    expect(actives(), 'and exactly one tab is active after it').toEqual(['tab-2'])
    expect(landing, 'and the landing seat moved with the surviving active tab').toBe('tab-2')
  })

  it('AND ON THE SAME BATTERY, A CLEAN COMMIT CARRIES NO `repaired` AT ALL: `commit` answers `{ status: \'committed\' }` and nothing else — the member is OMITTED, never answered `false`', () => {
    // THE ROW THAT STOPS THE ONE ABOVE FROM BEING VACUOUS. **AND ITS GLOSS MOVED WITH THE COMPARATOR, NOT WITH ITS
    // ASSERTIONS** (`D-158`): this act is a CREATION of a new id, so the seat repair DOES run — the leaf write leaves
    // `tab-2` unseated and the repair appends it — and the answer is bare anyway, because that append IS what the
    // creation expectation names: the pre reading's `order` plus this id, its rows plus this admitted row. **A repair
    // whose correction is the act's own meaning is not something `D-70`'s member reports**; the member appears where a
    // FIELD DEFAULT had to be filled or a flag or a stray the act did not name moved. The row supplies all three fields
    // on purpose, so nothing else can be the difference. A derivation that answered `repaired` unconditionally — or that
    // compared the two records by raw `JSON.stringify` and so reported a difference in MEMBER ORDER — fails here.
    record.commit(row('tab-1', { label: 'one', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    const answer = record.commit(row('tab-2', { active: false, label: 'two', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    expect(answer.status).toBe('committed')
    expect(Object.keys(answer), 'the clean arm is exactly `status`').toEqual(['status'])
    expect('repaired' in answer, 'and the member is absent, not `false`').toBe(false)
    expect(reading().order, 'the control half: the seat repair appended the id, and the record is the creation the act meant').toEqual(['landing', 'tab-1', 'tab-2'])
    expect(actives(), 'and the active row is the one that stood: the act named no successor and needed none').toEqual(['tab-1'])
  })

  it('AND THE SAME DERIVATION ON `remove`: a removal whose repair seats a survivor carries `repaired`, while a removal nothing repairs is `{ status: \'committed\' }` alone', () => {
    // BOTH HALVES IN ONE ROW because it is ONE derivation applied at the module's other write site. **THE GLOSS IS
    // RE-GRAINED AND THE ASSERTIONS ARE NOT** (`D-156`, §8): what this row used to describe was the act's own COMPOSED
    // intent — "removing the ACTIVE tab leaves zero active and the repair's survivor re-seats the `landing` member this act
    // omitted". The removal composes NOTHING now: it is one `delete(['tabs', id])`, so `standsAsIntended`'s expectation is
    // the DELETE-ONLY one — the pre reading's `order` and rows MINUS the id, every flag untouched. Read through that: an
    // INACTIVE tab's removal leaves exactly the expectation, because the seat repair's correction (`order` without the id,
    // flags as they stood) IS what the removal meant; the ACTIVE tab's removal leaves ONE ACTIVE ROW WHERE THE EXPECTATION
    // HAS NONE, and that difference is the whole signal. **Which survivor the engine re-seats is §7's choice and not this
    // act's** — the single survivor here makes the assertion name a membership and no precedence (§7's precedence is
    // measured where its subject is that choice: `remove` of the active tab, chosen by the removed entry's pre-position,
    // in the crossing describe above).
    record.commit(row('tab-1', { label: 'one', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    record.commit(row('tab-2', { active: false, label: 'two', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    const clean = record.remove('tab-2')
    expect(clean.status).toBe('committed')
    expect('repaired' in clean, 'removing a tab nothing has to repair is a clean act').toBe(false)
    const repaired = record.remove('tab-1')
    expect(repaired.status, 'the removal of the ACTIVE tab is still `committed`').toBe('committed')
    expect('repaired' in repaired && repaired.repaired === true, 'and it names the repair that seated the survivor').toBe(true)
    expect(actives(), 'the record shows it: the survivor is active').toEqual(['landing'])
  })

  // ═══════════════ THE ANSWER THE ENGINE IS HANDED (D-72) ═══════════════

  it('THE REPAIR\'S RETURN, READ AT THE ENGINE AND NOT INFERRED FROM THE RECORD: a commit that triggers `exactly-one-active`\'s repair is instrumented at the DECLARATION, so the value the kernel receives is read — and it is the credited arm `{ok: true, op}`, `op` carrying a non-empty `opId`, never `undefined` — while the record shows the write that answer is about did land', () => {
    // **THE INSTRUMENT SITS ONE LEVEL DEEPER THAN THE ONE-ADDRESS ROW ABOVE.** That row wraps each declaration's `constraint`
    // to see the pass ASK it; this one wraps the `repair` that answer carries, so the ENGINE invokes the MODULE'S OWN repair
    // through the wrapper — inside the attempt's own commit, with the context it would have been handed anyway, `pending`
    // included, which is what makes the repair's write JOIN the commit — and the return the kernel credits is recorded.
    // Nothing is stubbed and the answer is returned unchanged: what this row measures is the module's `repairAnswer`, reached
    // by the route the app reaches it by, which is the only route there is — `commit` never sees a repair's return.
    const instant = mkdtempSync(join(tmpdir(), 'tabs-repair-answer-'))
    let bound: TabsRecordStore | null = null
    const answers: TabsRepairAnswer[] = []
    const { delivery: repairDelivery } = deliveries()
    const store = createProfileStore({
      filePath: join(instant, PROFILE_FILE),
      constraints: tabsConstraintDeclarations(() => bound).map((declaration) => ({
        address: declaration.address,
        id: declaration.id,
        constraint: (context: unknown): TabsConstraintAnswer => {
          const answer = declaration.constraint(context)
          // NARROWED ON THE MEMBER AND ON ITS VALUE: the unrepairable arm spells `repair?: never` (so a shape carrying one is
          // refused at the type), which leaves `repair` optional on the narrowed object — a value check settles it, and
          // settles it without a cast.
          if (typeof answer !== 'object' || !('repair' in answer) || answer.repair === undefined) return answer
          const moduleRepair: TabsRepair = answer.repair
          return {
            message: answer.message,
            repair: (repairContext: unknown): TabsRepairAnswer => {
              const reply = moduleRepair(repairContext)
              answers.push(reply)
              return reply
            },
          }
        },
      })) as never,
      listeners: [...repairDelivery.entries],
    })
    bound = store as unknown as TabsRecordStore
    try {
      const here = createTabsRecord({ store: bound, delivery: repairDelivery })
      // THE COMMIT THAT TRIGGERS A REPAIR: the existence pair minted the record with the landing ENTRY SEATED AND ACTIVE, so
      // this row's tab makes two actives — `exactly-one-active` answers `{message, repair}` and the engine invokes it.
      expect(here.commit(row('tab-1')).status, 'the commit carrying the repair still commits').toBe('committed')
      expect(answers.length, 'the engine INVOKED the repair — so its return was reached at all, and not only declared').toBeGreaterThan(0)
      for (const answer of answers) {
        // THE ARMS, MEMBER BY MEMBER. `ok` IS `true` AND IS PRESENT: the whole subject of D-72 is the repair that answered
        // nothing, and an answer read back here as `undefined` reds on the first expectation rather than passing quietly.
        expect(answer.ok, 'the repair answered its CREDITED arm').toBe(true)
        if (!answer.ok) continue
        const op: unknown = answer.op
        if (op === null || typeof op !== 'object') throw new Error('the credited arm carries no op record')
        const opId = 'opId' in op ? op['opId'] : undefined
        expect(typeof opId === 'string' && opId.length > 0, 'and the op its own write landed carries a non-empty `opId` — the one thing `landedOp` credits').toBe(true)
      }
      // AND THE WRITE THAT ANSWER IS ABOUT LANDED, so the credited arm is not a claim about a pass that rolled back. Read
      // THROUGH THIS ROW'S OWN record and not the battery's module-level one, which belongs to `open()`'s instance.
      const read = here.read()
      if (!('rows' in read)) throw new Error('the repaired record must answer a reading')
      expect(read.rows.filter((each) => each.active === true).map((each) => each.id), 'the record shows the repair the answer was about').toEqual(['tab-1'])
    } finally {
      bound = null
      rmSync(instant, { recursive: true, force: true })
    }
  })

  // ═══════════════ THE COMMIT CARRIER, AT RUN TIME (D-73) ═══════════════

  it('THE CARRIER IS THE PACKAGE\'S OWN CLASS TEST, CASE FOR CASE: the six-member landing record a repair is handed is ADMITTED, and every form the fourth position refuses — no own `pending`, an inherited one, a present `undefined`, an array, `null`, a `Proxy` — is refused HERE rather than left to a store `TypeError`', () => {
    // WHY THIS ROW EXISTS AT ALL: the type-level rows above pin the SIGNATURE; this one pins the TEST the signature stands on,
    // because a guard weakened to `plain(value)` alone would still compile and would hand the store a value the position
    // refuses — a `TypeError` thrown out of a repair instead of the failed arm the module answers. The arms below are the
    // class test's, read off the installed `1.7.0`'s own predicate (`commitPositionRefusal`), including the two that need care:
    // `pending` must be an OWN member (a prototype's does not count, the package reads `Object.hasOwn`) and a `Proxy` is
    // refused BEFORE a member is read from it.
    expect(
      isCommitCarrier({ address: ['tabs'], id: 'exactly-one-active', op: {}, tier: 'file', value: {}, pending: [] }),
      'the six-member `{address, id, op, tier, value, pending}` record a LANDING repair is handed is admitted'
    ).toBe(true)
    expect(isCommitCarrier({ pending: [{ handle: 'tab-has-title', address: ['tabs'] }] }), 'and one whose `pending` carries pair entries').toBe(true)
    expect(isCommitCarrier({}), 'a record with no `pending` member is outside the position').toBe(false)
    expect(isCommitCarrier({ pending: undefined }), 'and one carrying a PRESENT `undefined` is outside it too').toBe(false)
    expect(isCommitCarrier(Object.create({ pending: [] })), 'an INHERITED `pending` is not an own member, which is `Object.hasOwn` read back').toBe(false)
    expect(isCommitCarrier([]), 'an array is outside the position whatever it carries').toBe(false)
    expect(isCommitCarrier(null), '`null` is outside the position').toBe(false)
    expect(isCommitCarrier('pending'), 'and so is a primitive').toBe(false)
    expect(isCommitCarrier(new Proxy({ pending: [] }, {})), 'a `Proxy` is refused before a member is read, as the store refuses it').toBe(false)
    expect(isCommitCarrier({ pending: 'not-a-list' }), 'and a `pending` that is present but not a pair list is refused rather than carried').toBe(false)
    // THE JOIN ITSELF IS ALREADY MEASURED, ON THE ROWS ABOVE AND NOT HERE: the repair-answer row reads the op the kernel
    // CREDITS — `landedOp` credits an op absent from the attempt's own and strictly above the one the repair was invoked for,
    // which only a JOINED write can produce — and the delivery row counts ONE notification for a commit that ran a repair,
    // which a second commit could not deliver. A row here driving its own store would restate those two with a third
    // instrument, so this row measures the one fact they cannot: the carrier's own admission.
  })
})

/* ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * THE `order` SEAT AT THE CREATION INSTANT — THE SIXTH DECLARATION (`D-83`)
 *
 * **WHAT WAS MEASURED ON THE BATCH OF FIVE, ONE FRESH INSTANCE PER ARM, OVER A PROFILE WRITTEN BEFORE THAT INSTANCE WAS
 * CONSTRUCTED** (`D-83`, 2026-11-02): the four pairs that judge the record read through the boot's holder, and the holder
 * is bound only after `createProfileStore` answers — so they ABSTAIN at the creation instant, and a record the FILE
 * brought that the seat cannot describe stood exactly as it arrived until some later write happened to repair it. Each
 * arm's `read()` immediately after the construction answered, for a record holding `tab-1` with no `order`: `order: []`,
 * `rows: []`; for `order: 'x'`: the same; for `order: []`: the same; for `order: ['ghost']`: the same; for
 * `{order: ['landing'], landing: 'landing'}` — the LEGACY STRING SEAT the module's own `LANDING_ENTRY_KEY` docblock warns
 * an old file may still carry — `order: ['landing']` with `rows: []`; for `order: ['landing', 'ghost']`: **one row under a
 * seat naming two**, a read naming a tab the record did not hold; and for `order: ['landing', 'landing']`: **the same row
 * counted twice**, which no legal act could then recover from — a later `commit` was REFUSED `ConstraintPassRefused`,
 * *"the pair tabs#exactly-one-active violated a re-run and its repair had already been applied"*, because both seats named
 * the one held row and the repair had nothing to choose between.
 *
 * **THE ROWS BELOW DRIVE THE INSTANT THE PAIR EXISTS FOR AND NOT A WRITE**, because a write-time row cannot see it: the
 * profile is written by a store carrying NO pair at all, and the batch is handed to a SECOND store over that same file —
 * the shape a boot sees when the file already carries a record.
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

const SEAT_STAMP = '2026-11-02T00:00:00.000Z'
/** The record's landing row AS THE FILE HOLDS IT, with a label and a stamp of its own so a repair that DISCARDED it and
 *  re-minted the entry is distinguishable from one that dropped the seat it could not justify. */
const fileLandingRow = { id: 'landing', target: 'tabs-landing-page', active: true, label: 'kept-from-the-file', lastActiveAt: SEAT_STAMP }
const fileTabRow = { id: 'tab-1', target: 'page://tab-1', active: false, label: 'one', lastActiveAt: SEAT_STAMP }

interface SeatedOn {
  readonly store: TabsRecordStore
  /** **THE BOOT'S DELIVERY**, built before its store and adopted by it (`D-219`): a row that builds a SECOND record over this
   *  instance hands it this, because the registration is the construction's and the fan-out is the record's. */
  readonly delivery: TabsDelivery
  readonly read: () => { order: string[]; landing: string; rows: TabsRecordRow[] }
  readonly standing: () => unknown
  readonly close: () => void
}

/** **THE BOOT'S OWN SHAPE, DRIVEN FROM A FILE THIS FILE WROTE**: a store with NO pair writes the state (so it is the
 *  file's, not this module's), then this module's batch is handed to a SECOND store over that path, and the handle is
 *  bound only after the construction — exactly as `src/main/main.ts` binds its holder. */
const seatedOn = (record: unknown, declared?: readonly TabsConstraintDeclaration[]): SeatedOn => {
  const scratch = mkdtempSync(join(tmpdir(), 'tabs-order-seat-'))
  const path = join(scratch, PROFILE_FILE)
  createProfileStore({ filePath: path }).write(['tabs'] as never, 'file', record as never)
  let bound: TabsRecordStore | null = null
  const batch = declared ?? tabsConstraintDeclarations(() => bound)
  // **AND THE SECOND BOOT ADOPTS ITS OWN DELIVERY'S ENTRY** (`D-219`): a boot has one whether or not a row reads it, and a
  // fixture that left it out would model a construction the app does not have.
  const { delivery: seatDelivery } = deliveries()
  const store = createProfileStore({
    filePath: path,
    constraints: batch.map((declaration) => ({ address: declaration.address, id: declaration.id, constraint: declaration.constraint })) as never,
    listeners: [...seatDelivery.entries],
  })
  bound = store as unknown as TabsRecordStore
  const seated = createTabsRecord({ store: bound, delivery: seatDelivery })
  return {
    store: bound,
    delivery: seatDelivery,
    read: () => {
      const answer = seated.read()
      if (!('rows' in answer)) throw new Error('a record repaired at construction must answer a reading')
      return { order: [...answer.order], landing: answer.landing, rows: [...answer.rows] }
    },
    standing: () => store.read(['tabs'] as never),
    close: () => {
      bound = null
      rmSync(scratch, { recursive: true, force: true })
    },
  }
}

describe('store-tabs-record · the `order` SEAT at the creation instant (D-83)', () => {
  it('THE CREATION INSTANT IS WHERE THE SIXTH PAIR IS TESTED — the pass ASKS it there with the RECORD as its `value` and `tier: null`, which is the reading the five wrapped pairs cannot give; and a seat naming a tab the record does not hold is REPAIRED at that instant, into the corrected order and into a LEGAL record', () => {
    // THE INSTRUMENT WRAPS THE DECLARATIONS so the row reads the CONTEXT the engine hands, rather than inferring that the
    // pair ran from a record it left. `tier` is the discriminator the guide's two instants actually differ in
    // (`D-83`: measured `tier: null` at the construction and `'file'` at a write), and `value` is `readCurrent` at the
    // pair's OWN address — the record itself, at `['tabs']`.
    const scratch = mkdtempSync(join(tmpdir(), 'tabs-seat-asked-'))
    const path = join(scratch, PROFILE_FILE)
    createProfileStore({ filePath: path }).write(['tabs'] as never, 'file', { order: ['landing', 'ghost'], landing: fileLandingRow } as never)
    let bound: TabsRecordStore | null = null
    const seen: { tier: unknown; holds: unknown; order: unknown }[] = []
    const { delivery: askDelivery } = deliveries()
    const store = createProfileStore({
      filePath: path,
      constraints: tabsConstraintDeclarations(() => bound).map((declaration) => ({
        address: declaration.address,
        id: declaration.id,
        constraint: (context: unknown) => {
          if (declaration.id === 'order-names-its-tabs') {
            const held = (context as { tier?: unknown; value?: Record<string, unknown> }).value ?? {}
            seen.push({ tier: (context as { tier?: unknown }).tier, holds: typeof held, order: held['order'] })
          }
          return declaration.constraint(context)
        },
      })) as never,
      listeners: [...askDelivery.entries],
    })
    bound = store as unknown as TabsRecordStore
    try {
      expect(seen.length, 'the engine ASKS the seat pair at the creation instant — a pair the batch does not carry is asked nowhere, and this row reds on that revert').toBeGreaterThan(0)
      expect(seen[0]?.tier, 'and it is the REGISTRATION instant it is asked at: `tier` is `null` where a write hands the tier').toBeNull()
      expect(seen[0]?.holds, 'and `value` is the VALUE AT ITS OWN ADDRESS — the record — not a seat read off some other path').toBe('object')
      expect(seen[0]?.order, 'the seat it judged first is the one the file brought').toEqual(['landing', 'ghost'])
      // THE RE-RUN IS THE SECOND ASKING, and it reads the CORRECTED family the repair landed — so the answer this body
      // gives over its own repair is `true`, which is what makes the registration stand.
      const last = seen[seen.length - 1]
      expect(last?.order, 'the registration’s own RE-RUN reads the corrected seat the repair wrote, in the same instant').toEqual(['landing'])
      const seated = createTabsRecord({ store: bound, delivery: askDelivery })
      const read = seated.read()
      if (!('rows' in read)) throw new Error('the repaired record must answer a reading')
      expect([...read.order], 'THE CORRECTED ORDER: the dangling id is GONE and the record is read, not merely stored').toEqual(['landing'])
      expect(read.landing, 'and the derived witness names a row the record holds').toBe('landing')
      expect(read.rows.map((each) => each.id), 'ONE row, the one the file held').toEqual(['landing'])
      expect(read.rows.filter((each) => each.active === true).map((each) => each.id), 'exactly one active: the record is LEGAL').toEqual(['landing'])
      expect(read.rows[0]?.label, 'AND THE REPAIR KEPT THE ROW THE FILE HELD — it dropped the seat it could not justify, and did not replace the record').toBe('kept-from-the-file')
      expect(read.rows[0]?.lastActiveAt, 'so its own stamp survives too: a repair that re-minted the entry would write a fresh one').toBe(SEAT_STAMP)
    } finally {
      bound = null
      rmSync(scratch, { recursive: true, force: true })
    }
  })

  // ═══════════════ THE STATES THE FIVE DECLARATIONS LEFT STANDING (D-83's ground measurement) ═══════════════

  it('A RECORD ARRIVING WITH NO `order` AT ALL is repaired at the creation instant INTO ITS OWN ROWS: the seat becomes a sequence of the record’s own tabs — parsed by the record’s OWN KEYS, so `[\'tab-1\']` and not the landing floor — and the seed’s `active: false` is PRESERVED, so ZERO rows read active at the registration instant', () => {
    // **THE RE-GRAIN, AND WHICH CLAUSE MOVES IT** (`D-156`'s H3): rev 13's seat repair parsed the record through
    // `viewFrom`, which walks `order` — so a file holding a row and NO seat parsed to the EMPTY view and the repair took
    // `healedFamily`'s floor branch, minting the landing entry. **That is what this row used to assert, and the reason it
    // gave — "nothing in the file says which member was a tab" — is exactly the clause the BIJECTION falsifies**: under
    // `order ≡ rows` a plain row under an own key IS a tab, and `seatViewFrom` reads the record by its own keys, so the
    // repair SEATS `tab-1` instead of replacing the file's row with the floor. The floor now appears only where NO row
    // survives at all, which is the branch it was always meant to be.
    const seated = seatedOn({ 'tab-1': fileTabRow })
    try {
      expect(seated.read().order, 'the seat stands, and it names the row the file holds — not the floor').toEqual(['tab-1'])
      expect((seated.standing() as Record<string, unknown>)['order'], 'the FILE is what moved: the store holds the corrected seat').toEqual(['tab-1'])
      expect((seated.standing() as Record<string, unknown>)['landing'], 'and NO floor was minted beside it: the key a floor would take is absent').toBeUndefined()
      expect(seated.read().rows.map((each) => each.id), 'the row survives under the seat the repair built — it is the row the file held, not a re-mint').toEqual(['tab-1'])
      expect(seated.read().rows[0]?.label, 'carrying its own label').toBe('one')
      expect(seated.read().rows[0]?.active, 'and its own flag, exactly as the file spelled it').toBe(false)
      // **THE SECOND ASSERTION MOVED WITH THE FIRST, AND FOR THE SAME REASON.** Rev 13's floor row was minted ACTIVE, and was
      // then the record's one active row; `fileTabRow` carries `active: false` and the `'seat'` scope PRESERVES every flag
      // verbatim, so the record now arrives with ZERO actives — which is `exactly-one-active`'s fault and no longer the
      // seat's, the repair-ownership split itself. Nothing has asked that pair yet: at the registration instant the wrapped
      // bodies abstain (the boot binds its holder only after `createProfileStore` answers), which is why the state is
      // readable here rather than already healed.
      expect(seated.read().rows.filter((each) => each.active === true), 'the seed is INACTIVE and the seat scope preserves the flag: ZERO rows read active').toHaveLength(0)
    } finally {
      seated.close()
    }
  })

  it('A RECORD ARRIVING WITH `order: \'x\'` — a leaf where the seat belongs — is repaired at the creation instant; `viewOf` reads such a record as EMPTY, so without this pair the boot answers a record with no tabs over a file that holds one', () => {
    const seated = seatedOn({ order: 'x', landing: fileLandingRow })
    try {
      expect((seated.standing() as Record<string, unknown>)['order'], 'the leaf is replaced by the sequence it should have been').toEqual(['landing'])
      expect(seated.read().rows.map((each) => each.id), 'and the row the file held is still read').toEqual(['landing'])
    } finally {
      seated.close()
    }
  })

  it('A RECORD ARRIVING WITH `order: []` is repaired at the creation instant — the EMPTY sequence cannot name a tab, so it takes the landing floor exactly as `healRecord`’s empty branch mints it', () => {
    const seated = seatedOn({ order: [], landing: fileLandingRow })
    try {
      expect((seated.standing() as Record<string, unknown>)['order']).toEqual(['landing'])
      expect(seated.read().rows.filter((each) => each.active === true).map((each) => each.id)).toEqual(['landing'])
    } finally {
      seated.close()
    }
  })

  it('A RECORD ARRIVING WITH `order: [\'ghost\']` — the seat names a tab the record does not hold — is repaired at the creation instant into the landing floor', () => {
    const seated = seatedOn({ order: ['ghost'], landing: fileLandingRow })
    try {
      expect((seated.standing() as Record<string, unknown>)['order']).toEqual(['landing'])
      expect(seated.read().rows.map((each) => each.id)).toEqual(['landing'])
    } finally {
      seated.close()
    }
  })

  it('A RECORD ARRIVING WITH `order: [\'landing\', \'tab-1\']` WHERE `tab-1` IS ABSENT — the seat names two tabs and the record holds one — is repaired at the creation instant: the dangling id is DROPPED and the row that stands is KEPT', () => {
    // THIS IS THE ARM NO OTHER PAIR CATCHES. `exactly-one-active` counts SURVIVORS — ids the post state both seats and
    // holds — so one held row under a two-name seat is ONE active and the gate PASSES; `healRecord` drops the dangling id
    // when it runs for some other reason, but nothing makes it run. Measured 2026-11-02: with the batch of five, `read()`
    // after the construction answered `order: ['landing', 'tab-1']` with ONE row — a read naming a tab the record did not
    // hold — and stayed that way until a write happened to repair something else.
    const seated = seatedOn({ order: ['landing', 'tab-1'], landing: fileLandingRow })
    try {
      expect((seated.standing() as Record<string, unknown>)['order'], 'the seat is the record’s own tabs and no others').toEqual(['landing'])
      expect((seated.standing() as Record<string, unknown>)['tab-1'], 'and no row was minted for the id the seat named').toBeUndefined()
      expect(seated.read().rows[0]?.label, 'the surviving row is the file’s own, not a re-mint').toBe('kept-from-the-file')
      expect(seated.read().rows.filter((each) => each.active === true).map((each) => each.id), 'one active, so the record is legal').toEqual(['landing'])
    } finally {
      seated.close()
    }
  })

  it('A RECORD ARRIVING WITH THE SEAT REPEATED — `order: [\'landing\', \'landing\']` — is repaired at the creation instant, and THAT is a defect this pair closes rather than a tidy-up: measured on the batch of five, the same row counted twice left the record UNRECOVERABLE — a later `commit` was refused `ConstraintPassRefused`', () => {
    const seated = seatedOn({ order: ['landing', 'landing'], landing: fileLandingRow })
    try {
      expect((seated.standing() as Record<string, unknown>)['order'], 'a sequence is a set here: the id is named once').toEqual(['landing'])
      expect(seated.read().rows, 'and the record holds one row, not the same one twice').toHaveLength(1)
    } finally {
      seated.close()
    }
  })

  it('A RECORD ARRIVING WITH THE LEGACY STRING SEAT — `{ order: [\'landing\'], landing: \'landing\' }` — is repaired at the creation instant: the string is replaced by the ROW the family needs, which `LANDING_ENTRY_KEY` says an old file may otherwise carry until "the first whole-record write"', () => {
    // THE MODULE'S OWN DOCBLOCK NAMES THIS STATE AND HANDS ITS REPAIR TO A LATER WRITE (`LANDING_ENTRY_KEY`, D-76). The pair
    // takes it at the creation instant instead — the same repair, at the instant clause 3 of the convention asks for it.
    const seated = seatedOn({ order: ['landing'], landing: 'landing' })
    try {
      const held = (seated.standing() as Record<string, unknown>)['landing']
      expect(typeof held, 'the retired STRING seat is gone').toBe('object')
      expect((held as Record<string, unknown>)['id'], 'and a ROW stands at that key').toBe('landing')
      expect(seated.read().rows.map((each) => each.id), 'which the record now reads').toEqual(['landing'])
    } finally {
      seated.close()
    }
  })

  it('A RECORD ARRIVING WITH A NON-STRING MEMBER IN THE SEAT — `order: [\'landing\', 7]` — is repaired at the creation instant, because `viewFrom` carries only string ids and would otherwise read the seat as one tab and say nothing about the other', () => {
    const seated = seatedOn({ order: ['landing', 7], landing: fileLandingRow })
    try {
      expect((seated.standing() as Record<string, unknown>)['order']).toEqual(['landing'])
      expect(seated.read().rows.map((each) => each.id)).toEqual(['landing'])
    } finally {
      seated.close()
    }
  })

  // ═══════════════ THE CONTROL: A LEGAL RECORD IS NOT DOUBLE-REPAIRED (so the pair above is not re-writing what another does) ═══════════════

  it('THE CONTROL THAT KEEPS THE PAIR FROM DOUBLE-REPAIRING: a LEGAL record stands BYTE-IDENTICAL through the construction — the sixth pair passes it, writes nothing, and a later commit over it answers `committed` with no `repaired` member at all', () => {
    // WITHOUT THIS ROW the pair could pass every assertion above by rewriting every record it is asked about, which would
    // make `repaired` fire on clean acts and move every row that reads the member. The bytes are compared WHOLE: a repair
    // that rewrote even the same family would leave the store's own image re-ordered or re-stamped, and `repaired: true`
    // on the second half is the same fact read through the module's own derivation.
    const two = seatedOn({ order: ['landing', 'tab-1'], landing: { ...fileLandingRow, active: false }, 'tab-1': { ...fileTabRow, active: true } })
    try {
      expect(two.standing(), 'the record the file brought, byte for byte').toEqual({
        order: ['landing', 'tab-1'],
        'landing': { id: 'landing', target: 'tabs-landing-page', active: false, label: 'kept-from-the-file', lastActiveAt: SEAT_STAMP },
        'tab-1': { id: 'tab-1', target: 'page://tab-1', active: true, label: 'one', lastActiveAt: SEAT_STAMP },
      })
      expect(two.read().order, 'and it reads as the file wrote it').toEqual(['landing', 'tab-1'])
      expect(two.read().rows.filter((each) => each.active === true).map((each) => each.id), 'with the one active the file named').toEqual(['tab-1'])
    } finally {
      two.close()
    }
    // THE SECOND HALF ON A FRESH PROFILE, so the pair is not merely silent over an existing file: the construction mints the
    // landing entry through `tabs-must-stand`, and the seat pair PASSES the record that mint lands — no second write, no
    // re-mint, and a first commit answers exactly `status`.
    const fresh = seatedOn({ order: ['landing'], landing: fileLandingRow })
    try {
      // THE ROW IS INACTIVE ON PURPOSE: a SECOND ACTIVE tab is `exactly-one-active`'s arm and would repair on any batch,
      // which is why it cannot be the reading here — this half asks only what THIS pair left behind.
      const answer = (() => {
        const seated = createTabsRecord({ store: fresh.store, delivery: fresh.delivery })
        // EVERY FIELD IS SUPPLIED, so the only repair that COULD fire is this module's own seat pair: a blank `label` or a
        // missing stamp would hand `tab-has-title`/`tab-has-lastActiveAt` a violation and `repaired` would say nothing about
        // the pair this row is asking about.
        return seated.commit(row('tab-1', { active: false, label: 'two', lastActiveAt: SEAT_STAMP }))
      })()
      expect(answer.status, 'a clean commit over a record this pair passed').toBe('committed')
      expect(Object.keys(answer), 'carries `status` alone: the pair repaired nothing, so nothing differs from the intent').toEqual(['status'])
    } finally {
      fresh.close()
    }
  })
})

/* ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * THE BIJECTION AND THE REMOVAL — the five rows `docs/L3/store-tabs-record/design.md` rev 14 §11 owes with `D-156`'s
 * hunks. **FOUR OF THE FIVE ARE RED ON THE BODY THAT REPLACED IT AND NOT MERELY ABSENT** — the two leaf-write rows, the
 * stray key and the descendant delete each fail on the pre-landing bodies of `D-156`'s H2/H3/H5 — while the fifth (the delete
 * direction) PINS the act's contract at the route: its two `repaired` arms hold on either comparator, and its NON-ACTIVE arm
 * is the one whose bare answer SURVIVES the change, which is exactly why §8 states that case rather than assuming it.
 *
 * **THE RULING IS THE USER'S AND ITS SHAPE IS ONE SENTENCE**: `order` must hold EXACTLY the record's rows, so the seat pair
 * gains its sixth clause, the two repairs split their ownership (the seat's MEMBERSHIP, `healedFamily`'s `'seat'` scope;
 * `exactly-one-active`'s ACTiveness, `'family'`), and the removal stops composing — it is ONE `delete(['tabs', id])`.
 * **THE THREE FAULTS BEHIND IT ARE WHY THESE ROWS EXIST, AND ALL THREE WERE MEASURED**: a descendant delete handed
 * `tabs-must-stand` `value: undefined`, so it minted the floor over the siblings and ERASED them (the row below, `'the
 * descendant delete'`); a leaf row write handed the seat pair THE ROW, so a repair taking its view from the act's value
 * replaced the family with one row (the two leaf-write rows below, which measure the seating AND its hazard control); and
 * the empty-view floor had to survive the registration instant or `storeCreate` refuses (measured by the creation-instant
 * battery above, unchanged).
 *
 * **THE ACTS THESE ROWS DRIVE ARE DRIVEN AT THE STORE — AND FROM `D-158` ONE OF THEM IS THE MODULE'S OWN ACT, NOT A
 * SHAPE A CALLER MIGHT ONE DAY REACH.** Through rev 14 the reason was that `commit` composed the record it writes, so the
 * two shapes `D-156`'s ruling opens — a leaf row write and a descendant delete — were the store's and no route's. **The
 * act IS that write now**: `commit` is ONE `write(['tabs', row.id], 'file', row)` (§3), `remove` is ONE delete, and a row
 * driven through the module could pass on a module that composed something else beside it — which is why each is driven
 * here at the store, at the exact address the module uses, and the module's own route is measured by the creation block
 * below. Every assertion is read at the record afterwards, through the module where the claim is about the module's reading.
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

describe('store-tabs-record · the membership bijection and the removal (D-156)', () => {
  it('A LEAF ROW WRITE SEATS: `write([\'tabs\', newId], \'file\', row)` leaves the row AND the seat NAMING it — the seat repair parses the record by its OWN KEYS — which is the act `commit` NOW IS (D-158): one leaf row write at the tab\'s own leaf, driven here at the store so no composed value can stand in for it', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    // **THE ACT IS DRIVEN AT THE STORE ON PURPOSE, AND THE GLOSS THAT SAID WHY IS RE-GRAINED** (`D-158`, design §11):
    // through rev 14 this row's reason was that the module had no route for a leaf write — "`commit` composes the record
    // it writes". **It has one now**: `commit` is ONE `write(['tabs', row.id], 'file', row)` and nothing else (§3, §8),
    // so this address is the module's own. Reaching it here keeps the row measuring the STORE's behaviour at that
    // address — a row driven through `commit` would pass on a module that composed something else beside it.
    store.write(['tabs', 'tab-9'] as never, 'file', row('tab-9', { active: false, label: 'nine', lastActiveAt: SEAT_STAMP }))
    // **THE SEAT IS THE MEASUREMENT.** Rev 13's repair parsed through `viewFrom`, which walks `order`, so a row the seat did
    // not name was INVISIBLE to it: this write would have left `order: ['landing']` over two rows, answered `committed`, and
    // lost the tab from every reading while the store's own bytes still held it (`D-156`'s H3, the own-key parse).
    expect((store.read(['tabs'] as never) as Record<string, unknown>)['order'], 'the repair APPENDS the id it found a row under').toEqual(['landing', 'tab-9'])
    const after = reading()
    expect(after.order, 'and the module\'s own reading names it too').toEqual(['landing', 'tab-9'])
    expect(after.rows.map((each) => each.id), 'the row stands, admitted field by field').toEqual(['landing', 'tab-9'])
    expect(after.rows.find((each) => each.id === 'tab-9')?.label, 'with the members the caller wrote').toBe('nine')
    // AND THE BIJECTION IS WHAT THE RE-RUN JUDGED: the record the repair left names exactly the rows it holds, so the pair
    // that refused the unseated write passes on the record its own repair wrote — which is why the act answers at all.
    expect(Object.keys(store.read(['tabs'] as never) as Record<string, unknown>).sort(), 'the root holds the seat and its two rows, and nothing else').toEqual(['landing', 'order', 'tab-9'])
  })

  it('THE LEAF-WRITE HAZARD CONTROL: a leaf row write must NOT wipe the family — after `write([\'tabs\', id], row)` the OTHER rows still stand, member for member (red on a body taking its view from the act\'s value, `D-156` fault (b))', () => {
    // **THE HAZARD IS THE ACT'S NOW, NOT A SHAPE A CALLER MIGHT ONE DAY USE** (`D-158`): every `commit` in this tree is
    // this leaf write, so a seat repair that took its view from the act's own value would erase the siblings on every
    // creation rather than on some future route. The assertions are unchanged; only the reason they matter sharpened.
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    record.commit(row('tab-1', { label: 'one', lastActiveAt: SEAT_STAMP }))
    record.commit(row('tab-2', { active: false, label: 'two', lastActiveAt: SEAT_STAMP }))
    const before = store.read(['tabs'] as never) as Record<string, unknown>
    store.write(['tabs', 'tab-9'] as never, 'file', row('tab-9', { active: false, label: 'nine', lastActiveAt: SEAT_STAMP }))
    const after = store.read(['tabs'] as never) as Record<string, unknown>
    // **THE HAZARD, AT ITS OWN SHAPE** (measured on the installed `1.10.0`): a leaf write hands the pair at `['tabs']` the
    // act's OWN VALUE — THE ROW, not the record (`ctx.address` `['tabs','tab-9']`, `ctx.value` the row) — so a seat repair
    // that took its view from that value composed the family out of ONE row and ERASED the two it did not carry. Measured,
    // two tab rows both gone; the act still answered `committed`.
    expect(after['tab-1'], 'the row the leaf write did not carry still stands, member for member').toEqual(before['tab-1'])
    expect(after['tab-2'], 'and so does the second one it did not carry').toEqual(before['tab-2'])
    expect(after['order'], 'the seat holds the ids that stood, in the order they stood, with the new one appended').toEqual(['landing', 'tab-1', 'tab-2', 'tab-9'])
    expect(reading().rows.map((each) => each.id), 'the record READS four rows, where the measured fault left one').toEqual(['landing', 'tab-1', 'tab-2', 'tab-9'])
    expect(actives(), 'and the act moved no flag: the one active the commits left is still the only one').toEqual(['tab-1'])
  })

  it('A STRAY KEY IS DROPPED: an own key outside the seat is REMOVED by the seat repair — the sixth clause, the half of `order ≡ rows` nothing measured before it — and the family\'s OTHER rows survive it', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    record.commit(row('tab-1', { label: 'one', lastActiveAt: SEAT_STAMP }))
    record.commit(row('tab-2', { active: false, label: 'two', lastActiveAt: SEAT_STAMP }))
    const read = store.read(['tabs'] as never) as Record<string, unknown>
    // THE WRITE CARRIES THE RECORD IT JUST READ PLUS ONE KEY THE SEAT DOES NOT NAME — the shape a legacy install's string
    // seat takes, and the shape any caller's composition can take: a SCALAR under an own key. **A PLAIN OBJECT THERE WOULD
    // BE A ROW**, and the same repair would SEAT it instead of dropping it (the row above), which is why the stray value
    // here is a scalar and the claim is a DROP.
    store.write(['tabs'] as never, 'file', { ...read, note: 'a key the seat does not name' })
    const after = store.read(['tabs'] as never) as Record<string, unknown>
    expect('note' in after, 'the stray key is GONE from the record the store holds').toBe(false)
    expect(Object.keys(after).sort(), 'and the root is the seat and its own rows, nothing else').toEqual(['landing', 'order', 'tab-1', 'tab-2'])
    expect(after['order'], 'the seat is untouched: a stray key was never a member').toEqual(read['order'])
    expect(after['tab-1'], 'and every row that stood still stands, member for member').toEqual(read['tab-1'])
    expect(after['tab-2'], 'the second one too — the drop took the stray key and nothing else').toEqual(read['tab-2'])
    expect(actives(), 'with the flags exactly as the commits left them').toEqual(['tab-1'])
  })

  it('A DESCENDANT DELETE MUST NOT MINT: `delete([\'tabs\', id], \'file\')` does not make `tabs-must-stand` write the landing floor over the siblings — the surviving rows stand, and the seat repair has dropped the id', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    record.commit(row('tab-1', { label: 'one', lastActiveAt: SEAT_STAMP }))
    record.commit(row('tab-2', { active: false, label: 'two', lastActiveAt: SEAT_STAMP }))
    const before = store.read(['tabs'] as never) as Record<string, unknown>
    // **THE ACT THE REMOVAL NOW IS, DRIVEN AT THE STORE** (§3, §8). Under the six pairs as they stood, this delete handed
    // `tabs-must-stand` `value: undefined`, its present arm refused, and its repair MINTED THE LANDING FLOOR OVER THE
    // RECORD — measured: one delete of one tab erased the sibling row and re-stamped the floor, and the act answered
    // `committed` (`D-156`'s fault (a)). Absence is now the ROOT's alone to refuse (H5), so a descendant act is not this
    // pair's to judge at all.
    store.delete(['tabs', 'tab-2'] as never, 'file')
    const after = store.read(['tabs'] as never) as Record<string, unknown>
    expect('tab-2' in after, 'the row the act deleted is gone').toBe(false)
    expect(after['order'], 'and the seat the membership repair owns no longer names it').toEqual(['landing', 'tab-1'])
    // **THE FLOOR IS THE THING THAT MUST NOT APPEAR**: a minted record holds ONE row — the landing entry, with the floor's
    // own label and a fresh stamp — so a sibling that survived, member for member, is the whole measurement, and the row
    // count is the same fact read coarsely.
    expect(after['tab-1'], 'the sibling the floor would have ERASED still stands, member for member').toEqual(before['tab-1'])
    expect((after['tab-1'] as Record<string, unknown>)['label'], 'which is its own label and not the floor\'s').toBe('one')
    expect(reading().rows.map((each) => each.id), 'two rows stand where a floor-minting repair would have left one').toEqual(['landing', 'tab-1'])
    expect(actives(), 'and the active row is the one that stood').toEqual(['tab-1'])
  })

  it('THE DELETE DIRECTION, END TO END, WITH THE THREE `repaired` CASES OF §8: a NON-ACTIVE tab\'s removal is BARE `committed` (the seat repair ran and left exactly what the removal meant), the ACTIVE tab\'s removal with a survivor answers `repaired: true`, and the LAST tab\'s removal answers `repaired: true` with the floor standing', () => {
    // **(i) THE NON-ACTIVE TAB — AND THIS IS THE SHARPEST OF THE THREE.** The seat repair RUNS (the `order` seat loses the
    // id inside the same commit) and the answer is STILL bare, because the comparator is the DELETE-ONLY expectation: the
    // pre reading's `order` and rows MINUS the id, every flag untouched. A repair whose correction IS the removal's own
    // meaning is not something `D-70`'s member reports, and reading the member as "did a repair run" would make it say
    // nothing on this arm.
    record.commit(row('tab-1', { label: 'one', lastActiveAt: SEAT_STAMP }))
    record.commit(row('tab-2', { active: false, label: 'two', lastActiveAt: SEAT_STAMP }))
    const clean = record.remove('tab-2')
    expect(clean.status, 'a removal is a committed act').toBe('committed')
    expect(Object.keys(clean), 'and NOTHING had to change beyond it: the member is ABSENT, never `false`').toEqual(['status'])
    expect(reading().order, 'the seat is the pre reading\'s minus the id, which is the whole of the expectation').toEqual(['landing', 'tab-1'])
    expect(reading().rows.map((each) => each.id), 'the row left and nothing else did').toEqual(['landing', 'tab-1'])

    // **(ii) THE ACTIVE TAB, WITH A SURVIVOR.** The delete leaves ZERO active rows, so `exactly-one-active` is asked on the
    // record the seat repair left — the arm (ii) invocation the two-repair split exists for — and re-seats one. The
    // expectation has no active row at all, so the record that stands is one the removal did NOT name and the member says so.
    const repaired = record.remove('tab-1')
    expect(repaired.status, 'the removal of the ACTIVE tab is `committed` all the same: a repaired act is never refused').toBe('committed')
    expect('repaired' in repaired && repaired.repaired === true, 'one active row stands where the delete-only expectation has none, and that is the signal').toBe(true)
    // **WHICH SURVIVOR IS §7's CHOICE AND NOT THIS ROW'S** (`D-70`, `D-156`): putting the successor in the expectation would
    // be a second copy of the precedence inside the act. The record holds exactly one survivor here, so the assertion below
    // names a MEMBERSHIP and predicts no choice; the precedence itself is measured where its subject IS that choice, in `remove`
    // of the active tab with a pre-position arm, in the crossing describe above.
    expect(reading().rows.map((each) => each.id), 'the removed row is gone and the survivors stand').toEqual(['landing'])
    expect(actives(), 'and exactly one row reads active after it').toEqual(['landing'])

    // **(iii) THE LAST TAB.** The removal empties the sequence, so the seat repair's FLOOR branch — the one row either scope
    // creates, and no row it chooses — re-mints the landing entry. That record differs from the empty expectation, so the
    // member fires again and the record never stands empty.
    const last = record.remove('landing')
    expect(last.status).toBe('committed')
    expect('repaired' in last && last.repaired === true, 'the floor that re-mints the landing entry is not the empty record the removal meant').toBe(true)
    expect(reading().order, 'the record never stands empty').toEqual(['landing'])
    expect(reading().rows[0]?.label, 'and the row is the MINTED floor, not the row the last removal took').toBe('landing')
    expect(actives()).toEqual(['landing'])
  })
})

/* ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * THE CREATION IS ONE LEAF ROW WRITE AND THE SEAT REPAIR APPENDS IT — the four rows `docs/L3/store-tabs-record/design.md`
 * rev 15 §11 owes with `D-158`'s hunks (H9–H11).
 *
 * **CREATE IS THE MIRROR OF REMOVE** (`D-156`, `D-158`): `commit` writes ONE ROW at `['tabs', row.id]` and no composed
 * record at all; the key that write leaves UNSEATED is what `order-names-its-tabs` refuses INSIDE the same commit, whose
 * `'seat'` repair APPENDS that id to `order`. So `order` stops being the act's to spell, the append position stops being
 * the act's to promise (§4's order finding), and the answer stops being the act's to predict: `repaired` compares the
 * record that stands against a CREATION EXPECTATION — the pre reading's `order` plus the id the seat did not already name,
 * its rows plus the caller's admitted row — composed and never written (§4, §8, `D-70`).
 *
 * **THE FOURTH ROW IS NOT THE CONTROL REV 15 ASKED FOR, AND THE REASON IS STRUCTURAL — IT IS MEASURED, NOT ARGUED.**
 * Rev 15 §11 owed "the stale-observation control", a row that would red if `commit`'s PRE `lastView` refresh (H9) were
 * removed. **`D-158`'s landing pass built it, deleted the refresh, and it stayed GREEN** — and that result was reproduced
 * here before this row was written, by deleting the same line and re-running: the `exactly-one-active` body assigns
 * `lastView = post` at the TOP OF ITS OWN BODY on every ask, and the pairs are asked inside a bypassing whole-record write
 * too, so **the observation is never stale at the ask** and a row asserting that it is cannot fail. This corpus does not
 * keep a row that cannot fail, so the row below states the invariant that DOES hold and is falsifiable — **the activeness
 * pair resolves its referent from the record it is judging, because its own ask refreshes the capture** — and it was
 * proved RED with that refresh removed (the pair's own `lastView = post`), the same edit that leaves the design's shape
 * green. **A control asserting a falsifiability this tree does not have would be the only row here that measures nothing.**
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

describe('store-tabs-record · the creation is one leaf row write (D-158)', () => {
  it('A CREATION THROUGH THE ROUTE: `commit` of a NEW row leaves the SEAT naming it — `[\'landing\', \'tab-1\']`, APPENDED by the seat repair and not by the act — the row admitted field by field, EXACTLY ONE active, the derived `landing` on the new tab, and ONE delivery for the act', () => {
    // THE DELIVERY IS COUNTED BECAUSE THE ACT IS NOW TWO WRITES INSIDE ONE COMMIT: the leaf row write, and the seat
    // repair's whole-record write joined to it — plus `exactly-one-active`'s repair, which this creation runs too. A
    // second delivery, or a lost row, reds HERE and nowhere else in the battery.
    let delivered = 0
    record.subscribe(() => {
      delivered += 1
    })
    const answer = record.commit(row('tab-1', { label: 'one', lastActiveAt: SEAT_STAMP }))
    expect(answer.status, 'a creation is a committed act').toBe('committed')
    const { order, landing, rows } = reading()
    // THE SEAT IS THE REPAIR'S ANSWER AND NOT A SEQUENCE THE ACT WROTE. It is the weakest assertion here on purpose: a
    // body that spelled the seat itself — the pre-landing composition — would satisfy it, and so would a seat repair that
    // appended the id and then DROPPED the row. What makes it a measurement is the rest of the row: the row's own members
    // read back THROUGH the module under that seat, which only a repair that kept the row it found under the unseated key
    // can leave standing, and the act's own write being the store's value at `['tabs', 'tab-1']`.
    expect(order, 'the seat holds the pre reading\'s ids plus the one the repair appended').toEqual(['landing', 'tab-1'])
    expect(rows.map((each) => each.id), 'the row stands admitted, under the seat the repair built').toEqual(['landing', 'tab-1'])
    const seated = rows.find((each) => each.id === 'tab-1')
    expect(seated?.label, 'field by field: the label the caller wrote, not a default the repair filled').toBe('one')
    expect(seated?.target, 'the target the caller wrote').toBe('page://tab-1')
    expect(seated?.lastActiveAt, 'and the stamp the caller wrote').toBe(SEAT_STAMP)
    expect(actives(), 'exactly ONE active, and it is the tab the caller just created').toEqual(['tab-1'])
    expect(landing, 'and the DERIVED witness names it — nothing stored, the active row is the answer (D-76)').toBe('tab-1')
    expect(delivered, 'ONE delivery for the act: the leaf write and its two repairs are ONE committed change (§5)').toBe(1)
    // AND THE STORE'S OWN VALUE, so "the seat" is the record's and not this module's reading of it: the root holds the
    // seat and two rows, and the caller's write is what the store kept.
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    const standing = store.read(['tabs'] as never) as Record<string, unknown>
    expect(standing['order'], 'the store\'s own seat names the new id').toEqual(['landing', 'tab-1'])
    expect(Object.keys(standing).sort(), 'and the root is the seat plus its rows, no second seat and no stray').toEqual(['landing', 'order', 'tab-1'])
  })

  it('THE ONE `repaired` CASE NOTHING STATED BEFORE: a NEW row carrying `active: false` is answered BARE `committed` — the seat repair RAN (the id is in `order`) and left EXACTLY the creation expectation, so nothing reports a repair', () => {
    const answer = record.commit(row('tab-1', { active: false, label: 'one', lastActiveAt: SEAT_STAMP }))
    expect(answer.status, 'a repaired act is `committed`, never `refused` (D-103)').toBe('committed')
    // THE BARE ANSWER IS THE WHOLE CLAIM: this is the mirror of the removal's non-active arm (§8), where a repair whose
    // correction IS the act's own meaning must not carry `D-70`'s member — read as "did a repair run" that member would
    // say nothing here. Every field is supplied, so a FILLED DEFAULT cannot be the difference either: the member appears
    // where a field default had to be filled, and nowhere else (§8).
    expect(reading().order, 'the seat repair ran: the seat names the id the leaf write left unseated').toEqual(['landing', 'tab-1'])
    expect(Object.keys(answer), 'and the arm is exactly `status`: the creation expectation is what stands').toEqual(['status'])
    expect('repaired' in answer, 'the member is ABSENT, never `false`').toBe(false)
    expect(reading().rows.find((each) => each.id === 'tab-1')?.active, 'the flag the caller wrote is the flag the record holds').toBe(false)
    expect(actives(), 'so the active row is the one that stood, untouched by the creation').toEqual(['landing'])
  })

  it('THE APPEND POSITION AT THE ROUTE: three creations land at the END in creation order — `[\'landing\', \'tab-1\', \'tab-2\', \'tab-3\']` — and a re-`commit` of an id the seat already names MOVES NOTHING', () => {
    for (const id of ['tab-1', 'tab-2', 'tab-3']) {
      expect(record.commit(row(id, { active: false, label: id, lastActiveAt: SEAT_STAMP })).status, `the creation of ${id} commits`).toBe('committed')
    }
    // **THE POSITION IS THE PARSE'S ANSWER AND THE ACT'S OLD APPEND AGREES WITH IT FOR EVERY CREATION THE ACT CAN MAKE**
    // (§4): the seat parse's tail is the record's own keys minus the seat's, so one stray row — and one is all a leaf
    // write of a legal record can make — lands last, which is the `[...order, row.id]` the composed act used to spell.
    // **THIS ROW PINS THE READING, NOT A LAW**: with TWO OR MORE strays at once the tail is the STORE'S key-ordered image
    // (a tab id spelled `'7'` enumerates FIRST whatever the image says), which is why a caller may rely on the seat's own
    // sequence and on nothing else, and why the comparator reports a stray it did not name instead of the act pretending
    // to have chosen a rank.
    expect(reading().order, 'three creations, in creation order, each appended last').toEqual(['landing', 'tab-1', 'tab-2', 'tab-3'])
    expect(reading().rows.map((each) => each.id), 'and the rows are seated in that same sequence').toEqual(['landing', 'tab-1', 'tab-2', 'tab-3'])
    // THE UPDATE ARM, AT THE ROUTE: a row for an id the record ALREADY seats leaves no stray key, so the bijection holds
    // and NO repair runs — an append implemented unconditionally would move the id to the tail here.
    const updated = record.commit(row('tab-2', { active: false, label: 'again', lastActiveAt: SEAT_STAMP }))
    expect(updated.status, 'an update is a committed act').toBe('committed')
    expect(Object.keys(updated), 'and it is BARE `committed` (§8 case (i)): no stray key, so no repair ran and nothing differs').toEqual(['status'])
    expect(reading().order, 'and it did not move: the seat is the same sequence').toEqual(['landing', 'tab-1', 'tab-2', 'tab-3'])
    expect(reading().rows.find((each) => each.id === 'tab-2')?.label, 'while the member it names took the new value').toBe('again')
  })

  it('THE OBSERVATION IS REFRESHED AT THE ASK, SO THE REFERENT IS RESOLVED FROM THE RECORD THE PAIR IS JUDGING: `exactly-one-active` keeps the row whose VALUE MOVED in that record — never one a capture two acts old had to treat as new (RED with the pair\'s own `lastView = post` removed; green with `commit`\'s PRE refresh removed, which is why the design\'s control could not fail)', () => {
    const store = holder
    if (store === null) throw new Error('the battery needs the instance it opened')
    // (1) THE MODULE'S OWN ACT, so the capture every later ask is judged against starts here.
    record.commit(row('tab-1', { label: 'one', lastActiveAt: SEAT_STAMP }))
    const committed = store.read(['tabs'] as never) as Record<string, unknown>
    // (2) A WRITE THE MODULE NEVER MADE — the renderer's second door, at the store: a whole record at `['tabs']` that
    // `data.write` hands through byte for byte (§8). ONE active, so all six pairs PASS it, and the activeness pair is
    // asked on the record the write left — which is what moves the observation to it.
    store.write(['tabs'] as never, 'file', {
      ...committed,
      'order': ['landing', 'tab-1', 'tab-2'],
      'tab-1': { ...(committed['tab-1'] as Record<string, unknown>), active: false },
      'tab-2': { id: 'tab-2', target: 'page://tab-2', active: true, label: 'two', lastActiveAt: SEAT_STAMP },
    })
    const bypassed = store.read(['tabs'] as never) as Record<string, unknown>
    expect(bypassed['order'], 'the bypassing write STANDS — one active, so no pair refused or repaired it').toEqual(['landing', 'tab-1', 'tab-2'])
    // (3) A SECOND WHOLE-RECORD WRITE THAT MAKES TWO ACTIVES: `tab-1` comes BACK active while `tab-2` is byte-unchanged.
    // In the record THE PAIR IS JUDGING the only row whose value moved is therefore `tab-1`; in a capture two acts old
    // (`tab-1` active, no `tab-2` at all — the shape H9's removed refresh would leave standing) `tab-1` is unchanged and
    // `tab-2` looks newly written, so the same precedence names `tab-2`. The two answers differ, which is the whole
    // reason this row can fail where the design's control could not.
    store.write(['tabs'] as never, 'file', {
      ...bypassed,
      'tab-1': { ...(bypassed['tab-1'] as Record<string, unknown>), active: true },
    })
    const healed = reading()
    expect(actives(), 'the repair left exactly one active row').toHaveLength(1)
    expect(actives(), 'AND IT IS THE ROW WHOSE VALUE MOVED in the record the ask judged — §7\'s arm (i) read off the record, not off a stale capture').toEqual(['tab-1'])
    expect(healed.rows.find((each) => each.id === 'tab-2')?.active, 'while the row a stale capture would have kept is the one deactivated').toBe(false)
    expect(healed.order, 'the seat is the bypassing write\'s, unchanged by the repair').toEqual(['landing', 'tab-1', 'tab-2'])
    expect(healed.landing, 'and the derived witness follows the survivor').toBe('tab-1')
  })
})