// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/unit/settings-carrier-retirement/settings-surface.test.ts — THE L3 UNIT BATTERY for E-3,
// `src/main/settings-surface/index.ts` AT UNIT GRAIN: the two delegating verbs, the answers they mint,
// and the module's two absences (no new private name, no `ipcMain` site, no channel).
//
// THE CONTRACT (L3): docs/L3/settings-carrier-retirement/signatures.md §4 (the declared surface — two
// verbs added and `N = 15 → 19`), §5 (the private names: the landed six and **no new private name** —
// `state` and `commit` are locals of `createSettingsSurface`), §7 (what none of the three declares)
// and §1 (the file layout, E-3). docs/L3/settings-carrier-retirement/design.md §3 (the two verbs'
// pseudocode, `state()` copying nothing, `commit`'s ordinal-free committed arm, and the mapping of the
// instance's refusal verbatim) and §5 (the guardrails: no `node:fs`/`electron`/`provident-storeroom`
// import, no channel, no `ipcMain` site). Read on docs/L2/settings-carrier-retirement/interface.md
// §0/§3/§6/§7 and behaviour.md §1, and on docs/L1/settings-carrier-retirement.md §9 E-3.
//
// THIS FILE STANDS RED UNTIL THE IMPLEMENTATION EXISTS (examiner.md §3, D-1): `state` and `commit`
// are not members of the surface at this head, so every row that drives them fails with
// `surface.state is not a function` / `surface.commit is not a function`, and the member-set row
// fails on the four members it finds instead of six. Nothing is skipped and nothing is softened.
//
// THE GRAIN IS THE MODULE'S, NOT THE COMPOSITION'S. tests/integration/settings-carrier-retirement/
// `surface.test.ts` drives boot parity, the channel answers and `storage:'unreachable'` through the
// composition; this file pins what only the design declares here — the delegation's identity with the
// instance's own answer, the committed arm's EXACT member set, the refusal's three members carried
// verbatim, and the source census that keeps this module a delegate rather than a second engine.
//
// HOW THE SUBJECT IS TYPED. signatures.md §4 is transcribed locally and the constructed product is
// cast to it (`as unknown as`); `SC-5` reads the real member sets at RUN TIME, so the cast cannot
// hide a missing member (examiner.md §2).
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, describe, expect, it } from 'vitest'

import { createOperatorSettings } from '../../../src/main/operator-settings'
import { createSettingsSurface } from '../../../src/main/settings-surface'
import type { SettingsGateSink, SettingsReadAnswer, SettingsSetAnswer, SettingsTransitionAnswer } from '../../../src/main/settings-surface'

/** signatures.md §4, transcribed: the row alias, the diagnosis alias, the four-member answer, and the
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

/** signatures.md §4's `SettingsSurface`, whole: the landed four verbs unmoved and this unit's two. */
interface SettingsSurfaceWithAppState {
  read(): SettingsReadAnswer
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SettingsSetAnswer
  transition(state: unknown): SettingsTransitionAnswer
  attach(sink: SettingsGateSink): void
  state(): SettingsAppStateAnswer
  commit(rows: readonly SettingsAppStateRow[]): SettingsCommitAnswer
}

/** The INSTANCE's own answer over the same profile — the delegation's comparison arm
 *  (signatures.md §4: `state()` delegates `readAppState`). */
interface AppStateAnswer { rows: SettingsAppStateRow[]; legacy: SettingsLegacyAnswer; unrepresentable: string[]; storage: 'standing' | 'unreachable' }

const REPO = new URL('../../../', import.meta.url)
const SURFACE_SOURCE = 'src/main/settings-surface/index.ts'

/** Every profile this file creates, so no row leaks a directory into the machine. */
const scratch: string[] = []

afterEach(() => {
  while (scratch.length > 0) rmSync(scratch.pop() as string, { recursive: true, force: true })
})

const dir = (): string => {
  const profileDir = mkdtempSync(join(tmpdir(), 'settings-carrier-unit-surface-'))
  scratch.push(profileDir)
  return profileDir
}

