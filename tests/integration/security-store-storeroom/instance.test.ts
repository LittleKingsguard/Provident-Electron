// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/integration/security-store-storeroom/instance.test.ts — THE L2 BATTERY for
// `security-store-storeroom`, part 1: THE INSTANCE, through its DECLARED SURFACE.
//
// THE CONTRACT: docs/L2/security-store-storeroom/interface.md §1-§3 and §7, and behaviour.md
// §1-§8 — the boot and the construction act (`interface.md` §2.1), the committed write and its
// re-serve, the six import arms, the refusals, the subscription, the listener-throw hazard, the
// volatile exclusion pair and the two-profile row.
//
// EVERY ANSWER IS READ THROUGH THE DECLARED SHAPE (`interface.md` §2). No row widens an answer
// with a local view and no row casts one: the status word narrows the arm, and the members a row
// names are the members that arm declares. A refusal where the row needs an arm is a named
// FAILURE, never a skip (examiner.md §2). The subject is the real `createOperatorSettings` over
// the real `provident-storeroom` instance: no mock, no stub, no `todo`.
//
// REV 2 — THE THREE RE-GRAINS the L2 examiner's FAIL binds this file to:
//   · the receipt's ORDINAL is asserted by DIFFERENCE, never by its absolute origin: `interface.md`
//     §2 declares that `cursor` is the op's own `seq` and says in the same breath that no row pins
//     the figure it starts at (`ASM-L2-7`). Rows #2 and #13 were asserting `1`.
//   · the `enabled` ORDER is asserted against a patch and a seed whose order is NOT `VALID_GROUPS`'
//     order, because `interface.md` §2 `A-5` declares first-occurrence-in-the-caller's-order: the
//     old rows would have passed an implementation that re-sorted. Rows #3 and #5.
//   · the throw row cites `ASM-L2-6`, the id `interface.md` §7 actually carries (row #13 cited
//     `A-6`, which no table in that document contains).
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createOperatorSettings, type OperatorSettingsAddress, type OperatorSettingsReceipt } from '../../../src/main/operator-settings'

const OPERATOR_FILE = 'provident-operator-settings.json'
const LEGACY_FILE = 'provident-security.json'
const RECORD_ADDRESS = ['operator-settings']
const VOLATILE_ADDRESS = ['operator-exclusion']

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'security-store-instance-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

const filePath = (name: string): string => join(userDataDir, name)
const bytesOf = (name: string): Buffer => readFileSync(filePath(name))

