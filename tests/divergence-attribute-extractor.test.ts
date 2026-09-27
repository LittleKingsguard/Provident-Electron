// tests/divergence-attribute-extractor.test.ts — the NODE-SIDE HALF of the
// `H-r10` extension (`U-DIVERGENCE-EXT`, ledger row `C2`), authored with the
// implementation of the AMENDMENT BLOCK in `docs/specs/ci-divergence-leg.md`.
//
// WHAT THIS FILE IS, exactly. The amendment block declares:
//   · A-2.8 — *"the extractor's pure half (HTML string → set) is exercised in the
//     node suite against FIXED LITERAL HTML"*, listing the seven inputs that must
//     be driven: a VALUED form, a BARE form, a duplicate name, an empty tag, a
//     self-closing tag, an attribute whose VALUE contains a `node-N` token, and an
//     attribute whose value contains the literal text `data-node-id`. Those rows
//     are §1 below. **The real-DOM half is `[A]`-layer and only the leg can take
//     it** — this file never claims it.
//   · A-2.2/A-2.3/A-2.5/A-2.6 — the observable is a SET of attribute NAMES, both
//     serialized forms are ONE presence fact, and the comparison is SET EQUALITY
//     with the symmetric difference reported BY NAME, both directions.
//   · A-1.1/A-1.4/A-1.5 — the scenario-envelope channel: one `scenarioEnvelope(kind)`
//     function over a CLOSED two-member kind set, resolved ONCE per run and handed
//     to BOTH hosts by the same shape.
//   · A-3.5 — the `props` falsy-toggle scenario's DECLARED READING.
//
// WHAT IT PROVES, AND WHAT IT DOES NOT. The falsy-toggle reading below is driven on
// the SHIM host IN PROCESS (no Electron, no DISPLAY): it proves the scenario's
// authored writes reach the shim's render and that the member's presence flips ON →
// absent → absent there. The REAL-DOM half of that reading is taken by the leg
// itself (`npm run divergence`), never here — a green in this file is NOT a
// real-DOM claim, NOT an identity claim, and NOT a claim that the shim is faithful
// (A-2.7, A-6.4, A-6.7).
//
// AUTHORITY: `docs/specs/ci-divergence-leg.md`'s AMENDMENT BLOCK (`U-DIVERGENCE-EXT`,
// 2026-09-27). The rows carry the block's own clause ids.
import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { Runtime } from '../src/renderer/runtime.js'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
// A-2.8 — the leg's PURE HALF, imported from the leg's OWN module (never a copy).
// The module is side-effect-free on import: its main-module guard runs the leg only
// when the file is the process's entry point, so importing it here spawns nothing.
// @ts-ignore — a `.mjs` leg with no declaration file (`typecheck:tests` has allowJs off); the import is kept on ONE line so the directive covers its specifier.
import * as leg from '../scripts/electron-divergence.mjs'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const LEG_SOURCE = readFileSync(join(ROOT, 'scripts', 'electron-divergence.mjs'), 'utf8')
const FALSY_ENVELOPE = leg.scenarioEnvelope('props-falsy-toggle') as Envelope

/** The authored envelope shapes the leg's own `scenarioEnvelope` returns (the
 *  module has no declarations, so the shape this file reads is spelled here). */
type Envelope = {
  template: {
    root: {
      type: string
      css: { id: string }
      children: Array<{
        type: string
        css: { id: string }
        props?: Record<string, unknown>
        content?: string
        handlers?: Array<{ name: string; event: string; body: string }>
      }>
    }
  }
  content: unknown[]
  clientConfig: { runInstantiation: boolean; runRendering: boolean }
}

/** The names a fixed literal HTML answers, as a sorted array (readable in a diff). */
function namesOf(html: string): string[] {
  return [...(leg.extractAttributeNames(html).names as Set<string>)].sort()
}

beforeAll(() => {
  installShim()
})

