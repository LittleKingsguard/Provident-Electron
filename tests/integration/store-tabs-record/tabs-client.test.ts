// tests/integration/store-tabs-record/tabs-client.test.ts — THE ROWS FOR THE TAB RECORD'S **CLIENT** (D-63's client
// role; `docs/L2/store-tabs-record/interface.md` §6), which is STAGE A of the renderer migration (`strata/next-steps.md`
// row 1; D-77).
//
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40). It drives the client
// MODULE and never the app: no Electron, no preload, no store, no `provident-storeroom` (the client does not import it,
// and `tests/e2e/central-data/scenarios.test.ts` pins the package's importers to three main-side files — a row here that
// dragged the package into the renderer would red a gating e2e row).
//
// WHAT THESE ROWS ARE ABOUT — the derivation, and it is the whole of Stage A's value: from `read()`'s answer ALONE the
// client decides whether the LANDING terminal stands (EXACTLY ONE row reads `active: true` **AND THAT ROW'S `target` IS THE
// LANDING PAGE** — `TABS_LANDING_PAGE_ID` — L2 §6's *"`landing` names a row reading `active: true`"* read as what it is,
// because `landing` IS the active row's id and so a comparison with it was a comparison with itself, `D-210`) and whether
// the ERROR terminal stands (a row carries an `error`), and resolves each page node through the runtime's
// `elementForNodeId` — the ENVELOPE's ids, never a spelling of the client's. **THE KEY IS THE TARGET AND NOT THE ENTRY'S
// ID**: a row's `target` is the CONTENT it contains and its `id` is its identity (`src/main/tabs-record/index.ts`, `D-75`,
// `D-76`), and the `+` mints an id whose target the landing repair coerces to the landing page, so an id-keyed predicate
// answered `false` over a record whose shown tab WAS the landing page. **EVERY ROW MEANT TO BE THE LANDING ENTRY THEREFORE
// CARRIES THAT TARGET** (the `landingRow` helper below), which is what lets `TC-1`/`TC-2`/`TC-11`/`TC-12` assert a standing
// landing terminal at all, and a row meant to be a NON-landing tab keeps a made-up target so the same predicate still has
// its false arm. The rows below are the four record states that predicate has (a landing witness, an error
// witness, neither, and TWO actives) plus the three answers that are not a record at all (a refusal, an absent member, a
// route that did not answer) and the change push's own duty.
//
// **A NODE GREEN HERE IS ENVELOPE-GREEN AND NEVER APP-GREEN** (`strata/brief.md` §6, D-27): every row runs under the
// layout-less DOM shim, so no row below claims that a page was SEEN, that a terminal rendered, or that a pixel moved. What
// they claim is what the client ANSWERS.
import { afterEach, describe, expect, it } from 'vitest'

import { TABS_ERROR_PAGE_ID, TABS_LANDING_PAGE_ID } from '../../../src/shared/demo-envelope.js'
import type { TabsRecordRow } from '../../../src/shared/types.js'
import {
  createTabsClient,
  deriveTabsWitness,
  type TabsClientBridge,
  type TabsClientReading,
  type TabsCommittedAnswer,
} from '../../../src/renderer/tabs-client.js'

/** One tab row in the record's own fields (`TabsRecordRow`): `active` decides "exactly one", a carried `error` token
 *  decides the error witness, and `target` is the CONTENT the row holds — a made-up `node-<id>` here is precisely what
 *  makes the row a NON-landing tab. */
const row = (id: string, active: boolean, error?: string): TabsRecordRow =>
  error === undefined ? { id, target: `node-${id}`, active } : { id, target: `node-${id}`, active, error }

/** **THE LANDING ENTRY, AS THE RECORD SEATS IT** — and the landing terminal stands on its `target`, never on its `id`: a
 *  row's `target` is the content it contains and its `id` is its identity (`src/main/tabs-record/index.ts`, `D-75`,
 *  `D-76`). So this row carries **`target: TABS_LANDING_PAGE_ID`** (the constant IMPORTED above, `'tabs-landing-page'`,
 *  `src/shared/demo-envelope.ts`), which is the one value `deriveTabsWitness` compares the active row's target against.
 *  A row of `row(...)` beside it is then a tab whose content is somewhere else, which is the predicate's false arm. */
const landingRow = (active: boolean): TabsRecordRow => ({ id: 'landing', target: TABS_LANDING_PAGE_ID, active })

