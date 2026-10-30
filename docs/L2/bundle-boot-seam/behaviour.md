# L2 — `bundle-boot-seam`: the behaviour

- **Layer:** L2 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — the arrangement `interface.md` §1 declares, stated as the behaviour L1 §4/§5 fixed and as the negative behaviours it must answer (D-27, `examiner.md` §3)
- **Inputs:** `interface.md` §1-§9 (the arrangement, the probe table, E-1/E-2/E-5, the census); `docs/L1/bundle-boot-seam.md` §4 (the eight published observables), §5 (the boot order), §6 (B-1..B-8), §8 (the exceptions); D-5, D-14, D-18, D-27; the unit record at `strata/records/security-store-storeroom-unit.md` §2 and its return `F-1`/`F-2`
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `P-n` is `interface.md` §2's probe answer for this seat; the package is read and never edited (D-5)

## 1. What the arrangement must serve, in the app's own vocabulary

Seven observables and no eighth: the arrangement changes **when a process exists**, never what it publishes (L1 §4).

| Observable | Where the process publishes it | What the arrangement does to it |
|---|---|---|
| the boot trace line `[provident-main] node …` | `src/main/main.ts:76`, first statement of `main()` | nothing — it is the first line a successfully evaluated module prints, so an artifact that reaches it has passed every load step (P-3, P-4) |
| the stdio transport's readiness | `src/main/mcp-server.ts:1191` | nothing — reached only after `mcp.start()` (`src/main/main.ts:467`) |
| the HTTP transport's readiness, naming its port | `src/main/mcp-server.ts:1203` | nothing — same statement order |
| the HTTP answer set: 404 off-route, 405 on GET/DELETE, 401 unauthorised, else `/mcp` | `src/main/mcp-server.ts:1209-1218,1224-1228` | nothing — the gate is not in the seam (D-18) |
| `renderer ready — MCP backend armed` | `src/main/main.ts:418` | nothing — it follows the instance's construction, which is what makes it evidence the addon resolved (L1 §5) |
| the instance's own file in a scratch profile | `src/main/operator-settings/index.ts:405` | nothing — the file is written by the store the ESM artifact now constructs (L1 §4) |
| the scratch profile the boot is pinned to | `src/main/main.ts:82-84`, `scripts/electron-spawn.mjs:362` | nothing — the pin is argv, not module scope |

- **What the arrangement adds is a silence, and it is the point**: the `ERR_INVALID_ARG_VALUE` of P-1 and the `ReferenceError` of P-3 are both published **at module load**, so the observable set above either exists in full or is replaced by one reason-bearing line (§4, `examiner.md` §2).

## 2. The boot order, which the arrangement does not move (L1 §5)

- **The order stands as landed** — construction `src/main/main.ts:108`, boot read `:110`, gate `:115`, `attach` `:449`, window `:451`, `loadFile` `:463`, `mcp.start()` `:467` — because every one of those is a statement inside `main()`, and the arrangement changes the module's **format**, not a single statement's position (L1 §5).
- **Construction stays synchronous**, and this is the constraint that eliminated one arm: `createSettingsSurface(...)` at `:108` runs to completion before the next boot step, so an arrangement that awaits the package before the instance can be built (the dynamic-`import()` arm) would have to re-order the boot, not merely re-bundle it (`interface.md` §3, D-27).
- **A boot that reaches `:418` has already constructed the store**, which is why the renderer-ready line can stand as evidence the addon resolved without reading any source file (L1 §5, D-27).

## 3. A boot of the built bundle, in order

| Step | What is observable | Cite |
|---|---|---|
| the container resolves the `main` field to an ESM artifact | Electron evaluates the module graph: `import.meta.url` is a real `file:` URL and `createRequire` of it works | P-2, P-3 (`package.json:6-7`) |
| the inlined package's prologue runs | `createRequire(import.meta.url)` and the addon-path derivation complete; the empty-object placeholder of the CJS arm is gone | P-3, P-4 (`node_modules/provident-storeroom/index.mjs:94-97`) |
| `main()` is entered on `app.whenReady()` | the trace line `:76`, then the renderer-ready line `:418`, then each transport's readiness from `mcp.start()` (`:467`, `mcp-server.ts:1191,1203`) | L1 §4-§5 (`src/main/main.ts:475-477`) |
| the instance writes its profile file | `<userDataDir>/provident-operator-settings.json` exists in the scratch profile | L1 §4 (`src/main/operator-settings/index.ts:405`) |
| a tool call answers through the bundle's own transport | `provident.get_rendered_html` answers content with a non-empty `renderedHtml` | L1 §6 B-4 |

