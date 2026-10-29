// tests/integration/central-data/profile-file.test.ts — THE L2 BATTERY for `central-data`, part 3:
// persistence and the profile's bytes.
//
// THE CONTRACT: row 11 of the interface's battery table plus the written-name and restart clauses
// of docs/L2/central-data/persistence.md §1/§5/§6 and behaviour.md §3/§9 — including §9's TWO
// unreachability arms, which this file drives as two separate rows: a name that CANNOT be
// occupied refuses on all five tools, and an ABSENT directory stays the cold tier until a write
// is where the construction can refuse (ASM-L2-7).
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createDataSurface } from '../../../src/main/data'

const PROFILE_FILE = 'provident-profile.json'

let profileDir: string
let profilePath: string

beforeEach(() => {
  profileDir = mkdtempSync(join(tmpdir(), 'central-data-profile-'))
  profilePath = join(profileDir, PROFILE_FILE)
})

afterEach(() => {
  rmSync(profileDir, { recursive: true, force: true })
})

const widened = (answer: unknown): Record<string, unknown> => answer as Record<string, unknown>
const coldList = { status: 'read', prefix: null, paths: [], count: 0 }

describe('central-data · persistence and the profile\'s bytes', () => {
  it('the single written name → reading writes nothing; the first committed write creates provident-profile.json and no .tmp, lock or sidecar', () => {
    const s = createDataSurface({ profileDir })
    s.list({})
    s.read({ path: ['alpha'] })
    s.journal({})
    expect(readdirSync(profileDir), 'no filesystem act for a profile that is only read').toEqual([])
    s.write({ path: ['alpha'], value: 'x' })
    expect(readdirSync(profileDir), 'persistence §1 — exactly one written name').toEqual([PROFILE_FILE])
  })

  it('a profile seeded with the store\'s own empty image ({}) → list count 0, read absent, and the next write commits with the bytes then carrying that row', () => {
    writeFileSync(profilePath, '{}')
    const s = createDataSurface({ profileDir })
    expect(s.list({})).toEqual(coldList)
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(s.write({ path: ['alpha'], value: 'x' })).toMatchObject({ status: 'committed', path: ['alpha'] })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
    expect(readFileSync(profilePath, 'utf8').includes('alpha'), 'the bytes now describe the state the act left').toBe(true)
  })

  it('a foreign, unparsable profile image is seeded → list answers the cold tier and the next write replaces the bytes', () => {
    const foreign = 'this is not the store\'s image\n'
    writeFileSync(profilePath, foreign)
    const s = createDataSurface({ profileDir })
    const listed = widened(s.list({}))
    expect({ status: listed.status, paths: listed.paths, count: listed.count }, 'the cold tier answers, and the answer is a value rather than a throw').toEqual({ status: 'read', paths: [], count: 0 })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    const committed = widened(s.write({ path: ['alpha'], value: 'x' }))
    expect({ status: committed.status, path: committed.path }, 'the next committed write recovers by declaration, never by a repair of the bytes').toEqual({ status: 'committed', path: ['alpha'] })
    const text = readFileSync(profilePath, 'utf8')
    expect(text === foreign, 'the foreign image is replaced, not preserved').toBe(false)
    expect(text.includes('alpha')).toBe(true)
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
  })

  it('a profileDir whose construction refuses → store-unreachable on every tool and nothing created', () => {
    const blocked = join(profileDir, 'blocked')
    writeFileSync(blocked, 'not a directory')
    const s = createDataSurface({ profileDir: blocked })
    for (const answer of [
      widened(s.read({ path: ['alpha'] })),
      widened(s.write({ path: ['alpha'], value: 'x' })),
      widened(s.delete({ path: ['alpha'] })),
      widened(s.list({})),
      widened(s.journal({})),
    ]) {
      expect({ status: answer.status, reason: answer.reason }, 'behaviour §5 — a storeCreate that refuses answers store-unreachable and creates nothing').toEqual({ status: 'refused', reason: 'store-unreachable' })
      expect(typeof answer.message, 'message is always present').toBe('string')
    }
    expect(statSync(blocked).isFile(), 'the blocked path is untouched').toBe(true)
    expect(existsSync(join(blocked, PROFILE_FILE)), 'no instance, no file, no byte').toBe(false)
  })

  it('an ABSENT, writable profileDir → the cold tier on read/list/delete/journal, and the first write is where the construction refuses, creating nothing', () => {
    // `behaviour.md` §9 / ASM-L2-7 — THE OTHER UNREACHABILITY ARM, and it is NOT the arm above:
    // the profile's name does not stand and nothing forbids it, so the reading answers the cold
    // tier, and the WRITE is the act the construction can refuse. A row that read this as the
    // refusal arm (§5) would drop the cold reading; a row that read the refusal arm as the cold
    // tier would serve `absent` for a name no store can ever stand under (D-13).
    const absentDir = join(profileDir, 'not-yet')
    const s = createDataSurface({ profileDir: absentDir })
    expect(s.list({}), 'list answers the cold tier, not a refusal').toEqual(coldList)
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(s.read({ path: [] })).toEqual({ status: 'read', kind: 'branch', path: [], value: {} })
    expect(s.delete({ path: ['alpha'] }), 'the empty receipt §6 declares, reached without a store').toEqual({ status: 'committed', path: ['alpha'], removed: false, tiers: [], cursor: null })
    expect(widened(s.journal({})).status, 'journal is not "empty" where a store may yet stand — but it is not refused either: the name is merely absent').toBe('read')
    const built = widened(s.write({ path: ['alpha'], value: 'x' }))
    expect({ status: built.status, reason: built.reason }, 'the construction refuses at the first write, and the refusal is the reading\'s ledger').toEqual({ status: 'refused', reason: 'store-unreachable' })
    expect(existsSync(absentDir), 'no instance, no file, no byte — the module does not create the directory either').toBe(false)
    expect(readdirSync(profileDir), 'and the parent holds nothing new').toEqual([])
  })

  it('a file-tier delete stays deleted across a fresh surface → read {absent} and list count 0 after re-entry', () => {
    const first = createDataSurface({ profileDir })
    first.write({ path: ['alpha'], value: 'x' })
    expect(first.delete({ path: ['alpha'] })).toMatchObject({ status: 'committed', removed: true })
    const second = createDataSurface({ profileDir })
    expect(second.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(second.list({})).toEqual(coldList)
  })
})
