import { timingSafeEqual } from 'node:crypto'

export type ToolGroup = 'read' | 'dispatch' | 'graph' | 'code' | 'module'

const TOOL_GROUPS: Record<string, ToolGroup> = {
  'provident.get_rendered_html': 'read',
  'provident.get_markdown': 'read',
  'provident.list_targets': 'read',
  'provident.get_node_state': 'read',
  'provident.code.get': 'read',
  'provident.code.validate': 'read',
  'provident.dispatch': 'dispatch',
  // U-FOCUS-TOOL (`F3`) — `provident.focus` JOINS the EXISTING `dispatch` group
  // (ON by default). `VALID_GROUPS` STAYS AT FIVE: the tool joins rather than
  // mints a sixth group (docs/specs/focus-tool.md §2.1 item 2, §2.2 X-2).
  'provident.focus': 'dispatch',
  'provident.load': 'graph',
  'provident.op': 'graph',
  'provident.export': 'graph',
  'provident.validate': 'graph',
  'provident.teardown': 'graph',
  'provident.journal': 'graph',
  'provident.code.set': 'code',
  'provident.code.create': 'code',
  'provident.code.delete': 'code',
  'provident.code.load': 'code',
  'provident.code.loadBatch': 'code',
  // U1 (module-extension system, docs/specs/module-import-proposal.md §5) — the
  // `module` group (OFF by default). The static module.* management tools.
  'module.install': 'module',
  'module.update': 'module',
  'module.list': 'module',
  'module.disable': 'module',
  'module.enable': 'module',
  // R1 (mcp-resources-review.md) — the read-group resources. Keyed by
  // `resource:<uri>` so `toolAllowed` gates them with the `read` group. A
  // resource is registered ONLY when its group is allowed (never always-
  // registered).
  'resource:mcp://provident/app': 'read',
  'resource:mcp://provident/targets': 'read',
  'resource:mcp://provident/node/{nodeId}': 'read',
}

export function groupForTool(toolName: string): ToolGroup | null {
  // M-r3 (module-import-proposal.md §5) — a dynamic module tool is namespaced
  // `module:<name>.<tool>`. It resolves to the `module` group via PREFIX (the
  // dynamic tool names cannot be enumerated statically in TOOL_GROUPS). An
  // exact-name static tool always wins; the prefix only catches `module:` names.
  // F4 (adversarial): `module:` with an EMPTY rest (no `<name>.<tool>`) is
  // malformed and denied, never resolved to `module`.
  if (typeof toolName !== 'string') return null
  if (toolName in TOOL_GROUPS) return TOOL_GROUPS[toolName]
  if (toolName.startsWith('module:') && toolName.length > 'module:'.length) return 'module'
  return null
}

export function toolAllowed(toolName: string, enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[]): boolean {
  const group = groupForTool(toolName)
  const set: ReadonlySet<ToolGroup> = enabled instanceof Set ? enabled : new Set(enabled)
  return group !== null && set.has(group)
}

/** U1 (third-pass blocking fix) — the module-tool INVOCATION two-gate. A module
 *  tool backed by an executable `entry` is trusted-equivalent to the `code`
 *  group, so invoking it requires BOTH `module` AND `code`. A pure-capability
 *  (non-executable) module tool needs `module` only. Only `module:`-prefixed
 *  tools are gated here; any other name is denied (not a module tool).
 *  `executable` defaults to TRUE (fail-closed): a module tool that could carry
 *  code is denied unless `code` is also enabled. */
export function moduleToolAllowed(
  toolName: string,
  enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[] | null | undefined,
  opts?: { executable?: boolean },
): boolean {
  if (typeof toolName !== 'string' || !toolName.startsWith('module:') || toolName.length <= 'module:'.length) return false
  // F3 (adversarial) — malformed `enabled` (non-iterable object) FAILS CLOSED
  // (false), never throws. null/undefined → empty set → false.
  if (!(enabled instanceof Set || Array.isArray(enabled))) return false
  const set: ReadonlySet<ToolGroup> = enabled instanceof Set ? enabled : new Set(enabled)
  if (!set.has('module')) return false
  const executable = opts?.executable ?? true
  if (executable && !set.has('code')) return false
  return true
}

export function defaultSecurityConfig(): { token: string | null; enabled: ToolGroup[] } {
  return { token: null, enabled: ['read', 'dispatch'] }
}

