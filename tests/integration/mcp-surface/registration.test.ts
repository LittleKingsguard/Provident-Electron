// tests/integration/mcp-surface/registration.test.ts — THE L2 BATTERY for `mcp-surface`: the SET the
// transport publishes, driven through the module's own registration surface in one node process.
//
// AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` marker and GATES (D-40).
//
// WHAT IT DRIVES. The REAL `ProvidentMcpServer` over the repo's own `@modelcontextprotocol/sdk` client on an
// in-memory linked transport — `tools/list` is the listing and a tool call is the call — with the REAL
// registry fixture the node suite already uses for a module store (`tests/module-registry-fixture.ts`, a
// path this module's map row claims). No handler map is hand-poked and the subject is never mocked.
//
// **ONE NAMED COUPLING, WITH ITS PRICE STATED** (`modules.md` §1): `CapabilityRouter` is
// `module-system`'s class (`src/renderer/extensions.ts`), and this battery constructs one because the
// server's `router` option is typed by it. It is that module's DECLARED surface — `docs/L2/module-system/
// interface.md` §3 declares the realm half's ctx and this router as its home — and never its internals, and
// the coupling dies with the replacement `S-2b` lands.
//
// **THREE ROWS ARE RED AT THIS HEAD AND THREE ARE CONTROLS, AND THE DIFFERENCE IS STATED ROW BY ROW** (D-44,
// D-30, D-40). `I-1`/`I-2`/`I-4` measure what `docs/L1/modularity.md` §3 `S-5` and §4 `C-11` MOVE — the set
// becomes the registry's composition, an activation re-registers on the LIVE server, and the number the
// resolver judges is the one the transport reports — and they red today because the executor `U1` owes does
// not exist: `syncModuleRouter` registers DECLARED names against an echoing handler and the live server's
// REGISTRATION is built once at `createServer`, so a module installed at run time is in NO live server's
// set. They are RED-FIRST for exactly that absence, and each row's own failure message says so. `I-3`, `I-5`
// and `I-6` are CONTROLS: they measure rules this step KEEPS — the version drift control, the two-gate's
// three instants, and the composition's refusals-by-absence — so a composition rewrite that lost one reds
// here. **A CONTROL THAT IS GREEN ON ARRIVAL IS EVIDENCE OF NOTHING UNLESS ITS BITE IS NAMED, AND EACH ONE
// NAMES ITS OWN**: `I-3` bites the day the literal stops tracking the manifest, `I-5` the day a handle
// toggles by the wrong predicate, `I-6` the day a module name reaches a listing its group does not admit.
//
// WHAT IT DOES NOT MEASURE, EACH WITH ITS OWNER: the executor's own surface — admission's three refusals,
// the resolver's order, the two ctx halves, the registration frame — is `tests/integration/module-system/`'s
// (`docs/L2/module-system/interface.md` §12); the group domain becoming registered DATA is `S-8`'s, a later
// sub-unit, and no row here reads a group as a registry entry; the HTTP transport's per-POST rebuild is read
// as a construction fact and never booted (`src/main/mcp-server.ts`'s own note); the exclusion tier is
// `secure-panels`' subject and no row opens it; and no count of `ALL_TOOLS`, of a group or of a resource is
// asserted anywhere in this file — the relations are sets and absence, so no figure another document owns
// is restated here (`D-26`, `D-43`, `brief.md` §2).
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { afterAll, describe, expect, it } from 'vitest'

import { ProvidentMcpServer, syncModuleRouter, type McpBackend, type ModuleRecord } from '../../../src/main/mcp-server.js'
import { SecurityGate, type ToolGroup } from '../../../src/main/security.js'
import { CapabilityRouter } from '../../../src/renderer/extensions.js'
import { createModuleRegistry } from '../../module-registry-fixture.js'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const backend: McpBackend = { invoke: async () => ({}) }
/** **THE BUILD'S OWN VERSION, READ OFF ITS MANIFEST AND NEVER RE-SPELLED** (D-41: the site, not a literal):
 *  `I-3` holds the transport's published number to this reading, and `I-4` holds the resolver's judged
 *  number to the same one. */
