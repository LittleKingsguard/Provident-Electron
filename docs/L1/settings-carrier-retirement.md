# L1 — the old settings carrier retired into the instance

- **Layer:** L1 · **Unit:** `settings-carrier-retirement` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** CLOSED — the carrier is retired: `provident-settings.json` is imported once and never written again (§3, §4), and `strata/.strata/units/settings-carrier-retirement.json` holds `done` with `carrier-retired` among its artifacts (D-22) · **Ceiling:** 150 lines (class max) (D-1, D-2)
- **Charter:** D-22 is the scope: this unit is **the checkpoint** — the carrier retires; the gate's exclusion/tier-4 enforcement, the module registry and the journal-length consumers moving onto the instance as state engine are **parked**
- **Inputs:** `strata/brief.md` §2/§3/§6; `strata/decisions.md` D-5, D-10, D-13, D-16…D-22; `strata/modules.md` §1/§3; `strata/platform.md` §4; `docs/L1/security-store-storeroom.md` §5/§6/§8; the tree at `e3b59d5`

## 1. What this unit is, and the one thing it is not

`<userData>/provident-settings.json` is the app's hand-written tier-1 carrier: a boot read, a guarded second read at the Y-1 channel, one tmp+rename+fsync writer, and every `file.*` row the operator and the renderer own — the module registry (Q-5's `file.modules.<id>`), `file.tabs.*`, `file.layout.*`, `file.settings.*`, `file.window.*`. The instance already holds the security record (`['operator-settings']` `file`, `['operator-exclusion']` `mem`) and already imports the retired `provident-security.json` once (D-16, D-17, D-19; the instance's `importOnce` arm and its `RETIRED_NAME` constant, in `src/main/operator-settings/index.ts`).

**This unit imports the second retired file once, then owns those rows in the instance and never writes that file again** (D-22, D-19's precedent). It **moves reads and writes; it does not reimplement a consumer**: the module registry's members, hash re-verification, `reserved-namespace` refusal and quarantine stay exactly as landed (D-22).

## 2. The module map — two rows re-declared, no path moves (D-14, `platform.md` §4)

| Row | What moves | N |
|---|---|---|
| `operator-settings` | no path moves; gains this unit's two battery subtrees; exposes **two** more value names (the app-state read and its whole-map write) | **10 → 12** |
| `settings-surface` | no path moves; delegates two verbs and therefore consumes the same two (D-14 counts both sides) | **15 → 19** |
| `app-shell` | no path and **no channel** moves: `STORE_FILE_GET`/`STORE_FILE_PUT` keep their names, answers and two `invoke` sites | **7**, unmoved |

The unit's batteries are claimed by `operator-settings` — `tests/integration/settings-carrier-retirement/` (L2's), `tests/unit/settings-carrier-retirement/` (L3's) and `tests/e2e/settings-carrier-retirement/` (this layer's) — because the artifact under test is the instance's durable record; `tests/e2e/` is L1's own artifact by write scope and its rows sit on that row so the map resolves them (`strata/brief.md` §3; `strata/modules.json`; D-10, `modules.md` §3).

## 3. The retirement's exact surface (D-22)

**Removed, site by site** — `src/main/main.ts` only, and the list is closed (measured at `e3b59d5`):

| Site | What it is |
|---|---|
| `:7` | the `node:fs` write half (`writeFileSync`, `renameSync`, `mkdirSync`, `openSync`, `closeSync`, `fsyncSync`) and the record's reader (`existsSync`, `readFileSync`); `rmSync` stays for the Q-5 removal, `dirname` leaves with the writer |
| `:123` | `const settingsPath` — the carrier's path |
| `:129`, `:132` | `bootRecord`, `settingsCorrupt` — the third holder and its corrupt flag |
| `:134-164` | `readSettingsRecord()`, the boot read that calls it, and the two assignments it makes |
| `:201-218`, `:212`, `:237` | `moduleRecordsOf`/`modulePayloadWith`'s `bootRecord` arms and the module surface's `bootRecord === null` / `settingsCorrupt` reads (the members themselves stay) |
| `:315-316` | the Y-1 handler's guarded second file read |
| `:366` | the `schemaVersion` stamp |
| `:373-398` | `commitSettingsWrite()` whole — the tmp+rename+fsync writer, `:384-390` its five fs calls |

**No other site in `src/**` reads or writes that path, and each is named so no reader takes silence for a move**: `src/main/store-channels.ts` (two channel-name constants), `src/main/preload.ts:135,138` (two `invoke`s), `src/main/security.ts` and `src/main/tier4-state.ts` (no file edge at all), `src/main/module-store.ts` (its own `path`; main.ts uses it for the Q-5 *legacy* read only), `src/renderer/**` (`bridge.store.get/put`, a consumer that never touches a path).

**What replaces each read** — one reading of the instance's durable app-state record, served through the surface, with the shape each caller already expects unchanged:

| The read | Replaced by |
|---|---|
| the boot read (the third holder) | `settingsSurface.state()` — the rows plus the import arm's answer |
| Y-1 `STORE_FILE_GET` → `{name,value}[]` | the same answer minted from those rows (cold `[]`, never a throw) |
| `moduleSurface.get/list/status` | the same members over the same rows |
| `settingsCorrupt` | the import answer: `legacy === 'corrupt'` or the instance's refused construction |

**What replaces each write** — one store write, one receipt (D-17):

| The write | Replaced by |
|---|---|
| Y-2 `STORE_FILE_PUT` (the projection of every `file.*` key) | one write of the whole rows list — an **ordered** `{name,value}[]`, because the package does not preserve object member order across the crossing (measured by L2 as finding `P-2`); the answer stays `{status:'committed'}` or a `refused` receipt whose `reason` is **the store's own status verbatim**, `'malformed-payload'` remaining the channel's pre-write refusal (ASM-2) |
| `moduleSurface.put/remove/setDisabled` | the same members composing a new rows map and issuing that same one write |
| the Q-5 migration's one atomic write | the same one write; the `provident-modules.json` read and its post-boot removal are unmoved |

**The address — ASM-1.** The rows live at `['operator-app-state']` on the `file` tier, beside `['operator-settings']` and not inside that record's `entries`: a `file`-tier write purges only at its own key (measured, `docs/L1/security-store-storeroom.md` §10 ASM-1), so the separation is structural, and the record the token lives in never appears in a value the module tools' path composes (D-18).

## 4. The second import-once arm (D-19, D-22)

Marker: **the absence of a record at `['operator-app-state']`**. The arm runs only while that record is absent, reads `<userData>/provident-settings.json` **at most once per boot and writes no byte** — of the retired file, of the instance's file, of anything: the rows stand in memory until an ordinary write supersedes them, as the security import's overlay does. Its validation is the **retired boot read's own**, so what the old code loaded is what the new one imports: a JSON object whose keys are `file.*` plus the single reserved `schemaVersion`, stamped `'1'`.

| Arm | What it does | What is preserved / lost |
|---|---|---|
| **recorded** | a record already stands at the address: no import runs, `legacy:'recorded'` |
| **absent** | no rows; `legacy:'absent'` | the cold tier unmoved: `[]`, no write, no throw |
| **present and valid** | every `file.*` row imported **verbatim under its own name**; `schemaVersion` not carried | every operator row. **Lost: the `schemaVersion` stamp alone** — the retired record's format marker, not operator state, and D-13 gives the instance its own shape |
| **corrupt** (unparsable, non-object, foreign key, unknown stamp, directory, unreadable) | no rows; the bytes stand untouched; `legacy:'corrupt'`, reported through the module bridge's `corrupt` | **nothing the old code loaded is lost** — its corrupt arm loaded nothing either — and the diagnosis survives where the bytes are not repaired (D-19) |
| **present, valid, unrepresentable rows** | every carryable row imported; each row whose value carries `null`/`undefined` is answered **by name**, not dropped | everything else. The store's walk refuses `null`/`undefined` anywhere in a value, so such a row **cannot** be represented: it is named, never silently dropped, and L2 measures that arm on the package rather than inferring it |

## 5. Boot parity — its own red set, proven by a second construction (D-22)

Parity is **the next process, not a substring**: a second `createSettingsSurface` over the same `userData` directory must serve identically the app rows (`file.tabs.order`, a `file.modules.<id>` record, a `file.settings.*` row), the token, the granted groups and `maxJournalLength`. The exclusion pair is the one member whose restart value is its **declared initial**, not its previous value — `mem`, never persisted, unmoved here (D-17, `security-store-storeroom.md` ASM-2) — and a row asserts it, so no reader takes "survives" for "persists". Boot order is unmoved — this unit inserts no step: the flip's `settingsSurface.attach(mcp)` site, the window's creation and its `win.loadFile(...)`, and `await mcp.start()` after both keep the order L1's `C-3` row of `docs/L1/security-store-storeroom.md` §7 states, cited and not restated (D-43).

## 6. The census move — three written names to two, and the rows that pin three (D-22, D-13)

**Written at steady state: `provident-settings.json`, `provident-operator-settings.json`, `provident-profile.json` → the last two.** The retired names (`provident-security.json`, and now `provident-settings.json`) may stand in a profile as seeds, read at most once **per boot** and never written. The rows that pin three re-grain, never delete (D-13):

| Row | Reads three as | Becomes |
|---|---|---|
| `tests/store-compliance-live.mjs:282-306` (`DECLARED_PERSISTED_JSON`), `:1059-1061` (`SC-B-01`), `:1066-1090` (`SC-B-03`), `:2231` (`SC-A-06`), `:277-287,622,1797,2108` | the three-member declared set; "the settings file does not move"; "lands in `provident-settings.json`" | the two written names with the seeded retired names declared beside them; a seeded retired name's bytes stand, and a tier-1 commit moves the app-state record |
| `tests/store-security.test.ts:529-555` (`F-7/F-10/I-2/I-3`) | main.ts's literals `['provident-modules.json','provident-settings.json']`; one `readFileSync` in the instance then — the security boot import alone, before this unit's second read was added | `['provident-modules.json']`; **two** import-once reads, still no write |
| `tests/store-persist.test.ts` (the carrier's own battery) | `SC-1` `:1417-1439`, `SC-4` `:1458-1470`, `MIG-1` `:1313-1324`, `BO-3` `:1357-1365`, `SC-3` `:1449-1456`, the atomic/anti-pattern rows | re-grained where the subject is a channel's answer; **retired with their referent** where it is the hand-written machinery (the tmp sequence, the stamp) |
| `tests/store-tabs-record-live.mjs:91-122` | seeds and removes `provident-settings.json` | seeds the retired name for the *import* arm, the app-state record for the rest |
| `tests/{e2e,integration}/security-store-storeroom/isolation.test.ts:284,332` (`ISO-6`) | the MCP closure's allowed literals `['provident-profile.json','provident-settings.json']` | `['provident-profile.json']` — the set **shrinks**, the claim is unmoved |

## 7. Isolation rows that must stay green (D-18)

`ISO-1`…`ISO-6` and `RQ-1` stay green; §6's re-grains are the only change to them. This unit adds **one**, because a new write path with no row behind it is a claim and not a control (D-18):

| Id | The absence asserted |
|---|---|
| `ISO-7` | no `provident.module.*` tool, `RpcMethod` member or bridge route reaches `['operator-settings']` or the exclusion address: after `module.install`, `module.update` and `IPC_MODULE_SET_DISABLED`, the security record at its address is byte-identical and the app-state record is the only one that moved |

## 8. The L1 battery — twelve scenarios at `tests/e2e/settings-carrier-retirement/scenarios.test.ts` (this layer's artifact)

**Authored after the implementation, so it carries no red-first evidence** — the rows are written against the
documents and the shipped surface, and a red row is a finding against the code or this design, never evidence about
ordering (`docs/L1/security-store-storeroom.md` §8; `strata/examiner.md` §3; D-15).

| # | Goal | Expected |
|---|---|---|
| S-1 | the carrier is gone | exactly **one** occurrence of `provident-settings.json` in `src/**` — the import arm's own name in the instance, as `provident-security.json` is — and `src/main/main.ts` holds no read and no write of it |
| S-2 | the rows are served by the instance | a seeded retired record's `file.*` rows answer Y-1 after one boot, names verbatim |
| S-3 | the import writes no byte | the retired file's sha256 is identical after a boot and three commits |
| S-4 | the absent arm | no retired file → `[]`, `legacy:'absent'`, no write, no throw |
| S-5 | the corrupt arm | unparsable, non-object, foreign-keyed, wrong-stamp and directory files → no rows, bytes standing, `corrupt` reported, nothing thrown |
| S-6 | the unrepresentable arm | a null-carrying row is answered by name while its siblings import; nothing dropped silently |
| S-7 | boot parity by a second construction | rows, token, grants and cap identical; the exclusion pair at its declared initial |
| S-8 | a commit is one store write | one `{status:'committed'}`, the rows stand, no `.tmp`, no second file |
| S-9 | a refusal leaves the previous bytes | a refused commit answers the store's own status; rows and file unchanged |
| S-10 | the census | a settled profile writes exactly the two names; a seeded retired name is byte-identical |
| S-11 | `ISO-1`…`ISO-6`, `RQ-1` stay green | the landed rows, driven unchanged but for §6's re-grains |
| S-12 | `ISO-7` | a module install moves the app-state record and leaves the security record byte-identical |

## 9. The declared cross-module exception list, by path (one writer each)

`modules.md` §1 forbids a module agent writing another row's path silently, and this unit's three modules are one composition, so the writes are licensed here and nowhere else, for this unit and no other (D-1, D-4).

| Id | Path (owning row) | The writes that move | Writer |
|---|---|---|---|
| **E-1** | `src/main/main.ts` (`app-shell`) | §3's removals, three re-pointed reads and three writes; the module surface keeps its names, answers and semantics | this unit's **L4**, one shot |
| **E-2** | `src/main/operator-settings/index.ts` (`operator-settings`) | the third durable address, the second import-once arm (§4) and its two exposed verbs; no `fs` call but the two import reads | this unit's **L4**, one shot |
| **E-3** | `src/main/settings-surface/index.ts` (`settings-surface`) | the two delegating verbs and the import answer's mapping into `legacy`; no new channel, no rendered element | this unit's **L4**, one shot |
| **E-4** | `strata/modules.json` (L1's own map) | §2's two N figures and this unit's two battery subtrees | **L1**, filed with this artifact |
| **E-5** | `tests/**` — §6's rows, each named by file and line | the re-grain and the retirement §6 classifies, **executed at this unit's close under the rule that then stood**: D-31 supersedes the instruction for every later unit, which **marks** its scenario rows `// strata:marked-file rework` and replaces them whole (`strata/marks.json`) | this unit's **L2 test writer** (D-10, D-30, D-31) |

**Not a move, named so no reader looks for one**: `src/main/module-store.ts`, `store-channels.ts`, `preload.ts`, `security.ts`, `tier4-state.ts`, `src/shared/types.ts` and `src/renderer/**` are byte-identical after this unit.

## 10. Boundaries — what this unit does not do (D-22)

- **The gate's exclusion/tier-4 enforcement** is untouched: no `security.ts`, `tier4-state.ts` or `mcp-server.ts` line moves and `attach`'s boot terminal stands (D-18, D-22). **No journal-length consumer moves** (D-22), and no tool, resource, `RpcMethod` member or bridge channel is added (D-11, D-15, D-18).
- **The module registry is not re-implemented**: no store address of its own, no listener, no journal, no store-native record; its flat map moves with the bytes it lived in and its code is unchanged — giving it addresses is the parked pass (D-22, ASM-5).
- **No package change**: `provident-storeroom`/`provident-ssr` stay read-only, and a defect or gap is recorded in this unit's record with symptom, reproduction, suspected root cause and fix shape (D-5).
- **The L2 records that once owed this file are discharged here, and they now carry the executed fact**: `docs/L2/security-store-storeroom/persistence.md` §1/§8 and `docs/L2/central-data/persistence.md` §1 state it — the carrier's `settingsPath`, its boot read, the settings channel's guarded second read and the whole tmp+rename+fsync writer left the tree, and `provident-settings.json` survives only as a seed read at most once per boot by `operator-settings`' second import-once arm — because a closed unit's L2 record is replaced by its own successor unit and never edited by this layer (D-1, D-3, D-22).

## 11. Assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-1 | the rows stand at a **third durable address** `['operator-app-state']` on the `file` tier | the record's `entries` member: an MCP-reachable module write would then compose a value carrying the token, and the record's pinned key set would make the security record an app-state carrier (D-18) |
| ASM-2 | the Y-2 refusal names **the store's own status verbatim** | keeping the closed `'write-failed'` vocabulary in front of the store's, which gives one refusal two spellings and hides the cause (`security-store-storeroom.md` ASM-3) |
| ASM-3 | the import's validation is the retired boot read's own | a laxer import carrying foreign top-level keys as rows, which invents rows no consumer declared |
| ASM-4 | the import's answer is a **boot-time diagnosis served for the process's life**, never written | persisting it into the record, which makes the import write and puts an upgrade diagnosis into operator data |
| ASM-5 | the module registry's **carrier** moves and its **code** does not | giving it its own store address now — the parked pass, which would carry two units through one gate (D-22, D-1) |
