# L3 — `app-shell`: the structure, and the `view` member's three removals

- **Layer:** L3 · **Unit:** `focus-retirement` · **Artifact:** `l3-design` · **Branch:** `strata` (D-6) · **Rev:** 2 — the currency pass `D-143` routed here: rev 1's edit list is read as **LANDED**, every hunk re-verified site by site at this head (`docs/L1/focus-retirement.md` §2's `app-shell` row, §6 `E-3`; `docs/L2/app-shell/interface.md` rev 1).
- **Status:** DESIGN — the **structure** and the **delivered edit list** of a surface subtraction across two files; **`E-3` has LANDED** (§1-§2 are history, never a plan), and the arrangement (one `view` member of five surviving routes over the boot's one store) is L2's and is restated only where the text needs it (D-3, `brief.md` §3-§4, D-143).
- **Inputs:** `docs/L1/focus-retirement.md` §1, §2 (`app-shell`, `secure-panels`), §3, §6 `E-3`/`E-4`; `docs/L2/app-shell/interface.md` §2-§8; `strata/decisions.md` D-14, D-18, D-26, D-41, D-43, D-101, D-112, D-121, D-142, D-143; the `app-shell` row of `strata/modules.json` (its paths read there, never restated here — D-43); the tree at this head, read site by site.
- **Ceiling:** 150 lines, class max (D-1). A `:line` below is this head's offset, read AFTER the landing — except where a row marks one `rev 1's`, which is the offset of a site the edit deleted and has no reading now; the site name is the authority and the number a convenience (D-41, D-28).

## 0. Scope, and the reading this pass records

- **L1 rev 2's `E-3`: THREE removals in ONE edit** — `commitFocus`; its inline `read` answer's `focus` result member and its `source.focus`; and the `ViewFocusMirror` specifier — plus the two consequences a deleted route dragged: the channel specifier in each of this module's two import lists, and `main()`'s `ipcMain.handle` site (D-142, L1 §2). **All ten hunks LANDED** (§1, §2); **`ASM-L2-1`'s one-member reading is SUPERSEDED**: the other two were the member's ENTAILMENTS, because `E-2` took the family's address, tier, declaration and `mirrorFrom`, so the crossing's `read()` answers three families, and a half keeping a `focus` member would have published what the shell no longer serves (D-142, D-112).
- **Recorded here:** the hunks as delivered and their order-independence, the surviving member's post-edit text, the lockstep as structure, the guardrails, and the commands that witnessed the landing. **Not recorded here:** any behaviour, any count, any other module's bytes — `src/renderer/secure-panels.ts` was `E-4`'s and `src/shared/view-channels.ts` with `src/main/view-surface/` `E-2`'s; both are named and neither was edited from here (D-3).

## 1. `src/main/preload.ts` — seven hunks, two of them declaration sites, ALL LANDED

Site names are the authority (D-41); each offset is this head's reading after the landing (`preload.ts`: 299 lines), save the one cell marked `rev 1's`, whose site no longer exists.

| # | Site | Removed | What the file reads there now | Status | Cite |
|---|---|---|---|---|---|
| P-1 | the `'../shared/view-channels.js'` import line (`:13`) | the `IPC_VIEW_FOCUS_COMMIT` specifier | five specifiers, in their order: `IPC_VIEW_READ`, `IPC_VIEW_PANE_COMMIT`, `IPC_VIEW_ZONES_COMMIT`, `IPC_VIEW_THEME_COMMIT`, `IPC_VIEW_CHANGED` | LANDED | `E-3`, D-14 |
| P-2 | the type-only `'./view-record/index.js'` import line (`:14`) | the `ViewFocusMirror` specifier | three: `ViewPaneGeometry`, `ViewThemeRecord`, `ViewZone` | LANDED | `E-3`, D-14 |
| P-3 | the TYPE DECLARATION, `ProvidentBridge.view`'s `read` line (`:114`) | the `focus: ViewFocusMirror` result member and the `source.focus` member | §3's line `C-1` exactly, **on one line**, unwrapped | LANDED | L1 §2, `E-3` |
| P-4 | the TYPE DECLARATION, `ProvidentBridge.view` (`:113-119`) | the whole `commitFocus(mirror: ViewFocusMirror): Promise<…>` line | nothing stood in its place; `commitPane` (`:115`), `commitZones` (`:116`) and `commitTheme` (`:117`) kept their order and their text | LANDED | `E-3`, D-142 |
| P-5 | the BRIDGE OBJECT's `view.read` (`:251`) | the same two members as P-3 | §3's line `C-1` followed by ` {`, and the body `return ipcRenderer.invoke(IPC_VIEW_READ)` (`:252`) | LANDED | L1 §2 |
| P-6 | the BRIDGE OBJECT's `view` arm (rev 1's `:258-260`) | its three lines — signature, `return ipcRenderer.invoke(IPC_VIEW_FOCUS_COMMIT, mirror)`, the closing `},` | nothing: the five survivors stand contiguous at `:250`-`:272`, each with its own `},` | LANDED | D-14 |
| P-7 | the prose header above `view:` (`:105-112`) | the words `SIX routes`, `the focus mirror`, and the `commitFocus hands the whole mirror…` clause | `ONE member, FIVE routes — the` / `pane geometry, the zone family and the appearance record, over the boot's one store`, the survivors named as they stand | LANDED | ASM-L3-2, D-1 |

