# L2 — `app-shell`: the shell's surface, and the `view` member it lost

- **Layer:** L2 · **Module:** `app-shell` — `src/main/main.ts`, `src/main/preload.ts`, `src/main/store-channels.ts`
  and the module's battery `tests/ui-leg-seam.test.ts` (`strata/modules.json`'s row; brief §3, D-7).
- **Unit:** `focus-retirement` · **Artifact:** `l2-interface` · **Rev:** 2 — re-grained to the head this unit landed; rev 1 published the pre-deletion surface (`docs/L1/focus-retirement.md` §2, `E-3`).
- **Ceiling:** 150 lines (class max), replaced on revision and never annotated (brief §1; D-1, D-2).
- **Write scope:** `docs/L2/app-shell/` and the module's battery (brief §3); `src/**` is read-only here and no
  package is modified (D-5).

## 1. What this module is

- The composition: one Electron main entry that constructs the crossings and the app's ONE profile store, arms the
  MCP gate, registers every IPC handler the renderer can reach and creates the window (`main()`; D-65, D-97).
- The bridge: ONE `contextBridge.exposeInMainWorld('provident', bridge)` call, an interface `ProvidentBridge`
  and its implementation object in the same file, so a declared route and its arm are read off one file
  (`src/main/preload.ts`; D-112).
- The channel registry: `store-channels.ts` holds channel-name constants and nothing else — no callable, no state,
  no type, no logic — the secure crossing's TWO at this head, and the shared channel files hold the rest (its own
  header; D-41, D-123).
- Two kinds of entry, and the difference is not cosmetic: a REQUEST handled at an `ipcMain.handle` site and
  answered to its caller, or a DELIVERY sent main→renderer by the same broadcast shape the crossings share,
  carrying no value and no address (D-104, D-106, D-112, D-137).
- What this document is: this module's I/O surface and its behaviour. Structure, signatures and pseudocode are
  L3's over this same artifact id (brief §3, §4).

## 2. The surface as it stands

- The bridge's top-level members — NINE at this head, the ninth `D-112`'s five `data.*` routes — each with the
  site that answers it (D-41: the sites). A member added to this table is a bridge member added to the app, which
  no unit may do to prove anything (D-18).

| Member | Routes as declared | Kind | The sites that answer it | Cite |
|---|---|---|---|---|
| `ready` | 1 | signal | `ipcRenderer.send(IPC_READY)` → `ipcMain.on(IPC_READY)` → `backend.markReady()` | D-41 |
| `onRequest` | 1 | delivery in | `ipcRenderer.on(IPC_INVOKE, …)`; the send is the main side's request push (`preload.ts`'s header) | D-41 |
| `sendReply` | 1 | reply | `ipcRenderer.send(IPC_REPLY, reply)` → `ipcMain.on(IPC_REPLY)` → `backend.handleReply` | D-41 |
| `notify` | 1 | reply | `ipcRenderer.send(IPC_NOTIFY, payload)` → `ipcMain.on(IPC_NOTIFY)` → `mcp.notifyGraphChanged()` | D-41 |
| `security` | 5 | 4 request + 1 delivery | `IPC_SECURITY_GET`/`_SET` handles, `IPC_SECURITY_EXCLUSION` and `IPC_SECURITY_PANE` (both imported from `store-channels.ts`), and `IPC_SECURITY_CHANGED` sent by the `onSecurityChanged` callback | D-104, D-106, D-123 |
| `module` | 3 | 2 request + 1 delivery | `IPC_MODULE_GET`, `IPC_MODULE_SET_DISABLED`; `IPC_MODULE_CHANGED` sent by `onAppStateChanged` | D-104 |
| `tabs` | 4 | 3 request + 1 delivery | `IPC_TABS_READ`/`_COMMIT`/`_REMOVE`; `IPC_TABS_CHANGED` sent by the tabs surface's `onChanged` | D-112, D-137 |
| `view` | 5 | 4 request + 1 delivery | the four `IPC_VIEW_*` handles (`READ`, `PANE_COMMIT`, `ZONES_COMMIT`, `THEME_COMMIT`); `IPC_VIEW_CHANGED` sent by the view surface's `onChanged` | D-87, D-112, D-142 |
| `data` | 5 | 5 request, NO delivery | `IPC_DATA_READ`/`_WRITE`/`_DELETE`/`_LIST`/`_JOURNAL`, each forwarding the caller's argument object untouched to the boot's one `dataSurface` | D-112, D-107 |

- The `view` member's declared list, in the order BOTH halves spell it: **`read`** · **`commitPane`** ·
  **`commitZones`** · **`commitTheme`** · **`onChanged`** — `src/main/preload.ts`'s text and
  `src/renderer/secure-panels.ts`'s `declare global` copy of it, whence each member's route and tier (D-87, D-91,
  D-97, D-112, D-142; D-41: the sites):

