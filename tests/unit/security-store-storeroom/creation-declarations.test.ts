// tests/unit/security-store-storeroom/creation-declarations.test.ts — THE INSTANCE'S THREE DECLARATIONS, MEASURED AT
// THE STORE'S CREATION (D-84; D-85; `src/main/operator-settings/index.ts`'s `declarationsFor`).
//
// WHY THE CONSTRUCTION'S OWN CONFIGURATION IS THE SUBJECT, AND WHY THAT IS NOT A SYNTHETIC SEAM. The instance constructs
// its own store, so the batch it hands `storeCreate` has exactly one consumer — the `storeCreate` call — and no caller
// outside the module ever sees it. **An exported declaration list would be a second value name on a module whose entry
// is censused at ONE** (`tests/unit/settings-carrier-retirement/operator-settings.test.ts` `OS-13`:
// `Object.keys(module)` is `['createOperatorSettings']`, and `signatures.md` §2's `N = 12` is the map row's), so growing
// the surface to make a test reachable would move a census and buy no production route. What this file does instead is
// read the configuration the module ACTUALLY hands the package — a run-time datum, never the source text — and then
// construct a REAL store with that exact array. The functions it drives are the module's own, and the instant it
// measures is the creation instant the declarations exist for.
//
// THE CONTROL IS THE WHOLE POINT OF EVERY ROW BELOW: the same construction WITHOUT the captured batch refuses the
// address `AddressNotFound`, so no row here can pass on a default that a read substitutes (D-84's §1 measurement: all
// three of this instance's addresses answer `AddressNotFound` on a fresh profile while `read()` answers
// `FIRST_RUN`/`SAFE_PAIR`). **NO ROW IN THIS FILE READS `src/**`**, so none of them can pass on a comment that mentions a
// name — the hollow-green class this corpus keeps meeting. Every absence asserted below is asserted against a runtime
// registry, not against bytes.
//
// **⟶ RE-DERIVED UNDER `D-85`, AND THE TWO ROWS THAT DIE DIE HONESTLY.** `D-84` declared ONE pair — the `mem` one — and
// left the two `file` addresses stopped, because each is the marker of an import-once arm a creation repair would
// retire: measured there as `54` rows red over `16` files. `D-85` puts the absence-keyed action INSIDE the repair, so all
// three addresses carry a declaration and every import still runs. Three figures of `D-84` therefore move and are
// re-taken here rather than softened: the batch's membership (`1` → `3`), the first caller-visible ordinal (`2` → `4`,
// because two more repairs land before any caller act), and `CD-6`'s stopped-census claim, which is now the claim that
// all three are declared AND both imports still run.
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/** **THE CAPTURE IS HOISTED BECAUSE `vi.mock` IS**: a factory closing over a plain module-level binding would run before
 *  that binding exists, and the wrapper below must be in place before `src/main/operator-settings` is imported. */
const captured = vi.hoisted(() => [] as Array<Record<string, unknown>>)
vi.mock('provident-storeroom', async (importOriginal) => {
  const real = await importOriginal<typeof import('provident-storeroom')>()
  const realCreate = real.storeCreate as unknown as (config: Record<string, unknown>) => unknown
  return {
    ...real,
    // THE CONFIGURATION IS RECORDED AND THEN HANDED ON UNTOUCHED: this wrapper adds no key, drops none and returns the
    // real instance, so the module under test behaves exactly as it does in the boot.
    storeCreate: (config: Record<string, unknown>) => {
      captured.push(config)
      return realCreate(config)
    },
  }
})

import { storeCreate } from 'provident-storeroom'

import { createOperatorSettings } from '../../../src/main/operator-settings'

/** The three addresses, spelled as literals here because that is what a row asserting a KEY must name (`interface.md` §1;
 *  the module's constants block is the producer, and `tests/e2e/settings-carrier-retirement/scenarios.test.ts` `S-12`
 *  censuses the spellings themselves). */
const EXCLUSION: readonly string[] = ['operator-exclusion']
const RECORD: readonly string[] = ['operator-settings']
const APP_STATE: readonly string[] = ['operator-app-state']
const FILE = 'provident-operator-settings.json'
const SEED = 'provident-security.json'
const CARRIER = 'provident-settings.json'
/** The three declarations' own declared ids, spelled here so a rename is a RED row and never a silent one. */
const EXCLUSION_ID = 'operator-exclusion-must-stand'
const RECORD_ID = 'operator-record-must-stand'
const APP_STATE_ID = 'operator-app-state-must-stand'

let userDataDir: string
beforeEach(() => { userDataDir = mkdtempSync(join(tmpdir(), 'creation-declarations-')) })
afterEach(() => {
  captured.length = 0
  rmSync(userDataDir, { recursive: true, force: true })
})

/** The configuration the module handed the package for its LAST construction. `constraints` absent is `[]`: the key is
 *  in domain as an absence (`StoreConfig`’s fourth declared key), so both spellings are read as the empty batch. */
