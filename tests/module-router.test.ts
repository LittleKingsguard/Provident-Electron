// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/module-router.test.ts — RE-GRAINED to the SHIPPED realm half (unit `modularity`, L2 §3/§10,
// D-305/D-313): `src/renderer/extensions.ts`'s `CapabilityRouter` is now ONE registration frame in and
// ONE FIVE-MEMBER client ctx out, and the six members the old `ModuleCtx` carried (`captureView`,
// `onRender`, `emit`, `transform`, `uploadQueue`, `fetch`) retire WHOLE rather than being re-pointed
// (L2 §3, `D-231`, `D-305`). Every row below keeps its original SUBJECT and is re-grained to the member
// that now carries it (old row → new member is named in each `it`); no row is dropped and none is
// softened: a retired subject with no replacement is named as such and pinned as an ABSENCE, so an L4
// invention that puts the retired surface back fails here loudly.
//
// The class marker above stays: these rows report ON NOTICE (`D-30`), and the un-marking is L2's.
import { describe, it, expect } from 'vitest'
import { CapabilityRouter, type ClientHalfCtx } from '../src/renderer/extensions.js'

/** Capture the ctx a `client` half is handed, and the log sink the realm writes through (L2 §3's `log`). */
function capture(): { router: CapabilityRouter; ctx: () => ClientHalfCtx; lines: string[] } {
  const lines: string[] = []
  const router = new CapabilityRouter({ log: (line: string) => lines.push(line) })
  let seen: ClientHalfCtx | undefined
  router.registerModule('capture', (ctx: ClientHalfCtx) => {
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

const RETIRED = ['captureView', 'onRender', 'emit', 'transform', 'uploadQueue', 'fetch'] as const

describe('CapabilityRouter — ONE frame in, ONE five-member ctx out (L2 §3, D-305)', () => {
  it('RED — the router and its SEVEN realm members are exported, and the retired member set is absent', () => {
    expect(typeof CapabilityRouter).toBe('function')
    const router = new CapabilityRouter()
    // L3 `signatures.md` §3: the realm half's whole surface — no eighth door, and none of the old ones.
    for (const member of ['registerModule', 'modules', 'listeners', 'actions', 'contributions', 'fire', 'withdraw'] as const) {
      expect(typeof (router as unknown as Record<string, unknown>)[member]).toBe('function')
    }
    // Old rows 1/11/12/16 measured a TOOL table on this class; the tool table is main's (L2 §3, §11),
    // so a router that grows one back is an invention, not a delivery.
    for (const gone of ['hasTool', 'listTool', 'listTools', 'invokeTool', 'runHooks', 'applyTransforms', 'clear', 'setCaptureProvider']) {
      expect((router as unknown as Record<string, unknown>)[gone]).toBeUndefined()
    }
  })

  it('1. the ctx handed a client half is EXACTLY five members — and none of the six retired ones (old row 9/10 subject: a ctx member a module could call)', () => {
    const { ctx } = capture()
    const handed = ctx()
    expect(Object.keys(handed).sort()).toEqual(['action', 'graph', 'log', 'onDelivery', 'store'])
    for (const member of RETIRED) expect(member in handed).toBe(false)
    expect(typeof handed.store).toBe('object')
    for (const member of ['onDelivery', 'action', 'graph', 'log'] as const) expect(typeof handed[member]).toBe('function')
  })

  it('2. registerModule(name, fn) records the module under its OWN name — modules() is the registration set (old row 1: a registration under a namespaced name)', () => {
    const { router } = capture()
    expect(router.modules()).toEqual(['capture'])
    router.registerModule('other', () => {})
    expect(router.modules()).toEqual(['capture', 'other'])
  })

  it('3. action(name, fn) installs a NAMED ACTION: recorded by name, and the handler is a live closure NOT run at registration (old row 1/2: ctx.tool + its handler — C-10, D-313)', () => {
    const router = new CapabilityRouter()
    let calls = 0
    router.registerModule('capture', (ctx) => {
      ctx.action('screenshot', () => {
        calls += 1
        return 'shot'
      })
    })
    expect(router.actions()).toEqual([{ module: 'capture', name: 'screenshot' }])
    // dispatch is the ENGINE's act at call time, not this file's: registration runs nothing.
    expect(calls).toBe(0)
  })

  it('4. the recorded action is DATA — `{module, name}` and no source text, which is the `transform` class the rebuild forbids (old row 6: ctx.transform(fn) → applyTransforms — D-231, C-10)', () => {
    const router = new CapabilityRouter()
    router.registerModule('format', (ctx) => {
      ctx.action('format', (fragment: unknown) => String(fragment).toUpperCase())
    })
    const [record] = router.actions()
    expect(record).toBeDefined()
    // a name→function table entry, never source text and never a fragment string (L2 §3's `action`).
    expect(Object.keys(record!).sort()).toEqual(['module', 'name'])
    expect(typeof record!.name).toBe('string')
    for (const value of Object.values(record!)) expect(typeof value).not.toBe('function')
  })

  it('5. onDelivery(key, fn) mints ONE handle per (module, key) — `module:<name>#<key>` — so the namespace holds across modules (old row 3: the ctx prepends the module name)', () => {
    const router = new CapabilityRouter()
    let mine: string | undefined
    let theirs: string | undefined
    router.registerModule('capture', (ctx) => {
      mine = ctx.onDelivery('thumb', () => {})
    })
    router.registerModule('other', (ctx) => {
      theirs = ctx.onDelivery('thumb', () => {})
    })
    expect(mine).toBe('module:capture#thumb')
    expect(theirs).toBe('module:other#thumb')
    // the SAME bare key in two modules is two disjoint handles, and no bare key is a handle.
    expect(mine).not.toBe(theirs)
    expect(router.listeners().map((record) => record.listener)).toEqual(['thumb', 'thumb'])
    expect(router.listeners().map((record) => record.module)).toEqual(['capture', 'other'])
  })

  it('6. fire(handle, data, address) delivers to the registered body with BOTH, and answers a VALUE — not the old `emit` promise (old row 10: ctx.emit returned a Promise)', () => {
    const router = new CapabilityRouter()
    let handle: string | undefined
    let got: { data: unknown; address: readonly string[] } | undefined
    router.registerModule('embed', (ctx) => {
      handle = ctx.onDelivery('render', (data, address) => {
        got = { data, address }
      })
    })
    const outcome = router.fire(handle!, { nodes: ['a', 'b'] }, ['panes', 'main', 'body'])
    expect(outcome).toEqual({ status: 'delivered', handle })
    // synchronous, and the payload the channel carried is what the body saw (§3, §9).
    expect(outcome).not.toBeInstanceOf(Promise)
    expect(got).toEqual({ data: { nodes: ['a', 'b'] }, address: ['panes', 'main', 'body'] })
  })

  it('7. fire on an unregistered handle is a REFUSED VALUE that names the handle — never a throw (old row 12: invokeTool on an unregistered tool threw)', () => {
    const router = new CapabilityRouter()
    const outcome = router.fire('module:nope#missing', {}, [])
    expect(outcome.status).toBe('refused')
    expect(outcome.handle).toBe('module:nope#missing')
    expect(typeof outcome.reason).toBe('string')
    expect(outcome.reason!.length).toBeGreaterThan(0)
  })

  it('8. a throwing listener body is CONTAINED — refused by its message, and other handles still deliver (old row 8: a throwing transform was contained; old row 13: a later hook still ran)', () => {
    const router = new CapabilityRouter()
    const delivered: string[] = []
    let bad: string | undefined
    let good: string | undefined
    router.registerModule('bad', (ctx) => {
      bad = ctx.onDelivery('render', () => {
        throw new Error('listener boom')
      })
    })
    router.registerModule('good', (ctx) => {
      good = ctx.onDelivery('render', () => {
        delivered.push('good')
      })
    })
    const refused = router.fire(bad!, {}, [])
    expect(refused.status).toBe('refused')
    expect(refused.reason).toBe('listener boom')
    expect(router.fire(good!, {}, [])).toEqual({ status: 'delivered', handle: good })
    expect(delivered).toEqual(['good'])
  })

  it('9. one module raising several listeners keeps REGISTRATION ORDER in listeners() (old row 5: multiple registrations ran in registration order)', () => {
    const router = new CapabilityRouter()
    router.registerModule('first', (ctx) => {
      ctx.onDelivery('render', () => {})
      ctx.onDelivery('thumb', () => {})
    })
    router.registerModule('second', (ctx) => {
      ctx.onDelivery('render', () => {})
    })
    expect(router.listeners().map((record) => `${record.module}:${record.listener}`)).toEqual([
      'first:render',
      'first:thumb',
      'second:render',
    ])
  })

  it('10. graph(contribution) records graph DATA in registration order with its parent id — the ordered pre-build point replaces the transform chain (old row 7: transforms composed in registration order — C-6, S-15)', () => {
    const router = new CapabilityRouter()
    let handleA: string | undefined
    let handleB: string | undefined
    router.registerModule('a', (ctx) => {
      handleA = ctx.graph({ parent: 'root', nodes: [{ id: 'menu' }] })
    })
    router.registerModule('b', (ctx) => {
      handleB = ctx.graph({ parent: 'menu', nodes: [{ id: 'submenu' }] })
    })
    expect(router.contributions().map((record) => `${record.module}:${record.contribution.parent}`)).toEqual([
      'a:root',
      'b:menu',
    ])
    // ONE handle per contribution, namespaced per module and per parent.
    expect(handleA).toBe('module:a#graph:root')
    expect(handleB).toBe('module:b#graph:menu')
  })

  it('11. the contribution is the caller\'s OWN value, carried by identity and holding no callable (old row 6/8: a fragment string passed through a function — the retired class)', () => {
    const router = new CapabilityRouter()
    const contribution = { parent: 'root', nodes: [{ id: 'menu', label: 'File' }] } as const
    router.registerModule('panes', (ctx) => {
      ctx.graph(contribution)
    })
    const recorded = router.contributions()[0]!
    expect(recorded.contribution).toBe(contribution)
    expect(typeof recorded.contribution.parent).toBe('string')
    for (const node of recorded.contribution.nodes) {
      for (const value of Object.values(node)) expect(typeof value).not.toBe('function')
    }
  })

  it('12. a module name with "." or ":" registers NOTHING and is REFUSED BY NAME through the log — never a throw (old row 14: names with "."/":" were rejected — F2 injectivity)', () => {
    const { router, lines } = capture()
    router.registerModule('a.b', () => {})
    router.registerModule('a:b', () => {})
    expect(router.modules()).toEqual(['capture'])
    expect(lines.filter((line) => line.includes('invalid name'))).toHaveLength(2)
    expect(lines.join('\n')).toContain('a.b')
    expect(lines.join('\n')).toContain('a:b')
  })

  it('13. a SECOND frame under a standing name adds no member and overwrites nothing (old row 15: a duplicate name was never a silent overwrite)', () => {
    const router = new CapabilityRouter()
    let first: string | undefined
    router.registerModule('dup', (ctx) => {
      first = ctx.onDelivery('one', () => {})
      ctx.action('one', () => '1')
    })
    router.registerModule('dup', (ctx) => {
      ctx.onDelivery('two', () => {})
      ctx.action('two', () => '2')
    })
    // ONE frame per module (L2 §9): the standing registration is intact and the second added nothing.
    expect(router.modules()).toEqual(['dup'])
    expect(router.listeners().map((record) => record.listener)).toEqual(['one'])
    expect(router.actions().map((record) => record.name)).toEqual(['one'])
    expect(router.fire(first!, {}, []).status).toBe('delivered')
  })

  it('14. the old row 16 subject — a non-function tool handler rejected at registration — has NO replacement on this half: `action` takes a live closure and its dispatch-time check is the engine\'s, so the row pins what the realm DOES own: a malformed entry is contained by NAME (D-105)', () => {
    const { router, lines } = capture()
    router.registerModule('broken', 'not a function at all')
    // contained as a VALUE in the log, never a throw across the install path, and no member recorded.
    expect(lines).toContain('entry-malformed')
    expect(router.modules()).toContain('broken')
    expect(router.actions()).toEqual([])
    expect(router.listeners()).toEqual([])
  })

  it('15. an entry that THROWS is contained by name (`entry-threw`) and the realm survives it (old row 8/13: a throwing hook never crashed the pass)', () => {
    const { router, lines } = capture()
    router.registerModule('thrower', () => {
      throw new Error('entry boom')
    })
    expect(lines).toContain('entry-threw')
    expect(() => router.fire('module:capture#never', {}, [])).not.toThrow()
  })

  it('16. ctx.store is the GIVEN writer by IDENTITY and every verb of it is what runs — the read the old captureView performed is a store verb the channel executes (old row 9: ctx.captureView(); L2 §10, D-311)', () => {
    type Writer = ClientHalfCtx['store']
    const writer = { read: () => 'the rendered fragment' } as unknown as Writer
    const router = new CapabilityRouter({ store: writer })
    let handed: ClientHalfCtx | undefined
    router.registerModule('capture', (ctx) => {
      handed = ctx
    })
    expect(handed!.store).toBe(writer)
    const surface = handed!.store as unknown as Record<string, () => unknown>
    expect(surface.read!()).toBe('the rendered fragment')
  })

  it('17. with NO writer handed, the NINE data verbs answer `no-store-host` and the SIX registration verbs `client-registration-refused`, each a RESOLVED value naming its own verb (L2 §3/§10, D-311)', async () => {
    const { ctx } = capture()
    const data = ['read', 'readLiteral', 'readTiered', 'rollback', 'write', 'delete', 'constraints', 'constraintOn', 'constraintOff']
    const registration = ['listen', 'unlisten', 'addConstraint', 'removeConstraint', 'register', 'removeListener']
    expect([...data, ...registration]).toHaveLength(15)
    const surface = ctx().store as unknown as Record<string, () => Promise<{ status: string; reason: string; subject: string; message: string }>>
    for (const verb of data) {
      const out = await surface[verb]!()
      expect(out.status).toBe('refused')
      expect(out.reason).toBe('no-store-host')
      expect(out.subject).toBe(verb)
      expect(out.message).toContain(verb)
    }
    for (const verb of registration) {
      const out = await surface[verb]!()
      expect(out.status).toBe('refused')
      expect(out.reason, 'the six registration verbs are the foundation\'s and the proxy refuses them by name').toBe('client-registration-refused')
      expect(out.subject).toBe(verb)
      expect(out.message).toContain(verb)
    }
  })

  it('18. withdraw(name) is the realm\'s inverse: the body stops delivering, the records go, an unknown name is `false` and never a throw', () => {
    const router = new CapabilityRouter()
    let handle: string | undefined
    router.registerModule('embed', (ctx) => {
      handle = ctx.onDelivery('render', () => {})
      ctx.action('render', () => {})
      ctx.graph({ parent: 'root', nodes: [] })
    })
    expect(router.withdraw('never-registered')).toBe(false)
    expect(router.withdraw('embed')).toBe(true)
    expect(router.modules()).toEqual([])
    expect(router.listeners()).toEqual([])
    expect(router.actions()).toEqual([])
    expect(router.contributions()).toEqual([])
    expect(router.fire(handle!, {}, []).status).toBe('refused')
  })
})
