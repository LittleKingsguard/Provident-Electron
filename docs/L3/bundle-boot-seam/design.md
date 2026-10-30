# L3 — `bundle-boot-seam`: the structure

- **Layer:** L3 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 3 · **Artifact:** `l3-boot-seam-design`
- **Status:** DESIGN — structure, pseudocode and guardrail notes for one owner. The declared names are `signatures.md`; the layer's battery is `tests/unit/bundle-boot-seam/`. The arrangement itself is L2's (`docs/L2/bundle-boot-seam/interface.md` §1) and is restated here, never re-decided (D-27, `examiner.md` §3). Rev 2 carries L2's decided arm — the main emission is `--external:provident-storeroom` in **both** build keys, and the artifact it produces is **not self-contained**, which §4 states as `G-8`. Rev 3 replaces this file's `src/main/main.ts` offsets with **site names** (D-41) and has `G-1` cite L1's `C-3` row for the boot order instead of restating it (D-43)
- **Inputs:** `docs/L1/bundle-boot-seam.md` §1/§4/§5/§6/§8/§9; `docs/L2/bundle-boot-seam/interface.md` §1/§2/§4/§5/§7/§9, `behaviour.md` §2/§4/§6, `persistence.md` §1/§2/§3/§4/§5; `strata/decisions.md` D-5, D-14, D-18, D-26, D-27, D-28; the `bundle-boot-seam` row of `strata/modules.json` (endpoints **12**) — cited by row and by id, never by line (D-28); `strata/platform.md` §4
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `P-n` is `interface.md` §2's probe answer on this seat; the package and the siblings are read and never edited (D-5)

## 1. The shape: two landing sites and one derivation (D-27, L1 §8)

| Site | Owning row | What lands | Pinned by |
|---|---|---|---|
| `package.json`'s `main` field | `bundle-boot-seam` (E-1) | `dist/main/main.mjs` — the one field that names a boot artifact | `U-1` |
| `package.json`'s `build` and `build:watch`, the `main.ts` emission | `bundle-boot-seam` (E-1) | `--format=esm --platform=node --external:electron --external:provident-storeroom --outfile=dist/main/main.mjs`, one decision in two keys | `U-2`, `U-3` |
| `src/main/main.ts`'s `node:path` and `node:url` import lines, and its one module-scope binding | `app-shell` (E-2) | one module-scope binding deriving the entry's own directory from its module URL | `U-7`, `U-8` |
| `scripts/electron-spawn.mjs` `:75`, `scripts/electron-ui.mjs` `:131` | `harness` (E-5, §6) | the same artifact's new name, one name per file | L2's `A-5` |

- **Nothing else in the tree is this unit's** (L1 §8): the four entry points stay where they are, `preload.ts`, `standalone.ts` and `battery-host.ts` stay their rows' and byte-identical, `scripts/` stays `harness`'s, and no source file, build key or dependency is added (`interface.md` §5, D-14).
- **The seam is a build arrangement plus one derivation**: it writes nothing at runtime, and its only disk change is a **subtraction** — the package's bytes leave the emission — which leaves a requirement it must *find* on disk rather than produce (`G-8`; `persistence.md` §1, §3).

## 2. E-1 — `package.json`: the name, and the arm that emits it

