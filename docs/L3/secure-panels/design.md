# L3 — `secure-panels`: the structure

- **Layer:** L3 · **Unit:** `pane-drag-temp` · **Branch:** `strata` (D-6) · **Rev:** 1 — this module's half of ONE edit: `commitDrag`
  and `clearDrag` land INSIDE this file's `view?` block, transcribed from `docs/L2/app-shell/interface.md` §3 and compared against it
  member for member (§1-§3; `E-4`, `docs/L1/pane-drag-temp.md` §7). **It REPLACES `focus-retirement`'s rev 2 and annotates none of
  it** (D-2): what that pass left at the bytes is read from the file, and the roster arrangement is L2's and moves nothing here
  · **Artifact:** `l3-secure-panels-design`
- **Status:** LANDED and read back — the two regions are `signatures.md` §2's text, L4's one shot, and §6's readings were taken at this
  head after it. The twin half (`E-3`, `app-shell`), the address and the two routes with their channels
  (`E-1`/`E-2`, `store-view-record`), the composition (`E-8`, `renderer-wiring`) and the pair's expected text (`E-5`) are other
  rows' and are NAMED, never claimed (D-3)
- **Inputs:** `docs/L1/pane-drag-temp.md` §2, §5 `R-3`, §7 `E-4`; `docs/L2/secure-panels/interface.md` §4 (the post-edit seven, the
  pair rule, the no-store-route subtlety), §7, §8 `R-9`, §9 `ASM-L2-15`; `docs/L2/app-shell/interface.md` §3-§4 (the transcription
  this half transcribes); `strata/decisions.md` D-1, D-3, D-9, D-14, D-18, D-26, D-30, D-41, D-43, D-44, D-63, D-88, D-104, D-106,
  D-107, D-110, D-112, D-118, D-123, D-132, D-137, D-142, D-144; the `secure-panels` row of `strata/modules.json` (D-39)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** a cite into `src/**` names the **site**, never an offset (D-41); `L2 §n` is
  `docs/L2/secure-panels/interface.md`'s, `AS §n` is `docs/L2/app-shell/interface.md`'s, `E-n`/`R-n` are `docs/L1/pane-drag-temp.md`'s,
  `G-n` is this document's guardrail

## 0. Scope: two lines, in the one half that compiles either way

- **The pass is TWO LINES and ONE WORD** (§2): two member lines added inside `view?: {`, and the route count in the three-line comment
  above it moved `SIX → SEVEN`. Nothing else in the file moves, and no battery of this module is re-grained (§6-§7).
- **Why this module has a half at all**: the `view` member is declared TWICE and the two halves are ONE edit (D-112, D-142), so a pass
  widening the preload alone leaves this file naming a member set it does not have. **This half is a DECLARATION, never a route**: no
  call site of a `view` member stands here, and no `IPC_*` constant is named in the file at all.

## 1. The edit, region by region — what changes, and what deliberately does not

| Region | What this pass does to it | Cite |
|---|---|---|
| the `view?` block's member list | **gains TWO LINES**, between `commitTheme`'s and `onChanged`'s, so the block declares SEVEN in this order: `read`, `commitPane`, `commitZones`, `commitTheme`, `commitDrag`, `clearDrag`, `onChanged` | §2; AS §3; D-132, D-112 |
| the three-line comment above `view?: {` | **one word moves**: `ONE member, SIX routes` → `ONE member, SEVEN routes`. Its `store` mention, its cites and its other two lines are carried byte for byte — prose residue no instrument reads, repaired nowhere here | §5 `G-6`; L2 §4; D-41 |
| the `read(...)` line | **UNMOVED** — the temp reading is read where the tiers are read, `provident.data.read({path: ['drag']})`, whose node carries its own `_tier`, so no `drag` member and no `source.drag` word joins the answer | L2 §4; D-133, D-144 |
| the type-only `view-record` import | **UNMOVED, three specifiers** — the pair's geometry is `unknown` at the bridge and its answer is spelled inline like the three commits', so `ViewPaneGeometry, ViewThemeRecord, ViewZone` remain the whole import | §5 `G-3`; AS §3; D-88 |
| every other member of the block | **byte for byte**: `security` (five routes), `tabs` (four), `module` (three), `data` (five, `onChanged` deliberately absent) | §4; D-63, D-104, D-107, D-123 |

