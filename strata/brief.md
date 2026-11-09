# Provident-Electron — strata design brief

- **Layer:** L0 · **Rev:** 3 · **Date:** 2026-10-30 · **Branch:** `strata`, merged into `main` 2026-11-06 (D-6's pointer clause, D-119)
- **Status:** the bootstrap corpus — filed with `decisions.md` D-1..D-7; `ASM-1`..`ASM-3` (§8) stand open in
  `strata/.strata/units/strata-bootstrap.json`'s `assumptions`, and only the user closes one (D-1)
- **Scope:** the strata bootstrap and the archive of the gate corpus; no module design, no code
- **Ceiling:** 150 lines (class max); at the ceiling split by owner — never append (D-1, D-2)

## 0. What this repository is, and why the regime changed

An Electron app whose renderer **is** a `provident-ssr` producing process — the graph is authoritative and the HTML is a view read
off the live DOM and re-emitted on demand (`src/renderer/runtime.ts`'s header comment and its `renderedHtml()` site) — with a
main-process MCP server exposing that graph to agents over stdio or Streamable HTTP (`ALL_TOOLS` in `src/main/mcp-server.ts`).

Two goals stand. It is the **implementation test** of `provident-ssr` and of the sibling `provident-storeroom`: a finding is recorded, never
patched, and the package is never modified (D-5). It is also a **prebuild baseline** for Electron apps on that framework, so the MCP surface, the
gate, both transports and the renderer bridge are deliverable inheritance, while the demo envelope is replaced by whoever forks it.

It ran under the gate workflow from inception. That corpus reached **219** tracked files and **20 MB** — the census `archive.md`
§1 took of the move, cited here and never recounted — and the user's finding is that the accumulation now slows development (D-1).
The strata workflow replaces it with three record kinds, hard per-class ceilings and provenance-or-silence (§1).

## 1. Record kinds, and the rule that keeps them small (D-1, D-2)

| Kind | Owner | Write rule | Ceiling |
|---|---|---|---|
| State | scripts only, never prose (`strata-state`) | overwritten at every transition | 40 lines |
| Design | exactly one layer (§3) | replaced on revision; git is the history | 150 lines |
| Decisions | L0 only (`decisions.md`) | append-only, id'd `D-n`, user- or measurement-sourced (D-47), never reworded | 40 per row |

Provenance attaches to a statement — a bullet, a table row or a paragraph — and a normative line carrying no `D-n` or § is a lint
failure, not a style opinion (D-1). A superseded artifact is replaced, never annotated: in the corpus git is the history, and the
gate corpus's as-filed copy is cited by path under the archive prefix (§7, D-2).

## 2. The app as it stands (measured 2026-10-30, this seat)

| Fact | Value | Cite |
|---|---|---|
| MCP tools registered | **27** in `ALL_TOOLS` | `src/main/mcp-server.ts` (`ALL_TOOLS`) |
| MCP resources | **3** — 2 fixed URIs + 1 template | `src/main/mcp-server.ts`'s `ALL_RESOURCES` (D-41: the site, not an offset) |
| Gate groups | **6** — `read`, `dispatch`, `graph`, `code`, `module`, `data`; default grant `['read','dispatch']` registers **8** tools, **13** with `data` — counted as the `ALL_TOOLS` entries whose `TOOL_GROUPS` row carries the group | `src/main/security.ts` (`TOOL_GROUPS`, `VALID_GROUPS`), `src/main/operator-settings/index.ts`'s second live copy of `VALID_GROUPS` (`security-store.ts` having been deleted — D-16) |
| Transports | Streamable HTTP on `127.0.0.1:3787` (stateless, token-gated, push is a no-op) and stdio (long-lived, push-capable) | `src/main/mcp-server.ts`'s two transport setup sites (D-41: the sites, not offsets) |
| Packages consumed and pinned | `provident-ssr ^0.5.1`, `provident-storeroom ^1.9.3` | `package.json`'s `dependencies` block (D-41: the site, never a range that a new script key moves; the storeroom pin moved for the release whose registration instant reads a returned outcome's `message` and `repair`, and a repair's return's `ok`, as OWN members — so the kernel's two instants agree where `ST-F1` measured them apart, and `D-109` records the discharge) |
| The storeroom seam | **two** imports of the package — the seam (`src/main/storeroom.ts`'s `STOREROOM_DECLARED_SURFACE`, a declared census of `14` members / `13` symbols) and the operator-settings instance (`src/main/operator-settings/index.ts`'s import-once construction, D-16); the central store writes its own `<userData>/provident-profile.json` | `src/main/storeroom.ts`, `src/main/operator-settings/index.ts`, `docs/L2/central-data/persistence.md` §1 |
| UI authority | every element outside the Electron shell's own chrome is provident data driven through the graph, never hand-written DOM; one rendered outside it is invisible to `dispatch`, `get_rendered_html` and `get_markdown` | `src/shared/demo-envelope.ts`'s data-not-DOM construction and the §2 charter (`archive/gate-corpus-2026-10-29/AGENTS.md:22-34`) |
| View record families | **4** — `['panes']` and `['theme']` (`file`), `['zones']` (`mem`) and `['drag']` (`temp`), the last **declared and UNPAIRED** because no invariant holds a gesture transient and a repair's subject would be "no drag has started" (`D-145`); the appearance family's resolution is a CONSTRAINT REPAIR's product and its tier is `file` because preferences are durable (D-87, D-91, D-97, D-98); the `['focus']` family that stood here is DELETED WHOLE (`D-142`, `D-143`) | `src/main/view-record/index.ts`'s four address constants, `viewConstraintDeclarations` and `viewDeclaredRoots`, read against `src/main/main.ts`'s one construction (D-41: the sites) |
| Source files | **51** tracked `src/**/*.ts` files — what `pins` counts, re-taken at `D-143` (this row carried `50`, the `D-117` head's; the file's history below still explains it), `/^src\/.*\.ts$/` over `git ls-files`; no `.d.ts` and no direct child of `src/`, so it is the whole TypeScript source tree (`D-117` deletes `src/main/tier4-state.ts`, so `51 → 50` and no other file moves; measured 2026-11-03: `srcTypeScriptFiles: 52` — `51` at `D-106`'s head plus the renderer's security client `src/renderer/security-client.ts`, the shape the security record's delivery fills; that `51` was `51` at `D-104`'s head — `50` plus the renderer's app-state client `src/renderer/module-client.ts`, the shape the app-state delivery fills — earlier `54` at D-92's head, less the FOUR files `D-93` deletes: the renderer's frozen graph store `src/renderer/store-core-graph.ts`, its declaration-input module `store-graph-references.ts`, and the two store-shaped caller turns `overlay-store.ts` and `theme-store.ts`, each of which had no `src/` importer and no subject once the store's address space went; earlier, `54` was `52` at D-88's head plus the two files D-89's swap adds — `src/renderer/view-client.ts` and `src/shared/view-shape.ts` — and `52` was `49` at D-86's head plus the three `view-record` files D-87 lands; the map's `mapRows` reads **21**: `D-93` removes the `graph-store` row and re-homes its four surviving test paths onto `hosts`, `focus-model` and `renderer-wiring` rather than leaving them unclaimed) | `node scripts/strata-walkthrough.mjs pins` (`srcTypeScriptFiles`, `mapRows`) |

## 3. The layers (D-1, D-3)

| Layer | Responsibility | Owns (writes) | Exit condition |
|---|---|---|---|
| L0 | user interface: brief, decisions, exit walkthrough, reporting | `strata/brief.md`, `decisions.md`, `records/`, the procedures beside the register — `.strata/returns/` is shared: **each layer writes its own envelope** there (`examiner.md` §5) | walkthrough green, then the user accepts |
| L1 | e2e technical design: module map, module interactions, e2e battery | `docs/L1/`, `tests/e2e/`, `strata/modules.json` and `marks.json` (D-30) — the first two created on first write | e2e battery green, adversarially reviewed |
| L2 | integration design: each module's I/O surface and behaviour | `docs/L2/<module>/`, `tests/integration/<module>/` | integration battery green |
| L3 | module design: structure, signatures, pseudocode, guardrail notes | `docs/L3/<module>/` (the design and its `signatures.md` stubs), `tests/unit/<module>/` | unit battery green |
| L4 | line implementation, one shot | source files of its module | unit battery green, or fail early |

A lower layer may read upward artifacts and never writes them (D-3). At and below L3 an agent is provisioned one module and no
sibling's docs or code (`modules.md` §1, D-1).

## 4. The loop (D-1, D-4)

A layer examines the artifact the layer below produces; feedback travels down as narrowed detail on the same artifact id, never as
a re-derivation. L4 receives pseudocode, signatures, guardrail notes and the exact command that must go green; L4 owns no design,
so inability to reach green bubbles to L2. Examiners validate the battery before examining code, diagnose root cause and never
supply a patch. Repeat failure escalates to a rebuild (`rebuild.md`). A lower layer that asks for adjudication is answered and
counted as a failure (D-1).

## 5. Where the loop stands (D-27, D-30)

The app's built main bundle **boots**: `bundle-boot-seam`'s three batteries and the **three Electron legs** are green, and that
unit's stage is state's, never restated here (D-26, D-43). The legs' readings are
§6's and the batteries' the unit's own exit walkthrough record (`strata/records/bundle-boot-seam-walkthrough.md`); `panes` is the
fourth Electron leg and outside those three (D-27, D-37); the four-leg floor is §6's. It was admitted at L1 like any other unit,
filed its map row first, and closed on its own exit walkthrough; every unit's stage and walkthrough streak are state, read from
`strata/.strata/units/*.json` and never restated here (D-26).

The constraint it inherits: nothing it builds may be a `provident-storeroom` or `provident-ssr` change — the arrangement is this
repo's (D-5) — and no new MCP surface is added to prove a boot (D-18). The declared long-term goal stands unchanged: the flat
`tests/**/*.test.ts` suite migrates into `tests/{e2e,integration/<module>,unit/<module>}/` per module, at claim time, never
wholesale ahead of the map (D-10).

## 6. Instruments at this head (all nine rows re-measured 2026-11-03, this seat — one date for the whole table, because a per-row date is nine dates for nine rows and every one of them moved or was re-read this pass; the four Electron legs still read identically to 2026-10-30; **two rows were re-taken at 2026-11-07 for `D-143`'s landing — the node suite and the census — and the seven others stand at 2026-11-03**)

| Instrument | Reading | What it can see |
|---|---|---|
| `npm test` | **no failures** on a clean tree, **and now reproducible from a CLEAN CHECKOUT** — `2,945 passed / 2 skipped` of `2,947` over `141` test files — `85` flat + `56` nested (`D-146` re-took the cell: the drag's seat row is the ONE new file and its FOUR collected rows, `PS-1`…`PS-4`, and nothing else moved — the `54` this cell carried was already one behind its own `140`, which `pins` read as `85` + `55` and now reads as `85` + `56`), `node scripts/strata-walkthrough.mjs pins` (**`148` FEWER than `3,052` of `3,054` over `128` — `D-143` moves it by its own net `−87` (`store-focus.test.ts`'s `90` collected rows retire with their carrier, `crossing.test.ts` `20 → 17`, `client.test.ts` `10 → 9`, `value-arms.test.ts` `15 → 14`, `tests/e2e/focus-retirement/` `+5`, `DC-5`…`DC-7` `+3`) — `D-127` moves it by exactly ITS OWN FOUR collected rows and ONE file, the four of the new gating `tests/renderer-delivery-compliance.test.ts` (`DC-1`…`DC-4`: no record no drive, the record still driving per terminal in both directions, a fault after a record changing nothing, and totality), and by nothing else; `D-126` moves it by exactly ITS OWN FOUR collected rows and ONE file, the four of the new gating `tests/theme-act.test.ts` (the control's authored token, the dispatched click reaching the crossing and returning as a delivery, the `changed` guard surviving the click, and totality with the ids derived from the authored card), and by nothing else; `D-125` moves it by exactly ITS OWN SIX collected rows and NO file, `CD-20`…`CD-23` of `tests/unit/security-store-storeroom/creation-declarations.test.ts` (the intent the open edge preserves and the close edge reads, the close-direction repair under both intents, the second seat's repair honouring the same intent, and the pair's value arm at the second member) and `OV-13`/`OV-14` of `tests/integration/overlay-application.test.ts` (the write-first inversion over comment-elided code, and the render as the delivery's product), and by nothing else; `D-124` moved it by exactly ITS OWN TWO collected rows and NO file, `CD-18` and `CD-19` of `tests/unit/security-store-storeroom/creation-declarations.test.ts` (each seat reading both halves, and one act one repair), and by nothing else; `D-123` moved it by exactly ITS OWN NINE collected rows and ONE file, the FIVE of `tests/unit/security-store-storeroom/creation-declarations.test.ts` (`CD-13`…`CD-17`: the invariant's two edges, the half its repair settles, its one body at both landing addresses — re-grained at `D-124` to two seats and no root — and the pane family's arms) and the FOUR of the new gating `tests/integration/security-store-storeroom/port-follow.test.ts` (the HTTP listener's two directions, the stdio arm's measured absence, the follow's idempotence, and the delivery that drives it), and by nothing else; `D-120` moves it by exactly ITS OWN FOUR collected rows and NO file, `T-8`/`T-9` of `tests/theme-declaration.test.ts` and `OV-11`/`OV-12` of `tests/integration/overlay-application.test.ts`, and by nothing else; `D-118` moves it by exactly ITS OWN FOUR collected rows and ONE file, the four of the new gating `tests/demo-bundle.test.ts` (the demo bundle's staleness row, its fail-able control, the import-not-transcription census and the retired mechanism's absence), and by nothing else; `D-117` moves it by exactly its OWN NET of ONE collected row and NO file: the holder's two rows retired (`FS-T4-09` and `tests/unit/settings-surface/surface.test.ts`'s writer row) against the ONE the pane-drag battery gains, and by nothing else; `D-113` moves it by exactly ITS OWN TEN collected rows and ONE file, the ten of the new gating `tests/integration/overlay-application.test.ts`, and by nothing else; `D-112` moved it by exactly ITS OWN ELEVEN collected rows and ONE file, the eleven of the new gating `tests/integration/central-data/bridge-route.test.ts`, and by nothing else; `D-108` moves it by exactly ITS OWN TWO collected rows and NO file, `VA-14` and `VA-15` of `tests/integration/central-data/value-arms.test.ts`, and by nothing else; `D-107` moved it by ITS OWN TWO collected rows and NO file, `L-7` and `L-8` of `tests/integration/central-data/message-log.test.ts`, and by nothing else; `D-106` moves the figure by exactly ITS OWN FIVE collected rows and ONE file, the five of the new gating `tests/integration/settings-carrier-retirement/security-delivery.test.ts`, and by nothing else; `D-105` moved it by exactly ITS OWN THIRTEEN collected rows and ONE file, the thirteen of the new gating `tests/integration/central-data/value-arms.test.ts`, and by nothing else; `D-104` moves it by exactly ITS OWN FIVE collected rows and ONE file, the five of the new gating `tests/integration/settings-carrier-retirement/app-state-delivery.test.ts`, and by nothing else; `D-103` moved it by its own six and one, the six of the new gating `tests/integration/central-data/message-log.test.ts`, and by nothing else; `D-101` moved it by its own nine and one, the nine of the new gating `tests/integration/central-data/declared-root.test.ts`, and by nothing else; `D-97` moved it by its own thirteen rows and one file — the eleven of `tests/integration/store-view-record/theme-family.test.ts` and the TWO the re-grained `tests/theme-declaration.test.ts` gains, whose six it keeps — and by nothing else; previously `169` fewer at `D-96`'s head, whose own SIX rows and one file were its whole move, and before that `175` fewer, and the whole of the move is `D-93`'s deletion, named term by term and read off the two runs rather than computed: **`169` collected rows went WHOLE with the four files whose subject WAS the frozen graph store** — `tests/store-core-graph.test.ts` `69`, `store-core-graph-integration.test.ts` `48`, `store-persist.test.ts` `35`, `store-security.test.ts` `17`, all four retired by `D-30`'s REPLACED-WHOLE (the `store-core-graph-register.ts` instrument goes with them and is in no count, not being a test file) — **and `6` more are the `store-focus` rows retired BY NAME** (`96 → 90`: `S21-6a`, `S23-2b`, `P-2.6-2`, `R-2`, `M-6`, `X-4`); **every OTHER file keeps its collected count exactly** — `store-modules-bytes` `48`, `store-modules-seams` `62` and `pane-drag-compliance` `129` each retire a row's SUBJECT IN PLACE, under a dated headstone that asserts the deletion, so the row still runs and still bites, and NO row was added anywhere; **the same-commit mark census**: `strata/marks.json` `gating.sites` **`336` in `44` files at `D-161`'s regen** (`181 → 292` in `25 → 39` files (`D-127`'s own four gating rows in ONE new file, so the file count moves `38 → 39`; `D-126`'s own four gating rows in ONE new file, so the file count moved `37 → 38`; `D-125`'s own six gating rows joining TWO already-indexed files, so the file count stands and only the site count moves; `D-124`'s own two gating rows joining (`D-124`'s own two gating rows joining a file already indexed, so the file count stands and only the site count moves; `D-123`'s own nine gating rows, FIVE joining a file already indexed and FOUR in ONE new file; `D-120`'s own four gating rows joining TWO already-indexed files, so `263` in `36` stood and only the site count moved; `D-113`'s own ten gating rows in ONE new file; `D-112`'s own eleven gating rows in ONE new file; `D-108`'s own two gating rows in a file already indexed, so `32` stood for them; `D-107`'s own two in the same file, `D-106`'s own five gating rows in ONE new file, `D-104`'s own five gating rows in ONE new file on top of `D-103`'s six in its own, `D-101`'s nine in its own, `D-97`'s eleven in its own and the TWO the re-grained `tests/theme-declaration.test.ts` gains; it read `227` in `30` at `D-106`'s parent, `214` in `29` at `D-105`'s parent and `209` in `28` at `D-104`'s parent, `203` in `27` at `D-103`'s parent, `194` in `26` at `D-101`'s parent, `176` in `24` at `D-93`'s head and `175` before that), `onNotice.sites` **`2,386` in `105` files at `D-143`'s regen** (`2,476` stood — the instrument's reading at this head, and the `2,479` this sentence carried until `D-124` re-took it was three sites stale, `D-26`/`D-41`), the carve-outs **`9` at `D-143`'s regen**, REGENERATED by `strata-marks.mjs index` and never hand-edited), **and the reading needs no untracked directory any more**: `D-2`'s corpus stays gitignored except the `31` files the suite actually READS — `5,435,793` bytes of its `19,826,527` — which are now TRACKED, so a fresh `git worktree add --detach` of the commit installs from the lock, builds, and reads exactly this figure with nothing copied in (D-100) | pure-module and main-process behaviour under the DOM shim |
| `npm run typecheck` | clean (`0` errors) | `src/**/*.ts` only — never a test file |
| `npm run typecheck:tests` | clean (`0` errors) | the whole `tests/**/*.ts` tree at the unit leg's strictness |
| `npm run build` | OK — five artifacts: `main.mjs`, `preload.cjs`, `standalone.mjs`, `battery-host.mjs`, `renderer.js` | the bundles exist at all |
| `npm run battery` | **green** — `184 checks, 0 failures` | contract-over-stdio, on the battery host: it carries no `provident-storeroom` — `storeCreate` occurs nowhere in the built `dist/main/battery-host.mjs` — and says nothing about the seam |
| `npm run divergence` | **green**, exit 0 — `9 checks, 0 failures` on the pinned N plus 4 extension checks | shim-versus-real-DOM identity, measured on a real renderer |
| `npm run ui` | **green**, exit 0 — `12/12 assertions`, real measurements (`425x22`, `fontSize=16px`) out of a live renderer, the twelfth being `D-113`'s overlay row (the authored app root gains the `inert` attribute with the modal open and loses it when it closes; fragment `4,261 → 4,270 → 4,260` bytes; the attribute is the BOOLEAN `inert=""` in the real renderer where the DOM shim writes `inert="true"`) | the real-DOM measurement leg |
| `npm run panes` | **green**, exit 0 — `7/7` rows on a real renderer | the rendered surface a node row cannot see; **outside the floor** (D-37) |
| `npm run crossings` | **green**, exit 0 — **`28` rows, `78` driver MCP calls (`82` with the `4` envelope-settle polls)** — re-taken at `tier-readout`'s head: `D-142` retired the three `['focus']` rows, so the pre-`D-142` reading was `31`/`84`/`88`, `22` acts dispatched, `21` observation dumps, over five boots on three scratch profiles (D-94, D-95; `D-104` adds the app-state push row, `D-106` the security record's, and `D-112` the row that drives all five `data.*` routes from the renderer realm) | **both `provident-storeroom` crossings over a process boundary, and THREE OF THE VIEW RECORD'S FOUR FAMILIES with them** — the fourth, the appearance family `['theme']` at `file`, is **its own battery's** (`tests/integration/store-view-record/theme-family.test.ts`; D-97, D-98), and this leg's own prose was re-grained to say so (D-99): `['tabs']` at its raw address and through the preload's own routes, the change push read at the app's authored terminals, the secure crossing's three addresses, and `['panes']` (`file`)/`['focus']`/`['zones']` (`mem`) driven across a real process — their existence read out of the app's own profile file, the push read through the bridge, the three routes read back, and the two `mem` families shown re-minted where the `file` one survives — the instrument `D-93`'s two retirements left owed; **outside the floor**, like `panes` (D-37) |

**All four Electron legs are green at this head, and the three-leg return is the `bundle-boot-seam` unit's** (D-27): before it,
one leg was green and two could not reach the app at all, because the main bundle died at module evaluation — nothing in the
four-leg floor could see a bundle **before this unit** (D-27). **A FIFTH live leg stands beside the four from 2026-11-03** — `crossings`, which is an instrument and no part of the floor (D-94).

The layer rule every later claim inherits, **narrowed by the boot unit rather than repealed by it**: a module row's green under
`npm test` is envelope-green, because the suite runs the modules under a layout-less DOM shim. One battery is the exception and
says so in its own header — `tests/e2e/bundle-boot-seam/` spawns the built bundle, opens its stdio and HTTP transports and
constructs its instance, which is exactly what D-27 admitted the unit to prove. So the shim rule still governs every module row,
and a boot green is a process green that is **not** a rendered-surface green (D-1, D-27). **What the floor rests on is D-30's
split:** the module machinery is to be reworked onto the storeroom's constraint/repair and listener engines, so `tests/e2e/**` and
the three Electron legs gate while every integration and unit scenario **that stood when the rework was decided** is marked and
reports **on notice** — applied at every such file, and read off `scripts/strata-marks.mjs` rather than restated here. The mark is
not inherited by a directory: a scenario **authored after** that sweep carries no marker and gates, which is what makes a new
battery evidence (D-40). Until a runner separates the two readings, the table above still measures the whole tree (D-30). **The two
reds this line once named are GONE WITH THEIR FILE**: `tests/store-tabs-record.test.ts` and its register were deleted WHOLE at `D-89`,
and the rows that still measure something were RE-HOMED FIRST, onto `tests/integration/store-view-record/boundary.test.ts` as `B-1`/`B-2`/
`B-3` — gating and unmarked — while the gate-era third, `tests/store-core-graph.test.ts` §5.1, was retired at `D-93` (D-9, D-30).

**One row is by construction, not a red:** the boundary row itself — `S-1` where it stood, `B-1` at `tests/integration/store-view-record/boundary.test.ts` where it stands (the `C-9` edit-set assertion, out of `T2 §4.2 item 9`) — asserts the
worktree against a declared edit set, so it fails while any uncommitted file exists and passes on a clean tree. **Measured 2026-11-02: a
clean head reads `0 failed`; one trivial no-op edit at a path no unit pins reads `2 failed`** — `S-1` and `REG-EXEC` at that date, whose `P-TR-TP-6`(1)
drive embedded the same assertion, and `B-1` alone at this head, the `REG-EXEC` row having gone with the file it named. It measures the loop's own tree, not module machinery, so it is **carved out and keeps gating**
(`strata/marks.json`'s `gates`); a reading worth believing is taken after the commit, never before it (D-30).

## 7. The archive (D-2)

The gate corpus is at `archive/gate-corpus-2026-10-29/`, tree preserved — `archive.md` §1 holds the full inventory: `brief/`, `specs/`,
`decisions.md`, `defects.md`, `defects-history.md`, `next-steps.md`, `pending.md`, `HANDOFF.md`, `FORKER.md`, `decisions/`, `guide/`, `handoffs/`,
`skills/`, and the gate-era `README.md` and `AGENTS.md` whose UI-authority section §2 cites. One prefix mapping makes every citation resolve —
`docs/<x>` → `archive/gate-corpus-2026-10-29/<x>` (`archive.md` §2). Nothing live carries a correction paragraph or history (D-1).

## 8. Open assumptions

- `ASM-1` — the existing tree is adopted as the substrate **for now**: `src/{main,renderer,shared}` and the flat `tests/*.test.ts`
  suite stay where they are, and L1's first act is a module map that either claims those subtrees as modules or declares new ones;
  the suite's migration into the layers' test paths follows the claiming, per module (D-10). Rejected alternative: re-laying out
  `src/` and `tests/` into per-module folders before the map exists, which designs the modules from L0.
- `ASM-2` — the gate-era `.mjs` drivers — the floor's three (`tests/e2e-battery.test.mjs`, `scripts/electron-divergence.mjs`,
  `scripts/electron-ui.mjs`) and the rest, every one of which a `strata/modules.json` row's `paths` claims — enter the L1 module
  map as existing harness code and are not re-authored at bootstrap. Rejected alternative: a fresh harness before the map, which
  sets its own scope.
- `ASM-3` — the four legs of §6 (`test`, `typecheck`, `typecheck:tests`, `build`) stay the floor of verification, and strata's
  per-layer batteries add to them rather than replace them. Rejected alternative: replacing the vitest suite with L1/L2/L3
  batteries, which discards the existing rows — §6 holds the count, this row does not (D-26).

## 9. Non-goals

- Migrating the archived trackers into strata records (D-2).
- Module, interface or class design at L0 (D-1).
- Any change to `provident-ssr`, `provident-storeroom` or `../Preempt-Providence/` (D-5).
- Editing another layer's document, at any layer (D-3).
