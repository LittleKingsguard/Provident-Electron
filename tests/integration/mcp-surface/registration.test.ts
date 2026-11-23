// tests/integration/mcp-surface/registration.test.ts — THE L2 BATTERY for `mcp-surface`: the SET the transport
// publishes and the DOOR a composed name's call reaches, driven through the module's own registration surface in one
// node process. Six rows, `I-1`…`I-6`, and **THE IDS ARE FILE-SCOPED TO THIS FILE** — a cite names the file and the id
// together, because `tests/focus-tool.test.ts` already owns `I-1`…`I-13` for this same module and no renumber of either
// file is owed (`docs/L2/mcp-surface/interface.md` §7; D-41).
//
// (1) WHAT IT IS AND WHAT IT DRIVES. The REAL `ProvidentMcpServer` (`src/main/mcp-server.ts`) and the REAL predicates
// of `src/main/security.ts` — `registrationAllowed`, `groupForTool`, `moduleToolAllowed` and `SecurityGate` are read
// where they live and never re-spelled — over the repo's own `@modelcontextprotocol/sdk` client on an in-memory
// linked transport: `tools/list` IS the listing, a tool call IS the call, `serverInfo` IS the published number, and the
// two resource listings are the protocol's own. The one `moduleStore` is the node suite's census fixture
// (`tests/module-registry-fixture.ts`, the `file.modules.<id>` rows of a real crossing). No handler map is hand-poked,
// no private member is reached past the surface's own accessors, and the subject is never mocked.
//
// (2) `strata:marked` — **THE FILE CARRIES NO MARKER AND GATES.** It was authored after the `D-30` sweep, so it is
// EVIDENCE and not a pin: no row here reports ON NOTICE and a red here blocks (`D-40`; `strata/decisions.md` D-30).
//
// (3) THE ROUTE THIS FILE RIDES, THE ROUTE IT RETIRED, AND THE METHOD IN THREE NAMED KINDS. The dynamic half arrives
// through **ONE injected `ModulePort`** (`modulePort` option), and that one object answers all three questions this
// battery asks it: `activations()` for the published NAMES, `invoke(toolName, args)` for the CALL, and
// `install({kind:'source', source})` for the DELIVERY the two install tools hand their source to.
// **`syncModuleRouter` and `CapabilityRouter` are RETIRED and read by NOTHING here** — neither `router.listTools()`, nor
// `router.invokeTool(…)`, nor `router.clear()` appears below, and `src/renderer/extensions.ts` is imported by no line of
// this file: that half declares no tool table and mints no `module:<n>.<t>` tool name
// (`docs/L2/mcp-surface/interface.md` §10; `docs/L3/mcp-surface/design.md` §2's RETIRE rows, §5).
//
// **THE METHOD IS THREE NAMED KINDS OF READING, AND NOTHING HERE IS "ALL DERIVED"** — a reader who took the whole file
// for derivation-against-derivation would be reading a claim this file does not make:
//   (a) THE SET EQUALITIES ARE DERIVATION AGAINST DERIVATION, and they are the ONLY readings of that kind: `tools/list`
//   and/or `allowedToolNames()` against `derivationOf`, whose body is `composePublishedSet` over
//   `registeredToolNames(server.gate, ALL_TOOLS)`, the port's `activations()` and `gate.toolAllowed` — spelled ONCE,
//   there, and never re-typed per row. **AND THE TWO EQUALITIES DO NOT CARRY THE SAME BITE, said so that nobody takes
//   the wrong one for the load-bearing one**: the WIRE equality (`tools/list` against `derivationOf`) is the
//   load-bearing one, because it is the only reading here that asks the SDK's OWN REGISTRY rather than the rule — it
//   reds for a defect INSIDE the rule in its OVER-COMPOSING direction (one name composed TWICE: the arms key by name, so
//   the wire answers once where a rule that failed to dedupe answers twice) and for a registration arm that answers a
//   name the composition withholds.
//   **AND THE ARMS ARE FED FROM THE COMPOSITION, SO TWO WHOLE DIRECTIONS ARE INVISIBLE TO THAT EQUALITY — said rather
//   than left to be found**: a lost static name leaves `tools/list` and `derivationOf` together, and a name the rule
//   composed OUTSIDE the `module:` namespace is registered by the dynamic arm as readily as any other (that arm's one
//   filter is `allowed.includes`), so both sides move as one in each case. The predicate's own answer is carried instead
//   by the LITERAL containment readings (`I-6`: the census door stands while the install door does not — a claim the
//   derivation cannot make, because the same predicate defect moves both of its sides), and the namespace test is the
//   PURE rule's own row (`MS-1`, over names it invents), never this equality's. The foundation's ROSTER is a FIGURE this
//   file asserts nowhere (item 7: two named seats in `I-6` are not a membership, let alone a count — `D-26`, `D-43`).
//   The ACCESSOR equality (`allowedToolNames()` against that same derivation) is a DRIFT GUARD
//   and never the load-bearing one — both of its sides call ONE rule over the SAME gate object and the SAME port
//   object, so it reds for a SECOND composition site or a CACHED set and NEVER for a defect inside the rule, which both
//   sides would share.
//   (b) THE READINGS THE STUB RECORDED — `deliveries`, `calls`, `answers` — say what the SURFACE did with the port: one
//   delivery per act, one call carrying the caller's own member, one answer carried verbatim. They record an ACT and
//   re-derive no rule.
//   (c) THE SHAPES THE DESIGN FIXES stand here as LITERALS, and each is a claim about the CONTRACT rather than a list
//   this file typed out: the composed `module:<n>.<t>` namespace (`['module:live-module.probe']`,
//   `['module:live-module.probeB']`, `'module:twin.probe'`), the verdicts' declared members
//   (`installed`/`updated`/`rejected`/`no-op`, read off the arm's own answer) and the census record's members
//   (`name`, `version`, `capabilities`, and no `status`/`activated`). **THESE ARE THE CELLS WHERE §5's TWO-STORE CLAIM
//   AND §4's PAIR CLAIM ACTUALLY LIVE**: the two stores are read side by side, each in its OWN shape, and the pair is
//   read as which of the two doors `tools/list` carries.
//
// (4) THE PORT IS INJECTED AS A STRUCTURAL STUB, AND THE PRICE IS STATED. `createModuleExecutor` is `module-system`'s
// code (`src/main/modules/`) and that module's own batteries (`tests/e2e/modularity/`,
// `tests/integration/module-system/`) drive its admission, its resolver and its door's body; `ModulePort` is a
// STRUCTURAL type and this seam is exactly what this surface consumes, so this file constructs no executor, imports
// none of its source and stands in no second battery of that module's claims (D-3, D-5). The stub's ACTIVATION TABLE is
// its own: it is seeded by a literal, written by its own `install`, and **NEVER derived from the census fixture** — the
// two stores answer two questions and are not one registry (`design.md` §5: the `ModuleStore` is the census of
// INSTALLED rows, the executor's registry is its own activation table). `I-6`'s third arm turns that sentence into a
// measurement: the census holds a loaded module and the published set holds no name of it.
//
// (5) RED-FIRST, ROW BY ROW. `I-1`/`I-2`/`I-4` were the rows whose subject the landing had to build — the composition
// over the port, the live re-registration on the server the client is already speaking to, the door a composed name's
// call is handed to, and the delivery's two facts on two stores. **AT THIS HEAD THE LANDING STANDS, SO NO ROW OF THIS
// FILE IS RED-FIRST**: every expectation below is green against the surface as it stands, and each row's bite is
// therefore NAMED IN ITS OWN MESSAGE rather than demonstrated by its arrival — `I-3`, `I-5` and `I-6` as the three
// CONTROLS they are (the number's drift, the two-gate's three instants, the composition's refusals-by-absence), and
// `I-1`, `I-2` and `I-4` by the member each of them would lose first if the route were left half-moved.
//
// (6) WHAT IT DOES NOT MEASURE, WHAT IT DOES, AND THE ONE OVERLAP — NAMED RATHER THAN CLAIMED AWAY. The executor's
// admission, its resolver and its ctx halves, and the door's own BODY, are `module-system`'s (`S-1`…`S-4`;
// `docs/L2/module-system/interface.md` §11). **`tests/unit/mcp-surface/` — ids `MS-n` and `SD-1`, file-scoped there —
// reads, and this file does NOT re-take**: the PURE rule's examples over names it INVENTS, `capturedToolNames()`'s
// `added`/`withdrawn` DELTA, the group axis as a TOGGLE — the map's assertion that the handle stays CAPTURED, that its
// bit flips, that the listing hides and republishes and that `capturedToolNames()` still holds it, which is `MS-2`'s —
// while `I-5` drives that SAME mechanism as the INSTRUMENT of its second and third instants and takes exactly TWO things
// of its own from it: the door's call count staying put across the gate's refusal (arm (d)), and the pair's MEASURED
// BREADTH on the census door — which the unit battery's own `MS-4` names as this row's, together with the class
// accessor's instant. `registrationAllowed`'s totality over a malformed `enabled`, the version seam's injection and the
// `D-45` delta check are that file's too. **AND WHAT THIS FILE'S SUBJECT IS, WHICH NO OTHER FILE TAKES IN THIS FORM** —
// the grain is the difference, and each arm says which: (a) **the DELIVERY arm**, two
// facts on two stores, ONE `install` per act, an unmoved or a refused census row ENDING the arm; (b) **a WITHDRAWAL read
// as UNREACHABILITY at the door** — a withdrawn name is not merely un-listed, it reaches no `invoke` at all, and the
// reading is the door's CALL COUNT after a LIVE re-publish, over a name a DELIVERY activated (the unit battery's `MS-2`
// takes the withdrawal and the wire's refusal at the MAP, and reads no door count across a re-publish); (c) **the dynamic
// arm's SCHEMA CELL read on the PROTOCOL's own parse path**, where the SDK parses a
// call against the registered declaration and hands the handler `parseResult.data`, so a caller's member either survives
// to the door or does not — and here the name is one a DELIVERY activated, while the unit battery's `MS-6` reads the same
// declaration cell over a port it seeds itself; (d) **the GATE's refusal PRECEDING the door**, read as the door's call
// count staying put **at the CLASS's own accessor** (`server.invokeTool`, the instant `docs/L2/mcp-surface/interface.md`
// §7's marks statement assigns to this row) — **and the same FACT is the unit battery's `MS-4` at the FREE function's
// grain**, said plainly because here the GRAIN is what is taken and not the fact; and (e) **the DOOR's own refusal
// rendered as the ANSWER BODY** — a `status:'refused'` value read like any other answer, `isError` absent — which
// nothing else under `tests/` reads at this head. **WHERE THIS FILE TAKES THE COMPOSITION RELATION THE UNIT BATTERY ALSO
// READS, THE OVERLAP IS DELIBERATE — AND IT STANDS AT TWO GRAINS, said here rather than claimed away**: `tools/list`
// against `derivationOf` (the WIRE, this file's load-bearing reading) and `allowedToolNames()` against that same
// derivation (the ACCESSOR, which is the reading the unit battery's `MS-1` server arm also takes, and which item (3)(a)
// prices here as the drift guard it is). What is NOT re-taken is the rule's PURE examples over invented names, the
// map-level `added`/`withdrawn` delta, the toggle as a claim, and the `D-45` delta check.
// The HTTP transport's per-POST rebuild is read as a
// CONSTRUCTION FACT in `src/main/mcp-server.ts` and never booted: no row here drives `http`. The exclusion tier is
// `secure-panels`' subject and no row opens it. A boot, an Electron leg or a rendered surface is nobody's subject
// here — this is a NODE-PROCESS battery over one module's own registration surface, so a green here is envelope-green
// and NEVER app-green (`strata/brief.md` §6, D-27). And the `requires.app` resolver is `module-system`'s `S-4`: this
// surface PUBLISHES the number and judges no range, so `I-3` is the only row that reads it and no row here installs a
// module against a version constraint (`docs/L2/mcp-surface/interface.md` §11).
//
// (7) AND NO FOUNDATION FIGURE IS ASSERTED ANYWHERE IN THIS FILE — not a count of `ALL_TOOLS`, of a group, of a resource
// or of `ALL_RESOURCES`, and not a roster of any of them. The relations here are SETS, ABSENCE and DERIVATION (D-26,
// D-43, `G-9`), and the numbers that stand are the SUBJECT'S OWN — a delivery count, a call count, an answer count (item
// (3)(b)) — plus ONE reading of the published listing's CARDINALITY in `I-6`, which asserts only that the static set is
// not EMPTY (`> 0`, so the absence it neighbours is a refusal and not a blanket one) and therefore restates no figure
// another page owns. And no row asserts the absence of the WARN a
// `module:<n>.<t>` registration draws on its `:` — that warning is a warn and never a refusal, so demanding its silence
// would red a row for the SDK's prose (`design.md` §9 `G-9`).
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { afterAll, describe, expect, it } from 'vitest'

