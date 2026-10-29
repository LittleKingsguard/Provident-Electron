# L2 — `settings-carrier-retirement`: the behaviour

- **Layer:** L2 · **Unit:** `settings-carrier-retirement` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — the integration battery is filed against this file (D-1, `examiner.md` §3)
- **Inputs:** `interface.md` §1–§8; `docs/L1/settings-carrier-retirement.md` §3–§8; `docs/L2/security-store-storeroom/behaviour.md` §1/§3/§7/§10 (the sibling's boot, import, pair and carrier rows, which this file extends and never re-drives); D-5, D-10, D-13, D-16…D-22; the package's shipped guide at this head (read, never edited — D-5)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; the instance's file, tier rules and admitted tree are the sibling `persistence.md`'s (§2–§5)

## 1. The boot: three readings, no third holder

| Drive | Expected |
|---|---|
| `createSettingsSurface({ userDataDir })`, then `state()` | `{rows:[], legacy:'absent', unrepresentable:[], storage:'standing'}` over a profile holding no retired file and no record (L1 §4; `interface.md` §2) |
| then `read()` | the sibling's first-run answer, unmoved: `token:null`, `enabled:['read','dispatch']`, the safe pair (sibling §1; D-16) |
| a second `state()` in the same process | the same answer, and **no file is read twice**: the import ran at most once, at construction (L1 §4; `guide §6`) |
| `state()` over a store construction the package refused | `rows:[]`, `storage:'unreachable'`, nothing thrown (sibling §2.1; `guide §8.2`) |

- **`main.ts` holds no copy of the rows.** The retired third holder is gone, so every reader asks the surface on the call it serves, and the boot order is unmoved in kind: construction → boot read → gate → flip → `start()` → window (L1 §3/§5; `src/main/main.ts:108-115,527,545`).
- **One boot read feeds the gate, and it is the sibling's `read()`** — this unit adds a second read of the same construction and moves nothing about the first (D-16, D-22).

## 2. `STORE_FILE_GET` serves the rows, cold or warm

| Drive | Answer |
|---|---|
| Y-1 over a seeded retired record whose rows are `file.tabs.order`, `file.settings.theme.token`, `file.modules.<id>` | those three `{name, value}` rows, **names verbatim**, in the retired file's own order (L1 §3/§8 S-2; `interface.md` §4) |
| Y-1 twice in one realm | the same rows both times, served from the instance; the second call reads no file (L1 §3) |
| Y-1 over a cold profile | `[]` — never a throw, never an invented row (L1 §8 S-4; `guide §4`) |
| Y-1 over a corrupt import arm | `[]`, and the diagnosis stands on `state().legacy` rather than in the answer (L1 §4; `interface.md` §4) |
| Y-1 after a committed `commit` | the rows that commit wrote, whole (L1 §3; §3 below) |
| any Y-1 answer | no `schemaVersion` row appears, and no `mem.*`/`temp.*`/`secure.*` name appears (L1 §3; D-13) |

- **What Y-1 answers is a copy**: a caller that mutates its answer moves neither the record nor the next answer (`guide §10`; sibling §2).

## 3. `STORE_FILE_PUT` is one whole-map commit

| Drive | Answer |
|---|---|
| `put({ name:'ignored', value: JSON.stringify({ 'file.tabs.order':['a','b'], 'mem.x':1, 'secure.token':'s' }) })` | `{status:'committed'}`, and the record afterwards holds **exactly** `file.tabs.order` — the `mem.`/`secure.` spellings never land (L1 §3; `guide §4` arm `W-4`) |
| then `put` a translation carrying only `file.layout.dock` | `{status:'committed'}`, and the record now holds **only** that row: a commit is a **whole-map replacement**, as it is today (`A-6`; L1 §3) |
| `put` a translation carrying `{'file.tabs.order': null}` | `{status:'refused', reason:'ValueRefusedAtBoundary', …}` — the store's status verbatim — and the previous rows stand unchanged (L1 §3 ASM-2; `guide §10.1`/§10.2) |
| `put({ value:'not json' })`, `put({ value: 7 })`, `put(null)`, `put({ value:'[1,2]' })` | `{status:'refused', reason:'malformed-payload'}`, decided **before** any store call (L1 §3; `interface.md` §4) |
| `put` over a profile whose store construction refused | `{status:'refused', reason:'FilePathUnreachable', …}` — the store's own status, verbatim (sibling §2.1; L1 §3 ASM-2) |
| any refusal | the previous rows stand, the bytes are unchanged and no cursor is minted (L1 §3; `guide §9.4`) |
| any committed `put` | nothing beyond the instance's own file appears: no `.tmp`, no lock, no second name — the staging machinery retired with the carrier (L1 §3; sibling `persistence.md` §5) |

- **`A-6`, and it is the landed semantics rather than a new one:** the crossing's `value` is the whole graph's stable translation (`src/renderer/store-core-graph.ts:1070`), so the projection of its `file.*` keys *is* the record; a caller that sends one row leaves one row standing. This unit changes the writer, not the crossing (D-22; L1 §3).
- **A commit is one store write**, so a committed Y-2 is one op, one cursor and one receipt, and its answer carries no ordinal because the channel's answer is a bridge shape this unit does not move (`interface.md` §3 `ASM-L2-4`).

## 4. The module surface keeps every member and every answer

| Drive | Expected |
|---|---|
| `list()` / `get(name)` after a Y-2 commit that carried `file.modules.<id>` | the record is served from the same rows Y-1 serves, so the two realms cannot disagree (L1 §3; D-22) |
| `put(record)` on a valid record | the record it composed, with `hash` derived from its own `source`; the row stands at `file.modules.<name>` (D-22; `src/main/main.ts:239-263`) |
| `put` a record named `tabs` | `reserved-namespace` refusal thrown as today, and **no commit** is issued (D-22; `src/main/main.ts:247-249`) |
| `remove(name)` where the row stands | `true`, and the row is gone from the served rows (L1 §3) |
| `remove(name)` where no row stands | `false`, and **no commit** is issued (L1 §8 S-12; `src/main/main.ts:264-273`) |
| `setDisabled(name, true)` where the row stands | no answer; the row's `disabled` is `true` on the next `get` (L1 §3) |
| `status()` | `quarantined`/`loaded` derived from `sha256(source)` as landed; `corrupt` is `legacy === 'corrupt' \|\| storage === 'unreachable'` (L1 §3 `ASM-L2-3`; D-22) |
| `status()` over a profile whose retired file was valid | `corrupt:false` — a landed import is not a corruption (L1 §4) |
| any member's write | **one** commit of the whole composed map; no member writes a second time and no member answers a receipt (`ASM-L2-5`; L1 §3) |

- **Composition is `main.ts`'s and validation is not**: a record's own members are the landed one's, so `quarantined` is composed per process and never migrated (L1 §1; D-22).
- **The in-process answer now equals the post-restart answer**: a member whose value is `undefined` is absent from the served row, because the record the store holds is the rows' JSON image (`ASM-L2-2`; `persistence.md` §3).

## 5. The Q-5 migration writes once, through the same verb

| Drive | Expected |
|---|---|
| a profile holding `provident-modules.json` with two registry records and a retired carrier with one `file.*` row | one `commit` of `{the carrier's row} ∪ {file.modules.<id> for each legacy record}`, then the legacy registry is removed as landed (L1 §3; `src/main/main.ts:173-192`) |
| the same, with no legacy registry | no commit at all: the migration's write happens only when it has records to land (L1 §3; `src/main/main.ts:176`) |
| the same, with a legacy registry whose record carries `quarantined: undefined` | the record lands **without** that member (the JSON image drops it), and the commit commits — never a whole-value refusal (`ASM-L2-2`; `guide §10.2`) |
| the migration's composition | carries **no** `schemaVersion`, and the `provident-modules.json` read and its post-boot removal are unmoved (L1 §3) |

- **The inherited hazard is named and not repaired here**: the legacy registry is removed whether or not the commit committed, exactly as landed; a store refusal therefore loses the legacy records it had read. It is owed to the parked module-registry pass (D-22), and this unit moves the write without changing that order (L1 §3; `A-7`).

## 6. Boot parity is proven by a second construction, never by a substring

| Drive | Expected |
|---|---|
| surface A: `set({token:'t', groups:['graph','data'], maxJournalLength:41})`, then `commit([{name:'file.tabs.order', value:['a']}, {name:'file.modules.m1', value:{…}}, {name:'file.settings.theme.token', value:'dark'}])` | both acts commit (L1 §5) |
| surface B: a fresh `createSettingsSurface` over the **same** `userDataDir` | `read()` serves `token:'t'`, `enabled:['graph','data']`, `maxJournalLength:41`; `state().rows` deep-equals A's three rows; `legacy:'recorded'`; `unrepresentable:[]` (L1 §5; `interface.md` §2 `ASM-L2-1`) |
| the same B, `read().exclusion` | `'mcp-enabled'` — the **declared initial**, not A's last value: the pair is `mem` and is never persisted (sibling §7; D-17) |
| the same B, `state()` | `rows` in A's committed order, whole (L1 §5) |
| three writes through A, then a boot | the retired file's sha256 is identical to its seed (L1 §8 S-3; D-19's precedent) |

