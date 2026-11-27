// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/security-gate.test.ts — RED tests for the SecurityGate wiring unit
// (docs/specs/mcp-security-gate.md §2-§5). Imports from ../src/main/security.js.
// These tests are RED because SecurityGate is NOT exported yet (the primitives
// groupForTool/toolAllowed/defaultSecurityConfig/authorized/applyPatch exist,
// but the class does not).
import { describe, it, expect } from 'vitest'
import {
  SecurityGate,
  groupForTool,
  type GroupRule,
  type SecurityConfig,
  type ToolGroup,
} from '../src/main/security.js'
import { TOOL_GROUP_IDS } from '../src/shared/types.js'

describe('SecurityGate — construction & defaults (§2, §3)', () => {
  it('defaults to enabled {read,dispatch}, token null', () => {
    const g = new SecurityGate()
    expect(g.config.token).toBeNull()
    expect(g.enabled).toBeInstanceOf(Set)
    expect(g.enabled.has('read')).toBe(true)
    expect(g.enabled.has('dispatch')).toBe(true)
  })

  it('.enabled ⊇ {read,dispatch}, excludes graph/code', () => {
    const g = new SecurityGate()
    expect(g.enabled.has('read')).toBe(true)
    expect(g.enabled.has('dispatch')).toBe(true)
    expect(g.enabled.has('graph')).toBe(false)
    expect(g.enabled.has('code')).toBe(false)
  })

  it('new SecurityGate(config) copies the caller config (no aliasing)', () => {
    const caller: SecurityConfig = { token: 's', enabled: ['read', 'code'] }
    const g = new SecurityGate(caller)
    caller.token = 'mutated'
    caller.enabled.push('graph')
    expect(g.config.token).toBe('s')
    expect(g.config.enabled).toEqual(['read', 'code'])
    expect(g.enabled.has('code')).toBe(true)
    expect(g.enabled.has('graph')).toBe(false)
  })
})

describe('SecurityGate.checkRequest — spec §3, §5', () => {
  it('no token ⇒ {ok:true} for any request', () => {
    const g = new SecurityGate()
    expect(g.checkRequest({})).toEqual({ ok: true })
    expect(g.checkRequest({ authorization: 'Bearer whatever' })).toEqual({ ok: true })
  })

  it('token set: Bearer <token> ⇒ {ok:true}', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    expect(g.checkRequest({ authorization: 'Bearer s' })).toEqual({ ok: true })
  })

  it('token set: Bearer <wrong> ⇒ {ok:false, reason:"unauthorized"}', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    expect(g.checkRequest({ authorization: 'Bearer wrong' })).toEqual({
      ok: false,
      reason: 'unauthorized',
    })
  })

  it('array header value ⇒ {ok:false}, never throws', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    expect(() => g.checkRequest({ authorization: ['x'] })).not.toThrow()
    expect(g.checkRequest({ authorization: ['x'] })).toEqual({
      ok: false,
      reason: 'unauthorized',
    })
  })

  it('empty-string token case: mcp-token equal ⇒ ok', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    expect(g.checkRequest({ 'mcp-token': 's' })).toEqual({ ok: true })
  })
})

describe('SecurityGate.toolAllowed — spec §3, §5', () => {
  it('provident.dispatch ⇒ true under default', () => {
    expect(new SecurityGate().toolAllowed('provident.dispatch')).toBe(true)
  })

  it('provident.code.load ⇒ false under default', () => {
    expect(new SecurityGate().toolAllowed('provident.code.load')).toBe(false)
  })

  it('unknown tool ⇒ false', () => {
    expect(new SecurityGate().toolAllowed('provident.unknown')).toBe(false)
    expect(new SecurityGate().toolAllowed('nope')).toBe(false)
  })
})

describe('SecurityGate.apply — spec §3, §4, §5', () => {
  it('apply({groups:["code"]}) → new gate allows code.load; original still denies (purity)', () => {
    const g = new SecurityGate()
    const next = g.apply({ groups: ['code'] })
    expect(next).not.toBe(g)
    expect(next.toolAllowed('provident.code.load')).toBe(true)
    expect(g.toolAllowed('provident.code.load')).toBe(false)
  })

  it('apply({}) → different object, same config values', () => {
    const g = new SecurityGate()
    const next = g.apply({})
    expect(next).not.toBe(g)
    expect(next.config.token).toBe(g.config.token)
    expect(next.config.enabled).toEqual(g.config.enabled)
  })

  it('apply({token:""}) → config unchanged (empty token rejected)', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    const next = g.apply({ token: '' })
    expect(next.config.token).toBe('s')
    expect(next.config.enabled).toEqual(['read', 'dispatch'])
    expect(next).not.toBe(g)
  })

  it('apply never mutates the receiver', () => {
    const g = new SecurityGate()
    const original = { token: g.config.token, enabled: [...g.config.enabled] }
    g.apply({ groups: ['code'], token: 'x' })
    expect(g.config.token).toBe(original.token)
    expect(g.config.enabled).toEqual(original.enabled)
    expect(g.enabled.has('code')).toBe(false)
  })
})