import {
  ProvidentMcpServer, composePublishedSet, registeredToolNames,
  type McpBackend, type ModulePort, type ModuleStore,
} from '../../../src/main/mcp-server.js'
import { SecurityGate, type ToolGroup } from '../../../src/main/security.js'
import { createModuleRegistry } from '../../module-registry-fixture.js'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
/** **THE BUILD'S OWN VERSION, READ OFF ITS MANIFEST AND NEVER RE-SPELLED** (D-41: a site, not a literal — the site is
 *  `package.json`'s `version` member). This is the file's ONE manifest read and `I-3` is its only reader. */
const BUILD_VERSION = String((JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as { version?: unknown }).version ?? '')
/** `module` is the composition's group and `code` is what a module tool's EXECUTION needs, so an install and a dynamic
 *  call both take both (`src/main/security.ts`'s `groupForTool`/`moduleToolAllowed`); `read`/`dispatch` stand so the
 *  static half is never empty in a row that measures an absence. */
const FULL: ToolGroup[] = ['read', 'dispatch', 'graph', 'code', 'module', 'data']
const MODULE_ONLY: ToolGroup[] = ['read', 'dispatch', 'module']
const WITHOUT_MODULE: ToolGroup[] = ['read', 'dispatch']

const backend: McpBackend = { invoke: async () => ({}) }

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

/** **A ROW'S CENSUS**, over its own scratch profile: the fixture the node suite already uses for a module store, so no
 *  row invents a store and no `src/` store is constructed here (`tests/module-registry-fixture.ts`). */
function censusIn(): ModuleStore {
  const dir = mkdtempSync(join(tmpdir(), 'mcp-surface-census-'))
  scratch.push(dir)
  return createModuleRegistry(dir)
}

/** What the transport actually PUBLISHES: the listing, read as names. */
const listed = async (client: Client): Promise<string[]> => (await client.listTools()).tools.map((tool) => tool.name)
/** The set reading, used wherever this file says the relation is a SET's and not a sequence's. */
const sorted = (names: readonly string[]): string[] => [...names].sort()

/** **ONE TOOL CALL ON THE PROTOCOL'S OWN PATH, WITH ITS THREE ARMS KEPT APART** (`design.md` §7): `ok` is "the protocol
 *  ANSWERED with a result", `isError` is "that result rode the SDK's tool-error arm" (`isError: true`, which is how a
 *  GATE refusal — made at this side BEFORE entry — and the SDK's own unknown-name refusal arrive), and a thrown
 *  rejection is `ok: false`. A DOOR refusal is NEITHER: it is a VALUE inside a plain answer with `isError` absent, so
 *  an agent reads the door's `reason` exactly as it reads any other value (D-105). */
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

