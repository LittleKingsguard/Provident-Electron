// tests/engine-pin-boolean-dom.test.ts — the DOM/shim half of the §4.1 RED
// SET of docs/specs/engine-pin.md (`U-ENGINE-PIN`). Carries R-3, R-4, R-5
// (DOM leg) and the DOM leg of P-TP-2 (`S-TAB-OFF-2`).
//
// Contract (§3.3): through the SHIM DOM, a boolean member ON carries the
// authored string form (`inert="true"` — the shim serializes `k="v"`,
// src/shared/dom-shim.ts:79); OFF is ABSENT (the engine's boolean branch
// reaches `removeAttribute`, so the completion from §2.2 is a precondition of
// these rows passing post-change).
//
// TDD: written FIRST from the spec. R-3 PASSES at the current pin; R-4, R-5
// (DOM leg) and the P-TP-2 DOM table are RED.
import { describe, it, expect, beforeAll } from 'vitest'
import {
  translateLegacy,
  Supervisor,
  EventBridge,
  DomAdapter,
  renderProducingProcess,
  type LegacyInitialData,
} from 'provident-ssr'
import { installShim, mountEl } from '../src/shared/dom-shim.js'

beforeAll(() => {
  installShim()
})

type MutableChild = { type: string; css?: Record<string, unknown>; props?: Record<string, unknown> }
type MutableEnvelope = {
  template: { root: { type: string; css?: Record<string, unknown>; props?: Record<string, unknown>; children: MutableChild[] } }
  content: unknown[]
  clientConfig: { runInstantiation: boolean; runRendering: boolean }
}

/** §4.2 — the pinned scenario envelope (identical to the SSR leg's). */
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

function booleanOffEnvelope(): MutableEnvelope {
  const env = baseEnvelope()
  env.template.root.children[0].props = { id: 'n-inert', inert: 'false' }
  env.template.root.children[1].props = { id: 'n-hidden', hidden: 'false' }
  return env
}

function readonlyOnEnvelope(): MutableEnvelope {
  const env = baseEnvelope()
  env.template.root.children[2].props = { id: 'n-ro', readonly: 'true' }
  return env
}

function memberEnvelope(member: string, value: unknown): MutableEnvelope {
  const env = baseEnvelope()
  env.template.root.children[0].props = { id: 'n-inert', [member]: value }
  return env
}

// ---- the test-only attribute extractor (§4 shared harness, DOM leg) -------

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


/** Every shim element under a mount, in document order (pre-order walk). */
function childEls(mount: ReturnType<typeof mountEl>): Array<ReturnType<typeof mountEl>> {
  const out: Array<ReturnType<typeof mountEl>> = []
  const walk = (el: ReturnType<typeof mountEl>) => {
    for (const c of (el as unknown as { children: Array<ReturnType<typeof mountEl>> }).children) {
      out.push(c)
      walk(c)
    }
  }
  walk(mount)
  return out
}

/** Render the envelope through the SHIM DOM (DomAdapter on `mountEl()`) and
 *  return both the mount and the rendered element by `css.id`. */
function domOf(env: MutableEnvelope): { mount: ReturnType<typeof mountEl>; html: string; el: (cssId: string) => ReturnType<typeof mountEl> } {
  const t = translateLegacy(env as unknown as LegacyInitialData)
  const sup = new Supervisor({ events: new EventBridge() })
  for (const n of t.nodes) sup.registerNode(n)
  const mount = mountEl()
  const adapter = new DomAdapter(mount as never, {})
  const cr = t.root.compile(t.nodes)
  sup.recordResolved(cr.actionable as never)
  renderProducingProcess(cr.actionable as never, new Map(t.nodes.map((n) => [n.id, n])) as never, adapter as never, null, { nodeIdAttribute: true } as never)
  const html = mount.innerHTML
  const byCss = (cssId: string) => {
    const nodeId = nodeIdForCssId(html, cssId)
    return childEls(mount).find((c) => (c as unknown as { getAttribute(k: string): string | null }).getAttribute('data-node-id') === nodeId)
  }
  return { mount, html, el: (cssId: string) => byCss(cssId) as ReturnType<typeof mountEl> }
}


