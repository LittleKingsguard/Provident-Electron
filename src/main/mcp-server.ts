// src/main/mcp-server.ts — the MCP server (main process). Exposes the
// provident-ssr renderer's synthetic-event access + rendered-HTML visibility
// as MCP tools for agentic use and debugging exposure.
//
// Two transports (configurable via `--mcp-transport` / `PROVIDENT_MCP_TRANSPORT`):
//   - stdio: the process is spawned by an MCP client (agent/IDE).
//   - http:   a Streamable HTTP server on 127.0.0.1:<port>/mcp (the app runs,
//             the client connects).
import {McpServer, ResourceTemplate} from '@modelcontextprotocol/sdk/server/mcp.js'
import type {RegisteredTool, RegisteredResource, RegisteredResourceTemplate} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {StreamableHTTPServerTransport} from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import {z} from 'zod'
import {createServer, type IncomingMessage, type ServerResponse} from 'node:http'
import type {RpcRequest, RpcReply, DispatchRequest} from '../shared/types.js'
import {SecurityGate, exclusionAllowsWork, registrationAllowed, type ToolGroup, moduleToolAllowed} from './security.js'
// **THE MODULE REGISTRY'S INTERFACE LIVES HERE NOW (D-81, 2026-11-02).** It stood in `module-store.ts`
// — the raw-`fs` registry module, deleted with the Q-5 arm that was its only reader (`D-78`'s second
// clause, the user's ruling). What survives of that module is the three INTERFACES below and nothing
// else: no `node:fs`, no construction, no file, and no file NAME — **the literal is deliberately not
// spelled in this file**, which the MCP closure reaches and whose byte census allows exactly one
// foreign name; the composition root's own comment names the dropped file once, and `D-81` records the
// disposition. They are declared here because this file is the module tools' surface —
// `handleModuleTool` and `McpServerOptions.moduleStore` are the two consumers — and the composition
// root imports them back from here rather than the reverse. **AND THE THIRD CONSUMER THE RETIRED
// ROUTE'S FUNCTION WAS IS GONE WITH IT** (`docs/L3/mcp-surface/design.md` §2's RETIRE row): the
// `router?: CapabilityRouter` option and `syncModuleRouter` retired WHOLE in app-shell's coupled pass,
// so this file imports NO realm half at all — the dynamic half's names and its call reach the PORT
// declared below and nothing else (`design.md` §3's last two bullets, §5; `G-6`).
// **THE ONE APPLICATION-VERSION AUTHORITY, IMPORTED AND NEVER RE-SPELLED** (`docs/L2/mcp-surface/interface.md`
// §11; `docs/L2/module-system/interface.md` §8; L1 §4 `C-11`): `appVersion()` is hosted in the contract's home
// (`src/shared/module-contract.ts`) and this surface is its SECOND READER, never a second authority. The
// `'0.1.0'` literal that stood in `createServer` retires HERE, into the default of the `versionReader` seam.
import {appVersion} from '../shared/module-contract.js'
// central-data — the module's OWN surface, supplied at the composition site. The server never
// constructs it: the profile's directory is not a server's to derive (`interface.md` §5; D-13).
import type {DataSurface} from './data/index.js'

const TOOL_PREFIX = 'provident.'

/** **THE EXECUTOR'S `module:<n>.<t>` NAMESPACE, SPELLED ONCE AND HERE AS THE COMPOSITION'S OWN TEST**
 *  (`docs/L3/mcp-surface/design.md` §3; `docs/L2/module-system/interface.md` §1). It is NOT a second spelling of
 *  `security.ts`'s GROUP rule and the difference is the question asked: `admits` answers a group for ANY name,
 *  so a static name arriving in an activation would be published by the group test alone, while this literal
 *  asks the other question — *is this a composed name at all*. The two group literals stay `security.ts`'s
 *  (`groupForTool`) and are untouched (D-16's second-copy hazard named, not propagated). */
const MODULE_NAMESPACE = 'module:'

/** **ONE ELEMENT OF THE REGISTRY'S ANSWER** (`docs/L3/mcp-surface/signatures.md` §2; `design.md` §2). This
 *  surface reads `tools` and NO other member — `Activation`'s `name`, `version` and `listeners` are
 *  `module-system`'s, and a member that page adds later cannot break this composition. */
export interface ActivationLike {
  readonly tools: readonly string[]
}

/** **THE DYNAMIC HALF'S TWO ANSWERS, ON ONE OBJECT** (`design.md` §2, §3, §10 `ASM-1`; `docs/L2/mcp-surface/
 *  interface.md` §10):
 *   · `activations()` is the ACTIVATED TOOL NAMES in the resolver's order, already full `module:<n>.<t>`
 *     names, with NO group term — the GROUP axis is this surface's `admits`, which is what lets a WITHDRAWAL
 *     read the port unfiltered (`ASM-5`): a group-off name must never be mistaken for a withdrawn one.
 *   · `invoke` is the door: a composed name's call reaches its handler through it, its answer is a handler's
 *     own value OR the door's own refusal VALUE, and `args` travels BY IDENTITY (no schema, no coercion).
 *   · `install` is the ACTIVATION the two install tools hand their source to, and its verdicts are their
 *     answer — one fact per store, never this one's census (`design.md` §5).
 *  NO fourth member, and NO default that reads anything else: with no port injected the dynamic half is EMPTY
 *  (`design.md` §3's last two bullets), so no second source stands behind the composition and the object
 *  that answers the NAMES is the object that answers the CALL. Structural by construction, so the executor
 *  satisfies it without naming it. */
export interface ModulePort {
  install(delivery: {readonly kind: 'source'; readonly source: string}): readonly unknown[]
  activations(): readonly ActivationLike[]
  invoke(toolName: string, args: unknown): unknown
}

/** `docs/specs/secure-exclusion.md` `§2.5` item 1 — THE ONE CLOSED REFUSAL FORM. It is produced
 *  at three sites only (the MCP invocation turn, the HTTP POST at arrival, and the in-flight
 *  abandonment) and it is a CHANNEL token: `'exclusion-closed'` is NOT a member of the store's
 *  16-member refusal union (the `SecurityWriteReceipt` precedent — the union stays `16`). */
export const EXCLUSION_CLOSED = 'exclusion-closed'

/** `docs/specs/tier4-arbitrary-storage.md` `§2.4` items 1/5 — **THE TIER-4 REFUSAL'S CHANNEL
 *  TOKEN, HOMED BESIDE `EXCLUSION_CLOSED` BECAUSE THE TWO NAME MUTUAL INVERSES ON ONE AXIS**: the
 *  landed pair's cause is the MCP-call cause (*"blocked because the security store is open"*),
 *  this one's cause is the INVERSE (*a tier-4 read/write refused because the MCP endpoint is
 *  open*). It is a **CHANNEL token**: `'tier4-closed'` is **NOT** a member of the store's closed
 *  `16`-member refusal union (`D-GATE` clause (2) — a security token added to it is a collision
 *  finding) and **NOT** a constant of the channel-NAMES module (that module's census is pinned at the
 *  three channel NAMES it carries; a refusal token is not a channel name). ONE spelling:
 *  lowercase, hyphenated, no case variant, no whitespace variant, no third spelling (`§2.4`). */
export const TIER4_CLOSED = 'tier4-closed'

/** `§2.4` item 4 / `§6` `PAR-7` — **THE SERVER-AUTHORED MESSAGE**: CAUSE FIRST (the MCP endpoint
 *  is open), REMEDY SECOND (disable MCP). Built HERE and NEVER derived from caller input (a
 *  caller-supplied message would let a caller forge the cause and the remedy — the landed
 *  `EXCLUSION_CLOSED_MESSAGE` precedent directly below). Its declared domain: a non-empty `string`
 *  naming the cause from the refusal's OWN side and the remedy, carrying **no tier-4 value, no
 *  name, no group set and no store token**; its OUTSIDE values (an absent member, an empty or
 *  whitespace-only string, a cause-less or remedy-less sentence, a message naming the INVERSE
 *  cause, a message substituted for the `reason` token) each FAIL and NONE throws. */
export const TIER4_CLOSED_MESSAGE =
  'Tier-4 access is blocked because the MCP endpoint is open — disable MCP before reading or writing secured data.'

/** `§2.5` item 1 (AMENDED 2026-10-08 — THE ARCHITECT'S `GAP-3` RULING) — **THE SERVER-AUTHORED
 *  `message`**: the receipt's ADDITIVE third member. It is **built HERE and NEVER derived from
 *  caller input** (`PAR-8`: a caller-supplied message would let a caller forge the cause and the
 *  remedy, the same reason `PAR-5` refuses a caller-supplied epoch).
 *
 *  Its declared DOMAIN (`§2.5` item 1 · `PAR-4`): a non-empty `string` naming the CAUSE (the
 *  security store is open) AND the REMEDY (retry once the operator has finished with the secured
 *  changes). Its OUTSIDE values — an absent member · an empty or whitespace-only string · a
 *  cause-less or remedy-less sentence · a message naming a DIFFERENT cause · a message carrying a
 *  tier-4 value, a store token or a group set · a message substituted for the `reason` token —
 *  each FAIL and NONE throws.
 *
 *  `status` and `reason` stay CLOSED at one token each; this member closes no third state, adds no
 *  second token and widens no declared domain. It is delivered as a VALUE, serialized into the
 *  carrier's `text`, on the MCP tool/RESOURCE refusal and on the manual-UI snapshot reader. **It is
 *  deliberately NOT delivered on the HTTP `503` body nor on the in-flight arm's `Error.message`**:
 *  `§7a` `OW-9` records those two carriers' layout as UNSETTLED, and `P-EX-IM-3`'s cell (b) pins the
 *  in-flight arm's `Error.message` to the closed token VERBATIM. */
export const EXCLUSION_CLOSED_MESSAGE =
  'MCP endpoint functionality is blocked because the security store is open — retry once the operator has finished with the secured changes.'

/** `§2.2` item 5 — the tool-RESULT carrier of the refusal: a VALUE, never an MCP protocol error.
 *  ONE answer at all three depths, differing in TRANSPORT and never in token. */
function exclusionRefusal() {
  return {
    content: [{
      type: 'text' as const,
      text: JSON.stringify({ status: 'refused', reason: EXCLUSION_CLOSED, message: EXCLUSION_CLOSED_MESSAGE }),
    }],
  }
}

/** `§2.2` item 2(a) — THE INVOCATION TURN. The predicate is read off the LIVE gate at the turn
 *  (never a captured snapshot); `null` means the call may proceed, otherwise the refusal VALUE.
 *  This is the ONE shared check the tool closure and the resource callback call, so a tool added
 *  later cannot forget it.
 *
 *  **IT TAKES THE GATE'S READER, NOT A GATE.** `applyExclusion`/`applyGatePatch` REPLACE
 *  `this._gate` and `withExclusion` ALWAYS RETURNS A NEW INSTANCE, so a handler registered once
 *  (the stdio server is constructed once, at `start()`) would hold a closure over a gate that
 *  stops being the live one the moment the operator acts — the enforcement would be DEAD on a
 *  live server while every pre-set-construction drive still passed. The caller therefore passes
 *  `() => this._gate`, and the state is read AT THE TURN: *"the predicate's read is the LIVE
 *  gate's state, read at the turn: not a captured snapshot"* (`§2.2` item 2(a), `P-EX-IM-2`). */
function exclusionTurn(gate: () => SecurityGate) {
  return exclusionAllowsWork(gate().exclusionState()) ? null : exclusionRefusal()
}

/** U9 (F1) — **THE INVOCATION'S ONE GATE-THEN-DOOR FUNCTION** (`docs/L3/mcp-surface/signatures.md` §5;
 *  `design.md` §5, §7; `docs/L2/mcp-surface/interface.md` §10).
 *
 *  THIS SIDE'S ARMS FIRST, THEN THE DOOR'S: a name that is not `module:`-prefixed THROWS (this gate is the
 *  module tool's and nothing else's, so it can never become a second admission rule for the foundation half);
 *  the invocation two-gate is re-checked at EVERY call and a refusal THROWS an `Error` naming the pair, which
 *  is the SDK's tool-error ARM — made BEFORE entry, so no handler is reached (`moduleToolAllowed`, F1); and a
 *  null door THROWS the null arm's own words, RE-GRAINED to name the EXECUTOR rather than the router the route
 *  retires. Otherwise the door's answer — a handler's VALUE or the door's own refusal VALUE — is returned
 *  VERBATIM, with no wrapper beside it: the surface renders it as the tool's answer body, and `isError` is
 *  absent, so an agent reads a door refusal's `reason` exactly as it reads a value (D-105).
 *
 *  Standalone so the static `registerTools` can route SDK calls through it, and THE ONE SPELLING beside the
 *  class's own `invokeTool`, which delegates here rather than re-stating the arms (`design.md` §5). */
export function invokeModuleTool(door: ModulePort | null, gate: SecurityGate, toolName: string, args: unknown): unknown {
  if (typeof toolName !== 'string' || !toolName.startsWith('module:')) {
    throw new Error(`invokeTool: not a module tool: ${String(toolName)}`)
  }
  // F1 — the invocation two-gate. A dynamic module tool is trusted-equivalent
  // to `code` (executable entry), so it needs module AND code.
  if (!moduleToolAllowed(toolName, gate.enabled, { executable: true })) {
    throw new Error(`invokeTool: ${toolName} requires module AND code groups (invocation two-gate)`)
  }
  if (door === null) {
    throw new Error(`invokeTool: no module executor configured`)
  }
  return door.invoke(toolName, args)
}

/** **`U-FOCUS-TOOL` (`F3`) — THE TOOL'S OWN HANDLER, A THIN ADAPTER AND NOTHING ELSE**
 *  (`docs/specs/focus-tool.md` `§2.1` item 3, `§0A` notes 3/5).
 *
 *  THREE STEPS AND NO MORE: validate the declared argument shape, make ONE renderer call over
 *  the existing invoke seam, and return the renderer's answer VERBATIM. The shape IS the
 *  contract and NOT a validation boundary over the ANSWER (`§2.3` item 3; `F-5`'s fence): a
 *  malformed renderer answer passes through untouched, because the row that catches a malformed
 *  renderer answer is the CONSUMER's, not this unit's.
 *
 *  THE DECLARED ARGUMENT SPACE IS `{ target?, newTab? }`, both members OPTIONAL (`§2.1` item 4):
 *  an omitted arguments member is the SAME CALL as `{}` (`§0A` note 3(a), `S-1`), and each
 *  supplied member travels BY IDENTITY — no `typeof` test, no coercion, no trim, no default and
 *  no re-keying (`§2.3` item 3). An OWN ENUMERABLE KEY OUTSIDE that set is REFUSED AT VALIDATION
 *  by a `TypeError`-class error that NAMES the rejected key, BEFORE any renderer call is
 *  attempted (`§0A` note 3(d), `S-6`/`F-1`/`F-6`) — the tolerate-by-ignoring alternative is
 *  recorded and NOT taken. A NON-OBJECT ARGUMENTS MEMBER — a number, a boolean, a string, a
 *  `Date`, a `Map`, a function or any other value the declared shape cannot describe — is
 *  REFUSED AT VALIDATION TOO, NAMING ITS REJECTED FORM (`§0A` note 8, defect 1, which pins the
 *  reading of note 3's own clause: the member is a PLAIN OBJECT whose own keys are a subset of
 *  the declared set). It is NEVER ROUTED AS AN EMPTY CALL: an own-key enumeration over such a
 *  value finds no key, and dispatching that empty argument set would make A MALFORMED CALL LOOK
 *  LIKE A LEGAL NO-ARGUMENT CALL. An OMITTED member is still the SAME CALL as `{}` (`§0A` note
 *  3(a), `S-1`): the refusal is on a member the caller SUPPLIED that is not a plain object, and
 *  never on emptiness.
 *
 *  BOTH DECLARED THROW CLASSES AND NO OTHERS (`§2.3` item 6): this validation error, and the
 *  backend's own readiness rejection, which the invoke seam raises BEFORE the renderer is ready
 *  (`renderer not ready (timeout <n>ms)`, `§2.1` item 8(b), `F-2`) — the call is then NOT
 *  serviced, nothing is queued and no fallback is attempted. The tool holds NOTHING between
 *  calls: no state, no map, no registry, no counter, no memo of the last answer (`§2.3` item 5),
 *  so a second identical call is a SECOND renderer call and never a cache hit. */