// ===========================================================================
// §1 — A-2.8: the extractor's pure half against FIXED LITERAL HTML
// ===========================================================================
describe('A-2 — the set-wise attribute-presence extractor (the pure half, A-2.8)', () => {
  it('A-2.3 — the real DOM\'s BARE form and the shim\'s VALUED form are ONE presence fact', () => {
    // The clause's own rationale, as a fixed literal pair: the real DOM serializes a
    // boolean attribute bare (`<div hidden>`) while the shim emits `hidden="true"`.
    const bare = leg.extractAttributeNames('<div hidden></div>')
    const valued = leg.extractAttributeNames('<div hidden="true"></div>')
    expect(bare.names.has('hidden'), 'A-2.3 — the bare form is a presence fact').toBe(true)
    expect(valued.names.has('hidden'), 'A-2.3 — the valued form is the SAME presence fact').toBe(true)
    expect(
      leg.attributeSetDifference(bare.names, valued.names).equal,
      'A-2.3 — the two serialized forms are indistinguishable to this comparison (that is its whole point)',
    ).toBe(true)
    expect(namesOf('<div hidden></div>'), 'A-2.8 — the bare form').toEqual(['hidden'])
  })

  it('A-2.8 — a duplicate name is ONE presence fact, never two', () => {
    const extracted = leg.extractAttributeNames('<div hidden class="a" hidden></div>')
    expect([...extracted.names].sort()).toEqual(['class', 'hidden'])
    expect((extracted.raw as string[]).filter((n) => n === 'hidden').length, 'A-2.4(iii) — the RAW form keeps the document order, deduped').toBe(1)
  })

  it('A-2.8 — an EMPTY tag and a SELF-CLOSING tag carry no names, and neither hangs nor throws', () => {
    expect(namesOf('<div></div>')).toEqual([])
    expect(namesOf('<br/>')).toEqual([])
    expect(namesOf('<span />')).toEqual([])
    expect(namesOf('<div><br/><input type="text"/></div>')).toEqual(['type'])
  })

  it('A-2.8 — an attribute VALUE carrying a `node-N` token never enters the NAME set, and the RAW value is kept beside the normalized one', () => {
    const extracted = leg.extractAttributeNames('<div data-node-id="node-7" class="counter"></div>')
    expect([...extracted.names].sort(), 'the minted id is a VALUE, never a name').toEqual(['class', 'data-node-id'])
    const entry = (extracted.entries as Array<{ name: string; value: string | null; valueNormalized: string | null }>).find(
      (e) => e.name === 'data-node-id',
    )
    expect(entry?.value, 'A-2.4(iii) — the RAW value is recorded').toBe('node-7')
    expect(entry?.valueNormalized, 'A-2.4(i)/(ii) — the token rule is applied inside the value').toBe('node#')
  })

  it('A-2.8 — the literal text `data-node-id` inside a VALUE fabricates no name (DE-3\'s normalization over-reach)', () => {
    const extracted = leg.extractAttributeNames('<div title="data-node-id"></div>')
    expect([...extracted.names], 'only the real attribute name is a name').toEqual(['title'])
    expect(extracted.names.has('data-node-id'), 'a value is not an attribute position').toBe(false)
  })

  it('A-2.2 — the return shape is a SET with the fold it used recorded (never a string, never a count)', () => {
    const extracted = leg.extractAttributeNames('<div CLASS="a" Id="x"></div>')
    expect(extracted.names instanceof Set, 'A-2.2 — it is a SET').toBe(true)
    expect([...extracted.names].sort(), 'A-2.2 — HTML attribute names fold case-insensitively').toEqual(['class', 'id'])
    expect(extracted.fold, 'A-2.2 — the fold the leg used is part of the answer').toBe(leg.ATTRIBUTE_NAME_FOLD)
    expect(extracted.tokenRule, 'A-2.4(i) — the nodeId token rule is reported as applied when it cannot collapse names').toBe('applied')
  })

  it('A-2.2/A-2.4(iii) — the token rule REFUSES the name set when it would collapse two distinct names', () => {
    const extracted = leg.extractAttributeNames('<div data-node-1="a" data-node-2="b"></div>')
    expect([...extracted.names].sort(), 'A-2.4(iii) — two distinct names stay two').toEqual(['data-node-1', 'data-node-2'])
    expect(extracted.tokenRule, 'the refusal is RECORDED, never silent').toContain('REFUSED')
  })

  it('A-2.2 — TOTAL: a missing / non-string / odd input answers an empty extraction, never a throw', () => {
    expect(() => leg.extractAttributeNames(undefined as unknown as string)).not.toThrow()
    expect(namesOf(undefined as unknown as string)).toEqual([])
    expect(leg.extractAttributeNames(undefined as unknown as string).missing, 'a missing input is marked, not silently empty').toBe(true)
    expect(namesOf('')).toEqual([])
    expect(namesOf('<')).toEqual([])
    // An UNTERMINATED tag is not a tag: the scanner never invents an attribute
    // position from a truncated byte stream, and it stays total (no throw).
    expect(namesOf('<div a="unclosed')).toEqual([])
    expect(namesOf('<!-- <div hidden> --><p>x</p>'), 'a comment carries no attributes').toEqual([])
    expect(namesOf('</div>')).toEqual([])
  })

  it('DE-1/A-2 — the naive substring row is a GUARANTEED FALSE RED where the set-wise row passes (the extractor\'s own falsifiability)', () => {
    // The real DOM's serialization of a boolean attribute (RK-6). A row written as
    // `includes('hidden="true"')` can NEVER pass against it — while the presence fact
    // is TRUE. This is why the comparison is made on names.
    const realDomForm = '<div hidden class="x">t</div>'
    expect(realDomForm.includes('hidden="true"'), 'the naive substring row FAILS here').toBe(false)
    expect(leg.extractAttributeNames(realDomForm).names.has('hidden'), 'the set-wise row PASSES on the same bytes').toBe(true)
  })
})

