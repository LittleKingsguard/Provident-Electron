// tests/integration/secure-panels/persistence.test.ts — THE L2 BATTERY for `secure-panels`, part 2:
// WHERE THE GRANT THE SIXTH TOGGLE WRITES ACTUALLY LIVES, read as BYTES.
//
// THE CONTRACT: docs/L2/secure-panels/persistence.md §1-§7, and behaviour.md §1/§4/§6 as far as a
// record can answer them. The subject is the module the click's channel calls:
// `createSettingsSurface` (`src/main/settings-surface/index.ts`), i.e. exactly the object
// `ipcMain.handle(IPC_SECURITY_SET)` hands the pane's patch to (`src/main/main.ts:338`;
// `interface.md` §4's route). Nothing here invents a path: the grant the pane asks for is ONE grant
// among the instance's own list, at the instance's one address, in the instance's one file
// (`persistence.md` §1, §5; D-17, D-22).
//
// EVERY READING IS A BYTE READING, NEVER AN EXISTENCE READING (`persistence.md` §3, `ASM-L2-10`).
// The store's own CONSTRUCTION creates the file exclusively, zero-length and empty, where it is
// absent — so "the file exists" is evidence of nothing: a first boot on a clean profile has a file
// and NO RECORD AT ALL (`B-1`, `B-5`). Every row below therefore asserts what the bytes SAY: a
// length of zero, or the record's own image (the store's spelling, never a projection this battery
// composes — `D-13`). That is what makes the pair "no record yet" / "a record whose list is empty"
// two states rather than a slogan (`B-4`, §3).
//
// THE ROWS ARE THE DESIGN'S OWN MEASUREMENTS, RE-TAKEN AT THIS LEVEL: `persistence.md` §2 `B-1`…`B-4`
// are the design seat's dated readings of the same drives; these rows take them again through the
// module's declared surface and assert the bytes rather than a probe's console line. Nothing here is
// copied from a transcript — each row drives the artifact.
//
// THIS FILE'S RED-FIRST STATE, STATED SO A GREEN IS NOT MISREAD. These rows do NOT depend on the
// pane carrying a sixth row, and at the head this battery was authored they pass: the instance's
// group copy already admits `data` (`src/main/operator-settings/index.ts:112`; `interface.md` §5).
// A green here therefore says "the store half of the route is ready for the sixth group" — never
// "the sixth toggle exists"; the roster rows in `roster.test.ts` beside this file are that claim,
// and they are the ones that cannot pass until the arrangement lands.
//
// WHAT THIS BATTERY IS NOT. It does not re-test `P-1`…`P-7`: the restart's PAINT, the status line
// and the rendered row are the live leg's (`tests/e2e/secure-panels/panes-live.mjs`; D-37). Row 6
// stops at the record the second boot would read and says so in its own message — `P-5` reads the
// paint, and no row here claims one. It is also not a rendered-surface battery: no shim, no
// renderer, no geometry appears in this file at all.
//
// NO MARKER: authored for this unit AFTER D-30's sweep, so it is new evidence and it gates (D-40).
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createSettingsSurface } from '../../../src/main/settings-surface/index.js'

/** `persistence.md` §1: the instance's one file, the address the record stands at, and the retired
 *  carrier the seed arrives through (`§4`, `ASM-L2-12` — the seed is a PRODUCT path, never a
 *  hand-written instance file, whose bytes are the store's own image). Literals here ON PURPOSE: a
 *  row that imported the name from the module could not assert what stands beside it. */
const OPERATOR_FILE = 'provident-operator-settings.json'
const SEED_FILE = 'provident-security.json'

/** `B-1`'s seed: four groups, no token, no cap, no entries — so every byte below is the record's own. */
const SEED = { enabled: ['read', 'dispatch', 'graph', 'code'] }

/** THE THREE IMAGES `persistence.md` §2 measured, as bytes: a grant (`B-2`), a revoke (`B-3`) and a
 *  record whose list is EMPTY (`B-4`). Asserted as text, so a header, a version member, a newline or
 *  a re-ordered array is a red row rather than a comment.
 *
 *  **RE-DERIVED 2026-11-03 (`D-85`), AND THE CLAIM IS STRONGER, NOT WEAKER.** Each image is now the
 *  WHOLE FILE, because the file carries TWO records: `['operator-settings']` — the image these rows
 *  have always asserted, byte for byte, unmoved — and beside it `['operator-app-state']`, which until
 *  `D-85` stood only in the instance's memory until an ordinary write superseded it, and which now
 *  STANDS AT THE CREATION INSTANT, written by the declaration that repairs that address's absence.
 *  The second record's own image is the arm the boot ran: this battery seeds `provident-security.json`
 *  (the sibling's retired seed) and no `provident-settings.json`, so the arm is `absent`, the rows are
 *  empty and nothing was named uncarryable. Measured 2026-11-03 on this head over the same drives.
 *  **So the old "the register at the address and nothing else" clause is asserted over a file that
 *  now has a second record, and it says what that record is** — no `version`, no `schemaVersion`, no
 *  envelope, no third name, and the app-state record's own three members and no more. */
