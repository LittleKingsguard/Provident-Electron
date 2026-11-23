// tests/unit/mcp-surface/published-set.test.ts — THE L3 UNIT BATTERY of `mcp-surface` for L1 `S-5`
// (`docs/L1/modularity.md` §3, unit `modularity`'s `U1`). ONE file, five rows, ids `MS-1`…`MS-5`, and the ids are
// **FILE-SCOPED TO THIS FILE**: a cite names the file and the id together, and this header claims NOTHING about any
// other page's ids — scope is declared per file and per file only (`design.md` §9 rev 2; `strata/decisions.md`
// D-30/D-40, whose scope ids belong to the file that carries them).
//
// WHAT IT IS, AND WHAT ITS ONLY READINGS ARE. The REAL `ProvidentMcpServer` (`src/main/mcp-server.ts`) and the
// REAL registration predicates of `src/main/security.ts`, read through the module's OWN registration surface
// (`allowedToolNames`, `capturedToolNames`, `registeredEnabled`, `syncPublishedTools`, `applyGatePatch`,
// `registeredResources`, `allowedResourceUris`, and the module's own free functions `registeredToolNames` and
// `invokeModuleTool`) with ONE MCP client connected on the SDK's in-memory linked
// transport. The `backend` is a canned recorder, so no row drives the renderer; no handler map is poked and the
// subject is never mocked. `composePublishedSet` is driven as the pure function it is, over the same gate and
// the same activation source the live server is built with, so the server is compared to the RULE and never to
// a spelled list.
//
// **AUTHORED AFTER the `D-30` sweep, so this file carries NO `strata:marked` / `strata:marked-file` marker and
// GATES (D-40; `strata/decisions.md` D-30/D-40).**
//
// **RED ON ARRIVAL, ROW BY ROW, AND EACH RED NAMES ITS OWN CAUSE** (D-3, D-40; `design.md` §9). Not one byte of
// `src/**` carries this pass yet — there is no `composePublishedSet`, no `syncPublishedTools`, no
// `capturedToolNames`, no `registrationAllowed`, and no `activations`/`appVersion` option member — and that
// absence IS this battery's reading:
//   · `MS-1`, `MS-2`, `MS-4` and `MS-5` are red because `S-5`'s implementation is absent from `src/**`; an L4
//     pass owns it. Each row's first failure names the export or member it could not find and the `design.md`
//     section that owes it, through the `need`/`onServer` helpers below.
//   · `MS-3` is red in BOTH arms: its INJECTED arm for the same absence (the transport publishes the landed
//     `'0.1.0'` literal rather than the value it is given), and its AUTHORITY arm because `appVersion()` is
//     `S-4`'s and `S-4` and `S-5` are TWO STEPS OF ONE SUB-UNIT (`U1`), so `src/shared/module-contract.ts` cannot be read
//     yet — the row throws the PREREQUISITE naming that file instead of pretending the reading stood.
// **A RED HERE IS THE BATTERY'S EVIDENCE AND NOT A DEFECT, AND NOT ONE LINE MAY BE SOFTENED TO MAKE THE TREE
// COMPILE**: the file type-checks at this head (the absences are named at RUN time, and the places the landed types
// cannot be named are TWO documented casts — the construction's and the canned `dataSurface` seat's), so a green
// `tsc` buys no row its green at run.
//
// **`MS-5` IS THE CONTROL, AND ITS BITE IS NAMED IN ITS OWN TITLE AND MESSAGE.** Its claim — a static tool's
// gate is unmoved by the composition — holds at this head in SUBSTANCE (the static half already IS the gate's
// derivation) and holds after the landing by construction, so its green is evidence of nothing unless the bite
// is spoken: **the day the composition FILTERS, RE-SEATS or DROPS a static name.** It nevertheless reds on
// arrival, and the reason is stated rather than smoothed: the second reading it takes — `capturedToolNames()` —
// is `S-5`'s own member and nothing in `src/**` declares it, so the row cannot run its claim before the landing.
// That red is the LANDING's evidence, never the claim's.
//
// WHAT IT DOES NOT MEASURE, EACH WITH ITS OWNER. The executor's admissions and the resolver's order are
// `module-system`'s (`S-1`…`S-4`; `docs/L2/module-system/interface.md` §11/§12): no row here constructs a
// `CapabilityRouter`, and none imports that module's source statically. A boot, an Electron leg and a rendered
// surface are nobody's subject here — this is a NODE-PROCESS battery over one module's own registration
// surface, so a green here is envelope-green and NEVER app-green (`strata/brief.md` §6, D-27). The HTTP
// transport's per-POST rebuild is read as a construction fact inside `src/main/mcp-server.ts` and never booted
// (`design.md` §5), and no row drives `http`. The exclusion tier is `secure-panels`' subject and no row opens
// it. And **no count of `ALL_TOOLS`, of a group, of a resource or of `ALL_RESOURCES` is asserted anywhere in
// this file**: the relations are SETS, ABSENCE and DERIVATION, and every figure another page owns is read where
// it lives and never restated here (D-26, D-41, D-43).
//
// TWO THINGS IT DELIBERATELY DOES NOT DO. The ids are file-scoped TO THIS FILE — a cite names the file and the id
// together, and no line here speaks for another page's ids (`design.md` §9). And no row asserts the ABSENCE of the
// SDK's own tool-name validation warning for a `module:<n>.<t>` name:
// that warning is a WARN, never a refusal, and demanding its silence would make a row red for the SDK's prose
// (`design.md` §9 `G-9`).
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