// ===========================================================================
// §2 — A-2.5/A-2.6: set equality and the symmetric difference
// ===========================================================================
describe('A-2.5/A-2.6 — set equality, and the symmetric difference BY NAME', () => {
  it('A-2.5 — equal sets: |A| = |B|, A ⊇ B, B ⊇ A, and Δ = ∅', () => {
    const verdict = leg.attributeSetDifference(new Set(['id', 'class']), new Set(['class', 'id']))
    expect(verdict).toMatchObject({ sameSize: true, aContainsB: true, bContainsA: true, equal: true, onlyInA: [], onlyInB: [] })
    expect(verdict.sizeA).toBe(2)
    expect(verdict.sizeB).toBe(2)
  })

  it('A-2.6 — an extra attribute on ONE side FAILS the comparison, named in the right direction (the row a mutation must break)', () => {
    const withExtra = leg.attributeSetDifference(new Set(['id', 'class', 'data-wire']), new Set(['class', 'id']))
    expect(withExtra.equal, 'A-2.6 — the empty symmetric difference is the ONLY pass').toBe(false)
    expect(withExtra.onlyInA, 'the difference is reported BY ATTRIBUTE NAME, real-only direction').toEqual(['data-wire'])
    expect(withExtra.onlyInB).toEqual([])
    const missingOnLeft = leg.attributeSetDifference(new Set(['id']), new Set(['id', 'inert']))
    expect(missingOnLeft.equal).toBe(false)
    expect(missingOnLeft.onlyInB, 'the reverse case is the SAME fail state (A-2.6)').toEqual(['inert'])
    expect(missingOnLeft.sameSize, 'a count-only comparison would have laundered this difference').toBe(false)
  })

  it('A-2.5 — a COUNT-only comparison launders a difference: equal sizes with different members are NOT equal', () => {
    const verdict = leg.attributeSetDifference(new Set(['id', 'class']), new Set(['id', 'data-wire']))
    expect(verdict.sameSize, 'the counts agree — which is exactly why a count is not the comparison').toBe(true)
    expect(verdict.equal).toBe(false)
    expect(verdict.onlyInA).toEqual(['class'])
    expect(verdict.onlyInB).toEqual(['data-wire'])
  })

  it('A-2.5 — case variants and duplicates cannot launder the comparison (set semantics, not strings)', () => {
    // A-2.2 — the fold is applied by the EXTRACTOR, identically on both sides; the
    // comparison then sees the folded sets.
    const upper = leg.extractAttributeNames('<div INERT id="x"></div>')
    const lower = leg.extractAttributeNames('<div inert id="x"></div>')
    expect(leg.attributeSetDifference(upper.names, lower.names).equal, 'the fold is applied on BOTH sides before anything is compared').toBe(true)
    expect(leg.attributeSetDifference(new Set(['inert', 'inert']), new Set(['inert'])).equal, 'a duplicate is one presence fact').toBe(true)
  })
})

