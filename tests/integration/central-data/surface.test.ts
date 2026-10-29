// tests/integration/central-data/surface.test.ts — THE L2 BATTERY for `central-data`, part 1:
// the five operations through `createDataSurface`.
//
// THE CONTRACT: docs/L2/central-data/interface.md §1-§3, §6 and the "integration battery's
// surface" table (rows 1-8, with row 2's declared repair); docs/L2/central-data/behaviour.md
// §1-§7. Each row is one goal → one expected answer, and each filesystem row owns a fresh
// directory under os.tmpdir().
//
// EVERY ANSWER IS READ THROUGH THE DECLARED UNION (`interface.md` §2). No row widens the answer
// with a local view and no row casts it: the status word narrows the arm, and the members a row
// names are the members that arm declares — `floor`/`through` on the `cursor-unknown` ledger
// alone (§3). A refusal where the row needs an arm is a named FAILURE, never a skip. The
// subject is the real `createDataSurface` over the real store: no mock, no stub, no `todo`.
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createDataSurface } from '../../../src/main/data'

const PROFILE_FILE = 'provident-profile.json'

let profileDir: string
let profilePath: string

beforeEach(() => {
  profileDir = mkdtempSync(join(tmpdir(), 'central-data-surface-'))
  profilePath = join(profileDir, PROFILE_FILE)
})

afterEach(() => {
  rmSync(profileDir, { recursive: true, force: true })
})

const coldList = { status: 'read', prefix: null, paths: [], count: 0 } as const

