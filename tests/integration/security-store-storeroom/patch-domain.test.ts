// tests/integration/security-store-storeroom/patch-domain.test.ts — THE TWO CLAIMS THE L2 DOCUMENTS
// NAME AS OWED, authored at the grain each document declares them: the empty patch's refusal
// (behaviour.md §4, interface.md §1/§2) and the journal cap's sign rule (behaviour.md §2,
// interface.md §2).
//
// WHY THIS FILE EXISTS AT ALL, stated rather than implied: both claims were already "driven" by rows
// that could not fail. `SC-E5-15` writes `{}` and asserts only that the status is one of the two
// declared words — *"whatever status it answers"* — so a refusal and a commit both satisfied it
// (behaviour.md §4 names that as the debt); and the cap row drove `NaN` and `+Infinity` while leaving
// `-Infinity` — the arm the sign rule turns on — entirely undriven (behaviour.md §2 names that arm as
// unasserted). A row whose expectation either answer satisfies measures nothing (D-1 §4;
// `examiner.md` §2).
//
// NO MARKER, AND THE ABSENCE IS THE DECLARATION (D-40): this file is authored after D-30's sweep, so
// it is new evidence and it gates. It carries no `// strata:marked-file`, and the mark is not inherited
// from the directory `tests/integration/security-store-storeroom/` (D-40) — the three marked files
// beside it stay ON NOTICE, this one does not.
//
// THE CONTRACT, and nothing else: interface.md §1's patch domain (a patch names one tier's members, at
// least one), §2's cap clause and its check ORDER, §3's `ValueRefusedAtBoundary` row; behaviour.md §2's
// cap row and §4's empty-patch row; persistence.md §4 (a cleared member is stored as its absence) and
// §5 (a refusal leaves the bytes as they stood). The subject is the real `createOperatorSettings` and
// the real `createSettingsSurface` over the real `provident-storeroom` instance: no mock, no stub, no
// substitute (`examiner.md` §2).
//
// WHERE THE PINNED LITERALS CAME FROM, because a pinned sentence is only evidence if it is the
// DOCUMENT's: behaviour.md §4 quotes the empty patch's sentence verbatim — 'the patch names no member
// of either tier' — and interface.md §2 carries the cap's order (a `null` cap clears; a non-number
// refuses; `NaN` **or any value `<= 0`** clears, `-Infinity` included; only what survives all of that
// fails `Number.isFinite` and refuses, so `+Infinity` alone does). Both were then VERIFIED against the
// `write` body's own arms in `src/main/operator-settings/index.ts` before being written here — the
// pre-tier refusal and the cap's ordered guards — because a pin the tree does not answer would be a row
// about the document and not about the module (D-41).
//
// NO RED-FIRST EVIDENCE, STATED RATHER THAN IMPLIED: the implementation stands and its three module
// batteries are green, so nothing here was seen red before the code existed. A row of this file that is
// red on its first run is a FINDING against the implementation or the design, never evidence that the
// row came first (`examiner.md` §3).
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createOperatorSettings } from '../../../src/main/operator-settings'
import { createSettingsSurface } from '../../../src/main/settings-surface'

const OPERATOR_FILE = 'provident-operator-settings.json' // persistence.md §1: the one written name

/** Both entry points answer the one declared receipt form, so the helpers take the shape rather than
 *  either module's own alias — `interface.md` §2's `OperatorSettingsReceipt` and §5's
 *  `SecurityWriteReceipt` are the same two arms. */
type Receipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }

