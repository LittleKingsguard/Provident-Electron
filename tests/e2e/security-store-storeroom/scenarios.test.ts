// tests/e2e/security-store-storeroom/scenarios.test.ts — THE L1 BATTERY for
// `security-store-storeroom`: the twelve e2e scenarios of `docs/L1/security-store-storeroom.md` §8,
// part 1 — S-1..S-9 and S-12, the operator's and the agent's own drives.
//
// THE GRAIN IS THE ENTRY POINT, NOT THE UNIT ROW. Each row here drives a module through the factory
// its L2/L3 declaration publishes (`createOperatorSettings`, `createSettingsSurface` + `attach`) or
// through the real `ProvidentMcpServer` the composition site hands it, and the observable is exactly
// what §8's "Expected" column says — nothing finer and nothing wider (`docs/L1/
// security-store-storeroom.md` §8; D-17, D-18; L1 §2's claim that `tests/e2e/` is L1's own artifact
// and is claimed by no module). The four rows whose subject also stands in a covered recovered
// scenario — S-1 `≈ SC-E5-01`, S-2 `≈ SC-E5-05`, S-3 `≈ SC-E5-07`, S-4 `≈ SC-E5-02` — are AUTHORED
// HERE ANYWAY, not cited: the e2e grain is the entry point and the unit row is not (D-10,
// `-scenarios.md` §4's closing paragraph).
//
// NO RED-FIRST EVIDENCE, STATED RATHER THAN IMPLIED. This battery is authored after the
// implementation and after both module batteries are green, so no row here was ever seen red before
// the code existed. A red row below is a FINDING against the implementation or the design, never
// evidence about ordering (`examiner.md` §3). No existing row was weakened, skipped or deleted.
//
// AUTHORED FROM THE DOCUMENTS: L1 §8's twelve expectations, read on `interface.md` §2/§2.1/§5,
// `behaviour.md` §1-§10 and `persistence.md` §1-§6. The implementation was read only for exported
// names (a grep of `^export ` in the two module entry files), and no assertion was chosen from it.
// THE ENVELOPE LIMIT: `npm test` runs under a layout-less node DOM shim with no window, no IPC and no
// transport (`strata/brief.md` §6), so "the next process" is a second construction over the same
// directory and a real Electron restart, a real bridge hop and a rendered view stay app-green.
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { createOperatorSettings, type OperatorSettingsRecord, type OperatorSettingsReceipt } from '../../../src/main/operator-settings'
import { SecurityGate } from '../../../src/main/security.js'
import { createSettingsSurface } from '../../../src/main/settings-surface'

const OPERATOR_FILE = 'provident-operator-settings.json' // persistence.md §1: the instance's one name
const RETIRED_FILE = 'provident-security.json' // persistence.md §1: read once, never written again
const RECORD_ADDRESS = ['operator-settings'] // interface.md §1: the durable address

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'security-store-e2e-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

const at = (name: string): string => join(userDataDir, name)
const bytesOf = (name: string): Buffer => readFileSync(at(name))
const newDir = (label: string): string => mkdtempSync(join(tmpdir(), `security-store-e2e-${label}-`))

type Committed = { status: 'committed'; cursor: number; opId: string }
type Refused = { status: 'refused'; reason: string; message: string; address: unknown }

