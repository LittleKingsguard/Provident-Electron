# L3 — `security-store-storeroom`: the declared signatures and the file layout

- **Layer:** L3 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 6 — `D-123` declares the FOURTH address and the invariant the crossing now holds: §2 gains `writePane`, §1's table row names four addresses and five declarations, §3 gains `pane` and `onExclusionChanged`, the `N` figures move `12`/`19` → `13`/`21`, the `write` fourth-position sentence is re-grained to say WHO supplies it, and ONE bullet break is MERGED in §2 so the file holds at `150`. Rev 5 — `D-106` gives the record and the pair a DELIVERY whose crossing this layer declares: §3's `createSettingsSurface` options block carries `onSecurityChanged` beside `onAppStateChanged`, spelled on the line the surface is declared on, so the file's line count is unmoved. Rev 4 — the one subscription declares a second body for the third address (`D-104`), so §2's block and its two-address sentence are re-grained and one line is added for the type. Rev 3 — rev 3 declares the surface the tree actually exports: both code blocks gain the app-state types and the two verbs per side, and the contract stops claiming a totality over a document that does not spell them (D-25, D-43) · **Artifact:** `security-store-storeroom-l3-design`
- **Status:** DECLARED SURFACE AND FILE LAYOUT ONLY — structure, private helpers, pseudocode and guardrails are `design.md` (the instance) and `design-settings-surface.md` (the surface), split by owner at the class ceiling (D-1)
- **Contract:** every symbol below is an **export the tree carries at this head** — `src/main/operator-settings/index.ts`'s exports and `src/main/settings-surface/index.ts`'s, read off those files — declared to `docs/L2/security-store-storeroom/interface.md` §2/§2.1 and §5/§5.1 where that document settles them. Two groups are declared here **beyond those code blocks and are named as such**: the app-state types and the two app-state verbs per side, which `docs/L2/security-store-storeroom/interface.md` counts in its own `N` bullets and `A-4` but does not spell in §2's and §5's declarations, and whose contract is `docs/L3/settings-carrier-retirement/design.md` §2-§3 (L1 `settings-carrier-retirement` §2, §3 E-2/E-3; interface §7 `A-4`; D-1, D-43). **Nothing either file exports is dropped below, and no name is declared that neither the tree nor those rows carries** (D-1)
- **Ceiling:** 150 lines, class max (D-1) · `guide §n` is `node_modules/provident-storeroom/README.guide.md`, read and never edited (D-5)

## 1. The file layout — two subtrees, one file each

