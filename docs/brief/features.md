<!-- Purpose: the feature set, top level, by area — what exists, where it lives, which state it is in. -->
Status: ACTIVE · authored 2026-10-29 · source of truth: the code, cited per row

# Features

Three state words are used and nothing else: **LANDED** (in `src/`, imported by the running app),
**LANDED-UNWIRED** (in `src/`, spec'd and unit-tested, but no running-app importer — the app does not
use it yet), **NOT-ADMITTED** (named in trackers and/or a spec, no implementing code). A row that is
landed but carries an open obligation says so in its own cell.

Whole repo: **39** TypeScript files under `src/` — 11 in `src/main/`, 9 in `src/renderer/`, 19 in
`src/shared/` (glob `src/**/*.ts`).

## §1. The MCP surface

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| **22 registered tools** — the count is read from code, not prose: dispatch, focus, get_rendered_html, get_markdown, list_targets, get_node_state, code.get, code.validate, load, op, export, validate, teardown, journal, code.set, code.create, code.delete, code.load, code.loadBatch, module.install, module.update, module.list | `src/main/mcp-server.ts:576-599` (`static ALL_TOOLS`), corroborated by the `RpcMethod` union's 22 members at `src/shared/types.ts:259-281` | `docs/specs/mcp-endpoint.md §3` (stale — see the note below) | LANDED |
| 3 resources: `mcp://provident/app`, `mcp://provident/targets`, `mcp://provident/node/{nodeId}` (template) | `src/main/mcp-server.ts:638-642` | `docs/specs/mcp-endpoint.md §3.7` | LANDED |
| Every tool answers one `text` block of pretty-printed JSON; images are a separate content block | `src/main/mcp-server.ts:371,378-390` | `§3` | LANDED |
| Every handler is wrapped by one invocation-turn guard (exclusion + gate re-check + error shaping) | `src/main/mcp-server.ts:830-831` | `docs/specs/mcp-endpoint.md §6.4`, `docs/specs/secure-exclusion.md §3` | LANDED |
| Group-gated registration: a disabled group's tools are **absent** from `tools/list`, not present-and-refusing | `src/main/mcp-server.ts:604,813-831` | `docs/specs/mcp-server-wiring.md §1` | LANDED |
| **Prose drift to know before trusting the spec:** `docs/specs/mcp-endpoint.md §3.8` still reads `OWED — NOT WRITTEN` and claims *"no `provident.focus` in `ALL_TOOLS` today … 21 names"*; the code carries 22 with `focus` registered at `src/main/mcp-server.ts:1016-1040` | `docs/specs/mcp-endpoint.md:214-263` vs `src/main/mcp-server.ts:576-599` | repair row: `docs/pending.md:70` (row 2.3) | open documentary obligation, no behaviour gap |

## §2. Synthetic events

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| `provident.dispatch` — resolve the target host-side (nodeId → `css.id` → `props.id`, in-tree and not-destroyed), call the engine once, flush, derive `dirtied`, re-emit both views | `src/renderer/runtime.ts:224-239,1164-1195` | `docs/specs/mcp-endpoint.md §3.1` | LANDED |
| Target shapes accepted: bare string, `{kind:'cssId'}`, `{kind:'nodeId'}`, `{kind:'wire'}` | `src/main/mcp-server.ts:838-853,916-925` | `§3.1` | LANDED |
| Opt-in `requestId` dedup — a duplicate returns the **first** caller's report (echo semantics); the returned shape carries **no** separate `deduplicated` field | `src/renderer/runtime.ts:1169-1179` | `§3.1` (the omission is named at `docs/specs/mcp-endpoint.md:48`) | LANDED |
| Handler errors come back as data, never as a failed call: `{error:{message,name}}` per handler result | `src/renderer/runtime.ts:1188-1195` | `§3.1` | LANDED |
| The demo's authored events: `click` on `#inc`/`#dec`/`#reset`, `input` on `#echo-input`, `pointerdown` on `#gutter-vertical` | `src/shared/demo-envelope.ts:34-78,60-62` | `docs/specs/e2e-test-battery.md` (C1–C4) | LANDED |
| A mutating call pushes `notifications/resources/updated` for `mcp://provident/app` on stdio (7 mutating methods: dispatch, load, op, teardown, code.load, code.loadBatch, journal) | `src/renderer/renderer.ts:829,1046-1048`; `src/main/mcp-server.ts:760-773` | `docs/specs/mcp-endpoint.md §8` | LANDED |

