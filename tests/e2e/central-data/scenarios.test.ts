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
// **THE READ'S PASSING `value` IS THE RELEASE'S OWN NODE, AND THIS BATTERY PINS THAT NODE** (`D-134`): `data.read`
// answers `{status, kind, path, value}` with `value` a `TieredNode` — a LEAF `{_tier, value:<literal>}` (and
// `kind:'row'` with it), an OBJECT `{_tier, …members}` with its members INLINE and no `value` wrapper, and an
// ARRAY `{_tier, value:[…]}` whose elements are nodes — so the four rows that serve a stood row (`S-3`, `S-5`,
// `S-6`, `S-12`) expect it BY EQUALITY, and a bare literal, a wrapper on the object node, a double-wrapped leaf
// or a missing `_tier` reds them. `S-4` compares one answer with another and takes no grain of its own; the
// `absent` arm carries NO node, so every absence below (`S-1`, `S-7`, `S-12`) is unmoved; and `S-9`'s census row
// is unmoved. **NO ROW'S CLAIM MOVES WITH THE GRAIN** — the six pinned answers are the same six answers, now
// naming the node the release declares — so no row is re-subjected and none needs a re-titled claim.
//
// EVERY ROW STANDS THE BOOT FIRST, BECAUSE THE PRODUCT HAS NO SURFACE WITHOUT ONE (D-80). `store` is
// a REQUIRED member of `DataSurfaceOptions` and the surface's fallback construction is deleted, so a
// row that handed the surface a directory and no instance would be measuring a shape the product no
// longer has. `boot()` below is the boot's own construction (`src/main/main.ts`'s `createProfileStore` site) —
// one instance at the profile's one name — and `surfaceAt()` is that instance's pass into `createDataSurface`
// at the composition's own call site (D-80, D-41: the sites, not an offset). **WHAT THAT MOVED, AND WHAT IT DID NOT**: a
// constructed store creates its `filePath` at its own construction, so the reading answers `occupied`
// over an EMPTY register. Claims that a first-ever profile serves NO PATH and that an unwritten path
// answers `absent` therefore stand unchanged — `read` distinguishes a name that holds no row from a
// register that holds no row — while the claims that a first-ever profile has NO STORE FILE, and that
// nothing stands in the profile directory, are states this product no longer has: each was re-derived
// to the state it does have (the one name stands and is EMPTY, and no `.tmp`, lock or sidecar stands
// beside it), never dropped and never loosened (D-80).
//
// AUTHORED FROM THE DOCUMENTS: L1 §3-§5 read on `interface.md` §1-§6, `behaviour.md` §1-§9 and
// `persistence.md` §1-§9. The implementation was read only for exported names and call shapes
// (`src/main/data/index.ts`, `surface.ts`, `store.ts`, `mcp-server.ts`). **THE TWO LIMITS THIS
// BATTERY WAS AUTHORED UNDER HAVE BOTH LIFTED, AND WHAT REMAINS IS A SCOPE AND NOT A GAP**: the five
// `provident.data.*` BRIDGE ROUTES are ANSWERED at this head (`D-112`), so no row here drives a
// renderer-side `data.*` route because that boundary is `tests/integration/central-data/
// bridge-route.test.ts`'s — gating and unmarked (`D-40`); and the Electron main bundle BOOTS, so no
// row here depends on a real boot, a real IPC hop, a real socket transport or a layout-ful rendered
// view because those are `tests/e2e/bundle-boot-seam/`'s and the two spawning batteries' — a boot
// green is a process green, never a rendered-surface one (`brief.md` §6, D-27).
import { chmodSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { createDataSurface, DATA_TOOL_NAMES, type DataSurface } from '../../../src/main/data'
import { EXCLUSION_CLOSED, ProvidentMcpServer, type McpBackend, type McpTransportKind } from '../../../src/main/mcp-server.js'
import { SecurityGate, type ToolGroup } from '../../../src/main/security.js'
import { createProfileStore, STOREROOM_DECLARED_SURFACE } from '../../../src/main/storeroom.js'
import { tabsDeclaredRoots } from '../../../src/main/tabs-record'
import { viewDeclaredRoots } from '../../../src/main/view-record'
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

/** **THE SURFACE'S INSTANCE, STOOD BY THE ROW** (`src/main/main.ts`'s `createProfileStore` site hands the surface
 *  its store the same way, at the composition's own call site — D-41: the sites): ONE store at the profile's one
 *  name, which brings that name into being exclusively and, with no
 *  constraint list, holds an empty register until a write lands. It is the only way to stand a surface at
 *  all — `DataSurfaceOptions.store` is required — so every row below begins here rather than at a bare
 *  directory (D-80). **IT IS NOT THE APP'S BOOT**: `main.ts` batches six tab-record declarations into that
 *  construction, and `tabs-must-stand`'s repair writes (and, from `1.9.1`, saves) the landing record, so the
 *  app's own profile is `160` bytes before any commit (measured 2026-11-03; `D-86`). */
function boot(dir: string = profileDir) {
  return createProfileStore({ filePath: join(dir, PROFILE_FILE) })
}

/** The composition `src/main/main.ts`'s `createDataSurface` call site performs (D-41: the site): the directory the
 *  reading names, the instance the caller
 *  already owns, and **the declared roots the two crossings publish** (`D-101`) — three arguments, two of them
 *  required, and no fourth way in. The roots are the app's own, imported from the modules that declare them and
 *  never re-spelled here (`D-53`), so every row below drives the address space the product has (D-80, D-101). */
function surfaceAt(dir: string = profileDir): DataSurface {
  return createDataSurface({ profileDir: dir, store: boot(dir), declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] })
}

