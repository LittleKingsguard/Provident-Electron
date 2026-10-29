# L3 — `settings-carrier-retirement`: the three edits

- **Layer:** L3 · **Unit:** `settings-carrier-retirement` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Artifact:** `settings-carrier-retirement-l3-design`
- **Status:** DESIGN — structure, private helpers, pseudocode and guardrail notes for three one-shot edits (L1 §9 E-1/E-2/E-3); the declared surface and the file layout are `signatures.md`, the contract is `docs/L1/settings-carrier-retirement.md` §3/§4/§9 and the three `docs/L2/settings-carrier-retirement/` files
- **Charter:** D-22 — this unit is the **checkpoint** and nothing else: the carrier retires; the gate's exclusion/tier-4 enforcement, the registry's own code and every journal-length consumer are **parked** (D-22)
- **Ceilings:** 150 lines, class max (D-1) · **Shorthands:** `L1` = `docs/L1/settings-carrier-retirement.md`; `interface`/`behaviour`/`persistence` = the three `docs/L2/settings-carrier-retirement/` files; `sibling` = `docs/L3/security-store-storeroom/design.md`; `guide §n` = `node_modules/provident-storeroom/README.guide.md`, read and never edited (D-5)

## 1. The three deltas, and what each is not

| edit | the delta | what it must not become |
|---|---|---|
| **E-2** `src/main/operator-settings/index.ts` | a third `file` address, `readAppState`/`writeAppState`, and the second import-once arm with **one** more `readFileSync` | a change to `read`/`write`/`subscribe`, a listener at the new address, or a store shape (sibling §1–§8; D-19) |
| **E-3** `src/main/settings-surface/index.ts` | `state()`/`commit(rows)` delegating, and the import answer mapped through | a channel, a bridge member, a rendered element, a second instance (D-18; D-21) |
| **E-1** `src/main/main.ts` | L1 §3's removals, three re-pointed reads and three writes | a re-implemented registry: members, answers, hash re-verification, `reserved-namespace` refusal and quarantine stand (D-22) |

- **One act, one commit, one receipt**, and no verb this unit adds ever throws (interface §2; sibling §6); **nothing enters a census** — no MCP tool, resource, `RpcMethod` member, bridge channel, rendered element or written file name (D-11, D-18, D-22; L1 §2).

## 2. E-2 — the instance: a third address, two verbs, one more read

| what | the decision | cite |
|---|---|---|
| the address | `['operator-app-state']` on the **`file`** tier, beside the record and **not** inside its `entries`: a `file` write purges at its own key, so a module write can never compose a value carrying the token | interface §1; `guide §5.1`; D-18 |
| the value | `{ rows }` — one declared member holding an ordered `AppStateRow[]`, never a name→value map, because an object's member order does not survive the crossing while a genuine array's does | persistence §3/§8 `P-2` |
| held state | the import answer **only**, answered while nothing stands at the address; never a copy of the record — each `readAppState` re-projects the store | persistence §4; sibling §1 `ASM-1` |

The helpers this edit adds, each named here because the file's header mints none outside this design:

| helper | what it does | cite |
|---|---|---|
| `APP_STATE_ADDRESS` · `RETIRED_SETTINGS_NAME` · `NO_IMPORT` | the third address; `'provident-settings.json'`, spelled **once** in `src/**`; the absent answer the arms start from | interface §1; behaviour §8 `RET-2`; persistence §1 |
| `missing(caught)` | the caught value's own `code === 'ENOENT'`: `absent` and `corrupt` are told apart **from one `readFileSync`**, never by a second `fs` call | behaviour §7; persistence §4 |
| `recordedAt(value)` | `plain(value)` **and** a genuine array at `rows` — the marker is the record's **presence**, so no version member, no marker file and no second written name | persistence §4; `guide §9.1` |
| `fromAppState(value)` | the read-back: `undefined` where `recordedAt` is false, else the rows, each `value` through the landed `detach` | interface §2; `guide §10` |
| `toAppState(rows)` | **the write boundary**: each row composed as exactly `{name, value}`, wrapped in `{ rows }`, imaged through `JSON.stringify`/`JSON.parse`; `undefined` where an image cannot be minted | persistence §3; interface §7 `ASM-L2-2` |
| `importAppStateOnce(dir)` | the second import-once arm (§2.2) — the module's **second** `readFileSync` and its last | L1 §4; persistence §4 |
| `representable(value)` | `false` iff the value carries `null` or `undefined` anywhere at any depth — the **one** refusal the import tests, because the package publishes no admission predicate | `guide §10.1`; persistence §8 `P-1`, `ASM-L2-9` |

