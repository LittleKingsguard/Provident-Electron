# L3 — `secure-panels`: the declared signatures and the exact landing text

- **Layer:** L3 · **Unit:** `pane-drag-temp` · **Branch:** `strata` (D-6) · **Rev:** 1 — this module's half of the drag pair's ONE
  edit: the `view?` block gains `commitDrag` and `clearDrag`, and the count above it moves to seven (§2). **It REPLACES
  `focus-retirement`'s rev 2** and reprints none of it (D-2); the structure, the pair rule and the guardrails are `design.md`
  · **Artifact:** `l3-secure-panels-signatures`
- **Status:** DECLARED NAMES AND EXACT TEXT ONLY — every name this landing exposes or consumes, and the exact text its two regions
  carry, are here; the reasoning is `design.md`'s (D-3, `examiner.md` §4). **Contract:** the edit adds TWO members and one word and
  mints nothing — no route, channel, import, alias, export or file (D-18, D-112)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `L2 §n` is `docs/L2/secure-panels/interface.md`'s, `AS §n` is
  `docs/L2/app-shell/interface.md`'s, `G-n` is `design.md` §5's, `E-n`/`R-n` are `docs/L1/pane-drag-temp.md`'s; a cite into `src/**`
  names the **site** and never an offset (D-41)

## 1. The module's published surface — one export, and it does not move (D-14)

```ts
export class SecurePanels {
  constructor(mount: HTMLElement, opts?: { maxJournalLength?: number })
  debugText(): string
  journalDepth(): number
  dispatch(id: string): Promise<void>
  applyPaneMutation(nodeId: string, mutation: unknown[]): { status: string; applied: boolean }
  refreshDebug(runtime: {
    renderedHtmlResult(): { census: { inTree?: unknown; registered?: unknown; unplaced?: unknown; destroyed?: unknown; prototypes?: unknown }; ssrHtml: unknown }
  }): void
  refresh(): void
  applySecurity(shape: SecurityShape): void
  applyAppState(shape: { filled: boolean; corrupt: boolean; quarantined: readonly string[]; loaded: readonly string[]; modules: readonly { name: string; version: string; disabled?: boolean; quarantined?: boolean }[] }): void
  // module-private: syncConfig(): void · applyJournalCap(): void · render(): void
}
```

- **No other name is exported.** The roster's two constants are module-private and are named here only so no edit renames them:
  `GROUP_LABELS: Record<ToolGroup, string>` and `GROUPS: readonly ToolGroup[]`, with `paneEnvelope(): LegacyInitialData`,
  `paneMutationValid(mutation: unknown[]): boolean` and the five body templates `TOKEN_GEN_BODY`, `TOKEN_CLEAR_BODY`, `TOGGLE_BODY`,
  `JOURNAL_LENGTH_BODY`, `EXCLUSION_TOGGLE_BODY`, each `string` (L2 §1, §5; D-14).
- **This pass writes none of them**: its regions are the `view` member's (§2) — the class, the roster table and every handler body are
  byte-unmoved (`design.md` §4).

## 2. The declared bridge surface — `declare global`, `Window.provident`

### 2.1 `view?` — the post-edit block, SEVEN members (region 1 of the edit; the copy authority)

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

- **Seven members, in that order, one line each**, at the block's own eight-space indent, no trailing comma on `onChanged` and no
  wrapping anywhere — the text `src/main/preload.ts`'s `view` block must carry too, member for member (AS §3-§4; D-112, D-142).
- **The two additions are the fifth and sixth members**, between the appearance act and the push: that position is what
  `tests/integration/store-view-record/crossing.test.ts` pins, and it is not this document's to choose (L2 §8 `R-9`).
- **`commitDrag` names an `id` and a `geometry` and never a path**, answers the commits' own inline text byte for byte, and takes
  `unknown` geometry because the boundary knows no shape (AS §3; D-88, D-132).
- **`clearDrag` takes NOTHING** — the erase is a DELETE at the family's own tier, and the `null` arm `D-140` removed stands nowhere
  here (L1 §9 `ASM-2`, `ASM-4`).
- **The `read` line is unmoved**, member and `source` key for key: the temp reading is read through `provident.data.read({path:
  ['drag']})`, whose node carries its own `_tier`, so no `drag` member joins this answer (L2 §4; D-133, D-144).

### 2.2 The count above the block — `SIX` becomes `SEVEN` (region 2 of the edit)

- The three-line comment above `view?: {` opens with this line, and only its last-word count moves; the two lines below it stay byte
  identical, `store` mention and all (D-11, D-41):

      // THE VIEW RECORD'S CROSSING (D-87, D-91, D-97; `docs/L2/view-record/interface.md` §2): ONE member, SEVEN routes. This

### 2.3 The type-only imports the declaration consumes — NO specifier moves

