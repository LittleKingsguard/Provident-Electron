# L3 — `bundle-boot-seam`: the structure

- **Layer:** L3 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Artifact:** `l3-boot-seam-design`
- **Status:** DESIGN — structure, pseudocode and guardrail notes for one owner. The declared names are `signatures.md`; the layer's battery is `tests/unit/bundle-boot-seam/`. The arrangement itself is L2's (`docs/L2/bundle-boot-seam/interface.md` §1) and is restated here, never re-decided (D-27, `examiner.md` §3).
- **Inputs:** `docs/L1/bundle-boot-seam.md` §1/§4/§5/§6/§8/§9; `docs/L2/bundle-boot-seam/interface.md` §1/§2/§4/§5/§7/§9, `behaviour.md` §2/§4/§6, `persistence.md` §1/§2/§4/§5; `strata/decisions.md` D-5, D-14, D-18, D-26, D-27, D-28; the `bundle-boot-seam` row of `strata/modules.json` (endpoints **12**) — cited by row and by id, never by line (D-28); `strata/platform.md` §4
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `P-n` is `interface.md` §2's probe answer on this seat; the package and the siblings are read and never edited (D-5)

## 1. The shape: two landing sites and one derivation (D-27, L1 §8)

| Site | Owning row | What lands | Pinned by |
|---|---|---|---|
| `package.json`'s `main` field | `bundle-boot-seam` (E-1) | `dist/main/main.mjs` — the one field that names a boot artifact | `U-1` |
| `package.json`'s `build` and `build:watch`, the `main.ts` emission | `bundle-boot-seam` (E-1) | `--format=esm --outfile=dist/main/main.mjs`, one decision in two keys | `U-2`, `U-3` |
| `src/main/main.ts` `:6` and `:23-25` | `app-shell` (E-2) | one module-scope binding deriving the entry's own directory from its module URL | `U-7`, `U-8` |
| `scripts/electron-spawn.mjs` `:75`, `scripts/electron-ui.mjs` `:131` | `harness` (E-5, §6) | the same artifact's new name, one name per file | L2's `A-5` |

- **Nothing else in the tree is this unit's** (L1 §8): the four entry points stay where they are, `preload.ts`, `standalone.ts` and `battery-host.ts` stay their rows' and byte-identical, `scripts/` stays `harness`'s, and no source file, build key or dependency is added (`interface.md` §5, D-14).
- **The seam is a build arrangement plus one derivation**: it writes nothing at runtime and puts nothing new on disk beyond the emission set it already produced (`persistence.md` §1, §3).

## 2. E-1 — `package.json`: the name, and the arm that emits it

