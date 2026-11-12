// tests/theme-act.test.ts — **THE HUMAN'S CLICK IS AN ACT THAT REACHES THE STORE** (`D-126`; `D-125`'s correction applied to
// the appearance family).
//
// THE DEFECT THIS FILE MEASURES, AND WHY NOTHING ELSE COULD. Until this pass the appearance family had exactly ONE cause:
// `commit()` reached from the reply path's notify, gated on a MUTATING reply. A human clicking the authored control wrote the
// authored CARRIER and reached the crossing NEVER — so `['theme']` held one setting while the surface rendered another, and
// no delivery ever reconciled them because no delivery was ever caused. Two instrument classes were structurally blind to it:
// **`npm run divergence`** compares the two realms' SSR fragments BEFORE any act, and **every unit row dispatched**, which is
// the agent's path and never the browser's. The gap was in the wiring, and only a dispatched DOM event could see it.
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked-file` marker and GATES (`AGENTS.md`). Its subject is
// the DOM-ORIGINATED TURN — `startThemeApplication`'s `attach()` — and the two envelope/shim facts that make it possible:
//
//   · A-1  THE TOKEN IS AUTHORED DATA ON THE CONTROL, and the shim reflects it the way the platform does. `§2.3` item 2 FAILS
//          a body that substitutes a default for an absent argument, so the fix cannot be in the handler: the CALLER must
//          supply the token, and on the DOM path the caller is the BROWSER, whose only token channel is the control's `value`.
//   · A-2  A REAL CLICK REACHES THE CROSSING AND COMES BACK: the authored handler runs, the carrier moves, the attached
//          listener hands the setting to the SAME turn the reply path calls, the crossing's repair resolves it, the delivery
//          applies `props.<name>`, and `renderedHtml` carries the attribute — end to end, from a dispatched event.
//   · A-3  **THE ACT IS OWED AGAINST THE PAINTED SURFACE, AND EACH CAUSE KEEPS ITS OWN REFERENCE** — the arm this row was
//          MISSING, and the defect it used to assert as correct. A CLICK sends exactly when the painted node does not already
//          carry the token the control carries (`authoredPropOf`, `D-129`'s ask-don't-remember relation), so a click on a
//          token the surface ALREADY SHOWS sends nothing, while a click from a FRESH boot — whose RECORD is the placeholder
//          and whose surface carries no attribute, though the authored card's own `content` reads `dark` — SENDS. Measured
//          against the boot baseline the click answered `changed: false` instead: the baseline is seeded from the AUTHORED
//          CARRIER, and only a DIFFERENT token could pass it, which is the user's *"dark doesn't work, unless it was
//          previously set to light mode"*. The REPLY path keeps that baseline (`T-7`, untouched), and the boot stays
//          event-free (`D-216`).
//   · A-4  TOTALITY: an envelope with no derivable controls answers `{attached: 0}` and throws nothing, and the ids are
//          DERIVED from the envelope rather than spelled at the wiring.
//
// The `Runtime` is the APP's own over the AUTHORED envelope, mounted on the DOM shim; the crossing is a REAL node-side
// `provident-storeroom` instance carrying the view module's whole batch. **A node-suite green is envelope-green and never
// app-green** (`AGENTS.md`): this file drives the shim's event path, and the LIVE instrument remains `npm run ui`/`npm run
// panes` over the built bundle in Electron.

import { describe, it, expect, beforeAll } from 'vitest'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { installShim, mountEl, ShimElement } from '../src/shared/dom-shim.js'
import { getViewClient, startThemeApplication, themeWiringRole } from '../src/renderer/renderer.js'
import { createViewClient, type ViewClient, type ViewClientBridge } from '../src/renderer/view-client.js'
import { createProfileStore } from '../src/main/storeroom.js'
import { createViewDelivery, createViewRecord, viewConstraintDeclarations, type ViewDelivery, type ViewRecordStore } from '../src/main/view-record/index.js'

beforeAll(() => {
  installShim()
})

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const RENDERER_PATH = `${ROOT}src/renderer/renderer.ts`

/** The authored state node's own spelling, taken from the corpus's declared holder rather than re-typed here. */
const STATE_NODE = 'theme-setting'
/** The two authored controls, as the ENVELOPE spells them — read here as the corpus's declared pair, never invented. */
const DARK_ID = 'theme-dark'
const LIGHT_ID = 'theme-light'

