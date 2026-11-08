// tests/integration/store-view-record/client.test.ts — THE SHAPE'S CLIENT, DRIVEN AT ITS BOUNDARY (D-89).
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40).
/**
 * ============================================================================
 * `store-view-record` — THE SHAPE'S CLIENT (`src/renderer/view-client.ts`): THE ONE
 * SUBSCRIPTION, THE DELIVERY'S RE-READ, THE SENT WRITE, AND THE FOUR ABSENT/UNREAD ARMS.
 *
 * WHY THIS BATTERY EXISTS AT ALL. The renderer's pane reads and its focus mirror used to be
 * answered by the FROZEN store IN THE CALLER'S OWN TURN (`resolve`), and the two test files
 * that pinned them counted the machinery that made that true — two registrations, a boot
 * mint, a two-tier read. `D-88` replaced that machinery with a CLIENT that holds the shape,
 * is refilled by deliveries and writes through the crossing's routes, and the two files'
 * registers were re-grained onto it (`D-89`). **A REGISTER THAT COUNTS ONE SUBSCRIPTION MUST
 * HAVE A ROW THAT PROVES THE SUBSCRIPTION DOES SOMETHING**, or the count is a decoration:
 * this file is that row's subject, driven against a boundary double that models the wire.
 *
 * THE DOUBLE IS A BOUNDARY AND NOT A STORE: `read`/`commitPane`/`commitZones`/`commitTheme`/`onChanged` are the
 * members L2 §2 declares (`docs/L2/view-record/interface.md`), each recording what it was handed. Nothing here opens an
 * instance, and nothing here asserts the crossing's own behaviour — that is
 * `tests/integration/store-view-record/crossing.test.ts`'s, which drives the real `provident-storeroom` instance.
 *
 * **THE FOCUS MEMBER AND ITS ROUTE ARE GONE WITH THE FAMILY** (`D-142`): this file spoke `commitFocus`, `focusState()` and
 * a `focus` member of every answer, and the wire it models no longer has any of the three. So `C-7` — *"the focus route
 * takes the whole mirror"* — RETIRES WITH ITS REFERENT (`D-9`), its id left unspent; `C-1`…`C-4`, `C-9` and `C-10` are
 * RE-GRAINED onto the three surviving families, and `C-5`, `C-6` and `C-8` are UNTOUCHED because nothing they drive moved.
 *
 * **RE-GRAINED AGAIN FOR REV 7: THE DRAG FAMILY'S TWO ROUTES** (`docs/L2/view-record/interface.md` §2, `D-132`). The member L2 declares carries
 * `commitDrag(paneId, geometry)` and `clearDrag()` beside the three commits, so the double below models both and `C-11` drives them: a placement sent with
 * the pane id, a clear sent with NO argument at all, and a receipt whose `route` word is `drag`. **`C-1`…`C-6` AND `C-8`…`C-10` STAY UNTOUCHED** — nothing
 * they drive moved — and **`C-11` IS RED AT THIS HEAD BY CONSTRUCTION**: the client does not carry the two members until L4 lands, so the row's first
 * assertion names the absence rather than a behaviour (D-40).
 *
 * WHAT IS CLAIMED: the shape is filled FROM A READ and never invented; a delivery costs
 * exactly one re-read and ZERO writes; a write is SENT and its receipt lands later; a
 * release withdraws the one registration; and every arm of the client is a VALUE. **NO TIMING
 * FIGURE IS CLAIMED ANYWHERE** — "a tick later" is an ORDER (the receipt is not the answer),
 * never a duration.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest'

import {
  createViewClient,
  type ViewClient,
  type ViewCommittedReading,
  type ViewSubscription,
  type ViewWriteStatement,
} from '../../../src/renderer/view-client'
import {
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  viewThemePlaceholder,
} from '../../../src/shared/view-shape'

/** **THE APPEARANCE FAMILY'S DECLARED PLACEHOLDER** (D-97), taken from the ONE spelling both realms read rather than typed
 *  here — the creation repair mints exactly this value and the client's cold shape answers it, so a double that states it
 *  by hand would be a second spelling of the record the wire is being tested against. */
const PLACEHOLDER = viewThemePlaceholder()

