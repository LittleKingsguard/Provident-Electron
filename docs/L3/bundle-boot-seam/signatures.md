# L3 — `bundle-boot-seam`: the declared signatures and the landing sites

- **Layer:** L3 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 2 · **Artifact:** `l3-signatures-regrain`
- **Status:** DECLARED NAMES AND STUBS ONLY — structure, pseudocode and guardrails are `design.md`; this file carries every name the implementation must expose or land, and the exact text it lands on (D-1 §4). Rev 2 carries L2's decided arm: the main emission is `--external:provident-storeroom` **in both build keys**, and the artifact that text produces is **not self-contained** — §3 states that requirement as `G-8` (`interface.md` §1, §5; `persistence.md` §3)
- **Contract:** every name below is a name `docs/L2/bundle-boot-seam/interface.md` §1/§4/§5 or `docs/L1/bundle-boot-seam.md` §8 already declares — the `main` field, one emission arm in two keys, the entry's derivation and E-5's two harness constants. No name is added and none is dropped (`interface.md` §7 `A-1`..`A-5`; D-1)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `P-n` is `interface.md` §2's probe answer on this seat; the two harness files are read and never edited (D-5, D-3)

## 1. There is no new exported function, and that is the signature

**This unit exports nothing.** No module, factory, class, verb, type or constant is added to `src/**`, and no file of `src/**` is added either: the seam is a build arrangement plus one module-scope binding, so its declared surface is a set of **artifact names**, one **field**, **one main emission written into two keys** and one **binding** (`design.md` §1; D-27, `interface.md` §5).

- **What this unit consumes and exposes is counted by the map row, not by this file**: `N = 12` is four booting entry points, five transports and three handshakes, and the cap that follows is the lint's (`strata/modules.json`'s `bundle-boot-seam` row; D-14, `platform.md` §4).
- **A reader looking for a stub to implement finds a field and two command strings instead**, which is why §3 and §4 give them as exact text rather than as a declaration of types (D-14; `interface.md` §5).
- **No `RpcMethod` member, MCP tool name, resource URI, bridge channel or `window.provident` member appears anywhere below**: the boot is proven through the surfaces that already exist (D-18, L1 §7).

## 2. The declared artifacts — the names this unit lands

| Artifact | Module system its name carries | Named by | Site |
|---|---|---|---|
| `dist/main/main.mjs` | **ESM** | `package.json`'s `main` field | E-1 |
| `dist/main/preload.cjs` | **CJS** | the entry's own `join(here, 'preload.cjs')`, `src/main/main.ts:459` | unmoved (ASM-L2-5) |
| `dist/main/standalone.mjs` | ESM | no field: spawned by path (L1 §6 B-7) | unmoved (ASM-L2-6) |
| `dist/main/battery-host.mjs` | ESM | as above | unmoved (ASM-L2-6) |
| `dist/renderer/renderer.js` + `index.html` | browser ESM | the HTML entry the window loads, `src/main/main.ts:466-467` | unmoved (ASM-L2-6) |

The set is exactly five artifacts, and `dist/main/main.cjs` is **retired, never emitted beside them** (`design.md` §4 `G-6`; `persistence.md` §1). The first is the only one that carries a package at all, and it carries it as an **`import` of a bare specifier**, never as bytes (`interface.md` §1; `persistence.md` §1).

## 3. `package.json` — the field and the arms, as exact text (E-1)

The one field, in `package.json`'s `main` row:

```
"main": "dist/main/main.mjs"
```

The `build` key's arms, in their declared order — **the first is the one that moves, and every other line is byte-identical to what stands today** (`design.md` §2):

```
npm run clean
esbuild src/main/main.ts --bundle --platform=node --format=esm --external:electron --external:provident-storeroom --outfile=dist/main/main.mjs
esbuild src/main/preload.ts --bundle --platform=node --format=cjs --external:electron --outfile=dist/main/preload.cjs
esbuild src/main/standalone.ts --bundle --platform=node --format=esm --outfile=dist/main/standalone.mjs
esbuild src/main/battery-host.ts --bundle --platform=node --format=esm --outfile=dist/main/battery-host.mjs
esbuild src/renderer/renderer.ts --bundle --platform=browser --format=esm --outdir=dist/renderer
cp src/renderer/index.html dist/renderer/index.html
```

The `build:watch` key is one arm joined by `&`; its three emissions move only in the first, which must carry the **same** `--format`, `--external:provident-storeroom` and `--outfile` as `build`'s first arm plus `--watch` (`design.md` §4 `G-3`; `persistence.md` §2).