function focusHandler(args: unknown, backend: McpBackend): Promise<unknown> {
  const passed: Record<string, unknown> = {}
  if (args !== undefined) {
    if (!plainArguments(args)) {
      throw new TypeError(`provident.focus: malformed arguments — a ${rejectedFormOf(args)} is not the declared shape { target?, newTab? }`)
    }
    for (const key of Object.keys(args)) {
      if (!keyAllowed(key)) throw new TypeError(`provident.focus: unknown argument '${key}' — the declared shape is { target?, newTab? }`)
      passed[key] = args[key]
    }
  }
  return backend.invoke('focus', passed).then((answer) => text(answer))
}

/** THE NON-OBJECT MEMBER'S OWN READING (`§0A` note 8, defect 1; note 3(a)/(f)): the declared
 *  shape can only describe a PLAIN OBJECT, so only a plain object is routed. Every other member
 *  the caller SUPPLIED — a number, a boolean, a string, a `Date`, a `Map`, an array, a function,
 *  a revoked holder — is refused by the caller of this guard. An OMITTED member never reaches it
 *  (`args !== undefined`), so omission and `{}` stay the same valid call. Nothing here throws:
 *  an unreadable prototype is the non-plain reading, and that is the caller's own refusal. */
function plainArguments(args: unknown): args is Record<string, unknown> {
  if (typeof args !== 'object' || args === null || Array.isArray(args)) return false
  try {
    const prototype: unknown = Object.getPrototypeOf(args as object)
    return prototype === Object.prototype || prototype === null
  } catch {
    return false
  }
}

/** THE REJECTED FORM, NAMED — the member's own word, read off the value rather than off the
 *  caller's prose, so a refusal says WHICH form it refused (`§0A` note 8, defect 1: a refusal that
 *  does not name what it rejected FAILS). A holder whose own members are unreadable (a revoked
 *  proxy) names the plain reading of its type instead. */
function rejectedFormOf(args: unknown): string {
  if (args === null) return 'null'
  try {
    const named = (args as { constructor?: { name?: unknown } }).constructor?.name
    if (typeof named === 'string' && named !== '') return named
  } catch {
    // unreadable: the type reading below still names a form
  }
  return typeof args
}

/** THE DECLARED MEMBERS, NAMED ONCE — the `{ target?, newTab? }` set (`§2.1` item 4). */
const DECLARED_ARGUMENTS: readonly string[] = ['target', 'newTab']

function keyAllowed(key: string): boolean {
  return DECLARED_ARGUMENTS.includes(key)
}

/* ═════════════ THE MODULE REGISTRY'S INTERFACE — ALL THAT IS LEFT OF `module-store.ts` ═════════════
 *
 * The registry module (207 lines) was DELETED on 2026-11-02 with the Q-5 arm that read it (`D-78`'s
 * second clause; `D-81`). The FILE it persisted is dropped, not migrated, and an existing one is left
 * on disk UNREAD — its name is written once, in the composition's own comment where the arm stood, and
 * is NOT spelled here (the MCP closure's literal census, ISO-6). These three interfaces are the part
 * that was never the file: the shape of a record, its status answer and the six verbs. The one
 * implementation the product has is `src/main/main.ts`'s object literal over the secure crossing's
 * `file.modules.<id>` rows, so a reader of these types is reading the ROWS' contract, not a legacy
 * file's. `tests/module-registry-fixture.ts` is the same shape built over the surface for the node
 * suite, and it is a FIXTURE, never a second store in `src/`. */
export interface ModuleRecord {
  name: string
  version: string
  source: string
  /** SHA-256 of `source` — ALWAYS derived at put(), never trusted from input. */
  hash: string
  capabilities?: { tools?: string[]; hooks?: string[]; transforms?: string[] }
  installedAt?: string
  /** U2 — the record persists the flag; enable/disable toggles it. */
  disabled?: boolean
  /** Set at boot if hash verification fails. NOT loaded/active. */
  quarantined?: boolean
}

export interface ModuleStoreStatus {
  /** The imported record's diagnosis was corrupt, or the tier is unreachable → NO modules loaded
   *  (fail-disabled). `src/main/main.ts` composes this from the settings surface's OWN answer. */
  corrupt: boolean
  /** Names quarantined on this boot (hash verification failed). */
  quarantined: string[]
  /** Names active (not disabled, not quarantined). */
  loaded: string[]
}

export interface ModuleStore {
  get(name: string): ModuleRecord | undefined
  list(): ModuleRecord[]
  status(): ModuleStoreStatus
  /** Install/update a module. Computes `hash` from `source` (never trusts input). */
  put(record: Omit<ModuleRecord, 'hash'> & { hash?: string }): ModuleRecord
  /** Remove a module. Returns true if it existed. */
  remove(name: string): boolean
  /** Toggle a module's disabled flag (disabled modules are NOT loaded). */
  setDisabled(name: string, disabled: boolean): void
}

/** U3 — handle a `module.*` tool in MAIN (the registry the composition hands this server: the
 *  secure crossing's `file.modules.<id>` rows — the legacy store and its `put`/`remove`/`setDisabled`
 *  FILE writers are deleted, `D-81`). The module tools are NOT routed to the renderer. Exported for
 *  direct unit testing. */
export function handleModuleTool(store: ModuleStore | null, name: string, args: Record<string, unknown>, write = true): unknown {
  if (!store) throw new Error(`${name}: no module store configured`)
  const nameArg = typeof args.name === 'string' ? args.name : ''
  const source = typeof args.source === 'string' ? args.source : ''
  const version = typeof args.version === 'string' ? args.version : undefined
  const force = args.force === true
  // U9-FIX (#6) — parse the module `source` manifest into declared capabilities.
  // The source is the module's manifest (a JSON/JS object declaring `name`,
  // `version`, `capabilities.tools/hooks/transforms`). A best-effort parse: if
  // the source is a plain `{...}` manifest, extract capabilities.tools; else
  // fall back to any `capabilities` arg. The store records the parsed
  // capabilities as the CENSUS row's own members, which `module.list` answers.
  // **THEY ARE NOT A NAME SOURCE ANY MORE**: the published dynamic half is the PORT's `activations()` and
  // nothing in this file composes from these rows (`docs/L3/mcp-surface/design.md` §3, §5; L2 §10).
  const parseCapabilities = (src: string, argCaps?: unknown): { tools?: string[]; hooks?: string[]; transforms?: string[] } => {
    let parsed: { capabilities?: { tools?: unknown; hooks?: unknown; transforms?: unknown } } | null = null
    const trimmed = src.trim()
    if (trimmed.startsWith('{')) {
      try {
        parsed = JSON.parse(trimmed) as { capabilities?: { tools?: unknown; hooks?: unknown; transforms?: unknown } }
      } catch {
        parsed = null
      }
    }
    const caps = parsed?.capabilities ?? argCaps
    if (caps && typeof caps === 'object' && !Array.isArray(caps)) {
      const c = caps as { tools?: unknown; hooks?: unknown; transforms?: unknown }
      const strArr = (v: unknown): string[] | undefined => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : undefined)
      return {
        ...(strArr(c.tools) ? { tools: strArr(c.tools) } : {}),
        ...(strArr(c.hooks) ? { hooks: strArr(c.hooks) } : {}),
        ...(strArr(c.transforms) ? { transforms: strArr(c.transforms) } : {}),
      }
    }
    return {}
  }
  if (name === 'module.install') {
    if (nameArg === '' || source === '') throw new Error('module.install: name and source required')
    const existing = store.get(nameArg)
    const v = version ?? '0.0.0'
    if (existing) {
      if (existing.version === v) return { status: 'no-op', name: nameArg, version: v }
      if (!force) return { status: 'rejected', name: nameArg, version: v, reason: `version conflict: ${existing.version} installed; ${v} requested (pass force:true)` }
    }
    // THE CENSUS CHECK IS READ-ONLY (`D-315`): the install/update arm first asks this function for its verdict
    // with `write=false`, activates the source, and only a NON-REFUSED verdict comes back here to persist the row.
    if (write) store.put({ name: nameArg, version: v, source, capabilities: parseCapabilities(source, args.capabilities) })
    return { status: 'installed', name: nameArg, version: v }
  }
  if (name === 'module.update') {
    if (nameArg === '' || source === '') throw new Error('module.update: name and source required')
    const v = version ?? '0.0.0'
    if (write) store.put({ name: nameArg, version: v, source, capabilities: parseCapabilities(source, args.capabilities) })
    return { status: 'updated', name: nameArg, version: v }
  }
  if (name === 'module.list') {
    return store.list().map((r) => ({ name: r.name, version: r.version, capabilities: r.capabilities ?? {}, disabled: r.disabled, quarantined: r.quarantined }))
  }
  throw new Error(`unknown module tool: ${name}`)
}

/** R1 (mcp-resources-review.md) — a gated read-group resource definition. */
interface ResourceDef {
  name: string
  uri?: string
  uriTemplate?: string
  group: ToolGroup
  mimeType: string
  method: 'renderedHtml' | 'listTargets' | 'nodeState'
  description: string
}

/** Map a `provident.`-prefixed tool name to its registration name (spec
 *  §2/§5). A name WITHOUT the prefix throws — a registered tool must be under
 *  the `provident.` prefix. Fail-closed on malformed names (F2): the empty
 *  tool name ('' after the prefix) and a double-prefix both throw. Pure (no
 *  Electron). */
export function toolForName(name: string): string {
  if (typeof name !== 'string') {
    throw new Error(`unregistered tool name (must be a '${TOOL_PREFIX}'-prefixed string)`)
  }
  if (!name.startsWith(TOOL_PREFIX)) {
    throw new Error(`unregistered tool name '${name}' (must be '${TOOL_PREFIX}'-prefixed)`)
  }
  const rest = name.slice(TOOL_PREFIX.length)
  // F2 — fail-closed on a malformed name: empty rest, or a double prefix.
  if (rest.length === 0 || rest.trim() !== rest || rest.startsWith(TOOL_PREFIX)) {
    throw new Error(`malformed tool name '${name}' (must be '${TOOL_PREFIX}<name>')`)
  }
  return rest
}

/** The subset of `allNames` whose group is allowed by the gate (spec §2/§3).
 *  `allNames` is the full `provident.`-prefixed tool-name list. A tool whose
 *  group is allowed but which is unknown to the map never registers
 *  (`gate.toolAllowed` returns false for unknown tools — group is null). F3:
 *  the output is DEDUPED so a caller's register loop never hits the SDK's
 *  duplicate-registration throw.
 *
 *  **AND SINCE `S-5` ITS RULE HAS ONE SPELLING AND IT IS `security.ts`'s**: every member is handed to
 *  `registrationAllowed`, the REGISTRATION sites' predicate, so the construction arm and any other registration
 *  arm cannot describe two rules (`docs/L3/mcp-surface/design.md` §4; L2 §10's construction clause). The landed
 *  contract is carried UNCHANGED — `module.install`/`module.update` register only while `module` AND `code` both
 *  stand (they carry an executable entry, trusted-equivalent to `code`), while `module.list` and a dynamic
 *  `module:<n>.<t>` register by their GROUP alone, and an unknown name or a bare `module:` is denied because
 *  `groupForTool` answers `null` for it. The INVOCATION's pair and the re-gate's toggle are NOT routed through
 *  this predicate: the three instants are not one rule (`design.md` §4, §9 `G-8`). */
export function registeredToolNames(gate: SecurityGate, allNames: string[]): string[] {
  const enabled = gate.enabled
  const seen = new Set<string>()
  const out: string[] = []
  for (const name of allNames) {
    if (seen.has(name)) continue
    if (!registrationAllowed(name, enabled)) continue
    seen.add(name)
    out.push(name)
  }
  return out
}

/** **THE COMPOSITION RULE — PURE, TOTAL, AND THE ONLY PLACE THE PUBLISHED SET IS ORDERED**
 *  (`docs/L3/mcp-surface/signatures.md` §3; `design.md` §3; `docs/L2/mcp-surface/interface.md` §10; D-305).
 *
 *  It takes the static half ALREADY group-filtered (`registeredToolNames`'s answer, in `ALL_TOOLS`' own order),
 *  the registry's half as `ActivationLike[]`, and the GROUP predicate, and answers the published names:
 *
 *    · the STATIC half FIRST, in the caller's own order — a foundation seat is never re-seated;
 *    · the DYNAMIC half AFTER it, in the registry's activation order, FIRST OCCURRENCE WINNING, so no name
 *      stands twice and the SDK's already-registered throw is never reached;
 *    · a dynamic name its GROUP does not admit is ABSENT, never composed-and-then-refused: `admits` is the ONE
 *      reading of the group rule (`security.ts`'s `groupForTool` through `gate.toolAllowed`);
 *    · a name OUTSIDE the `module:` namespace is never composed even where `admits` would admit it, because the
 *      dynamic half IS the executor's namespace and a static seat can never arrive by the registry.
 *
 *  NOTHING IS SORTED — the order is two blocks and no sort: a sort would re-seat a foundation name every time a
 *  module was activated (D-41). TOTAL: an empty static half, an empty activation list or a non-array answer
 *  yields a set, never a throw. */
export function composePublishedSet(
  staticNames: readonly string[],
  activations: readonly ActivationLike[],
  admits: (name: string) => boolean,
): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  if (Array.isArray(staticNames)) {
    for (const name of staticNames) {
      if (typeof name !== 'string' || seen.has(name)) continue
      seen.add(name)
      out.push(name)
    }
  }
  if (!Array.isArray(activations)) return out
  for (const activation of activations) {
    const tools = activation.tools
    if (!Array.isArray(tools)) continue
    for (const tool of tools) {
      if (typeof tool !== 'string') continue
      if (!admits(tool)) continue
      if (!tool.startsWith(MODULE_NAMESPACE)) continue
      if (seen.has(tool)) continue
      seen.add(tool)
      out.push(tool)
    }
  }
  return out
}

/** The renderer-backed operation surface the MCP tools call into. The main
 *  process forwards each call to the renderer over IPC and awaits the reply. */
export interface McpBackend {
  invoke(method: string, payload: unknown): Promise<unknown>
}

/** Format an MCP text result from a JSON-serializable value. */
function text(value: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }] }
}

/** U5 (M-r4) — format an MCP IMAGE content block from a data-URI. The MCP SDK
 *  supports `{ type: 'image', data: <base64>, mimeType: <mime> }`. Parses the
 *  `data:<mime>;base64,<data>` URI into the data + mimeType. A non-data-URI
 *  throws a clean error (never crashes). */
export function imageResult(dataUri: string, mimeType?: string): { content: Array<{ type: 'image'; data: string; mimeType: string }> } {
  if (typeof dataUri !== 'string' || !dataUri.startsWith('data:')) {
    throw new Error('imageResult: expected a data: URI')
  }
  const comma = dataUri.indexOf(',')
  if (comma === -1) throw new Error('imageResult: malformed data: URI (no comma)')
  const header = dataUri.slice(5, comma)
  const data = dataUri.slice(comma + 1)
  const mime = mimeType ?? (header.includes(';') ? header.slice(0, header.indexOf(';')) : header)
  return { content: [{ type: 'image', data, mimeType: mime }] }
}

export type McpTransportKind = 'stdio' | 'http'

