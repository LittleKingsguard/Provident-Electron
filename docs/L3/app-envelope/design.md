# L3 — `app-envelope`: the module design

- **Layer:** L3 · **Module:** `app-envelope` · **Branch:** `strata` (D-6) · **Rev:** 2 — **`F11`'S CHAIN LANDED AT `D-171`, AND THIS REV IS THE RE-GRAIN OF WHAT REV 1 COULD ONLY STATE AS OWED: `H-1`…`H-6` all landed with `H-4` TAKEN, so `#gutter-pane` declares `{ id, resizable }`, `gutterSeamExample` reads SIX members with ZERO dead, the census row rev 1 named as OWED is `tests/unit/app-envelope/live-seams.test.ts` — unmarked and gating, `AE-1`/`AE-2`/`AE-3` — and the `view-shape.ts` docblock re-grain rev 1 called ROUTED AND NOT TAKEN is IN THE TREE. The four contradictions `D-171`'s last paragraph recorded against rev 1 are corrected here, by site and never by re-wording what the landing left true (`D-46`, `D-126`, `D-129`, `D-117`). `DEFAULT_PANE_SIZE`/`DEFAULT_PANE_BOUNDS` DID NOT MOVE; what moved was their claimed ORIGIN, from present tense to a recorded measurement.**
- **Inputs:** `strata/pending.md` row `1`'s `F11` (closed at `D-171`); `D-171` (the landing, its readings, and the four contradictions it recorded against rev 1); `D-126` (the audit, and the finding verbatim); `D-169` (how a deletion with orphans was judged one pass ago), `D-168` (the census taken before a byte moves), `D-129` (the enforcement rule that makes the props a second authority), `D-151` (a closed id domain), `D-155` (`D-139`'s test applied to the act), `D-117` (the pass that took the gesture off the element), `D-46`, `D-41` (sites are named, never offsetted); `docs/L2/app-envelope/interface.md` rev 2 §1–§6.
- **Ceiling:** 150 lines, class max (D-1) · **Status:** structure, the deletion set as LANDED hunks, the provenance re-grain as landed and the guardrails — **no new declared name appears in this rev either, so no `signatures.md` transcription is owed** (D-45; the module declares 15 exports and this pass adds none).

## 1. The finding, and the set as measured — and as it now reads

