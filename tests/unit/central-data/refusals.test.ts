// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/central-data/refusals.test.ts — refusals are values, and the previous bytes stay.
//
// Every row drives one declared guardrail: malformed arguments are refused by name with the
// previous bytes intact (`behaviour.md` §4; D-11), a volatile spelling is refused on read, write
// and delete with `list` unmoved and no volatile spelling in the profile's bytes (`behaviour.md`
// §7; D-13), the empty path is read-only (`interface.md` §1; D-12), a profile whose store cannot
// be built answers `store-unreachable` and creates nothing (`behaviour.md` §5, §9; ASM-L3-2), and
// no operation throws for any argument of any type (G1; `interface.md` §6). Red until
// `src/main/data/` exists (D-1 §4).

import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { createDataSurface } from '../../../src/main/data'
import {
  expectRefusal,
  makeProfileDir,
  profileBytes,
  profileEntries,
  profileFilePath,
  PROFILE_FILE_NAME,
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

describe('malformed arguments are refused by name and change nothing', () => {
  it('names the absent value member and still serves the standing row', () => {
    const profileDir = newProfileDir()
    const surface = createDataSurface({ profileDir })
    surface.write({ path: ['alpha'], value: 'x' })
    const bytes = profileBytes(profileDir)
    const ledger = expectRefusal(surface.write({ path: ['alpha'] }))
    expect(ledger.reason).toBe('malformed-arguments')
    expect(ledger.message).toContain('value')
    expect(profileBytes(profileDir)).toBe(bytes)
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: 'x',
    })
  })

  it('names an own key outside the declared member set', () => {
    const profileDir = newProfileDir()
    const surface = createDataSurface({ profileDir })
    surface.write({ path: ['alpha'], value: 'x' })
    const bytes = profileBytes(profileDir)
    const ledger = expectRefusal(surface.write({ path: ['alpha'], value: 'y', extra: 1 }))
    expect(ledger.reason).toBe('malformed-arguments')
    expect(ledger.message).toContain('extra')
    expect(profileBytes(profileDir)).toBe(bytes)
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: 'x',
    })
  })

  it('names the absent path member', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    const ledger = expectRefusal(surface.read({}))
    expect(ledger.reason).toBe('malformed-arguments')
    expect(ledger.message).toContain('path')
  })

  it('refuses a path outside the domain and names the member', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
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
    const surface = createDataSurface({ profileDir })
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
    const surface = createDataSurface({ profileDir: newProfileDir() })
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
    const surface = createDataSurface({ profileDir })
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

  it('refuses a volatile read on a cold profile and creates no file', () => {
    const profileDir = newProfileDir()
    const surface = createDataSurface({ profileDir })
    expect(expectRefusal(surface.read({ path: ['mem.notes'] })).reason).toBe('volatile-path')
    expect(profileEntries(profileDir)).toEqual([])
  })
})

describe('the empty path is readable and never writable', () => {
  it('refuses a whole-register write and delete and leaves the register intact', () => {
    const surface = createDataSurface({ profileDir: newProfileDir() })
    surface.write({ path: ['alpha'], value: 'x' })
    expect(expectRefusal(surface.write({ path: [], value: 1 })).reason).toBe('root-not-writable')
    expect(expectRefusal(surface.delete({ path: [] })).reason).toBe('root-not-writable')
    expect(surface.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: 'x',
    })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
  })
})

describe('a profile whose store cannot be built answers store-unreachable', () => {
  it('answers the cold tier where the directory is absent and store-unreachable for write', () => {
    const profileDir = join(newProfileDir(), 'absent')
    const surface = createDataSurface({ profileDir })
    expect(surface.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
    expect(surface.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(surface.delete({ path: ['alpha'] })).toEqual({
      status: 'committed',
      path: ['alpha'],
      removed: false,
      tiers: [],
      cursor: null,
    })
    expect(expectRefusal(surface.write({ path: ['alpha'], value: 'x' })).reason).toBe(
      'store-unreachable',
    )
    expect(existsSync(profileDir)).toBe(false)
  })

  it('answers store-unreachable where the profile name is occupied but cannot be built', () => {
    const profileDir = newProfileDir()
    mkdirSync(profileFilePath(profileDir))
    const surface = createDataSurface({ profileDir })
    for (const answer of [
      surface.read({ path: ['alpha'] }),
      surface.write({ path: ['alpha'], value: 'x' }),
      surface.delete({ path: ['alpha'] }),
      surface.list({}),
    ]) {
      expect(expectRefusal(answer).reason).toBe('store-unreachable')
    }
    expect(profileEntries(profileDir)).toEqual([PROFILE_FILE_NAME])
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
    const surface = createDataSurface({ profileDir: newProfileDir() })
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
