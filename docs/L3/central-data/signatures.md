# L3 — `central-data`: the signatures

- **Layer:** L3 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 4 — §1's `DataSurfaceOptions.store` becomes REQUIRED and §2's `StorePort.construct()` is **replaced** by `StorePort.store()`, which returns the caller's instance and has no refusal arm: nothing in this module builds a store, so the arm that could answer one was deleted with it (D-80); Rev 3 — rev 3 names the seam's `DEFAULT_JOURNAL_LENGTH`, its header comment and its census block as **sites** rather than offsets, because that file grew a line and every cite into it was one early (D-41) · **Ceiling:** 150 lines, class max (D-1)
- **Inputs:** `docs/L2/central-data/interface.md` §1-§8, `behaviour.md` §1-§10 (**§5 and §9 as revised: two unreachability arms, `ASM-L2-7`**), `persistence.md` §1-§9 (rev 2); `strata/decisions.md` D-11/D-12/D-13/D-14; `node_modules/provident-storeroom/index.d.ts` and `README.guide.md`, read and never edited (D-5)
- **Status:** DESIGN — stubs only. Every line below is a declaration and never a body; §1 is `interface.md` §2's surface restated so the unit battery can import it before any implementation exists, and **rev 2 moves nothing in §1** (D-1 §4)
- **Rev 1 → rev 2, stated in as many words:** `StorePort.open()` is **replaced** by `StorePort.probe()`, a new `ProfileReading` type and a `readProfile` function appear beside it, `mapper.probeOutcome` is **renamed** `readOutcome`, and `mapper.unreachableLedger()` is added — because the reading of `design.md` §2 must answer *whether the profile's one name can be occupied at all* before any store instance, which `open()`'s cold/ready/unreachable triple could not express (`behaviour.md` §5, §9; `ASM-L2-7`; D-11, D-13)
- **Companion:** `design.md` carries the structure, the reachability reading, the operations' pseudocode, the twelve guardrails and this design's two assumptions (ASM-L3-U1/U2)

## 1. The declared surface — `src/main/data/index.ts`

`index.ts` exports exactly this and nothing else to `src/main/mcp-server.ts`, and no line here is new or moved at rev 2 — it is `interface.md` §2, restated as a stub (`interface.md` §2; D-11, D-14):

```ts
export type DataPath = readonly (string | number)[]
export type DataTier = 'file' | 'mem' | 'temp'
export type DataLedger = { status: 'refused'; reason: DataRefusalReason; message: string; floor?: number; through?: number; storeStatus?: string; path?: DataPath }
export type DataRefusalReason =
  | 'malformed-arguments' | 'root-not-writable' | 'volatile-path' | 'cursor-unknown' | 'store-unreachable'
  | 'address-malformed' | 'parent-absent' | 'container-kind-conflict' | 'value-not-admitted' | 'write-failed'
  | 'store-refused'
export type DataReadAnswer =
  | { status: 'read'; kind: 'row' | 'branch'; path: DataPath; value: unknown }
  | { status: 'absent'; path: DataPath }
  | DataLedger
export type DataWriteAnswer = { status: 'committed'; path: DataPath; cursor: number } | DataLedger
export type DataDeleteAnswer =
  | { status: 'committed'; path: DataPath; removed: boolean; tiers: readonly DataTier[]; cursor: number | null }
  | DataLedger
export type DataListAnswer = { status: 'read'; prefix: DataPath | null; paths: readonly DataPath[]; count: number } | DataLedger
export interface DataJournalEntry { cursor: number; kind: 'write' | 'delete'; path: DataPath; changedTo: 'present' | 'absent' }
export type DataJournalAnswer =
  | { status: 'read'; from: number; through: number; floor: number; entries: readonly DataJournalEntry[]; count: number }
  | DataLedger
export interface DataSurfaceOptions {
  /** The directory the READING names; the FILE's name is this module's own choice (D-13). */
  profileDir: string
  journalLength?: number   // this module's own change window; the store's journal was fixed at its creation
  store: ProfileStore      // REQUIRED: the boot's instance, and the only one (D-79, D-80)
}
export interface DataSurface {
  read(args: unknown): DataReadAnswer
  write(args: unknown): DataWriteAnswer
  delete(args: unknown): DataDeleteAnswer
  list(args: unknown): DataListAnswer
  journal(args: unknown): DataJournalAnswer
}
export type DataToolName =
  | 'provident.data.read' | 'provident.data.write' | 'provident.data.delete'
  | 'provident.data.list' | 'provident.data.journal'
export declare const DATA_TOOL_NAMES: readonly DataToolName[]
export declare function createDataSurface(options: DataSurfaceOptions): DataSurface
```

`DATA_TOOL_NAMES` is the five names in `interface.md` §1's declared order and is the only member of this surface that is a value (`interface.md` §1, §2). `journalLength` defaults to the seam's `DEFAULT_JOURNAL_LENGTH` (`4096`) and bounds this module's own window (the `DEFAULT_JOURNAL_LENGTH` export of `src/main/storeroom.ts`, named as a site and never an offset — D-41; D-12).

