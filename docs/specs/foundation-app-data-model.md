# The foundation app data model — where values live, from `main` inward

Status: **RESEARCH RECORD — FILED 2026-10-01.** Read-only architecture research: **no unit, no
spec-of-behaviour, no red set, no register, no leg.** This document **describes what is** and
**does not propose a redesign**; its only forward-looking section is `§6`, which answers *where a
new value would lawfully live under the existing rules*.

**WHAT THIS DOCUMENT IS.** The architect asked, verbatim:

> *"Present the current architecture in terms of where data/values are stored within the foundation
> app model, starting from main and encapsulating down."*

This file is the answer: **a storage/authority map of `Provident-Electron`**, read from the process
entry point inward, with every claim anchored to a `file:symbol` or to a spec section / decision row.

**LAYER LABELS, CARRIED FROM THE REPO'S OWN DECLARATION (`docs/specs/ci-ui-leg.md`, *Layer
declaration*).** Every behavioural claim below carries one, and **no claim may be read on a layer it
does not carry**:

| Label | Layer | What it is |
| --- | --- | --- |
| `[T]` | node suite / pure module | the repo's vitest files under the shim; **never assembled-app evidence** (no window, no IPC, no transport) |
| `[H]` | host-side | this repo's `src/**` — the main process, the preload, the renderer wiring |
| `[X]` | shim leg | the DOM shim (`src/shared/dom-shim.ts`) and the shim battery host (`src/main/battery-host.ts`) |
| `[A]` | divergence leg | `npm run divergence` — structural-surfaces-only identity evidence; never IPC-layer |
| `[U]` | real-DOM leg | `npm run ui` — a real `BrowserWindow` under a scratch profile; **not the packaged app** |
| `APP` | assembled app | a reading taken from the running assembled Electron app (boot + key DOM). **No such reading exists in this pass.** |

**THE HONEST HEADLINE, STATED FIRST SO NO READER INFERS IT LATER:** *this pass ran no suite, no leg,
no `tsc`, no build, no Electron boot and no git command* (`§8`). Everything in `§1`–`§7` is **a file
read** — from `src/**`, from the built `dist/**` tree present in the repo, and from `docs/**`.

---

## §1. The boot chain, in order

From process launch to first rendered frame. **`B` marks a boundary crossing.**

| # | Step | `file:symbol` | State this step CREATES |
| --- | --- | --- | --- |
| 1 | Electron resolves `package.json`'s `main` → `dist/main/main.cjs` | `package.json` `main` | — |
| 2 | `app.whenReady()` fires; the callback runs `main()` | `src/main/main.ts` `app.whenReady().then(...)` → `main()` | the app object's own state (Electron-owned) |
| 3 | **B (process argv → main):** scan `process.argv` for `--provident-user-data=` | `src/main/main.ts` `userDataFromArgs(argv, flagName)` | the local `userDataOverride` (**per-process, discarded after `main()` returns**) |
| 4 | `app.setPath('userData', <override>)` — **only when the flag is present** | `src/main/main.ts` `main()` | Electron's userData path becomes the override; **absent ⇒ nothing changes** (`docs/specs/ci-ui-leg.md` §4 `ADD-2`; the `SEAM-1` row) |
| 5 | Scan `--mcp-transport=` / `PROVIDENT_MCP_TRANSPORT`, then `--mcp-port=` / `PROVIDENT_MCP_PORT` | `src/main/main.ts` `transportFromArgs` · `portFromArgs` | `transport: 'http' \| 'stdio'` (**default `http`**), `port` (**default 3787**) |
| 6 | Read the persisted operator security config | `src/main/main.ts` `createSecurityStore({ path: join(app.getPath('userData'), 'provident-security.json') })` → `src/main/security-store.ts` `createSecurityStore` | **the closure variable `current: SecuritySettings`** (in-memory) + the boot read of `provident-security.json` from disk. Defaults on a missing **or corrupt** file: `{token: null, enabled: ['read','dispatch'], maxJournalLength: undefined}` |
| 7 | Build the security gate from that read | `src/main/main.ts` `main()` → `new SecurityGate({token, enabled})` → `src/main/security.ts` `SecurityGate.constructor` | the gate's own `_config` (in-memory; a **fresh array copy**, never an alias) |
| 8 | Construct the renderer backend | `src/main/main.ts` `new RendererBackend()` → `src/main/mcp-server.ts` `RendererBackend.constructor` | `readyPromise`, `ready=false`, `firstLoadSeen=false`, `seq=0`, `pending = new Map()`, `window=null`, and the three timeouts (**30000 / 60000 / 1 000 000**, literals in the constructor) |
| 9 | Read the persisted module registry | `src/main/main.ts` `createModuleStore({ path: join(app.getPath('userData'), 'provident-modules.json') })` → `src/main/module-store.ts` `createModuleStore` → `load(path)` | **the `records: Map<string, ModuleRecord>`** + `quarantinedAtBoot: Set<string>` + the boot-derived `corrupt` flag. **Fail-disabled:** a corrupt or non-array file boots to **empty** + `corrupt: true` (never a partial registry) |
| 10 | Build + sync the live capability router | `src/main/main.ts` `new CapabilityRouter()` → `syncModuleRouter(moduleRouter, moduleStore)` → `src/main/mcp-server.ts` `syncModuleRouter` | the router's `tools` Map, `hooks[]`, `transforms[]`, `modules` Set (`src/renderer/extensions.ts` `CapabilityRouter`) — **`router.clear()` first**, then one registration per active module's declared tool names, each with a **pass-through echo handler** |
| 11 | Construct the MCP server | `src/main/main.ts` `new ProvidentMcpServer({backend, transport, port, gate, moduleStore, router: moduleRouter})` | `registered = new Map()`, `resources = new Map()`, `httpServers = new Set()`, `stdioServer=null`, `server=null`, `httpServer=null`, `_gate` |
| 12 | Register the manual-UI IPC handlers | `src/main/main.ts` `ipcMain.handle(IPC_SECURITY_GET \| IPC_SECURITY_SET \| IPC_MODULE_GET \| IPC_MODULE_SET_DISABLED)` | four live `ipcMain` handler registrations. **The security handler re-gates the LIVE MCP server** (`mcp.applyGatePatch`) and re-persists; the module handler re-syncs the router |
| 13 | Install the stdio disconnect watchers (**stdio transport only**) | `src/main/main.ts` `process.stdin.on('end' \| 'error')` | two listeners; **they exist so a spawned test run leaks no Electron instance** |
| 14 | Register the renderer-facing IPC listeners | `src/main/main.ts` `ipcMain.on(IPC_READY \| IPC_REPLY \| IPC_NOTIFY)` | three listeners → `backend.markReady()` / `backend.handleReply(reply)` / `void mcp.notifyGraphChanged()` |
| 15 | Create the window | `src/main/main.ts` `new BrowserWindow({width: 980, height: 720, webPreferences: {preload: join(here,'preload.cjs'), contextIsolation: true, nodeIntegration: false}})` | **the window and its geometry — literals, never restored, never persisted** |
| 16 | Attach the window to the backend | `src/main/main.ts` `backend.attachWindow(win)` → `src/main/mcp-server.ts` `RendererBackend.attachWindow` | `this.window = win` + three reset listeners (`did-finish-load` / `closed` / `destroyed`) → `rearm()` → `handleReset()` |
| 17 | **B (main → renderer):** load the page | `src/main/main.ts` `await win.loadFile(join(here, '..', 'renderer', 'index.html'))` | the renderer realm, its DOM, and the `#app` / `#panes` mounts (`src/renderer/index.html`) |
| 18 | **B (main → preload):** the preload bundle runs under `contextIsolation` | `src/main/preload.ts` `contextBridge.exposeInMainWorld('provident', bridge)` | **`window.provident`** — the ONE handle the page receives; no Node object crosses |
| 19 | **B (renderer → engine, module evaluation):** `index.html` loads `./renderer.js` as a module | `src/renderer/index.html` `<script type="module" src="./renderer.js">` | the module-level renderer state: `MUTATING_METHODS` (a frozen literal, not state) and **the focus `holder`** (`src/renderer/renderer.ts` `const holder: { state: FocusState }`) |
| 20 | `main()` waits for the DOM, then reads the bridge's persisted config | `src/renderer/renderer.ts` `main()` → `bridge.security.get()` | the local `maxJournalLength` (**the ONLY renderer-side read of the persisted config**), passed into the Runtime |
| 21 | Construct the app Runtime | `src/renderer/renderer.ts` `new Runtime({ mount, envelope: demoEnvelope(), maxJournalLength })` → `src/renderer/runtime.ts` `Runtime.constructor` | **translate → `rootNode` + `nodes`; `new Supervisor({events: new EventBridge(), maxJournalLength})`; per-node `registerNode`; `new DomAdapter(mount, {onEvent})`; `payloads`; `cssIndex`/`propsIndex`; `bootstrapped=false`; `prevStates`/`domPrevMap`/`ssrPrevMap`; `envelope` (constructor path: **left `null`**) |
| 22 | First render | `src/renderer/renderer.ts` `runtime.bootstrap()` → `Runtime.render()` | `bootstrapped=true`; `prevStates` filled from `compile()` (or per-node `compilePath()` when a `content`-role anchor is present); `supervisor.recordResolved(...)`; the DOM mount receives the emitted tree and **every element carries `data-node-id`** (`renderOptions = {nodeIdAttribute: true}`); the SSR adapter mirrors the same element set |
| 23 | **B (renderer wiring → shared mechanism):** wire the gutter affordance | `src/renderer/renderer.ts` `startGutterAffordance(runtime)` → `Runtime.elementForNodeId` ×2 → `src/shared/demo-envelope.ts` `gutterSeamExample()` → `src/shared/gutter-affordance.ts` `domEventSource()` · `createGutterAffordance({...})` · `.attach()` | **the gesture session's closure state**, the **resize controller's closure state**, the affordance's own `record`/`hovered`/`attached`/`detached`/`recoverable`, and the wiring's own **`writes: GutterWriteReading[]`** record. **This step renders nothing.** |
| 24 | **B (renderer → main, IPC):** the operator panes | `src/renderer/renderer.ts` `new SecurePanels(panesMount)` → `src/renderer/secure-panels.ts` `SecurePanels.constructor` | a **second, isolated graph**: `createIsolatedScope()`, its own hub, its own `translateLegacy(paneEnvelope(), {hub, graphScope})`, its own `Supervisor` + `DomAdapter`, and the pane fields `cfg` / `debugValue` / `moduleStatus` / `moduleListText` / `prevMap` |
| 25 | The panes read their own two bridges | `src/renderer/secure-panels.ts` `refresh()` → `window.provident.security.get()` + `window.provident.module.get()` | `cfg` (a **snapshot** of the persisted security config) + the module status/list **text**; then `syncConfig()` writes them into the pane graph via `supervisor.apply({kind:'state-slice', ...})` |
| 26 | The Debug pane reads the APP graph | `src/renderer/secure-panels.ts` `refreshDebug(runtime)` → `runtime.renderedHtmlResult()` | `debugValue` (a census line + a ≤120-char SSR preview) written into the pane graph's `#status` node |
| 27 | Renderer declares itself ready | `src/renderer/renderer.ts` `bridge.ready()` → `src/main/preload.ts` `ready()` → `ipcRenderer.send(IPC_READY)` → `src/main/main.ts` `ipcMain.on(IPC_READY)` → `backend.markReady()` | **`RendererBackend.ready = true`**; the readiness `readyPromise` resolves; every queued `invoke` is released |
| 28 | Start the MCP transport | `src/main/main.ts` `await mcp.start()` → `ProvidentMcpServer.start()` | **stdio:** one long-lived `McpServer` + `StdioServerTransport`, `this.server = this.stdioServer = server`, and its `registered`/`resources` handle maps. **http:** `this.httpServer` listening on `127.0.0.1:<port>`, **and NO server until the first POST** (a fresh server + transport per POST) |
| 29 | Window close | `src/main/main.ts` `win.on('closed', ...)` | `mcp.close()` + `app.quit()` |

**WHERE THE FIRST FRAME ACTUALLY LANDS.** Step 22 is the first rendered frame, and **it is produced
by the renderer alone** — the MCP server is not started until step 28, and `loadFile` (step 17)
precedes it. `[H]` for every step above; **no `[U]`/`APP` reading of this chain was taken by this
pass.**

**ONE ORDERING FACT WORTH NAMING.** The renderer is fully booted and armed (step 27) **before** the
MCP transport exists (step 28). The readiness gate (`IPC_READY`) therefore never waits on the MCP
server, and the MCP server never waits on a renderer that has not yet booted.

---

## §2. THE STORAGE MAP

**The core deliverable: one row per state/value that exists anywhere in the app.** Columns:
**State/value** · **Where it physically lives** · **Owner (who may write it)** · **Readers** ·
**Lifetime** · **Survives restart?** · **MCP-visible?** · **Spec authority**.

