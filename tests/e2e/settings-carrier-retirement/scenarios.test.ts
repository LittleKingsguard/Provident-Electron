// tests/e2e/settings-carrier-retirement/scenarios.test.ts — THE L1 BATTERY for
// `settings-carrier-retirement`: the twelve e2e scenarios of
// `docs/L1/settings-carrier-retirement.md` §8 (S-1..S-12), one row each.
//
// THE GRAIN IS THE ENTRY POINT, NOT THE UNIT ROW. Each row drives the two modules through the factory
// their L2 declarations publish — `createSettingsSurface({ userDataDir })`, which constructs the
// instance and holds the operator path's single reference to it (`docs/L2/settings-carrier-retirement/
// interface.md` §3) — and asserts exactly what §8's "Expected" column says, nothing finer and nothing
// wider (L1 §8; D-21, D-22; L1 §2's claim that `tests/e2e/` is this layer's own artifact, claimed by
// no module — D-10).
//
// NO RED-FIRST EVIDENCE, STATED RATHER THAN IMPLIED. This battery is authored AFTER the
// implementation, so no row here was ever seen red before the code existed. A red row below is a
// FINDING against the implementation or the design, never evidence about ordering (`strata/
// examiner.md` §3). No row is skipped, conditionally disabled or softened, and no existing row was
// weakened or deleted.
//
// AUTHORED FROM THE DOCUMENTS: L1 §3-§8 read on `interface.md` §1-§8, `behaviour.md` §1-§8 and
// `persistence.md` §1-§9. The implementation was read only for exported names and call shapes
// (`src/main/operator-settings/index.ts`, `src/main/settings-surface/index.ts`); no assertion below
// was chosen from it. THE LIMIT THIS HEAD IMPOSES, named wherever it bites: the module surface's
// three writing members and the exclusion channel's handler live in `src/main/main.ts`, which imports
// `electron` at module scope and is unimportable in a node test, so a row that names a channel drives
// the declared surface that body calls and the answer shape it mints from it, and names the
// booted-app remainder as app-green (`interface.md` §4; `strata/brief.md` §6). No row depends on an
// Electron boot, an IPC hop or a rendered view.
// ⟶ **RE-GRAINED 2026-11-03 (`D-93`)**: this sentence used to name TWO more channel bodies,
// `STORE_FILE_GET` and `STORE_FILE_PUT` — the frozen graph store's Y-1 hand-off and its Y-2 projection
// wire. Both handlers, both their channel constants and the preload `store` members they answered are
// DELETED with the store (`D-90`'s clause (3) measured exactly that set as the only main-side surface
// which existed for it), so the limit above now names the ONE channel this unit's contract is about.
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createDataSurface } from '../../../src/main/data'
import { ProvidentMcpServer } from '../../../src/main/mcp-server.js'
import { groupForTool } from '../../../src/main/security.js'
import { createSettingsSurface, type SettingsAppStateRow, type SettingsSurface } from '../../../src/main/settings-surface/index.js'
import { createProfileStore } from '../../../src/main/storeroom.js'
import { tabsDeclaredRoots } from '../../../src/main/tabs-record'
import { viewDeclaredRoots } from '../../../src/main/view-record'

/** `persistence.md` §1: the settled written names and the two retired seeds, spelled as literals
 *  here because half the rows assert their presence or their absence in a directory this file
 *  seeded itself (D-19, D-22). */
const INSTANCE_FILE = 'provident-operator-settings.json'
const PROFILE_FILE = 'provident-profile.json'
const CARRIER_FILE = 'provident-settings.json' // the retired tier-1 carrier: read once, never written
const SECURITY_SEED = 'provident-security.json' // the sibling's retired seed, for S-1's analogy

let userDataDir: string
beforeEach(() => { userDataDir = mkdtempSync(join(tmpdir(), 'settings-retirement-e2e-')) })
afterEach(() => { rmSync(userDataDir, { recursive: true, force: true }) })

const at = (name: string): string => join(userDataDir, name)
const sha256 = (name: string): string => createHash('sha256').update(readFileSync(at(name))).digest('hex')
const surface = (): SettingsSurface => createSettingsSurface({ userDataDir })
const newDir = (label: string): string => mkdtempSync(join(tmpdir(), `settings-retirement-e2e-${label}-`))
const names = (dir: string): string[] => readdirSync(dir).sort()

