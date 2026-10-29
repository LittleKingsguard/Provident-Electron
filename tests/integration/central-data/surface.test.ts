// tests/integration/central-data/surface.test.ts — THE L2 BATTERY for `central-data`, part 1:
// the five operations through `createDataSurface`.
//
// THE RED THIS FILE IS FILED WITH: `src/main/data/index.ts` does not exist, so the import below
// fails and every row here collects as an import error. That is the intended licence for
// implementation (D-1 §4), not a defect: no mock stands in for the subject, nothing is skipped,
// and no row is weakened to pass today.
//
// THE CONTRACT: docs/L2/central-data/interface.md §1-§3, §6 and the "integration battery's surface"
// table (rows 1-8); docs/L2/central-data/behaviour.md §1-§7. Each row is one goal → one expected
// answer, and each filesystem row owns a fresh directory under os.tmpdir().
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

/** The answers are read through a WIDENED local view so a row can name a member the declared
 *  union carries (`reason`, `entries`, …) without asserting anything beyond the declared shapes. */
interface Widened {
  status: string
  reason?: string
  message?: string
  path?: unknown
  prefix?: unknown
  kind?: string
  value?: unknown
  count?: number
  paths?: unknown[]
  from?: number
  through?: number
  floor?: number
  entries?: Array<{ cursor: number; kind: string; path: unknown; changedTo: string }>
  cursor?: unknown
  removed?: boolean
  tiers?: string[]
}
const widened = (answer: unknown): Widened => answer as Widened

const journalOf = (s: ReturnType<typeof createDataSurface>, args?: unknown): Widened =>
  widened(s.journal(args))