### 2.1 The two verbs

```
readAppState():                                                                    · interface §2
  no instance stands → { rows: [], legacy: 'absent', unrepresentable: [], storage: 'unreachable' }   · sibling §4 `ASM-4`
  held ← try store.read(APP_STATE_ADDRESS, 'file') catch → nothing                  · guide §4: AddressNotFound is a read arm
  recorded ← fromAppState(held)
  recorded ≠ undefined → { rows: recorded, legacy: 'recorded', unrepresentable: [], storage: 'standing' }
  imported ← the held import answer, or NO_IMPORT
  → { rows: a detached copy, legacy: imported.legacy, unrepresentable: [...], storage: 'standing' }  · behaviour §7
```

```
writeAppState(rows):                                                               · interface §2
  the construction refused → that refusal, FIRST, before any admission             · sibling §4; behaviour §3
  no instance stands → refused(FilePathUnreachable, 'no instance stands behind this module', null)
  one try/catch, each member read ONCE; refuse AS A VALUE with this module's sentence:
      rows is not an array · a row is not a plain object · a name is not a non-empty string ·
      two rows name one name                                                       · interface §6 `ASM-L2-6`
  candidate ← toAppState(the admitted rows); undefined → refused(ValueRefusedAtBoundary, …, null)
  try store.write(APP_STATE_ADDRESS, 'file', candidate) → receiptOf(record)         · guide §3.3, §9.2
  catch caught → refusalOf(caught, APP_STATE_ADDRESS)                              · guide §8, §9.4
```

- **No name and no value is validated here** — composition is `main.ts`'s and the only admission is the argument's own shape (interface §3 `ASM-L2-5`; L1 §3).
- **`null` is not pre-checked**: the store's own `ValueRefusedAtBoundary` crosses verbatim, so one refusal keeps one spelling — and the image is what makes the in-process answer equal the post-restart one, dropping an own `undefined` member exactly as the retired carrier's `JSON.stringify` did (behaviour §3; persistence §3; interface §7 `ASM-L2-2`).

### 2.2 `importAppStateOnce(dir)` — L1 §4's four arms, once, writing no byte

```
importAppStateOnce(dir):
  try text ← readFileSync(join(dir, RETIRED_SETTINGS_NAME), 'utf8')                 · the SECOND fs call, D-19
  catch caught → missing(caught) ? absent : corrupt                                 · absent vs directory/unreadable
  try parsed ← JSON.parse(text) catch → corrupt                                     · unparsable
  not plain(parsed) → corrupt                                                       · an array, a string, a number, a boolean, null
  an own key that is neither 'schemaVersion' nor a `file.` name → corrupt            · the retired boot read's own admission, ASM-3
  parsed.schemaVersion ≠ '1' → corrupt                                              · absent or unknown stamp
  for name of Object.keys(parsed), IN THE RECORD'S OWN ORDER:
      'schemaVersion' → skip                                                        · never carried, D-13
      representable(parsed[name]) → rows.push({ name, value: parsed[name] })         · verbatim, under its own name
      otherwise → unrepresentable.push(name)                                        · answered BY NAME, never dropped
  → { rows, legacy: 'imported', unrepresentable }
```

- **The marker is the record's absence**: the arm runs iff nothing stands at the address, so a second construction before any commit imports again and answers the same rows — and the two arms are independent, each with its own address and its own marker, so a profile seeded with both retired files imports both in one construction (persistence §4; behaviour §7).
- **It writes no byte of any file** — not the retired file's, not the instance's — and its rows stand in memory until an ordinary write supersedes them (L1 §4; sibling §7).
- **The residue is named and not repaired**: a row past the walk's ceilings imports here and is refused by the store at the first commit, its status verbatim (persistence §8; `guide §10.2`).