export interface McpServerOptions {
  backend: McpBackend
  transport: McpTransportKind
  port?: number
  gate?: SecurityGate
  /** U3 → Q-5 — the persisted module registry's surface, re-pointed by `U-STORE-PERSIST` to
   *  the settings-backed file tier (`file.modules.<id>`, one atomic write; writer class 2).
   *  When set, the server handles the `module.*` tools in MAIN, NOT routed to the renderer. */
  moduleStore?: ModuleStore
  // **THE `router?: CapabilityRouter` OPTION MEMBER IS RETIRED WHOLE, AND ITS ABSENCE IS THE COUPLED ACT**
  // (`docs/L3/mcp-surface/design.md` §2's RETIRE row, §3's last bullet; `signatures.md` §5): the realm router
  // stood here as "the LIVE capability surface" the retired route fed, and NOTHING in this file reads it once
  // the composition and the door reach the PORT — so it retires TOGETHER, in ONE act, with `syncModuleRouter`'s
  // declaration above and with `src/main/main.ts`'s construction literal and its two call sites. That file is
  // app-shell's and the three `typecheck` diagnostics the retirement closes were inside the function's own
  // body (`router.clear`, `ctx.tool`, the implicit-`any` that followed), which is why the two halves could not
  // be landed apart: a member left declared would name a source no reader ever asks (D-3, D-5).
  /** **THE DYNAMIC HALF'S ONLY SOURCE** (`docs/L2/mcp-surface/interface.md` §10; `design.md` §2, §3, §10
   *  `ASM-1`): one port answering BOTH the names (`activations()`) and the call (`invoke`) — NOT a
   *  `CapabilityRouter`, which declares no tool table and mints no `module:<n>.<t>` name. `install` is the
   *  ACTIVATION the two install tools hand their source to, and its verdicts are their answer.
   *  **NO DEFAULT THAT READS ANYTHING ELSE**: absent, the dynamic half is EMPTY — exactly the set a server
   *  publishes today with no router — so the published set and the callable set are ONE object's two answers. */
  readonly modulePort?: ModulePort
  /** **THE ONE AUTHORITY'S READER — AN INJECTION SEAM AND NEVER A SECOND AUTHORITY** (`docs/L2/mcp-surface/
   *  interface.md` §11; `docs/L2/module-system/interface.md` §8; `design.md` §6, §10 `ASM-3`; L1 §4 `C-11`).
   *  DEFAULT: the imported `appVersion()` of `src/shared/module-contract.ts`, so no caller has to name it. It is
   *  held as the private field `versionReader`, so this option's spelling and the accessor's never read alike at
   *  a call site, and a row that injects a value proves the transport REPORTS what it is given rather than that
   *  a literal happens to agree. This file spells no number. */
  readonly appVersion?: () => string
  /** central-data (`docs/L1/central-data-census-exception.md` §2 E-1) — the module's OWN data
   *  surface, which the five `provident.data.*` registrations drive. Supplied by the composition
   *  site's one options pass (`interface.md` §5; E-3). A server constructed WITHOUT it registers
   *  no `data` tool, even with the group enabled: the five names are enumerated in `ALL_TOOLS` and
   *  would otherwise register nothing (D-11). */
  dataSurface?: DataSurface
}

export interface SecuritySnapshot { token: string | null; enabled: ToolGroup[] }

export class ProvidentMcpServer {
  private server: McpServer | null = null
  private readonly backend: McpBackend
  private readonly transport: McpTransportKind
  private readonly port: number
  private readonly moduleStore: ModuleStore | null
  /** **THE DYNAMIC HALF'S ONE OBJECT** (`design.md` §2, §3, §10 `ASM-1`): the port the composition reads its
   *  NAMES from and the door a composed name's CALL is handed to. `null` when none was injected — and then the
   *  dynamic half is EMPTY, never filled from a second source. The reader the handlers close over is
   *  `liveDoor: () => ModulePort | null`, the landed `liveGate` shape, so a handler registered once reaches the
   *  port that stands AT THE TURN and no handler holds a frozen reference (`design.md` §5). */
  private readonly _modulePort: ModulePort | null
  /** **THE ONE APPLICATION-VERSION AUTHORITY'S READER, BOUND ONCE AT THE CONSTRUCTION** (`design.md` §6): the
   *  option member when one was injected, the imported accessor otherwise. One field, so `createServer`'s
   *  construction spells one call and no number (`docs/L2/mcp-surface/interface.md` §11). */
  private readonly versionReader: () => string
  private readonly dataSurface: DataSurface | null
  private httpServer: ReturnType<typeof createServer> | null = null
  private readonly httpServers = new Set<McpServer>()
  private _gate: SecurityGate
  /** M1 — the live `RegisteredTool` handles, keyed by full `provident.` tool
   *  name, captured at registration. The SDK keeps its registry private (no
   *  enumerator), so this is the only way to re-gate (enable/disable) a
   *  running server's tools on `applyGatePatch`. */
  private readonly registered = new Map<string, RegisteredTool>()
  /** R2 (mcp-resources-review.md) — the live resource handles, keyed by URI.
   *  Captured at registration so `applyGatePatch` can re-gate them alongside
   *  the tools (the SDK keeps its registry private). */
  private readonly resources = new Map<string, RegisteredResource | RegisteredResourceTemplate>()
  /** M1: the (possibly single) long-lived stdio server, so `applyGatePatch`
   *  can re-gate it in place. */
  private stdioServer: McpServer | null = null
  /** **WHETHER THE HTTP LISTENER STANDS, AND THE QUEUE THAT KEEPS A FOLLOW'S TWO DIRECTIONS IN ORDER** (`D-123`). The
   *  bit is `start()`'s and `close()`'s own record of their act — never a caller's claim about it — and the queue is what
   *  makes an open and a close that arrive inside one turn land in the order they arrived instead of interleaving two
   *  awaits. */
  private listening = false
  private settling: Promise<void> = Promise.resolve()
  /** **WHETHER THE ENABLE ITSELF HAS LANDED — `start()`'s OWN RECORD OF ITS OWN ACT, AND A DIFFERENT FACT FROM `listening`**
   *  (`D-228` residual (i)'s double bind). `listening` is the D-123 reconciliation bit and `followExclusion` writes it with the
   *  state it WANTS the socket in, BEFORE any bind is attempted; this one is written ONLY by a bind that actually succeeded and is
   *  cleared by `close()`. The two cannot be collapsed: a guard on `listening` would make a start that arrives after a FAILED
   *  follow (the port taken, the exclusion still standing open) resolve as if the socket were bound, which is the silence this
   *  guard exists to prevent — so `started` is the only bit a no-op may be answered from. */
  private started = false
  /** **THE ENABLE IN FLIGHT**: the promise of the one bind currently running, so a second `start()` that arrives DURING the first
   *  (the boot's own enable against a delivery that has not finished binding) AWAITS that bind instead of starting a second one on
   *  a fresh server — and, because it is the same promise, a bind that FAILED rejects both callers rather than being swallowed by
   *  either. It is cleared in `start()`'s `finally` whether the bind resolved or rejected, so a later start re-attempts and, if the
   *  port is still taken, fails again. */
  private starting: Promise<void> | null = null

  constructor(opts: McpServerOptions) {
    this.backend = opts.backend
    this.transport = opts.transport
    this.port = opts.port ?? 3787
    this._gate = opts.gate ?? new SecurityGate()
    this.moduleStore = opts.moduleStore ?? null
    this._modulePort = opts.modulePort ?? null
    this.versionReader = opts.appVersion ?? appVersion
    this.dataSurface = opts.dataSurface ?? null
    // `§2.2` item 3 — THE ACCEPTOR'S EPOCH SOURCE IS BOUND TO THE **LIVE** GATE HERE (`PAR-5`
    // forbids any caller-supplied epoch; the stamp therefore comes from the gate this server
    // holds, read through `this`, never from an argument). The backend holds the READER, not a
    // gate value, so the closure stays correct across `applyExclusion`/`applyGatePatch`
    // replacements. A backend without the declared seam (`McpBackend` is structural — the unit
    // tests pass a canned recorder) is left unwired and its reply turn is never stale.
    const acceptor = this.backend as unknown as { setExclusionEpochSource?: (read: () => number) => void }
    if (typeof acceptor.setExclusionEpochSource === 'function') {
      acceptor.setExclusionEpochSource(() => this._gate.exclusionEpoch())
    }
  }

  /** `docs/specs/secure-exclusion.md` `§2.1` item 3 (`T-1`/`T-2`/`T-3`) — THE TRANSITION SITE.
   *  It REPLACES `this._gate` exactly as `applyGatePatch` does (a mutating form would leave the
   *  server's own replacement invisible to an earlier reader) and fires the transition's three
   *  obligations TOGETHER:
   *   (a) the record becomes the requested state;
   *   (b) the accepted-work EPOCH bumps — the in-flight set is INVALIDATED through
   *       `backend.abandonPendingForExclusion`, which rejects EVERY pending entry and returns the
   *       count (so a call dispatched under the old state can never deliver a renderer value after
   *       the transition; the landed 60 000 ms window is closed, not waited on);
   *   (c) EVERY captured tool/resource handle is re-toggled so the registry agrees with the state.
   *  A SELF-TRANSITION (`T-3`) is a legal no-op: the epoch does NOT move, the invalidation does
   *  NOT run, and the toggles are re-applied idempotently.
   *  THE STDIO TRANSPORT IS NOT CLOSED AND NOT REBUILT (closing it would destroy the operator's
   *  ability to re-enable and would make the disabled state observable as a disconnect — the
   *  oracle `§0A` item 7(c) refuses). The HTTP path needs no re-gate: it is per-POST. */
  applyExclusion(state: 'mcp-enabled' | 'mcp-disabled'): void {
    const self = state === this._gate.exclusionState()
    // THE HOLDER IS NO LONGER WRITTEN HERE (exception §2 E-3; ASM-4 settled at L1 rev 3): the
    // surface module is its SOLE WRITER, so this method keeps the gate replacement, the epoch bump
    // and the in-flight invalidation, and writes no static state at all. The gate replaced below is
    // the enforcement path's own record, and remains this module's only reading of it.
    this._gate = this._gate.withExclusion(state)
    if (!self) {
      // (b) THE EPOCH BUMPS AND THE IN-FLIGHT WORK IS INVALIDATED — the ONE bulk-abandon path for
      // a transition. It touches `pending` only: readiness is NOT re-armed (`§0A` item 6).
      const backend = this.backend as unknown as { abandonPendingForExclusion?: (reason: string) => number }
      backend.abandonPendingForExclusion?.(EXCLUSION_CLOSED)
    }
    // `§2.1` item 3's OPERATIVE clause (`GAP-3` ruling, `A-11`) — THE EXCLUSION TRANSITION DOES NOT
    // TOGGLE THE REGISTERED HANDLES: the registration set is IDENTICAL in both states, and the
    // refusal is answered by the INVOCATION TURN alone (`exclusionTurn`, `§2.2` item 2(a)). The
    // ground is measured on the landed SDK: a disabled handle is NOT LISTED (`mcp.js:68-69`,
    // `:345-346`) and a call on one THROWS `-32602 … disabled` BEFORE the handler runs (`:106-107`,
    // `:380-382`), so toggling would make the declared receipt UNREACHABLE and would create exactly
    // the `disabled`-vs-`absent` oracle `§2.2` item 2(c) / `§0A` item 7(c) refuse.
    // THE WIDEN ARM IS RETAINED (`T-2`'s registration obligation, the `A-3` cell): a group widen that
    // arrived while the tier was open left its newly-allowed tools unregistered, so the CLOSE
    // request must still widen the live stdio server.
    this.regateLiveServer({ toggleHandles: false })
  }

  /** `§2.1` item 3 (`T-1`/`T-2`/`T-5`, `M-EX-3`/`M-EX-9`) — **THE ONE RE-GATE PATH**, shared by the
   *  SET/re-gate (`applyGatePatch`) and the exclusion transition (`applyExclusion`) so the two
   *  cannot drift: (a) every captured tool/resource handle is TOGGLED to agree with the ENABLED-GROUP
   *  set (the handles stay RESOLVABLE throughout — they are toggled, never deregistered, the
   *  non-legibility pin), and (b) any NEWLY-ALLOWED tool/resource that is not registered yet is
   *  REGISTERED on the live stdio server.
   *
   *  **(a) AND (b) READ THE OPERATOR'S GROUP SET AND NOTHING ELSE.** `§2.1` item 3 (the `GAP-3`
   *  ruling's supersession clause) / `§2.2` item 2(b)/(c): *"the exclusion is no longer a registry
   *  state at all"*. The superseded composition — `enabled: !exclusionOpen && allowed`, and the
   *  matching `toAdd = exclusionOpen ? [] : …` widen suppression — carried an EXCLUSION TERM: one
   *  operator group change while the store was open switched EVERY handle in the registry to
   *  `enabled:false` (`tools/list` read `0` of `19`; every call answered `-32602 … disabled` — the
   *  gate-6 `U-4` regression). That term
   *  is DELETED here in BOTH arms; the exclusion is read at the INVOCATION TURN alone
   *  (`exclusionTurn`, `§2.2` item 2(a)), which is what makes the declared receipt REACHABLE.
   *
   *  The HTTP transport needs no re-gate: it builds a fresh server per POST from the current gate.
   *
   *  **`toggleHandles` — THE EXCLUSION TRANSITION'S OPT-OUT (`GAP-3` ruling, `§2.1` item 3's
   *  supersession clause, `§2.2` item 2(b)/(c))**: the arm (a) loop is the OPERATOR GROUP change's
   *  mechanism and is UNTOUCHED on `applyGatePatch`'s path (its only caller with `toggleHandles`
   *  true, the default). The EXCLUSION transition passes `false`, because the ruling drops the
   *  toggling: with it ON a disabled handle is neither listed nor callable and the declared receipt
   *  is unreachable. A designer MAY still route the transition through this helper — it MUST NOT
   *  toggle. The arm (b) widen runs in BOTH cases. */
  private regateLiveServer(opts: { toggleHandles: boolean } = { toggleHandles: true }): void {
    if (opts.toggleHandles) {
      for (const [name, tool] of this.registered) {
        // U3/F1 (adversarial) — module.install/update + dynamic module:<name>.<tool> tools are
        // trusted-equivalent to `code`: the live re-gate must use the TWO-GATE (module AND code),
        // not the module-only `toolAllowed`. Otherwise disabling `code` would leave them callable by
        // a module-only agent. Both the static `module.` (dot) and dynamic `module:` (colon) prefixes
        // catch.
        const isModuleTool = name.startsWith('module.') || name.startsWith('module:')
        const allowed = isModuleTool
          ? (this._gate.toolAllowed(name) && this._gate.enabled.has('code'))
          : this._gate.toolAllowed(name)
        tool.update({ enabled: allowed })
      }
      // R2 — re-gate the captured resource handles the same way.
      for (const [uri, res] of this.resources) {
        res.update({ enabled: this._gate.toolAllowed(`resource:${uri}`) })
      }
    }
    // M1-widen — REGISTER any newly-allowed tools that were not registered before (a widen to a
    // previously-disabled group must make those tools callable on the live server, not only on the
    // next fresh HTTP request). The live server is the stdio server (HTTP builds a fresh server per
    // POST from the current gate, so widening is automatic there).
    // **AND THE WIDEN ARM IS THE SAME ACT AS AN ACTIVATION'S** (`docs/L3/mcp-surface/design.md` §5's third
    // caller; `signatures.md` §5's call site (3)): it calls `syncPublishedTools()`, the ONE re-registration
    // member, so the group axis and the registry axis cannot describe two sets. Its RESOURCE half stays where
    // it is — `ALL_RESOURCES` and the resource widen are not this composition's, and `syncPublishedTools` is
    // tools only (`docs/L2/mcp-surface/interface.md` §10, §6).
    const liveServer = this.stdioServer
    if (!liveServer) return
    const liveGate = (): SecurityGate => this._gate
    this.syncPublishedTools()
    const resToAdd = ProvidentMcpServer.ALL_RESOURCES.filter(
      (r) => this._gate.toolAllowed(`resource:${r.uri ?? r.uriTemplate}`) && !this.resources.has(r.uri ?? r.uriTemplate!),
    )
    if (resToAdd.length > 0) {
      ProvidentMcpServer.registerResources(liveServer, this.backend, resToAdd, this.resources, liveGate)
    }
  }

