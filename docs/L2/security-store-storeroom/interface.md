# L2 — `security-store-storeroom`: the interface

- **Layer:** L2 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — `docs/L1/security-store-storeroom.md` and its exception are the inputs; `tests/integration/security-store-storeroom/` is filed against this file and its two surface-facing files stand red until `src/main/operator-settings/` and `src/main/settings-surface/` exist (`examiner.md` §3, D-1 §4)
- **Inputs:** L1 §2/§3/§4/§5/§6/§7; exception §1/§2 (E-1..E-5), §8; D-5, D-11, D-12, D-13, D-14, D-15, D-16..D-20; `strata/modules.json:44-73` (`operator-settings` 10, `settings-surface` 11); `strata/platform.md` §4; the tree at `0eca66b`
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; **the declaration** is its `index.d.ts`; both are read and never edited (D-5)

## 0. Scope

Two modules' I/O surface and nothing beneath it. `src/main/operator-settings/` is the state machine — a separate `provident-storeroom` instance, its own lifetime and its own file, not the instance `provident.data.*` reads (D-16). `src/main/settings-surface/` sees it only through read, write and listeners (D-17). Structure, private helpers and layout are L3's (D-1 §3).

## 1. The six members, at two addresses

The record is **one value per tier, written whole**, so each transition is one store write, one op, one cursor and one receipt (L1 §3; `guide §4` arm `W-4`).

| Member | Tier | Address | What it is |
|---|---|---|---|
| `token` | `file` | `['operator-settings']` | the bearer token, or `null` (D-17) |
| `enabled` | `file` | same | the granted group names, deduplicated through the **six**-member set (D-11, D-15) |
| `maxJournalLength` | `file` | same | the supervisor's journal cap, or absent (D-17) |
| `entries` | `file` | same | the arbitrary-name map, **absent until first written** (D-16 behaviour carried) |
| `exclusion` | `mem` | `['operator-exclusion']` | `'mcp-enabled'` \| `'mcp-disabled'` — never persisted (ASM-L2-2) |
| `tier4` | `mem` | same | **derived**: `exclusion === 'mcp-disabled'` — never persisted (ASM-L2-2) |

- **Two addresses, and the measurement is why.** L1 §3 places all six at one address; a `file`-tier write purges the versions it outranks at its key (`file` > `mem` > `temp`), so a settings commit would silently reset the operator's exclusion pair (`guide §5.1`). `ASM-L2-1` records the re-grain and what it rejected (D-17, L1 §3).
- **`tier4` is a second reading of one record and never a second home** — the landed `ExclusionState` precedent, where the illegal pair is unspellable rather than forbidden (`src/main/security.ts:98-101`; L1 §3). A **patch names one tier**: the four `file` members, or `exclusion`. A patch naming both is outside this domain, because it is two store writes and therefore two receipts or a landed-then-refused tear (`ASM-L2-5`).

## 2. `src/main/operator-settings/index.ts` — the declared surface

```ts
export type OperatorSettingsAddress = readonly (string | number)[]
export interface OperatorSettingsRecord {
  token: string | null; enabled: string[]; maxJournalLength?: number
  entries?: Readonly<Record<string, unknown>>
  exclusion: 'mcp-enabled' | 'mcp-disabled'; tier4: boolean
}
export interface OperatorSettingsPatch {
  token?: string | null; enabled?: string[]; maxJournalLength?: number | null
  entries?: Readonly<Record<string, unknown>>; exclusion?: 'mcp-enabled' | 'mcp-disabled'
}
export type OperatorSettingsRefusalReason =
  | 'ValueRefusedAtBoundary' | 'FileCommitFailed' | 'FilePathUnreachable'
export type OperatorSettingsReceipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: OperatorSettingsRefusalReason; message: string; address: OperatorSettingsAddress | null }
export type OperatorSettingsListener = (address: OperatorSettingsAddress) => void
export interface OperatorSettingsOptions { userDataDir: string; journalLength?: number }
export interface OperatorSettings {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  /** Answers the withdrawal — `unlisten` through one closure, never a fourth verb. */
  subscribe(listener: OperatorSettingsListener): () => void
}
export function createOperatorSettings(options: OperatorSettingsOptions): OperatorSettings
```

