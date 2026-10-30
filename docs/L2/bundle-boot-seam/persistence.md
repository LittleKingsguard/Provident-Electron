# L2 — `bundle-boot-seam`: the persistence

- **Layer:** L2 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — what this unit's arrangement puts on disk, what it must stop putting on disk, and what a boot writes that is not the arrangement's (D-27)
- **Inputs:** `interface.md` §1-§5/§8 (the arrangement, the probes, E-1/E-2/E-5, the census), `behaviour.md` §1-§7; `docs/L1/bundle-boot-seam.md` §4/§5/§8; D-5, D-14, D-18, D-27; `docs/L2/security-store-storeroom/persistence.md` §1 (the instance's file, whose writer is not this unit)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `P-n` is `interface.md` §2's probe answer for this seat; the package is read and never edited (D-5)

## 1. The artifacts an arrangement produces, and the one it retires

The seam's on-disk product is **the build's emission set** — five artifacts, one per entry point, and no sixth (D-27, L1 §4).

| Artifact | Module system | Produced by | Read at boot by |
|---|---|---|---|
| `dist/main/main.mjs` | **ESM** | the `main.ts` emission of `package.json:10` | the container, through `package.json:7` |
| `dist/main/preload.cjs` | CJS | the `preload.ts` emission of `package.json:10` | the window, through `src/main/main.ts:455` |
| `dist/main/standalone.mjs` | ESM | `package.json:10` | the standalone's own spawn (L1 §6 B-7) |
| `dist/main/battery-host.mjs` | ESM | `package.json:10` | the battery leg's own spawn (L1 §6 B-7) |
| `dist/renderer/renderer.js` + `index.html` | browser ESM | `package.json:10` | `src/main/main.ts:462-463` |

- **`dist/main/main.cjs` is the retired name**, and it retires by being **replaced, never left behind**: `package.json:9`'s `clean` removes `dist` before every build, so the CJS artifact cannot survive a build that no longer emits it (D-1, D-27).
- **`dist` is generated, untracked output** (`.gitignore`), so no artifact of this unit is a repository file and no reading here depends on a committed byte (`brief.md` §1).
- **Nothing else is emitted**: no shim, no launcher, no second copy of the entry under a `.cjs` name, and no source map — the arrangement's whole landing site is two build commands and one field (`interface.md` §5 E-1).

## 2. The emission set, in E-1's own lines

| Line | Today | After E-1 |
|---|---|---|
| `package.json:7` (`main`) | `dist/main/main.cjs` | `dist/main/main.mjs` |
| `package.json:10` (`build`), the main emission | `--format=cjs --outfile=dist/main/main.cjs` | `--format=esm --outfile=dist/main/main.mjs` |
| `package.json:10` (`build`), the preload emission | `--format=cjs --outfile=dist/main/preload.cjs` | **unchanged** (`interface.md` §1, ASM-L2-5) |
| `package.json:10` (`build`), the two sibling emissions | `--format=esm` | **unchanged** (L1 §6 B-7) |
| `package.json:11` (`build:watch`), the main emission | `--format=cjs --outfile=dist/main/main.cjs` | `--format=esm --outfile=dist/main/main.mjs` |

- **`build:watch` moves with `build` or the arrangement is half-landed**: a watch leg that rebuilds a retired artifact while `main` names the new one leaves a tree where `electron .` boots an artifact nothing emits (`interface.md` §5 E-1).
- **No build key is added and no dependency moves**: `package.json:23-34`'s three dependencies and four devDependencies are untouched, and esbuild stays the one bundler (L1 §2, D-14).

## 3. What the boot writes, and what the seam writes

- **The seam writes nothing at runtime**: it is a build arrangement plus one derivation in the entry's own text, so a boot's disk effect is the boot's, unchanged (L1 §5, `docs/L2/security-store-storeroom/persistence.md` §2).
- **The boot's own disk effect is the profile**, and it is not this unit's: the scratch `--user-data-dir=`/`--provident-user-data=` pair pins it (`src/main/main.ts:82-84`, `scripts/electron-spawn.mjs:362`), and the instance's file `provident-operator-settings.json` is written by the store the ESM artifact constructs (`docs/L2/security-store-storeroom/persistence.md` §1, D-19).
- **The artifact carries no machine path**: `import.meta.url` is supplied by the loader, so the emitted bytes are the same on every host — the property the rejected `--define` arm destroyed by baking an absolute literal (P-6, `interface.md` §3).

## 4. What the arrangement must never emit

| Never | Why, measured |
|---|---|
| a `.cjs` body carrying ESM syntax, or an ESM body under a `.cjs` name | the loader decides by name and answers `SyntaxError: Cannot use import statement outside a module` (P-7) |
| a CJS placeholder for `import.meta` (`var import_meta = {}`) | it is what makes the package's derivation receive `undefined` and throw at load (P-1, `dist/main/main.cjs:38479`) |
| a free `__dirname`/`__filename` reference in the ESM entry | ESM provides neither, and the artifact dies at its own line (P-3, `src/main/main.ts:25`) |
| a baked absolute path standing in for `import.meta.url` | the artifact becomes machine-bound (P-6) |
| a `require("provident-storeroom")` of the ESM-only package | the exports map carries no `require` condition, so the boot answers `ERR_PACKAGE_PATH_NOT_EXPORTED` (P-5, `node_modules/provident-storeroom/package.json:27-32`) |
| a second artifact in the boot path (launcher or shim) | it moves load-failure reporting into a shim and adds an async hop (`interface.md` §3, `behaviour.md` §4) |

## 5. The harness's own copy of the name, and the digest it takes

- **The artifact's name is copied in two harness constants** — `scripts/electron-spawn.mjs:75` (`mainCjs`) and `scripts/electron-ui.mjs:131` (`mainBundle`) — and the first is the container's app argument (`:81`), so the copy is load-bearing rather than documentary (`interface.md` §5 E-5).
- **E-5's write is one name per file**, written by `harness`, and its landing is verified by this unit's battery row A-5 rather than trusted (`interface.md` §7).
- **The digest stays a digest of what the leg boots**: `scripts/electron-ui.mjs:1157-1160` covers the app bundle, the battery host, the renderer bundle and its HTML entry, and a rename moves one entry of that map, not its shape (`interface.md` §5 E-5).

## 6. Package findings: none new, and the existing one stays where it was filed (D-5)

- **This unit surfaces no `provident-storeroom` defect**: the package declares an ESM-only entry deliberately — `exports` carries `types` and `import` conditions and no `require` (`node_modules/provident-storeroom/package.json:27-32`) — so P-5's `ERR_PACKAGE_PATH_NOT_EXPORTED` is the declaration working, not a gap (`interface.md` §3).
- **The seam's own record is not re-filed here**: the defect this unit closes is host-side and is recorded with its reproduction in the unit that surfaced it (`strata/records/security-store-storeroom-unit.md` §2, `F-1`/`F-2`; D-5).
- **The package's addon resolution is the package's**: rung one (the scoped platform package) and rung two (the module-relative addon) are declared by the entry, and this unit only requires that **some rung resolves from the emitted artifact's own URL** — the fact A-3 asserts (`interface.md` §7, `node_modules/provident-storeroom/src/entry/artefact.mjs`).

## 7. Assumptions

Every assumption behind these rows is `interface.md` §9's table (`ASM-L2-1`..`ASM-L2-6`), each with the alternative it rejected; no row here depends on one this file does not name (`interface.md` §9, `envelope.md` §3).
