# L1 — central data management over `provident-storeroom`

- **Layer:** L1 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 1
- **Status:** DESIGN — the module map is filed at `strata/modules.json`; nothing below this layer is admitted (D-7)
- **Inputs resolved:** `strata/brief.md` §5/§6, `strata/decisions.md` D-1..D-10, `strata/platform.md` §4, `strata/modules.md` §3, `AGENTS.md`, `README.md`, the tree at this head
- **Ceiling:** 150 lines (class max) — at the ceiling split by owner, never append (D-1, D-2)

## 1. What this unit is

A central data management system for the app over `provident-storeroom`, which today is *imported and
inert*: the seam constructs a store and hands it back, persisting nothing, exposing nothing, rendering
nothing (`src/main/storeroom.ts:9-21,45-75`; D-7). The app already has a data path it does not call a
store: main holds `<userData>/provident-settings.json`, a `schemaVersion`-stamped projection of
`file.*` rows, written atomically and re-served at each realm's boot hand-off, which the renderer's
graph store mints into its `file` tier (`src/main/main.ts:335-392`; `src/renderer/renderer.ts:1279-1329`).

The unit's subject is the join of those two: **one authority for the app's data, whose durability is
the crossing that already exists**. It is not a package change (D-5) and not an MCP-surface change
(ASM-7).

## 2. The module map (filed in `strata/modules.json`)