- **Parity is a record, never a token scan**: a row that greps a source file for a member name proves nothing about a restart, which is why every limb above reads a **constructed** surface (L1 §5; D-22).

## 7. The second import-once arm carries its own red set

The arm runs at construction **iff no record stands at `['operator-app-state']`**, and it is the retired boot read's own validation (L1 §4; `persistence.md` §4).

| Seed at `<userDataDir>/provident-settings.json` | What the first `state()` answers |
|---|---|
| absent | `rows:[]`, `legacy:'absent'`, `unrepresentable:[]`, and no byte is written (L1 §4; `guide §4`) |
| `{"schemaVersion":"1","file.tabs.order":["a","b"],"file.settings.theme.token":"dark"}` | both rows **verbatim under their own names**, `legacy:'imported'`, and `schemaVersion` **not** carried (L1 §4; D-13) |
| unparsable bytes | `rows:[]`, `legacy:'corrupt'`, the bytes byte-identical, nothing thrown (L1 §4; `behaviour.md` §2) |
| a non-object (`[1,2]`, `"x"`, `7`, `true`, `null`) | the same corrupt answer and the same untouched bytes (L1 §4) |
| an object with a foreign top-level key (`{"mine":1}`) or with no `schemaVersion`, or with `schemaVersion:'2'` | the same corrupt answer: the retired read's validation is the import's (`ASM-L2-7`; L1 §4 ASM-3) |
| a directory at that path, or an unreadable file | the same corrupt answer, no throw (L1 §4) |
| `{"schemaVersion":"1","file.tabs.order":null,"file.layout.dock":"left"}` | **`file.layout.dock` imported and `file.tabs.order` answered by name in `unrepresentable`** — never silently dropped (L1 §4; `guide §10.1`) |
| any of the above, after three commits | the retired file's bytes are identical to the seed: **the import writes no byte** (L1 §8 S-3; D-19) |
| a second construction over the same directory, nothing written between | the import runs again and answers the same rows — the marker is a record, and nothing wrote one (`persistence.md` §4; L1 §4) |
| a second construction **after** a commit | `legacy:'recorded'` and the committed rows: the marker now stands (L1 §4; `ASM-L2-1`) |