**Two conventions, stated once.** (1) *"MCP-visible"* means **reachable through the MCP tool /
resource surface** (`ALL_TOOLS` + `ALL_RESOURCES`, `src/main/mcp-server.ts`); a value that is only
*directly readable over IPC* is **not** MCP-visible, and a value whose only MCP trace is its
**effect** (e.g. which tools register) is marked *"indirectly"* with the effect named. (2) *"None
recorded"* in the authority column is **a finding, not a gap to fill by invention** — it means no
spec section and no decision row pins that row, and `§7` carries it.

### §2.1 Main process — launch inputs and the two persisted stores

| State/value | Where it physically lives | Owner (who may write it) | Readers | Lifetime | Survives restart? | MCP-visible? | Spec authority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **userData override** | in-memory only, `src/main/main.ts` `userDataFromArgs` local | the process's own argv (the launcher) | `main()` step 4 only | per-process | **No** — supplied per launch | No | `docs/specs/ci-ui-leg.md` §4 (`ADD-2`, the argv route only; **no env fallback**) |
| **MCP transport kind** | in-memory only, `transportFromArgs` local | argv / `PROVIDENT_MCP_TRANSPORT` | `ProvidentMcpServer` (the `transport` field) | per-process | No | Indirectly — it decides **which transport exists** | `docs/specs/mcp-endpoint.md` §2 |
| **MCP port** | in-memory only, `portFromArgs` local | argv / `PROVIDENT_MCP_PORT` | `ProvidentMcpServer.port` | per-process | No | Indirectly — the HTTP bind | `docs/specs/mcp-endpoint.md` §2 |
| **Operator security settings `{token, enabled[], maxJournalLength?}`** | **on disk at `<userData>/provident-security.json`** + in-memory closure `current` in `src/main/security-store.ts` `createSecurityStore` | `securityStore.set(patch)` — reached **only** from `ipcMain.handle(IPC_SECURITY_SET)` (`src/main/main.ts`) | `main()` at boot; `SecurityGate`; `SecurePanels.refresh()`; `src/renderer/renderer.ts` `main()` (the `maxJournalLength` field only) | **persisted** | **YES** | **No — by construction.** The MCP tool handlers never route to the channel; the pane lives in an isolated graph | `docs/specs/mcp-endpoint.md` §6.4; `docs/decisions.md` rows `THEME-MECHANISM-AND-AUTHORED-CONTROL`, `FOCUS-UI-ONLY-MCP-TOOL` |
| **the boot snapshot `persisted`** | in-memory only, `src/main/main.ts` `main()` local | **nobody writes it after boot** | `new SecurityGate({token, enabled})` — once | per-process | No | No | None recorded — **a stale-by-design boot snapshot; nothing re-reads it** (`§7` finding F-7) |
| **Module registry records** (`name`, `version`, `source`, `hash`, `capabilities`, `installedAt`, `disabled`, `quarantined`) | **on disk at `<userData>/provident-modules.json`** + in-memory `records: Map` in `src/main/module-store.ts` `createModuleStore` | `moduleStore.put` / `.remove` / `.setDisabled` — reached from the MCP `module.install`/`module.update` handlers (`src/main/mcp-server.ts` `handleModuleTool`) and from `ipcMain.handle(IPC_MODULE_SET_DISABLED)` | `moduleStore.get/list/status`; `syncModuleRouter`; `moduleBridgeResult()`; `module.list` | **persisted** | **YES** | **YES** — `module.install`/`module.update` write it, `module.list` reads it (both `module`-group; install/update additionally require `code`) | `docs/specs/module-import-proposal.md` §6; `docs/specs/module-feature-list.md` §4 (U2/U3/U8) |
| **the store's `hash`** | on the in-memory record **and** on disk | **always derived at `put()` from `source`** (`sha256`), never trusted from the caller | boot re-verification (`load`) | persisted | YES | Indirectly — a mismatch ⇒ quarantine ⇒ **the module's tools do not register** | `docs/specs/module-import-proposal.md` §6; `src/main/module-store.ts` header |
| **`quarantined` (per record)** | on the in-memory record; **written to disk by `persist()` but NOT read back** — `sanitizeRecord` drops the field | `load()` at boot (hash mismatch) and `put()` (reset to `false`) | `status().quarantined`; the module pane's list text | **re-derived every boot** | Persisted as bytes, **but the value is recomputed, never restored** | Indirectly — a quarantined module is absent from `status().loaded`, so its tools do not register | `docs/specs/module-import-proposal.md` §6 (the quarantine rule) |
| **`corrupt`** | in-memory only, `src/main/module-store.ts` `load()` → captured in `loaded` | `load()`, at construction | `status().corrupt`; the module pane's status text | per-process | **No** — re-derived | No (IPC only) | `docs/specs/module-import-proposal.md` §6 (fail-disabled) |
| **`quarantinedAtBoot` Set** | in-memory only, `src/main/module-store.ts` closure | `load()`; deleted from in `put()` | `put()` only | per-process | No | No | None recorded (implementation detail) |
| **`installedAt`** | on disk, on the record | `put()` — **a clock read** (`new Date().toISOString()`) | `list()`/`get()` | persisted | YES | **No** — `module.list` maps only `{name, version, capabilities, disabled, quarantined}` | `docs/specs/module-import-proposal.md` §6 |
| **`disabled` (per module)** | on the in-memory record + on disk | `setDisabled` — reached **only** from `ipcMain.handle(IPC_MODULE_SET_DISABLED)` | `status().loaded`; `syncModuleRouter`; the pane list | persisted | YES | Indirectly — a disabled module's tools do not register | `docs/specs/module-feature-list.md` §4 (U8) **+ the `U8 §4 F2` residual: the pane control is DISPLAY-ONLY, so no shipped UI drives this writer** (`§7` F-3) |

### §2.2 Main process — the MCP server, the backend, the gate, the router

| State/value | Where it physically lives | Owner (who may write it) | Readers | Lifetime | Survives restart? | MCP-visible? | Spec authority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`SecurityGate._config`** | in-memory only, `src/main/security.ts` `SecurityGate` | `mcp.applyGatePatch(patch)` → `this._gate = this._gate.apply(patch)` (`src/main/mcp-server.ts`), reached from `IPC_SECURITY_SET`; **the persistence is a SEPARATE write** through `securityStore.set` | registration (`allowedToolNames`), per-call (`checkRequest`, `toolAllowed`, `moduleToolAllowed`), `notifyGraphChanged` | per-process | **No** — rebuilt from the store at every boot | Indirectly — it decides the registered tool set | `docs/specs/mcp-endpoint.md` §6; `docs/specs/mcp-security-gate.md` |
| **`ALL_TOOLS` (22 names)** | a **static class field**, `src/main/mcp-server.ts` `ProvidentMcpServer.ALL_TOOLS` | nobody — compile-time data | `allowedToolNames()`, `registeredToolNames()`, the `engine-pin-version` census rows | module-scope constant | n/a (it is code) | **YES** — it IS the tool surface | `docs/specs/mcp-server-gate.md` §3; `docs/decisions.md` row `FOCUS-UI-ONLY-MCP-TOOL` (the `21 → 22` move) |
| **`TOOL_GROUPS` (27 keys)** | a **module-scope constant**, `src/main/security.ts` `TOOL_GROUPS` | nobody — compile-time data | `groupForTool` | module-scope constant | n/a | **YES** — it IS the gate map | `docs/specs/mcp-endpoint.md` §6.2; `docs/specs/mcp-security-gate.md` |
| **the two gate-map-only keys `module.disable` / `module.enable`** | in `TOOL_GROUPS` only — **not in `ALL_TOOLS`, so never registered and never callable** | nobody | `groupForTool` only | module-scope constant | n/a | **No** — they cannot appear in `tools/list` | `docs/pending.md` the `M-r11` advisory row (deferred); measured at `docs/specs/engine-drift-measurements.md` (`gateOnly=[module.disable, module.enable]`) |
| **the three `resource:` gate keys** | in `TOOL_GROUPS` | nobody | `toolAllowed('resource:<uri>')` | module-scope constant | n/a | **YES** — they gate `ALL_RESOURCES` | `docs/specs/mcp-endpoint.md` §3.7 |
| **`ALL_RESOURCES` (3 defs)** | a static class field, `src/main/mcp-server.ts` | nobody | `createServer`, `applyGatePatch` | module-scope constant | n/a | **YES** | `docs/specs/mcp-endpoint.md` §3.7 |
| **`registered: Map<string, RegisteredTool>`** | in-memory, `ProvidentMcpServer` | `registerTools` at server build; `applyGatePatch` toggles `.enabled` and **adds newly-allowed tools** | `applyGatePatch`, `registeredEnabled` (test seam) | per-server-instance | No | **YES** — it is what `tools/list` reports | `docs/specs/mcp-server-gate.md` (M1/M2 re-gate) |
| **`resources: Map<string, RegisteredResource \| RegisteredResourceTemplate>`** | in-memory, `ProvidentMcpServer` | `registerResources`; re-gated by `applyGatePatch` | `registeredResources`/`resourceEnabled`/`readResource` (test seams) | per-server-instance | No | **YES** | `docs/specs/mcp-endpoint.md` §3.7 (R1–R5) |
| **`server` / `stdioServer` / `httpServer` / `httpServers: Set`** | in-memory, `ProvidentMcpServer` | `start()`; `handleHttp` adds/removes; `close()` clears | the notify path (`stdioServer.isConnected()`), `applyGatePatch`, `close()` | per-process (**the stdio server**) / per-POST (**the HTTP set**) | No | **YES** — the transport itself | `docs/specs/mcp-endpoint.md` §2, §8 |
| **MCP session state (HTTP)** | **none held by the app** — `new StreamableHTTPServerTransport({sessionIdGenerator: undefined})`, a fresh server + transport **per POST** | n/a | n/a | **per-request** | No | n/a | `docs/specs/mcp-endpoint.md` §2 (stateless), §6.5 (A6) |
| **MCP session state (stdio)** | in the SDK transport; the app holds only `stdioServer.isConnected()` | the SDK + the client's stdin | `notifyGraphChanged` | per-process connection | No | n/a | `docs/specs/mcp-endpoint.md` §8 (the stdio-only push) |
| **`RendererBackend.pending: Map<number, {resolve, reject, timer}>` + `seq`** | in-memory, `RendererBackend` | `invoke()` (insert), `handleReply()` (resolve + delete), `handleReset()` (reject-all + clear) | `pendingCount()` (test seam) | per-request | No | Indirectly — an in-flight MCP call | `docs/specs/renderer-backend-hardening.md` |
| **`RendererBackend.ready` / `readyPromise` / `firstLoadSeen`** | in-memory, `RendererBackend` | `markReady()`; `handleReset()` | `invoke()` (the readiness gate), `isReady()` (test seam) | per-process (reset on reload/destroy) | No | Indirectly — **every** `invoke` waits on it | `docs/specs/renderer-backend-hardening.md` (A2/A6) |
| **the three backend timeouts** (`readyTimeoutMs` 30000 · `invokeTimeoutMs` 60000 · `largePayloadBytes` 1000000) | in-memory fields, `RendererBackend` | **nobody after construction** — the constructor's defaults; `main()` passes no options | the readiness race, the per-request timer, `maybeDigest` | per-process | No | Indirectly — an over-threshold payload becomes `{census, digest, preview, truncated}` | `docs/specs/renderer-backend-hardening.md` (A2/A6, the bounded-payload guard) |
| **the module `CapabilityRouter` (main-process instance)** | in-memory, `src/main/main.ts` `moduleRouter` → `tools` Map, `hooks[]`, `transforms[]`, `modules` Set | `syncModuleRouter` (boot, after install/update, after `setDisabled`) and `registerModule` | `allowedToolNames()`, `registerTools`, `invokeTool` | per-process | **No** — rebuilt from the store | **YES** — its tools ARE listed and callable as `module:<name>.<tool>` | `docs/specs/module-import-proposal.md` §4/§7b; `docs/specs/module-feature-list.md` §3 (U4/U9) |
| **the per-module `uploadQueue` buffer** (MAX 1000, drop-oldest) | in-memory, one per `ModuleCtx` closure (`src/renderer/extensions.ts` `registerModule`) | `ctx.uploadQueue().enqueue` / `.drain` | the module itself | per-module-registration | No | No | `docs/specs/module-feature-list.md` §3 (U7, M-r12) |
| **the `ctx.captureProvider` / `transforms` / `hooks` of the RENDERER-side router** | **nothing exists** — no shipped `src/**` file constructs a renderer-side `CapabilityRouter` nor sets `RuntimeOptions.transformRouter` | — | — | — | — | **No** | `docs/specs/module-feature-list.md` §3 (U5/U6 declare the surfaces **LANDED**) — **a carrier with no shipped consumer** (`§7` F-2) |

### §2.3 Renderer — the app Runtime and its graph

