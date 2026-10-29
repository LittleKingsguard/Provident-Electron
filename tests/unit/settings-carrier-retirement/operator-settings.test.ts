// tests/unit/settings-carrier-retirement/operator-settings.test.ts — THE L3 UNIT BATTERY for E-2,
// `src/main/operator-settings/index.ts` AT UNIT GRAIN: the third durable address, the two verbs that
// serve it, the second import-once arm, and the module's own `fs` census.
//
// THE CONTRACT (L3): docs/L3/settings-carrier-retirement/signatures.md §2 (the declared surface — two
// value names added and no name dropped, the product's member set), §3 (the private names and their
// discipline: the retired name spelled once in `src/**`, the module's two `readFileSync` reads,
// `NO_IMPORT`'s own array never served) and §1 (the file layout, E-2). docs/L3/settings-carrier-
// retirement/design.md §2 (the third address, the `{rows}` value and the helper table), §2.1 (the two
// verbs' pseudocode, including why `null` is not pre-checked), §2.2 (`importAppStateOnce`'s arms and
// the caught error's own `code`), §5 (the guardrails L4 must land) and §6 (`ASM-1`…`ASM-5`). Read on
// docs/L2/settings-carrier-retirement/interface.md §1/§2/§6/§7, behaviour.md §1/§2/§7,
// persistence.md §1/§3/§4/§8, and docs/L1/settings-carrier-retirement.md §4/§6.
//
// THIS FILE STANDS RED UNTIL THE IMPLEMENTATION EXISTS (examiner.md §3, D-1): `readAppState` and
// `writeAppState` are not members of the product at this head, so every row that drives them fails
// with `settings.readAppState is not a function`, and the two source-read rows fail on the census
// they pin (one `readFileSync` call site, and the retired name stands in the sibling's spelling
// rather than in this unit's). Nothing is skipped, softened or conditionally disabled, and no row
// stands in for the subject.
//
// THE GRAIN IS THE MODULE'S, NOT THE COMPOSITION'S. tests/integration/settings-carrier-retirement/
// drives the same verbs through the composition; this file pins what only this design declares — the
// ordered `{rows}` shape against a name→value map, the JSON image's two arms, the read-back skip
// rule, the caught-error discrimination between `absent` and `corrupt`, and the module's two-read
// `fs` census — so an invention at L4 fails here rather than in the L2 battery (examiner.md §2).
//
// HOW THE SUBJECT IS TYPED. `signatures.md` §2 is transcribed locally and the constructed product is
// cast to it (`as unknown as`). The object driven is the real `createOperatorSettings` over the real
// `provident-storeroom` instance on a real profile directory: no mock, no stub, no re-implementation.
// `OS-12` and `OS-13` keep the cast honest — one reads the module's own source census, the other the
// product's real member set at RUN TIME, so a missing member fails there rather than passing on a type.
import { createHash } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, describe, expect, it } from 'vitest'

import * as operatorSettingsModule from '../../../src/main/operator-settings'
import {
  createOperatorSettings,
  type OperatorSettingsListener,
  type OperatorSettingsPatch,
  type OperatorSettingsReceipt,
  type OperatorSettingsRecord,
} from '../../../src/main/operator-settings'

/** signatures.md §2, transcribed: the row, the four-word boot diagnosis, the four-member answer. */
interface AppStateRow { name: string; value: unknown }
type AppStateLegacy = 'absent' | 'imported' | 'corrupt' | 'recorded'
interface AppStateAnswer {
  rows: AppStateRow[]
  legacy: AppStateLegacy
  unrepresentable: string[]
  storage: 'standing' | 'unreachable'
}

/** signatures.md §2's `OperatorSettings`, whole: the sibling's three members UNMOVED and this unit's
 *  two verbatim, `writeAppState` answering the SIBLING'S receipt type (no second vocabulary). */
interface OperatorSettingsWithAppState {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  subscribe(listener: OperatorSettingsListener): () => void
  readAppState(): AppStateAnswer
  writeAppState(rows: readonly AppStateRow[]): OperatorSettingsReceipt
}

