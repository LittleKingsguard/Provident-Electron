# L3 — `settings-carrier-retirement`: the declared signatures and the file layout

- **Layer:** L3 · **Unit:** `settings-carrier-retirement` · **Branch:** `strata` (D-6) · **Rev:** 3 — §6 states the entry's landed binding set and the reason `dirname` is bound at all: E-2's derivation, whose single caller is the entry's own directory (`docs/L1/bundle-boot-seam.md` §8 E-2). Rev 3 names the app-state import by its site rather than its offset, and records beside that cite why the offset was the worse citation of the two (D-41, §4) · **Artifact:** `l3-binding-regrain`
- **Status:** DECLARED SURFACE AND FILE LAYOUT ONLY — structure, private helpers, pseudocode and guardrails are `design.md` §2–§6
- **Contract:** every symbol below is one `docs/L2/settings-carrier-retirement/interface.md` §2, §3 or §4 declares, or one the landed file already declares and this unit leaves standing; no name is added and none is dropped (interface §7 `A-1`, `A-3`; D-1)
- **Ceilings:** 150 lines, class max (D-1) · **Shorthands:** `L1` = `docs/L1/settings-carrier-retirement.md`; `interface`/`behaviour`/`persistence` = the three `docs/L2/settings-carrier-retirement/` files; `sibling` = `docs/L3/security-store-storeroom/signatures.md`; `guide §n` = `node_modules/provident-storeroom/README.guide.md`, read and never edited (D-5)

## 1. The file layout — three files, no new one, no path moved

| path | holds | cite |
|---|---|---|
| `src/main/operator-settings/index.ts` | the instance: the landed surface **plus** the third address, the second import-once arm and its two verbs | interface §2; L1 §9 E-2 |
| `src/main/settings-surface/index.ts` | the surface: the landed five types and six value names **plus** `state`/`commit` and the four new type names | interface §3; L1 §9 E-3 |
| `src/main/main.ts` | L1 §3's removals and the three re-pointed reads and writes; no type of its own is exported | L1 §9 E-1; D-22 |

No file is created beside any of the three, no module writes outside its own subtree, and `store-channels.ts`, `preload.ts`, `module-store.ts` and `src/shared/types.ts` stay byte-identical (interface §0; L1 §9; D-3).

## 2. `src/main/operator-settings/index.ts` — the declared surface

```ts
export type OperatorSettingsAddress = readonly (string | number)[]

export interface OperatorSettingsRecord { token: string | null; enabled: string[]
  maxJournalLength?: number; entries?: Readonly<Record<string, unknown>>
  exclusion: 'mcp-enabled' | 'mcp-disabled'; tier4: boolean }                  // sibling §2, UNMOVED
export interface OperatorSettingsPatch { token?: string | null; enabled?: string[]
  maxJournalLength?: number | null; entries?: Readonly<Record<string, unknown>>
  exclusion?: 'mcp-enabled' | 'mcp-disabled' }                                 // sibling §2, UNMOVED
export type OperatorSettingsRefusalReason =
  | 'ValueRefusedAtBoundary' | 'FileCommitFailed' | 'FilePathUnreachable'
  | (string & {})                                     // the store's OPEN escape arm, verbatim (interface §6)
export type OperatorSettingsReceipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: OperatorSettingsRefusalReason
      message: string; address: OperatorSettingsAddress | null }               // sibling §3, UNMOVED
export type OperatorSettingsListener = (address: OperatorSettingsAddress) => void

// ── NEW, and the whole of this unit's declared delta on this file (interface §2) ──
export interface AppStateRow { name: string; value: unknown }                  // name verbatim, order preserved
export type AppStateLegacy = 'absent' | 'imported' | 'corrupt' | 'recorded'    // §4's three arms + ASM-L2-1's fourth
export interface AppStateAnswer {
  rows: AppStateRow[]                        // the records rows, or the import overlay, or []
  legacy: AppStateLegacy                     // a boot-time diagnosis served for the process's life, never written
  unrepresentable: string[]                  // names the import could not carry, answered by name
  storage: 'standing' | 'unreachable'        // the refused construction, as a read (ASM-L2-3)
}

export interface OperatorSettingsOptions { userDataDir: string; journalLength?: number }

export interface OperatorSettings {
  read(): OperatorSettingsRecord                                       // sibling §2, UNMOVED
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt          // sibling §2, UNMOVED
  subscribe(listener: OperatorSettingsListener): () => void             // sibling §2, UNMOVED
  readAppState(): AppStateAnswer                                        // NEW
  writeAppState(rows: readonly AppStateRow[]): OperatorSettingsReceipt   // NEW — the sibling's own receipt type
}

export function createOperatorSettings(options: OperatorSettingsOptions): OperatorSettings
```

