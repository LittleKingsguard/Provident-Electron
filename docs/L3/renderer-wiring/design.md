# L3 — `renderer-wiring`: the module design

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `pane-drag-temp` · **Branch:** `strata` (D-6) · **Rev:** 7 — re-grained WHOLE onto
  `docs/L1/pane-drag-temp.md` (§1, §3, §5, §6, §7 `E-8`) and `docs/L2/renderer-wiring/interface.md` rev 3: the gesture keeps its TWO PHASES, its
  in-process value becomes an ADDRESS the delivery reads, BOTH drag writes seat at the affordance's ONE preview seam, the release ends the reading
  AFTER its file commit, and the ghost is a turn the shape's ONE delivery calls. **Rev 6's `focus-retirement` record is NOT withdrawn** — it stands,
  landed, in `strata/records/focus-retirement-unit.md` and in the decisions it cites (D-46, D-143).
- **Inputs:** L2 rev 3 §1–§7 (its §2 turn table, §2.1 the seat, §3 the ghost's contract, §4 the deletions, §7 `ASM-RW-1`…`4`); `docs/L2/view-record/interface.md` §1/§2 (the `['drag']` root, the two routes); `docs/L1/tier-readout.md` (the per-node `_tier` readout); `D-132`, `D-137`, `D-138`, `D-144`, `D-105`, `D-126`, `D-117`, `D-101`, `D-112`, `D-133`, `D-70`, `D-9`, `D-30`, `D-40`, `D-41`, `D-18` · **Ceiling:** 150 lines (D-1) · **Status:** structure, pseudocode, guardrails; the exact declared text is `signatures.md`'s (brief §3, D-45) · **sites are named, never offsetted** (D-41).

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

## 2. The two drag writes, at the affordance's ONE preview seam

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

## 3. The release — sink, then `file`, then the `temp` ending

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
G8    size = member.size ; if typeof size !== 'number' || !Number.isFinite(size) || size < 0 → clear() ; return
G9    if typeof ghostTarget.setAttribute === 'function' → ghostTarget.setAttribute('data-ghost', 'temp')   // THE DECLARED TRANSIENT, ONE spelling
    } catch { clear() }                                                                // nothing escapes the delivery