## 2. The module's private files — not imported by the battery

`src/main/data/` is seven files and only `index.ts` leaves the module; these stubs fix the seams between them (`design.md` §1; D-14):

```ts
// ---- types.ts: §1's declarations and the DATA_TOOL_NAMES value, in one home ----

// ---- args.ts ----
export type Parsed<T> = { ok: true; value: T } | { ok: false; ledger: DataLedger }
export function parseRead(args: unknown): Parsed<{ path: DataPath }>
export function parseWrite(args: unknown): Parsed<{ path: DataPath; value: unknown }>
export function parseDelete(args: unknown): Parsed<{ path: DataPath }>
export function parseList(args: unknown): Parsed<{ prefix: DataPath | null }>
export function parseJournal(args: unknown): Parsed<{ from: number }>
export function isVolatile(path: DataPath): boolean            // 'mem.' | 'temp.' | 'secure.' (D-13)
export function pathText(path: DataPath): string               // the sort key: JSON.stringify(path) (ASM-L2-2)

// ---- store.ts ----
export const PROFILE_FILE_NAME = 'provident-profile.json'      // persistence.md §1; D-13
export type ProfileStore = ReturnType<typeof createProfileStore>   // no package type spelled (D-5)
export type ProfileReading =                                   // design.md §2: THE reading, one word
  | { kind: 'occupied' } | { kind: 'absent' }                  // can be occupied: the name stands / does not yet
  | { kind: 'unreachable'; ledger: DataLedger }                // cannot be occupied: all five answer the ledger
export function readProfile(profileDir: string): ProfileReading    // probes only: creates nothing, throws nothing
export type StorePort = {
  probe(): ProfileReading                                     // taken first, at the top of every operation (§2)
  store(): ProfileStore                                       // the caller's instance, returned as handed in (D-80)
}
export function createStorePort(options: DataSurfaceOptions): StorePort

// ---- mapper.ts ----
export function readOutcome(caught: unknown): { kind: 'branch' } | { kind: 'absent' } | { kind: 'ledger'; ledger: DataLedger }
export function refusalLedger(caught: unknown, path?: DataPath): DataLedger
export function unreachableLedger(): DataLedger                // the reading's refusal: no store, no storeStatus
export function sentence(reason: DataRefusalReason): string     // the fixed module sentences (interface.md §3)

// ---- journal.ts ----
export type ChangeJournal = {
  append(kind: 'write' | 'delete', path: DataPath, changedTo: 'present' | 'absent'): number
  window(from: number):
    | { ok: true; from: number; floor: number; through: number; entries: readonly DataJournalEntry[] }
    | { ok: false; floor: number; through: number }
}
export function createJournal(length: unknown): ChangeJournal

// ---- surface.ts ----
export function createDataSurface(options: DataSurfaceOptions): DataSurface
```

