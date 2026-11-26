# L2 — `declaration-registry`: the five id domains as data, one composition rule, and five queries

- **Layer:** L2 · **Module:** `declaration-registry` (`strata/modules.json`: `src/shared/registry/` and its two test paths, `endpoints` **10**) · **Unit:** `modularity` (`U2`) · **Branch:** `main` · **Rev:** 2 — **THE TWO REALMS: ONE FUNCTION, TWO CONSTRUCTIONS** — the same foundation literals and the same declarations compose in each realm (main from the executor's activated manifests, the renderer from the app-state rows the crossing already delivers), so the SET is one fact (`D-129`) while each realm's SEQUENCE is its input's registration order and is read only in that realm. **Rev 1 was NEW**: the L1 page states `S-6`'s cell and no L2 page existed under it — the rung the composed domains (`S-7`…`S-10`, `S-18`) read, and the one `D-306` (a) calls the unit's ONE foundation change
- **Inputs:** `docs/L1/modularity.md` rev 21 §3 `S-6`…`S-10`, §4 `C-4`/`C-9`/`C-11`, §6 `M-6`…`M-10`/`M-18`; `docs/L2/module-system/interface.md` §3/§9; `docs/L2/store-view-record/interface.md` §2–§4; `src/shared/view-shape.ts` (`DECLARED_PANE_IDS`, `DECLARED_ZONE_IDS`), `src/shared/types.ts` (`ToolGroup`, `ModuleCapabilities`, `ModuleListEntry`), `src/main/mcp-server.ts` (`ALL_TOOLS` — **rev 2 corrects rev 1's attribution of it to `types.ts`**), `src/renderer/secure-panels.ts` (`GROUP_LABELS`, the overlay's placeholders), `src/renderer/module-client.ts` (the row the renderer composes over); `D-306`, `D-129`, `D-146`, `D-41`
- **Write scope:** `docs/L2/declaration-registry/` and `tests/integration/declaration-registry/` (brief §3); `src/**` is read-only at this layer and neither package is ever modified (`D-3`, `D-5`)
- **Status:** DESIGN — no structure or signature (that is `docs/L3/declaration-registry/`); `S-6` is OWED to L4 and `S-7`…`S-10`/`S-18` are the consuming re-grains, which `OWED-4` fixes to land in the SAME sub-unit as the registry

## 1. What this module is, and the one foundation change it is

- **FIVE ID DOMAINS BECOME DATA** (`C-4`, `S-6`; finding 1): **pane ids, zone ids, tool groups, tool names and the secure overlay's placeholder ids** — each one today a closed literal in the module that consumes it (`view-shape.ts`'s two sets, `types.ts`'s `ToolGroup` and `ALL_TOOLS`, `secure-panels.ts`'s labels and placeholders).
- **IT IS ONE PLACE, NOT FIVE**: one registry, one entry shape, one composition rule and one query per domain, so a module declares once and five consumers read the same answer (`D-129`'s rule at the corpus's grain: one authority per fact).
- **THE FOUNDATION'S OWN SET STAYS A PINNED LITERAL AND IS *READ*, NOT REPLACED** (`C-4`; `D-306` (a)): the literal is the foundation's contribution to the registry, so a gating row can still say **foundation** — *this id was authored by the foundation* — instead of **total**, which would be silent about who declared what.

## 2. The entry, and what a declaration carries

- **ONE ENTRY PER ID**: `{id, source: 'foundation' | 'module', origin?: string}` — `source` says whether the foundation authored it or a module declared it, and `origin` names the declaring module where there is one. Nothing else rides an entry: a domain's *meaning* is its consumer's, never the registry's.
- **THE FOUNDATION'S ENTRIES ARE MINTED FROM THE LITERALS**, in the literal's own order, so the foundation's answer is the literal's answer and the two cannot drift.
- **A MODULE'S ENTRIES COME FROM ITS DECLARATION** — the manifest's own member, read by `module-system`'s activation, handed here as data; this module never reads a manifest. **The renderer's arm is the SAME member on the delivered row** (`ModuleListEntry.capabilities`, §4): one projection serves both, so the two realms cannot spell one declaration two ways.