- **No punctuation repair was owed in this file, and none was made.** Members are line-separated here, so P-4 and P-6 deleted whole lines and no neighbour's comma moved; P-1 and P-2 removed mid-list specifiers and each list's last specifier (`IPC_VIEW_CHANGED`, `ViewZone`) stays — a hunk that re-punctuated a neighbour would have touched a surviving member, which is `G-3`'s subject (D-41).
- **The two removed specifiers lost their last user IN THIS FILE:** `IPC_VIEW_FOCUS_COMMIT` has no referent left here, and `ViewFocusMirror` none — both spellings measure zero in `preload.ts` at this head (the five sites were the import, both declaration lines and both implementation lines). Across `src/` the constant's other two users were M-1 and M-2, its declaration left `src/shared/view-channels.ts` in `E-2` (that file is `FIVE channel names` at `:1-17`), and `E-2` took both shared types, so `ViewFocusMirror` is declared nowhere under `src/` — the specifier's removal was no mere unused-import tidy (D-14, L1 §2, §4).
- **P-7 moved no instrument and was carried anyway:** every row reading this file elides `//` lines (`crossing.test.ts`'s reader, `fork-store-reads`' byte scan), so the prose is measured by nothing — but a header claiming six routes was false inside the file that publishes the member set, the one defect a subtraction leaves when its code is right (D-1). The landed header states `FIVE routes` and the false clause is gone.

## 2. `src/main/main.ts` — three hunks, none of them a declaration, ALL LANDED