/** A committed read answer — L2 §2's three members, with `order` spelled from the rows so the two cannot disagree by
 *  accident. */
const recordOf = (rows: readonly TabsRecordRow[], landing: string): TabsCommittedAnswer => ({
  status: 'committed',
  order: rows.map((entry) => entry.id),
  landing,
  rows,
})

/** THE ENVELOPE-QUERY, RECORDED: it answers a probe for any id and remembers WHAT IT WAS ASKED, so a row can assert that a
 *  false witness resolves NOTHING (the terminal is not driven) and that the id asked for is the envelope's own. */
interface RecordingResolver {
  readonly asked: string[]
  elementForNodeId(id: string): unknown | null
}
const recordingResolver = (): RecordingResolver => {
  const asked: string[] = []
  return {
    asked,
    elementForNodeId(id: string): unknown | null {
      asked.push(id)
      return { id, probe: true }
    },
  }
}

/** THE STUB BRIDGE — the shape `window.provident.tabs` carries (L2 §2), driven by a test instead of by IPC. The answer is a
 *  THUNK so a row can change what the record says between two reads, and the deliveries are the test's to make: nothing
 *  here pretends to be a store, and the counter is what makes "the client RE-READ" a reading rather than a hope. */
interface StubMember {
  readonly bridge: TabsClientBridge
  reads(): number
  listeners(): number
  deliver(): void
}
const stubMember = (answer: () => unknown): StubMember => {
  let reads = 0
  const handlers = new Set<() => void>()
  return {
    bridge: {
      read(): Promise<unknown> {
        reads += 1
        return Promise.resolve(answer())
      },
      onChanged(handler: () => void): () => void {
        handlers.add(handler)
        return () => {
          handlers.delete(handler)
        }
      },
    },
    reads: () => reads,
    listeners: () => handlers.size,
    deliver: () => {
      for (const handler of [...handlers]) handler()
    },
  }
}

/** A DELIVERY RE-READS THROUGH A PROMISE CHAIN, so a row that makes a delivery must let the microtask queue drain before it
 *  counts. `setTimeout 0` and not `await Promise.resolve()`: the read is itself a `Promise.resolve`, and the handler runs
 *  after THAT answer's `.then`, so one microtask turn is not enough — this waits for the macrotask boundary instead. */
const settle = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

/** THE AMBIENT PATH — the app's own: the client reads `window.provident.tabs` at each call and takes no injected member.
 *  This file installs exactly that member for the two rows that drive it and removes it after, so no row below depends on
 *  another row's window. */
const installAmbient = (bridge: TabsClientBridge | null): void => {
  ;(globalThis as unknown as Record<string, unknown>).window = bridge === null ? {} : { provident: { tabs: bridge } }
}
afterEach(() => {
  delete (globalThis as unknown as Record<string, unknown>).window
})