function lastBatch(): readonly Record<string, unknown>[] {
  const config = captured[captured.length - 1]
  if (config === undefined) throw new Error('the module constructed no store')
  const batch = config['constraints']
  return Array.isArray(batch) ? (batch as Record<string, unknown>[]) : []
}

/** A REAL store over a SCRATCH file, built with the batch the module hands the package — the creation instant, stood
 *  outside the instance so the address can be read at its own tier rather than through the module's defaulting read. */
function armed(dir: string, batch: readonly Record<string, unknown>[]): ReturnType<typeof storeCreate> {
  return storeCreate({ journalLength: 256, listeners: [], filePath: join(dir, FILE), constraints: batch as never })
}

/** The store's refusal as its own two members: the package throws a plain `{status, message, log}` and never an `Error`
 *  subclass (`guide §8`), so `instanceof Error` would lose the status a control row has to name. */
function refusalOf(read: () => unknown): { status: string; message: string } {
  try {
    read()
    return { status: 'READ-ANSWERED', message: 'the address stands', }
  } catch (caught) {
    const shape = caught as { status?: unknown; message?: unknown } | null
    return {
      status: typeof shape?.status === 'string' ? shape.status : 'THREW-A-NON-STORE-VALUE',
      message: typeof shape?.message === 'string' ? shape.message : '',
    }
  }
}

/** The body at one address, read off the batch the module handed the package — BY ADDRESS and never by list position, so
 *  the batch's order is free to move without a row silently measuring another pair (`D-85` lists the durable two first). */
function bodyAt(batch: readonly Record<string, unknown>[], address: readonly string[]): (context: unknown) => unknown {
  const pair = batch.find((element) => Array.isArray(element['address']) && (element['address'] as readonly string[])[0] === address[0])
  if (pair === undefined) throw new Error(`no pair stands at ${address[0]}`)
  return pair['constraint'] as (context: unknown) => unknown
}

/** The creation instant's own context, in the shape the package builds it: five members, `value` the current value read
 *  at the address and `undefined` where the read refuses (`AttemptContext`; measured 2026-11-02). */
const atCreation = (address: readonly string[], value: unknown): Record<string, unknown> =>
  ({ address, attempt: null, op: null, tier: null, value })

