// tests/focus-tool.test.ts — THE RED SET for `U-FOCUS-TOOL` (`F3`), wave F.
//
// CONTRACT (the only source of truth): `docs/specs/focus-tool.md` — `§2.1` (the surface
// exact), `§2.2`(A)/(B)/(C)/(D) (the prohibition table, the collision table BY TOKEN, the
// semantics table `S-1`…`S-7`, the id/`newTab` collision rows), `§2.3` (value/identity),
// `§2.4` (THE FIVE NEGATIVE CLAIMS), `§2.5` (the derived ALLOW/DENY set, entry-point `YES`),
// `§3.1 M-1`…`M-6`, `§3.2 F-1`…`F-6`, `§3.3 I-1`…`I-13`, `§3.4 R-1`…`R-10`, `§3.5 X-1`…`X-7`,
// `§4` (the red), `§5.1` (the diff scope), `§5.2` item 4 (THE CENSUS AS A LIST), `§5.U` (the
// SEVEN-ROW MATRIX), `§5.5.1` (THE REGISTER), `§5.5.2` (the honesty block), `§5.5.3` (the
// attempt arithmetic), `§7`/`§7a`/`§7a.1`. Gate-1 record: `docs/specs/focus-tool-review.md`.
//
// THE REGISTER (`§5.5.1` + `§5.5.4`) RIDES THIS SUITE (`§5.2` leg 1): its TWENTY typed rows
// (the contract's full table — the row-set settlement `§5.5.4` executes `P-FT-AR-2`,
// `P-FT-AR-3` and `P-FT-RF-3` rather than withdrawing them, so the declared total is the
// TWENTY-CELL SUM `73` and the superseded seventeen-cell `67` is kept VISIBLE and WITHDRAWN)
// and the harness that executes them live in `tests/focus-tool-register.ts` — a NON-test
// module, so it is never collected as a suite — and `REGISTER-EXEC-1` below EXECUTES them.
//
// AUTHORING ORDER (`§4.2`): (a) the EXISTENCE rows → (b) the ROUTE rows → (c) the SHAPE rows
// → (d) the REFUSAL/READINESS and NEGATIVE rows → (e) the IDENTITY and SEMANTICS rows →
// (f) the register's remaining rows.
//
// ===========================================================================
// STATE ENUMERATION (the states this file drives), BEFORE a single assertion
// ===========================================================================
// HAPPY STATES (`§3.1`): M-1 a target with the consumer accepting · M-2 `newTab: true` ·
//   M-3 no arguments at all · M-4 the consumer refuses · M-5 a second identical call ·
//   M-6 the registration path.
// FAIL-STATES (`§3.2`): F-1 an own enumerable key outside `{target,newTab}` · F-2 the
//   renderer NOT READY · F-3 a consumer refusal (never a throw) · F-4 the group disabled ·
//   F-5 a malformed renderer answer passed through · F-6 an `id`-valued argument refused.
// ARGUMENT STATES (`§2.2`(C) `S-1`…`S-7`): target absent · target present · `newTab` absent ·
//   `newTab: true` · refusal · NOT READY · unknown key · `newTab` present and not `true`.
// INVARIANTS (`§3.3 I-1`…`I-13`), the STATIC rows (`§3.4 R-1`…`R-10`), the FIVE NEGATIVE
// CLAIMS (`§2.4`), the CENSUS (`§5.2` item 4 `C-a`…`C-c`, `E-a`…`E-d`, `N-5`, `N-11`) and
// the SEVEN MATRIX ROWS (`§5.U`) each carry their own row below.
//
// LAYER HONESTY (`§2.4`'s fence; `C-10`): every row here is `[T]` harness-side evidence.
// NO WINDOW BOOTS. The notify and re-render rows claim NO MORE THAN "no notification was
// invoked and the name sets are unchanged" — never that a real window did not re-render.
import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ProvidentMcpServer } from '../src/main/mcp-server.js'
import { SecurityGate, groupForTool } from '../src/main/security.js'
import type { RpcMethod } from '../src/shared/types.js'
import {
  REGISTER, STOP_RULE_PROBE, DECLARED_TERMS, EXPECTED_ALL_TOOLS, EXPECTED_GROUPS,
  EXPECTED_MUTATING, DECLARED_MEMBERS, REQUIRED_MEMBERS, OPTIONAL_MEMBER, CAP_PER_ROW, CAP_TOTAL,
  DECLARED_TOTAL, AS_FILED_TOTAL, AS_FILED_DECLARED_TERMS, EXECUTED_CELLS_SUM_AT_SETTLEMENT,
  DECLARED_TERM_CHAIN, DECLARED_DOMAIN_SUBTOTALS, DECLARED_TYPE_SUBTOTALS,
  DECLARED_BOUNDED_ROWS, DECLARED_READING_CLASSES, ENUMERATED_ROW_IDS, EXECUTED_CELLS_SUM,
  runRegister, reportDiagnostics, read, stripComments, scanLines, modelRuleSites, liveAllTools, liveRpcMethods,
  liveMutatingMethods, liveValidGroups, focusRouteSource, routeRegion, routeMarkerExtent,
  routeHandlerExtent, inRouteRegion, assertDeclaredShape, assertOptionalMember, keysOf,
  recorder, newServer, callTool, callHandler, assertOneFocusCall, thrown,
} from './focus-tool-register.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TOOL_NAME = 'provident.focus'
const METHOD = 'focus'
const TEST_REL = 'tests/focus-tool.test.ts'
const SPEC_REL = 'docs/specs/focus-tool.md'
const RENDERER_REL = 'src/renderer/renderer.ts'

/** The `RpcMethod` union's 22 declared members, `'focus'` INCLUDED (`§5.2` item 4 `E-b`).
 *  This record is EXHAUSTIVE over the union: a member added to it is a `tsc` error here and
 *  at the additive `npm run typecheck:tests` leg — THE TYPE WALL (`§5.U` site 5). */
const RPC_METHOD_CENSUS: Record<RpcMethod, true> = {
  dispatch: true, renderedHtml: true, markdown: true, listTargets: true, nodeState: true,
  load: true, op: true, export: true, validate: true, teardown: true,
  'code.get': true, 'code.set': true, 'code.create': true, 'code.delete': true,
  'code.validate': true, 'code.load': true, 'code.loadBatch': true, journal: true,
  'module.install': true, 'module.update': true, 'module.list': true, focus: true,
}

/** The default gate's registered subset (`§5.2` item 4 `C-c`: `7 → 8`). */
const EXPECTED_DEFAULT_GATE_TOOLS: string[] = [
  'provident.dispatch', 'provident.get_rendered_html', 'provident.get_markdown',
  'provident.list_targets', 'provident.get_node_state', 'provident.code.get',
  'provident.code.validate', 'provident.focus',
]