| Member | Route | Tier | Cite |
|---|---|---|---|
| `read()` | `IPC_VIEW_READ` → `viewSurface.read()` | none of its own: one reading across the three surviving families at their declared tiers | D-87, D-112 |
| `commitPane(id, geometry)` | `IPC_VIEW_PANE_COMMIT` → `viewSurface.commitPane` | `['panes']` at `file` | D-87, brief §2 |
| `commitZones(id, zone)` | `IPC_VIEW_ZONES_COMMIT` → `viewSurface.commitZones` | `['zones']` at `mem` | D-91, brief §2 |
| `commitTheme(token, attributeName)` | `IPC_VIEW_THEME_COMMIT` → `viewSurface.commitTheme` | `['theme']` at `file` | D-97, D-98 |
| `onChanged(handler)` | `IPC_VIEW_CHANGED`, main→renderer | no tier: a delivery, and no request crosses it | D-137 |

- `read` takes no argument and answers one reading of **three families — `panes`, `zones`, `theme` — with three
  `source` arms** (`source: {panes, zones, theme}`, each `'record' | 'default'`): the answer is spelled INLINE at
  both declaration sites and composed once at `ViewRecordReading`'s `reading()` (D-87, D-91, D-97, D-142). Each of
  the three write members names a pane id, a zone id or the appearance act's pair and **never a path** — the crossing
  composes the address — and `onChanged` delivers that the view moved and never its value (D-87, D-112, D-137).
- The `data` member is five routes over five request channels and **no delivery**: a `data.*` push would either
  duplicate a family's own push or tell a realm that nothing it can read moved (D-112, D-107).
- Every request above is registered in `main()` and nowhere else under `src/`; the deliveries are sent from the
  callbacks `main()` hands the crossings at their construction (D-41, D-65).

## 3. What `focus-retirement` did to this member