describe('the client derives the two terminals from `read()`\'s answer alone (L2 §6)', () => {
  it('TC-1 — THE LANDING WITNESS STANDS: `landing` names a row reading `active: true` and no other row does **whose `target` IS the landing page**, so the terminal is driven and the node it drives is the ENVELOPE\'s, resolved through the runtime', async () => {
    const member = stubMember(() => recordOf([landingRow(true), row('t1', false)], 'landing'))
    const resolver = recordingResolver()
    const reading = await createTabsClient({ bridge: member.bridge, runtime: resolver }).read()
    expect(reading.status).toBe('committed')
    if (reading.status !== 'committed') return
    expect(reading.landing).toBe('landing')
    expect(reading.witness.landing).toEqual({
      witness: true,
      nodeId: TABS_LANDING_PAGE_ID,
      activeIds: ['landing'],
      resolved: { id: TABS_LANDING_PAGE_ID, probe: true },
    })
    // the error terminal does NOT stand on this record, so its node is resolved by nothing at all
    expect(reading.witness.error).toEqual({ witness: false, nodeId: TABS_ERROR_PAGE_ID, tabId: null, resolved: null })
    expect(resolver.asked).toEqual([TABS_LANDING_PAGE_ID])
  })

  it('TC-2 — THE ERROR WITNESS STANDS: a row carries an `error` token, so the error terminal is driven and NAMES that tab, while the landing terminal stands on the active row it does not disturb', async () => {
    const rows = [landingRow(true), row('t9', false, 'unresolvable-target')]
    const resolver = recordingResolver()
    const reading = await createTabsClient({ bridge: stubMember(() => recordOf(rows, 'landing')).bridge, runtime: resolver }).read()
    if (reading.status !== 'committed') throw new Error(`expected a read, got ${reading.status}`)
    expect(reading.witness.error).toEqual({
      witness: true,
      nodeId: TABS_ERROR_PAGE_ID,
      tabId: 't9',
      resolved: { id: TABS_ERROR_PAGE_ID, probe: true },
    })
    expect(reading.witness.landing.witness).toBe(true)
    expect(resolver.asked).toEqual([TABS_LANDING_PAGE_ID, TABS_ERROR_PAGE_ID])
  })

  it('TC-3 — NEITHER TERMINAL STANDS: a record with no active row and no `error` token answers two false witnesses, resolves NO node, and still answers the record itself — the reading is a value, not an absence', async () => {
    const resolver = recordingResolver()
    const reading = await createTabsClient({
      bridge: stubMember(() => recordOf([row('t1', false), row('t2', false)], '')).bridge,
      runtime: resolver,
    }).read()
    if (reading.status !== 'committed') throw new Error(`expected a read, got ${reading.status}`)
    // `''` is L2 §2's `landing` on a record no legal act has left: it names no row, so nothing matches and nothing is driven
    expect(reading.witness.landing).toEqual({ witness: false, nodeId: TABS_LANDING_PAGE_ID, activeIds: [], resolved: null })
    expect(reading.witness.error).toEqual({ witness: false, nodeId: TABS_ERROR_PAGE_ID, tabId: null, resolved: null })
    expect(resolver.asked).toEqual([])
    expect(reading.rows.length).toBe(2)
  })

  it('TC-4 — TWO ACTIVES DO **NOT** READ AS A LANDING WITNESS (the row that reds if the predicate is ever weakened to one-of-many): `landing` names an active row and ANOTHER row reads active too, so both terminals stay undriven and the answer NAMES both active ids', async () => {
    const resolver = recordingResolver()
    const rows = [row('landing', true), row('t1', true)]
    const reading = await createTabsClient({ bridge: stubMember(() => recordOf(rows, 'landing')).bridge, runtime: resolver }).read()
    if (reading.status !== 'committed') throw new Error(`expected a read, got ${reading.status}`)
    expect(reading.witness.landing.witness).toBe(false)
    expect(reading.witness.landing.activeIds).toEqual(['landing', 't1'])
    expect(reading.witness.landing.resolved).toBeNull()
    expect(resolver.asked).toEqual([])
    // AND ITS SIBLING STATE, decided by the same comparison rather than by a second rule: ONE active row that is NOT the
    // landing entry is no witness either — the terminal stands on the LANDING PAGE being the shown tab's content, and not
    // on there being a shown tab at all (`D-210`). **THE OLD PREDICATE REACHED THIS `false` BY THE OTHER ROAD**: it compared
    // the active row against `answer.landing`, so this answer — where `landing` names an INACTIVE row, a state no legal act
    // leaves — was the only shape that could turn it off. The comparison is now the active row's `target` against
    // `TABS_LANDING_PAGE_ID` (a made-up `node-t1` here), so the row is answered `false` for the reason the derivation gives
    // rather than by an answer the record cannot produce.
    const moved = await createTabsClient({
      bridge: stubMember(() => recordOf([row('landing', false), row('t1', true)], 'landing')).bridge,
      runtime: recordingResolver(),
    }).read()
    if (moved.status !== 'committed') throw new Error(`expected a read, got ${moved.status}`)
    expect(moved.witness.landing.witness).toBe(false)
    expect(moved.witness.landing.activeIds).toEqual(['t1'])
  })
})

