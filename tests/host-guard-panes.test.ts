// tests/host-guard-panes.test.ts — the PANE-FIXTURE rows `PF-1..PF-8` of the
// §4.1 RED SET of docs/specs/engine-pin.md (`U-ENGINE-PIN`), and the §5.5
// register row `P-SM-3` / strategy `S-TAB-PANE-1` (ruling 2, "Add test panes to
// the suite for testability").
//
// WHAT THIS FILE REPLACES. The pre-amendment `R-13` was a SINGLE row — "the
// `SecurePanels` managed channel refuses a nullish `props.value` write and
// keeps the last-known value" — that was **NOT EXECUTABLE**: the predicate was
// unreachable (`syncConfig` private, both shipped writes defined, no test
// reference to `paneMutationValid`, grep-verified), so any green on it would
// have been a FALSE GREEN (the adversarial pass's `H-02`,
// `docs/specs/engine-pin-greens.md:171`). Ruling 2 **REPLACED** that row with
// these eight rows; the old row is superseded, never dropped and never deleted
// from the record (spec §4.1 `R-13`, §8 supersession index).
//
// THE AMENDED CONTRACT (spec §2.4, ruling 1 applied to the pane channel):
//   * the pane's predicate (`paneMutationValid`, `src/renderer/secure-panels.ts:68-85`,
//     read) is SHAPE-ONLY — a non-object element, a missing/non-string
//     `targetProp`. It no longer inspects `value`;
//   * a `props.<key>` / `css.<key>` element carrying `undefined` / `null` /
//     absent `value` is **APPLIED** through `supervisor.apply` and the attribute
//     is removed (the shim completion handles it);
//   * a SHAPE-invalid batch for a node is **SKIPPED WHOLE** — the node keeps its
//     prior state and re-renders last-known, and `syncConfig` returns `void`
//     with no status channel (the `try/catch` behaviour at `:313-315`,
//     `:326-328`). This is `M8` (§3.6) and it is the pane half of the reject class;
//   * "other panes untouched" — a nullish write on one node leaves sibling
//     panes and the node's other props unchanged;
//   * the pane channel's predicate must differ from §2.3's in **nothing but its
//     container**; a divergence is a finding (§2.4).
//
// THE INJECTION POINT (spec §2.4a, the adopted option 3). Ruling 2 authorises
// exactly ONE production seam for testability:
//   `SecurePanels.applyPaneMutation(nodeId: string, mutation: unknown[]):
//      { status: string; applied: boolean }`
// which runs `paneMutationValid(mutation)` and, on `true`, calls
// `this.supervisor.apply({kind:'state-slice', node, mutation})` + `this.render()`
// and returns the engine's `status`; on `false` it returns
// `{ status: 'rejected', applied: false }` and applies nothing. It is reached
// here through ONE local structural type + cast, so the RED run reports a clean
// assertion failure (the seam does not exist yet) instead of a compile error.
//
// TDD (second red cycle): these rows are written FIRST from the AMENDED spec and
// are expected to FAIL because the SEAM IS ABSENT (`SecurePanels` exposes no
// `applyPaneMutation` — only `dispatch`, `refresh`, `refreshDebug`, `debugText`,
// read in `src/renderer/secure-panels.ts:238-304`). The spec states this
// explicitly: the fixture half and the injection half are the amendment's two
// halves, and the Implementer has not landed the injection half. The rows are
// written against the SEAM THE SPEC NAMES — no alternative seam is invented, and
// `src/**` is not touched by this file.
import { describe, it, expect, beforeAll } from 'vitest'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import type { ShimElement } from '../src/shared/dom-shim.js'
import { Runtime } from '../src/renderer/runtime.js'
import { SecurePanels } from '../src/renderer/secure-panels.js'
import {
  PANE_NODES,
  absentValueKeyMutation,
  definedValueMutation,
  malformedMissingTargetPropMutation,
  malformedNonObjectMutation,
  malformedNonStringTargetPropMutation,
  nullValueMutation,
  paneFixtureRows,
  shippedToggleMutation,
  siblingDefinedMutation,
  undefinedValueMutation,
} from './fixtures/pane-mutation-fixture.mjs'

beforeAll(() => {
  installShim()
})

/** The spec-named injection point (§2.4a). Reached through a structural cast so
 *  the RED run fails as an assertion, not as a compile error — the same
 *  technique `tests/dom-shim-remove-attribute.test.ts:37` uses for
 *  `removeAttribute` before it landed. */
type PaneApplyResult = { status: string; applied: boolean }
type PaneSeam = { applyPaneMutation(nodeId: string, mutation: unknown[]): PaneApplyResult }
const seamOf = (panels: SecurePanels): PaneSeam => panels as unknown as PaneSeam

