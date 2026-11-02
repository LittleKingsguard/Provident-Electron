// tests/e2e/security-store-storeroom/isolation.test.ts — THE L1 BATTERY for
// `security-store-storeroom`: the twelve e2e scenarios of `docs/L1/security-store-storeroom.md` §8,
// part 2 — S-10 and S-11, the two rows whose declared entry point is the MCP stack itself.
//
// S-10 IS `ISO-1` AND `ISO-3`; S-11 IS `ISO-2`, `ISO-4`, `ISO-5` AND `ISO-6` (L1 §6). D-18 makes the
// control ABSENCE, ASSERTED, so every limb below states that nothing resolves and drives that over a
// live surface an agent actually reaches, over the files the MCP stack's own import closure reaches,
// or over a structural census where the tree offers no runtime artifact — and each limb that can only
// be read structurally SAYS SO in its own message rather than passing silently (`examiner.md` §2).
//
// NO RED-FIRST EVIDENCE, STATED RATHER THAN IMPLIED. This battery is authored after the
// implementation and after the two module batteries are green; a red row here is a FINDING, never
// evidence about ordering (`examiner.md` §3). No existing row was weakened, skipped or deleted, and
// the two modules under these absences are NOT imported: they are the subject of the absence, and a
// row that imported them could not assert that nothing reaches them (D-18).
//
// AUTHORED FROM THE DOCUMENTS: L1 §6's six absences and §8's S-10/S-11 expectations, read on
// `interface.md` §6, `behaviour.md` §9 and `persistence.md` §8. The implementation of the two modules
// was read only for exported names; nothing below asserts an internal.
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { describe, expect, it } from 'vitest'

import { createDataSurface, DATA_TOOL_NAMES } from '../../../src/main/data'
import { createProfileStore } from '../../../src/main/storeroom.js'
import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { SecurityGate, type ToolGroup } from '../../../src/main/security.js'
import * as storeChannels from '../../../src/main/store-channels.js'
import * as sharedTypes from '../../../src/shared/types.js'

/** The instance's file name — `interface.md` §2.1, `persistence.md` §1: a literal here ON PURPOSE,
 *  because a row that imported it could not assert its absence (`ISO-6`). */
const OPERATOR_FILE = 'provident-operator-settings.json'
const RECORD_ADDRESS = 'operator-settings'
const VOLATILE_ADDRESS = 'operator-exclusion'

/** The 27 `RpcMethod` members as filed (`src/shared/types.ts:259-286`), the census `ISO-3` asserts. */
const RPC_METHODS = [
  'dispatch', 'renderedHtml', 'markdown', 'listTargets', 'nodeState', 'load', 'op', 'export',
  'validate', 'teardown', 'code.get', 'code.set', 'code.create', 'code.delete', 'code.validate',
  'code.load', 'code.loadBatch', 'journal', 'module.install', 'module.update', 'module.list',
  'focus', 'data.read', 'data.write', 'data.delete', 'data.list', 'data.journal',
] as const

/** The seven top-level `window.provident` members (`src/main/preload.ts:42-75`), `ISO-4`. */
const BRIDGE_MEMBERS = ['module', 'notify', 'onRequest', 'ready', 'security', 'sendReply', 'store', 'tabs'] as const // ⟶ D-63: eight

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

/** THE TRANSITIVE IMPORT CLOSURE of the MCP stack's own entry files over `src/**`, `import type`
 *  included: a type-only edge still names the file in the stack's declaration, which is what the two
 *  absences below are about. Bare specifiers are packages, not files in this tree (D-18). */
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
      for (const candidate of [base.replace(/\.js$/, '.ts'), `${base}.ts`, join(base, 'index.ts')]) {
        if (candidate.startsWith(SRC_DIR) && candidate.endsWith('.ts') && existsSync(candidate) && statSync(candidate).isFile()) {
          queue.push(candidate)
          break
        }
      }
    }
  }
  return [...seen].sort()
}

const MCP_CLOSURE = importClosure([
  join(MAIN_DIR, 'mcp-server.ts'),
  join(MAIN_DIR, 'security.ts'),
  join(MAIN_DIR, 'battery-host.ts'),
  join(MAIN_DIR, 'standalone.ts'),
])

