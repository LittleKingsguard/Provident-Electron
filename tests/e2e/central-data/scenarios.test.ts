// tests/e2e/central-data/scenarios.test.ts — THE L1 BATTERY for `central-data-management`: the
// twelve e2e scenarios of `docs/L1/central-data-management.md` §5 (S-1..S-12), one row each.
//
// THE GRAIN IS THE ENTRY POINT, NOT THE UNIT ROW. A row drives the module through the factory its L2
// declaration publishes (`createDataSurface`, `docs/L2/central-data/interface.md` §2) or through the
// real `ProvidentMcpServer` the composition site hands it (`interface.md` §5's `dataSurface` option),
// and the observable is exactly what §5's "Expected" column says — nothing finer and nothing wider
// (L1 §5; D-11, D-13; L1 §2: `tests/e2e/` is L1's own artifact, claimed by no module). Where a row's
// expectation needs the graph it is driven through the app's own producing `Runtime` under the
// layout-less DOM shim — the headless grain `src/main/battery-host.ts` already runs — and the
// real-DOM/Electron half is named as app-green in the row that carries it (`strata/brief.md` §6).
//
// NO RED-FIRST EVIDENCE, STATED RATHER THAN IMPLIED. This battery is authored AFTER the
// implementation, so no row here was ever seen red before the code existed. A red row below is a
// FINDING against the implementation or the design, never evidence about ordering (`strata/
// examiner.md` §3). No row is skipped, conditionally disabled or softened.
//
// AUTHORED FROM THE DOCUMENTS: L1 §3-§5 read on `interface.md` §1-§7, `behaviour.md` §1-§9 and
// `persistence.md` §1-§9. The implementation was read only for exported names and call shapes
// (`src/main/data/index.ts`, `surface.ts`, `store.ts`, `mcp-server.ts`). THE TWO LIMITS THIS HEAD
// IMPOSES, each named where it bites: (a) the five `provident.data.*` BRIDGE ROUTES have no answer
// site — `interface.md` §5 records them as Unlanded — so no row drives a renderer-side `data.*`
// route, and the route's one declared answer site is the `DataSurface` operation it names; (b) the
// Electron main bundle cannot boot, so no row depends on a real boot, a real IPC hop, a real socket
// transport or a layout-ful rendered view (`brief.md` §6).
import { chmodSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { createDataSurface, DATA_TOOL_NAMES, type DataSurface } from '../../../src/main/data'
import { EXCLUSION_CLOSED, ProvidentMcpServer, type McpBackend, type McpTransportKind } from '../../../src/main/mcp-server.js'
import { SecurityGate, type ToolGroup } from '../../../src/main/security.js'
import { STOREROOM_DECLARED_SURFACE } from '../../../src/main/storeroom.js'
import { Runtime } from '../../../src/renderer/runtime.js'
import { demoEnvelope } from '../../../src/shared/demo-envelope.js'
import { installShim, mountEl } from '../../../src/shared/dom-shim.js'

/** `persistence.md` §1: the module's one written name, spelled as a literal here because the row
 *  asserts its presence or its absence in a directory it seeded itself (D-13). */
const PROFILE_FILE = 'provident-profile.json'
const at = (name: string): string => join(profileDir, name)
const bytesOf = (name: string): Buffer => readFileSync(at(name))

/** The default grant's eight names — `defaultSecurityConfig()`'s `['read','dispatch']` subset, the
 *  figure L1 §3 records as unmoved by the sixth group (`interface.md` §4). */
const DEFAULT_EIGHT = ['provident.code.get', 'provident.code.validate', 'provident.dispatch', 'provident.focus',
  'provident.get_markdown', 'provident.get_node_state', 'provident.get_rendered_html', 'provident.list_targets'].sort()

/** One declared call per tool, so `tools/list` membership is never confused with answerability. */
const DECLARED_CALL: Record<string, Record<string, unknown>> = {
  'provident.data.read': { path: ['alpha'] }, 'provident.data.write': { path: ['alpha'], value: 'x' },
  'provident.data.delete': { path: ['alpha'] }, 'provident.data.list': {}, 'provident.data.journal': {},
}

let profileDir: string
beforeEach(() => { profileDir = mkdtempSync(join(tmpdir(), 'central-data-e2e-')) })
afterEach(() => { rmSync(profileDir, { recursive: true, force: true }) })
beforeAll(() => { installShim() })

const backend: McpBackend = { invoke: async () => ({}) }

/** The app's own producing graph, without a window: the backend `battery-host.ts` composes, under
 *  the layout-less shim (`brief.md` §6). Used only by the two rows whose L1 expectation is a
 *  graph reading (§5's S-4 census and S-10 view); every other row stays at the main-process grain. */
function graphBackend(): McpBackend {
  const runtime = new Runtime({ mount: mountEl() as never, envelope: demoEnvelope() as never })
  runtime.bootstrap()
  return {
    invoke: async (method, payload) => {
      switch (method) {
        case 'dispatch': return runtime.dispatch(payload as never)
        case 'renderedHtml': return runtime.renderedHtmlResult()
        case 'markdown': return runtime.markdownResult()
        case 'listTargets': return runtime.listTargets()
        case 'nodeState': return runtime.nodeState(payload as never)
        default: throw new Error(`the graph row drives no ${method}`)
      }
    },
  }
}

interface Live { server: ProvidentMcpServer; client: Client; close(): Promise<void> }

/** The boundary `src/main/main.ts` composes: a gate over the declared groups, the server and the
 *  declared `dataSurface` option (`interface.md` §5). */
async function live(groups: ToolGroup[], dataSurface: DataSurface, used: McpBackend = backend): Promise<Live> {
  const gate = new SecurityGate({ token: null, enabled: groups })
  const server = new ProvidentMcpServer({ backend: used, gate, transport: 'stdio', dataSurface })
  const mcp = server.ensureServerRegistered()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await mcp.connect(serverTransport)
  const client = new Client({ name: 'central-data-e2e', version: '0.0.0' })
  await client.connect(clientTransport)
  return { server, client, close: async () => { await client.close() } }
}

const listed = async (client: Client): Promise<string[]> =>
  (await client.listTools()).tools.map((tool) => tool.name).sort()

/** One tool call on the app's own request path, with the protocol's own error flag kept apart from
 *  the tool's answer: "absent from `tools/list`" and "present and refusing" are different facts. */
async function call(client: Client, name: string, args: Record<string, unknown> = {}): Promise<{ answer: Record<string, unknown>; isError: boolean; text: string }> {
  const result = await client.callTool({ name, arguments: args }) as unknown
  const content = (result as { content?: Array<{ type?: string; text?: string }> }).content
  const text = content?.[0]?.text ?? ''
  let answer: Record<string, unknown> = {}
  try { answer = JSON.parse(text) as Record<string, unknown> } catch { answer = {} }
  return { answer, isError: (result as { isError?: boolean }).isError === true, text }
}

const reasonOf = (answer: Record<string, unknown>): string => String(answer.reason ?? '')

/** The source tree, for the one row whose subject is the package's import census (L1 §5 S-9). */
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

describe('central-data-management · the twelve L1 scenarios through their declared entry points', () => {
  it('S-1 · a first-ever profile serves nothing: no paths, no store file, the eight default names and no data tool', async () => {
    const surface = createDataSurface({ profileDir })
    expect(surface.list({}), 'behaviour.md §1 — the cold tier answers the empty register').toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
    expect(surface.read({ path: ['anywhere'] }), 'absence is an answer, never an empty success (D-11)').toEqual({ status: 'absent', path: ['anywhere'] })
    expect(existsSync(at(PROFILE_FILE)), 'no store is constructed for a profile that is only read (D-13)').toBe(false)
    expect(readdirSync(profileDir), 'and no byte, no `.tmp` and no sidecar stands in the profile').toEqual([])

    const { client, close } = await live(['read', 'dispatch'], surface)
    try {
      expect(await listed(client), 'interface.md §4 — the default grant still lists exactly eight names').toEqual(DEFAULT_EIGHT)
      for (const name of DATA_TOOL_NAMES) expect((await listed(client)).includes(name), `an unregistered data tool cannot answer anything: ${name}`).toBe(false)
    } finally { await close() }

    // "Both transports answer": registration is transport-independent, so the reading is taken for
    // both kinds over the same gate and surface; a real socket hop and a real stdio child are
    // app-green and are NOT exercised here (`brief.md` §6).
    for (const transport of ['stdio', 'http'] as McpTransportKind[]) {
      const server = new ProvidentMcpServer({ backend, gate: new SecurityGate({ token: null, enabled: ['read', 'dispatch'] }), transport, dataSurface: surface })
      expect([...server.allowedToolNames()].sort(), `${transport}: the same eight names and no data tool`).toEqual(DEFAULT_EIGHT)
    }
  })

  it('S-2 · the group is a decision, not a default: off the five are absent rather than present-and-refusing; with data, thirteen names and all five answer', async () => {
    const off = await live(['read', 'dispatch'], createDataSurface({ profileDir }))
    try {
      const attempt = await call(off.client, 'provident.data.list', {})
      expect(attempt.isError, 'a disabled group registers nothing, so the call is answered by the protocol as an absent tool').toBe(true)
      expect(attempt.text.includes('"refused"'), 'and no refusal VALUE is minted for a tool that is not there (D-11)').toBe(false)
      expect(attempt.answer.status, 'no declared status crosses from an unregistered tool').toBeUndefined()
    } finally { await off.close() }

    const on = await live(['read', 'dispatch', 'data'], createDataSurface({ profileDir }))
    try {
      const names = await listed(on.client)
      expect(names.length, 'interface.md §4 — with `data` enabled the listed set is thirteen').toBe(13)
      expect(names, 'the eight default names plus the five data tools, and nothing else').toEqual([...DEFAULT_EIGHT, ...DATA_TOOL_NAMES].sort())
      for (const name of DATA_TOOL_NAMES) {
        const answered = await call(on.client, name, DECLARED_CALL[name])
        expect(answered.isError, `${name} answers on its own channel`).toBe(false)
        expect(['read', 'absent', 'committed'], `${name} answers one of the declared statuses (interface.md §3)`).toContain(answered.answer.status)
      }
    } finally { await on.close() }
  })

  it('S-3 · a first write commits through the store: a committed receipt, the store’s file carrying the row, the read serving it, and no .tmp residue', () => {
    const surface = createDataSurface({ profileDir })
    const receipt = surface.write({ path: ['alpha'], value: 'x' })
    expect(receipt.status, 'behaviour.md §2 — one file-tier write is the durability unit').toBe('committed')
    if (receipt.status !== 'committed') throw new Error(`the write answered ${JSON.stringify(receipt)}`)
    expect(Object.keys(receipt).sort(), 'one receipt: the path and the change’s cursor, no fifth member').toEqual(['cursor', 'path', 'status'])
    expect(Number.isInteger(receipt.cursor), 'a committed write mints one integer cursor (D-11)').toBe(true)
    expect(existsSync(at(PROFILE_FILE)), 'persistence.md §1 — the one written name this module adds stands at the declared name').toBe(true)
    const image = JSON.parse(bytesOf(PROFILE_FILE).toString('utf8')) as unknown
    expect(typeof image === 'object' && image !== null, 'the store’s own JSON image, never a hand-written shape (persistence.md §3)').toBe(true)
    expect(surface.read({ path: ['alpha'] }), 'the read serves what the commit landed, as a row').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'x' })
    expect(readdirSync(profileDir), 'no `.tmp`, no lock and no sidecar after a commit (persistence.md §5)').toEqual([PROFILE_FILE])
  })

  it('S-4 · the next process re-serves the same rows: identical read and list answers, and the census and node-id vocabulary are identical', async () => {
    const first = createDataSurface({ profileDir })
    first.write({ path: ['alpha'], value: 'x' })
    first.write({ path: ['beta'], value: 2 })
    const before = { rows: first.read({ path: ['alpha'] }), list: first.list({}) }
    // "The next process" at the envelope grain: a second construction over the same directory, which
    // is what `behaviour.md` §3 declares; a real Electron restart is app-green (`brief.md` §6).
    const second = createDataSurface({ profileDir })
    expect(second.read({ path: ['alpha'] }), 'the identical read across a new process').toEqual(before.rows)
    expect(second.list({}), 'and the identical list, with its count unmoved').toEqual(before.list)
    // The graph half, at the producing-graph grain: two boots of the app's own envelope carry the
    // same census and the same node-id vocabulary. The absolute node ids are MINTED PER PROCESS
    // (`node-1`… in each), so a same-process second boot re-mints them while the vocabulary they
    // name is unmoved; the real restart's own id reading, and the real-DOM measurement beside it,
    // stay app-green (`brief.md` §6) and this row says so rather than passing silently.
    type Target = { nodeId: string; cssId?: string; type?: string; inTree?: boolean; handlers?: Array<{ name?: string; event?: string }> }
    const reading = async (): Promise<{ census: unknown; vocabulary: unknown[]; count: number }> => {
      const { client, close } = await live(['read', 'dispatch'], createDataSurface({ profileDir }), graphBackend())
      try {
        const html = await call(client, 'provident.get_rendered_html', {})
        const nodes = ((await call(client, 'provident.list_targets', {})).answer.nodes ?? []) as Target[]
        return { census: html.answer.census, count: nodes.length,
          vocabulary: nodes.map((node) => [node.cssId ?? null, node.type ?? null, node.inTree ?? null, (node.handlers ?? []).map((handler) => `${handler.name ?? ''}/${handler.event ?? ''}`)]) }
      } finally { await close() }
    }
    const oneBoot = await reading()
    const nextBoot = await reading()
    expect(oneBoot.census, 'a rendered reading carries a census').toBeDefined()
    expect(nextBoot.census, 'the next process’s census is the same reading').toEqual(oneBoot.census)
    expect(nextBoot.count, 'the node-id vocabulary names the same number of nodes').toBe(oneBoot.count)
    expect(nextBoot.vocabulary, 'and the authored vocabulary — each node’s css id, type, tree membership and handlers — is identical, position for position').toEqual(oneBoot.vocabulary)
  })

  it('S-5 · a malformed row is refused, not swallowed: a reason word, the previous bytes intact, and the read unchanged', () => {
    const surface = createDataSurface({ profileDir })
    surface.write({ path: ['alpha'], value: 'prev' })
    const stood = bytesOf(PROFILE_FILE)
    const arms: Array<{ label: string; args: unknown }> = [
      { label: 'value absent', args: { path: ['alpha'] } },
      { label: 'an own key outside the declared set', args: { path: ['alpha'], value: 'y', extra: 1 } },
      { label: 'a sparse path', args: { path: [0, , 1], value: 1 } },
      { label: 'the whole register written at once', args: { path: [], value: { a: 1 } } },
    ]
    for (const arm of arms) {
      const answer = surface.write(arm.args) as Record<string, unknown>
      expect(answer.status, `S-5/${arm.label}: refused as a value, never a throw (interface.md §6)`).toBe('refused')
      expect(reasonOf(answer).length, `S-5/${arm.label}: the receipt carries a reason word`).toBeGreaterThan(0)
      expect(String(answer.message ?? '').length, `S-5/${arm.label}: and its own sentence beside it`).toBeGreaterThan(0)
      expect(surface.read({ path: ['alpha'] }), `S-5/${arm.label}: the read is unchanged`).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'prev' })
      expect(bytesOf(PROFILE_FILE).equals(stood), `S-5/${arm.label}: the file is byte-identical — a refusal mints no cursor and adds no change`).toBe(true)
      expect(readdirSync(profileDir), `S-5/${arm.label}: and leaves no residue`).toEqual([PROFILE_FILE])
    }
  })

  it('S-6 · a failing write leaves no tear: a refused receipt at the failing point, the previous bytes intact, and no .tmp', () => {
    const surface = createDataSurface({ profileDir })
    surface.write({ path: ['alpha'], value: 'prev' })
    const stood = bytesOf(PROFILE_FILE)
    // THE FIRST FAILING POINT — a store-level refusal, reached inside the write path: a nested write
    // does not create its parent (`behaviour.md` §2).
    const orphan = surface.write({ path: ['absent-parent', 'child'], value: 1 }) as Record<string, unknown>
    expect(orphan.status, 'the write beneath an absent parent is refused').toBe('refused')
    expect(reasonOf(orphan).length, 'with a reason word').toBeGreaterThan(0)
    expect(bytesOf(PROFILE_FILE).equals(stood), 'and nothing lands: the bytes are byte-identical').toBe(true)
    expect(surface.read({ path: ['alpha'] }), 'the standing row is untouched by the refusal').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'prev' })
    expect(readdirSync(profileDir), 'no `.tmp` stands beside the profile').toEqual([PROFILE_FILE])
    // THE SECOND FAILING POINT — the profile's name can no longer back a save: the write is refused
    // rather than torn, and the previous bytes still stand.
    chmodSync(at(PROFILE_FILE), 0o444)
    try {
      const unwritable = surface.write({ path: ['beta'], value: 'y' }) as Record<string, unknown>
      expect(unwritable.status, 'a write whose file-tier save cannot land answers a refusal').toBe('refused')
      expect(reasonOf(unwritable).length, 'naming its reason word, never a throw').toBeGreaterThan(0)
      expect(bytesOf(PROFILE_FILE).equals(stood), 'the previous bytes are intact: the store’s own rollback ran (persistence.md §5)').toBe(true)
      expect(readdirSync(profileDir), 'and no `.tmp`, no lock and no sidecar is left behind').toEqual([PROFILE_FILE])
    } finally { chmodSync(at(PROFILE_FILE), 0o644) }
    expect(surface.read({ path: ['alpha'] }), 'afterwards the profile still serves the row that stood').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'prev' })
  })

  it('S-7 · delete and journal are observable and nothing reverses: the delete answers a receipt, the journal shows the write then the delete with cursors, and no tool reverses', () => {
    const surface = createDataSurface({ profileDir })
    const written = surface.write({ path: ['alpha'], value: 'x' })
    const removed = surface.delete({ path: ['alpha'] }) as Record<string, unknown>
    expect(removed.status, 'behaviour.md §6 — a delete of a standing row commits').toBe('committed')
    expect(removed.removed, 'and says a row was actually removed').toBe(true)
    expect(removed.tiers, 'naming the tier it stood at').toEqual(['file'])
    expect(surface.read({ path: ['alpha'] }), 'then the address answers absence').toEqual({ status: 'absent', path: ['alpha'] })
    const journal = surface.journal({}) as Record<string, unknown>
    expect(journal.status, 'the journal is a reading').toBe('read')
    const entries = (journal.entries ?? []) as Array<{ cursor: number; kind: string; path: unknown[] }>
    expect(entries.map((entry) => [entry.kind, entry.path]), 'the write then the delete, in order (D-12)').toEqual([['write', ['alpha']], ['delete', ['alpha']]])
    expect(entries.every((entry) => Number.isInteger(entry.cursor)), 'each entry carries a cursor').toBe(true)
    expect(entries[1].cursor > entries[0].cursor, 'and the cursors ascend').toBe(true)
    if (written.status === 'committed') expect(entries[0].cursor, 'the first entry carries the cursor the write answered').toBe(written.cursor)
    expect(journal.count, 'count is the number of entries, and no value rides a journal entry').toBe(2)
    // D-12 — nothing on this surface reverses: no tool name and no data tool name offers one.
    const reversal = /(undo|rollback|replay|revert|inverse|reverse)/i
    for (const name of [...ProvidentMcpServer.ALL_TOOLS, ...DATA_TOOL_NAMES]) expect(reversal.test(name), `no tool offers a reversal of a committed change: ${name}`).toBe(false)
  })

  it('S-8 · volatile keys never persist: all four tier spellings are driven, the three volatile ones are refused, and the file carries none', () => {
    const surface = createDataSurface({ profileDir })
    expect(surface.write({ path: ['file.kept'], value: 'durable' }).status, 'the durable spelling lands, so the absence below is not a blanket').toBe('committed')

    for (const spelling of ['mem.cache', 'temp.scratch', 'secure.vault']) {
      for (const answer of [surface.write({ path: [spelling], value: 'x' }), surface.read({ path: [spelling] }), surface.delete({ path: [spelling] })]) {
        expect({ status: (answer as Record<string, unknown>).status, reason: reasonOf(answer as Record<string, unknown>) }, `${spelling}: refused as a value, never silently dropped (behaviour.md §7)`).toEqual({ status: 'refused', reason: 'volatile-path' })
      }
    }
    expect(surface.list({}).status, 'list is unmoved by the volatile attempts').toBe('read')
    const text = bytesOf(PROFILE_FILE).toString('utf8')
    for (const spelling of ['mem.', 'temp.', 'secure.']) expect(text.includes(spelling), `the store’s file carries no ${spelling} spelling after a session that used all four tiers`).toBe(false)
    expect(text.includes('file.kept'), 'and the durable row is the one it does carry').toBe(true)
  })

  it('S-9 · the package is never modified: the seam’s census stands at fourteen members and eleven symbols, and the package is imported in exactly two files outside src/main/data/', () => {
    expect(STOREROOM_DECLARED_SURFACE.memberCount, 'L1 §5 S-9 — the seam census row reads fourteen members').toBe(14)
    expect(STOREROOM_DECLARED_SURFACE.members.length, 'and the declared member list is that length, so a growth fails here rather than silently').toBe(14)
    expect(STOREROOM_DECLARED_SURFACE.symbolCount, 'and eleven own symbols').toBe(11)
    const importers = walk(SRC).filter((file) => readFileSync(file, 'utf8').includes("from 'provident-storeroom'")).map(rel).sort()
    expect(importers, 'L1 §5 S-9 — the package is imported in exactly the seam and the operator-settings instance').toEqual(['main/operator-settings/index.ts', 'main/storeroom.ts'])
    expect(importers.filter((file) => file.startsWith('main/data/')), 'and nowhere under src/main/data/: this module reaches the store through the seam').toEqual([])
    expect(walk(join(SRC, 'main', 'data')).filter((file) => readFileSync(file, 'utf8').includes('provident-storeroom')).map(rel), 'no file of this module spells the package at all').toEqual([])
  })

  it('S-10 · the data view is agent-visible, drivable and graph-driven: its elements carry data-node-id, a dispatch answers the four-member record, and a change shows in get_markdown', async () => {
    // THE LIMIT THIS ROW CARRIES, STATED: L1 §5 S-10 declares a rendered data view in the app graph,
    // while `interface.md` §7 declares this module renders nothing and adds no graph node, and the
    // tree at this head carries no data view. The row drives the app's own producing graph under the
    // shim (the grain of `src/main/battery-host.ts`), so the real-DOM half is app-green — and the
    // view's absence is the finding, never a missing row.
    const { client, close } = await live(['read', 'dispatch', 'data'], createDataSurface({ profileDir }), graphBackend())
    try {
      const written = await call(client, 'provident.data.write', { path: ['alpha'], value: 'shown-in-the-view' })
      expect(written.answer.status, 'the row is committed before the view is read, so nothing below depends on a cold profile').toBe('committed')
      const markdown = await call(client, 'provident.get_markdown', {})
      expect(String(markdown.answer.markdown ?? '').includes('shown-in-the-view'), 'L1 §5 S-10 — a committed row shows in get_markdown through the rendered view. FINDING: no data view stands in the app’s envelope at this head, and L2 interface.md §7 declares this module renders nothing').toBe(true)

      const html = await call(client, 'provident.get_rendered_html', {})
      const rendered = String(html.answer.renderedHtml ?? '')
      const elements = [...rendered.matchAll(/<([a-z][\w-]*)(\s[^>]*)?>/gi)].map((match) => match[0])
      expect(elements.some((element) => element.includes('data-node-id') && /data-(row|view|profile)|>shown-in-the-view</i.test(element)), 'L1 §5 S-10 — every element of the data view carries data-node-id, so the agent can name and drive one').toBe(true)

      const targets = await call(client, 'provident.list_targets', {})
      const nodes = (targets.answer.nodes ?? []) as Array<{ nodeId: string }>
      expect(nodes.length, 'the view’s nodes are the producing graph’s own targets, not hand-written DOM').toBeGreaterThan(0)
      const dispatched = await call(client, 'provident.dispatch', { target: nodes[nodes.length - 1].nodeId, event: 'click' })
      expect(Object.keys(dispatched.answer).sort(), 'L1 §5 S-10 — a dispatch on a data-view element answers the four-member record').toEqual(['dirtied', 'renderedHtml', 'results', 'ssrHtml'])
    } finally {
      await close()
    }
  })

  it('S-11 · nothing crosses while the tier is open: the declared refusal as a value on a data tool and on a resource read, and no profile write', async () => {
    const { server, client, close } = await live(['read', 'dispatch', 'data'], createDataSurface({ profileDir }))
    try {
      const control = await call(client, 'provident.data.list', {})
      expect(control.answer.status, 'the POSITIVE CONTROL — with the tier closed the same call answers normally, so the reading below is not a blanket refusal').toBe('read')

      server.applyExclusion('mcp-disabled')
      for (const name of DATA_TOOL_NAMES) {
        const refused = await call(client, name, DECLARED_CALL[name])
        expect({ status: refused.answer.status, reason: refused.answer.reason }, `${name}: the declared refusal as a VALUE`).toEqual({ status: 'refused', reason: EXCLUSION_CLOSED })
        expect(String(refused.answer.message ?? '').length, `${name}: carrying the server-authored message, never an MCP protocol error`).toBeGreaterThan(0)
      }
      const resource = await client.readResource({ uri: 'mcp://provident/app' })
      const text = String((resource.contents?.[0] as { text?: string } | undefined)?.text ?? '')
      expect(text.includes(EXCLUSION_CLOSED), 'a resource read answers the same refusal as a value at the same turn (behaviour.md §8)').toBe(true)
      expect(existsSync(at(PROFILE_FILE)), 'no profile byte moves while the tier is open').toBe(false)
      expect(readdirSync(profileDir), 'and no store is constructed at that turn').toEqual([])
    } finally { await close() }
  })

  it('S-12 · two profiles are disjoint and a corrupt image recovers by declaration: the cold tier answers, the process boots, and the next commit replaces the bytes', () => {
    const other = mkdtempSync(join(tmpdir(), 'central-data-e2e-other-'))
    try {
      const a = createDataSurface({ profileDir })
      const b = createDataSurface({ profileDir: other })
      expect(a.write({ path: ['alpha'], value: 'only-a' }).status, 'the first profile commits its own row').toBe('committed')
      expect(a.read({ path: ['alpha'] })).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'only-a' })
      expect(b.read({ path: ['alpha'] }), 'and the second profile never serves it (behaviour.md §9)').toEqual({ status: 'absent', path: ['alpha'] })
      const bList = b.list({})
      expect({ status: bList.status, count: bList.status === 'read' ? bList.count : null }, 'their lists are disjoint').toEqual({ status: 'read', count: 0 })
      expect(existsSync(join(other, PROFILE_FILE)), 'two profiles, two files').toBe(false)
    } finally { rmSync(other, { recursive: true, force: true }) }

    // A FOREIGN image each answers the cold tier, boots, and is replaced by the next commit — the
    // recovery arm `persistence.md` §9 P-1 measures (D-13, D-5). THE ARM'S OWN BOUND, STATED: the
    // store's image IS a register (a flat JSON object of address → value), so no object-shaped image
    // is foreign to it — the seeds below are the images that are not one, which is the only reading
    // of "foreign-keyed" this head can carry (`docs/L2/central-data/behaviour.md` §9).
    const seeds = [
      { label: 'unparsable', bytes: '{"alpha":' }, { label: 'not-json', bytes: "this is not the store's image\n" },
      { label: 'foreign-array', bytes: '[1,2]' },
    ]
    for (const seed of seeds) {
      const dir = mkdtempSync(join(tmpdir(), 'central-data-e2e-corrupt-'))
      try {
        writeFileSync(join(dir, PROFILE_FILE), seed.bytes)
        const surface = createDataSurface({ profileDir: dir })
        expect(surface.list({}), `S-12/${seed.label}: the cold tier, not a refusal and not a throw`).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
        expect(surface.read({ path: ['alpha'] }), `S-12/${seed.label}: absence is the answer`).toEqual({ status: 'absent', path: ['alpha'] })
        expect(readFileSync(join(dir, PROFILE_FILE), 'utf8'), `S-12/${seed.label}: the foreign bytes stand untouched until a commit`).toBe(seed.bytes)
        expect(surface.write({ path: ['alpha'], value: 'recovered' }).status, `S-12/${seed.label}: the next commit commits`).toBe('committed')
        expect(surface.read({ path: ['alpha'] }), `S-12/${seed.label}: and serves the row it landed`).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: 'recovered' })
        expect(readFileSync(join(dir, PROFILE_FILE), 'utf8'), `S-12/${seed.label}: the commit replaced the bytes`).not.toBe(seed.bytes)
      } finally { rmSync(dir, { recursive: true, force: true }) }
    }
  })
})
