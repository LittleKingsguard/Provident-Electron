// tests/dom-shim-remove-attribute.test.ts — R-7..R-10 of the §4.1 RED SET of
// docs/specs/engine-pin.md (`U-ENGINE-PIN`), plus the P-IM-2 table
// (`S-TAB-IDEMP-1`).
//
// Contract (§2.2, `H-r7` / SHIM-COMPLETION-CARVE-OUT): `ShimElement`
// gains EXACTLY ONE method — `removeAttribute(k: string): void`:
//   1. BOTH stores are cleared: `k === 'id'` clears the `id` SLOT
//      (this.id = '') AND deletes `attrs['id']`; any other `k` deletes
//      `attrs[k]`. (A completion that only deleted `attrs['id']` would leave
//      `outerHTML` emitting `id="…"` and mask a real-DOM difference.)
//   2. Idempotent, never throws — removing an absent key is a no-op; a
//      non-string key stringifies and is a no-op when absent.
//   3. NO other member is added — `hasAttribute` is NOT admitted (§2.2.4).
//
// TDD: written FIRST from the spec, as the POST-change contract. All four rows
// (and the P-IM-2 table) THROW `TypeError: el.removeAttribute is not a
// function` at the current tree — the method does not exist yet (`§4.3` step
// 1: the completion lands first, then this red run is re-taken on the tree
// `0.2.1 + completion`).
import { describe, it, expect, beforeAll } from 'vitest'
import {
  translateLegacy,
  Supervisor,
  EventBridge,
  DomAdapter,
  renderProducingProcess,
  type LegacyInitialData,
} from 'provident-ssr'
import { installShim, mountEl, ShimElement } from '../src/shared/dom-shim.js'

beforeAll(() => {
  installShim()
})

/** The method under contract — reached through a cast so the RED run reports a
 *  clean assertion/throw instead of a compile error (§2.2). */
type Removable = { removeAttribute(k: string): void }
const asRemovable = (el: ShimElement): Removable => el as unknown as Removable

