// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/central-data/delete-and-journal.test.ts — the delete receipt and the change window.
//
// Every row drives one declared answer: a delete where a row stands removes it and mints a cursor
// (`behaviour.md` §6; D-11), a delete where no row stands — nothing there, or only rows beneath
// it — answers the empty receipt with no refusal and no throw (ASM-L2-6; G7), and the journal
// window is this process's own, minted from 1, with `cursor-unknown` carrying both bounds so a
// caller re-anchors (`persistence.md` §6; D-12).
//
// DISPOSITION UNDER THE READOUT (`interface.md` §2a; D-134, D-30, D-143) — TWO BARE-VALUE SITES IN THIS FILE, BOTH
// RE-GRAINED IN PLACE AND NONE RETIRED. Each row's `value` moves to the release's node and NOTHING ELSE does — the
// subject, the id and the marker stand: `DJ-1` the row the empty-receipt row leaves standing is the LEAF
// `{_tier:'file', value:'x'}`, `file` being §1's default for a `write` that names no `tier`; `DJ-2` the element beneath
// the container that no delete removed is the LEAF `{_tier:'file', value:1}`, one node of the dense array node the write
// landed. Both rows are the CONTROL for a delete's own claim — that it removed what it named and nothing else — so
// neither measures the receipt, and neither receipt, `tiers`, `cursor`, `list` answer nor `journal` window moves.
// **AND THE MARKER ABOVE STAYS** (`D-30`): a bare value is the previous release's answer, not a pin with a shelf life
// (D-134, D-143).

import { afterEach, describe, expect, it } from 'vitest'
import {
  expectRefusal,
  makeProfileDir,
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

/** A write, a write over it and a delete of it: cursors 1, 2 and 3 (D-12). */
function threeCommits(): ReturnType<typeof surfaceAt> {
  const surface = surfaceAt(newProfileDir())
  surface.write({ path: ['alpha'], value: 'x' })
  surface.write({ path: ['alpha'], value: 'y' })
  surface.delete({ path: ['alpha'] })
  return surface
}

describe('a delete names one row', () => {
  it('removes the row, answers tiers naming the file tier and mints the next cursor', () => {
    const surface = surfaceAt(newProfileDir())
    surface.write({ path: ['alpha'], value: 'x' })
    const receipt = surface.delete({ path: ['alpha'] })
    if (receipt.status !== 'committed') throw new Error(`expected a receipt, got ${receipt.status}`)
    expect(receipt.path).toEqual(['alpha'])
    expect(receipt.removed).toBe(true)
    expect(receipt.tiers).toContain('file')
    expect(receipt.cursor).toBe(2)
    expect(surface.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
  })

  it('answers the empty receipt where no row stands, leaving the standing row and cursor alone', () => {
    const surface = surfaceAt(newProfileDir())
    surface.write({ path: ['alpha'], value: 'x' })
    const journal = surface.journal({})
    expect(surface.delete({ path: ['gamma'] })).toEqual({
      status: 'committed',
      path: ['gamma'],
      removed: false,
      tiers: [],
      cursor: null,
      repaired: false,
      log: [],
    })
    // DJ-1 — RE-GRAINED IN PLACE (§2a; §1's `file` default): the row the empty receipt left standing is the LEAF node
    // `{_tier, value}`, its one tier the tier of the version the read selected — the write named no `tier`, so `file`.
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: { _tier: 'file', value: 'x' },
    })
    expect(surface.journal({})).toEqual(journal)
  })

  it('answers the empty receipt where only rows stand beneath the address and leaves them intact', () => {
    const surface = surfaceAt(newProfileDir())
    surface.write({ path: ['alpha'], value: { nested: [1, true] } })
    expect(surface.delete({ path: ['alpha'] })).toEqual({
      status: 'committed',
      path: ['alpha'],
      removed: false,
      tiers: [],
      cursor: null,
      repaired: false,
      log: [],
    })
    // DJ-2 — RE-GRAINED IN PLACE (§2a): the element a delete of the address ABOVE it must leave intact is the LEAF node
    // `{_tier:'file', value:1}` — one node of the dense array node the write landed, never a bare literal.
    expect(surface.read({ path: ['alpha', 'nested', 0] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha', 'nested', 0],
      value: { _tier: 'file', value: 1 },
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
})

describe('the journal is this process\'s own window', () => {
  it('records every committed change, oldest first, with its cursor', () => {
    expect(threeCommits().journal({})).toEqual({
      status: 'read',
      from: 0,
      through: 3,
      floor: 0,
      entries: [
        { cursor: 1, kind: 'write', path: ['alpha'], changedTo: 'present' },
        { cursor: 2, kind: 'write', path: ['alpha'], changedTo: 'present' },
        { cursor: 3, kind: 'delete', path: ['alpha'], changedTo: 'absent' },
      ],
      count: 3,
    })
  })

  it('answers only the changes after a requested cursor and echoes that cursor', () => {
    expect(threeCommits().journal({ cursor: 2 })).toEqual({
      status: 'read',
      from: 2,
      through: 3,
      floor: 0,
      entries: [{ cursor: 3, kind: 'delete', path: ['alpha'], changedTo: 'absent' }],
      count: 1,
    })
  })

  it('answers an empty tail at the last minted cursor', () => {
    expect(threeCommits().journal({ cursor: 3 })).toEqual({
      status: 'read',
      from: 3,
      through: 3,
      floor: 0,
      entries: [],
      count: 0,
    })
  })

  it('refuses a cursor above the window carrying both bounds', () => {
    const ledger = expectRefusal(threeCommits().journal({ cursor: 99 }))
    expect(ledger.reason).toBe('cursor-unknown')
    expect(ledger.floor).toBe(0)
    expect(ledger.through).toBe(3)
  })

  it('refuses a wrong-typed or out-of-domain cursor as malformed arguments, never a throw', () => {
    const surface = threeCommits()
    for (const cursor of ['x', -1, 1.5, null]) {
      const ledger = expectRefusal(surface.journal({ cursor }))
      expect(ledger.reason).toBe('malformed-arguments')
      expect(ledger.floor).toBeUndefined()
      expect(ledger.through).toBeUndefined()
    }
    expect(surface.journal({}).status).toBe('read')
  })
})