- **The six package exports this module calls** are `storeCreate`, `read`, `write`, `listen`, `register` and `unlisten`; `readLiteral`, `delete`, `rollback` and the four constraint members are **not called** (L1 §2; D-12's posture unmoved — nothing reverses, no constraint is registered, and `write`'s fourth position is left absent so its class-test arm is unreachable, `guide §3.3`).
- **`N = 10`** by D-14's convention — 6 package exports called + 4 value names exposed (the factory and its product's three verbs) — matching `strata/modules.json:64`. Measured here, not declared by this document; the cap that follows is 150 (`platform.md` §4, A-4).
- **`read()` moves nothing and answers the record detached at every depth** (`guide §10`); a process that only reads writes no byte (L1 §5). A **cleared member is written as its absence** — `token:null` and a `null` cap are the patch's landed clear markers and never stored values — because the package's walk refuses `null` and `undefined` anywhere in a value (`guide §10.1`, `§10.2`), and `read()` maps absence back to `null`/`undefined` for the carrier's byte-identical `SecuritySettings` (L1 §4).
- **`write()` answers a receipt and never throws**, for any patch and any state (L1 §3). `cursor` is the store's own journal ordinal and `opId` its own string, both taken from the write's `op` verbatim (`guide §6.4`; the declaration's `JournalOp`).
- **`subscribe()` returns the withdrawal.** The listener's one argument is the **triggering address** — never the value, never which member moved — so a subscriber reads through `read()` (`guide §6.1`, `§6.4`; exception §8 item 2). Withdrawal unregisters, and an unregistered handle fires nothing, silently (`guide §6.2`, `§6.3`).

## 3. The receipt vocabulary, and its closed reason set

A refusal is a **value on this surface**: the store's own status verbatim as `reason`, the package's own generated sentence as `message`, and the package's fourth member as `address` (`guide §8`; the declaration's `StoreRefusal`, `D-77`). The set is **closed at the three statuses this surface can reach**, derived from the twenty-member closed set (`guide §8.1`):

| `reason` | Rank | The one arm that produces it |
|---|---|---|
| `ValueRefusedAtBoundary` | 17 | the write carries a value the crossing refuses **before any store verb** — a function, a symbol, `undefined`, a cycle, a non-finite number, or a node past the two ceilings (`guide §10.1-§10.3`) |
| `FileCommitFailed` | 15 | a `file`-tier save cannot land; the store's journal rollback has already run, so the previous bytes stand (`guide §9.4`) |
| `FilePathUnreachable` | 13 | the store's construction refused, so no instance stands and each later write answers it (`guide §8.2`) |

