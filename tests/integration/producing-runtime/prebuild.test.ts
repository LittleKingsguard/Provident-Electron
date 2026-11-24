// tests/integration/producing-runtime/prebuild.test.ts — the pre-build composition battery (`M-14`, `M-15`,
// `docs/L2/producing-runtime/interface.md` §2, `docs/L3/producing-runtime/design.md` §2): the contributions merge into the
// authored template BEFORE `translateLegacy`, in the reader's order, and a failing contribution is NAMED and skipped.
// UNMARKED and GATING. The shim stands in for the DOM, as the module's own battery does.
import { beforeAll, describe, expect, it } from 'vitest'
import { installShim, mountEl } from '../../../src/shared/dom-shim.js'
import { Runtime } from '../../../src/renderer/runtime.js'
import type { GraphContribution } from '../../../src/shared/module-contract.js'

interface Shim {
  readonly children: readonly unknown[]
}

beforeAll(() => { installShim() })

const envelope = (): never => ({
  template: { root: { type: 'div', css: { id: 'root' }, children: [{ type: 'div', css: { id: 'host' } }] } },
} as never)

const reader = (...items: GraphContribution[]) => () => items

const runtimeWith = (contributions: () => readonly GraphContribution[]): Runtime => {
  const runtime = new Runtime({ mount: mountEl() as never, envelope: envelope(), contributions })
  runtime.bootstrap()
  return runtime
}

const warningCodes = (runtime: Runtime): string[] =>
  (runtime.load({ kind: 'commands', commands: [] }).warnings as Array<{ code?: unknown }>).map((entry) => String(entry.code))

describe('producing-runtime — pre-build composition: the envelope merge before translate (§2)', () => {
  it('M-14 — a contribution is composed BEFORE the first compile, and the child stands INSIDE its declared parent', () => {
    const runtime = runtimeWith(reader({ parent: 'host', nodes: [{ type: 'span', css: { id: 'added' }, content: 'hi' }] }))
    const host = runtime.elementForNodeId('host') as unknown as Shim
    const added = runtime.elementForNodeId('added') as unknown as Shim
    expect(added, 'the authored child is a live element').toBeTruthy()
    expect(host.children.includes(added), 'and it stands INSIDE its declared parent').toBe(true)
    expect(runtime.renderedHtmlResult().renderedHtml, 'the rendered read carries the child').toContain('hi')
  })

  it('M-14b — a reader throw is NAMED and the boot continues', () => {
    const runtime = runtimeWith(() => { throw new Error('reader-boom') })
    expect(warningCodes(runtime), 'the failure is a named warning, never a throw out of the boot').toContain('contribution-reader-threw')
    expect(runtime.renderedHtmlResult().renderedHtml, 'and the authored surface still renders').toContain('id="root"')
  })

  it('M-14c — a contribution whose parent does not stand is NAMED and skipped', () => {
    const runtime = runtimeWith(reader({ parent: 'absent', nodes: [{ type: 'span', css: { id: 'orphan' }, content: 'x' }] }))
    expect(warningCodes(runtime), 'the orphan is named').toContain('contribution-parent-missing')
    expect(runtime.elementForNodeId('orphan'), 'and it is not half-attached').toBe(null)
  })

  it('M-15 — the order is the reader\'s: a later contribution attaches under an earlier one\'s node', () => {
    const runtime = runtimeWith(reader(
      { parent: 'host', nodes: [{ type: 'div', css: { id: 'added' } }] },
      { parent: 'added', nodes: [{ type: 'span', css: { id: 'nested' }, content: 'deep' }] },
    ))
    const added = runtime.elementForNodeId('added') as unknown as Shim
    const nested = runtime.elementForNodeId('nested') as unknown as Shim
    expect(nested, 'the second contribution compiled').toBeTruthy()
    expect(added.children.includes(nested), 'and it stands under the FIRST contribution, not the authored host').toBe(true)
  })
})

