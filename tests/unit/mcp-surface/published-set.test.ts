// tests/unit/mcp-surface/published-set.test.ts — THE L3 UNIT BATTERY of `mcp-surface` for L1 `S-5`
// (`docs/L1/modularity.md` §3, unit `modularity`'s `U1`). ONE file, SIX rows, ids `MS-1`…`MS-6`, and the ids are
// **FILE-SCOPED TO THIS FILE**: a cite names the file and the id together, and this header claims NOTHING about any
// other page's ids — scope is declared per file and per file only (`design.md` §9 rev 3; `strata/decisions.md`
// D-30/D-40, whose scope ids belong to the file that carries them).
//
// WHAT IT IS, AND WHAT ITS ONLY READINGS ARE. The REAL `ProvidentMcpServer` (`src/main/mcp-server.ts`) and the
// REAL predicates and free functions of `src/main/security.ts`, read through the module's OWN registration
// surface (`allowedToolNames`, `capturedToolNames`, `syncPublishedTools`, `registeredEnabled`, `applyGatePatch`,
// `registeredResources`, `allowedResourceUris`, and the module's own free functions `registeredToolNames` and
// `invokeModuleTool`) with ONE MCP client connected on the SDK's in-memory linked transport. The `backend` is a
// canned recorder, so no row drives the renderer; no handler map is poked and the subject is never mocked.
// `composePublishedSet` is driven as the pure function it is, over the same gate and the same port the live server
// is built with, so the server is compared to the RULE and never to a spelled list.
//
// **THE DYNAMIC HALF ARRIVES THROUGH ONE PORT AND NOWHERE ELSE** (rev 3 of the pair: `docs/L3/mcp-surface/
// design.md` §2/§3/§5, `signatures.md` §2/§5; `docs/L2/mcp-surface/interface.md` §10). Every activating row injects
// ONE object answering the NAMES (`activations()`), the CALL (`invoke`) and the DELIVERY (`install`): the object
// that answers the published set is the object that answers the call, which is the claim the route's re-grain
// rests on. `install` is declared and RECORDED by every row and CALLED by none — the delivery arm is
// `module.install`/`module.update`'s and needs a `moduleStore`, a subject this file does not open (design.md §5).
// No row constructs an executor, imports `module-system`'s source, or builds a `CapabilityRouter`: the executor is
// that module's own subject and a battery of THIS module never stands one up, so the port is INJECTED as the
// structural stub it is declared to be — `ModulePort` is a structural type and this is exactly the seam it declares.
//
// **AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` / `strata:marked-file` marker and
// GATES (D-40; `strata/decisions.md` D-30/D-40).**
//
// **WRITTEN RED-FIRST, ROW BY ROW, EACH RED NAMING ITS OWN CAUSE — AND THE LANDING HAS SINCE DISCHARGED EVERY ONE OF
// THEM** (D-3, D-40; `design.md` §9, §11, which orders this re-grain BEFORE or CONCURRENTLY WITH the landing, because
// an L4 pass that met these stale reds would read them as defects). Each row's red-first cause is recorded here as it
// stood, because the property they shared is the one that must survive: **the absence of a member or an export is
// NAMED, not stumbled over**, so a re-introduced absence reds again with its own words through the `need`/`onServer`
// helpers below.
//   · `MS-1`, `MS-4` and `MS-5` red because `S-5`'s implementation was ABSENT FROM `src/**`:
//     `composePublishedSet`, `capturedToolNames()` and `registrationAllowed` were declared by the pair's rev 3 and
//     exported by neither file.
//   · `MS-2` red on its own PRECONDITION — the composition published no activation's name at construction, because
//     `McpServerOptions` carried no port, so the row read the SAME absence as a SET rather than as a symbol, and its
//     `withdrawn`/`added` readings would have measured nothing.
//   · `MS-6` red for that same absence first (no composed name was registered, so no call reached any door), **and it
//     keeps a bite of its own now the route stands**: with the arm's declaration left at `inputSchema: {}`, every
//     caller's members are stripped to `{}` before the door is reached — the one cell `design.md` §5 and `G-12` moved
//     with the call site, which no row measured before this pass.
//   · `MS-3` red in its INJECTED arm alone while its AUTHORITY arm passed, and now answers on both: the transport
//     reports the value it is given (`appVersion`), and the un-injected server publishes the accessor's own answer,
//     which is the manifest's (`design.md` §9/§11 named both headers stale; both are re-grained here).
// **AT THE HEAD THIS FILE NOW RUNS AT, ALL SIX ROWS ARE GREEN AGAINST THE LANDED SURFACE.** The casts the file leans
// on are each MARKED where they stand — the construction's options record, the invocation's door seat and the canned
// `dataSurface` seat, beside the two `need`/`onServer` access points — so a reader sees exactly which typing the
// battery bends and why, and none of them hides an absent type now that the pair's members are landed. **A RED HERE
// WOULD BE THE BATTERY'S EVIDENCE AND NOT A DEFECT, AND NOT ONE LINE MAY BE SOFTENED TO MAKE THE TREE COMPILE** — a
// green `tsc` buys no row its green at run.
//
// **`MS-5` IS THE CONTROL, AND ITS BITE IS NAMED IN ITS OWN TITLE AND MESSAGE.** Its claim — a static tool's
// gate is unmoved by the composition — holds before and after the landing in SUBSTANCE (the static half already IS
// the gate's derivation), so its green is evidence of nothing unless the bite is spoken: **the day the composition
// FILTERS, RE-SEATS or DROPS a static name.** It was red on arrival for the LANDING's absence — the second reading it
// takes is `capturedToolNames()`, a member nothing in `src/**` declared — and that red was the landing's evidence,
// never the claim's.
//
// WHAT IT DOES NOT MEASURE, EACH WITH ITS OWNER. The executor's admissions, its resolver order and the door's BODY
// are `module-system`'s (`S-1`…`S-4`; `docs/L2/module-system/interface.md` §11/§12): no row here constructs an
// executor, and none imports that module's source statically. The re-gate's PAIR BREADTH and the class's own
// `invokeTool` accessor are the L2 battery's `I-5` (`design.md` §4, §9 `F-9`), so neither is re-driven here even
// where a row names it. A boot, an Electron leg and a rendered surface are nobody's subject here — this is a
// NODE-PROCESS battery over one module's own registration surface, so a green here is envelope-green and NEVER
// app-green (`strata/brief.md` §6, D-27). The HTTP transport's per-POST rebuild is read as a construction fact
// inside `src/main/mcp-server.ts` and never booted (`design.md` §5), and no row drives `http`. The exclusion tier
// is `secure-panels`' subject and no row opens it. And **no count of `ALL_TOOLS`, of a group, of a resource or of
// `ALL_RESOURCES` is asserted anywhere in this file**: the relations are SETS, ABSENCE and DERIVATION, and every
// figure another page owns is read where it lives and never restated here (D-26, D-41, D-43).
//
// TWO THINGS IT DELIBERATELY DOES NOT DO. The ids are file-scoped TO THIS FILE — a cite names the file and the id
// together, and no line here speaks for another page's ids (`design.md` §9). And no row asserts the ABSENCE of the
// SDK's own tool-name validation warning for a `module:<n>.<t>` name: that warning is a WARN, never a refusal, and
// demanding its silence would make a row red for the SDK's prose (`design.md` §9 `G-9`).
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { describe, expect, it } from 'vitest'

