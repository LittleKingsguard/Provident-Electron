# L2 — `central-data`: the interface

- **Layer:** L2 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 2 · **Status:** DESIGN — `docs/L1/central-data-management.md` rev 2 and its census exception rev 2 are the inputs; the integration battery is filed against this file and and `src/main/data/` **exists**; the battery's own reading is `strata/brief.md` §6's instrument and is not restated here (D-1 §4, D-26)
- **Inputs:** L1 rev 2 §3/§4/§8; `docs/L1/central-data-census-exception.md` §1/§2/§5/§7 (E-1, E-2, E-3; N = 15); D-5, D-11, D-12, D-13, D-14, D-15; the `central-data` row of `strata/modules.json` (`endpoints: 15`); `strata/platform.md` §4; the tree at `57c5825`
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`, the package's shipped consumer guide, and `the declaration` is its `index.d.ts`; both are read and never edited (D-5)

## 0. Scope

This document fixes this module's I/O surface and its expected behaviour, and never its internals (§3's L2 row). Structure, private helpers and file layout beneath `src/main/data/` are L3's. The cross-module seams fixed here are the ones only this layer sees: the gate's sixth group, the five registrations, the `RpcMethod` union, and the adapter the registration calls (D-11).

## 1. The five tools: declared arguments

`DataPath` is the store's own address shape — a **dense** array whose every element is a `string` key or a **non-negative safe integer** index (`the declaration`, `Address`). A dotted string is not a path: `'a.b'` is one key that happens to carry a dot (guide §4, rule 2).

| Tool | Declared members | `arguments` omitted |
|---|---|---|
| `provident.data.read` | `{ path: DataPath }` | refused `malformed-arguments` (D-11) |
| `provident.data.write` | `{ path: DataPath, value: unknown }` | refused `malformed-arguments` (D-11) |
| `provident.data.delete` | `{ path: DataPath }` | refused `malformed-arguments` (D-11) |
| `provident.data.list` | `{ prefix?: DataPath }` | the same call as `{}`, the whole profile (D-11) |
| `provident.data.journal` | `{ cursor?: number }` | the same call as `{}`, the whole retained window (D-11) |

- An own enumerable key outside a tool's declared set is refused **by name**, never ignored: each registration declares its members with `.passthrough()`, so a malformed call reaches the adapter instead of being silently stripped before it, and each member is `z.unknown()` behind `z.preprocess((carried) => carried ?? {}, …)`, so a wrong-typed member arrives as a value the adapter refuses rather than as a protocol error (`src/main/mcp-server.ts:1010-1039`; D-11).
- A `path` outside the domain — sparse, a negative or fractional index, an index above `2^53 − 1` — answers `malformed-arguments` naming the member; the empty string `''` is a legal key (guide §4, rules 1-5; D-11).
- The **empty path `[]`** is in domain for `read` (the whole register, answered as a branch) and for `list.prefix` (no narrowing), and is refused `root-not-writable` for `write` and `delete`: a one-call write or wipe of the whole profile is the destructive act D-12 leaves with no reversal (D-12). On a profile whose file does not yet exist, `read { path: [] }` answers `kind:'branch'` with `value:{}` — the store's own fresh register reading — and constructs nothing (guide §4; D-13).
- **A volatile spelling is refused**: a path whose first segment begins `mem.`, `temp.` or `secure.` answers `volatile-path` and moves no byte — except on `list` and `journal`, whose argument is a read filter rather than a written path (`docs/L3/central-data/signatures.md` §4, ASM-L3-1). The store's tiers are `file`, `mem`, `temp`; this module's surface is the durable profile, and a silently dropped volatile row is exactly what the retired projection did — that projection is gone from `src/main/main.ts`, which now stamps no `schemaVersion` and carries no second store (D-13).
- **`write` takes exactly one path/value pair.** L1 §3's "one or more" is narrowed to one here: the store's durability unit is one `file`-tier write, so a second pair would be a second durable commit and a refusal at pair *k* would leave pairs `1…k−1` landed — the tear the receipt of D-11 forbids. `ASM-L2-1` records the rejected alternative (§8).

## 2. The declared surface, and every answer shape

`src/main/data/index.ts` exports exactly this much and nothing else to `src/main/mcp-server.ts`; the registration adapter is declared here and is never invented at L4 (D-11, D-14).

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
  /** The app's profile directory; the FILE's name is this module's own choice (D-13). */
  profileDir: string
  journalLength?: number
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
export const DATA_TOOL_NAMES: readonly DataToolName[]
/** Constructs no store and touches no file; the store is built at the first operation that needs it (D-13). */
export function createDataSurface(options: DataSurfaceOptions): DataSurface
```

