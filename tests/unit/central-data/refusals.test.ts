// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/central-data/refusals.test.ts — refusals are values, and the previous bytes stay.
//
// Every row drives one declared guardrail: malformed arguments are refused by name with the
// previous bytes intact (`behaviour.md` §4; D-11), a volatile spelling is refused on read, write
// and delete with `list` unmoved and no volatile spelling in the profile's bytes (`behaviour.md`
// §7; D-13), the empty path is read-only (`interface.md` §1; D-12), a name that cannot be OCCUPIED
// answers `store-unreachable` on all five tools and no byte moves (`behaviour.md` §5, §9; ASM-L3-2),
// and no operation throws for any argument of any type (G1; `interface.md` §6). **BOTH
// unreachability rows were re-derived by D-80**: with `DataSurfaceOptions.store` required the surface
// cannot be stood without an instance, so the two arms are now measured on a LIVE store whose profile
// name stops being occupiable — the only way the product can reach them (see the describe block below).
//
// DISPOSITION UNDER THE READOUT (`interface.md` §2a; D-134, D-30, D-143) — FIVE BARE-VALUE SITES IN THIS FILE, ALL FIVE
// RE-GRAINED IN PLACE AND NONE RETIRED. Four are the LEAF node a passing read now answers, and each row's `value` moves
// to it and NOTHING ELSE does — the subject, the id and the marker stand: `RC-1` and `RC-2` the row a refused write left
// standing, at the row's first and its second malformed call; `RC-3` the row a refused whole-register write and delete
// left standing; `RC-4` the CONTROL of the cold-tier row, read before the profile's name goes — each of the four is
// `{_tier:'file', value:'x'}`, `file` being §1's default for a `write` that names no `tier`. **`RC-5` IS THE ONE SITE WHOSE
// CLAIM MOVES WITH THE SHAPE AND NOT ONLY ITS GRAIN**: the cold arm at `[]` — the same empty address under a name that no
// longer stands — answered a `read` BRANCH carrying `{}` this module composed, and it answers `absent` now, because no
// store answered it and this module spells no tier of its own to mint a node with (§2a; D-80, D-101). Every refusal
// ledger, status word, byte-equality assertion and every other answer this file drives stands exactly as filed — and no
// row is added, removed, skipped or softened: `RC-5`'s row still measures the WHOLE cold tier's answer set under a
// removed name, its absence included. **AND THE MARKER ABOVE STAYS** (`D-30`; D-134, D-143).

import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  expectRefusal,
  makeProfileDir,
  profileBytes,
  profileEntries,
  profileFilePath,
  PROFILE_FILE_NAME,
  removeProfileDir,
  surfaceAt,
} from './support/temp-profile'

const created: string[] = []

function newProfileDir(): string {
  const profileDir = makeProfileDir()
  created.push(profileDir)
  return profileDir
}

afterEach(() => {
  for (const profileDir of created.splice(0)) removeProfileDir(profileDir)
})

describe('malformed arguments are refused by name and change nothing', () => {
  it('names the absent value member and still serves the standing row', () => {
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    surface.write({ path: ['alpha'], value: 'x' })
    const bytes = profileBytes(profileDir)
    const ledger = expectRefusal(surface.write({ path: ['alpha'] }))
    expect(ledger.reason).toBe('malformed-arguments')
    expect(ledger.message).toContain('value')
    expect(profileBytes(profileDir)).toBe(bytes)
    // RC-1 — RE-GRAINED IN PLACE (§2a; §1's `file` default): the row the refused write left standing is the LEAF node.
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: { _tier: 'file', value: 'x' },
    })
  })

  it('names an own key outside the declared member set', () => {
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    surface.write({ path: ['alpha'], value: 'x' })
    const bytes = profileBytes(profileDir)
    const ledger = expectRefusal(surface.write({ path: ['alpha'], value: 'y', extra: 1 }))
    expect(ledger.reason).toBe('malformed-arguments')
    expect(ledger.message).toContain('extra')
    expect(profileBytes(profileDir)).toBe(bytes)
    // RC-2 — RE-GRAINED IN PLACE (§2a): the same LEAF node after the SECOND malformed call — the refused own key moved
    // neither the bytes above nor the node this row is served.
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: { _tier: 'file', value: 'x' },
    })
  })

  it('names the absent path member', () => {
    const surface = surfaceAt(newProfileDir())
    const ledger = expectRefusal(surface.read({}))
    expect(ledger.reason).toBe('malformed-arguments')
    expect(ledger.message).toContain('path')
  })

  it('refuses a path outside the domain and names the member', () => {
    const surface = surfaceAt(newProfileDir())
    const sparse: unknown[] = []
    sparse.length = 2
    sparse[1] = 'a'
    const paths: unknown[] = ['alpha', [0.5], [-1], [2 ** 53], sparse]
    for (const path of paths) {
      const read = expectRefusal(surface.read({ path }))
      expect(read.reason).toBe('malformed-arguments')
      expect(read.message).toContain('path')
      const write = expectRefusal(surface.write({ path, value: 1 }))
      expect(write.reason).toBe('malformed-arguments')
      expect(write.message).toContain('path')
      const removed = expectRefusal(surface.delete({ path }))
      expect(removed.reason).toBe('malformed-arguments')
      expect(removed.message).toContain('path')
    }
  })

  it('mints no cursor and moves no byte for a spread of malformed calls', () => {
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    surface.write({ path: ['alpha'], value: 'x' })
    const bytes = profileBytes(profileDir)
    const refused = [
      surface.read({ pth: ['alpha'] }),
      surface.write({ path: ['alpha'], value: 'y', extra: true }),
      surface.write({ path: ['alpha'] }),
      surface.delete({ path: [0.5] }),
      surface.list({ prefix: 42 }),
      surface.journal({ cursor: 'x' }),
    ]
    for (const answer of refused) expectRefusal(answer)
    expect(profileBytes(profileDir)).toBe(bytes)
    expect(surface.journal({})).toEqual({
      status: 'read',
      from: 0,
      through: 1,
      floor: 0,
      entries: [{ cursor: 1, kind: 'write', path: ['alpha'], changedTo: 'present' }],
      count: 1,
    })
  })
})