/** THE `applied` INVARIANT (third-red-cycle ruling, spec §2.4/§2.4a).
 *
 *  `applied` means "the ENGINE applied it" — `applied === (status === 'applied')`:
 *    * a SHAPE refusal by the pane predicate returns `{status:'rejected', applied:false}`;
 *    * an ENGINE refusal (unknown/cross-graph node, malformed-op, no-usable-state …)
 *      returns the engine's own verdict with `applied:false`;
 *    * only an ENGINE-APPLIED write returns `applied:true`.
 *
 *  The landed seam violates this on the engine-refusal branch: it returns
 *  `{ status: <engine verdict>, applied: true }` unconditionally once the
 *  predicate passes (`src/renderer/secure-panels.ts:299-305`, read) — the
 *  `{"status":"rejected","applied":true}` pair the blind re-run measured
 *  (`docs/specs/engine-pin-greens.md:344-355`, finding `F-5`, read).
 *
 *  It is a HELPER, not a row: every PF call below feeds it, so the invariant is
 *  checked over the whole fixture matrix and not only in one place. */
function expectAppliedSemantics(res: PaneApplyResult, label: string): void {
  expect(res.applied, `${label}: applied must mean "the engine applied it"`).toBe(res.status === 'applied')
  expect(res.applied === true, `${label}: only an engine-APPLIED write reports applied:true`).toBe(
    res.status === 'applied',
  )
}

/** The pane host over the SHIPPED pane graph. The pane graph is isolated, so
 *  the constructor + an explicit `refresh()` is all the boot the rows need; no
 *  IPC bridge is installed (the fixture rows drive the mutation channel, not
 *  the security bridge — spec §2.4a). */
async function bootPanes(): Promise<{ panels: SecurePanels; mount: ShimElement }> {
  const mount = mountEl()
  const panels = new SecurePanels(mount as never)
  await panels.refresh()
  return { panels, mount }
}

/** The engine nodeId of the pane node authored at `props.id === propsId`, or
 *  `null` when the pane graph does not carry that authored id. */
function findPaneNode(panels: SecurePanels, propsId: string): string | null {
  const node = (panels as unknown as {
    supervisor: { allNodes(): Array<{ id: string; props?: { id?: string } }> }
  }).supervisor
    .allNodes()
    .find((n) => n.props?.id === propsId)
  return node ? node.id : null
}

/** The engine nodeId of the pane node authored at `props.id === propsId` — the
 *  vocabulary `SecurePanels` itself uses (spec §4.2's pane exception). */
function nodeIdOf(panels: SecurePanels, propsId: string): string {
  const id = findPaneNode(panels, propsId)
  if (!id) throw new Error(`pane harness: no pane node authored at props.id '${propsId}'`)
  return id
}

/** The pane's raw shim element for an authored `props.id`, walked from the
 *  mount's element tree (the pane renders into the mount it was given). */
function paneEl(mount: ShimElement, propsId: string): ShimElement | null {
  return (mount as unknown as { children: ShimElement[] }).children
    .map((c) => findEl(c, propsId))
    .find((e) => e !== null) ?? null
}

function findEl(el: ShimElement, propsId: string): ShimElement | null {
  if (el.getAttribute('id') === propsId) return el
  for (const c of el.children) {
    const hit = findEl(c, propsId)
    if (hit) return hit
  }
  return null
}

/** The innerHTML of the pane mount (`SecurePanels`' own render surface). */
const htmlOf = (mount: ShimElement): string => mount.innerHTML

