# L3 — `store-tabs-record`: signatures

- **Layer:** L3 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 4 — every declared name and its exact text, transcribing `design.md` rev 11, **regenerated from the landed modules** on 2026-11-02 and **checked** against them by `tests/unit/store-tabs-record/signatures.test.ts` (D-45), which pins that rev.
- **Ceiling:** 150 lines, class max (D-1). `guide §n` is `node_modules/provident-storeroom/README.guide.md`.

## 1. `src/shared/tabs-channels.ts` — the four channel names

```ts
export const IPC_TABS_READ = 'provident:tabs:read'
export const IPC_TABS_COMMIT = 'provident:tabs:commit'
export const IPC_TABS_REMOVE = 'provident:tabs:remove'
export const IPC_TABS_CHANGED = 'provident:tabs:changed'
```

## 2. `src/main/tabs-record/index.ts` — the record over the app's one store

```ts
// the module's own private alias, spelled here because it is not exported: type Store = ReturnType<typeof storeCreate>
export type TabsRecordStore = Store

export interface TabsRecordRow {
  readonly id: string
  readonly target: string
  readonly active: boolean
  readonly error?: string
  readonly label?: string
  readonly lastActiveAt?: string
}

export interface TabsRecordAnswer {
  readonly status: 'committed' | 'refused'
  readonly reason?: string
  readonly message?: string
  readonly address?: readonly (string | number)[] | null
  readonly repaired?: boolean
}

export interface TabsRecordReading {
  readonly status: 'committed'
  readonly order: readonly string[]
  readonly landing: string
  readonly rows: readonly TabsRecordRow[]
}

export interface TabsRecordOptions {
  readonly store: ReturnType<typeof storeCreate>
}

export interface TabsRecord {
  read(): TabsRecordReading | TabsRecordAnswer
  commit(row: TabsRecordRow): TabsRecordAnswer
  remove(id: string): TabsRecordAnswer
  subscribe(handler: () => void): () => void
}

export interface TabsRepairCredited {
  readonly ok: true
  readonly op: unknown
}

export interface TabsRepairFailed {
  readonly ok: false
  readonly message: string
}

export type TabsRepairAnswer = TabsRepairCredited | TabsRepairFailed

export type TabsRepair = (context: unknown) => TabsRepairAnswer
export interface TabsCommitCarrier {
  readonly pending: readonly TriggerPair[]
}

export type TabsConstraintAnswer =
  | true
  | { readonly message: string; readonly repair: TabsRepair }
  | { readonly message: string; readonly repair?: never }

export interface TabsConstraintDeclaration {
  readonly address: readonly string[]
  readonly id: string
  readonly constraint: (context: unknown) => TabsConstraintAnswer
}

export const TABS_RECORD_ADDRESS: readonly string[]
export const TABS_ORDER_ADDRESS: readonly string[]
export const TABS_LANDING_ADDRESS: readonly string[]
export const TABS_CONSTRAINT_ID: string
export const TABS_LANDING_ID: string
export const TABS_MUST_STAND_ID: string
export const MALFORMED_ROW_MESSAGE: string
export const SEAT_NAME_REASON: string
export const SEAT_NAME_MESSAGE: string

export const isCommitCarrier: (value: unknown) => value is TabsCommitCarrier
export const writeJoined: (store: TabsRecordStore, commit: TabsCommitCarrier, value: unknown) => unknown
export function tabsConstraintDeclarations(getStore: () => TabsRecordStore | null): readonly TabsConstraintDeclaration[]
export function tabsDeclaredRoots(): readonly { readonly address: readonly string[]; readonly tier: 'file' }[]
export function createTabsRecord(options: TabsRecordOptions): TabsRecord
```

The three address constants are `['tabs']`, `['tabs', 'order']` and `['tabs', 'landing']` — **the last the landing ENTRY's own leaf (`['tabs', TABS_LANDING_ID]`, whose id is `'landing'`), not a seat** (design §2, D-76); the exported ids are `'exactly-one-active'` and `'tabs-must-stand'`, and the batch adds
`'order-names-its-tabs'`, `'tab-has-title'`, `'tab-has-content'` and `'tab-has-lastActiveAt'` as literals — **six** declarations in all (design §4, D-83), of which this block declares the two exported ids. **The batch's ORDER is part of the contract**: `tabs-must-stand` and then `order-names-its-tabs` are the two bodies the boot's unbound holder cannot silence, so they are the two that act at the store's creation.

## 3. `src/main/tabs-surface/index.ts` — the one reference

```ts
export type TabsReadAnswer =
  | { readonly status: 'committed'; readonly order: readonly string[]; readonly landing: string; readonly rows: readonly TabsRecordRow[] }
  | { readonly status: 'refused'; readonly reason: string; readonly message: string; readonly address: readonly (string | number)[] | null }

export interface TabsSurface {
  read(): TabsReadAnswer
  commit(row: unknown): TabsRecordAnswer
  remove(id: unknown): TabsRecordAnswer
  attach(): void
  detach(): void
}

export interface TabsSurfaceOptions {
  readonly store: TabsRecordStore
  readonly onChanged?: () => void
}

export function createTabsSurface(options: TabsSurfaceOptions): TabsSurface
```

**`commit(row: unknown)` and `remove(id: unknown)` take `unknown` on purpose**: the shape arm is the surface's first act, and a typed parameter would move that check into the type system where the renderer's boundary cannot reach it (L2 §3).

## 4. The bridge member — cited, never copied (D-45 arm (i))

The `tabs` member of `window.provident` is declared in `src/main/preload.ts`'s `ProvidentBridge` and copied verbatim in
`src/renderer/secure-panels.ts`'s `declare global` widening; it carries **four** routes — `read()`, `commit(row)`, `remove(id)`
and `onChanged(handler)`. This document names the sites instead of copying the block: each answer is a five-line inline generic type, and a third spelling here would be one more surface to drift (D-45, D-63).

## 5. The refusal vocabulary, as text

| Site | `reason` | Exact `message` |
|---|---|---|
| shape arm, `commit` | `'malformed-row'` | `MALFORMED_ROW_MESSAGE` — `'the commit carries no tab id, or no plain record'` |
| shape arm, the surface's `remove` | `'malformed-row'` | `'the removal names no tab id'` |
| seat arm, `commit` and `remove` | `SEAT_NAME_REASON` — `'seat-name'` | `SEAT_NAME_MESSAGE` — `"the tab id spells the record's own 'order' seat, and a member and a seat are one name in this family"` |
| store arm | the instance's status verbatim | the instance's own sentence |

**There is no construction arm.** Measured 2026-11-02, `grep -rn 'FilePathUnreachable' src/main/tabs-record/ src/main/tabs-surface/`
is empty: D-64/D-65 hand this module a store the boot already constructed, and a root the existence pair has created (design §2). **The sixth constraint's sentence —
`"the tab record's 'order' seat carries no sequence of its own tabs, once each"` — is a REFUSAL a caller reads at the store's creation and never at a route**, so it is not in the table above and it mints no `reason` (L2 §3, D-83).

## 6. What L4 must not transcribe

No `journal`, no second construction site and no renderer import (design §3, §6) — and no `FilePathUnreachable` arm: the nullable-instance shape is `settings-surface`'s and is not repeated here. A name L4 finds inconvenient is a design finding routed to L3, never a local invention.
