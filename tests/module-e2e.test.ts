// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/module-e2e.test.ts — RE-GRAINED to the SHIPPED realm half (unit `modularity`, L2 §9, C-15, D-308).
//
// WHAT THE OLD ROWS MEASURED, AND WHERE THE SUBJECT WENT: the file pinned the store→router→MCP chain —
// `syncModuleRouter` writing an installed module's declared tools into a `CapabilityRouter`, the server
// listing them, and `router.listTools()` proving it. The router holds NO tools now: the tool table is the
// MAIN half's (`ctx.tool`, `module:<name>.<tool>`, L2 §3/§11) and its producer is `U1`'s executor's
// `activations()`: `src/main/modules/` has LANDED and exports `createModuleExecutor`, and its rows are
// that unit's own battery (`tests/integration/module-system/executor.test.ts`, 6 of 8 green at this head)
// — not this file's to hold. The MCP composition over the executor is `mcp-surface`'s and still names the
// retired router members at this head (the verbatim `typecheck:tests` diagnostics at
// `src/main/mcp-server.ts:123/332/343/686/707/1063`). So the tool leg of this old chain is NAMED, not
// softened: no row below asserts a tool on this class, and the router-shape row in
// `tests/module-router.test.ts` reds if one is put back.
//
// THE LEG THAT IS SHIPPED AND IS DRIVEN HERE FOR REAL is the CROSSING (L2 §9): ONE frame
// `{module, client}` whose payload is the manifest's `client` function-STRING — transport-safe DATA,
// never a compiled source — evaluated inside the realm's FIVE-MEMBER client ctx, whose registrations
// then deliver. That is the same end-to-end claim the old rows made (install → sync → the thing is live
// and callable), re-grained to the surface this landing ships.
import { describe, it, expect } from 'vitest'
import { CapabilityRouter, type ClientHalfCtx } from '../src/renderer/extensions.js'
import type { ChannelEntry } from '../src/shared/module-channels.js'
/** The legacy rows drive `fire` with a bare data/address pair: this is the ENTRY they mean. */
const deliveredAt = (handle: string, data?: unknown, address: readonly string[] = []): ChannelEntry => ({ turn: 0, module: 'legacy', listener: handle, outcome: 'return', address, ...(data === undefined ? {} : { data }) })

/** The manifest's `client` member: a function-STRING, which is what the registry row already holds (§9). */
const CLIENT_SOURCE = `(ctx) => {
  ctx.onDelivery('render', (entry) => { ctx.log('realm delivered', { data: entry.data, address: entry.address }) })
  ctx.action('screenshot', () => 'shot')
}`

function realm(): { router: CapabilityRouter; lines: { line: string; detail: unknown }[] } {
  const lines: { line: string; detail: unknown }[] = []
  const router = new CapabilityRouter({ log: (line: string, detail?: unknown) => lines.push({ line, detail }) })
  return { router, lines }
}

