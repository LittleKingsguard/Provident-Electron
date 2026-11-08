# L2 — `view-record`: the interface

- **Layer:** L2 · **Unit:** `view-record` · **Branch:** `strata` (D-6) · **Rev:** 7 — rev 1 filed the crossing's second declaration set (D-87); rev 2 added the zone family and re-derived §5 (D-91, D-89); rev 3 added the appearance record, its staleness arm and its route (D-97); rev 4 moved that family to `file` on the durability ruling (D-98); rev 5 gave the three families' value arms (D-105); rev 6 DROPPED the `focus` family whole (D-142). **Rev 7 ADDS the drag's in-process family at `['drag']` at `temp` — DECLARED, UNPAIRED, and read by no member of `read()`** — with its two routes landing on both sides in one edit (D-132, D-137, D-101, D-14), so the record holds **four** roots, the `view` member carries **seven** routes and `viewDeclaredRoots()` publishes **four**. No earlier claim is withdrawn; the deleted family's rows retired with it (D-9).
- **Inputs:** `D-132` (the tier ruling, its diff scope, and the secure store gaining nothing), `D-137` (the subscription array is a same-edit precondition), `D-135`/`D-138` (the `temp` root needs no composer, and why), `D-101` (the declared-root guard, and an entry that carries no pair), `D-142` (the deletion's same-edit rule, still binding), `D-144` (the read answers every node's own `_tier`), `D-105`, `D-76`, `D-14`, `D-9`, `D-41` (a cite names a site).
- **Ceiling:** 150 lines · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; a source cite names its **site** and never an offset (D-41).

## 0. Scope

