# L3 — `store-tabs-record`: signatures

- **Layer:** L3 · **Unit:** `store-tabs-record` · **Branch:** `strata` (D-6) · **Rev:** 1 — every declared name and its
  exact text. **This is the transcription L4 copies** (D-45: a declaration block is kept only because `design.md` §1–§6
  says what each name is for).
- **Ceiling:** 150 lines, class max (D-1).

## 1. `src/shared/tabs-channels.ts`

```ts
export const IPC_TABS_READ = 'provident:tabs:read'
export const IPC_TABS_COMMIT = 'provident:tabs:commit'
export const IPC_TABS_CHANGED = 'provident:tabs:changed'
```

## 2. `src/main/tabs-record/index.ts` — the instance and its addresses

```ts
export interface TabsRecordOptions { readonly userDataDir: string }

export type TabsRecordRow = {
  readonly id: string
  readonly target: string
  readonly active: boolean
  readonly error?: string
  readonly label?: string
}

export interface TabsRecordAnswer {
  readonly status: 'committed' | 'refused'
  readonly reason?: string
  readonly message?: string
  readonly address?: readonly (string | number)[] | null
  readonly cursor?: number
  readonly repaired?: boolean
}

export interface TabsRecord {
  read(): { readonly status: 'committed'; readonly order: readonly string[]; readonly landing: string; readonly rows: readonly TabsRecordRow[] } | TabsRecordAnswer
  commit(row: TabsRecordRow): TabsRecordAnswer
  subscribe(handler: () => void): () => void
}

export const TABS_RECORD_FILE_NAME: string
export const TABS_RECORD_ADDRESS: readonly string[]
export const TABS_EXCLUSION_ADDRESS: readonly string[]
export const TABS_CONSTRAINT_ID: string
export function createTabsRecord(options: TabsRecordOptions): TabsRecord
```

## 3. `src/main/tabs-surface/index.ts` — the one reference

```ts
export interface TabsSurface {
  read(): Promise<TabsReadAnswer>
  commit(row: unknown): Promise<TabsRecordAnswer>
  attach(): void
  detach(): void
}

export type TabsReadAnswer =
  | { readonly status: 'committed'; readonly order: readonly string[]; readonly landing: string; readonly rows: readonly TabsRecordRow[] }
  | { readonly status: 'refused'; readonly reason: string; readonly message: string; readonly address: readonly (string | number)[] | null }

export function createTabsSurface(options: { readonly userDataDir: string; readonly onChanged: (handler: () => void) => () => void }): TabsSurface
```

**`commit(row: unknown)` takes `unknown` on purpose**: the shape arm is the surface's first act, and a typed parameter would
move that check into the type system where the renderer's boundary cannot reach it (L2 §3).

## 4. The bridge member — `src/main/preload.ts` and its `renderer.ts` copy

```ts
tabs: {
  read(): Promise<TabsReadAnswer>
  commit(row: TabsRecordRow): Promise<TabsRecordAnswer>
  onChanged(handler: () => void): () => void
}
```

The declaration and the implementation are the same text in both files (the lockstep rule the `store`/`set` pair already
follows): `preload.ts` declares it beside `store`, and `renderer.ts`'s `declare global` widens `window.provident` by it.

## 5. The refusal vocabulary, as text

| Site | `reason` | Exact `message` |
|---|---|---|
| shape arm | `'malformed-row'` | `'the commit carries no tab id, or no plain record'` |
| store arm | the instance's status verbatim | the instance's own sentence |
| construction | `'FilePathUnreachable'` | `'the tab record could not stand, so no tab can be read or committed'` |

## 6. What L4 must not transcribe

No `delete`, no `journal`, no second construction site, no renderer import (design.md §3, §6). A name in this file that L4
finds inconvenient is a design finding routed to L3, never a local invention.
