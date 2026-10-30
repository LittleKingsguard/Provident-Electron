# L1 — the main bundle's boot seam

- **Layer:** L1 · **Unit:** `bundle-boot-seam` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DECLARED · **Ceiling:** 150 lines (class max) (D-1, D-2)
- **Charter:** D-27 — the unit is admitted first, and the regression that closes it **runs the built bundle and requires a handshake**, never a node-level row that inspects source
- **Inputs:** `strata/brief.md` §1/§3/§6; `strata/decisions.md` D-5, D-7, D-18, D-22, D-27; `strata/modules.md` §3/§4; `strata/platform.md` §3/§4; `strata/examiner.md` §1-§3; `strata/records/security-store-storeroom-unit.md` §2

## 1. What this unit is (D-27)

The app's built main bundle could not be evaluated, so no process it started ever existed — D-27 records the defect this unit is admitted on: `npm run build` emitted `src/main/main.ts` as **CJS**, so esbuild left `var import_meta = {}` and `createRequire(import_meta.url)` on behalf of the ESM-only `provident-storeroom`, whose addon path is derived from `import.meta.url` (`node_modules/provident-storeroom/index.mjs:94-97`) — and the process died at module load with `ERR_INVALID_ARG_VALUE` (D-27).

**This unit owns the arrangement that turns four entry points into four booting bundles, and the battery that proves it; it does not own that arrangement's shape** (D-27, `examiner.md` §3): L2 designs it, L3 details it, and no row below prescribes it.

The seam is reached from the central store (`src/main/data/store.ts:23` → `src/main/storeroom.ts:21`) and from the operator-settings instance (`src/main/operator-settings/index.ts:37`), so it predates the last two units and was owed its own unit rather than a green node row (D-27, `strata/records/security-store-storeroom-unit.md` §2).

## 2. The module map row — filed before this document (D-7, `modules.md` §3)

| Row | Paths | N | Why this claim is the honest one |
|---|---|---|---|
| `bundle-boot-seam` | `package.json`, `tests/e2e/bundle-boot-seam/`, `tests/unit/bundle-boot-seam/`, `tests/integration/bundle-boot-seam/` | **12** | the bundle format is `package.json:10` and the boot target is `package.json:7` — the only two places in the tree where the arrangement lives — and the unit's three test scopes (L1's e2e, L3's unit rows, L2's integration battery) are its own so no path a `--changed` run touches is unclaimed (D-3). The four entry points are other rows' by claim (`main.ts`/`preload.ts` under `app-shell`, `standalone.ts`/`battery-host.ts` under `mcp-surface`), `scripts/` is `harness`'s, and two modules never claim one path (D-7, `modules.md` §3) |