function committedOf(receipt: Receipt): { status: 'committed'; cursor: number; opId: string } {
  if (receipt.status !== 'committed') throw new Error(`expected a committed receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

function refusedOf(receipt: Receipt): { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null } {
  if (receipt.status !== 'refused') throw new Error(`expected a refused receipt; it answered ${JSON.stringify(receipt)}`)
  return receipt
}

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'security-store-patch-domain-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

/** The file's bytes read AS BYTES: this layer parses none of the store's image (persistence.md §4), so
 *  a member's presence or absence is measured over the raw text and never over a re-parse. */
const imageOf = (dir: string): string => readFileSync(join(dir, OPERATOR_FILE), 'utf8')

describe('security-store-storeroom · the patch domain and the journal cap’s sign', () => {
  // ── behaviour.md §4 · the empty patch ────────────────────────────────────────────────────────────
  it('an empty patch REFUSES, and the refusal is pinned: the module’s own sentence, a null address, no cursor minted, and the record and the bytes unmoved (interface.md §1/§2, behaviour.md §4)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const standing = committedOf(settings.write({ token: 'kept', maxJournalLength: 12 }))
    const beforeRecord = settings.read()
    const beforeImage = imageOf(userDataDir)

    const empty = settings.write({})
    // THE PIN, and the shapes it replaces: `['committed','refused']` — the assertion this row's subject
    // carried in `SC-E5-15` — is satisfied by BOTH answers, so it measured neither. Every member of the
    // declared refusal arm is asserted here instead.
    const refusal = refusedOf(empty)
    expect(refusal.reason, 'the reason word: this module’s own boundary refusal, answered before any store verb runs (interface.md §1, §3)').toBe('ValueRefusedAtBoundary')
    expect(refusal.message, 'and the module’s OWN sentence — not the package walk’s — declaring that the patch names neither tier (interface.md §1)').toBe('the patch names no member of either tier')
    expect('address' in refusal, 'the declared fourth member is CARRIED, so `null` below is an answer and not an omitted property (interface.md §2)').toBe(true)
    expect(refusal.address, 'and it is null: an empty patch names nothing a store address could be minted from').toBeNull()

    // A REFUSAL LEAVES THE RECORD, THE BYTES AND THE ORDINAL WHERE THEY STOOD: the live state advances
    // only on a committed receipt, so an empty patch is a refusal and never a no-op — even though every
    // member of `OperatorSettingsPatch` is optional (interface.md §1; persistence.md §5; L1 §3).
    const afterRecord = settings.read()
    expect(
      { token: afterRecord.token, enabled: afterRecord.enabled, maxJournalLength: afterRecord.maxJournalLength, entries: afterRecord.entries },
      'the record the next read serves is the pre-write record',
    ).toEqual({ token: beforeRecord.token, enabled: beforeRecord.enabled, maxJournalLength: beforeRecord.maxJournalLength, entries: beforeRecord.entries })
    expect(imageOf(userDataDir), 'the durable bytes are byte-identical: nothing landed (persistence.md §5)').toBe(beforeImage)
    const next = committedOf(settings.write({ token: 'after' }))
    expect(next.cursor - standing.cursor, 'and the refused write minted no cursor: one commit, one ordinal, taken by difference and never by its absolute value (interface.md §2 ASM-L2-7)').toBe(1)
  })

  // ── behaviour.md §2 · the cap’s sign rule ───────────────────────────────────────────────────────
  it('the cap’s clear/refuse split is decided by the SIGN: `-Infinity` is `<= 0` and commits with the cap absent, `+Infinity` refuses `ValueRefusedAtBoundary` and nothing lands (interface.md §2, behaviour.md §2)', () => {
    const surface = createSettingsSurface({ userDataDir })

    // A CAP STANDS FIRST, so the clear below is an OBSERVABLE: with no cap to begin with, "cleared" and
    // "never written" would answer the same reading and the minus arm would pass for the wrong reason.
    expect(committedOf(surface.set({ maxJournalLength: 12 }).write).cursor, 'the seed cap commits over the carrier').toEqual(expect.any(Number))
    expect(surface.read().maxJournalLength, 'the seed cap stands as written').toBe(12)
    expect(imageOf(userDataDir).includes('maxJournalLength'), 'and the durable image carries the cap member, so its absence below is a measurement rather than a constant').toBe(true)

    // THE MINUS ARM — the arm behaviour.md §2 states and names as unasserted. `-Infinity <= 0` is true,
    // so the clear guard catches it BEFORE `Number.isFinite` is ever consulted: that order is the rule,
    // and the sign is the only thing separating this call from the refusing one three lines below.
    const minus = surface.set({ maxJournalLength: Number.NEGATIVE_INFINITY })
    const minusCommit = committedOf(minus.write)
    expect(Number.isInteger(minusCommit.cursor), 'the minus arm COMMITS, and a commit answers the store’s own ordinal (interface.md §2)').toBe(true)
    expect(minusCommit.opId.length, 'and its own non-empty op id').toBeGreaterThan(0)
    expect(minus.maxJournalLength, 'the SET answer’s own cap member is absent: the clear is what committed (interface.md §5)').toBeUndefined()
    expect(surface.read().maxJournalLength, 'and the record serves no cap').toBeUndefined()
    expect(imageOf(userDataDir).includes('maxJournalLength'), 'because a cleared member is stored as its ABSENCE, never as `null` (persistence.md §4)').toBe(false)

    // THE PLUS ARM — the one sign that survives every clear guard and then fails `Number.isFinite`, so
    // it is the module's refusal and no store verb runs (interface.md §2, §3).
    const beforePlus = imageOf(userDataDir)
    const plus = surface.set({ maxJournalLength: Number.POSITIVE_INFINITY })
    const plusRefusal = refusedOf(plus.write)
    expect(plusRefusal.reason, 'the plus arm is REFUSED with the boundary word').toBe('ValueRefusedAtBoundary')
    // THE SENTENCE IS NOT PINNED, and that is a stated choice: no L2 document quotes this refusal's
    // message, and pinning a literal the contract does not carry would make the row a reading of the
    // implementation (D-1 §4). What is declared — `message: string` — is asserted.
    expect(plusRefusal.message.length, 'the refusal carries the module’s non-empty sentence (interface.md §2)').toBeGreaterThan(0)
    expect(plusRefusal.address, 'and a null address: a pre-store refusal names no address').toBeNull()
    expect(imageOf(userDataDir), 'nothing lands: not one byte moved (persistence.md §5)').toBe(beforePlus)
    expect(surface.read().maxJournalLength, 'and the cap stands where the minus arm left it — absent').toBeUndefined()

    // THE SAME RULE AT THE INSTANCE GRAIN, because behaviour.md §2 states these arms over `write` while
    // §5's `set` is one hop above that same cap arm. A rule honoured at only one of the two entry points
    // is red here rather than left unmeasured — the defect this whole pass exists to close.
    const instanceDir = mkdtempSync(join(tmpdir(), 'security-store-patch-domain-instance-'))
    try {
      const settings = createOperatorSettings({ userDataDir: instanceDir })
      committedOf(settings.write({ maxJournalLength: 7 }))
      expect(settings.read().maxJournalLength, 'the instance holds the seed cap').toBe(7)
      expect(settings.write({ maxJournalLength: Number.NEGATIVE_INFINITY }).status, 'the minus arm takes the clear arm at `write` too, and commits').toBe('committed')
      expect(settings.read().maxJournalLength, 'with the cap absent').toBeUndefined()
      expect(refusedOf(settings.write({ maxJournalLength: Number.POSITIVE_INFINITY })).reason, 'and the plus arm refuses `ValueRefusedAtBoundary` at `write` too').toBe('ValueRefusedAtBoundary')
      expect(settings.read().maxJournalLength, 'with the cap still absent: the refusal left the record as it stood').toBeUndefined()
    } finally {
      rmSync(instanceDir, { recursive: true, force: true })
    }
  })
})
