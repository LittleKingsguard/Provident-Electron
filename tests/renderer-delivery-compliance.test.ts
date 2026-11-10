// tests/renderer-delivery-compliance.test.ts — **THE RENDERED SURFACE MEASURED AGAINST ITS OWN PATTERN** (`D-126`'s audit;
// this file is where each finding lands as a row as it is closed).
//
// THE PATTERN, AS THE MEASURE (`D-125`, generalised at `D-126`): (1) an operator's act writes the STORE first; (2) a constraint
// repairs; (3) a listener RENDERS the delivery; (4) a local transient is lawful only with one writer, no persistence, no
// crossing, no second reader, and no outliving of the delivery that answers it. The audit found ELEVEN violations. This file
// carries the rows for those the wiring can close, one describe per finding, and each row names the finding it discharges.
//
// AUTHORED AFTER the `D-30` sweep, so it carries NO `strata:marked-file` marker and GATES (`AGENTS.md`).
//
//   · `DC-1`…`DC-4` — FINDING `F7`, THE TAB TERMINALS' DRIVE. `driveTabsLandingPage` hid BOTH authored pages on any reading
//     that was not `committed`, which includes a realm with no bridge at all and a single transport blip. That is clause 3
//     inverted: a failed read is not a record, and painting `display: 'none'` from one asserts a state the realm never read.
//     The rows below measure the drive from three sides — nothing from no record, the record still driving, and a fault
//     after a record changing nothing.
//
//   · `DC-5`…`DC-7` — THE `focus` ACT'S NEW BODY (`D-141`, `D-142`), and the TWO ROWS the L1 document's §4 books as this
//     module's: `DC-5` is the app's OWN SUBSCRIBER after the act — the arm `F-3` cannot carry, because a pure active-tab
//     change leaves both authored witnesses invariant, `landing` being DERIVED from the active row and the error witness
//     reading rows' error tokens (`D-76`, `D-127`); `DC-7` is the passthrough's refusals — the store's judgement passing
//     THROUGH and the tool's own refusal confined to its arguments (`D-142`, `D-136`, `D-127`). **THE RETARGET LANDED**
//     (`E-1`): the arms these rows drive exist at this head, and each row says which one it is.
//
//   · `DC-6`, RE-GRAINED AND NOT RETIRED (`D-158`, `D-159`, `D-160`): its subject is still the act's ROUND TRIP, and the round
//     trip now spans TWO objects instead of one — the SENT VALUE proves *one row, no member invented, no whole record*, and
//     the ANSWER proves *`order` preserved, one active, the older row deactivated*. `composeRecord` is DELETED WHOLE from
//     `src/renderer/renderer.ts`: the act writes ONE ROW at `['tabs', row.id]` at `file`, so every clause the old row
//     measured has a successor AT THE ROW, and the row names which one it is.
//
//   · `DC-9`…`DC-12` — THE FOUR ROWS `D-160` BOOKS FOR THE LEAF WRITE, the sharper edge of what `DC-6` states once:
//     `DC-9` the ADDRESS (`['tabs', <id>]` at `file`, never `['tabs']`), `DC-10` the ONE-ROW KEY SET (the value carries the
//     row's own members and nothing of the record's), `DC-11` the OPEN ROW'S MINIMALITY (no `label`, no `error`, because
//     those are the record's repairs and a local default would be a second authority, `D-158`), and `DC-12` the TWO-READ
//     COUNT (`D-70`: one read before the write and one after, and the AFTER one is what the answer reports). **A row that
//     cannot fail is a deleted row wearing a new name**: each carries a control, and each control is named in its message.

