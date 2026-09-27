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
//
// ===========================================================================
// ⟶ RE-GRAINED 2026-09-27 (THE DATASET/SHIM FIX) — the capture-above was taken
// FROM THE DEFECTIVE SHIM, and this pass re-took it from the LANDED tree.
//
// WHAT WAS WRONG WITH THE AS-FILED CAPTURE (the fix, named): `src/shared/
// dom-shim.ts`'s `dataset` slot used to be a PLAIN OBJECT, so the engine's own
// wire write — `el.dataset.wire = wire` (`provident-ssr/dist/core/adapters.js`,
// the DOM adapter's create path) — set a JS property and emitted NO ATTRIBUTE,
// while the REAL DOM renders `data-wire="node-N"` on every created element.
// `src/shared/dom-shim.ts` now carries an ATTRIBUTE-BACKED `dataset` proxy over
// the same `attrs` store (with its own stated bound: the camelCase↔kebab map is
// mirrored; a hyphenated key is ignored and reads `undefined`), and the fix was
// found LIVE by `U-DIVERGENCE-EXT`'s set-wise attribute-presence extractor —
// the reading was `only-on-real=[data-wire] only-on-shim=[] sameSize=false` at
// all three points. The shim is CORRECT AS LANDED; nothing here suppresses
// `data-wire`.
//
// WHAT MOVED: the three DOM literals below gain `data-wire="<nodeId>"` on every
// `<div>` (the SSR literals do NOT change — the SSRFragmentAdapter never wrote
// `data-wire`; see the P-IM-1 exception record for the measured reading). The
// as-filed pre-fix forms are KEPT VISIBLE, superseded, in the banner block
// above the literals (annotate-never-rewrite; no row id, term, seed, section
// number or row count moved). The seven rows that were RED against the
// post-fix tree were exactly the six literal-pinning rows below (`R-16`
// `CONTROL-1`, `CONTROL-1b`, `R-17` `CONTROL-2`, `P-IM-4` cycle 1 and cycle 2)
// plus `P-IM-1`'s two pair rows — the last of which was NOT re-greened by
// pasting literals, because its as-filed invariant is measurably FALSE on the
// real DOM (see the P-IM-1 re-grounding note below).
// ===========================================================================
import { describe, it, expect, beforeAll } from 'vitest'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { Runtime } from '../src/renderer/runtime.js'

beforeAll(() => {
  installShim()
})

/** One authored child node. `handlers` is part of the ENGINE's node shape (the
 *  `on:<event>` route the `SSRFragmentAdapter` serializes as an inline
 *  `on<event>` attribute), and it is typed here because the P-IM-1 re-grounding's
 *  E2 exception is declared from an authored-handler probe envelope. `children`
 *  is OPTIONAL on a CHILD node, while the root's children array stays REQUIRED
 *  (`MutableEnvelope` below) — the rows index `root.children[i]` directly. */
type MutableNode = {
  type: string
  css?: Record<string, unknown>
  props?: Record<string, unknown>
  content?: string
  handlers?: Array<{ name: string; event: string; body: string }>
  children?: MutableNode[]
}

type MutableEnvelope = {
  template: { root: MutableNode & { children: MutableNode[] } }
  content: unknown[]
  clientConfig: { runInstantiation: boolean; runRendering: boolean }
}

/** E2's declared class (⟶ RE-GROUNDED 2026-09-27, THE DATASET/SHIM FIX). The
 *  `SSRFragmentAdapter` routes `on:<event>` to the inline `on<event>` attribute
 *  (`provident-ssr/dist/core/adapters.js`, the `name.startsWith('on:')` branch),
 *  while the DOM adapter wires handlers with `addEventListener` — so these names
 *  exist in the SSR string and CANNOT exist on a real (or shim) element. */
const DECLARED_SSR_HANDLER_ATTRS = ['onclick', 'oninput', 'onpointerdown'] as const
/** E1's declared name (the host-injected wire attribute the engine writes as
 *  `el.dataset.wire = wire`). */
