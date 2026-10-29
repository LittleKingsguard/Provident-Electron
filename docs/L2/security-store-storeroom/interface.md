# L2 — `security-store-storeroom`: the interface

- **Layer:** L2 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 2 — rev 1 is read through this one, and five things it left undeclared are declared here: the **construction act, the file and the import-once path** (§2.1), the **composition site** (§5), the **receipt's ordinal and the `enabled` order** (§2), the carrier's **`read` condition** (§5), and the store's **open escape arm** in the refusal vocabulary (§3); the transition channel's answer **carries no receipt member** (§5.1). **Status:** DESIGN — `tests/integration/security-store-storeroom/` is filed against this file and stands red until `src/main/operator-settings/` and `src/main/settings-surface/` exist (`examiner.md` §3, D-1 §4)
- **Inputs:** `docs/L1/security-store-storeroom.md` (rev 2) §2-§8 and its exception §1/§2; D-5, D-11, D-12, D-13, D-14, D-15, D-16..D-20; `strata/modules.json:44-73` (`operator-settings` **10**, `settings-surface` **15**); `strata/platform.md` §4; the tree at `d488b2f`
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; **the declaration** is its `index.d.ts`; both are read and never edited (D-5)

## 0. Scope, and what this document does not fix

Two modules' I/O surface and nothing beneath it. `src/main/operator-settings/` is the state machine — a separate `provident-storeroom` instance, its own lifetime and its own file, not the instance `provident.data.*` reads (D-16) — and `src/main/settings-surface/` sees it only through read, write and listeners (D-17). No structure, no private helper and no file under either subtree: `docs/L3/<module>/` owns those (D-1 §3). No MCP surface, resource, `RpcMethod` member or rendered element (D-18); the five `data.*` routes' own answer shapes are `central-data`'s (`docs/L2/central-data/interface.md` §5), and this unit settles only that the group does not gate them (§6).

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

- **Two addresses, and the measurement is why.** L1 §3 places them at **two** addresses, the durable four at `['operator-settings']` and the volatile pair at `['operator-exclusion']`; a `file`-tier write purges the versions it outranks **at its own key** (`file` > `mem` > `temp`), so a settings commit would silently reset the operator's exclusion pair (`guide §5.1`; `persistence.md` §9 P-3). `ASM-L2-1` records the re-grain and what it rejected (D-17, L1 §3).
- **A patch names one tier**: the four `file` members, **or** `exclusion`. A patch naming both is outside this domain, because it is two store writes and therefore two receipts or a landed-then-refused tear (`ASM-L2-5`).

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
  | (string & {})                                   // §3: the store's open escape arm, carried verbatim
export type OperatorSettingsReceipt =
  | { status: 'committed'; cursor: number; opId: string }
  | { status: 'refused'; reason: OperatorSettingsRefusalReason; message: string; address: OperatorSettingsAddress | null }
