// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/integration/central-data/profile-file.test.ts — THE L2 BATTERY for `central-data`, part 3:
// persistence and the profile's bytes.
//
// THE CONTRACT: row 11 of the interface's battery table plus the written-name and restart clauses
// of docs/L2/central-data/persistence.md §1/§5/§6 and behaviour.md §3/§9 — including §9's TWO
// unreachability arms, which this file drives as two separate rows: a name that CANNOT be
// occupied refuses on all five tools, and a name that is ABSENT stays the cold tier.
//
// BOTH ARMS WERE RE-DERIVED BY D-80, AND NEITHER CLAIM WAS DROPPED. `DataSurfaceOptions.store` is
// REQUIRED and the surface's fallback construction is deleted, so a surface cannot be stood without an
// instance and the "where the construction refuses" half of arm two is gone with the construction: a
// `createProfileStore` over an absent parent or over a directory standing at its `filePath` THROWS
// (measured 2026-11-02), which is the boot's refusal and not a surface answer. Arm two therefore
// measures the state the product has — the profile's name REMOVED under the live store, which the
// reading answers `absent` and which the supplied instance re-creates on its next save — and arm one
// measures the reading on a name that cannot be occupied, with the store supplied from the boot so that
// the refusal is provably the READING's and not a store's.
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createDataSurface, type DataSurface } from '../../../src/main/data'
import { createProfileStore } from '../../../src/main/storeroom.js'
import { tabsConstraintDeclarations } from '../../../src/main/tabs-record/index'
import { viewConstraintDeclarations } from '../../../src/main/view-record/index'

const PROFILE_FILE = 'provident-profile.json'

let profileDir: string
let profilePath: string

beforeEach(() => {
  profileDir = mkdtempSync(join(tmpdir(), 'central-data-profile-'))
  profilePath = join(profileDir, PROFILE_FILE)
})

afterEach(() => {
  rmSync(profileDir, { recursive: true, force: true })
})

const widened = (answer: unknown): Record<string, unknown> => answer as Record<string, unknown>
const coldList = { status: 'read', prefix: null, paths: [], count: 0 }

/** THE SURFACE'S OWN INSTANCE: one store at the profile's one name, handed to the surface the way `:302` hands it
 *  (D-80). `dir` names the store's file; `reading` is the directory the READING is pointed at, which is the same one
 *  except in the row that measures the two apart.
 *
 *  **AND IT IS A BARE STORE, WHICH THE APP'S BOOT IS NOT — SAID HERE BECAUSE `1.9.1` MADE THE DIFFERENCE VISIBLE.**
 *  `src/main/main.ts`'s construction batches the tab record's six declarations and (since `D-87`) the view record's two
 *  as its `constraints`, and **`tabs-must-stand` ACTS AT THE REGISTRATION INSTANT** — it judges `context.value`, not a
 *  handle — so over a fresh profile its repair writes the landing-seated record, and from `1.9.1` that write IS SAVED:
 *  the app's own boot leaves `160` bytes before any commit (measured 2026-11-03, driven below by `the app's own boot`),
 *  and **`panes-must-stand` IS THE SAME KIND OF PAIR ONE ROOT OVER**, so the boot's image carries both families since
 *  `D-87` — `221` bytes over a fresh profile, measured the same way.
 *  Every other row in this file measures the SURFACE over a bare store, which is the only instance this battery can
 *  stand without a boot's holder; the difference is the boot's, and it is the row below's subject rather than a
 *  premise these rows quietly assume. */
function surfaceAt(dir: string = profileDir, reading: string = dir): DataSurface {
  return createDataSurface({ profileDir: reading, store: createProfileStore({ filePath: join(dir, PROFILE_FILE) }) })
}

