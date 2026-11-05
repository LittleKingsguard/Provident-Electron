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
// **⟶ RE-DERIVED UNDER `D-124` TOO, AND THE ROW THAT ASSERTED THE ROOT IS INVERTED RATHER THAN SOFTENED** (`D-46`): this
// file's `CD-16` asserted that the invariant stands at the store's root `[]`, and it now measures that NO batch element stands
// there, that each of the invariant's TWO SEATS stands at its own half, and — the measurement that makes two seats necessary
// — that a write at one half asks no pair standing at the other. `CD-18` and `CD-19` are its own new claims: a seat judges
// what it READS rather than the value the pass hands it, and one act is repaired exactly once.
//
// RE-DERIVED UNDER `D-85`, AND THE TWO ROWS THAT DIE DIE HONESTLY. `D-84` declared ONE pair — the `mem` one — and
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
/** **THE FOURTH ADDRESS, AND THE INVARIANT'S TWO SEATS AT THE TWO HALVES' OWN ADDRESSES** (`D-123`, re-grained at
 *  `D-124`): the pane family's `mem` record, and the two declarations that judge it together with the exclusion. **NO
 *  ROOT ADDRESS IS SPELLED HERE ANY MORE** — the batch names none, and `CD-16` is the row that measures that. */
const PANE: readonly string[] = ['operator-pane']
const FILE = 'provident-operator-settings.json'
const SEED = 'provident-security.json'
const CARRIER = 'provident-settings.json'
/** The three declarations' own declared ids, spelled here so a rename is a RED row and never a silent one. */
const EXCLUSION_ID = 'operator-exclusion-must-stand'
const RECORD_ID = 'operator-record-must-stand'
const APP_STATE_ID = 'operator-app-state-must-stand'
/** The invariant's two seat ids (`D-123`, split into two at `D-124` because a batch may not name one handle twice —
 *  measured 2026-11-05: the construction refuses it), spelled here so a rename is a RED row and never a silent one. */
const PANE_ID = 'operator-pane-must-stand'
const PANE_EXCLUSIVITY_ID = 'no-open-pane-over-open-ports'
const PORTS_EXCLUSIVITY_ID = 'no-open-ports-under-an-open-pane'

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

/** **THE SECOND INSTANCE — the same `filePath`, NO constraint list and therefore NO repair.** It reads the bytes the
 *  module's own instance left and answers nothing else, which is what makes it the instrument `CD-10` needs: a store that
 *  repairs its own absent address would answer the very value the question is about (`armed` above does exactly that, and
 *  that is why it cannot be used here). A value this store answers stood on the DISK; a refusal is the disk's own word
 *  `AddressNotFound` (`guide §9.1`). */
