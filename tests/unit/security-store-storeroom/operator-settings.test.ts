// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/security-store-storeroom/operator-settings.test.ts — THE L3 UNIT BATTERY for the
// `operator-settings` instance (`src/main/operator-settings/index.ts`), driven through the surface
// `docs/L3/security-store-storeroom/signatures.md` §2 declares and nothing else.
//
// THE CONTRACT is `docs/L3/security-store-storeroom/design.md` §2-§8, read on
// `docs/L2/security-store-storeroom/interface.md` §1/§2/§2.1/§3 and `behaviour.md` §1-§8. Each row
// adds the grain the L2 battery (`tests/integration/security-store-storeroom/instance.test.ts`)
// does not already carry: the private-helper contract the design names (`detach`/`newMap` §3,
// `admitGroups` §3, `toStored`/`fromStored` §3, `receiptOf` §3, `importOnce` §7, `cap` §3/§6), a
// stated order, or an edge arm of a declared answer (design.md §3, §6, §7, §8; D-1 §4).
//
// THE SUBJECT IS THE REAL MODULE over the real `provident-storeroom` instance, on a real
// `userDataDir` under `os.tmpdir()`: no mock, no stub, no re-implementation, no skip
// (examiner.md §2). Every answer is read through the declared shape (signatures.md §2) and the
// store's file is only ever asserted as length, byte-identity, existence and absence of names —
// never parsed (persistence.md §4). Red today is the expected state: `src/main/operator-settings/`
// does not exist at this head (examiner.md §3, D-1 §4).
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createOperatorSettings, type OperatorSettingsReceipt } from '../../../src/main/operator-settings'

const FILE = 'provident-operator-settings.json' // persistence.md §1: the instance's one written name
const RETIRED = 'provident-security.json' // persistence.md §1: read once, never written again (D-19)
const RECORD = ['operator-settings'] // interface.md §1: the `file` tier's one address
const PAIR = ['operator-exclusion'] // interface.md §1 / ASM-L2-1: the `mem` address

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'operator-settings-unit-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

const at = (name: string): string => join(userDataDir, name)
const bytesOf = (name: string): Buffer => readFileSync(at(name))

