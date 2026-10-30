// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/integration/settings-carrier-retirement/surface.test.ts — THE L2 BATTERY for
// `settings-carrier-retirement`, part 3: THE TWO DELEGATING VERBS, THE TWO CHANNELS' ANSWERS, THE
// DECLARED MEMBER SETS, AND BOOT PARITY BY A SECOND CONSTRUCTION.
//
// THE CONTRACT: docs/L2/settings-carrier-retirement/interface.md §3 (the two verbs and `ASM-L2-4`'s
// ordinal-free committed arm), §4 (the two channel bodies' answers) and §2 (`AppStateAnswer`);
// behaviour.md §1 (the boot's three readings, no third holder), §2 (Y-1's answer minted from the
// rows), §3 (`A-6`) and §6 (boot parity — its own red set, proven by a second construction and never
// by a substring); persistence.md §2, §4 and §6; L1 `settings-carrier-retirement.md` §5, §8
// `S-2`/`S-7`.
//
// THIS FILE STANDS RED UNTIL THE IMPLEMENTATION EXISTS (`examiner.md` §3, D-1): `state` and `commit`
// are not members of the surface at this head, so every row below fails on the first call. Nothing is
// skipped, softened or re-pointed at a substitute.
//
// HOW THE SUBJECT IS TYPED. `interface.md` §3 declares the surface's delta; the product at this head
// carries the sibling's four verbs and not the two. The rows therefore type the product through a
// LOCAL transcription of that interface and cast the constructed object to it (`as unknown as`) —
// typing the contract, not standing in for the module. `SUR-5` is the row that keeps the cast honest:
// it reads the real objects' member sets at RUN TIME, so a product that does not carry exactly the
// declared members fails there rather than passing on a type.
//
// BOOT PARITY IS A RECORD, NEVER A TOKEN SCAN (behaviour.md §6): every limb below reads a
// CONSTRUCTED surface over the same profile directory, so what it asserts is what the next process
// would serve.
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createOperatorSettings } from '../../../src/main/operator-settings'
import {
  createSettingsSurface,
  type SettingsGateSink,
  type SettingsReadAnswer,
  type SettingsSetAnswer,
  type SettingsTransitionAnswer,
} from '../../../src/main/settings-surface'

const OPERATOR_FILE = 'provident-operator-settings.json'
/** The RETIRED carrier, the battery's own SEED: `SUR-7` writes it and no module may write it
 *  (persistence.md §1, §4). A literal here ON PURPOSE, so the row can prove nothing re-reads it. */
const RETIRED_FILE = 'provident-settings.json'

/** `interface.md` §3, transcribed: the row alias, the diagnosis alias, the four-member answer, and the
 *  committed arm that carries NO ordinal (`ASM-L2-4`). */
interface SettingsAppStateRow { name: string; value: unknown }
type SettingsLegacyAnswer = 'absent' | 'imported' | 'corrupt' | 'recorded'
interface SettingsAppStateAnswer {
  rows: SettingsAppStateRow[]
  legacy: SettingsLegacyAnswer
  unrepresentable: string[]
  storage: 'standing' | 'unreachable'
}
type SettingsCommitAnswer =
  | { status: 'committed' }
  | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }

/** `interface.md` §3's `SettingsSurface`, whole: the sibling's four verbs unmoved and this unit's two
 *  verbatim. */
interface SettingsSurfaceWithAppState {
  read(): SettingsReadAnswer
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SettingsSetAnswer
  transition(state: unknown): SettingsTransitionAnswer
  attach(sink: SettingsGateSink): void
  state(): SettingsAppStateAnswer
  commit(rows: readonly SettingsAppStateRow[]): SettingsCommitAnswer
}

/** `interface.md` §2's `AppStateAnswer` as the INSTANCE answers it — the shape `state()` must equal
 *  (behaviour.md §1, `SUR-1`). */
interface AppStateAnswer { rows: SettingsAppStateRow[]; legacy: SettingsLegacyAnswer; unrepresentable: string[]; storage: 'standing' | 'unreachable' }

let userDataDir: string

beforeEach(() => {
  userDataDir = mkdtempSync(join(tmpdir(), 'settings-carrier-surface-'))
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
})

function surface(dir: string): SettingsSurfaceWithAppState {
  return createSettingsSurface({ userDataDir: dir }) as unknown as SettingsSurfaceWithAppState
}

/** The INSTANCE's own answer, over the same profile — `SUR-1`'s comparison arm. The cast is the same
 *  contract-typing as above and no substitute for the module. */