/** The FIRST tag carrying `attr="value"` — as `{ tag, start }`. `start` is the
 *  `<` offset, so a per-node row extracts the attributes of THAT tag: several
 *  tags share a tag name (`div`), so the tag name alone is NOT a locator
 *  (§4.2's `findTagByAttr` helper, made positional). */
function findTagByAttr(html: string, attr: string, value: string): { tag: string; start: number } | null {
  for (const t of tagAttrSets(html)) {
    if (!t.attrs.has(attr)) continue
    const map = attrsOfTagAt(html, t.start)
    if (map && map.get(attr) === value) return { tag: t.tag, start: t.start }
  }
  return null
}

/** The attribute record of the tag beginning at `<`. */
function attrsOfTagAt(html: string, start: number): Map<string, string | null> | null {
  const m = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(start))
  if (!m) return null
  const tag = m[1]
  let j = start + 1 + tag.length
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
  return attrsOfTag(html.slice(start, j + 1), tag)
}

/** Every tag in document order, with its attribute-NAME set — one character
 *  walk, no regex over the markup. */
function tagAttrSets(html: string): Array<{ tag: string; attrs: Set<string>; start: number }> {
  const out: Array<{ tag: string; attrs: Set<string>; start: number }> = []
  let i = 0
  while (i < html.length) {
    const lt = html.indexOf('<', i)
    if (lt === -1) break
    const rest = html.slice(lt + 1)
    if (rest.startsWith('/')) { i = lt + 1; continue }
    const m = /^([a-zA-Z][a-zA-Z0-9-]*)/.exec(rest)
    if (!m) { i = lt + 1; continue }
    const tag = m[1].toLowerCase()
    let j = lt + 1 + tag.length
    let quote: string | null = null
    while (j < html.length) {
      const ch = html[j]
      if (quote !== null) { if (ch === quote) quote = null }
      else if (ch === '"' || ch === "'") quote = ch
      else if (ch === '>') break
      j++
    }
    const map = attrsOfTag(html.slice(lt, j + 1), tag)
    out.push({ tag, attrs: new Set(map ? map.keys() : []), start: lt })
    i = j + 1
  }
  return out
}

/** The attribute record of the tag carrying `data-node-id="<nodeId>"`. */
function attrsOfNode(html: string, nodeId: string): Record<string, string> {
  const hit = findTagByAttr(html, 'data-node-id', nodeId)
  if (hit === null) return {}
  const map = attrsOfTagAt(html, hit.start)
  return map ? Object.fromEntries(map) : {}
}

/** The attribute-NAME set of the tag carrying `data-node-id="<nodeId>"`. */
function attrsPresentNode(html: string, nodeId: string): Set<string> {
  const hit = findTagByAttr(html, 'data-node-id', nodeId)
  if (hit === null) return new Set()
  const map = attrsOfTagAt(html, hit.start)
  return new Set(map ? map.keys() : [])
}

/** The engine node id of the node authored at `css.id === cssId`. */
function nodeIdForCssId(html: string, cssId: string): string {
  const hit = findTagByAttr(html, 'id', cssId)
  if (hit === null) return ''
  return attrsOfTagAt(html, hit.start)?.get('data-node-id') ?? ''
}