/** THE EXCLUSION STATE'S CLOSED TOKEN PAIR (`docs/specs/secure-exclusion.md` `§0A` item 1 /
 *  `§2.1` item 1). ONE record with TWO DERIVED readings, so the illegal pair
 *  `{MCP-ENABLED, TIER-4-OPEN}` (and its mirror) is UNSPELLABLE rather than merely forbidden. */
export type ExclusionState = 'mcp-enabled' | 'mcp-disabled'

/** `§2.2` item 1 — THE INVOCATION-TURN THRESHOLD PREDICATE, in the SAME FILE and the SAME STYLE
 *  as the two landed gates above and with the same FAIL-CLOSED posture: `true` **iff** `state` is
 *  the exact legal token `'mcp-enabled'`; `false` for EVERY other value — `undefined`, `null`, a
 *  non-string, an unknown string, a hostile object. TOTAL: it never throws. */
export function exclusionAllowsWork(state: unknown): boolean {
  return state === 'mcp-enabled'
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

/** F1 — a non-string header value (a duplicate HTTP header is an array, a
 *  hostile value may be a number/object) is treated as ABSENT. Never crash. */
function asString(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined
}

/** F-key — a case-insensitive header lookup (callers may pass `Authorization`
 *  or `authorization`; the transport seam uses Node-lowercased keys). */
function header(headers: Record<string, unknown> | null | undefined, name: string): string | undefined {
  if (headers === null || headers === undefined) return undefined
  if (name in headers) return asString(headers[name])
  const lower = name.toLowerCase()
  for (const k of Object.keys(headers)) {
    if (k.toLowerCase() === lower) return asString(headers[k])
  }
  return undefined
}

export function authorized(
  headers: Record<string, unknown> | null | undefined,
  token: string | null,
): boolean {
  // F-gate — a null/undefined headers object is a hostile/wiring input; treat
  // as NO headers (fails closed), never throw.
  if (headers === null || headers === undefined) return token === null
  // F6 — a non-null token must be non-empty (an empty-string token would admit
  // `Bearer ` / an empty `mcp-token`); an empty token authenticates nothing.
  if (token === null || token === '') return token === null
  // F-key — case-insensitive header lookup (a caller may pass
  // `Authorization`/`MCP-Token`; the transport seam uses Node-lowercased keys).
  const auth = header(headers, 'authorization')
  if (auth !== undefined && auth !== '') {
    const scheme = auth.slice(0, 7).toLowerCase()
    if (scheme === 'bearer ') {
      const supplied = auth.slice(7)
      if (safeEqual(supplied, token)) return true
    }
  }
  const mcpToken = header(headers, 'mcp-token')
  if (mcpToken !== undefined && safeEqual(mcpToken, token)) return true
  return false
}

const VALID_GROUPS: ReadonlySet<string> = new Set(['read', 'dispatch', 'graph', 'code', 'module'])

/** F3/F4 — a token/groups/disable field of the wrong shape ⇒ the whole patch
 *  is REJECTED (config unchanged, never throws). */
function isToolGroup(v: unknown): v is ToolGroup {
  return typeof v === 'string' && VALID_GROUPS.has(v)
}

export function applyPatch(
  config: { token: string | null; enabled: ToolGroup[] },
  patch: {
    token?: string | null
    groups?: ToolGroup[]
    disable?: ToolGroup[]
  },
): { token: string | null; enabled: ToolGroup[] } {
  const { groups, disable } = patch
  // F3 — token must be string|null (non-empty if set).
  if (patch.token !== undefined && (typeof patch.token !== 'string' || patch.token === '')) {
    return config
  }
  // F4 — groups/disable must be arrays of valid ToolGroup (non-iterable/mixed
  // inputs reject the whole patch, never throw).
  if (groups !== undefined && (!Array.isArray(groups) || !groups.every(isToolGroup))) {
    return config
  }
  if (disable !== undefined && (!Array.isArray(disable) || !disable.every(isToolGroup))) {
    return config
  }
  const add = groups ?? []
  const del = disable ?? []
  // F5 — always a FRESH enabled array (no aliasing into the caller's config).
  const enabled = [...config.enabled]
  for (const g of add) if (!enabled.includes(g)) enabled.push(g)
  for (const g of del) {
    const i = enabled.indexOf(g)
    if (i !== -1) enabled.splice(i, 1)
  }
  return {
    token: patch.token !== undefined ? patch.token : config.token,
    enabled,
  }
}

export interface SecurityConfig { token: string | null; enabled: ToolGroup[] }

export class SecurityGate {
  private readonly _config: { token: string | null; enabled: ToolGroup[] }
  /** `§2.1` items 2/3 — THE ONE EXCLUSION RECORD (the second axis, `CURRENT STATE` item 4).
   *  PROCESS-GLOBAL and SINGLE-VALUED: it rides the ONE gate `main` constructs at boot and the
   *  server holds; there is no per-window copy, no per-realm copy and no second holder. */
  private _exclusion: ExclusionState

  constructor(initial?: SecurityConfig) {
    // A PARTIAL initial (`{ token }` with no `enabled` — the boot-read shape the drives construct
    // the gate with) falls back to the default enabled set rather than throwing. An `enabled` that
    // IS supplied is carried in whatever iterable form it arrives (an array or a `Set` — both are
    // landed call forms), so no caller's group set is silently replaced by the default.
    this._config = initial
      ? {
        token: initial.token,
        enabled: initial.enabled === undefined || initial.enabled === null
          ? defaultSecurityConfig().enabled
          : [...initial.enabled],
      }
      : defaultSecurityConfig()
    // THE BOOT TERMINAL (`§2.1` item 4): the record is INITIALIZED HERE to `'mcp-enabled'` — from
    // the CONSTRUCTION SITE, never read from any file, because the flag is NOT persisted (`D-19`).
    this._exclusion = 'mcp-enabled'
  }

  get config(): SecurityConfig {
    return { token: this._config.token, enabled: [...this._config.enabled] }
  }

  get enabled(): ReadonlySet<ToolGroup> {
    return new Set(this._config.enabled)
  }

  /** `§2.1` item 2 / `PAR-1` — THE DERIVED PAIR READER. A `readonly` getter with NO setter, so
   *  no assignment path exists (`P-EX-IM-1`'s reading (3)); `mcpEnabled === !tier4Open` is an
   *  INVARIANT of the one record, never a pair of assignable fields. */
  get exclusion(): { readonly mcpEnabled: boolean; readonly tier4Open: boolean } {
    const mcpEnabled = this._exclusion === 'mcp-enabled'
    return { mcpEnabled, tier4Open: !mcpEnabled }
  }

  /** `§2.1` item 2 / `PAR-2` — THE TOTAL READER: the two closed tokens, never `undefined`, never
   *  a throw, no third token. */
  exclusionState(): ExclusionState {
    return this._exclusion
  }

  /** `§2.1` item 2 / `PAR-3` — THE TRANSITION'S PURE CONSTRUCTOR, in the `apply`-family style: a
   *  NEW gate is returned and the RECEIVER is unchanged (`applyGatePatch` REPLACES `this._gate`,
   *  so a mutating form would leave the server's own replacement invisible to an earlier reader).
   *  `T-3` (a self-transition) is a legal no-op. `T-4`: EVERY outside value — any other string,
   *  `undefined`, `null`, a number, an object, an array, a hostile proxy — answers the UNCHANGED
   *  gate and NEVER throws (the `SecurityGate.apply` posture above). */
  withExclusion(next: ExclusionState): SecurityGate {
    const changed = next === 'mcp-enabled' || next === 'mcp-disabled'
    if (!changed || next === this._exclusion) {
      const same = new SecurityGate(this.config)
      same._exclusion = this._exclusion
      return same
    }
    const moved = new SecurityGate(this.config)
    moved._exclusion = next
    return moved
  }

  toolAllowed(name: string): boolean {
    return toolAllowed(name, this.enabled)
  }

  checkRequest(headers: Record<string, unknown> | null | undefined): { ok: true } | { ok: false; reason: string } {
    return authorized(headers, this._config.token)
      ? { ok: true }
      : { ok: false, reason: 'unauthorized' }
  }

  apply(patch: { token?: string | null; groups?: ToolGroup[]; disable?: ToolGroup[] }): SecurityGate {
    const next = new SecurityGate(applyPatch(this.config, patch))
    // `T-5` / `M-EX-9` — the SET/re-gate path is NOT a transition site: the exclusion record
    // rides through UNTOUCHED, and the two axes stay separate.
    next._exclusion = this._exclusion
    return next
  }
}
