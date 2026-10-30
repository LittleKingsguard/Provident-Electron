// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/central-data/delete-and-journal.test.ts — the delete receipt and the change window.
//
// Every row drives one declared answer: a delete where a row stands removes it and mints a cursor
// (`behaviour.md` §6; D-11), a delete where no row stands — nothing there, or only rows beneath
// it — answers the empty receipt with no refusal and no throw (ASM-L2-6; G7), and the journal
// window is this process's own, minted from 1, with `cursor-unknown` carrying both bounds so a
// caller re-anchors (`persistence.md` §6; D-12). Red until `src/main/data/` exists (D-1 §4).

import { afterEach, describe, expect, it } from 'vitest'
import { createDataSurface } from '../../../src/main/data'
import { expectRefusal, makeProfileDir, removeProfileDir } from './support/temp-profile'

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
function threeCommits(): ReturnType<typeof createDataSurface> {
  const surface = createDataSurface({ profileDir: newProfileDir() })
  surface.write({ path: ['alpha'], value: 'x' })
  surface.write({ path: ['alpha'], value: 'y' })
  surface.delete({ path: ['alpha'] })
  return surface
}

describe('a delete names one row', () => {
  it('removes the row, answers tiers naming the file tier and mints the next cursor', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
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
    const surface = createDataSurface({ profileDir: newProfileDir() })
    surface.write({ path: ['alpha'], value: 'x' })
    const journal = surface.journal({})
    expect(surface.delete({ path: ['gamma'] })).toEqual({
      status: 'committed',
      path: ['gamma'],
      removed: false,
      tiers: [],
      cursor: null,
    })
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: 'x',
    })
    expect(surface.journal({})).toEqual(journal)
  })

  it('answers the empty receipt where only rows stand beneath the address and leaves them intact', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    surface.write({ path: ['alpha'], value: { nested: [1, true] } })
    expect(surface.delete({ path: ['alpha'] })).toEqual({
      status: 'committed',
      path: ['alpha'],
      removed: false,
      tiers: [],
      cursor: null,
    })
    expect(surface.read({ path: ['alpha', 'nested', 0] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha', 'nested', 0],
      value: 1,
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