/** One reader for the two lockstep `security` declaration blocks, at whatever their own indent is.
 *  It scans LINES to the member's own closing brace rather than matching the close with a regular
 *  expression: the block carries comment lines whose indentation is not the declaration's, and the
 *  reader has to survive them (`ISO-4`'s lockstep half is about the two blocks' ROUTE sets, not their
 *  commentary). */
function securityRoutesOf(source: string, label: string): string[] {
  const lines = source.split('\n')
  const start = lines.findIndex((line) => /^\s*security[?]?:\s*\{\s*$/.test(line))
  if (start === -1) throw new Error(`${label}: no \`security\` member is declared`)
  const indent = lines[start].length - lines[start].trimStart().length
  const body: string[] = []
  let closed = false
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index]
    const lead = line.length - line.trimStart().length
    if (lead === indent && line.trim() === '}') {
      closed = true
      break
    }
    body.push(line)
  }
  if (!closed) throw new Error(`${label}: the \`security\` member's close is not found at its own indent`)
  return body
    .map((line) => ({ lead: line.length - line.trimStart().length, text: line.trim() }))
    .filter((entry) => entry.lead === indent + 2)
    .map((entry) => /^(\w+)\s*\(/.exec(entry.text)?.[1])
    .filter((name): name is string => name !== undefined)
    .sort()
}

const backend: McpBackend = { invoke: async () => ({}) }

interface Live {
  server: ProvidentMcpServer
  client: Client
  profileDir: string
  close(): Promise<void>
}

/** The boundary `src/main/main.ts` composes: a gate, the server, and the declared `dataSurface`. The
 *  subject is the MCP surface an agent drives, never a stand-in for it (`examiner.md` §2). */