describe('the answers that are not a record are values, never throws (L2 §2/§3, and the absent member)', () => {
  it('TC-5 — `refused` IS A VALUE: the store\'s own `reason`, `message` and `address` are carried VERBATIM and the reading carries no witness at all — nothing is derived from a record that was not read', async () => {
    const member = stubMember(() => ({
      status: 'refused',
      reason: 'unknown-address',
      message: 'the instance refuses the read at ["tabs"]',
      address: ['tabs'],
    }))
    const reading: TabsClientReading = await createTabsClient({ bridge: member.bridge, runtime: recordingResolver() }).read()
    expect(reading).toEqual({
      status: 'refused',
      reason: 'unknown-address',
      message: 'the instance refuses the read at ["tabs"]',
      address: ['tabs'],
    })
    expect('witness' in reading).toBe(false)
  })

  it('TC-6 — THE ABSENT MEMBER IS STATED, in its three forms: no `window` at all (the node suite\'s shim installs `document` and no bridge), an injected `null`, and a member that carries no `read` route — and the SUBSCRIPTION answers the absent case too, with a withdrawal that is still callable', async () => {
    const noWindow = await createTabsClient().read()
    expect(noWindow).toEqual({ status: 'absent', reason: 'no-tabs-member' })

    const injected = await createTabsClient({ bridge: null }).read()
    expect(injected).toEqual({ status: 'absent', reason: 'no-tabs-member' })

    const routeless = await createTabsClient({ bridge: { onChanged: () => () => undefined } as unknown as TabsClientBridge }).read()
    expect(routeless).toEqual({ status: 'absent', reason: 'no-read-route' })

    // THE SUBSCRIPTION'S OWN ARM: nothing to register, and the caller still has something to call
    const subscription = createTabsClient().subscribe(() => undefined)
    expect(subscription.subscribed).toBe(false)
    expect(subscription.reason).toBe('no-tabs-member')
    expect(() => subscription.release()).not.toThrow()
  })

  it('TC-7 — A ROUTE THAT DID NOT ANSWER IS `unread`, AND NOT A REFUSAL: a rejecting route and an answer outside the declaration are both stated (the store never spoke, so no L2 §3 word is minted), and neither escapes as a throw', async () => {
    const rejecting = await createTabsClient({
      bridge: {
        read: () => Promise.reject(new Error('the IPC channel has no handler')),
        onChanged: () => () => undefined,
      },
    }).read()
    expect(rejecting).toEqual({ status: 'unread', reason: 'route-threw', detail: 'the IPC channel has no handler' })

    const notDeclared = await createTabsClient({ bridge: stubMember(() => ({ status: 'committed', landing: 'landing' })).bridge }).read()
    expect(notDeclared.status).toBe('unread')
    if (notDeclared.status !== 'unread') return
    expect(notDeclared.reason).toBe('answer-not-declared')
    expect(notDeclared.detail).toBe('order is not an array')

    // AND A RECORD WHOSE ROWS CANNOT ALL BE READ IS NOT A PARTIAL READING — a dropped row would move the very count the
    // landing witness is made of, so the whole answer is declined instead.
    const badRow = await createTabsClient({
      bridge: stubMember(() => ({ status: 'committed', order: ['t1'], landing: 't1', rows: [{ active: true }] })).bridge,
    }).read()
    expect(badRow.status).toBe('unread')
    if (badRow.status !== 'unread') return
    expect(badRow.detail).toBe('rows[0] carries no string id')

    // AND THE ANSWER'S OWN MEMBERS ARE A TRUST BOUNDARY TOO: reading `rows` off a member that THROWS is the same class as a
    // route that threw — the read is stated as `unread`, and `read()` does not become a route a caller must `try`.
    const hostileMember = {
      status: 'committed',
      order: ['t1'],
      landing: 't1',
      get rows(): readonly TabsRecordRow[] {
        throw new Error('the answer member threw')
      },
    }
    const hostile = await createTabsClient({ bridge: stubMember(() => hostileMember).bridge }).read()
    expect(hostile).toEqual({ status: 'unread', reason: 'answer-not-declared', detail: 'the answer member threw' })
  })
})