describe('central-data · the five operations through createDataSurface', () => {
  it('a first-ever profile is read → list {paths:[],count:0}, read {absent}, read [] {kind:"branch",value:{}}, journal {from:0,through:0,count:0}, and no profile file is created', () => {
    const s = createDataSurface({ profileDir })
    expect(s.list({})).toEqual(coldList)
    expect(s.list(undefined), 'interface §1 — an omitted `arguments` is the same call as `{}`').toEqual(coldList)
    expect(s.read({ path: ['never'] })).toEqual({ status: 'absent', path: ['never'] })
    expect(s.read({ path: [] })).toEqual({ status: 'read', kind: 'branch', path: [], value: {} })
    const j = s.journal(undefined)
    if (j.status !== 'read') throw new Error(`the journal must answer a reading on a first-ever profile; it answered ${JSON.stringify(j)}`)
    expect({ from: j.from, through: j.through, floor: j.floor, entries: j.entries, count: j.count })
      .toEqual({ from: 0, through: 0, floor: 0, entries: [], count: 0 })
    expect(existsSync(profilePath),
      'D-13 — the store is constructed at the first operation that NEEDS one, so a read-only profile costs no filesystem act: nothing stands at <profileDir>/provident-profile.json').toBe(false)
  })

  it('a literal is written → write {committed, cursor:1} then read {kind:"row", value}; a second write serves the new value at cursor 2 with list.count unchanged', () => {
    const s = createDataSurface({ profileDir })
    expect(s.write({ path: ['alpha'], value: 'x' })).toEqual({ status: 'committed', path: ['alpha'], cursor: 1 })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
    expect(existsSync(profilePath), 'the first committed write is what creates the profile file').toBe(true)
    expect(s.list({}), 'a `row` is a literal standing at that exact address, so `list` names that one path').toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
    expect(s.write({ path: ['alpha'], value: 'y' })).toEqual({ status: 'committed', path: ['alpha'], cursor: 2 })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'y' })
    expect(s.list({}), 'a second write at the same path adds no row').toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
  })

  it('a container is written on its own fresh directory → write committed, read {kind:"branch", value}, list.count 2 naming the two leaf rows beneath it', () => {
    // THIS ROW OWNS A FRESH DIRECTORY: `beforeEach` has just created it and nothing has been
    // written through it, so the container meets an EMPTY register — never a literal standing
    // at the same address. That collision arm is nobody's assertion in this battery
    // (`interface.md` §"the integration battery's surface", row 2's repair), and no row
    // re-introduces it.
    const s = createDataSurface({ profileDir })
    expect(existsSync(profilePath), 'the fresh directory carries no profile file before the write').toBe(false)
    expect(s.write({ path: ['alpha'], value: { nested: [1, true] } })).toEqual({ status: 'committed', path: ['alpha'], cursor: 1 })
    expect(s.read({ path: ['alpha'] }), 'a container is a BRANCH, and the assembled value is served as it was written').toEqual({ status: 'read', kind: 'branch', path: ['alpha'], value: { nested: [1, true] } })
    expect(s.list({}), '`list` answers the paths that hold a ROW (ASM-L2-2): the two literals beneath the container, and never the branch itself').toEqual({
      status: 'read',
      prefix: null,
      paths: [['alpha', 'nested', 0], ['alpha', 'nested', 1]],
      count: 2,
    })
  })

  it('a write beneath a parent that does not stand → refused parent-absent and nothing lands; a write at [] → refused root-not-writable', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    const before = readFileSync(profilePath)
    const orphan = s.write({ path: ['absent-parent', 'child'], value: 1 })
    if (orphan.status !== 'refused') throw new Error(`a write beneath an absent parent must answer the ledger; it answered ${JSON.stringify(orphan)}`)
    expect({ status: orphan.status, reason: orphan.reason }).toEqual({ status: 'refused', reason: 'parent-absent' })
    expect(s.write({ path: [], value: { whole: 'profile' } }), 'no one-call write of the whole profile (D-12)').toMatchObject({ status: 'refused', reason: 'root-not-writable' })
    expect(s.read({ path: ['absent-parent', 'child'] })).toEqual({ status: 'absent', path: ['absent-parent', 'child'] })
    expect(readFileSync(profilePath).equals(before), 'a refusal leaves the profile\'s bytes exactly as they stood').toBe(true)
  })

  it('the process is re-entered → a second surface over the same profileDir serves the same read and the same list, and its own journal starts empty', () => {
    const first = createDataSurface({ profileDir })
    first.write({ path: ['alpha'], value: 'kept' })
    const second = createDataSurface({ profileDir })
    expect(second.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'kept' })
    expect(second.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
    const j = second.journal({})
    if (j.status !== 'read') throw new Error(`a fresh surface's journal must answer a reading; it answered ${JSON.stringify(j)}`)
    expect({ through: j.through, entries: j.entries, count: j.count },
      'D-12 — the change sequence is this process\'s own: a fresh surface\'s journal is empty even though the store booted from bytes').toEqual({ through: 0, entries: [], count: 0 })
  })

  it('a malformed write is driven → refused malformed-arguments naming the member, the previous row still served, its bytes unchanged', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    const before = readFileSync(profilePath)
    const missing = s.write({ path: ['alpha'] })
    if (missing.status !== 'refused') throw new Error(`a write carrying no \`value\` must answer the ledger; it answered ${JSON.stringify(missing)}`)
    expect({ status: missing.status, reason: missing.reason }).toEqual({ status: 'refused', reason: 'malformed-arguments' })
    expect(missing.message, 'the refused member is named in the message').toContain('value')
    const extra = s.write({ path: ['alpha'], value: 'y', extra: 1 })
    if (extra.status !== 'refused') throw new Error(`a write carrying an undeclared key must answer the ledger; it answered ${JSON.stringify(extra)}`)
    expect({ status: extra.status, reason: extra.reason }).toEqual({ status: 'refused', reason: 'malformed-arguments' })
    expect(extra.message, 'an own key outside the declared set is refused BY NAME, never ignored').toContain('extra')
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
    expect(readFileSync(profilePath).equals(before), 'a refused write moves no byte').toBe(true)
  })

  it('a volatile spelling is written, read and deleted → refused volatile-path each time, list unmoved, and no mem./temp./secure. spelling in the profile\'s bytes', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    const before = s.list({})
    for (const spelling of ['mem.cache', 'temp.scratch', 'secure.vault']) {
      for (const answer of [
        s.write({ path: [spelling], value: 1 }),
        s.read({ path: [spelling] }),
        s.delete({ path: [spelling] }),
      ]) {
        if (answer.status !== 'refused') throw new Error(`the spelling \`${spelling}\` must be refused as volatile; it answered ${JSON.stringify(answer)}`)
        expect({ status: answer.status, reason: answer.reason }, `the first segment \`${spelling}\` is refused as a volatile spelling`).toEqual({ status: 'refused', reason: 'volatile-path' })
      }
    }
    expect(s.list({}), 'a refused volatile attempt leaves list unmoved').toEqual(before)
    const text = readFileSync(profilePath, 'utf8')
    for (const spelling of ['mem.', 'temp.', 'secure.']) {
      expect(text.includes(spelling), `the profile's bytes carry no \`${spelling}\` spelling`).toBe(false)
    }
  })

  it('a delete is driven → removed:true with tiers naming "file" and cursor 2, then read {absent}; a delete of an absent address answers removed:false, tiers:[], cursor:null with no store refusal reaching the caller', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    expect(s.delete({ path: ['alpha'] })).toEqual({ status: 'committed', path: ['alpha'], removed: true, tiers: ['file'], cursor: 2 })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(s.list({}), 'the deleted row is gone from list').toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
    // `behaviour.md` §6 — where NO row stands at the address, the answer is the empty receipt:
    // never the store's own `AddressNotFound` served as an answer, as a `store-refused` ledger
    // or as a throw (exception §7 files the package side upstream, D-5).
    expect(s.delete({ path: ['beta'] }), 'the answer says no row was removed rather than claiming one, and names no tier and mints no cursor').toEqual({ status: 'committed', path: ['beta'], removed: false, tiers: [], cursor: null })
    expect(s.delete({ path: [] }), 'a one-call wipe of the whole profile has no reversal (D-12)').toMatchObject({ status: 'refused', reason: 'root-not-writable' })
  })

  it('the journal is driven from a cursor → the write then the delete in that order with their cursors, `from` echoes the cursor, and no answer carries a reversal', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    s.delete({ path: ['alpha'] })
    const all = s.journal({})
    if (all.status !== 'read') throw new Error(`the whole window must answer a reading; it answered ${JSON.stringify(all)}`)
    expect(all.entries).toEqual([
      { cursor: 1, kind: 'write', path: ['alpha'], changedTo: 'present' },
      { cursor: 2, kind: 'delete', path: ['alpha'], changedTo: 'absent' },
    ])
    expect(all.count).toBe(2)
    const afterOne = s.journal({ cursor: 1 })
    if (afterOne.status !== 'read') throw new Error(`the window from cursor 1 must answer a reading; it answered ${JSON.stringify(afterOne)}`)
    expect(afterOne.from, '`from` echoes the requested cursor').toBe(1)
    expect(afterOne.entries).toEqual([{ cursor: 2, kind: 'delete', path: ['alpha'], changedTo: 'absent' }])
    expect(afterOne.count).toBe(1)
    const blob = JSON.stringify([all, afterOne])
    expect(/undo|rollback|replay|revert|inverse|restore/i.test(blob), 'D-12 — no answer carries a reversal').toBe(false)
    for (const member of ['undo', 'rollback', 'replay', 'revert', 'inverse']) {
      expect((s as unknown as Record<string, unknown>)[member], `D-12 — no reversal entry point stands on this surface: ${member}`).toBeUndefined()
    }
  })

  it('a stale cursor is driven → refused cursor-unknown, with the window\'s own floor and through read through the DECLARED ledger members', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    // THE DECLARED READING OF THE STALE CURSOR (`interface.md` §2/§3): the answer's own status
    // word narrows it to the `DataLedger` arm, and `floor`/`through` are that arm's declared
    // optional members — no widened local view, no cast, and no member the union does not carry.
    const stale = s.journal({ cursor: 99 })
    if (stale.status !== 'refused') throw new Error(`a cursor beyond the retained window must answer the ledger; it answered ${JSON.stringify(stale)}`)
    expect(stale.reason).toBe('cursor-unknown')
    expect(typeof stale.message, 'message is always present on every arm').toBe('string')
    expect({ floor: stale.floor, through: stale.through }, 'the refusal carries the window bounds so a caller re-anchors').toEqual({ floor: 0, through: 1 })
    const wrongType = s.journal({ cursor: 'x' })
    if (wrongType.status !== 'refused') throw new Error(`a cursor of the wrong type must answer the ledger; it answered ${JSON.stringify(wrongType)}`)
    expect({ status: wrongType.status, reason: wrongType.reason }, 'a cursor of the wrong type is a value, never a throw').toEqual({ status: 'refused', reason: 'malformed-arguments' })
    expect({ floor: wrongType.floor, through: wrongType.through }, '§3 — the window bounds ride the `cursor-unknown` arm ALONE').toEqual({ floor: undefined, through: undefined })
  })
})
