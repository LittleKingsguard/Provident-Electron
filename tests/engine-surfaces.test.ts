// tests/engine-surfaces.test.ts — pins the provident-ssr 0.1.1 shared
// multi-host dispatch surface this repo adopts (the upstream REQ-GAP-4/5/3
// landings): Supervisor.dispatchAndReport ({results, dirtied}), the opt-in
// bounded requestId dedup, the public flush(), and the opt-in data-node-id
// render option (REQ-GAP-3/A2). Mirrors the upstream ssr-synthetic-event
// harness so a version bump cannot silently break our host adoption.
import { describe, it, expect, beforeAll } from 'vitest'
import { translateLegacy, Supervisor, EventBridge, DomAdapter, SSRFragmentAdapter, emitElements, diffMinimal, applyOps } from 'provident-ssr'
import { installShim, mountEl } from './helpers/dom-shim.js'

beforeAll(() => {
  installShim()
})

const ENV = {
  template: {
    root: {
      type: 'div',
      children: [
        { type: 'div', css: { id: 'counter' }, props: { id: 'counter' }, content: '0' },
        {
          type: 'button',
          css: { id: 'inc' },
          handlers: [
            {
              name: 'inc',
              event: 'click',
              body: `function (ctx) {
                const all = ctx.tree.allNodes();
                const node = all.find(function (n) { return n && n.props && n.props.id === 'counter'; });
                if (!node) return;
                const cur = Number(node.content ?? 0);
                ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: String(cur + 1) }]);
              }`,
            },
          ],
        },
      ],
    },
  },
  content: [],
  clientConfig: { runInstantiation: true, runRendering: true },
}

function producingProcess(adapter: DomAdapter | SSRFragmentAdapter, mount?: ReturnType<typeof mountEl>) {
  const t = translateLegacy(ENV)
  const sup = new Supervisor({ events: new EventBridge() })
  for (const n of t.nodes) sup.registerNode(n)
  const cr = t.root.compile(t.nodes)
  sup.recordResolved(cr.actionable)
  const nodeById = new Map(t.nodes.map((n) => [n.id, n]))
  const prevStates = new Map<string, unknown[]>()
  for (const cs of cr.actionable) {
    const arr = prevStates.get(cs.nodeId as string) ?? []
    arr.push(cs as unknown as unknown[])
    prevStates.set(cs.nodeId as string, arr)
  }
  let prevMap: Map<string, unknown> | null = null
  function render(): string {
    const actionable: unknown[] = []
    for (const group of prevStates.values()) actionable.push(...group)
    const els = emitElements(actionable as never, nodeById as never, { nodeIdAttribute: true })
    const ops = diffMinimal(prevMap as never, els as never)
    prevMap = new Map(els.map((e) => [(e as { wire: string }).wire, e]))
    applyOps(adapter, ops as never)
    return adapter instanceof SSRFragmentAdapter ? adapter.toString() : (mount ?? mountEl()).innerHTML
  }
  const nodeByCssId = (id: string) => t.nodes.find((n) => (n.css as { id?: string })?.id === id)
  async function dispatch(target: string, event: string, options: { requestId?: string }, ...args: unknown[]) {
    const report = await sup.dispatchAndReport(target, event, options, ...args)
    // dispatchAndReport consumed the pass-2 drain; refresh the render baseline
    // from the non-draining resolved store for the dirtied nodes (P4 — the
    // fragment string is untouched until the host explicitly re-renders).
    for (const id of report.dirtied) {
      const resolved = sup.getResolvedStates(id)
      if (resolved.length > 0) prevStates.set(id, resolved as unknown[])
    }
    return { report, render }
  }
  render()
  return { sup, nodeByCssId, dispatch, render }
}

describe('provident-ssr 0.1.1 shared surfaces (the adopted contract)', () => {
  it('dispatchAndReport returns {results, dirtied} with the mutated node id, after an awaited flush', async () => {
    const p = producingProcess(new DomAdapter(mountEl() as never), mountEl())
    const inc = p.nodeByCssId('inc')!
    const counter = p.nodeByCssId('counter')!
    const { report } = await p.dispatch(inc.id, 'click', {})
    expect(report.results).toEqual([undefined])
    expect(report.dirtied).toContain(counter.id)
    // the graph is settled when the promise resolves (flush-before-response)
    expect(counter.content).toBe('1')
  })

  it('requestId dedup is an opt-in bounded echo: same requestId → first report, no re-fire', async () => {
    const p = producingProcess(new DomAdapter(mountEl() as never), mountEl())
    const inc = p.nodeByCssId('inc')!
    const counter = p.nodeByCssId('counter')!
    const first = await p.dispatch(inc.id, 'click', { requestId: 'k1' })
    const second = await p.dispatch(inc.id, 'click', { requestId: 'k1' })
    expect(second.report).toEqual(first.report)
    // the counter advanced exactly once (the duplicate was an echo, not a fire)
    expect(counter.content).toBe('1')
    // a DIFFERENT requestId re-fires
    const third = await p.dispatch(inc.id, 'click', { requestId: 'k2' })
    expect(third.report.dirtied).toContain(counter.id)
    expect(counter.content).toBe('2')
  })

  it('flush() settles the pass-2 cascade deterministically', async () => {
    const p = producingProcess(new DomAdapter(mountEl() as never), mountEl())
    const inc = p.nodeByCssId('inc')!
    p.sup.dispatchEvent(inc.id, 'click')
    expect(p.sup.hasPendingWork()).toBe(true)
    await p.sup.flush()
    expect(p.sup.hasPendingWork()).toBe(false)
  })

  it('the opt-in data-node-id stamps every emitted element (DOM and SSR)', () => {
    const domMount = mountEl()
    const dom = producingProcess(new DomAdapter(domMount as never), domMount)
    const html = dom.render()
    expect(html).toMatch(/data-node-id="node-\d+"/)
    // SSR emits the SAME op stream with the same stamps (PAR-5 parity)
    const ssr = producingProcess(new SSRFragmentAdapter())
    const ssrHtml = ssr.render()
    expect(ssrHtml).toMatch(/data-node-id="node-\d+"/)
    // the stamp is present on every element (the option covers all emit sites)
    const domEls = (html.match(/data-node-id="node-\d+"/g) ?? []).length
    const ssrEls = (ssrHtml.match(/data-node-id="node-\d+"/g) ?? []).length
    expect(domEls).toBeGreaterThan(2)
    expect(ssrEls).toBeGreaterThan(2)
  })
})