| path | holds | cite |
|---|---|---|
| `src/main/operator-settings/index.ts` | the instance: the factory, its product, `VALID_GROUPS`, the **four** addresses (record, exclusion, app-state — D-25 — and the pane's `mem` record, `D-123`), the **five declarations** their existence and one invariant are enforced by (D-84, D-85, D-123), the two import-once arms those repairs perform, the listener registry | interface §2, §2.1; D-16 |
| `src/main/settings-surface/index.ts` | the surface: the factory, its six verbs, the receipt types E-2 moves here, the sink shape | interface §5, §5.1; exception §2 E-2 |
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
export type OperatorAppStateListener = () => void                 // the third address's own body (D-104)

export interface AppStateRow { name: string; value: unknown }
export type AppStateLegacy = 'absent' | 'imported' | 'corrupt' | 'recorded'
export interface AppStateAnswer {
  rows: AppStateRow[]
  legacy: AppStateLegacy
  unrepresentable: string[]
  storage: 'standing' | 'unreachable'
}

export interface OperatorSettingsOptions { userDataDir: string; journalLength?: number }

export interface OperatorSettings {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  subscribe(listener: OperatorSettingsListener, appStateListener?: OperatorAppStateListener): () => void   // answers the withdrawal
  readAppState(): AppStateAnswer                                  // the third address, no listener (D-25)
  writeAppState(rows: readonly AppStateRow[]): OperatorSettingsReceipt
  writePane(open: boolean): OperatorSettingsReceipt                // the FOURTH address, one `mem` write of `{open}` (D-123)
}

export function createOperatorSettings(options: OperatorSettingsOptions): OperatorSettings
```

- **Six package exports are called** — `storeCreate`, `read`, `write`, `listen`, `register`, `unlisten` — and `readLiteral`, `delete`, `rollback` and the four constraint members are **not** (interface §2; D-12's posture unmoved; guide §3.1).
- **`N = 13`**, matching the map row: 6 package exports called + 7 value names exposed (the factory, its three verbs, the app-state pair `readAppState`/`writeAppState` the retirement added, and `D-123`'s `writePane` — `docs/L1/settings-carrier-retirement.md` §2, §3 E-2) — 6 + 7 = **13** (interface §2; the `operator-settings` row of `strata/modules.json`, `endpoints` 13; D-14, D-28). The cap follows from the row and is never declared here (`platform.md` §4).
- **`write`'s fourth position is supplied by ONE caller and by no other, and `D-123` is where it arrived**: a REPAIR at a landing instant names its commit there — the one supported route for a repair that writes anywhere (`guide §7.6`, `D-103`) — so the class-test `TypeError` arm is reachable from a repair body and unreachable from every verb a caller holds, because a caller's write IS its own commit (interface §2; guide §3.3, `§7.6`).
- **`subscribe` answers its own withdrawal** rather than exporting a fourth verb, so the module's own surface is **seven value names** — the factory and six verbs — and no more (interface §2; `interface.md` §7 `A-4`). **The app-state pair is the third address's whole surface, and it is the retirement unit's**: `readAppState`/`writeAppState` are one store read or one store write each, carry the sibling `OperatorSettingsReceipt` verbatim, and **since `D-104` the one subscription binds their address too**, routing its deliveries to a SECOND body (`OperatorAppStateListener`) while the record's listener goes on hearing the other two (D-25; `D-82`'s `V3`; `docs/L1/settings-carrier-retirement.md` §2, §3 E-2; `design.md` §2). Their arm-by-arm design is that unit's document and is cited here, never restated (D-43).
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

export type SettingsAppStateRow = AppStateRow
export type SettingsLegacyAnswer = AppStateLegacy
export interface SettingsAppStateAnswer {
  rows: SettingsAppStateRow[]
  legacy: SettingsLegacyAnswer
  unrepresentable: string[]
  storage: 'standing' | 'unreachable'
}
export type SettingsCommitAnswer =
  | { status: 'committed' }                       // no ordinal: the bridge answer has none (interface §3)
  | { status: 'refused'; reason: string; message: string
      address: readonly (string | number)[] | null }

export interface SettingsSurface {
  read(): SettingsReadAnswer
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]
    maxJournalLength?: number | null }): SettingsSetAnswer
  transition(state: unknown): SettingsTransitionAnswer
  attach(sink: SettingsGateSink): void
  state(): SettingsAppStateAnswer                 // the instance's answer, handed on, never recomposed
  commit(rows: readonly SettingsAppStateRow[]): SettingsCommitAnswer
  pane(open: unknown): SettingsPaneAnswer                          // the fourth address's one verb (D-123)
}

export function createSettingsSurface(options: { userDataDir: string; journalLength?: number; onAppStateChanged?: () => void; onSecurityChanged?: () => void; onExclusionChanged?: (state: ExclusionState) => void }): SettingsSurface   // three pushes: the rows' (D-104), the record's and pair's (D-106), and the EXCLUSION's own — called inside its delivery, the port's edge (D-123)
```

- **`N = 13` and `21`**: `operator-settings` is 6 package exports called + 7 value names exposed (**13**); the surface is three bridge routes with both sides counted (**6**) + eight value names exposed to `main.ts` (the factory, `read`, `set`, `transition`, `attach`, the retirement's `state`/`commit`, and `D-123`'s `pane`) + seven value names consumed from `operator-settings` (the six plus `writePane`) — 6 + 8 + 7 = **21** (interface §5; the `operator-settings` and `settings-surface` rows of `strata/modules.json`, `endpoints` 13 and 21; `docs/L1/settings-carrier-retirement.md` §2, §3 E-3; D-14, D-28).
- **`main.ts` is the only caller of `createSettingsSurface` in `src/**`**, and the instance's single construction lives inside this module (interface §5 `ASM-L2-8`; D-18).
- **The transition's answer carries no receipt member**; `write` is declared on `set` alone, exactly as the bridge declares it (interface §5.1 `ASM-L2-4`; the `set` and `setExclusion` declarations in `src/main/preload.ts`'s `window.provident.security` block).
- **`SettingsGateSink` is structural**, so `ProvidentMcpServer` satisfies it without a second declaration, and the surface names no `ToolGroup` (interface §5; D-18).
- **`SettingsGateSink` is not widened, and no member of it is added to express a cleared token**: the patch is composed so that `token` is **present only while a non-empty string stands**, because the gate rejects the **whole patch** — `groups` included — wherever the member is present and is not one (the gate's patch admission in `src/main/security.ts`; interface §5; exception §2 E-2, E-3; `design-settings-surface.md` §5 `ASM-7`).
- **The surface's own file effects are the instance's alone, and its two app-state verbs are delegations**: `state()` hands the instance's answer on without recomposing a member and `commit(rows)` is one `writeAppState` mapped to the channel's answer — the pair's design is `docs/L3/settings-carrier-retirement/design.md` §3 and is cited, not restated here (D-43; `docs/L1/settings-carrier-retirement.md` §3 E-3).

## 4. Internal names — declared so L4 mints nothing extra

| module | never exported | cite |
|---|---|---|
| `operator-settings` | `VALID_GROUPS` · `FIRST_RUN` · `SAFE_PAIR` · `RECORD_ADDRESS` · `EXCLUSION_ADDRESS` · `APP_STATE_ADDRESS` · `FILE_NAME` · `RETIRED_NAME` · `RETIRED_SETTINGS_NAME` · `NO_IMPORT` · `issuance` · `plain` · `detach` · `newMap` · `admitGroups` · `toStored` · `fromStored` · `importOnce` · `importAppStateOnce` · `missing` · `representable` · `recordedAt` · `fromAppState` · `toAppState` · `legacyOf` · `unrepresentableOf` · `toAppStateRecord` · `receiptOf` · `refusalOf` · `cap` · `seq` · `handleFor` · `withdraw` · **and the declarations' own fifteen**: `EXCLUSION_MUST_STAND_ID` · `RECORD_MUST_STAND_ID` · `APP_STATE_MUST_STAND_ID` · `EXCLUSION_ABSENT_MESSAGE` · `RECORD_ABSENT_MESSAGE` · `APP_STATE_ABSENT_MESSAGE` · `repairAnswer` · `registrationRoute` · `mintExclusion` · `exclusionMustStand` · `mintRecord` · `recordMustStand` · `mintAppState` · `appStateMustStand` · `declarationsFor` · **and the value arms' SIXTEEN (`D-105`)**: `RECORD_UNUSABLE_MESSAGE` · `EXCLUSION_UNUSABLE_MESSAGE` · `APP_STATE_UNUSABLE_MESSAGE` · `atWrite` · `nodeOf` · `RECORD_MEMBERS` · `APP_STATE_MEMBERS` · `LEGACY_WORDS` · `groupsAdmit` · `recordMemberAdmits` · `recordAdmitsAt` · `pairAdmits` · `exclusionAdmitsAt` · `rowAdmits` · `namesAdmit` · `appStateAdmitsAt` (the app-state arm's design is the retirement document's, `docs/L3/settings-carrier-retirement/design.md` §2.1/§2.2, cited not restated, D-43; the declarations' is `design.md` §3, D-84 and D-85) | D-15, D-25, D-84, D-85; exception §2 E-1; `design.md` §3, §8 |
| `settings-surface` | `TIER4_CLOSED_REFUSAL` · `onDelivery` · `patchOf` · `appliedGroups` · `off` · `sink` (everything else is a local inside a verb) | interface §5; `design-settings-surface.md` §2-§6 |

## 5. What neither module declares

No `RpcMethod` member, no MCP tool name, no resource URI, no bridge channel, no `window.provident` member, no rendered element and no second `filePath` appears in either file: the isolation is asserted by absence and this layer adds no reference to assert it over (L1 §6; D-18; interface §0).