/** ONE ZONE as the wire carries it (D-91) — the four members the frozen store kept, each optional, `id` the family's key. */
interface WireZone {
  readonly id: string
  readonly slot?: unknown
  readonly distance?: number
  readonly size?: number
  readonly display?: string
}

/** ONE PANE'S GEOMETRY as the wire carries it — the crossing's own admission is the store's
 *  business; this file only states values a boundary could legally hand over. */
interface WirePane {
  readonly id: string
  readonly size: number
  readonly bounds: { readonly min: number; readonly max: number }
}

/** **THE BOUNDARY DOUBLE** — the member's surviving routes, each recording what it was handed,
 *  with the routes' answers deferred so the caller's-turn/sent distinction is drivable. */
interface BoundaryDouble {
  readonly member: unknown
  readonly reads: () => number
  readonly writes: () => readonly { readonly route: 'pane' | 'zone' | 'theme' | 'drag'; readonly args: readonly unknown[] }[]
  readonly registrations: () => number
  readonly withdrawals: () => number
  /** Fire the one push the crossing sends after a committed write. */
  readonly deliver: () => void
  /** Answer the next `read` with this value (the wire's answer, whatever it is). */
  readonly answerWith: (value: unknown) => void
  /** Answer the next route call with this promise (refused / thrown / deferred). */
  readonly nextRouteAnswer: (answer: Promise<unknown>) => void
  /** Make the next reads REJECT — a transport fault, which is a statement about the wire and never about the record. */
  readonly failReads: () => void
  /** The reading the double's `read` answers when nothing else was installed. **THE ZONE FAMILY IS A PARAMETER WITH AN
   *  EMPTY DEFAULT** (D-91): every row that does not drive a zone states the family's DECLARED EMPTY arm, and the one row
   *  that does supplies it — so no row can pass while the wire silently omitted the family, because the parse requires it. */
  readonly committed: (panes: readonly WirePane[], zones?: readonly WireZone[]) => ViewCommittedReading
}

/** The double's member, narrowed at the ONE place it crosses into the client's option type — a test double is a boundary,
 *  and the cast is stated here rather than sprinkled at every call site. */
const asBridge = (member: unknown): never => member as never

function doubleOf(options: { readonly withChanged?: boolean; readonly withRead?: boolean } = {}): BoundaryDouble {
  let reads = 0
  let withdrawals = 0
  const writes: Array<{ route: 'pane' | 'zone' | 'theme' | 'drag'; args: readonly unknown[] }> = []
  const handlers: Array<() => void> = []
  let answer: unknown = {
    status: 'committed',
    panes: [{ id: DEFAULT_PANE_ID, size: DEFAULT_PANE_SIZE, bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } }],
    zones: [],
    // **THE APPEARANCE FAMILY, AT THE PLACEHOLDER THE CREATION REPAIR MINTS** (D-97): a declaration whose `name` is absent,
    // which is the one record that can be applied nowhere — so a row that drives the appearance family supplies its own.
    theme: PLACEHOLDER,
    source: { panes: 'record', zones: 'record', theme: 'record' },
  }
  let routeAnswer: Promise<unknown> = Promise.resolve({ status: 'committed' })
  let failing = false
  const member: Record<string, unknown> = {
    commitPane: (id: unknown, geometry: unknown): Promise<unknown> => {
      writes.push({ route: 'pane', args: [id, geometry] })
      return routeAnswer
    },
    // **THE ZONE ROUTE** (D-91): one id and the members the caller has, recorded as sent.
    commitZones: (id: unknown, zone: unknown): Promise<unknown> => {
      writes.push({ route: 'zone', args: [id, zone] })
      return routeAnswer
    },
    // **THE APPEARANCE ROUTE, ON THE MEMBER AND NOT ON THE DOUBLE** (D-97): it records the ACT it was handed — the setting
    // and the caller-held attribute name — so a row can prove this realm sends no declaration.
    commitTheme: (token: unknown, attributeName: unknown): Promise<unknown> => {
      writes.push({ route: 'theme', args: [token, attributeName] })
      return routeAnswer
    },
    // **THE DRAG FAMILY'S TWO ROUTES** (`D-132`): the placement the gesture read, sent with the pane id, and the clear — sent with NO argument, which is
    // the `null` arm `D-140` spent a row removing. Each is recorded as a write, because a route whose call the double never sees is a route the client
    // did not send.
    commitDrag: (id: unknown, geometry: unknown): Promise<unknown> => {
      writes.push({ route: 'drag', args: [id, geometry] })
      return routeAnswer
    },
    clearDrag: (): Promise<unknown> => {
      writes.push({ route: 'drag', args: [] })
      return routeAnswer
    },
  }
  if (options.withRead !== false) {
    member['read'] = (): Promise<unknown> => {
      reads += 1
      return failing ? Promise.reject(new Error('ipc boom')) : Promise.resolve(answer)
    }
  }
  if (options.withChanged !== false) {
    member['onChanged'] = (handler: () => void): (() => void) => {
      handlers.push(handler)
      return (): void => {
        const at = handlers.indexOf(handler)
        if (at < 0) return
        handlers.splice(at, 1)
        withdrawals += 1
      }
    }
  }
  return {
    member,
    reads: (): number => reads,
    writes: (): readonly { readonly route: 'pane' | 'zone' | 'theme' | 'drag'; readonly args: readonly unknown[] }[] => writes,
    registrations: (): number => handlers.length,
    withdrawals: (): number => withdrawals,
    deliver: (): void => {
      for (const handler of [...handlers]) handler()
    },
    answerWith: (value: unknown): void => {
      answer = value
    },
    failReads: (): void => {
      failing = true
    },
    nextRouteAnswer: (next: Promise<unknown>): void => {
      routeAnswer = next
    },
    committed: (panes: readonly WirePane[], zones: readonly WireZone[] = []): ViewCommittedReading => ({
      status: 'committed',
      panes,
      zones: zones as ViewCommittedReading['zones'],
      theme: PLACEHOLDER,
      source: { panes: 'record', zones: 'record', theme: 'record' },
    }),
  }
}

