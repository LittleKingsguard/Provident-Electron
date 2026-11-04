// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/storeroom-surface.test.ts — THE STOREROOM IMPORT SEAM: what the app gets when it imports
// `provident-storeroom`, pinned so a version drift is a red row here rather than a surprise later.
//
// AUTHORED BEFORE `src/main/storeroom.ts` EXISTS (the gate-3 order: the red set is RUN and
// REPORTED first). The declared surface is the one the package's own `index.d.ts` carries and
// the one the 1.6.x review measured; every figure below is a LITERAL, not a derivation.
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'
import { storeCreate } from 'provident-storeroom'

import { createProfileStore, STOREROOM_DECLARED_SURFACE } from '../src/main/storeroom'

/**
 * The package types a constraint body's context as `unknown` (`index.d.ts`, `export type Constraint`),
 * so a typed consumer narrows it. This file reads two members and no more.
 */
type PairContext = { readonly value?: unknown; readonly tier?: unknown }
const ctxOf = (ctx: unknown): PairContext => ctx as PairContext

const MEMBERS = [
  'read',
  'readLiteral',
  'write',
  'delete',
  'rollback',
  'listen',
  'unlisten',
  'addConstraint',
  'constraintOn',
  'constraintOff',
  'constraints',
  'removeListener',
  'removeConstraint',
  'register',
] as const

const LOG_ENTRY_KEYS = ['kind', 'id', 'opId', 'message', 'state'] as const

function fresh() {
  return storeCreate({ journalLength: 400, listeners: [], constraints: [] })
}

describe('S-1 — the seam module is what the app imports', () => {
  it('S-1.1 — `src/main/storeroom.ts` exposes `createProfileStore` and the declared surface census', () => {
    expect(typeof createProfileStore).toBe('function')
    expect(STOREROOM_DECLARED_SURFACE.members).toEqual([...MEMBERS])
    expect(STOREROOM_DECLARED_SURFACE.memberCount).toBe(14)
  })

  it('S-1.3 — package.json pins the reviewed package, and the pin is a caret RANGE so a patch fix lands'
    + ' without a repo change', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as
      { dependencies: Record<string, string> }
    // **`1.9.3` IS THE PIN, AND THE PIN IS A CARET RANGE** — the release that makes the kernel's TWO instants
    // agree: the registration instant reads a returned outcome's `message` and `repair`, and a repair's return's
    // `ok`, as OWN members, exactly as the write's own evaluation reads them, so a member carried on a prototype
    // is a member neither instant reads — the divergence this repo filed as `ST-F1`, never patched here (`D-5`)
    // and discharged upstream at that release (`D-109`). The figure moves here for the reason the row states: the
    // pin follows the reviewed install, never the other way. **AND THE TWO MEMBER COUNTS ABOVE DID NOT MOVE WITH
    // IT** — `1.9.3` adds no name and no symbol, which is why `S-1.1` and `S-1.2` read the same fourteen (`D-109`).
    expect(pkg.dependencies['provident-storeroom']).toBe('^1.9.3')
  })

  it('S-1.2 — the store `createProfileStore` returns IS a storeroom store, member for member', () => {
    const store = createProfileStore()
    const own = Object.getOwnPropertyNames(store)
    expect(own).toEqual([...MEMBERS])
    expect(own).toHaveLength(14)
  })
})

