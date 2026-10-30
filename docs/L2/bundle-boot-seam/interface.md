# L2 — `bundle-boot-seam`: the interface

- **Layer:** L2 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 3 — rev 2 is read through this one: rev 2 **replaces** rev 1's arm (the main emission is built `--format=esm --external:provident-storeroom`, because L4's landing left `tests/e2e/bundle-boot-seam/boot-contract.test.ts` **B-5** red on the inlined shape), and rev 3 carries that same arm **landed and re-measured**: the flag stands in `package.json:10` and `:11`, the tree's own `dist/main/main.mjs` is rev 2's external emission, and E-5's three sites name it (§5, §7). **Status:** DESIGN (`examiner.md` §3; D-26, D-27)
- **Inputs:** `docs/L1/bundle-boot-seam.md` §1-§9 — the map row **N = 12** (§2), the two arrangements L1 fixed neither (§3), the observables (§4), the boot order (§5), B-1..B-8 (§6), the cross-module exceptions E-1/E-2/E-5 (§8), the assumptions (§9); `strata/decisions.md` D-5, D-14, D-18, D-26, D-27, D-28; the `bundle-boot-seam` row of `strata/modules.json` — `name`, `paths` and **`endpoints` 12**, and no cap field, because the cap is derived: `50 + 10×N` as `strata/platform.md` §4 derives it and `strata-lint` enforces (D-14) — cited by row and by id, never by line (D-28); `strata/platform.md` §3/§4
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** every probe answer in §2 is a measurement taken on this seat at HEAD `6901a6e` with the repo's own `node_modules/electron` (**44.4.5**) and `node_modules/esbuild` (**0.28.2**), the whole probe tree under `/tmp` and none of it in the repository; §7's readings are a second, separate measurement — the artifacts `npm run build` leaves in `dist/` and the manifest that names and builds them, read off the tree rather than asserted, and a byte figure that is a live count re-read at each battery run (D-26); the package and the siblings are read and never edited (D-5)

## 0. Scope, and what this document does not fix

The **arrangement** is this unit's whole surface: which artifact each of the four entry points becomes, which module system each is in, **whether that artifact carries `provident-storeroom`'s bytes or resolves the package at run time**, which field names which artifact, and which file's own text the arrangement forces to move (D-27, L1 §1). No `docs/L3/` structure, no signature, no pseudocode, no file below the declared surface (D-1 §3), and no patch — this layer diagnoses and designs (`examiner.md` §4). **No new MCP surface** enters to prove a boot: no tool, resource, group, `RpcMethod` member or bridge channel (D-18, L1 §7). **No package is modified**: the seam is this repo's, and the defect's record stays in the unit that surfaced it (D-5, `strata/records/security-store-storeroom-unit.md` §2).

## 1. The arrangement: main emitted ESM, named by `main`, with the package left external

| Entry point | Artifact | Module system | The package | Named by |
|---|---|---|---|---|
| `src/main/main.ts` | `dist/main/main.mjs` | **ESM — applied** | **external — imported, not inlined** | `package.json:7` (`main`) |
| `src/main/preload.ts` | `dist/main/preload.cjs` | **CJS — kept** | not imported | the entry's own `join(here, 'preload.cjs')`, `src/main/main.ts:459` |
| `src/main/standalone.ts` | `dist/main/standalone.mjs` | ESM — kept | not carried (measured: 0 addon-path references in the emission) | no field: spawned by path (L1 §6 B-7) |
| `src/main/battery-host.ts` | `dist/main/battery-host.mjs` | ESM — kept | not carried, as above | as above (L1 §6 B-7) |
| `src/renderer/renderer.ts` | `dist/renderer/renderer.js` | browser ESM — kept | not imported | the HTML entry `src/main/main.ts:466` loads |