describe('a volatile spelling never lands in the profile', () => {
  const volatilePaths = [['mem.notes'], ['temp.scratch'], ['secure.token'], ['mem.notes', 'child', 0]]

  it('refuses read, write and delete at every volatile spelling and leaves list unmoved', () => {
    const surface = surfaceAt(newProfileDir())
    surface.write({ path: ['alpha'], value: 'x' })
    const listed = surface.list({})
    const journal = surface.journal({})
    for (const path of volatilePaths) {
      expect(expectRefusal(surface.read({ path })).reason).toBe('volatile-path')
      expect(expectRefusal(surface.write({ path, value: 'v' })).reason).toBe('volatile-path')
      expect(expectRefusal(surface.delete({ path })).reason).toBe('volatile-path')
    }
    expect(surface.list({})).toEqual(listed)
    expect(surface.journal({})).toEqual(journal)
  })

  it('carries no volatile spelling in the profile bytes and leaves them unchanged', () => {
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    surface.write({ path: ['alpha'], value: 'x' })
    const bytes = profileBytes(profileDir)
    for (const path of volatilePaths) {
      surface.read({ path })
      surface.write({ path, value: 'v' })
      surface.delete({ path })
    }
    const after = profileBytes(profileDir)
    expect(after).toBe(bytes)
    expect(after).not.toMatch(/mem\.|temp\.|secure\./)
  })

  it('refuses a volatile read on an empty profile and lands no byte', () => {
    // RE-DERIVED, D-80: the row asserted that the refusal created no FILE, which is a state the boot's own
    // construction forecloses. The claim the row owes is unchanged in kind — a refused volatile read creates
    // nothing — and it is now taken on both halves: nothing new in the directory, and the one name still empty.
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    expect(expectRefusal(surface.read({ path: ['mem.notes'] })).reason).toBe('volatile-path')
    expect(profileEntries(profileDir)).toEqual([PROFILE_FILE_NAME])
    expect(profileBytes(profileDir), 'and the name carries no byte: the refusal landed nothing').toBe('')
  })
})

describe('the empty path is readable and never writable', () => {
  it('refuses a whole-register write and delete and leaves the register intact', () => {
    const surface = surfaceAt(newProfileDir())
    surface.write({ path: ['alpha'], value: 'x' })
    expect(expectRefusal(surface.write({ path: [], value: 1 })).reason).toBe('root-not-writable')
    expect(expectRefusal(surface.delete({ path: [] })).reason).toBe('root-not-writable')
    // RC-3 — RE-GRAINED IN PLACE (§2a): the row both refused whole-register calls left standing is the LEAF node, and the
    // `list` below is unmoved: a refusal that never reached a store moved no node.
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: { _tier: 'file', value: 'x' },
    })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
  })
})