const DECLARED_DOM_WIRE_ATTR = 'data-wire'

/** The NARROWED P-IM-1 set: the attribute names a tag carries MINUS the two
 *  declared exceptions (E1 `data-wire`, E2 the `on<event>` class). Used for the
 *  per-tag comparison — the as-filed full set-equality form is
 *  SUPERSEDED-BY-MEASUREMENT (see the P-IM-1 block). */
function structuralAttrs(tag: { attrs: Set<string> }): string[] {
  return [...tag.attrs]
    .filter((n) => n !== DECLARED_DOM_WIRE_ATTR && !DECLARED_SSR_HANDLER_ATTRS.includes(n as (typeof DECLARED_SSR_HANDLER_ATTRS)[number]))
    .sort()
}

/** The attribute-name set of a whole fragment (every tag), as a set — the
 *  per-fragment reading E1/E2's declarations are measured against. */
function extractNames(html: string): Set<string> {
  const out = new Set<string>()
  for (const t of tagAttrSets(html)) for (const name of t.attrs) out.add(name)
  return out
}

/** **E2's DECLARATION, MEASURED** (⟶ RE-GROUNDED 2026-09-27, THE DATASET/SHIM
 *  FIX) — run INSIDE each P-IM-1 pair row, over an envelope that authors three
 *  handlers (one per declared event kind). It asserts the declared class EXACTLY,
 *  in both directions, so the exception the narrowed invariant subtracts can
 *  never silently become a catch-all:
 *    · the SSR-only set is exactly `['onclick','oninput','onpointerdown']`;
 *    · the DOM-only set is exactly `['data-wire']`;
 *    · after subtracting both, the two legs agree PER TAG on this envelope too. */