// ===========================================================================
// 1. THE EXISTENCE ROWS (`§3.5`) — authoring order `§4.2` item (a)
// ===========================================================================
describe('§3.5 X-1..X-7 — the existence rows', () => {
  it('X-1 — `provident.focus` IS in `ALL_TOOLS` and the `RpcMethod` member EXISTS', () => {
    const tools = liveAllTools()
    const rpc = liveRpcMethods()
    expect(tools, `§2.1 item 1 — the tool must be the 22nd ALL_TOOLS member. Measured: ${JSON.stringify(tools)}`).toContain(TOOL_NAME)
    expect(rpc, `§2.1 item 3 / the layer map's site 5 — the RpcMethod union must carry '${METHOD}'. Measured: ${JSON.stringify(rpc)}`).toContain(METHOD)
  })

  it("X-1b — the renderer's method SWITCH carries the matching case (the TYPE WALL and the switch must AGREE)", () => {
    expect(read(RENDERER_REL), `the layer map's site 6 — case '${METHOD}': must exist, or the union and the switch disagree.`).toMatch(new RegExp("case[ ]+'" + METHOD + "'[ ]*:"))
  })

  it('X-3 — the contract itself EXISTS at the pinned path', () => {
    expect(existsSync(join(ROOT, SPEC_REL)), `§5.1 row 10 — the contract must be filed at <${SPEC_REL}>.`).toBe(true)
  })

  it('X-6 — this file is in the diff scope (`§5.1` row 5) and is non-empty', () => {
    expect(existsSync(join(ROOT, TEST_REL)), "§5.1 row 5 — this file is the red set's own home.").toBe(true)
    expect(read(TEST_REL).length, '§5.1 row 5 — non-empty, so its existence is a real reading.').toBeGreaterThan(1000)
  })

  it("X-6b — the unit's two INPUT RECORDS exist and are frozen", () => {
    expect(existsSync(join(ROOT, 'docs/specs/focus-tool-review.md')), 'the gate-1 record must exist.').toBe(true)
    expect(existsSync(join(ROOT, 'docs/specs/focus-tool-adoption-dossier.md')), 'the STEP-0 dossier must exist (`G-2`).').toBe(true)
  })

  it('X-7 / N-5 — the consumed module\'s spec-existence row now reads `true` (the row this pass FLIPS)', () => {
    const src = read('tests/focus-model.test.ts')
    expect(src.includes("docs', 'specs', 'focus-tool.md'"), "N-5 — the site that pins whether this unit's spec exists.").toBe(true)
    expect(
      /existsSync\(join\(ROOT, 'docs', 'specs', 'focus-tool\.md'\)\),[^\n]*\)\.toBe\(true\)/.test(src),
      '§5.2 item 4 N-5 — the spec IS filed, so that row must read `true` (`CURRENT STATE` item 6).',
    ).toBe(true)
  })

  it('X-8 / RT-5(b) — THE ROUTE REGION IS BOUNDED BY THE CONTRACT AND ITS FIRST LINE IS NOT THE MARKER (`§5.5.2` item 4b)', () => {
    // THE MEASURED DEFECT THIS ROW EXISTS FOR: the as-filed reader sliced from the FIRST QUOTED
    // OCCURRENCE OF THE TOOL NAME to end-of-file, so an occurrence of that quoted name ANYWHERE
    // ELSE moved every scan row's region — which is how `P-FT-ID-2`'s "the tool re-derived no
    // rule" scan reddened against a legitimate `===` in the SHARED `graph` loop.
    //
    // AND THE SECOND DEFECT, THE PREVIOUS PASS'S: the region began ON the marker line, whose own
    // text is `if (allowed.includes('provident.focus'))` — a line carrying the very `.includes(`
    // a route scan forbids, so every scan row was handed a pattern its own region always carried
    // and no implementation could hold it.
    //
    // AND THE THIRD DEFECT, THIS PASS'S (conflict 2): moving `start` past the marker line made
    // the region the marker block's BODY ONLY, and the tool's own route bytes — its handler, its
    // declared-members list and its key guard, which live at the module's TOP LEVEL — ended up
    // OUTSIDE the scanned region, so the scans read a region the tool's bytes no longer inhabited
    // and measured nothing of the tool's. THE REGION NOW STARTS AT THE MARKER BLOCK'S END IN THE
    // SENSE THE CONTRACT STATES: the marker LINE is outside it, and THE TOOL'S OWN ROUTE BYTES —
    // its schema, its handler and its guards — are INSIDE it. The claim is now a READING of the
    // handler span, asserted below, rather than a description of it.
    const region = routeRegion()
    expect(region, `RT-5(b) — the contract-named region must be LOCATABLE: the tool's own \`allowed.includes('${TOOL_NAME}')\` registration block is its marker.`).not.toBe(null)
    const marked = region as NonNullable<ReturnType<typeof routeRegion>>
    const extent = routeMarkerExtent()
    expect(extent, 'RT-5(b) — the marker line itself must be readable, or the boundary below is not a reading.').not.toBe(null)
    const m = extent as NonNullable<ReturnType<typeof routeMarkerExtent>>
    expect(marked.name, 'RT-5(b) — the marker is the tool row itself, not a neighbouring registration.').toBe(TOOL_NAME)
    // THE REGION'S EXTENT, IN THIS FILE'S OWN TERMS: `start` is AT OR AFTER the marker line's end,
    // so the marker line — and its own `.includes(` — is OUTSIDE the region read.
    expect(marked.start, 'RT-5(b) — the region STARTS AFTER THE MARKER LINE (never on it): the marker line carries `.includes(`, which the scans below forbid.').toBeGreaterThanOrEqual(m.markerLineEnd)
    expect(inRouteRegion(m.markerStart), 'RT-5(b) — the marker BYTE is OUTSIDE the region (the region\'s own first line is therefore not the marker).').toBe(false)
    expect(inRouteRegion(m.markerStart + m.markerLength), 'RT-5(b) — the marker MATCH is outside the region too; the region begins after its line terminator.').toBe(false)
    const src = read('src/main/mcp-server.ts')
    expect(marked.end, 'RT-5(b) — the region ENDS before the NEXT registration block (never at end-of-file), so a sibling tool\'s bytes are not scanned as this route.').toBeLessThan(src.length)
    expect(marked.end, 'RT-5(b) — and the region is BOUNDED at its end (end > start) rather than empty.').toBeGreaterThan(marked.start)
    expect(marked.end, 'RT-5(b) — the region ends at the MARKER BLOCK\'S END (`§5.5.2` item 4b): the next `if (allowed.includes(...))` block\'s own line, the first byte outside the tool\'s block.').toBe(m.blockEnd)
    const body = focusRouteSource() ?? ''
    expect(body.length, 'RT-5(b) — the bounded region is NON-VACUOUS: non-empty, so every scan row still reads real bytes at green time.').toBeGreaterThan(0)
    // THE TOOL'S OWN BYTES ARE INSIDE THE REGION (conflict 2, asserted as a READING): the handler
    // span carries `function focusHandler`, the declared-members list and the key guard, and every
    // byte of it is inside the region the scans read — while the marker line is not.
    const handler = routeHandlerExtent()
    expect(handler, 'RT-5(b) — the tool\'s own handler span must be LOCATABLE (`function focusHandler` … the key guard\'s close), or the "the tool\'s own bytes are inside the region" claim is not a reading.').not.toBe(null)
    const h = handler as NonNullable<ReturnType<typeof routeHandlerExtent>>
    for (const need of ['function focusHandler', 'DECLARED_ARGUMENTS', 'function keyAllowed']) {
      expect(h.body.includes(need), `RT-5(b) — the handler span carries the tool's own byte '${need}' (\`§5.1\` row 1's handler and its guard).`).toBe(true)
      expect(body.includes(need), `RT-5(b) — and THAT BYTE IS INSIDE THE SCANNED REGION: '${need}' must be read by every scan row, or the region the rows read is one the tool's bytes do not inhabit (conflict 2).`).toBe(true)
    }
    expect(body.includes("if (allowed.includes('"), 'RT-5(b) — the region STARTS AT THE MARKER BLOCK\'S END: no marker line of the tool\'s own is inside the scanned bytes (that line is what carried the forbidden `.includes(`).').toBe(false)
    // THE BOUNDED-REGION CLAIM, KEPT AND STRENGTHENED (never weakened by the move): a SECOND
    // RESOLUTION PATH, a NEW EXPORT or an alias written INSIDE the tool's own block OR INTO ITS
    // HANDLER is INSIDE this region — so it is read by the scan below and FAILS rather than
    // escaping the reading. Both falsifiers are driven here.
    const controlBlock = `${body}\nif (allowed.includes('provident.focus')) { return 'aliased-resolution-path' }\nconst secondPath = 'focus'\n`
    expect(scanLines(controlBlock, /===|\.includes\s*\(/).length, 'RT-5(b) control (a) — a SECOND RESOLUTION PATH written inside the block the marker introduces is INSIDE the region and IS caught by the scan.').toBeGreaterThan(0)
    const controlHandler = `${h.body}\n  const minted = crypto.randomUUID()\n`
    expect(scanLines(controlHandler, /randomUUID/).length, 'RT-5(b) control (b) — a MINTING site written INTO THE TOOL\'S OWN HANDLER is inside the region too: the handler span is appended to the scanned bytes, so the tool\'s own bytes are measured, not skipped.').toBeGreaterThan(0)
    for (const foreign of ["if (allowed.includes('provident.get_rendered_html'))", "if (allowed.includes('provident.get_node_state'))"]) {
      expect(body.includes(foreign), `RT-5(b) — the region must NOT reach a SIBLING registration block ('${foreign}' is outside it).`).toBe(false)
    }
    // THE SCAN'S OWN READING, OVER THE WHOLE REGION (the tool's own bytes INCLUDED): the region is
    // free of a `===\s*`, an `.includes(` or an `.indexOf(` SITE. THIS READING IS DELIBERATELY NOT
    // ASSERTED HERE AS A PASS — the region now carries the tool's own guard, so it is a MEASUREMENT
    // of the tool (reported by the rows that own the claim, `I-10`/`ID-2`), never a shape this row
    // may require the region to have. A pass asserted here would re-commit the exact defect this
    // row exists for: engineering the region until the tool's own bytes are out of it.
    const sites = scanLines(stripComments(body), /===\s*|\.includes\s*\(|\.indexOf\s*\(/)
    expect(sites.every((line) => !line.includes("if (allowed.includes('")), `RT-5(b) — the ONLY \`.includes(\` sites inside the region belong to the TOOL'S OWN BYTES (never the marker line): measured ${JSON.stringify(sites)}`).toBe(true)
  })
})

// ===========================================================================
// 2. THE HAPPY STATES (`§3.1 M-1`…`M-6`)
// ===========================================================================
describe('§3.1 M-1..M-6 — one row per valid/happy state', () => {
  it('M-1 (a) a target with the consumer accepting: the declared shape, identity members, `refused` ABSENT', async () => {
    const answer = { activeId: 'node-1', entries: ['node-1', 'node-2'], opened: false }
    const rec = recorder([answer])
    const got = (await callTool(newServer(rec.backend), TOOL_NAME, { target: 'node-1' })) as Record<string, unknown>
    assertOneFocusCall(rec, 'M-1')
    expect(got, "M-1 — entries/activeId are the renderer's own values (`§3.3 I-5`).").toEqual(answer)
    assertDeclaredShape(got, 'M-1')
    assertOptionalMember(got, false, 'M-1')
    expect(Object.keys(got).sort(), "M-1 / `§3.3 I-6` — the three REQUIRED members, in any order; `refused` ABSENT (not `undefined`).").toEqual([...REQUIRED_MEMBERS].sort())
    expect('refused' in got, 'M-1 — no `refused` own key outside a refusal (`§0A` note 4).').toBe(false)
  })

  it('M-1 (b) the arguments reach the renderer BY IDENTITY (`§2.3` item 3)', async () => {
    const rec = recorder([{ activeId: null, entries: [], opened: false }])
    await callTool(newServer(rec.backend), TOOL_NAME, { target: 'a b ', newTab: false })
    const passed = assertOneFocusCall(rec, 'M-1(b)') as Record<string, unknown>
    expect(passed, "M-1(b) — the caller's own values: no trim, no coercion, no re-keying.").toEqual({ target: 'a b ', newTab: false })
  })

  it('M-2 `newTab: true`: the flag is passed through, no id is minted, no member added', async () => {
    const answer = { activeId: 'a', entries: ['a', 'a'], opened: true }
    const rec = recorder([answer])
    const got = (await callTool(newServer(rec.backend), TOOL_NAME, { target: 'a', newTab: true })) as Record<string, unknown>
    const passed = assertOneFocusCall(rec, 'M-2') as Record<string, unknown>
    expect(passed['newTab'], 'M-2 — the flag reaches the renderer by identity.').toBe(true)
    expect(got, "M-2 — the consumer's own answer, verbatim (`§2.3` item 2).").toEqual(answer)
    expect(Object.keys(got).sort(), 'M-2 — no member added by the tool; `refused` ABSENT on this accepted arm.').toEqual([...REQUIRED_MEMBERS].sort())
    assertOptionalMember(got, false, 'M-2')
  })

  it('M-3 no arguments at all: `{}` and an OMITTED arguments member are the same call (`§0A` note 3(a))', async () => {
    const shapes: Array<{ label: string; args: unknown; omit: boolean }> = [
      { label: 'an empty arguments object', args: {}, omit: false },
      { label: 'the arguments member OMITTED', args: undefined, omit: true },
    ]
    for (const shape of shapes) {
      const rec = recorder([{ activeId: null, entries: [], opened: false }])
      const got = (await callTool(newServer(rec.backend), TOOL_NAME, shape.args, { omitArguments: shape.omit })) as Record<string, unknown>
      assertOneFocusCall(rec, `M-3 (${shape.label})`)
      expect(Object.keys(got).sort(), `M-3 (${shape.label}) — the declared shape, no special case: the three required members, \`refused\` ABSENT.`).toEqual([...REQUIRED_MEMBERS].sort())
      assertOptionalMember(got, false, `M-3 (${shape.label})`)
    }
  })

  it('M-4 the consumer REFUSES: the declared shape WITH `refused` and NO fifth member', async () => {
    const answer = { activeId: null, entries: [], opened: false, refused: { reason: 'not mine' } }
    const rec = recorder([answer])
    const got = (await callTool(newServer(rec.backend), TOOL_NAME, { target: 'x' })) as Record<string, unknown>
    assertOneFocusCall(rec, 'M-4')
    expect(got, "M-4 — `reason` is the CONSUMER's own string, carried VERBATIM.").toEqual(answer)
    assertDeclaredShape(got, 'M-4')
    assertOptionalMember(got, true, 'M-4')
    expect(Object.keys(got).sort(), 'M-4 — the three required members plus the optional `refused` the outcome carries; no fifth member.').toEqual([...DECLARED_MEMBERS].sort())
    expect(Object.keys(got['refused'] as Record<string, unknown>), "M-4 — `refused`'s own key set is exactly ['reason'].").toEqual(['reason'])
  })

  it('M-5 a SECOND identical call is a SECOND renderer call (`§2.3` item 5)', async () => {
    const rec = recorder([{ activeId: 'n', entries: ['n'], opened: false }, { activeId: 'n', entries: ['n'], opened: false }])
    const server = newServer(rec.backend)
    await callTool(server, TOOL_NAME, { target: 'n' })
    await callTool(server, TOOL_NAME, { target: 'n' })
    expect(rec.calls.map((c) => c.method), 'M-5 — two calls, two renderer calls (a cache hit would show ONE).').toEqual([METHOD, METHOD])
  })

  it('M-6 the registration path: registered ONCE under the EXISTING `dispatch` group, ON by default', () => {
    const allowed = newServer(recorder([{}]).backend).allowedToolNames()
    expect(allowed, 'M-6 — registered under the default gate (no human grant, `§2.1` item 2).').toContain(TOOL_NAME)
    expect(allowed.filter((n) => n === TOOL_NAME), 'M-6 — registered ONCE.').toHaveLength(1)
    expect(groupForTool(TOOL_NAME), 'M-6 / `§2.2` X-2 — the EXISTING `dispatch` group.').toBe('dispatch')
  })
})

// ===========================================================================
// 3. THE FAIL-STATES (`§3.2 F-1`…`F-6`)
// ===========================================================================
describe('§3.2 F-1..F-6 — one fail-safe row per documented fail-state', () => {
  it('F-1 an own enumerable key outside `{target,newTab}`: an error NAMING the key, BEFORE any renderer call', async () => {
    const rec = recorder([{ activeId: null, entries: [], opened: false }])
    const message = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, { id: 'x' }))
    expect(message, 'F-1 / `§0A` note 3(d) — the malformed call does NOT return a `refused` record and does NOT succeed.').not.toBe(null)
    expect(message, `F-1 — the error names the REJECTED KEY. Measured: ${String(message)}`).toContain('id')
    expect(rec.calls, 'F-1 / `I-12` — an invalid call crosses NO IPC boundary.').toEqual([])
  })

  it("F-2 the renderer is NOT READY: rejects with the backend's readiness error, state UNTOUCHED", async () => {
    const rec = recorder([], 'renderer not ready (timeout 5000ms)')
    const message = await thrown(() => callTool(newServer(rec.backend), TOOL_NAME, { target: 'a' }))
    expect(message, 'F-2 / `§2.4` row 5 — a pre-ready call must REJECT.').not.toBe(null)
    expect(message, `F-2 — the readiness error form. Measured: ${String(message)}`).toMatch(/renderer not ready \(timeout \d+ms\)/)
    expect(rec.calls.map((c) => c.method), 'F-2 — exactly ONE attempt: nothing queued, no retry, no fallback.').toEqual([METHOD])
  })

  it('F-3 a consumer refusal is NOT a throw — it is a returned record', async () => {
    const rec = recorder([{ activeId: null, entries: [], opened: false, refused: { reason: 'no' } }])
    const message = await thrown(() => callTool(newServer(rec.backend), TOOL_NAME, { target: 'no' }))
    expect(message, 'F-3 — only TWO throw classes are declared (`§3.3 I-13`).').toBe(null)
  })

  it("F-4 the group is DISABLED: not registered / not listed — the endpoint's existing semantics", () => {
    const gate = new SecurityGate().apply({ disable: ['dispatch'] })
    expect(gate.enabled.has('dispatch'), 'F-4 — the drive: `dispatch` is OFF.').toBe(false)
    expect(newServer(recorder([{}]).backend, gate).allowedToolNames(), 'F-4 / `RT-5` — the tool does not register.').not.toContain(TOOL_NAME)
  })

  it('F-5 a MALFORMED renderer answer is passed through — no shape guard, nothing coerced (the FENCE)', async () => {
    const malformed = { somethingElse: 1 }
    const got = (await callHandler(newServer(recorder([malformed]).backend), TOOL_NAME, {})) as Record<string, unknown>
    expect(got, 'F-5 / `§0A` note 5 — the tool is NOT a validation boundary.').toEqual(malformed)
  })

  it("F-6 a caller supplies an `id`-valued argument: refused by F-1's rule (the SHAPE FENCE)", async () => {
    const rec = recorder([{}])
    const message = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a', id: 'minted' }))
    expect(message, 'F-6 — an added `id` member is NOT in the declared shape.').not.toBe(null)
    expect(rec.calls, 'F-6 — the refusal crosses no IPC boundary.').toEqual([])
  })
})