clear(): try { if typeof ghostTarget.removeAttribute === 'function' → ghostTarget.removeAttribute('data-ghost') } catch { /* the target is closed too, not only the route */ }
```

- **It invents no member**: no `dragOf`, no fifth `view` read, no `data` member — the ask is the realm's existing `dataRoute` pass-through (`D-112`) and the answer's own node, whose `_tier` `tier-readout` landed (`D-133`, `D-144`, `D-18`). It writes at no tier.
- **The paint is a DECLARED TRANSIENT on the pane element the wiring already holds** (`elementForNodeId(GUTTER_TARGET_ID)`, handed as `ghostTarget` beside `view`): no graph write, no created element, no re-render mid-gesture — the class `applyPreview`'s style write is — and `get_rendered_html` serialises the live mount (`D-117`, ASM-3).
- **EVERY ARM IS CLOSED** (`G4`–`G9`, the `catch`, `clear`): no `data` member (the realm's own `store-unreachable`), a thrown or rejected route, `absent`, a ledger arm, a `_tier` that is not `temp`, a node naming another pane, a non-finite size and an element that will not take an attribute each REMOVE the declaration and throw nothing (ASM-RW-3, `DC-8(a)`).
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
- **Do not leave the demo holding `previewOf`**: `demo/pane-drag-demo/demo.ts` calls it twice and `npm run typecheck` reaches `demo/`, so that row's re-grain is a same-edit and `DB-1` reds until it lands (`D-118`, D-3).
- **ONE PROBE IN `tests/theme-declaration.test.ts` REDS ON THE SECOND ARGUMENT, AND THE FILE IS `chrome`'s GATING ONE** (unmarked, D-40): `T-5` asserts the source CONTAINS `startViewShape(themeApplication)`, which the second argument deletes — so that literal is `chrome`'s same-edit re-grain — while the file's two `'function startViewShape('` region probes are SATISFIED by keeping the header's exact spelling (no space before the parenthesis) and its body's `theme?.apply()`. The file's `ViewClientBridge` literal (the annotated one in its own header block; `L2 §6` counts two) is that row's too, and must supply both new routes or `typecheck:tests` reds (D-112).

## 7. The commands, and the readings at this head

```
npm run typecheck
npm run typecheck:tests
npx vitest run tests/pane-drag-compliance.test.ts
npx vitest run tests/theme-act.test.ts
npx vitest run tests/renderer-delivery-compliance.test.ts
npx vitest run tests/fork-store-reads.test.ts
npx vitest run tests/op-command-unwrap.test.ts
npm run build
node demo/pane-drag-demo/build.mjs && npx vitest run tests/demo-bundle.test.ts   # the demo bundle must not fall behind its sources (D-118)
DISPLAY=:0 npx vitest run tests/e2e/pane-drag-temp/        # six LIVE rows; the host-wide boot lock is serialised, so nothing else runs beside it
node "../Agent Harness/strata/lint/strata-lint.mjs" strata # from the REPOSITORY ROOT: the harness is one directory above it, never under `strata/`
```

| Leg | Reading at this head | Attribution of every red |
|---|---|---|
| `typecheck` · `typecheck:tests` | exit `0` · `0` errors each | none — this document adds no `src/` byte, and the two client routes land with `store-view-record` |
| `tests/pane-drag-compliance.test.ts` | exit `1`, **`26 failed \| 104 passed (130)`** | every one an assertion on an EMPTY route log or a NULL `['drag']` family (`expected [] to deeply equal [{id:'pane-a',…}]`, `expected +0 to be 1`), plus `M-10` on `previewOf` still being a function — `E-8` unlanded, no `TypeError` and no harness fault |
| `tests/theme-act.test.ts` | exit `1`, **`1 failed \| 4 passed (5)`** | `A-5` alone: the client carries no `commitDrag` route — `E-2` |
| `tests/renderer-delivery-compliance.test.ts` | exit `1`, **`2 failed \| 7 passed (9)`** | `DC-8(a)` (`typeof renderGhost` is `undefined`) and `DC-8(b)` (no delivery body calls it) — `E-8` |
| `fork-store-reads` · `op-command-unwrap` | exit `0`, **`28 passed`** · **`6 passed`** | none: the `createPaneDrag(` census (`2`) and the `op`/`load` cases are unmoved |
| `build` · `node demo/pane-drag-demo/build.mjs` · `tests/demo-bundle.test.ts` | exit `0` · `0` · **`4 passed`** | none; the demo's rebuild is byte-identical (`sha256 a41b7e17…`) |
| `npx vitest run tests/e2e/pane-drag-temp/` | exit `1`, **`6 failed (6)`** in `17.93 s` of real boots on `DISPLAY=:0`, no `PREREQUISITE ERROR` | `P-1`/`P-2`/`P-6` the bridge carries no route (`E-3`/`E-4`); `P-3` ZERO deliveries (the array lacks `['drag']`, `R-2`); `P-4` no `data-ghost="temp"` over ten re-reads (the ghost turn, `E-8`); `P-5` a `file` write at the `temp` root **COMMITTED** (no declared-root entry, `R-1`) |
| `strata-lint` | exit `1`: **`137 PASS / 1 FAIL / 4 INFO`** | the FAIL is the accepted `register` row-length check alone (`D-110`) and is not this pass's |

**A LEG NOT MEASURED IS NOT CLAIMED**: no `src/` byte moves in this pass, so the five Electron legs (`battery`, `divergence`, `ui`, `panes`, `crossings`) were NOT re-taken. **AND NO LEG MEASURES THIS UNIT'S SEAT**: `npm run panes` is `tests/e2e/secure-panels/panes-live.mjs` — a `secure-panels` toggle battery whose own header states *"A body-issued `click` is NOT a coordinate gesture"* and that it claims nothing outside that pane — and NO file dispatches a pointer event at a DOM element or on a live leg (`tests/gutter-ui.test.ts` and `tests/gesture-session.test.ts` fire only into their own stub sources), so `L1 §4`'s *"the gesture stays `npm run panes`'s"* is FALSE at this head and is routed up as its own finding (§8).

## 8. Unit battery: ONE row OWED — the seat — and it is ROUTED, not written here

**NONE OWED FOR §3–§5**, because each of those subjects is already driven by a row that stands at this head — and the SPLIT IS STATED because it decides how much each green is worth (D-30, D-144): `pane-drag-compliance` is a MARKED file whose 26 reds report ON NOTICE, with ONE gating carve-in, `D-117/LIVE-READ`, which drives the release's route order; `renderer-delivery-compliance`'s `DC-8(a)`/`DC-8(b)` and `theme-act`'s `A-5` are UNMARKED and GATE; and `tests/e2e/pane-drag-temp/`'s six L1 rows gate by file class (D-40). Between them they drive §2's composition turns, §3's order, §4 and its delivery, and the address the seat writes to over a process boundary — so a row duplicating them would be a copy of the evidence and not evidence (D-9, D-40), and the L3 test pass that re-grained them added no file (`L1 §7 E-7`).
**OWED, AND IT IS §2's SEAT, WHICH IS MEASURED BY NOTHING AT ALL**: no battery in this tree constructs `startGutterAffordance` (`tests/gutter-ui.test.ts` drives `createGutterAffordance`'s own mechanism; every drag row constructs `createPaneDrag` directly), and §7's reading shows the live legs carry no pointer event either — so `P4`/`P5`, the ONE constant key and the presentation gate are unmeasured. The row is NAMED and its shape fixed: `tests/unit/renderer-wiring/preview-seat.test.ts`, unmarked and gating, over a stub runtime (`elementForNodeId` answering three element doubles carrying `addEventListener`/`getAttribute`/`style`, plus `applyCommand`) and a stub `window.provident`, driving `startGutterAffordance(runtime)` and asserting (a) a valid observed move sends ONE `commitDrag(DEFAULT_PANE_ID, {size})` and no `clearDrag`, (b) a revert sends ONE `clearDrag` and no `commitDrag`, (c) a second ending turn sends nothing, (d) the ghost turn is RETURNED and both seats carry the same key.
**IT IS NOT WRITTEN IN THIS PASS, AND NONE OF THE THREE REASONS IS A JUDGEMENT CALL**: a NEW path must join the worktree boundary row's `DECLARED_SCOPE` in the same edit (`L1 §5 R-5`) — that file is `store-view-record`'s — and must be claimed on `renderer-wiring`'s own `strata/modules.json` entry, which owns no `tests/unit/` path today and is L1's file: an unclaimed or undeclared path reds the very rows that measure the tree (D-30, D-43); and a gating row is worth its red only once RUN, which this seat cannot do (D-27, `brief §6`). The row is work for the pass owning `E-7`'s battery, and `L1 §4`'s grounding sentence (*"the gesture stays `npm run panes`'s"*) is a finding against that document.