function instanceAnswer(dir: string): AppStateAnswer {
  return (createOperatorSettings({ userDataDir: dir }) as unknown as { readAppState(): AppStateAnswer }).readAppState()
}

function committed(answer: SettingsCommitAnswer): { status: 'committed' } {
  if (answer.status !== 'committed') throw new Error(`the row needs the committed arm; it answered ${JSON.stringify(answer)}`)
  return answer
}

function refused(answer: SettingsCommitAnswer): { status: 'refused'; reason: string; message: string; address: unknown } {
  if (answer.status !== 'refused') throw new Error(`the row needs the refused arm; it answered ${JSON.stringify(answer)}`)
  return answer
}

/** THE MEMBER SET OF A PRODUCT, READ AT RUN TIME — own members plus those its prototype chain
 *  carries, stopping before `Object.prototype`. A closure product and a class-instance product are
 *  both lawful under `interface.md` §3, so the row asserts the DECLARED SURFACE rather than one
 *  implementation style's layout (`SUR-5`). */
function membersOf(product: object): string[] {
  const names = new Set<string>()
  for (let here: object | null = product; here !== null && here !== Object.prototype; here = Object.getPrototypeOf(here) as object | null) {
    for (const name of Object.getOwnPropertyNames(here)) {
      if (name === 'constructor') continue
      const value = (here as Record<string, unknown>)[name]
      if (typeof value === 'function') names.add(name)
    }
  }
  return [...names].sort()
}

/** The three representative rows `behaviour.md` §6 names, each one a shape the retired carrier held:
 *  a tabs order, a module record and a theme token. */
const PARITY_ROWS: SettingsAppStateRow[] = [
  { name: 'file.tabs.order', value: ['a'] },
  { name: 'file.modules.m1', value: { name: 'm1', version: '1.0.0', source: 'module-source', hash: 'unverified-by-this-unit', disabled: false } },
  { name: 'file.settings.theme.token', value: 'dark' },
]