- **`'write-failed'` and `'tier4-closed'` do not survive as write-outcome tokens** (D-16). `'tier4-closed'` survives only as the **carrier's read token** (§5); `'write-failed'` survives nowhere.
- **Unreachable, each by its own ground, therefore not in the set:** `ValueNotAdmitted` (rank 14 — the native-route admission; the package's walk answers `ValueRefusedAtBoundary` first, `guide §8.1` closing paragraph), `AddressMalformed` and `OutOfDomainTier` (no caller supplies an address or a tier, `guide §5.2`), `AddressNotFound` (the register always stands, and a whole structured value at a register key mints the tree beneath it, `guide §4`), `ContainerKindConflict` (every value written at these two addresses is a plain object), `TierNotFound` (a read arm, §4), the four constraint statuses and `JournalOpUnknown`/`RollbackCompacted` (D-12; `guide §8.1`).
- **A refusal leaves the record and the bytes exactly as they stood and mints no cursor** (L1 §3; `guide §9.4`).

## 4. The read arms answered without a refusal

- On the first boot over no file the store's register is empty, so the `file` read answers `AddressNotFound` and the module serves the **first-run default** — `token:null`, `enabled:['read','dispatch']`, no cap, no `entries` (`guide §4`; `src/main/security-store.ts:206`).
- With no `mem` version standing the `mem` read answers `TierNotFound`, and the module serves the **safe pair** `{exclusion:'mcp-enabled', tier4:false}` (`guide §5.1`; D-17, ASM-L2-2). Both are read arms, not refusals: neither is a `reason` word and neither moves a byte (§3).

## 5. `src/main/settings-surface/index.ts` — the declared surface

```ts
// declared HERE so E-2 moves preload.ts's and secure-panels.ts's `import type` source only.
export type SecurityWriteReceipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: string; message: string; address: readonly (string | number)[] | null }
export type Tier4WriteAnswer = SecurityWriteReceipt           // one form; `tier4-closed` is not one (D-16)
export type Tier4ClosedRefusal = { status: 'refused'; reason: 'tier4-closed'; message: string }
export type ExclusionState = 'mcp-enabled' | 'mcp-disabled'
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
  | { applied: true; state: ExclusionState; write: SecurityWriteReceipt }
  | { applied: false; state: ExclusionState; write: SecurityWriteReceipt }
  | { applied: false; state: ExclusionState; reason: 'malformed-state' }
export interface SettingsSurface {
  read(): SettingsReadAnswer
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SettingsSetAnswer
  transition(state: unknown): SettingsTransitionAnswer
  attach(sink: SettingsGateSink): void
}
export function createSettingsSurface(options: { userDataDir: string; journalLength?: number }): SettingsSurface
```

- **`createSettingsSurface` constructs the instance and holds the one reference** — the operator path's single reference, no MCP-stack member holding one (D-18; L1 §4). It serves the boot read and writes nothing (L1 §5).
- **`attach` is the composition's second act and the only gate edge**: it re-patches the live gate from the record, applies the boot terminal `'mcp-enabled'`, and points the instance's one subscription at the sink — so **every later re-patch happens inside the listener**, never at a call site (D-17; L1 §4). `src/main/tier4-state.ts`'s holder is written from that same listener and at `attach`, and this module is its sole writer (L1 §3 ASM-4; A-1).
- **The three manual-UI channels answer the landed shapes**: `IPC_SECURITY_GET` → `SettingsReadAnswer` (`src/main/main.ts:427-443`); `IPC_SECURITY_SET` → `SettingsSetAnswer` (`:444-463`); `IPC_SECURITY_EXCLUSION` → `SettingsTransitionAnswer` (`:472-483`), whose `reason` stays closed at `'malformed-state'` and whose store refusal rides the `write` member rather than a second token.
- **`set` maps the landed patch to the record** — `groups` added, `disable` removed, deduplicated and filtered through the six-member set by the **instance** (so the second live copy of the group set stays in E-1's file, D-15) — then one `write` (L1 §3).
- **`N = 11`**: 3 bridge routes with **both sides counted** (`IPC_SECURITY_GET`/`SET`/`EXCLUSION` × `get`/`set`/`setExclusion`) + 5 value names (the factory, `read`, `set`, `transition`, `attach`), matching `strata/modules.json:67`; the cap that follows is 160 (D-14, `platform.md` §4, A-4).
- **`window.provident` gains no member**: the three routes and the two additive members stay as `src/main/preload.ts:42-75` declares them, so `preload.ts`'s only move is its `import type` source and `SecuritySettings` stays byte-identical (L1 §4; exception §2 E-2). Measured at this head the bridge carries **seven** top-level members (A-1).

## 6. The routed question: do the five `data.*` routes answer while the `data` group is off?

**Settled: they answer, and the group does not gate them.** The gate is an MCP-only control and the renderer is not an agent (D-18, L1 §4).

- **No mechanism exists that could gate a route.** The group set is read only through `groupForTool`/`toolAllowed` (`src/main/security.ts:52-69`), and both callers iterate `ALL_TOOLS` and `ALL_RESOURCES` (`src/main/mcp-server.ts:531-567,619-631`); the five route spellings (`data.read` … `data.journal`, `src/shared/types.ts:282-286`) are not rows of `TOOL_GROUPS` and resolve to **no group at all** — measured, `groupForTool('data.read')` is `null` — so a gated route would need a second group table and a second enforcement path (D-18).
- **The routes are the operator's own channel**, so gating them would let an agent's capability set decide what the operator's pane may read (D-18).
- **The clause `behaviour.md` §9 tests against:** with `['read','dispatch']`, each of the five route spellings resolves to no group, so no group decision can withhold one.
- **Rejected: the routes are gated like the tools and answer a refusal value while the group is off.** It has no lawful spelling in the landed gate, it makes a refusal bug a data leak the moment the second table drifts, and it contradicts the one answer site `docs/L2/central-data/interface.md` §5 declares (D-18, A-2).

## 7. What this document does not fix

- No structure, no private helper, no file under either subtree: `docs/L3/<module>/` owns those (D-1 §3). No MCP surface, no resource, no `RpcMethod` member, no rendered element (D-18); the five routes' own answer shapes are `central-data`'s (`docs/L2/central-data/interface.md` §5), and this unit settles only that the group does not gate them (§6).

## 8. Assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| `A-1` | this unit corrects **two** L1 figures: `ISO-4`'s bridge census is **seven**, not six (`ready`, `onRequest`, `sendReply`, `notify`, `security`, `module`, `store`), and `src/main/tier4-state.ts`'s writer is `settings-surface` while the map claims that path for `operator-settings` | reading six, which no reader can produce from `src/main/preload.ts:43-74`, or a second flag home — the defect the leaf exists to close (L1 §3 ASM-4); both recorded for the closing L1 revision (D-18) |
| `A-2` | the five `data.*` routes answer while the group is off (§6) | the gated arm, which needs a second group table and a second enforcement path (D-18) |
| `A-4` | `N` counts the names a module **exposes** — its factory export plus its product's verbs — and types move no figure, so `unsubscribe` riding `subscribe`'s answer keeps `N` at 10 | counting module-level exports alone (1 and 1, which measures nothing), or counting the three receipt type names, which sets a cap off type aliases (D-14) |
| `ASM-L2-1` | the instance's two tiers stand at **two addresses** — `['operator-settings']` and `['operator-exclusion']` — and the module subscribes to both | one address as L1 §3 files it, where a `file`-tier write purges the `mem` shadow at its key and a settings commit silently resets the operator's exclusion pair (`guide §5.1`) |
| `ASM-L2-2` | the exclusion pair and the tier-4 reading are `mem` rows that boot to the safe pair and are never persisted | a `file` row, which persists the gate's own state and lets a crash or a hand-edited file boot the app open (L1 §3 ASM-2) |
| `ASM-L2-5` | a patch naming members of both tiers is outside the domain and **no row asserts it** | a mixed patch answered as two writes, which is two receipts or a landed-then-refused tear (L1 §3) |
| `ASM-L2-6` | every subscriber's throw is **contained inside the module's own listener body** — the write still answers its receipt — and a throwing subscriber is then **withdrawn** | letting the throw cross (the package's own hazard, `guide §6.5a`), or keeping the subscriber registered and catching on every delivery, which leaves a body that fails on every change and whose failure nobody can attribute |

## 9. The integration battery's surface

Each row is one goal → one observable outcome, and the battery is **evidence**, so it does not count against the two harness caps of 150 and 160 (D-14, `platform.md` §4; exception §1).

- `tests/integration/security-store-storeroom/isolation.test.ts` carries `ISO-1`..`ISO-6` and `RQ-1`; `instance.test.ts` the boot, write, the five import arms, the refusals, the subscription, the throw hazard, the exclusion pair and the two-profile row; `surface.test.ts` the carrier's read, the three channels, `attach`, the one-construction census and the product census. `behaviour.md` §1-§9 states each row's expected answer and cites it (D-1, `examiner.md` §2).
- `ISO-1`..`ISO-6` are L1 §6's absences, driven over live surfaces and never inferred from a code read; `RQ-1` is §6's clause, driven over the gate's own predicates (D-18).