describe('the client re-reads after every change and holds no record of its own (L2 §6)', () => {
  it('TC-8 — A DELIVERY IS A RE-READ: the boot read is ONE read, one delivery is TWO and a second is THREE, and the handler is handed the reading the delivery produced — counted, because a subscription that installed nothing would fire nothing silently', async () => {
    const member = stubMember(() => recordOf([row('landing', true)], 'landing'))
    const client = createTabsClient({ bridge: member.bridge })
    const handed: TabsClientReading[] = []
    const subscription = client.subscribe((reading) => handed.push(reading))
    expect(subscription.subscribed).toBe(true)
    expect(subscription.reason).toBeNull()

    expect((await client.read()).status).toBe('committed')
    expect(member.reads()).toBe(1)

    member.deliver()
    await settle()
    expect(member.reads()).toBe(2)
    expect(handed.length).toBe(1)
    expect(handed[0]?.status).toBe('committed')

    member.deliver()
    await settle()
    expect(member.reads()).toBe(3)
    expect(handed.length).toBe(2)
  })

  it('TC-9 — THE WITHDRAWAL IS THE SUBSCRIPTION\'S ANSWER: after `release()` a delivery reads NOTHING and hands NOTHING, and the member says no listener is left — while the record itself is still readable, because the client\'s withdrawal withdraws a subscription and never a reading', async () => {
    const member = stubMember(() => recordOf([row('landing', true)], 'landing'))
    const client = createTabsClient({ bridge: member.bridge })
    let delivered = 0
    const subscription = client.subscribe(() => {
      delivered += 1
    })
    expect(member.listeners()).toBe(1)
    subscription.release()
    expect(member.listeners()).toBe(0)
    member.deliver()
    await settle()
    expect(delivered).toBe(0)
    expect(member.reads()).toBe(0)
    const stillThere = await client.read()
    expect(stillThere.status).toBe('committed')
  })

  it('TC-10 — NO SECOND RECORD IS HELD: the same client on a record that MOVED answers the NEW record on the next read (a cached row set would answer the old one), and it answers what the bridge said and nothing it composed', async () => {
    let shown: TabsCommittedAnswer = recordOf([row('landing', true)], 'landing')
    const member = stubMember(() => shown)
    const client = createTabsClient({ bridge: member.bridge })
    const first = await client.read()
    if (first.status !== 'committed') throw new Error(`expected a read, got ${first.status}`)
    expect(first.witness.landing.activeIds).toEqual(['landing'])
    shown = recordOf([row('landing', false), row('t4', true)], 't4')
    const second = await client.read()
    if (second.status !== 'committed') throw new Error(`expected a read, got ${second.status}`)
    expect(second.witness.landing.activeIds).toEqual(['t4'])
    // **AND THE LANDING TERMINAL DOES NOT STAND ON THAT RECORD** — the landing ENTRY is inactive and `t4` is the row reading
    // active, so no landing witness is derived. **THIS ROW USED TO ASSERT `true` HERE, AND THAT WAS THE TAUTOLOGY ASSERTED**
    // (`D-210`): the predicate compared the active row's id with `answer.landing`, which IS the active row's id, so any
    // record with exactly one active row answered `true` and this assertion could not fail. The witness re-grained in the
    // same edit is what makes the reading above and this one the app's real answer rather than a second spelling of the
    // same row compared with itself. **AND THE KEY IS THE TARGET**: `t4`'s target is a made-up `node-t4`, so the one active
    // row's content is NOT the landing page — the same `false`, now derived from the member the stage actually shows.
    expect(second.witness.landing.witness, 'the one active row is `t4` and its target is not the landing page, so the terminal does not stand (D-210)').toBe(false)
    expect(member.reads()).toBe(2)
  })

  it('TC-11 — THE AMBIENT PATH IS THE APP\'S: with `window.provident.tabs` installed and NO injected member, the client finds it and reads through it — the same member the preload exposes and the same one the node shim\'s absence is measured against in TC-6', async () => {
    const member = stubMember(() => recordOf([landingRow(true), row('t1', false)], 'landing'))
    installAmbient(member.bridge)
    const reading = await createTabsClient().read()
    if (reading.status !== 'committed') throw new Error(`expected a read, got ${reading.status}`)
    expect(reading.rows.length).toBe(2)
    expect(reading.witness.landing.witness).toBe(true)
    expect(member.reads()).toBe(1)
  })
})

describe('D-76\'s derivation, read from the client\'s side', () => {
  it('TC-12 — THE WITNESS IS A FUNCTION OF THE ANSWER ALONE: the same call over two records that differ only in `landing` answers two witnesses, and the resolver\'s absence changes NEITHER (a node-less drive derives the terminal and resolves no node)', () => {
    const rows = [landingRow(true), row('t1', false)]
    const withNode = deriveTabsWitness(recordOf(rows, 'landing'), recordingResolver())
    const withoutNode = deriveTabsWitness(recordOf(rows, 'landing'))
    expect(withNode.landing.witness).toBe(true)
    expect(withoutNode.landing.witness).toBe(true)
    expect(withoutNode.landing.resolved).toBeNull()
    expect(withoutNode.error).toEqual({ witness: false, nodeId: TABS_ERROR_PAGE_ID, tabId: null, resolved: null })
    // a resolver that throws is a node that was not resolved, never a throw out of a read
    const hostile = deriveTabsWitness(recordOf(rows, 'landing'), {
      elementForNodeId(): unknown | null {
        throw new Error('hostile query')
      },
    })
    expect(hostile.landing.witness).toBe(true)
    expect(hostile.landing.resolved).toBeNull()
  })
})