- **`ASM-L2-7`: the validation is the retired boot read's, carried whole** — a JSON object whose keys are `file.*` plus the single reserved `schemaVersion === '1'` (`src/main/main.ts:139-161`; L1 §4 ASM-3).

## 8. The retirement's absences, and the one row this unit adds

| Id | The drive | The absence asserted |
|---|---|---|
| `RET-1` | a byte scan of `src/**` for each retired verb and for the carrier's path composition | no file in `src/**` writes, renames, fsyncs or reads the carrier's path; `src/main/main.ts` holds no `writeFileSync`/`renameSync`/`fsyncSync`/`openSync`/`closeSync`/`mkdirSync` at all, and no `settingsPath` (L1 §3/§8 S-1; D-22) |
| `RET-2` | the same scan for the literal | the retired name is spelled **once** in `src/main/operator-settings/index.ts` and nowhere else, and its single `fs` call is a `readFileSync` (L1 §3; `RET-3`) |
| `RET-3` | the instance module's `readFileSync` census | exactly **two** import-once reads — the security record's and this one — and no write, rename or remove call (L1 §6; D-19) |
| `RET-4` | the two channel names, by constant value, and the two `invoke` sites | `STORE_FILE_GET`/`STORE_FILE_PUT` keep their spellings, their handler registrations and their two `invoke` sites; no channel is added or renamed (L1 §2; D-18) |
| `RET-5` | the written-name census over a settled profile | the two written names and the seeded retired names declared beside them; no third written name (L1 §6; D-13) |
| `ISO-7` | a committed rows map carrying `file.modules.<id>` (the whole-map commit the three module members issue), then `read()` and the instance's file bytes; plus the module tool names, `RpcMethod` members and bridge routes read as data | the security record at `['operator-settings']` is unchanged, the exclusion pair is unmoved, and the app-state record is the only one that moved; no `provident.module.*` tool, `RpcMethod` member or bridge route names either the record's address or the exclusion address (L1 §7; D-18) |

- **`ISO-7`'s live limb drives the instance's declared surface, and its message says so**: `main.ts` imports `electron` at module scope and no node-suite row can construct its module surface, so the three members themselves are driven by L1's e2e `S-12` on a booted app and by a source read here — the row never passing silently on the half it cannot reach (`examiner.md` §2; L1 §8 S-12).
- **`RET-1`'s own limit, stated in the row**: a path composed at run time is invisible to a byte scan; what the row can see is that no literal and no write verb stands where the carrier stood (D-18; sibling `behaviour.md` §9 `ISO-6`).

## 9. Assumptions

Every assumption behind these rows is `interface.md` §7's table (`A-1`…`A-3`, `ASM-L2-1`, `ASM-L2-3`…`ASM-L2-6`) plus this file's `A-6`, `A-7` and `ASM-L2-2`, each with the alternative it rejected; `A-6` is §3's whole-map rule (rejected: merging a crossing into the rows that stand, which invents a write the retired channel never performed) and `A-7` is §5's inherited migration order (rejected: withholding the legacy removal until the commit committed, which repairs a parked consumer's order inside the checkpoint — D-22).