- **The declared surface is `N = 15`**: 5 tools + 5 routes + 5 `provident-storeroom` exports called — `storeCreate`, `read`, `readLiteral`, `write`, `delete` — so the harness cap is `50 + 10×15 = 200`; `register` has no call site and is **not** on the called set (the `central-data` row of `strata/modules.json`, `endpoints: 15`; exception §1; D-14, `platform.md` §4).
- The answer types stay in `src/main/data/`: no renderer sees them, so `src/shared/types.ts` gains the five union strings and nothing else (D-15's E-1 row). `journalLength` defaults to the seam's `DEFAULT_JOURNAL_LENGTH` (`4096`) and bounds this module's own change window (`src/main/storeroom.ts:53`; D-12).

## 3. The receipt vocabulary — closed, and a value

Every answer is one of the statuses `committed`, `read`, `absent`, `refused`; no fifth, and no answer is a throw (D-11).

| Status | Meaning | Members |
|---|---|---|
| `committed` | a write or a delete landed through the store | `path`, plus `cursor` (write) or `removed` + `tiers` + `cursor` (delete) (D-11) |
| `read` | a reading answered | `kind` + `value`, or `prefix` + `paths` + `count`, or the journal's window (D-11) |
| `absent` | **absence answered explicitly** — nothing stands at the path, and this is never an empty success | `path` (D-11) |
| `refused` | the closed ledger of §2's eleven reason words, each carrying its own `message` | `reason`, `message`, optional `path`, and `floor` + `through` on the `cursor-unknown` arm alone (D-11, D-12) |

- `message` is always present on every arm: the store's own generated sentence where the store refused, a fixed module sentence otherwise; it never replaces `reason` (D-11).
- **The window bounds ride the `cursor-unknown` arm alone**: `floor` and `through` are present there, both numbers, so a caller re-anchors, and they are absent on every other refusal — they are declared optional on `DataLedger` so the answer `behaviour.md` §6 promises is expressible without a cast, and `reason` is never replaced by them (`behaviour.md` §6; D-12).
- `store-refused` is the escape arm for a store status outside the mapped set, and it carries that status verbatim in `storeStatus`: an unknown status is never read as success (`node_modules/provident-storeroom/README.md`, "The status set is TWENTY, and open by design"; D-5).
- `exclusion-closed` is **not** in this vocabulary: it is produced at the invocation turn, before the adapter runs, in the same `{status, reason, message}` form (§4; D-11).

## 4. The group's posture

- `ToolGroup` gains `'data'`; the five names are added to `TOOL_GROUPS` as exact rows (the prefix rule covers `module:` only); `VALID_GROUPS` becomes six in **both** live copies (`src/main/security.ts:3,5-50,159` and `VALID_GROUPS` and `admitGroups` in `src/main/operator-settings/index.ts`, which is where the second copy re-homed when `src/main/security-store.ts` was deleted — D-16) — a census move and no behaviour (D-11, D-15, exception §2).
- **OFF by default**: `defaultSecurityConfig()` stays `['read','dispatch']`, eight names, so a fresh profile lists no `data` tool at all; a disabled group's tools are **absent from `tools/list`, not present-and-refusing**, because registration is driven by `allowedToolNames()`, so an unregistered tool cannot answer anything (`src/main/security.ts:86-88`; `src/main/mcp-server.ts:603-615,832-1040`; D-11).
- With `data` enabled the listed set is **13**; `ALL_TOOLS` 22 → 27; `ALL_RESOURCES` stays 3 — the group is tools only, with no `mcp://provident/data/…` mirror (L1 rev 2 §3; D-11).

## 5. The five bridge routes, answered in main

- `RpcMethod` gains `data.read`, `data.write`, `data.delete`, `data.list`, `data.journal` — 22 → 27 — and each is answered **in main** by the `DataSurface` operation of the same name: one answer site for both the tool call and the route (`src/shared/types.ts:259-286`; D-11, D-15).
- **The group's posture does not reach a route, and the tree has yet to carry the answer.** A `data.*` route answers while `data` is OFF as well: the group governs which MCP tool names are registered and therefore absent from `tools/list`, and it says nothing about the bridge's own vocabulary — the rejected alternative, gating the routes by the group too, would make a route the renderer's contract declares vanish whenever an operator narrows a grant, which is a power no clause of D-11 gives an MCP group (D-11; ASM-9). **Unlanded at this head, so the clause above is design and is not measured:** no answer site for the five routes exists — the renderer's method switch has no `data.*` arm and its default throws `unknown method` (`src/renderer/renderer.ts:961-1033`), and the IPC handler registrations in `main()` (`src/main/main.ts`) cover no such route (D-11, D-15).
- No renderer method-switch arm is added, so `MUTATING_METHODS` stays at its seven, and `window.provident` gains no member: the routes are vocabulary and record, not a new bridge surface (`src/renderer/renderer.ts:829`; `src/main/preload.ts:42-75`; D-11, L1 rev 2 §4 ASM-9).
- The registrations obtain their adapter through **one new optional option, `McpServerOptions.dataSurface?: DataSurface`**, exactly as the `module.*` handlers receive `moduleStore` (`src/main/mcp-server.ts:392-404,813-820`; D-11).
- That option is supplied by the composition site's existing one-line options pass — `new ProvidentMcpServer({ …, dataSurface: createDataSurface({ profileDir: app.getPath('userData') }) })` at the `new ProvidentMcpServer({ …, dataSurface: createDataSurface({ profileDir: app.getPath('userData') }) })` composition line in `src/main/main.ts` — and **that line is licensed by the census exception's E-3**: one import line plus that one options member, written by `central-data`'s L4 in the same one shot, with no other line of `main.ts` moving, and it is not a census row (`docs/L1/central-data-census-exception.md` §2 E-3; D-11, D-13).
- Until it lands, a server constructed without a surface registers **no** `data` tool even with the group enabled: the five names are enumerated in `ALL_TOOLS` and unregistered, which is the count-moved-without-its-row finding D-11 forbids. The live composition must supply the surface (D-11).

## 6. The discipline: a refusal is a value, and the previous bytes stay

- No data operation throws for any argument and any state: every failure is a `refused` ledger returned to the caller (D-11).
- A refusal leaves the profile's bytes exactly as they stood: a write that the store refuses is a store rollback, not a partial landing (guide §9.4; D-11).
- The exclusion tier is answered by the landed wrapper, so a data call made while the tier is open receives the refusal value and the adapter is never entered; and nothing on this surface reverses, replays or repairs: `rollback` is not called, no constraint is registered and no listener is registered (§4; D-11, D-12).

## 7. No rendered surface

This module renders nothing and changes no rendered surface: its five tools answer values, add no graph node and emit no notification, so `provident.dispatch`, `get_rendered_html` and `get_markdown` are unmoved (D-11; L1 rev 2 §3).

## 8. Assumptions

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L2-1 | `data.write` takes exactly one path/value pair (D-11's atomic receipt) | a pair set committing per pair, which makes "a refusal leaves the previous bytes intact" false from pair 2 onward |
| ASM-L2-2 | `list` answers the paths that hold a **row**, sorted by the path's JSON text (D-11) | every node path including branches, which no caller can act on and which `read` already derives |
| ASM-L2-3 | the journal window is this process's own (4096), and a foreign cursor answers `cursor-unknown` | a cursor persisted beside the store's file, which would be a second written name (D-13) |
| ASM-L2-4 | the surface reaches the server through `McpServerOptions.dataSurface` and the one `new ProvidentMcpServer({ …, dataSurface: … })` composition line in `src/main/main.ts`, which exception E-3 licences (§5) | leaving the option unsupplied, which leaves five counted names registering nothing (D-11); or constructing the store inside `mcp-server.ts` from a path it derives, which would put the profile's directory in a module that has no profile (D-13) |
| ASM-L2-5 | the window bounds are two optional members of the one `DataLedger`, present on the `cursor-unknown` arm alone (§3) | a refined union arm (`DataLedger & { reason: 'cursor-unknown' }`), which makes the ledger two shapes and a reason-wide handler inexpressible |

## The integration battery's surface

Each row is an observable outcome the L2 battery drives; the battery is evidence and does not count against the module's harness cap of `50 + 10×15 = 200` (D-14, `strata/platform.md` §4; exception §1). The profile is `<profileDir>/provident-profile.json`, so a fixture seeds, scans and removes that one name without guessing (D-13).

| Goal | Expected answer |
|---|---|
| a first-ever profile is read | `list` → `{status:'read', paths:[], count:0}`; `read` → `{status:'absent', path}`; `journal` → `count:0`; no store file created (D-11, D-13) |
| a row is written | `write` → `{status:'committed', path, cursor:1}`, then `read` answers `kind:'row'` with the value (D-11, D-13) |
| the process is re-entered | the same `read` and the same `list` answer; `count` unchanged (D-13) |
| a malformed write is driven | `reason:'malformed-arguments'` naming the member, the previous row still served, its bytes unchanged (D-11) |
| a volatile spelling is written | `reason:'volatile-path'`; `list` unmoved; no `mem.`/`temp.`/`secure.` spelling in the profile's bytes (D-13) |
| a delete is driven | `removed:true` and `tiers` naming `'file'`, then `read` → `absent`; and a delete of an absent row answers `removed:false`, `tiers:[]`, `cursor:null` with no store refusal reaching the caller (`behaviour.md` §6; D-11) |
| the journal is driven from a cursor | the write then the delete, in that order, each with its cursor; `from` echoes the cursor; no answer carries a reversal (D-12) |
| a stale cursor is driven | `reason:'cursor-unknown'`, carrying the window's own `floor` and `through` (§2, §3; D-12) |
| the group is off | the five tools are absent from `tools/list`; with `['read','dispatch','data']` all five answer and the list holds 13 names (D-11) |
| the exclusion tier is open | every data tool answers the invocation-turn refusal `{status:'refused', reason:'exclusion-closed', message}`, and no profile byte moves (D-11) |
| a foreign profile image is seeded | `list` answers the cold tier and the next `write` replaces the bytes; a `profileDir` whose construction refuses answers `store-unreachable` on every tool and writes nothing (D-13, D-5, `persistence.md` §9 P-1) |

**Row 2's repair, stated so this unit's L2 test writer can make it mechanically.** `tests/integration/central-data/surface.test.ts`'s second row writes `{nested:[1,true]}` at `['alpha']` over a standing literal and expects `kind:'row'` with `count:1`; under §2 a row is a literal at an exact address, so that address is a **branch** holding two leaf rows and the row as filed is rejected (ASM-L2-2; D-11). The repair separates its two expectations and moves nothing else:

- a **literal-write** row: `write { path:['alpha'], value:'x' }` → `{status:'committed', path:['alpha'], cursor:1}`, `read` → `{status:'read', kind:'row', path:['alpha'], value:'x'}`, `list` → `{paths:[['alpha']], count:1}`; a second write at the same path → `cursor:2`, the new value, `count` still `1` (D-11).
- a **container-write** row, on its own fresh directory: `write { path:['alpha'], value:{nested:[1,true]} }` → committed, `read` → `{status:'read', kind:'branch', path:['alpha'], value:{nested:[1,true]}}`, `list` → `count:2`, naming the two leaf rows `['alpha','nested',0]` and `['alpha','nested',1]` that stand beneath it (ASM-L2-2; guide §4, arm `W-4`; D-11).
- The arm where a container write meets a standing literal at one address is **nobody's assertion here** — unmeasured at this head, and the `container-kind-conflict` row owns the declared reading only — so the repair must not re-introduce it (guide §4; D-11).