// ===========================================================================
// §3 — A-1: the scenario-envelope channel
// ===========================================================================
describe('A-1 — the scenario-envelope channel', () => {
  it('A-1.5 — the pinned kind set is CLOSED at two members, and a third kind is refused loudly', () => {
    expect(leg.SCENARIO_KINDS).toEqual(['demo', 'props-falsy-toggle'])
    expect(() => leg.scenarioEnvelope('demo')).not.toThrow()
    expect(() => leg.scenarioEnvelope('props-falsy-toggle')).not.toThrow()
    expect(() => leg.scenarioEnvelope('third-kind'), 'A-1.5 — a third kind is a new contract row, not a free choice').toThrow(/closed set/)
  })

  it('A-1.5 — `scenarioEnvelope(\'demo\')` is byte-for-byte the leg\'s existing demo envelope (the DERIVED one)', () => {
    expect(leg.envelopeDigest(leg.scenarioEnvelope('demo')), 'the demo kind IS the authored demo envelope, byte-for-byte').toBe(
      leg.envelopeDigest(demoEnvelope()),
    )
  })

  it('A-1.4/A-1.6 — the canonical digest is a function of the RESOLVED object: stable per kind, different across kinds', () => {
    expect(leg.envelopeDigest(leg.scenarioEnvelope('demo'))).toBe(leg.envelopeDigest(leg.scenarioEnvelope('demo')))
    expect(leg.envelopeDigest(leg.scenarioEnvelope('props-falsy-toggle'))).toBe(leg.envelopeDigest(FALSY_ENVELOPE))
    expect(
      leg.envelopeDigest(leg.scenarioEnvelope('demo')) === leg.envelopeDigest(leg.scenarioEnvelope('props-falsy-toggle')),
      'two DIFFERENT scenarios must not share a digest (the ENVELOPE-MISMATCH detector depends on that)',
    ).toBe(false)
  })

  it('A-1.4/A-1.2/A-1.3 — the leg resolves each kind exactly ONCE and hands that same object to BOTH hosts over the EXISTING `provident.load`', () => {
    // The wiring itself, read from the leg's own source (the leg's live run is the
    // behavioural evidence; this row is the static half: a SECOND resolution, or a
    // host that is not handed the resolved object, reddens it).
    const resolutions = LEG_SOURCE.match(/=\s*scenarioEnvelope\(/g) ?? []
    expect(resolutions.length, 'A-1.4 — one resolution per run: the two kinds are resolved into consts, and no third call site exists').toBe(2)
    const handoffs = LEG_SOURCE.match(/await channelHandoff\(/g) ?? []
    expect(handoffs.length, 'A-1.2/A-1.3 — the identity run (both hosts) + the extension run (both hosts) are the four hand-offs').toBe(4)
    const loads = LEG_SOURCE.match(/'provident\.load'/g) ?? []
    expect(loads.length, 'A-1.2/A-1.3 — ONE existing tool surface carries the envelope to both hosts (no new tool, no new group)').toBe(1)
    expect(LEG_SOURCE.includes("kind: 'envelope'"), 'A-1.2 — the EXISTING `provident.load {kind:\'envelope\', envelope}` shape').toBe(true)
    expect(LEG_SOURCE.includes('ENVELOPE-MISMATCH'), 'A-1.6 — the instrument-error path exists').toBe(true)
  })

  it('A-1.6 — the digest the leg records is the pinned canonicalization (`JSON.stringify` of the resolved object)', () => {
    const envelope = leg.scenarioEnvelope('props-falsy-toggle')
    expect(leg.envelopeDigest(envelope)).toBe(JSON.stringify(envelope))
  })

  it('A-4.2/A-4.5 — the pinned count is the LITERAL 9, and the leg self-checks against it (never through `ok(...)`)', () => {
    expect(leg.PINNED_CHECKS, 'A-4.5 — the literal the self-check compares the run against').toBe(9)
    expect(LEG_SOURCE.includes('A-4.5 pin self-check'), 'the self-check is a labelled EXTENSION check').toBe(true)
    expect(LEG_SOURCE.includes('EXT RESULT:'), 'A-4.3 — the extension tally has its own summary line').toBe(true)
    expect(LEG_SOURCE.includes('R13 RESULT: ${checks} checks, ${failures} failures'), 'A-5.4 — the pinned summary line is unchanged').toBe(true)
    // A-4.3 — the extension's counters are SEPARATE from the pinned ones, so `N`
    // cannot move: the leg has exactly the two pinned increment sites `ok(...)` owns.
    expect((LEG_SOURCE.match(/checks \+= 1/g) ?? []).length, 'A-4.2 — exactly ONE site increments `checks` (the `ok()` helper)').toBe(1)
    expect((LEG_SOURCE.match(/failures \+= 1/g) ?? []).length, 'A-4.2 — exactly TWO sites increment `failures` (inside `ok()`, plus the bootstrap catch)').toBe(2)
  })
})

// ===========================================================================
// §4 — A-3: the `props` falsy-toggle scenario
// ===========================================================================
describe('A-3 — the `props` falsy-toggle scenario', () => {
  it('A-3.1/A-3.2 — the scenario authors the boolean member in its ON form and performs BOTH writes on the `props.<member>` spelling', () => {
    expect(leg.FALSY_TOGGLE_MEMBER, 'A-3.1 — the pinned member').toBe('inert')
    const target = FALSY_ENVELOPE.template.root.children.find((c) => c.css.id === leg.FALSY_TOGGLE_TARGET_ID)
    expect(target?.props, 'A-3.1 — the authored ON form').toMatchObject({ id: leg.FALSY_TOGGLE_TARGET_ID, inert: 'true' })
    const bodies = FALSY_ENVELOPE.template.root.children.flatMap((c) => (c.handlers ?? []).map((h) => h.body))
    expect(bodies.length, 'A-3.3 — the two writes are authored handler bodies on the scenario\'s own nodes').toBe(2)
    expect(bodies.some((b) => b.includes("targetProp: 'props.inert', mode: 'replace', value: false")), 'A-3.2(a) — the falsy OFF write').toBe(true)
    expect(bodies.some((b) => b.includes("targetProp: 'props.inert', mode: 'replace', value: undefined")), 'A-3.2(b) — the nullish REMOVAL write').toBe(true)
    for (const body of bodies) {
      expect(body.includes("targetProp: 'inert'"), 'PA-10 — a BARE name is INERT and is never the removal row').toBe(false)
      expect(body.includes("targetProp: 'props:inert'"), 'PA-9 — the colon twin is INERT and is never the removal row').toBe(false)
      expect(body.includes("targetProp: 'css:inert'"), 'PA-9 — the `css:<key>` colon twin is INERT and is never the removal row').toBe(false)
    }
  })

  it('A-3.4/A-3.5 — the DECLARED READING on the shim host: P1 present (ON) → P2 absent (after the falsy OFF write) → P3 absent (after the removal write)', async () => {
    // In-process, on the SHIM host (the channel's second host — the real-DOM half is
    // the leg's own live run). Same envelope, same two dispatches, same extraction.
    const runtime = new Runtime({ mount: mountEl() as never, envelope: FALSY_ENVELOPE as never })
    runtime.bootstrap()
    const read = (): Set<string> => {
      const rendered = runtime.renderedHtmlResult().renderedHtml
      return leg.extractAttributeNames(rendered).names as Set<string>
    }
    const p1 = read()
    expect(p1.has(leg.FALSY_TOGGLE_MEMBER), 'A-3.5 P1 (the ON half) — the name is PRESENT before any write').toBe(true)

    await runtime.dispatch({ target: { kind: 'cssId', cssId: leg.FALSY_TOGGLE_OFF_ID }, event: 'click' } as never)
    const p2 = read()
    expect(p2.has(leg.FALSY_TOGGLE_MEMBER), 'A-3.5 P2 — the falsy OFF write leaves the name ABSENT').toBe(false)

    await runtime.dispatch({ target: { kind: 'cssId', cssId: leg.FALSY_TOGGLE_REMOVE_ID }, event: 'click' } as never)
    const p3 = read()
    expect(p3.has(leg.FALSY_TOGGLE_MEMBER), 'A-3.5 P3 (the PINNED half) — the removal write leaves the name ABSENT').toBe(false)
    // The serialized FORM is explicitly NOT pinned (A-3.5): only presence is read.
    expect(leg.extractAttributeNames(runtime.renderedHtmlResult().renderedHtml).names instanceof Set, 'the reading is a SET at every point').toBe(true)
  })

  it('A-3.5 — the shim host\'s ON form is the VALUED one (`inert="true"`), which the extractor reads as present WITHOUT any substring assertion', () => {
    const runtime = new Runtime({ mount: mountEl() as never, envelope: FALSY_ENVELOPE as never })
    runtime.bootstrap()
    const html = runtime.renderedHtmlResult().renderedHtml
    expect(html.includes('inert="true"'), 'the shim serializes a boolean attribute with its value').toBe(true)
    expect(leg.extractAttributeNames(html).names.has(leg.FALSY_TOGGLE_MEMBER), 'the set-wise reading of the same bytes').toBe(true)
  })
})

// ===========================================================================
// §5 — `EXT-F6-HOST-1`: the HOST finding the extension's first live run measured
// ===========================================================================
// A-6.5 `EXT-F6`: *"a real-DOM vs shim divergence: a finding to route — a HOST-side cause is
// fixed here with a regression row"*. The finding, MEASURED LIVE by `npm run divergence`: the
// real DOM rendered `data-wire` on every created element (the engine's own
// `el.dataset.wire = wire`, `provident-ssr/dist/core/adapters.js:139`) while the shim did NOT,
// because `src/shared/dom-shim.ts`'s `dataset` slot was a plain object — a JS property write
// that emitted no attribute. Live reading of the P1/P2/P3 lines:
//   real RAW=[data-wire id class data-node-id …] shim RAW=[data-node-id id class …]
//   Δ only-on-real=[data-wire] only-on-shim=[] sameSize=false
// The rows above never caught it: they read the shim's OWN render, and the shim was
// self-consistently silent about the member it never emitted.
describe('EXT-F6 — the HOST finding: a `dataset.<name>` write on the shim must emit the ATTRIBUTE the real DOM emits', () => {
  it('EXT-F6-HOST-1 (A-6.5 EXT-F6 → A-2.2/A-2.3) — the shim\'s `dataset` write reaches the attribute store, read SET-WISE by the leg\'s own extractor', () => {
    // (a) the DIRECT form: the engine's own `el.dataset.wire = wire` shape, on the shim host.
    const element = mountEl()
    expect(leg.extractAttributeNames(element.outerHTML).names.has('data-wire'), 'precondition — nothing has written it yet').toBe(false)
    element.dataset.wire = 'node-7'
    const afterWire = leg.extractAttributeNames(element.outerHTML)
    expect(afterWire.names.has('data-wire'), 'EXT-F6 — the presence fact the real DOM reports and the shim used to be silent about').toBe(true)
    expect(
      (afterWire.entries as Array<{ name: string; value: string | null }>).find((e) => e.name === 'data-wire')?.value,
      'the attribute carries the written value, and the name is the REAL DOM\'s (`data-wire`, not a bare JS property)',
    ).toBe('node-7')
    // (b) the platform's camelCase → kebab mapping (the same one `data-node-id` ← `nodeId` rides on).
    element.dataset['kebabKey'] = 'v'
    expect(leg.extractAttributeNames(element.outerHTML).names.has('data-kebab-key'), 'a camelCase key maps to `data-kebab-key` on the real DOM').toBe(true)
    expect(element.getAttribute('data-wire'), 'the write lands in the SAME attribute store the serialization and `getAttribute` read').toBe('node-7')

    // (c) the PATH THE LEG ACTUALLY READS: a bootstrapped shim host's `renderedHtml`, whose
    // elements are created by the engine's own `el.dataset.wire = wire` (never by this file).
    const runtime = new Runtime({ mount: mountEl() as never, envelope: FALSY_ENVELOPE as never })
    runtime.bootstrap()
    const runtimeReading = leg.extractAttributeNames(runtime.renderedHtmlResult().renderedHtml)
    expect(
      runtimeReading.names.has('data-wire'),
      'the engine-created elements of the shim host\'s own render carry the wire attribute (the divergence the live leg measured at P1/P2/P3)',
    ).toBe(true)
    expect((runtimeReading.raw as string[]).length, 'the reading is the leg\'s own raw name list, not a substring search').toBeGreaterThan(0)
  })
})