- `commitFocus` is **DELETED at this head**, not deprecated and not superseded: no member, route or channel
  replaces it, and the act it fronted is the tab record's own write, reached through the `data.write` route already
  declared above (D-142's settled shape `(b)`, D-18, D-136).
- The edit took **THREE things, and only the first is the member the ruling names** (D-142, `E-3`, D-41): (i)
  `commitFocus`'s declaration and its `ipcRenderer.invoke(IPC_VIEW_FOCUS_COMMIT, …)` arm; (ii) the `read` answer those
  sites spell INLINE — its `focus` result member and its `source.focus`; (iii) the `ViewFocusMirror` specifier. `main()`
  lost its handle site, and BOTH imports now take the FIVE names from `../shared/view-channels.js` (D-41).
- **What it did not reach here**: the three surviving write members keep their declared shapes and their arms,
  `read` keeps its route and its now-three-family answer, and the change subscription keeps its registration at both
  ends (D-142, D-112).
- A route leaves **both sides at once**, and this unit's rows were one landing: `E-2` took the constant out of
  `src/shared/view-channels.ts`, `E-3` took this half's declaration and its arm out, so neither side points at a name
  the other still serves (D-14, D-142, `E-2`, `E-3`).

## 4. The lockstep rule, stated where the second half lives

- The `view` member's type exists **twice in this tree**: `src/main/preload.ts` declares it, and
  `src/renderer/secure-panels.ts` carries a `declare global` copy of the same text. The two halves agree member for
  member — FIVE each at this head, in one order — or the crossing's own comparison row reds
  (`tests/integration/store-view-record/crossing.test.ts`; D-112's lockstep rule).
- **The two halves were ONE edit and it was `E-3` + `E-4`**, so both files lost the same three in the same pass —
  `src/main/preload.ts` is this module's (`E-3`), `src/renderer/secure-panels.ts` is the `secure-panels` module's
  (`E-4`), and a half landing alone was RED by construction, the pair disagreeing until the second lands (D-142, §4).

## 5. What the deletion does not touch

- The data surface's **declared roots**: `main()` still builds `createDataSurface({ profileDir: app.getPath('userData'),
  store: centralStore, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] })`, and `viewDeclaredRoots()`
  answers **THREE** entries where it answered four — a root the guard no longer sees is a root the deletion has taken (D-101, D-142, `E-2`, `F-4(b)`).
- The boot's **one `createProfileStore` batch**: one construction, one store, with the tab record's set and the view
  record's set spread into the same `constraints` array, where `viewConstraintDeclarations` now declares three and
  keeps its name and its place in that one call (D-65, D-87, D-97, D-142).
- The **channel constants' registry**: `store-channels.ts` is the secure crossing's two constants and no byte of it
  moves here; the view channels live in `src/shared/view-channels.ts`, now FIVE names, where the deleted route's
  constant left in `E-2`'s edit and both of this module's imports take those five (D-41, D-123).
- The **transport setup**: `transportFromArgs`/`portFromArgs`, the one `new ProvidentMcpServer({…})` options pass,
  the three `ipcMain.on` sites (`IPC_READY`/`IPC_REPLY`/`IPC_NOTIFY`), `mcp.start()` and `mcp.followExclusion(…)`
  are unmoved by this unit — none is on `D-142`'s deletion list (`E-3`; brief §2's Transports row).
- The **MCP registrations**: `provident.focus` keeps its name, its purpose and its declared `{target?, newTab?}`
  shape, so no tool, resource, group, channel or bridge member is added here to replace the deleted member
  (D-18, D-141, D-142).
- The **window** and its options object — one `BrowserWindow` construction with the preload join and
  `contextIsolation`/`nodeIntegration` as they stand — are this unit's nothing: no member of it moves (D-121).

## 6. The sender guard, and what a removed channel leaves behind

- **No handler in `main()` inspects its `IpcMainInvokeEvent`**: the invoke parameter is spelled `_event` or omitted
  across all eighteen `ipcMain.handle` sites, no handler reads `sender` or `senderFrame`, and `permitted(` occurs
  nowhere under `src/` — the shell's own measured precedent, asserted over comment-elided code (D-121, D-112).
- **This unit adds no guard and no channel**: a guard on one crossing alone would make it stricter than its
  siblings, and the surviving `view` channels keep the sibling absence (D-121, D-112).
- The one privilege class that owes the guard the rest do not have is the window-control group, which is a later
  unit's and not this one's — named here so the absence is read as a decision (D-121).
- **A removed channel leaves no reachable handler**: the constant left `view-channels.ts`, BOTH imports dropped the
  name, `main()`'s `ipcMain.handle` site went, and the preload's arm went with its declaration — so an
  `ipcRenderer.invoke` at that channel reaches nothing at either end and no spelling of it survives under `src/`
  (D-14, D-142).
- The surviving channels still refuse what the guard owns elsewhere: a write at a family's non-declared tier is
  `declared-tier` at the data surface (D-101), and after the deletion `['focus']` is declared nowhere, so a
  `data.write` at that address is admitted rather than refused — the arm the L1 battery measures (`F-4(b)`;
  D-142, D-101).

## 7. The module's battery, and why this pass re-grains none of it

- `tests/ui-leg-seam.test.ts` pins the shell↔`ui`-leg seam — the boot's user-data override and its argv scan, the two
  path derivations, the group vocabulary's second live copy and the leg's own operator-profile witness — and it is a
  **marked file reporting on notice**, never gating evidence (`SEAM-1`…`SEAM-4`, `R0(c)`; brief §6's `ui` row, D-30).
- **Not one of its rows names the `view` member, `commitFocus`, or any `IPC_VIEW_*` literal**, so the deletion
  reaches no subject it holds; and every ordering relation it computes has both endpoints either below this
  edit's import change or above its handler site, so each shifts equally and none moves (D-41).
- The member's **absence** is measured elsewhere and deliberately not duplicated here: a driver envelope reporting
  `typeof window.provident.view.commitFocus` from inside the renderer realm is the L1 battery's row `F-4(c)`, and a
  claim of that kind belongs to a battery authored after the sweep, which gates (D-40, D-142).

## 8. Assumptions, each with the alternative it rejected (D-1)

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L2-1 | `read`'s declared answer lost `focus` and its `source.focus` **in the same pass as the member and the `ViewFocusMirror` specifier — §3's THREE, not the one removal the ruling names** — because the answer is spelled INLINE at both declaration sites and `E-2` had taken the address, tier, declaration and `mirrorFrom` the answer was composed from, so a half keeping them would publish a member the shell no longer serves; `src/main/preload.ts`'s `read` line and `src/renderer/secure-panels.ts`'s copy each carry three families and three `source` arms at this head, and they agree (D-142, `E-3`, D-112) | the ONE-member reading this document filed at rev 1: delete `commitFocus` alone and let the inline answer's `focus`/`source.focus` stand, on the guess that the answer shape was the crossing's to re-grain (`E-9`). It was wrong by measurement, not by taste — **the answer line names the family TWICE** (a result member and a `source` arm), so a one-member edit lands a declaration the crossing stops answering — invisible to `invoke`'s erased answer type, and caught only by the crossing's own comparison row, which holds that answer line's exact no-`focus` text — and both halves stay in lockstep (D-142, `E-3`, D-112, D-40) |
| ASM-L2-2 | `tests/ui-leg-seam.test.ts` is left byte-unmoved, for §7's reason | adding a row here asserting the deleted member's absence, which duplicates the L1 battery's `F-4(c)` and puts a bridge-absence claim in a file whose subject is the leg's boot seam (D-40) |
| ASM-L2-3 | the map's `endpoints` figure for this row is the L1 map's to carry and is never predicted or restated here (D-26, D-43) | writing the post-deletion figure into this document, which is the drift a second home for a count always produces (D-43) |