// THE TWO SOURCE MODULES AS NAMESPACES, so this file LOADS at a head where the exports below do not exist and a
// row can NAME the absence instead of dying in a module-resolution error (`design.md` §9).
import * as surface from '../../../src/main/mcp-server.js'
import * as security from '../../../src/main/security.js'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

/** One export this battery's subject needs. A row that finds it absent REDS with the PREREQUISITE it names,
 *  rather than dying in a `TypeError` two lines later — the absence IS the reading (`design.md` §9). */
function need<T>(module: object, name: string, why: string): T {
  const found = (module as Record<string, unknown>)[name]
  if (found === undefined) {
    const file = name === 'registrationAllowed' ? 'security' : 'mcp-server'
    throw new Error(`PREREQUISITE — src/main/${file}.ts does not export \`${name}\` (${why})`)
  }
  return found as T
}

/** One MEMBER this battery's subject needs on the LIVE server (`signatures.md` §4). Bound to its own instance so
 *  a row calls it the way a caller would, and named so an unwidened class REDS here with the member it lacks. */
function onServer(server: Server, name: string, why: string): () => unknown {
  const held = (server as unknown as Record<string, unknown>)[name]
  if (typeof held !== 'function') {
    throw new Error(`PREREQUISITE — \`ProvidentMcpServer\` in src/main/mcp-server.ts declares no \`${name}()\` (${why})`)
  }
  return () => (held as (...args: unknown[]) => unknown).call(server)
}

/** `signatures.md` §2/§3/§1 — the signatures `S-5` declares, transcribed HERE so the file LOADED and named its
 *  absences at the head where the landing had not yet happened; they are now the module's own types, and the
 *  transcription is kept because a row compares VALUES against them and never against a re-derivation
 *  (`signatures.md` §2, §3, §1). */
interface ActivationLike { readonly tools: readonly string[] }
/** **THE DYNAMIC HALF'S THREE MEMBERS ON ONE OBJECT** (`signatures.md` §2; `design.md` §2, §3, §10 `ASM-1`): the
 *  names, the call and the delivery. `args` travels BY IDENTITY through `invoke`, and the port's answer is a
 *  handler's own value or the door's own refusal VALUE — a value either way, never a throw this surface invents. */
interface ModulePort {
  install(delivery: { readonly kind: 'source'; readonly source: string }): readonly unknown[]
  activations(): readonly ActivationLike[]
  invoke(toolName: string, args: unknown): unknown
}
type ComposePublishedSet = (
  staticNames: readonly string[],
  activations: readonly ActivationLike[],
  admits: (name: string) => boolean,
) => string[]
/** `design.md` §4, §10 `ASM-4` — the predicate is TOTAL over `enabled`, so its declared domain carries the malformed
 *  arms (`null`, `undefined`) beside the two shipped iterables, and a NON-ITERABLE is refused at run time rather
 *  than at the type (`signatures.md` §1). */
type RegistrationAllowed = (
  name: string,
  enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[] | null | undefined,
) => boolean
type SyncAnswer = { readonly added: readonly string[]; readonly withdrawn: readonly string[] }

/** `design.md` §3 — the composition rule, reached through `need` so its absence is named. */
const composePublishedSet = (): ComposePublishedSet =>
  need<ComposePublishedSet>(surface, 'composePublishedSet', 'the composition rule is S-5\'s; design.md §3')
/** `design.md` §4 — the registration instant's predicate, reached the same way. */
const registrationAllowed = (): RegistrationAllowed =>
  need<RegistrationAllowed>(security, 'registrationAllowed', 'the registration predicate is S-5\'s; design.md §4')
/** `design.md` §5 — the re-registration act, answering the delta it applied. */
const syncPublishedTools = (server: Server): SyncAnswer =>
  onServer(server, 'syncPublishedTools', 'the re-registration act is S-5\'s; design.md §5')() as SyncAnswer
/** `design.md` §2, §5 — the captured handles' keys: the ONE reading that tells a WITHDRAWN name from a
 *  group-disabled one. The member is `capturedToolNames()` and NOT `registeredToolNames()`, which is the landed
 *  FREE function's name (`registeredToolNames(gate, allNames)`; `signatures.md` §4, D-41). */
const capturedToolNames = (server: Server): string[] =>
  onServer(server, 'capturedToolNames', 'the captured-handles reading is S-5\'s; design.md §2, §5')() as string[]

type ToolGroup = security.ToolGroup
type Server = InstanceType<typeof surface.ProvidentMcpServer>

const backend = { invoke: async () => ({}) }
/** The landed static foundation, read through the module and never re-spelled (D-26, D-41). */
const ALL_TOOLS: string[] = surface.ProvidentMcpServer.ALL_TOOLS
/** The dynamic half's namespace, named once so each row does not spell it again (`design.md` §3: the composition
 *  adds no second reading of the prefix rule — `security.ts`'s `groupForTool` is the one reader). */
const MODULE_NAMESPACE = 'module:'
/** Every group the gate knows, so a row under `FULL` measures the composition and not the gate (L2 §10). */
const FULL: ToolGroup[] = ['read', 'dispatch', 'graph', 'code', 'module', 'data']

/** One call the DOOR received, recorded BY REFERENCE — the reading `MS-4` and `MS-6` take of what reached it. */
interface PortCall { readonly toolName: string; readonly args: unknown }
interface PortDelivery { readonly kind: 'source'; readonly source: string }

/** **THE PORT THIS BATTERY INJECTS, AND THE ONE OBJECT EVERY ACTIVATING ROW DRIVES** (`signatures.md` §2): the
 *  activation table is a LIST OF `tools` GROUPS handed to the factory — each already a full `module:<n>.<t>` name
 *  and the argument order the registry's order — read through a GETTER so a row can move the registry OUTSIDE a
 *  tool call (`MS-2`). `invoke` records the name and the args BY REFERENCE and answers a record built from them,
 *  which is how a row reads WHICH name was admitted and WHETHER the caller's own member arrived (`MS-4`, `MS-6`);
 *  `install` records the delivery and answers an executor verdict, and no row here calls it (`design.md` §5). */
