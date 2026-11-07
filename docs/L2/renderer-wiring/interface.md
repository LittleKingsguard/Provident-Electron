# L2 — `renderer-wiring`: the renderer realm's wiring, and the `focus` act's new body

- **Layer:** L2 · **Module:** `renderer-wiring` · **Unit:** `focus-retirement` · **Branch:** `strata` (D-6) · **Rev:** 2 — the REFUSAL CLASSES re-grained against the route, no design and no behaviour moved: a non-string `target` is THIS route's refusal value in `refused` (minted at `malformed`, no write attempted) and never the tool's, so the tool's own class is exactly one, its argument HOLDER before any invoke; `focusHandler` applies no `typeof` test to the member, which §2's first, non-string, write-route and tool-refusal arms now state, `DC-7`'s cell moves with them, and the arms list reads in `focusActRoute`'s own order
- **Ceiling:** 150 lines (class max); at the ceiling it splits by owner and is never appended (D-1, D-2)
- **Charter:** `provident.focus` keeps its name, its purpose and its declared `{target?, newTab?}` shape, and its
  act becomes a write of the TAB RECORD at `['tabs']` at `file` — made HERE from this module's own committed
  reading and handed to the existing `data.write` route as a **transparent passthrough** — while the renderer's
  focus carrier goes whole (D-141, D-142)
- **Write scope:** `docs/L2/renderer-wiring/` and this module's batteries (brief §3). `src/**` is read-only at this
  layer, and `provident-ssr`/`provident-storeroom` are never modified (D-5)

## 1. The module's surface as it stands

Sites are named, never offsets (D-41). Unless a path is given, the site is `src/renderer/renderer.ts`.

| Entry point | What drives it | What it answers |
|---|---|---|
| `handleRequest`'s `switch` | the main process's IPC invoke, one case per agent-facing method | the one `RpcReply` for that method (D-112) |
| its `case 'focus'` | `provident.focus`, through `src/main/mcp-server.ts`'s `focusHandler` | §2's answer |
| `dataRoute` | the five `case 'data.*'` arms, and from this change the `focus` act | forwards to `window.provident.data`'s five routes and composes nothing (D-112) |
| `startTabsClientInstrument` | `main()`, once, after `bridge.ready()` | one boot read plus one `tabs.onChanged` registration; every delivery re-reads and hands the reading to `driveTabsLandingPage` (D-137, D-127) |
| `driveTabsLandingPage` | the held reading (`holdTabsReading`) | each authored terminal's `css.style` — `block` where the client's witness stands, `none` where it does not, nothing at all where there is no record (D-117, D-127) |
| `startViewShape`, `startThemeApplication`, `startOverlayApplication`, `startGutterAffordance`, `startAppStateShape`, `startSecurityShape` | `main()`, each holding its own registration | the appearance declaration, the overlay's `inert`, the gutter read-out, the module rows and the security pane — **untouched by this unit** (D-97, D-125, D-104, D-106) |
| `mintTabId`, `closeTab`, `createPaneDrag`, `themeWiringRole`, `overlayWiringRole`, `zoneSizeConstraint`, `zoneSizeRepair` | their own callers | the tab mint and remove, the drag composition and the two authored-role derivations — **untouched** (D-117, D-131) |

The clients this module holds are `getTabsClient()` (`src/renderer/tabs-client.ts`), `getViewClient()`
(`src/renderer/view-client.ts`), `getModuleClient()` and `getSecurityClient()`; each is one per-realm reading
that a delivery replaces whole, never a store (D-88, D-92, D-104, D-106). The bridge's own members are
`src/main/preload.ts`'s, and the `data` member's `write(args: unknown)` is the one this unit's act reaches
(D-112, D-142).

## 2. The `focus` route's contract

The seven questions the L1 document's §3 fixes, answered in this module's terms (D-141, D-142):

| Question | This module's answer | Cite |
|---|---|---|
| Who writes the active tab? | This module, in the record's own terms: the target row's `active` reads `true` and its `lastActiveAt` is stamped now; every other row is left exactly as the reading carried it, so the value may seat two actives and the record's own repair settles the pair | D-142, D-76, ASM-3 |
| What does it compose, from which reading? | The whole record, from ONE committed `tabs.read()` answer — `order` plus one row per tab (`TabsCommittedAnswer`) — and from no other source | D-136, D-142, D-137 |
| Which route does the value take? | `dataRoute('write', …)` → `src/main/preload.ts`'s `data.write(args)` → `src/main/data/surface.ts`'s `write` → the store's write verb, with no path, tier or value read, defaulted or re-spelled on the way | D-112, D-136, D-142 |
| At which tier? | `file`, the tab record's own; the declared-root guard refuses any other | D-142, D-101 |
| Who judges it? | `exactly-one-active`, the tab record's own declaration at `src/main/tabs-record/index.ts`, whose repair normalises a second active row down to one inside the commit | D-140, D-142, D-103 |
| What does the tool answer? | The record as this module re-read it after the write — ASM-2 — with a store refusal carried as a `refused` member and never converted into a success | D-142, D-103, D-136 |
| Which delivery does it follow? | `IPC_TABS_CHANGED` → `tabs.onChanged` → the client re-reads → `driveTabsLandingPage`; the act causes the same push an external writer's change does | D-137, D-142 |

