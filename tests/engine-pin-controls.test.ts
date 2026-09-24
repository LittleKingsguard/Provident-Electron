// tests/engine-pin-controls.test.ts — CONTROL-1 (R-16) and CONTROL-2 (R-17) of
// the §4.1 RED SET of docs/specs/engine-pin.md (`U-ENGINE-PIN`), plus the §5.5
// strategies `S-TAB-CYCLE-2` (P-IM-4) and `S-TAB-PAIR-1` (P-IM-1).
//
// ===========================================================================
// R-16/R-17 ARE FORWARD PINS ON 0.5.1 — THEY ARE **NOT** RETARGET EVIDENCE.
// (AMENDED, AF-1/AF-2; spec §4.1 "What the two controls are NOT", §4.4.)
//
// The pre-amendment labels said "byte-identically to 0.2.1" and "the expected
// strings are the 0.2.1 output captured before the retarget". That comparison
// CANNOT be made: the architect's install landed `0.5.1` mid-session, so no
// `0.2.1` bytes exist to compare against. The literals below are a FORWARD PIN
// captured on the LANDED `0.5.1` tree (with the `removeAttribute` completion
// NOT yet landed — recorded below), and all they can show is that the landed
// output is FROZEN, so a LATER drift is detectable.
//
// A later pass that cites R-16/R-17 as the retarget's regression proof is
// OVER-READING them. The honest claim is: *"the landed 0.5.1 output is frozen,
// so a later drift is detectable."* The `0.2.1` → `0.5.1` measurement belongs
// to `U-ENGINE-DRIFT` (`docs/next-steps.md`, row B: the existing suite +
// battery + divergence legs against the moved pin), NOT to this unit.
// ===========================================================================
//
// BASELINE PROVENANCE (recorded so the literals below are auditable): the
// pinned strings and census numbers are the §4.2 envelopes' output on the tree
// this red run actually executed against — `provident-ssr@0.5.1` installed,
// with the `removeAttribute` completion NOT yet landed — captured once
// (Runtime.bootstrap → renderedHtmlResult()) and frozen as literals here. The
// engine's `data-node-id` values are per-graph sequence ids (`node-1`..`node-5`
// for the first instance, `node-11`..`node-15` for the third), so the literals
// carry the ids of the capture instance — that is intentional: the control
// pins the WHOLE byte string, including the traceability attribute.
import { describe, it, expect, beforeAll } from 'vitest'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { Runtime } from '../src/renderer/runtime.js'

beforeAll(() => {
  installShim()
})

type MutableEnvelope = {
  template: { root: { type: string; css?: Record<string, unknown>; props?: Record<string, unknown>; children: unknown[] } }
  content: unknown[]
  clientConfig: { runInstantiation: boolean; runRendering: boolean }
}

/** §4.2 — the pinned scenario envelope (`inert`/`hidden`/`readonly` all authored
 *  with DEFINED boolean literals, which is what makes CONTROL-1 the 0.2.1
 *  byte-identity baseline). */
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

/** §4.1 R-17 — the §4.2 envelope's BOOLEAN-FREE variant: identical nodes and
 *  ids, with every boolean member left unauthored and no falsy props. */
function booleanFreeEnvelope(): MutableEnvelope {
  const env = baseEnvelope()
  env.template.root.children[0] = { type: 'div', css: { id: 'n-inert' }, props: { id: 'n-inert' } }
  env.template.root.children[1] = { type: 'div', css: { id: 'n-hidden' }, props: { id: 'n-hidden' } }
  env.template.root.children[2] = { type: 'div', css: { id: 'n-ro' }, props: { id: 'n-ro' } }
  return env
}

/** The R-16 boolean-OFF variant (P-IM-1's second envelope). */
function booleanOffEnvelope(): MutableEnvelope {
  const env = baseEnvelope()
  env.template.root.children[0].props = { id: 'n-inert', inert: 'false' }
  env.template.root.children[1].props = { id: 'n-hidden', hidden: 'false' }
  return env
}

