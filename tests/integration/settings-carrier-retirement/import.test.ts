// tests/integration/settings-carrier-retirement/import.test.ts — THE L2 BATTERY for
// `settings-carrier-retirement`, part 2: THE SECOND IMPORT-ONCE ARM, and the bytes it may not touch.
//
// THE CONTRACT: docs/L2/settings-carrier-retirement/behaviour.md §7 (the arm's red set, row by row)
// and §6 (the sha256 row L1 §8 `S-3` declares); persistence.md §2 (the boot is write-free), §3 (the
// JSON image) and §4 (the marker IS the absence of a record, so nothing writes one); interface.md §2
// (`AppStateAnswer`'s four members, including `legacy`'s fourth word `ASM-L2-1` and `unrepresentable`
// answered BY NAME); L1 `settings-carrier-retirement.md` §4 (the retired boot read's own validation,
// carried whole — `ASM-L2-7`) and §8 `S-3`/`S-4`/`S-5`/`S-6`.
//
// THIS FILE STANDS RED UNTIL THE IMPLEMENTATION EXISTS (`examiner.md` §3, D-1): `readAppState` and
// `writeAppState` are absent from `src/main/operator-settings/index.ts` at this head, so every row
// below fails on the first read it makes. Nothing is skipped and nothing is softened.
//
// WHAT THE SUBJECT IS. The real `createOperatorSettings` over a real profile directory the battery
// seeds itself, typed through a local transcription of `interface.md` §2 and cast to it
// (`as unknown as`) — typing the contract, never standing in for the module (`SUR-5` keeps the cast
// honest against the real member set). The retired file is the battery's own seed: it is written by
// the ROW, read once by the module's import arm, and never written, renamed, repaired or deleted by
// anything under test (persistence.md §4).
import { createHash } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import {
  createOperatorSettings,
  type OperatorSettingsListener,
  type OperatorSettingsPatch,
  type OperatorSettingsReceipt,
  type OperatorSettingsRecord,
} from '../../../src/main/operator-settings'

const OPERATOR_FILE = 'provident-operator-settings.json'
const RETIRED_FILE = 'provident-settings.json'

/** `interface.md` §2, transcribed: the row, the four-word diagnosis and the four-member answer. */
interface AppStateRow { name: string; value: unknown }
type AppStateLegacy = 'absent' | 'imported' | 'corrupt' | 'recorded'
interface AppStateAnswer {
  rows: AppStateRow[]
  legacy: AppStateLegacy
  unrepresentable: string[]
  storage: 'standing' | 'unreachable'
}

/** `interface.md` §2's `OperatorSettings`, whole. A literal here ON PURPOSE: a row that imported the
 *  retired file's name from the module could not assert that the module never writes it. */
interface OperatorSettingsWithAppState {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  subscribe(listener: OperatorSettingsListener): () => void
  readAppState(): AppStateAnswer
  writeAppState(rows: readonly AppStateRow[]): OperatorSettingsReceipt
}

/** Every profile this file creates, so no row leaks a directory into the machine. Each row asks for
 *  the directories it needs: most of them seed more than one profile (a valid arm beside a corrupt
 *  one, five non-object seeds in a loop), and a row that shared one directory would prove nothing. */
const scratch: string[] = []

afterEach(() => {
  while (scratch.length > 0) rmSync(scratch.pop() as string, { recursive: true, force: true })
})

const profile = (): string => {
  const dir = mkdtempSync(join(tmpdir(), 'settings-carrier-import-'))
  scratch.push(dir)
  return dir
}

const retiredPathOf = (dir: string): string => join(dir, RETIRED_FILE)
const seed = (dir: string, bytes: string): string => {
  const at = retiredPathOf(dir)
  writeFileSync(at, bytes)
  return at
}
const sha256 = (at: string): string => createHash('sha256').update(readFileSync(at)).digest('hex')

function instance(dir: string): OperatorSettingsWithAppState {
  return createOperatorSettings({ userDataDir: dir }) as unknown as OperatorSettingsWithAppState
}

