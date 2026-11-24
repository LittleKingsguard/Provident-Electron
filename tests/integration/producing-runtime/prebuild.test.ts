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