function boot(env: MutableEnvelope): Runtime {
  const r = new Runtime({ mount: mountEl() as never, envelope: env as never })
  r.bootstrap()
  return r
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

/** The FIRST tag carrying `attr="value"`, as `{ tag, start }` — `start` is the
 *  `<` offset, so a per-node row extracts the attributes of THAT tag (several
 *  tags share a tag name, so the name alone is not a locator). */
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

/** Every tag in document order, with its attribute-NAME set. The extractor
 *  walks the string once and yields one entry per `<tag …>`. */
function tagAttrSets(
  html: string,
  startsAt = 0,
  limitToTag = '',
): Array<{ tag: string; attrs: Set<string>; start: number }> {
  const out: Array<{ tag: string; attrs: Set<string>; start: number }> = []
  let i = startsAt
  while (i < html.length) {
    const lt = html.indexOf('<', i)
    if (lt === -1) break
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
    const tag = m[1].toLowerCase()
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
    const inner = html.slice(lt + 1 + tag.length, j)
    const attrs = new Map<string, string | null>()
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
      if (name) attrs.set(name, value)
    }
    if (limitToTag === '' || tag === limitToTag) out.push({ tag, attrs: new Set(attrs.keys()), start: lt })
    i = j + 1
  }
  return out
}

// ---------------------------------------------------------------------------
// R-16 — CONTROL-1: a defined boolean literal is byte-identical to the PINNED
// FORWARD CAPTURE on 0.5.1 (NOT to 0.2.1 — AF-1, see the header). The expected
// strings are pinned as literals and must not drift.
// ---------------------------------------------------------------------------

const CONTROL1_DOM =
  '<div data-node-id="<nodeId>" id="r">' +
  '<div inert="true" data-node-id="<nodeId>" id="n-inert"></div>' +
  '<div hidden="true" data-node-id="<nodeId>" id="n-hidden"></div>' +
  '<div data-node-id="<nodeId>" id="n-ro"></div>' +
  '<div data-node-id="<nodeId>" id="n-plain"></div>' +
  '</div>'

const CONTROL1_SSR =
  '<div id="r" data-node-id="<nodeId>">' +
  '<div id="n-inert" inert="true" data-node-id="<nodeId>"></div>' +
  '<div id="n-hidden" hidden="true" data-node-id="<nodeId>"></div>' +
  '<div id="n-ro" data-node-id="<nodeId>"></div>' +
  '<div id="n-plain" data-node-id="<nodeId>"></div>' +
  '</div>'

const CONTROL1_CENSUS = { registered: 5, inTree: 5, unplaced: 0, destroyed: 0, prototypes: 0 }

/** The all-TRUTHY variant (`inert`/`hidden`/`readonly` = `'true'`) — the pure
 *  "defined TRUE boolean literal" byte-identity capture. */
const CONTROL1_TRUE_DOM =
  '<div data-node-id="<nodeId>" id="r">' +
  '<div inert="true" data-node-id="<nodeId>" id="n-inert"></div>' +
  '<div hidden="true" data-node-id="<nodeId>" id="n-hidden"></div>' +
  '<div readonly="true" data-node-id="<nodeId>" id="n-ro"></div>' +
  '<div data-node-id="<nodeId>" id="n-plain"></div>' +
  '</div>'

const CONTROL1_TRUE_SSR =
  '<div id="r" data-node-id="<nodeId>">' +
  '<div id="n-inert" inert="true" data-node-id="<nodeId>"></div>' +
  '<div id="n-hidden" hidden="true" data-node-id="<nodeId>"></div>' +
  '<div id="n-ro" readonly="true" data-node-id="<nodeId>"></div>' +
  '<div id="n-plain" data-node-id="<nodeId>"></div>' +
  '</div>'

/** CONTROL-1b's OWN literal — integrity fix (c). It previously reused
 *  `CONTROL2_CENSUS`, which made the row's census claim a copy of a DIFFERENT
 *  envelope's claim: a future divergence in either envelope could not be seen.
 *  Every envelope carries the same five-node shape here, so the value is equal
 *  — but the literal is now this row's own. */
const CONTROL1_TRUE_CENSUS = { registered: 5, inTree: 5, unplaced: 0, destroyed: 0, prototypes: 0 }