  getGateConfig(): SecuritySnapshot {
    return this._gate.config
  }

  /** `§2.2` item 2 / `PAR-4` — the DECLARED reader: the refusal receipt while the gate says
   *  `'mcp-disabled'`, and `null` ONLY when the gate says `'mcp-enabled'`. No third return value;
   *  it never throws. **The returned receipt carries the AMENDED additive `message` member**
   *  (`§2.5` item 1, 2026-10-08): `null` still means `'mcp-enabled'` and NOTHING ELSE, the two
   *  closed tokens are unmoved, and the message is the SAME server-authored sentence the tool
   *  carrier delivers — never a caller-supplied one (`PAR-8`). */
  exclusionSnapshot(): { status: 'refused'; reason: string; message: string } | null {
    return this._gate.exclusionState() === 'mcp-disabled'
      ? { status: 'refused', reason: EXCLUSION_CLOSED, message: EXCLUSION_CLOSED_MESSAGE }
      : null
  }

  /** The full tool-name list the server can register (spec mcp-server-gate.md
   *  §3). Kept in one place so registration + the gate agree. */
  static readonly ALL_TOOLS: string[] = [
    'provident.dispatch',
    'provident.focus',
    'provident.get_rendered_html',
    'provident.get_markdown',
    'provident.list_targets',
    'provident.get_node_state',
    'provident.code.get',
    'provident.code.validate',
    'provident.load',
    'provident.op',
    'provident.export',
    'provident.validate',
    'provident.teardown',
    'provident.journal',
    'provident.code.set',
    'provident.code.create',
    'provident.code.delete',
    'provident.code.load',
    'provident.code.loadBatch',
    'module.install',
    'module.update',
    'module.list',
    'provident.data.read',
    'provident.data.write',
    'provident.data.delete',
    'provident.data.list',
    'provident.data.journal',
  ]

  /** **THE PUBLISHED SET AT THIS INSTANT** (`docs/L2/mcp-surface/interface.md` §10; `docs/L3/mcp-surface/
   *  design.md` §2, §3): `ALL_TOOLS` stops being the WHOLE set and becomes its FOUNDATION HALF — these entries
   *  PLUS one `module:<name>.<tool>` name per activated module tool, composed by `composePublishedSet` over the
   *  gate the server holds and the port's own `activations()`. The dynamic half is EMPTY where no port stands:
   *  there is NO default that reads a second source (`ASM-1`).
   *
   *  The NAME is the landed one and does not move (`signatures.md` §4; D-41): `docs/L2/mcp-surface/interface.md`
   *  §10 cites this site, so a rename would strand that citation. It is composed AT TWO INSTANTS — the
   *  construction and every activation or withdrawal — and never recomputed per request, because a listing
   *  recomputed per request would answer names no captured handle stands for (L2 §8 `ASM-11`; D-305). */
  allowedToolNames(): string[] {
    return composePublishedSet(
      registeredToolNames(this._gate, ProvidentMcpServer.ALL_TOOLS),
      // THE DOOR'S HALF: the port's activation order, read at THIS instant and never cached.
      this._modulePort === null ? [] : this._modulePort.activations(),
      // THE GROUP PREDICATE, asked ONCE: `groupForTool` is the ONE reader of the group rule, so a name its
      // group does not admit is ABSENT from the set — never composed and then refused (L2 §10).
      (name: string) => this._gate.toolAllowed(name),
    )
  }

  /** **THE RE-REGISTRATION ACT — THE LIVE SERVER'S SET MOVES WITHOUT A REBUILD** (`docs/L3/mcp-surface/
   *  design.md` §5; `signatures.md` §4; `docs/L2/mcp-surface/interface.md` §12).
   *
   *  ONE pass over the DELTA, and the two readings are the design's, not a summary of it:
   *   · `added` is WHAT THE MAP GAINED — read off the capture map before and after the registration pass,
   *     NEVER off the candidate list, because a name the gate admits but no registration arm can answer is not
   *     an `added` name (the five `provident.data.*` arms are conditional on an injected surface, `D-11`).
   *   · `withdrawn` is every captured `module:`-prefixed name the port's `activations()` NO LONGER HOLDS, read
   *     UNFILTERED BY GROUP (`ASM-5`): a name whose GROUP is off is NOT withdrawn — it stays captured and the
   *     re-gate toggles it, which is the landed mechanism, and the two axes never swap (`G-4`).
   *
   *  WITHDRAW IS `remove()` AND NEVER `update({enabled:false})` (`ASM-2`; `G-4`): a disabled handle is
   *  indistinguishable from a group-off one, so the group axis could never restore it, and a later
   *  re-activation of the same name would meet the SDK's already-registered throw. `remove()` takes the name
   *  out of the SDK's registry AND out of this map, so the next registration is clean.
   *
   *  THREE CALLERS AND NO FOURTH (L2 §12; L1 §3 `S-5`): the `module.install`/`module.update` arm right after its
   *  persisted row and its one activation; the re-gate's widen arm; and — NAMED AND OWED RATHER THAN DECLARED —
   *  the port's own out-of-band activation delivery, for which no route exists at this head (neither
   *  `ModulePort` nor `ModuleHost` carries a sink), so such an activation reaches the live set only at the NEXT
   *  composition instant. `http` needs no re-registration and gets none: that transport builds a fresh server
   *  per POST from the current gate. */
  syncPublishedTools(): {readonly added: readonly string[]; readonly withdrawn: readonly string[]} {
    // (a) THE REGISTRY AXIS — the delta is computed and APPLIED here, in one place, so no caller can apply half
    // of it:
    const held = new Set<string>()
    if (this._modulePort !== null) {
      for (const activation of this._modulePort.activations()) {
        for (const tool of activation.tools) held.add(tool)
      }
    }
    const withdrawn: string[] = []
    for (const name of [...this.registered.keys()]) {
      if (!name.startsWith(MODULE_NAMESPACE)) continue
      if (held.has(name)) continue
      this.registered.get(name)?.remove()
      this.registered.delete(name)
      withdrawn.push(name)
    }
    // (b) THE GROUP / REGISTRY AXIS SHARED — the names the composition publishes and the map lacks. The map is
    // read BEFORE the pass and again AFTER it, so `added` answers what was CAPTURED and not what was asked for.
    const wanted = this.allowedToolNames().filter((name) => !this.registered.has(name))
    const before = new Set(this.registered.keys())
    const liveServer = this.stdioServer
    if (liveServer !== null && wanted.length > 0) {
      const liveGate = (): SecurityGate => this._gate
      const rePublish = (): void => { this.syncPublishedTools() }
      const liveDoor = (): ModulePort | null => this._modulePort
      ProvidentMcpServer.registerTools(liveServer, this.backend, wanted, this.registered, this.moduleStore, this.dataSurface, liveGate, rePublish, liveDoor)
    }
    const added = [...this.registered.keys()].filter((name) => !before.has(name))
    return {added, withdrawn}
  }

  /** **THE CAPTURED HANDLES' KEYS — the map's own reading**, symmetric to the landed `registeredResources()`
   *  (`docs/L3/mcp-surface/signatures.md` §4; `design.md` §2). It is what tells a WITHDRAWN name from a
   *  group-disabled one: the withdrawn is absent, the toggled is present with `registeredEnabled` false.
   *  NOT named `registeredToolNames`, which is the landed FREE function's spelling — one name for two facts is
   *  the drift D-41 refuses. */
  capturedToolNames(): string[] {
    return [...this.registered.keys()]
  }

  /** U9 (F1) — **THE CLASS'S OWN INVOCATION ACCESSOR, AND IT RE-STATES NO ARM** (`docs/L3/mcp-surface/design.md`
   *  §5): the null-door arm and the delegate are `invokeModuleTool`'s, over `this._modulePort`, so the class and
   *  the free function are ONE shape and there is no second spelling to drift. The two-gate is checked at THIS
   *  side before the door, and a refusal THROWS the error naming the pair (`G-6`'s one-door rule). */
  invokeTool(toolName: string, args: unknown): unknown {
    return invokeModuleTool(this._modulePort, this._gate, toolName, args)
  }

  /** R1 (mcp-resources-review.md) — the resource list + their read-group
   *  mapping. Each resource mirrors a `read`-group tool; a resource is
   *  registered ONLY when its group is allowed (never always-registered). */
  /** R1 (mcp-resources-review.md) — a resource definition. */
  static readonly ALL_RESOURCES: Array<ResourceDef> = [
    { name: 'app', uri: 'mcp://provident/app', group: 'read', mimeType: 'text/html', method: 'renderedHtml', description: 'The current rendered HTML view (DOM + SSR + census) — mirrors provident.get_rendered_html. Always-fresh; a large read may return {census,digest,preview,truncated}.' },
    { name: 'targets', uri: 'mcp://provident/targets', group: 'read', mimeType: 'application/json', method: 'listTargets', description: 'The addressable node vocabulary — mirrors provident.list_targets. Concrete node URIs are discoverable only here (resources/list lists this template, not concrete nodes).' },
    { name: 'node', uriTemplate: 'mcp://provident/node/{nodeId}', group: 'read', mimeType: 'application/json', method: 'nodeState', description: 'A single node\'s resolved state — mirrors provident.get_node_state. The nodeId is validated against the live in-tree graph.' },
  ]

  /** The resource URIs whose group the current gate allows (R1). */
  allowedResourceUris(): string[] {
    return ProvidentMcpServer.ALL_RESOURCES.filter((r) => this._gate.toolAllowed(`resource:${r.uri ?? r.uriTemplate!}`)).map((r) => r.uri ?? r.uriTemplate!)
  }

  applyGatePatch(
    patch: { token?: string | null; groups?: ToolGroup[]; disable?: ToolGroup[] },
  ): SecuritySnapshot {
    this._gate = this._gate.apply(patch)
    // `docs/specs/secure-exclusion.md` `§2.1` item 3 `T-5` / §2.2 item 2(b) — the re-gate is
    // COMPOSED WITH the exclusion, never rewritten: while the tier is open EVERY handle stays
    // disabled regardless of the group set (the exclusion is a separate axis and the toggling is
    // the SAME mechanism, not a second one). `applyExclusion` routes through the SAME helper, so
    // the two paths are literally one mechanism and neither can omit an arm the other has.
    this.regateLiveServer()
    return this._gate.config
  }

  /** M1/M2 accessors (test-visible): register the stdio server (or any server)
   *  so its tools are captured, and query a tool's live enabled state. */
  ensureServerRegistered(): McpServer {
    if (this.stdioServer) return this.stdioServer
    const server = this.createServer()
    this.stdioServer = server
    this.server = server
    return server
  }

  registeredEnabled(name: string): boolean {
    return this.registered.get(name)?.enabled ?? false
  }

  /** R2 test/accessor — the registered resource URIs + template. */
  registeredResources(): Array<{ uri?: string; uriTemplate?: string; enabled: boolean }> {
    const out: Array<{ uri?: string; uriTemplate?: string; enabled: boolean }> = []
    for (const [uri, r] of this.resources) {
      if ('resourceTemplate' in r) {
        out.push({ uriTemplate: String((r as RegisteredResourceTemplate).resourceTemplate.uriTemplate), enabled: r.enabled })
      } else {
        out.push({ uri, enabled: r.enabled })
      }
    }
    return out
  }

  /** R2 test — a resource's live enabled state by URI. */
  resourceEnabled(uri: string): boolean {
    return this.resources.get(uri)?.enabled ?? false
  }

  /** R4/R5 test — invoke a registered resource's read callback by URI.
   *  Returns the underlying Runtime snapshot (JSON-safe). A concrete node URI
   *  resolves to the `{nodeId}` template. */
  async readResource(uri: string): Promise<unknown> {
    // `§2.2` item 2(a) — THE INVOCATION TURN, applied on the RESOURCE surface too and BEFORE any
    // lookup or dispatch. A resource read while the tier is open answers the declared refusal
    // VALUE whether or not the handle happens to be registered on this instance: the refusal is a
    // property of the SURFACE (`D-SCOPE`'s resource member), never of a registration side effect.
    const refused = exclusionTurn(() => this._gate)
    if (refused !== null) return JSON.parse(refused.content[0].text) as unknown
    let res = this.resources.get(uri)
    let variables: Record<string, string> = {}
    if (!res) {
      const m = /mcp:\/\/provident\/node\/(.+)$/.exec(uri)
      if (m) {
        res = this.resources.get('mcp://provident/node/{nodeId}')
        variables = { nodeId: decodeURIComponent(m[1]) }
      }
    }
    if (!res) throw new Error(`resource not found: ${uri}`)
    const result = 'resourceTemplate' in res
      ? await (res as RegisteredResourceTemplate).readCallback(new URL(uri), variables, undefined as never)
      : await (res as RegisteredResource).readCallback(new URL(uri), undefined as never)
    const contents = (result as { contents?: Array<{ text?: string }> }).contents?.[0]
    if (contents?.text) {
      try {
        return JSON.parse(contents.text)
      } catch {
        return contents.text
      }
    }
    return result
  }

  /** N2 test seam — connect a mock transport to the stdio server so the notify
   *  path's `isConnected()` gate can be exercised without a real stdio session.
   *  Returns the mock transport's recorded sent messages. */
  async connectMockTransport(): Promise<Array<{ method?: string; params?: unknown }>> {
    const sent: Array<{ method?: string; params?: unknown }> = []
    const transport = {
      start: async () => {},
      send: async (msg: { method?: string; params?: unknown }) => { sent.push(msg) },
      close: async () => {},
      onclose: undefined as (() => void) | undefined,
      onerror: undefined as ((e: unknown) => void) | undefined,
      onmessage: undefined as unknown,
    }
    const server = this.ensureServerRegistered()
    await (server as unknown as { connect(t: unknown): Promise<void> }).connect(transport)
    return sent
  }

  /** N2/N5 (live-notification-review.md) — a renderer "app graph changed" push.
   *  Returns `true` if a notification was actually delivered, `false` if it was
   *  a no-op. Guards:
   *  - N2 (stdio-only): the HTTP transport is stateless (a fresh McpServer per
   *    POST, disconnected after the response) — `isConnected()` is false there,
   *    so a notify is a NO-OP (never a hang). Only the long-lived stdio server
   *    delivers.
   *  - N5 (gate-aware): the `resources` capability is present only when a
   *    `read`-group resource is registered. If `read` is off (no resources,
   *    no capability), a notify emits nothing.
   *  - N1 (typed): the notify maps to a per-resource `sendResourceUpdated`
   *    (content change), NOT a tool-list/list-changed (those are applyGatePatch-
   *    only).
   */
  async notifyGraphChanged(): Promise<boolean> {
    // N2 — only the stdio transport is a connected, push-capable session.
    if (this.transport !== 'stdio' || !this.stdioServer?.isConnected()) return false
    // N5 — gate-aware: only emit resource-updated when `read` (the resources'
    // group) is enabled (the capability is present only when resources register).
    if (!this._gate.toolAllowed('resource:mcp://provident/app')) return false
    try {
      await this.stdioServer.server.sendResourceUpdated({ uri: 'mcp://provident/app' })
      return true
    } catch {
      // N2 — a disconnected/failed send is a no-op (never a hang, never a throw
      // that breaks the renderer push path).
      return false
    }
  }

  get gate(): SecurityGate {
    return this._gate
  }