## §3. Rendered-view visibility

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| `provident.get_rendered_html` → `{renderedHtml, ssrHtml, census}` — both views from one graph, same call | `src/renderer/runtime.ts:1197-1223` | `docs/specs/mcp-endpoint.md §3.2` | LANDED |
| `data-node-id="<engine nodeId>"` on every emitted element in **both** views (the opt-in `nodeIdAttribute` render option) — the element→node handhold | `src/renderer/runtime.ts:90,1211-1216` | `§3.2`, `§7` P-E8 | LANDED |
| `provident.get_markdown` → `{markdown, census}` — a fresh `MarkdownAdapter` per call, same actionable set, `on:*`/`data:*` dropped | `src/renderer/runtime.ts:1225-1241` | `§3.3` | LANDED |
| `provident.list_targets` → addressable nodes only, with `handlers` descriptors | `src/renderer/runtime.ts:1244-1269` | `§3.4` | LANDED |
| `provident.get_node_state` → JSON-safe projected compiled states (live anchors flattened to `{role,target,value}` — the middle member is spelled **`target`**, not `targetId`, at `src/renderer/runtime.ts:1295-1299`) + census | `src/renderer/runtime.ts:1271-1316` | `§3.5` | LANDED |
| Census: `{registered, inTree, unplaced, destroyed, prototypes}` | `src/renderer/runtime.ts:1318-1327` | `§3.2` | LANDED |
| Large-payload guard: over `1,000,000` chars the answer is `{census, digest, preview, truncated}` (FNV-1a 64) — the full fragment never crosses IPC | `src/main/mcp-server.ts:1274,1457-1484,1509` | `§3.2` | LANDED |

## §4. Graph and store

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| `provident.load` `{kind:'envelope'\|'doc'\|'commands'}` → `{census, renderedHtml, ssrHtml, warnings}`; each path tears the old graph down first | `src/renderer/runtime.ts:349-422` | `docs/specs/mcp-endpoint.md §4`, `docs/specs/runtime-host.md` | LANDED |
| `provident.op` `{command}` → `{status, dirtied?, minted?, renderedHtml, ssrHtml, warnings}` — the two views and `warnings` ride **every** verdict, a `rejected`/`no-usable-state` one included (`docs/specs/runtime-host.md:40-42`); **ten** command kinds, engine-owned and never whitelisted by the host (`docs/specs/runtime-host.md:52-56`); a malformed command answers `{status:'rejected'}` and never throws | `src/renderer/runtime.ts:426-546,644-654` | `docs/specs/e2e-test-battery.md:87-90` | LANDED |
| `provident.export` → `{export, census}`; `provident.validate` → `{valid, censusMatch, treeSigMatch, warnings}` — the export is re-loaded into a **throwaway** graph, never the live one | `src/renderer/runtime.ts:695-716` | `§4`, `docs/specs/engine-drift.md` | LANDED |
| `provident.teardown` — destroy the content, keep the mount root; the battery's only reset between scenarios | `src/renderer/runtime.ts:606-643` | `docs/specs/e2e-test-battery.md` C3 | LANDED |
| `provident.journal` `{action:'undo'\|'redo'\|'replay'}` — the supervisor's own journal, bounded by `maxJournalLength` read from the operator's settings at boot | `src/renderer/runtime.ts:656-696`; `src/renderer/renderer.ts:1270-1278` | `docs/specs/mcp-endpoint.md §3.6`, `docs/specs/journal-reversibility-battery.md` | LANDED |
| `provident.code.*` — 7 tools over a code tree outside the live graph: `get`, `validate` (read group); `set`, `create`, `delete`, `load`, `loadBatch` (code group) | `src/renderer/runtime.ts:970-1163`; registered at `src/main/mcp-server.ts:943-949` | `docs/specs/mcp-endpoint.md §4` | LANDED |
| `provident.module.install` / `.update` / `.list` — dynamic registration over a module store; a tool backed by executable entry needs `module` **and** `code` | `src/main/mcp-server.ts:985-998`; `src/main/module-store.ts`; `src/renderer/extensions.ts:14-46` | `docs/specs/module-feature-list.md`, `docs/specs/module-import-proposal.md` | LANDED, `module` group OFF by default |
| The in-renderer graph store — four tiers (`file`, `mem`, `temp`, `secure`), a closed 16-member refusal union, reference subscriptions | `src/renderer/store-core-graph.ts:18-24` | `docs/specs/store-core-graph.md`, `docs/specs/data-ownership-model-plan.md` | LANDED (wave-green is `ENVELOPE-green`, never `APP-green`) |
| The legacy re-derive store | `src/renderer/store.ts` | directory contract `docs/specs/store-rederive/` | LANDED; carries its own recorded split defects `SD-SPLIT-2`/`SD-SPLIT-3`, and states *"NO `[H]` CLAIM AND NO APP CLAIM"* (`src/renderer/store.ts:24-25`) |
| `module.disable` / `module.enable` — gate-map members with **no registration** | `src/main/security.ts:5-42` | — | not tools; gate-known names only |