export type OperatorSettingsListener = (address: OperatorSettingsAddress) => void
export interface OperatorSettingsOptions { userDataDir: string; journalLength?: number }
export interface OperatorSettings {
  read(): OperatorSettingsRecord
  write(patch: OperatorSettingsPatch): OperatorSettingsReceipt
  subscribe(listener: OperatorSettingsListener): () => void   // answers the withdrawal
}
export function createOperatorSettings(options: OperatorSettingsOptions): OperatorSettings
```

- **Six package exports are called** — `storeCreate`, `read`, `write`, `listen`, `register`, `unlisten` — and `readLiteral`, `delete`, `rollback` and the four constraint members are **not** (L1 §2; D-12's posture unmoved, and `write`'s fourth position is left absent so its class-test arm is unreachable, `guide §3.3`). **`N = 10`** by D-14's convention — 6 called + 4 value names exposed (the factory and its product's three verbs) — matching `strata/modules.json:64`; the cap that follows is 150 (`platform.md` §4, A-4).
- **`read()` moves nothing and answers the record detached at every depth** (`guide §10`); a process that only reads writes no byte (L1 §5). It answers the **first-run default** over no file (`AddressNotFound`) and the **safe pair** over no `mem` version (`TierNotFound`) — both read arms, neither a refusal (§3; `behaviour.md` §1, §7). A **cleared member is written as its absence** — `token:null` and a `null` cap are the patch's clear markers and never stored values — because the package's walk refuses `null` and `undefined` anywhere in a value (`guide §10.1`, `§10.2`); `read()` maps absence back to `null`/`undefined` for the carrier's byte-identical `SecuritySettings` (L1 §4). **The cap's landed clear/refuse split is carried verbatim**: `null`, `NaN` and a non-positive value **clear** the cap, while `±Infinity` **refuses the patch** — the module answers `ValueRefusedAtBoundary` and no store verb runs (`src/main/security-store.ts:365-377`; `behaviour.md` §2, §4).
- **`write()` answers a receipt and never throws**, for any patch and any state (L1 §3). **`cursor` is the committed op's own `seq` and `opId` its own string, taken verbatim** (the declaration's `JournalOp`; `guide §6.4`): the module adds no offset and renumbers nothing, a fresh instance's first commit answers the smallest ordinal the store mints, and **no row pins that absolute figure** — the rows assert only that the ordinal is an integer and that consecutive commits differ by one (`ASM-L2-7`).
- **`enabled` is deduplicated first-occurrence-first, in the order the caller or the imported file supplied it**, a non-group string dropped: the landed rule carried as behaviour and never re-sorted into `VALID_GROUPS` order, so a caller writing `['data','read','dispatch']` is served exactly that (`src/main/security-store.ts:122,339`; D-11, D-15; A-5).

## 2.1 The construction act, the file, and the import-once path

`createOperatorSettings` is a **declared act with a declared disk effect**, not an invisible one, because the battery that drives it reads the disk (L1 §5; `persistence.md` §2).

- **The file is `<userDataDir>/provident-operator-settings.json`**, `userDataDir` being the module's only construction input besides the optional journal cap (§2). **The store's construction creates it exclusively, zero-length and empty** where it is absent, and **truncates nothing** where it stands (`guide §9.1`; D-13, ASM-L2-6). **Nothing else is created beside it** — no `.tmp`, no lock, no sidecar and no second written name, at construction or at any later write (`persistence.md` §5; D-16) — and **the boot is read-only**: construction, boot read, import and `attach` write **no byte** beyond the store's own exclusive create (§5; `persistence.md` §2).
- **The import reads `<userDataDir>/provident-security.json` at most once per profile** — at construction **iff** the instance's own file carries no record at `['operator-settings']` — and **never writes, renames, repairs or deletes** it: its bytes stand as seeded and the retired name is retired (D-19; L1 §5). Its six arms are the file absent, an object, unparsable, a non-object, a directory/unreadable, and `entries` not a plain object; the first two serve the first-run default and the imported record, the rest the first-run default without a throw (`behaviour.md` §3; `src/main/security-store.ts:112-142`).
- **A directory or name the store cannot occupy refuses the construction without throwing**: no instance stands, no file and no byte is created, `read()` answers the first-run default, and **every later `write` answers `FilePathUnreachable`** (`guide §8.2`; `behaviour.md` §4).

## 3. The receipt vocabulary, and the reason set that carries an escape arm

A refusal is a **value on this surface**: the store's own status verbatim as `reason`, the package's own generated sentence as `message`, and the package's fourth member as `address` (`guide §8`, `§6.5a`; the declaration's `StoreRefusal`, `D-77`). **The set is OPEN, and it must be**: the store's own `StoreStatus` ends in an **open `(string & {})` escape arm** whose declaration calls that arm *"load-bearing rather than loosness"* — the set has moved five times, and an immutably-enumerated union *"would mis-type a LAWFUL refusal the moment the set moves again"* (`index.d.ts` `StoreStatus`; `guide §8.1`). So this surface **carries any status the store crosses verbatim** under the escape arm and **narrows on three named spellings only**, which are the three its battery drives:

| `reason` | Rank | The one arm that produces it |
|---|---|---|
| `ValueRefusedAtBoundary` | 17 | the write carries a value the crossing refuses **before any store verb** — a function, a symbol, `undefined`, a cycle, a non-finite number, or a node past the two ceilings (`guide §10.1-§10.3`) |
| `FileCommitFailed` | 15 | a `file`-tier save cannot land; the store's journal rollback has already run, so the previous bytes stand (`guide §9.4`) |
| `FilePathUnreachable` | 13 | the store's construction refused, so no instance stands and each later write answers it (`guide §8.2`) |

- **`ContainerKindConflict` is NOT excluded — it is unnamed, and the earlier ground for excluding it was wrong.** It is reachable in principle whenever the boot leaves a container at a key whose kind a later whole-value write contradicts (`guide §4` arm `F-4`), and that boot arm is undeclared (`persistence.md` §9 P-1). It therefore rides the escape arm verbatim like every other unnamed status; what separates it from the three above is that **no row drives it**, which is a statement about this battery and not about the store (D-5, `ASM-L2-3`).
- **A caught value carrying no `status` is not a store refusal at all** (`guide §8.3`): the module contains it and answers `reason:'UnattributedFailure'` with the caught value's own message — a literal under the escape arm and not a store status — and **no row drives it**, because the one declared unattributed throw site is `write`'s `commit` position, which this module never supplies (`guide §3.3`).
- **`'write-failed'` and `'tier4-closed'` do not survive as write-outcome tokens** (D-16); `'tier4-closed'` survives only as the **carrier's read token** (§5). **A refusal leaves the record and the bytes exactly as they stood and mints no cursor** (L1 §3; `guide §9.4`).

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
  | { applied: true; state: ExclusionState }
  | { applied: false; state: ExclusionState; reason?: 'malformed-state' }
export interface SettingsSurface {
  read(): SettingsReadAnswer
  set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): SettingsSetAnswer
  transition(state: unknown): SettingsTransitionAnswer
  attach(sink: SettingsGateSink): void
}
export function createSettingsSurface(options: { userDataDir: string; journalLength?: number }): SettingsSurface
```