| State/value | Where it physically lives | Owner (who may write it) | Readers | Lifetime | Survives restart? | MCP-visible? | Spec authority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **the mount `#app`** | a real DOM element, `src/renderer/index.html` | **the engine's `DomAdapter`** (via `renderProducingProcess`), plus `Runtime.reconcileMount()`'s detach sweep | `renderedHtml()` (`mount.innerHTML`); `elementForNodeId`'s walk | per-page | No | Indirectly — it IS `renderedHtml` | `docs/specs/mcp-endpoint.md` §3.2; `docs/specs/mount-invariant-guard.md` |
| **the graph — `Runtime.supervisor` (a `Supervisor`)** | in-memory only, `src/renderer/runtime.ts` `Runtime.supervisor` | the engine, through `supervisor.apply` / `dispatchAndReport` / `undo`/`redo`/`replay`, reached from `applyCommand`, `dispatch`, `journal`, `loadEnvelope`/`loadDoc` (which REBUILD it) | everything in the Runtime | **per graph generation** (a fresh `Supervisor` on every load) | **No** | **YES** — it is the authoritative surface (`list_targets`, `get_node_state`, `renderedHtml`) | `docs/specs/mcp-endpoint.md` §1 (graph-canon), §3; `docs/specs/runtime-host.md` §2 |
| **`Runtime.nodes` / `Runtime.rootNode`** | in-memory caches of engine `Node` objects | every load path; **`journal()` re-reads them from the supervisor** (the J3 base-restore refresh) | `render()`, `exportLegacy`, `validate`, `shapeSig`, `listTargets` | per graph generation | No | Indirectly — they are what is exported/rendered | `docs/specs/mcp-endpoint.md` §3.6 (J3) |
| **`Runtime.prevStates: Map<nodeId, CompiledState[]>`** | in-memory only | `setStates` (first render), `mergePass2`, `dispatch`'s resolved-store refresh, `applyCommand`'s per-dirtied-node recompile; pruned of destroyed-and-evicted ids in `render()` | `render()`, `markdown()` | per graph generation | No | Indirectly — it is the render baseline | `docs/specs/runtime-host.md` §3.1/§3.7 |
| **`Runtime.domPrevMap` / `Runtime.ssrPrevMap`** | in-memory only | `render()` writes them; `resetRenderState()` nulls them | the diff loop of `renderProducingProcess` | per graph generation (caller-owned per tree) | No | No | `docs/specs/runtime-host.md` §3.1; `src/renderer/runtime.ts` `resetRenderState()`'s own comment |
| **`Runtime.ssr` (an `SSRFragmentAdapter`)** | in-memory only | `render()`; **recreated by `resetRenderState()`** | `ssrHtml()` | per graph generation | No | **YES** — it is `ssrHtml` | `docs/specs/mcp-endpoint.md` §3.2 (PAR-5 parity) |
| **`Runtime.bootstrapped`** | in-memory boolean | `render()` (sets true); `resetRenderState()` (false) | `render()`'s branch choice | per graph generation | No | No | `docs/specs/mount-invariant-guard.md` §3.1 `M-19`; `docs/specs/runtime-host.md` §3.6's amendment |
| **`Runtime.cssIndex` / `Runtime.propsIndex`** | in-memory `Map<string, nodeId>` | `rebuildIdIndex()` — on construct, after every `applyCommand`, after `journal`, in `tearDownGraph()` | `resolveTarget`, `resolveString`, `nodeByCssId`, `nodeByPropsId` | per graph generation | No | Indirectly — it is the css.id → nodeId resolution `dispatch` depends on | `docs/specs/mcp-endpoint.md` §6.5 (A5); `docs/specs/runtime-host.md` §3.7 |
| **`Runtime.payloads: Payload[]`** | in-memory only | `buildPayloads(...)` on construct and on every load; cleared + `dropPayload`-ed by `tearDownGraph()` | `tearDownGraph()`'s drop + userData clear | per graph generation | No | No | `docs/specs/runtime-host.md` §3.6 (C3/C4) |
| **the `userData` carried by payload 0** | in-memory only, inside the payload | **`loadEnvelope`** sets it from `translated.userData` / the injected `opts.userData`; **the CONSTRUCTOR sets it to `opts.envelope.content`** (the content ARRAY) | `tearDownGraph()`'s dropPayload | per graph generation | No | No | `docs/specs/runtime-host.md` §3.1 (R8) pins the **load** path — **the constructor's argument is pinned by nothing** (`§7` F-1) |
| **`Runtime.envelope`** | in-memory only — a `structuredClone` of the last-loaded envelope | `loadEnvelope` (set), `codeSet`/`codeCreate`/`codeDelete` (mutate in place), `codeLoadBatch` (commit the clone), `loadDoc` (**sets it to `null`**) | every `code.*` method | per graph generation | **No** — **the CRUD envelope is never written to disk by this repo** | **YES** — `code.get/set/create/delete/validate/load/loadBatch` | `docs/specs/mcp-endpoint.md` §4 (`P-C1`/`P-C2`/`P-C5`); `docs/specs/runtime-host.md` §2 (D9) |
| **`Runtime.warnings`** | in-memory only | every translate (`loadEnvelope`, `loadDoc` → `[]`, `codeValidate` does **not** write it) | `load`/`op`/`teardown`/`journal`/`code.load` responses | per graph generation | No | **YES** — the `warnings` member of several tool results | `docs/specs/mcp-endpoint.md` §4.3 (`P-C3`, R10) |
| **`Runtime.renderOptions`** | in-memory constant `{nodeIdAttribute: true}` | nobody — a `readonly` field literal | every `renderProducingProcess` call (DOM, SSR, markdown) | module-instance constant | n/a | **YES** — it is why every element carries `data-node-id` | `docs/specs/mcp-endpoint.md` §3.2 + `P-E8` |
| **`Runtime.maxJournalLength`** | in-memory `readonly`, **read once at boot from the persisted security store** | `src/renderer/renderer.ts` `main()` (the constructor argument) | the `Supervisor` constructor on every graph build | per-page | **Indirectly** — its SOURCE is persisted; the field itself is boot-read | **No** | `docs/specs/mcp-endpoint.md` §6.4 ("maxJournalLength"); `docs/pending.md` the `GAP 1` row — ⚠ **`docs/specs/mcp-endpoint.md` §3.6's note (*"the host never sets `maxJournalLength`"*) contradicts the code** (`§7` F-9) |
| **the engine journal** (undo/redo stacks + the condensed `base` marker) | **inside the `Supervisor`** — package-owned, no host mirror | the engine, through host-driven ops; **the host sets only the `maxJournalLength` threshold** | `provident.journal`'s report (`status`, `scheduledDirtied`, `stackTopKind`, `redoTopKind`, `baseBoundary`) | **per graph generation — destroyed on every load** | **No** | **YES** | `docs/specs/mcp-endpoint.md` §3.6; `docs/specs/journal-endpoint-greens.md` |
| **the engine's `requestId` dedup LRU** | **inside the `Supervisor`** | the engine, on `dispatchAndReport` | the dispatch echo | **per graph generation — a `load` re-arms it** | **No** | **YES** — a duplicate `requestId` echoes the first report | `docs/specs/mcp-endpoint.md` §3.1 + `P-E4`; `src/shared/types.ts` `DispatchRequest.requestId` |
| **the engine's node registry + destroyed tombstones + `hasPendingWork`** | inside the `Supervisor` | the engine | the census, `listTargets`, the id-index rebuild, `settleGate` | per graph generation | No | **YES** — the census | `docs/specs/mcp-endpoint.md` §3.5; `docs/specs/runtime-host.md` §3.6 (R6) |

### §2.4 Renderer — the wiring-held holders, the gesture composition, the panes