- **A window's arrival is not asserted here**: this seat cannot fire `app.whenReady()` for either arm (P-9), so rows above that need a live window remain L1 §6's and are marked unmeasured rather than claimed (`ASM-L2-1`, `examiner.md` §2).

## 4. The negative behaviours — a bundle that cannot boot answers a reason, never a bare timeout

| The state | The reason published, and where | Cite |
|---|---|---|
| this head's CJS artifact: the package's derivation meets the placeholder | `ERR_INVALID_ARG_VALUE` — *“The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received undefined”* — at module load, before any surface exists | P-1 (`dist/main/main.cjs:38479-38482`) |
| an ESM body in a `.cjs` name, or the reverse | `SyntaxError: Cannot use import statement outside a module`, preceded by the loader's own `Failed to load the ES module …` warning | P-7 |
| an ESM artifact whose entry still spells a CJS-only global | `ReferenceError: __dirname is not defined in ES module scope`, naming the artifact's line | P-3 (`src/main/main.ts:25`) |
| a throw after the module evaluates | `[provident-main] fatal:` on stderr, then `app.exit(1)` — the app's own arm | `src/main/main.ts:476-478` |
| any of the four | the container's `App threw an error during load` precedes it, so a reader sees one reason-bearing line and no silence | P-3, P-7 |
| a wedged process with no reason | **no row may accept it**: every wait is bounded and a bound's expiry is itself a failure that prints the trace | L1 §9 ASM-4, `F-2` |

- **The rule the four rows serve**: a load failure is a **verdict with a reason before the bound**, never a timeout with no verdict — the shape that let this defect survive three units measured 26 minutes and answered nothing (`strata/.strata/returns/security-store-storeroom-l2-examination.json`, `F-2`; L1 §6 B-8).
- **The rejected CJS launcher is rejected here too, on this ground**: it would move the load failure's reporting into a shim's `catch`, where P-3 and P-7 show the loader already publishes the reason for free (`interface.md` §3).

## 5. What the two module systems agree on at runtime

- **ESM provides what the package needs and takes away one global**: `import.meta.url` is the artifact's own file URL and `createRequire(import.meta.url)` resolves (P-2), while `__dirname`, `__filename` and a bare `require` are absent — which is exactly the two facts `interface.md` §1 and §4 are built on (P-2, P-3).
- **`--external:electron` stays**, because the container supplies it: the artifact imports `electron` and never bundles it (`package.json:10`), and an ESM main imports it by name (P-3).
- **The artifact is not portable only in the way every build is**: it names no absolute path of its own, because `import.meta.url` is supplied by the loader rather than baked — the property the rejected `--define` arm destroyed (P-6, `interface.md` §3).
- **`platform=node` and `--bundle` stay unchanged** in both build commands: the arrangement moves `--format` and `--outfile` for one emission and nothing else (E-1).

## 6. The preload stays CJS, and why that is not a compromise

- **`dist/main/preload.cjs` is emitted CJS, is named CJS by `src/main/main.ts:455`, and evaluates as CommonJS** — measured as a `TypeError` from Electron's own API rather than a parse error (P-8), so the preload's contract is unchanged by the arrangement (L1 §1, `interface.md` §1).
- **It cannot become ESM without a renderer-security change**: the window sets `contextIsolation: true` and never `sandbox: false` (`src/main/main.ts:451-459`), and an ESM preload is a sandbox-disabled feature — outside this unit's remit (`ASM-L2-5`).
- **The join needs no edit** because the ESM entry lands in `dist/main/` beside it (`src/main/main.ts:455`, `interface.md` §4).

## 7. The sibling bundles are outside this seam

- **`dist/main/standalone.mjs` and `dist/main/battery-host.mjs` stay ESM and byte-identical**: neither carries the package, which is why `npm run battery`'s green says nothing about the seam (L1 §6 B-7, D-27; `strata/.strata/returns/security-store-storeroom-l2-examination.json`).
- **The renderer bundle stays browser ESM** at `dist/renderer/renderer.js` beside its HTML entry (`package.json:10`, `src/main/main.ts:462`).
- **A row that reddens either sibling is the arrangement's failure**, not theirs — L1 §6 B-7 owns it and this layer adds no row of its own (`ASM-L2-6`, L1 §6).

## 8. Assumptions

Every assumption behind these rows is `interface.md` §9's table (`ASM-L2-1`..`ASM-L2-6`), each with the alternative it rejected; no row here depends on one this file does not name (`interface.md` §9, `envelope.md` §3).
