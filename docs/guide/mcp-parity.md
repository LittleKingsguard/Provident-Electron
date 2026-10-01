# MCP parity — one graph, several views, and the declared list of where they may differ

This page documents the **parity surface**: which views of the app an MCP agent can read,
which of their differences are *intended*, and which legs measure that. It has no single unit
id — the surface is the shell's MCP endpoint itself (`docs/specs/mcp-endpoint.md`), and the two
units that landed its measurement halves are **`U-REALDOM-BOOT`** (ledger row `C1`, wave `C`;
`docs/next-steps.md` `## DONE — U-REALDOM-BOOT`) and **`U-DIVERGENCE-EXT`** (ledger row `C2`,
wave `C`; `docs/next-steps.md` `## DONE — U-DIVERGENCE-EXT`). It is the second page in the
reading order (`docs/guide/README.md`). Two readers: a developer consuming this repo as a
prebuild baseline who needs to know what the agent sees and what it cannot, and a fork author
who is changing rendering and must not break the parity the legs measure.

The one-line answer: **the graph is the authority, every view is a re-emit of it, and the view
differences that are not defects are written down as contract rather than discovered by a red
leg.**

## What it is

Parity here is a statement about **one producing graph read through several materializations**.
The graph is authoritative and the HTML is a view re-emitted on demand
(`docs/specs/mcp-endpoint.md` §1, §7 `P-E2`) — so the question parity answers is not "does the
view update", but "which view differences are intended, and which would be a defect".

**The view axis.** Three materializations are reachable through the MCP surface: the live DOM
`renderedHtml` and the SSR fragment `ssrHtml`, returned together by one call
(`docs/specs/mcp-endpoint.md` §3.2), and the text-only `markdown` (§3.3). The probe categories
that name the seams where the DOM and SSR adapters are implemented differently are
`docs/specs/adapter-parity-battery.md` §2 (`P1`–`P9`), and how a divergence is triaged into a
contract pin, a host-side defect, or an engine defect is §4 of the same file.