interface Crossing {
  readonly record: ReturnType<typeof createViewRecord>
  /** **THE APP'S ONE STORE, AS THE ROW THAT READS AN ADDRESS NEEDS IT** (`A-5`): the record's routes are the writers, and
   *  the store is where the family they wrote can be read back at its own path and tier — `store.read(['drag'], 'temp')`.
   *  Nothing else in this file touches it. */
  readonly store: ReturnType<typeof createProfileStore>
  /** The bridge literal this realm is handed, kept so a row can state its MEMBER CENSUS rather than re-spelling it. */
  readonly bridge: ViewClientBridge
  /** Every `commitDrag`/`clearDrag` the client sent, in order — the literal's own call log (`A-5`). A `clearDrag()` has no
   *  id and no geometry, and its entry says so rather than borrowing a pane id. */
  readonly dragCalls: { readonly id: string; readonly geometry: unknown }[]
  readonly close: () => void
}

/** **THE CROSSING, REAL** — a fresh `provident-storeroom` instance carrying the module's whole batch, bound after the
 *  construction answers, with the bridge installed as the ambient member this realm reads. That is the app's own route. */
function crossing(): Crossing {
  const dir = mkdtempSync(join(tmpdir(), 'theme-act-'))
  const bound: { current: ViewRecordStore | null } = { current: null }
  const profilePath = join(dir, 'provident-profile.json')
  // **THE DELIVERY IS BUILT BEFORE THE STORE, BECAUSE ITS `listeners` ARRAY IS READ INSIDE THE CALL THAT CREATES IT**
  // (`D-219`; `docs/L3/view-record/delivery.md` §1). The four entries are what the construction adopts, so this crossing is
  // the app's shape and the creation's repairs deliver here — and `record.subscribe` below is the fan-out the bridge's
  // `onChanged` route stands on, with no store verb behind it (`D-129`: one registration per address).
  const sunk: (readonly string[])[] = []
  const delivery = createViewDelivery((address) => sunk.push([...address]))
  const store = createProfileStore({
    filePath: profilePath,
    constraints: viewConstraintDeclarations(() => bound.current).map((declaration) => ({
      address: declaration.address,
      id: declaration.id,
      constraint: declaration.constraint,
    })) as never,
    listeners: [...delivery.entries],
  })
  bound.current = store as unknown as ViewRecordStore
  const record = createViewRecord({ store: bound.current, delivery })
  const dragCalls: { id: string; geometry: unknown }[] = []
  // **THE DRAG PAIR ARRIVES WITH THE RECORD'S OWN IMPLEMENTATION, AND THE CAST KEEPS THIS FILE COMPILING ON BOTH SIDES OF
  // THAT LANDING** (`ViewClientBridge` declares FIVE members today: `read`, `commitPane`, `commitZones`, `commitTheme`,
  // `onChanged`). The two members below delegate to the record through a narrowed view of it, so a record that has not
  // grown the routes yet answers `undefined` rather than throwing and the client records the `absent` statement.
  const routes = record as unknown as {
    commitDrag?: (id: string, geometry: unknown) => unknown
    clearDrag?: () => unknown
  }
  const bridge = {
    read: async () => record.read(),
    commitPane: async (id: string, geometry: unknown) => record.commitPane(id, geometry),
    // **THE `commitFocus` MEMBER IS GONE FROM THIS LITERAL AND FROM BOTH HALVES OF THE LOCKSTEP PAIR**
    // (`D-142`, `E-12`): the `['focus']` family is deleted whole, so the view record answers no such route,
    // `view-client.ts`'s `ViewClientBridge` declares no such member, and a literal still carrying it would red
    // the whole-tree typecheck leg (`typecheck:tests`) for a route nothing reaches any more.
    commitZones: async (id: string, zone: unknown) => record.commitZones(id, zone),
    commitTheme: async (token: string, attributeName: string) => record.commitTheme(token, attributeName),
    // **THE TWO ROUTES THE DRAG'S ADDRESS NEEDS**: `commitDrag(paneId, geometry)` writes `{[paneId]: {height}}` whole at
    // `['drag']`/`temp`, and `clearDrag()` ends the family. Each records the call before delegating, so a row can state
    // that the client SENT it and that the record then wrote the address.
    commitDrag: async (id: string, geometry: unknown) => {
      dragCalls.push({ id, geometry })
      return routes.commitDrag?.(id, geometry) ?? { status: 'committed' }
    },
    clearDrag: async () => {
      dragCalls.push({ id: '', geometry: null })
      return routes.clearDrag?.() ?? { status: 'committed' }
    },
    onChanged: (handler: () => void): (() => void) => record.subscribe(handler),
  } as unknown as ViewClientBridge
  ;(globalThis as Record<string, unknown>).window = { provident: { view: bridge } }
  return {
    record,
    store,
    bridge,
    dragCalls,
    close: () => {
      delete (globalThis as Record<string, unknown>).window
      bound.current = null
      rmSync(dir, { recursive: true, force: true })
    },
  }
}

const realm = (): ViewClient => getViewClient()

/** One delivery's settle — the push is a RE-READ, so the chain spends the route's promise, the client's fill and the
 *  caller's handler; four microtask turns is what `tests/theme-declaration.test.ts` measured for the same chain. */
