# L2 — `renderer-wiring`: the drag's two phases at an address, and the ghost the delivery paints

- **Layer:** L2 · **Module:** `renderer-wiring` · **Unit:** `pane-drag-temp` · **Branch:** `strata` (D-6) · **Rev:** 3 — the
  whole document re-grained onto `L1 §3`/§7 `E-8`: the per-move turn WRITES `['drag']` at `temp`, the gesture's end ENDS that
  family, the release keeps `commitPane` then ends the reading, and the ghost is painted from the DELIVERY's reading
  (`D-132`, `D-137`, `D-138`, `D-144`). Rev 2 was `focus-retirement`'s landed head; no earlier claim about the tab drive, the
  appearance application or the zone render turn is withdrawn.
- **Ceiling:** 150 lines (class max); at the ceiling it splits by owner and is never appended (D-1, D-2)
- **Charter:** the user's ruling as this module transcribes it — *"Gutter and pane drag should write to temp while in process
  and commit to file during the sink on release"* — so the gesture keeps its TWO PHASES and its in-process value becomes an
  ADDRESS a delivery can read, never a closure's private state (D-132, D-138)
- **Write scope:** `docs/L2/renderer-wiring/` and this module's batteries (brief §3). `src/**` is read-only at this layer,
  and `provident-ssr`/`provident-storeroom` are never modified (D-5)

## 1. The module's surface as it stands

Sites are named, never offsets (D-41). Unless a path is given, the site is `src/renderer/renderer.ts`.

| Entry point | What drives it | What it answers |
|---|---|---|
| `handleRequest`'s `switch` | the main process's IPC invoke, one case per agent-facing method | the one `RpcReply` for that method (D-112) |
| its `case 'focus'` | `provident.focus`, through `src/main/mcp-server.ts`'s `focusHandler` | the tab record, written through the `data.write` passthrough (D-141, D-142) |
| `dataRoute` | the five `case 'data.*'` arms, the `focus` act — and, from this change, the GHOST's one read | forwards to `window.provident.data`'s five routes and composes nothing (D-112, D-132) |
| `startGutterAffordance` | `main()`, once, after the first envelope load | `{attached}`, **and from this change the ghost turn** the shape's delivery calls: it holds the affordance, the pane ELEMENT (`elementForNodeId(GUTTER_TARGET_ID)`) and the composition `createPaneDrag({view, ghostTarget}, source)` (§2, §3) |
| `startViewShape` | `main()`'s last steps, one registration plus ONE stated `fill()`, and now the ghost turn as its second argument | the appearance application on every delivery — **and the ghost turn beside it**, in the same subscription body (D-97, D-137) |
| `startTabsClientInstrument`, `driveTabsLandingPage`, `themeWiringRole`, `overlayWiringRole`, `zoneSizeConstraint`, `zoneSizeRepair`, `mintTabId`, `closeTab` | their own callers | **untouched by this unit** (D-127, D-142, D-131) |

The clients this module holds are `getTabsClient()`, `getViewClient()`, `getModuleClient()` and `getSecurityClient()`, each one
per-realm reading a delivery replaces whole (D-88, D-92); the view client gains the record's two drag routes —
`commitDrag(paneId, {size})` and `clearDrag()` — and gains no read (§3; D-144, D-133).

## 2. The composition's turns, after the change

`createPaneDrag` keeps ONE closure binding (the wiring-held view client) and one bookkeeping `Map` (§4); every turn below is total over an absent or throwing shape — the declared degradation, never a throw (`D-95`, `§3.2 F-8`).

| Turn | The seam the wiring hands it | The route it sends | Address · tier | What answers once the turn is over |
|---|---|---|---|---|
| `move(gestureId, preview)` | the affordance's ONE preview seam, `valid: true` arm (§2.1) | `view.commitDrag(DEFAULT_PANE_ID, {size})` — `size` is the preview's own clamped `value` | `['drag']` · `temp` | one member naming the pane: `{ [paneId]: { size } }` — ONE write per placement change (D-137) |
| `rightClick` / `cancel` — the ERASE | the same seam, `valid: false` arm (§2.1) | `view.clearDrag()` — **skipped, that route only, where this gesture has already ended** | `['drag']` · `temp` | `absent`: the family ENDS, and exactly one ending per gesture (§4) |
| `release(gestureId, final, sink)` | the affordance's `commit` seam | the SINK, then `view.commitPane(DEFAULT_PANE_ID, {size})`, then `view.clearDrag()` — **skipped only where a refusing arm sends nothing at all** | `['panes']` · `file`, then the `temp` ending | the durable placement, then `absent` at `temp` — one datum per family and no in-process value outliving its turn (D-132, row `5`). **TWO REFUSING ARMS SEND NO ROUTE AND NO SINK — an unusable `final`, and a standing geometry the clamp answers `NaN`** (`§3.2 F-8`, `§2.1 A`'s E3 gate): each bounded, and the next placement change replaces a reading either leaves standing |
| `renderGhost()` | the shape's ONE delivery — `startViewShape`'s subscription body | `dataRoute('read', {path:['drag']})`, a READ and no write | the ask is the address; nothing is written at any tier | the declared transient declaration on the pane element (§3) |
| `renderZone()` — **unmoved** | the same delivery, the same body | no route: it reads the delivered `['zones']` family off the shape | none | the layout call, exactly as it stood (D-92, `M-4`) |