- **`package.json:7` names `dist/main/main.mjs`** — the one field that names a boot artifact — and `package.json:6` declares the package `type: module`, which is the resolution Electron applies when it is handed the package (D-27, L1 §9 ASM-1).
- **The main emission carries `--format=esm` and `--external:provident-storeroom`** in `package.json:10` (`build`) and in `package.json:11` (`build:watch`); the external is the **only** thing the arrangement adds, at two sites, both carrying it at this head, and it is what separates a boot that constructs an instance from one that only publishes readiness (§2, P-10/P-11).
- **Why the flag is available to an ESM artifact and was not to the CJS arm**: the package's `exports` map carries `types` and `import` and **no `require`** (`node_modules/provident-storeroom/package.json:27-31`), so an ESM `import` of it takes a declared condition while the CJS arm's `require` had none to take and answered `ERR_PACKAGE_PATH_NOT_EXPORTED` (P-5). This is the objection that killed "keep CJS and require it", and it does not reach an ESM artifact.
- **The entry's own derivation is landed and unchanged by rev 2**: `src/main/main.ts:29` is `dirname(fileURLToPath(import.meta.url))`, and `:459`'s preload join and `:466`'s HTML-entry join compose from it (L1 §8 E-2, §4 below).
- **The package's derivation then runs at the package's own URL**: `node_modules/provident-storeroom/index.mjs:94-97` takes `createRequire(import.meta.url)` and `ADDON_PATH` from it, and `node_modules/provident-storeroom/src/entry/artefact.mjs` reads the version from the manifest beside that same entry (`:79`) — the three readings that an inlined copy relocates into `dist/main/` and that an imported one keeps (P-12).

## 2. The probes that decided it (measured this seat, re-runnable)