## 2. The region, transcribed — the seven lines, in the block's own order

The text below is the preload's, transcribed and not described (AS §3 (4); D-112). The `view?: {` opener, the closing `},` and the
members' eight-space indent (the braces sit at six) are the file's and do not move; **`commitDrag` and `clearDrag` are the only
addition**, and no comment line inside the fence is part of the file's text.

```ts
      view?: {
        read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>
        commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        commitDrag(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        clearDrag(): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        onChanged(handler: () => void): () => void
      },
```

- **Each line is ONE line in the file**: no wrapping, no trailing comma on the last member, the two additions at their neighbours'
  indent — and the pair's position is the order `crossing.test.ts` pins, between the appearance act and the push (AS §4; L2 §8 `R-9`).
- **`clearDrag()` takes no argument**, because the erase is a DELETE at the family's own tier and not a write of an empty family — a
  `null` arm here would be the spelling `D-140` spent a row removing (L1 §9 `ASM-2`/`ASM-4`; L2 §4).
- **No channel constant is named in this file at all** — the block is a declaration and nothing in it invokes — so this pass has no
  import region beyond the line §1 calls unmoved, and `src/shared/view-channels.ts`'s two new constants (`IPC_VIEW_DRAG_COMMIT`,
  `IPC_VIEW_DRAG_CLEAR`) are `E-2`'s, reached by `preload.ts` and `main.ts` alone (AS §3; D-87, D-112).

## 3. The pair rule as structure: one edit in two files, and BOTH interleavings are red

- **The member exists TWICE**: this file's `Window.provident.view?` (a `declare global` block, erased at build — D-44) and
  `src/main/preload.ts`'s `ProvidentBridge.view`. The same text at every member **and in that order**, or neither half (D-112, D-142).
- **The pair has ONE reader, and it is `store-view-record`'s**: `crossing.test.ts` finds each block by its own opener, reads it at its
  own indent, drops comment and blank lines, strips a trailing comma, and asserts the two lists equal — then pins the expected SEVEN
  texts below that assertion. That row is another module's (`E-5`), named here and edited nowhere (L2 §8 `R-9`; L1 §5 `R-3`).
- **Direction 1 — THIS half alone (seven here, five there).** The comparison reds with both texts in hand — measured
  `expected [ …(7) ] to deeply equal [ …(5) ]` — and **because it throws there, the pinned-seven assertion BELOW it never executes**:
  the pinned arm is unmeasured while the halves disagree, not wrong. `typecheck`, `typecheck:tests` and `build` stay at 0, because the
  block is erased and no literal in the tree is typed against it; at the running app `window.provident.view.commitDrag` resolves to
  `undefined`, which is L1's `P-1` and no compiler leg.
