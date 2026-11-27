import { timingSafeEqual } from 'node:crypto'
import { TOOL_GROUP_IDS } from '../shared/types.js'
import type { DeclarationCarrier } from '../shared/registry/index.js'

/** **THE GROUP DOMAIN'S ID TYPE (`S-8`): the union retired and the NAME stayed** — an id in the registered set, which
 *  the declaration registry answers (`docs/L3/mcp-surface/group-domain-signatures.md` §1). The six foundation ids are
 *  `TOOL_GROUP_IDS` and no type here closes over them; a reader who wants "is this id registered" asks
 *  `GroupRule.groups()` and never a literal. */
export type ToolGroup = string

const TOOL_GROUPS: Record<string, ToolGroup> = {
  'provident.get_rendered_html': 'read',
  'provident.get_markdown': 'read',
  'provident.list_targets': 'read',
  'provident.get_node_state': 'read',
  'provident.code.get': 'read',
  'provident.code.validate': 'read',
  'provident.dispatch': 'dispatch',
  // U-FOCUS-TOOL (`F3`) — `provident.focus` JOINS the EXISTING `dispatch` group
  // (ON by default). The group set is SIX at this head: the sixth is central-data's
  // `data` (`docs/L1/central-data-census-exception.md` §2 E-1), and this tool mints
  // none of its own — it joins (docs/specs/focus-tool.md §2.1 item 2, §2.2 X-2).
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
  // central-data (`docs/L1/central-data-census-exception.md` §2 E-1) — the sixth group, `data`
  // (OFF by default). Five EXACT rows: the prefix rule covers `module:` names only.
  'provident.data.read': 'data',
  'provident.data.write': 'data',
  'provident.data.delete': 'data',
  'provident.data.list': 'data',
  'provident.data.journal': 'data',
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

/** **THE TWO QUESTIONS THE GATE ASKS OF A GROUP DOMAIN, AND NO THIRD** (`group-domain.md` §2, `ASM-GD-1`): `groupOf` is the
 *  membership for ONE name, `groups()` is the set a patch may name. One object, because a rule answering one and not the
 *  other would let `apply` admit a group no tool resolves to, or refuse one a tool already answers. */
export interface GroupRule {
  groupOf(name: string): ToolGroup | null
  groups(): readonly ToolGroup[]
}

/** **THE DEFAULT RULE, AND IT READS THIS FILE'S OWN FOUNDATION AND NOTHING ELSE** (`ASM-1`'s posture at this axis): the
 *  exact `TOOL_GROUPS` rows, then the `module:` prefix, and `TOOL_GROUP_IDS` as its set. A gate constructed with no rule
 *  measures the FOUNDATION's six and no module group — stated, because a bare gate in a test is that gate. */
export const foundationGroupRule: GroupRule = {
  groupOf: (name: string) => groupForTool(name),
  groups: () => TOOL_GROUP_IDS,
}

/** A MEMBERSHIP REFUSAL IS A VALUE NAMING ITS SUBJECT (`D-105`): `declaration-duplicate` for one name in two groups (the
 *  registry's own reason for a duplicate id) and `declaration-overstated` for a `tools[]` element the same manifest's
 *  `capabilities.tools` does not carry (`C-12`). It is structurally a `DeclarationRefusal` where the reason is the
 *  duplicate, so the boot's list is one union. */
export interface GroupRefusal {
  readonly status: 'refused'
  readonly reason: 'declaration-duplicate' | 'declaration-overstated'
  readonly subject: string
}

/** **THE COMPOSED RULE** (`group-domain.md` §2, §3; `ASM-GD-3`): `groupOf` answers the DECLARED MEMBERSHIP first and the
 *  foundation's rule second, and `groups()` answers the SET IT IS HANDED — the registry's `declaredGroups()` — unchanged,
 *  so the set has ONE authority and this function never derives it (`D-129`). `carriers` is the registry's own
 *  `DeclarationCarrier[]`, so the membership and the ids are read from ONE input in ONE shape.
 *
 *  A FOUNDATION ID A MODULE CLAIMS IS SKIPPED HERE AND REFUSED BY THE REGISTRY BY NAME: the registry's composition answers
 *  `declaration-duplicate` with the id, and a second refusal from this function would name it twice. A group's `tools[]`
 *  element the same manifest's `capabilities.tools` does not carry is `declaration-overstated`; one tool in two groups is
 *  `declaration-duplicate`, and neither halves the membership. */
export function composedGroupRule(
  foundation: GroupRule,
  groups: readonly ToolGroup[],
  carriers: readonly DeclarationCarrier[],
): { readonly rule: GroupRule; readonly refused: readonly GroupRefusal[] } {
  const membership = new Map<string, string>()
  const refused: GroupRefusal[] = []
  const foundationIds = new Set(foundation.groups())
  for (const carrier of carriers) {
    const capabilities = carrier?.capabilities
    if (capabilities === null || capabilities === undefined || typeof capabilities !== 'object') continue
    const moduleName = typeof carrier.name === 'string' ? carrier.name : ''
    /** **A MANIFEST NAMES ITS OWN TOOLS BARE** (`admission.declaredTools` maps `bareToolName`), while `groupOf` is asked
     *  the PUBLISHED name — so both sides are normalised to `module:<name>.<tool>` here and the membership key is the
     *  name the gate will ask. A tool already spelled in the namespace is left as it stands. */
    const full = (tool: string): string => (tool.startsWith('module:') ? tool : `module:${moduleName}.${tool}`)
    const declared = new Set((Array.isArray(capabilities.tools) ? capabilities.tools : []).filter((tool): tool is string => typeof tool === 'string').map(full))
    const groupsDeclared = Array.isArray(capabilities.groups) ? capabilities.groups : []
    for (const group of groupsDeclared) {
      if (group === null || typeof group !== 'object') continue
      if (typeof group.id !== 'string' || group.id === '' || foundationIds.has(group.id)) continue
      const tools = Array.isArray(group.tools) ? group.tools : []
      for (const tool of tools) {
        if (typeof tool !== 'string' || tool === '') continue
        const name = full(tool)
        if (!declared.has(name)) {
          refused.push({ status: 'refused', reason: 'declaration-overstated', subject: name })
          continue
        }
        if (membership.has(name)) {
          refused.push({ status: 'refused', reason: 'declaration-duplicate', subject: name })
          continue
        }
        membership.set(name, group.id)
      }
    }
  }
  return {
    rule: {
      groupOf: (name: string) => membership.get(name) ?? foundation.groupOf(name),
      groups: () => groups,
    },
    refused,
  }
}

/** **A GROUP IS ENABLED IFF ITS RULE RESOLVES IT** (`S-8`): the rule is the only source, and its absence answers the
 *  foundation's own six — never a second set, never a literal (`ASM-4`'s defaulted-seam pattern). */
export function toolAllowed(
  toolName: string,
  enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[],
  rule: GroupRule = foundationGroupRule,
): boolean {
  const group = rule.groupOf(toolName)
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
  opts?: { executable?: boolean; rule?: GroupRule },
): boolean {
  if (typeof toolName !== 'string' || !toolName.startsWith('module:') || toolName.length <= 'module:'.length) return false
  // F3 (adversarial) — malformed `enabled` (non-iterable object) FAILS CLOSED
  // (false), never throws. null/undefined → empty set → false.
  if (!(enabled instanceof Set || Array.isArray(enabled))) return false
  const set: ReadonlySet<ToolGroup> = enabled instanceof Set ? enabled : new Set(enabled)
  const rule = opts?.rule ?? foundationGroupRule
  // **THE TOOL'S OWN GROUP, NOT `module`** (`S-8`, `group-domain.md` §1): a tool declared into another group could never
  // satisfy a `module` requirement. The `code` half stands: an executable module tool is still trusted-equivalent to it.
  const group = rule.groupOf(toolName)
  if (group === null || !set.has(group)) return false
  const executable = opts?.executable ?? true
  if (executable && !set.has('code')) return false
  return true
}

/** **THE REGISTRATION SITES' PREDICATE — the landed rule FACTORED and never re-decided**
 *  (`docs/L3/mcp-surface/design.md` §4; `docs/L2/mcp-surface/interface.md` §10's construction clause;
 *  `docs/L3/mcp-surface/signatures.md` §1).
 *
 *  `module.install`/`module.update` carry an executable entry and are trusted-equivalent to `code`, so they
 *  register only while `module` AND `code` BOTH stand; every other name — `module.list` and a dynamic
 *  `module:<n>.<t>` included — registers by its GROUP alone; and an unknown name or a bare `module:` is denied
 *  because `groupForTool` answers `null` for it. `registeredToolNames` delegates to this, so the construction
 *  arm's rule has ONE spelling (D-41's site rule).
 *
 *  **ITS SCOPE IS THE REGISTRATION SITES ONLY**: the re-gate's toggle keeps the landed PAIR predicate over
 *  every `module.`- and `module:`-prefixed handle, and the INVOCATION keeps `moduleToolAllowed(...)`. One
 *  function returning one answer for `module.list` cannot say "group alone" at construction and "the pair" at
 *  the re-gate, so the asymmetry is the contract's and not a simplification to make (`design.md` §4, §9 `G-8`).
 *
 *  **TOTALITY OVER A MALFORMED `enabled` IS THIS PASS'S OWN RULE AND NOT THE LANDED ONE** (`design.md` §10
 *  `ASM-4`): `null`, `undefined` and a NON-ITERABLE answer `false` and never throw — the posture
 *  `moduleToolAllowed` already carries in this file (`F3`), which `toolAllowed` does NOT (`new Set(enabled)`
 *  throws on a non-iterable). A gate that throws is a crash wearing a refusal's clothes (D-105). */
export function registrationAllowed(
  name: string,
  enabled: ReadonlySet<ToolGroup> | readonly ToolGroup[] | null | undefined,
  rule: GroupRule = foundationGroupRule,
): boolean {
  // F3 (the landed fail-closed posture, borrowed): a malformed `enabled` FAILS CLOSED, never throws.
  if (!(enabled instanceof Set || Array.isArray(enabled))) return false
  const set: ReadonlySet<ToolGroup> = enabled instanceof Set ? enabled : new Set(enabled)
  const group = rule.groupOf(name)
  // An unknown name, and a bare `module:` with an empty rest, answer `null` and are denied — never resolved to
  // `module`, never admitted by a prefix.
  if (group === null || !set.has(group)) return false
  // `module.install`/`module.update` are the ONLY pair names: the `module` group alone does not open them.
  if (name === 'module.install' || name === 'module.update') return set.has('code')
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

/** F3/F4 — a token/groups/disable field of the wrong shape ⇒ the whole patch
 *  is REJECTED (config unchanged, never throws). **THE DOMAIN IS THE RULE'S** (`S-8`): a group the rule's set does not
 *  hold rejects the WHOLE patch, so a module-declared group is enableable exactly while the registry declares it. */
function isToolGroup(v: unknown, rule: GroupRule): v is ToolGroup {
  return typeof v === 'string' && rule.groups().includes(v)
}

export function applyPatch(
  config: { token: string | null; enabled: ToolGroup[] },
  patch: {
    token?: string | null
    groups?: ToolGroup[]
    disable?: ToolGroup[]
  },
  rule: GroupRule = foundationGroupRule,
): { token: string | null; enabled: ToolGroup[] } {
  const { groups, disable } = patch
  // F3 — token must be string|null (non-empty if set).
  if (patch.token !== undefined && (typeof patch.token !== 'string' || patch.token === '')) {
    return config
  }
  // F4 — groups/disable must be arrays of valid ToolGroup (non-iterable/mixed
  // inputs reject the whole patch, never throw).
  if (groups !== undefined && (!Array.isArray(groups) || !groups.every((name: unknown) => isToolGroup(name, rule)))) {
    return config
  }
  if (disable !== undefined && (!Array.isArray(disable) || !disable.every((name: unknown) => isToolGroup(name, rule)))) {
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
  /** `§2.2` item 3 / `PAR-5` — THE ACCEPTED-WORK EPOCH, held BESIDE the exclusion record: a
   *  monotone counter bumped ONCE per accepted TRANSITION (`T-1`/`T-2`) and carried forward
   *  UNCHANGED by `T-3`/`T-4` and by every non-transition call (`apply`). It rides the gate the
   *  process holds (there is ONE live gate — `§2.2` item 3 / the row that FAILS a module-global
   *  design), so a gate constructed independently never observes another's bump. No declared
   *  surface TAKES an epoch (`PAR-5`'s OUTSIDE column): it is read here and stamped by the
   *  acceptor, never supplied by a caller. */
  private _exclusionEpoch = 0
  /** **THE ONE INJECTION SEAM** (`group-domain.md` §2): the composed rule, passed at the boot's one construction site;
   *  absent, the gate holds `foundationGroupRule`. Every predicate and `applyPatch` read it, so no member asks a literal. */
  private readonly _rule: GroupRule

  constructor(initial?: SecurityConfig & { readonly groups?: GroupRule }) {
    this._rule = initial?.groups ?? foundationGroupRule
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

  /** **THE RULE IT HOLDS, READABLE** (`S-8`): `mcp-server.ts`'s two FREE predicate calls are handed the gate's rule rather
   *  than the default — a call site left on `foundationGroupRule` would refuse a declared group at registration while the
   *  gate admitted it. */
  get groupRule(): GroupRule {
    return this._rule
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

  /** `§2.2` item 3 / `PAR-5` — THE EPOCH READER. It reports the counter's current value; it takes
   *  NOTHING (`PAR-5`: *"No declared surface takes one"*), so a caller can never forge recency by
   *  supplying an epoch, and it never throws and is never `undefined` (`P-EX-TP-1`'s totality). */
  exclusionEpoch(): number {
    return this._exclusionEpoch
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
      // `T-3`/`T-4` — the epoch does NOT move: an epoch bump on a no-op would invalidate work for
      // a transition that never happened (and a caller could then deny service with a loop of
      // no-ops), so the counter is CARRIED FORWARD unchanged. **AND THE RULE IS CARRIED WITH IT**
      // (`S-8`): a no-op arm that dropped it would lose every module group on the first transition.
      const same = new SecurityGate({ ...this.config, groups: this._rule })
      same._exclusion = this._exclusion
      same._exclusionEpoch = this._exclusionEpoch
      return same
    }
    // `T-1`/`T-2` — AN ACCEPTED TRANSITION BUMPS THE EPOCH BY EXACTLY `1` (`M-EX-2`), and the rule rides along (`S-8`).
    const moved = new SecurityGate({ ...this.config, groups: this._rule })
    moved._exclusion = next
    moved._exclusionEpoch = this._exclusionEpoch + 1
    return moved
  }

  toolAllowed(name: string): boolean {
    return toolAllowed(name, this.enabled, this._rule)
  }

  checkRequest(headers: Record<string, unknown> | null | undefined): { ok: true } | { ok: false; reason: string } {
    return authorized(headers, this._config.token)
      ? { ok: true }
      : { ok: false, reason: 'unauthorized' }
  }

  apply(patch: { token?: string | null; groups?: ToolGroup[]; disable?: ToolGroup[] }): SecurityGate {
    // **THE RULE IS HANDED TO THE VALIDATOR AND CARRIED INTO THE NEW GATE** (`S-8`): `applyPatch` validates a patch's ids
    // against the composed set, and the replacement gate must hold the same rule or the next `apply` would lose it.
    const next = new SecurityGate({ ...applyPatch(this.config, patch, this._rule), groups: this._rule })
    // `T-5` / `M-EX-9` — the SET/re-gate path is NOT a transition site: the exclusion record
    // rides through UNTOUCHED, and the two axes stay separate.
    next._exclusion = this._exclusion
    // `M-EX-7` / `M-EX-9` — and the epoch does not move either: the SET neither transitions nor
    // invalidates.
    next._exclusionEpoch = this._exclusionEpoch
    return next
  }
}
