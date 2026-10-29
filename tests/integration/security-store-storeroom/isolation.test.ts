// tests/integration/security-store-storeroom/isolation.test.ts — THE L2 BATTERY for
// `security-store-storeroom`, part 3: THE SIX ISOLATION ABSENCES AND THE SETTLED ROUTE QUESTION.
//
// THE CONTRACT: docs/L1/security-store-storeroom.md §6 (`ISO-1`..`ISO-6`) and
// docs/L2/security-store-storeroom/interface.md §6, and behaviour.md §9 ("RQ-1"). D-18 makes the
// control ABSENCE, ASSERTED: each row states that nothing resolves, and drives that over a live
// surface or over the files the MCP stack actually reaches — never inferred from a code read in
// prose.
//
// REV 2 — THE FOUR RE-GRAINS the L2 examiner's FAIL binds this file to, and the limit each one
// now states in its own message instead of passing silently:
//   · `ISO-3` no longer tests a six-string regex over source bytes. The union's every member must
//     now be ANSWERED — by a `handleRequest` dispatch arm or by a registered tool name — so a
//     member spelled `settings.get` or `operator.write` fails the row. The dispatch arms and the
//     `MUTATING_METHODS` set are not exported, so THAT limb is a declaration read and the row says
//     so out loud; the member census itself is driven against the live `ALL_TOOLS`.
//   · `ISO-4` now scans EVERY `ipcRenderer` call site in `src/**` and the renderer's own `declare
//     global` half, so a fourth channel spelled in `secure-panels.ts`, or a raw `ipcRenderer.invoke`
//     outside the bridge, fails. The security channels are counted by constant VALUE, live.
//   · `ISO-5`'s scanned set is no longer a hand-list: it is the TRANSITIVE IMPORT CLOSURE of
//     `mcp-server.ts` and `security.ts` over `src/**`, which reaches `src/shared/types.ts`,
//     `store-channels.ts` (through the composition), `module-store.ts`, `renderer/extensions.ts`
//     and `data/**`; and it now asserts the CONSTRUCTION CENSUS its own `behaviour.md` §9 cell
//     attributes to it.
//   · `ISO-6` scans that same closure for the name AND for every fragment of it, and for any other
//     `provident-*.json` literal the stack would need in order to compose the name at run time.
//
// THIS FILE IMPORTS NO HALF OF THE SUBJECT. The instance module and the surface module are the
// SUBJECT of these absences and are never imported here (D-18, examiner.md §3). The red-before-green
// rows that drive the two modules are `instance.test.ts` and `surface.test.ts` beside this file.
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { describe, expect, it } from 'vitest'

import { createDataSurface, DATA_TOOL_NAMES } from '../../../src/main/data'
import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { SecurityGate, groupForTool, toolAllowed, type ToolGroup } from '../../../src/main/security.js'
import * as storeChannels from '../../../src/main/store-channels.js'
import * as sharedTypes from '../../../src/shared/types.js'

/** The instance's file name — interface.md §2.1, persistence.md §1. It is a literal here ON PURPOSE:
 *  a row that imported it from the module could not assert its ABSENCE (`ISO-6`). */
const OPERATOR_FILE = 'provident-operator-settings.json'
const PROFILE_FILE = 'provident-profile.json'
const RECORD_ADDRESS = 'operator-settings'
const VOLATILE_ADDRESS = 'operator-exclusion'

/** The five bridge route spellings — `src/shared/types.ts:282-286`, read as data (`ISO-3`, `RQ-1`). */
const DATA_ROUTES = ['data.read', 'data.write', 'data.delete', 'data.list', 'data.journal'] as const

/** The 27 `RpcMethod` members as filed at `0eca66b` (`src/shared/types.ts:259-286`). */
const RPC_METHODS = [
  'dispatch', 'renderedHtml', 'markdown', 'listTargets', 'nodeState', 'load', 'op', 'export',
  'validate', 'teardown', 'code.get', 'code.set', 'code.create', 'code.delete', 'code.validate',
  'code.load', 'code.loadBatch', 'journal', 'module.install', 'module.update', 'module.list',
  'focus', 'data.read', 'data.write', 'data.delete', 'data.list', 'data.journal',
] as const

/** The seven `MUTATING_METHODS` as filed (`src/renderer/renderer.ts:829`). */
const MUTATING = ['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch', 'journal'] as const

/** The seven top-level `window.provident` members as filed (`src/main/preload.ts:42-75`). */
const BRIDGE_MEMBERS = ['module', 'notify', 'onRequest', 'ready', 'security', 'sendReply', 'store'] as const