| State/value | Where it physically lives | Owner (who may write it) | Readers | Lifetime | Survives restart? | MCP-visible? | Spec authority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **the focus holder `holder.state = {entries, activeId}`** | **in-memory only — a MODULE-LEVEL `const` in `src/renderer/renderer.ts` (`const holder: { state: FocusState }`)** | `answerForHolder(result)` — and **only** when `focusTransition` accepted; `resolveForHolder`/`standingAnswer` never write it | `focusRoute`, `standingAnswer`, `carriedEntryIds` | **per renderer realm** (survives every graph load and teardown) | **No** | **YES — and only through `provident.focus`.** `list_targets` / `get_rendered_html` / `get_markdown` / `get_node_state` **never** observe it | `docs/specs/focus-tool.md` §2.1 item 6, §2.3 items 1/2/5 — **the holder IS the live authority** |
| **`MUTATING_METHODS` (7 members)** | in-memory module-scope `Set`, `src/renderer/renderer.ts` | nobody — compile-time data | `handleRequest`'s post-reply notify predicate | module-scope constant | n/a | **YES** — it is what makes `notifications/resources/updated` fire | `docs/specs/mcp-endpoint.md` §8; `src/shared/types.ts` `IPC_NOTIFY` |
| **the affordance wiring's `writes: GutterWriteReading[]`** | in-memory only, `startGutterAffordance`'s closure | the `write(value)` closure — one entry per committed value, **including refusals** | the returned handle (driven by tests); a refusal is also logged to `console.error` | per-page | No | Indirectly — the successful write lands as the authored `gutter-status` node's `content` (MCP-readable) | `docs/specs/gutter-ui.md` §2.1 item 8(v); `L-5`/`ADV-GU-1` |
| **the live target element's inline `style.width` (the DRAG PREVIEW)** | **on the DOM element itself** — the rendered `#gutter-target` node's inline style | `applyPreview` (`src/renderer/renderer.ts`) — one transient write per observed move; reverted by the reset/cancel/drop arms | the browser's layout (and `get_rendered_html`'s `style="…"` serialization) | **per-gesture (transient)** | No | **YES** — it is visible in `renderedHtml` **while it lasts** | `docs/specs/gutter-ui.md` §2.5 item 4 |
| **the handle element's `style.cursor`** | on the DOM element | `applyCursor` (renderer wiring), the declaration resolved by the demo's own `cursorOf` seam | the browser | per-hover transition | No | Yes (the `style` attribute) | `docs/specs/gutter-ui.md` §2.1 item 8(v); `docs/specs/gutter.md` §2.2 `P-4` |
| **the authored `gutter-status` node's `content`** | **in the graph** (an authored envelope node's content) | `Runtime.applyCommand({kind:'state-slice', node: GUTTER_STATUS_ID, …})` — the wiring's ONE commit route | `get_rendered_html`, `get_node_state`, `list_targets` | per graph generation (reset by any load) | **No** | **YES** | `docs/specs/gutter-ui.md` §2.1 item 8(v), §2.5 item 5, §3.1 `M-19` |
| **the gesture session's state** (its ledger, the active record, the id counter, `stats()` counters) | in-memory only, `src/shared/gesture-session.ts` `createGestureSession`'s closure | the session's own `begin` / the three terminals / `install`/`dispose`; **the wiring hands it a NON-FORWARDING `commit` recorder** | the affordance (via `install`'s hooks), `stats()` | **per-session** (created once in `startGutterAffordance`) | No | **No** | `docs/specs/gsession.md` §2.5 (the frozen delegate list); `docs/decisions.md` row `E10-SINGLE-SINK-CHANNEL` |
| **the resize controller's state** (`last size/bounds`, the wrapped terminal hook) | in-memory only, `src/shared/gutter.ts` `createResizeController`'s closure | the controller's own turns; **the sink is the wiring's `commit` seam** | the affordance; `stats()` | per-attach | No | No | `docs/specs/gutter.md` §2.1 seam 6, §2.5 item 4; `docs/decisions.md` rows `E10-SINGLE-SINK-CHANNEL`, `E10-MODULE-IMPORTS-THE-CONTROLLER-FACTORY` |
| **the affordance's own state** (`record`, `hovered`, `attached`, `detached`, `recoverable`) | in-memory only, `src/shared/gutter-affordance.ts` `createGutterAffordance`'s closure | `attach()`/`detach()` and the observed turns | `stats()`, `detach()` | per-attach | No | No | `docs/specs/gutter-ui.md` §2.6, §3.1 `M-*` |
| **the `#panes` mount** | a real DOM element, `src/renderer/index.html` | the SecurePanels `DomAdapter` | the operator (visually); **never** `renderedHtml` (a different mount) | per-page | No | **No — by construction** | `docs/specs/mcp-endpoint.md` §6.4; `docs/specs/secure-panels.md` |
| **the pane graph** (`scope`, `supervisor`, `adapter`, `root`, `nodes`, `prevMap`) | in-memory only, `src/renderer/secure-panels.ts` fields | `SecurePanels.render()` / `syncConfig()` / `handleDomEvent` | the operator; the tests' `dispatch`/`debugText`/`applyPaneMutation` seams | per-page | No | **No — the isolated `GraphScope` is unreachable from the app Runtime** | `docs/specs/secure-panels.md`; `docs/specs/mcp-endpoint.md` §6.4 |
| **`cfg: SecuritySettings`** (the pane's copy of the persisted config) | in-memory field, `secure-panels.ts` | `refresh()` — `await security.get()` | `syncConfig()`, `debugText()`'s consumer | per-refresh (a **snapshot**) | No | **No** | `docs/specs/secure-panels.md` |
| **`debugValue` / `moduleStatus` / `moduleListText`** | in-memory fields, `secure-panels.ts` | `refreshDebug(runtime)` / `refresh()` | `syncConfig()`; `debugText()` (test seam) | per-refresh | No | **No** | `docs/specs/secure-panels.md`; `docs/specs/module-feature-list.md` §4 (U8) |
| **the pane graph's node content/props** (`#security-status`, `#status`, `#token-input`, the five `toggle:<group>` nodes, `#journal-length-input`, `#module-status`, `#module-list`) | **in the pane graph** | `syncConfig()` via `supervisor.apply({kind:'state-slice', …})`; the token/journal handlers via `window.provident.security.set` | the operator | per-page | No | **No** | `docs/specs/secure-panels.md`; `docs/specs/mcp-endpoint.md` §6.4 |
| **`window.provident`** | the isolated world's global, installed by `contextBridge` | `src/main/preload.ts` — once | `renderer.ts` (`bridge`), `secure-panels.ts` (`window.provident.security` / `.module`) | per-page | No | **No** (it is the *channel*, not a value) | `docs/specs/mcp-endpoint.md` §5; `docs/specs/secure-panels.md`'s `declare global` |

### §2.5 Authored data, pure modules, and the harness

| State/value | Where it physically lives | Owner (who may write it) | Readers | Lifetime | Survives restart? | MCP-visible? | Spec authority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **the demo envelope (authored UI)** | **a TypeScript module — `src/shared/demo-envelope.ts` `demoEnvelope()`** — **compiled into `dist/renderer/renderer.js`**; **NOT read from disk at runtime** | the author (a source edit), or **at runtime** the agent through `code.set`/`code.create`/`code.delete` + `code.load` (which writes `Runtime.envelope`, the in-memory clone — **never this file**) | `translateLegacy` at boot; the whole CRUD surface; the divergence/ui legs | module-scope data; the *live* copy is per graph generation | **The authored bytes: yes (they are source). Any runtime edit: NO.** | **YES** — it is the app's whole visible UI | `AGENTS.md` (the project-wide UI constraint); `docs/specs/mcp-endpoint.md` §4 |
| **`THEME_INITIAL_TOKEN = 'dark'`** | a module-scope constant in `demo-envelope.ts`, used as the `theme-setting` node's initial `content` | the author | the initial render; `get_node_state` on `theme-setting` | source constant → node content per graph generation | The constant, yes; the live setting, no | **YES** (`get_node_state` / the rendered text) | `docs/specs/theme-control.md` §2.1 item 3 (`P-TC-3`/`P-TC-4`) |
| **the theme SETTING (the live appearance value)** | **in the graph, as the `theme-setting` node's `content`** | the authored `theme-set` handler bodies (via `ctx.clientAPI.apply`) — reached by a real click **or** by `provident.dispatch` with the token as `args[0]` | `get_rendered_html`, `get_node_state`, `list_targets` (**no attribute is ever written**) | per graph generation | **No** — a re-boot reconstructs `'dark'` | **YES** | `docs/specs/theme-control.md` §1 item 6, §2.1, `P-TC-4` |
| **the theme wiring role's carried attribute name (`'theme'`) and the resolved state-node id** | in-memory, `src/renderer/renderer.ts` `themeWiringRole(runtime)` — **an exported function with NO caller in `src/**` or `tests/**`** | nobody at runtime (it runs only if called) | **nothing reads it** — the spec says so deliberately | would be per-call | No | **No** | `docs/specs/theme-control.md` §2.4 items 1/2 — **the role is DECLARED a bounded wiring role and DELIBERATELY INERT; its zero call sites are recorded here as an observation, not a contract breach** (`§7` F-4) |
| **the pane envelope (the operator panes)** | a module-scope function, `src/renderer/secure-panels.ts` `paneEnvelope()` — compiled into the renderer bundle | the author | `translateLegacy` in the SecurePanels constructor | module-scope data; live copy per page | The source, yes; the live pane graph, no | **No** | `docs/specs/secure-panels.md` |
| **the 19 modules of `src/shared/`** | **each holds NO storage** — see `§2.6` for the one exception (`dom-shim.ts`) and for the import census | — | — | — | — | — | per module's own spec (cited in `§2.6`) |
| **the DOM shim's global element registry** | **in-memory MODULE-LEVEL state — `src/shared/dom-shim.ts` `const byId = new Map<string, ShimElement>()`** | `installShim()` (**clears** it) and `shimDocument.getElementById` (**auto-creates** an entry) | `shimDocument.getElementById` | per-process (the module is loaded once) | No | No | `docs/specs/ci-ui-leg.md` (Layer declaration, `[X]`); `H-r5` (the shim's growth ban) |
| **the shim's ambient global `document`** | **a write onto `globalThis`** by `installShim()` | `installShim()` | every engine adapter that reaches `document` | per-process | No | No | `H-r5`; `docs/specs/ci-ui-leg.md` §0 prohibition 6 |
| **the battery host's gate** | a constructor literal in `src/main/battery-host.ts` (`{token: null, enabled: ['read','dispatch','graph','code']}`) | nobody — a literal | the battery server's registration | per-process | No | **YES** (in that harness only) | `docs/specs/e2e-test-battery.md` §6 |
| **the standalone host's gate** | **absent** — `src/main/standalone.ts` passes no `gate`, so `ProvidentMcpServer`'s constructor default applies: `new SecurityGate()` → `{token: null, enabled: ['read','dispatch']}` | nobody | the standalone server's registration | per-process | No | **YES** (in that harness only) | `docs/specs/mcp-server-wiring.md`; `docs/specs/mcp-endpoint.md` §6.4 (the first-run default) |

### §2.6 The 19 modules of `src/shared/` — storage census and import census

**One line each.** *"Imported by"* is a **read of the current `src/**` tree**; *"in a bundle"* is a
**read of the `dist/**` tree present in the repo** (built 2026-09-28 by mtime).

| Module | Storage it holds | Imported by shipped `src/**` | In a bundle? |
| --- | --- | --- | --- |
| `census.ts` | **None** — pure per-member arithmetic; **no module-level state**; its only import is its predecessor | *nothing* | **No** |
| `container.ts` | **None** — pure selector/normalizer; the one owned thing is an **unparsed string constant it RETURNS** | *nothing* | **No** |
| `demo-envelope.ts` | **None** — authored DATA (nodes + handler-body strings + three seam-constant literals); no mutable state | `src/renderer/renderer.ts` | **Yes — the renderer bundle** |
| `dom-shim.ts` | ⚠ **The one exception: a module-level `byId` Map + a `globalThis.document` write** (`installShim`); every `ShimElement` instance holds its own `attrs`/`children`/`listeners`/`style`/`datasetHandle` | `src/main/battery-host.ts` (**the harness bundle, not the app**) | Yes — **`battery-host.mjs`** only |
| `focus-model.ts` | **None** — a pure ordered-entry transition; **no module-level mutable state** | `src/renderer/renderer.ts` | **Yes — the renderer bundle** |
| `gesture-session.ts` | **None at module scope** — all state lives in the `createGestureSession` closure (ledger, counters, ids), created once by the wiring | `src/renderer/renderer.ts` (+ type-only from `gutter.ts`, `relocate.ts`; value `POINTER_TYPES` from `gutter-affordance.ts`) | **Yes** |
| `gutter.ts` | **None at module scope** — state lives in the `createResizeController` closure | `src/shared/gutter-affordance.ts` (values `clampToBounds`, `createResizeController`) | **Yes — transitively** |
| `gutter-affordance.ts` | **None at module scope** — state lives in the `createGutterAffordance` closure | `src/renderer/renderer.ts` | **Yes** |
| `layout-projection.ts` | **None** — pure projection + total applier; the sink is **injected** | *nothing* | **No** |
| `menu-template.ts` | **None** — pure catalog → template projection | *nothing* | **No** |
| `mount-invariant-guard.ts` | **None** — the host-side guard's pure predicates | *nothing* | **No** |
| `overlay.ts` | **None** — a state table + a declaration-only inert write (**returns** `{name, value, removal, target}`) | *nothing* | **No** |
| `owned-list-host.ts` | **None at module scope** — state lives in the host factory's closure | *nothing* | **No** |
| `path-fork-cycle.ts` | **None** — pure envelope DATA builders | *nothing* | **No** |
| `relocate.ts` | **None at module scope** — state lives in the `createRelocateSession` closure | *nothing* | **No** |
| `slot-host.ts` | **None at module scope** — state lives in the `createSlotHost` closure | *nothing* | **No** |
| `theme.ts` | **None** — pure resolver + a declaration-only applier | *nothing* | **No** |
| `types.ts` | **None** — types + **eight `IPC_*` string constants** (compile-time data) | `src/main/main.ts`, `preload.ts`, `mcp-server.ts`, `security-store.ts`, `src/renderer/renderer.ts`, `runtime.ts`, `secure-panels.ts` | **Yes — both bundles** |
| `zones.ts` | **None** — pure token arithmetic; **zero imports** | *nothing* | **No** |

