# L2 — `bundle-boot-seam`: the persistence

- **Layer:** L2 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 3 — rev 2 is read through this one: it states what this unit's arrangement puts on disk, **what it deliberately does not put on disk and must find there at run time**, what it retires, and what a boot writes that is not the arrangement's; rev 3 states that same arrangement **landed** — the emission set this tree holds is the external one and the retired name is gone (**Status:** DESIGN; D-26, D-27)
- **Inputs:** `interface.md` §1-§5/§8 (the arrangement, P-1..P-15, E-1/E-2/E-5, the census), `behaviour.md` §1-§7; `docs/L1/bundle-boot-seam.md` §4/§5/§8; D-5, D-14, D-18, D-26, D-27, D-28; `docs/L2/security-store-storeroom/persistence.md` §1 (the instance's file, whose writer is not this unit)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `P-n` is `interface.md` §2's probe answer for this seat; the package is read and never edited (D-5)

## 1. The artifacts an arrangement produces, the one it retires, and the one it stops carrying

The seam's on-disk product is **the build's emission set** — five artifacts, one per entry point, and no sixth (D-27, L1 §4).

| Artifact | Module system | The package | Produced by | Read at boot by |
|---|---|---|---|---|
| `dist/main/main.mjs` | **ESM** | **imported, not inlined** | the `main.ts` emission of `package.json:10` | the container, through `package.json:7` |
| `dist/main/preload.cjs` | CJS | not imported | the `preload.ts` emission of `package.json:10` | the window, through `src/main/main.ts:459` |
| `dist/main/standalone.mjs` | ESM | not carried | `package.json:10` | the standalone's own spawn (L1 §6 B-7) |
| `dist/main/battery-host.mjs` | ESM | not carried | `package.json:10` | the battery leg's own spawn (L1 §6 B-7) |
| `dist/renderer/renderer.js` + `index.html` | browser ESM | not imported | `package.json:10` | `src/main/main.ts:466-467` |

- **`dist/main/main.cjs` is the retired name**, and it retires by being **replaced, never left behind**: `package.json:9`'s `clean` removes `dist` before every build, so the CJS artifact cannot survive a build that no longer emits it (D-1, D-27).
- **The package's bytes leave the emission set** and this is the only on-disk change rev 2 makes: the inlined emission measured **1,532,476** bytes and the external one **1,345,550**, and what left is `provident-storeroom`'s JavaScript — the native addon was never in either artifact, because the package resolves it from `node_modules` (P-10, P-11, P-15). The artifact on disk at this head is the second figure (`dist/main/main.mjs`, `stat` size), carrying the bare specifier twice and 0 addon-path references.
- **`dist` is generated, untracked output** (`.gitignore`), so no artifact of this unit is a repository file and no reading here depends on a committed byte (`brief.md` §1).
- **Nothing else is emitted**: no shim, no launcher, no second copy of the entry under a `.cjs` name, no copy of the package's manifest, no copied native binary, and no source map (`interface.md` §5 E-1, §4 below).

## 2. The emission set, in E-1's own lines

| Line | Before E-1 | After E-1 | After rev 2 |
|---|---|---|---|
| `package.json:7` (`main`) | `dist/main/main.cjs` | `dist/main/main.mjs` *(landed)* | unchanged |
| `package.json:10` (`build`), the main emission | `--format=cjs --outfile=dist/main/main.cjs` | `--format=esm --outfile=dist/main/main.mjs` *(landed)* | **+ `--external:provident-storeroom`** *(landed)* |
| `package.json:10` (`build`), the preload emission | `--format=cjs` | unchanged | unchanged (`interface.md` §1, ASM-L2-5) |
| `package.json:10` (`build`), the two sibling emissions | `--format=esm` | unchanged | unchanged (L1 §6 B-7, ASM-L2-6) |
| `package.json:11` (`build:watch`), the main emission | as the retired line | `--format=esm --outfile=dist/main/main.mjs` *(landed)* | **+ `--external:provident-storeroom`** *(landed)* |

- **`build:watch` moves with `build`, and both carry the flag**: a watch leg that rebuilt an inlined artifact while `build` emitted an external one would leave a tree whose boot behaviour depends on which command ran last, so the arrangement landed at both sites (`package.json:10`, `:11`; `interface.md` §5 E-1).
- **No build key is added and no dependency moves**: both dependency blocks of the manifest stand as landed — `provident-storeroom` already among `dependencies` (`package.json:26`), every other entry as the head has it (`package.json:23-34`; `platform.md` §3) — and esbuild stays the one bundler (L1 §2, D-14, D-26).

## 3. What the built app must find beside it at run time (rev 2's own new surface)

- **The artifact imports a bare specifier**: the emission carries `import { storeCreate } from "provident-storeroom"` and resolves it from the app's own `node_modules` chain, which answers the module where one stands beside the app and `ERR_MODULE_NOT_FOUND` where none does (P-13, `behaviour.md` §5).
- **The addon is resolved by the package, from the package's location**: rung one is the scoped platform package (`node_modules/provident-storeroom/package.json:43-44`) and rung two is the module-relative `build/Release/storeroom_js_binding.node`; **whichever rung loads, it loads because the package is where it declares itself to be** (P-12, `node_modules/provident-storeroom/src/entry/artefact.mjs`).
- **This is not new debt, and the measurement says so**: the inlined artifact's rung-one `require` also answers `MODULE_NOT_FOUND` with no `node_modules` reachable, so the artifact was never self-contained (P-15).
- **What it costs a fork of this prebuild baseline, stated plainly**: a **packaged** app must ship `node_modules/provident-storeroom` with its platform optional dependency, and the native addon must be loadable from disk — an archive that hides the `.node` file is the declared absent-addon state, not a packaging detail (`ASM-L2-8`). **This baseline ships no packaging config at all** — no builder or forge key, dependency or config file in the tree — so that leg is the forker's, and it is stated here because the seam is what makes the requirement load-bearing (`interface.md` §5).
- **Development and the Electron legs are unaffected**: `npm start`, the harness's spawn and the battery run from the repository root, where `node_modules` stands beside `dist/` (P-11's boot, `scripts/electron-spawn.mjs:362`).