**§2.1 — BOTH WRITES SEAT AT THE ONE PREVIEW SEAM, AND ITS OWN `valid` FLAG IS THE DISCRIMINATOR.** `applyPreview`
(`GutterAffordanceOptions.applyPreview`) is the affordance's ONE preview call and L1 §3's seat; its `PreviewState`'s `valid`
member is the module's OWN declaration of the arm — every mid-drag move is written `valid: true` (`onMoveTurn`) and every
revert is built by `revertStateFor` with **`valid: false`** (its docblock names that spelling as `§3.2 F-10`'s subject
revert). So `valid === true` IS the placement change (→ `move` → `commitDrag`) and `valid === false` IS the gesture's end
(→ `cancel` → `clearDrag`), on all three abandon arms (`resetArm`, `dropArm`, `onCancelHook`) wherever a revert reading exists
— **TOTAL: no counter arithmetic, no session read, no guess and no second listener on the gesture's events** (the `D-126`
class untouched, D-30).
Two further arms fall out of the composition's own gate: a preview whose `value` is not a finite non-negative number writes
nothing, and a non-resizable gesture writes no reading (its cancel/drop still ends an already-absent family — `F-4`'s class).
**ONE ENDING, AND THE KEY COMES FROM THE CLOSURE.** The wiring passes ONE constant key at BOTH seats — the `commit` seam's
release and the preview seam's two arms — taking it from its own closure (the affordance element's authored id; the handle's
`id` is a NUMBER, so `gestureIdOf` retires, and an id-less element answers the same constant), and `move` CLEARS the flag.
Whichever ending turn sends `clearDrag` first sets it, and a later ending turn SKIPS THAT ONE ROUTE AND NOTHING ELSE: a
release ends it; a reset sends the release's `commitPane` and the revert's erase skips; a drop-then-release has the erase end
it and the release still commit; every later gesture re-opens the flag at its first move. **The sink and the commit are never
suppressed** (SINK-1, `F-5`), the seam KEEPS its inline-style preview write on every arm (the routes are added, never
substituted), and a revert reading that is `null` (`§3.2 F-10`, non-finite) reaches the seam as nothing at all — no route, no
flag, and no standing reading to lose, because the same gates keep `move` from writing one.

**WHAT THE CROSSING JUDGES, AND WHAT IT DOES NOT.** The record's shape arms answer `malformed-pane` and
`malformed-geometry` for the two drag routes; **nothing judges a VALUE at `temp`** — no declaration and no pair stand there,
so no standing value is coerced (`D-132`, `D-105`). The tier's one judgement is the declared-root guard's, on the entry
alone (`D-101`). No turn of this module touches the secure crossing (D-132, D-123).

## 3. The ghost's contract — the delivery's reading, never a member of its own

- **What it asks.** ONE `data.read({path: ['drag']})` through this realm's existing `dataRoute` pass-through, inside the turn
  the view record's push caused. It invents no member: no `dragOf`, no fifth `view` read, no `data` member (`D-133`, `D-18`).
- **What it reads.** The answer's node and THAT node's own `_tier` (`D-144`): the declaration is painted iff the node is a
  branch whose `_tier` is `temp`, carrying the member naming the pane the release commits (`DEFAULT_PANE_ID`, ASM-RW-1) with a
  finite non-negative `size`. One token, never a set.
