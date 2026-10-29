// tests/unit/central-data/cold-and-write.test.ts — the cold tier and the write path.
//
// Every row drives the declared surface (`signatures.md` §1) and asserts one observable answer:
// a first-ever profile serves nothing and costs no filesystem act (`behaviour.md` §1; ASM-L3-2),
// a write commits through the store's `file` tier and is re-served (`behaviour.md` §2), a
// container write answers a branch and `list` answers the leaf rows beneath it (ASM-L2-2), and a
// nested write does not create its parent (guide §4; `behaviour.md` §2). Red until
// `src/main/data/` exists (D-1 §4).

import { afterEach, describe, expect, it } from 'vitest'
import { createDataSurface } from '../../../src/main/data'
import {
  expectRefusal,
  makeProfileDir,
  profileEntries,
  removeProfileDir,
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
    const surface = createDataSurface({ profileDir: newProfileDir() })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
  })

  it('answers read with absence, never an empty success', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    const path = ['window', 'tabs', 0, 'title']
    expect(surface.read({ path })).toEqual({ status: 'absent', path })
  })

  it('answers read at the empty path as the register branch holding nothing', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    expect(surface.read({ path: [] })).toEqual({
      status: 'read',
      kind: 'branch',
      path: [],
      value: {},
    })
  })

  it('answers delete with the empty receipt and no cursor', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    const path = ['alpha']
    expect(surface.delete({ path })).toEqual({
      status: 'committed',
      path,
      removed: false,
      tiers: [],
      cursor: null,
    })
  })

  it('answers journal with the empty window', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    expect(surface.journal({})).toEqual({
      status: 'read',
      from: 0,
      through: 0,
      floor: 0,
      entries: [],
      count: 0,
    })
  })

  it('creates no profile file across a read-only session', () => {
    const profileDir = newProfileDir()
    const surface = createDataSurface({ profileDir })
    surface.list({})
    surface.read({ path: ['alpha'] })
    surface.read({ path: [] })
    surface.delete({ path: ['alpha'] })
    surface.journal({})
    expect(profileEntries(profileDir)).toEqual([])
  })
})

describe('a write commits through the store and is re-served', () => {
  it('commits a literal row with cursor 1 and serves it back as a row', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    expect(surface.write({ path: ['alpha'], value: 'x' })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 1,
    })
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: 'x',
    })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
  })

  it('serves a second write at one path and leaves list.count unchanged', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    expect(surface.write({ path: ['alpha'], value: 'x' })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 1,
    })
    expect(surface.write({ path: ['alpha'], value: 'y' })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 2,
    })
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: 'y',
    })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
  })

  it('answers a container write as a branch and lists the leaf rows beneath it', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    expect(surface.write({ path: ['alpha'], value: { nested: [1, true] } })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 1,
    })
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'branch',
      path: ['alpha'],
      value: { nested: [1, true] },
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
    const surface = createDataSurface({ profileDir: newProfileDir() })
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
    const surface = createDataSurface({ profileDir: newProfileDir() })
    const ledger = expectRefusal(surface.write({ path: ['a', 'b'], value: 1 }))
    expect(ledger.reason).toBe('parent-absent')
    const path = ['a', 'b']
    expect(surface.read({ path })).toEqual({ status: 'absent', path })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
  })

  it('answers the whole register as a branch once rows stand', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    surface.write({ path: ['alpha'], value: 'x' })
    surface.write({ path: ['beta'], value: { nested: [1, true] } })
    expect(surface.read({ path: [] })).toEqual({
      status: 'read',
      kind: 'branch',
      path: [],
      value: { alpha: 'x', beta: { nested: [1, true] } },
    })
  })

  it('answers the value the store copied out, so a caller mutation is not served again', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    surface.write({ path: ['alpha'], value: { nested: [1, 2] } })
    const first = surface.read({ path: ['alpha'] })
    if (first.status !== 'read') throw new Error(`expected a reading, got ${first.status}`)
    const carried = first.value as { nested: number[] }
    carried.nested.push(3)
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'branch',
      path: ['alpha'],
      value: { nested: [1, 2] },
    })
  })
})