## §5. Focus, gestures, overlay

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| `provident.focus` `{target?, newTab?}` — reads the renderer's focus carrier through the store mirror; writes nothing, never re-renders, never pushes | `src/main/mcp-server.ts:158-170,1016-1040`; `src/renderer/renderer.ts:1249-1258` | `docs/specs/focus-tool.md §2.1` | LANDED |
| The pure focus model — `focusTransition` / `focusOrder` / `focusIndex` / `persist`, total functions that never throw | `src/shared/focus-model.ts`; imported by the renderer at `src/renderer/renderer.ts:10` | `docs/specs/focus-model.md` | LANDED (the renderer imports three of the four: `focusTransition`, `focusOrder`, `persist` — `focusIndex` is exercised by the suite only) |
| The pointer gesture session — one session owns pointerdown/move/up, threshold, cancel, and the escape hatch | `src/shared/gesture-session.ts` | `docs/specs/gsession.md` | LANDED |
| The gutter affordance — eleven caller seams, no policy of its own (no axis literal, no cursor literal); the demo supplies the values as data | `src/shared/gutter-affordance.ts`; `src/renderer/renderer.ts:900-955`; `src/shared/demo-envelope.ts:93-234` | `docs/specs/gutter-ui.md §2` | LANDED |
| Overlay transition + inert declaration, as pure functions | `src/shared/overlay.ts:1-62` | `docs/specs/overlay.md` | LANDED-UNWIRED: the caller-side store turn exists (`src/renderer/overlay-store.ts:21`) but **no other file under `src/` imports it** (grep) |
| Theme resolution, as a pure module plus a caller-side store turn | `src/shared/theme.ts:1-73`; `src/renderer/theme-store.ts:15` | `docs/specs/theme.md`, `docs/specs/theme-control.md` | same shape: module + wiring file, no `src/` importer of the wiring (grep) |
| The demo's theme control: two `theme-set` buttons carrying the closed set `'dark'`/`'light'`, initial value authored as data | `src/shared/demo-envelope.ts:63-69` | `docs/specs/theme-control.md §2.1` | LANDED |

## §6. Layout, zones and panes

These are **pure shared modules with their own contracts, registers and vitest rows, none imported
by the app renderer** — a fork wires them; the demo does not. That is a state fact, not a defect.

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| Zone occupancy and track projection (`isEmpty`, `trackFor`, `TrackSpec`) | `src/shared/zones.ts` | `docs/specs/zones.md` | LANDED-UNWIRED |
| Track-var census (`computeTrackVars`) | `src/shared/census.ts` | `docs/specs/census.md` | LANDED-UNWIRED |
| Layout projection: `project` / `applyProjection` over a declared projection | `src/shared/layout-projection.ts` | `docs/specs/projection.md` | LANDED-UNWIRED |
| Container lifecycle for declared keys | `src/shared/container.ts` | `docs/specs/container.md` | LANDED-UNWIRED (two lifecycle residues are open: `docs/pending.md:77`, `O-1`) |
| Proximity/pinning math for relocation (`withinProximity`) | `src/shared/relocate.ts` | `docs/specs/relocate.md` | LANDED-UNWIRED |
| Menu template compilation | `src/shared/menu-template.ts` | `docs/specs/menulib.md` | LANDED-UNWIRED |
| Owned-list host | `src/shared/owned-list-host.ts` | `docs/specs/listhost.md` | LANDED-UNWIRED |
| Slot host — the opaque per-zone slot map | `src/shared/slot-host.ts` | `docs/specs/slothost.md` | LANDED-UNWIRED (its `O-2` negative pin is owed: `docs/pending.md:77`) |
| The layout-less shim that makes any of the above headless-testable | `src/shared/dom-shim.ts:1-3,41,219-236`; the shim-hosted battery `src/main/battery-host.ts:29-36` | `docs/specs/e2e-test-battery.md` | LANDED |