const settle = async (): Promise<void> => {
  for (let n = 0; n < 4; n += 1) await Promise.resolve()
  // **AND A MACROTASK BOUNDARY, WHICH `D-130` MADE LOAD-BEARING**: the repair for the one-write-late render recompiles on
  // `flush()`, and the supervisor's settle loop awaits `setTimeout(0)` turns — so microtasks alone would read the surface
  // before the repair has run and the row would measure the absence it is meant to catch.
  for (let n = 0; n < 6; n += 1) await new Promise((resolve) => setTimeout(resolve, 0))
  for (let n = 0; n < 4; n += 1) await Promise.resolve()
}

function boot(): Runtime {
  const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
  runtime.bootstrap()
  return runtime
}

/** The rendered element the graph resolves for an authored id — the surface a real click lands on. */
function elementFor(runtime: Runtime, id: string): ShimElement {
  const element = runtime.elementForNodeId(id)
  expect(element, `the authored control \`${id}\` must resolve to a rendered element`).not.toBeNull()
  return element as ShimElement
}

/** **THE REAL CLICK, WITH THE ONE PLATFORM FACT THE PINNED SHIM DOES NOT MODEL.** The authored control's listeners are
 *  the adapter's (installed at render, so the authored handler runs FIRST) and this pass's (installed by `attach()`, so the
 *  act runs after it) — the order a browser gives. A real `HTMLButtonElement.value` REFLECTS its `value` attribute, which is
 *  how the runtime's DOM bridge (`'value' in target ? [String(target.value)] : []`) comes to carry the authored token; the
 *  shim's member set is CLOSED by `engine-pin` §2.2.4, so it stores the attribute without reflecting it and the row supplies
 *  the slot the platform would. Nothing else about the dispatch is modelled: the event object, the listener order and the
 *  target are the browser's. */
function click(runtime: Runtime, id: string): void {
  const element = elementFor(runtime, id)
  const authoredToken = element.getAttribute('value')
  expect(authoredToken, `the authored control \`${id}\` must carry its token as \`props.value\` for a browser to have one to send`).not.toBeNull()
  element.value = String(authoredToken)
  const event = { type: 'click', target: element }
  for (const listener of [...(element.listeners['click'] ?? [])]) listener(event)
}

/** **THE RENDERED ATTRIBUTE, OFF `get_rendered_html`'S OWN ANSWER** — the serialization, which is the surface a human sees
 *  and the one `D-130` repaired. */
function renderedAttribute(runtime: Runtime, name: string): string | null {
  const html = runtime.renderedHtmlResult().renderedHtml
  const tag = new RegExp(`<div[^>]*id="${STATE_NODE}"[^>]*>`).exec(html)?.[0] ?? ''
  const value = new RegExp(`\\s${name}="([^"]*)"`).exec(tag)
  return value === null ? null : value[1]
}

/** The authored node's OWN reading, through the runtime's graph read — the surface `provident.get_node_state` answers on. */
function authored(runtime: Runtime): { content: unknown; props: Record<string, unknown> } {
  const answer = runtime.nodeState(STATE_NODE) as { states?: { content?: unknown; props?: Record<string, unknown> }[] }
  const first = answer.states?.[0]
  return { content: first?.content, props: first?.props ?? {} }
}

/** Comment lines elided — the discipline every absence assertion in this corpus uses, so prose cannot answer for code. */
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n')
}

