# L1 — `pane-drag-temp`: the drag's in-process value at `temp`, its release at `file`

- **Layer:** L1 · **Unit:** `pane-drag-temp` · **Branch:** `strata` (D-6) · **Rev:** 3 — rev 1 carried `strata/next-steps.md`
  row `5`, rev 2 answered seven findings IN PLACE, rev 3 re-grains the SEAT alone: `D-146`'s row `PS-1`…`PS-4` landed
- **Charter:** the user's ruling, verbatim — *"Gutter and pane drag should write to temp while in process and commit to file
  during the sink on release. The constraint creating it enforces the existence, but should not coerce the non-default
  values (if they exist)"*. Its **second sentence is measured already true** (`panesMustStand`'s value arm writes NOTHING,
  `D-105`, `D-132`), so this unit is the first sentence (D-132)
- **Write scope:** `docs/L1/`, `tests/e2e/`, `strata/modules.json`, `strata/marks.json` (brief §3, D-30); `src/**` is
  read-only here and the two packages are never modified (D-5) · **Ceiling:** 150 lines, split by owner (D-1, D-2).
  **Inputs:** brief §1/§3/§4/§6, row `5`, `D-132` `D-137` `D-138` `D-101` `D-105` `D-133` `D-134` `D-144` `D-112` `D-135`
  `D-136` `D-139` `D-41` `D-26` `D-30` `D-40` `D-43` `D-146` `D-147`

## 1. What this unit is, and what it does not touch

- The gesture stays **TWO-PHASE**: the drag-update turns write an in-process reading and `release` keeps its `commitPane` —
  *"the drag-update, release-commit style stays"* (`D-138`, unamended from `D-132`), and the reading becomes an
  **ADDRESSABLE FACT at a tier that persists nowhere**: one family at **`['drag']` at `temp`**, keyed by pane id,
  `{ [paneId]: { size } }` — `D-90`'s judgement is **superseded by pointer** (`D-132`, `D-46`).
- **No `temp` tier was written anywhere under `src/` when this design was taken** (measured, `D-132`) — **and the whole family's surface now stands**: an
  address and tier constant, a `viewDeclaredRoots` entry, two routes, two channels, two handlers, both bridge halves, two
  client methods, and one existing array gained an entry (§5 `R-2`, D-145). **The root is DECLARED and not CONSTRAINTED**: the
  entry makes the guard refuse a `file` or `mem` shadow of a `temp` family, and there is **no `viewConstraintDeclarations`
  row**, because a repair whose subject is "no drag has started" mints a placeholder for data whose absence is the product
  (`D-132`, `D-101`).
- **No composer exists on either side, and the reason is measurable**: a nested write creates no parent (measured, `D-138`), so the FIRST move must write the ROOT — and the root holds one member and no sibling, so nothing is left to preserve (`D-135`, `D-136`).
- **The renderer hears it because the subscription array covers the new root IN THE SAME EDIT**: a `temp` root the delivery
  does not cover is a write the renderer never hears (`D-137`, `D-126`).
- **The ghost ASKS THE DELIVERY**: inside the view delivery body the realm reads the address through the EXISTING `data`
  member and takes the node's own `_tier` — answerable now (`D-144`), the member `D-133` refused to mint (`D-133`, `D-106`).