**THE CENSUS IN ONE SENTENCE: `12` of the `19` shared modules are imported by NO `src/**` file and
are in NONE of the five built bundles; `6` reach the app (directly or transitively); and exactly
`1` (`dom-shim.ts`) holds module-level mutable state — in the `[X]` harness layer, never in the app.**
The `12`-of-`19` figure is **this pass's own read** and it reproduces the per-unit claims the specs
already carry (e.g. `docs/specs/zones.md` §CURRENT-STATE item 2: *"imported by no `src/**` file: it is
therefore in none of the five esbuild bundles"*).

---

## §3. The authority table

For each **kind** of state, the **single authority** today — the one holder that may write it — with
its exact site. **Where two things can write the same kind, that is flagged as a finding** and
cross-referenced to `§7`.

| Kind of state | THE single authority (the one holder that may write it) | Exact site | Two writers? |
| --- | --- | --- | --- |
| **Appearance (the theme setting)** | **the authored `theme-setting` graph node's `content`** | written by the authored `theme-set` handler bodies in `src/shared/demo-envelope.ts` (`ctx.clientAPI.apply(node.id, [{targetProp:'content', …}])`), reached by a real click or by `provident.dispatch` | **No.** The attribute-name carrier (`themeWiringRole`) writes nothing and is called by nobody; **no attribute is ever written** (`docs/specs/theme-control.md` §2.4) |
| **Layout (zone/pane sizes, tracks, and the rendered geometry)** | **nobody in this repo — the CONSUMER.** Every layout mechanism is a pure function of **injected** values: sizes arrive through the caller's `sizes` lookup, the token spec through the caller's `specOf`, the geometry through the caller's seams | `src/shared/zones.ts` `trackFor(spec, size, empty)`; `src/shared/census.ts` `computeTrackVars(zones, census, sizes, revealed, specOf)`; `src/shared/layout-projection.ts` `project(values, specOf)` / `projectVar(...)` / `applyProjection(projection, sink)` (with `applyVarsToRoot` as its alias) taking an **injected `VarWriteSink`**; `src/shared/gutter.ts` `createResizeController({boundsFor, defaultSizeFor, sizeFor, commit})` | **No writer exists in this repo.** The one *rendered* layout effect — the drag preview's inline `style.width` — has exactly one writer (`applyPreview`, `src/renderer/renderer.ts`) |
| **Focus / activation** | **the renderer's wiring-held `holder`** (`{entries, activeId}`), **never a graph slice** | `src/renderer/renderer.ts` `const holder: { state: FocusState }`; written only by `answerForHolder(result)` | **No.** The MCP tool layer holds **nothing** between calls (`docs/specs/focus-tool.md` §2.3 item 5), mints no id (§2.3 items 1/2) and re-derives no activation rule (§2.3 item 4) |
| **Gesture lifecycle** | **the composed session's own turns** — the session owns establishment, the three terminals and the commit channel; **the composition's SINGLE SINK is the controller's `commit` seam** | `src/shared/gesture-session.ts` `createGestureSession`; `src/shared/gutter.ts`'s `write()` (the module's only sink call site, reached from its wrapped terminal hook); the wiring hands the **session** a non-forwarding recorder (`src/renderer/renderer.ts` `commit: () => undefined`) | **No — and the two-writer shape is explicitly a FAIL:** `docs/decisions.md` row `E10-SINGLE-SINK-CHANNEL` (`docs/specs/gutter.md` §0 ruling 1, §4.4 `S-11`) |
| **Element identity (the addressable id space)** | **the engine's `Supervisor` node registry**, surfaced as each emitted element's `data-node-id` | `renderOptions = {nodeIdAttribute: true}` (a `readonly` literal in `src/renderer/runtime.ts`), honoured by `renderProducingProcess`; the **authored** css.id/props.id are copied onto nodes by `translateLegacy` | **No writer races the registry.** ⚠ **BUT there is a second, DERIVED id space** — `Runtime.cssIndex`/`propsIndex`. It is documented as a **cache** rebuilt from the registry (A5), and the resolution order is index-first-then-`getNode`; **it is a second holder of the same kind of state, and nothing in the code enforces that it is never authoritative** (`§7` F-5) |
| **Document / tab identity** | **there is none in this app.** The nearest thing is the focus model's ordered entry list, whose **ids are the CALLER's own opaque strings** | `docs/specs/focus-model.md` `I-4`/`P-FM-1`; `docs/specs/focus-tool.md` §2.3 item 2 (*"the caller's own string IS the legal entry id"*) | **No** — and the **decline** of the fork's tab-strip / focus-seam model is recorded (`docs/pending.md` the `SCH-13` row; `docs/decisions.md` row `FOCUS-UI-ONLY-MCP-TOOL`) |
| **Tool access (which capabilities an agent has)** | **the persisted security store's `enabled` set, via the human-only IPC channel — and its live reflection, `SecurityGate._config`** | written by `src/main/security-store.ts` `set(patch)` (persist) **and** `src/main/security.ts` `SecurityGate.apply(patch)` (live) — **both driven from the same single site, `src/main/main.ts` `ipcMain.handle(IPC_SECURITY_SET)`** | **Two holders, one writer.** The store and the gate are **two holders of the same kind**, and they can DIVERGE (a persist failure is swallowed: `security-store.ts` `persist()`'s comment says *"the in-memory config still applies for this process lifetime"*). The channel is single, so this is **one writer with two holders** — recorded here as an observation and cross-referenced (`§7` F-6) |
| **Persistence (what outlives the process)** | **TWO domain-specific main-process stores, and nothing else** | `src/main/security-store.ts` → `<userData>/provident-security.json` (**non-atomic `writeFileSync`**); `src/main/module-store.ts` → `<userData>/provident-modules.json` (**atomic: `.tmp` + `renameSync`**) | **No general facility exists, and that is a recorded decision:** `docs/decisions.md` row `NO-FOUNDATION-CONFIG-FILE-FACILITY` |
| **The authored UI (what the app shows)** | **the envelope** — and at runtime the **in-memory** `Runtime.envelope` clone | `src/shared/demo-envelope.ts` (source) / `Runtime.loadEnvelope` and the `code.*` methods (runtime) | **The FILE and the CLONE are two holders.** The spec pins this as deliberate: the CRUD edits the envelope-in-memory and **never the graph directly** (`docs/specs/mcp-endpoint.md` §4.3 `P-C1`), and `code.load` is the explicit apply (`P-C2`). Not a finding — but it is the app's largest single piece of state, and **it does not survive a restart by design** |

**THE THREE KINDS WITH NO IN-TREE AUTHORITY.** *Layout/geometry*, *document/tab identity*, and *any
state that must outlive the process* are each answered by `"the consumer"` — and in each case that
answer is a **recorded decision**, not an omission: `S-d8` prohibition 4, `H-r16`, and the
`NO-FOUNDATION-CONFIG-FILE-FACILITY` row respectively.

---

## §4. The boundaries

Four subsections, one per crossing. For each: what crosses, in which direction, **by what shape**,
what is forbidden, and what the specs pin.

### §4.1 `main → preload`

**WHAT CROSSES — BY SHAPE.** Four `ipcMain` handlers and three `ipcMain.on` listeners, plus the
window's own load. The preload (`src/main/preload.ts`) exposes **one** object,
`window.provident`, built as a literal (`const bridge: ProvidentBridge`) and installed with
`contextBridge.exposeInMainWorld('provident', bridge)` under `contextIsolation: true` /
`nodeIntegration: false` (`src/main/main.ts` `new BrowserWindow`).

| Direction | Shape | Channel (`src/shared/types.ts`) |
| --- | --- | --- |
| renderer → main | **a value** (a request record `{id:number, method, payload}`) | `provident:invoke` — sent by `RendererBackend.invoke` via `win.webContents.send('provident:invoke', req)`; **the main process writes the channel name as a LITERAL there, while the preload subscribes with the `IPC_INVOKE` constant** (`§7` F-8) |
| renderer → main | **a value** (a reply record `{id, ok, value?\|error?}`) | `provident:reply` (`IPC_REPLY`), via `ipcRenderer.send` |
| renderer → main | **a signal** (no payload semantics) | `provident:ready` (`IPC_READY`) |
| renderer → main | **a value** (`{uri}`), **whose payload main ignores** | `provident:notify` (`IPC_NOTIFY`) — main's listener calls `void mcp.notifyGraphChanged()` and never reads the payload |
| main ↔ renderer (request/response) | **a value** (`SecuritySettings`, or a patch) | `provident:security:get` / `provident:security:set` (`ipcRenderer.invoke` ↔ `ipcMain.handle`) |
| main ↔ renderer (request/response) | **a value** (`ModuleBridgeResult`) | `provident:module:get` / `provident:module:set-disabled` |

**WHAT IS DELIBERATELY NOT BRIDGED.** No Node object, no `fs`, no `require`, no `process`, no
Electron module. The bridge's interface (`ProvidentBridge`) is the whole surface: `ready`,
`onRequest`, `sendReply`, `notify`, `security.{get,set}`, `module.{get,setDisabled}`.
**`window.provident` is a handle, not a store** — it holds no value of its own.

**WHAT THE SPECS PIN.** `docs/specs/mcp-endpoint.md` §5 (the process layout + *"All payloads are
JSON-safe (structured-clone)"*), `P-E6`; §6.4 (the settings IPC is **manual-UI-only by
construction** — *"the MCP tool handlers never route to it"*); `docs/specs/ci-ui-leg.md` §3.5
(`SEAM-1`..`SEAM-4`, the userData override's `[H]` rows).

**ONE STRUCTURAL FACT WORTH NAMING.** The security and module channels are **`invoke`-style
(request/response) and bidirectional**, while every app-graph channel is **one-directional**. There
is **no IPC path from the renderer to the app graph's data other than the invoke/reply pair** — and
that pair is **main-initiated** (the renderer only ever *answers*).

### §4.2 `preload → renderer`

**WHAT CROSSES.** The handle itself, once, at preload evaluation. There is **no data crossing this
boundary**: the renderer receives capabilities, and then **pulls** the two values it needs
(`bridge.security.get()` at boot for `maxJournalLength`; and, in the panes, `security.get()` /
`module.get()` on every refresh).

**BY WHAT SHAPE.** A frozen-by-construction interface whose members are **functions**. Each
function's return is a JSON-safe value (an `await`ed promise for the two `invoke` families).

**WHAT IS FORBIDDEN TO CROSS.** (a) **Node/DOM objects** — `contextIsolation: true` makes the
renderer's `window` a different realm, so an Electron object could not be passed even by mistake;
(b) **live engine objects** — `P-E6`: *"args/results never carry live objects or functions"*, and the
renderer enforces this at its own read boundary by **projecting** engine states (`Runtime.
projectedState`), whose doc-comment records why: the engine's `CompiledState.anchors` carry **live
circular `Node`/`Link` refs**, so a raw snapshot *"violates the JSON-safe contract"*;
(c) **pointer coordinates** — see §4.3.

**WHAT THE SPECS PIN.** `docs/specs/mcp-endpoint.md` §5 and `P-E6`; `docs/specs/focus-tool.md` §2.1
item 3 (the answer's members are passed out **by identity**, with **no `typeof` test, no coercion, no
trim and no re-keying**); `docs/specs/runtime-backend-hardening.md` (the bounded-payload guard:
`RendererBackend.maybeDigest` replaces an over-threshold `renderedHtml`/`ssrHtml`/image block with a
`{census, digest, preview, truncated}` record — **so a big value CROSSES AS A DIGEST, not as itself**).

### §4.3 `renderer → graph runtime`

**WHAT CROSSES.** Method calls with plain payloads, and — in the reverse direction — **plain
projections, never engine objects**. The renderer's `handleRequest` (`src/renderer/renderer.ts`) is a
**switch over `RpcMethod`** that forwards each case into a `Runtime` method; `MUTATING_METHODS`
decides the one push.

| Crossing | Direction | Shape |
| --- | --- | --- |
| a dispatch request | wiring → Runtime | a plain record `{target, event, args?, requestId?}` |
| a graph op | wiring → Runtime | a plain op record (`{kind, node?, mutation?, …}`) |
| an envelope edit | wiring → Runtime | a path string + a JSON value (the `code.*` methods) |
| a render read | Runtime → wiring | a **string** (`renderedHtml` = `mount.innerHTML`, transformed) and a **string** (`ssrHtml`) |
| a node read | Runtime → wiring | **a projected snapshot** — `Runtime.projectedState`, whose anchors are reduced to `{role, target, value}` |
| the target-list read | Runtime → wiring | `NodeInfo[]` — flat records |
| **the affordance's element read** | Runtime → wiring | `Runtime.elementForNodeId(id)` — **the ONE graph read the renderer-side UI wiring owes**; it resolves the engine node from the authored id (nodeId → css.id → props.id, via the index) and then **walks the live mount's own `data-node-id` attributes** |
| **the DOM event** | the browser → the graph | `DomAdapter`'s `onEvent` → `Runtime.handleDomEvent(wire, domEvent)` → `supervisor.dispatchEvent(node.id, eventName, ...extra)` where `extra` is at most **one string** (the target's `value`) |
| the commit write | wiring → Runtime | `Runtime.applyCommand({kind:'state-slice', node: <AUTHORED id string>, mutation: [{targetProp:'content', mode:'replace', value}]})` — and the returned `{status}` is **kept** (`GutterWriteReading`) |

**WHAT IS FORBIDDEN TO CROSS — AND THIS IS THE BOUNDARY THE SPECS PIN HARDEST.**

1. **A COORDINATE.** The rule is `S-d9` (`docs/specs/provident-electron-shell-chrome-handoff-review.md`,
  the node-local interaction rule): *"the MCP dispatch surface carries an event **name** with no
  pointer coordinates … so a session reached through MCP can start/abort deterministically but
  cannot commit a magnitude — **no later pass may claim agent-drivable drags**."* The mechanism
  enforces the same class of ban at its own edge: `docs/specs/container.md` `R-6` (the
  geometry/coordinate/no-reach row) and `§3.3 I-8`; `docs/specs/gutter.md`'s one coordinate rule;
  `src/renderer/runtime.ts` `handleDomEvent`'s `extra` array carries **a form value, never a
  position**.
2. **LIVE ENGINE OBJECTS.** `CompiledState.anchors`, `Node`s, `Link`s and `Supervisor` handles must
  be projected or kept inside. `Runtime.applyCommand` enforces the inbound half: an **object** `node`
  or `source` that is not a live registered `Node` is refused wholesale (`{status:'rejected'}` —
  `isRegisteredNode`), and that guard is the one that refused the gutter's as-filed preview write
  (`docs/specs/gutter-ui.md` `L-5`/`ADV-GU-1`).
3. **A DOM ELEMENT AS A GRAPH ADDRESS.** The commit route must hand `applyCommand` the **authored
  id string**, never the element it resolved — the same `L-5` finding.
4. **A SECOND SINK / A SECOND ACTIVATION AUTHORITY.** `docs/decisions.md` row
  `E10-SINGLE-SINK-CHANNEL` makes *"giving the same function to both channels"* a **two-writer
  composition that FAILS**.

**WHAT THE SPECS PIN — THE COORDINATE CONTRACT, IN ONE PLACE.** *The node layer reads no
coordinate and no geometry; the arithmetic is provable here; any claim about the rendered geometry
is UNPROVABLE in this repo today* — the mandatory clause A-d4 requires wherever geometry criteria
are described (`docs/specs/zones.md` §0 ruling 6; `docs/specs/census.md` §0 ruling 6; `docs/specs/
projection.md` §2.5; `docs/specs/container.md` `R-6`; `S-d11` in the handoff record).

### §4.4 `graph runtime → shared modules`

**WHAT CROSSES.** Only **values, callbacks and data records — never handles to the runtime.**

| Mechanism | The crossing | Shape |
| --- | --- | --- |
| `src/shared/gesture-session.ts` | the wiring calls `createGestureSession({source, commit})` and `install(element, {capture?, onStart?, onMove?, onEnd?, onCancel?})` | **injected callbacks + an opaque `element`**; the session never reads a global, never queries |
| `src/shared/gutter.ts` | `createResizeController({session, axisFor, boundsFor, defaultSizeFor, isResizable, sizeFor, commit})`; the exported `clampToBounds` | **9 injected seams + one pure exported comparator** — no element parameter in the *pure* half |
| `src/shared/gutter-affordance.ts` | `createGutterAffordance({session, source, element, target, sizeFromPointer, pointerOf?, moveTypeOf?, axisOf, cursorOf, applyPreview, applyCursor, startSizeOf, boundsOf, resizableOf, commit, capturePointer?, isDragValid?})` | **17 seams**; the module **value-imports** `clampToBounds`, `createResizeController`, `POINTER_TYPES` and type-imports two — and **nothing else** (`docs/decisions.md` row `E10-MODULE-IMPORTS-THE-CONTROLLER-FACTORY`) |
| `src/shared/focus-model.ts` | `focusTransition(state, verb, arg)`, `focusOrder(entries)`, `focusIndex(...)` | **pure argument → value**; no factory, no session, no options object, **no element parameter** (`docs/specs/focus-model.md`) |
| `src/shared/zones.ts` · `census.ts` · `layout-projection.ts` · `theme.ts` · `overlay.ts` · `container.ts` · `menu-template.ts` | **no crossing exists** — these modules are imported by NO `src/**` file (`§2.6`); their consumers would pass values only | values / an injected write sink |

**WHAT IS FORBIDDEN TO CROSS — THE FAMILY'S NO-DOM / NO-AMBIENT RULES, as the specs state them.**
`docs/specs/container.md` `I-6`: *"NO DOM, NO AMBIENT READ, NO ELEMENT LOOKUP, EVER: no
`document`/`window`/`globalThis`-rooted access, no element-query token in any form…"*;
`docs/specs/focus-model.md` (no factory, no element parameter, no listener, no storage call);
`docs/specs/census.md` §2.2 `P-1`/`P-3` (no consumer vocabulary; no policy defaults);
`docs/specs/zones.md` §2.2 `P-6` (no import at all); `docs/specs/gsession.md` §2.2 `P-1`/`P-5` (no
`selectors`/`threshold` vocabulary; no default value); and the six prohibitions themselves, `S-d8`
`(C)#1`..`(C)#6` (`docs/specs/provident-electron-shell-chrome-handoff-review.md`).

**WHAT THE SPECS PIN ABOUT THE ENVELOPE / PROVENANCE.** `docs/specs/mcp-endpoint.md` §4.3: `P-C1`
(*"CRUD edits the envelope, never the graph directly"*), `P-C2` (*"re-load is the apply step"*),
`P-C3` (bodies are function-STRING data; the CSP `'unsafe-eval'` carve-out is required), `P-C4`
(*"schema-validated at the boundary … a malformed edit is rejected with the framework's own codes,
never applied silently"*), `P-C5` (*"authoring is a bounded unit"*). The **graph is authoritative
and HTML is a view** — `P-E2`, `docs/specs/mcp-endpoint.md` §1.

---

## §5. What is deliberately NOT stored

Each absence, with its authority site. **These are rulings and recorded declinations, and a later
pass may not read any of them as an oversight.**

| # | The absence | WHAT IT ACTUALLY PINS | Authority |
| --- | --- | --- | --- |
| **A-1** | **No generic config-file / persistence facility** | *"the foundation ships NO generic userData config/persistence facility: persistence is CONSUMER-side, a foundation store is a NEW GATE that must not be smuggled in."* Seven clauses; the two shipped files (`provident-security.json`, `provident-modules.json`) are named as **domain-specific, not a general facility**; **`schemaVersion` greps to zero hits**; no migration machinery; the **consumer** owns its carrier, its schema version, its atomic replace and its witness. **The new-gate route is stated AFFIRMATIVELY** — it is a boundary, not a permanent ban | `docs/decisions.md` row **`NO-FOUNDATION-CONFIG-FILE-FACILITY`** (2026-09-29; ACTIVE); the gate record `docs/specs/foundation-no-config-file-persistence-review.md`; `docs/pending.md` §M; the standing clauses `S-d4`, `S-d8` prohibition 4, `H-r16` |
| **A-2** | **No store, no persistence, and no ambient read in ANY `src/shared/` mechanism** | *"a UI-config store or any persistence of its own (persisted state is supplied *to* the mechanism)"* — the family's prohibition 4. Ten landed contracts carry it as a **testable negative row**; the review record enumerates them **by unit and row id** (`docs/specs/foundation-no-config-file-persistence-review.md` §2 row 16 — `theme.md`, `theme-control.md` (`P-TC-IM-5`, *"built to FAIL"*), `focus-model.md` (`R-3`), `focus-tool.md` (`P-FT-4`), `overlay.md`, `gsession.md`, `gutter-ui.md`, `relocate.md`, `container.md`, `menulib.md`). `§2.6` above verifies the stronger claim: **18 of the 19 shared modules hold no storage at all**, and the 19th (`dom-shim.ts`) holds process-global element bookkeeping **in the `[X]` harness layer only** | `S-d8` `(C)#4`; `docs/specs/foundation-no-config-file-persistence-review.md` §2 row 16 (cited for the row ids, which this pass did not re-read one by one) |
| **A-3** | **No second gesture authority** | The adopted session is the ONE lifecycle owner. `SCH-6`'s second half (*"one commit per gesture, cancel writes nothing"*) was **declined precisely because** adopting it *"would create a second authority over the same gesture lifecycle"* — and it survives as contract text inside the adopted family instead. The composition's single sink writer is the controller's `commit` seam; **giving the same function to both channels is a two-writer composition that FAILS** | `docs/pending.md` the `SCH-6` row (`SECOND-GESTURE-AUTHORITY`); `docs/decisions.md` row `E10-SINGLE-SINK-CHANNEL`; `docs/specs/gutter.md` §0 ruling 1, §4.4 `S-11` |
| **A-4** | **No id policy, no cache, no counter, no memo in the tool layer** | The `provident.focus` handler *"holds NOTHING between calls: no state, no map, no registry, no counter, no memo of the last answer, so a second identical call is a SECOND renderer call and never a cache hit"* — and it **mints no id** (the caller's own string IS the legal entry id) and **re-derives no activation rule** | `docs/specs/focus-tool.md` §2.3 items 1/2/4/5 |
| **A-5** | **No UI-config store on the theme path, no attribute write from the mechanism** | *"**PERSISTENCE BOUNDARY:** persistence stays **consumer-side** — **this repo owns no UI-config store**; if it ever needs one that is a **new gate** that must not be smuggled in via these units."* `U-THEME`'s applier is **declaration-only** (it returns the write it would perform); **no token values, no `data-theme` literal, no `matchMedia`** | `docs/decisions.md` row `THEME-MECHANISM-AND-AUTHORED-CONTROL`; `H-r16`; `docs/specs/theme.md` |
| **A-6** | **No persisted layout, no persisted focus, no persisted journal, no persisted window geometry, no persisted theme, no application menu** | **Read the store census in `§2`:** exactly two files exist, and the whole of the rest is per-process or per-graph-generation. There is **no** `Menu`/`setApplicationMenu` anywhere in `src/main/**`; the `BrowserWindow`'s `980 × 720` are literals; a `load` discards the journal, the `requestId` dedup LRU and the focus holder's graph-side traces; a re-boot reconstructs the theme token from `THEME_INITIAL_TOKEN` | **Partly recorded, partly NOT** — the *general* boundary is `NO-FOUNDATION-CONFIG-FILE-FACILITY`; the *specific* per-kind absences (window geometry, menu) are recorded **nowhere** (`§7` F-10, F-11) |
| **A-7** | **No MCP-visible path to the operator's configuration** | The settings surface is **manual-UI-only by construction** — the IPC channel is main→renderer→main **and** the pane lives in an isolated graph the MCP endpoints cannot read or dispatch. An agent **cannot grant itself capabilities** | `docs/specs/mcp-endpoint.md` §6.4; `docs/specs/secure-panels.md`; the `S-d8` `(C)#5` + `H-r14` reading |
| **A-8** | **No shim growth (with exactly ONE scoped exception)** | *"the DOM shim **must NOT be expanded**"* — with one admitted member, `ShimElement.removeAttribute`, *"admitted only on a named engine call site in a dist this repo installs … or a red run that throws"*. **No layout, no CSS resolution, no pointer/capture semantics, no `matchMedia`, no `activeElement`, no `getComputedStyle`, no render-count seam** | `S-d3`; `H-r5`; `H-r7`; `docs/decisions.md` rows `SHIM-COMPLETION-CARVE-OUT`, `ENGINE-PIN-VALUE-SLOT-CLEAR` |
| **A-9** | **No id policy in the tool layer** — spelled separately because it is the boundary the MCP surface itself observes | see A-4; the tool layer is a **thin adapter, three steps and no more** | `docs/specs/focus-tool.md` §2.1 item 3, §2.3 |

---

## §6. Where a NEW piece of state would have to live

**Worked through for one concrete, pending design** — a zone **minimum size** with a **minimized**
state, *"zero means minimized, not a smaller width"*, and a **minimized member's slot/location**
that proximity detection reads to expand it back and host a pane.

**THE DESIGN HAS NO HOME TODAY, AND THAT IS THE FIRST FACT.** Nothing in this tree records a
minimized state for a zone or a pane: the string `is-minimized` occurs **only as a BANNED literal**
(`docs/specs/container.md` `P-CT-1`, and `H-r15`'s hazard that `slothost` must not grow a
mirror-class taxonomy); the fork's `ZONE-CONTAINER-CHROME` (`SCH-10`, minimize chrome) was
**DECLINED + REFILED** with the reason code `CONSUMER-VOCABULARY + CSS`; and the `container` unit's
`B-3` **working default** is that a caller-supplied `is-minimized` member handed to that mechanism
is **FORBIDDEN** *"unless `U-CENSUS`/`U-ZONES` supply the value"* (`docs/decisions.md`, the
`E5-B-3` note row). **So this section derives each home from the rules that already exist — it
invents no option, no seam and no vocabulary.**

### §6.1 The MINIMUM VALUE (the zone's min size)

| Question | Answer |
| --- | --- |
| **Which layer lawfully holds it** | **AUTHORED ENVELOPE DATA, or the CONSUMER's own state.** The landed precedent is the demo's own card: the pane node carries `props: { size: '100', min: '0', max: '200', resizable: 'true' }` (`src/shared/demo-envelope.ts` `demoEnvelope()`'s gutter card), the runtime emits those as **bare attributes**, and the demo's seam implementation reads them through `attributeOf(element, 'min')` (`src/shared/demo-envelope.ts` `gutterSeamExample().boundsOf`) and hands the pair to the controller's **injected** `boundsOf` seam. The pure clamp is `src/shared/gutter.ts` `clampToBounds`. **If the minimum must outlive a restart, it goes in the CONSUMER's own carrier** — `NO-FOUNDATION-CONFIG-FILE-FACILITY` / `H-r16`. |
| **Which layer may NOT hold it, and why** | **(a) A pure shared mechanism, as a default** — `S-d8` `(C)#3` (no policy defaults); `docs/specs/container.md` `P-CT-3` (*"no decision the consumer owns, baked in as the mechanism's default"*); `docs/specs/census.md` `P-3`; `docs/specs/gsession.md` `P-5`. **(b) `U-ZONES`'s `TrackSpec`** — all three of its fields are **carrier values** and the module *"has no default for any of them"* (`src/shared/zones.ts` `TrackSpec`); the module's `trackFor` emits the caller's `emptyToken` **verbatim** and would never invent a bound. **(c) `U-PROJ`'s projection** — it formats only what the consumer's own `VarSpec` tells it to (`docs/specs/projection.md` §0 ruling 3). **(d) The FOUNDATION, as a store** — `S-d4`, `H-r16`. |
| **Who would write it / who would read it** | **Written by the author** (an envelope edit) or by the consumer's own layout state; **read by the wiring seam** (`boundsOf`-shaped) and then by the resize/proximity mechanism as an **argument**. **MCP-visible today, for the demo's form:** the authored `min` lands as a bare attribute, so `provident.get_rendered_html` shows it and `provident.get_node_state` resolves it; and an agent holding the `code` group could `code.set {path:'template.root…props.min'}` + `code.load`. |
| **Evidence layer that could verify it** | **`[T]`** for the arithmetic — `clampToBounds` and `trackFor`'s three limbs are provable over values (`docs/specs/gutter.md`; `docs/specs/zones.md` §5.5.1). **`[H]`** for the seam wiring (a read-back through `applyCommand`'s status, i.e. the `GutterWriteReading` pattern). **`[U]`** for the rendered width — and **only** the `ui` leg can take it: *"any claim about the rendered geometry is UNPROVABLE in this repo today — it belongs to the `ui` leg's business and to no node-green"* (`docs/specs/zones.md` §0 ruling 6, `S-d11`). **APP** for "the zone is really that size on screen". |

### §6.2 The MINIMIZED STATE (zero means minimized, not a smaller width)

| Question | Answer |
| --- | --- |
| **Which layer lawfully holds it** | **THE CONSUMER'S CENSUS / REVEAL STATE, passed as an argument.** The family already has the exact slot: `src/shared/census.ts` `computeTrackVars(zones, census, sizes, revealed, specOf)` — **`revealed` is *"a CONSUMER DECISION, NEVER A DEFAULT"*** (`docs/specs/census.md` §0 ruling 5, §2.4 `C-C`; `F-2`; `I-5`), and **`isEmpty(census, zoneId)`** (`src/shared/zones.ts`) is the ONE emptiness reading, over **the caller's census**. Inside this repo's own demo the lawful carrier is **authored graph data** (a node's `content`/`props` on the authored zone node), because this repo renders its UI as provident data and owns no UI-config store. |
| **THE ONE READING THAT DECIDES THE "ZERO MEANS MINIMIZED" QUESTION** | **The mechanism must NOT do the overloading; the CONSUMER must.** `trackFor(spec, size, empty)` has **two independent limbs**: *"a **truthy flag**, **or** a size that is not a finite non-negative number, yields `spec.emptyToken` VERBATIM; any other size yields `String(size) + spec.unit`"* (`src/shared/zones.ts` `trackFor`). **A size of `0` is a SIZE** — the module's own doc says *"`-0` is finite and not negative, so it yields the `'0'` numeric text"*. **So `0 ⇒ minimized` is a policy the mechanism may not carry:** either the consumer's `revealed(census, zoneId)` predicate answers "minimized" (and the token is the consumer's own `emptyToken`), or the consumer's `census` records `0` for that zone and hands the flag. **A design that wants "0 means minimized" must put that mapping in the consumer's predicate and record it there.** |
| **Which layer may NOT hold it, and why** | **(a) A caller-supplied `is-minimized` member handed to `container`/`tokensFor`** — the `B-3` working default makes it **FORBIDDEN** unless `U-CENSUS`/`U-ZONES` supply the value; a second emptiness authority under a second name is the `AU-2`/`V-13` class. **(b) A mechanism literal** — `docs/specs/container.md` `P-CT-1` bans the mirror-class taxonomy `is-empty`/`is-minimized`/`is-revealed`; `H-r15` makes the same taxonomy a **hazard** for `slothost`. **(c) A `U-ZONES` default** — the literal `'0px'` is **NOT built in** (`docs/specs/zones.md` §0 ruling 2). **(d) `U-PROJ`** — the applier *"declares nothing and owns nothing"* (`docs/specs/projection.md` §0 ruling 4). |
| **Who would write it / who would read it** | **Written by the consumer** (its layout/census state, or the authored node in this repo's demo). **Read by** the consumer's own `revealed` predicate → `computeTrackVars` → `trackFor`. **MCP-visible today:** if it is authored graph data, yes (`get_node_state` on the zone node); if it is consumer state outside the graph, **no**. |
| **Evidence layer that could verify it** | **`[T]`** — the two-limb table is exhaustively enumerable (`docs/specs/zones.md` §5.5.1's register; `docs/specs/census.md` §5.5.1). **`[H]`** — the wiring's own reading. **`[U]`/APP** — that the zone is actually collapsed on screen, which no node-green can claim. |

### §6.3 The MINIMIZED MEMBER'S SLOT / LOCATION

Two distinct things share the phrase *"location"*, and **they have different lawful homes**:

**(a) The LOCATION AS A HOSTING SLOT — where the pane is put back.** *Home: the consumer's opaque
slot key + an injected container.* `src/shared/slot-host.ts` `createSlotHost({container, keys,
order?, classNameOf?, attributesOf?})` takes **opaque keys**, places **nodes the caller created**,
owns only those nodes, leaves foreign siblings untouched, projects `order`, performs **zero graph
ops** on an order change, and answers an **undeclared key with a typed refusal, never a silent
create** (`docs/specs/slothost.md`; `docs/pending.md` §N). The **container** is *"a value that offers
`appendChild`"* — *"a real DOM element satisfies it; a shim `ShimElement` satisfies it; a plain object
offering an `appendChild` function satisfies it"* (`docs/specs/slothost.md` §2.1's container-source
clause item 3; `SLOTHOST-CONTAINER-SOURCE-ADMITS-A-RUNTIME-MATERIALISED-CONTAINER`, ACTIVE), and it is
**invoked only when the host is driven** for that key.

**(b) The LOCATION AS A PROXIMITY READING.** *Home: the caller's scalar distance, compared by the
module's one pure comparator.* **This repo reads no coordinate and no geometry.** `src/shared/
relocate.ts` `withinProximity(distance, threshold)` compares **two caller-supplied scalars** under
four limbs (typeof gate · `NaN` · finite-negative · the comparison, boundary **inside**), and the
`threshold` is, by ruling, **the distance from a candidate zone at which the relocate affordance
engages** — *"the zone EXPANDS to visibility (if empty/minimized) and a GHOST shows where the pane
will drop"*, with **three separate channels**: the zone's **expansion** (the consumer's own
reveal state, written once per gesture at the committing terminal), the **ghost** (a per-move
transient preview), and the **reset arm** (`docs/decisions.md` row
`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`, and `U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN`).
**The module holds no location: the distance is computed by the consumer and arrives as a
number.**

| Question | Answer |
| --- | --- |
| **Which layer lawfully holds it** | **(a)** the consumer's opaque slot key + an injected container (`slot-host`); **(b)** the consumer's own scalar distance, handed to `withinProximity` — with the *expansion* written through the consumer's reveal channel and the *ghost* on the preview channel. |
| **Which layer may NOT hold it, and why** | **A coordinate or a geometry in any `src/shared/` module.** `S-d11`'s mandatory clause and `docs/specs/container.md` `R-6`/`I-8` state the ban; `docs/specs/relocate.md`'s own header says the module performs *"NO coordinate read, NO event read, NO geometry read, NO distance computation"*. **A per-zone/per-pane vocabulary in `slot-host`** — `H-r15`'s hazard: that would *"resurrect `SCH-10`/`SCH-4` under a new name"*. **A foundation store** for it — `H-r16`. |
| **Who would write it / who would read it** | **Written by the consumer** (its layout state and its own distance computation). **Read by** `slot-host` (as a key + a container) and `withinProximity` (as two numbers); the **reveal** is read by `computeTrackVars`' `revealed` predicate. |
| **Evidence layer that could verify it** | **`[T]`** — `withinProximity`'s four limbs and `slot-host`'s typed refusal are exhaustively provable (`tests/relocate.test.ts`, `tests/slot-host.test.ts`). **`[H]`** — the injected seams. **`[U]`/APP** — that the zone **actually expands** and the ghost **actually appears**: this is **`user-flow-audit.md` §7.1 limb B (UI-OVERHAUL) territory**, so the design would owe a capped **`§5.U` delta matrix**, a **`§6.1` coverage report**, and the **`§6.2` read-only audit** before any UI green (`docs/specs/user-flow-audit.md` §1–§4). |

### §6.4 The derived summary, in one table

| The new value | Lawful home | Forbidden home | Writer → reader | Evidence |
| --- | --- | --- | --- | --- |
| **the zone minimum** | authored envelope data (`props.min`, the demo precedent) **or** the consumer's own state (a new gate if it must persist) | any pure mechanism's default; `TrackSpec`; `U-PROJ`'s spec data | author / consumer → the `boundsOf`-shaped seam → the mechanism | `[T]` arithmetic · `[H]` seam · `[U]` rendered width |
| **the minimized state + the `0 ⇒ minimized` mapping** | the consumer's `census` + `revealed` predicate (or authored graph data in this repo's own demo) | a caller-supplied `is-minimized` member to `container`; a mirror-class literal; `zones`' built-in empty token; `U-PROJ` | consumer → `isEmpty` / `computeTrackVars` | `[T]` the two-limb table · `[H]` wiring · `[U]` the visible collapse |
| **the minimized member's slot/location** | the consumer's opaque slot key + injected container (`slot-host`); the consumer's scalar distance (`withinProximity`) | any coordinate/geometry in a shared module; slot-host per-zone vocabulary; a foundation store | consumer → `slot-host` / `withinProximity` / the reveal channel | `[T]` comparator + typed refusal · `[H]` seams · `[U]`/APP the expansion + ghost, under the `§5.U`/`§6.1`/`§6.2` audit |

**AND THE ONE THING `§6` MUST NOT BE READ AS.** None of the above authorises a new unit, a new
store, a new MCP surface or a new mechanism; the *hosting* half (`slot-host`) and the *proximity*
half (`relocate`) are **already landed**, and the *state* halves are the **consumer's** by a recorded
ruling. A design that wants the foundation to remember a zone's minimized flag across restarts is
asking for **a new gate** (`H-r16`), and the standing text says so affirmatively.

---

## §7. Gaps and findings

**Everything the map exposes.** Each: **what**, the **evidence site**, and the **owner**. Severity
is this pass's own reading.

| # | Finding | Evidence site | Owner | Severity |
| --- | --- | --- | --- | --- |
| **F-1** | **The Runtime CONSTRUCTOR seeds payload `userData` with the envelope's `content` ARRAY.** `Runtime.constructor` calls `this.buildPayloads(translated.content, opts.envelope.content)`, while `loadEnvelope` calls `this.buildPayloads(translated.content, translated.userData)`. The two paths therefore carry **different kinds of value in the same field**, and **no spec section and no decision row pins the constructor's argument** (`docs/specs/runtime-host.md` §3.1 pins only the load path's R8 rule). `Runtime.payloads` is consumed by `tearDownGraph()`'s `dropPayload`. | `src/renderer/runtime.ts` `Runtime.constructor` · `Runtime.loadEnvelope` · `Runtime.buildPayloads` · `Runtime.tearDownGraph`; contrast `docs/specs/runtime-host.md` §3.1 | this repo (`src/renderer/**`) | **MED** — an undocumented state shape on the boot path |
| **F-2** | **The module system's RENDERER half has NO shipped consumer.** `docs/specs/module-feature-list.md` §3 records **U5** (`ctx.captureView` + `setCaptureProvider`) and **U6** (`RuntimeOptions.transformRouter`, *"applied at READ time to the MCP views"*) as **LANDED** — but **no `src/**` file constructs a renderer-side `CapabilityRouter`, calls `setCaptureProvider`, sets `transformRouter`, or calls `runHooks`.** The only constructor that passes a `transformRouter` is `tests/module-transform.test.ts`. So `ctx.captureView()` would answer an **empty-SVG data-URI** and registered after-render hooks would **never run**. The **main-process** router (created in `src/main/main.ts`, synced from the store) is a different instance and backs only the dynamic tool names. | `src/renderer/extensions.ts` `setCaptureProvider`/`runHooks`/`applyTransforms`; `src/renderer/runtime.ts` `RuntimeOptions.transformRouter` + the three `this.transformRouter ? … : …` sites; `src/renderer/renderer.ts` `new Runtime({mount, envelope, maxJournalLength})`; `tests/module-transform.test.ts` | this repo | **MED** — a **doc claim (LANDED) that the shipped wiring does not exercise**; the carriers exist and are tested, but they are **unreachable from the app** |
| **F-3** | **Two store methods have no shipped caller, next to one that does.** `ModuleStore.setDisabled` is reached **only** from `ipcMain.handle(IPC_MODULE_SET_DISABLED)` in `src/main/main.ts` (verified: the sole call site in `src/**`), and `ModuleStore.remove` is called **nowhere in `src/**` at all** — it is reachable from tests only. Meanwhile `src/renderer/secure-panels.ts` `refresh()` calls only `module.get()`, so the module pane is **display-only** and the store's second writer has **zero UI**. This is the **recorded `U8 §4 F2` residual** ("pane enable/disable is DISPLAY-ONLY, no control wired"), so the *finding* is that the row is **easy to mistake for a wired path**: a live IPC handler + a live store writer with **no user-facing control**, and a third store method with no caller at all. | `src/main/main.ts` `ipcMain.handle(IPC_MODULE_SET_DISABLED)`; `src/main/preload.ts` `module.setDisabled`; `src/renderer/secure-panels.ts` `refresh()`; `src/main/module-store.ts` `remove`; `docs/specs/module-feature-list.md` §3 (U8) + §8 (`M-r11`) | this repo | **LOW** (recorded residual — a wiring census correction, not a defect) |
| **F-4** | **`themeWiringRole` is exported and called by NOBODY.** The unit's contract declares it as a **bounded renderer WIRING role (the attribute-name holder)** with a row (`M-7`) that drives it **against an element double** — and it is **deliberately inert** (`§2.4` item 2). It is nevertheless a **contract-declared role with zero call sites in `src/**` and zero in `tests/**`**: the app never resolves the state node through it, so the role's only live effect is its own test row. **This is recorded as an observation, not a breach** — the contract itself says nothing in the unit reads it. | `src/renderer/renderer.ts` `themeWiringRole`; `docs/specs/theme-control.md` §2.4 items 1/2, §3 `M-7`, §6 item 12 (the allowed file set) | this repo | **LOW** |
| **F-5** | **Two holders of the ELEMENT-ID kind.** The engine's registry (surfaced as `data-node-id`) is authoritative, and `Runtime.cssIndex`/`propsIndex` are a **second holder of the same kind** — documented as a *derived cache* (A5) and rebuilt on every load/op/teardown, but **nothing in the code (or in a test named here) enforces that the index can never disagree with the registry**; the resolution path is *index first, then `getNode`*, and the index's rebuild is driven by four separate call sites. | `src/renderer/runtime.ts` `rebuildIdIndex` (called from the constructor, `loadEnvelope`, `loadDoc`, `applyCommand`, `journal`, `tearDownGraph`) · `resolveTarget`/`resolveString`/`nodeByCssId`/`nodeByPropsId`; `docs/specs/mcp-endpoint.md` §6.5 (A5); `docs/specs/runtime-host.md` §3.7 | this repo | **LOW–MED** — the *authority* is clear; the *invariant* is pinned only as A5's intent |
| **F-6** | **Two holders of the TOOL-ACCESS kind, with a swallow between them.** `securityStore.current` (persisted) and `SecurityGate._config` (live) are both driven from the **one** IPC site, so there is one writer — **but a persist failure is caught and ignored** (`security-store.ts` `persist()`: *"the in-memory config still applies for this process lifetime"*), so the app can run with a gate the human set and a file the human did not. The spec pins the **channel**, not this divergence. | `src/main/security-store.ts` `persist()`; `src/main/security.ts` `SecurityGate`; `src/main/main.ts` `ipcMain.handle(IPC_SECURITY_SET)`; `docs/specs/mcp-endpoint.md` §6.4 | this repo | **LOW** — arguably intended (non-fatal persistence); it is **undocumented** |
| **F-7** | **The boot snapshot `persisted` is read once and never refreshed.** `src/main/main.ts` `main()` takes `const persisted = securityStore.get()` to build the gate; after any `IPC_SECURITY_SET` the **gate** is re-applied but `persisted` is **not** re-read (and is not read again anywhere). It is a **write-once local with no reader after step 7** — harmless today, and **recorded nowhere**. | `src/main/main.ts` `main()` | this repo | **LOW** |
| **F-8** | **The `provident:invoke` channel name is written as a LITERAL in one place and as the `IPC_INVOKE` constant in the other.** `RendererBackend.invoke` does `win.webContents.send('provident:invoke', req)` while `src/main/preload.ts` subscribes with `IPC_INVOKE` (and `src/main/main.ts` **imports `IPC_INVOKE` and never uses it**). The two agree today by spelling only; **no row pins the agreement**. | `src/main/mcp-server.ts` `RendererBackend.invoke`; `src/shared/types.ts` `IPC_INVOKE`; `src/main/preload.ts` `onRequest`; `src/main/main.ts` (the unused import) | this repo | **LOW** |
| **F-9** | **A DOC CLAIM THAT CONTRADICTS THE CODE.** `docs/specs/mcp-endpoint.md` §3.6 carries the note: *"`base-boundary` status is latent — the host never sets `maxJournalLength`, so condense never fires and `_restoreBase` never runs (`pending.md` GAP 1)"*. **The code does the opposite since the Settings pane landed:** `src/renderer/renderer.ts` `main()` reads `cfg.maxJournalLength` over the security bridge and passes it into `new Runtime(...)`, which passes it to **every** `Supervisor` it builds (`new Supervisor({events, maxJournalLength: this.maxJournalLength})`), and `src/main/security-store.ts` persists it (sanitized to a positive integer). `docs/pending.md`'s `GAP 1` row already records the resolution as *"PARTIALLY RESOLVED 2026-08-26"* — so **the spec section is stale against both the code and its own tracker**. | `docs/specs/mcp-endpoint.md` §3.6 (the implementation-status note); `src/renderer/renderer.ts` `main()`; `src/renderer/runtime.ts` `Runtime.constructor` · `loadEnvelope` · `journal`/`validateExport`/`validateSig`; `src/main/security-store.ts` `sanitize`/`set`; `docs/pending.md` the `GAP 1` row | this repo (the doc) | **MED** — a reader would conclude a live feature is dead |
| **F-10** | **Window geometry is stored NOWHERE and recorded NOWHERE.** `new BrowserWindow({width: 980, height: 720, …})` is a literal; there is no bounds persistence and no restore path. This is consistent with the store census, but **no section and no row names it** — unlike the theme/focus/layout absences, which have explicit rows. The honest form is *"nothing records it"*. | `src/main/main.ts` `main()`; `§2` (the store census) | the next pass that wants it recorded | **LOW** |
| **F-11** | **The application menu is stored NOWHERE and authored NOWHERE.** `src/main/**` contains **no** `Menu` / `setApplicationMenu` reference at all — the app runs Electron's default menu. The one in-tree menu artifact is `src/shared/menu-template.ts` (`U-MENULIB`, `DONE`), a **pure catalog → template projection imported by no `src/**` file and in no bundle**. So *"menus"* — a case `S-d14`/`A-d7` names explicitly — has **state in no layer**: not main, not the renderer, not the envelope. | `src/main/**` (a grep for `Menu` returns nothing); `docs/specs/menulib.md`; `§2.6` above | the next pass that wants it recorded | **LOW** |
| **F-12** | **`dom-shim.ts` writes a process global and holds a module-level registry.** `installShim()` clears `byId` and assigns `globalThis.document = shimDocument`; `byId` accumulates an entry per `getElementById` call (`shimDocument.getElementById` **auto-creates**). It is the **only** `src/shared/` module with module-level mutable state, and it is **imported by the `[X]` harness bundle only** — but the ban (`H-r5`, `S-d3`) is on **expansion**, and the existing state is **unrecorded as state** anywhere. Recorded here as a map observation, not as a breach. | `src/shared/dom-shim.ts` `byId` · `shimDocument` · `installShim`; `H-r5`; `docs/specs/ci-ui-leg.md` (Layer declaration, `[X]`) | this repo | **LOW** |
| **F-13** | **`randToken` in `secure-panels.ts` is dead code.** The pane's *Regenerate* handler body generates its own token with `Math.random().toString(36).slice(2, 34)`; the module-level `randToken` helper is declared and **never called**. Two spellings of the same intent, one of them unreachable. (The token VALUE itself is generated **in the page** and written through `security.set` — so the token's entropy source is the renderer, not main.) | `src/renderer/secure-panels.ts` `randToken` · `TOKEN_GEN_BODY`; `src/main/security-store.ts` `set` | this repo | **LOW** |
| **F-14** | **Two gate-map keys are unroutable by design but look like tools.** `module.disable` and `module.enable` are in `TOOL_GROUPS` (so they *gate* correctly) but **not in `ALL_TOOLS`**, so they can never be registered, listed or invoked. The state is documented (the `M-r11` advisory row; the engine-drift measurement records them as `gateOnly`), **so this is a census caveat rather than a defect** — recorded because a raw grep of the bundle finds them and a reader may count them as tools. | `src/main/security.ts` `TOOL_GROUPS`; `src/main/mcp-server.ts` `ALL_TOOLS`; `docs/pending.md` the `M-r11` row; `docs/specs/engine-drift-measurements.md` | this repo | **LOW** |
| **F-15** | **The tree carries work dated AFTER this pass's date.** `docs/pending.md` `§N` (the `SLOT-HOST-ENVELOPE-AUTHORED-CONTAINER-SOURCE` disposition) is dated **2026-10-04**, while this document is filed **2026-10-01** per the architect's instruction. A reader comparing dates will see a row from the future. **Stated rather than smoothed:** the date of this pass is a **filing convention**, not a claim about the tree's state, and the `§N` date is that pass's own. | `docs/pending.md` §N (its own header date); `§8` below | the pass that owns `§N` | **LOW** (a dating observation) |

**THE THREE THINGS THE MAP EXPOSES THAT ARE NOT ROWED ABOVE, STATED SO THEY ARE NOT READ AS
OVERSIGHTS.** **(i)** *No state has **no** authority* — every row in `§2` names an owner; the three
kinds answered by *"the consumer"* (`§3`) are **rulings**, not gaps. **(ii)** *No store exists
without a recorded decision* — the census is exactly two files, both described by a section and
covered by the family boundary row (`NO-FOUNDATION-CONFIG-FILE-FACILITY` clause 1 names both).
**(iii)** *No "second store" hiding in a bundle* — the `12`-of-`19` unimported modules
(`§2.6`) are the repo's **pure family**, and a pure module cannot hold storage by its own contract.

---

## §8. Provenance

**WHAT I READ (`[H]` unless marked).** Every file in `src/**`: `src/main/main.ts`,
`preload.ts`, `mcp-server.ts`, `security.ts`, `security-store.ts`, `module-store.ts`,
`standalone.ts`, `battery-host.ts`; `src/renderer/renderer.ts`, `runtime.ts`, `extensions.ts`,
`secure-panels.ts`, `index.html`; all `19` files of `src/shared/*.ts` (read in full or read for
their declared surface and their module-scope state); `package.json`, `tsconfig.json`; the built
`dist/main/{main.cjs,preload.cjs,battery-host.mjs,standalone.mjs}` and `dist/renderer/renderer.js`
(**read only as a bundle-membership witness — no leg, no build and no boot produced this tree; it
is the tree present in the repo**).

**SPECS AND TRACKERS READ.** `docs/specs/`: `mcp-endpoint.md` (full), `runtime-host.md` (full),
`user-flow-audit.md` (full), `ci-ui-leg.md` (§0, the Layer declaration, §3.5),
`foundation-no-config-file-persistence-review.md` (full), `provident-electron-shell-chrome-handoff-review.md`
(the `S-d*` / `H-r*` standing clauses), `zones.md`, `census.md`, `projection.md`, `slothost.md`,
`relocate.md`, `container.md`, `theme-control.md`, `focus-model.md`, `module-feature-list.md`,
`module-import-proposal.md`, `engine-pin.md`, `engine-drift.md`/`engine-drift-measurements.md`,
`theme.md`, `overlay.md`, `gsession.md`, `gutter.md`, `gutter-ui.md`, `focus-tool.md`, `menulib.md`,
`listhost.md`, `mount-invariant-guard.md` — **read at their cited sections and rows, not always in
full** (the spec corpus is ~40 600 lines; `§4`/`§5`/`§6` cite the sections actually read).
`docs/decisions.md` (the `ACTIVE` region and the named rows), `docs/pending.md` (§A, §B, §M, §N, and
the `GAP 1`/`M-r11` rows), `docs/defects.md` (the `## OPEN` table), `docs/next-steps.md` (the ledger
line), `AGENTS.md`.

**WHAT I DID **NOT** READ.** (a) The **upstream package** — `node_modules/provident-ssr/**` beyond
`package.json`'s version field, and `../Preempt-Providence/**` in full: the engine's own storage
(`Supervisor` internals, the journal's stacks, the `requestId` LRU, `BOOLEAN_ATTRS`) is described
here **only as the specs and the host's own comments describe it**, never from the engine source.
(b) **The fork's tree** — `../Astrographer/**` is cited **only** through this repo's own records about
it. (c) **`scripts/**`** — read only at the two-name store witness (`scripts/electron-ui.mjs`
`operatorProfileState`) and the `electron-divergence.mjs` fixture region named by a decision row.
(d) **`tests/**`** — read only for import-reachability census and for the dead-export scan; **no test
was run**. (e) **`archive/**`** — not read. (f) Most of the spec corpus's `§3a`/`§3b`/`§5.5` register
blocks, adversarially.

**WHAT I DID NOT DO — STATED PLAINLY.** **I ran no suite, no leg, no trio, no `tsc`, no build, no
Electron boot, no battery, and no git command.** Every figure in this document is **my own file read**
or a **quoted spec/decision figure attributed to its source**. In particular: the `22`-name
`ALL_TOOLS` count, the `27`-key `TOOL_GROUPS` count, the `19`-module split, the `12`-of-`19`
unimported census, the `7`-member `MUTATING_METHODS` set, the `980 × 720` window literals, the three
backend timeout literals and the bundle-membership greps are **counted/read by this pass from the
files named at each claim**; the leg figures (`npm test`, `ui`, `divergence`, the registers) are
**quoted from the specs and are not this pass's measurements** (`EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`
/ the gate's `RCA-12` — *never present a node reading as app evidence*).

**THE DATE.** This document is filed **2026-10-01** per the architect's instruction. `docs/pending.md`
`§N` carries a **2026-10-04** header date (see `§7` `F-15`); **that is another pass's own date, quoted
as found, and this pass's date is a filing convention rather than a claim about the tree.**

**THE LAYER OF THIS DOCUMENT.** It is a **research record**: no code-bearing surface, no register, no
`§5.U` matrix and no `§6.1` report are emitted — and that is the **explicit, recorded zero-row
exemption** of `docs/specs/user-flow-audit.md` §2 (*"a measurement/documentation record … for such a
unit no `§5.U` matrix and no `§6.1` report are emitted, and the exemption is RECORDED in the unit's
own spec with its reason"*), and it is the exemption class `AGENTS.md` item 11(g) names **by row
name** (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`: doc-only units are outside gate 11).
