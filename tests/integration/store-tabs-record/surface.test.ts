// tests/integration/store-tabs-record/surface.test.ts — THE L3 BATTERY for `store-tabs-record`, part 2: the SURFACE and
// the change push, driven end to end.
//
// THE CONTRACT: `docs/L2/store-tabs-record/interface.md` §2 — **`tabs.onChanged` is the event generator**: the instance's
// own listener delivers the triggered address and the renderer re-reads rather than being handed a value — and
// `docs/L3/store-tabs-record/delivery.md` §2 — **the one registration is the CONSTRUCTION's `cfg.listeners` entry**, at the
// record root `['tabs']` ITSELF, beside all six of this module's pairs (lawful from `provident-storeroom 1.7.0`, whose one
// cross-kind restriction reads the HANDLE and never the address — guide §7.3's clause of 2026-11-01; D-71).
//
// **RE-GRAINED FOR `D-219`, WHICH DELETES THE SUBJECT THIS FILE WAS WRITTEN FOR AND MOVES WHAT IT MEASURED.** The two
// surface members `attach()`/`detach()` and the `onChanged` option are gone whole (`docs/L3/store-tabs-record/delivery.md`
// §4, §7): the surface takes NO subscription, because `1.11.0` delivers at the creation and the construction adopts the
// crossing's one entry. **What the row asserted that still exists — a commit delivers ONCE (the repair's own write in the
// same commit is not a second delivery), a second commit delivers TWICE, and the record is the authority throughout — is
// asserted below unchanged.** What it asserted that no longer exists is named in the row rather than left green: *"a boot
// that never called `attach()` hears nothing"* is a state the tree can no longer be in, and *"`detach()` withdraws exactly
// what `attach()` took"* has no member to drive — its force is the LOCAL withdrawal, which is `crossing.test.ts`'s own
// (`delivery.subscribe`'s removal) and `Z-3`'s against a sink.
//
// **WHY THIS ROW IS A SIBLING FILE AND NOT A ROW OF `crossing.test.ts`.** The two files measure two modules: part 1 drives
// `src/main/tabs-record/index.ts` — the record's six pairs and its four routes — while this one drives
// `src/main/tabs-surface/index.ts`, the module that CONSTRUCTS the reference and is the only file that may name it
// (design §1). `createTabsSurface` appears in no other test file at all, so without this row the chain from a route call to
// the app's own push is proven inside `tabs-record` and never across the boundary the app actually uses.
//
// **MEASURED 2026-11-01, before `D-70`'s fix, over this same harness:** `onChanged` was called ZERO times by any `commit`,
// because `record.subscribe` installed nothing and dropped its handler — so this row's subject is red on the revert and not
// by accident (`D-70`).
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createProfileStore } from '../../../src/main/storeroom'
import { createTabsDelivery, tabsConstraintDeclarations, type TabsDelivery, type TabsRecordStore } from '../../../src/main/tabs-record'
import { createTabsSurface, type TabsSurface } from '../../../src/main/tabs-surface'

const PROFILE_FILE = 'provident-profile.json'

let dir: string
let holder: TabsRecordStore | null = null
let surface: TabsSurface
/** **THE CROSSING'S DELIVERY, BUILT BEFORE THE STORE AND ADOPTED BY IT** (`D-219`): its one entry at `['tabs']` IS the
 *  registration the surface no longer takes, and its sink is the one thing this file can measure — the push. */
let delivery: TabsDelivery
/** Every address the sink was handed, in order. A creation's deliveries are the first entries (`D-219`). */
let sunk: string[] = []

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'tabs-surface-'))
  holder = null
  sunk = []
  // **THE PUSH'S OWN COUNT IS THE SINK'S**, because the crossings' fan-out loop lives in `src/main/main.ts` and is handed
  // exactly this address (`docs/L3/app-shell/delivery.md` §3): a body the surface could reach instead would be a second
  // spelling of the crossing's destination.
  delivery = createTabsDelivery((address) => sunk.push(address.join('/')))
  // THE INSTANCE IS THE APP'S, BUILT THE WAY THE BOOT BUILDS IT: the six declarations batched at construction (D-65, D-83)
  // AND the crossing's listener entry adopted by that same call (`D-219`, `docs/L3/app-shell/delivery.md` §5 `A-3`), with
  // the surface handed that instance and that delivery rather than constructing either (D-64).
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
  surface = createTabsSurface({ store: holder, delivery })
})

