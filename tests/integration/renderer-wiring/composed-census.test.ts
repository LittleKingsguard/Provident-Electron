// tests/integration/renderer-wiring/composed-census.test.ts — `M-18`, the row `S-18` files: the composed census
// (`docs/L3/renderer-wiring/composed-census.md` §2–§5, `D-325`'s grain rule). UNMARKED and GATING (`D-40`).
//
// WHY INTEGRATION AND NOT A BOOT (`D-324`): the subject is a RESOLUTION over a composed contribution and a registry's
// declarations, both in-process facts. A boot cannot carry a module's `capabilities.panes` where a boot-constructed
// registry would read it, and this row needs the contribution's own forest — the module's authored nodes — which is
// exactly what `RuntimeOptions.contributions` merges before `translateLegacy` (`C-6`).
//
// **WHAT THIS ROW DOES AND DOES NOT SEE.** It sees the overlay's five answers (container, head, body, collapse, grip) and
// the two lookups' `foundation ?? composed` order, the two refusals that keep the arm honest, and the two census acts
// counting the module's control and grip. **It does not see a painted pane**: the paint writes through
// `nodeIdForPane` into a rendered element, and that is the live leg's (`AL-10`/`AL-12`). No display, no Electron.
import { afterEach, describe, expect, it } from 'vitest'

import { installShim, mountEl } from '../../../src/shared/dom-shim.js'
import { demoEnvelope } from '../../../src/shared/demo-envelope.js'
import { Runtime } from '../../../src/renderer/runtime.js'
import type { CapabilityRouter } from '../../../src/renderer/extensions.js'
import {
  bodyIdForPane,
  composePaneCensus,
  composedPaneCensus,
  headIdForPane,
  installPaneCollapse,
  nodeIdForPane,
  startPaneMove,
} from '../../../src/renderer/renderer.js'
import type { GraphContribution } from '../../../src/shared/module-contract.js'
import type { PaneDeclaration } from '../../../src/shared/types.js'

/** The authored forest a module contributes for ONE pane: the container carries `props.pane` (`demo-envelope.ts:951`'s
 *  operand), the head carries the declaration's own id, and the collapse and grip are the head's children by class —
 *  **the grip carrying NO `props.pane`**, which is the measured fact that decided `ASM-CC-2`'s scope. */
function paneForest(paneId: string, zone: string): Readonly<Record<string, unknown>> {
  return {
    type: 'div',
    css: { id: `${paneId}-node`, classes: ['fixture-pane'] },
    props: { id: `${paneId}-node`, pane: paneId, zone },
    children: [
      {
        type: 'div',
        css: { id: `${paneId}-head`, classes: ['pane-head'] },
        props: { id: `${paneId}-head` },
        children: [
          {
            type: 'div',
            css: { id: `${paneId}-grip`, classes: ['pane-grab'] },
            props: { id: `${paneId}-grip`, tabindex: '0' },
            children: [{ type: 'div', css: { id: `${paneId}-grip-top` }, props: { id: `${paneId}-grip-top`, pane: paneId, zone: 'top' } }],
          },
          { type: 'div', css: { id: `${paneId}-collapse`, classes: ['pane-collapse'] }, props: { id: `${paneId}-collapse`, tabindex: '0', pane: paneId } },
        ],
      },
      { type: 'div', css: { id: `${paneId}-body` }, props: { id: `${paneId}-body` } },
    ],
  }
}

/** A router whose `contributions()` is the forest: the census reads that method and no other (`composePaneCensus` §3). */
const routerOver = (contribution: GraphContribution, module = 'fixture-module'): CapabilityRouter =>
  ({ contributions: () => [{ module, contribution }], actions: () => [], modules: () => [module] }) as unknown as CapabilityRouter

const boot = (contribution: GraphContribution): Runtime => {
  installShim()
  const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope(), contributions: () => [contribution] })
  runtime.bootstrap()
  return runtime
}

const declaration = (paneId: string): PaneDeclaration => ({ paneId, zone: 'top', head: `${paneId}-head`, body: `${paneId}-body` })

afterEach(() => {
  // THE OVERLAY IS MODULE STATE AND A ROW MUST NOT INHERIT THE PREVIOUS ONE'S ENTRIES (`ASM-CC-3`): the census is keyed by
  // pane id, so a leftover entry would answer a later row's lookup. There is no public clear, by design — the composition is
  // once per realm — so the rows below use ids no other row reuses and this hook says why nothing else is needed.
})

