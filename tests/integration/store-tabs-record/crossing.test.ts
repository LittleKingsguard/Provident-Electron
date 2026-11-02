// tests/integration/store-tabs-record/crossing.test.ts — THE L3 BATTERY for `store-tabs-record`, part 1: the crossing
// over the central instance.
//
// THE CONTRACT: `docs/L3/store-tabs-record/design.md` §4 — FIVE registered pairs at `['tabs']` (`tabs-must-stand`, the
// existence pair that mints the root; `exactly-one-active`; and the three field invariants), each answering `true` or
// `{ message, repair }`, where the repair leaves ONE corrected record and RETURNS the op its write landed
// (`{ ok: true, op }`, the shape the kernel credits through `landedOp`), and `docs/L2/store-tabs-record/interface.md` §2 —
// four routes; and design §5 — the change push, which is a listener REGISTERED under a handle (`subscribe`).
//
// **THE FOUR MACHINERY RULES THIS FILE PINS, EACH MEASURED AND NOT ASSUMED (the first three 2026-11-01; the fourth on the
// package's own clause stamped 2026-11-02, measured here 2026-11-01):**
//  1. a nested write does not create its parent, so the record is written WHOLE at `['tabs']` — one value that mints the
//     root, the `order` seat and every tab member in the same call;
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
// it, the only cross-kind restriction being the HANDLE — so the push installs at `['tabs']` itself, beside all five of this
// module's pairs; `repaired` is DERIVED by comparing the written intent with the record that stands, because the store's
// write record carries no member for the repair that ran in its own commit; and **a write a pair REFUSES delivers
// nothing**, the pair asked and the pass thrown with the delivery window never opened.
//
// This authority is this repo's (`docs/L3`, `docs/L2`) and the package's own guide, never the package's internals.
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import { createTabsRecord, isCommitCarrier, tabsConstraintDeclarations, writeJoined } from '../../../src/main/tabs-record'
import type {
  TabsCommitCarrier,
  TabsConstraintAnswer,
  TabsConstraintDeclaration,
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

/** A record over a real store built the way the app builds it: the five declarations batched at construction (D-65). */
const open = (): void => {
  dir = mkdtempSync(join(tmpdir(), 'tabs-crossing-'))
  holder = null
  const store = createProfileStore({
    filePath: join(dir, PROFILE_FILE),
    constraints: tabsConstraintDeclarations(() => holder).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
  })
  holder = store as unknown as TabsRecordStore
  record = createTabsRecord({ store: holder })
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
  it('THE CONSTRUCTION INSTANT: `tabs-must-stand` creates the record BEFORE ANY COMMIT — a store built over a scratch file path answers a root holding the landing page, seated and active, and `read()` on the never-committed record is a reading', () => {
    // THE ABSENCE→REPAIR PATH, DRIVEN FROM ITS OWN STORE so the row measures the CONSTRUCTION rather than a record this
    // file already opened: nothing is committed and no verb of the module has been called when the record is read.
    const instant = mkdtempSync(join(tmpdir(), 'tabs-construction-'))
    const path = join(instant, PROFILE_FILE)
    let bound: TabsRecordStore | null = null
    const store = createProfileStore({
      filePath: path,
      constraints: tabsConstraintDeclarations(() => bound).map((declaration) => ({
        address: declaration.address,
        id: declaration.id,
        constraint: declaration.constraint,
      })) as never,
    })
    // THE HANDLE IS BOUND AFTER THE CONSTRUCTION, exactly as the boot binds it (`src/main/main.ts`), so the pair that runs
    // DURING the construction reaches no store at all — and creates the root anyway, through its repair's own route.
    bound = store as unknown as TabsRecordStore
    try {
      // THE ROOT EXISTS AT THE STORE'S OWN ADDRESS BEFORE ANY COMMIT: `read` of a never-committed record is a READING
      // and not "does not exist", which is the whole difference this pair makes.
      const answer = store.read(['tabs'] as never) as unknown
      expect(answer, 'the existence pair minted the root at construction').toMatchObject({ order: ['tabs-landing-page'] })
      const fresh = createTabsRecord({ store: bound })
      const read = fresh.read()
      if (!('rows' in read)) throw new Error('a record created at construction must answer a reading')
      expect([...read.order], 'the fresh record seats the landing page and nothing else').toEqual(['tabs-landing-page'])
      expect(read.landing, 'and the landing seat names it').toBe('tabs-landing-page')
      expect(read.rows.map((each) => each.id)).toEqual(['tabs-landing-page'])
      expect(read.rows.filter((each) => each.active === true).map((each) => each.id), 'seated AND active').toEqual([
        'tabs-landing-page',
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

  it('a first commit is ANSWERED committed and APPENDS to the record the existence pair created: `[tabs-landing-page, tab-1]`, exactly one active — the committed tab — and the landing seat on it', () => {
    const answer = record.commit(row('tab-1'))
    expect(answer.status).toBe('committed')
    const { order, landing, rows } = reading()
    expect(order).toEqual(['tabs-landing-page', 'tab-1'])
    expect(landing).toBe('tab-1')
    expect(rows).toHaveLength(2)
    expect(actives()).toEqual(['tab-1'])
  })

  it('`tab-has-title`, `tab-has-content` and `tab-has-lastActiveAt` → a row carrying no title, a BLANK target and no stamp is answered committed with all three defaults written by the repair', () => {
    const answer = record.commit({ id: 'bare', target: '', active: true })
    expect(answer.status, 'a violation the pair can repair is not a refusal').toBe('committed')
    const seated = reading().rows.find((each) => each.id === 'bare')
    expect(seated?.label, 'tab-has-title → "untitled"').toBe('untitled')
    expect(seated?.target, 'tab-has-content → the landing page').toBe('tabs-landing-page')
    expect(seated?.lastActiveAt, 'tab-has-lastActiveAt → now, as an ISO string').toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('`exactly-one-active` → a second ACTIVE tab is committed and the first is deactivated, so the invariant holds after the act rather than at it', () => {
    record.commit(row('tab-1'))
    expect(record.commit(row('tab-2')).status).toBe('committed')
    const { order } = reading()
    expect(order).toEqual(['tabs-landing-page', 'tab-1', 'tab-2'])
    expect(actives(), 'the engine repair keeps the caller\'s own referent').toEqual(['tab-2'])
    expect(reading().landing).toBe('tab-2')
  })

  it('`exactly-one-active` → a second INACTIVE tab leaves the active one alone', () => {
    record.commit(row('tab-1'))
    expect(record.commit(row('tab-2', { active: false })).status).toBe('committed')
    expect(actives()).toEqual(['tab-1'])
    expect(reading().order).toEqual(['tabs-landing-page', 'tab-1', 'tab-2'])
  })

  it('`remove` → removing the ACTIVE tab is answered committed and a survivor takes the seat, chosen by the removed entry\'s pre-position', () => {
    record.commit(row('tab-1'))
    record.commit(row('tab-2', { active: false }))
    expect(record.remove('tab-1').status).toBe('committed')
    const { order, rows } = reading()
    expect(order).toEqual(['tabs-landing-page', 'tab-2'])
    expect(rows.map((each) => each.id), 'the tab is gone from the record, not merely unseated').toEqual([
      'tabs-landing-page',
      'tab-2',
    ])
    expect(actives(), 'exactly one active survives a removal of the active tab').toEqual(['tab-2'])
  })

  it('`remove` → removing the LAST tab — the landing page itself, since a fresh record starts holding it — leaves the record non-empty: the empty-sequence repair mints the landing page back into the seat', () => {
    record.commit(row('tab-1'))
    // THE FRESH RECORD ALREADY SEATS THE LANDING PAGE (D-69), so the empty sequence the invariant refuses is reached by
    // removing THAT after the tab, and not by removing the only tab a record has.
    record.remove('tab-1')
    expect(record.remove('tabs-landing-page').status).toBe('committed')
    const { order, landing } = reading()
    expect(order, 'the record never stands empty').toHaveLength(1)
    expect(order).toEqual(['tabs-landing-page'])
    expect(actives()).toEqual(['tabs-landing-page'])
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
      'tabs-landing-page',
    ])
  })

  it('a removal of a tab the record does not hold is the store\'s own SUCCESS, not a refusal', () => {
    record.commit(row('tab-1'))
    expect(record.remove('never-was').status).toBe('committed')
    expect(reading().order).toEqual(['tabs-landing-page', 'tab-1'])
  })

  it('`commit` UPDATES a tab the record already seats, so the same id is one member and not a second seat', () => {
    record.commit(row('tab-1', { label: 'first' }))
    record.commit(row('tab-1', { label: 'second' }))
    const { order, rows } = reading()
    expect(order).toEqual(['tabs-landing-page', 'tab-1'])
    expect(rows).toHaveLength(2)
    expect(rows.find((each) => each.id === 'tab-1')?.label).toBe('second')
  })

  it('the record SURVIVES a restart of the instance, because it is written through the store\'s own file tier', () => {
    record.commit(row('tab-1', { label: 'kept' }))
    const path = join(dir, PROFILE_FILE)
    holder = null
    // A SECOND instance over the same file: the same boot route, the same declarations (D-65).
    let second: TabsRecordStore | null = null
    const store = createProfileStore({
      filePath: path,
      constraints: tabsConstraintDeclarations(() => second).map((declaration) => ({
        address: declaration.address,
        id: declaration.id,
        constraint: declaration.constraint,
      })) as never,
    })
    second = store as unknown as TabsRecordStore
    const reopened = createTabsRecord({ store: second })
    const answer = reopened.read()
    expect(answer.status).toBe('committed')
    if (!('rows' in answer)) throw new Error('a reopened record must answer a reading')
    expect([...answer.order]).toEqual(['tabs-landing-page', 'tab-1'])
    expect(answer.rows.find((each) => each.id === 'tab-1')?.label).toBe('kept')
  })

  // ═══════════════ THE CHANGE DELIVERY (L2 §2's fourth route, design §5; D-70) — the push that shipped as a name ═══════════════

  it('THE DELIVERY HAPPENS AND THE WITHDRAWAL IS ITS ANSWER: `subscribe` — a live listener at the record\'s OWN address, `[\'tabs\']`, beside all five pairs (D-71) — then a `commit` fires the handler ONCE, a `remove` fires it AGAIN, and the unsubscribe STOPS it — a counter, because a listener the store never registered fires nothing, silently', () => {
    // THE COUNT IS THE WHOLE MEASUREMENT: the module's `subscribe` once installed nothing at all — it asked for `['tabs']`
    // while a pre-`1.7.0` package refused a listener beside a constraint there, and swallowed the refusal — so the counter
    // read `0` while every one of these acts answered `committed` (D-70). The first `commit` below is also the one that runs
    // `exactly-one-active`'s repair, whose write joins the same commit and is therefore ONE delivery and not two.
    let delivered = 0
    const off = record.subscribe(() => {
      delivered += 1
    })
    expect(record.commit(row('tab-1')).status, 'the commit that fires the delivery commits').toBe('committed')
    expect(delivered, 'a commit of a NEW tab delivers exactly one notification').toBe(1)
    expect(record.remove('tab-1').status, 'the removal that fires it again commits').toBe('committed')
    expect(delivered, 'a `remove` delivers exactly one more — the removal is a committed change of the record like any other').toBe(2)
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

  it('THE PATTERN THE WHOLE CHANGE RESTS ON: a LIVE LISTENER and ALL FIVE pairs stand at ONE address — `[\'tabs\']` — where one whole-record write there ASKS the pairs and DELIVERS the listener exactly once, the write record names the listener AT `[\'tabs\']` (the address it was BOUND at, guide §6.4), and a write a pair REFUSES delivers NOTHING', () => {
    // ITS OWN INSTANCE, BUILT THE WAY THE BOOT BUILDS IT, WITH ITS OWN INSTRUMENT: the five declarations are WRAPPED so the
    // row can see the pass ask each pair — an observation, not an inference from the record the act leaves — and the
    // wrapper returns the module's own answer untouched, so the machinery measured here is the module's and not a
    // stand-in for it.
    const instant = mkdtempSync(join(tmpdir(), 'tabs-one-address-'))
    let bound: TabsRecordStore | null = null
    const asked: string[] = []
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
    })
    bound = store as unknown as TabsRecordStore
    try {
      const recordHere = createTabsRecord({ store: bound })
      // ALL FIVE PAIRS ARE AT THE ONE ADDRESS, read off the store's own registered-pair read — where `address` is the pair's
      // own SET, so one address reads `[['tabs']]` (`guide §7.4`).
      expect(store.constraints().map((pair) => [pair.id, pair.address])).toEqual([
        ['tabs-must-stand', [['tabs']]],
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
        order: ['tabs-landing-page', 'tab-1'],
        'tabs-landing-page': {
          id: 'tabs-landing-page',
          target: 'tabs-landing-page',
          active: false,
          label: 'tabs-landing-page',
          lastActiveAt: stamp,
        },
        'tab-1': { id: 'tab-1', target: 'page://tab-1', active: true, label: 'one', lastActiveAt: stamp },
        landing: 'tab-1',
      }
      asked.length = 0
      // THE ONE ACT BOTH KINDS ARE REACHED BY — a whole record at `['tabs']`, written through the store so this row can read
      // the write's OWN record, which `commit` answers nothing of (`store's write receipt`: `{op, watched, triggered}`).
      const receipt = store.write(['tabs'] as never, 'file', intent)
      expect(asked, 'the pass ASKS every pair standing at that one address').toEqual([
        'tabs-must-stand',
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
      expect(listenerEntries, 'the triggered set names the listener beside the five pairs, both kinds in one list').toHaveLength(1)
      expect(listenerEntries[0]?.address, 'and it names the ONE address both kinds stand at').toEqual(['tabs'])
      expect(listenerEntries[0]?.handle, 'and the handle spells the same address after its `@`').toMatch(/^tabs-record:\d+@tabs$/)
      expect(delivered, 'AND THE DELIVERY IS EXACTLY ONE per committed change, the pairs\' asking being no delivery at all').toBe(1)

      // **THE OTHER HALF: A WRITE A PAIR REFUSES DELIVERS NOTHING.** The refusing pair is this ROW's instrument and not the
      // module's — all five of the module's pairs REPAIR rather than refuse, so a refusal has to be asked for — and it is
      // also the HANDLE rule's second demonstration: it is added at `['tabs']` WHERE A LIVE LISTENER STANDS, and it is
      // accepted because its `id` is not that listener's handle (`guide §7.3` item (ii): multiple pairs at one address are
      // lawful).
      store.addConstraint({ address: ['tabs'] as never, id: 'no-marked-record' } as never, ((context: unknown) => {
        const value = (context as { value?: { note?: unknown } }).value
        return value?.note === 'refuse-me' ? { message: 'the record may not carry a marked note' } : true
      }) as never)
      let refusal: unknown = null
      try {
        store.write(['tabs'] as never, 'file', { ...intent, note: 'refuse-me' })
      } catch (caught) {
        refusal = caught
      }
      expect((refusal as { status?: string }).status, 'the pair REFUSES, and the pass throws the store\'s own form').toBe('ConstraintPassRefused')
      expect(delivered, 'and the listener standing at that same address delivers NOTHING: the pair is asked, then the thrown form, and no delivery follows a refused write').toBe(1)
      expect(recordHere.read().status, 'while the record stands exactly as the committed write left it').toBe('committed')
      off()
    } finally {
      bound = null
      rmSync(instant, { recursive: true, force: true })
    }
  })

  // ═══════════════ `repaired` — DERIVED FROM THE STANDING RECORD, NOT PREDICTED (L2 §3, design §4; D-70) ═══════════════

  it('`repaired: true` — a commit that makes TWO tabs active is answered `committed` WITH `repaired`, and the record shows what the repair did: the second active tab deactivated and the active seat moved to the caller\'s own referent', () => {
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
    // THE ROW THAT STOPS THE ONE ABOVE FROM BEING VACUOUS. Nothing repairs the second act: one tab is active, and every
    // row carries all three fields, so the record that stands IS the record the act intended (`standsAsIntended`). A
    // derivation that answered `repaired` unconditionally — or that compared the two records by raw `JSON.stringify` and
    // so reported a difference in MEMBER ORDER — fails here.
    record.commit(row('tab-1', { label: 'one', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    const answer = record.commit(row('tab-2', { active: false, label: 'two', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    expect(answer.status).toBe('committed')
    expect(Object.keys(answer), 'the clean arm is exactly `status`').toEqual(['status'])
    expect('repaired' in answer, 'and the member is absent, not `false`').toBe(false)
    expect(actives(), 'the control half: the clean act left the record as it intended').toEqual(['tab-1'])
  })

  it('AND THE SAME DERIVATION ON `remove`: a removal whose repair seats a survivor carries `repaired`, while a removal nothing repairs is `{ status: \'committed\' }` alone', () => {
    // BOTH HALVES IN ONE ROW because it is ONE derivation applied at the module's other write site: removing an INACTIVE
    // tab leaves exactly the intent (`landing` untouched, one active already), while removing the ACTIVE tab leaves zero
    // active and the repair's survivor re-seats the `landing` member this act omitted.
    record.commit(row('tab-1', { label: 'one', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    record.commit(row('tab-2', { active: false, label: 'two', lastActiveAt: '2026-11-01T00:00:00.000Z' }))
    const clean = record.remove('tab-2')
    expect(clean.status).toBe('committed')
    expect('repaired' in clean, 'removing a tab nothing has to repair is a clean act').toBe(false)
    const repaired = record.remove('tab-1')
    expect(repaired.status, 'the removal of the ACTIVE tab is still `committed`').toBe('committed')
    expect('repaired' in repaired && repaired.repaired === true, 'and it names the repair that seated the survivor').toBe(true)
    expect(actives(), 'the record shows it: the survivor is active').toEqual(['tabs-landing-page'])
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
    })
    bound = store as unknown as TabsRecordStore
    try {
      const here = createTabsRecord({ store: bound })
      // THE COMMIT THAT TRIGGERS A REPAIR: the existence pair minted the record with the landing page SEATED AND ACTIVE, so
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
