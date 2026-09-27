// tests/engine-pin-boolean-ssr.test.ts — the SSR half of the §4.1 RED SET of
// docs/specs/engine-pin.md (`U-ENGINE-PIN`). Carries R-1, R-2, R-5 (SSR leg)
// and the SSR leg of P-TP-2 (`S-TAB-OFF-2`).
//
// Contract (§3.3): for the engine's closed boolean-attribute set — of which
// exactly TWO members are named here (`inert`, `readonly`) — the SSR adapter
// emits the authored string form when ON (`inert="true"`) and NO attribute at
// all when the value is falsy (`'false'`, `0`, `'0'`, `''`) — never
// `inert="false"`. `null` is deliberately OUTSIDE this file's tables (§3.3).
//
// TDD: written FIRST from the spec. The boolean-OFF rows (R-2, R-5) and the
// P-TP-2 table are RED at the current pin (`^0.2.1` — no `BOOLEAN_ATTRS`, no
// boolean branch). The boolean-ON rows (R-1) PASS at the current pin — the
// spec calls them ANTI-REGRESSION rows, not upgrade proofs.
import { describe, it, expect, beforeAll } from 'vitest'
import {
  translateLegacy,
  SSRFragmentAdapter,
  renderProducingProcess,
  type LegacyInitialData,
} from 'provident-ssr'
import { installShim, mountEl } from '../src/shared/dom-shim.js'

beforeAll(() => {
  installShim()
})

// ---- the shared envelope (§4.2) -------------------------------------------

type MutableChild = { type: string; css?: Record<string, unknown>; props?: Record<string, unknown> }
type MutableEnvelope = {
  template: { root: { type: string; css?: Record<string, unknown>; props?: Record<string, unknown>; children: MutableChild[] } }
  content: unknown[]
  clientConfig: { runInstantiation: boolean; runRendering: boolean }
}

/** §4.2 — the pinned scenario envelope. `css.id` and `props.id` carry the SAME
 *  value per node (the shipped demo shape: both write the same slot). */
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

/** The §4.2 envelope with every authored boolean member OFF (`'false'`) — the
 *  R-2/R-5-OFF state. `n-ro` already carries `readonly:'false'` in §4.2. */
function booleanOffEnvelope(): MutableEnvelope {
  const env = baseEnvelope()
  const [inert, hidden] = env.template.root.children
  inert.props = { id: 'n-inert', inert: 'false' }
  hidden.props = { id: 'n-hidden', hidden: 'false' }
  return env
}

/** §3.3 R-5's ON half — `readonly` authored `'true'` on `n-ro`. */
function readonlyOnEnvelope(): MutableEnvelope {
  const env = baseEnvelope()
  env.template.root.children[2].props = { id: 'n-ro', readonly: 'true' }
  return env
}

/** P-TP-2's driver — the `n-inert` node carrying ONE boolean member with the
 *  given value (any other boolean member is left unauthored). */
function memberEnvelope(member: string, value: unknown): MutableEnvelope {
  const env = baseEnvelope()
  env.template.root.children[0].props = { id: 'n-inert', [member]: value }
  return env
}

// ---- the test-only attribute extractor (§4 shared harness) ----------------
// A character-level extractor — NOT a regex, NOT substring matching. It walks
// the HTML, tracks in-tag vs text state, honours `"…"`/`'…'`/unquoted values,
// and returns the attributes of the FIRST `<tag …>` it meets.

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





/** `ssrOf(env)` — translateLegacy → SSRFragmentAdapter → toString(). */
function ssrOf(env: MutableEnvelope): string {
  const t = translateLegacy(env as unknown as LegacyInitialData)
  const ssr = new SSRFragmentAdapter()
  const nodeById = new Map(t.nodes.map((n) => [n.id, n]))
  const cr = t.root.compile(t.nodes)
  renderProducingProcess(cr.actionable as never, nodeById as never, ssr as never, null, { nodeIdAttribute: true } as never)
  return ssr.toString()
}

