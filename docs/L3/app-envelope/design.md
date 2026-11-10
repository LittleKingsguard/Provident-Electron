# L3 — `app-envelope`: the module design

- **Layer:** L3 · **Module:** `app-envelope` · **Branch:** `strata` (D-6) · **Rev:** 1 — **`F11` IS A DELETION AND ITS CHAIN IS FINISHED IN ONE PASS: the authored pane's `size`/`min`/`max` leave the node AND the two seams that read them leave `gutterSeamExample` with their docblocks and their one private reader — because a props deletion that leaves its dead readers standing over a node that no longer carries them is the half-done version, and `D-169` is the precedent for finishing it. The census this rev takes then finds TWO MORE members of the same exported surface with no consumer (`applyPreview`, `moveTypeOf`), and they leave in ONE SEPARABLE hunk (H-4), so the example ends at the SIX members its two consumers actually read — `D-168`'s method (measure, then register, then delete) applied to a surface the audit never measured. `DEFAULT_PANE_SIZE`/`DEFAULT_PANE_BOUNDS` DO NOT MOVE; what moves is their claimed ORIGIN, from present tense to a recorded measurement (`D-46`, `D-126`, `D-129`, `D-117`).**
- **Inputs:** `strata/pending.md` row `1`'s `F11`; `D-126` (the audit, and the finding verbatim); `D-169` (how a deletion with orphans was judged one pass ago), `D-168` (the census taken before a byte moves), `D-129` (the enforcement rule that makes the props a second authority), `D-151` (a closed id domain), `D-155` (`D-139`'s test applied to the act), `D-117` (the pass that took the gesture off the element), `D-46`, `D-41` (sites are named, never offsetted); `docs/L2/app-envelope/interface.md` rev 1 §1–§6.
- **Ceiling:** 150 lines, class max (D-1) · **Status:** structure, the deletion set as hunks, the provenance re-grain and the guardrails — **no new declared name appears in this rev, so no `signatures.md` transcription is owed** (D-45; the module declares 15 exports and this pass adds none).

## 1. The finding, and the set as measured

`F11` says *"`#gutter-pane`'s authored `size`/`min`/`max` read by nothing since `D-117` — a DELETION"* (D-126's audit, `pending.md` row `1`). Measured at this head, member by member, over `src/` **and** `demo/` (`D-168`'s surface, because a deletion performed against a remembered list is the class this corpus keeps finding):

| site | today | reader under `src/`/`demo/` | verdict |
|---|---|---|---|
| `demo-envelope.ts:503` `props.size` | `'100'` | **none** | **DELETED** (H-1) |
| `demo-envelope.ts:503` `props.min` | `'0'` | **none** | **DELETED** (H-1) |
| `demo-envelope.ts:503` `props.max` | `'200'` | **none** | **DELETED** (H-1) |
| `demo-envelope.ts:503` `props.resizable` | `'true'` | `resizableOf` at `renderer.ts:547` and `demo.ts:193` | **STAYS** |
| `demo-envelope.ts:503` `props.id` | `'gutter-pane'` | the node's own id; no seam reads it (`paneIdOf` reads the HANDLE's id) | **STAYS** |
| `gutterSeamExample().startSizeOf` (`:193` decl, `:260` impl) | reads `paneOf(…)`'s `size`, falls back `100` | **none** — `renderer.ts:545` and `demo.ts:182` hand `drag.startSizeOf` | **DELETED** (H-2) |
| `gutterSeamExample().boundsOf` (`:194` decl, `:262` impl) | reads `min`/`max`, falls back `{0,200}` | **none** — `renderer.ts:546` and `demo.ts:188` hand `drag.boundsOf` | **DELETED** (H-2) |
| `numberFrom` (`:229`, private) | the two seams' only parser | its readers are the two rows above and nothing else | **DELETED with them** (H-2, the orphan) |
| `paneOf` (`:237`, private) | `parentElement` | `resizableOf` (`:268`) | **STAYS** |