// ===========================================================================
// 4. THE SEMANTICS TABLE (`§2.2`(C) `S-1`…`S-7`)
// ===========================================================================
describe('§2.2(C) S-1..S-7 — every ANSWERED argument state', () => {
  it('S-2 `target` present: passed through UNINTERPRETED', async () => {
    const probes: unknown[] = ['plain', ' padded ', 'unicode-pad', '', 0, null, { nested: true }, ['a']]
    for (const target of probes) {
      const rec = recorder([{ activeId: null, entries: [], opened: false }])
      await callTool(newServer(rec.backend), TOOL_NAME, { target })
      const passed = assertOneFocusCall(rec, `S-2 (target=${JSON.stringify(target)})`) as Record<string, unknown>
      expect(passed['target'], 'S-2 — the target reaches the renderer BY IDENTITY.').toEqual(target)
    }
  })

  it('S-3 `newTab: true` opens a new entry for the same target: the tool mints nothing', async () => {
    const rec = recorder([{ activeId: 't', entries: ['t', 't'], opened: true }])
    const got = (await callTool(newServer(rec.backend), TOOL_NAME, { target: 't', newTab: true })) as Record<string, unknown>
    expect(got['opened'], "S-3 — `opened` reflects the CONSUMER's own answer.").toBe(true)
    expect(got['activeId'], "S-3 — the returned identity is the consumer's own value.").toBe('t')
  })

  it('S-5 NOT READY crosses every argument state (`S-1`…`S-4`)', async () => {
    for (const args of [{}, { target: 'a' }, { target: 'a', newTab: true }, { target: 'refuse-me' }]) {
      const rec = recorder([], 'renderer not ready (timeout 100ms)')
      const message = await thrown(() => callTool(newServer(rec.backend), TOOL_NAME, args))
      expect(message, `S-5 (${JSON.stringify(args)}) — the readiness rejection for EVERY argument state.`).toMatch(/renderer not ready \(timeout \d+ms\)/)
    }
  })

  it('S-6 an own enumerable key outside the declared set: the validation THROW', async () => {
    const rec = recorder([{}])
    const message = await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, { target: 'a', extra: 1 }))
    expect(message, 'S-6 — a legal member with an unknown key is refused (the same edge as F-1).').not.toBe(null)
    expect(message, 'S-6 — the error names the rejected key, not the legal one.').toContain('extra')
    expect(rec.calls, 'S-6 — no renderer call on the throwing arm.').toEqual([])
  })

  it('S-7 `newTab` present and NOT `true`: no default, nothing re-derived', async () => {
    for (const value of [false, 0, '', null, 'yes']) {
      const rec = recorder([{ activeId: null, entries: [], opened: false }])
      await callTool(newServer(rec.backend), TOOL_NAME, { target: 'a', newTab: value })
      const passed = assertOneFocusCall(rec, `S-7 (newTab=${JSON.stringify(value)})`) as Record<string, unknown>
      expect(passed['newTab'], 'S-7 — the value reaches the renderer uninterpreted.').toEqual(value)
    }
  })
})