  /** A fresh McpServer wired to the backend, registering ONLY the tools the
   *  gate allows (A1-W5 — the fail-open fix). STATELESS HTTP requires one
   *  server per request (the SDK's canonical stateless pattern). */
  /** A fresh McpServer wired to the backend, registering ONLY the tools the
   *  gate allows (A1-W5 — the fail-open fix). Captures the `RegisteredTool`
   *  handles into `this.registered` (M1) so a later re-gate can toggle them. */
  private createServer(): McpServer {
    const server = new McpServer(
      // **THE ONE SITE THE NUMBER IS PUBLISHED, AND IT SPELLS NO NUMBER** (`docs/L2/mcp-surface/interface.md`
      // §11; `docs/L3/mcp-surface/design.md` §6; L1 §4 `C-11`): `serverInfo.version` reports the ONE
      // application-version authority through the `versionReader` seam — the injected value or, unset, the
      // imported `appVersion()`. The `'0.1.0'` literal retires here, and because `http` builds a fresh server
      // per POST this one site serves BOTH transports with no second site (`G-10`: this file reads no manifest).
      { name: 'provident-electron', version: this.versionReader() },
      {
        instructions:
          'The Provident-Electron shell: a provident-ssr renderer with full ' +
          'synthetic-event access and rendered-HTML visibility. Drive the demo ' +
          'app by dispatching synthetic events (click/input) on its nodes ' +
          '(target by authored css.id, e.g. "inc"/"dec"/"echo-input", or by ' +
          'nodeId/wire), then read the rendered HTML. The graph is authoritative: ' +
          'a dispatch mutates the producing graph and re-renders both the live ' +
          'DOM and the SSR fragment.',
      },
    )
    // `§2.2` item 2(a) — the handlers are registered ONCE (the stdio server is built once), so
    // what they close over must be the READER of the live gate, never the gate instance: the
    // transition REPLACES `this._gate`, and a captured instance would freeze the enforcement at
    // its registration-time value.
    // **AND THE TWO OTHER READERS THE LOOP CLOSES OVER ARE BOUND HERE, ONCE** (`docs/L3/mcp-surface/
    // signatures.md` §5): `rePublish` is the install/update arm's re-registration call (`design.md` §5's first
    // caller) and `liveDoor` is the DOOR a composed name's call is handed to at the turn. No handler holds a
    // frozen server, a frozen gate or a frozen port.
    const liveGate = (): SecurityGate => this._gate
    const rePublish = (): void => { this.syncPublishedTools() }
    const liveDoor = (): ModulePort | null => this._modulePort
    ProvidentMcpServer.registerTools(server, this.backend, this.allowedToolNames(), this.registered, this.moduleStore, this.dataSurface, liveGate, rePublish, liveDoor)
    // R3 — register the gated read-group resources in the SAME server build
    // (serves BOTH the stdio long-lived server and the per-POST HTTP server).
    const allowedResources = ProvidentMcpServer.ALL_RESOURCES.filter((r) => this._gate.toolAllowed(`resource:${r.uri ?? r.uriTemplate!}`))
    ProvidentMcpServer.registerResources(server, this.backend, allowedResources, this.resources, liveGate)
    return server
  }

  private static registerTools(
    server: McpServer,
    backend: McpBackend,
    allowed: string[],
    registered: Map<string, RegisteredTool>,
    moduleStore: ModuleStore | null,
    dataSurface: DataSurface | null,
    liveGate: () => SecurityGate,
    /** **THE INSTALL/UPDATE ARM'S RE-REGISTRATION CALL** (`docs/L3/mcp-surface/design.md` §5's first caller):
     *  the callback the delivery arm makes in the SAME act as the activation, so the live server's tool set
     *  moves without a rebuild. Bound at the construction, so no handler holds a frozen server. */
    rePublish: () => void,
    /** **THE DOOR READER** the dynamic arm reaches the executor through at the TURN (`design.md` §5; `G-6`):
     *  `() => ModulePort | null`, the landed `liveGate` shape. ONE spelling, and no second route. */
    liveDoor: () => ModulePort | null,
  ): void {
    // `§2.2` item 2(a) — THE INVOCATION TURN, applied at the ONE REGISTRATION BOUNDARY so it is
    // UNFORGETTABLE for EVERY tool (including one added later): each declared handler below is
    // wrapped so that, while the tier is open, the call answers the declared refusal VALUE before
    // any renderer dispatch. `applyGatePatch`'s registry toggling is KEPT beside it and is NOT the
    // enforcement — it cannot interrupt a call already dispatched to the renderer.
    // The wrapper is generic over the handler's own signature and returns that EXACT type, so
    // each declared registration keeps the SDK's inferred schema type and the wrapper costs the
    // call sites no annotation.
    const guarded = <H extends (...a: never[]) => unknown>(handler: H): H =>
      (async (...a: never[]) => exclusionTurn(liveGate) ?? (await (handler as (...x: never[]) => unknown)(...a))) as unknown as H
    if (allowed.includes('provident.dispatch')) {
      registered.set('provident.dispatch', server.registerTool('provident.dispatch', {
        title: 'Dispatch a synthetic event',
        description:
          'Dispatch a synthetic event on a node of the producing provident-ssr ' +
          'graph. Target by an authored css.id (e.g. "inc", "dec", "echo-input"), ' +
          'by nodeId, or by wire. The dispatch mutates the graph (the Phase A/B ' +
          'engine entry), awaits the flush, and re-renders; the response includes ' +
          'the contained HandlerResult[], the dirtied node ids, and the fresh ' +
          'rendered HTML (live DOM + SSR fragment). Pass a requestId to make the ' +
          'call idempotent (a duplicate requestId returns the first result).',
        inputSchema: {
          target: z.union([
            z.object({ kind: z.literal('cssId'), cssId: z.string() }),
            z.object({ kind: z.literal('nodeId'), nodeId: z.string() }),
            z.object({ kind: z.literal('wire'), wire: z.string() }),
            z.string(),
          ]).describe('The dispatch target: css.id (ergonomic) or nodeId/wire (authoritative), or a bare string resolved css.id then nodeId'),
          event: z.string().describe('Event name (e.g. "click", "input")'),
          args: z.array(z.unknown()).optional().describe('Structured-clone-safe arguments (args[0] becomes event.value)'),
          requestId: z.string().optional().describe('Idempotency key — duplicate requestIds return the first call\'s result'),
        },
      }, guarded(async (args) => {
        const req: DispatchRequest = {
          ...(args.requestId !== undefined ? { requestId: args.requestId } : {}),
          target: args.target,
          event: args.event,
          ...(args.args !== undefined ? { args: args.args } : {}),
        }
        const value = await backend.invoke('dispatch', req)
        return text(value)
      })))
    }

    if (allowed.includes('provident.get_rendered_html')) {
      registered.set('provident.get_rendered_html', server.registerTool('provident.get_rendered_html', {
        title: 'Read the rendered HTML',
        description:
          'Read the current rendered view of the provident-ssr demo: the live ' +
          'DOM innerHTML of the renderer, the SSR fragment re-emitted from the ' +
          'same graph (build-time view), and a node/compile census. Use this to ' +
          'inspect what the app currently displays before/after dispatching events.',
        inputSchema: {},
      }, guarded(async () => {
        const value = await backend.invoke('renderedHtml', {})
        return text(value)
      })))
    }

    if (allowed.includes('provident.get_markdown')) {
      registered.set('provident.get_markdown', server.registerTool('provident.get_markdown', {
        title: 'Read the rendered markdown',
        description:
          'Read the current graph as a simplified text-only markdown document ' +
          '(the 0.2 MarkdownAdapter — Feature 2). Non-interactive: on:* and ' +
          'data:* props are dropped, so there is no element-to-node mapping in ' +
          'the markdown output (use get_rendered_html for that). Use this for ' +
          'a compact, agent-friendly summary of what the app currently displays.',
        inputSchema: {},
      }, guarded(async () => {
        const value = await backend.invoke('markdown', {})
        return text(value)
      })))
    }

    if (allowed.includes('provident.list_targets')) {
      registered.set('provident.list_targets', server.registerTool('provident.list_targets', {
        title: 'List dispatch targets',
        description:
          'List every node in the producing graph with its authored css.id, ' +
          'props.id, type, state, in-tree flag, content, and declared handlers — ' +
          'the addressable vocabulary for provident.dispatch.',
        inputSchema: {},
      }, guarded(async () => {
        const value = await backend.invoke('listTargets', {})
        return text(value)
      })))
    }

    if (allowed.includes('provident.get_node_state')) {
      registered.set('provident.get_node_state', server.registerTool('provident.get_node_state', {
        title: 'Read a node\'s resolved state',
        description:
          'Read the pass-2 resolved compiled states (read-only snapshot) of a ' +
          'node plus the graph census. Target by css.id or nodeId/wire.',
        inputSchema: {
          target: z.union([
            z.object({ kind: z.literal('cssId'), cssId: z.string() }),
            z.object({ kind: z.literal('nodeId'), nodeId: z.string() }),
            z.object({ kind: z.literal('wire'), wire: z.string() }),
            z.string(),
          ]).describe('The node target'),
        },
      }, guarded(async (args: { target: unknown }) => {
        const value = await backend.invoke('nodeState', args.target)
        return text(value)
      })))
    }

    // M2 — the graph + code tools are REAL (Unit C): the backend forwards each
    // call to the renderer (or the battery host's runtime) over the invoke
    // seam. They register only when their group is enabled, so the gate's
    // enabled-map and the real registration agree. The `read`-group
    // `code.get`/`code.validate` also register here (they're read-only).
    const graph: Array<{ name: string; description: string; inputSchema: Record<string, z.ZodTypeAny> }> = [
      { name: 'provident.load', description: 'Load an envelope/doc/commands into the graph (battery §3)', inputSchema: { kind: z.enum(['envelope', 'doc', 'commands']).describe('A2 envelope / A1 doc / A3 command array'), envelope: z.unknown().optional(), doc: z.unknown().optional(), commands: z.array(z.unknown()).optional(), userData: z.unknown().optional() } },
      { name: 'provident.op', description: 'Apply a single managed-channel op', inputSchema: { command: z.unknown().describe('the OpCommand payload') } },
      { name: 'provident.export', description: 'Export the graph (legacy or serialized)', inputSchema: { format: z.enum(['legacy', 'serialized']) } },
      { name: 'provident.validate', description: 'Validate an export against a throwaway graph', inputSchema: { kind: z.enum(['legacy', 'serialized']), export: z.unknown() } },
      { name: 'provident.teardown', description: 'Tear the graph down to root-only', inputSchema: {} },
      { name: 'provident.journal', description: 'Drive the engine journal reversibility surface (undo/redo/replay) — mutates the graph and re-renders', inputSchema: { action: z.enum(['undo', 'redo', 'replay']).describe('the journal action: undo inverts the top of the undo stack, redo re-applies the undone op, replay re-runs the journal in order') } },
      { name: 'provident.code.get', description: 'Read the envelope subtree at path', inputSchema: { path: z.string() } },
      { name: 'provident.code.set', description: 'Set the envelope value at path', inputSchema: { path: z.string(), value: z.unknown() } },
      { name: 'provident.code.create', description: 'Append an entry to the envelope array at path', inputSchema: { path: z.string(), entry: z.unknown() } },
      { name: 'provident.code.delete', description: 'Delete an envelope entry at path', inputSchema: { path: z.string(), index: z.number().optional() } },
      { name: 'provident.code.validate', description: 'Schema-validate an envelope without building the graph', inputSchema: { envelope: z.unknown().optional() } },
      { name: 'provident.code.load', description: 'Apply an edited envelope to the live graph', inputSchema: { envelope: z.unknown().optional() } },
      { name: 'provident.code.loadBatch', description: 'Stage N code.* envelope ops and re-derive once (all-or-nothing)', inputSchema: { ops: z.array(z.unknown()).describe('the batch ops: [{op:"set"|"create"|"delete", path, value?/entry?/index?}]') } },
      { name: 'module.install', description: 'Install/update a module in the persisted registry (U3). Same name+version → no-op; same name+different version → rejected unless force:true. Requires module AND code groups (executable entry).', inputSchema: { name: z.string(), source: z.string(), version: z.string().optional(), force: z.boolean().optional() } },
      { name: 'module.update', description: 'Re-load + re-register a module at a new version. Requires module AND code groups.', inputSchema: { name: z.string(), source: z.string(), version: z.string().optional(), force: z.boolean().optional() } },
      { name: 'module.list', description: 'Read-only census of installed modules + versions. Requires module group.', inputSchema: {} },
    ]
    const dispatch = (name: string): string => name.slice('provident.'.length)
    for (const { name, description, inputSchema } of graph) {
      if (!allowed.includes(name)) continue
      registered.set(name, server.registerTool(name, {
        title: name,
        description,
        inputSchema,
      }, guarded(async (args: Record<string, unknown>) => {
        // U3 — the module.* tools are MAIN-process (the secure crossing's `file.modules.<id>` rows: the
        // registry the composition hands this server — the legacy store and its `put`/`remove`/`setDisabled`
        // FILE writers are deleted, `D-81`), NOT routed to the renderer. They are handled here directly.
        if (name.startsWith('module.')) {
          // (0) EVERY OTHER `module.*` TOOL IS THE LANDED HELPER'S ANSWER — `module.list` is a read, and the
          // unknown-name arm is the helper's own throw (`D-81`).
          if (name !== 'module.install' && name !== 'module.update') return text(handleModuleTool(moduleStore, name, args))
          // (1) THE CENSUS CHECK IS READ-ONLY AND COMES FIRST (`D-315`): the same verdict the landed helper
          // answers, with NO `put`, so a rejected/no-op answer ends the arm before anything is stored or activated.
          const census = handleModuleTool(moduleStore, name, args, false) as { status?: string }
          const source = typeof args.source === 'string' ? args.source : ''
          const door = liveDoor()
          // (2) NO PORT: the census row is the whole act, exactly the landed fallback's answer.
          if (door === null) {
            const landed = handleModuleTool(moduleStore, name, args) as { status?: string }
            rePublish()
            return text(landed)
          }
          // (3) A REFUSED OR UNMOVED CENSUS ROW ENDS THE ARM: nothing moved, so there is nothing to activate and no
          // re-publish to make (`docs/L3/mcp-surface/design.md` §5).
          if (census.status === 'rejected' || census.status === 'no-op') return text(census)
          // (4) THE SAME SOURCE GOES TO THE PORT'S `install`, AND THAT CALL IS THE ACTIVATION: the verdicts it
          // returns are this arm's ANSWER. **A REFUSED ACTIVATION WRITES NOTHING TO THE CENSUS** (`D-315`), so a
          // refused module is never listed and a retry reaches the resolver; ONLY a non-refused verdict persists
          // the row, and the re-publish follows in the same act. THE TWO STORES ANSWER TWO QUESTIONS AND ARE NOT
          // ONE REGISTRY — the `ModuleStore` above is the census of INSTALLED rows, the executor's registry is its
          // own activation table reached only through `activations()`/`invoke` — so a delivery is written once to
          // each and neither is renamed the other. THE LINE THAT STOOD HERE WAS `syncModuleRouter(router,
          // moduleStore)`, and what replaced it is not a call: that target is a tool table the realm half never
          // declared, so the function retired WHOLE in the coupled app-shell pass and what stands in its place is
          // this arm's one `install` and one `rePublish()` — `design.md` §5; `docs/L2/mcp-surface/interface.md` §10.
          const answered = door.install({ kind: 'source', source })
          const verdicts: readonly unknown[] = Array.isArray(answered) ? answered : [answered]
          const refused = verdicts.some((verdict) => {
            const held = typeof verdict === 'object' && verdict !== null ? (verdict as { status?: unknown }) : null
            return held?.status === 'rejected'
          })
          if (!refused) {
            handleModuleTool(moduleStore, name, args)
            rePublish()
          }
          return text(answered)
        }
        const method = dispatch(name)
        const value = await backend.invoke(method, args)
        return text(value)
      })))
    }

    // U9 (M-r3) — **THE DYNAMIC ARM: the registry's `module:<name>.<tool>` names, and their call route**
    // (`docs/L3/mcp-surface/design.md` §5, §9 `G-12`; `docs/L2/mcp-surface/interface.md` §10).
    // THE NAMES COME FROM THE PORT'S OWN `activations()` — the same answer the composition reads — so a name is
    // never listed without a handler behind it. A name the caller's `allowed` list does not carry is not
    // registered (a group-off name is ABSENT, never present-and-refusing), and a name the map already holds is
    // never registered twice (the SDK's registry is keyed by name).
    // **AND THE DECLARATION MOVES WITH THE CALL SITE, IN ONE ACT**: the arm declared `inputSchema: {}` — an empty
    // raw shape the SDK normalises into a MEMBERLESS object schema and parses EVERY call against, handing the
    // handler `parseResult.data` — so a caller's members were stripped to `{}` before this function was reached,
    // and a call omitting `arguments` was refused by the parse itself. The declaration below declares NO member
    // (a module tool's argument shape is the MODULE's, never this surface's) and STRIPS nothing: the caller's own
    // keys reach the door with their values by reference, and an omitted `arguments` member is the SAME CALL as
    // `{}` — the shape `provident.focus` keeps, and for the same reason (`G-12`; D-141's passthrough precedent).
    const door = liveDoor()
    if (door !== null) {
      for (const activation of door.activations()) {
        for (const tool of activation.tools) {
          if (!allowed.includes(tool)) continue
          if (registered.has(tool)) continue
          registered.set(tool, server.registerTool(tool, {
            title: tool,
            description: `A dynamic module tool (${tool}) — requires module AND code groups (invocation two-gate).`,
            inputSchema: z.preprocess((carried) => carried ?? {}, z.object({}).passthrough()),
          }, guarded(async (args: unknown) => {
            // THE PAIR IS CHECKED AT THIS SIDE BEFORE ENTRY, THEN THE NAME AND THE ARGS GO TO THE DOOR BY
            // IDENTITY; the door's answer — a handler's value OR its own refusal VALUE — is rendered by the
            // same `text` a landed answer takes, with `isError` absent (`design.md` §7).
            const value = invokeModuleTool(liveDoor(), liveGate(), tool, args)
            return text(value)
          })))
        }
      }
    }

    // U-FOCUS-TOOL (`F3`, docs/specs/focus-tool.md §2.1 items 1-5/8/9) — the tool
    // row and its handler. THE HANDLER IS A THIN ADAPTER AND NOTHING ELSE HAPPENS
    // IN IT: validate the argument shape, make ONE renderer call over the existing
    // invoke seam, and return the renderer's answer VERBATIM. It holds NO state
    // between calls (a second identical call is a second renderer call, never a
    // cache hit — §2.3 item 5), mints NO id (§2.3 items 1/2), keeps no map, no
    // registry and no counter, sorts nothing, dedupes nothing, re-keys nothing and
    // re-derives no model rule (§2.3 items 3/4): the LIVE AUTHORITY for the answer
    // is the RENDERER's own re-read of the tab record — `status`, `order`, `landing`
    // and `rows`, plus `refused` IFF the write was refused (`docs/L2/mcp-surface/
    // interface.md` §3; D-141, D-142) — never a graph slice and never a second
    // authority inside this tool.
    // THE ARGUMENT SHAPE IS DECLARED, NOT ENFORCED BY A SCHEMA PARSER: the two
    // declared members are carried and NO schema strips a malformed call's keys
    // before the declared validation THROW names the rejected one (§0A note 3(a)/(d),
    // `S-6`/`F-1`) — a member the caller did not supply is never invented, and a
    // member the caller DID supply travels BY IDENTITY (§2.3 item 3).
    if (allowed.includes('provident.focus')) {
      registered.set('provident.focus', server.registerTool('provident.focus', {
        title: 'Focus a target',
        description:
          'Set the active tab in the app\'s tab record, in the record\'s own terms ' +
          'and durably: the write lands at the record\'s own durable tier, and the ' +
          'record\'s exactly-one-active normalisation settles any older active row. ' +
          'Both members of `{ target?, newTab? }` are optional and pass through ' +
          'uninterpreted: a repeated target activates its standing row, and ' +
          'newTab: true opens one new row carrying the target and seats it. The ' +
          'answer is the tab record as re-read after the write, with a store ' +
          'refusal carried as `refused`. This tool mutates no graph node, emits ' +
          'no notification and renders no surface.',
        // THE SCHEMA DECLARES THE TWO NAMED MEMBERS, ACCEPTS AN OMITTED ARGUMENTS
        // MEMBER AND PASSES EVERY OTHER MEMBER THROUGH BY IDENTITY: an omitted
        // arguments member is the SAME CALL as `{}` (§0A note 3(a), `S-1`), and a schema
        // that STRIPPED an unknown key would consume a malformed call before the declared
        // validation THROW could NAME the rejected key — the throw is what the contract
        // fixes (§0A note 3(d), `S-6`/`F-1`).
        inputSchema: z.preprocess(
          (carried) => (carried ?? {}),
          z.object({
            target: z.unknown().optional().describe('The opaque target the act seats — passed through uninterpreted. A non-string can be no tab row, so the route writes nothing and answers the refusal in `refused`.'),
            newTab: z.unknown().optional().describe('Open one new tab row carrying the same target — carried uninterpreted; only the boolean true opens one, and no default is applied.'),
          }).passthrough(),
        ),
      }, guarded(async (args: unknown) => focusHandler(args, backend) as never)))
    }

    // central-data (`docs/L1/central-data-census-exception.md` §2 E-1; `docs/L2/central-data/
    // interface.md` §1, §4) — THE FIVE `provident.data.*` TOOLS, the sixth group's registrations.
    // EACH ONE DRIVES THE MODULE'S OWN SURFACE AND NOTHING ELSE: the adapter is the `DataSurface`
    // operation of the same name, so a tool call and its bridge route are ONE answer site (D-11).
    // THE SCHEMA DECLARES THE DECLARED MEMBERS AND PASSES EVERY OTHER ONE THROUGH: an omitted
    // `arguments` is the SAME CALL as `{}` and a member the caller did not supply is never invented
    // — which is what lets the adapter refuse a malformed call BY NAME instead of the schema
    // stripping it before the adapter sees it (`interface.md` §1). EACH HANDLER SITS INSIDE THE SAME
    // `guarded` WRAPPER as every other tool, so while the exclusion tier is open the call answers
    // the invocation-turn refusal VALUE before the adapter is entered and no profile byte moves
    // (`behaviour.md` §8; `interface.md` §4). NO SURFACE SUPPLIED MEANS NO `data` TOOL REGISTERED,
    // even with the group enabled (D-11).
    const dataTools: Array<{
      name: string
      title: string
      description: string
      members: Record<string, z.ZodTypeAny>
      run: (surface: DataSurface, args: unknown) => unknown
    }> = [
      {
        name: 'provident.data.read',
        title: 'Read the profile data register',
        description:
          'Read one address of the app\'s data profile. A literal standing at the address answers kind:"row"; a container answers kind:"branch"; an address holding nothing answers status:"absent". The answer\'s value is the node read, and EVERY node inside it names its own _tier — "file", "mem" or "temp", one token and never a set — minted at the node and never echoed once for the call, so one call can answer nodes at DIFFERENT tiers: a literal is {_tier, value}, an array is {_tier, value:[…]}, and a container carries its members inline beside _tier with no value wrapper. A readout is what the store answered at that node, never an echo of the tier the call asked for, and the status:"absent" arm answers no node and carries no _tier. The addresses are the register\'s own key space: an array of string keys and non-negative indices, and [] names the whole register. An omitted tier reads across the tiers — the lowest persistence present — and a named one narrows the read to that tier alone, where nothing standing there answers "absent".',
        members: {
          path: z.unknown().optional().describe('The address to read: a dense array of string keys and non-negative indices; [] reads the whole register'),
          tier: z.unknown().optional().describe('The tier to read AT: "file", "mem" or "temp"; omit it to read across every tier'),
        },
        run: (surface, args) => surface.read(args),
      },
      {
        name: 'provident.data.write',
        title: 'Write one row into the profile data register',
        description:
          'Write exactly ONE path/value pair at ONE tier and answer status:"committed" with the change\'s cursor, a `repaired` verdict and the commit\'s `log`. An omitted tier is "file", the durable one; "mem" is this process\'s register and persists nowhere, and "temp" is the transient tier. A nested write does not create its parent, and a container of another kind standing at the address is refused rather than converted. A root a crossing declares is written only at its family\'s own tier and is refused reason:"declared-tier" otherwise. THE PASS THAT JUDGED THE WRITE IS REPORTED, NEVER IMPLIED: `log` is the entries the commit appended — each { kind, id, opId, message, state } — and `repaired:true` means a declared constraint refused this value and a repair wrote the one that now stands, so a value the caller sent may not be the value that landed. A clean write answers entries too and no "repair-run" entry among them. A refused call answers status:"refused" with its reason word and leaves the previous bytes exactly as they stood.',
        members: {
          path: z.unknown().optional().describe('The address to write: a dense array of string keys and non-negative indices; [] is never writable'),
          value: z.unknown().optional().describe('The value to store: the admitted JSON tree (strings, finite numbers, booleans, dense arrays, plain objects)'),
          tier: z.unknown().optional().describe('The tier to write AT: "file" (durable, the default), "mem" (this process only) or "temp" (transient)'),
        },
        run: (surface, args) => surface.write(args),
      },
      {
        name: 'provident.data.delete',
        title: 'Delete one row from the profile data register',
        description:
          'Delete ONE row at the address and answer status:"committed" with removed, the tiers the row stood at, the change\'s cursor, a `repaired` verdict and the commit\'s `log`. An omitted tier is "file", the durable one. An address where no row stands AT THAT TIER answers removed:false, tiers:[] and cursor:null — nothing beneath the address is touched, and no refusal is served for an absence. A delete runs a constraint pass of its own kind, so `repaired:true` beside removed:false says a declared pair re-created something inside this delete; an answer built without reaching the store carries an empty `log` and repaired:false. A root a crossing declares is deleted only at its family\'s own tier and is refused reason:"declared-tier" otherwise.',
        members: {
          path: z.unknown().optional().describe('The address of the row to delete: a dense array of string keys and non-negative indices; [] is never writable'),
          tier: z.unknown().optional().describe('The tier to delete AT: "file" (the default), "mem" or "temp"'),
        },
        run: (surface, args) => surface.delete(args),
      },
      {
        name: 'provident.data.list',
        title: 'List the row paths of the profile data register',
        description:
          'List the addresses that hold a row, sorted by their JSON text, with count. An omitted prefix lists the whole profile; a supplied one narrows to the row paths beneath it. A branch is never reported as a row.',
        members: { prefix: z.unknown().optional().describe('The address to list beneath: a dense array of string keys and non-negative indices; omit it for the whole profile') },
        run: (surface, args) => surface.list(args),
      },
      {
        name: 'provident.data.journal',
        title: 'Read the change window of the profile data register',
        description:
          'Read this process\'s committed change window, oldest first, each entry { cursor, kind, path, changedTo } — no value is carried. from echoes the cursor asked for; floor and through bound the window, and a cursor outside it answers reason:"cursor-unknown" carrying both so a caller re-anchors. Nothing on this surface reverses a change.',
        members: { cursor: z.unknown().optional().describe('The cursor to read after: a non-negative integer; omit it for the whole retained window') },
        run: (surface, args) => surface.journal(args),
      },
    ]
    const surface = dataSurface
    if (surface !== null) {
      for (const { name, title, description, members, run } of dataTools) {
        if (!allowed.includes(name)) continue
        registered.set(name, server.registerTool(name, {
          title,
          description,
          inputSchema: z.preprocess(
            (carried) => (carried ?? {}),
            z.object(members).passthrough(),
          ),
        }, guarded(async (args: unknown) => text(run(surface, args)))))
      }
    }
  }