**THE SEAMS ARE NOT SEPARABLE FROM THE PROPS, AND THAT IS THE DESIGN'S FIRST SETTLEMENT.** `startSizeOf` and `boundsOf` are the props' readers: delete the props and each seam answers its hard-coded fallback `100`/`{0,200}` for every element in the tree, which is `D-129`'s *second authority* — a local default standing beside the shape the store is required to hold (`panes-must-stand` repairs it, `D-117` moved the gesture onto it). So the pair goes with the props, in one hunk, and the pass leaves no reader behind (D-129, D-169).

## 2. What `gutterSeamExample` is after the change

The function is **exported and consumed twice** (`renderer.ts:408`, `demo.ts:102`) and it **stays**; the renderer still takes `seams.sizeFromPointer`, `seams.pointerOf`, `seams.axisOf`, `seams.cursorOf`, `seams.resizableOf`. The return type is inline, not a named export, so no other module depends on it as a type.

| member | readers after this pass | verdict |
|---|---|---|
| `sizeFromPointer` | `renderer.ts:522` | LIVE |
| `axisOf` | `renderer.ts:524`, `demo.ts:176` | LIVE |
| `cursorOf` | `renderer.ts:525` | LIVE |
| `applyCursor` | `demo.ts:180` | LIVE |
| `resizableOf` | `renderer.ts:547`, `demo.ts:193` | LIVE |
| `pointerOf` | `renderer.ts:523`, `demo.ts:175` | LIVE |
| `applyPreview` | **none** — both realms supply their own (`renderer.ts:505`/`:526`, `demo.ts:147`/`:179`) | **DEAD** |
| `moveTypeOf` | **none** — both realms spell `(): unknown => POINTER_TYPES.move` (`renderer.ts:548`, `demo.ts:194`) | **DEAD** |

**TEN → EIGHT BY THE PROPS' DELETION ALONE, AND NO CONSUMER BREAKS**: no reader of either deleted member exists under `src/` or `demo/`, and no site spreads the object (`gutterSeamExample()` occurs at `renderer.ts:408` and `demo.ts:102`, and both sites read it by member). `typecheck` cannot move; `typecheck:tests` moves at ONE row (§5).

**THE CENSUS SAYS THE TWO DELETED SEAMS ARE NOT THE LAST OF THEIR KIND, AND THIS PASS SETTLES IT INSTEAD OF LEAVING A THIRD BEHIND** (H-4): `applyPreview` and `moveTypeOf` answer the two members of the eleven caller seams whose whole content is a DEGENERATE constant, and the affordance already carries both answers — `moveTypeOf?` is optional with the module's own `POINTER_TYPES.move` fallback (`gutter-affordance.ts:257`, `:851`) and `applyPreview` is required and supplied by both realms. `moveTypeOf`'s own docblock (*"so the affordance module registers ITS OWN fallback"*) is the one true statement in the pair; its member is a second spelling of that fallback (D-129's rule one level down, D-70's *"a member that could only ever be one value names nothing"*). **After H-4 the example has ZERO dead members and its docblock's claim can be a measurement instead of a memory** (§3, H-3).

## 3. The provenance re-grain — historical measurement, never present tense

