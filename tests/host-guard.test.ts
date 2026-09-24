// tests/host-guard.test.ts — R-6, R-11, R-12 of the §4.1 RED SET of
// docs/specs/engine-pin.md (`U-ENGINE-PIN`), the §3.4 PASS-THROUGH table
// (PA-1..PA-10), the §3.5 pass-through table (P1..P7), the §3.6 shape rows
// (M1..M7) and the §5.5 strategies `S-TAB-ATOMIC-1` (P-SM-1) and
// `S-TAB-PASS-1` (P-SM-2).
//
// ===========================================================================
// AMENDED CONTRACT (spec AMENDED 2026-09-27, ruling 1 — "Pass removals
// through"). This file was rewritten in the SECOND red cycle to assert the
// amended contract; the pre-amendment rows it replaces are named inline.
//
// §2.3 / §1.3 item 3: `Runtime.applyCommand` is a **SHAPE-ONLY** predicate. It
// rejects — with `{status:'rejected'}`, never a throw, never a partial
// application — only a mutation whose SHAPE is malformed:
//   * `mutation` not an array (M1, the pre-existing guard),
//   * an element that is not a non-null object (M2),
//   * an element missing `targetProp` / carrying a non-string `targetProp` (M3).
// A **value-shaped** write is NEVER refused: a nullish / absent `value` on
// `props.<key>` / `css.<key>` (and the colon twins) is a legitimate attribute
// REMOVAL in the engine, it is APPLIED, the attribute is gone from the DOM and
// the SSR fragment, nothing throws, and siblings and other props are untouched
// (§3.4 PA-1..PA-10). The mechanism that makes it safe is the shim completion
// (`ShimElement.removeAttribute`, §2.2/§3.7) — NOT a host rejection.
//
// THE BOUNDARY (§2.3, ruling 1b): this predicate is a COMMAND-SURFACE
// predicate. It covers `provident.op` / `Runtime.applyCommand` and the
// pane-managed channel (§2.4 / tests/host-guard-panes.test.ts). Handler-
// originated writes reach `supervisor.apply` directly and are OUTSIDE it; the
// contract claims NO totality over all writes. Wrapping the engine to widen the
// boundary is a REJECTED option (§1 out-of-scope list).
//
// R-13 (the pane channel row) is NOT written in this file: ruling 2 replaced it
// with the pane-fixture rows `PF-1..PF-8`, which live in
// `tests/host-guard-panes.test.ts` + `tests/fixtures/pane-mutation-fixture.mjs`
// (§2.4a, §4.1, §5.2). The row it supersedes is named there.
// ===========================================================================
//
// TDD (second red cycle): written FIRST from the AMENDED spec. Every PA-row,
// R-6 and R-11 FAILS AS ASSERTION against the landed `mutationPropsValid`, which
// still refuses `undefined`/`null`/absent values on the attribute-path
// namespaces (`src/renderer/runtime.ts:475-493`, read) — i.e. the landed guard
// implements the SUPERSEDED pre-amendment contract.
import { describe, it, expect, beforeAll } from 'vitest'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import type { ShimElement } from '../src/shared/dom-shim.js'
import { Runtime } from '../src/renderer/runtime.js'

beforeAll(() => {
  installShim()
})

type MutableEnvelope = {
  template: { root: { type: string; css?: Record<string, unknown>; props?: Record<string, unknown>; children?: unknown[] } }
  content: unknown[]
  clientConfig: { runInstantiation: boolean; runRendering: boolean }
}

