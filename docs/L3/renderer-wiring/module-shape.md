# L3 — `renderer-wiring`: the module shape — the composed pane map, the runtime graph composition, the action install and the stage paint

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 1 — **NEW, THE SPLIT-BY-OWNER L3 BESIDE `design.md` rev 20**: `design.md` is the app-layout unit's four turns and stands at its 150-line ceiling, so the modularity cells (`S-18`/`S-20`) are stated here and neither page is appended to (`D-1`, `D-2`)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **Citations:** sites, never offsets (D-41)
- **Inputs:** `docs/L2/renderer-wiring/module-shape.md` rev 1; `docs/L1/modularity.md` rev 15 §3 `S-18`/`S-20`, §4 `C-9`/`C-10`, §6 `M-2b`/`M-11`/`M-13`/`M-18`/`M-20`; `docs/L3/module-system/design.md` §6 (`action`/`graph`); `docs/L3/producing-runtime/design.md` §2–§4 (the pre-build and the sanctioned `applyCommand` paths); `src/renderer/renderer.ts`, `src/renderer/extensions.ts` (`CapabilityRouter`), `src/renderer/runtime.ts` (`applyCommand`, `nodeState`, `elementForNodeId`); `D-313`, `D-129`, `D-307`, `D-310`
- **Write scope:** `docs/L3/renderer-wiring/` (brief §3); `src/**` is read-only at this layer (D-3)
- **Status:** DESIGN — the four relations are OWED to `src/renderer/renderer.ts` (one `startModuleShape`) and to `CapabilityRouter.actions()`'s closure; the L2/L3 pages state the cells, not the engine's payload shapes (those are L4's)

## 1. The files, and the one new composition function

- **ONE NEW FUNCTION, IN THE APP RENDERER** (`src/renderer/renderer.ts`): `startModuleShape(runtime, router)` reads the router's `contributions()` and `actions()` and performs the three installs below. **No new file, no new route, no new client**: the channel's realm end (`createModuleChannelClient`) is already started here (`S-20`), and its `evaluate` calls this after `registerModule`.
- **THE TWO READERS ARE `module-system`'s**: `CapabilityRouter.contributions()` (`ContributionRecord[]`: module + `GraphContribution`) and `CapabilityRouter.actions()` (each record carries the module, the name AND the closure — the `ActionRecord`'s one added member, L3 `module-system` §4). This page reads them and re-mints neither.

## 2. The composed pane map (`S-18`)

- **THE FIVE SITES ARE A TOTAL FUNCTION OVER `declaredPaneIds()`**: node, head, body, collapse control and grip, one entry per declared pane — the foundation's literal plus every module pane — and a declared pane with no entry is a RED BY NAME (`M-18`, `PM-1`; `C-9`). **No authored literal is the set**; the literal is the foundation's contribution (`D-129`).
- **THE MAP IS READ, NOT WRITTEN, BY THE STAGE**: the paint consumes the map; a module pane's five sites cannot be "missing" because the map's derivation covers the composed set (`S-18`, `S-20`).

## 3. The runtime graph composition

- **A RUNTIME MODULE'S `graph` CONTRIBUTION COMPOSES ON THE LIVE GRAPH, NOT THROUGH THE CONSTRUCTOR'S PRE-BUILD**: the pre-build reader is `producing-runtime`'s boot composition (`docs/L3/producing-runtime/design.md` §2); a module installed at runtime is past the first compile, so its `{parent, nodes}` is applied through the SANCTIONED `applyCommand` paths — `layer-apply` for a layer, `attach` for one subtree — **under the parent it names**, with the command's containment and its mode-honouring re-grain (`C-7`, `S-16`, `D-314`).
- **A CONTRIBUTION WHOSE PARENT DOES NOT RESOLVE IS NAMED AND SKIPPED**, never half-attached: the runtime's command refuses an unresolvable target, and this seat reports it through the client's log rather than inventing a parent (`C-6`'s class).
- **THE ORDER IS THE ROUTER'S ACTIVATION ORDER** (`S-15`): the router's `contributions()` is in the resolver's order, so a later module's parent may be an earlier one's node; this seat applies the list in order and sorts nothing.

## 4. The action install

- **THE CLOSURE RIDES THE NODE'S HANDLER ENTRY, KEYED BY ITS `name`/`event`** (`C-10`, `D-313`): for each `ActionRecord`, the nodes whose authored handler carries that key receive the closure — ONE `state-slice` with `targetProp:'handlers'` per node, or ONE `layer-apply` with `data.handlers` per subtree. **NO source text enters graph data, NO dispatch-time resolver exists and NO `handlers[].ref` seam is claimed** (the withdrawal `D-313` records).
- **A NODE WITH NO MATCHING HANDLER ENTRY IS NOT INVENTED**: an action no contributed node declares is installed nowhere and named in the client's log; the engine's own `handler-body-missing` warn is the upstream half and this side's refusal is the host's (`C-10`).
- **THE TABLE IS HOST-SIDE AND THE CLOSURE IS THE MODULE'S OWN**: the router's `actions()` answers the function the module registered; this seat neither wraps it nor captures a copy beside it (`D-129`'s class).

## 5. The stage paint (`S-20`)

- **THE ACTIVE TAB'S TEMPLATE RESOLVES TO ITS AUTHORED PAGE THROUGH ONE BODY** (`S-19`'s template point): the stage paints the module's content because that content is GRAPH DATA composed into the authored page; the paint itself is the app-layout turn's (`interface.md` rev 13 §2's turn 3), and this page adds no second paint and no second subscriber (`D-129`).
- **THE MODULE'S STAGE CONTENT IS THE SAME KIND OF DATA AS THE FOUNDATION'S** — an authored page, composed by `S-19`'s point, painted by the one body; never a mint, never hand-written DOM, never a post-compile transform (`C-6`, `C-10`).

## 6. Guardrail notes

- **No second composition authority**: a runtime contribution is `applyCommand`'s, never a second constructor reader (`ASM-RW-M1`).
- **No dispatch-time resolver and no graph text**: the closure is installed by name; the engine matches (`D-313`).
- **No second stage paint, no second subscriber, no new route**: the app-layout turn paints; this seat supplies data (`D-129`).
- **No hand-written DOM and no source text in graph data** (brief §2's UI authority).
- **No new store, no package byte, no second map** (`D-3`, `D-5`).

## 7. The battery

- **`tests/integration/renderer-wiring/` carries the cells' integration rows** (the map row owes the path; L1's to file): the composed pane map is total over a module pane; a runtime contribution lands under its parent; an action closure is installed and dispatched by name; an absent parent is named and skipped.
- **The e2e `M-2b`/`M-11`/`M-13` and `M-18` are the seats' own and file at `S-18`/`S-20`** (`L1` §6), unmarked and gating when authored (`D-30`, `D-40`).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "renderer-wiring", "writes": [{"path": "docs/L3/renderer-wiring/module-shape.md", "d": "D-306", "why": "this page, rev 1 NEW: the split-by-owner L3 for the composed pane map, the runtime graph composition, the action install and the stage paint — no `src/**` byte"}]}
```
