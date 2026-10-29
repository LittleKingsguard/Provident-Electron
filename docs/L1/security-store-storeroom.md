# L1 — the security store rebuilt as its own `provident-storeroom` instance

- **Layer:** L1 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 1
- **Status:** DESIGN — the map is filed at `strata/modules.json`; nothing below this layer is admitted (D-7, D-16). The census sites, the retirement set and every cross-module write are in `docs/L1/security-store-storeroom-exception.md` (E-1..E-5)
- **Charter:** D-16 rebuilt wholesale and MCP-isolated · D-17 the instance is the operator-settings state machine and the surface a separate module · D-18 one operator-only reference, tested by absence · D-19 import once, then own a new shape · D-20 sequenced after `central-data-management`'s exit walkthrough, which is `done`
- **Inputs:** `strata/brief.md` §2/§6; `strata/decisions.md` D-1..D-20 (D-5, D-11, D-13, D-15, D-16..D-20 load-bearing); `strata/modules.md` §3/§4; `strata/platform.md` §4; `docs/L1/central-data-management.md` and `docs/L1/central-data-census-exception.md`, the sibling's two patterns; the tree at `0eca66b`; `node_modules/provident-storeroom/{index.d.ts,README.guide.md}`, read and never edited (D-5)
- **Ceiling:** 150 lines (class max) — at the ceiling split by owner, never append (D-1, D-2)

## 1. What this unit is, and why it does not stop here

`src/main/security-store.ts` is **disregarded, not carried** (D-16): its five-member `SecurityStore`, its closed `'write-failed'` receipt and its `tier4-closed` write outcome are replaced wholesale — no shim, no dual write, no "keep both paths" (D-16). The replacement is a **second, separate `provident-storeroom` instance**, with its own lifetime and its own file and not the instance `provident.data.*` reads (D-16), and it is the **state machine under the operator's Settings surface**: the security record plus the operator-settings state that today lives behind the manual-UI channels (D-17). The surface is a **separate module** seeing the instance only through read, write and listeners (D-17), and nothing in the MCP stack holds the instance (D-18).

**The state machine D-17 requires is expressible in `provident-storeroom ^1.6.1`, measured at this head — so this unit proceeds rather than stopping at L1.** Each requirement, and the package clause that carries it (read, never edited — D-5):

| D-17 requires | The package's own route |
|---|---|
| read, write | `read(address, tier?)` · `write(address, tier, value)` (guide §3.1) |
| listeners as the change path | `listen(handle, addresses)` + `register(handle, listener)`, the listener's one argument the triggering address; withdrawal is `unlisten` (guide §6.1-§6.2) |
| a committed write reaches the gate by subscription | a listener is delivered **after** the constraint pass and **after** the `file`-tier save, so a subscriber reads a judged, committed state (guide §9, `D-55`) |
| a durable record and a volatile flag in one machine | one store carries a `file` and a `mem` tier side by side (guide §5, §9.1) |
| one transition, one receipt, no tear | a whole structured value written at one key mints the tree beneath it **in one call** (guide §4, arm `W-4`) |
| a refusal is a value | refusals are thrown `{status, message, log, address}` and the surface maps them (guide §8, `D-77`) |

## 2. The module map — two rows, one retired path (D-16, D-17)

| Row | Paths claimed | N |
|---|---|---|
| `operator-settings` (re-declared) | `src/main/operator-settings/` *(new — the instance)* · `src/main/tier4-state.ts` · `src/main/module-store.ts` · `src/main/security-store.ts` **(retired, exception §5)** · the eight flat rows it already held · `tests/unit/security-store-storeroom/` · `tests/integration/security-store-storeroom/` | **10** |
| `settings-surface` **(new row)** | `src/main/settings-surface/` · `tests/unit/settings-surface/` | **11** |

