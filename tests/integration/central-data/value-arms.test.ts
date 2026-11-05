// tests/integration/central-data/value-arms.test.ts — **`data.*` IS A PACKAGE-SURFACE TOOL, THE PACKAGE EXECUTES THE
// CONSTRAINTS ON WRITE, AND A SUBVERTIBLE FAMILY IS THEREFORE A FAILURE OF ITS DECLARATION** (`D-105`).
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
//
// WHAT THIS BATTERY IS FOR, IN ONE SENTENCE: the user's ruling — *"`Data.*` should be package-surface tools. Package
// surface tools execute constraints on write. If a family invariant can be subverted then this is a failure to enforce
// invariants with constraints"* — read as three claims, each measured here rather than argued:
//
//   CLAIM 1 · `data.*` IS the package surface: `src/main/data/` calls the store's own `write`, `delete`, `read` and
//             `readLiteral` and composes nothing of its own over them (`VA-1`).
//   CLAIM 2 · The pass runs on every write, whatever the caller: a `provident.data.write` at a declared root answers the
//             COMMIT'S LOG, and that log names the family's own constraint pair on the write path (`VA-2`).
//   CLAIM 3 · So a family a legal-tier write can break is a family whose DECLARATION is too weak — and the fix is a value
//             arm in the body, not a guard on the surface. `VA-3`…`VA-10` measure every one of the app's EIGHT families
//             at its own store, `VA-11`/`VA-12` re-prove the existence arms and the restarts, and `VA-13` states the one
//             arm the value arms deliberately do not take.
//
// **THE EIGHT, ENUMERATED RATHER THAN ASSUMED**: the five roots of the NORMAL crossing (`['tabs']`'s six declarations,
// and `['panes']`, `['focus']`, `['zones']`, `['theme']` with one each — `D-87`, `D-91`, `D-97`, `D-98`) and the three
// addresses of the SECURE crossing (`['operator-settings']`, `['operator-exclusion']`, `['operator-app-state']` — `D-84`,
// `D-85`). **The three secure addresses are NOT reachable from `data.*`** (`D-80`: that surface acts on the central store
// and on nothing else, measured in `VA-1` below), so their arm is driven at the store the module itself constructs — the
// same package surface, a different instance, which is what "whatever the caller" means for a family `data.*` cannot
// address.
//
// **THE RESTART HERE IS A SECOND CONSTRUCTION, NOT A SECOND PROCESS** (`behaviour.md` §3; `D-98`'s own arm): a store is
// the file plus its register, so a fresh `createProfileStore` over the same `filePath`, with the same batch, is what a
// new process meets. The `mem` tier's real process boundary is the `crossings` leg's and no row here claims it.
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, describe, expect, it, vi } from 'vitest'

/** **THE CAPTURE IS HOISTED BECAUSE `vi.mock` IS** (`tests/unit/security-store-storeroom/creation-declarations.test.ts`'s
 *  own pattern): the secure instance constructs its own store, so the batch it hands the package is recorded here and
 *  then a REAL store is built over a scratch file with that exact array — never a declaration this file invents. */
const captured = vi.hoisted(() => [] as Array<Record<string, unknown>>)
vi.mock('provident-storeroom', async (importOriginal) => {
  const real = await importOriginal<typeof import('provident-storeroom')>()
  const realCreate = real.storeCreate as unknown as (config: Record<string, unknown>) => unknown
  return {
    ...real,
    storeCreate: (config: Record<string, unknown>) => {
      captured.push(config)
      return realCreate(config)
    },
  }
})

import { storeCreate } from 'provident-storeroom'

import { createDataSurface, type DataDeleteAnswer, type DataSurface, type DataWriteAnswer } from '../../../src/main/data'
import { createOperatorSettings } from '../../../src/main/operator-settings'
import { createProfileStore } from '../../../src/main/storeroom.js'
import { createTabsRecord, tabsConstraintDeclarations, tabsDeclaredRoots, type TabsRecord } from '../../../src/main/tabs-record'
import {
  createViewRecord,
  viewConstraintDeclarations,
  viewDeclaredRoots,
  type ViewRecord,
  type ViewRecordStore,
} from '../../../src/main/view-record'

const REPO = fileURLToPath(new URL('../../../', import.meta.url))
const PROFILE = 'provident-profile.json'
const OPERATOR_FILE = 'provident-operator-settings.json'
const RECORD: readonly string[] = ['operator-settings']
const EXCLUSION: readonly string[] = ['operator-exclusion']
const APP_STATE: readonly string[] = ['operator-app-state']

const sourceOf = (path: string): string => readFileSync(join(REPO, path), 'utf8')

/** A source read with comment lines and block comments ELIDED — the only form an absence may be asserted on, and the
 *  form a presence assertion uses where prose could carry the spelling (`D-81`'s hollow-green class). */
function commentElided(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n')
}

const scratch: string[] = []
afterEach(() => {
  captured.length = 0
  for (const dir of scratch.splice(0)) rmSync(dir, { recursive: true, force: true })
})
const dir = (): string => {
  const made = mkdtempSync(join(tmpdir(), 'value-arms-'))
  scratch.push(made)
  return made
}
const at = (where: string, name = PROFILE): string => join(where, name)

/** **THE CENTRAL CROSSING'S BATCH, MAPPED THE WAY `src/main/main.ts` MAPS IT** — both modules' declarations in ONE
 *  construction, because a surface stood over a store carrying half the batch would be measuring a store the app does not
 *  have (`D-65`, `D-87`, `D-91`, `D-97`). The holder is bound after the call answers, exactly as the boot binds it. */
function boot(where: string): ViewRecordStore {
  const holder: { current: ViewRecordStore | null } = { current: null }
  const store = createProfileStore({
    filePath: at(where),
    constraints: [
      ...tabsConstraintDeclarations(() => holder.current),
      ...viewConstraintDeclarations(() => holder.current),
    ].map((declaration) => ({ address: declaration.address, id: declaration.id, constraint: declaration.constraint })) as never,
  }) as unknown as ViewRecordStore
  holder.current = store
  return store
}

interface Standing {
  readonly dir: string
  readonly store: ViewRecordStore
  readonly surface: DataSurface
  readonly view: ViewRecord
  readonly tabs: TabsRecord
  bytes(): string
  restart(): Standing
}

function stand(where = dir()): Standing {
  const store = boot(where)
  return {
    dir: where,
    store,
    surface: createDataSurface({ profileDir: where, store: store as never, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] }),
    view: createViewRecord({ store }),
    tabs: createTabsRecord({ store }),
    bytes: () => readFileSync(at(where), 'utf8'),
    restart: () => stand(where),
  }
}

/** The write answer's refusal arm, asserted as a value and never as a throw (`interface.md` §6). */
function ledgerOf(answer: DataWriteAnswer | DataDeleteAnswer): { reason: string; message: string; storeStatus?: string } {
  if (answer.status !== 'refused') throw new Error('the row needs the refusal arm, and the call answered ' + JSON.stringify(answer))
  return { reason: answer.reason, message: answer.message, ...(answer.storeStatus === undefined ? {} : { storeStatus: answer.storeStatus }) }
}

