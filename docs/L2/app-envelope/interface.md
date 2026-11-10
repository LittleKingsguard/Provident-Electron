# L2 — `app-envelope`: the interface

- **Layer:** L2 · **Module:** `app-envelope` · **Branch:** `strata` (D-6) · **Rev:** 3 — **`F3`'S SECOND-BOOT ARM LANDS AS A DELETION AND NO NAMED SURFACE MOVES: `#gutter-status` stops authoring the figure `'100'` (§2a), so the read-out reads EMPTY — on a first boot and on a second boot that receives no delivery alike — until a delivery paints it: never wrong, and `D-129`'s own prescription rather than a new ruling. The boot-paint close is MOOT as a close and still REFUSED as an act (`D-96`/`T-4`). `F11` MOVED NO NAMED SURFACE EITHER, AND ITS RECORD STANDS: the fifteen names are the fifteen names, the authored pane's `props` now read `{ id: 'gutter-pane', resizable: 'true' }`, and the example reads the SIX members §3 lists — with the census row that makes a seventh member unrepresentable standing at `tests/unit/app-envelope/live-seams.test.ts`, unmarked and gating, and claimed on this module's own map row. What stands at the crossing is unmoved: a consumer can no longer obtain a pane's geometry from authored data at all, because the size and the bounds pair are `['panes']`'s, enforced by `panes-must-stand` (`D-117`, `D-129`, `D-151`).**
- **Inputs:** `docs/L3/app-envelope/design.md` rev 2 §1–§6; `docs/L2/view-record/interface.md` §1/§2 (the pane family the example may not answer for); `docs/L1/pane-drag-temp.md` §2 (`app-envelope` named and not claimed); `D-171` (the landing and its readings), `D-126` (the finding), `D-169`, `D-168`, `D-129`, `D-117`, `D-151`, `D-155`, `D-46`, `D-41` (sites, never offsets); `strata/modules.json`'s `app-envelope` row (15 endpoints, TWO paths — the source and the census row — a count read from its owner, D-26/D-43); **and for rev 3**: `docs/L3/app-envelope/design.md` rev 3 §7–§10, `D-164` (the paint from the delivery, and the sink write it deleted), `D-129` (the enforcement rule and its `F4` precedent), `D-96`/`T-4` (the refused boot paint), and the two sites this rev reads rather than remembers — `renderer.ts`'s `renderPaneSize` and `authoredSettingOf`.
- **Ceiling:** 150 lines, class max (D-1) · **Status:** the module's published surface and its behaviour at the boundary; exact declared text is the design's hunks (D-45 — this pass declares no new name). Rev 3 adds §2a (the read-out node, and the figure it stops authoring) and re-grains §1, §4, §5 and §6 to it; §2 and §3 stand as landed at `D-171`.

## 0. Scope