`F11` says *"`#gutter-pane`'s authored `size`/`min`/`max` read by nothing since `D-117` — a DELETION"* (D-126's audit, `pending.md` row `1`, closed at `D-171`). Measured member by member at `D-126`'s head, over `src/` **and** `demo/` (`D-168`'s surface, because a deletion performed against a remembered list is the class this corpus keeps finding); the last column is the tree at this head:

| site | at `D-126`'s head | reader then | now |
|---|---|---|---|
| `demo-envelope.ts`'s `gutter-pane` node — `props.size` | `'100'` | **none** | **GONE** (H-1) |
| the same node — `props.min` | `'0'` | **none** | **GONE** (H-1) |
| the same node — `props.max` | `'200'` | **none** | **GONE** (H-1) |
| the same node — `props.resizable` | `'true'` | `resizableOf` at `renderer.ts:547` and `demo.ts:193` | **STAYS** |
| the same node — `props.id` | `'gutter-pane'` | the node's own id; no seam reads it (`paneIdOf` reads the HANDLE's id) | **STAYS** |
| `gutterSeamExample().startSizeOf` | read `paneOf(…)`'s `size`, fell back `100` | **none** — `renderer.ts:545` and `demo.ts:182` hand `drag.startSizeOf` | **GONE** (H-2) |
| `gutterSeamExample().boundsOf` | read `min`/`max`, fell back `{0,200}` | **none** — `renderer.ts:546` and `demo.ts:188` hand `drag.boundsOf` | **GONE** (H-2) |
| `numberFrom` (private) | the two seams' only parser | its readers were the two rows above and nothing else | **GONE with them** (H-2, the orphan) |
| `paneOf` (private) | `parentElement` | `resizableOf` in the returned literal | **STAYS** |

**THE SEAMS WERE NOT SEPARABLE FROM THE PROPS, AND THAT WAS THE DESIGN'S FIRST SETTLEMENT.** `startSizeOf` and `boundsOf` are the props' readers: delete the props and each seam answers its hard-coded fallback `100`/`{0,200}` for every element in the tree, which is `D-129`'s *second authority* — a local default standing beside the shape the store is required to hold (`panes-must-stand` repairs it, `D-117` moved the gesture onto it). So the pair went with the props, in one hunk, and the landing leaves no reader behind (D-129, D-169, `D-171`).

## 2. What `gutterSeamExample` is now — the six the consumers take, and the two the census found dead and took

The function is **exported and consumed twice** (`renderer.ts:408`, `demo.ts:102`) and it **stayed**; the renderer still takes `seams.sizeFromPointer`, `seams.pointerOf`, `seams.axisOf`, `seams.cursorOf`, `seams.resizableOf`. The return type is inline, not a named export, so no other module depends on it as a type.

| member | readers after the landing | verdict |
|---|---|---|
| `sizeFromPointer` | `renderer.ts:522` | LIVE |
| `axisOf` | `renderer.ts:524`, `demo.ts:176` | LIVE |
| `cursorOf` | `renderer.ts:525` | LIVE |
| `applyCursor` | `demo.ts:180` | LIVE |
| `resizableOf` | `renderer.ts:547`, `demo.ts:193` | LIVE |
| `pointerOf` | `renderer.ts:523`, `demo.ts:175` | LIVE |
| `applyPreview` | **none** — both realms supply their own (`renderer.ts:505`/`:526`, `demo.ts:147`/`:179`) | **REMOVED** (H-4, taken) |
| `moveTypeOf` | **none** — both realms spell `(): unknown => POINTER_TYPES.move` (`renderer.ts:548`, `demo.ts:194`) | **REMOVED** (H-4, taken) |

**TEN → EIGHT BY THE PROPS' DELETION ALONE AND SIX BY `H-4`, WITH NO CONSUMER BROKEN AT EITHER STEP**: no reader of any of the four deleted members exists under `src/` or `demo/`, and no site spreads the object (`gutterSeamExample()` occurs at `renderer.ts:408` and `demo.ts:102`, and both sites read it by member). `typecheck` did not move; `typecheck:tests` moved at ONE row (§5) — `D-171` records both readings.

**THE CENSUS SAID THE TWO DELETED SEAMS WERE NOT THE LAST OF THEIR KIND, AND THE PASS SETTLED IT INSTEAD OF LEAVING A THIRD BEHIND** (H-4): `applyPreview` and `moveTypeOf` answered the two members of the eleven caller seams whose whole content is a DEGENERATE constant, and the affordance already carries both answers — `moveTypeOf?` is optional with the module's own `POINTER_TYPES.move` fallback (`gutter-affordance.ts:257`, `:851`) and `applyPreview` is required and supplied by both realms. `moveTypeOf`'s own docblock (*"so the affordance module registers ITS OWN fallback"*) was the one true statement in the pair; its member was a second spelling of that fallback (D-129's rule one level down, D-70's *"a member that could only ever be one value names nothing"*). **`H-4` was taken, so the example has ZERO dead members and its header's claim is a MEASUREMENT instead of a memory** (§3, H-3): `AE-1`/`AE-2` hold the six by name and the empty dead set (§5).

## 3. The provenance re-grain — historical measurement, never present tense

`DEFAULT_PANE_SIZE` and `DEFAULT_PANE_BOUNDS` are the values `panes-must-stand` repairs to and the figures the derivation answers for a pane the family does not name (`view-shape.ts`'s `DEFAULT_PANE_ID`/`paneGeometryIn`); **they did not move**. What moved was the sentence that claimed where they come from — after H-1 the node no longer carries the props, so a present-tense *"the authored pane's `props.size`"* is false (D-46: a sentence that says **is** names a site; a sentence that says **was measured** keeps its reading and dates it). **That hunk was ROUTED by rev 1 and taken at `D-171` as a docblock-only adjacent edit** (`D-3`, `D-46`), and these are its rows as they now read:

| site | at `D-126`'s head (quoted) | as landed |
|---|---|---|
| `view-shape.ts`'s header reading (the measured defaults' ground) | *"the authored pane's `props` read `size '100'`, `min '0'`, `max '200'`, and `gutterSeamExample`'s `startSizeOf`/`boundsOf` fall back to the same three figures"* | the same reading, DATED to `D-87`'s measurement and closed by *"**NEITHER IS CARRIED ANY MORE** — the node's three props and the two seam readers went together at `F11`"* |
| `view-shape.ts`'s `DEFAULT_PANE_SIZE` docblock | *"**THE MEASURED DEFAULT SIZE** — the authored pane's `props.size`, and the value `panes-must-stand` repairs to."* | *"the figure `D-87` measured off the authored pane's `props.size` (MEASURED 2026-11-03), which the node NO LONGER CARRIES (`F11`: the prop and the two seam readers that read it went together), and the value `panes-must-stand` repairs to."* |
| `view-shape.ts`'s `DEFAULT_PANE_BOUNDS` docblock | *"**THE MEASURED DEFAULT BOUNDS PAIR** — the authored pane's `props.min`/`props.max`."* | the same two clauses on the bounds pair: measured at `D-87` and dated, not carried by the node since `F11`, repaired to by the declaration |
| `demo-envelope.ts`'s `attributeOf` docblock | *"so `props: {size: '100', min: '0', …}` lands on the element as the attributes `size="100" min="0" …` and NOT as `data-size="…"`"* | the SAME mechanism claim over a node that still carries props — `props: {resizable: 'true'}` landing as the bare `resizable="true"`, and the handle's `props: {axis: …}` as its `axis` |
| `demo-envelope.ts`'s `paneOf` docblock | *"the authored geometry carrier (its `props` carry the pre-drag size, the bounds pair and the resizability decision)"* | the pane element whose ONE surviving geometry claim is the RESIZABILITY decision, with the size and pair named as `['panes']`'s since `D-117` and gone from the node at `F11` |
| `demo-envelope.ts`'s header above `gutterSeamExample` | *"THIS REPO'S ONE EXAMPLE IMPLEMENTATION OF THE ELEVEN CALLER SEAMS … supplies the pane's own bounds, pre-drag size and resizability"* | the SIX seams its two consumers actually take, measured (§2's table) — **the count is the measurement, not a memory**: `renderer.ts` reads five and `demo.ts` four, six in union |

