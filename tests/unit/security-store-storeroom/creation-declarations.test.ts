// tests/unit/security-store-storeroom/creation-declarations.test.ts — THE INSTANCE'S ONE DECLARATION, MEASURED AT THE
// STORE'S CREATION (D-84; `src/main/operator-settings/index.ts`'s `OPERATOR_CONSTRAINT_DECLARATIONS`).
//
// WHY THE CONSTRUCTION'S OWN CONFIGURATION IS THE SUBJECT, AND WHY THAT IS NOT A SYNTHETIC SEAM. The instance constructs
// its own store, so the batch it hands `storeCreate` has exactly one consumer — the `storeCreate` call — and no caller
// outside the module ever sees it. **An exported declaration list would be a second value name on a module whose entry
// is censused at ONE** (`tests/unit/settings-carrier-retirement/operator-settings.test.ts` `OS-13`:
// `Object.keys(module)` is `['createOperatorSettings']`, and `signatures.md` §2's `N = 12` is the map row's), so growing
// the surface to make a test reachable would move a census and buy no production route. What this file does instead is
// read the configuration the module ACTUALLY hands the package — a run-time datum, never the source text — and then
// construct a REAL store with that exact array. The functions it drives are the module's own, and the instant it
// measures is the creation instant the declaration exists for.
//
// THE CONTROL IS THE WHOLE POINT OF EVERY ROW BELOW: the same construction WITHOUT the captured batch refuses the
// address `AddressNotFound`, so no row here can pass on a default that a read substitutes (D-84's §1 measurement: all
// three of this instance's addresses answer `AddressNotFound` on a fresh profile while `read()` answers
// `FIRST_RUN`/`SAFE_PAIR`). **NO ROW IN THIS FILE READS `src/**`**, so none of them can pass on a comment that mentions a
// name — the hollow-green class this corpus keeps meeting. Every absence asserted below is asserted against a runtime
// registry, not against bytes.
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
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
/** The declaration's own declared id, spelled here so a rename is a RED row and never a silent one. */
const EXCLUSION_ID = 'operator-exclusion-must-stand'

let userDataDir: string
beforeEach(() => { userDataDir = mkdtempSync(join(tmpdir(), 'creation-declarations-')) })
afterEach(() => {
  captured.length = 0
  rmSync(userDataDir, { recursive: true, force: true })
})

/** The configuration the module handed the package for its LAST construction. `constraints` absent is `[]`: the key is
 *  in domain as an absence (`StoreConfig`'s fourth declared key), so both spellings are read as the empty batch. */
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