- **What does NOT move**: `release`'s `commitPane` and the sink's status write (`D-132`; `D-137`'s first clause was a
  MIS-READING corrected by `D-138`, so `F3` stays `pending.md` row `1`'s), and the secure store gains nothing (`D-132`).

## 2. The map rows this unit's design lands on

A row's own `paths` and `endpoints` are the MAP's and never restated here except where this unit moved one (D-43, D-26); the paths below are what this design REACHES, cited to the site (D-41).

| Row | What this unit's design lands on it | The row's paths this design reaches |
|---|---|---|
| `store-view-record` | **THE OWNER OF THE ADDRESS AND THE ROUTE** (row `5`'s own assignment): `VIEW_DRAG_ADDRESS`/`DRAG_TIER` beside `VIEW_PANES_ADDRESS`/`PANES_TIER`; the `viewDeclaredRoots` entry **with no declaration** (§5 `R-1`); `commitDrag`/`clearDrag` on the record and on `ViewSurface`; two channel constants; two client methods with the bridge type widened; the subscription array's fourth address (§5 `R-2`). **`endpoints` reads `5 → 7`** — the convention that read `6 → 5` when the focus route left, counted as the channel file's constants (D-14, D-142, D-41) | `src/main/view-record/index.ts`, `src/main/view-surface/index.ts`, `src/shared/view-channels.ts`, `src/renderer/view-client.ts` |
| `app-shell` | **TWO `ipcMain.handle` SITES AND THE PRELOAD'S TWO MEMBERS**, the pair's second half being `secure-panels` (§5 `R-3`). **`endpoints` is UNMOVED**: the figure is CARRIED and never derived — no count at this head yields it, and `D-142`'s landing moved the `view` member `6 → 5` with this row's figure byte-identical (D-43, D-112) | `src/main/main.ts`, `src/main/preload.ts` |
| `secure-panels` | **THE LOCKSTEP HALF OF THE `view` MEMBER**: the same two declarations in the SAME edit as `app-shell`'s, or a half lands alone and one of them answers a route the other cannot reach (D-112, D-142). **`endpoints` is UNMOVED** — the pane calls no `view` route at all, so what arrives is a lockstep SHAPE and not a route this module exposes (D-14, D-43) | `src/renderer/secure-panels.ts` |
| `renderer-wiring` | **THE ACT.** The composition's `move`/`erase` write and end the address instead of their closure `Map`s; `release` keeps `commitPane` and ends the temp reading after it; the wiring seats the write where the affordance's ONE preview seam already is; the ghost turn is a member the shape's ONE delivery calls, like `renderZone`, and the composition registers no subscriber of its own (D-132, `D-92`'s `M-4`). **AND THIS ROW CARRIES THE BATTERY, IN TWO FILES NOW** — §4's rows drive the ROUTES those turns send, at the preload and agent boundaries, NEVER the composition's own members: its `move`/`release`/erase turns are `pane-drag-compliance`'s to drive (§7 `E-7`; D-10, D-27), **and the SEAT's own row drives them at the wiring's entry** (`tests/unit/renderer-wiring/preview-seat.test.ts`, `PS-1`…`PS-4`, unmarked and gating, green at this head — D-146) | `src/renderer/renderer.ts`, `tests/pane-drag-compliance.test.ts` (its write-set rows), `tests/unit/renderer-wiring/preview-seat.test.ts` (the seat's row — D-146), `tests/e2e/pane-drag-temp/` (filed by this unit) |
| `central-data` | **NO `src/` BYTE**: the guard already reads `declaredRoots` from `main.ts`'s existing options line, so the new pair is admitted by the ENTRY alone (D-101). **But its census row is the one that says so** — it asserts the published set EQUAL to the declared set and owns the ROOTS' COUNT, and no document or battery beside it may restate either — so a root that is declared and unpaired is that module's own re-grain (§7 `E-6`; D-101, D-43) | `tests/integration/central-data/declared-root.test.ts` (its `D-1` row) |