const CONTROL2_DOM =
  '<div data-node-id="<nodeId>" id="r">' +
  '<div data-node-id="<nodeId>" id="n-inert"></div>' +
  '<div data-node-id="<nodeId>" id="n-hidden"></div>' +
  '<div data-node-id="<nodeId>" id="n-ro"></div>' +
  '<div data-node-id="<nodeId>" id="n-plain"></div>' +
  '</div>'

const CONTROL2_SSR =
  '<div id="r" data-node-id="<nodeId>">' +
  '<div id="n-inert" data-node-id="<nodeId>"></div>' +
  '<div id="n-hidden" data-node-id="<nodeId>"></div>' +
  '<div id="n-ro" data-node-id="<nodeId>"></div>' +
  '<div id="n-plain" data-node-id="<nodeId>"></div>' +
  '</div>'

const CONTROL2_CENSUS = { registered: 5, inTree: 5, unplaced: 0, destroyed: 0, prototypes: 0 }

/** Normalize the engine's per-process `data-node-id` values to a fixed
 *  placeholder (they are minted from a global sequence and CANNOT be pinned as
 *  literals across runs); every other byte is compared verbatim. */
function normalizeNodeIds(html: string): string {
  return html.replace(/data-node-id="[^"]*"/g, 'data-node-id="<nodeId>"')
}