**The tense rule, one sentence, because it is the whole of `D-46`'s discipline**: every replacement either says **what the file is** (a site) or says **what was measured and when** (a dated reading) — and no replacement claims the node carries what it does not. `D-169` took the same discipline to the two claims it found FALSE: they were replaced by what the tree actually does, never silently reworded (D-46, D-169).

## 4. The hunks, as landed (`D-171`)

**H-1 — the three props, LANDED.** The `gutter-pane` node's `props` now read `{ id: 'gutter-pane', resizable: 'true' }` (`src/shared/demo-envelope.ts`). Nothing else on the node moved: `css.id`, `css.classes`, `style: paneStyle` and the children stay (the card's authored DATA is the UI-authority route, brief §2).

**H-2 — the two dead seams, their docblocks, and the orphan, LANDED.** `startSizeOf` and `boundsOf` are gone from the DECLARED return type and from the RETURNED literal with their docblocks, and the private `numberFrom` is gone with them, its only two readers being those members (`D-169`'s orphan class); `D-117/LIVE-READ` asserts all three absences over the file's comment-elided code (§5). `attributeOf` STAYS — `axisOf` and `resizableOf` read attributes through it.

**H-3 — the three carriers of the claim in this module's own file, LANDED.** The example's header, `attributeOf`'s docblock and `paneOf`'s (§3's table); `paneOf`'s role sentence stays otherwise identical, and the table's other three rows are `view-shape.ts`'s (H-5).

**H-4 — SEPARABLE, AND TAKEN: the two members with no consumer.** `applyPreview` and `moveTypeOf` went with their docblocks, and the orphan `GUTTER_MOVE_TYPE` with the second, whose only reader it was. **This hunk was the pass's one discretionary act** — it could have been dropped with H-1, H-2, H-3, H-5 and H-6 unmoved, leaving the example at eight with two dead members re-filed — and it was taken because `D-168`'s method finds them and `D-129` refuses a second authority for an answer the affordance already gives (§2).

**H-5 — the provenance re-grain, TAKEN** (`D-3`, `D-46`): `src/shared/view-shape.ts` is **`store-view-record`'s path** (`modules.json`), not this module's, so this module's L4 wrote NO byte of it and the re-grain landed there as a **docblock-only adjacent edit** (`D-171`). The three docblocks it owed are §3's table, as they now read. **No VALUE moved in it either**: `DEFAULT_PANE_SIZE`, `DEFAULT_PANE_BOUNDS`, `DECLARED_PANE_IDS`, `paneGeometryIn` and `defaultPaneGeometry` are untouched (D-151's closed domain, D-87's measured default).

**H-6 — the artefacts, mechanically, LANDED.** `node demo/pane-drag-demo/build.mjs` rebuilt `demo/pane-drag-demo/demo.mjs`, and its embedded `// src/shared/demo-envelope.ts` section carries the same SIX-member example and the re-grained docblocks — which is the property `DB-1`'s content hash measures (D-118), and `D-171` records the rebuild and the green run rather than this page. No `package.json` key moved and no other source file was touched (D-118's script-key census).

**Order: one commit.** H-2 and H-4 removed declared members from an exported surface that `tests/pane-drag-compliance.test.ts`'s `D-117/LIVE-READ` CALLED, so that row's same-edit had to land in the same commit — and did (§5): the red is the routing, not this module's breakage (`D-169`'s own wording, `D-3`).

