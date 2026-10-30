# L1 — the security store rebuilt as its own `provident-storeroom` instance

- **Layer:** L1 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 3 — rev 2 and rev 1 are read through this one: **ASM-4 is settled here** — `src/main/tier4-state.ts` stays, the surface module remains its sole writer, and its reader at this head is the unit's own live row, the retirement having been rejected and parked (§3, §10, exception §6) — and rev 2's three moves stand: the record at **two** addresses and not one (§3, ASM-1: the `file` tier purges the `mem` version at its own key, so a settings commit would have silently reset the exclusion pair — measured by L2, filed as `persistence.md` §9 P-3), `settings-surface` N is **19** and not 11 (§2: D-14 counts what a module consumes as well as what it exposes), and `window.provident` carries **seven** top-level members and not six (§6, §8: the L2 examiner's reading of `src/main/preload.ts:42-75`)
- **Status:** EXECUTED — the map is filed at `strata/modules.json` and re-measured at this rev; the two modules stand (`src/main/operator-settings/`, `src/main/settings-surface/`), both batteries are green at `536bdc6`, and the old store is gone. The census sites, the retirement set and every cross-module write, with their execution record, are in `docs/L1/security-store-storeroom-exception.md` (E-1..E-5, §9)
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
| `operator-settings` (re-declared) | `src/main/operator-settings/` *(new — the instance)* · `src/main/tier4-state.ts` · `src/main/module-store.ts` · the flat rows it already held, less the three the rebuild retired (exception §9) · `tests/unit/security-store-storeroom/` · `tests/integration/security-store-storeroom/` | **12** |
| `settings-surface` **(new row)** | `src/main/settings-surface/` · `tests/unit/settings-surface/` | **19** |

- **`operator-settings` N = 12** by D-14's convention: **6** `provident-storeroom` exports called (`storeCreate`, `read`, `write`, `listen`, `register`, `unlisten`) plus **6** value names exposed (`createOperatorSettings`, `read`, `write`, `subscribe`, and the `settings-carrier-retirement` unit's `readAppState`/`writeAppState` — `docs/L1/settings-carrier-retirement.md` §2, §3 E-2) — 6 + 6 = **12**. `readLiteral`, `delete`, `rollback` and the four constraint members are **not** called (D-14; D-12's posture unmoved).
- **`settings-surface` N = 19**: **3** bridge routes with both sides counted (`IPC_SECURITY_GET`, `IPC_SECURITY_SET`, `IPC_SECURITY_EXCLUSION` × their renderer declaration members `get`/`set`/`setExclusion`) = **6**, **7** value names exposed to `main.ts` (`createSettingsSurface`, `read`, `set`, `transition`, `attach`, and the retirement's `state`/`commit`), and **6** value names it **consumes** from `operator-settings` (`createOperatorSettings`, `read`, `write`, `subscribe`, `readAppState`, `writeAppState`) — 6 + 7 + 6 = **19** — D-14 counts what a module exposes *or consumes*, and the row counted only one side in rev 1 (D-14, `platform.md` §4; `docs/L1/settings-carrier-retirement.md` §2, §3 E-3). The caps follow and no author declares one: **170** (`operator-settings`) and **240** (`settings-surface`).
- **`app-shell` 7 and `mcp-surface` 30 hold**: no tool, no resource, no `RpcMethod` member and no bridge channel is added or removed (§4, §6), so no census of D-11's moves (D-11, D-15).
- **The unit's batteries are claimed by the `operator-settings` row** — `tests/integration/security-store-storeroom/` (L2's), `tests/unit/security-store-storeroom/` (L3's) and `tests/e2e/security-store-storeroom/` (this layer's) — because that row owns the file being replaced and the state machine they drive; `tests/e2e/` is L1's own artifact by write scope and now sits on an owning row so the map resolves it, while `tests/unit/settings-surface/` holds the surface module's own unit rows (`strata/brief.md` §3; `strata/modules.json`; D-10, `modules.md` §3).

## 3. The instance — the state it holds and the transitions it exposes (D-17)

**Six members at two addresses** — the durable record as one value at `['operator-settings']` on the `file` tier, and the volatile pair as one value at `['operator-exclusion']` on `mem` — so each transition is **one** store write and therefore one op, one cursor and one receipt (guide §4 `W-4`, §5.1; ASM-1).

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
| `subscribe` / `unsubscribe` | one listener, one or both addresses | the handle, or its withdrawal | no state moves; an unregistered handle fires nothing (guide §6.2) |

- **A receipt is `{status:'committed', cursor, opId}` or `{status:'refused', reason, message, address}`** — `reason` the store's own status verbatim, `message` the package's generated sentence, and nothing throws across the module boundary (guide §8; D-5). **A refusal leaves the record and the bytes untouched**, the store's own commit restore having run before it crosses, so live equals durable at every terminal (guide §5.4, §9.4; D-17). **`'write-failed'` and `'tier4-closed'` do not survive as write-outcome tokens** (D-16; ASM-3).
- **The exclusion pair boots to the safe pair and is never persisted**, so a crash, a torn record, a corrupt file and a missing file all resolve to it exactly as today (`main.ts`'s construction and boot-read sites — `createSettingsSurface(...)` then `settingsSurface.read()`; ASM-2). **The holder stays and the surface is its sole writer — ASM-4, settled at this layer:** the surface module writes `src/main/tier4-state.ts` at `attach` and on each committed exclusion write, so the holder is the gate's *projection* of the instance's row and never a second home (`src/main/tier4-state.ts:12-18`). Its reader at this head is **outside `src/`**: the unit's own live row `tests/unit/settings-surface/surface.test.ts:196-207`, because E-1 retires the store's two consult sites and E-3 moves the carrier, and no `src/**` file decisions on it — the enforcement truth is the gate's own record (`src/main/security.ts:249-256`, read at `src/main/mcp-server.ts:1243`), so the projection cannot be mistaken for the enforcement path (ASM-4; exception §6).

## 4. The surface module and its channels (D-17, D-18)

`src/main/settings-surface/` constructs the instance, holds **the one reference**, answers the three manual-UI channels, and re-patches the live gate from inside its **listener** — never from a poll or a boot-order re-read (D-17; the `settingsSurface.attach(mcp)` site of `src/main/main.ts`).

| Channel | Constant | Answer | Landed site it replaces |
|---|---|---|---|
| settings read | `IPC_SECURITY_GET` (`src/shared/types.ts:330`) | the record plus the additive `exclusion` and `read` members | the landed arm that answered the read straight off the retired store (E-1) |
| settings write | `IPC_SECURITY_SET` (`:331`) | the post-state superset carrying the **`write`** receipt member | the landed arm that rebuilt the record and saved it itself (E-1) |
| exclusion transition | `IPC_SECURITY_EXCLUSION` (`src/main/store-channels.ts:24`) | `{applied, state}` or `{applied:false, state, reason:'malformed-state'}` | the landed arm that transitioned the gate directly (E-1) |

- **`window.provident` gains no member**: the three routes, their answers and the two additive members stay as `src/main/preload.ts:42-75` declares them, so `preload.ts`'s only move is its `import type` source (§7 C-2, exception §2) (D-18). **The surface renders nothing and answers no MCP drive**, so `provident.dispatch`, `get_rendered_html` and `get_markdown` are unmoved (D-18).
- **Whether the five `data.*` bridge routes answer while the `data` group is off is settled at L2**, in `docs/L2/security-store-storeroom/interface.md`, with the rejected alternative recorded; this layer fixes only that the answer is a clause and not an accident of where the surface is constructed (D-11, `examiner.md` §2).
- **The grant act is documented in a user-facing place**: `README.md` § "The MCP surface" gains a paragraph stating who grants a group, what a grant is, and that it is never an MCP tool — licensed by exception §2 E-4 (D-11, D-18).

## 5. The import-once path (D-19)

**Read at every boot while no record stands, then never again, then never again once a record stands.** The object is `<userData>/provident-security.json`, the one **seeded** file this unit's import arm reads; the members imported are exactly its four record members, and the six boot arms stand over **four decision sites** in `importOnce` — stated in its own contract comment (the `importOnce` docblock of `src/main/operator-settings/index.ts`) and answered at its `readFileSync` arm, its `JSON.parse` arm, its `plain(parsed)` guard and its object row — printed as five rows below, where `unparsable` and `non-object` share a row because both answer the first-run default, and `absent` shares the one `catch` at `:212` with `directory`/`unreadable`. The arms move as **behaviour**, not as bytes (D-16, D-19; **D-25** governs the enumeration — the four record members, the exclusion pair never an import member; `docs/L2/security-store-storeroom/persistence.md` §3).

| Arm | What the import does | Cite |
|---|---|---|
| the file is absent | the first-run default — `token:null`, `enabled:['read','dispatch']`, no cap, no `entries`; the import creates no file | `importOnce`'s `readFileSync` arm — the one `catch` that answers an absent, unreadable or directory-shaped file — in `src/main/operator-settings/index.ts`; D-19 |
| the file is present and an object | each member admitted by the landed rule, foreign keys preserved verbatim into `entries`; **the operator's token, grants, cap and entries survive, and a row proves each** | `importOnce`'s admitted-row arm in `src/main/operator-settings/index.ts`; D-19, D-25 |
| unparsable, or a non-object (`[]`, a string, a number, a boolean) | the first-run default; the bytes left untouched and the import never throws | `importOnce`'s `JSON.parse` arm and its `plain(parsed)` guard in `src/main/operator-settings/index.ts`; D-19 |
| a directory, or unreadable | the first-run default; the import never throws | `importOnce`'s `readFileSync` arm — the one `catch` that answers an absent, unreadable or directory-shaped file — in `src/main/operator-settings/index.ts`; D-19 |
| `entries` not a plain object | treated as absent, the raw value not preserved — the one declared non-verbatim arm | `importOnce`'s `plain(source.entries)` arm in `src/main/operator-settings/index.ts`; D-19 |

- **The import's own red set is this unit's**: a token, granted groups, the cap and arbitrary entries all survive the crossing, `enabled` is deduplicated through the six-member group set, and a refused or absent import leaves a first-run default rather than a silent capability change on upgrade — **the record's four members, as D-25 corrects the enumeration; the exclusion pair is a `mem` row the import never carries** (D-19, D-25).
- **The new shape owns a new name.** The instance's file is **`<userData>/provident-operator-settings.json`**, chosen here; `provident-security.json` is **retired — read at every boot until a record stands and never written again**, its bytes left standing (D-19, D-16; ASM-6). **The store's construction creates the new file** (a provided, absent path is created exclusively, zero-length and empty — guide §9.1), so the persisted set gains a name at construction and not at the first write, and the rows reading it are re-grained, not deleted (D-13; §7 C-4). **The written census is two names** — this file and the central store's `provident-profile.json` (D-22, D-13).
- **`<userData>/provident-settings.json` is not this unit's arm.** D-22 executed that crossing in the sibling `settings-carrier-retirement` unit, which reads the file once and never writes it again; so **this** import arm's object is `provident-security.json` alone, and the settings file has its own arm and its own live declaration there (`docs/L1/settings-carrier-retirement.md` §3, §4; D-19, D-22; ASM-5).

## 6. The isolation invariant, as named absence rows (D-18)

Absence is the control, so each row is stated as **nothing resolves** and driven over a live surface, never inferred from a code read (D-18).

| Id | The absence asserted | Read over |
|---|---|---|
| `ISO-1` | no `provident.data.*` tool reads or writes an operator-settings member or the instance's file | the five tools, both transports |
| `ISO-2` | no MCP resource resolves into the instance | `mcp://provident/app`, `…/targets`, `…/node/{nodeId}` — 3, unmoved |
| `ISO-3` | no `RpcMethod` member names a security member or the instance's file | the 27-member union (`src/shared/types.ts:259-286`) |
| `ISO-4` | no bridge channel carries a security write except the three manual-UI channels | `window.provident`'s **seven** top-level members (`src/main/preload.ts:42-75`) |
| `ISO-5` | exactly **one** construction of the instance exists and the MCP stack holds no reference to it | `main.ts`, `settings-surface/`, `operator-settings/`, `mcp-server.ts`, `security.ts` |
| `ISO-6` | the instance's file name is spelled in no file the MCP stack reaches, so no drive can even name it | `mcp-server.ts`, `data/`, `security.ts` |

**`ISO-1`'s positive half is the sibling's and is driven, not patched**: `provident.data.*` is scoped to the central profile store and its `volatile-path` arm already names `secure.` (`docs/L2/central-data/interface.md` §1; D-13, D-18, D-5). A declared boundary with no row behind it is a claim, not a control (D-18).

## 7. The census and pin set that moves — sited in exception §2

| C | What moves | Who writes it |
|---|---|---|
| **C-1** | the group set's **second live copy**: `VALID_GROUPS` leaves the retired file for `src/main/operator-settings/` with six members, and its two filter sites — the patch's `enabled` and the import's `enabled` — move with it. The **first** copy (`src/main/security.ts:159`) is `mcp-surface`'s and does **not** move | this unit's L4 |
| **C-2** | `preload.ts`'s three receipt **types** — and `secure-panels.ts`'s and `main.ts`'s imports of them — move to the surface module's declaration; `SecuritySettings` stays byte-identical | this unit's L4 |
| **C-3** | `main.ts`'s construction, boot read, flip and carrier move to the surface module; the landed order is **construction < boot read < flip (`settingsSurface.attach(mcp)`) < the window's creation and its `loadFile` < `await mcp.start()`**, so the window precedes the enable while `D-19`'s own order (construction, boot read, gate, flip, enable) is preserved with the window placed inside it, and that order survives unchanged in kind. The boot order is this row's to state: `docs/L1/bundle-boot-seam.md` §5 reads the same seven steps at their sites because B-5 pins them, and L2's `behaviour.md` §10 and L3's `design-settings-surface.md` §5 carried it backwards until each corrected itself against this row — all three point here rather than restate it as a second rule (D-43) | this unit's L4 |
| **C-4** | the persisted-file names: one retired, one added — so D-13's "exactly two persisted files" stops being a true standing pin | this unit's L2 test writer |
| **C-5** | the frozen digests imaging the retired file: `SECURITY_STORE_PIN` and its five `…_PRE_*` terms, plus every reader of them | this unit's L2 test writer, **by retirement**, not re-point |

A count that moves without its row moving is a finding, and a row that moves without a count moving is the same finding read backwards (D-11). **`mcp-surface` 30 and `app-shell` 7 are unmoved** (§4, §6; D-18).

## 8. The L1 battery — twelve scenarios, `tests/e2e/security-store-storeroom/` (this layer's artifact)

| # | Goal | Expected |
|---|---|---|
| S-1 | the instance boots over no file | the first-run default is served; the instance's file exists zero-length; no `provident-security.json` is written |
| S-2 | one committed write is one commit | `write {token}` → one receipt, one cursor, one op id; `read` serves it; no `.tmp`, no lock, no sidecar |
| S-3 | a refusal leaves the previous bytes | a refused write → a `refused` value naming the store's own status; `read` unchanged; the file byte-identical |
| S-4 | the next process serves the same record | identical `read`; grants and cap survive; the exclusion pair re-boots to its declared initial |
| S-5 | **a listener is the change path** | a committed write delivers the subscription with `['operator-settings']`; the gate is re-patched inside the listener; no poll, no boot-order re-read (D-17) |
| S-6 | a listener's throw cannot take the write's answer away | every listener body contains its own refusal; a write whose listener throws still answers its receipt (guide §6.5a) |
| S-7 | the import carries its own red set | a seeded `provident-security.json` with a token, three grants, a cap and one entry imports all four; the first `read` serves them; a row proves each (D-19, D-25) |
| S-8 | the import's absent and corrupt arms | absent, unparsable, non-object and directory-shaped files each import the first-run default, throw nothing, leave the bytes untouched (D-19) |
| S-9 | the old name is never written | after the import and three committed writes, `provident-security.json` is byte-identical to its seed and the new name carries the record (D-19) |
| S-10 | `ISO-1` and `ISO-3` | no `provident.data.*` tool and no `RpcMethod` member reaches a member or the instance's file (D-18) |
| S-11 | `ISO-2`, `ISO-4`, `ISO-5`, `ISO-6` | the three resources, the seven bridge members and the MCP stack's own files hold no reference; exactly one construction exists (D-18) |
| S-12 | two profiles are disjoint | two `userData` overrides carry two instances; a write through one is never served by the other; the group set is six in both |

These twelve are authored in `tests/e2e/security-store-storeroom/` — `scenarios.test.ts` carries S-1..S-9 and S-12, `isolation.test.ts` carries S-10 and S-11 — and the battery reads **12 of 12 green over 2 files** (`npx vitest run tests/e2e/security-store-storeroom/`). It was authored **after** the implementation, so it carries **no red-first evidence**: a red row is a finding against the code or this design, never proof of ordering (`strata/examiner.md` §3; D-10). The seven recovered scenarios are authored beside them, and `security-store-storeroom-scenarios.md` §4-§5 carries the live coverage column.
## 9. Boundaries — what this unit does not claim

- No `provident-storeroom` or `provident-ssr` change; a defect or requirement gap is recorded upstream-owned, with symptom, reproduction, suspected root cause and fix shape, and archived with this unit (D-5). No undo and no rollback surface: `rollback` is not called and nothing operator-visible reverses the record (D-12's posture, unmoved). No operator-visible UI element outside the producing graph (`AGENTS.md` § "Project-wide constraint"; `src/shared/demo-envelope.ts:1-18`).
- No MCP surface and no rendered surface (§6); no second module's carrier (§5); no wholesale test re-layout, only this unit's own rows at claim time (D-10).

## 10. Assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-1 | the durable record stands at **one** address as one object value and the volatile pair at a **second**, so one transition is one write, one op and one receipt | one address for all six members (rev 1's shape), which the package forbids in effect: a `file`-tier write purges the versions it outranks at its own key, so a settings commit would silently reset the `mem` exclusion pair — measured by L2 and filed as `persistence.md` §9 P-3 |
| ASM-2 | the exclusion pair and the tier-4 boolean are `mem` rows, never persisted, booting to the safe pair | a `file` row, which persists the gate's own state and lets a crash or a hand-edited file boot the app open |
| ASM-3 | the surface's vocabulary is the store's own statuses plus its generated sentence | keeping the old closed reason set in front of the store's, which gives one refusal two spellings and hides the store's cause |
| ASM-4 | **SETTLED at rev 3.** `src/main/tier4-state.ts` **stays** as the enforcement path's projection, written only by the surface module at `attach` and on every committed exclusion write, and read at this head only by the unit's own live row (`tests/unit/settings-surface/surface.test.ts:196-207`); no `src/**` file decides on it, so it cannot drift a decision, and the unit that gives the enforcement path a use for it is owed | **retirement with the old store** — the file deleted and the surface consulting its own `mem` row — which reddens the holder's own subject rows (`tests/tier4-arbitrary-storage.test.ts:228-262,988,1126,1432-1434,1931-1940,2702`) outside every class of the exception's §4/§5, so it is a unit of its own and is parked (exception §6); also rejected: the gate reading the instance through a thunk, which puts an instance-shaped reference inside the MCP stack (D-18); or a second flag home, the defect that leaf exists to close |
| ASM-5 | **this unit's** import-once set is **one** file, `provident-security.json`: the crossing is per arm, and `provident-settings.json` has its own arm in `settings-carrier-retirement` (D-22), so `one file` bounds this unit's arm and is no claim that the second file is unowned | importing `provident-settings.json` too, which takes a second module's carrier through this gate (D-1, D-13) |
| ASM-6 | the instance's file is a **new** name, chosen here | reusing `provident-security.json`, which D-19 forbids by name ("the old names are retired, not written") |
| ASM-7 | an L1 delegation reaches **L2 only**; L3 and L4 are the L2 seat's own chain | L1 calling `role_l3_designer`, which crosses a layer wall the preset's tool filter exists to hold (`platform.md` §1, `envelope.md` §1) |
