# L2 — `security-store-storeroom`: the behaviour

- **Layer:** L2 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 10 — §4's empty-patch row is **driven and pinned** by `patch-domain.test.ts` (the unit's only gating integration battery), member for member, and §2's cap row no longer records its minus arm as untaken — that battery pins both signs. The pre-battery status sentence and the owed-"pin" note are gone, and the residual two arms are named as undriven. Rev 9 — §10's closure sentence is scoped to the record: an MCP `module.*` drive writes the app-state address, never the record (`persistence.md` §7). Rev 8 — §9's `ISO-5`/`ISO-6` cells now say what they scan (**references and literals in code, comments stripped**, so the header comment in `src/main/storeroom.ts` is prose and not a reference), and §2's cap row names **both** entry points that reach the arm (`write` and `set`). Rev 7 — §4 gains the **empty patch**'s row (`write({})` refuses `ValueRefusedAtBoundary` with the module's own sentence and `address:null`), stated as the design's reading with the battery's row named as owed, beside the two shape arms no row drives either. Rev 6 — §2's cap row states the sign as the rule (`-Infinity` takes the clear arm, only `+Infinity` refuses), matching `interface.md` §2's check order, and names the arm it does not drive. Rev 5 — §9 re-grains three clauses: `ISO-3` withdraws the identity it asserted (**the union is not the dispatch set** — 27 members, 19 `handleRequest` arms, the eight unanswered named) and gives `TOOL_GROUPS`' keys the **source-read** treatment its own `MUTATING_METHODS` clause already carries (the table is module-private in `src/main/security.ts`); `RQ-1` asserts only what it measures — the group cannot withhold a route — leaving the route's nonexistent answer site to central-data's §5, cited; and the two now state the same absence of the same five arms (D-43). Rev 4 — every live-file offset in this file is replaced by the **site** it measures (D-41); no claim moves. Rev 3 — §10's boot-order restatement is corrected to the tree (the window is created and loaded **before** `mcp.start()`) and now cites L1's `C-3` row instead of restating the order (D-43). Rev 2 — rev 1 is read through this one. The rows that asserted an answer `interface.md` did not declare are re-grained to declared answers: the **construction act and the six import arms** (§1, §3 — declared in `interface.md` §2.1), the **receipt's ordinal** (§2 — `ASM-L2-7`: differences, not an absolute origin), the **`enabled` order** (§2, §3 — `A-5`, and the row now discriminates against `VALID_GROUPS` order), the **carrier's `read` condition** (§10 — `interface.md` §5), the **composition site** (§10 — `main.ts`), and the **transition answer** (§10 — no receipt member, `ASM-L2-4`). §9's four weak cells are re-grained to the import closure with their limits stated in the row. **Status:** DESIGN — the integration battery is filed against this file (D-1 §4)
- **Inputs:** `interface.md` §0/§1/§2/§2.1/§3/§5/§5.1/§6/§7/§8; L1 §3/§4/§5/§6; exception §1/§2/§8; D-5, D-12, D-13, D-16..D-20; the package's shipped guide and declaration at this head (read, never edited — D-5)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; **the declaration** is its `index.d.ts` (D-5)

## 1. A first boot over no file

| Drive | Answer |
|---|---|
| `createOperatorSettings({ userDataDir })`, then `read()` | `token:null`, `enabled:['read','dispatch']`, no `maxJournalLength`, no `entries`, and the safe pair `{exclusion:'mcp-enabled', tier4:false}` (L1 §5; `guide §4`; `interface.md` §2) |
| the same, over `userDataDir` holding nothing | `<userDataDir>/provident-operator-settings.json` **exists and is zero-length**: the store's construction created it, exclusively and empty (`guide §9.1`; `interface.md` §2.1) |
| the same, with `<userDataDir>/provident-security.json` absent | no `provident-security.json` is created, and the boot writes no byte at all (D-19; `interface.md` §2.1) |
| a second `createOperatorSettings` over the same directory, nothing written between | the same record; the boot still writes nothing (`guide §9.1`) |