function committed(receipt: OperatorSettingsReceipt): { status: 'committed'; cursor: number; opId: string } {
  if (receipt.status !== 'committed') throw new Error(`expected a committed receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

function refused(receipt: OperatorSettingsReceipt): { status: 'refused'; reason: string; message: string; address: unknown } {
  if (receipt.status !== 'refused') throw new Error(`expected a refused receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

describe('security-store-storeroom · the instance through its declared surface', () => {
  it('a first boot over no file serves the first-run default, leaves the two creation records on the disk and creates the retired name nowhere (interface.md §2.1, §2)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const record = settings.read()
    expect(record.token, 'the first-run default token').toBeNull()
    expect(record.enabled, 'the first-run default grant is read+dispatch').toEqual(['read', 'dispatch'])
    expect(record.maxJournalLength, 'no cap on a first run').toBeUndefined()
    expect(record.entries, 'entries is absent until first written').toBeUndefined()
    expect({ exclusion: record.exclusion, tier4: record.tier4 }, 'the exclusion pair boots to the safe pair').toEqual({ exclusion: 'mcp-enabled', tier4: false })
    expect(existsSync(filePath(OPERATOR_FILE)), 'construction creates the store file').toBe(true)
    expect(readdirSync(userDataDir), 'and nothing else stands beside it').toEqual([OPERATOR_FILE])
    // **THE FILE IS NO LONGER ZERO-LENGTH, AND THE READING IS THE SAVE A CREATION REPAIR NOW TAKES** (`1.9.1`, item 5's
    // sibling: the registration instant's write is settled into the file at the member that lands it). The two `file`
    // records the boot's three declarations write are therefore ON THE DISK before any caller act, in the store's own
    // bytes — measured 2026-11-03 against the installed tree, and asserted whole rather than by a length alone so a
    // record that moved cannot pass on the figure. What this row keeps is the part that never moved: the retired name
    // is created NOWHERE.
    expect(bytesOf(OPERATOR_FILE).toString('utf8'), 'the boot saved both creation records: the record address at `FIRST_RUN`’s image and the row-list address at the absent arm').toBe(
      '{"operator-app-state":{"legacy":"absent","rows":[],"unrepresentable":[]},"operator-settings":{"enabled":["read","dispatch"]}}',
    )
    expect(existsSync(filePath(LEGACY_FILE)), 'the retired name is not created by the absent import arm').toBe(false)
  })

  it('one committed write is one commit: a receipt with an ordinal and an op id, and the read re-serves it (interface.md §2 ASM-L2-7)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const first = committed(settings.write({ token: 't' }))
    expect(Number.isInteger(first.cursor), 'the ordinal is the store’s own integer `seq`, verbatim — its absolute origin is pinned by no row').toBe(true)
    expect(typeof first.opId, 'the op id is the store’s own string').toBe('string')
    expect(first.opId.length, 'and a non-empty one').toBeGreaterThan(0)
    expect(settings.read().token, 'the read serves what the write committed').toBe('t')
    const second = committed(settings.write({ token: 't2' }))
    expect(second.cursor - first.cursor, 'a second write is the NEXT op: one commit, one ordinal, no gap and no reuse').toBe(1)
    expect(second.opId, 'and the two ops are distinguishable').not.toBe(first.opId)
    expect(settings.read().token).toBe('t2')
    expect(readdirSync(userDataDir), 'no `.tmp`, no lock, no sidecar and no second name appears (persistence.md §5)').toEqual([OPERATOR_FILE])
  })

  it('the group filter keeps the six-member set, drops an outside name and keeps the caller’s order (D-11, D-15, A-5)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ enabled: ['data', 'bogus', 'read', 'dispatch', 'module', 'graph', 'code', 'data'] }))
    expect(settings.read().enabled, 'the patch’s own order, first occurrence first, and a non-group string dropped — NOT a re-sort into VALID_GROUPS order').toEqual(['data', 'read', 'dispatch', 'module', 'graph', 'code'])
  })

  it('the journal cap is written and then cleared (interface.md §2)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ maxJournalLength: 12 }))
    expect(settings.read().maxJournalLength).toBe(12)
    committed(settings.write({ maxJournalLength: null }))
    expect(settings.read().maxJournalLength, 'a null clears the cap').toBeUndefined()
  })

  it('the import carries its own red set: token, grants, cap and an arbitrary entry all survive, and the retired bytes stand (D-19)', () => {
    const seed = JSON.stringify({ token: 'tok', enabled: ['graph', 'read', 'graph', 'bogus'], maxJournalLength: 12, 'x-mine': { a: 1 } }, null, 2)
    writeFileSync(filePath(LEGACY_FILE), seed)

    const settings = createOperatorSettings({ userDataDir })
    const record = settings.read()
    expect(record.token, 'the operator’s token survives the crossing').toBe('tok')
    expect(record.enabled, 'the grants survive in the seeded order, deduplicated through the six-member set').toEqual(['graph', 'read'])
    expect(record.maxJournalLength, 'the cap survives').toBe(12)
    expect(record.entries, 'and a foreign key lands in `entries` verbatim').toEqual({ 'x-mine': { a: 1 } })
    expect(bytesOf(LEGACY_FILE).toString('utf8'), 'the retired name is read once and never written').toBe(seed)
    // **THE IMPORT DOES PERSIST, AND THE MECHANISM IS THE REPAIR THAT PERFORMS IT** (`D-85`; settled into the file by
    // `1.9.1`, whose registration instant saves what it lands). `interface.md` §2.1's *"the boot is read-only: the
    // construction, the boot read, the import and `attach` write no byte"* is the reading of its own date and is
    // superseded by measurement: the import runs INSIDE the record address's creation repair (`D-85`), the repair's
    // write is the save the terminal arm takes, and the imported record is therefore in the file at the member that
    // lands it — before any caller act, and before `read()`. Measured 2026-11-03 on the installed tree: `187` bytes, the
    // imported token, grants, cap and foreign entry in the store's own bytes beside the row-list record.
    expect(bytesOf(OPERATOR_FILE).toString('utf8'), 'the import reached the file: the record address carries the imported values, the row-list address the absent arm, and no placeholder stands over either').toBe(
      '{"operator-app-state":{"legacy":"absent","rows":[],"unrepresentable":[]},"operator-settings":{"enabled":["graph","read"],"entries":{"x-mine":{"a":1}},"maxJournalLength":12,"token":"tok"}}',
    )
  })

  it('the import’s absent arm serves the default and writes the placeholder record — the boot’s own save, never a byte of the retired name', () => {
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.read().token).toBeNull()
    expect(existsSync(filePath(LEGACY_FILE)), 'no retired name is created').toBe(false)
    // **THE BOOT WRITES, AND WHAT IT WRITES IS `FIRST_RUN`’S OWN IMAGE** — the absent arm of the import answered
    // `undefined` inside the record address's creation repair, the repair composed `toStored(undefined ?? FIRST_RUN)`,
    // and the save at that member put it on the disk (measured 2026-11-03, installed `1.9.1`). The row's subject that
    // never moved is the retired name: this arm reads no carrier and writes none.
    expect(bytesOf(OPERATOR_FILE).toString('utf8'), 'the absent arm saves the placeholder record and the absent row list, and nothing else stands in the file').toBe(
      '{"operator-app-state":{"legacy":"absent","rows":[],"unrepresentable":[]},"operator-settings":{"enabled":["read","dispatch"]}}',
    )
  })

  it('the import’s unparsable arm serves the default, throws nothing and leaves the bytes (L1 §5)', () => {
    const seed = '{"token":"tok",'
    writeFileSync(filePath(LEGACY_FILE), seed)
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.read().token, 'an unparsable file is the first-run default').toBeNull()
    expect(bytesOf(LEGACY_FILE).toString('utf8'), 'and its bytes are untouched').toBe(seed)
  })

  it('the import’s non-object arm serves the default (L1 §5)', () => {
    writeFileSync(filePath(LEGACY_FILE), '[1,2,3]')
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.read().token).toBeNull()
    expect(settings.read().entries, 'an array is not a record, so no index-like name is walked into `entries`').toBeUndefined()
  })

  it('the import’s directory arm serves the default and throws nothing (L1 §5)', () => {
    mkdirSync(filePath(LEGACY_FILE), { recursive: true })
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.read().enabled).toEqual(['read', 'dispatch'])
    expect(existsSync(filePath(LEGACY_FILE))).toBe(true)
  })

  it('the import’s non-map `entries` arm treats the member as absent, the one declared non-verbatim arm (L1 §5)', () => {
    writeFileSync(filePath(LEGACY_FILE), JSON.stringify({ token: 'tok', entries: [1, 2] }))
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.read().token, 'the imported member beside it still lands').toBe('tok')
    expect(settings.read().entries, 'a non-object `entries` is treated as absent and its raw value is not preserved').toBeUndefined()
  })

  it('a refused write is a value, names a reason word, and leaves the record and the bytes exactly as they stood (interface.md §3)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'keep' }))
    const before = readFileSync(filePath(OPERATOR_FILE))
    const receipt = refused(settings.write({ entries: { bad: undefined } }))
    expect(receipt.reason, 'the store’s own status verbatim, one of the three named spellings of interface.md §3').toBe('ValueRefusedAtBoundary')
    expect(typeof receipt.message, 'the package’s generated sentence rides it').toBe('string')
    expect('address' in receipt, 'and the fourth member is present on every arm, `null` where nothing is nameable').toBe(true)
    expect(settings.read().token, 'the record is unmoved').toBe('keep')
    expect(readFileSync(filePath(OPERATOR_FILE)).equals(before), 'and the bytes are byte-identical').toBe(true)
  })

  it('a listener is the change path: a committed write delivers the triggering address, and the withdrawal stops it (D-17)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const seen: OperatorSettingsAddress[] = []
    const off = settings.subscribe((address: OperatorSettingsAddress) => { seen.push(address) })
    committed(settings.write({ token: 'x' }))
    expect(seen, 'the record’s own address, delivered inside the write’s call').toEqual([RECORD_ADDRESS])
    committed(settings.write({ exclusion: 'mcp-disabled' }))
    expect(seen, 'and the volatile pair’s address, because that is the address the act touched').toEqual([RECORD_ADDRESS, VOLATILE_ADDRESS])
    off()
    committed(settings.write({ token: 'y' }))
    expect(seen.length, 'a withdrawn handle fires nothing, silently (guide §6.2-§6.3)').toBe(2)
  })

  it('a listener’s throw cannot take the write’s answer away, and the throwing subscriber is withdrawn (ASM-L2-6, guide §6.5a)', () => {
    const settings = createOperatorSettings({ userDataDir })
    let calls = 0
    settings.subscribe(() => { calls += 1; throw new Error('boom-in-subscriber') })
    const seen: OperatorSettingsAddress[] = []
    settings.subscribe((address: OperatorSettingsAddress) => { seen.push(address) })

    const first = committed(settings.write({ token: 'boom-1' }))
    expect(Number.isInteger(first.cursor), 'the write answers its own receipt though a subscriber threw').toBe(true)
    expect(settings.read().token, 'and the data had already landed, so the read serves it').toBe('boom-1')
    expect(seen.length, 'the subscriber beside it was delivered: one withdrawal is not the window’s failure').toBe(1)

    const second = committed(settings.write({ token: 'boom-2' }))
    expect(second.cursor - first.cursor, 'the second write is the next op, so the failed subscriber cost it no commit').toBe(1)
    expect(calls, 'the throwing subscriber is withdrawn, so no later write pays its cost').toBe(1)
    expect(settings.read().token).toBe('boom-2')
  })

  it('the exclusion pair is volatile: a transition commits, a file write leaves it unmoved, and a fresh construction boots it to the safe pair (ASM-L2-2)', () => {
    const settings = createOperatorSettings({ userDataDir })
    expect({ exclusion: settings.read().exclusion, tier4: settings.read().tier4 }).toEqual({ exclusion: 'mcp-enabled', tier4: false })

    committed(settings.write({ exclusion: 'mcp-disabled' }))
    expect({ exclusion: settings.read().exclusion, tier4: settings.read().tier4 }, 'one record, two derived readings').toEqual({ exclusion: 'mcp-disabled', tier4: true })

    committed(settings.write({ token: 'z' }))
    expect(settings.read().exclusion, 'a `file`-tier write purges only its own key, so the pair stands (interface.md §1 ASM-L2-1)').toBe('mcp-disabled')

    const rebooted = createOperatorSettings({ userDataDir })
    expect(rebooted.read().token, 'the durable record survives the reconstruction').toBe('z')
    expect({ exclusion: rebooted.read().exclusion, tier4: rebooted.read().tier4 }, 'and the pair is back at the safe pair: it was never persisted').toEqual({ exclusion: 'mcp-enabled', tier4: false })
  })

  it('two profiles are disjoint: a write through one is never served by the other (D-13, L1 §8 S-12)', () => {
    const other = mkdtempSync(join(tmpdir(), 'security-store-instance-other-'))
    try {
      const a = createOperatorSettings({ userDataDir })
      const b = createOperatorSettings({ userDataDir: other })
      committed(a.write({ token: 'only-a' }))
      expect(a.read().token).toBe('only-a')
      expect(b.read().token, 'the second profile never serves the first one’s write').toBeNull()
      committed(b.write({ enabled: ['read', 'dispatch', 'graph', 'code', 'module', 'data'] }))
      expect(a.read().enabled, 'and each carries its own grant set').toEqual(['read', 'dispatch'])
      expect(b.read().enabled).toEqual(['read', 'dispatch', 'graph', 'code', 'module', 'data'])
    } finally {
      rmSync(other, { recursive: true, force: true })
    }
  })
})
