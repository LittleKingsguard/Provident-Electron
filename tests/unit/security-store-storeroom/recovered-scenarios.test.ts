// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/security-store-storeroom/recovered-scenarios.test.ts — THE AUTHORED HALF of the seven
// REQUIRED scenarios `docs/L1/security-store-storeroom-scenarios.md` §4 files, at the grain this
// row's subject asks for: THE INSTANCE'S OWN DECLARED SURFACE AND THE PRIVATE CONTRACTS L3 NAMES.
//
// THE CONTRACT, and nothing else: the register's own goal → expected wording (`-scenarios.md` §4
// items 2, 4, 6, 7 — `SC-E5-08`, `SC-E5-12`, `SC-E5-17`, `SC-E5-18`), read on
// `docs/L3/security-store-storeroom/design.md` §3 (`receiptOf`, the copy discipline), §5 (`read()`
// projects the store), §6 (one admission, members read once), §8 (the listener registry), and
// `docs/L2/security-store-storeroom/interface.md` §1-§3 and `persistence.md` §4-§5.
//
// NO RED-FIRST EVIDENCE, STATED RATHER THAN IMPLIED. These rows are authored AFTER the
// implementation and its three module batteries are green: nothing here was seen red before the
// code existed. A red row below is a FINDING against the implementation or the design, never proof
// that the row came first (`examiner.md` §3). No existing row was weakened, skipped or deleted.
//
// AUTHORED FROM THE DOCUMENTS. The implementation was read only for its exported names — a grep of
// `^export ` in `src/main/operator-settings/index.ts`, which returned exactly the names
// `signatures.md` §2 declares — and for nothing else.
//
// WHY THESE FOUR LIVE AT THE UNIT GRAIN. Each subject is the instance alone: `SC-E5-08` is one
// `write()` against a durable path that cannot accept it (`interface.md` §3 rank 15,
// `persistence.md` §5); `SC-E5-12` is the identity of a receipt object (`design.md` §3 `receiptOf`);
// `SC-E5-17` is the single-read admission (`design.md` §6); `SC-E5-18` is what a subscriber's
// `read()` sees (`design.md` §5, §8). None of the four needs a second module's entry point, which is
// what the integration half beside this file is for.
import { chmodSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createOperatorSettings, type OperatorSettingsReceipt } from '../../../src/main/operator-settings'

const FILE = 'provident-operator-settings.json' // persistence.md §1: the instance's one written name

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'security-store-recovered-unit-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

const at = (name: string): string => join(userDataDir, name)
const bytesOf = (name: string): Buffer => readFileSync(at(name))

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

/** A mutation a row attempts on a receipt it holds. A frozen or read-only receipt REFUSES it, and
 *  that is a lawful way to satisfy the scenario below: what the row claims is that the NEXT answer
 *  is unmoved, never that the first one is writable. So a throw here is contained and the claim
 *  stands on the assertion that follows (`examiner.md` §2). */
function attempt(mutation: () => void): void {
  try {
    mutation()
  } catch {
    /* contained: the claim is about the next answer, not about mutability */
  }
}

