# L3 — `security-store-storeroom`: the declared signatures and the file layout

- **Layer:** L3 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 2 · **Artifact:** `security-store-storeroom-l3-design`
- **Status:** DECLARED SURFACE AND FILE LAYOUT ONLY — structure, private helpers, pseudocode and guardrails are `design.md` (the instance) and `design-settings-surface.md` (the surface), split by owner at the class ceiling (D-1)
- **Contract:** every symbol below is a symbol `docs/L2/security-store-storeroom/interface.md` §2, §2.1, §5 or §5.1 declares; no name is added and none is dropped (interface §7 `A-4`; D-1)
- **Ceiling:** 150 lines, class max (D-1) · `guide §n` is `node_modules/provident-storeroom/README.guide.md`, read and never edited (D-5)

## 1. The file layout — two subtrees, one file each

| path | holds | cite |
|---|---|---|
| `src/main/operator-settings/index.ts` | the instance: the factory, its product, `VALID_GROUPS`, the two addresses, the import path, the listener registry | interface §2, §2.1; D-16 |
| `src/main/settings-surface/index.ts` | the surface: the factory, its four verbs, the receipt types E-2 moves here, the sink shape | interface §5, §5.1; exception §2 E-2 |
| `src/main/security-store.ts` | **deleted**, not emptied — no shim, no dual write, no re-export left standing | D-16; exception §2 E-1, §5 |

No third file is created under either subtree, and neither module writes outside its own (interface §0; `modules.md` §1; D-3).

## 2. `src/main/operator-settings/index.ts` — the declared surface

```ts
export type OperatorSettingsAddress = readonly (string | number)[]

export interface OperatorSettingsRecord {
  token: string | null
  enabled: string[]
  maxJournalLength?: number
  entries?: Readonly<Record<string, unknown>>
  exclusion: 'mcp-enabled' | 'mcp-disabled'
  tier4: boolean
}

export interface OperatorSettingsPatch {
  token?: string | null
  enabled?: string[]
  maxJournalLength?: number | null
  entries?: Readonly<Record<string, unknown>>
  exclusion?: 'mcp-enabled' | 'mcp-disabled'
}

export type OperatorSettingsRefusalReason =
  | 'ValueRefusedAtBoundary' | 'FileCommitFailed' | 'FilePathUnreachable'
  | (string & {})                     // the store's OPEN escape arm, carried verbatim (interface §3)

export type OperatorSettingsReceipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: OperatorSettingsRefusalReason
      message: string; address: OperatorSettingsAddress | null }

export type OperatorSettingsListener = (address: OperatorSettingsAddress) => void

export interface OperatorSettingsOptions { userDataDir: string; journalLength?: number }

export interface OperatorSettings {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  subscribe(listener: OperatorSettingsListener): () => void      // answers the withdrawal
}

export function createOperatorSettings(options: OperatorSettingsOptions): OperatorSettings
```