import { afterEach, describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

import {
  createPaneDrag,
  driveTabsLandingPage,
  handleRequest,
  type TabsPageRuntime,
  type TabsPagesReading,
} from '../src/renderer/renderer.js'
import { TABS_ERROR_PAGE_ID, TABS_LANDING_PAGE_ID } from '../src/shared/demo-envelope.js'
import { deriveTabsWitness, type TabsClientReading, type TabsCommittedAnswer, type TabsWitness } from '../src/renderer/tabs-client.js'
import type { RpcReply, RpcRequest, TabsRecordRow } from '../src/shared/types.js'

/** **THE RUNTIME, AS A RECORD OF WHAT WAS WRITTEN** — `driveTabsLandingPage`'s whole contract with it is one resolution and
 *  one `state-slice`, so the double holds exactly those two surface members and nothing else. */
interface RecordedWrite {
  readonly node: string
  readonly targetProp: string
  readonly value: unknown
}

function runtimeRecorder(options?: { readonly refuse?: boolean }): {
  readonly runtime: TabsPageRuntime
  readonly writes: RecordedWrite[]
  readonly resolved: string[]
} {
  const writes: RecordedWrite[] = []
  const resolved: string[] = []
  const runtime: TabsPageRuntime = {
    elementForNodeId(id: string): unknown {
      resolved.push(id)
      return { id }
    },
    applyCommand(command: unknown): { readonly status?: unknown } {
      const cmd = command as { node?: unknown; mutation?: readonly { targetProp?: unknown; value?: unknown }[] }
      for (const m of cmd.mutation ?? []) {
        writes.push({ node: String(cmd.node), targetProp: String(m.targetProp), value: m.value })
      }
      return { status: options?.refuse === true ? 'refused' : 'applied' }
    },
  }
  return { runtime, writes, resolved }
}

/** A committed reading whose witness stands, or does not, per terminal — the ONE shape the drive takes its data from. */
function committed(witness: { readonly landing: boolean; readonly error: boolean }, resolvedFor: (id: string) => unknown = (id) => ({ id })): TabsClientReading {
  const derived: TabsWitness = {
    landing: { witness: witness.landing, nodeId: TABS_LANDING_PAGE_ID, resolved: resolvedFor(TABS_LANDING_PAGE_ID), activeIds: [] },
    error: { witness: witness.error, nodeId: TABS_ERROR_PAGE_ID, resolved: resolvedFor(TABS_ERROR_PAGE_ID), tabId: null },
  }
  return { status: 'committed', order: [], landing: '', rows: [], witness: derived }
}

/** The two statements the client can make WITHOUT a record, and the refusal the store itself can answer. */
const NO_RECORD: readonly { readonly label: string; readonly reading: TabsClientReading }[] = [
  { label: 'absent (no-tabs-member)', reading: { status: 'absent', reason: 'no-tabs-member' } },
  { label: 'absent (no-read-route)', reading: { status: 'absent', reason: 'no-read-route' } },
  { label: 'unread (route-threw)', reading: { status: 'unread', reason: 'route-threw', detail: 'connect ECONNREFUSED (DC-1)' } },
  { label: 'unread (answer-not-declared)', reading: { status: 'unread', reason: 'answer-not-declared', detail: 'order is not an array' } },
  {
    label: 'refused (the store would not answer)',
    reading: { status: 'refused', reason: 'tabs-must-stand', message: 'the record does not stand', address: ['tabs'] },
  },
]

describe('D-127 · F7 — the tab terminals are driven by a RECORD and by nothing else', () => {
  it('DC-1 — **NO RECORD, NO DRIVE**: every non-`committed` reading issues ZERO `state-slice` writes for either authored page, reports `status: null` and `driven: false`, and reports its `witness` as `null` rather than `false` — because a terminal nobody read about is not a terminal the record says does not stand, and collapsing the two is what let a fault blank both pages. The control beside it proves the instrument can see a drive at all', () => {
    for (const { label, reading } of NO_RECORD) {
      const { runtime, writes } = runtimeRecorder()
      const pages = driveTabsLandingPage(reading, runtime)
      expect(writes, `DC-1 — \`${label}\` supplied no record, so NOTHING may be written to the authored pages`).toEqual([])
      for (const terminal of [pages.landing, pages.error]) {
        expect(
          [terminal.witness, terminal.status, terminal.driven],
          `DC-1 — \`${label}\` · \`${terminal.nodeId}\`: no witness, no write, no claim`,
        ).toEqual([null, null, false])
      }
    }
    // THE CONTROL: a committed reading DOES write, so the empty arrays above measure the arm and not a dead instrument.
    const { runtime, writes } = runtimeRecorder()
    const pages = driveTabsLandingPage(committed({ landing: true, error: false }), runtime)
    expect(writes.length, 'DC-1 CONTROL — the same instrument records a real drive').toBe(2)
    expect(pages.landing.driven, 'DC-1 CONTROL — and reports it').toBe(true)
  })

  it('DC-2 — **THE RECORD STILL DRIVES, PER TERMINAL AND IN BOTH DIRECTIONS**: a committed reading drives each authored page from ITS OWN witness — the CSS text `display: block` where the witness stands and `display: none` where it does not — so closing the no-record arm did not make the drive inert. The two terminals are read independently, which is what a single flag would have hidden. **THE VALUE PINNED HERE IS CSS TEXT AND NOT AN OBJECT, AND `D-203` IS WHY**: an OBJECT written to `css.style` answers `applied` and writes NOTHING in the real renderer — the `style` attribute ends up EMPTY and no computed style moves — while CSS text in the same slot lands; the DOM shim serialised the object AS JSON TEXT into the attribute, so the old object spelling looked applied on every run of this file while the surface did nothing. The spelling is the difference between a paint and a no-op, so this row pins it', () => {
    const cases = [
      { landing: true, error: false, expected: { landing: 'block', error: 'none' } },
      { landing: false, error: true, expected: { landing: 'none', error: 'block' } },
      { landing: true, error: true, expected: { landing: 'block', error: 'block' } },
      { landing: false, error: false, expected: { landing: 'none', error: 'none' } },
    ] as const
    for (const one of cases) {
      const { runtime, writes } = runtimeRecorder()
      driveTabsLandingPage(committed({ landing: one.landing, error: one.error }), runtime)
      expect(writes.length, `DC-2 — two terminals, two writes (landing=${one.landing} error=${one.error})`).toBe(2)
      const byNode = new Map(writes.map((w) => [w.node, w.value]))
      // **CSS TEXT, NOT AN OBJECT** (`D-203`): the shim serialised an object value as JSON text into the `style` attribute,
      // so `{ display: 'block' }` here read as a written style; the real renderer leaves that attribute EMPTY and applies
      // nothing, while `display: block` in the same slot lands. The expectation is the text the drive now writes, so a
      // reversion to the object spelling is a RED here rather than a green row over an inert surface.
      expect(
        [byNode.get(TABS_LANDING_PAGE_ID), byNode.get(TABS_ERROR_PAGE_ID)],
        `DC-2 — each page is driven by its OWN witness, never by the other's, and the value is CSS TEXT (\`D-203\`: an object on \`css.style\` answers \`applied\` and paints nothing in the real renderer; the shim serialised it as JSON text, which is why the old object spelling passed)`,
      ).toEqual([`display: ${one.expected.landing}`, `display: ${one.expected.error}`])
      for (const write of writes) {
        expect(write.targetProp, 'DC-2 — the ONE write surface is the envelope\'s own style member').toBe('css.style')
      }
    }
  })

  it('DC-3 — **A FAULT AFTER A RECORD CHANGES NOTHING**: a committed reading that hides a terminal, followed by a transport fault, writes NOTHING on the second turn — so the surface keeps the LAST RECORD\'s word rather than being repainted from a read that did not happen. This is the arm that made a single blip blank both authored pages, and it is measured on the sequence rather than on one reading', () => {
    const { runtime, writes } = runtimeRecorder()
    const first = driveTabsLandingPage(committed({ landing: false, error: false }), runtime)
    expect(writes.length, 'DC-3 — the record drove both terminals').toBe(2)
    expect([first.landing.driven, first.error.driven], 'DC-3 — and both landed').toEqual([true, true])
    const afterFirst = writes.length

    const fault: TabsClientReading = { status: 'unread', reason: 'route-threw', detail: 'the route threw between deliveries (DC-3)' }
    const second = driveTabsLandingPage(fault, runtime)
    expect(writes.length, 'DC-3 — the fault issued NO write, so the DOM still carries the record\'s `display: none`').toBe(afterFirst)
    expect(
      [second.landing.status, second.error.status, second.landing.witness],
      'DC-3 — and the reading says so: no write, and NO WITNESS either way',
    ).toEqual([null, null, null])
  })

  it('DC-4 — **TOTALITY: EVERY DEGRADATION IS A READING**: a refused `state-slice` is reported as `driven: false` carrying the runtime\'s OWN status word — never converted into a success — a throwing runtime answers `threw`, and a `null` runtime answers no status at all; no arm throws out of the role', () => {
    const refused = runtimeRecorder({ refuse: true })
    const refusedPages = driveTabsLandingPage(committed({ landing: true, error: true }), refused.runtime)
    expect(
      [refusedPages.landing.status, refusedPages.landing.driven],
      'DC-4 — a refusal is the runtime\'s own word, carried and never converted into a success',
    ).toEqual(['refused', false])

    const throwing: TabsPageRuntime = {
      elementForNodeId: (): unknown => {
        throw new Error('the graph cannot resolve this node (DC-4)')
      },
      applyCommand: (): never => {
        throw new Error('the graph cannot apply this write (DC-4)')
      },
    }
    const threw = driveTabsLandingPage(committed({ landing: true, error: true }), throwing)
    expect([threw.landing.status, threw.landing.driven], 'DC-4 — a throw is a reading, never an exception').toEqual(['threw', false])

    const noRuntime = driveTabsLandingPage(committed({ landing: true, error: true }), null)
    expect(
      [noRuntime.landing.status, noRuntime.error.status, noRuntime.landing.driven],
      'DC-4 — a node-less drive writes nothing and claims nothing',
    ).toEqual([null, null, false])

  })
})

/* ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * `D-142` — THE `focus` ACT'S NEW BODY, AND THE APP'S OWN SUBSCRIBER AFTER IT.
 * One fixture pair and one realm double below, so both sides of the act are measured on ONE record rather than on two
 * stories: `BEFORE_ACT` is what the act finds, `AFTER_ACT` is what the record's own repair leaves, and the double's
 * `write` is a LEAF ROW WRITE that applies the record's TWO repairs the way `src/main/tabs-record/index.ts` does — the
 * `'seat'` scope APPENDS the written row's id to `order` where the seat does not name it, and `exactly-one-active` keeps
 * the WRITTEN referent, deactivating every other active row (`D-142`, `D-140`, `D-157`, `D-159`). **AND WHY THE DOUBLE HAD
 * TO MOVE IN THE SAME EDIT** (`D-160`): the writing it replaced rebuilt the record from `value['order']`, so a bare ROW
 * would have made it ERASE the record (`order: []`, `rows: []`) — and a row measuring the leaf write over an erasing
 * double would pass for the wrong reason, its answer over a record no store ever leaves.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

/** **THE RECORD THE ACT FINDS.** The landing entry active, a second tab waiting and a third carrying an `error` token —
 *  BOTH authored terminals stand, which is what lets `DC-5` show that neither of them moves when the active tab does. */
const BEFORE_ACT: readonly TabsRecordRow[] = [
  { id: 'landing', target: '/home', active: true, label: 'home', lastActiveAt: '2026-11-06T00:00:00.000Z' },
  { id: 'alpha', target: '/alpha', active: false, label: 'alpha' },
  { id: 'broken', target: '/broken', active: false, label: 'broken', error: 'e-1' },
]

/** **THE SAME RECORD AFTER THE ACT AND THE REPAIR**: `alpha` is the one active row, the landing entry keeps every byte the
 *  reading carried but its flag, and nothing else moves (`D-142`, `D-76`). */
const AFTER_ACT: readonly TabsRecordRow[] = [
  { id: 'landing', target: '/home', active: false, label: 'home', lastActiveAt: '2026-11-06T00:00:00.000Z' },
  { id: 'alpha', target: '/alpha', active: true, label: 'alpha', lastActiveAt: '2026-11-06T00:00:01.000Z' },
  { id: 'broken', target: '/broken', active: false, label: 'broken', error: 'e-1' },
]

const ORDER_OF = (rows: readonly TabsRecordRow[]): string[] => rows.map((row) => row.id)

/** The tabs client's committed answer plus the witness `deriveTabsWitness` derives from it — the shape a DELIVERY hands
 *  the drive. A record seating two actives answers `landing: ''` and derives no landing witness, which is the arm `DC-5`
 *  controls on. */
function readingOf(rows: readonly TabsRecordRow[], runtime: TabsPageRuntime | null): TabsClientReading {
  const actives = rows.filter((row) => row.active === true)
  const answer: TabsCommittedAnswer = {
    status: 'committed',
    order: ORDER_OF(rows),
    landing: actives.length === 1 ? actives[0]!.id : '',
    rows,
  }
  return { ...answer, witness: deriveTabsWitness(answer, runtime) }
}

/** **THE REALM THE ACT RUNS IN** — exactly the two bridge members the new body reaches, and nothing is faked behind them:
 *  `tabs.read()` answers the record this double holds, `data.write(args)` RECORDS the argument it was handed and answers
 *  as the store answers (the crossing's `committed` receipt, or a refusal that writes nothing). The value the renderer
 *  SENT and the record that then STANDS are therefore two different facts, which is what lets `DC-6` tell the
 *  composition from the store's judgement (`D-142`, `D-136`). **`readings` IS THE THIRD FACT, AND IT IS `DC-12`'s
 *  SUBJECT**: one entry per `tabs.read()` call, in the order they happened, so "one read before the write and one after"
 *  is a SEQUENCE this double recorded rather than a count a message claims (`D-70`, `D-82` clause 4). */
interface ActReading {
  readonly order: readonly string[]
  readonly landing: string
  readonly activeIds: readonly string[]
  readonly rows: readonly TabsRecordRow[]
}

interface ActRealm {
  readonly writes: unknown[]
  readonly reads: number
  readonly readings: readonly ActReading[]
  readonly notified: unknown[]
  readonly record: () => { readonly order: readonly string[]; readonly landing: string; readonly rows: readonly TabsRecordRow[] }
  readonly act: (payload: unknown) => Promise<RpcReply>
}

function actRealm(options: { readonly refuse?: { readonly reason: string; readonly message: string }; readonly tabs?: boolean } = {}): ActRealm {
  const writes: unknown[] = []
  const notified: unknown[] = []
  const readings: ActReading[] = []
  let reads = 0
  let rows: TabsRecordRow[] = BEFORE_ACT.map((row) => ({ ...row }))
  let order: string[] = ORDER_OF(BEFORE_ACT)
  const activeId = (): string => {
    const actives = rows.filter((row) => row.active === true)
    return actives.length === 1 ? actives[0]!.id : ''
  }
  const read = async (): Promise<unknown> => {
    reads += 1
    const state = { order: [...order], landing: activeId(), rows: rows.map((row) => ({ ...row })) }
    readings.push({ ...state, activeIds: state.rows.filter((row) => row.active === true).map((row) => row.id) })
    return { status: 'committed', ...state }
  }
  /** **THE STORE'S ONE VERB, AS THE RECORD'S PAIR REALLY ANSWERS IT — A LEAF ROW WRITE, NOT A WHOLE-RECORD REPLACEMENT**
   *  (`D-157`, `D-159`, `D-160`). Two repairs are applied to the record this double HOLDS, exactly as
   *  `src/main/tabs-record/index.ts` applies them inside the caller's own commit:
   *   · the `'seat'` scope of `order-names-its-tabs` — the written row IS seated, so an id the seat does not yet name is
   *     APPENDED to `order` and every standing id keeps its position (the append position is the REPAIR's answer, never
   *     the act's promise, `D-159`);
   *   · `exactly-one-active`'s `'family'` scope — the WRITTEN referent is the survivor and every other active row is
   *     deactivated in the same object (`D-129`, `D-142`);
   *   · and NOTHING ELSE: a leaf write cannot drop a sibling, so every row the act does not name travels untouched.
   *  **WHAT THE OLD DOUBLE DID, AND WHY IT HAD TO GO** (`D-160`): it read `value['order']` and rebuilt the record from it,
   *  so handed the act's bare ROW it would set `order = []` and `rows = []` — the record ERASED, the act's re-read
   *  answering an empty record, and every clause of the row below passing or failing for a reason no store produces. A
   *  write it cannot place is therefore REFUSED here rather than silently destructive. */
  const write = async (args: unknown): Promise<unknown> => {
    writes.push(args)
    const given = (args ?? {}) as { readonly path?: unknown; readonly value?: unknown }
    const at = (Array.isArray(given.path) ? given.path : []) as readonly (string | number)[]
    if (options.refuse !== undefined) {
      // THE STORE'S OWN REFUSAL NAMES THE ADDRESS IT WAS GIVEN AND WRITES NOTHING (`guide §5.4`, `D-157`).
      return { status: 'refused', reason: options.refuse.reason, message: options.refuse.message, address: ['tabs'], path: at }
    }
    const id = at[0] === 'tabs' && typeof at[1] === 'string' && at[1].length > 0 ? at[1] : null
    const value = given.value
    if (id === null || value === null || typeof value !== 'object' || Array.isArray(value)) {
      return { status: 'refused', reason: 'malformed-row', message: 'the write names no row of this record', address: ['tabs'], path: at }
    }
    const row = { ...(value as Record<string, unknown>), id } as unknown as TabsRecordRow
    const appended = !order.includes(id)
    if (appended) order = [...order, id]
    const standing = rows.filter((was) => was.active === true && was.id !== id)
    const seated = rows.some((was) => was.id === id) ? rows.map((was) => (was.id === id ? row : { ...was })) : [...rows.map((was) => ({ ...was })), row]
    rows = seated.map((held) => (held.active === true ? { ...held, active: held.id === id } : { ...held }))
    return { status: 'committed', path: at, cursor: null, repaired: appended || standing.length > 0, log: [] }
  }
  const provident: Record<string, unknown> = {
    data: { read: async () => ({}), write, delete: async () => ({}), list: async () => ({}), journal: async () => ({}) },
  }
  if (options.tabs !== false) provident['tabs'] = { read, onChanged: (): (() => void) => (): void => undefined }
  ;(globalThis as Record<string, unknown>)['window'] = { provident }
  return {
    writes,
    get reads(): number { return reads },
    readings,
    notified,
    record: () => ({ order: [...order], landing: activeId(), rows: rows.map((row) => ({ ...row })) }),
    act: (payload: unknown): Promise<RpcReply> =>
      handleRequest({} as never, { id: 1, method: 'focus', payload } as RpcRequest, (p) => notified.push(p)),
  }
}

/** The realm is installed as this process's ambient bridge for one row and withdrawn after it, exactly as
 *  `tests/theme-act.test.ts` installs its crossing: a node realm has no `window` of its own. */
afterEach(() => {
  delete (globalThis as Record<string, unknown>)['window']
})

describe('D-142/D-160 — the act, its leaf row write and round trip, and the subscriber that follows it', () => {
  it('DC-5 — **THE APP\'S OWN SUBSCRIBER AFTER THE ACT**: `driveTabsLandingPage` drives BOTH authored terminals from the post-act record — the arm `F-3` cannot carry, because a pure active-tab change leaves both written values IDENTICAL (`landing` is DERIVED from the active row and the error witness reads rows\' error tokens), so the terminals are invariant while the record moved. The control beside it proves the drive is not inert: a record seating TWO actives — the state the act\'s ONE row write leaves if no repair settled it, which is why `exactly-one-active` does so inside the caller\'s own commit (`D-129`) — drives the landing terminal `none` naming both ids', () => {
    const before = runtimeRecorder()
    const after = runtimeRecorder()
    const pre = driveTabsLandingPage(readingOf(BEFORE_ACT, before.runtime), before.runtime)
    const post = driveTabsLandingPage(readingOf(AFTER_ACT, after.runtime), after.runtime)

    // BOTH TERMINALS, FROM THE POST-ACT RECORD, EACH BY ITS OWN WITNESS.
    expect(after.writes.length, 'DC-5 — the post-act delivery drives BOTH authored terminals, so neither page keeps a prior turn\'s word').toBe(2)
    expect([post.landing.driven, post.error.driven], 'DC-5 — and each drive is the runtime\'s own `applied`').toEqual([true, true])
    // **THE WRITTEN VALUE IS CSS TEXT, NOT AN OBJECT** (`D-203`): `css.style` answers `applied` to a record and then writes
    // NOTHING in the real renderer — the attribute stays empty — while CSS text in the same slot lands. The shim's JSON
    // serialisation of the record is what made the object spelling look written. So this row pins the drive's own text.
    expect(
      after.writes.map((w) => [w.node, w.targetProp, w.value]),
      'DC-5 — the post-act drive writes the ENVELOPE\'s own style member on the envelope\'s own authored nodes, as CSS TEXT: `D-203` measured that an object value on `css.style` reports `applied` and paints nothing in the real renderer, the shim serialised it as JSON text into the attribute, and that is why the spelling changed',
    ).toEqual([
      [TABS_LANDING_PAGE_ID, 'css.style', 'display: block'],
      [TABS_ERROR_PAGE_ID, 'css.style', 'display: block'],
    ])

    // THE INVARIANCE THAT BLINDS `F-3` — MEASURED, NOT ASSERTED IN PROSE.
    expect(
      after.writes.map((w) => w.value),
      'DC-5 — **the arm `F-3` cannot carry**: the two written values are IDENTICAL across the act, so no authored witness moves and only the RECORD did (`D-76`, `D-127`)',
    ).toEqual(before.writes.map((w) => w.value))
    expect(
      [pre.landing.witness, pre.error.witness],
      'DC-5 — both witnesses stand before the act and after it, which is exactly why a witness row cannot see this act',
    ).toEqual([post.landing.witness, post.error.witness])
    const afterReading = readingOf(AFTER_ACT, null)
    expect(
      afterReading.status === 'committed' ? afterReading.landing : null,
      'DC-5 — and the record DID move: the reading the delivery carried names the TARGET active, which is the whole of what the act changed',
    ).toBe('alpha')

    // THE CONTROL: a record seating TWO actives — the pair the RECORD's repair settles, so the act's one row write never
    // leaves it standing — is no landing.
    const two = runtimeRecorder()
    const twoActives: readonly TabsRecordRow[] = [
      { id: 'landing', target: '/home', active: true, label: 'home', lastActiveAt: '2026-11-06T00:00:00.000Z' },
      { id: 'alpha', target: '/alpha', active: true, label: 'alpha', lastActiveAt: '2026-11-06T00:00:01.000Z' },
      BEFORE_ACT[2]!,
    ]
    const twoReading = readingOf(twoActives, two.runtime)
    expect(
      twoReading.status === 'committed' ? twoReading.witness.landing.activeIds : null,
      'DC-5 CONTROL — a two-active record names BOTH ids, so the failing case is readable instead of merely red',
    ).toEqual(['landing', 'alpha'])
    const twoPages = driveTabsLandingPage(twoReading, two.runtime)
    expect(twoPages.landing.witness, 'DC-5 CONTROL — two actives derive no landing witness').toBe(false)
    expect(
      twoPages.landing.driven && two.writes[0]?.value,
      'DC-5 CONTROL — and the terminal is DRIVEN to `none`: the drive is a function of the record, so it moves when the record does. The control reads CSS TEXT for the same reason the row above does (`D-203`: an object on `css.style` is inert in the real renderer and only the shim\'s JSON serialisation made it look written), so the arm cannot pass on a spelling that paints nothing',
    ).toEqual('display: none')
  })

  it('DC-6 — **THE ACT\'S ROUND TRIP, RE-GRAINED TO THE LEAF ROW WRITE**: ONE `data.write` at `[\'tabs\', <id>]` at `file` carries the target\'s ONE ROW — the value\'s keys are that ROW\'s own, with no `order`, no `landing` and no member invented — the row that STOOD active is ABSENT from the write and reads `active: false` in the ANSWER, `order` is read off the ANSWER with an opened id appended LAST, and exactly TWO `tabs.read()` calls stand. `composeRecord` is DELETED from this realm (`D-160`), so the round trip spans the SENT ROW and the RE-READ RECORD, and both halves are measured here (ASM-1, `D-158`, `D-159`)', async () => {
    const realm = actRealm()
    const reply = await realm.act({ target: '/alpha' })

    // (1) ONE WRITE, AT THE ROW'S OWN ADDRESS AND THE RECORD'S OWN TIER (`D-142`, `D-158`, `D-112`).
    expect(realm.writes.length, 'DC-6 — the act writes ONCE: one row, one passthrough, no retry').toBe(1)
    const written = realm.writes[0] as { readonly path?: unknown; readonly tier?: unknown; readonly value?: unknown }
    expect(
      written.path,
      'DC-6 — the address is the ROW\'S OWN LEAF `[\'tabs\', row.id]` and never the record\'s root: `composeRecord` is deleted whole from `src/renderer/renderer.ts`, so a `[\'tabs\']` path here is the whole-record composition returning (`D-160` §6)',
    ).toEqual(['tabs', 'alpha'])
    expect(written.tier, 'DC-6 — at the tab record\'s own tier, which the declared-root guard admits and no other').toBe('file')
    const value = written.value as Record<string, unknown>

    // (2) THE VALUE IS ONE ROW — its keys are the row's own, and the record's two members are ABSENT.
    expect(
      Object.keys(value).sort(),
      'DC-6 — the value\'s keys are the ROW\'s own: `id`, `target`, `active`, `lastActiveAt`, plus the `label` the reading carried whole (`D-76`) — no `order`, no `landing`, and no member the record did not hold',
    ).toEqual(['active', 'id', 'label', 'lastActiveAt', 'target'])
    expect(
      [Object.prototype.hasOwnProperty.call(value, 'order'), Object.prototype.hasOwnProperty.call(value, 'landing')],
      'DC-6 — and the record\'s own two members are ABSENT from the sent value: `order` is the `\'seat\'` repair\'s to append to (`D-157`) and `landing` is DERIVED from the rows, never written (`D-76`)',
    ).toEqual([false, false])
    // THE TARGET ROW SEATED: `active` true and `lastActiveAt` stamped, its identity and target untouched.
    expect([value['id'], value['target'], value['active']], 'DC-6 — the target row is SEATED in the record\'s own terms').toEqual(['alpha', '/alpha', true])
    expect(typeof value['lastActiveAt'], 'DC-6 — and stamped now for the `tab-has-lastActiveAt` pair (`D-142`)').toBe('string')

    // (3) THE ROW THAT STOOD ACTIVE IS ABSENT FROM THE WRITE — the act names no other row at all.
    expect(
      (written.path as readonly unknown[]).slice(1),
      'DC-6 — the address names the TARGET\'s id and no other, so the standing active row (`landing`) is not named by this act: a leaf write cannot drop a sibling (`D-138`) and the renderer clears no flag (`D-142`)',
    ).toEqual(['alpha'])

    // (4) AND IT READS `active: false` IN THE ANSWER — the property the round trip now measures beside the act.
    expect(reply.ok, 'DC-6 — the act answers `ok` and carries a value').toBe(true)
    const answer = reply.value as { readonly status?: unknown; readonly order?: unknown; readonly rows?: readonly TabsRecordRow[] }
    expect(answer.status, 'DC-6 — the answer is a record, in the tabs client\'s committed arm').toBe('committed')
    const answeredRows = answer.rows ?? []
    const standing = answeredRows.find((row) => row.id === 'landing')
    expect(standing, 'DC-6 — the answer still HOLDS the row that stood active: a leaf write deactivates it and never deletes it (`D-129`)').toBeDefined()
    expect(
      (standing as TabsRecordRow).active,
      'DC-6 — **the row that stood active reads `active: false` in the ANSWER**: `healRecord` settled `exactly-one-active` inside the caller\'s own commit, so the act neither wrote the flag nor needed to (`D-129`, `D-158`)',
    ).toBe(false)
    expect(
      { ...(standing as TabsRecordRow), active: true },
      'DC-6 — and every OTHER byte the reading carried travelled: the deactivation is the repair\'s and no member was dropped (`D-76`)',
    ).toEqual(BEFORE_ACT[0])
    expect(
      answer.rows,
      'DC-6 — row for row, the answer is the re-read record — and the two rows the act does not name are still there, which is what a leaf write cannot lose (`D-138`)',
    ).toEqual(realm.record().rows)
    expect(
      answeredRows.filter((row) => row.active === true).map((row) => row.id),
      'DC-6 — exactly ONE row reads active and it is the target\'s (`D-140`, `D-142`)',
    ).toEqual(['alpha'])

    // (5) `order` IS READ OFF THE ANSWER — the sent value carries none at all (clause 2) — AND A SEAT MOVES NOTHING IN IT.
    expect(
      answer.order,
      'DC-6 — `order` is read off the ANSWER and not off the value sent: a SWITCH seats a row the seat already names, so no member of `order` moves',
    ).toEqual(['landing', 'alpha', 'broken'])

    // (6) `newTab: true` OPENS EXACTLY ONE ROW, AND THE `'seat'` REPAIR APPENDS ITS ID LAST *IN THE ANSWER* (`D-159`).
    const opened = actRealm()
    const openReply = await opened.act({ target: '/delta', newTab: true })
    expect(opened.writes.length, 'DC-6 — an OPEN is one write too').toBe(1)
    const openedWrite = opened.writes[0] as { readonly path?: readonly unknown[]; readonly tier?: unknown; readonly value?: unknown }
    expect([openedWrite.tier, openedWrite.path?.[0]], 'DC-6 — the open writes at the same family and the same tier as the switch').toEqual(['file', 'tabs'])
    const newId = openedWrite.path?.[1] as string
    expect(typeof newId, 'DC-6 — the leaf names the id the act minted, so the row and its address are ONE spelling').toBe('string')
    expect(
      ORDER_OF(BEFORE_ACT).includes(newId),
      'DC-6 — the opened row\'s id is one the record did not carry, so the act minted rather than reused an id (ASM-1)',
    ).toBe(false)
    const openedValue = openedWrite.value as Record<string, unknown>
    expect(
      [openedValue['id'], openedValue['target'], openedValue['active']],
      'DC-6 — the opened row carries the CALLER\'S target and is seated, under the id its own address names',
    ).toEqual([newId, '/delta', true])
    expect(typeof openedValue['lastActiveAt'], 'DC-6 — and an instant, so the `tab-has-lastActiveAt` pair is the act\'s and not a default').toBe('string')
    const openAnswer = openReply.value as { readonly order?: readonly string[]; readonly rows?: readonly TabsRecordRow[] }
    expect(
      openAnswer.order,
      'DC-6 — **the opened id is appended LAST in the ANSWER**: the act writes one row and the `\'seat\'` repair seats it, so the position is the repair\'s answer and never the act\'s promise (`D-159`)',
    ).toEqual([...ORDER_OF(BEFORE_ACT), newId])
    expect(openAnswer.order?.slice(0, BEFORE_ACT.length), 'DC-6 — and no standing id is reordered by an open').toEqual(ORDER_OF(BEFORE_ACT))
    expect(
      (openAnswer.rows ?? []).filter((row) => row.active === true).map((row) => row.id),
      'DC-6 — and the answer names the opened row as the one active, the repair having deactivated the older one inside the same commit (`D-159`)',
    ).toEqual([newId])

    // (7) EXACTLY TWO READS: the seat's committed reading and the answer's re-read, never a poll and never a retry.
    expect(
      realm.reads,
      'DC-6 — the act reads the record EXACTLY TWICE — `S6`\'s reading and the `S9` answer\'s re-read (`D-82` clause 4, `D-70`)',
    ).toBe(2)
    expect(opened.reads, 'DC-6 — and the open arm is the same two').toBe(2)
    expect(realm.notified, 'DC-6 — the act emits NO app-graph push: the record\'s own listener is what delivers the change (`D-137`, `D-112`)').toEqual([])
  })

  it('DC-7 — **THE PASSTHROUGH\'S REFUSALS ARE THE STORE\'S AND THE TOOL\'S ARE ITS ARGUMENTS\'**: a store refusal (`parent-absent`) reaches the tool\'s answer as the store\'s own word and changes nothing, a reading that is not a record writes nothing at all (`D-127`), an act naming no target writes nothing, and a `target` that is not a string can be no row and writes nothing — each arm answering rather than throwing', async () => {
    // (a) THE STORE'S JUDGEMENT PASSES THROUGH AND IS NEVER CONVERTED INTO A SUCCESS (`D-142`, `D-136`).
    const refusing = actRealm({ refuse: { reason: 'parent-absent', message: 'no parent stands at this address' } })
    const refused = await refusing.act({ target: '/alpha' })
    expect(refusing.writes.length, 'DC-7 — the act sends the passthrough ONCE and does not retry a refusal').toBe(1)
    expect(
      JSON.stringify(refused.value),
      'DC-7 — the STORE\'S own reason word reaches the tool\'s answer: a refusal is the store\'s judgement passing THROUGH, never the surface\'s decision',
    ).toContain('parent-absent')
    const carried = (refused.value as { readonly refused?: Record<string, unknown> }).refused
    expect(Object.keys(carried ?? {}).sort(), "DC-7 — the refusal is the WRITER'S LEDGER, member for member: the `path` the store answered with reaches the tool's answer, and the `address` the double also sent is no ledger member and is forwarded by nothing (D-142)").toEqual(['message', 'path', 'reason', 'status'])
    expect(
      refusing.record().rows.filter((row) => row.active === true).map((row) => row.id),
      'DC-7 — and a refused write wrote nothing: the standing record still names the landing entry active',
    ).toEqual(['landing'])

    // (b) A FAILED READ IS NOT A STATE (`D-127`).
    const noRecord = actRealm({ tabs: false })
    const absent = await noRecord.act({ target: '/alpha' })
    expect(
      noRecord.writes,
      'DC-7 — a realm whose reading is not `committed` writes NOTHING: the route refuses rather than composing over a record the realm never read (`D-127`, `D-142`)',
    ).toEqual([])
    expect(typeof absent.ok, 'DC-7 — and it ANSWERS: no arm of this route throws out of an IPC turn').toBe('boolean')

    // (c) AN ACT WITH NO TARGET CHANGES NOTHING (`D-142`).
    const standing = actRealm()
    await standing.act({})
    expect(standing.writes, 'DC-7 — an act that names no target has no act: the route writes nothing and answers the record as it stands').toEqual([])

    // (d) A MALFORMED TARGET IS THE TOOL'S OWN REFUSAL.
    const malformed = actRealm()
    const bad = await malformed.act({ target: 42 })
    expect(
      malformed.writes,
      'DC-7 — a `target` that is not a string can be no row (a tab id is a member key and `TabsRecordRow`\'s `target` a string), so the tool refuses its own argument and no store is asked',
    ).toEqual([])
    expect(typeof bad.ok, 'DC-7 — and the refusal is an answer, not a throw').toBe('boolean')
  })

  /* ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * `D-160` — THE FOUR ROWS THE LEAF ROW WRITE IS BOOKED WITH. `DC-6` states each of them once, inside the round trip;
   * these four measure them ONE AT A TIME, each with the control that shows the measurement can fail, because the property
   * `composeRecord`'s deletion leaves behind is not "a different address" but "ONE ROW and nothing of the record" — and a
   * row that cannot fail is a deleted row wearing a new name.
   * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  it('DC-9 — **THE LEAF ADDRESS: the act writes at `[\'tabs\', <id>]` at `file` and NEVER at `[\'tabs\']`**, on BOTH arms that write — a SWITCH and an OPEN. The predicate is driven both ways first, so an address this row calls a leaf is a measurement and not a scanner blind spot (`D-158`, `D-160` §6)', async () => {
    // THE PREDICATE, DRIVEN BOTH WAYS — the falsifier belongs AHEAD of the green (`R-1`-family discipline).
    const leafOf = (path: unknown): string | null => {
      if (!Array.isArray(path) || path.length !== 2) return null
      if (path[0] !== 'tabs' || typeof path[1] !== 'string' || path[1].length === 0) return null
      return path[1] as string
    }
    expect(
      leafOf(['tabs']),
      'DC-9 CONTROL — a write at the RECORD\'S ROOT is NOT a leaf: the instrument this row passes on can fail, which is what the whole-record composition would have been',
    ).toBeNull()
    expect(leafOf(['tabs', 'alpha']), 'DC-9 CONTROL — and a row\'s own address IS one, so the green below is a measurement').toBe('alpha')

    const arms: ReadonlyArray<{ readonly label: string; readonly payload: unknown }> = [
      { label: 'a SWITCH', payload: { target: '/alpha' } },
      { label: 'an OPEN', payload: { target: '/delta', newTab: true } },
    ]
    for (const arm of arms) {
      const realm = actRealm()
      await realm.act(arm.payload)
      expect(realm.writes.length, `DC-9 — \`${arm.label}\` is ONE write`).toBe(1)
      const write = realm.writes[0] as { readonly path?: unknown; readonly tier?: unknown }
      const id = leafOf(write.path)
      expect(id, `DC-9 — **\`${arm.label}\` writes at the ROW'S OWN LEAF** \`['tabs', <id>]\`: the act names the one row it seats and no other (\`D-158\`)`).not.toBeNull()
      expect(write.path, `DC-9 — and NEVER at the record's root: \`['tabs']\` is the address the deleted \`composeRecord\` wrote, and a pass that wrote it again would be this defect returning (\`D-160\`)`).not.toEqual(['tabs'])
      expect(write.tier, `DC-9 — at \`file\`, the record's own tier, which the declared-root guard admits and no other (\`D-101\`, \`D-112\`)`).toBe('file')
      expect(
        (realm.readings[1]?.order ?? []).includes(id as string),
        `DC-9 — and the record answers that address: the id the leaf named is IN \`order\` in the answer's own reading, which is the '\`seat\`' repair's append (\`D-157\`)`,
      ).toBe(true)
    }
  })

  it('DC-10 — **THE ONE-ROW KEY SET: the written value carries the ROW\'S OWN members and NOTHING of the record\'s** — exactly the four on an OPEN, and on a SWITCH the reading\'s row WHOLE beside them, with no `order`, no `landing` and no member the record did not hold (`D-76`, `D-158`)', async () => {
    /** THE FOUR MEMBERS `TabsRecordRow` declares as its own, the two OPTIONAL ones excluded — the row a record can hold. */
    const ROW_KEYS = ['active', 'id', 'lastActiveAt', 'target']
    /** THE RECORD'S OWN MEMBERS — none of which may appear in a row's value (`D-76`: `landing` is DERIVED, `order` is the seat). */
    const RECORD_KEYS = ['order', 'landing', 'rows', 'witness', 'status']

    // THE OPEN ARM: EXACTLY the four — a row the reading did not carry can bring nothing else.
    const opened = actRealm()
    await opened.act({ target: '/delta', newTab: true })
    const openValue = (opened.writes[0] as { readonly value?: unknown }).value as Record<string, unknown>
    expect(
      Object.keys(openValue).sort(),
      'DC-10 — an OPENED row\'s value is EXACTLY the four members of `TabsRecordRow`: `id`, `target`, `active`, `lastActiveAt`, and no fifth',
    ).toEqual(ROW_KEYS)
    for (const member of RECORD_KEYS) {
      expect(
        Object.prototype.hasOwnProperty.call(openValue, member),
        `DC-10 — and the RECORD's \`${member}\` member is ABSENT: the value is ONE ROW, so there is no whole record to carry it (\`D-160\`)`,
      ).toBe(false)
    }

    // THE SWITCH ARM IS THE CONTROL: the row comes back WHOLE (`D-76`), so the reading's own `label` travels and NOTHING
    // is added beside it — a key set that ignored what the reading carried would answer the four on both arms and could
    // not tell a whole row from an invented one.
    const switched = actRealm()
    await switched.act({ target: '/alpha' })
    const switchValue = (switched.writes[0] as { readonly value?: unknown }).value as Record<string, unknown>
    expect(
      Object.keys(switchValue).sort(),
      'DC-10 — the SWITCH arm carries the reading\'s row WHOLE plus the ONE member the act stamps: a dropped member is `D-76`\'s own failure and an invented one is the key the act forbids',
    ).toEqual(['active', 'id', 'label', 'lastActiveAt', 'target'])
    expect(
      Object.keys(switchValue).filter((key) => !ROW_KEYS.includes(key)),
      'DC-10 — and the one member beyond the four is `label`, which the READING carried — so the four-key set above is the act\'s product and not a constant this instrument cannot see past',
    ).toEqual(['label'])
  })

  it('DC-11 — **THE OPEN ROW\'S MINIMALITY: an opened row carries NO `label` and NO `error`** — because the record\'s three field pairs fill the title in BOTH `healedFamily` scopes and nobody fills an `error`, so a local default here would be the SECOND AUTHORITY the repairs exist to be (`D-158`, `D-76`)', async () => {
    // THE CONTROL FIRST: the SWITCH arm carries the reading's row whole, so the two optional members DO travel where the
    // record holds them. An absence measured on an instrument that never carries them at all would prove nothing.
    const carrying = actRealm()
    await carrying.act({ target: '/broken' })
    const carried = (carrying.writes[0] as { readonly value?: unknown }).value as Record<string, unknown>
    expect(
      [carried['label'], carried['error']],
      'DC-11 CONTROL — a SWITCH carries the reading\'s row WHOLE (`D-76`): `label` and `error` reach the write where the record holds them, so the row below measures a DELIBERATE absence and not a blind one',
    ).toEqual(['broken', 'e-1'])

    const opened = actRealm()
    await opened.act({ target: '/delta', newTab: true })
    const value = (opened.writes[0] as { readonly value?: unknown }).value as Record<string, unknown>
    expect(
      [Object.prototype.hasOwnProperty.call(value, 'label'), Object.prototype.hasOwnProperty.call(value, 'error')],
      'DC-11 — **an OPENED row carries NO `label` and NO `error`**: `tab-has-title` fills the title inside the record\'s own `healRecord`, and `error` is an OPTIONAL member no arm fills — a local default would be a key `C4` forbids and a second authority beside the repair (`D-158`)',
    ).toEqual([false, false])
    expect(
      Object.keys(value).sort(),
      'DC-11 — and no member stands in their place: the opened row is exactly `{id, target, active, lastActiveAt}`',
    ).toEqual(['active', 'id', 'lastActiveAt', 'target'])
  })

  it('DC-12 — **THE TWO-READ COUNT: exactly ONE read before the write and ONE after, and the AFTER one is what the answer reports** (`D-70`; `D-82` clause 4) — the two reads are a SEQUENCE this realm recorded, not a number a message claims, and an act that writes nothing takes one, which is the control', async () => {
    const realm = actRealm()
    const reply = await realm.act({ target: '/alpha' })
    expect(realm.writes.length, 'DC-12 — one write stands between the two reads').toBe(1)
    expect(
      realm.readings.length,
      'DC-12 — **exactly TWO `tabs.read()` calls**: the seat\'s committed reading (`S6`) and the answer\'s re-read (`S9`) — never a poll, a retry or a timer (`D-82` clause 4)',
    ).toBe(2)
    expect(
      realm.readings[0]?.activeIds,
      'DC-12 — the FIRST read is the record BEFORE the write: the landing entry is the one active row, and the target row is not yet seated',
    ).toEqual(['landing'])
    expect(
      realm.readings[1]?.activeIds,
      'DC-12 — the SECOND is taken AFTER it: the repair has settled the pair and the target is the one active row, which a reading taken before the write could not report (`D-129`)',
    ).toEqual(['alpha'])
    // `D-70`'s OWN CLAUSE: the answer is the record that STANDS — the after-read — and never the one the act found.
    const answer = reply.value as { readonly rows?: readonly TabsRecordRow[] }
    expect(
      answer.rows,
      'DC-12 — **the answer reports what the AFTER read answered** (`D-70`): the record that stands, read back after the write',
    ).toEqual(realm.readings[1]?.rows)
    expect(
      answer.rows,
      'DC-12 — and the control: the answer is NOT the pre-write reading, so this row measures WHICH read the answer is and not merely that two happened',
    ).not.toEqual(realm.readings[0]?.rows)
    // AND THE COUNT IS NOT A CONSTANT: an act that writes nothing (S4's arm) reads ONCE.
    const noAct = actRealm()
    await noAct.act({})
    expect(
      [noAct.reads, noAct.writes.length],
      'DC-12 CONTROL — an act naming no target takes ONE reading and writes nothing (`D-142`\'s S4), so the counter can read `1` and the `2` above is the write arm\'s own count',
    ).toEqual([1, 0])
  })
})

/* ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * `DC-8` — THE GHOST'S DELIVERY TURN. The drag's in-process value became an ADDRESS (`['drag']` at `temp`, one member
 * per pane id, each carrying the ADJUSTABLE axis's own member — `{height}` for `pane-a`, whose NAME is its axis,
 * `D-189`/`D-190`), so the transient a human sees while dragging is no longer a closure value: it is a READ
 * of that address, painted as the declared `data-ghost` attribute on the pane ELEMENT. Both halves are measured here —
 * THE TURN (`renderGhost()` over every arm of the read) and THE DELIVERY (the wiring that calls it), because a turn
 * nothing calls is a turn that paints nothing.
 * ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

/** **THE PANE ELEMENT'S DOUBLE** — `setAttribute`/`removeAttribute` and no more, because that is exactly what the backing
 *  promises the ghost turn ("anything carrying them"). `declared()` answers what the element carries AFTER the turn, so a
 *  removal is measured as an absence rather than as a call. */
interface GhostElementDouble {
  readonly calls: Array<{ readonly op: 'set' | 'remove'; readonly name: string; readonly value?: string }>
  readonly declared: () => string | null
  readonly setAttribute: (name: string, value: string) => void
  readonly removeAttribute: (name: string) => void
}

function ghostElement(): GhostElementDouble {
  const held = new Map<string, string>()
  const calls: GhostElementDouble['calls'] = []
  return {
    calls,
    declared: (): string | null => held.get('data-ghost') ?? null,
    setAttribute: (name: string, value: string): void => {
      calls.push({ op: 'set', name, value })
      held.set(name, value)
    },
    removeAttribute: (name: string): void => {
      calls.push({ op: 'remove', name })
      held.delete(name)
    },
  }
}