describe('security-store-storeroom · the required scenarios authored against the register', () => {
  // ── SC-E5-08 ──────────────────────────────────────────────────────────────────────────────────
  it('SC-E5-08 · a file-tier commit that cannot land is a refusal carrying the store’s own status, with the previous bytes intact (register §4 item 2; interface.md §3; persistence.md §5)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'prev' }))
    const stood = bytesOf(FILE)

    // THE PATH IS MADE UNWRITABLE AFTER THE STORE STANDS, which is the only configuration in which a
    // SAVE can fail rather than the CONSTRUCTION: a directory the store cannot occupy refuses the
    // construction itself (`interface.md` §2.1, and `operator-settings.test.ts` already drives that
    // arm). Both the file and its directory are closed, so no writer mechanism survives: an in-place
    // open is refused by the file's own mode, and a stage-and-rename is refused by the directory's
    // (`persistence.md` §5 leaves the writer's mechanism undeclared — P-4 — so the row closes both).
    chmodSync(at(FILE), 0o400)
    chmodSync(userDataDir, 0o500)
    let receipt: OperatorSettingsReceipt | undefined
    let thrown: unknown
    try {
      try {
        receipt = settings.write({ token: 'x' })
      } catch (error) {
        thrown = error
      }
      // THE ANSWER IS READ WHILE THE PATH IS STILL CLOSED, so the refusal is observed in the state
      // that produced it rather than after the row has tidied up.
      expect(thrown, 'a commit that cannot land returns a value and never throws (L1 §3, interface.md §2)').toBeUndefined()
      if (receipt === undefined) throw new Error('the write answered nothing at all; a refusal is a value on this surface')
      const refusal = refused(receipt)
      // THE REASON IS NOT PINNED TO `FileCommitFailed`. The register files that pinning it "may assert
      // an arm the package does not mint" (register §4 item 2, `examiner.md` §3), and `interface.md`
      // §3 carries the store's status verbatim under an OPEN escape arm — so the row asserts what the
      // surface declares: a non-empty store status and its own generated sentence.
      expect(typeof refusal.reason, 'the refusal carries a status word').toBe('string')
      expect(refusal.reason.length, 'and a non-empty one, the store’s own status verbatim (interface.md §3)').toBeGreaterThan(0)
      expect(typeof refusal.message, 'with the package’s generated sentence beside it').toBe('string')
      expect(refusal.message.length, 'a non-empty sentence').toBeGreaterThan(0)
    } finally {
      chmodSync(userDataDir, 0o700)
      chmodSync(at(FILE), 0o600)
    }

    expect(bytesOf(FILE).equals(stood), 'the previous bytes are byte-identical: the store’s journal rollback stands before the refusal crosses (guide §9.4, persistence.md §5)').toBe(true)
    expect(settings.read().token, 'and the record is unmoved').toBe('prev')
    expect(readdirSync(userDataDir), 'and the failed attempt left no `.tmp`, lock or sidecar behind (persistence.md §5)').toEqual([FILE])
  })

  // ── SC-E5-12 ──────────────────────────────────────────────────────────────────────────────────
  it('SC-E5-12 · a returned receipt is never the instance’s own object: two calls answer two objects, and mutating one cannot rewrite the next (register §4 item 4; interface.md §2; design.md §3)', () => {
    const settings = createOperatorSettings({ userDataDir })

    // THE REFUSED PAIR, with nothing written between them: two objects, deep-equal — `design.md` §3
    // says `receiptOf` mints per call, and the module authors the sentence for a refusal it makes
    // itself (`ASM-6`), so nothing in the pair is a figure the store mints.
    const firstRefusal = refused(settings.write({ token: 42 } as never))
    const secondRefusal = refused(settings.write({ token: 42 } as never))
    expect(firstRefusal, 'two calls answer two objects, never one shared value').not.toBe(secondRefusal)
    expect(secondRefusal, 'deep-equal when nothing was written between').toEqual(firstRefusal)
    const reasonStood = secondRefusal.reason
    const messageStood = secondRefusal.message
    attempt(() => { (firstRefusal as unknown as { status: string }).status = 'tampered' })
    attempt(() => { delete (firstRefusal as { reason?: string }).reason })
    expect(
      { status: secondRefusal.status, reason: secondRefusal.reason, message: secondRefusal.message },
      'mutating the first receipt cannot rewrite the next one’s status, reason or sentence',
    ).toEqual({ status: 'refused', reason: reasonStood, message: messageStood })

    // THE COMMITTED PAIR, where the objects differ by their own ordinals: what the row claims is that
    // the second is a VALUE the caller owns, so a mutation of the first reaches nothing.
    const firstCommit = committed(settings.write({ token: 'one' }))
    const secondCommit = committed(settings.write({ token: 'two' }))
    expect(firstCommit, 'two commits answer two objects').not.toBe(secondCommit)
    const cursorStood = secondCommit.cursor
    const opIdStood = secondCommit.opId
    attempt(() => { (firstCommit as unknown as { status: string }).status = 'tampered' })
    attempt(() => { (firstCommit as { cursor: number }).cursor = -1 })
    attempt(() => { delete (firstCommit as { opId?: string }).opId })
    expect(
      { status: secondCommit.status, cursor: secondCommit.cursor, opId: secondCommit.opId },
      'and the next committed receipt still carries its own arm, its own ordinal and its own op id',
    ).toEqual({ status: 'committed', cursor: cursorStood, opId: opIdStood })
    expect(settings.read().token, 'and a receipt handle is not a handle on the record').toBe('two')
  })

  // ── SC-E5-17 ──────────────────────────────────────────────────────────────────────────────────
  it('SC-E5-17 · a patch member that answers differently on a later read cannot defeat the admission, because the member is read exactly once (register §4 item 6; design.md §6; ADV-1)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'stood' }))

    /** Drive one two-faced accessor and read the outcome through the declared shapes: either a
     *  committed receipt whose value the record AND the durable bytes carry, or a refusal that moved
     *  nothing and touched no byte — never a committed receipt over a value the bytes do not hold.
     *  The durability half is read the way `persistence.md` §4 requires — never by parsing the store's
     *  image — as a FRESH CONSTRUCTION over the same directory serving the same member. */
    function drive(arm: string, patch: Record<string, unknown>, reads: () => number, expected: unknown, member: (product: ReturnType<typeof createOperatorSettings>) => unknown): void {
      const before = bytesOf(FILE)
      const stood = (product: ReturnType<typeof createOperatorSettings>): unknown[] => [product.read().token, product.read().maxJournalLength, product.read().enabled]
      const beforeRecord = stood(settings)
      const receipt = settings.write(patch as never)
      expect(reads(), `${arm}: the member is read exactly once, so one call cannot admit one value and write another (design.md §6)`).toBe(1)
      if (receipt.status === 'committed') {
        expect(member(settings), `${arm}: a commit serves the value the single admission saw`).toBe(expected)
        const rebooted = createOperatorSettings({ userDataDir })
        expect(member(rebooted), `${arm}: and the durable bytes carry it, so a fresh construction over that directory serves the same value (persistence.md §4)`).toBe(expected)
      } else {
        expect(stood(settings), `${arm}: a refusal moved neither the record’s token, its cap nor its grants`).toEqual(beforeRecord)
        expect(bytesOf(FILE).equals(before), `${arm}: and touched no byte (guide §9.4)`).toBe(true)
      }
    }

    let tokenReads = 0
    const tokenPatch: Record<string, unknown> = {}
    Object.defineProperty(tokenPatch, 'token', {
      enumerable: true,
      configurable: true,
      get(): unknown {
        tokenReads += 1
        return tokenReads === 1 ? 'NEW' : 10n
      },
    })
    drive('the `token` accessor (a later read answers a BigInt)', tokenPatch, () => tokenReads, 'NEW', (product) => product.read().token)

    let capReads = 0
    const capPatch: Record<string, unknown> = {}
    Object.defineProperty(capPatch, 'maxJournalLength', {
      enumerable: true,
      configurable: true,
      get(): unknown {
        capReads += 1
        return capReads === 1 ? 42 : Number.POSITIVE_INFINITY
      },
    })
    drive('the `maxJournalLength` accessor (a later read answers `Infinity`)', capPatch, () => capReads, 42, (product) => product.read().maxJournalLength)
  })

  // ── SC-E5-18 ──────────────────────────────────────────────────────────────────────────────────
  it('SC-E5-18 · a read taken during a write never observes a half-applied record (register §4 item 7; interface.md §1; design.md §5, §8)', () => {
    const settings = createOperatorSettings({ userDataDir })
    committed(settings.write({ token: 'before' }))
    expect(settings.read().token, 'a read taken before the write returns serves the pre-write record').toBe('before')

    // THE ONE POINT THE DESIGN GIVES A READER INSIDE THE WRITE: the delivery, which the package runs
    // AFTER the constraint pass and AFTER the file-tier save (guide §9, D-55). No second reader can be
    // put inside the store's own window from outside it — the store owns that window and this layer
    // declares no lock (`interface.md` §1, `persistence.md` §5) — and this row says so rather than
    // implying it observed one.
    const seen: Array<{ token: string | null; maxJournalLength: number | undefined }> = []
    const off = settings.subscribe(() => {
      const record = settings.read()
      seen.push({ token: record.token, maxJournalLength: record.maxJournalLength })
    })
    committed(settings.write({ token: 'after', maxJournalLength: 7 }))
    expect(
      seen,
      'the delivery serves the COMMITTED post-state — never the pre-write record, never a candidate value, and never a half-applied pair',
    ).toEqual([{ token: 'after', maxJournalLength: 7 }])

    // THE VOLATILE PAIR IS ITS OWN ADDRESS AND ITS OWN DELIVERY, and the same claim holds there: the
    // pair a subscriber reads is the pair the commit landed, not the safe pair it booted to
    // (`interface.md` §1 ASM-L2-1).
    const pairs: string[] = []
    const offPair = settings.subscribe(() => { pairs.push(settings.read().exclusion) })
    committed(settings.write({ exclusion: 'mcp-disabled' }))
    expect(pairs, 'the pair’s own delivery serves the landed literal, never the pre-write one').toEqual(['mcp-disabled'])

    off()
    offPair()
    expect(settings.read().token, 'and after the deliveries the record still serves the committed value').toBe('after')
  })
})
