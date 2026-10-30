# L2 — `bundle-boot-seam`: the behaviour

- **Layer:** L2 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 3 — rev 2 is read through this one: it states the arrangement `interface.md` §1 declares as the behaviour L1 §4/§5 fixed and as the negative behaviours it must answer, **with the package external**, and the behaviour the inlined arm measurably did not reach (§4). Rev 3 states that same behaviour **landed and re-measured**: every cite below is read against the tree at this head, and the artifact it reads is rev 2's external emission (**Status:** DESIGN; D-26, D-27)
- **Inputs:** `interface.md` §1-§9 (the arrangement, the probes P-1..P-15, E-1/E-2/E-5, the census); `docs/L1/bundle-boot-seam.md` §4 (the seven observables), §5 (the boot order), §6 (B-1..B-8), §8 (the exceptions); D-5, D-14, D-18, D-26, D-27, D-28; the unit record at `strata/records/security-store-storeroom-unit.md` §2 and its return `F-1`/`F-2`
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `P-n` is `interface.md` §2's probe answer for this seat; the package is read and never edited (D-5)

## 1. What the arrangement must serve, in the app's own vocabulary

Seven observables and no eighth: the arrangement changes **when a process exists and whether its store stands**, never what it publishes (L1 §4).

| Observable | Where the process publishes it | What the arrangement does to it |
|---|---|---|
| the boot trace line `[provident-main] node …` | the first statement of `main()` in `src/main/main.ts` | nothing — the first line a successfully evaluated module prints (P-3, P-4) |
| the stdio transport's readiness | `src/main/mcp-server.ts:1191` | nothing — reached only after `mcp.start()` (the `await mcp.start()` call in `src/main/main.ts`) |
| the HTTP transport's readiness, naming its port | the `[provident-mcp] http transport ready` print in `start()`, `src/main/mcp-server.ts` | nothing — same statement order |
| the HTTP answer set — 404 off-route, 405 on GET/DELETE, 405 on any other non-POST method, 401 unauthorised, else `/mcp`, plus the two arms no battery row asserts: 503 `mcp-disabled` and 500 internal | `src/main/mcp-server.ts:1209-1229` covers the **four** arms the battery asserts — the off-route test opens it at `:1209`, the token gate's arm closes it at `:1229` (404 at `:1210`, 405 on GET/DELETE at `:1215`, 405 on other methods at `:1220`, 401 at `:1226`) — and the two unasserted arms are cited **outside** that span so the boundary is checkable: 503 at `:1236` (test `:1235`) and 500 at `:1252` (the request catch) | nothing — the gate is not in the seam (D-18) |
| `renderer ready — MCP backend armed` | the `ipcMain.on(IPC_READY)` handler in `src/main/main.ts` | nothing — it follows the instance's construction, which is what makes it evidence the **window** loaded, and (before rev 2) not that the store stood (P-10, §4) |
| the instance's own file in a scratch profile | the construction's `storeCreate(...)` statement in `src/main/operator-settings/index.ts` composes the path and the store writes it | **everything**: externalising the package is what makes this row exist at all (P-10 → P-11) |
| the scratch profile the boot is pinned to | the `userDataFromArgs` argv pin in `main()`, `src/main/main.ts`; `scripts/electron-spawn.mjs:362` | nothing — the pin is argv, not module scope |

- **What the arrangement adds is a silence and a file**: P-1's `ERR_INVALID_ARG_VALUE` and P-3's `ReferenceError` are published **at module load**, so the observable set above either exists in full or is replaced by one reason-bearing line (§4, `examiner.md` §2); and the profile file is the one observable that separates *a bundle that boots* from *an app whose store stands* (P-10).

## 2. The boot order, which the arrangement does not move (L1 §5)

