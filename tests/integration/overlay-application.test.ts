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

/** A booted app realm with the consumer constructed over it — the `startThemeApplication` shape. */
interface Realm {
  readonly runtime: Runtime
  readonly mount: unknown
  readonly app: OverlayApplication
}
function realm(): Realm {
  const mount = mountEl()
  const runtime = new Runtime({ mount: mount as never, envelope: demoEnvelope() as never })
  runtime.bootstrap()
  const app = startOverlayApplication(runtime)
  return { runtime, mount, app }
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
  it('OV-1 · the TRANSITION MACHINE, through all four verbs: `open`/`close`/`toggle`/`escape` land the four-state set and report `changed` — the wiring consumes the mechanism rather than re-spelling it', () => {
    const { app } = realm()
    // THE CONSUMER'S SEED IS THE GRAPH'S: the authored carrier holds one of the machine's own four state words.
    expect(app.state(), 'the authored carrier seeds the machine (`closed`), so the wiring holds no literal of its own').toBe('closed')

    const opened = app.apply('open')
    expect(opened.state, '`open` lands `open`').toBe('open')
    expect(opened.changed, 'and it MOVED').toBe(true)

    const heldThenOpen = app.apply('open')
    expect(heldThenOpen.changed, 'an `open` on an already-open overlay moves nothing — the same state, `changed:false`').toBe(false)

    const closed = app.apply('close')
    expect(closed.state).toBe('closed')
    expect(closed.changed).toBe(true)

    const toggled = app.apply('toggle')
    expect(toggled.state, '`toggle` from `closed` opens').toBe('open')
    const toggledBack = app.apply('toggle')
    expect(toggledBack.state, '`toggle` from `open` closes').toBe('closed')

    // THE THIRD AND FOURTH STATES ARE THE MECHANISM'S OWN AND REACH THE CONSUMER UNFOLDED: a state the wiring holds is
    // passed THROUGH, never normalised by it.
    expect(overlayTransition('held', 'open').state, '`held` × `open` stays `held` — the mechanism’s own cell').toBe('held')
    expect(overlayTransition('closing', 'toggle').state, '`closing` × `toggle` opens').toBe('open')
    // THE FOUR-STATE SET IS CLOSED: every answer the machine gave above is a member of it.
    const seen = new Set([opened.state, closed.state, toggled.state, toggledBack.state, 'held', 'closing'])
    expect([...seen].sort(), 'every state the consumer held is one of the machine’s own four').toEqual(['closed', 'closing', 'held', 'open'])
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
    const { app } = realm()
    expect(app.attributeName, 'the application carries that one spelling').toBe(role.attributeName)
    const open = app.apply('open')
    expect(open.declaration, 'the OPEN declaration is the set arm').toEqual({ name: role.attributeName, value: 'true', removal: false })
    const close = app.apply('close')
    expect(close.declaration, 'the CLOSE declaration is the removal arm').toEqual({ name: role.attributeName, value: false, removal: true })
  })

  it('OV-4 · **THE AUTHORED SURFACE IS A PROVIDENT NODE** — `get_rendered_html` shows the dialog and the attribute lands on the AUTHORED app root; a hand-written element is the POSITIVE CONTROL and the graph cannot address it', async () => {
    const { runtime, mount, app } = realm()
    const before = htmlOf(runtime)
    expect(before, 'the CLOSED surface: the authored app root carries no `inert` attribute').not.toContain('inert')

    const open = app.apply('open')
    expect(open.written, 'the declaration LANDED: the runtime answered `applied`').toBe(true)
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

  it('OV-7 · the DRIVE THROUGH THE PRODUCING GRAPH — the authored opener writes the caller’s verb token, the wiring reads it and applies the declaration; the authored close control reverses it', () => {
    const { runtime, app } = realm()
    // THE ACT, AS AN ACT: `provident.dispatch` on the authored opener runs the authored handler body, which writes the
    // CALLER'S token into the authored state carrier. Nothing about a transition happens in the body.
    return runtime
      .dispatch({ target: { kind: 'cssId', cssId: OVERLAY_OPEN_ID }, event: 'click' })
      .then((result) => {
        expect(result.dirtied, 'the authored opener’s body RAN: the dispatch reports the node it dirtied').toContain(
          (runtime.listTargets().nodes.find((n) => n.propsId === OVERLAY_STATE_ID) as { nodeId: string }).nodeId,
        )
        expect(textOf(htmlOf(runtime), OVERLAY_STATE_ID), 'the carrier now holds the caller’s VERB token, not a state word').toBe('toggle')
        // THE CONSUMER'S TURN — the same turn the reply route takes beside the appearance act.
        const driven = app.drive()
        expect(driven.verb, 'the turn consumed the token the graph holds').toBe('toggle')
        expect(driven.state, 'and the machine opened').toBe('open')
        expect(driven.written, 'and the inert declaration landed on the authored app root').toBe(true)
        expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'which `get_rendered_html` shows').toMatch(/inert="true"/)
        // A SECOND `drive()` ON AN UNMOVED CARRIER IS NOT AN ACT.
        const again = app.drive()
        expect(again.changed, 'an unmoved token moves nothing').toBe(false)
        expect(again.written, 'and writes nothing').toBe(false)

        return runtime.dispatch({ target: { kind: 'cssId', cssId: OVERLAY_CLOSE_ID }, event: 'click' })
      })
      .then((result) => {
        expect(result.dirtied, 'the authored close control’s body RAN').toContain(
          (runtime.listTargets().nodes.find((n) => n.propsId === OVERLAY_STATE_ID) as { nodeId: string }).nodeId,
        )
        const closed = app.drive()
        expect(closed.verb).toBe('close')
        expect(closed.state).toBe('closed')
        expect(closed.written).toBe(true)
        expect(tagOf(htmlOf(runtime), APP_ROOT_ID), 'the REMOVAL arm took the attribute back off the authored app root').not.toMatch(/\binert\b/)
      })
  })

  it('OV-8 · **WHAT THE INERT ROOT DOES AND DOES NOT BLOCK, MEASURED** — the app’s own `provident.dispatch` STILL reaches nodes under it, and no code on that path consults `inert` at all', () => {
    const { runtime, app } = realm()
    app.apply('open')
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
    const { runtime, app } = realm()
    app.apply('open')
    // THE COMMIT ROUTE the drag's end turn uses is ONE `state-slice` on the authored status node. Under an inert root it
    // still applies, because it is a graph write and the graph has no idea what the DOM is doing.
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
})