describe('central-data · persistence and the profile\'s bytes', () => {
  it('the single written name → a BARE store’s construction creates provident-profile.json at zero length, a read-only session writes no byte, and no .tmp, lock or sidecar ever stands beside it', () => {
    const s = surfaceAt()
    expect(readdirSync(profileDir), 'the one name, and nothing beside it (persistence §1, §5)').toEqual([PROFILE_FILE])
    // A BARE STORE: no constraint list, so no repair can land and nothing writes. The app's boot is NOT this
    // construction — it batches six declarations whose `tabs-must-stand` repair writes the landing record — and the row
    // below drives that one to its own reading (measured 2026-11-03).
    expect(statSync(profilePath).size, 'the construction’s empty image: the register is OPEN and holds nothing (D-80)').toBe(0)
    s.list({})
    s.read({ path: ['alpha'] })
    s.journal({})
    expect(readFileSync(profilePath, 'utf8'), 'a session that only reads lands no byte').toBe('')
    s.write({ path: ['alpha'], value: 'x' })
    expect(readdirSync(profileDir), 'persistence §1 — exactly one written name, before and after the commit').toEqual([PROFILE_FILE])
  })

  it('THE APP’S OWN BOOT: the two modules’ EIGHT declarations batched as `src/main/main.ts` batches them put both the landing record and the measured pane family on the disk before any commit, and the boot is the only writer until a caller acts (D-86; `1.9.1` item 1’s mechanism; D-87)', () => {
    // **THIS ROW EXISTS BECAUSE EVERY OTHER ROW IN THIS FILE STANDS A BARE STORE** (`surfaceAt`), and the app's boot is
    // a different construction: `tabsConstraintDeclarations(() => holder.current)` rides `cfg.constraints`, and
    // `tabs-must-stand` judges `context.value` rather than reaching for a handle, so over a fresh profile its repair
    // runs at the registration instant — while the holder is still null, which is exactly why that pair does not use
    // the `body` wrapper. From `1.9.1` the repair's `file`-tier write is settled into the file at the member that lands
    // it, so the profile carries `{tabs: {landing…, order:['landing']}}` when the constructor returns. Measured
    // 2026-11-03 on the installed tree; the holder is bound after the construction, exactly as `main.ts` binds it.
    const holder: { current: ReturnType<typeof createProfileStore> | null } = { current: null }
    // **THE BATCH IS THE ENTRY'S OWN, AND IT MOVED FROM SIX TO EIGHT UNDER `D-87`**: the tab record's six and the view
    // record's two, spread into ONE `createProfileStore` call exactly as `src/main/main.ts` spreads them. The panes
    // pair's repair is a `file`-tier write too, so it is settled into the same file by the same landing arm — which is
    // why this row's image carries TWO roots where it carried one.
    const store = createProfileStore({
      filePath: profilePath,
      constraints: [...tabsConstraintDeclarations(() => holder.current as never), ...viewConstraintDeclarations(() => holder.current as never)] as never,
    })
    holder.current = store
    expect(readdirSync(profileDir), 'the one written name, as in every row here').toEqual([PROFILE_FILE])
    const image = JSON.parse(readFileSync(profilePath, 'utf8')) as Record<string, unknown>
    expect(Object.keys(image), 'the boot wrote the pane family and the tab record, and nothing else at the root (the store’s image is key-ordered, so the reading is stable)').toEqual(['panes', 'tabs'])
    const tabs = image['tabs'] as { landing?: { id?: unknown; active?: unknown }; order?: unknown }
    expect({ landing: tabs.landing?.id, active: tabs.landing?.active, order: tabs.order }, 'the landing entry seated and active, and the order naming exactly it — the repair’s own value, whole').toEqual({ landing: 'landing', active: true, order: ['landing'] })
    expect(image['panes'], 'and the measured default family, whole: the one pane id the app addresses at the size and bounds the tree states (D-87)').toEqual({ 'pane-a': { size: 100, bounds: { min: 0, max: 200 } } })
    expect(statSync(profilePath).size, 'and the file stands at the byte length that value serialises to, before any caller act (the length is derived, not pinned: the stamp is a clock reading)').toBe(readFileSync(profilePath, 'utf8').length)
    expect(statSync(profilePath).size, 'which is not zero: the boot’s own save is the difference this row exists to state').toBeGreaterThan(0)
    // A READ ONLY SESSION MOVES NOTHING AFTER IT: the surface over the same instance answers and lands no byte.
    const stood = readFileSync(profilePath)
    const surface = createDataSurface({ profileDir, store })
    surface.list({})
    surface.read({ path: ['alpha'] })
    surface.journal({})
    expect(readFileSync(profilePath).equals(stood), 'a session that only reads writes no byte after the boot').toBe(true)
  })

  it('a profile seeded with the store\'s own empty image ({}) → list count 0, read absent, and the next write commits with the bytes then carrying that row', () => {
    writeFileSync(profilePath, '{}')
    const s = surfaceAt()
    expect(s.list({})).toEqual(coldList)
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(s.write({ path: ['alpha'], value: 'x' })).toMatchObject({ status: 'committed', path: ['alpha'] })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
    expect(readFileSync(profilePath, 'utf8').includes('alpha'), 'the bytes now describe the state the act left').toBe(true)
  })

  it('a foreign, unparsable profile image is seeded → the boot answers an empty register and the next write replaces the bytes', () => {
    const foreign = 'this is not the store\'s image\n'
    writeFileSync(profilePath, foreign)
    // THE BOOT MEETS THE FOREIGN IMAGE and answers an empty register rather than throwing: this is `persistence.md`
    // §9 P-1's measured arm, and the boot is the row's act now that the surface constructs nothing (D-80).
    const s = surfaceAt()
    const listed = widened(s.list({}))
    expect({ status: listed.status, paths: listed.paths, count: listed.count }, 'the cold tier answers, and the answer is a value rather than a throw').toEqual({ status: 'read', paths: [], count: 0 })
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    const committed = widened(s.write({ path: ['alpha'], value: 'x' }))
    expect({ status: committed.status, path: committed.path }, 'the next committed write recovers by declaration, never by a repair of the bytes').toEqual({ status: 'committed', path: ['alpha'] })
    const text = readFileSync(profilePath, 'utf8')
    expect(text === foreign, 'the foreign image is replaced, not preserved').toBe(false)
    expect(text.includes('alpha')).toBe(true)
    expect(s.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
  })

  it('a profileDir whose name cannot be occupied → store-unreachable on every tool, the store never consulted, and nothing created', () => {
    // ARM ONE OF §9's TWO, RE-DERIVED BY D-80. The blocked name is a REGULAR FILE standing where the directory must
    // be, so `lstat('<blocked>/provident-profile.json')` fails `ENOTDIR` and the reading answers `unreachable`. The
    // instance is the boot's and lives at the healthy directory: the two are deliberately APART here, which is the
    // one thing this row can show that no store can — **the reading is taken at a NAME and ahead of the instance**
    // (`design.md` §2), so its answer does not depend on which instance was handed in. A reading that consulted the
    // store would answer `occupied` and serve the row below instead of refusing.
    const blocked = join(profileDir, 'blocked')
    writeFileSync(blocked, 'not a directory')
    const s = surfaceAt(profileDir, blocked)
    for (const answer of [
      widened(s.read({ path: ['alpha'] })),
      widened(s.write({ path: ['alpha'], value: 'x' })),
      widened(s.delete({ path: ['alpha'] })),
      widened(s.list({})),
      widened(s.journal({})),
    ]) {
      expect({ status: answer.status, reason: answer.reason }, 'behaviour §5 — a storeCreate that refuses answers store-unreachable and creates nothing').toEqual({ status: 'refused', reason: 'store-unreachable' })
      expect(typeof answer.message, 'message is always present').toBe('string')
    }
    expect(statSync(blocked).isFile(), 'the blocked path is untouched').toBe(true)
    expect(existsSync(join(blocked, PROFILE_FILE)), 'no instance, no file, no byte').toBe(false)
  })

  it('an ABSENT name under the live store → the cold tier on read/list/delete, the window unmoved on journal, and the next write re-creates the name', () => {
    // `behaviour.md` §9 / ASM-L2-7 — THE OTHER ARM, and it is NOT the arm above: the profile's name does not stand and
    // nothing forbids it, so the reading answers the cold tier rather than a refusal. THE STATE THIS ROW USED TO MEASURE
    // IS GONE (D-80) and the row is re-derived onto the one the product has: a name REMOVED under a live store. Its old
    // second half — "the first write is where the construction refuses, creating nothing" — belonged to a construction
    // this module no longer performs; a supplied instance does not refuse there at all, it recreates its own file and
    // saves the register it holds, which is the arm `behaviour.md` §9 already declared in its last row.
    const s = surfaceAt()
    s.write({ path: ['alpha'], value: 'x' })
    rmSync(profilePath)
    expect(s.list({}), 'list answers the cold tier, not a refusal').toEqual(coldList)
    expect(s.read({ path: ['alpha'] }), 'and NOT the row the instance still holds: the reading is taken first').toEqual({ status: 'absent', path: ['alpha'] })
    expect(s.read({ path: [] })).toEqual({ status: 'read', kind: 'branch', path: [], value: {} })
    expect(s.delete({ path: ['alpha'] }), 'the empty receipt §6 declares, reached with no store refusal leaving this module').toEqual({ status: 'committed', path: ['alpha'], removed: false, tiers: [], cursor: null })
    expect(s.journal({}), 'journal is not refused and not emptied: the name is merely absent, so the window answers as it stood').toEqual({
      status: 'read',
      from: 0,
      through: 1,
      floor: 0,
      entries: [{ cursor: 1, kind: 'write', path: ['alpha'], changedTo: 'present' }],
      count: 1,
    })
    expect(s.write({ path: ['beta'], value: 2 }), 'the first write after the name went commits through the supplied instance').toMatchObject({ status: 'committed', path: ['beta'] })
    expect(readdirSync(profileDir), 'which re-creates its own one name and no second one').toEqual([PROFILE_FILE])
    expect(readFileSync(profilePath, 'utf8'), 'the saved image is the register the instance held: the row written before the name went comes back with it').toContain('alpha')
  })

  it('a file-tier delete stays deleted across a fresh surface → read {absent} and list count 0 after re-entry', () => {
    const first = surfaceAt()
    first.write({ path: ['alpha'], value: 'x' })
    expect(first.delete({ path: ['alpha'] })).toMatchObject({ status: 'committed', removed: true })
    const second = surfaceAt()
    expect(second.read({ path: ['alpha'] })).toEqual({ status: 'absent', path: ['alpha'] })
    expect(second.list({})).toEqual(coldList)
  })
})