- **The field names the artifact whose NAME is the module system** — `dist/main/main.mjs` (`package.json`'s `main` row; `interface.md` §1, ASM-L2-3). `package.json`'s `type: module` already declares the package ESM (L1 §9 ASM-1).
- **One moving arm, and the four others verbatim**: `clean` removes `dist` first, so the retired artifact cannot survive a build that no longer emits it (`persistence.md` §2).

```
build   (declared order; ONE arm moves, the rest stay byte-identical)
  clean                     · dist removed — replacement, never a second artifact beside the retired one
  main.ts      → --format=esm --external:electron --external:provident-storeroom --outfile=dist/main/main.mjs  ← the ONE moving arm (E-1)
  preload.ts   → --format=cjs --outfile=dist/main/preload.cjs   ← unchanged (ASM-L2-5)
  standalone.ts → --format=esm --outfile=dist/main/standalone.mjs   ← unchanged (ASM-L2-6)
  battery-host.ts → --format=esm --outfile=dist/main/battery-host.mjs ← unchanged
  renderer.ts  → --platform=browser --format=esm --outdir=dist/renderer ; cp index.html ← unchanged
build:watch  (the same decision, its second key)
  the same main.ts emission at --format=esm --external:provident-storeroom --outfile=dist/main/main.mjs
  or the watch leg keeps rebuilding a retired name while the field names a file nothing emits (persistence.md §2)
```

- **`--bundle`, `--platform=node` and `--external:electron` are unmoved** in every arm: the container supplies Electron, and the arrangement moves a format, an outfile **and one external** (`behaviour.md` §5, E-1).
- **The external is all rev 2 adds, and it lands twice**: `--external:provident-storeroom` is what keeps the package's module URL — hence its version read, its `require_` and its `ADDON_PATH` — at its real location under `node_modules`, where an inlined copy relocates all three into `dist/main/` and the instance silently refuses (`interface.md` §1, §3, P-10..P-12; `persistence.md` §2).

## 3. E-2 — the entry's own directory, derived from the module URL (L1 §8 E-2)

- **What replaces `__dirname`**: the module's own file URL, which the loader supplies and `__dirname` could not — `import.meta.url` is the only directory source an ESM entry has (`P-2`, `P-3`).
- **The value it must equal**: the directory holding the emitted entry, `dist/main` — in the exact form `__dirname` held, so the `join(here, 'preload.cjs')` at the window's `webPreferences.preload` and the `join(here, '..', 'renderer', 'index.html')` at the renderer-HTML binding compose to the same two targets with no edit to either (`U-8`; `interface.md` §4, ASM-L2-5).

```
module scope (once, where the CJS binding stood):
  here = dirname(fileURLToPath(import.meta.url))     · no type annotation: the value is inferred
         = the directory part of this module's own URL, as a filesystem path, no trailing separator
  invariants this value must satisfy, unchanged from the CJS entry:
    join(here, 'preload.cjs')                    = the emitted preload artifact        · the window's preload option
    join(here, '..', 'renderer', 'index.html')   = the emitted renderer HTML entry     · the renderer-HTML binding
imports it is spelled through (three names, two specifiers):
  node:path → { dirname, join }        (dirname is NEW; join stands)
  node:url  → { fileURLToPath }        (NEW)
```

- **The derivation is spelled once and consumed twice**: one `const here`, two `join(here, …)` call sites — so no boot step, channel, handler or gate call can have moved on the way (`U-7`; L1 §5, D-18).
- **The annotation is not part of the text**: the landed line is `const here = dirname(fileURLToPath(import.meta.url))` with no `: string`, and `U-7` matches exactly that text — an implementer who adds the annotation reddens the row it is trying to satisfy (`U-7`; `interface.md` §4; the `here` binding's one site in `src/main/main.ts`; D-41).
- **The collision rev 1 flagged is settled in the derivation's favour, and recorded as settled**: `node:path`'s binding set grows from `{join}` to `{dirname, join}` because the expression needs both, and `tests/unit/settings-carrier-retirement/main-source.test.ts` `MS-2` was re-grained to pin `['dirname', 'join']` — so the flat row no longer refuses the derivation and no third spelling is needed (`MS-2`; §8 `ASM-L3-2`).

## 4. The guardrails L4 may not violate (D-18, L1 §5/§7/§8)

| id | Guardrail | Cite |
|---|---|---|
| `G-1` | **The boot order does not move**, and the order itself is L1's to state: the `C-3` row of `docs/L1/security-store-storeroom.md` §7 is **cited, not restated** here (D-43). What this unit pins is that E-2 edits none of those acts — `createSettingsSurface(...)`, `settingsSurface.read()`, the `SecurityGate` construction, `settingsSurface.attach(mcp)`, `new BrowserWindow(...)` with its `win.loadFile(...)`, and `await mcp.start()`, each named by its site rather than its line (D-41); E-2's edit is module scope only | `docs/L1/bundle-boot-seam.md` §5; `docs/L1/security-store-storeroom.md` §7 `C-3`; D-18, D-41, D-43 |
| `G-2` | **`preload.cjs` stays CJS and the two `join(here, …)` sites in `src/main/main.ts` keep their targets unchanged**: an ESM preload needs `sandbox: false`, a renderer-security change no boot seam may buy | L1 §1; ASM-L2-5; `U-4`, `U-8` |
| `G-3` | **`build` and `build:watch` are one decision**: no key may emit the retired name after the field moves, and both keys carry `--external:provident-storeroom` — a watch leg rebuilding an inlined artifact while `build` emits an external one leaves a boot that depends on which command ran last | `persistence.md` §2; `interface.md` §5 E-1; `U-3` |
| `G-4` | **The two sibling bundles and the renderer bundle stay byte-identical**: their arms are the declared text, and a row that reddens them is the arrangement's failure | ASM-L2-6; L1 §6 B-7; `U-5` |
| `G-5` | **The artifact's name carries its module system**: `.mjs` for ESM main, `.cjs` for the CJS preload, and no dual-named copy | ASM-L2-3; `U-1` |
| `G-6` | **Nothing else is emitted**: no shim, no launcher, no source map, no second copy of the entry — the emission set is exactly five artifacts | `persistence.md` §1, §4; `U-6` |
| `G-7` | **No new MCP surface and no package edit**: no tool, resource, group, `RpcMethod` member or bridge channel enters to prove a boot, and `provident-storeroom`/`provident-ssr` are never modified | D-18; D-5; L1 §7 |
| `G-8` | **The artifact is not self-contained, and a fork must be told so**: the emission imports `provident-storeroom` as a bare specifier and resolves it from `node_modules` at run time, so a packaged build must ship `node_modules/provident-storeroom` **together with** the platform optional dependency, and the native addon must be loadable from disk — an archive that hides the `.node` file is the declared absent-addon state. This is a statement about the artifact and **not a regression the flag introduced**: the inlined arm's addon `require` answers `MODULE_NOT_FOUND` with no `node_modules` reachable, so neither arm was ever self-contained, and this baseline ships no packaging config at all | `interface.md` §5, §9 `ASM-L2-8`, P-13/P-15; `persistence.md` §3; D-5 |

- **No row of this unit's battery enumerates a tool census**: the map's `endpoints` figure and `brief.md` §6 own the counts, and a battery that restated one would be the drift D-26 retires (D-26, D-28).

## 5. The failure posture: a reason before the bound, never a hang (L1 §9 ASM-4)

- **A bundle that cannot boot reports its reason and never hangs**: a load failure is published by the loader at parse (`P-3`, `P-7`), and every wait the battery takes is bounded with the bound's expiry itself a failure that prints the trace — the shape `F-2` measured as 26 minutes and no verdict (`behaviour.md` §4; L1 §6 B-8).
- **The name carrying the module system is what makes a mismatch loud**: ESM bytes under a `.cjs` name are a `SyntaxError` at load, not a silently empty module scope (`P-7`; ASM-L2-3). Renaming the artifact to quiet a format mismatch inverts the arrangement.
- **`G-8`'s requirement fails at load, where a fork can see it**: an artifact shipped without `node_modules/provident-storeroom` beside it (or with its `.node` addon inside an archive) answers the loader's `ERR_MODULE_NOT_FOUND` — a named reason, not a silent boot and not a hang (`P-13`, `P-15`; `interface.md` §5; `persistence.md` §3).
- **The unit battery inherits the posture at its own grain**: every read of a built artifact is retried inside a bound and fails naming its reason, so a concurrent `npm run clean` cannot answer a bare timeout (`tests/unit/bundle-boot-seam/`).

## 6. E-5 — E-1's declared cross-module dependency, and no more (L2 `ASM-L2-4`)

- **E-1 renames the artifact and two harness constants name it, by path**, because `scripts/electron-spawn.mjs:75`'s `mainCjs` is the container's app argument at `:81` and `scripts/electron-ui.mjs:131`'s `mainBundle` is the `main` entry at `:1158` of `artifactPaths()`'s digest map (`interface.md` §5 E-5; `persistence.md` §6). Both constants' **values** spell `main.mjs`; their identifiers are unchanged, so the write was one value per file and no second name was minted (L1 §8).
- **The owning row is `harness`** and the write is one name per file, one writer: this unit's L4 lands E-1 and E-2, and the harness write is that row's own task, verified by L2's `A-5` and by no row of this battery (`modules.md` §3, L1 §8).
- **The two names are the only sites that decide a path** — so L4's E-1 needs no edit under `scripts/`, and a third edit there is an invention, not E-5 (D-3, L1 §8).
- **E-5 is three sites, and the `harness` row landed all three**: the two constants and the test row whose matcher reads the artifact's name — the `§5 PRE-1/PRE-2` row of `tests/ui-leg-contract.test.ts`, whose digest matcher requires `main.mjs` — so the three moved together as E-5 declared and none of them is this unit's L4's (L1 §8; `modules.json`'s `harness` row, which names `scripts/` and `tests/ui-leg-contract.test.ts`; D-3).
- **Two further spellings exist and are not that write, named so none is mistaken for it**: `scripts/electron-ui.mjs:1075` prints the retired name in a digest line (a display literal, `harness`'s, and not a path the leg reads); and the two unwired gate-era live drivers `tests/store-compliance-live.mjs:264` and `tests/secure-exclusion-live.mjs:187` name the old path while no script key and no vitest collection reaches them — their paths are the `operator-settings` row's, not `harness`'s (`modules.json`'s rows; D-10).

## 7. What this layer reads as the harness budget (D-14, `platform.md` §4)

- **`N = 12` is the map row's own figure** — four entry points that must boot, five transports they open, three handshakes that must complete (`modules.json`'s `bundle-boot-seam` row; L1 §2).
- **The cap is `50 + 10×N` = 170**, and it bounds the module's *harness* — driver, fixtures, factories, mock seams. The lint derives it from the row and prints it; **no document of this layer declares it** (D-14, `platform.md` §4).
- **A product battery is evidence, not harness** (`U-1`..`U-8` included): the unit battery's helpers are the reads a row needs, not a driver the module ships, so the cap is not the budget they answer to (D-14; L1 §6).
- **Both batteries are claimed by the map row, beside the package**: `bundle-boot-seam`'s row names four paths — `package.json`, `tests/e2e/bundle-boot-seam/`, `tests/unit/bundle-boot-seam/` and `tests/integration/bundle-boot-seam/` — under `endpoints` 12, so a `--changed` lint run attributes this layer's battery to the module and no path of it is owned by no module (`modules.json`'s `bundle-boot-seam` row; `modules.md` §3, D-28).

The eight rows as **goal → expected**, each pair read off the battery's own assertion and adding no claim the rows do not make (`walkthrough.md` §3; `tests/unit/bundle-boot-seam/`):

| Row | Goal at this layer's grain | Expected (what the row pins) |
|---|---|---|
| `U-1` | the `main` field's name decides the module system | the field's extension is `.mjs` and the loader reads that path as `esm` (§2, `G-5`) |
| `U-2` | exactly one `build` arm emits the entry, in the declared format | one arm names `src/main/main.ts` and carries `--format=esm`, `--platform=node`, `--external:electron` and an `--outfile` equal to `main`'s path; no `build` arm emits `main.cjs` (§2) |
| `U-3` | `build:watch` carries the same decision | its main arm's `--format` and `--outfile` equal `build`'s, and the key spells no `main.cjs` (§2, `G-3`) |
| `U-4` | the preload stays CJS and its arm stays the declared text | the preload arm is byte-identical to the declared text; `dist/main/preload.cjs` parses as CJS under `node --check`, carries `contextBridge`/`exposeInMainWorld` and no `import` statement (`G-2`) |
| `U-5` | the arms this unit may not move did not | `clean`, both siblings, the renderer and its HTML copy are the declared text; the siblings and `renderer.js` parse and `index.html` is non-empty (`G-4`) |
| `U-6` | the emission set is exactly five artifacts | `dist/main` holds `battery-host.mjs`, `preload.cjs`, `standalone.mjs` and `main`'s basename; `dist/renderer` holds `index.html` and `renderer.js`; `main.cjs` is absent (`G-6`) |
| `U-7` | the derivation is declared once, through exactly three names, and no CJS global stands | `node:path` binds `['dirname','join']`, `node:url` binds `['fileURLToPath']`, the source matches `const here = dirname(fileURLToPath(import.meta.url))`, `join(here, …)` appears twice, and `__dirname`/`__filename` appear nowhere (§3) |
| `U-8` | the emitted entry derives the bundle's own directory, live | `dirname(artifactUrl)` carries no trailing separator and equals `dirname(entry)`; its two joins land on the arms' own outfiles, both artifacts exist, and the emitted bytes carry `import.meta.url` and no CJS global (§3) |

## 8. Assumptions, each with the alternative it rejected (`envelope.md` §3)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L3-1` | the byte-identity pin for the two sibling bundles is **their emission command's text**, because a generated artifact has no committed digest — `dist` is untracked output | recording a digest of generated bytes, which is a measurement in the wrong home and reddens on any legitimate sibling edit (D-26, `persistence.md` §1) |
| `ASM-L3-2` | the derivation is spelled `dirname(fileURLToPath(import.meta.url))`, **with no type annotation**: no trailing separator, so the value is exactly the form `__dirname` held, and the text is the one line `U-7` matches against the source | `fileURLToPath(new URL('.', import.meta.url))`, which answers the same directory with a trailing separator and is now **refused** rather than held in reserve: L1 settled §3's collision by re-graining `MS-2` to `{dirname, join}`, so no spelling needs the one-name shape, and `U-7`'s verbatim match would redden on it (`U-7`, `U-8`; §3) |
| `ASM-L3-3` | the unit battery reads `src/main/main.ts` for its **declaration** (binding set, expression, call sites) and claims no boot the node suite cannot run | an artifact-only battery, which cannot see which names the entry binds and so could not refuse a `process.cwd()` or literal-path derivation |
| `ASM-L3-4` | E-5 is a **declared dependency** of E-1 and never this unit's write | L4 editing `scripts/` to keep the legs booting, which puts two modules on one path (`modules.md` §3, D-3) |