| # | Probe (all scratch, `/tmp`) | Answer |
|---|---|---|
| P-1 | `require('./dist/main/main.cjs')` at the head L1 filed | **throws at module load**: `ERR_INVALID_ARG_VALUE` — *“The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received undefined”* (D-27) |
| P-2 | a two-file app (`{"type":"module","main":"main.mjs"}`) under `node_modules/electron/dist/electron --no-sandbox` | Electron **44.4.5 boots an ESM main**: `import.meta.url` is a real `file:` URL, `createRequire` of it works, `__dirname` throws `ReferenceError` (L1 §9 ASM-1, this seat's own measurement) |
| P-3 | `esbuild src/main/main.ts --bundle --platform=node --format=esm --external:electron` under the same Electron | the package's `createRequire(import.meta.url)` is **satisfied**; the single load error is `ReferenceError: __dirname is not defined in ES module scope` |
| P-4 | P-3's artifact with that one line given the module-URL derivation | **module evaluation completes** and `App threw an error during load` appears **zero** times |
| P-5 | `--external:provident-storeroom` on the **CJS** build | emits `require("provident-storeroom")`, which answers **`ERR_PACKAGE_PATH_NOT_EXPORTED`**: no `require` condition exists (§1) |
| P-6 | `--define:import.meta.url='"file:///…/provident-storeroom/index.mjs"'` on the **CJS** build | accepted by esbuild 0.28.2 and the absolute literal is **baked** at the package's derivation sites |
| P-7 | an ESM-content file named `.cjs` under the same Electron | `Failed to load the ES module … use the .mjs extension`, then `SyntaxError: Cannot use import statement outside a module` — the **name** is load-bearing |
| P-8 | `import('./dist/main/preload.cjs')` under plain node | the preload **evaluates as CJS** and reaches Electron's API (`TypeError: … 'exposeInMainWorld'`), never a parse error |
| P-9 | a CJS control app under the same Electron | `app.whenReady()` **never fires on this seat** for either file format, so every window-grain observable of L1 §4 stays unmeasurable here (ASM-L2-1) |
| **P-10** | **the inlined arm** — `esbuild … --format=esm --external:electron` (package inlined), booted under Electron 44.4.5 on a scratch profile with `--user-data-dir=`/`--provident-user-data=` | **both readiness lines publish** (`http transport ready on http://127.0.0.1:3787/mcp`, `renderer ready — MCP backend armed`) and **no load error at all**, yet the scratch profile holds 17 entries and `provident-operator-settings.json` is **absent** — the boot completes and the instance never stands |
| **P-11** | **the same source** with `--external:provident-storeroom` added, booted identically | the same two readiness lines **and** 18 entries in the scratch profile, `provident-operator-settings.json` among them — the file B-5 keys on, now written. **This is the landed arm**: `package.json:10` carries the flag, and the tree's own `dist/main/main.mjs` re-measured at this head is that emission (1,345,550 bytes, the bare specifier at two sites) |
| **P-12** | the package's own load path, reproduced at each arm's entry URL (`readFileSync(dir/package.json).version` and `require(platformName).version()` through `createRequire(entryUrl)`) | **inlined**: manifest beside the entry is `undefined` against the addon's answered `1.6.1` → the package's **mismatch arm**, which is thrown as the `{status: 'FilePathUnreachable', message}` form and swallowed by `src/main/operator-settings/index.ts:404-410`. **External**: `1.6.1` = `1.6.1` → rung one loads |
| **P-13** | bare-specifier resolution of `provident-storeroom` from a file in the artifact's own directory, with and without a reachable `node_modules` | `ERR_MODULE_NOT_FOUND` where none is reachable, `file:///…/node_modules/provident-storeroom/index.mjs` where one stands beside the app — the run-time requirement §5 states |
| **P-14** | `--define:import.meta.url='file:///…/provident-storeroom/index.mjs'` on the **ESM** build | accepted, `import_meta` placeholders: **0**, and the absolute path of the building host's checkout appears **3×** in the artifact — the machine-bound shape §3 rejects |
| **P-15** | the **inlined** artifact's rung-one `createRequire(artifactUrl)('@auspicion/provident-storeroom-js-linux-x64-gnu')` with no `node_modules` reachable | **`MODULE_NOT_FOUND`** — the inlined arm needs `node_modules` at run time too, for the native addon, so externalising adds one requirement to a requirement the artifact already carries |

- **The two arms, weighed in bytes and files**: the inlined emission is **1,532,476** bytes and the external one **1,345,550** (P-10, P-11), and the difference is the package's JavaScript — the addon itself was never in either artifact (P-15). The artifact this tree emits is the second figure, re-measured at this head (`dist/main/main.mjs`, `stat` size).

## 3. The rejected alternatives, and each arm's cost

| Arm | What was measured | Why it is rejected |
|---|---|---|
| **Keep inlining, satisfy the derivation at build time** (`--define:import.meta.url`, or the literal it bakes) | P-6 on CJS, P-14 on ESM: the literal lands three times | the artifact would name **one absolute path on the building host** — it could not be shipped as the prebuild baseline, and the derivation would describe the builder's disk instead of the artifact (L1 §0) |
| **Keep inlining, copy the manifest and the addon beside the artifact** | P-12 fixes exactly what would have to be copied: `package.json`'s `version` and `build/Release/storeroom_js_binding.node` | the emission set would gain a **host-arch native binary** and a fabricated package directory, so `dist/` stops being host-independent, and both B-5's file and the version equality would rest on a copy the package did not make (`persistence.md` §1) |
| **CJS main, package externalised** | P-5: `ERR_PACKAGE_PATH_NOT_EXPORTED` | the package declares **no `require` condition**, so the arm is unavailable rather than unwise, and a package change is the only alternative (D-5) |
| **CJS main, dynamic `import()` of the package** | esbuild 0.28.2 preserves `import("provident-storeroom")` in CJS output | it turns store construction **async**, and the boot constructs at `src/main/main.ts:112`: the change would move `src/main/storeroom.ts`, `src/main/settings-surface/`, `src/main/operator-settings/` and `src/main/data/` — four files of three other modules, where L1 §8 declares one entry file (E-2) |
| **A CJS launcher that dynamically imports the ESM entry** | P-7 with P-4 | a **second artifact** in the boot path and an async hop, and it makes the launcher responsible for reporting a load failure where Electron's loader publishes that reason for free (`behaviour.md` §4) |

- **The decision, in one sentence**: the main emission is built `--format=esm --external:provident-storeroom`, because only that arm leaves the package's module context where the package derives it **without** an async construction and without a machine-bound or host-arch artifact (P-10..P-15; D-5, D-27).

## 4. What the arrangement forces in the entry's own text (E-2)

- **Nothing beyond what E-2 has landed**: `src/main/main.ts:6-7` binds `{dirname, join}` from `node:path` and `fileURLToPath` from `node:url`, and `:29` is the module-URL derivation. Rev 2's flag is a **build-command** change, so the entry is written once and never again by this unit (L1 §8 E-2).
- **`here` is the file's only module-scope directory source**, and its two consumers are `:459`'s preload join and `:466`'s HTML-entry join; no boot step, channel, handler or gate call composes a path (D-18).
- **The boot order survives in kind** — construction `:112`, boot read `:113`, gate `:119`, attach `:453`, window `:455`, `loadFile` `:467`, `mcp.start()` `:471` — because the arrangement changes what the module *imports*, never when a statement runs (L1 §5; `behaviour.md` §2).

## 5. The declared surface, one writer each (`modules.md` §1, D-3)

| Id | Path (owning row) | The writes that may move | Writer |
|---|---|---|---|
| **E-1** | `package.json` (`bundle-boot-seam`) | `main` (`:7`) → `dist/main/main.mjs` *(landed)*; the `main.ts` emission in `build` (`:10`) → `--format=esm --outfile=dist/main/main.mjs --external:provident-storeroom` *(landed)*; the **same emission** in `build:watch` (`:11`), same two facts *(landed)* | this unit's **L4**, one shot — **landed** |
| **E-2** | `src/main/main.ts` (`app-shell`) | `:6-7` (the two imports) and `:29` (the derivation) only; no boot step, no channel, no handler, no `:459` join (D-18) | this unit's **L4**, one shot — **landed** |
| **E-5** | `scripts/electron-spawn.mjs`, `scripts/electron-ui.mjs` and `tests/ui-leg-contract.test.ts` (`harness`) | one **name** each, at three sites: `scripts/electron-spawn.mjs:75`'s `mainCjs` and `scripts/electron-ui.mjs:131`'s `mainBundle` constants → the artifact `main` names (the spawn vector at `:81` and the digest map at `:1157` read those constants and move with them), and the ui leg's matcher at `tests/ui-leg-contract.test.ts:498` | **`harness`** — its script writer for the two constants and its test writer for the matcher — **landed** |
| **E-3** | the `bundle-boot-seam` row of `strata/modules.json` | **no change**: N = 12 stands (§8) and no path moves with the arrangement | **L1** |
| **E-4** | `tests/e2e/bundle-boot-seam/` (L1's battery) | **no change of grain**: B-5's red under the inlined shape was a finding against the arm, not a write by this layer (§7) | **L1** |

- **The declared surface enlarges by one flag at two sites and by one run-time requirement — no new file**: `provident-storeroom` already stands in `dependencies` (`package.json:26`), no build key is added, and no dependency moves, so E-1 lands the field at `package.json:7` and the flag at `:10` and `:11` — three sites, and not one of them a file (D-14).
- **The new requirement is not a write but a property of the artifact**: the built app resolves the package from `node_modules` where it runs (P-13), so a **packaged** app must ship `node_modules/provident-storeroom` and its platform optional dependency and must have the native addon loadable from disk rather than from inside an archive (P-12's rung-one reading; `persistence.md` §3, ASM-L2-8). **The artifact is therefore not self-contained — and it was not before either** (P-15's `MODULE_NOT_FOUND` for the addon the inlined arm also needed).
- **Not a move, named so no reader looks for one**: `src/main/preload.ts`, `standalone.ts` and `battery-host.ts` stay their rows' and byte-identical, and every other file under `scripts/` stays `harness`'s (L1 §8, `modules.md` §3).

## 6. Boundaries — what this unit does not do (D-27)

- **No package change**, and no package-side workaround: the arrangement leaves the package where it declares its own location, and a gap in `provident-storeroom` is recorded, never patched (D-5, `persistence.md` §7).
- **No new MCP surface**: no tool, resource, group, `RpcMethod` member or bridge channel is added (D-18, L1 §7).
- **No boot-contract restatement**: the observables, the order and the eight scenarios are L1 §4-§6's (D-1 §4).
- **No re-grain of the three legs**: `npm test`, both typechecks and `npm run build` stay the floor (D-14, `brief.md` §6).

## 7. The integration battery's rows, each with its reading

| # | Goal at the arrangement grain | Expected | Reading |
|---|---|---|---|
| A-1 | the build emits the artifact the `main` field names, in the declared format | `package.json:7`'s path exists, is non-empty, the loader's module type for it is ESM, and the `build` arm carries `--format=esm` on `--platform=node` | **green** — `dist/main/main.mjs` stands at 1,345,550 bytes and `package.json:10` carries both `--format=esm` and the flag |
| A-2 | the emitted artifact's module system matches the format the build emitted | it parses under the loader's own mapping and carries neither the CJS `import.meta` placeholder nor a free `__dirname`/`__filename` | **green** — 0 `import_meta` placeholders and 0 `__dirname` in the landed emission; under plain node it parses and stops only at `electron`'s named-export link, which the container supplies (P-8's shape) |
| A-3 | the package's addon-path derivation is satisfiable in the emitted artifact | the artifact's module scope supplies a real `import.meta.url` and the addon the package declares resolves and loads from the entry that uses it | **green** — and it is the row the flag protects: the emission carries `provident-storeroom` as a bare specifier, so the package's context is its own; with it inlined the module scope is real and the *package's* context is not (P-11, P-12) |
| A-4 | the preload artifact is still CJS and still loads | `dist/main/preload.cjs` exists, parses as CJS, evaluates without a parse error, and the built entry still names `preload.cjs` beside itself | **green** (P-8) — parses as CJS under `vm.Script` at this head |
| A-5 | the harness's one spawn vector names the artifact the `main` field names | the two harness constants' values equal `package.json:7`'s path | **green** — E-5 landed at all three sites: `mainCjs` (`scripts/electron-spawn.mjs:75`) and `mainBundle` (`scripts/electron-ui.mjs:131`) spell `main.mjs`, and the ui leg's matcher (`tests/ui-leg-contract.test.ts:498`) requires it. **E-5's row, `harness`'s writer**, not this layer's and not L4's |

- **Completable, and measured so rather than asserted** (`examiner.md` §3): P-11 is A-3's and B-5's fact measured by hand — the same source, one flag, an instance that stands. **A-5 reads the two constants and the matcher and nothing else**: the retired name still stands in the two **gate-era live drivers** outside E-5's three sites (`tests/store-compliance-live.mjs:264`, `tests/secure-exclusion-live.mjs:187`), which **nothing runs** — no script key names either, and `vitest.config.ts` collects only `tests/**/*.test.ts` — so no leg is red on them and their paths are those rows', not this layer's write (D-3).

## 8. The census the arrangement is counted by, and the cap that follows (D-14)

| Count | Members | Why the arrangement moves none of them |
|---|---|---|
| **4** | entry points that must boot: `src/main/{main,preload,standalone,battery-host}.ts` | the arrangement changes one artifact's module system, one import edge and leaves all four paths where they are (L1 §2) |
| **5** | transports they open: the app's stdio and Streamable HTTP, the standalone's stdio and HTTP, the battery host's stdio | no transport code is in the seam: `src/main/mcp-server.ts:1191,1203` publish readiness either way (L1 §2) |
| **3** | handshakes that must complete: the app's `initialize`/`tools/list`/tool call, the siblings' `initialize`/`tools/list`, the renderer bridge's arrival | each is an L1 §6 row; this layer adds no call, and its battery reads the **artifact** (§7) |

- **N = 12 stands, and the cap is what `50 + 10×N` derives from it — 170 at N = 12 — computed by the lint from the row's `endpoints`, never stored in the row** (`strata/modules.json`'s `bundle-boot-seam` row; `platform.md` §4, D-14): §7's battery is evidence and does not count against it (D-14, `brief.md` §6).