/** The three rows a retired carrier holds in `behaviour.md` §7's own example, in the carrier's own
 *  order — the order nothing in this unit is entitled to re-sort (`interface.md` §1 `A-2`). */
const CARRIER_ROWS: SettingsAppStateRow[] = [
  { name: 'file.tabs.order', value: ['a', 'b'] },
  { name: 'file.modules.m1', value: { source: 'x', hash: 'h' } },
  { name: 'file.settings.theme.token', value: 'dark' },
]
const seedCarrier = (dir: string, record: Record<string, unknown>): void =>
  writeFileSync(join(dir, CARRIER_FILE), JSON.stringify({ schemaVersion: '1', ...record }))

/** The source tree, for the two rows whose subject is the retirement's own census (L1 §6-§8). */
function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const here = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(here))
    else if (entry.name.endsWith('.ts')) out.push(here)
  }
  return out
}
const SRC = join(process.cwd(), 'src')
const rel = (file: string): string => file.slice(SRC.length + 1).split('\\').join('/')
const textOf = (file: string): string => readFileSync(file, 'utf8')

/** **COMMENT LINES ELIDED** — every absence/spelling assertion in this file reads CODE, never prose (`AGENTS.md`'s
 *  discipline, and this repository's own scan-corpus rule). The headstones the purge leaves in `src/main/main.ts`
 *  NAME `['operator-app-state']` on purpose (`D-46`'s annotate-beside: a deleted write is recorded where it stood), and a
 *  raw-bytes scan would read that description as a second spelling of the address. A line whose trimmed form opens `//`,
 *  `*` or `/*` is blanked and a trailing `//` is cut, so what remains is the code the row is about. */
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

const containing = (needle: string): string[] => walk(SRC).filter((file) => commentElided(textOf(file)).includes(needle)).map(rel).sort()

/** THE TRANSITIVE IMPORT CLOSURE of the MCP stack's own entry files, `import type` included: the
 *  files a drive on the agent's surface can reach at all (`ISO-5`, `ISO-6`; the helper is the
 *  sibling e2e battery's, driven here over this unit's two names). */
