# L3 — `renderer-wiring`: signatures

- **Layer:** L3 · **Module:** `renderer-wiring` · **Unit:** `pane-drag-temp` and the tab act's one row · **Branch:** `strata` (D-6) · **Rev:** 10 — **the row the tab act writes, transcribing `design.md` rev 11** (`D-158`, `D-159`; the user's instruction: *"Break out the elements of the composer that are needed for the repairs and make them separate functions"*): §3 gains the ONE surviving declaration (`rowForSeat` and `ActedSeat`) and **RE-STATES `FocusSeat` WHOLE**, because rev 11 moves its seat arm from `{kind:'seat', id}` to `{kind:'seat', row}` and a name stated twice is a second authority (D-53, D-45); §4 gains `composeRecord` as REMOVED; §5 loses it from the list of names that stand; §6 names the route this file may not take. Rev 9 — the residual-currency pass (D-145, D-41): `T-5` and the two `demo.ts` `previewOf` calls are LANDED, each with its site. Rev 8 — the one ghost arm that removes nothing. Rev 7 — re-grained WHOLE with `design.md` rev 7 §2–§5: the composition's surface, the wiring's ONE seat and constant key, the ghost turn and the deletions, transcribed as stubs for L4.
- **Rev 6's `focus-retirement` stubs stand and are NOT re-declared, with TWO stated exceptions** — `FocusActAnswer`, `FocusRefusal` and `refusalOf` stand byte-for-byte as rev 6 left them, while **`FocusSeat` is re-stated whole in §3** (its seat arm carries the row it resolved) and **`composeRecord` is DELETED** (§4), which is the one name this unit removes rather than re-declares (D-45, `D-53`).
- **Ceiling:** 150 lines, class max (D-1) · **Site:** `src/renderer/renderer.ts` unless a path is given (D-41) · **Status:** stubs for L4, one shot.

## 1. The composition's surface after the change — `PaneDragSurface` and its backing