## 9. Assumptions, each with the alternative it rejected (`envelope.md` §3)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L2-1` | the arrangement is decided on the **artifact**, not on a running window, because this seat fires `app.whenReady()` for neither arm (P-9) | asserting a booting window from a probe that never reached `whenReady`, the unbounded-wait reading `F-2` punished (`strata/.strata/returns/security-store-storeroom-l2-examination.json`) |
| `ASM-L2-2` | main is emitted **ESM** and named by the `main` field (§1) | each of §3's arms, rejected on its own measurement rather than on taste |
| `ASM-L2-3` | the artifact's **name** carries its module system (P-7), so a misnamed artifact is a loud load failure | a `.cjs` name for ESM bytes, which the loader rejects at parse |
| `ASM-L2-4` | E-5 is a **cross-module exception of three sites** — the two harness script constants (`scripts/electron-spawn.mjs:75`, `scripts/electron-ui.mjs:131`) and the ui leg's matcher (`tests/ui-leg-contract.test.ts:498`), **one name each**, written by `harness` — and A-5 verifies it rather than trusting it | leaving the legs naming the retired path, which reddens both Electron legs for a filename |
| `ASM-L2-5` | the preload stays **CJS** (§1) | an ESM preload, which needs `sandbox: false` at `src/main/main.ts:458-461` — a renderer-security change no boot seam may buy |
| `ASM-L2-6` | the two sibling bundles and the renderer bundle are **untouched**, and measured so: neither sibling emission carries an addon-path reference (§1) | rebuilding them “for consistency”, which buys nothing and puts two other modules' boot rows at risk (L1 §6 B-7) |
| `ASM-L2-7` | **the package is external**, so the app resolves it from `node_modules` at run time (P-11..P-13; landed at both manifest sites) | inlining it (§3, first and second arms), which relocates its derivation or binds the artifact to the building host |
| `ASM-L2-8` | a **packaged** app must ship `node_modules/provident-storeroom` and its platform optional dependency, with the native addon loadable from disk (P-13, P-15) | assuming the artifact is self-contained, which it was never measured to be — and this baseline ships **no packaging config at all** (no builder/forge key or dependency in the tree), so the packaging leg is the forker's and is stated, not tested, here |
