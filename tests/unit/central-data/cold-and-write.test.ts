// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/central-data/cold-and-write.test.ts — the cold tier and the write path.
//
// Every row drives the declared surface (`signatures.md` §1) and asserts one observable answer:
// a first-ever profile's store serves nothing — the register is open and empty, never absent, which
// is the state the product has and the one D-80 re-derived this file onto (`behaviour.md` §1; ASM-L3-2),
// a write commits through the store's `file` tier and is re-served (`behaviour.md` §2), a
// container write answers a branch and `list` answers the leaf rows beneath it (ASM-L2-2), and a
// nested write does not create its parent (guide §4; `behaviour.md` §2).
//
// DISPOSITION UNDER THE READOUT (`interface.md` §2a; D-134, D-30, D-143) — SIX BARE-VALUE SITES IN THIS FILE, ALL SIX
// RE-GRAINED IN PLACE AND NONE RETIRED. The shape this unit adopts puts the release's own node where every passing `read`
// answer used to carry a bare `value`, so each row's `value` moves to that node and NOTHING ELSE does — the subject, the
// id and the marker stand: `CW-1` the OCCUPIED empty register answers the store's own `{_tier}` node, its one token read
// through the three-token domain and never pinned to one of them (§2a); `CW-2` and `CW-3` a written literal answers the LEAF
// `{_tier:'file', value}`, `file` being §1's default for a `write` that names no `tier`; `CW-4` a written container answers
// the OBJECT node with its members INLINE, the nested array as `{_tier, value:[…]}` and each element a node of its own;
// `CW-5` the WHOLE REGISTER is an OBJECT node too, its own `_tier` read through that domain and never pinned, its members
// the two rows' nodes; `CW-6` the copied-value row's container is that same OBJECT node, **AND ITS CAST IS FIXED RATHER
// THAN ITS TYPE** — the mutation probe moves ONTO the node's own `value` member and never through `unknown` back to the
// `{ nested: number[] }` shape the previous release answered, which no longer overlaps `DataReadNode` (TS2352).
// Every status word, `kind`, `path`, `list` answer, `journal` answer and refusal ledger stands exactly as filed. **AND
// THE MARKER ABOVE STAYS** (`D-30`): a bare value is no longer a pin with a shelf life but the previous release's own
// answer, which this tree can no longer give (D-134, D-143).