## 5. The rows — re-grain or retire, and who owns each

**`pending.md` NAMED `gutter-ui`'S AUTHORED-PROP ROWS AS THE OWNER, AND THAT OWNER DOES NOT EXIST AT THIS HEAD** — measured, `D-168`'s class again: `tests/gutter-ui.test.ts` reads `src/shared/demo-envelope.ts` in exactly one row (`R-9`), and that row measures the CARD's presence (`gutter-vertical`'s `css.id`/`props.id`), which H-1 does not touch. **No row under `tests/` drove the authored `size`/`min`/`max` through the example at `D-126`'s head** — the props' only readers were the two seams — and the one row that authors them NOW authors them as the COUNTER-FIGURE the absence is measured against, never as an answer (`D-117/LIVE-READ`, below); the tree's only numeric triple `{size: 100, min: 0, max: 200}` is `crossing.test.ts:220`'s, which compares the CONSTANTS.

| row | file · owner (`modules.json`) | disposition |
|---|---|---|
| **`D-117/LIVE-READ`** (`strata:gates`) | `tests/pane-drag-compliance.test.ts` · `renderer-wiring` (`modules.json`) | **RE-GRAINED, LANDED.** Its `seams.startSizeOf`/`seams.boundsOf` control assertions retired with their subject, and the property they measured INVERTED into an ABSENCE with a plantable control (`D-169`'s `M-4` form): over `demo-envelope.ts`'s comment-elided code, `startSizeOf`, `boundsOf` and `numberFrom` do not occur, and the same scanner fires on a synthetic literal spelling the deleted shapes — so each absence is a fact about the module and not a blind detector. Every composition assertion and clause (5)'s `seams.*` absence checks are UNMOVED — they already read the wiring, not the example |
| `M-2/DEFAULT-arm`'s comment and the row's own headstone | same file · `renderer-wiring` | **RE-GRAINED**: *"the authored pane's `props.size`"* → the figure `D-87` measured, which the node no longer carries (`F11`, `D-46`) |
| `client.test.ts`'s `paneSizeOf` message | `store-view-record` (`modules.json`) | **RE-GRAINED, row KEPT**: its subject — `paneSizeOf` answering the measured default — is unmoved, and its message no longer claims a present-tense authored origin |
| `crossing.test.ts`'s comment above the pair's comparison | `store-view-record` (`modules.json`) | **RE-GRAINED**, same form; no assertion moved |
| `crossings-live.mjs`'s pane-figure comment (a driver) | `tests/e2e/store-crossings/` · `store-tabs-record` (`modules.json`) | **RE-GRAINED**, same form — the leg measures the crossings, not the envelope's prose, so its drive is unmoved |
| `DB-3`'s owner list (`demo-bundle.test.ts`) | `demo-panes` (`modules.json`) | **UNMOVED** — it names the FUNCTION, which stays |
| `DB-1` (`demo-bundle.test.ts`) | `demo-panes` | **GREEN**: H-6 landed and the bundle embeds the six-member example (H-6; `D-118`, `D-171`'s reading) |
| census/allow-list rows naming the PATH — `census.test.ts`, `gesture-session.test.ts`, `zones.test.ts`, `overlay.test.ts`, `menu-template.test.ts`, `boundary.test.ts` | five owners | **UNMOVED**: no export, id, count or path changes — `demo-envelope.ts` exports **15**, `mapRows` reads **21**, `srcTypeScriptFiles` reads **51**, and none of the three moves |
| `docs/L3/renderer-wiring/design.md:108` (*"what it waits on is an `app-envelope` act"*) | that page's L3 | **OWED to that page's next rev** — it says F11 waits, and after this landing it does not (`D-46`, `D-169` (ii)'s precedent) |

**Does the measured constant carry the property alone?** YES, and a row measures THAT: `DEFAULT_PANE_SIZE`/`DEFAULT_PANE_BOUNDS` are what `paneGeometryIn` answers for a pane the family does not name, and `pane-drag-compliance.test.ts`'s composition clause, `client.test.ts`'s `paneSizeOf` rows and `crossing.test.ts:220` drive exactly that. What they lose is the CONTROL that used the element as the counter-figure — replaced by `D-117/LIVE-READ`'s inverted control (an absence with its plantable control) and by the census row §5 now records as landed.

**THE INSTRUMENT REV 1 NAMED AS OWED IS LANDED, AND IT IS THE PASS'S REAL PRODUCT** (`D-169`'s `D-126` lesson, that a deletion whose instrument is left standing is the `D-147` defect again): `tests/unit/app-envelope/live-seams.test.ts` is the census over `gutterSeamExample`'s returned members — `AE-1` the surface is the SIX names and nothing else, set-equal and sorted, so a seventh member reds whatever it is called; `AE-2` every member is reached by a consumer, with the consumers FOUND by walking `src/` and `demo/`, the binding DERIVED from the call site, `renderer.ts` five and `demo.ts` four, the union the whole surface and `dead === []`; `AE-3` the census can red (a doctored seventh member reported BY NAME, a planted read seen, a commented-out read not, the binding derivation proved on a non-caller). It is **UNMARKED and GATES** (`D-40`), it was proved able to red on a planted seventh member rather than assumed able to (`D-171`), and it is claimed on this module's own map row — `strata/modules.json`'s `app-envelope` entry's second path — and as its OWN `DECLARED_SCOPE` entry in the worktree boundary row, never as a directory prefix.

## 6. Guardrails for L4

- **No replacement read, in any form.** The pass may not teach the example to read the geometry from a `data-size`, a selector, a computed style or the element's rect: the size and pair are `['panes']`'s, and a second read is the `D-129` case the deletion closes (D-129, D-117).
- **`resizableOf` and `paneOf` and `attributeOf` stay**, and `resizable` stays the node's own authored declaration — resizability is NOT a member of the panes family and no family declares one to read (`renderer.ts:543`–`:544`, D-117).
- **No id, class, style or child node moves**: the authored card is UI authority (brief §2), and `GUTTER_AFFORDANCE_ID`/`GUTTER_TARGET_ID`/`GUTTER_STATUS_ID` are read through the graph (`renderer.ts:406`–`:407`).
- **The constants are cited, never re-derived**: if a hunk appears to need `DEFAULT_PANE_SIZE`'s value spelled, the hunk is wrong — the import is the reference (D-151, `view-shape.ts`'s `DECLARED_PANE_IDS`).
- **The floor is four legs plus the two checks**: `npm test`, `typecheck`, `typecheck:tests`, `npm run build`, then `node scripts/strata-marks.mjs check` and `node demo/pane-drag-demo/build.mjs --check` (brief §6, D-118).
- **TWO edits stayed ROUTED, AND ONE LANDED AS AN ADJACENT ACT** (D-3): `tests/pane-drag-compliance.test.ts` is `renderer-wiring`'s and landed in the SAME commit as H-2 and H-4 (§5); `demo/pane-drag-demo/demo.mjs` is `demo-panes`' path and H-6 is its rebuild command (D-118); and `src/shared/view-shape.ts` is `store-view-record`'s (`modules.json`), so it was never this module's to write — its docblock re-grain landed as a docblock-only adjacent edit at `D-171` and no VALUE moved in it (H-5, `D-46`).
- **This module's write scope is ONE source file PLUS the census row the map row now claims**: `src/shared/demo-envelope.ts` and `tests/unit/app-envelope/live-seams.test.ts` (`strata/modules.json`'s `app-envelope` entry, whose second path `D-171` added) — a hunk reaching `src/renderer/`, `src/shared/view-shape.ts`, any other `tests/` path or `demo/` is a routing error and not a scope question (D-3, D-26/D-43).
- **`src/shared/view-shape.ts`'s figures are a RECORDED measurement, and a diff that moves `100`, `{min: 0, max: 200}` or `DECLARED_PANE_IDS` has moved another module's default** — this module states the provenance and never the value (H-5, D-151, D-46).