The act's arms, each total and none of them a throw (D-127, D-142):

- **Argument space** — `{target?, newTab?}` and nothing else: a non-object arguments member and an own key outside that
  pair are `focusHandler`'s BEFORE any invoke, so neither reaches this route at all (D-18, D-142).
- **A reading that is not `committed`** — the FIRST arm the route reads: no write, because `absent`, `unread` and
  `refused` are not records and the route refuses rather than composing over a state the realm never read (D-127).
- **No `target`** — no write at all, and the committed reading is the route's answer: an act that names no row has
  no act (D-142).
- **A `target` that is not a string** — no write attempted: the record as read with THIS ROUTE's own refusal beside it,
  `malformed-arguments` in `refused` (minted at `malformed`, word from the `data` ledger) because a row's `target` is a
  string (`TabsRecordRow`) — no throw, and never `focusHandler`'s, which passes the member by identity (D-142, D-112, D-105).
- **A `target` no standing row carries, `newTab` not `true`** — no write, and the answer carries the route's own
  refusal reason (ASM-5 below); opening a row here would empty `newTab: true` of its meaning (ASM-1, D-18).
- **A `target` a standing row carries** — that row is seated and `order` is unmoved by the seat; the row that
  stood active keeps its bytes, which is the written referent the repair keeps (D-142, D-76, ASM-3).
- **`newTab: true`** — exactly one new row is added to the end of `order`, carrying the caller's `target` and
  seated active, and no standing row's bytes move (ASM-1, D-142).
- **The write route's judgement passes through** — `declared-tier` (that route's own tier guard), `parent-absent` and
  the store's own refusals travel member for member through a surface that transforms nothing (D-142, D-136).
- **The tool's own refusal class is exactly one: its arguments HOLDER** — the two the first arm names, a `TypeError`
  before any invoke; every refusal a caller meets below that seam — this route's `malformed-arguments`, `target-absent`,
  an unreadable reading's and the write route's — is a VALUE in `refused`, never the tool's (D-142, D-127, D-18).

## 3. `composeRecord` — the one composition this module keeps

- **What it receives**: one committed reading of `['tabs']` (`src/renderer/tabs-client.ts`'s
  `TabsCommittedAnswer`) and the seat the route resolved — the target row's identity, the caller's `target` and
  whether the act opens (ASM-1). It reads no store, calls no route and holds nothing between calls (D-136).
- **What it answers**: the whole record the write carries, `{order, <id>: row}` — the member-keyed shape
  `src/shared/types.ts`'s `TabsRecordRow` docblock fixes for `['tabs']` (D-142).
- **`order` is preserved**: copied in the reading's own order, moved by no seat, and extended by exactly one id
  where the act opens (ASM-1, D-142).
- **Every row is copied whole**: `error`, `label` and `lastActiveAt` travel as the reading carried them; the one
  row whose bytes move is the target's, whose `active` reads `true` and whose `lastActiveAt` is stamped now for
  `tab-has-lastActiveAt` (D-142).
- **No member is invented**: the value's keys are the `order` seat and the ids the reading named, and no
  `landing` member is written — `landing` is DERIVED from the rows and its address is the landing entry's own
  row, so a string written there is a malformed row (D-76, D-140, ASM-1 below).
- **Why the composition is lawful at all**: `D-138`'s one test asks whether the write is a LEAF of an enforced
  structure, and this one is not — it is a whole-record write at an enforced root — which is exactly why it is
  BOOKED as `pending.md` row `2`'s `composeRecord` rather than hidden in a route body (D-138, D-139, D-142).
- **What it does not decide**: whether a per-tab address with enforced ancestry replaces it; row `2`'s own
  review takes that, and this document neither takes nor forecloses it (D-139, D-142).

## 4. What this module removes, and what it does not touch

- **The carrier goes whole**: `FocusCarrierSurface` with its four members `state`, `focusRoute`, `persistTarget`
  and `dispose`, the factory `createFocusCarrier`, and the per-realm binding that held it are SURFACE REMOVALS
  of this module (D-142).
- **Its two module-level helpers go with the same edit**: `answerForCarrier` and `mirrorStateOf`, which read the
  mirror and composed the model's answer (D-142).
