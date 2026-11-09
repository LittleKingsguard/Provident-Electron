# L3 — `renderer-wiring`: signatures

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `pane-drag-temp` and the tab act's one row · **Branch:** `strata` (D-6) · **Rev:** 12 — **the state check's skip narrowed to a POSITIVE SETTLED MATCH, transcribing `design.md` rev 13** (`D-163`'s rule refuted by its own measurement, `OV-12`/`OV-14`): the two `authoredPropOf` paints skip iff `wanted !== undefined && readable && held === wanted`, so **a REMOVAL ALWAYS PAINTS** and the read is not taken on that arm — **and NOTHING IN THIS FILE MOVES BUT TWO COMMENT SENTENCES: no name, no arity and no export changes, because a private predicate's BODY is not a signature** (D-53), so `signatures.test.ts`'s transcription stands unmoved and `§2`'s `authoredPropOf` stub keeps its exact three-argument form — §2's `renderPaneSize` comment and §4's `lastApplied` row carry the corrected sentence. Rev 11 — **the read-out's hand-out and the two state-checked declarations, transcribing `design.md` rev 12** (`D-129`; `D-126`'s `F3`, `F5`, `F9` — and `F6`/`F8`/`F10`/`F11` are NOT this pass): §2's return gains `renderPaneSize` and `startViewShape` gains its THIRD parameter, §1's `release` comment records that the APP hands no sink (`write` is §4's DELETION), §3 states the new names ONCE, and §4 gains `lastApplied` beside `write`. Rev 10 — **the row the tab act writes, transcribing `design.md` rev 11**: §3 gains the ONE surviving declaration (`rowForSeat` and `ActedSeat`) and **RE-STATES `FocusSeat` WHOLE**, because rev 11 moves its seat arm from `{kind:'seat', id}` to `{kind:'seat', row}` and a name stated twice is a second authority (D-53, D-45); §4 gains `composeRecord` as REMOVED; §5 loses it from the list of names that stand; §6 names the route this file may not take. Rev 9 — the residual-currency pass (D-145, D-41): `T-5` and the two `demo.ts` `previewOf` calls are LANDED, each with its site. Rev 8 — the one ghost arm that removes nothing. Rev 7 — re-grained WHOLE with `design.md` rev 7 §2–§5: the composition's surface, the wiring's ONE seat and constant key, the ghost turn and the deletions, transcribed as stubs for L4. **AND REV 6'S `focus-retirement` STUBS STAND AND ARE NOT RE-DECLARED, with two stated exceptions** — `FocusSeat` is re-stated whole in §3 and `composeRecord` is DELETED (§4) (D-45, `D-53`) — while **THIS PASS REMOVES `write` AND `lastApplied` WITHOUT A SECOND SPELLING OF ANYTHING ELSE**: no `PaneDragSurface` member changes, `release`'s signature is UNMOVED, and `FocusSeat`/`ActedSeat`/`rowForSeat` are untouched (D-53).
- **Ceiling:** 150 lines, class max (D-1) · **Site:** `src/renderer/renderer.ts` unless a path is given (D-41) · **Status:** stubs for L4, one shot.

## 1. The composition's surface after the change — `PaneDragSurface` and its backing

```ts
export interface PaneDragSurface {
  startSizeOf(element: unknown, token: unknown): unknown
  boundsOf(element: unknown, token: unknown): unknown
  defaultSizeFor(element: unknown, token: unknown): unknown
  candidatesFor(element: unknown): readonly { readonly candidate: unknown; readonly distance?: unknown }[]
  move(gestureId: string, preview: unknown): void          // design §2 M1–M3: `preview.value` → ONE `commitDrag`, and the flag is cleared
  release(gestureId: string, final: unknown, sink: unknown): void   // design §3 R1–R5: sink → `commitPane` → `endReading`. **SIGNATURE UNMOVED, AND THE APP HANDS NO SINK** (design §5, `D-129`): `R3` keeps its position because `demo/pane-drag-demo/demo.ts` still supplies one, a realm with no crossing and no delivery to paint from (D-118); the read-out it used to author is the delivery's now.
  rightClick(gestureId: string): void                      // = `cancel`: the ERASE (design §2 E1–E3)
  cancel(gestureId: string): void
  renderZone(): void                                       // UNMOVED: the shape's delivery calls it beside the ghost turn
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

/* ── in `createPaneDrag`'s closure — `PaneDragSurface`'s members, §1 ──────────────────────────────────────────────────────── */
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

`gestures` REMAINS with a re-grained claim — ONE bookkeeping `Map`, keyed by the key each turn is handed, holding the ending flag and no value; it is not storage, because `['drag']` is keyed by pane id and is gesture-blind (`F-6`). **No name above is replaced by a local invention**: a stub L4 finds inconvenient is a design finding routed to L3 (D-45).

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
// NOT in this list, and never stated as unchanged: `PaneDragSurface` and `PaneDragBacking` are §1's subject and §4's deletions touch them, while `renderPaneSize` is §2's RETURNED MEMBER (not an export) and `authoredPropOf` is §2's PRIVATE relation — neither may be exported, and `authoredSettingOf` is not re-declared beside it.
```

Every name above keeps its SIGNATURE and its body, with TWO stated exceptions: `createPaneDrag`'s signature stands (`backing: unknown, source: unknown`) while its `PaneDragSurface` (§1) and its body (§2–§4) are exactly what this unit rewrites; and **`composeRecord` is GONE** (§4), its one element surviving as §3's `rowForSeat`. Nothing beyond the composition's turns, the ONE seat, the ghost turn, the act's ONE ROW and the deletions moves (L2 §1, D-142, D-132, D-158).

## 6. What this file does NOT declare

- **The two client routes, the address, its tier, the `viewDeclaredRoots` entry, the two channel constants, both `ipcMain.handle` sites, the preload's and `secure-panels`' lockstep halves, and the subscription array's fourth address** — ten hunks, `docs/L2/view-record/interface.md` §8's and `app-shell`/`secure-panels`' (`L1 §5 R-1`…`R-4`). `commitDrag`/`clearDrag` are READ here and landed there, in the SAME pass (D-112, D-3).
- **`chrome`'s `tests/theme-declaration.test.ts`** — its two `ViewClientBridge` literals AND **the ONE probe THIS pass REDS: `T-5`'s `parameterNamesOf('function startViewShape(')` `.toBe(2)`, which the read-out's hand-out takes to THREE** — `chrome`'s same-edit re-grain, named and routed, never taken here (`D-3`, `D-128`) — while its two `'function startViewShape('` region probes are SATISFIED by §2's header spelling and the first-argument reading that replaced `T-5`'s old literal **IS LANDED** (design §6, D-40, D-145). **AND `demo/pane-drag-demo/demo.ts`'s two `previewOf` calls**, `demo-panes`' row: **LANDED too** — both are `stub.drag()` reads at the address now (its `address` readout and its `surfaceDrag` field), `previewOf` survives in no `src/` byte but `src/renderer/renderer.ts`'s two deletion headstones (the composition region's and `gestures`'), so `npm run typecheck` reaches `demo/` with nothing to re-grain and `DB-1` is green (`D-118`, `D-132`, D-3). **AND `tests/integration/overlay-application.test.ts` IS THAT UNIT'S TOO** (`strata/modules.json`): `OV-12`/`OV-14` are NOT re-grained — rev 12's predicate makes them green as written — while **`OV-14`'s `(b)` `idle.written` `.toBe(false)` encodes the absence-keyed skip this rev removes** and moves to `true` (a redundant, idempotent removal), `chrome`'s same-edit and ROUTED, never taken here (`D-3`, `D-128`; design §6).
- **No MCP tool, resource, group, `data` member or secure-store byte** (D-18, D-112, D-123): the ghost asks an EXISTING route and paints a declaration on an element the envelope already authors. **AND NO ROUTE ON THE `tabs` SURFACE**: `tabs.commit(row)` is the ONE-ROW verb `D-159` lands and it keeps **NO RENDERER CALLER** — its only caller is `tests/e2e/store-crossings/`'s driver — because `D-142`'s settled `(b)` fixes the act's write as the `data.write` passthrough; retiring or re-pointing that member is `app-shell`'s adjudication, **routed here and not taken** (D-3).
