// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/integration/central-data/registration.test.ts — THE L2 BATTERY for `central-data`, part 2:
// the group, the gate and the registration surface.
//
// Rows 9-11 of the interface's battery table (docs/L2/central-data/interface.md §4, §5, §6) driven
// through the REAL `ProvidentMcpServer` over the repo's own `@modelcontextprotocol/sdk` client on an
// in-memory linked transport: the listing is `tools/list` and the answer is the tool's own result —
// never a hand-poked handler map, never a mock of the subject.
//
// THE CONTRACT AT THIS HEAD: `src/main/data/index.ts` exists and answers; the sixth group `'data'`
// stands in BOTH live `VALID_GROUPS` copies and the five `provident.data.*` names are rows of
// `TOOL_GROUPS` (`docs/L1/central-data-census-exception.md` §2 E-1, §4: 27 tools, 27 union members,
// six groups, the default-grant subset unmoved at 8, thirteen names with `data` enabled). This file
// executes no census row of its own: it reads the listing the gate drives and the answers the five
// registrations return.
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createDataSurface, DATA_TOOL_NAMES, type DataSurface } from '../../../src/main/data'
import { createProfileStore } from '../../../src/main/storeroom.js'
import {
  EXCLUSION_CLOSED,
  EXCLUSION_CLOSED_MESSAGE,
  ProvidentMcpServer,
  type McpBackend,
} from '../../../src/main/mcp-server.js'
import { SecurityGate, type ToolGroup } from '../../../src/main/security.js'
import { tabsDeclaredRoots } from '../../../src/main/tabs-record'
import { viewDeclaredRoots } from '../../../src/main/view-record'

const PROFILE_FILE = 'provident-profile.json'

/** The `read`+`dispatch` default set — the eight names a fresh profile lists (interface §4). */
const DEFAULT_EIGHT = [
  'provident.code.get',
  'provident.code.validate',
  'provident.dispatch',
  'provident.focus',
  'provident.get_markdown',
  'provident.get_node_state',
  'provident.get_rendered_html',
  'provident.list_targets',
].sort()

let profileDir: string
let profilePath: string

beforeEach(() => {
  profileDir = mkdtempSync(join(tmpdir(), 'central-data-registration-'))
  profilePath = join(profileDir, PROFILE_FILE)
})

afterEach(() => {
  rmSync(profileDir, { recursive: true, force: true })
})

const backend: McpBackend = { invoke: async () => ({}) }

/** **THE BOOT'S CONSTRUCTION, STOOD BY THE BATTERY** (`src/main/main.ts:132`): one instance at the profile's one
 *  name, handed to the surface the way `:302` hands it. `DataSurfaceOptions.store` is REQUIRED (D-80). */
const surfaceAt = (dir: string = profileDir): DataSurface =>
  createDataSurface({ profileDir: dir, store: createProfileStore({ filePath: join(dir, PROFILE_FILE) }), declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] })

interface Live {
  server: ProvidentMcpServer
  client: Client
  close(): Promise<void>
}

/** The boundary `src/main/main.ts` composes: a gate over the declared groups, the server, and the
 *  declared `dataSurface` option (§5, ASM-L2-4). */
async function live(groups: ToolGroup[], dataSurface?: DataSurface): Promise<Live> {
  const gate = new SecurityGate({ token: null, enabled: groups })
  const server = new ProvidentMcpServer({ backend, gate, transport: 'stdio', dataSurface })
  const mcp = server.ensureServerRegistered()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await mcp.connect(serverTransport)
  const client = new Client({ name: 'central-data-battery', version: '0.0.0' })
  await client.connect(clientTransport)
  return { server, client, close: async () => { await client.close() } }
}

const listed = async (client: Client): Promise<string[]> =>
  (await client.listTools()).tools.map((tool) => tool.name).sort()

/** One tool call on the app's own request path; the answer is the tool's JSON text. */
async function call(client: Client, name: string, args: Record<string, unknown> = {}): Promise<{ result: unknown; answer: Record<string, unknown> }> {
  const result = await client.callTool({ name, arguments: args }) as unknown
  const content = (result as { content?: Array<{ type?: string; text?: string }> }).content
  const text = content?.[0]?.text ?? ''
  return { result, answer: JSON.parse(text) as Record<string, unknown> }
}