/** **THE REALM THE GHOST TURN ASKS** — the `data.read` route this process installs as the ambient member, plus a count of
 *  the reads it answered, so "ONCE per call, no timer, no poll, no retry" is measured rather than assumed. */
function ghostRealm(answer: () => Promise<unknown>): { reads: () => number } {
  let reads = 0
  ;(globalThis as Record<string, unknown>)['window'] = {
    provident: {
      data: {
        read: async (): Promise<unknown> => {
          reads += 1
          return answer()
        },
      },
    },
  }
  return { reads: (): number => reads }
}

/** **THE ONE READING THE GHOST PAINTS FOR** — L2's committed branch at the drag's own address, the family standing at
 *  `temp` for the composition's pane with a usable member at the pane's ADJUSTABLE axis name — `height` for `pane-a`, which
 *  is stage-resident and therefore sidebar-equivalent (`C-9`, `C-12`), so a `size` member names no axis at all and a
 *  `width` one names an axis this pane does not adjust. */
const GHOST_STANDS = (): unknown => ({
  status: 'read',
  kind: 'branch',
  path: ['drag'],
  value: { _tier: 'temp', 'pane-a': { _tier: 'temp', height: 220 } },
})

/** The microtask settle the turn's `void read(...).then(...)` continuation needs — a handful of turns, no timer. */
const microtasks = async (): Promise<void> => {
  for (let n = 0; n < 8; n += 1) await Promise.resolve()
}