```ts
export interface PaneDragSurface {
  startSizeOf(element: unknown, token: unknown): unknown
  boundsOf(element: unknown, token: unknown): unknown
  defaultSizeFor(element: unknown, token: unknown): unknown
  candidatesFor(element: unknown): readonly { readonly candidate: unknown; readonly distance?: unknown }[]
  move(gestureId: string, preview: unknown): void          // design §2 M1–M3: `preview.value` → ONE `commitDrag`, and the flag is cleared
  release(gestureId: string, final: unknown, sink: unknown): void   // design §3 R1–R5: sink → `commitPane` → `endReading`
  rightClick(gestureId: string): void                      // = `cancel`: the ERASE (design §2 E1–E3)
  cancel(gestureId: string): void
  renderZone(): void                                       // UNMOVED: the shape's delivery calls it beside the ghost turn
  /** **THE GHOST TURN** (design §4 G1–G9) — the shape's ONE delivery calls it: ONE `data.read` at `['drag']`, then a declared transient on
   *  the backing's `ghostTarget` — `data-ghost="temp"` iff the answer's node is a branch standing at `temp` whose `DEFAULT_PANE_ID` member
   *  carries a finite non-negative `size`; the declaration REMOVED on every other arm THAT REACHES A REMOVAL — the attribute-less target's
   *  arm returns ahead of the paint and removes nothing (`ghostTarget` below; design §4 `G9`) — and nothing thrown. */
  renderGhost(): void
  // `previewOf(gestureId): unknown` IS DELETED (§4): the address is the storage, and a member no caller uses is the `D-70` class (ASM-RW-4).
}

export interface PaneDragBacking {
  /** THE SHAPE (D-88, D-92) — every read the flow makes, and the writer of the two routes. UNMOVED. */
  readonly view?: ViewClient | null
  /** **THE PANE ELEMENT THE DECLARATION LANDS ON** — the wiring's `runtime.elementForNodeId(GUTTER_TARGET_ID)`, handed at the ONE
   *  construction site beside `view`. STRUCTURAL: anything carrying `setAttribute`/`removeAttribute`; absent, hostile or attribute-less
   *  means the turn paints nothing, removes nothing and throws nothing (ASM-RW-3). */
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
// AND THE SINK SEAM IS RE-KEYED IN PLACE, never hoisted: `D-117/LIVE-READ` probes this exact inline property form in the options
// literal of `createGutterAffordance({ … })`, so it stays a property and its only change is `gestureIdOf(gesture)` → `GESTURE_KEY`:
//   commit: (gesture, value): void => { drag.release(GESTURE_KEY, value, write) },
/** **THE HAND-OUT** (design §1): the composition's ghost turn is RETURNED, because the subscription that drives it is the shape's. */
export function startGutterAffordance (runtime: Runtime): {
  readonly attached: boolean
  readonly renderGhost: () => void
}

/* ── in `createPaneDrag`'s closure — `PaneDragSurface`'s members, §1 ──────────────────────────────────────────────────────── */
let ghostEpoch = 0                                                        // the closure's only NEW binding: a superseded turn mutates nothing
const move = (key: string, preview: unknown): void => { /* M1–M3 */ }
const endReading = (key: string): void => { /* E1–E3 */ }                  // the ERASE, and `erasePreview` re-grained under this name
const release = (gestureId: string, final: unknown, sink: unknown): void => { /* R1–R5 */ }
const renderGhost = (): void => { /* G1–G9 */ }

/* ── the shape's ONE boot site, and `main()`'s ONE call ───────────────────────────────────────────────────────────────────── */
/** **THE DELIVERY'S ONE BODY**, gaining the second argument: `theme?.apply(); ghost?.()` — nothing else in it moves. THE HEADER
 *  SPELLS `function startViewShape(` WITH NO SPACE, because two probes in `tests/theme-declaration.test.ts` search that exact text. */
function startViewShape(theme: ThemeApplication | null, ghost: (() => void) | null): void
//   startViewShape(themeApplication, gutter.renderGhost)      // `gutter` is `startGutterAffordance(runtime)`'s reading
// AND `T-5`'s re-grain IS LANDED, not owed (design §6, D-145): `tests/theme-declaration.test.ts` reads the call's FIRST ARGUMENT by name (`firstArgumentOf`), which this two-argument `main()` call satisfies; no other byte of `startViewShape` or `main()` moves.
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

// THE ONE WRITE — the address is the ROW'S OWN, the tier the record's, the value the row, nothing re-spelled (D-136, D-142), and NEVER two
// leaves (design §3): `['tabs',id,'active']` beside `['tabs',id,'lastActiveAt']` is two commits, two passes and two logs for one act, and a landed `active` with a refused stamp is a state no pair refuses and no repair heals.
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
// NOT in this list, and never stated as unchanged: `PaneDragSurface` and `PaneDragBacking` are §1's subject and §4's deletions touch them.
```

Every name above keeps its SIGNATURE and its body, with TWO stated exceptions: `createPaneDrag`'s signature stands (`backing: unknown, source: unknown`) while its `PaneDragSurface` (§1) and its body (§2–§4) are exactly what this unit rewrites; and **`composeRecord` is GONE** (§4), its one element surviving as §3's `rowForSeat`. Nothing beyond the composition's turns, the ONE seat, the ghost turn, the act's ONE ROW and the deletions moves (L2 §1, D-142, D-132, D-158).

## 6. What this file does NOT declare

- **The two client routes, the address, its tier, the `viewDeclaredRoots` entry, the two channel constants, both `ipcMain.handle` sites, the preload's and `secure-panels`' lockstep halves, and the subscription array's fourth address** — ten hunks, `docs/L2/view-record/interface.md` §8's and `app-shell`/`secure-panels`' (`L1 §5 R-1`…`R-4`). `commitDrag`/`clearDrag` are READ here and landed there, in the SAME pass (D-112, D-3).
- **`chrome`'s `tests/theme-declaration.test.ts`** — its two `ViewClientBridge` literals AND the ONE probe this change REDS: `T-5`'s `startViewShape(themeApplication)` literal, deleted by the second argument; the file's two `'function startViewShape('` region probes are SATISFIED by §2's header spelling — and that re-grain **IS LANDED** at `T-5`, which now reads the call's FIRST ARGUMENT by name and is satisfied by this unit's two-argument call (design §6, D-40, D-145). **AND `demo/pane-drag-demo/demo.ts`'s two `previewOf` calls**, `demo-panes`' row: **LANDED too** — both are `stub.drag()` reads at the address now (its `address` readout and its `surfaceDrag` field), `previewOf` survives in no `src/` byte but `src/renderer/renderer.ts`'s two deletion headstones (the composition region's and `gestures`'), so `npm run typecheck` reaches `demo/` with nothing to re-grain and `DB-1` is green (`D-118`, `D-132`, D-3).
- **No MCP tool, resource, group, `data` member or secure-store byte** (D-18, D-112, D-123): the ghost asks an EXISTING route and paints a declaration on an element the envelope already authors. **AND NO ROUTE ON THE `tabs` SURFACE**: `tabs.commit(row)` is the ONE-ROW verb `D-159` lands and it keeps **NO RENDERER CALLER** — its only caller is `tests/e2e/store-crossings/`'s driver — because `D-142`'s settled `(b)` fixes the act's write as the `data.write` passthrough; retiring or re-pointing that member is `app-shell`'s adjudication, **routed here and not taken** (D-3).
