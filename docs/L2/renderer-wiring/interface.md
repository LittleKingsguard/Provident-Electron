# L2 — `renderer-wiring`: the tab record's own drive, the drag's two phases at an address, and the ghost the delivery paints

- **Layer:** L2 · **Module:** `renderer-wiring` · **Units:** `focus-retirement`, `pane-drag-temp` and the tab act's one row · **Branch:** `strata` (D-6) · **Rev:** 8 — **THE READ-OUT IS THE DELIVERY'S AND THE TWO DECLARATIONS ARE STATE-CHECKED** (`D-129`; `D-126`'s `F3`, `F5`, `F9` — and `F6`/`F8`/`F10`/`F11` are NOT this pass): §1's two `start*` rows carry the new hand-out, §2's turn table gains `renderPaneSize`, §4's sink paragraph states the DELETION, §6 carries `PS-3`'s re-grain and the `RS-1`…`RS-4` file. Rev 7 — **THE `focus` ACT WRITES ONE ROW OF THE TAB RECORD AND NO LONGER COMPOSES A RECORD** (the user's instruction: *"Break out the elements of the composer that are needed for the repairs and make them separate functions"*; `D-142`'s settled `(b)`, whose second arm — *"finds a per-tab address whose ancestry can be enforced"* — `D-156`/`D-157` built; `D-158`, `D-159`): §1's `case 'focus'` row and §5's first bullet state the surface — one `data.write` at `['tabs', <id>]` at `file`, the seat append and the activeness normalisation the RECORD's repairs', and the answer the record as RE-READ (`D-70`) — while §6's `S-9` row carries the re-grain `DC-6` and `S-9` owe. **THE COMPOSER IS THIS PAGE'S AND `D-155`/`D-158`/`D-159`'s "KEPT" IS ANOTHER FUNCTION'S**: those rows rule on `src/main/tabs-record/index.ts`'s private nine-line `composeRecord(order, entries)`, which stands untouched; the renderer's `composeRecord(reading, seat)` is the one deleted here. Rev 6 — the page's SECOND SUBJECT RESTORED BESIDE THE DRAG'S, never instead of it (D-147 finding `(b)`): §5 is re-grained to the tab record's own push, the re-read and the terminals it drives, and the drag claims it displaced move to §2.1 unchanged — while Rev 5's one ghost arm (D-145) and rev 3's two phases (D-132, D-137, D-138, D-144) stand, and no claim of any of them is withdrawn at rev 7.
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
| its `case 'focus'` | `provident.focus`, through `src/main/mcp-server.ts`'s `focusHandler` | the tab record's **ONE ROW**, written at `['tabs', <id>]` at `file` through the `data.write` passthrough and answered as the record RE-READ (`D-158`, `D-159`, `D-70`; §5) |
| `dataRoute` | the five `case 'data.*'` arms, the `focus` act — and, from this change, the GHOST's one read | forwards to `window.provident.data`'s five routes and composes nothing (D-112, D-132) |
| `startGutterAffordance` | `main()`, once, after the first envelope load | `{attached}`, **and from this change TWO turns** the shape's delivery calls: the ghost's, and `renderPaneSize` — the read-out's ONE writer, which replaces the sink's `write` (§2, §4) — while it holds the affordance, the pane ELEMENT (`elementForNodeId(GUTTER_TARGET_ID)`) and the composition `createPaneDrag({view, ghostTarget}, source)` (§2, §3) |
| `startViewShape` | `main()`'s last steps, one registration plus ONE stated `fill()`, and now TWO turns as its second and third arguments | the appearance application on every delivery — **the ghost turn and the read-out turn beside it**, in the same subscription body and no second registration (D-97, D-137, D-90) |
| `startTabsClientInstrument`, `driveTabsLandingPage`, `themeWiringRole`, `overlayWiringRole`, `zoneSizeConstraint`, `zoneSizeRepair`, `mintTabId`, `closeTab` | their own callers — the first two are DRIVEN, by the tab record's own push and the boot's one read (§5) | **untouched by this unit**, and the tab drive is this page's second subject (D-127, D-142, D-131) |

The clients this module holds are `getTabsClient()`, `getViewClient()`, `getModuleClient()` and `getSecurityClient()`, each one per-realm
reading a delivery replaces whole (D-88, D-92); the view client gains the record's two drag routes — `commitDrag(paneId, {size})` and `clearDrag()` — and gains no read (§3; D-144, D-133).

## 2. The composition's turns, after the change

`createPaneDrag` keeps ONE closure binding (the wiring-held view client) and one bookkeeping `Map` (§4); every turn below is total over an absent or throwing shape — the declared degradation, never a throw (`D-95`, `§3.2 F-8`). **AND THIS PAGE HAS TWO READERS, WHICH IS WHY IT CARRIES TWO SUBJECTS** (D-147): the turns below are the DRAG composition's, while the write the `focus` act makes and everything that follows it — the record's own push, the re-read, the terminals it drives — is §5's, because it is ONE subscription body and no turn of this composition (D-142, D-137).

| Turn | The seam the wiring hands it | The route it sends | Address · tier | What answers once the turn is over |
|---|---|---|---|---|
| `move(gestureId, preview)` | the affordance's ONE preview seam, `valid: true` arm (§2.1) | `view.commitDrag(DEFAULT_PANE_ID, {size})` — `size` is the preview's own clamped `value` | `['drag']` · `temp` | one member naming the pane: `{ [paneId]: { size } }` — ONE write per placement change (D-137) |
| `rightClick` / `cancel` — the ERASE | the same seam, `valid: false` arm (§2.1) | `view.clearDrag()` — **skipped, that route only, where this gesture has already ended** | `['drag']` · `temp` | `absent`: the family ENDS, and exactly one ending per gesture (§4) |
| `release(gestureId, final, sink)` | the affordance's `commit` seam | the SINK, then `view.commitPane(DEFAULT_PANE_ID, {size})`, then `view.clearDrag()` — **skipped only where a refusing arm sends nothing at all** | `['panes']` · `file`, then the `temp` ending | the durable placement, then `absent` at `temp` — one datum per family and no in-process value outliving its turn (D-132, row `5`). **TWO REFUSING ARMS SEND NO ROUTE AND NO SINK — an unusable `final`, and a standing geometry the clamp answers `NaN`** (`§3.2 F-8`, `§2.1 A`'s E3 gate): each bounded, and the next placement change replaces a reading either leaves standing |
| `renderGhost()` | the shape's ONE delivery — `startViewShape`'s subscription body | `dataRoute('read', {path:['drag']})`, a READ and no write | the ask is the address; nothing is written at any tier | the declared transient declaration on the pane element (§3) |
| `renderZone()` — **unmoved** | the same delivery, the same body | no route: it reads the delivered `['zones']` family off the shape | none | the layout call, exactly as it stood (D-92, `M-4`) |
| `renderPaneSize()` | the same delivery, the same body — the **THIRD** call, beside `theme.apply()` and the ghost turn | **no route at all**: it reads a `'record'` `['panes']` family (a `'default'` arm is a family the record did not answer, so it paints nothing) through the client's own `paneSizeOf(DEFAULT_PANE_ID)` and writes ONE `state-slice` `content` on the authored status node — and SKIPS the write where the node already carries it (`authoredSettingOf`, the state check) | the authored `#gutter-status` node, no tier and no store address | the pane's size, as the RECORD holds it — the sink's clamped figure is no longer its author (§4, `D-129`) |

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
**AND `D-138`'S TWO PHASES STAY** (transcribed here since §5 is the tab record's): the drag-update phase writes `temp` once per placement change and commits nothing, the release phase commits `file` exactly once through the sink's own turn, one OWNER holds the datum (`['panes']` at `file`) with the transient ended by the FIRST ending turn, and *"the drag-update, release-commit style should stay"* — the instruction behind "one event updating the pane location data" was about COLLISION, never about removing a turn; **the ending is not a second commit** (`clearDrag` writes no placement, judges no value, carries no geometry) and any other writer's change reaches this realm through the same push (`D-138`, correcting `D-137`).

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
  `data-ghost="temp"` (ASM-3's spelling) — set and removed on that live element, exactly the class `applyPreview`'s style write is: no graph write, no element created, no re-render mid-gesture, and `get_rendered_html` serialises the live mount.
- **Which delivery drives it.** `IPC_VIEW_CHANGED` → `view.onChanged` → the client re-reads and adopts → `startViewShape`'s
  ONE subscription body calls the ghost turn beside `theme.apply()`. The composition registers no subscriber, and the root is
  covered because the record's subscription array gained `['drag']` in the same edit as the address (`D-137`, `L1 §5 R-2`).
- **Fail-safety, with no delivery and with a broken one.** EVERY arm is CLOSED BUT ONE, and the exception is stated rather than
  smoothed (`signatures.md` §1, which already spells it: *"paints nothing, removes nothing"*): no `data` member (this realm's own
  `store-unreachable`), a thrown or rejected route, `absent`, a ledger arm, a `_tier` that is not `temp`, a node naming another
  pane and a non-finite size each REMOVE the declaration and throw nothing — while **a pane element that will not take an
  attribute RETURNS ahead of the paint and removes NOTHING**: a painted `data-ghost="temp"` SURVIVES that delivery, and such a
  target is one this turn can never clear (ASM-RW-3; `renderer.ts`'s `settleGhost`). **A delivery that never arrives paints
  nothing** (`fill()` applies nothing, so no boot paints a ghost), and a delivery lost AFTER one was painted leaves it
  standing until the next one: no poll, no timer and no retry stands in this path, so a lost push is a STALE ghost, never a
  fabricated one — the staleness `D-117` books, measured by `P-3`/`P-4` rather than asserted. A superseded turn's answer paints nothing (each turn carries an epoch).

## 4. What is deleted, what remains, and why

- **The `Map`-as-storage role is DELETED WHOLE**, with the `previews` map and the `previewOf` member it made readable: the
  placement is an ADDRESS now, so "what does the drag hold for this gesture?" is asked of the readout at the address — the
  same question the ghost asks — and a member whose only reader is the row asserting it is the `D-70` class (ASM-RW-4).
- **ONE bookkeeping `Map` REMAINS, and it is not storage**: `gestures` carries ONE ENDING FLAG for the instance's one
  gesture, cleared by `move` and set by whichever ending turn ends the reading first, so EXACTLY ONE ENDING holds — the
  address cannot say it, because `['drag']` is keyed by PANE ID and is GESTURE-BLIND (`F-6`).
- **Nothing else is added**: no MCP tool, resource, group or bridge member; no tenth `view` member; no secure-store address, declaration, route or member (D-132, D-123, D-18).
- **The `release`'s sink and file commit are UNMOVED** in form and order: the sink is invoked first, `commitPane` follows,
  and the ending of the reading is a third statement AFTER both (`§2.1`'s `D-138` transcription; D-132, `D-138`). **AND THE SINK, named in this document
  and never defined, WAS ONE `applyCommand` `state-slice` WRITE ON THE AUTHORED STATUS NODE** (`GUTTER_STATUS_ID`, carrying the
  clamped value, `console.error`ing any status but `'applied'`) — the release's ONLY managed-channel write, and **the read-out WAS written by the sink and by nothing else**. **AND THIS PASS DELETES IT** (`D-129` case (b); `D-126`'s `F3`): the gesture's clamped figure and the record's stored size AGREE after a LANDED commit — `panesMustStand` never coerces a standing value (`D-105`) — and come APART at a second boot, at a refused commit, at another writer's act and at a refusing release, and in every one **the RECORD is authoritative**. So the wiring deletes `write` and hands `release` NO sink, while `R3` keeps its position and the seam keeps its signature because `demo/pane-drag-demo/demo.ts` still supplies one (a realm with no crossing and no delivery to paint from, D-118) — and the read-out is `renderPaneSize`'s (§2) and the DELIVERY's alone.

## 5. The act's ONE ROW, and the renderer following the write — the record's own push, the re-read, the terminals driven

- **THE ACT'S WRITE IS ONE ROW, AND THE RECORD'S REPAIRS OWN EVERY OTHER BYTE** (`D-158`, `D-159`, `D-138`): the route hands `{path: ['tabs', <the row's own id>], tier: 'file', value: <that row>}` to `dataRoute('write', …)` verbatim — one store verb, one commit, one delivery — where the value is the reading's row for that id **whole** with `active: true` and `lastActiveAt` stamped, or, where the act OPENS, the row `{id, target, active: true, lastActiveAt}` and neither `label` nor `error` — the first because the record's three field pairs fill it in both `healedFamily` scopes, the second because `error` is an OPTIONAL member (`src/shared/types.ts`) that no repair supplies, so a tab that has not failed carries none. **NO `order` IS WRITTEN**: the key leaves `order` unseated, `order-names-its-tabs` refuses it inside the commit and its `'seat'` repair APPENDS the id (position a READING and not a law, D-159), and `exactly-one-active` DEACTIVATES the row that stood active — the row STAYS and its flag moves (`healedFamily`; `D-142`'s "drop the older one" is the FLAG) — so the caller clears no member, stores no seat id and mints nothing (`D-129`, `D-142`). **ONE ROW AND NOT TWO LEAVES**: `active` beside `lastActiveAt` would be two commits, two passes and two logs for one act, and a landed `active` with a refused stamp is a state no pair refuses and no repair heals.
- **ONE subscription body takes the push, and the push carries an ADDRESS and never a value**: `startTabsClientInstrument` registers `client.subscribe((reading) => holdTabsReading(reading, runtime))`, and its ONE stated boot read hands the same holder its first reading (`void client.read().then(…)`, started last and never awaited) — so the record lands in ONE place whichever way it arrives, and because a delivery is an address the client has already RE-READ the record when the body runs (`src/renderer/tabs-client.ts`'s `subscribe` site says it in one line): **the re-read is the only correct answer to it**, and this body composes nothing, holds no record and writes no byte (`D-137`, `D-142`).
- **The re-read drives the tab terminals**: `holdTabsReading` holds the reading and calls `driveTabsLandingPage(tabsClientReading, runtime)`, which gives each authored terminal ONE `css.style` state-slice — `display: 'block'` where the record's own witness stands and `'none'` where it does not — for the landing page and the error page alike, resolved through `Runtime.elementForNodeId` and authored by the envelope, never here: no element, no class, no text (`D-92`, `D-76`).
- **What is driven is the REPAIR's answer, never the value the renderer sent**: `exactly-one-active` normalises the pair inside the act's own commit, so the record the push delivers is the record that STANDS; the witness is derived from that record's ROWS, a reading that is not `committed` drives NOTHING (the envelope's authored `display`, or the last record's word, stands), and the act's own re-read is the ANSWER's and never a delivery — it does not feed this holder (`D-127`, `D-129`, `D-142`). **AND THAT AFTER-READ STAYS OWED ONCE THE ACT WRITES ONE ROW** (`D-159`, `D-70`): the answer is the record that STANDS, and neither the `'seat'` repair's append position nor the survivor `exactly-one-active` keeps is the act's to predict — one read before the write serves the seat and the row, one read after it is the answer.
- **Nothing else follows it**: the composition registers no subscriber, the drive authors no node, and the registration is held only for the P1-P7 release discipline — a delivery that never arrives leaves what already stood in place, never a blank it invented (`D-92`, `D-127`).

## 6. This module's batteries — the dispositions, LANDED ones and THIS PASS'S OWED ones, in one table because a reader must be able to tell them apart

`tests/pane-drag-compliance.test.ts` is a **marked** file and `D-144`'s ruling binds it: the leg's green is the whole tree's, so a marked row pinning a superseded middle **re-grained IN PLACE, the marker standing, no id retired** (D-30, D-40).

| Row(s) | File | Disposition | What it measures now |
|---|---|---|---|
| `M-5` | `tests/pane-drag-compliance.test.ts` | **re-grained**: the release is sink → `commitPane` → `clearDrag`, in that order | the move's `commitDrag` and the ending's order, read off the route log |
| `M-10` | same | **re-grained in place** — the row that pinned the closure's preview now pins the ADDRESS: one `commitDrag` per move, the closure holding no preview | the move turn's one write, and `previewOf`'s ABSENCE from the surface |
| `M-6`, `F-4` | same | **re-grained**: the erase turns are `clearDrag`, at most one per gesture, and an erase on a gesture with no move ends an already-absent family | one ending per gesture on both erase turns |
| `F-6` (valid release · right-click · cancel · reset) | same | **re-grained, its RELEASE terminal FLIPPED** from the erase's ABSENCE to the release's OWN ending, after its file commit | the four terminals, the flipped one reading the RELEASE's ending |
| `M-12`, `F-5`, `R-4`, `M-2` | same | **re-grained lightly**: the lifecycle reads the route log and the address, and a refused `final` sends no route at all | the routes' presence in the log, and the refused `final`'s silence |
| `P-PD-SM-1` (9 cells) · `P-PD-SM-3` (8 cells) | same | **re-grained**, counts unmoved: the move cells read the address, the erase cells read the route log and the address's own end | both registers, cell for cell |
| `D-117/LIVE-READ` (gating) | same | **re-grained with `SINK-1` RE-READ, never retired**: ONE sink invocation at the release, and neither drag turn is ever handed the sink | one sink write at the release and no sink at either route |
| `M-1`, `M-3`, `M-4`, `M-11`, `I-3`, `F-8`, `R-1`, `R-2`, `R-3`, `R-5`, `P-PD-IM-1/2`, `P-PD-SM-2`, `P-PD-SM-4`, `P-PD-TP-1/2` | same | **untouched CLAIM** — the reads, the factories, the register counts (8 rows / 91 drives, the totals row and its `afterAll` print) and the no-bytes-move scans; the local `PaneDragSurface` casts are already `as unknown as`, because it declares the ghost turn | what it always measured |
| `S-9` · `DC-6` | `tests/fork-store-reads.test.ts` · `tests/renderer-delivery-compliance.test.ts` | **re-grained, and `D-161` LANDED BOTH** — the "OWED" this row carried was `D-160`'s (`D-158`, `D-159`, `D-161`): `S-9`'s `/composeRecord\s*\(/` anchor becomes the LEAF address (`path: ['tabs', <id>]`) plus the composer's ABSENCE, so the four absences beside it keep a REAL subject — its `store.resolve(`, `tierRead(` and `createPaneDrag(` scans unmoved; `DC-6` becomes the ROW's round trip through the act — one `data.write` at `['tabs', <id>]` at `file`, the value's own keys the row's, the standing active row ABSENT from the write and `active: false` in the ANSWER, `order` read off the ANSWER, and TWO `tabs.read()` calls in total | 28 rows unchanged · 9 rows unchanged, and the realm double now applies the two repairs to a ROW (`design.md` §8) — **AND ONE `mcp-surface` CARRIER IS ROUTED, NOT TAKEN**: `tests/focus-tool.test.ts`'s `wiringTabsWriteSites` reader keeps its `callSite` arm green on `['tabs', row.id]` but its `address` arm requires `]` straight after `'tabs'`, and the row's own prose still says "whole-record write" (`D-3`) |
| its literal, `A-5` | `tests/theme-act.test.ts` | **re-grained, and one row ADDED**: the literal carries the SEVEN routes, and `A-5` drives `commitDrag`/`clearDrag` through it to the store's `['drag']` family at `temp` and to `absent` after the clear | the two routes' round trip through the client's own literal |
| `DC-8(a)`, `DC-8(b)` | `tests/renderer-delivery-compliance.test.ts` | **added — the ghost's delivery turn**: `(a)` the declaration appears for a `temp` node naming the pane and is removed by the SEVEN arms that reach a removal, while a target that cannot take attributes is driven for its TOTALITY alone — it throws nothing and removes nothing (§3); `(b)` the shape's subscription body CALLS the turn, beside `theme?.apply()`, and the one construction carries `ghostTarget` | the paint, the removal arms, the attribute-less totality probe and the call site |
| its own rows | `tests/op-command-unwrap.test.ts` | **untouched** — `handleRequest`'s `op` and `load` cases and no reading this change reaches | 6 rows, unchanged |
| `PS-1`…`PS-4` | `tests/unit/renderer-wiring/preview-seat.test.ts` | **added — the SEAT** (`D-146`): unmarked and gating, driving `startGutterAffordance(runtime)` over a stub runtime and a stub `window.provident` — a valid observed move sends ONE `commitDrag` and no `clearDrag`, a revert ONE `clearDrag` and no `commitDrag`, a second ending turn nothing, and the ghost turn is RETURNED with ONE key at both seats | the seat's two routes, its ending flag and its hand-out (`design.md` §8) |
| `PS-3` — **RE-GRAINED BY THIS PASS'S LANDING, AND OWED** (`D-129`) | same | **re-grained in place, never retired**: its `live.commands.length` clause measures the SINK's `applyCommand` and must read **`0` — the app hands `release` no sink**; its property — the ending flag gates `E3`'s ROUTE alone and never the release's other statements — survives on the two counts it already makes (`commitPane` 1, `clearDrag` 1) | the flag's reach, and the app's ZERO read-out writes at a release |
| `RS-1`…`RS-4` — **OWED, and the only rows that carry this pass's three fixes** | `tests/unit/renderer-wiring/state-checked-paint.test.ts` | **to be authored, unmarked and GATING** (`D-40`), its path added to `renderer-wiring`'s `strata/modules.json` entry in the same edit (`D-146`): `RS-1` the read-out is the DELIVERY's and the sink's write is gone; `RS-2`/`RS-3` the two declarations REPAINT A REBUILT SURFACE, with the intact-surface control — **and these two are the tree's FIRST read-back of a `props.<name>` write, which nothing measures today**; `RS-4` totality, including the fail-open arm on an unreadable surface — **and the theme's `declared` member re-words with it**, from *"moved since the last one applied"* to *"a paint was owed"*, while `written`/`status` keep their meaning (`design.md` §4) | the three fixes' whole subject (`design.md` §8) |

**THE FILES AND THEIR MARK STATUS, AS LANDED**: `pane-drag-compliance` is MARKED and its 130 rows are green, reporting **on notice** (D-30); `A-5`, `DC-8(a)`, `DC-8(b)` and `PS-1`…`PS-4` stand in **unmarked GATING** files, every row authored after the `D-30` sweep gating by construction (D-40, D-144, D-145, D-146). **AND THIS PASS'S FIVE MOVES ARE OWED, NOT LANDED — NO `src/` BYTE HAS MOVED**: `PS-3`'s `1 → 0` re-grain and the four `RS` rows are the landing pass's, and the reds that pass records are the landing's absence (`D-160`'s own discipline, `design.md` §8).

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
| ASM-RW-3 | the ghost fails CLOSED on every arm it can see — **one exception, stated: a target that will not take an attribute paints nothing and removes nothing (§3)** — and a lost delivery leaves a stale declaration rather than a fabricated one | leaving a standing declaration until some reading arrives, which is a ghost of a gesture that is over; or a poll or timer, which `D-82` clause 4 forbids |
| ASM-RW-4 | `previewOf` is deleted with the `Map` it read, because the address answers the same question and a member no caller uses is the `D-70` class | keeping `previewOf` as a "last sent" mirror, a second copy of a value the address owns and a shape that could disagree with it |