const APP_STATE_ABSENT_IMAGE = '"operator-app-state":{"legacy":"absent","rows":[],"unrepresentable":[]}'
const GRANTED_IMAGE = `{${APP_STATE_ABSENT_IMAGE},"operator-settings":{"enabled":["read","dispatch","graph","code","data"]}}`
const REVOKED_IMAGE = `{${APP_STATE_ABSENT_IMAGE},"operator-settings":{"enabled":["read","dispatch","graph","code"]}}`
const EMPTY_LIST_IMAGE = `{${APP_STATE_ABSENT_IMAGE},"operator-settings":{"enabled":[]}}`

let userDataDir: string
let secondDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'secure-panels-persist-'))
  secondDir = mkdtempSync(join(tmpdir(), 'secure-panels-persist-second-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
  rmSync(secondDir, { recursive: true, force: true })
})

const at = (dir: string, name: string): string => join(dir, name)
const bytesOf = (dir: string): Buffer => readFileSync(at(dir, OPERATOR_FILE))
const writeSeed = (dir: string, seed: unknown = SEED): void => { writeFileSync(at(dir, SEED_FILE), JSON.stringify(seed)) }

describe('secure-panels · the grant, as bytes', () => {
  it('a boot on a seed-only profile serves the seed from memory and leaves the instance file at ZERO bytes (persistence.md §2 B-1, §3-§4)', () => {
    writeSeed(userDataDir)
    const seedBytes = readFileSync(at(userDataDir, SEED_FILE))
    const surface = createSettingsSurface({ userDataDir })

    expect(bytesOf(userDataDir).length, 'construction creates the store file exclusively and empty; the import writes NO byte, because what it carries is HELD until an ordinary write supersedes it (§4)').toBe(0)
    const answer = surface.read()
    expect(answer.enabled, 'and the read serves the SEED, not a first-run default: the grant the sixth row gains beside is the operator’s own').toEqual(SEED.enabled)
    expect({ token: answer.token, read: answer.read, exclusion: answer.exclusion }, 'with the seed’s token absence and the boot’s safe pair riding the same answer').toEqual({ token: null, read: null, exclusion: 'mcp-enabled' })
    expect(readFileSync(at(userDataDir, SEED_FILE)).equals(seedBytes), 'the retired carrier is read at most once and written by nothing (D-19, D-22)').toBe(true)
    expect(readdirSync(userDataDir).sort(), 'and no second name, `.tmp`, lock or sidecar appears beside the two (§6)').toEqual([OPERATOR_FILE, SEED_FILE])
  })

  it('one `set` shaped as the sixth row’s click composes produces the record — the exact image, no token member, no header (persistence.md §2 B-2, §5-§6)', () => {
    writeSeed(userDataDir)
    const surface = createSettingsSurface({ userDataDir })
    const granted = surface.set({ groups: ['data'] })

    expect(granted.write.status, 'the store commits the one write the gesture makes').toBe('committed')
    expect(granted.enabled, 'and the answer read back from the record names the gain').toEqual([...SEED.enabled, 'data'])
    const bytes = bytesOf(userDataDir)
    expect(bytes.toString('utf8'), 'the file now carries the record, in the store’s OWN image, with the app-state record the creation repair wrote beside it (§2: no `version`, no `schemaVersion`, no envelope, and no third name — `D-85`)').toBe(GRANTED_IMAGE)
    expect(bytes.length, 'and it is bytes, not the zero-length file that says "no record yet"').toBeGreaterThan(0)
    expect(bytes.toString('utf8').includes('"token"'), 'a cleared member crosses as its ABSENCE, never as `null` — which is why `B-2`’s bytes carry no `token` member at all (§5)').toBe(false)
    expect(readdirSync(userDataDir).sort(), 'one gesture, one name: the write creates no `.tmp`, no lock and no second file (§6)').toEqual([OPERATOR_FILE, SEED_FILE])
  })

  it('a click writes the WHOLE record: the token, the cap and a foreign entry survive the grant (persistence.md §5)', () => {
    writeSeed(userDataDir, { token: 'tok', enabled: [...SEED.enabled], maxJournalLength: 12, 'x-mine': { a: 1 } })
    const surface = createSettingsSurface({ userDataDir })
    surface.set({ groups: ['data'] })

    // A GRANT IS A REPLACE OF THE BYTES, never an edit of the array inside them (§5): the surface
    // hands the instance the members the click named, and the instance composes the whole record
    // from `read()`'s durable row over it — so every member the click did not name is still there.
    // The app-state record stands beside it with the boot's own arm in it (`D-85`), and is asserted
    // whole rather than skipped: the claim is the FILE's, not one address's.
    expect(JSON.parse(bytesOf(userDataDir).toString('utf8')), 'the record the gesture left is the record it found, with one member moved — beside the app-state record the creation repair wrote, unmoved by the gesture').toEqual({
      'operator-app-state': { legacy: 'absent', rows: [], unrepresentable: [] },
      'operator-settings': {
        enabled: [...SEED.enabled, 'data'],
        token: 'tok',
        maxJournalLength: 12,
        entries: { 'x-mine': { a: 1 } },
      },
    })
  })

  it('the second click — the same row, now ON — revokes the member and leaves the pre-grant image (persistence.md §2 B-3, behaviour.md §1)', () => {
    writeSeed(userDataDir)
    const surface = createSettingsSurface({ userDataDir })
    surface.set({ groups: ['data'] })
    expect(bytesOf(userDataDir).toString('utf8'), 'the control: the grant landed first, so the revoke below has a member to remove').toBe(GRANTED_IMAGE)

    const revoked = surface.set({ disable: ['data'] })
    expect(revoked.write.status).toBe('committed')
    expect(revoked.enabled, 'the answer no longer names the group').toEqual(SEED.enabled)
    expect(bytesOf(userDataDir).toString('utf8'), 'and the bytes no longer name it either — a byte claim, not a count of anything (`behaviour.md` §1: the set difference is the claim)').toBe(REVOKED_IMAGE)
  })

  it('every group revoked is a RECORD WITH AN EMPTY LIST, which is not the same state as NO RECORD (persistence.md §2 B-4, §3, ASM-L2-11)', () => {
    // STATE ONE — NO RECORD. A profile nobody has written to: the file exists (construction made it)
    // and is ZERO-LENGTH, and a read at the address is absent, so the instance answers its first-run
    // default. This is the state `P-6` must not be readable as (`B-5`, §3).
    const cold = createSettingsSurface({ userDataDir })
    expect(bytesOf(userDataDir).length, 'no record yet is a ZERO-LENGTH file — the mark of an unread record, not of a grant').toBe(0)
    expect(cold.read().enabled, 'and the read over it is the first-run default, never a refusal').toEqual(['read', 'dispatch'])

    // STATE TWO — A RECORD WHOSE LIST IS EMPTY. The same gesture, one member further: every group off.
    writeSeed(secondDir)
    const warm = createSettingsSurface({ userDataDir: secondDir })
    warm.set({ disable: [...SEED.enabled] })
    const empty = bytesOf(secondDir)
    expect(empty.toString('utf8'), 'the bytes ARE the record, carrying an empty list — bytes that cannot be confused with none').toBe(EMPTY_LIST_IMAGE)
    expect(empty.length, 'so "a record with an empty list" is a byte reading of its own, beside the zero-length one above').toBeGreaterThan(0)

    // THE ROSTER IS NEVER A STORED VALUE (§6): the record is a GRANT LIST, and at this state it names
    // no group at all — so nothing in the file could answer the pane's roster (interface.md §3 `S-5`).
    // **RE-DERIVED 2026-11-03 (`D-85`): the reading is the whole FILE, and it names BOTH addresses and
    // the app-state record's three members — and still no group** — which is the same claim taken over
    // the file the product now writes rather than over half of it (`legacy` carries the arm the
    // creation repair ran, `absent`, and `rows`/`unrepresentable` are the empty list and the empty
    // name list; none of the three can spell a group name).
    expect([...empty.toString('utf8').matchAll(/"([^"]*)"/g)].map((match) => match[1]), 'the file names both addresses, the record’s one member and the app-state record’s three — and NO group: a roster cannot be read out of the store because none is in it (§6, S-5)').toEqual(['operator-app-state', 'legacy', 'absent', 'rows', 'unrepresentable', 'operator-settings', 'enabled'])
    // …and the CARRIER never carries one either: the read answer is the grant and the two additive
    // members, so a roster cannot be reconstructed from what the pane is served (`S-5`, §6).
    const answer = warm.read()
    expect(Object.keys(answer).sort(), 'the read answer’s declared members are the token, the grant, the refusal reading and the pair — and no roster member').toEqual(['enabled', 'exclusion', 'read', 'token'])
    expect(answer.enabled, 'an empty grant list is a LEGAL answer').toEqual([])
  })

  it('a second construction on the SAME profile serves the grant out of the record and writes no byte (persistence.md §3, behaviour.md §6; D-17, D-19)', () => {
    writeSeed(userDataDir)
    const first = createSettingsSurface({ userDataDir })
    first.set({ groups: ['data'] })
    const before = bytesOf(userDataDir)
    expect(before.toString('utf8'), 'the control: the record stands before the second boot').toBe(GRANTED_IMAGE)

    const second = createSettingsSurface({ userDataDir })
    expect(second.read().enabled, 'the instance owns the grant and the pane is its view: the record — not a warm renderer — is what a second boot is served (D-17)').toEqual([...SEED.enabled, 'data'])
    expect(bytesOf(userDataDir).equals(before), 'and the second boot wrote nothing: a read is never a write, and the import-once arm does not run over a standing record (§4)').toBe(true)
    expect(readdirSync(userDataDir).sort(), 'no name is added by the reboot either (§6)').toEqual([OPERATOR_FILE, SEED_FILE])
    // THE PAINT IS `P-5`'s ROW, NOT THIS ONE. This row stops at the record the second boot reads; the
    // first painted carrier state, the status line and the rendered `data` row are the live leg's
    // (`tests/e2e/secure-panels/panes-live.mjs`; D-37), and no assertion above states one.
  })
})