/** Every `data-node-id` in the fragment, in document order. */
function nodeIds(html: string): string[] {
  return [...html.matchAll(/data-node-id="([^"]+)"/g)].map((m) => m[1])
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
// TYPE-ONLY (leg `npm run typecheck:tests`): the declared value type mirrors what
// `attrsOfTagAt` already returns (`Map<string, string | null>`,
// engine-pin-boolean-ssr.test.ts:170) — a bare attribute parses to `null`.
// `Object.fromEntries(map)` is unchanged; only the record's declared element
// type widens, so the rows' reads/assertions are identical.
function attrsOfNode(html: string, nodeId: string): Record<string, string | null> {
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
// This is DEAD CODE in this file (declared, never called — `shimElOf` is used by
// the DOM half, engine-pin-boolean-dom.test.ts): the SSR leg never mounts a shim
// tree. The name was left unresolved here, which the leg
// `npm run typecheck:tests` reports as TS2552 (`mountEl` is not imported, while
// `installShim` is). Fixed by the TYPE-ONLY import below — `mountEl` is a real
// export of the same module (`src/shared/dom-shim.ts:236`), so the helper's
// return type resolves to the shim element exactly as in the DOM half. No row in
// this file reaches it, and no runtime byte changes.
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
describe('engine-pin boolean attributes — the SSR fragment leg (spec §3.3, §4.1)', () => {
  it('R-1 boolean ON emits the authored form in the SSR fragment (inert)', () => {
    // State enumeration (SSR leg):
    //   S1 authored `inert:'true'`       → attribute PRESENT, value = the authored string form
    //   S2 a node with no boolean member → no boolean attribute on that node
    //   S3 every node carries `data-node-id` + `id` (traceability, unchanged)
    //   S4 the §4.2 `n-ro` node (`readonly:'false'`) is OFF → readonly ABSENT
    const html = ssrOf(baseEnvelope())
    const ids = nodeIds(html)
    expect(ids.length).toBe(5)
    const [rootNode, inertNode, hiddenNode, roNode, plainNode] = ids

    // S1 — the authored string form survives verbatim (the 0.2.1 generic path
    // already does this; this row is the ANTI-REGRESSION row of the pair).
    expect(attrsOfNode(html, inertNode).inert).toBe('true')
    expect(findTagByAttr(html, 'id', 'n-inert')?.tag).toBe('div')

    // S2 — a node with no boolean member has no boolean attribute.
    expect(attrsPresentNode(html, plainNode).has('inert')).toBe(false)
    expect(attrsPresentNode(html, plainNode).has('readonly')).toBe(false)
    expect(attrsPresentNode(html, plainNode).has('hidden')).toBe(false)

    // S3 — the extractor reads the whole attribute set, never a substring guess.
    for (const nodeId of ids) {
      const attrs = attrsOfNode(html, nodeId)
      expect(Object.keys(attrs)).toContain('data-node-id')
      expect(Object.keys(attrs)).toContain('id')
    }
    // The §4.2 root is the FIRST tag by construction.
    expect(attrsOfTag(html, 'div')?.get('id')).toBe('r')
    expect(attrsOfNode(html, rootNode).id).toBe('r')
    expect(attrsOfNode(html, hiddenNode).hidden).toBe('true')
    // `n-ro` is authored `readonly:'false'` in §4.2 — the boolean branch makes
    // that OFF, i.e. ABSENT (not `readonly="false"`). At the retargeted pin the
    // ON/OFF semantics are already in the installed dist, so this row's `n-ro`
    // half is a §3.3 assertion (the OFF member) rather than a bare
    // anti-regression check.
    expect(attrsPresentNode(html, roNode).has('readonly')).toBe(false)
  })

  it('R-2 boolean OFF is ABSENT in the SSR fragment, never ="false" (inert)', () => {
    // States (SSR leg), authored `props.inert:'false'`:
    //   S1 the `inert` attribute is ABSENT on the node
    //   S2 the raw fragment contains no `inert="false"` — and no `inert=` at all
    const html = ssrOf(booleanOffEnvelope())
    const inertNodeId = nodeIdForCssId(html, 'n-inert')
    expect(inertNodeId).not.toBe('')
    expect(attrsPresentNode(html, inertNodeId).has('inert')).toBe(false)
    expect(html).not.toContain('inert="false"')
    expect(html).not.toContain('inert=')
  })

  it('R-5 the boolean set is not an inert special case (readonly OFF is absent) — SSR leg', () => {
    // States (SSR leg), the ON/OFF pair on the SECOND named member:
    //   S1 authored `readonly:'false'` → attribute ABSENT
    //   S2 authored `readonly:'true'`  → attribute PRESENT with the authored form
    // The member list is NOT enumerated as contract — only these two names.
    const off = ssrOf(booleanOffEnvelope())
    const offNodeId = nodeIdForCssId(off, 'n-ro')
    expect(offNodeId).not.toBe('')
    expect(attrsPresentNode(off, offNodeId).has('readonly')).toBe(false)
    expect(off).not.toContain('readonly="false"')

    const on = ssrOf(readonlyOnEnvelope())
    const onNodeId = nodeIdForCssId(on, 'n-ro')
    expect(onNodeId).not.toBe('')
    expect(attrsOfNode(on, onNodeId).readonly).toBe('true')
  })

  // ---------------------------------------------------------------------
  // P-TP-2 (totality, weaker enumerated form) — strategy id `S-TAB-OFF-2`.
  // Fixed table: members ['inert','readonly'] × falsy values ['false', 0,
  // '0', ''] × the SSR leg = 8 rows, FIXED ORDER, one render each; no
  // randomness, no shrinking, no generated inputs. The `null`/`undefined`
  // cases are deliberately OUTSIDE the table (§3.3).
  // ---------------------------------------------------------------------
  const OFF_VALUES: Array<{ label: string; value: unknown }> = [
    { label: "'false'", value: 'false' },
    { label: '0', value: 0 },
    { label: "'0'", value: '0' },
    { label: "''", value: '' },
  ]
  for (const member of ['inert', 'readonly']) {
    for (const { label, value } of OFF_VALUES) {
      it(`P-TP-2 [S-TAB-OFF-2] SSR: ${member} = ${label} (falsy) emits NO attribute`, () => {
        const html = ssrOf(memberEnvelope(member, value))
        const nodeId = nodeIdForCssId(html, 'n-inert')
        expect(nodeId).not.toBe('')
        expect(attrsPresentNode(html, nodeId).has(member)).toBe(false)
        expect(html).not.toContain(`${member}=`)
      })
    }
  }
})