| Module | Owns | Interacts with | N |
|---|---|---|---|
| `mcp-surface` | `src/main/{mcp-server,security,battery-host,standalone}.ts` | every module behind a tool; `ipc-contract` | 25 |
| `app-shell` | `src/main/{main,preload,store-channels}.ts` | `mcp-surface`, `operator-settings`, `central-data` | 7 |
| `operator-settings` | `src/main/{security-store,module-store,tier4-state}.ts` | `app-shell`, `mcp-surface`, `secure-panels` | 5 |
| `central-data` *(new)* | `src/main/storeroom.ts`, `src/main/data/` *(created)*, `tests/{unit,integration}/central-data/` *(created)* | `app-shell` (the crossing), `graph-store` (`hydrate`/`crossing`), `mcp-surface` (headless import) | 7 |
| `producing-runtime` | `src/renderer/runtime.ts` | `provident-ssr`, `mcp-surface`, `module-system` | 17 |
| `graph-store` | `src/renderer/{store-core-graph,store-graph-references}.ts` | `renderer-wiring`, `central-data`, `hosts` | 13 |
| `renderer-wiring` | `src/renderer/renderer.ts`, `src/renderer/index.html` | all renderer modules, `app-shell` | 22 |
| `module-system` | `src/renderer/extensions.ts` | `mcp-surface`, `producing-runtime` | 7 |
| `secure-panels` | `src/renderer/secure-panels.ts` | `operator-settings` (bridge), `producing-runtime` | 7 |
| `store-rederive` | `src/renderer/store.ts` — landed, **unwired** | nothing at runtime; its own suite | 10 |
| `interaction` | `src/shared/{gesture-session,gutter,gutter-affordance,relocate}.ts` | `renderer-wiring`, `panes-layout` | 11 |
| `panes-layout` | `src/shared/{zones,census,layout-projection,container}.ts` | `interaction`, `renderer-wiring` | 10 |
| `hosts` | `src/shared/{owned-list-host,slot-host,mount-invariant-guard}.ts` | `panes-layout`, `renderer-wiring` | 4 |
| `chrome` | `src/shared/{theme,overlay,menu-template}.ts`, `src/renderer/{theme,overlay}-store.ts` | `renderer-wiring`, `graph-store` | 9 |
| `focus-model` | `src/shared/focus-model.ts` | `renderer-wiring`, `graph-store` | 4 |
| `app-envelope` | `src/shared/demo-envelope.ts` | `renderer-wiring`, `hosts`, `interaction` | 7 |
| `ipc-contract` | `src/shared/types.ts` | every module that crosses the bridge | 8 |
| `harness` | `src/shared/{dom-shim,path-fork-cycle}.ts`, `scripts/`, `tests/fixtures/`, the three general `.mjs` drivers | every module's battery | 11 |
| `demo-panes` | `demo/pane-drag-demo/` (the fork's live reference, not built) | `graph-store`, `interaction`, `hosts` | 0 |

**19 modules.** Three readings the table depends on, stated because the cap follows from them
(`platform.md` §4): N counts the surface a module **exposes or consumes** — MCP tools and resources,
bridge routes (IPC channels), a package's exports it calls, or a pure module's exported value names;
both sides of one route count, because each side's harness is its own. Every existing `tests/**` file
is claimed by exactly one module today, so D-10's migration has a destination per row; the `.mjs`
live drivers stay with the module whose rows they drive, and only the three general drivers, the
fixtures and `scripts/` sit in `harness` (ASM-5). Landed-but-unwired is marked where it holds: `store.ts`,
the two `*-store` wiring partners in `chrome`, and the twelve `src/shared` mechanisms no running path
imports (`zones`, `census`, `layout-projection`, `container`, `menu-template`, `theme`, `overlay`,
`owned-list-host`, `slot-host`, `mount-invariant-guard`, `relocate`, `path-fork-cycle`).

## 3. The e2e I/O surface, in the app's own vocabulary

**The MCP surface (the agent's side).** Two transports: stdio (long-lived, push-capable) and
Streamable HTTP on `127.0.0.1:3787` (stateless, token-gated, push a no-op)
(`src/main/mcp-server.ts:746-774`). **22 tools** in five groups plus **3 resources**; the default grant
`['read','dispatch']` registers **8 tool names**, and a disabled group's tools are absent from
`tools/list` rather than present-and-refusing. What comes back, in the contract's own words
(`src/shared/types.ts:31-91,143-158`):

| Drive / observation | Answer |
|---|---|
| `provident.dispatch` (target by `cssId`, `nodeId` or `wire`) | `{results, dirtied, renderedHtml, ssrHtml}` |
| `provident.get_rendered_html` | `{renderedHtml, ssrHtml, census}` |
| `provident.get_markdown` | `{markdown, census}` |
| `provident.list_targets` | `{nodes: [{nodeId, cssId?, propsId?, type, state, inTree, handlers}]}` |
| `provident.get_node_state` | `{nodeId, states, census}` |
| resources `mcp://provident/app`, `…/targets`, `…/node/{nodeId}` | the same three readings, gate-mirrored |
| any of the above while the exclusion tier is open | `{status:'refused', reason:'exclusion-closed'\|'tier4-closed', message}` as a **value** |

**The IPC bridge (the renderer's side).** `window.provident` (`src/main/preload.ts:42-75`): `ready`,
`onRequest`, `sendReply`, `notify`; `security.{get,set,setExclusion}`; `module.{get,setDisabled}`;
`store.{get,put,onFileChanged}`. A request is `{id, method, payload}` over one of 22 `RpcMethod`
names and its answer is `{id, ok, value?, error?}` (`src/shared/types.ts:259-294`) — one method per MCP
tool, which is how a drive reaches the producing process.

**The profile store (the operator's side, on disk).** `<userData>/provident-settings.json`: one JSON
object carrying `schemaVersion:'1'` and `file.*`-keyed rows; the crossing projects **only** `file.*`,
refuses a malformed payload as a receipt, and writes `tmp → fsync → rename → dir-fsync`, so a torn file
is impossible and a refusal leaves the previous bytes intact (`src/main/main.ts:335-392`).
`<userData>/provident-security.json` is the operator-settings axis with its tier-4 `entries` map
(`src/main/security-store.ts:56-85`); the legacy `provident-modules.json` is migrated and removed at
boot.

**The unit does not add a fourth surface** (ASM-7): it is reached through these three, and what changes
is *behind* them — the authority that answers the crossing and the hand-off.

## 4. The e2e scenarios the L1 battery must drive (`tests/e2e/`, goal → expected)

| # | Goal | Expected |
|---|---|---|
| S-1 | a first-ever profile serves nothing | `store.get()` → `[]`; no settings file created; `tools/list` = 8 names; both transports answer |
| S-2 | a data write through the app's own path lands | `store.put` → `{status:'committed'}`; the file carries `schemaVersion:'1'` + only `file.*` rows; no `.tmp` residue |
| S-3 | the next process re-serves the same rows | identical `store.get()` rows; identical `census` and node-id vocabulary in `get_rendered_html` |
| S-4 | two profiles never see each other | disjoint rows; neither boot resolves its store under the default `userData` |
| S-5 | a malformed row is refused, not swallowed | `{status:'refused', reason:'malformed-payload'}`; previous bytes intact; `store.get()` unchanged |
| S-6 | a failing write leaves no tear | `{status:'refused', reason:'write-failed'}` at the failing point; previous bytes intact; no `.tmp` |
| S-7 | volatile keys never persist | no `mem.`/`temp.`/`secure.` spelling in the profile file after a session that used all four tiers |
| S-8 | the package is never modified | the seam's census row green (14 members / 11 symbols); `provident-storeroom` imported only in `src/main/storeroom.ts` and `src/main/data/` |
| S-9 | the data view stays agent-visible and drivable | every element carries `data-node-id`; a `dispatch` on one answers the four-member record; the change shows in `get_markdown` |
| S-10 | the operator axis is unmoved | `security.get` carries `exclusion` + `read`; `security.set` carries `write`; `setExclusion` applies |
| S-11 | nothing crosses while the tier is open | the declared refusal as a value on tool **and** resource read; no profile write |
| S-12 | a corrupt profile recovers by declaration | an unparsable or foreign-keyed file answers the cold tier, boots, and the next commit replaces it |

## 5. Boundaries — what this unit does NOT claim

- No change to `provident-storeroom` or `provident-ssr`; a defect or gap is recorded upstream-owned in
  this unit's record (D-5).
- Not the MCP census: 22 tools, 3 resources, 5 groups and the default grant stand (ASM-7).
- Not the tier-4 operator-settings rules or their file — `operator-settings` owns them (`modules.md` §1).
- Not the graph store's contract: `GraphStore`, `hydrate(rows)` and `crossing.put(row)` are `graph-store`'s
  and this unit adapts to them (ASM-9).
- Not `src/renderer/store.ts` (the ten-function successor store): it stays landed and unwired (ASM-10).
- No element outside the producing graph; a data view is envelope data in the app graph, never
  hand-written DOM (`AGENTS.md`; the charter's § "Project-wide constraint").
- No wholesale test re-layout: only this unit's own rows move, at claim time (D-10).

## 6. Assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-4 | N is the surface a module exposes **or** consumes; a pure module's N is its exported value names | count only MCP/HTTP surfaces, which leaves the twelve shared mechanisms at N=0 |
| ASM-5 | every flat `tests/**` row is claimed by one module now; the three general `.mjs` drivers, fixtures and `scripts/` go to `harness` | one `harness` module owning all of `tests/`, which leaves D-10 with no per-module destination |
| ASM-6 | the profile store's durability stays the one `provident-settings.json` crossing — the persisted-file census stays two | a third storeroom-owned file, which the live compliance battery's Family B pins as a violation |
| ASM-7 | the unit adds no MCP tool, resource, group or bridge member; it is observed through the existing surface | a `provident.data.*` family, which moves the 22-tool census, the five-group table and the default grant |
| ASM-8 | `central-data`'s N=7 is provisional: `storeCreate`, `read`, `readLiteral`, `write`, `delete`, `rollback`, `register` — the exports a data authority must call | N=14, the seam's whole declared census, which is a version-drift pin, not a called surface (it would set the cap off the wrong number) |
| ASM-9 | `hydrate(rows)` and `crossing.put(row)` are frozen inputs this unit satisfies | re-shaping the crossing to the storeroom model, which redesigns another module's contract from L1 |
| ASM-10 | `store.ts` stays unwired; the join runs over the wired `graph-store` + the storeroom seam | adopting the successor store as the authority, which is a different unit with its own mapping |

## 7. Open questions — user intent, not answered here (D-1 §8)

- **Q-1** Does the central store get an agent-facing surface of its own (a new MCP tool/group), or does
  it stay behind the crossing and the rendered data (ASM-7's default)?
- **Q-2** Is the store's journal operator-visible at all — undo/rollback of profile data — or is the
  profile store write-through only?
- **Q-3** Must existing `<userData>/provident-settings.json` bytes stay readable and migratable, or may
  the central store choose its own on-disk shape?
- **Q-4** Does the migrated flat suite count against `50 + 10×N` per module? The cap's unit is unstated
  in the corpus, and every declared N feeds it (ASM-4).