const BUILD_VERSION = String((JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { version?: unknown }).version ?? '')
/** `module` is the composition's group; `code` is what a module tool's EXECUTION needs, so an install and a
 *  dynamic call both take both (`src/main/security.ts`'s `groupForTool`/`moduleToolAllowed`). */
const FULL: ToolGroup[] = ['read', 'dispatch', 'graph', 'code', 'module', 'data']
const MODULE_ONLY: ToolGroup[] = ['read', 'dispatch', 'module']

const scratch: string[] = []
afterAll(() => {
  for (const dir of scratch.splice(0)) {
    try {
      rmSync(dir, { recursive: true, force: true })
    } catch {
      /* best effort on a teardown path */
    }
  }
})

interface Live {
  server: ProvidentMcpServer
  client: Client
  close: () => Promise<void>
}
/** The boundary `src/main/main.ts` composes: a gate over the declared groups, the registry, the router and
 *  the server. `syncModuleRouter` runs BEFORE the server is built, which is the boot's own order. */
async function live(groups: ToolGroup[], options: { registry?: ReturnType<typeof createModuleRegistry>; router?: CapabilityRouter } = {}): Promise<Live & { registry: ReturnType<typeof createModuleRegistry>; router: CapabilityRouter }> {
  const dir = mkdtempSync(join(tmpdir(), 'mcp-surface-battery-'))
  scratch.push(dir)
  const registry = options.registry ?? createModuleRegistry(dir)
  const router = options.router ?? new CapabilityRouter()
  syncModuleRouter(router, registry)
  const server = new ProvidentMcpServer({ backend, gate: new SecurityGate({ token: null, enabled: groups }), transport: 'stdio', moduleStore: registry, router })
  const mcp = server.ensureServerRegistered()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await mcp.connect(serverTransport)
  const client = new Client({ name: 'mcp-surface-battery', version: '0.0.0' })
  await client.connect(clientTransport)
  return { server, client, registry, router, close: async () => { await client.close() } }
}

const listed = async (client: Client): Promise<string[]> => (await client.listTools()).tools.map((tool) => tool.name)
/** One tool call on the app's own request path; the answer is the tool's JSON text, or the protocol error. */
interface CallAnswer { ok: boolean; value: unknown; text: string }
async function call(client: Client, name: string, args: Record<string, unknown> = {}): Promise<CallAnswer> {
  try {
    const result = (await client.callTool({ name, arguments: args })) as unknown
    const content = (result as { content?: Array<{ type?: string; text?: string }> }).content
    const text = content?.[0]?.text ?? ''
    try {
      return { ok: true, value: JSON.parse(text) as unknown, text }
    } catch {
      return { ok: true, value: { __unparsable: text }, text }
    }
  } catch (error) {
    return { ok: false, value: null, text: `MCP ERROR: ${error instanceof Error ? error.message : String(error)}` }
  }
}
type Json = Record<string, unknown>
const asObject = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null
const str = (value: unknown): string | null => (typeof value === 'string' ? value : null)
const statusOf = (answer: CallAnswer): string => str(asObject(answer.value)?.['status']) ?? '(no `status` member)'

/** **THE MANIFEST A MODULE'S `source` STRING IS** (`docs/L2/module-system/interface.md` §1): name, version,
 *  the declaration, and the `entry` whose registrations are the row's subject. Every entry registers exactly
 *  what its manifest declares, so no row's fault is a declaration/registration mismatch it did not mean. */
const manifestOf = (name: string, version: string, entry: string, tools: readonly string[]): string =>
  JSON.stringify({ name, version, entry, capabilities: { tools: [...tools] } })
const ENTRY_A = 'function (ctx) { ctx.tool("probe", function () { return { from: "live-module", value: 7 } }) }'
const ENTRY_B = 'function (ctx) { ctx.tool("probeB", function () { return { from: "live-module", value: "two" } }) }'
const ENTRY_CLOCK = 'function (ctx) { ctx.tool("clock", function () { return { from: "matrix-now" } }) }'

const dynamicNames = (names: readonly string[], module: string): string[] =>
  names.filter((name) => name.startsWith(`module:${module}.`))