- **`operator-settings` N = 10** by D-14's convention: **6** `provident-storeroom` exports called (`storeCreate`, `read`, `write`, `listen`, `register`, `unlisten`) plus **4** value names exposed to the surface module (`createOperatorSettings`, `read`, `write`, `subscribe`). `readLiteral`, `delete`, `rollback` and the four constraint members are **not** called (D-14; D-12's posture unmoved).
- **`settings-surface` N = 11**: **3** bridge routes with both sides counted (`IPC_SECURITY_GET`, `IPC_SECURITY_SET`, `IPC_SECURITY_EXCLUSION` × their renderer declaration members `get`/`set`/`setExclusion`) = 6, plus **5** value names exposed to `main.ts` (`createSettingsSurface`, `read`, `set`, `transition`, `attach`). The caps follow and no author declares one: **150** and **160** (D-14, `platform.md` §4).
- **`app-shell` 7 and `mcp-surface` 30 hold**: no tool, no resource, no `RpcMethod` member and no bridge channel is added or removed (§4, §6), so no census of D-11's moves (D-11, D-15).
- **The unit's two batteries are claimed by the `operator-settings` row** — `tests/integration/security-store-storeroom/` (L2's) and `tests/unit/security-store-storeroom/` (L3's) — because that row owns the file being replaced and the state machine they drive; **`tests/e2e/` is L1's own artifact and is claimed by no module**, exactly as `docs/L1/` is not, and `tests/unit/settings-surface/` holds the surface module's own unit rows (D-10, `modules.md` §3).

## 3. The instance — the state it holds and the transitions it exposes (D-17)

**Six members, written as one value at one address** `['operator-settings']` — four on the `file` tier and two on `mem` — so each transition is one store write and therefore one op, one cursor and one receipt (guide §4 `W-4`; ASM-1).

| Member | Tier | What it is | Cite |
|---|---|---|---|
| `token` | `file` | the bearer token, or `null` | D-17 |
| `enabled` | `file` | the granted group names, deduplicated through the **six**-member group set | D-11, D-17 |
| `maxJournalLength` | `file` | the supervisor's journal cap, or absent | D-17 |
| `entries` | `file` | the arbitrary-name map, absent until first written | D-16 (behaviour carried, shape not) |
| `exclusion` | `mem` | `'mcp-enabled'` \| `'mcp-disabled'` — **never persisted** | D-17, ASM-2 |
| `tier4` | `mem` | the boolean the gate consults — **never persisted** | D-17, ASM-2 |

**The three transitions, and nothing else** (D-17):

| Transition | Domain | Answer | What a refusal leaves |
|---|---|---|---|
| `read` | no argument, or one member name | the committed record, detached at every depth | a read moves nothing; the refusal is a value on the channel, never in the value |
| `write` | a patch of the four `file` members | a **receipt** | the previous bytes exactly as they stood, and the live record unmoved |
| `subscribe` / `unsubscribe` | one listener, one address (`['operator-settings']`) | the handle, or its withdrawal | no state moves; an unregistered handle fires nothing (guide §6.2) |

- **A receipt is `{status:'committed', cursor, opId}` or `{status:'refused', reason, message}`** — `reason` the store's own status verbatim, `message` the package's generated sentence, and nothing throws across the module boundary (guide §8; D-5). **A refusal leaves the record and the bytes untouched**, the store's own commit restore having run before it crosses, so live equals durable at every terminal (guide §5.4, §9.4; D-17). **`'write-failed'` and `'tier4-closed'` do not survive as write-outcome tokens** (D-16; ASM-3).
- **The exclusion pair boots to the safe pair and is never persisted**, so a crash, a torn record, a corrupt file and a missing file all resolve to it exactly as today (`src/main/main.ts:109-113`; ASM-2). **The enforcement path keeps its one reader and gains one writer:** the surface module is the sole writer of `src/main/tier4-state.ts`'s holder — on the committed `mem` write and at boot — so the holder is the gate's *projection* of the instance's row and no second home (`src/main/tier4-state.ts:12-18`; ASM-4).

## 4. The surface module and its channels (D-17, D-18)

`src/main/settings-surface/` constructs the instance, holds **the one reference**, answers the three manual-UI channels, and re-patches the live gate from inside its **listener** — never from a poll or a boot-order re-read (D-17; `src/main/main.ts:453-455`).

| Channel | Constant | Answer | Landed site it replaces |
|---|---|---|---|
| settings read | `IPC_SECURITY_GET` (`src/shared/types.ts:330`) | the record plus the additive `exclusion` and `read` members | `src/main/main.ts:425-443` |
| settings write | `IPC_SECURITY_SET` (`:331`) | the post-state superset carrying the **`write`** receipt member | `src/main/main.ts:444-463` |
| exclusion transition | `IPC_SECURITY_EXCLUSION` (`src/main/store-channels.ts:24`) | `{applied, state}` or `{applied:false, state, reason:'malformed-state'}` | `src/main/main.ts:472-483` |

- **`window.provident` gains no member**: the three routes, their answers and the two additive members stay as `src/main/preload.ts:42-75` declares them, so `preload.ts`'s only move is its `import type` source (§7 C-2, exception §2) (D-18). **The surface renders nothing and answers no MCP drive**, so `provident.dispatch`, `get_rendered_html` and `get_markdown` are unmoved (D-18).
- **Whether the five `data.*` bridge routes answer while the `data` group is off is settled at L2**, in `docs/L2/security-store-storeroom/interface.md`, with the rejected alternative recorded; this layer fixes only that the answer is a clause and not an accident of where the surface is constructed (D-11, `examiner.md` §2).
- **The grant act is documented in a user-facing place**: `README.md` § "The MCP surface" gains a paragraph stating who grants a group, what a grant is, and that it is never an MCP tool — licensed by exception §2 E-4 (D-11, D-18).

## 5. The import-once path (D-19)

**Read once, at the first boot after the rebuild, then never again.** The object is `<userData>/provident-security.json`, the one file the replaced module wrote; the members imported are exactly its four record members, and the five boot arms of `ingest()` move as **behaviour**, not as bytes (`src/main/security-store.ts:112-142`).

| Arm | What the import does | Cite |
|---|---|---|
| the file is absent | the first-run default — `token:null`, `enabled:['read','dispatch']`, no cap, no `entries`; the import creates no file | D-19 |
| the file is present and an object | each member admitted by the landed rule, foreign keys preserved verbatim into `entries`; **the operator's token, grants, cap and entries survive, and a row proves each** | D-19 |
| unparsable, or a non-object (`[]`, a string, a number, a boolean) | the first-run default; the bytes left untouched and the import never throws | D-19; `src/main/security-store.ts:114-120` |
| a directory, or unreadable | the first-run default; the import never throws | D-19 |
| `entries` not a plain object | treated as absent, the raw value not preserved — the one declared non-verbatim arm | `src/main/security-store.ts:101-111` |

- **The import's own red set is this unit's**: a token, granted groups, the cap and arbitrary entries all survive the crossing, `enabled` is deduplicated through the six-member group set, and a refused or absent import leaves a first-run default rather than a silent capability change on upgrade (D-19).
- **The new shape owns a new name.** The instance's file is **`<userData>/provident-operator-settings.json`**, chosen here; `provident-security.json` is **retired — read at most once and never written again**, its bytes left standing (D-19, D-16; ASM-6). **The store's construction creates the new file** (a provided, absent path is created exclusively, zero-length and empty — guide §9.1), so the persisted set gains a name at construction and not at the first write, and the rows reading it are re-grained, not deleted (D-13; §7 C-4).
- **`<userData>/provident-settings.json` is neither read, written nor retired here**: it is `app-shell`'s tier-1 crossing and stays parked where the sibling unit parked it (`docs/L1/central-data-census-exception.md` §5; D-13; ASM-5).

## 6. The isolation invariant, as named absence rows (D-18)

Absence is the control, so each row is stated as **nothing resolves** and driven over a live surface, never inferred from a code read (D-18).

| Id | The absence asserted | Read over |
|---|---|---|
| `ISO-1` | no `provident.data.*` tool reads or writes an operator-settings member or the instance's file | the five tools, both transports |
| `ISO-2` | no MCP resource resolves into the instance | `mcp://provident/app`, `…/targets`, `…/node/{nodeId}` — 3, unmoved |
| `ISO-3` | no `RpcMethod` member names a security member or the instance's file | the 27-member union (`src/shared/types.ts:259-286`) |
| `ISO-4` | no bridge channel carries a security write except the three manual-UI channels | `window.provident`'s six members (`src/main/preload.ts:42-75`) |
| `ISO-5` | exactly **one** construction of the instance exists and the MCP stack holds no reference to it | `main.ts`, `operator-settings/`, `mcp-server.ts`, `security.ts` |
| `ISO-6` | the instance's file name is spelled in no file the MCP stack reaches, so no drive can even name it | `mcp-server.ts`, `data/`, `security.ts` |

**`ISO-1`'s positive half is the sibling's and is driven, not patched**: `provident.data.*` is scoped to the central profile store and its `volatile-path` arm already names `secure.` (`docs/L2/central-data/interface.md` §1; D-13, D-18, D-5). A declared boundary with no row behind it is a claim, not a control (D-18).

## 7. The census and pin set that moves — sited in exception §2

| C | What moves | Who writes it |
|---|---|---|
| **C-1** | the group set's **second live copy**: `VALID_GROUPS` leaves the retired file for `src/main/operator-settings/` with six members, and `:122`/`:339` move with it. The **first** copy (`src/main/security.ts:159`) is `mcp-surface`'s and does **not** move | this unit's L4 |
| **C-2** | `preload.ts`'s three receipt **types** — and `secure-panels.ts`'s and `main.ts`'s imports of them — move to the surface module's declaration; `SecuritySettings` stays byte-identical | this unit's L4 |
| **C-3** | `main.ts`'s construction, boot read, flip and carrier move to the surface module; the landed order **construction < boot read < flip < `await mcp.start()` < `new BrowserWindow(`** survives unchanged in kind | this unit's L4 |
| **C-4** | the persisted-file names: one retired, one added — so D-13's "exactly two persisted files" stops being a true standing pin | this unit's L2 test writer |
| **C-5** | the frozen digests imaging the retired file: `SECURITY_STORE_PIN` and its five `…_PRE_*` terms, plus every reader of them | this unit's L2 test writer, **by retirement**, not re-point |

A count that moves without its row moving is a finding, and a row that moves without a count moving is the same finding read backwards (D-11). **`mcp-surface` 30 and `app-shell` 7 are unmoved** (§4, §6; D-18).

## 8. The L1 battery — twelve scenarios, `tests/e2e/` (this layer's artifact)

| # | Goal | Expected |
|---|---|---|
| S-1 | the instance boots over no file | the first-run default is served; the instance's file exists zero-length; no `provident-security.json` is written |
| S-2 | one committed write is one commit | `write {token}` → one receipt, one cursor, one op id; `read` serves it; no `.tmp`, no lock, no sidecar |
| S-3 | a refusal leaves the previous bytes | a refused write → a `refused` value naming the store's own status; `read` unchanged; the file byte-identical |
| S-4 | the next process serves the same record | identical `read`; grants and cap survive; the exclusion pair re-boots to its declared initial |
| S-5 | **a listener is the change path** | a committed write delivers the subscription with `['operator-settings']`; the gate is re-patched inside the listener; no poll, no boot-order re-read (D-17) |
| S-6 | a listener's throw cannot take the write's answer away | every listener body contains its own refusal; a write whose listener throws still answers its receipt (guide §6.5a) |
| S-7 | the import carries its own red set | a seeded `provident-security.json` with a token, three grants, a cap and one entry imports all four; the first `read` serves them; a row proves each (D-19) |
| S-8 | the import's absent and corrupt arms | absent, unparsable, non-object and directory-shaped files each import the first-run default, throw nothing, leave the bytes untouched (D-19) |
| S-9 | the old name is never written | after the import and three committed writes, `provident-security.json` is byte-identical to its seed and the new name carries the record (D-19) |
| S-10 | `ISO-1` and `ISO-3` | no `provident.data.*` tool and no `RpcMethod` member reaches a member or the instance's file (D-18) |
| S-11 | `ISO-2`, `ISO-4`, `ISO-5`, `ISO-6` | the three resources, the six bridge members and the MCP stack's own files hold no reference; exactly one construction exists (D-18) |
| S-12 | two profiles are disjoint | two `userData` overrides carry two instances; a write through one is never served by the other; the group set is six in both |

## 9. Boundaries — what this unit does not claim

- No `provident-storeroom` or `provident-ssr` change; a defect or requirement gap is recorded upstream-owned, with symptom, reproduction, suspected root cause and fix shape, and archived with this unit (D-5). No undo and no rollback surface: `rollback` is not called and nothing operator-visible reverses the record (D-12's posture, unmoved). No operator-visible UI element outside the producing graph (`AGENTS.md` § "Project-wide constraint"; `src/shared/demo-envelope.ts:1-18`).
- No MCP surface and no rendered surface (§6); no second module's carrier (§5); no wholesale test re-layout, only this unit's own rows at claim time (D-10).

## 10. Assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-1 | the record stands at **one address as one object value**, so one transition is one write, one op and one receipt | a row per member, which makes a four-member patch four commits and leaves a landed `token` beside a refused `enabled` — the tear the receipt exists to forbid |
| ASM-2 | the exclusion pair and the tier-4 boolean are `mem` rows, never persisted, booting to the safe pair | a `file` row, which persists the gate's own state and lets a crash or a hand-edited file boot the app open |
| ASM-3 | the surface's vocabulary is the store's own statuses plus its generated sentence | keeping the old closed reason set in front of the store's, which gives one refusal two spellings and hides the store's cause |
| ASM-4 | `src/main/tier4-state.ts` survives as the enforcement path's **projection**, written only by the surface module on the committed row | the gate reading the instance through a thunk, which puts an instance-shaped reference inside the MCP stack (D-18); or a second flag home, the defect that leaf exists to close |
| ASM-5 | the import-once set is **one** file, `provident-security.json` | importing `provident-settings.json` too, which takes a second module's carrier through this gate (D-1, D-13) |
| ASM-6 | the instance's file is a **new** name, chosen here | reusing `provident-security.json`, which D-19 forbids by name ("the old names are retired, not written") |
| ASM-7 | an L1 delegation reaches **L2 only**; L3 and L4 are the L2 seat's own chain | L1 calling `role_l3_designer`, which crosses a layer wall the preset's tool filter exists to hold (`platform.md` §1, `envelope.md` §1) |