This module is the app's **authored data**: one provident envelope tree, the thirteen node ids other modules resolve through the graph, and one example implementation of the caller seams the gutter affordance takes. It holds no state, opens no channel and is imported by the renderer's boot and by the demo (brief §2's UI authority; `D-26`/`D-43` for every count).

## 1. The published surface — fifteen names, and what each is for

| Group | Names | Contract |
|---|---|---|
| The envelope tree | `demoEnvelope()` | returns the authored tree: nodes, `props`, `css`, handler-body STRINGS. Pure: a fresh value per call, nothing retained (brief §2) |
| The gutter triple | `GUTTER_AFFORDANCE_ID` (`gutter-vertical`), `GUTTER_TARGET_ID` (`gutter-target`), `GUTTER_STATUS_ID` (`gutter-status`) | the ids the wiring resolves with `runtime.elementForNodeId` (`renderer.ts:406`–`:407`) — except `GUTTER_STATUS_ID`, which is resolved as NO element and patched as a NODE by id (§2a, `renderer.ts:463`–`:470`) — derived, never spelled twice (D-117) |
| The record terminals | `TABS_LANDING_PAGE_ID`, `TABS_ERROR_PAGE_ID` | the record's two terminals the delivery drives (D-127) |
| The overlay surface | `APP_ROOT_ID`, `OVERLAY_SCRIM_ID`, `OVERLAY_DIALOG_ID`, `OVERLAY_CLOSE_ID`, `OVERLAY_OPEN_ID`, `OVERLAY_STATE_ID`, `OVERLAY_SECURITY_PANE_ID`, `OVERLAY_SETTINGS_SURFACE_ID` | the ONE modal surface and its state carrier (D-113) |
| The example | `gutterSeamExample()` | §3 — the caller seams the affordance takes, as an EXAMPLE and never as a second mechanism (D-117) |

**No type is exported, and no member is a store, a router, a subscription or a channel**: a consumer takes VALUES and ids, and every write the app makes stays in the module that owns the crossing (D-87, `D-129`).

## 2. The authored pane node — what it declares, and what it does not

`#gutter-pane` is a `div` with an authored `css` block (`paneStyle`) and authored `props`. After this rev its `props` are `{ id: 'gutter-pane', resizable: 'true' }`:

| member | state | why |
|---|---|---|
| `props.id` | **CARRIES** | the node's own identity, emitted as the `id` attribute (D-41) |
| `props.resizable` | **CARRIES, AND IT IS READ** | `gutterSeamExample().resizableOf` reads the bare `resizable` attribute off the handle's parent, and the app hands that seam unchanged (`renderer.ts:547`, `demo.ts:193`); resizability is the authored card's DECLARATION and no view family's member (D-117) |
| `props.size` | **REMOVED** (`F11`) | read by nothing since `D-117` took the live gesture onto `['panes']`; the store's family holds the size and `panes-must-stand` repairs it, so an authored copy is a second authority (`D-117`, `D-129`) |
| `props.min` / `props.max` | **REMOVED** (`F11`) | the same, for the bounds pair: `paneGeometryIn`/`paneBoundsOf` answer from the family, and the measured default answers where the family does not name the pane (D-87, D-151's closed id domain) |

**The node is NOT the geometry's home and the crossing is**: nothing may render from these attributes (they are non-standard on a `div`, no stylesheet selects them, and no leg reads them), and no consumer may reintroduce a read of them — that read is exactly the defect `F11` closes (D-126, `D-129`).

**The pane is not the target either**: the pointer's drag preview writes the inline `width` on `GUTTER_TARGET_ID`, the pane's child (`renderer.ts:505`–`:516`), so the pane's rendered size never depended on the removed attributes (D-138, D-144).

## 2a. The read-out node — what it declares, and why it authors no figure

**`#gutter-status` (`GUTTER_STATUS_ID`) carries `css.id`, `css.classes` and `props.id`, and after `F3` NO `content` at all.** The ONE figure it used to author (`'100'`) is deleted: a read-out is a RENDERING of `['panes']` at `file`, `panesMustStand` repairs that family at creation, the measured default is `paneGeometryIn`'s (§4), and a figure authored beside it is `D-129`'s second authority — the class that rule deletes rather than keeps as a head start.

| member | state | why |
|---|---|---|
| `css.id` / `css.classes` | **CARRIES** | the render attribute and the card's styling hook; the paint writes by NODE id and resolves no element (D-41) |
| `props.id` | **CARRIES** | the AUTHORED id the graph surface reaches the node by — `list_targets`, `get_node_state` |
| `content` | **REMOVED** (`F3`) | the node's only figure — its ONE reader is the paint's own state check (`renderer.ts:463`–`:464`), which is total over absence — and a second authority for the size `['panes']` owns (`D-129`, `D-164`) |

**What a consumer gets from it, and why EMPTY is right**: on a **first boot** the read-out reads EMPTY, and on a **second boot** whose restored size no delivery has painted it reads EMPTY TOO — one state, and neither is wrong, where `'100'` was right on the first boot only because the pane WAS `DEFAULT_PANE_SIZE`, and wrong on every second boot whose restored size DIFFERED, until a delivery painted. A delivery is the paint's only trigger (`D-164`) and `authoredSettingOf` reads a content-less node as the READABLE empty setting (`renderer.ts:1619`–`:1635`), so the first delivery after ANY boot whose panes arm reads `'record'` still paints — the gate `renderer.ts:459` imposes, while a `'default'` arm paints nothing and the emptiness stands (`D-127`) — the emptiness costs one paint and never a false figure.

**NO PLACEHOLDER MAY TAKE ITS PLACE**: `''`, `'0'`, `'100px'`, `'(no reading)'` or any other string is a NEW figure on the same shape, and the node must SAY NOTHING while the record says the number (`D-129`; `F4`'s `(no reading)` is a PANE's word about a crossing that answered nothing, never an authored envelope node's).

## 3. `gutterSeamExample()` — six members, and the one thing it may not do

The function is this repo's ONE example of the affordance's caller seams. Exported and consumed twice (`renderer.ts:408`, `demo.ts:102`); its return type is inline and unexported, so no module depends on it as a type.

| Member | Answer | Consumer |
|---|---|---|
| `pointerOf(event)` | the `{x, y}` pair, `null` for a non-object/absent/non-finite coordinate | `renderer.ts:523`, `demo.ts:175` |
| `axisOf(element)` | the handle's authored `axis` attribute, falling back to `GUTTER_AFFORDANCE_ID` | `renderer.ts:524`, `demo.ts:176` |
| `cursorOf(token)` | this file's OWN cursor table, as a VALUE | `renderer.ts:525` |
| `applyCursor(element, declaration)` | the handle's style member | `demo.ts:180` |
| `resizableOf(element)` | `true` unless the pane's `resizable` attribute reads exactly `false` | `renderer.ts:547`, `demo.ts:193` |
| `sizeFromPointer(pointer, start)` | `pointer.x − start` | `renderer.ts:522` |

**THE MEMBERS THAT ARE GONE, AND WHY THEY ARE NOT AN EXAMPLE'S TO KEEP** (`F11`, design §2–§3): `startSizeOf` and `boundsOf` read the authored `size`/`min`/`max` with hard-coded `100`/`{0,200}` fallbacks — after §2's removal they would answer a fallback for every element in the tree, so they go with the props they read (`D-129`); `applyPreview` and `moveTypeOf` had no consumer at all, because both realms supply their own (`renderer.ts:505`/`:548`, `demo.ts:147`/`:194`) and the affordance already carries `moveTypeOf?`'s own fallback (`D-169`'s class; design H-4).

**The example may not read geometry from ANYTHING** — not a `dataset` entry, not a selector, not a computed style, not an element's rect. Its reads are the handle's and the pane's authored DECLARATIONS (`axis`, `resizable`), and the size and pair are the crossing's (D-117, D-129). **AND THE SURFACE IS NOW MEASURED RATHER THAN REMEMBERED**: `tests/unit/app-envelope/live-seams.test.ts` asserts the six by name (`AE-1`), that every one of them is reached by a consumer with `dead === []` (`AE-2`), and that the census can red (`AE-3`) — unmarked and gating (`D-40`, `D-171`).

## 4. Where the measured figures live, and whose they are

`DEFAULT_PANE_SIZE` (`100`) and `DEFAULT_PANE_BOUNDS` (`{min: 0, max: 200}`) are `src/shared/view-shape.ts`'s, not this module's: they are the geometry `panes-must-stand` repairs at creation and the answer `paneGeometryIn` gives for a pane the standing family does not name (D-87, D-151). They were **measured off this node's `props` at `D-87`**, and after `F11` the node no longer carries them — so this module states the figures as a RECORDED measurement and never as a citation site, and nothing here restates them as authored data (`D-46`, design §3). **AND THE READ-OUT CITES THEM NOWHERE**: after §2a the figure reaches `#gutter-status` only from the crossing, through the delivery's `paneSizeOf(DEFAULT_PANE_ID)` — so this module states the figures' provenance and no node carries one (`D-164`, `F3`).

## 5. What this module does not do

- **No store, no tier, no address, no constraint, no repair** — the crossings are the other modules' (D-65, D-87).
- **No write**: every authored `handlers` entry is a body STRING the graph dispatches; the module itself writes nothing, calls nothing and resolves nothing at import (brief §2's UI authority).
- **No graph, runtime or element access**: it does not import `src/renderer/`, so no member can resolve a node or read the DOM at construction (`D-3`, `D-117`).
- **No subscription, no boot act, and NO authored fallback**: the read-out node authors no `content` at all (§2a), so what stands between a boot and the first delivery is EMPTY and never a figure — the delivery paints and the store is its only author (`D-127`, `D-129`, `D-164`).

## 6. Guardrails a consumer inherits

- **Take the ids; never re-spell them** — a second spelling is a rename that half-lands: **the app realm** imports the constants rather than repeating them (`renderer.ts:5`), while **the demo realm** takes only `gutterSeamExample` from this module (`demo.ts:60`) and reads its OWN page's elements by literal selector (`demo.ts:70`–`:72`) — those are the demo page's nodes and never this envelope's (D-41).
- **The example is a parameter, not a policy**: a consumer that needs a different mapping supplies its own seam (`demo.ts:174`'s `sizeFromPointer`, `:178`'s `cursorOf`) rather than editing this file (D-117, D-118).
- **A fork replaces the envelope whole** — the tree is delivery inheritance and its node ids are the demo's, not the framework's (brief §0).
- **A geometry read of authored data is a finding, not a convenience**: the rule this rev fixes is that the store answers and the consumer renders, and the authored node is not a store (D-129, `D-126`).
- **An authored figure on the read-out is a finding too, not a fallback**: `#gutter-status` says nothing until a delivery paints it, so a `content` put back on it — a number, an empty string, a placeholder word — is `D-129`'s second authority returning, which is what `F3` deletes (design §7).