/** persistence.md §1: the instance's one written name, and the RETIRED carrier this unit reads at
 *  most once. Both are literals here ON PURPOSE — a row that imported the retired name from the
 *  module could not count its occurrences or assert that nothing writes it. */
const OPERATOR_FILE = 'provident-operator-settings.json'
const RETIRED_CARRIER = 'provident-settings.json'

const REPO = new URL('../../../', import.meta.url)
const sourceOf = (relative: string): string => readFileSync(new URL(relative, REPO), 'utf8')
const countIn = (text: string, needle: string): number => text.split(needle).length - 1

/** Every profile this file creates, so no row leaks a directory into the machine. A row that needs
 *  two profiles (a valid seed beside a corrupt one, an unreadable seed beside a directory) asks for
 *  both: a shared directory would prove nothing. */
const scratch: string[] = []

afterEach(() => {
  while (scratch.length > 0) rmSync(scratch.pop() as string, { recursive: true, force: true })
})

const profile = (): string => {
  const dir = mkdtempSync(join(tmpdir(), 'settings-carrier-unit-operator-'))
  scratch.push(dir)
  return dir
}

const at = (dir: string, name: string): string => join(dir, name)
const sha256 = (path: string): string => createHash('sha256').update(readFileSync(path)).digest('hex')

function instance(dir: string): OperatorSettingsWithAppState {
  return createOperatorSettings({ userDataDir: dir }) as unknown as OperatorSettingsWithAppState
}