function reopened(dir: string): ReturnType<typeof storeCreate> {
  return storeCreate({ journalLength: 256, listeners: [], filePath: join(dir, FILE) })
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

/** **THE LANDING INSTANT'S CONTEXT** (`D-123`): the same five members with `tier` set, which is the ONE thing `atWrite`
 *  reads — so a body's two arms are driven from one helper apiece and neither row has to guess which instant it is at. */
const atLanding = (address: readonly string[], value: unknown): Record<string, unknown> =>
  ({ address, attempt: { id: 'attempt-x' }, op: { opId: 'op-x' }, tier: 'mem', value })

/** The body at one DECLARED ID, read off the batch the module handed the package — by id and not by address, because
 *  the two invariant seats stand at the two addresses the existence pairs stand at too (`D-124`). */
function seatAt(batch: readonly Record<string, unknown>[], id: string): (context: unknown) => unknown {
  const pair = batch.find((element) => element['id'] === id)
  if (pair === undefined) throw new Error(`no pair stands under ${id}`)
  return pair['constraint'] as (context: unknown) => unknown
}

/** The batch's own pairs wrapped in a COUNTER and handed to a real store, so an ASK is recorded under the pair's id:
 *  the package's membership rule read at THIS instance's addresses rather than argued from a guide (`D-124`). */
function armedCounting(batch: readonly Record<string, unknown>[], log: string[]): ReturnType<typeof storeCreate> {
  const wrapped = batch.map((pair) => ({
    address: pair['address'],
    id: pair['id'],
    constraint: (context: unknown) => { log.push(String(pair['id'])); return (pair['constraint'] as (c: unknown) => unknown)(context) },
  }))
  return storeCreate({ journalLength: 256, listeners: [], filePath: join(userDataDir, FILE), constraints: wrapped as never })
}

describe('the instance’s declarations · measured at the store’s creation (D-84, D-85)', () => {
  it('CD-1 · the creation instant: all FOUR addresses stand BEFORE any act, where the same construction without the batch refuses `AddressNotFound` at each of them (D-84, D-85, D-123; D-69’s `tabsMustStand` shape)', () => {
    // THE CONTROL FIRST, over its own directory so the two stores share no register: a construction with the SAME keys
    // minus `constraints` is this instance before D-84, and it is what every row below must be able to fail against.
    const bare = mkdtempSync(join(tmpdir(), 'creation-declarations-bare-'))
    try {
      const unarmed = storeCreate({ journalLength: 256, listeners: [], filePath: join(bare, FILE) })
      expect(refusalOf(() => unarmed.read(EXCLUSION, 'mem')).status, 'the control: with no batch the volatile address holds nothing, and the read refuses at the ADDRESS rung rather than answering an empty pair').toBe('AddressNotFound')
      expect(refusalOf(() => unarmed.read(RECORD, 'file')).status, 'and the durable record is absent in the same control — the state `FIRST_RUN` is substituted for at the read').toBe('AddressNotFound')
      expect(refusalOf(() => unarmed.read(APP_STATE, 'file')).status, 'and so is the row list — the state the second import-once arm ran over').toBe('AddressNotFound')
      expect(refusalOf(() => unarmed.read(PANE, 'mem')).status, 'and the pane`s own `mem` record, which `D-123` declares: an unarmed store has no open-state record at all').toBe('AddressNotFound')
    } finally {
      rmSync(bare, { recursive: true, force: true })
    }

    // THE INSTANCE ITSELF: one construction, whose batch is captured at the package boundary.
    const settings = createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    // ⟶ **SIX ELEMENTS SINCE `D-124`, AND THE ORDER IS PART OF THE CLAIM**: the four families' existence pairs, then the
    // invariant's TWO seats at the two halves' OWN addresses — LAST, because at the creation instant each pair is asked in
    // this list's own order and each seat must see the halves its siblings have just minted.
    expect(batch.map((pair) => [pair['address'], pair['id']]), 'the batch is SIX pairs: one existence pair per address under the ids this file spells, plus the invariant at EACH half it judges — the census of what the instance imposes, read off the configuration and not off the source').toEqual([
      [RECORD, RECORD_ID],
      [APP_STATE, APP_STATE_ID],
      [EXCLUSION, EXCLUSION_ID],
      [PANE, PANE_ID],
      [PANE, PANE_EXCLUSIVITY_ID],
      [EXCLUSION, PORTS_EXCLUSIVITY_ID],
    ])

    // THE SAME BATCH, adopted by a real store: every address stands at the creation instant, with no verb of any
    // caller's having run, on a profile whose file is empty.
    const created = armed(userDataDir, batch)
    expect(created.read(EXCLUSION, 'mem'), 'the pair stands, and it is `SAFE_PAIR`’s own value written as ONE whole `{exclusion}`: `tier4` is derived at the read and is never stored (interface.md §1)').toEqual({ exclusion: 'mcp-enabled' })
    expect(created.read(RECORD, 'file'), 'the durable record stands, at `FIRST_RUN`’s own image: a profile holding no retired seed has nothing to import, so the repair writes the placeholder the read used to substitute (D-85)').toEqual({ enabled: ['read', 'dispatch'] })
    expect(created.read(APP_STATE, 'file'), 'and the row list stands with the arm the import ran in it — `absent`, because this profile carries no retired carrier (D-85)').toEqual({ rows: [], legacy: 'absent', unrepresentable: [] })
    // **THE FOURTH ADDRESS STANDS CLOSED, AND THE INVARIANT IT HALVES HOLDS AT THE CREATION INSTANT**: an open pane over
    // open ports is the one state the batch refuses, and the boot's own mint is the closed one — so the creation instant
    // is a legal state by construction and not by a later act (`D-123`).
    expect(created.read(PANE, 'mem'), 'the pane record stands at the family`s one legal closed value, written as ONE whole `{open}`').toEqual({ open: false })
    // **AND THE FILE CARRIES BOTH RECORDS BEFORE ANY CALLER ACT: A REGISTRATION-INSTANT REPAIR'S `file` WRITE IS
    // SETTLED INTO THE FILE AT THE MEMBER THAT LANDS IT** (measured 2026-11-03 on the installed `1.9.1`, `125` bytes).
    // `D-85`'s limit — *"a registration-instant repair LANDS AN OP AND IS SAVED BY NOTHING"* — is OVERTURNED BY
    // MEASUREMENT and read through `D-86` by pointer: the save is the landing arm's, and the landing arm is the write
    // the repair made. `CD-10` carries the instrument that settles it (a SECOND INSTANCE over the same `filePath`
    // answering the repaired value) and the two-boot idempotence proof beside it.
    // **AND THE PANE'S MINT ADDS NO BYTE TO THE FILE, WHICH IS THE `mem` HALF'S OWN MEASUREMENT**: a `file`-tier write is
    // what saves, and both `D-123` declarations are `mem` — so the bytes below are `CD-1`'s at `D-85` and `D-123` both.
    expect(readFileSync(join(userDataDir, FILE), 'utf8'), 'the two `file` records the batch wrote, at their own addresses, in the store’s own bytes').toBe(
      '{"operator-app-state":{"legacy":"absent","rows":[],"unrepresentable":[]},"operator-settings":{"enabled":["read","dispatch"]}}',
    )
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
    expect(batch.map((pair) => (pair['address'] as readonly string[])[0]), 'the second construction hands the package the same six pairs: the four existence pairs and the invariant at each half it judges (`D-124`)').toEqual([RECORD[0], APP_STATE[0], EXCLUSION[0], PANE[0], PANE[0], EXCLUSION[0]])
    expect(armed(userDataDir, batch).read(EXCLUSION, 'mem'), 'so at the second instance’s creation instant the address stands at the safe pair again — the whole of V5’s closing, measured over two boots rather than asserted').toEqual({ exclusion: 'mcp-enabled' })
    expect({ exclusion: second.read().exclusion, tier4: second.read().tier4 }, 'and the second boot’s read serves it, which is the value clause 3 now gets from a constraint repair and from no file (D-84)').toEqual({ exclusion: 'mcp-enabled', tier4: false })

    // **AND ON THIS ARM ONLY ONE REPAIR LANDS, WHICH IS THE OPPOSITE OF `D-85`'S LIMIT AND IS THAT LIMIT OVERTURNED**
    // (CD-10 carries the instrument): the first boot's repairs wrote both `file` records and `1.9.1` SETTLES EACH AT THE
    // MEMBER THAT LANDS IT, so the second boot finds both addresses standing and repairs only the `mem` pair — its first
    // caller-visible receipt is the SECOND op, one repair and not three (measured 2026-11-03 on the installed tree,
    // where `D-85` measured `4` and `D-84` measured `2` for a different reason). **THE IMPORT IS READ ONCE PER PROFILE**:
    // the marker is the RECORD, and a record the boot saved is one the next boot finds.
    const secondReceipt = second.write({ token: 'after-the-second-boot' })
    // ⟶ **`2 -> 3` AT `D-123`**: TWO repairs stand behind this write — the `mem` pair`s and the pane record`s, both `mem`
    // and therefore both re-minted on every boot — while the first boot's two `file` records reached the disk before it
    // returned. The invariant pair repairs nothing here, because a closed pane over enabled ports is a legal state.
    expect(secondReceipt.status === 'committed' ? secondReceipt.cursor : null, 'TWO repairs stand behind this write — the `mem` pair’s and the pane record’s — and neither `file` address was repaired').toBe(3)
    expect(readFileSync(join(userDataDir, FILE), 'utf8').includes('"token":"after-the-second-boot"'), 'and the byte reading that explains the count: the caller write is what moved the file, not the boot (both boots left it standing)').toBe(true)
  })

  it('CD-4 · each body answers TWO arms: EXISTENCE repaired at the creation instant, and the VALUE refused at a WRITE — a wrong member stands where no write can roll it back and is refused where one can (D-84, D-85, D-105)', () => {
    const batch = (() => { createOperatorSettings({ userDataDir }); return lastBatch() })()
    const store = armed(userDataDir, batch)
    const exclusion = bodyAt(batch, EXCLUSION)
    const record = bodyAt(batch, RECORD)
    const appState = bodyAt(batch, APP_STATE)

    expect(exclusion(atCreation(EXCLUSION, undefined)), 'an address holding nothing is refused, with a sentence that names the pair and not the act').toMatchObject({ message: expect.stringContaining('operator exclusion') })
    expect(exclusion(atCreation(EXCLUSION, { exclusion: 'mcp-enabled' })), 'a pair that stands passes').toBe(true)
    expect(exclusion(atCreation(EXCLUSION, { exclusion: 'mcp-disabled' })), 'and so does the other word: existence is the arm, not the value').toBe(true)
    expect(exclusion(atCreation(EXCLUSION, { exclusion: 7 })), 'AND AT THE CREATION INSTANT A PRESENT PAIR WHOSE MEMBER IS NOT A TOKEN STILL PASSES — there is no standing record for a rollback to protect and a refusal there refuses the CONSTRUCTION, so the value arm answers this instant with `true` (D-105, measured both ways in the row below)').toBe(true)

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

    // **THE OTHER INSTANT, AND IT IS THE ONE `D-105` MOVED**: at a LANDING instant a value STANDS, the store's own
    // rollback protects it, and the arm REFUSES — so the wrong-typed member neither lands nor is repaired over, and the
    // pair that stood is exactly the pair that still stands. THIS IS THE CONTROL FOR THE CREATION-INSTANT ARM ABOVE: the
    // same value passes where no rollback exists and is refused where one does.
    const stood = store.read(EXCLUSION, 'mem')
    let refused: unknown = null
    try { store.write(EXCLUSION, 'mem', { exclusion: 7 }) } catch (caught) { refused = caught }
    expect({ status: (refused as { status?: unknown } | null)?.status }, 'the write is REFUSED by the pair, not by the boundary and not by the engine').toEqual({ status: 'ConstraintPassRefused' })
    expect((refused as { message?: unknown } | null)?.message, 'in the pair’s own sentence, which names the fault and not the act').toContain('names nothing the gate can apply')
    expect(store.read(EXCLUSION, 'mem'), 'and the pair that stood is untouched — no repair ran over it and no placeholder replaced it').toEqual(stood)

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

  it('CD-5 · the creation instant LANDS FOUR OPS: one per existence pair, so the first caller-visible receipt is the FIFTH op — the declared surface’s own witness that four repairs ran (interface.md §2 ASM-L2-7; D-84, D-85, D-123)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const receipt = settings.write({ token: 't' })
    expect(receipt.status, 'the first caller act commits').toBe('committed')
    if (receipt.status !== 'committed') return
    // THE STORE'S OWN ORDINAL, VERBATIM: three ops were minted before this write, one per declared address. Absent the
    // declarations the same act reads `cursor: 1` — one per D-84 declaration reads `2` — so the row is the surface-side
    // half of CD-1's address-side one, and the figure it pins is the journal's first caller-visible ordinal (D-85).
    // ⟶ **`4 -> 5` AT `D-123`**: the fourth existence repair — the pane's `mem` mint — lands before any caller act. The
    // invariant pair lands NOTHING at creation, because the state it judges is legal there (`D-123`), so the ordinal is
    // exactly the four repairs and not five.
    expect({ cursor: receipt.cursor, opId: typeof receipt.opId === 'string' && receipt.opId.length > 0 }, 'exactly four ops stand behind the first caller write, and they are the four existence repairs’ — the invariant’s repair ran zero times').toEqual({ cursor: 5, opId: true })
  })

  it('CD-6 · the batch’s membership is a census: all FOUR addresses carry an existence declaration, the invariant stands at EACH half it judges and at no other address, and each `file` declaration performs the import its address’s absence used to key — which is the half `D-84` stopped and `D-85` builds (D-84, D-85, D-124; D-82’s V1)', () => {
    createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    // READ OFF THE CONFIGURATION THE MODULE HANDS THE PACKAGE, never off `src/**`: a comment naming an address cannot
    // satisfy this row, which is the hollow-green class D-84's row is written against.
    expect(batch.map((pair) => (pair['address'] as readonly string[])[0]), 'six pairs over FOUR addresses and no fifth: the two `mem` families, the two `file` ones whose imports move INSIDE their repairs, and the invariant at each `mem` half').toEqual([RECORD[0], APP_STATE[0], EXCLUSION[0], PANE[0], PANE[0], EXCLUSION[0]])
    expect(batch.map((pair) => pair['id']), 'under the six ids, so a declaration cannot be dropped or renamed silently').toEqual([RECORD_ID, APP_STATE_ID, EXCLUSION_ID, PANE_ID, PANE_EXCLUSIVITY_ID, PORTS_EXCLUSIVITY_ID])
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

  /** ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
   *  `D-123` — THE INVARIANT, DRIVEN THROUGH THE INSTANCE'S OWN SURFACE. **THE INSTRUCTION, VERBATIM:** *"Enforce that the
   *  security pane cannot be open while the MCP ports are open"*. The rows below drive `writePane` and `write` — the
   *  declared verbs, over a REAL construction whose batch is the module's own — so every observation is a value the
   *  module actually answers and not one a probe composed. **THE OBSERVABLE IS `read().exclusion`**: the crossing's read
   *  is the one place the pair's state is public, and each row's claim is that a landed act cannot leave it enabled
   *  while the pane record stands open.
   *  ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  it('CD-13 · EDGE ONE — THE PANE CANNOT BE OPENED WHILE THE PORTS STAND OPEN: `writePane(true)` COMMITS and the store holds the pane open with the pair CLOSED, because the invariant`s repair wrote the pair inside that write (D-123)', () => {
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.read().exclusion, 'the boot: the pair stands enabled and the pane record stands closed — the one legal starting pair').toBe('mcp-enabled')
    expect(settings.read().tier4, 'with `tier4` derived from the record: false, because the pair is enabled').toBe(false)

    const opened = settings.writePane(true)
    expect(opened.status, 'THE USER`S ACT SUCCEEDS: the pane opens, and its write is COMMITTED — the repair settles the OTHER half, so the act that raised the fault is never the one reversed').toBe('committed')
    expect(settings.read().exclusion, 'AND THE STORE CANNOT HOLD THE ILLEGAL PAIR: the ports stand closed the instant the pane stands open, and the pair was written by the repair inside this very write').toBe('mcp-disabled')
    expect(settings.read().tier4, 'so the derived reading follows it, which is what every consumer of the record sees').toBe(true)

    // **RED ON REVERT — MEASURED, NOT ASSERTED**: with `no-open-pane-over-open-ports` removed from the batch the same
    // three lines read `mcp-enabled`, `mcp-enabled`, `false` — the pane opens and the ports stay open. The row is that
    // difference and nothing else (the revert is printed in `D-123`'s row, with the figure it produced).
  })

  it('CD-14 · EDGE TWO — THE PORTS CANNOT BE ENABLED WHILE THE PANE STANDS OPEN: `write({exclusion: enabled})` COMMITS and the record still reads `mcp-disabled`, which is the same one body judging the other landing op (D-123)', () => {
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.writePane(true).status, 'the pane is opened first, which has already closed the ports (edge one)').toBe('committed')
    const enable = settings.write({ exclusion: 'mcp-enabled' })
    expect(enable.status, 'THE ENABLE IS ANSWERED AS A COMMIT: the invariant`s repair lands a whole legal pair, so the caller`s write is not refused and not reversed').toBe('committed')
    expect(settings.read().exclusion, 'AND THE PORTS STAY CLOSED — the second landing op is refused the illegal state exactly as the first was').toBe('mcp-disabled')
    // **RED ON REVERT**: with the invariant removed the same write leaves the record at `mcp-enabled`, so the pane would be
    // open over open ports — the state the whole pass exists to make unholdable.
  })

  it('CD-15 · WHICH HALF THE REPAIR SETTLES: THE PORTS, NEVER THE PANE — three measurements, and the third is the one that tells the two apart (D-123)', () => {
    const settings = createOperatorSettings({ userDataDir })
    // (1) THE PANE'S ACT STANDS: opening it is committed and a SECOND open is committed too — a repair that settled the
    //     pane would have answered the second write with the pane it had just closed.
    expect(settings.writePane(true).status, 'the pane opens').toBe('committed')
    expect(settings.writePane(true).status, 'and remains open: a second identical act is an ordinary commit').toBe('committed')
    // (2) THE DISCRIMINATOR: if the repair had closed the PANE instead, this enable would stand — nothing would fault. It
    //     does not stand, so the pane is still open and the pair is what was settled.
    expect(settings.write({ exclusion: 'mcp-enabled' }).status, 'the enable commits (the repair lands)').toBe('committed')
    expect(settings.read().exclusion, 'and the record still says the ports are closed — the pane stands open, so the repair settled the PAIR and left the pane alone').toBe('mcp-disabled')
    // (3) THE CONTROL — AN ORDINARY EXCLUSION CHANGE STILL WORKS: with the pane closed the same enable is the caller's own
    //     write, it lands at the pair's own address and NOTHING repairs it.
    expect(settings.writePane(false).status, 'the pane closes').toBe('committed')
    const before = settings.read().exclusion
    const ordinary = settings.write({ exclusion: 'mcp-enabled' })
    expect(ordinary.status, 'and the exclusion change commits').toBe('committed')
    expect(settings.read().exclusion, 'THE CONTROL: the caller`s own state stands, so the row above is the invariant at work and not a blanket close').toBe('mcp-enabled')
    expect(before, 'and it was closed before this write, so the control measured a move and not a coincidence').toBe('mcp-disabled')
    // the control's own red-on-revert: remove the pair's existence declaration and this write has no `mem` version to move,
    // so `read()` falls back to `SAFE_PAIR` and the control's `before` reads `mcp-enabled` — both assertions red.
  })

  it('CD-16 · TWO SEATS, ONE PREDICATE, AND NO ROOT ADDRESS — the batch names no `[]`, each seat stands at the half whose landing op it is asked for, and a write at one half NEVER reaches the other (measured both ways); the reason two seats exist is that read (`D-124`, re-deriving `D-123`’s root-address census)', () => {
    // **THE ROW THAT ASSERTED THE ROOT IS RE-DERIVED RATHER THAN SOFTENED (D-46).** `D-123` put ONE pair at `[]` because it
    // held that "a pair at either half's address is asked for that half's landing op only, so only the root catches both
    // edges with one body". The second half of that premise is the part that was wrong: a body can READ the other half
    // (`guide §7.6`), so the root was compensating for a limitation that does not exist.
    createOperatorSettings({ userDataDir })
    const batch = lastBatch()

    // (1) THE CENSUS — NO ROOT, AND BOTH SEATS AT THEIR OWN HALF'S ADDRESS. A root address is an EMPTY segment array, and
    // that is what the batch no longer contains anywhere in it.
    expect(batch.every((pair) => (pair['address'] as readonly string[]).length > 0), 'no element of the batch stands at the store`s root: the address is what makes the package ask a pair, and `[]` is an address no act of this instance writes').toBe(true)
    expect(batch.filter((pair) => pair['id'] === PANE_EXCLUSIVITY_ID).map((pair) => pair['address']), 'the pane`s seat stands at the pane`s address, under the id that names the fault it can raise').toEqual([PANE])
    expect(batch.filter((pair) => pair['id'] === PORTS_EXCLUSIVITY_ID).map((pair) => pair['address']), 'and the ports` seat stands at the ports` address, under the id that names the same state from its own side').toEqual([EXCLUSION])

    // (2) THE MEASUREMENT THAT MAKES TWO SEATS NECESSARY — THE TRIGGERED SETS, BOTH DIRECTIONS. The module's own batch,
    // wrapped in a counter and adopted by a real store, over the profile this instance already stands on (whose halves are
    // the legal boot state, so every pair passes and no repair perturbs the set).
    const asked: string[] = []
    const store = armedCounting(batch, asked)
    asked.length = 0
    const atPane = store.write(PANE, 'mem', { open: false }) as unknown as { triggered: Array<{ address: readonly string[] }> }
    expect(asked, 'A WRITE AT THE PANE`S ADDRESS asks the pairs standing AT that address and no pair at the other half — the ports` seat is not in this list').toEqual([PANE_ID, PANE_EXCLUSIVITY_ID])
    expect(atPane.triggered.map((entry) => entry.address), 'and the act`s own `triggered` set carries that one address and nothing beside it').toEqual([PANE, PANE])

    asked.length = 0
    const atPorts = store.write(EXCLUSION, 'mem', { exclusion: 'mcp-enabled' }) as unknown as { triggered: Array<{ address: readonly string[] }> }
    expect(asked, 'AND THE REVERSE: a write at the ports` address asks the pairs standing there and never the pane`s seat — a sibling write reaches NEITHER seat, whichever half moved').toEqual([EXCLUSION_ID, PORTS_EXCLUSIVITY_ID])
    expect(atPorts.triggered.map((entry) => entry.address), 'and its `triggered` set is that one address too').toEqual([EXCLUSION, EXCLUSION])

    // (3) ONE BATCH, ONE CONSTRUCTION, NO SECOND STORE: the six declarations ride ONE `createProfileStore` call.
    const before = captured.length
    createOperatorSettings({ userDataDir })
    expect(captured.length - before, 'one construction hands the package exactly ONE configuration, so the six declarations are one batch in one store and never a second instance').toBe(1)
    expect(batch.length, 'and the batch a reader counts is six elements long — the four existence pairs and the two seats').toBe(6)

    // (4) BOTH SEATS CATCH THEIR OWN EDGE, THROUGH THE MODULE'S OWN VERBS (`CD-13`/`CD-14` are the same two edges read row
    // by row; this is the census row's own sight of them).
    const both = createOperatorSettings({ userDataDir })
    expect(both.read().exclusion).toBe('mcp-enabled')
    expect(both.writePane(true).status, 'the pane opens, and the pane seat`s repair settles the ports inside that write').toBe('committed')
    expect(both.read().exclusion, 'so the instance cannot hold the illegal pair at the pane`s edge').toBe('mcp-disabled')
    expect(both.write({ exclusion: 'mcp-enabled' }).status, 'and at the ports` edge the enable commits while the repair settles the same half').toBe('committed')
    expect(both.read().exclusion, 'and the record still says the ports are closed').toBe('mcp-disabled')
  })

  it('CD-18 · EACH SEAT READS BOTH HALVES AND FOLLOWS THE STORE — the re-run hands a seat the repair`s landed value at ANOTHER address while `context.address` still names its own, so the seat judges what it READS (`D-124`; `guide §7.6`: *"If a constraint needs to look for the data at a given location, it can read()"*)', () => {
    // **THE MEASUREMENT THE DESIGN RESTS ON, TAKEN 2026-11-05 ON THE INSTALLED `provident-storeroom@1.9.3`**: a write at
    // `['operator-pane']` whose repair landed `{exclusion:'mcp-disabled'}` at `['operator-exclusion']` handed the pane`s seat
    // `{address: ['operator-pane'], value: {exclusion:'mcp-disabled'}}` on the re-run — the pair`s address and its value
    // DISAGREE, so `context.value` answers for the repair`s landing and not for the seat`s own half. That is why the seat
    // reads BOTH halves through the store, and this row drives the consequence: a value at its own address that the store
    // does not hold loses to what the store holds.
    createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    const paneSeat = seatAt(batch, PANE_EXCLUSIVITY_ID)
    const portsSeat = seatAt(batch, PORTS_EXCLUSIVITY_ID)

    // THE BOOT STATE: the pane record stands CLOSED and the pair stands ENABLED (`CD-1` measures both). So the ports stand
    // OPEN and the pane stands closed — a legal state, and the one the readings below are taken against.
    // (1) THE RE-RUN'S OWN SHAPE — a pair`s address carrying the OTHER address`s object passes, because the seat reads.
    expect(paneSeat(atLanding(PANE, { exclusion: 'mcp-disabled' })), 'handed the repair`s landed pair at the PANE`s address, the pane`s seat answers for the pane it reads and not for the object it was handed').toBe(true)
    // (2) THE DISCRIMINATING DRIVE — an OPEN-PANE value at the pane`s address that the store does NOT hold. A body trusting
    //     `context.value` would judge an open pane over the ENABLED ports it reads and fault; the store says the pane is
    //     closed, and the store is what this seat answers to.
    expect(paneSeat(atLanding(PANE, { open: true })), 'a value the store does not hold cannot manufacture the fault: the pane stands closed at the address, so the seat passes').toBe(true)
    // (3) AND THE MIRROR AT THE PORTS` SEAT: handed the PANE`s object at the PORTS` address, it does not mistake one half for
    //     the other — it reads both, and the state it reads is legal.
    expect(portsSeat(atLanding(EXCLUSION, { open: true })), 'the ports` seat handed the pane`s object still answers for the two halves it reads').toBe(true)
    expect(portsSeat(atLanding(EXCLUSION, { exclusion: 'mcp-enabled' })), 'and handed its own half`s open word — which the store also holds, since the boot`s pair stands enabled — it passes, because the pane it reads stands closed').toBe(true)

    // (4) THE OTHER DIRECTION IS UNREACHABLE, AND THAT IS THE INVARIANT`S OWN DOING: a store holding BOTH halves open is the
    // state the two seats exist to make unholdable, so no act reaches a seat that must fault on what it reads. The faulting
    // edge is therefore measured where it is reachable — through the surface, at `CD-13` and `CD-14`.
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.writePane(true).status, 'the pane opens, and its own seat`s repair closes the ports inside that write').toBe('committed')
    expect(settings.read().exclusion, 'so the store cannot hold the pair the seat would have to fault on').toBe('mcp-disabled')
    expect(paneSeat(atLanding(PANE, { exclusion: 'mcp-enabled' })), 'and handed the OPEN pair at its own address, the pane`s seat still passes: the store it reads holds the ports closed, and the read is the authority').toBe(true)
  })

  it('CD-17 · THE PANE FAMILY`S TWO ARMS — existence repaired at creation, and the value refused BEFORE any store verb by the module`s own write, which is the only route this module has to the record (D-105 read at the fourth address; D-123)', () => {
    createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    const pane = bodyAt(batch, PANE)
    expect(pane(atCreation(PANE, undefined)), 'an absent record is REFUSED with a repair: the creation instant mints `{open:false}`').toMatchObject({ message: expect.stringContaining('operator pane record') })
    expect(pane(atCreation(PANE, { open: false })), 'a legal record passes').toBe(true)
    expect(pane(atCreation(PANE, { open: true })), 'and the other boolean passes — existence is the arm, not the value').toBe(true)
    expect(pane(atCreation(PANE, { open: 'yes' })), 'AND AT THE CREATION INSTANT A NON-BOOLEAN PASSES, exactly as the other three families` value arms do: a refusal there refuses the CONSTRUCTION, and there is no standing record for a rollback to protect (D-105)').toBe(true)

    // **THE VALUE ARM`S LANDING HALF IS REACHED BY A REVERT AND BY NOTHING ELSE THIS MODULE CAN DO** — its own note says
    // so, and the row below is the measurable consequence: with the boundary guard removed, `writePane` composes
    // `{open:'yes'}`, the body READS it at the landing instant and refuses it with `PANE_UNUSABLE_MESSAGE`, so the answer
    // changes from this module`s `ValueRefusedAtBoundary` to the store`s `ConstraintPassRefused`. Both halves are measured
    // in `D-123`'s revert table; what this row pins is the GUARDED answer, which is the one a caller meets.
    const settings = createOperatorSettings({ userDataDir })
    expect(settings.writePane('yes' as unknown as boolean), 'a non-boolean is refused as a VALUE by this module`s own sentence, with no store verb').toMatchObject({ status: 'refused', reason: 'ValueRefusedAtBoundary', message: 'open is a boolean', address: null })
    expect(settings.writePane(1 as unknown as boolean), 'and a number is refused the same way — the arm is total over the non-boolean domain').toMatchObject({ status: 'refused', reason: 'ValueRefusedAtBoundary' })
    expect(settings.read().exclusion, 'and neither refusal moved the record: the pair stands where it stood').toBe('mcp-enabled')

    // **AND THE REFUSED CONSTRUCTION STILL ANSWERS A CLOSED PANE** — the arm no declaration can reach (no instance, hence
    // no batch and no repair), read here so a caller of `writePane` over a dead instance is not left guessing.
    const unusable = mkdtempSync(join(tmpdir(), 'creation-declarations-pane-unusable-'))
    try {
      mkdirSync(join(unusable, FILE))
      const dead = createOperatorSettings({ userDataDir: unusable })
      expect(dead.writePane(true), 'the pane verb answers the construction`s own refusal rather than pretending').toMatchObject({ status: 'refused', reason: 'FilePathUnreachable' })
    } finally {
      rmSync(unusable, { recursive: true, force: true })
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

  it('CD-10 · TWO SUCCESSIVE BOOTS over the same profile: the second imports NOTHING and repairs NOTHING at either `file` address, and a creation repair’s DURABILITY is decided by a SECOND INSTANCE over the same bytes — which ANSWERS THE REPAIRED VALUE (D-86, overturning D-85’s limit by measurement)', () => {
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
    // ⟶ **`2 -> 3` AT `D-123`**: TWO repairs stand behind the second boot's first write — the exclusion pair's and the pane
    // record's, the two `mem` families that can never persist — while neither `file` address was absent, so neither import
    // re-ran. The invariant pair repaired nothing, and that is its own half of the claim: a legal state is not repaired.
    expect(secondReceipt.status === 'committed' ? secondReceipt.cursor : null, 'two repairs stand behind the second boot’s first write, and they are the two `mem` families’ — the pair’s and the pane record’s: neither `file` address was absent, so neither import ran').toBe(3)
    expect(readFileSync(join(userDataDir, SEED), 'utf8'), 'and the retired seed is byte-identical: nothing wrote it, and nothing needed to re-read it (D-19)').toBe(seededSeed)
    expect(readFileSync(join(userDataDir, CARRIER), 'utf8'), 'nor the retired carrier').toBe(seededCarrier)

    // **AND THE INSTRUMENT THE REST OF THIS ROW USES IS PROVED HERE, ON THE ARM WHERE A SAVE HAS ALREADY RUN**: a SECOND
    // INSTANCE over the same file answers BOTH repaired records at their own tier. It carries no constraint list and so
    // runs no repair, which is the whole of why its answer is the DISK's and not a repair's — the reading is `guide §9.1`'s
    // own ("a fresh construction at the same `filePath` re-boots from those bytes"), and it is stronger than any size: a
    // file could hold the wrong bytes at the right length and this store could not answer them (measured 2026-11-03).
    const landed = reopened(userDataDir)
    expect(landed.read(RECORD, 'file'), 'a second instance over these bytes answers the record a CALLER’S save landed').toEqual({ token: 'second-boot', enabled: ['graph'], maxJournalLength: 9 })
    expect(landed.read(APP_STATE, 'file'), 'and the row-list record beside it — the `{rows}` a caller’s `writeAppState` composes, which is why the word above reads `recorded`').toEqual({ rows: [{ name: 'file.tabs.order', value: ['a'] }] })

    // **THE DURABILITY OF A CREATION REPAIR, PINNED BY THE SAME INSTRUMENT AND NOT BY A SIZE — AND THE LIMIT `D-85`
    // RECORDED HERE IS OVERTURNED BY MEASUREMENT** (`D-86`; the release's own summary, verbatim: *"A REVERSAL'S SAVE —
    // THE FILE HOLDS THE STATE THE REVERSAL RESTORED, WRITTEN AFTER THE JUDGEMENT THAT JUDGED IT"*, whose mechanism is
    // the one this row measures: **the save is the landing arm's, and a registration-instant repair's write IS that
    // arm**). The instrument is unchanged and it is the one `D-85` used against itself: a SECOND STORE over the same
    // `filePath` with NO constraint list, so no repair can answer for the disk. `D-85` measured `AddressNotFound` here;
    // the installed `1.9.1` answers the repaired value, with no caller write between (measured 2026-11-03, one fresh
    // process per arm, `158` bytes at the end of construction and byte-stable after a 200 ms tick).
    const unsaved = mkdtempSync(join(tmpdir(), 'creation-declarations-cd10-'))
    try {
      writeFileSync(join(unsaved, CARRIER), '{"schemaVersion":"1","file.first":1}')
      const unsavedBoot = createOperatorSettings({ userDataDir: unsaved })
      // THE REPAIR DID WRITE, AND IT IS THE DISK'S NOW: the value stands in the instance that minted it AND at the
      // address a second instance reads, so the byte reading below is neither "nothing was saved" nor "nothing
      // happened" — it is the save the repaired write took.
      expect(unsavedBoot.readAppState().rows, 'the boot’s repair wrote the imported row INTO THE INSTANCE').toEqual([{ name: 'file.first', value: 1 }])
      const firstBootBytes = statSync(join(unsaved, FILE))
      expect(firstBootBytes.size, 'THE BOOT ALONE MATERIALISED THE FILE: the two creation records, saved at the members that landed them').toBe(158)
      expect(readFileSync(join(unsaved, FILE), 'utf8'), 'and the bytes carry both, the imported row list included').toBe(
        '{"operator-app-state":{"legacy":"imported","rows":[{"name":"file.first","value":1}],"unrepresentable":[]},"operator-settings":{"enabled":["read","dispatch"]}}',
      )
      // **THE DECISIVE READING, AND IT IS NOT A SIZE**: a second instance over the SAME file ANSWERS THE REPAIRED
      // RECORD AT BOTH `file` ADDRESSES. That is the reading a claim of durability has to survive, and it survives it.
      const secondInstance = reopened(unsaved)
      expect(secondInstance.read(RECORD, 'file'), 'a second instance ANSWERS the repaired record: the creation repair’s write reached these bytes with no caller write between').toEqual({ enabled: ['read', 'dispatch'] })
      expect(secondInstance.read(APP_STATE, 'file'), 'and the repaired row list, with the arm the import ran in, at the other `file` address').toEqual({ rows: [{ name: 'file.first', value: 1 }], legacy: 'imported', unrepresentable: [] })
      expect(secondInstance.read([]), 'and the register it re-booted from holds exactly the two records the boot wrote').toEqual({
        'operator-app-state': { legacy: 'imported', rows: [{ name: 'file.first', value: 1 }], unrepresentable: [] },
        'operator-settings': { enabled: ['read', 'dispatch'] },
      })
      expect({ size: statSync(join(unsaved, FILE)).size, ino: statSync(join(unsaved, FILE)).ino }, 'and a tick moves neither the size nor the inode: the save is not a deferred act').toEqual({ size: firstBootBytes.size, ino: firstBootBytes.ino })
      // THE CARRIER IS REWRITTEN BETWEEN THE BOOTS, which is the instrument: a second boot that re-ran the import answers
      // the NEW row, and one that did not answers the old — a content test, not an atime one (this volume mounts with
      // `relatime`/`noatime` and an atime reading is not an instrument here, measured 2026-11-03).
      writeFileSync(join(unsaved, CARRIER), '{"schemaVersion":"1","file.second":2}')
      const secondBoot = createOperatorSettings({ userDataDir: unsaved })
      expect(secondBoot.readAppState().rows, 'the second boot answers the FIRST boot’s imported row, not the rewritten carrier’s: the import did not re-run, because the record the first boot saved is the marker').toEqual([{ name: 'file.first', value: 1 }])
      expect(readFileSync(join(unsaved, FILE), 'utf8').includes('file.second'), 'and not one byte of the rewritten carrier reached the instance file').toBe(false)
      const unsavedReceipt = secondBoot.write({ token: 'unsaved' })
      // ⟶ **`2 -> 3` AT `D-123`**: TWO repairs land behind this write — the two `mem` families that can never persist — while
      // both `file` addresses already stood on the disk.
      expect(unsavedReceipt.status === 'committed' ? unsavedReceipt.cursor : null, 'and TWO repairs landed behind its first write — the two `mem` families’ — because both `file` addresses already stood on the disk').toBe(3)
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
        // THE RECORD IS ALSO ON THE DISK, carrying the same word: the repair's write is the save's own op
        // (measured 2026-11-03 on the installed `1.9.1`; `CD-10`'s instrument). A corrupt carrier leaves the
        // RECORD standing with its word, and no byte of the CARRIER is written — the two are different files.
        expect(readFileSync(join(dir, FILE), 'utf8'), `CD-11/${arm.why}: the boot saved the record carrying that word`).toBe(
          '{"operator-app-state":{"legacy":"corrupt","rows":[],"unrepresentable":[]},"operator-settings":{"enabled":["read","dispatch"]}}',
        )
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

  it('CD-19 · ONE ACT, ONE REPAIR — the two seats never settle one act twice: a repaired act lands EXACTLY two ops (its own write and one repair) and delivers on exactly the handles those two writes fired, an ordinary act lands one, and no act reaches the restart budget (`D-124`; `D-123`\u2019s repair direction, unchanged)', () => {
    // **THE CONTROL THE PASS OWES ITSELF** (`D-124`): two pairs now judge one invariant, so the question a reader must be able
    // to answer is whether ONE act can be repaired TWICE. It cannot, and the reason is the state and not a guard: whichever
    // seat is asked first settles the PORTS, and the second seat then reads a legal state and passes. The two observables
    // this row takes are the store's own ordinals and the instance's own deliveries.
    const settings = createOperatorSettings({ userDataDir })
    const delivered: string[] = []
    settings.subscribe((address) => { delivered.push((address as readonly string[]).join('/')) })

    // (1) A REPAIRED ACT: `writePane(true)` over the boot`s ENABLED ports — the pane`s write lands, its seat`s repair lands
    //     the ports, and ONE re-run passes. Two landings and two deliveries, one per handle each of the two writes fired.
    delivered.length = 0
    const opened = settings.writePane(true)
    expect(opened.status === 'committed' ? opened.cursor : null, 'the receipt names the SECOND op, because the repair`s landing is the commit`s last op — the caller`s own write is one behind it').toBe(6)
    expect(delivered, 'and the instance delivers on the TWO handles those two writes fired, and on no third: one act, one repair').toEqual(['operator-exclusion', 'operator-exclusion'])
    expect(settings.read().exclusion, 'the state the two landings leave is legal: the pane open and the ports closed').toBe('mcp-disabled')

    // (2) THE SECOND EDGE, ONE REPAIR: the enable is the caller`s write and the ports` seat settles the same half.
    delivered.length = 0
    const enabled = settings.write({ exclusion: 'mcp-enabled' })
    expect(enabled.status === 'committed' ? enabled.cursor : null, 'two landings again — the enable and the repair that overwrites it inside the same commit').toBe(8)
    expect(delivered, 'and one delivery, because both writes fired the ports’ own handle').toEqual(['operator-exclusion'])
    expect(settings.read().exclusion, 'and the ports are still closed under the open pane').toBe('mcp-disabled')

    // (3) THE CONTROL — AN ORDINARY ACT IS NOT REPAIRED AT ALL: with the pane closed the same enable is one op and one
    //     delivery, so every figure above is the invariant's and not a constant of the surface.
    expect(settings.writePane(false).status, 'the pane closes').toBe('committed')
    const before = settings.read().exclusion
    expect(before, 'and the ports were closed when it closed').toBe('mcp-disabled')
    delivered.length = 0
    const ordinary = settings.write({ exclusion: 'mcp-enabled' })
    expect(ordinary.status === 'committed' ? ordinary.cursor : null, 'an ordinary exclusion change lands ONE op: no seat is asked to fault, so no repair rides it').toBe(10)
    expect(delivered, 'and delivers once').toEqual(['operator-exclusion'])
    expect(settings.read().exclusion, 'and the caller`s own state stands').toBe('mcp-enabled')

    // (4) AND THE BUDGET IS NEVER REACHED: ten alternating acts, each of which faults one seat and is repaired once, all
    //     COMMIT — where a repair that re-fired would cross `ConstraintPassRefused` with the budget`s own clause (§7.7's
    //     bound is three restarts per terminal act and this row spends one re-run per act, ten times over).
    let ordinal = 10
    for (let turn = 0; turn < 10; turn += 1) {
      const openArm = settings.writePane(turn % 2 === 0)
      expect(openArm.status, `CD-19/turn ${turn}: the pane act commits — a spent budget answers a refusal, never a commit`).toBe('committed')
      ordinal += 1
      const portsArm = settings.write({ exclusion: turn % 2 === 0 ? 'mcp-enabled' : 'mcp-disabled' })
      if (portsArm.status === 'committed') ordinal += 1
      expect(portsArm.status, `CD-19/turn ${turn}: and so does the ports act`).toBe('committed')
      expect(settings.read().exclusion, `CD-19/turn ${turn}: no act leaves both halves open`).toBe('mcp-disabled')
      ordinal += 1
    }
    expect(ordinal > 10, 'and the ten turns really moved the store, so the four claims above are a live pass and not a quiet one').toBe(true)
  })
})
