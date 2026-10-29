// tests/integration/settings-carrier-retirement/app-state.test.ts — THE L2 BATTERY for
// `settings-carrier-retirement`, part 1: THE THIRD DURABLE ADDRESS AND ITS ONE COMMIT, driven
// through the instance's DECLARED SURFACE.
//
// THE CONTRACT: docs/L2/settings-carrier-retirement/interface.md §1 (the address and the whole-record
// act), §2 (the four declared members and the two new verbs), §4 (Y-2's whole-map replacement), §6
// (the refusal vocabulary, including a malformed argument refused as a value) and §7 (`A-2`, `A-3`,
// `ASM-L2-6`); behaviour.md §3 (`A-6` and the whole-map commit) and §4 (the JSON image, `ASM-L2-2`);
// persistence.md §2 (what construction and the boot write), §3 (the record's shape and the prototype
// discipline), §5 (what a `file`-tier commit guarantees, and what a refusal leaves) and §6 (why the
// three addresses do not touch).
//
// THIS FILE STANDS RED UNTIL THE IMPLEMENTATION EXISTS (`examiner.md` §3, D-1): `readAppState` and
// `writeAppState` are not in `src/main/operator-settings/index.ts` at this head, so every row below
// fails with `readAppState is not a function`. No row is skipped, softened or conditionally disabled
// to hide that, and no row is re-pointed at a substitute: the subject is the real
// `createOperatorSettings` over a real `mkdtempSync` profile — no mock, no stub, no `todo`.
//
// HOW THE SUBJECT IS TYPED, AND WHY THAT IS NOT A MOCK. `interface.md` §2 declares the delta this
// unit owes the module; the module at this head carries the sibling's three verbs and not the two.
// So the rows type the product through a LOCAL declaration of that document's §2 interface and cast
// the constructed object to it (`as unknown as`). That types the CONTRACT rather than inventing a
// subject: the object driven is still `createOperatorSettings` over the real `provident-storeroom`
// instance, and the member set it really holds is pinned at run time by `SUR-5` in
// `surface.test.ts`, which is what keeps this cast honest.
//
// WHERE EACH ANSWER COMES FROM. Every assertion below is an answer read through the declared shape or
// a byte on the disk — never an internal call and never a source shape (`examiner.md` §2). A refusal
// where a row needs the committed arm is a NAMED failure carrying the receipt that was answered.
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  createOperatorSettings,
  type OperatorSettingsListener,
  type OperatorSettingsPatch,
  type OperatorSettingsReceipt,
  type OperatorSettingsRecord,
} from '../../../src/main/operator-settings'

const OPERATOR_FILE = 'provident-operator-settings.json'

/** `interface.md` §2, transcribed: `AppStateRow`, `AppStateLegacy`, `AppStateAnswer`. A name is a
 *  string carried VERBATIM and the list's order is the committed order (`A-2`). */
interface AppStateRow { name: string; value: unknown }
type AppStateLegacy = 'absent' | 'imported' | 'corrupt' | 'recorded'
interface AppStateAnswer {
  rows: AppStateRow[]
  legacy: AppStateLegacy
  unrepresentable: string[]
  storage: 'standing' | 'unreachable'
}

/** `interface.md` §2's `OperatorSettings`, whole: the sibling's three members unmoved and this unit's
 *  two verbatim, with `writeAppState` answering the SIBLING'S receipt type (`interface.md` §2). */
interface OperatorSettingsWithAppState {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  subscribe(listener: OperatorSettingsListener): () => void
  readAppState(): AppStateAnswer
  writeAppState(rows: readonly AppStateRow[]): OperatorSettingsReceipt
}

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'settings-carrier-app-state-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

const filePath = (name: string): string => join(userDataDir, name)
const bytesOf = (name: string): Buffer => readFileSync(filePath(name))

/** THE SUBJECT, cast to the contract it will carry (`interface.md` §2). The construction is the real
 *  one, over the real instance, on a real profile directory. */