afterEach(() => {
  // **THERE IS NO WITHDRAWAL TO RUN ON TEARDOWN ANY MORE** (`D-219`): `detach()` is deleted with its subject, the entry the
  // construction adopted is the instance's for the instance's life, and the instance dies with `holder`. What teardown
  // still owes is the scratch directory.
  holder = null
  rmSync(dir, { recursive: true, force: true })
})

describe('store-tabs-record · the surface and the change push', () => {
  it('**THE PUSH IS THE CONSTRUCTION\'S ENTRY AND THE SURFACE TAKES NO SUBSCRIPTION** (`D-219`): the surface exposes its three routes and no member that registers anything; a commit delivers ONCE — the repair\'s own write in that same commit is not a second delivery — a second commit delivers ONCE more, a `delivery.subscribe` release silences only its own handler while the sink is still told, and the record is the authority throughout', () => {
    // **THE MEMBER CENSUS IS THE FIRST MEASUREMENT, AND IT IS THE ONE THE OLD ROW COULD NOT MAKE**: `attach` and `detach` are
    // deleted, so a surface that kept them — or a fourth route that opened a second registration — reds here by name.
    expect(Object.keys(surface).sort(), 'the surface exposes `read`, `commit` and `remove`, and no subscription member').toEqual(['commit', 'read', 'remove'])
    // **AND NOTHING IS DELIVERED BY A SURFACE THAT TAKES NO SUBSCRIPTION** — the arm that keeps the count below attributable
    // to the crossing's registration and not to a subscription the surface took somewhere. The baseline is a read, which
    // must cause none (`D-98`'s no-write-on-read clause, read at the push).
    const queued = sunk.length
    expect(surface.read().status, 'the surface answers a reading').toBe('committed')
    expect(sunk.length - queued, 'a read causes no delivery: the push is a committed change\'s, never a read\'s').toBe(0)

    // THIS COMMIT ALSO RUNS `exactly-one-active`'s REPAIR (the landing page the existence pair seated is active beside
    // the committed tab), and the repair's write JOINS the commit rather than opening a second one (D-67) — so one
    // committed change is one notification, which is the figure the whole push has to hold to.
    expect(surface.commit({ id: 'tab-2', target: 'page://tab-2', active: true }).status).toBe('committed')
    expect(sunk.length - queued, 'a commit delivers exactly one notification, through the entry the construction adopted').toBe(1)
    expect(surface.commit({ id: 'tab-3', target: 'page://tab-3', active: false }).status).toBe('committed')
    expect(sunk.length - queued, 'and a second committed change delivers exactly one more').toBe(2)
    // **AND THE DELIVERED ARGUMENT IS AN ADDRESS ROOTED AT THE RECORD'S OWN ROOT, NEVER THE RECORD** (`D-92`, L2 §2):
    // `1.11.0` hands the listener the TRIGGERING path — the leaf a row write landed at — and `design.md` §6 forbids the
    // renderer-side copy by name, so a payload would be that copy.
    for (const address of sunk) expect(address.split('/')[0], 'every delivery carries an ADDRESS rooted at `[\'tabs\']`').toBe('tabs')

    // **THE WITHDRAWAL, MEASURED WHERE IT NOW STANDS** (`docs/L3/store-tabs-record/delivery.md` §3): a subscriber released
    // runs no store verb and drops only its own handler, so the construction's registration still delivers to the sink —
    // the arm that reds if the local removal were ever rewired onto `unlisten`.
    const seen = sunk.length
    const released = delivery.subscribe(() => undefined)
    released()
    expect(surface.commit({ id: 'tab-4', target: 'page://tab-4', active: false }).status, 'the commit after a local release still commits').toBe('committed')
    expect(sunk.length - seen, 'the construction\'s registration stands after a local release: the sink is still told').toBe(1)

    // AND THE RECORD IS THE AUTHORITY THROUGHOUT — the push carries no value, and a renderer that needs one re-reads
    // (L2 §2; design §5). Read through the surface's own route, so the push is shown to carry the NOTIFICATION and not the
    // record.
    const answer = surface.read()
    expect(answer.status).toBe('committed')
    if (!('rows' in answer)) throw new Error('the surface must answer a reading here')
    expect(answer.rows.map((each) => each.id), 'every act above landed, delivered or not').toContain('tab-4')
  })
})
