// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/module-dynamic.test.ts — RE-GRAINED to the SHIPPED realm half (unit `modularity`, L2 §3, §11,
// `D-305`, `D-313`).
//
// WHAT THE OLD ROWS MEASURED, AND WHERE THE SUBJECT WENT: this file pinned the MCP server's dynamic-tool
// leg — a `CapabilityRouter` whose `ctx.tool(...)` registrations the server listed in `allowedToolNames()`
// and reached through `invokeTool` under the module+code two-gate. THIS LANDING TAKES THE TOOL TABLE OFF
// THE ROUTER ENTIRELY: a tool is `module:<name>.<tool>`, minted by the MAIN half's `ctx.tool`, and its
// producer is `U1`'s executor `activations()[].tools` (L2 §3, §11). So the subject is NOT retired — it
// moved to a half this file cannot drive at this head:
//
//   NAMED AND NOT SOFTENED — the producer has LANDED: `src/main/modules/` holds `loader.ts`,
//   `admission.ts`, `activation.ts`, `handles.ts` and `index.ts`, and `index.ts` exports
//   `createModuleExecutor(host)` (L2 §11). Its rows are `tests/integration/module-system/executor.test.ts`
//   — `module-system`'s own battery, 6 of whose 8 rows pass at this head — and that path is not this
//   file's to hold. What is NOT composed is the MCP side: `src/main/mcp-server.ts` still names the
//   retired router members it used to read a tool table from (`clear`, `listTools`, `invokeTool`,
//   `ctx.tool` — the verbatim `typecheck:tests` diagnostics at 123/332/343/686/707/1063). A row here that
//   constructed a server with a router and expected a dynamic tool would red for a TypeError on a surface
//   mid-landing, which is NOT evidence about behaviour. Instead every row below pins what the realm half
//   says about the tool it no longer produces, so the day an L4 invention puts a tool table back on this
//   class, this file reds loudly.
//
// THE TWO-GATE ITSELF IS UNMOVED AND IS `mcp-surface`'s (`docs/L2/mcp-surface/interface.md` §10): it is a
// property of `module:`-namespaced names at the MCP boundary, and no member of this realm half can grant
// or deny it.
import { describe, it, expect } from 'vitest'
import { CapabilityRouter, type ClientHalfCtx } from '../src/renderer/extensions.js'
import type { ChannelEntry } from '../src/shared/module-channels.js'
/** The legacy rows drive `fire` with a bare data/address pair: this is the ENTRY they mean. */
const deliveredAt = (handle: string, data?: unknown, address: readonly string[] = []): ChannelEntry => ({ turn: 0, module: 'legacy', listener: handle, outcome: 'return', address, ...(data === undefined ? {} : { data }) })

/** A module that registers all three realm-side members a client half may declare. */
function routerWithCapture(): { router: CapabilityRouter; lines: string[] } {
  const lines: string[] = []
  const router = new CapabilityRouter({ log: (line: string) => lines.push(line) })
  router.registerModule('capture', (ctx: ClientHalfCtx) => {
    ctx.onDelivery('screenshot', () => {})
    ctx.action('screenshot', () => ({ shot: 'taken' }))
    ctx.graph({ parent: 'root', nodes: [{ id: 'thumbnail' }] })
  })
  return { router, lines }
}

