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

/** 0.2 Feature 2 — the MarkdownAdapter endpoint result (`provident.get_markdown`):
 *  the simplified text-only output document for agentic consumers. */
export interface MarkdownResult {
  /** The markdown text re-emitted from the current graph (non-interactive:
   *  on:* and data:* props dropped). */
  markdown: string
  /** Node/compile census snapshot. */
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

/** J (journal-endpoint-review.md J2/J3) — the `provident.journal` result. The
 *  engine's `UndoRedoReport` (provident-ssr 0.2.1) is surfaced faithfully:
 *  `status` ('applied'|'no-op'|'base-boundary'), `scheduledDirtied` (the
 *  markPass2-SCHEDULED pending-flush set), `stackTopKind`/`redoTopKind`, and
 *  `baseBoundary`. The host re-renders after the op and returns both views +
 *  warnings. */
export interface JournalResult {
  status: 'applied' | 'no-op' | 'base-boundary'
  /** The markPass2-SCHEDULED (pending-flush) set from the engine report. */
  scheduledDirtied: string[]
  /** kind of the post-op undoStack top (next undoable), if any. */
  stackTopKind?: string
  /** kind of the post-op redoStack top, if any (replay may clear it). */
  redoTopKind?: string
  /** true when the undo cursor sits at the condensed base. */
  baseBoundary: boolean
  /** The live `#app` innerHTML after the re-render. */
  renderedHtml: string
  /** The SSR re-emit (SSRFragmentAdapter) after the re-render. */
  ssrHtml: string
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

/** B4 (loadbatch-review.md) — a single `code.loadBatch` op. A discriminated
 *  union: `set`/`create`/`delete`, mirroring the individual `code.*` tools.
 *  The `delete` addressing rule (path-index vs `index` arg, mutually exclusive)
 *  is pinned. */
export type CodeBatchOp =
  | { op: 'set'; path: string; value: unknown }
  | { op: 'create'; path: string; entry: unknown }
  | { op: 'delete'; path: string; index?: number }

/** B5 — the `code.loadBatch` result: the re-derive `LoadResult` + a per-op
 *  status array (or, on rejection, the failing op index + code). */
export interface CodeLoadBatchResult extends LoadResult {
  /** per-op status, in order (`applied` for each successful op). */
  ops: Array<{ op: string; path: string; status: 'applied' }>
}

// ---- module.* extension system (docs/specs/module-import-proposal.md §2/§3) --

/** A module's declared capability surface. */
export interface ModuleCapabilities {
  tools?: string[]
  hooks?: string[]
  transforms?: string[]
}

/** A module dependency (M-r9 — declared, no resolver this pass). */
export interface ModuleDependency {
  name: string
  versionRange: string
}

/** The loaded-module contract (module-import-proposal.md §2). */
export interface ModuleManifest {
  name: string
  version: string
  capabilities: ModuleCapabilities
  /** Executable host-side JS (function-STRING). Requires the `code` group. */
  entry?: string
  /** True if `entry` carries executable code (authoritative: entry !== ''). */
  needsCode?: boolean
  /** Declared deps (M-r9 — no resolver; a dep on an absent module is a no-op). */
  dependsOn?: ModuleDependency[]
}

/** The `module.install`/`module.update` payload. */
export interface ModuleInstallPayload {
  name: string
  source: string
  version?: string
  force?: boolean
}

/** The `module.install`/`module.update` result. */
export interface ModuleInstallResult {
  status: 'installed' | 'updated' | 'no-op' | 'rejected'
  name: string
  version?: string
  reason?: string
}

/** A listed module (module.list). */
export interface ModuleListEntry {
  name: string
  version: string
  capabilities?: ModuleCapabilities
  disabled?: boolean
  quarantined?: boolean
}

// ---- IPC request envelope ------------------------------------------------

export type RpcMethod =
  | 'dispatch'
  | 'renderedHtml'
  | 'markdown'
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
  | 'code.loadBatch'
  | 'journal'
  | 'module.install'
  | 'module.update'
  | 'module.list'
  | 'focus'
  | 'data.read'
  | 'data.write'
  | 'data.delete'
  | 'data.list'
  | 'data.journal'

/** The tab record's one row, as it crosses the bridge (D-63; `docs/L2/store-tabs-record/interface.md` §2).
 *  **IT IS THE RECORD'S MEMBER AND NOT A PATH LEAF** (`D-93`): the record stands at `['tabs']` on the normal crossing as
 *  `{order, <id>: row}`, so `id` is a MEMBER KEY of one flat family and this record is its value. The `file.tabs.<id>`
 *  spelling this line used to carry was the FROZEN graph store's address, and that address space is deleted — a dotted key
 *  is a character in a member name now, not a deeper path segment (`D-92`'s deletion of the `'dotted-id'` reason). */
export interface TabsRecordRow {
  readonly id: string
  /** The tab's contained content reference — the data object it holds (constraint `tab-has-content`). */
  readonly target: string
  readonly active: boolean
  readonly error?: string
  /** The tab's title (constraint `tab-has-title`): a non-empty string, repaired to `'untitled'`. */
  readonly label?: string
  /** When the tab last became active (constraint `tab-has-lastActiveAt`): an ISO timestamp, repaired to now. */
  readonly lastActiveAt?: string
}

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
/** N4 (live-notification-review.md) — the renderer→main "app graph changed"
 *  push channel. Sourced ONLY from the app Runtime re-render (never the
 *  isolated SecurePanels graph — an operator action must not leak to the
 *  agent through a push). The MCP server maps it into a resource-updated
 *  notification over stdio. */
export const IPC_NOTIFY = 'provident:notify'
export interface NotifyPayload {
  /** the changed resource URI (e.g. `mcp://provident/app`) */
  uri: string
}

// ---- security settings IPC (the manual-UI surface, mcp-endpoint.md §6.4) ----

/** The persisted security config the manual-UI settings pane reads/writes.
 *  Transported main→renderer→main ONLY (never an MCP tool — an agent must not
 *  be able to grant itself capabilities). */
export interface SecuritySettings {
  token: string | null
  /** The enabled tool groups — the gate's own `ToolGroup` union, six wide; this member spells none of them
   *  (D-3: a second list would drift, and it did — four names stood here while six existed). */
  enabled: string[]
  /** Maximum journal entries before auto-condense (undefined = never condense).
   *  Passed to the provident-ssr Supervisor constructor. */
  maxJournalLength?: number
}

export const IPC_SECURITY_GET = 'provident:security:get'
export const IPC_SECURITY_SET = 'provident:security:set'
/** **THE SECURITY RECORD'S CHANGE PUSH** (`D-106`; the rule `D-104` read as the architecture — *"the renderer does not
 *  ask state, it listens. If it needs to ask, it does so within a listener."*). It carries NO request, so it has no
 *  `ipcMain.handle` site: the secure crossing's record and exclusion addresses — the two the instance's one subscription
 *  has always bound — cross the boundary as a SIGNAL, exactly as `IPC_TABS_CHANGED`, `IPC_VIEW_CHANGED` and
 *  `IPC_MODULE_CHANGED` carry theirs. The address and the value stay on the main side and the renderer's listener answers
 *  with its own re-read. **ONE CHANNEL FOR BOTH ADDRESSES, BECAUSE IT CARRIES NEITHER**: which of the two moved is the
 *  main side's business, and the realm's only correct answer to either is the whole record's read. **THIS FILE NAMES NO
 *  ADDRESS** (`ISO-5`/`ISO-6`). */
export const IPC_SECURITY_CHANGED = 'provident:security:changed'
export const IPC_MODULE_GET = 'provident:module:get'
export const IPC_MODULE_SET_DISABLED = 'provident:module:set-disabled'
/** **THE APP-STATE ROWS' CHANGE PUSH** (`D-104`; closing `D-82`'s `V3`). It carries NO request, so it has no
 *  `ipcMain.handle` site: it is the secure crossing's third address — the rows the module registry's leaves stand in —
 *  crossing the boundary as a SIGNAL, exactly as `IPC_TABS_CHANGED` and `IPC_VIEW_CHANGED` carry theirs. The address and the
 *  value stay on the main side and the renderer's listener answers with its own re-read. **THIS FILE NAMES NO ADDRESS**
 *  (`ISO-5`/`ISO-6`: the MCP stack's import closure reaches this module, so an address spelled here would be an address
 *  one MCP-reachable file could name). */
export const IPC_MODULE_CHANGED = 'provident:module:changed'
/** **THE FIVE `data.*` ROUTES' CHANNEL NAMES** (`D-112`; `docs/L2/central-data/interface.md` §5). Five REQUESTS, each
 *  carrying an argument object and each with its own `ipcMain.handle` site, exactly as the tab record's three and the view
 *  record's five do — the routes `RpcMethod` has declared since `D-11` and that no realm could reach until this file named
 *  the channels for them. **THE SIXTH NAME THE CROSSINGS BESIDE THEM CARRY IS DELIBERATELY ABSENT, AND THE ABSENCE IS THE
 *  RECORD**: a `data.*` change push. A write at a root a crossing declares changes THAT FAMILY, whose own listener already
 *  delivers (`IPC_TABS_CHANGED` / `IPC_VIEW_CHANGED`); a write anywhere else changes no family and no rendered surface at
 *  all, because this module renders nothing (`interface.md` §7) — so a signal here would either duplicate one of those two
 *  or tell a realm that nothing it can read moved. **AND IT WOULD BE A CONSUMER OF A `data.*` CHANGE, WHICH IS EXACTLY WHAT
 *  `D-107` READ THE CELL `N/A` FOR NOT EXISTING**: the clause-2 revival condition is a new address in a family's listener
 *  set, never a listener hung off `data.*`, so this pass adds the routes and adds no listener. `bridge-route.test.ts`
 *  asserts the absence over comment-elided code. **THIS FILE NAMES NO ADDRESS** (`ISO-5`/`ISO-6`). */
export const IPC_DATA_READ = 'provident:data:read'
export const IPC_DATA_WRITE = 'provident:data:write'
export const IPC_DATA_DELETE = 'provident:data:delete'
export const IPC_DATA_LIST = 'provident:data:list'
export const IPC_DATA_JOURNAL = 'provident:data:journal'