`readOutcome` (rev 1's `probeOutcome`) classifies a caught **store read** refusal and the operation composes the answer: `branch` means the caller then reads the branch, `absent` means the absent answer or the empty receipt, `ledger` means the mapped refusal (`design.md` §3; `guide §4`). The name moves because `probe` now means the reachability reading, which is not a store call and has no store status. `readProfile` is the reading itself, owned by `store.ts`, and **`createStorePort` memoises nothing**: `probe()` re-runs `readProfile(options.profileDir)` on **every** call, so the reading is fresh each time an operation takes it — which is what lets a profile name removed between two operations answer the cold tier again — and `store()` is `options.store`, the instance the caller handed in, with no arm that builds, copies or re-points one (`design.md` §2; `behaviour.md` §9; D-80). `unreachableLedger()` is the single ledger **form** all five operations answer on the `unreachable` arm, minted fresh per refusal so no answer aliases it (G10).

## 3. The store-status mapping — the eleven reason words are closed

Each store status this module can meet, and the one word it answers with (`interface.md` §2, §3; `guide §8.1`; D-5, D-11):

| store status | arm | reason word |
|---|---|---|
| `AddressMalformed` | any verb, where the guard already passed (a residue, not a route) | `address-malformed` |
| `AddressNotFound`, `LeafHasNoDownstream` | `write` — the parent does not stand | `parent-absent` |
| `AddressNotFound`, `LeafHasNoDownstream` | the `read`/`list` probe — no refusal reaches the caller | the `absent` answer or no rows |
| `AddressNotFound`, `LeafHasNoDownstream` | the `delete` probe — no refusal reaches the caller | the empty receipt (`behaviour.md` §6) |
| `ReadTargetIsBranch` | the `read`/`list` probe | the `branch` answer (`interface.md` §2) |
| `ReadTargetIsBranch` | the `delete` probe | the empty receipt (ASM-L2-6) |
| `ContainerKindConflict`, `WriteParentNotLink` | `write` | `container-kind-conflict` |
| `ValueRefusedAtBoundary`, `ValueNotAdmitted` | `write` — the package's walk, before any verb | `value-not-admitted` (`guide §10`) |
| `FileCommitFailed` | `write`, `delete` — the store's rollback has already run | `write-failed` (`guide §9.4`) |
| `FilePathUnreachable`, `ConstructionArgumentMissing` | **no site of this module's since D-80** — both are construction-time statuses and this module constructs nothing; the rows stay so that an instance which ever surfaces one is named rather than escaped to `store-refused` | `store-unreachable` (`guide §8.2`) |
| no store status at all — the reading's `unreachable` arm | `probe()`, before any instance: `ENOTDIR`/`EACCES`/`ELOOP` at the name, a directory or dangling symlink at it, or an unwritable parent | `store-unreachable`, `storeStatus` absent, the fixed module sentence (`unreachableLedger()`; `design.md` §2) |
| `TierNotFound`, `OutOfDomainTier`, `ParentAnchorMonotonicityViolation`, `JournalOpUnknown`, `RollbackCompacted`, `ConstraintListInvalid`, `ConstraintBodyThrew`, `ConstraintRefusedAtRegistration`, `ConstraintPassRefused`, and any escape-arm string | any verb | `store-refused`, carrying the status verbatim in `storeStatus` |
| a thrown value carrying no string `status` (the declared class-test `TypeError`, `guide §8.3`) | any verb | `store-refused`, with `storeStatus` absent and a fixed module sentence |

Every arm carries `message`: the store's own generated sentence where the store refused, a fixed module sentence otherwise; `floor` and `through` ride the `cursor-unknown` arm alone (`interface.md` §3; D-12).

## 4. Every answer an operation can return

The battery's rows are written against this closed set, and every operation's refusal set carries `store-unreachable` because the reading of `design.md` §2 precedes every store (`interface.md` §2, §3; `behaviour.md` §1-§6, §9; D-11). **Each of the five also ends in G1's last-resort `refusalLedger` arm**, so a thrown value that reaches this module's own `catch` answers `store-refused` (status-less class) from any operation, `journal` included, even where no store was consulted — the arm no row drives (`design.md` §4 G1, G8; `mapper.ts`'s `refusalLedger`):

| Operation | The answer statuses, and nothing else |
|---|---|
| `read` | `read`/`row`, `read`/`branch`, `absent`; ledgers: `malformed-arguments`, `volatile-path`, `address-malformed`, `store-unreachable`, `store-refused` |
| `write` | `committed` with the minted `cursor`; ledgers: `malformed-arguments`, `root-not-writable`, `volatile-path`, `store-unreachable`, `parent-absent`, `container-kind-conflict`, `value-not-admitted`, `write-failed`, `address-malformed`, `store-refused` |
| `delete` | `committed` with `removed:true` and a cursor, or `removed:false` with `tiers:[]` and `cursor:null`; ledgers: `malformed-arguments`, `root-not-writable`, `volatile-path`, `store-unreachable`, `address-malformed`, `write-failed`, `store-refused` |
| `list` | `read` with `prefix`, `paths`, `count`; ledgers: `malformed-arguments`, `address-malformed`, `store-unreachable`, `store-refused` |
| `journal` | `read` with `from`, `through`, `floor`, `entries`, `count`; ledgers: `malformed-arguments`, `cursor-unknown`, `store-unreachable` (`behaviour.md` §9) |

## 5. Assumptions this design makes, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L3-1 | `list` and `journal` never answer `volatile-path`: `list.prefix` is not narrowed, and `list` answers whatever rows stand — none, since nothing volatile was ever written (D-13) | refusing a volatile `prefix`, which narrows a tool `interface.md` §1 declares as answering rows, i.e. an L2 change made at L3 |
| ASM-L3-2 | the reading precedes the store instance and answers `unreachable` for all five tools where the profile's one name cannot be occupied, while an absent name stays the cold tier with the instance never consulted — and no operation of this module constructs one either way (D-80; `behaviour.md` §5, §9; `design.md` §2, §6 ASM-L3-U1/U2) | constructing on every operation, so a read-only profile pays the exclusive file create (`guide §9.1`, against `persistence.md` §1's no-filesystem-act) and `journal` would answer a window where the profile can never be built |
| ASM-L3-3 | the seam gains one optional `filePath` on `ProfileStoreOptions`, and `src/main/data/` imports `createProfileStore` and never the package (D-5) | a second import of `provident-storeroom` under `src/main/data/`, which breaks the seam's declared purpose and its pinned census (the seam's header comment and its census block in `src/main/storeroom.ts`, named as sites and never offsets — D-41) |
| ASM-L3-4 | `journalLength` is honoured only where it is a positive safe integer; otherwise the seam's `DEFAULT_JOURNAL_LENGTH` stands — it bounds THIS module's window and no longer sizes anything a construction would throw on (D-80; the `DEFAULT_JOURNAL_LENGTH` export of `src/main/storeroom.ts`; D-12) | passing a hostile figure through, which would make a construction throw — a shape that no longer exists here, the option reaching nothing but `createJournal` |
| ASM-L3-5 | a thrown value with no string `status` answers `store-refused` with `storeStatus` absent (`guide §8.3`) | a twelfth reason word for the status-less class test, which widens `interface.md` §2's closed vocabulary |