function committed(receipt: OperatorSettingsReceipt): Committed {
  if (receipt.status !== 'committed') throw new Error(`expected a committed receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

function refused(receipt: OperatorSettingsReceipt): Refused {
  if (receipt.status !== 'refused') throw new Error(`expected a refused receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

/** The first-run default exactly as `behaviour.md` §1 declares it (`interface.md` §2). */
const FIRST_RUN = {
  token: null,
  enabled: ['read', 'dispatch'],
  maxJournalLength: undefined,
  entries: undefined,
  exclusion: 'mcp-enabled',
  tier4: false,
}

const view = (record: OperatorSettingsRecord): Record<string, unknown> => ({
  token: record.token,
  enabled: record.enabled,
  maxJournalLength: record.maxJournalLength,
  entries: record.entries,
  exclusion: record.exclusion,
  tier4: record.tier4,
})

const backend: McpBackend = { invoke: async () => ({}) }

/** The live gate the composition site hands `attach` (`src/main/main.ts` constructs exactly this). */
function liveServer(): ProvidentMcpServer {
  return new ProvidentMcpServer({ backend, gate: new SecurityGate({ token: null, enabled: ['read', 'dispatch'] }), transport: 'stdio' })
}

describe('security-store-storeroom · the twelve L1 scenarios through their declared entry points', () => {
  it('S-1 · the instance boots over no file: the first-run default is served, its file carries the two creation records the boot saves, and no provident-security.json is written', () => {
    const settings = createOperatorSettings({ userDataDir })
    expect(view(settings.read()), 'the first-run default, and the safe pair beside it').toEqual(FIRST_RUN)
    expect(existsSync(at(OPERATOR_FILE)), 'the store’s construction created the instance’s own file (interface.md §2.1)').toBe(true)
    // **THE FILE IS NO LONGER ZERO-LENGTH: THE BOOT SAVES WHAT ITS DECLARATIONS LAND** (measured 2026-11-03 on the
    // installed `1.9.1`). `guide §9.1`'s zero-length creation is the reading of its own date and is superseded by
    // measurement — the record address's creation repair writes `FIRST_RUN`'s image, the row-list address's writes the
    // absent arm, and each write is settled into the file at the member that lands it. The whole image is asserted, so
    // a record that drifted cannot pass on a length.
    expect(readFileSync(at(OPERATOR_FILE), 'utf8'), 'and it carries exactly the two creation records, in the store’s own bytes').toBe(
      '{"operator-app-state":{"legacy":"absent","rows":[],"unrepresentable":[]},"operator-settings":{"enabled":["read","dispatch"]}}',
    )
    expect(existsSync(at(RETIRED_FILE)), 'the retired name is not created by the absent import arm (D-19)').toBe(false)
    expect(readdirSync(userDataDir), 'and nothing stands beside the file: no `.tmp`, no lock, no sidecar (persistence.md §5)').toEqual([OPERATOR_FILE])
  })

  it('S-2 · one committed write is one commit: one receipt with one cursor and one op id, the read serves it, and no second name appears', () => {
    const settings = createOperatorSettings({ userDataDir })
    const receipt = committed(settings.write({ token: 'tok' }))
    expect(Object.keys(receipt).sort(), 'one receipt, carrying exactly the three members `interface.md` §2 declares for the committed arm').toEqual(['cursor', 'opId', 'status'])
    expect(Number.isInteger(receipt.cursor), 'one cursor, the store’s own ordinal, asserted as an integer and never by its absolute origin (ASM-L2-7)').toBe(true)
    expect(receipt.opId.length, 'one op id, and a non-empty one').toBeGreaterThan(0)
    expect(settings.read().token, 'and the read serves what the commit landed').toBe('tok')
    expect(readdirSync(userDataDir), 'no `.tmp`, no lock and no sidecar stands beside the file after a commit (persistence.md §5)').toEqual([OPERATOR_FILE])
  })

  it('S-3 · a refusal leaves the previous bytes: a refused value naming the store’s own status, an unchanged read, and a byte-identical file', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'prev', maxJournalLength: 9 }))
    const stood = bytesOf(OPERATOR_FILE)
    const receipt = refused(settings.write({ entries: { bad: undefined } }))
    expect(typeof receipt.reason, 'the refusal names the store’s own status verbatim, under the open escape arm (interface.md §3)').toBe('string')
    expect(receipt.reason.length, 'and a non-empty status word').toBeGreaterThan(0)
    expect(typeof receipt.message, 'with the package’s generated sentence').toBe('string')
    expect({ token: settings.read().token, maxJournalLength: settings.read().maxJournalLength }, 'the read is unchanged').toEqual({ token: 'prev', maxJournalLength: 9 })
    expect(bytesOf(OPERATOR_FILE).equals(stood), 'and the file is byte-identical: a refusal mints no cursor and adds no change (guide §9.4)').toBe(true)
  })

  it('S-4 · the next boot serves the same record: grants and cap survive, and the exclusion pair re-boots to its declared initial', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'tok', enabled: ['graph', 'read'], maxJournalLength: 11 }))
    committed(settings.write({ exclusion: 'mcp-disabled' }))
    const before = settings.read()
    expect({ exclusion: before.exclusion, tier4: before.tier4 }, 'the pair stands where the last transition left it').toEqual({ exclusion: 'mcp-disabled', tier4: true })

    // "The next process" at the envelope grain: a second construction over the same directory, which
    // is what `guide §9.1` declares; a real Electron restart is app-green (`brief.md` §6).
    const rebooted = createOperatorSettings({ userDataDir })
    expect({ token: rebooted.read().token, enabled: rebooted.read().enabled, maxJournalLength: rebooted.read().maxJournalLength }, 'the identical read: the grants and the cap survive the reconstruction (D-17)').toEqual({ token: 'tok', enabled: ['graph', 'read'], maxJournalLength: 11 })
    expect({ exclusion: rebooted.read().exclusion, tier4: rebooted.read().tier4 }, 'and the pair re-boots to its declared initial, because it was never persisted (ASM-L2-2)').toEqual({ exclusion: 'mcp-enabled', tier4: false })
  })

  it('S-5 · a listener is the change path: the commit delivers the subscription and the live gate is re-patched inside it, never by a poll', () => {
    // HALF ONE — the instance's own change path: the delivered argument is the triggering address and
    // nothing else, delivered inside the write's own call (`behaviour.md` §5; guide §6.4).
    const instanceDir = newDir('s5-instance')
    try {
      const settings = createOperatorSettings({ userDataDir: instanceDir })
      const delivered: unknown[] = []
      const off = settings.subscribe((address) => { delivered.push(address) })
      committed(settings.write({ token: 'x' }))
      expect(delivered, 'a committed write delivers the subscription with the record’s own address').toEqual([RECORD_ADDRESS])
      off()
    } finally {
      rmSync(instanceDir, { recursive: true, force: true })
    }

    // HALF TWO — the operator's surface entry point and the live gate it attaches: the grant is at the
    // gate when the answer is minted, because the re-patch runs inside the listener (D-17; L1 §4).
    const server = liveServer()
    const surface = createSettingsSurface({ userDataDir })
    surface.attach(server)
    expect([...server.getGateConfig().enabled].sort(), 'attach lands the record the surface finds').toEqual(['dispatch', 'read'])

    const answer = surface.set({ groups: ['graph'] })
    expect(answer.write.status, 'the settings write commits on the operator’s channel').toBe('committed')
    expect([...server.getGateConfig().enabled].sort(), 'and the gate already holds the grant when the answer is minted: the re-patch is the listener’s, inside the write').toEqual(['dispatch', 'graph', 'read'])

    const held = [...server.getGateConfig().enabled].sort()
    surface.read()
    surface.read()
    expect([...server.getGateConfig().enabled].sort(), 'reads alone patch nothing: there is no poll and no boot-order re-read to move the gate (D-17)').toEqual(held)
  })

  it('S-6 · a listener’s throw cannot take the write’s answer away: the write whose listener throws still answers its receipt', () => {
    const settings = createOperatorSettings({ userDataDir })
    let calls = 0
    settings.subscribe(() => {
      calls += 1
      throw new Error('e2e-listener-throw')
    })

    let receipt: OperatorSettingsReceipt | undefined
    let thrown: unknown
    try {
      receipt = settings.write({ token: 'y' })
    } catch (error) {
      thrown = error
    }
    expect(thrown, 'every listener body contains its own refusal, so no throw crosses the write (ASM-L2-6; guide §6.5a)').toBeUndefined()
    if (receipt === undefined) throw new Error('the write answered nothing at all')
    const answered = committed(receipt)
    expect(Number.isInteger(answered.cursor), 'the write answers its receipt though a subscriber threw').toBe(true)
    expect(settings.read().token, 'and the data had already landed, so the read serves it').toBe('y')
    expect(calls, 'the throwing subscriber was delivered exactly once, and then withdrawn').toBe(1)
  })

  it('S-7 · the import carries its own red set: a token, three grants, a cap and one entry all survive the crossing (D-19)', () => {
    const seed = JSON.stringify({ token: 'tok', enabled: ['graph', 'read', 'module'], maxJournalLength: 9, 'x-kept': { a: 1 } })
    writeFileSync(at(RETIRED_FILE), seed)

    const settings = createOperatorSettings({ userDataDir })
    const record = settings.read()
    expect(record.token, 'the operator’s token survives').toBe('tok')
    expect(record.enabled, 'the three grants survive, deduplicated and in the seed’s own order (A-5)').toEqual(['graph', 'read', 'module'])
    expect(record.maxJournalLength, 'the cap survives').toBe(9)
    expect(record.entries, 'and an arbitrary entry lands verbatim in `entries` (D-16 behaviour carried)').toEqual({ 'x-kept': { a: 1 } })

    // The operator's own entry point serves the three members the carrier carries — `entries` is not on
    // it (`interface.md` §5), and the import re-runs while the record address carries nothing
    // (`persistence.md` §3), so a second boot imports the same record.
    const carrier = createSettingsSurface({ userDataDir }).read()
    expect({ token: carrier.token, enabled: carrier.enabled, maxJournalLength: carrier.maxJournalLength }).toEqual({ token: 'tok', enabled: ['graph', 'read', 'module'], maxJournalLength: 9 })
  })

  it('S-8 · the import’s absent and corrupt arms: each imports the first-run default, throws nothing, and leaves the bytes untouched (D-19)', () => {
    const arms: Array<{ label: string; seed: (dir: string) => void; bytes?: string }> = [
      { label: 'absent', seed: () => {} },
      { label: 'unparsable', seed: (dir) => writeFileSync(join(dir, RETIRED_FILE), '{"token":"tok",'), bytes: '{"token":"tok",' },
      { label: 'non-object', seed: (dir) => writeFileSync(join(dir, RETIRED_FILE), '[1,2,3]'), bytes: '[1,2,3]' },
      { label: 'directory-shaped', seed: (dir) => mkdirSync(join(dir, RETIRED_FILE), { recursive: true }) },
    ]

    for (const arm of arms) {
      const dir = newDir(`s8-${arm.label}`)
      try {
        arm.seed(dir)
        let settings: ReturnType<typeof createOperatorSettings> | undefined
        let thrown: unknown
        try {
          settings = createOperatorSettings({ userDataDir: dir })
        } catch (error) {
          thrown = error
        }
        expect(thrown, `S-8/${arm.label}: the import never throws (interface.md §2.1)`).toBeUndefined()
        if (settings === undefined) throw new Error(`S-8/${arm.label}: no instance was constructed`)
        expect(view(settings.read()), `S-8/${arm.label}: the first-run default`).toEqual(FIRST_RUN)
        if (arm.bytes !== undefined) {
          expect(readFileSync(join(dir, RETIRED_FILE)).toString('utf8'), `S-8/${arm.label}: the seeded bytes are untouched`).toBe(arm.bytes)
        }
        expect(existsSync(join(dir, OPERATOR_FILE)), `S-8/${arm.label}: the new name is created by the store, and the import created no byte`).toBe(true)
      } finally {
        rmSync(dir, { recursive: true, force: true })
      }
    }
  })

  it('S-9 · the old name is never written: after the import and three committed writes it is byte-identical to its seed, and the new name carries the record (D-19)', () => {
    const seed = JSON.stringify({ token: 'tok', enabled: ['graph'], maxJournalLength: 5, 'x-kept': { a: 1 } })
    writeFileSync(at(RETIRED_FILE), seed)

    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'one' }))
    committed(settings.write({ enabled: ['read', 'graph'] }))
    committed(settings.write({ maxJournalLength: 21 }))

    expect(bytesOf(RETIRED_FILE).toString('utf8'), 'three commits later the retired name is byte-identical to its seed: retired, not written').toBe(seed)
    expect(readdirSync(userDataDir).sort(), 'and no third name appeared beside the two').toEqual([OPERATOR_FILE, RETIRED_FILE].sort())

    const rebooted = createOperatorSettings({ userDataDir })
    expect({ token: rebooted.read().token, enabled: rebooted.read().enabled, maxJournalLength: rebooted.read().maxJournalLength }, 'the new name carries the record: the written state, not the seed').toEqual({ token: 'one', enabled: ['read', 'graph'], maxJournalLength: 21 })
  })

  it('S-12 · two profiles are disjoint: a write through one is never served by the other, and the group set is six in both', () => {
    const other = newDir('s12-other')
    try {
      const a = createOperatorSettings({ userDataDir })
      const b = createOperatorSettings({ userDataDir: other })
      committed(a.write({ token: 'only-a' }))
      expect(a.read().token, 'the first profile serves its own write').toBe('only-a')
      expect(b.read().token, 'and the second never serves it').toBeNull()

      const six = ['read', 'dispatch', 'graph', 'code', 'module', 'data']
      committed(a.write({ enabled: six }))
      committed(b.write({ enabled: [...six].reverse() }))
      expect(a.read().enabled, 'each instance carries the six-member group set and admits every member').toEqual(six)
      expect(b.read().enabled, 'in its own caller’s order, so a shared table or a shared instance fails here').toEqual([...six].reverse())
      expect(existsSync(join(other, OPERATOR_FILE)), 'two profiles, two files (persistence.md §8)').toBe(true)
    } finally {
      rmSync(other, { recursive: true, force: true })
    }
  })
})
