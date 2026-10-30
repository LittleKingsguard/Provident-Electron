# L1 — central data management over `provident-storeroom`

- **Layer:** L1 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 4 — rev 4 re-grains six statements and no design: §1's composition site, §2's route predicate, §4's bundle clause, §8's `C-2` tense and its set total, and the cite form beside each, which now names the site instead of the offset (D-41, D-43); rev 3 and behind are read through this one
- **Replaces** rev 3 as last filed (`git show ec76308:docs/L1/central-data-management.md`), rev 2 before it (`git show e103d9d:docs/L1/central-data-management.md`) and rev 1 behind that (`git show 50be1cb:docs/L1/central-data-management.md`); git is the history (D-1, D-2). The four answers are D-11..D-14, and rev 1's `ASM-7` ("no new surface") is refuted by D-11 and survives nowhere in this document (D-11). §5's S-10 and §6's rendered-surface boundary state one ruling, ASM-12, and agree with the tree at this head (D-11, D-12)
- **Status:** LANDED — the map is filed at `strata/modules.json`, the `data` group is the landed surface and the composition site passes the module (§1, §3), while the rendered pane stays owed to a later unit (§5 S-10, §6 ASM-12; D-7, D-11)
- **Inputs:** `strata/brief.md` §5/§6, `strata/decisions.md` D-1..D-14 (D-5, D-7, D-10, D-11, D-12, D-13, D-14
  load-bearing), `strata/platform.md` §4, `strata/modules.md` §3, the tree at this head
- **Ceiling:** 150 lines (class max) — at the ceiling split by owner, never append (D-1, D-2)

## 1. What this unit is

A central data management system over `provident-storeroom`, **landed rather than inert**: `src/main/data/` holds the
module — `surface.ts` the five operations' one answer site, over `store.ts`, `journal.ts`, `mapper.ts` and `args.ts` — the
five `provident.data.*` tools stand in `ALL_TOOLS` in `src/main/mcp-server.ts` and in the built `dist/main/main.mjs` — `package.json`'s
`main` — and the composition passes it in as one options member — `dataSurface: createDataSurface({ profileDir: app.getPath('userData') })`
— on `src/main/main.ts`'s one-line options pass to the server's construction (D-7, D-11, D-41). The module renders no surface and
mints no graph node — that ruling stands (§6, ASM-12; D-11). The app already has a data path it does not call a store —
`<userData>/provident-settings.json`, a `schemaVersion`-stamped projection of `file.*` rows, read at most once **per boot** and never written again and
re-served at each realm's boot hand-off (`docs/L1/settings-carrier-retirement.md §3`). The unit is the join of the two: **one authority for the app's data**, whose
durability is the crossing that already exists and whose agent-facing face is a sixth tool group (D-11). The store
journals and persists on its own on-disk shape, and nothing operator-visible reverses it (D-12, D-13). It is not a package change (D-5).

## 2. The module map (filed in `strata/modules.json` — a row per module, every path claimed once)

`mcp-surface` **30** · `app-shell` 7 · `bundle-boot-seam` 12 · `operator-settings` 12 · `settings-surface` 19 ·
`central-data` **15** *(new)* · `producing-runtime` 17 · `graph-store` 13 · `renderer-wiring` 22 · `module-system` 7 ·
`secure-panels` 7 · `store-rederive` 10 · `interaction` 11 · `panes-layout` 10 · `hosts` 4 · `chrome` 9 ·
`focus-model` 4 · `app-envelope` 7 · `ipc-contract` 8 · `harness` 11 · `demo-panes` 0 (D-7, D-14, D-27).