## §7. Security and isolation

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| Five groups: `read`, `dispatch`, `graph`, `code`, `module`; the map covers 24 tool names plus 3 `resource:` keys | `src/main/security.ts:3,5-42`; `VALID_GROUPS` at `:151` | `docs/specs/mcp-security.md §2` (whose `ToolGroup` at `:18` names **four** groups — stale against code), and `docs/specs/mcp-endpoint.md §6.2`, whose table has no `module` row (`:411-416`) | LANDED |
| Default grant is `['read','dispatch']` — **8 tools register** (those are two TOOL GROUPS, and the group→tool expansion is what yields the count: 6 `read` — `get_rendered_html`, `get_markdown`, `list_targets`, `get_node_state`, `code.get`, `code.validate` — plus `dispatch` and `focus`), everything else is absent | `src/main/security.ts:86-88`; the expansion at `registeredToolNames(this._gate, ALL_TOOLS)`, `src/main/mcp-server.ts:604` | `docs/specs/mcp-server-gate.md §3` | LANDED |
| Optional loopback bearer token (`Authorization: Bearer …` or `MCP-Token`), constant-time compare, `401` before any tool runs | `src/main/security.ts:126-149`; `src/main/mcp-server.ts:1137-1142` | `docs/specs/mcp-endpoint.md §6.3` | LANDED |
| The exclusion axis: while `mcp-disabled`, every handler answers the closed refusal `exclusion-closed` before dispatch, in-flight calls are abandoned, and HTTP answers `503` | `src/main/mcp-server.ts:465-491,830-831,568-572,1143-1152` | `docs/specs/secure-exclusion.md §3` | LANDED |
| The tier-4 axis: a static holder (`tier4Open`) gates the secure tier's writes; refusal token `tier4-closed` | `src/main/tier4-state.ts:28-39`; `src/main/mcp-server.ts:49-59` | `docs/specs/tier4-arbitrary-storage.md` | LANDED |
| Manual-UI-only settings channels — never MCP tools | `src/main/main.ts:423-500`; `src/main/preload.ts:42-148` | `docs/specs/mcp-endpoint.md §6` | LANDED |
| The operator panes render in their own isolated graph scope and are not an MCP surface | `src/renderer/secure-panels.ts:302-306` | `§3.7` | LANDED |
| Malformed settings patches are rejected whole; hostile header values are treated as absent | `src/main/security.ts:108-124,159-193` | `docs/specs/mcp-security.md` | LANDED |

## §8. Transports and modes

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| Streamable HTTP (default): `POST /mcp` on `127.0.0.1:3787`, a fresh `McpServer` per POST, stateless | `src/main/mcp-server.ts:1107-1176`; `src/main/main.ts:39-59` | `docs/specs/mcp-endpoint.md §2` | LANDED |
| `404` any other path · `405` `GET`/`DELETE` (checked **before** the token) · `401` bad/absent token · `503` exclusion closed | `src/main/mcp-server.ts:1122-1152` | `§2` | LANDED |
| stdio: long-lived, one server, spawn-local (no token gate) and the only push-capable transport | `src/main/mcp-server.ts:1097-1105,746-762` | `§2` | LANDED |
| `dist/main/standalone.mjs` — a rendererless MCP server over a mock backend, default port `3788`, auto-exit on stdin close | `src/main/standalone.ts:1-65` | `docs/specs/mcp-endpoint.md §5` | LANDED |
| `dist/main/battery-host.mjs` — a Node MCP server with a **real** `provident-ssr` Runtime under the DOM shim, default port `3789`, four groups pre-enabled | `src/main/battery-host.ts:1-105` | `docs/specs/e2e-test-battery.md` | LANDED |
| The Electron path: `RendererBackend` proxies each call over IPC, with a `30 s` readiness wait, a `60 s` invoke timeout, and a destroyed-window error | `src/main/mcp-server.ts:1243-1274,1386-1428` | `docs/specs/renderer-backend-hardening.md` | LANDED |
| Boot order: store → boot read → gate → `applyExclusion('mcp-enabled')` → window → `mcp.start()`, closed **before** the window is created | `src/main/main.ts:551-581` | `docs/specs/mcp-endpoint.md §5` | LANDED |

