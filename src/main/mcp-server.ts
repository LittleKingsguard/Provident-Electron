// src/main/mcp-server.ts — the MCP server (main process). Exposes the
// provident-ssr renderer's synthetic-event access + rendered-HTML visibility
// as MCP tools for agentic use and debugging exposure.
//
// Two transports (configurable via `--mcp-transport` / `PROVIDENT_MCP_TRANSPORT`):
//   - stdio: the process is spawned by an MCP client (agent/IDE).
//   - http:   a Streamable HTTP server on 127.0.0.1:<port>/mcp (the app runs,
//             the client connects).
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { RegisteredTool } from '@modelcontextprotocol/sdk/server/mcp.js'
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
import { SecurityGate, type ToolGroup } from './security.js'

const TOOL_PREFIX = 'provident.'

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

export type McpTransportKind = 'stdio' | 'http'

export interface McpServerOptions {
  backend: McpBackend
  transport: McpTransportKind
  port?: number
  gate?: SecurityGate
}

export interface SecuritySnapshot { token: string | null; enabled: ToolGroup[] }

export class ProvidentMcpServer {
  private server: McpServer | null = null
  private readonly backend: McpBackend
  private readonly transport: McpTransportKind
  private readonly port: number
  private httpServer: ReturnType<typeof createServer> | null = null
  private readonly httpServers = new Set<McpServer>()
  private _gate: SecurityGate
  /** M1 — the live `RegisteredTool` handles, keyed by full `provident.` tool
   *  name, captured at registration. The SDK keeps its registry private (no
   *  enumerator), so this is the only way to re-gate (enable/disable) a
   *  running server's tools on `applyGatePatch`. */
  private readonly registered = new Map<string, RegisteredTool>()
  /** M1: the (possibly single) long-lived stdio server, so `applyGatePatch`
   *  can re-gate it in place. */
  private stdioServer: McpServer | null = null

  constructor(opts: McpServerOptions) {
    this.backend = opts.backend
    this.transport = opts.transport
    this.port = opts.port ?? 3787
    this._gate = opts.gate ?? new SecurityGate()
  }

  getGateConfig(): SecuritySnapshot {
    return this._gate.config
  }

  /** The full tool-name list the server can register (spec mcp-server-gate.md
   *  §3). Kept in one place so registration + the gate agree. */
  static readonly ALL_TOOLS: string[] = [
    'provident.dispatch',
    'provident.get_rendered_html',
    'provident.list_targets',
    'provident.get_node_state',
    'provident.code.get',
    'provident.code.validate',
    'provident.load',
    'provident.op',
    'provident.export',
    'provident.validate',
    'provident.teardown',
    'provident.code.set',
    'provident.code.create',
    'provident.code.delete',
    'provident.code.load',
  ]

  /** The subset of ALL_TOOLS whose group the current gate allows — the tools
   *  the server registers (and can register on a re-gate). */
  allowedToolNames(): string[] {
    return registeredToolNames(this._gate, ProvidentMcpServer.ALL_TOOLS)
  }

  applyGatePatch(patch: { token?: string | null; groups?: ToolGroup[]; disable?: ToolGroup[] }): SecuritySnapshot {
    this._gate = this._gate.apply(patch)
    // M1 — re-gate the LIVE server (stdio, one long-lived McpServer): toggle
    // the captured RegisteredTool handles so a narrow actually takes effect.
    for (const [name, tool] of this.registered) {
      tool.update({ enabled: this._gate.toolAllowed(name) })
    }
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
    ProvidentMcpServer.registerTools(server, this.backend, this.allowedToolNames(), this.registered)
    return server
  }

  private static registerTools(
    server: McpServer,
    backend: McpBackend,
    allowed: string[],
    registered: Map<string, RegisteredTool>,
  ): void {
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
      }, async (args) => {
        const req: DispatchRequest = {
          ...(args.requestId !== undefined ? { requestId: args.requestId } : {}),
          target: args.target,
          event: args.event,
          ...(args.args !== undefined ? { args: args.args } : {}),
        }
        const value = await backend.invoke('dispatch', req)
        return text(value)
      }))
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
      }, async () => {
        const value = await backend.invoke('renderedHtml', {})
        return text(value)
      }))
    }

    if (allowed.includes('provident.list_targets')) {
      registered.set('provident.list_targets', server.registerTool('provident.list_targets', {
        title: 'List dispatch targets',
        description:
          'List every node in the producing graph with its authored css.id, ' +
          'props.id, type, state, in-tree flag, content, and declared handlers — ' +
          'the addressable vocabulary for provident.dispatch.',
        inputSchema: {},
      }, async () => {
        const value = await backend.invoke('listTargets', {})
        return text(value)
      }))
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
      }, async (args: { target: unknown }) => {
        const value = await backend.invoke('nodeState', args.target)
        return text(value)
      }))
    }

    // M2 — STUB tools for the graph/code groups until Unit C implements them.
    // They are registered only when their group is enabled, so the gate's
    // enabled-map and the real registration agree (no silent no-op). They
    // return an explicit "not implemented" result until Unit C replaces them.
    const stubs: Array<[string, string]> = [
      ['provident.load', 'Load an envelope into the graph (Unit C — not yet implemented)'],
      ['provident.op', 'Apply a single managed-channel op (Unit C — not yet implemented)'],
      ['provident.export', 'Export the graph (Unit C — not yet implemented)'],
      ['provident.validate', 'Validate an export (Unit C — not yet implemented)'],
      ['provident.teardown', 'Tear the graph down to root (Unit C — not yet implemented)'],
      ['provident.code.get', 'Read the envelope (Unit C — not yet implemented)'],
      ['provident.code.set', 'Set the envelope (Unit C — not yet implemented)'],
      ['provident.code.create', 'Create envelope entries (Unit C — not yet implemented)'],
      ['provident.code.delete', 'Delete envelope entries (Unit C — not yet implemented)'],
      ['provident.code.validate', 'Validate the envelope (Unit C — not yet implemented)'],
      ['provident.code.load', 'Re-load the edited envelope (Unit C — not yet implemented)'],
    ]
    for (const [name, description] of stubs) {
      if (allowed.includes(name)) {
        registered.set(name, server.registerTool(name, {
          title: name,
          description,
          inputSchema: {},
        }, async () => text({ ok: false, notImplemented: true, tool: name })))
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
 *  renderer signals readiness. */
export class RendererBackend implements McpBackend {
  private resolveReady!: () => void
  private readonly readyPromise: Promise<void>
  private seq = 0
  private readonly pending = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>()
  private window: Electron.BrowserWindow | null = null

  constructor() {
    this.readyPromise = new Promise<void>((resolve) => {
      this.resolveReady = resolve
    })
  }

  attachWindow(win: Electron.BrowserWindow): void {
    this.window = win
  }

  markReady(): void {
    this.resolveReady()
  }

  async invoke(method: string, payload: unknown): Promise<unknown> {
    await this.readyPromise
    const win = this.window
    if (!win || win.isDestroyed()) throw new Error('renderer window unavailable')
    const id = ++this.seq
    const req: RpcRequest = { id, method: method as never, payload }
    const result = new Promise<unknown>((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
    })
    win.webContents.send('provident:invoke', req)
    return result
  }

  handleReply(reply: RpcReply): void {
    const entry = this.pending.get(reply.id)
    if (!entry) return
    this.pending.delete(reply.id)
    if (reply.ok) entry.resolve(reply.value)
    else entry.reject(new Error(reply.error ?? 'renderer error'))
  }
}