/** `design.md` §2/§3 — the signatures `S-5` adds, transcribed HERE because `src/**` cannot be read for them yet;
 *  they retire into the module's own types the pass that lands them (`signatures.md` §2, §3). */
interface ActivationLike { readonly tools: readonly string[] }
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

/** The port `design.md` §2 declares, as an injected source: each argument is one activation's `tools`, already
 *  full names, and the argument order is the registry's order. */
const activationsOf = (...groups: string[][]): { activations: () => { tools: string[] }[] } =>
  ({ activations: () => groups.map((tools) => ({ tools })) })

/** **THE ONE CAST THE CONSTRUCTION NEEDS, AND IT IS THE BATTERY'S ONE CONCESSION TO A LANDING THAT HAS NOT
 *  HAPPENED — removed by the pass that lands `S-5`.** The two option members the rows inject (`activations`,
 *  `appVersion`) are declared by `signatures.md` §5 and by nothing in `src/**` yet, so the landed options type
 *  does not name them. A TYPE ASSERTION does not trigger the excess-property check, so
 *  `{ backend, transport, gate, activations, appVersion }` is accepted at this head and needs no edit when L4
 *  widens `McpServerOptions` (`design.md` §2's two option rows). The `need`/`onServer` casts above are the same
 *  concession made at the two access points, each of which NAMES what it could not find at run time. */
type ServerOptions = ConstructorParameters<typeof surface.ProvidentMcpServer>[0]
const build = (options: Record<string, unknown>): Server =>
  new surface.ProvidentMcpServer(options as unknown as ServerOptions)

/** **THE OPTIONS' OWN `dataSurface` SEAT, NAMED THROUGH THIS MODULE AND NEVER THROUGH A SIBLING'S CLASS** — the rule
 *  the router stub in `MS-4` follows: a battery reads the signature THIS module declares, so the seat is read off
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
 *  server whose every admitted static name has a REGISTRATION ARM (`design.md` §5's corrected capture identity). */
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

/** One tool call on the protocol's own path: the tool's text, or the protocol's ERROR arm (`ok:false`), which is
 *  how a refusal at INVOCATION arrives and how an ABSENT name arrives (`design.md` §7). */
interface CallAnswer { ok: boolean; value: unknown; text: string }
async function call(client: Client, name: string, args: Record<string, unknown> = {}): Promise<CallAnswer> {
  try {
    const result = (await client.callTool({ name, arguments: args })) as unknown
    const text = (result as { content?: Array<{ type?: string; text?: string }> }).content?.[0]?.text ?? ''
    try {
      return { ok: true, value: JSON.parse(text) as unknown, text }
    } catch {
      return { ok: true, value: { __unparsable: text }, text }
    }
  } catch (error) {
    return { ok: false, value: null, text: `MCP ERROR: ${error instanceof Error ? error.message : String(error)}` }
  }
}

