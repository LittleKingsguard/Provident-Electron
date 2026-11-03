// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/integration/settings-carrier-retirement/retirement.test.ts — THE L2 BATTERY for
// `settings-carrier-retirement`, part 4: THE RETIREMENT'S ABSENCES, THE WRITTEN-NAME CENSUS AND `ISO-7`.
//
// THE CONTRACT: docs/L2/settings-carrier-retirement/behaviour.md §8 (`RET-1`…`RET-5`, `ISO-7`, and the
// two limit notes its own cells carry) and §6 (the parity row's sha256 limb); persistence.md §1 (the
// written names, three → two, with the retired names allowed as SEEDS only), §4 (the retired carrier is
// read at most once and writes no byte), §5 (what a `file`-tier commit guarantees) and §8's last
// bullet (the `RET-2` re-grain, which is L1 §8 `S-1`'s superseded sentence); interface.md §5 (the
// module surface's re-pointed writes), §6 (a refusal's vocabulary) and §2 (`ASM-L2-1`); L1
// `settings-carrier-retirement.md` §3 (the retirement's exact surface), §6 (the census move), §7
// (`ISO-7`) and §8 `S-1`/`S-10`/`S-12`.
//
// THIS FILE STANDS RED UNTIL THE IMPLEMENTATION EXISTS (`examiner.md` §3, D-1). Two of its rows are red
// for the retirement itself — `src/main/main.ts` still holds the whole carrier at this head — and
// `ISO-7` is red on `commit`, which the surface does not carry yet. No row is skipped, softened or
// conditionally disabled.
//
// WHAT EACH KIND OF ROW MAY READ, AND WHY. An absence with a live answer is driven live; only what has
// NO live answer is read as bytes, and then the row says so in its own message (`examiner.md` §2;
// behaviour.md §8's second note: "a path composed at run time is invisible to a byte scan; what the row
// can see is that no literal and no write verb stands where the carrier stood"). `main.ts` imports
// `electron` at module scope, so its module surface cannot be constructed in a node test — `ISO-7`
// states that limit rather than passing over the half it cannot reach.
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { afterEach, describe, expect, it } from 'vitest'

import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { SecurityGate, type ToolGroup } from '../../../src/main/security.js'
import { createSettingsSurface, type SettingsGateSink, type SettingsReadAnswer, type SettingsSetAnswer, type SettingsTransitionAnswer } from '../../../src/main/settings-surface'
import * as storeChannels from '../../../src/main/store-channels.js'
import * as sharedTypes from '../../../src/shared/types.js'

/** `interface.md` §3's two additions, transcribed, so the row can cast the real product to the
 *  contract it will carry. `SUR-5` keeps this cast honest against the live member set. */
interface SettingsAppStateRow { name: string; value: unknown }
type SettingsAppStateAnswer = { rows: SettingsAppStateRow[]; legacy: 'absent' | 'imported' | 'corrupt' | 'recorded'; unrepresentable: string[]; storage: 'standing' | 'unreachable' }
type SettingsCommitAnswer = { status: 'committed' } | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }
interface SettingsSurfaceWithAppState {
  read(): SettingsReadAnswer
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SettingsSetAnswer
  transition(state: unknown): SettingsTransitionAnswer
  attach(sink: SettingsGateSink): void
  state(): SettingsAppStateAnswer
  commit(rows: readonly SettingsAppStateRow[]): SettingsCommitAnswer
}

/** The retired carrier's name — a literal here ON PURPOSE: a row that imported it from the module
 *  could not count or assert its occurrences (`RET-1`, `RET-2`). */
const RETIRED_CARRIER = 'provident-settings.json'
const OPERATOR_FILE = 'provident-operator-settings.json'

/** `persistence.md` §1's table: TWO WRITTEN names after this unit, beside the two RETIRED names that
 *  may stand in a profile as seeds — read at most once, their bytes left exactly as seeded. */
const WRITTEN_NAMES = ['provident-operator-settings.json', 'provident-profile.json'] as const
const SEED_NAMES = ['provident-settings.json', 'provident-security.json'] as const

