# L2 — `app-shell`: the shell's surface, and the `view` member the drag pair widens

- **Layer:** L2 · **Module:** `app-shell` — `src/main/main.ts`, `src/main/preload.ts`, `src/main/store-channels.ts`
  and the module's battery `tests/ui-leg-seam.test.ts` (`strata/modules.json`'s row; brief §3, D-7).
- **Unit:** `pane-drag-temp` · **Artifact:** `l2-interface` · **Rev:** 4 — the pair's landing read back off the tree and the page's
  present tense re-grained to it (§2's seven, §3's twenty-site census, §4's pair); rev 3 re-grained rev 2 to the drag pair; rev 2 was
  `focus-retirement`'s landed head (`docs/L1/pane-drag-temp.md` §2, §5 `R-3`, §7 `E-3`; D-145, D-1).
- **Ceiling:** 150 lines (class max), replaced on revision and never annotated (brief §1; D-1, D-2).
- **Write scope:** `docs/L2/app-shell/` (brief §3); `src/**` is read-only here and no package is modified (D-5).

## 1. What this module is

- The composition: one Electron main entry that constructs the crossings and the app's ONE profile store, arms the
  MCP gate, registers every IPC handler the renderer can reach and creates the window (`main()`; D-65, D-97).
- The bridge: ONE `contextBridge.exposeInMainWorld('provident', bridge)` call, an interface `ProvidentBridge` and its
  implementation object in one file, so a declared route and its arm are read off one file (D-112).
- The channel registry: `store-channels.ts` holds channel-name constants and nothing else — the secure crossing's TWO at
  this head — and the shared channel files hold the rest (its own header; D-41, D-123).
- Two kinds of entry: a REQUEST handled at an `ipcMain.handle` site and answered to its caller, or a DELIVERY sent
  main→renderer by the broadcast shape the crossings share, carrying no value and no address (D-104, D-106, D-137).

## 2. The surface as it stands

- The bridge's top-level members — NINE, the ninth `D-112`'s five `data.*` routes — each with the site that answers it
  (D-41: the sites). **The drag pair adds no tenth member**: it widens the one that already fronts the view record (D-18).

| Member | Routes as declared | Kind | The sites that answer it | Cite |
|---|---|---|---|---|
| `ready` · `onRequest` · `sendReply` · `notify` | 1 each | signal · delivery in · reply · reply | `IPC_READY`→`ipcMain.on(IPC_READY)`→`backend.markReady()`; `ipcRenderer.on(IPC_INVOKE, …)` (the send is the main side's push); `IPC_REPLY`→`backend.handleReply`; `IPC_NOTIFY`→`mcp.notifyGraphChanged()` | D-41 |
| `security` | 5 | 4 request + 1 delivery | `IPC_SECURITY_GET`/`_SET` handles, `IPC_SECURITY_EXCLUSION` and `IPC_SECURITY_PANE` (both from `store-channels.ts`), and `IPC_SECURITY_CHANGED` sent by `onSecurityChanged` | D-104, D-106, D-123 |
| `module` | 3 | 2 request + 1 delivery | `IPC_MODULE_GET`, `IPC_MODULE_SET_DISABLED`; `IPC_MODULE_CHANGED` sent by `onAppStateChanged` | D-104 |
| `tabs` | 4 | 3 request + 1 delivery | `IPC_TABS_READ`/`_COMMIT`/`_REMOVE`; `IPC_TABS_CHANGED` sent by the tabs surface's `onChanged` | D-112, D-137 |
| `view` | 7 | 6 request + 1 delivery | the six `IPC_VIEW_*` handles (`READ`, `PANE_COMMIT`, `ZONES_COMMIT`, `THEME_COMMIT`, `DRAG_COMMIT`, `DRAG_CLEAR`); `IPC_VIEW_CHANGED` sent by the view surface's `onChanged` | D-87, D-112, D-142, D-132 |
| `data` | 5 | 5 request, NO delivery | `IPC_DATA_READ`/`_WRITE`/`_DELETE`/`_LIST`/`_JOURNAL`, each forwarding the caller's argument object untouched to the boot's one `dataSurface` | D-112, D-107 |

- The `view` member's declared list, in the order BOTH halves spell it — **SEVEN, at BOTH halves at this head** (the drag pair
  landed at each in one edit, and the crossing's comparison row is the witness): `read` · `commitPane` · `commitZones` ·
  `commitTheme` · `commitDrag` · `clearDrag` · `onChanged` — `src/main/preload.ts`'s text and `src/renderer/secure-panels.ts`'s
  `declare global` copy of it, whence each member's route and tier (D-87, D-91, D-97, D-132, D-112, D-142, D-145; D-41: the sites):

| Member | Route | Tier | Cite |
|---|---|---|---|
| `read()` | `IPC_VIEW_READ` → `viewSurface.read()` | none of its own: one reading across the three declared families at their tiers | D-87, D-112 |
| `commitPane(id, geometry)` | `IPC_VIEW_PANE_COMMIT` → `viewSurface.commitPane` | `['panes']` at `file` | D-87, brief §2 |
| `commitZones(id, zone)` | `IPC_VIEW_ZONES_COMMIT` → `viewSurface.commitZones` | `['zones']` at `mem` | D-91, brief §2 |
| `commitTheme(token, attributeName)` | `IPC_VIEW_THEME_COMMIT` → `viewSurface.commitTheme` | `['theme']` at `file` | D-97, D-98 |
| `commitDrag(id, geometry)` | `IPC_VIEW_DRAG_COMMIT` → `viewSurface.commitDrag` | `['drag']` at `temp` — the gesture's in-process reading, one whole value per pane id | D-132, D-137 |
| `clearDrag()` | `IPC_VIEW_DRAG_CLEAR` → `viewSurface.clearDrag` | `['drag']` at `temp` — a DELETE that ENDS the family, answering `committed` whether or not it stood | D-132, §9 `ASM-2` |
| `onChanged(handler)` | `IPC_VIEW_CHANGED`, main→renderer | no tier: a delivery, and no request crosses it — it fires for `['drag']` too, because the record's subscription array gained that root (D-137) | D-137 |

- `read` takes no argument and answers one reading of **three families — `panes`, `zones`, `theme` — with three `source`
  arms** (`source: {panes, zones, theme}`, each `'record' | 'default'`), spelled INLINE at both declaration sites. **IT
  GAINS NO DRAG MEMBER**: the temp reading is read where the tiers are read — `provident.data.read({path: ['drag']})`,
  whose node carries its own `_tier` — so a consumer asks the readout and no `dragOf` is minted (D-144, D-133, D-142).
- Each write member names a pane id, a zone id, the appearance act's pair or a placement, and **never a path** — the
  crossing composes the address; `onChanged` delivers that the view moved and never its value; and every request above is
  registered in `main()` and nowhere else under `src/`, the deliveries being sent from the callbacks `main()` hands the
  crossings at its construction (D-87, D-132, D-137, D-41, D-65).

## 3. The landing: two handle sites, and the text both halves carry

- `E-3` was TWO `ipcMain.handle` sites in `main()` and TWO members in the preload's `view` block — and it landed in ONE edit
  WITH `E-4`'s copy in `src/renderer/secure-panels.ts`, because one half alone answers a route the other cannot reach (§5 `R-3`;
  D-112, D-145).
- The two sites stand beside the four `IPC_VIEW_*` handles `main()` already registered, ahead of `viewSurface.attach()`,
  and neither inspects its `_event`. The file's handler count is a MEASUREMENT: **twenty** at this head (§6).
- The surface's options, its store and its push are UNMOVED: both routes reach the same record over the same
  `centralStore`, so `createViewSurface` gains no option and `main()` gains no construction; and both imports take the SEVEN
  names from `src/shared/view-channels.ts` (D-112, D-132, D-87, D-41; no byte of `store-channels.ts` moves, D-123).

```ts
// (1) THE IMPORT — main.ts and preload.ts alike (was five names from the same file):
import {IPC_VIEW_READ, IPC_VIEW_PANE_COMMIT, IPC_VIEW_ZONES_COMMIT, IPC_VIEW_THEME_COMMIT, IPC_VIEW_DRAG_COMMIT, IPC_VIEW_DRAG_CLEAR, IPC_VIEW_CHANGED} from '../shared/view-channels.js'
// (2) main()'s TWO HANDLE SITES — after the IPC_VIEW_THEME_COMMIT line, before `viewSurface.attach()`:
ipcMain.handle(IPC_VIEW_DRAG_COMMIT, (_event, id: unknown, geometry: unknown) => viewSurface.commitDrag(id, geometry))
ipcMain.handle(IPC_VIEW_DRAG_CLEAR, () => viewSurface.clearDrag())
// (3) THE PRELOAD'S TWO ARMS in the bridge object's `view`, beside `commitTheme`'s; the declared text is (4)'s, verbatim:
//   commitDrag(id: string, geometry: unknown) { return ipcRenderer.invoke(IPC_VIEW_DRAG_COMMIT, id, geometry) }
//   clearDrag() { return ipcRenderer.invoke(IPC_VIEW_DRAG_CLEAR) }
// (4) THE MEMBER — these SEVEN lines, in this order, in BOTH halves; preload.ts opens `view: {` at four spaces' indent,
// secure-panels.ts opens `view?: {` at eight, and the comparison reads each block at its own indent (D-112):
read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>
commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
commitDrag(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
clearDrag(): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
onChanged(handler: () => void): () => void
```

- The three comment figures moved with this block, in the same edit and all as landed: the preload's `ONE member, FIVE routes` and
  `secure-panels.ts`'s `SIX routes` both read **SEVEN**, and `main()`'s `THE VIEW RECORD'S FOUR CHANNELS` reads **SIX** —
  the secure half's having been stale already was corrected in that edit rather than carried (D-41: a cite names a site).

## 4. The lockstep rule, as it now reads

- The `view` member's type exists **twice in this tree**: `src/main/preload.ts` declares it and
  `src/renderer/secure-panels.ts` carries a `declare global` copy. The two halves agree member for member — **SEVEN
  each at this head**, in one order — or the crossing's own comparison row reds (`tests/integration/store-view-record/crossing.test.ts`;
  D-112's lockstep rule, D-142's precedent, D-145).
- The comparison is a COMPARISON, not a promise: it finds each block by its own opener, reads at that block's own indent,
  skips comment and blank lines, strips a trailing comma, and holds the seven lines' exact text **and its order** — so a
  member landing at one site only reds with both texts in hand, and a pair carrying both members out of order reds too.
- **The pair is ONE edit** (`E-3` with `E-4`), and it landed as one: a half alone is red by construction and, worse, SILENT in the
  app — a preload answering a route the pane's copy cannot name, or a member no handler answers (§5 `R-3`; D-112, D-142).
- That row is `store-view-record`'s and is **GREEN at this head**, its comparison reading seven against seven: the red it carried was
  the pair's ABSENCE, never a defect here (§7, D-145).
## 5. What the edit does not touch

- The **declared roots** line and the boot's ONE `createProfileStore` batch are unmoved: `main()` still passes
  `declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()]` and gains no entry — the `['drag']` entry is the record's
  hunk, admitted by that line alone — and the drag family declares nothing, so no pair joins the batch (D-101, D-132).
- **THE SECURE STORE GAINS NOTHING** (D-132): no address, no declaration, no route and no member, and not one byte of the
  `security` member moves — the gesture's geometry crosses the NORMAL store through `view`, while `['operator-pane']` at
  `mem` holds the operator pane's OPEN state, a different fact in a different crossing (D-123).
- The transport setup (`transportFromArgs`/`portFromArgs`), the one `new ProvidentMcpServer({…})` options pass, the three
  `ipcMain.on` sites, `mcp.start()`, the window and its options: unmoved (brief §2's Transports row; D-121).
- The map's `endpoints` figure for this row is **CARRIED and never derived**: L1 §2 reads it UNMOVED, no count at this head
  yields it, and this document neither predicts nor restates it (D-26, D-43).

## 6. The sender guard, and the sites this landing added

- **No handler in `main()` inspects its `IpcMainInvokeEvent`**: the invoke parameter is spelled `_event` or omitted across
  all twenty `ipcMain.handle` sites at this head — no handler reads `sender` or `senderFrame`, and `permitted(` occurs
  nowhere under `src/`, asserted over comment-elided code (D-121, D-112).
- The drag pair adds no guard, no channel file and no second authority: its two sites discard their event exactly as the
  four `IPC_VIEW_*` sites beside them do, so no crossing becomes stricter than a sibling (D-121).
- The one privilege class that owes a guard the rest lack — the window-control group — is a later unit's, named so the
  absence is read as a decision rather than as an omission (D-121).

## 7. The module's battery, and why this pass re-grains none of it

- `tests/ui-leg-seam.test.ts` pins the shell↔`ui`-leg seam — the boot's user-data override and its argv scan, the two path
  derivations, the group vocabulary's second live copy and the leg's own operator-profile witness — and it is a **marked
  file reporting on notice**, never gating evidence (`SEAM-1`…`SEAM-4`, `R0(c)`; brief §6's `ui` row, D-30).
- **It is BYTE-UNMOVED, and the reason is measured**: the file carries no `ipcMain`, no `IPC_` name, no `provident.`
  member and no whole-word `view` at all, so not one row names this member, `commitDrag`, `clearDrag` or a channel literal;
  and every ordering relation it computes (`SEAM_AT > MAIN_FN_AT`, `SEAM_AT < SETTINGS_CARRIER_AT`, `SEAM_AT <
  PROFILE_STORE_AT`, `scanAt > MAIN_FN_AT`, the `scanAt`…carrier slice) has both endpoints ABOVE the two new handler lines,
  so each shifts equally and none moves (D-41).
- The pair's ARRIVAL and its absence are measured elsewhere and not duplicated here: the crossing's comparison row above and
  the L1 battery's `P-1`…`P-6` — a bridge claim in a leg-seam file is a subject this battery does not hold (D-40, D-142).

## 8. Assumptions, each with the alternative it rejected (D-1)

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L2-4 | the two drag members land INSIDE the existing `view` member — no tenth top-level member — because the act is the view record's and the crossing already fronts it (D-18, D-112, D-132) | a top-level `drag` member of its own, which would be a bridge member added to the app to prove a unit — the surface D-18 refuses |
| ASM-L2-5 | §3's block gives all SEVEN member lines VERBATIM in order, so neither half transcribes from memory or from the five it found standing | naming only the two new members and leaving the five that stood to the reader, which is the improvisation the comparison row catches |
| ASM-L2-6 | `tests/ui-leg-seam.test.ts` is left byte-unmoved, for §7's measurement | adding a row here asserting the pair's arrival, which duplicates the crossing's comparison row in a file whose subject is the leg's boot seam (D-40) |