- **Six package exports are called** — `storeCreate`, `read`, `write`, `listen`, `register`, `unlisten` — and `readLiteral`, `delete`, `rollback` and the four constraint members are **not** (interface §2; D-12's posture unmoved; guide §3.1).
- **`N = 12`**, matching the map row: 6 called + 4 value names exposed (the factory and its three verbs) (interface §2; `strata/modules.json:64`; D-14). The cap follows from the row and is never declared here (`platform.md` §4).
- **`write`'s fourth position is never supplied**, so the class-test `TypeError` arm is unreachable and the refusal vocabulary is the store's alone (interface §2; guide §3.3).
- **`subscribe` answers its own withdrawal** rather than exporting a fourth verb, so the module's own surface is four value names and no more (interface §2; `interface.md` §7 `A-4`).
- **`unlisten` is the withdrawal and `removeListener` is never called**: it is a seventh export, so calling it would move `N` and the map's row, which is L1's to re-declare and not this layer's — and the module binds **one handle per address**, so `unlisten` is the arm the package silences (interface §2; `design.md` §8 `ASM-7`; guide §6.2; P-6).

## 3. `src/main/settings-surface/index.ts` — the declared surface

```ts
export type { ExclusionState } from '../security.js'      // re-exported, never re-spelled (PAR-13)

export type SecurityWriteReceipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: string; message: string
      address: readonly (string | number)[] | null }
export type Tier4WriteAnswer = SecurityWriteReceipt       // one form; `tier4-closed` is not one (D-16)
export type Tier4ClosedRefusal = { status: 'refused'; reason: 'tier4-closed'; message: string }

export interface SettingsGateSink {
  applyGatePatch(patch: { token?: string | null; groups?: string[]; disable?: string[] }): unknown
  applyExclusion(state: ExclusionState): unknown
  readonly gate: { exclusionState(): ExclusionState }
}

export type SettingsSetAnswer = { token: string | null; enabled: string[]; maxJournalLength?: number
  write: SecurityWriteReceipt; exclusion: ExclusionState }
export type SettingsReadAnswer = { token: string | null; enabled: string[]; maxJournalLength?: number
  read: Tier4ClosedRefusal | null; exclusion: ExclusionState }
export type SettingsTransitionAnswer =
  | { applied: true; state: ExclusionState }
  | { applied: false; state: ExclusionState; reason?: 'malformed-state' }

export interface SettingsSurface {
  read(): SettingsReadAnswer
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]
    maxJournalLength?: number | null }): SettingsSetAnswer
  transition(state: unknown): SettingsTransitionAnswer
  attach(sink: SettingsGateSink): void
}

export function createSettingsSurface(options: { userDataDir: string; journalLength?: number }): SettingsSurface
```

- **`N = 12` and `19`**: three bridge routes with both sides counted (6) + five value names exposed to `main.ts` + four value names consumed from `operator-settings` (interface §5; `strata/modules.json:72`; D-14).
- **`main.ts` is the only caller of `createSettingsSurface` in `src/**`**, and the instance's single construction lives inside this module (interface §5 `ASM-L2-8`; D-18).
- **The transition's answer carries no receipt member**; `write` is declared on `set` alone, exactly as the bridge declares it (interface §5.1 `ASM-L2-4`; `src/main/preload.ts:63-64`).
- **`SettingsGateSink` is structural**, so `ProvidentMcpServer` satisfies it without a second declaration, and the surface names no `ToolGroup` (interface §5; D-18).
- **`SettingsGateSink` is not widened, and no member of it is added to express a cleared token**: the patch is composed so that `token` is **present only while a non-empty string stands**, because the gate rejects the **whole patch** — `groups` included — wherever the member is present and is not one (`src/main/security.ts:176-179`; interface §5; exception §2 E-2, E-3; `design-settings-surface.md` §5 `ASM-7`).

## 4. Internal names — declared so L4 mints nothing extra

| module | never exported | cite |
|---|---|---|
| `operator-settings` | `VALID_GROUPS` · `FIRST_RUN` · `SAFE_PAIR` · `RECORD_ADDRESS` · `EXCLUSION_ADDRESS` · `FILE_NAME` · `RETIRED_NAME` · `detach` · `newMap` · `admitGroups` · `toStored` · `fromStored` · `importOnce` · `receiptOf` · `refusalOf` · `cap` · `seq` · `handleFor` · `withdraw` | D-15; exception §2 E-1; `design.md` §3, §8 |
| `settings-surface` | `TIER4_CLOSED_REFUSAL` · `onDelivery` · `patchOf` · `appliedGroups` · `off` · `sink` (everything else is a local inside a verb) | interface §5; `design-settings-surface.md` §2-§6 |

## 5. What neither module declares

No `RpcMethod` member, no MCP tool name, no resource URI, no bridge channel, no `window.provident` member, no rendered element and no second `filePath` appears in either file: the isolation is asserted by absence and this layer adds no reference to assert it over (L1 §6; D-18; interface §0).