`ipc-contract` and `app-envelope` are **named and NOT claimed**: the channels live in `src/shared/view-channels.ts` (the
view record's own file, the `D-87`/`D-91`/`D-97` precedent), and the ghost is a declared transient declaration on an
element the envelope already authors, so no authored node and no `src/shared/types.ts` byte is added (D-18, `D-117`).

## 3. The module-interaction table

| Question | The answer this unit fixes | Cite |
|---|---|---|
| Who writes `temp`? | the renderer's drag composition, once per observed move, seated where the affordance's one preview seam already is — so one placement change is one write | D-132, D-137, D-138 |
| Who writes `file`? | `release` alone: its unchanged `commitPane(DEFAULT_PANE_ID, {size})` → the sink's commit; the sink's own status write is untouched | D-132, D-138, D-117 |
| Over which route, at which tier? | the normal crossing's `view` member: `commitDrag(paneId, {size})` → `store.write(['drag'], 'temp', …)`; `clearDrag()` → `store.delete(['drag'], 'temp')`; the release's `commitPane` → `store.write(['panes'], 'file', …)` | D-132, D-101, D-112 |
| Who ends the in-process reading? | the erase turns (right-click / cancel) with no file commit, and the release's own turn AFTER its file commit — so the address answers `absent` once the gesture is over | D-132, row `5`'s `Closed when` |
| Who hears the delivery? | `createViewRecord.subscribe`'s array gains `['drag']`; `view-surface.attach` forwards it to `IPC_VIEW_CHANGED`; the realm's one shape subscription re-reads — and the listener is installed per ADDRESS (`listen(handle, [address])`, tier-blind), so an outside `data.write` at `temp` fires it, which is the same root-keying the guard reads | D-137, D-112, D-101 |
| What does the ghost ask? | the DELIVERY, and no member: inside that delivery body the realm asks `data.read({path:['drag']})` and reads the node's own `_tier` — one token, never a set | D-133, D-144, D-106 |
| What does the ghost render? | a DECLARED transient declaration on the pane element the wiring already holds (the class `applyPreview` already is — never a graph write mid-gesture), present while the reading names the pane at `temp` and absent otherwise | D-117, D-132 |
| Who judges the value? | nobody at `temp`: no declaration and no pair, and the record's own shape arms answer before any store verb; nothing coerces a standing value because nothing stands there to coerce | D-132, D-105 |
| Who judges the TIER? | the declared-root guard, on the entry alone: a `file` or `mem` write at the temp root is refused `declared-tier`, naming the root and the tier it is declared at — and this is the one judgement the family has | D-101, D-132 |

## 4. The `§5.U`-style e2e matrix — `tests/e2e/pane-drag-temp/`

Every row is an **agent-or-drive exchange at a process boundary**: an MCP call over the built bundle's stdio, a drive of
the app's OWN bridge member inside its renderer realm (`D-94`'s measurement channel), the app's profile file read by this
process, or a second process on the same profile. **No row imports `src/**`** and no row is skipped or softened (D-30,
D-40, D-27). **THE LIVE BOOTS THIS BATTERY TAKES ARE SERIALISED** against its siblings': every boot holds the lock file
the sibling spawning batteries derive, from spawn to proved-zero teardown, and waits for the four artifacts a boot loads
(D-94, D-74). **THAT LOCK'S REACH IS STATED, NOT CLAIMED AWAY**: `tests/e2e/bundle-boot-seam/` spawns Electron too and
holds none, so contention with that battery is a corpus gap named here and owned by the file it belongs to (D-27, D-43).
**A REAL POINTER GESTURE IS NOT THIS BATTERY'S**: a vitest row cannot synthesise one on the app's own page, so every row
drives the ROUTES the gesture's turns send — and **NO `npm run` LEG CARRIES A COORDINATE GESTURE**, which is `docs/L3/renderer-wiring/design.md` §7's reading: `npm run panes` is `tests/e2e/secure-panels/panes-live.mjs`, a `secure-panels` toggle battery whose own header states a body-issued `click` is NOT a coordinate gesture, so the sentence *"the gesture stays `npm run panes`'s"* is FALSE at this head. **TWO FILES DO DISPATCH REAL POINTER INPUT OVER CDP, AND NEITHER IS A LEG** — the DEMO's `demo/pane-drag-demo/run-live.mjs` (`D-118`) and `tests/secure-exclusion-live.mjs`, which drives the APP's own painted toggle — so §7's wider clause "no file dispatches a pointer event at a DOM element or on a live leg" is FALSE too, and what stands is narrower: **no leg carries a coordinate gesture, and the seat's new measurement is a NODE ROW, never a leg** — `tests/unit/renderer-wiring/preview-seat.test.ts` is **WRITTEN AND GREEN** (`PS-1`…`PS-4`, `4/4` over one file at this head, measured; unmarked and gating, and BOTH of §8's preconditions stand: the path is claimed on `renderer-wiring`'s `modules.json` entry and declared in `store-view-record`'s `DECLARED_SCOPE` — D-146), driving `startGutterAffordance(runtime)` over a stub runtime (`elementForNodeId` answering three element doubles that carry `addEventListener`/`removeEventListener`/`getAttribute`/`style` and `isConnected: true`, plus `applyCommand`) and a stub `window.provident`, so what the green buys is the seat's DECISIONS and its two routes — **envelope-green and never a rendered surface** (D-27, D-146), with `design.md` §8's *"measured by nothing at all"* left as that page's own re-grain (D-147). **ALL SIX OF THIS BATTERY'S ROWS ARE GREEN AT THIS HEAD**, over seven real boots — each was red for exactly the absence it names until the landing — and the seat row's four are green BESIDE them, ten green rows over this battery's six and the seat's four (D-145, D-146).

| Id | What it drives | What it measures | The boundary it stands on | Its declared failure mode |
|---|---|---|---|---|
| `P-1` | one boot with a driver envelope: a body calls `window.provident.view.commitDrag(<pane>, {size: 220})`; then `provident.data.read({path:['drag']})`; then this process reads the profile file | **the in-process value is readable at the `temp` address**: the commit answers `committed`, the read answers a branch whose node names the pane and whose `_tier` is `temp` (and whose member's is `temp` too), and the profile carries no `drag` key — a tier that persists nowhere, read back from where the store put it | the app's own preload member driven in its realm, an agent's read over stdio, the profile file | the bridge carries no such route; the read answers `absent`; the node's `_tier` names another tier (or none); a `drag` key reaches the file |
| `P-2` | one boot, one driver body, three turns in order: `commitDrag(pane, {size: 180})` (mid-gesture), `commitPane(pane, {size: 180})` (the release's file commit), `clearDrag()` (the erase ROUTE, sent directly); then reads of `['drag']`, `['panes']` and the file | **the `file` commit stands and the erase route ENDS the reading**: `['panes']` carries the size at `file`, the file carries the `panes` key and the pane, and `['drag']` answers `absent` — one datum per family and no in-process value outliving its turn. **Whether the erase MEMBER and the release TURN send that route is NOT this row's**: it is `pane-drag-compliance`'s (§7 `E-7`, `F-6` re-grained, `M-6`/`F-4`) and, at the wiring's own seats, the seat row's `PS-3`/`PS-4` (D-146) | three driven bridge routes, two agent reads, the profile file | `['drag']` still serves the reading after the clear (a clear that writes a placeholder rather than ending the family); the geometry never lands at `file`; the two addresses disagree about the size |
| `P-3` | one boot with a driver envelope: a body subscribes `window.provident.view.onChanged` and counts deliveries; then **an agent** — outside the drag — writes `provident.data.write({path:['drag'], tier:'temp', value})`; the counter is read back through the frame | **the subscription array covers the new root**: at least ONE delivery arrives after a write the drag did not make — `D-137`'s precondition measured rather than asserted, and the only place it can fail silently | the app's own bridge subscription driven in its realm, and an agent's write over stdio | ZERO deliveries: the array lacks the address, so every `temp` write is a write the renderer never hears |
| `P-4` | one boot of the app's OWN page (no driver envelope): an agent writes `['drag']` at `temp` naming the pane the committed `['panes']` family names; `provident.get_rendered_html`; then `provident.data.delete({path:['drag', <pane>, 'size'], tier:'temp'})` — **the ROW that stands, never the family root**: the data surface's `delete` names one ROW and asks it before it acts, so a BRANCH address (the family root `['drag']`, or the member record `['drag', <pane>]`) answers the empty receipt `{removed:false, tiers:[]}` and ends nothing (`docs/L3/central-data/design.md` §3, `ASM-L2-6`), and the gesture's own ending route is no substitute here: `view.clearDrag()` is reachable in this realm only through a driver envelope, whose load REPLACES the app's own graph — the very surface this row reads (§4's boot note; D-27) — and the same read | **an outside write MOVES THE GHOST** — row `5`'s own acceptance: the pane element renders the declared ghost declaration (`data-ghost="temp"`, ASM-3's spelling; the row reads the rendered surface for that ONE spelling and pins no serialiser's tag) while the temp reading names it, and the declaration is gone once the row that names its pane is removed — the ROW's reading and never the family's, whose end is the route's (`P-2`'s `clearDrag`, the store's root delete; §6 `P-2`) — so the ghost is the delivery's product and not the drag's private state | an agent's write and delete over stdio, and the app's rendered surface through `provident.get_rendered_html` | no declaration appears (the delivery never reached the ghost turn); the declaration survives the delete; the declaration appears from a write naming another pane |
| `P-5` | one boot: an agent writes `['drag']` at `file` (and again at `mem`) with a value the address would admit if it were undeclared; then reads the temp reading and this process reads the profile | **the temp root cannot be shadowed**: the write is REFUSED `declared-tier`, the standing temp reading is untouched and the profile is byte-identical — declared-root entry present, declaration absent. The SENTENCE that names the root and the tier is that surface's own row's, not this one's (D-101) | two agent writes over stdio, an agent read, the profile file | the write commits (the entry is missing, so a `file` shadow exists — the `D-101`-class defect); the refusal names another reason; a byte moves |
| `P-6` | one scratch profile, two boots: a driver body in boot one seeds the temp reading **through the app's own `commitDrag` route** and the pane is committed at `file`; this process reads the file; boot two reads both addresses | **`temp` is the tier that persists nothing**: boot two answers `absent` at `['drag']` and serves the committed pane at `file` — a restart cannot resurrect a gesture and the durable half is exactly the sink's. **Its seed is the route's and never an agent's write at the address**, which would commit today at any undeclared path and measure nothing this unit owns | two processes on one profile, and the profile file between them | boot two serves a temp reading (a tier that lied about durability); the file carries a `drag` key; the committed pane is missing after the restart |

**Which rows are NOT this battery.** The sink's single-write discipline, the at-most-one-erase rule **and the composition's
OWN turns — `release`'s ending of the reading after its file commit included** — are `pane-drag-compliance`'s (`SINK-1`,
`R-4`, `M-5`, `M-6`, `F-4`, `M-10`, the two `P-PD-SM-*` register rows and the release turn `E-8` changes), and that file's
write-set rows are re-grained **around the new middle** with `SINK-1` re-read — row `5`'s fourth clause, `renderer-wiring`'s
L3 test pass (§7 `E-7`, D-132). The record's two routes, the surface's arms, the client's two methods, the lockstep pair
member for member and `central-data`'s roots census are those rows' L2/L3 passes (§7 `E-5`, `E-6`, D-3).

## 5. The same-edit preconditions, stated as RULES (a half landed alone is a defect, not a smaller change)

- **`R-1` — the declared-root entry joins `viewDeclaredRoots()` in the SAME HUNK as the address and tier constants**, with no
  declaration: an entry outliving its family hands the guard a tier for nothing, and an address with no entry leaves the family shadowable at another tier (D-101, D-132, D-142).
- **`R-2` — `createViewRecord.subscribe`'s address array gains `['drag']` in the SAME EDIT as the address**: a `temp` root the delivery does not cover is a write the renderer never hears, and `P-3` catches it (D-137).
- **`R-3` — the `view` member's TWO halves land in ONE edit** (`src/main/preload.ts` and `src/renderer/secure-panels.ts`):
  a half that lands alone is a silent no-op, and a route the preload declares and the pane's copy does not is invisible
  here (D-112, D-142). **`R-4` — the two routes and their channels land together, both sides**: a client method whose
  channel has no `ipcMain.handle` site is a method that writes nowhere — the class `D-132` refused to half-land.
- **`R-5` — every row that counts or scopes what this unit moves is re-grained IN THE SAME EDIT**: `central-data`'s `D-1`
  (the published/declared set equality and the count it owns), `store-view-record`'s crossing row (the lockstep pair,
  member for member) and **the worktree boundary row `B-1`**, whose `DECLARED_SCOPE` must gain EVERY path this unit's
  passes write or a lawful edit reds it on the tree it measures (D-101, D-14, D-30, brief §6). **`R-6` — `SINK-1` is
  RE-READ, never retired**, and no second writer appears at the release's turn (D-138, row `5`).

## 6. `Closed when` — verbatim from `strata/next-steps.md` row `5`

> a drag's in-process value is readable at the `temp` address while the pointer moves, the release commits `file`
> through the sink, its `temp` reading is gone after the gesture, and `pane-drag-compliance`'s write-set rows are
> re-grained around the new middle with `SINK-1` re-read

`P-1` stands the first clause; `P-2` the second and the THIRD-AS-A-ROUTE (the address answers `absent` once `clearDrag` has
been sent — that the erase MEMBER and the release TURN send it is `pane-drag-compliance`'s, `E-7`); `P-6` durability,
`P-5` the tier's guard; `P-3`/`P-4` the delivery and the ghost `D-137` makes a precondition; the fourth is §7 `E-7` — and
**it landed too**, so every clause of the quote stands and row `5` closed (D-132, D-137, D-145).

## 7. The licensed edit list, by path — one writer each (D-3, D-4, `modules.md` §1)

`E-1`…`E-4` land TOGETHER in one pass — a route whose address, entry, channel, handler, halves and client arrive apart is the lockstep surface `D-132` refused to half-land (D-112, D-101, D-137).

| Id | Path (owning row) | The writes this design names | Landed by |
|---|---|---|---|
| `E-1` | `src/main/view-record/index.ts` (`store-view-record`) | the address and its tier constant, the declared-root entry (§5 `R-1`), `commitDrag`/`clearDrag` and their shape arms, and the subscription array's fourth address (§5 `R-2`); `D-135`'s composer-comment correction rides here, as that row puts it on whichever pass opens this file | its L4, one shot |
| `E-2` | `src/main/view-surface/index.ts`, `src/shared/view-channels.ts`, `src/renderer/view-client.ts` (`store-view-record`) | the surface's two routes, the two channel constants, the bridge type's two methods and the client's two statements with the widened route union | its L4, one shot |
| `E-3` | `src/main/main.ts`, `src/main/preload.ts` (`app-shell`) | two `ipcMain.handle` sites and the preload's two members; the surface's options, its store and its push are unmoved (D-101, D-112) | its L4, one shot, WITH `E-4` |
| `E-4` | `src/renderer/secure-panels.ts` (`secure-panels`) | the lockstep half's two declarations — the same text in both files, one edit (§5 `R-3`) | its L4, one shot, WITH `E-3` |
| `E-5` | `tests/integration/store-view-record/`'s batteries (`store-view-record`) | the two routes' own rows, the lockstep comparison the new members move, and **the worktree boundary row's `DECLARED_SCOPE`, which gains every path this unit's passes write** (§5 `R-5`) — that module's L2/L3 test pass (D-3, D-4) | its L2/L3 pass |
| `E-6` | `tests/integration/central-data/declared-root.test.ts` (`central-data`) | `D-1`: the published set's equality with the declared set, re-grained for a root that is declared and carries NO pair — the ROOTS' COUNT is that row's to state and is stated nowhere else — gating and unmarked, so a stale literal reds the floor (D-101, D-40, D-43) | its L2 test pass |
| `E-7` | `tests/pane-drag-compliance.test.ts` (`renderer-wiring`) | the write-set rows re-grained around the new middle — `M-10`'s preview is no longer the closure's, `M-6`/`F-4`'s erase is the address's, the two `P-PD-SM-*` register rows read the store's acts, and **`F-6`'s release terminal, which today asserts *"never a temp erase at the release terminal"*, is RE-GRAINED to assert the release's OWN ending of the reading** — with `SINK-1` RE-READ and not retired (row `5`, D-138) | its L3 test pass |
| `E-8` | `src/renderer/renderer.ts` (`renderer-wiring`) | the composition's `move`/`erase`/`release` turns, the wiring's preview seat, and the ghost turn the shape's delivery calls (§3, §4 `P-3`/`P-4`; D-132, D-137, D-144) | its L4, one shot |

## 8. What this unit does not do

- **No new MCP tool, resource, group or bridge `data` member**: the ghost asks an EXISTING route, and a `dragOf` or a
  fourth `data` member would be the surface `D-133` refused (D-18, D-112, D-133).
- **`F3` and the read-out's duplicate write are not decided here**: `D-137`'s first clause was a mis-reading corrected by `D-138`, so that finding stays `pending.md` row `1`'s (D-138, D-137).
- **The pane family's own composer removal is not this unit's**: `composePanes` becoming a lawful leaf write is the
  question `D-138` states and `D-139` inventories, and `release` keeps its `commitPane` (D-132, D-138, D-139). **No
  package change**, at any layer (D-5).

## 9. Assumptions, each with the alternative it rejected (D-1 §8)

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-1 | the temp family is keyed by PANE id and carries the placement alone — `{ [paneId]: { size } }` — so the ghost's question is asked at the node that names the pane | keying it by GESTURE id (the gate-era `temp.drag.<gestureId>.placement`), which makes the address name a gesture the ghost cannot ask about and leaves the reading with no reader (D-132, D-133) |
| ASM-2 | ending the reading is a DELETE at the family's own tier, so the address answers `absent` after the gesture | clearing it by writing an empty family, which leaves a `temp` node standing and makes "gone" weaker than row `5`'s word (D-101, row `5`) |
| ASM-3 | the ghost is a DECLARED TRANSIENT declaration on the pane element the wiring already holds — spelled `data-ghost="temp"`, present while the reading names the pane at `temp` and removed otherwise — observed through `provident.get_rendered_html` | a graph `props` write, which re-renders the pane mid-gesture — the re-render hazard `D-117`'s declared transient style write exists to avoid (D-117) |
| ASM-4 | two routes (`commitDrag`, `clearDrag`) rather than one carrying a null arm | one route with a `null` argument for the erase, which the store's boundary refuses (measured) and which is the spelling `D-140` spent a row removing (D-140) |