function committed(receipt: OperatorSettingsReceipt): { status: 'committed'; cursor: number; opId: string } {
  if (receipt.status !== 'committed') throw new Error(`expected a committed receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

function refused(receipt: OperatorSettingsReceipt): { status: 'refused'; reason: string; message: string } {
  if (receipt.status !== 'refused') throw new Error(`expected a refused receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

describe('security-store-storeroom · the operator-settings instance at unit grain', () => {
  it('the boot is read-only and the construction never truncates: read(), subscribe() and a second construction leave the file\'s bytes as they stood (interface.md §2.1; design.md §4; persistence.md §2)', () => {
    const settings = createOperatorSettings({ userDataDir })
    settings.read()
    const off = settings.subscribe(() => {})
    off()
    expect(existsSync(at(FILE)), 'the store constructed its own file').toBe(true)
    expect(readdirSync(userDataDir), 'and nothing stands beside it').toEqual([FILE])
    expect(bytesOf(FILE).length, 'a process that only reads writes no byte (guide §9.1)').toBe(0)

    committed(settings.write({ token: 'kept' }))
    const stood = bytesOf(FILE)
    expect(stood.length, 'the first write is the store\'s first byte: the boot minted no op').toBeGreaterThan(0)

    const second = createOperatorSettings({ userDataDir })
    expect(bytesOf(FILE).equals(stood), 'an existing file is never truncated and never reset (guide §9.1)').toBe(true)
    expect(second.read().token, 'so the record stands across the reconstruction').toBe('kept')
    expect(readdirSync(userDataDir), 'and the second construction adds no name either').toEqual([FILE])
  })

  it('read() answers a value detached at every depth, and a patch may be dropped the moment the write returns (design.md §3, §5; guide §10)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const patch = { token: 't', maxJournalLength: 5, entries: { deep: { list: [1, 2] } } }
    committed(settings.write(patch))
    patch.token = 'mutated-after-the-write'
    patch.entries.deep.list.push(9)

    const served = settings.read()
    expect(served.token, 'the store copied the patch on the way in, so the caller\'s reference is its own (guide §10)').toBe('t')

    served.token = 'mutated-in-place'
    served.enabled.push('code')
    served.maxJournalLength = 99
    delete (served as { maxJournalLength?: number }).maxJournalLength
    ;(served.entries!.deep as { list: number[] }).list.push(3)
    ;(served.entries as Record<string, unknown>).added = true

    const again = settings.read()
    expect(again.token, 'a served value is the carrier\'s, never the record\'s (`fromStored` builds fresh containers)').toBe('t')
    expect(again.enabled, 'the grant array is a real array built per call, not the stored one').toEqual(['read', 'dispatch'])
    expect(again.maxJournalLength).toBe(5)
    expect(again.entries, 'and every depth below `entries` is rebuilt, not shared (`newMap`; guide §10)').toEqual({ deep: { list: [1, 2] } })
  })

  it('one transition is one op: a read, a subscription and a refusal mint no ordinal, and each commit is the next one (interface.md §2 ASM-L2-7; design.md §6)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const first = committed(settings.write({ token: 'a' }))
    settings.read()
    const off = settings.subscribe(() => {})
    off()
    refused(settings.write({ entries: { bad: undefined } }))

    const second = committed(settings.write({ token: 'b' }))
    expect(second.cursor - first.cursor, 'the reads, the subscription and the refusal minted nothing: one transition, one op').toBe(1)
    expect(second.opId, 'and two ops carry two ids').not.toBe(first.opId)

    const third = committed(settings.write({ exclusion: 'mcp-disabled' }))
    expect(third.cursor - second.cursor, 'the pair is an op on the same journal and the next one (design.md §2)').toBe(1)
  })

  it('the group filter is the six-member set, served in the caller\'s own order, and a name outside it is dropped (D-11, D-15, A-5; design.md §3)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ enabled: ['module', 'code', 'graph', 'dispatch', 'read', 'data'] }))
    expect(settings.read().enabled, 'all six members are admitted and served in the reverse of VALID_GROUPS order, so a re-sort fails here').toEqual(['module', 'code', 'graph', 'dispatch', 'read', 'data'])
    committed(settings.write({ enabled: ['bogus', 'read', 'nope'] }))
    expect(settings.read().enabled, 'and a non-group string is dropped rather than carried').toEqual(['read'])
  })

  it('the journal cap is a floored positive integer or absent: set, floor, clear by null/NaN/non-positive, and refuse a non-finite cap (interface.md §2; design.md §6)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ maxJournalLength: 3.7 }))
    expect(settings.read().maxJournalLength, 'the durable member is floored (design.md §6)').toBe(3)

    committed(settings.write({ maxJournalLength: Number.NaN }))
    expect(settings.read().maxJournalLength, 'NaN sits in the clear arm and commits, rather than refusing the patch').toBeUndefined()

    committed(settings.write({ maxJournalLength: 9 }))
    committed(settings.write({ maxJournalLength: -1 }))
    expect(settings.read().maxJournalLength, 'a non-positive value clears it too').toBeUndefined()

    committed(settings.write({ maxJournalLength: 9 }))
    const receipt = refused(settings.write({ maxJournalLength: Number.POSITIVE_INFINITY }))
    expect(receipt.reason, 'the non-finite pair refuses the patch (guide §10.2)').toBe('ValueRefusedAtBoundary')
    expect(settings.read().maxJournalLength, 'and a refusal leaves the cap as it stood').toBe(9)
  })

  it('the import runs iff the record address carries nothing, and the retired name is never written again (D-19; persistence.md §1, §3)', () => {
    const seed = JSON.stringify({ token: 'seeded', enabled: ['graph'], maxJournalLength: 4, 'x-mine': { a: 1 } })
    writeFileSync(at(RETIRED), seed)

    const settings = createOperatorSettings({ userDataDir })
    expect(settings.read().token, 'the first boot imports the retired record once').toBe('seeded')
    committed(settings.write({ token: 'written' }))
    committed(settings.write({ enabled: ['read'] }))
    committed(settings.write({ token: 'written-2' }))
    expect(bytesOf(RETIRED).toString('utf8'), 'three commits later the retired bytes stand exactly as seeded').toBe(seed)

    const rebooted = createOperatorSettings({ userDataDir })
    expect(rebooted.read().token, 'the marker is the record at the address, so the seed is not imported a second time (persistence.md §3)').toBe('written-2')
    expect(rebooted.read().enabled, 'and the written grant set stands, not the seeded one').toEqual(['read'])
  })

  it('a refused value is a value on this surface: the store\'s own status and sentence cross verbatim, and nothing lands (interface.md §3; design.md §6)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'keep' }))
    const stood = bytesOf(FILE)
    const cycle: Record<string, unknown> = {}
    cycle.self = cycle

    const cases: Array<Record<string, unknown>> = [
      { entries: { bad: undefined } },
      { entries: { fn: () => 1 } },
      { entries: { list: [1, null] } },
      { entries: { loop: cycle } },
    ]
    for (const [index, patch] of cases.entries()) {
      const receipt = refused(settings.write(patch as never))
      expect(receipt.reason, `the walk's own status crosses verbatim under the escape arm (guide §10.2; case ${index})`).toBe('ValueRefusedAtBoundary')
      expect(receipt.message.length, `with the package's generated sentence, never re-spelled here (case ${index})`).toBeGreaterThan(0)
    }

    expect(settings.read().entries, 'no entries map landed').toBeUndefined()
    expect(settings.read().token, 'and the record is unmoved').toBe('keep')
    expect(bytesOf(FILE).equals(stood), 'and the bytes are byte-identical (guide §9.4)').toBe(true)
  })

  it('a store that cannot stand refuses every write as a value and creates nothing, and read/subscribe answer without a throw (interface.md §2.1; design.md §4 ASM-4)', () => {
    mkdirSync(at(FILE))
    const settings = createOperatorSettings({ userDataDir })
    const record = settings.read()
    expect({ token: record.token, enabled: record.enabled, exclusion: record.exclusion, tier4: record.tier4 }, 'the first-run default with the safe pair').toEqual({ token: null, enabled: ['read', 'dispatch'], exclusion: 'mcp-enabled', tier4: false })
    expect(readdirSync(at(FILE)), 'no store file was created at the occupied name').toEqual([])

    expect(refused(settings.write({ token: 'never' })).reason, 'every durable write answers the construction\'s refusal (guide §8.2)').toBe('FilePathUnreachable')
    expect(refused(settings.write({ exclusion: 'mcp-disabled' })).reason, 'and so does the volatile one: every later write').toBe('FilePathUnreachable')
    expect(settings.read().exclusion, 'and no pair moved').toBe('mcp-enabled')

    const off = settings.subscribe(() => { throw new Error('no instance stands, so this is never delivered') })
    expect(typeof off, 'the withdrawal a subscriber receives withdraws nothing and throws nothing').toBe('function')
    off()
    expect(readdirSync(userDataDir), 'and nothing else was created beside the occupied name').toEqual([FILE])
  })

  it('each subscription owns its own handle: two deliveries, one withdrawal withdraws one, and the delivery is the address and nothing else (interface.md §2; design.md §8)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const seen: unknown[][] = []
    const record = (...args: unknown[]): void => { seen.push(args) }
    const offA = settings.subscribe(record)
    const offB = settings.subscribe(record)

    committed(settings.write({ token: 'one' }))
    expect(seen, 'one commit, one delivery per subscription: a shared handle would collapse the two (guide §6.2)').toEqual([[RECORD], [RECORD]])

    offA()
    committed(settings.write({ token: 'two' }))
    expect(seen.length, 'the second subscription still stands, so one withdrawal did not withdraw the other').toBe(3)
    expect(seen[2], 'the one argument is the address the act touched, never the value and never which member moved (guide §6.4)').toEqual([RECORD])

    offB()
    committed(settings.write({ token: 'three' }))
    expect(seen.length, 'and after both withdrawals nothing is delivered, silently (guide §6.3)').toBe(3)

    const offC = settings.subscribe(record)
    committed(settings.write({ exclusion: 'mcp-disabled' }))
    expect(seen[3], 'the pair\'s own address rides the same one-argument form').toEqual([PAIR])
    offC()
  })

  it('a subscriber\'s throw is contained inside the module\'s own listener body at the pair\'s address too, and withdraws only that subscriber (ASM-L2-6; design.md §8)', () => {
    const settings = createOperatorSettings({ userDataDir })
    let calls = 0
    settings.subscribe(() => { calls += 1; throw new Error('boom-in-subscriber') })

    const receipt = committed(settings.write({ exclusion: 'mcp-disabled' }))
    expect(Number.isInteger(receipt.cursor), 'the mem write answers its receipt though a subscriber threw (guide §6.5a)').toBe(true)
    expect(settings.read().exclusion, 'and the pair had landed before the delivery ran').toBe('mcp-disabled')

    committed(settings.write({ exclusion: 'mcp-enabled' }))
    expect(calls, 'the throwing subscriber is withdrawn, so no later write pays its cost').toBe(1)

    const seen: unknown[][] = []
    settings.subscribe((...args: unknown[]) => { seen.push(args) })
    committed(settings.write({ token: 'after' }))
    expect(seen, 'and the registry is not wedged: a later subscription is delivered').toEqual([[RECORD]])
  })

  it('the volatile pair is never persisted: a mem write lands no byte, and the file carries no exclusion, tier4 or second address (persistence.md §6; ASM-L2-2)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'p' }))
    const stood = bytesOf(FILE)

    committed(settings.write({ exclusion: 'mcp-disabled' }))
    expect(settings.read().tier4, 'one record, two derived readings (interface.md §1)').toBe(true)
    expect(bytesOf(FILE).equals(stood), 'a mem write performs no file I/O at all').toBe(true)

    const image = bytesOf(FILE).toString('utf8')
    expect(image.includes('mcp-disabled'), 'the bytes carry no exclusion spelling (persistence.md §6, S-8)').toBe(false)
    expect(image.includes('tier4'), 'nor the derived flag').toBe(false)
    expect(image.includes('operator-exclusion'), 'nor the pair\'s address: the file is the store\'s own image (persistence.md §4)').toBe(false)
  })

  it('an entry named `__proto__` lands as an own data property and survives to the bytes and across a re-read (design.md §3; guide §10)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ entries: { ['__proto__']: { polluted: true }, kept: 1 } }))

    const entries = settings.read().entries as Record<string, unknown>
    expect(Object.prototype.hasOwnProperty.call(entries, '__proto__'), 'the map is built so the name is OWN and not the map\'s prototype (`newMap`)').toBe(true)
    expect(entries['__proto__'], 'and it carries the value that was written').toEqual({ polluted: true })
    expect(entries['kept']).toBe(1)
    expect(({} as { polluted?: boolean }).polluted, 'no prototype was polluted on the way through').toBeUndefined()

    const rebooted = createOperatorSettings({ userDataDir })
    expect(Object.prototype.hasOwnProperty.call(rebooted.read().entries, '__proto__'), 'and the name survives to the bytes and a re-read').toBe(true)
  })

  it('no call throws for any patch and any state: a patch outside the member domains answers a receipt, and the record stands (interface.md §2; design.md §1, §6)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'kept' }))
    const stood = bytesOf(FILE)

    const hostile: unknown[] = [
      null, undefined, 42, 'not-a-patch', [],
      { token: 42 }, { enabled: 'read' }, { maxJournalLength: 'x' }, { entries: 'x' }, { exclusion: 'nope' }, { exclusion: 7 },
      new Proxy({}, { get() { throw new Error('hostile-get') }, has() { throw new Error('hostile-has') } }),
    ]
    for (const [index, patch] of hostile.entries()) {
      const receipt = settings.write(patch as never)
      expect(receipt.status, `an outside patch answers a receipt, never a throw (design.md §6's one try/catch; case ${index})`).toBe('refused')
    }

    expect(settings.read().token, 'and none of them moved the record').toBe('kept')
    expect(bytesOf(FILE).equals(stood), 'nor a byte').toBe(true)

    const off = settings.subscribe(undefined as never)
    expect(typeof off, 'a subscription holding no function still answers a withdrawal and never throws').toBe('function')
    expect(committed(settings.write({ token: 'after' })).status, 'and the instance is not wedged').toBe('committed')
    off()
  })
})