describe('the instance’s declarations · measured at the store’s creation (D-84)', () => {
  it('CD-1 · the creation instant: the batch the module hands the package stands the `mem` pair at its address BEFORE any act, where the same construction without it refuses `AddressNotFound` (D-84; D-69’s `tabsMustStand` shape)', () => {
    // THE CONTROL FIRST, over its own directory so the two stores share no register: a construction with the SAME keys
    // minus `constraints` is this instance before D-84, and it is what every row below must be able to fail against.
    const bare = mkdtempSync(join(tmpdir(), 'creation-declarations-bare-'))
    try {
      const unarmed = storeCreate({ journalLength: 256, listeners: [], filePath: join(bare, FILE) })
      expect(refusalOf(() => unarmed.read(EXCLUSION, 'mem')).status, 'the control: with no batch the address holds nothing, and the read refuses at the ADDRESS rung rather than answering an empty pair').toBe('AddressNotFound')
      expect(refusalOf(() => unarmed.read(RECORD, 'file')).status, 'and the durable record is absent in the same control — the state `FIRST_RUN` is substituted for at the read').toBe('AddressNotFound')
    } finally {
      rmSync(bare, { recursive: true, force: true })
    }

    // THE INSTANCE ITSELF: one construction, whose batch is captured at the package boundary.
    const settings = createOperatorSettings({ userDataDir })
    const batch = lastBatch()
    expect(batch.map((pair) => [pair['address'], pair['id']]), 'the batch is ONE pair, at the volatile address, under the id this file spells — the census of what the instance imposes, read off the configuration and not off the source').toEqual([[EXCLUSION, EXCLUSION_ID]])

    // THE SAME BATCH, adopted by a real store: the record stands at the creation instant, with no verb of any caller's
    // having run, on a profile whose file is empty.
    const created = armed(userDataDir, batch)
    expect(created.read(EXCLUSION, 'mem'), 'the pair stands, and it is `SAFE_PAIR`’s own value written as ONE whole `{exclusion}`: `tier4` is derived at the read and is never stored (interface.md §1)').toEqual({ exclusion: 'mcp-enabled' })
    expect(statSync(join(userDataDir, FILE)).size, 'and `mem` writes no byte: the file the construction created is still zero-length (measured; L1 §8 S-1, D-84)').toBe(0)
    expect(readFileSync(join(userDataDir, FILE), 'utf8'), 'its bytes carry no exclusion spelling at all (persistence.md §6)').toBe('')
    expect(settings.read().exclusion, 'and the module’s own read answers the same word — which it did BEFORE this declaration too, and that is exactly why the row above reads the ADDRESS and not the answer (D-84: absence was answered at the read, never repaired into the record)').toBe('mcp-enabled')
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
    expect(batch.map((pair) => [pair['address'], pair['id']]), 'the second construction hands the package the same one pair').toEqual([[EXCLUSION, EXCLUSION_ID]])
    expect(armed(userDataDir, batch).read(EXCLUSION, 'mem'), 'so at the second instance’s creation instant the address stands at the safe pair again — the whole of V5’s closing, measured over two boots rather than asserted').toEqual({ exclusion: 'mcp-enabled' })
    expect({ exclusion: second.read().exclusion, tier4: second.read().tier4 }, 'and the second boot’s read serves it, which is the value clause 3 now gets from a constraint repair and from no file (D-84)').toEqual({ exclusion: 'mcp-enabled', tier4: false })

    // THE RECORD'S FILE IS UNMOVED BY THE RE-MINT: the pair is `mem`, so neither the transition nor the second boot's
    // repair writes a byte, and the file the first construction created is still zero-length.
    expect(statSync(join(userDataDir, FILE)).size, 'a transition writes no byte, a repair at a `mem` address writes no byte, and no `file`-tier write has happened: the file stands where the construction left it').toBe(0)
  })

  it('CD-4 · the arm is EXISTENCE and every other shape keeps its existing authority: a pair that stands is passed through — the wrong member included — and the body refuses only where the address holds nothing (D-84; the split `tabs-must-stand` draws against the three field pairs)', () => {
    const batch = (() => { createOperatorSettings({ userDataDir }); return lastBatch() })()
    const store = armed(userDataDir, batch)
    const body = batch[0]?.['constraint'] as (context: unknown) => unknown

    // THE CREATION INSTANT'S OWN CONTEXT, in the shape the package builds it: five members, `value` the current value
    // read at the address, and `undefined` where the read refuses (`AttemptContext`; measured 2026-11-02).
    expect(body({ address: EXCLUSION, attempt: null, op: null, tier: null, value: undefined }), 'an address holding nothing is refused, with a sentence that names the pair and not the act').toMatchObject({ message: expect.stringContaining('operator exclusion') })

    expect(body({ address: EXCLUSION, attempt: null, op: null, tier: null, value: { exclusion: 'mcp-enabled' } }), 'a pair that stands passes').toBe(true)
    expect(body({ address: EXCLUSION, attempt: null, op: null, tier: null, value: { exclusion: 'mcp-disabled' } }), 'and so does the other word: existence is the arm, not the value').toBe(true)
    expect(body({ address: EXCLUSION, attempt: null, op: null, tier: null, value: { exclusion: 7 } }), 'AND A PRESENT PAIR WHOSE MEMBER IS NOT A TOKEN PASSES TOO — repairing the member here would be the second authority over one value the placeholder rule forbids, and the read’s own admission is the member’s (this file proves the SPLIT, not an omission)').toBe(true)

    // THE LANDING INSTANT IS WHERE THE PAIR STANDS, AND THE STORE IS WHERE THAT IS OBSERVED: a write of a wrong-typed
    // member lands and stands, and the module's read would answer the safe pair over it — `SAFE_PAIR` is therefore still
    // LOAD-BEARING for that arm and is not deleted by this pass (D-84's §3 answer).
    store.write(EXCLUSION, 'mem', { exclusion: 7 })
    expect(store.read(EXCLUSION, 'mem'), 'the wrong-typed member stands: this declaration did not rewrite it').toEqual({ exclusion: 7 })
    expect(createOperatorSettings({ userDataDir }).read().exclusion, 'while the module’s read answers the safe pair over it — the read-side default is the member authority, and it is reachable: measured here').toBe('mcp-enabled')
  })

  it('CD-5 · the creation instant LANDS AN OP: the construction’s one repair is the journal’s first, so the first caller-visible receipt is the second op — the declared surface’s own witness that a repair ran (interface.md §2 ASM-L2-7; D-84)', () => {
    const settings = createOperatorSettings({ userDataDir })
    const receipt = settings.write({ token: 't' })
    expect(receipt.status, 'the first caller act commits').toBe('committed')
    if (receipt.status !== 'committed') return
    // THE STORE'S OWN ORDINAL, VERBATIM: one op was minted before this write, and it was the creation repair's. Absent
    // the declaration the same act reads `cursor: 1` — the row is the surface-side half of CD-1's address-side one.
    expect({ cursor: receipt.cursor, opId: typeof receipt.opId === 'string' && receipt.opId.length > 0 }, 'exactly one op stands behind the first caller write, and it is the creation repair’s').toEqual({ cursor: 2, opId: true })
  })

  it('CD-6 · the batch’s membership is a census and not an accident: the two `file` addresses carry NO declaration, and that is the stopped half this pass reports rather than builds (D-84; D-82’s V1)', () => {
    createOperatorSettings({ userDataDir })
    const addresses = lastBatch().map((pair) => (pair['address'] as readonly string[])[0])
    // READ OFF THE CONFIGURATION THE MODULE HANDS THE PACKAGE, never off `src/**`: a comment naming an address cannot
    // satisfy this row, which is the hollow-green class D-84's row is written against.
    expect(addresses, 'one pair, and it is the `mem` one: a declaration at either `file` address retires an import-once arm whose marker is that address’s ABSENCE, measured over a retired `provident-security.json` (the record) and over `legacy`’s four words (the app-state rows)').toEqual([EXCLUSION[0]])
    expect(addresses.includes(APP_STATE[0]), 'the app-state address is the second stopped one').toBe(false)
    expect(addresses.includes(RECORD[0]), 'and the durable record is the first').toBe(false)
    // AND THE STOP IS NOT A SILENCE: the instance still answers the read-side defaults those two addresses used to give
    // it, which is the state D-84 records and does not delete.
    const settings = createOperatorSettings({ userDataDir })
    expect({ token: settings.read().token, enabled: settings.read().enabled }, 'the record address’s absent arm is still answered by `FIRST_RUN` at the read').toEqual({ token: null, enabled: ['read', 'dispatch'] })
    expect(settings.readAppState().legacy, 'and the app-state address’s absent arm still runs the import decision, which is what a declaration there would have made unreachable').toBe('absent')
  })
})