function committed(receipt: OperatorSettingsReceipt): { status: 'committed'; cursor: number; opId: string } {
  if (receipt.status !== 'committed') throw new Error(`the row needs the committed arm; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

function refused(receipt: OperatorSettingsReceipt): { status: 'refused'; reason: string; message: string; address: unknown } {
  if (receipt.status !== 'refused') throw new Error(`the row needs the refused arm; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

/** THE MEMBER SET OF A PRODUCT, read at run time — own members plus those its prototype chain
 *  carries, stopping before `Object.prototype`. A closure product and a class instance are both
 *  lawful under signatures.md §2, so the row asserts the DECLARED surface rather than one style's
 *  layout (`SUR-5`'s idiom, at this file's grain). */
function membersOf(product: object): string[] {
  const names = new Set<string>()
  for (let here: object | null = product; here !== null && here !== Object.prototype; here = Object.getPrototypeOf(here) as object | null) {
    for (const name of Object.getOwnPropertyNames(here)) {
      if (name === 'constructor') continue
      const value = (here as Record<string, unknown>)[name]
      if (typeof value === 'function') names.add(name)
    }
  }
  return [...names].sort()
}

/** THE CORRUPT ANSWER, asserted whole: behaviour.md §7 says every corrupt arm answers the SAME one —
 *  no rows, no named row, the diagnosis, and a store that stands. */
function expectCorrupt(answer: AppStateAnswer, why: string): void {
  expect(answer, `the same corrupt answer for ${why}: no rows, no named row, nothing thrown (behaviour.md §7)`).toEqual({ rows: [], legacy: 'corrupt', unrepresentable: [], storage: 'standing' })
}

describe('settings-carrier-retirement · the operator-settings instance at unit grain (E-2)', () => {
  it('OS-1 · the two verbs exist, `readAppState()` answers exactly the four declared members and `writeAppState(rows)` answers the sibling’s receipt — committed with the store’s ordinals, refused with reason/message/address (signatures.md §2; interface.md §2)', () => {
    const settings = instance(profile())

    const answer = settings.readAppState()
    expect(Object.keys(answer).sort(), 'the answer is exactly the four declared members — `rows`, `legacy`, `unrepresentable`, `storage` — and no fifth (signatures.md §2; interface.md §2)').toEqual(['legacy', 'rows', 'storage', 'unrepresentable'])
    expect(answer, 'and over a fresh profile it is the cold answer').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })

    const receipt = committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a'] }]))
    expect(Object.keys(receipt).sort(), 'the committed arm is the SIBLING’S receipt unchanged: `status`, `cursor`, `opId`, and no second vocabulary (signatures.md §2; interface.md §2)').toEqual(['cursor', 'opId', 'status'])
    expect(Number.isInteger(receipt.cursor), 'the store’s own ordinal, verbatim').toBe(true)
    expect(receipt.opId.length, 'and its own op id').toBeGreaterThan(0)
  })

  it('OS-2 · the cold answer serves FRESH containers: two answers share no array, and neither `rows` nor `unrepresentable` in an answer is a served constant (signatures.md §3; design.md §5)', () => {
    const settings = instance(profile())
    const first = settings.readAppState()
    const second = settings.readAppState()

    expect(first, 'the cold answer is the same four values twice').toEqual(second)
    expect(first.rows === second.rows, 'but `NO_IMPORT`’s own array is never served: each answer mints its own list (signatures.md §3)').toBe(false)
    expect(first.unrepresentable === second.unrepresentable, 'and each `unrepresentable` is its own list too').toBe(false)

    first.rows.push({ name: 'file.injected', value: 1 })
    first.unrepresentable.push('file.injected')
    expect(settings.readAppState(), 'so a caller’s mutation of one answer moves nothing: the next answer is the cold one again').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })
  })

  it('OS-3 · the record is the ORDERED array `{rows:[{name,value},…]}`, never a name→value map: the written order survives a re-read, and a map’s key order would fail here (persistence.md §3, §8 P-2; interface.md §1 A-2)', () => {
    const dir = profile()
    const settings = instance(dir)
    // DELIBERATELY NOT ALPHABETICAL: the package's own measured reading (persistence.md §8 `P-2`) is
    // that an OBJECT comes back key-ordered while a genuine ARRAY's order survives exactly, so these
    // three names discriminate the array shape from the map shape on the read-back alone.
    const written: AppStateRow[] = [
      { name: 'file.zebra.order', value: ['z'] },
      { name: 'file.apple.order', value: ['a'] },
      { name: 'file.mango.order', value: ['m'] },
    ]
    committed(settings.writeAppState(written))

    const served = settings.readAppState().rows
    expect(served, 'the rows come back whole, in the order they were written').toEqual(written)
    expect(served.map((row) => row.name), 'and that order is NOT the sorted one a name→value map would answer (persistence.md §8 P-2)').not.toEqual(['file.apple.order', 'file.mango.order', 'file.zebra.order'])
    for (const row of served) {
      expect(Object.keys(row).sort(), `a row is exactly \`{name, value}\` and carries no third member: ${row.name}`).toEqual(['name', 'value'])
    }

    // THE RE-READ, which is the half the package's order loss would break: a fresh construction over
    // the same profile serves the same order off the durable record (persistence.md §3).
    const rebooted = instance(dir)
    expect(rebooted.readAppState().rows, 'a fresh construction serves the committed order, so the order is on the disk and not in this process').toEqual(written)
  })

  it('OS-4 · the JSON-image boundary: an own `undefined` member is absent from the served row, and a value with no image is refused `ValueRefusedAtBoundary` with this module’s own sentence and `address: null` — never `UnattributedFailure` (interface.md §7 ASM-L2-2; design.md §6 ASM-5; persistence.md §3)', () => {
    const dir = profile()
    const settings = instance(dir)

    // (a) AN OWN MEMBER WHOSE VALUE IS `undefined` CROSSES AS ABSENCE — the retired carrier's own
    // `JSON.stringify` behaviour, preserved by imaging the rows before the store sees them. Handed to
    // the store UN-IMAGED the same member would refuse the whole value (guide §10.2 rows 1-2), which
    // is exactly the boundary this limb pins (`ASM-L2-2`).
    committed(settings.writeAppState([
      { name: 'file.modules.m', value: { name: 'm', version: '1', quarantined: undefined } },
    ]))
    const served = settings.readAppState().rows
    expect(served.length, 'the row itself stands').toBe(1)
    expect(Object.prototype.hasOwnProperty.call(served[0].value, 'quarantined'), 'the `undefined` member is ABSENT from the served row, not merely undefined-valued (persistence.md §3)').toBe(false)
    expect(served[0].value, 'and the rest of the record survives the image verbatim').toEqual({ name: 'm', version: '1' })

    // (b) A VALUE `JSON.stringify` REFUSES IS THIS MODULE'S OWN REFUSAL, not a fall-through: the
    // design's `ASM-5` rejects letting the `TypeError` reach `refusalOf`, which would report a value
    // refusal as `UnattributedFailure` and name no act (guide §8.3; design.md §6 ASM-5).
    const cycle: Record<string, unknown> = {}
    cycle.self = cycle
    const before = readFileSync(at(dir, OPERATOR_FILE))
    const receipt = refused(settings.writeAppState([{ name: 'file.cycle', value: cycle }]))
    expect(receipt.reason, 'the image could not be minted, so the refusal is `ValueRefusedAtBoundary` — the module’s own composition — and NOT the store’s or `refusalOf`’s fall-through (design.md §2.1, §6 ASM-5)').toBe('ValueRefusedAtBoundary')
    expect(receipt.address, 'and this module composes it with `address: null`: nothing was named by a store that was never called (design.md §2.1)').toBeNull()
    expect(receipt.message.length, 'carrying a sentence of its own, never an empty one').toBeGreaterThan(0)

    expect(settings.readAppState().rows, 'and the previous row stands: a refusal leaves the record as it stood (interface.md §6)').toEqual([{ name: 'file.modules.m', value: { name: 'm', version: '1' } }])
    expect(readFileSync(at(dir, OPERATOR_FILE)).equals(before), 'and the bytes are byte-identical: no store call was made at all').toBe(true)
  })

  it('OS-5 · the read-back SKIP rule: a record row that fails the declared `{name, value}` shape is skipped and its siblings are served — never `[]` for the whole record (design.md §6 ASM-4; interface.md §2; guide §10)', () => {
    const settings = instance(profile())
    // A ROW WHOSE VALUE HAS NO IMAGE AS A MEMBER: `JSON.stringify` drops the `value` member of the row
    // object, so the record holds `{name:'file.ghost'}` — a row that fails the declared `{name, value}`
    // shape exactly as a record written by another writer could. It is admitted at the write (the
    // argument's own shape is all this verb admits) and skipped at the read-back (design.md §6 ASM-4);
    // the other malformations — a row that is not an object, a `name` that is not a non-empty string —
    // are refused at admission, so a lost `value` member is the one shape failure a record can carry.
    const receipt = committed(settings.writeAppState([
      { name: 'file.tabs.order', value: ['a'] },
      { name: 'file.ghost', value: undefined },
      { name: 'file.layout.dock', value: 'left' },
    ]))
    expect(Number.isInteger(receipt.cursor), 'the commit committed: the image, not the store, dropped the member').toBe(true)

    const answer = settings.readAppState()
    expect(answer.rows, 'the malformed row is SKIPPED and both siblings are served, in their order — the rejected alternative answered `[]` for the whole record (design.md §6 ASM-4)').toEqual([
      { name: 'file.tabs.order', value: ['a'] },
      { name: 'file.layout.dock', value: 'left' },
    ])
    expect(answer.rows.some((row) => row.name === 'file.ghost'), 'and the skipped name appears nowhere in `rows`').toBe(false)
    expect(answer.unrepresentable, '`unrepresentable` is the IMPORT arm’s list and does not collect a read-back skip (interface.md §2)').toEqual([])
  })

  it('OS-6 · every verb answers rather than throws over hostile arguments: `null`, `undefined`, a primitive, a Proxy and a cycle each answer a refusal, and the record is unmoved (interface.md §2; design.md §2.1, §5)', () => {
    const dir = profile()
    const settings = instance(dir)
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a'] }]))
    const before = readFileSync(at(dir, OPERATOR_FILE))

    const cycle: Record<string, unknown> = {}
    cycle.self = cycle
    const hostile: Array<{ why: string; rows: unknown }> = [
      { why: '`null`', rows: null },
      { why: '`undefined`', rows: undefined },
      { why: 'a primitive', rows: 7 },
      { why: 'a Proxy over an array whose `get` and `ownKeys` traps throw', rows: new Proxy([{ name: 'file.x', value: 1 }], { get() { throw new Error('hostile-get') }, ownKeys() { throw new Error('hostile-ownKeys') } }) },
      { why: 'a row that is a Proxy whose `getPrototypeOf` and `ownKeys` traps throw', rows: [new Proxy({}, { getPrototypeOf() { throw new Error('hostile-proto') }, ownKeys() { throw new Error('hostile-ownKeys') }, get() { throw new Error('hostile-get') } })] },
      { why: 'a rows list carrying a cycle', rows: [{ name: 'file.cycle', value: cycle }] },
      { why: 'a sparse rows list with a hole', rows: new Array(2) },
    ]
    for (const drive of hostile) {
      // THE ASSIGNMENT IS HELD ON A PROPERTY, not on a `let`: the callback runs inside `expect`, so a
      // narrowed local would read as `undefined` to the compiler and hide a real missing answer.
      const holder: { answered?: OperatorSettingsReceipt } = {}
      expect(() => { holder.answered = settings.writeAppState(drive.rows as readonly AppStateRow[]) }, `the verb ANSWERS rather than throwing: ${drive.why} (interface.md §2)`).not.toThrow()
      const answered = holder.answered
      if (answered === undefined) throw new Error(`the verb answered nothing at all: ${drive.why}`)
      expect(answered.status, `and the answer is a receipt: ${drive.why}`).toBe('refused')
      expect(typeof refused(answered).reason, `naming a reason, never an empty arm: ${drive.why}`).toBe('string')
    }

    // THE LANDED VERB IS UNMOVED BY THIS UNIT: a hostile patch still answers a receipt (interface.md §2;
    // the sibling's own `write` contract, which this edit adds a third address beside and never edits).
    const hostilePatch = new Proxy({}, { get() { throw new Error('hostile-get') }, has() { throw new Error('hostile-has') } })
    expect(() => settings.write(hostilePatch as never), 'the sibling’s `write` contains a hostile patch too (design.md §5)').not.toThrow()
    expect(settings.write(hostilePatch as never).status).toBe('refused')

    expect(settings.readAppState().rows, 'and none of them moved the record').toEqual([{ name: 'file.tabs.order', value: ['a'] }])
    expect(readFileSync(at(dir, OPERATOR_FILE)).equals(before), 'nor a byte').toBe(true)
    expect(settings.readAppState(), 'and a read still answers the four declared members after all of it').toEqual({ rows: [{ name: 'file.tabs.order', value: ['a'] }], legacy: 'absent', unrepresentable: [], storage: 'standing' })
  })

  it('OS-7 · the absent arm at the module: no retired file answers `absent` with no rows, creates no retired name, writes no byte — and with nothing written between, a second construction imports again (behaviour.md §7; persistence.md §4)', () => {
    const dir = profile()
    const settings = instance(dir)
    expect(settings.readAppState(), 'the cold answer over a profile holding no retired file, and a store that stands').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })
    expect(existsSync(at(dir, RETIRED_CARRIER)), 'the absent arm creates no retired name (persistence.md §4)').toBe(false)
    expect(readdirSync(dir), 'and the profile holds exactly the instance’s own file').toEqual([OPERATOR_FILE])
    expect(readFileSync(at(dir, OPERATOR_FILE)).length, 'the boot writes no byte: the instance file stands zero-length (persistence.md §2)').toBe(0)

    const again = instance(dir)
    expect(again.readAppState(), 'the marker is a RECORD and nothing wrote one, so a second construction answers the same cold answer (persistence.md §4)').toEqual(settings.readAppState())
  })

  it('OS-8 · the valid arm at the module: every `file.*` row lands verbatim under its own name and in its own order, `schemaVersion` is not carried, and the arm writes no byte (behaviour.md §7; L1 §4)', () => {
    const dir = profile()
    const seed = '{"schemaVersion":"1","file.tabs.order":["a","b"],"file.settings.theme.token":"dark"}'
    writeFileSync(at(dir, RETIRED_CARRIER), seed)
    const before = sha256(at(dir, RETIRED_CARRIER))

    const settings = instance(dir)
    const answer = settings.readAppState()
    expect(answer.legacy, 'the arm names itself: a valid retired record is an import, not a corruption (L1 §4)').toBe('imported')
    expect(answer.rows, 'both rows, verbatim, under their own names and in the retired file’s own order').toEqual([
      { name: 'file.tabs.order', value: ['a', 'b'] },
      { name: 'file.settings.theme.token', value: 'dark' },
    ])
    expect(answer.rows.some((row) => row.name === 'schemaVersion'), 'the `schemaVersion` stamp is the retired record’s format marker and is never carried as a row (L1 §4; D-13)').toBe(false)
    expect(answer.unrepresentable, 'and nothing was named uncarryable').toEqual([])
    expect(readFileSync(at(dir, OPERATOR_FILE)).length, 'the import writes no byte: the rows stand in memory until an ordinary write supersedes them (persistence.md §2)').toBe(0)
    expect(sha256(at(dir, RETIRED_CARRIER)), 'and the retired seed’s digest is unmoved (persistence.md §4)').toBe(before)

    const held = settings.readAppState()
    expect(held, 'and a second read answers the same rows').toEqual(answer)
    expect(held.rows === answer.rows, 'served as fresh containers off the held import answer, never as that answer’s own arrays (signatures.md §3)').toBe(false)
  })

  it('OS-9 · the corrupt arm at the module, and the discrimination that matters: a DIRECTORY and an unreadable file are `corrupt`, not `absent`, because the arm reads the caught error’s own `code` — with no third `fs` call (behaviour.md §7; design.md §2.2, §6 ASM-1)', () => {
    const seeds = [
      { why: 'unparsable bytes', bytes: '{"schemaVersion":"1","file.tabs.order":["a","b"],' },
      { why: 'a non-object seed `[1,2]`', bytes: '[1,2]' },
      { why: 'a non-object seed `"x"`', bytes: '"x"' },
      { why: 'a non-object seed `7`', bytes: '7' },
      { why: 'a non-object seed `true`', bytes: 'true' },
      { why: 'a non-object seed `null`', bytes: 'null' },
      { why: 'a foreign top-level key', bytes: '{"schemaVersion":"1","mine":1}' },
      { why: 'no `schemaVersion` member at all', bytes: '{"file.tabs.order":["a"]}' },
      { why: '`schemaVersion` `2`', bytes: '{"schemaVersion":"2","file.tabs.order":["a"]}' },
    ]
    for (const drive of seeds) {
      const dir = profile()
      writeFileSync(at(dir, RETIRED_CARRIER), drive.bytes)
      const before = sha256(at(dir, RETIRED_CARRIER))
      const settings = instance(dir)
      expectCorrupt(settings.readAppState(), drive.why)
      expect(readFileSync(at(dir, RETIRED_CARRIER), 'utf8'), `and the seed stands exactly as seeded: ${drive.why}`).toBe(drive.bytes)
      expect(sha256(at(dir, RETIRED_CARRIER)), `with its digest unmoved: ${drive.why}`).toBe(before)
    }

    // A DIRECTORY AT THE RETIRED PATH: `readFileSync` answers `EISDIR`, which is NOT `ENOENT`, so the
    // arm must answer `corrupt` — the one reading that proves the discrimination is the caught
    // error's own `code` and not a prior existence probe (design.md §2.2, §6 ASM-1).
    const asDirectory = profile()
    mkdirSync(at(asDirectory, RETIRED_CARRIER))
    expectCorrupt(instance(asDirectory).readAppState(), 'a directory standing where the retired file would be: `EISDIR` is not `ENOENT`, so the answer is `corrupt` and never `absent`')
    expect(existsSync(at(asDirectory, RETIRED_CARRIER)), 'the directory is left standing: the arm deletes nothing').toBe(true)

    // AN UNREADABLE FILE: `EACCES`, again not `ENOENT`.
    const unreadable = profile()
    const seeded = '{"schemaVersion":"1","file.tabs.order":["a"]}'
    writeFileSync(at(unreadable, RETIRED_CARRIER), seeded)
    chmodSync(at(unreadable, RETIRED_CARRIER), 0o000)
    try {
      expectCorrupt(instance(unreadable).readAppState(), 'a retired file the process cannot read: `EACCES` is not `ENOENT`, so `corrupt` and never `absent`')
    } finally {
      chmodSync(at(unreadable, RETIRED_CARRIER), 0o644)
    }
    expect(readFileSync(at(unreadable, RETIRED_CARRIER), 'utf8'), 'and its bytes stand as they were written: the arm repairs nothing').toBe(seeded)
  })

  it('OS-10 · the unrepresentable arm at the module: a `null`-carrying row is answered BY NAME while its sibling imports, and the named list is fresh per answer (behaviour.md §7; L1 §4; guide §10.1)', () => {
    const dir = profile()
    writeFileSync(at(dir, RETIRED_CARRIER), '{"schemaVersion":"1","file.tabs.order":null,"file.layout.dock":"left"}')
    const settings = instance(dir)

    const answer = settings.readAppState()
    expect(answer.rows, 'the carryable row imports verbatim under its own name').toEqual([{ name: 'file.layout.dock', value: 'left' }])
    expect(answer.rows.some((row) => row.name === 'file.tabs.order'), 'and the uncarryable row is not in `rows` at all: `null` is the one member JSON can spell and the store cannot (guide §10.1)').toBe(false)
    expect(answer.unrepresentable, 'it is answered BY NAME, exactly once: the operator’s row is never silently dropped (L1 §4)').toEqual(['file.tabs.order'])
    expect(answer.legacy, 'and the arm that ran is still the valid one: a named row is a partial import, not a corruption').toBe('imported')

    const next = settings.readAppState()
    expect(next.unrepresentable === answer.unrepresentable, 'the named list is a fresh array per answer, never the held answer’s own (signatures.md §3)').toBe(false)
    next.unrepresentable.push('file.layout.dock')
    expect(settings.readAppState().unrepresentable, 'so a caller’s mutation moves nothing').toEqual(['file.tabs.order'])
  })

  it('OS-11 · the marker is a RECORD and the diagnosis is the BOOT’s: after a commit the SAME process still serves its boot answer, and a FRESH construction serves `recorded` and the committed rows (persistence.md §4; interface.md §2; signatures.md §2)', () => {
    const dir = profile()
    writeFileSync(at(dir, RETIRED_CARRIER), '{"schemaVersion":"1","file.tabs.order":["a","b"]}')
    const before = sha256(at(dir, RETIRED_CARRIER))

    const first = instance(dir)
    expect(first.readAppState().legacy, 'this process booted over a valid seed, so its diagnosis is `imported`').toBe('imported')
    committed(first.writeAppState([{ name: 'file.layout.dock', value: 'left' }]))
    expect(first.readAppState().legacy, 'THE BOOT-TIME RULE: the diagnosis was fixed at construction and is served for the process’s life — a same-process change of answer here would be an undeclared per-read derivation (interface.md §2; persistence.md §4)').toBe('imported')
    expect(first.readAppState().rows, 'and the rows DO move: each read re-projects the store, so the committed record replaces the import overlay the held answer carried (design.md §2, §2.1 — the overlay is answered only while nothing stands at the address)').toEqual([{ name: 'file.layout.dock', value: 'left' }])

    const second = instance(dir)
    expect(second.readAppState().legacy, 'a FRESH construction over the profile whose record now stands answers the fourth word (interface.md §2 ASM-L2-1)').toBe('recorded')
    expect(second.readAppState().rows, 'and serves the COMMITTED rows, not the retired file’s: the record outranks the seed it superseded').toEqual([{ name: 'file.layout.dock', value: 'left' }])
    expect(sha256(at(dir, RETIRED_CARRIER)), 'and the retired seed still stands exactly as seeded (persistence.md §4)').toBe(before)
  })

  it('OS-12 · the module’s own `fs` census, read off the source AS A SOURCE: exactly TWO `readFileSync` calls — the security record’s and this one — its only `node:fs` binding, no probe and no write verb, the retired name spelled once (signatures.md §3; design.md §5; persistence.md §4)', () => {
    const source = sourceOf('src/main/operator-settings/index.ts')

    // A SOURCE READ, STATED AS ONE: the count is of CALL SITES, so the import binding does not count
    // as a read (`RET-3`'s idiom at the L2 layer; this row pins the same census at the module).
    const calls = [...source.matchAll(/readFileSync\s*\(/g)].length
    expect(calls, 'exactly two import-once reads — the sibling’s security record and this unit’s carrier — and no third, because `absent` and `corrupt` are told apart by the caught error’s own `code` (design.md §5, §6 ASM-1)').toBe(2)

    const fsImport = /import\s*\{([^}]*)\}\s*from\s*'node:fs'/.exec(source)
    expect(fsImport, 'the module imports its one `fs` name from `node:fs`').not.toBeNull()
    const bindings = (fsImport?.[1] ?? '').split(',').map((name) => name.trim()).filter((name) => name !== '' && !name.startsWith('type ')).sort()
    expect(bindings, 'and the only `node:fs` binding is `readFileSync`: no write, rename or remove verb enters this module (signatures.md §3; design.md §5; persistence.md §5)').toEqual(['readFileSync'])

    for (const name of ['existsSync', 'statSync', 'lstatSync', 'accessSync', 'writeFileSync', 'appendFileSync', 'renameSync', 'rmSync', 'unlinkSync', 'mkdirSync', 'openSync', 'closeSync', 'fsyncSync', 'copyFileSync', 'readdirSync']) {
      expect(new RegExp(`\\b${name}\\s*\\(`).test(source), `no \`${name}\` call stands in this module: the two reads are its whole \`fs\` surface, and a probe to tell absent from corrupt is the alternative design.md §6 ASM-1 rejects`).toBe(false)
    }

    expect(countIn(source, `'${RETIRED_CARRIER}'`), 'the retired carrier’s name is spelled ONCE in the module — `RETIRED_SETTINGS_NAME`, read by one `readFileSync` and written by none (signatures.md §3; design.md §2)').toBe(1)
    expect(source.includes("'operator-app-state'"), 'and the third durable address stands in this module: `APP_STATE_ADDRESS`, beside the record’s and the pair’s (signatures.md §3; interface.md §1)').toBe(true)
  })

  it('OS-13 · the declared member sets, read at RUN TIME off the real objects: the product’s five and the module entry’s one factory value — this row is what keeps the contract cast honest (signatures.md §1, §2)', () => {
    const dir = profile()
    const settings = instance(dir)
    expect(membersOf(settings), 'the product’s own members are EXACTLY the five signatures.md §2 declares: the sibling’s three and this unit’s two, and no sixth').toEqual(['read', 'readAppState', 'subscribe', 'write', 'writeAppState'])
    expect(Object.keys(operatorSettingsModule).sort(), 'and the module entry mints one VALUE name — the factory; every type signatures.md §2 declares erases at build, and this unit adds no exported value (signatures.md §1, §2)').toEqual(['createOperatorSettings'])
  })
})
