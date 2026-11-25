# L3 — `renderer-wiring`: the module shape — the composed pane map, the runtime graph composition, the action install and the stage paint

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `modularity` · **Branch:** `main` · **Rev:** 2 — **THE COMPOSITION ROUTE IS CORRECTED TO `runtime.contribute` AND THE RE-DRIVEN PAINTS ARE STATED, BESIDE `design.md` rev 20**: `design.md` is the app-layout unit's four turns and stands at its 150-line ceiling, so the modularity cells (`S-18`/`S-20`) are stated here and neither page is appended to (`D-1`, `D-2`)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **Citations:** sites, never offsets (D-41)
- **Inputs:** `docs/L2/renderer-wiring/module-shape.md` rev 1; `docs/L1/modularity.md` rev 15 §3 `S-18`/`S-20`, §4 `C-9`/`C-10`, §6 `M-2b`/`M-11`/`M-13`/`M-18`/`M-20`; `docs/L3/module-system/design.md` §6 (`action`/`graph`); `docs/L3/producing-runtime/design.md` §2/§4 (the pre-build and `contribute`, `L2` rev 3 §4); `src/renderer/renderer.ts`, `src/renderer/extensions.ts` (`CapabilityRouter`), `src/renderer/runtime.ts` (`applyCommand`, `nodeState`, `elementForNodeId`); `D-313`, `D-129`, `D-307`, `D-310`
- **Write scope:** `docs/L3/renderer-wiring/` (brief §3); `src/**` is read-only at this layer (D-3)
- **Status:** LANDED (`startModuleShape`, `composeModuleGraph`, `installModuleActions` in `src/renderer/renderer.ts`; `RW-M1`…`RW-M4` written), EXCEPT the pane cell, which waits on `U2`

## 1. The files, and the one new composition function

- **ONE NEW FUNCTION, IN THE APP RENDERER** (`src/renderer/renderer.ts`): `startModuleShape(runtime, router)` reads the router's `contributions()` and `actions()` and performs the three installs below. **No new file, no new route, no new client**: the channel's realm end (`createModuleChannelClient`) is already started here (`S-20`), and its `evaluate` calls this after `registerModule`.
- **THE INSTALL'S ANSWER IS `{standing, added, skipped, actions}`** — `standing` is the router's cumulative set (named for what it is, `AN-5`), `added`/`skipped` are `contribute`'s, and `actions` counts the handler entries filled. **`contribute` ALSO ANSWERS `changed`**, which the seat reads to decide whether to re-drive the paints — an id-less forest moves the document with nothing to report in `added` (`AN-6`).
- **THE TWO READERS ARE `module-system`'s**: `CapabilityRouter.contributions()` (`ContributionRecord[]`: module + `GraphContribution`) and `CapabilityRouter.actions()` (each record carries the module, the name AND the closure — the `ActionRecord`'s one added member, L3 `module-system` §4). This page reads them and re-mints neither.

## 2. The composed pane map (`S-18`)

- **THE FIVE SITES ARE A TOTAL FUNCTION OVER `declaredPaneIds()`**: node, head, body, collapse control and grip, one entry per declared pane — the foundation's literal plus every module pane — and a declared pane with no entry is a RED BY NAME (`M-18`, `PM-1`; `C-9`). **No authored literal is the set**; the literal is the foundation's contribution (`D-129`).
- **THE MAP IS READ, NOT WRITTEN, BY THE STAGE**: the paint consumes the map; a module pane's five sites cannot be "missing" because the map's derivation covers the composed set (`S-18`, `S-20`).

## 3. The runtime graph composition

- **A RUNTIME MODULE'S `graph` CONTRIBUTION COMPOSES THROUGH `runtime.contribute`, NOT THROUGH THE CONSTRUCTOR'S PRE-BUILD AND NOT THROUGH A SERIALIZER ROUND-TRIP**: the pre-build reader is `producing-runtime`'s boot composition (`docs/L3/producing-runtime/design.md` §2); a module installed at runtime is past the first compile, so this seat calls `runtime.contribute(router.contributions())`, which merges into the runtime's stored AUTHORED document and re-loads it (`design.md` rev 2 §4, `L2` rev 3 §4). **Not `exportLegacy` → `loadEnvelope`**: `src/shared/demo-envelope.ts` authors 30 `handlers:` and `serializeNode` emits none, so that route disarms every graph-driven behaviour (`D-313`). **Not a raw `layer-apply`/`attach`**: the op needs a live `Node`, `decls: AnchorDecl[]` and `nodes: NodeBaseData[]`, a contribution carries authored `LegacyNodeData`.
- **A CONTRIBUTION WHOSE PARENT DOES NOT RESOLVE IS NAMED AND SKIPPED, AND `contribute`'s graph is unchanged for it**, never half-attached: the merge is all-or-nothing per contribution on a clone, and this seat surfaces the runtime's `skipped` names in the client's log rather than inventing a parent (`C-6`'s class).
- **THE ORDER IS THE ROUTER'S ACTIVATION ORDER** (`S-15`): the router's `contributions()` is in the resolver's order, so a later module's parent may be an earlier one's node; this seat passes the list in order and sorts nothing.
- **A CONTRIBUTION ALREADY IN THE TREE IS NOT COMPOSED TWICE, AND THE PENDING SET IS DERIVED FROM THE LIVE GRAPH** — not a seat-local ledger: a contribution whose authored ids all resolve is skipped, so a repeated frame and a later module's frame that carries the earlier contributions again both add nothing (`runtime.listTargets` is the reading). **NO SECOND RECORD OF WHAT WAS COMPOSED** (`D-129`).
- **THE RE-RENDER IS RE-DRIVEN BY THIS SEAT, AFTER `contribute` ANSWERS**: a re-load re-renders the authored page, so the delivery paints (tabs, view, shape) run again in that order; doing nothing here would leave a delivered record unpainted — the cost stated, not hidden (`S-20`). **AND THE DRIVE IS FROM THE READINGS THE REALM ALREADY HOLDS** (`AN-10`): a module installed before the boot's own tab/view reads have landed drives nothing, and its paints land when those reads do — a dependency stated rather than hidden, and never a second read invented here.