## 3. E-3 — the surface: two verbs, one mapping, nothing else

```
state():                                                                          · interface §3
  return settings.readAppState()        // the same four members, passed through unchanged
commit(rows):                                                                     · interface §3
  receipt ← settings.writeAppState(rows)
  status 'committed' → { status: 'committed' }                                    // no cursor, no opId: ASM-L2-4
  otherwise → { status: 'refused', reason, message, address }                     // the store's own, verbatim
```

- **`state()` copies nothing and composes nothing**: the instance's answer is already detached at every depth, so the surface hands it on instead of mapping it (interface §3; `guide §10`).
- **`commit`'s committed arm drops the ordinals**, because the channel it serves answers `{status:'committed'}` and `preload.ts` is byte-identical (interface §3 `ASM-L2-4`; L1 §9).
- **Neither verb validates a name or a value and neither throws**: `'malformed-payload'` stays the channel's pre-write refusal and is never minted here (interface §6; `ASM-L2-5`).
- **The product gains these two verbs and keeps the four landed ones**; the module gains no channel, no rendered element and no new `ipcMain` site (D-18; D-21; L1 §9 E-3).

## 4. E-1 — `src/main/main.ts`, site by site

| site | what L4 does | cite |
|---|---|---|
| `:6` `:7` | `dirname` and the record's reader leave with the writer; the `node:fs` import ends as **`{ rmSync }`** alone | L1 §3; behaviour §8 `RET-1` |
| `:118-123` | the TIER 1 comment block and `settingsPath`: the constant deleted **and** the block stops spelling the retired name, so `RET-2`'s byte census sees exactly one occurrence, in the instance | L1 §3; behaviour §8 `RET-2` |
| `:129` `:132` | `bootRecord`, `settingsCorrupt` — deleted, and the third holder has no successor | L1 §3; behaviour §1 |
| `:134-164` | `readSettingsRecord`, its boot call and its two assignments — deleted | L1 §3 |
| `:173-192` | the Q-5 migration: the registry's read and its post-boot removal stay, the probe goes with `:7`, the write becomes **one** `commit` and stamps no `schemaVersion` | L1 §3; persistence §7 |
| `:201-218` | `moduleRecordsOf`/`modulePayloadWith` keep their names and answers; only their **source of rows** moves, and the second now answers the whole rows list | L1 §3; interface §5 |
| `:212` `:237` | the `bootRecord === null` and `settingsCorrupt` reads become the served rows and `legacy === 'corrupt' \|\| storage === 'unreachable'` | interface §5 `ASM-L2-3` |
| `:308-333` | Y-1: one `state()` projected to `{name, value}[]`; no holder, no second read, no `schemaVersion` skip | interface §4; behaviour §2 |
| `:341-371` | Y-2: the landed validation and `file.*` projection, then **one** `commit` of the rows it composed; the answer is `{status:'committed'}` or `{status:'refused', reason}` | interface §4; behaviour §3 |
| `:373-398` | `commitSettingsWrite` whole — the tmp/rename/fsync machinery has no successor | L1 §3; persistence §5 |

The three re-points, as bodies:

```
moduleRecordsOf():                                    · interface §5
  rows ← settingsSurface.state().rows                 // ONE reading per member answer
  each row named 'file.modules.…' whose value is a plain object and not an array → a ModuleRecord
modulePayloadWith(key, rec):                          · interface §5
  rowsWith(settingsSurface.state().rows, key, rec)
rowsWith(rows, key, value):                           // main.ts's ONE new local: the replace-or-append rule
  the rows in their order, the row named `key` replaced by { name: key, value }, else appended
```