**The host axis.** The same view pair is also produced under a **real Electron renderer** and
under this repo's DOM shim (`src/shared/dom-shim.ts`), and those two hosts are compared by
`npm run divergence` (`docs/specs/ci-divergence-leg.md` §5, the amendment block's `A-2`). A
shim-versus-real difference is not a DOM-versus-SSR difference: the two comparisons run on
different pairs and only one of them is an identity check (`docs/specs/adapter-parity-battery.md`
§2 `P5`, §6).

**The declarative mirror.** Every read-only tool that matters here also has an `mcp://` resource
counterpart, gated by the same `read` group (`docs/specs/mcp-endpoint.md` §3.7). That is the
surface a client can poll without driving anything.

**What it does not answer.** Layout and geometry are unprovable in a node suite and the HTML
tools read `mount.innerHTML`, not a layout (`docs/specs/ci-ui-leg.md` §3.3 `C-5`, `C-7`). The
IPC hop is a different layer from either leg (`docs/specs/ci-divergence-leg.md` `A-6.4`). And
neither leg retires the other's claims: a `ui` green is not stronger than a `divergence` red
(`docs/specs/ci-ui-leg.md`, the Layer declaration, anchor (iii)).

## Where it lives

| File | Exports |
| --- | --- |
| `src/main/mcp-server.ts` | `ProvidentMcpServer` (class; static `ALL_TOOLS`, static `ALL_RESOURCES`; `allowedToolNames()`, `allowedResourceUris()`, `applyGatePatch()`, `readResource()`, `notifyGraphChanged()`, `getGateConfig()`, `gate`, `registeredEnabled()`, `registeredResources()`, `resourceEnabled()`, `connectMockTransport()`, `ensureServerRegistered()`), `RendererBackend` (class; `invoke()`, `handleReply()`, `attachWindow()`, `markReady()`, `isReady()`, `pendingCount()`, `maybeDigestForTest()`), `McpBackend` (interface), `McpServerOptions`, `RendererBackendOptions`, `McpTransportKind`, `SecuritySnapshot`, `imageResult`, `toolForName`, `registeredToolNames`, `invokeModuleTool`, `handleModuleTool`, `syncModuleRouter` |
| `src/main/security.ts` | `ToolGroup`, `groupForTool`, `toolAllowed`, `moduleToolAllowed`, `defaultSecurityConfig`, `authorized`, `applyPatch`, `SecurityConfig`, `SecurityGate` (class; `config`, `enabled`, `toolAllowed()`, `checkRequest()`, `apply()`) |
| `src/shared/types.ts` | the result shapes this page reads: `RenderedHtmlResult`, `MarkdownResult`, `DispatchResult`, `NodeStateResult`, `ListTargetsResult`, `NodeInfo`, `Census`, `JournalResult`; plus `RpcMethod`, `RpcRequest`, `RpcReply`, `NotifyPayload` and the channel constants `IPC_INVOKE`, `IPC_REPLY`, `IPC_READY`, `IPC_NOTIFY`, `IPC_SECURITY_GET`, `IPC_SECURITY_SET`, `IPC_MODULE_GET`, `IPC_MODULE_SET_DISABLED` |
| `src/renderer/renderer.ts` | `handleRequest(runtime, req, notify)`, `startGutterAffordance(runtime)`, `themeWiringRole(runtime)`, interface `GutterWriteReading` — the IPC dispatcher; `MUTATING_METHODS` is module-private |
| `src/renderer/runtime.ts` | `Runtime` (class; `renderedHtmlResult()`, `markdownResult()`, `markdown()`, `dispatch()`, `listTargets()`, `nodeState()`), `RuntimeOptions` |
| `src/main/battery-host.ts`, `src/main/standalone.ts`, `src/main/main.ts` | no exports — process entry points, bundled to `dist/main/battery-host.mjs`, `dist/main/standalone.mjs`, `dist/main/main.cjs` |
| `scripts/electron-divergence.mjs` | `SCENARIO_KINDS`, `PINNED_CHECKS`, `ATTRIBUTE_NAME_FOLD`, `FALSY_TOGGLE_MEMBER`, `FALSY_TOGGLE_TARGET_ID`, `FALSY_TOGGLE_OFF_ID`, `FALSY_TOGGLE_REMOVE_ID`, `scenarioEnvelope(kind)`, `envelopeDigest(envelope)`, `extractAttributeNames(html, options)`, `attributeSetDifference(a, b)` |
| `scripts/electron-spawn.mjs` | `repoRoot`, `electronBin`, `mainCjs`, `baseArgs`, `stdioWiring`, `stdioWiringJson`, `electronEnv()`, `scratchRoot()`, `makeFreshProfile()`, `cleanupProfiles()`, `spawnProfile()`, `spawnElectron()`, `ChildProcessTransport` |
| `scripts/electron-ui.mjs` | no exports — the `npm run ui` leg |
| `scripts/mcp-cli.mjs` | no exports — the `npm run mcp` CLI |
| `tests/adapter-parity-battery.test.mjs` | the view-vs-view rows (facts measured by a row are cited where used) |
| `tests/mcp-resources.test.ts`, `tests/mcp-notify.test.ts`, `tests/markdown-endpoint.test.ts`, `tests/runtime.test.ts` | the resource, push, markdown and Runtime-view rows respectively |

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/mcp-endpoint.md` | §1, §7 `P-E2` | graph-canon / fragment-is-a-view — every view is a re-emit of the graph |
| `docs/specs/mcp-endpoint.md` | §3.2 | the two HTML views in one result, and the `data-node-id` opt-in (see §7 `P-E3`, `P-E8` for the transport and attribute pins) |
| `docs/specs/mcp-endpoint.md` | §3.3 | the markdown view: what it drops, and that it is a fresh adapter per call |
| `docs/specs/mcp-endpoint.md` | §3.7 | the three `mcp://` resources, their mirror tools, and the `read`-group gate |
| `docs/specs/mcp-endpoint.md` | §8 | the push: stdio-only, content-level, app-Runtime-sourced, best-effort |
| `docs/specs/mcp-endpoint.md` | §6.2, §6.3 | the group as the permission unit, and the optional HTTP bearer token |
| `docs/specs/adapter-parity-battery.md` | §2 | `P1`–`P9`, the divergence surface, and each category's expected verdict class |
| `docs/specs/adapter-parity-battery.md` | §3, §4 | the scenario catalogue and the three triage verdicts |
| `docs/specs/adapter-parity-battery.md` | §6 | the normalize-before-compare risks (escaping, minted ids, oversized fragments) |
| `docs/specs/ci-divergence-leg.md` | §5, `A-1`, `A-2`, `A-4` | the `N = 9` pin, the scenario-envelope channel, the set-wise attribute extractor and the separate `[EXT]` tally |
| `docs/specs/ci-divergence-leg.md` | `A-2.7`, `A-6.4`, `A-6.7` | what the extension does **not** compare and does not prove |
| `docs/specs/ci-ui-leg.md` | §3.3, §3.4, §3.6 | what a `ui` green must not be read as (`C-1`–`C-7`), the `UNSUPPORTED` word set, the exit-code vocabulary |
| `docs/specs/ci-ui-leg.md` | §1 item 1, the Layer declaration | the measurement leg and the identity leg must never merge; the layer labels |
| `docs/specs/engine-pin.md` | §5.5 `P-IM-1` | the SSR/shim per-tag attribute-name set equality and its two declared exceptions `E1`/`E2` (narrowed by measurement, 2026-09-27) |
| `docs/next-steps.md` | `## DONE — U-REALDOM-BOOT`, `## DONE — U-DIVERGENCE-EXT` | the landed records: what was measured, on which layer, and what was not |

## Use cases

**UC-1 — read the current state in both views and know which differences are intended.** You
want the app as it stands, from the live DOM and from the SSR re-emit, plus the census. One call
gives all three, and the differences you will see are the declared ones — bound listeners in the
DOM versus literal `on<event>` attributes in the SSR, the SSR's `<style>` prefix, the dropped
form-value slots (`docs/specs/adapter-parity-battery.md` §2 `P2`–`P4`).

**UC-2 — hand an agent a compact document instead of HTML.** You want a small, non-interactive
text view of the same graph. That is the markdown view, and its drops are the reason you must
not try to trace elements with it (`docs/specs/mcp-endpoint.md` §3.3).

**UC-3 — let a client poll declaratively instead of driving tools.** You want read-only access
by URI, and to know when the app's HTML changed without polling. The three resources cover the
first half; the stdio-only push covers the second, and both are gated by the same `read` group
(`docs/specs/mcp-endpoint.md` §3.7, §8).

**UC-4 — you changed rendering and must not break parity.** You have edited a handler body, a
`cssDef`, a prop write or the shim, and you need to know whether you broke the DOM/SSR
agreement or the real-vs-shim agreement. The two legs answer different questions:
`npm run divergence` is the identity check on nine pinned structural surfaces plus a separately
tallied attribute observation (`docs/specs/ci-divergence-leg.md` §5, `A-2`), and `npm run ui` is
a single honest measurement taken inside one real renderer boot (`docs/specs/ci-ui-leg.md` §1,
§3.0 `R2`). Neither substitutes for the other.

## Code, runnable

Every example below drives the **built** tree, so run `npm run build` first. UC-1 – UC-3 use the
official SDK client, exactly as `scripts/mcp-cli.mjs` and `tests/adapter-parity-battery.test.mjs`
do; UC-4 imports the divergence leg's pure half, which is importable by contract (`A-2.8`, and
the file's own main-module guard).

```ts
// UC-1 — both HTML views of the same graph, from one call
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import type { Census, RenderedHtmlResult } from '../src/shared/types.js'

const client = new Client({ name: 'parity-read', version: '0.1.0' })
await client.connect(new StdioClientTransport({
  command: process.execPath,
  args: ['dist/main/battery-host.mjs', '--mcp-transport=stdio'],
}))

const r = await client.callTool({ name: 'provident.get_rendered_html', arguments: {} })
// The cast is only because the SDK's content blocks are a union:
const html = JSON.parse((r.content as Array<{ type: 'text'; text: string }>)[0].text) as RenderedHtmlResult

// html.renderedHtml — the live #app innerHTML (the DOM view)
// html.ssrHtml      — the SSR fragment re-emitted from the SAME graph (the build-time view)
// html.census       — { registered, inTree, unplaced, destroyed, prototypes }
const census: Census = html.census

// Both views carry data-node-id on every emitted element — the host opted in
// (docs/specs/mcp-endpoint.md §3.2, §7 P-E8), so this holds on both strings:
const domTraced = /data-node-id="node-\d+"/.test(html.renderedHtml)   // true
const ssrTraced = /data-node-id="node-\d+"/.test(html.ssrHtml)       // true

await client.close()
```

```ts
// UC-2 — the same graph as a compact, non-interactive document
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import type { MarkdownResult } from '../src/shared/types.js'

const client = new Client({ name: 'parity-markdown', version: '0.1.0' })
await client.connect(new StdioClientTransport({
  command: process.execPath,
  args: ['dist/main/battery-host.mjs', '--mcp-transport=stdio'],
}))

const r = await client.callTool({ name: 'provident.get_markdown', arguments: {} })
const md = JSON.parse((r.content as Array<{ type: 'text'; text: string }>)[0].text) as MarkdownResult

// md.markdown — the text document; md.census — the same census shape as UC-1
const hasNodeIds = /data-node-id/.test(md.markdown)   // false — data:* props are dropped
const hasHandlers = /\son[a-z]+=/.test(md.markdown)   // false — on:* props are dropped

// An empty graph answers '' (docs/specs/mcp-endpoint.md §3.3), so treat '' as "nothing to
// render" rather than as a failed read; for element→node tracing use UC-1's renderedHtml.

await client.close()
```

```ts
// UC-3 — the declarative read surface: three resources, one gate
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

const client = new Client({ name: 'parity-resources', version: '0.1.0' })
await client.connect(new StdioClientTransport({
  command: process.execPath,
  args: ['dist/main/battery-host.mjs', '--mcp-transport=stdio'],
}))

const app = await client.readResource({ uri: 'mcp://provident/app' })       // text/html
const targets = await client.readResource({ uri: 'mcp://provident/targets' }) // application/json
// The node URI is a TEMPLATE: only concrete ids resolve, so read one you saw in `targets`:
const nodes = JSON.parse((targets.contents[0] as { type: 'text'; text: string }).text)
const firstNodeId = (nodes.nodes as Array<{ nodeId: string }>)[0].nodeId
const node = await client.readResource({ uri: `mcp://provident/node/${firstNodeId}` })

// app.contents[0].text     — the same snapshot provident.get_rendered_html returns
// targets.contents[0].text — the addressable vocabulary; the only place concrete node ids appear
// node.contents[0].text    — that node's resolved states + census
//
// Reads are point-in-time (docs/specs/mcp-endpoint.md §3.7) — do not cache across a dispatch.
// The push that tells you a re-read is due is stdio-only and content-level (§8): it is delivered
// by ProvidentMcpServer.notifyGraphChanged(), which answers `false` — not an error — when the
// transport is not stdio, the server is not connected, or `read` is off.

await client.close()
```

```ts
// UC-4 — compare two views set-wise, with the exceptions declared, using the leg's pure half
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import {
  ATTRIBUTE_NAME_FOLD,
  attributeSetDifference,
  extractAttributeNames,
} from '../scripts/electron-divergence.mjs'

const client = new Client({ name: 'parity-attributes', version: '0.1.0' })
await client.connect(new StdioClientTransport({
  command: process.execPath,
  args: ['dist/main/battery-host.mjs', '--mcp-transport=stdio'],
}))

const r = await client.callTool({ name: 'provident.get_rendered_html', arguments: {} })
const { renderedHtml, ssrHtml } = JSON.parse((r.content as Array<{ type: 'text'; text: string }>)[0].text)

const dom = extractAttributeNames(renderedHtml)   // { fold, missing, raw, names: Set, entries, tokenRule }
const ssr = extractAttributeNames(ssrHtml)
const diff = attributeSetDifference(dom.names, ssr.names)
// diff: { sizeA, sizeB, sameSize, aContainsB, bContainsA, onlyInA, onlyInB, equal }

// Do NOT assert `diff.equal`: the measured difference on the landed app is `only-on-real =
// ["data-wire"]` with SSR-only `["onclick","oninput","onpointerdown"]`, which is why the
// narrowed P-IM-1 (docs/specs/engine-pin.md §5.5) declares exactly two exception classes and
// why a full set-equality row is a guaranteed false red. Subtract the declared class and
// compare what is left:
const declared = new Set(['data-wire', 'onclick', 'oninput', 'onpointerdown'])
const structuralDom = new Set([...dom.names].filter((n) => !declared.has(n)))
const structuralSsr = new Set([...ssr.names].filter((n) => !declared.has(n)))
console.log(ATTRIBUTE_NAME_FOLD)                                          // 'lower+node#'
console.log(attributeSetDifference(structuralDom, structuralSsr))         // the residual, by name

await client.close()
```

## What it refuses / does not do

- **No new MCP surface for measurement.** The legs drive the **existing** tools
  (`provident.load` / `code.load` / `provident.get_rendered_html`); an MCP-visible "eval in the
  renderer" tool is a self-granting capability breach and is forbidden
  (`docs/specs/ci-ui-leg.md` §3.2, §0 prohibition 5).
- **The markdown view is non-interactive and unmapped.** It carries no event surface and no
  element→node mapping, and it is not the view to trace with (`docs/specs/mcp-endpoint.md` §3.3).
- **The `ui` leg is not an identity leg and is not a `divergence` variant.** A `ui` green proves
  one probe's value in one real renderer boot and nothing else — not the packaged app, not
  app-green from node-green, not that `provident.dispatch` is a real gesture, not that
  `get_rendered_html` observes layout, not that the shim is faithful
  (`docs/specs/ci-ui-leg.md` §1 item 1, §3.3 `C-1`–`C-7`).
- **The shim leg is recorded `UNSUPPORTED`** for that measurement — never `divergent`, never a
  fabricated `0` (`docs/specs/ci-ui-leg.md` §3.4).
- **A green divergence leg is silent on IPC.** It proves the nine pinned structural comparisons,
  not the app's `provident.op` hop (`docs/specs/ci-divergence-leg.md` `A-6.4`).
- **The attribute extractor compares names present, never values or serialized form.** It is not
  a geometry, style or layout check and it does not make the leg an identity leg
  (`docs/specs/ci-divergence-leg.md` `A-2.7`).
- **`ENVELOPE-MISMATCH` is an instrument error, not a divergence verdict** — no comparison runs
  when the two hosts were handed different scenarios (`docs/specs/ci-divergence-leg.md` `A-1.6`).
- **No push over HTTP, and no push when `read` is off.** The HTTP transport is stateless, so a
  notify there is a no-op and never a hang (`docs/specs/mcp-endpoint.md` §8).
- **No headlessness claim and no CI config.** Both legs need a display and are repeatable
  scripts a human or agent runs (`docs/specs/ci-ui-leg.md` §1, `docs/specs/ci-divergence-leg.md`
  `A-6.6`).

## What a fork must supply

The parity surface has seams, but they are the MCP **wiring** seams rather than
absent/non-callable/throwing rows the specs spell out one-for-one. Where a degradation is
declared in code it is cited; where this repo declares none, the cell says so.

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `McpServerOptions.backend` (an `McpBackend` with `invoke(method, payload)`) | REQUIRED | the fork (this repo supplies `RendererBackend`) | this repo declares no degradation for a missing backend: the tool handlers call `this.backend.invoke(...)` unguarded (`src/main/mcp-server.ts:651-660`) — **unverified**; would be settled by a spec clause | **unverified** (no guard read) | the thrown/rejected error becomes the tool call's error reply (`src/main/mcp-server.ts:1148-1155`; the renderer's own `unknown method:` throw, `src/renderer/renderer.ts:218`) |
| `McpServerOptions.transport`, `.port`, `.gate`, `.moduleStore`, `.router` | OPTIONAL, defaulted | the fork | `port` defaults to `3787`, `gate` to `new SecurityGate()` (which defaults to `read` + `dispatch`), the rest to `null` (`src/main/mcp-server.ts:349-356`, `src/main/security.ts:86-88`) | — | — |
| `RendererBackendOptions.readyTimeoutMs` | OPTIONAL, defaulted | the fork | the default `30000` applies (`src/main/mcp-server.ts:1043`) | — | an `invoke` before readiness rejects `renderer not ready (timeout <n>ms)` (`:1122`); a reset rejects awaiting callers with the reset reason (`:1102-1111`) |
| `RendererBackendOptions.invokeTimeoutMs` | OPTIONAL, defaulted | the fork | the default `60000` applies (`:1044`) | — | rejects `renderer invoke timeout (<n>ms)` (`:1137`) |
| `RendererBackendOptions.largePayloadBytes` | OPTIONAL, defaulted | the fork | the default `1000000` applies (`:1045`) | — | never throws: an over-bound result is **replaced** by `{census, digest, preview, truncated}` (`:1186-1199`) |
| the renderer's `notify` callback — `handleRequest(runtime, req, notify)`'s third argument | OPTIONAL | the renderer wiring (`src/main/main.ts:154-155` forwards it to `notifyGraphChanged()`) | a non-mutating method never calls it (`src/renderer/renderer.ts:232-234`) | returns `false` rather than throwing when not stdio / not connected / `read` off (`src/main/mcp-server.ts:572-586`) | a failed `sendResourceUpdated` is caught and answers `false` (`:581-585`) |
| `RuntimeOptions.transformRouter` | OPTIONAL | the fork | the emit is returned untransformed (`src/renderer/runtime.ts:1241`, `this.transformRouter ? … : out`) | — | **unverified** — no spec clause read that fixes a throwing transform; the transform output is applied to the markdown view too, so a throwing transform would break three views, not one |
| the opt-in `data-node-id` render option | **not a seam** — host-fixed | — | n/a | n/a | n/a: `Runtime` holds `renderOptions = { nodeIdAttribute: true }` as a private field (`src/renderer/runtime.ts:90`); dropping the attribute is a source edit, not a configuration |

## Gotchas measured in this repo

- **`data-node-id` is present in both views and is not configurable.** `Runtime`'s
  `renderOptions` is a private `{ nodeIdAttribute: true }` (`src/renderer/runtime.ts:90`), even
  though the engine option is opt-in and "presence is a renderer decision, never a reader
  assumption" (`docs/specs/mcp-endpoint.md` §7 `P-E8`). A fork that wants it off must edit the
  field.
- **The DOM and SSR attribute-name sets are not equal on the landed app.** The measured
  symmetric difference is `only-on-real = ["data-wire"]` with SSR-only
  `["onclick","oninput","onpointerdown"]`, which is why `P-IM-1`'s full set-equality text was
  **narrowed** to the structural set plus the two declared exceptions `E1`/`E2`
  (`docs/specs/engine-pin.md` §5.5 `P-IM-1`). A row asserting full equality is a guaranteed
  false red.
- **The real DOM serializes a boolean attribute bare and the shim does not.** The real DOM emits
  `<div hidden>`; the shim emits `hidden="true"` — so a row written as
  `includes('hidden="true"')` can never pass against the real DOM
  (`docs/specs/ci-divergence-leg.md` `A-2`, `A-3.5`). Compare attribute **names present**, as a
  set.
- **`N = 9` cannot absorb a new check.** `PINNED_CHECKS = 9` (`scripts/electron-divergence.mjs:55`)
  and the leg self-checks the run's `checks` against that literal (`:726-731`); the extension
  reports through a separate `[EXT]` tally that is never counted in `N`
  (`docs/specs/ci-divergence-leg.md` `A-4.2`–`A-4.5`). Routing one new assertion through the
  harness's `ok(...)` helper turns the leg red as a **pin drift**.
- **A large read is replaced, not truncated in place.** Over `largePayloadBytes`
  (default `1000000`) the result becomes `{census, digest, preview, truncated: true}` with
  `preview` = the first 512 chars of the DOM view (`src/main/mcp-server.ts:1171-1199`). A client
  that only pattern-matches `renderedHtml` reads `undefined` there.
- **`provident.focus` emits nothing, by contract.** It joins the existing `dispatch` group
  (`src/main/security.ts:16`) and is deliberately absent from `MUTATING_METHODS`
  (`src/renderer/renderer.ts:15`), so no `resources/updated` fires and none of the four reading
  tools observe it (`docs/specs/mcp-endpoint.md` §3.8).
- **The push stops when an operator disables `read`.** `notifyGraphChanged()` is gate-aware and
  returns `false` when the `resource:mcp://provident/app` key is not allowed
  (`src/main/mcp-server.ts:577`), and the three resources are registered only under `read`
  (`:615`; `tests/mcp-resources.test.ts`).
- **The legs need a display and refuse rather than skip.** `npm run ui` exits `3` with a message
  naming the fix when no display is available, and `npm run divergence` is the `ui` leg's
  precondition — not green for the same built tree means `PRECONDITION-FAILED`, exit `2`, and no
  measurement taken (`docs/specs/ci-ui-leg.md` §3.6, §5).
- **Spec labels quote upstream feature versions, not the installed engine.** Several sections
  call the markdown endpoint "0.2 Feature 2" — the upstream feature version — while this repo
  requires and installs `provident-ssr@0.5.1` (`package.json`). Read the label as a feature name.
- **`E2`'s exception set is measured, not universal** — the SSR-only inline-handler attributes
  are pinned for the leg's scenario envelopes; whether a fork's own authored handler kinds land
  in the same set is **unverified**, and would be settled by running the extractor over that
  fork's envelopes.

## See also

- `docs/guide/00-base-surface.md` — read first: the tool set, the resources, the runtime, the
  preload bridge and the group model.
- `docs/guide/seams.md` — every seam in the closed wave in one table, with its degradation.
- `docs/guide/TEMPLATE.md` — the binding section order and the three rules (the third: a module header is not a clause).
- The contracts: `docs/specs/mcp-endpoint.md`, `docs/specs/adapter-parity-battery.md`,
  `docs/specs/ci-divergence-leg.md`, `docs/specs/ci-ui-leg.md`, `docs/specs/engine-pin.md` §5.5.
