// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/integration/security-store-storeroom/recovered-scenarios.test.ts — THE AUTHORED HALF of the
// seven REQUIRED scenarios `docs/L1/security-store-storeroom-scenarios.md` §4 files, at the grain this
// row's subject asks for: THE CARRIER AND THE INSTANCE TOGETHER.
//
// THE CONTRACT, and nothing else: the register's own goal → expected wording (`-scenarios.md` §4 item
// 1 `SC-E5-03`, item 3 `SC-E5-09`, item 5 `SC-E5-15`), read on `docs/L2/security-store-storeroom/
// interface.md` §2/§2.1/§3, `behaviour.md` §1-§4/§10, `persistence.md` §2-§5, and L1 §3's receipt
// vocabulary. The subject is the real `createOperatorSettings` and the real `createSettingsSurface`
// over the real `provident-storeroom` instance: no mock, no stub, no substitute (`examiner.md` §2).
//
// NO RED-FIRST EVIDENCE, STATED RATHER THAN IMPLIED. These rows are authored AFTER the
// implementation and its three module batteries are green, so nothing here was ever seen red before
// the code existed. What that costs is stated plainly: a row of this file that is red on its first
// run is a FINDING against the implementation or the design, never evidence that the row came first
// (`examiner.md` §3). No existing row was weakened, skipped or deleted to make room for these.
//
// AUTHORED FROM THE DOCUMENTS. The implementation was read only for its exported names — a grep of
// `^export ` in `src/main/operator-settings/index.ts` and `src/main/settings-surface/index.ts`, which
// returned exactly the names `signatures.md` §2/§3 declares — and for nothing else. No assertion
// below was chosen by reading the code under test.
//
// WHY THESE THREE LIVE AT THE INTEGRATION GRAIN, where the register's cites reach both modules:
//   · `SC-E5-03` is a construction act over a real profile directory whose expected answer is the
//     record the whole unit serves at boot, and whose bound is a package fact (`persistence.md` §9
//     P-1) — the boot grain `instance.test.ts` already owns.
//   · `SC-E5-09`'s closure spans the instance's `write()` receipts (commit, value refusal,
//     construction refusal, malformed patch) AND the carrier's `tier4-closed` read token at the
//     surface module (`behaviour.md` §10), so the one row that asserts "one refusal has one
//     spelling" has to hold both entry points.
//   · `SC-E5-15`'s expected crosses the write, the record, the file's bytes and a second
//     construction over the same directory — the restart grain.
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { createOperatorSettings, type OperatorSettingsReceipt } from '../../../src/main/operator-settings'
import { SecurityGate } from '../../../src/main/security.js'
import { createSettingsSurface } from '../../../src/main/settings-surface'

const OPERATOR_FILE = 'provident-operator-settings.json' // persistence.md §1: the one written name
const RETIRED_FILE = 'provident-security.json' // persistence.md §1: read once, never written again

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'security-store-recovered-int-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

const at = (name: string): string => join(userDataDir, name)
const bytesOf = (name: string): Buffer => readFileSync(at(name))
const image = (name: string): string => bytesOf(name).toString('utf8')