describe('U9-FIX — the crossing: one frame in, a live realm registration out (L2 §9, C-15, D-308)', () => {
  it('1. a delivered module frame registers under its own name: the STRING is evaluated in the client ctx and its listener + action land in the realm records (old row 1: an installed module’s declarations reached the router)', () => {
    const { router, lines } = realm()
    router.registerModule('capture', CLIENT_SOURCE)
    expect(router.modules()).toEqual(['capture'])
    expect(router.listeners()).toEqual([{ module: 'capture', listener: 'render', handle: 'module:capture#render' }])
    const [action] = router.actions()
    expect(action).toMatchObject({ module: 'capture', name: 'screenshot' })
    expect(typeof action!.fn, 'the delivered action lands WITH its live closure (`ActionRecord.fn`, D-313)').toBe('function')
    // nothing was refused on the way in: a delivered source is DATA that evaluates, not an error path.
    expect(lines).toEqual([])
  })

  it('2. a second delivery of the SAME frame adds NO member — the census re-send after an install is a no-op, never a second registration (old row 2: the post-install re-sync; re-grained by `S-23`: a DIFFERENT source REPLACES, and row 2b is that arm)', () => {
    const { router } = realm()
    router.registerModule('capture', CLIENT_SOURCE)
    router.registerModule('capture', CLIENT_SOURCE)
    expect(router.modules()).toEqual(['capture'])
    expect(router.actions().map((record) => record.name)).toEqual(['screenshot'])
    expect(router.listeners()).toHaveLength(1)
  })

  it('3. the frame is LIVE end-to-end: the delivered source’s own log line arrives through the realm’s sink, and `fire` on its handle delivers (old row 3: the full chain listed AND invoked)', () => {
    const { router, lines } = realm()
    router.registerModule('capture', CLIENT_SOURCE)
    const [listener] = router.listeners()
    expect(listener).toBeDefined()
    const outcome = router.fire(listener!.handle, deliveredAt(listener!.handle, { nodes: ['a', 'b'] }, ['panes', 'main']))
    expect(outcome).toEqual({ status: 'delivered', handle: 'module:capture#render' })
    // the body the DELIVERED STRING registered ran, and it ran with the realm's own ctx: its log line
    // carries the data and the triggering address the channel handed `fire`.
    expect(lines).toEqual([
      { line: 'realm delivered', detail: { data: { nodes: ['a', 'b'] }, address: ['panes', 'main'] } },
    ])
  })

  it('4. the crossing payload is DATA: the same source text delivered as a STRING and as the in-tree FUNCTION arm registers the same set (§9, C-15)', () => {
    const fromString = realm().router
    fromString.registerModule('capture', CLIENT_SOURCE)
    const asFunction = new Function(`"use strict"; return (${CLIENT_SOURCE});`)() as (ctx: ClientHalfCtx) => void
    const fromFunction = realm().router
    fromFunction.registerModule('capture', asFunction)
    expect(fromFunction.modules()).toEqual(fromString.modules())
    expect(fromFunction.listeners()).toEqual(fromString.listeners())
    // THE SET, NOT THE CLOSURE IDENTITIES: each arm carries its own function object, so the projection is `{module,
    // name}` and the LIVE closure is asserted on both sides (`ActionRecord.fn`, `D-313`).
    expect(fromFunction.actions().map(({ module, name }) => ({ module, name }))).toEqual(fromString.actions().map(({ module, name }) => ({ module, name })))
    expect(fromFunction.actions().every((record) => typeof record.fn === 'function')).toBe(true)
    expect(fromString.actions().every((record) => typeof record.fn === 'function')).toBe(true)
    // and the payload really was a string, so no compiled source crossed (D-308).
    expect(typeof CLIENT_SOURCE).toBe('string')
  })

  it('5. a module that was never delivered is NOT registered: no record stands and its handle is refused (old row 4: a disabled module’s tools were not callable)', () => {
    const { router } = realm()
    expect(router.modules()).toEqual([])
    expect(router.listeners()).toEqual([])
    expect(router.actions()).toEqual([])
    const outcome = router.fire('module:capture#render', deliveredAt('module:capture#render', {}, []))
    expect(outcome.status).toBe('refused')
    expect(outcome.reason).toContain('no listener stands under this handle')
  })

  it('6. withdraw is the frame’s inverse and FREES the name: the body stops delivering, every record goes, and a later delivery registers again (old row 5: disabling dropped the dynamic tool)', () => {
    const { router } = realm()
    router.registerModule('capture', CLIENT_SOURCE)
    const handle = router.listeners()[0]!.handle
    expect(router.withdraw('capture')).toBe(true)
    expect(router.modules()).toEqual([])
    expect(router.actions()).toEqual([])
    expect(router.fire(handle, deliveredAt(handle, {}, [])).status).toBe('refused')
    // the name is free again: the inverse withdraws ONE frame, it does not bar the module for good (§6).
    router.registerModule('capture', CLIENT_SOURCE)
    expect(router.modules()).toEqual(['capture'])
    expect(router.fire(router.listeners()[0]!.handle, deliveredAt(router.listeners()[0]!.handle, {}, [])).status).toBe('delivered')
  })
})
