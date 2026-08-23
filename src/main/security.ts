import { timingSafeEqual } from 'node:crypto'

export type ToolGroup = 'read' | 'dispatch' | 'graph' | 'code'

const TOOL_GROUPS: Record<string, ToolGroup> = {
  'provident.get_rendered_html': 'read',
  'provident.list_targets': 'read',
  'provident.get_node_state': 'read',
  'provident.code.get': 'read',
  'provident.code.validate': 'read',
  'provident.dispatch': 'dispatch',
  'provident.load': 'graph',
  'provident.op': 'graph',
  'provident.export': 'graph',
  'provident.validate': 'graph',
  'provident.teardown': 'graph',
  'provident.code.set': 'code',
  'provident.code.create': 'code',
  'provident.code.delete': 'code',
  'provident.code.load': 'code',
}

export function groupForTool(toolName: string): ToolGroup | null {
  return TOOL_GROUPS[toolName] ?? null
}

export function toolAllowed(toolName: string, enabled: ReadonlySet<ToolGroup>): boolean {
  const group = groupForTool(toolName)
  return group !== null && enabled.has(group)
}

export function defaultSecurityConfig(): { token: string | null; enabled: ToolGroup[] } {
  return { token: null, enabled: ['read', 'dispatch'] }
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export function authorized(
  headers: Record<string, string | undefined>,
  token: string | null,
): boolean {
  if (token === null) return true
  const auth = headers['authorization']
  if (auth !== undefined && auth !== '') {
    const scheme = auth.slice(0, 7).toLowerCase()
    if (scheme === 'bearer ') {
      const supplied = auth.slice(7)
      if (safeEqual(supplied, token)) return true
    }
  }
  const mcpToken = headers['mcp-token']
  if (mcpToken !== undefined && safeEqual(mcpToken, token)) return true
  return false
}

const VALID_GROUPS: ReadonlySet<string> = new Set(['read', 'dispatch', 'graph', 'code'])

export function applyPatch(
  config: { token: string | null; enabled: ToolGroup[] },
  patch: {
    token?: string | null
    groups?: ToolGroup[]
    disable?: ToolGroup[]
  },
): { token: string | null; enabled: ToolGroup[] } {
  const groups = patch.groups ?? []
  const disable = patch.disable ?? []

  for (const g of groups) {
    if (!VALID_GROUPS.has(g)) return config
  }
  for (const g of disable) {
    if (!VALID_GROUPS.has(g)) return config
  }

  let enabled = config.enabled
  for (const g of groups) {
    if (!enabled.includes(g)) enabled = [...enabled, g]
  }
  for (const g of disable) {
    if (enabled.includes(g)) enabled = enabled.filter((item) => item !== g)
  }

  const next: { token: string | null; enabled: ToolGroup[] } = {
    token: patch.token !== undefined ? patch.token : config.token,
    enabled,
  }
  return next
}