function committed(receipt: OperatorSettingsReceipt): { status: 'committed'; cursor: number; opId: string } {
  if (receipt.status !== 'committed') throw new Error(`the row needs the committed arm; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

/** THE CORRUPT ANSWER, ASSERTED WHOLE, because `behaviour.md` §7 says every one of its arms answers
 *  the SAME one: no rows, no named row, the diagnosis, and a store that stands. */
function expectCorrupt(answer: AppStateAnswer, why: string): void {
  expect(answer, `the same corrupt answer for ${why}: no rows, no named row, nothing thrown (behaviour.md §7)`).toEqual({ rows: [], legacy: 'corrupt', unrepresentable: [], storage: 'standing' })
}

describe('settings-carrier-retirement · the second import-once arm, its six arms and the bytes it never writes', () => {
  it('IMP-1 · the absent arm: no retired file answers `absent` with no rows, and no byte is written (behaviour.md §7; persistence.md §2)', () => {
    const dir = profile()
    const settings = instance(dir)
    const answer = settings.readAppState()
    expect(answer, 'the cold answer over a profile holding no retired file').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })
    expect(existsSync(retiredPathOf(dir)), 'no retired name is created by the absent arm (L1 §8 S-4)').toBe(false)
    expect(readdirSync(dir), 'and the profile holds exactly the instance’s own file').toEqual([OPERATOR_FILE])
    expect(readFileSync(join(dir, OPERATOR_FILE)).length, 'the boot writes no byte: the instance file stands zero-length (persistence.md §2)').toBe(0)
  })

  it('IMP-2 · the valid arm: every `file.*` row lands verbatim under its own name, `schemaVersion` does not become a row, and the diagnosis is `imported` (behaviour.md §7; L1 §4)', () => {
    const dir = profile()
    seed(dir, '{"schemaVersion":"1","file.tabs.order":["a","b"],"file.settings.theme.token":"dark"}')
    const settings = instance(dir)
    const answer = settings.readAppState()
    expect(answer.legacy, 'a landed import is not a corruption: the diagnosis names the arm that ran (L1 §4)').toBe('imported')
    expect(answer.rows, 'both rows, verbatim, in the retired file’s own order (behaviour.md §2, §7)').toEqual([
      { name: 'file.tabs.order', value: ['a', 'b'] },
      { name: 'file.settings.theme.token', value: 'dark' },
    ])
    expect(answer.rows.map((row) => row.name), 'the `schemaVersion` stamp is the retired record’s format marker and is NOT carried as a row (L1 §4; D-13)').toEqual(['file.tabs.order', 'file.settings.theme.token'])
    expect(answer.rows.some((row) => row.name === 'schemaVersion'), 'so no `schemaVersion` row appears anywhere in the answer').toBe(false)
    expect(answer.unrepresentable, 'and nothing was named as uncarryable').toEqual([])
    expect(readFileSync(join(dir, OPERATOR_FILE)).length, 'the import writes no byte of its own: the rows stand in memory until an ordinary write supersedes them (persistence.md §2)').toBe(0)
  })

  it('IMP-3 · unparsable bytes answer the corrupt arm, throw nothing and leave the bytes byte-identical (behaviour.md §7; L1 §4)', () => {
    const dir = profile()
    const bytes = '{"schemaVersion":"1","file.tabs.order":["a","b"],'
    const at = seed(dir, bytes)
    const before = sha256(at)
    const settings = instance(dir)
    expectCorrupt(settings.readAppState(), 'unparsable bytes')
    expect(readFileSync(at, 'utf8'), 'the seed’s bytes stand exactly as seeded — read once, never repaired (persistence.md §4)').toBe(bytes)
    expect(sha256(at), 'and their digest is unmoved').toBe(before)
  })

  it('IMP-4 · a non-object seed answers the same corrupt arm, throws nothing and leaves the bytes (behaviour.md §7)', () => {
    const seeds = ['[1,2]', '"x"', '7', 'true', 'null']
    for (const bytes of seeds) {
      const dir = profile()
      const at = seed(dir, bytes)
      const before = sha256(at)
      const settings = instance(dir)
      expectCorrupt(settings.readAppState(), `the non-object seed ${bytes}`)
      expect(readFileSync(at, 'utf8'), `the seed ${bytes} is untouched`).toBe(bytes)
      expect(sha256(at), `and the digest of ${bytes} is unmoved`).toBe(before)
    }
  })

  it('IMP-5 · a foreign top-level key, a missing `schemaVersion` and an unknown stamp all answer the same corrupt arm: the import’s validation is the retired boot read’s own (behaviour.md §7 ASM-L2-7; L1 §4 ASM-3)', () => {
    const seeds = [
      { why: 'a foreign top-level key', bytes: '{"schemaVersion":"1","mine":1}' },
      { why: 'no `schemaVersion` member at all', bytes: '{"file.tabs.order":["a"]}' },
      { why: '`schemaVersion` `2`', bytes: '{"schemaVersion":"2","file.tabs.order":["a"]}' },
    ]
    for (const drive of seeds) {
      const dir = profile()
      const at = seed(dir, drive.bytes)
      const settings = instance(dir)
      expectCorrupt(settings.readAppState(), drive.why)
      expect(readFileSync(at, 'utf8'), `and ${drive.why} leaves the bytes as seeded`).toBe(drive.bytes)
    }
  })

  it('IMP-6 · a DIRECTORY at the retired path, and an unreadable file, answer the same corrupt arm and throw nothing (behaviour.md §7; L1 §4)', () => {
    const asDirectory = profile()
    mkdirSync(retiredPathOf(asDirectory))
    expectCorrupt(instance(asDirectory).readAppState(), 'a directory standing where the retired file would be')
    expect(existsSync(retiredPathOf(asDirectory)), 'the directory is left standing: the arm deletes nothing (persistence.md §4)').toBe(true)

    const unreadable = profile()
    const at = seed(unreadable, '{"schemaVersion":"1","file.tabs.order":["a"]}')
    chmodSync(at, 0o000)
    try {
      expectCorrupt(instance(unreadable).readAppState(), 'a retired file the process cannot read')
    } finally {
      chmodSync(at, 0o644)
    }
    expect(readFileSync(at, 'utf8'), 'and the unreadable seed’s bytes stand as they were written').toBe('{"schemaVersion":"1","file.tabs.order":["a"]}')
  })

  it('IMP-7 · a `null`-carrying row is answered BY NAME in `unrepresentable` while its sibling imports: never silently dropped (behaviour.md §7; L1 §4)', () => {
    const dir = profile()
    seed(dir, '{"schemaVersion":"1","file.tabs.order":null,"file.layout.dock":"left"}')
    const settings = instance(dir)
    const answer = settings.readAppState()

    expect(answer.rows, 'the carryable row imports verbatim under its own name').toEqual([{ name: 'file.layout.dock', value: 'left' }])
    expect(answer.rows.some((row) => row.name === 'file.tabs.order'), 'and the uncarryable row is not in `rows` at all: `null` is the one member JSON can spell and the store cannot (guide §10.1)').toBe(false)
    expect(answer.unrepresentable, 'it is answered BY NAME, exactly once — the operator’s row is never silently dropped').toEqual(['file.tabs.order'])
    expect(answer.legacy, 'the arm that ran is still the valid one: a named row is a partial import, not a corruption').toBe('imported')
  })

  it('IMP-8 · the retired file’s sha256 is identical after the boot and after three commits, over the valid arm and the corrupt arm alike (L1 §8 S-3; persistence.md §4; D-19’s precedent)', () => {
    const valid = profile()
    const validAt = seed(valid, '{"schemaVersion":"1","file.tabs.order":["a","b"],"file.layout.dock":"left"}')
    const validBefore = sha256(validAt)
    const settings = instance(valid)
    expect(settings.readAppState().legacy, 'the valid arm really ran, so the digest below is not a digest of an arm that never fired').toBe('imported')
    expect(sha256(validAt), 'the boot writes no byte of the retired file').toBe(validBefore)
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['c'] }]))
    committed(settings.writeAppState([{ name: 'file.layout.dock', value: 'right' }]))
    committed(settings.writeAppState([{ name: 'file.settings.theme.token', value: 'dark' }]))
    expect(sha256(validAt), 'and three commits later its digest is still the seed’s: the import writes no byte, at the boot or after it').toBe(validBefore)

    const corrupt = profile()
    const corruptAt = seed(corrupt, 'not json at all')
    const corruptBefore = sha256(corruptAt)
    const corruptSettings = instance(corrupt)
    expect(corruptSettings.readAppState().legacy, 'the corrupt arm really ran').toBe('corrupt')
    committed(corruptSettings.writeAppState([{ name: 'file.tabs.order', value: ['z'] }]))
    committed(corruptSettings.writeAppState([{ name: 'file.layout.dock', value: 'left' }]))
    committed(corruptSettings.writeAppState([{ name: 'file.layout.dock', value: 'right' }]))
    expect(sha256(corruptAt), 'the corrupt seed is not repaired, rewritten or deleted by three commits either (persistence.md §4)').toBe(corruptBefore)
  })

  it('IMP-9 · the marker is a RECORD, not a file: a second construction with nothing written between imports again, and one after a commit answers `recorded` and the committed rows (persistence.md §4; interface.md §2 ASM-L2-1)', () => {
    const dir = profile()
    const at = seed(dir, '{"schemaVersion":"1","file.tabs.order":["a","b"]}')
    const before = sha256(at)

    const first = instance(dir)
    const firstAnswer = first.readAppState()
    expect(firstAnswer.legacy, 'the first construction imported').toBe('imported')

    const second = instance(dir)
    const secondAnswer = second.readAppState()
    expect(secondAnswer.rows, 'nothing wrote a marker, so a second construction over the same directory imports again and answers the same rows').toEqual(firstAnswer.rows)
    expect(secondAnswer.legacy, 'and names the same arm: the record is the marker and no record stands (persistence.md §4)').toBe('imported')
    expect(sha256(at), 'the second boot wrote no byte of the retired file').toBe(before)

    committed(second.writeAppState([{ name: 'file.layout.dock', value: 'left' }]))
    const third = instance(dir)
    const thirdAnswer = third.readAppState()
    expect(thirdAnswer.legacy, 'a record now stands at the app-state address, so no import arm applies and the fourth word answers it (interface.md §2 ASM-L2-1)').toBe('recorded')
    expect(thirdAnswer.rows, 'and the third construction serves the COMMITTED rows, not the retired file’s: the record outranks the seed it superseded').toEqual([{ name: 'file.layout.dock', value: 'left' }])
    expect(sha256(at), 'the retired seed still stands exactly as seeded through all three constructions').toBe(before)
  })
})