**Four rows moved, and this unit's census is one of them.** `mcp-surface` 25 → 30: 22 tools + 3 resources + the five `data` tools it registers and gates (D-11). `central-data` 7 → **15** under D-14's convention (the surface a module *exposes or consumes*): 5 tools exposed + 5 bridge routes **declared** (D-14 counts the declaration, and no `data.*` arm answers one — §4) + 5 `provident-storeroom` exports called (`storeCreate`, `read`, `readLiteral`, `write`, `delete`) — `rollback` is out (D-12), `register` has no call site, and the seam's whole 14-member census is a version pin, not a called surface (ASM-5; exception §1). `operator-settings` 5 → 12 and the new `settings-surface` row at 19 arrived with the rebuild and the carrier retirement, not with this unit (D-16, D-17, D-22). The edges this unit turns on: `central-data` ← `app-shell` (the crossing) → `graph-store` (`hydrate(rows)`/`crossing.put(row)`), and `central-data` → `mcp-surface` (the group, registered and gated in `src/main/{mcp-server,security}.ts`). Coverage stands: every `src/**/*.ts`, `scripts/*`, `tests/**` file and `demo/pane-drag-demo/` claimed once, and `tests/e2e/central-data/` — L1's own artifact by write scope — is claimed on this unit's `central-data` row so the map resolves it rather than leaving it unowned (`strata/brief.md` §3; the `central-data` row of `strata/modules.json`; D-10).

## 3. The `data` group — a first-class part of this unit's surface (D-11)

`provident.data.*` is the **sixth** group. Its five tools are the agent's vocabulary for the profile: a refusal is a
receipt carried as a value, never a throw, and absence is answered explicitly (D-11).

| Tool | Drive | What comes back |
|---|---|---|
| `provident.data.read` | one path | the value held at that path, or an explicit absent answer — never an empty success (D-11) |
| `provident.data.write` | exactly one path/value pair (`docs/L2/central-data/interface.md` §1, ASM-L2-1) | one receipt — committed, or refused with a reason word; a refusal leaves the previous bytes intact (D-11, D-12) |
| `provident.data.delete` | one path | one receipt from the same closed vocabulary, carrying whether a row was actually removed (D-11) |
| `provident.data.list` | nothing, or a path prefix | the paths the profile holds, with the count that answered (D-11) |
| `provident.data.journal` | an optional cursor | the committed change sequence since that cursor, read-only — it reverses nothing (D-12) |

**Posture.** OFF by default, exactly like `graph`, `code` and `module`: a disabled group's tools are absent from
`tools/list` rather than present-and-refusing, and `VALID_GROUPS` has **two** live copies — `src/main/security.ts:3,5-50,159`
and, since the rebuild, the second live `VALID_GROUPS` copy in `src/main/operator-settings/index.ts` with the dedupe that reads it (`src/main/security-store.ts` is deleted, D-16;
D-11). Tools only — no `mcp://provident/data/…` resource (ASM-10), so the three resource URIs are unmoved.

**The census move, named (D-11).** `ALL_TOOLS` **22 → 27**; the `RpcMethod` union **22 → 27**; gate groups
**five → six**; `ALL_RESOURCES` **3, unchanged**; the default-grant registered subset **8, unchanged** — the six
`read` tools plus `dispatch` and `focus` — so the default grant stays `['read','dispatch']` and enabling `data` lists
**13**. A count that moves without its row moving is a finding: §8 names every site that pins a moved number.

## 4. The e2e I/O surface, in the app's own vocabulary

Both transports answer every drive: stdio (long-lived, push-capable) and Streamable HTTP on `127.0.0.1:3787` (stateless, token-gated, push a no-op) (`src/main/mcp-server.ts:746-774`).

| Drive | Answer |
|---|---|
| the five `provident.data.*` tools | the §3 column, on both transports; absent from `tools/list` while the group is off |
| `provident.dispatch` (target by `cssId`, `nodeId` or `wire`) | `{results, dirtied, renderedHtml, ssrHtml}` |
| `provident.get_rendered_html` / `get_markdown` / `list_targets` / `get_node_state` | the four landed readings (`src/shared/types.ts:31-91`) |
| resources `mcp://provident/app`, `…/targets`, `…/node/{nodeId}` | the same three readings, gate-mirrored — 3, unmoved |
| any of the above while the exclusion tier is open | a refusal carried as a value: `exclusion-closed` or `tier4-closed`, with the server-authored message |