/** The shim element for a node id, walked from the mount (pre-order). */
function shimElOf(mount: ReturnType<typeof mountEl>, nodeId: string): ReturnType<typeof mountEl> | null {
  const walk = (el: unknown): unknown => {
    const e = el as { children?: unknown[]; getAttribute?: (k: string) => string | null }
    if (typeof e.getAttribute === 'function' && e.getAttribute('data-node-id') === nodeId) return el
    for (const c of e.children ?? []) {
      const hit = walk(c)
      if (hit) return hit
    }
    return null
  }
  return walk(mount) as ReturnType<typeof mountEl> | null
}
describe('engine-pin boolean attributes — the shim DOM leg (spec §3.3, §4.1)', () => {
  it('R-3 boolean ON is present with the authored form in the shim DOM (inert)', () => {
    // State enumeration (shim DOM leg):
    //   S1 authored `inert:'true'`      → attribute PRESENT with the authored form
    //   S2 the node with no boolean member → no boolean attribute
    //   S3 `getAttribute` and the serialized HTML agree (one bookkeeping store)
    const { html, el } = domOf(baseEnvelope())
    const inertNodeId = nodeIdForCssId(html, 'n-inert')
    expect(inertNodeId).not.toBe('')
    expect(attrsOfNode(html, inertNodeId).inert).toBe('true')
    expect(el('n-inert').getAttribute('inert')).toBe('true')

    const plainNodeId = nodeIdForCssId(html, 'n-plain')
    expect(attrsPresentNode(html, plainNodeId).has('inert')).toBe(false)
    expect(el('n-plain').getAttribute('inert')).toBe(null)
  })

  it('R-4 boolean OFF is ABSENT in the shim DOM, never ="false" (inert)', () => {
    // States (shim DOM leg), authored `props.inert:'false'`:
    //   S1 the attribute is ABSENT in the serialized HTML
    //   S2 `getAttribute('inert')` is null
    //   S3 `innerHTML` contains no `inert="false"`
    const { mount, html, el } = domOf(booleanOffEnvelope())
    const inertNodeId = nodeIdForCssId(html, 'n-inert')
    expect(inertNodeId).not.toBe('')
    expect(attrsPresentNode(html, inertNodeId).has('inert')).toBe(false)
    expect(el('n-inert').getAttribute('inert')).toBe(null)
    expect(mount.innerHTML).not.toContain('inert="false"')
    expect(mount.innerHTML).not.toContain('inert=')
  })

  it('R-5 the boolean set is not an inert special case (readonly OFF is absent) — DOM leg', () => {
    // States (shim DOM leg), the ON/OFF pair on the SECOND named member:
    //   S1 authored `readonly:'false'` → ABSENT
    //   S2 authored `readonly:'true'`  → PRESENT with the authored form
    const off = domOf(booleanOffEnvelope())
    const offNodeId = nodeIdForCssId(off.html, 'n-ro')
    expect(offNodeId).not.toBe('')
    expect(attrsPresentNode(off.html, offNodeId).has('readonly')).toBe(false)
    expect(off.el('n-ro').getAttribute('readonly')).toBe(null)

    const on = domOf(readonlyOnEnvelope())
    const onNodeId = nodeIdForCssId(on.html, 'n-ro')
    expect(onNodeId).not.toBe('')
    expect(attrsOfNode(on.html, onNodeId).readonly).toBe('true')
    expect(on.el('n-ro').getAttribute('readonly')).toBe('true')
  })

  // ---------------------------------------------------------------------
  // P-TP-2 (totality, weaker enumerated form) — strategy id `S-TAB-OFF-2`.
  // Fixed table: members ['inert','readonly'] × falsy values ['false', 0,
  // '0', ''] × the DOM leg = 8 rows in FIXED ORDER, one render each. No
  // randomness, no shrinking, no generated inputs. `null`/`undefined` stay
  // outside the table (§3.3).
  // ---------------------------------------------------------------------
  const OFF_VALUES: Array<{ label: string; value: unknown }> = [
    { label: "'false'", value: 'false' },
    { label: '0', value: 0 },
    { label: "'0'", value: '0' },
    { label: "''", value: '' },
  ]
  for (const member of ['inert', 'readonly']) {
    for (const { label, value } of OFF_VALUES) {
      it(`P-TP-2 [S-TAB-OFF-2] DOM: ${member} = ${label} (falsy) emits NO attribute`, () => {
        const { mount, html, el } = domOf(memberEnvelope(member, value))
        const nodeId = nodeIdForCssId(html, 'n-inert')
        expect(nodeId).not.toBe('')
        expect(attrsPresentNode(html, nodeId).has(member)).toBe(false)
        expect(el('n-inert').getAttribute(member)).toBe(null)
        expect(mount.innerHTML).not.toContain(`${member}=`)
      })
    }
  }
})