## §9. Persistence and recovery

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| `SecurityStore` over `<userData>/provident-security.json` — five members (`get`, `lastWriteReceipt`, `readEntry`, `set`, `writeEntry`), a receipt form closed at the one token `'write-failed'`, and `tier4-closed` as the declared third answer | `src/main/security-store.ts:43,52-84`; `src/main/main.ts:101-103` | `docs/specs/secure-store-discipline.md` | LANDED |
| Tier-1 settings (`provident-settings.json`): `maxJournalLength`, exclusion state, token, groups | `src/main/main.ts:110-119,423-500` | `docs/specs/store-persist.md` | LANDED |
| The tier hand-off at boot: the renderer requests the persisted rows **before** constructing its store, and a cold tier answers `[]` rather than throwing | `src/renderer/renderer.ts:1279-1300` | `docs/specs/store-persist.md §2.9` | LANDED |
| Profile seam for tests: `--provident-user-data=<path>` | `src/main/main.ts:68-84` | `docs/specs/ci-ui-leg.md` | LANDED |
| Reserved namespaces are refused rather than written | `src/main/main.ts:30` | `docs/specs/store-security.md` | LANDED |
| Store redaction on the read path — the settings reader hands back what the operator typed, the store keeps it | `src/main/main.ts:423-467` | `docs/specs/store-security.md` | LANDED |

## §10. The validation and battery layer

| Instrument | What it reads | Where | State |
| --- | --- | --- | --- |
| `npm test` — vitest over `tests/**/*.test.ts`, under the DOM shim | node / pure-module behaviour | `vitest.config.ts:5`; `package.json:16` | LANDED; **91** `*.test.ts` files on disk (glob). Its live pass/fail split is `limits-and-state.md` §3's — **it is not green at this head** |
| `npm run typecheck` / `npm run typecheck:tests` | `src/**` only / the whole `tests/**/*.ts` tree at the same strictness | `package.json:14-15`; `AGENTS.md` item 4 | LANDED (the second leg is additive and reads no `src/` file) |
| `npm run battery` — `tests/e2e-battery.test.mjs`, spawns the battery host and drives MCP tools only | the whole tool contract over stdio in one process; prints `BATTERY RESULT: <n> checks, <m> failures` and exits non-zero on failure | `tests/e2e-battery.test.mjs:1-45,450-452` | LANDED; outside vitest (6 `.mjs` drivers in total) |
| `npm run divergence` — real Electron app vs shim host, same envelope | shim-stable structural surfaces only; `N = 9` pinned checks | `scripts/electron-divergence.mjs`; `docs/specs/ci-divergence-leg.md §5` | LANDED |
| `npm run ui` — real `BrowserWindow` under a scratch profile | the one real-DOM measurement no other leg can see (a layout rect + a resolved computed style, returned over `get_rendered_html`) | `scripts/electron-ui.mjs:1-50`; `docs/specs/ci-ui-leg.md §3.0` | LANDED |
| Blind-greens sets — scenarios authored from the documentation alone | doc-vs-behaviour drift | `docs/specs/*-greens.md` — **54** files (glob) | LANDED as a practice; one unit's set is still `OWED` (`docs/pending.md:68`) |
| Live batteries — `.mjs` drivers plus a human operator at the window | the assembled/rendered app | `docs/specs/*-live-battery.md` — **6** records (glob) | LANDED as a practice; operator rows still owed (`docs/pending.md:75`) |

## §11. The storeroom seam

| Capability | Where | Spec | State |
| --- | --- | --- | --- |
| One profile-store binding to `provident-storeroom`, the app's **only** import of that package, with a declared 14-member / 11-symbol surface snapshot measured against `1.6.1` and pinned by `tests/storeroom-surface.test.ts` — a version bump that moves a member reddens that row here | `src/main/storeroom.ts:14-21,45-50` | — (the seam's own header is the contract) | LANDED |
| A default journal length of `4096` for the store | `src/main/storeroom.ts:53` | — | LANDED |
| **What it is not:** nothing in this seam is exposed over MCP, rendered, or written to the operator's profile | `src/main/storeroom.ts:9-12` | — | boundary, stated in code |
| The package relationship itself: defects in `provident-storeroom` are catalogued, never patched | `docs/defects.md`; `docs/HANDOFF.md:1-8` | `AGENTS.md:191-198` | LANDED as a practice |