type Json = Record<string, unknown>
const asObject = (value: unknown): Json | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Json) : null
const str = (value: unknown): string | null => (typeof value === 'string' ? value : null)
/** The `status` member of an OBJECT answer — the census's verdicts (`install`'s `no-op`, `install`'s `rejected`) arrive
 *  as ONE object, and this reader says so by refusing to look inside a list. */
const statusOf = (answer: CallAnswer): string => str(asObject(answer.value)?.['status']) ?? '(no `status` member)'
/** The `status` member of a PORT's answer, which arrives as a LIST of verdicts — the same reader, one step in. A census
 *  answer is a single object and every row that reads one uses `statusOf` above, so the two shapes never blur. */
const verdictOf = (answer: CallAnswer): string => {
  const held = Array.isArray(answer.value) ? (answer.value as unknown[])[0] : answer.value
  return str(asObject(held)?.['status']) ?? '(no `status` member)'
}
/** A parsed list answer read as a list of objects; an answer that is not a list answers no rows at all. */
const rowsOf = (answer: CallAnswer): Json[] =>
  Array.isArray(answer.value) ? (answer.value as unknown[]).map(asObject).filter((row): row is Json => row !== null) : []

/** **THE MANIFEST A MODULE'S `source` STRING IS** (`docs/L2/module-system/interface.md` §1): name, version, the
 *  declaration and the `capabilities.tools` this surface's composition is handed as NAMES. **NOTHING IN THIS FILE
 *  EVALUATES `ENTRY`** — there is no `eval` here and no import of a module's source: the fixture census records the
 *  manifest as a ROW, and the injected port reads only `capabilities.tools` out of it (`design.md` §5's two stores). */
const ENTRY = 'function (ctx) { /* inert: nothing in this file evaluates a module source */ }'
const manifestOf = (name: string, version: string, tools: readonly string[]): string =>
  JSON.stringify({ name, version, entry: ENTRY, capabilities: { tools: [...tools] } })

/** The names one module owns in the published set, filtered off the wire's own answer. */
const dynamicNames = (names: readonly string[], module: string): string[] =>
  names.filter((name) => name.startsWith(`module:${module}.`))

/** One call the DOOR received, recorded BY REFERENCE — the reading that says WHICH name was admitted and WHETHER the
 *  caller's own member arrived with it (`design.md` §5, §9 `G-12`). */
interface PortCall { readonly toolName: string; readonly args: unknown }
/** One DELIVERY the port received (`design.md` §5; `docs/L2/mcp-surface/interface.md` §10's delivery clause). */
interface PortDelivery {
  readonly kind: 'source'
  readonly source: string
  readonly name: string | null
  /** The COMPOSED `module:<n>.<t>` names this delivery activated. */
  readonly tools: readonly string[]
  /** Did the persisted census row already stand when the delivery arrived? This is the ORDER, recorded by the stub. */
  readonly censusStood: boolean
}
/** **THE PORT THIS BATTERY INJECTS** — a structural stub, and every behaviour below is the STUB'S and not the
 *  executor's (`design.md` §2; the header's price clause). It answers three things and records all of them, so a row
 *  can read what the surface DID with the port rather than what the port promised. */
interface RecordedPort extends Omit<ModulePort, 'install'> {
  install(delivery: { readonly kind: 'source'; readonly source: string }): readonly { status: string; name: string; activated?: readonly string[] }[]
  /** **A ROW-FACING SETTER, so the door can REFUSE a name that STANDS** — the refusal is the DOOR's and it names its
   *  own reason, which is exactly what `design.md` §7's second row makes a VALUE (`signatures.md` §2: `invoke`'s answer
   *  is the door's, a handler's value OR its own refusal VALUE). */
  refuse(toolName: string, reason: string): void
  readonly calls: PortCall[]
  readonly deliveries: PortDelivery[]
  readonly answers: unknown[]
}

/** **THE DOOR'S REFUSAL VALUE, IN THE FOUR MEMBERS `design.md` §7 FIXES** (`{status:'refused', reason, subject, message}`;
 *  `docs/L2/mcp-surface/interface.md` §10's split): a `reason:'tool-unknown'` for a name that does not stand and a
 *  `reason:'handler-threw'` for a body that threw, rendered by the same `text(value)` a landed answer takes, with
 *  `isError` ABSENT. Spelled ONCE here, because the stub answers it and `I-1` reads it back verbatim. */
const doorRefusal = (toolName: string, reason: string): Json => ({
  status: 'refused',
  reason,
  subject: toolName,
  message: `the door refused ${toolName}: ${reason} — no handler answered`,
})

/**
 * **THE STUB, AND ITS ACTIVATION TABLE IS ITS OWN.** `seed` pre-populates `module name -> declared tool names`, which
 * is the "a module already activated at construction" case; nothing else writes the table but the stub's own
 * `install`. `activations()` answers one `{ tools }` per entry **in insertion order**, each tool normalised to its FULL
 * published name — and it reads the table and NEVER the census, because the two stores answer two questions
 * (`design.md` §5). `install` records the delivery (the source BY REFERENCE, the composed names, and whether the
 * census row already stood), REPLACES that module's entry — which is what makes an update withdraw the old names and
 * publish the new ones — and answers the verdicts the surface hands back as the tool's answer. `invoke` records the
 * call by reference and answers a record built from it, so a row can read which name was admitted and whether the
 * caller's member survived the arm's declaration — **AND A NAME PUT IN ITS REFUSAL MAP BY `refuse` IS ANSWERED WITH
 * THE DOOR'S OWN REFUSAL VALUE INSTEAD**: `invoke`'s answer is the DOOR's, and a door answers a handler's value OR its
 * own refusal VALUE (`signatures.md` §2; `design.md` §7), which is why a stub may answer either.
 */
function portOf(
  seed: Record<string, readonly string[]> = {},
  census: () => ModuleStore | null = () => null,
): RecordedPort {
  const fullName = (module: string, tool: string): string =>
    tool.startsWith('module:') ? tool : `module:${module}.${tool}`
  const table = new Map<string, string[]>()
  for (const [module, tools] of Object.entries(seed)) table.set(module, tools.map((tool) => fullName(module, tool)))
  const calls: PortCall[] = []
  const deliveries: PortDelivery[] = []
  const answers: unknown[] = []
  /** **THE REFUSALS THIS DOOR GIVES, MUTABLE SO A ROW CAN ARM ONE AFTER THE HAPPY PATH** — a name that STANDS in the
   *  activation table and is refused here is the `handler-threw` case (the body threw), the other being
   *  `tool-unknown` for a name that does not stand (`design.md` §7). */
  const refusals = new Map<string, string>()
  /** A best-effort read of the delivery's source as a manifest: a source that is not a JSON object names no module and
   *  declares no tool, and the stub says so rather than throwing. */
  const manifestIn = (source: string): Json | null => {
    const trimmed = source.trim()
    if (!trimmed.startsWith('{')) return null
    try {
      return asObject(JSON.parse(trimmed) as unknown)
    } catch {
      return null
    }
  }
  const declaredTools = (manifest: Json | null): string[] => {
    const tools = asObject(manifest?.['capabilities'])?.['tools']
    return Array.isArray(tools) ? tools.filter((tool): tool is string => typeof tool === 'string') : []
  }
  return {
    install: (delivery) => {
      const manifest = manifestIn(delivery.source)
      const name = manifest === null ? null : str(manifest['name'])
      const composed = name === null ? [] : declaredTools(manifest).map((tool) => fullName(name, tool))
      const status = name !== null && table.has(name) ? 'updated' : 'installed'
      if (name !== null) table.set(name, composed)
      const answer = [{ status, name: name ?? '(an unnamed source)', activated: composed }]
      deliveries.push({
        kind: delivery.kind,
        source: delivery.source,
        name,
        tools: composed,
        censusStood: name === null ? false : census()?.get(name) !== undefined,
      })
      answers.push(answer)
      return answer
    },
    activations: () => [...table.values()].map((tools) => ({ tools: [...tools] })),
    invoke: (toolName, args) => {
      calls.push({ toolName, args })
      const reason = refusals.get(toolName)
      return reason === undefined ? { called: toolName, args } : doorRefusal(toolName, reason)
    },
    refuse: (toolName, reason) => {
      refusals.set(toolName, reason)
    },
    calls,
    deliveries,
    answers,
  }
}

