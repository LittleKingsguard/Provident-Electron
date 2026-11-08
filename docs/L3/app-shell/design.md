# L3 — `app-shell`: the structure, and the `view` member's two new routes

- **Layer:** L3 · **Unit:** `pane-drag-temp` · **Artifact:** `l3-design` · **Branch:** `strata` (D-6) · **Rev:** 3 — rev 2 designed `focus-retirement`'s subtraction and **LANDED**; this rev is this unit's whole document, and rev 2's hunks are read as delivered rather than carried here (D-46, D-143). The pass designed below is `E-3`: **two `ipcMain.handle` sites in `main()` and two members in the preload's `view` block — beside the SEVEN member lines both halves transcribe — in ONE edit WITH `E-4`'s copy in `src/renderer/secure-panels.ts`** (`docs/L1/pane-drag-temp.md` §2's `app-shell` row, §5 `R-3`, §7 `E-3`; `docs/L2/app-shell/interface.md` rev 3 §3, `docs/L2/secure-panels/interface.md` rev 9 §4).
- **Status:** DESIGN — **and the pair is HALF-LANDED at this head, measured**: `E-4`'s half **STANDS** (`src/renderer/secure-panels.ts`'s `view?` block carries **SEVEN** members, `commitDrag`/`clearDrag` at `:125-126`, its prose reading `SEVEN routes` at `:117`) while `E-3`'s half is **ABSENT** — the preload's `view` carries **FIVE** members with its prose reading `FIVE routes` (`:105`), `IPC_VIEW_DRAG_COMMIT`, `IPC_VIEW_DRAG_CLEAR`, `VIEW_DRAG_ADDRESS` and `DRAG_TIER` occur in **no** file under `src/` (whole-tree grep), and `main()` registers **eighteen** `ipcMain.handle` sites. **The half-landing §4 forbids is therefore STANDING in the worktree rather than predicted**, and the crossing's comparison row reds 7-vs-5 today.
- **Inputs:** `docs/L1/pane-drag-temp.md` §2/§5/§7 (`E-3`, `R-3`); `docs/L2/app-shell/interface.md` §2-§8 (the seven-member table and §3's single transcription block); `docs/L2/view-record/interface.md` rev 7 §2/§8 (the two channels and the inline answer text); `docs/L2/secure-panels/interface.md` rev 9 §4 (`R-9`); `strata/decisions.md` D-14, D-18, D-41, D-43, D-101, D-112, D-121, D-132, D-137, D-142; the `app-shell` row of `strata/modules.json` (its `paths` and its `endpoints` are read there and never restated — D-43); the tree at this head, read site by site.
- **Ceiling:** 150 lines, class max (D-1). A `:line` below is **this head's** pre-landing offset and its site name is the authority (D-41); the offsets move by the lines this edit inserts, and no hunk's position is stated by number alone.

## 0. Scope, and what this pass records

- **The edit is an ADDITION to one existing member, and the member's two halves are its one risk** (D-112): `view` gains `commitDrag`/`clearDrag` at `src/main/preload.ts` and at the renderer's `declare global` copy, and the shell's half is the two handler sites that answer their channels. **No tenth top-level member, no second channel file, no new option on `createViewSurface`, no byte of `store-channels.ts`** (D-18, D-123, D-132).
- **The address is on the NORMAL crossing** (D-132): both routes reach `viewSurface` over the boot's one `createProfileStore`, so `main()` gains no construction and no declaration — the `['drag']` root is `E-1`/`E-2`'s, admitted by the existing `declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()]` line alone (D-101, L2 §5).
- **Recorded here:** the hunks in the order L4 lands them, the text it transcribes, the pair rule as structure, the guardrails, and the commands that witness the pair. **Not recorded here:** any other module's bytes — `E-2`'s three files, `E-4`'s copy and `E-5`'s battery are theirs, and this document is written TO them (D-3).

## 1. `src/main/preload.ts` — three hunks and one prose figure

| # | Site | The write | Cite |
|---|---|---|---|
| P-1 | the `'../shared/view-channels.js'` import line (`:13`) | the `IPC_VIEW_DRAG_COMMIT` and `IPC_VIEW_DRAG_CLEAR` specifiers, **in that order, after `IPC_VIEW_THEME_COMMIT` and before `IPC_VIEW_CHANGED`** — seven specifiers on the one line | `E-3`, D-14 |
| P-2 | the TYPE DECLARATION, `ProvidentBridge.view` between `commitTheme` (`:117`) and `onChanged` (`:118`) | the two lines of §3(3), at **four spaces'** indent, on one line each and unwrapped | §3, D-112 |
| P-3 | the BRIDGE OBJECT's `view`, between `commitTheme`'s closing `},` (`:264`) and `onChanged` (`:265`) | the two arms of §3(4), at four spaces' indent, each a signature line, a `return ipcRenderer.invoke(…)` body and a closing `},` | §3, D-41 |
| P-4 | the prose header above `view:` (`:105-112`) | `FIVE routes` → `SEVEN`, and the drag pair named in the members' own sentence — §3(6), verbatim | ASM-L3-2, D-1 |

- **No punctuation repair is owed and none is made.** P-2 and P-3 insert WHOLE lines between two neighbours, so no surviving member's text, comma or order moves; `onChanged` keeps its place as the block's last member and the block's closing `},` stays where it stands (D-14, `G-3`).
- **No specifier is added to the type-only `'./view-record/index.js'` import** (`:14`): both routes' geometry is `unknown` at the boundary and their answer is spelled inline like the three commits', so `ViewPaneGeometry`, `ViewThemeRecord` and `ViewZone` remain that whole import (L2 §3, D-88).
- **The `NINE top-level members` figure beside the `store` headstone (`:138`) is UNMOVED**: the drag pair widens a member and adds none (D-18, D-112).

## 2. `src/main/main.ts` — one import, two sites, three prose figures

| # | Site | The write | Cite |
|---|---|---|---|
| M-1 | the `'../shared/view-channels.js'` import line (`:44`) | the same two specifiers, P-1's order — the two files' import lines are ONE text and stay one text | `E-3`, D-14 |
| M-2 | the view record's handler block, **after the `IPC_VIEW_THEME_COMMIT` site (`:476`) and BEFORE the `// and its change push…` line (`:477`) that explains `viewSurface.attach()` (`:478`)** | the two sites of §3(2), at two spaces' indent, neither inspecting its `_event` | `E-3`, D-41, D-121 |
| M-3 | three prose figures: the view-record import's intro (`:40`, `its four handlers`), the handler block's header (`:466`, `FOUR CHANNELS`), the `data` block's census (`:488`, `the view record's four`) | each reads **SIX**; `:466`'s header gains the drag pair's clause — §3(6), verbatim | ASM-L3-2, D-1 |

- **The two sites stand between the theme site and `attach()` because that is where the four siblings stand**: the block's header explains the sites it introduces, `attach()` is the push taken after them, and a site placed below `attach()` would land in the `data.*` block's own section, under a header that describes another crossing (D-41, L2 §3).
- **`main()`'s handler census moves `eighteen → twenty`, and this is a MEASUREMENT** (counted at this head, all eighteen spelling `_event` or omitting it). The surface's options, the store and the push are unmoved: both routes reach the same record over the same `centralStore` (D-101, D-112, D-132).
- **Nothing else in this file moves**: the `declaredRoots` spread, the batch, the transport setup, the `ipcMain.on` sites, `mcp.start()` and the window keep every byte (L2 §5; `G-2`).

## 3. The text L4 transcribes — one import, two sites, two arms, SEVEN member lines

```ts
// (1) THE IMPORT — `main.ts:44` and `preload.ts:13` alike, ONE text (was five names from the same file):
import {IPC_VIEW_READ, IPC_VIEW_PANE_COMMIT, IPC_VIEW_ZONES_COMMIT, IPC_VIEW_THEME_COMMIT, IPC_VIEW_DRAG_COMMIT, IPC_VIEW_DRAG_CLEAR, IPC_VIEW_CHANGED} from '../shared/view-channels.js'
// (2) main()'s TWO HANDLE SITES — after the IPC_VIEW_THEME_COMMIT line, before `viewSurface.attach()`:
  ipcMain.handle(IPC_VIEW_DRAG_COMMIT, (_event, id: unknown, geometry: unknown) => viewSurface.commitDrag(id, geometry))
  ipcMain.handle(IPC_VIEW_DRAG_CLEAR, () => viewSurface.clearDrag())
// (3) THE DECLARATION'S TWO LINES — `ProvidentBridge.view`, between `commitTheme` and `onChanged`, four spaces' indent:
    commitDrag(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    clearDrag(): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
// (4) THE IMPLEMENTATION'S TWO ARMS — the bridge object's `view`, in the same slot, four spaces' indent:
    commitDrag(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }> {
      return ipcRenderer.invoke(IPC_VIEW_DRAG_COMMIT, id, geometry)
    },
    clearDrag(): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }> {
      return ipcRenderer.invoke(IPC_VIEW_DRAG_CLEAR)
    },
// (5) THE MEMBER AS BOTH HALVES SPELL IT AFTER THIS EDIT — these SEVEN lines, IN THIS ORDER, one line each. preload.ts
// opens `view: {` at four spaces' indent, secure-panels.ts opens `view?: {` at eight, and the comparison reads each block
// at its own indent, skips comment and blank lines and strips a trailing comma (D-112):
    read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>
    commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    commitDrag(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    clearDrag(): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
    onChanged(handler: () => void): () => void
```

- **(6) The two prose replacements, verbatim.** `preload.ts:105-112`'s opening reads *"THE VIEW RECORD'S CROSSING (D-87, D-91, D-97, D-132, `docs/L2/view-record/interface.md` §2): ONE member, SEVEN routes — the pane geometry, the zone family, the appearance record and the gesture's in-process reading, over the boot's one store"*, and its member sentence gains, after the `commitTheme` clause: *"`commitDrag` names a pane and the placement alone — one whole value at `temp`, which no composer touches — and `clearDrag` takes nothing and ENDS that reading"*. `main.ts:466`'s header reads *"THE VIEW RECORD'S SIX CHANNELS (D-87, D-91, D-97, D-132, L2 §2)"* and gains, after the appearance commit's clause: *"and the drag pair hands the gesture's placement and its ending — one whole value at `temp`, and a delete that ends it"*. `main.ts:40` and `main.ts:488` read `six` where they read `four`.
- **The seven lines are the DECLARATION and the arms are its IMPLEMENTATION, and both are transcribed rather than remembered**: `tests/integration/store-view-record/crossing.test.ts` pins the seven texts inline and compares the two blocks, so a wrap, a re-order, a re-spelling or a member landing at one site only is a red with both texts in hand (D-112, D-142; that row is `store-view-record`'s and is not this module's to edit — D-3).
- **The arms call the surface's routes and compose nothing**: no path, no tier, no value is read, defaulted or re-spelled on this side — `clearDrag` passes NO argument, the `null` arm `D-140` spent a row removing (L2 view-record §2, D-132).

## 4. The pair rule, as structure

- **The declaration exists TWICE and no compiler relates the halves:** `src/main/preload.ts`'s `ProvidentBridge.view` and `src/renderer/secure-panels.ts`'s `declare global` copy of `Window.provident.view`. What relates them is one reader that compares them member for member and in order — **the same reader that read the pair `D-142` last moved** (D-112, D-142; `docs/L2/secure-panels/interface.md` rev 9 §4, `R-9`).
- **So `E-3` and `E-4` are ONE edit under one author's hand** (L1 §5 `R-3`): the two new members land at BOTH declarations, with the two channel specifiers and the two handler sites, or not at all.
- **What a half landing alone reds, one instrument each — and the class each instrument can and cannot see:** *(a)* **`E-3` without `E-2`** (the two constants, the surface's two routes): `npm run typecheck` reds — `TS2305` at BOTH import lines for the two specifiers, `TS2339` at the two arms if the constants exist but the surface's routes do not. This is the shell's own half-landing witness and it is a compile-time one. *(b)* **`E-4` alone, or `E-3` alone — and at this head that is the STATE OF THE TREE rather than a hypothesis:** the crossing's **comparison row** reds — seven members against five, both blocks printed (`expected [ …(7) ] to deeply equal [ …(5) ]`, measured). **`npm run typecheck` stays GREEN on this half-landing** — measured, 0 errors — and the limit is stated rather than left for an L4 to wait on: the panels half names types, imports no channel constant, and nothing compares the two blocks at compile time (rev 2's §4 recorded the same limit for the deletion). *(c)* **`E-2` alone** (constants and routes without this module's half): the crossing's **seven-site census row** reds, because it asserts `commitDrag`/`clearDrag` stand in `src/main/main.ts`, both lockstep halves and the client — a channel with a handler and no caller, or a method that writes nowhere, is the class `D-132` refused to half-land (D-14, D-132).
- **The honest limit, recorded so no L4 waits for a red that cannot come:** a half-landed pair **ships silently** — the secure pane calls no `view` member at all, so the disagreement is a declaration-level one that only the comparison reads. **The pair's witness is that comparison; the shell's witness is the typecheck leg; neither substitutes for the other** (D-112, D-142).

## 5. What must not move

- **The nine top-level members and every other member's text**: `ready`, `onRequest`, `sendReply`, `notify`, `security`, `module`, `tabs`, `view`, `data` — the drag pair widens `view` and touches nothing else (D-18, D-112, D-104, D-106, D-123).
- **The other five `view` members and their arms**: `read`'s three families and three `source` words, `commitPane`, `commitZones`, `commitTheme`, and `onChanged`'s `IPC_VIEW_CHANGED` registration — no answer member, no specifier and no `source` word moves, and `read` gains NO drag member: the temp reading is read through `provident.data.read` (D-144, D-133, D-142, L2 §2).
- **The boot's wiring**: one `createProfileStore`, the batch's declaration sets spread into its ONE `constraints` array, the one `createViewSurface({ store: centralStore, … })`, the `declaredRoots` spread, `IPC_VIEW_CHANGED`'s broadcast (`:243`), the transport setup, the three `ipcMain.on` sites, `mcp.start()` and the window (D-101, D-121, L2 §5).
- **The sender-guard pattern**: every handler discards its `IpcMainInvokeEvent`, none reads `sender` or `senderFrame`, `permitted(` occurs nowhere under `src/` — the two new sites discard theirs exactly as the four siblings do, so no crossing becomes stricter than another (D-121, L2 §6).
- **`src/main/store-channels.ts` and the secure store**: no byte, no route, no member — the gesture's geometry crosses the NORMAL store, and `['operator-pane']` at `mem` is a different fact in a different crossing (D-123, D-132).

## 6. Guardrails L4 may not violate

| id | Guardrail | Cite |
|---|---|---|
| `G-1` | **Two files, `E-3`'s hunks and nothing else**: P-1…P-4 and M-1…M-3 are the whole edit — no `E-2` file, no `E-4` byte, no test, no map, no document | D-3, L1 §7 |
| `G-2` | **No construction and no option**: `main()` gains two handler lines and no `createViewSurface` member, no batch entry and no `declaredRoots` byte | D-101, D-132 |
| `G-3` | **No re-ordering and no re-spelling**: the five surviving members keep §3(5)'s order and text, and the drag pair lands BETWEEN `commitTheme` and `onChanged` at both halves | D-112, D-142 |
| `G-4` | **Every member line is ONE line**: wrapped or re-flowed, the comparison reads a different member list | §3(5), L2 §3 |
| `G-5` | **No literal channel name and no second constant**: both arms name their imported constant and neither constant is re-spelled — `src/shared/view-channels.ts` is `E-2`'s | D-41, D-14 |
| `G-6` | **The renderer's copy is not this module's**: `src/renderer/secure-panels.ts` is `E-4`'s, written TO §3(5) and never by this author | D-3, D-112 |
| `G-7` | **No new file**: no `signatures.md`, no unit battery, no script key, no map row, no `endpoints` figure | §7, D-14, D-26, D-43 |

## 7. The battery: none owed, and no stubs file — the measure

- **No `tests/unit/app-shell/` battery and no edit to `tests/ui-leg-seam.test.ts`, measured rather than assumed:** that file carries no `ipcMain`, no `IPC_` name, no `provident.` member and no whole-word `view`, and every position it computes (`MAIN_FN_AT`, `SEAM_AT`, `SETTINGS_CARRIER_AT`, `PROFILE_STORE_AT`, `scanAt`) resolves ABOVE the two new handler lines, so each shifts equally and not one relation moves — it is **BYTE-UNMOVED** (L2 §7, D-41).
- **No `signatures.md`:** this pass mints no signature of its own — the two signatures are the three commits' text verbatim, and the one text worth pinning is pinned TWICE already: `docs/L2/app-shell/interface.md` §3 gives it verbatim and the crossing row reads it inline. A stubs file recording only additions is a copy that cannot be kept true (D-43, D-41).
- **So the witnesses are the typecheck legs and the pair comparison** — `npm run typecheck` for the shell's half against `E-2`'s names, and the crossing's comparison row for the two halves against each other, backed at runtime by the L1 battery `tests/e2e/pane-drag-temp/`, which drives `window.provident.view.commitDrag`/`clearDrag` in the app's own realm. A row here would restate an arrival those already assert, on a module whose own battery is a marked file on notice (D-30, D-40, D-142).

## 8. The commands that witness the landing

```sh
npm run typecheck        # 0 errors at this head — the shell's half against `E-2`'s two constants and two routes
npm run typecheck:tests  # 0 errors at this head — the crossing row's seven pinned texts are strings, not types
npm run build            # exit 0, the five artifacts (`brief.md` §6)
npx vitest run tests/ui-leg-seam.test.ts                              # this module's battery: 10/10 green, BYTE-UNMOVED
npx vitest run tests/integration/store-view-record/crossing.test.ts   # THE PAIR'S ONLY READER — another module's row
node "../Agent Harness/strata/lint/strata-lint.mjs" strata            # from `strata/`; the instrument is NOT in this checkout
```

- **The readings at this head, taken in this order on the tree the sibling half left**: `typecheck` **0**, `typecheck:tests` **0**, `build` **0** (five artifacts), `tests/ui-leg-seam.test.ts` **10/10 green** — and **`tests/integration/store-view-record/crossing.test.ts` `5 failed | 15 passed`**, its five reds every one the drag pair's ABSENCE: the clause-2 fourth-root delivery, the clause-4 `VIEW_DRAG_ADDRESS` write census, the wiring row's published `drag@temp` root, the **7-vs-5 lockstep comparison**, and the seven-site census row, which stops at `src/main/view-record/index.ts` (`E-1`'s file). **So `npm test` is RED at this head, and the green belongs to the pair and never to a half** (D-112, D-142, D-14).
- **`tests/ui-leg-seam.test.ts` is the module's battery and its subject is the shell↔`ui`-leg seam**, not this member: it is a **marked file reporting on notice** (`strata/marks.json`'s `rework` entry), never gating evidence, and its 10/10 says nothing about the pair (L2 §7, D-30, D-27).
- **What green does not say:** these are leg greens on a node suite under a layout-less shim — a node-suite green is envelope-green, never app-green and never rendered-surface green (brief §6, D-27). The live reading of the pair is the L1 battery's `P-1`…`P-6` and the Electron legs, which are not this module's to run (`docs/L1/pane-drag-temp.md` §4, D-30).
- **The lint leg is NOT measurable from this checkout and is carried rather than claimed**: `strata/platform.md` §4 fixes the instrument at `../Agent Harness/strata/lint/strata-lint.mjs`, run from `strata/`, and that directory is absent here (`MODULE_NOT_FOUND`, measured) — so the standing reading (`exit 1`, the accepted `register` FAIL alone, D-110) is the CORPUS's and this pass states the absence instead of re-taking a colour it cannot see.

## 9. Assumptions, each with the alternative it rejected (D-1)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L3-1` | **the two members land INSIDE the existing `view` member at BOTH halves in one edit**, with the two sites and the two specifiers, because the pair's one reader compares them and nothing else does | landing the preload first and the pane's copy when convenient, which is the silent no-op `D-112` exists to refuse — the app would ship a route one half cannot name |
| `ASM-L3-2` | **the prose figures move in the same edit** — `FIVE`→`SEVEN`, `FOUR CHANNELS`→`SIX`, two `four`→`six` — although no instrument reads a comment, because a count left beside a moved member is drift inside the file that publishes the set (D-1, D-11) | leaving them, which would keep four headers stating five routes and four channels beside a member set of seven and six — false in the file that publishes the set (rev 2's `ASM-L3-2` precedent) |
| `ASM-L3-3` | **no unit battery and no `signatures.md`** (§7), the witnesses being the typecheck legs and the pair comparison | a row pinned to a textual arrival the crossing row already asserts, and a stubs file copying a text two documents pin |