## 4. The action install

- **A FRAME WHOSE SOURCE CHANGED REPLACES, AND ITS AUTHORED NODES COME BACK OUT FIRST** (`S-23`, `D-318`): the channel's `evaluate` reads `registerModule`'s answer — `{registered, withdrawn}` — and a replacement's `withdrawn` ids go to `Runtime.withdraw` before `startModuleShape` composes the new contribution, so the old module's nodes are gone from the authored page and the new ones stand. A repeated frame of the SAME text evaluates nothing and the shape does not run. **THE INVERSE IS THE SAME REGISTRATION'S**: the router drops what it recorded, the runtime drops what it merged.
- **ONE MODULE'S FRAME INSTALLS THAT MODULE'S CLOSURES** (`AN-7`): `startModuleShape` is handed the module the frame delivered and `installModuleActions` narrows the cumulative action table to it, so a new module adds its own handlers and re-applies no earlier module's — the redundant write and its re-dirty are gone; a caller that names no module still reads the whole table. **THE ROWS STILL STAND**: every module's closures are installed on the frame that delivered them.
- **THE CLOSURE RIDES THE NODE'S HANDLER ENTRY, KEYED BY ITS `name`/`event`** (`C-10`, `D-313`): for each `ActionRecord`, the nodes whose authored handler carries that key receive the closure — ONE `state-slice` with `targetProp:'handlers'` per node, the engine's declared handler target (`provident-ssr/dist/core/types.d.ts`'s `StateSliceOp`). **NO source text enters graph data, NO dispatch-time resolver exists and NO `handlers[].ref` seam is claimed** (the withdrawal `D-313` records).
- **A NODE WITH NO MATCHING HANDLER ENTRY IS NOT INVENTED**: an action no contributed node declares is installed nowhere and named in the client's log; the engine's own `handler-body-missing` warn is the upstream half and this side's refusal is the host's (`C-10`).
- **THE TABLE IS HOST-SIDE AND THE CLOSURE IS THE MODULE'S OWN**: the router's `actions()` answers the function the module registered; this seat neither wraps it nor captures a copy beside it (`D-129`'s class).

## 5. The stage paint (`S-20`)

- **THE ACTIVE TAB'S TEMPLATE RESOLVES TO ITS AUTHORED PAGE THROUGH ONE BODY** (`S-19`'s template point): the stage paints the module's content because that content is GRAPH DATA composed into the authored page; the paint itself is the app-layout turn's (`interface.md` rev 13 §2's turn 3), and this page adds no second paint and no second subscriber (`D-129`).
- **THE MODULE'S STAGE CONTENT IS THE SAME KIND OF DATA AS THE FOUNDATION'S** — an authored page, composed by `S-19`'s point, painted by the one body; never a mint, never hand-written DOM, never a post-compile transform (`C-6`, `C-10`).

## 6. Guardrail notes

- **No second composition authority and no second merge**: `contribute` is the same merge routine at the second sanctioned instant, never a serializer round-trip and never this seat's own merge (`ASM-RW-M1`, `D-313`).
- **No dispatch-time resolver and no graph text**: the closure is installed by name; the engine matches (`D-313`).
- **No second stage paint, no second subscriber, no new route**: the app-layout turn paints; this seat supplies data (`D-129`).
- **No hand-written DOM and no source text in graph data** (brief §2's UI authority).
- **No new store, no package byte, no second map** (`D-3`, `D-5`).

## 7. The battery

- **`tests/integration/renderer-wiring/` carries the cells' integration rows** (the map row owes the path; L1's to file): the composed pane map is total over a module pane; a runtime contribution lands under its parent; an action closure is installed and dispatched by name; an absent parent is named and skipped.
- **`tests/integration/renderer-wiring/module-shape.test.ts` is WRITTEN (`RW-M1`…`RW-M4`)**: the contribution lands under its parent and the closure dispatches from both the contributed and an authored node carrying the same name; a repeated frame and a later module's full list both add nothing; a parentless contribution is named with the graph untouched; an action no node declares installs nowhere and throws nothing.
- **The e2e `M-2b`/`M-11`/`M-13` are the seats' own and file at `S-20`** (`L1` §6), unmarked and gating when authored (`D-30`, `D-40`); **`M-18` waits on `U2`'s registry** (`S-18`).

```boundary-declared
{"unit": "modularity", "layer": "L3", "module": "renderer-wiring", "writes": [{"path": "docs/L3/renderer-wiring/module-shape.md", "d": "D-320", "why": "this page, rev 6 \u2014 the update's replacement arm: the router's answer, the runtime's `withdraw`, and the shape that follows (`S-23`)"}, {"path": "src/renderer/renderer.ts", "d": "D-320", "why": "the channel `evaluate` reads `{registered, withdrawn}`, withdraws the old authored nodes, then composes the new contribution", "by": "L4"}, {"path": "tests/integration/renderer-wiring/module-shape.test.ts", "d": "D-320", "why": "`RW-M7` \u2014 an update replaces: the router answers the ids, the runtime removes them, the new contribution composes (and `RW-M6` stands)", "by": "L4"}, {"path": "demo/pane-drag-demo/demo.mjs", "d": "D-118", "why": "the demo bundle regenerated against the renderer its @source digests name", "by": "L4"}]}
```