describe('S-2 — the refused form is the four-member literal, and its `address` names the refused act', () => {
  it('S-2.1 — a refusal of the caller\'s OWN act names the caller\'s address', () => {
    const store = fresh()
    store.write(['q'], 'mem', 5)
    store.addConstraint({ address: ['q'], id: 'no-nine' }, (ctx) =>
      ctxOf(ctx).value === 9 ? { message: 'nine is refused at q' } : true,
    )
    let refusal: unknown = null
    try {
      store.write(['q'], 'mem', 9)
    } catch (e) {
      refusal = e
    }
    const form = refusal as {
      status: string
      message: string
      log: readonly Record<string, unknown>[]
      address: readonly (string | number)[]
    }
    expect(form).not.toBeNull()
    expect(Object.getOwnPropertyNames(form)).toEqual(['status', 'message', 'log', 'address'])
    expect(form.status).toBe('ConstraintPassRefused')
    expect(form.address).toEqual(['q'])
    // The refused value does not stand — the per-op floor is reached.
    expect(store.read(['q'])).toBe(5)
  })

  it('S-2.2 — a refusal crossed from a LISTENER names the listener\'s address, never the caller\'s, and the caller\'s own act stands', () => {
    const store = fresh()
    store.write(['b'], 'mem', 1)
    store.write(['a'], 'mem', 5)
    const w2 = store.write(['a'], 'mem', 7)
    // THE REGISTRATION EVALUATION IS A REAL ASK (host 4, the declared unjudged window): the
    // body also runs when the pair is registered, against the state the pair is registered AT.
    // A body that refuses unconditionally therefore refuses its own registration. The first
    // ask is admitted here so that the refusal under test is the DELIVERY's.
    let asks = 0
    store.addConstraint({ address: ['a'], id: 'no-five' }, (ctx) => {
      asks += 1
      if (asks === 1) return true
      return ctxOf(ctx).value === 5 ? { message: 'five is not admitted at a' } : true
    })
    store.listen('L', [['b']])
    store.register('L', () => {
      try {
        store.rollback(w2.op.opId)
      } catch {
        /* the raise's own answer is not this row's subject */
      }
    })
    let refusal: unknown = null
    try {
      store.write(['b'], 'mem', 2)
    } catch (e) {
      refusal = e
    }
    const form = refusal as { status: string; address: readonly (string | number)[] }
    expect(form).not.toBeNull()
    expect(form.status).toBe('ConstraintPassRefused')
    // THE DEF-AU PIN: the refusal names `a`, the listener's act — NOT `b`, the caller's.
    expect(form.address).toEqual(['a'])
    // ...and the caller's own admitted write to `b` therefore stands.
    expect(store.read(['b'])).toBe(2)
  })
})

describe('S-3 — the log entry is the five-key record, and its size is bounded', () => {
  it('S-3.1 — a log entry carries exactly `kind, id, opId, message, state` and NEVER a `seq` (D-65)', () => {
    const store = fresh()
    store.write(['q'], 'mem', 5)
    store.addConstraint({ address: ['q'], id: 'no-nine' }, (ctx) =>
      ctxOf(ctx).value === 9 ? { message: 'nine is refused at q' } : true,
    )
    let refusal: unknown = null
    try {
      store.write(['q'], 'mem', 9)
    } catch (e) {
      refusal = e
    }
    const log = (refusal as { log: readonly unknown[] }).log
    expect(log.length).toBeGreaterThan(0)
    for (const entry of log) {
      expect(Object.keys(entry as object)).toEqual([...LOG_ENTRY_KEYS])
      expect('seq' in (entry as object)).toBe(false)
    }
  })

  it('S-3.2 — a deep chain of throwing bodies keeps every log entry bounded (the DEF-AR pin: 196 chars at depth 28)', () => {
    const store = fresh()
    let depth = 0
    const N = 28
    // **THE RETURN IS ANNOTATED `true` BECAUSE `1.9.0` CLOSED THE BODY'S ARM SET**: at `1.7.0` a constraint body was
    // declared `(context: unknown) => unknown` and an inferred `boolean` assigned; `1.9.0` declares
    // `Constraint = (context: AttemptContext) => ConstraintOutcome`, whose pass arm is the LITERAL `true`, so a helper that
    // could return `false` no longer assigns. Nothing about the drive changes — this body has only ever returned `true`
    // on the arm that does not throw — and the widened return was the type's looseness, not the row's intent.
    const throwOnce = (): true => {
      depth += 1
      if (depth <= N) {
        try {
          store.write(['c', String(depth)], 'mem', depth)
        } catch {
          /* the inner refusal crosses as a throwable; its own answer is not this row's subject */
        }
        throw new Error('X'.repeat(1 << 16) + String(depth))
      }
      return true
    }
    store.addConstraint({ address: ['c'], id: 'c0' }, (ctx) => (ctxOf(ctx).value === 1 ? throwOnce() : true))
    let refusal: unknown = null
    try {
      store.write(['c', '0'], 'mem', 1)
    } catch (e) {
      refusal = e
    }
    const form = refusal as { status?: string; message?: string; log?: readonly { message?: string }[] }
    expect(form).not.toBeNull()
    const longest = Math.max(
      String(form.message ?? '').length,
      ...(form.log ?? []).map((e) => String(e.message ?? '').length),
    )
    // A serialisation of the inner throwable would be tens of thousands of characters; a
    // summary is hundreds. The ceiling is generous on purpose — it pins "bounded", not a number.
    expect(longest).toBeLessThan(4096)
  })
})