describe('mcp-surface — the set the transport publishes is the registry\'s composition (docs/L2/mcp-surface/interface.md §10-§12)', () => {
  it('I-1 — S-5: a module installed at run time appears in `tools/list` on the LIVE server and its own tool answers (§10, §12)', async () => {
    const { client, close } = await live(FULL)
    try {
      const before = await listed(client)
      expect(dynamicNames(before, 'live-module'), 'the precondition: no name of this module stands before the install').toEqual([])
      const installed = await call(client, 'module.install', {
        name: 'live-module',
        version: '1.0.0',
        source: manifestOf('live-module', '1.0.0', ENTRY_A, ['probe']),
      })
      expect(installed.ok, `module.install answered as a throw rather than a value: ${installed.text}`).toBe(true)
      expect(statusOf(installed), `§10 — the install's own verdict: ${installed.text}`).toBe('installed')
      // THE COMPOSITION, ON THE SERVER THAT WAS ALREADY BUILT: the registry is read ONCE at `createServer`
      // today, so a name installed afterwards reaches no listing — which is the reading this row records.
      const after = await listed(client)
      expect(dynamicNames(after, 'live-module'), `§12 — an ACTIVATION re-registers on the live server, so \`tools/list\` moves without a rebuild: ${JSON.stringify(after)}`)
        .toEqual(['module:live-module.probe'])
      // AND THE COMPOSED NAME IS THE MODULE'S OWN TOOL, not an echo of the declaration (S-1, S-2).
      const answered = await call(client, 'module:live-module.probe', {})
      expect(answered.ok, `§10 — the composed name did not answer: ${answered.text}`).toBe(true)
      expect(answered.value, `§10 — the name answers the ENTRY's registration, and the module's own value: ${answered.text}`)
        .toEqual({ from: 'live-module', value: 7 })
    } finally {
      await close()
    }
  })

  it('I-2 — S-5: an update WITHDRAWS the standing name and publishes the new one, on the SAME live server (§12)', async () => {
    const { server, client, close } = await live(FULL)
    try {
      const first = await call(client, 'module.install', { name: 'live-module', version: '1.0.0', source: manifestOf('live-module', '1.0.0', ENTRY_A, ['probe']) })
      expect(statusOf(first), `the precondition: a registration STOOD, so the withdrawal has something to withdraw: ${first.text}`).toBe('installed')
      const standing = await listed(client)
      expect(dynamicNames(standing, 'live-module'), `the standing name is published before the update: ${JSON.stringify(standing)}`).toEqual(['module:live-module.probe'])

      // THE LIVE SERVER IS THE SAME INSTANCE ACROSS BOTH ACTS: a rebuild would be a second server answering
      // the same client, and the row's subject is that the set moves WITHOUT one (`src/main/mcp-server.ts`'s
      // `createServer`/`ensureServerRegistered`).
      const serverBefore = server.ensureServerRegistered()
      const updated = await call(client, 'module.update', { name: 'live-module', version: '1.1.0', source: manifestOf('live-module', '1.1.0', ENTRY_B, ['probeB']) })
      expect(statusOf(updated), `§12 — the update's own verdict: ${updated.text}`).toBe('updated')
      expect(server.ensureServerRegistered(), '§12 — no second server: the composition moves on the one the client is already speaking to').toBe(serverBefore)

      const moved = await listed(client)
      expect(dynamicNames(moved, 'live-module'), `§12 — the withdrawn name is GONE and the new one stands: ${JSON.stringify(moved)}`).toEqual(['module:live-module.probeB'])
      const withdrawn = await call(client, 'module:live-module.probe', {})
      expect(withdrawn.ok, `§12 — a withdrawn name is absent from the surface, never present-and-refusing: ${withdrawn.text}`).toBe(false)
      const refreshed = await call(client, 'module:live-module.probeB', {})
      expect(refreshed.ok, `§12 — the updated entry answers: ${refreshed.text}`).toBe(true)
      expect(refreshed.value, `§12 — and it answers the UPDATED entry's own value: ${refreshed.text}`).toEqual({ from: 'live-module', value: 'two' })
    } finally {
      await close()
    }
  })

  it('I-3 — C-11: the number the transport publishes IS the build manifest\'s (a drift CONTROL, green at this head) (§11)', async () => {
    const { client, close } = await live(FULL)
    try {
      const published = client.getServerVersion()
      expect(str(published?.version), '§11 — the initialized `serverInfo` carries a version STRING').not.toBeNull()
      expect(
        published?.version,
        `§11 — the transport reports the ONE application-version authority, and the authority answers the number the BUILD carries ` +
          `(read here off \`package.json\`'s own \`version\` member). It reads "${String(published?.version)}" where the manifest reads "${BUILD_VERSION}". ` +
          'THIS IS A DRIFT CONTROL AND NOT A MEASUREMENT: the hard-coded literal and the manifest agree at this head (D-44), so the row is green ' +
          'on arrival and its bite is the day the literal stops tracking the manifest (D-26).',
      ).toBe(BUILD_VERSION)
    } finally {
      await close()
    }
  })

  it('I-4 — C-11/S-4: the number the resolver JUDGES is the one the transport PUBLISHED (§11)', async () => {
    const { client, close } = await live(FULL)
    try {
      const published = str(client.getServerVersion()?.version) ?? ''
      expect(published, `the transport published a version before any range was built from it: "${published}"`).not.toBe('')
      // THE PAIR IS ONE STEP WIDE: a floor AT the published number is satisfied and the SAME range made STRICT
      // is refused, so the number the resolver judged is bounded to the published one itself — any second
      // authority, one patch above it included, reds here (`C-11`, `D-44`).
      const atFloor = await call(client, 'module.install', {
        name: 'matrix-at-floor',
        version: '1.0.0',
        source: JSON.stringify({ name: 'matrix-at-floor', version: '1.0.0', entry: ENTRY_CLOCK, capabilities: { tools: ['clock'] }, requires: { app: `>=${published}` } }),
      })
      expect(statusOf(atFloor), `§11 — a floor at the PUBLISHED number must be satisfied: ${atFloor.text}`).toBe('installed')
      const above = await call(client, 'module.install', {
        name: 'matrix-above-floor',
        version: '1.0.0',
        source: JSON.stringify({ name: 'matrix-above-floor', version: '1.0.0', entry: ENTRY_CLOCK, capabilities: { tools: ['clock'] }, requires: { app: `>${published}` } }),
      })
      expect(statusOf(above), `§11 — the same range made STRICT must be refused by name: ${above.text}`).toBe('rejected')
      expect(String(asObject(above.value)?.['reason'] ?? ''), `§11 — and the refusal names the range it could not satisfy: ${above.text}`).toContain(`>${published}`)
    } finally {
      await close()
    }
  })

  it('I-5 — S-5: the two-gate\'s three instants — construction, re-gate, invocation (a CONTROL, green at this head) (§10)', async () => {
    // A REGISTRY THAT ALREADY HOLDS A MODULE, so the composition has a dynamic name to compose at construction.
    const dir = mkdtempSync(join(tmpdir(), 'mcp-surface-gate-'))
    scratch.push(dir)
    const registry = createModuleRegistry(dir)
    const record: ModuleRecord = {
      name: 'twin',
      version: '1.0.0',
      source: manifestOf('twin', '1.0.0', ENTRY_A, ['probe']),
      hash: '',
      capabilities: { tools: ['probe'] },
    }
    registry.put(record)
    const { server, client, close } = await live(FULL, { registry })
    try {
      expect(dynamicNames(await listed(client), 'twin'), '§10 — with `module`+`code` the composed name is published at construction').toEqual(['module:twin.probe'])
      expect(server.registeredEnabled('module:twin.probe'), '§10 — and its handle is enabled').toBe(true)
      expect(() => server.invokeTool('module:twin.probe', {}), '§10 — the invocation two-gate admits under both groups').not.toThrow()

      // WITHDRAW `code`: every `module.`- and `module:`-prefixed handle is TOGGLED by the PAIR — measured
      // breadth, the census door included — and a call is refused BY NAME at the invocation instant.
      server.applyGatePatch({ disable: ['code'] })
      expect(server.registeredEnabled('module:twin.probe'), '§10 — the re-gate toggles a dynamic name by `module` AND `code`').toBe(false)
      expect(dynamicNames(await listed(client), 'twin'), '§10 — and a disabled handle is ABSENT from the listing, never present-and-refusing').toEqual([])
      expect(() => server.invokeTool('module:twin.probe', {}), '§10 — the invocation two-gate refuses by naming both groups').toThrow(/module AND code/)
      expect(server.registeredEnabled('module.list'), '§10 — MEASURED BREADTH, stated rather than smoothed: the re-gate\'s predicate is `module.`- and `module:`-prefixed, so a `code` withdrawal closes the census door too').toBe(false)

      // RESTORED: the same handle answers again, which is what makes the toggle a re-gate and not a teardown.
      server.applyGatePatch({ groups: ['code'] })
      expect(server.registeredEnabled('module:twin.probe'), '§10 — a widen restores the handle on the LIVE server').toBe(true)
      expect(dynamicNames(await listed(client), 'twin'), '§10 — and the name is published again').toEqual(['module:twin.probe'])
      expect(server.registeredEnabled('module.list'), '§10 — the census door opens with it').toBe(true)
    } finally {
      await close()
    }
  })

  it('I-6 — the composition is TOOLS, and a name its group does not admit is absent (a CONTROL, green at this head) (§10)', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'mcp-surface-composition-'))
    scratch.push(dir)
    const registry = createModuleRegistry(dir)
    registry.put({ name: 'twin', version: '1.0.0', source: manifestOf('twin', '1.0.0', ENTRY_A, ['probe']), hash: '', capabilities: { tools: ['probe'] } })
    registry.put({ name: 'off', version: '1.0.0', source: manifestOf('off', '1.0.0', ENTRY_A, ['probe']), hash: '', capabilities: { tools: ['probe'] }, disabled: true })
    const admitted = await live(MODULE_ONLY, { registry })
    try {
      const names = await listed(admitted.client)
      // A DISABLED MODULE CONTRIBUTES NOTHING: `syncModuleRouter` registers only the loaded set, and the
      // composition composes what the router holds (`src/main/mcp-server.ts`'s `syncModuleRouter`).
      expect(dynamicNames(names, 'off'), '§10 — a disabled module\'s name is not in the set').toEqual([])
      // AND THE SET IS TOOLS: the resource seam is unmoved by the composition, so no `module:` URI appears
      // beside the app's own — `ALL_RESOURCES` is read whole and never counted here (`brief.md` §2).
      const uris = (await admitted.client.listResources()).resources.map((resource) => resource.uri)
      const templates = (await admitted.client.listResourceTemplates()).resourceTemplates.map((template) => template.uriTemplate)
      expect([...uris, ...templates].some((uri) => uri.includes('module')), `§10 — the composition adds no resource and no template: ${JSON.stringify([...uris, ...templates])}`).toBe(false)
      // AND WITH `module` ENABLED THE LIVE MODULE'S NAME IS COMPOSED — the positive control for the absence below.
      expect(dynamicNames(names, 'twin'), '§10 — an enabled module\'s name IS composed, so the absence below is a refusal and not a blanket one').toEqual(['module:twin.probe'])
    } finally {
      await admitted.close()
    }
    // THE BITE THE HEADER NAMES, CONSTRUCTED RATHER THAN PROMISED: the SAME registry under a grant that does
    // not admit `module` composes no dynamic name at all — `groupForTool` answers `module` by prefix and the
    // group is off, so a name reaches no listing its group does not admit (`src/main/security.ts`).
    const withheld = await live(['read', 'dispatch'], { registry })
    try {
      const names = await listed(withheld.client)
      expect(dynamicNames(names, 'twin'), '§10 — with `module` withheld the enabled module\'s name is ABSENT, and the same registry is what makes this a group reading and not a registry one').toEqual([])
      expect(names.length, '§10 — while the static set STANDS: an empty listing would satisfy the absence above for the wrong reason').toBeGreaterThan(0)
      expect(names.some((name) => name.startsWith('module:')), '§10 — no dynamic name at all, while the static set stands').toBe(false)
    } finally {
      await withheld.close()
    }
  })
})