- **The order stands as landed** — construction, boot read, gate, `attach`, window, `loadFile`, `mcp.start()`: the seven statements `main()` runs in that order, cited in `src/main/main.ts` by the `createSettingsSurface({ userDataDir })`, `settingsSurface.read()`, `new SecurityGate(...)`, `settingsSurface.attach(mcp)`, `new BrowserWindow(...)`, `win.loadFile(rendererHtml)` and `await mcp.start()` sites — because every one of those is a statement inside `main()`, and the arrangement changes the module's **format and one import edge**, not a single statement's position (L1 §5).
- **The boot read's cite, corrected and then re-measured**: L3's rev-1 cite named the line above the read and was one line late, and the same hazard has since moved every boot cite a second time, because E-2's derivation block sits above them — so the cite is the **statement**, never its offset. What survives is the **row order** — `construction → boot read → gate → attach → window → renderer load → mcp.start()`, the seven steps L1 §5 names, each of them a named statement in `src/main/main.ts` — which is why §2 states the order and the battery pins the order rather than a number (L1 §5, D-28, D-41).
- **Construction stays synchronous**, and this is the constraint that eliminated one arm: `createSettingsSurface(...)` — the construction statement in `src/main/main.ts` — runs to completion before the next boot step, so an arrangement that awaited the package before the instance could be built (the dynamic-`import()` arm) would have to re-order the boot, not merely re-bundle it (`interface.md` §3, D-27).
- **A boot that reaches the `ipcMain.on(IPC_READY)` handler has already *tried* to construct the store** — which is why the renderer-ready line is evidence of the window and **not** of the store; the instance's own file — the path its `importOnce`/`importAppStateOnce` arms compose in `src/main/operator-settings/index.ts` — is the evidence of the store, and rev 2 is the change that makes the two agree (P-10, §4).

## 3. A boot of the built bundle, in order