describe('SecurityGate.config copy & immutability — spec §4, §5', () => {
  it('config getter returns a copy; mutating returned enabled array does not affect gate', () => {
    const g = new SecurityGate()
    g.config.enabled.push('code')
    expect(g.enabled.has('code')).toBe(false)
    expect(g.config.enabled).toEqual(['read', 'dispatch'])
  })

  it('two gates never share an enabled array reference', () => {
    const g1 = new SecurityGate()
    const g2 = new SecurityGate()
    expect(g1.config.enabled).not.toBe(g2.config.enabled)
    g1.config.enabled.push('graph')
    expect(g2.enabled.has('graph')).toBe(false)
    expect(g1.enabled.has('graph')).toBe(false)
  })

  it('apply result enabled array is not aliased to the source gate', () => {
    const g = new SecurityGate()
    const next = g.apply({})
    expect(next.config.enabled).not.toBe(g.config.enabled)
  })
})

describe('SecurityGate — adversarial hardening (F-gate, F-key)', () => {
  it('checkRequest(null) returns ok:false, never throws (F-gate)', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    const r = g.checkRequest(null as never)
    expect(r.ok).toBe(false)
  })

  it('checkRequest(undefined) returns ok:false, never throws (F-gate)', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    const r = g.checkRequest(undefined as never)
    expect(r.ok).toBe(false)
  })

  it('checkRequest({}) with no token is ok:true (F-gate)', () => {
    const g = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
    expect(g.checkRequest({})).toEqual({ ok: true })
  })

  it('normalizes uppercase header keys — Authorization vs authorization (F-key)', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    expect(g.checkRequest({ Authorization: 'Bearer s' } as never).ok).toBe(true)
    expect(g.checkRequest({ 'MCP-Token': 's' } as never).ok).toBe(true)
  })

  it('array authorization header never throws, ok:false (F1 regression)', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    expect(g.checkRequest({ authorization: ['Bearer s', 'x'] } as never).ok).toBe(false)
  })

  it('a header value that is a number never throws (F1 regression)', () => {
    const g = new SecurityGate({ token: 's', enabled: ['read', 'dispatch'] })
    expect(g.checkRequest({ authorization: 42 } as never).ok).toBe(false)
  })
})

describe('S-8 — the group domain is a RULE: a patch names a group iff the rule holds it, and a declared group is enableable', () => {
  /** A composed rule in the shape `composedGroupRule` answers: the foundation's own resolution plus one declared
   *  membership, and a set that is the registry's (the foundation's six plus the module's). */
  const rule: GroupRule = {
    groupOf: (name: string) => (name === 'module:matrix.answer' ? 'reporting' : groupForTool(name)),
    groups: () => [...TOOL_GROUP_IDS, 'reporting'],
  }

  it('accepts a DECLARED group — a group the old six-id literal never held — and refuses an unknown one WHOLE', () => {
    const g = new SecurityGate({ token: null, enabled: ['read'], groups: rule })
    const granted = g.apply({ groups: ['reporting'] })
    expect(granted.enabled.has('reporting'), 'the validator reads the rule, so a module-declared group is enableable').toBe(true)
    expect(granted.groupRule.groups(), 'and the set is the one it was handed, unchanged').toEqual([...TOOL_GROUP_IDS, 'reporting'])
    const refused = g.apply({ groups: ['no-such-group'] })
    expect(refused.config.enabled, 'a group the rule does not hold rejects the WHOLE patch — never a partial grant').toEqual(g.config.enabled)
  })

  it('CARRIES the rule across the apply and withExclusion re-constructions, the no-op arms included', () => {
    const g = new SecurityGate({ token: null, enabled: ['read', 'code'], groups: rule })
    for (const next of [g.withExclusion('mcp-enabled'), g.withExclusion('mcp-disabled'), g.apply({ token: null })]) {
      expect(next.groupRule.groups(), 'a re-construction that dropped the rule would lose every module group').toEqual([...TOOL_GROUP_IDS, 'reporting'])
    }
    expect(g.withExclusion('mcp-disabled').groupRule.groupOf('module:matrix.answer'), 'and the membership survives the same trip').toBe('reporting')
  })

  it('a bare gate measures the FOUNDATION six and no module group — stated, because a bare gate in a test is that gate', () => {
    const bare = new SecurityGate()
    expect(bare.groupRule.groups()).toEqual(TOOL_GROUP_IDS)
    expect(bare.groupRule.groupOf('module:matrix.answer'), 'the namespace default stands: a tool with no declared group is `module`').toBe('module')
  })
})
