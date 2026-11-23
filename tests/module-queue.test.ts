// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/module-queue.test.ts — RE-GRAINED to the SHIPPED realm half (unit `modularity`, L2 §3, §10,
// D-305/D-231).
//
// THE SUBJECT THIS WHOLE FILE HELD IS RETIRED AND HAS **NO REPLACEMENT**: `ctx.uploadQueue()` was one of
// the six members the replaced `ModuleCtx` carried, and L2 §3 says it retires WHOLE rather than being
// re-pointed (four of the six were stubs or unwired; `D-305`, `D-231`). The five-member client ctx is
// `{store, onDelivery, action, graph, log}` — there is no queue member, no bounded buffer, no async
// process door and no successor to any of them. So each row below keeps its SUBJECT, names the member it
// lost, and pins what the shipped surface says in its place; where the answer is "nothing", the row says
// so and measures the ABSENCE, which is what an L4 invention would have to break.
//
// WHERE THE SUBJECT WENT, NAMED ONCE: the BOUND moved to the crossing's payload guard — `largePayloadBytes`,
// measured in `tests/module-image.test.ts` rows 6 and 8 — which bounds what CROSSES a boundary rather than
// what waits in a queue; the CONTAINMENT moved to the realm's one delivery entry, `fire`, which answers a
// refused VALUE instead of raising (L2 §3, `D-105`, `D-307`).
import { describe, it, expect } from 'vitest'
import { CapabilityRouter, type ClientHalfCtx } from '../src/renderer/extensions.js'

function capture(): { router: CapabilityRouter; ctx: () => ClientHalfCtx; lines: string[] } {
  const lines: string[] = []
  const router = new CapabilityRouter({ log: (line: string) => lines.push(line) })
  let seen: ClientHalfCtx | undefined
  router.registerModule('embed', (ctx: ClientHalfCtx) => {
    seen = ctx
  })
  return {
    router,
    ctx: () => {
      if (seen === undefined) throw new Error('registerModule handed the entry no ctx')
      return seen
    },
    lines,
  }
}