## 3. The composition rule, stated once

- **THE SET IS THE FOUNDATION'S ∪ THE MODULES'**, in **registration order** — the foundation first, each module's entries in the activation order the resolver fixes (`S-15`, `C-11`) — so a consumer's iteration is the same order on every boot and no caller re-sorts.
- **A DUPLICATE ID IS REFUSED BY NAME**, never merged and never silently dropped: the same id twice from two modules, or a module claiming a foundation id, is `declaration-duplicate` with the id as its subject. **THE FOUNDATION WINS NOTHING BY BEING FIRST**: the refusal is the rule, because a silent override would let a module take a pane the foundation painted.
- **IT ANSWERS ENTRIES, NOT BARE STRINGS**: a consumer that wants the ids asks for the ids (`declaredPaneIds()`), and one that wants to know who declared something asks for the entry — one call per need, no second registry (`D-129`).

## 4. The five queries, and the consumers each one serves

| Domain | Query | Composition accessor | The consumer that re-grains |
|---|---|---|---|
| pane ids | `declaredPaneIds()` | `paneEntries()` | `store-view-record` (`S-7`) and `renderer-wiring`'s census maps (`S-18`) |
| zone ids | `declaredZoneIds()` | `zoneEntries()` | `store-view-record` (`S-7`) |
| tool groups | `declaredGroups()` | `groupEntries()` | `mcp-surface` (`S-8`) and `operator-settings` (`S-9`) |
| tool names | `declaredTools()` | `toolEntries()` | `mcp-surface` (`S-5`, `S-8`'s registry) |
| placeholder ids | `declaredPlaceholders()` | `placeholderEntries()` | `secure-panels` (`S-10`) |

- **A QUERY IS TOTAL OVER THE COMPOSED SET AND NEVER OVER A MODULE'S OWN** (`C-9`): a consumer asks the registry, never the declaration, and a module's `coeffects` name what it consumes rather than what it may assume (`S-22`).
- **NO DOMAIN IS A SECOND STORE**: the registry is read-only after boot, its entries are values, and a module declaring a pane still declares nothing about the pane's geometry, its zone's figure or its group's label — those are their owners' (`C-9`, `S-17`).

### The two realms: one function, two constructions (`ASM-DR-4`)

- **THE CONSTRUCTION IS ONE PURE FUNCTION AND IT IS CALLED ONCE PER REALM THAT HAS A CONSUMER** — never once per app: `createRegistry(foundation, declarations)` takes both inputs, so neither realm's construction reads the other's (`D-129`).
- **MAIN COMPOSES ALL FIVE**: `DECLARED_PANE_IDS`/`DECLARED_ZONE_IDS` (`src/shared/view-shape.ts`), the six group ids, `ALL_TOOLS` (`src/main/mcp-server.ts:749`), and the placeholder domain empty — its consumers are `store-view-record` (`S-7`), `mcp-surface` (`S-8`) and `operator-settings` (`S-9`).
- **THE RENDERER COMPOSES THE FOUR ITS CONSUMERS ASK**: panes and zones (`S-18`, at `U5`), groups (`S-10`) and the placeholders its own envelope authors (`S-10`); it hands the TOOL domain an empty foundation input, because no renderer consumer asks it and `ALL_TOOLS` is main's.
- **THE MODULE HALF IS ONE MEMBER IN BOTH REALMS**: `capabilities` on `src/shared/types.ts`'s manifest is also `ModuleListEntry`'s member, and `src/main/main.ts`'s `IPC_MODULE_GET` answer already carries it (`capabilities: r.capabilities`) into `src/renderer/module-client.ts`. **So no bridge member, no IPC route and no second delivery is added** (`D-18`).
- **THE SET IS THEREFORE ONE FACT AND THE ORDER IS EACH REALM'S OWN**: for a domain both realms compose, the foundation's entries come from ONE literal and the module's from ONE member, so the two sets agree by construction; the sequence is the resolver's in main (`C-11`) and the census's row order in the renderer, and neither realm reads the other's sequence.
- **WHAT THIS RULE OWES AND IS NOT A ROUTE**: the group domain's six foundation ids must be readable AS DATA in the renderer, which today spells them only as `GROUP_LABELS`'s keys — the very roster `S-10` makes a projection. **A roster read as the foundation input would make `S-10`'s set-equality row vacuous**, so the ids' shared home is `S-8`'s to declare and this page states only the constraint it must satisfy.
- **THE ALTERNATIVE REFUSED — main composes and delivers the composed set**: a delivered composition is a derived value on a route whose discipline is a FACT re-read (`D-82`), and it would make the renderer's reading depend on main's boot having finished, where the rows are lawful at their own order today (`D-129`).

## 5. What this page does not own

- **The pane declaration's grammar** is `module-system`'s `S-17` (`C-9`); the **template point** is `store-tabs-record`'s `S-19`; **the placeholder's isolation** is `secure-panels`' `S-21`. This module carries the ENTRY and the SET; those pages carry what an entry means to their reader.
- **The compile-time net that dies** is `S-10`'s: `secure-panels.ts`'s `GROUP_LABELS` is a `Record<ToolGroup, string>`, which cannot survive the group domain becoming data — **the replacement is that step's, and this page only says the set it reads has moved**.
- **No new MCP member, no bridge route and no transport**: the registry is in-process data read at boot (`D-18`).

## 6. The battery

- **`tests/unit/declaration-registry/` is the module's own battery** (the map row's path; L4's to write): the composition's order, a duplicate id refused BY NAME, the foundation's set equal to its literal, and a query total over the composed set.
- **`tests/integration/declaration-registry/`** carries the cross-module reading: two modules declaring into one domain, a module claiming a foundation id, and the consumers asking the registry instead of their literal.
- **AND ONE ROW IS THE TWO REALMS'** (`ASM-DR-4`): a construction over a foundation input and a delivered row set answers the same foundation entries and the same composed set as the main-side construction over the same declarations — the row that makes *one fact, two constructions* a reading rather than a claim. **It is `tests/integration/` and not `e2e/`**: the two constructions are two calls in one process, and the delivery is the row shape, not the bridge.
- **The rows are `M-6`…`M-10`** (L1 §6) and `M-18` is `renderer-wiring`'s composed census; none is a `tests/e2e/` row, because the registry's boundary is a function call and not a process.

## 7. Assumptions, each with its rejected alternative

- **`ASM-DR-1` — one registry over five domains, not five registries.** Alternative rejected: a registry per domain, which would put five composition rules and five duplicate policies beside one another and let them drift (`D-129`; `C-4`'s "five registries" is five DOMAINS in one place).
- **`ASM-DR-2` — the foundation's literal survives as the foundation's CONTRIBUTION.** Alternative rejected: deriving the literal from the registry, which would make the registry author its own input and leave a gating row unable to say *foundation* (`C-4`, `D-306` (a)).
- **`ASM-DR-3` — a duplicate is a refusal, not an override.** Alternative rejected: last-wins, which would let a module take a foundation pane or shadow another module's group silently — a fault no reading could see.
- **`ASM-DR-4` — one function, one construction per realm, and no delivered composition.** Each realm calls the same pure `createRegistry` over the foundation literals it can read and the declarations it holds, so the set is one fact and the sequence is read only where it is made. Alternatives rejected: **main composes and the renderer receives the composed set**, which puts a derived value on a route whose discipline is a fact re-read (`D-82`) and makes the realm's reading depend on main's boot (`D-129`); and **a new bridge member carrying the registry**, which adds a route where an existing answer already carries the carrier (`D-18`).

```boundary-declared
{"unit": "modularity", "layer": "L2", "module": "declaration-registry", "writes": [{"path": "docs/L2/declaration-registry/interface.md", "d": "D-306", "why": "this page, rev 2 — the two realms: one pure construction called once per realm, the domains each realm composes, the one carrier member the existing IPC_MODULE_GET answer already delivers, the group ids' shared home left to S-8 with its constraint, the delivered-composition alternative refused (ASM-DR-4), and the integration row that reads the two constructions; no src byte"}]}
```
