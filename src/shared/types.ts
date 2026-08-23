// src/shared/types.ts — the IPC + MCP contract between the Electron main
// process (MCP server) and the renderer (provident-ssr graph + DOM render).
//
// This is the "Phase C" seam (the upstream project's parked cross-process
// MCP/Electron endpoint — docs/pending.md, ssr-synthetic-event.md §3): the
// payloads crossing the IPC boundary MUST be JSON-safe (structured-clone
// args). The renderer owns the producing graph; the main process owns the MCP
// server and forwards tool calls over IPC (renderer DOM + IPC bridge).

/** A render target in the producing graph. Two vocabularies per the Phase B
 *  synthetic-event contract (docs/specs/ssr-synthetic-event.md §2.2):
 *  ERGONOMIC — an authored `css.id`; AUTHORITATIVE — a `nodeId`/`wire`. */
export type DispatchTarget =
  | { kind: 'cssId'; cssId: string }
  | { kind: 'nodeId'; nodeId: string }
  | { kind: 'wire'; wire: string }

/** The synthetic-event dispatch request (Phase C: idempotent requestId +
 *  structured-clone JSON args + flush-before-response). */
export interface DispatchRequest {
  /** Caller-supplied idempotency key. The ENGINE applies the opt-in bounded
   *  `requestId` dedup (ssr-synthetic-event.md §3.3): a duplicate within the
   *  window (same requestId AND same (target, event)) returns the first
   *  caller's report — the idempotent echo an MCP host wants. */
  requestId?: string
  target: DispatchTarget | string
  event: string
  args?: unknown[]
}

export interface DispatchResult {
  /** The contained `HandlerResult[]` from the shared dispatch-report surface
   *  (`Supervisor.dispatchAndReport` — ssr-synthetic-event.md §3). */
  results: unknown[]
  /** Node ids dirtied by the dispatch's apply cascade (engine-derived:
   *  `apply().dirtied ∪ keys(takePass2States())`, awaited-flush-bounded). */
  dirtied: string[]
  /** The live `#app` innerHTML after the re-render. */
  renderedHtml: string
  /** The SSR re-emit (SSRFragmentAdapter) after the re-render. */
  ssrHtml: string
}

export interface RenderedHtmlResult {
  /** The live `#app` innerHTML (the DOM view). */
  renderedHtml: string
  /** The SSR fragment re-emitted from the same graph (the build-time view). */
  ssrHtml: string
  /** Node/compile census snapshot for debugging exposure. */
  census: Census
}

export interface NodeInfo {
  nodeId: string
  cssId?: string
  propsId?: string
  type: string
  content?: unknown
  state: string
  inTree: boolean
  handlers: Array<{ name?: string; event?: string; phase?: string }>
}

export interface ListTargetsResult {
  nodes: NodeInfo[]
}

export interface NodeStateResult {
  nodeId: string
  /** The node's pass-2 resolved states (read-only snapshot, JSON-safe). */
  states: unknown[]
  census: Census
}

export interface Census {
  registered: number
  inTree: number
  unplaced: number
  destroyed: number
  prototypes: number
}

// ---- battery tool payloads (docs/specs/e2e-test-battery.md §3) -------------

export interface LoadResult {
  census: Census
  renderedHtml: string
  ssrHtml: string
  warnings: unknown[]
}

export interface LoadPayload {
  kind: 'envelope' | 'doc' | 'commands'
  envelope?: unknown
  doc?: unknown
  commands?: unknown[]
  userData?: unknown
}

export interface OpResult {
  status: string
  dirtied?: string[]
  minted?: string[]
  renderedHtml: string
  ssrHtml: string
  warnings: unknown[]
}

export interface ExportResult {
  export: unknown
  census: Census
}

export interface ValidateResult {
  valid: boolean
  censusMatch: boolean
  treeSigMatch: boolean
  warnings: unknown[]
}

export interface TeardownResult {
  census: Census
  renderedHtml: string
  warnings: unknown[]
}

export interface CodeGetResult {
  path: string
  value: unknown
}

export interface CodeSetResult {
  ok: boolean
  path: string
  wrote: unknown
}

export interface CodeCreateResult {
  ok: boolean
  path: string
  appendedAt: number
}

export interface CodeDeleteResult {
  ok: boolean
  removed: unknown
}

export interface CodeValidateResult {
  valid: boolean
  warnings: unknown[]
  shape: string
}

// ---- IPC request envelope ------------------------------------------------

export type RpcMethod =
  | 'dispatch'
  | 'renderedHtml'
  | 'listTargets'
  | 'nodeState'
  | 'load'
  | 'op'
  | 'export'
  | 'validate'
  | 'teardown'
  | 'code.get'
  | 'code.set'
  | 'code.create'
  | 'code.delete'
  | 'code.validate'
  | 'code.load'

export interface RpcRequest {
  id: number
  method: RpcMethod
  payload: unknown
}

export interface RpcReply {
  id: number
  ok: boolean
  value?: unknown
  error?: string
}

// IPC channel names
export const IPC_INVOKE = 'provident:invoke'
export const IPC_REPLY = 'provident:reply'
export const IPC_READY = 'provident:ready'

// ---- security settings IPC (the manual-UI surface, mcp-endpoint.md §6.4) ----

/** The persisted security config the manual-UI settings pane reads/writes.
 *  Transported main→renderer→main ONLY (never an MCP tool — an agent must not
 *  be able to grant itself capabilities). */
export interface SecuritySettings {
  token: string | null
  /** The enabled tool groups (`read`/`dispatch`/`graph`/`code`). */
  enabled: string[]
}

export const IPC_SECURITY_GET = 'provident:security:get'
export const IPC_SECURITY_SET = 'provident:security:set'