```ts
import type { ViewPaneGeometry, ViewThemeRecord, ViewZone } from '../main/view-record/index.js'
```

- **The line is byte-unmoved**, because the pair's geometry is `unknown` and its answer inline: no type of the drag's reaches this
  file, exactly as `D-88` kept the three (AS §3; `G-3`).
- **The declaration's other type-only imports are untouched**, specifier for specifier: `SecuritySettings`, `RpcRequest`, `RpcReply`
  and `TabsRecordRow` from `../shared/types.js`; `SecurityWriteReceipt`, `Tier4ClosedRefusal`, `Tier4WriteAnswer` from
  `../main/settings-surface/index.js`; `EXCLUSION_STATE` and `ToolGroup` from `../main/security.js`; `SecurityShape` from
  `./security-client.js`; `DataDeleteAnswer`, `DataJournalAnswer`, `DataListAnswer`, `DataReadAnswer`, `DataWriteAnswer` from
  `../main/data/index.js` (D-112, D-16, D-18).
- **No channel constant is named anywhere in this file**, so `src/shared/view-channels.ts`'s `IPC_VIEW_DRAG_COMMIT` and
  `IPC_VIEW_DRAG_CLEAR` are imported by `preload.ts` and `main.ts` only (`E-2`/`E-3`; D-87, D-41).

### 2.4 The members this pass does not touch — named, their text read from the file

**Only §2.1-§2.3 are copy authorities.** Each member below keeps the file's own text, re-decided by nothing here (D-41, D-2).

| Member | Its routes, by name | Cite |
|---|---|---|
| `security?` | `get`, `set`, `setExclusion`, `onChanged`, `setPane` — untouched, and the record's delivery still reaches the pane through the second of the two `onChanged`s' subscription, never a read | L2 §4; D-104, D-106, D-123 |
| `tabs?` | `read`, `commit`, `remove`, `onChanged` | L2 §4; D-63, D-112 |
| `module?` | `get`, `setDisabled`, `onChanged` | L2 §4; D-104 |
| `data?` | `read`, `write`, `delete`, `list`, `journal` — **and no `onChanged`**, deliberately absent | L2 §4; D-107, D-112 |
| `ready`, `onRequest`, `sendReply`, `notify` | the four top-level members, untouched | D-112 |

## 3. What this pass adds, and what it does not mint

| Name | Disposition | Cite |
|---|---|---|
| `commitDrag(id: string, geometry: unknown)` | **added** to `view?`, fifth member | §2.1; D-132, D-137 |
| `clearDrag()` | **added** to `view?`, sixth member, an act taking nothing | §2.1; L1 §9 `ASM-4` |
| the comment's count | **moved** `SIX → SEVEN` | §2.2; `G-6` |
| a route, channel, `ipcMain.handle`, client method, store verb | **not minted here**: the secure realm gains **no store route** while this declaration carries both members, `['drag']` joining the NORMAL crossing instead | `G-1`, `G-2`; D-132, D-123, D-112 |
| an import, type, alias, export, file, MCP tool or resource | **not minted**: the block declares and nothing is added beside it | `G-3`, `G-7`; D-18, D-14 |

## 4. The commands

```sh
npm run typecheck        # the SHELL's half of the pair; this half is erased
npm run build            # a `declare global` block is erased at build (D-44)
npx vitest run tests/integration/store-view-record/crossing.test.ts   # another module's row — RED until BOTH halves land
node "../Agent Harness/strata/lint/strata-lint.mjs" strata            # exit 1: the ONE accepted `register` FAIL
```

- **No unit battery and no map claim**: `design.md` §7's verdict, with its reason and its instrument (D-9, D-30; L2 §7).
- **That third line's red is NOT this half's, and the attribution is the measurement**: five of its rows fail and each has an owner —
  four are `E-1`'s (the delivery the `temp` root must cause, the drag write census, the published `drag@temp` root and the 14-site
  census) and one is `E-3`'s, the comparison itself, `[7]` against `[5]`; no crossing red CHARGES this file (the comparison's title
  and the census's list name it, and neither fails on it) (`design.md` §3, §6; L2 §8 `R-9`).
- **The readings at this head, taken after the landing**: `typecheck` 0, `typecheck:tests` 0, `build` exit 0, and `npm test` exit 1
  with seven files red — every one another row's (`E-1`, `E-2`, `E-3`, `E-8`) once this pass's OWN red was cured: `tests/demo-bundle.test.ts`
  red on the checked-in bundle's stale manifest and green after `node demo/pane-drag-demo/build.mjs` (D-118). The lint is exit 1 with
  the accepted `register` FAIL and nothing else — and it reads `strata/` only, so neither document's ceiling is instrumented by it
  (`design.md` §6).
- **No census figure, cap, script key or map row is stated here**, all being read from the `secure-panels` row and `brief.md` §6
  (D-14, D-26, D-39).
