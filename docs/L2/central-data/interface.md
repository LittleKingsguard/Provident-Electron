# L2 — `central-data`: the interface

- **Layer:** L2 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 8 — **THE PASS THAT JUDGED THE WRITE IS ON THE ANSWER**: `write` and `delete` answer `repaired` and `log`, a PLAIN array of the package's own `DataLogEntry` records, so `committed` can be told from `committed-and-repaired` and `D-79`'s dishonest verdict dies; `repaired` is derived from the PRESENCE of a `repair-run` entry and never from an empty list, `read`/`list`/`journal` carry neither, and §2 gains one exported type and one re-exported one (D-103); Rev 7 — **THE TIER IS THE CALLER'S AND A DECLARED ROOT'S TIER IS NOT**: `write`, `delete` and `read` each declare an optional `tier` over the store's own three tokens, the default is the store's own arity per verb, an out-of-domain token answers `malformed-arguments`, the ledger gains a TWELFTH reason word (`declared-tier`), and §2's `DataSurfaceOptions` gains a REQUIRED `declaredRoots` so a write or a delete at a root a crossing declares is refused at any tier but the family's own — which closes the measured defect that created a `file` version of a `mem` family (D-101); Rev 6 — §2's `DataSurfaceOptions.store` is now **REQUIRED** and the surface's fallback construction is **DELETED**, so the five tools act on the central store and on nothing else; the cold tier moves from "the profile has no file" to "the name was removed under a live process", and the battery table's first-ever-profile and foreign-image rows are re-derived onto it (D-80); Rev 5 — §2's `DataSurfaceOptions` carries the optional `store` handle and §5's composition line passes it, so `data.*` acts through the normal crossing and constructs nothing (D-79); Rev 4 — §1's `write` clause drops its quotation of a wording L1 rev 4 superseded and states the figure the row now carries (D-51); §5's composition-line sentence is de-duplicated after the last cite pass, and this file's L1 cites name rev 4. Rev 3 — four statements re-grained against L1 rev 4 and no design: §5's lead now says the five `data.*` members are **declared** and counted as declarations (D-14), with no arm answering one, and the Inputs line names L1 rev 4; rev 2 and behind are read through this one · **Status:** DESIGN — `docs/L1/central-data-management.md` rev 4 and its census exception rev 3 are the inputs; the integration battery is filed against this file and `src/main/data/` **exists**; the battery's own reading is `strata/brief.md` §6's instrument and is not restated here (D-1 §4, D-26)
- **Inputs:** L1 rev 4 §2/§3/§4/§8; `docs/L1/central-data-census-exception.md` rev 3 §1/§2/§5/§7 (E-1, E-2, E-3; N = 15); D-5, D-11, D-12, D-13, D-14, D-15; the `central-data` row of `strata/modules.json` (`endpoints: 15`); `strata/platform.md` §4; the tree at `57c5825`
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`, the package's shipped consumer guide, and `the declaration` is its `index.d.ts`; both are read and never edited (D-5)

## 0. Scope

This document fixes this module's I/O surface and its expected behaviour, and never its internals (§3's L2 row). Structure, private helpers and file layout beneath `src/main/data/` are L3's. The cross-module seams fixed here are the ones only this layer sees: the gate's sixth group, the five registrations, the `RpcMethod` union, and the adapter the registration calls (D-11).

## 1. The five tools: declared arguments

`DataPath` is the store's own address shape — a **dense** array whose every element is a `string` key or a **non-negative safe integer** index (`the declaration`, `Address`). A dotted string is not a path: `'a.b'` is one key that happens to carry a dot (guide §4, rule 2).

| Tool | Declared members | `arguments` omitted |
|---|---|---|
| `provident.data.read` | `{ path: DataPath, tier?: DataTier }` | refused `malformed-arguments` (D-11, D-101) |
| `provident.data.write` | `{ path: DataPath, value: unknown, tier?: DataTier }` | refused `malformed-arguments` (D-11, D-101) |
| `provident.data.delete` | `{ path: DataPath, tier?: DataTier }` | refused `malformed-arguments` (D-11, D-101) |
| `provident.data.list` | `{ prefix?: DataPath }` — and **no `tier`** | the same call as `{}`, the whole profile (D-11, D-101) |
| `provident.data.journal` | `{ cursor?: number }` — and **no `tier`** | the same call as `{}`, the whole retained window (D-11, D-101) |

- An own enumerable key outside a tool's declared set is refused **by name**, never ignored: each registration declares its members with `.passthrough()`, so a malformed call reaches the adapter instead of being silently stripped before it, and each member is `z.unknown()` behind `z.preprocess((carried) => carried ?? {}, …)`, so a wrong-typed member arrives as a value the adapter refuses rather than as a protocol error (`src/main/mcp-server.ts:1010-1039`; D-11).
- A `path` outside the domain — sparse, a negative or fractional index, an index above `2^53 − 1` — answers `malformed-arguments` naming the member; the empty string `''` is a legal key (guide §4, rules 1-5; D-11).
- The **empty path `[]`** is in domain for `read` (the whole register, answered as a branch) and for `list.prefix` (no narrowing), and is refused `root-not-writable` for `write` and `delete`: a one-call write or wipe of the whole profile is the destructive act D-12 leaves with no reversal (D-12). On a store the boot has just opened, whose register holds no row, `read { path: [] }` answers `kind:'branch'` with `value:{}` — the store's own empty register reading — and this module constructs nothing of its own (guide §4; D-13, D-80).
- **A volatile SPELLING is refused**: a path whose first segment begins `mem.`, `temp.` or `secure.` answers `volatile-path` and moves no byte — except on `list` and `journal`, whose argument is a read filter rather than a written path (`docs/L3/central-data/signatures.md` §4, ASM-L3-1). **THE SPELLING IS NOT THE TIER AND THE TWO ARE NO LONGER THE SAME CLAIM** (D-101): a namespace called `mem.` is refused because no such key was ever written and a silently dropped volatile row is exactly what the retired projection did — that projection is gone from `src/main/main.ts`, which stamps no `schemaVersion` and carries no second store (D-13) — while the `mem` TIER is now a caller's lawful choice and is written (§1's next bullet).
- **THE TIER IS THE CALLER'S, AND A DECLARED ROOT'S TIER IS NOT** (D-101). `write`, `delete` and `read` each declare an optional `tier` whose domain is the store's own three tokens (`DataTier`); a token outside it answers `malformed-arguments` naming the member, in the register of the `path` and `cursor` arms above. **THE DEFAULT IS THE STORE'S OWN ARITY, PER VERB, AND IT IS STATED ONCE**: a `write` or a `delete` that omits `tier` is `file` — the one token a `write` must name (`guide §5.2`), the tier this surface has always driven, and for a `delete` the only reading its own `ASM-L2-6` admits, since the store's tierless delete is the whole-target arm that names nothing — so no existing caller changes at an ordinary path — while a `read` that omits it is the store's UNQUALIFIED read (the lowest persistence present), so no read is narrowed behind its caller's back. `list` and `journal` declare no `tier`: the store publishes no tier-narrowed enumeration, and an own key outside a tool's declared set is refused by name. **AND THE CALLER CANNOT CHOOSE A DECLARED ROOT'S TIER**: the five roots the two crossings declare — `['tabs']`, `['panes']`, the view record's `['focus']` and `['zones']`, and its fourth — are published by `tabsDeclaredRoots` and `viewDeclaredRoots` with the tier each is declared at, `DataSurfaceOptions.declaredRoots` carries their union (REQUIRED, for `store`'s reason: an omitted list would leave an unguarded surface one caller away from the defect), and a `write` or a `delete` at such a root — or anywhere below one — asking for any other tier answers `declared-tier`, ahead of the reading and of any byte. **WHAT THAT CLOSES, MEASURED BOTH WAYS**: one `write` at `['focus']` used to create a `file` version of a root `view-record` declares at `mem`, after which the family's own `read()` answered `default` for the rest of that profile's life, a restart did not heal it and a `delete` at the root answered `removed:false` over a row that stood; the same write at `mem` now commits and the family's `read()` serves it (D-101). **AND A `mem` WRITE IS VISIBLE TO THIS PROCESS ONLY** — to the instance that holds it and to no other, persisting nowhere, with no byte of it in the profile; `temp` is the transient tier a `mem` write shadows. **THE B ATTERY'S SECOND HALF IS NOT THIS GUARD'S**: what a family ROOT accepts as a VALUE is the declaring module's existence pair, so a plain record of junk at the family's own tier still lands and still replaces the geometry — measured, named and open (D-101).
- **`write` takes exactly one path/value pair**, and the figure now stands on both sides: it is the one this section fixes, and L1 §3's own row states it as `exactly one path/value pair`, citing this section and `ASM-L2-1` — so no earlier L1 wording is quoted here (D-51). The reason it is one is the store's durability unit: one `file`-tier write, so a second pair would be a second durable commit and a refusal at pair *k* would leave pairs `1…k−1` landed — the tear the receipt of D-11 forbids. `ASM-L2-1` records the rejected alternative (§8).

## 2. The declared surface, and every answer shape

`src/main/data/index.ts` exports exactly this much and nothing else to `src/main/mcp-server.ts`; the registration adapter is declared here and is never invented at L4 (D-11, D-14).

```ts
export type DataPath = readonly (string | number)[]
export type DataTier = 'file' | 'mem' | 'temp'
export type DataLedger = { status: 'refused'; reason: DataRefusalReason; message: string; floor?: number; through?: number; storeStatus?: string; path?: DataPath }
export type DataRefusalReason = 'malformed-arguments' | 'root-not-writable' | 'volatile-path' | 'cursor-unknown'
  | 'store-unreachable' | 'address-malformed' | 'parent-absent' | 'container-kind-conflict' | 'value-not-admitted'
  | 'write-failed' | 'declared-tier' | 'store-refused'
