// src/main/mcp-server.ts — the MCP server (main process). Exposes the
// provident-ssr renderer's synthetic-event access + rendered-HTML visibility
// as MCP tools for agentic use and debugging exposure.
//
// Two transports (configurable via `--mcp-transport` / `PROVIDENT_MCP_TRANSPORT`):
//   - stdio: the process is spawned by an MCP client (agent/IDE).
//   - http:   a Streamable HTTP server on 127.0.0.1:<port>/mcp (the app runs,
//             the client connects).
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { RegisteredTool, RegisteredResource, RegisteredResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { z } from 'zod'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import type {
  RpcRequest,
  RpcReply,
  DispatchRequest,
  RenderedHtmlResult,
  ListTargetsResult,
  NodeStateResult,
} from '../shared/types.js'
import { SecurityGate, exclusionAllowsWork, type ToolGroup, moduleToolAllowed } from './security.js'
import type { ModuleStore } from './module-store.js'
import type { CapabilityRouter } from '../renderer/extensions.js'

const TOOL_PREFIX = 'provident.'

/** `docs/specs/secure-exclusion.md` `§2.5` item 1 — THE ONE CLOSED REFUSAL FORM. It is produced
 *  at three sites only (the MCP invocation turn, the HTTP POST at arrival, and the in-flight
 *  abandonment) and it is a CHANNEL token: `'exclusion-closed'` is NOT a member of the store's
 *  16-member refusal union (the `SecurityWriteReceipt` precedent — the union stays `16`). */
export const EXCLUSION_CLOSED = 'exclusion-closed'

/** `§2.2` item 5 — the tool-RESULT carrier of the refusal: a VALUE, never an MCP protocol error.
 *  ONE answer at all three depths, differing in TRANSPORT and never in token. */
function exclusionRefusal() {
  return { content: [{ type: 'text' as const, text: JSON.stringify({ status: 'refused', reason: EXCLUSION_CLOSED }) }] }
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

/** U9 (F1) — invoke a dynamic `module:<name>.<tool>` tool. Enforces the
 *  invocation two-gate: a module tool backed by an executable entry requires
 *  `module` AND `code` at EACH call (not just install). A module-only agent
 *  cannot run a module tool that is arbitrary code. Standalone so the static
 *  `registerTools` can route SDK calls through it. */
export function invokeModuleTool(router: CapabilityRouter, gate: SecurityGate, toolName: string, args: unknown): unknown {
  if (typeof toolName !== 'string' || !toolName.startsWith('module:')) {
    throw new Error(`invokeTool: not a module tool: ${String(toolName)}`)
  }
  // F1 — the invocation two-gate. A dynamic module tool is trusted-equivalent
  // to `code` (executable entry), so it needs module AND code.
  if (!moduleToolAllowed(toolName, gate.enabled, { executable: true })) {
    throw new Error(`invokeTool: ${toolName} requires module AND code groups (invocation two-gate)`)
  }
  return router.invokeTool(toolName, args)
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

/** U3 — handle a `module.*` tool in MAIN (the persisted node:fs store). The
 *  module tools are NOT routed to the renderer (the store is main-process).
 *  Exported for direct unit testing. */
export function handleModuleTool(store: ModuleStore | null, name: string, args: Record<string, unknown>): unknown {
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
  // capabilities so `syncModuleRouter` can register the module's tools.
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
    store.put({ name: nameArg, version: v, source, capabilities: parseCapabilities(source, args.capabilities) })
    return { status: 'installed', name: nameArg, version: v }
  }
  if (name === 'module.update') {
    if (nameArg === '' || source === '') throw new Error('module.update: name and source required')
    const v = version ?? '0.0.0'
    store.put({ name: nameArg, version: v, source, capabilities: parseCapabilities(source, args.capabilities) })
    return { status: 'updated', name: nameArg, version: v }
  }
  if (name === 'module.list') {
    return store.list().map((r) => ({ name: r.name, version: r.version, capabilities: r.capabilities ?? {}, disabled: r.disabled, quarantined: r.quarantined }))
  }
  throw new Error(`unknown module tool: ${name}`)
}

/** U9-FIX — re-sync the CapabilityRouter from the persisted module store. The
 *  store is the source of truth (persisted, fail-disabled/hash-verified); the
 *  router is the LIVE capability surface. Each installed, non-disabled,
 *  non-quarantined module's declared capabilities are registered into the router
 *  so its dynamic `module:<name>.<tool>` tools become callable. Disabled and
 *  quarantined modules are NOT registered (their tools are not callable). This
 *  closes the store→router→MCP dynamic-tool chain in production.
 *
 *  NOTE: the module's `entry` source (trusted-equivalent to `code`) is NOT
 *  evaluated here — the declared capability NAMES are registered with a
 *  pass-through handler that echoes the declared tool. Full entry execution is a
 *  documented follow-on (the eval of the source body); the registration +
 *  invocation two-gate + namespacing are all wired. */
export function syncModuleRouter(router: CapabilityRouter | null, store: ModuleStore): void {
  if (!router) return
  router.clear()
  const status = store.status()
  const active = new Set(status.loaded)
  for (const r of store.list()) {
    if (!active.has(r.name)) continue // disabled or quarantined → not live
    const caps = r.capabilities ?? {}
    const tools = caps.tools ?? []
    if (tools.length === 0) continue
    router.registerModule(r.name, (ctx) => {
      for (const fullTool of tools) {
        const bare = fullTool.startsWith(`module:${r.name}.`) ? fullTool.slice(`module:${r.name}.`.length) : fullTool
        ctx.tool(bare, (args) => ({ tool: fullTool, args }))
      }
    })
  }
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
 *  duplicate-registration throw. */
export function registeredToolNames(gate: SecurityGate, allNames: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const name of allNames) {
    // U3 — the module.* install/update tools carry an executable entry, so they
    // are trusted-equivalent to `code`: they register ONLY when BOTH `module`
    // AND `code` are enabled (the two-gate, U1). `module.list` needs `module`
    // only. This is the registration-level gate; the invocation-level
    // `moduleToolAllowed` predicate (U1) is the per-call enforcement.
    if (name === 'module.install' || name === 'module.update') {
      if (gate.toolAllowed(name) && gate.enabled.has('code')) {
        seen.add(name)
        out.push(name)
      }
      continue
    }
    if (gate.toolAllowed(name) && !seen.has(name)) {
      seen.add(name)
      out.push(name)
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
  /** U9 — the CapabilityRouter whose dynamic `module:<name>.<tool>` tools are
   *  registered + invoked (with the invocation two-gate, F1). */
  router?: CapabilityRouter
}

export interface SecuritySnapshot { token: string | null; enabled: ToolGroup[] }

export class ProvidentMcpServer {
  private server: McpServer | null = null
  private readonly backend: McpBackend
  private readonly transport: McpTransportKind
  private readonly port: number
  private readonly moduleStore: ModuleStore | null
  private readonly router: CapabilityRouter | null
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

  constructor(opts: McpServerOptions) {
    this.backend = opts.backend
    this.transport = opts.transport
    this.port = opts.port ?? 3787
    this._gate = opts.gate ?? new SecurityGate()
    this.moduleStore = opts.moduleStore ?? null
    this.router = opts.router ?? null
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
   *  cannot drift: (a) every captured tool/resource handle is TOGGLED to agree with the record
   *  (while the tier is open NOTHING is enabled; the handles stay RESOLVABLE throughout — they are
   *  toggled, never deregistered, the non-legibility pin), and (b) any NEWLY-ALLOWED tool/resource
   *  that is not registered yet is REGISTERED on the live stdio server.
   *
   *  (b) IS SUPPRESSED WHILE THE TIER IS OPEN (`exclusionOpen`) — the landed, spec-sanctioned shape:
   *  nothing is widened into a surface that refuses everything anyway. It is therefore required in
   *  BOTH directions: `T-2` (the operator's close request) MUST widen, because a group widen that
   *  arrived while the tier was open left its newly-allowed tools unregistered — without (b) here
   *  the MCP surface does not actually come back until the next settings write.
   *
   *  The HTTP transport needs no re-gate: it builds a fresh server per POST from the current gate.
   *
   *  **`toggleHandles` — THE EXCLUSION TRANSITION'S OPT-OUT (`GAP-3` ruling, `§2.1` item 3's
   *  supersession clause, `§2.2` item 2(b)/(c))**: the arm (a) loop is the OPERATOR GROUP change's
   *  mechanism and is UNTOUCHED on `applyGatePatch`'s path (its only caller with `toggleHandles`
   *  true, the default). The EXCLUSION transition passes `false`, because the ruling drops the
   *  toggling: with it ON a disabled handle is neither listed nor callable and the declared receipt
   *  is unreachable. A designer MAY still route the transition through this helper — it MUST NOT
   *  toggle. The arm (b) widen is retained in BOTH cases. */
  private regateLiveServer(opts: { toggleHandles: boolean } = { toggleHandles: true }): void {
    const exclusionOpen = this._gate.exclusionState() === 'mcp-disabled'
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
        tool.update({ enabled: !exclusionOpen && allowed })
      }
      // R2 — re-gate the captured resource handles the same way.
      for (const [uri, res] of this.resources) {
        res.update({ enabled: !exclusionOpen && this._gate.toolAllowed(`resource:${uri}`) })
      }
    }
    // M1-widen — REGISTER any newly-allowed tools that were not registered before (a widen to a
    // previously-disabled group must make those tools callable on the live server, not only on the
    // next fresh HTTP request). The live server is the stdio server (HTTP builds a fresh server per
    // POST from the current gate, so widening is automatic there).
    const liveServer = this.stdioServer
    if (!liveServer) return
    const liveGate = (): SecurityGate => this._gate
    const toAdd = exclusionOpen ? [] : this.allowedToolNames().filter((n) => !this.registered.has(n))
    if (toAdd.length > 0) {
      ProvidentMcpServer.registerTools(liveServer, this.backend, toAdd, this.registered, this.moduleStore, this.router, liveGate)
    }
    const resToAdd = exclusionOpen ? [] : ProvidentMcpServer.ALL_RESOURCES.filter(
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
   *  it never throws. */
  exclusionSnapshot(): { status: 'refused'; reason: string } | null {
    return this._gate.exclusionState() === 'mcp-disabled'
      ? { status: 'refused', reason: EXCLUSION_CLOSED }
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
  ]

  /** The subset of ALL_TOOLS whose group the current gate allows — the tools
   *  the server registers (and can register on a re-gate). */
  allowedToolNames(): string[] {
    const staticNames = registeredToolNames(this._gate, ProvidentMcpServer.ALL_TOOLS)
    // U9 (M-r3) — the router's dynamic `module:<name>.<tool>` tools. They are
    // gated by the `module` group (registration) + the invocation two-gate
    // (F1, enforced in invokeTool). A dynamic tool is listed only when `module`
    // is enabled.
    if (this.router) {
      for (const tool of this.router.listTools()) {
        if (this._gate.toolAllowed(tool) && !staticNames.includes(tool)) staticNames.push(tool)
      }
    }
    return staticNames
  }

  /** U9 (F1) — invoke a dynamic `module:<name>.<tool>` tool. Enforces the
   *  invocation two-gate: a module tool backed by an executable entry requires
   *  `module` AND `code` at EACH call (not just install). A module-only agent
   *  cannot run a module tool that is arbitrary code. */
  invokeTool(toolName: string, args: unknown): unknown {
    if (!this.router) throw new Error(`invokeTool: no module router configured`)
    if (typeof toolName !== 'string' || !toolName.startsWith('module:')) {
      throw new Error(`invokeTool: not a module tool: ${String(toolName)}`)
    }
    // F1 — the invocation two-gate. A dynamic module tool is trusted-equivalent
    // to `code` (executable entry), so it needs module AND code.
    if (!moduleToolAllowed(toolName, this._gate.enabled, { executable: true })) {
      throw new Error(`invokeTool: ${toolName} requires module AND code groups (invocation two-gate)`)
    }
    return this.router.invokeTool(toolName, args)
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
      { name: 'provident-electron', version: '0.1.0' },
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
    const liveGate = (): SecurityGate => this._gate
    ProvidentMcpServer.registerTools(server, this.backend, this.allowedToolNames(), this.registered, this.moduleStore, this.router, liveGate)
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
    router: CapabilityRouter | null,
    liveGate: () => SecurityGate,
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
        // U3 — the module.* tools are MAIN-process (node:fs persisted store),
        // NOT routed to the renderer. They are handled here directly.
        if (name.startsWith('module.')) {
          const before = handleModuleTool(moduleStore, name, args)
          // U9-FIX — after a successful install/update, re-sync the live router
          // so the module's declared tools become callable.
          if (name === 'module.install' || name === 'module.update') {
            if ((before as { status?: string }).status === 'installed' || (before as { status?: string }).status === 'updated') {
              if (moduleStore && router) syncModuleRouter(router, moduleStore)
            }
          }
          return text(before)
        }
        const method = dispatch(name)
        const value = await backend.invoke(method, args)
        return text(value)
      })))
    }

    // U9 (M-r3) — register the router's DYNAMIC `module:<name>.<tool>` tools.
    // They are gated by the `module` group (registration) + the invocation
    // two-gate (F1, enforced in invokeTool). Each SDK call routes back through
    // `invokeTool` so the two-gate is checked at EVERY invocation.
    if (router) {
      for (const tool of router.listTools()) {
        if (!allowed.includes(tool)) continue
        if (registered.has(tool)) continue
        registered.set(tool, server.registerTool(tool, {
          title: tool,
          description: `A dynamic module tool (${tool}) — requires module AND code groups (invocation two-gate).`,
          inputSchema: {},
        }, guarded(async (args: Record<string, unknown>) => {
          const value = invokeModuleTool(router, liveGate(), tool, args)
          return text(value)
        })))
      }
    }

    // U-FOCUS-TOOL (`F3`, docs/specs/focus-tool.md §2.1 items 1-5/8/9) — the tool
    // row and its handler. THE HANDLER IS A THIN ADAPTER AND NOTHING ELSE HAPPENS
    // IN IT: validate the argument shape, make ONE renderer call over the existing
    // invoke seam, and return the renderer's answer VERBATIM. It holds NO state
    // between calls (a second identical call is a second renderer call, never a
    // cache hit — §2.3 item 5), mints NO id (§2.3 items 1/2), keeps no map, no
    // registry and no counter, sorts nothing, dedupes nothing, re-keys nothing and
    // re-derives no model rule (§2.3 items 3/4): the LIVE AUTHORITY for
    // `{entries, activeId}` is the RENDERER's own wiring-held state (§2.1 item 6),
    // never a graph slice and never a second authority inside this tool.
    // THE ARGUMENT SHAPE IS DECLARED, NOT ENFORCED BY A SCHEMA PARSER: the two
    // declared members are carried and NO schema strips a malformed call's keys
    // before the declared validation THROW names the rejected one (§0A note 3(a)/(d),
    // `S-6`/`F-1`) — a member the caller did not supply is never invented, and a
    // member the caller DID supply travels BY IDENTITY (§2.3 item 3).
    if (allowed.includes('provident.focus')) {
      registered.set('provident.focus', server.registerTool('provident.focus', {
        title: 'Focus a target',
        description:
          "Ask the renderer's focus model to activate an entry for an opaque target " +
          'on the focus model the renderer holds. Both members of `{ target?, newTab? }` ' +
          'are optional and pass through uninterpreted: a repeated target activates its ' +
          'existing entry, and newTab: true opens a new entry for the same target. The ' +
          'answer echoes the renderer\'s own { activeId, entries, opened } by identity ' +
          '(plus refused: { reason } exactly when the consumer refused the target). ' +
          'This tool mutates no graph node, emits no notification and renders no surface.',
        // THE SCHEMA DECLARES THE TWO NAMED MEMBERS, ACCEPTS AN OMITTED ARGUMENTS
        // MEMBER AND PASSES EVERY OTHER MEMBER THROUGH BY IDENTITY: an omitted
        // arguments member is the SAME CALL as `{}` (§0A note 3(a), `S-1`), and a schema
        // that STRIPPED an unknown key would consume a malformed call before the declared
        // validation THROW could NAME the rejected key — the throw is what the contract
        // fixes (§0A note 3(d), `S-6`/`F-1`).
        inputSchema: z.preprocess(
          (carried) => (carried ?? {}),
          z.object({
            target: z.unknown().optional().describe('The opaque target the focus model is asked with — passed through uninterpreted'),
            newTab: z.unknown().optional().describe('Open a new entry for the same target — carried uninterpreted, no default applied'),
          }).passthrough(),
        ),
      }, guarded(async (args: unknown) => focusHandler(args, backend) as never)))
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

  async start(): Promise<void> {
    if (this.transport === 'stdio') {
      const server = this.createServer()
      this.server = server
      this.stdioServer = server
      const transport = new StdioServerTransport()
      await server.connect(transport)
      console.error('[provident-mcp] stdio transport ready')
      return
    }
    // http — Streamable HTTP on 127.0.0.1:<port>/mcp. STATELESS: the SDK
    // requires a FRESH server + transport per request (reusing either across
    // requests throws — message ID collisions). Each POST builds its own
    // McpServer + transport, connects, and handles; GET/DELETE → 405 (the
    // SDK's canonical stateless example — responses flow through each POST).
    this.httpServer = createServer((req, res) => {
      void this.handleHttp(req, res)
    })
    await new Promise<void>((resolve) => this.httpServer!.listen(this.port, '127.0.0.1', () => resolve()))
    console.error(`[provident-mcp] http transport ready on http://127.0.0.1:${this.port}/mcp`)
  }

  private async handleHttp(req: IncomingMessage, res: ServerResponse): Promise<void> {
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
    const server = this.createServer()
    this.httpServers.add(server)
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })
    let body: unknown
    try {
      body = await readBody(req)
      await server.connect(transport)
      await transport.handleRequest(req, res, body)
    } catch (e) {
      const msg = e instanceof Error ? `${e.message}\n${e.stack ?? ''}` : String(e)
      console.error(`[provident-mcp] http error: ${msg}`)
      try {
        res.writeHead(500)
        res.end('internal error')
      } catch {
        // response may already be committed
      }
    } finally {
      res.on('close', () => {
        this.httpServers.delete(server)
        void server.close().catch(() => undefined)
        void transport.close().catch(() => undefined)
      })
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
  }
}

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) return resolve(undefined)
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('invalid JSON body'))
      }
    })
    req.on('error', reject)
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