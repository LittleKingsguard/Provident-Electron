# Base surface — the MCP tools, resources, runtime, wiring, bridge and gate model

Read this page first. It is the floor every other `docs/guide/` page stands on: the
tools an agent can call, the resources it can read, the dispatch path those calls
travel, the runtime methods at the end of that path, the renderer's wiring entry
points, the preload bridge that carries the reply back, and the group model that
decides whether any of it is registered at all.

Every name below exists in this tree. Where a fact was measured by a test, the test
is cited. Nothing here restates a spec clause: the contracts are cited by path and
section, and the spec governs if this page ever disagrees with it.

**Two things this page does not do, stated because their absence caused a real
miscommunication (`2026-10-04`).** This page covers **the base surface**, not every
mechanism: units with no page in this set — the two owned-host families among them —
carry their contracts in `docs/specs/*.md`, their fork-facing seams in
`docs/guide/seams.md`'s *"What a fork must supply"* table, and their fork-facing
recipes in `docs/FORKER.md` §4. And **a module header is not a clause**: the normative
text is the spec section (and, where an architect ruled, the `docs/decisions.md` ACTIVE
row cited by row name) — so when a header, a doc-comment or a page's scope paragraph
appears to settle a question of **what a mechanism accepts**, read the spec before
acting on it (`docs/guide/TEMPLATE.md`'s third rule; `docs/guide/README.md`'s *"Units
that have no page here"*).

## Code, runnable

### UC-1 — read the tool list an agent will actually see

A baseline consumer needs to know the surface **before** trusting a tool name. The
registered set is gate-derived, so ask the server object, not a remembered list:

```ts
// UC-1 — what this gate actually registers
import { ProvidentMcpServer } from '../src/main/mcp-server.js'
import { SecurityGate } from '../src/main/security.js'

const server = new ProvidentMcpServer({ backend, transport: 'stdio' })
server.allowedToolNames()
// default gate (read + dispatch ON): 8 names —
//   'provident.dispatch', 'provident.get_rendered_html', 'provident.get_markdown',
//   'provident.list_targets', 'provident.get_node_state', 'provident.code.get',
//   'provident.code.validate', 'provident.focus'
// (asserted by name in tests/focus-tool.test.ts:83-87, EXPECTED_DEFAULT_GATE_TOOLS)

const wide = new ProvidentMcpServer({
  backend,
  transport: 'stdio',
  gate: new SecurityGate({ token: null, enabled: ['read', 'dispatch', 'graph', 'code', 'module'] }),
})
wide.allowedToolNames() // the static 22 (plus any dynamic module:<name>.<tool> the router carries)
```

### UC-2 — dispatch a synthetic event and read what the graph now renders

```ts
// UC-2 — the goal #1 + goal #2 loop, over the tool payloads the SDK passes
// provident.dispatch arguments (src/main/mcp-server.ts:640-650)
const dispatch = { target: 'inc', event: 'click' }        // bare string = css.id resolution
// → backend.invoke('dispatch', { target, event })         (src/main/mcp-server.ts:652-658)
// → renderer: case 'dispatch' → runtime.dispatch(req.payload)  (src/renderer/renderer.ts:148-149)

const read = {}                                            // provident.get_rendered_html takes {}
// → runtime.renderedHtmlResult() → { renderedHtml, ssrHtml, census }
```

### UC-3 — drive the graph's lifecycle tools

```ts
// UC-3 — the graph group (OFF by default; a human grant enables it)
await call('provident.load', { kind: 'envelope', envelope, userData })  // { census, renderedHtml, ssrHtml, warnings }
await call('provident.op', { command })                                 // { status, dirtied?, minted?, renderedHtml, ssrHtml, warnings }
await call('provident.export', { format: 'legacy' })                    // { export, census }
await call('provident.validate', { kind: 'legacy', export: exported })  // { valid, censusMatch, treeSigMatch, warnings }
await call('provident.teardown', {})                                    // { census, renderedHtml, warnings }
await call('provident.journal', { action: 'undo' })                     // { status, scheduledDirtied, stackTopKind?, redoTopKind?, baseBoundary, renderedHtml, ssrHtml, warnings }
```

### UC-4 — author the envelope without touching the graph

```ts
// UC-4 — the code group (OFF by default). Paths are dot segments, with `key[i]` for arrays.
await call('provident.code.get', { path: 'template.root.hooks' })            // { path, value }
await call('provident.code.set', { path: 'template.root.content', value })   // { ok, path, wrote }
await call('provident.code.create', { path: 'template.root.hooks', entry })  // { ok, path, appendedAt }
await call('provident.code.delete', { path: 'template.root.hooks', index: 0 }) // { ok, removed }
await call('provident.code.validate', { envelope })                          // { valid, warnings, shape }
await call('provident.code.load', { envelope })                              // a LoadResult (re-derives the LIVE graph)
await call('provident.code.loadBatch', { ops: [
  { op: 'set', path: 'template.root.content', value: 'ready' },
  { op: 'create', path: 'template.root.hooks', entry: { name: 'onClick' } },
  { op: 'delete', path: 'template.root.hooks', index: 0 },
] })                                                                         // LoadResult + { ops: [{ op, path, status: 'applied' }] }
```

## Where it lives

| Surface | File | Exports / members |
| --- | --- | --- |
| MCP server | `src/main/mcp-server.ts` | `ProvidentMcpServer` (`ALL_TOOLS`, `ALL_RESOURCES`, `allowedToolNames`, `applyGatePatch`, `registeredEnabled`, `registeredResources`, `resourceEnabled`, `readResource`, `notifyGraphChanged`), `RendererBackend`, `invokeModuleTool`, `handleModuleTool`, `syncModuleRouter`, `toolForName`, `registeredToolNames`, `imageResult` |
| Main entry | `src/main/main.ts` | the `BrowserWindow` + `preload` wiring, the security/module IPC handlers, `mcp.start()` |
| Gate | `src/main/security.ts` | `ToolGroup`, `groupForTool`, `toolAllowed`, `moduleToolAllowed`, `defaultSecurityConfig`, `authorized`, `applyPatch`, `SecurityGate` |
| Shared contract | `src/shared/types.ts` | `RpcMethod`, `RpcRequest`, `RpcReply`, `DispatchRequest`/`Result`, `RenderedHtmlResult`, `MarkdownResult`, `ListTargetsResult`/`NodeInfo`, `NodeStateResult`, `Census`, `LoadResult`/`LoadPayload`, `OpResult`, `ExportResult`, `ValidateResult`, `TeardownResult`, `JournalResult`, `CodeGetResult`…`CodeLoadBatchResult`, the `IPC_*` channel constants |
| Renderer runtime | `src/renderer/runtime.ts` | `Runtime`, `RuntimeOptions` |
| Renderer wiring | `src/renderer/renderer.ts` | `handleRequest`, `startGutterAffordance`, `GutterWriteReading`, `themeWiringRole`, the module-private `MUTATING_METHODS` — plus the STORE-WAVE spine `getWiredGraphStore` (the wired tiered store), `createPaneDrag`/`PaneDragSurface`, `createFocusCarrier`/`FocusCarrierSurface`, `zoneSizeConstraint`/`zoneSizeRepair` |
| Preload bridge | `src/main/preload.ts` | `ProvidentBridge`, `ModuleBridgeResult`; `contextBridge.exposeInMainWorld('provident', bridge)` |
| Capabilities | `src/renderer/extensions.ts` | `CapabilityRouter`, `ModuleCtx` |

## The MCP tool set (22 static names)

`ProvidentMcpServer.ALL_TOOLS` (`src/main/mcp-server.ts:364-387`) carries **22**
names: 21 under the `provident.` prefix and the three-entry `module.*` family
(`module.install`, `module.update`, `module.list`). Arguments are the SDK
`inputSchema` keys; result shape is what the call resolves to (`text(...)` = one
MCP text content block holding `JSON.stringify(value, null, 2)` —
`src/main/mcp-server.ts:289-291`).

| Tool | Arguments | Backend method | Result |
| --- | --- | --- | --- |
| `provident.dispatch` | `{ target, event, args?, requestId? }` | `dispatch` | `{ results, dirtied, renderedHtml, ssrHtml }` |
| `provident.get_rendered_html` | `{}` | `renderedHtml` | `{ renderedHtml, ssrHtml, census }` |
| `provident.get_markdown` | `{}` | `markdown` | `{ markdown, census }` |
| `provident.list_targets` | `{}` | `listTargets` | `{ nodes: [{ nodeId, cssId?, propsId?, type, content, state, inTree, handlers }] }` |
| `provident.get_node_state` | `{ target }` | `nodeState` | `{ nodeId, states, census }` |
| `provident.focus` | `{ target?, newTab? }` (both optional; a member outside that set is refused) | `focus` | `{ activeId, entries, opened, refused?: { reason } }` |
| `provident.load` | `{ kind, envelope?, doc?, commands?, userData? }` | `load` | `{ census, renderedHtml, ssrHtml, warnings }` |
| `provident.op` | `{ command }` | `op` | `{ status, dirtied?, minted?, renderedHtml, ssrHtml, warnings }` |
| `provident.export` | `{ format: 'legacy' \| 'serialized' }` | `export` | `{ export, census }` |
| `provident.validate` | `{ kind, export }` | `validate` | `{ valid, censusMatch, treeSigMatch, warnings }` |
| `provident.teardown` | `{}` | `teardown` | `{ census, renderedHtml, warnings }` |
| `provident.journal` | `{ action: 'undo' \| 'redo' \| 'replay' }` | `journal` | `{ status, scheduledDirtied, stackTopKind?, redoTopKind?, baseBoundary, renderedHtml, ssrHtml, warnings }` |
| `provident.code.get` | `{ path }` | `code.get` | `{ path, value }` |
| `provident.code.validate` | `{ envelope? }` | `code.validate` | `{ valid, warnings, shape }` |
| `provident.code.set` | `{ path, value }` | `code.set` | `{ ok, path, wrote }` |
| `provident.code.create` | `{ path, entry }` | `code.create` | `{ ok, path, appendedAt }` |
| `provident.code.delete` | `{ path, index? }` | `code.delete` | `{ ok, removed }` |
| `provident.code.load` | `{ envelope? }` | `code.load` | a `LoadResult` |
| `provident.code.loadBatch` | `{ ops }` | `code.loadBatch` | `LoadResult` + `{ ops: [{ op, path, status }] }` |
| `module.install` | `{ name, source, version?, force? }` | *(main-process, not the renderer)* | `{ status: 'installed' \| 'no-op' \| 'rejected', name, version?, reason? }` |
| `module.update` | `{ name, source, version?, force? }` | *(main-process)* | `{ status: 'updated', name, version }` |
| `module.list` | `{}` | *(main-process)* | `[{ name, version, capabilities, disabled, quarantined }]` |

The `module:*` family is **not** in `ALL_TOOLS`: dynamic `module:<name>.<tool>`
names come from `CapabilityRouter.listTools()` and are appended by
`allowedToolNames()` when the `module` group is enabled
(`src/main/mcp-server.ts:391-403`).

## The dispatch path (one call, end to end)

1. **MCP SDK → handler.** `registerTool(name, {…}, async (args) => …)` in
   `ProvidentMcpServer.registerTools` (`src/main/mcp-server.ts:620-838`).
2. **Handler → backend seam.** `backend.invoke(<method>, payload)` — the
   `McpBackend` interface (`src/main/mcp-server.ts:284-286`).
3. **Backend → IPC.** `RendererBackend.invoke` (`src/main/mcp-server.ts:1114-1157`)
   waits on the readiness gate (default `readyTimeoutMs` 30000, `renderer not ready
   (timeout <n>ms)`), builds `RpcRequest { id, method, payload }`, and sends it on
   the literal channel `'provident:invoke'` (`= IPC_INVOKE`).
4. **Preload → renderer.** the page's `window.provident.onRequest(handler)` delivers
   the request (`src/main/preload.ts:35-39`).
5. **Renderer router.** `handleRequest(runtime, req, notify)`
   (`src/renderer/renderer.ts:143-237`) switches on `req.method` and calls the
   `Runtime` method; the reply is `{ id, ok: true, value }` or
   `{ id, ok: false, error }`.
6. **Reply back.** the page calls `bridge.sendReply(reply)` → `IPC_REPLY` →
   `RendererBackend.handleReply`, which resolves the pending entry (or rejects with
   `reply.error`) — and runs `maybeDigest` first: a `renderedHtml`/`ssrHtml` pair
   larger than `largePayloadBytes` (default 1_000_000) is replaced by
   `{ census, digest, preview, truncated: true }` (`src/main/mcp-server.ts:1168-1200`).
7. **Push (post-reply).** a **mutating** method additionally fires
   `notify({ uri: 'mcp://provident/app' })` (`src/renderer/renderer.ts:228-236`),
   which main maps through `mcp.notifyGraphChanged()` — stdio-only, and a no-op when
   the `read` group is off (`src/main/mcp-server.ts:572-586`).

Two argument-shape traps on this path, both measured:

- `provident.op` registers its argument as `command`, while the in-process battery
  host calls `runtime.op(p.command)`. The renderer therefore unwraps
  `(payload?.command ?? payload)` before calling the runtime
  (`src/renderer/renderer.ts:167-172`).
- `provident.get_node_state` and `provident.dispatch` both forward `target`
  unchanged, so the same three vocabularies (`cssId` / `nodeId` / `wire`, or a bare
  string) are what the runtime resolves.

## The code tools

Seven `provident.code.*` names. `code.get` and `code.validate` are **read**-group;
`code.set`, `code.create`, `code.delete`, `code.load` and `code.loadBatch` are
**code**-group (`src/main/security.ts:6-27`). They operate on the **envelope**
(held by the Runtime as `this.envelope`, set by `loadEnvelope`), not on the graph —
except `code.load` / `code.loadBatch`, which re-derive the live graph through the
A2 envelope path. `codeLoadBatch` is all-or-nothing: ops apply to a
`structuredClone` of the envelope and the clone is committed only on full success
(`src/renderer/runtime.ts:1098-1161`). A host guard worth knowing: `code.load`
refuses a structurally-invalid envelope up front rather than loading a root-only
graph, throwing `code.load: envelope invalid (<code>); not applied`
(`src/renderer/runtime.ts:1075-1096`).

## The module tools

Three `module.*` names are handled **in main**, against the persisted `node:fs`
store — they never route to the renderer (`src/main/mcp-server.ts:132-187`).
`module.install` / `module.update` carry an executable entry, so they are
trusted-equivalent to `code` and register only when **both** `module` and `code`
are enabled (`src/main/mcp-server.ts:258-280`); `module.list` needs `module` only.
The same two-gate is enforced at **every invocation** of a dynamic
`module:<name>.<tool>` tool by `moduleToolAllowed(toolName, enabled, { executable:
true })` (`src/main/mcp-server.ts:34-44`). After a successful install/update the
live router is re-synced from the store by `syncModuleRouter`
(`src/main/mcp-server.ts:202-219`); the module's entry source is **not** evaluated
there — declared capability names are registered with a pass-through handler, which
the source states as a documented follow-on.

## The resources (3)

`ProvidentMcpServer.ALL_RESOURCES` (`src/main/mcp-server.ts:426-430`), each mirroring
a `read`-group tool and each registered **only when its group is allowed**:

| Name | URI | mimeType | Read method |
| --- | --- | --- | --- |
| `app` | `mcp://provident/app` | `text/html` | `renderedHtml` |
| `targets` | `mcp://provident/targets` | `application/json` | `listTargets` |
| `node` | `mcp://provident/node/{nodeId}` (template) | `application/json` | `nodeState` |

Reads forward over the same `backend` invoke seam the tools use, and a
`node/{nodeId}` read decodes the variable and resolves it against the live in-tree
graph. `readResource(uri)` (`src/main/mcp-server.ts:515-538`) is the test seam that
invokes a registered resource's callback by URI. Contract:
`docs/specs/mcp-endpoint.md` §3.7.

## The runtime's methods

`Runtime` (`src/renderer/runtime.ts:74`) is constructed with
`{ mount, envelope, maxJournalLength?, transformRouter? }` and bootstrapped once
with `runtime.bootstrap()`.

| Method | Contract |
| --- | --- |
| `bootstrap(): void` | the one bootstrap render |
| `dispatch(req: DispatchRequest): Promise<DispatchResult>` | `supervisor.dispatchAndReport` → refresh the render baseline → re-render |
| `renderedHtmlResult(): RenderedHtmlResult` | live DOM + SSR re-emit + census |
| `markdownResult(): MarkdownResult` | a fresh `MarkdownAdapter` per call |
| `listTargets(): ListTargetsResult` | in-tree, not-destroyed nodes only |
| `nodeState(target): NodeStateResult` | JSON-safe projection of the resolved states (anchors become plain data) |
| `load(req: LoadPayload): LoadResult` | envelope / doc / commands |
| `loadEnvelope(envelope, opts?): Census` / `loadDoc(doc): Census` | the two load paths |
| `op(cmd): OpResult` / `applyCommand(cmd)` | one managed-channel op |
| `export(format): ExportResult` / `exportLegacy()` / `exportSerialized()` | no mutation |
| `validate(kind, exp): ValidateResult` | against a throwaway graph, never the live one |
| `teardown(): Census` / `teardownResult(): Promise<TeardownResult>` | root-only reset; the async form awaits the settle gate |
| `journal(action): Promise<JournalResult>` | `supervisor.undo()`/`redo()`/`replay()` |
| `codeGet` / `codeSet` / `codeCreate` / `codeDelete` / `codeValidate` / `codeLoad` / `codeLoadBatch` | the envelope CRUD surface |
| `elementForNodeId(id): unknown \| null` | resolve the emitted element for a graph node (the gutter wiring's graph read) |
| `hasPendingWork(): boolean` | the settle-gate reading |

## The renderer wiring's entry points

`src/renderer/renderer.ts` runs `main()` on `DOMContentLoaded`: it requires
`#app`, reads `window.provident`, calls `bridge.security.get()` for
`maxJournalLength`, then — **the STORE WAVE interposes the tier-1 store boot between
the security read and the Runtime construction** — hands off `bridge.store.get()` (the
Y-1 `FILE_TIER_ROOT_NAMES` hand-off), constructs the ONE wired store
(`getWiredGraphStore({ declarations, crossing })`), calls `wired.hydrate(bootHandoff)`,
and builds `createFocusCarrier(wired)`; only after that does it construct
`new Runtime({ mount, envelope: demoEnvelope(), maxJournalLength })` and call
`runtime.bootstrap()`, then `startGutterAffordance(runtime)`
**before** the bridge check (the affordance is app UI, not an MCP surface), registers
the Y-3 `bridge.store.onFileChanged(…)` listener, mounts
`SecurePanels` into `#panes`, subscribes with `bridge.onRequest(…)`, and finally
calls `bridge.ready()`.

Exported wiring entry points:

- `handleRequest(runtime, req, notify)` — the IPC dispatch router.
- `startGutterAffordance(runtime)` — `{ attached, writes }`; resolves
  `GUTTER_AFFORDANCE_ID` / `GUTTER_TARGET_ID` through `Runtime.elementForNodeId`,
  builds the session + `createGutterAffordance(...)` with `gutterSeamExample()`
  seams, and records every commit write's runtime-answered `status`.
- `themeWiringRole(runtime)` — `[attributeName, stateNodeId]`; deliberately inert,
  it holds the caller's attribute name and derives the authored state node id from
  the envelope.

Two structural facts about this file: `MUTATING_METHODS` is a **seven**-member set
of IPC methods (`src/renderer/renderer.ts:105`) — see the next section — and the
focus route's holder is the STORE MIRROR — `mem.focus.entries` / `mem.focus.activeId` read through the store (the `U-STORE-FOCUS` re-home removed the module-level `const holder`; the wiring holds only the `focusCarrier` binding + closures), never a graph slice.

## The preload bridge

`src/main/preload.ts` exposes exactly one object through
`contextBridge.exposeInMainWorld('provident', bridge)`, with
`contextIsolation: true` and `nodeIntegration: false`
(`src/main/main.ts:158-166`) — no Node object reaches the page.

```ts
export interface ProvidentBridge {
  ready(): void                                   // → IPC_READY
  onRequest(handler: (req: RpcRequest) => void): void   // ← IPC_INVOKE
  sendReply(reply: RpcReply): void                // → IPC_REPLY
  notify(payload: NotifyPayload): void            // → IPC_NOTIFY
  security: { get(): Promise<SecuritySettings>; set(patch): Promise<SecuritySettings> }
  module: { get(): Promise<ModuleBridgeResult>; setDisabled(name, disabled): Promise<ModuleBridgeResult> }
}
```

Channels (`src/shared/types.ts:297-328`): `provident:invoke`, `provident:reply`,
`provident:ready`, `provident:notify`, `provident:security:get`,
`provident:security:set`, `provident:module:get`, `provident:module:set-disabled`,
plus the STORE-WAVE `store.*` namespace in `src/main/store-channels.ts`/`preload.ts` —
`provident:store:file:get`, `provident:store:file:put`, `provident:store:file:changed`
(the tier-1 file persistence hand-off the wiring boot requires).

**A boundary worth stating explicitly:** `security.*` and `module.*` on the bridge
are **manual-UI only**. The MCP tool handlers never route to those channels, so an
agent cannot grant itself capabilities (`src/main/preload.ts:49-69`,
`src/main/main.ts:89-127`).

## The gate / group model

**The group set is FIVE, and the mutating set is SEVEN.** Both asserted by name,
with the source:

**Five groups** — `ToolGroup = 'read' | 'dispatch' | 'graph' | 'code' | 'module'`
(`src/main/security.ts:3`), pinned as a name set by `VALID_GROUPS`
(`src/main/security.ts:138`). Membership (`src/main/security.ts:5-42`):

| Group | Tools | Default |
| --- | --- | --- |
| `read` | `provident.get_rendered_html`, `provident.get_markdown`, `provident.list_targets`, `provident.get_node_state`, `provident.code.get`, `provident.code.validate`, + the 3 `resource:*` keys | **ON** |
| `dispatch` | `provident.dispatch`, `provident.focus` | **ON** |
| `graph` | `provident.load`, `provident.op`, `provident.export`, `provident.validate`, `provident.teardown`, `provident.journal` | OFF |
| `code` | `provident.code.set`, `provident.code.create`, `provident.code.delete`, `provident.code.load`, `provident.code.loadBatch` | OFF |
| `module` | `module.install`, `module.update`, `module.list`, `module.disable`, `module.enable` | OFF |

`defaultSecurityConfig()` is `{ token: null, enabled: ['read', 'dispatch'] }`
(`src/main/security.ts:86-88`). A name not in the map resolves to `null` — except a
`module:<name>.<tool>` name, which resolves to `module` by **prefix**; the bare
`module:` prefix is malformed and denied (`src/main/security.ts:44-55`).

**Seven mutating methods** — `MUTATING_METHODS` is
`Set(['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch',
'journal'])` (`src/renderer/renderer.ts:105`) — seven names, and the push predicate is
keyed on membership, so `focus` deliberately never notifies. Pinned by name-set
equality in `tests/gutter.test.ts:4056`, `tests/zones.test.ts:2188`,
`tests/focus-tool.test.ts:583`, `tests/gesture-session.test.ts:5496`. Note that the
`module:*` names in the two-gate rows above do **not** appear in
`MUTATING_METHODS`: they are main-process calls, not renderer IPC methods.

**Where a group takes effect:** registration (`registeredToolNames`,
`src/main/mcp-server.ts:258-280` — which also applies the `module` AND `code`
two-gate for `module.install`/`module.update`), resources
(`allowedResourceUris`, `src/main/mcp-server.ts:433-435`), HTTP auth before any tool
runs (401, `src/main/mcp-server.ts:927-932`), and a **live re-gate** through
`applyGatePatch` — which toggles the captured `RegisteredTool` handles, toggles the
captured resource handles, and **registers newly-allowed** tools/resources on the
long-lived stdio server (`src/main/mcp-server.ts:437-478`).

Contract for the gate: `docs/specs/mcp-endpoint.md` §6.1-§6.4. Note that §6.2's
table was filed **before** `U-FOCUS-TOOL`: it lists four groups and no `focus` row,
while the landed code carries five and `provident.focus` in `dispatch`. The spec
governs; a fork comparing the two should read §6.2 as the filing-time state and
`src/main/security.ts` as the landed one. (`unverified`: whether a later pass
amended §6.2's table — this page's pass read §6.2 but not every section of that
file.)

## What it refuses / does not do

- A tool whose group is disabled is **not registered**, not listed, and never runs
  (`docs/specs/mcp-endpoint.md` §6.2). There is no always-registered bypass door
  for resources either (§3.7).
- A tool name outside the `provident.` prefix never registers: `toolForName` throws
  on a missing prefix, on an empty rest after the prefix, and on a doubled prefix
  (`src/main/mcp-server.ts:237-250`).
- The HTTP transport is **stateless** — a fresh `McpServer` + transport per POST,
  GET/DELETE answered 405 — so a push notification is a no-op there
  (`src/main/mcp-server.ts:897-907`, §2).
- `provident.get_markdown` is non-interactive: `on:*` and `data:*` props (including
  `data-node-id`) are dropped, so there is no element→node mapping in the markdown
  output (§3.3).
- `module:*` dynamic tools do **not** execute the module's entry source; declared
  tool names are registered with a pass-through handler
  (`src/main/mcp-server.ts:196-201`).

## What a fork must supply

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `McpBackend.invoke(method, payload)` | REQUIRED | the fork's host | nothing serves the tool; the registration is dead weight | not applicable — a TS interface method | the `RpcReply.ok:false` error surfaces to the SDK call |
| `--mcp-transport=` / `PROVIDENT_MCP_TRANSPORT` | OPTIONAL | the fork's launcher | defaults to `'http'` (`src/main/main.ts:19-28`) | an unrecognised value falls through to the default | not applicable (argv string scan) |
| `--mcp-port=` / `PROVIDENT_MCP_PORT` | OPTIONAL | the fork's launcher | defaults to `3787` (`src/main/mcp-server.ts:352`) | `Number(NaN)` is not finite → default | not applicable |
| `--provident-user-data=` | OPTIONAL | the fork's launcher | the store paths keep their `app.getPath('userData')` derivation (`src/main/main.ts:48-64`) | an empty value reads as absent | not applicable |
| `window.provident` (the preload bridge) | REQUIRED for MCP | the fork's preload wiring | the renderer logs `no preload bridge — MCP endpoints unavailable` and returns; the app UI still boots (`src/renderer/renderer.ts:370-373`) | a bridge without `security` skips the config read and keeps the default journal length (`src/renderer/renderer.ts:354-362`) | `bridge.security.get()` is wrapped in try/catch and keeps the default; `bridge.sendReply` is **not** guarded — **unverified** how a throwing `sendReply` is observed |

The authoritative seam contracts are `docs/specs/mcp-endpoint.md` §2 (transports)
and §6 (security), and the per-unit specs aggregated by `docs/guide/seams.md`.

## Gotchas measured in this repo

- The default gate registers **8** tools by name (7 before `U-FOCUS-TOOL`), while
  `ALL_TOOLS` carries **22** — `allowedToolNames()` is the only honest source for
  "what will an agent see" (`tests/focus-tool.test.ts:83-87`, `:726-731`).
- `provident.op`'s argument is wrapped: the renderer unwraps `{ command }` before
  `runtime.op(...)`, because the MCP tool and the in-process battery host disagree
  about the payload shape (`src/renderer/renderer.ts:167-172`).
- `provident.get_node_state` projects compiled states into a JSON-safe mirror:
  engine anchors carry **live circular Node/Link references** and would not survive
  MCP serialization otherwise (`src/renderer/runtime.ts:1271-1316`).
- A large `renderedHtml`/`ssrHtml` never crosses IPC whole — the backend swaps it
  for `{ census, digest, preview, truncated }` at 1 MB by default, so a consumer
  must handle the truncated shape (`src/main/mcp-server.ts:1168-1200`).
- `applyGatePatch` widens a **running** stdio server (registering newly-allowed
  tools/resources) but the HTTP path rebuilds per request, so widening is automatic
  there and the two transports reach the same gate by different routes
  (`src/main/mcp-server.ts:459-476`).
- `startGutterAffordance` records each commit write with the runtime's own
  `{status}`, because the earlier form discarded a `{status:'rejected'}` answer and
  turned a refused write into a silent no-op (`src/renderer/renderer.ts:65-94`).
- The `module` / `code` two-gate is checked **twice** — at registration and at each
  invocation — so disabling `code` leaves a `module:*` tool uncallable even for a
  module-only agent (`src/main/mcp-server.ts:34-44`, `:409-420`).

## See also

- `docs/guide/README.md` — the index and reading order.
- `docs/guide/TEMPLATE.md` — the binding page template.
- `docs/specs/mcp-endpoint.md` — the MCP endpoint contract (§2, §3, §4, §6).
- `docs/specs/mcp-server-gate.md`, `docs/specs/mcp-resources-review.md` — the gate
  and resource reviews named in the source comments.
- `docs/next-steps.md` — the ledger (`30 DONE / 0 open` UNITS = 30, the store wave closed it at `## DONE — U-STORE-SECURITY`) and the DONE rows.