- **The boot is read-only, so the first write of a process is the store's first op** — which is why the ordinal a commit answers is the store's own and is asserted by difference and never by its absolute value (`interface.md` §2 `ASM-L2-7`; `guide §6.4`).

## 2. A committed write, and the read that re-serves it

| Drive | Expected |
|---|---|
| `write({ token: 't' })` on a first-ever profile | `{ status:'committed', cursor:<an integer>, opId:<the store's own non-empty string> }` (L1 §3; `guide §9.2`; `interface.md` §2) |
| then `write({ token: 't2' })` | committed with **`cursor` exactly one greater** than the previous commit's, `opId` different; `read()` serves `'t2'`; `enabled` unchanged (D-17; `ASM-L2-7`) |
| `write({ enabled: ['data','bogus','read','dispatch','module','graph','code'] })` | committed with **exactly `['data','read','dispatch','module','graph','code']`** — the patch's own order, first occurrence first, a non-group string dropped (D-11, D-15; `A-5`) |
| `write({ maxJournalLength: 12 })` then `write({ maxJournalLength: null })` | committed, then committed with the cap absent (the deleted `src/main/security-store.ts`'s cap arms carried; `interface.md` §2) |
| `write({ maxJournalLength: Number.NaN })` then `write({ maxJournalLength: Number.POSITIVE_INFINITY })` | the `NaN` write **commits** and clears the cap — the landed clear arm; the **`+Infinity`** write is **refused** `ValueRefusedAtBoundary` and nothing lands — the landed refuse arm — and **the sign is the whole rule**: `-Infinity` is `<= 0`, so it takes the CLEAR arm and commits with the cap absent — an arm this row's own drive does not take but which **`patch-domain.test.ts`'s sign row pins on both sides**, through `set` and against a cap that first stands (so the clear is observable rather than indistinguishable from never-written); **Both entry points reach this arm**: `write({ maxJournalLength })` here, and `set({ maxJournalLength })` a hop above — the surface passes the member through to the same instance `write`, so its answer carries the identical refusal as its `write` member — which is why a row covering the cap must drive both (the `write` body's cap arm in `src/main/operator-settings/index.ts`, and the `set` body in `src/main/settings-surface/index.ts`; `interface.md` §2, §3) |
| any committed write | no `.tmp`, no lock, no sidecar and no second name appears beside the file (D-13; `persistence.md` §5) |

- **One transition is one commit**: one write, one op, one cursor and one receipt, because the four `file` members are written as one value at one address (L1 §3; `guide §4` arm `W-4`). **The order row discriminates**: the patch is served in its own order, so an implementation that re-sorts into `VALID_GROUPS` order fails it even though it would pass a patch already written in that order (`A-5`).

## 3. The import-once path carries its own red set (D-19)

The import runs at construction **iff the instance's own file carries no record at `['operator-settings']`**, and it reads `<userDataDir>/provident-security.json` once (D-19; `interface.md` §2.1).

| Seed | What the first `read()` answers |
|---|---|
| absent | the first-run default; no file written; the import is attempted again at the next boot and answers the same (L1 §5; D-19) |
| `{token:'tok',enabled:['graph','read','graph','bogus'],maxJournalLength:12,'x-mine':{'a':1}}` | `token:'tok'`, **`enabled:['graph','read']`** (the seed's own order, deduplicated), the cap `12`, and `entries` carrying `x-mine` verbatim — **the operator's token, grants, cap and an arbitrary entry all survive** (D-19; L1 §5; `A-5`) |
| unparsable bytes | the first-run default, nothing thrown, the seed's bytes byte-identical (L1 §5; the deleted `src/main/security-store.ts`'s unparsable-bytes arm) |
| a non-object (`[1,2,3]`, a string, a number, a boolean) | the same: the first-run default, no throw, the bytes untouched (L1 §5) |
| a directory at that path, or an unreadable file | the same: the first-run default, no throw (L1 §5) |
| `{token:'tok', entries:[1,2]}` | the token imported and **`entries` absent** — the one declared non-verbatim arm, the raw value not preserved (L1 §5; the deleted `src/main/security-store.ts`'s `entries` arm) |
| any of the above, after three committed writes | `provident-security.json` is byte-identical to its seed: **the old name is retired, not written** (D-19; `persistence.md` §1) |

## 4. A refusal is a value, and it leaves the previous bytes

| Drive | Answer |
|---|---|
| `write({ entries: { bad: undefined } })`, or a function or a symbol inside `entries` | `{ status:'refused', reason:'ValueRefusedAtBoundary', message:<string>, address:<the package's own member> }`; the record and the file byte-identical; no cursor minted (`guide §8`, `§10.1`; `interface.md` §3) |
| `write({ entries: { deep: <a cycle> } })` | the same reason word; nothing lands (`guide §10.1`) |
| `write({})` — a patch carrying no own member of either tier | `{status:'refused', reason:'ValueRefusedAtBoundary', message:'the patch names no member of either tier', address:null}`: the module's **own** sentence, no store verb run, no cursor minted, and the record and the bytes unmoved — an empty patch is a refusal, never a no-op, even though every member of `OperatorSettingsPatch` is optional (the `write` body's pre-tier refusal in `src/main/operator-settings/index.ts`; `interface.md` §1, §3 `ASM-L2-5`). **Driven AND pinned**, by `tests/integration/security-store-storeroom/patch-domain.test.ts` — the unit's only **gating** integration battery (authored after D-30's sweep, so it carries no marker and reports as a row, D-40), which pins this arm member for member: `status:'refused'`, `reason:'ValueRefusedAtBoundary'`, **the module's own sentence** `the patch names no member of either tier`, `address` **carried and `null`** (asserted present first, so `null` is an answer and not an omitted property), the record the next read serves equal to the pre-write record, the durable bytes byte-identical, and **no cursor minted** — measured by difference against the next commit, never by an absolute ordinal (`docs/L1/security-store-storeroom-scenarios.md` §5 records the arm as pinned; `interface.md` §1, §3 `ASM-L2-5`). **The honest half stays**: the not-a-plain-object and both-tiers arms still have no row at all |
| any refusal at all | it **returns** — it never throws, for any patch and any state, so no caller of either module sees an exception (L1 §3) |
| a `userDataDir` the store cannot construct under | `read()` answers the first-run default and **every** `write` answers `reason:'FilePathUnreachable'`: no byte and no instance stands, and nothing throws (`guide §8.2`; `interface.md` §2.1) |
| a `file`-tier save that cannot land | `reason:'FileCommitFailed'` with the store's own journal rollback already run, so the bytes are the bytes that stood before (L1 §3; `guide §9.4`) |
| a status outside the three named spellings | **carried verbatim** under the escape arm, never narrowed to a false one (`interface.md` §3 `ASM-L2-3`; `guide §8.1`) |

- **A refused write mints no cursor and adds no change**, and the record the next `read()` answers is the pre-write record, because the module's live state advances only on a committed receipt (`guide §9.4`; L1 §3). **`ContainerKindConflict` and `UnattributedFailure` are declared and unnamed by no row**: the first is reachable only through a boot arm the package does not declare (`persistence.md` §9 P-1), the second only through a throw site this module never supplies (`guide §3.3`, `§8.3`).

## 5. The subscription is the change path

| Drive | Expected |
|---|---|
| `const off = subscribe(listener)`; then `write({ token: 'x' })` | the listener is called **once**, with `['operator-settings']`, inside the write's own call (`guide §6.1`, `§6.4`; D-17) |
| the same, for `write({ exclusion: 'mcp-disabled' })` | the listener is called with `['operator-exclusion']` — the address the act touched (D-17; `guide §6.4`) |
| `write(...)` after `off()` | nothing is delivered, silently — a withdrawn handle fires nothing (`guide §6.2`, `§6.3`) |
| `subscribe(f)` then `subscribe(f)` | two withdrawals, two deliveries; a second `register` on one handle would replace the first, so each `subscribe` owns its own handle (`guide §6.2`) |
| what a subscriber receives | **the triggering address and nothing else** — never the value and never which member moved — so a subscriber reads through `read()` (exception §8 item 2; `interface.md` §2) |
| a refused write | no delivery at all: there is no commit, so nothing is triggered (`guide §6.5`) |

## 6. A listener's throw cannot take the write's answer away

- **The hazard is measured in the package and the module designs around it**: a listener body's throw propagates to the writer and the write answers nothing — the data lands, the answer does not — because a throw is not a commit outcome (`guide §6.5a`). A blind retry then re-applies a write that already succeeded (`guide §6.5a`).

| Drive | Expected |
|---|---|
| `subscribe(() => { throw new Error('boom') })`; then `write({ token: 'y' })` | the write still answers `{status:'committed', cursor, opId}` and `read()` serves `'y'`: the module contains every subscriber's throw inside its own listener body (`guide §6.5a`; `ASM-L2-6`) |
| the same subscriber, then a second `write({ token: 'z' })` | nothing is delivered to it: a throwing subscriber is **withdrawn**, and no later write pays its cost (`ASM-L2-6`; `guide §6.3`) |
| `write` with no subscriber registered | the same receipt, and no delivery is attempted (`guide §6.3` item 1) |
| a second subscriber that does not throw, beside the throwing one | it is delivered on the same write: one subscriber's withdrawal is not the window's failure (`guide §6.5`) |

## 7. The exclusion pair is volatile and boots to the safe pair

| Drive | Expected |
|---|---|
| `read()` on any boot | `exclusion:'mcp-enabled'`, `tier4:false` — never read from a file (ASM-L2-2; the boot read at the `settingsSurface.read()` site in `src/main/main.ts`) |
| `write({ exclusion: 'mcp-disabled' })` | `{status:'committed', …}`, and `read()` answers `'mcp-disabled'` with `tier4:true` — one record, two derived readings (the `ExclusionState` declaration and its one-record-two-derived-readings note in `src/main/security.ts`; D-17) |
| then `write({ token: 'z' })` | the pair is **unmoved**: a `file`-tier write purges only its own key, and the pair stands at its own address (`guide §5.1`; `interface.md` §1 `ASM-L2-1`) |
| then a fresh `createOperatorSettings` over the same directory | the record survives and the pair is back at `'mcp-enabled'`: the pair is never persisted (`persistence.md` §6; ASM-L2-2) |
| any boot, after a crash, a torn record or a hand-edited file | the safe pair — the pair is `mem`, so all four resolve to it (the boot read's `settingsSurface.read()` site in `src/main/main.ts`) |

## 8. Two profiles are disjoint

- Two `userDataDir`s give two instances with two files: a write through one is **never** served by the other, and each carries its own six-member group set (D-13; L1 §8 S-12).
- A `userDataDir` under which the store's own name cannot be occupied refuses every write (`FilePathUnreachable`) and creates nothing (`guide §8.2`; `interface.md` §2.1).

## 9. The isolation absences, and the settled route question (D-18)

Each row is stated as **nothing resolves** and driven over a live surface, over the **import closure** of the files the MCP stack reaches, or over a structural census where the tree offers no runtime artifact. **Where an absence cannot be driven live, the row's own message says so** — it does not pass silently (`examiner.md` §2, D-18).

| Id | The drive | The absence asserted |
|---|---|---|
| `ISO-1` | a real `ProvidentMcpServer` with `data` enabled, all five tools called, and a write at `['secure.token']` | no `data.*` answer creates a byte of the instance's name, and the volatile spelling is refused `volatile-path` — no tool reads or writes a member or the file (D-18; `docs/L2/central-data/interface.md` §1) |
| `ISO-2` | `resources/list` + `resources/templates/list`, and the server's own resource table | exactly the three landed URIs, on the three landed readings; no resource resolves into the instance (D-18) |
| `ISO-3` | the `RpcMethod` union **read from source** (a type erases at build) against the **live answered set**: every union spelling driven through `handleRequest` in `src/renderer/renderer.ts`, which dispatches **19** and throws its `unknown method` default for the rest; plus the imported `DATA_TOOL_NAMES` and `TOOL_GROUPS`' keys **read from source**, because the table is module-private in `src/main/security.ts` | **the union is not the dispatch set, and the row asserts the difference rather than an identity**: **27** declared members against **19** arms, the eight with no arm being the five `data.*` and the three `module.*` members — so the row claims **no** answer for a member the tree does not dispatch, and the `data.*` absence is central-data's §5 clause, cited and never restated (`RQ-1` below says the same of the same five; D-43); **no security-owned spelling is answered at all** — `settings.get`, `operator.write` and any new spelling are outside the union and the default throws for each — and `MUTATING_METHODS` stays seven, a **source read stated as such** (`src/renderer/renderer.ts`), the same treatment `TOOL_GROUPS`' keys get (D-11, D-18, D-26) |
| `ISO-4` | the bridge's declaration **and every `ipcRenderer` call site in `src/**`**, plus `secure-panels.ts`'s `declare global` half | seven top-level members; the security channels number exactly **three** by constant *value*; no other file obtains `ipcRenderer`; and the two lockstep declarations carry the same three routes (A-1; D-18) |
| `ISO-5` | the **transitive import closure** of `mcp-server.ts` and `security.ts` over `src/**`, plus the construction census over all of `src/**` | **no file in the closure carries a REFERENCE to the instance, its module or its constructor once comments are stripped** — the scan reads code, never prose, and the distinction is load-bearing: `src/main/storeroom.ts` names the operator-settings instance in its header comment (honestly, since that file is the package's other importer) while importing nothing of it, and a comment cannot call a constructor; exactly **one** file outside `src/main/operator-settings/` calls `createOperatorSettings(` and it is in `settings-surface/`; exactly one outside `src/main/settings-surface/` calls `createSettingsSurface(` and it is `main/main.ts` — a runtime-composed module path is invisible to the closure and the row says so (D-18) |
| `ISO-6` | the same closure, scanned for the file's name and every fragment of it | zero occurrences **in code, comments stripped**, of `provident-operator-settings`, of `provident-operator`, and of any of the three addresses (`['operator-settings']`, `['operator-app-state']`, `['operator-exclusion']`) — no security-owned name appears in the closure's code, so no drive can even name the file — a comment may name the instance in prose (`src/main/storeroom.ts` does) and compose no path; the closure's `provident-*.json` literal set holds exactly one name, `provident-profile.json`, which is `central-data`'s file and not this unit's, so no third name is available to compose the instance's file out of; a path composed at run time is invisible to a byte scan and the row says so (D-18; `docs/L1/settings-carrier-retirement.md` §6) |
| `RQ-1` | `groupForTool`/`toolAllowed` over the five route spellings | each resolves to **no group**, under `['read','dispatch']` and under `['read','dispatch','data']` alike — so the group **cannot withhold a route**; whether the route then answers is not this row's and is not measured here — **no `data.*` arm stands at this head**, which is central-data's §5 clause, cited and not restated (`interface.md` §6; D-18, D-43) |

- **`RQ-1`'s mechanism, and why the group cannot gate a route** (`interface.md` §6; `A-2`): the group set is read only through `groupForTool`/`toolAllowed`, whose only callers iterate `ALL_TOOLS` and `ALL_RESOURCES` (the `groupForTool`/`toolAllowed` pair in `src/main/security.ts`, and their callers over `ALL_TOOLS`/`ALL_RESOURCES` in `src/main/mcp-server.ts`); the five route spellings are not `TOOL_GROUPS` rows, so they resolve to no group, and a gated route would need a second table and a second enforcement path to change that (D-18). The route's own answer site is central-data's clause and does not stand at this head (D-43). **Rejected: the gated arm** — it has no lawful spelling in the landed gate, and it makes a refusal bug a data leak the moment the second table drifts (D-18).

## 10. The carrier and the live gate (D-17, D-18)

| Drive | Expected |
|---|---|
| `createSettingsSurface({ userDataDir })` then `read()` | `{token:null, enabled:['read','dispatch'], read:null, exclusion:'mcp-enabled'}` — the landed `SecuritySettings & { read, exclusion }` superset, and **`read` is `null` because the read was performed with MCP enabled** (the `createSettingsSurface({ userDataDir })` and boot-read sites in `src/main/main.ts`, and the surface's own `read` body; `interface.md` §5) |
| `attach(server)` then `set({ groups:['graph','data'] })` | the answer carries `write.status:'committed'`, the post-state `enabled`, and `exclusion`; `server.getGateConfig().enabled` holds the granted groups **by the time the answer is minted**, because the re-patch runs inside `attach`'s subscription (D-17; L1 §4) |
| `transition('mcp-disabled')` | `{applied:true, state:'mcp-disabled'}` — **two members, no receipt**, because the bridge declares none (the `setExclusion` declaration in `src/main/preload.ts`; `interface.md` §5.1 `ASM-L2-4`); `server.exclusionSnapshot()` is non-null and `read().exclusion` says `'mcp-disabled'` — one fact, two readers, never two states (the `IPC_SECURITY_EXCLUSION` handler in `src/main/main.ts` and the surface's own `read`; L1 §4) |
| `transition('nonsense')` | `{applied:false, state:<unchanged>, reason:'malformed-state'}`, never a throw, and the gate unmoved (the `transition` body in `src/main/settings-surface/index.ts`, reached through the `IPC_SECURITY_EXCLUSION` handler in `src/main/main.ts`) |
| `read()` while the pair stands at `'mcp-disabled'` | the record is still served and `read` carries the closed `{status:'refused', reason:'tier4-closed', message}` value — the **read** token, never a write outcome (D-16; `interface.md` §3) |
| `set({ token:'q' })` while the pair stands at `'mcp-disabled'` | `write.status:'committed'`: the store's own gate consult is gone (D-16), and the hazard it answered is closed structurally because no MCP path composes the **record** — the `module` group's tools reach `writeAppState` at `['operator-app-state']` and nothing else (`persistence.md` §7; D-18) |
| any file outside `src/main/settings-surface/` | the **composition site is `main.ts` and no other file**: it is the only caller of `createSettingsSurface` in `src/**`, and the instance's single construction lives inside `settings-surface/` (`interface.md` §5 `ASM-L2-8`; D-18) |

- **`attach` is where the boot terminal lands**: before it the gate is untouched, after it the gate's groups equal the record's and its exclusion is the boot `'mcp-enabled'`, and it lands **before the window exists** — in `src/main/main.ts` the flip at the `settingsSurface.attach(mcp)` site precedes the `new BrowserWindow(` site and its `win.loadFile(...)` site, and those precede `await mcp.start()`, so no renderer turn can take its carrier read with the holder still store-open. **The boot order as a whole is L1's row and is cited here, never restated** (L1 §4 and its `C-3` row; `src/main/main.ts`; D-43).
- **The holder's reader, named as a limit rather than left to be discovered**: after E-1 retires the store's two consult sites and E-3 moves the carrier, `src/main/tier4-state.ts`'s holder is **written by this module and read by nothing in `src/**` at this head**, so the projection is written and unread. The write stands because E-3 licences it by name and the contract declares the surface its sole producer (L1 §3 ASM-4; exception §2 E-3); the missing reader is **owed to the unit that next gives the enforcement path a use for it**, and it is recorded here because it is a claim about the enforcement path and not a defect in the write (D-18).

## 11. Assumptions

Every assumption behind these rows is `interface.md` §7's table (`A-1`, `A-2`, `A-4`, `A-5`, `ASM-L2-1`..`ASM-L2-8`), each with the alternative it rejected; no row here depends on one this file does not name (`interface.md` §7; exception §1).
