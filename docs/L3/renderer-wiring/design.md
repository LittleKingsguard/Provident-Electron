# L3 — `renderer-wiring`: the module design

- **Layer:** L3 · **Module:** `renderer-wiring` · **Units:** `pane-drag-temp` and `focus-retirement` · **Branch:** `strata` (D-6) · **Rev:** 10 — **the page's SECOND SUBJECT RESTORED BESIDE THE DRAG'S, never instead of it** (D-147 finding `(b)`): §2 gains the other write this module makes — the `focus` act's ONE body, and the line that `exactly-one-active` owns the normalisation — §3 gains the `C1`–`C4` composition contract the source cites it for, §6 gains the guardrail that nothing is normalised here, and §8 records the seat row as LANDED. Rev 9 — the currency pass AFTER the landing (D-145): §4 states the ONE arm that removes NOTHING, the attribute-less target `G9` RETURNS at (D-41). Rev 7 — re-grained onto `docs/L1/pane-drag-temp.md` and `docs/L2/renderer-wiring/interface.md` rev 3: TWO PHASES, the in-process value an ADDRESS, BOTH drag writes at the ONE preview seam, the release ending the reading AFTER its `file` commit, the ghost a turn the delivery calls.
- **Rev 6's `focus-retirement` record is NOT withdrawn** — it stands, landed, in `strata/records/focus-retirement-unit.md` and the decisions it cites (D-46, D-143) — and rev 10 carries its SUBJECT back onto this page, because a whole re-grain of a two-subject page is a DELETION wearing a revision number (D-147).
- **Inputs:** L2 rev 6 §1–§7 (its §2 turn table, §2.1 the seat, §3 the ghost's contract, §4 the deletions, §5 the tab record's drive, §7 `ASM-RW-1`…`4`); `docs/L2/view-record/interface.md` §1/§2 (the `['drag']` root, the two routes); `docs/L2/store-tabs-record/interface.md` §6 (the client role: re-read after every delivery, and it holds no second record); `src/renderer/tabs-client.ts`'s `subscribe` site (a delivery carries an address and never a value); `docs/L1/tier-readout.md` (the per-node `_tier` readout); `docs/L1/focus-retirement.md` §3 (the retarget's interaction table); `D-132`, `D-137`, `D-138`, `D-144`, `D-105`, `D-126`, `D-117`, `D-101`, `D-112`, `D-133`, `D-70`, `D-9`, `D-30`, `D-40`, `D-41`, `D-18`, `D-129`, `D-136`, `D-139`, `D-140`, `D-141`, `D-142`, `D-146`, `D-147` · **Ceiling:** 150 lines (D-1) · **Status:** structure, pseudocode, guardrails; the exact declared text is `signatures.md`'s (brief §3, D-45) · **sites are named, never offsetted** (D-41).

## 1. The shape after the change

| Site | After the change | Cite |
|---|---|---|
| `createPaneDrag(backing, source)` | the closure holds ONE bookkeeping `Map` (`gestures`, the ending flag) and NO storage; its turns send the view client's routes; a NEW `renderGhost` turn reads `['drag']` once and paints on `backing.ghostTarget` | L2 §2, D-132, D-144 |
| `startGutterAffordance`'s `applyPreview` | the affordance's ONE preview call becomes this module's ONE WRITE SEAT (§2); its inline-style write is unchanged and the route arm follows it | L2 §2.1, D-138 |
| `startGutterAffordance`'s return | `{ attached, renderGhost }` — the turn is handed OUT, because the delivery that drives it is the shape's | L2 §3, D-92 `M-4` |
| `startViewShape(theme, ghost)` | the ONE `client.subscribe(…)` body calls `theme?.apply()` and the ghost turn beside it; `main()` hands it `gutter.renderGhost` | L2 §3, `DC-8(b)` |
| `dataRoute` | UNMOVED — it IS the ghost's one read route | D-112, L2 §3 |
| the view client | gains `commitDrag(paneId, {size})` and `clearDrag()`, and no read; that file is `store-view-record`'s (L1 §7 `E-2`) and is cited, never declared here | L2 §1, D-45 |
| the ONE construction | `createPaneDrag({ view: getViewClient(), ghostTarget: target }, source)` — `target` is `runtime.elementForNodeId(GUTTER_TARGET_ID)`, resolved beside the handle; one site, and the shape still rides it | L2 §3, `DC-8(b)` |
| everything else | `startSizeOf`/`boundsOf`/`defaultSizeFor`/`candidatesFor`/`renderZone`, the shape's own reads and every other `start*` role are UNMOVED | L2 §1, D-92 |