import { afterEach, describe, expect, it } from 'vitest'
import {
  expectRefusal,
  makeProfileDir,
  profileBytes,
  profileEntries,
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

describe('a first-ever profile reads cold', () => {
  it('answers list with the whole profile and no rows', () => {
    const surface = surfaceAt(newProfileDir())
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
  })

  it('answers read with absence, never an empty success', () => {
    const surface = surfaceAt(newProfileDir())
    const path = ['window', 'tabs', 0, 'title']
    expect(surface.read({ path })).toEqual({ status: 'absent', path })
  })

  it('answers read at the empty path as the register branch holding nothing', () => {
    const surface = surfaceAt(newProfileDir())
    // CW-1 — RE-GRAINED IN PLACE (§1, §2a; D-80, D-134): the occupied empty register is a BRANCH whose node is the
    // STORE's own — `{_tier}` ALONE, one token from the three and never a set, and never the `{}` this module used to
    // compose — and that token is read through the domain here rather than pinned to one of the three (§2a).
    expect(surface.read({ path: [] }), 'CW-1 — the occupied empty register answers the STORE’s own register node, `_tier` alone').toEqual({
      status: 'read',
      kind: 'branch',
      path: [],
      value: { _tier: expect.stringMatching(/^(file|mem|temp)$/) },
    })
  })

  it('answers delete with the empty receipt and no cursor', () => {
    const surface = surfaceAt(newProfileDir())
    const path = ['alpha']
    expect(surface.delete({ path })).toEqual({
      status: 'committed',
      path,
      removed: false,
      tiers: [],
      cursor: null,
      repaired: false,
      log: [],
    })
  })

  it('answers journal with the empty window', () => {
    const surface = surfaceAt(newProfileDir())
    expect(surface.journal({})).toEqual({
      status: 'read',
      from: 0,
      through: 0,
      floor: 0,
      entries: [],
      count: 0,
    })
  })

  it('writes no byte across a read-only session: the one name stands at zero length and holds no row', () => {
    // RE-DERIVED, D-80. This row asserted that a read-only session created NO PROFILE FILE, which held only while the
    // surface constructed on demand. The boot constructs the one instance and that construction creates the name
    // exclusively, so the claim the session still owes — and the one it always meant — is that nothing it does lands:
    // the name stands at zero length afterwards, which the construction alone produces and no read, list or delete moves.
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    surface.list({})
    surface.read({ path: ['alpha'] })
    surface.read({ path: [] })
    surface.delete({ path: ['alpha'] })
    surface.journal({})
    expect(profileEntries(profileDir), 'no `.tmp`, no lock and no sidecar beside the one name').toEqual([PROFILE_FILE_NAME])
    expect(profileBytes(profileDir), 'and the name still carries no byte: nothing this session drove landed').toBe('')
  })
})

describe('a write commits through the store and is re-served', () => {
  it('commits a literal row with cursor 1 and serves it back as a row', () => {
    const surface = surfaceAt(newProfileDir())
    expect(surface.write({ path: ['alpha'], value: 'x' })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 1,
      repaired: false,
      log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }],
    })
    // CW-2 — RE-GRAINED IN PLACE (§2a; §1's `file` default): a literal is the LEAF node `{_tier, value}`, its ONE tier
    // being the tier of the version the read selected — the write named no `tier`, so that is `file` — and `kind:'row'`
    // is compiled from that node being a leaf.
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: { _tier: 'file', value: 'x' },
    })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
  })

  it('serves a second write at one path and leaves list.count unchanged', () => {
    const surface = surfaceAt(newProfileDir())
    expect(surface.write({ path: ['alpha'], value: 'x' })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 1,
      repaired: false,
      log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }],
    })
    expect(surface.write({ path: ['alpha'], value: 'y' })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 2,
      repaired: false,
      log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }],
    })
    // CW-3 — RE-GRAINED IN PLACE (§2a): the SECOND write's version is the one this read selects, at its own `file`
    // tier, so the row still measures which version the read answers and not merely that some node arrived.
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: { _tier: 'file', value: 'y' },
    })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
  })

  it('answers a container write as a branch and lists the leaf rows beneath it', () => {
    const surface = surfaceAt(newProfileDir())
    expect(surface.write({ path: ['alpha'], value: { nested: [1, true] } })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 1,
      repaired: false,
      log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }],
    })
    // CW-4 — RE-GRAINED IN PLACE (§2a): the container is an OBJECT node with its member INLINE, that member is a
    // dense ARRAY node `{_tier, value:[…]}` in index order, and each element is its own LEAF node. Every token is `file`:
    // the write named no `tier` and no other version stands.
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'branch',
      path: ['alpha'],
      value: {
        _tier: 'file',
        nested: { _tier: 'file', value: [{ _tier: 'file', value: 1 }, { _tier: 'file', value: true }] },
      },
    })
    expect(surface.list({})).toEqual({
      status: 'read',
      prefix: null,
      paths: [
        ['alpha', 'nested', 0],
        ['alpha', 'nested', 1],
      ],
      count: 2,
    })
  })

  it('lists the leaf rows beneath a prefix and echoes that prefix', () => {
    const surface = surfaceAt(newProfileDir())
    surface.write({ path: ['alpha'], value: { nested: [1, true] } })
    expect(surface.list({ prefix: ['alpha'] })).toEqual({
      status: 'read',
      prefix: ['alpha'],
      paths: [
        ['alpha', 'nested', 0],
        ['alpha', 'nested', 1],
      ],
      count: 2,
    })
  })

  it('refuses a write beneath a parent that does not stand', () => {
    const surface = surfaceAt(newProfileDir())
    const ledger = expectRefusal(surface.write({ path: ['a', 'b'], value: 1 }))
    expect(ledger.reason).toBe('parent-absent')
    const path = ['a', 'b']
    expect(surface.read({ path })).toEqual({ status: 'absent', path })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
  })

  it('answers the whole register as a branch once rows stand', () => {
    const surface = surfaceAt(newProfileDir())
    surface.write({ path: ['alpha'], value: 'x' })
    surface.write({ path: ['beta'], value: { nested: [1, true] } })
    // CW-5 — RE-GRAINED IN PLACE (§2a): the register is an OBJECT node too — its members INLINE and each one the node
    // its row answers — and the register's OWN `_tier` is read through the three-token domain rather than pinned, the
    // anchor tier being the store's to answer and not this module's to spell (D-134, D-101).
    expect(surface.read({ path: [] })).toEqual({
      status: 'read',
      kind: 'branch',
      path: [],
      value: {
        _tier: expect.stringMatching(/^(file|mem|temp)$/),
        alpha: { _tier: 'file', value: 'x' },
        beta: { _tier: 'file', nested: { _tier: 'file', value: [{ _tier: 'file', value: 1 }, { _tier: 'file', value: true }] } },
      },
    })
  })

  it('answers the value the store copied out, so a caller mutation is not served again', () => {
    const surface = surfaceAt(newProfileDir())
    surface.write({ path: ['alpha'], value: { nested: [1, 2] } })
    const first = surface.read({ path: ['alpha'] })
    if (first.status !== 'read') throw new Error(`expected a reading, got ${first.status}`)
    // CW-6 — RE-GRAINED IN PLACE, AND THE CAST IS FIXED RATHER THAN THE TYPE (§2a; D-134). The answer's `value` is the
    // release's node — here the OBJECT `{_tier, nested:{_tier, value:[…]}}` — so the mutation probe moves ONTO that
    // node's own members; a cast through `unknown` back to `{ nested: number[] }` would keep the previous release's shape
    // and is not what this row may do. The optionals are what a conversion against the release's three-arm union admits,
    // so the two probes around the push are what keep the row from passing vacuously: the mutation must LAND on the node
    // the answer carried, and the store's next answer must be unmoved by it.
    const carried = first.value as { nested?: { _tier?: string; value?: { _tier?: string; value?: number }[] } }
    const list = carried.nested?.value
    expect(list?.map((element) => element.value), 'CW-6 — the array node carries its elements as nodes of their own (§2a)').toEqual([1, 2])
    list?.push({ _tier: 'file', value: 3 })
    expect(list?.map((element) => element.value), 'CW-6 — and the caller’s mutation LANDED on the node the answer carried').toEqual([1, 2, 3])
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'branch',
      path: ['alpha'],
      value: {
        _tier: 'file',
        nested: { _tier: 'file', value: [{ _tier: 'file', value: 1 }, { _tier: 'file', value: 2 }] },
      },
    })
  })
})