describe('the instance’s declarations · measured at the store’s creation (D-84, D-85)', () => {
  it('CD-1 · the creation instant: all THREE addresses stand BEFORE any act, where the same construction without the batch refuses `AddressNotFound` at each of them (D-84, D-85; D-69’s `tabsMustStand` shape)', () => {
    // THE CONTROL FIRST, over its own directory so the two stores share no register: a construction with the SAME keys
    // minus `constraints` is this instance before D-84, and it is what every row below must be able to fail against.
    const bare = mkdtempSync(join(tmpdir(), 'creation-declarations-bare-'))
    try {
      const unarmed = storeCreate({ journalLength: 256, listeners: [], filePath: join(bare, FILE) })
      expect(refusalOf(() => unarmed.read(EXCLUSION, 'mem')).status, 'the control: with no batch the volatile address holds nothing, and the read refuses at the ADDRESS rung rather than answering an empty pair').toBe('AddressNotFound')
      expect(refusalOf(() => unarmed.read(RECORD, 'file')).status, 'and the durable record is absent in the same control — the state `FIRST_RUN` is substituted for at the read').toBe('AddressNotFound')
      expect(refusalOf(() => unarmed.read(APP_STATE, 'file')).status, 'and so is the row list — the state the second import-once arm ran over').toBe('AddressNotFound')
    } finally {
      rmSync(bare, { recursive: true, force: true })
    }

    // THE INSTANCE ITSELF: one construction, whose batch is captured at the package boundary.
    const settings = createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    expect(batch.map((pair) => [pair['address'], pair['id']]), 'the batch is THREE pairs, one per address, under the ids this file spells — the census of what the instance imposes, read off the configuration and not off the source').toEqual([
      [RECORD, RECORD_ID],
      [APP_STATE, APP_STATE_ID],
      [EXCLUSION, EXCLUSION_ID],
    ])

    // THE SAME BATCH, adopted by a real store: every address stands at the creation instant, with no verb of any
    // caller's having run, on a profile whose file is empty.
    const created = armed(userDataDir, batch)
    expect(created.read(EXCLUSION, 'mem'), 'the pair stands, and it is `SAFE_PAIR`’s own value written as ONE whole `{exclusion}`: `tier4` is derived at the read and is never stored (interface.md §1)').toEqual({ exclusion: 'mcp-enabled' })
    expect(created.read(RECORD, 'file'), 'the durable record stands, at `FIRST_RUN`’s own image: a profile holding no retired seed has nothing to import, so the repair writes the placeholder the read used to substitute (D-85)').toEqual({ enabled: ['read', 'dispatch'] })
    expect(created.read(APP_STATE, 'file'), 'and the row list stands with the arm the import ran in it — `absent`, because this profile carries no retired carrier (D-85)').toEqual({ rows: [], legacy: 'absent', unrepresentable: [] })
    expect(statSync(join(userDataDir, FILE)).size, '**and the file is still ZERO bytes: a registration-instant repair LANDS AN OP AND IS SAVED BY NOTHING.** The package’s save producers are a `file`-tier write’s COMMIT and a restore that moved (`guide §9.3`, measured 2026-11-03), and a `cfg.constraints` repair is neither — so the records stand in the instance and reach the disk at the first save (CD-10 measures that transition). The zero-length file `guide §9.1` declares is therefore UNMOVED by this pass.').toBe(0)
    expect(readFileSync(join(userDataDir, FILE), 'utf8'), 'its bytes carry no address spelling at all (persistence.md §6)').toBe('')
    expect({ token: settings.read().token, enabled: settings.read().enabled, exclusion: settings.read().exclusion }, 'and the module’s own reads answer the same words — which they did BEFORE these declarations too, and that is exactly why the rows above read the ADDRESSES and not the answers (D-84: absence was answered at the read, never repaired into the record)').toEqual({ token: null, enabled: ['read', 'dispatch'], exclusion: 'mcp-enabled' })
    expect(settings.readAppState(), 'the third address’s read included: the rows, the arm and the two list members').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })
  })

  it('CD-2 · one authority and not two: the repair writes the value the read already defaults to, so the address and the constant cannot disagree (D-84)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const standing = armed(userDataDir, lastBatch()).read(EXCLUSION, 'mem') as Record<string, unknown>
    // THE DERIVATION THE READ PERFORMS, REPEATED OVER THE REPAIRED RECORD: `tier4` is `exclusion === 'mcp-disabled'` and
    // the two words the member may carry are the pair's whole domain (interface.md §1).
    expect(Object.keys(standing).sort(), 'the repaired value carries the pair’s one stored member and no derived one').toEqual(['exclusion'])
    expect(standing['exclusion'], 'and it is the constant the read substitutes over an absent address — a placeholder that disagreed with the read-side default would be two authorities for one value').toBe(settings.read().exclusion)
    expect(standing['exclusion'] === 'mcp-disabled', 'so `tier4`, derived from the repaired record, is the boolean the module answers').toBe(settings.read().tier4)
    // AND A TRANSITION MOVES BOTH TOGETHER: the read is not substituting a constant over a record that says otherwise.
    expect(settings.write({ exclusion: 'mcp-disabled' }).status, 'the transition commits').toBe('committed')
    expect({ exclusion: settings.read().exclusion, tier4: settings.read().tier4 }, 'and the pair the store holds is what the read answers').toEqual({ exclusion: 'mcp-disabled', tier4: true })
  })

  it('CD-3 · the `mem` pair is RE-MINTED AT EVERY BOOT, because it cannot persist: two successive constructions, the second standing the safe pair at ITS creation instant after the first transitioned it (D-84; ASM-L2-2)', () => {
    const first = createOperatorSettings({ userDataDir })
    expect(first.write({ exclusion: 'mcp-disabled' }).status, 'the first boot transitions the pair away from the safe one').toBe('committed')
    expect(first.read().tier4, 'and the first instance serves the transitioned value').toBe(true)

    // THE SECOND BOOT, over the SAME directory: nothing at `mem` survives it, so the declaration is the only thing that
    // can put a value back — and it does, inside the construction, before the module reads anything.
    const second = createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    expect(batch.map((pair) => (pair['address'] as readonly string[])[0]), 'the second construction hands the package the same three pairs, at the same three addresses').toEqual([RECORD[0], APP_STATE[0], EXCLUSION[0]])
    expect(armed(userDataDir, batch).read(EXCLUSION, 'mem'), 'so at the second instance’s creation instant the address stands at the safe pair again — the whole of V5’s closing, measured over two boots rather than asserted').toEqual({ exclusion: 'mcp-enabled' })
    expect({ exclusion: second.read().exclusion, tier4: second.read().tier4 }, 'and the second boot’s read serves it, which is the value clause 3 now gets from a constraint repair and from no file (D-84)').toEqual({ exclusion: 'mcp-enabled', tier4: false })

    // **AND ON THIS ARM ALL THREE LAND AGAIN, WHICH IS `D-85`'S LIMIT MEASURED RATHER THAN DESCRIBED** (CD-10 pins the
    // other side): the first boot's only write was at `mem`, and a `mem` write takes no save, so the two `file` records
    // its repairs wrote never reached the disk — the file is still zero-length here — and the second boot's repairs find
    // both addresses absent again. **THE IMPORT IS THEREFORE READ ONCE PER BOOT UNTIL THE FIRST SAVE, AND ONCE PER
    // PROFILE AFTER IT**: both retired carriers are read-only inputs this module never writes (D-19), so the answers are
    // identical either way; what the op count discloses is that the marker is the RECORD, and a record the store has not
    // saved is not one the next boot can find.
    const secondReceipt = second.write({ token: 'after-the-second-boot' })
    expect(secondReceipt.status === 'committed' ? secondReceipt.cursor : null, 'three repairs stand behind this write — one per address — because the first boot took no save at a `file` address and left the file zero-length').toBe(4)
    expect(statSync(join(userDataDir, FILE)).size, 'and the byte reading that explains the count is the write’s own: the boot alone materialised nothing, and `secondReceipt` is the first save either boot has taken (guide §9.3; CD-10 measures the save the other way round)').toBeGreaterThan(0)
  })

  it('CD-4 · each body judges EXISTENCE and every other shape keeps its existing authority: a value that stands is passed through — a wrong member included — and each body refuses only the state its own read cannot serve (D-84, D-85)', () => {
    const batch = (() => { createOperatorSettings({ userDataDir }); return lastBatch() })()
    const store = armed(userDataDir, batch)
    const exclusion = bodyAt(batch, EXCLUSION)
    const record = bodyAt(batch, RECORD)
    const appState = bodyAt(batch, APP_STATE)

    expect(exclusion(atCreation(EXCLUSION, undefined)), 'an address holding nothing is refused, with a sentence that names the pair and not the act').toMatchObject({ message: expect.stringContaining('operator exclusion') })
    expect(exclusion(atCreation(EXCLUSION, { exclusion: 'mcp-enabled' })), 'a pair that stands passes').toBe(true)
    expect(exclusion(atCreation(EXCLUSION, { exclusion: 'mcp-disabled' })), 'and so does the other word: existence is the arm, not the value').toBe(true)
    expect(exclusion(atCreation(EXCLUSION, { exclusion: 7 })), 'AND A PRESENT PAIR WHOSE MEMBER IS NOT A TOKEN PASSES TOO — repairing the member here would be the second authority over one value the placeholder rule forbids, and the read’s own admission is the member’s (this file proves the SPLIT, not an omission)').toBe(true)

    // THE RECORD'S ARM IS `plain`, WHICH IS `read()`'s OWN ADMISSION — `plain(durable) ? fromStored(durable) : …` — lifted
    // into a repair and nothing wider: a leaf where a record should stand is a state the read cannot serve.
    expect(record(atCreation(RECORD, undefined)), 'no record at all is refused, in a sentence naming the record').toMatchObject({ message: expect.stringContaining('record') })
    expect(record(atCreation(RECORD, 42)), 'and a leaf where a record should stand is refused too, because `read()` cannot read it').toMatchObject({ message: expect.stringContaining('record') })
    expect(record(atCreation(RECORD, {})), 'but an EMPTY record passes: `{}` is a record the read serves member by member, which is the state D-84 measured staying `{}` — its members are `fromStored`’s authority, not this body’s').toBe(true)
    expect(record(atCreation(RECORD, { token: 't', enabled: ['graph'] })), 'and so does a whole one').toBe(true)

    // THE ROW LIST'S ARM IS `recordedAt` — the very predicate the old construction used to decide whether to import.
    expect(appState(atCreation(APP_STATE, undefined)), 'no value at all is refused').toMatchObject({ message: expect.stringContaining('row list') })
    expect(appState(atCreation(APP_STATE, { legacy: 'x' })), 'and a value standing WITHOUT a `rows` array is refused: `fromAppState` answers `undefined` for it, so the read has nothing to serve and the import is what it used to fall back to').toMatchObject({ message: expect.stringContaining('row list') })
    expect(appState(atCreation(APP_STATE, { rows: [] })), 'an empty row list passes — it is a record, and a legal one').toBe(true)

    // THE LANDING INSTANT IS WHERE A VALUE STANDS, AND THE STORE IS WHERE THAT IS OBSERVED: a wrong-typed member written
    // at a landing instant LANDS AND STANDS, because no repair ran over it.
    store.write(EXCLUSION, 'mem', { exclusion: 7 })
    expect(store.read(EXCLUSION, 'mem'), 'the wrong-typed member stands: this declaration did not rewrite it, which is the split asserted above and observed here on the store itself').toEqual({ exclusion: 7 })

    // **AND `SAFE_PAIR` IS STILL LOAD-BEARING, WHICH IS THE ARM NO DECLARATION CAN REACH: A CONSTRUCTION THE PACKAGE
    // REFUSES HAS NO INSTANCE, SO NO BATCH IS ADOPTED AND NO REPAIR CAN RUN.** A DIRECTORY occupying the instance's own
    // name refuses the construction (`guide §8.2`, measured 2026-11-02 over this same call), and the read is then served
    // the constant alone. This is why D-84 keeps the read-side default rather than deleting it, and D-85 keeps it for the
    // same arm at all three addresses (CD-12).
    const unusable = mkdtempSync(join(tmpdir(), 'creation-declarations-unusable-'))
    try {
      mkdirSync(join(unusable, FILE))
      const refused = createOperatorSettings({ userDataDir: unusable })
      expect({ exclusion: refused.read().exclusion, tier4: refused.read().tier4 }, 'over a refused construction the safe pair is the CONSTANT’s answer, with no instance and no repair behind it').toEqual({ exclusion: 'mcp-enabled', tier4: false })
    } finally {
      rmSync(unusable, { recursive: true, force: true })
    }
  })

  it('CD-5 · the creation instant LANDS THREE OPS: one per declaration, so the first caller-visible receipt is the FOURTH op — the declared surface’s own witness that three repairs ran (interface.md §2 ASM-L2-7; D-84, D-85)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const receipt = settings.write({ token: 't' })
    expect(receipt.status, 'the first caller act commits').toBe('committed')
    if (receipt.status !== 'committed') return
    // THE STORE'S OWN ORDINAL, VERBATIM: three ops were minted before this write, one per declared address. Absent the
    // declarations the same act reads `cursor: 1` — one per D-84 declaration reads `2` — so the row is the surface-side
    // half of CD-1's address-side one, and the figure it pins is the journal's first caller-visible ordinal (D-85).
    expect({ cursor: receipt.cursor, opId: typeof receipt.opId === 'string' && receipt.opId.length > 0 }, 'exactly three ops stand behind the first caller write, and they are the three creation repairs’').toEqual({ cursor: 4, opId: true })
  })

  it('CD-6 · the batch’s membership is a census: all THREE addresses carry a declaration, and each `file` declaration performs the import its address’s absence used to key — which is the half `D-84` stopped and `D-85` builds (D-84, D-85; D-82’s V1)', () => {
    createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    // READ OFF THE CONFIGURATION THE MODULE HANDS THE PACKAGE, never off `src/**`: a comment naming an address cannot
    // satisfy this row, which is the hollow-green class D-84's row is written against.
    expect(batch.map((pair) => (pair['address'] as readonly string[])[0]), 'three pairs, one per address — the `mem` one, and the two `file` ones whose imports move INSIDE their repairs').toEqual([RECORD[0], APP_STATE[0], EXCLUSION[0]])
    expect(batch.map((pair) => pair['id']), 'under the three ids, so a declaration cannot be dropped or renamed silently').toEqual([RECORD_ID, APP_STATE_ID, EXCLUSION_ID])
    expect(batch.every((pair) => typeof pair['constraint'] === 'function'), 'and every element carries its function — the batch’s own three-member rule').toBe(true)

    // **AND THE IMPORTS STILL RUN, WHICH IS WHAT THE THREE DECLARATIONS WOULD HAVE RETIRED IF THEIR REPAIRS HAD ONLY MINTED
    // PLACEHOLDERS**: a profile carrying the sibling's retired seed answers its token, grants, cap and foreign entry, and a
    // profile carrying the retired carrier answers its rows and its arm — through the module's own reads, over a
    // construction that adopted the captured batch.
    const seeded = mkdtempSync(join(tmpdir(), 'creation-declarations-seeded-'))
    try {
      writeFileSync(join(seeded, SEED), JSON.stringify({ token: 'tok', enabled: ['graph', 'read'], maxJournalLength: 9, 'x-kept': { a: 1 } }))
      writeFileSync(join(seeded, CARRIER), '{"schemaVersion":"1","file.tabs.order":["a"],"file.null":null}')
      const settings = createOperatorSettings({ userDataDir: seeded })
      expect({ token: settings.read().token, enabled: settings.read().enabled, maxJournalLength: settings.read().maxJournalLength, entries: settings.read().entries }, 'the record address’s repair IMPORTED the retired seed rather than minting a placeholder over it').toEqual({ token: 'tok', enabled: ['graph', 'read'], maxJournalLength: 9, entries: { 'x-kept': { a: 1 } } })
      expect(settings.readAppState(), 'and the app-state address’s repair imported the carrier’s rows, its named-uncarryable list and its arm').toEqual({ rows: [{ name: 'file.tabs.order', value: ['a'] }], legacy: 'imported', unrepresentable: ['file.null'], storage: 'standing' })
      expect(armed(seeded, lastBatch()).read(RECORD, 'file'), 'and the values are IN THE RECORD the construction wrote, read at the address rather than through the module’s read: the import’s answer reached the written value').toEqual({ enabled: ['graph', 'read'], entries: { 'x-kept': { a: 1 } }, maxJournalLength: 9, token: 'tok' })
    } finally {
      rmSync(seeded, { recursive: true, force: true })
    }
  })

  it('CD-7 · the record’s creation instant is the IMPORT, and its placeholder is `FIRST_RUN`: the imported-or-placeholder value stands at the address before any act, in the shape `read()` parses (D-85)', () => {
    // THE CONTROL, per row and not borrowed: the same construction without the batch refuses the address.
    const bare = mkdtempSync(join(tmpdir(), 'creation-declarations-cd7-'))
    try {
      writeFileSync(join(bare, SEED), JSON.stringify({ token: 'tok' }))
      expect(refusalOf(() => storeCreate({ journalLength: 256, listeners: [], filePath: join(bare, FILE) }).read(RECORD, 'file')).status, 'without the declaration the address holds nothing, and `read()` would substitute `FIRST_RUN` or the import overlay at the READ').toBe('AddressNotFound')
    } finally {
      rmSync(bare, { recursive: true, force: true })
    }

    // THE IMPORTED ARM, and the record is `toStored(imported)` — the module's own write composition, so the read parses
    // back exactly what was imported (`fromStored`’s inverse, member for member).
    writeFileSync(join(userDataDir, SEED), JSON.stringify({ token: 'tok', enabled: ['graph', 'read'], maxJournalLength: 9, 'x-kept': { a: 1 } }))
    const settings = createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    expect(armed(userDataDir, batch).read(RECORD, 'file'), 'the imported record stands at its address: token, grants, cap and the foreign entry carried verbatim').toEqual({ enabled: ['graph', 'read'], entries: { 'x-kept': { a: 1 } }, maxJournalLength: 9, token: 'tok' })
    expect({ token: settings.read().token, enabled: settings.read().enabled, maxJournalLength: settings.read().maxJournalLength, entries: settings.read().entries }, 'and the module’s read is that record, not a second answer beside it').toEqual({ token: 'tok', enabled: ['graph', 'read'], maxJournalLength: 9, entries: { 'x-kept': { a: 1 } } })

    // THE PLACEHOLDER ARM: no retired seed at all, and the written value is `FIRST_RUN`’s own image.
    const cold = mkdtempSync(join(tmpdir(), 'creation-declarations-cd7-cold-'))
    try {
      createOperatorSettings({ userDataDir: cold })
      expect(armed(cold, lastBatch()).read(RECORD, 'file'), 'a profile holding nothing imports nothing, and the placeholder is the constant the read used to substitute — one authority, not two').toEqual({ enabled: ['read', 'dispatch'] })
    } finally {
      rmSync(cold, { recursive: true, force: true })
    }
  })

  it('CD-8 · the app-state creation instant writes BOTH the rows and the arm that produced them: the word is the record’s member, because it was derived from the import outcome and the derivation must come from the record (D-85)', () => {
    const bare = mkdtempSync(join(tmpdir(), 'creation-declarations-cd8-'))
    try {
      writeFileSync(join(bare, CARRIER), '{"schemaVersion":"1","file.a":1}')
      expect(refusalOf(() => storeCreate({ journalLength: 256, listeners: [], filePath: join(bare, FILE) }).read(APP_STATE, 'file')).status, 'without the declaration the address holds nothing and `legacy` is derived from an import run at the READ').toBe('AddressNotFound')
    } finally {
      rmSync(bare, { recursive: true, force: true })
    }

    // A VALID CARRIER WITH ONE UNCARRYABLE ROW: rows, arm and the named-uncarryable list all reach the written value.
    writeFileSync(join(userDataDir, CARRIER), '{"schemaVersion":"1","file.tabs.order":null,"file.layout.dock":"left"}')
    createOperatorSettings({ userDataDir })
    expect(armed(userDataDir, lastBatch()).read(APP_STATE, 'file'), 'the record the repair wrote carries the rows it imported, the arm `imported` and the name it could not carry — one whole value, never a sequence').toEqual({ rows: [{ name: 'file.layout.dock', value: 'left' }], legacy: 'imported', unrepresentable: ['file.tabs.order'] })

    // AND A BOOT THAT FINDS THAT RECORD STANDING READS THE WORD OFF IT RATHER THAN ASKING THE IMPORT AGAIN: the second
    // construction's `legacy` is the record's own member.
    const second = createOperatorSettings({ userDataDir })
    expect(second.readAppState().legacy, 'the arm the first boot recorded, served by the second — no import decision can answer `imported` here, because the carrier still stands and the record outranks it').toBe('imported')
    expect(second.readAppState().unrepresentable, 'and the named-uncarryable list survives the boot too, read off the record').toEqual(['file.tabs.order'])
  })

  it('CD-9 · the import’s result REACHES THE WRITTEN RECORD and is not merely a write that succeeded: the persisted bytes at each `file` address, read off the FILE with no `read()` in the path (D-85)', () => {
    // THE FLUSHER IS A WRITE AT THE OTHER ADDRESS — the save the package takes at a `file`-tier commit — so what is read
    // below is the store's own bytes and not a projection this row composed. A repair whose write had landed `FIRST_RUN`
    // while its import had answered otherwise would fail here, which is the whole point of the row.
    writeFileSync(join(userDataDir, SEED), JSON.stringify({ token: 'tok', enabled: ['graph', 'read', 'module'], maxJournalLength: 9, 'x-kept': { a: 1 } }))
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.writeAppState([{ name: 'file.flush', value: 1 }]).status, 'the flush at the third address commits').toBe('committed')
    const flushed = JSON.parse(readFileSync(join(userDataDir, FILE), 'utf8')) as Record<string, unknown>
    expect(flushed['operator-settings'], 'the record address carries the IMPORTED value in the store’s own bytes: the retired seed’s token, grants, cap and foreign entry — the import’s answer, not the placeholder').toEqual({ enabled: ['graph', 'read', 'module'], entries: { 'x-kept': { a: 1 } }, maxJournalLength: 9, token: 'tok' })

    // AND THE SAME FOR THE ROW LIST, flushed by a write at the RECORD address this time.
    const carrierDir = mkdtempSync(join(tmpdir(), 'creation-declarations-cd9-'))
    try {
      writeFileSync(join(carrierDir, CARRIER), '{"schemaVersion":"1","file.tabs.order":null,"file.layout.dock":"left"}')
      const appSettings = createOperatorSettings({ userDataDir: carrierDir })
      expect(appSettings.write({ token: 'flusher' }).status, 'the flush at the first address commits').toBe('committed')
      const held = JSON.parse(readFileSync(join(carrierDir, FILE), 'utf8')) as Record<string, unknown>
      expect(held['operator-app-state'], 'the row-list address carries the imported rows, the arm and the named-uncarryable list, in the store’s own bytes').toEqual({ rows: [{ name: 'file.layout.dock', value: 'left' }], legacy: 'imported', unrepresentable: ['file.tabs.order'] })
    } finally {
      rmSync(carrierDir, { recursive: true, force: true })
    }
  })

  it('CD-10 · TWO SUCCESSIVE BOOTS over the same profile: once a save has landed the record, the second boot imports NOTHING and repairs NOTHING at either `file` address — measured by the op count and by the carriers’ own bytes, not by the values (D-85)', () => {
    writeFileSync(join(userDataDir, SEED), JSON.stringify({ token: 'tok', enabled: ['graph'], maxJournalLength: 9 }))
    writeFileSync(join(userDataDir, CARRIER), '{"schemaVersion":"1","file.tabs.order":["a"]}')
    const seededSeed = readFileSync(join(userDataDir, SEED), 'utf8')
    const seededCarrier = readFileSync(join(userDataDir, CARRIER), 'utf8')

    const bootOne = createOperatorSettings({ userDataDir })
    const oneState = bootOne.readAppState()
    const oneRead = bootOne.read()
    expect(bootOne.writeAppState([{ name: 'file.tabs.order', value: ['a'] }]).status, 'the first boot’s one save lands BOTH records the repairs wrote').toBe('committed')

    const bootTwo = createOperatorSettings({ userDataDir })
    expect({ token: bootTwo.read().token, enabled: bootTwo.read().enabled, maxJournalLength: bootTwo.read().maxJournalLength }, 'the second boot answers the same three durable members').toEqual({ token: 'tok', enabled: ['graph'], maxJournalLength: 9 })
    expect({ rows: bootTwo.readAppState().rows, legacy: bootTwo.readAppState().legacy }, 'and the same rows, with the arm the record carries — `recorded` — because the caller’s write replaced the record the boot’s repair had written (the fourth word, exactly as before `D-85`)').toEqual({ rows: [{ name: 'file.tabs.order', value: ['a'] }], legacy: 'recorded' })
    // **THE INSTRUMENT IS THE OP COUNT**: the second boot repairs ONLY the `mem` address, so its first caller write is the
    // second op — one repair, not three. Before `D-85` this read `2` as well, but for the opposite reason: nothing was
    // repaired at either `file` address and the import ran on the READ, landing no op at all.
    const secondReceipt = bootTwo.write({ token: 'second-boot' })
    expect(secondReceipt.status === 'committed' ? secondReceipt.cursor : null, 'one repair stands behind the second boot’s first write, and it is the `mem` pair’s: neither `file` address was absent, so neither import ran').toBe(2)
    expect(readFileSync(join(userDataDir, SEED), 'utf8'), 'and the retired seed is byte-identical: nothing wrote it, and nothing needed to re-read it (D-19)').toBe(seededSeed)
    expect(readFileSync(join(userDataDir, CARRIER), 'utf8'), 'nor the retired carrier').toBe(seededCarrier)

    // **THE LIMIT, PINNED RATHER THAN DESCRIBED: A BOOT THAT SAVES NOTHING LEAVES NOTHING DURABLE, SO THE NEXT BOOT REPEATS
    // THE IMPORT.** A registration-instant repair lands an op and is saved by nothing (`guide §9.3`), so a profile whose
    // only act is the boot keeps a ZERO-LENGTH file — and CD-1 asserts that file is zero-length, which is `guide §9.1`'s
    // own declared state and every gating size row's claim. The import is therefore read ONCE PER BOOT until the first
    // save, and once per PROFILE after it; the answers are identical either way, because both retired carriers are
    // read-only inputs this module never writes (D-19) — but the count is stated here, because a row that claimed
    // otherwise would be claiming a durability the package does not give a registration repair.
    const unsaved = mkdtempSync(join(tmpdir(), 'creation-declarations-cd10-'))
    try {
      writeFileSync(join(unsaved, CARRIER), '{"schemaVersion":"1","file.first":1}')
      createOperatorSettings({ userDataDir: unsaved })
      expect(statSync(join(unsaved, FILE)).size, 'no save, no byte: the boot alone never materialises the file').toBe(0)
      // THE CARRIER IS REWRITTEN BETWEEN THE BOOTS, which is the instrument: a second boot that re-ran the import answers
      // the NEW row, and one that did not answers the old — a content test, not an atime one (this volume mounts with
      // `relatime`/`noatime` and an atime reading is not an instrument here, measured 2026-11-03).
      writeFileSync(join(unsaved, CARRIER), '{"schemaVersion":"1","file.second":2}')
      const secondBoot = createOperatorSettings({ userDataDir: unsaved })
      expect(secondBoot.readAppState().rows, 'the second boot re-ran the import over the UNSAVED profile, so it answers the rewritten carrier: the marker is a RECORD, and this record never reached the disk').toEqual([{ name: 'file.second', value: 2 }])
      const unsavedReceipt = secondBoot.write({ token: 'unsaved' })
      expect(unsavedReceipt.status === 'committed' ? unsavedReceipt.cursor : null, 'and three repairs landed behind its first write — one per address — because both `file` addresses were absent again').toBe(4)
    } finally {
      rmSync(unsaved, { recursive: true, force: true })
    }
  })

  it('CD-11 · a corrupt carrier does not crash the boot and still answers `corrupt`, with the record standing: every failure arm the second import distinguishes writes its own word (D-85; behaviour.md §7)', () => {
    const arms: Array<{ why: string; seed: (dir: string) => void }> = [
      { why: 'unparsable bytes', seed: (dir) => writeFileSync(join(dir, CARRIER), '{"schemaVersion":"1",') },
      { why: 'a foreign top-level key', seed: (dir) => writeFileSync(join(dir, CARRIER), '{"schemaVersion":"1","mine":1}') },
      { why: 'a wrong stamp', seed: (dir) => writeFileSync(join(dir, CARRIER), '{"schemaVersion":"2","file.a":1}') },
      { why: 'a directory at the retired path', seed: (dir) => mkdirSync(join(dir, CARRIER)) },
    ]
    for (const arm of arms) {
      const dir = mkdtempSync(join(tmpdir(), 'creation-declarations-cd11-'))
      try {
        arm.seed(dir)
        const settings = createOperatorSettings({ userDataDir: dir })
        expect(settings.readAppState(), `CD-11/${arm.why}: the corrupt arm still answers the same four members, nothing thrown`).toEqual({ rows: [], legacy: 'corrupt', unrepresentable: [], storage: 'standing' })
        expect(armed(dir, lastBatch()).read(APP_STATE, 'file'), `CD-11/${arm.why}: and the record STANDS carrying that word — the repair wrote the arm instead of falling through it`).toEqual({ rows: [], legacy: 'corrupt', unrepresentable: [] })
        expect(statSync(join(dir, FILE)).size, `CD-11/${arm.why}: with no byte on the disk, the file being the store’s to save and no save having run`).toBe(0)
      } finally {
        rmSync(dir, { recursive: true, force: true })
      }
    }
  })

  it('CD-12 · the refused construction is the arm NO declaration can reach: no instance, hence no batch and no repair, so the read-side defaults answer — and they are the only arm that still substitutes a constant (D-84; D-85)', () => {
    const dir = mkdtempSync(join(tmpdir(), 'creation-declarations-cd12-'))
    try {
      mkdirSync(join(dir, FILE))
      writeFileSync(join(dir, CARRIER), '{"schemaVersion":"1","file.a":1}')
      const refused = createOperatorSettings({ userDataDir: dir })
      expect({ token: refused.read().token, enabled: refused.read().enabled }, 'the record address answers `FIRST_RUN`’s constant, because there is no store to hold a record and no repair that could have written one').toEqual({ token: null, enabled: ['read', 'dispatch'] })
      expect({ exclusion: refused.read().exclusion, tier4: refused.read().tier4 }, 'and the pair answers `SAFE_PAIR`’s constant for the same reason').toEqual({ exclusion: 'mcp-enabled', tier4: false })
      expect(refused.readAppState(), 'and the row list answers the empty answer, with `storage` naming WHY it cannot be read: `unreachable`, beside the arm word a refused construction has — none ran').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'unreachable' })
      expect(refused.write({ token: 't' }).status, 'a write answers the construction’s own refusal').toBe('refused')
      expect(refused.writeAppState([]).status, 'and so does a row-list write').toBe('refused')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
