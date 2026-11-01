// tests/integration/store-tabs-record/crossing.test.ts — THE L3 BATTERY for `store-tabs-record`, part 1: the crossing
// over the central instance.
//
// THE CONTRACT: `docs/L3/store-tabs-record/design.md` §4 — FIVE registered pairs at `['tabs']` (`tabs-must-stand`, the
// existence pair that mints the root; `exactly-one-active`; and the three field invariants), each answering `true` or
// `{ message, repair }`, where the repair leaves ONE corrected record and RETURNS the op its write landed
// (`{ ok: true, op }`, the shape the kernel credits through `landedOp`), and `docs/L2/store-tabs-record/interface.md` §2 —
// four routes.
//
// **THE FOUR MACHINERY RULES THIS FILE PINS, EACH MEASURED AND NOT ASSUMED (the first three 2026-11-01; the fourth on the
// package's own clause stamped 2026-11-02, measured here 2026-11-01):**
//  1. a nested write does not create its parent, so the record is written WHOLE at `['tabs']` — one value that mints the
//     root, the `order` seat and every tab member in the same call;
//  2. a repair may write at the attempt's OWN address when it names the commit it was handed at `write`'s fourth
//     position — without it the same write is refused `KC-7` *"a constraint attempt is already open"*;
//  3. a repair that returns `void` is refused *"the repair … produced no op"* (`ST-F2`, filed upstream);
//  4. a pair whose own key is ABSENT is APPLIED where its parent resolves, and its repair may create the key — the route
//     it takes there carries the store's THREE positions and no fourth (`guide §7.2`'s dated clause, items (3) and (4);
//     D-69). That is what makes `['tabs']` stand BEFORE the first commit rather than as a side effect of it.
//
// This authority is this repo's (`docs/L3`, `docs/L2`) and the package's own guide, never the package's internals.
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import { createTabsRecord, tabsConstraintDeclarations } from '../../../src/main/tabs-record'
import type { TabsRecord, TabsRecordStore } from '../../../src/main/tabs-record'
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
})
