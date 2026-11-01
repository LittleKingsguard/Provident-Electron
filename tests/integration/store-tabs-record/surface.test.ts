// tests/integration/store-tabs-record/surface.test.ts — THE L3 BATTERY for `store-tabs-record`, part 2: the SURFACE's
// change push, driven end to end.
//
// THE CONTRACT: `docs/L2/store-tabs-record/interface.md` §2 — **`tabs.onChanged` is the event generator**: the instance's
// own listener delivers the triggered address and the renderer re-reads rather than being handed a value — and
// `docs/L3/store-tabs-record/design.md` §5 — **the listener installs at a descendant of the record root** (a listener and
// a constraint do not share an address, and all five of this module's pairs stand at `['tabs']`), **the withdrawal is the
// subscription's own answer**, and a listener that outlives its window is a leak the renderer cannot see.
//
// **WHY THIS ROW IS A SIBLING FILE AND NOT A ROW OF `crossing.test.ts`.** The two files measure two modules: part 1 drives
// `src/main/tabs-record/index.ts` — the record's five pairs and its four routes — while this one drives
// `src/main/tabs-surface/index.ts`, the module that CONSTRUCTS the reference, holds exactly one subscription and is the
// only file that may name it (design §1). `createTabsSurface` appears in no other test file at all, so without this row
// the push Defect 1 repaired is proven inside `tabs-record` and never across the boundary the app actually uses: a
// surface whose `attach` took nothing, or whose `detach` withdrew nothing, would leave part 1 green while the renderer
// received the push it exists for never.
//
// **MEASURED 2026-11-01, before the fix, over this same harness:** `onChanged` was called ZERO times by any `commit`,
// because `record.subscribe` installed nothing and dropped its handler — so this row is red on the revert and not by
// accident (`D-70`).
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import { tabsConstraintDeclarations, type TabsRecordStore } from '../../../src/main/tabs-record'
import { createTabsSurface, type TabsSurface } from '../../../src/main/tabs-surface'

const PROFILE_FILE = 'provident-profile.json'

let dir: string
let holder: TabsRecordStore | null = null
let surface: TabsSurface
/** The push's own count: the one thing the surface's `onChanged` is, and the one thing this file can measure. */
let delivered = 0

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'tabs-surface-'))
  holder = null
  delivered = 0
  // THE INSTANCE IS THE APP'S, BUILT THE WAY THE BOOT BUILDS IT: the five declarations batched at construction (D-65),
  // and the surface handed that instance rather than constructing one (D-64).
  const store = createProfileStore({
    filePath: join(dir, PROFILE_FILE),
    constraints: tabsConstraintDeclarations(() => holder).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
  })
  holder = store as unknown as TabsRecordStore
  surface = createTabsSurface({
    store: holder,
    onChanged: () => {
      delivered += 1
    },
  })
})

afterEach(() => {
  // THE WITHDRAWAL RUNS ON TEARDOWN TOO, so a row that fails mid-way cannot leave a listener behind on an instance the
  // next row builds (a listener outliving its window is the leak §5 names).
  surface.detach()
  holder = null
  rmSync(dir, { recursive: true, force: true })
})

describe('store-tabs-record · the surface\'s change push', () => {
  it('`onChanged` fires when the record COMMITS and stops when `detach` WITHDRAWS it: `attach()` then a commit delivers ONCE — the repair\'s own write in that same commit is not a second delivery — a second commit delivers TWICE, and after `detach()` a further commit delivers NOTHING while still committing', () => {
    // NOTHING IS DELIVERED BEFORE `attach()`: the subscription is the surface's to take, and a boot that never takes it
    // hears nothing — the arm that makes the count below attributable to `attach` rather than to the construction.
    expect(surface.commit({ id: 'tab-1', target: 'page://tab-1', active: true }).status).toBe('committed')
    expect(delivered, 'a commit without `attach()` delivers nothing').toBe(0)

    surface.attach()
    // THIS COMMIT ALSO RUNS `exactly-one-active`'s REPAIR (the landing page the existence pair seated is active beside
    // the committed tab), and the repair's write JOINS the commit rather than opening a second one (D-67) — so one
    // committed change is one notification, which is the figure the whole push has to hold to.
    expect(surface.commit({ id: 'tab-2', target: 'page://tab-2', active: true }).status).toBe('committed')
    expect(delivered, '`attach()` then a commit delivers exactly one notification').toBe(1)
    expect(surface.commit({ id: 'tab-3', target: 'page://tab-3', active: false }).status).toBe('committed')
    expect(delivered, 'and a second committed change delivers exactly one more').toBe(2)

    surface.detach()
    expect(surface.commit({ id: 'tab-4', target: 'page://tab-4', active: false }).status, 'the commit after the withdrawal still commits').toBe('committed')
    expect(delivered, '`detach()` is the withdrawal, and it is the answer: nothing is delivered after it').toBe(2)

    // AND THE RECORD IS THE AUTHORITY THROUGHOUT — the push carries no value, and a renderer that needs one re-reads
    // (L2 §2; design §5). Read through the surface's own route, so the withdrawal is shown to have stopped the
    // NOTIFICATION and not the record.
    const answer = surface.read()
    expect(answer.status).toBe('committed')
    if (!('rows' in answer)) throw new Error('the surface must answer a reading here')
    expect(answer.rows.map((each) => each.id), 'every act above landed, delivered or not').toContain('tab-4')
  })
})