describe('ShimElement.removeAttribute — the scoped harness completion (spec §2.2, §3.2)', () => {
  it('R-8 removeAttribute clears a present attribute', () => {
    // States:
    //   S1 attribute present via setAttribute('title','t')
    //      → removeAttribute('title') → getAttribute('title') === null
    //      → outerHTML no longer contains `title=`
    //   S2 a SIBLING attribute on the same element survives the removal
    const el = mountEl()
    el.setAttribute('title', 't')
    el.setAttribute('data-x', 'keep')
    expect(el.getAttribute('title')).toBe('t')
    expect(el.outerHTML).toContain('title="t"')

    expect(() => asRemovable(el).removeAttribute('title')).not.toThrow()

    expect(el.getAttribute('title')).toBe(null)
    expect(el.outerHTML).not.toContain('title=')
    // S2 — only the named key is cleared.
    expect(el.getAttribute('data-x')).toBe('keep')
    expect(el.outerHTML).toContain('data-x="keep"')
  })

  it('R-9 removeAttribute of an absent attribute is idempotent, never throws', () => {
    // States:
    //   S1 an absent key: two calls, no throw, outerHTML byte-identical before/after
    //   S2 a key removed twice after being present: the second call is a no-op
    const el = mountEl()
    el.setAttribute('data-x', 'v')
    const before = el.outerHTML
    el.removeAttribute('data-x')
    expect(el.getAttribute('data-x')).toBe(null)

    const el2 = mountEl()
    const pristine = el2.outerHTML
    expect(() => asRemovable(el2).removeAttribute('absent')).not.toThrow()
    expect(() => asRemovable(el2).removeAttribute('absent')).not.toThrow()
    expect(el2.outerHTML).toBe(pristine)

    // S2 — second removal of a previously-present key stays a no-op.
    const afterFirst = el.outerHTML
    expect(() => asRemovable(el).removeAttribute('data-x')).not.toThrow()
    expect(el.outerHTML).toBe(afterFirst)
    expect(before).not.toBe(afterFirst)
  })

  it("R-10 removeAttribute('id') clears BOTH the id slot and the attribute store", () => {
    // States:
    //   S1 `id` set through the SPECIAL CASE (setAttribute('id','x') writes the
    //      `id` slot and deliberately does NOT write attrs['id']) →
    //      removeAttribute('id') clears BOTH: getAttribute('id') === null AND
    //      outerHTML no longer emits `id="x"` (the §2.2.1 hazard)
    //   S2 CONTROL — removing a NON-`id` key leaves the `id` slot + `id="…"` intact
    //   S3 the overwrite path: setAttribute('id','x') then setAttribute('id','y')
    //      → removal clears the surviving value
    const el = mountEl()
    el.setAttribute('id', 'x')
    el.setAttribute('role', 'note')
    expect(el.getAttribute('id')).toBe('x')
    expect(el.outerHTML).toContain('id="x"')

    expect(() => asRemovable(el).removeAttribute('id')).not.toThrow()

    // S1 — both stores cleared.
    expect(el.getAttribute('id')).toBe(null)
    expect(el.outerHTML).not.toContain('id="x"')
    expect((el as unknown as { attrs: Record<string, string> }).attrs['id']).toBeUndefined()
    // S2 — the non-`id` key removal did NOT clear the slot.
    const el2 = mountEl()
    el2.setAttribute('id', 'x')
    el2.setAttribute('role', 'note')
    el2.removeAttribute('role')
    expect(el2.getAttribute('id')).toBe('x')
    expect(el2.outerHTML).toContain('id="x"')
    expect(el2.getAttribute('role')).toBe(null)

    // S3 — the last write wins, and the removal clears that value.
    const el3 = mountEl()
    el3.setAttribute('id', 'x')
    el3.setAttribute('id', 'y')
    el3.removeAttribute('id')
    expect(el3.getAttribute('id')).toBe(null)
    expect(el3.outerHTML).not.toContain('id="y"')
    expect(el3.outerHTML).not.toContain('id="x"')
  })

  // ---------------------------------------------------------------------
  // §2.2.1 (amendment block 6, 2026-09-27) — the `value` SLOT special case on a
  // FORM-CONTROL element. This is the `R-10` SIBLING row (§5.2): `id` and
  // `value` are the shim's two slot/store splits. The adapter sends a
  // `VALUE_FORMS` tag's `value` down its PROPERTY path
  // (`attr === 'value' && VALUE_FORMS.has(elem.tagName)` → `elem.value = …`,
  // `dist/core/adapters.js:315-318`, read) and its removal op to
  // `removeAttribute('value')` (`:296-298`, read), so a clear that touched only
  // `attrs['value']` would leave the slot stale. Scope, pinned (§2.2.1 item 3,
  // read from `dist/core/adapters.js:20`): `VALUE_FORMS` = INPUT + TEXTAREA —
  // `SELECT` is in `FORM_CONTROLS` only and keeps the store-only rule.
  // The store is seeded HERE (`setAttribute('value','7')`) because the engine's
  // property path never writes a `value` attribute, so the attribute half of
  // §2.2.1's table is only non-vacuous in a DIRECT shim row (§2.4a.1 item 2).
  // ---------------------------------------------------------------------
  it("R-10 (value sibling, §2.2.1) removeAttribute('value') on a form control clears BOTH the value slot and the attribute store", () => {
    // States:
    //   S1 (§2.2.1 item 2 row 1) a form-control whose `value` SLOT was written
    //      (`el.value = '7'`) AND whose attribute was serialized
    //      (`attrs['value'] = '7'`, `outerHTML` carries `value="7"`) →
    //      removeAttribute('value') clears BOTH
    //   S2 (§2.2.1 item 2 row 3) `attrs['value']` present with the SLOT at its
    //      `''` default → the store is cleared and the slot stays `''`
    for (const tag of ['input', 'textarea'] as const) {
      const el = new ShimElement(tag)
      el.value = '7'
      el.setAttribute('value', '7')
      expect(el.value, `${tag}: the slot really holds the prior value`).toBe('7')
      expect(el.getAttribute('value')).toBe('7')
      expect(el.outerHTML).toContain('value="7"')

      expect(() => el.removeAttribute('value')).not.toThrow()

      expect(el.value, `${tag}: the SLOT is cleared, not left stale`).toBe('')
      expect(el.value).not.toBe('7')
      expect(el.getAttribute('value')).toBe(null)
      expect(el.outerHTML).not.toContain('value="7"')
    }

    // S2 — the store is cleared, the (already default) slot is unchanged.
    const el2 = new ShimElement('input')
    el2.setAttribute('value', '7')
    expect(el2.value).toBe('')
    expect(() => el2.removeAttribute('value')).not.toThrow()
    expect(el2.getAttribute('value')).toBe(null)
    expect(el2.outerHTML).not.toContain('value="7"')
    expect(el2.value).toBe('')
  })

  it("R-10 (value sibling, §2.2.1 item 3) a NON-form-control element keeps the STORE-ONLY rule — the value slot is untouched", () => {
    // States:
    //   S1 a `div` with `attrs['value']` present → store-only: delete the
    //      attribute, and the `value` SLOT is NOT touched (a wider scope is a
    //      finding, §2.2.1 item 3)
    //   S2 the `SELECT` control (in `FORM_CONTROLS` but NOT in `VALUE_FORMS`) —
    //      the same store-only rule
    const el = mountEl()
    el.value = '7'
    el.setAttribute('value', '7')
    expect(el.getAttribute('value')).toBe('7')
    expect(el.outerHTML).toContain('value="7"')

    expect(() => el.removeAttribute('value')).not.toThrow()

    expect(el.getAttribute('value')).toBe(null)
    expect(el.outerHTML).not.toContain('value="7"')
    expect(el.value, 'a non-VALUE_FORMS tag never gets the slot special case').toBe('7')

    const sel = new ShimElement('select')
    sel.value = '7'
    sel.setAttribute('value', '7')
    expect(() => sel.removeAttribute('value')).not.toThrow()
    expect(sel.getAttribute('value')).toBe(null)
    expect(sel.outerHTML).not.toContain('value="7"')
    expect(sel.value).toBe('7')
  })

  it('R-7 css.<key> undefined removal is clean on the pre-existing 0.2.1 path', () => {
    // States:
    //   S1 a graph node authored `css: { id:'k', role:'x' }`, driven through the
    //      ENGINE (no host guard): apply the managed state-slice with
    //      `targetProp:'css.role'`, `value: undefined` → no throw out of the
    //      render, and `getAttribute('role') === null` on the node's element
    //   S2 a control: a DIFFERENT css key with a defined value still renders
    //
    // NOTE (spec decision, recorded in the report): the spec's §4.1 R-7 row
    // writes the target as `'css:role'`, but the engine's state-slice mutation
    // namespace is `css.<key>` (the `css:` colon form is matched by neither
    // `props.` nor `css.` in the engine's apply and is silently inert — the
    // `css:<key>` spelling is the ADAPTER's op-name, not the mutation's
    // targetProp). The mutation namespace is used here so the row actually
    // exercises the pre-existing `removeAttribute` call site it exists to prove.
    const env = {
      template: { root: { type: 'div', css: { id: 'k', role: 'x' } } },
      content: [],
      clientConfig: { runInstantiation: true, runRendering: true },
    }
    const t = translateLegacy(env as unknown as LegacyInitialData)
    const sup = new Supervisor({ events: new EventBridge() })
    for (const n of t.nodes) sup.registerNode(n)
    const mount = mountEl()
    const adapter = new DomAdapter(mount as never, {})
    sup.recordResolved(t.root.compile(t.nodes).actionable as never)
    const first = renderProducingProcess(
      t.root.compile(t.nodes).actionable as never,
      new Map(sup.allNodes().map((n) => [n.id, n])) as never,
      adapter as never,
      null,
      { nodeIdAttribute: true } as never,
    )
    const el = (mount as unknown as { children: ShimElement[] }).children[0]
    expect(el.getAttribute('role')).toBe('x')

    const res = sup.apply({
      kind: 'state-slice',
      node: sup.allNodes()[0],
      mutation: [{ targetProp: 'css.role', value: undefined }],
    })
    expect((res as { status: string }).status).toBe('applied')

    const cr = (sup.allNodes()[0] as unknown as { compile(n: unknown): { actionable: unknown[] } }).compile(sup.allNodes())
    expect(() =>
      renderProducingProcess(
        cr.actionable as never,
        new Map(sup.allNodes().map((n) => [n.id, n])) as never,
        adapter as never,
        // The re-emit passes the FIRST render's prevMap (the canonical
        // REQ-GAP-8 loop): the diff is what emits the `css:role` REMOVAL op.
        first.prevMap as never,
        { nodeIdAttribute: true } as never,
      ),
    ).not.toThrow()

    // S1 — the attribute is gone from the SAME element (the adapter's wire map
    // re-renders in place; the shim's `removeAttribute` is what clears it).
    expect(el.getAttribute('role')).toBe(null)
    expect(el.outerHTML).not.toContain('role=')

    // S2 — a defined css value on another key still renders.
    const env2 = {
      template: { root: { type: 'div', css: { id: 'k', role: 'x' } } },
      content: [],
      clientConfig: { runInstantiation: true, runRendering: true },
    }
    const t2 = translateLegacy(env2 as unknown as LegacyInitialData)
    const sup2 = new Supervisor({ events: new EventBridge() })
    for (const n of t2.nodes) sup2.registerNode(n)
    const mount2 = mountEl()
    sup2.recordResolved(t2.root.compile(t2.nodes).actionable as never)
    sup2.apply({ kind: 'state-slice', node: sup2.allNodes()[0], mutation: [{ targetProp: 'css.role', value: 'v' }] })
    renderProducingProcess(
      (sup2.allNodes()[0] as unknown as { compile(n: unknown): { actionable: unknown[] } }).compile(sup2.allNodes()).actionable as never,
      new Map(sup2.allNodes().map((n) => [n.id, n])) as never,
      new DomAdapter(mount2 as never, {}) as never,
      null,
      { nodeIdAttribute: true } as never,
    )
    expect((mount2 as unknown as { children: ShimElement[] }).children[0].getAttribute('role')).toBe('v')
  })

  // ---------------------------------------------------------------------
  // P-IM-2 (invariant) — strategy id `S-TAB-IDEMP-1`.
  // Fixed table of 4 keys ('title' present, 'id' present-via-special-case,
  // 'absent' never written, 'data-x' present) × call counts [1,2,3] in FIXED
  // ORDER; each row compares `outerHTML` to the single-call result. No
  // randomness, no generated inputs.
  // ---------------------------------------------------------------------
  const IDEMP_KEYS: Array<{ label: string; key: string; seed: (el: ShimElement) => void }> = [
    { label: 'title', key: 'title', seed: (el) => el.setAttribute('title', 't') },
    { label: 'id', key: 'id', seed: (el) => el.setAttribute('id', 'x') },
    { label: 'absent', key: 'absent', seed: () => undefined },
    { label: 'data-x', key: 'data-x', seed: (el) => el.setAttribute('data-x', 'v') },
  ]
  for (const { label, key, seed } of IDEMP_KEYS) {
    for (const calls of [1, 2, 3]) {
      it(`P-IM-2 [S-TAB-IDEMP-1] removeAttribute('${label}') × ${calls} leaves outerHTML identical`, () => {
        const once = mountEl()
        seed(once)
        once.removeAttribute(key)
        const single = once.outerHTML

        const many = mountEl()
        seed(many)
        for (let i = 0; i < calls; i++) {
          expect(() => many.removeAttribute(key)).not.toThrow()
        }
        expect(many.outerHTML).toBe(single)
        expect(many.getAttribute(key)).toBe(once.getAttribute(key))
      })
    }
  }

  // ---------------------------------------------------------------------
  // P-IM-2's fixed key set, EXTENDED with the `value` key (§2.2.1 item 2 row 2;
  // §5.5's block-6 note: the `value` case's idempotence half is an extension of
  // P-IM-2's table, NOT a new register row — no register row is affected).
  // Fixed table of 4 cases (INPUT slot untouched at its `''` default; TEXTAREA
  // slot untouched; INPUT slot + attribute seeded; DIV store-only) × call counts
  // [1,2,3] in FIXED ORDER; each row compares `outerHTML` to the single-call
  // result. No randomness, no generated inputs.
  // ---------------------------------------------------------------------
  const VALUE_IDEMP_CASES: Array<{
    label: string
    tag: string
    seed: (el: ShimElement) => void
    noop: boolean
  }> = [
    { label: 'INPUT, slot untouched (the default)', tag: 'input', seed: () => undefined, noop: true },
    { label: 'TEXTAREA, slot untouched (the default)', tag: 'textarea', seed: () => undefined, noop: true },
    {
      label: 'INPUT, slot + attribute seeded',
      tag: 'input',
      seed: (el) => {
        el.value = '7'
        el.setAttribute('value', '7')
      },
      noop: false,
    },
    { label: 'DIV, attrs[value] present (store-only)', tag: 'div', seed: (el) => el.setAttribute('value', '7'), noop: false },
  ]
  for (const { label, tag, seed, noop } of VALUE_IDEMP_CASES) {
    for (const calls of [1, 2, 3]) {
      it(`P-IM-2 [S-TAB-IDEMP-1] value-case removeAttribute('value') on ${tag.toUpperCase()} × ${calls} is idempotent (${label})`, () => {
        const once = new ShimElement(tag)
        seed(once)
        const pristine = once.outerHTML
        expect(() => once.removeAttribute('value')).not.toThrow()
        const single = once.outerHTML

        const many = new ShimElement(tag)
        seed(many)
        for (let i = 0; i < calls; i++) {
          expect(() => many.removeAttribute('value')).not.toThrow()
        }
        expect(many.outerHTML).toBe(single)
        expect(many.getAttribute('value')).toBe(once.getAttribute('value'))
        expect(many.value).toBe(once.value)
        // The untouched-slot case is a pure no-op: the removal changes nothing.
        if (noop) expect(single).toBe(pristine)
      })
    }
  }

  it('the completion adds EXACTLY ONE member — hasAttribute is NOT admitted (§2.2.4)', () => {
    // The §0/H-r7 admission test: `hasAttribute` is admitted only on a named
    // red-run call site, which this run does not produce. This row is the
    // static shape check that a later pass cannot grow the shim silently.
    const proto = Object.getOwnPropertyNames(ShimElement.prototype)
    expect(proto).toContain('removeAttribute')
    expect(proto).not.toContain('hasAttribute')
    for (const forbidden of ['closest', 'querySelector', 'querySelectorAll', 'dispatchEvent', 'matchMedia', 'getComputedStyle', 'setProperty']) {
      expect(proto).not.toContain(forbidden)
    }
  })
})