| Step | What is observable | Cite |
|---|---|---|
| the container resolves the `main` field to an ESM artifact | Electron evaluates the module graph: `import.meta.url` is a real `file:` URL and `createRequire` of it works | P-2 (`package.json:6-7`) |
| the artifact's own module scope is real | the entry's `here` derivation completes; the empty-object placeholder of the CJS arm is gone | P-3, P-4 (the entry's `here` derivation in `src/main/main.ts`) |
| the **package's** module scope is its own | the package's `createRequire(import.meta.url)`, its version read and its addon path all resolve beside `node_modules/provident-storeroom/index.mjs` | P-11, P-12 (`node_modules/provident-storeroom/index.mjs:94-97`) |
| `main()` is entered on `app.whenReady()` | the trace line `main()`'s first statement publishes, then the renderer-ready line its `ipcMain.on(IPC_READY)` handler publishes, then each transport's readiness from `mcp.start()` (the `await mcp.start()` call in `src/main/main.ts`) | L1 §4-§5 (`src/main/mcp-server.ts:1191,1203`) |
| the instance stands and writes its profile file | `<userDataDir>/provident-operator-settings.json` exists in the scratch profile | L1 §4, P-11 (that `storeCreate(...)` statement in `src/main/operator-settings/index.ts`) |
| a tool call answers through the bundle's own transport | `provident.get_rendered_html` answers content with a non-empty `renderedHtml` | L1 §6 B-4 |

- **What is not asserted here is a handshake, not a window**: the window and the renderer do run — P-11's `renderer ready — MCP backend armed` is printed from `ipcMain.on(IPC_READY)` inside `main()` (the `ipcMain.on(IPC_READY)` handler in `src/main/main.ts`), reached only through the `app.whenReady().then(...)` call in the same file — so the rows needing a transport handshake or a rendered surface remain L1 §6's and are marked unmeasured rather than claimed (P-10, P-11; `ASM-L2-1`, `examiner.md` §2).

## 4. The negative behaviours — a bundle that cannot boot answers a reason, never a bare timeout, and a boot whose store refuses answers one too

| The state | The reason published, and where | Cite |
|---|---|---|
| the CJS artifact of D-27: the package's derivation meets the placeholder | `ERR_INVALID_ARG_VALUE` — *“The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received undefined”* — at module load, before any surface exists | P-1 |
| an ESM body in a `.cjs` name, or the reverse | `SyntaxError: Cannot use import statement outside a module`, preceded by the loader's own `Failed to load the ES module …` warning | P-7 |
| an ESM artifact whose entry still spells a CJS-only global | `ReferenceError: __dirname is not defined in ES module scope`, naming the artifact's line | P-3 |
| **a bundle that boots and a store that never stands** | **no load error, no `fatal:`, both readiness lines published — and the instance's file absent**: the boot completes, the app answers MCP calls, and every settings read is that module's refusal | **P-10** (the construction's `storeCreate(...)` call and its contained refusal in `src/main/operator-settings/index.ts`) |
| a throw after the module evaluates | `[provident-main] fatal:` on stderr, then `app.exit(1)` — the app's own arm | the `void main().catch(...)` arm of `app.whenReady().then(...)` in `src/main/main.ts` |
| a wedged process with no reason | **no row may accept it**: every wait is bounded and a bound's expiry is itself a failure that prints the trace | L1 §9 ASM-4, `F-2` |

- **The fourth row is rev 2's subject and the reason this document was re-grained**: a refused store is swallowed by design (the construction's `storeCreate(...)` call and its contained refusal in `src/main/operator-settings/index.ts` — a refusal is a value, never a throw across that boundary), so a shape that relocates the package's derivation produces **no symptom on any transport** and is visible only at the profile file. Externalising is the arm that removes the state; **B-5 is the row that keeps it removed** (P-10, P-11; L1 §6).
- **The rule the rows serve**: a failure is a **verdict with a reason before the bound**, never a timeout with no verdict, and never a green boot with a silent refusal underneath (`strata/.strata/returns/security-store-storeroom-l2-examination.json`, `F-2`; L1 §6 B-8).
- **The rejected CJS launcher is rejected here too**: it would move the load failure's reporting into a shim's `catch`, where P-3 and P-7 show the loader already publishes the reason for free (`interface.md` §3).

## 5. What the module systems agree on at run time, and what the artifact therefore requires

- **ESM provides what the package needs and takes away one global**: `import.meta.url` is the artifact's own file URL and `createRequire(import.meta.url)` resolves (P-2), while `__dirname`, `__filename` and a bare `require` are absent — the two facts `interface.md` §1 and §4 are built on (P-2, P-3).
- **The artifact carries a bare specifier, not the package's bytes**: the emission holds `import { storeCreate } from "provident-storeroom"` and resolves it at run time, so the app must have the package reachable from the artifact's own directory — `ERR_MODULE_NOT_FOUND` where it is not, the module where it is (P-13, `persistence.md` §3).
- **Both arms already needed `node_modules`**: the inlined artifact's rung-one `require` of the platform addon package answers `MODULE_NOT_FOUND` with no `node_modules` reachable, so rev 2 adds **one** requirement to an artifact that had one (P-15, `interface.md` §5).
- **`--external:electron` stays** — the container supplies it — and `--bundle`, `--platform=node`, `--format=esm`, the flag and the outfile all stand landed in `package.json:10`, with the flag repeated in `:11`: rev 2's addition is `--external:provident-storeroom` and nothing else (E-1).
- **The artifact names no absolute path of its own**: `import.meta.url` is supplied by the loader rather than baked — the property the rejected `--define` arm destroyed (P-14, `interface.md` §3).

## 6. The preload stays CJS, and why that is not a compromise

- **`dist/main/preload.cjs` is emitted CJS, is named CJS by the `join(here, 'preload.cjs')` preload entry in `src/main/main.ts`'s `new BrowserWindow(...)`, and evaluates as CommonJS** — measured as a `TypeError` from Electron's own API rather than a parse error (P-8), so the preload's contract is unchanged by the arrangement (L1 §1, `interface.md` §1).
- **It cannot become ESM without a renderer-security change**: the window sets `contextIsolation: true` and never `sandbox: false` (the `webPreferences` block of `new BrowserWindow(...)` in `src/main/main.ts`), and an ESM preload is a sandbox-disabled feature — outside this unit's remit (`ASM-L2-5`).
- **The join needs no edit** because the entry lands in `dist/main/` beside it (the same preload join in `src/main/main.ts`).

## 7. The sibling bundles are outside this seam

- **`dist/main/standalone.mjs` and `dist/main/battery-host.mjs` stay ESM and byte-identical, and measured to be unaffected**: neither emission carries an addon-path reference — 0 occurrences in either at this head, and 0 in the main emission too — so neither inlines the package and the flag has nothing to externalise in them (L1 §6 B-7, D-27; `interface.md` §1).
- **The renderer bundle stays browser ESM** at `dist/renderer/renderer.js` beside its HTML entry (`package.json:10`; the `rendererHtml` join in `src/main/main.ts`).
- **A row that reddens either sibling is the arrangement's failure** — L1 §6 B-7 owns it and this layer adds no row of its own (`ASM-L2-6`, L1 §6).

## 8. Assumptions

Every assumption behind these rows is `interface.md` §9's table (`ASM-L2-1`..`ASM-L2-8`), each with the alternative it rejected; no row here depends on one this file does not name (`interface.md` §9, `envelope.md` §3).