function committed(receipt: OperatorSettingsReceipt): { status: 'committed'; cursor: number; opId: string } {
  if (receipt.status !== 'committed') throw new Error(`expected a committed receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

function refused(receipt: OperatorSettingsReceipt): { status: 'refused'; reason: string; message: string; address: unknown } {
  if (receipt.status !== 'refused') throw new Error(`expected a refused receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

/** The first-run default, exactly as `interface.md` §2 and `behaviour.md` §1 declare it: `token:null`,
 *  `['read','dispatch']`, no cap, no `entries`, and the safe pair. */
const FIRST_RUN = {
  token: null,
  enabled: ['read', 'dispatch'],
  maxJournalLength: undefined,
  entries: undefined,
  exclusion: 'mcp-enabled',
  tier4: false,
}

function projection(record: ReturnType<ReturnType<typeof createOperatorSettings>['read']>): Record<string, unknown> {
  return {
    token: record.token,
    enabled: record.enabled,
    maxJournalLength: record.maxJournalLength,
    entries: record.entries,
    exclusion: record.exclusion,
    tier4: record.tier4,
  }
}

const backend: McpBackend = { invoke: async () => ({}) }

describe('security-store-storeroom · the required scenarios authored against the register', () => {
  // ── SC-E5-03 ──────────────────────────────────────────────────────────────────────────────────
  it('SC-E5-03 · a corrupt or wrongly-shaped record at boot serves the first-run default and throws nothing (register §4 item 1; persistence.md §2-§3)', () => {
    // THE TORN ARM'S SEED IS A REAL IMAGE, cut in half: a prefix of bytes the store itself wrote is
    // the only torn shape this layer can produce without inventing the store's format
    // (persistence.md §4: the file is the store's own register image, and this module parses none of it).
    const imageDir = mkdtempSync(join(tmpdir(), 'security-store-recovered-image-'))
    let torn: Buffer
    try {
      const source = createOperatorSettings({ userDataDir: imageDir })
      committed(source.write({ token: 'tok' }))
      const full = readFileSync(join(imageDir, OPERATOR_FILE))
      expect(full.length, 'the row needs a non-empty image to tear').toBeGreaterThan(1)
      torn = full.subarray(0, Math.max(1, Math.floor(full.length / 2)))
    } finally {
      rmSync(imageDir, { recursive: true, force: true })
    }

    const seeds: Array<{ label: string; write: (dir: string) => void }> = [
      { label: 'unparsable bytes', write: (dir) => writeFileSync(join(dir, OPERATOR_FILE), '{"operator-settings":') },
      { label: 'a torn prefix of the store’s own image', write: (dir) => writeFileSync(join(dir, OPERATOR_FILE), torn) },
      { label: 'a zero-length file (the second boot of an instance that never wrote)', write: (dir) => writeFileSync(join(dir, OPERATOR_FILE), '') },
      { label: 'a wrongly-shaped object', write: (dir) => writeFileSync(join(dir, OPERATOR_FILE), JSON.stringify({ token: 42, enabled: 'read' })) },
    ]

    for (const seed of seeds) {
      const dir = mkdtempSync(join(tmpdir(), 'security-store-recovered-corrupt-'))
      try {
        seed.write(dir)
        let settings: ReturnType<typeof createOperatorSettings> | undefined
        let thrown: unknown
        try {
          settings = createOperatorSettings({ userDataDir: dir })
        } catch (error) {
          thrown = error
        }
        expect(thrown, `SC-E5-03/${seed.label}: the boot throws nothing, whatever the bytes are (L1 §5, D-19)`).toBeUndefined()
        if (settings === undefined) throw new Error(`SC-E5-03/${seed.label}: no instance was constructed and no error was thrown`)
        // THE ROW'S OWN STATED BOUND: the boot over bytes that are not the store's image has NO
        // declared answer (persistence.md §9 P-1), so this row asserts only what the module declares —
        // the first-run default and no throw — and never a store status the package does not publish.
        expect(projection(settings.read()), `SC-E5-03/${seed.label}: the first-run default, and the safe pair beside it (persistence.md §2, interface.md §2)`).toEqual(FIRST_RUN)
        expect(readdirSync(dir), `SC-E5-03/${seed.label}: no repair, no second name, no sidecar appears beside the damaged file (persistence.md §5)`).toEqual([OPERATOR_FILE])
      } finally {
        rmSync(dir, { recursive: true, force: true })
      }
    }
  })

  // ── SC-E5-09 ──────────────────────────────────────────────────────────────────────────────────
  it('SC-E5-09 · the write-outcome vocabulary is closed: two statuses, their declared members, and the retired tokens are not write outcomes (register §4 item 3; interface.md §3; D-16)', () => {
    const answers: OperatorSettingsReceipt[] = []

    // (a) A COMMIT — one receipt carrying the store's own ordinal and op id, and no refusal member.
    const settings = createOperatorSettings({ userDataDir })
    const commit = settings.write({ token: 'x' })
    answers.push(commit)
    const committedReceipt = committed(commit)
    expect(Number.isInteger(committedReceipt.cursor), 'a committed answer carries `cursor` (interface.md §2)').toBe(true)
    expect(committedReceipt.opId.length, 'and `opId`').toBeGreaterThan(0)
    expect('reason' in commit, 'and no `reason`: the two arms do not share a member set (interface.md §2)').toBe(false)
    expect('message' in commit, 'and no `message`').toBe(false)

    // (b) A VALUE REFUSAL — the module's own admission, and the store walk's.
    answers.push(settings.write({ entries: { bad: undefined } }))

    // (c) A CONSTRUCTION REFUSAL — no instance stands, so every later write answers it.
    const occupied = mkdtempSync(join(tmpdir(), 'security-store-recovered-occupied-'))
    try {
      mkdirSync(join(occupied, OPERATOR_FILE))
      answers.push(createOperatorSettings({ userDataDir: occupied }).write({ token: 'never' }))
    } finally {
      rmSync(occupied, { recursive: true, force: true })
    }

    // (d) A MALFORMED PATCH — not a plain object, a member outside its domain, and a patch naming
    // both tiers (`interface.md` §1 ASM-L2-5, design.md §6).
    answers.push(settings.write(null as never))
    answers.push(settings.write({ token: 42 } as never))
    answers.push(settings.write({ token: 'both', exclusion: 'mcp-disabled' } as never))

    // THE CLOSURE ITSELF: every answer's `status` is one of exactly two words, and each refusal
    // names the store's own status and a sentence (register §4 item 3; interface.md §3).
    for (const [index, answer] of answers.entries()) {
      expect(['committed', 'refused'], `answer ${index} carries one of exactly two statuses`).toContain(answer.status)
      if (answer.status === 'refused') {
        expect(typeof answer.reason, `answer ${index}: a refusal carries \`reason\`, the store's own status verbatim`).toBe('string')
        expect(answer.reason.length, `answer ${index}: and a non-empty one`).toBeGreaterThan(0)
        expect(typeof answer.message, `answer ${index}: and the package's generated sentence`).toBe('string')
        expect(answer.message.length, `answer ${index}: a non-empty sentence`).toBeGreaterThan(0)
        expect('address' in answer, `answer ${index}: and the declared fourth member, \`null\` where nothing is nameable (interface.md §2)`).toBe(true)
      }
    }

    // NO THIRD STATUS, AND NO RETIRED TOKEN AS A WRITE OUTCOME (D-16): `'write-failed'` died with the
    // displaced store, and `'tier4-closed'` survives only as the carrier's READ token.
    for (const [index, answer] of answers.entries()) {
      expect(answer.status, `answer ${index}: no third status exists`).not.toBe('write-failed' as never)
      expect(answer.status, `answer ${index}: and the tier-4 token is not a write outcome`).not.toBe('tier4-closed' as never)
      if (answer.status === 'refused') {
        expect(answer.reason, `answer ${index}: the retired token is not a refusal reason either`).not.toBe('write-failed')
        expect(answer.reason, `answer ${index}: nor is the read token`).not.toBe('tier4-closed')
      }
    }

    // THE POSITIVE HALF THE CLOSURE NEEDS, over the surface entry point: with the pair standing
    // open, the token IS the carrier's read answer and the write still commits — one vocabulary,
    // two directions, never one word doing both jobs (behaviour.md §10; D-16).
    const surfaceDir = mkdtempSync(join(tmpdir(), 'security-store-recovered-vocab-'))
    try {
      const server = new ProvidentMcpServer({ backend, gate: new SecurityGate({ token: null, enabled: ['read', 'dispatch'] }), transport: 'stdio' })
      const surface = createSettingsSurface({ userDataDir: surfaceDir })
      surface.attach(server)
      expect(surface.transition('mcp-disabled').applied, 'the pair stands open').toBe(true)
      const carrier = surface.read()
      expect(carrier.read, 'the tier-4 token rides the READ answer as its closed value').toEqual({ status: 'refused', reason: 'tier4-closed', message: expect.any(String) })
      const written = surface.set({ token: 'while-open' }).write
      expect(written.status, 'and the same state’s write answer is `committed`: the token is never a write outcome (D-16)').toBe('committed')
    } finally {
      rmSync(surfaceDir, { recursive: true, force: true })
    }
  })

  // ── SC-E5-15 ──────────────────────────────────────────────────────────────────────────────────
  it('SC-E5-15 · the operator clears the token and it stays cleared across a restart, and an absent member keeps the record (register §4 item 5; interface.md §2; persistence.md §4)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 't' }))
    expect(settings.read().token, 'the token is set verbatim').toBe('t')

    const clearing = settings.write({ token: null })
    expect(clearing.status, 'the clear is a commit, not a refusal: `null` is the declared clear marker (interface.md §2)').toBe('committed')
    expect(settings.read().token, 'and the record no longer serves a token').toBeNull()

    // A CLEARED MEMBER IS STORED AS ITS ABSENCE, not as `null` (interface.md §2, persistence.md §4):
    // the package's walk refuses `null` anywhere in a value, so a stored `null` could not have
    // committed at all — the bytes are read as bytes and never parsed (persistence.md §4).
    expect(image(OPERATOR_FILE).includes('token'), 'the file’s bytes carry no `token` member once it is cleared').toBe(false)

    const rebooted = createOperatorSettings({ userDataDir })
    expect(rebooted.read().token, 'a fresh construction over that directory still serves `null`').toBeNull()

    // `write({})` — the register's absent-member arm: whatever status it answers, the record stands.
    committed(rebooted.write({ token: 'kept', maxJournalLength: 12 }))
    const beforeAbsent = image(OPERATOR_FILE)
    const absent = rebooted.write({})
    expect(['committed', 'refused'], 'an empty patch answers one of the two declared statuses').toContain(absent.status)
    expect(
      { token: rebooted.read().token, enabled: rebooted.read().enabled, maxJournalLength: rebooted.read().maxJournalLength },
      'and the absent-member patch leaves the token, the grants and the cap exactly as they stood',
    ).toEqual({ token: 'kept', enabled: ['read', 'dispatch'], maxJournalLength: 12 })
    expect(image(OPERATOR_FILE), 'with the durable bytes unmoved, whether it committed or refused').toBe(beforeAbsent)

    // THE LANDED `token:''`-CLEARS ARM IS NOT DRIVEN HERE, and the reason is recorded rather than
    // skipped silently: the register files it conditionally ("if the implemented domain admits it"),
    // and the declared domain is `string | null` with `null` as the clear marker (`interface.md` §2,
    // `design.md` §6) — no document in L2 or L3 declares that `''` clears. Authoring that arm would
    // assert a rule this layer's documentation does not carry; it is owed to the document that
    // declares it (`examiner.md` §3).
  })
})
