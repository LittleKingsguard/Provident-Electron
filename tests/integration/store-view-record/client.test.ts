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
 *
 * **RE-GRAINED AGAIN FOR REV 14 §9: THE RECEIPT GAINS ITS SECOND HALF, AND THE ROW IS `C-12`**
 * (`docs/L2/view-record/interface.md` §9, `docs/L3/renderer-wiring/design.md` §2 `N2`; the user's ruling
 * verbatim *"Give the three routes a reader"*, `D-126`'s `F10`). §9 gains ONE member beside the getter —
 * `onWriteOutcome(handler)`, the receipt PUSHED from the very continuation in `send` that assigns the hold —
 * so this file gains ONE row measuring the pair the section states: **`writeOutcome()` is the STATE and
 * `onWriteOutcome` the EVENT**, the relation `reading()`/`subscribe()` already are one register up. The row
 * is a COMPANION and not a replacement: **`C-5`, `C-6` AND `C-11` ARE BYTE-IDENTICAL THROUGH THIS PASS** —
 * they are the getter's rows, the member they drive is unchanged, and a re-grain there would be a claim the
 * landing did not make.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest'

import {
  createViewClient,
  type ViewClient,
  type ViewCommittedReading,
  type ViewSubscription,
  type ViewWriteOutcome,
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
    expect(client.paneSizeOf(DEFAULT_PANE_ID), 'the measured default — the figure `D-87` measured off the authored pane\'s `props.size`, which the node NO LONGER CARRIES (`F11`, `D-129`)').toBe(DEFAULT_PANE_SIZE)
    expect(client.paneBoundsOf('any-pane'), 'and the measured bounds pair, measured the same way and carried by nothing in the envelope since `F11`').toEqual({
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

/**
 * ============================================================================
 * `C-12` — THE RECEIPT'S TWO HALVES: THE PUSH IS THE *EVENT* AND THE GETTER IS THE
 * *STATE* (`docs/L2/view-record/interface.md` §9; `docs/L3/renderer-wiring/design.md`
 * §2 `N2`; the user's ruling verbatim *"Give the three routes a reader"*).
 *
 * WHY THIS ROW EXISTS AND WHY IT IS NOT `C-5`'s. `D-126`'s `F10` measured that `writeOutcome()`
 * had no `src/` reader, and the ruling closed it by GIVING THE MEMBER A READER rather than by
 * deleting it. So §9 now states a PAIR: the getter HOLDS the last SENT write's answer, and
 * `onWriteOutcome` PUSHES that same record from the very continuation in `send` that assigns the
 * hold. **`C-5`, `C-6` AND `C-11` ARE THE GETTER'S ROWS AND CHANGE NO BYTE** — the member is
 * unchanged — so this is a COMPANION row and the only one here that reads the push at all.
 *
 * WHAT EACH CLAUSE CANNOT LET THROUGH:
 *   (a) a push that fires TWICE for one write, or that mints a SECOND record — the row asserts
 *       the exact count AND identity with what the getter then answers, on BOTH arms;
 *   (b) a handler that throws taking the write path or its neighbour with it — the record is
 *       assigned BEFORE any handler runs, and each call is contained;
 *   (c) a withdrawal that is not idempotent, or one that leaves the handler receiving — and the
 *       STATE it does not touch, because the withdrawal takes the EVENT;
 *   (d) **THE SHARPEST FACT IN §9**: `send` records NOTHING for an `absent` statement, so a
 *       getter-only reader STRUCTURALLY cannot see a write that went nowhere — it would answer
 *       an OLDER receipt instead. The clause drives both `absent` reasons and proves the
 *       silence, with the older receipt standing beside it.
 * ============================================================================
 */
describe('view client · the receipt is a STATE and an EVENT — `writeOutcome()` holds it, `onWriteOutcome()` pushes it (L2 §9)', () => {
  it('C-12 — **A REGISTERED HANDLER RECEIVES THE SAME RECORD THE GETTER THEN ANSWERS**, once per write, on the `committed` arm AND the `refused` one; a THROWING handler breaks neither the write path nor its neighbour; the WITHDRAWAL is idempotent and ends the event while the state stands; and an `absent` statement publishes NOTHING at all', async () => {
    // ══ (a) THE PAIR, ON BOTH ARMS. The push and the hold are ONE record: `publish` assigns the hold first and
    //    then hands that very object out, so a row that saw two different records would have caught a second mint.
    const double = doubleOf()
    const client = createViewClient({ bridge: asBridge(double.member) })
    const pushed: ViewWriteOutcome[] = []
    client.onWriteOutcome((outcome) => pushed.push(outcome))
    expect(client.writeOutcome(), 'C-12 — before any write the STATE is `null`, and the event has nothing to carry').toBeNull()
    expect(pushed, 'C-12 — and nothing is pushed at registration: the member subscribes and holds nothing').toEqual([])

    expect(client.commitPane('pane-a', { size: 260 }), 'C-12 — the caller\'s turn still answers the STATEMENT, not the receipt').toEqual({
      status: 'sent',
    })
    expect(pushed, 'C-12 — the push is not the caller\'s turn either: the answer has not arrived').toEqual([])
    await settle()
    expect(pushed.length, 'C-12 — **ONE write, ONE push**: a second publish for one continuation would read `2`').toBe(1)
    expect(pushed[0], 'C-12 — **and the record handed out IS the record held** (`toBe`: the same object, never a copy that could disagree)').toBe(
      client.writeOutcome(),
    )
    expect(pushed[0]?.status, 'C-12 — the first arm: the crossing committed it').toBe('committed')

    // THE REFUSED ARM, driven through the same register: a refusal produces NO delivery, which is exactly why a
    // reader of the shape's subscription could not be this reader at all.
    double.nextRouteAnswer(
      Promise.resolve({ status: 'refused', reason: 'malformed-geometry', message: 'the supplied size is not a finite non-negative number' }),
    )
    client.commitPane('pane-a', { size: -1 })
    await settle()
    expect(pushed.length, 'C-12 — the second write is the second push, and never a re-push of the first').toBe(2)
    const refused = pushed[1]
    expect(refused, 'C-12 — and the refusal is the same record the getter holds').toBe(client.writeOutcome())
    expect(
      [refused?.route, refused?.status, refused?.reason, refused?.message],
      'C-12 — carrying the family word and the crossing\'s own `reason`/`message`, VERBATIM: the reader a refusal is given is the whole point of the row (`F10`)',
    ).toEqual(['pane', 'refused', 'malformed-geometry', 'the supplied size is not a finite non-negative number'])

    // ══ (b) A THROWING HANDLER IS CONTAINED. It is registered FIRST, so a publish that let it out would skip the
    //    handler behind it — the reading below is the neighbour's call count, not merely "nothing crashed".
    const contained = doubleOf()
    const containedClient = createViewClient({ bridge: asBridge(contained.member) })
    const neighbours: ViewWriteOutcome[] = []
    containedClient.onWriteOutcome(() => {
      throw new Error('the caller\'s handler, the caller\'s error')
    })
    const withdrawNeighbour = containedClient.onWriteOutcome((outcome) => neighbours.push(outcome))
    expect(containedClient.commitPane('pane-a', { size: 10 }), 'C-12 — the write path is unmoved by the handler ahead of the answer').toEqual({
      status: 'sent',
    })
    await settle()
    expect(neighbours.length, 'C-12 — **the second handler is still called**: a throw that escaped its own call would stop the loop here').toBe(1)
    expect(
      containedClient.writeOutcome()?.status,
      'C-12 — and the record is HELD, because it is assigned before any handler runs: a throwing handler loses only its own report',
    ).toBe('committed')
    expect(neighbours[0], 'C-12 — the neighbour is handed the same record the getter answers, on a register that also threw').toBe(
      containedClient.writeOutcome(),
    )

    // ══ (c) THE WITHDRAWAL: IDEMPOTENT, AND IT TAKES THE EVENT AND NOT THE STATE.
    expect(() => {
      withdrawNeighbour()
      withdrawNeighbour()
    }, 'C-12 — **a SECOND withdrawal is not an error**: this realm\'s registration has no bridge half to refuse, so the withdrawal is `() => void` and total').not.toThrow()
    containedClient.commitPane('pane-a', { size: 12 })
    await settle()
    expect(neighbours.length, 'C-12 — and after the withdrawal the handler receives NOTHING, though the write was sent and answered').toBe(1)
    expect(
      containedClient.writeOutcome()?.status,
      'C-12 — **the STATE stands**: the withdrawal ends the event, and the getter keeps answering the last SENT write\'s answer (L2 §9)',
    ).toBe('committed')

    // ══ (d) THE `absent` ARM PUBLISHES NOTHING — AND THE GETTER STILL ANSWERS AN OLDER RECEIPT. This is the fact
    //    §9 calls the sharpest in the section: there is no route behind an `absent` statement, so there is no
    //    answer to push, and a reader of the hold alone would report the previous write as though it were this one.
    const absent = createViewClient({ bridge: null })
    const absentPushes: ViewWriteOutcome[] = []
    absent.onWriteOutcome((outcome) => absentPushes.push(outcome))
    expect(absent.commitPane('pane-a', { size: 1 }), 'C-12 — `no-view-member`: the realm states for itself that it has no crossing').toEqual({
      status: 'absent',
      reason: 'no-view-member',
    })
    expect(absent.commitDrag('pane-a', { size: 1 }), 'C-12 — and the drag route answers the same arm').toEqual({
      status: 'absent',
      reason: 'no-view-member',
    })
    await settle()
    expect(absentPushes, 'C-12 — **NOTHING is pushed for an `absent` statement**: a write that went nowhere has no receipt').toEqual([])
    expect(absent.writeOutcome(), 'C-12 — and the STATE stands empty, rather than holding a receipt this write never earned').toBeNull()

    // THE SECOND `absent` REASON, AND THE CLAUSE THAT MAKES THE ROW BITE: a SENT write first, so a hold stands, and
    // then the member loses the route — an older preload, `C-9`(b)'s lawful degradation. The push is silent for it,
    // and the getter answers the FIRST write's record: the stale reading a getter-only reader would present as news.
    const older = doubleOf()
    const member = older.member as Record<string, unknown>
    const olderClient = createViewClient({ bridge: asBridge(older.member) })
    const olderPushes: ViewWriteOutcome[] = []
    olderClient.onWriteOutcome((outcome) => olderPushes.push(outcome))
    olderClient.commitPane('pane-a', { size: 20 })
    await settle()
    expect(olderPushes.length, 'C-12 — the control: one sent write, one push').toBe(1)
    const standing = olderClient.writeOutcome()
    expect(standing?.status, 'C-12 — and the hold the next clause is read against').toBe('committed')
    delete member['commitDrag']
    expect(olderClient.commitDrag('pane-a', { size: 21 }), 'C-12 — `no-route`: the member answered and the route is not there').toEqual({
      status: 'absent',
      reason: 'no-route',
    })
    await settle()
    expect(olderPushes.length, 'C-12 — **`send` publishes NOTHING for the `absent` arm, on either reason**').toBe(1)
    expect(
      olderClient.writeOutcome(),
      'C-12 — **and the getter answers the OLDER receipt, unchanged**: this is why a getter-only reader structurally cannot see a write that went nowhere, and why the push is not a convenience',
    ).toBe(standing)
  })
})
