// tests/integration/renderer-wiring/module-shape.test.ts — **THE MODULE SHAPE'S INTEGRATION ROWS** (`S-18`/`S-20`,
// `D-317`; `docs/L2/renderer-wiring/module-shape.md` rev 2 §6, `docs/L3/renderer-wiring/module-shape.md` rev 2 §7).
//
// UNMARKED and GATING: authored after the `D-30` sweep (`D-40`), and it states an exchange at the seat's own boundary —
// a `CapabilityRouter`'s registrations in, a live graph with its closures installed out, over the REAL `Runtime` (the
// shim stands in for the DOM, as the module's own battery does). **WHAT IT DOES NOT MEASURE**: the app's boot, the channel
// transport and the e2e `M-2b`/`M-11`/`M-13` (those are L1's seats at `S-20`), and the composed pane set's totality over a
// MODULE pane (`S-18`), which waits on `U2`'s declaration registry — the five maps are total over `DECLARED_PANE_IDS`
// today and `PM-1` reads them.
import { beforeAll, describe, expect, it } from 'vitest'
import { installShim, mountEl } from '../../../src/shared/dom-shim.js'
import { Runtime } from '../../../src/renderer/runtime.js'
import { CapabilityRouter } from '../../../src/renderer/extensions.js'
import { startModuleShape } from '../../../src/renderer/renderer.js'

interface Shim {
  readonly children: readonly unknown[]
}

beforeAll(() => { installShim() })

/** The authored page: a host, and a button whose handler is DECLARED BY NAME with no body — the module-declared shape the
 *  action install fills (`C-10`'s key, never source text in graph data). */
const envelope = (): never => ({
  template: {
    root: {
      type: 'div',
      css: { id: 'root' },
      children: [
        { type: 'div', css: { id: 'host' } },
        { type: 'button', css: { id: 'authored-reset' }, content: 'Reset', handlers: [{ name: 'reset', event: 'click' }] },
      ],
    },
  },
  content: [],
  clientConfig: { runInstantiation: true, runRendering: true },
} as never)

const runtimeOf = (): Runtime => {
  const runtime = new Runtime({ mount: mountEl() as never, envelope: envelope() })
  runtime.bootstrap()
  return runtime
}

const routerOf = (log: string[] = []): CapabilityRouter => new CapabilityRouter({ log: (line) => { log.push(line) } })