- **`rowsWith` replaces rather than appends**: `writeAppState` refuses a duplicate `name` as a value, so an append would refuse the whole commit — and the migration, which threads `rowsWith` over its own local list, would lose the records it had read. **Each member's write is one `commit` of the whole composed list and no member surfaces a receipt**: `put` answers the record it composed, `remove` whether the row stood, `setDisabled` nothing (interface §5/§6; behaviour §5 `A-7`; `ASM-L2-5`).
- **The boot has no `state()` of its own** — the import ran at construction, the third holder has no successor, and the migration's step (3) is the only boot-time `state()`, so a profile with no legacy records reads nothing at boot — and boot order is unmoved in kind: construction → the security record's `read()` → gate → `:527` `attach` → `start()` → window (behaviour §1; L1 §3/§5).

## 5. Guardrails for L4

- **No `fs` call in `operator-settings` beyond the two `readFileSync` import reads**, no third call to tell `absent` from `corrupt`, and **`main.ts` ends with exactly one `node:fs` name, `rmSync`** — no write verb, no `settingsPath`, and no comment re-spelling a removed verb or the retired name, because `RET-1` and `RET-2` are byte scans (D-19; L1 §3; persistence §4; behaviour §8 `RET-1`–`RET-3`).
- **`read()`/`write()`/`subscribe()`/`importOnce()`, `VALID_GROUPS`, `FIRST_RUN`, `SAFE_PAIR`, the two landed addresses and both construction arms are not edited** — this edit adds a third arm beside them (D-22; sibling §1–§8).
- **No listener at the new address and no new channel or bridge member**: `subscribe` binds the two landed addresses, the surface keeps one subscription, and no MCP tool, resource, `RpcMethod` member, rendered element or second `ipcMain.handle` site is added (sibling §8 `ASM-7`; interface §2; D-11, D-18; L1 §9).
- **No `schemaVersion` anywhere** — no row carries one, no reader skips one, no writer stamps one — and **no re-implemented admission taxonomy**: the import tests `null`/`undefined` alone and every other refusal is the store's, at the first commit (L1 §3; D-13; persistence §8 `ASM-L2-9`; D-5).
- **No held record and no served constant**: each `readAppState` re-projects and each `[]`/row in an answer is fresh, never `NO_IMPORT`'s own array (persistence §4; sibling §1).
- **`preload.ts`, `store-channels.ts`, `security.ts`, `tier4-state.ts`, `module-store.ts`, `src/shared/types.ts` and `src/renderer/**` stay byte-identical**; `settings-surface` imports no `node:fs`, `electron` or `provident-storeroom`; and the registry's members, answers, `sha256` re-verification, `reserved-namespace` refusal and quarantine are not re-implemented, with the legacy removal still following the commit rather than gating on it (L1 §9; D-22; behaviour §5 `A-7`).

## 6. Assumptions made here that L2 left open, with the alternative each rejected

| id | assumption | the rejected alternative |
|---|---|---|
| `ASM-1` | `absent` and `corrupt` are told apart by the **caught error's own `code`** (`ENOENT`), from the one `readFileSync` | a second `fs` call (`existsSync`) to distinguish them, which breaches the two-call census `RET-3` asserts (persistence §4) |
| `ASM-2` | `legacy` is `'absent'` when `storage:'unreachable'` | `'recorded'`, which claims a record nobody read, or `'corrupt'`, which `ASM-L2-3` already rejects as reading a disk fault as a bad legacy file (interface §7) |
| `ASM-3` | a row object is composed as **exactly** `{name, value}`, so a caller's extra member does not cross | carrying the whole object through the image, which makes the in-process and post-restart answers differ on exactly the members the declared row type does not name (interface §2; persistence §3) |
| `ASM-4` | a record row failing its shape on read-back is **skipped**, its siblings served | answering `[]` for the whole record, which discards every other row for one bad member (interface §2; `guide §10`) |
| `ASM-5` | an image `JSON.stringify` refuses is `ValueRefusedAtBoundary` with this module's sentence | letting the `TypeError` fall to `refusalOf`, which reports a value refusal as `UnattributedFailure` and names no act (interface §6; `guide §8.3`) |
| `ASM-6` | main.ts's legacy-registry existence probe retires with `:7`, since `load()` already answers a missing file as empty | keeping `existsSync` for that one probe, which leaves a reader named in `:7`'s removal row standing and makes `RET-1`'s own scan the only arbiter (L1 §3) |