export type DataReadAnswer = { status: 'read'; kind: 'row' | 'branch'; path: DataPath; value: unknown } | { status: 'absent'; path: DataPath } | DataLedger
export type DataLogEntry = LogEntry   // the package's OWN log-entry record, re-exported by the seam: five members, `kind` · `id` · `opId` · `message` · `state`, its set CLOSED (D-103)
export type DataWriteAnswer = { status: 'committed'; path: DataPath; cursor: number; repaired: boolean; log: readonly DataLogEntry[] } | DataLedger
export type DataDeleteAnswer = { status: 'committed'; path: DataPath; removed: boolean; tiers: readonly DataTier[]; cursor: number | null; repaired: boolean; log: readonly DataLogEntry[] } | DataLedger
export type DataListAnswer = { status: 'read'; prefix: DataPath | null; paths: readonly DataPath[]; count: number } | DataLedger
export interface DataJournalEntry { cursor: number; kind: 'write' | 'delete'; path: DataPath; changedTo: 'present' | 'absent' }
export type DataJournalAnswer = { status: 'read'; from: number; through: number; floor: number; entries: readonly DataJournalEntry[]; count: number } | DataLedger
export interface DataDeclaredRoot { readonly address: readonly (string | number)[]; readonly tier: DataTier }
export interface DataSurfaceOptions {
  /** The directory the READING names; the FILE's name is this module's own choice (D-13). Read by `readProfile` and by nothing else — it backs the `store-unreachable` arm and the cold tier, neither of which an instance can answer (D-80). */
  profileDir: string
  journalLength?: number   // bounds this module's OWN change window; the caller's store carries the journal it was built with (D-80)
  store: ProfileStore      // REQUIRED, and the ONLY store: `ProfileStore` = `ReturnType<typeof createProfileStore>` in `store.ts`; the app passes the boot's instance (`src/main/main.ts:132` → `:374`) and `data.*` acts through the normal crossing (D-79, D-80)
  declaredRoots: readonly DataDeclaredRoot[]   // REQUIRED, for `store`'s reason: the roots the two crossings declare with the tier each is declared at — `[...tabsDeclaredRoots(), ...viewDeclaredRoots()]` at the composition site — and the guard a write or a delete at one is refused by (D-101)
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
/** Constructs NO store, ever: it acts through the `store` the caller supplies and can build none (D-13, D-79, D-80); the declared roots it guards with are the caller's too (D-101). */
export function createDataSurface(options: DataSurfaceOptions): DataSurface
```

- **The declared surface is `N = 15`**: 5 tools + 5 routes + 5 `provident-storeroom` exports called — `storeCreate`, `read`, `readLiteral`, `write`, `delete` — so the harness cap is `50 + 10×15 = 200`; `register` has no call site and is **not** on the called set (the `central-data` row of `strata/modules.json`, `endpoints: 15`; exception §1; D-14, `platform.md` §4).
- The answer types stay in `src/main/data/`: no renderer sees them, so `src/shared/types.ts` gains the five union strings and nothing else (D-15's E-1 row). `journalLength` defaults to the seam's `DEFAULT_JOURNAL_LENGTH` (`4096`) and bounds this module's own change window only — a supplied instance's journal was fixed at its own creation (`src/main/storeroom.ts:71`; D-12, D-79, D-80).

## 3. The receipt vocabulary — closed, and a value

Every answer is one of the statuses `committed`, `read`, `absent`, `refused`; no fifth, and no answer is a throw (D-11).

| Status | Meaning | Members |
|---|---|---|
| `committed` | a write or a delete landed through the store, and the answer carries the pass that landed it | `path`, plus `cursor` + `repaired` + `log` (write) or `removed` + `tiers` + `cursor` + `repaired` + `log` (delete) (D-11, D-103) |
| `read` | a reading answered | `kind` + `value`, or `prefix` + `paths` + `count`, or the journal's window (D-11) |
| `absent` | **absence answered explicitly** — nothing stands at the path, and this is never an empty success | `path` (D-11) |
| `refused` | the closed ledger of §2's twelve reason words, each carrying its own `message` — the twelfth being `declared-tier` (D-101) | `reason`, `message`, optional `path`, and `floor` + `through` on the `cursor-unknown` arm alone (D-11, D-12) |

- `message` is always present on every arm: the store's own generated sentence where the store refused, a fixed module sentence otherwise; it never replaces `reason` (D-11).
- **The window bounds ride the `cursor-unknown` arm alone**: `floor` and `through` are present there, both numbers, so a caller re-anchors, and they are absent on every other refusal — they are declared optional on `DataLedger` so the answer `behaviour.md` §6 promises is expressible without a cast, and `reason` is never replaced by them (`behaviour.md` §6; D-12).
- `store-refused` is the escape arm for a store status outside the mapped set, and it carries that status verbatim in `storeStatus` — an unknown status is never read as success (`node_modules/provident-storeroom/README.md`, "The status set is TWENTY, and open by design"; D-5) — while `exclusion-closed` is **not** in this vocabulary: it is produced at the invocation turn, before the adapter runs, in the same `{status, reason, message}` form (§4; D-11).
- **`repaired` AND `log` RIDE THE TWO MUTATING VERBS AND NOTHING ELSE** (D-103). `repaired` is the presence of an entry of `kind:'repair-run'` in the act's own commit's log — **never the emptiness of a list**, since a clean write answers two entries over a store whose pairs passed and one over a store carrying no pair, so `[]` is not the answer any pass gives; `log` is that commit's entries, a **plain enumerable array** of the package's own `DataLogEntry` shape, copied out of a member the store carries NON-enumerably. **`read`, `list` and `journal` carry NEITHER** — a read consults no constraint, so *"every act that ran a constraint pass"* is the reading taken of *"always"* — and **the refusal ledger carries no `log` either**, named here rather than hidden: the package hands that arm a list too and this surface does not yet forward it (D-103).

## 4. The group's posture

- `ToolGroup` gains `'data'`; the five names are added to `TOOL_GROUPS` as exact rows (the prefix rule covers `module:` only); `VALID_GROUPS` becomes six in **both** live copies (`src/main/security.ts:3,5-50,159` and `VALID_GROUPS` and `admitGroups` in `src/main/operator-settings/index.ts`, which is where the second copy re-homed when `src/main/security-store.ts` was deleted — D-16) — a census move and no behaviour (D-11, D-15, exception §2).
- **OFF by default**: `defaultSecurityConfig()` stays `['read','dispatch']`, eight names, so a fresh profile lists no `data` tool at all; a disabled group's tools are **absent from `tools/list`, not present-and-refusing**, because registration is driven by `allowedToolNames()`, so an unregistered tool cannot answer anything (`src/main/security.ts:86-88`; `src/main/mcp-server.ts:603-615,832-1040`; D-11).
- With `data` enabled the listed set is **13**; `ALL_TOOLS` 22 → 27; `ALL_RESOURCES` stays 3 — the group is tools only, with no `mcp://provident/data/…` mirror (L1 rev 4 §3; D-11).

## 5. The five bridge routes, answered in main

- `RpcMethod` gains `data.read`, `data.write`, `data.delete`, `data.list`, `data.journal` — 22 → 27 — and each is **declared, not answered**: **D-14 counts the declaration**, so the census holds on the declaration alone, and **no `data.*` arm answers one** at this head — the tool call is the only answer site and the route's answer site does not exist (§5's next bullet; L1 rev 4 §2's form, cited and not restated; the five members are the `RpcMethod` union's own rows in `src/shared/types.ts`; D-11, D-14, D-15, D-43).
- **The group's posture does not reach a route, and the tree has yet to carry the answer.** A `data.*` route is **declared** to answer while `data` is OFF: the group governs which MCP tool names are registered and therefore absent from `tools/list`, and it says nothing about the bridge's own vocabulary — the rejected alternative, gating the routes by the group too, would make a route the renderer's contract declares vanish whenever an operator narrows a grant, which is a power no clause of D-11 gives an MCP group (D-11; ASM-9). **Unlanded at this head, so the clause above is design and is not measured:** no answer site for the five routes exists — the renderer's method switch has no `data.*` arm and its default throws `unknown method` (`src/renderer/renderer.ts:961-1033`), and the IPC handler registrations in `main()` (`src/main/main.ts`) cover no such route (D-11, D-15).
- No renderer method-switch arm is added, so `MUTATING_METHODS` stays at its seven, and `window.provident` gains no member: the routes are vocabulary and record, not a new bridge surface (`src/renderer/renderer.ts:829`; `src/main/preload.ts:42-75`; D-11, L1 rev 4 §4 ASM-9).
- The registrations obtain their adapter through **one new optional option, `McpServerOptions.dataSurface?: DataSurface`**, exactly as the `module.*` handlers receive `moduleStore` (`src/main/mcp-server.ts:392-404,813-820`; D-11); and that option is supplied by the composition site's existing one-line options pass — `new ProvidentMcpServer({ …, dataSurface: createDataSurface({ profileDir: app.getPath('userData'), store: centralStore, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] }) })`, the `new ProvidentMcpServer(...)` composition line in `src/main/main.ts` — which **is licensed by the census exception's E-3**: one import line plus that one options member, written by `central-data`'s L4 in the same one shot, with no other line of `main.ts` moving, and it is not a census row (`docs/L1/central-data-census-exception.md` §2 E-3; D-11, D-13). **`store` and `declaredRoots` are the same line's second and third members and not a second or third pass;** `store` names the boot's instance, so the surface opens none and cannot (D-79, D-80), and `declaredRoots` is the crossings' union, imported by the composition and never by this module (D-101, `D-103`'s re-derivation of this line).
- Until it lands, a server constructed without a surface registers **no** `data` tool even with the group enabled: the five names are enumerated in `ALL_TOOLS` and unregistered, which is the count-moved-without-its-row finding D-11 forbids. The live composition must supply the surface (D-11).

## 6. The discipline: a refusal is a value, and the previous bytes stay

- No data operation throws for any argument and any state: every failure is a `refused` ledger returned to the caller (D-11).
- A refusal leaves the profile's bytes exactly as they stood: a write that the store refuses is a store rollback, not a partial landing (guide §9.4; D-11).
- The exclusion tier is answered by the landed wrapper, so a data call made while the tier is open receives the refusal value and the adapter is never entered; and nothing on this surface reverses, replays or repairs: `rollback` is not called, no constraint is registered and no listener is registered (§4; D-11, D-12).

## 7. No rendered surface

This module renders nothing and changes no rendered surface: its five tools answer values, add no graph node and emit no notification, so `provident.dispatch`, `get_rendered_html` and `get_markdown` are unmoved (D-11; L1 rev 4 §3).

## 8. Assumptions

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L2-1 | `data.write` takes exactly one path/value pair (D-11's atomic receipt) | a pair set committing per pair, which makes "a refusal leaves the previous bytes intact" false from pair 2 onward |
| ASM-L2-2 | `list` answers the paths that hold a **row**, sorted by the path's JSON text (D-11) | every node path including branches, which no caller can act on and which `read` already derives |
| ASM-L2-3 | the journal window is this process's own (4096), and a foreign cursor answers `cursor-unknown` | a cursor persisted beside the store's file, which would be a second written name (D-13) |
| ASM-L2-4 | the surface reaches the server through `McpServerOptions.dataSurface` and the one `new ProvidentMcpServer({ …, dataSurface: … })` composition line in `src/main/main.ts`, which exception E-3 licences (§5) | leaving the option unsupplied, which leaves five counted names registering nothing (D-11); or constructing the store inside `mcp-server.ts` from a path it derives, which would put the profile's directory in a module that has no profile (D-13) |
| ASM-L2-8 | `DataSurfaceOptions.declaredRoots` is **REQUIRED** and carries the union of the two crossings' published pairs, because a surface that is not told which roots are declared cannot refuse a write that creates a second version of one — and the import is the COMPOSITION's, since reaching the crossings from `src/main/data/` would put them in the MCP stack's closure, which two gating rows require to name neither the operator instance nor its addresses (D-101) | an OPTIONAL `declaredRoots`, which compiles and leaves exactly the unguarded surface reachable — the shape `D-80` deleted for `store` — or an import inside `src/main/data/`, which moves the crossings into the MCP closure and reds those rows |
| ASM-L2-5 | the window bounds are two optional members of the one `DataLedger`, present on the `cursor-unknown` arm alone (§3) | a refined union arm (`DataLedger & { reason: 'cursor-unknown' }`), which makes the ledger two shapes and a reason-wide handler inexpressible |

## The integration battery's surface

Each row is an observable outcome the L2 battery drives; the battery is evidence and does not count against the module's harness cap of `50 + 10×15 = 200` (D-14, `strata/platform.md` §4; exception §1). The profile is `<profileDir>/provident-profile.json`, so a fixture seeds, scans and removes that one name without guessing (D-13); and the fixture **boots the instance the composition would** — one `createProfileStore` at that name — because the surface no longer constructs one (D-80).

| Goal | Expected answer |
|---|---|
| a first-ever profile is read | `list` → `{status:'read', paths:[], count:0}`; `read` → `{status:'absent', path}`; `journal` → `count:0`; the ONE name stands at zero length — an OPEN register holding nothing, never an absent one (D-11, D-13, D-80) |
| a row is written | `write` → `{status:'committed', path, cursor:1}`, then `read` answers `kind:'row'` with the value (D-11, D-13) |
| the process is re-entered | the same `read` and the same `list` answer; `count` unchanged (D-13) |
| a malformed write is driven | `reason:'malformed-arguments'` naming the member, the previous row still served, its bytes unchanged (D-11) |
| a volatile spelling is written | `reason:'volatile-path'`; `list` unmoved; no `mem.`/`temp.`/`secure.` spelling in the profile's bytes (D-13) |
| a delete is driven | `removed:true` and `tiers` naming `'file'`, then `read` → `absent`; and a delete of an absent row answers `removed:false`, `tiers:[]`, `cursor:null` with no store refusal reaching the caller (`behaviour.md` §6; D-11) |
| the journal is driven from a cursor | the write then the delete, in that order, each with its cursor; `from` echoes the cursor; no answer carries a reversal (D-12) |
| a stale cursor is driven | `reason:'cursor-unknown'`, carrying the window's own `floor` and `through` (§2, §3; D-12) |
| the group is off | the five tools are absent from `tools/list`; with `['read','dispatch','data']` all five answer and the list holds 13 names (D-11) |
| the exclusion tier is open | every data tool answers the invocation-turn refusal `{status:'refused', reason:'exclusion-closed', message}`, and no profile byte moves (D-11) |
| a write or a delete is driven at a root a crossing declares, at a tier that is not the family's | `reason:'declared-tier'`, the sentence naming the root, the tier the family declares and the tier the call asks for; nothing lands, the family's own `read()` is unmoved, and the same call at the family's own tier commits and is served by that `read()` (D-101) |
| a row is written at `mem` and the process re-entered | the row is served by the instance that wrote it, at `mem` and by an unqualified read, and by NO other instance: it is gone at the next boot, and the profile carries no byte of it (D-101) |
| a foreign profile image is seeded | the boot answers an empty register and the next `write` replaces the bytes; a `profileDir` whose name cannot be OCCUPIED answers `store-unreachable` on every tool, the store never consulted — the surface refuses no construction, because it performs none (D-13, D-5, D-80, `persistence.md` §9 P-1) |

**Row 2's repair, stated so this unit's L2 test writer can make it mechanically.** `tests/integration/central-data/surface.test.ts`'s second row writes `{nested:[1,true]}` at `['alpha']` over a standing literal and expects `kind:'row'` with `count:1`; under §2 a row is a literal at an exact address, so that address is a **branch** holding two leaf rows and the row as filed is rejected (ASM-L2-2; D-11). The repair separates its two expectations and moves nothing else:

- a **literal-write** row: `write { path:['alpha'], value:'x' }` → `{status:'committed', path:['alpha'], cursor:1}`, `read` → `{status:'read', kind:'row', path:['alpha'], value:'x'}`, `list` → `{paths:[['alpha']], count:1}`; a second write at the same path → `cursor:2`, the new value, `count` still `1` (D-11).
- a **container-write** row, on its own fresh directory: `write { path:['alpha'], value:{nested:[1,true]} }` → committed, `read` → `{status:'read', kind:'branch', path:['alpha'], value:{nested:[1,true]}}`, `list` → `count:2`, naming the two leaf rows `['alpha','nested',0]` and `['alpha','nested',1]` that stand beneath it (ASM-L2-2; guide §4, arm `W-4`; D-11).
- The arm where a container write meets a standing literal at one address is **nobody's assertion here** — unmeasured at this head, and the `container-kind-conflict` row owns the declared reading only — so the repair must not re-introduce it (guide §4; D-11).