- **Direction 2 — THE TWIN alone (five here, seven there).** The same comparison reds identically, and `typecheck` compiles `src/**`
  (the demo's entries included) while comparing no declaration at all — so it reds there **iff** `E-2` has not landed: the preload's
  two `ipcRenderer.invoke(IPC_VIEW_DRAG_*)` arms and `main()`'s two `ipcMain.handle` sites name constants `view-channels.ts` must
  export. With `E-2` landed, direction 2 is invisible to every compiler leg too — a stale declaration is what no caller can see.
- **So the one instrument for the halves' disagreement is that comparison**, and the red both directions produce is the PAIR'S
  absence, never a defect in the half that landed (§6; L2 §8 `R-9`; AS §4).

## 4. What must not move, so the landed diff can be read against it

| What | Where it stands, and what it keeps | Cite |
|---|---|---|
| the sealed-panel surface | the security, debug and module panes render in `createIsolatedScope()`'s own scope with their own hub, `Supervisor` and `DomAdapter`, so the app graph's `dispatch`, `get_rendered_html` and `list_targets` still see no authored control; this edit's lines are `view`'s and no pane authors anything new | L2 §4; D-16, D-17, D-18 |
| the security record's delivery | `security.onChanged` → `applySecurity`, and `refresh()` paints only what the last delivery left: no read is reintroduced, and `security`'s five routes and every channel they name are untouched | L2 §4; D-104, D-106, D-123 |
| the `data` and `tabs` halves | both keep their text byte for byte — `tabs`' four routes and `data`' five, with `data`'s `onChanged` deliberately absent | L2 §4; D-63, D-107, D-112 |
| the order of the survivors | `read`, `commitPane`, `commitZones`, `commitTheme`, `onChanged` keep their texts, their relative order and their indent; the pair is inserted between the fourth and the fifth, and none of them is rewritten to make room | §2-§3; AS §3; D-112 |
| the roster half of the file | `GROUP_LABELS`/`GROUPS`/`paneEnvelope()`/`syncConfig` and the class's every member are untouched — that arrangement is L2's `ASM-L2-1`, landed, and read from the file rather than reprinted here | L2 §1, §5; D-23, D-35, D-41 |

## 5. Guardrails the landing cannot violate

| id | Guardrail | Cite |
|---|---|---|
| `G-1` | **NO SECURE-STORE ROUTE IS ADDED, while the declaration still carries both members — because the declaration is SHARED even when the store is not.** `['drag']` at `temp` joins the NORMAL crossing beside `['panes']` and `['zones']` (`createViewSurface({store: centralStore, …})`); the secure store keeps `['operator-pane']` at `mem` as its ONE pane address and gains no address, no declaration, no route and no member | L2 §4; D-132, D-123, D-112 |
| `G-2` | **No route, no caller and no channel here**: no `IPC_*` constant, no `ipcMain.handle`, no client method, no store verb, no `ViewClient` change — and no call site of a `view` member in this file at all; both routes are answered by `viewSurface` in another module | L2 §4, §8 `R-9`; D-132, D-14 |
| `G-3` | **No import specifier joins the `view-record` import**, and no `as const`, cast, alias or assertion is introduced to keep a line compiling: the geometry is `unknown` and the answer inline | AS §3; D-88 |
| `G-4` | **No survivor is reordered, re-spelled or re-indented**, and the inserted pair takes exactly the position §2 prints — the order the comparison row holds | AS §4; L2 §8 `R-9` |
| `G-5` | **`src/main/preload.ts` is not edited here**: it is `app-shell`'s `E-3`, so the halves land as ONE edit by their owners, never by one of them writing both | D-3; L1 §5 `R-3` |
| `G-6` | **The comment's count moves with the member**, `SIX → SEVEN`, in the same hunk — a comment is not a declaration, so the comparison reads neither, and a count left beside a moved member is the drift D-11 forbids. Its `store` mention is carried, as prose residue this pass repairs nowhere | L2 §4; D-11, D-41 |
| `G-7` | **Nothing else is minted**: no MCP tool, resource, `RpcMethod` member, script key, exported symbol or file — the checked-in demo bundle is REGENERATED and not authored (§6, D-118) | D-18, D-14, D-26 |

## 6. The commands, and the reading each one is

| Leg | What it witnesses | Reading at this pass |
|---|---|---|
| `npm run typecheck` | the SHELL's half only (`src/**`); this half is erased, so a green says the tree compiles, not that the halves agree | **0 errors** |
| `npm run typecheck:tests` | the whole `tests/**/*.ts` tree — and no literal in it is typed against the `Window.provident` global, so a stale half is caught by neither leg | **0 errors** |
| `npm run build` | the declaration is erased at build (D-44): the five artifacts are produced, and the edit's only artifact-level trace is the demo bundle's provenance digest, its body byte-identical | **exit 0** |
| `npx vitest run tests/integration/store-view-record/crossing.test.ts` | **the pair's ONE reader** (§3), another module's row | **5 of its 20 rows red, and NOT ONE is this half's**: four are `E-1`'s (the delivery the `temp` root must cause, the drag write census, the published `drag@temp` root, the 14-site census) and one is `E-3`'s — the comparison itself, `[7]` against `[5]` |
| `npm test` | the floor's fourth leg, TAKEN and not waived: its reds are the measure of how much of the unit is still out | **exit 1 — 42 rows in seven files, each another row's** (`E-1`, `E-2`, `E-3`, `E-8`). **This pass's OWN one is cured**: `tests/demo-bundle.test.ts` DB-1/DB-2 red because the checked-in bundle's manifest named `src/renderer/secure-panels.ts` as the only moved input, and green after `node demo/pane-drag-demo/build.mjs` — the provenance digest moves and the body does not, a type-only edit (D-118) |
| `node "../Agent Harness/strata/lint/strata-lint.mjs" strata` | the CORPUS's ceilings, citations and provenance — and it reads `strata/` ONLY, so **no leg instruments these two documents**: their 150-line ceiling and their cites are held by hand (measured: 29 such targets, none under `docs/`) | **exit 1 — 137 PASS / 1 FAIL / 4 INFO**, the FAIL the accepted `register` row-length check this corpus may not cure (D-110) |

## 7. The unit battery: none, and where L3's exit condition is discharged

- **No `tests/unit/secure-panels/` battery is owed** (`ASM-L3-2`): the subject is a DECLARATION, and its only instrument is another
  module's GATING row — `crossing.test.ts`'s pair comparison and its 14-site census — because **both compiler legs are measurably
  blind** (measured: both legs 0 with this half alone landed; nothing under `src/` installs the global, and the renderer reaches it
  structurally — `view-client` through `(window as unknown as …)` — so no literal is typed against the declaration).
- **Both addable observables are refused EXPLICITLY, including the one that survives a re-spelling**: a name-grep row duplicates that
  census at this exact site, and a compile-time pin on `NonNullable<Window['provident']['view']>` states member PRESENCE only — blind
  to order and to the twin, where the contract IS textual equality (`ASM-L3-1`; D-9, D-30, D-112). So the one region no row reads is
  the comment's word — prose corrected, not tested — and L3's exit condition is `brief.md` §3's, discharged by a gating row this
  module does not own (L2 §7, §8 `R-9`).

## 8. Routed to their own owners, and the residue named (D-3: named, never edited)

- **The twin half is `app-shell`'s `E-3`** — its two `ipcMain.handle` sites, its two bridge arms and its own count (`FIVE routes` →
  SEVEN): this module writes none of it, and the comparison red of §6 is that row's absence (AS §3-§4).