## Boundaries, one line per area — what each area does **not** claim

| Area | It does not claim |
| --- | --- |
| §1 MCP surface | that the spec's tool table matches the code (§3.8 is stale); that a tool is *available* — availability is the operator's grant, per group |
| §2 synthetic events | that an event "worked" because the call did not throw: `results` can carry a normalised handler error with `ok: true` at the transport level. Nor that a push arrived — HTTP cannot push |
| §3 rendered-view visibility | any geometry, layout, paint order or interactivity; nor that the markdown is a substitute for the HTML — it drops `on:*`/`data:*`, so it carries no element→node mapping |
| §4 graph and store | that the store's greens are app greens (they are `ENVELOPE`/`INTEGRATION` greens); nor that the legacy `store.ts` is clean — it carries `SD-SPLIT-2`/`SD-SPLIT-3` |
| §5 focus, gestures, overlay | that a drag or a focus change was *seen*: the pure modules are `[T]`-verified, and the affordance's visible preview is the wiring's, not the module's |
| §6 layout, zones and panes | that the app uses any of it — the running app wires none of these eight modules; their greens are module greens |
| §7 security and isolation | that the gate is a sandbox: a tool the operator enabled can mutate the loaded graph by design, and `code`-group tools can author and evaluate handler bodies |
| §8 transports and modes | that the transports are interchangeable: HTTP is stateless and push-less and needs a token; stdio is spawn-local and long-lived |
| §9 persistence and recovery | that persisted values survive a version change of the store package — the surface census reddens a row here, it does not migrate |
| §10 the validation and battery layer | that any figure in §10 is current: every count named there is a dated measurement or a glob, and **no suite, `tsc` leg, build, `.mjs` driver or Electron leg was run by this review** — the suite's own live split is `limits-and-state.md` §3's (`measured this pass`, the supervisor's shell), not §10's |
| §11 the storeroom seam | a capability: nothing in that seam is exposed over MCP, rendered, or written to the operator's profile, and no spec names a storeroom feature |

## Not admitted, and admitted-but-unwritten

| Item | State | Cite |
| --- | --- | --- |
| `U-STORE-CONSTRAINT-REGISTRY` — a contract directory exists (`docs/specs/store-constraint-registry/`, 8 part files) with an open question `C-5` | HELD at the spec gate | `docs/next-steps.md:226` |
| `U-STORE-TABS-STRIP` (ledger `T1`) — admitted by the architect, its contract file `docs/specs/store-tabs-strip.md` does **not** exist | NOT-ADMITTED code; contract OWED | `docs/pending.md:78`; absence confirmed by glob |
| `U-STORE-DRAG`, `U-STORE-LAYOUT` — park set | NOT-ADMITTED | `docs/pending.md:101` |
| The rendered tab strip as an MCP-visible node | NOT-ADMITTED (that is what `T1` would build) | `docs/pending.md:78` |
| `provident.focus`'s spec row in the tool table | documentary gap only — the tool itself is LANDED | `docs/pending.md:70` |

## Numbers, each with its citation

| Claim | Value | Cite |
| --- | --- | --- |
| MCP tools | **22** | `src/main/mcp-server.ts:576-599` |
| MCP resources | **3** | `src/main/mcp-server.ts:638-642` |
| Gate-map tool names / resource keys | **24** / **3** | `src/main/security.ts:5-42` |
| Tools under the default gate | **8** (6 `read` + `dispatch` + `focus`) | `src/main/security.ts:86-88`; `src/main/mcp-server.ts:604` |
| `RpcMethod` members | **22** | `src/shared/types.ts:259-281` |
| Source files | **39** | glob `src/**/*.ts` |
| Test files | **91** `*.test.ts` + **6** `.mjs` drivers, of **109** paths under `tests/` | glob; `vitest.config.ts:5` |
| Spec files | **181** (163 + 18 parts) | glob `docs/specs/*`, `docs/specs/*/*.md` |
