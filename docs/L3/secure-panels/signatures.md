# L3 — `secure-panels`: the declared signatures and the exact landing text

- **Layer:** L3 · **Unit:** `focus-retirement` · **Branch:** `strata` (D-6) · **Rev:** 2 — **CURRENCY only, no claim moves (D-143): the edit
  LANDED**, so §2's two regions are the text `src/renderer/secure-panels.ts` carries at this head, five members and three import specifiers.
  Rev 1 wrote them for the three removals of `docs/L1/focus-retirement.md` §6 `E-4` (D-142), the module's published surface beside them,
  signatures only; the landed roster text is read from that file and not reprinted here (D-41, D-2) · **Artifact:** `l3-secure-panels-signatures`
- **Status:** DECLARED NAMES AND EXACT TEXT ONLY — the structure, the pair rule, the guardrails and the routed notes are `design.md`;
  this file carries every name the landing exposes or consumes and the exact text each of its two regions carries at this head (D-3)
- **Contract:** the edit removed three names and minted nothing — no member, no route, no alias, no export, no file (D-18, D-142)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `L2 §n` is `docs/L2/secure-panels/interface.md`'s, `E-n` is
  `docs/L1/focus-retirement.md` §6's, `G-n` is `design.md` §5's

## 1. The module's published surface — one export, listed rather than transcribed, and it does not move

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
- **This unit writes none of them**: `E-4`'s lines are the `view` member's and one import's (D-142; `design.md` §1).

## 2. The declared bridge surface — `declare global`, `Window.provident`

### 2.1 `view?` — the post-edit member, as the file carries it (region 2 of the edit)

```ts
      view?: {
        read(): Promise<{ status: 'committed'; panes: readonly ViewPaneGeometry[]; zones: readonly ViewZone[]; theme: ViewThemeRecord; source: { panes: 'record' | 'default'; zones: 'record' | 'default'; theme: 'record' | 'default' } }>
        commitPane(id: string, geometry: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        commitZones(id: string, zone: unknown): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        commitTheme(token: string, attributeName: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null }>
        onChanged(handler: () => void): () => void
      },
```

- **Five members, in that order**, each byte-identical to the line the file carries today; the answer's `read` line carries three families and a `source` of the same three keys (L2 §4, §9 `ASM-L2-14`; D-142; `design.md` §1-§2).
- **The member's three comment lines above it are carried unchanged** and are no part of the edit — the "SIX routes" they still count is
  **prose residue** at that site, read by no instrument and repaired nowhere here (`design.md` §5 `G-5`, §8; D-41).

### 2.2 The type-only imports the declaration consumes — one specifier left (region 1 of the edit)

```ts
import type { ViewPaneGeometry, ViewThemeRecord, ViewZone } from '../main/view-record/index.js'
```

- **`ViewFocusMirror` left this specifier set and no other specifier moved**; the statement, its string, its `import type` keyword
  and the comment block above it are carried as they stand (`E-4` (iii); L2 §4).
- **The declaration's other type-only imports are untouched**, specifier for specifier: `SecuritySettings`, `RpcRequest` and
  `RpcReply` and `TabsRecordRow` from `../shared/types.js`; `SecurityWriteReceipt`, `Tier4ClosedRefusal`, `Tier4WriteAnswer` from
  `../main/settings-surface/index.js`; `EXCLUSION_STATE` and `ToolGroup` from `../main/security.js`; `SecurityShape` from
  `./security-client.js`; `DataDeleteAnswer`, `DataJournalAnswer`, `DataListAnswer`, `DataReadAnswer`, `DataWriteAnswer` from
  `../main/data/index.js` (D-112, D-16, D-18).

### 2.3 The members this edit does not touch — declared signatures, their text read from the file

**Only §2.1 and §2.2 are copy authorities.** This subsection lists the surviving sub-members so a reader sees the whole declared
surface; their signatures are the file's, spelled here in single-line form — members joined with `;`, no trailing comma, `tabs.read`'s
union arms collapsed — so no member, type or answer is re-decided here, and the file's own wrapping is the text wherever it differs (D-41; `design.md` §5 `G-2`/`G-5`).

```ts
      ready(): void
      onRequest(handler: (req: RpcRequest) => void): void
      sendReply(reply: RpcReply): void
      notify(payload: { uri: string }): void
      security?: {
        get(): Promise<SecuritySettings & { exclusion: EXCLUSION_STATE; read: Tier4ClosedRefusal | null; pane: { open: boolean } }>
        set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): Promise<SecuritySettings & { write: Tier4WriteAnswer }>
        setExclusion(state: EXCLUSION_STATE): Promise<{ applied: boolean; state: EXCLUSION_STATE; reason?: 'malformed-state' }>
        onChanged(handler: () => void): () => void
        setPane(open: boolean): Promise<{ status: 'committed' } | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }>
      }
      tabs?: {
        read(): Promise<{ status: 'committed'; order: readonly string[]; landing: string; rows: readonly TabsRecordRow[] } | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }>
        commit(row: TabsRecordRow): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null; repaired?: boolean }>
        remove(id: string): Promise<{ status: 'committed' | 'refused'; reason?: string; message?: string; address?: readonly (string | number)[] | null; repaired?: boolean }>
        onChanged(handler: () => void): () => void
      }
      module?: {
        get(): Promise<{ corrupt: boolean; quarantined: string[]; loaded: string[]; modules: Array<{ name: string; version: string; capabilities?: unknown; disabled?: boolean; quarantined?: boolean }> }>
        setDisabled(name: string, disabled: boolean): Promise<{ corrupt: boolean; quarantined: string[]; loaded: string[]; modules: Array<{ name: string; version: string; capabilities?: unknown; disabled?: boolean; quarantined?: boolean }> }>
        onChanged(handler: () => void): () => void
      }
      data?: {
        read(args: unknown): Promise<DataReadAnswer>
        write(args: unknown): Promise<DataWriteAnswer>
        delete(args: unknown): Promise<DataDeleteAnswer>
        list(args: unknown): Promise<DataListAnswer>
        journal(args: unknown): Promise<DataJournalAnswer>
      }
```

- **`security`'s five routes, `tabs`' four, `module`'s three and `data`'s five are listed by signature only, re-decided by nothing**
  (L2 §4; D-16, D-17, D-63, D-104, D-107, D-112, D-123; `design.md` §4).

## 3. What the edit removed, and what it did not mint

| Name | Disposition | Cite |
|---|---|---|
| `commitFocus(mirror: ViewFocusMirror)` | **removed** from `view?`; nothing stands in its place | `E-4` (i); D-142 |
| `focus: ViewFocusMirror`, `source.focus: 'record' \| 'default'` | **removed** from the `read` line, member and source key together | `E-4` (ii); L2 §9 `ASM-L2-14` |
| `ViewFocusMirror` | **removed** from the `view-record` import's specifier set | `E-4` (iii); L2 §4 |
| anything else | **not minted**: no member, route, alias, type, export, file, channel or script key | D-18, D-14; `design.md` §5 |

## 4. The commands

```sh
npm run typecheck        # the shell's half of the pair (direction 1)
npm run typecheck:tests  # direction 2's leg
npm run build            # the declaration is erased at build (D-44)
npm test                 # the floor's fourth leg (D-1)
npx vitest run tests/integration/store-view-record/crossing.test.ts   # another module's row
```

- **No unit battery and no map claim**: `design.md` §7's verdict, with its reason and its instrument (D-9, D-30; L2 §7).
- **No census figure, cap, script key or map row is stated here**, all being read from the `secure-panels` row and `brief.md` §6
  (D-14, D-26, D-39).