/** **COMMENT-ELIDED SOURCE** — the same discipline `tests/pane-drag-compliance.test.ts` applies, local to this file so a
 *  prose mention of `ghostTarget`/`renderGhost` can neither make the delivery rows green nor redden them. A line whose
 *  first non-space characters open a `//`, and every stretch inside `/* … *&#47;`, is dropped. */
function commentElided(source: string): string {
  const kept: string[] = []
  let inBlock = false
  for (const raw of source.split('\n')) {
    let line = raw
    if (inBlock) {
      const close = line.indexOf('*/')
      if (close < 0) continue
      line = line.slice(close + 2)
      inBlock = false
    }
    let out = ''
    let rest = line
    for (;;) {
      const block = rest.indexOf('/*')
      const slash = rest.indexOf('//')
      if (slash >= 0 && (block < 0 || slash < block)) {
        out += rest.slice(0, slash)
        break
      }
      if (block < 0) {
        out += rest
        break
      }
      out += rest.slice(0, block)
      const close = rest.indexOf('*/', block + 2)
      if (close < 0) {
        inBlock = true
        break
      }
      rest = rest.slice(close + 2)
    }
    if (out.trim().length > 0) kept.push(out)
  }
  return kept.join('\n')
}

/** ONE top-level function's CODE, from its header to the next top-level `function` — the region a static row can speak
 *  about without the whole module's prose. */