describe('engine-pin byte-identity controls (spec §4.1 R-16/R-17, §5.5)', () => {
  it('R-16 CONTROL-1 a defined boolean literal is byte-identical to the PINNED FORWARD CAPTURE (0.5.1) — not retarget evidence', () => {
    // State enumeration (CONTROL-1):
    //   S1 the §4.2 envelope (all three boolean members authored with DEFINED
    //      values) → renderedHtml === the pinned FORWARD literal (0.5.1)
    //   S2 ssrHtml === its pinned FORWARD literal
    //   S3 census === its pinned numbers
    //   S4 re-rendering the same envelope in a SECOND runtime reproduces the
    //      same bytes (no render-count/order nondeterminism)
    //   S5 a defined-value mutation on a boolean member keeps the member present
    //      with the authored form (never `hidden="false"` for a defined `'true'`)
    // NOT retarget evidence (AF-1/AF-2): this row cannot show that
    // `0.2.1 → 0.5.1` changed nothing — see the file header.
    const r = boot(baseEnvelope())
    const res = r.renderedHtmlResult()

    expect(normalizeNodeIds(res.renderedHtml)).toBe(CONTROL1_DOM)
    expect(normalizeNodeIds(res.ssrHtml)).toBe(CONTROL1_SSR)
    expect(res.census).toEqual(CONTROL1_CENSUS)

    // S4 — the second-cycle stability (strategy S-TAB-CYCLE-2 lives below too;
    // this is the same-envelope second instance).
    const again = boot(baseEnvelope())
    expect(normalizeNodeIds(again.renderedHtmlResult().renderedHtml)).toBe(normalizeNodeIds(res.renderedHtml))

    // S5 — a defined boolean write stays ON.
    const id = r.listTargets().nodes.find((n) => (n as { cssId?: string }).cssId === 'n-hidden')!.nodeId
    const op = r.op({ kind: 'state-slice', node: id, mutation: [{ targetProp: 'props.hidden', mode: 'replace', value: 'true' }] })
    expect(op.status).toBe('applied')
    expect(op.renderedHtml).toContain('hidden="true"')
    expect(op.renderedHtml).not.toContain('hidden="false"')
  })

  it('R-16 CONTROL-1b a defined TRUE boolean literal is byte-identical to the PINNED FORWARD CAPTURE (0.5.1)', () => {
    // The pure "defined boolean value" half of R-16: all three named members
    // authored `'true'` → every attribute present with the authored form, and
    // the whole byte string identical to the pinned forward capture.
    const env = (() => {
      const e = baseEnvelope()
      e.template.root.children[2].props = { id: 'n-ro', readonly: 'true' }
      return e
    })()
    const res = boot(env).renderedHtmlResult()
    expect(normalizeNodeIds(res.renderedHtml)).toBe(CONTROL1_TRUE_DOM)
    expect(normalizeNodeIds(res.ssrHtml)).toBe(CONTROL1_TRUE_SSR)
    // Its OWN literal (integrity fix (c)) — never `CONTROL2_CENSUS`.
    expect(res.census).toEqual(CONTROL1_TRUE_CENSUS)
  })

  it('R-17 CONTROL-2 an envelope with no boolean and no falsy props is byte-identical to the PINNED FORWARD CAPTURE (0.5.1) — not retarget evidence', () => {
    // State enumeration (CONTROL-2):
    //   S1 the boolean-free variant → renderedHtml === its pinned forward literal
    //   S2 ssrHtml === its pinned forward literal
    //   S3 census === its pinned numbers
    // NOT retarget evidence (AF-1/AF-2): a forward pin, not a `0.2.1` capture.
    const r = boot(booleanFreeEnvelope())
    const res = r.renderedHtmlResult()
    expect(normalizeNodeIds(res.renderedHtml)).toBe(CONTROL2_DOM)
    expect(normalizeNodeIds(res.ssrHtml)).toBe(CONTROL2_SSR)
    expect(res.census).toEqual(CONTROL2_CENSUS)
    // No boolean member leaks into the boolean-free output — asserted as the
    // ABSENCE OF THE ATTRIBUTE (never as a substring: the node ids 'n-inert' /
    // 'n-hidden' legitimately contain those words).
    for (const member of ['inert', 'readonly', 'hidden']) {
      expect(res.renderedHtml).not.toMatch(new RegExp(`\\b${member}\\s*=`))
      expect(res.ssrHtml).not.toMatch(new RegExp(`\\b${member}\\s*=`))
    }
  })

  // -------------------------------------------------------------------
  // P-IM-4 (invariant) — strategy id `S-TAB-CYCLE-2`.
  // Render the pinned envelope across 2 fixed cycles and assert
  // renderedHtml/ssrHtml/census equal their forward-pinned literals on BOTH. No
  // randomness, no generated inputs.
  //
  // INTEGRITY FIX (a): the pre-amendment row's "cycle" was a TAUTOLOGY — it
  // called `bootstrap()` (which is `this.render()` and nothing else) N times
  // IN A ROW and then read the SAME single render's output, so nothing about a
  // second cycle was ever exercised. The row now drives a REAL second render:
  // a defined-value op through the managed channel (re-render 1) followed by a
  // second no-op op over the same value (re-render 2), i.e. the engine's
  // dirty-diff path actually re-emits. The values chosen (`props.hidden:'true'`
  // on a member already authored `'true'`) are the envelope's own, so the byte
  // output is unchanged — which is exactly what the invariant claims.
  // -------------------------------------------------------------------
  for (const cycle of [1, 2]) {
    it(`P-IM-4 [S-TAB-CYCLE-2] render cycle ${cycle} reproduces the forward-pinned literals`, () => {
      const r = boot(baseEnvelope())
      const id = r.listTargets().nodes.find((n) => (n as { cssId?: string }).cssId === 'n-hidden')!.nodeId
      // Cycle 1..cycle: each iteration is a REAL managed-channel op + re-render
      // over the envelope's own value (a no-op by value, a genuine render pass).
      for (let c = 0; c < cycle; c++) {
        const res = r.op({
          kind: 'state-slice',
          node: id,
          mutation: [{ targetProp: 'props.hidden', mode: 'replace', value: 'true' }],
        })
        expect(res.status, `cycle ${c + 1} applied`).toBe('applied')
      }
      const after = r.renderedHtmlResult()
      expect(normalizeNodeIds(after.renderedHtml), `cycle ${cycle}`).toBe(CONTROL1_DOM)
      expect(normalizeNodeIds(after.ssrHtml), `cycle ${cycle}`).toBe(CONTROL1_SSR)
      expect(after.census, `cycle ${cycle}`).toEqual(CONTROL1_CENSUS)
      // The re-render really happened: the node is still present, ON, with the
      // authored form — i.e. the diff path did not drop or duplicate a member.
      expect(after.renderedHtml.includes('hidden="true"')).toBe(true)
      expect(after.renderedHtml.includes('hidden="false"')).toBe(false)
    })
  }

  // -------------------------------------------------------------------
  // P-IM-1 (invariant) — strategy id `S-TAB-PAIR-1`.
  // 2 envelopes (BASE, BASE-boolean-OFF) × 2 legs (SSRFragmentAdapter,
  // DomAdapter+shim) × the FIXED tag order (root, n-inert, n-hidden, n-ro,
  // n-plain); compare the attribute-NAME sets element-wise AND the VALUE for
  // every present boolean member. No randomness.
  //
  // INTEGRITY FIX (b): the pre-amendment row PROMISED value agreement ("and on
  // the value for present boolean members", §5.5 P-IM-1) but compared NAME SETS
  // only, so a leg emitting `inert="false"` against a leg emitting
  // `inert="true"` would have passed. The value comparison it promises is now
  // actually made — over the two named members the contract asserts (`inert`,
  // `hidden`), never over an enumeration of the engine's boolean set.
  // -------------------------------------------------------------------
  const PAIR_ENVELOPES: Array<{ label: string; make: () => MutableEnvelope }> = [
    { label: 'BASE', make: baseEnvelope },
    { label: 'BASE-boolean-OFF', make: booleanOffEnvelope },
  ]
  /** The two named boolean members this unit asserts (§3.3: "exactly two named
   *  members are asserted — `inert` and `readonly`" for the OFF proof; the
   *  envelope's third authored member is `hidden`). */
  const PAIR_MEMBERS = ['inert', 'hidden'] as const
  for (const { label, make } of PAIR_ENVELOPES) {
    it(`P-IM-1 [S-TAB-PAIR-1] ${label} — the SSR and shim legs agree on the attribute-name sets AND the present boolean values`, () => {
      const res = boot(make()).renderedHtmlResult()
      const ssrTags = tagAttrSets(res.ssrHtml)
      const domTags = tagAttrSets(res.renderedHtml)
      expect(ssrTags.length).toBe(5)
      expect(domTags.length).toBe(5)
      // The fixed tag order is (root, n-inert, n-hidden, n-ro, n-plain) — the
      // order the §4.2 envelope authors them in, identical on both legs.
      for (let i = 0; i < 5; i++) {
        expect(domTags[i].tag, `leg tag ${i}`).toBe(ssrTags[i].tag)
        expect([...domTags[i].attrs].sort(), `leg attribute-name set ${i}`).toEqual([...ssrTags[i].attrs].sort())
      }
      // Stated as the invariant itself, independent of the walker: the FIRST
      // tag of each leg (the root) carries the same attribute-NAME set.
      const ssrRoot = tagAttrSets(res.ssrHtml, 0, 'div')[0]
      const domRoot = tagAttrSets(res.renderedHtml, 0, 'div')[0]
      expect([...domRoot.attrs].sort()).toEqual([...ssrRoot.attrs].sort())

      // ---- the VALUE comparison the row promises (integrity fix (b)) -------
      // Per node, per named member: the two legs must AGREE on presence, and
      // when present they must agree on the VALUE (the authored string form).
      for (let i = 1; i < 5; i++) {
        const ssrMap = attrsOfTagAt(res.ssrHtml, ssrTags[i].start)!
        const domMap = attrsOfTagAt(res.renderedHtml, domTags[i].start)!
        for (const member of PAIR_MEMBERS) {
          const ssrHas = ssrMap.has(member)
          const domHas = domMap.has(member)
          expect(domHas, `${label}: presence of ${member} on leg tag ${i} must match`).toBe(ssrHas)
          if (ssrHas && domHas) {
            expect(domMap.get(member), `${label}: value of ${member} on leg tag ${i}`).toBe(ssrMap.get(member))
          }
          // A present boolean member is never the OFF serialization on either leg.
          if (ssrHas) {
            expect(ssrMap.get(member), `${label}: ${member} must not be ="false" (SSR)`).not.toBe('false')
            expect(domMap.get(member), `${label}: ${member} must not be ="false" (DOM)`).not.toBe('false')
          }
        }
      }
    })
  }
})