| # | Site | Removed | What the file reads there now | Status | Cite |
|---|---|---|---|---|---|
| M-1 | the `'../shared/view-channels.js'` import line (`:44`) | the `IPC_VIEW_FOCUS_COMMIT` specifier | the same five, in their order; `main.ts` imports no view-record TYPE, so no P-2 existed here | LANDED | `E-3`, D-14 |
| M-2 | the view record's handler block, the `ipcMain.handle` call (rev 1's `:475`) | the whole `ipcMain.handle(IPC_VIEW_FOCUS_COMMIT, (_event, mirror: unknown) => viewSurface.commitFocus(mirror))` line | four handlers — `IPC_VIEW_READ` (`:473`), `IPC_VIEW_PANE_COMMIT` (`:474`), `IPC_VIEW_ZONES_COMMIT` (`:475`), `IPC_VIEW_THEME_COMMIT` (`:476`) — in their order, then `viewSurface.attach()` (`:478`) | LANDED | `E-3`, D-41 |
| M-3 | the file's prose about the view record's families, channels, handlers, roots and declarations — five site groups: the view-record import's intro (`:37-41`), the boot batch's comment (`:202-210`), the view surface's construction comment (`:237-238`), the handler block's header (`:466-472`) and the `data` block's handler census (`:488-489`) | every `focus` spelling above (zero remain in the file, measured) and every two/four/six/ten that counted the deleted family, the roots or the batch | three families; three roots (`:238`); the three surviving declarations (`:39`, `:203`); `NINE` declarations in the batch (`:204`); `ALL THREE of the view record's` and the five bodies that can act at the registration instant (`:206-208`); `viewConstraintDeclarations`' `three` (`:209-210`); `FOUR CHANNELS` (`:466`); four handlers at `:488`; the four handlers at `:40`; and the three surviving tokens, `malformed-pane`/`malformed-zone`/`malformed-theme` (`:471`) | LANDED | ASM-L3-2, D-1 — and no row names these comments as a subject, measured |

- **Order-independence, stated as the reason the hunk was safe:** M-2 deleted one line between two lines it did not touch and M-1 changed no line count, so every position any row computes moved by at most one, and **no row compares an absolute offset**: `tests/ui-leg-seam.test.ts`'s five `MAIN_SRC` positions — the seam, `createSettingsSurface(`, `createProfileStore(`, the two argv-scan functions — all sit above the deleted site and are compared only in relative order, and the rows that DO take positions below it (`tests/secure-exclusion.test.ts`'s handler and `mcp.start()` searches, `tests/tier4-arbitrary-storage.test.ts`'s registration search) compare their readings relatively too, so a uniform shift of one line was invisible to all of them and that battery is green at this head (L2 §7, D-41, D-28).
- **That battery names no subject of this edit** — no `view` member, no `commitFocus`, no `IPC_VIEW_*` literal and no `focus` spelling at all, measured — and it was left byte-unmoved (§7).

## 3. The surviving `view` member, as the post-edit text

Five routes, **`C-1`…`C-5` in this order, one line each**, at the type declaration and — with ` {` and a body — at the bridge object. The text is an instrument's, not this document's preference: `tests/integration/store-view-record/crossing.test.ts`'s lockstep row reads both blocks member for member and lists these five texts, so a wrap, a re-order or a re-spelling is a red (D-112, `G-4`).

```ts
read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>
commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
onChanged(handler: () => void): () => void
```

- **The arms behind them, unmoved:** `invoke(IPC_VIEW_READ)`; `invoke(IPC_VIEW_PANE_COMMIT, id, geometry)`; `invoke(IPC_VIEW_ZONES_COMMIT, id, zone)`; `invoke(IPC_VIEW_THEME_COMMIT, token, attributeName)`; `onChanged` registers `IPC_VIEW_CHANGED` and returns the withdrawal (D-112, D-137).
- **`read`'s answer is three families and one `source` word each** — no `focus`, no `source.focus`, no fourth word (L2 view-record §3, `E-2`'s edit) — and it carries no `refused` arm, a read being total; the four writes keep the four-member refusal answer they carried before it.

## 4. The lockstep, as structure

- **The declaration exists TWICE:** this module's `ProvidentBridge.view`, and `src/renderer/secure-panels.ts`'s `declare global` copy of `Window.provident.view`. **No compiler relates them** — the panels half lives inside a global `interface Window` and references no member of `ProvidentBridge` — so what related them was D-112's rule and the row that read both (L2 §4; L2 secure-panels `R-9`).
- **`E-3` and `E-4` were ONE edit carrying the SAME three removals at both halves:** `commitFocus`; the inline `read` answer's `focus`/`source.focus`; the `ViewFocusMirror` specifier on each half's own type-only `view-record` import. Each half's block lost one member, and the five that remained kept their names, their order and their signatures — the expectation the crossing row reads at this head (§3; L1 §2's `secure-panels` row, D-142).
- **The exact failure an interleaved landing would have produced — two limbs.** *(a)* `tests/integration/store-view-record/crossing.test.ts` reads both blocks with ONE reader and asserts equality, so a half landing alone compared five members against six and the row printed both texts with the disagreement in hand: **the deletion's own edit was what carried both halves down to the five-member expectation** (that file is `store-view-record`'s; D-112, D-14). *(b)* An un-landed half kept declaring a route the shell no longer answered, so a panel calling it invoked a channel with no handler — a member published with nothing behind it, the "one side points at a name the other still serves" defect (D-14).
- **The honest limit, recorded so no L4 waited for a red that would not come:** a half-landed pair still **compiled**. The panels half names only types and imports no channel constant (L2 secure-panels `R-9`), and P-2 / `E-4`'s specifier would have been merely *unused* had `E-2` kept a re-export (`tsconfig.json` sets no `noUnusedLocals`) — it kept none, so the type is declared nowhere under `src/`. The pair's witness is the comparison row; the compiler witnessed the *other* half-landing — `E-2` without `E-3` — where the constant and `viewSurface.commitFocus` went and this module still named both (§8).
- **That crossing battery was the ONE instrument comparing the halves:** run by both L4s, edited by neither (D-3).

## 5. What must not move

- **The `data` member** and its `ipcMain.handle` sites, each forwarding the caller's argument object untouched (D-112, D-107).
- **The `security` member, and the `module` and `tabs` members**, with their deliveries (`IPC_SECURITY_CHANGED`, `IPC_MODULE_CHANGED`, `IPC_TABS_CHANGED`) and registration sites (D-104, D-106, D-123).
- **The store constructions:** the one `createSettingsSurface({…})`, the one `createProfileStore({…})` with both modules' declaration sets spread into its ONE `constraints` array, `createTabsSurface`, `createViewSurface` — and the **declared-roots spread** `createDataSurface({… declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()]})`, whose two function NAMES survive while `viewDeclaredRoots()` lost one entry in `E-2`'s edit (D-101, D-142, D-65).
- **The transport setup:** `transportFromArgs`/`portFromArgs`, the one `new ProvidentMcpServer({…})` options pass, the three `ipcMain.on` sites, `mcp.start()`, `mcp.followExclusion(…)` (D-112, D-123).
- **The sender-guard pattern:** every handler discards its `IpcMainInvokeEvent`, none reads `sender` or `senderFrame`, `permitted(` occurs nowhere under `src/` — this unit **added no guard**; the surviving `view` sites keep the sibling absence (D-121, D-112).
- **The window**, its options object, `here` and both joins composed from it (D-121).

## 6. Guardrails L4 may not violate

| id | Guardrail | Cite |
|---|---|---|
| `G-1` | **Two files, `E-3`'s removals and nothing else**: P-1…P-7 and M-1…M-3 were the whole edit — no third module's file, no `store-channels.ts`, no test, no map, no document | D-3, L1 §6 |
| `G-2` | **No replacement**: no member, route, channel, `RpcMethod`, tool or group is added; the act that leaves here is the tab record's, over `data.write` | D-18, D-142 |
| `G-3` | **No re-ordering and no re-spelling**: the five survivors keep §3's order, and no survivor's signature or arm changes | D-112, `E-9` |
| `G-4` | **The `read` line is ONE line**: wrapped or re-flowed, the crossing row reads a different member list | §3 |
| `G-5` | **No surviving constant is touched**: `IPC_VIEW_FOCUS_COMMIT` left `src/shared/view-channels.ts` in `E-2`'s edit, not this one, and the five survivors stay single-sourced there | D-41, D-14 |
| `G-6` | **The renderer's copy is not this module's**: `src/renderer/secure-panels.ts` was `E-4`'s, landed by another L4 in the same pass; a byte here anticipating it would have been a second author of the pair | D-3, D-112 |
| `G-7` | **No new file**: no `signatures.md`, no unit battery, no script key, no map row | §7, D-14, D-26 |

## 7. The battery: none, and no stubs file

- **No `tests/unit/app-shell/` battery, and this is the decision with its reason:** the change was a surface SUBTRACTION, and its witnesses were the whole-tree typecheck leg, the pair's crossing row and the module's own untouched battery; a unit row could only restate a textual absence those three already read, on a module whose battery is a marked file on notice (D-9's retire-with-its-referent class, D-30, D-40).
- **No `signatures.md`:** this pass minted no signature — every surviving route kept its declared text, and the one text worth pinning (§3) is already pinned by the crossing battery. A stubs file recording only removals is a copy that cannot be kept true (D-43, D-41).
- **The module's own battery was left byte-unmoved** and reads what it read before: `tests/ui-leg-seam.test.ts` names no subject of this edit and every position it computes sits above the deleted handler site (§2; L2 §7).

## 8. The commands that witnessed the landing, and its after-state

```sh
npm run typecheck        # src/**/*.ts (and demo/) — green: nothing here names the deleted member
npm run typecheck:tests  # the whole tests/**/*.ts tree — no test TYPE names the deleted member
npm run build            # the built artifacts must still exist (`brief.md` §6)
npx vitest run tests/ui-leg-seam.test.ts                               # this module's battery, unmoved
npx vitest run tests/integration/store-view-record/crossing.test.ts    # the pair's comparison row
```

- **`npm run typecheck` was the whole-tree leg, and the one that redded on an interleaved landing of the DELETION:** once `E-2` had taken `IPC_VIEW_FOCUS_COMMIT` out of `src/shared/view-channels.ts` and `commitFocus` out of `view-surface`, any byte of this module still naming either redded there — `TS2305` at both import lists, `TS2339` at M-2's arm (L1 §6 `E-2`). It does **not** see the pair's disagreement (§4's limit), which is why the crossing row runs beside it. Both halves landed together and it exits 0.
- **The two L4s were one landing because no command above was green on an interleaved one:** `E-3` without `E-4` left the pair disagreeing and redded the crossing row; `E-4` without `E-3` left the shell serving a route this module still registered. The green belonged to the pair, never to a half (D-112, D-142, D-14).
- **`npm run typecheck:tests` was RED before the siblings landed and is GREEN at this head** — measured, so no reader hunts it here: the test tree had been re-grained red-first (`E-12`) against declarations `E-2` owned, so the `ViewClientBridge` literals (`tests/theme-declaration.test.ts`, `tests/theme-act.test.ts`, `tests/pane-drag-compliance.test.ts`) and the committed-reading fixtures (`tests/integration/store-view-record/client.test.ts`, `tests/pane-drag-compliance.test.ts`) failed `TS2741` until `src/renderer/view-client.ts` and the record's reading lost `commitFocus` and `source.focus` in `E-2`'s edit. What THIS pass owed the leg is the negative, and it holds: every mention of the deleted member that stays in the test tree is a comment, a string, or an UNTYPED fixture — `tests/store-modules-seams.test.ts`'s pane-shape double is the one that looks closest and is safe, its member being an unannotated variable handed to `createViewClient` (D-14, L1 §6 `E-2`/`E-12`).
- **One live driver used to call it and was not this module's:** `tests/e2e/store-crossings/crossings-live.mjs` drove `view.commitFocus` at runtime — L1 §6 `E-8` assigned that edit to `store-tabs-record` — and it has landed there: the `xv-commit-focus` row is deleted and the file records the absence at `:39-41` and `:428`, a `.mjs` leg being outside `typecheck:tests` (D-3, D-94).
- **What green does not say:** these are leg greens, and one of them is a marked battery on notice — a node-suite green is envelope-green, never rendered-surface green (`brief.md` §6, D-27). The live reading of the absence is the L1 battery's `F-4(c)` and the Electron legs, which were not this module's to run (D-27, D-30).

## 9. Assumptions, each with the alternative it rejected (D-1)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L3-1` | **three removals in one edit** — L1 rev 2's reading (L1 §2, `E-3`), superseding `ASM-L2-1`'s one-member pass; delivered as such | dropping only `commitFocus`, which would have left a declared `focus` answer member (and its type specifier) promising what the shell stops serving, seen by no leg but the crossing row (D-142) |
| `ASM-L3-2` | the **prose re-grain** (P-7, M-3 — every false spelling of the view record's families, roots, channels, handlers and declarations in both files) **rode in the same edit and LANDED with it**, although no instrument reads a comment: both files now state five routes, three families, three roots, four channels, nine declarations and the three surviving tokens | leaving them, which would have kept headers claiming six routes, four roots, ten declarations and a `malformed-focus` arm — false statements inside the files that publish the set, the drift D-1's provenance rule exists to prevent |
| `ASM-L3-3` | **no unit battery and no `signatures.md`** — neither was minted | a row pinned to a textual absence the crossing battery already asserts, and a stubs file that only records deletions — the copy D-43 forbids |