// ---------------------------------------------------------------------------
// `D-317` — THE RUNTIME COMPOSITION (`S-20`): the constructor stores its authored document, and `contribute` merges a
// runtime module's nodes into it through the SAME routine, re-loading through the construction path so the authored
// `handlers` survive. The serializer round-trip would drop every one of them (measured: 30 in `demoEnvelope`, 0 emitted).
// ---------------------------------------------------------------------------

const BUMP_BODY = `function (event, context) {
  const all = context.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'out'; });
  if (!node) return;
  context.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: 'after' }]);
}`

const authoredEnvelope = (): never => ({
  template: {
    root: {
      type: 'div',
      css: { id: 'root' },
      children: [
        { type: 'button', css: { id: 'bump' }, content: 'Bump', handlers: [{ name: 'bump', event: 'click', format: 'legacy', body: BUMP_BODY }] },
        { type: 'div', css: { id: 'out' }, props: { id: 'out' }, content: 'before' },
      ],
    },
  },
  content: [],
  clientConfig: { runInstantiation: true, runRendering: true },
} as never)

const authoredRuntime = (): Runtime => {
  const runtime = new Runtime({ mount: mountEl() as never, envelope: authoredEnvelope() })
  runtime.bootstrap()
  return runtime
}

describe('producing-runtime — the authored-envelope composition: `contribute` (D-317, §4)', () => {
  it('D-317(a) — `contribute` composes a module child under its parent AND the authored handler still dispatches after the re-load', async () => {
    const runtime = authoredRuntime()
    const result = runtime.contribute([{ parent: 'root', nodes: [{ type: 'div', css: { id: 'module-pane' }, content: 'module' }] }])
    expect(result.added, 'the composed ids are the contribution\'s, and only those').toEqual(['module-pane'])
    expect(result.skipped, 'nothing was refused').toEqual([])
    const root = runtime.elementForNodeId('root') as unknown as Shim
    const pane = runtime.elementForNodeId('module-pane') as unknown as Shim
    expect(pane, 'the module child is live after the re-load').toBeTruthy()
    expect(root.children.includes(pane), 'and it stands INSIDE its declared parent').toBe(true)
    const answer = await runtime.dispatch({ target: { kind: 'cssId', cssId: 'bump' }, event: 'click' })
    expect(answer.renderedHtml, 'the AUTHORED handler still dispatches: the serializer route would have dropped it').toContain('after')
  })

  it('D-317(b) — a parentless contribution is NAMED and skipped, and the graph is byte-identical afterwards', () => {
    const runtime = authoredRuntime()
    const before = runtime.renderedHtmlResult().renderedHtml
    const result = runtime.contribute([{ parent: 'absent', nodes: [{ type: 'div', css: { id: 'orphan' } }] }])
    expect(result.added).toEqual([])
    expect(result.skipped, 'the refused contribution is answered BY NAME').toEqual(['absent'])
    expect(runtime.elementForNodeId('orphan'), 'and never half-attached').toBe(null)
    expect(runtime.renderedHtmlResult().renderedHtml, 'the page did not re-render for a refusal').toBe(before)
    expect(warningCodes(runtime), 'the skip is on the warnings channel, not a throw').toContain('contribution-parent-missing')
  })

  it('D-317(c) — a boot-constructed runtime answers the AUTHORED document to the code CRUD, with the contribution inside it', () => {
    const plain = authoredRuntime()
    const plainDoc = plain.codeGet('template.root.css.id')
    expect(plainDoc.value, 'the document answers from boot, where the field used to be null until a load').toBe('root')
    expect(() => plain.codeSet('template.root.css.id', 'root'), 'and code.set writes it instead of refusing "no envelope loaded"').not.toThrow()

    const composed = runtimeWith(reader({ parent: 'host', nodes: [{ type: 'span', css: { id: 'added' }, content: 'hi' }] }))
    const host = composed.codeGet('template.root.children.0').value as { children?: Array<{ css?: { id?: string } }> }
    expect((host.children ?? []).map((child) => child.css?.id), 'the stored document is the COMPOSED one, not the authored literal').toEqual(['added'])
  })
})

