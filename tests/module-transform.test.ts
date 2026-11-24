// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/module-transform.test.ts — RE-GRAINED to the SHIPPED realm half (unit `modularity`, L1 §4 `C-10`,
// `D-231`, `D-235`, `D-313`, L2 §3/§6).
//
// THE SUBJECT THIS FILE HELD IS RETIRED AT **BOTH** ENDS, AND THE TREE SAYS SO AT THIS HEAD:
//   · the REGISTRATION member — `ctx.transform(fn)` and the router's `applyTransforms(fragment)` — is one
//     of the six the replaced `ModuleCtx` carried, and it retires WHOLE rather than being re-pointed
//     (L2 §3, `D-305`, `D-231`: the post-compile STRING TRANSFORM is the class this rebuild forbids);
//   · and the RENDER member went with it: `src/renderer/runtime.ts` no longer imports `CapabilityRouter`,
//     `RuntimeOptions` no longer declares `transformRouter`, and `renderedHtml()`/`ssrHtml()`/the markdown
//     view each emit their fragment VERBATIM, with the retirement cited at the site (`C-10`, `D-231`).
//
// WHAT REPLACES IT is the CONTRIBUTION and the NAMED ACTION: a module shapes the graph by naming a PARENT
// and contributing DATA at the ordered pre-build point (`ctx.graph`, L2 §3, `S-15`), and reaches the
// engine by a name → function table entry matched at dispatch (`ctx.action`, `D-313`) — never by rewriting
// a compiled string. Rows 1–7 pin that half; row 8 drives the REAL Runtime and pins the seam's death from
// the other side, so an L4 that puts a fragment transform back reds here.
import { describe, it, expect, beforeAll } from 'vitest'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { Runtime } from '../src/renderer/runtime.js'
import { CapabilityRouter, type ClientHalfCtx } from '../src/renderer/extensions.js'
import type { ChannelEntry } from '../src/shared/module-channels.js'
/** The legacy rows drive `fire` with a bare data/address pair: this is the ENTRY they mean. */
const deliveredAt = (handle: string, data?: unknown, address: readonly string[] = []): ChannelEntry => ({ turn: 0, module: 'legacy', listener: handle, outcome: 'return', address, ...(data === undefined ? {} : { data }) })

beforeAll(() => {
  installShim()
})

function capture(): { router: CapabilityRouter; ctx: () => ClientHalfCtx; lines: string[] } {
  const lines: string[] = []
  const router = new CapabilityRouter({ log: (line: string) => lines.push(line) })
  let seen: ClientHalfCtx | undefined
  router.registerModule('format', (ctx: ClientHalfCtx) => {
    seen = ctx
  })
  return {
    router,
    ctx: () => {
      if (seen === undefined) throw new Error('registerModule handed the entry no ctx')
      return seen
    },
    lines,
  }
}