describe('a profile name that cannot be occupied answers store-unreachable on all five tools', () => {
  // **BOTH ROWS HERE WERE RE-DERIVED BY D-80, AND THE OLD SHAPES ARE GONE RATHER THAN RETIRED SILENTLY.** They used to
  // stand a surface on a directory it had never opened: one with an ABSENT parent (the cold tier, with the first
  // `write` where the surface's own construction could refuse) and one whose profile name was already a directory
  // (where the construction refused at the first operation that needed it). Neither state is expressible now: the
  // instance is REQUIRED, and a construction over an absent parent or over a directory standing at its `filePath`
  // throws `FilePathUnreachable` (measured 2026-11-02) — so a surface that needed to construct would not exist to
  // answer, and the boot, not the surface, is where that refusal would be raised (D-80).
  //
  // WHAT THE PRODUCT DOES HAVE, AND WHAT THESE ROWS NOW MEASURE, is the name stopping being occupiable UNDER A LIVE
  // STORE — a file removed, or replaced by a directory, between two operations. `readProfile` is taken at the top of
  // every operation and ahead of the store, so all five answer the reading's ledger while the store still holds the
  // rows it was given. Both rows are red if the reading ever stops gating the store: the standing row below would be
  // served, and the window below would answer entries.
  it('answers the cold tier — and no construction — where the profile name is REMOVED under the live store, and the next write re-creates it', () => {
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    surface.write({ path: ['alpha'], value: 'x' })
    // RC-4 — RE-GRAINED IN PLACE (§2a): the CONTROL — the row the store holds before the name goes — is the LEAF node,
    // and it is what makes the row below evidence: the same address answers a node now and an ABSENCE after the removal.
    expect(surface.read({ path: ['alpha'] }), 'the control: the store holds the row before the name goes').toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: { _tier: 'file', value: 'x' },
    })
    rmSync(profileFilePath(profileDir))
    // The reading is `absent`: the name does not stand and nothing forbids it. Every reading operation answers the
    // cold tier WITHOUT consulting the store — which is why the row above is not served even though the instance
    // still holds it (`behaviour.md` §9; ASM-L3-2).
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
    expect(surface.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    // RC-5 — RE-GRAINED IN PLACE AND ITS CLAIM MOVED WITH THE SHAPE (§2a; D-80, D-101): the cold arm at `[]` answers
    // `absent` at `[]` and mints no tier at all. The `read` BRANCH carrying `{}` was this module's own composition for an
    // address no store answered; the answered shape now states the absence the reading already took, so no node and no
    // tier crosses the boundary here — and the row's subject is unmoved: the WHOLE cold tier's answer set, the absence at
    // this address included.
    expect(surface.read({ path: [] }), 'RC-5 — the cold arm at []: an absence, no node and no tier').toEqual({ status: 'absent', path: [] })
    expect(surface.delete({ path: ['alpha'] })).toEqual({
      status: 'committed',
      path: ['alpha'],
      removed: false,
      tiers: [],
      cursor: null,
      repaired: false,
      log: [],
    })
    expect(surface.journal({}).status, 'the window is this process’s own and the reading gates it, not the store').toBe('read')
    // `behaviour.md` §9's last row, and the arm that replaced "the construction refuses at the first write": the
    // supplied store recreates its own file and saves the register it holds, so the row that was written before the
    // name went comes BACK with it. That is the declared behaviour of a live instance, not a repair by this module.
    expect(surface.write({ path: ['beta'], value: 'y' })).toMatchObject({ status: 'committed', path: ['beta'] })
    expect(existsSync(profileFilePath(profileDir)), 'the store’s own save is what brings the name back').toBe(true)
    expect(profileBytes(profileDir), 'and the bytes carry the register the instance held, not this module’s doing').toContain('alpha')
  })

  it('answers store-unreachable on all five where the profile name is replaced by a directory under the live store', () => {
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    surface.write({ path: ['alpha'], value: 'x' })
    const stood = profileBytes(profileDir)
    rmSync(profileFilePath(profileDir))
    mkdirSync(profileFilePath(profileDir))
    for (const answer of [
      surface.read({ path: ['alpha'] }),
      surface.write({ path: ['alpha'], value: 'x' }),
      surface.delete({ path: ['alpha'] }),
      surface.list({}),
    ]) {
      expect(expectRefusal(answer).reason).toBe('store-unreachable')
    }
    expect(expectRefusal(surface.journal({})).reason, '`journal` included: a window is not "empty" where the profile can never be built').toBe('store-unreachable')
    expect(profileEntries(profileDir), 'the directory standing at the name is untouched: no instance, no file, no byte').toEqual([PROFILE_FILE_NAME])
  })
})

describe('a refusal is a value and never a throw', () => {
  const classInstance = new (class Arguments {
    path = ['alpha']
    value = 1
  })()
  const cyclic: Record<string, unknown> = {}
  cyclic.self = cyclic
  const hostile: unknown[] = [
    undefined,
    null,
    42,
    'alpha',
    ['alpha'],
    () => 'alpha',
    classInstance,
    new Map([['path', ['alpha']]]),
    cyclic,
    new Proxy({ path: ['alpha'] }, {}),
  ]

  it('answers a declared status for every hostile argument of every operation', () => {
    const surface = surfaceAt(newProfileDir())
    const operations = [
      { name: 'read', allowed: ['read', 'absent', 'refused'], run: (args: unknown) => surface.read(args) },
      { name: 'write', allowed: ['committed', 'refused'], run: (args: unknown) => surface.write(args) },
      { name: 'delete', allowed: ['committed', 'refused'], run: (args: unknown) => surface.delete(args) },
      { name: 'list', allowed: ['read', 'refused'], run: (args: unknown) => surface.list(args) },
      { name: 'journal', allowed: ['read', 'refused'], run: (args: unknown) => surface.journal(args) },
    ]
    for (const args of hostile) {
      for (const operation of operations) {
        let answer: { status: string }
        try {
          answer = operation.run(args)
        } catch (error) {
          throw new Error(`${operation.name} threw for a hostile argument: ${String(error)}`)
        }
        expect(operation.allowed).toContain(answer.status)
        if (answer.status === 'refused') {
          const ledger = answer as { reason?: unknown; message?: unknown }
          expect(typeof ledger.reason).toBe('string')
          expect(typeof ledger.message).toBe('string')
        }
      }
    }
  })
})