describe('the value arms — a declaration that cannot be subverted by any caller (D-105)', () => {
  it('VA-1 · CLAIM ONE: `data.*` IS a package-surface tool — its whole store verb census is `write`, `delete`, `read` and `readLiteral`, and it constructs no instance, registers no pair and repairs nothing (D-105)', () => {
    const code = commentElided(sourceOf('src/main/data/surface.ts'))
    const store = commentElided(sourceOf('src/main/data/store.ts'))
    // THE VERBS, AS A CENSUS OVER COMMENT-ELIDED CODE: every one of the store's own, and not one member of the surface's
    // own composition over them.
    for (const verb of ['store.write(', 'store.delete(', 'store.read(', 'store.readLiteral(']) {
      expect(code.includes(verb), `the surface calls the store's own verb: ${verb}`).toBe(true)
    }
    for (const forbidden of ['addConstraint(', 'constraintOn(', 'constraintOff(', 'rollback(', 'storeCreate(']) {
      expect(code.includes(forbidden), `and never composes one of its own: ${forbidden}`).toBe(false)
      expect(store.includes(forbidden), `nor does the port it drives: ${forbidden}`).toBe(false)
    }
    // THE CONTROL THAT KEEPS THE ELISION HONEST: the raw bytes DO carry one of those names in prose — the comment that
    // says the store's own `rollback` has already run — so the absence above is the elision's work and not a silent file.
    const raw = sourceOf('src/main/data/surface.ts')
    expect(raw.includes('rollback'), 'the control: a name from the forbidden set stands in the surface\'s own prose').toBe(true)
    expect(code.includes('rollback'), 'and the elision is what removes it').toBe(false)
    // **AND IT CANNOT REACH THE SECURE CROSSING AT ALL** (`D-80`): a `data.write` at `['operator-settings']` lands a root
    // in the PROFILE and leaves the operator instance's own record file untouched, so the three secure families' arm is
    // driven at their own store below rather than pretended here.
    const one = stand()
    const secureDir = dir()
    const instance = createOperatorSettings({ userDataDir: secureDir })
    instance.write({ token: 'tok' })
    const before = readFileSync(at(secureDir, OPERATOR_FILE), 'utf8')
    expect(one.surface.write({ path: ['operator-settings'], tier: 'file', value: { token: 'x' } }).status, 'the write to the central store commits').toBe('committed')
    expect(Object.keys(JSON.parse(one.bytes()) as Record<string, unknown>), 'and it lands at the PROFILE\'s root of that name').toContain('operator-settings')
    expect(readFileSync(at(secureDir, OPERATOR_FILE), 'utf8'), 'while the operator instance\'s own file is untouched, byte for byte').toBe(before)
    expect(instance.read().token, 'and its record still serves the token it wrote').toBe('tok')
  })

  it('VA-2 · CLAIM TWO: the CONSTRAINT PASS runs on the `data.*` write path — the answer\'s own log names each family\'s pair, and a refused corrupt write names the pair that refused it (D-103, D-105)', () => {
    const one = stand()
    const pairs: ReadonlyArray<readonly [string, readonly string[], unknown]> = [
      ['tabs', ['tabs'], one.store.read(['tabs'], 'file')],
      ['panes', ['panes'], one.store.read(['panes'], 'file')],
      ['focus', ['focus'], one.store.read(['focus'], 'mem')],
      ['zones', ['zones'], one.store.read(['zones'], 'mem')],
      ['theme', ['theme'], one.store.read(['theme'], 'file')],
    ]
    const expected: Record<string, string> = {
      tabs: 'tabs-must-stand', panes: 'panes-must-stand', focus: 'focus-must-stand', zones: 'zones-must-stand', theme: 'theme-must-stand',
    }
    for (const [label, path, value] of pairs) {
      const tier = path[0] === 'focus' || path[0] === 'zones' ? 'mem' : 'file'
      const answer = one.surface.write({ path, tier, value })
      if (answer.status !== 'committed') throw new Error(`${label}: the legal write must commit, and answered ${JSON.stringify(answer)}`)
      const named = answer.log.filter((entry) => entry.kind === 'constraint-check').map((entry) => entry.id)
      expect(named, `${label}: the pass ran on the write path and named the family's own pair`).toContain(expected[label])
      expect(answer.repaired, `${label}: a legal value was not rewritten, and the verdict says so`).toBe(false)
    }
    // THE CONTROL: a path no crossing declares carries the COMMIT entry alone, so the entries above are the PAIR's.
    const plain = one.surface.write({ path: ['alpha'], tier: 'file', value: 1 })
    if (plain.status !== 'committed') throw new Error('an undeclared root commits')
    expect(plain.log.map((entry) => entry.kind), 'a store carrying no pair at this root ran no constraint check').toEqual(['commit'])
  })

  it('VA-3 · THE PANE GEOMETRY: every corrupt value a legal-tier write can carry is REFUSED by the pair with NO repair, the geometry survives on the bytes — and a legal write still lands through `data.*` and through `commitPane`', () => {
    const one = stand()
    const geometry = one.view.read().panes
    const stood = one.bytes()
    expect(geometry, 'the family stands with the measured default before any attempt').toEqual([{ id: 'pane-a', size: 100, bounds: { min: 0, max: 200 } }])
    // THE THREE ARMS THE AUDIT FOUND, AND ONE MORE: a plain record of junk (the read DROPS it and the geometry is gone
    // while `source` still says `record`); a member whose record carries an unusable `size` (the fault lands ONE LEVEL
    // IN); a member missing its `bounds`; and an empty member key, which the read skips without a word.
    for (const value of [{ junk: true }, { 'pane-a': { size: 'big' } }, { 'pane-a': { size: 5 } }, { '': { size: 1, bounds: { min: 0, max: 1 } } }]) {
      const refused = ledgerOf(one.surface.write({ path: ['panes'], tier: 'file', value }))
      expect(refused, `the corrupt value ${JSON.stringify(value)} is refused by the declaration, with the store's own status`).toEqual({
        reason: 'store-refused', storeStatus: 'ConstraintPassRefused', message: expect.stringContaining('the pane geometry carries a member that is no geometry'),
      })
    }
    expect(one.view.read().panes, 'and the PREVIOUS legal value survives every refusal, member for member').toEqual(geometry)
    expect(one.view.read().source.panes, 'and the family still reads as the record the app wrote').toBe('record')
    expect(one.bytes(), 'measured on the profile\'s own bytes: no refusal landed a byte').toBe(stood)
    // ONE LEVEL IN IS THE SAME FAULT ONE LEVEL DOWN, and it is judged at the node the pass is handed.
    expect(ledgerOf(one.surface.write({ path: ['panes', 'pane-a'], tier: 'file', value: {} })).storeStatus, 'a write AT the member is judged as that member').toBe('ConstraintPassRefused')
    expect(ledgerOf(one.surface.write({ path: ['panes', 'pane-a', 'size'], tier: 'file', value: -1 })).reason, 'and a write at one of its fields').toBe('store-refused')
    expect(one.view.read().panes, 'with the family still exactly as it stood').toEqual(geometry)
    // THE LEGAL ARMS: the surface's, and the module's own route.
    expect(one.surface.write({ path: ['panes'], tier: 'file', value: { 'pane-a': { size: 60, bounds: { min: 0, max: 120 } } } }).status, 'a legal family lands through `data.*`').toBe('committed')
    expect(one.view.read().panes).toEqual([{ id: 'pane-a', size: 60, bounds: { min: 0, max: 120 } }])
    expect(one.view.commitPane('pane-a', { size: 20 }), 'and the family\'s own route, which composes the family through the one composer').toEqual({ status: 'committed' })
    expect(one.view.read().panes, 'with the member it did not supply kept from what stood').toEqual([{ id: 'pane-a', size: 20, bounds: { min: 0, max: 120 } }])
  })

  it('VA-4 · THE FOCUS MIRROR: a DANGLING `activeId` is refused, junk is refused, a repeated id is refused — and the mirror that stood survives, because `commitFocus` already refused the same states at its own route', () => {
    const one = stand()
    expect(one.view.commitFocus({ entries: [{ id: 'a', target: 't' }], activeId: 'a' }), 'a legal mirror lands through the route').toEqual({ status: 'committed' })
    const mirror = one.view.read().focus
    expect(mirror).toEqual({ entries: [{ id: 'a', target: 't' }], activeId: 'a' })
    for (const value of [{ entries: [], activeId: 'ghost' }, { junk: true }, { entries: [{ id: 'a', target: 't' }, { id: 'a', target: 'u' }], activeId: 'a' }, { entries: 'x' }]) {
      const refused = ledgerOf(one.surface.write({ path: ['focus'], tier: 'mem', value }))
      expect(refused, `the corrupt mirror ${JSON.stringify(value)} is refused, and the sentence names the fault`).toEqual({
        reason: 'store-refused', storeStatus: 'ConstraintPassRefused', message: expect.stringContaining('the focus mirror carries an entry the read cannot state'),
      })
    }
    expect(one.view.read().focus, 'so the mirror that stood is the mirror that still stands').toEqual(mirror)
    expect(one.store.read(['focus'], 'mem'), 'and the store\'s own register carries no dangling id behind it').toEqual({ entries: [{ id: 'a', target: 't' }], activeId: 'a' })
    expect(one.surface.write({ path: ['focus'], tier: 'mem', value: { entries: [{ id: 'b', target: 't' }], activeId: 'b' } }).status, 'a legal mirror lands through `data.*`').toBe('committed')
    expect(one.view.read().focus).toEqual({ entries: [{ id: 'b', target: 't' }], activeId: 'b' })
    expect(one.view.commitFocus({ entries: [], activeId: null }), 'and the route still commits, at the absence of every entry').toEqual({ status: 'committed' })
    expect(one.view.read().focus).toEqual({ entries: [], activeId: null })
  })

  it('VA-5 · THE ZONE FAMILY: a member that is no record, and a zone carrying a `size` the read cannot state, are refused — while a zone that carries NOTHING stays legal, because that is a state the family holds (D-91, D-105)', () => {
    const one = stand()
    expect(one.view.commitZones('zone-1', { slot: { a: 1 }, distance: 3, size: 10, display: 'left' }), 'a legal zone lands through the route').toEqual({ status: 'committed' })
    const zones = one.view.read().zones
    expect(zones).toEqual([{ id: 'zone-1', slot: { a: 1 }, distance: 3, size: 10, display: 'left' }])
    for (const value of [{ junk: true }, { 'zone-1': { size: 'big' } }, { 'zone-1': { size: -1 } }, { 'zone-1': { display: 7 } }]) {
      const refused = ledgerOf(one.surface.write({ path: ['zones'], tier: 'mem', value }))
      expect(refused, `the corrupt family ${JSON.stringify(value)} is refused`).toEqual({
        reason: 'store-refused', storeStatus: 'ConstraintPassRefused', message: expect.stringContaining('the zone family holds a member that is no record'),
      })
    }
    expect(one.view.read().zones, 'and the family that stood is the family that still stands').toEqual(zones)
    // **THE LEGAL ARM A STRICT ARM COULD HAVE BROKEN**: a zone record carrying NO member is the state "the caller named a
    // zone and stored nothing about it yet", which `zoneOf` admits and `D-91` measured as the family\'s own shape.
    expect(one.surface.write({ path: ['zones', 'zone-2'], tier: 'mem', value: {} }).status, 'a zone carrying nothing still lands').toBe('committed')
    expect(one.view.read().zones, 'and it reads as the zone it names, with no member').toEqual([...zones, { id: 'zone-2' }])
    expect(one.view.commitZones('zone-3', { size: 5 }), 'and the family\'s own route still commits').toEqual({ status: 'committed' })
  })

  it('VA-6 · THE APPEARANCE FAMILY\'S SECOND ARM IS A DIFFERENT CLASS: it is a REPAIR, not a refusal — a corrupt appearance record is RE-DERIVED inside the caller\'s own commit and the answer says so, so `D-105` leaves its semantics alone', () => {
    const one = stand()
    const answer = one.surface.write({ path: ['theme'], tier: 'file', value: { junk: true } })
    if (answer.status !== 'committed') throw new Error('the appearance family repairs where the other three refuse: ' + JSON.stringify(answer))
    expect(answer.repaired, 'a repair FIRED and the answer names it — the member `D-103` gave the surface').toBe(true)
    expect(answer.log.some((entry) => entry.kind === 'repair-run' && entry.id === 'theme-must-stand'), 'and the log names the pair that fired it').toBe(true)
    const theme = one.view.read().theme
    expect(theme.declaration, 'the record that stands is the mechanism\'s own answer for the pair the value carried, which is the placeholder when it carries none').toEqual({ name: null, value: '', removal: true })
    expect(one.view.read().source.theme, 'and the family is a record, not a default').toBe('record')
    // **WHY IT IS A DIFFERENT CLASS AND NOT AN INCONSISTENCY**: this family's declaration is DERIVED from the value's own two
    // members, so its repair cannot destroy anything the caller had — a corrupt value carries no setting to preserve. The
    // other three carry values a repair would replace with a placeholder, which is the fault `D-105` refuses instead.
    const caller = one.surface.write({ path: ['theme'], tier: 'file', value: { token: 'dark', attribute: 'data-theme' } })
    if (caller.status !== 'committed') throw new Error('the caller\'s pair lands')
    expect(one.view.read().theme, 'a legal act\'s own pair is resolved by the repair, member for member').toEqual({
      token: 'dark', attribute: 'data-theme', declaration: { name: 'data-theme', value: 'dark', removal: false },
    })
  })

  it('VA-7 · THE TAB RECORD WAS NEVER SUBVERTIBLE, AND THAT IS THE AUDIT\'S OWN FINDING: `{junk:true}`, a leaf and a corrupt row are all REPAIRED by its six declarations, its answer says `repaired`, and the record that stands is always a legal one', () => {
    const one = stand()
    for (const value of [{ junk: true }, 42, { order: [], a: { id: 'a' } }, { order: ['landing'], landing: { target: 'tabs-landing-page', active: 'yes', label: 'L', lastActiveAt: 'x' } }]) {
      const answer = one.surface.write({ path: ['tabs'], tier: 'file', value })
      if (answer.status !== 'committed') throw new Error('the tab record repairs where it cannot accept: ' + JSON.stringify(answer))
      expect(answer.repaired, `the corrupt record ${JSON.stringify(value)} was REPLACED inside the caller's own commit, and the answer says so`).toBe(true)
      const standing = one.tabs.read()
      // THE READING AND THE REFUSAL SHARE ONE `status` DISCRIMINANT, so the membership is read off the MEMBER the reading
      // carries and not off the word (`TabsRecordReading` is the arm with `order`).
      if (!('order' in standing)) throw new Error('the record stands, and the reading is the arm that carries its rows')
      expect(standing.order.length, 'exactly one tab is seated after every one of them').toBe(1)
      expect(standing.rows.length, 'and the seat names a row the record holds — the invariant `order-names-its-tabs` and `exactly-one-active` exist for').toBe(1)
      expect(standing.rows[0]?.active, 'with the active tab being the one it seats').toBe(true)
      expect(Object.keys(standing.rows[0] ?? {}).sort(), 'and the row carries the four fields the field pairs demand').toEqual(['active', 'id', 'label', 'lastActiveAt', 'target'])
    }
  })

  it('VA-8 · THE OPERATOR RECORD: a junk record at the instance\'s OWN package surface is refused, the token and grants that stood survive on the file — and `{}` stays legal, which is the arm `D-84` measured', () => {
    const where = dir()
    const instance = createOperatorSettings({ userDataDir: where })
    expect(instance.write({ token: 'tok', enabled: ['read'] }), 'a legal record lands through the module\'s route').toMatchObject({ status: 'committed' })
    const store = storeCreate({ journalLength: 256, listeners: [], filePath: at(where, OPERATOR_FILE), constraints: (captured[captured.length - 1]?.['constraints'] ?? []) as never })
    const stood = readFileSync(at(where, OPERATOR_FILE), 'utf8')
    for (const value of [{ junk: true }, { token: 7 }, { enabled: ['read', 'nope'] }, { maxJournalLength: 2.5 }]) {
      let refused: unknown = null
      try {
        store.write(RECORD, 'file', value)
      } catch (caught) {
        refused = caught
      }
      expect((refused as { status?: string } | null)?.status, `the corrupt record ${JSON.stringify(value)} is refused by the declaration, not by the boundary`).toBe('ConstraintPassRefused')
      expect((refused as { message?: string } | null)?.message, 'in the module\'s own sentence').toContain('the operator record stands but carries a member')
    }
    expect(readFileSync(at(where, OPERATOR_FILE), 'utf8'), 'and the file is BYTE-IDENTICAL: the rollback ran and nothing replaced the record').toBe(stood)
    expect(createOperatorSettings({ userDataDir: where }).read(), 'a restart still reads the token and the grant that stood').toMatchObject({ token: 'tok', enabled: ['read'] })
    expect(instance.write({ token: 'later' }), 'the module\'s own route still lands').toMatchObject({ status: 'committed' })
    // `{}` IS ADMITTED, and it is the control that keeps this arm from being a blanket: `D-84` measured `{}` standing as
    // `{}` with every member falling to `fromStored`'s first-run value, and this arm judges the members a value NAMES.
    expect((() => { try { store.write(RECORD, 'file', { enabled: ['graph'] }); return 'landed' } catch { return 'refused' } })(), 'a record naming one legal member lands').toBe('landed')
  })

  it('VA-9 · THE OPERATOR PAIR: a non-token, and a pair naming NO member, are refused — the last because the read answers `SAFE_PAIR` over it, and the safe pair is what OPENS the gate', () => {
    const where = dir()
    const instance = createOperatorSettings({ userDataDir: where })
    expect(instance.write({ exclusion: 'mcp-disabled' }), 'the operator closes the gate').toMatchObject({ status: 'committed' })
    const store = storeCreate({ journalLength: 256, listeners: [], filePath: at(where, OPERATOR_FILE), constraints: (captured[captured.length - 1]?.['constraints'] ?? []) as never })
    const stood = store.read(EXCLUSION, 'mem')
    for (const value of [{ junk: true }, {}, { exclusion: 'bogus' }, { exclusion: 7 }]) {
      let refused: unknown = null
      try {
        store.write(EXCLUSION, 'mem', value)
      } catch (caught) {
        refused = caught
      }
      expect((refused as { status?: string } | null)?.status, `the pair ${JSON.stringify(value)} is refused`).toBe('ConstraintPassRefused')
      expect((refused as { message?: string } | null)?.message, 'in a sentence naming the state the pair does not name').toContain('names nothing the gate can apply')
    }
    expect(store.read(EXCLUSION, 'mem'), 'and the pair that stood is the pair that still stands').toEqual(stood)
    expect((() => { try { store.write(EXCLUSION, 'mem', { exclusion: 'mcp-enabled' }); return 'landed' } catch { return 'refused' } })(), 'the other word still lands').toBe('landed')
    expect(store.read(EXCLUSION, 'mem'), 'and it is what the register carries').toEqual({ exclusion: 'mcp-enabled' })
  })

  it('VA-10 · THE APP-STATE ROW LIST: a row the read SKIPS — no record, no non-empty name, no `value` — is refused, so the list that stood survives; `writeAppState` still lands, and an empty list stays legal (D-85, D-105)', () => {
    const where = dir()
    const instance = createOperatorSettings({ userDataDir: where })
    expect(instance.writeAppState([{ name: 'file.layout.dock', value: 'left' }]), 'a legal row list lands through the module\'s route').toMatchObject({ status: 'committed' })
    const store = storeCreate({ journalLength: 256, listeners: [], filePath: at(where, OPERATOR_FILE), constraints: (captured[captured.length - 1]?.['constraints'] ?? []) as never })
    const stood = readFileSync(at(where, OPERATOR_FILE), 'utf8')
    for (const value of [{ rows: [{ name: 7, value: 'x' }] }, { rows: [{ name: 'a' }] }, { rows: [], legacy: 'bogus' }, { rows: [{ name: '', value: 1 }] }]) {
      let refused: unknown = null
      try {
        store.write(APP_STATE, 'file', value)
      } catch (caught) {
        refused = caught
      }
      expect((refused as { status?: string } | null)?.status, `the row list ${JSON.stringify(value)} is refused`).toBe('ConstraintPassRefused')
      expect((refused as { message?: string } | null)?.message, 'in the module\'s own sentence').toContain('the app-state row list stands but carries a row')
    }
    expect(readFileSync(at(where, OPERATOR_FILE), 'utf8'), 'the file is byte-identical across every refusal').toBe(stood)
    expect(createOperatorSettings({ userDataDir: where }).readAppState().rows, 'and a restart still serves the row that stood').toEqual([{ name: 'file.layout.dock', value: 'left' }])
    expect(instance.writeAppState([{ name: 'file.layout.dock', value: 'right' }]), 'the module\'s own route still lands').toMatchObject({ status: 'committed' })
    expect(instance.readAppState().rows).toEqual([{ name: 'file.layout.dock', value: 'right' }])
    expect((() => { try { store.write(APP_STATE, 'file', { rows: [] }); return 'landed' } catch { return 'refused' } })(), 'and an EMPTY list is still a legal row list').toBe('landed')
  })

  it('VA-11 · THE EXISTENCE ARMS STILL WORK, ON EVERY FAMILY: a cold profile carries every placeholder at the creation instant, and the operator instance carries its three', () => {
    const one = stand()
    // THE FIVE CENTRAL ROOTS, each at its creation-instant value: `['panes']`, `['tabs']` and `['theme']` are `file` and
    // carry the repair's write in the profile's own bytes; `['focus']` and `['zones']` are `mem` and are re-minted at
    // every boot, so their placeholder is the register's and no byte of it is a file's (D-84).
    expect(one.store.read(['panes'], 'file'), 'panes-must-stand\'s placeholder').toEqual({ 'pane-a': { size: 100, bounds: { min: 0, max: 200 } } })
    expect(one.tabs.read(), 'tabs-must-stand\'s landing row').toMatchObject({ order: ['landing'], landing: 'landing' })
    expect(one.store.read(['theme'], 'file'), 'theme-must-stand\'s placeholder declaration').toEqual({ declaration: { value: '', removal: true } })
    expect(one.store.read(['focus'], 'mem'), 'focus-must-stand\'s declared empty pair').toEqual({ entries: [] })
    expect(one.store.read(['zones'], 'mem'), 'zones-must-stand\'s family that names no zone').toEqual({})
    expect(one.view.read().source, 'and every family reads as a RECORD and never as a substituted default').toEqual({ panes: 'record', focus: 'record', zones: 'record', theme: 'record' })
    // THE SECURE CROSSING'S THREE: `['operator-exclusion']` is the `mem` pair its repair mints, and the two `file` records
    // are the repairs' own writes — which are what the file carries when the constructor returns (D-86).
    const where = dir()
    const instance = createOperatorSettings({ userDataDir: where })
    // ⟶ **THE RECORD GAINS THE PANE'S WORD AT `D-125`**: the crossing's fourth address is read on the same row that carries
    // the pair, because the realm renders the operator surface from one re-read — `{open: false}` is the creation repair's
    // own mint, so the boot's record and the address cannot disagree.
    expect(instance.read(), 'the record and the pair, over a cold profile').toEqual({ token: null, enabled: ['read', 'dispatch'], exclusion: 'mcp-enabled', tier4: false, pane: { open: false } })
    expect(instance.readAppState(), 'and the row list, with the word that says no import applied').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })
    const file = JSON.parse(readFileSync(at(where, OPERATOR_FILE), 'utf8')) as Record<string, unknown>
    expect(Object.keys(file).sort(), 'with both file records in the instance\'s own bytes before any caller act').toEqual(['operator-app-state', 'operator-settings'])
  })

  it('VA-12 · THE PREVIOUS LEGAL VALUE SURVIVES A RESTART, family by family: the three `file` families are the file\'s and come back member for member, and the two `mem` families are re-minted at their placeholder — which is what a `mem` address is for (D-84)', () => {
    const one = stand()
    expect(one.surface.write({ path: ['panes'], tier: 'file', value: { 'pane-a': { size: 61, bounds: { min: 1, max: 121 } } } }).status).toBe('committed')
    expect(one.surface.write({ path: ['theme'], tier: 'file', value: { token: 'dark', attribute: 'data-theme' } }).status).toBe('committed')
    expect(one.surface.write({ path: ['focus'], tier: 'mem', value: { entries: [{ id: 'a', target: 't' }], activeId: 'a' } }).status).toBe('committed')
    expect(one.surface.write({ path: ['zones'], tier: 'mem', value: { 'zone-1': { size: 7 } } }).status).toBe('committed')
    const next = one.restart()
    expect(next.view.read().panes, 'the pane geometry comes back off the bytes, exactly as it was written').toEqual([{ id: 'pane-a', size: 61, bounds: { min: 1, max: 121 } }])
    expect(next.view.read().theme, 'and so does the appearance record').toEqual({ token: 'dark', attribute: 'data-theme', declaration: { name: 'data-theme', value: 'dark', removal: false } })
    expect(next.view.read().focus, 'while a `mem` mirror is the instance\'s: the next process meets the declared empty pair').toEqual({ entries: [], activeId: null })
    expect(next.view.read().zones, 'and a `mem` zone family meets its placeholder').toEqual([])
    expect(next.view.read().source, 'and every one of the four still reads as a record, because a repair is a lawful boot source').toEqual({ panes: 'record', focus: 'record', zones: 'record', theme: 'record' })
    // **AND THE PREVIOUS LEGAL VALUE SURVIVES A CORRUPT ATTEMPT AT THE NEW HEAD — THE SURVIVAL IS ASSERTED BEFORE THE
    // VERDICT**, so a body that answered this state with a REPAIR (instead of the refusal it owes) reds HERE: the
    // placeholder would have replaced the family the file carried, and this row is where that is measured.
    const attempt = next.surface.write({ path: ['panes'], tier: 'file', value: { junk: true } })
    expect(next.view.read().panes, 'the geometry the file carried is still the geometry that stands — no repair replaced it').toEqual([{ id: 'pane-a', size: 61, bounds: { min: 1, max: 121 } }])
    expect(ledgerOf(attempt).storeStatus, 'and the attempt itself was REFUSED at the new head: a restart is not a door').toBe('ConstraintPassRefused')
  })

  it('VA-13 · THE ONE ARM THE VALUE ARMS DO NOT TAKE, STATED AND MEASURED: a hand-edited corrupt value in the FILE boots — a no-repair refusal at a registration instant refuses the CONSTRUCTION — and the first legal write heals it', () => {
    const where = dir()
    writeFileSync(at(where), JSON.stringify({ panes: { junk: true }, theme: { declaration: { value: '', removal: true } } }))
    let threw: unknown = null
    let store: ViewRecordStore | null = null
    try {
      store = boot(where)
    } catch (caught) {
      threw = caught
    }
    expect(threw, 'THE CONSTRUCTION IS NOT REFUSED: this is why the value arms answer the registration instant with `true`, and it is measured rather than assumed').toBe(null)
    expect(readFileSync(at(where), 'utf8'), 'and the bytes are unmoved by the boot — no repair replaced the value the file carried').toContain('"junk":true')
    if (store === null) throw new Error('the store stands')
    expect(store.read(['panes'], 'file'), 'the family the file carries is the family the register carries').toEqual({ junk: true })
    const healed = stand(where)
    const answer = healed.surface.write({ path: ['panes'], tier: 'file', value: { 'pane-a': { size: 12, bounds: { min: 0, max: 24 } } } })
    expect(answer.status, 'and the FIRST legal write at the root replaces it — the arm refuses a corrupt write, never a legal one').toBe('committed')
    expect(healed.view.read().panes, 'with the family legal from that instant on').toEqual([{ id: 'pane-a', size: 12, bounds: { min: 0, max: 24 } }])
    expect(healed.bytes().includes('"junk":true'), 'and the corrupt member gone from the bytes').toBe(false)
  })

  it('VA-14 · EVERY DECLARATION BOTH CROSSINGS REGISTER BUILDS ITS REFUSAL WITH OWN `message` AND OWN `repair` — driven over the very declaration objects the store adopted, at the registration batch and on the write path (`ST-F1`, `D-108`)', () => {
    // **WHAT THIS ROW IS FOR.** `ST-F1` WAS the kernel's own TWO READERS DISAGREEING, and from the installed `1.9.3`
    // they ANSWER THE SAME QUESTION — measured rather than assumed (`D-109`): a value whose `message` and `repair` are
    // INHERITED (`Object.create({message, repair})`) REGISTERED at `1.9.2`, where the registration path read
    // `'repair' in outcome`, a `[[HasProperty]]` that walks the chain, and then failed EVERY write, which the write path
    // read with `Object.hasOwn(outcome,'message')` and `ownMember(outcome,'repair')`, a `[[GetOwnProperty]]` that found
    // neither, so the write answered `ConstraintPassRefused` with *"returned a value outside the three declared outcome
    // arms"* and the repair never ran. **The registration instant now asks that same own-member question**
    // (`kernel-registration.mjs:399-400`) and refuses such a value at the CONSTRUCTION — `VA-15` drives it — so the
    // divergence has no second instant left to describe. It was upstream-owned and never patched here (`D-5`, `D-52`);
    // **the app is provably outside it, and this row is the proof rather than the assurance.**
    //
    // **THE FORM IS A DRIVE AND NOT A SCAN**: the store is constructed with the app's REAL batch, the batch arrays are
    // kept (so the declarations driven below are the very objects the store registered and not look-alikes rebuilt
    // beside it), and each pair's refusal arm is EXERCISED and its ANSWER inspected for own members. A text census
    // could not tell an object literal from a spread of a base whose prototype carries the two names; a drive can.
    const where = dir()
    const holder: { current: ViewRecordStore | null } = { current: null }
    const tabsBatch = tabsConstraintDeclarations(() => holder.current)
    const viewBatch = viewConstraintDeclarations(() => holder.current)
    const store = createProfileStore({
      filePath: at(where),
      constraints: [...tabsBatch, ...viewBatch].map((declaration) => ({ address: declaration.address, id: declaration.id, constraint: declaration.constraint })) as never,
    }) as unknown as ViewRecordStore
    holder.current = store
    // THE REGISTRATION INSTANT, ASSERTED BEFORE ANYTHING IS DRIVEN: the batch is SIX + FOUR over the two crossings and
    // THREE at the secure instance, every one of them REGISTERED (a `ConstraintRefusedAtRegistration` would have thrown
    // out of the construction above), and the ten ids are one namespace with no repeat.
    expect(tabsBatch.length, 'the tab record declares SIX').toBe(6)
    expect(viewBatch.length, 'the view record declares FOUR').toBe(4)
    const centralIds = [...tabsBatch, ...viewBatch].map((declaration) => declaration.id)
    expect(centralIds.slice().sort(), 'and the ten ids are the batch `src/main/main.ts` hands the one construction').toEqual([
      'exactly-one-active',
      'focus-must-stand',
      'order-names-its-tabs',
      'panes-must-stand',
      'tab-has-content',
      'tab-has-lastActiveAt',
      'tab-has-title',
      'tabs-must-stand',
      'theme-must-stand',
      'zones-must-stand',
    ])
    const secureDir = dir()
    createOperatorSettings({ userDataDir: secureDir })
    const secureBatch = (captured[captured.length - 1]?.['constraints'] ?? []) as ReadonlyArray<{ id: string; constraint: (context: unknown) => unknown }>
    // ⟶ **THE SECURE CROSSING'S BATCH MOVES `3 → 5 → 6`**: `D-123` added the pane family's existence pair and the invariant,
    // and `D-124` declares that invariant at EACH half it judges instead of once at the store's root — one more element of
    // the same construction's list, and no second store. So this row now drives SIXTEEN declarations.
    expect(secureBatch.length, 'the secure crossing declares SIX, and this is the list its own construction adopted').toBe(6)
    const sixteen = centralIds.length + secureBatch.length
    expect(sixteen, 'SIXTEEN declarations, and this row drives every one of them').toBe(16)

    // **THE ONE ASSERTION THE WHOLE ROW IS** — made on the VALUE A BODY ANSWERED, which is the only form the kernel's
    // two readers ever see. `Object.getPrototypeOf` is asserted FIRST and separately, because an answer built on a base
    // would pass an own-`message`-only probe while failing the write instant, which is exactly the divergence.
    const refusalForm = (label: string, answer: unknown, members: readonly string[]): void => {
      expect(answer, `${label}: the body answered its REFUSAL arm, not the pass arm`).not.toBe(true)
      const outcome = answer as Record<string, unknown>
      expect(
        Object.getPrototypeOf(outcome),
        `${label}: the refusal is a PLAIN object — an \`Object.create({message, repair})\` answer is REFUSED at the registration instant, which \`VA-15\` drives, so a refusal built on a base is the one shape this row exists to make impossible (ST-F1)`,
      ).toBe(Object.prototype)
      expect(Object.getOwnPropertyNames(outcome).sort(), `${label}: its OWN property names are exactly the arm's declared members, so neither is inherited`).toEqual(members.slice().sort())
      for (const member of members) expect(Object.hasOwn(outcome, member), `${label}: \`${member}\` is an OWN property at this instant`).toBe(true)
      if (members.includes('repair')) expect(typeof outcome['repair'], `${label}: the repair is a function the kernel may invoke`).toBe('function')
      // THE UNREPAIRABLE ARM'S WHOLE JOB: no `repair` at all — and "no" includes INHERITED, which `1.9.3` reads as
      // absent at BOTH instants, so a prototype chain decides nothing here. The question stays `in` rather than
      // `Object.hasOwn` because that is the weaker probe: what an own-only reader would miss, this one cannot.
      else expect('repair' in outcome, `${label}: and the unrepairable arm carries no \`repair\`, own or inherited`).toBe(false)
    }

    // **THE TEN CENTRAL DECLARATIONS, EACH AT ITS REPAIRABLE ARM.** Six answer `{message, repair}`; the four view
    // families answer the same shape at their existence arm (`D-84`, `D-85`, `D-91`, `D-97`). The context is the
    // REGISTRATION instant's — `{address, tier: null, value}` — which is the one instant at which the batch itself is
    // asked. **AND FROM `1.9.3` IT IS THE STRICTER OF THE TWO INSTANTS, NOT THE PERMISSIVE ONE** `ST-F1` described: the
    // reader demands an OWN `message` before it looks for a repair at all, and where no own `repair` answers it refuses
    // the CONSTRUCTION, where the write instant's own-`message` question only decides its sentence (`D-109`).
    const byId = new Map([...tabsBatch, ...viewBatch].map((declaration) => [declaration.id, declaration]))
    const central = (id: string, context: unknown): unknown => {
      const declaration = byId.get(id)
      if (declaration === undefined) throw new Error(`the batch carries no declaration for ${id}`)
      return declaration.constraint(context)
    }
    refusalForm('tabs-must-stand', central('tabs-must-stand', { address: ['tabs'], tier: null, value: undefined }), ['message', 'repair'])
    refusalForm('order-names-its-tabs', central('order-names-its-tabs', { address: ['tabs'], tier: null, value: { order: ['ghost'], entries: {} } }), ['message', 'repair'])
    refusalForm('panes-must-stand', central('panes-must-stand', { address: ['panes'], tier: null, value: undefined }), ['message', 'repair'])
    refusalForm('focus-must-stand', central('focus-must-stand', { address: ['focus'], tier: null, value: undefined }), ['message', 'repair'])
    refusalForm('zones-must-stand', central('zones-must-stand', { address: ['zones'], tier: null, value: undefined }), ['message', 'repair'])
    refusalForm('theme-must-stand', central('theme-must-stand', { address: ['theme'], tier: null, value: undefined }), ['message', 'repair'])
    // **THE FOUR WHOSE ARM READS THE STANDING RECORD, AND WHY THEY ARE DRIVEN THROUGH THE HOLDER AND NOT THE STORE.** A
    // violation these four judge can only STAND inside a commit — every write that would leave one is REPAIRED in that
    // same commit (`VA-2`'s control, `D-105`'s measurement), and the package consumes the answer and never hands it
    // back. So the handle the SAME declaration objects close over is pointed at the record such a commit would see, and
    // the declarations driven are still the ones the store registered. Nothing is rebuilt: `holder` is the getter the
    // batch was built with.
    holder.current = { read: () => ({ order: ['t', 'u'], t: { label: '', target: '', lastActiveAt: '', active: true }, u: { active: true } }) } as never
    refusalForm('exactly-one-active', central('exactly-one-active', { address: ['tabs'], tier: 'file', value: {} }), ['message', 'repair'])
    refusalForm('tab-has-title', central('tab-has-title', { address: ['tabs'], tier: 'file', value: {} }), ['message', 'repair'])
    refusalForm('tab-has-content', central('tab-has-content', { address: ['tabs'], tier: 'file', value: {} }), ['message', 'repair'])
    refusalForm('tab-has-lastActiveAt', central('tab-has-lastActiveAt', { address: ['tabs'], tier: 'file', value: {} }), ['message', 'repair'])
    holder.current = store

    // **THE THREE SECURE DECLARATIONS, AT THE EXISTENCE ARM AND AT THE VALUE ARM (`D-105`).** Their own batch is the
    // list the construction adopted, so the objects are the registered ones.
    const secureById = new Map(secureBatch.map((declaration) => [declaration.id, declaration]))
    const secureRefusal = (id: string, context: unknown): unknown => {
      const declaration = secureById.get(id)
      if (declaration === undefined) throw new Error(`the secure batch carries no declaration for ${id}`)
      return declaration.constraint(context)
    }
    refusalForm('operator-record-must-stand', secureRefusal('operator-record-must-stand', { address: ['operator-settings'], tier: null, value: undefined }), ['message', 'repair'])
    refusalForm('operator-exclusion-must-stand', secureRefusal('operator-exclusion-must-stand', { address: ['operator-exclusion'], tier: null, value: undefined }), ['message', 'repair'])
    refusalForm('operator-app-state-must-stand', secureRefusal('operator-app-state-must-stand', { address: ['operator-app-state'], tier: null, value: undefined }), ['message', 'repair'])
    // **AND THE THIRD SECURE FAMILY, WHICH THIS ROW DID NOT DRIVE UNTIL `D-124` RE-DERIVED ITS OWN COUNT** — `D-123` added
    // `operator-pane-must-stand` beside the other three and the row's census grew to five while its drive list stayed at
    // three, so its claim that it drove every declaration was the one thing in it that was not true. It is driven now.
    refusalForm('operator-pane-must-stand', secureRefusal('operator-pane-must-stand', { address: ['operator-pane'], tier: null, value: undefined }), ['message', 'repair'])

    // **THE INVARIANT'S TWO SEATS (`D-124`), AND WHAT THEIR ARMS ARE REACHABLE AT — SAID RATHER THAN ASSUMED.** Both seats
    // READ both halves through the handle whenever one stands, and a live instance's store can never hold the illegal pair
    // (`CD-13`/`CD-14` are that reading through the module's own verbs), so a live batch's seat passes over every state it
    // can stand on. **THE SEATS' REFUSAL FORM IS THEREFORE DRIVEN OVER A BATCH WHOSE HANDLE DOES NOT STAND** — the list a
    // REFUSED construction built, whose `standing()` closure answers `null` for the process's life (`CD-12` is that arm's
    // own measurement): there the pane's seat judges its own half from `context.value` and an illegal one answers the
    // repairable arm. **AND THE PORTS' SEAT CANNOT REFUSE AT THAT INSTANT AT ALL** — the pane's half is not in its context
    // and no handle exists to read it, and an absent half is the closed pane — so it PASSES there, and its refusal arm is
    // measured where it is reachable: at a LANDING instant, which `CD-14` drives (the enable refused and repaired inside
    // its own commit). Both answers come from ONE object literal in ONE function, so the form is one form.
    const deadDir = dir()
    mkdirSync(join(deadDir, 'provident-operator-settings.json'))
    createOperatorSettings({ userDataDir: deadDir })
    const deadBatch = (captured[captured.length - 1]?.['constraints'] ?? []) as ReadonlyArray<{ id: string; constraint: (context: unknown) => unknown }>
    const deadRefusal = (id: string, context: unknown): unknown => {
      const declaration = deadBatch.find((entry) => entry.id === id)
      if (declaration === undefined) throw new Error(`the refused construction's batch carries no declaration for ${id}`)
      return declaration.constraint(context)
    }
    refusalForm('no-open-pane-over-open-ports', deadRefusal('no-open-pane-over-open-ports', { address: ['operator-pane'], tier: null, value: { open: true } }), ['message', 'repair'])
    expect(deadRefusal('no-open-ports-under-an-open-pane', { address: ['operator-exclusion'], tier: null, value: { exclusion: 'mcp-enabled' } }), 'the ports` seat passes at a registration instant, because the half it cannot read is judged as the closed pane — an absent half, which is the state that instant always holds').toBe(true)

    // **AND THE SIX UNREPAIRABLE ARMS, WHICH ARE THE ONES A PROTOTYPE CHAIN WOULD BE MOST DANGEROUS ON**: at `1.9.2` a
    // `{message}` arm's inherited `repair` was invoked at the registration instant and IGNORED at the write instant;
    // from `1.9.3` NO instant reads one, so the row asserts the member's ABSENCE and not merely its being non-own.
    refusalForm('panes-must-stand (value arm)', central('panes-must-stand', { address: ['panes'], tier: 'file', value: { junk: true } }), ['message'])
    refusalForm('focus-must-stand (value arm)', central('focus-must-stand', { address: ['focus'], tier: 'mem', value: { junk: true } }), ['message'])
    refusalForm('zones-must-stand (value arm)', central('zones-must-stand', { address: ['zones'], tier: 'mem', value: { junk: true } }), ['message'])
    refusalForm('operator-record-must-stand (value arm)', secureRefusal('operator-record-must-stand', { address: ['operator-settings'], tier: 'file', value: { junk: true } }), ['message'])
    refusalForm('operator-exclusion-must-stand (value arm)', secureRefusal('operator-exclusion-must-stand', { address: ['operator-exclusion'], tier: 'mem', value: { junk: true } }), ['message'])
    refusalForm('operator-app-state-must-stand (value arm)', secureRefusal('operator-app-state-must-stand', { address: ['operator-app-state'], tier: 'file', value: { rows: [{ name: 7, value: 'x' }] } }), ['message'])

    // **THE WRITE PATH, WHERE THE KERNEL IS THE ONLY READER.** The answer object is not observable from a write, but the
    // two things a chain-only answer destroys ARE: an own `repair` is INVOKED inside the caller's own commit, and an own
    // `message` is the sentence the refusal carries. So the same batch's repair is made to run — the six tab pairs'
    // `healRecord` through a corrupt whole-record write — and every value arm's refusal is read for ITS OWN sentence,
    // with ST-F1's divergence sentence asserted absent from all of them.
    const surface = createDataSurface({ profileDir: where, store: store as never, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] })
    const repaired = surface.write({ path: ['tabs'], tier: 'file', value: { junk: true } })
    if (repaired.status !== 'committed') throw new Error('the corrupt tab record is repaired inside the caller\'s own commit, and answered ' + JSON.stringify(repaired))
    expect(repaired.repaired, 'a repair the kernel FOUND OWN ran inside the caller\'s commit — the write instant\'s half of the claim, for the six tab pairs').toBe(true)
    const sentences: string[] = []
    for (const [path, tier, value] of [
      [['panes'], 'file', { junk: true }],
      [['focus'], 'mem', { junk: true }],
      [['zones'], 'mem', { junk: true }],
    ] as ReadonlyArray<readonly [readonly string[], 'file' | 'mem', unknown]>) {
      sentences.push(ledgerOf(surface.write({ path, tier, value })).message)
    }
    for (const message of sentences) expect(message, 'each refusal carries its own family\'s sentence, which only an OWN `message` can reach the kernel as').toMatch(/^the (pane geometry|focus mirror|zone family) (carries|holds)/)
    for (const message of sentences) expect(message.includes('outside the three declared outcome arms'), 'and NONE of them is ST-F1\'s divergence sentence').toBe(false)
  })

  it('VA-15 · **THE INSTRUMENT IS INVERTED, NOT DELETED — AND IT CAN STILL FAIL** — the same planted `Object.create({message, repair})` declaration is now REFUSED at the REGISTRATION instant with the inherited repair invoked ZERO times, its two reverse probes and a class instance refused beside it, so the divergence it once measured has no second instant left; and over comment-elided code no module builds a refusal on a base at all (ST-F1, discharged upstream at `1.9.3` — `D-109`)', () => {
    // (a) `ST-F1` WAS DISCHARGED UPSTREAM AT THE INSTALLED `1.9.3`, AND THIS ROW IS RE-DERIVED INTO ITS INVERSE rather than
    //     deleted, because a row that cannot fail is a deleted row wearing a new name. **THE PLANT IS THE SAME PLANT AND
    //     NOT A LOOK-ALIKE**: the same `Object.create({message, repair})` value, the same real declaration answering it,
    //     the same scratch profile — what moved is the PACKAGE'S READING of it. At `1.9.2` the registration instant read
    //     `'repair' in outcome`, a `[[HasProperty]]` that walks the chain, ACCEPTED that value and invoked the inherited
    //     repair ONCE; from `1.9.3` it asks the same own-member question the write instant asks
    //     (`kernel-registration.mjs:399-400`, `Object.hasOwn(outcome,'message')` then `ownMember(outcome,'repair')`), so
    //     the construction is REFUSED. **AND THE DIVERGENCE'S SECOND INSTANT IS NOW UNREACHABLE — there is no store to
    //     write to.** That is the release's whole claim, so this half asserts nothing about a store and nothing about a
    //     write: a `null` store proves nothing, and the arm under test is the one that decides whether a store exists.
    const where = dir()
    const legal = { order: ['landing'], landing: { label: 'L', target: 'landing', lastActiveAt: 'now', active: true } }
    /** **THE ONE DECLARATION EVERY ARM REGISTERS** — legal once the record it demands STANDS, and the arm's planted
     *  refusal otherwise. It is the plant's own body: the arms vary the REFUSAL and never the declaration. */
    const plantedConstraint = (refusal: unknown) => (context: unknown): unknown => {
      const held = (context as { value?: unknown } | null)?.value
      const seat = typeof held === 'object' && held !== null ? (held as Record<string, unknown>)['order'] : undefined
      return Array.isArray(seat) ? true : refusal
    }
    type RegistrationRefusal = { status?: string; message?: string; log?: readonly unknown[] }
    /** **THE REGISTRATION INSTANT, DRIVEN ONCE PER ARM OVER THE ONE SCRATCH PROFILE.** A refused construction lands no
     *  byte (`1.9.1`'s own rollback), so every arm meets the same cold profile the plant met at `1.9.2` — and the
     *  invocation count is the arm's own, which is the clause `1.9.2` could NOT assert because the inherited repair ran. */
    const refusesAtRegistration = (label: string, refusal: unknown, zero: string, invocations: () => number): RegistrationRefusal => {
      let caught: unknown = null
      let threw = false
      try {
        storeCreate({
          journalLength: 64,
          listeners: [],
          filePath: at(where),
          constraints: [{ address: ['tabs'], id: 'planted-inherited-pair', constraint: plantedConstraint(refusal) }] as never,
        })
      } catch (error) {
        threw = true
        caught = error
      }
      expect(threw, `${label}: THE CONSTRUCTION IS REFUSED at the registration instant — this is the shape \`1.9.2\` ACCEPTED, and the refusal is the whole of what the release bought`).toBe(true)
      const form = caught as RegistrationRefusal
      expect(form.status, `${label}: and the refusal is the REGISTRATION instant's own status, never the write's`).toBe('ConstraintRefusedAtRegistration')
      expect(Object.getOwnPropertyNames(form), `${label}: its own names are exactly the refusal's four-member literal`).toEqual(['status', 'message', 'log', 'address'])
      expect(form.log, `${label}: with an EMPTY \`log\` — no pass ran, so no entry was appended`).toEqual([])
      expect(invocations(), `${label}: ${zero}`).toBe(0)
      return form
    }

    // ARM ONE — THE PLANT, UNMOVED. Its refusal's two members are INHERITED, and the counter stands on the BASE's
    // `repair`, because that is the member `1.9.2`'s permissive reader reached and invoked once.
    let plantRepairs = 0
    const plant = {
      message: 'the planted pair refuses a record with no order seat',
      repair: (context: unknown) => {
        plantRepairs += 1
        const receipt = (context as { write: (address: readonly string[], tier: string, value: unknown) => { op?: unknown } }).write(['tabs'], 'file', legal)
        // THE CREDITED ARM, because a registration repair is re-run over the op it landed and a repair that answered
        // anything else would refuse the CONSTRUCTION — which is a different arm from the one this plant is about.
        return { ok: true as const, op: receipt.op }
      },
    }
    const plantedAnswer = Object.create(plant) as object
    expect(Object.getPrototypeOf(plantedAnswer), 'the planted refusal\'s base is a shared object and not `Object.prototype`').toBe(plant)
    expect(Object.hasOwn(plantedAnswer, 'message'), 'so neither member is OWN').toBe(false)
    expect(Object.hasOwn(plantedAnswer, 'repair')).toBe(false)
    refusesAtRegistration('PLANT · `Object.create({message, repair})`', plantedAnswer, 'the INHERITED repair is invoked ZERO times — `1.9.2` invoked it ONCE, and that single invocation is the reading this clause replaces', () => plantRepairs)

    // ARM TWO — THE FIRST REVERSE PROBE: an OWN `message` with an INHERITED `repair`. It is here because the fix is TWO
    // members and not one: a narrowing of the `repair` probe ALONE leaves this shape registering, since its `message` is
    // own, and the write instant would then read a `repair` it cannot see — the one-word half of the same fault. `1.9.2`
    // measured it as a DIFFERENT symptom from the plant's (the constraint's own sentence at the write, still no repair).
    let inheritedRepairRuns = 0
    const ownMessage = Object.assign(
      Object.create({
        repair: (context: unknown) => {
          inheritedRepairRuns += 1
          const receipt = (context as { write: (address: readonly string[], tier: string, value: unknown) => { op?: unknown } }).write(['tabs'], 'file', legal)
          return { ok: true as const, op: receipt.op }
        },
      }),
      { message: 'own `message`, INHERITED `repair`' },
    ) as object
    expect(Object.hasOwn(ownMessage, 'message'), 'the first probe\'s `message` IS own').toBe(true)
    expect(Object.hasOwn(ownMessage, 'repair'), 'and its `repair` is NOT').toBe(false)
    refusesAtRegistration('PROBE A · own `message` + inherited `repair`', ownMessage, 'so the INHERITED repair is invoked ZERO times', () => inheritedRepairRuns)

    // ARM THREE — THE SECOND REVERSE PROBE, and it is the one the finding's own proposed fix would have missed: an OWN
    // `repair` with an INHERITED `message`. Narrowing the `repair` probe alone accepts it, and `1.9.2` measured exactly
    // the plant's own symptom there — a store that registers and writes nothing the pair can answer. `1.9.3` refuses it,
    // and the OWN repair it does carry is never reached: the count proves the kernel refused BEFORE running a member
    // this shape really has.
    let ownRepairRuns = 0
    const ownRepair = Object.assign(Object.create({ message: 'INHERITED `message`, own `repair`' }), {
      repair: (context: unknown) => {
        ownRepairRuns += 1
        const receipt = (context as { write: (address: readonly string[], tier: string, value: unknown) => { op?: unknown } }).write(['tabs'], 'file', legal)
        return { ok: true as const, op: receipt.op }
      },
    }) as object
    expect(Object.hasOwn(ownRepair, 'repair'), 'the second probe\'s `repair` IS own').toBe(true)
    expect(Object.hasOwn(ownRepair, 'message'), 'and its `message` is NOT').toBe(false)
    refusesAtRegistration('PROBE B · own `repair` + inherited `message`', ownRepair, 'and the OWN repair it does carry is invoked ZERO times — the kernel refused before reaching it', () => ownRepairRuns)

    // ARM FOUR — THE CLASS INSTANCE, which was `1.9.2`'s QUIETEST ACCEPTANCE: a `get message()` on the PROTOTYPE and an
    // own `repair`, a registration repair's landing standing beside it. An own-member question answers `message` absent
    // where a descriptor walk would answer present, so the construction is refused — a class is not a plain object, and
    // the release narrowed the QUESTION rather than the class.
    let classRepairRuns = 0
    class PlantedRefusal {
      repair!: (context: unknown) => { readonly ok: true; readonly op: unknown }
      constructor() {
        this.repair = (context: unknown) => {
          classRepairRuns += 1
          const receipt = (context as { write: (address: readonly string[], tier: string, value: unknown) => { op?: unknown } }).write(['tabs'], 'file', legal)
          return { ok: true as const, op: receipt.op }
        }
      }
      get message(): string {
        return 'a `get message()` on the prototype, own `repair`'
      }
    }
    const instance = new PlantedRefusal()
    expect(Object.hasOwn(instance, 'message'), 'the instance\'s `message` is the PROTOTYPE\'s accessor, so no own member of that name exists').toBe(false)
    expect(Object.hasOwn(instance, 'repair'), 'and its `repair` is OWN').toBe(true)
    expect(typeof instance.message, 'the accessor answers a string, which is why this shape read as an outcome at `1.9.2`').toBe('string')
    refusesAtRegistration('CLASS INSTANCE · `get message()` on the prototype + own `repair`', instance, 'so the own repair is invoked ZERO times', () => classRepairRuns)

    // ARM FIVE — THE THIRD NARROWED MEMBER, WHICH THE FINDING DID NOT PROPOSE: **an own `{message, repair}` whose
    // REPAIR'S RETURN carries an INHERITED `ok`.** `1.9.3` reads that return's `ok` as an own member too, so the
    // registration repair's answer is not credited, the re-run refuses, and the construction goes with it. This arm's
    // log is NOT empty and its repair DOES run once — which is what distinguishes it from the four above, and is why it
    // is asserted on its own rather than through the helper.
    let inheritedOkRuns = 0
    const inheritedOk = {
      message: 'own pair, and the return\'s `ok` is INHERITED',
      repair: (context: unknown) => {
        inheritedOkRuns += 1
        const receipt = (context as { write: (address: readonly string[], tier: string, value: unknown) => { op?: unknown } }).write(['tabs'], 'file', legal)
        return Object.assign(Object.create({ ok: true as const }), { op: receipt.op })
      },
    }
    expect(Object.hasOwn(inheritedOk, 'message') && Object.hasOwn(inheritedOk, 'repair'), 'this arm\'s outcome is own at BOTH members — it is the RETURN that is not').toBe(true)
    let uncredited: unknown = null
    try {
      storeCreate({
        journalLength: 64,
        listeners: [],
        filePath: at(where),
        constraints: [{ address: ['tabs'], id: 'planted-inherited-pair', constraint: plantedConstraint(inheritedOk) }] as never,
      })
    } catch (error) {
      uncredited = error
    }
    const uncreditedForm = uncredited as { status?: string; log?: ReadonlyArray<{ kind?: string }> } | null
    expect(uncreditedForm?.status, 'THE RETURN\'S `ok` IS READ AS OWN AT THE REGISTRATION INSTANT TOO: the construction is refused').toBe('ConstraintRefusedAtRegistration')
    expect(inheritedOkRuns, 'and the repair DID run — once — because the outcome it answered with is own at both members').toBe(1)
    expect((uncreditedForm?.log ?? []).map((entry) => entry.kind), 'with a log that is NOT empty: the pass ran, then the repair was attempted and refused').toEqual(['constraint-check', 'repair-run'])

    // (b) THE STATIC HALF, OVER COMMENT-ELIDED CODE, so a base cannot arrive by a road the drive does not take. Every
    //     `Object.create` in the three declaring modules is `Object.create(null)` — the caller-data copy map, whose whole
    //     point is that it has NO chain — and no `setPrototypeOf` and no `__proto__` stands in any of their code.
    const modules = {
      'src/main/tabs-record/index.ts': commentElided(sourceOf('src/main/tabs-record/index.ts')),
      'src/main/view-record/index.ts': commentElided(sourceOf('src/main/view-record/index.ts')),
      'src/main/operator-settings/index.ts': commentElided(sourceOf('src/main/operator-settings/index.ts')),
    }
    let creates = 0
    for (const [path, code] of Object.entries(modules)) {
      for (const hit of code.matchAll(/Object\.create\(([^)]*)\)/g)) {
        creates += 1
        expect(hit[1].trim(), `${path}: every \`Object.create\` here is the NULL-prototype copy map, which carries nothing to inherit`).toBe('null')
      }
      expect(code.includes('setPrototypeOf'), `${path}: no answer is re-based`).toBe(false)
      expect(code.includes('__proto__'), `${path}: and no \`__proto__\` key stands in its code`).toBe(false)
    }
    expect(creates, 'the census is not vacuous: the modules DO call `Object.create`, once in code (its second spelling is prose in a docblock, and the elision is what tells the two apart), and it is the null map').toBe(1)
    // THE POSITIVE CONTROL ON THE SAME SCANNER: a planted base-built refusal IS reported by the clause above.
    const plantedSource = commentElided('const refuse = () => Object.create({ message: m, repair: r })\n')
    expect([...plantedSource.matchAll(/Object\.create\(([^)]*)\)/g)].map((hit) => (hit[1] ?? '').trim()), 'the control: a base-built refusal is what this clause reports').toEqual(['{ message: m, repair: r }'])
  })
})