interface RecordedPort extends ModulePort {
  readonly calls: PortCall[]
  readonly deliveries: PortDelivery[]
}

function portOf(activations: () => readonly (readonly string[])[]): RecordedPort {
  const calls: PortCall[] = []
  const deliveries: PortDelivery[] = []
  return {
    install: (delivery) => {
      deliveries.push(delivery)
      return [{ status: 'installed' }]
    },
    activations: () => activations().map((tools) => ({ tools })),
    invoke: (toolName, args) => {
      calls.push({ toolName, args })
      return { called: toolName, args }
    },
    calls,
    deliveries,
  }
}

/** **THE ONE CAST THE CONSTRUCTION NEEDS, AND IT IS THE BATTERY'S ONE CONCESSION — IT HID NOTHING BEFORE THE LANDING
 *  AND HIDES NOTHING NOW.** `live()` takes an options RECORD, because a row injects its members by name (`modulePort`,
 *  `appVersion`), so the record reaches the constructor through one assertion; at the head this battery was authored
 *  at, the two injected members were declared by `signatures.md` §5 and by no `src/**` file. Both are landed now
 *  (`design.md` §2's option rows), so the cast carries no absent type any more — it is retained, marked, because the
 *  record's shape is a row's business and a per-call typed literal would hide which member a row injected. The
 *  `need`/`onServer` casts above are the same concession made at the two access points, each of which NAMES what it
 *  could not find at run time. */
type ServerOptions = ConstructorParameters<typeof surface.ProvidentMcpServer>[0]
const build = (options: Record<string, unknown>): Server =>
  new surface.ProvidentMcpServer(options as unknown as ServerOptions)

/** **THE OPTIONS' OWN `dataSurface` SEAT, NAMED THROUGH THIS MODULE AND NEVER THROUGH A SIBLING'S CLASS** — the rule
 *  the door stub in `MS-4` follows: a battery reads the signature THIS module declares, so the seat is read off
 *  `McpServerOptions` rather than imported from `central-data`, whose class is not this battery's subject
 *  (`design.md` §2's option rows). */
type DataSurfaceSeat = ConstructorParameters<typeof surface.ProvidentMcpServer>[0]['dataSurface']

/** **A CANNED `dataSurface`, AND NOT ONE OF ITS FIVE METHODS IS EVER CALLED** (`design.md` §5, §9 `F-1`). The five
 *  `provident.data.*` names register ONLY when a surface was supplied (`mcp-server.ts`'s data arm and its own `D-11`
 *  note), so on a server built without one the composition publishes five names no registration arm answers — and
 *  `MS-5`'s identity, "every published static name has a captured handle", is then FALSE for a reason that has
 *  nothing to do with `S-5`. Each member answers `{}` because the names are REGISTERED here and never INVOKED: this
 *  stub exists to give the five data arms a body, and the cast is made once, to the options' own seat. The
 *  counter-example is not merely avoided but MEASURED: `MS-2` supplies NO surface, and reads `added` there. */
const cannedDataSurface = {
  read: () => ({}),
  write: () => ({}),
  delete: () => ({}),
  list: () => ({}),
  journal: () => ({}),
} as unknown as DataSurfaceSeat

interface Live {
  server: Server
  client: Client
  close: () => Promise<void>
}
/** A live server and one connected client — the same harness idiom the L2 battery uses
 *  (`tests/integration/mcp-surface/registration.test.ts`): one in-memory linked pair, no socket, no boot. The
 *  `dataSurface` seat is OPTIONAL and `MS-5` is its one caller, because the identity that row takes holds only on a
 *  server whose every admitted static name has a REGISTRATION ARM (`design.md` §5's corrected capture identity).
 *  `options` carries the PORT (`modulePort`) or the version reader (`appVersion`) — the two injected members. */
async function live(
  gate: security.SecurityGate,
  options: Record<string, unknown> = {},
  dataSurface?: DataSurfaceSeat,
): Promise<Live> {
  const server = build({ backend, transport: 'stdio', gate, dataSurface, ...options })
  const mcp = server.ensureServerRegistered()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await mcp.connect(serverTransport)
  const client = new Client({ name: 'mcp-surface-unit-battery', version: '0.0.0' })
  await client.connect(clientTransport)
  return { server, client, close: async () => { await client.close() } }
}

/** What the transport actually PUBLISHES: the listing, read as names. */
const listed = async (client: Client): Promise<string[]> => (await client.listTools()).tools.map((tool) => tool.name)

/** **ONE TOOL CALL ON THE PROTOCOL'S OWN PATH, AND ITS TWO ANSWER ARMS KEPT APART** (`design.md` §7):
 *  `ok` is "the protocol ANSWERED with a result", `isError` is "that result rode the SDK's tool-error arm"
 *  (`isError: true`, which is how a GATE refusal and the SDK's own not-found arrive), and a thrown rejection is
 *  `ok: false`. A DOOR refusal is neither: it is a VALUE inside a plain answer, `isError` absent, which is why the
 *  door's own reasons read like any other value (D-105). */
interface CallAnswer { ok: boolean; isError: boolean; value: unknown; text: string }
async function call(client: Client, name: string, args?: Record<string, unknown>): Promise<CallAnswer> {
  try {
    const result = (await client.callTool({ name, ...(args === undefined ? {} : { arguments: args }) })) as unknown
    const held = result as { content?: Array<{ type?: string; text?: string }>; isError?: boolean }
    const text = held.content?.[0]?.text ?? ''
    const isError = held.isError === true
    try {
      return { ok: true, isError, value: JSON.parse(text) as unknown, text }
    } catch {
      return { ok: true, isError, value: { __unparsable: text }, text }
    }
  } catch (error) {
    return { ok: false, isError: false, value: null, text: `MCP ERROR: ${error instanceof Error ? error.message : String(error)}` }
  }
}