`DEFAULT_PANE_SIZE` and `DEFAULT_PANE_BOUNDS` are the values `panes-must-stand` repairs to and the figures the derivation answers for a pane the family does not name (`view-shape.ts`'s `DEFAULT_PANE_ID`/`paneGeometryIn`); **they do not move**. What moves is the sentence that claims where they come from — after H-1 the node no longer carries the props, so a present-tense *"the authored pane's `props.size`"* is false (D-46: a sentence that says **is** names a site; a sentence that says **was measured** keeps its reading and dates it).

| site | today (quoted) | required after |
|---|---|---|
| `view-shape.ts:18` | *"the authored pane's `props` read `size '100'`, `min '0'`, `max '200'`, and `gutterSeamExample`'s `startSizeOf`/`boundsOf` fall back to the same three figures"* | the same reading, DATED to `D-87`'s measurement and marked as no longer carried by the node, with `F11` named as the pass that removed the props AND the two readers |
| `view-shape.ts:121` | *"**THE MEASURED DEFAULT SIZE** — the authored pane's `props.size`, and the value `panes-must-stand` repairs to."* | *"the figure `D-87` measured off the authored pane's `props.size` — which the node NO LONGER CARRIES (`F11`) — and the value `panes-must-stand` repairs to."* |
| `view-shape.ts:123` | *"**THE MEASURED DEFAULT BOUNDS PAIR** — the authored pane's `props.min`/`props.max`."* | the same two clauses on the bounds pair: measured at `D-87`, not carried by the node since `F11`, repaired to by the declaration |
| `demo-envelope.ts:201` (`attributeOf`'s docblock) | *"so `props: {size: '100', min: '0', …}` lands on the element as the attributes `size="100" min="0" …` and NOT as `data-size="…"`"* | the SAME mechanism claim over a node that still carries props — `props: { resizable: 'true' }` landing as the bare `resizable="true"`, and the handle's `props.axis` → `axis` — so the illustration stops depending on a prop the pane does not carry |
| `demo-envelope.ts:234-236` (`paneOf`'s docblock) | *"the authored geometry carrier (its `props` carry the pre-drag size, the bounds pair and the resizability decision)"* | the pane element whose ONE surviving geometry claim is the RESIZABILITY decision, with the size and pair named as `['panes']`'s since `D-117` and gone from the node at `F11` |
| `demo-envelope.ts:182-186` (the example's header) | *"THIS REPO'S ONE EXAMPLE IMPLEMENTATION OF THE ELEVEN CALLER SEAMS … supplies the pane's own bounds, pre-drag size and resizability"* | the SIX seams its two consumers actually take, measured (§2's table) — **the count is the measurement, not a memory**: `renderer.ts` reads five and `demo.ts` four, six in union |

**The tense rule, one sentence, because it is the whole of `D-46`'s discipline**: every replacement either says **what the file is** (a site) or says **what was measured and when** (a dated reading) — and no replacement claims the node carries what it does not. `D-169` took the same discipline to the two claims it found FALSE: they were replaced by what the tree actually does, never silently reworded (D-46, D-169).

## 4. The hunks L4 lands

**H-1 — the three props.** `src/shared/demo-envelope.ts:503` → `props: { id: 'gutter-pane', resizable: 'true' }`. Nothing else on the node moves: `css.id`, `css.classes`, `style: paneStyle` and the children stay (the card's authored DATA is the UI-authority route, brief §2).

**H-2 — the two dead seams, their docblocks, and the orphan.** Delete `startSizeOf` and `boundsOf` from the DECLARED return type (`:193`/`:194`), from the RETURNED literal (`:260` and `:262-265`) with their docblocks (`:258-259`, `:261`), and delete the private `numberFrom` (`:229-233`), whose only two readers are those members (`D-169`'s orphan class). `attributeOf` (`:208`) STAYS — `axisOf` and `resizableOf` read attributes through it.

**H-3 — the three carriers of the claim in this module's own file.** `:182-186`, `:201` and `:234-236` in `demo-envelope.ts` (§3's table); `paneOf`'s role sentence stays otherwise identical, and the table's other three rows are `view-shape.ts`'s (H-5).

**H-4 — SEPARABLE: the two members with no consumer.** Delete `applyPreview` (`:191` decl, `:251` impl + docblock `:248-250`) and `moveTypeOf` (`:197` decl, `:294` impl + docblock `:292-293`), and the orphan `GUTTER_MOVE_TYPE` (`:120`), whose only reader is `moveTypeOf`. **This hunk is the pass's one discretionary act**: it can be dropped with H-1, H-2, H-3, H-5 and H-6 unmoved, leaving the example at eight with two dead members re-filed. It is taken because `D-168`'s method finds them and `D-129` refuses a second authority for an answer the affordance already gives (§2).

**H-5 — the provenance re-grain, and it is ROUTED AND NOT TAKEN** (`D-3`): `src/shared/view-shape.ts` is **`store-view-record`'s path** (`modules.json:296`), not this module's, so this pass's L4 writes NO byte of it. The three docblocks it owes are §3's table, stated here in the exact form that module's next rev transcribes — the re-grain is a currency act with no assertion behind it, so it reds nothing and cannot hold this pass hostage. **No VALUE moves in it either**: `DEFAULT_PANE_SIZE` stays `100`, `DEFAULT_PANE_BOUNDS` stays `{min: 0, max: 200}`, `DECLARED_PANE_IDS` stays `[DEFAULT_PANE_ID]`, and `paneGeometryIn`/`defaultPaneGeometry` are untouched (D-151's closed domain, D-87's measured default).

**H-6 — the artefacts, mechanically.** `node demo/pane-drag-demo/build.mjs` rebuilds `demo/pane-drag-demo/demo.mjs`, which embeds `gutterSeamExample` (`demo.mjs:1100`, `:1544`): without it `DB-1` reds on the content hash (D-118). No `package.json` key moves and no other source file is touched (D-118's script-key census).

**Order: one commit.** H-2 and H-4 remove declared members from an exported surface that `tests/pane-drag-compliance.test.ts:2559`/`:2561`/`:2567` CALL, so `typecheck:tests` reds until that file's same-edit lands (§5) — the red is the routing, not this pass's breakage (`D-169`'s own wording, `D-3`).

## 5. The rows — re-grain or retire, and who owns each

**`pending.md` NAMES `gutter-ui`'S AUTHORED-PROP ROWS AS THE OWNER, AND THAT OWNER DOES NOT EXIST AT THIS HEAD** — measured, `D-168`'s class again: `tests/gutter-ui.test.ts` reads `src/shared/demo-envelope.ts` in exactly one row (`R-9`, `:1714`–`:1729`), and that row measures the CARD's presence (`gutter-vertical`'s `css.id`/`props.id`), which H-1 does not touch. **No row under `tests/` reads the authored `size`/`min`/`max` at all** (`grep -n "size: '100'"`, `"min: '0'"` and `"max: '200'"` over `tests/` each answer nothing, and the tree's only numeric triple is `crossing.test.ts:220`'s `{size: 100, min: 0, max: 200}`, which compares the CONSTANTS): the props' only readers were the two seams, and no row drove them against the authored node.

| row | file · owner (`modules.json`) | disposition |
|---|---|---|
| **`D-117/LIVE-READ`** (`:2551`, `strata:gates`) | `tests/pane-drag-compliance.test.ts` · `renderer-wiring` (`:127`) | **RE-GRAIN.** Its `seams.startSizeOf`/`seams.boundsOf` control assertions (`:2559`, `:2561`, `:2567`) retire — the members they name are gone — and the property they measured INVERTS into an ABSENCE with a plantable control (`D-169`'s `M-4` form): over `demo-envelope.ts`'s comment-elided code, `startSizeOf:`/`boundsOf:`/`numberFrom(` do not occur, and the detector still fires on the synthetic literal `:2606` already carries. Every composition assertion (`:2560`, `:2562`, `:2568`, `:2569`, `:2573`, `:2584`–`:2599`) and clause (5)'s `seams.*` absence checks (`:2610`–`:2611`) are UNMOVED — they already read the wiring, not the example |
| `:782`, `:2539`–`:2545` (comments) | same file · `renderer-wiring` | **RE-GRAIN the sentence**: *"the authored pane's `props.size`"* → the figure `D-87` measured, which the node no longer carries (`F11`, `D-46`) |
| `client.test.ts:219` | `store-view-record` (`:298`) | **RE-GRAIN the message only**, row KEPT: its subject — `paneSizeOf` answering the measured default — is unmoved, and its message stops claiming a present-tense authored origin |
| `crossing.test.ts:217` (comment) | `store-view-record` (`:297`) | **RE-GRAIN the sentence**, same form; no assertion moves |
| `crossings-live.mjs:152` (comment, a driver) | `tests/e2e/store-crossings/` · `store-tabs-record` (`:285`) | **RE-GRAIN the sentence**, same form — the leg measures the crossings, not the envelope's prose, so its drive is unmoved |
| `DB-3`'s owner list (`demo-bundle.test.ts:69`) | `demo-panes` (`:270`) | **UNMOVED** — it names the FUNCTION, which stays |
| `DB-1` (`demo-bundle.test.ts`) | `demo-panes` | **REDS until H-6 runs**, then green on the content hash (D-118) |
| census/allow-list rows naming the PATH — `census.test.ts:1232`, `gesture-session.test.ts:1361/1540/1848`, `zones.test.ts:2246`, `overlay.test.ts:1216`, `menu-template.test.ts:1435`, `boundary.test.ts:667` | five owners | **UNMOVED**: no export, id, count or path changes — `demo-envelope.ts` exports **15**, `mapRows` reads **21**, `srcTypeScriptFiles` reads **51**, and none of the three moves |
| `docs/L3/renderer-wiring/design.md:108` (*"what it waits on is an `app-envelope` act"*) | that page's L3 | **OWED to that page's next rev** — it says F11 waits, and after this pass it does not (`D-46`, `D-169` (ii)'s precedent) |

**Does the measured constant carry the property alone?** YES, and a row measures THAT: `DEFAULT_PANE_SIZE`/`DEFAULT_PANE_BOUNDS` are what `paneGeometryIn` answers for a pane the family does not name, and `pane-drag-compliance.test.ts:2568`/`:2569`, `client.test.ts:219`/`:240`/`:367`/`:416` and `crossing.test.ts:220` drive exactly that. What they lose is the CONTROL that used the element as the counter-figure — replaced by `D-117/LIVE-READ`'s inverted control (an absence with its plantable control) and by the census row §5 names as OWED.

**ONE INSTRUMENT IS OWED, AND IT IS NAMED RATHER THAN ASSUMED** (`D-169`'s `D-126` lesson, that a deletion whose instrument is left standing is the `D-147` defect again): a census row over `gutterSeamExample`'s returned members asserting that EVERY member has a reader under `src/`/`demo/` — the property that makes a fourth dead member unrepresentable — belongs at `tests/unit/app-envelope/`, which this module does not yet claim in the map. It is OWED to this module's next rev with its L1 map row, and it is **not claimed as landed here** (D-3, `D-169`'s four retirements with nothing in their place).

## 6. Guardrails for L4

- **No replacement read, in any form.** The pass may not teach the example to read the geometry from a `data-size`, a selector, a computed style or the element's rect: the size and pair are `['panes']`'s, and a second read is the `D-129` case the deletion closes (D-129, D-117).
- **`resizableOf` and `paneOf` and `attributeOf` stay**, and `resizable` stays the node's own authored declaration — resizability is NOT a member of the panes family and no family declares one to read (`renderer.ts:543`–`:544`, D-117).
- **No id, class, style or child node moves**: the authored card is UI authority (brief §2), and `GUTTER_AFFORDANCE_ID`/`GUTTER_TARGET_ID`/`GUTTER_STATUS_ID` are read through the graph (`renderer.ts:406`–`:407`).
- **The constants are cited, never re-derived**: if a hunk appears to need `DEFAULT_PANE_SIZE`'s value spelled, the hunk is wrong — the import is the reference (D-151, `view-shape.ts`'s `DECLARED_PANE_IDS`).
- **The floor is four legs plus the two checks**: `npm test`, `typecheck`, `typecheck:tests`, `npm run build`, then `node scripts/strata-marks.mjs check` and `node demo/pane-drag-demo/build.mjs --check` (brief §6, D-118).
- **THREE edits are ROUTED, never taken by this module's L4** (D-3): `tests/pane-drag-compliance.test.ts` is `renderer-wiring`'s and must land in the SAME commit as H-2 or `typecheck:tests` cannot go green (§5); `demo/pane-drag-demo/demo.mjs` is `demo-panes`' path and H-6 is its rebuild command (D-118); and `src/shared/view-shape.ts` is `store-view-record`'s (`modules.json:296`), so this pass's L4 touches NO file in that module's row (H-5).
- **This module's write scope is ONE source file and the map says so**: `src/shared/demo-envelope.ts` (`modules.json:237`), plus nothing — a hunk reaching `src/renderer/`, `src/shared/view-shape.ts`, `tests/` or `demo/` is a routing error and not a scope question (D-3, D-26/D-43).
- **`src/shared/view-shape.ts`'s figures are a RECORDED measurement, and a diff that moves `100`, `{min: 0, max: 200}` or `DECLARED_PANE_IDS` has moved another module's default** — this module states the provenance and never the value (H-5, D-151, D-46).
