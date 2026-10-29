# L2 — `security-store-storeroom`: the behaviour

- **Layer:** L2 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 2 — rev 1 is read through this one. The rows that asserted an answer `interface.md` did not declare are re-grained to declared answers: the **construction act and the six import arms** (§1, §3 — declared in `interface.md` §2.1), the **receipt's ordinal** (§2 — `ASM-L2-7`: differences, not an absolute origin), the **`enabled` order** (§2, §3 — `A-5`, and the row now discriminates against `VALID_GROUPS` order), the **carrier's `read` condition** (§10 — `interface.md` §5), the **composition site** (§10 — `main.ts`), and the **transition answer** (§10 — no receipt member, `ASM-L2-4`). §9's four weak cells are re-grained to the import closure with their limits stated in the row. **Status:** DESIGN — the integration battery is filed against this file (D-1 §4)
- **Inputs:** `interface.md` §0-§8; L1 §3/§4/§5/§6; exception §1/§2/§8; D-5, D-12, D-13, D-16..D-20; the package's shipped guide and declaration at this head (read, never edited — D-5)
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
| `write({ maxJournalLength: 12 })` then `write({ maxJournalLength: null })` | committed, then committed with the cap absent (`src/main/security-store.ts:365-377` carried; `interface.md` §2) |
| `write({ maxJournalLength: Number.NaN })` then `write({ maxJournalLength: Number.POSITIVE_INFINITY })` | the `NaN` write **commits** and clears the cap — the landed clear arm; the `Infinity` write is **refused** `ValueRefusedAtBoundary` and nothing lands — the landed refuse arm (`src/main/security-store.ts:365-377`; `interface.md` §2, §3) |
| any committed write | no `.tmp`, no lock, no sidecar and no second name appears beside the file (D-13; `persistence.md` §5) |

- **One transition is one commit**: one write, one op, one cursor and one receipt, because the four `file` members are written as one value at one address (L1 §3; `guide §4` arm `W-4`). **The order row discriminates**: the patch is served in its own order, so an implementation that re-sorts into `VALID_GROUPS` order fails it even though it would pass a patch already written in that order (`A-5`).

## 3. The import-once path carries its own red set (D-19)

The import runs at construction **iff the instance's own file carries no record at `['operator-settings']`**, and it reads `<userDataDir>/provident-security.json` once (D-19; `interface.md` §2.1).