/** The addresses, the exclusion pair and the retired record's format marker: none of them may be
 *  reachable from a module tool, an `RpcMethod` member or a bridge route (L1 §7 `ISO-7`; D-18). */
const FORBIDDEN_IN_NAMES = ['operator-settings', 'operator-app-state', 'operator-exclusion'] as const

/** What "an address-shaped argument" means for this row: a member that would carry a store address
 *  rather than a name, a value or a module id (L1 §7; D-18). */
const ADDRESS_SHAPED = ['address', 'addresses', 'tier', 'storePath', 'operatorAddress'] as const

const SRC_DIR = fileURLToPath(new URL('../../../src', import.meta.url))
const REPO = new URL('../../../', import.meta.url)

const sourceOf = (relative: string): string => readFileSync(new URL(relative, REPO), 'utf8')

/** **`src/main/main.ts` WITH ITS `//` LINES ELIDED (2026-11-02, `D-81`).** `RET-1` asserts that the
 *  deleted Q-5 arm's verbs and its file NAME are absent from the composition, and the composition
 *  carries a comment where the arm stood that must name them in order to explain the absence. A bare
 *  `includes` cannot tell prose from a reader — and reading the raw file would keep the row green on
 *  the comment alone, the hollow-green class `G4-P2` named. Same idiom as `tests/store-persist.test.ts`'s
 *  `rendererCommentElided`/`mainCommentElided` (`:935`) and `store-security.test.ts`'s `awaitMainCode`. */
const MAIN_CODE = sourceOf('src/main/main.ts')
  .split('\n')
  .filter((line) => !line.trimStart().startsWith('//'))
  .join('\n')
const textOf = (absolute: string): string => readFileSync(absolute, 'utf8')

/** **COMMENT LINES ELIDED** — the absences below read CODE, never prose. The purge's headstones NAME the deleted channel
 *  literals where the handlers stood (`D-46`'s annotate-beside discipline), so a raw-bytes scan would read its own
 *  description as its own hit. */
function commentElided(bytes: string): string {
  return bytes
    .split('\n')
    .map((line) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return ''
      const at = line.indexOf('//')
      return at >= 0 ? line.slice(0, at) : line
    })
    .join('\n')
}
const rel = (absolute: string): string => absolute.slice(SRC_DIR.length + 1).split('\\').join('/')

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const at = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(at))
    else if (entry.name.endsWith('.ts')) out.push(at)
  }
  return out
}

const ALL_SRC = walk(SRC_DIR)
const countIn = (text: string, needle: string): number => text.split(needle).length - 1

const scratch: string[] = []
afterEach(() => {
  while (scratch.length > 0) rmSync(scratch.pop() as string, { recursive: true, force: true })
})
const profile = (): string => {
  const dir = mkdtempSync(join(tmpdir(), 'settings-carrier-retirement-'))
  scratch.push(dir)
  return dir
}

function committed(answer: SettingsCommitAnswer): { status: 'committed' } {
  if (answer.status !== 'committed') throw new Error(`the row needs the committed arm; it answered ${JSON.stringify(answer)}`)
  return answer
}

/** The live tool surface, with each tool's declared argument names as the SDK answers them. A live
 *  answer exists for "what does this tool take?", so the row reads it live rather than off the source
 *  (`examiner.md` §2). */
const backend: McpBackend = { invoke: async () => ({}) }

async function liveTools(): Promise<Array<{ name: string; properties: string[] }>> {
  const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch', 'graph', 'code', 'module', 'data'] as ToolGroup[] })
  const server = new ProvidentMcpServer({ backend, gate, transport: 'stdio' })
  const mcp = server.ensureServerRegistered()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await mcp.connect(serverTransport)
  const client = new Client({ name: 'settings-carrier-retirement', version: '0.0.0' })
  await client.connect(clientTransport)
  try {
    const listed = await client.listTools()
    return listed.tools.map((tool) => ({
      name: tool.name,
      properties: Object.keys((tool.inputSchema as { properties?: Record<string, unknown> }).properties ?? {}).sort(),
    }))
  } finally {
    await client.close()
  }
}