describe('central-data · the five operations through createDataSurface', () => {
  it('a first-ever profile is read → list {paths:[],count:0}, read {absent}, read [] {kind:"branch",value:{}}, journal {from:0,through:0,count:0}, and no profile file is created', () => {
    const s = createDataSurface({ profileDir })
    expect(s.list({})).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
    expect(s.list(undefined), 'interface §1 — an omitted `arguments` is the same call as `{}`').toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
    expect(s.read({ path: ['never'] })).toEqual({ status: 'absent', path: ['never'] })
    expect(s.read({ path: [] })).toEqual({ status: 'read', kind: 'branch', path: [], value: {} })
    const j = journalOf(s)
    expect(j.status).toBe('read')
    expect({ from: j.from, through: j.through, floor: j.floor, entries: j.entries, count: j.count })
      .toEqual({ from: 0, through: 0, floor: 0, entries: [], count: 0 })
    expect(existsSync(profilePath),
      'D-13 — the store is constructed at the first operation that NEEDS one, so a read-only profile costs no filesystem act: nothing stands at <profileDir>/provident-profile.json').toBe(false)
  })

  it('a row is written → write {committed, cursor:1} then read {kind:"row", value}; a second write serves the new value at cursor 2 with list.count unchanged', () => {
    const s = createDataSurface({ profileDir })
    expect(s.write({ path: ['alpha'], value: 'x' })).toEqual({ status: 'committed', path: ['alpha'], cursor: 1 })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
    expect(existsSync(profilePath), 'the first committed write is what creates the profile file').toBe(true)
    expect(s.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
    expect(s.write({ path: ['alpha'], value: { nested: [1, true] } })).toEqual({ status: 'committed', path: ['alpha'], cursor: 2 })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { nested: [1, true] } })
    expect(widened(s.list({})).count, 'a second write at the same path adds no row').toBe(1)
  })

  it('a write beneath a parent that does not stand → refused parent-absent and nothing lands; a write at [] → refused root-not-writable', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    const before = readFileSync(profilePath)
    const orphan = widened(s.write({ path: ['absent-parent', 'child'], value: 1 }))
    expect({ status: orphan.status, reason: orphan.reason }).toEqual({ status: 'refused', reason: 'parent-absent' })
    expect(s.write({ path: [], value: { whole: 'profile' } })).toMatchObject({ status: 'refused', reason: 'root-not-writable' })
    expect(s.read({ path: ['absent-parent', 'child'] })).toEqual({ status: 'absent', path: ['absent-parent', 'child'] })
    expect(readFileSync(profilePath).equals(before), 'a refusal leaves the profile\'s bytes exactly as they stood').toBe(true)
  })

  it('the process is re-entered → a second surface over the same profileDir serves the same read and the same list, and its own journal starts empty', () => {
    const first = createDataSurface({ profileDir })
    first.write({ path: ['alpha'], value: 'kept' })
    const second = createDataSurface({ profileDir })
    expect(second.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'kept' })
    expect(second.list({})).toEqual({ status: 'read', prefix: null, paths: [['alpha']], count: 1 })
    const j = journalOf(second)
    expect({ through: j.through, entries: j.entries, count: j.count },
      'D-12 — the change sequence is this process\'s own: a fresh surface\'s journal is empty even though the store booted from bytes').toEqual({ through: 0, entries: [], count: 0 })
  })

  it('a malformed write is driven → refused malformed-arguments naming the member, the previous row still served, its bytes unchanged', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    const before = readFileSync(profilePath)
    const missing = widened(s.write({ path: ['alpha'] }))
    expect({ status: missing.status, reason: missing.reason }).toEqual({ status: 'refused', reason: 'malformed-arguments' })
    expect(missing.message, 'the refused member is named in the message').toContain('value')
    const extra = widened(s.write({ path: ['alpha'], value: 'y', extra: 1 }))
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
        widened(s.write({ path: [spelling], value: 1 })),
        widened(s.read({ path: [spelling] })),
        widened(s.delete({ path: [spelling] })),
      ]) {
        expect({ status: answer.status, reason: answer.reason }, `the first segment \`${spelling}\` is refused as a volatile spelling`).toEqual({ status: 'refused', reason: 'volatile-path' })
      }
    }
    expect(s.list({}), 'a refused volatile attempt leaves list unmoved').toEqual(before)
    const text = readFileSync(profilePath, 'utf8')
    for (const spelling of ['mem.', 'temp.', 'secure.']) {
      expect(text.includes(spelling), `the profile's bytes carry no \`${spelling}\` spelling`).toBe(false)
    }
  })

  it('a delete is driven → removed:true with tiers naming "file" and cursor 2, then read {absent}; a delete of an absent row answers removed:false, cursor:null', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    expect(s.delete({ path: ['alpha'] })).toEqual({ status: 'committed', path: ['alpha'], removed: true, tiers: ['file'], cursor: 2 })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(widened(s.list({})).paths, 'the deleted row is gone from list').toEqual([])
    expect(s.delete({ path: ['beta'] }), 'the answer says no row was removed rather than claiming one').toEqual({ status: 'committed', path: ['beta'], removed: false, tiers: [], cursor: null })
    expect(widened(s.delete({ path: [] })), 'a one-call wipe of the whole profile has no reversal (D-12)').toMatchObject({ status: 'refused', reason: 'root-not-writable' })
  })

  it('the journal is driven from a cursor → the write then the delete in that order with their cursors, `from` echoes the cursor, and no answer carries a reversal', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    s.delete({ path: ['alpha'] })
    const all = journalOf(s)
    expect(all.entries).toEqual([
      { cursor: 1, kind: 'write', path: ['alpha'], changedTo: 'present' },
      { cursor: 2, kind: 'delete', path: ['alpha'], changedTo: 'absent' },
    ])
    expect(all.count).toBe(2)
    const afterOne = journalOf(s, { cursor: 1 })
    expect(afterOne.from, '`from` echoes the requested cursor').toBe(1)
    expect(afterOne.entries).toEqual([{ cursor: 2, kind: 'delete', path: ['alpha'], changedTo: 'absent' }])
    expect(afterOne.count).toBe(1)
    const blob = JSON.stringify([all, afterOne])
    expect(/undo|rollback|replay|revert|inverse|restore/i.test(blob), 'D-12 — no answer carries a reversal').toBe(false)
    for (const member of ['undo', 'rollback', 'replay', 'revert', 'inverse']) {
      expect((s as unknown as Record<string, unknown>)[member], `D-12 — no reversal entry point stands on this surface: ${member}`).toBeUndefined()
    }
  })

  it('a stale cursor is driven → refused cursor-unknown, with the window\'s own floor and through in the answer', () => {
    const s = createDataSurface({ profileDir })
    s.write({ path: ['alpha'], value: 'x' })
    const stale = journalOf(s, { cursor: 99 })
    expect({ status: stale.status, reason: stale.reason }).toEqual({ status: 'refused', reason: 'cursor-unknown' })
    expect(typeof stale.message, 'message is always present').toBe('string')
    expect({ floor: stale.floor, through: stale.through }, 'the refusal carries the window bounds so a caller re-anchors').toEqual({ floor: 0, through: 1 })
    expect(journalOf(s, { cursor: 'x' }), 'a cursor of the wrong type is a value, never a throw').toMatchObject({ status: 'refused', reason: 'malformed-arguments' })
  })
})