**The bridge.** `window.provident` (`src/main/preload.ts:42-75`) gains no member. The five data routes enter the
`RpcMethod` union (`src/shared/types.ts:282-286`) as `data.read` … `data.journal` — D-11 names the union as moving —
and their answer site is **in main**, in `central-data`, so no renderer method-switch arm and no `MUTATING_METHODS`
entry is added; that set stays at its seven (ASM-9). **Unlanded at this head, so the answer site is design and not
measurement:** no answer site for the five routes exists — no `data.*` arm in the method switch, no IPC handler in
`src/main/main.ts` — while `dist/renderer/renderer.js` does spell `data`, as the pane roster's `GROUP_LABELS` gate-group
row listing the five data tools: a label, never an answer site (`docs/L1/secure-panels.md` §7 `E-1`; D-15, D-35;
`strata/records/central-data-management-unit.md` §2). The group's posture does not reach them once landed: a route
answers whatever the group's state, since the group governs tool registration, not the bridge's vocabulary (D-11; `docs/L2/central-data/interface.md` §5).

**The profile on disk.** Two *written* names at steady state: `<userData>/provident-operator-settings.json` — the instance's own file, which the
rebuild moved off `provident-security.json` (D-16, D-19) — and `<userData>/provident-profile.json`, the store's own file, whose shape this unit
chooses and whose name L2 fixes (D-13; `docs/L2/central-data/persistence.md` §1). `provident-security.json` and `provident-settings.json` are
**seeds** now: read **at most once per boot** — at each construction whose record address carries nothing — and **never written again**, which is
what makes re-reading them safe and why each arm is import-once-*per boot* rather than a one-time migration; recorded here, never a standing
migration obligation (D-13, D-19, D-22; ASM-11). The crossing keeps its shapes (`store.get`, `store.put`, `store.onFileChanged`), so `hydrate(rows)` and `crossing.put(row)` stay frozen inputs (ASM-6).

## 5. The L1 battery — twelve scenarios at `tests/e2e/central-data/scenarios.test.ts` (goal → expected)

**Authored after the implementation, so it carries no red-first evidence** — the rows below are written against the
documents and the shipped surface, and a red row is a finding against the code or this design, never evidence about
ordering (`docs/L1/security-store-storeroom.md` §8; `strata/examiner.md` §3; D-15).

| # | Goal | Expected |
|---|---|---|
| S-1 | a first-ever profile serves nothing | `provident.data.list` returns no paths; no store file created; `tools/list` = the 8 default names and no `data` tool; both transports answer |
| S-2 | the group is a decision, not a default | `data` off → the five tools are absent, not present-and-refusing; `['read','dispatch','data']` → 13 names, all five answer |
| S-3 | a first write commits through the store | `provident.data.write` → a committed receipt; the store's file carries the declared shape; `read` returns the value; no `.tmp` residue |
| S-4 | the next process re-serves the same rows | identical `read`/`list` answers; identical `census` and node-id vocabulary in `get_rendered_html` |
| S-5 | a malformed row is refused, not swallowed | a refused receipt with a reason word; previous bytes intact; `read` unchanged |
| S-6 | a failing write leaves no tear | a refused receipt at the failing point; previous bytes intact; no `.tmp` |
| S-7 | delete and journal are observable, and nothing reverses | `provident.data.delete` → a receipt; the journal shows the write and the delete in order with a cursor; no tool offers a reversal (D-12) |
| S-8 | volatile keys never persist | no `mem.`/`temp.`/`secure.` spelling in the store's file after a session that used all four tiers |
| S-9 | the package is never modified | the seam census row green (14 members / 11 symbols); `provident-storeroom` imported in exactly two files — the seam and the operator-settings instance's own `storeCreate` import (`src/main/operator-settings/index.ts`, D-16) — and nowhere in `src/main/data/` |
| S-10 | the profile has no rendered surface in this unit | a commit moves no rendered reading: `get_rendered_html` and `get_markdown` are byte-identical across it, `list_targets` mints no node, and the four-member `dispatch` record still answers on the app's own graph (ASM-12; D-11, D-12) |
| S-11 | nothing crosses while the tier is open | the declared refusal as a value on a data tool and on a resource read; no profile write |
| S-12 | two profiles are disjoint; a corrupt file recovers by declaration | disjoint paths; an unparsable or foreign-keyed file answers the cold tier, boots, and the next commit replaces it |