/** **THE DERIVATION, SPELLED ONCE** (`design.md` §3; `signatures.md` §3): the published set as the RULE derives it —
 *  the gate's static half, the port's activation order, the group predicate — so a row compares a derivation to a
 *  derivation and never to a list this file typed out. `null` is the NO-PORT server, whose dynamic half the rule itself
 *  answers as `[]` (`design.md` §3's last two bullets, §10 `ASM-1`), so even the portless arm below is the SAME
 *  spelling and not a second composition. `allowedToolNames()` composes the same three terms over the gate and the port
 *  the server holds, which is why a SECOND composition site reds against this reading. */
const derivationOf = (server: ProvidentMcpServer, port: ModulePort | null): string[] =>
  composePublishedSet(
    registeredToolNames(server.gate, ProvidentMcpServer.ALL_TOOLS),
    port === null ? [] : port.activations(),
    (name) => server.gate.toolAllowed(name),
  )

/** **THE OPTIONS' OWN `dataSurface` SEAT, NAMED THROUGH THIS MODULE AND NEVER THROUGH A SIBLING'S CLASS**: a battery
 *  reads the signature THIS module declares, so the seat is read off the constructor's options rather than imported
 *  from `central-data`, whose class is not this battery's subject (`design.md` §2's option rows). */
type DataSurfaceSeat = ConstructorParameters<typeof ProvidentMcpServer>[0]['dataSurface']

/** **A CANNED `dataSurface`, SUPPLIED TO EVERY SERVER THIS FILE BUILDS, AND NOT ONE OF ITS FIVE METHODS IS EVER
 *  CALLED.** Under a group set that admits `data`, the composition PUBLISHES the five `provident.data.*` names while
 *  their registration arms exist only where a surface was supplied (`src/main/mcp-server.ts`'s data arm and its own
 *  `D-11` note) — so "`tools/list` carries exactly the composition" holds only on a server where every admitted STATIC
 *  name has a registration arm. Supplying it here is what makes the listing-and-derivation equalities measure the
 *  COMPOSITION rather than that one conditional arm; taking it away would red them for `D-11`'s reason and not for
 *  `S-5`'s. The five names are registered and never invoked, so each member answers `{}` and the one cast is made to
 *  the options' own seat. */
const cannedDataSurface = {
  read: () => ({}),
  write: () => ({}),
  delete: () => ({}),
  list: () => ({}),
  journal: () => ({}),
} as unknown as DataSurfaceSeat

interface Live {
  server: ProvidentMcpServer
  client: Client
  close: () => Promise<void>
}
interface LiveOptions {
  /** The row's CENSUS. Never defaulted: a row that needs one passes the store it built over its own scratch profile. */
  readonly moduleStore?: ModuleStore
  /** **the row's PORT, and the dynamic half's only source** — never defaulted to a real executor (`ASM-1`). */
  readonly modulePort?: ModulePort
}
/** One live server and one connected client over the SDK's in-memory linked pair: no socket, no boot, no Electron leg,
 *  **and NO profile of its own** — a server here reads no path on disk, so `live` opens none. A row that needs a census
 *  builds one over its OWN scratch profile through `censusIn()` above, and `afterAll` is what removes that one. */
async function live(groups: ToolGroup[], options: LiveOptions = {}): Promise<Live> {
  const server = new ProvidentMcpServer({
    backend,
    transport: 'stdio',
    gate: new SecurityGate({ token: null, enabled: groups }),
    moduleStore: options.moduleStore,
    modulePort: options.modulePort,
    dataSurface: cannedDataSurface,
  })
  const mcp = server.ensureServerRegistered()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  await mcp.connect(serverTransport)
  const client = new Client({ name: 'mcp-surface-battery', version: '0.0.0' })
  await client.connect(clientTransport)
  return { server, client, close: async () => { await client.close() } }
}