  /** R1-R3 (mcp-resources-review.md) — register the gated `read`-group
   *  resources. Fixed URIs (`app`, `targets`) + one template
   *  (`node/{nodeId}`). Each read callback forwards over the SAME `backend`
   *  invoke seam the tools use (main → renderer → app Runtime — never the
   *  isolated SecurePanels graph, R4). */
  private static registerResources(
    server: McpServer,
    backend: McpBackend,
    defs: Array<ResourceDef>,
    resources: Map<string, RegisteredResource | RegisteredResourceTemplate>,
    liveGate: () => SecurityGate,
  ): void {
    for (const def of defs) {
      // R2 — each resource registration below is keyed on the SAME group gate the
      // tools use, so a resource is registered ONLY when its group is allowed.
      const allowed = ["resource:mcp://provident/app", "resource:mcp://provident/targets", "resource:mcp://provident/node/{nodeId}"]
      if (def.uriTemplate) {
        const template = def.uriTemplate
        const key = template
        if (allowed.includes("resource:mcp://provident/node/{nodeId}")) resources.set(key, server.resource(
          def.name,
          new ResourceTemplate(template, { list: undefined }),
          {
            title: `provident.${def.name}`,
            description: def.description,
            mimeType: def.mimeType,
          },
          async (uri, variables) => {
            // `§2.2` item 2(a) — a RESOURCE READ runs the SAME predicate at the SAME turn: the
            // resource surface is inside `D-SCOPE`, so it is refused before any dispatch too.
            const refused = exclusionTurn(liveGate)
            if (refused !== null) return { contents: [{ uri: uri.href, text: refused.content[0].text, mimeType: def.mimeType }] }
            const nodeId = decodeURIComponent(String(variables?.nodeId ?? ''))
            const value = await backend.invoke('nodeState', nodeId)
            return { contents: [{ uri: uri.href, text: JSON.stringify(value, null, 2), mimeType: def.mimeType }] }
          },
        ) as RegisteredResourceTemplate)
      } else {
        const uri = def.uri!
        if (allowed.includes("resource:mcp://provident/app") || allowed.includes("resource:mcp://provident/targets")) resources.set(uri, server.registerResource(
          def.name,
          uri,
          { title: `provident.${def.name}`, description: def.description, mimeType: def.mimeType },
          async (u) => {
            const refused = exclusionTurn(liveGate)
            if (refused !== null) return { contents: [{ uri: u.href, text: refused.content[0].text, mimeType: def.mimeType }] }
            const value = await backend.invoke(def.method, {})
            return { contents: [{ uri: u.href, text: JSON.stringify(value, null, 2), mimeType: def.mimeType }] }
          },
        ) as RegisteredResource)
      }
    }
  }