**N = 12, derived from the boot contract's own surface** — four entry points that must boot (`src/main/{main,preload,standalone,battery-host}.ts`), five transports they open (the app's stdio and Streamable HTTP, the standalone's stdio and HTTP, the battery host's stdio) and three handshakes that must complete (the app's MCP `initialize`/`tools/list`/tool call, the siblings' `initialize`/`tools/list`, and the renderer bridge's arrival) (`platform.md` §4, D-27). **The cap is derived by the lint and is never declared here** (`platform.md` §4).

## 3. The constraint it inherits (D-5)

`provident-storeroom` and `provident-ssr` are read-only for every layer, so the fix is this repo's build/boot arrangement and never a package edit; a package-side finding is recorded in the unit that surfaced it and archived with it (D-5, `strata/records/security-store-storeroom-unit.md` §2).

**Two arrangements are visible from here, so the battery is completable** (ASM-1, ASM-2): main emitted as ESM and pointed at by the `main` field (Electron 44's own ESM main, `package.json:7`), or main kept CJS with the package's `import.meta.url` derivation satisfied inside the bundle (`node_modules/provident-storeroom/index.mjs:94-97`; `platform.md` §3). Which one lands is L2's design (D-27, `examiner.md` §3).

## 4. The e2e I/O surface, in the app's own vocabulary (D-27)

The battery reads only what a running process publishes — its stderr trace, its transports' answers and the profile record its own instance writes (`examiner.md` §2):

| Observable | Where the process publishes it |
|---|---|
| the boot trace line `[provident-main] node …` | `src/main/main.ts:80`, the first statement of `main()` |
| the stdio transport's readiness | `src/main/mcp-server.ts:1191` |
| the HTTP transport's readiness, naming its port | `src/main/mcp-server.ts:1202-1203` |
| the HTTP transport's answer set (404 off-route, 405 on GET/DELETE, 401 unauthorised, else `/mcp`) | `src/main/mcp-server.ts:1209-1229` — the four `writeHead` anchors `:1210`, `:1215`, `:1220`, `:1226`, the off-route test at `:1209` opening the span and the token gate's arm closing at `:1229` |
| the renderer bridge's arrival, `renderer ready — MCP backend armed` | `src/main/main.ts:422` |
| the instance's own file in a scratch profile | `src/main/operator-settings/index.ts:119,405`, constructed through `src/main/settings-surface/index.ts:91` |
| the scratch profile the boot is pinned to | `src/main/main.ts:87`; the legs' own `--user-data-dir=` at `scripts/electron-spawn.mjs:362` |

**The MCP client is the battery's only caller** — `initialize`, `tools/list` and one tool call over the transport the bundle opened, exactly as `tests/mcp-stdio-e2e.test.mjs:29-68` drives the standalone bundle (D-27).

## 5. The boot order the battery pins (D-27, D-18)

The landed order is **construction → boot read → gate → `attach` → window → renderer load → `mcp.start()`** — seven steps, one number each (`src/main/main.ts:112,113,119,453,455,467,471`) — and the three lines it publishes on the way are §4's trace, transport-ready and renderer-ready (D-18, `src/main/main.ts:80,422`). The instance's construction precedes the server's, so a boot that reaches the renderer-ready line has already constructed it — which is why §6's B-5 can assert the addon resolved without reading a source file (D-27, `strata/records/security-store-storeroom-unit.md` §2).

## 6. The L1 battery — eight scenarios at `tests/e2e/bundle-boot-seam/` (D-27)

**Authored before the arrangement exists, so it carries red-first evidence by construction**: at the head this document was filed the battery answers red on B-2…B-6 and green on B-1/B-7/B-8, and that reading is the evidence the unit is admitted on (D-27, `examiner.md` §3). Each row names one observable a booting bundle publishes; no row is skipped, conditional or softened (`examiner.md` §2).

| # | Goal | Expected |
|---|---|---|
| B-1 | the build produces the entry the app boots | `npm run build` exits 0 and the `main` field's path exists and is non-empty (`package.json:7,10`) |
| B-2 | the built main bundle survives module evaluation | the spawned bundle publishes `[provident-main] node …` within the bound and no load-error marker at all (`src/main/main.ts:80`) |
| B-3 | the bundle completes a stdio handshake | over the bundle's own stdio, in a scratch profile, `initialize` then `tools/list` answer and the granted set carries `provident.get_rendered_html` (`src/main/mcp-server.ts:1191`) |
| B-4 | it answers a real tool call through that handshake | one `provident.get_rendered_html` call answers content carrying a non-empty `renderedHtml` (`src/main/main.ts:422`, `src/main/mcp-server.ts:1330`) |
| B-5 | the boot order holds and the addon resolved | the trace line precedes both readiness lines, no `fatal:`/load-error marker appears, and the profile holds `provident-operator-settings.json` — the instance constructed (`src/main/main.ts:112,422`; `src/main/operator-settings/index.ts:405`) |
| B-6 | the HTTP transport binds and answers on the configured port | spawned on a scratch port, the readiness line names that port, `/mcp` answers the handshake, and a GET answers 405 (`src/main/mcp-server.ts:1202-1217`) |
| B-7 | the other two bundles still boot | `standalone.mjs` and `battery-host.mjs` each publish a handshake and `tools/list` over stdio — the arrangement may not regress them (`src/main/standalone.ts:53`, `src/main/battery-host.ts:95`) |
| B-8 | an unbootable bundle is a failure with its reason | a corrupted copy — carrying the **basename the `main` field names**, so it is the artifact's own module system and reaches the injected reason instead of a parse error — is reported within the bound carrying that reason, never as a bare timeout with no verdict: the shape `F-2` let this defect live in (`package.json:7`; `strata/records/security-store-storeroom-unit.md` §2, L2 examination return `F-2`) |

**Completable, and the battery says so**: B-2…B-6 are satisfied by either arrangement §3 names, B-7 by any arrangement that leaves the two ESM bundles alone, and B-8 needs no arrangement at all (ASM-1, ASM-3).

**The cap does not bind this file** (D-14, `platform.md` §4): `50 + 10×N` bounds a module's **harness** — driver, fixtures, factories, mock seams — and a product battery is **evidence**, which does not count against it. This battery is evidence, so its 294 lines breach nothing, N = 12 stands and the surface does not shrink to meet a cap that does not apply (D-14, `platform.md` §4).

**The ledger consequence, in the ledger's own terms** (D-26): because vitest collects `tests/**/*.test.ts`, this battery reddens `npm test` until the arrangement lands — five of the seven reds then standing are these rows, and the other two are the long-standing `store-tabs-record` §4.2 items 7 and 8. Red-first evidence is not filed green, and `strata/brief.md` §6 owns the live count (D-14, D-26).

## 7. Boundaries — what this unit does not do (D-27)

- **No package change**: the seam's shape is this repo's, and a gap in `provident-storeroom` is recorded, never patched (D-5).
- **No design of the arrangement**: the format choice, the bundle layout and any build script belong to L2/L3, and this document fixes no signature, file or flag (D-27, `examiner.md` §4).
- **No new MCP surface**: no tool, resource, group, `RpcMethod` member or bridge channel is added, and the boot contract is read through the surfaces that already exist (D-27, D-18).
- **No re-grain of the four legs**: `npm test`, both typechecks and `npm run build` stay the floor and this battery adds to them (`brief.md` §6, D-14); the node suite's green still says nothing about the seam because it never loads a bundle (`brief.md` §6). Its collection by `npm test` and the red set that follows are §6's ledger statement (`vitest.config.ts:5`, `brief.md` §6).

## 8. The declared cross-module write exceptions, one writer each (`modules.md` §1, D-3)

| Id | Path (owning row) | The writes that may move | Writer |
|---|---|---|---|
| **E-1** | `package.json` (`bundle-boot-seam`) | the `build` script's main and preload emissions and the `main` field — the arrangement's whole landing site (`package.json:7,10`) | this unit's **L4**, one shot |
| **E-2** | `src/main/main.ts` (`app-shell`) | only what the arrangement forces in the entry's own text — the two imports at `src/main/main.ts:6-7` and the module-URL derivation at `:29`; no boot step, no channel, no handler and no `:459` `preload` join is edited (D-18) | this unit's **L4**, one shot, under L2's design (`docs/L2/bundle-boot-seam/interface.md` §5; `docs/L3/bundle-boot-seam/signatures.md` §4) |
| **E-3** | `strata/modules.json` (L1's own map) | §2's row, filed with this document (D-7) | **L1** |
| **E-4** | `tests/e2e/bundle-boot-seam/` | §6's battery, this layer's artifact under `brief.md` §3's write scope (D-27) | **L1** |
| **E-5** | `scripts/electron-spawn.mjs`, `scripts/electron-ui.mjs`, `tests/ui-leg-contract.test.ts` (the `harness` row) | **one name per file and nothing else in it**: `scripts/electron-spawn.mjs:75`'s `mainCjs` constant — Electron's app argument, `baseArgs[0]` at `:81` — and `scripts/electron-ui.mjs:131`'s `mainBundle` constant, read by the digest map's `main` entry (`:1158`, the map opened at `:1157`), both moving to the artifact the `main` field names; and the **test row** rather than a script at `tests/ui-leg-contract.test.ts:498`, whose matcher requires that artifact's name over the ui leg's own source (its comment at `:479`) | **`harness`** — its script writer for the two names and its **test** writer for the matcher; never this unit's L4 |

**E-5 is one change with E-1, and A-5 is the row that says so**: L2's battery row A-5 asserts the harness's spawn vector names the artifact the `main` field names, so it is green only where E-1 and E-5 have both landed — which is why the two writes are one change and E-5's writer is `harness`, never this unit's L4 (`docs/L2/bundle-boot-seam/interface.md` §5, §7; D-27). E-5's third site keeps its substance — a digest of the built artifacts is recorded before and after the divergence run — and moves only the name its matcher accepts, so it reddens when the name moves, not before (`docs/L2/bundle-boot-seam/interface.md` §7). **No other name in those three files moves**: the spawn vector, the digest map's four other entries and the leg's other assertions stay byte-identical (`modules.md` §3).

**Not a move, named so no reader looks for one**: `src/main/standalone.ts` and `src/main/battery-host.ts` stay `mcp-surface`'s and byte-identical, and `scripts/` stays `harness`'s — E-5 is `harness` writing inside its own row, and B-7 is the row that catches an arrangement which breaks the two ESM bundles (`modules.md` §3).

## 9. Assumptions, each with the alternative it rejected (`envelope.md` §3)

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-1 | main may become an ESM bundle: the installed Electron 44 boots an ESM main, measured on this seat with a two-line entry, and `package.json:6` already declares the package ESM (`platform.md` §3) | assuming CJS is immovable, which leaves the package's `import.meta.url` derivation unsatisfiable and the battery uncompletable (D-5) |
| ASM-2 | the battery is this layer's own artifact at `tests/e2e/bundle-boot-seam/` (`brief.md` §3) | leaving it to a module test writer at L2/L3, which puts the regression that closes D-27 below the layer that filed the unit |
| ASM-3 | the boot is proven by its published trace and by the instance's own profile file, not by reading `src/**` (D-27) | a node row that greps the build output or the source, which is the reading that let this defect survive three units (`strata/records/security-store-storeroom-unit.md` §2) |
| ASM-4 | every row's wait is bounded and a failure must name its reason before the bound expires (`examiner.md` §2) | trusting the MCP client's own timeout, which is the unbounded wait `F-2` measured as 26 minutes with no verdict (D-27) |