## 6. Boundaries — what this unit does NOT claim

- No change to `provident-storeroom` or `provident-ssr`; a defect or gap is recorded upstream-owned in this unit's record (D-5). Nothing in §§2-5 requires a package change.
- No operator-visible reversal: the journal is read-only observation, and undo/rollback is a later unit with its own provident-authored UI and its own surface decision (D-12).
- No standing migration obligation: the store chooses its own shape, and the seed's import is recorded here rather than inherited as a rule — it runs at each boot whose record address carries nothing, and writes no byte (D-13).
- Not the tier-4 operator-settings rules or their file — `operator-settings` owns them (`modules.md` §1).
- Not the graph store's contract: `GraphStore`, `hydrate(rows)`, `crossing.put(row)` are `graph-store`'s (ASM-6), and `src/renderer/store.ts` stays landed and unwired (ASM-7).
- No rendered surface: this unit renders nothing and adds no graph node, so a commit moves neither `get_rendered_html` nor `get_markdown` (D-11; `docs/L2/central-data/interface.md` §7). The rendered data pane is **owed as a later unit** with its own surface decision, exactly as D-12 leaves undo; when it is built it is provident envelope data driven through the graph, never hand-written DOM, because an element outside the producing graph is invisible to `dispatch`, `get_rendered_html` and `get_markdown` (UI authority, `strata/brief.md` §2; `archive/gate-corpus-2026-10-29/AGENTS.md:21-34`; `src/shared/demo-envelope.ts:1-18`).
- No wholesale test re-layout: only this unit's own rows move, at claim time (D-10).

## 7. Assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-1 | the existing tree is the substrate: `src/{main,renderer,shared}` and the flat suite stay, and this map claims them | re-laying out `src/` and `tests/` before the map exists, which designs the modules from L0 |
| ASM-2 | the gate-era `.mjs` drivers are existing harness code, not re-authored at this gate | a fresh harness before the map, which sets its own scope |
| ASM-3 | the four legs of `brief.md` §6 stay the floor, and layer batteries add to them | replacing the whole collected suite with layer batteries, which discards its coverage (D-10) |
| ASM-4 | every flat `tests/**` row is claimed by exactly one module; the three general drivers, `tests/fixtures/` and `scripts/` sit in `harness` | one `harness` owning all of `tests/`, which leaves D-10 no per-module destination |
| ASM-5 | `central-data`'s N is 15: 5 tools + 5 routes + 5 package exports (D-14; exception §1, which measures `register` off the called set) | the seam's whole 14-member census, which sets the cap off a version-drift pin; or tools only, leaving routes and exports uncounted |
| ASM-6 | `hydrate(rows)` and `crossing.put(row)` are frozen inputs | re-shaping the crossing to the storeroom model, which redesigns another module's contract from L1 |
| ASM-7 | `src/renderer/store.ts` stays landed and unwired | adopting the successor store as the authority, which is a different unit with its own map |
| ASM-8 | the group exposes five tools; `rollback`, constraint mutation and listener registration stay off the agent's surface (D-12) | exposing the store's declared surface wholesale, which makes the agent an operator and pulls the undo unit onto this one's gate |
| ASM-9 | the data routes terminate in main, so the union moves while `MUTATING_METHODS` stays seven | routing data through the renderer's method switch, which makes the producing process the profile's authority |
| ASM-10 | the group is tools only; the three resource URIs are unmoved | a `mcp://provident/data/{path}` mirror, which gate-mirrors the same five readings twice and adds a fourth resource |
| ASM-11 | the store's own file is the only new written name; the settings file is imported at each boot whose record address carries nothing, and never written | two writers, which leaves two authorities and defeats D-7's subject; or abandoning the old bytes outright, which D-13 permits but drops an operator's data silently |
| ASM-12 | this unit's e2e surface declares **no** rendered data view: the five tools answer values and a commit moves no rendered reading (D-11), and the rendered data pane is owed to a later unit that must owe provident-authored UI, as D-12 leaves undo | declaring the view here (rev 2's S-10), which contradicts `interface.md` §7 and the landed `src/main/data/` surface and routes a finding against L2 while writing a second unit's UI into existence with no decision behind it |