- **The pair's expected text is `store-view-record`'s `E-5`**, which already pins the seven; this document writes TO it (L2 §8 `R-9`).
- **A stale double still spells what `D-142` deleted** — `tests/store-modules-seams.test.ts`'s view double — and no leg of this edit
  reds on it (the claiming row's re-grain, D-3). **The boundary row needs no entry**: `boundary.test.ts`'s `DECLARED_SCOPE` already
  lists `src/renderer/secure-panels.ts`, this document, its `signatures.md` and the demo bundle (§6; D-30).

## 9. Assumptions, each with the alternative it rejected (`brief.md` §8)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L3-1` | the seven members are spelled **inline at both halves**, member by member, so the pair's reader compares TEXT (§2, `G-4`) | a shared named type or `Omit<…>`, which would compare equal while hiding which routes stand from the one reader that compares them (L2 §8 `R-9`) |
| `ASM-L3-2` | the unit battery is **none**, the instrument being that comparison plus the census beside it (§7) | a unit row reading the block, which pins this layer's spelling and duplicates the comparison's census row at the same site (D-9, D-30) |
| `ASM-L3-3` | this half carries the pair although THIS realm gains no route for it, because the two halves are one **declaration**, shared even when the store is not (`G-1`) | leaving this half at five on the reading that the pane calls no `view` route, which lands two declarations disagreeing — the half-widening the comparison reds (L2 §9 `ASM-L2-15`; D-132) |

## 10. Out of scope

- **No package finding and no behaviour**: nothing here touches `provident-ssr` or `provident-storeroom` (D-5); the ghost, the
  composition and the release turn are `renderer-wiring`'s `E-8` and L1 §4's (D-132, D-137, D-144).
- **No count, cap, script key or map row**, and **no implementation text**: the `endpoints` figure, the derived cap and the
  `src/**/*.ts` figure are read, not restated (D-14, D-26, D-39, D-43), and the two regions are `signatures.md` §2's, L4's shot (D-3).