| Seed | What the first `read()` answers |
|---|---|
| absent | the first-run default; no file written; the import is attempted again at the next boot and answers the same (L1 §5; D-19) |
| `{token:'tok',enabled:['graph','read','graph','bogus'],maxJournalLength:12,'x-mine':{'a':1}}` | `token:'tok'`, **`enabled:['graph','read']`** (the seed's own order, deduplicated), the cap `12`, and `entries` carrying `x-mine` verbatim — **the operator's token, grants, cap and an arbitrary entry all survive** (D-19; L1 §5; `A-5`) |
| unparsable bytes | the first-run default, nothing thrown, the seed's bytes byte-identical (L1 §5; `src/main/security-store.ts:114-120`) |
| a non-object (`[1,2,3]`, a string, a number, a boolean) | the same: the first-run default, no throw, the bytes untouched (L1 §5) |
| a directory at that path, or an unreadable file | the same: the first-run default, no throw (L1 §5) |
| `{token:'tok', entries:[1,2]}` | the token imported and **`entries` absent** — the one declared non-verbatim arm, the raw value not preserved (L1 §5; `src/main/security-store.ts:101-111`) |
| any of the above, after three committed writes | `provident-security.json` is byte-identical to its seed: **the old name is retired, not written** (D-19; `persistence.md` §1) |

## 4. A refusal is a value, and it leaves the previous bytes

| Drive | Answer |
|---|---|
| `write({ entries: { bad: undefined } })`, or a function or a symbol inside `entries` | `{ status:'refused', reason:'ValueRefusedAtBoundary', message:<string>, address:<the package's own member> }`; the record and the file byte-identical; no cursor minted (`guide §8`, `§10.1`; `interface.md` §3) |
| `write({ entries: { deep: <a cycle> } })` | the same reason word; nothing lands (`guide §10.1`) |
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
| `read()` on any boot | `exclusion:'mcp-enabled'`, `tier4:false` — never read from a file (ASM-L2-2; `src/main/main.ts:109-113`) |
| `write({ exclusion: 'mcp-disabled' })` | `{status:'committed', …}`, and `read()` answers `'mcp-disabled'` with `tier4:true` — one record, two derived readings (`src/main/security.ts:98-101`; D-17) |
| then `write({ token: 'z' })` | the pair is **unmoved**: a `file`-tier write purges only its own key, and the pair stands at its own address (`guide §5.1`; `interface.md` §1 `ASM-L2-1`) |
| then a fresh `createOperatorSettings` over the same directory | the record survives and the pair is back at `'mcp-enabled'`: the pair is never persisted (`persistence.md` §6; ASM-L2-2) |
| any boot, after a crash, a torn record or a hand-edited file | the safe pair — the pair is `mem`, so all four resolve to it (`src/main/main.ts:109-113`) |

## 8. Two profiles are disjoint

- Two `userDataDir`s give two instances with two files: a write through one is **never** served by the other, and each carries its own six-member group set (D-13; L1 §8 S-12).
- A `userDataDir` under which the store's own name cannot be occupied refuses every write (`FilePathUnreachable`) and creates nothing (`guide §8.2`; `interface.md` §2.1).

## 9. The isolation absences, and the settled route question (D-18)

Each row is stated as **nothing resolves** and driven over a live surface, over the **import closure** of the files the MCP stack reaches, or over a structural census where the tree offers no runtime artifact. **Where an absence cannot be driven live, the row's own message says so** — it does not pass silently (`examiner.md` §2, D-18).

| Id | The drive | The absence asserted |
|---|---|---|
| `ISO-1` | a real `ProvidentMcpServer` with `data` enabled, all five tools called, and a write at `['secure.token']` | no `data.*` answer creates a byte of the instance's name, and the volatile spelling is refused `volatile-path` — no tool reads or writes a member or the file (D-18; `docs/L2/central-data/interface.md` §1) |
| `ISO-2` | `resources/list` + `resources/templates/list`, and the server's own resource table | exactly the three landed URIs, on the three landed readings; no resource resolves into the instance (D-18) |
| `ISO-3` | the union's member census **plus the live answered set**: `handleRequest`'s dispatch arms, `TOOL_GROUPS`' keys and `DATA_TOOL_NAMES`, all imported | the union is **exactly the set the tree answers**, so a member no dispatch arm and no group row carries — `settings.get`, `operator.write`, any new spelling — fails the row; and `MUTATING_METHODS` stays seven, which is a **source read stated as such**, because the set is not exported (D-11, D-18) |
| `ISO-4` | the bridge's declaration **and every `ipcRenderer` call site in `src/**`**, plus `secure-panels.ts`'s `declare global` half | seven top-level members; the security channels number exactly **three** by constant *value*; no other file obtains `ipcRenderer`; and the two lockstep declarations carry the same three routes (A-1; D-18) |
| `ISO-5` | the **transitive import closure** of `mcp-server.ts` and `security.ts` over `src/**`, plus the construction census over all of `src/**` | no file in the closure names the instance, its module or its constructor; exactly **one** file outside `src/main/operator-settings/` calls `createOperatorSettings(` and it is in `settings-surface/`; exactly one outside `src/main/settings-surface/` calls `createSettingsSurface(` and it is `main/main.ts` — a runtime-composed module path is invisible to the closure and the row says so (D-18) |
| `ISO-6` | the same closure, scanned for the file's name and every fragment of it | zero occurrences of `provident-operator-settings`, and no `provident-` literal at all in the closure, so no drive can even name the file; a path composed at run time is invisible to a byte scan and the row says so (D-18) |
| `RQ-1` | `groupForTool`/`toolAllowed` over the five route spellings | each resolves to **no group**, under `['read','dispatch']` and under `['read','dispatch','data']` alike — so the group cannot withhold a route and the five answer while it is off (`interface.md` §6; D-18) |

- **`RQ-1`'s mechanism, and why the routes answer** (`interface.md` §6; `A-2`): the group set is read only through `groupForTool`/`toolAllowed`, whose only callers iterate `ALL_TOOLS` and `ALL_RESOURCES` (`src/main/security.ts:52-69`; `src/main/mcp-server.ts:531-567,619-631`); the five route spellings are not `TOOL_GROUPS` rows, so they resolve to no group and a gated route would need a second table and a second enforcement path (D-18). **Rejected: the gated arm** — it has no lawful spelling in the landed gate, and it makes a refusal bug a data leak the moment the second table drifts (D-18).

## 10. The carrier and the live gate (D-17, D-18)

| Drive | Expected |
|---|---|
| `createSettingsSurface({ userDataDir })` then `read()` | `{token:null, enabled:['read','dispatch'], read:null, exclusion:'mcp-enabled'}` — the landed `SecuritySettings & { read, exclusion }` superset, and **`read` is `null` because the read was performed with MCP enabled** (`src/main/main.ts:427-443`; `interface.md` §5) |
| `attach(server)` then `set({ groups:['graph','data'] })` | the answer carries `write.status:'committed'`, the post-state `enabled`, and `exclusion`; `server.getGateConfig().enabled` holds the granted groups **by the time the answer is minted**, because the re-patch runs inside `attach`'s subscription (D-17; L1 §4) |
| `transition('mcp-disabled')` | `{applied:true, state:'mcp-disabled'}` — **two members, no receipt**, because the bridge declares none (`src/main/preload.ts:64`; `interface.md` §5.1 `ASM-L2-4`); `server.exclusionSnapshot()` is non-null and `read().exclusion` says `'mcp-disabled'` — one fact, two readers, never two states (`src/main/main.ts:398-443`; L1 §4) |
| `transition('nonsense')` | `{applied:false, state:<unchanged>, reason:'malformed-state'}`, never a throw, and the gate unmoved (`src/main/main.ts:472-483`) |
| `read()` while the pair stands at `'mcp-disabled'` | the record is still served and `read` carries the closed `{status:'refused', reason:'tier4-closed', message}` value — the **read** token, never a write outcome (D-16; `interface.md` §3) |
| `set({ token:'q' })` while the pair stands at `'mcp-disabled'` | `write.status:'committed'`: the store's own gate consult is gone (D-16), and the hazard it answered is closed structurally because no MCP path reaches the instance (D-18) |
| any file outside `src/main/settings-surface/` | the **composition site is `main.ts` and no other file**: it is the only caller of `createSettingsSurface` in `src/**`, and the instance's single construction lives inside `settings-surface/` (`interface.md` §5 `ASM-L2-8`; D-18) |

- **`attach` is where the boot terminal lands**: before it the gate is untouched, after it the gate's groups equal the record's and its exclusion is the boot `'mcp-enabled'`, and the landed order — construction, boot read, flip, `mcp.start()`, window — survives unchanged in kind (L1 §4; L1 §7 C-3).
- **The holder's reader, named as a limit rather than left to be discovered**: after E-1 retires the store's two consult sites and E-3 moves the carrier, `src/main/tier4-state.ts`'s holder is **written by this module and read by nothing in `src/**` at this head**, so the projection is written and unread. The write stands because E-3 licences it by name and the contract declares the surface its sole producer (L1 §3 ASM-4; exception §2 E-3); the missing reader is **owed to the unit that next gives the enforcement path a use for it**, and it is recorded here because it is a claim about the enforcement path and not a defect in the write (D-18).

## 11. Assumptions

Every assumption behind these rows is `interface.md` §7's table (`A-1`, `A-2`, `A-4`, `A-5`, `ASM-L2-1`..`ASM-L2-8`), each with the alternative it rejected; no row here depends on one this file does not name (`interface.md` §7; exception §1).