- **The old answer assembly has no subject and leaves too**: `carriedEntryIds`, `standingAnswer`, the
  payload-carried projection arm and the `focus` model's transition call, with this module's imports of
  `src/shared/focus-model.ts` — the tool now answers the record (D-142, D-141).
- **The one thing that must NOT leave with them**: this module's focus ROLE is REPLACED by §2's route and no
  other role is; the view shape, the appearance application, the overlay, the gutter, the tab drive, the
  app-state and security shapes and the drag composition keep their behaviour exactly (D-142).
- **No new crossing is added to carry any of it**: no MCP tool, resource, group or bridge member appears, and
  `src/renderer/index.html` moves not at all (D-18, D-142).

## 5. What keeps this module's copy honest

- The copy is kept by the PUSH, never by a poll and never by the writer's discipline: `IPC_TABS_CHANGED`
  (`src/main/main.ts`'s change site) → `window.provident.tabs.onChanged` → the client re-reads →
  `holdTabsReading` → `driveTabsLandingPage` (D-137, D-92).
- An EXTERNAL writer's change travels that same push, so an agent's `data.write`, a second window's write or a
  repair moves this module's copy without this module observing the write at all (D-137, D-142).
- The one-delivery staleness `D-136` books is therefore lawful for this act: at worst the composition's input
  is one delivery old, and the delivery that answers any other writer lands before the next act (D-136, D-137).

## 6. This module's batteries — what this pass re-grains and adds

Each row states its own disposition, and its red until `src/**` lands is the point of it (D-30, D-40):

| Row | File | What it measures now | Disposition | Cite |
|---|---|---|---|---|
| `S-9` | `tests/fork-store-reads.test.ts` | the renderer's store-read surface stays empty, the site that replaced `mirrorStateOf` is the tab client's committed read plus the passthrough's `['tabs']`/`file` argument, and `commitFocus` leaves the renderer's bytes | retired assertion, re-grained (E-12) | D-142, D-112 |
| the bridge literal | `tests/theme-act.test.ts` | the `ViewClientBridge` literal carries no `commitFocus`, because the member leaves both halves of the lockstep pair | re-grained (E-12) | D-142 |
| the readings | `tests/pane-drag-compliance.test.ts` | the adopted readings and the bridge literal carry no `focus`, `source.focus` or `commitFocus`, because the family's read is gone | re-grained (E-12) | D-142 |
| `DC-5` | `tests/renderer-delivery-compliance.test.ts` | **the app's own subscriber after the act**: `driveTabsLandingPage` drives BOTH authored terminals from the post-act record — the arm `F-3` cannot carry, because a pure active-tab change leaves both witnesses invariant, `landing` being derived | added | D-76, D-127 |
| `DC-6` | same | **`composeRecord`'s round trip through the act**: the value at `['tabs']`/`file` preserves `order`, copies every row whole, seats the target, leaves the standing active row as it read it and invents no member; `newTab: true` opens exactly one row carrying the caller's target | added | D-142, D-136 |
| `DC-7` | same | the passthrough's refusals: a store refusal is carried member for member and not converted, a non-committed reading writes nothing, and a non-string `target` writes nothing and is ANSWERED rather than thrown — the route's own refusal class, whose write list and reply type this arm pins while the `reason` word beside it is §2's claim and is NOT read by the row | added | D-142, D-127 |
| its own rows | `tests/op-command-unwrap.test.ts` | `handleRequest`'s `op` and `load` cases and no reading this change reaches — so nothing here moves, which is stated rather than left silent | untouched | D-30 |

`tests/e2e/focus-retirement/` is L1's battery and not this module's own, so `F-3`'s delivery arm and ASM-2's
answer row stand one layer above this document (D-40, L1 §4).

## 7. Assumptions, each with the alternative it rejected (D-1 §8)

`ASM-1`…`ASM-3` are the L1 document's and are cited as its throughout; the three below continue its numbering, so
no id is reused for a second claim (D-1 §8).

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-4 | the written value is the record's member-keyed shape `{order, <id>: row}`, and NOT the read answer's `{order, landing, rows}` — `landing` is derived and its address is the landing entry's own row, so writing it puts a string where a row belongs (D-76, D-140) | writing the three read-answer members verbatim, which makes the derived member a stored one and leaves the record's own repair answering for a malformed row |
| ASM-5 | an act naming a `target` that no standing row carries, with `newTab` not `true`, writes nothing and answers the record as read beside a refusal reason of its own (D-18, D-142) | opening a row for every unresolved target, which empties `newTab: true` of its declared meaning (ASM-1) |
| ASM-6 | a reading that is not `committed` is refused by the route and never composed over, because a failed read is not a state (D-127) | composing over the declared empty record, which writes a record naming no tab at all |