/** Let the microtask queue drain — the ONE await this file spends, so a sent write's receipt
 *  has landed by the time it is read (`writeOutcome()`'s own statement: a tick later). */
const settle = async (): Promise<void> => {
  await Promise.resolve()
  await Promise.resolve()
}

const pane = (id: string, size: number, min = 0, max = 200): WirePane => ({ id, size, bounds: { min, max } })

describe('view client · the shape is filled FROM A READ, never invented', () => {
  it('C-1 · BEFORE ANYTHING ANSWERS the shape is UNFILLED and answers the MEASURED DEFAULT — `filled: false` is the statement that nothing has been read, and it is never a claim about a store', () => {
    const client: ViewClient = createViewClient({ bridge: asBridge(doubleOf().member) })
    expect(client.shape().filled, 'nothing has answered yet').toBe(false)
    expect(client.reading(), 'and no reading stands').toBeNull()
    expect(client.paneSizeOf(DEFAULT_PANE_ID), 'the measured default, which is the authored pane\'s `props.size`').toBe(DEFAULT_PANE_SIZE)
    expect(client.paneBoundsOf('any-pane'), 'and the authored `props.min`/`props.max` pair').toEqual({
      min: DEFAULT_PANE_BOUNDS.min,
      max: DEFAULT_PANE_BOUNDS.max,
    })
    expect(client.zoneOf('zone-1'), 'and a zone answers its ABSENCE — the family has no measured default to give it (D-91)').toBeNull()
  })

  it('C-2 · `fill()` IS THE ONE STATED BOOT READ: it reads ONCE, adopts the answer WHOLE, and the shape then answers the record\'s own values with the crossing\'s two `source` words', async () => {
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    double.answerWith(
      double.committed([pane('pane-a', 240), pane('pane-b', 90, 10, 400)], [{ id: 'zone-1', size: 160, display: 'normal' }]),
    )
    const reading = await client.fill()
    expect(double.reads(), 'exactly one read — the boot read is stated and single').toBe(1)
    expect(reading.status, 'the committed arm is the answer').toBe('committed')
    expect(client.shape().filled).toBe(true)
    expect(client.shape().panes.map((held) => held.id).sort(), 'the family is the panes it can state').toEqual(['pane-a', 'pane-b'])
    expect(client.paneSizeOf('pane-a'), 'and the read is the record\'s value').toBe(240)
    expect(client.paneBoundsOf('pane-b'), 'the pair AS STORED, never a clamped policy').toEqual({ min: 10, max: 400 })
    expect(client.paneSizeOf('pane-never-written'), 'a pane the family does not name answers the measured default').toBe(DEFAULT_PANE_SIZE)
    expect(client.zoneOf('zone-1'), 'the zone the wire carried, member for member').toEqual({ id: 'zone-1', size: 160, display: 'normal' })
    expect(
      client.shape().source,
      'the record answered all three families — the appearance record included, whose `source` is the crossing\'s own word (D-97)',
    ).toEqual({ panes: 'record', zones: 'record', theme: 'record' })
    expect(client.zoneOf('zone-never-written'), 'and a zone the family does not name answers its ABSENCE, not a geometry').toBeNull()
  })

  it('C-3 · THE ONE SUBSCRIPTION, AND THE DELIVERY\'S ONLY CORRECT ANSWER IS A FRESH READ: one registration, one push → exactly ONE re-read, and the shape is REPLACED WHOLE by what that read answered', async () => {
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    await client.fill()
    const before = double.reads()
    const readings: string[] = []
    const subscription: ViewSubscription = client.subscribe((reading) => readings.push(reading.status))
    expect(subscription.subscribed, 'the push route exists, so the registration installs').toBe(true)
    expect(subscription.reason).toBeNull()
    expect(double.registrations(), 'ONE registration over the families — the count the registers were re-grained to').toBe(1)
    // THE WRITE HAPPENS ELSEWHERE (the crossing's store) AND THE PUSH CARRIES AN ADDRESS, NOT A VALUE — so the only correct
    // answer to it is a re-read, and that read is what refills the shape.
    double.answerWith(double.committed([pane('pane-a', 260)]))
    double.deliver()
    await settle()
    expect(double.reads() - before, 'one delivery costs exactly one read').toBe(1)
    expect(client.paneSizeOf('pane-a'), 'and the shape is the new family — REPLACED, never amended in place').toBe(260)
    expect(client.shape().zones, 'a family the read no longer carries is gone, not remembered').toEqual([])
    expect(readings, 'the caller\'s handler is handed the reading').toEqual(['committed'])
  })

  it('C-4 · NO WRITE-ON-READ AND NO POLL: a delivery, a `fill()` and every read member write NOTHING — the write log stays EMPTY through all of them', async () => {
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    await client.fill()
    client.subscribe(() => undefined)
    double.deliver()
    await settle()
    client.paneSizeOf(DEFAULT_PANE_ID)
    client.paneBoundsOf(DEFAULT_PANE_ID)
    client.zoneOf('zone-1')
    client.themeRecord()
    client.shape()
    expect(double.writes(), 'a read that misses leaves the miss; the repair that makes a family stand is the crossing\'s declaration at creation, never this side').toEqual([])
  })
})