function functionRegion(source: string, header: string): string {
  const at = source.indexOf(header)
  if (at < 0) return ''
  const rest = source.slice(at + header.length)
  const next = rest.search(/\n(?:export )?(?:async )?function /)
  return next < 0 ? rest : rest.slice(0, next)
}

describe('DC-8 — the ghost\'s delivery: `[\'drag\']` at `temp`, read once and painted as a declared transient', () => {
  it('DC-8(a) — **THE TURN**: `renderGhost()` asks the realm\'s `data.read` ONCE for `{path: [\'drag\']}` and declares `data-ghost="temp"` on the backing\'s target IFF the answer is a committed reading whose node stands at `temp` for the composition\'s pane with a usable member at that pane\'s ADJUSTABLE axis name (`height` for `pane-a`) — and, throwing nothing, behaves closed on every other arm, in TWO CLASSES: the arms that REMOVE a standing declaration (no `data` member at all, a route that throws, the `absent` arm, the ledger arm, a node at `file`, a node naming another pane, a non-finite member, and a member naming an axis this pane does not adjust) and the attribute-less target, which RETURNS AHEAD OF THE PAINT and REMOVES NOTHING — it never carried the declaration, so there is none to remove — painting nothing either', async () => {
    const target = ghostElement()
    const surface = createPaneDrag({ view: null, ghostTarget: target }, null) as unknown as Record<string, unknown>
    expect(
      typeof surface['renderGhost'],
      'DC-8(a) — the composition carries `renderGhost()`: without the turn the drag\'s address has no transient and the pane nothing to show',
    ).toBe('function')
    const ghost = (): void => (surface['renderGhost'] as () => void).call(surface)

    // (1) THE STANDING ARM — ONE read, and the declaration is the family's tier word.
    const standing = ghostRealm(async () => GHOST_STANDS())
    ghost()
    await microtasks()
    expect(standing.reads(), 'DC-8(a) — ONE `data.read` per call, never a poll and never a retry').toBe(1)
    expect(target.declared(), 'DC-8(a) — the declared transient names the tier the family stands at').toBe('temp')
    expect(target.calls, 'DC-8(a) — and it is the ONE member the contract names').toEqual([
      { op: 'set', name: 'data-ghost', value: 'temp' },
    ])

    // (2) THE REMOVAL ARMS, EACH ON A TARGET THAT IS STANDING FIRST — so a removal is a REMOVAL and not a turn that never ran.
    const arms: Array<{ readonly label: string; readonly install: () => () => number }> = [
      {
        label: 'no `data` member at all',
        install: (): (() => number) => {
          ;(globalThis as Record<string, unknown>)['window'] = {}
          return (): number => 0
        },
      },
      {
        label: 'a route that throws',
        install: (): (() => number) =>
          ghostRealm(async (): Promise<unknown> => {
            throw new Error('the route threw (DC-8a)')
          }).reads,
      },
      { label: 'the `absent` arm', install: (): (() => number) => ghostRealm(async () => ({ status: 'absent', path: ['drag'] })).reads },
      {
        label: 'a node standing at `file`',
        install: (): (() => number) =>
          ghostRealm(async () => ({ status: 'read', kind: 'branch', path: ['drag'], value: { _tier: 'file', 'pane-a': { _tier: 'file', height: 220 } } })).reads,
      },
      {
        label: 'a node naming only another pane',
        install: (): (() => number) =>
          ghostRealm(async () => ({ status: 'read', kind: 'branch', path: ['drag'], value: { _tier: 'temp', 'pane-b': { _tier: 'temp', height: 220 } } })).reads,
      },
      {
        label: 'a non-finite axis member',
        install: (): (() => number) =>
          ghostRealm(async () => ({ status: 'read', kind: 'branch', path: ['drag'], value: { _tier: 'temp', 'pane-a': { _tier: 'temp', height: Number.NaN } } })).reads,
      },
      {
        // **AND THE MEMBER THAT NAMES NO AXIS THIS PANE ADJUSTS** (`D-189`, `D-190`; design §4): `pane-a` is
        // stage-resident, so its gesture moves its `height` — a `width` at the address is a placement on the OTHER axis,
        // and it is a closed arm like the rest, the declaration removed rather than painted from it.
        label: 'a member naming an axis this pane does not adjust',
        install: (): (() => number) =>
          ghostRealm(async () => ({ status: 'read', kind: 'branch', path: ['drag'], value: { _tier: 'temp', 'pane-a': { _tier: 'temp', width: 220 } } })).reads,
      },
      { label: 'a ledger arm', install: (): (() => number) => ghostRealm(async () => ({ status: 'refused', reason: 'parent-absent', message: 'no family stands' })).reads },
    ]
    for (const arm of arms) {
      // THE CONTROL: every arm starts with the declaration STANDING, so a removal below is a removal.
      ghostRealm(async () => GHOST_STANDS())
      ghost()
      await microtasks()
      expect(target.declared(), `DC-8(a) — the control: the declaration stands before the \`${arm.label}\` arm runs`).toBe('temp')
      const reads = arm.install()
      expect(() => ghost(), `DC-8(a) — \`${arm.label}\` throws nothing out of the turn`).not.toThrow()
      await microtasks()
      expect(target.declared(), `DC-8(a) — \`${arm.label}\` REMOVES the declaration: a transient is painted from a standing family and from nothing else`).toBeNull()
      expect(reads(), `DC-8(a) — and \`${arm.label}\` was asked AT MOST ONCE: the turn polls, retries and times nothing`).toBeLessThanOrEqual(1)
    }

    // (3) A TARGET THAT CANNOT TAKE ATTRIBUTES: the turn is TOTAL over its backing too — no throw, and nothing to remove.
    const inert = createPaneDrag({ view: null, ghostTarget: {} as never }, null) as unknown as Record<string, unknown>
    ghostRealm(async () => GHOST_STANDS())
    expect(() => (inert['renderGhost'] as () => void).call(inert), 'DC-8(a) — a target with no `setAttribute`/`removeAttribute` throws nothing').not.toThrow()
    await microtasks()
  })

  it('DC-8(b) — **THE DELIVERY**: the ghost turn is what paints the declaration, and the DELIVERY is what drives it — `startViewShape`\'s ONE `client.subscribe(…)` body calls the ghost turn beside `theme?.apply()`, `main()` hands that turn to `startViewShape`, and the composition is constructed with a `ghostTarget`; the composition itself registers NO subscriber, so a turn the delivery does not call is never called at all', () => {
    const code = commentElided(readFileSync(new URL('../src/renderer/renderer.ts', import.meta.url), 'utf8'))
    expect(code.length, 'DC-8(b) — the elided source is not empty: the elider did not swallow the module').toBeGreaterThan(0)

    // (1) THE SUBSCRIPTION BODY CARRIES THE GHOST TURN — the region is `startViewShape`'s own code, up to the next
    //     top-level function, so a call anywhere else in the file cannot answer for it.
    const region = functionRegion(code, 'function startViewShape(')
    expect(region.length, 'DC-8(b) — `startViewShape` is a top-level function in the wiring').toBeGreaterThan(0)
    expect(
      /theme\?\.apply\(\)/.test(region),
      'DC-8(b) — the region really is the delivery body: it carries the appearance turn this row reads beside the ghost',
    ).toBe(true)
    expect(
      /renderGhost\s*\(|\bghost\b[^\n]{0,60}\(/.test(region),
      'DC-8(b) — THE DELIVERY IS WHAT DRIVES THE GHOST: the ONE `client.subscribe(…)` body must call the ghost turn beside `theme?.apply()`, and the composition registers no subscriber of its own — a ghost turn nothing calls paints nothing',
    ).toBe(true)

    // (2) `main()` HANDS THAT TURN TO `startViewShape`.
    expect(
      /startViewShape\(\s*themeApplication\s*,/.test(code),
      'DC-8(b) — `main()` calls `startViewShape(themeApplication, <the ghost turn>)`: the boot builds the shape AND the turn its delivery runs',
    ).toBe(true)

    // (3) THE COMPOSITION IS CONSTRUCTED WITH A `ghostTarget` — the pane ELEMENT the declaration lands on, beside the
    //     shape it reads. The window below the `createPaneDrag(` line is what a multi-line construction needs.
    const lines = code.split('\n')
    const sites = lines
      .map((line, index) => ({ line, index }))
      .filter((site) => /createPaneDrag\(/.test(site.line) && !/function\s+createPaneDrag/.test(site.line))
    expect(sites.length, 'DC-8(b) — ONE construction site in the wiring (the declaration is excluded)').toBe(1)
    const construction = lines.slice(sites[0]!.index, sites[0]!.index + 4).join('\n')
    expect(
      /ghostTarget/.test(construction),
      'DC-8(b) — the composition is constructed with a `ghostTarget`: the declaration has a pane element to land on, and a composition with none could paint nothing',
    ).toBe(true)
    // AND THE SHAPE STILL RIDES IT — the read the ghost turn follows is the same client's.
    expect(/view\s*:\s*getViewClient\(\)/.test(construction), 'DC-8(b) — and the shape is still handed with it').toBe(true)
  })
})