// ---- the character-level attribute extractor (§4 shared harness) -----------
function attrsOfTag(html: string, tag: string): Map<string, string | null> | null {
  const i = html.toLowerCase().indexOf('<' + tag.toLowerCase())
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

/** The attributes of the tag carrying `id="<propsId>"` (the pane addresses its
 *  nodes by their authored `props.id`). */
function attrsOfPropsId(html: string, propsId: string): Map<string, string | null> {
  let i = 0
  while (true) {
    const lt = html.indexOf('<', i)
    if (lt === -1) throw new Error(`pane harness: no tag carries id="${propsId}"`)
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
    if (map && map.get('id') === propsId) return map
    i = j + 1
  }
}

describe('the pane channel — the fixture rows PF-1..PF-8 (spec §2.4a, §4.1 R-13, §5.5 P-SM-3)', () => {
  it('the fixture\'s authored ids resolve against the shipped pane graph (precondition)', async () => {
    // Not a PF-row: the precondition every PF-row depends on. If the pane graph
    // does not render the nodes the fixture addresses, no PF-row's observable
    // means anything.
    const { panels, mount } = await bootPanes()
    const html = htmlOf(mount)
    // The REAL pane graph the shipped `SecurePanels` renders — the fixture's
    // authored ids resolve against it (see the fixture header).
    expect(html).toContain('settings-pane')
    expect(html).toContain('journal-length')
    expect(html).toContain('group-toggles')
    expect(attrsOfPropsId(html, PANE_NODES.toggleRead).get('data-on'), 'toggle:read is read-enabled at boot').toBe('true')
    expect(attrsOfPropsId(html, PANE_NODES.siblingToggle).get('data-on'), 'the sibling pane toggle').toBe('true')
    // A precondition, not a PF-row: every observable the PF-rows read must be
    // reachable by the id the fixture addresses.
    expect(nodeIdOf(panels, PANE_NODES.journalLengthInput)).toBeTruthy()
    expect(nodeIdOf(panels, PANE_NODES.siblingToggle)).toBeTruthy()
  })

  it('PF-1 [S-TAB-PANE-1] a DEFINED value applies and the pane re-renders with the value in the element\'s `value` slot', async () => {
    // State: `props.value: '7'` on `journal-length-input`.
    // Fail-state: none (this is the control — if the DEFINED write fails, the
    // fixture is not driving the real channel, and every other PF-row is void).
    //
    // THE OBSERVABLE IS THE ELEMENT'S `value` SLOT, NOT A SERIALIZED ATTRIBUTE
    // (spec §2.4a PF-1). The engine's adapter routes a `value` write on a
    // `VALUE_FORMS` tag (`INPUT`/`TEXTAREA`, `dist/core/adapters.js:20`, read)
    // to the DOM PROPERTY — `attr === 'value' && VALUE_FORMS.has(elem.tagName)`
    // → `elem.value = bakeValue(val)` (`dist/core/adapters.js:315-318`, read;
    // the form-control path `:201-209` likewise writes `formEl.value`) — so the
    // pane's serialized HTML NEVER carries a `value="…"` attribute. The row
    // previously asserted `attrsOfPropsId(...).get('value')` and read
    // `undefined`; that assertion was asserting a serialization the engine
    // does not produce. It is replaced by the two observables that ARE real:
    // the shim element's `value` slot is `'7'`, and the HTML carries NO `value`
    // attribute (recorded exactly, so the absence is pinned, not implied).
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)

    let res!: PaneApplyResult
    expect(() => {
      res = seamOf(panels).applyPaneMutation(id, [{ targetProp: 'props.value', mode: 'replace', value: '7' }])
    }).not.toThrow()
    expect(res).toEqual({ status: 'applied', applied: true })
    expectAppliedSemantics(res, 'PF-1')

    // The render shows the value through the property slot the engine writes.
    expect(paneEl(mount, PANE_NODES.journalLengthInput)?.value).toBe('7')
    // ...and NOT through a `value` attribute — the VALUE_FORMS tag never gets
    // one (`dist/core/adapters.js:315-318`).
    expect(
      attrsOfPropsId(htmlOf(mount), PANE_NODES.journalLengthInput).has('value'),
      'a VALUE_FORMS tag takes the PROPERTY path — its HTML carries no `value` attribute',
    ).toBe(false)
  })

  it('PF-2 [S-TAB-PANE-1] props.value: undefined PASSES THROUGH — applied, the prior value is gone, never thrown', async () => {
    // State: `props.value: undefined` on the same node, AFTER a defined `'7'`
    // has been applied (so "the prior value is gone, not held" is observable).
    // Mechanism recorded precisely (§2.4a PF-2): the landed dist's adapter
    // handles `undefined` on a VALUE_FORMS tag by `formEl.value = ''`
    // (`dist/core/adapters.js:201-209`, read) — the shim's `removeAttribute` is
    // reached for the ATTRIBUTE paths, not for a form control's `value`. The
    // assertion is therefore "the prior `'7'` is not retained", NOT
    // "removeAttribute('value') was called".
    // Fail-state: a `{status:'rejected'}` here is the SUPERSEDED pre-amendment
    // semantics and a capability loss (ruling 1).
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)

    // The defined control first: prove the node really carries `'7'`.
    const control = seamOf(panels).applyPaneMutation(id, [{ targetProp: 'props.value', mode: 'replace', value: '7' }])
    expect(control).toEqual({ status: 'applied', applied: true })
    expectAppliedSemantics(control, 'PF-2 control')
    expect(paneEl(mount, PANE_NODES.journalLengthInput)?.value).toBe('7')

    let res!: PaneApplyResult
    expect(() => {
      res = seamOf(panels).applyPaneMutation(id, undefinedValueMutation())
    }).not.toThrow()

    expect(res).toEqual({ status: 'applied', applied: true })
    expectAppliedSemantics(res, 'PF-2')
    const el = paneEl(mount, PANE_NODES.journalLengthInput)
    expect(el?.value, 'the prior value is not retained').not.toBe('7')
    expect(el?.value).toBe('')
    expect(attrsOfPropsId(htmlOf(mount), PANE_NODES.journalLengthInput).get('value')).not.toBe('7')
  })

  it('PF-3 [S-TAB-PANE-1] props.value: null PASSES THROUGH — applied, the prior value is not retained', async () => {
    // State: `props.value: null` after a defined `'7'`.
    // AF-7 boundary (§2.4a PF-3): `null` is NOT `undefined`, so on a
    // VALUE_FORMS tag it takes the `bakeValue(val)` branch and is STRINGIFIED
    // rather than cleared. The row asserts the pass-through VERDICT (applied,
    // no throw, the prior value not retained); the exact serialized form is
    // recorded, not pinned.
    // Fail-state: a rejection here is the superseded semantics.
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)
    expect(seamOf(panels).applyPaneMutation(id, [{ targetProp: 'props.value', mode: 'replace', value: '7' }])).toEqual({
      status: 'applied',
      applied: true,
    })

    let res!: PaneApplyResult
    expect(() => {
      res = seamOf(panels).applyPaneMutation(id, nullValueMutation())
    }).not.toThrow()

    expect(res).toEqual({ status: 'applied', applied: true })
    expectAppliedSemantics(res, 'PF-3')
    expect(paneEl(mount, PANE_NODES.journalLengthInput)?.value, 'the prior value is not retained').not.toBe('7')
  })

  it('PF-4 [S-TAB-PANE-1] an ABSENT value key is the same removal as an explicit undefined (AF-7)', async () => {
    // State: the `value` KEY ABSENT after a defined `'7'` (AF-7, reconciled
    // once with §3.4 PA-4: both build `{props:{[key]: undefined}}`).
    // Fail-state: a rejection here is the superseded semantics.
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)
    expect(seamOf(panels).applyPaneMutation(id, [{ targetProp: 'props.value', mode: 'replace', value: '7' }])).toEqual({
      status: 'applied',
      applied: true,
    })
    expect(paneEl(mount, PANE_NODES.journalLengthInput)?.value).toBe('7')

    let res!: PaneApplyResult
    expect(() => {
      res = seamOf(panels).applyPaneMutation(id, absentValueKeyMutation())
    }).not.toThrow()

    expect(res, 'an absent value key and an explicit undefined are ONE contract').toEqual({
      status: 'applied',
      applied: true,
    })
    expectAppliedSemantics(res, 'PF-4')
    expect(paneEl(mount, PANE_NODES.journalLengthInput)?.value).not.toBe('7')
  })

  it('PF-5 [S-TAB-PANE-1] a SHAPE-malformed element skips the node batch whole and re-renders last-known', async () => {
    // State: a shape-malformed element (non-object / missing `targetProp` /
    // non-string `targetProp`) — the pane half's reject class (M8, §3.6).
    // Expected: `{status:'rejected', applied:false}`, NOTHING applied, the
    // node's state unchanged, and the last-known state still rendered after the
    // rejected call (§2.4). This is the ONE row where the last-known-value
    // observation survives (AF-8).
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)
    expect(seamOf(panels).applyPaneMutation(id, [{ targetProp: 'props.value', mode: 'replace', value: '7' }])).toEqual({
      status: 'applied',
      applied: true,
    })
    const before = htmlOf(mount)
    const beforeValue = paneEl(mount, PANE_NODES.journalLengthInput)?.value

    const shapes: unknown[][] = [
      malformedNonObjectMutation(),
      malformedMissingTargetPropMutation(),
      malformedNonStringTargetPropMutation(),
    ]
    for (const shape of shapes) {
      let res!: PaneApplyResult
      expect(() => {
        res = seamOf(panels).applyPaneMutation(id, shape)
      }).not.toThrow()
      expect(res, `shape ${JSON.stringify(shape)} must be refused whole`).toEqual({ status: 'rejected', applied: false })
      expectAppliedSemantics(res, `PF-5 shape ${JSON.stringify(shape)}`)
      // Last-known state survives: the batch was skipped WHOLE.
      expect(htmlOf(mount), 'last-known state still rendered').toBe(before)
      expect(paneEl(mount, PANE_NODES.journalLengthInput)?.value).toBe(beforeValue)
    }
  })

  it("PF-6 [S-TAB-PANE-1] the SHIPPED write's shape (props.data-on) applies and renders", async () => {
    // State: `props.data-on: 'false'` on `toggle:read` — the shape AND the
    // literal pair `SecurePanels.syncConfig` itself writes
    // (`src/renderer/secure-panels.ts:352`: `on ? 'true' : 'false'`), injected
    // with the pane's current `on` state, so the row asserts the shipped write
    // is not a reject.
    // Proves the fixture drives the REAL channel and not only the removal path.
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.toggleRead)
    // The pane's boot state: 'read' is an enabled group, so the shipped write's
    // `on` half is 'true' at this point — asserted so the row's literal is not
    // taken on faith.
    expect(attrsOfPropsId(htmlOf(mount), PANE_NODES.toggleRead).get('data-on')).toBe('true')

    let res!: PaneApplyResult
    expect(() => {
      res = seamOf(panels).applyPaneMutation(id, shippedToggleMutation('false'))
    }).not.toThrow()

    expect(res).toEqual({ status: 'applied', applied: true })
    expectAppliedSemantics(res, 'PF-6')
    expect(attrsOfPropsId(htmlOf(mount), PANE_NODES.toggleRead).get('data-on')).toBe('false')
    expect(paneEl(mount, PANE_NODES.toggleRead)?.getAttribute('data-on')).toBe('false')

    // ...and the shipped write's ON half round-trips (both literals of the pair).
    const back = seamOf(panels).applyPaneMutation(id, shippedToggleMutation('true'))
    expect(back).toEqual({ status: 'applied', applied: true })
    expectAppliedSemantics(back, 'PF-6 round-trip')
    expect(attrsOfPropsId(htmlOf(mount), PANE_NODES.toggleRead).get('data-on')).toBe('true')
  })

  it('PF-7 [S-TAB-PANE-1] a nullish write on one pane leaves the SIBLING pane untouched', async () => {
    // State: PF-2's nullish mutation on the settings pane's target node PLUS a
    // defined write on a SIBLING node (made as TWO calls, so "untouched ACROSS
    // the nullish call" is observable), then a repeat of the nullish call.
    // The target node's own other props must be unchanged too.
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)
    const siblingId = nodeIdOf(panels, PANE_NODES.siblingToggle)

    // The sibling's observable: a DEFINED write on the sibling node first.
    const siblingWrite = seamOf(panels).applyPaneMutation(siblingId, siblingDefinedMutation('false'))
    expect(siblingWrite).toEqual({
      status: 'applied',
      applied: true,
    })
    expectAppliedSemantics(siblingWrite, 'PF-7 sibling control')
    const siblingAttrsBefore = attrsOfPropsId(htmlOf(mount), PANE_NODES.siblingToggle)
    expect(siblingAttrsBefore.get('data-on')).toBe('false')

    // The nullish write on the target node, twice — the mutation is taken FROM
    // the fixture's own `PF-7` row (`paneFixtureRows()`), so this row and the
    // `P-SM-3` register row below cannot drift apart.
    const fixturePf7 = (paneFixtureRows() as Array<{ id: string; build(): unknown }>).find((r) => r.id === 'PF-7')
    expect(fixturePf7, 'the fixture carries the PF-7 row').toBeTruthy()
    for (const call of [1, 2]) {
      const res = seamOf(panels).applyPaneMutation(id, fixturePf7!.build() as unknown[])
      expect(res, `nullish call ${call}`).toEqual({ status: 'applied', applied: true })
      expectAppliedSemantics(res, `PF-7 nullish call ${call}`)
      // The SIBLING node is unchanged across the nullish call.
      expect(attrsOfPropsId(htmlOf(mount), PANE_NODES.siblingToggle), `sibling after call ${call}`).toEqual(
        siblingAttrsBefore,
      )
      // The third node, in the same pane as the target, is untouched too.
      expect(attrsOfPropsId(htmlOf(mount), PANE_NODES.toggleRead).get('data-on')).toBe('true')
      // The nullish node's OWN other props are unchanged (no collateral damage).
      expect(attrsOfPropsId(htmlOf(mount), PANE_NODES.journalLengthInput).get('type')).toBe('number')
    }
  })

  it('PF-8 [S-TAB-PANE-1] a repeated nullish write is IDEMPOTENT — applied, identical state', async () => {
    // State: PF-2's mutation repeated. Second call must still be `applied`,
    // still not throw, and leave `outerHTML`/state identical to after the first
    // (the removal is idempotent through the completion, §2.2.2).
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)
    expect(seamOf(panels).applyPaneMutation(id, [{ targetProp: 'props.value', mode: 'replace', value: '7' }]).applied).toBe(true)

    const first = seamOf(panels).applyPaneMutation(id, undefinedValueMutation())
    expect(first).toEqual({ status: 'applied', applied: true })
    expectAppliedSemantics(first, 'PF-8 first call')
    const afterFirst = htmlOf(mount)
    const afterFirstValue = paneEl(mount, PANE_NODES.journalLengthInput)?.value

    let second!: PaneApplyResult
    expect(() => {
      second = seamOf(panels).applyPaneMutation(id, undefinedValueMutation())
    }).not.toThrow()

    expect(second).toEqual({ status: 'applied', applied: true })
    expectAppliedSemantics(second, 'PF-8 second call')
    expect(htmlOf(mount), 'outerHTML/state identical after the repeat').toBe(afterFirst)
    expect(paneEl(mount, PANE_NODES.journalLengthInput)?.value).toBe(afterFirstValue)
  })

  // -------------------------------------------------------------------
  // M8 (§3.6) — the pane half of the reject class, asserted once as the
  // named M-row so the R-12 table in tests/host-guard.test.ts can point at it
  // without duplicating the shape rows.
  // -------------------------------------------------------------------
  it('M8 [S-TAB-PANE-1] a shape-malformed batch for a node is skipped WHOLE — the pane channel\'s fail-state', async () => {
    // Same contract as PF-5, asserted as the named M8 row (§3.6): the pane
    // channel returns `void` from `syncConfig` and has no status channel, so the
    // observable is "prior state + last-known render survive".
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.siblingToggle)
    const before = htmlOf(mount)
    const res = seamOf(panels).applyPaneMutation(id, malformedNonObjectMutation())
    expect(res).toEqual({ status: 'rejected', applied: false })
    expectAppliedSemantics(res, 'M8')
    expect(htmlOf(mount)).toBe(before)
  })
})