describe('mcp-surface — the published set, its re-registration, its version, its two-gate and its arm\'s schema (S-5, design.md rev 3)', () => {
  it('MS-1 · the published set is the composition of the static half and the registry\'s half, static first and nothing sorted (design.md §3; L2 §10)', async () => {
    const compose = composePublishedSet()
    // THE TWO NAMES THE PURE ARM USES ARE THE RULE'S OWN EXAMPLE SEATS and never a claim about `ALL_TOOLS`'
    // membership: `composePublishedSet` takes any names, and `FULL`-gate derivations below read the foundation
    // through the module (D-26, D-41).
    const FORWARD = ['provident.dispatch', 'provident.focus']

    // (1) THE TWO BLOCKS, IN THE ONLY ORDER THE RULE ALLOWS.
    expect(
      compose(FORWARD, [{ tools: ['module:a.one', 'module:b.two'] }], () => true),
      '§3 — the composition is the static half FIRST and the dynamic half AFTER it, in the activation order: a set that ' +
        'sorts, reverses or interleaves the two blocks re-seats a foundation name every time a module is activated',
    ).toEqual([...FORWARD, 'module:a.one', 'module:b.two'])

    // (2) NO SORT AND NO RE-SEAT: the same seats, handed over in the OPPOSITE order, come back in that order.
    const reversed = compose([FORWARD[1], FORWARD[0]], [{ tools: ['module:a.one'] }], () => true)
    expect(
      reversed.filter((name) => !name.startsWith(MODULE_NAMESPACE)),
      '§3 — NO SORT: the static half keeps the caller\'s own order, so a sorted implementation reds here even though it ' +
        'would satisfy the block-order reading above',
    ).toEqual([FORWARD[1], FORWARD[0]])

    // (3) FIRST OCCURRENCE WINS: a name in the static half AND in the registry's, and in two activations at that.
    expect(
      compose(['module:a.one', 'provident.dispatch'], [{ tools: ['module:a.one'] }, { tools: ['module:a.one'] }], () => true),
      '§3 — a name that stands in both halves, or in two activations, stands ONCE and where it first stood: a duplicate ' +
        'reaches the SDK\'s already-registered throw, which is why the composition is the guard and not the registry',
    ).toEqual(['module:a.one', 'provident.dispatch'])

    // (4) A NAME THE GROUP PREDICATE DENIES IS ABSENT — never composed and then refused.
    expect(
      compose(['provident.dispatch'], [{ tools: ['module:a.one', 'module:b.two'] }], (name) => !name.startsWith('module:b.')),
      '§3 — a name its group does not admit is ABSENT from the published set: the predicate is the ONLY reading of the ' +
        'group rule, so composing first and refusing later would invent a second one',
    ).toEqual(['provident.dispatch', 'module:a.one'])

    // (5) THE DYNAMIC HALF IS THE `module:` NAMESPACE, and a name outside it is never composed.
    expect(
      compose(['provident.dispatch'], [{ tools: ['provident.load'] }], () => true),
      '§3 — a registry name outside the `module:` namespace is not composed, even with every group admitting it: the ' +
        'dynamic half is the namespace, so a static seat can never arrive by the registry and be re-seated there',
    ).toEqual(['provident.dispatch'])

    // THE SERVER ARM: the same rule, over the SAME gate and the SAME PORT the server was built with. `MS-1`'s red
    // names its own cause twice over — `composePublishedSet` is absent from `src/**` at this head, and so is the
    // `modulePort` option, whose absence leaves the server's dynamic half EMPTY where this row injected two names.
    const gate = new security.SecurityGate({ token: null, enabled: FULL })
    const port = portOf(() => [['module:a.one'], ['module:b.two']])
    const { server, close } = await live(gate, { modulePort: port })
    try {
      const published = server.allowedToolNames()
      expect(
        published,
        '§3 — the published set IS `composePublishedSet` over the gate and the PORT this server holds: the row compares a ' +
          'derivation to a derivation, never to a spelled list, so a second composition site reds here — and a server ' +
          'that read anything but the injected port answers the static half alone and reds on the very names it injected',
      ).toEqual(compose(surface.registeredToolNames(gate, ALL_TOOLS), port.activations(), (name) => gate.toolAllowed(name)))

      const captured = capturedToolNames(server)
      for (const name of port.activations().flatMap((activation) => activation.tools)) {
        expect(published, `§3 — an activation's own name is COMPOSED into the published set: ${name}`).toContain(name)
        expect(
          captured,
          `§3 — and a captured handle stands for it: a listed name no handle answers is a listing the SDK cannot serve — ${name}`,
        ).toContain(name)
      }
      for (const name of published.filter((seat) => seat.startsWith(MODULE_NAMESPACE))) {
        expect(captured, `§3 — every dynamic name in the answer is a captured handle's key: ${name}`).toContain(name)
      }
    } finally {
      await close()
    }
  })

  it('MS-2 · an activation re-registers on the LIVE server, the withdrawal takes the old name away, and the SAME name registers again (design.md §5; L2 §12)', async () => {
    // A MUTABLE ACTIVATION TABLE, so the registry moves OUTSIDE a tool call — `design.md` §5's third caller, which is
    // module-system's and reaches this member and nothing else. The port READ gets the current list at each call.
    let current: string[][] = [['module:alpha.one']]
    const port = portOf(() => current)
    const STANDING = 'module:alpha.one'
    const MOVED = 'module:alpha.two'
    const gate = new security.SecurityGate({ token: null, enabled: FULL })
    const { server, client, close } = await live(gate, { modulePort: port })
    try {
      // THE PRECONDITION, so the withdrawal below has something to withdraw.
      expect(
        await listed(client),
        '§3, §5 — the precondition: the composition publishes the activation\'s name at CONSTRUCTION. Absent, the set the ' +
          'withdrawal below reads is empty — the port\'s names would reach no composition — and the withdrawal would be a ' +
          'measurement of nothing',
      ).toContain(STANDING)
      expect(capturedToolNames(server), '§5 — and a captured handle stands for it, so `remove()` has a name to withdraw').toContain(STANDING)
      expect(server.registeredEnabled(STANDING), '§5 — and the handle is enabled under `module` AND `code`').toBe(true)

      const before = server.ensureServerRegistered()
      current = [[MOVED]]
      const moved = syncPublishedTools(server)

      expect(moved.withdrawn,
        '§5 — the act\'s OWN reading: a captured `module:`-prefixed name the port no longer holds is WITHDRAWN — the ' +
          'port is read UNFILTERED by group, so a group-off name is never mistaken for a withdrawn one',
      ).toEqual([STANDING])
      // **`added` IS WHAT THE MAP GAINED, AND THIS SERVER IS THE WORKED COUNTER-EXAMPLE** (`design.md` §5, `F-1`): no
      // `dataSurface` was supplied, so the `FULL` gate ADMITS all five `provident.data.*` names and NO registration arm
      // captures one — they stand in the composition for this row's whole length and are never an `added` name. So
      // `added` is read off the capture map BEFORE and AFTER the pass and never off the candidate list, and an
      // implementation that reported its candidate delta would name those five here (`mcp-server.ts`'s data arm, `D-11`).
      expect(
        moved.added,
        '§5 — `added` is what the MAP GAINED: read before and after the registration pass, never the candidate list. ' +
          'This server carries NO `dataSurface`, so five `provident.data.*` names are admitted by the gate and answered ' +
          'by no registration arm (`D-11`) — a candidate-list reading would report those five here as well, so this row ' +
          'is the capture identity\'s counter-example and not a spelling of the delta (`F-1`)',
      ).toEqual([MOVED])

      const after = await listed(client)
      expect(after, '§5 — the listing follows the set on the SAME live server; the SDK\'s tool-list-changed notification is how a connected client learns it, with no reconnect').toContain(MOVED)
      expect(after, '§5 — and a WITHDRAWN name is GONE from the listing, never present-and-refusing').not.toContain(STANDING)
      expect(capturedToolNames(server), '§5 — `remove()` takes the key out of the capture map too, so a later re-activation of the same name meets no already-registered throw').not.toContain(STANDING)

      const withdrawnCall = await call(client, STANDING)
      expect(
        withdrawnCall.ok && !withdrawnCall.isError,
        `§5 — a call on a withdrawn name comes back on the ERROR ARM and never as the door's value, which is what an ` +
          `agent can tell apart: ${withdrawnCall.text}`,
      ).toBe(false)
      expect(server.registeredEnabled(MOVED), '§5 — while the new name\'s handle stands ENABLED: an added name is registered, not merely listed').toBe(true)
      expect(
        server.ensureServerRegistered(),
        '§5 — and NO second server was built: the set moved WITHOUT a rebuild, on the instance the client is already speaking to',
      ).toBe(before)

      // THE OTHER AXIS, KEPT APART (`design.md` §5 `G-4`, measured here because it is the reading a unified
      // implementation loses first): a GROUP withdrawal is a TOGGLE, never a withdrawal.
      server.applyGatePatch({ disable: ['module'] })
      const byGate = syncPublishedTools(server)
      expect(
        byGate.withdrawn,
        '§5 `G-4` — a group-off name is NEVER counted as withdrawn: the axes read different facts, and swapping their ' +
          'mechanisms would leave the group axis unable to restore the name and the registry axis unable to re-register it',
      ).toEqual([])
      expect(capturedToolNames(server), '§5 — the handle is still CAPTURED under a group-off gate; only its `enabled` bit moved').toContain(MOVED)
      expect(server.registeredEnabled(MOVED), '§5 — and the bit is what the re-gate toggled: disabled is hidden from `tools/list`, not deregistered').toBe(false)
      expect(await listed(client), '§5 — which is why the group axis hides the name from the listing').not.toContain(MOVED)

      // ... AND THE SAME HANDLE COMES BACK, which is what makes the group axis a toggle and the registry axis a removal.
      server.applyGatePatch({ groups: ['module'] })
      expect(server.registeredEnabled(MOVED), '§5 — the group axis RESTORES the same handle: a `remove()` here would have made this unanswerable').toBe(true)
      expect(await listed(client), '§5 — and the name is published again with no re-registration act').toContain(MOVED)

      // **AND THE REGISTRY AXIS'S OWN RESTORATION, WHICH IS THE OTHER HALF OF THE SAME ASYMMETRY** (`design.md` §5,
      // §10 `ASM-2`): a withdrawn name is GONE from the map, so activating it again REGISTERS it afresh. This is the
      // reading an `update({ enabled: false })` implementation cannot make — its map still holds the key, no
      // registration arm runs, and the name never returns to the listing.
      current = [[STANDING]]
      const returned = syncPublishedTools(server)
      expect(
        returned.added,
        '§5 `ASM-2` — the re-activated name is an ADDED name again: `remove()` took it out of the map, so the act ' +
          'registers it afresh. An implementation that disabled the handle instead would report `[]` here and the ' +
          'name would never stand again',
      ).toContain(STANDING)
      expect(await listed(client), '§5 `ASM-2` — and the withdrawn name is published again on the same live server').toContain(STANDING)
      expect(server.registeredEnabled(STANDING), '§5 `ASM-2` — with a handle registered and enabled under the standing gate').toBe(true)
    } finally {
      await close()
    }
  })

  it('MS-3 · the published number answers the one application-version authority (design.md §6; L2 §11)', async () => {
    // ARM (a), THE INJECTION SEAM: the transport REPORTS what it is given. This is what makes the L2 battery's
    // drift control `I-3` a control rather than a coincidence — a literal that happens to agree with the
    // manifest proves nothing about the plumbing (`design.md` §6).
    const injectedGate = new security.SecurityGate({ token: null, enabled: FULL })
    const injected = await live(injectedGate, { appVersion: () => '9.9.9' })
    try {
      expect(
        injected.client.getServerVersion()?.version,
        '§6 — the transport REPORTS the number it is given. This is what makes the drift control a control: a literal that ' +
          'happened to agree with the manifest would satisfy the second reading below and prove nothing about the plumbing, ' +
          'so a value no manifest carries has to come back out of `serverInfo`',
      ).toBe('9.9.9')
    } finally {
      await injected.close()
    }

    // ARM (b), THE AUTHORITY ITSELF — **THE DRIFT CONTROL ITSELF, AND GREEN ON BOTH SIDES OF THE LANDING** (`design.md`
    // §9, §11): `appVersion()` is exported by `src/shared/module-contract.ts` and the defaulted server publishes what it
    // answers, so this arm measures the drift of the number against the manifest — the ONE thing the injection seam
    // above cannot measure, because an injected value says nothing about what the default reads. The ONE dynamic import
    // of this file, with a NON-LITERAL specifier so a missing file reds THIS arm and not the whole file at typecheck time.
    const specifier = '../../../src/shared/module-contract.js'
    const contract = (await import(specifier).catch(() => null)) as { appVersion?: () => unknown } | null
    const readVersion = contract?.appVersion
    if (typeof readVersion !== 'function') {
      throw new Error(
        'PREREQUISITE — src/shared/module-contract.ts exports no `appVersion()` (`docs/L2/module-system/interface.md` §8; ' +
          '`design.md` §6). S-4 owns it and S-4 and S-5 are TWO STEPS OF ONE SUB-UNIT (`U1`), so this arm cannot stand ' +
          'before that pass lands: the absence is the arm\'s evidence, not a row to soften',
      )
    }
    const authority = String(readVersion())
    // **THE MANIFEST READ IS L2's drift control `I-3` RESTATED AT UNIT GRAIN AND NOT A SECOND CARRIER OF THE RULE**
    // (`design.md` §6, §9 `G-10`): `G-10` binds `src/main/mcp-server.ts` — that file never reads `package.json`, the
    // number lives behind the accessor — while a ROW may read the manifest, and this one reads it for the same
    // judgement `I-3` takes at its own grain rather than replacing it (D-26, D-41).
    const manifest = String((JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { version?: unknown }).version ?? '')
    expect(manifest, 'the precondition: the manifest at the repo root answers a version string, read off its own `version` member and never re-spelled here (D-41)').not.toBe('')

    // A SECOND SERVER WITH NO `appVersion` OPTION: the member's DEFAULT is the accessor, so no caller names the
    // authority and no construction site imports it (design.md §10 `ASM-3`).
    const defaultedGate = new security.SecurityGate({ token: null, enabled: FULL })
    const defaulted = await live(defaultedGate)
    try {
      const published = defaulted.client.getServerVersion()?.version
      expect(
        published,
        '§6 — a server built with NO `appVersion` publishes the AUTHORITY\'s own answer: the default is the accessor, and a ' +
          'second spelling of the number anywhere on this path reds here',
      ).toBe(authority)
      expect(
        published,
        '§6 — and that answer is the number the BUILD carries, read off `package.json` at this moment (`C-11`): the MCP ' +
          'transport is the authority\'s SECOND READER and never a second authority',
      ).toBe(manifest)
    } finally {
      await defaulted.close()
    }
  })

  it('MS-4 · the two-gate refuses by NAME at its REGISTRATION and INVOCATION instants, and the invocation\'s door is the executor\'s (design.md §4, §5, §7; L2 §10)', () => {
    // **TWO INSTANTS, AND THIS ROW TAKES EXACTLY THE TWO IT NAMES.** REGISTRATION is the candidate list's predicate and
    // INVOCATION the per-call pair. The re-gate is the landed mechanism's THIRD instant, and its PAIR BREADTH — a `code`
    // withdrawal closing the `module.list` census door — is measured by the L2 battery's `I-5`, as is the class's own
    // `invokeTool` accessor's two arms; both are DELIBERATELY NOT RE-DRIVEN HERE (`design.md` §4, §9 `F-9`; L2 §7's
    // marks statement). So `I-5` remains the pair's breadth carrier and this row does not become its second one: a
    // unit row that named an instant it never took would be an accounting, not a measurement.
    const allowed = registrationAllowed()
    const moduleOnly = new Set<ToolGroup>(['read', 'dispatch', 'module'])

    // THE CONSTRUCTION INSTANT, as the predicate reads it.
    expect(
      allowed('module.list', moduleOnly),
      '§4 — the census door registers by its GROUP alone, so `module` admits it. **THE SAME DOOR AT THE RE-GATE — a ' +
        '`code` withdrawal closing it — IS L2\'s `I-5` AND IS NOT RE-DRIVEN HERE**: this row takes the REGISTRATION and ' +
        'INVOCATION instants only, and naming the third without taking it would be an accounting, not a measurement ' +
        '(`design.md` §9 `F-9`)',
    ).toBe(true)
    expect(
      allowed('module.install', moduleOnly),
      '§4 — the install door is trusted-equivalent to `code`, so under `module` alone it is REFUSED — and a refusal here is ' +
        'ABSENCE from `tools/list`, never a present-and-refusing entry (§7)',
    ).toBe(false)
    expect(allowed('module.update', moduleOnly), '§4 — and the update door stands with it, on the same pair').toBe(false)
    expect(
      allowed('module:alpha.one', moduleOnly),
      '§7 — a DYNAMIC name registers by its GROUP alone: `module` admits it, and the pair belongs to the INVOCATION instant ' +
        'rather than to this one (`G-8`: the instants are NOT one predicate, and the re-gate\'s is not this row\'s — ' +
        'L2\'s `I-5` carries it, `design.md` §9 `F-9`)',
    ).toBe(true)
    expect(allowed('provident.dispatch', moduleOnly), '§4 — a static name answers its own `TOOL_GROUPS` row, which this pass does not move').toBe(true)
    expect(allowed('provident.load', moduleOnly), '§4 — a name whose group is off is refused by the SAME rule, with no special case').toBe(false)
    expect(
      allowed('module:', moduleOnly),
      '§7 — a bare `module:` is MALFORMED and denied: `groupForTool` answers `null` for it, so it is refused rather than ' +
        'resolved to `module`',
    ).toBe(false)

    // **TOTALITY OVER A MALFORMED `enabled` IS THIS DESIGN'S OWN RULE AND NOT THE LANDED ONE** (`design.md` §10
    // `ASM-4`, §4; `F-3`): `null`, `undefined` and a non-iterable answer `false` and NEVER throw — the fail-closed
    // posture `moduleToolAllowed` already carries in the same file, and explicitly NOT `toolAllowed`'s
    // `new Set(enabled)`, which THROWS on a non-iterable. A gate that throws is a crash wearing a refusal's clothes.
    expect(
      () => allowed('module.list', null),
      '§10 `ASM-4` — the predicate is TOTAL over `enabled`: a `null` member must not throw',
    ).not.toThrow()
    expect(
      allowed('module.list', null),
      '§10 `ASM-4` — `null` is malformed, and its answer is `false` (an empty set): fail closed, never fail loud',
    ).toBe(false)
    expect(
      allowed('module.install', undefined),
      '§10 `ASM-4` — `undefined` is the same empty set and the same `false`, so a missing group set never opens a door',
    ).toBe(false)
    expect(
      allowed('module.list', {} as never),
      '§10 `ASM-4` — a NON-ITERABLE answer is the arm this design RE-DECIDES rather than inherits: `false`, and never ' +
        '`toolAllowed`\'s `new Set(enabled)` throw, which is the alternative `ASM-4` records and refuses',
    ).toBe(false)

    const paired = new Set<ToolGroup>(['read', 'dispatch', 'module', 'code'])
    expect(allowed('module.install', paired), '§4 — add `code` and the pair is satisfied: ONE predicate, one rule, no second spelling').toBe(true)

    // THE LANDED HELPERS AGREE, which is what makes this predicate the landed rule FACTORED and not re-decided (D-41).
    expect(security.groupForTool('module:alpha.one'), '§7 — the prefix rule is `security.ts`\'s own: a dynamic name resolves to `module`').toBe('module')
    expect(security.groupForTool('module:'), '§7 — and a bare `module:` with an empty rest resolves to NOTHING').toBe(null)
    expect(security.groupForTool('provident.load'), '§7 — an exact `TOOL_GROUPS` row wins first, and this pass moves none').toBe('graph')

    const moduleOnlyGate = new security.SecurityGate({ token: null, enabled: ['read', 'dispatch', 'module'] })
    const pairedGate = new security.SecurityGate({ token: null, enabled: ['read', 'dispatch', 'module', 'code'] })
    const underModuleOnly = surface.registeredToolNames(moduleOnlyGate, ALL_TOOLS).includes('module.install')
    const underThePair = surface.registeredToolNames(pairedGate, ALL_TOOLS).includes('module.install')
    expect(
      underModuleOnly,
      '§4 — the construction arm reads the SAME predicate: `registeredToolNames` admits `module.install` exactly where ' +
        '`registrationAllowed` does, compared as MEMBERSHIP and never as a count',
    ).toBe(allowed('module.install', moduleOnlyGate.enabled))
    expect(underThePair, '§4 — and it admits it under the pair, for the same reason').toBe(allowed('module.install', pairedGate.enabled))
    expect(underModuleOnly, '§4 — stated on its own so the agreement above cannot be two `false`s agreeing: `module` alone does NOT open the install door').toBe(false)

    // THE INVOCATION INSTANT, through the FREE function and a stub door cast to the parameter type this module's OWN
    // signature declares (`signatures.md` §5: `invokeModuleTool(door, gate, toolName, args)`) — never a sibling
    // module's class and never a router (this battery's isolation rule; `design.md` §5).
    type DoorSeat = Parameters<typeof surface.invokeModuleTool>[0]
    const reached: PortCall[] = []
    const door = {
      install: () => [],
      activations: () => [],
      invoke: (toolName: string, args: unknown) => {
        reached.push({ toolName, args })
        return { called: toolName, args }
      },
    } as unknown as DoorSeat
    expect(
      () => surface.invokeModuleTool(door, moduleOnlyGate, 'module:alpha.one', {}),
      '§7 — at INVOCATION the pair is re-checked at EVERY call, fail-closed: a refused invocation THROWS an Error naming ' +
        'BOTH groups, so the refusal arrives on the protocol\'s error arm and is never a value',
    ).toThrow(/module AND code/)
    expect(
      reached.length,
      '§7 — and the GATE\'s refusal is made BEFORE ENTRY: the door was never reached, so the refusal is this side\'s own ' +
        'and no handler answered it',
    ).toBe(0)
    const admitted = surface.invokeModuleTool(door, pairedGate, 'module:alpha.one', { probe: 1 })
    expect(admitted, '§7 — under the pair the call reaches the DOOR, and the door\'s own record says WHICH name was admitted').toEqual({ called: 'module:alpha.one', args: { probe: 1 } })
    expect(
      reached,
      '§7, §5 — and the route is the door and ONE route: `invokeModuleTool` calls `invoke(toolName, args)` once, with the ' +
        'name as published and no wrapper beside it',
    ).toEqual([{ toolName: 'module:alpha.one', args: { probe: 1 } }])
    expect(() => surface.invokeModuleTool(door, pairedGate, 'module:', {}), '§7 — a bare `module:` is refused at the invocation instant too: malformed is malformed at every instant').toThrow()
    expect(
      () => surface.invokeModuleTool(door, pairedGate, 'provident.dispatch', {}),
      '§7 — and a STATIC name is refused by the same function: this gate is the module tool\'s and nothing else\'s, so it ' +
        'can never become a second admission rule for the foundation half',
    ).toThrow(/not a module tool/)
    expect(reached.length, '§7 — neither malformed name reached the door: every refusal above is made at THIS side, before entry').toBe(1)

    // **THE NULL-DOOR ARM, RE-GRAINED WITH THE ROUTE** (`signatures.md` §5; `design.md` §5): a port that does not
    // stand THROWS, and the words name the EXECUTOR the route reaches rather than the router it retires. A landing
    // that left the router's sentence in place reds on the second reading below.
    const noDoor = null as unknown as DoorSeat
    expect(
      () => surface.invokeModuleTool(noDoor, pairedGate, 'module:alpha.one', {}),
      '§5 — with no port injected the door is NULL and the call THROWS the null arm\'s own words: an admitted name with ' +
        'no door is a listing no handler answers, which is a throw and never a silent empty answer',
    ).toThrow(/executor/i)
    let nullDoorWords = ''
    try {
      surface.invokeModuleTool(noDoor, pairedGate, 'module:alpha.one', {})
    } catch (error) {
      nullDoorWords = error instanceof Error ? error.message : String(error)
    }
    expect(
      nullDoorWords,
      '§5 — and the words were RE-GRAINED: the null arm named the ROUTER the route retires (no module router configured), and ' +
        'the landing\'s arm names the EXECUTOR instead. A leftover router in these words is the retired route still speaking',
    ).not.toMatch(/router/i)
  })

  it('MS-5 · a static tool\'s gate is unmoved by the composition — a CONTROL, whose bite is the day the composition filters, re-seats or drops a static name (design.md §8, §9; L2 §10)', async () => {
    const gate = new security.SecurityGate({ token: null, enabled: FULL })
    // THE COMPOSITION IS LIVE HERE (a port with one activation is injected), so an implementation that composed into
    // the foundation half would have something to compose and would red below. **AND THE CANNED `dataSurface` IS THIS
    // ROW'S, NOT THE HARNESS'S** (`design.md` §5, §9 `F-1`): the identity measured below — every published static name
    // has a CAPTURED handle — holds only on a server where every admitted static name has a REGISTRATION ARM, and the
    // five `provident.data.*` arms are conditional on a surface having been supplied (`mcp-server.ts`'s data arm and
    // its `D-11` note). The stub's five methods are never called here: the names are registered, not invoked.
    const { server, close } = await live(gate, { modulePort: portOf(() => [['module:a.one']]) }, cannedDataSurface)
    try {
      const foundation = (names: readonly string[]): string[] => names.filter((name) => !name.startsWith(MODULE_NAMESPACE))
      // THE NARROWING'S SUBJECT, read off the module's own group rule rather than a spelled list.
      const dataGroup = ALL_TOOLS.filter((name) => security.groupForTool(name) === 'data')
      const published = foundation(server.allowedToolNames())
      const capturedStatic = foundation(capturedToolNames(server))
      expect(
        published,
        '§9 — THE CONTROL\'S CLAIM: the static half IS the gate\'s own derivation over `ALL_TOOLS`, so the composition neither ' +
          'widens nor narrows it. Compared by DERIVATION and never to a spelled list (D-26, D-41)',
      ).toEqual(surface.registeredToolNames(gate, ALL_TOOLS))
      // **A SET COMPARISON, AND THE ORDER IS DELIBERATELY NOT READ HERE** (`signatures.md` §3/§4): the composition is the
      // ONLY place the set is ordered, while `capturedToolNames()` is "the map's own reading" and its insertion order is
      // `registerTools`' ARM order — which is not `ALL_TOOLS`' order (the map is filled block by block, and `focus` and
      // the five `data` arms stand elsewhere in it). A sequence compare here would red a faithful landing on a pure
      // ordering difference and would misdiagnose itself as the capture identity `F-1` repaired; `MS-1` is the row that
      // reads the ORDER, and it reads it off the composition alone.
      expect(
        [...capturedStatic].sort(),
        '§9 — and the captured handles carry exactly that static half, no seat more and no seat fewer: a composed name with no ' +
          'handle, or a foundation seat missing from the map, reds here. Compared as a SET, because the accessor makes no ' +
          'ordering claim and the composition is the one site that orders anything (`signatures.md` §3, §4)',
      ).toEqual([...published].sort())
      // **THE PRECONDITION THE IDENTITY ABOVE RESTS ON, AS ONE TERM** (`design.md` §5, §9 `F-1`): the `data`-group names
      // the composition PUBLISHES and the `data`-group names the capture map HOLDS are the same number, because this
      // server supplied the one surface their arms are conditional on. It is a relation between two DERIVED readings —
      // no count is restated and no list is spelled. Take the surface away and the identity above is false for `D-11`'s
      // reason and not `S-5`'s, which is why the row states the term instead of leaving it to the reader.
      expect(
        capturedStatic.filter((name) => dataGroup.includes(name)).length,
        '§5, §9 — the `data`-group names the CAPTURE MAP holds equal the `data`-group names the COMPOSITION publishes: ' +
          'the one group whose registration arm is conditional on an injected surface (`D-11`), so it is the group that ' +
          'makes "every published name has a captured handle" true or false for a reason that is not `S-5`\'s (`F-1`)',
      ).toBe(published.filter((name) => dataGroup.includes(name)).length)

      expect(
        dataGroup.some((name) => published.includes(name)),
        'the precondition: a `data`-group seat STANDS under the `FULL` gate, so the narrowing below moves something and is not ' +
          'an empty set read as an absence',
      ).toBe(true)
      server.applyGatePatch({ disable: ['data'] })

      const narrowed = foundation(server.allowedToolNames())
      expect(
        narrowed,
        '§9 — A GATE MOVE IS A GATE MOVE: the composition froze no construction-time set, so after the patch the static half ' +
          'equals the derivation over the LIVE gate',
      ).toEqual(surface.registeredToolNames(server.gate, ALL_TOOLS))
      expect(dataGroup.some((name) => narrowed.includes(name)), '§9 — and no `data`-group seat survives the narrowing: the foundation half followed the gate').toBe(false)

      // THE RESOURCE SEAM IS UNMOVED (`design.md` §8): the composition is TOOLS, so no URI and no template gains a `module`.
      const resources = server.registeredResources().map((resource) => resource.uri ?? resource.uriTemplate ?? '')
      expect(
        resources.filter((key) => key.includes('module')),
        '§8 — the composition adds no resource and no template, so no `module` URI appears beside the app\'s own: the surface ' +
          'grew no second seam to publish a module through',
      ).toEqual([])
      expect(
        resources.some((key) => server.allowedResourceUris().includes(key)),
        '§8 — and the seam still answers the LANDED rows, so the absence above is a refusal-by-absence and not an empty ' +
          'registry standing in for one',
      ).toBe(true)
    } finally {
      await close()
    }
  })

  it('MS-6 · the dynamic arm\'s declared schema lets a caller\'s arguments reach the door by identity, and an omitted arguments member is the same call as `{}` (design.md §5, §9 `G-12`; L2 §10)', async () => {
    // **THE ONE CELL THIS REV MADE BEHAVIOURAL, AND THE ROW THAT PINS IT** (`design.md` §5, §9 `G-12`; L2 §10's
    // finding): the SDK parses every call against the tool's DECLARED `inputSchema` and hands the handler
    // `parseResult.data`, so an arm left at `inputSchema: {}` hands the door `{}` — every caller's member STRIPPED
    // before `invokeModuleTool` is reached — and a call that omits `arguments` altogether is refused by the parse
    // itself and never reaches the handler. The declaration therefore moves WITH the call site: no member declared
    // (a module tool's argument shape is the module's, never this surface's), nothing stripped.
    const gate = new security.SecurityGate({ token: null, enabled: FULL })
    const NAME = 'module:ms6.one'
    const port = portOf(() => [[NAME]])
    const { client, close } = await live(gate, { modulePort: port })
    try {
      expect(
        await listed(client),
        '§3, §5 — the precondition: the composition publishes the activation\'s name at CONSTRUCTION, and the registration ' +
          'arm captures a handle for it, so a call can cross the declaration at all. Absent, no name is listed, no door ' +
          'stands behind the name, and nothing below could be measured',
      ).toContain(NAME)

      // (1) THE CALLER'S OWN MEMBERS REACH THE DOOR, AND THEY REACH IT BY IDENTITY.
      const nested = { deep: [1, 2] }
      const outer = { probe: 1, nested }
      const answered = await call(client, NAME, outer)
      expect(
        answered.ok && !answered.isError,
        `§5 — a composed name's call is ANSWERED with the door's own value as the tool's body (isError absent): ${answered.text}`,
      ).toBe(true)
      expect(port.calls.length, '§5 — the call reaches the door ONCE, and the route is that one door').toBe(1)
      const atTheDoor = port.calls[0] as PortCall
      expect(atTheDoor.toolName, '§5 — with the name AS PUBLISHED, the composed `module:<n>.<t>` and no re-keying').toBe(NAME)
      expect(
        atTheDoor.args,
        '§5 `G-12` — **THE CALLER\'S MEMBERS REACH THE DOOR**: an arm left at `inputSchema: {}` hands the door `{}` (the SDK ' +
          'parses each call against the declaration and passes `parseResult.data`), so an empty reading here is THAT ' +
          'declaration and not the caller\'s call',
      ).toEqual(outer)
      expect(
        (atTheDoor.args as { nested?: unknown }).nested,
        '§5 `G-12` — **AND BY IDENTITY**: the value the door was handed IS the caller\'s own object (`toBe`), not a copy, a ' +
          'coercion or a re-keying. The parse hands the door a FRESH OUTER object — that belongs to the SDK — and the ' +
          'MEMBERS are the caller\'s, which is the identity L2 §10 claims for `args`',
      ).toBe(nested)

      // (2) AN OMITTED `arguments` MEMBER IS THE SAME CALL AS `{}` — never a refusal at the parse.
      const bare = await call(client, NAME)
      expect(
        bare.ok && !bare.isError,
        `§5 — a call that omits \`arguments\` reaches the handler as \`{}\` and is ANSWERED. An empty raw shape refuses it at ` +
          `the parse and no handler stands: ${bare.text}`,
      ).toBe(true)
      expect(port.calls.length, '§5 — and it was a second, real call through the same arm').toBe(2)
      expect(port.calls[1]?.args, '§5 — reaching the door as the empty record, which is the SAME call as `{}`').toEqual({})

      // (3) THE DECLARED SHAPE IS A RECORD, AND A MEMBER IT CANNOT DESCRIBE NEVER REACHES THE SURFACE — the other half
      // of "the door's identity is the MEMBERS'": a number, a string or an array is refused before this surface stands,
      // so an arm declaring `z.unknown()` (or no schema at all) is as wrong as one declaring `{}`.
      const notARecord = await call(client, NAME, [1, 2] as unknown as Record<string, unknown>)
      expect(
        notARecord.ok && !notARecord.isError,
        `§5 — an \`arguments\` member the declared shape cannot describe (an array here) is REFUSED before the door: ${notARecord.text}`,
      ).toBe(false)
      expect(port.calls.length, '§5 — and the door was never reached by it: the refusal is the parse\'s, ahead of this surface').toBe(2)
    } finally {
      await close()
    }
  })
})