describe('renderer-wiring · the composed census (`S-18`, `documents/L3/renderer-wiring/composed-census.md`)', () => {
  it('M-18(i) · A MODULE PANE RESOLVES ALL FIVE ANSWERS — the container by ancestry, the head and body by declaration, the collapse and grip under the head', () => {
    const forest = paneForest('pane-module', 'top')
    const runtime = boot({ parent: 'pane-menus', nodes: [forest] })
    const census = composePaneCensus(routerOver({ parent: 'pane-menus', nodes: [forest] }), [{ module: 'fixture-module', pane: declaration('pane-module') }])
    expect(census.refused, 'a pane whose five answers resolve is not refused by name').toEqual([])
    expect(census.added, 'and it is named as added, which is what the install re-run keys on').toEqual(['pane-module'])
    expect(composedPaneCensus().get('pane-module'), 'the five answers, and the container is the head\'s nearest `props.pane` ancestor').toEqual({
      paneId: 'pane-module',
      nodeId: 'pane-module-node',
      headId: 'pane-module-head',
      bodyId: 'pane-module-body',
      collapseId: 'pane-module-collapse',
      gripId: 'pane-module-grip',
    })
    // AND THE LOOKUPS ANSWER IT THROUGH THE SAME OVERLAY — the one-line rule the paints read.
    expect(nodeIdForPane('pane-module')).toBe('pane-module-node')
    expect(headIdForPane('pane-module')).toBe('pane-module-head')
    expect(bodyIdForPane('pane-module')).toBe('pane-module-body')
    // THE TWO CENSUS ACTS COUNT IT: the collapse install walks the grown census, and the move census finds the grip and the
    // drop named `<grip>-<zone>` (the envelope's own convention, `paneMoveGripNodeOf`).
    expect(installPaneCollapse(runtime).controls, 'the foundation\'s three controls plus the module\'s one').toBe(4)
    expect(startPaneMove(runtime).grips, 'and the foundation\'s three grips plus the module\'s one').toBe(4)
  })

  it('M-18(ii) · THE FOUNDATION\'S LITERALS ARE UNMOVED AND WIN — a contribution\'s node naming `pane-a` does not displace `gutter-pane`', () => {
    const shadow = paneForest('pane-a', 'top')
    boot({ parent: 'pane-menus', nodes: [shadow] })
    composePaneCensus(routerOver({ parent: 'pane-menus', nodes: [shadow] }), [])
    expect(nodeIdForPane('pane-a'), 'the foundation\'s spelled literal answers, not the contribution\'s node').toBe('gutter-pane')
    expect(headIdForPane('pane-a')).toBe('gutter-head')
    expect(bodyIdForPane('pane-a')).toBe('gutter-body')
  })

  it('M-18(iii) · A PANE WITH NO CONTAINER REDS BY NAME AND NONE OF THE FIVE IS GUESSED — the arm every other arm rests on', () => {
    // A head with no `props.pane` ancestor: the module contributed the head and body but no container.
    const orphan = { parent: 'pane-menus', nodes: [{ type: 'div', css: { id: 'orphan-head', classes: ['pane-head'] }, props: { id: 'orphan-head' } }, { type: 'div', css: { id: 'orphan-body' }, props: { id: 'orphan-body' } }] }
    boot(orphan)
    const census = composePaneCensus(routerOver(orphan), [{ module: 'fixture-module', pane: { paneId: 'pane-orphan', head: 'orphan-head', body: 'orphan-body' } }])
    expect(census.added, 'nothing is added for a pane whose container the graph does not name').toEqual([])
    expect(census.refused, 'and the refusal names the pane AND the operand it lacked').toEqual([{ paneId: 'pane-orphan', reason: 'no-container' }])
    expect(nodeIdForPane('pane-orphan'), 'no entry, and the lookup answers its stated `null` — never the pane id (`D-174`)').toBeNull()
  })

  it('M-18(iv) · A MISS IS `null` FOR ALL THREE LOOKUPS — an undeclared id is not answered by a foundation literal or by a fallback', () => {
    boot({ parent: 'pane-menus', nodes: [] })
    composePaneCensus(routerOver({ parent: 'pane-menus', nodes: [] }), [])
    expect(nodeIdForPane('pane-nobody')).toBeNull()
    expect(headIdForPane('pane-nobody')).toBeNull()
    expect(bodyIdForPane('pane-nobody')).toBeNull()
  })
})
