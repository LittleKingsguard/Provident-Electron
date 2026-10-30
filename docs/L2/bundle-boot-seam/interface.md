# L2 — `bundle-boot-seam`: the interface

- **Layer:** L2 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — `tests/integration/bundle-boot-seam/` is filed against this file and stands red on A-1..A-3 until the arrangement lands (`examiner.md` §3; D-27)
- **Inputs:** `docs/L1/bundle-boot-seam.md` §1-§9 — the map row **N = 12** (§2), the two arrangements L1 named and fixed neither (§3), the published observables (§4), the boot order (§5), the cross-module exceptions E-1/E-2 (§8), the assumptions (§9); `strata/decisions.md` D-5, D-14, D-18, D-26, D-27; `strata/modules.json` (`bundle-boot-seam`, endpoints **12**, cap **170**); `strata/platform.md` §3/§4
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** every probe answer in §2 is a measurement taken on this seat at this head with the repo's own `node_modules/electron` (**44.4.5**) and `node_modules/esbuild` (**0.28.2**), the whole probe tree under `/tmp` and none of it in the repository; the package and the siblings are read and never edited (D-5)

## 0. Scope, and what this document does not fix

The **arrangement** is this unit's whole surface: which artifact each of the four entry points becomes, which module system each is in, which field names which artifact, and which file's own text the arrangement forces to move (D-27, L1 §1). No `docs/L3/` structure, no signature, no pseudocode, no file below the declared surface (D-1 §3), and no patch — this layer diagnoses and designs (`examiner.md` §4). **No new MCP surface** enters to prove a boot: no tool, resource, group, `RpcMethod` member or bridge channel (D-18, L1 §7). **No package is modified**: the seam is this repo's, and the defect's record stays in the unit that surfaced it (D-5, `strata/records/security-store-storeroom-unit.md` §2).

## 1. The arrangement: main emitted as ESM, named by the `main` field

| Entry point | Artifact | Module system | Named by |
|---|---|---|---|
| `src/main/main.ts` | `dist/main/main.mjs` | **ESM — applied** | `package.json:7` (`main`) |
| `src/main/preload.ts` | `dist/main/preload.cjs` | **CJS — kept** | the main entry's own `join(here, 'preload.cjs')`, `src/main/main.ts:455` |
| `src/main/standalone.ts` | `dist/main/standalone.mjs` | ESM — kept | no field: spawned by path (L1 §6 B-7) |
| `src/main/battery-host.ts` | `dist/main/battery-host.mjs` | ESM — kept | as above |
| `src/renderer/renderer.ts` | `dist/renderer/renderer.js` | browser ESM — kept | the HTML entry `src/main/main.ts:462-463` loads, which loads it |

- **`package.json:7` names `dist/main/main.mjs`**, and it is the only field that names a boot artifact: `package.json:6` already declares the package `type: module`, and Electron resolves that field when it is handed the package (D-27, L1 §9 ASM-1).
- **The two CJS emissions of `package.json:10` are not one decision**: `preload.cjs` **stays** CJS because the renderer's `webPreferences` sets `contextIsolation: true` and never `sandbox: false` (`src/main/main.ts:451-459`), so the preload is loaded as CommonJS; `main.cjs` becomes `main.mjs` (ASM-L2-5, D-27).
- **`:455`'s preload join needs no edit**, because the ESM entry is emitted into the same `dist/main/` directory, so `preload.cjs` still stands beside whatever names it (L1 §8 E-2, §4 below).
- **The entry's own module scope becomes the URL's**: the 1.5 MB artifact's only source of a directory is `import.meta.url`, so the derivation in §4 replaces the CJS global the entry spelled at `src/main/main.ts:25` (P-3, P-4).

## 2. The probe that decided it (measured this seat, re-runnable)