async function live(groups: ToolGroup[]): Promise<Live> {
  const profileDir = mkdtempSync(join(tmpdir(), 'security-store-e2e-isolation-'))
  // THE BOOT'S CONSTRUCTION, STOOD BY THIS BATTERY (`src/main/main.ts:132`): `DataSurfaceOptions.store` is REQUIRED
  // and the surface's own construction is deleted (D-80), so the drive owns one instance at the profile's one name
  // exactly as the composition does. The construction creates that name, which is why the control below asserts the
  // file's PRESENCE after a commit rather than its absence before one.
  const store = createProfileStore({ filePath: join(profileDir, 'provident-profile.json') })
  const gate = new SecurityGate({ token: null, enabled: groups })
  const server = new ProvidentMcpServer({ backend, gate, transport: 'stdio', dataSurface: createDataSurface({ profileDir, store }) })
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await server.ensureServerRegistered().connect(serverTransport)
  const client = new Client({ name: 'security-store-e2e-isolation', version: '0.0.0' })
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

describe('security-store-storeroom · the isolation absences through the MCP stack (D-18, L1 §6, §8)', () => {
  it('S-10 · ISO-1 and ISO-3: no provident.data.* tool and no RpcMethod member reaches a security member or the instance’s file', async () => {
    const { client, profileDir, close } = await live(['read', 'dispatch', 'data'])
    try {
      const listed = (await client.listTools()).tools.map((tool) => tool.name)
      for (const name of DATA_TOOL_NAMES) {
        expect(listed.includes(name), `the row needs the tool present to drive it as an agent would: ${name}`).toBe(true)
      }

      const answers: Record<string, unknown>[] = [
        await call(client, 'provident.data.list', {}),
        await call(client, 'provident.data.read', { path: ['alpha'] }),
        await call(client, 'provident.data.write', { path: ['alpha'], value: 'x' }),
        await call(client, 'provident.data.journal', {}),
        await call(client, 'provident.data.delete', { path: ['alpha'] }),
      ]

      // THE CONTROL, so the absence below is not a blanket: the drive really reached the profile
      // store, and that store owns its own file (D-16: two instances, two files).
      expect(answers[2].status, 'the third drive committed through the profile store').toBe('committed')
      expect(existsSync(join(profileDir, 'provident-profile.json')), 'the drive wrote through the profile store it booted, which owns that one file (D-80)').toBe(true)

      // THE POSITIVE HALF — the sibling's declared refusal keeps an operator-shaped path out
      // (`docs/L2/central-data/interface.md` §1; L1 §6 `ISO-1`).
      const volatile = await call(client, 'provident.data.write', { path: ['secure.token'], value: 'x' })
      expect({ status: volatile.status, reason: volatile.reason }, 'a `secure.` spelling is refused by the profile surface').toEqual({ status: 'refused', reason: 'volatile-path' })

      for (const [index, answer] of answers.entries()) {
        const text = JSON.stringify(answer)
        for (const token of [OPERATOR_FILE, RECORD_ADDRESS, VOLATILE_ADDRESS, 'tier4', 'maxJournalLength']) {
          expect(text.includes(token), `answer ${index}: no provident.data.* answer names the security record (${token})`).toBe(false)
        }
      }
      expect(existsSync(join(profileDir, OPERATOR_FILE)), 'and no drive created a byte of the instance’s own file').toBe(false)
    } finally {
      await close()
    }

    // ISO-3 — THE UNION'S CENSUS AND ITS ANSWERABILITY, the limb that makes an added member a
    // finding: every name the server registers is a union member, and every union member is answered
    // by a registered tool or by one of the renderer's own dispatch arms. The dispatch arms are not
    // exported, so THAT limb is a declaration read, and it says so.
    const types = sourceOf('src/shared/types.ts')
    const block = /export type RpcMethod =([\s\S]*?)\n\n/.exec(types)
    expect(block, 'src/shared/types.ts declares the RpcMethod union').not.toBeNull()
    const members = [...(block?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1])
    expect(members, 'the union is the filed 27, so a member naming a security write is a finding here').toEqual([...RPC_METHODS])

    const toolNames = ProvidentMcpServer.ALL_TOOLS.map((name) => name.replace(/^provident\./, ''))
    const renderer = sourceOf('src/renderer/renderer.ts')
    const arms = new Set([...renderer.matchAll(/^\s*case '([^']+)':/gm)].map((match) => match[1]))
    for (const member of members) {
      const answered = arms.has(member) || toolNames.includes(member) || ['get_rendered_html', 'get_markdown', 'list_targets', 'get_node_state'].includes(member)
      expect(answered, `no registered tool and no dispatch arm answers this member, so a member nothing answers could still be a security path: ${member} (declaration read, stated as one)`).toBe(true)
    }
    for (const forbidden of ['settings.get', 'operator.write', 'security.get', 'security.set']) {
      expect(members.includes(forbidden), `the union carries no security member: ${forbidden}`).toBe(false)
    }
  })

  it('S-11 · ISO-2, ISO-4, ISO-5 and ISO-6: the resources, the bridge, the stack’s own files and the construction census hold no reference', async () => {
    // ISO-2 — the resource seam is unmoved at three, over a live client.
    const { server, client, close } = await live(['read', 'dispatch'])
    try {
      const uris = (await client.listResources()).resources.map((resource) => resource.uri)
      const templates = (await client.listResourceTemplates()).resourceTemplates.map((template) => template.uriTemplate)
      expect([...uris, ...templates].sort(), 'exactly the three landed URIs: two fixed and one template').toEqual(['mcp://provident/app', 'mcp://provident/node/{nodeId}', 'mcp://provident/targets'])
      expect(ProvidentMcpServer.ALL_RESOURCES.map((entry) => entry.method).sort(), 'each resolves to one of the three landed readings, and none to a store').toEqual(['listTargets', 'nodeState', 'renderedHtml'])
      expect(server.allowedResourceUris().sort(), 'and the live gate allows the same three, not a fourth').toEqual(['mcp://provident/app', 'mcp://provident/node/{nodeId}', 'mcp://provident/targets'])
    } finally {
      await close()
    }

    // ISO-4 — the bridge: EIGHT top-level members (D-63 added the tab record's crossing), three security routes in BOTH lockstep halves, and
    // `ipcRenderer` obtainable from no file but the bridge.
    const preload = sourceOf('src/main/preload.ts')
    const start = preload.indexOf('export interface ProvidentBridge {')
    const end = preload.indexOf('\n}', start)
    expect(start, 'src/main/preload.ts declares ProvidentBridge').toBeGreaterThan(-1)
    const members = [...preload.slice(start, end).matchAll(/^ {2}(\w+)(?:\(|:)/gm)].map((match) => match[1]).sort()
    expect(members, 'the bridge carries eight top-level members — seven plus the tab record\'s crossing (D-63); interface.md §5 A-1').toEqual([...BRIDGE_MEMBERS])
    const preloadRoutes = securityRoutesOf(preload, 'src/main/preload.ts')
    expect(preloadRoutes, 'the security member carries exactly the three manual-UI routes').toEqual(['get', 'set', 'setExclusion'])
    expect(securityRoutesOf(sourceOf('src/renderer/secure-panels.ts'), 'src/renderer/secure-panels.ts'), 'and the renderer’s `declare global` half carries the same three').toEqual(preloadRoutes)
    expect(ALL_SRC.filter((file) => /\bipcRenderer\b/.test(textOf(file))).map(rel).sort(), 'only the preload bridge can reach a channel: no file invokes one behind its back').toEqual(['main/preload.ts'])
    const vocabulary: unknown[] = [...Object.values(sharedTypes), ...Object.values(storeChannels)]
    expect(
      vocabulary.filter((value): value is string => typeof value === 'string' && /security/i.test(value)).sort(),
      'the shared channel vocabulary carries exactly three security channels, by constant value (D-11, D-15)',
    ).toEqual(['provident:security:exclusion', 'provident:security:get', 'provident:security:set'])

    // ISO-5 — nothing in the MCP stack's closure names the instance, its module or its constructor,
    // and exactly one construction site stands outside each module (D-18; interface.md §5 ASM-L2-8).
    const named = /operator-settings|operator-exclusion|createOperatorSettings|createSettingsSurface|settings-surface/
    expect(MCP_CLOSURE.length, 'the closure is computed, not hand-listed — it reaches every file the stack imports').toBeGreaterThan(5)
    expect(MCP_CLOSURE.filter((file) => named.test(textOf(file))).map(rel), 'no file the stack reaches names the instance, so no drive there can hold a reference (a module path composed at RUN TIME is invisible to this closure, and the row says so)').toEqual([])
    expect(
      ALL_SRC.filter((file) => !rel(file).startsWith('main/operator-settings/') && textOf(file).includes('createOperatorSettings(')).map(rel),
      'the instance is constructed in exactly one file, inside the surface module that holds the one reference',
    ).toEqual(['main/settings-surface/index.ts'])
    expect(
      ALL_SRC.filter((file) => !rel(file).startsWith('main/settings-surface/') && textOf(file).includes('createSettingsSurface(')).map(rel),
      'and the surface is constructed at the composition site and nowhere else',
    ).toEqual(['main/main.ts'])

    // ISO-6 — the instance's file name, and every fragment of it, is spelled in no file the stack
    // reaches; and no third `provident-*.json` literal exists there to compose one out of.
    const fragments = [OPERATOR_FILE, 'provident-operator', RECORD_ADDRESS, VOLATILE_ADDRESS]
    const hits = MCP_CLOSURE.filter((file) => fragments.some((fragment) => textOf(file).includes(fragment)))
    expect(hits.map(rel), 'no reachable file spells the instance’s own name or either of its addresses, so no drive can even name it').toEqual([])
    const literals = new Set<string>()
    for (const file of MCP_CLOSURE) for (const match of textOf(file).matchAll(/provident-[a-z0-9-]+\.json/g)) literals.add(match[0])
    // ⟶ RE-GRAINED UNDER `E-5` (`settings-carrier-retirement`, L1 §6/§9 E-5): the allowed set SHRINKS
    // from `['provident-profile.json', 'provident-settings.json']` to `['provident-profile.json']` —
    // tier 1's carrier retired and its literal left the tree with the writer (L1 §3) — and the claim is
    // unmoved. The retirement is asserted beside it, so the shrink is falsifiable rather than assumed.
    const allowedForeignLiterals = ['provident-profile.json']
    expect(
      [...literals].filter((name) => !allowedForeignLiterals.includes(name)).sort(),
      'every `provident-*.json` literal in the stack names another module’s carrier; a path composed at run time would be invisible to a byte scan, which this row names rather than pretends otherwise',
    ).toEqual([])
    expect(literals.has('provident-settings.json'), 'and the RETIRED carrier’s literal stands in NO file the stack reaches — the name left the tree with the writer (L1 §3)').toBe(false)
  })
})