describe('U6 — the fragment transform is retired; the ordered contribution replaces it (M-r5, D-231, C-10)', () => {
  it('1. a module shapes the graph by CONTRIBUTING to a named parent, not by transforming the fragment: `graph` records the data and `transform` is ABSENT from the ctx (old row 1: a transform router changed renderedHtml)', () => {
    const { router, ctx } = capture()
    expect('transform' in ctx()).toBe(false)
    router.registerModule('menu', (client: ClientHalfCtx) => {
      client.graph({ parent: 'root', nodes: [{ id: 'counter', content: 'Counter' }] })
    })
    expect(router.contributions().map((record) => record.contribution.parent)).toEqual(['root'])
    expect(router.contributions()[0]!.contribution.nodes).toEqual([{ id: 'counter', content: 'Counter' }])
  })

  it('2. the contribution is ONE value, by IDENTITY — every reader of contributions() sees the caller’s own data, so no per-adapter copy can diverge (old row 2: the transform applied to BOTH DOM and SSR in parity)', () => {
    const router = new CapabilityRouter()
    const contribution = { parent: 'root', nodes: [{ id: 'counter' }] } as const
    router.registerModule('menu', (ctx) => {
      ctx.graph(contribution)
    })
    const first = router.contributions()[0]!.contribution
    const second = router.contributions()[0]!.contribution
    expect(first).toBe(contribution)
    expect(second).toBe(contribution)
    expect(first).toBe(second)
  })

  it('3. contribute is EMIT-ONLY in the same sense the transform was — the module’s OWN data is not mutated by the act of contributing (old row 3: the transform never touched the Node content)', () => {
    const router = new CapabilityRouter()
    const contribution = { parent: 'root', nodes: [{ id: 'inc', content: 'Increment (+1)' }] } as const
    const before = structuredClone(contribution)
    router.registerModule('menu', (ctx) => {
      ctx.graph(contribution)
    })
    expect(contribution).toEqual(before)
    // the record holds the caller's value untouched: nothing was uppercased, re-wrapped or re-spelled.
    expect(router.contributions()[0]!.contribution.nodes[0]).toEqual({ id: 'inc', content: 'Increment (+1)' })
  })

  it('4. a module that contributes nothing adds no contribution and no member stands in for a transform (old row 4: a Runtime WITHOUT a transform router applied no transform)', () => {
    const { router, ctx } = capture()
    router.registerModule('quiet', (client: ClientHalfCtx) => {
      client.log('nothing to contribute')
    })
    expect(router.contributions()).toEqual([])
    // there is no member a no-op transform could hide behind: the key set is exactly §3's five.
    expect(Object.keys(ctx()).sort()).toEqual(['action', 'graph', 'log', 'onDelivery', 'store'])
    expect((router as unknown as Record<string, unknown>).applyTransforms).toBeUndefined()
  })

  it('5. contributions from several modules keep REGISTRATION ORDER, each with its own parent id — the ordered pre-build point reads that order and no caller sorts (old row 5: two transforms composed in registration order — L2 §7, C-6)', () => {
    const router = new CapabilityRouter()
    router.registerModule('menus', (ctx) => {
      ctx.graph({ parent: 'root', nodes: [{ id: 'file' }] })
    })
    router.registerModule('submenu', (ctx) => {
      ctx.graph({ parent: 'file', nodes: [{ id: 'recent' }] })
    })
    const order = router.contributions().map((record) => `${record.module}>${record.contribution.parent}`)
    expect(order).toEqual(['menus>root', 'submenu>file'])
    // the foundation's own contributions precede any module's by the same rule (L2 §7) — this file can
    // only pin that the realm hands them over in the order they were made, which is what it does.
    expect(order.indexOf('menus>root')).toBeLessThan(order.indexOf('submenu>file'))
  })

  it('6. a module’s throwing code is CONTAINED at the realm — by name while it registers, and as a refused VALUE while it delivers (old row 6: a throwing transform never crashed the render — D-105, D-307)', () => {
    const { router, lines } = capture()
    router.registerModule('bad', `(ctx) => { ctx.graph({ parent: 'root', nodes: [] }); throw new Error('transform blew up') }`)
    expect(lines).toContain('entry-threw')
    // the registrations the entry made BEFORE it threw stand, and the throw never crossed the install path.
    expect(router.contributions()).toHaveLength(1)
    let boom: string | undefined
    router.registerModule('boom', (ctx) => {
      boom = ctx.onDelivery('render', () => {
        throw new Error('body boom')
      })
    })
    const outcome = router.fire(boom!, deliveredAt(boom!, {}, []))
    expect(outcome.status).toBe('refused')
    expect(outcome.reason).toBe('body boom')
  })

  it('7. RETIRED, NO REPLACEMENT HERE — there is no per-view transform seam: no member of the five names a fragment, so the old “applies to get_markdown too” parity claim has no module-side door; graph data carries NO callable and no source text (old row 7, D-231)', () => {
    const { router, ctx } = capture()
    for (const gone of ['transform', 'transforms', 'applyTransforms', 'markdown', 'renderedHtml']) {
      expect(gone in ctx()).toBe(false)
    }
    router.registerModule('menu', (client: ClientHalfCtx) => {
      client.graph({ parent: 'root', nodes: [{ id: 'counter', label: 'Counter (0)' }] })
    })
    const recorded = router.contributions()[0]!.contribution
    for (const node of recorded.nodes) {
      for (const value of Object.values(node)) expect(typeof value).not.toBe('function')
    }
    expect(typeof recorded.parent).toBe('string')
  })
})

describe('U6 — the render seam emits VERBATIM: the transform hook is dead at the render end too (C-10, D-231, D-235)', () => {
  it('8. a Runtime handed the realm router — and the RETIRED `transformRouter` key with it — renders the DOM, the SSR fragment and the markdown all UNTRANSFORMED (old rows 1/2/7: the transform changed all three views)', () => {
    const router = new CapabilityRouter()
    router.registerModule('format', (ctx: ClientHalfCtx) => {
      // the whole registration a module can still make: an action, a listener, a contribution.
      ctx.action('upper', (fragment: unknown) => String(fragment).toUpperCase())
      ctx.onDelivery('render', () => {})
      ctx.graph({ parent: 'root', nodes: [{ id: 'extra' }] })
    })
    // the OLD option is handed in deliberately: if a transform seam comes back, this row reds.
    const runtime = new Runtime({
      mount: mountEl() as never,
      envelope: demoEnvelope() as never,
      transformRouter: router,
    } as never)
    runtime.bootstrap()

    const html = runtime.renderedHtmlResult()
    // the fragment the producing graph wrote, verbatim — the uppercase action never touched it.
    expect(html.renderedHtml).toContain('Increment (+1)')
    expect(html.renderedHtml).not.toContain('INCREMENT')
    expect(html.ssrHtml).toContain('Increment (+1)')
    expect(html.ssrHtml).not.toContain('INCREMENT')
    // and the third view agrees, so no adapter can diverge from another (C-10's parity clause).
    // the markdown adapter escapes the parentheses it reads, so the fragment arrives in ITS spelling —
    // what this row pins is that it arrives in the graph's CASE, not the action's (no uppercasing ran).
    const markdown = runtime.markdownResult().markdown
    expect(markdown).toContain('Increment \\(+1\\)')
    expect(markdown).not.toContain('INCREMENT')
  })
})