describe('U9 — dynamic tool registration is NO LONGER the router’s: the realm mints no tool name (M-r3, L2 §3/§11)', () => {
  it('1. nothing the realm records is a `module:<name>.<tool>` name: the module, listener, action and contribution records carry the DECLARATION grammar (`module:<n>#<key>`), which a tool name can never satisfy (old row 1: a router-backed server listed a dynamic tool)', () => {
    const { router } = routerWithCapture()
    const names = [
      ...router.modules(),
      ...router.listeners().map((record) => record.handle),
      ...router.actions().map((record) => record.module),
    ]
    expect(names.length).toBeGreaterThan(0)
    for (const name of names) {
      // a '.' opens a TOOL name and this half never mints one (L2 §11: `toolName` is the main half's).
      expect(name.includes('.')).toBe(false)
    }
    // the listener handle is the declaration mint, per module and per key.
    expect(router.listeners().map((record) => record.handle)).toEqual(['module:capture#screenshot'])
  })

  it('2. a TOOL-shaped name opens no listener: `fire("module:capture.screenshot")` is a refused VALUE naming the handle (old row 2/3: the server reached the router handler by tool name)', () => {
    const { router } = routerWithCapture()
    const outcome = router.fire('module:capture.screenshot', deliveredAt('module:capture.screenshot', { id: 7 }, []))
    expect(outcome.status).toBe('refused')
    expect(outcome.handle).toBe('module:capture.screenshot')
    expect(outcome.reason).toContain('no listener stands under this handle')
  })

  it('3. `fire` carries NO tool result: its outcome is exactly `{status, handle}`, and a body’s return value is dropped — there is no result channel on this half (old row 6: the dispatch returned the router handler’s result)', () => {
    const router = new CapabilityRouter()
    let handle: string | undefined
    router.registerModule('capture', (ctx) => {
      handle = ctx.onDelivery('screenshot', () => ({ shot: 'taken' }))
    })
    const outcome = router.fire(handle!, deliveredAt(handle!, { id: 7 }, []))
    expect(Object.keys(outcome).sort()).toEqual(['handle', 'status'])
    expect(outcome).toEqual({ status: 'delivered', handle })
  })

  it('4. the realm holds NO gate: no member of the two-gate stands on this class, so a module’s visibility cannot be decided here (old rows 4/5: the two-gate denied the invocation)', () => {
    const { router } = routerWithCapture()
    for (const gate of ['allowedToolNames', 'registeredEnabled', 'invokeTool', 'applyGatePatch', 'gate', 'capabilities']) {
      expect((router as unknown as Record<string, unknown>)[gate]).toBeUndefined()
    }
  })

  it('5. registration asks for NO capability and NO gate: a name and a source are the whole input, and a lawful registration is silent (old row 5: with neither module nor code the call was denied)', () => {
    const { router, lines } = routerWithCapture()
    expect(router.modules()).toEqual(['capture'])
    // the realm adds nothing of its own: a lawful frame logs nothing, and no admission verdict is minted
    // here — `host-api-token` / `declaration-overstated` / `foundation-tool` are the executor's (L2 §5).
    expect(lines).toEqual([])
  })

  it('6. a delivered client half CANNOT declare a tool: `ctx.tool` is absent, so a source that calls it is refused by name (`entry-threw`) and registers nothing (old rows 1/7: the tool table was the router’s to hold)', () => {
    const lines: string[] = []
    const router = new CapabilityRouter({ log: (line: string) => lines.push(line) })
    router.registerModule('capture', `(ctx) => { ctx.tool('screenshot', () => 'shot') }`)
    expect(lines).toContain('entry-threw')
    expect(router.listeners()).toEqual([])
    expect(router.actions()).toEqual([])
    expect(router.contributions()).toEqual([])
    // the module name stands (the frame WAS admitted as a frame); what it wanted to declare did not.
    expect(router.modules()).toEqual(['capture'])
  })

  it('7. AT THE EXECUTOR, NOT HERE — the router exposes no member a server could read a tool table from, so the “registered on the live server” row has no realm-side successor: its producer is `activations()[].tools` (L2 §11), which `src/main/modules/` has landed and whose rows `tests/integration/module-system/executor.test.ts` holds', () => {
    const { router } = routerWithCapture()
    for (const reader of ['listTools', 'tools', 'hasTool', 'registrations', 'clear']) {
      expect((router as unknown as Record<string, unknown>)[reader]).toBeUndefined()
    }
    // what the realm DOES answer to an MCP-side reader is a module name and nothing finer: the tool names
    // an `Activation` publishes are the executor's answer, and this file asserts their absence, not a stub.
    expect(router.modules()).toEqual(['capture'])
  })
})