// ===========================================================================
// 5. THE INVARIANTS (`§3.3 I-1`…`I-13`)
// ===========================================================================
describe('§3.3 I-1..I-13 — the invariants that hold in every state', () => {
  it('I-1 / `R-3` the tool holds nothing between calls', () => {
    const src = focusRouteSource()
    expect(src, 'I-1 / `ID-5` — the route must exist to be scanned.').not.toBe(null)
    for (const token of [/new\s+Map\s*\(/, /new\s+Set\s*\(/, /new\s+WeakMap\s*\(/, /\bcounter\b/, /\bregistry\b/, /randomUUID/, /\.sort\s*\(/, /\bdedupe\b/, /\bmemo\b/, /uuid/i]) {
      expect(scanLines(stripComments(src ?? ''), token), `I-1 / R-3 — a minting/holding token on the route FAILS: ${String(token)}`).toEqual([])
    }
  })

  it('I-2 the handler makes EXACTLY ONE renderer call for each valid state driven here', async () => {
    const valid: Array<Record<string, unknown>> = [{}, { target: 'a' }, { target: 'a', newTab: true }, { target: 'r' }]
    const answers = [
      { activeId: null, entries: [], opened: false },
      { activeId: 'a', entries: ['a'], opened: false },
      { activeId: 'a', entries: ['a', 'a'], opened: true },
      { activeId: null, entries: [], opened: false, refused: { reason: 'r' } },
    ]
    for (let i = 0; i < valid.length; i += 1) {
      const rec = recorder([answers[i]])
      await callTool(newServer(rec.backend), TOOL_NAME, valid[i])
      expect(rec.calls, `I-2 (${JSON.stringify(valid[i])}) — exactly one renderer call.`).toHaveLength(1)
    }
  })

  it("I-3 / `§2.5` item 2 the live authority is the RENDERER's: the tool imports NO sibling mechanism", () => {
    const src = focusRouteSource()
    expect(src, 'I-3 — the route exists to be read.').not.toBe(null)
    expect(scanLines(src ?? '', /^\s*import\s/), 'I-3 / `R-7` — an import edge from the tool to a sibling is a FABRICATED EDGE.').toEqual([])
  })

  it('I-4 / `ID-1` the tool MINTS NO ID', async () => {
    const got = (await callTool(newServer(recorder([{ activeId: 'k', entries: ['k'], opened: false }]).backend), TOOL_NAME, { target: 'k' })) as Record<string, unknown>
    expect(got['activeId'], "I-4 — the identity is the CONSUMER's own value (`§2.3` item 1).").toBe('k')
    expect(scanLines(stripComments(focusRouteSource() ?? ''), /randomUUID|\bcounter\b|\buuid\b/i), 'I-4 — no minting site on the route.').toEqual([])
  })

  it('I-5 every passed value travels BY IDENTITY on input and on output', async () => {
    const answer = { activeId: 'b', entries: ['z', 'a', 'z'], opened: 0 }
    const rec = recorder([answer])
    const got = (await callHandler(newServer(rec.backend), TOOL_NAME, { target: ' b ', newTab: 'no' })) as Record<string, unknown>
    expect(got, 'I-5 — the unsorted duplicate list and the non-boolean `opened` are NOT normalised.').toEqual(answer)
    expect(rec.calls[0]?.args, 'I-5 — the input members travel uninterpreted too.').toEqual({ target: ' b ', newTab: 'no' })
  })

  it('I-6 the four declared members, `refused` present exactly on a refusal, never `refused: undefined`', async () => {
    const drives: Array<{ label: string; answer: Record<string, unknown> }> = [
      { label: 'accepted', answer: { activeId: null, entries: [], opened: false } },
      { label: 'refusal', answer: { activeId: null, entries: [], opened: false, refused: { reason: '' } } },
    ]
    for (const d of drives) {
      const got = (await callTool(newServer(recorder([d.answer]).backend), TOOL_NAME, {})) as Record<string, unknown>
      assertDeclaredShape(got, `I-6 (${d.label})`)
      assertOptionalMember(got, d.label === 'refusal', `I-6 (${d.label})`)
      expect(Object.keys(got).sort(), `I-6 (${d.label}) — the three required members, plus \`refused\` IFF the outcome carries one.`).toEqual((d.label === 'refusal' ? [...DECLARED_MEMBERS] : [...REQUIRED_MEMBERS]).sort())
      expect(Object.prototype.hasOwnProperty.call(got, 'refused'), `I-6 (${d.label}) — presence matches the consumer's answer.`).toBe(d.label === 'refusal')
      expect(Object.values(got).every((v) => v !== undefined), `I-6 (${d.label}) — no member is present as undefined.`).toBe(true)
    }
  })

  it('I-7 `VALID_GROUPS` stays FIVE and `MUTATING_METHODS` gains NO member', () => {
    expect(liveValidGroups().sort(), 'I-7 / `E-c` — name-set-equal to its FIVE members.').toEqual([...EXPECTED_GROUPS].sort())
    expect(liveMutatingMethods().sort(), 'I-7 / `E-d` — name-set-equal to its SEVEN members, NO EIGHTH.').toEqual([...EXPECTED_MUTATING].sort())
    expect(liveMutatingMethods(), "I-7 — 'focus' must be ABSENT (a later addition is a CONTRACT VIOLATION).").not.toContain(METHOD)
  })

  it('I-8 the tool emits no notification, persists nothing and forces no re-render', () => {
    const src = focusRouteSource()
    expect(src, 'I-8 — the route exists to be scanned.').not.toBe(null)
    for (const token of [/sendResourceUpdated/, /notifyGraphChanged/, /app-graph-changed/, /resources\/updated/, /invalidate/i, /localStorage/, /sessionStorage/, /indexedDB/, /writeFile/, /state-slice/]) {
      expect(scanLines(stripComments(src ?? ''), token), `I-8 — a push/invalidation/store/writer token on the route FAILS: ${String(token)}`).toEqual([])
    }
  })

  it('I-9 / `R-2` the tool authors NO rendered surface', () => {
    const src = focusRouteSource()
    expect(src, 'I-9 — the route exists to be scanned.').not.toBe(null)
    for (const token of [/createElement/, /innerHTML/, /document\./, /appendChild/, /classList/, /setAttribute/, /style\./]) {
      expect(scanLines(stripComments(src ?? ''), token), `I-9 / P-FT-2 — an authored rendered-surface byte FAILS gate 6: ${String(token)}`).toEqual([])
    }
  })

  it('I-10 the tool re-derives NO model rule', async () => {
    const rec = recorder([{ activeId: 'same', entries: ['same'], opened: false }])
    const got = (await callHandler(newServer(rec.backend), TOOL_NAME, { target: 'same' })) as Record<string, unknown>
    expect(got['entries'], "I-10 — the answer is the consumer's; the tool compared nothing.").toEqual(['same'])
    // ⟶ 2026-09-27 RE-SCOPE (`§0A` note 7, defect 2) — THE AS-FILED INSTRUMENT IS KEPT VISIBLE
    // BESIDE ITS REPLACEMENT, because it was OVER-BROAD: `/===\s*|\.sort\s*\(|\.includes\s*\(|
    // \.indexOf\s*\(/` FLAGS THE TOOL'S MANDATORY UNKNOWN-KEY GUARD
    // (`DECLARED_ARGUMENTS.includes(key)`), and rejecting a key outside the declared set is a
    // `§2.1` item 4 REQUIREMENT (`F-1`/`AR-2`). THE SCAN'S CLAIM IS *"NO RE-DERIVATION OF THE
    // MODEL'S RULES"* — the model's ACTIVATION on the target, its IDENTITY rule and its ID
    // POLICY — AND NOT *"no key validation"*. The instrument is therefore scoped to the
    // MODEL-RULE TOKENS: a second equality/assignment on the model-owned fields the caller
    // passes through, a membership test over the caller's opaque values, and a minted id.
    expect(
      modelRuleSites(stripComments(focusRouteSource() ?? '')),
      'I-10 / `§2.3` item 4 — a MODEL-RULE site (a comparison/assignment on `target`/`entryId`, a membership test over the caller’s `entries`/`activeId`/`opened`, or a minted id) FAILS the no-second-authority half. The required declared-key guard is EXEMPT BY NAME (see `modelRuleSites`).',
    ).toEqual([])
    // THE FALSIFIER STAYS REAL — and it is DRIVEN here rather than described: a body that
    // RE-IMPLEMENTS one of the model's rules (a second equality on the target, a membership
    // test over the caller's values, a minted id) is still CAUGHT by the re-scoped scan.
    expect(modelRuleSites('  if (args.target === ' + "'x'" + ') return {}'), 'I-10 falsifier — a SECOND EQUALITY on the target is a re-derived activation rule and MUST FAIL.').not.toEqual([])
    expect(modelRuleSites('  if (args.entries.includes(args.target)) return {}'), "I-10 falsifier — a MEMBERSHIP TEST over the caller's opaque values re-implements the model's identity rule and MUST FAIL.").not.toEqual([])
    expect(modelRuleSites('  const id = crypto.randomUUID()'), 'I-10 falsifier — a MINTED id re-implements the model’s id policy and MUST FAIL.').not.toEqual([])
    // AND THE EXEMPTION IS NOT A LOOPHOLE: the required guard is exempt, a comparison hidden
    // behind it is NOT, and the key guard is asserted HERE as the tool's own live byte.
    expect(modelRuleSites('  return DECLARED_ARGUMENTS.includes(key)'), 'I-10 — the REQUIRED declared-key guard is NOT a model rule: validation against the tool’s own declared set is exempt BY NAME.').toEqual([])
    expect(modelRuleSites('  const dup = DECLARED_ARGUMENTS.includes(key) ? (args.target = key) : key'), 'I-10 falsifier — the exemption is NOT a loophole: a line that ALSO assigns into a model-owned field is still a model-rule site.').not.toEqual([])
    expect(focusRouteSource() ?? '', 'I-10 — the required guard IS read inside the scanned region (the exemption is a reading of the tool’s own bytes, not a hole in the region).').toContain('DECLARED_ARGUMENTS.includes(key)')
  })

  it('I-11 a focus call is NEVER a real user gesture — no gesture, DOM read or focus WALK on the route', () => {
    for (const token of [/dispatchEvent/, /addEventListener/, /activeElement/, /matchMedia/, /getComputedStyle/, /focus\s*\(/, /blur\s*\(/]) {
      expect(scanLines(stripComments(focusRouteSource() ?? ''), token), `I-11 / R-9 — a gesture, DOM read or focus WALK FAILS: ${String(token)}`).toEqual([])
    }
  })

  it('I-12 an invalid call crosses NO IPC boundary', async () => {
    const rec = recorder([{}])
    await thrown(() => callHandler(newServer(rec.backend), TOOL_NAME, { nope: 1 }))
    expect(rec.calls, "I-12 — the renderer stub's call count is 0 on a rejected drive.").toEqual([])
  })

  it('I-13 the throw-class set is CLOSED and TWO-MEMBERED', async () => {
    const bad = await thrown(() => callHandler(newServer(recorder([{}]).backend), TOOL_NAME, { nope: 1 }))
    expect(bad, 'I-13 — the validation arm throws.').not.toBe(null)
    const notReady = await thrown(() => callTool(newServer(recorder([], 'renderer not ready (timeout 7ms)').backend), TOOL_NAME, {}))
    expect(notReady, "I-13 — the readiness arm rejects with the backend's own error.").toMatch(/renderer not ready \(timeout \d+ms\)/)
    const refused = await thrown(() => callTool(newServer(recorder([{ activeId: null, entries: [], opened: false, refused: { reason: 'x' } }]).backend), TOOL_NAME, {}))
    expect(refused, 'I-13 — a consumer refusal is NEVER a throw: no third class exists.').toBe(null)
  })
})

// ===========================================================================
// 6. THE STATIC ROWS (`§3.4 R-1`…`R-10`)
// ===========================================================================
describe('§3.4 R-1..R-10 — the static rows', () => {
  it('R-1 THE VOCABULARY SCAN — no tab/pane/zone/region noun, the exemptions NAMED', () => {
    // TWO NAMED EXEMPTIONS AND NO OTHERS (`§2.2`(B)'s closing paragraph): (i) the tool/method
    // NAME `focus`; (ii) the endpoint's own member names. The scan stands VACUOUS of every
    // tab/pane/zone/region token.
    const src = focusRouteSource()
    expect(src, 'R-1 — the route must exist for the scan to be non-vacuous.').not.toBe(null)
    for (const token of [/\btab\b/i, /\bpane\b/i, /\bzone\b/i, /\bregion\b/i]) {
      expect(scanLines(stripComments(src ?? ''), token), `R-1 / P-FT-1 — a consumer noun on the route FAILS: ${String(token)}`).toEqual([])
    }
    expect(scanLines('const tab = 1', /\btab\b/i), 'R-1 control — the scan is a real scan.').not.toEqual([])
  })

  it('R-3 THE MINTING-SITE SCAN', () => {
    for (const token of [/new\s+Map\b/, /new\s+Set\b/, /randomUUID/, /\bcounter\b/i, /\bregistry\b/i, /\.sort\s*\(/, /\.dedupe/, /\bmemo\b/i]) {
      expect(scanLines(stripComments(focusRouteSource() ?? ''), token), `R-3 — a minting/ordering token FAILS: ${String(token)}`).toEqual([])
    }
  })

  it('R-4 THE NAME-SET EQUALITY ROWS — `ALL_TOOLS` and `RpcMethod` (SET equality, never a bare count)', () => {
    const tools = liveAllTools()
    expect(tools, 'R-4 / E-a — NAME-SET-EQUAL to its 22 members INCLUDING `provident.focus`.').toContain(TOOL_NAME)
    expect([...tools].sort(), `R-4 / E-a — set equality against the names. Measured: ${JSON.stringify([...tools].sort())}`).toEqual([...EXPECTED_ALL_TOOLS].sort())
    expect(new Set(tools).size, 'R-4 — no duplicate (the check beside the equality).').toBe(tools.length)
    expect(liveRpcMethods(), `R-4 / E-b — the union carries '${METHOD}' (the name, not a count).`).toContain(METHOD)
    expect(Object.keys(RPC_METHOD_CENSUS).sort(), 'R-4 / E-b — this record is exhaustive over the 22 declared members.').toEqual([...liveRpcMethods(), METHOD].sort().filter((v, i, a) => a.indexOf(v) === i))
  })

  it("R-5 THE SHAPE ROW — the three required members always present, `refused` IFF the outcome carries one, no fifth member", async () => {
    const got = (await callTool(newServer(recorder([{ activeId: 'x', entries: ['x'], opened: true }]).backend), TOOL_NAME, { target: 'x' })) as Record<string, unknown>
    assertDeclaredShape(got, 'R-5')
    assertOptionalMember(got, false, 'R-5')
    expect(Object.keys(got).sort(), 'R-5 / `§0A` note 4 — the required names on an accepted outcome, nothing added or re-keyed.').toEqual([...REQUIRED_MEMBERS].sort())
    // THE TWO FALSIFIERS, BOTH DRIVEN HERE (the consolidation adjudication, conflict 2 — the
    // accepted arm and the optionality claim cannot be asserted as one four-name equality):
    // (a) a record MISSING A REQUIRED MEMBER fails the shape read, and (b) a record CARRYING
    // `refused` when there is no such outcome fails the optionality read.
    expect(keysOf({ activeId: null, opened: false }), 'R-5 control (a) — a record missing `entries` FAILS the required-member half (the falsifier is real, not a relaxation).').not.toEqual([...REQUIRED_MEMBERS].sort())
    expect(keysOf({ activeId: null, entries: [], opened: false, refused: { reason: 'r' } }), 'R-5 control (b) — a record carrying `refused` with NO such outcome FAILS the absence half.').not.toEqual([...REQUIRED_MEMBERS].sort())
  })

  it('R-6 THE NO-THROW ROW — no throw escapes on any ACCEPTED shape', async () => {
    for (const args of [{}, { target: 'a' }, { target: 'a', newTab: true }, { newTab: false }]) {
      const message = await thrown(() => callTool(newServer(recorder([{ activeId: null, entries: [], opened: false }]).backend), TOOL_NAME, args))
      expect(message, `R-6 (${JSON.stringify(args)}) — an accepted shape must not throw.`).toBe(null)
    }
  })

  it('R-7 THE IMPORT ROW — no sibling mechanism, no storage module', () => {
    const route = focusRouteSource() ?? ''
    expect(scanLines(route, /from\s+['"].*focus-model/), 'R-7 — the tool does NOT import the consumed module.').toEqual([])
    for (const token of [/require\s*\(/, /node:fs/, /from\s+['"]node:/, /provident-ssr/]) {
      expect(scanLines(route, token), `R-7 — a sibling/storage/engine import on the route FAILS: ${String(token)}`).toEqual([])
    }
  })

  it('R-8 THE PRELOAD ROW — the preload bridge is UNCHANGED (`§5.1` row 12)', () => {
    const preload = read('src/main/preload.ts')
    expect(preload.includes(`'${METHOD}'`), 'R-8 / `§2.1` item 10 — the route adds NOTHING to the preload bridge.').toBe(false)
    expect(preload, 'R-8 — the route rides the EXISTING invoke path.').toContain('IPC_INVOKE')
  })

  it('R-9 THE NO-FOCUS-WALK ROW', () => {
    for (const token of [/activeElement/, /matchMedia/, /addEventListener/, /focusable/, /querySelector/, /getComputedStyle/, /\.focus\s*\(/]) {
      expect(scanLines(stripComments(focusRouteSource() ?? ''), token), `R-9 / §0 ruling 15 — a focus WALK on the route FAILS: ${String(token)}`).toEqual([])
    }
    expect(read(RENDERER_REL), 'R-9 — the case may (and must) be NAMED `focus`: the ban is on the walk, not the word.').not.toBe('')
  })

  it('R-10 THE PAGE-DESIGN ROW — `docs/skills/designing-pages.md` does not exist', () => {
    expect(existsSync(join(ROOT, 'docs', 'skills', 'designing-pages.md')), 'R-10 — if it comes to exist, this unit OWES an ABSENCE row.').toBe(false)
  })
})

// ===========================================================================
// 7. THE FIVE NEGATIVE CLAIMS (`§2.4`)
// ===========================================================================
describe('§2.4 rows 1..5 — the five negative claims, with their falsifiers', () => {
  it("§2.4 row 1 / `RT-4` NOT IN `MUTATING_METHODS` — the SEVEN-member set pinned BY NAME (an EIGHTH entry FAILS)", () => {
    const live = liveMutatingMethods()
    expect(live.sort(), `§2.4 row 1 — name-set equality against the SEVEN members. Measured: ${JSON.stringify(live)}`).toEqual([...EXPECTED_MUTATING].sort())
    expect(live, "§2.4 row 1 — and the member 'focus' is ABSENT.").not.toContain(METHOD)
  })

  it('§2.4 row 2 / `RF-3` EMITS NO NOTIFICATION — the notify PREDICATE stays KEYED ON that set (a BARE COUNT IS NOT THE INSTRUMENT)', () => {
    const renderer = read(RENDERER_REL)
    expect(/MUTATING_METHODS[.]has[(]/.exec(renderer)?.[0], '§2.4 row 2 — THE INSTRUMENT: the predicate itself, not a count of pushes (the notify site is reached on EVERY successful reply).').not.toBeUndefined()
    expect(liveMutatingMethods(), "§2.4 row 2 — the set the predicate is keyed on carries NO 'focus'.").not.toContain(METHOD)
    expect(scanLines(stripComments(focusRouteSource() ?? ''), /notify|sendResourceUpdated|resources\/updated|app-graph-changed/i), '§2.4 row 2 — a push site on the route FAILS (`§5.U` row 3).').toEqual([])
  })

  it('§2.4 row 3 / `RF-4` PERSISTS NOTHING — the storage-token scan: ANY HIT FAILS', () => {
    for (const token of [/localStorage/, /sessionStorage/, /indexedDB/, /writeFile/, /node:fs/, /storage/i]) {
      expect(scanLines(stripComments(focusRouteSource() ?? ''), token), `§2.4 row 3 / P-FT-4 — a storage token on the route FAILS: ${String(token)}`).toEqual([])
    }
  })

  it('§2.4 row 4 / `RF-4` CANNOT FORCE A RE-RENDER — no state-slice write, no invalidation, and NO MORE THAN THAT IS CLAIMED', () => {
    for (const token of [/state-slice/, /applyCommand/, /invalidate/i, /re-?render/i]) {
      expect(scanLines(stripComments(focusRouteSource() ?? ''), token), `§2.4 row 4 — a WRITER on the route FAILS: ${String(token)}`).toEqual([])
    }
    expect(liveMutatingMethods(), "§2.4 row 4 — the name sets are unchanged: the predicate's set carries no 'focus' (the whole of what this instrument reaches).").not.toContain(METHOD)
  })

  it('§2.4 row 5 / `RF-2` THE NOT-READY REJECTION — fully node-observable', async () => {
    const rec = recorder([], 'renderer not ready (timeout 4242ms)')
    const message = await thrown(() => callTool(newServer(rec.backend), TOOL_NAME, { target: 'x' }))
    expect(message, '§2.4 row 5 — the strongest of the five: the whole claim is observable node-side.').toMatch(/renderer not ready \(timeout 4242ms\)/)
    expect(rec.calls, '§2.4 row 5 — one attempt, nothing queued, no silent no-op, no fallback.').toEqual([{ method: METHOD, args: { target: 'x' } }])
  })
})

// ===========================================================================
// 8. `§5.U` — THE SEVEN-ROW MATRIX (node-side halves; rows 3/4 LABELLED)
// ===========================================================================
describe('§5.U — the seven matrix rows (node-side halves; rows 3/4 LABELLED)', () => {
  it('§5.U row 1 — the tool IS LISTED (a name-set read over `ALL_TOOLS`)', () => {
    expect(ProvidentMcpServer.ALL_TOOLS, '§5.U row 1 — the listing is a name in an in-repo set.').toContain(TOOL_NAME)
    expect([...ProvidentMcpServer.ALL_TOOLS].sort(), '§5.U row 1 / E-a — asserted by SET EQUALITY.').toEqual([...EXPECTED_ALL_TOOLS].sort())
  })

  it('§5.U row 2 — REGISTERED UNDER THE DEFAULT GATE: the resolution read resolves `dispatch`, ON by default', () => {
    const server = newServer(recorder([{}]).backend)
    expect(server.getGateConfig().enabled, '§5.U row 2 — the default gate is an in-repo constant.').toContain('dispatch')
    expect(groupForTool(TOOL_NAME), '§5.U row 2 — the resolved group name (falsifier: any group but `dispatch`).').toBe('dispatch')
    expect(server.allowedToolNames(), '§5.U row 2 — registered under the default gate without a human grant.').toContain(TOOL_NAME)
  })

  it('§5.U row 3 (LABELLED: the structurally-not-observable half) — no graph/resource notification is emitted', () => {
    // THE LABEL, IN THE ROW: the notify predicate is a MAIN-SIDE push keyed on
    // `MUTATING_METHODS` membership and `'focus'` is absent from that set, so the predicate
    // cannot fire for this method. THE STRONGER CLAIM — that no real window re-rendered — is
    // NOT observable on this unit's instruments and is therefore NOT CLAIMED.
    expect(/MUTATING_METHODS[.]has[(]/.test(read(RENDERER_REL)), "§5.U row 3 — the predicate's keying site.").toBe(true)
    expect(liveMutatingMethods(), "§5.U row 3 — the set the predicate is keyed on, with 'focus' ABSENT.").not.toContain(METHOD)
  })

  it('§5.U row 4 (LABELLED) — no re-render and no invalidation: no writer on the route; the claim is NO MORE THAN the instrument reaches', () => {
    expect(scanLines(stripComments(focusRouteSource() ?? ''), /state-slice|applyCommand|invalidate/i), '§5.U row 4 — a state-slice write or an invalidation FAILS this row.').toEqual([])
    expect(liveMutatingMethods(), '§5.U row 4 — "the name sets are unchanged".').not.toContain(METHOD)
  })

  it('§5.U row 5 — a refusal returns the declared shape and changes nothing', async () => {
    const reason = '  refused: unicode-pad  '
    const got = (await callTool(newServer(recorder([{ activeId: null, entries: [], opened: false, refused: { reason } }]).backend), TOOL_NAME, { target: 'x' })) as Record<string, unknown>
    assertDeclaredShape(got, '§5.U row 5')
    assertOptionalMember(got, true, '§5.U row 5')
    expect(Object.keys(got).sort(), "§5.U row 5 — the asserted object is the returned object's own key set: three required members + the optional one the refusal carries.").toEqual([...DECLARED_MEMBERS].sort())
    expect((got['refused'] as Record<string, unknown>)['reason'], "§5.U row 5 — the reason is the consumer's own string, untrimmed and uninvented.").toBe(reason)
  })

  it('§5.U row 6 — the not-ready rejection: the readiness gate is crossed BEFORE dispatch', async () => {
    const rec = recorder([], 'renderer not ready (timeout 9ms)')
    const message = await thrown(() => callTool(newServer(rec.backend), TOOL_NAME, {}))
    expect(message, '§5.U row 6 — falsifiers: a pre-ready success, a silent no-op, a queued mutation.').toMatch(/renderer not ready \(timeout \d+ms\)/)
    const okRec = recorder([{ activeId: 'z', entries: ['z'], opened: false }])
    expect(await thrown(() => callTool(newServer(okRec.backend), TOOL_NAME, {})), '§5.U row 6 — the SAME call services once READY.').toBe(null)
  })

  it('§5.U row 7 — a repeated target activates BY IDENTITY with NO APPEND, and the tool compared nothing', async () => {
    const answers = [
      { activeId: '', entries: ['e'], opened: false },
      { activeId: 'e', entries: ['e'], opened: false },
      { activeId: 'e', entries: ['e', 'other'], opened: true },
    ]
    const rec = recorder(answers)
    const server = newServer(rec.backend)
    const first = (await callTool(server, TOOL_NAME, { target: 'e' })) as Record<string, unknown>
    const second = (await callTool(server, TOOL_NAME, { target: 'e' })) as Record<string, unknown>
    const third = (await callTool(server, TOOL_NAME, { target: 'other' })) as Record<string, unknown>
    expect(first, "§5.U row 7 — the consumer's own first answer, echoed.").toEqual(answers[0])
    expect(second['activeId'], "§5.U row 7 — activation BY IDENTITY: the existing entry's own id.").toBe('e')
    expect((second['entries'] as unknown[]).length, '§5.U row 7 — NO APPEND on a repeated target.').toBe(1)
    expect(third['entries'] as unknown[], '§5.U row 7 — the APPEND CONTROL: a distinct target appends, as declared.').toEqual(['e', 'other'])
    expect(rec.calls.map((c) => c.method), '§5.U row 7 — three calls, three renderer calls: nothing is held between calls.').toEqual([METHOD, METHOD, METHOD])
  })
})

// ===========================================================================
// 9. THE SHAPE ROW'S THREE DRIVES (`§2.1` item 5; `§3.2 F-5`'s fence)
// ===========================================================================
describe("§2.1 item 5 / §3.2 F-5 — the shape row's three declared drives", () => {
  it("RS-1(a) a serviced call with the consumer's well-formed answer", async () => {
    const got = (await callTool(newServer(recorder([{ activeId: 'a', entries: ['a'], opened: false }]).backend), TOOL_NAME, { target: 'a' })) as Record<string, unknown>
    assertDeclaredShape(got, 'RS-1(a)')
    assertOptionalMember(got, false, 'RS-1(a)')
    expect(Object.keys(got).sort(), 'RS-1(a) — the three required members on the serviced arm; `refused` ABSENT.').toEqual([...REQUIRED_MEMBERS].sort())
  })

  it("RS-1(b) a refusal answer: four names with `refused`, and `refused`'s own key set is exactly ['reason']", async () => {
    const got = (await callTool(newServer(recorder([{ activeId: null, entries: [], opened: false, refused: { reason: 'r' } }]).backend), TOOL_NAME, { target: 'a' })) as Record<string, unknown>
    assertDeclaredShape(got, 'RS-1(b)')
    assertOptionalMember(got, true, 'RS-1(b)')
    expect(Object.keys(got).sort(), 'RS-1(b) — three required members with the optional `refused` the refusal carries; no fifth member.').toEqual([...DECLARED_MEMBERS].sort())
    expect(Object.keys(got['refused'] as Record<string, unknown>), 'RS-1(b) — the tool invents NO code and adds NO member inside `refused`.').toEqual(['reason'])
  })

  it("RS-1(c) a MALFORMED consumer answer is passed through and the tool adds nothing (`§3.2 F-5`'s fence)", async () => {
    const malformed = { activeId: 5, entries: 'not-an-array', opened: 'yes' }
    const got = (await callHandler(newServer(recorder([malformed]).backend), TOOL_NAME, {})) as Record<string, unknown>
    expect(got, 'RS-1(c) — the tool guards nothing and coerces nothing.').toEqual(malformed)
  })
})

// ===========================================================================
// 10. THE CENSUS (`§5.2` item 4) — COUNTS DISTINGUISHED FROM NAME-SET EQUALITIES
// ===========================================================================
describe('§5.2 item 4 — the census as a list: counts (duplicate checks) beside name-set equalities', () => {
  it('C-a/E-a `ALL_TOOLS`: the COUNT 22 beside the name-set equality', () => {
    const live = ProvidentMcpServer.ALL_TOOLS
    expect([...live].sort(), 'E-a — the load-bearing half: name-set equality including `provident.focus`.').toEqual([...EXPECTED_ALL_TOOLS].sort())
    expect(live.length, 'C-a — the count, retained ONLY as a duplicate check.').toBe(22)
    expect(live, 'E-a — the NAME, not the count, is what pins the invariant.').toContain(TOOL_NAME)
  })

  it("C-b/E-b `RpcMethod`: the COUNT 22 beside the union's name-set equality (the TYPE WALL)", () => {
    expect(Object.keys(RPC_METHOD_CENSUS).length, 'C-b — the count, beside the name-set equality.').toBe(22)
    expect(Object.keys(RPC_METHOD_CENSUS), "E-b — 'focus' IS a member of the exhaustive record.").toContain(METHOD)
    expect(liveRpcMethods(), `E-b — the union in the source carries '${METHOD}' (name, not count).`).toContain(METHOD)
  })

  it('C-c/E-d/F-4 the default-gate registered subset 7 → 8, and `MUTATING_METHODS` gains none', () => {
    const subset = newServer(recorder([{}]).backend).allowedToolNames().filter((n) => !n.startsWith('module:'))
    expect(subset.sort(), `C-c — the ON-by-default group's registered subset, NAME-complete. Measured: ${JSON.stringify([...subset].sort())}`).toEqual([...EXPECTED_DEFAULT_GATE_TOOLS].sort())
    expect(groupForTool(TOOL_NAME), 'C-c / `§2.2` X-2 — the tool joins the EXISTING group; it mints no sixth.').toBe('dispatch')
    expect(liveMutatingMethods().sort(), 'E-d — name-set-equal to its SEVEN members, NO EIGHTH.').toEqual([...EXPECTED_MUTATING].sort())
  })

  it('N-11 THE TYPE WALL — the `RpcMethod` member and the switch case AGREE (a missing member is a TYPECHECK red)', () => {
    expect(read(RENDERER_REL), `N-11 — the switch case '${METHOD}' must exist, or the union and the switch disagree.`).toMatch(new RegExp("case[ ]+'" + METHOD + "'[ ]*:"))
    expect(liveRpcMethods(), `N-11 / E-b — the union member '${METHOD}' (its ABSENCE is the TYPE-WALL red, not a runtime red).`).toContain(METHOD)
    expect(Object.keys(RPC_METHOD_CENSUS), "N-11 — this file's own exhaustive record is the compile-time half of the same pin.").toContain(METHOD)
  })
})

// ===========================================================================
// 11. THE REGISTER HARNESS (`§5.5.1`) — DECLARED-VS-MEASURED, THE CAPS, THE STOP RULE
// ===========================================================================
let REGISTER_REPORT: Awaited<ReturnType<typeof runRegister>> | null = null
let REGISTER_EXEC_ERROR: unknown = null
/** THE READINGS, ONE LINE, captured at the register's own execution site so they are
 *  reportable at RED time (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). */
let REGISTER_DIAGNOSTICS = '(the register did not reach its execution site)'

describe('§5.5.1 / §5.5.4 — THE EXECUTED PROPERTY REGISTER (20 typed rows / 20 terms / declared total 73)', () => {
  it('REGISTER-EXEC-1 — the register EXECUTES: the harness runs it once and reports every row (an un-run row is a FAILURE)', async () => {
    try {
      REGISTER_REPORT = await runRegister(REGISTER)
    } catch (e) {
      REGISTER_EXEC_ERROR = e
      // THE READINGS COME BACK EVEN ON THE FAILING PATH: the harness's own failure message IS
      // the readings (declared total with its terms, the executed total, every row's
      // attempts/held/broken, and the un-run rows NAMED as failures).
      REGISTER_DIAGNOSTICS = e instanceof Error ? e.message : String(e)
    }
    if (REGISTER_EXEC_ERROR !== null) throw REGISTER_EXEC_ERROR
    const report = REGISTER_REPORT as NonNullable<typeof REGISTER_REPORT>
    const perRow = report.rows
      .map((r) => `${r.id} ${r.attemptsRun}/${r.declaredTerm} held=${r.held} broken=${r.broken} controls=${r.controls} ${r.state}`)
      .join(' | ')
    // THE READINGS, PRINTED WHETHER OR NOT THEY PASS (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-
    // TERMS`): the declared total WITH its terms, the executed total, each row's own
    // attempts/held/broken, and the un-run rows NAMED as FAILURES. This file pins NO expected
    // per-row state: the register is RED here precisely because the tool does not exist yet,
    // and its un-run rows must be reported as failures rather than absorbed.
    REGISTER_DIAGNOSTICS = reportDiagnostics(report)
    expect(
      report.unrunRows,
      `REGISTER — un-run rows are FAILURES, never passes. termsDeclared=${report.termsDeclared} · totalDeclared=${report.totalDeclared} · attemptsExecuted=${report.attemptsExecuted} · rowsExecuted=${report.rowsExecuted} · rows=${report.rows.length} · registerStoppedAt=${String(report.registerStoppedAt)} · un-run=${JSON.stringify(report.unrunRows)} · PER ROW: ${perRow}`,
    ).toEqual([])
    expect(report.rows.filter((r) => r.state === 'broken').map((r) => r.id), `REGISTER — every row held (no row is a pass while broken). PER ROW: ${perRow}`).toEqual([])
    expect(report.attemptsExecuted, `REGISTER — the EXECUTED attempts equal the twenty declared terms. PER ROW: ${perRow}`).toBe(report.termsDeclared)
    expect(report.totalDeclared, `REGISTER — the declared total is the twenty-cell sum the cells themselves carry. PER ROW: ${perRow}`).toBe(report.termsDeclared)
  })

  it('REGISTER-TERMS — the declared total is the sum of its TWENTY printed TERMS: `73` (`§5.5.4` item 2)', () => {
    const rowTerms = REGISTER.map((r) => r.term)
    expect(rowTerms, `REGISTER — the twenty typed row cells carry their terms IN ROW ORDER. Measured: ${JSON.stringify(rowTerms)} vs declared: ${JSON.stringify([...DECLARED_TERMS])}`).toEqual([...DECLARED_TERMS])
    expect(REGISTER.length, 'REGISTER — exactly `20` typed rows (`§5.5.1` enumerates twenty; the two `P-FT-PROBE-*` rows are the stop-rule CONTROL, reported beside the register).').toBe(20)
    expect(new Set(REGISTER.map((r) => r.id)).size, 'REGISTER — the row ids are distinct (`P-FT-*`).').toBe(REGISTER.length)
    expect(new Set(REGISTER.map((r) => r.strategyId)).size, 'REGISTER — TWENTY DISTINCT strategy ids, one per row (`S-FT-*`).').toBe(REGISTER.length)
    // THE DECLARED TOTAL (`§5.5.4` item 2, discharged by the row-set settlement):
    // it is the sum of the executed cells' OWN twenty terms — asserted live, never a
    // figure the execution contradicts — and the superseded seventeen-cell `67` is
    // kept VISIBLE as a WITHDRAWN reading beside it (`73 − 6` = `67`).
    expect(rowTerms.reduce((a, b) => a + b, 0), 'REGISTER — the declared total = the sum of the cells\' own twenty terms: `73`.')
      .toBe(73)
    expect(rowTerms.reduce((a, b) => a + b, 0), 'REGISTER — and that live sum is the register\'s own DECLARED_TOTAL literal (a literal the cells contradict is a review finding).')
      .toBe(DECLARED_TOTAL)
    expect(DECLARED_TOTAL, 'REGISTER — the re-grained declared total literal.').toBe(73)
    expect([...DECLARED_TERMS].reduce((a, b) => a + b, 0), 'REGISTER — the DECLARED_TERMS literal sums to `73` too (no second authority).').toBe(73)
    // THE WITHDRAWN READING, KEPT VISIBLE AND NEVER AN ASSERTION TARGET:
    expect(AS_FILED_TOTAL, 'REGISTER — the SUPERSEDED seventeen-cell total, kept visible as WITHDRAWN.').toBe(67)
    expect(EXECUTED_CELLS_SUM_AT_SETTLEMENT, 'REGISTER — the superseded reading is MEASURED from its own terms, not re-typed.').toBe(67)
    expect(AS_FILED_DECLARED_TERMS.length, 'REGISTER — seventeen cells at the settlement (the superseded row count).').toBe(17)
    expect([...DECLARED_TERMS].length - AS_FILED_DECLARED_TERMS.length, 'REGISTER — the settlement added THREE rows: `+6` drives (`2 + 2 + 2`) is the whole of the `67` → `73` move (`§5.5.4` item 1/2).').toBe(3)
    expect(DECLARED_TOTAL - AS_FILED_TOTAL, 'REGISTER — `73 − 67` = `6` = the three restored rows\' own declared drives.').toBe(6)
    // THE CHAIN, RECOMPUTED FROM THE TERMS AND CLOSING ON THE FINAL TOTAL. THE DERIVED CHAIN
    // IS WHAT IS ASSERTED; `§5.5.4` item 2's PRINTED chain is NOT (`… 43 → 45 → 47 → 59 …`):
    // that sequence applies the `AR` rows in `§5.5.1` TABLE order while the `DECLARED_TERMS`
    // list printed in the same sentence runs `… 43 → 44 → 46 → 58 …`, and it carries TWENTY
    // running figures under a *"nineteen steps"* label. THE EXECUTED CELLS GOVERN (`§5.5.3`),
    // so the divergence is REPORTED, not bent: the closure on `73` is asserted under EITHER
    // derivation, and the step-count WORD is asserted against the cells, never quoted.
    expect([...DECLARED_TERM_CHAIN], 'REGISTER — the chain, one term at a time in `DECLARED_TERMS` order (the contract\'s printed chain orders the `AR`/`RS` cells differently; reported, not asserted).').toEqual([4, 7, 10, 12, 14, 16, 19, 29, 31, 32, 43, 45, 47, 59, 63, 65, 67, 69, 72, 73])
    expect(DECLARED_TERM_CHAIN.length, 'REGISTER — a chain over the twenty terms carries TWENTY running figures (asserted against the cells, NOT the contract\'s "nineteen-step" WORD, which its own twenty printed figures refute).').toBe(DECLARED_TERMS.length)
    expect(DECLARED_TERM_CHAIN[DECLARED_TERM_CHAIN.length - 1], 'REGISTER — the chain CLOSES on the declared total, so the total is the sum of its own terms.').toBe(DECLARED_TOTAL)
    expect([4, 7, 10, 12, 14, 16, 19, 29, 31, 32, 43, 45, 47, 59, 63, 65, 67, 69, 70, 73][19], 'REGISTER — the contract\'s PRINTED chain (table-ordered `AR`, `[1, 3]`-ordered `RS`) ALSO closes on `73`: the two derivations differ in ORDER, never in total.').toBe(DECLARED_TOTAL)
    // THE TWO SUBTOTAL DECOMPOSITIONS, each recomputed from the cells' own terms:
    const domainOfId = (id: string): string => id.split('-')[2] as string
    const byDomain: Record<string, number> = {}
    const byType: Record<string, number> = {}
    for (const r of REGISTER) {
      byDomain[domainOfId(r.id)] = (byDomain[domainOfId(r.id)] ?? 0) + r.term
      byType[r.type] = (byType[r.type] ?? 0) + r.term
    }
    expect(byDomain, 'REGISTER — the five by-domain subtotals, EACH THE SUM OF THE ADDENDS IT NAMES (`14 + 18 + 27 + 10 + 4` = `73`).').toEqual({ ...DECLARED_DOMAIN_SUBTOTALS })
    expect(Object.values(byDomain).reduce((a, b) => a + b, 0), 'REGISTER — the five-way domain sum closes on the final total.').toBe(DECLARED_TOTAL)
    expect(byType, 'REGISTER — the three by-type subtotals over `§5.5.1`\'s own `Type` column (`41 + 14 + 18` = `73`; `§5.5.4` item 2\'s printed `43`/`16` are not the sum of the addends it lists — reported, not asserted).').toEqual({ ...DECLARED_TYPE_SUBTOTALS })
    expect(Object.values(byType).reduce((a, b) => a + b, 0), 'REGISTER — the three-way type sum closes on the final total.').toBe(DECLARED_TOTAL)
    expect(new Set(REGISTER.map((r) => r.type)), 'REGISTER — the three families, and never an `F-` row.').toEqual(new Set(['P-IM', 'P-SM', 'P-TP']))
    for (const r of REGISTER) expect(['P-IM', 'P-SM', 'P-TP'], `REGISTER — ${r.id} is a TYPED row.`).toContain(r.type)
    // THE FIVE DOMAINS, READ FROM THE ROW ID'S OWN DOMAIN PREFIX (`§5.5`'s declaration:
    // the prefix is PART of the id so a reader sees which domain a row drives).
    expect([...new Set(REGISTER.map((r) => domainOfId(r.id)))].sort(), 'REGISTER — the FIVE declared domains (RT/ID/AR/RF/RS), by name.').toEqual(['AR', 'ID', 'RF', 'RS', 'RT'])
  })

  it('REGISTER-ROW-SET — EVERY one of the TWENTY enumerated rows executes: NO enumerated-but-unexecuted row (`§5.5.4`)', () => {
    const ids = REGISTER.map((r) => r.id)
    expect([...ids].sort(), 'REGISTER — the register carries EXACTLY the twenty ids `§5.5.1` enumerates, by name (`§5.5.4` item 1: every enumerated row has a recorded fate).').toEqual([...ENUMERATED_ROW_IDS].sort())
    for (const id of ENUMERATED_ROW_IDS) {
      expect(ids, `REGISTER — the enumerated row ${id} IS executed (the row-set settlement EXECUTES it rather than withdrawing it).`).toContain(id)
      const row = REGISTER.find((r) => r.id === id) as (typeof REGISTER)[number] | undefined
      expect(row?.drives.length, `REGISTER — ${id} carries its own declared drives (no enumerated row rides another row's drives).`).toBe(row?.term)
    }
    // THE THREE ROWS THE SETTLEMENT RESTORES, EACH WITH ITS OWN DECLARED PROPERTY, FAMILY,
    // STRATEGY ID AND DRIVE COUNT (`§5.5.4` item 1(a)/(b)/(c)) — and NONE of them is a
    // re-numbered or re-used existing row.
    const restored: Array<{ id: string; type: string; strategyId: string; term: number }> = [
      { id: 'P-FT-AR-2', type: 'P-TP', strategyId: 'S-FT-EDGE-1', term: 2 },
      { id: 'P-FT-AR-3', type: 'P-IM', strategyId: 'S-FT-PASS-1', term: 2 },
      { id: 'P-FT-RF-3', type: 'P-SM', strategyId: 'S-FT-PUSH-1', term: 2 },
    ]
    for (const r of restored) {
      const row = REGISTER.find((x) => x.id === r.id) as (typeof REGISTER)[number] | undefined
      expect(row, `REGISTER — the restored row ${r.id} is present.`).toBeTruthy()
      expect(
        { type: row?.type, strategyId: row?.strategyId, term: row?.term },
        `REGISTER — ${r.id}'s own declared family, strategy id and drive count, unmoved from \`§5.5.1\`'s cell.`,
      ).toEqual({ type: r.type, strategyId: r.strategyId, term: r.term })
      expect(row?.bound, `REGISTER — ${r.id} is ENUMERATED (the bounded set is unchanged by the settlement).`).toBe('enumerated')
    }
    // THE BOUNDED SET AND THE READING CLASSES, BOTH UNMOVED (`§5.5.4` item 3(c)).
    expect(REGISTER.filter((r) => r.bound === 'bounded').map((r) => r.id), 'REGISTER — `§5.5.2` item 2\'s FIVE `(bounded)` rows, still the five the contract names.').toEqual([...DECLARED_BOUNDED_ROWS])
    const allIds = REGISTER.map((r) => r.id)
    for (const [cls, members] of Object.entries(DECLARED_READING_CLASSES)) {
      for (const id of members) expect(allIds, `REGISTER — the reading class "${cls}" names ${id}, which IS a register row.`).toContain(id)
    }
    expect(REGISTER.filter((r) => r.term > 0).length, 'REGISTER — NO row carries a zero term: every row drives its own pool.').toBe(20)
  })

  it('REGISTER-CAPS — `<=100` attempts per row · `<=400` total · no seed and no generator', () => {
    for (const r of REGISTER) {
      expect(r.term, `REGISTER — ${r.id}'s term is within the per-row cap <=100.`).toBeLessThanOrEqual(CAP_PER_ROW)
      expect(r.drives.length, `REGISTER — ${r.id} carries exactly its declared term count of drives (no sampling, no adaptive search).`).toBe(r.term)
    }
    expect(REGISTER.reduce((n, r) => n + r.term, 0), 'REGISTER — the total is within the <=400 cap.').toBeLessThanOrEqual(CAP_TOTAL)
    expect(REGISTER.every((r) => r.strategyId.startsWith('S-FT-')), "REGISTER — every strategy id is this unit's own (`S-FT-*`).").toBe(true)
    expect(REGISTER.every((r) => !/seed|random|lcg/i.test(r.strategyId)), 'REGISTER — NO SEED AND NO GENERATOR: no row samples.').toBe(true)
    expect(REGISTER.every((r) => /^P-FT-[A-Z]+-\d+$/.test(r.id)), 'REGISTER — every row id is a typed `P-FT-<domain>-<n>` id.').toBe(true)
    const bounded = REGISTER.filter((r) => r.bound === 'bounded').map((r) => r.id)
    expect(bounded, "REGISTER — `§5.5.2` item 2 declares FIVE of the TWENTY rows `(bounded)` (a quantifier over a pool: the 10/11/12 shapes, the tool's own bytes, reachable by name); UNMOVED by the settlement — all three restored rows are ENUMERATED.").toEqual(['P-FT-ID-3', 'P-FT-ID-5', 'P-FT-AR-1', 'P-FT-AR-4', 'P-FT-RS-2'])
  })

  it("REGISTER-STOP-RULE-CONTROL — stop-after-5-consecutive-failures abandons the row's remaining attempts and starts NO further row", async () => {
    const probe = await runRegister(STOP_RULE_PROBE)
    expect(probe.rows[0]?.attemptsRun, 'REGISTER — the probe row abandons its remaining attempts at the 5th consecutive failure (7 driven, 5 run).').toBe(5)
    expect(probe.registerStoppedAt, 'REGISTER — the stop is RECORDED with the row it stopped at; a null here on a broken register is a harness defect.').toBe('P-FT-PROBE-1')
    expect(probe.rows[1]?.state, 'REGISTER — no further row starts; the un-run row is reported as `un-run`, never as a pass.').toBe('un-run')
    expect(probe.unrunRows, 'REGISTER — and the un-run row is NAMED in the report.').toEqual(['P-FT-PROBE-2'])
  })

  it('REGISTER-HONESTY — what the register does NOT prove, and the two reading classes kept apart', () => {
    const report = REGISTER_REPORT
    // THE READINGS, so a RED register still reports every figure it reached — and the
    // superseded `67` is read as WITHDRAWN beside the live `73` rather than silently gone.
    expect(typeof REGISTER_DIAGNOSTICS, 'REGISTER — the readings line is captured on BOTH paths (a returned report or the harness\'s own failure message).').toBe('string')
    expect(REGISTER_DIAGNOSTICS, `REGISTER — the readings carry the re-grained declared total.\n${REGISTER_DIAGNOSTICS}`).toContain('totalDeclared=73')
    expect(report?.totalDeclared ?? DECLARED_TOTAL, `REGISTER — the live declared total is the twenty-cell sum. ${REGISTER_DIAGNOSTICS}`).toBe(73)
    expect(AS_FILED_TOTAL, 'REGISTER — and the withdrawn reading is `67`, never asserted as live.').toBe(67)
    if (report !== null) {
      expect(report.totalDeclared, 'REGISTER — the declared total printed by the harness is the re-grained `73` (the settled figure), never the superseded `67`.').toBe(73)
      expect(report.totalDeclared, 'REGISTER — and it is the SAME figure the executed cells sum to: no printed total the execution contradicts.').toBe(REGISTER.reduce((n, r) => n + r.term, 0))
      expect(report.termsDeclared, 'REGISTER — and it is the sum of the twenty printed terms.').toBe(73)
      expect(report.termsDeclared, 'REGISTER — the cells\' own live sum, asserted rather than the literal alone.').toBe(EXECUTED_CELLS_SUM)
      expect(report.attemptsExecuted, `REGISTER — the EXECUTED attempt total. Executed: ${report.attemptsExecuted} · declared: ${report.termsDeclared}`).toBeLessThanOrEqual(CAP_TOTAL)
      expect(report.rows.length, 'REGISTER — per-row attemptsRun/held/broken/readings/controls are reported for EVERY row.').toBe(REGISTER.length)
      expect(report.controlsRun, 'REGISTER — the control drives are reported BESIDE the term and are not counted inside it.').toBeGreaterThan(0)
      expect(report.assertionsPrinted, 'REGISTER — the assertions printed beside the terms.').toBeGreaterThan(0)
    }
    const allDrives = REGISTER.flatMap((r) => r.drives.map((d) => d.label))
    expect(allDrives.some((l) => /window|rendered surface|geometry|pointer|gesture|display|OS\b/i.test(l)), 'REGISTER §5.5.2 item 6 — no row drives a rendered surface, a window, an OS, a display, a transport peer or a human gesture: the excluded shapes are a BOUNDARY, not a gap.').toBe(false)
    expect(allDrives.some((l) => /real ipc|socket|electron window/i.test(l)), 'REGISTER §5.5.2 item 4 — the two reading classes are kept apart: a stub-driven row is [T] evidence about THE ROUTE, not about the real renderer.').toBe(false)
  })
})