- **`--external:provident-storeroom` is the one flag that lands, at two sites**: it is the only text E-1 adds, and it is what leaves the package's bytes out of the artifact so the package's own module URL — hence its version read, its `require_` and its `ADDON_PATH` — stays where the package declares it, under `node_modules` (`interface.md` §1, §5 E-1, P-12; `persistence.md` §2-§3).
- **`G-8` — the artifact this exact text produces is not self-contained**: it resolves `provident-storeroom` from the app's `node_modules` chain at run time, so a **packaged** build must ship `node_modules/provident-storeroom` together with the platform optional dependency whose native addon must be loadable from disk — an archive that hides the `.node` file is the declared absent-addon state, not a packaging detail. **This is not a debt the flag introduced**: the inlined arm's addon `require` also answers `MODULE_NOT_FOUND` with no `node_modules` reachable, so the statement is about the artifact, not a regression (`interface.md` §5, §9 `ASM-L2-8`, P-13/P-15; `persistence.md` §3; `design.md` §4 `G-8`).
- **No key is added, no dependency moves and `clean` keeps removing `dist`**: the emission set is the two build keys and one field, and nothing else — `provident-storeroom` stands in `dependencies` already (`interface.md` §5; D-14).
- **`--bundle`, `--platform` and `--external:electron` are unmoved in every arm, and no arm but the main one gains an `--external:`** — the container supplies Electron (`behaviour.md` §5), and the two siblings and the preload still carry no package at all (`interface.md` §1, ASM-L2-6).

## 4. `src/main/main.ts` — the declarations E-2 lands (E-2)

Two import lines and one binding; no function body, no boot step, no channel and no handler (`design.md` §3, §4 `G-1`):

```ts
import { dirname, join } from 'node:path'          // `dirname` is new; `join` stands
import { fileURLToPath } from 'node:url'           // new
const here = dirname(fileURLToPath(import.meta.url))
```

- **That is the landed text, verbatim and unannotated**: `const here = dirname(fileURLToPath(import.meta.url))` is the line `U-7` matches, so a `const here: string = …` spelling is **not** the declared text — the value is inferred, and the row reads the expression rather than a type declaration (`U-7`; `interface.md` §4, `src/main/main.ts:29`).
- **The value must equal the directory holding the emitted entry**, in the exact form `__dirname` held — no trailing separator — so `:459`'s preload join and `:466`'s renderer join keep their targets unchanged (`design.md` §3; `tests/unit/bundle-boot-seam/derivation.test.ts` `U-8`).
- **`here` is bound once and consumed by exactly two `join(here, …)` call sites**, which is how "no boot step moved" is pinned at this grain (L1 §5; `U-7`).
- **The one rejected spelling is not a stub alternative any more**: `fileURLToPath(new URL('.', import.meta.url))` answers the same directory, but it brings a trailing separator and is refused by the same row, so L1 settled §3's collision in the landed direction — `dirname` beside `join` (`design.md` §3, §8 `ASM-L3-2`).
- **Nothing else in the file's text is this unit's**: the CJS comment standing where the binding stood is replaced, not annotated, and `:459`/`:466` are not edited (`interface.md` §4, ASM-L2-5; D-18).

## 5. Names L4 must not mint

| Where | Never added | Cite |
|---|---|---|
| `src/main/main.ts` | any binding beside `here`: no `root`, no `appDir`, no `bundleDir`, no second directory derivation, no `process.cwd()` or literal path, no `existsSync` probe of the artifacts, and no `new URL('.', import.meta.url)` respelling | `design.md` §3 `ASM-L3-2`, §4 `G-1`; D-18 |
| `package.json` | any new `scripts` key, any new dependency, any source-map or minify flag, any third build command, and any `--define:import.meta.url` (the arm that bakes a machine path) | `interface.md` §3, §5, P-14; D-14 |
| `dist/main/` | any shim, launcher, second copy of the entry, `.cjs`/`.mjs` alias pair, and any copy of the package's manifest or native addon laid beside the artifact | `persistence.md` §4, §5; `design.md` §4 `G-6`, `G-8` |
| `scripts/` | any edit at all: E-5 is `harness`'s one-name-per-file write | `design.md` §6; `modules.md` §3 |
| `src/main/{preload,standalone,battery-host}.ts`, `src/renderer/**` | any edit: those entry points stay their rows' and byte-identical | `design.md` §4 `G-4`; ASM-L2-6 |

## 6. The commands L4 runs, verbatim

**The one command that must go green** — the layer's own battery, all eight rows, no skip (`design.md` §4; D-14):

```sh
npx vitest run tests/unit/bundle-boot-seam
```

The floor it runs beside, in this order (`brief.md` §6, D-14):

```sh
npm run build
npm run typecheck
npm run typecheck:tests
npx vitest run tests/integration/bundle-boot-seam
```

- **`tests/integration/bundle-boot-seam` is L2's and answers half-green at L4**: `A-1`..`A-3` and `A-4` are expected green once E-1 and E-2 land, and `A-5` goes green only when `harness` lands E-5 — an L4 that cannot make `A-5` green has not failed, an L4 that edits `scripts/` to make it green has (`design.md` §6; `interface.md` §7).
- **`tests/e2e/bundle-boot-seam/` is L1's and needs a `DISPLAY`**: its rows spawn Electron and are not this layer's green (`docs/L1/bundle-boot-seam.md` §6, L1 §9 ASM-1).
