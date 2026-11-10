// tests/integration/overlay-application.test.ts — **THE OVERLAY'S CONSUMER, DRIVEN** (`D-113`).
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked-file` marker and GATES (`D-40`, `AGENTS.md`).
//
// THE RULING THIS FILE ANSWERS, VERBATIM: **"The overlay is used to contain UI elements that should block general app
// access while open, ex. security tools and other configuration settings"**. `src/shared/overlay.ts` has carried the
// mechanism since the gate corpus and had NO CONSUMER; `D-96` stopped on exactly that and `strata/pending.md` row `5`
// carried the stop. `D-113` authors the surface (the envelope's overlay layer) and wires the consumer
// (`startOverlayApplication`), so the mechanism has one in-tree caller and the blocker is gone.
//
// WHAT THIS FILE IS AND IS NOT. It is the WIRING's battery, not the mechanism's: the four-state machine's own 69 rows are
// `tests/overlay.test.ts`'s and the register is `tests/store-modules-seams.test.ts`'s. What is driven here is the
// CONSUMER — the turn that reads the authored verb token, hands it to `overlayTransition`, and applies
// `overlayInertDeclaration`'s answer as ONE `state-slice` on the AUTHORED app root.
//
// THE ROWS, each able to fail:
//   · OV-1  the transition machine driven through all four verbs, and the four-state set closed.
//   · OV-2  the `escape` verb invokes the caller's callback once and ABSORBS its throw.
//   · OV-3  the inert declaration: `{name, value, removal, target}`, the strict-boolean set arm and the removal arm.
//   · OV-4  **the authored surface is a provident node** — `renderedHtml` shows the dialog and the attribute lands on the
//           AUTHORED app root; the POSITIVE CONTROL is a hand-written element, which the graph cannot address.
//   · OV-5  the Security pane and the Settings surface are inside the dialog and OUTSIDE the inert root.
//   · OV-6  **nothing else moves** — construction writes no byte, and the appearance declaration is not the overlay's.
//   · OV-7  the drive through the producing graph: the authored opener opens, the authored close control closes.
//   · OV-8  **what the inert root measurably does and does not block on the app's own dispatch path** — measured, not
//           claimed: `provident.dispatch` still reaches a node under the inert root, and `inert` is absent from the
//           dispatch path's code.
//   · OV-9  the gesture session's commit route is untouched by the declaration, and neither mechanism names `inert`.
//   · OV-10 no hand-written DOM, no stamped attribute, no injected CSS in the consumer — and ONE spelling of the name.
//   · OV-11 **THE AUTHORED `css` CARRIES THE LAYER'S GEOMETRY** (`D-120`): the scrim a full-viewport backdrop, the dialog
//           a centred card, read off the authored provident nodes rather than the stylesheet, with a control object that
//           omits `position` failing the same predicate.
//   · OV-12 **THE GEOMETRY REACHES THE DOM AND VISIBILITY IS THE MECHANISM'S ALONE** (`D-120`): the rendered dialog tag
//           carries the declarations, neither authored style claims a `display`, and the page sheet's one key is the
//           `inert` attribute the consumer applies — with the control that a key on another attribute is not that key.
//
// A node-suite green is ENVELOPE-green and never app-green (`AGENTS.md` § "non-negotiables"): every row below runs under
// the layout-less DOM shim, and the LIVE instruments are `npm run ui`'s overlay row, `npm run divergence` and the app.

import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { Runtime } from '../../src/renderer/runtime.js'
import {
  demoEnvelope,
  APP_ROOT_ID,
  OVERLAY_CLOSE_ID,
  OVERLAY_DIALOG_ID,
  OVERLAY_OPEN_ID,
  OVERLAY_SCRIM_ID,
  OVERLAY_SECURITY_PANE_ID,
  OVERLAY_SETTINGS_SURFACE_ID,
  OVERLAY_STATE_ID,
} from '../../src/shared/demo-envelope.js'
import { installShim, mountEl } from '../../src/shared/dom-shim.js'
import { overlayTransition, overlayInertDeclaration } from '../../src/shared/overlay.js'
import { startOverlayApplication, overlayWiringRole, type OverlayApplication } from '../../src/renderer/renderer.js'

const REPO_ROOT = fileURLToPath(new URL('../..', import.meta.url))
const CONSUMER_PATH = `${REPO_ROOT}/src/renderer/renderer.ts`
const ENVELOPE_PATH = `${REPO_ROOT}/src/shared/demo-envelope.ts`
const MECHANISM_PATH = `${REPO_ROOT}/src/shared/overlay.ts`

/** Comment lines and block comments elided, so a presence/absence assertion reads CODE and never prose. */
function codeOf(text: string): string {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .map((line) => line.replace(/\s\/\/.*$/, ''))
    .join('\n')
}

/** The consumer's own region: from `overlayWiringRole`'s docblock to the end of `startOverlayApplication`. */
function consumerRegion(): string {
  const code = codeOf(readFileSync(CONSUMER_PATH, 'utf8'))
  const start = code.indexOf('export function overlayWiringRole')
  const marker = 'export function startOverlayApplication'
  const from = start >= 0 ? start : code.indexOf(marker)
  const at = code.indexOf(marker)
  if (at < 0) return ''
  let depth = 0
  let i = code.indexOf('{', at)
  const begin = i
  for (; i < code.length; i += 1) {
    if (code[i] === '{') depth += 1
    else if (code[i] === '}') {
      depth -= 1
      if (depth === 0) return code.slice(from < 0 ? begin : from, i + 1)
    }
  }
  return ''
}

/** The authored envelope, walked as DATA (the `themeWiringRole` form): every node with its ancestor chain. */
interface WalkedNode {
  readonly node: Record<string, unknown>
  readonly ancestors: readonly Record<string, unknown>[]
}
function walkEnvelope(): readonly WalkedNode[] {
  const out: WalkedNode[] = []
  const root = demoEnvelope().template.root as unknown as Record<string, unknown>
  const queue: Array<{ node: Record<string, unknown>; ancestors: Record<string, unknown>[] }> = [{ node: root, ancestors: [] }]
  while (queue.length > 0) {
    const entry = queue.shift() as { node: Record<string, unknown>; ancestors: Record<string, unknown>[] }
    out.push({ node: entry.node, ancestors: entry.ancestors })
    const kids = entry.node['children']
    if (!Array.isArray(kids)) continue
    for (const kid of kids as Record<string, unknown>[]) {
      queue.push({ node: kid, ancestors: [...entry.ancestors, entry.node] })
    }
  }
  return out
}

/** A node's authored `props.id`, or `null`. */
function propsIdOf(node: Record<string, unknown>): string | null {
  const props = node['props'] as Record<string, unknown> | undefined
  const id = props === undefined ? undefined : props['id']
  return typeof id === 'string' ? id : null
}

function nodeById(id: string): WalkedNode | null {
  return walkEnvelope().find((entry) => propsIdOf(entry.node) === id) ?? null
}

/** **THE STORE'S STAND-IN — A CROSSING THE WIRING READS AND WRITES, AND THE FILE'S WHOLE INSTRUMENT** (`D-125`). It holds the
 *  two things the real crossing holds and nothing else: the LAST DELIVERED WORD (`open()`, the store's) and the ONE WRITE
 *  (`write(open)`, the act's, recorded and answered by nothing). `deliver()` is the STORE'S OWN TURN: it changes the word
 *  and runs the wiring's `render()`, which is the only way a pane appears in this file. So every row below can tell an ASK
 *  from an OUTCOME, and a wiring that opened the pane from what it asked for would redden here rather than pass. */
interface RealmCrossing {
  open(): boolean | null
  write(open: boolean): void
}
interface Realm {
  readonly runtime: Runtime
  readonly mount: unknown
  readonly app: OverlayApplication
  /** Every boolean the act asked the store for, in order: the ASK, never the outcome. */
  readonly asks: boolean[]
  /** **THE STORE'S TURN** — the word arrives. It renders NOTHING by itself: the render is the wiring's own turn, and every
   *  row below calls `app.render()` explicitly so the two halves of the chain are separately observable. */
  deliver(open: boolean): void
}
function realm(): Realm {
  const mount = mountEl()
  const runtime = new Runtime({ mount: mount as never, envelope: demoEnvelope() as never })
  runtime.bootstrap()
  const asks: boolean[] = []
  let delivered: boolean | null = null
  const pane: RealmCrossing = {
    open: () => delivered,
    write: (open: boolean) => { asks.push(open) },
  }
  const app = startOverlayApplication(runtime, { pane })
  return {
    runtime,
    mount,
    app,
    asks,
    deliver: (open: boolean) => { delivered = open },
  }
}

/** The rendered HTML of the app graph — what `provident.get_rendered_html` answers. */
function htmlOf(runtime: Runtime): string {
  return runtime.renderedHtmlResult().renderedHtml
}

/** The TEXT CONTENT of the element carrying `props.id`, read out of the rendered HTML — the reading
 *  `provident.get_rendered_html` answers and `provident.get_node_state` is asked for. */
function textOf(html: string, id: string): string {
  const at = html.indexOf(`id="${id}"`)
  if (at < 0) return ''
  const open = html.indexOf('>', at)
  const close = html.indexOf('<', open + 1)
  return open < 0 || close < 0 ? '' : html.slice(open + 1, close)
}

/** The opening tag of the element carrying `props.id`, read out of the rendered HTML. */
function tagOf(html: string, id: string): string {
  const at = html.indexOf(`id="${id}"`)
  if (at < 0) return ''
  const open = html.lastIndexOf('<', at)
  const close = html.indexOf('>', at)
  return open < 0 || close < 0 ? '' : html.slice(open, close + 1)
}

beforeAll(() => {
  installShim()
})

describe('overlay · THE CONSUMER (`D-113`) — the mechanism applied as provident data', () => {
  it('OV-1 · **THE ACT ASKS AND THE DELIVERY ANSWERS** — `open`/`close`/`toggle`/`escape` each become ONE write at the store, the wiring\'s own word does not move until the store delivers, and a verb asking for the state the store already reports is no write at all (`D-125`, re-deriving `D-113`)', () => {
    const { app, asks, deliver } = realm()
    // THE WIRING'S WORD BEFORE ANYTHING: nothing has been delivered, so the pane stands closed — the `mem` record's own
    // minted value, never a state this realm invented.
    expect(app.state(), 'no delivery yet, so the wiring holds the crossing’s closed word').toBe('closed')

    // (1) THE OPEN ACT — one ask, and NOTHING moves until the store answers.
    const opened = app.apply('open')
    expect(asks, '`open` asks the store for ONE thing: a boolean at the pane’s address').toEqual([true])
    expect({ asked: opened.asked, wrote: opened.wrote }, 'and the reading says so, in the act’s own members').toEqual({ asked: true, wrote: true })
    expect(opened.changed, 'the act does NOT move the wiring’s word — the render has not happened and cannot').toBe(false)
    expect(app.state(), 'so the pane still stands closed after the ask: NO LOCAL MACHINE MOVES FIRST').toBe('closed')
    // (2) THE STORE'S TURN — the delivery, and only now is the pane up.
    deliver(true)
    app.render()
    expect(app.state(), 'the delivery is what opens the pane').toBe('open')
    // (3) A SECOND `open` ASKS FOR THE STATE THE STORE ALREADY REPORTS: the mechanism answers `changed:false`, and this
    //     wiring makes no write — a write with no external cause behind it is the `D-82` clause-4 fault.
    const again = app.apply('open')
    expect({ asked: again.asked, wrote: again.wrote }, 'an `open` over an open pane is NO WRITE').toEqual({ asked: null, wrote: false })
    expect(asks, 'and the ask log proves it: unchanged').toEqual([true])
    // (4) THE CLOSE ACT, the transient, and the delivery that ends it.
    const closing = app.apply('close')
    expect(asks, '`close` asks for the other boolean').toEqual([true, false])
    expect(closing.state, 'and while that write is in flight the wiring holds its ONE transient — a pane up and on its way out').toBe('closing')
    expect(closing.changed, 'which is not a render and is not a move of the store’s word').toBe(false)
    deliver(false)
    app.render()
    expect(app.state(), 'the delivery closes it, and the transient is over').toBe('closed')
    // (5) `toggle` AND `escape` THROUGH THE SAME ROUTE: `toggle` asks for the opposite of the STORE's word, `escape` asks for
    //     closed and hands the mechanism the caller callback (OV-2 drives the callback itself).
    deliver(false)
    app.render()
    const toggled = app.apply('toggle')
    expect(toggled.asked, '`toggle` from a closed store asks for open').toBe(true)
    deliver(true)
    app.render()
    expect(app.state()).toBe('open')
    const escaped = app.apply('escape')
    expect({ asked: escaped.asked, wrote: escaped.wrote }, '`escape` from an open store asks for closed').toEqual({ asked: false, wrote: true })
    deliver(false)
    app.render()
    expect(app.state(), 'and the store closes it').toBe('closed')
    // (6) THE FOUR-STATE SET IS CLOSED AND ONLY TWO OF ITS MEMBERS ARE THE STORE'S: `open`/`closed` are derived from the
    //     crossing, and `held`/`closing` are the mechanism's transients — `closing` produced by this wiring above, `held` a
    //     member of the set that this app produces nowhere (a pane is up when the store says so, so "up but unconfirmed"
    //     names no state here).
    expect(overlayTransition('held', 'open').state, '`held` × `open` stays `held` — the mechanism’s own cell, unmoved').toBe('held')
    expect(overlayTransition('closing', 'toggle').state, '`closing` × `toggle` opens').toBe('open')
    const seen = new Set([app.state(), 'held', 'closing', 'open'])
    expect([...seen].sort(), 'every word the consumer can hold is one of the machine’s own four').toEqual(['closed', 'closing', 'held', 'open'])
  })

  it('OV-2 · the `escape` verb INVOKES the caller’s callback once and ABSORBS its throw — the transition still lands, and the consumer reports the invocation', () => {
    let calls = 0
    const r = overlayTransition('open', 'escape', () => {
      calls += 1
    })
    expect(r.state, '`escape` closes').toBe('closed')
    expect(r.changed).toBe(true)
    expect(calls, 'the callback is invoked EXACTLY once').toBe(1)

    // A HOSTILE CALLBACK IS ABSORBED, and the transition still lands: nothing escapes `overlayTransition` (the
    // mechanism's own totality, `overlay.md` `M-9`), which is what makes the consumer's turn total.
    let thrown = ''
    try {
      const hostile = overlayTransition('open', 'escape', () => {
        throw new Error('the escape callback throws')
      })
      expect(hostile.state, 'the throw does not stop the move').toBe('closed')
      expect(hostile.changed).toBe(true)
    } catch (error) {
      thrown = String(error)
    }
    expect(thrown, 'nothing escapes the mechanism’s escape arm').toBe('')

    // AND THE CONSUMER SURVIVES THE SAME ARM: the callback it supplies is a graph read plus a `focus()` call, both
    // total, so an `escape` driven through `apply` answers a reading and never an exception.
    const { app } = realm()
    app.apply('open')
    const escaped = app.apply('escape')
    expect(escaped.state).toBe('closed')
    expect(escaped.escaped, 'the consumer reports that the mechanism invoked its callback').toBe(true)
  })

  it('OV-3 · the INERT DECLARATION — `{name, value, removal, target}`, the strict-boolean set arm and the REMOVAL arm, with the caller’s name echoed BY IDENTITY', () => {
    const up = overlayInertDeclaration({ tag: 'app-root' }, 'inert', true)
    expect(up, 'the `inert === true` arm is the SET arm').toEqual({ name: 'inert', value: 'true', removal: false, target: { tag: 'app-root' } })
    expect(up.value, 'the value is the string `"true"`, which is the attribute the engine emits').toBe('true')
    expect(up.removal, 'and the set arm removes nothing').toBe(false)

    for (const notTrue of [false, 'true', 1, null, undefined, {}, []]) {
      const down = overlayInertDeclaration('target', 'inert', notTrue)
      expect(down, `every input that is not the strict boolean \`true\` answers the REMOVAL arm (${String(notTrue)})`).toEqual({ name: 'inert', value: false, removal: true, target: 'target' })
      expect(down.removal, 'the removal arm is `removal: true` and never an empty value').toBe(true)
    }
    // THE TARGET IS ECHOED BY IDENTITY AND READ BY NOTHING.
    const target = { readonly: 'element' }
    expect(overlayInertDeclaration(target, 'inert', true).target, 'the target rides through by identity').toBe(target)
    // THE ATTRIBUTE NAME IS THE CALLER’S: a different name is echoed, never corrected to `inert`.
    expect(overlayInertDeclaration(null, 'aria-hidden', true).name, 'the mechanism owns NO attribute name').toBe('aria-hidden')
    expect(overlayInertDeclaration(null, '', true).name, 'the empty string is the declared `null`').toBe(null)

    // AND THE CONSUMER SPELLS THE NAME THE CALLER HOLDS, not a second literal: the role's `attributeName` is what the
    // declaration carries on both arms.
    const role = overlayWiringRole()
    expect(role.attributeName, 'the caller’s name is `inert` — held ONCE, in the role').toBe('inert')
    const { app, deliver } = realm()
    expect(app.attributeName, 'the application carries that one spelling').toBe(role.attributeName)
    // THE DECLARATION IS THE DELIVERY'S PRODUCT (`D-125`): the act writes the store and produces NO declaration at all.
    const asked = app.apply('open')
    expect(asked.declaration, 'the ACT declares nothing — it asks the store and waits').toBe(null)
    deliver(true)
    const open = app.render()
    expect(open.declaration, 'the OPEN declaration is the set arm, and it arrives on the render').toEqual({ name: role.attributeName, value: 'true', removal: false })
    deliver(false)
    const close = app.render()
    expect(close.declaration, 'the CLOSE declaration is the removal arm').toEqual({ name: role.attributeName, value: false, removal: true })
  })

  it('OV-4 · **THE AUTHORED SURFACE IS A PROVIDENT NODE** — `get_rendered_html` shows the dialog and the attribute lands on the AUTHORED app root; a hand-written element is the POSITIVE CONTROL and the graph cannot address it', async () => {
    const { runtime, mount, app, deliver } = realm()
    const before = htmlOf(runtime)
    expect(before, 'the CLOSED surface: the authored app root carries no `inert` attribute').not.toContain('inert')

    app.apply('open')
    deliver(true)
    const open = app.render()
    expect(open.written, 'the declaration LANDED on the delivery: the runtime answered `applied`').toBe(true)
    expect(open.status).toBe('applied')

    const html = htmlOf(runtime)
    // THE DIALOG IS A PROVIDENT NODE AND IS VISIBLE TO THE RENDERED-HTML SURFACE.
    expect(html, '`get_rendered_html` shows the authored dialog').toContain(OVERLAY_DIALOG_ID)
    expect(html, 'and its authored closing control').toContain(OVERLAY_CLOSE_ID)
    // THE ATTRIBUTE LANDS ON THE APP ROOT AND NOWHERE ELSE.
    expect(tagOf(html, APP_ROOT_ID), 'the AUTHORED app root carries the attribute the mechanism named').toMatch(/\binert\b/)
    // **THE SPELLING IS THE REALM'S, AND THAT IS MEASURED RATHER THAN ASSUMED.** Under this layout-less DOM shim the
    // declaration's `value: 'true'` renders as `inert="true"`; the REAL `DomAdapter` renders the same declaration as the
    // BOOLEAN attribute `inert=""` — measured at the boundary by `npm run ui`'s `OV-1` row, which reads
    // `<div … id="app-surface" … inert="">` out of the live renderer. Both are the attribute PRESENT and the semantics the
    // mechanism declares; this row pins the shim's spelling and records the other beside it, so neither realm's reading is
    // mistaken for the other's.
    expect(tagOf(html, APP_ROOT_ID), 'and it carries the VALUE the declaration produced, as this shim spells it').toMatch(/inert="true"/)
    expect(tagOf(html, OVERLAY_DIALOG_ID), 'the dialog does NOT: it is a SIBLING of the root, so the modal stays operable').not.toMatch(/\binert\b/)
    expect(tagOf(html, OVERLAY_SCRIM_ID), 'nor does the scrim').not.toMatch(/\binert\b/)

    // IT IS THE GRAPH’S ELEMENT, NOT A STAMPED ONE: the runtime resolves it, and its registry lists the authored ids.
    const ids = runtime.listTargets().nodes.flatMap((n) => [n.cssId, n.propsId]).filter((id): id is string => typeof id === 'string')
    for (const id of [APP_ROOT_ID, OVERLAY_OPEN_ID, OVERLAY_CLOSE_ID, OVERLAY_DIALOG_ID, OVERLAY_SCRIM_ID, OVERLAY_STATE_ID]) {
      expect(ids, `\`list_targets\` resolves the authored node \`${id}\``).toContain(id)
    }

    // ── THE POSITIVE CONTROL ────────────────────────────────────────────────────────────────────────────────────────
    // A HAND-WRITTEN element is what the project-wide constraint forbids, and it is exactly what this row can measure:
    // it carries no `data-node-id`, the runtime's registry does not list it, and `provident.dispatch` cannot address it.
    const handWritten = (mount as { appendChild?: unknown }).appendChild as unknown
    expect(typeof handWritten, 'the shim mount can take a hand-written child, so the control is a real drive').toBe('function')
    const created = (globalThis as unknown as { document: { createElement(tag: string): unknown } }).document.createElement('div')
    ;(created as { setAttribute(name: string, value: string): void }).setAttribute('id', 'hand-written-control')
    ;(mount as { appendChild(node: unknown): void }).appendChild(created)
    const after = runtime.listTargets().nodes.flatMap((n) => [n.cssId, n.propsId])
    expect(after, 'the hand-written element is INVISIBLE to the graph (`list_targets`) — the control fails, which is the point')
      .not.toContain('hand-written-control')
    const dispatched = runtime.dispatch({ target: { kind: 'cssId', cssId: 'hand-written-control' }, event: 'click' })
    await expect(dispatched, 'and `provident.dispatch` cannot reach it either').rejects.toThrow(/unresolved target/)
  })

  it('OV-5 · the SECURITY pane and the SETTINGS surface are INSIDE the dialog when it is open — and OUTSIDE the inert root, which is what makes the modal usable at all', () => {
    const dialog = nodeById(OVERLAY_DIALOG_ID)
    expect(dialog, 'the dialog is an authored node').not.toBeNull()
    const insideDialog = (dialog as WalkedNode).node['children']
    expect(Array.isArray(insideDialog), 'and it has authored children').toBe(true)
    const ids = walkEnvelope()
      .filter((entry) => (entry.ancestors as readonly Record<string, unknown>[]).some((ancestor) => propsIdOf(ancestor) === OVERLAY_DIALOG_ID))
      .map((entry) => propsIdOf(entry.node))
      .filter((id): id is string => id !== null)
    expect(ids, 'the Security pane is authored INSIDE the dialog').toContain(OVERLAY_SECURITY_PANE_ID)
    expect(ids, 'the Settings surface is authored INSIDE the dialog').toContain(OVERLAY_SETTINGS_SURFACE_ID)
    expect(ids, 'and the close control is, because an inert subtree could not close the overlay').toContain(OVERLAY_CLOSE_ID)

    // AND NEITHER IS INSIDE THE INERT ROOT: the dialog is the app root's SIBLING in the authored tree, which is why the
    // modal's own controls stay operable while the app behind it is inert. This is the design, not an accident.
    const inAppRoot = walkEnvelope()
      .filter((entry) => entry.ancestors.some((ancestor) => propsIdOf(ancestor) === APP_ROOT_ID) || propsIdOf(entry.node) === APP_ROOT_ID)
      .map((entry) => propsIdOf(entry.node))
      .filter((id): id is string => id !== null)
    expect(inAppRoot, 'the dialog is NOT in the inert subtree').not.toContain(OVERLAY_DIALOG_ID)
    expect(inAppRoot, 'nor is the Security pane').not.toContain(OVERLAY_SECURITY_PANE_ID)
    expect(inAppRoot, 'nor the Settings surface').not.toContain(OVERLAY_SETTINGS_SURFACE_ID)
    // THE OPENER, ON THE OTHER HAND, IS IN IT — deliberately: while the overlay is open it is inert, and the operator
    // does not get a second way in behind the modal.
    expect(inAppRoot, 'the opener is inside it, so an open overlay cannot be reopened from behind').toContain(OVERLAY_OPEN_ID)
  })

  it('OV-6 · **NOTHING ELSE MOVES** — construction writes no byte, `attach()` installs listeners and changes no node, and the appearance declaration is not the overlay’s', () => {
    const mount = mountEl()
    const runtime = new Runtime({ mount: mount as never, envelope: demoEnvelope() as never })
    runtime.bootstrap()
    const before = htmlOf(runtime)
    const census = runtime.renderedHtmlResult().census
    const app = startOverlayApplication(runtime)
    const attached = app.attach()
    expect(attached.attached, 'the wiring attached its listeners to the authored controls').toBeGreaterThan(0)
    expect(htmlOf(runtime), 'the rendered surface is BYTE-IDENTICAL across construction and attach — a boot declares nothing').toBe(before)
    expect(runtime.renderedHtmlResult().census, 'and the graph census is unmoved').toEqual(census)
    expect(app.state(), 'the machine stands `closed`').toBe('closed')

    // THE APPEARANCE DECLARATION IS A DIFFERENT FAMILY AND THIS PASS DOES NOT WRITE IT: over the closed overlay the
    // authored appearance carrier still holds its authored token, and no `theme` attribute has appeared anywhere.
    const setting = runtime.listTargets().nodes.find((n) => n.propsId === 'theme-setting')
    expect(setting, 'the authored appearance carrier still resolves').toBeTruthy()
    expect(htmlOf(runtime), 'the overlay writes no `theme` attribute').not.toMatch(/\btheme="/)
    // THE RECORD'S TWO TERMINAL PAGES AND THE GUTTER'S THREE NODES ARE UNMOVED AND STILL RESOLVE.
    const ids = runtime.listTargets().nodes.flatMap((n) => [n.cssId, n.propsId])
    for (const id of ['tabs-landing-page', 'tabs-error-page', 'gutter-vertical', 'gutter-target', 'gutter-status', 'counter', 'echo-input']) {
      expect(ids, `the authored node \`${id}\` still resolves while the overlay is closed`).toContain(id)
    }
  })

  it('OV-7 · the DRIVE THROUGH THE PRODUCING GRAPH — the authored opener READS THE STATE THE DELIVERY MIRRORED and writes the TARGET, the wiring writes the store, and **A REPEATED DISPATCH AT THE SAME CONTROL RESOLVES THE OTHER TARGET INSTEAD OF BEING DROPPED** (`D-131`, closing `D-126`\'s finding `F2`)', async () => {
    const { runtime, app, deliver } = realm()
    const dispatchAt = (cssId: string) => runtime.dispatch({ target: { kind: 'cssId', cssId }, event: 'click' })
    const carrier = () => textOf(htmlOf(runtime), OVERLAY_STATE_ID)
    const stateNode = () => (runtime.listTargets().nodes.find((n) => n.propsId === OVERLAY_STATE_ID) as { nodeId: string }).nodeId

    // 1 — THE FIRST ACT. The body reads the carrier (authored `closed`) and writes the TARGET, not a verb.
    const first = await dispatchAt(OVERLAY_OPEN_ID)
    expect(first.dirtied, 'the authored opener’s body RAN: the dispatch reports the node it dirtied').toContain(stateNode())
    expect(carrier(), 'the carrier holds the TARGET the click asked for, RESOLVED from the state it read').toBe('open')
    const driven = app.drive()
    expect(driven.verb, 'the turn consumed the target the graph holds').toBe('open')
    expect({ asked: driven.asked, wrote: driven.wrote }, 'and it became ONE write at the pane’s address').toEqual({ asked: true, wrote: true })
    expect(driven.state, 'the wiring’s word did not move: the store has not answered').toBe('closed')
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'so `get_rendered_html` still shows a surface with no key').not.toMatch(/\binert\b/)
    deliver(true)
    const rendered = app.render()
    expect(rendered.written, 'and the inert declaration lands on the authored app root').toBe(true)
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'which `get_rendered_html` now shows').toMatch(/inert="true"/)
    // **THE MIRROR**: the DELIVERY wrote the store's own word into the carrier — that is what makes the next read a read
    // of the STATE rather than of whoever clicked last.
    expect(carrier(), 'the delivery mirrored the store’s word into the carrier').toBe('open')
    // A SECOND `drive()` ON AN UNMOVED CARRIER IS NOT AN ACT.
    const again = app.drive()
    expect(again.wrote, 'an unmoved carrier writes nothing').toBe(false)

    // 2 — **THE ARM `F2` WAS ABOUT**: the SAME control, dispatched again, with the pane open.
    await dispatchAt(OVERLAY_OPEN_ID)
    expect(
      carrier(),
      'the SAME opener now asks for the OTHER target, because it read the state the delivery mirrored — before `D-131` it wrote `toggle` again here and the `changed` guard dropped the act, leaving the pane open',
    ).toBe('close')
    const closingAsk = app.drive()
    expect(closingAsk.verb).toBe('close')
    expect({ asked: closingAsk.asked, wrote: closingAsk.wrote }, 'so the repeat is ONE write of the other boolean').toEqual({ asked: false, wrote: true })
    expect(closingAsk.state, 'and the wiring holds its transient while the write is in flight').toBe('closing')
    deliver(false)
    const closed = app.render()
    expect(closed.state).toBe('closed')
    expect(closed.written).toBe(true)
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'the REMOVAL arm took the attribute back off the authored app root').not.toMatch(/\binert\b/)
    expect(carrier(), 'and the mirror now holds the closed state').toBe('closed')

    // 3 — THE CLOSE CONTROL, ON A PANE THE STORE REPORTS CLOSED: the body still writes its target, and the MECHANISM is
    // what refuses the act — a close on a closed pane is `changed: false`, which is `D-82` clause 4 kept at its own seat.
    await dispatchAt(OVERLAY_CLOSE_ID)
    const nothingToDo = app.drive()
    // `asked` is `null` and not `false`: the mechanism's no-act arm reports that NO ASK WAS MADE, which is a different
    // statement from an ask that resolved to `false`.
    expect({ asked: nothingToDo.asked, wrote: nothingToDo.wrote }, 'a close on a closed pane asks nothing and writes nothing').toEqual({ asked: null, wrote: false })

    // 4 — AND THE CLOSE CONTROL DOES REVERSE AN OPEN PANE: the same control, one state away from the one above.
    await dispatchAt(OVERLAY_OPEN_ID)
    app.drive()
    deliver(true)
    app.render()
    await dispatchAt(OVERLAY_CLOSE_ID)
    const reversing = app.drive()
    expect(reversing.verb, 'the close control’s own target').toBe('close')
    expect({ asked: reversing.asked, wrote: reversing.wrote }, 'and it becomes ONE write of the other boolean').toEqual({ asked: false, wrote: true })
  })

  it('OV-8 · **WHAT THE INERT ROOT DOES AND DOES NOT BLOCK, MEASURED** — the app’s own `provident.dispatch` STILL reaches nodes under it, and no code on that path consults `inert` at all', () => {
    const { runtime, app, deliver } = realm()
    app.apply('open')
    deliver(true)
    app.render()
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'the root IS inert for this measurement').toMatch(/inert="true"/)
    // THE MEASUREMENT: a node UNDER the inert root — the counter's increment control — is dispatched with the overlay
    // open, and it still runs. `inert` is a RENDERED-DOM semantic; the MCP dispatch path resolves a node id in the
    // producing graph and never consults a browser's focus, pointer or tab model.
    return runtime
      .dispatch({ target: { kind: 'cssId', cssId: 'inc' }, event: 'click' })
      .then((result) => {
        const counter = runtime.listTargets().nodes.find((n) => n.propsId === 'counter')
        expect(counter, 'the counter node still resolves').toBeTruthy()
        expect(result.dirtied, '`provident.dispatch` reaches the control UNDER the inert root').toContain((counter as { nodeId: string }).nodeId)
        expect(textOf(htmlOf(runtime), 'counter'), 'AND THE VALUE MOVED: the write landed under an inert root').toBe('1')
        // `list_targets` is likewise unmoved: the inert declaration removes nothing from the graph.
        expect(runtime.listTargets().nodes.find((n) => n.propsId === 'counter'), 'the node is still listed').toBeTruthy()
        // THE CENSUS HALF: the word `inert` appears NOWHERE on the dispatch path's code — not in the runtime, not in the
        // MCP tool map. So "the overlay blocks general app access" is TRUE of the rendered DOM and FALSE of the MCP
        // surface, and this row states both halves rather than the flattering one.
        for (const path of [`${REPO_ROOT}/src/renderer/runtime.ts`, `${REPO_ROOT}/src/main/mcp-server.ts`]) {
          const code = codeOf(readFileSync(path, 'utf8'))
          expect(/\binert\b/.test(code), `${path} consults no \`inert\` on the dispatch path`).toBe(false)
        }
      })
  })

  it('OV-9 · the GESTURE SESSION and the PANE DRAG are untouched by the declaration — the commit route still applies under an inert root, and neither mechanism names `inert`', () => {
    const { runtime, app, deliver } = realm()
    app.apply('open')
    deliver(true)
    app.render()
    // THE COMMIT ROUTE the drag's end turn uses is ONE `commitPane` on `['panes']` at `file`, across the crossing — NOT a
    // `state-slice` on the status node: `D-164` DELETED that sink write, and the read-out beside it is `renderPaneSize`'s,
    // painted from the delivery (`F3`, `D-129`). The `state-slice` below is this row's OWN direct write of the node, and
    // under an inert root it still applies, because it is a graph write and the graph has no idea what the DOM is doing.
    const answer = runtime.applyCommand({
      kind: 'state-slice',
      node: 'gutter-status',
      mutation: [{ targetProp: 'content', mode: 'replace', value: '140' }],
    })
    expect(answer.status, 'the drag’s commit route still lands while the app root is inert').toBe('applied')
    expect(textOf(htmlOf(runtime), 'gutter-status'), 'and the authored status node carries the clamped value').toBe('140')
    // AND THE MECHANISMS DO NOT KNOW THE WORD: the gesture session, the affordance and the relocate/candidate families
    // carry no `inert` token in CODE, so nothing in them could branch on the overlay even if it wanted to.
    for (const path of [
      `${REPO_ROOT}/src/shared/gesture-session.ts`,
      `${REPO_ROOT}/src/shared/gutter-affordance.ts`,
      `${REPO_ROOT}/src/shared/relocate.ts`,
    ]) {
      expect(/\binert\b/.test(codeOf(readFileSync(path, 'utf8'))), `${path} names no \`inert\``).toBe(false)
    }
  })

  it('OV-10 · NO hand-written DOM, NO stamped attribute, NO injected CSS — and the attribute NAME is spelled in exactly ONE place in this tree', () => {
    const region = consumerRegion()
    expect(region.length, 'the consumer’s region was located, so the census below reads the code it claims to').toBeGreaterThan(200)
    for (const forbidden of ['createElement', 'appendChild', 'insertAdjacentHTML', 'innerHTML', 'setAttribute', 'removeAttribute', 'document.body', 'styleSheets', 'insertRule']) {
      expect(region.includes(forbidden), `the consumer contains no \`${forbidden}\``).toBe(false)
    }
    // THE ONE SPELLING OF THE NAME: the mechanism owns none (its bytes carry no attribute name at all), the envelope
    // carries none, and the consumer's role carries exactly one.
    expect(codeOf(readFileSync(MECHANISM_PATH, 'utf8')).includes("'inert'"), '`src/shared/overlay.ts` owns NO attribute name').toBe(false)
    const consumerCode = codeOf(readFileSync(CONSUMER_PATH, 'utf8'))
    const spellings = consumerCode.match(/'inert'/g) ?? []
    expect(spellings.length, 'the consumer spells the name ONCE — the role’s `attributeName`, and nowhere else').toBe(1)
    // and the envelope spells the name not at all: the declaration's name is never authored as data either.
    expect(codeOf(readFileSync(ENVELOPE_PATH, 'utf8')).includes("'inert'"), 'the authored envelope spells no attribute name').toBe(false)
    // THE AUTHORED NODES ARE DATA: the envelope's overlay layer is a node tree with handler-STRING bodies, never markup.
    const envelopeCode = codeOf(readFileSync(ENVELOPE_PATH, 'utf8'))
    expect(envelopeCode.includes('createElement'), 'the envelope authors no element by hand').toBe(false)
    expect(envelopeCode.includes('outerHTML'), 'and no markup string').toBe(false)
  })

  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ⟶ `D-120` — THE LAYER'S GEOMETRY AND ITS VISIBILITY, EACH AT ITS OWN HOME.
  //
  // MEASURED BEFORE THIS PASS, on the real window: the scrim was `position: static`, full-width, ZERO HEIGHT and painted
  // nothing; the dialog was `position: static` at `y=908` — IN FLOW BELOW the app cards, off the bottom of a `692`-high
  // viewport — and it was VISIBLE while the machine said `closed`, because nothing on this surface carried a `display`
  // that any state moved. The `inert` declaration landed on the app root and came off it, and the modal itself never
  // floated. **TWO HOMES, AND THEY ARE NOT INTERCHANGEABLE**: the GEOMETRY is the AUTHORED nodes' own `css` (provident
  // data, `AGENTS.md` § "UI authority"), and the VISIBILITY is the shell page CSS keyed on the `inert` attribute the
  // consumer already applies — the mechanism's own declared product, never a second copy of the four-state machine.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

  /** A node's authored `css.style` map, or `null` where the node carries none. */
  function styleOf(id: string): Record<string, string> | null {
    const entry = nodeById(id)
    if (entry === null) return null
    const css = entry.node['css'] as Record<string, unknown> | undefined
    const style = css === undefined ? undefined : css['style']
    return style !== undefined && style !== null && typeof style === 'object' ? (style as Record<string, string>) : null
  }

  /** **THE PREDICATE THIS ROW GATES ON — `position: fixed` PLUS THE INSET/PAIR THAT MAKES IT A BACKDROP OR A CENTRED
   *  CARD.** Written once and driven over real objects, so both controls below read the same instrument as the row. */
  function floatsAs(style: Record<string, string> | null, wanted: readonly string[]): readonly string[] {
    if (style === null) return ['(no authored style object)']
    const missing: string[] = []
    for (const prop of wanted) {
      const value = style[prop]
      if (typeof value !== 'string' || value.trim() === '') missing.push(prop)
    }
    return missing
  }
  const SCRIM_SHAPE = ['position', 'top', 'right', 'bottom', 'left', 'background', 'z-index']
  const DIALOG_SHAPE = ['position', 'top', 'left', 'transform', 'z-index']

  it('OV-11 · THE AUTHORED `css` CARRIES THE LAYER’S GEOMETRY: the scrim is a FULL-VIEWPORT BACKDROP and the dialog a CENTRED CARD, both read off the AUTHORED provident nodes and not off the stylesheet — with a control object that omits `position` failing the same predicate', () => {
    const scrim = styleOf(OVERLAY_SCRIM_ID)
    const dialog = styleOf(OVERLAY_DIALOG_ID)
    expect(scrim, 'the scrim is an AUTHORED node carrying a `css.style` object').not.toBe(null)
    expect(dialog, 'and so is the dialog').not.toBe(null)

    // THE SCRIM: out of flow, pinned to all four viewport edges, translucent, above the app.
    expect(floatsAs(scrim, SCRIM_SHAPE), 'the scrim carries every declaration a full-viewport backdrop needs').toEqual([])
    expect((scrim as Record<string, string>)['position'], 'the scrim is `position: fixed` — it was `{display: block}` and measured IN FLOW at zero height').toBe('fixed')
    for (const edge of ['top', 'right', 'bottom', 'left']) {
      expect((scrim as Record<string, string>)[edge], `the scrim's \`${edge}\` inset is 0, so it covers the VIEWPORT and not the flow box`).toBe('0')
    }
    expect((scrim as Record<string, string>)['background'], 'and it paints a translucent backdrop the app stays visible behind').toMatch(/rgba\(/)

    // THE DIALOG: out of flow, centred by the 50%/50% + translate pair, above the scrim's own layer.
    expect(floatsAs(dialog, DIALOG_SHAPE), 'the dialog carries every declaration a centred card needs').toEqual([])
    expect((dialog as Record<string, string>)['position'], 'the dialog is `position: fixed` — it measured `static` at `y=908`, below the app cards').toBe('fixed')
    expect((dialog as Record<string, string>)['top'], 'the dialog is anchored at the vertical mid-point').toBe('50%')
    expect((dialog as Record<string, string>)['left'], 'and at the horizontal mid-point').toBe('50%')
    expect((dialog as Record<string, string>)['transform'], 'with the half-size offset that makes 50%/50% a CENTRE rather than a corner').toBe('translate(-50%, -50%)')
    expect(Number((dialog as Record<string, string>)['z-index']), 'the dialog paints ABOVE the scrim').toBeGreaterThan(Number((scrim as Record<string, string>)['z-index']))

    // THE TWO CONTROLS — the predicate is not vacuous: an object missing `position` FAILS it, and so does a null style.
    const flat = { ...(dialog as Record<string, string>) }
    delete flat['position']
    expect(floatsAs(flat, DIALOG_SHAPE), 'a node whose geometry omits `position` FAILS this row — which is exactly the state the two nodes were measured in').toEqual(['position'])
    expect(floatsAs(null, DIALOG_SHAPE), 'and a node with no authored style fails it too').toEqual(['(no authored style object)'])
    expect(floatsAs({ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 'z-index': '11' }, DIALOG_SHAPE), 'while a complete one passes, so the term is satisfiable').toEqual([])
  })

  it('OV-12 · THE GEOMETRY REACHES THE DOM AND THE VISIBILITY IS THE MECHANISM’S ALONE: the rendered dialog tag carries the authored declarations, neither authored style carries a `display` that could pin a CLOSED overlay open, and the page sheet’s one key is the `inert` attribute the consumer applies', () => {
    const { runtime, app, deliver } = realm()
    // (a) THE AUTHORED CSS IS IN THE RENDERED FRAGMENT — the `get_rendered_html` reading, not a stylesheet reading.
    const dialogTag = tagOf(htmlOf(runtime), OVERLAY_DIALOG_ID)
    expect(dialogTag, 'the authored dialog renders').toContain('position: fixed')
    expect(dialogTag, 'with its centring pair in the rendered `style` attribute').toContain('translate(-50%, -50%)')
    expect(tagOf(htmlOf(runtime), OVERLAY_SCRIM_ID), 'and the scrim renders its own full-viewport inset').toContain('position: fixed')

    // (b) NEITHER AUTHORED STYLE CARRIES `display`, AND THAT IS WHAT LEAVES VISIBILITY TO THE MECHANISM: an inline
    // declaration outranks the sheet's keyed rule, so a `display` here would pin the layer visible in the closed state.
    for (const id of [OVERLAY_SCRIM_ID, OVERLAY_DIALOG_ID]) {
      expect(Object.hasOwn(styleOf(id) as Record<string, string>, 'display'), `the authored ${id} style claims no \`display\``).toBe(false)
    }
    // THE CONTROL: the same reading over a node that DOES carry one reports it, so this absence is a measurement.
    expect(Object.hasOwn({ display: 'block', position: 'fixed' }, 'display'), 'a style object carrying `display` is reported by the same instrument').toBe(true)

    // (c) THE PAGE SHEET'S ONE KEY IS THE MECHANISM'S PRODUCT: the layer's rules key on the AUTHORED app root's `inert`
    // attribute — the declaration `startOverlayApplication` applies — and the sheet spells no state word of its own.
    const sheet = readFileSync(`${REPO_ROOT}/src/renderer/index.html`, 'utf8')
    const layerRules = sheet.split('\n').filter((line) => /#overlay-(scrim|dialog)/.test(line))
    expect(layerRules.length, 'the sheet carries rules for the layer').toBeGreaterThan(0)
    expect(layerRules.some((line) => line.includes('display: none')), 'the CLOSED state is the default: the layer is not shown unless the key says so').toBe(true)
    expect(
      layerRules.some((line) => new RegExp(`#${APP_ROOT_ID}\\[inert\\]\\s*~\\s*#${OVERLAY_SCRIM_ID}`).test(line)),
      'and it is SHOWN only while the authored app root carries the `inert` attribute the consumer applied',
    ).toBe(true)
    // THE CONTROL: a key that names something other than the mechanism's product is refused by the same reading.
    expect(`#${APP_ROOT_ID}[data-overlay] ~ #${OVERLAY_SCRIM_ID} { display: block; }`.includes('#app-surface[inert]'), 'a rule keyed on another attribute is NOT the key this row reads').toBe(false)

    // (d) AND THE STORE DECIDES IT (`D-125`): the act writes, the DELIVERY renders, `closed` removes the key and `open`
    // sets it — the sheet follows, it does not lead, and neither does the wiring's own ask.
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'closed: no key, so the layer is not shown').not.toMatch(/\binert\b/)
    app.apply('open')
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'the ASK alone sets nothing: the act has written the store and no delivery has arrived').not.toMatch(/\binert\b/)
    deliver(true)
    const opened = app.render()
    expect(opened.written, 'the delivery renders: the declaration lands').toBe(true)
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'and the key the sheet reads is present').toMatch(/\binert\b/)
    app.apply('close')
    deliver(false)
    const closed = app.render()
    expect(closed.written, 'close: the removal arm lands').toBe(true)
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'and the key is gone again, so the layer hides with it').not.toMatch(/\binert\b/)
  })

  it('OV-13 · **THE WRITE-FIRST INVERSION, OVER COMMENT-ELIDED CODE** — the open path WRITES THE STORE and does not set the machine from the authored token first: the region\'s ONE `overlayTransition` call is handed the STORE\'s word as its state, no assignment takes a transition answer as the word the wiring holds, and the write precedes every move of that word (`D-125`)', () => {
    const region = consumerRegion()
    expect(region.length, 'the consumer’s region was located, so every census below reads CODE and not prose').toBeGreaterThan(2000)

    // (1) THE TRACKED TOKEN IS NEVER THE MACHINE'S STATE. `D-124`'s form was `state = overlayTransition(state, verb)` inside
    //     `apply()`, with `state` seeded from the AUTHORED carrier — the renderer as the machine, the store following it.
    expect(/overlayTransition\(state\b/.test(region), 'no call hands the wiring’s own word to the mechanism as its state').toBe(false)
    expect(/overlayTransition\(boot\.token/.test(region), 'and none is seeded from the AUTHORED carrier').toBe(false)
    expect(/overlayTransition\(carried\.token/.test(region), 'nor is the authored token ever the state argument — that is the direction this pass removes').toBe(false)
    expect(/\bstate\s*=\s*overlayTransition\(/.test(region), 'and no assignment takes a transition answer as the state this wiring holds').toBe(false)
    expect(/\bstate\s*=\s*answer\.state/.test(region), 'nor as a member of one').toBe(false)

    // (2) THE ONE CALL THAT STANDS IS HANDED THE STORE'S WORD — the act's whole direction, in one expression.
    const calls = region.match(/overlayTransition\(/g) ?? []
    expect(calls.length, 'exactly ONE `overlayTransition` call stands in the consumer').toBe(1)
    expect(/overlayTransition\(before === true \? 'open' : 'closed', verb/.test(region), 'and its STATE argument is the store’s last delivered word, translated to the mechanism’s own vocabulary').toBe(true)

    // (3) THE MACHINE'S WORD IS DERIVED FROM THE STORE, in one place, and the transient is the only other writer.
    expect((region.match(/derived = word \? 'open' : 'closed'/g) ?? []).length, 'the rendered word is DERIVED from the crossing’s word, once').toBe(1)
    // **AND IT IS ASSIGNED NOWHERE ELSE** — one writer, and that writer is the store. `D-124`'s form assigned it from the
    // transition's answer inside the ACT, which is the direction this pass removes and the assertion a reader needs.
    expect((region.match(/derived = /g) ?? []).length, 'the machine’s word has ONE assignment in the whole consumer, and it reads the store — a second one, from a transition answer, is the direction this pass removes').toBe(1)
    // TWO WRITES AND NO MORE: one PRODUCTION (`if (wrote && !asked) transient = 'closing'`) and one CLEARING (`if (clear)
    // transient = null`) — the transient has one writer in one realm and outlives no delivery, which is `D-90`'s judgement
    // read as a count.
    expect((region.match(/transient = /g) ?? []).length, 'the ONE transient is written exactly twice: produced by the act and cleared by the delivery').toBe(2)

    // (4) THE WRITE PRECEDES EVERY MOVE OF THE WORD: the crossing is written in the act, and the act's block stands BEFORE
    //     the render block that derives it. A wiring that moved its word first would have the indices the other way round.
    const writeAt = region.indexOf('crossing.write(')
    const deriveAt = region.indexOf("derived = word ? 'open' : 'closed'")
    expect(writeAt, 'the act reaches the crossing’s write route').toBeGreaterThan(-1)
    expect(deriveAt, 'and the render derives the word').toBeGreaterThan(-1)
    expect(writeAt < deriveAt, 'so the WRITE is written before the DERIVATION in the consumer’s own code — the order the correction asks for, read off the bytes rather than claimed').toBe(true)
    // (5) AND THE ACT DECLARES NOTHING: an act's reading carries no declaration, which is what makes the render the pane's
    //     only source. The one `declaration:` member in the act's answer is the `null`.
    const applyStart = region.indexOf('const apply = (')
    const applyEnd = region.indexOf('return {', applyStart)
    const applyBody = applyStart < 0 || applyEnd < 0 ? '' : region.slice(applyStart, applyEnd)
    expect(applyBody.includes('declaration: null'), 'the ACT’s answer carries `declaration: null` — it asks the store and renders nothing').toBe(true)
    expect(/overlayInertDeclaration\(/.test(applyBody), 'and the act calls the declaration mechanism NOWHERE').toBe(false)

    // (6) THE ELISION CONTROL: the same identifiers DO stand in the file's prose, so a reader that did not elide comments
    //     would find them and this row would be measuring the explanation instead of the code.
    const raw = readFileSync(CONSUMER_PATH, 'utf8')
    expect((raw.match(/overlayTransition/g) ?? []).length, 'the raw bytes name `overlayTransition` in prose as well as in code').toBeGreaterThan(calls.length)
    expect(codeOf(raw).includes('hands it to `overlayTransition`'), 'and the eliding reader removes that prose — this is the control that makes (1)–(5) measurements of CODE').toBe(false)
    // RED ON REVERT: restore `D-124`'s `const answer = overlayTransition(state, verb, …); state = answer.state` inside `apply`
    // and (1) reddens on three assertions at once while (2) still passes — the mechanism is still called, it is the
    // AUTHORITY that moved.
  })

  it('OV-14 · **THE RENDER IS THE DELIVERY\'S PRODUCT AND NEVER THE ASK\'S** — a delivery with NO act behind it opens the rendered pane, and an act with no delivery renders nothing at all (`D-125`; `D-82` clause 2)', () => {
    const { runtime, app, deliver, asks } = realm()
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'the boot: no key on the authored app root').not.toMatch(/\binert\b/)

    // (a) THE STORE CHANGES WITH NO ACT AT ALL — the case a listener exists for: the pane appears because the crossing's
    //     word moved, and NOTHING in this realm asked for it.
    deliver(true)
    const rendered = app.render()
    expect(asks, 'no act stood behind this delivery: the ask log is empty').toEqual([])
    expect(rendered.written, 'and the declaration still lands, because the render reads the store and not the ask').toBe(true)
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'so `get_rendered_html` shows the pane up with no user act anywhere').toMatch(/inert="true"/)
    expect(app.state(), 'and the machine’s word is the store’s').toBe('open')

    // (b) THE MIRROR: an act with no delivery changes NOTHING that is rendered — the pane cannot appear from an ask.
    deliver(false)
    app.render()
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'closed again by a delivery alone').not.toMatch(/\binert\b/)
    const asked = app.apply('open')
    expect(asked.wrote, 'the act wrote the crossing').toBe(true)
    const idle = app.render()
    expect(
      idle.written,
      'and the render that follows it still LANDS — a REDUNDANT, IDEMPOTENT REMOVAL WRITE, which is the price of never skipping an owed paint: the surface already lacks `inert`, and under the change-guard this arm was skipped because the declaration had not moved since the last one applied (`D-129`\'s `lastApplied`, and this very assertion read `false`). The skip is gone for a MEASURED reason: an ABSENT `props.<name>` is what a REBUILT node, a store-projected state AND a NOT-YET-APPLIED REMOVAL all look like, so `held === wanted === undefined` cannot establish that the removal reached the render — under `D-163`\'s pre-correction predicate `OV-12`\'s close arm read `written: false` while this row\'s own tag still carried `inert="true"` over a pane the record had closed. The write is idempotent and cannot loop (a renderer graph write raises no view push), so the redundancy is a price paid per removal delivery and never a budget — the alternative is that pane: a record closed and a DOM still carrying its attribute',
    ).toBe(true)
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'the rendered surface is unmoved by the ask alone, which is the whole of the correction').not.toMatch(/\binert\b/)
    // AND THE DELIVERY THAT ANSWERS IT IS WHAT MOVES THE SURFACE.
    deliver(true)
    expect(app.render().written, 'the answering delivery renders the pane').toBe(true)
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'and the key is present').toMatch(/inert="true"/)
    // (c) A TRANSIENT RENDERS NOTHING AND CANNOT: while a close is in flight the pane is still up and on its way out, and
    //     the word the wiring holds is `closing` — but the RENDER PREDICATE is the store's word, which still says open.
    const closing = app.apply('close')
    expect(closing.state, 'the transient names the window the act opened').toBe('closing')
    app.render()
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'and the rendered pane is STILL UP: a transient is not a state and cannot close what the store has not closed').toMatch(/inert="true"/)
    deliver(false)
    app.render()
    expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'the delivery is what takes it down').not.toMatch(/\binert\b/)
    // RED ON REVERT: make `renderTurn` apply from the verb's ask (or from `transient`) instead of from the crossing's word and
    // (a) reddens first — a delivery with no act behind it would render nothing — and (c) after it.
  })
})