## 4. What the boot writes, and what the seam writes

- **The seam writes nothing at runtime**: it is a build arrangement plus one derivation in the entry's own text, so a boot's disk effect is the boot's, unchanged (L1 §5, `docs/L2/security-store-storeroom/persistence.md` §2).
- **The boot's own disk effect is the profile**, and it is not this unit's to shape: the scratch `--user-data-dir=`/`--provident-user-data=` pair pins it (`src/main/main.ts:87-88`, `scripts/electron-spawn.mjs:362`), and `provident-operator-settings.json` is written by the store the artifact now **imports**, whose shape is that instance's own once imported (`src/main/operator-settings/index.ts:405`; `docs/L2/security-store-storeroom/persistence.md` §1; D-19).
- **That file is this unit's one measured disk fact, and rev 2 exists because of it**: present with the package external, absent with it inlined, with both readiness lines published either way — the profile is the only place the difference is visible (P-10, P-11; `behaviour.md` §4).
- **The artifact carries no machine path**: `import.meta.url` is supplied by the loader, so the emitted bytes are the same on every host — the property the rejected `--define` arm destroyed by baking an absolute literal (P-14, `interface.md` §3).

## 5. What the arrangement must never emit, and must never have to copy

| Never | Why, measured |
|---|---|
| a `.cjs` body carrying ESM syntax, or an ESM body under a `.cjs` name | the loader decides by name and answers `SyntaxError: Cannot use import statement outside a module` (P-7) |
| a CJS placeholder for `import.meta` (`var import_meta = {}`) | it is what makes the package's derivation receive `undefined` and throw at load (P-1) |
| a free `__dirname`/`__filename` reference in the ESM entry | ESM provides neither, and the artifact dies at its own line (P-3) |
| a baked absolute path standing in for `import.meta.url` | the artifact becomes machine-bound, and P-14 shows three occurrences of the building host's checkout in it (P-6, P-14) |
| **a copy of the package's `package.json` and native addon laid beside the artifact** | it would make `dist/` host-arch-specific and fabricate a package directory the package did not make — the second rejected arm of `interface.md` §3 (P-12) |
| a `require("provident-storeroom")` of the ESM-only package | the exports map carries no `require` condition, so the boot answers `ERR_PACKAGE_PATH_NOT_EXPORTED` (P-5) |
| a second artifact in the boot path (launcher or shim) | it moves load-failure reporting into a shim and adds an async hop (`interface.md` §3, `behaviour.md` §4) |
| **an inlined copy of the package's bytes** | its module-relative context relocates into `dist/main/`, so the version read and the addon path both miss and the instance refuses — silently, with the boot green (P-10, P-12) |

## 6. The harness's own copy of the name, and the digest it takes

- **The artifact's name is copied in two harness constants and required again by one test matcher** — `scripts/electron-spawn.mjs:75` (`mainCjs`) and `scripts/electron-ui.mjs:131` (`mainBundle`), plus `tests/ui-leg-contract.test.ts:498`, whose matcher reads the ui leg's own source — and the first constant is the container's app argument (`:81`), so the copy is load-bearing rather than documentary (E-5's three sites, `interface.md` §5).
- **E-5 was three sites and all three landed, one name per file**: both constants' *values* spell `main.mjs` and the matcher now requires `main.mjs`, with no path decided by any fourth line — the retired name survives in `scripts/electron-ui.mjs` only as a printed digest label (`:1075`) and a doc comment (`:1152`), neither of which decides a path or a digest target and both of which are `harness`'s to clean, not this layer's (D-3). The landing is verified by this unit's battery row A-5 rather than trusted, and A-5 is **green at this head** (`interface.md` §5 E-5, §7).
- **The digest stays a digest of what the leg boots**: `scripts/electron-ui.mjs:1157-1163`'s map covers the app bundle, the battery host, the renderer bundle and its HTML entry, and the sibling's manifest, and a rename moved one entry of that map, not its shape (E-5).

## 7. Package findings: none new, and the existing one stays where it was filed (D-5)

- **This unit surfaces no `provident-storeroom` defect**: the package declares an ESM-only entry deliberately — `exports` carries `types` and `import` and no `require` (`node_modules/provident-storeroom/package.json:27-31`) — so P-5's `ERR_PACKAGE_PATH_NOT_EXPORTED` is the declaration working, and P-12's mismatch arm is the declaration of *where the package lives* working (`interface.md` §3).
- **The relocation P-10 measured is host-side, not package-side**: the package's derivation is correct at its own location by its own contract, and what was wrong was an artifact that moved the package's bytes without moving its directory — this repo's build arm (`strata/records/security-store-storeroom-unit.md` §2, `F-1`/`F-2`; D-5).
- **The seam's own record is not re-filed here**: the defect this unit closes is host-side and is recorded with its reproduction in the unit that surfaced it (`strata/records/security-store-storeroom-unit.md` §2, D-5).

## 8. Assumptions

Every assumption behind these rows is `interface.md` §9's table (`ASM-L2-1`..`ASM-L2-8`), each with the alternative it rejected; no row here depends on one this file does not name (`interface.md` §9, `envelope.md` §3).