This document fixes the view record's I/O surface: its addresses and their tiers, the `view` bridge member and its routes, `read()`'s answer, the declared roots the `data.*` surface's guard consumes, this module's refusal vocabulary, and the hunks L4 must land. Never the store's internals, the engine `provident-storeroom` runs, or the renderer's rendering (§3's L2 row; `modules.md` §1).

## 1. The families the record holds now — four roots, and the one that left

| Address | Tier | Holds |
|---|---|---|
| `['panes']` | `file` | one member per pane id, each `{ size: number; bounds: { min: number; max: number } }` (D-87) |
| `['zones']` | `mem` | one member per zone id, each carrying any of an opaque `slot`, a `distance`, a `size`, a `display` (D-91) |
| `['theme']` | `file` | **one whole record** `{ token?, attribute?, declaration: { name?, value, removal } }` — the setting, the caller-held attribute name, and the declaration the mechanism computed for that pair (D-97, D-98) |
| `['drag']` | `temp` | **the gesture's in-process reading**: one member per pane id, each `{ size }` — the placement alone — present while a drag is in process and ABSENT once it ends (D-132) |

**THE DRAG FAMILY IS DECLARED AND UNPAIRED, AND THAT IS LAWFUL RATHER THAN AN OMISSION** — the one place this module's usual "address + tier + declaration + root entry" shape is narrower. It carries an address, a tier constant and a `viewDeclaredRoots()` entry, and **no `viewConstraintDeclarations` row**: no invariant holds the family, and a repair whose subject is "no drag has started" would mint a placeholder for data whose ABSENCE is the product (D-132, D-101). **What the entry buys is the family's ONE judgement, and it is the tier's**: a `file` or `mem` write at this root is refused `declared-tier`, naming the root and the tier it is declared at, ahead of any store verb (D-101).

**IT IS ALSO THE ONLY FAMILY WITH NEITHER A COMPOSER NOR A BOOT DATUM.** A nested write creates no parent (measured), but `['drag']` IS a root holding one member and no sibling, so the first move writes the root itself and nothing is left to preserve — the member merge `composePanes` exists for has no subject here (D-135, `D-138`). Its durable half is `['panes']`' own value, written by the release's unchanged `commitPane` (D-132).

**THE `['focus']` ROOT LEFT WHOLE AT rev 6 AND STAYS GONE** (D-142): its address constant and `FOCUS_TIER`, the `focus-must-stand` declaration and its body, its `viewDeclaredRoots()` entry, `commitFocus`/`composeMirror`/`mirrorFrom`, the surface's route, its channel constant and `ipcMain.handle` site, both lockstep halves, the client's route and the renderer's carrier left in one edit. **What it held was a SECOND SPELLING of a fact `['tabs']` already owns** (`D-140`, `D-141`, `D-76`), and it was `mem`, the one tier that persists nothing (D-141); what replaced it is no route of this module's (D-142).

**FOUR ROOTS AND NOT ONE VALUE, MEASURED** (D-87's ground, re-driven at each later root): a nested write does not create its parent (`AddressNotFound` over a fresh store), so one root would need a declaration minting a parent branch; and a root written at `file` answers its descendants at `file` and `TierNotFound` at `mem` or `temp`, so one value could not carry a `mem` family and a `temp` one at their own tiers. The tab record's one-root pattern is applied **once per tier**, not once per family (D-63, D-87).

## 2. The bridge member and its seven routes

`window.provident` carries **one** top-level member, `view`, declared in `src/main/preload.ts` and re-declared in `src/renderer/secure-panels.ts`'s `declare global` as the **same text** — the lockstep pair a battery compares member for member (D-87, D-112). A route here is never a path: a caller names a pane id, a zone id, an appearance act or a placement, and never an address or a tier (D-87, D-91, D-132). Every channel constant is single-sourced in `src/shared/view-channels.ts`, because a name spelled in the handler and again in the preload is a rename that half-lands (D-87).

| Route | Argument | Answer | Channel constant |
|---|---|---|---|
| `view.read()` | none | §3's answer | `IPC_VIEW_READ` (D-84, D-87) |
| `view.commitPane(id, geometry)` | a pane **id** and a geometry | `{ status: 'committed' }` or §5's refusal arm | `IPC_VIEW_PANE_COMMIT` (D-87) |
| `view.commitZones(id, zone)` | a **zone id** and the members this act carries | `{ status: 'committed' }` or §5's refusal arm | `IPC_VIEW_ZONES_COMMIT` (D-91) |
| `view.commitTheme(token, attributeName)` | **the appearance ACT**: the setting the control produced and the CALLER-HELD attribute name — never a declaration (D-97) | `{ status: 'committed' }` or §5's refusal arm | `IPC_VIEW_THEME_COMMIT` (D-97) |
| `view.commitDrag(paneId, geometry)` | a pane **id** and the placement the gesture read — `{ size }`, never a path and never a tier | `{ status: 'committed' }` or §5's refusal arm | `IPC_VIEW_DRAG_COMMIT` (D-132) |
| `view.clearDrag()` | **none**: the act is the gesture's end, and a `null` argument is the spelling `D-140` spent a row removing | `{ status: 'committed' }` — the family ENDS, whether or not it stood | `IPC_VIEW_DRAG_CLEAR` (D-132) |
| `view.onChanged(handler)` | one listener | the withdrawal, and nothing else | `IPC_VIEW_CHANGED` — the push: no request, no handler, no payload (D-137) |

**WHAT THE TWO DRAG ROUTES WRITE, AND BOTH SIDES IN ONE EDIT** (D-14, D-112, D-132): `commitDrag(pane, { size })` → `store.write(['drag'], 'temp', { [pane]: { size } })`, ONE whole value the caller formatted and no composer touches (`D-136`, `D-135`); `clearDrag()` → `store.delete(['drag'], 'temp')`, a DELETE at the family's own tier and never a placeholder, so the address answers `absent` once the gesture is over. Each lands on both sides in the SAME edit — the channel constant, the surface's route, the `ipcMain.handle` site, the preload's member with `secure-panels`' lockstep half, and the client's method — because a client method whose channel has no handler is a method that writes nowhere, the class `D-132` refused to half-land.

**AND `view.commitFocus` STAYS ABSENT FROM BOTH SIDES** (D-14, D-142): the constant `IPC_VIEW_FOCUS_COMMIT`, the `ipcMain.handle` site, the record's and the surface's `commitFocus`, both lockstep halves and the client's `routeOf(member, 'commitFocus')` turn left together and nothing replaces them.

## 3. `view.read()` — three families, and the drag reading is not one of them

`read()` answers `{ status: 'committed'; panes; zones; theme; source: { panes; zones; theme } }`: the three families' admitted values and one `source` word per family, `'record'` or `'default'` (D-142, D-84, D-87). **NO `focus` MEMBER AND NO `drag` MEMBER STANDS ON EITHER SIDE OF THE WIRE**: the mirror left with its family (D-142), and the temp reading is read WHERE THE TIERS ARE READ — `provident.data.read({path: ['drag']})`, whose node carries its own `_tier` (D-133, D-144) — so a consumer asks the readout, and `dragOf` is the member `D-133` refused to mint. **`source` NAMES A REAL DIFFERENCE** — the record answered, or the declared default did — which keeps a placeholder from being substituted at a read and called a record (D-84). **`read()` IS TOTAL AND CARRIES NO REFUSED ARM**, a measurement and not an omission: a read that misses answers the family's declared arm and a refused read is caught at the same place (D-84). It carries **no `repaired` member** either, because no route of this module can produce the difference such a member would report (D-70, D-105).

`paneGeometryIn(panes, id)` and `zoneIn(zones, id)` are the **pure** derivations over one reading, so a client needs no second store verb and no route stands without an answer site (D-87, D-91). Their missing arms differ, and the difference is the measurement: a pane the family does not name answers the measured default geometry, a zone answers `null` (D-91).

## 4. The declared roots — four, and the same-edit rule stated as a rule

`viewDeclaredRoots()` publishes each root **paired with the tier its own declaration writes at** — `['panes']` `file`, `['zones']` `mem`, `['theme']` `file`, `['drag']` `temp` — built from the same address and tier constants the batch uses, so a family that moved tier would move here without a word (D-101, D-97, D-98, D-132). Its caller is the `data.*` surface's declared-tier guard (`src/main/data/surface.ts`'s `declaredTierLedger`, fed by `src/main/main.ts`'s `declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()]`), which admits a write or a delete at a declared root only at that family's tier and refuses `declared-tier` otherwise, ahead of any store verb (D-101).

**THE ENTRY AND ITS FAMILY ARE ONE HUNK — a RULE, not tidying** (D-101, D-132, D-142): an entry outliving its family hands the guard a tier for a root that is gone, and an address with no entry leaves the family shadowable at another tier. The rule binds the drag pair exactly as it bound the deleted focus pair, and it is why the entry joins the address and tier constants in the SAME edit rather than after them. **AND AN ENTRY WITHOUT A PAIR IS LAWFUL, BECAUSE THE GUARD DOES NOT READ THE BATCH**: `declaredTierLedger` keys on the roots it is HANDED, so the `temp` root is guarded while nothing is declared at it — the whole of what a `temp` family needs (D-101, D-132). **WHAT THE GUARD DOES AT AN UNDECLARED ROOT: IT ADMITS THE WRITE**, because a path no crossing declares reaches the store verb and is judged by the store's own constraints and nothing else (D-101, D-105).

## 5. The refusal vocabulary — two tokens per paired family, and none of its own for the drag

| Token | Family | Names |
|---|---|---|
| `malformed-pane` | panes · drag | no pane id, or no plain geometry record (D-87) |
| `malformed-geometry` | panes · drag | a **supplied** `size` that is not a finite non-negative number, or a `bounds` pair that is not two finite numbers with `min ≤ max` (D-87) |
| `malformed-zone` | zones | no zone id, or no plain zone record (D-91) |
| `malformed-zone-member` | zones | a supplied `size` that is not finite and non-negative, a `distance` that is not finite, a `display` that is not a string, or a `slot` the crossing's boundary would refuse (D-91, D-105) |
| `malformed-theme` | theme | no setting token that can be an appearance setting (a string; the EMPTY one is the absence the mechanism declares), or no attribute name a caller could compose a write from (D-97) |
| `stale-theme` | theme | the carried declaration is not the one the mechanism would produce for the setting and attribute it carries — **the CONSTRAINT's arm, never a route's** (D-97) |

Each token is minted by this module and by nothing else (D-87). **THE DRAG ROUTES MINT NO PAIR OF THEIR OWN**: their two faults ARE the panes' two — no pane id or no plain record, and a `size` no placement can be — so `malformed-pane` and `malformed-geometry` answer them, and no third token arrives for a family nothing judges (D-132). **AND NOTHING JUDGES A VALUE AT `temp`**: no pair stands there, so the routes' shape arms are the whole gate and the store's own boundary is the rest. **The family that left took its two tokens with it** — `malformed-focus` and `dangling-active` are answered by no route after the change (D-142, D-9). **An ABSENT member is not a refusal**: at the zone family it is the ordinary case, so a commit naming a `size` alone keeps the standing `slot`, `distance` and `display`, and a sibling zone is never touched (D-91). **AND EVERY PAIRED FAMILY ANSWERS A SECOND KIND NO ROUTE OF THIS MODULE CAN**: `panes-must-stand`, `zones-must-stand` and `theme-must-stand` refuse a value that STANDS and names a member the read cannot state, or a declaration that contradicts its own setting, with the store's rollback leaving what stood — status `ConstraintPassRefused`, sentence this module's, in the register above (D-105).

## 6. Boot data: the file, or a repair — and for the drag root, nothing

**Clause 1 and clause 3 of the convention, per address** (D-82 via D-87). `panes-must-stand` at `['panes']` refuses a value that is not a plain record and repairs it to the measured default family as ONE whole legal value; on a fresh profile the file carries it when the constructor returns (D-86) and the next boot is handed it (D-87). `zones-must-stand` is that shape at `mem` with one fact of its own: the zone family's only lawful placeholder NAMES NO ZONE, so a repair writes the empty family (D-91). **A `mem` value can never come from a file** (D-84), so the zone family is re-minted at **every** boot and not one byte of it reaches the profile (D-91). `theme-must-stand` carries the two arms of the appearance record: no plain record repaired to the placeholder, and **STALENESS** — a record that stands whose carried declaration is not the mechanism's answer for the pair it carries — repaired from the record's OWN two members (D-97, D-98), its comparison STRUCTURAL because the crossing normalises key order. Its tier is `file` on the durability ruling (D-98).

**THE DRAG ROOT HAS NO BOOT DATUM AND NO REPAIR**: it is `temp`, the tier that persists nowhere, so a fresh profile carries no `drag` key, a restart cannot resurrect a gesture, and a read over an absent drag root is the absence a gesture that has not started IS (D-132, D-84). **NOTHING IS DERIVED AT A READ, AND A BOOT APPLIES NOTHING**: the one stated `fill()` adopts and only a delivery applies, so a `file` record standing at boot is DATA (D-98).

## 7. What does not move

- **The appearance family's constraint-repair product** (D-97, D-98): the resolution is the pair's, the route carries the ACT and never a declaration. **The zones family as built** (D-91): its address and tier, its pair, its route, and `commitZones`' composition of one zone over what stands. **The panes family** (D-87): the measured default family, `panes-must-stand`, `paneGeometryIn`'s default arm, and `commitPane` as the release's `file` commit (D-132).
- **The tier constants and the tier union derived from them** — now three words, `file`, `mem` and `temp`, each spelled by a constant and never as a literal (D-87, D-91, D-98, D-132).
- **The record's creation instant**: each paired family's existence pair, placeholder and repair stand in the boot's ONE `createProfileStore` batch, and a fresh profile carries the two `file` families' placeholders (D-87, D-91, D-98).
- **The subscription and the push** (D-137, D-87): one listener per root — **now four, the `temp` root included**, in the same edit that adds its address, or a `temp` write is a write the renderer never hears — and a delivery that carries a signal and no value.
- **This module owes no replacement route for the focus act**: it lives in the `['tabs']` record through `data.write` (D-142, D-136).

## 8. The licence for L4 — ten hunks, and no eleventh

| # | Site | Before (measured at this head) | After |
|---|---|---|---|
| 1 | `src/main/view-record/index.ts` · the constants | no `temp` spelling anywhere under `src/`; `VIEW_THEME_ADDRESS` is the last address (D-132's grep) | `export const VIEW_DRAG_ADDRESS: readonly string[] = ['drag']` and `const DRAG_TIER = 'temp'` beside `VIEW_PANES_ADDRESS`/`PANES_TIER`, with `ViewTier` gaining the word from the constant |
| 2 | same file · `ViewRecord` and its routes | `read`, `commitPane`, `commitZones`, `commitTheme`, `subscribe` | `commitDrag(id: string, geometry: unknown): ViewRecordAnswer` and `clearDrag(): ViewRecordAnswer` beside them |
| 3 | same file · the two route bodies | none | `commitDrag` answers its shape arms, then writes `{ [id]: { size } }` whole at `VIEW_DRAG_ADDRESS`/`DRAG_TIER`; `clearDrag` answers `committed` from `store.delete(VIEW_DRAG_ADDRESS, DRAG_TIER)` |
| 4 | same file · `viewDeclaredRoots()` | three entries | a fourth, `{ address: VIEW_DRAG_ADDRESS, tier: DRAG_TIER }`, and **no row in `viewConstraintDeclarations`** — the entry is the whole of it |
| 5 | same file · `subscribe`'s array | `[VIEW_PANES_ADDRESS, VIEW_ZONES_ADDRESS, VIEW_THEME_ADDRESS]` | gains `VIEW_DRAG_ADDRESS` **in the same hunk as hunk 1** (D-137) |
| 6 | `src/main/view-surface/index.ts` | `read` + three commit routes + `attach`/`detach` | `commitDrag(id: unknown, geometry: unknown)` and `clearDrag()`, the shape arms first, the record delegated |
| 7 | `src/shared/view-channels.ts` | five constants | `IPC_VIEW_DRAG_COMMIT = 'provident:view:drag-commit'` and `IPC_VIEW_DRAG_CLEAR = 'provident:view:drag-clear'` |
| 8 | `src/renderer/view-client.ts` | five bridge routes; `routeOf`'s name union and `send`'s route words three | the bridge gains both routes, `routeOf`'s union gains `'commitDrag' \| 'clearDrag'`, `send` and `ViewWriteOutcome`'s `route` gain `'drag'`, and the client gains `commitDrag`/`clearDrag` answering `ViewWriteStatement` |
| 9 | `src/main/main.ts` + `src/main/preload.ts` | four `ipcMain.handle(IPC_VIEW_*)` sites after the batch; four request members in the `view` block | two more of each: `(_event, id, geometry) => viewSurface.commitDrag(id, geometry)` and `() => viewSurface.clearDrag()`, the import line widened; the surface's options, store and push unmoved (D-112) |
| 10 | `src/renderer/secure-panels.ts` | `view?` carries `read` + three commits + `onChanged`, the same text as the preload's block | the same two members, the same text, in the same edit as hunk 9 (D-112) |

**NOT ONE HUNK TOUCHES THE GUARD, THE BATCH OR A COMPOSER**: `src/main/data/surface.ts` reads the roots it is handed, `src/main/main.ts`'s batch gains no declaration, and `composePanes` keeps its merge for the `file` commit alone (D-101, D-135, D-132).