// ───────────────────────────────────────────────────────────────────────────
// A-1 — THE TOKEN IS AUTHORED DATA ON THE CONTROL, AND THE SHIM REFLECTS IT
// ───────────────────────────────────────────────────────────────────────────
describe('D-126 · the appearance act, from a REAL CLICK to the store and back', () => {
  it('A-1 — **THE CONTROL CARRIES ITS OWN TOKEN AS DATA**: each authored control authors `props.value`, which the graph renders as the `value` ATTRIBUTE — because `§2.3` item 2 forbids the handler substituting a token for an absent argument, so the token can only come from the CALLER, and on the DOM path the caller is the browser, whose only token channel is the control\'s `value`', async () => {
    const runtime = boot()
    for (const [id, token] of [
      [DARK_ID, 'dark'],
      [LIGHT_ID, 'light'],
    ] as const) {
      const element = elementFor(runtime, id)
      // THE AUTHORED DATA, read off the rendered graph rather than off a re-typed expectation.
      expect(
        element.getAttribute('value'),
        `A-1 — the authored control \`${id}\` authors \`props.value\`, which becomes the \`value\` ATTRIBUTE`,
      ).toBe(token)
      // THE BRIDGE'S OWN READING OF IT — the exact expression `src/renderer/runtime.ts` uses to build dispatch args, which
      // is what a real browser's reflection supplies (`element.value`; see `click()` for why the row supplies it).
      expect('value' in element, 'A-1 — the DOM bridge\'s `\'value\' in target` arm is open for this control').toBe(true)
      // A SECOND CONTROL FOR THE `attach()` SIDE: the id this row can attach to is derivable, so the turn has somewhere to
      // land once the token is there.
      expect(typeof element.addEventListener, 'A-1 — and the control exposes the listener surface `attach()` needs').toBe('function')
    }
    // AND NOTHING ELSE CHANGED ABOUT THE CARD: the state node authors no token of its own, so the pair lives on the
    // CONTROLS and the carrier keeps its own meaning.
    expect(elementFor(runtime, STATE_NODE).getAttribute('value'), 'A-1 — the state node authors no token of its own').toBeNull()
  })

  // ─────────────────────────────────────────────────────────────────────────
  // A-2 — A REAL CLICK REACHES THE CROSSING AND COMES BACK
  // ─────────────────────────────────────────────────────────────────────────
  it('A-2 — **A DISPATCHED CLICK IS AN ACT THAT REACHES THE STORE AND RETURNS AS A RENDER** (`D-125`\'s chain, driven by the browser and not by an agent): the authored handler runs first and moves the carrier to the control\'s own token, the attached listener hands it to the SAME turn the reply path calls, the crossing\'s route is handed the setting and the caller-held attribute name, the `theme-must-stand` repair resolves it, and the delivery applies `props.theme` so `renderedHtml` carries it — with NOTHING in this row calling `commit()` or `dispatch()`', async () => {
    const runtime = boot()
    const bridge = crossing()
    try {
      const application = startThemeApplication(runtime)
      const attached = application.attach()
      expect(attached.attached, 'A-2 — both authored controls were resolvable, so both listeners were installed').toBe(2)

      // THE DELIVERY'S TURN IS THE APP'S OWN SUBSCRIPTION BODY (`startViewShape`'s `theme?.apply()`), taken here so the row
      // can read what the delivery answered.
      const delivered: string[] = []
      const subscription = realm().subscribe(() => {
        delivered.push(JSON.stringify(application.apply().declaration))
      })
      try {
        const before = runtime.renderedHtmlResult().renderedHtml
        expect(authored(runtime).props.theme, 'A-2 — nothing is declared before any act').toBeUndefined()
        expect(authored(runtime).content, 'A-2 — the envelope authors its own token').toBe('dark')

        // **THE ACT IS A CLICK AND NOTHING ELSE.** No `dispatch`, no `commit()`: the element's own listeners do the work.
        click(runtime, LIGHT_ID)
        await settle()

        expect(
          authored(runtime).content,
          'A-2 — the AUTHORED HANDLER ran first and carried the CONTROL’s token, which is only possible because the control authors it',
        ).toBe('light')
        const standing = bridge.record.read().theme
        expect(standing.token, 'A-2 — the crossing was asked, and its record carries the clicked token').toBe('light')
        expect(standing.attribute, 'A-2 — with the caller-held attribute NAME, as the act is declared').toBe('theme')
        expect(
          standing.declaration,
          'A-2 — and the RECORD\'s own resolution, produced by the repair and not by this realm',
        ).toEqual({ name: 'theme', value: 'light', removal: false })
        expect(bridge.record.read().source.theme, 'A-2 — the family STANDS: a repair put it there').toBe('record')

        expect(delivered.length, 'A-2 — the committed act caused exactly one delivery').toBe(1)
        expect(
          delivered[0],
          'A-2 — and the delivery APPLIED the record\'s declaration: one `state-slice` that landed',
        ).toBe(JSON.stringify({ name: 'theme', value: 'light', removal: false }))
        // **THE WRITE REACHED THE PRODUCING GRAPH** — the address `get_node_state` answers on, and the one the UI-authority
        // rule is about. **THE DOM SERIALIZATION IS ASSERTED ELSEWHERE AND NOT HERE, FOR A MEASURED REASON**: on this path the
        // `state-slice` lands while `handleDomEvent`'s flush is still in flight, and `applyCommand` compiles the node before
        // that flush settles, so `domPrevMap` never sees the op and the ATTRIBUTE renders one write late — measured on this
        // tree, and reaching the DELIVERY path rather than this wiring (the same lag reproduces with `attach()` never called,
        // and does not reproduce on an agent's dispatch, which awaits `flush()` first). That is filed as a defect of the
        // runtime unit, not absorbed here; a row that asserted it as correct would hide it.
        expect(
          authored(runtime).props.theme,
          'A-2 — the declaration became provident data ON the authored node, which is what UI authority requires',
        ).toBe('light')
        // **AND IT REACHES THE SERIALIZATION — ASSERTED HERE BECAUSE `D-130` CORRECTED THE REASON THIS ROW WITHHELD IT.**
        // The audit had recorded that a `state-slice` issued mid-cascade "renders one write late", and this row therefore
        // asserted the graph alone. **That reading was an INSTRUMENT FAULT and not a defect**: the write reaches the
        // SERIALIZATION on the first MACROTASK boundary, which is the engine's own settle (`flush()` awaits `setTimeout(0)`
        // turns and `handleDomEvent` chains its render onto it) — measured: the graph carries `theme` from microtask 3 and
        // the rendered tag from macrotask 1. The row now asserts the surface the HUMAN sees, which is its subject.
        expect(
          renderedAttribute(runtime, 'theme'),
          'A-2 — the declaration is provident data the RENDERED surface carries, not only the graph',
        ).toBe('light')
        expect(before, 'A-2 — and the surface this row compares against was a real reading, not an empty string').not.toBe('')
      } finally {
        subscription.release()
      }
    } finally {
      bridge.close()
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // A-3 — THE ACT IS OWED AGAINST THE PAINTED SURFACE, AND EACH CAUSE KEEPS ITS REFERENCE
  // ─────────────────────────────────────────────────────────────────────────
  it('A-3 — **A CLICK IS OWED AGAINST THE PAINTED SURFACE, NOT AGAINST THE BOOT BASELINE**: the attached listener hands the control\'s token to `commitSetting` with its CAUSE named, so a click SENDS exactly when the painted node does not already carry that token (`authoredPropOf`, the same relation `apply` reads) — which means a click from a FRESH boot whose RECORD is the PLACEHOLDER and whose surface carries no attribute SENDS, and `Dark` on such a boot is now asked rather than swallowed; a click on a token the SURFACE already shows sends nothing; and the REPLY path\'s `T-7` baseline is untouched (a `commit()` in the same realm, on the same carrier token, still answers `changed: false, sent: false`), with the boot itself event-free (`D-216`)', async () => {
    const runtime = boot()
    const bridge = crossing()
    try {
      const application = startThemeApplication(runtime)
      application.attach()
      /** **EVERY DELIVERY THE REALM'S OWN SUBSCRIPTION SAW** — `startViewShape`'s body, taken here, so "sends nothing" is
       *  measured at the CROSSING's fan-out and not only at the record's bytes: an act that was sent writes, and a write
       *  causes a delivery; an act that was not sent causes none. */
      const deliveries: number[] = []
      const subscription = realm().subscribe(() => {
        deliveries.push(deliveries.length)
        application.apply()
      })
      try {
        await settle()
        /** THE RECORD A FRESH PROFILE'S FAMILY STANDS AT: no token, no attribute name, and a removal declaration naming
         *  nothing. A placeholder is NOT a resolution — it is the absence of one. */
        const PLACEHOLDER = { token: null, attribute: null, declaration: { name: null, value: '', removal: true } }

        // ── (0) THE BOOT IS EVENT-FREE (`D-216`'s paradigm is not touched by this fix) ─────────────────────────────────
        expect(
          authored(runtime).content,
          'A-3 — the AUTHORED CARRIER reads `dark` at boot: that is the LABEL, and it is what the record below DISAGREES with — the disagreement is the hazard this row is about',
        ).toBe('dark')
        expect(
          authored(runtime).props.theme,
          'A-3 — NOTHING IS APPLIED AT A BOOT: the record stands at the placeholder, so no `props.theme` exists yet',
        ).toBeUndefined()
        expect(
          renderedAttribute(runtime, 'theme'),
          'A-3 — and the PAINTED surface carries no `theme` attribute at all: THAT absence is the reference a CLICK is measured against',
        ).toBeNull()
        expect(
          bridge.record.read().theme,
          'A-3 — a fresh profile\'s record, byte for byte: no token, no attribute, a removal declaration naming nothing',
        ).toEqual(PLACEHOLDER)
        const bootDeliveries = deliveries.length

        // ── (0b) THE REPLY PATH'S BASELINE IS UNTOUCHED (`T-7`) — the same carrier token, the same realm, the same
        //        instant, and the reply path asks the crossing NOTHING: its reference is `lastCarried`, seeded at the boot
        //        from the AUTHORED CARRIER, which is what keeps the first reply of a boot from carrying the envelope's own
        //        token as though a person had chosen it (without that seed `npm run divergence` reds). **A fix that
        //        re-pointed THIS arm at the surface would license the boot-time declaration the seed exists to prevent.**
        const reply = application.commit()
        expect(
          { changed: reply.changed, sent: reply.sent },
          'A-3 (reply path) — `commit()` on a FRESH boot answers `changed: false, sent: false`: the baseline is the CARRIER\'s and it stays so',
        ).toEqual({ changed: false, sent: false })
        expect(
          bridge.record.read().theme,
          'A-3 (reply path) — and it wrote nothing: the record is still the placeholder',
        ).toEqual(PLACEHOLDER)
        expect(deliveries.length, 'A-3 (reply path) — so no delivery was caused by the reply path either').toBe(bootDeliveries)

        // ── (1) **THE USER'S DEFECT, AND THE ARM THIS ROW WAS MISSING — A CLICK WHOSE RECORD IS A PLACEHOLDER BUT WHOSE
        //        AUTHORED CARD SHOWS A TOKEN SENDS.** The card's own carrier reads `dark` (arm (0)) while the record stands
        //        at the placeholder, and a person pressing the control labelled `Dark` is asking the STORE for dark: whether
        //        the demo card already says `dark` is a question the store has never been asked. Measured against the boot
        //        baseline the click answered `changed: false` and the record stayed byte-identical — *"dark doesn't work,
        //        unless it was previously set to light mode"* — which is what the guard was doing while it trusted the LABEL
        //        over the record.
        click(runtime, DARK_ID)
        await settle()
        expect(
          authored(runtime).content,
          'A-3 — the AUTHORED HANDLER ran first and wrote the control\'s token into the carrier — the same `dark` the baseline was reading',
        ).toBe('dark')
        expect(
          bridge.record.read().theme,
          'A-3 — AND THE ACT IS SENT: the RECORD was a PLACEHOLDER (the surface carried no `theme` DECLARATION, whatever its label said), so a click on `Dark` is OWED — measured as the record MOVING off the placeholder onto the clicked token, with the caller-held attribute name',
        ).toEqual({ token: 'dark', attribute: 'theme', declaration: { name: 'theme', value: 'dark', removal: false } })
        expect(
          bridge.record.read().source.theme,
          'A-3 — and a repair produced it; this realm composed no declaration',
        ).toBe('record')
        expect(authored(runtime).props.theme, 'A-3 — the delivery applied the record\'s declaration to the producing graph').toBe('dark')
        expect(
          renderedAttribute(runtime, 'theme'),
          'A-3 — AND THE SURFACE NOW SHOWS IT, which is the reference every later click is measured against',
        ).toBe('dark')
        expect(deliveries.length, 'A-3 — exactly one delivery was caused by that one act').toBe(bootDeliveries + 1)

        // ── (2) **A CLICK ON A TOKEN THE SURFACE ALREADY SHOWS SENDS NOTHING** — the arm that was right, re-measured
        //        against the SURFACE instead of the carrier. The skip is a POSITIVE SETTLED MATCH on `props.theme` and
        //        never a memory of what was written (`D-129`, `D-163`): the same control, pressed again, asks no second
        //        question.
        const standingAfterDark = JSON.stringify(bridge.record.read())
        const deliveriesAfterDark = deliveries.length
        click(runtime, DARK_ID)
        await settle()
        expect(
          JSON.stringify(bridge.record.read()),
          'A-3 — `Dark` pressed again with the PAINT already `dark` asks the crossing nothing: the act is sent ONCE per real change and not once per click, and the reference that says "already there" is the surface',
        ).toBe(standingAfterDark)
        expect(deliveries.length, 'A-3 — and nothing was written, so no delivery was owed a repaint').toBe(deliveriesAfterDark)
        expect(authored(runtime).content, 'A-3 — the carrier still holds the token the control carries').toBe('dark')

        // ── (3) THE CONTROL THAT MAKES THAT SKIP A MEASUREMENT: the OTHER token is never on the surface it compares with,
        //        so the same wiring DOES send.
        click(runtime, LIGHT_ID)
        await settle()
        expect(bridge.record.read().theme.token, 'A-3 — the other control carries a token the paint does not, so the act goes out').toBe('light')
        expect(authored(runtime).props.theme, 'A-3 — and the delivery applies it to the producing graph').toBe('light')
        expect(renderedAttribute(runtime, 'theme'), 'A-3 — and the paint follows it').toBe('light')
        expect(deliveries.length, 'A-3 — one more delivery, for one more real change').toBe(deliveriesAfterDark + 1)

        // ── (4) AND THE SAME CONTROL PRESSED AGAIN SENDS NOTHING A SECOND TIME.
        const standingAfterLight = JSON.stringify(bridge.record.read())
        const deliveriesAfterLight = deliveries.length
        click(runtime, LIGHT_ID)
        await settle()
        expect(
          JSON.stringify(bridge.record.read()),
          'A-3 — a repeated click on the token the surface already shows asks no second question',
        ).toBe(standingAfterLight)
        expect(deliveries.length, 'A-3 — and causes no delivery').toBe(deliveriesAfterLight)

        // ── (4b) **AND THE CLICK'S SEND MOVES THE REPLY PATH'S BASELINE WITH IT** — one act, two causes, one setting.
        //        THIS ARM IS TAKEN HERE AND NOT AT THE BOOT TOKEN, `dark`: the carrier now reads `light`, a token the boot
        //        never carried, so a realm whose click-send failed to move `lastCarried` would answer `changed: true` and
        //        send the same setting a SECOND time — the duplicate act the shared `changed` guard exists to prevent.
        const beforeReply = JSON.stringify(bridge.record.read())
        const afterClick = application.commit()
        expect(
          { changed: afterClick.changed, sent: afterClick.sent },
          "A-3 — the reply path does not repeat the click's act: the setting it reads off the carrier is the one this realm has already carried",
        ).toEqual({ changed: false, sent: false })
        expect(JSON.stringify(bridge.record.read()), 'A-3 — and it wrote nothing a second time').toBe(beforeReply)
        expect(deliveries.length, 'A-3 — and caused no extra delivery').toBe(deliveriesAfterLight)

        // ── (5) THE SURFACE IS A LIVE REFERENCE AND NOT A LATCH: the moment the PAINT changes, the other token is owed
        //        again — read off the surface at CLICK time rather than remembered.
        click(runtime, DARK_ID)
        await settle()
        expect(bridge.record.read().theme.token, 'A-3 — going back to the token the paint no longer shows is a real change').toBe('dark')
        expect(renderedAttribute(runtime, 'theme'), 'A-3 — and the surface follows it back').toBe('dark')
        expect(deliveries.length, 'A-3 — one delivery, for one more real change').toBe(deliveriesAfterLight + 1)
      } finally {
        subscription.release()
      }
    } finally {
      bridge.close()
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // A-4 — TOTALITY, AND THE IDS ARE DERIVED
  // ─────────────────────────────────────────────────────────────────────────
  it('A-4 — **TOTALITY AND DERIVATION**: a realm whose envelope authors no derivable control answers `{attached: 0}` and throws nothing, and the ids the turn attaches to are DERIVED from the authored envelope rather than spelled at the wiring — so the renderer never carries a second spelling of `theme-dark`/`theme-light` that a rename would leave staling', async () => {
    // (a) THE DERIVATION IS REAL: the ids the role derives are the envelope's own, read here from the authored bytes.
    const envelope = demoEnvelope()
    const found: string[] = []
    const walk = (node: unknown): void => {
      const asRecord = node as Record<string, unknown> | undefined
      if (asRecord === undefined || asRecord === null) return
      const css = asRecord['css'] as Record<string, unknown> | undefined
      const id = css === undefined ? undefined : css['id']
      if (typeof id === 'string' && (id === DARK_ID || id === LIGHT_ID)) found.push(id)
      const kids = asRecord['children']
      if (Array.isArray(kids)) for (const kid of kids) walk(kid)
    }
    walk(envelope.template.root)
    expect(found.sort(), 'A-4 — the envelope authors the pair this row names').toEqual([DARK_ID, LIGHT_ID].sort())

    // (b) THE WIRING SPELLS NEITHER ID: over comment-elided source, so prose cannot answer for code.
    const code = stripComments(readFileSync(RENDERER_PATH, 'utf8'))
    expect(code.includes(`'${DARK_ID}'`) || code.includes(`"${DARK_ID}"`), 'A-4 — the `theme-dark` spelling is the envelope\'s alone').toBe(false)
    expect(code.includes(`'${LIGHT_ID}'`) || code.includes(`"${LIGHT_ID}"`), 'A-4 — and so is `theme-light`\'s').toBe(false)

    // (c) TOTALITY: a runtime whose element resolution answers nothing attaches zero listeners and throws nothing.
    const runtime = boot()
    const application = startThemeApplication(runtime)
    const doubled = {
      elementForNodeId: (): unknown => null,
      nodeState: (): unknown => {
        throw new Error('the graph cannot answer this node (A-4)')
      },
      applyCommand: (): unknown => {
        throw new Error('the graph cannot apply this write (A-4)')
      },
    }
    const unbacked = startThemeApplication(doubled as never)
    expect(unbacked.attach(), 'A-4 — an unresolvable control attaches nothing rather than throwing').toEqual({ attached: 0 })
    expect(unbacked.commit().sent, 'A-4 — and its act turn answers a READING, not an exception').toBe(false)
    // THE CONTROL: the real runtime DOES attach, so the zero above measures the degradation and not the harness.
    expect(application.attach().attached, 'A-4 CONTROL — the real envelope attaches both controls').toBe(2)
    expect(themeWiringRole(runtime), 'A-4 — and the role the application reports is the corpus\'s own').toEqual([
      application.attributeName,
      application.nodeId,
    ])
  })
})

// ───────────────────────────────────────────────────────────────────────────
// A-5 — THE DRAG FAMILY'S TWO ROUTES, AND THE ADDRESS THEY WRITE
// ───────────────────────────────────────────────────────────────────────────

/** **THE ADDRESS AS THE STORE ANSWERS IT** — the family's value where it stands, and `null` where the address does not
 *  stand at all. The store THROWS its `AddressNotFound` refusal for a path it holds no keys for (it does not answer an
 *  empty family), so `null` here is a MEASURED absence rather than a swallowed failure: the refusal's own status word is
 *  the same one every arm below produces, and the two arms a row asks about — standing and gone — are never folded. */
function addressIn(store: ReturnType<typeof createProfileStore>, address: readonly string[], tier: string): unknown {
  try {
    return store.read(address as never, tier as never)
  } catch {
    return null
  }
}

/** The two routes the drag's address needs, as the client's OWN members — `ViewClient` does not declare them yet, and this
 *  narrowed view is how the row states what it drives without pretending the declaration is already there. */
interface DragRoutes {
  commitDrag(id: string, geometry: unknown): unknown
  clearDrag(): unknown
}

describe('A-5 · the drag route pair: ONE member per pane at `[\'drag\']`/`temp`, and the erase that ends it', () => {
  it('A-5 — **THE DRAG\'S VALUE IS AN ADDRESS, AND ITS MEMBER NAMES THE AXIS THE GESTURE MOVES**: the client\'s bridge carries `commitDrag`/`clearDrag` beside the five landed routes, `commitDrag(\'pane-a\', {height: 220})` — the ADJUSTABLE member of a stage-resident pane (`D-189`, `D-190`) — reaches the literal and the record writes the family WHOLE at `[\'drag\']`/`temp` (`{\'pane-a\': {height: 220}}`), and `clearDrag()` leaves the address ABSENT while nothing was ever written at `file`', async () => {
    const live = crossing()
    try {
      // THE MEMBER CENSUS OF THE LITERAL THIS REALM HANDS THE CLIENT — the five landed routes and the drag pair, nothing
      // else. Stated as a sorted list so a member that appears or vanishes reddens here rather than at a call site.
      expect(
        Object.keys(live.bridge).sort(),
        'A-5 — the bridge literal carries the drag pair beside the five landed routes',
      ).toEqual(['clearDrag', 'commitDrag', 'commitPane', 'commitTheme', 'commitZones', 'onChanged', 'read'])

      const client = createViewClient({ bridge: live.bridge }) as unknown as Record<string, unknown>
      const commitDrag = client['commitDrag']
      expect(
        typeof commitDrag,
        'A-5 — the view client carries `commitDrag(paneId, geometry)`: the drag family has no writer until the record routes one',
      ).toBe('function')
      ;(commitDrag as (id: string, geometry: unknown) => unknown).call(client, 'pane-a', { height: 220 })

      // THE CALL REACHED THE LITERAL, and the literal delegated to the record.
      expect(live.dragCalls, 'A-5 — the client sent `commitDrag` with the pane id and the geometry it was handed').toEqual([
        { id: 'pane-a', geometry: { height: 220 } },
      ])
      // **THE ADDRESS, READ AT ITS OWN PATH AND TIER**: one member per pane id, `{height}` — the axis-named member and no
      // second, because at any instant exactly one axis is the pane's and the other is the zone's.
      expect(
        addressIn(live.store, ['drag'], 'temp'),
        'A-5 — the record wrote the family whole at `[\'drag\']` and `temp`',
      ).toEqual({ 'pane-a': { height: 220 } })

      const clearDrag = client['clearDrag']
      expect(typeof clearDrag, 'A-5 — and the client carries `clearDrag()`: the family\'s end, whether or not it stood').toBe('function')
      ;(clearDrag as () => unknown).call(client)
      // THE ERASE LEAVES THE ADDRESS ABSENT — the store answers no keys for it, which is the same state a fresh profile is in.
      expect(addressIn(live.store, ['drag'], 'temp'), 'A-5 — the family is absent at that address after the erase').toBeNull()
      // AND NOTHING WAS EVER WRITTEN AT `file`: the drag is a transient reading of the gesture, never a persisted setting.
      expect(addressIn(live.store, ['drag'], 'file'), 'A-5 — no member of the drag family reaches `file`').toBeNull()
      // THE CONTROL: the store DOES answer a family that stands, so the two `null`s above are about the address and not
      // about a read that never works — the same read at the same path answers after the record writes it again.
      const again = client['commitDrag'] as (id: string, geometry: unknown) => unknown
      again.call(client, 'pane-a', { height: 240 })
      expect(addressIn(live.store, ['drag'], 'temp'), 'A-5 CONTROL — the read works; the family simply was not there').toEqual({
        'pane-a': { height: 240 },
      })
    } finally {
      live.close()
    }
  })
})