function importClosure(entries: string[]): string[] {
  const spec = /(?:from|import|require)\s*[(\s]\s*['"]([^'"]+)['"]/g
  const seen = new Set<string>()
  const queue = [...entries]
  while (queue.length > 0) {
    const file = queue.shift() as string
    if (seen.has(file) || !existsSync(file)) continue
    seen.add(file)
    for (const match of textOf(file).matchAll(spec)) {
      if (!match[1].startsWith('.')) continue
      const base = resolve(dirname(file), match[1])
      for (const candidate of [base.replace(/\.js$/, '.ts'), `${base}.ts`, join(base, 'index.ts')]) {
        if (candidate.startsWith(SRC) && candidate.endsWith('.ts') && existsSync(candidate) && statSync(candidate).isFile()) {
          queue.push(candidate)
          break
        }
      }
    }
  }
  return [...seen].sort()
}
const MAIN = join(SRC, 'main')
const MCP_CLOSURE = importClosure([join(MAIN, 'mcp-server.ts'), join(MAIN, 'security.ts'), join(MAIN, 'battery-host.ts'), join(MAIN, 'standalone.ts')])

describe('settings-carrier-retirement · the twelve L1 scenarios through their declared entry points', () => {
  it('S-1 · the carrier is gone: its literal is spelled exactly once in src/**, in the instance’s import arm, and main.ts holds no read and no write of it', () => {
    const carrier = containing(CARRIER_FILE)
    expect(carrier, 'L1 §8 S-1 — exactly one occurrence of the retired carrier’s name in src/**, in the instance module’s import arm').toEqual(['main/operator-settings/index.ts'])
    const occurrences = carrier.reduce((total, file) => total + textOf(join(SRC, file)).split(CARRIER_FILE).length - 1, 0)
    expect(occurrences, 'and exactly one occurrence of the literal, as the sibling retired name is spelled once').toBe(1)
    expect(containing(SECURITY_SEED), 'the analogy S-1 draws: the sibling’s retired seed is spelled once, in the same file').toEqual(['main/operator-settings/index.ts'])
    expect(textOf(join(MAIN, 'main.ts')).includes(CARRIER_FILE), 'and src/main/main.ts holds no read and no write of the retired carrier — not even its name').toBe(false)
  })

  it('S-2 · the rows are served by the instance: a seeded retired record’s file.* rows answer after one boot, names verbatim and in order', () => {
    seedCarrier(userDataDir, Object.fromEntries(CARRIER_ROWS.map((row) => [row.name, row.value])))
    const settings = surface()
    const answer = settings.state()
    expect(answer.legacy, 'L1 §4 — a valid retired record is the `present and valid` arm').toBe('imported')
    expect(answer.rows, 'every file.* row imported verbatim under its own name, in the carrier’s own order').toEqual(CARRIER_ROWS)
    expect(answer.unrepresentable, 'and nothing was dropped or renamed').toEqual([])
    // THE LIMIT, STATED: Y-1's body is `main.ts`'s and is unimportable here, so this row asserts the
    // rows that body projects to `{name, value}[]` — names verbatim — and the body itself on a booted
    // app is app-green (`interface.md` §4; `behaviour.md` §2).
    expect(answer.rows.map((row) => row.name), 'the projection Y-1 mints carries the names verbatim').toEqual(['file.tabs.order', 'file.modules.m1', 'file.settings.theme.token'])
    expect(names(userDataDir).includes('schemaVersion'), 'and the retired record’s format marker is not carried as a row').toBe(false)
  })

  it('S-3 · the import writes no byte: the retired file’s sha256 is identical after a boot and three commits', () => {
    seedCarrier(userDataDir, Object.fromEntries(CARRIER_ROWS.map((row) => [row.name, row.value])))
    const seeded = sha256(CARRIER_FILE)
    const settings = surface()
    expect(settings.state().rows.length, 'the boot imported the carrier').toBe(3)
    expect(sha256(CARRIER_FILE), 'the boot itself writes no byte of the retired file (L1 §4)').toBe(seeded)

    expect(settings.commit([{ name: 'file.tabs.order', value: ['a'] }]).status, 'the first commit lands').toBe('committed')
    expect(settings.commit([{ name: 'file.tabs.order', value: ['a', 'c'] }]).status, 'the second commit lands').toBe('committed')
    expect(settings.commit([{ name: 'file.layout.dock', value: 'left' }]).status, 'the third commit lands').toBe('committed')
    expect(sha256(CARRIER_FILE), 'three commits later the retired name is byte-identical to its seed: read once, never written (D-19, D-22)').toBe(seeded)
    expect(readFileSync(at(CARRIER_FILE), 'utf8'), 'and its bytes still carry the record it was seeded with, not the state that superseded it').toContain('file.settings.theme.token')
  })

  it('S-4 · the absent arm: no retired file answers [], the legacy word `absent`, no byte of a retired name, and the instance’s own two records on the disk', () => {
    const settings = surface()
    let thrown: unknown
    let answer: ReturnType<SettingsSurface['state']> | undefined
    try { answer = settings.state() } catch (error) { thrown = error }
    expect(thrown, 'the absent arm throws nothing').toBeUndefined()
    expect(answer, 'the boot answered').toEqual({ rows: [], legacy: 'absent', unrepresentable: [], storage: 'standing' })
    expect(names(userDataDir), 'and the boot wrote no second file: only the instance’s own, created by the store').toEqual([INSTANCE_FILE])
    // **THE INSTANCE’S FILE IS NOT ZERO-LENGTH: THE BOOT SAVES ITS TWO CREATION RECORDS** (measured 2026-11-03 on the
    // installed `1.9.1`; `guide §9.1`'s zero-length creation is the reading of its own date). The record address holds
    // `FIRST_RUN`’s image and the row-list address the absent arm — the word this row asserts above, in the store’s own
    // bytes — and NO retired name is created, which is the half of this row that never moved.
    expect(readFileSync(at(INSTANCE_FILE), 'utf8'), 'the two creation records, whole').toBe(
      '{"operator-app-state":{"legacy":"absent","rows":[],"unrepresentable":[]},"operator-settings":{"enabled":["read","dispatch"]}}',
    )
  })

  it('S-5 · the corrupt arm: five foreign shapes answer no rows, leave the bytes standing, report `corrupt` and throw nothing', () => {
    const arms: Array<{ label: string; seed: (dir: string) => string | null }> = [
      { label: 'unparsable', seed: (dir) => { const bytes = '{"file.tabs.order":'; writeFileSync(join(dir, CARRIER_FILE), bytes); return bytes } },
      { label: 'non-object', seed: (dir) => { const bytes = '[1,2]'; writeFileSync(join(dir, CARRIER_FILE), bytes); return bytes } },
      { label: 'foreign-keyed', seed: (dir) => { const bytes = '{"mine":1,"schemaVersion":"1"}'; writeFileSync(join(dir, CARRIER_FILE), bytes); return bytes } },
      { label: 'wrong-stamp', seed: (dir) => { const bytes = '{"schemaVersion":"2","file.a":1}'; writeFileSync(join(dir, CARRIER_FILE), bytes); return bytes } },
      { label: 'directory', seed: (dir) => { mkdirSync(join(dir, CARRIER_FILE), { recursive: true }); return null } },
    ]
    for (const arm of arms) {
      const dir = newDir(`s5-${arm.label}`)
      try {
        const bytes = arm.seed(dir)
        let thrown: unknown
        let answer: ReturnType<SettingsSurface['state']> | undefined
        try { answer = createSettingsSurface({ userDataDir: dir }).state() } catch (error) { thrown = error }
        expect(thrown, `S-5/${arm.label}: the arm throws nothing (L1 §4)`).toBeUndefined()
        expect(answer?.rows, `S-5/${arm.label}: no rows`).toEqual([])
        expect(answer?.legacy, `S-5/${arm.label}: the diagnosis is reported as \`corrupt\``).toBe('corrupt')
        expect(answer?.storage, `S-5/${arm.label}: and the store itself stands`).toBe('standing')
        if (bytes !== null) expect(readFileSync(join(dir, CARRIER_FILE), 'utf8'), `S-5/${arm.label}: the bytes stand untouched (D-19)`).toBe(bytes)
        expect(names(dir), `S-5/${arm.label}: and the import created no third name`).toEqual([INSTANCE_FILE, CARRIER_FILE].sort())
      } finally {
        rmSync(dir, { recursive: true, force: true })
      }
    }
  })

  it('S-6 · the unrepresentable arm: a null-carrying row is answered by name while its siblings import, and nothing is dropped silently', () => {
    seedCarrier(userDataDir, { 'file.tabs.order': null, 'file.layout.dock': 'left' })
    const answer = surface().state()
    expect(answer.rows, 'the sibling imports verbatim').toEqual([{ name: 'file.layout.dock', value: 'left' }])
    expect(answer.unrepresentable, 'and the row the store cannot carry is answered BY NAME, never silently dropped (L1 §4)').toEqual(['file.tabs.order'])
    expect(answer.legacy, 'the import ran and carried what it could').toBe('imported')
    expect(readFileSync(at(CARRIER_FILE), 'utf8'), 'and the bytes it could not carry stand as seeded').toContain('"file.tabs.order":null')
  })

  it('S-7 · boot parity by a second construction: rows, token, grants and cap identical, and the exclusion pair at its declared initial', () => {
    const a = surface()
    expect(a.set({ token: 't', groups: ['graph', 'data'], maxJournalLength: 41 }).write.status, 'the security record commits').toBe('committed')
    expect(a.read().enabled, '`set` adds the named groups to the durable record (the sibling’s landed merge)').toEqual(['read', 'dispatch', 'graph', 'data'])
    expect(a.set({ disable: ['read', 'dispatch'] }).write.status, 'and `disable` removes only what it names').toBe('committed')
    expect(a.read().enabled, 'so the parity figures below are reachable from a declared drive').toEqual(['graph', 'data'])
    expect(a.commit(CARRIER_ROWS).status, 'the app rows commit').toBe('committed')

    // "The next process" at the envelope grain: a second construction over the same directory, which
    // is what L1 §5 declares; a real Electron restart is app-green (`brief.md` §6).
    const b = surface()
    expect({ token: b.read().token, enabled: b.read().enabled, maxJournalLength: b.read().maxJournalLength }, 'the identical durable three: token, grants and cap').toEqual({ token: 't', enabled: ['graph', 'data'], maxJournalLength: 41 })
    expect(b.state().rows, 'and the identical rows, whole and in the committed order').toEqual(CARRIER_ROWS)
    expect(b.state().legacy, 'a record stood at the address, so no import arm applied').toBe('recorded')
    expect({ exclusion: b.read().exclusion, read: b.read().read }, 'the exclusion pair re-boots to its DECLARED initial: it is `mem` and is never persisted (the sibling’s ASM-2)').toEqual({ exclusion: 'mcp-enabled', read: null })
  })

  it('S-8 · a commit is one store write: one `{status:"committed"}`, the rows standing, no .tmp and no second file', () => {
    const settings = surface()
    const answer = settings.commit(CARRIER_ROWS)
    expect(answer, 'the channel’s own committed arm, and nothing beside it').toEqual({ status: 'committed' })
    expect(Object.keys(answer), 'one member: no ordinal rides this answer (interface.md §3 `ASM-L2-4`)').toEqual(['status'])
    expect(settings.state().rows, 'the rows stand whole, in the order they were written').toEqual(CARRIER_ROWS)
    expect(names(userDataDir), 'no `.tmp`, no lock, no sidecar and no second name: the retired stage-and-rename machinery has no successor').toEqual([INSTANCE_FILE])
    expect(settings.state().legacy, 'the boot-time diagnosis is fixed at construction and never written, so a commit moves it not at all (interface.md §2 `ASM-M1`)').toBe('absent')
    expect(surface().state().legacy, 'and the record now stands at the third address, so the next process runs no import arm').toBe('recorded')
  })

  it('S-9 · a refusal leaves the previous bytes: a refused commit answers the store’s own status, and rows and file are unchanged', () => {
    const settings = surface()
    expect(settings.commit(CARRIER_ROWS).status, 'a settled record to refuse against').toBe('committed')
    const stood = readFileSync(at(INSTANCE_FILE))
    const rowsBefore = settings.state().rows

    const arms: Array<{ label: string; rows: unknown }> = [
      { label: 'two rows naming one name', rows: [{ name: 'file.x', value: 1 }, { name: 'file.x', value: 2 }] },
      { label: 'a name that is not a non-empty string', rows: [{ name: '', value: 1 }] },
      { label: 'a row that is not an object', rows: ['file.x'] },
      { label: 'a rows argument that is not an array', rows: 'file.x' },
      { label: 'a value carrying null', rows: [{ name: 'file.n', value: null }] },
    ]
    for (const arm of arms) {
      const refused = settings.commit(arm.rows as SettingsAppStateRow[])
      expect(refused.status, `S-9/${arm.label}: refused as a value, never a throw`).toBe('refused')
      if (refused.status !== 'refused') continue
      expect(refused.reason.length, `S-9/${arm.label}: the reason is the store’s own status verbatim (L1 §3 ASM-2)`).toBeGreaterThan(0)
      expect(refused.message.length, `S-9/${arm.label}: with its own sentence beside it`).toBeGreaterThan(0)
      expect('address' in refused, `S-9/${arm.label}: and the address member the channel’s answer carries`).toBe(true)
      expect(settings.state().rows, `S-9/${arm.label}: the rows are unchanged`).toEqual(rowsBefore)
      expect(readFileSync(at(INSTANCE_FILE)).equals(stood), `S-9/${arm.label}: and the file is byte-identical — a refusal mints no cursor and adds no change`).toBe(true)
    }
  })

  it('S-10 · the census: a settled profile writes exactly the two names, and a seeded retired name is byte-identical', () => {
    seedCarrier(userDataDir, { 'file.tabs.order': ['a'] })
    const seeded = readFileSync(at(CARRIER_FILE))
    const settings = surface()
    settings.commit([{ name: 'file.tabs.order', value: ['a', 'b'] }])
    // The second written name is `central-data`'s, written through the `provident-storeroom` instance the boot
    // constructs at that same profile directory: the census S-10 states is the app's, not this unit's alone
    // (D-13, D-22). **THE ROW BOOTS THE INSTANCE ITSELF** (`src/main/main.ts:132`), because `DataSurfaceOptions.store`
    // is REQUIRED and the surface constructs nothing — the composition's own act, stood here (D-80).
    const centralStore = createProfileStore({ filePath: join(userDataDir, PROFILE_FILE) })
    expect(createDataSurface({ profileDir: userDataDir, store: centralStore, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] }).write({ path: ['alpha'], value: 'x' }).status, 'the profile store commits its own row').toBe('committed')

    const settled = names(userDataDir)
    expect(settled, 'exactly the two written names and the seeded retired name, and no third name').toEqual([INSTANCE_FILE, PROFILE_FILE, CARRIER_FILE].sort())
    expect(readFileSync(at(CARRIER_FILE)).equals(seeded), 'a seeded retired name is byte-identical after both writers have acted (D-19)').toBe(true)
    expect(settled.filter((name) => name.endsWith('.json') && name !== CARRIER_FILE), 'the written set — the retired name excluded — is the two names L1 §6 declares').toEqual([INSTANCE_FILE, PROFILE_FILE].sort())
  })

  it('S-11 · ISO-1..ISO-6 and RQ-1 stay green: the landed absences, driven unchanged but for §6’s re-grains', () => {
    // ISO-1 — no `provident.data.*` operation reaches an operator-settings member or the instance's
    // file: the surface's declared refusal keeps an operator-shaped path out, and no answer names
    // the record. (The five tools answer through this one answer site — `interface.md` §5.)
    const data = createDataSurface({ profileDir: userDataDir, store: createProfileStore({ filePath: join(userDataDir, PROFILE_FILE) }), declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] })
    for (const spelling of ['secure.token', 'mem.secret', 'temp.scratch']) {
      const answer = data.write({ path: [spelling], value: 'x' }) as Record<string, unknown>
      expect({ status: answer.status, reason: answer.reason }, `ISO-1: an operator-shaped path is refused, not written: ${spelling}`).toEqual({ status: 'refused', reason: 'volatile-path' })
      expect(JSON.stringify(answer).includes('operator-settings'), `ISO-1: and no data answer names the security record (${spelling})`).toBe(false)
    }

    // ISO-2 — the resource seam is unmoved at three, and none resolves into the instance.
    expect(ProvidentMcpServer.ALL_RESOURCES.map((resource) => resource.method).sort(), 'ISO-2: three readings, none a store').toEqual(['listTargets', 'nodeState', 'renderedHtml'])

    // ISO-3 — the 27-member union carries no security member and no instance path.
    const types = textOf(join(SRC, 'shared', 'types.ts'))
    const block = /export type RpcMethod =([\s\S]*?)\n\n/.exec(types)
    expect(block, 'ISO-3: src/shared/types.ts declares the union').not.toBeNull()
    const members = [...(block?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1])
    expect(members.length, 'ISO-3: the union stands at its filed 27').toBe(27)
    for (const forbidden of ['settings.get', 'operator.write', 'security.get', 'security.set', 'appState.read', 'appState.write']) {
      expect(members.includes(forbidden), `ISO-3: no member names a security write: ${forbidden}`).toBe(false)
    }

    // ISO-4 — the bridge keeps its member set (eight since D-63 added the tab record's crossing) and its one
    // security route set.
    const preload = textOf(join(MAIN, 'preload.ts'))
    const start = preload.indexOf('export interface ProvidentBridge {')
    const bridge = [...preload.slice(start, preload.indexOf('\n}', start)).matchAll(/^ {2}(\w+)(?:\(|:)/gm)].map((match) => match[1]).sort()
    // ⟶ **`9 -> 8` at `D-93`**: the `store` namespace — the frozen graph store's Y-1/Y-2/Y-3 trio — left the bridge with the
    // store itself. `D-63`'s tab-record crossing and `D-87`'s view-record crossing stand, and NO member replaced the one that
    // went, so this row's set-equality is still a set claim over what the bridge actually carries.
    expect(bridge, 'ISO-4: EIGHT top-level members since D-63\'s tab-record crossing and D-87\'s view-record crossing, the `store` namespace having left at D-93, and this unit adds none (D-18)').toEqual(['module', 'notify', 'onRequest', 'ready', 'security', 'sendReply', 'tabs', 'view'])

    // ISO-5 and ISO-6 — nothing the MCP stack's own import closure reaches names the instance, its
    // module or either retired name, and its allowed `provident-*.json` literal set has SHRUNK to the
    // profile store's alone (L1 §6: the retired carrier's literal left the tree with the writer).
    const named = /operator-settings|operator-app-state|operator-exclusion|createSettingsSurface|createOperatorSettings|settings-surface/
    expect(MCP_CLOSURE.length, 'ISO-5: the closure is computed, not hand-listed').toBeGreaterThan(5)
    expect(MCP_CLOSURE.filter((file) => named.test(textOf(file))).map(rel), 'ISO-5/ISO-6: no file the stack reaches names the instance or either address').toEqual([])
    expect(MCP_CLOSURE.filter((file) => [INSTANCE_FILE, CARRIER_FILE, SECURITY_SEED].some((name) => textOf(file).includes(name))).map(rel), 'ISO-6: and no reachable file spells either retired name or the instance’s own file').toEqual([])
    const literals = new Set<string>()
    for (const file of MCP_CLOSURE) for (const match of textOf(file).matchAll(/provident-[a-z0-9-]+\.json/g)) literals.add(match[0])
    expect([...literals].sort(), 'ISO-6 re-grained (L1 §6): the allowed literal set is the profile store’s own, and it SHRANK').toEqual([PROFILE_FILE])
    expect(literals.has(CARRIER_FILE), 'and the retired carrier’s literal stands in no reachable file').toBe(false)

    // RQ-1 — the group cannot gate a route: each route spelling resolves to no group.
    for (const route of ['data.read', 'data.write', 'data.delete', 'data.list', 'data.journal']) {
      expect(groupForTool(route), `RQ-1: ${route} resolves to no group, so no grant can withhold it`).toBeNull()
    }
  })

  it('S-12 · ISO-7: a module install moves the app-state record and leaves the security record byte-identical', () => {
    const settings = surface()
    expect(settings.set({ token: 'tok', groups: ['module', 'code'], maxJournalLength: 17 }).write.status, 'a settled security record to protect').toBe('committed')
    const recordBefore = settings.read()

    // THE LIVE LIMB — the whole-map commit the three module members issue (`put`, `remove`,
    // `setDisabled`): the members themselves are `main.ts`'s and unimportable in a node test, so this
    // drives the one act they issue and names the booted-app remainder as app-green (`behaviour.md`
    // §4/§8; L1 §8 S-12).
    const installed = settings.commit([{ name: 'file.modules.m1', value: { source: 'module source', quarantined: 'no' } }])
    expect(installed.status, 'the module install’s one commit commits').toBe('committed')
    expect(settings.state().rows, 'and the app-state record is the one that moved').toEqual([{ name: 'file.modules.m1', value: { source: 'module source', quarantined: 'no' } }])
    expect(settings.read(), 'while the security record at `[\'operator-settings\']` is unchanged: token, grants, cap and the exclusion pair alike').toEqual(recordBefore)

    // THE SECOND HIDDEN WRITE — the operator's disable toggle issues the same one commit, and the
    // security record still does not move (`ISO-7`'s `IPC_MODULE_SET_DISABLED` limb).
    expect(settings.commit([{ name: 'file.modules.m1', value: { source: 'module source', quarantined: 'no', disabled: true } }]).status, 'the disable toggle’s commit commits').toBe('committed')
    expect(settings.read(), 'and the security record is still byte-for-byte the record it was').toEqual(recordBefore)

    // THE DECLARATIVE LIMB — no module tool, union member or bridge route names either address, and
    // the module tools' own home spells neither (`behaviour.md` §8 `ISO-7`; D-18).
    const addresses = ['operator-settings', 'operator-exclusion']
    for (const name of ProvidentMcpServer.ALL_TOOLS) {
      for (const address of addresses) expect(name.includes(address), `ISO-7: no tool name names an address: ${name}`).toBe(false)
    }
    const moduleToolsHome = textOf(join(MAIN, 'mcp-server.ts'))
    for (const address of addresses) expect(moduleToolsHome.includes(address), `ISO-7: the module tools’ home spells no address: ${address}`).toBe(false)
    // ⟶ **THE LIST SHRINKS TO ONE — AND THE TERM GETS STRONGER, NOT WEAKER (2026-11-03, `D-93`).** The row read
    // `['main/main.ts', 'main/operator-settings/index.ts']`, the first being the composition site's OWN COMMENT (the file
    // never spelled the address in code: it reaches the address through `settingsSurface.state()`/`.commit()`). Per this
    // repository's comment-elided discipline the census now reads CODE, and the code answers ONE file — the instance that
    // declares the address. The purge deleted the only other thing in `main.ts` that had anything to do with it (the
    // frozen store's `file.*` projection into those rows), so the strict form is also the true one.
    expect(containing('operator-app-state'), 'ISO-7: the third address is spelled in the CODE of exactly ONE file — the instance that declares it; the composition site reaches it through `settingsSurface.state()`/`.commit()` and never spells it, and the frozen store projection that used to write it is deleted (`D-93`)').toEqual(['main/operator-settings/index.ts'])
  })
})
