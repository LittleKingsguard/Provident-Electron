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
//     reading rows' error tokens (`D-76`, `D-127`); `DC-6` is `composeRecord`'s round trip (`order` preserved, every row
//     copied whole, no member invented, the standing active row left exactly as the reading carried it, `newTab: true`
//     opening exactly one row and seating it); `DC-7` is the passthrough's refusals — the store's judgement passing THROUGH
//     and the tool's own refusal confined to its arguments (`D-142`, `D-136`, `D-127`). **THE RETARGET LANDED** (`E-1`): the arms these rows drive exist at this head, and each row says which one it is.

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

  it('DC-2 — **THE RECORD STILL DRIVES, PER TERMINAL AND IN BOTH DIRECTIONS**: a committed reading drives each authored page from ITS OWN witness — `display: "block"` where the witness stands and `display: "none"` where it does not — so closing the no-record arm did not make the drive inert. The two terminals are read independently, which is what a single flag would have hidden', () => {
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
      expect(
        [byNode.get(TABS_LANDING_PAGE_ID), byNode.get(TABS_ERROR_PAGE_ID)],
        `DC-2 — each page is driven by its OWN witness, never by the other's`,
      ).toEqual([{ display: one.expected.landing }, { display: one.expected.error }])
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
 * `write` applies `exactly-one-active` the way `src/main/tabs-record/index.ts` does — the WRITTEN referent survives and
 * every other active row is dropped (`D-142`, `D-140`).
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
 *  composition from the store's judgement (`D-142`, `D-136`). */
interface ActRealm {
  readonly writes: unknown[]
  readonly reads: number
  readonly notified: unknown[]
  readonly record: () => { readonly order: readonly string[]; readonly landing: string; readonly rows: readonly TabsRecordRow[] }
  readonly act: (payload: unknown) => Promise<RpcReply>
}

function actRealm(options: { readonly refuse?: { readonly reason: string; readonly message: string }; readonly tabs?: boolean } = {}): ActRealm {
  const writes: unknown[] = []
  const notified: unknown[] = []
  let reads = 0
  let rows: TabsRecordRow[] = BEFORE_ACT.map((row) => ({ ...row }))
  let order: string[] = ORDER_OF(BEFORE_ACT)
  const activeId = (): string => {
    const actives = rows.filter((row) => row.active === true)
    return actives.length === 1 ? actives[0]!.id : ''
  }
  const read = async (): Promise<unknown> => {
    reads += 1
    return { status: 'committed', order: [...order], landing: activeId(), rows: rows.map((row) => ({ ...row })) }
  }
  const write = async (args: unknown): Promise<unknown> => {
    writes.push(args)
    if (options.refuse !== undefined) {
      return { status: 'refused', reason: options.refuse.reason, message: options.refuse.message, address: ['tabs'], path: ['tabs'] }
    }
    const value = ((args ?? {}) as { value?: unknown }).value as Record<string, unknown>
    const sent = (((value ?? {})['order'] ?? []) as string[])
    const held = sent.map((id) => ({ ...((value ?? {})[id] as TabsRecordRow) }))
    // THE RECORD'S OWN REPAIR: the written referent is the row whose `active` MOVED to true; every other active is dropped.
    const moved = held.filter((row) => row.active === true && rows.find((was) => was.id === row.id)?.active !== true)
    const keep = moved.length > 0 ? moved[moved.length - 1]!.id : (held.find((row) => row.active === true)?.id ?? '')
    order = sent
    rows = held.map((row) => (row.active === true ? { ...row, active: row.id === keep } : { ...row }))
    return { status: 'committed', path: ['tabs'], cursor: null, repaired: moved.length > 0, log: [] }
  }
  const provident: Record<string, unknown> = {
    data: { read: async () => ({}), write, delete: async () => ({}), list: async () => ({}), journal: async () => ({}) },
  }
  if (options.tabs !== false) provident['tabs'] = { read, onChanged: (): (() => void) => (): void => undefined }
  ;(globalThis as Record<string, unknown>)['window'] = { provident }
  return {
    writes,
    get reads(): number { return reads },
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

describe('D-142 — the act, its composition round trip, and the subscriber that follows it', () => {
  it('DC-5 — **THE APP\'S OWN SUBSCRIBER AFTER THE ACT**: `driveTabsLandingPage` drives BOTH authored terminals from the post-act record — the arm `F-3` cannot carry, because a pure active-tab change leaves both written values IDENTICAL (`landing` is DERIVED from the active row and the error witness reads rows\' error tokens), so the terminals are invariant while the record moved. The control beside it proves the drive is not inert: the composed value BEFORE the repair seats two actives, and that record drives the landing terminal `none` naming both ids', () => {
    const before = runtimeRecorder()
    const after = runtimeRecorder()
    const pre = driveTabsLandingPage(readingOf(BEFORE_ACT, before.runtime), before.runtime)
    const post = driveTabsLandingPage(readingOf(AFTER_ACT, after.runtime), after.runtime)

    // BOTH TERMINALS, FROM THE POST-ACT RECORD, EACH BY ITS OWN WITNESS.
    expect(after.writes.length, 'DC-5 — the post-act delivery drives BOTH authored terminals, so neither page keeps a prior turn\'s word').toBe(2)
    expect([post.landing.driven, post.error.driven], 'DC-5 — and each drive is the runtime\'s own `applied`').toEqual([true, true])
    expect(
      after.writes.map((w) => [w.node, w.targetProp, w.value]),
      'DC-5 — the post-act drive writes the ENVELOPE\'s own style member on the envelope\'s own authored nodes',
    ).toEqual([
      [TABS_LANDING_PAGE_ID, 'css.style', { display: 'block' }],
      [TABS_ERROR_PAGE_ID, 'css.style', { display: 'block' }],
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

    // THE CONTROL: the value the composition writes BEFORE the repair seats two actives, and that record is no landing.
    const two = runtimeRecorder()
    const composed: readonly TabsRecordRow[] = [
      { id: 'landing', target: '/home', active: true, label: 'home', lastActiveAt: '2026-11-06T00:00:00.000Z' },
      { id: 'alpha', target: '/alpha', active: true, label: 'alpha', lastActiveAt: '2026-11-06T00:00:01.000Z' },
      BEFORE_ACT[2]!,
    ]
    const twoReading = readingOf(composed, two.runtime)
    expect(
      twoReading.status === 'committed' ? twoReading.witness.landing.activeIds : null,
      'DC-5 CONTROL — a two-active record names BOTH ids, so the failing case is readable instead of merely red',
    ).toEqual(['landing', 'alpha'])
    const twoPages = driveTabsLandingPage(twoReading, two.runtime)
    expect(twoPages.landing.witness, 'DC-5 CONTROL — two actives derive no landing witness').toBe(false)
    expect(
      twoPages.landing.driven && two.writes[0]?.value,
      'DC-5 CONTROL — and the terminal is DRIVEN to `none`: the drive is a function of the record, so it moves when the record does',
    ).toEqual({ display: 'none' })
  })

  it('DC-6 — **`composeRecord`\'S ROUND TRIP, THROUGH THE ACT**: one `data.write` at `[\'tabs\']` at `file` carries the WHOLE record — `order` preserved, every row copied whole, no member invented, the target row seated with `lastActiveAt` stamped, and the standing active row left EXACTLY as the reading carried it — and the tool answers the record as the store stands after the repair, never the value it sent. `newTab: true` opens exactly ONE row carrying the caller\'s target and seats it (ASM-1)', async () => {
    const realm = actRealm()
    const reply = await realm.act({ target: '/alpha' })

    // ONE WRITE, AT THE ONE ADDRESS AND TIER THE PASSTHROUGH DECLARES (`D-142`, `D-112`).
    expect(realm.writes.length, 'DC-6 — the act writes the record ONCE: one composition, one passthrough, no retry').toBe(1)
    const written = realm.writes[0] as { readonly path?: unknown; readonly tier?: unknown; readonly value?: unknown }
    expect(written.path, 'DC-6 — the address is the tab record\'s own').toEqual(['tabs'])
    expect(written.tier, 'DC-6 — at the tab record\'s own tier, which the declared-root guard admits and no other').toBe('file')
    const value = written.value as Record<string, unknown>

    // `order` IS PRESERVED — a seat moves no member of it.
    expect(value['order'], 'DC-6 — `order` is copied in the reading\'s own order and a SEAT moves nothing in it').toEqual(['landing', 'alpha', 'broken'])
    // NO MEMBER IS INVENTED — the keys are the `order` seat and the ids the reading named, and no `landing` member.
    expect(
      Object.keys(value).sort(),
      'DC-6 — the value\'s keys are the `order` seat and the ids the reading named, and NOTHING else: no `landing` member, because `landing` is DERIVED from the rows (`D-76`, ASM-4)',
    ).toEqual(['alpha', 'broken', 'landing', 'order'])
    // EVERY ROW IS COPIED WHOLE — the two the act does not touch are byte-identical to the reading's.
    expect(value['landing'], 'DC-6 — the standing active row is left EXACTLY as the reading carried it (ASM-3): the renderer may seat two actives on purpose and NEVER clears the older one itself').toEqual(BEFORE_ACT[0])
    expect(value['broken'], 'DC-6 — and a row the act does not name is copied whole, its `error` token included').toEqual(BEFORE_ACT[2])
    // THE TARGET ROW SEATED: `active` true and `lastActiveAt` stamped, its identity and target untouched.
    const seated = value['alpha'] as TabsRecordRow
    expect([seated.id, seated.target, seated.active], 'DC-6 — the target row is SEATED in the record\'s own terms').toEqual(['alpha', '/alpha', true])
    expect(typeof seated.lastActiveAt, 'DC-6 — and stamped now for the `tab-has-lastActiveAt` pair (`D-142`)').toBe('string')

    // THE ANSWER IS THE RECORD AS RE-READ AFTER THE WRITE (ASM-2), NOT THE VALUE SENT.
    expect(reply.ok, 'DC-6 — the act answers `ok` and carries a value').toBe(true)
    const answer = reply.value as { readonly status?: unknown; readonly order?: unknown; readonly rows?: unknown }
    expect(answer.status, 'DC-6 — the answer is a record, in the tabs client\'s committed arm').toBe('committed')
    expect(answer.order, 'DC-6 — and it is the record as the store stands, read back AFTER the write').toEqual(realm.record().order)
    expect(answer.rows, 'DC-6 — row for row, the answer is the re-read record').toEqual(realm.record().rows)
    expect(
      ((answer.rows ?? []) as readonly TabsRecordRow[]).filter((row) => row.active === true).map((row) => row.id),
      'DC-6 — the repair settled the pair the act seated (`D-140`, `D-142`): exactly one row reads active and it is the target\'s',
    ).toEqual(['alpha'])
    expect(realm.reads, 'DC-6 — and the act read the record at least once, which is where its composition came from').toBeGreaterThan(0)
    expect(realm.notified, 'DC-6 — the act emits NO app-graph push: the record\'s own listener is what delivers the change (`D-137`, `D-112`)').toEqual([])

    // `newTab: true` OPENS EXACTLY ONE ROW, CARRYING THE CALLER'S TARGET, AND SEATS IT (ASM-1).
    const opened = actRealm()
    const openReply = await opened.act({ target: '/delta', newTab: true })
    expect(opened.writes.length, 'DC-6 — an OPEN is one write too').toBe(1)
    const openedValue = (opened.writes[0] as { readonly value?: unknown }).value as Record<string, unknown>
    const openedOrder = openedValue['order'] as string[]
    expect(openedOrder.length, 'DC-6 — `newTab: true` adds EXACTLY ONE row to `order`').toBe(BEFORE_ACT.length + 1)
    expect(openedOrder.slice(0, BEFORE_ACT.length), 'DC-6 — and it appends it: no standing id is reordered by an open').toEqual(ORDER_OF(BEFORE_ACT))
    const newId = openedOrder[BEFORE_ACT.length]!
    expect(
      ORDER_OF(BEFORE_ACT).includes(newId),
      'DC-6 — the opened row\'s id is one the record did not carry, so the act minted rather than reused an id',
    ).toBe(false)
    const newRow = openedValue[newId] as TabsRecordRow
    expect([newRow.target, newRow.active], 'DC-6 — the opened row carries the CALLER\'S target and is seated').toEqual(['/delta', true])
    expect(
      (openedValue['landing'] as TabsRecordRow).active,
      'DC-6 — and no standing row\'s bytes move (ASM-3): the older active is still active in the value this renderer wrote',
    ).toBe(true)
    const openAnswer = openReply.value as { readonly rows?: readonly TabsRecordRow[] }
    expect(
      ((openAnswer.rows ?? []) as readonly TabsRecordRow[]).filter((row) => row.active === true).map((row) => row.id),
      'DC-6 — and the answer names the opened row as the one active, the repair having dropped the older one',
    ).toEqual([newId])
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
})

/* ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
 * `DC-8` — THE GHOST'S DELIVERY TURN. The drag's in-process value became an ADDRESS (`['drag']` at `temp`, one member
 * per pane id, each `{size}`), so the transient a human sees while dragging is no longer a closure value: it is a READ
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
 *  `temp` for the composition's pane with a usable `size`. */
const GHOST_STANDS = (): unknown => ({
  status: 'read',
  kind: 'branch',
  path: ['drag'],
  value: { _tier: 'temp', 'pane-a': { _tier: 'temp', size: 220 } },
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
  it('DC-8(a) — **THE TURN**: `renderGhost()` asks the realm\'s `data.read` ONCE for `{path: [\'drag\']}` and declares `data-ghost="temp"` on the backing\'s target IFF the answer is a committed reading whose node stands at `temp` for the composition\'s pane with a usable `size` — and REMOVES the declaration, throwing nothing, on every other arm: no `data` member at all, a route that throws, the `absent` arm, a node at `file`, a node naming another pane, a non-finite size, and a target that cannot take attributes', async () => {
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
          ghostRealm(async () => ({ status: 'read', kind: 'branch', path: ['drag'], value: { _tier: 'file', 'pane-a': { _tier: 'file', size: 220 } } })).reads,
      },
      {
        label: 'a node naming only another pane',
        install: (): (() => number) =>
          ghostRealm(async () => ({ status: 'read', kind: 'branch', path: ['drag'], value: { _tier: 'temp', 'pane-b': { _tier: 'temp', size: 220 } } })).reads,
      },
      {
        label: 'a non-finite size',
        install: (): (() => number) =>
          ghostRealm(async () => ({ status: 'read', kind: 'branch', path: ['drag'], value: { _tier: 'temp', 'pane-a': { _tier: 'temp', size: Number.NaN } } })).reads,
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
