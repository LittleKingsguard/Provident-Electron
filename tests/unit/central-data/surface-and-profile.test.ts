// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/central-data/surface-and-profile.test.ts — the declared surface and the one written name.
//
// Every row drives one declared invariant: the surface is the five operations and five tool names
// in their declared order (`signatures.md` §1; `interface.md` §1, §2), nothing reverses (G4;
// D-12), the factory constructs no store and touches no file — the instance is the caller's and the
// option is REQUIRED, so it cannot reach one (`behaviour.md` §1; D-13, D-80) — exactly one name is
// ever written, and the boot's construction is what brings it into being —
// `<profileDir>/provident-profile.json` (`persistence.md` §1; G3), a
// fresh surface serves the same rows while its own journal starts empty (`behaviour.md` §3;
// D-12), and a `file`-tier delete stays deleted across a boot (`persistence.md` §5; guide §9.3).
// Red until `src/main/data/` exists (D-1 §4).

import { afterEach, describe, expect, it } from 'vitest'
import { DATA_TOOL_NAMES, type DataSurface } from '../../../src/main/data'
import {
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

describe('the declared surface', () => {
  it('names the five tools in their declared order', () => {
    expect(DATA_TOOL_NAMES).toEqual([
      'provident.data.read',
      'provident.data.write',
      'provident.data.delete',
      'provident.data.list',
      'provident.data.journal',
    ])
  })

  it('answers the five operations of the declared type', () => {
    const surface: DataSurface = surfaceAt(newProfileDir())
    for (const name of ['read', 'write', 'delete', 'list', 'journal'] as const) {
      expect(typeof surface[name]).toBe('function')
    }
  })

  it('nothing reverses: no reversal member on the surface and no such word in an answer', () => {
    const forbidden = /undo|rollback|replay|revert|inverse/i
    const surface = surfaceAt(newProfileDir())
    expect(Object.keys(surface).filter((name: string) => forbidden.test(name))).toEqual([])
    expect(DATA_TOOL_NAMES.filter((name: string) => forbidden.test(name))).toEqual([])
    const answers: unknown[] = [
      surface.list({}),
      surface.read({ path: ['alpha'] }),
      surface.write({ path: ['alpha'], value: 'x' }),
      surface.read({ path: ['alpha'] }),
      surface.read({ path: [] }),
      surface.delete({ path: ['alpha'] }),
      surface.delete({ path: ['gamma'] }),
      surface.journal({}),
      surface.journal({ cursor: 99 }),
      surface.write({ path: ['mem.notes'], value: 'v' }),
      surface.read({ path: ['mem.notes'] }),
      surface.delete({ path: [] }),
      surface.write({ path: ['alpha'] }),
    ]
    for (const answer of answers) expect(JSON.stringify(answer)).not.toMatch(forbidden)
  })
})

describe('the one written name', () => {
  it('constructs no store of its own: the boot’s one name stands at zero length and the surface adds nothing to it', () => {
    // RE-DERIVED, D-80. "Constructs no store and writes no file" was measured as an EMPTY directory, which the
    // surface's own lazy construction is what left behind. The boot constructs, so the directory holds its one name;
    // what the sentence still owes is that the SURFACE constructs nothing itself, and that is what is measured: the
    // name stands at zero length after the surface is stood, and standing the surface adds no second entry of any
    // kind. A construction reintroduced in `src/main/data/` would create a second file here — or, over the same
    // name, throw — and either way reddens this row.
    const profileDir = newProfileDir()
    surfaceAt(profileDir)
    expect(profileEntries(profileDir)).toEqual([PROFILE_FILE_NAME])
    expect(profileBytes(profileDir), 'and the one name holds no byte: the surface wrote nothing').toBe('')
  })

  it('holds exactly provident-profile.json after one committed write, and no byte beside it before', () => {
    const profileDir = newProfileDir()
    const surface = surfaceAt(profileDir)
    surface.list({})
    surface.read({ path: ['alpha'] })
    surface.journal({})
    // The one name stands from the boot's construction onward and carries no byte until a commit lands: that is the
    // "no sidecar before it" half, asserted on the bytes rather than on an empty listing (D-80).
    expect(profileEntries(profileDir), 'no `.tmp`, no lock and no sidecar after a read-only session').toEqual([PROFILE_FILE_NAME])
    expect(profileBytes(profileDir), 'and the name carries no byte yet').toBe('')
    expect(surface.write({ path: ['alpha'], value: 'x' })).toEqual({
      status: 'committed',
      path: ['alpha'],
      cursor: 1,
      repaired: false,
      log: [{ kind: 'commit', id: null, opId: expect.any(String), message: expect.any(String), state: null }],
    })
    expect(profileEntries(profileDir)).toEqual([PROFILE_FILE_NAME])
  })
})

describe('a fresh surface over the same profile', () => {
  it('serves the same rows and starts its own empty journal', () => {
    const profileDir = newProfileDir()
    const first = surfaceAt(profileDir)
    first.write({ path: ['alpha'], value: 'x' })
    first.write({ path: ['beta'], value: { nested: [1, true] } })
    const second = surfaceAt(profileDir)
    expect(second.read({ path: ['alpha'] })).toEqual({
      status: 'read',
      kind: 'row',
      path: ['alpha'],
      value: 'x',
    })
    expect(second.list({})).toEqual({
      status: 'read',
      prefix: null,
      paths: [
        ['alpha'],
        ['beta', 'nested', 0],
        ['beta', 'nested', 1],
      ],
      count: 3,
    })
    expect(second.journal({})).toEqual({
      status: 'read',
      from: 0,
      through: 0,
      floor: 0,
      entries: [],
      count: 0,
    })
  })

  it('serves a file-tier delete as deleted', () => {
    const profileDir = newProfileDir()
    const first = surfaceAt(profileDir)
    first.write({ path: ['alpha'], value: 'x' })
    const receipt = first.delete({ path: ['alpha'] })
    if (receipt.status !== 'committed') throw new Error(`expected a receipt, got ${receipt.status}`)
    expect(receipt.removed).toBe(true)
    const second = surfaceAt(profileDir)
    expect(second.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(second.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
  })
})
