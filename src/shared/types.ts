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

// ---- IPC request envelope ------------------------------------------------

export type RpcMethod =
  | 'dispatch'
  | 'renderedHtml'
  | 'listTargets'
  | 'nodeState'

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