describe('mcp-surface — the published set, its re-registration, its version and its two-gate (S-5, design.md rev 2)', () => {
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

    // THE SERVER ARM: the same rule, over the SAME gate and the SAME activation source the server was built with.
    const gate = new security.SecurityGate({ token: null, enabled: FULL })
    const source = activationsOf(['module:a.one'], ['module:b.two'])
    const { server, close } = await live(gate, { activations: source })
    try {
      const published = server.allowedToolNames()
      expect(
        published,
        '§3 — the published set IS `composePublishedSet` over the gate and the activation source this server holds: the ' +
          'row compares a derivation to a derivation, never to a spelled list, so a second composition site reds here',
      ).toEqual(compose(surface.registeredToolNames(gate, ALL_TOOLS), source.activations(), (name) => gate.toolAllowed(name)))

      const captured = capturedToolNames(server)
      for (const name of source.activations().flatMap((activation) => activation.tools)) {
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

  it('MS-2 · an activation re-registers on the LIVE server and the withdrawal takes the old name away (design.md §5; L2 §12)', async () => {
    // A MUTABLE SOURCE, so the registry moves OUTSIDE a tool call — `design.md` §5's third caller, which is
    // module-system's and reaches this member and nothing else.
    let current: Array<{ tools: string[] }> = [{ tools: ['module:alpha.one'] }]
    const source = { activations: () => current }
    const STANDING = 'module:alpha.one'
    const MOVED = 'module:alpha.two'
    const gate = new security.SecurityGate({ token: null, enabled: FULL })
    const { server, client, close } = await live(gate, { activations: source })
    try {
      // THE PRECONDITION, so the withdrawal below has something to withdraw.
      expect(
        await listed(client),
        '§3, §5 — the precondition: the composition publishes the activation\'s name at CONSTRUCTION. Absent, S-5\'s ' +
          'composition is not in src/** yet and the withdrawal below would be a measurement of nothing',
      ).toContain(STANDING)
      expect(capturedToolNames(server), '§5 — and a captured handle stands for it, so `remove()` has a name to withdraw').toContain(STANDING)
      expect(server.registeredEnabled(STANDING), '§5 — and the handle is enabled under `module` AND `code`').toBe(true)

      const before = server.ensureServerRegistered()
      current = [{ tools: [MOVED] }]
      const moved = syncPublishedTools(server)

      expect(moved.withdrawn,
        '§5 — the act\'s OWN reading: a captured `module:`-prefixed name the registry no longer holds is WITHDRAWN — the ' +
          'registry is read UNFILTERED by group, so a group-off name is never mistaken for a withdrawn one',
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
        withdrawnCall.ok,
        `§5 — a call on a withdrawn name FAILS AT THE PROTOCOL (ok:false), the error arm and never a refusing value: ${withdrawnCall.text}`,
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
        '§6 — the transport REPORTS the number it is given: the `\'0.1.0\'` literal still stands at `createServer` today, so ' +
          '`McpServerOptions.appVersion` is not landed (S-5, an L4 pass) and the published answer is the literal',
      ).toBe('9.9.9')
    } finally {
      await injected.close()
    }

    // ARM (b), THE AUTHORITY ITSELF. The ONE dynamic import of this file, with a NON-LITERAL specifier so a missing
    // file reds THIS row and not the whole file at typecheck time: `appVersion()` is S-4's, and S-4 and S-5 are TWO
    // STEPS OF ONE SUB-UNIT (`U1`), so `src/shared/module-contract.ts` is unreadable until that pass lands
    // (`docs/L2/module-system/interface.md` §8; `design.md` §6, §11).
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

  it('MS-4 · the two-gate refuses by NAME at its REGISTRATION and INVOCATION instants (design.md §4, §7; L2 §10)', () => {
    // **TWO INSTANTS, AND THIS ROW TAKES EXACTLY THE TWO IT NAMES.** REGISTRATION is the candidate list's predicate and
    // INVOCATION the per-call pair. The re-gate is the landed mechanism's THIRD instant, and its PAIR BREADTH — a `code`
    // withdrawal closing the `module.list` census door — is measured by the L2 battery's `I-5` and is DELIBERATELY NOT
    // RE-DRIVEN HERE (`design.md` §4, §9 `F-9`; L2 §10's `I-5` grain). So `I-5` remains the pair's breadth carrier and
    // this row does not become its second one: a unit row that named an instant it never took would be an accounting,
    // not a measurement.
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

    // THE INVOCATION INSTANT, through the FREE function and a STUB router cast to the parameter type this module's
    // OWN signature declares — never a sibling module's class (this battery's isolation rule; `design.md` §4).
    type RouterSeat = Parameters<typeof surface.invokeModuleTool>[0]
    const router = { invokeTool: (name: string, args: unknown) => ({ called: name, args }) } as unknown as RouterSeat
    expect(
      () => surface.invokeModuleTool(router, moduleOnlyGate, 'module:alpha.one', {}),
      '§7 — at INVOCATION the pair is re-checked at EVERY call, fail-closed: a refused invocation THROWS an Error naming ' +
        'BOTH groups, so the refusal arrives on the protocol\'s error arm and is never a value',
    ).toThrow(/module AND code/)
    const admitted = surface.invokeModuleTool(router, pairedGate, 'module:alpha.one', { probe: 1 })
    expect(admitted, '§7 — under the pair the call reaches the router, and the router\'s own record says WHICH name was admitted').toEqual({ called: 'module:alpha.one', args: { probe: 1 } })
    expect(() => surface.invokeModuleTool(router, pairedGate, 'module:', {}), '§7 — a bare `module:` is refused at the invocation instant too: malformed is malformed at every instant').toThrow()
    expect(
      () => surface.invokeModuleTool(router, pairedGate, 'provident.dispatch', {}),
      '§7 — and a STATIC name is refused by the same function: this gate is the module tool\'s and nothing else\'s, so it ' +
        'can never become a second admission rule for the foundation half',
    ).toThrow(/not a module tool/)
  })

  it('MS-5 · a static tool\'s gate is unmoved by the composition — a CONTROL, whose bite is the day the composition filters, re-seats or drops a static name (design.md §8, §9; L2 §10)', async () => {
    const gate = new security.SecurityGate({ token: null, enabled: FULL })
    // THE COMPOSITION IS LIVE HERE (an activation is injected), so an implementation that composed into the
    // foundation half would have something to compose and would red below. **AND THE CANNED `dataSurface` IS THIS
    // ROW'S, NOT THE HARNESS'S** (`design.md` §5, §9 `F-1`): the identity measured below — every published static name
    // has a CAPTURED handle — holds only on a server where every admitted static name has a REGISTRATION ARM, and the
    // five `provident.data.*` arms are conditional on a surface having been supplied (`mcp-server.ts`'s data arm and
    // its `D-11` note). The stub's five methods are never called here: the names are registered, not invoked.
    const { server, close } = await live(gate, { activations: activationsOf(['module:a.one']) }, cannedDataSurface)
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
})
