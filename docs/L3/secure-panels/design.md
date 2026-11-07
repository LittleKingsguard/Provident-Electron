# L3 — `secure-panels`: the structure

- **Layer:** L3 · **Unit:** `focus-retirement` · **Branch:** `strata` (D-6) · **Rev:** 2 — **CURRENCY only, no claim moves (D-143): the edit
  LANDED**, so the deletion is restated at the sites that hold its result — the `view?` block declares **five** members, the `view-record` import
  three types, the one comment that still says six named as prose residue and repaired nowhere (§8). Rev 1 wrote the deletion — this module's half
  of the `view` member's one edit, its replacement text, the pair rule and the commands that went green (D-142, D-112; L1 §6 `E-4`) — and below it
  the roster arrangement, LANDED, read from the file and printed nowhere here (D-41, D-2) · **Artifact:** `l3-secure-panels-design`
- **Status:** DESIGN, AND LANDED AT THIS HEAD — the pass spelled the deletion and chose nothing, and the block, the `read` line and the
  import now carry its result (§1-§2). The deletion is L1's `E-4` and D-142's; the roster's one-table arrangement is L2's
  (`docs/L2/secure-panels/interface.md` §1-§2) and this edit moved nothing of it. The other half (`E-3`, `app-shell`), the record's family
  deletion (`E-2`) and the pair's expected text (`E-9`) are other rows' and are named, never claimed; the replacement text is `signatures.md`'s (D-3, `examiner.md` §4)
- **Inputs:** `docs/L1/focus-retirement.md` §1, §2's `secure-panels` row, §4 `F-4`, §6 `E-3`/`E-4`/`E-9`/`E-12`, §7;
  `docs/L2/secure-panels/interface.md` §4, §7, §8 `R-9`, §9 `ASM-L2-14`; `strata/decisions.md` D-1, D-3, D-9, D-14, D-18, D-26,
  D-30, D-41, D-43, D-44, D-63, D-104, D-106, D-112, D-142; the `secure-panels` row of `strata/modules.json`, read and never
  restated (D-39, D-26); the tree at this head
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** a cite into `src/**` names the **site**, never an offset (D-41);
  `L2 §n` is `interface.md`'s, `E-n`/`F-n` are `docs/L1/focus-retirement.md`'s, `G-n` is this document's guardrail

## 0. Scope: one member, in one half of a declaration that exists twice

- **The pass was ONE deletion and three removals in ONE edit, all LANDED** (`E-4`; D-142): the `commitFocus` member, the `focus` and
  `source.focus` members its `read` answer spelled INLINE, and the `ViewFocusMirror` specifier on the file's type-only `view-record`
  import — the member absent, the answer three families, the import three types (§1-§2); nothing else in the block or the file moved (D-142, D-112).
- **Not fixed here:** any behaviour, any byte, any census figure, any script key, any test (D-3, D-14, D-26, D-37).

## 1. The three removals, by site

| # | What left | The site it left | Cite |
|---|---|---|---|
| 1 | `commitFocus(mirror: ViewFocusMirror)` | the `view?` member's own line — third of the six the block declared, its gap now closed by the five survivors | L1 §6 `E-4`; L2 §4; D-142 |
| 2 | the `focus: ViewFocusMirror` result member **and** its `source.focus: 'record' \| 'default'` | the member's `read` line — the ONE line that spelled all four families' results and their sources inline, and now spells three | L2 §4, §9 `ASM-L2-14`; D-142 |
| 3 | `ViewFocusMirror` | the specifier set of the file's type-only import from `../main/view-record/index.js` — removal 2 was its last user | L1 §6 `E-4` (iii); L2 §4 |

- **The `read` answer is three families, member by member** (L2 §4, §9 `ASM-L2-14`): `status: 'committed'`; `panes: readonly
  ViewPaneGeometry[]`; `zones: readonly ViewZone[]`; `theme: ViewThemeRecord`; and `source` carrying those same three keys, each
  `'record' | 'default'` — **no `focus` member in either record**, the surface being unable to answer a family whose root, tier,
  declaration and `mirrorFrom` left with `E-2`. Removal 2 is that member's ENTAILMENT, not scope: a half dropping only the member
  promises a result the shell no longer serves, a defect no battery reads (D-142, D-112).

## 2. The text the edit carried — written down, so L4 transcribed it and improvised nothing

A replacement not written down would have been the improvisation D-1's loop forbids: `signatures.md` §2 wrote it down, and it is the copy authority for what the file now carries (D-1, D-3).

- **Region 1 — the import line**: one specifier left; the statement, its string, the `import type` keyword and the comment block
  above it did not move (L2 §4; L1 §6 `E-4` (iii)):

```ts
import type { ViewPaneGeometry, ViewThemeRecord, ViewZone } from '../main/view-record/index.js'
```