/** The app's own producing graph, without a window: the backend `battery-host.ts` composes, under
 *  the layout-less shim (`brief.md` §6). Used only by the two rows whose L1 expectation is a
 *  graph reading (§5's S-4 census and S-10 rendered-surface invariance); every other row stays at
 *  the main-process grain. */
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
  it('S-1 · a first-ever profile serves nothing: the boot’s store answers the empty register, its one name stands EMPTY, the eight default names and no data tool', async () => {
    const surface = surfaceAt()
    expect(surface.list({}), 'behaviour.md §1 — the open register answers with no path').toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
    expect(surface.read({ path: ['anywhere'] }), 'absence is an answer, never an empty success (D-11)').toEqual({ status: 'absent', path: ['anywhere'] })
    // RE-DERIVED, D-80. This row used to assert that NO store file stood after a read, which was the cold
    // tier of a surface that constructed on demand. The product has no such state: the boot constructs the one
    // instance, that construction creates the name exclusively, and the reading therefore answers `occupied`.
    // What is still owed — and is the stronger reading of the same sentence — is that NOTHING HAS LANDED IN IT:
    // the name stands at zero length, so the "no path" above is an empty register and not a missing store.
    expect(existsSync(at(PROFILE_FILE)), 'the construction is what brings the one name into being (D-80)').toBe(true)
    // **THE DEATH OF THIS ROW'S OLD CLAIM, NAMED: `1.9.1` SETTLES A REGISTRATION INSTANT'S `file` WRITE INTO THE FILE, SO
    // THE APP'S OWN BOOT NO LONGER LEAVES AN EMPTY PROFILE** (measured 2026-11-03: `160` bytes — the landing-seated tab
    // record, written by `tabs-must-stand`'s repair while the store holder is still null). What stands here is the
    // SURFACE'S OWN instance, stood by `boot()` with NO constraint list, and *for that construction* the reading is
    // unmoved: an open register and no byte in it — which is the row's subject (the surface's answers), the boot's
    // bytes being `tests/integration/central-data/profile-file.test.ts`'s `THE APP'S OWN BOOT` row.
    expect(statSync(at(PROFILE_FILE)).size, 'and THIS bare instance holds no byte: an open register, never an absent store').toBe(0)
    expect(readdirSync(profileDir), 'no `.tmp`, no lock and no sidecar stands beside the one name (persistence.md §5)').toEqual([PROFILE_FILE])

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
    const off = await live(['read', 'dispatch'], surfaceAt())
    try {
      const attempt = await call(off.client, 'provident.data.list', {})
      expect(attempt.isError, 'a disabled group registers nothing, so the call is answered by the protocol as an absent tool').toBe(true)
      expect(attempt.text.includes('"refused"'), 'and no refusal VALUE is minted for a tool that is not there (D-11)').toBe(false)
      expect(attempt.answer.status, 'no declared status crosses from an unregistered tool').toBeUndefined()
    } finally { await off.close() }

    const on = await live(['read', 'dispatch', 'data'], surfaceAt())
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
    const surface = surfaceAt()
    const receipt = surface.write({ path: ['alpha'], value: 'x' })
    expect(receipt.status, 'behaviour.md §2 — one file-tier write is the durability unit').toBe('committed')
    if (receipt.status !== 'committed') throw new Error(`the write answered ${JSON.stringify(receipt)}`)
    // **THE RECEIPT'S MEMBER SET MOVED WITH `D-103` AND IT MOVED BY A RULING, NOT BY DRIFT**: `repaired` and `log` join
    // the two members this row has pinned since it was filed, so the census below is RE-DERIVED to the answer the
    // surface now gives — five members here where it asserted three, and the assertion is still a census of the WHOLE
    // key set, so a sixth member still reds this row.
    expect(Object.keys(receipt).sort(), 'one receipt: the path, the change’s cursor, the repair verdict and the commit’s log — no sixth member').toEqual(['cursor', 'log', 'path', 'repaired', 'status'])
    expect([receipt.repaired, receipt.log.map((entry) => entry.kind)], 'the pass this bare store ran: one entry, the commit, and nothing repaired').toEqual([false, ['commit']])
    expect(Number.isInteger(receipt.cursor), 'a committed write mints one integer cursor (D-11)').toBe(true)
    expect(existsSync(at(PROFILE_FILE)), 'persistence.md §1 — the one written name this module adds stands at the declared name').toBe(true)
    const image = JSON.parse(bytesOf(PROFILE_FILE).toString('utf8')) as unknown
    expect(typeof image === 'object' && image !== null, 'the store’s own JSON image, never a hand-written shape (persistence.md §3)').toBe(true)
    expect(surface.read({ path: ['alpha'] }), 'the read serves what the commit landed, as a row — the LEAF node the release declares, the literal wrapped exactly once (D-134)').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'x' } })
    expect(readdirSync(profileDir), 'no `.tmp`, no lock and no sidecar after a commit (persistence.md §5)').toEqual([PROFILE_FILE])
  })

  it('S-4 · the next process re-serves the same rows: identical read and list answers, and the census and node-id vocabulary are identical', async () => {
    const first = surfaceAt()
    first.write({ path: ['alpha'], value: 'x' })
    first.write({ path: ['beta'], value: 2 })
    const before = { rows: first.read({ path: ['alpha'] }), list: first.list({}) }
    // "The next process" at the envelope grain: a second BOOT over the same directory — a second
    // instance constructed at the same one name, which adopts the bytes the first one left — and a
    // second surface over it. That is what `behaviour.md` §3 declares; a real Electron restart is
    // app-green (`brief.md` §6).
    const second = surfaceAt()
    expect(second.read({ path: ['alpha'] }), 'the identical read across a new process').toEqual(before.rows)
    expect(second.list({}), 'and the identical list, with its count unmoved').toEqual(before.list)
    // The graph half, at the producing-graph grain: two boots of the app's own envelope carry the
    // same census and the same node-id vocabulary. The absolute node ids are MINTED PER PROCESS
    // (`node-1`… in each), so a same-process second boot re-mints them while the vocabulary they
    // name is unmoved; the real restart's own id reading, and the real-DOM measurement beside it,
    // stay app-green (`brief.md` §6) and this row says so rather than passing silently.
    type Target = { nodeId: string; cssId?: string; type?: string; inTree?: boolean; handlers?: Array<{ name?: string; event?: string }> }
    const reading = async (): Promise<{ census: unknown; vocabulary: unknown[]; count: number }> => {
      const { client, close } = await live(['read', 'dispatch'], surfaceAt(), graphBackend())
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
    const surface = surfaceAt()
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
      expect(surface.read({ path: ['alpha'] }), `S-5/${arm.label}: the read is unchanged — the same standing LEAF node, and a refusal mints none`).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'prev' } })
      expect(bytesOf(PROFILE_FILE).equals(stood), `S-5/${arm.label}: the file is byte-identical — a refusal mints no cursor and adds no change`).toBe(true)
      expect(readdirSync(profileDir), `S-5/${arm.label}: and leaves no residue`).toEqual([PROFILE_FILE])
    }
  })

  it('S-6 · a failing write leaves no tear: a refused receipt at the failing point, the previous bytes intact, and no .tmp', () => {
    const surface = surfaceAt()
    surface.write({ path: ['alpha'], value: 'prev' })
    const stood = bytesOf(PROFILE_FILE)
    // THE FIRST FAILING POINT — a store-level refusal, reached inside the write path: a nested write
    // does not create its parent (`behaviour.md` §2).
    const orphan = surface.write({ path: ['absent-parent', 'child'], value: 1 }) as Record<string, unknown>
    expect(orphan.status, 'the write beneath an absent parent is refused').toBe('refused')
    expect(reasonOf(orphan).length, 'with a reason word').toBeGreaterThan(0)
    expect(bytesOf(PROFILE_FILE).equals(stood), 'and nothing lands: the bytes are byte-identical').toBe(true)
    expect(surface.read({ path: ['alpha'] }), 'the standing row is untouched by the refusal — asserted as the node, so a refusal that re-minted one reads here').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'prev' } })
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
    expect(surface.read({ path: ['alpha'] }), 'afterwards the profile still serves the row that stood — the same LEAF node, still at `file`').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'prev' } })
  })

  it('S-7 · delete and journal are observable and nothing reverses: the delete answers a receipt, the journal shows the write then the delete with cursors, and no tool reverses', () => {
    const surface = surfaceAt()
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
    const surface = surfaceAt()
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

  it('S-9 · the package is never modified: the seam’s census stands at FIFTEEN members and THIRTEEN symbols, and the package is imported in exactly three files — the seam, the operator-settings instance and the tab record’s own instance — none of them under src/main/data/', () => {
    // **FIFTEEN AT `1.10.0`** (`D-134`): the third read verb `readTiered` is the first name that release has added since
    // the seam was pinned, and the census is the row that makes a silent growth fail here rather than pass.
    expect(STOREROOM_DECLARED_SURFACE.memberCount, 'L1 §5 S-9 — the seam census row reads fifteen members').toBe(15)
    expect(STOREROOM_DECLARED_SURFACE.members.length, 'and the declared member list is that length, so a growth fails here rather than silently').toBe(15)
    // **THE SYMBOL FIGURE MOVED WITH `1.9.1`: twelve at `1.9.0`, THIRTEEN at the installed tree, the thirteenth being
    // `Symbol(provident-storeroom.registration-save)`** — the marker the release that rolls a refusing registration
    // back mints at construction (measured 2026-11-03 on both installed trees, one fresh instance each; the two lists
    // match member for member apart from it). The string list is unmoved, which is why the figure below is the only
    // one this release moves here.
    expect(STOREROOM_DECLARED_SURFACE.symbolCount, 'and thirteen own symbols at construction').toBe(13)
    const importers = walk(SRC).filter((file) => readFileSync(file, 'utf8').includes("from 'provident-storeroom'")).map(rel).sort()
    expect(importers, 'L1 §5 S-9 — the package is imported in exactly the seam, the operator-settings instance and (D-63) the tab record\'s own instance').toEqual(['main/operator-settings/index.ts', 'main/storeroom.ts', 'main/tabs-record/index.ts'])
    expect(importers.filter((file) => file.startsWith('main/data/')), 'and nowhere under src/main/data/: this module reaches the store through the seam').toEqual([])
    expect(walk(join(SRC, 'main', 'data')).filter((file) => readFileSync(file, 'utf8').includes('provident-storeroom')).map(rel), 'no file of this module spells the package at all').toEqual([])
    // THE CONSTRUCTION CENSUS (D-80). Reaching the package through the seam was never the whole of it: the surface
    // could reach the seam's construction and open a `provident-profile.json` of its own, which the import census
    // above is blind to by construction. It cannot now. The needle is a VALUE import of the construction — the
    // binding inside an `import { … }` statement — because a TYPE position is erased at build and opens nothing:
    // `store.ts` keeps the name in `import type` and in `ReturnType<typeof createProfileStore>`, and `journal.ts`
    // keeps a value import of `DEFAULT_JOURNAL_LENGTH`, which is no construction. A `constructStore` reintroduced
    // in this module would have to bind the construction as a value, and that reddens THIS line.
    expect(walk(join(SRC, 'main', 'data')).filter((file) => /import\s*\{[^}]*\bcreateProfileStore\b[^}]*\}\s*from/.test(readFileSync(file, 'utf8'))).map(rel), 'the module holds no construction: `DataSurfaceOptions.store` is REQUIRED and the fallback is deleted rather than left unreachable (D-80)').toEqual([])
    // AND THE TYPING, WHICH IS THE HALF NO GREP CAN SEE — the state that made a second store reachable was an
    // OPTIONAL member, so the deletion is a compile-time fact before it is anything else. The closure below is never
    // called: `typecheck:tests` reds on it twice over, once if the omission stops being an error (TS2578, the
    // directive unused) and once if the directive or the line is removed.
    const withoutAnInstance = (): DataSurface => {
      // @ts-expect-error — D-80: `DataSurfaceOptions.store` is REQUIRED. A surface with a directory and no instance
      // does not compile, so no caller is one line away from a second store.
      return createDataSurface({ profileDir })
    }
    expect(typeof withoutAnInstance, 'the omitted-instance construction is a COMPILE fault, refused by `typecheck:tests` and never run (D-80)').toBe('function')
  })

  it('S-10 · this unit declares no rendered data view: a commit moves no rendered surface, mints no node, and the graph a view would ride answers a four-member dispatch', async () => {
    // THE RULING THIS ROW CARRIES (L1 §7 ASM-12): this unit's e2e surface declares NO rendered data
    // view. D-11 gives the unit five tools that answer values; D-12 keeps every operator-visible
    // surface — the undo unit's provident-authored UI — for a unit of its own, with its own surface
    // decision; `interface.md` §7's "AND IT RENDERS NOTHING" bullet measures the same. The rendered data pane is OWED, not built, so
    // the observable here is the invariance the landed module owes: a commit through
    // `provident.data.write` adds no graph node and moves no rendered reading, while the app's own
    // producing graph — the only road a data view may ever ride (UI authority, `brief.md` §2) —
    // still names its targets and answers a dispatch. The row drives that graph under the
    // layout-less shim (the grain of `src/main/battery-host.ts`); the real-DOM half of any owed pane
    // is app-green and is not claimed here (`brief.md` §6).
    const { client, close } = await live(['read', 'dispatch', 'data'], surfaceAt(), graphBackend())
    try {
      type Target = { nodeId: string }
      const reading = async (): Promise<{ rendered: string; markdown: string; nodes: Target[] }> => ({
        rendered: String((await call(client, 'provident.get_rendered_html', {})).answer.renderedHtml ?? ''),
        markdown: String((await call(client, 'provident.get_markdown', {})).answer.markdown ?? ''),
        nodes: ((await call(client, 'provident.list_targets', {})).answer.nodes ?? []) as Target[],
      })
      const carriersOf = (rendered: string): number =>
        [...rendered.matchAll(/<[a-z][\w-]*(\s[^>]*)?>/gi)].filter((match) => (match[1] ?? '').includes('data-node-id')).length

      const before = await reading()
      expect(before.nodes.length, 'the app’s own envelope stands before the commit, so the invariance below is not a vacuous reading').toBeGreaterThan(0)
      expect(carriersOf(before.rendered), 'and its elements carry data-node-id — the attribute vocabulary an owed data view inherits rather than invents').toBeGreaterThan(0)

      const written = await call(client, 'provident.data.write', { path: ['alpha'], value: 'no-view-in-this-unit' })
      expect(written.answer.status, 'a landed change is measured, so the readings below are taken against a committed row (D-11)').toBe('committed')

      const after = await reading()
      expect(after.rendered, 'interface.md §7 — a commit adds no graph node, so the rendered reading is byte-identical across it').toBe(before.rendered)
      expect(carriersOf(after.rendered), 'and no element carrying data-node-id was added: the store mints no node (D-11)').toBe(carriersOf(before.rendered))
      expect(after.markdown, 'the markdown reading is unmoved: nothing renders the profile, so no commit reaches it').toBe(before.markdown)
      expect(after.markdown.includes('no-view-in-this-unit'), 'the committed value is absent from get_markdown because no view carries it — the owed pane, never a hidden one (ASM-12)').toBe(false)
      expect(after.nodes.map((node) => node.nodeId), 'the node-id vocabulary is position-for-position identical, so no target appeared or vanished').toEqual(before.nodes.map((node) => node.nodeId))

      const dispatched = await call(client, 'provident.dispatch', { target: before.nodes[before.nodes.length - 1].nodeId, event: 'click' })
      expect(Object.keys(dispatched.answer).sort(), 'the four-member record answers on the graph an owed data view will ride, so the pane inherits a drivable surface rather than a dead one').toEqual(['dirtied', 'renderedHtml', 'results', 'ssrHtml'])
    } finally {
      await close()
    }
  })

  it('S-11 · nothing crosses while the tier is open: the declared refusal as a value on a data tool and on a resource read, and no profile write', async () => {
    const { server, client, close } = await live(['read', 'dispatch', 'data'], surfaceAt())
    try {
      const control = await call(client, 'provident.data.list', {})
      // RE-DERIVED, D-80. The row used to assert that NO profile file stood at this turn, which was a cold profile
      // with no boot behind it. The product's profile file stands from the boot's construction onward, so the claim
      // the row's own name makes — NO PROFILE BYTE MOVES WHILE THE TIER IS OPEN — is now taken on the bytes: the
      // zero-length image the construction left, compared byte for byte after the five tools and the resource read
      // have been refused. A single `committed` reaching the store would move them, which is what makes it a row.
      const stood = bytesOf(PROFILE_FILE)
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
      expect(bytesOf(PROFILE_FILE).equals(stood), 'no profile byte moves while the tier is open (behaviour.md §8)').toBe(true)
      expect(readdirSync(profileDir), 'and nothing new stands in the profile: no `.tmp`, no lock, no sidecar').toEqual([PROFILE_FILE])
    } finally { await close() }
  })

  it('S-12 · two profiles are disjoint and a corrupt image recovers by declaration: an empty register answers, the process boots, and the next commit replaces the bytes', () => {
    const other = mkdtempSync(join(tmpdir(), 'central-data-e2e-other-'))
    try {
      const a = surfaceAt()
      const b = surfaceAt(other)
      expect(a.write({ path: ['alpha'], value: 'only-a' }).status, 'the first profile commits its own row').toBe('committed')
      expect(a.read({ path: ['alpha'] }), 'the first profile serves its own row as the LEAF node the read now names (D-134)').toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'only-a' } })
      expect(b.read({ path: ['alpha'] }), 'and the second profile never serves it (behaviour.md §9)').toEqual({ status: 'absent', path: ['alpha'] })
      const bList = b.list({})
      expect({ status: bList.status, count: bList.status === 'read' ? bList.count : null }, 'their lists are disjoint').toEqual({ status: 'read', count: 0 })
      // RE-DERIVED, D-80, and STRONGER THAN THE LINE IT REPLACES. "Two profiles, two files" used to be asserted as
      // the second file's ABSENCE, because neither surface had opened one. Both boots open one now, so the
      // disjointness is asserted on the bytes: the second profile's own file stands and carries NO ROW of the
      // first, which is the claim the sentence was always reaching for and is red if the two ever share a register.
      expect(readFileSync(join(other, PROFILE_FILE), 'utf8'), 'two profiles, two files — and the second carries none of the first\'s row').toBe('')
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
        // RE-DERIVED, D-80. The row's subject is P-1's measured arm — a boot over bytes that are not the store's
        // image answers cold and leaves them untouched — and the boot is now the ROW's act rather than the surface's
        // lazy one, which puts the finding exactly where `persistence.md` §9 P-1 states it: `createProfileStore` is
        // what meets the foreign image, and a boot that threw here would redden this line by throwing out of the row.
        const surface = surfaceAt(dir)
        expect(surface.list({}), `S-12/${seed.label}: the register is empty — not a refusal and not a throw`).toEqual({ status: 'read', prefix: null, paths: [], count: 0 })
        expect(surface.read({ path: ['alpha'] }), `S-12/${seed.label}: absence is the answer`).toEqual({ status: 'absent', path: ['alpha'] })
        expect(readFileSync(join(dir, PROFILE_FILE), 'utf8'), `S-12/${seed.label}: the foreign bytes stand untouched until a commit`).toBe(seed.bytes)
        expect(surface.write({ path: ['alpha'], value: 'recovered' }).status, `S-12/${seed.label}: the next commit commits`).toBe('committed')
        expect(surface.read({ path: ['alpha'] }), `S-12/${seed.label}: and serves the row it landed, as the leaf node over the bytes it replaced`).toEqual({ status: 'read', kind: 'row', path: ['alpha'], value: { _tier: 'file', value: 'recovered' } })
        expect(readFileSync(join(dir, PROFILE_FILE), 'utf8'), `S-12/${seed.label}: the commit replaced the bytes`).not.toBe(seed.bytes)
      } finally { rmSync(dir, { recursive: true, force: true }) }
    }
  })
})