  /** **THE ENABLE IS IDEMPOTENT — ONE SERVER, ONE BIND** (`D-228`'s residual (i), which was a real defect wearing a flake's
   *  clothes: a manual http boot called this method TWICE on one instance and the second call answered `EADDRINUSE`).
   *
   *  **THE COMPOSITION'S TWO ENABLE SITES, AND WHAT EACH ONE INTENDS.** `main.ts`'s `settingsSurface.attach(mcp)` is the
   *  composition's gate edge: the surface subscribes FIRST and then hands the record over, and its first `subscribe` drains the
   *  creation's held addresses (the operator record's store holds four) — the pair's delivery reaches
   *  `onExclusionChanged` → `followExclusion('mcp-enabled')`, which is where **the port is made a CONSEQUENCE of the record**
   *  (`D-123`). That delivery is the ONE route every exclusion change reaches — an operator transition, the invariant's repair
   *  inside a pane write, and this boot's own attach — so it is where the socket must follow, and it does its own bind. The
   *  boot's `await mcp.start()` (`D-19` step 4, the enable LAST, after the window and the renderer load) intends the SAME
   *  socket, from the other direction: it is the composition's act, it knows nothing of the record, and on `stdio` it is the
   *  ONLY enable there is (`followExclusion` refuses to touch that transport, measured fatal — `D-122`). So the two are not a
   *  duplicate call to be deleted: each is the enable of its own transport, and the collision is that on `http` both land.
   *
   *  **THE GUARD LIVES HERE, IN THE SERVER, AND NOT IN THE COMPOSITION, FOR THREE REASONS SAID AS MEASUREMENTS.** (a) The fact
   *  being judged — is a socket already bound — is this instance's own (`started`/`starting`, below), and `followExclusion`
   *  already keeps that kind of record for itself; a composition-side fix would have to read it through a new predicate here,
   *  which is the same bit with a second spelling. (b) The composition-side fix cannot delete either call: `mcp.start()` at
   *  `main.ts` is asserted IN THE SOURCE TEXT by `tests/secure-exclusion.test.ts` and `tests/tier4-arbitrary-storage.test.ts`
   *  (the boot order `construction → boot read → gate → flip → mcp.start()`), and on `stdio` it is the only enable. (c) The
   *  double enable is the OBSERVABLE, not the defect: the same two sites are correct on `stdio` and correct on `http` as soon
   *  as the second enable of an already-enabled server is what it should be everywhere — a no-op.
   *
   *  **A SECOND CALL IS A NO-OP THAT RESOLVES, AND A THIRD BEHAVES LIKE THE SECOND**: an enable in flight is awaited (the same
   *  promise, below); an enable already landed returns without touching the socket. **NOTHING THAT ONLY A SECOND CALL WOULD DO
   *  IS SKIPPED**, checked arm by arm: on `http` a second `start()` created a FRESH `createServer` and discarded the live one
   *  (a leaked socket) and printed a second `http transport ready` line — a duplicate claim and not a second act; on `stdio` it
   *  built a second `McpServer` and a second `StdioServerTransport` over the same stdin (two readers of one pipe); tool
   *  registration is per-POST on `http` and lives inside `createServer` on `stdio`, so no second call registers anything; and the
   *  follow's settle is `followExclusion`'s own promise, returned to its caller, not this method's to re-run. **AND A GENUINE
   *  FAILURE STILL REJECTS**: `started` is written only by a bind that succeeded and cleared by `close()`, while `starting` is
   *  cleared in `finally` whether it resolved or rejected — so a start after a failed bind attempts the bind again and rejects
   *  again with the socket's own text (`listen EADDRINUSE: address already in use …`), which the `'error'` listener above is
   *  load-bearing for. A bind failure is therefore never turned into a resolved no-op by this guard. */
  async start(): Promise<void> {
    if (this.starting !== null) return this.starting
    if (this.started) return
    this.starting = this.bind()
    try {
      await this.starting
    } finally {
      this.starting = null
    }
  }

  /** The one bind: `start()`'s body, reached only by an enable that is neither in flight nor already landed. */
  private async bind(): Promise<void> {
    if (this.transport === 'stdio') {
      const server = this.createServer()
      this.server = server
      this.stdioServer = server
      const transport = new StdioServerTransport()
      await server.connect(transport)
      this.started = true
      console.error('[provident-mcp] stdio transport ready')
      return
    }
    // http — Streamable HTTP on 127.0.0.1:<port>/mcp. STATELESS: the SDK
    // requires a FRESH server + transport per request (reusing either across
    // requests throws — message ID collisions). Each POST builds its own
    // McpServer + transport, connects, and handles; GET/DELETE → 405 (the
    // SDK's canonical stateless example — responses flow through each POST).
    this.httpServer = createServer((req, res) => {
      // **THE REQUEST PATH'S LAST NET** (`D-227` residual (i)): `handleHttp` now holds its whole body in one
      // `try`, so this handler has nothing left to catch — and a `void`ed promise is still the site where an
      // escape would vanish, so it names one if one ever appears instead of leaving an unhandled rejection as
      // the child's only trace. It never fires on the success path, and it never answers: the response's own
      // path is `handleHttp`'s.
      void this.handleHttp(req, res).catch((caught: unknown) => {
        const message = caught instanceof Error ? `${caught.message}\n${caught.stack ?? ''}` : String(caught)
        console.error(`[provident-mcp] http request ${req.method ?? '?'} ${req.url ?? '?'} escaped its own try: ${message}`)
      })
    })
    // **A BIND FAILURE REJECTS `start()`, SO IT IS ANSWERED WHERE A START THAT FAILED IS ANSWERED** (`D-227`
    // residual (i)'s second half): `listen()` with no `'error'` listener does not fail — it raises an UNCAUGHT
    // exception inside the callback Node's emitter calls, and this `await` never settles, so a foreign process on
    // the port parks the caller for the whole bound instead of telling it the port is taken. The listener is
    // attached BEFORE the call (a bind error is emitted asynchronously, and `once` removes it either way) and it
    // rejects with the error's OWN text, never a re-worded one, so the boot path's fatal line carries `EADDRINUSE`
    // rather than a summary: `start()` resolves on a bound socket and rejects on a taken one, and nothing else moves.
    await new Promise<void>((resolve, reject) => {
      const pending = this.httpServer!
      const onBindFailure = (error: Error): void => reject(error)
      pending.once('error', onBindFailure)
      pending.listen(this.port, '127.0.0.1', () => {
        pending.off('error', onBindFailure)
        resolve()
      })
    })
    this.listening = true
    this.started = true
    console.error(`[provident-mcp] http transport ready on http://127.0.0.1:${this.port}/mcp`)
  }

  /** **THE PORT FOLLOWS THE EXCLUSION — A LISTENER'S CONSEQUENCE AND NEVER A CONSTRAINT'S ACT** (`D-123`; `D-82` clause 2:
   *  *"listeners carry data back to renderer or other consumers on change"*). The MCP server IS that consumer: the secure
   *  crossing's exclusion delivery reaches the surface's own delivery body, and the composition hands the state it landed as
   *  to this member. **WHAT IT DOES AND WHAT IT REFUSES TO DO:**
   *
   *   · ON `http` IT RECONCILES THE LISTENER TO THE STATE — `close()` on a pair that stands closed, `start()` on one that
   *     stands enabled — and it is IDEMPOTENT, because the bit it compares against is `start()`'s and `close()`'s own
   *     record. The pair is measured RE-ENTRANT (`D-122`): `close()` stops accepting and drains, `start()` re-listens on
   *     the SAME port.
   *   · ON `stdio` IT DOES NOTHING AT ALL, AND THAT IS THE MEASURED BOUND RATHER THAN AN OMISSION: closing that transport
   *     is FATAL — the client's next `ping` never returns — and the corpus already refuses it for the exclusion
   *     (*"closing it would destroy the operator's ability to re-enable"*). So on stdio the exclusion alone is the wall,
   *     and the refusal is answered at the invocation turn as it always was.
   *   · IT NEVER THROWS INTO THE DELIVERY, and it never reports success it did not have: a `start()` that cannot bind (a
   *     foreign process on the port, a `TIME_WAIT` collision) is logged as a VALUE and retried on the next delivery, while
   *     the exclusion still stands closed — which is the right direction for the ruling and the wrong one for usability,
   *     said rather than mitigated (`D-122`).
   *
   *  **IT IS NOT A CONSTRAINT'S REPAIR AND IT COULD NOT BE ONE**: a repair writes a VALUE and returns the op it landed —
   *  it cannot reach a socket — so the invariant is the record's and the socket is this listener's, which is the whole
   *  split this member exists to state. */
  followExclusion(state: 'mcp-enabled' | 'mcp-disabled'): Promise<void> {
    if (this.transport !== 'http') return Promise.resolve()
    const wanted = state === 'mcp-enabled'
    if (wanted === this.listening) return this.settling
    this.listening = wanted
    this.settling = this.settling.then(async () => {
      try {
        if (wanted) await this.start()
        else await this.close()
      } catch (caught) {
        // A FAILED FOLLOW IS A RECORDED VALUE AND NOT A THROW: the exclusion is the invariant and it still stands.
        const message = caught instanceof Error ? caught.message : String(caught)
        console.error(`[provident-mcp] the port could NOT follow the exclusion to '${state}': ${message}`)
      }
    })
    // THE QUEUED SETTLE IS ANSWERED, so a caller (and a row) can await the socket rather than poll for it: the boot's own
    // compose ignores it, and the direction is already recorded in the bit above before any await begins.
    return this.settling
  }

  /** **THE WHOLE REQUEST PATH IS INSIDE ONE `try`, AND THAT IS THE DIFFERENCE BETWEEN A NAMED 500 AND A SILENT
   *  HANG** (`D-227` residual (i): `http transport ready` → `http POST /mcp` → no answer in `60 011 ms`, the child
   *  alive, no stderr line).
   *
   *  WHAT WAS WRONG WITH THE OLD SHAPE, SAID IN ITS OWN TERMS: `this.createServer()` and the
   *  `StreamableHTTPServerTransport` construction stood OUTSIDE the `try` — so a throw from either was an
   *  UNHANDLED REJECTION inside `start()`'s `void this.handleHttp(req, res)`: the request was never answered,
   *  nothing was logged, and the child lived on. That signature is indistinguishable from a hang for the whole
   *  bound, and it would be indistinguishable forever. The two constructions — and the `new URL(req.url, host)`
   *  head, and the gate reads, and the four early-return writes above them, which are also request-path code
   *  outside any `try` — are now INSIDE the one `try`, so ANY throw on this path becomes a logged `500`.
   *
   *  WHAT A FAILURE NOW ANSWERS, AND WHAT IT LOGS: the `catch` answers status `500` with the body `internal
   *  error` (committed-response cases excepted, as before), and it logs `[provident-mcp] http error: <text>`
   *  where `<text>` is the thrown error's OWN message followed by its own stack — never a re-worded summary, so
   *  the throw site names itself in the child's stderr instead of nothing doing so.
   *
   *  THE SUCCESS PATH IS UNCHANGED, BYTE FOR BYTE: the same four refusals in the same order, one fresh
   *  `McpServer` and one fresh transport per POST (stateless — the SDK throws on a reused pair), `readBody`, then
   *  `connect` then `handleRequest`, and the same `res.on('close')` teardown, which is registered ONLY when a
   *  server was built, exactly as the old `finally` reached only after its construction had succeeded.
   *
   *  **AND THE ONE UNBOUNDED AWAIT ON THIS PATH IS BOUNDED NOW, WHICH IS WHAT THE IDLE-IN-`poll` READING ASKED
   *  FOR** (`D-227` residual (i), sampled while hung: `utime+stime` advanced `1` tick over `201 ms` — ~`5 %` of one
   *  core — in `S` with `wchan` = `poll_schedule_timeout`, and NO `http error:` line after the whole path was put
   *  inside a `try`, so nothing threw). An idle child that logged the POST and never answered is waiting on an
   *  event that never arrives, and the only await on this path that could wait forever was `readBody(req)` — it
   *  awaited `req`'s own `end` with no timer, so a body that never completes parked this handler inside the `try`
   *  for the whole bound and, being idle rather than spinning, was indistinguishable from a healthy child to every
   *  reading but `/proc`. `readBody` now carries `BODY_BOUND_MS` (below), and a body that does not complete inside
   *  it is ANSWERED rather than awaited: status `408` with a JSON-RPC error body naming the failure
   *  (`request body did not complete within <bound> ms`, code `-32004`), and one stderr line carrying the request's
   *  METHOD and URL, so the child names the request it gave up on instead of leaving nothing behind. A body that
   *  completes inside the bound takes the SAME path it always took, byte for byte: same chunk concat, same empty →
   *  `undefined`, same `JSON.parse` and same `invalid JSON body` on a parse failure. */
  private async handleHttp(req: IncomingMessage, res: ServerResponse): Promise<void> {
    let server: McpServer | undefined
    let transport: StreamableHTTPServerTransport | undefined
    try {
      const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
      console.error(`[provident-mcp] http ${req.method} ${url.pathname}`)
      if (url.pathname !== '/mcp') {
        res.writeHead(404)
        res.end('not found')
        return
      }
      if (req.method === 'GET' || req.method === 'DELETE') {
        res.writeHead(405, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed.' }, id: null }))
        return
      }
      if (req.method !== 'POST') {
        res.writeHead(405)
        res.end('method not allowed')
        return
      }
      // A1-W5 — the HTTP token gate: reject BEFORE any tool runs (fail-closed).
      if (!this._gate.checkRequest(req.headers as never).ok) {
        res.writeHead(401, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32001, message: 'Unauthorized' }, id: null }))
        return
      }
      // `§2.3` item 2 — THE EXCLUSION ARM, placed WHERE THE LANDED TOKEN GATE IS and ORDERED after
      // it: the authorization gate runs FIRST, the exclusion arm SECOND (reversing the order would
      // let an unauthenticated caller distinguish the two states without a token — the `G-8`
      // oracle). THE STATE IS READ AT POST ARRIVAL — before the body is read and before any per-POST
      // server is built — so no tool can run on this transport while the tier is open.
      if (this._gate.exclusionState() === 'mcp-disabled') {
        res.writeHead(503, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32003, message: EXCLUSION_CLOSED }, id: null }))
        return
      }
      // THE TWO CONSTRUCTIONS `D-227` residual (i) NAMED — INSIDE THE `try`, so a throw here is a 500 with its
      // own message rather than an unhandled rejection with no line and no answer.
      const built = this.createServer()
      server = built
      this.httpServers.add(built)
      transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })
      const body = await readBody(req)
      await built.connect(transport)
      await transport.handleRequest(req, res, body)
    } catch (e) {
      // **THE BODY'S OWN BOUND, ANSWERED AS A REFUSAL AND NOT AS AN `internal error`** (`D-227` residual (i)):
      // this is the ONE failure on this path that is a property of the REQUEST rather than of the app, so it gets
      // its own status (`408`) and its own words, and the stderr line names the METHOD and the URL of the request
      // the child gave up on — the two things no line in the hung run carried. It is answered BEFORE the generic
      // arm below, which stays exactly as it was for every other throw.
      if (e instanceof RequestBodyBoundExceeded) {
        console.error(`[provident-mcp] http body bound: ${req.method ?? '?'} ${req.url ?? '?'} — ${e.message} (answered 408)`)
        try {
          res.writeHead(408, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32004, message: e.message }, id: null }))
        } catch {
          // response may already be committed
        }
        return
      }
      const msg = e instanceof Error ? `${e.message}\n${e.stack ?? ''}` : String(e)
      console.error(`[provident-mcp] http error: ${msg}`)
      try {
        res.writeHead(500)
        res.end('internal error')
      } catch {
        // response may already be committed
      }
    } finally {
      const built = server
      const opened = transport
      // A PATH THAT BUILT NOTHING HAS NOTHING TO RELEASE — and registering the listener there would be a
      // behaviour the old shape did not have on its four refusal branches, which returned before the `try`.
      if (built !== undefined) {
        res.on('close', () => {
          this.httpServers.delete(built)
          void built.close().catch(() => undefined)
          if (opened !== undefined) void opened.close().catch(() => undefined)
        })
      }
    }
  }

  async close(): Promise<void> {
    await Promise.allSettled([...this.httpServers].map((s) => s.close()))
    this.httpServers.clear()
    if (this.server) {
      try {
        await this.server.close()
      } catch {
        // already closed
      }
    }
    if (this.httpServer) {
      await new Promise<void>((resolve) => this.httpServer!.close(() => resolve()))
      this.httpServer = null
    }
    this.listening = false
    // **THE ENABLE'S OWN BIT IS CLEARED WITH THE SOCKET** (`D-228` residual (i)): a close is the withdraw to `started`'s record
    // exactly as it is to `listening`'s, so the re-open edge of `followExclusion` (`D-122`'s re-entrant `start()`) still binds —
    // the guard is against a SECOND ENABLE OF A BOUND SERVER, never against a re-enable of a closed one.
    this.started = false
  }
}