describe('view client · the write is SENT, and its receipt is not the answer', () => {
  it('C-5 · `commitPane` ANSWERS `{status:\'sent\'}` IN THE CALLER\'S TURN and the crossing\'s answer lands in `writeOutcome()` later — no caller composes anything from a receipt', async () => {
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    const statement = client.commitPane('pane-a', { size: 260 })
    expect(statement, 'the same turn: the route was handed the write').toEqual({ status: 'sent' })
    expect(client.writeOutcome(), 'and nothing has landed yet').toBeNull()
    await settle()
    expect(client.writeOutcome()?.status, 'the receipt, a tick later').toBe('committed')
    expect(double.writes(), 'ONE route call, one whole member, and the id names the pane — never a path, never a tier').toEqual([
      { route: 'pane', args: ['pane-a', { size: 260 }] },
    ])
  })

  it('C-6 · A REFUSED WRITE IS A READING, NOT A SILENT NO-OP: the crossing\'s own refusal record is carried with its `reason` and `message`, and the vocabulary stays the store\'s', async () => {
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    double.nextRouteAnswer(Promise.resolve({ status: 'refused', reason: 'malformed-geometry', message: 'the supplied size is not a finite non-negative number' }))
    client.commitPane('pane-a', { size: -1 })
    await settle()
    const outcome = client.writeOutcome()
    expect(outcome?.status, 'refused, and stated as such').toBe('refused')
    expect(outcome?.reason).toBe('malformed-geometry')
    expect(outcome?.message).toBe('the supplied size is not a finite non-negative number')
    expect(outcome?.route).toBe('pane')
  })

  it('C-11 · THE DRAG ROUTES ARE SENT LIKE ANY OTHER WRITE: `commitDrag` hands the member a pane **id** and a placement, `clearDrag` hands it NOTHING, each answers `{status:\'sent\'}` in the caller\'s turn, and both receipts land with the route word `drag` — never a path and never a tier (D-132)', async () => {
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    // **THE INSTRUMENT, AND WHY IT IS A CAST**: L2 §2 declares the two members on the member and on the client, and the client is compiled before L4
    // lands — so the row reads the two names off the object L2 declares and answers a red whose message IS the absence (`drag.commitDrag is not a
    // function`), rather than a `tsc` error that would stop the whole leg from compiling the battery (D-40).
    const drag = client as unknown as {
      commitDrag?: (id: string, geometry: unknown) => ViewWriteStatement
      clearDrag?: () => ViewWriteStatement
    }
    expect(typeof drag.commitDrag, 'the client carries the temp family\'s move route').toBe('function')
    expect(typeof drag.clearDrag, 'and its clear route').toBe('function')
    const sent = drag.commitDrag as (id: string, geometry: unknown) => ViewWriteStatement
    const clear = drag.clearDrag as () => ViewWriteStatement
    expect(sent('pane-a', { size: 180 }), 'the same turn: the placement was handed to the route').toEqual({ status: 'sent' })
    expect(clear(), 'and the clear is sent with NO argument at all').toEqual({ status: 'sent' })
    await settle()
    expect(double.writes(), 'TWO calls at the member\'s drag routes, the second carrying no argument — the `null` arm stays unspent').toEqual([
      { route: 'drag', args: ['pane-a', { size: 180 }] },
      { route: 'drag', args: [] },
    ])
    expect(client.writeOutcome()?.route as string, 'and the receipt names the drag family, as the three commits name theirs').toBe('drag')
  })

  // ── RETIRED WITH ITS REFERENT (`D-9`, `D-142`): `C-7`, 'THE FOCUS ROUTE TAKES THE WHOLE MIRROR' ──
  // The row sent a whole mirror through `commitFocus` and read the route log. **THAT ROUTE, THAT MEMBER AND THE MIRROR'S
  // WHOLE-VALUE COMPOSITION ALL LEAVE THE MODULE** (`D-142`), so the row has no subject and its id stays UNSPENT rather
  // than being handed to another claim — a re-used id would make a prior reading unresolvable. The surviving routes'
  // sent-write behaviour is `C-5`'s (panes) and `C-10`'s double (`commitZones`' log), which drive the same claim.
})