/** §4.2 — the pinned scenario envelope. */
function baseEnvelope(): MutableEnvelope {
  return {
    template: {
      root: {
        type: 'div',
        css: { id: 'r' },
        props: { id: 'r' },
        children: [
          { type: 'div', css: { id: 'n-inert' }, props: { id: 'n-inert', inert: 'true' } },
          { type: 'div', css: { id: 'n-hidden' }, props: { id: 'n-hidden', hidden: 'true' } },
          { type: 'div', css: { id: 'n-ro' }, props: { id: 'n-ro', readonly: 'false' } },
          { type: 'div', css: { id: 'n-plain' } },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}

/** §3.5 P2's envelope — a VALUE_FORMS tag (`input`) with an authored `value`. */
function inputEnvelope(): MutableEnvelope {
  return {
    template: {
      root: {
        type: 'div',
        css: { id: 'r' },
        props: { id: 'r' },
        children: [{ type: 'input', css: { id: 'in1' }, props: { id: 'in1', value: '7' } }],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}

function boot(env: MutableEnvelope = baseEnvelope()): Runtime {
  const r = new Runtime({ mount: mountEl() as never, envelope: env as never })
  r.bootstrap()
  return r
}

/** The engine nodeId of the node authored at `css.id === cssId` — the
 *  authoritative target vocabulary (§4.2). */
function nodeId(r: Runtime, cssId: string): string {
  const found = r.listTargets().nodes.find((n) => (n as { cssId?: string }).cssId === cssId) as { nodeId: string } | undefined
  if (!found) throw new Error(`host-guard harness: no node authored at css.id '${cssId}'`)
  return found.nodeId
}

/** The RAW engine `Node` for a nodeId. Needed only by the KIND-SCOPE row
 *  (§2.3): the engine's `layer-apply` op requires `op.target` to be a real
 *  `Node` object (`dist/core/supervisor.js:894`, read: `op.target must be a
 *  Node`), and the host exposes no public accessor for one. This is a
 *  TEST-ONLY reach into the runtime's supervisor — the same technique
 *  `tests/host-guard-panes.test.ts:93-95` already uses for
 *  `panels.supervisor.allNodes()`. It adds no `src/**` surface. */
function engineNodeOf(r: Runtime, nodeIdValue: string): unknown {
  const sup = (r as unknown as { supervisor: { getNode(id: string): unknown } }).supervisor
  const n = sup.getNode(nodeIdValue)
  if (!n) throw new Error(`host-guard harness: no live engine Node for '${nodeIdValue}'`)
  return n
}

/** The raw shim element for a node, walked from the mount's element tree. */
function shimElOf(r: Runtime, nodeIdValue: string): ShimElement | null {
  const mount = (r as unknown as { mount: ShimElement }).mount
  const walk = (el: unknown): unknown => {
    const e = el as { children?: unknown[]; getAttribute?: (k: string) => string | null }
    if (typeof e.getAttribute === 'function' && e.getAttribute('data-node-id') === nodeIdValue) return el
    for (const c of e.children ?? []) {
      const hit = walk(c)
      if (hit) return hit
    }
    return null
  }
  return walk(mount) as ShimElement | null
}

// ---- the test-only attribute extractor (§4 shared harness) ----------------
function attrsOfTag(html: string, tag: string): Map<string, string | null> | null {
  const lower = html.toLowerCase()
  const i = lower.indexOf('<' + tag.toLowerCase())
  if (i === -1) return null
  let j = i + 1 + tag.length
  let quote: string | null = null
  while (j < html.length) {
    const ch = html[j]
    if (quote !== null) {
      if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'") {
      quote = ch
    } else if (ch === '>') {
      break
    }
    j++
  }
  const inner = html.slice(i + 1 + tag.length, j)
  const out = new Map<string, string | null>()
  let k = 0
  while (k < inner.length) {
    while (k < inner.length && /\s/.test(inner[k])) k++
    if (k >= inner.length) break
    let name = ''
    while (k < inner.length && !/[\s=]/.test(inner[k])) name += inner[k++]
    while (k < inner.length && /\s/.test(inner[k])) k++
    let value: string | null = null
    if (inner[k] === '=') {
      k++
      while (k < inner.length && /\s/.test(inner[k])) k++
      if (inner[k] === '"' || inner[k] === "'") {
        const q = inner[k++]
        let v = ''
        while (k < inner.length && inner[k] !== q) v += inner[k++]
        k++
        value = v
      } else {
        let v = ''
        while (k < inner.length && !/\s/.test(inner[k])) v += inner[k++]
        value = v
      }
    }
    if (name) out.set(name, value)
  }
  return out
}

/** The FIRST tag carrying `attr="value"` — several tags share a tag name, so
 *  the tag NAME alone is not a locator (§4.2). */
function findTagByAttr(html: string, attr: string, value: string): { tag: string; start: number } | null {
  let i = 0
  while (true) {
    const lt = html.indexOf('<', i)
    if (lt === -1) return null
    const rest = html.slice(lt + 1)
    if (rest.startsWith('/')) {
      i = lt + 1
      continue
    }
    const m = /^([a-zA-Z][a-zA-Z0-9-]*)/.exec(rest)
    if (!m) {
      i = lt + 1
      continue
    }
    const tag = m[1]
    let j = lt + 1 + tag.length
    let quote: string | null = null
    while (j < html.length) {
      const ch = html[j]
      if (quote !== null) {
        if (ch === quote) quote = null
      } else if (ch === '"' || ch === "'") {
        quote = ch
      } else if (ch === '>') {
        break
      }
      j++
    }
    const map = attrsOfTag(html.slice(lt, j + 1), tag)
    if (map && map.get(attr) === value) return { tag, start: lt }
    i = j + 1
  }
}

/** The attributes of the tag carrying `data-node-id="<nodeId>"`. */
function attrsOfNode(html: string, nodeIdValue: string): Map<string, string | null> {
  const hit = findTagByAttr(html, 'data-node-id', nodeIdValue)
  if (!hit) throw new Error(`host-guard harness: no tag carries data-node-id="${nodeIdValue}"`)
  return attrsOfTag(html.slice(hit.start), hit.tag)!
}

const MUT = (targetProp: unknown, value?: unknown, withValue = true) =>
  withValue ? { targetProp, mode: 'replace', value } : { targetProp, mode: 'replace' }

/** The §3.4 spellings: the DOT forms are the engine-effective mutation
 *  namespaces (`dist/core/node.js:1422`, `:1427`, read); the colon twins are
 *  the ADAPTER's op-name spelling and are INERT as mutation targets (§2.3,
 *  defect fix (a)). Only the dot forms carry a removal observation. */
const DOT_FORMS = ['props.hidden', 'css.role']

describe('the host-side shape guard — the amended PASS-THROUGH contract (spec §2.3, §3.4, §3.5, §4.1)', () => {
  it('R-6 props.X: undefined is APPLIED as an attribute removal, never thrown', () => {
    // States:
    //   S1 `props.hidden: undefined` → NO throw out of `op()`
    //   S2 `.status === 'applied'` (the removal passes through — ruling 1)
    //   S3 `hidden` is ABSENT from the re-rendered DOM (the shim's
    //      `getAttribute('hidden') === null`) and from the SSR fragment
    //   S4 siblings and other props are untouched
    //   S5 `applyCommand` (the direct seam) returns the same verdict
    //
    // (Superseded row: the pre-amendment R-6 asserted `{status:'rejected'}` for
    //  the same mutation. That assertion is now a FALSE POSITIVE — §3.4 G1/G3
    //  are SUPERSEDED BY ruling 1 and replaced by PA-1/PA-4.)
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const siblingId = nodeId(r, 'n-inert')
    const before = r.renderedHtmlResult()

    // S1/S2 — a function CALL, so a throw is reported as this row's failure.
    let res!: { status: string; renderedHtml: string; ssrHtml: string }
    expect(() => {
      res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.hidden', undefined)] })
    }).not.toThrow()
    expect(res.status).toBe('applied')

    // S3 — gone from the DOM shim AND from the serializations.
    expect(shimElOf(r, id)?.getAttribute('hidden')).toBe(null)
    expect(res.renderedHtml.includes('hidden=')).toBe(false)
    expect(res.ssrHtml.includes('hidden=')).toBe(false)
    expect(attrsOfNode(r.renderedHtmlResult().renderedHtml, id).has('hidden')).toBe(false)

    // S4 — the sibling node is byte-identical to the bootstrap render.
    expect(attrsOfNode(r.renderedHtmlResult().renderedHtml, siblingId)).toEqual(
      attrsOfNode(before.renderedHtml, siblingId),
    )
    expect(shimElOf(r, siblingId)?.getAttribute('inert')).toBe('true')

    // S5 — the direct seam agrees.
    let direct!: { status: string }
    expect(() => {
      direct = r.applyCommand({ kind: 'state-slice', node: id, mutation: [MUT('props.hidden', undefined)] })
    }).not.toThrow()
    expect(direct.status).toBe('applied')
  })

  it('R-11 css.<key>: undefined is APPLIED as an attribute removal; a defined css.<key> still applies', () => {
    // States:
    //   S1 PA-5 — `css.role: undefined` → `applied`, `role` absent from the DOM
    //      and the SSR fragment, no throw
    //   S2 P1 — a defined `css.role: 'v'` still applies and renders `role="v"`
    //   S3 the defined write is not affected by the earlier removal
    //
    // The target is spelled `css.role` — the ENGINE-EFFECTIVE namespace
    // (`Node.applySlice` matches `css.`, §2.3 defect fix (a)); the pre-amendment
    // row's `css:X` spelling was the adapter's op-name and is inert.
    // (Superseded row: the pre-amendment R-11 asserted `{status:'rejected'}` for
    //  the undefined half. §3.4 G4 is SUPERSEDED BY ruling 1 → PA-5.)
    const r = boot()
    const id = nodeId(r, 'n-inert')

    // S1 — applied + removal.
    let removed!: { status: string; renderedHtml: string; ssrHtml: string }
    expect(() => {
      removed = r.op({ kind: 'state-slice', node: id, mutation: [MUT('css.role', undefined)] })
    }).not.toThrow()
    expect(removed.status).toBe('applied')
    expect(shimElOf(r, id)?.getAttribute('role')).toBe(null)
    expect(removed.renderedHtml.includes('role=')).toBe(false)
    expect(removed.ssrHtml.includes('role=')).toBe(false)

    // S2/S3 — the CONTROL: a defined value still applies (P1).
    const applied = r.op({ kind: 'state-slice', node: id, mutation: [MUT('css.role', 'v')] })
    expect(applied.status).toBe('applied')
    expect(attrsOfNode(applied.renderedHtml, id).get('role')).toBe('v')
  })

  it('R-12 shape-malformed mutations are rejected, never thrown (shape is the predicate\'s ONLY reject class)', () => {
    // M1..M7 as a fixed table (§3.6). M1/M4..M7 are PRE-EXISTING guards
    // (`src/renderer/runtime.ts:383-414`); M2/M3 are this unit's predicate, and
    // post-amendment they are its ONLY reject class. Each row asserts
    // `{status:'rejected'}`, no throw, and an unchanged graph.
    //
    // M8 (the pane channel's skip-whole behaviour) is carried by
    // `tests/host-guard-panes.test.ts` (PF-5) — it is the pane half of the
    // reject class and needs the pane fixture (§2.4a).
    //
    // (Superseded row: the pre-amendment R-12 also carried the nullish-VALUE
    //  rows. Those are SUPERSEDED BY ruling 1 and replaced by the §3.4 PA-rows.)
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const before = r.renderedHtmlResult().renderedHtml
    const cases: Array<{ id: string; cmd: Record<string, unknown> }> = [
      { id: 'M1 non-array mutation (string)', cmd: { kind: 'state-slice', node: id, mutation: 'x' } },
      { id: 'M1 non-array mutation (object)', cmd: { kind: 'state-slice', node: id, mutation: {} } },
      { id: 'M1 missing mutation', cmd: { kind: 'state-slice', node: id } },
      { id: 'M2 mutation element null', cmd: { kind: 'state-slice', node: id, mutation: [null] } },
      { id: 'M2 mutation element string', cmd: { kind: 'state-slice', node: id, mutation: ['x'] } },
      { id: 'M2 mutation element number', cmd: { kind: 'state-slice', node: id, mutation: [42] } },
      { id: 'M3 element missing targetProp', cmd: { kind: 'state-slice', node: id, mutation: [{ mode: 'replace', value: 'x' }] } },
      { id: 'M3 element non-string targetProp', cmd: { kind: 'state-slice', node: id, mutation: [{ targetProp: 42, mode: 'replace', value: 'x' }] } },
      { id: 'M4 node does not resolve', cmd: { kind: 'state-slice', node: 'no-such-node', mutation: [MUT('props.x', 'v')] } },
      { id: 'M5 node is a number', cmd: { kind: 'state-slice', node: 42, mutation: [MUT('props.x', 'v')] } },
      { id: 'M6 node is a plain non-Node object', cmd: { kind: 'state-slice', node: { foo: 1 }, mutation: [MUT('props.x', 'v')] } },
      { id: 'M7 cmd is null', cmd: null as never },
      { id: 'M7 cmd is undefined', cmd: undefined as never },
      { id: 'M7 cmd is a primitive', cmd: 'x' as never },
    ]
    for (const { id: label, cmd } of cases) {
      expect(() => r.applyCommand(cmd as never), label).not.toThrow()
      expect(r.applyCommand(cmd as never), label).toEqual({ status: 'rejected' })
      expect(r.renderedHtmlResult().renderedHtml, label).toBe(before)
    }
  })

  // -------------------------------------------------------------------
  // §3.4 — the PASS-THROUGH table PA-1..PA-10 (ruling 1).
  // Every row is APPLIED: `{status:'applied'}`, no throw, the attribute gone
  // from the DOM and the SSR output, siblings and other props untouched.
  // Nothing here is a fail-state any more; the only fail-states left in this
  // family are §3.6's SHAPE rejections (the M-table above).
  // -------------------------------------------------------------------
  it('§3.4 PA-1 — props.hidden: undefined is applied and the attribute is absent', () => {
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.hidden', undefined)] })
    expect(res.status).toBe('applied')
    expect(shimElOf(r, id)?.getAttribute('hidden')).toBe(null)
    expect(attrsOfNode(res.renderedHtml, id).has('hidden')).toBe(false)
    expect(res.ssrHtml.includes('hidden=')).toBe(false)
  })

  it('§3.4 PA-2 — props.hidden: null is applied (an attribute removal on the ATTRIBUTE paths)', () => {
    // AF-7 boundary: `null` is an attribute removal on the attribute paths, but
    // on a VALUE_FORMS tag it is stringified rather than cleared — see PF-3.
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.hidden', null)] })
    expect(res.status).toBe('applied')
    expect(shimElOf(r, id)?.getAttribute('hidden')).toBe(null)
    expect(attrsOfNode(res.renderedHtml, id).has('hidden')).toBe(false)
    expect(res.ssrHtml.includes('hidden=')).toBe(false)
  })

  it('§3.4 PA-3 — a nullish removal plus a sibling defined write: siblings untouched, whole batch applied', () => {
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const res = r.op({
      kind: 'state-slice',
      node: id,
      mutation: [MUT('props.hidden', undefined), MUT('props.title', 't')],
    })
    expect(res.status).toBe('applied')
    const attrs = attrsOfNode(res.renderedHtml, id)
    expect(attrs.has('hidden')).toBe(false)
    expect(attrs.get('title')).toBe('t')
    expect(shimElOf(r, id)?.getAttribute('hidden')).toBe(null)
  })

  it('§3.4 PA-4 — an ABSENT value key is the same removal as an explicit undefined (AF-7)', () => {
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.hidden', undefined, false)] })
    expect(res.status).toBe('applied')
    expect(shimElOf(r, id)?.getAttribute('hidden')).toBe(null)
    expect(attrsOfNode(res.renderedHtml, id).has('hidden')).toBe(false)
    expect(res.ssrHtml.includes('hidden=')).toBe(false)
  })

  it('§3.4 PA-5 — css.role: undefined removes the attribute on the adapter\'s css path', () => {
    const r = boot()
    const id = nodeId(r, 'n-inert')
    // Author the css attribute first so the removal has an observable.
    const seeded = r.op({ kind: 'state-slice', node: id, mutation: [MUT('css.role', 'note')] })
    expect(seeded.status).toBe('applied')
    expect(attrsOfNode(seeded.renderedHtml, id).get('role')).toBe('note')

    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('css.role', undefined)] })
    expect(res.status).toBe('applied')
    expect(shimElOf(r, id)?.getAttribute('role')).toBe(null)
    expect(attrsOfNode(res.renderedHtml, id).has('role')).toBe(false)
    expect(res.ssrHtml.includes('role=')).toBe(false)
  })

  it('§3.4 PA-6 (AMENDED) — props.id: undefined CANNOT remove the id on provident-ssr@0.5.1: the auto-mint fill re-materialises it', () => {
    // ENGINE REALITY (verified by reading the installed dist this session). The
    // adapter's prop-attr `undefined` branch DOES call `removeAttribute('id')`
    // (`dist/core/adapters.js:296-298`, read) — but that branch is never
    // reached for this write: the node's AUTO-MINT FILL rewrites a non-string
    // `props.id` to `preempt-node-<nodeId>` BEFORE compile
    // (`dist/core/node.js:1908-1912`, read: `ensureAutoIds()`, the assignment
    // at `:1910`), so the adapter is handed a DEFINED id and the `id` attribute
    // STAYS. The row is relabelled to that observed reality: the pre-amendment
    // claim ("the `id` attribute is absent") is FALSE on this engine, and the
    // `props.id` route CANNOT remove an id here.
    //
    // The route that DOES remove an id is PA-7's `css.id` (the adapter's `css:`
    // branch, `dist/core/adapters.js:217-218`, read) — that row is unchanged and
    // is the one that proves removal.
    //
    // The row stays FALSIFIABLE (and is not weakened): it asserts the attribute
    // is PRESENT and is NOT the authored id, so an engine that stops
    // auto-minting (or a host that routes the id away) fails it.
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    // Pre-state: the AUTHORED id is present before the write.
    expect(shimElOf(r, id)?.getAttribute('id')).toBe('n-hidden')

    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.id', undefined)] })
    expect(res.status).toBe('applied')

    // Post-state: the authored id is gone, but the ATTRIBUTE is not — the
    // auto-mint fill replaced it. Per the AMENDED §3.4 PA-6 the synthesized
    // form is RECORDED, NOT PINNED (a later engine may re-spell the fill), so
    // the observables are "present" + "≠ the authored id"; the exact observed
    // form (`preempt-node-<nodeId>` today, `dist/core/node.js:1910`) is carried
    // in the assertion messages so the record is visible.
    const shimId = shimElOf(r, id)?.getAttribute('id')
    expect(
      shimId,
      `props.id cannot remove the id on this engine — the auto-mint fill re-materialises it (observed: ${String(shimId)})`,
    ).not.toBe(null)
    expect(shimId, `the AUTHORED id does not survive (observed: ${String(shimId)})`).not.toBe('n-hidden')
    const serializedId = attrsOfNode(res.renderedHtml, id)
    expect(serializedId.has('id'), 'the id attribute stays — it is NOT removed').toBe(true)
    expect(serializedId.get('id'), 'the serialized id agrees with the shim slot').toBe(shimId)
    expect(res.ssrHtml.includes('id="n-hidden"'), 'the AUTHORED id does not survive in the SSR fragment').toBe(false)
  })

  it('§3.4 PA-7 — css.id: undefined removes the id through the adapter\'s css path (a DIFFERENT route)', () => {
    // PA-6's `props.id` route CANNOT remove an id on this engine (the
    // auto-mint fill re-materialises it, `dist/core/node.js:1908-1912`, read);
    // THIS row is the route that removes — the adapter's `css:` branch
    // (`elem.id = ''`, `dist/core/adapters.js:217-218`, read). Both are
    // asserted so a later pass cannot mistake one for the other.
    const r = boot()
    const id = nodeId(r, 'n-inert')
    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('css.id', undefined)] })
    expect(res.status).toBe('applied')
    expect(shimElOf(r, id)?.getAttribute('id')).toBe(null)
    expect(attrsOfNode(res.renderedHtml, id).has('id')).toBe(false)
  })

  it('§3.4 PA-8 — a 3-element batch with a nullish MIDDLE element applies WHOLE (never refused)', () => {
    // The pre-amendment "atomic reject" shape (G7) is GONE: the host never
    // half-applies a MALFORMED batch, and never refuses a VALUE-SHAPED one.
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const res = r.op({
      kind: 'state-slice',
      node: id,
      mutation: [
        MUT('props.title', 't'), // defined write 1
        MUT('props.hidden', undefined), // the nullish removal, in the middle
        { targetProp: 'content', mode: 'replace', value: 'X' }, // defined write 2
      ],
    })
    expect(res.status).toBe('applied')
    const attrs = attrsOfNode(res.renderedHtml, id)
    expect(attrs.has('hidden')).toBe(false) // the removal applied
    expect(attrs.get('title')).toBe('t') // defined write 1 applied
    expect(res.renderedHtml).toContain('>X<') // defined write 2 applied
  })

  it('§3.4 PA-9 — the COLON spelling is INERT as a mutation target (pinned verdict: applied, nothing removed)', () => {
    // `Node.applySlice` matches `props.`/`css.`/`hooks.` only (§2.3 defect fix
    // (a)); `css:<key>` is the ADAPTER's op-name, so the key matches NO branch
    // and the mutation is silently INERT. The host does not refuse it (no
    // value-shaped write is refused anywhere), and the row exists to RECORD the
    // boundary: use `css.<key>` to prove a removal.
    //
    // STRENGTHENED (adversarial finding #9). The pre-strengthening row asserted
    // only `typeof res.status === 'string'` plus a pre-existing `null` — a
    // near-tautology that could not fail whatever the engine did. The verdict is
    // now PINNED to the OBSERVED one (the blind re-run measured `status=applied`,
    // `roleStillPresent=true` for exactly this row: `docs/specs/engine-pin-greens.md:157`,
    // read), and the attribute is asserted present-and-unchanged ACROSS the call
    // rather than merely absent-by-authorship.
    //
    // FALSIFIABILITY (kept, and the point of the strengthening): the row fails
    // if (i) the host refuses a VALUE-shaped write (status would be `'rejected'`
    // — the false positive ruling 1 removed), or (ii) the colon spelling starts
    // being treated as a mutation target and the attribute is written/removed.
    // A value-INSPECTING guard fails here; that is intended.
    const r = boot()
    const id = nodeId(r, 'n-inert')
    const before = attrsOfNode(r.renderedHtmlResult().renderedHtml, id)
    expect(before.has('role'), 'the n-inert node authors no `role` (the row\'s start state)').toBe(false)

    let res!: { status: string }
    expect(() => {
      res = r.applyCommand({ kind: 'state-slice', node: id, mutation: [MUT('css:role', undefined)] } as never)
    }).not.toThrow()

    // The engine's own verdict, PINNED to the observed string: an inert mutation
    // that removed nothing is still an applied state-slice.
    expect(res.status).toBe('applied')
    // The colon spelling removed NOTHING — the attribute is absent before AND
    // after (the mutation target matched no `applySlice` branch).
    expect(shimElOf(r, id)?.getAttribute('role')).toBe(null)
    expect(attrsOfNode(r.renderedHtmlResult().renderedHtml, id).has('role')).toBe(false)
    // ...and the node is otherwise byte-identical: no collateral write.
    expect(attrsOfNode(r.renderedHtmlResult().renderedHtml, id)).toEqual(before)
  })

  it('§3.4 PA-10 — a BARE attribute name with a nullish value is INERT (pinned: applied, node unchanged) + the `props.` control removes', () => {
    // AF-5 disposition: the bare name is ALLOWED and the guard inspects no
    // `value`, so it is neither covered nor refused. What the row must state
    // precisely (and what the pre-strengthening row left as a disjunction) is
    // the OBSERVED verdict: the blind re-run measured the bare form as INERT —
    // `nullishBare status=applied` with the DOM UNCHANGED before and after, and
    // a DEFINED bare write (`title:'v'`) also unchanged, while the `props.title`
    // control on the same node DOES remove (`docs/specs/engine-pin-greens.md:158`,
    // finding `F-1`, read).
    //
    // STRENGTHENED (adversarial finding #9): `removed || unchanged` accepted
    // anything; the row now pins `applied`, asserts the node byte-identical
    // ACROSS the call, and keeps a CONTROL on the SAME node showing the
    // `props.`-prefixed route does remove — so the inertness belongs to the bare
    // spelling and not to the harness.
    //
    // FALSIFIABILITY: fails on a host rejection of a value-shaped write, on the
    // bare spelling becoming a mutation target (the attribute would move), and
    // on the control failing to remove.
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const before = attrsOfNode(r.renderedHtmlResult().renderedHtml, id)
    expect(before.get('hidden'), 'n-hidden authors hidden="true" (the row\'s start state)').toBe('true')

    let res!: { status: string }
    expect(() => {
      res = r.applyCommand({ kind: 'state-slice', node: id, mutation: [MUT('hidden', undefined)] } as never)
    }).not.toThrow()

    expect(res.status).toBe('applied')
    const after = attrsOfNode(r.renderedHtmlResult().renderedHtml, id)
    expect(after, 'the bare spelling is INERT: the node is unchanged across the call').toEqual(before)
    expect(after.get('hidden'), 'the attribute is still present, still the authored form').toBe('true')
    expect(shimElOf(r, id)?.getAttribute('hidden')).toBe('true')

    // THE CONTROL (§3.4 PA-1's route on the SAME node): the `props.`-prefixed
    // spelling DOES remove — so "unchanged" above is the bare spelling's
    // inertness, not a harness that cannot remove.
    let control!: { status: string }
    expect(() => {
      control = r.applyCommand({ kind: 'state-slice', node: id, mutation: [MUT('props.hidden', undefined)] } as never)
    }).not.toThrow()
    expect(control.status).toBe('applied')
    expect(shimElOf(r, id)?.getAttribute('hidden'), 'the props. route removes on the same node').toBe(null)
    expect(attrsOfNode(r.renderedHtmlResult().renderedHtml, id).has('hidden')).toBe(false)
  })

  // -------------------------------------------------------------------
  // §3.5 — the pass-through table P1..P7. Post-amendment the REASON these are
  // pass-through has changed: the guard no longer discriminates on `value` at
  // all, so a reject here would be a SHAPE false positive, not a nullish-value
  // one. The rows stand (§3.5).
  // -------------------------------------------------------------------
  it('§3.5 P1 — props.X with a defined string applies', () => {
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.title', 'v')] })
    expect(res.status).toBe('applied')
    expect(res.renderedHtml).toContain('title="v"')
  })

  it('§3.5 P2 — props.value: "" on a VALUE_FORMS tag applies and the value slot is ""', () => {
    const r = boot(inputEnvelope())
    const id = nodeId(r, 'in1')
    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.value', '')] })
    expect(res.status).toBe('applied')
    expect(shimElOf(r, id)?.value).toBe('')
  })

  it('§3.5 P3 — props.data-on: "false" applies (falsy ≠ nullish)', () => {
    const r = boot()
    const id = nodeId(r, 'n-inert')
    const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.data-on', 'false')] })
    expect(res.status).toBe('applied')
    expect(res.renderedHtml).toContain('data-on="false"')
  })

  it('§3.5 P4 — an array / object props value is not rejected by the predicate', () => {
    const r = boot()
    const id = nodeId(r, 'n-inert')
    const arr = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.tags', ['x'])] })
    // "not rejected BY THE PREDICATE" — the engine's own verdict is recorded, not pinned.
    expect(arr.status).not.toBe('rejected')
    expect(arr.renderedHtml).toContain('tags="x"')

    const obj = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.tags', { a: 1 })] })
    expect(obj.status).not.toBe('rejected')
    expect(obj.renderedHtml).toContain('tags=')
  })

  it('§3.5 P5 — props.X: 0 / false apply (falsy, defined)', () => {
    const r = boot()
    const id = nodeId(r, 'n-inert')
    const zero = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.zero', 0)] })
    expect(zero.status).toBe('applied')
    expect(zero.renderedHtml).toContain('zero="0"')
    const no = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.no', false)] })
    expect(no.status).toBe('applied')
    expect(no.renderedHtml).toContain('no="false"')
  })

  it('§3.5 P6 — a zero-mutation batch applies (the engine\'s no-op verdict is not pinned)', () => {
    const r = boot()
    const id = nodeId(r, 'n-inert')
    const res = r.op({ kind: 'state-slice', node: id, mutation: [] })
    expect(res.status).not.toBe('rejected')
  })

  it('§3.5 P7 — a non-state-slice/layer-apply kind is not intercepted by this predicate', () => {
    // The predicate is KIND-scoped: a kind it does not study keeps the ENGINE's
    // verdict. Boundary (§2.3): kinds that reach `applyCommand` are covered for
    // SHAPE; handler-originated writes of ANY kind are not covered at all.
    const r = boot()
    const id = nodeId(r, 'n-inert')
    const before = r.renderedHtmlResult().renderedHtml
    let res: { status: string } | null = null
    expect(() => {
      res = r.applyCommand({ kind: 'rows-clear', node: id, mutation: [MUT('props.probe', undefined)] } as never)
    }).not.toThrow()
    expect(res).not.toBeNull()
    expect(typeof (res as unknown as { status: string }).status).toBe('string')
    expect(r.renderedHtmlResult().renderedHtml).toBe(before)
    // The SAME mutation under a studied kind is NOT rejected either — the
    // pre-amendment "rejected" expectation is superseded by ruling 1.
    expect(r.applyCommand({ kind: 'state-slice', node: id, mutation: [MUT('props.probe', undefined)] }).status).toBe('applied')
  })

  it('§3.4 G8 — a `content` target with undefined is NOT rejected by this predicate (SUPERSEDED-framing row kept)', () => {
    // G8 STANDS (it was already pass-through); post-amendment it is one row
    // among the PA-rows, not an exception.
    const r = boot()
    const id = nodeId(r, 'n-hidden')
    expect(() =>
      r.applyCommand({ kind: 'state-slice', node: id, mutation: [{ targetProp: 'content', mode: 'replace', value: undefined }] }),
    ).not.toThrow()
    const res = r.applyCommand({ kind: 'state-slice', node: id, mutation: [{ targetProp: 'content', mode: 'replace', value: undefined }] })
    expect(res.status).not.toBe('rejected')
  })

  it('§2.3 the SHAPE predicate is KIND-scoped — it is reached for BOTH studied kinds (a WELL-FORMED layer-apply is not refused for a nullish value)', () => {
    // THE ROW'S REAL CLAIM is the KIND-SCOPE claim: the predicate is called for
    // `state-slice` AND `layer-apply` (`src/renderer/runtime.ts:425`, read). It
    // is NOT a claim that a layer-apply carries a removal — the engine's
    // `layer-apply` is the MINT-AND-WIRE op and IGNORES `mutation` entirely.
    //
    // States (each on its own `boot()`, so no graph state leaks between them):
    //   S1 CONTROL — a WELL-FORMED `layer-apply` (a real engine `Node` as
    //      `target` + an array `nodes` + a `layerId` + an ARRAY `mutation`,
    //      which the host's own pre-existing F6 guard requires:
    //      `src/renderer/runtime.ts:411-413`, read) with a ZERO-element
    //      `mutation`: the ENGINE's own verdict for the op shape.
    //      `dist/core/supervisor.js:1188-1225` (read): the branch needs
    //      `target` + `nodes`; a `layer-apply` WITHOUT them is the engine's own
    //      `rejected` (`unknown-node`, `:1198-1199`) — which is why the row as
    //      previously written pinned an `applied` the engine never returned for
    //      its op shape.
    //   S2 the SAME well-formed op + a nullish value-shaped mutation
    //      (`props.hidden: undefined`): the verdict is the SAME as S1's — the
    //      predicate was CALLED for `layer-apply` and did NOT inspect `value`.
    //      The engine's own result keys ride along (`dirtied` present); a host
    //      rejection is the BARE `{status:'rejected'}` and nothing else
    //      (`src/renderer/runtime.ts:425-426` — the predicate call and its
    //      bare rejection; `:451-455` — the engine result's keys copied
    //      through). A predicate that inspects `value` fails this row.
    //   S3 the same well-formed op + a SHAPE-MALFORMED mutation → the
    //      predicate's own `{status:'rejected'}` — the kind is studied for
    //      SHAPE too, and nothing is applied.
    // No removal observation is claimed anywhere here, and the row asserts the
    // true one explicitly: `hidden` is STILL present after S2/S3.
    const LAYER = (target: unknown, mutation: unknown[] = []) => ({
      kind: 'layer-apply',
      target,
      nodes: [],
      layerId: 'host-guard-kind-scope-probe',
      mutation,
    })

    // S1 — the control: the engine's verdict for a well-formed layer-apply.
    const r1 = boot()
    const id1 = nodeId(r1, 'n-hidden')
    const control = r1.op(LAYER(engineNodeOf(r1, id1)))
    expect(control.status, 'the engine applies a well-formed layer-apply').toBe('applied')

    // S2 — the same op shape + a nullish (value-shaped) mutation. The verdict
    // is asserted RELATIVE to S1's control, not as a bare `applied`: the
    // amended §2.3 pins no verdict for a mutation-carrying `layer-apply` op
    // shape the engine refuses, and S1 is where this row pins the engine's
    // verdict for the well-formed shape (once).
    const r2 = boot()
    const id2 = nodeId(r2, 'n-hidden')
    const res = r2.op(LAYER(engineNodeOf(r2, id2), [MUT('props.hidden', undefined)]))
    expect(res.status, 'the predicate did not intervene — a value-shaped write is never refused').toBe(control.status)
    expect(res.dirtied, 'the ENGINE ran (a host rejection returns the bare {status:\'rejected\'})').toBeDefined()
    expect(res.status, 'a value-inspecting predicate returns {status:\'rejected\'} here').not.toBe('rejected')
    expect(shimElOf(r2, id2)?.getAttribute('hidden'), 'no removal is claimed: layer-apply ignores `mutation`').toBe('true')

    // S3 — the same op shape + a SHAPE-malformed mutation: the predicate's own
    // reject class, reached for this kind too.
    const r3 = boot()
    const id3 = nodeId(r3, 'n-hidden')
    const refused = r3.applyCommand(LAYER(engineNodeOf(r3, id3), [null]) as never)
    expect(refused, 'a SHAPE-malformed element is refused for layer-apply too').toEqual({ status: 'rejected' })
    expect(shimElOf(r3, id3)?.getAttribute('hidden')).toBe('true')
  })

  // -------------------------------------------------------------------
  // P-SM-1 (state-machine) — strategy id `S-TAB-ATOMIC-1`.
  // REWRITTEN (ruling 1): TWO fixed tables, fixed order.
  //   (a) 3 rotations of `{props.hidden:<nullish>, props.title:'t', content:'X'}`
  //       — the rotation names which element is nullish — each asserting
  //       `{status:'applied'}` + `hidden` absent + `title="t"` + the `content`
  //       change observable.
  //   (b) the same 3-batch with one element MALFORMED (non-object / no
  //       `targetProp`) instead of nullish, each asserting `{status:'rejected'}`
  //       and ALL THREE observables unchanged.
  // Both halves are required: (a) proves the removal passes through, (b) proves
  // refusal is still ATOMIC for shape.
  // -------------------------------------------------------------------
  const ATOMIC_ROTATIONS: Array<{ label: string; nullishAt: number }> = [
    { label: 'batch[0] nullish', nullishAt: 0 },
    { label: 'batch[1] nullish', nullishAt: 1 },
    { label: 'batch[2] nullish', nullishAt: 2 },
  ]
  for (const { label, nullishAt } of ATOMIC_ROTATIONS) {
    it(`P-SM-1 [S-TAB-ATOMIC-1] ${label} — the nullish batch is APPLIED whole (removal + both defined writes)`, () => {
      const r = boot()
      const id = nodeId(r, 'n-hidden')
      // The batch PERMUTES: exactly ONE element is the nullish removal and the
      // TWO defined writes the row asserts are always present (§5.5 P-SM-1:
      // "the nullish target is REMOVED and both other targets change"). The
      // rotation names WHERE the nullish element sits — first / middle / last.
      // (The previous construction REPLACED the element at that index with the
      // nullish write, so rotation 1 silently dropped `props.title` and
      // rotation 2 dropped the `content` write — the row then asserted
      // observables its own batch never produced. Repaired here; every
      // assertion below is unchanged and none is weakened.)
      const nullishRemoval = MUT('props.hidden', undefined) // observable target 0 (props)
      const definedWrites: Array<unknown> = [
        MUT('props.title', 't'), // observable target 1 (props)
        { targetProp: 'content', mode: 'replace', value: 'X' }, // observable target 2 (content)
      ]
      const batch = [...definedWrites.slice(0, nullishAt), nullishRemoval, ...definedWrites.slice(nullishAt)]

      // The render is read through `op()` — the runtime's render-carrying
      // accessor — NOT off `applyCommand`, whose pinned signature is
      // `{status, dirtied?, minted?}` and carries NO render (§2.3). The
      // atomicity claim is unchanged: the batch applies WHOLE.
      let res!: { status: string; renderedHtml: string }
      expect(() => {
        res = r.op({ kind: 'state-slice', node: id, mutation: batch as never }) as never
      }).not.toThrow()
      expect(res.status).toBe('applied')
      const attrs = attrsOfNode(res.renderedHtml, id)
      expect(attrs.has('hidden'), 'the removal applied').toBe(false)
      expect(attrs.get('title'), 'defined write 1 applied').toBe('t')
      expect(res.renderedHtml, 'defined write 2 applied').toContain('>X<')
    })

    it(`P-SM-1 [S-TAB-ATOMIC-1] ${label} — a SHAPE-malformed batch is still refused whole`, () => {
      const r = boot()
      const id = nodeId(r, 'n-hidden')
      const beforeHtml = r.renderedHtmlResult().renderedHtml
      const beforeState = JSON.stringify(r.nodeState(id).states)
      const fixed: Array<unknown> = [
        MUT('props.hidden', 'true'),
        MUT('props.title', 't'),
        { targetProp: 'content', mode: 'replace', value: 'X' },
      ]
      const malformed: unknown = nullishAt === 2 ? { mode: 'replace', value: 'X' } : null
      const batch = fixed.map((el, i) => (i === nullishAt ? malformed : el))

      expect(() => r.applyCommand({ kind: 'state-slice', node: id, mutation: batch as never })).not.toThrow()
      expect(r.applyCommand({ kind: 'state-slice', node: id, mutation: batch as never })).toEqual({ status: 'rejected' })

      // All three observables unchanged — no partial application.
      expect(r.renderedHtmlResult().renderedHtml).toBe(beforeHtml)
      expect(r.renderedHtmlResult().renderedHtml).not.toContain('title=')
      expect(r.renderedHtmlResult().renderedHtml).not.toContain('>X<')
      expect(JSON.stringify(r.nodeState(id).states)).toBe(beforeState)
    })
  }

  // -------------------------------------------------------------------
  // P-SM-2 (state-machine) — strategy id `S-TAB-PASS-1`.
  // REWRITTEN/EXTENDED (ruling 1 + AF-5):
  //   (a) fixed 6-value table on `props.X`, fixed order, one `op()` call each,
  //       asserting "not rejected BY THE PREDICATE" (the engine's own verdict
  //       for arrays/objects is recorded, not pinned);
  //   (b) a fixed 5-spellings × 3-nullish-forms = 15-row table, fixed order,
  //       each asserting NOT rejected by the predicate. The DOT-pre fixed
  //       forms on an authored-attribute node additionally assert the attribute
  //       ABSENT; the colon twins are inert-as-mutation-target (§2.3 defect fix
  //       (a)) and the bare name is engine-owned (§3.4 PA-9/PA-10), so those
  //       three spellings carry no removal observation.
  //   (b2) ONE row's expectation is split per SPELLING (§3.4 PA-5 vs PA-2's
  //       AF-7 boundary): `css.role (dot) = null` does NOT remove — the
  //       adapter's `css:` branch removes only on `val === undefined`
  //       (`dist/core/adapters.js:214-224`, read) and BAKES everything else
  //       (`elem.setAttribute(key, bakeValue(val))`, `:239`; `bakeValue(null)`
  //       = `String(null)` = `'null'`, `dist/core/render-helpers.js:57-61`,
  //       read) — so the attribute is the STRINGIFIED `role="null"`, observed
  //       exactly. `css.role (dot) = undefined` still asserts removal (PA-5).
  //       `props.hidden (dot) = null` DOES remove, by a different branch: the
  //       landed dist's BOOLEAN_ATTRS branch (`:305-313`, read) treats a falsy
  //       value as OFF.
  // -------------------------------------------------------------------
  const PASS_VALUES: Array<{ label: string; value: unknown }> = [
    { label: "'v'", value: 'v' },
    { label: "''", value: '' },
    { label: '0', value: 0 },
    { label: 'false', value: false },
    { label: '[]', value: [] },
    { label: '{}', value: {} },
  ]
  for (const { label, value } of PASS_VALUES) {
    it(`P-SM-2 [S-TAB-PASS-1] props.X = ${label} is NOT rejected by the predicate`, () => {
      const r = boot()
      const id = nodeId(r, 'n-inert')
      const res = r.op({ kind: 'state-slice', node: id, mutation: [MUT('props.probe', value)] })
      expect(res.status).not.toBe('rejected')
    })
  }

  const SPELLINGS: Array<{ label: string; targetProp: string; node: string; attr: string; removes: boolean; nullBakes?: boolean }> = [
    { label: 'props.hidden (dot)', targetProp: 'props.hidden', node: 'n-hidden', attr: 'hidden', removes: true },
    { label: 'css.role (dot)', targetProp: 'css.role', node: 'n-inert', attr: 'role', removes: true, nullBakes: true },
    { label: 'props:hidden (colon)', targetProp: 'props:hidden', node: 'n-hidden', attr: 'hidden', removes: false },
    { label: 'css:role (colon)', targetProp: 'css:role', node: 'n-inert', attr: 'role', removes: false },
    { label: 'hidden (bare)', targetProp: 'hidden', node: 'n-hidden', attr: 'hidden', removes: false },
  ]
  const NULLISH_FORMS: Array<{ label: string; withValue: boolean; value: unknown }> = [
    { label: 'undefined', withValue: true, value: undefined },
    { label: 'null', withValue: true, value: null },
    { label: 'value key ABSENT', withValue: false, value: undefined },
  ]
  for (const sp of SPELLINGS) {
    for (const form of NULLISH_FORMS) {
      const bakesNull = sp.nullBakes === true && form.value === null
      const expectation = !sp.removes
        ? ' (no removal observation: inert/engine-owned spelling)'
        : bakesNull
          ? ' — NOT refused and the attribute is the STRINGIFIED value, not removed'
          : ' and the attribute is gone'
      it(`P-SM-2 [S-TAB-PASS-1] ${sp.label} = ${form.label} is NOT refused${expectation}`, () => {
        const r = boot()
        const id = nodeId(r, sp.node)
        let res!: { status: string; renderedHtml: string }
        expect(() => {
          res = r.op({
            kind: 'state-slice',
            node: id,
            mutation: [MUT(sp.targetProp, form.value, form.withValue)],
          }) as never
        }).not.toThrow()
        // The predicate's part of the contract: no VALUE-shaped write is refused.
        expect(res.status, `${sp.label}=${form.label}`).not.toBe('rejected')
        if (bakesNull) {
          // The AF-7 boundary of §3.4 PA-2, asserted for THIS spelling: the
          // adapter's `css:` branch removes only on `undefined`
          // (`dist/core/adapters.js:214-224`, read) and bakes the rest
          // (`:239`); `bakeValue(null)` stringifies, so the attribute is
          // `role="null"` — present, and NOT the authored/absent form.
          // Exact observed values, both observables, per the row's split.
          expect(shimElOf(r, id)?.getAttribute(sp.attr), `${sp.label}=null: stringified, NOT removed`).toBe('null')
          expect(attrsOfNode(res.renderedHtml, id).get(sp.attr), `${sp.label}=null: stringified, NOT removed`).toBe(
            'null',
          )
        } else if (sp.removes) {
          expect(shimElOf(r, id)?.getAttribute(sp.attr), `${sp.label}=${form.label}: attribute present`).toBe(null)
          expect(attrsOfNode(res.renderedHtml, id).has(sp.attr), sp.label).toBe(false)
        } else {
          // Recorded, not pinned: the inert/engine-owned spelling removes
          // nothing, and the row states that so it cannot be read as a removal.
          expect(typeof res.status).toBe('string')
        }
      })
    }
  }

  // -------------------------------------------------------------------
  // P-TP-1 — `NOT EXECUTED — no PBT harness` (§5.5, ruling 1b).
  //
  // The property as NARROWED: "For every mutation reaching the COMMAND SURFACE
  // (`Runtime.applyCommand` — `provident.op` / `load({kind:'commands'})` — and
  // the pane channel), the predicate's verdict is SHAPE-ONLY and no
  // value-shaped write is refused." It quantifies over ALL inputs; a table can
  // only sample, and this repo has NO PBT harness (no fast-check / hypothesis /
  // property runner — `package.json` devDependencies). It is deliberately NOT
  // written as a test, and MUST NOT be reported as executed.
  //
  // Compensating example-based rows (re-pointed after ruling 1): PA-1..PA-10
  // (value space × spellings, above), PF-1..PF-8 (`P-SM-3`, in
  // tests/host-guard-panes.test.ts) for the pane channel, M2/M3/M8 for the
  // shape refusal (M2/M3 above, M8 = PF-5), P-SM-2 (the non-nullish + nullish
  // complement, above) — plus the STRUCTURAL argument that the predicate is a
  // single function called at exactly two sites (`src/renderer/runtime.ts:420`
  // and `src/renderer/secure-panels.ts:361`, both read), and that both are
  // KIND-SCOPED to the command surface. Handler-originated writes
  // (`ctx.clientAPI.apply`, `ctx.node.receiveNextState`) reach
  // `supervisor.apply` directly and are OUTSIDE it (§2.3 boundary) — the
  // contract claims no totality over all writes.
  // -------------------------------------------------------------------
})