## 2. The module's two writes — the `focus` act's ONE body, and the drag's two turns at the affordance's ONE preview seam

`startGutterAffordance` holds the seat and the key; `createPaneDrag` holds the two turns. The affordance calls the seat with the `PreviewState` its own turn built (`src/shared/gutter-affordance.ts`: `onMoveTurn` writes `valid: true`; `revertStateFor` builds `valid: false`).

```
const GESTURE_KEY = GUTTER_AFFORDANCE_ID    // ONE constant at BOTH seats (the `commit` seam, the preview seam's two arms); the handle's `id` is a NUMBER, so `gestureIdOf` retires
const applyPreview = (state: unknown): void => {              // the affordance's ONE preview call — L1 §3's seat
P1  holder, style, set = target's own members ; if any is unusable → return          // the landed gates, unmoved
P2  value = state.value ; if typeof value !== 'number' || !Number.isFinite(value) → return    // the landed gate, unmoved
P3  set.call(style, 'width', `${value}px`)                // THE INLINE PREVIEW, on EVERY arm: the routes are ADDED, never substituted
P4  if (state.valid === true)  → drag.move(GESTURE_KEY, state)    // THE PLACEMENT CHANGE → commitDrag; the state's clamped `value` is the size
P5  if (state.valid === false) → drag.cancel(GESTURE_KEY)         // THE REVERT → clearDrag; `valid` is boolean, so there is no third arm

move(key, preview):                                           // createPaneDrag's per-move turn
M1  size = preview?.value ; if typeof size !== 'number' || !Number.isFinite(size) || size < 0 → return   // the composition's OWN gate (`§3.2 F-8`)
M2  gestures.set(key, { erased: false })                      // THE FLAG IS CLEARED: a first move RE-OPENS it, for every gesture
M3  if (view !== null) view.commitDrag(DEFAULT_PANE_ID, { size })    // ONE write per placement change; no tier, no path, no composer

endReading(key):                                              // the ERASE, reached from `rightClick`, `cancel` and the release
E1  if (gestures.get(key)?.erased === true) → return          // the ONE route this skips, and NOTHING else
E2  gestures.set(key, { erased: true })                       // set by whichever ending turn ends the reading FIRST
E3  if (view !== null) view.clearDrag()                       // the family ENDS: no placement, no geometry, no value judged
rightClick(key) = cancel(key) = endReading(key)
```