- **The field names the artifact whose NAME is the module system** — `dist/main/main.mjs` (`package.json`'s `main` row; `interface.md` §1, ASM-L2-3). `package.json`'s `type: module` already declares the package ESM (L1 §9 ASM-1).
- **One moving arm, and the four others verbatim**: `clean` removes `dist` first, so the retired artifact cannot survive a build that no longer emits it (`persistence.md` §2).

```
build   (declared order; ONE arm moves, the rest stay byte-identical)
  clean                     · dist removed — replacement, never a second artifact beside the retired one
  main.ts      → --format=esm --outfile=dist/main/main.mjs      ← the ONE moving arm (E-1)
  preload.ts   → --format=cjs --outfile=dist/main/preload.cjs   ← unchanged (ASM-L2-5)
  standalone.ts → --format=esm --outfile=dist/main/standalone.mjs   ← unchanged (ASM-L2-6)
  battery-host.ts → --format=esm --outfile=dist/main/battery-host.mjs ← unchanged
  renderer.ts  → --platform=browser --format=esm --outdir=dist/renderer ; cp index.html ← unchanged
build:watch  (the same decision, its second key)
  the same main.ts emission at --format=esm --outfile=dist/main/main.mjs
  or the watch leg keeps rebuilding a retired name while the field names a file nothing emits (persistence.md §2)
```

- **`--bundle`, `--platform=node` and `--external:electron` are unmoved** in every arm: the container supplies Electron, and the arrangement moves a format and an outfile and nothing else (`behaviour.md` §5, E-1).

## 3. E-2 — the entry's own directory, derived from the module URL (L1 §8 E-2)

- **What replaces `__dirname`**: the module's own file URL, which the loader supplies and `__dirname` could not — `import.meta.url` is the only directory source an ESM entry has (`P-2`, `P-3`).
- **The value it must equal**: the directory holding the emitted entry, `dist/main` — in the exact form `__dirname` held, so `src/main/main.ts:455`'s `join(here, 'preload.cjs')` and `:462`'s `join(here, '..', 'renderer', 'index.html')` compose to the same two targets with no edit to either (`U-8`; `interface.md` §4, ASM-L2-5).

```
module scope (once, where the CJS binding stood):
  here ← dirname(fileURLToPath(import.meta.url))
         = the directory part of this module's own URL, as a filesystem path, no trailing separator
  invariants this value must satisfy, unchanged from the CJS entry:
    join(here, 'preload.cjs')                    = the emitted preload artifact        · :455
    join(here, '..', 'renderer', 'index.html')   = the emitted renderer HTML entry     · :462
imports it is spelled through (three names, two specifiers):
  node:path → { dirname, join }        (dirname is NEW; join stands)
  node:url  → { fileURLToPath }        (NEW)
```

- **The derivation is spelled once and consumed twice**: one `const here`, two `join(here, …)` call sites — so no boot step, channel, handler or gate call can have moved on the way (`U-7`; L1 §5, D-18).
- **Two consequences, both named here rather than discovered at L4**: `interface.md` §4's sentence says `:6` gains `fileURLToPath` beside `join`, but the expression it spells needs `dirname` too, so `node:path`'s binding set grows from `{join}` to `{dirname, join}`; and that growth reddens `tests/unit/settings-carrier-retirement/main-source.test.ts` `MS-2`, a flat row that pins `main.ts`'s `node:path` bindings to `['join']`. §8 `ASM-L3-2` records the one-name alternative that yields the same directory, and §9 asks L1 to settle which spelling stands.

## 4. The guardrails L4 may not violate (D-18, L1 §5/§7/§8)

| id | Guardrail | Cite |
|---|---|---|
| `G-1` | **The boot order does not move** in `src/main/main.ts`: construction `:108` → boot read `:109` → gate `:115` → `attach` `:449` → window `:451` → `loadFile` `:463` → `mcp.start()` `:467`. E-2's edit is module scope only | L1 §5; D-18 |
| `G-2` | **`preload.cjs` stays CJS and `src/main/main.ts`'s `:455`/`:462` keep their joins unchanged**: an ESM preload needs `sandbox: false`, a renderer-security change no boot seam may buy | L1 §1; ASM-L2-5; `U-4`, `U-8` |
| `G-3` | **`build` and `build:watch` are one decision**: no key may emit the retired name after the field moves | `persistence.md` §2; `U-3` |
| `G-4` | **The two sibling bundles and the renderer bundle stay byte-identical**: their arms are the declared text, and a row that reddens them is the arrangement's failure | ASM-L2-6; L1 §6 B-7; `U-5` |
| `G-5` | **The artifact's name carries its module system**: `.mjs` for ESM main, `.cjs` for the CJS preload, and no dual-named copy | ASM-L2-3; `U-1` |
| `G-6` | **Nothing else is emitted**: no shim, no launcher, no source map, no second copy of the entry — the emission set is exactly five artifacts | `persistence.md` §1, §4; `U-6` |
| `G-7` | **No new MCP surface and no package edit**: no tool, resource, group, `RpcMethod` member or bridge channel enters to prove a boot, and `provident-storeroom`/`provident-ssr` are never modified | D-18; D-5; L1 §7 |

- **No row of this unit's battery enumerates a tool census**: the map's `endpoints` figure and `brief.md` §6 own the counts, and a battery that restated one would be the drift D-26 retires (D-26, D-28).

## 5. The failure posture: a reason before the bound, never a hang (L1 §9 ASM-4)

- **A bundle that cannot boot reports its reason and never hangs**: a load failure is published by the loader at parse (`P-3`, `P-7`), and every wait the battery takes is bounded with the bound's expiry itself a failure that prints the trace — the shape `F-2` measured as 26 minutes and no verdict (`behaviour.md` §4; L1 §6 B-8).
- **The name carrying the module system is what makes a mismatch loud**: ESM bytes under a `.cjs` name are a `SyntaxError` at load, not a silently empty module scope (`P-7`; ASM-L2-3). Renaming the artifact to quiet a format mismatch inverts the arrangement.
- **The unit battery inherits the posture at its own grain**: every read of a built artifact is retried inside a bound and fails naming its reason, so a concurrent `npm run clean` cannot answer a bare timeout (`tests/unit/bundle-boot-seam/`).

## 6. E-5 — E-1's declared cross-module dependency, and no more (L2 `ASM-L2-4`)

- **E-1 renames the artifact and two harness constants name it, by path**, because `scripts/electron-spawn.mjs:75`'s `mainCjs` is the container's app argument at `:81` and `scripts/electron-ui.mjs:131`'s `mainBundle` is one entry of the digest map at `:1157-1160` (`interface.md` §5 E-5; `persistence.md` §5).
- **The owning row is `harness`** and the write is one name per file, one writer: this unit's L4 lands E-1 and E-2, and the harness write is that row's own task, verified by L2's `A-5` and by no row of this battery (`modules.md` §3, L1 §8).
- **The two names are the only sites that decide a path** — so L4's E-1 needs no edit under `scripts/`, and a third edit there is an invention, not E-5 (D-3, L1 §8).
- **E-5 as L1 §8 files it is three sites, one writer each**: the two constants and the test row whose matcher accepts the retired name, `tests/ui-leg-contract.test.ts:498` — `harness`'s script writer for the names and its test writer for the matcher, and never this unit's L4 (L1 §8; D-3).
- **Two further spellings exist and are not that write, named so none is mistaken for it**: `scripts/electron-ui.mjs:1075` prints the retired name in a digest line (a display literal, `harness`'s, and not a path the leg reads); and the two unwired gate-era live drivers `tests/store-compliance-live.mjs:264` and `tests/secure-exclusion-live.mjs:187` name the old path while no script key and no vitest collection reaches them — their paths are the `operator-settings` row's, not `harness`'s (`modules.json`'s rows; D-10).

## 7. What this layer reads as the harness budget (D-14, `platform.md` §4)

- **`N = 12` is the map row's own figure** — four entry points that must boot, five transports they open, three handshakes that must complete (`modules.json`'s `bundle-boot-seam` row; L1 §2).
- **The cap is `50 + 10×N` = 170**, and it bounds the module's *harness* — driver, fixtures, factories, mock seams. The lint derives it from the row and prints it; **no document of this layer declares it** (D-14, `platform.md` §4).
- **A product battery is evidence, not harness** (`U-1`..`U-8` included): the unit battery's helpers are the reads a row needs, not a driver the module ships, so the cap is not the budget they answer to (D-14; L1 §6).
- **The battery's own path is unclaimed by the map row**: `bundle-boot-seam`'s row names `package.json` and `tests/e2e/bundle-boot-seam/` only, so `tests/unit/bundle-boot-seam/` must be added by L1 under E-3 — a `--changed` lint run otherwise reports it owned by no module, where the precedent rows name their own `tests/unit/` subtree (`modules.json`'s rows; `modules.md` §3, D-28).

## 8. Assumptions, each with the alternative it rejected (`envelope.md` §3)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L3-1` | the byte-identity pin for the two sibling bundles is **their emission command's text**, because a generated artifact has no committed digest — `dist` is untracked output | recording a digest of generated bytes, which is a measurement in the wrong home and reddens on any legitimate sibling edit (D-26, `persistence.md` §1) |
| `ASM-L3-2` | the derivation is spelled `dirname(fileURLToPath(import.meta.url))`: no trailing separator, so the value is exactly the form `__dirname` held | `fileURLToPath(new URL('.', import.meta.url))`, which adds exactly the one name `interface.md` §4 names, touches no `node:path` binding, and answers the same directory with a trailing separator — the fallback if L1 settles §3's collision in its favour |
| `ASM-L3-3` | the unit battery reads `src/main/main.ts` for its **declaration** (binding set, expression, call sites) and claims no boot the node suite cannot run | an artifact-only battery, which cannot see which names the entry binds and so could not refuse a `process.cwd()` or literal-path derivation |
| `ASM-L3-4` | E-5 is a **declared dependency** of E-1 and never this unit's write | L4 editing `scripts/` to keep the legs booting, which puts two modules on one path (`modules.md` §3, D-3) |