- **`writeAppState` answers the sibling's receipt unchanged**, so a committed act carries the store's `cursor` and `opId` verbatim and a refusal the store's `reason`, `message` and `address`; no second receipt vocabulary exists (interface §2; sibling §3).
- **Six package exports are called and no seventh** — `storeCreate`, `read`, `write`, `listen`, `register`, `unlisten`: this unit calls **no** new package member, so `readLiteral`, `delete`, `rollback` and the four constraint members stay uncalled (sibling §2; `guide §3.1`; D-12's posture unmoved).
- **`N = 12`**, matching the map row: the sibling's 10 plus the two new verbs; the four new type names move no figure and the cap follows from the row, never from this file (interface §2 `A-3`; L1 §2; `platform.md` §4).
- **`AppStateRow.value` is `unknown` and every answer is detached at every depth**, so a caller's mutation of `rows`, `unrepresentable` or a row's value moves neither the record nor the next answer (`guide §10`; interface §2).

## 3. `src/main/operator-settings/index.ts` — the private names, never exported

| name | kind | cite |
|---|---|---|
| `VALID_GROUPS` · `RECORD_ADDRESS` · `EXCLUSION_ADDRESS` · `FILE_NAME` · `RETIRED_NAME` · `FIRST_RUN` · `SAFE_PAIR` | landed | sibling §4 |
| `plain` · `newMap` · `detach` · `admitGroups` · `toStored` · `fromStored` · `importOnce` · `receiptOf` · `refusalOf` · `cap` · `seq` · `handleFor` · `withdraw` | landed, **none edited** | sibling §4 |
| `APP_STATE_ADDRESS` · `RETIRED_SETTINGS_NAME` · `NO_IMPORT` | **new constants** — the third address, the retired name spelled once in `src/**`, the absent answer | design.md §2; behaviour §8 `RET-2` |
| `missing` · `recordedAt` · `fromAppState` · `toAppState` · `importAppStateOnce` · `representable` | **new functions**, each body and cite in `design.md` §2 | design.md §2/§2.2 |
| `AppStateImport` | **new internal type**: `Omit<AppStateAnswer, 'storage'>`, the shape the import answer is held in | design.md §2.2 |

- **`RETIRED_SETTINGS_NAME = 'provident-settings.json'` stands once** and its single `readFileSync` is the module's second and last, with no writer, renamer or remover of that name anywhere in `src/**`; **`NO_IMPORT`'s own array is never served**, so every `rows` and every `unrepresentable` in an answer is fresh (behaviour §8 `RET-2`/`RET-3`; L1 §4; sibling §4 `FIRST_RUN`'s discipline; design.md §5).

## 4. `src/main/settings-surface/index.ts` — the declared surface

```ts
export type { ExclusionState } from '../security.js'      // landed re-export, unmoved (sibling §3)

export type SecurityWriteReceipt = …                      // landed, UNMOVED
export type Tier4WriteAnswer = SecurityWriteReceipt         // landed, UNMOVED
export type Tier4ClosedRefusal = …                        // landed, UNMOVED
export interface SettingsGateSink { … }                   // landed three members, NEVER widened
export type SettingsSetAnswer = …                         // landed, UNMOVED
export type SettingsReadAnswer = …                        // landed, UNMOVED
export type SettingsTransitionAnswer = …                  // landed, UNMOVED (`SettingsPatch` is the landed INLINE patch object; no type alias is minted by this unit)

// ── NEW, and the whole of this unit's declared delta on this file (interface §3) ──
export type SettingsAppStateRow = AppStateRow
export type SettingsLegacyAnswer = AppStateLegacy
export interface SettingsAppStateAnswer {
  rows: SettingsAppStateRow[]; legacy: SettingsLegacyAnswer
  unrepresentable: string[]; storage: 'standing' | 'unreachable'
}
export type SettingsCommitAnswer =
  | { status: 'committed' }                               // no cursor, no opId (interface §3 ASM-L2-4)
  | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }

export interface SettingsSurface {
  read(): SettingsReadAnswer; set(patch: SettingsPatch): SettingsSetAnswer                 // landed, UNMOVED
  transition(state: unknown): SettingsTransitionAnswer; attach(sink: SettingsGateSink): void
  state(): SettingsAppStateAnswer                                        // NEW — delegates readAppState
  commit(rows: readonly SettingsAppStateRow[]): SettingsCommitAnswer     // NEW — delegates writeAppState
}

export function createSettingsSurface(options: { userDataDir: string; journalLength?: number }): SettingsSurface
```

- **`N = 15 → 19`**, the two new verbs exposed and consumed with both sides counted (interface §3; L1 §2; D-14; `platform.md` §4); and **`AppStateRow`/`AppStateLegacy` are imported as types from `../operator-settings/index.js`** beside the four names already imported there, while `preload.ts:72`'s closed pair stays unwidened — owed to the unit that next touches the bridge (the `../operator-settings/index.js` import line of `src/main/settings-surface/index.ts`, named as a site and never an offset — interface §3; persistence §8; L1 §9). **The site, and not a line number, because the line number this bullet used to carry was verified-looking and wrong**: it named the file's line 18 as the statement introducing those two types, and that line is the `tier4-state.js` import — the types arrive on the line below it. A cite that lands on *a* line while describing a different statement is worse than one that lands past the end of the file, because the second is visibly broken and the first reads as checked; that asymmetry, and not the number itself, is what D-41 is written against.

## 5. `src/main/settings-surface/index.ts` — the private names, never exported

| name | kind | cite |
|---|---|---|
| `TIER4_CLOSED_REFUSAL` · `patchOf` · `onDelivery` · `sink` · `appliedGroups` · `off` | landed, **none edited** — and **no new private name is added**: `state` and `commit` are locals of `createSettingsSurface`, beside `read`/`set`/`transition`/`attach` | `docs/L3/security-store-storeroom/design-settings-surface.md` §2–§6; design.md §3 |

## 6. `src/main/main.ts` — the locals and the two channel answers

```ts
import { dirname, join } from 'node:path'                 // E-2's set: `join` composes the two artifact paths, `dirname` the entry's directory
import { fileURLToPath } from 'node:url'                  // E-2's: the module URL the derivation begins at
import { rmSync } from 'node:fs'                          // the WHOLE node:fs surface this file keeps
import type { SettingsAppStateRow } from './settings-surface/index.js'
const here = dirname(fileURLToPath(import.meta.url))      // E-2's and unmoved: `dirname`'s ONE caller, the ESM entry's only directory source

// DELETED, never emptied — no shim, no re-export, no dual write (L1 §3; behaviour §8 RET-1):
//   settingsPath · bootRecord · settingsCorrupt · readSettingsRecord · commitSettingsWrite

function moduleRecordsOf(): ModuleRecord[]                         // source of rows moves; name and answer stand
function modulePayloadWith(key: string, rec: ModuleRecord): AppStateRow[]   // now answers the whole rows list
function rowsWith(rows: readonly AppStateRow[], key: string, value: unknown): AppStateRow[]   // NEW: replace-or-append

// Y-1 · STORE_FILE_GET — the answer SHAPE is unchanged (preload.ts:71 is byte-identical)
(): { name: string; value: unknown }[]

// Y-2 · STORE_FILE_PUT — the answer SHAPE is unchanged (preload.ts:72 is byte-identical)
(row: { name?: unknown; value?: unknown }) => { status: 'committed' } | { status: 'refused'; reason: string }
```

- **`rowsWith` is this file's one new local** and carries the replace-or-append rule; `modulePayloadWith` is its one caller for a single record and the Q-5 migration threads it over its own list (design.md §4; interface §6).
- **No handler is added, renamed or unregistered**: the seven `ipcMain.handle` sites and the three `ipcMain.on` sites keep their names and their argument positions (L1 §2; D-18).
- **`rmSync` and the two paths are the only filesystem names left** — `legacyModulesPath` and the Q-5 removal stand, `settingsPath` does not exist — and **no value is exported**: `main.ts` exports nothing today and nothing after, so its map row's `N` stands at 7 (L1 §3; behaviour §8 `RET-1`; `platform.md` §4; L1 §2).
- **The two `node:` import lines and the `here` derivation are E-2's and this unit edits none of them**: `dirname`'s one caller is that derivation, so no helper bound in this file is evidence about the retired writer in either direction (`docs/L1/bundle-boot-seam.md` §8 E-2; L1 §9 E-1).

## 7. What none of the three declares

No MCP tool name, resource URI, `RpcMethod` member, bridge channel, `window.provident` member, rendered element, second `filePath`, second instance or second `userDataDir`-derived file name appears in any of the three, and no `schemaVersion` member is declared, carried or stamped anywhere (D-18; D-13; interface §0; `behaviour §8`).