- **`P4`/`P5` are the WHOLE discriminator, and the flag is the affordance's own** (L2 §2.1, ASM-RW-2): `valid === true` is the placement change of an observed move, `valid === false` the revert `revertStateFor` builds for all three abandon arms (`resetArm`, `dropArm`, `onCancelHook`) — no counter, no session read, no `isDragValid` reuse, and **NO SECOND LISTENER on the gesture's events** (the `D-126` two-authorities class untouched, D-30). **A non-resizable gesture's VALID moves reach no seat** (the affordance returns before its one `writePreview`), while its reset/drop/cancel REVERT does — a `valid: false` state, so the seat's `P5` arm fires and ends an already-absent family (`F-4`'s class).
- **The flag's provenance and clearing, once**: it is `gestures` in this closure, keyed by the key each turn is handed (total over any string); the WIRING hands ONE constant at BOTH seats — the `commit` seam's release and the preview seam's two arms — so the app's one gesture sees exactly one ending. `M2` CLEARS it on every move, `E2` sets it before its route is sent, no other line writes it — and an ending turn whose flag is set skips `E3` alone, never the sink and never the commit.
- **`E1`'s other arm is lawful and required** (`M-6`, `F-4`): a gesture that never moved has no entry, so an erase sends exactly one `clearDrag` — the store answers `committed` whether or not the family stood, and the composition decides nothing about that answer.
- **`M1` is the turn's own totality, not a second judgement**: the affordance writes no non-finite preview, and a directly-driven surface's hostile preview sends nothing and leaves whatever last stood standing (`M-10`). **AND THE SEAT INHERITS ITS PRESENTATION GATE**: `P1`/`P2` are the LANDED statements and they precede `P4`/`P5`, so a target with no usable `style` sends no route either — one call, one order, stated rather than hidden.
- **The `commit` seam STAYS AN INLINE PROPERTY of the options literal** — `commit: (gesture, value): void => { drag.release(GESTURE_KEY, value, write) }` — because `D-117/LIVE-READ` probes that exact form in this file; hoisting it to a `const` reds a gating source row (`tests/pane-drag-compliance.test.ts`).
- **THE PAGE'S OTHER WRITE IS THE `focus` ACT, AND IT IS ONE BODY** (`D-141`, `D-142`; the source's `focusActRoute`, whose docblocks cite THIS section and §3): S1 the argument space GUARDED rather than trusted (`'target' in <non-object>` never attempted, `newTab === true` with no coercion), S2 ONE committed reading of `['tabs']` through `getTabsClient()`, S4/S5/S7 the three arms that WRITE NOTHING (no `target` answers the reading as it stands; a non-string target is the route's own `malformed-arguments`; no standing row and no open is `target-absent`), S6 the seat in the RECORD's own terms (`seatOf`: the first row of `order` whose `target` matches, else one OPENED as `tab-<n>` by the existing `mintTabId`), S8 ONE `composeRecord` handed VERBATIM to `dataRoute('write', {path:['tabs'], tier:'file', value})` with no retry and no member re-spelled, S9 the record RE-READ after the write — the REPAIR's answer, not the value sent nor its ledger — and S10/S11 that write's judgement carried BESIDE the re-read as `refused`, member for member (`refusalOf`/`withRefusal`); every arm answers a value and none throws (`D-127`, `D-136`). **AND WHAT FOLLOWS THE WRITE IS THE RECORD'S OWN PUSH, NOT THIS ACT'S RE-READ**: one subscription body re-reads the record and drives the two authored terminals (L2 §5, `D-137`).
- **WHO OWNS THE NORMALISATION IS THE RECORD'S, AND THE VALUE THIS MODULE WRITES MAY SEAT TWO ACTIVES ON PURPOSE** (`D-129`, `D-142`; `focus-retirement`'s `ASM-3`; `src/main/tabs-record/index.ts`'s `TABS_CONSTRAINT_ID`, its body and `healedFamily`): `composeRecord` stamps `active: true` on the target row and leaves the row that stood active EXACTLY as the reading carried it — **THE CALLER NEVER CLEARS THE OLDER FLAG** — because `exactly-one-active` normalises the pair INSIDE THE CALLER'S OWN COMMIT: its repair JOINS that attempt through `writeJoined` (naming the commit it was handed at `write`'s required fourth position, never opening a second), keeps ONE by the written referent's precedence and deactivates the rest IN THE SAME OBJECT, so the re-read answers one corrected record — and a local `active: false` here would be the second authority that repair exists to be.

## 3. What each act leaves standing — the release's order (`R1`–`R5`), and the composed record's contract (`C1`–`C4`)

```
release(gestureId, final, sink):
R1  if typeof final !== 'number' || Number.isNaN(final) → return     // the E3 gate: an unusable `final` sends NO sink and NO route
R2  standing = readPaneSize({}, DEFAULT_PANE_ID) ; if finite → if clampToBounds(standing, readPaneBounds({}, DEFAULT_PANE_ID)) is NaN → return   // the refusing geometry: NO sink, NO route (unmoved)
R3  if typeof sink === 'function' → sink.call(null, final)            // THE SINK FIRST, exactly once (SINK-1, D-117)
R4  if (view !== null) view.commitPane(DEFAULT_PANE_ID, { size: final })   // THE `file` COMMIT, second (D-132, D-138)
R5  endReading(gestureId)                                            // the `temp` family ends, THIRD — after both, and NEVER suppressed
```

- **The TWO PHASES STAY** (D-138, `L1 §1`): `M3` is the drag-update phase — `temp`, one write per placement change, committing nothing — and `R4` is the release phase — `file`, exactly once, through the sink's own turn. `D-137`'s "one event" was about COLLISION, never about collapsing them.
- **`R5` is not a second commit** (L2 §5): it writes no placement, carries no geometry and judges no value; it is a third STATEMENT after the two that are the gesture's product, and it reads no flag until both have run.
- **The two refusing arms send nothing at all** (`R1`, `R2`): no sink, no route, no ending — the reading such a release leaves standing is replaced by the next placement change and by nothing else (`§3.2 F-8`, `§2.1 A`'s E3 gate).
- **On a RESET the RELEASE ends the reading and the REVERT's erase is the one that skips** (L2 §2.1, and the head's own order): the affordance's `resetArm` calls its controller's `reset` FIRST, which drives the session's committing terminal → the controller's one `write` → the `commit` seam → `R3`/`R4`/`R5`; only then does the same function pass its `valid: false` revert to the seam, so `P5`'s `endReading` finds the flag set. A drop and a cancel write their revert with no committing terminal behind them, and a REFUSED reset (the controller answering not-ok: not resizable, no handle yet, an unusable default) drives no `write` at all — so in those arms the revert's erase IS the ending.
- **AND THE PAGE'S OTHER ACT LEAVES A COMPOSED RECORD — THE CONTRACT `C1`–`C4` THIS SECTION IS CITED FOR** (`composeRecord`, `D-136`, `D-139`, `D-142`; booked as `pending.md` row `2`): ONE whole-record composition in the renderer, lawful because the one test asks whether a write is a LEAF of an enforced structure and this one is a whole-record write at an enforced ROOT — it reads no store, calls no route and holds nothing between calls, so its value is a function of its two arguments alone.
- **C1 — `order` IS PRESERVED, COPIED AND NEVER INVENTED**: the reading's own sequence, moved by no seat, extended by EXACTLY ONE id where the act OPENS and never re-sorted — the sequence is the record's and not this function's (`D-140`).
- **C2 — EVERY ROW IS COPIED WHOLE under its own id** (`error`, `label` and `lastActiveAt` travel exactly as carried, `D-76`), and the value is the member-keyed `{order, <id>: row}` and **NEVER the read answer's `{order, landing, rows}`** — `landing` is DERIVED, and its address is the landing entry's own row.
- **C3 — the ONE row whose bytes move is the target's** (`active: true`, `lastActiveAt` stamped now, for the `tab-has-lastActiveAt` pair), and an OPENED row carries no `label` and no `error`, those being the record's repairs — a local default for a shape a repair supplies is a SECOND AUTHORITY. **C4 — NO INVENTED MEMBER: no `landing`, no stored active id, no key** (ASM-3), which is what keeps the value a composition of a reading instead of a record of its own.

## 4. The ghost — the delivery's reading, painted as a declared transient

```
renderGhost(): void                                           // createPaneDrag's member; the ONLY caller is `startViewShape`'s subscription body
G1  epoch = ++ghostEpoch                                      // each turn carries one; a superseded answer mutates nothing
G2  try { void dataRoute('read', { path: ['drag'] }).then(a => settle(epoch, a), () => settle(epoch, null)) } catch { clear() }   // ONE read, no write, no tier argument — and a SYNCHRONOUS throw from the route is closed here, not only a rejection
G3  settle: if (epoch !== ghostEpoch) → return                                         // superseded: no paint and no removal
    try {
G4    node = (answer !== null && typeof answer === 'object' && answer.status === 'read') ? answer.value : null
G5    if node is not a plain object, or is an array → clear() ; return                 // the answer's `branch` is this same fact, never re-derived
G6    if (node._tier !== 'temp') → clear() ; return                                    // THAT node's own readout (D-144) — one token, never a set
G7    member = node[DEFAULT_PANE_ID] ; if member is not a plain object → clear() ; return
G8    size = member.size is a NODE on the live route — `{_tier, value}` — so its `value` is read; a bare number is the same fact a double may answer ; if typeof size !== 'number' || !Number.isFinite(size) || size < 0 → clear() ; return
G9    if typeof ghostTarget.setAttribute === 'function' → ghostTarget.setAttribute('data-ghost', 'temp')   // THE DECLARED TRANSIENT, ONE spelling
    } catch { clear() }                                                                // nothing escapes the delivery
clear(): try { if typeof ghostTarget.removeAttribute === 'function' → ghostTarget.removeAttribute('data-ghost') } catch { /* the target is closed too, not only the route */ }
```

- **It invents no member**: no `dragOf`, no fifth `view` read, no `data` member — the ask is the realm's existing `dataRoute` pass-through (`D-112`) and the answer's own node, whose `_tier` `tier-readout` landed (`D-133`, `D-144`, `D-18`). It writes at no tier.
- **The paint is a DECLARED TRANSIENT on the pane element the wiring already holds** (`elementForNodeId(GUTTER_TARGET_ID)`, handed as `ghostTarget` beside `view`): no graph write, no created element, no re-render mid-gesture — the class `applyPreview`'s style write is — and `get_rendered_html` serialises the live mount (`D-117`, ASM-3).
- **EVERY ARM IS CLOSED BUT ONE, AND `G9` IS THE ONE** (`G4`–`G9`, the `catch`, `clear`): no `data` member (the realm's own `store-unreachable`), a thrown or rejected route, `absent`, a ledger arm, a `_tier` that is not `temp`, a node naming another pane and a non-finite size each REMOVE the declaration and throw nothing (ASM-RW-3, `DC-8(a)`) — while **an element that will not take an attribute RETURNS at `G9`'s `setAttribute` gate AHEAD of the paint, so no `clear()` follows and it removes NOTHING**: a painted `data-ghost="temp"` SURVIVES a delivery to such a target, and a target hostile enough to carry no `setAttribute` is one this turn can never clear — the landed form, which `signatures.md` §1 already states (*"paints nothing, removes nothing"*) and `renderer.ts`'s `settleGhost` measures (D-145, `D-41`).
- **THE LANDED PREDICATE READS THE LEAF NODE, AND THE BARE NUMBER `G8` FIRST SPELLED IS THE SHAPE A DOUBLE ANSWERS** (`D-134`, `D-145`): `data.read` answers every node in the release's own form, so the placement's `size` arrives as `{_tier, value}` and the turn unwraps the `value` it carries — a bare number read as the same fact, with no tier re-derived because the branch's own `_tier` above is the one fact. The deviation was measured at a booted bundle and is recorded rather than smoothed (D-145's own sentence).
- **THE STALENESS IS STATED, NOT HIDDEN**: a delivery that never arrives paints nothing (the boot `fill()` applies nothing), and a delivery lost AFTER a paint leaves it standing until the next one. No poll, no timer, no retry stands here (`D-82` clause 4), so a lost push is a STALE ghost, never a fabricated one — the bounded staleness `D-117` books and `P-3`/`P-4` measure.
- **The delivery is the only driver**: `IPC_VIEW_CHANGED` → the client re-reads and adopts → `startViewShape`'s ONE subscription body calls the turn. The composition registers NO subscriber, and the root is covered because the record's array gained `['drag']` in the same edit as the address (`L1 §5 R-2`, `D-137`).

## 5. What is deleted, and what remains

| Removed | What it was | Replaced by | Cite |
|---|---|---|---|
| `previewOf(gestureId)` | the closure's preview read, kept so the erase rule was observable | the address: the same question is asked of `['drag']` — the ghost's own read | L2 §4, ASM-RW-4, `D-70`, `M-10` |
| `previews: Map<string, unknown>` | the closure's STORAGE of the placement | `['drag']` at `temp`, whose writer is `commitDrag` and whose end is `clearDrag` | `D-132`, superseding `D-90` by pointer |
| `gestureIdOf(gesture)` | read a handle `id` that is a NUMBER, feeding a value the release ignored | the ONE closure constant `GESTURE_KEY` | L2 §2.1 |
| `erasePreview`'s name and claim | "the closure's entry was deleted" | `endReading`: the flag says `clearDrag` was SENT | L2 §4 |

`gestures` REMAINS and is not storage: `['drag']` is keyed by PANE ID and is GESTURE-BLIND (`F-6`), so the address cannot say "this gesture has already ended" and one flag must. **Nothing else is added** — no MCP tool, resource, group or bridge member, no tenth `view` member, no secure-store address, declaration, route or member (D-18, D-112, D-123, D-132).

## 6. Guardrail notes — what L4 must NOT do

- **Do not collapse the two phases** (D-138): `move` commits nothing, `release` is the ONLY `file` writer, and `commitPane` keeps its place, its shape and its one invocation.
- **Do not add a poll, a timer, an interval or a retry** (`D-82` clause 4): the ghost's ONE read rides a delivery's turn, and `renderGhost` writes nothing at any tier.
- **Do not invent a member, a route or a tier** (D-18, D-112, D-123, D-132): no `dragOf`, no sixth `data` member, no eighth `view` route in this file, no secure-store byte — and no `previewOf` kept as a "last sent" mirror (ASM-RW-4).
- **Do not register a second listener** (D-92 `M-4`, D-126): `renderZone` and `renderGhost` are MEMBERS the shape's ONE delivery calls; the `['drag']` coverage is the record's subscription array, another row's edit (`L1 §5 R-2`).
- **Do not judge a value at `temp` or write a placeholder there** (D-132, D-105): no declaration, no empty family, no coercion — that family's ABSENCE is the product.
- **Do not declare the client's routes or the record's address here** (`L1 §5 R-3`/`R-4`, D-3, D-45): `commitDrag`/`clearDrag` and `['drag']` are `store-view-record`'s hunks and land in the SAME pass, or the two calls above name a method that does not exist.
- **Do not leave the demo holding `previewOf`**: `demo/pane-drag-demo/demo.ts` called it twice and `npm run typecheck` reaches `demo/`, so that row's re-grain was a same-edit and has landed — `DB-1` is green at this head (`D-118`, D-3, D-145).
- **Do not normalise the tab record here** (`D-129`, `D-142`): no `active: false` on any row this module composes, no seat id stored, no `landing` minted — `exactly-one-active` settles the pair inside the caller's own commit, and what the terminals are driven from is the REPAIR's answer, never the value sent (L2 §5).
- **ONE PROBE IN `tests/theme-declaration.test.ts` REDS ON THE SECOND ARGUMENT, AND THE FILE IS `chrome`'s GATING ONE** (unmarked, D-40): `T-5` asserts the source CONTAINS `startViewShape(themeApplication)`, which the second argument deletes — so that literal is `chrome`'s same-edit re-grain — while the file's two `'function startViewShape('` region probes are SATISFIED by keeping the header's exact spelling (no space before the parenthesis) and its body's `theme?.apply()`. The file's `ViewClientBridge` literal (the annotated one in its own header block; `L2 §6` counts two) is that row's too, and must supply both new routes or `typecheck:tests` reds (D-112).

## 7. The commands, and the readings at this head

```
npm run typecheck && npm run typecheck:tests && npm run build
npx vitest run tests/pane-drag-compliance.test.ts tests/theme-act.test.ts tests/renderer-delivery-compliance.test.ts
npx vitest run tests/fork-store-reads.test.ts tests/op-command-unwrap.test.ts tests/unit/renderer-wiring/preview-seat.test.ts
node demo/pane-drag-demo/build.mjs && npx vitest run tests/demo-bundle.test.ts   # the demo bundle must not fall behind its sources (D-118)
DISPLAY=:0 npx vitest run tests/e2e/pane-drag-temp/        # six LIVE rows; the host-wide boot lock is serialised, so nothing else runs beside it
node "../Agent Harness/strata/lint/strata-lint.mjs" strata # from the REPOSITORY ROOT: the harness is one directory above it, never under `strata/`
```

| Leg | Reading at this head, after the landing | What it says |
|---|---|---|
| `typecheck` · `typecheck:tests` | exit `0` · `0` errors each | the client's two routes and the seven-line pair compile at both halves |
| `tests/pane-drag-compliance.test.ts` | exit `0`, **`130 passed (130)`** | the marked battery is GREEN and reports **on notice** (D-30); the 26 reds this pass recorded were the landing's absence |
| `tests/theme-act.test.ts` | exit `0`, **`5 passed (5)`** | `A-5` drives `commitDrag`/`clearDrag` through the client's own literal to `temp` and to `absent` |
| `tests/renderer-delivery-compliance.test.ts` | exit `0`, **`9 passed (9)`** | `DC-8(a)`'s paint and closed arms, `DC-8(b)`'s call site beside `theme?.apply()` |
| `fork-store-reads` · `op-command-unwrap` | exit `0`, **`28 passed`** · **`6 passed`** | unmoved: the `createPaneDrag(` census and the `op`/`load` cases |
| `build` · `node demo/pane-drag-demo/build.mjs` · `tests/demo-bundle.test.ts` | exit `0` · `0` · **`4 passed`** | the demo bundle is rebuilt with its sources, `DB-1`/`DB-2` green (D-118) |
| `npx vitest run tests/e2e/pane-drag-temp/` | **`6/6` green** over seven real Electron boots | `P-1`…`P-6` at the process boundary: the routes, the `['drag']` delivery, the ghost and the `declared-tier` refusal (D-145, D-27) |
| `strata-lint` | exit `1`: **`137 PASS / 1 FAIL / 4 INFO`** | the FAIL is the accepted `register` row-length check alone (`D-110`) and is not this pass's |

**A LEG NOT MEASURED IS NOT CLAIMED**: the readings above are the node legs and the unit's own e2e battery; the five Electron legs (`battery`, `divergence`, `ui`, `panes`, `crossings`) are the UNIT's, and `D-145` records `crossings` at **28 rows, 0 failures** over five boots. **AND NO `npm run` LEG MEASURES THE SEAT**: `npm run panes` is `tests/e2e/secure-panels/panes-live.mjs` — a `secure-panels` toggle battery whose own header states *"A body-issued `click` is NOT a coordinate gesture"* and that it claims nothing outside that pane — and no leg carries a coordinate gesture at all: the two files that DO dispatch real pointer input over CDP (`demo/pane-drag-demo/run-live.mjs`, `tests/secure-exclusion-live.mjs`, `D-118`) are not legs, while `tests/gutter-ui.test.ts` and `tests/gesture-session.test.ts` fire only into their own stub sources — so `L1 §4`'s *"the gesture stays `npm run panes`'s"* is FALSE at this head and is routed up as its own finding (§8).

## 8. Unit battery: the SEAT row is LANDED — `PS-1`…`PS-4` — and the leg claim that still stands

**NONE OWED FOR THE DRAG'S OWN TURNS, ORDER, GHOST AND ADDRESS**, because each of those subjects is already driven by a row that stands at this head — and the SPLIT IS STATED because it decides how much each green is worth (D-30, D-144): `pane-drag-compliance` is a MARKED file — GREEN at this head and reporting ON NOTICE — with ONE gating carve-in, `D-117/LIVE-READ`, which drives the release's route order; `renderer-delivery-compliance`'s `DC-8(a)`/`DC-8(b)` and `theme-act`'s `A-5` are UNMARKED and GATE; and `tests/e2e/pane-drag-temp/`'s six L1 rows gate by file class (D-40). Between them they drive §2's composition turns, §3's order, §4 and its delivery, and the address the seat writes to over a process boundary — so a row duplicating them would be a copy of the evidence and not evidence (D-9, D-40), and the L3 test pass that re-grained them added no file (`L1 §7 E-7`). **AND THE ACT'S TWO ROWS ARE `L1 §4`'s, NOT THIS PAGE'S**: `composeRecord`'s round trip and the app's own subscriber after the act are named there and never restated here (D-43), while the act's process-boundary rows are `tests/e2e/focus-retirement/`'s `F-1`…`F-5`, unmarked and gating by file class (D-40).
**THE SEAT IS LANDED, AND THE ROW IS `PS-1`…`PS-4`** (`D-146`; the row rev 9 carried as OWED): `tests/unit/renderer-wiring/preview-seat.test.ts`, UNMARKED and GATING (authored after the `D-30` sweep, `D-40`), driving `startGutterAffordance(runtime)` over a STUB runtime (`elementForNodeId` answering three element doubles) and a stub `window.provident` (the `view` member's seven routes, each counted, and the `data` member the ghost's read rides), with a gesture driven through those doubles' own listeners — the doubles carry §8's three members (`addEventListener`, `getAttribute`, `style`) plus the TWO harness members that pass recorded (`isConnected`, `removeEventListener`) and the ghost's `setAttribute`/`removeAttribute`. What each asserts: **`PS-1`** a VALID observed move sends ONE `commitDrag(DEFAULT_PANE_ID, {size})` and NO `clearDrag`; **`PS-2`** a REVERT sends ONE `clearDrag` and NO `commitDrag`; **`PS-3`** a SECOND ending turn sends NOTHING — the flag skips `E3`'s route alone, so the sink and the `file` commit still run; **`PS-4`** the ghost turn is RETURNED and never called at construction, and BOTH seats carry the ONE `GESTURE_KEY`. **ITS THREE PRECONDITIONS WERE MET, NOT WAIVED**: the path is claimed on `renderer-wiring`'s `strata/modules.json` entry, declared in `store-view-record`'s `DECLARED_SCOPE` (`tests/integration/store-view-record/boundary.test.ts`), and RUN — **4/4 green**.
**AND WHAT THAT GREEN IS NOT IS A LEG'S**: **no `npm run` LEG carries a coordinate gesture** — `npm run panes` is `tests/e2e/secure-panels/panes-live.mjs`, a `secure-panels` toggle battery whose own header states *"A body-issued `click` is NOT a coordinate gesture"* and that it claims nothing outside that pane — so the seat's measurement is a NODE-TEST seat, **envelope-green and never a rendered surface's** (D-27, `D-44`); the two files that do dispatch real pointer input over CDP (`demo/pane-drag-demo/run-live.mjs`, `tests/secure-exclusion-live.mjs`) are not legs, so `L1 §4`'s *"the gesture stays `npm run panes`'s"* stands as a finding against that document (§7, D-118).