/** The `RpcMethod` union's members, read from `src/shared/types.ts` AS A DECLARATION — the union is a
 *  type and erases at build, so no runtime value carries it. The row says so where it reads it
 *  (`ISO-3`'s precedent in the sibling battery). */
function rpcMembers(): string[] {
  const types = sourceOf('src/shared/types.ts')
  const block = /export type RpcMethod =([\s\S]*?)\n\n/.exec(types)
  if (block === null) throw new Error('src/shared/types.ts no longer declares the `RpcMethod` union')
  return [...block[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
}

/** Every channel the bridge reaches, by the CONSTANT it names and by that constant's VALUE. */
function bridgeRoutes(): Array<{ member: string; channel: string }> {
  const preload = sourceOf('src/main/preload.ts')
  const vocabulary: Record<string, unknown> = { ...(sharedTypes as unknown as Record<string, unknown>), ...(storeChannels as unknown as Record<string, unknown>) }
  const out: Array<{ member: string; channel: string }> = []
  for (const match of preload.matchAll(/ipcRenderer\.(?:invoke|send|on)\(\s*([A-Za-z_$][\w$]*)/g)) {
    const member = match[1]
    const value = vocabulary[member]
    out.push({ member, channel: typeof value === 'string' ? value : member })
  }
  return out
}

describe('settings-carrier-retirement · the retirement’s absences, the census and ISO-7', () => {
  it('RET-1 · no write verb stands where the carrier stood: `src/main/main.ts` holds none of the retired names, no format marker and no `fs` write call, and no file in `src/**` names the carrier’s path or its writer (L1 §3/§8 S-1; behaviour.md §8)', () => {
    const main = sourceOf('src/main/main.ts')

    // THE CARRIER'S OWN NAMES — the path, the writer, the boot read and the third holder it kept
    // (L1 §3's removal table, site by site).
    for (const retired of ['settingsPath', 'commitSettingsWrite', 'readSettingsRecord', 'bootRecord', 'settingsCorrupt']) {
      expect(main.includes(retired), `\`${retired}\` is the retired carrier's own spelling and no longer stands in src/main/main.ts (L1 §3)`).toBe(false)
      const elsewhere = ALL_SRC.filter((file) => rel(file) !== 'main/main.ts' && textOf(file).includes(retired))
      expect(elsewhere.map(rel), `and no other file in src/** carries it either (behaviour.md §8 RET-1): ${retired}`).toEqual([])
    }

    // THE FORMAT MARKER — the retired record's `schemaVersion` stamp is not operator state and the
    // instance's shape carries none (L1 §3/§4; D-13).
    expect(main.includes('schemaVersion'), 'the retired record’s `schemaVersion` stamp retires with its record, and no member of this unit composes one (L1 §3; D-13)').toBe(false)

    // THE SIX FS VERBS the stage-and-rename writer used. **⟶ `rmSync` IS NOW ABSENT TOO (2026-11-02,
    // `D-81`)**: this limb read `expect(main.includes('rmSync')).toBe(true)` — the Q-5 legacy-registry
    // removal — and the arm it belonged to is DELETED (the registry's legacy file is dropped, not
    // migrated; the user's ruling), so `main.ts` holds no `node:fs` name at all. **AND THE LIMB IS READ
    // OFF THE CODE, NOT THE PROSE**: the composition carries a comment where the arm stood that names
    // `rmSync`, so a bare `includes` would have kept this row green on the comment alone — the
    // hollow-green class `G4-P2` named. `MAIN_CODE` elides the comment lines; the record's reader took
    // `readFileSync` AND `existsSync` with it (L1 §3 `:7`), and the Q-5 probe with them.
    for (const verb of ['writeFileSync', 'renameSync', 'fsyncSync', 'openSync', 'closeSync', 'mkdirSync', 'rmSync']) {
      expect(MAIN_CODE.includes(verb), `\`${verb}\` was the retired writer's or the deleted Q-5 removal's machinery and has no successor in src/main/main.ts (L1 §3; persistence.md §5; D-81)`).toBe(false)
    }
    expect(/readFileSync\s*\(/.test(main), 'the carrier\'s own reader goes with the writer, and main.ts reads no file of its own (L1 §3 `:7`; persistence.md §5)').toBe(false)
    expect(main.includes('existsSync'), 'and the legacy registry\'s existence probe retires with it — and so does the registry itself: its store, its read and its removal are DELETED (D-81), so no probe could discriminate anything (L3 design.md §4, §6 ASM-6)').toBe(false)
    expect(MAIN_CODE.includes('provident-modules.json'), 'and the name is not read, not written and not removed: an existing `provident-modules.json` is left on disk UNREAD (D-81)').toBe(false)

    // THE LIMIT, STATED: a path assembled at run time from pieces never appears as a literal, so a byte
    // scan cannot see one. What this row CAN see — and what it asserts — is that no literal spelling of
    // the carrier and no write verb stands where the carrier stood (behaviour.md §8's second note;
    // sibling behaviour.md §9 `ISO-6`).
    expect(countIn(main, RETIRED_CARRIER), 'no spelling of the retired carrier stands in src/main/main.ts, so nothing here can compose its path — and a path assembled at RUN TIME is invisible to a byte scan, which this row names rather than pretends otherwise (behaviour.md §8)').toBe(0)
  })

  it('RET-2 · the retired name is spelled EXACTLY ONCE in `src/**`, in `src/main/operator-settings/index.ts` — the re-grain L1 §8 S-1 owes, because “no literal in src/**” is impossible beside L1 §4’s own import arm (behaviour.md §8 RET-2; persistence.md §8’s last bullet)', () => {
    const occurrences: Array<{ file: string; count: number }> = []
    for (const file of ALL_SRC) {
      const count = countIn(textOf(file), RETIRED_CARRIER)
      if (count > 0) occurrences.push({ file: rel(file), count })
    }
    const total = occurrences.reduce((sum, entry) => sum + entry.count, 0)
    // THE RE-GRAIN IS THE ROW: L1 §8 `S-1` reads "no `provident-settings.json` literal in `src/**`",
    // and that sentence is impossible to satisfy beside L1 §4's second import arm and E-2, which require
    // that exact literal in the instance module — the arm must name the file it reads. persistence.md
    // §8's last bullet records the contradiction as owed to L1, and this row is the re-grain it drives:
    // ONE occurrence, in the instance module, read by one `readFileSync` and written by none.
    expect(total, `the retired name is spelled ONCE in src/** — this row is the re-grain of L1 §8 S-1, whose “no literal in src/**” is unsatisfiable beside L1 §4’s own import arm (persistence.md §8); occurrences found: ${JSON.stringify(occurrences)}`).toBe(1)
    expect(occurrences, 'and that one occurrence stands in the instance module, which is the file that reads the retired record (L1 §4; E-2)').toEqual([{ file: 'main/operator-settings/index.ts', count: 1 }])
  })

  it('RET-3 · the instance module’s `readFileSync` CALL SITES number exactly two — the security record’s and this one — and it holds no write, rename or remove call (L1 §6; D-19; persistence.md §4)', () => {
    const instance = sourceOf('src/main/operator-settings/index.ts')
    // CALL SITES, NOT THE IMPORT BINDING: the `import { readFileSync } from 'node:fs'` line names the
    // function without calling it, so a bare occurrence count would read three for two reads.
    const calls = [...instance.matchAll(/readFileSync\s*\(/g)].length
    expect(calls, 'exactly two import-once reads: the retired security record’s and the retired carrier’s — the count tests/store-security.test.ts:549 pinned at one becomes two (L1 §6; persistence.md §4)').toBe(2)
    for (const verb of ['writeFileSync', 'renameSync', 'rmSync', 'unlinkSync', 'appendFileSync']) {
      expect(instance.includes(verb), `the instance writes no file of its own: \`${verb}\` must not stand in this module (D-19; persistence.md §5)`).toBe(false)
    }
  })

  it('RET-4 · the two channel names keep their spellings BY CONSTANT VALUE and nothing re-spells them: both handlers are registered where they were and both `invoke` sites stand where they stood (L1 §2; D-18; interface.md §0)', () => {
    // BY VALUE, off the module that owns the names — never by a local literal, which could drift in
    // lockstep with a rename and still pass.
    /* ⟶ **RET-4 IS RE-GRAINED `3 -> 1` AND ITS SUBJECT IS WHAT STANDS (2026-11-03, `D-93`).** The row asserted the
     * `store-channels.ts` constant set was the THREE landed names (`STORE_FILE_GET` · `STORE_FILE_PUT` ·
     * `IPC_SECURITY_EXCLUSION`), that each of the first two kept its spelling BY VALUE, and that BOTH of their handler /
     * `invoke` sites stood where they stood. **THE PURGE DELETED THE FIRST TWO CONSTANTS AND ALL FOUR OF THEIR SITES**
     * (the two `ipcMain.handle` registrations and the two `ipcRenderer.invoke` calls), together with the three preload
     * `store` members and the `provident:store:file:changed` local, because the renderer's `file.*` projection they
     * carried is what `D-78` purges (`D-90`'s clause (3) measured exactly this set). **THE ROW IS NOT WEAKENED, IT IS
     * RE-AIMED AT WHAT THIS UNIT'S OWN CONTRACT IS ABOUT**: the exclusion channel's constant, BY VALUE, and the one
     * remaining handler/`invoke` pair, which is `IPC_SECURITY_EXCLUSION`'s. The F-8 single-source rule is unchanged and
     * still bites. */
    expect(Object.keys(storeChannels).sort(), 'the channel-name file carries the ONE landed constant and mints no second (store-channels.ts\'s own census, `D-93`: the frozen store\'s two names were deleted with its projection)').toEqual(['IPC_SECURITY_EXCLUSION'])
    expect(storeChannels.IPC_SECURITY_EXCLUSION, 'the exclusion channel keeps its spelling BY VALUE').toBe('provident:security:exclusion')
    expect(Object.values(storeChannels), 'and the two purged names are GONE from the module, not merely unreferenced').not.toContain('provident:store:file:get')
    expect(Object.values(storeChannels), 'and so is the second one').not.toContain('provident:store:file:put')

    const main = sourceOf('src/main/main.ts')
    expect(/ipcMain\.handle\(\s*IPC_SECURITY_EXCLUSION\b/.test(main), 'the exclusion handler is registered in src/main/main.ts at the site it stood at (L1 §3)').toBe(true)
    // THE CONTROL: the purged pair's two registrations are gone, so the detector above is reading a real site and not
    // simply matching anything that mentions the channel file.
    expect(/ipcMain\.handle\(\s*STORE_FILE_GET\b/.test(main), 'the purged Y-1 handler is NOT registered any more (`D-93`), and this is the row\'s control that the detector above reads a site').toBe(false)
    expect(/ipcMain\.handle\(\s*STORE_FILE_PUT\b/.test(main), 'and neither is Y-2\'s').toBe(false)

    const preload = sourceOf('src/main/preload.ts')
    expect(/ipcRenderer\.invoke\(\s*IPC_SECURITY_EXCLUSION\b/.test(preload), 'and its `invoke` site stands in src/main/preload.ts (L1 §9)').toBe(true)
    expect(/ipcRenderer\.invoke\(\s*STORE_FILE_(?:GET|PUT)\b/.test(preload), 'the purged pair\'s `invoke` sites are gone with the `store` member').toBe(false)

    // THE F-8 RULE: the name comes from the one file, so a literal re-spelling anywhere else in `src/**` is a finding.
    {
      const spelling = storeChannels.IPC_SECURITY_EXCLUSION
      const reSpelled = ALL_SRC.filter((file) => rel(file) !== 'main/store-channels.ts' && textOf(file).includes(spelling))
      expect(reSpelled.map(rel), `no file re-spells the channel name as a literal: ${spelling}`).toEqual([])
    }
    // AND THE TWO PURGED SPELLINGS ARE RE-SPELLED NOWHERE EITHER — they are gone from the tree, comments included, so
    // the F-8 rule's subject set shrank with the constants rather than leaving two names loose.
    for (const purged of ['provident:store:file:get', 'provident:store:file:put', 'provident:store:file:changed']) {
      expect(ALL_SRC.filter((file) => commentElided(textOf(file)).includes(purged)).map(rel),
        `the purged channel literal appears in the CODE of no src/** file at all (the headstones that name it are comments, and this row reads code): ${purged}`).toEqual([])
    }
  })

  it('RET-5 · the written-name census over a profile this battery settled: every `.json` name is inside the declared set, and that set carries exactly TWO WRITTEN names with the two retired names standing only as seeds (persistence.md §1; L1 §6; D-13)', () => {
    // THE DECLARED SET, AS DATA — two written names, three → two (L1 §6's census move).
    expect(WRITTEN_NAMES.length, 'exactly two names are WRITTEN at steady state after this unit').toBe(2)
    expect([...WRITTEN_NAMES].sort(), 'and they are the instance’s and the profile store’s, and no third').toEqual([OPERATOR_FILE, 'provident-profile.json'])
    expect([...SEED_NAMES].sort(), 'the retired names may stand as SEEDS and are not written (persistence.md §1)').toEqual(['provident-security.json', RETIRED_CARRIER])

    // A PROFILE THIS ROW SETTLES: both retired names seeded, then one settings write and one app-state
    // commit through the real surface — the acts that actually put bytes on the disk.
    const dir = profile()
    writeFileSync(join(dir, RETIRED_CARRIER), '{"schemaVersion":"1","file.tabs.order":["a","b"]}')
    writeFileSync(join(dir, 'provident-security.json'), JSON.stringify({ token: 'seeded', enabled: ['read'] }))
    const seededBytes = new Map(SEED_NAMES.map((name) => [name, readFileSync(join(dir, name), 'utf8')] as const))

    const settings = createSettingsSurface({ userDataDir: dir }) as unknown as SettingsSurfaceWithAppState
    settings.set({ token: 'census' })
    committed(settings.commit([{ name: 'file.tabs.order', value: ['c'] }]))

    const present = readdirSync(dir).filter((name) => name.endsWith('.json')).sort()
    const declared: string[] = [...WRITTEN_NAMES, ...SEED_NAMES].sort()
    expect(present.filter((name) => !declared.includes(name)), 'no third name appears in a settled profile: this unit adds no written name of its own and no second file (persistence.md §2)').toEqual([])
    expect(present.includes(OPERATOR_FILE), 'the instance’s own file is written').toBe(true)
    expect(present.filter((name) => !(SEED_NAMES as readonly string[]).includes(name)), 'the names this profile actually WROTE are a subset of the two declared written names').toEqual([OPERATOR_FILE])

    // THE SEEDS ARE SEEDS: read at most once, their bytes left exactly as seeded — no delete, rename or
    // repair (L1 §4; D-19; persistence.md §1).
    for (const name of SEED_NAMES) {
      expect(readFileSync(join(dir, name), 'utf8'), `a seeded retired name’s bytes stand exactly as seeded: ${name}`).toBe(seededBytes.get(name))
    }
    expect(settings.state().rows, 'and the commit landed in the instance’s file, not in a retired one').toEqual([{ name: 'file.tabs.order', value: ['c'] }])
  })

  it('ISO-7 · a whole-map commit carrying `file.modules.<id>` moves the app-state record ALONE, and no module tool, `RpcMethod` member or bridge route names either operator address or takes an address-shaped argument (L1 §7; interface.md §5; behaviour.md §8)', async () => {
    // ═══ LIMB ONE — LIVE, through the surface the composition site holds ═══
    // THE LIMIT, STATED IN THIS ROW'S OWN WORDS: `src/main/main.ts` imports `electron` at module scope,
    // so its `moduleSurface` cannot be constructed in a node test and the three module members
    // (`put`/`remove`/`setDisabled`) are not driven here. What this row drives is the ONE ACT those
    // members issue — `interface.md` §5: "one `settingsSurface.commit(rows)` of the newly composed whole
    // map" — with a `file.modules.<id>` row composed the way `main.ts` composes it. The members
    // themselves are driven by L1's e2e `S-12` on a booted app, and `RET-1`'s source scan here covers
    // the absence of the carrier behind them. The limit is stated, never passed over silently
    // (examiner.md §2; behaviour.md §8).
    const dir = profile()
    const settings = createSettingsSurface({ userDataDir: dir }) as unknown as SettingsSurfaceWithAppState
    settings.set({ token: 'iso-7-token' })
    expect(settings.transition('mcp-disabled').applied, 'the pair really moved, so the row below discriminates against a `file`-tier write clearing it').toBe(true)
    const before = settings.read()
    const beforeRows = settings.state().rows
    const beforeBytes = readFileSync(join(dir, OPERATOR_FILE))

    const source = 'module-source'
    const record = { name: 'm1', version: '1.0.0', source, hash: createHash('sha256').update(source, 'utf8').digest('hex'), installedAt: '2026-10-29T00:00:00.000Z', disabled: false }
    committed(settings.commit([...beforeRows, { name: 'file.modules.m1', value: record }]))

    expect(settings.read(), 'the security record at `[‘operator-settings’]` is DEEP-EQUAL to the pre-commit reading: no member of it moved (L1 §7; persistence.md §6)').toEqual(before)
    expect(settings.read().exclusion, 'the exclusion pair is unmoved at the address the commit never touched (D-17; persistence.md §6)').toBe('mcp-disabled')
    expect(settings.state().rows, 'and the app-state record is the one that MOVED (L1 §7)').toEqual([{ name: 'file.modules.m1', value: record }])
    const bytesMoved = !readFileSync(join(dir, OPERATOR_FILE)).equals(beforeBytes)
    expect(bytesMoved, 'and the commit really landed on the disk: the instance file’s bytes moved, which is the positive control that the app-state record is the record that moved (L1 §7, L1 §3 ASM-1)').toBe(true)

    // ═══ LIMB TWO — THE NAMES, READ AS DATA ═══
    const tools = await liveTools()
    const moduleTools = ProvidentMcpServer.ALL_TOOLS.filter((name) => name.includes('module'))
    expect(moduleTools.length, 'the module tool set is non-empty, so the limb below reads a real set').toBeGreaterThan(0)
    for (const name of moduleTools) {
      for (const forbidden of FORBIDDEN_IN_NAMES) {
        expect(name.includes(forbidden), `no module tool name reaches an operator address: ${name} / ${forbidden}`).toBe(false)
      }
      const live = tools.find((tool) => tool.name === name)
      expect(live, `the live server registers the module tool this row reads: ${name}`).toBeDefined()
      for (const property of live?.properties ?? []) {
        expect((ADDRESS_SHAPED as readonly string[]).includes(property), `and it takes no address-shaped argument: ${name} declares \`${property}\``).toBe(false)
      }
    }

    const members = rpcMembers()
    expect(members.length, 'the `RpcMethod` union is read as a DECLARATION (it is a type and erases at build), and it is the 27 members the tree answers').toBe(27)
    for (const member of members) {
      for (const forbidden of FORBIDDEN_IN_NAMES) {
        expect(member.includes(forbidden), `no RpcMethod member reaches an operator address: ${member} / ${forbidden}`).toBe(false)
      }
    }
    // NO `RpcMethod` MEMBER DECLARES AN ARGUMENT AT ALL: every request carries `payload: unknown`,
    // so no member can name an address in its declaration (`src/shared/types.ts`).
    expect(/export interface RpcRequest \{[\s\S]*?payload: unknown[\s\S]*?\n\}/.test(sourceOf('src/shared/types.ts')), 'an `RpcRequest` carries `payload: unknown`, so no member’s declaration names an address (a declaration read, stated as one)').toBe(true)

    const routes = bridgeRoutes()
    expect(routes.length, 'the bridge reaches a non-empty set of channels').toBeGreaterThan(0)
    for (const route of routes) {
      for (const spelling of [route.member, route.channel]) {
        for (const forbidden of FORBIDDEN_IN_NAMES) {
          expect(spelling.includes(forbidden), `no bridge route reaches an operator address: ${spelling} / ${forbidden}`).toBe(false)
        }
      }
    }
    // AND NO BRIDGE MEMBER DECLARES ONE EITHER: the `module` and `store` members are the two the module
    // surface and the carrier are reachable through, and neither names an address-shaped argument.
    /* ⟶ **THE `store` MEMBER IS DELETED AND THE CENSUS MOVES ONTO WHAT STANDS (2026-11-03, `D-93`).** The row read the
     * `module` and `store` members of the preload bridge and asserted neither takes an address-shaped argument. The `store`
     * namespace is gone (its three members served the renderer's frozen graph store and the projection `D-78` purges), so
     * the census reads the FOUR members that can now reach a record — `module` · `tabs` · `view` · `security` — and it is
     * still a set assertion with the same falsifier: a member carrying an `address`/`path`-shaped argument reddens. **THE
     * ABSENCE OF `store` IS ITSELF ASSERTED**, so a re-introduction reddens rather than quietly widening the census. */
    const preload = sourceOf('src/main/preload.ts')
    expect(new RegExp('^ {2}store: \\{', 'm').test(preload), 'src/main/preload.ts declares NO `store` member any more (D-93)').toBe(false)
    /* **THE DETECTOR NOW READS ARGUMENT LISTS, AND THAT IS A CORRECTION RATHER THAN A RELAXATION.** The as-filed form
     *  scanned the member's WHOLE block for `<shape>:` anywhere, which was sound while the two members it read (`module`,
     *  `store`) had no refusal RECORD in their return types. The members that stand now — `tabs` and `view` — answer the
     *  crossing's own `{status, reason?, message?, address?}` record, so an `address` member appears in a RETURN position
     *  on every one of them and the whole-block scan would redden on the crossing's own answer. The term is about
     *  ARGUMENTS: no route takes an address, a tier or a store path. So each `name(args)` signature in the block is read
     *  and its ARGUMENT list alone is checked — the narrower, stricter reading of the same sentence. */
    for (const member of ['module', 'tabs', 'view', 'security']) {
      const marker = new RegExp(`^ {2}${member}: \\{`, 'm').exec(preload)
      expect(marker, `src/main/preload.ts declares the \`${member}\` member`).not.toBeNull()
      const after = preload.slice(marker?.index ?? 0)
      const end = /\n {2}\}/.exec(after)
      const block = after.slice(0, end?.index ?? after.length)
      const signatures = [...block.matchAll(/^\s{4}(\w+)\(([^)]*)\)/gm)].map((m) => ({ name: m[1], args: m[2] }))
      expect(signatures.length, `the \`${member}\` block's signatures are read (a block that answers no signature would make this census vacuous)`).toBeGreaterThan(0)
      for (const signature of signatures) {
        for (const shape of ADDRESS_SHAPED) {
          expect(signature.args.includes(shape),
            `the \`${member}.${signature.name}\` route takes no address-shaped ARGUMENT: ${shape}`).toBe(false)
        }
      }
      // THE CONTROL: the SAME detector fires on a synthetic signature that DOES take one, so the census can still fail.
      expect([...'    read(address: readonly (string | number)[]): Promise<unknown>'.matchAll(/^\s{4}(\w+)\(([^)]*)\)/gm)]
        .some((m) => ADDRESS_SHAPED.some((shape) => m[2].includes(shape))),
        `CONTROL — an address-shaped ARGUMENT in the \`${member}\` block would be DETECTED, so the assertion above is a bound and not a tautology`).toBe(true)
    }
    const forbiddenConstants = [...Object.values(sharedTypes), ...Object.values(storeChannels)]
      .filter((value) => typeof value === 'string' && FORBIDDEN_IN_NAMES.some((forbidden) => value.includes(forbidden)))
    expect(forbiddenConstants, 'no channel constant in the shared vocabulary names either operator address, so no route can reach one by its own name (D-18)').toEqual([])
  })
})
