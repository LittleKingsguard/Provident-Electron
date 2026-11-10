# L3 — `renderer-wiring`: signatures

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `pane-drag-temp` and the tab act's one row · **Branch:** `strata` (D-6) · **Rev:** 15 — **§2'S TWO PRIVATE RELATIONS ARE TRANSCRIBED, `reportUnreached` AND `reportReceipt`, transcribing `design.md` rev 16** (`D-126`'s `F10`; the user's ruling verbatim *"Give the three routes a reader"*, `D-167`'s routing; `docs/L2/view-record/interface.md` §9): §2's `createPaneDrag` fence gains the SYNCHRONOUS report — ONE private total relation called at `M3`, `E3` and `R4`, which `console.warn`s a `{status:'absent'}` statement with its `reason` verbatim and says NOTHING for a `sent` one — and the ASYNCHRONOUS push — the client's `onWriteOutcome` taken ONCE at construction, its handler scoped to the `pane` and `drag` route words and reporting by STATUS (`refused` → `console.error` carrying `reason`/`message`, `unread` → `console.warn`, `committed` → NOTHING). **NEITHER IS EXPORTED AND NO OTHER DECLARED NAME, ARITY OR EXPORT MOVES**: `createPaneDrag`'s signature, `PaneDragSurface`, `release`'s `void` and §5's census stand byte-unchanged, and the client member both halves read is `store-view-record`'s, cited and never declared here (`D-45`, `D-3`). **AND THE TWO LINES THIS PAGE OWED ARE THE WHOLE OF THE TRANSCRIPTION**: §1, §3 and §4 gain no claim, §3's routes are unmoved, and the null-`view` word that stands ONCE at construction is stated with them because `PS-5` measures its count. · **Rev:** 14 — **`F8`'S FOUR DEAD MEMBERS LEAVE THE SURFACE, transcribing `design.md` rev 15** (`D-168`): §1's fence drops `defaultSizeFor`, `candidatesFor`, `rightClick` and `renderZone` — each with its interface declaration and its return site — and `renderGhost`'s comment loses the *"beside `renderZone`"* clause; §4 states the four as removed with the successor each property has, `cancel` as the ONE abandon terminal (`rightClick` was the same call), the affordance's own `defaultSizeFor` seam (`src/shared/gutter-affordance.ts:748`, the gesture's already-taken establishment reading) as the reset's read, and NOTHING as the successor for the zone-layout turn and the relocate-candidate production, because the app's only `source` carries no `layout` member and `src/shared/relocate.ts` has no `src/` importer (`D-111`). **THE SURFACE SHRINKS AND NOTHING ELSE MOVES** — no other member's name, arity or export changes, `createPaneDrag`'s signature stands (`backing, source`), and §5's census is the names whose signature must NOT move, so the four are untouched by it · Rev 13 — **the overlay's crossing hands back its write's ANSWER, transcribing `design.md` rev 14** (`D-127`'s `F6`): `OverlayPaneCrossing.write`'s declared answer widens from `void` to `Promise<unknown> | void`, so `main()` drops its `void bridge?.security?.setPane(open)` and returns the promise, and `startOverlayApplication` keeps it in ONE `settle(ordinal, answer)` — **and NO OTHER DECLARED SHAPE MOVES**: `OverlayPaneCrossing` is stated ONCE in §2's fence below BECAUSE IT MOVES — the treatment §1 gives `PaneDragSurface` — while §5's census is the names whose signature must NOT move, so it is untouched by that type, and §1's surface, §3's texts, §4's removals and §5's list stand byte-unchanged with no transcription owed (`D-45`). Rev 12 — **the state check's skip narrowed to a POSITIVE SETTLED MATCH, transcribing `design.md` rev 13** (`D-163`'s rule refuted by its own measurement, `OV-12`/`OV-14`): the two `authoredPropOf` paints skip iff `wanted !== undefined && readable && held === wanted`, so **a REMOVAL ALWAYS PAINTS** and the read is not taken on that arm — **and NOTHING IN THIS FILE MOVES BUT TWO COMMENT SENTENCES: no name, no arity and no export changes, because a private predicate's BODY is not a signature** (D-53), so `signatures.test.ts`'s transcription stands unmoved and `§2`'s `authoredPropOf` stub keeps its exact three-argument form — §2's `renderPaneSize` comment and §4's `lastApplied` row carry the corrected sentence. Rev 11 — **the read-out's hand-out and the two state-checked declarations, transcribing `design.md` rev 12** (`D-129`; `D-126`'s `F3`, `F5`, `F9` — and `F6`/`F8`/`F10`/`F11` are NOT this pass): §2's return gains `renderPaneSize` and `startViewShape` gains its THIRD parameter, §1's `release` comment records that the APP hands no sink (`write` is §4's DELETION), §3 states the new names ONCE, and §4 gains `lastApplied` beside `write`. Rev 10 — **the row the tab act writes, transcribing `design.md` rev 11**: §3 gains the ONE surviving declaration (`rowForSeat` and `ActedSeat`) and **RE-STATES `FocusSeat` WHOLE**, because rev 11 moves its seat arm from `{kind:'seat', id}` to `{kind:'seat', row}` and a name stated twice is a second authority (D-53, D-45); §4 gains `composeRecord` as REMOVED; §5 loses it from the list of names that stand; §6 names the route this file may not take. Rev 9 — the residual-currency pass (D-145, D-41): `T-5` and the two `demo.ts` `previewOf` calls are LANDED, each with its site. Rev 8 — the one ghost arm that removes nothing. Rev 7 — re-grained WHOLE with `design.md` rev 7 §2–§5: the composition's surface, the wiring's ONE seat and constant key, the ghost turn and the deletions, transcribed as stubs for L4. **AND REV 6'S `focus-retirement` STUBS STAND AND ARE NOT RE-DECLARED, with two stated exceptions** — `FocusSeat` is re-stated whole in §3 and `composeRecord` is DELETED (§4) (D-45, `D-53`) — while **THIS PASS REMOVES `write` AND `lastApplied` WITHOUT A SECOND SPELLING OF ANYTHING ELSE**: no `PaneDragSurface` member changes, `release`'s signature is UNMOVED, and `FocusSeat`/`ActedSeat`/`rowForSeat` are untouched (D-53).
- **Ceiling:** 150 lines, class max (D-1) · **Site:** `src/renderer/renderer.ts` unless a path is given (D-41) · **Status:** stubs for L4, one shot.

## 1. The composition's surface after the change — `PaneDragSurface` and its backing

```ts
export interface PaneDragSurface {
  startSizeOf(element: unknown, token: unknown): unknown
  boundsOf(element: unknown, token: unknown): unknown
  move(gestureId: string, preview: unknown): void          // design §2 M1–M3: `preview.value` → ONE `commitDrag`, and the flag is cleared
  release(gestureId: string, final: unknown, sink: unknown): void   // design §3 R1–R5: sink → `commitPane` → `endReading`. **SIGNATURE UNMOVED, AND THE APP HANDS NO SINK** (design §5, `D-129`): `R3` keeps its position because `demo/pane-drag-demo/demo.ts` still supplies one, a realm with no crossing and no delivery to paint from (D-118); the read-out it used to author is the delivery's now.
  cancel(gestureId: string): void                          // THE ONE ABANDON TERMINAL (design §5 `H4`): `rightClick` was the same call and is DELETED, and the affordance reaches `cancel` alone
  /** **THE GHOST TURN** (design §4 G1–G9) — the shape's ONE delivery calls it: ONE `data.read` at `['drag']`, then a declared transient on
   *  the backing's `ghostTarget` — `data-ghost="temp"` iff the answer's node is a branch standing at `temp` whose `DEFAULT_PANE_ID` member
   *  carries a finite non-negative `size`; REMOVED on every other arm THAT REACHES A REMOVAL (an attribute-less target returns ahead of the paint; `G9`) — nothing thrown. */
  renderGhost(): void
  // `previewOf(gestureId): unknown` IS DELETED (§4): the address is the storage, and a member no caller uses is the `D-70` class (ASM-RW-4).
}

export interface PaneDragBacking {
  /** THE SHAPE (D-88, D-92) — every read the flow makes, and the writer of the two routes. UNMOVED. */
  readonly view?: ViewClient | null
  /** **THE PANE ELEMENT THE DECLARATION LANDS ON** — the wiring's `runtime.elementForNodeId(GUTTER_TARGET_ID)`, handed at the ONE construction site beside `view`. STRUCTURAL: anything carrying `setAttribute`/`removeAttribute`; absent, hostile or attribute-less means the turn paints nothing, removes nothing and throws nothing (ASM-RW-3). */
  readonly ghostTarget?: unknown
}
```

## 2. The wiring's ONE seat, its ONE constant key, and the delivery's second argument

The bindings below are TWO closures and are marked so: `startGutterAffordance`'s (the seat, the key, the hand-out) and `createPaneDrag`'s (the turns, which the gating rows reach through `createPaneDrag`'s own surface and never through the wiring).

```ts
/* ── in `startGutterAffordance`'s closure ─────────────────────────────────────────────────────────────────────────────────── */
/** ONE constant at BOTH seats — the `commit` seam's release and the preview seam's two arms. Taken from this closure (the affordance
 *  element's authored id): the handle's own `id` is a NUMBER, so `gestureIdOf` retires rather than answering `''` (§4). */
const GESTURE_KEY: string = GUTTER_AFFORDANCE_ID
const applyPreview = (state: unknown): void => { /* design §2 P1–P5 */ }   // the affordance's ONE preview call — L1 §3's seat
// AND THE SINK SEAM IS RE-KEYED IN PLACE **AND LOSES ITS THIRD ARGUMENT** (`D-129`, design §5): `D-117/LIVE-READ` probes this exact inline
// property form and its `[^}]*drag\.release\(` regex survives the shortened call — so it stays a property, and its TWO changes are
// `gestureIdOf(gesture)` → `GESTURE_KEY` and the DELETED `write`: `commit: (gesture, value): void => { drag.release(GESTURE_KEY, value) },`
/** **THE OUT-HAND** (design §1): the ghost turn AND the read-out's, RETURNED because the subscription that drives them is the shape's. */
export function startGutterAffordance (runtime: Runtime): {
  readonly attached: boolean
  readonly renderGhost: () => void
  readonly renderPaneSize: () => void   // design §4 S1–S4, the DELETED sink's successor: NOTHING where `shape().source.panes !== 'record'` (a `'default'` arm is a family the record did not answer, never a reading); else `String(getViewClient().paneSizeOf(DEFAULT_PANE_ID))`, SKIPPED where `authoredSettingOf(runtime, GUTTER_STATUS_ID)` already answers it — a PRESENCE match, `value` being a `String(…)` and never `undefined`, so this turn has NO removal arm (`design.md` §4, `D-163`), and otherwise ONE `state-slice` `content` write on `GUTTER_STATUS_ID` whose non-`applied` status `console.error`s — no tier, no route: a RENDER write of a value the delivery carries.
}
/** **THE SURFACE'S OWN MEMBER, ASKED AND NOT REMEMBERED** (design §4, `D-129`) — `runtime.nodeState(nodeId)`'s `states[0].props`, TOTAL (a throw, an absent node or no `states` ⇒ `readable: false`); `authoredSettingOf`'s twin, and NO site remembers a write after this pass. */
function authoredPropOf (runtime: Runtime, nodeId: string, name: string): { readonly readable: boolean; readonly held: unknown }
export interface OverlayPaneCrossing { readonly open: () => boolean | null; readonly write: (open: boolean) => Promise<unknown> | void }   // design §4, `D-127`'s `F6` — this type is stated HERE because it MOVES (the treatment §1 gives `PaneDragSurface`), and §5's census, which is the names whose signature must NOT move, is therefore untouched by it (`D-45`): `write` HANDS BACK the crossing's own `setPane` answer, where the `void` DISCARDED the only signal that can tell *not yet processed* from *refused*; `main()`'s site drops its `void` and returns the promise, and the act keeps it in ONE `settle(ordinal, answer)` whose ONLY settles are a `{status:'refused'}` answer and a LOST one (both ending the transient through `renderTurn`), while a `committed` answer settles NOTHING because the delivery is still owed.

/* ── in `createPaneDrag`'s closure — `PaneDragSurface`'s members, §1, and §2's TWO PRIVATE RELATIONS (design rev 16; `C-7`) ── */
function reportUnreached (what: string, statement: unknown): void   // design §2 `N1`, called at `M3`/`E3`/`R4`: an `absent` statement → `console.warn` with its `reason` VERBATIM (`no-view-member`/`no-route`), a `sent` one → NOTHING (that receipt is the line below), anything else → NOTHING; and a NULL `view` says it ONCE AT CONSTRUCTION so the three per-turn guards stay silent. PRIVATE: not exported (§5)
function reportReceipt (receipt: ViewWriteOutcome): void             // design §2 `N2`: THE PUSH'S ONE HANDLER, taken ONCE at construction through the client's `onWriteOutcome` and never polled, SCOPED to the `'pane'`/`'drag'` route words — `refused` → `console.error` carrying `reason`/`message`, `unread` → `console.warn`, `committed` → NOTHING (the delivery is still owed); reports and composes nothing. PRIVATE: not exported (§5)
let ghostEpoch = 0                                                        // the closure's only NEW binding: a superseded turn mutates nothing
const move = (key: string, preview: unknown): void => { /* M1–M3 */ }
const endReading = (key: string): void => { /* E1–E3 */ }                  // the ERASE, and `erasePreview` re-grained under this name
const release = (gestureId: string, final: unknown, sink: unknown): void => { /* R1–R5 */ }
const renderGhost = (): void => { /* G1–G9 */ }

/* ── the shape's ONE boot site, and `main()`'s ONE call ───────────────────────────────────────────────────────────────────── */
/** **THE DELIVERY'S ONE BODY**, now carrying THREE turns: `theme?.apply(); ghost?.(); readout?.()` — nothing else in it moves. THE HEADER
 *  SPELLS `function startViewShape(` WITH NO SPACE, because two probes in `tests/theme-declaration.test.ts` search that exact text. */
function startViewShape(theme: ThemeApplication | null, ghost: (() => void) | null, readout: (() => void) | null): void
//   startViewShape(themeApplication, gutter.renderGhost, gutter.renderPaneSize)   // `gutter` is `startGutterAffordance(runtime)`'s reading
// AND `T-5`'s FIRST-ARGUMENT re-grain is LANDED, while its `parameterNamesOf` `.toBe(2)` REDS on this THIRD parameter and is `chrome`'s same-edit re-grain (design §6, D-3, D-128); no other byte of `startViewShape` or `main()` moves.
```

## 3. The exact texts, and what the wiring READS from another module's surface

```ts
// THE ONE READ — the realm's existing pass-through, one call, no member, no tier argument, no write (D-112, L2 §3; design §4 G2):
dataRoute('read', { path: ['drag'] })

// THE TWO ROUTES the client supplies. THEY ARE `store-view-record`'s (`src/renderer/view-client.ts`, L1 §7 E-2) AND ARE CITED, NEVER DECLARED HERE:
view.commitDrag(DEFAULT_PANE_ID, { size })   // ONE write per placement change: `{ [paneId]: { size } }` at `['drag']`/`temp`; no composer
view.clearDrag()                             // the family ENDS with a tier-scoped delete, and never with a placeholder (ASM-2)

// THE DECLARATION'S ONE SPELLING (`ASM-3`, and `P-4` reads the rendered surface for THIS attribute only):
ghostTarget.setAttribute('data-ghost', 'temp') ; ghostTarget.removeAttribute('data-ghost')

// ═══ THE TAB ACT'S ONE ROW (`D-158`, `D-159`; design §3) — the whole of what this unit declares, and the whole of what the act writes ═══
// `FocusSeat` IS RE-STATED WHOLE (design §3, D-158, D-45): the SEAT ARM CARRIES THE ROW IT RESOLVED, because `seatOf` found it in
// `reading.rows` and a second lookup could miss a row the record does not hold. The id is the row's own, not a second spelling.
export type FocusSeat =
  | { readonly kind: 'seat'; readonly row: TabsRecordRow }
  | { readonly kind: 'open'; readonly id: string; readonly target: string }
  | { readonly kind: 'unresolved' }
/** **S7's ARM, MADE UNREPRESENTABLE RATHER THAN GUARDED** (design §3, D-45): the route answers an unresolved seat BEFORE any write, so the builder takes the narrowed pair — the `UnreadableReading` idiom — and the composer's third arm has no subject. */
export type ActedSeat = Exclude<FocusSeat, { readonly kind: 'unresolved' }>
/** **THE ONE SURVIVING FUNCTION OF THE COMPOSER** (design §3): the row this act writes and NOTHING else.
 *  · the SWITCH arm — `{...seat.row, active: true, lastActiveAt}`: the reading's row WHOLE, so `error`/`label` travel as carried and
 *    no member of it can be dropped (`D-76`), with the instant stamped for the `tab-has-lastActiveAt` pair;
 *  · the OPEN arm — `{id: seat.id, target: seat.target, active: true, lastActiveAt}`: NO `label` (the record's three field pairs fill
 *    it in BOTH `healedFamily` scopes) and NO `error` (an OPTIONAL member no repair supplies, so a tab that has not failed carries
 *    none — `D-158`); its id is `mintTabId`'s (`S6`); · NO third arm, NO `order`, NO `landing`, no seat id, no other row (design §3,
 *    `D-76`) — answering the record's own `TabsRecordRow`, so THIS FILE imports that type · and the CLOCK IS ITS ONE READ: `lastActiveAt`
 *    is `new Date().toISOString()` at the call, the composer's unadmitted third input, STATED here as it was not there. */
export function rowForSeat (seat: ActedSeat): TabsRecordRow

// THE ONE WRITE — the address is the ROW'S OWN, the tier the record's, the value the row, nothing re-spelled (D-136, D-142), and NEVER two leaves (design §3): `['tabs',id,'active']` beside `['tabs',id,'lastActiveAt']` is two commits, two passes and two logs for one act, and a landed `active` with a refused stamp is a state no pair refuses and no repair heals.
dataRoute('write', { path: ['tabs', row.id], tier: 'file', value: row })
```

## 4. Removed — stated as removed, and never re-declared

| Removed | What it was | Replaced by | Cite |
|---|---|---|---|
| `previewOf(gestureId: string): unknown` | the surface member that read the closure's preview | nothing: the question is asked of `['drag']` at the node's own `_tier` (design §4) | design §5, ASM-RW-4, `M-10` |
| `const previews = new Map<string, unknown>()` | the closure's storage of the placement, written by `move` and deleted by the erase | the address `['drag']` at `temp`, whose writer is `commitDrag` | `D-132` (superseding `D-90` by pointer) |
| `const gestureIdOf = (gesture: unknown): string` | a total read of a handle `id` that is a NUMBER, feeding the release's ignored parameter (`void gestureId`) | `GESTURE_KEY` (§2) | design §5 |
| `const erasePreview = (gestureId: string): void` — the NAME and its claim | "the closure's entry was deleted", the `erased` flag keeping the at-most-one rule | `endReading`: the flag now says `clearDrag` was SENT, and it is set by whichever ending turn ends the reading first | design §2, L2 §4 |
| the composition's region headstone and `move`'s docblock (their `D-90` closure-state claim) | prose asserting the preview IS closure state, and `previewOf`'s reason for existing | **COMMENT-ONLY re-grain** in the SAME edit, to the two-phase/address reading `D-132`/`D-138` fix | D-41, D-132, D-143 |
| `export function composeRecord(reading: TabsCommittedAnswer, seat: FocusSeat): Record<string, unknown>` — **THIS FILE'S, and NOT the module's nine-line namesake at `src/main/tabs-record/index.ts`** | this realm's ONE whole-record composition: `C1` the order seat, `C2` every row, `C3`/`C4` the seated row, written at `['tabs']` | `rowForSeat(seat)` (§3) and ONE `dataRoute('write', …)` at `['tabs', row.id]` — the `'seat'` repair appends, `healRecord` settles the pair — **and the THREE docblocks that name it re-grain in the SAME edit** (`focusActRoute`'s region headstone, its one-line act statement, the function's own), the treatment `previewOf` got above | design §3, `D-142`'s settled `(b)`, `D-156`, `D-157` |
| `write(value): string` — `startGutterAffordance`'s closure member the `commit` seam handed `release`, and `GUTTER_STATUS_ID`'s ONLY writer | the read-out's **SECOND AUTHORITY** (`D-129` case (b)): the gesture's CLAMPED value written into a rendered node beside `['panes']` at `file`, which `panesMustStand` already repairs (`D-105`) — they agree after a LANDED commit and come apart at a second boot, at a refused commit, at another writer's act and at a refusing release, and the RECORD wins every one | `renderPaneSize` (§2), the DELIVERY's turn; the app hands `release` NO sink and the seam keeps its signature for `demo/pane-drag-demo/demo.ts`'s sake (D-118) | design §4, design §5, `D-129`, `D-126`'s `F3`, `D-117` |
| `startThemeApplication`'s `lastApplied` (declared beside the boot baseline, tested in `applyTurn`, assigned after that write's status) AND `startOverlayApplication`'s **including its SEED** (declared beside `derived`, tested by `renderTurn`'s `same`, assigned after the render's write) | a copy of **what this realm last WROTE** — a claim about the past that a graph-touching reply REPLACING the node falsifies, so the declaration is lost and no repaint is owed because the declaration never moved; the overlay's seed went further and ASSUMED the surface already carried the removal arm without asking | `authoredPropOf(runtime, nodeId, name)` (§2): each paint asks the surface for the very member its own mutation would carry (`removal ? undefined : value`) and paints iff `wanted === undefined || !readable || held !== wanted` — the skip is a POSITIVE SETTLED MATCH and **a REMOVAL ALWAYS PAINTS**, because `D-163`'s `!readable || held !== wanted` skipped owed removals (an absent member in `props` is the state BEFORE the render applied the removal: `OV-12`'s close arm read `written: false`, `OV-14`'s tag kept `inert="true"`) — the surface ASKED and nothing remembered (`D-129`, `D-163`) | design §4, `D-126`'s `F5`/`F9`, `D-129` |
| `defaultSizeFor(element, token)` · `candidatesFor(element)` · `rightClick(gestureId)` · `renderZone()` — **the four `F8` members, each with its interface declaration and its return site** (`H1`–`H4`; decl `:2453`/`:2437`/`:2436`/`:2448`, returned `:2898`/`:2883`/`:2874`/`:2896`) | a second name for the reset's read, the relocate candidate production, an abandon alias of `cancel`, and the zone-layout turn `D-92` created | **the reset**: the affordance's OWN seam (`src/shared/gutter-affordance.ts:748`, the gesture's already-taken establishment reading, read at `renderer.ts:542` from `drag.startSizeOf`) — one read, one name; **the candidate production**: NOTHING, because `src/shared/relocate.ts` has no `src/` importer (`D-111`), so no implementation of that seam exists in `src/` after this pass; **the abandon**: `cancel` ALONE (no `contextmenu` occurs in `src/` or `tests/`); **the zone turn**: NOTHING — the app's only `source` is `domEventSource()`, which carries no `layout` member, and **no layout consumer exists in `src/`**, so no zone layout is rendered anywhere in this tree (design §5) | design §5, `D-168`, `D-92`, `D-111` |
| `renderZone`'s TWO FALSE DOCBLOCKS (`:2422`, `:2453`) — **and the four carriers beside them** (`:2393`, `:2432`, `:2454`, `:414-415`) — plus the PRIVATE bindings their removal orphans: `sourceRecord`, `zoneOf`, `zoneIdOf` and the `DEFAULT_ZONE_ID` import | prose asserting *"the shape's own delivery calls it"*, and private helpers whose only reader was the deleted turn | the TRUE sentence, in the same edit: **the delivery's ONE body is `theme?.apply(); ghost?.(); readout?.()` and it calls nothing else**; the four carriers re-grain with it, and the orphans are DELETED because a private helper with no caller is the class this pass removes (`H5`) | design §5, `D-168`, `D-148`, D-41 |
`gestures` REMAINS with a re-grained claim — ONE bookkeeping `Map`, keyed by the key each turn is handed, holding the ending flag and no value; it is not storage, because `['drag']` is keyed by pane id and is gesture-blind (`F-6`). **No name above is replaced by a local invention**: a stub L4 finds inconvenient is a design finding routed to L3 (D-45). **AND THE SURFACE'S ONE EXTERNAL TYPE USER STILL COMPILES**: `demo/pane-drag-demo/demo.ts` imports `PaneDragSurface` as a TYPE and holds `const drag: PaneDragSurface = createPaneDrag({ view: stub.members }, source)` — the app's own composition under an annotation and NOT a separate literal, so there is nothing in the demo's source to trim and a narrower fence accepts the value unchanged; what moves is the checked-in bundle, which `demo-panes` rebuilds (`D-118`).

## 5. Exports that stand, unchanged — measured at this head, and not this unit's to move

```ts
export function handleRequest(runtime: Runtime, req: RpcRequest, notify: (p: { uri: string }) => void): Promise<RpcReply>
export function driveTabsLandingPage(reading: TabsClientReading, runtime: TabsPageRuntime | null): TabsPagesReading
export function getTabsClient(runtime?: TabsNodeResolver | null): TabsClient
export function getViewClient(): ViewClient
export function mintTabId(order: readonly string[], tabId: string): TabsMintOutcome
export function closeTab(member: unknown, tabId: string): TabsCloseOutcome
export function themeWiringRole(runtime: Runtime): readonly [string, string]
export function overlayWiringRole(): OverlayWiringRole
export function getModuleClient(): ModuleClient
export function getSecurityClient(): SecurityClient
export function createPaneDrag(backing: unknown, source: unknown): PaneDragSurface
export function zoneSizeConstraint(min: number, max: number): (changed: unknown, current: unknown, next: unknown, feedback?: { reason?: string; message?: string }) => boolean
export function zoneSizeRepair(min: number, max: number): (data: unknown, feedback?: { reason?: string; message?: string }) => boolean
export type FocusActAnswer · FocusRefusal · FocusSeat · ActedSeat · export function rowForSeat   // `focus-retirement`'s, and `FocusSeat`/`ActedSeat`/`rowForSeat` are §3's (rev 11; `composeRecord` is §4's DELETION, D-143, D-158)
export interface TabsPageDrive · TabsPagesReading · TabsPageRuntime
// NOT in this list, and never stated as unchanged: `PaneDragSurface` and `PaneDragBacking` are §1's subject and §4's deletions touch them, while `renderPaneSize` is §2's RETURNED MEMBER (not an export) and `authoredPropOf` is §2's PRIVATE relation — neither may be exported, and `authoredSettingOf` is not re-declared beside it. **AND AT REV 15 §2 CARRIES TWO MORE PRIVATE RELATIONS, `reportUnreached` AND `reportReceipt`** (design §2 `N1`/`N2`): neither is exported and neither is re-declared here, so §5's census of names that must NOT move is untouched by them (`D-45`).
```

Every name above keeps its SIGNATURE and its body, with TWO stated exceptions: `createPaneDrag`'s signature stands (`backing: unknown, source: unknown`) while its `PaneDragSurface` (§1) and its body (§2–§4) are exactly what this unit rewrites; and **`composeRecord` is GONE** (§4), its one element surviving as §3's `rowForSeat`. Nothing beyond the composition's turns, the ONE seat, the ghost turn, the act's ONE ROW and the deletions moves (L2 §1, D-142, D-132, D-158).

## 6. What this file does NOT declare

- **The two client routes, the address, its tier, the `viewDeclaredRoots` entry, the two channel constants, both `ipcMain.handle` sites, the preload's and `secure-panels`' lockstep halves, and the subscription array's fourth address** — ten hunks, `docs/L2/view-record/interface.md` §8's and `app-shell`/`secure-panels`' (`L1 §5 R-1`…`R-4`). `commitDrag`/`clearDrag` are READ here and landed there, in the SAME pass (D-112, D-3).
- **`chrome`'s `tests/theme-declaration.test.ts`** — its two `ViewClientBridge` literals AND **the ONE probe THIS pass REDS: `T-5`'s `parameterNamesOf('function startViewShape(')` `.toBe(2)`, which the read-out's hand-out takes to THREE** — `chrome`'s same-edit re-grain, named and routed, never taken here (`D-3`, `D-128`) — while its two `'function startViewShape('` region probes are SATISFIED by §2's header spelling and the first-argument reading that replaced `T-5`'s old literal **IS LANDED** (design §6, D-40, D-145). **AND `demo/pane-drag-demo/demo.ts`'s two `previewOf` calls**, `demo-panes`' row: **LANDED too** — both are `stub.drag()` reads at the address now (its `address` readout and its `surfaceDrag` field), `previewOf` survives in no `src/` byte but `src/renderer/renderer.ts`'s two deletion headstones (the composition region's and `gestures`'), so `npm run typecheck` reaches `demo/` with nothing to re-grain and `DB-1` is green (`D-118`, `D-132`, D-3). **AND `tests/integration/overlay-application.test.ts` IS THAT UNIT'S TOO** (`strata/modules.json`): `OV-12`/`OV-14` are NOT re-grained — rev 12's predicate makes them green as written — while **`OV-14`'s `(b)` `idle.written` `.toBe(false)` encoded the absence-keyed skip rev 13 removed and now READS `true`** (a redundant, idempotent removal), `chrome`'s and LANDED — **and rev 14's own foreign touch is ONE COMMENT**: that file's `OV-13` sub-clause (3) still says the transient is *"cleared by the delivery"*, where a REFUSED close has no delivery and the answer is what settles it (its `.toBe(2)` count is SATISFIED by rev 14's reuse of the one clearing site, so nothing reds) — `chrome`'s same-edit and ROUTED, never taken here (`D-3`, `D-128`; design §6, §8).
- **No MCP tool, resource, group, `data` member or secure-store byte** (D-18, D-112, D-123): the ghost asks an EXISTING route and paints a declaration on an element the envelope already authors. **AND NO ROUTE ON THE `tabs` SURFACE**: `tabs.commit(row)` is the ONE-ROW verb `D-159` lands and it keeps **NO RENDERER CALLER** — its only caller is `tests/e2e/store-crossings/`'s driver — because `D-142`'s settled `(b)` fixes the act's write as the `data.write` passthrough; retiring or re-pointing that member is `app-shell`'s adjudication, **routed here and not taken** (D-3).