describe('settings-carrier-retirement · the two delegating verbs, the channel answers and boot parity', () => {
  it('SUR-1 · on a fresh profile `state()` answers exactly what the instance’s `readAppState()` answers, and `commit` answers `{status:’committed’}` with NO ordinal (interface.md §3 ASM-L2-4; behaviour.md §1)', () => {
    const settings = surface(userDataDir)
    const fromSurface = settings.state()
    expect(fromSurface, 'the surface delegates and maps nothing: the four members cross unchanged (interface.md §3)').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })
    expect(fromSurface, 'and the instance over the same profile answers the same four members — one answer, two readers (behaviour.md §1)').toEqual(instanceAnswer(userDataDir))

    const answer = committed(settings.commit([{ name: 'file.tabs.order', value: ['a'] }]))
    expect(Object.keys(answer), 'the committed arm is EXACTLY `{status:’committed’}`: no `cursor`, no `opId`, because that is the landed answer of the channel it serves and preload.ts is byte-identical after this unit (interface.md §3 ASM-L2-4)').toEqual(['status'])
    expect(answer.status).toBe('committed')
    expect(settings.state().rows, 'and the commit landed: the rows moved and the answer says nothing else').toEqual([{ name: 'file.tabs.order', value: ['a'] }])
  })

  it('SUR-2 · Y-1’s answer is minted from those rows: `state().rows` are plain two-member `{name, value}` objects in committed order, so the handler’s `{name,value}[]` needs no reshaping (interface.md §4; behaviour.md §2)', () => {
    // THE HANDLER BODY ITSELF LIVES IN `src/main/main.ts` AND IS UNIMPORTABLE HERE: that file imports
    // `electron` at module scope, so no node-suite row can construct it. What this row drives is the
    // ANSWER the handler bodies project — `state()` — and L1's e2e `S-2` drives the handler on a
    // booted app. The limit is stated, never passed over silently (examiner.md §2).
    const settings = surface(userDataDir)
    committed(settings.commit(PARITY_ROWS))
    const answer = settings.state()

    expect(answer.rows.map((row) => row.name), 'the rows in their committed order, names verbatim (behaviour.md §2)').toEqual(['file.tabs.order', 'file.modules.m1', 'file.settings.theme.token'])
    for (const row of answer.rows) {
      expect(Object.keys(row).sort(), `a row is a plain two-member object, so the handler’s projection to {name,value}[] needs no reshaping: ${JSON.stringify(row.name)}`).toEqual(['name', 'value'])
    }
    expect(answer.rows[1].value, 'and the values cross whole at every depth (guide §10)').toEqual(PARITY_ROWS[1].value)
    expect(answer.rows.some((row) => row.name === 'schemaVersion'), 'no `schemaVersion` row appears in the answer: the stamp retired with the carrier (L1 §3; D-13)').toBe(false)
    expect(answer.storage, 'and the answer names a standing store').toBe('standing')
  })

  it('SUR-3 · BOOT PARITY BY A SECOND CONSTRUCTION: a fresh surface over the same profile serves the token, the grants, the cap and the rows themselves — never a substring read (behaviour.md §6; L1 §5)', () => {
    const a = surface(userDataDir)
    a.set({ token: 't', groups: ['graph', 'data'], maxJournalLength: 41 })
    // THE LANDED MERGE, STATED ONCE: `set` ADDS `groups` to the record and removes what `disable`
    // names (sibling interface.md §5, unmoved by this unit), so the declared drive above leaves
    // `read+dispatch` standing beside the two added names. `behaviour.md` §6's cell prints
    // `enabled:['graph','data']`; that figure is the SET the next process must serve after the grants
    // actually stand at those two names, which the `disable` leg below reaches through the same
    // declined-but-unmoved verb — the row pins both, and neither figure is invented.
    expect(a.read().enabled, 'the landed merge adds the two groups to the first-run pair').toEqual(['read', 'dispatch', 'graph', 'data'])
    committed(a.commit(PARITY_ROWS))

    const b = surface(userDataDir)
    const readByB = b.read()
    expect(readByB.token, 'surface B serves the token A committed').toBe('t')
    expect(readByB.enabled, 'and the granted groups').toEqual(['read', 'dispatch', 'graph', 'data'])
    expect(readByB.maxJournalLength, 'and the journal cap').toBe(41)
    expect(b.state().rows, 'and the app rows deep-equal A’s, in A’s committed order and whole — a deep comparison, never a substring read (behaviour.md §6)').toEqual(a.state().rows)
    expect(b.state().legacy, 'a record stood at the address, so the boot diagnosis says so (interface.md §2 ASM-L2-1)').toBe('recorded')
    expect(b.state().unrepresentable, 'and nothing was named uncarryable on a written profile').toEqual([])

    // THE DECLARED FIGURE, REACHED THROUGH THE DECLARED SURFACE: `disable` removes the first-run pair,
    // so the grants stand at exactly the two names behaviour.md §6 prints.
    a.set({ disable: ['read', 'dispatch'] })
    expect(a.read().enabled).toEqual(['graph', 'data'])
    const c = surface(userDataDir)
    expect(c.read().enabled, 'a fresh construction serves exactly the two-name grant set behaviour.md §6 declares for this member').toEqual(['graph', 'data'])
    expect(c.read().token, 'beside the token').toBe('t')
    expect(c.read().maxJournalLength, 'and the cap').toBe(41)
    expect(c.state().rows, 'and the rows are unmoved by the settings writes at the sibling’s address (persistence.md §6)').toEqual(a.state().rows)
  })

  it('SUR-4 · that same second construction answers `read().exclusion === \'mcp-enabled\'`: the pair is `mem`, at its DECLARED INITIAL, unmoved and never persisted (behaviour.md §6; D-17)', () => {
    const a = surface(userDataDir)
    a.set({ token: 't' })
    const applied = a.transition('mcp-disabled')
    expect(applied.applied, 'A really moved the pair, so the row below discriminates against a persisted `mem` member rather than asserting a state nobody wrote').toBe(true)
    expect(a.read().exclusion).toBe('mcp-disabled')
    committed(a.commit([{ name: 'file.tabs.order', value: ['a'] }]))

    const b = surface(userDataDir)
    expect(b.read().exclusion, 'the `mem` pair boots to its declared initial and never carries A’s value across a restart (D-17; persistence.md §6)').toBe('mcp-enabled')
    expect(b.read().read, 'and the closed tier-4 read token is absent, because the answer was minted while the pair stands open (sibling interface.md §5)').toBeNull()
    expect(b.state().rows, 'so the record persisted and the pair did not: one row, two tiers, two lifetimes').toEqual([{ name: 'file.tabs.order', value: ['a'] }])
    expect(readFileSync(join(userDataDir, OPERATOR_FILE), 'utf8').includes('exclusion'), 'and no byte of the instance’s file carries the exclusion spelling (persistence.md §6)').toBe(false)
  })

  it('SUR-5 · the declared member sets, read at RUN TIME off the real objects: the surface’s six and the instance’s five — this row is what keeps the contract cast honest (interface.md §2, §3)', () => {
    const settings = surface(userDataDir)
    expect(membersOf(settings), 'the surface’s own members are EXACTLY the six interface.md §3 declares: the sibling’s four and this unit’s two, and no seventh').toEqual(['attach', 'commit', 'read', 'set', 'state', 'transition'])

    const settingsInstance = createOperatorSettings({ userDataDir }) as unknown as object
    expect(membersOf(settingsInstance), 'and the instance’s are EXACTLY the five interface.md §2 declares: the sibling’s three and this unit’s two').toEqual(['read', 'readAppState', 'subscribe', 'write', 'writeAppState'])
  })

  it('SUR-6 · a refusal crosses the surface as the STORE’S OWN STATUS verbatim — the AS-5 drive, read at the delegating verb (interface.md §3, §6; behaviour.md §3)', () => {
    const settings = surface(userDataDir)
    committed(settings.commit([{ name: 'file.tabs.order', value: ['a', 'b'] }]))
    const before = readFileSync(join(userDataDir, OPERATOR_FILE))

    const answer = refused(settings.commit([{ name: 'file.bad', value: { nested: null } }]))
    // `ValueRefusedAtBoundary` is the PACKAGE'S declared spelling for the one member JSON can spell and
    // the store cannot (`guide §10.1`/§10.2); the surface carries it verbatim and re-spells nothing
    // (`'malformed-payload'` is the CHANNEL's pre-write refusal and never enters this module,
    // interface.md §3, §6).
    expect(answer.reason, 'the store’s own status verbatim — `ValueRefusedAtBoundary`, the package’s declared spelling for an unrepresentable value (guide §10.1/§10.2)').toBe('ValueRefusedAtBoundary')
    expect(typeof answer.message, 'with the package’s generated sentence beside it').toBe('string')
    expect('address' in answer, 'and the fourth member on the refused arm').toBe(true)

    expect(settings.state().rows, 'the previous rows stand: a refusal leaves the record as it stood (interface.md §6)').toEqual([{ name: 'file.tabs.order', value: ['a', 'b'] }])
    expect(readFileSync(join(userDataDir, OPERATOR_FILE)).equals(before), 'and the bytes are byte-identical (guide §9.4; persistence.md §5)').toBe(true)
    expect(readdirSync(userDataDir), 'and nothing appeared beside the one instance file').toEqual([OPERATOR_FILE])
  })

  it('SUR-7 · a second `state()` in one process answers the same rows and reads no file: a byte-different seed written AFTER the first answer leaves the second one unmoved (behaviour.md §1 cell 3; L1 §4)', () => {
    const FIRST_SEED = '{"schemaVersion":"1","file.tabs.order":["a","b"]}'
    writeFileSync(join(userDataDir, RETIRED_FILE), FIRST_SEED)
    const settings = surface(userDataDir)

    const first = settings.state()
    expect(first.legacy, 'the import ran at construction, so the first answer names the arm that ran (behaviour.md §7)').toBe('imported')
    expect(first.rows, 'and carries its rows').toEqual([{ name: 'file.tabs.order', value: ['a', 'b'] }])

    // THE LIVE FORM OF "NO FILE IS READ TWICE": a byte-different seed, written after the first answer,
    // whose own row would appear in any answer that re-read the file. Nothing re-reads it, so the
    // second answer cannot move — and the seed below is left byte-identical, so the row also proves
    // the second answer wrote nothing over it (behaviour.md §1; persistence.md §2, §4).
    const SECOND_SEED = '{"schemaVersion":"1","file.layout.dock":"left","file.tabs.order":["z"]}'
    writeFileSync(join(userDataDir, RETIRED_FILE), SECOND_SEED)

    const second = settings.state()
    expect(second, 'the same four members twice in one process: the import ran at most once, at construction, and a second `state()` serves the held answer (behaviour.md §1 cell 3)').toEqual(first)
    expect(second.rows.some((row) => row.name === 'file.layout.dock'), 'the second seed’s own row never appears — the live proof that no file was re-read after construction (behaviour.md §1)').toBe(false)
    expect(readFileSync(join(userDataDir, RETIRED_FILE), 'utf8'), 'and the second seed stands exactly as written: neither answer wrote a byte of the retired file (persistence.md §2, §4)').toBe(SECOND_SEED)
  })
})