// ===========================================================================
// THE THIRD RED CYCLE — the pane seam's MISSING reject class and its
// UNDER-ASSERTED return shape (adversarial findings on `U-ENGINE-PIN`).
//
// Two gaps, both stated by the contract and neither covered by PF-1..PF-8:
//
//  1. **The NON-ARRAY batch (M9, §3.6's M-table next row).** §2.4 says the
//     pane predicate "must differ from §2.3's in **nothing but their
//     container**" — and §2.3's predicate ALREADY refuses a non-array batch at
//     the Runtime (`src/renderer/runtime.ts:409-414`, read: `if (cmd.kind ===
//     'state-slice' && !Array.isArray(cmd.mutation)) return { status: 'rejected' }`,
//     and the same for `layer-apply`). The pane half reaches its predicate with
//     `mutation` typed `unknown[]` and iterates it directly
//     (`src/renderer/secure-panels.ts:72-79`, read), so any non-iterable value
//     escapes as `TypeError: mutation is not iterable` instead of the
//     `{status:'rejected', applied:false}` pair `M1`'s class requires.
//     The Runtime's guard is `Array.isArray`-shaped ON PURPOSE: a Proxy around
//     an array would pass a duck-typed/`Symbol.iterator` test but must still be
//     refused, so the row table pins that case too.
//
//  2. **`applied` must mean "the ENGINE applied it"** — `applied ===
//     (status === 'applied')`. The landed seam returns `applied: true`
//     unconditionally once the predicate passes (`secure-panels.ts:299-305`,
//     read), so an ENGINE refusal is reported as applied: the blind re-run
//     measured `{"status":"rejected","applied":true}` for an unresolved nodeId
//     (`docs/specs/engine-pin-greens.md:344-355`, `F-5`, read). Three rows pin
//     the three branches the doc's two-branch text omitted.
// ===========================================================================