describe('central-data · the group, the gate and the registration surface', () => {
  it('the group is off → tools/list holds exactly the eight default names and none of the five data names', async () => {
    const dataSurface = surfaceAt()
    const { client, close } = await live(['read', 'dispatch'], dataSurface)
    try {
      const names = await listed(client)
      expect(names).toEqual(DEFAULT_EIGHT)
      expect(names.length, 'interface §4 — `ALL_TOOLS` grows to 27 but the default gate still lists eight').toBe(8)
      for (const name of DATA_TOOL_NAMES) {
        expect(names.includes(name), `a disabled group's tools are ABSENT from tools/list, never present-and-refusing: ${name}`).toBe(false)
      }
    } finally {
      await close()
    }
  })

  it('with [read,dispatch,data] → tools/list holds thirteen names and all five data tools answer a declared status', async () => {
    const dataSurface = surfaceAt()
    const { client, close } = await live(['read', 'dispatch', 'data'], dataSurface)
    try {
      const names = await listed(client)
      expect(names.length, 'interface §4 — with `data` enabled the listed set is thirteen').toBe(13)
      expect(names).toEqual([...DEFAULT_EIGHT, ...DATA_TOOL_NAMES].sort())
      // interface §4 — the group is TOOLS ONLY: `ALL_RESOURCES` stays at its three (two fixed
      // URIs + one template), with no `mcp://provident/data/…` mirror, so the resource seam is
      // unmoved by the sixth group (ASM-10).
      const listedUris = (await client.listResources()).resources.map((resource) => resource.uri)
      const templateUris = (await client.listResourceTemplates()).resourceTemplates.map((template) => template.uriTemplate)
      expect([...listedUris, ...templateUris].sort(), 'the resource seam gains no member with the sixth group enabled (ASM-10)').toEqual(['mcp://provident/app', 'mcp://provident/node/{nodeId}', 'mcp://provident/targets'])
      expect([...listedUris, ...templateUris].some((uri) => uri.includes('/data')), 'and no `data` mirror stands on the resource seam').toBe(false)

      const absent = await call(client, 'provident.data.read', { path: ['alpha'] })
      expect(absent.answer).toEqual({ status: 'absent', path: ['alpha'] })
      const committed = await call(client, 'provident.data.write', { path: ['alpha'], value: 'x' })
      expect(committed.answer).toEqual({ status: 'committed', path: ['alpha'], cursor: 1 })
      const read = await call(client, 'provident.data.read', { path: ['alpha'] })
      expect(read.answer).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
      const list = await call(client, 'provident.data.list', {})
      expect({ status: list.answer.status, paths: list.answer.paths, count: list.answer.count })
        .toEqual({ status: 'read', paths: [['alpha']], count: 1 })
      const journal = await call(client, 'provident.data.journal', {})
      expect({ status: journal.answer.status, count: journal.answer.count }).toEqual({ status: 'read', count: 1 })
      const removed = await call(client, 'provident.data.delete', { path: ['alpha'] })
      expect(removed.answer).toMatchObject({ status: 'committed', path: ['alpha'], removed: true })
    } finally {
      await close()
    }
  })

  it('while the exclusion tier is open → every data tool answers {status:"refused",reason:"exclusion-closed",message} and no profile byte moves', async () => {
    const dataSurface = surfaceAt()
    const { server, client, close } = await live(['read', 'dispatch', 'data'], dataSurface)
    try {
      const control = await call(client, 'provident.data.list', {})
      expect(control.answer.status, 'the POSITIVE CONTROL — with the tier closed the same call answers normally, so the reading below is not a blanket refusal').toBe('read')
      // RE-DERIVED, D-80: the boot's construction is where the one name comes into being, so the "nothing has been
      // constructed yet" half of this row is measured on the BYTES — the empty image the construction left — and the
      // refusal below must leave them exactly as they stood.
      const stood = readFileSync(profilePath)

      server.applyExclusion('mcp-disabled')

      const write = await call(client, 'provident.data.write', { path: ['alpha'], value: 'x' })
      expect(write.answer, 'interface §3/§6 — the invocation-turn refusal is `{status, reason, message}` in this module\'s own form').toEqual({ status: 'refused', reason: EXCLUSION_CLOSED, message: EXCLUSION_CLOSED_MESSAGE })
      expect((write.result as { isError?: unknown }).isError, 'the refusal is a VALUE at the tool boundary, never an MCP protocol error').toBeUndefined()
      for (const name of DATA_TOOL_NAMES) {
        const refused = await call(client, name, {})
        expect(refused.answer.reason, `every data tool refuses while the tier is open: ${name}`).toBe(EXCLUSION_CLOSED)
      }
      expect(readFileSync(profilePath).equals(stood), 'no profile byte moves while the tier is open (behaviour.md §8)').toBe(true)

      server.applyExclusion('mcp-enabled')
      const after = await call(client, 'provident.data.write', { path: ['alpha'], value: 'x' })
      expect(after.answer, 'the surface answers again once the tier is closed').toEqual({ status: 'committed', path: ['alpha'], cursor: 1 })
    } finally {
      await close()
    }
  })
})