/** **THE REQUEST-BODY BOUND — A REQUEST'S OWN FIGURE, AND NOT THE BOOT BATTERY'S ROW BOUND** (`D-227` residual
 *  (i); the idle-in-`poll` reading is quoted at `handleHttp`).
 *
 *  WHY THIS NUMBER. A POST body on this transport is one JSON-RPC message against a LOOPBACK socket that this
 *  server itself bound on `127.0.0.1`: the client and the server are on one host, the whole body is normally one
 *  or two packets, and the surface's largest request is a `dispatch` with a target — hundreds of bytes, not
 *  megabytes. `5 000 ms` is therefore some four orders of magnitude over a loopback body's p95, and it is
 *  deliberately NOT `60 000 ms`: that figure is `tests/e2e/bundle-boot-seam/`'s whole-ROW bound, and a body bound
 *  equal to the instrument's own bound would let the row die before the child gave its refusal — the refusal has
 *  to arrive first for the `/proc` reading to have a stderr line behind it. It must also stay comfortably under
 *  every row bound in the tree (`B-6`'s `60 000 ms`, `AL-*`'s `240 000 ms`), which `5 000 ms` does by more than
 *  ten times.
 *
 *  WHAT IT COSTS A SLOW BUT WELL-FORMED CLIENT, SAID PLAINLY: a client that needs more than five seconds to
 *  deliver a body it would have delivered completely is now REFUSED — status `408` with a JSON-RPC error body
 *  naming the failure — where before it was simply waited on. That is the whole of the trade, and it is the trade
 *  the casualty asks for: an unanswered request is bounded forever, while a refusal is a reading. A body that
 *  completes inside the bound is unaffected in any byte (see `readBody`'s own note). */
const BODY_BOUND_MS = 5_000

/** The one failure `readBody` raises on ITS OWN timer, and it is a class rather than a bare `Error` so the request
 *  path can tell "the client never finished its body" apart from a socket error and from `invalid JSON body` —
 *  the first is answered as this server's `408`, the other two keep the `500` they have always had. */
class RequestBodyBoundExceeded extends Error {
  constructor(boundMs: number) {
    super(`request body did not complete within ${boundMs} ms`)
    this.name = 'RequestBodyBoundExceeded'
  }
}

/** **`readBody` WITH A BOUND, AND NOTHING ELSE CHANGED** (`D-227` residual (i)): the same `chunks` accumulation,
 *  the same `Buffer.concat(...).toString('utf8')`, the same empty → `undefined` and the same `JSON.parse` with
 *  `invalid JSON body` on failure — so a body that completes in time is byte-identical to the path it replaced.
 *  The one addition is `BODY_BOUND_MS`: when it is spent the promise REJECTS with `RequestBodyBoundExceeded`, the
 *  timer is cleared, and a late `end`/`error` is ignored (`settled`), because a promise that has answered must not
 *  be settled twice. Listeners are never removed — a `done` guard is enough, and `IncomingMessage`'s peers in the
 *  private-drive tests carry no `off`/`removeListener` worth relying on. */
function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let settled = false
    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      reject(new RequestBodyBoundExceeded(BODY_BOUND_MS))
    }, BODY_BOUND_MS)
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) return resolve(undefined)
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('invalid JSON body'))
      }
    })
    req.on('error', (error: Error) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      reject(error)
    })
  })
}

/** The main process's bridge: forwards MCP tool invocations to the renderer
 *  over IPC and returns the awaited reply. Requests are queued until the
 *  renderer signals readiness.
 *
 *  A2/A6 hardening (docs/specs/renderer-backend-hardening.md): a readiness
 *  timeout (never hang forever waiting for the renderer), a per-request
 *  timeout (never hang forever waiting for a reply), a reload/destroy re-arm
 *  (a `did-finish-load`/`closed`/`destroyed` rejects all in-flight `pending` +
 *  re-arms the readiness gate), and a bounded/digest large-payload guard (a
 *  `renderedHtml`/`ssrHtml` over `largePayloadBytes` is returned as a census +
 *  hash64 digest + truncated preview, NOT the full fragment). */
export interface RendererBackendOptions {
  readyTimeoutMs?: number
  invokeTimeoutMs?: number
  largePayloadBytes?: number
}

/** A minimal webContents/window event-target shape (so the backend is testable
 *  without a real Electron import — the fake in the tests implements it). */
interface WebContentsLike {
  on(event: string, cb: (...args: unknown[]) => void): void
  send(channel: string, msg: unknown): void
  isDestroyed(): boolean
}
interface WindowLike {
  on(event: string, cb: (...args: unknown[]) => void): void
  webContents: WebContentsLike
  isDestroyed(): boolean
}

export class RendererBackend implements McpBackend {
  private readyTimeoutMs: number
  private invokeTimeoutMs: number
  private largePayloadBytes: number
  private resolveReady: (() => void) | null = null
  private rejectReady: ((e: Error) => void) | null = null
  private readyPromise: Promise<void>
  private ready = false
  /** F1 — the INITIAL load's `did-finish-load` is not a reload; only after the
   *  first arm does a subsequent `did-finish-load` count as a reload. */
  private firstLoadSeen = false
  private seq = 0
  private readonly pending = new Map<number, {
    resolve: (v: unknown) => void
    reject: (e: Error) => void
    timer: ReturnType<typeof setTimeout>
    /** `§2.2` item 3 / `PAR-5` — THE ACCEPTED-WORK EPOCH STAMPED ON THIS ENTRY at acceptance
     *  (the DECLARED CARRIER). It is read from the LIVE gate at acceptance, never from a caller
     *  (`PAR-5`'s OUTSIDE column): there is no epoch-accepting parameter anywhere on this surface. */
    epoch: number
  }>()
  private window: WindowLike | null = null
  /** `§2.2` item 3 — THE ACCEPTOR'S EPOCH SOURCE, bound by the server to its LIVE gate (see
   *  `ProvidentMcpServer`'s constructor). `null` when no server wired one (a standalone backend
   *  in a unit drive): the stamp is then the constant `0` and the reply turn can never see a
   *  stale entry, which is exactly the landed behaviour of an unwired backend. */
  private exclusionEpochSource: (() => number) | null = null

  constructor(opts: RendererBackendOptions = {}) {
    this.readyTimeoutMs = opts.readyTimeoutMs ?? 30000
    this.invokeTimeoutMs = opts.invokeTimeoutMs ?? 60000
    this.largePayloadBytes = opts.largePayloadBytes ?? 1_000_000
    this.readyPromise = this.newReadyPromise()
  }

  private newReadyPromise(): Promise<void> {
    const p = new Promise<void>((resolve, reject) => {
      this.resolveReady = resolve
      this.rejectReady = reject
    })
    // A2-harden: the gate's rejection must never be UNHANDLED when no `invoke`
    // is awaiting it (e.g. a reset with no in-flight readiness await). Mark it
    // handled so the engine does not emit an unhandledRejection; `invoke`'s
    // `Promise.race` still observes the original rejection.
    p.catch(() => undefined)
    return p
  }

  attachWindow(win: WindowLike): void {
    this.window = win
    // A2 — a reload (did-finish-load) or a close/destroy re-arms the backend:
    // reject all in-flight pending + reset the readiness gate. F1: the FIRST
    // did-finish-load is the initial load, not a reload — skip it. F6: ignore
    // resets from a window that is no longer the attached one (a re-attach
    // replaces the window; the old window's lingering close must not reset).
    const rearm = (reason: string) => {
      if (win !== this.window) return
      if (reason === 'renderer reloaded (pending cleared)' && !this.firstLoadSeen) {
        this.firstLoadSeen = true
        return
      }
      this.handleReset(reason)
    }
    win.webContents.on('did-finish-load', () => rearm('renderer reloaded (pending cleared)'))
    win.on('closed', () => rearm('renderer window destroyed'))
    win.on('destroyed', () => rearm('renderer window destroyed'))
  }

  /** A2/A6 test seam — whether the renderer has signaled readiness. */
  isReady(): boolean {
    return this.ready
  }

  /** A2/A6 test seam — the number of in-flight requests. */
  pendingCount(): number {
    return this.pending.size
  }

  markReady(): void {
    if (this.ready) return
    this.ready = true
    this.resolveReady?.()
  }

  /** Reject all in-flight pending + reset the readiness gate (a fresh
   *  `readyPromise` so the next `markReady` re-arms). Used on reload/destroy.
   *  F2/F7 — the OLD `readyPromise` is REJECTED so a caller awaiting it is
   *  released (not stranded on a stale closure). */
  private handleReset(reason: string): void {
    for (const [, entry] of this.pending) {
      clearTimeout(entry.timer)
      entry.reject(new Error(reason))
    }
    this.pending.clear()
    this.ready = false
    // release any awaiter on the current gate with the reset reason
    this.rejectReady?.(new Error(reason))
    this.readyPromise = this.newReadyPromise()
  }

  /** `§2.2` item 3 / `PAR-5` — bind the ACCEPTOR's epoch source. It takes a READER (not a value
   *  and not a caller-supplied epoch) so the stamp is always the LIVE gate's counter at the moment
   *  the work is accepted, and so the binding survives the transition's gate REPLACEMENT. */
  setExclusionEpochSource(read: () => number): void {
    this.exclusionEpochSource = read
  }

  /** `§2.2` item 3 — the epoch CURRENT at this turn, read from the source the server bound to its
   *  live gate. Never throws and never `undefined`: an unwired backend answers `0`. */
  private currentExclusionEpoch(): number {
    const read = this.exclusionEpochSource
    if (read === null) return 0
    try {
      const value = read()
      return typeof value === 'number' ? value : 0
    } catch {
      return 0
    }
  }

  /** `§2.2` item 4 / `PAR-6` — THE IN-FLIGHT INVALIDATION on an exclusion transition. For every
   *  entry in `pending` it mirrors the landed `handleReset` loop EXACTLY (`clearTimeout`,
   *  `reject(new Error(reason))`, then `pending.clear()`), returning the NUMBER of entries it
   *  rejected (`0` when none) so the arithmetic is OBSERVED rather than inferred.
   *
   *  IT IS NOT `handleReset` AND IT MUST NOT BE (`§2.2` item 6 / `§0A` item 6): `handleReset` also
   *  flips `this.ready = false`, rejects the readiness promise and mints a fresh `readyPromise` —
   *  re-arming the readiness gate is precisely what the re-arm rule forbids ("the renderer may not
   *  re-arm what the operator disabled"). This method touches `pending` and NOTHING ELSE. It never
   *  throws: a hostile `reason` can only change the rejection MESSAGE, never the outcome. */
  abandonPendingForExclusion(reason: string): number {
    let rejected = 0
    for (const [, entry] of this.pending) {
      clearTimeout(entry.timer)
      entry.reject(new Error(reason))
      rejected += 1
    }
    this.pending.clear()
    return rejected
  }

  async invoke(method: string, payload: unknown): Promise<unknown> {
    // A6 — readiness gate with a timeout (never hang forever before ready).
    let readyTimer: ReturnType<typeof setTimeout> | undefined
    if (!this.ready) {
      try {
        await Promise.race([
          this.readyPromise,
          new Promise<never>((_resolve, reject) => {
            readyTimer = setTimeout(() => reject(new Error(`renderer not ready (timeout ${this.readyTimeoutMs}ms)`)), this.readyTimeoutMs)
          }),
        ])
      } finally {
        if (readyTimer) clearTimeout(readyTimer)
      }
    }
    const win = this.window
    if (!win || win.isDestroyed()) throw new Error('renderer window unavailable')
    const id = ++this.seq
    const req: RpcRequest = { id, method: method as never, payload }
    // A2 — per-request timeout (never hang forever waiting for a reply).
    const result = new Promise<unknown>((resolve, reject) => {
      const timer = setTimeout(
        () => {
          if (this.pending.delete(id)) reject(new Error(`renderer invoke timeout (${this.invokeTimeoutMs}ms)`))
        },
        this.invokeTimeoutMs,
      )
      // `§2.2` item 3 — THE ACCEPTANCE TURN STAMPS THE LIVE EPOCH on the entry the call will ride.
      this.pending.set(id, { resolve, reject, timer, epoch: this.currentExclusionEpoch() })
    })
    // F4 — a destroy between the check and the send throws on a destroyed
    // webContents; catch it + clean the pending entry + rethrow a spec-shaped
    // error (never a dangling entry / a bare 'Object has been destroyed').
    try {
      win.webContents.send('provident:invoke', req)
    } catch (e) {
      const entry = this.pending.get(id)
      if (entry) {
        clearTimeout(entry.timer)
        this.pending.delete(id)
      }
      throw new Error('renderer window destroyed')
    }
    return result
  }

  /** **`§2.2` item 3 (the REPLY TURN) / `PAR-5` — THE STALE-EPOCH ARM**, the belt-and-braces the
   *  spec declares BESIDE `abandonPendingForExclusion` (which is the BULK invalidation).
   *
   *  A reply whose entry's stamped epoch is STALE — the gate's epoch moved between acceptance and
   *  this turn — is **NOT** resolved with the renderer's value: the call is settled with the
   *  DECLARED refusal token VERBATIM (`'exclusion-closed'`, `§2.2` item 5), the SAME token the
   *  in-flight abandonment carries, so the token is identical at all three depths and only the
   *  TRANSPORT of the refusal differs. The comparison is against the LIVE epoch read at THIS turn,
   *  never against a caller-supplied one (`PAR-5`'s OUTSIDE column forbids an epoch-accepting
   *  parameter: it would let a caller forge recency). An entry whose epoch still matches settles
   *  exactly as it always did. */
  handleReply(reply: RpcReply): void {
    const entry = this.pending.get(reply.id)
    if (!entry) return
    this.pending.delete(reply.id)
    clearTimeout(entry.timer)
    if (entry.epoch !== this.currentExclusionEpoch()) {
      entry.reject(new Error(EXCLUSION_CLOSED))
      return
    }
    if (reply.ok) entry.resolve(this.maybeDigest(reply.value))
    else entry.reject(new Error(reply.error ?? 'renderer error'))
  }

  /** A2 — replace an oversized `renderedHtml`/`ssrHtml` result with a census +
   *  hash64 digest + truncated preview (mirror the battery's census+hash64
   *  shape). The full payload is NOT serialized over IPC. */
  private maybeDigest(value: unknown): unknown {
    if (value === null || typeof value !== 'object') return value
    const v = value as { renderedHtml?: unknown; ssrHtml?: unknown; census?: unknown; content?: Array<{ type?: string; data?: string }> }
    const rh = typeof v.renderedHtml === 'string' ? v.renderedHtml : ''
    const sh = typeof v.ssrHtml === 'string' ? v.ssrHtml : ''
    const size = rh.length + sh.length
    // H2 (adversarial) — also bound a large IMAGE content block (base64 data)
    // so it does not cross the IPC boundary unbounded (M-r4).
    const content = v.content
    let imageSize = 0
    if (Array.isArray(content)) {
      for (const c of content) {
        if (c && typeof c.data === 'string') imageSize += c.data.length
      }
    }
    if (size + imageSize <= this.largePayloadBytes) return value
    if (imageSize > 0) {
      return {
        digest: hash64(content!.map((c) => (c && typeof c.data === 'string' ? c.data : '')).join('\u0000')),
        truncated: true,
      }
    }
    const preview = rh.slice(0, 512)
    return {
      census: v.census ?? null,
      digest: hash64(rh + '\u0000' + sh),
      preview,
      truncated: true,
    }
  }

  /** U5 (M-r4) — bound a large IMAGE payload (base64 data) so it does not cross
   *  the IPC boundary unbounded. A payload over `largePayloadBytes` is returned
   *  as a digest + truncated flag, never the raw base64. Exposed for tests. */
  maybeDigestForTest(value: unknown): unknown {
    if (value === null || typeof value !== 'object') return value
    const v = value as { content?: Array<{ type?: string; data?: string }> }
    const content = v.content
    if (!Array.isArray(content)) return value
    let total = 0
    for (const c of content) {
      if (c && typeof c.data === 'string') total += c.data.length
    }
    if (total <= this.largePayloadBytes) return value
    return {
      digest: hash64(content.map((c) => (c && typeof c.data === 'string' ? c.data : '')).join('\u0000')),
      truncated: true,
    }
  }
}

/** Deterministic FNV-1a 64-bit hash (the upstream hash64 — mirrors Runtime's). */
function hash64(str: string): string {
  let h = 0xcbf29ce484222325n
  for (let i = 0; i < str.length; i += 1) {
    h ^= BigInt(str.charCodeAt(i))
    h = (h * 0x100000001b3n) & 0xffffffffffffffffn
  }
  return h.toString(16).padStart(16, '0')
}