const SRC_DIR = fileURLToPath(new URL('../../../src', import.meta.url))
const MAIN_DIR = join(SRC_DIR, 'main')
const REPO = new URL('../../../', import.meta.url)

const sourceOf = (relative: string): string => readFileSync(new URL(relative, REPO), 'utf8')
const textOf = (absolute: string): string => readFileSync(absolute, 'utf8')
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

/** THE TRANSITIVE IMPORT CLOSURE of the MCP stack's two entry files over `src/**`.
 *  Every relative specifier is followed, `import type` included — a type-only edge still names the
 *  file in the stack's own declaration, which is what `ISO-5` and `ISO-6` are about. Bare specifiers
 *  (packages, `node:`, `electron`) are skipped: they are not files in this tree (D-18). */
function importClosure(entries: string[]): string[] {
  const spec = /(?:from|import|require)\s*[(\s]\s*['"]([^'"]+)['"]/g
  const seen = new Set<string>()
  const queue = [...entries]
  while (queue.length > 0) {
    const file = queue.shift() as string
    if (seen.has(file) || !existsSync(file)) continue
    seen.add(file)
    for (const match of textOf(file).matchAll(spec)) {
      const target = match[1]
      if (!target.startsWith('.')) continue
      const base = resolve(dirname(file), target)
      const candidates = [base.replace(/\.js$/, '.ts'), `${base}.ts`, join(base, 'index.ts')]
      for (const candidate of candidates) {
        if (candidate.startsWith(SRC_DIR) && existsSync(candidate) && candidate.endsWith('.ts') && statSync(candidate).isFile()) {
          queue.push(candidate)
          break
        }
      }
    }
  }
  return [...seen].sort()
}

/** The MCP stack's reach: the server, the gate, both entry hosts and everything they import. */
const MCP_CLOSURE = importClosure([
  join(MAIN_DIR, 'mcp-server.ts'),
  join(MAIN_DIR, 'security.ts'),
  join(MAIN_DIR, 'battery-host.ts'),
  join(MAIN_DIR, 'standalone.ts'),
])

/** The `security` member's route names, out of a bridge declaration block, at whatever its own
 *  indentation is — so `preload.ts`'s and `secure-panels.ts`'s halves are read by ONE reader. */
function securityRoutesOf(source: string, label: string): string[] {
  const marker = /^(\s*)security[?]?:\s*\{/m.exec(source)
  if (marker === null) throw new Error(`${label}: no \`security\` member is declared`)
  const indent = marker[1].length
  const after = source.slice(marker.index)
  const close = new RegExp(`\\n\\s{${indent}}\\}`, 'm').exec(after)
  if (close === null) throw new Error(`${label}: the \`security\` member's close is not found at its own indent`)
  const body = after.slice(0, close.index)
  return [...body.matchAll(new RegExp(`^\\s{${indent + 2}}(\\w+)\\s*\\(`, 'gm'))].map((match) => match[1]).sort()
}

const backend: McpBackend = { invoke: async () => ({}) }

interface Live {
  server: ProvidentMcpServer
  client: Client
  /** The profile directory the drive owns, so a row can assert what stands in it. */
  profileDir: string
  close(): Promise<void>
}

/** The boundary `src/main/main.ts` composes: a gate, the server and the declared `dataSurface`.
 *  The subject here is the MCP surface, never a stand-in for it (`examiner.md` §2). */
async function live(groups: ToolGroup[]): Promise<Live> {
  const profileDir = mkdtempSync(join(tmpdir(), 'security-store-isolation-'))
  const gate = new SecurityGate({ token: null, enabled: groups })
  const server = new ProvidentMcpServer({ backend, gate, transport: 'stdio', dataSurface: createDataSurface({ profileDir }) })
  const mcp = server.ensureServerRegistered()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await mcp.connect(serverTransport)
  const client = new Client({ name: 'security-store-isolation', version: '0.0.0' })
  await client.connect(clientTransport)
  return {
    server,
    client,
    profileDir,
    close: async () => {
      await client.close()
      rmSync(profileDir, { recursive: true, force: true })
    },
  }
}

async function call(client: Client, name: string, args: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
  const result = await client.callTool({ name, arguments: args }) as unknown
  const content = (result as { content?: Array<{ type?: string; text?: string }> }).content
  return JSON.parse(content?.[0]?.text ?? '{}') as Record<string, unknown>
}

describe('security-store-storeroom · the isolation absences (D-18, L1 §6)', () => {
  it('ISO-1 · no provident.data.* tool reads or writes an operator-settings member or the instance file', async () => {
    const { client, profileDir, close } = await live(['read', 'dispatch', 'data'])
    try {
      const listed = (await client.listTools()).tools.map((tool) => tool.name)
      for (const name of DATA_TOOL_NAMES) {
        expect(listed.includes(name), `the row needs the tool present to drive it: ${name}`).toBe(true)
      }
      const answers: Record<string, unknown>[] = []
      answers.push(await call(client, 'provident.data.list', {}))
      answers.push(await call(client, 'provident.data.read', { path: ['alpha'] }))
      answers.push(await call(client, 'provident.data.write', { path: ['alpha'], value: 'x' }))
      answers.push(await call(client, 'provident.data.journal', {}))
      answers.push(await call(client, 'provident.data.delete', { path: ['alpha'] }))

      // THE CONTROL, so the absences below are not a blanket: the drive really reached the
      // profile store, and it owns its own file.
      expect(answers[2].status, 'the third drive committed through the profile store').toBe('committed')
      expect(existsSync(join(profileDir, PROFILE_FILE)), 'the data surface writes its own file, not the instance’s').toBe(true)

      // THE POSITIVE HALF — the sibling's own declared refusal keeps an operator-shaped path out
      // (docs/L2/central-data/interface.md §1; L1 §6 `ISO-1`'s second sentence).
      const volatile = await call(client, 'provident.data.write', { path: ['secure.token'], value: 'x' })
      expect({ status: volatile.status, reason: volatile.reason }, 'a `secure.` spelling is refused by the profile surface, so no data tool reaches a tier-4 row by name').toEqual({ status: 'refused', reason: 'volatile-path' })

      for (const answer of answers) {
        const text = JSON.stringify(answer)
        for (const token of [OPERATOR_FILE, RECORD_ADDRESS, VOLATILE_ADDRESS, 'tier4', 'maxJournalLength']) {
          expect(text.includes(token), `no provident.data.* answer names the security record: ${token} in ${text}`).toBe(false)
        }
      }
      expect(existsSync(join(profileDir, OPERATOR_FILE)), 'no drive created a byte of the instance’s own file').toBe(false)
    } finally {
      await close()
    }
  })

  it('ISO-2 · no MCP resource resolves into the instance: exactly three URIs on the three landed readings', async () => {
    const { server, client, close } = await live(['read', 'dispatch'])
    try {
      const uris = (await client.listResources()).resources.map((resource) => resource.uri)
      const templates = (await client.listResourceTemplates()).resourceTemplates.map((template) => template.uriTemplate)
      expect([...uris, ...templates].sort(), 'the resource seam is unmoved at three — two fixed URIs and one template').toEqual(['mcp://provident/app', 'mcp://provident/node/{nodeId}', 'mcp://provident/targets'])
      const readings = ProvidentMcpServer.ALL_RESOURCES.map((entry) => entry.method).sort()
      expect(readings, 'each resource resolves to one of the three landed readings, and none to a store').toEqual(['listTargets', 'nodeState', 'renderedHtml'])
      expect(server.allowedResourceUris().sort(), 'and the live gate allows the same three, not a fourth').toEqual(['mcp://provident/app', 'mcp://provident/node/{nodeId}', 'mcp://provident/targets'])
    } finally {
      await close()
    }
  })

  it('ISO-3 · every RpcMethod member is ANSWERED by the tree, so no member can name a security write; MUTATING_METHODS stays seven', () => {
    const types = sourceOf('src/shared/types.ts')
    const block = /export type RpcMethod =([\s\S]*?)\n\n/.exec(types)
    expect(block, 'src/shared/types.ts declares the RpcMethod union').not.toBeNull()
    const members = [...(block?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1])
    expect(members, 'the union is 27 members and its order is the filed one').toEqual([...RPC_METHODS])

    // LIMB ONE — LIVE. Every name the server can register is a member of the union or one of the
    // four read tools whose tool spelling differs from its method spelling. This is the limb that
    // makes an added member a finding: a spelling the union does not carry cannot be answered.
    const toolNames = ProvidentMcpServer.ALL_TOOLS.map((name) => name.replace(/^provident\./, ''))
    for (const name of toolNames) {
      if (['get_rendered_html', 'get_markdown', 'list_targets', 'get_node_state'].includes(name)) continue
      expect(members.includes(name), `the server registers a tool the RpcMethod union must carry: ${name}`).toBe(true)
    }
    for (const name of DATA_TOOL_NAMES) {
      expect(members.includes(name.replace(/^provident\./, '')), `every data tool is a union member: ${name}`).toBe(true)
    }

    // LIMB TWO — STRUCTURAL, and named as such. `handleRequest`'s dispatch arms are not exported,
    // so the twenty-seven members' ANSWERABILITY by the renderer's own switch is a declaration
    // read; it is a read of the DISPATCH SURFACE rather than of the subject's internals. A member
    // with neither a dispatch arm nor a registered tool — `settings.get`, `operator.write`, any
    // fourth route — fails RIGHT HERE, which the six-string spelling test this row used to run
    // could not do.
    const renderer = sourceOf('src/renderer/renderer.ts')
    const arms = new Set([...renderer.matchAll(/^\s*case '([^']+)':/gm)].map((match) => match[1]))
    for (const member of members) {
      const answered = arms.has(member) || toolNames.includes(member)
      expect(answered, `no dispatch arm and no registered tool answers this RpcMethod member, and a member nothing answers cannot be a security path either: ${member}`).toBe(true)
    }

    // LIMB THREE — the mutating set, which is not a union and not exported either: a source read,
    // stated as one. A security write joining it would make the transition a journaled mutation.
    const mutating = /const MUTATING_METHODS = new Set\(\[([^\]]*)\]\)/.exec(renderer)
    expect(mutating, 'src/renderer/renderer.ts declares MUTATING_METHODS').not.toBeNull()
    const names = [...(mutating?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1])
    expect(names, 'the mutating set is seven, and no security write joins it').toEqual([...MUTATING])
  })

  it('ISO-4 · no bridge channel carries a security write but the three, over a seven-member bridge, in both lockstep declarations', () => {
    const preload = sourceOf('src/main/preload.ts')
    const start = preload.indexOf('export interface ProvidentBridge {')
    const end = preload.indexOf('\n}', start)
    expect(start, 'src/main/preload.ts declares ProvidentBridge').toBeGreaterThan(-1)
    const block = preload.slice(start, end)
    const members = [...block.matchAll(/^ {2}(\w+)(?:\(|:)/gm)].map((match) => match[1]).sort()
    expect(members, 'the bridge carries seven top-level members and gains none (interface.md §5 A-1)').toEqual([...BRIDGE_MEMBERS])
    expect(preload.split("contextBridge.exposeInMainWorld('provident'").length - 1, 'one exposure of one bridge').toBe(1)

    // LIMB TWO — THE LOCKSTEP HALF. `preload.ts` and `secure-panels.ts` re-declare the same
    // `security` member and must move together, so a fourth route spelled in the RENDERER's half
    // alone is a finding here even though `preload.ts` reads clean.
    const preloadRoutes = securityRoutesOf(preload, 'src/main/preload.ts')
    const panelsRoutes = securityRoutesOf(sourceOf('src/renderer/secure-panels.ts'), 'src/renderer/secure-panels.ts')
    expect(preloadRoutes, 'the security member carries exactly the three manual-UI routes').toEqual(['get', 'set', 'setExclusion'])
    expect(panelsRoutes, 'and the renderer’s `declare global` half carries the SAME three — a half-widening or a fourth route fails').toEqual(preloadRoutes)

    // LIMB THREE — THE RAW-CALL SITE. `ipcRenderer` is obtainable only from `electron`, so the one
    // file in `src/**` that imports it is the bridge: any other file able to `invoke` a channel
    // would carry a security write outside the three, and it cannot, because it cannot reach one.
    const holders = ALL_SRC.filter((file) => /\bipcRenderer\b/.test(textOf(file)))
    expect(holders.map(rel).sort(), 'only the preload bridge holds `ipcRenderer`; no file may reach a channel behind its back').toEqual(['main/preload.ts'])

    // LIMB FOUR — THE CHANNEL CENSUS, BY VALUE AND LIVE. Three security channels exist in the
    // shared vocabulary, and they are the three the bridge exposes.
    const vocabulary: unknown[] = [...Object.values(sharedTypes), ...Object.values(storeChannels)]
    const securityChannels = vocabulary
      .filter((value): value is string => typeof value === 'string' && /security/i.test(value))
      .sort()
    expect(securityChannels, 'the shared channel vocabulary carries exactly three security channels, and no fourth').toEqual(['provident:security:exclusion', 'provident:security:get', 'provident:security:set'])
  })

  it('ISO-5 · no file in the MCP stack’s import closure names the instance, its module or its constructor, and exactly one construction site stands outside each module', () => {
    const named = /operator-settings|operator-exclusion|createOperatorSettings|createSettingsSurface|settings-surface/
    expect(MCP_CLOSURE.length, 'the closure is computed, not hand-listed — it reaches every file the stack imports, `import type` included').toBeGreaterThan(5)
    const hits = MCP_CLOSURE.filter((file) => named.test(textOf(file)))
    expect(hits.map(rel), 'no file the MCP stack reaches names the instance, so no drive there can hold a reference to it (a module path composed at RUN TIME is invisible to this closure — the row says so rather than passing silently)').toEqual([])

    // THE CONSTRUCTION CENSUS its own behaviour.md §9 cell attributes to this row: the instance is
    // constructed in exactly one file, and that file is the surface module's; the surface is
    // constructed in exactly one file, and that file is the composition site.
    const instanceSites = ALL_SRC.filter((file) => !rel(file).startsWith('main/operator-settings/') && textOf(file).includes('createOperatorSettings('))
    expect(instanceSites.map(rel), 'the instance is constructed in exactly one file, and it is inside the surface module that holds the one reference (D-18, interface.md §5 ASM-L2-8)').toEqual(['main/settings-surface/index.ts'])

    const surfaceSites = ALL_SRC.filter((file) => !rel(file).startsWith('main/settings-surface/') && textOf(file).includes('createSettingsSurface('))
    expect(surfaceSites.map(rel), 'the surface is constructed at the composition site and nowhere else (interface.md §5)').toEqual(['main/main.ts'])
  })

  it('ISO-6 · the instance file’s name is spelled in no file the MCP stack reaches, and nothing there composes one', () => {
    const fragments = [OPERATOR_FILE, 'provident-operator', RECORD_ADDRESS, VOLATILE_ADDRESS]
    const hits: string[] = []
    for (const file of MCP_CLOSURE) {
      const text = textOf(file)
      if (fragments.some((fragment) => text.includes(fragment))) hits.push(file)
    }
    expect(hits.map(rel), 'no reachable file spells the instance’s own name or either of its addresses, so no drive can even name it').toEqual([])

    // THE COMPOSITION HALF. A path assembled at run time from pieces never appears as a literal, so
    // this limb cannot see it — it asserts what CAN be seen, and says so: the closure's own
    // `provident-*.json` literals are the two carriers other modules own, so no third name is
    // available to compose the instance's file out of (`persistence.md` §8).
    const literals = new Set<string>()
    for (const file of MCP_CLOSURE) for (const match of textOf(file).matchAll(/provident-[a-z0-9-]+\.json/g)) literals.add(match[0])
    // ⟶ RE-GRAINED UNDER `E-5` (`settings-carrier-retirement`, L1 §6/§9 E-5): **THE ALLOWED SET
    // SHRINKS FROM TWO NAMES TO ONE — `['provident-profile.json']` — AND THE CLAIM DOES NOT MOVE.**
    // `provident-settings.json` was tier 1's hand-written carrier and `main.ts` spelled it at its
    // `settingsPath`; this unit DELETED that path, the boot read, the guarded second read and the whole
    // tmp+rename+fsync writer (L1 §3's closed removal list, E-1), so the MCP closure now has ONE
    // foreign literal to allow and the retired name has none. The retirement is ASSERTED below rather
    // than assumed: a set that shrank because a name silently reappeared elsewhere would be a finding,
    // and shrinking the list without checking would make the shrink unfalsifiable.
    const allowedForeignLiterals = ['provident-profile.json']
    const foreign = [...literals].filter((name) => !allowedForeignLiterals.includes(name)).sort()
    expect(foreign, 'every `provident-*.json` literal in the stack names another module’s carrier; a third name is a finding, and a path so composed at run time would be invisible to a byte scan — which this row names rather than pretends otherwise').toEqual([])
    expect(literals.has('provident-settings.json'), 'and the RETIRED carrier’s literal stands in NO file the stack reaches — the name left the tree with the writer (L1 §3), so its absence is exactly why the allowed set could shrink').toBe(false)
  })

  it('RQ-1 · the group cannot gate a route: each data.* spelling resolves to no group, under either grant (interface.md §6)', () => {
    for (const route of DATA_ROUTES) {
      expect(groupForTool(route), `the gate's own table has no row for a bridge route: ${route}`).toBeNull()
      expect(toolAllowed(route, ['read', 'dispatch']), `with the group off the route is ungrouped, not refused: ${route}`).toBe(false)
      expect(toolAllowed(route, ['read', 'dispatch', 'data']), `with the group on it is still ungrouped: ${route}`).toBe(false)
    }
    // THE CONTROL, so the reading above is not a blanket false: the TOOL spelling IS grouped.
    expect(groupForTool('provident.data.read'), 'the tool spelling resolves to the sixth group; the route spelling does not').toBe('data')
    expect(toolAllowed('provident.data.read', ['read', 'dispatch', 'data'])).toBe(true)
  })
})