/** A minimal APP-graph runtime — used ONLY to obtain a REAL app-graph nodeId.
 *  Same envelope shape `tests/host-guard.test.ts` boots (§4.2), so the id is
 *  the app graph's own vocabulary and not a literal this row invents. */
function bootAppGraph(): Runtime {
  const env = {
    template: {
      root: {
        type: 'div',
        css: { id: 'app-root' },
        props: { id: 'app-root' },
        children: [{ type: 'div', css: { id: 'app-child' }, props: { id: 'app-child' } }],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
  const r = new Runtime({ mount: mountEl() as never, envelope: env as never })
  r.bootstrap()
  return r
}

describe('the pane channel — M9 (the non-array batch) and the `applied` semantics (third red cycle)', () => {
  it('M9 [S-TAB-PANE-1] a NON-ARRAY batch is REFUSED as {status:rejected, applied:false} and NEVER throws', async () => {
    // The reject class the pane predicate is missing. Fixed table, FIXED ORDER.
    //
    // The six rows are the Runtime's own M1 class (`runtime.ts:409-414`) plus
    // the two shapes a duck-typed check would wrongly admit:
    //   R1 `{}`                — a plain non-iterable object
    //   R2 `undefined`         — an absent batch
    //   R3 a string            — ITERABLE, but not an array (a `for … of` would
    //                            "work" and yield characters)
    //   R4 a number            — not iterable
    //   R5 `null`              — not iterable
    //   R6 a Proxy whose `Symbol.iterator` GETTER THROWS — an `Array.isArray`
    //      guard never touches the trap (so it is refused cleanly), while ANY
    //      iterator-protocol test throws the caller's own error out of the seam
    //
    // Fail-state for every row: a throw out of `applyPaneMutation` (today:
    // `TypeError: mutation is not iterable` for R1/R2/R4/R5, and R6's own
    // `PROXY-ITERATOR-TRAP` error), or any verdict other than the
    // `{status:'rejected', applied:false}` pair (§2.4/§3.6 M-class).
    //
    // Two of the six rows (R3 the string, R6 the Proxy) do NOT throw on the
    // landed tree: R3 iterates as characters and R6 never has its trap read by
    // `for … of`, so both fall through to the engine's `unknown-node` rejection
    // — already the pinned pair. They are carried because the `Array.isArray`
    // guard is what must keep them refused (a later duck-typed iterator test
    // would re-break R6), and this is recorded rather than left implicit.
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)
    const before = htmlOf(mount)

    const throwingIteratorProxy = new Proxy(
      {},
      {
        get(target, prop, receiver) {
          if (prop === Symbol.iterator) throw new Error('PROXY-ITERATOR-TRAP: the seam read Symbol.iterator')
          return Reflect.get(target, prop, receiver)
        },
      },
    )
    // The Proxy itself is sound — the trap fires only if the seam reads it.
    expect(() => Reflect.get(throwingIteratorProxy, 'arbitrary-key')).not.toThrow()

    const table: Array<{ label: string; batch: unknown }> = [
      { label: 'R1 non-array batch: {} (plain object)', batch: {} },
      { label: 'R2 non-array batch: undefined (absent)', batch: undefined },
      { label: 'R3 non-array batch: a string (iterable, not an array)', batch: 'x' },
      { label: 'R4 non-array batch: a number', batch: 42 },
      { label: 'R5 non-array batch: null', batch: null },
      { label: 'R6 non-array batch: a Proxy whose Symbol.iterator getter THROWS', batch: throwingIteratorProxy },
    ]

    for (const { label, batch } of table) {
      let res!: PaneApplyResult
      expect(() => {
        res = seamOf(panels).applyPaneMutation(id, batch as unknown[])
      }, label).not.toThrow()
      expect(res, label).toEqual({ status: 'rejected', applied: false })
      expectAppliedSemantics(res, label)
    }

    // Refused WHOLE: nothing applied, the last-known render survives.
    expect(htmlOf(mount), 'a refused batch applies nothing').toBe(before)
  })

  it('applied-semantics (a): an UNKNOWN nodeId is refused, and the refusal is NOT reported as applied', async () => {
    // State: the batch SHAPE is valid (so the predicate passes) but the target
    // does not resolve — the ENGINE's refusal, the third branch §2.4a's
    // two-branch text omitted (`docs/specs/engine-pin-greens.md:344-355`, F-5).
    // Expected: no throw, `status` is the ENGINE's verdict (`'rejected'` —
    // `Supervisor.apply`'s `unknown-node` guard, `dist/core/supervisor.js:849`,
    // read) and `applied === false`, because the engine applied nothing.
    const { panels, mount } = await bootPanes()
    const before = htmlOf(mount)

    let res!: PaneApplyResult
    expect(() => {
      res = seamOf(panels).applyPaneMutation('no-such-node', undefinedValueMutation())
    }).not.toThrow()

    expect(res.status, "the engine's own verdict for an unresolved target").toBe('rejected')
    expect(res.applied, 'an ENGINE refusal is NEVER reported as applied').toBe(false)
    expectAppliedSemantics(res, 'unknown nodeId')
    expect(htmlOf(mount)).toBe(before)
  })

  it("applied-semantics (b): an APP-graph nodeId is not resolvable on the pane channel — refused, not applied", async () => {
    // State: a REAL node id taken from the APP graph (the ids the app runtime
    // mints — the same fixture vocabulary `tests/host-guard.test.ts` uses). The
    // pane graph is an ISOLATED graph, so the pane channel must not resolve it.
    // Fail-state: the engine APPLYING a write addressed to another graph's node
    // (a cross-graph leak) — or reporting it as applied.
    const app = bootAppGraph()
    const appNodeId = app.listTargets().nodes[0]?.nodeId
    expect(appNodeId, 'the app graph mints at least one node id (precondition)').toBeTruthy()

    const { panels, mount } = await bootPanes()
    // The pane graph does not carry that id under ANY authored `props.id` —
    // i.e. the two graphs' node namespaces are disjoint (isolation precondition).
    expect(findPaneNode(panels, appNodeId!), 'the app graph\'s node id is not a pane node id').toBe(null)
    expect(findPaneNode(panels, PANE_NODES.journalLengthInput), 'the pane graph IS populated (control)').toBeTruthy()
    const before = htmlOf(mount)

    let res!: PaneApplyResult
    expect(() => {
      res = seamOf(panels).applyPaneMutation(appNodeId!, [{ targetProp: 'props.hidden', mode: 'replace', value: 'true' }])
    }).not.toThrow()

    expect(res.status, "the pane channel refuses another graph's node").toBe('rejected')
    expect(res.applied, 'a cross-graph refusal is NEVER reported as applied').toBe(false)
    expectAppliedSemantics(res, 'app-graph nodeId')
    expect(htmlOf(mount)).toBe(before)
  })

  it('applied-semantics (c): an EMPTY batch [] is consistent — record the engine\'s verdict', async () => {
    // State: `mutation: []` — nothing to change. §3.5 P6 records the same shape
    // on the app channel and expressly does NOT pin the status there.
    // The row therefore pins the PAIR's consistency (the invariant), notes the
    // verdict, and asserts the render is untouched: an empty batch changes
    // nothing, whatever the engine calls it.
    const { panels, mount } = await bootPanes()
    const id = nodeIdOf(panels, PANE_NODES.journalLengthInput)
    const before = htmlOf(mount)

    let res!: PaneApplyResult
    expect(() => {
      res = seamOf(panels).applyPaneMutation(id, [])
    }).not.toThrow()

    // RECORDED VERDICT: the engine treats an empty state-slice as `applied`
    // (`Supervisor.apply`'s state-slice branch reaches the `applied` return
    // unconditionally after the entry gate, `dist/core/supervisor.js:1013-1014`,
    // read). Recorded, not derived from the spec — §3.5 P6 leaves it unpinned.
    expect(res.status, 'the engine\'s verdict for an empty batch (recorded)').toBe('applied')
    expectAppliedSemantics(res, 'empty batch []')
    expect(res.applied, 'an engine-applied empty batch').toBe(true)
    expect(htmlOf(mount), 'an empty batch changes nothing').toBe(before)
  })
})

// ===========================================================================
// P-SM-3's REGISTER CLAIM, MADE LITERALLY TRUE (§5.5: "PF-1..PF-8 as a FIXED
// 8-row table, fixed order, driven through `SecurePanels.applyPaneMutation` by
// the `tests/fixtures/pane-mutation-fixture.mjs` fixture").
//
// `paneFixtureRows()` was exported by the fixture and consumed by NO test
// (grep-verified), so the eight `PF-*` `it()` blocks above were HAND-WRITTEN and
// the register's citation was aspirational. These rows consume the export:
//   * the register's structural claims (8 rows, fixed order, one per PF id);
//   * the fixture's own data is self-consistent and each row's node RESOLVES
//     against the shipped pane graph;
//   * each row's `build()` output is the mutation the landed row injects.
// ===========================================================================

type PaneFixtureRow = {
  id: string
  label: string
  node: string
  state: string
  failState: string
  build: () => unknown
}

describe('P-SM-3 [S-TAB-PANE-1] the fixture register — paneFixtureRows() is the fixed 8-row table', () => {
  it('P-SM-3 — the fixture exports the fixed 8-row table, fixed order, one row per PF id', () => {
    const rows = paneFixtureRows() as PaneFixtureRow[]
    expect(rows.map((r) => r.id)).toEqual(['PF-1', 'PF-2', 'PF-3', 'PF-4', 'PF-5', 'PF-6', 'PF-7', 'PF-8'])
    for (const r of rows) {
      expect(r.label, `${r.id} names its state`).toBeTruthy()
      expect(r.state, `${r.id} names its state`).toBeTruthy()
      expect(r.failState, `${r.id} names its fail-state`).toBeTruthy()
      expect(typeof r.build, `${r.id} builds its own data`).toBe('function')
      // A function, not a shared object: no row can mutate another row's data.
      expect(r.build(), `${r.id} build() returns its own array`).not.toBe(r.build())
    }
  })

  it('P-SM-3 — every fixture row node RESOLVES against the shipped pane graph', async () => {
    const { panels } = await bootPanes()
    for (const r of paneFixtureRows() as PaneFixtureRow[]) {
      expect(() => nodeIdOf(panels, r.node), `${r.id}: node '${r.node}' resolves on the pane graph`).not.toThrow()
    }
  })

  it('P-SM-3 — each fixture row\'s build() is the mutation the landed PF row injects', () => {
    // The register's claim is not just "an export exists": the fixture's data
    // must be the data the rows drive. Compared against the LANDED rows'
    // builders (the `const mutation = …` bindings in the PF blocks above).
    const byId = new Map((paneFixtureRows() as PaneFixtureRow[]).map((r) => [r.id, r]))
    const landed: Array<{ id: string; mutation: unknown }> = [
      { id: 'PF-1', mutation: definedValueMutation('7') },
      { id: 'PF-2', mutation: undefinedValueMutation() },
      { id: 'PF-3', mutation: nullValueMutation() },
      { id: 'PF-4', mutation: absentValueKeyMutation() },
      { id: 'PF-5', mutation: malformedNonObjectMutation() },
      { id: 'PF-6', mutation: shippedToggleMutation('false') },
      // PF-7's LANDED row is TWO calls: the undefined removal on the target PLUS
      // the sibling control (`siblingDefinedMutation('false')`). The fixture row
      // carries only the FIRST half — recorded divergence, asserted below.
      { id: 'PF-7', mutation: undefinedValueMutation() },
      { id: 'PF-8', mutation: undefinedValueMutation() },
    ]
    for (const { id, mutation } of landed) {
      expect(byId.get(id)?.build(), `${id}: the fixture row builds the landed mutation`).toEqual(mutation)
    }
    // The sibling control PF-7 uses is the fixture's own builder — so the
    // divergence is a missing half, not a second vocabulary.
    expect(siblingDefinedMutation('false')).toEqual([{ targetProp: 'props.data-on', mode: 'replace', value: 'false' }])
  })
})