describe('mcp-surface — the set the transport publishes is the registry\'s composition, and a composed name reaches the door (docs/L2/mcp-surface/interface.md §10-§12)', () => {
  it('I-1 — S-5: a module installed at run time is published on the LIVE server and its own tool answers through the port\'s door (§10, §12)', async () => {
    const registry = censusIn()
    const port = portOf({}, () => registry)
    const { server, client, close } = await live(FULL, { moduleStore: registry, modulePort: port })
    try {
      // (1) THE PRECONDITION: nothing of this module stands before the install, so the name that appears below is the
      // INSTALL's and no construction-time seed's.
      const before = await listed(client)
      expect(
        dynamicNames(before, 'live-module'),
        `the precondition — no name of this module stands before the install, so the appearance below is the delivery's: ${JSON.stringify(before)}`,
      ).toEqual([])

      // (2) **THE COMPOSITION AT CONSTRUCTION, DERIVATION AGAINST DERIVATION** (§10; `design.md` §3): read BEFORE the
      // install, so this equality cannot be satisfied by the name the delivery adds. A composition that spelled its own
      // static half, or that read a second source behind the port, reds here.
      expect(
        sorted(await listed(client)),
        '§10 — `tools/list` at CONSTRUCTION is `composePublishedSet` over the gate, `ALL_TOOLS` and the injected port\'s ' +
          '`activations()`. A red means the wire and the rule describe two sets — a second composition site, a listing ' +
          'recomputed from somewhere else, or a static half this surface spelled for itself',
      ).toEqual(sorted(derivationOf(server, port)))
      expect(
        sorted(server.allowedToolNames()),
        '§10 — and the surface\'s own published-set reading is that SAME derivation: `allowedToolNames` keeps its landed ' +
          'name (`§10` cites the site) and widens to the composition, so a red means the two readings were allowed to drift',
      ).toEqual(sorted(derivationOf(server, port)))
      const serverBefore = server.ensureServerRegistered()

      // (3) THE INSTALL, ON THE SURFACE'S OWN TOOL, and the answer is the PORT'S VERDICT — never this side's.
      const source = manifestOf('live-module', '1.0.0', ['probe'])
      const installed = await call(client, 'module.install', { name: 'live-module', version: '1.0.0', source })
      expect(installed.ok, `§10 — \`module.install\` answered as a throw rather than a value: ${installed.text}`).toBe(true)
      expect(
        verdictOf(installed),
        `§10 — the install's own verdict, read off the PORT's answer and minted by no line of this surface: ${installed.text}`,
      ).toBe('installed')

      // (4) **THE DELIVERY REACHED THE PORT**, with the caller's source inside it: `toEqual` is EQUALITY and not identity
      // here — the claim is that the same TEXT went to the port, never that the same object survived the wire (it
      // cannot: the source crossed as JSON). `censusStood` is the ORDER, and `I-4` reads it as its subject.
      expect(
        port.deliveries.length,
        '§10 — the arm delivers ONCE: a second delivery would mean the persisted row and the activation were written by ' +
          'two arms instead of by one',
      ).toBe(1)
      const delivery = port.deliveries[0] as PortDelivery
      expect(delivery.kind, '§10 — the delivery is the installed-SOURCE kind and no other').toBe('source')
      expect(
        delivery.source,
        '§10 — the SAME source the caller sent went to the port\'s `install` — compared by VALUE (toEqual), which is the ' +
          'claim: the text is equal, not the object',
      ).toEqual(source)
      expect(
        delivery.tools,
        '§10 — and the names it activated are the COMPOSED ones, `module:<n>.<t>`, which is the namespace the composition ' +
          'publishes and the door answers',
      ).toEqual(['module:live-module.probe'])
      expect(
        delivery.censusStood,
        '§10, §5 — the persisted census row STOOD when the delivery arrived: the arm writes the census first and ' +
          'activates second, and a red here means the order was reversed (a row activated for a module no census knows)',
      ).toBe(true)

      // (5) **THE ANSWER IS THE PORT'S OWN ANSWER, VERBATIM** (§10; D-105): the surface carries the executor's verdicts
      // and MINTS NONE — not an envelope, not a status of its own, not a `refused` wrapper.
      const own = port.answers[port.answers.length - 1] as unknown
      expect(
        installed.value,
        '§10 — the tool answer IS the port\'s answer verbatim: a landing that re-shaped it (an envelope, a rewritten ' +
          '`status`, a member added or dropped) reds here, because the surface publishes verdicts and mints none',
      ).toEqual(JSON.parse(JSON.stringify(own)) as unknown)
      expect(
        installed.isError,
        '§10 — and it rides the VALUE arm: `isError` is ABSENT, so a caller reads a verdict exactly as it reads an answer ' +
          '(a door refusal is a value too, `design.md` §7)',
      ).toBe(false)

      // (6) **THE COMPOSITION AND THE WIRE, AT THE NEW INSTANT** (§12): the set moved WITHOUT a rebuild, and both
      // readings moved together. The whole-listing equality is a SET's, deliberately — `composePublishedSet` is the ONE
      // site that orders anything, so a sequence compare here would red a faithful landing on ordering alone.
      const after = await listed(client)
      expect(
        dynamicNames(after, 'live-module'),
        `§12 — an ACTIVATION re-registers on the LIVE server, so the composed name stands in \`tools/list\` with no ` +
          `rebuild and no second client: ${JSON.stringify(after)}`,
      ).toEqual(['module:live-module.probe'])
      expect(
        server.allowedToolNames(),
        '§10 — and the surface\'s published set at the new instant is `composePublishedSet` over the SAME three terms, ' +
          're-read now: a cached composition (read once at construction) reds here',
      ).toEqual(derivationOf(server, port))
      expect(
        sorted(after),
        '§10 — `tools/list` equals the derivation as a SET: every published name has a registration arm behind it and no ' +
          'arm answers a name the composition withholds. Set compared, because the composition is the one site that ' +
          'ORDERS anything and the SDK\'s listing makes no ordering claim',
      ).toEqual(sorted(derivationOf(server, port)))

      // (7) **THE PUBLISHED NAME'S CALL REACHES THE DOOR WITH THE CALLER'S OWN MEMBER** (§10; `design.md` §5).
      const answered = await call(client, 'module:live-module.probe', { probe: 1 })
      expect(
        answered.ok && !answered.isError,
        `§10 — the composed name ANSWERS, with the door's own value as the tool's body (isError absent): ${answered.text}`,
      ).toBe(true)
      expect(
        answered.value,
        `§10 — the parsed body is the DOOR'S value verbatim \`{ called, args }\`, and the name in it is the published one: ${answered.text}`,
      ).toEqual({ called: 'module:live-module.probe', args: { probe: 1 } })
      expect(
        port.calls,
        '§10, §5 `G-12` — ONE call reached the door, carrying the PUBLISHED name and the CALLER\'S OWN MEMBER ' +
          'un-stripped. This is the schema cell read on the wire: the arm\'s declaration is what the SDK parses every ' +
          'call against and hands the handler as `parseResult.data`, so an arm left at `inputSchema: {}` would answer ' +
          '`args: {}` here with the caller\'s `probe` gone',
      ).toEqual([{ toolName: 'module:live-module.probe', args: { probe: 1 } }])

      // (8) **NO SECOND SERVER** (§12): the set moved on the instance the client is already speaking to, which is the
      // whole of "the composition re-registers on the LIVE server".
      expect(
        server.ensureServerRegistered(),
        '§12 — the SAME server instance answered before and after the install: a rebuild would be a second server built ' +
          'behind the one the client holds, and the row\'s subject is that the set moves WITHOUT one',
      ).toBe(serverBefore)

      // (9) **AND THE DOOR'S OWN REFUSAL IS A VALUE: IT IS THE ANSWER BODY, `isError` ABSENT** (§10's split; `design.md`
      // §7's second row; D-105). The GATE's refusal is this SIDE'S and is a THROW arriving on the SDK's tool-error arm —
      // that is `I-5`'s throw — while the DOOR's refusal is a `{status:'refused', …}` VALUE the executor answers, rendered
      // by the same `text(value)` a landed answer takes, so a caller reads the door's `reason` exactly as it reads any
      // other answer. The stub is told to refuse a name that STANDS, so the refusal below is the DOOR's answer to a call
      // that DID reach it and that the pair had ALREADY admitted. **THIS READING IS THIS FILE'S OWN** (header item 6's
      // arm (e)): nothing else under `tests/` reads either refusal token.
      port.refuse('module:live-module.probe', 'handler-threw')
      const refused = await call(client, 'module:live-module.probe', { probe: 2 })
      expect(
        refused.ok,
        `§10, §7 — the protocol ANSWERED the refused call; it did not throw. **AND THIS READING IS THIS FILE'S OWN** ` +
          `(header item 6's arm (e)): no other file under \`tests/\` reads the DOOR's refusal at all, while the GATE's ` +
          `refusal is the other half of the split and it THROWS (that is \`I-5\`'s throw): ${refused.text}`,
      ).toBe(true)
      expect(
        refused.isError,
        `§10, §7 — **AND \`isError\` ABSENT IS THE WHOLE CLAIM**: a DOOR refusal does not ride the error arm, so a ` +
          `landing that turned a \`status:'refused'\` body into \`isError: true\` (or wrapped it) reds here: ${refused.text}`,
      ).toBe(false)
      expect(
        refused.value,
        `§10, §7 — the answer body IS the door's refusal record VERBATIM — \`status\`, \`reason\`, \`subject\` and ` +
          `\`message\` as the door answered them, with no envelope, no added member and no rewritten one: ${refused.text}`,
      ).toEqual(doorRefusal('module:live-module.probe', 'handler-threw'))
      const refusal = asObject(refused.value) ?? {}
      expect(
        str(refusal['reason']),
        `§7 — the reason is the DOOR's own token for a body that threw, read off the wire: ${refused.text}`,
      ).toBe('handler-threw')
      expect(
        str(refusal['subject']),
        `§7 — and the subject names WHAT was refused, the published name and no other: ${refused.text}`,
      ).toBe('module:live-module.probe')
      expect(
        port.calls,
        '§10, §7 — **THE REFUSAL IS THE DOOR\'S ANSWER TO A CALL THAT DID REACH IT**: exactly TWO calls crossed, the ' +
          'first admitted and answered and the second the one just refused with its own member — so the GATE had ' +
          'admitted this name too and the pair stands, and nothing here reads whether the name is still LISTED ' +
          '(the registry never moved)',
      ).toEqual([
        { toolName: 'module:live-module.probe', args: { probe: 1 } },
        { toolName: 'module:live-module.probe', args: { probe: 2 } },
      ])
    } finally {
      await close()
    }
  })

  it('I-2 — S-5: an update WITHDRAWS the standing name and publishes the new one, on the SAME live server (§12; ASM-2)', async () => {
    const registry = censusIn()
    const port = portOf({}, () => registry)
    const { server, client, close } = await live(FULL, { moduleStore: registry, modulePort: port })
    try {
      const first = await call(client, 'module.install', { name: 'live-module', version: '1.0.0', source: manifestOf('live-module', '1.0.0', ['probe']) })
      expect(
        verdictOf(first),
        `the precondition — a registration STOOD, so the withdrawal below has something to withdraw: ${first.text}`,
      ).toBe('installed')
      const standing = await listed(client)
      expect(
        dynamicNames(standing, 'live-module'),
        `the precondition — the standing name is published before the update: ${JSON.stringify(standing)}`,
      ).toEqual(['module:live-module.probe'])
      const serverBefore = server.ensureServerRegistered()

      const updated = await call(client, 'module.update', { name: 'live-module', version: '1.1.0', source: manifestOf('live-module', '1.1.0', ['probeB']) })
      expect(updated.ok, `§12 — the update answered as a throw rather than a value: ${updated.text}`).toBe(true)
      expect(
        verdictOf(updated),
        `§12 — the update's own verdict, read off the PORT: the table already held this module, so the port answers ` +
          `\`updated\` and this surface mints nothing: ${updated.text}`,
      ).toBe('updated')
      expect(
        server.ensureServerRegistered(),
        '§12 — the SAME server instance still answers: the set moved WITHOUT a rebuild, and a red here means the landing ' +
          'rebuilt the server (or built a second one) to make the names move',
      ).toBe(serverBefore)

      const moved = await listed(client)
      expect(
        dynamicNames(moved, 'live-module'),
        `§12 — the WITHDRAWN name is GONE and the new one stands: a listing that merely ADDED would read ` +
          `\`['module:live-module.probe', 'module:live-module.probeB']\` here, and the withdrawn name would still be ` +
          `callable: ${JSON.stringify(moved)}`,
      ).toEqual(['module:live-module.probeB'])
      expect(
        sorted(moved),
        '§10 — and the whole listing still equals the derivation as a SET: the withdrawal removed a name and the ' +
          'registration added one, in the one act, so the wire and the rule did not drift apart',
      ).toEqual(sorted(derivationOf(server, port)))

      // **A WITHDRAWN NAME IS ABSENT FROM THE SURFACE, NEVER PRESENT-AND-REFUSING** (§12; `design.md` §5 `ASM-2`): the
      // handle was `remove()`d, not disabled, so the name is not listed AND not callable — the two readings that tell a
      // withdrawal apart from a group-off toggle.
      const withdrawn = await call(client, 'module:live-module.probe', {})
      expect(
        withdrawn.ok && !withdrawn.isError,
        `§12 \`ASM-2\` — a call on the withdrawn name does NOT answer a value: the name left the registry, so the ` +
          `protocol refuses it rather than the door answering for a module no longer activated: ${withdrawn.text}`,
      ).toBe(false)

      const refreshed = await call(client, 'module:live-module.probeB', {})
      expect(refreshed.ok && !refreshed.isError, `§12 — the updated entry's own name answers: ${refreshed.text}`).toBe(true)
      expect(
        refreshed.value,
        `§12 — and its body is the door's for the NEW name, never the old one's value under a new key: ${refreshed.text}`,
      ).toEqual({ called: 'module:live-module.probeB', args: {} })
      expect(
        port.calls.map((entry) => entry.toolName),
        '§12 — the withdrawn name reached NO DOOR AT ALL: a name the port no longer activates is not merely hidden from ' +
          'the listing, it is UNREACHABLE — so exactly one call crossed, and it carried the new name',
      ).toEqual(['module:live-module.probeB'])
    } finally {
      await close()
    }
  })

  it('I-3 — C-11: the number the transport publishes IS the build manifest\'s — a drift CONTROL, green at this head (§11)', async () => {
    const { client, close } = await live(FULL)
    try {
      const published = client.getServerVersion()
      expect(str(published?.version), '§11 — the initialized `serverInfo` carries a version STRING').not.toBeNull()
      expect(
        published?.version,
        `§11 — the transport reports the ONE application-version authority, and the authority answers the number the ` +
          `BUILD carries (read here off \`package.json\`'s own \`version\` member, the ONE manifest read in this file). ` +
          `It reads "${String(published?.version)}" where the manifest reads "${BUILD_VERSION}". THIS IS A DRIFT CONTROL ` +
          'AND NOT A MEASUREMENT OF THE PLUMBING: the transport\'s number now comes from the one accessor, and the unit ' +
          'battery\'s `MS-3` proves the injection seam that makes the plumbing a seam at all — so **this row\'s bite is the ' +
          'day a LITERAL or a SECOND AUTHORITY appears ON THIS PATH**, so that the number the transport publishes stops ' +
          'being the manifest\'s. That is the drift `C-11` exists to catch, and it is a control, not a measurement of the ' +
          'plumbing (D-44, D-26)',
      ).toBe(BUILD_VERSION)
    } finally {
      await close()
    }
  })

  it('I-4 — S-5: the delivery is TWO FACTS ON TWO STORES, the PORT\'s verdicts are the answer, and an unmoved row ENDS the arm (§10; design.md §5)', async () => {
    // **THIS ROW'S SUBJECT MOVED, AND THE MOVE IS STATED RATHER THAN LEFT TO BE FOUND.** It used to take the
    // version-resolver pair — a floor at the published number satisfied and the same range made strict refused — which
    // is `module-system`'s `S-4` and which this surface judges no range at all (`docs/L2/mcp-surface/interface.md` §11).
    // **THE ARM'S EXERCISE IS NOT THIS FILE'S ALONE, AND THE READING IS**: `tests/e2e/modularity/module-executor.test.ts`
    // drives `module.install` and `module.list` over this same surface, so what no other battery takes is the delivery
    // read **as TWO FACTS ON TWO STORES** — the census record and the executor's verdicts, side by side, neither renamed
    // the other — which is this row's subject. The unit battery declares `install` and states it is "called by none"
    // there, because that arm needs a `moduleStore` and that file does not open the census
    // (`tests/unit/mcp-surface/published-set.test.ts`'s header; `design.md` §5) — so the id carries the delivery now.
    const registry = censusIn()
    const port = portOf({}, () => registry)
    const { server, client, close } = await live(FULL, { moduleStore: registry, modulePort: port })
    try {
      const source = manifestOf('live-module', '1.0.0', ['probe'])
      const installed = await call(client, 'module.install', { name: 'live-module', version: '1.0.0', source })
      expect(verdictOf(installed), `the precondition — a delivery landed, so both stores below have something to hold: ${installed.text}`).toBe('installed')

      // (1) **THE PERSISTED CENSUS ROW STOOD FIRST**, read through the surface's OWN census tool: the row is answered by
      // `module.list` because the arm wrote it through `handleModuleTool` BEFORE it activated anything.
      // **THE CALL PASSES `{}` AND NOT NOTHING**, because `module.list`'s landed arm declares `inputSchema: {}` — a
      // memberless object schema the SDK parses every call against — so a call that OMITS `arguments` is refused by the
      // parse before this surface stands. That declaration is NOT `S-5`'s cell (the dynamic arm's was, and it moved with
      // the call site, `design.md` §5 / `G-12`); this row passes the empty record the way the tool's own shape asks, so
      // it measures the census and not a schema.
      const listAnswer = await call(client, 'module.list', {})
      expect(listAnswer.ok, `§10 — the census door answered as a throw: ${listAnswer.text}`).toBe(true)
      const rows = rowsOf(listAnswer)
      const row = rows.find((record) => str(record['name']) === 'live-module') ?? {}
      expect(
        str(row['version']),
        `§10 — the census holds a row naming this module at this version, read through \`module.list\`: the arm wrote the ` +
          `row. A red here means the activation happened with no persisted record behind it: ${listAnswer.text}`,
      ).toBe('1.0.0')
      expect(
        port.deliveries[0]?.censusStood,
        '§10, §5 — and the PORT says the same thing from its own side: the census row already stood when the delivery ' +
          'arrived. Two independent readings of ONE order — the row is written first, the activation second',
      ).toBe(true)

      // (2) **THE SAME SOURCE WENT TO THE PORT'S `install`** — one delivery, the caller's text, the composed names, and
      // the census fact beside them.
      expect(
        port.deliveries,
        '§10 — ONE delivery, and it carries the caller\'s own source (by value), the module it names, the composed names ' +
          'it activated and the order fact: a second entry, a dropped member or a re-keyed source reds here',
      ).toEqual([{ kind: 'source', source, name: 'live-module', tools: ['module:live-module.probe'], censusStood: true }])
      expect(
        port.answers.length,
        '§10 — and `install` was called ONCE: the answers the port gave are the count of its own deliveries, so an arm ' +
          'that called it twice (once for the census, once for the activation) reds here',
      ).toBe(1)

      // (3) **THE TWO ANSWERS ARE TWO FACTS, AND NEITHER STORE IS RENAMED THE OTHER** (`design.md` §5): the wire answer is
      // the PORT'S verdict — a LIST whose first element carries `status`, `name` and `activated` — while the census's
      // answer is its RECORD — an object carrying `name`, `version` and `capabilities`, and no verdict member at all.
      expect(
        Array.isArray(installed.value),
        `§10 — the tool answer is the PORT'S answer, which is a LIST of verdicts: ${installed.text}`,
      ).toBe(true)
      const verdict = asObject(Array.isArray(installed.value) ? (installed.value as unknown[])[0] : null) ?? {}
      expect(verdict['status'], '§10 — its first element is the verdict, and the verdict is the port\'s own `status`').toBe('installed')
      expect(
        verdict['name'],
        '§10 — the verdict names the module it activated, and the NAME there is the port\'s answer and not this surface\'s echo',
      ).toBe('live-module')
      expect(
        verdict['activated'],
        '§10 — and it names what it activated, as composed `module:<n>.<t>` names, which is what the re-publish then reads',
      ).toEqual(['module:live-module.probe'])
      expect(
        asObject(row['capabilities'])?.['tools'],
        '§10, §5 — while the CENSUS row answers the manifest\'s declared tools in its own member: the census records the ' +
          'INSTALLED row (name, version, capabilities), the executor records its ACTIVATIONS, and a landing that wrote ' +
          'one answer into both stores reds on this member or on the one above it',
      ).toEqual(['probe'])
      expect(
        'status' in row,
        '§10, §5 — the census record carries NO `status` member: `status` is the PORT\'s word and the census answers rows. ' +
          'A record wearing a verdict is the two stores renamed into one, which is exactly what `design.md` §5 refuses',
      ).toBe(false)
      expect(
        'activated' in row,
        '§10, §5 — and no `activated` member either: the census does not report activations, because it does not perform ' +
          'them — the executor\'s registry is its own activation table and never this one',
      ).toBe(false)
      expect(
        'version' in verdict,
        '§10, §5 — and the PORT\'s verdict carries no `version`: the version is the census row\'s fact and the verdicts are ' +
          'the executor\'s, so each store answers the question it owns and no member is copied across',
      ).toBe(false)

      // (4) **AN UNMOVED ROW ENDS THE ARM** (`design.md` §5): a second identical install moves nothing, so the census
      // answers its own `no-op` — an OBJECT — and NOTHING is activated and NOTHING is re-published.
      const again = await call(client, 'module.install', { name: 'live-module', version: '1.0.0', source })
      expect(again.ok, `§5 — the second install answered as a throw rather than a value: ${again.text}`).toBe(true)
      expect(
        statusOf(again),
        `§5 — an unmoved row answers the CENSUS's NO-OP, and the answer is an OBJECT: the arm ENDS there and the port is ` +
          `never asked, so this is the census's word and not the executor's: ${again.text}`,
      ).toBe('no-op')
      expect(str(asObject(again.value)?.['version']), '§5 — the no-op carries the row\'s version, so a caller can see what stood').toBe('1.0.0')
      expect(
        'activated' in (asObject(again.value) ?? {}),
        '§5 — and NO `activated` member: nothing was activated, and a member reporting an empty activation would make ' +
          '"nothing moved" and "a module with no tools" one reading',
      ).toBe(false)
      expect(
        [port.deliveries.length, port.answers.length],
        '§5 — NOTHING was delivered and the port was never called: the arm ended at the census, so a landing that ' +
          'delivered anyway reds on BOTH counts — and the second count is what says `install` itself was not reached',
      ).toEqual([1, 1])
      expect(
        server.allowedToolNames(),
        '§5 — and the published set is unmoved: an ended arm re-publishes nothing, so the composition re-read now equals ' +
          'the composition over the same port',
      ).toEqual(derivationOf(server, port))

      // (5) **AND A REFUSED ROW ENDS IT TOO** (`D-105`): the same name at a different version with no `force` is the
      // census's `rejected` — a VALUE the arm hands back, activating nothing.
      const refused = await call(client, 'module.install', { name: 'live-module', version: '2.0.0', source: manifestOf('live-module', '2.0.0', ['probe']) })
      expect(refused.ok, `§5 — the refused install answered as a throw: a refusal is a VALUE and never the error arm: ${refused.text}`).toBe(true)
      expect(
        statusOf(refused),
        `§5, D-105 — the census REFUSES the version conflict as a value: same name, a different version, no \`force\`: ${refused.text}`,
      ).toBe('rejected')
      expect(
        String(asObject(refused.value)?.['reason'] ?? ''),
        `§5 — and the refusal NAMES the conflict it judged — the installed version beside the requested one — so a caller ` +
          `can act on it instead of guessing: ${refused.text}`,
      ).toContain('version conflict')
      expect(
        port.deliveries.length,
        '§5 — a refused row activates nothing: the port received no second delivery, because there is no standing row to ' +
          'activate a source for',
      ).toBe(1)
    } finally {
      await close()
    }
  })

  it('I-5 — S-5: the two-gate\'s three instants — construction, re-gate, invocation — a CONTROL, green at this head (§10; design.md §4\'s predicate scope and §9 G-8; docs/L2/mcp-surface/interface.md §7\'s marks statement for the accessor\'s invocation instant, and the unit battery\'s MS-4, which names this row the pair-breadth carrier)', async () => {
    // **A PORT SEEDED AT CONSTRUCTION**, so the composition has a dynamic name to publish at the FIRST instant. No
    // `moduleStore` is needed: this row measures the GATE at its three instants and never the delivery.
    const port = portOf({ twin: ['probe'] })
    const { server, client, close } = await live(FULL, { modulePort: port })
    const NAME = 'module:twin.probe'
    try {
      // — INSTANT 1: CONSTRUCTION.
      expect(
        dynamicNames(await listed(client), 'twin'),
        '§10 — at CONSTRUCTION the composed name is composed from the port\'s `activations()` and registered, so it stands ' +
          'in `tools/list` under `module` AND `code`',
      ).toEqual([NAME])
      expect(server.registeredEnabled(NAME), '§10 — and its captured handle is ENABLED: the gate admitted the name at the registration instant').toBe(true)
      expect(
        () => server.invokeTool(NAME, {}),
        '§10 — the invocation two-gate ADMITS the call under both groups, so the accessor does not throw',
      ).not.toThrow()
      expect(
        port.calls.length,
        '§10 — **AND ONLY THEN TO THE DOOR**: the admitted call did reach the executor\'s `invoke`, so the gate is a ' +
          'predicate IN FRONT of a route and not a substitute for one',
      ).toBe(1)

      // — INSTANT 2: THE RE-GATE. A `code` withdrawal toggles every `module.`- and `module:`-prefixed handle by the PAIR.
      server.applyGatePatch({ disable: ['code'] })
      expect(
        server.registeredEnabled(NAME),
        '§10, `G-8` — the re-gate\'s predicate is `module.`- AND `module:`-prefixed and reads the PAIR, so a dynamic name ' +
          'is toggled by BOTH groups: routing this instant through the registration predicate (which asks the group ' +
          'alone for a dynamic name) would leave the handle enabled here',
      ).toBe(false)
      expect(
        dynamicNames(await listed(client), 'twin'),
        '§10 — and a disabled handle is ABSENT from the listing, never present-and-refusing: the wire shows a refusal by ' +
          'ABSENCE at this instant',
      ).toEqual([])
      expect(
        () => server.invokeTool(NAME, {}),
        '§10 — at the INVOCATION instant the pair is re-checked at this side and the refusal THROWS, naming both groups: ' +
          'it is the protocol\'s error arm and never a value',
      ).toThrow(/module AND code/)
      expect(
        port.calls.length,
        '§10 — **AND THE REFUSAL WAS MADE AT THIS SIDE BEFORE ENTRY**: the count is STILL 1, so no handler ran and no ' +
          'door ever saw the refused call. **THE FIRST OF TWO READINGS THIS ROW ADDS to the old marks statement is THIS ' +
          'ONE — the door\'s CALL COUNT IS UNMOVED WHEN THE GATE REFUSES, i.e. the refusal was made at this side BEFORE ' +
          'entry** — ' +
          'and NOT the toggle-and-teardown distinction itself, which is the unit battery\'s `MS-2` at the map — the ' +
          'DISABLED and RESTORED readings above and below are that mechanism\'s INSTRUMENT, and what this row takes ' +
          'through it is TWO readings of its own: THIS ONE — the refusal made at this side BEFORE entry, i.e. the ' +
          'CONSEQUENCE of the pair-check\'s POSITION, which is what makes the gate\'s refusal the surface\'s own ' +
          '(`design.md` §4, §7) — and the pair\'s MEASURED BREADTH on the census door, read on the expectation below and ' +
          'named as this row\'s by the unit battery\'s `MS-4`. **THE SAME FACT AT THE FREE FUNCTION\'S GRAIN IS ' +
          'THE UNIT BATTERY\'S `MS-4`** (`invokeModuleTool` called directly), so what is this row\'s is the GRAIN — the ' +
          'CLASS\'s own accessor, the instant §7\'s marks statement assigns to `I-5` — and not the fact',
      ).toBe(1)
      expect(
        server.registeredEnabled('module.list'),
        '§10 — MEASURED BREADTH, stated rather than smoothed: the same `code` withdrawal closes the CENSUS door, because ' +
          'the re-gate\'s predicate is the PAIR for every `module.`-prefixed handle and `module.list` is one of them',
      ).toBe(false)

      // — INSTANT 3: RESTORED. The same handle answers again, which is what makes the toggle a RE-GATE and not a teardown.
      server.applyGatePatch({ groups: ['code'] })
      expect(server.registeredEnabled(NAME), '§10 — a WIDEN restores the handle on the LIVE server: it was toggled, never deregistered').toBe(true)
      expect(
        dynamicNames(await listed(client), 'twin'),
        '§10 — and the name is published again with no re-registration act, because the handle never left the map',
      ).toEqual([NAME])
      expect(server.registeredEnabled('module.list'), '§10 — and the census door opens with it, on the same predicate').toBe(true)
    } finally {
      await close()
    }
  })

  it('I-6 — the composition is TOOLS, and a name its group does not admit is ABSENT — a CONTROL, green at this head (§10; design.md §3, §10 ASM-1)', async () => {
    // A CENSUS HOLDING NOTHING for the first two servers, and ONE seeded PORT behind all three.
    const registry = censusIn()
    const port = portOf({ twin: ['probe'] })
    const admitted = await live(MODULE_ONLY, { moduleStore: registry, modulePort: port })
    try {
      const names = await listed(admitted.client)
      // (1) THE POSITIVE CONTROL: an enabled module's name IS composed, so every absence below is a REFUSAL and not a
      // blanket one.
      expect(
        dynamicNames(names, 'twin'),
        '§10, §3 — with `module` admitted the enabled module\'s name IS composed: without this reading every absence ' +
          'below could be satisfied by a composition that publishes nothing dynamic at all',
      ).toEqual(['module:twin.probe'])
      expect(
        sorted(names),
        '§10, §3 — and the listing equals the derivation as a SET under this group set: what is withheld below is the ' +
          'GROUP\'s and not the port\'s',
      ).toEqual(sorted(derivationOf(admitted.server, port)))
      // THE PAIR AT THE REGISTRATION INSTANT, read off `tools/list`: the census door stands by its group alone while the
      // install door needs the pair, and the pair is one group short here — so the two names part company ON THE WIRE.
      expect(names, '§10, §4 — the census door STANDS under `module` alone').toContain('module.list')
      expect(
        names,
        '§10, §4 — and the install door does NOT: `module.install` carries an executable entry and registers only while ' +
          '`module` AND `code` stand, so under this group set it is refused BY ABSENCE, never present-and-refusing',
      ).not.toContain('module.install')
      // (4) **AND NO RESOURCE AND NO TEMPLATE MOVES**: the composition is TOOLS. `ALL_RESOURCES` is read whole here and
      // never counted — the claim is an ABSENCE in the two listings, not a figure.
      const uris = (await admitted.client.listResources()).resources.map((resource) => resource.uri)
      const templates = (await admitted.client.listResourceTemplates()).resourceTemplates.map((template) => template.uriTemplate)
      expect(
        [...uris, ...templates].filter((uri) => uri.includes('module')),
        `§10, §3 — the composition adds no resource and no template: a module that needed one would be a SECOND seam on ` +
          `the same store, and this surface publishes names: ${JSON.stringify([...uris, ...templates])}`,
      ).toEqual([])
    } finally {
      await admitted.close()
    }

    // (2) **THE SAME PORT AND THE SAME CENSUS UNDER A GRANT THAT DOES NOT ADMIT `module`**: the enabled module's name is
    // ABSENT — `groupForTool` answers `module` by prefix, the group is off, so the composition drops the name — while
    // the static half STANDS, which is what makes this a GROUP reading and not an empty-set reading.
    const withheld = await live(WITHOUT_MODULE, { moduleStore: registry, modulePort: port })
    try {
      const names = await listed(withheld.client)
      expect(
        dynamicNames(names, 'twin'),
        '§10, §3 — with `module` withheld the enabled module\'s name is ABSENT, and it is the SAME port and the SAME ' +
          'census that make this a group reading rather than a registry one',
      ).toEqual([])
      expect(
        names.length,
        '§10 — while the static set STANDS: an empty listing would satisfy the absence above for the wrong reason',
      ).toBeGreaterThan(0)
      expect(
        sorted(names),
        '§10, §3 — and the listing equals the derivation under THIS gate: what moved is the group predicate and not the port',
      ).toEqual(sorted(derivationOf(withheld.server, port)))
    } finally {
      await withheld.close()
    }

    // (3) **NO PORT AT ALL** — and this is the row's sharpest bite. The census now holds an installed, LOADED module, and
    // `modulePort` is omitted: the dynamic half is EMPTY, because NO DEFAULT READS A SECOND SOURCE (`design.md` §3's last
    // two bullets, §10 `ASM-1`). An implementation that filled the dynamic half from the census would publish
    // `module:twin.probe` here and red on the first expectation.
    registry.put({ name: 'twin', version: '1.0.0', source: manifestOf('twin', '1.0.0', ['probe']), capabilities: { tools: ['probe'] } })
    expect(
      registry.status().loaded,
      'the precondition — the census really holds the module as LOADED (its `source` re-hashes clean and it is not ' +
        'disabled), so the emptiness below is the PORT\'s absence and not an empty registry',
    ).toContain('twin')
    const portless = await live(FULL, { moduleStore: registry })
    try {
      const names = await listed(portless.client)
      expect(
        dynamicNames(names, 'twin'),
        '§10, `ASM-1` — with NO port injected the dynamic half is EMPTY, even though the census holds a loaded module ' +
          'with declared tools: the port is the ONLY name source, and a default that read the census instead would ' +
          'publish a name here whose call no door answers',
      ).toEqual([])
      expect(
        portless.server.allowedToolNames(),
        '§3, §10 `ASM-1` — the published set is the composition over an EMPTY activation list, read through the SAME ' +
          '`derivationOf` every other equality here uses, with the port answered as `null`: the port\'s absence is the ' +
          'only thing that moved, and a red here is a second source standing behind the composition — a default that ' +
          'filled the dynamic half from the CENSUS would publish `module:twin.probe` at this instant, and this equality ' +
          'is what reds for it',
      ).toEqual(derivationOf(portless.server, null))
    } finally {
      await portless.close()
    }
  })
})
