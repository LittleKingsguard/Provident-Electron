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
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
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
    expect(instance.read(), 'the record and the pair, over a cold profile').toEqual({ token: null, enabled: ['read', 'dispatch'], exclusion: 'mcp-enabled', tier4: false })
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
})