function instance(profileDir: string): OperatorSettingsWithAppState {
  return createOperatorSettings({ userDataDir: profileDir }) as unknown as OperatorSettingsWithAppState
}

function committed(receipt: OperatorSettingsReceipt): { status: 'committed'; cursor: number; opId: string } {
  if (receipt.status !== 'committed') throw new Error(`the row needs the committed arm; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

function refused(receipt: OperatorSettingsReceipt): { status: 'refused'; reason: string; message: string; address: unknown } {
  if (receipt.status !== 'refused') throw new Error(`the row needs the refused arm; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

describe('settings-carrier-retirement · the third durable address, through the instance’s declared surface', () => {
  it('AS-1 · a fresh profile answers the cold answer over a standing store: no rows, `absent`, an empty `unrepresentable`, `standing` — and the instance file exists, zero-length (interface.md §1, §2; persistence.md §2)', () => {
    const settings = instance(userDataDir)
    const answer = settings.readAppState()
    expect(answer, 'the cold answer is the whole declared shape, not a member of it').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })
    expect(existsSync(filePath(OPERATOR_FILE)), 'construction creates the instance’s own file (guide §9.1; persistence.md §2)').toBe(true)
    expect(bytesOf(OPERATOR_FILE).length, 'and the boot is write-free: the file stands zero-length and empty').toBe(0)
    expect(settings.read().token, 'the sibling’s first-run answer is unmoved by this unit’s second read (D-16)').toBeNull()
  })

  it('AS-2 · one `writeAppState` is one commit answering the sibling’s receipt, and the read re-serves the rows verbatim in their committed order (interface.md §1, §2 A-2)', () => {
    const settings = instance(userDataDir)
    const rows: AppStateRow[] = [
      { name: 'file.tabs.order', value: ['a', 'b'] },
      { name: 'file.settings.theme.token', value: 'dark' },
    ]
    const receipt = committed(settings.writeAppState(rows))
    expect(Number.isInteger(receipt.cursor), 'the receipt is the sibling’s own: an integer ordinal, taken verbatim from the store (interface.md §2)').toBe(true)
    expect(typeof receipt.opId, 'and the store’s own op id').toBe('string')
    expect(receipt.opId.length, 'non-empty').toBeGreaterThan(0)

    const served = settings.readAppState().rows
    expect(served, 'the rows cross as an ordered list, order preserved and names verbatim — nothing in this unit is entitled to re-sort them (A-2)').toEqual([
      { name: 'file.tabs.order', value: ['a', 'b'] },
      { name: 'file.settings.theme.token', value: 'dark' },
    ])
    expect(served.map((row) => row.name), 'the names are carried verbatim, one map member each, and no path segment is interpreted (persistence.md §3)').toEqual(['file.tabs.order', 'file.settings.theme.token'])
    expect(settings.readAppState().legacy, 'a record now stands at the address, so no import arm applies and the diagnosis says so (interface.md §2 ASM-L2-1)').toBe('recorded')
  })

  it('AS-3 · a commit is a WHOLE-MAP replacement: a second `writeAppState` carrying one row leaves exactly that row (interface.md §4; behaviour.md §3 A-6)', () => {
    const settings = instance(userDataDir)
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a', 'b'] }, { name: 'file.settings.theme.token', value: 'dark' }]))
    committed(settings.writeAppState([{ name: 'file.layout.dock', value: 'left' }]))
    expect(settings.readAppState().rows, 'the crossing IS the record: a caller that sends one row leaves one row standing, exactly as the landed channel did (A-6)').toEqual([
      { name: 'file.layout.dock', value: 'left' },
    ])
  })

  it('AS-4 · `writeAppState([])` commits, and the read answers `[]` — a cold answer is an empty list and never an error (interface.md §2, §4)', () => {
    const settings = instance(userDataDir)
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a'] }]))
    const receipt = committed(settings.writeAppState([]))
    expect(Number.isInteger(receipt.cursor), 'an empty map is a lawful whole-record write, so it mints an ordinal like any other commit').toBe(true)
    expect(settings.readAppState().rows, 'over a committed empty record the cold answer is `[]`, not a throw and not an invented row (interface.md §4)').toEqual([])
  })

  it('AS-5 · a row whose value carries `null` is REFUSED with the store’s own status verbatim, and the previous rows and bytes stand unchanged (interface.md §6; behaviour.md §3; persistence.md §5)', () => {
    const settings = instance(userDataDir)
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a', 'b'] }]))
    const before = bytesOf(OPERATOR_FILE)

    const receipt = refused(settings.writeAppState([{ name: 'file.bad', value: { nested: null } }]))
    // `ValueRefusedAtBoundary` IS THE PACKAGE'S DECLARED SPELLING for a value the JavaScript crossing
    // refuses — `null` is the one member JSON can spell and the store cannot (`guide §10.1`, "`null` IS
    // NOT ADMITTED"; §10.2 rows 1-2). The module carries it VERBATIM under the open escape arm and
    // adds no second spelling of its own (`interface.md` §6; L1 §3 ASM-2).
    expect(receipt.reason, 'the refusal names the store’s status verbatim — `ValueRefusedAtBoundary`, the package’s declared spelling for an unrepresentable value (guide §10.1/§10.2)').toBe('ValueRefusedAtBoundary')
    expect(typeof receipt.message, 'the package’s own generated sentence rides it, never a re-spelling').toBe('string')
    expect('address' in receipt, 'and the fourth member is present on the refused arm, `null` where nothing is nameable (guide §8; D-77)').toBe(true)

    expect(settings.readAppState().rows, 'the previous rows stand: a refusal leaves the record exactly as it stood (interface.md §6)').toEqual([
      { name: 'file.tabs.order', value: ['a', 'b'] },
    ])
    expect(bytesOf(OPERATOR_FILE).equals(before), 'and the bytes are byte-identical — the store’s journal rollback has already run (guide §9.4; persistence.md §5)').toBe(true)
  })

  it('AS-6 · a malformed argument is refused AS A VALUE and never thrown: a duplicate name, a name that is not a non-empty string, a row that is not an object, and a `rows` that is not an array (interface.md §6 ASM-L2-6)', () => {
    const settings = instance(userDataDir)
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a'] }]))
    const before = bytesOf(OPERATOR_FILE)

    const malformed: Array<{ why: string; rows: unknown }> = [
      { why: 'a duplicate `name` — last-name-wins would silently discard an operator row', rows: [{ name: 'file.tabs.order', value: ['a'] }, { name: 'file.tabs.order', value: ['b'] }] },
      { why: 'a `name` that is not a non-empty string', rows: [{ name: '', value: 'x' }] },
      { why: 'a `name` that is not a string at all', rows: [{ name: 7, value: 'x' }] },
      { why: 'a row that is not an object', rows: ['file.tabs.order'] },
      { why: 'a row that is `null`', rows: [null] },
      { why: 'a `rows` that is not an array', rows: { 'file.tabs.order': ['a'] } },
      { why: 'a `rows` that is `null`', rows: null },
    ]
    for (const drive of malformed) {
      const receipt = refused(settings.writeAppState(drive.rows as readonly AppStateRow[]))
      expect(receipt.reason, `the argument’s own shape is refused as a value, never thrown, and with this module’s own sentence: ${drive.why}`).toBe('ValueRefusedAtBoundary')
      expect(typeof receipt.message, `and the refusal carries a sentence: ${drive.why}`).toBe('string')
    }

    expect(settings.readAppState().rows, 'no malformed argument moved the record, and the malformed calls above returned rather than threw').toEqual([
      { name: 'file.tabs.order', value: ['a'] },
    ])
    expect(bytesOf(OPERATOR_FILE).equals(before), 'and no malformed argument wrote a byte').toBe(true)
  })

  it('AS-7 · the value that crosses is the rows’ JSON IMAGE: a row whose value carries `quarantined: undefined` COMMITS, and the served row does not carry the member (interface.md §7 ASM-L2-2; persistence.md §3)', () => {
    const settings = instance(userDataDir)
    const receipt = committed(settings.writeAppState([
      { name: 'file.modules.m', value: { name: 'm', version: '1', source: 's', quarantined: undefined } },
    ]))
    expect(Number.isInteger(receipt.cursor), 'an own member whose value is `undefined` is dropped by the JSON image instead of refusing the whole value, exactly as the retired carrier’s `JSON.stringify` dropped it (persistence.md §3 ASM-L2-2)').toBe(true)

    const served = settings.readAppState().rows
    expect(served.length, 'the row itself stands').toBe(1)
    expect(served[0].name, 'under its own name').toBe('file.modules.m')
    expect(Object.prototype.hasOwnProperty.call(served[0].value, 'quarantined'), 'the record the store holds is the rows’ JSON image, so the `undefined` member is ABSENT from the served row and not merely undefined-valued (persistence.md §3; behaviour.md §4). NOTE: handed to the store un-imaged, the same member would refuse the whole value (guide §10.2 rows 1-2) — that is exactly the boundary this row pins.').toBe(false)
    expect(served[0].value, 'and the rest of the record survives the image verbatim').toEqual({ name: 'm', version: '1', source: 's' })
  })

  it('AS-8 · three addresses do not interfere: a commit leaves the exclusion pair standing, and a record write leaves the rows unmoved (persistence.md §6; guide §5.1)', () => {
    const settings = instance(userDataDir)
    committed(settings.write({ exclusion: 'mcp-disabled' }))
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a', 'b'] }]))
    expect(settings.read().exclusion, 'a `file`-tier write purges the versions it outranks AT ITS OWN KEY, so the `mem` pair at the other key is untouched (persistence.md §6)').toBe('mcp-disabled')
    expect(settings.read().tier4, 'and the derived reading moves with it, unmoved by the commit').toBe(true)

    const rowsBefore = settings.readAppState().rows
    committed(settings.write({ token: 't' }))
    expect(settings.readAppState().rows, 'and a record write at the sibling’s address cannot clear the app-state record either (persistence.md §6 ASM-1)').toEqual(rowsBefore)
    expect(settings.read().token, 'the record write landed where it was aimed').toBe('t')
  })

  it('AS-9 · after three commits the profile holds exactly the one instance file: no `.tmp`, no lock, no sidecar and no second name (persistence.md §5; behaviour.md §3)', () => {
    const settings = instance(userDataDir)
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a'] }]))
    committed(settings.writeAppState([{ name: 'file.tabs.order', value: ['a', 'b'] }]))
    committed(settings.writeAppState([{ name: 'file.layout.dock', value: 'left' }]))
    expect(readdirSync(userDataDir), 'the retired stage-and-rename machinery has no successor: one name, and nothing beside it (persistence.md §5)').toEqual([OPERATOR_FILE])
    expect(settings.readAppState().rows, 'and the last commit is the record that stands').toEqual([{ name: 'file.layout.dock', value: 'left' }])
  })

  it('AS-10 · two profiles are disjoint: a commit through one is never served by the other (D-13; persistence.md §1)', () => {
    const other = mkdtempSync(join(tmpdir(), 'settings-carrier-app-state-other-'))
    try {
      const a = instance(userDataDir)
      const b = instance(other)
      committed(a.writeAppState([{ name: 'file.tabs.order', value: ['only-a'] }]))
      expect(a.readAppState().rows).toEqual([{ name: 'file.tabs.order', value: ['only-a'] }])
      expect(b.readAppState().rows, 'the second profile never serves the first one’s commit').toEqual([])
      expect(b.readAppState().legacy, 'and it holds no retired file, so its own import arm answered `absent`').toBe('absent')
      committed(b.writeAppState([{ name: 'file.layout.dock', value: 'right' }]))
      expect(a.readAppState().rows, 'and each keeps its own rows').toEqual([{ name: 'file.tabs.order', value: ['only-a'] }])
      expect(b.readAppState().rows).toEqual([{ name: 'file.layout.dock', value: 'right' }])
    } finally {
      rmSync(other, { recursive: true, force: true })
    }
  })
})