- **What it paints.** ONE declared transient declaration on the pane element the wiring already holds — the attribute
  `data-ghost="temp"` (ASM-3's spelling) — set and removed on that live element, exactly the class `applyPreview`'s style
  write is: no graph write, no element created, no re-render mid-gesture, and `get_rendered_html` serialises the live mount.
- **Which delivery drives it.** `IPC_VIEW_CHANGED` → `view.onChanged` → the client re-reads and adopts → `startViewShape`'s
  ONE subscription body calls the ghost turn beside `theme.apply()`. The composition registers no subscriber, and the root is
  covered because the record's subscription array gained `['drag']` in the same edit as the address (`D-137`, `§5 R-2`).
- **Fail-safety, with no delivery and with a broken one.** EVERY arm is CLOSED: no `data` member (this realm's own
  `store-unreachable`), a thrown or rejected route, the `absent` arm, a ledger arm, a `_tier` that is not `temp`, a node
  naming another pane, a non-finite size, and a pane element that will not take an attribute — each REMOVES the declaration
  and throws nothing. **A delivery that never arrives paints nothing** (`fill()` applies nothing, so no boot paints a
  ghost), and a delivery lost AFTER one was painted leaves it standing until the next one: no poll, no timer and no retry
  stands in this path, so a lost push is a STALE ghost, never a fabricated one — the staleness `D-117` books, measured by
  `P-3`/`P-4` rather than asserted. A superseded turn's answer paints nothing (each turn carries an epoch).

## 4. What is deleted, what remains, and why

- **The `Map`-as-storage role is DELETED WHOLE**, with the `previews` map and the `previewOf` member it made readable: the
  placement is an ADDRESS now, so "what does the drag hold for this gesture?" is asked of the readout at the address — the
  same question the ghost asks — and a member whose only reader is the row asserting it is the `D-70` class (ASM-RW-4).
- **ONE bookkeeping `Map` REMAINS, and it is not storage**: `gestures` carries ONE ENDING FLAG for the instance's one
  gesture, cleared by `move` and set by whichever ending turn ends the reading first, so EXACTLY ONE ENDING holds — the
  address cannot say it, because `['drag']` is keyed by PANE ID and is GESTURE-BLIND (`F-6`).
- **Nothing else is added**: no MCP tool, resource, group or bridge member; no tenth `view` member; no secure-store address, declaration, route or member (D-132, D-123, D-18).
- **The `release`'s sink and file commit are UNMOVED** in form and order: the sink is invoked first, `commitPane` follows,
  and the ending of the reading is a third statement AFTER both (§5; D-132, `D-138`).

## 5. The two phases STAY — `D-138`'s statement, transcribed

- **The drag-update phase** writes `temp` once per placement change and commits nothing; **the release phase** commits `file`
  exactly once, through the sink's own turn. *"The drag-update, release-commit style should stay"* — the instruction behind
  "one event updating the pane location data" was about COLLISION, not about removing a turn (`D-138`, correcting `D-137`).
- **One OWNER for the datum and two phases for the gesture**: the datum's owner is `['panes']` at `file`, and the in-process
  reading is a transient at `temp` ended by the FIRST ending turn — the release's where nothing ended it earlier and where
  neither refusing arm above fired — with any other writer's change reaching this realm through the same push (`D-137`).
- **The ending is not a second commit**: `clearDrag` writes no placement, judges no value and carries no geometry, and a release whose `final` the E3 gate refuses sends no route at all (`§3.2 F-8`).

## 6. This module's batteries — dispositions, and the red each row carries until `src/**` lands

`tests/pane-drag-compliance.test.ts` is a **marked** file and `D-144`'s ruling binds it: the leg's green is the whole tree's, so a marked row pinning a superseded middle **re-grains IN PLACE, the marker standing, no id retired** (D-30, D-40).

| Row(s) | File | Disposition | The red at this head |
|---|---|---|---|
| `M-5` | `tests/pane-drag-compliance.test.ts` | **re-grained**: the release is sink → `commitPane` → `clearDrag`, in that order | the move sends no `commitDrag` — the row reds before it reaches its ending assertion (`clears` 0) |
| `M-10` | same | **re-grained in place** — the row that pinned the closure's preview now pins the ADDRESS: one `commitDrag` per move, the closure holding no preview | the move turn sends no `commitDrag`, and `previewOf` is not on the surface |
| `M-6`, `F-4` | same | **re-grained**: the erase turns are `clearDrag`, at most one per gesture, and an erase on a gesture with no move ends an already-absent family | zero `clearDrag` from both erase turns |
| `F-6` (valid release · right-click · cancel · reset) | same | **re-grained, and its RELEASE terminal FLIPPED** — from asserting the erase's ABSENCE to asserting the release's OWN ending, after its file commit | the release's ending is missing, and the flipped assertion reads the order |
| `M-12`, `F-5`, `R-4`, `M-2` | same | **re-grained lightly**: the lifecycle reads the route log and the address, and a refused `final` sends no route at all | `R-4`/`M-12`/`F-5`: the drag routes never appear in the log; `M-2` is GREEN here and gates the landing (it asserts an absence the change makes true) |
| `P-PD-SM-1` (9 cells) · `P-PD-SM-3` (8 cells) | same | **re-grained**, counts unmoved: the move cells read the address, the erase cells read the route log and the address's own end | no drag write, so every move cell reds; `P-PD-SM-3`'s three absence cells (`04`/`06`/`08`) are GREEN here and gate the landing |
| `D-117/LIVE-READ` (gating) | same | **re-grained with `SINK-1` RE-READ, never retired**: ONE sink invocation at the release, and neither drag turn is ever handed the sink — a route call is not a sink write | the move turn makes no write and the ending is absent |
| `M-1`, `M-3`, `M-4`, `M-11`, `I-3`, `F-8`, `R-1`, `R-2`, `R-3`, `R-5`, `P-PD-IM-1/2`, `P-PD-SM-2`, `P-PD-SM-4`, `P-PD-TP-1/2` | same | **untouched CLAIM** — the reads, the factories, the register counts (8 rows / 91 drives, the totals row and its `afterAll` print) and the no-bytes-move scans are unmoved; the local surface interface's `PaneDragSurface` casts are already `as unknown as`, because it declares the ghost turn | none |
| the readings, `S-9` | `tests/fork-store-reads.test.ts` | **untouched**: its scans are over `store.resolve(`, `tierRead(` and the `createPaneDrag(` count (still declaration + one construction), and none of them moves | none |
| its literal, `A-5` | `tests/theme-act.test.ts` | **re-grained, and one row ADDED**: the literal carries the SEVEN routes, and `A-5` drives `commitDrag`/`clearDrag` through it to the store's `['drag']` family at `temp` and to `absent` after the clear | the client and the record carry neither route, so `A-5` reds at the route and not at the census |
| `DC-8(a)`, `DC-8(b)` | `tests/renderer-delivery-compliance.test.ts` | **added — the ghost's delivery turn**: `(a)` the declaration appears for a `temp` node naming the pane and is removed by every closed arm; `(b)` the shape's subscription body CALLS the turn, beside `theme?.apply()`, and the one construction carries `ghostTarget` | no `renderGhost` member, no call site, no `ghostTarget` |
| its own rows | `tests/op-command-unwrap.test.ts` | **untouched** — `handleRequest`'s `op` and `load` cases and no reading this change reaches | none |

**THE FILES AND THEIR MARK STATUS**: 26 red rows in the marked `pane-drag-compliance`, plus `A-5`/`DC-8` in two **unmarked
GATING** files — a row authored after the `D-30` sweep gates, so three gating reds stand until `E-8` lands as this pass's
deliverable, never "on notice" (D-30, D-40, D-144). `fork-store-reads` (28) and `op-command-unwrap` (6) are green, unchanged.

`tests/e2e/pane-drag-temp/` is L1's battery and not this module's own: `P-2` measures the erase ROUTE and `P-4` the ghost's
appearance and disappearance, one layer above this document (D-40, L1 §4). **AND TWO ROWS THIS CHANGE MOVES ARE NOT THIS
MODULE'S TO RE-GRAIN**, named so `R-5`'s rule reaches them (D-3, D-43): `demo/pane-drag-demo/demo.ts` calls `previewOf` twice
and `tests/demo-bundle.test.ts` carries the built bundle, both `demo-panes`' (`npm run typecheck` reaches `demo/`; D-118); and
the two TYPED `ViewClientBridge` literals in `tests/theme-declaration.test.ts` (`chrome`'s, D-112).

## 7. Assumptions, each with the alternative it rejected (D-1 §8)

`ASM-1`…`ASM-3` are L1 §9's and are cited as its; the four below carry this module's own prefix, `ASM-RW-n`, because L1's numbering reaches `ASM-4` and `app-shell`/`secure-panels` use `ASM-L2-n` for other claims here (D-1 §8).

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-RW-1 | the `temp` member is keyed by `DEFAULT_PANE_ID` — the pane the release commits — so the ghost asks about the member the file commit will write and the pane element is the one already held | keying it by the gesture id or by the pane element's own id (`gutter-target`), which would make the reading name a node the commit never touches (L1 `ASM-1`) |
| ASM-RW-2 | both drag writes seat at the affordance's ONE preview seam and its `PreviewState.valid` flag decides which: `valid: true` is the placement change, `valid: false` (the revert `revertStateFor` builds) is the gesture's end | the caller's veto `isDragValid` as the move's seat, which is per-move but names no abandon arm, leaving a cancelled gesture's reading standing; or a counter arithmetic that `onCancelHook` and an unaccepted `resetArm` defeat; or a second listener on the gesture's own events, the `D-126` two-authorities class |
| ASM-RW-3 | the ghost fails CLOSED on every arm it can see, and a lost delivery leaves a stale declaration rather than a fabricated one | leaving a standing declaration until some reading arrives, which is a ghost of a gesture that is over; or a poll or timer, which `D-82` clause 4 forbids |
| ASM-RW-4 | `previewOf` is deleted with the `Map` it read, because the address answers the same question and a member no caller uses is the `D-70` class | keeping `previewOf` as a "last sent" mirror, a second copy of a value the address owns and a shape that could disagree with it |