describe('view client · the release, and the arms that are VALUES', () => {
  it('C-8 · THE RELEASE WITHDRAWS THE ONE REGISTRATION EXACTLY ONCE, and a later delivery delivers NOTHING — idempotent and non-throwing', async () => {
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    let delivered = 0
    const subscription = client.subscribe(() => {
      delivered += 1
    })
    subscription.release()
    subscription.release()
    expect(double.withdrawals(), 'the bridge\'s withdrawal, called exactly once').toBe(1)
    expect(double.registrations(), 'and the registration set is empty').toBe(0)
    const readsBefore = double.reads()
    double.deliver()
    await settle()
    expect(delivered, 'a released subscription is delivered nothing').toBe(0)
    expect(double.reads() - readsBefore, 'and costs no read').toBe(0)
  })

  it('C-9 · EVERY ARM IS A VALUE: an ABSENT member, a member with no read route, a THROWING read, an undeclared answer and an absent route each answer their declared word — nothing throws out of any member', async () => {
    // (a) NO MEMBER AT ALL — `bridge: null` states the realm that has none, which is the node shim's own case.
    const absent = createViewClient({ bridge: null })
    expect(await absent.fill(), 'the absence is the declared arm').toMatchObject({ status: 'absent', reason: 'no-view-member' })
    expect(absent.paneSizeOf(DEFAULT_PANE_ID), 'and the measured default still answers').toBe(DEFAULT_PANE_SIZE)
    expect(absent.commitPane('pane-a', { size: 1 })).toEqual({ status: 'absent', reason: 'no-view-member' })
    expect(absent.subscribe(() => undefined)).toMatchObject({ subscribed: false, reason: 'no-view-member' })
    // (b) A MEMBER WITH NO `read` ROUTE — an older preload.
    const noRead = createViewClient({ bridge: asBridge(doubleOf({ withRead: false }).member) })
    expect(await noRead.fill()).toMatchObject({ status: 'absent', reason: 'no-read-route' })
    // (c) A THROWING READ is a statement about the TRANSPORT: the shape keeps what it last read and the arm says so.
    const throwing = doubleOf()
    const throwingClient = createViewClient({ bridge: asBridge(throwing.member) })
    throwing.answerWith(throwing.committed([pane('pane-a', 320)]))
    await throwingClient.fill()
    throwing.failReads()
    const unread = await throwingClient.fill()
    expect(unread).toMatchObject({ status: 'unread', reason: 'route-threw' })
    expect(unread.status === 'unread' ? unread.detail : null, 'the transport\'s own message is carried, never swallowed').toBe('ipc boom')
    expect(throwingClient.shape().filled, 'and the shape KEEPS what it last read — a fault is not an empty record').toBe(true)
    expect(throwingClient.paneSizeOf('pane-a'), 'the last good family still answers').toBe(320)
    // (d) AN UNDECLARED ANSWER IS NEVER A SHAPE DERIVED FROM A PARTIAL RECORD. The answer below carries a `focus` member
    // the wire no longer has AND omits the zone family the parse requires, so it is refused on the declared members.
    const partial = doubleOf()
    const partialClient = createViewClient({ bridge: asBridge(partial.member) })
    partial.answerWith({ status: 'committed', panes: 'not-an-array', focus: { entries: [] }, source: { panes: 'record', focus: 'record' } })
    expect(await partialClient.fill()).toMatchObject({ status: 'unread', reason: 'answer-not-declared' })
    expect(partialClient.shape().filled, 'nothing was adopted from it').toBe(false)
    // (e) A REFUSED READ IS NOT AN ARM THIS ROUTE DECLARES — L2 §2 §2's own measurement — so it is reported, never carried.
    const refused = doubleOf()
    const refusedClient = createViewClient({ bridge: asBridge(refused.member) })
    refused.answerWith({ status: 'refused', reason: 'no-such-anchor' })
    expect(await refusedClient.fill()).toMatchObject({ status: 'unread', reason: 'answer-not-declared' })
  })

  it('C-10 · THE SHAPE ADMITS WHAT IT READ: a member the boundary admits field-by-field is kept, a malformed pane is DROPPED, and a malformed zone is dropped while an opaque slot is carried — the crossing\'s own dispositions, applied on this side of the wire', async () => {
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    double.answerWith({
      status: 'committed',
      panes: [pane('pane-a', 240), { id: 'pane-broken', size: 'x', bounds: { min: 0, max: 1 } }],
      zones: [
        { id: 'zone-1', size: 160, display: 'normal', slot: 'doc-nav' },
        { id: 'zone-broken', size: 'x' },
        { id: 'zone-opaque', slot: { token: [1, 'two'] }, distance: 37 },
      ],
      // the appearance record is a REQUIRED member (D-97), and this row is about the families that admit member by
      // member — so it is the placeholder, stated from the one spelling both realms read.
      theme: PLACEHOLDER,
      source: { panes: 'record', zones: 'record', theme: 'record' },
    } as unknown)
    await client.fill()
    expect(client.shape().panes.map((held) => held.id), 'the malformed member is not a pane the family names').toEqual(['pane-a'])
    expect(client.paneSizeOf('pane-broken'), 'and it answers the measured default rather than a partial record').toBe(DEFAULT_PANE_SIZE)
    expect(client.shape().zones.map((held) => held.id), 'the malformed zone is DROPPED and the opaque slot is KEPT').toEqual(['zone-1', 'zone-opaque'])
    expect(client.zoneOf('zone-broken'), 'so the zone the family could not state answers its ABSENCE').toBeNull()
    expect(client.zoneOf('zone-1'), 'and the admitted one answers exactly the members the wire carried').toEqual({
      id: 'zone-1',
      slot: 'doc-nav',
      size: 160,
      display: 'normal',
    })
    expect(client.zoneOf('zone-opaque'), 'the opaque slot is carried, never interpreted').toEqual({
      id: 'zone-opaque',
      slot: { token: [1, 'two'] },
      distance: 37,
    })
  })
})