- **The composition site is `src/main/main.ts` and no other file**: it calls `createSettingsSurface` once, holds the product, and hands the live `ProvidentMcpServer` to `attach` (D-18; L1 §4 C-3). The **instance's** one construction is inside `src/main/settings-surface/`, which is the operator path's single reference to it (D-18; `ASM-L2-8`).
- **`read()`'s `read` member is `null` iff the answer was minted while `exclusion` is `'mcp-enabled'`**, and is the closed `{status:'refused', reason:'tier4-closed', message}` value iff it is `'mcp-disabled'`: one holder reading feeds both members, so the two can never carry two states (`src/main/main.ts:437-442`; D-16).
- **`attach` is the composition's second act and the only gate edge**: it re-patches the live gate from the record, applies the boot terminal `'mcp-enabled'`, and points the instance's one subscription at the sink — so **every later re-patch happens inside the listener**, never at a call site (D-17; L1 §4). `src/main/tier4-state.ts`'s holder is written from that same listener and at `attach`, and this module is its sole writer (L1 §3 ASM-4; exception §2 E-3; A-1).
- **`set` maps the landed patch to the record** — `groups` added, `disable` removed, deduplicated and filtered through the six-member set by the **instance** (so the second live copy of the group set stays in E-1's file, D-15) — then one `write` (L1 §3; §2).
- **`N = 12` (`operator-settings`) and `19` (`settings-surface`)** — **3** bridge routes with **both sides counted** (`IPC_SECURITY_GET`/`SET`/`EXCLUSION` × `get`/`set`/`setExclusion`) = 6, **5** value names exposed to `main.ts` (the factory, `read`, `set`, `transition`, `attach`), and **4** value names **consumed** from `operator-settings` — D-14 counts what a module exposes *or consumes*, and rev 1 counted one side only (`strata/modules.json` (the `operator-settings` and `settings-surface` rows); `platform.md` §4, A-4). The cap that follows is **200**; `operator-settings`' stays **150** (L1 §2).
- **`window.provident` gains no member**: the three routes and the two additive members stay as `src/main/preload.ts:42-75` declares them, so `preload.ts`'s only move is its `import type` source and `SecuritySettings` stays byte-identical (L1 §4; exception §2 E-2). Measured at this head the bridge carries **seven** top-level members — `ready`, `onRequest`, `sendReply`, `notify`, `security`, `module`, `store` (`src/main/preload.ts:42-75`; L1 §6 ISO-4).

## 5.1 The transition answer carries no receipt, and the refusal rides the `set` channel

**Resolved one way, and said out loud: `SettingsTransitionAnswer` gains no `write` member.** The bridge's own declaration is the ground — `setExclusion` is declared `Promise<{applied: boolean; state: EXCLUSION_STATE; reason?: 'malformed-state'}>` and the receipt member `write` is declared **only** on `set` (`src/main/preload.ts:63-64`) — so declaring a receipt on the transition would reshape a bridge answer that **E-2 does not licence** and would need `secure-panels.ts`'s `declare global` widened in lockstep (exception §2 E-2, §6; D-18).

- **The receipt of a transition is observed on the `set` channel and on the record**, never on the transition's own answer: `set(...).write` carries it, and `read().exclusion` carries the state the transition left (`behaviour.md` §10; §5).
- **`applied:false` with no `reason` is the store's answer, and it is distinguishable because it is the only one**: a well-formed two-literal `mem` write at a standing instance cannot refuse — the value is in the admitted domain and a `mem` save lands no `file` byte — so the only state producing `{applied:false, state}` with no `reason` is *no instance stands* (`FilePathUnreachable`; §2.1, §3; `guide §8.2`). `reason:'malformed-state'` stays reserved for the input arm (`src/main/main.ts:472-483`).

## 6. The routed question: do the five `data.*` routes answer while the `data` group is off?

**Settled: they answer, and the group does not gate them** — the gate is an MCP-only control and the renderer is not an agent (D-18, L1 §4). The measured mechanism, the five route spellings and the rejected gated arm are `behaviour.md` §9's `RQ-1` cell with `A-2`; nothing here restates them (D-1 §4).

## 7. Assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| `A-1` | this unit corrects **two** L1 figures: `ISO-4`'s bridge census is **seven**, and `src/main/tier4-state.ts`'s writer is `settings-surface` while the map claims that path for `operator-settings` | reading six, which no reader can produce from `src/main/preload.ts:43-74`, or a second flag home — the defect the leaf exists to close (L1 §3 ASM-4) |
| `A-2` | the five `data.*` routes answer while the group is off, and the group cannot withhold one (§6) | the gated arm, which needs a second group table and a second enforcement path (D-18) |
| `A-4` | `N` counts the names a module **exposes**, and types move no figure, so `unsubscribe` riding `subscribe`'s answer keeps `operator-settings` at 10 while `settings-surface` counts its consumed side at 15 | counting module-level exports alone (1 and 1, which measures nothing), or counting the three receipt type names, which sets a cap off type aliases (D-14) |
| `A-5` | `enabled` keeps the **caller's** order, first occurrence first (§2) | re-sorting into `VALID_GROUPS` order, which invents a state the operator never wrote and makes the record's order unreadable from the file |
| `ASM-L2-1` | the instance's two tiers stand at **two addresses** — `['operator-settings']` and `['operator-exclusion']` — and the module subscribes to both | one address, where a `file`-tier write purges the `mem` shadow at its key and a settings commit silently resets the operator's exclusion pair (`guide §5.1`) |
| `ASM-L2-2` | the exclusion pair and the tier-4 reading are `mem` rows that boot to the safe pair and are never persisted | a `file` row, which persists the gate's own state and lets a crash or a hand-edited file boot the app open (L1 §3 ASM-2) |
| `ASM-L2-3` | the reason set carries the store's **open escape arm** and this surface names only the three spellings its battery drives (§3) | a closed three-member union, which mis-types a lawful refusal the moment the store's set moves — its own declaration says so — and leaves `write` with no declared answer for any status outside it |
| `ASM-L2-4` | the transition channel's answer gains **no** member, so the receipt rides `set` and the state rides `read` (§5.1) | adding `write` to `setExclusion`'s resolution, which reshapes a bridge answer E-2 does not licence and half-widens the two `declare global` blocks (`src/main/preload.ts:63-64`) |
| `ASM-L2-5` | a patch naming members of both tiers is outside the domain and **no row asserts it** | a mixed patch answered as two writes, which is two receipts or a landed-then-refused tear (L1 §3) |
| `ASM-L2-6` | every subscriber's throw is **contained inside the module's own listener body** — the write still answers its receipt — and a throwing subscriber is then **withdrawn** | letting the throw cross (`guide §6.5a`), or keeping the subscriber registered and catching on every delivery, which leaves a body that fails on every change and whose failure nobody can attribute |
| `ASM-L2-7` | `cursor` is the op's own `seq`, verbatim, and **no row pins the absolute origin** it starts at (§2) | pinning the literal `1`, which is a figure the store mints and whose boot arms the store does not declare (`persistence.md` §9 P-1) |
| `ASM-L2-8` | the **surface** constructs the instance and holds the one reference; `main.ts` constructs only the surface (§5) | `main.ts` constructing the instance directly, which puts the state machine's file path in `app-shell`'s subtree and gives `operator-settings` a second construction site (D-18, `modules.md` §3) |

## 8. The integration battery's surface
Each row is one goal → one observable outcome, and the battery is **evidence**, so it does not count against the two harness caps of 150 and 200 (D-14, `platform.md` §4; exception §1). `instance.test.ts` carries the boot, the construction and import-once answers, the refusals, the subscription, the throw hazard, the exclusion pair and the two-profile row; `surface.test.ts` the carrier, the three channels, `attach`, the composition census and the declared-surface census; `isolation.test.ts` carries `ISO-1`..`ISO-6` and `RQ-1` (`behaviour.md` §1-§10; `examiner.md` §2). `ISO-1`..`ISO-6` are L1 §6's absences, driven over live surfaces and over the **import closure** of the files the MCP stack reaches, never inferred from a read of the subject's internals; `RQ-1` is §6's clause, driven over the gate's own predicates (D-18).