describe('renderer-wiring — the module shape: the graph composition and the action install (S-18/S-20, D-317)', () => {
  it('RW-M1 — a module\'s `graph` contribution lands under its parent, and its `action` closure dispatches BY NAME on both the authored and the contributed node', async () => {
    let fired = 0
    const runtime = runtimeOf()
    const router = routerOf()
    router.registerModule('alpha', (ctx) => {
      ctx.graph({ parent: 'host', nodes: [{ type: 'div', css: { id: 'alpha-panel' }, children: [{ type: 'button', css: { id: 'alpha-reset' }, content: 'Go', handlers: [{ name: 'reset', event: 'click' }] }] }] })
      ctx.action('reset', () => { fired += 1 })
    })
    const install = startModuleShape(runtime, router)
    expect(install.standing, 'the router\'s registration set is what the install answers (`AN-5`: cumulative, and named so)').toEqual(['alpha'])
    expect(install.added).toEqual(['alpha-panel', 'alpha-reset'])
    expect(install.skipped, 'nothing was refused').toEqual([])
    expect(install.actions, 'ONE action, installed on the two nodes that declare the key').toBe(2)
    const host = runtime.elementForNodeId('host') as unknown as Shim
    const panel = runtime.elementForNodeId('alpha-panel') as unknown as Shim
    expect(panel, 'the contributed subtree is live').toBeTruthy()
    expect(host.children.includes(panel), 'and it stands INSIDE its declared parent').toBe(true)
    await runtime.dispatch({ target: { kind: 'cssId', cssId: 'alpha-reset' }, event: 'click' })
    expect(fired, 'the closure runs from the CONTRIBUTED node').toBe(1)
    await runtime.dispatch({ target: { kind: 'cssId', cssId: 'authored-reset' }, event: 'click' })
    expect(fired, 'and from an AUTHORED node whose handler carries the same name — the table is by name, not by node').toBe(2)
  })

  it('RW-M2 — a second frame at the same module adds nothing, and so does a later module\'s frame that carries the earlier contributions again', () => {
    const runtime = runtimeOf()
    const router = routerOf()
    router.registerModule('alpha', (ctx) => {
      ctx.graph({ parent: 'host', nodes: [{ type: 'div', css: { id: 'alpha-panel' } }] })
    })
    expect(startModuleShape(runtime, router).added).toEqual(['alpha-panel'])
    router.registerModule('alpha', () => { /* a repeated frame is ignored by the router's own rule */ })
    expect(startModuleShape(runtime, router).added, 'the same module contributes once').toEqual([])
    router.registerModule('beta', (ctx) => {
      ctx.graph({ parent: 'alpha-panel', nodes: [{ type: 'span', css: { id: 'beta-row' } }] })
    })
    const second = startModuleShape(runtime, router)
    expect(second.added, 'a later module composes under an earlier one\'s node, and the earlier nodes are NOT added twice').toEqual(['beta-row'])
    const panel = runtime.elementForNodeId('alpha-panel') as unknown as Shim
    const row = runtime.elementForNodeId('beta-row') as unknown as Shim
    expect(panel.children.includes(row), 'the order is the router\'s, and the nesting is the contribution\'s').toBe(true)
  })

  it('RW-M3 — a contribution whose parent does not stand is NAMED and skipped, and the graph is untouched', () => {
    const runtime = runtimeOf()
    const router = routerOf()
    const before = runtime.renderedHtmlResult().renderedHtml
    router.registerModule('alpha', (ctx) => {
      ctx.graph({ parent: 'absent', nodes: [{ type: 'div', css: { id: 'orphan' } }] })
      ctx.action('reset', () => undefined)
    })
    const install = startModuleShape(runtime, router)
    expect(install.added).toEqual([])
    expect(install.skipped, 'the refusal is answered BY NAME').toEqual(['absent'])
    expect(runtime.elementForNodeId('orphan'), 'never half-attached').toBe(null)
    expect(runtime.renderedHtmlResult().renderedHtml, 'and the page did not re-render for a refusal').toBe(before)
  })

  it('RW-M6 — a new module installs ITS OWN handlers and does not re-apply the earlier module\'s (`AN-7`)', () => {
    const runtime = runtimeOf()
    const router = routerOf()
    router.registerModule('alpha', (ctx) => {
      ctx.graph({ parent: 'host', nodes: [{ type: 'button', css: { id: 'alpha-bump' }, handlers: [{ name: 'bump', event: 'click' }] }] })
      ctx.action('bump', () => undefined)
    })
    expect(startModuleShape(runtime, router, 'alpha').actions, 'the first module installs its own action').toBe(1)
    router.registerModule('beta', (ctx) => {
      ctx.graph({ parent: 'host', nodes: [{ type: 'div', css: { id: 'beta-panel' } }] })
    })
    const second = startModuleShape(runtime, router, 'beta')
    expect(second.added, 'the second module composes its own node').toEqual(['beta-panel'])
    expect(second.actions, 'and installs NO handler — alpha\'s closure is not re-applied on beta\'s frame').toBe(0)
  })

  it('RW-M5 — an ID-LESS contribution is composed ONCE, not once per later module\'s frame (`AN-6`: the live-graph id check cannot see it, so the seat\'s per-router key set does)', () => {
    const runtime = runtimeOf()
    const router = routerOf()
    router.registerModule('alpha', (ctx) => {
      ctx.graph({ parent: 'host', nodes: [{ type: 'span', content: 'idless-marker' }] })
    })
    expect(startModuleShape(runtime, router).added, 'an id-less forest adds nothing to `added` (it has no id to report)').toEqual([])
    const count = (): number => (runtime.renderedHtmlResult().renderedHtml.match(/idless-marker/g) ?? []).length
    expect(count(), 'the id-less node was composed once').toBe(1)
    router.registerModule('beta', (ctx) => {
      ctx.graph({ parent: 'host', nodes: [{ type: 'div', css: { id: 'beta-panel' } }] })
    })
    expect(startModuleShape(runtime, router).added).toEqual(['beta-panel'])
    expect(count(), 'and the later frame did NOT compose alpha\'s forest a second time').toBe(1)
  })

  it('RW-M4 — an action no node declares is installed nowhere and throws nothing', () => {
    const runtime = runtimeOf()
    const router = routerOf()
    router.registerModule('alpha', (ctx) => {
      ctx.graph({ parent: 'host', nodes: [{ type: 'div', css: { id: 'alpha-panel' } }] })
      ctx.action('nowhere', () => undefined)
    })
    const install = startModuleShape(runtime, router)
    expect(install.added).toEqual(['alpha-panel'])
    expect(install.actions, 'a name no handler carries is installed nowhere, and the install is total').toBe(0)
    expect(runtime.renderedHtmlResult().renderedHtml, 'the contributed node still stands').toContain('alpha-panel')
  })
})