| # | Probe (all scratch, `/tmp`) | Answer |
|---|---|---|
| P-1 | `node -e "require('./dist/main/main.cjs')"` at this head | **throws at module load**: `ERR_INVALID_ARG_VALUE` — *“The argument 'filename' must be a file URL object, file URL string, or absolute path string. Received undefined”* — so no process the artifact starts ever exists (D-27; `dist/main/main.cjs:38479-38482`) |
| P-2 | a two-file app (`{"type":"module","main":"main.mjs"}`) run by `node_modules/electron/dist/electron --no-sandbox` | Electron **44.4.5 boots an ESM main**: `import.meta.url` is `file:///…/main.mjs`, `createRequire(import.meta.url)` loads the platform addon (15 exports), and `__dirname` throws `ReferenceError` (L1 §9 ASM-1, now this seat's own measurement) |
| P-3 | `esbuild src/main/main.ts --bundle --platform=node --format=esm --external:electron`, run under the same Electron | the package's `createRequire(import.meta.url)` is **satisfied**; the single load error is `ReferenceError: __dirname is not defined in ES module scope` at the entry's own `var here = __dirname` (`src/main/main.ts:25`) |
| P-4 | P-3's artifact with that one line given a literal, under the same Electron | **module evaluation completes** and `App threw an error during load` appears **zero** times — one line of the entry's own text is the whole distance from this head to a booting main bundle |
| P-5 | `--external:provident-storeroom` on the same CJS build, run under Electron | emits `require("provident-storeroom")`, which answers **`ERR_PACKAGE_PATH_NOT_EXPORTED`**: the package's exports map carries `types` and `import` conditions only (`node_modules/provident-storeroom/package.json:27-32`) |
| P-6 | `--define:import.meta.url='"file:///…/provident-storeroom/index.mjs"'` on the same CJS build | accepted by esbuild 0.28.2, and it **bakes the absolute literal** at all three derivation sites of `node_modules/provident-storeroom/index.mjs:94-97` |
| P-7 | an ESM-content file named `.cjs`, run under the same Electron | `Warning: Failed to load the ES module … use the .mjs extension`, then `SyntaxError: Cannot use import statement outside a module` — the artifact's **name** is load-bearing, not cosmetic |
| P-8 | `import('./dist/main/preload.cjs')` under plain node | the preload **evaluates as CJS** and reaches Electron's API (`TypeError: Cannot read properties of undefined (reading 'exposeInMainWorld')`), never a parse error — it is still CJS and still loads (L1 §1) |
| P-9 | a CJS control app under the same Electron | `app.whenReady()` **never fires on this seat** and the process dies by signal, for the CJS control exactly as for the ESM arm: every window- and renderer-grain observable of L1 §4 is unmeasurable here (ASM-L2-1) |

## 3. The rejected alternative, and each variant it was tried as

L1 §3 named the second arrangement as *main kept CJS* with the package's derivation satisfied some other way; three ways exist, each was measured, and a fourth arm was tried to keep the artifact's name instead.

| Arm | What was measured | Why it is rejected |
|---|---|---|
| **CJS main, package externalised** (`--external:provident-storeroom`) | P-5: `ERR_PACKAGE_PATH_NOT_EXPORTED` | the package declares **no `require` condition at all**, so “keep CJS and require it” is not a wiring choice to make; it is unavailable, and a package change would be the only alternative (D-5) |
| **CJS main, `import.meta.url` defined at build time** | P-6: the literal lands in the artifact | the bundle becomes **machine-bound**: `npm run build` output would name one absolute path on the building host and could not be shipped as the prebuild baseline (L1 §0) |
| **CJS main, dynamic `import()` of the package** | esbuild 0.28.2 preserves `import("provident-storeroom")` in CJS output | it turns store construction **async**, and `src/main/main.ts:108` constructs the instance synchronously during boot: the change would move `src/main/storeroom.ts`, `src/main/settings-surface/`, `src/main/operator-settings/` and `src/main/data/` — four files of three other modules — where L1 §8 declares exactly one entry file (E-2; §5) |
| **A CJS launcher that dynamically imports the ESM entry** (keeps `main.cjs`) | P-7 with P-4 | it is a **second artifact** in the boot path and an async hop in front of the entry, and it makes the launcher responsible for reporting a load failure's reason, where Electron's own loader publishes that reason for free (P-3, `behaviour.md` §4) |

- **The decision is one sentence, and this is it:** main becomes the ESM artifact the `main` field names, because that is the only arm which satisfies `import.meta.url` **both** without an async store construction and without a machine-bound artifact (D-5, D-27, L1 §3 ASM-1).

## 4. What the arrangement forces in the entry's own text (E-2)

- **Exactly two edits, both in `src/main/main.ts`**: `:6` gains `fileURLToPath` beside the `join` it already imports, and `:23-25` replaces the CJS comment plus `const here = __dirname` with the module-URL derivation of the same directory — `dirname(fileURLToPath(import.meta.url))` (P-3, P-4; L1 §8 E-2).
- **Nothing else in the file moves**: `here` is the only CJS-only module-scope binding the 1.5 MB artifact uses (measured: one occurrence of `__dirname` in the whole CJS bundle), so no boot step, channel, handler, gate call or `:455` join is touched (D-18, L1 §5).
- **The boot order survives in kind** — construction `:108`, boot read `:110`, gate `:115`, attach `:449`, window `:451`, load `:463`, `mcp.start()` `:467` — because the arrangement changes what the module *is*, never when a statement runs (L1 §5; `behaviour.md` §2).

## 5. The declared cross-module writes, one writer each (`modules.md` §1, D-3)

| Id | Path (owning row) | The writes that may move | Writer |
|---|---|---|---|
| **E-1** | `package.json` (`bundle-boot-seam`) | `main` (`:7`) → `dist/main/main.mjs`; the `main.ts` emission in `build` (`:10`) → `--format=esm --outfile=dist/main/main.mjs`; and the **same emission** in `build:watch` (`:11`), which would otherwise keep rebuilding the retired artifact | this unit's **L4**, one shot |
| **E-2** | `src/main/main.ts` (`app-shell`) | `:6` (the `node:url` import) and `:23-25` (the `here` derivation) only (§4); no boot step, no channel, no handler, no `:455` join (D-18) | this unit's **L4**, one shot, under this design |
| **E-5** *(new at this layer)* | `scripts/electron-spawn.mjs` and `scripts/electron-ui.mjs` (`harness`) | one **name** each: `:75`'s `mainCjs` and `:131`'s `mainBundle` constant → the artifact `main` names; the spawn vector at `:81` and the digest map at `:1157-1160` read those constants and move with them | **`harness`**, its own unit's task, one writer per file |
| **E-3** | `strata/modules.json` (L1's map row) | **no change this unit needs**: N = 12 stands (§8) and no path moves with the arrangement | **L1** |
| **E-4** | `tests/e2e/bundle-boot-seam/` (L1's battery) | **no change of grain**: one row's copy name is a finding against L1, not a write by this layer (§7) | **L1** |

- **E-5 is new and is why it is filed rather than assumed**: L1 §8 declared two exceptions because it could not know the *harness* names the artifact — and it does, by path, because `baseArgs[0]` is Electron's app argument (`scripts/electron-spawn.mjs:81`), so a renamed artifact leaves both Electron legs spawning a file that no longer exists while L1's B-1..B-8 stay green (L1 §8, D-27).
- **Not a move, named so no reader looks for one**: `src/main/preload.ts`, `src/main/standalone.ts` and `src/main/battery-host.ts` stay `app-shell`'s and `mcp-surface`'s and byte-identical, and every other file under `scripts/` stays `harness`'s (L1 §8, `modules.md` §3).
- **No third file is claimed by this unit**: no source file is added, no build key is added, and `package.json`'s `scripts` key set and dependency set are unmoved — the arrangement lands inside two existing build commands and one existing field (L1 §2, D-14).

## 6. Boundaries — what this unit does not do (D-27)

- **No package change**, and no package-side workaround: the shape is this repo's, and a gap in `provident-storeroom` is recorded, never patched (D-5).
- **No new MCP surface**: no tool, resource, group, `RpcMethod` member or bridge channel is added, and the boot contract is read through the surfaces that already exist (D-18, L1 §7).
- **No boot-contract restatement**: the observables, the order and the eight scenarios are L1 §4-§6's, and this file adds none (D-1 §4, L1 §6).
- **No re-grain of the four legs**: `npm test`, both typechecks and `npm run build` stay the floor, and this unit's battery adds to them (D-14, `brief.md` §6).

## 7. The integration battery's rows, and the two rows outside this layer's scope

| # | Goal at the arrangement grain | Expected | At this head |
|---|---|---|---|
| A-1 | the build emits the artifact the `main` field names, in the declared format | `package.json:7`'s path exists, is non-empty, the loader's module type for it is ESM, and the `build` arm that emits that path carries `--format=esm` on `--platform=node` | **red** — the field names `main.cjs`, and `package.json:10` says `--format=cjs` |
| A-2 | the emitted artifact's own module system matches the format the build emitted | it parses under the loader's own mapping, and carries neither the CJS `import.meta` placeholder nor a free `__dirname`/`__filename` | **red** — `dist/main/main.cjs:38479` is `var import_meta = {}` and `:40392` is `var here = __dirname` |
| A-3 | the package's addon-path derivation is satisfiable in the emitted artifact | the artifact's module scope supplies a real `import.meta.url`, and the platform artefact the package declares resolves and loads **from the artifact's own URL** | **red** — the module scope is the empty object |
| A-4 | the preload artifact is still CJS and still loads | `dist/main/preload.cjs` exists, parses as CJS, evaluates without a parse error, and the built entry still names `preload.cjs` beside itself | **green** |
| A-5 | the harness's one spawn vector names the artifact the `main` field names | the two harness constants resolve to `package.json:7`'s path | **green now**, red between E-1 and E-5 — the row that makes E-5 verifiable instead of silent |

- **Completable, and measured so rather than asserted** (`examiner.md` §3): the same `src/main/main.ts` built `--format=esm` with §4's one line applied answers **all four** technical expectations — zero `import_meta` placeholders, zero `__dirname`/`__filename`, three `import.meta.url` references, `node --check` clean — and the platform package loads with `storeCreate` a function through `createRequire(<artifact url>)` (P-4; `interface.md` §2).
- **Two rows this layer may not write, named so neither is discovered late** (`examiner.md` §5): L1's B-8 writes its corrupted copy as `main.cjs` (`tests/e2e/bundle-boot-seam/boot-contract.test.ts:279`), so under an ESM artifact it would publish a `SyntaxError` instead of its injected reason (P-7) and must copy under the `main` field's own basename; and the flat suite's `L-1` leg row requires the ui leg's source to contain `main.cjs` (`tests/ui-leg-contract.test.ts:498`), so E-5's landing reddens it until its own module's test writer moves the assertion (D-10, D-14).
- **The battery is evidence, so D-14's cap does not bind it**; N = 12 stands and the harness cap that follows is 170 (`platform.md` §4, D-14).

## 8. The census the arrangement is counted by, and the cap that follows (D-14)

| Count | Members | Why the arrangement moves none of them |
|---|---|---|
| **4** | entry points that must boot: `src/main/{main,preload,standalone,battery-host}.ts` | the arrangement changes one artifact's module system and leaves all four paths where they are (L1 §2) |
| **5** | transports they open: the app's stdio and Streamable HTTP, the standalone's stdio and HTTP, the battery host's stdio | no transport code is in the seam: `src/main/mcp-server.ts:1191,1203` publish readiness either way (L1 §2, §4) |
| **3** | handshakes that must complete: the app's `initialize`/`tools/list`/tool call, the siblings' `initialize`/`tools/list`, and the renderer bridge's arrival | each is an L1 §6 row, and this layer adds no call: its battery reads the **artifact**, not a transport (§7) |

- **N = 12 stands and the cap is 170** (`strata/modules.json`, `platform.md` §4): §7's battery is evidence and does not count against it, and this layer's one read of the emission set plus one file is far inside the remainder (D-14, `brief.md` §6).

## 9. Assumptions, each with the alternative it rejected (`envelope.md` §3)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L2-1` | the arrangement is decided on the **artifact**, not on a running window, because this seat fires `app.whenReady()` for neither arm (P-9), and L1 §4's window observables stay L1's to measure | asserting a booting window from a probe that never reached `whenReady`, which is the unbounded-wait reading `F-2` punished (`strata/.strata/returns/security-store-storeroom-l2-examination.json`) |
| `ASM-L2-2` | main is emitted **ESM** and named by the `main` field (§1) | each of §3's four arms, rejected on its own measurement rather than on taste |
| `ASM-L2-3` | the artifact's **name** carries its module system (P-7), so a misnamed artifact is a loud load failure | a `.cjs` name for ESM bytes, which the loader rejects at parse and which would make the failure a name's fault rather than a code's |
| `ASM-L2-4` | E-5 is a **new** cross-module exception: two one-line name changes, written by `harness` | leaving the legs naming the retired path, which reddens `npm run divergence` and `npm run ui` for a filename after the seam they measure starts booting |
| `ASM-L2-5` | the preload stays **CJS** (§1) | an ESM preload, which needs `sandbox: false` at `src/main/main.ts:451-459` — a renderer-security change no boot seam may buy |
| `ASM-L2-6` | the two sibling bundles and the renderer bundle are **untouched** by the arrangement | rebuilding them ESM “for consistency”, which buys nothing the seam needs and puts two other modules' boot rows at risk (L1 §6 B-7) |
