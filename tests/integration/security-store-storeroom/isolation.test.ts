// tests/integration/security-store-storeroom/isolation.test.ts — THE L2 BATTERY for
// `security-store-storeroom`, part 3: THE SIX ISOLATION ABSENCES AND THE SETTLED ROUTE QUESTION.
//
// THE CONTRACT: docs/L1/security-store-storeroom.md §6 (`ISO-1`..`ISO-6`) and
// docs/L2/security-store-storeroom/interface.md §6 and §9 ("RQ-1"); behaviour.md §9 states every
// row's expected answer. D-18 makes the control ABSENCE, ASSERTED: each row states that nothing
// resolves, and drives that over a live surface or over the bytes of the files the MCP stack
// actually reaches — never inferred from a code read in prose.
//
// THIS FILE IMPORTS NO HALF OF THE SUBJECT. The instance module and the surface module do not
// exist yet; the absences they are the SUBJECT of are true of this tree and must stay true when
// they land (D-18, examiner.md §3). The red-before-green rows that drive the two modules are
// `instance.test.ts` and `surface.test.ts` beside this file.
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { describe, expect, it } from 'vitest'

import { createDataSurface, DATA_TOOL_NAMES } from '../../../src/main/data'
import { ProvidentMcpServer, type McpBackend } from '../../../src/main/mcp-server.js'
import { SecurityGate, groupForTool, toolAllowed, type ToolGroup } from '../../../src/main/security.js'

/** The instance's file name — interface.md §1, persistence.md §1. It is a literal here ON PURPOSE:
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

/** The seven top-level `window.provident` members as filed (`src/main/preload.ts:42-75`);
 *  interface.md §5's `A-1` records that L1 §6's "six" is the stale figure. */
const BRIDGE_MEMBERS = ['module', 'notify', 'onRequest', 'ready', 'security', 'sendReply', 'store'] as const

const MAIN_DIR = fileURLToPath(new URL('../../../src/main', import.meta.url))
const REPO = new URL('../../../', import.meta.url)

const sourceOf = (relative: string): string => readFileSync(new URL(relative, REPO), 'utf8')

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const at = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(at))
    else if (entry.name.endsWith('.ts')) out.push(at)
  }
  return out
}

/** The files the MCP stack reaches: the server, the gate, both entry hosts and the profile module. */
function mcpStackFiles(): string[] {
  return [
    join(MAIN_DIR, 'mcp-server.ts'),
    join(MAIN_DIR, 'security.ts'),
    join(MAIN_DIR, 'battery-host.ts'),
    join(MAIN_DIR, 'standalone.ts'),
    ...walk(join(MAIN_DIR, 'data')),
  ]
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

  it('ISO-3 · no RpcMethod member names a security member or the instance file, and MUTATING_METHODS stays seven', () => {
    const types = sourceOf('src/shared/types.ts')
    const block = /export type RpcMethod =([\s\S]*?)\n\n/.exec(types)
    expect(block, 'src/shared/types.ts declares the RpcMethod union').not.toBeNull()
    const members = [...(block?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1])
    expect(members, 'the union is 27 members and its order is the filed one').toEqual([...RPC_METHODS])
    for (const member of members) {
      expect(/token|enabled|exclusion|tier4|operator-settings|security/i.test(member), `no union member names the security record: ${member}`).toBe(false)
    }
    const renderer = sourceOf('src/renderer/renderer.ts')
    const mutating = /const MUTATING_METHODS = new Set\(\[([^\]]*)\]\)/.exec(renderer)
    expect(mutating, 'src/renderer/renderer.ts declares MUTATING_METHODS').not.toBeNull()
    const names = [...(mutating?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1])
    expect(names, 'the mutating set is seven, and no security write joins it').toEqual([...MUTATING])
  })

  it('ISO-4 · no bridge channel carries a security write but the three, over a seven-member bridge', () => {
    const preload = sourceOf('src/main/preload.ts')
    const start = preload.indexOf('export interface ProvidentBridge {')
    const end = preload.indexOf('\n}', start)
    expect(start, 'src/main/preload.ts declares ProvidentBridge').toBeGreaterThan(-1)
    const block = preload.slice(start, end)
    const members = [...block.matchAll(/^ {2}(\w+)(?:\(|:)/gm)].map((match) => match[1]).sort()
    expect(members, 'the bridge carries seven top-level members and gains none (interface.md §5 A-1)').toEqual([...BRIDGE_MEMBERS])
    const securityStart = block.indexOf('  security: {')
    // The interface's members close with `  }` and NO trailing comma — the commas live in the
    // implementation object below the declaration, which is outside this block. The sentinel is
    // therefore `\n  }`, and the guard below fails the row loudly if the block is mis-sliced
    // rather than letting a `-1` run the slice to the end of the interface (the over-fit this
    // row was corrected for after its first run).
    const securityEnd = block.indexOf('\n  }', securityStart)
    expect(securityStart, 'the bridge declares a `security` member').toBeGreaterThan(-1)
    expect(securityEnd, 'and its close is found inside the declaration block').toBeGreaterThan(securityStart)
    const routes = [...block.slice(securityStart, securityEnd).matchAll(/^ {4}(\w+)\(/gm)].map((match) => match[1]).sort()
    expect(routes, 'the security member carries exactly the three manual-UI routes').toEqual(['get', 'set', 'setExclusion'])
    expect(preload.split("contextBridge.exposeInMainWorld('provident'").length - 1, 'one exposure of one bridge').toBe(1)
  })

  it('ISO-5 · no MCP-stack file names the instance, its module or its constructor', () => {
    const named = /operator-settings|operator-exclusion|createOperatorSettings|createSettingsSurface|settings-surface/
    const hits: string[] = []
    for (const file of mcpStackFiles()) {
      expect(existsSync(file), `the MCP stack's file exists and is read: ${file}`).toBe(true)
      if (named.test(readFileSync(file, 'utf8'))) hits.push(file)
    }
    expect(hits, 'no file the MCP stack reaches names the instance, so no drive there can hold a reference to it').toEqual([])
  })

  it('ISO-6 · the instance file’s name is spelled in no file the MCP stack reaches', () => {
    const hits = mcpStackFiles().filter((file) => readFileSync(file, 'utf8').includes(OPERATOR_FILE))
    expect(hits, 'no reachable file spells the instance’s own name, so no drive can even name it').toEqual([])
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