function surface(profileDir: string): SettingsSurfaceWithAppState {
  return createSettingsSurface({ userDataDir: profileDir }) as unknown as SettingsSurfaceWithAppState
}

function instanceAnswer(profileDir: string): AppStateAnswer {
  return (createOperatorSettings({ userDataDir: profileDir }) as unknown as { readAppState(): AppStateAnswer }).readAppState()
}

function committed(answer: SettingsCommitAnswer): { status: 'committed' } {
  if (answer.status !== 'committed') throw new Error(`the row needs the committed arm; it answered ${JSON.stringify(answer)}`)
  return answer
}

function refused(answer: SettingsCommitAnswer): { status: 'refused'; reason: string; message: string; address: unknown } {
  if (answer.status !== 'refused') throw new Error(`the row needs the refused arm; it answered ${JSON.stringify(answer)}`)
  return answer
}

/** THE MEMBER SET OF A PRODUCT, read at run time — own members plus those its prototype chain
 *  carries, stopping before `Object.prototype` (`SUR-5`'s idiom, kept because `SC-5` is what makes the
 *  contract cast above honest). */
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

describe('settings-carrier-retirement · the settings surface at unit grain (E-3)', () => {
  it('SC-1 · `state()` DELEGATES: it answers exactly what the instance’s `readAppState()` answers over the same profile, all four members, copying and composing nothing (signatures.md §4; design.md §3)', () => {
    const profileDir = dir()
    const settings = surface(profileDir)
    expect(settings.state(), 'the surface maps nothing: the instance’s four members cross unchanged, and the surface’s own instance answers the same values over the same directory (design.md §3)').toEqual(instanceAnswer(profileDir))
    expect(Object.keys(settings.state()).sort(), 'and the answer is the four declared members, not a fifth the surface invents').toEqual(['legacy', 'rows', 'storage', 'unrepresentable'])

    committed(settings.commit([{ name: 'file.tabs.order', value: ['a', 'b'] }]))
    expect(settings.state().rows, 'after a commit the rows are the committed ones, delegated — the surface holds no copy of its own (design.md §3)').toEqual([{ name: 'file.tabs.order', value: ['a', 'b'] }])
    expect(settings.read().token, 'and the landed four verbs are unmoved beside the two new ones (signatures.md §4)').toBeNull()
  })

  it('SC-2 · `commit()`’s committed arm is EXACTLY `{status:\'committed\'}` — one key, no `cursor`, no `opId` — because the channel it serves answers that and `preload.ts` is byte-identical (interface.md §3 ASM-L2-4; design.md §3)', () => {
    const settings = surface(dir())
    const answer = committed(settings.commit([{ name: 'file.layout.dock', value: 'left' }]))

    expect(Object.keys(answer), 'the committed arm carries exactly one member, and it is `status`').toEqual(['status'])
    expect(Object.keys(answer).length, 'so a dropped ordinal is asserted twice over: length one (interface.md §3 ASM-L2-4)').toBe(1)
    expect(answer.status).toBe('committed')
    expect(Object.prototype.hasOwnProperty.call(answer, 'cursor'), 'no `cursor` rides the bridge answer').toBe(false)
    expect(Object.prototype.hasOwnProperty.call(answer, 'opId'), 'and no `opId`').toBe(false)
    expect(settings.state().rows, 'while the commit really landed: the rows moved and the answer says nothing else').toEqual([{ name: 'file.layout.dock', value: 'left' }])
  })

  it('SC-3 · `commit()`’s refused arm carries the STORE’S `reason`, `message` and `address` verbatim — the same three members the instance’s own `writeAppState` answers for the same act (interface.md §3, §6; design.md §3)', () => {
    const profileDir = dir()
    const settings = surface(profileDir)
    committed(settings.commit([{ name: 'file.tabs.order', value: ['a'] }]))

    // `null` is the one member JSON can spell and the store cannot (guide §10.1/§10.2), so this drive
    // reaches the STORE's refusal rather than the module's argument-shape refusal.
    const answer = refused(settings.commit([{ name: 'file.bad', value: { nested: null } }]))
    expect(answer.reason, 'the store’s own status verbatim — never this module’s or the channel’s vocabulary (interface.md §3, §6)').toBe('ValueRefusedAtBoundary')
    expect(answer.reason === 'malformed-payload', '`malformed-payload` is the CHANNEL’s pre-write refusal and never enters this module (interface.md §3, §6)').toBe(false)
    expect(answer.reason === 'write-failed', 'and the retired closed pair’s second spelling has no successor here either (L1 §3 ASM-2)').toBe(false)
    expect(answer.message.length, 'the store’s own sentence rides it, never an empty one').toBeGreaterThan(0)
    expect(Object.prototype.hasOwnProperty.call(answer, 'address'), 'and the fourth member is present on the refused arm').toBe(true)
    const address = answer.address
    expect(address === null || (Array.isArray(address) && address.join('/') === 'operator-app-state'), 'the address is either the store’s `null` or the third address the act was aimed at — nothing the surface names itself').toBe(true)

    // THE VERBATIM HALF, read off the instance’s own verb over a construction of the same profile: the
    // same act answers the same reason and the same address, so the surface re-spells nothing
    // (design.md §3; interface.md §3).
    const direct = (createOperatorSettings({ userDataDir: profileDir }) as unknown as {
      writeAppState(rows: readonly SettingsAppStateRow[]): { status: string; reason?: unknown; message?: unknown; address?: unknown }
    }).writeAppState([{ name: 'file.bad', value: { nested: null } }])
    expect(direct.status, 'the instance refuses the same act').toBe('refused')
    expect(answer.reason, 'and the surface carries that same status').toBe(direct.reason)
    expect(JSON.stringify(answer.address), 'with the same address').toBe(JSON.stringify(direct.address))

    expect(settings.state().rows, 'and a refusal leaves the record exactly as it stood (interface.md §6)').toEqual([{ name: 'file.tabs.order', value: ['a'] }])
  })

  it('SC-4 · the module is a DELEGATE, read off its source AS A SOURCE: no new private name at module scope, no `ipcMain` site, no channel, and none of the three forbidden imports (signatures.md §5, §7; design.md §3, §5)', () => {
    const source = readFileSync(new URL(SURFACE_SOURCE, REPO), 'utf8')

    // THE MODULE-SCOPE RUNTIME NAMES: the landed private pair and the factory, and NOTHING else.
    // `state` and `commit` are locals of `createSettingsSurface` (signatures.md §5), so a new
    // module-scope declaration here is the invention this row exists to fail.
    const declared = [...source.matchAll(/^(?:export\s+)?(?:async\s+)?(?:function|const|let|var)\s+([A-Za-z_$][\w$]*)/gm)].map((match) => match[1]).sort()
    expect(declared, 'module scope declares exactly the landed private pair and the factory: this unit adds no new private name (signatures.md §5)').toEqual(['TIER4_CLOSED_REFUSAL', 'createSettingsSurface', 'patchOf'])

    // NO CHANNEL AND NO `ipcMain` SITE (D-18; design.md §3, §5).
    expect(source.includes('ipcMain'), 'no `ipcMain` site stands in this module: the three handlers stay in `main.ts` (D-18; L1 §9 E-3)').toBe(false)
    expect(source.includes('ipcRenderer'), 'and no bridge edge either').toBe(false)
    expect(/['"]provident:/.test(source), 'and no channel name is spelled here: the module registers nothing (D-18)').toBe(false)
    expect(source.includes('store-channels'), 'nor does it reach the channel-name file').toBe(false)

    // THE THREE FORBIDDEN IMPORTS (design.md §5): `node:fs`, `electron` and the package itself.
    for (const forbidden of ["'node:fs'", "'node:fs/promises'", "'electron'", "'provident-storeroom'"]) {
      expect(source.includes(forbidden), `\`settings-surface\` imports no ${forbidden} (design.md §5; signatures.md §4)`).toBe(false)
    }
    expect(source.includes('readFileSync'), 'and it reads no file at all: the only file reader is the instance module (design.md §5)').toBe(false)
  })

  it('SC-5 · the declared member sets, read at RUN TIME off the real objects: the surface’s seven and the instance’s six — this row is what keeps the contract cast honest (signatures.md §4, §2)', () => {
    const profileDir = dir()
    const settings = surface(profileDir)
    // ⟶ **THE SURFACE'S SET MOVES `6 → 7` AT `D-123`**: the pane's open state's one verb, declared in the same member
    // block as the other six — still a set claim over the real object, one member wider.
    expect(membersOf(settings), 'the surface’s own members are EXACTLY the seven signatures.md §4 declares, `pane` included since `D-123`, and no eighth').toEqual(['attach', 'commit', 'pane', 'read', 'set', 'state', 'transition'])

    const settingsInstance = createOperatorSettings({ userDataDir: profileDir }) as unknown as object
    expect(membersOf(settingsInstance), 'and the instance it delegates to is exactly the six its own signatures declare (`writePane` the sixth, `D-123`), so `state()`/`commit()`/`pane()` cannot be standing on a private extra').toEqual(['read', 'readAppState', 'subscribe', 'write', 'writeAppState', 'writePane'])
  })

  it('SC-6 · neither verb validates a name or a value and neither throws: a hostile argument reaches the instance’s own refusal unchanged, and `state()` is unmoved (interface.md §3, §6 ASM-L2-5; design.md §3)', () => {
    const settings = surface(dir())
    committed(settings.commit([{ name: 'file.tabs.order', value: ['a'] }]))

    const hostile: Array<{ why: string; rows: unknown }> = [
      { why: '`null`', rows: null },
      { why: '`undefined`', rows: undefined },
      { why: 'a primitive', rows: 7 },
      { why: 'a Proxy over an array whose `get` and `ownKeys` traps throw', rows: new Proxy([{ name: 'file.x', value: 1 }], { get() { throw new Error('hostile-get') }, ownKeys() { throw new Error('hostile-ownKeys') } }) },
      { why: 'a duplicate `name`', rows: [{ name: 'file.tabs.order', value: ['a'] }, { name: 'file.tabs.order', value: ['b'] }] },
      { why: 'a `name` that is not a non-empty string', rows: [{ name: '', value: 'x' }] },
      { why: 'a row that is not an object', rows: ['file.tabs.order'] },
    ]
    for (const drive of hostile) {
      // HELD ON A PROPERTY FOR THE COMPILER'S SAKE: the assignment happens inside the `expect`
      // callback, so a narrowed local would read as `undefined` and hide a missing answer.
      const holder: { answered?: SettingsCommitAnswer } = {}
      expect(() => { holder.answered = settings.commit(drive.rows as readonly SettingsAppStateRow[]) }, `the verb answers rather than throwing: ${drive.why} (design.md §3)`).not.toThrow()
      const answered = holder.answered
      if (answered === undefined) throw new Error(`the verb answered nothing at all: ${drive.why}`)
      const receipt = refused(answered)
      expect(receipt.reason, `and the refusal is the INSTANCE's own spelling, carried through: the surface mints no 'malformed-payload' of its own (interface.md §3, §6 ASM-L2-5): ${drive.why}`).toBe('ValueRefusedAtBoundary')
      expect(receipt.reason === 'malformed-payload', `the channel’s pre-write word never appears here: ${drive.why}`).toBe(false)
    }

    expect(settings.state().rows, 'and no hostile argument moved the record, because none of them reached the store').toEqual([{ name: 'file.tabs.order', value: ['a'] }])
    expect(settings.state(), 'and `state()` still answers the four declared members afterwards').toEqual({ rows: [{ name: 'file.tabs.order', value: ['a'] }], legacy: 'absent', unrepresentable: [], storage: 'standing' })
  })
})