function expectDeclaredExceptions(
  bootFn: (env: MutableEnvelope) => Runtime,
  probeEnvelope: () => MutableEnvelope,
  label = 'probe',
): void {
  const probe = bootFn(probeEnvelope()).renderedHtmlResult()
  const probeDom = extractNames(probe.renderedHtml)
  const probeSsr = extractNames(probe.ssrHtml)
  const domOnly = [...probeDom].filter((n) => !probeSsr.has(n)).sort()
  const ssrOnly = [...probeSsr].filter((n) => !probeDom.has(n)).sort()
  expect(ssrOnly, `${label}: E2 — the SSR-only handler class is exactly the three authored kinds`).toEqual([...DECLARED_SSR_HANDLER_ATTRS])
  expect(domOnly, `${label}: E1 — the DOM-only class is exactly \`${DECLARED_DOM_WIRE_ATTR}\``).toEqual([DECLARED_DOM_WIRE_ATTR])
  const pDomTags = tagAttrSets(probe.renderedHtml)
  const pSsrTags = tagAttrSets(probe.ssrHtml)
  expect(pDomTags.length).toBe(2)
  expect(pSsrTags.length).toBe(2)
  for (let i = 0; i < 2; i++) {
    expect(pDomTags[i].tag, `${label}: probe tag ${i}`).toBe(pSsrTags[i].tag)
    expect(structuralAttrs(pDomTags[i]), `${label}: probe structural attribute-name set ${i}`).toEqual(structuralAttrs(pSsrTags[i]))
  }
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

/** The superseded PRE-FIX capture (⟶ RE-GRAINED 2026-09-27, THE DATASET/SHIM
 *  FIX). These are the as-filed literals, KEPT VISIBLE as the record of what the
 *  DEFECTIVE shim emitted. Byte difference to the literals below, per tag:
 *      pre-fix `<div ` + (authored attrs) + `data-node-id="<nodeId>"`
 *      post-fix `<div data-wire="<nodeId>" ` + (authored attrs) + `data-node-id="<nodeId>"`
 *  i.e. the DOM literals gained `data-wire="<nodeId>"` on EVERY div; the SSR
 *  literals are byte-identical (unchanged by the fix).
 *
 *    CONTROL1_DOM (pre-fix):
 *      '<div data-node-id="<nodeId>" id="r">'
 *      '<div inert="true" data-node-id="<nodeId>" id="n-inert"></div>'
 *      '<div hidden="true" data-node-id="<nodeId>" id="n-hidden"></div>'
 *      '<div data-node-id="<nodeId>" id="n-ro"></div>'
 *      '<div data-node-id="<nodeId>" id="n-plain"></div>'
 *      '</div>'
 *    CONTROL1_TRUE_DOM (pre-fix): same, with `readonly="true"` on the n-ro div.
 *    CONTROL2_DOM (pre-fix):
 *      '<div data-node-id="<nodeId>" id="r">'
 *      '<div data-node-id="<nodeId>" id="n-inert"></div>'
 *      '<div data-node-id="<nodeId>" id="n-hidden"></div>'
 *      '<div data-node-id="<nodeId>" id="n-ro"></div>'
 *      '<div data-node-id="<nodeId>" id="n-plain"></div>'
 *      '</div>'
 *  These pre-fix forms are FALSIFIABLE and are used as the re-grain's mutation
 *  evidence: pasting one back turns its row RED (measured, this pass — see the
 *  re-grain note in the file header). */

const CONTROL1_DOM =
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="r">' +
  '<div data-wire="<nodeId>" inert="true" data-node-id="<nodeId>" id="n-inert"></div>' +
  '<div data-wire="<nodeId>" hidden="true" data-node-id="<nodeId>" id="n-hidden"></div>' +
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="n-ro"></div>' +
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="n-plain"></div>' +
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
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="r">' +
  '<div data-wire="<nodeId>" inert="true" data-node-id="<nodeId>" id="n-inert"></div>' +
  '<div data-wire="<nodeId>" hidden="true" data-node-id="<nodeId>" id="n-hidden"></div>' +
  '<div data-wire="<nodeId>" readonly="true" data-node-id="<nodeId>" id="n-ro"></div>' +
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="n-plain"></div>' +
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
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="r">' +
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="n-inert"></div>' +
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="n-hidden"></div>' +
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="n-ro"></div>' +
  '<div data-wire="<nodeId>" data-node-id="<nodeId>" id="n-plain"></div>' +
  '</div>'

const CONTROL2_SSR =
  '<div id="r" data-node-id="<nodeId>">' +
  '<div id="n-inert" data-node-id="<nodeId>"></div>' +
  '<div id="n-hidden" data-node-id="<nodeId>"></div>' +
  '<div id="n-ro" data-node-id="<nodeId>"></div>' +
  '<div id="n-plain" data-node-id="<nodeId>"></div>' +
  '</div>'

const CONTROL2_CENSUS = { registered: 5, inTree: 5, unplaced: 0, destroyed: 0, prototypes: 0 }

/** Normalize the engine's per-process minted values to a fixed placeholder.
 *  BOTH traceability attributes are normalized here, because BOTH are minted from
 *  the same global per-process sequence and `U-DIVERGENCE-EXT`'s live reading
 *  (this pass, both hosts) measures them EQUAL PER TAG: `data-wire="node-N"`
 *  holds exactly the `data-node-id="node-N"` of the SAME tag. Normalizing both
 *  to the SAME token is what keeps that equality inside the byte-identity
 *  comparison instead of dropping it (a value-pinning that used two different
 *  placeholders, or dropped the attribute, would let a `data-wire` that drifted
 *  away from its node id pass).
 *
 *  ⟶ RE-GRAINED 2026-09-27 (THE DATASET/SHIM FIX): before the fix the shim
 *  emitted no `data-wire` attribute at all (its `dataset` was a plain object), so
 *  only `data-node-id` needed a rule. `data-wire` is now present on every created
 *  element, so it is normalized too. Everything else is compared verbatim. */
function normalizeNodeIds(html: string): string {
  return html.replace(/data-(?:node-id|wire)="[^"]*"/g, (m) => `${m.slice(0, m.indexOf('='))}="<nodeId>"`)
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
    // ⟶ RE-GRAINED 2026-09-27 (THE DATASET/SHIM FIX): the as-filed literal was a
    // capture from the DEFECTIVE shim (`src/shared/dom-shim.ts`'s plain-object
    // `dataset` emitted no attribute for the engine's `el.dataset.wire = wire`,
    // so no `data-wire` appeared); the fix is the attribute-backed `dataset`
    // proxy, landed after `U-DIVERGENCE-EXT`'s set-wise extractor measured
    // `only-on-real=[data-wire] only-on-shim=[]` live. `CONTROL1_DOM` therefore
    // gained `data-wire="<nodeId>"` on every div; `CONTROL1_SSR` is unchanged
    // (the SSRFragmentAdapter never wrote it). The pre-fix literal is kept in the
    // superseded banner above the constants. RED before the re-grain (the row
    // failed on the missing attribute), GREEN after.
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
    // ⟶ RE-GRAINED 2026-09-27 (THE DATASET/SHIM FIX): `CONTROL1_TRUE_DOM` gained
    // `data-wire="<nodeId>"` per div (as-filed literal was a capture from the
    // defective shim — see the header's re-grain note and the superseded banner);
    // `CONTROL1_TRUE_SSR` is byte-identical, as are the census numbers.
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
    // ⟶ RE-GRAINED 2026-09-27 (THE DATASET/SHIM FIX): `CONTROL2_DOM` gained
    // `data-wire="<nodeId>"` per div (as-filed literal was a capture from the
    // defective shim — header re-grain note + superseded banner above the
    // constants); `CONTROL2_SSR` and `CONTROL2_CENSUS` are unchanged.
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
  //
  // ⟶ RE-GRAINED 2026-09-27 (THE DATASET/SHIM FIX) — BOTH cycle rows (1 and 2):
  // they compare against `CONTROL1_DOM`/`CONTROL1_SSR`, so the as-filed forms
  // carried the same pre-fix DOM literal (no `data-wire`) and failed against the
  // fixed shim. The re-grained DOM literal gains `data-wire="<nodeId>"` per div;
  // the SSR literal and the census are unchanged. Nothing about the CYCLE
  // semantics moved: the two render passes, the applied-op assertions and the
  // `hidden="true"`/never-`"false"` checks are byte-identical to the as-filed
  // row. Both cycles were RED before the re-grain and are GREEN after.
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
  //
  // ===================================================================
  // ⟶ RE-GROUNDED 2026-09-27 (THE DATASET/SHIM FIX) — THE AS-FILED INVARIANT IS
  // SUPERSEDED-BY-MEASUREMENT, and it is NOT re-greened by pasting literals.
  //
  // THE AS-FILED FORM (kept visible as the record): *"the SSR fragment and the
  // DOM leg agree on the attribute-NAME sets element-wise"* — asserted as full
  // set EQUALITY per tag. It was true only because the DEFECTIVE shim silently
  // omitted `data-wire`; the real DOM carries it, so the invariant was a
  // shim-only artifact.
  //
  // THE MEASUREMENT THAT REFUTES IT (real app, `U-DIVERGENCE-EXT`'s own set-wise
  // extractor, `scripts/electron-divergence.mjs` → `extractAttributeNames` +
  // `attributeSetDifference`; the reading below was re-taken at THIS test layer
  // and matches the leg's live `[EXT]` raw sets, both after the fix):
  //     Δ(dom − ssr) = ["data-wire"]                      (host-injected: the engine writes `el.dataset.wire = wire`)
  //     only-on-ssr  = ["onclick","oninput","onpointerdown"]  (the SSRFragmentAdapter serializes authored handlers as inline `on<event>` attributes; the DOM adapter wires them with `addEventListener`, so no such attribute exists on a real element)
  // The real-app reading of the same two directions was
  // `only-on-real=[data-wire] only-on-shim=[] sameSize=false` at all three
  // extension points — i.e. on the REAL app the two sets are NOT equal, in both
  // directions. The row therefore asserts the NARROWED invariant below.
  //
  // THE NARROWED INVARIANT THAT IS GENUINELY PROVABLE ON BOTH LAYERS: the two
  // legs agree per tag on the STRUCTURAL attribute-name set = the whole set
  // MINUS the two DECLARED EXCEPTIONS, which are:
  //   E1 `data-wire`       — DOM-only; declared, measured per tag below (present
  //                          on every DOM tag, absent from the SSR string) AND
  //                          measured EQUAL to that tag's `data-node-id`.
  //   E2 the `on<event>`-class — SSR-only; declared, and the DECLARATION ITSELF is
  //                          measured below over an authored three-handler probe
  //                          envelope, so the exception class is not taken on
  //                          faith and is not over-broad (the probe asserts the
  //                          SSR-only set is EXACTLY the three authored kinds).
  // Each exception keeps its own positive reading; a full set-equality row would
  // be a FALSE invariant, and no control is weakened to obtain green — the
  // exceptions are asserted, not tolerated.
  // ===================================================================
  const PAIR_ENVELOPES: Array<{ label: string; make: () => MutableEnvelope }> = [
    { label: 'BASE', make: baseEnvelope },
    { label: 'BASE-boolean-OFF', make: booleanOffEnvelope },
  ]
  /** The two named boolean members this unit asserts (§3.3: "exactly two named
   *  members are asserted — `inert` and `readonly`" for the OFF proof; the
   *  envelope's third authored member is `hidden`). */
  const PAIR_MEMBERS = ['inert', 'hidden'] as const
  /** E1/E2 are the exception names the narrowed invariant subtracts; both live as
   *  module-level constants (they are used by `structuralAttrs`, `extractNames`'s
   *  consumers and the probe helper — a second declaration here would risk the two
   *  drifting apart): `DECLARED_DOM_WIRE_ATTR` / `DECLARED_SSR_HANDLER_ATTRS`. */

  /** E2's own PROBE envelope: a node carrying three authored handlers, one per
   *  declared event kind. It is NOT part of the pair table (it is the exception
   *  declaration's evidence), and it adds no census or literal of its own. */
  const handlerProbeEnvelope = (): MutableEnvelope => ({
    template: {
      root: {
        type: 'div',
        css: { id: 'h-root' },
        props: { id: 'h-root' },
        children: [
          {
            type: 'div',
            css: { id: 'h-body' },
            props: { id: 'h-body' },
            content: 'x',
            handlers: [
              { name: 'h-click', event: 'click', body: 'function (ctx) { return 1 }' },
              { name: 'h-input', event: 'input', body: 'function (ctx) { return 2 }' },
              { name: 'h-press', event: 'pointerdown', body: 'function (ctx) { return 3 }' },
            ],
          },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  })

  for (const { label, make } of PAIR_ENVELOPES) {
    it(`P-IM-1 [S-TAB-PAIR-1] ${label} — the SSR and shim legs agree on the STRUCTURAL attribute-name sets AND the present boolean values (the two declared exceptions measured)`, () => {
      // E2's declaration, measured FIRST inside this row's own scenario (the
      // authored three-handler probe), so the exception class is evidence in the
      // row that relies on it — never taken on faith, and never over-broad.
      expectDeclaredExceptions(boot, handlerProbeEnvelope, label)
      const res = boot(make()).renderedHtmlResult()
      const ssrTags = tagAttrSets(res.ssrHtml)
      const domTags = tagAttrSets(res.renderedHtml)
      expect(ssrTags.length).toBe(5)
      expect(domTags.length).toBe(5)
      // The fixed tag order is (root, n-inert, n-hidden, n-ro, n-plain) — the
      // order the §4.2 envelope authors them in, identical on both legs.
      for (let i = 0; i < 5; i++) {
        expect(domTags[i].tag, `leg tag ${i}`).toBe(ssrTags[i].tag)
        // THE NARROWED INVARIANT (⟶ RE-GROUNDED 2026-09-27): the STRUCTURAL
        // attribute-name set — the whole set minus the two declared exceptions.
        expect(structuralAttrs(domTags[i]), `leg structural attribute-name set ${i}`).toEqual(structuralAttrs(ssrTags[i]))
        // …and the subtraction is EXACTLY the declared exception, never a looser
        // filter: the DOM tag carries precisely one name more than the structural
        // set (E1), and the SSR tag carries exactly the structural set here
        // (E2 is absent because this envelope authors no handler — asserted below).
        expect(domTags[i].attrs.size, `leg ${i}: the DOM set is the structural set + the E1 exception`).toBe(
          structuralAttrs(domTags[i]).length + 1,
        )
        expect(ssrTags[i].attrs.size, `leg ${i}: this envelope's SSR set IS the structural set`).toBe(structuralAttrs(ssrTags[i]).length)
      }
      // ---- E1, MEASURED PER TAG (not assumed) ------------------------------
      // `data-wire` is present on EVERY DOM tag of the pinned envelope, absent
      // from EVERY SSR tag, and — as the live reading measures on both hosts —
      // carries exactly that tag's `data-node-id` value. All three facts are
      // assertions, so a future `data-wire` that goes missing, appears in the SSR
      // string, or drifts away from its node id FAILS this row.
      for (let i = 0; i < 5; i++) {
        const domMap = attrsOfTagAt(res.renderedHtml, domTags[i].start)!
        const ssrMap = attrsOfTagAt(res.ssrHtml, ssrTags[i].start)!
        expect(domMap.has('data-wire'), `${label}: E1 — data-wire present on DOM tag ${i}`).toBe(true)
        expect(ssrMap.has('data-wire'), `${label}: E1 — data-wire absent from SSR tag ${i}`).toBe(false)
        expect(domMap.get('data-wire'), `${label}: E1 — the wire value is that tag's node id`).toBe(domMap.get('data-node-id'))
        expect(structuralAttrs(domTags[i]).includes('data-wire'), `${label}: E1 — and it is subtracted as a declared exception`).toBe(false)
      }
      // The E2 direction on THIS envelope: the pinned envelope authors no
      // handler, so the SSR-only set is EMPTY here (measured, never assumed) —
      // the class is declared by the probe row above, not borrowed into this one.
      for (let i = 0; i < 5; i++) {
        const domMap = attrsOfTagAt(res.renderedHtml, domTags[i].start)!
        const ssrMap = attrsOfTagAt(res.ssrHtml, ssrTags[i].start)!
        for (const handlerAttr of DECLARED_SSR_HANDLER_ATTRS) {
          expect(domMap.has(handlerAttr), `${label}: E2 — no handler attribute on DOM tag ${i}`).toBe(false)
          expect(ssrMap.has(handlerAttr), `${label}: E2 — this envelope authors no handler, tag ${i}`).toBe(false)
        }
      }
      // Stated as the invariant itself, independent of the walker: the FIRST
      // tag of each leg (the root) carries the same STRUCTURAL attribute-NAME set.
      const ssrRoot = tagAttrSets(res.ssrHtml, 0, 'div')[0]
      const domRoot = tagAttrSets(res.renderedHtml, 0, 'div')[0]
      expect(structuralAttrs(domRoot)).toEqual(structuralAttrs(ssrRoot))
      // And the root's own E1 reading, per the declared exception.
      expect(attrsOfTagAt(res.renderedHtml, domRoot.start)!.get('data-wire'), `${label}: E1 on the root`).toBe(
        attrsOfTagAt(res.renderedHtml, domRoot.start)!.get('data-node-id'),
      )

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