describe('U7 — the async-queue data-hook: RETIRED, no replacement (M-r12, L2 §3, D-305)', () => {
  it('1. `uploadQueue` is ABSENT from the five-member ctx — the key set is exactly §3’s, so no queue door and no stub behind one (old row 1: ctx.uploadQueue() returned {enqueue, drain})', () => {
    const { ctx } = capture()
    const handed = ctx()
    expect(Object.keys(handed).sort()).toEqual(['action', 'graph', 'log', 'onDelivery', 'store'])
    for (const gone of ['uploadQueue', 'queue', 'enqueue', 'drain']) expect(gone in handed).toBe(false)
  })

  it('2. the realm’s ONE act that carries data to a module is the DELIVERY, and it is not a queue: `fire` hands the item and the triggering address straight to the body (old row 2: enqueue buffered, drain processed)', () => {
    const router = new CapabilityRouter()
    let got: { data: unknown; address: readonly string[] } | undefined
    let handle: string | undefined
    router.registerModule('embed', (ctx) => {
      handle = ctx.onDelivery('render', (data, address) => {
        got = { data, address }
      })
    })
    expect(got).toBeUndefined()
    expect(router.fire(handle!, 'node-a', ['panes', 'main'])).toEqual({ status: 'delivered', handle })
    // delivered on the CALL, in order, with no buffer between the call and the body.
    expect(got).toEqual({ data: 'node-a', address: ['panes', 'main'] })
  })

  it('3. RETIRED, NO REPLACEMENT — there is no bounded buffer on this half, so the “drop the oldest past the bound” subject has no successor; the bound that survives is the crossing payload guard’s (old row 3: the queue held 1000 and dropped the oldest)', () => {
    const { router, ctx } = capture()
    // nothing on the ctx or the router claims a bound; a bound is a refusal at a boundary, and that
    // boundary is the payload guard's (`largePayloadBytes`, image rows 6/8), not a module member.
    for (const gone of ['uploadQueue', 'maxSize', 'bound', 'capacity', 'drain']) {
      expect(gone in ctx()).toBe(false)
      expect((router as unknown as Record<string, unknown>)[gone]).toBeUndefined()
    }
    // the realm keeps NO backlog: two deliveries are two calls, and nothing is retained between them.
    expect(router.listeners()).toHaveLength(0)
  })

  it('4. NOTHING on the realm is asynchronous: `fire` answers a plain outcome, and no member returns a Promise (old row 4: drain was a Promise while enqueue was synchronous)', () => {
    const { router, ctx } = capture()
    const handed = ctx()
    // the four callable members are synchronous by signature and by result.
    expect(handed.action('noop', () => undefined)).toBeUndefined()
    expect(typeof handed.onDelivery('render', () => {})).toBe('string')
    expect(typeof handed.graph({ parent: 'root', nodes: [] })).toBe('string')
    expect(handed.log('a line')).toBeUndefined()
    const outcome = router.fire('module:embed#render', {}, [])
    expect(outcome).not.toBeInstanceOf(Promise)
    expect(outcome.status).toBe('delivered')
  })

  it('5. a body that THROWS is contained and the realm continues — the failure-isolation subject survives on `fire` (old row 5: a throwing processor did not crash the drain)', () => {
    const router = new CapabilityRouter()
    const received: string[] = []
    let bad: string | undefined
    let good: string | undefined
    router.registerModule('embed', (ctx) => {
      // ONE handle per (module, listener key) (L2 §4), so two bodies need two keys: a re-used key would
      // share the first body's handle and the later registration would stand in its place.
      bad = ctx.onDelivery('render-a', () => {
        throw new Error('processor boom')
      })
      good = ctx.onDelivery('render-b', (item: unknown) => {
        received.push(String(item))
      })
    })
    const refused = router.fire(bad!, 'a', [])
    expect(refused.status).toBe('refused')
    expect(refused.reason).toBe('processor boom')
    expect(router.fire(good!, 'b', [])).toEqual({ status: 'delivered', handle: good })
    expect(received).toEqual(['b'])
  })

  it('6. RETIRED, NO REPLACEMENT — the unhandled-rejection class is UNSPELLABLE here: there is no async processor door, so no member can absorb or leak a rejected promise; a body is a sync function `fire` calls and contains (old row 6: an async processor’s rejection was contained by the queue)', () => {
    const { router, ctx, lines } = capture()
    const handed = ctx()
    // no member takes a processor; the only function-valued member is the delivery body, registered by
    // `onDelivery` and run by `fire` — synchronously, with its throw turned into a value.
    expect('uploadQueue' in handed).toBe(false)
    // and a delivered source that still asks for the retired door is REFUSED BY NAME, never silently
    // no-oped into a stub the way the retired one was (`entry-threw`, D-105).
    router.registerModule('legacy', `(ctx) => { ctx.uploadQueue() }`)
    expect(lines).toContain('entry-threw')
    expect(router.listeners()).toEqual([])
  })

  it('7. the module is handed ONE ctx for its whole run, and its store is the GIVEN writer by identity — the per-module identity subject survives without a queue (old row 7: uploadQueue() returned the SAME queue per module ctx — L2 §10, D-311)', () => {
    const writer = { read: () => 'fragment' } as unknown as ClientHalfCtx['store']
    const router = new CapabilityRouter({ store: writer })
    let first: ClientHalfCtx | undefined
    let second: ClientHalfCtx | undefined
    router.registerModule('embed', (ctx) => {
      first = ctx
      second = ctx
    })
    router.registerModule('other', (ctx) => {
      // each registration frame mints its OWN ctx; it never receives another module's.
      expect(ctx).not.toBe(first)
    })
    expect(first).toBe(second)
    expect(first!.store).toBe(writer)
    expect(first!.store.read).toBe(writer.read)
  })
})