## 8. The mark set — named here, re-grained and marked by the owning layer's test writer (D-30, D-31)

D-11's census move and D-13's persisted-set move will redden **40 sites across the three classes' files** — 5 `src/` statements and 35 test or
battery rows, 2 of them **compile-reds** under `typecheck:tests` — and **the class counters overlap, so the set's file total is not their sum**:
the `24` this document carried is withdrawn, not replaced (D-26, D-28). Nothing is edited at this layer; a site is in the set iff it reads one of
the moved numbers, and **the set was not closed by the three predicates**: one site read the moved number and stood in none of them — named as
C-2's last term, whose discharge that row records (D-43). **D-31 governs what becomes of each side**: the 5 `src/` statements are re-grained by
the unit that moves the number, while each scenario row of the 35 is **marked** `// strata:marked-file rework` and replaced whole by the rework
rather than re-pointed — and the three `.mjs` drivers among them are the Electron legs D-30 **retains**, so those are maintained and never marked (D-30, D-31; `strata/marks.json`).

| C | Sites / files | The sites |
|---|---|---|
| C-1 · the tool and route census at 22 | 16 / 14 | `src/main/mcp-server.ts:576-599` (`ALL_TOOLS`); `src/shared/types.ts:259-286` (the union); `tests/engine-pin-version.test.ts:102-132` and `:183-210` (**compile-red**: `Record<RpcMethod, true>`); `tests/focus-tool-register.ts:306,1238,1240`; `tests/focus-tool.test.ts:74` (**compile-red**), `:526,530,623,713,721`; `tests/theme-control.test.ts:1083,1351,1357`; `tests/census.test.ts:2920-2946` (`R-7`); `tests/zones.test.ts:2138-2167` (`R-6`); `tests/gesture-session.test.ts:2825-2848,5047-5060` (`R-6(c)`, `F-9(b)`); `tests/gutter.test.ts:4462-4473`; `tests/gutter-ui.test.ts:2381-2448` (`R-11`); `tests/slot-host.test.ts:3042,3078-3079` (`S-5`); `tests/layout-projection.test.ts:3132-3149` (`R-21`); `tests/secure-exclusion.test.ts:4994,4998` (`I-EX-11`) |
| C-2 · `VALID_GROUPS` at five, or "no sixth group" | 14 / 13 | `src/main/security.ts:3,5-50,159` (`ToolGroup`, `TOOL_GROUPS`, `VALID_GROUPS`) and **the second live `VALID_GROUPS` copy of the group set** in `src/main/operator-settings/index.ts`, with the dedupe that reads it — re-homed by the rebuild after `src/main/security-store.ts` was deleted (D-16), which would silently filter a `data` patch out and which D-11 does not name; recorded here as this unit's sixth place that moves. Rows: `tests/focus-tool.test.ts:428`; `tests/focus-tool-register.ts:1251`; `tests/census.test.ts:2931-2935`; `tests/zones.test.ts:2149-2152`; `tests/gesture-session.test.ts:2836-2839,5049-5050`; `tests/gutter.test.ts:4481-4484`; `tests/gutter-ui.test.ts:2456`; `tests/slot-host.test.ts:3006-3014`; `tests/store-core-graph.test.ts:976-988` (`I-11`); `tests/secure-exclusion.test.ts:1600,1655,5006-5007`; `tests/secure-store-discipline.test.ts:616-623` (the battery's own five-member model — **retired whole with its file** by the sibling unit's E-5, `docs/L1/security-store-storeroom-exception.md` §9, so it no longer resolves and is listed only as a row that read the number). **The uncovered term, and C-2's last — history, and closed:** at this re-grain the pane carried a **third, hand-maintained copy of the group set** in `src/renderer/secure-panels.ts`'s constants block — its `GROUPS` roster and the `GROUP_LABELS` table beside it, with no type link to the gate's `ToolGroup` — so a site read the moved number, stood in no class of this table, and left the pane unable to grant a sixth group; that is what made it C-2's last term, and its repair belonged to the `secure-panels` row's unit, never to this re-grain (D-11, D-22; D-35). **Discharged there, so the term is closed and is no longer a site to repair:** that unit bound the roster to the gate's own type, and what it landed is the pane design's to state — `docs/L1/secure-panels.md` §7 `E-1`, cited and not restated here — while this term names the code by **site**, never by the offsets it carried at re-grain time, which were pre-landing readings of a file that unit edited (D-35, D-41, D-43) |
| C-3 · the persisted set at exactly two named files | 10 / 6 | `docs/L1/settings-carrier-retirement.md §3` (carrier and write site); `tests/store-persist.test.ts:93,1088-1105,1179` (`S-3`), `:1315` (`SC-1`); `tests/store-security.test.ts (the rows as re-grained at `b0d0fe4`)` (`F-7`/`F-10`/`I-2`/`I-3`); `tests/store-compliance-live.mjs:252,254,989` (`SC-B-01`), `:1018` (`SC-B-03`), `:1367` (`SC-B-09`); `tests/secure-exclusion-live.mjs:1525` (`U-6` restart arm); `tests/store-tabs-record-live.mjs:93,122` (the fixture that seeds and removes the settings file); `tests/secure-exclusion.test.ts:4990` (the row's title only) |

**Green by predicate.** The default-grant subset rows (8 names, unmoved — D-11), including `tests/focus-tool.test.ts:726-728` and every value assertion of `['read','dispatch']`; the seven `MUTATING_METHODS` rows (ASM-9); and the no-new-surface negatives that scan a *mechanism module's own* bytes — `tests/census.test.ts:2893`, `tests/zones.test.ts:2108`, `tests/gesture-session.test.ts:2852,5026`, `tests/layout-projection.test.ts:3100,3154`, `tests/container.test.ts:2016` — green because those modules are untouched. The 12 comment sites carrying the old numbers (`tests/secure-exclusion.test.ts:48`, `tests/census.test.ts:819-845`, `tests/zones.test.ts:818-844`, `tests/gesture-session.test.ts:1596-1600`, `tests/gutter.test.ts:2295-2320`, `tests/gutter-ui.test.ts:377-407`, `tests/engine-pin-version.test.ts:16,97`, `tests/module-security-gate.test.ts:7`, `tests/store-persist.test.ts:36`, `tests/fork-store-reads.test.ts:94`, `tests/store-compliance-live.mjs:7,83,241`) redden nothing and are swept only so the corpus carries no stale figure.

**One item of D-11 cannot be executed as written.** Its list names "the group table in the archived contract"; that corpus is D-2's closed, untracked historical record, and D-9's precedent retired obligations whose artifact class the archive move dissolved. The live group table is §3 here and `src/main/security.ts:3,5-50,159`; the archived table stays as the gate-era reading.