- **Region 2 — the `view?` member, whole**: the five survivors byte for byte, the deleted line absent — quoted on its own below, so
  its absence is a fact and not an omission — and the three comment lines above carried UNCHANGED, stale count and all (§5 `G-5`, §8):

```ts
      view?: {
        read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>
        commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        onChanged(handler: () => void): () => void
      },
```

- **The line that left**, which stood between `commitPane`'s and `commitZones`' lines, no survivor's text moving to cover it — quoted
  on its own so its absence is a fact rather than an omission (`E-4` (i); D-142):

        commitFocus(mirror: ViewFocusMirror): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>

## 3. The pair rule as structure: one edit in two files, and both interleavings are red

- **The member exists TWICE and the two are ONE edit**: this file's `Window.provident.view?` and `src/main/preload.ts`'s
  `ProvidentBridge.view` — the same text at every member, or neither half (`E-3`/`E-4`; D-112's lockstep rule, D-142).
- **The pair has ONE reader, and it is `store-view-record`'s**: `tests/integration/store-view-record/crossing.test.ts` compares the two
  `view` blocks with one reader — comment lines elided, trailing commas stripped, each read at its own indent — against an expected
  five-member text it owns, which `E-9` re-grained to five and this module never touches (L2 §8 `R-9`; L1 §6 `E-9`). **That row is the pair's ONE red
  for an interleaving of these two halves, and it is a battery row and not a compile-time leg** (L2 §8 `R-9`).
- **Direction 1 — a half naming a member the shell no longer serves reds `npm run typecheck` in the SHELL's files**: `preload.ts`'s
  channel-constant import and the invocation inside its bridge object, and `main.ts`'s `ipcMain.handle` site calling
  `viewSurface.commitFocus`, all three named what `E-2` deleted — so the red there is a missing export or property, never this file's (L2 §8 `R-9`; D-142).
- **Direction 2 — a member the shell still serves, omitted from a copy that must satisfy its type, reds `npm run typecheck:tests`**: a
  test's bridge literal must satisfy the type it is written against, so neither an omission nor a leftover THERE compiles — that class is
  `ViewClientBridge`-shaped, `E-12`'s and `E-9`'s literals, another module's write (L2 §7, §8 `R-9`; L1 §6 `E-12`).
- **This half alone is SILENT, and the reason is that nothing compiled is typed against it**: every install of `window.provident` in the
  tree goes through a cast and the one renderer consumer is typed against `ViewClient` — so its staleness is read by the crossing row and,
  at the running app, by L1's `F-4`, and by no compiler leg: the one conditional red the pre-landing half had, `ViewFocusMirror` leaving
  `src/shared/view-shape.ts`, is spent too, the alias surviving nowhere under `src/` once `E-2` took the family's declaration (L2 §8 `R-9`; D-142, D-143).

## 4. What did not move, so the landed diff can be read against it

| What | Where it stands, and what it keeps | Cite |
|---|---|---|
| the sealed-panel surface | the security, debug and module panes render in `createIsolatedScope()`'s own scope with their own hub, `Supervisor` and `DomAdapter`, so the app graph's `dispatch`, `get_rendered_html` and `list_targets` still see no authored control; this edit's lines are `view`'s | L2 §4; D-16, D-17, D-18 |
| the security record's delivery | `security.onChanged` → `applySecurity`, and `refresh()` paints only what the last delivery left: no read is reintroduced and `security`'s route table is unmoved | L2 §4; D-104, D-106 |
| the `data` and `tabs` halves | both keep their text byte for byte — `tabs`' four routes and `data`' five, with `data`'s `onChanged` deliberately absent | L2 §4; D-63, D-107, D-112 |
| the security member's routes | `get`, `set`, `setExclusion`, `onChanged` and `setPane` are untouched, and so is every channel they name | L2 §4; D-16, D-17, D-123 |
| the block's surviving order | `read`, `commitPane`, `commitZones`, `commitTheme`, `onChanged` — the order L2 §4 prints and the pair's reader reads; no survivor moves, and none is re-declared | L2 §4; D-142 |

## 5. Guardrails the landing could not violate, and does not

| id | Guardrail | Cite |
|---|---|---|
| `G-1` | **No member and no route is added**: nothing replaces `commitFocus`, and a sixth route would be a surface D-18 forbids | D-18; L2 §4; D-142 |
| `G-2` | **No survivor is reordered, re-spelled or re-indented**, and no widening, aliasing or assertion is introduced to keep a line compiling | D-142; L2 §4, §8 `R-9` |
| `G-3` | **`src/main/preload.ts` is not edited here**: it is `app-shell`'s `E-3`, so the halves landed as one edit by their owners, never by one of them writing both | D-3; L1 §6 `E-3`/`E-4` |
| `G-4` | **No type alias is left imported for a member that no longer exists**: `ViewFocusMirror` left in the same edit, and it is the only specifier that went | L1 §6 `E-4` (iii); L2 §4 |
| `G-5` | **No other line of the file moved** — including the member's header comment, carried unchanged and still saying "SIX routes" where the block declares **five**: prose residue at its site, read by no instrument, repaired nowhere here and retiring with the file's next pass (§8) | D-142; L1 §6 `E-4`; §8 |

## 6. The commands that went green for the landing

| Leg | What it is the witness for | Cite |
|---|---|---|
| `npm run typecheck` | the leg that sees the SHELL's half — `src/**` only — so a `preload.ts`/`main.ts` site keeping a member `E-2` deleted reds here; this half is invisible to it (§3; L2 §8 `R-9`) | §3; L2 §8 `R-9`; `brief.md` §6 |
| `npm run typecheck:tests` | direction 2: a bridge literal must satisfy the type it is written against, and the literals in that class are `E-12`'s | §3; L1 §6 `E-12`; `brief.md` §6 |
| `npm run build` | a `declare global` block is erased at build (D-44), so the artifacts must not move and the file must still bundle | D-44; `brief.md` §6 |
| `npx vitest run tests/integration/store-view-record/crossing.test.ts` | **ANOTHER MODULE'S ROW, read as this landing's witness**: it compares the two halves member for member and owns its own expected text — named here, claimed nowhere | L1 §6 `E-9`; L2 §8 `R-9`; D-3 |

- **`npm test` is the floor's fourth leg and is unmoved by this module** (D-1; `brief.md` §6; L2 §7), and no command of this module can see
  the declaration at all, its members being erased by the build — the witness is the typecheck legs, that pair row and L1's `F-4` (L2 §7, §8).

## 7. The unit battery: none

**No `tests/unit/secure-panels/` battery was owed and none was designed**: a type-level subtraction's witness is the typecheck leg plus another module's pair comparison, and this module's batteries stand **untouched by measurement** (D-9, D-30; L2 §7, file by file).

## 8. Prose residue and rows routed to their own owners (D-3: named, never edited)

- **Both counts are prose, and the renderer's is behind its bytes**: `src/renderer/secure-panels.ts`'s `view?` block declares **five** members
  (`read`, `commitPane`, `commitZones`, `commitTheme`, `onChanged`; D-41's site rule; §1-§2), while the three comment lines above `view?: {`
  still say "ONE member, SIX routes" — a **prose residue** at that site, read by no instrument (the pair's reader elides comments), carried
  unchanged and **retiring with the file's next pass**, repaired nowhere here. **The pair's other half does not carry that count**:
  `src/main/preload.ts`'s header reads "FIVE routes" at its own site — the block's own count — so **nothing about the count is routed to
  `app-shell`**; both comment blocks still name a `store` member neither block declares, prose no instrument reads and no licence either (D-41; L1 §6 `E-3`/`E-4`).
- **The boundary row's declared scope now names all three of these documents**: `tests/integration/store-view-record/boundary.test.ts`'s
  `DECLARED_SCOPE` lists `src/renderer/secure-panels.ts` and, under its five-replaced-documents block, `docs/L2/secure-panels/interface.md`
  and `docs/L3/secure-panels/design.md` beside its `signatures.md` — so an uncommitted reading over them is INSIDE the set now, the earlier routing spent (that row being `store-view-record`'s; D-30's carve-out, D-3).
- **A `hosts`-row battery still spells the deleted answer where nothing can red**: `tests/store-modules-seams.test.ts`'s view double carries
  `commitFocus` and the `focus`/`source.focus` members, assignable off a const because `ViewClientBridge.read()` answers `unknown` — a stale
  restatement no leg of this edit reds, whose re-grain belongs to the row that claims it (D-3; L2 §8 `R-9`).

## 9. Assumptions, each with the alternative it rejected (`brief.md` §8)

| id | Assumption | Rejected alternative |
|---|---|---|
| `ASM-L3-1` | the `read` answer stays **spelled inline at both halves**, member by member, so the pair's reader compares the three families as text (§2, `G-2`) | `Omit<ViewReadAnswer, 'focus'>` or a shared named type, which would compare equal while hiding which families stand from the one reader that compares them (L2 §8 `R-9`, §9 `ASM-L2-14`) |
| `ASM-L3-2` | the unit battery is **none**, the instrument being the typecheck legs plus another module's comparison (§7) | a row grepping the block for `commitFocus`, which pins this layer's spelling, duplicates the pair's reader and reds on a legitimate re-spelling (D-9, D-30; L2 §7) |

## 10. Out of scope

- **No package finding and no behaviour**: nothing here touches `provident-ssr` or `provident-storeroom` (D-5), and L1's `F-4` and L2 §7 own the readings this document does not take (L1 §4; D-3).
- **No count, cap, script key or map row**: the `endpoints` figure, the derived cap and the `src/**/*.ts` figure are read, nowhere restated (D-14, D-26, D-39).
- **No implementation**: the two regions are `signatures.md`'s text and L4's single shot (D-3, `examiner.md` §4).
