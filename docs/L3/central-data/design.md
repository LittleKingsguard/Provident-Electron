# L3 — `central-data`: the module design

- **Layer:** L3 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 2 · **Status:** DESIGN — the unit battery is filed against this file and `signatures.md` and stands red until `src/main/data/` exists (D-1 §4)
- **Inputs:** `docs/L2/central-data/interface.md` §1-§8, `behaviour.md` §1-§10 (**§5 and §9 as revised: two unreachability arms, `ASM-L2-7`**) and `persistence.md` §1-§9, all at rev 2; `strata/brief.md` §1/§3/§4, `strata/decisions.md` D-1/D-5/D-10/D-11/D-12/D-13/D-14 and `strata/envelope.md` §1; the seam `src/main/storeroom.ts`; the read-only package `node_modules/provident-storeroom/{index.d.ts,README.md,README.guide.md}` (D-5)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is the package's shipped `README.guide.md` and `the declaration` is its `index.d.ts`; both are read and never edited (D-5) · **Split:** every signature and every answer shape stands in `signatures.md`; this file carries the structure, the reachability reading, the operations' pseudocode, the twelve guardrails and this design's own two assumptions (`brief.md` §3; D-1 §1)

## 1. Structure and file layout

`src/main/data/` is new and is seven files; the seam keeps its census (`interface.md` §2; D-5).

| File | What it holds | Cite |
|---|---|---|
| `src/main/data/index.ts` | the module's entry and the only file another module imports: it exports exactly the surface `interface.md` §2 declares and nothing else | `interface.md` §2, §5; D-11 |
| `src/main/data/types.ts` | the declared types and the `DATA_TOOL_NAMES` value — one home for the vocabulary | `interface.md` §2 |
| `src/main/data/args.ts` | argument validation: the declared members, the path domain, the cursor domain, the volatile spelling, the sort key | `interface.md` §1; `behaviour.md` §4; D-13 |
| `src/main/data/store.ts` | the profile's one name, **the reachability reading of §2**, the deferred construction, and the port the operations drive | `persistence.md` §1; `behaviour.md` §9; D-13 |
| `src/main/data/mapper.ts` | the store-status mapping and this module's fixed sentences, the reading's `store-unreachable` sentence among them | `interface.md` §2, §3; `guide §8.1, §8.2` |
| `src/main/data/journal.ts` | the bounded in-memory change window, cursors minted from 1 | `persistence.md` §6; D-12 |
| `src/main/data/surface.ts` | `createDataSurface` and the five operations — one answer site for a tool call and for its route | `interface.md` §2, §5; D-11 |

- **The store's construction stays in the seam**, and the seam gains exactly one optional member: `src/main/data/` imports `createProfileStore` from `src/main/storeroom.ts` and never `provident-storeroom`, so the app keeps one import of the package (`src/main/storeroom.ts:5-8`; D-5; `brief.md` §2). `ProfileStoreOptions` gains `filePath?: string`, passed through only where a string is supplied, because a store's register tier is fixed at creation and a store built without a `filePath` can never reach the `file` tier (`guide §3.1, §9.1`; `persistence.md` §1; supplied-versus-absent is not the same call, `guide §3.3`).
- **The pinned census does not move**: `STOREROOM_DECLARED_SURFACE` keeps `memberCount: 14` and `symbolCount: 11`, `DEFAULT_JOURNAL_LENGTH` keeps `4096`, no symbol is added, renamed or removed, and `tests/storeroom-surface.test.ts` is left as filed (`src/main/storeroom.ts:45-53`; `brief.md` §2).
- The store's type is named `ReturnType<typeof createProfileStore>`, so no file under `src/main/data/` spells a package type or opens a second import (D-5). Everything but `index.ts` is private to the module, and the unit battery imports nothing but `src/main/data/index.ts` and scripts no seam: every arm it drives is reachable through a real profile directory and the real store behind the seam (§5; D-14; `platform.md` §4).
- The five registrations, the gate's sixth group and the `RpcMethod` entries are `interface.md` §4/§5 and are L4's to execute; this module's whole contribution to them is `createDataSurface` and its `DataSurface` value (`interface.md` §5; D-11).

## 2. One written name, and the reading that answers whether it can be occupied

- The profile is `<profileDir>/provident-profile.json`: the directory is the caller's and the name is the module constant, `PROFILE_FILE_NAME` (`persistence.md` §1; `interface.md` §2). The module writes no byte of it, no `.tmp`, no lock, no sidecar, and creates no directory (`persistence.md` §1, §5; D-13).
- **Its own filesystem act is one reachability reading, taken at the top of every operation and before any store instance exists or is consulted**: *can this one name, `<profileDir>/provident-profile.json`, be occupied here at all?* It constructs no instance, creates nothing and moves no byte; its failure modes are answers and never throws; and it is composed of probes only — an `lstat` at the name, a resolution of the entry where it is a symlink, and where the name is absent an `lstat`/`access` at the parent it would be created in (`persistence.md` §1; `behaviour.md` §5, §9; `ASM-L2-7`; G1; D-11, D-13).
- It answers one of three words (`signatures.md` §2, `ProfileReading`): **`occupied`** — `lstat` at the name succeeds and the entry can back a store file: a regular file this process may write, or a symlink resolving to one (`guide §9.1`; `persistence.md` §1).
- **`absent`** — the name does not stand and nothing forbids it: its parent is absent, or is a directory that admits a create. This is the **second arm**: the cold tier until a `write` constructs (`behaviour.md` §9; `ASM-L2-7`; ASM-L3-U2).
- **`unreachable`** — the name cannot be occupied: `lstat` at the name fails with anything but `ENOENT` (`ENOTDIR` where `profileDir` is a regular file, `EACCES`, `ELOOP`, a name too long); the name stands as something that cannot back a store file — a directory, a dangling symlink, a file this process may not write, a device; or the name is absent under a parent that exists and is not a writable directory. These are `guide §8.2`'s refused `filePath` forms **other than an absent parent**, which is `absent`'s business because construction is where it refuses (`guide §8.2`; `behaviour.md` §9).
- An `unreachable` reading answers `{ status:'refused', reason:'store-unreachable', message }` for **all five operations, `journal` included**, with no store built, no file created and no byte moved: `behaviour.md` §9's two arms are **one rule in two spellings**, and the reading is where it is spelled once (`behaviour.md` §5, §9; `ASM-L2-7`; D-11, D-13).
- `createDataSurface` constructs no store, reads nothing and touches no file: it records the options and returns the five operations, and every field of the options is read lazily inside the guarded body, so the factory cannot throw (`interface.md` §2; `behaviour.md` §1; D-11, D-13).
- The store is constructed **at most once**, at the first operation whose reading did not answer `unreachable`: `write` always needs one; `read`/`list`/`delete` need one only where the reading answered `occupied`; `journal` never needs one — one store per surface, no second `filePath`, no re-construction — so a profile that is only read costs the reading and no construction, and the file is brought into being by the store's own exclusive create at construction: a zero-length file that boots cold and holds no row, a residue of the first `write` (`persistence.md` §7; `guide §3.2, §9.1`; `behaviour.md` §1, §9; `persistence.md` §9 P-1; D-13). Under an absent-but-writable directory that construction is the one place a first `write` can refuse: it answers `store-unreachable` and creates nothing, not even `profileDir` (`behaviour.md` §9; `guide §8.2, §9.1`; `ASM-L2-7`).

## 3. The operations

The five share one preamble, and its order is the order the checks run in (`behaviour.md` §4; D-11):

```ts
g = parse(args)          // the tool's declared member set by name, then the path or cursor domain
if (!g.ok) return g.ledger                          // interface.md §1; behaviour.md §4
// path domain: a dense array, each element a string or a non-negative safe integer; '' is a legal key
// first segment begins 'mem.' | 'temp.' | 'secure.' -> 'volatile-path'        // D-13
// path.length === 0 on write | delete -> 'root-not-writable'                 // interface.md §1; D-12
r = port.probe()         // THE reading of §2, taken before any store: occupied | absent | unreachable
if (r.kind === 'unreachable') return r.ledger     // all five, journal included: behaviour.md §9
```

- The member set is checked first and refused **by name**, ahead of the reading and of any byte; on `write` an **absent** `value` is `malformed-arguments`, while a supplied `undefined` is a value the store's own walk refuses as `value-not-admitted` (`interface.md` §1; `behaviour.md` §4; `guide §10`). Every operation then reads `r` the way §2 spells it — `absent` is the cold tier for `read`/`list`/`delete`, the construction for `write`, and the window alone for `journal` — and no operation asks the reading a second question (`behaviour.md` §1, §9; `ASM-L2-7`).

**`read`** — a literal row and a container branch are told apart by `readLiteral`, the package's own leaf-narrowed read (`guide §4`):

```ts
if (r.kind === 'absent') return g.path.length === 0
  ? { status:'read', kind:'branch', path:[], value:{} } : { status:'absent', path: g.path }  // behaviour.md §1
s = port.construct(); if (s.kind === 'unreachable') return s.ledger      // construction refused, §2
try { if (g.path.length === 0) return branch(s.store.read([]))       // guide §4 rule 1
      return row(s.store.readLiteral(g.path)) }                      // guide §4
catch (e) { return readOutcome(e, g.path) }                         // the three arms below
```

The probe's arms: a literal answers `kind:'row'` with the value the store copied out; `ReadTargetIsBranch` answers `kind:'branch'` with `read(path)`'s assembled value; `AddressNotFound` and `LeafHasNoDownstream` answer `{status:'absent', path}` — absence is an answer and never an empty success (`interface.md` §2, §3; `guide §4, §8.1`).

**`write`** — one path/value pair at the `file` tier, the store's own durability unit (`interface.md` §1; `guide §9.2`; D-13):

```ts
s = port.construct(); if (s.kind === 'unreachable') return s.ledger   // 'absent' -> the exclusive create, or the refusal
try { s.store.write(g.path, 'file', g.value)          // no fourth position: guide §3.3
      cursor = journal.append('write', g.path, 'present')            // D-12
      return { status:'committed', path: g.path, cursor } }           // interface.md §2
catch (e) { return refusalLedger(e, g.path) }         // no cursor and no entry: behaviour.md §4
```

**`delete`** — the module names one row and never the store's whole-target arm, so it asks whether a row stands before it acts (`ASM-L2-6`; D-12):

```ts
if (r.kind === 'absent') return emptyReceipt(g.path)               // behaviour.md §1
s = port.construct(); if (s.kind === 'unreachable') return s.ledger
try { s.store.readLiteral(g.path)                     // a row stands at the address
      rec = s.store.delete(g.path, 'file')            // one tier token, never an array: guide §5.2
      removed = rec.tiers.length > 0
      cursor = removed ? journal.append('delete', g.path, 'absent') : null
      return { status:'committed', path: g.path, removed, tiers: rec.tiers, cursor } }
catch (e) { return readOutcome(e, g.path) }           // branch | absent -> emptyReceipt
```

The empty receipt is `{status:'committed', path, removed:false, tiers:[], cursor:null}`, reached with **no** `AddressNotFound` leaving this module: the shipped `delete` throws it where nothing stands, so the module learns that nothing stands from the probe and never enters the throwing arm (`behaviour.md` §6; `guide §5.3`, measured false at this head; exception §7; D-5, D-11).

**`list`** — row paths only, one store call, sorted by the path's JSON text (`ASM-L2-2`; `interface.md` §2):

```ts
if (r.kind === 'absent') return { status:'read', prefix: g.prefix, paths: [], count: 0 }
s = port.construct(); if (s.kind === 'unreachable') return s.ledger
if (g.prefix === null || g.prefix.length === 0) rows = walk(s.store.read([]), [])  // guide §4 rule 1
else try { s.store.readLiteral(g.prefix); rows = [g.prefix] }        // that address holds a row
     catch (e) { ReadTargetIsBranch -> rows = walk(s.store.read(g.prefix), g.prefix)
                 AddressNotFound | LeafHasNoDownstream -> rows = [] }
rows.sort(by JSON.stringify)                                         // ASM-L2-2
return { status:'read', prefix: g.prefix, paths: rows, count: rows.length }
```

`walk(v, at)` emits `at` for a scalar, recurses over an array's indices `0…length-1` and an object's own enumerable keys, and emits nothing for an empty container — so a branch is never reported as a row (`interface.md` §2; `guide §4`, arms `R-2`/`R-3`/`W-4`).

**`journal`** — the reading is consulted and the store is not: its window remains this process's own (`persistence.md` §6; `behaviour.md` §9; D-12):

```ts
w = journal.window(g.from)      // r was read above and gated the call; no store is built, none is read
if (!w.ok) return { status:'refused', reason:'cursor-unknown', message, floor: w.floor, through: w.through }
return { status:'read', from: g.from, through: w.through, floor: w.floor, entries: w.entries, count: w.entries.length }
```

- `from` is an integer `>= 0` or the answer is `malformed-arguments`; an integer below `floor` or above `through` is `cursor-unknown` carrying both bounds so a caller re-anchors (`behaviour.md` §4, §6; D-12).
- A cursor is minted from `1` per committed write and per delete that removed a row; a refused call mints none and appends nothing; the window holds the newest `journalLength` entries, `floor` is the highest cursor that fell out, `through` is the last minted (`persistence.md` §6; D-12).
- No entry carries a value: `{cursor, kind, path, changedTo}`, with the path a fresh copy, so nothing in the window can be replayed or mutated into the register (`D-12`; `interface.md` §2).

## 4. The guardrails, as invariants the battery drives

| # | Invariant | Cite |
|---|---|---|
| G1 | no operation throws for any argument of any type or any store state, **nor does the reading**: every failure is a `refused` ledger, and the probe, the construction and the store call of every operation sit inside the one `try` that produces it | D-11; `interface.md` §6; `behaviour.md` §5 |
| G2 | a refusal moves no byte and mints no cursor: where a save failed the store's own rollback has already run and this module adds no compensation | `behaviour.md` §4, §5; `guide §9.4`; D-11 |
| G3 | exactly one written name, `<profileDir>/provident-profile.json`, brought into being by the store's own exclusive create at construction and by no act of this module's; it is never truncated, parsed or repaired here, no second name exists at any point, and the reading creates nothing | `persistence.md` §1, §5, §9; `guide §9.1`; D-13 |
| G4 | nothing reverses: no `rollback`, no undo, no replay, no constraint or listener registered on any instance this module builds, and **no fixed module sentence carries a reversal word** | D-12; `interface.md` §6; `surface-and-profile.test.ts:50-71` |
| G5 | the volatile-spelling refusal moves no byte, creates nothing, and leaves `list` unmoved | D-13; `behaviour.md` §7 |
| G6 | `read` answers `kind:'row'` for a literal and `kind:'branch'` for a container, and `list` answers the paths that hold a row | `interface.md` §2; ASM-L2-2 |
| G7 | a delete where no row stands answers `committed`/`removed:false`/`tiers:[]`/`cursor:null`, and no store refusal is served as an answer, a `store-refused` ledger or a throw | `behaviour.md` §6; `guide §5.3`; D-5, D-11 |
| G8 | a store status outside the mapped set is never read as success: it answers `store-refused` with that status verbatim in `storeStatus` | `interface.md` §2, §3; `guide §8.1`; D-5, D-11 |
| G9 | the value's admission is the package's walk and never a second one here: nothing is wrapped, defaulted or dropped, and a refused value lands no row | `persistence.md` §3; `guide §10`; D-13 |
| G10 | every answer is a fresh object and `read`'s value is the store's own copy-out, so no answer aliases module or store state | `guide §10`; D-13 |
| G11 | the tier token is always spelled — `'file'` at `write` and at `delete` — never an array and never a supplied `undefined` | `guide §3.3, §5.2` |
| G12 | `exclusion-closed` is never produced here: it is the invocation turn's answer ahead of the adapter, so no operation mints it | `interface.md` §3, §4; `behaviour.md` §8 |

The mapping behind G8 is one table, and it is closed against the package's twenty-status set plus its escape arm: `signatures.md` §3 (`guide §8.1`; D-5).

## 5. The harness, its budget, the battery's asymmetry, and the commands that must go green

- `N = 15` — 5 tools + 5 routes + the 5 `provident-storeroom` exports called (`storeCreate`, `read`, `readLiteral`, `write`, `delete`; `register` has no call site) — so **the harness cap is `50 + 10 × 15 = 200` lines** (`strata/modules.json`; exception §1; D-14; `platform.md` §4).
- The harness as filed is `tests/unit/central-data/support/temp-profile.ts`: one temp-profile factory (`mkdtemp`, the one written name, its removal, the entries and bytes scan) and one answer-shape helper (`expectRefusal`). **No seam is scripted there** — every arm the battery drives is reachable through a real profile directory and the real store behind the seam — so fixture, helper and driver together stay well inside **≤ 200 lines** (`temp-profile.ts:1-6`; D-14; `platform.md` §4).
- **The unit battery's coverage is asymmetric, and no exemption follows from it**: its 40 rows are evidence and do not count against the cap, and the occupied-name row drives `read`, `write`, `delete` and `list` and leaves `journal` un-asserted (`refusals.test.ts:199-212`), so a green `npx vitest run tests/unit/central-data` does **not** prove `journal`'s refusal on that arm. The row that asserts it is the integration battery's profile-file row, which drives all five with `journal` included (`tests/integration/central-data/profile-file.test.ts:72-88`, this unit's L2 test writer's and not L4's to move): a coverage asymmetry of the battery, never a licence to answer a window where the profile can never be built (`behaviour.md` §9; `ASM-L2-7`; D-11, D-14; ASM-L3-U1).
- Both commands run from the workspace root and must go green once L4 lands: `npx vitest run tests/unit/central-data` and `npm run typecheck:tests` (`brief.md` §6; D-1 §4).

## 6. This design's two assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L3-U1 | the **occupied-name** arm refuses **all five** tools — the one the unit battery drives on four tools with `journal` un-asserted, and the integration battery asserts on five (`refusals.test.ts:199-212`; `profile-file.test.ts:72-88`) | refusing only the tools a row happens to drive, i.e. reading `journal`'s absent row as an exemption — which makes the answer depend on the battery's coverage instead of on `behaviour.md` §9, and which is the defect rev 1 carried |
| ASM-L3-U2 | the **absent-name** arm stays the cold tier — `read`/`list`/`delete` answer cold, `journal` answers the empty window — until a `write` constructs, and that construction is where `store-unreachable` and "creates nothing" are observable (`cold-and-write.test.ts:65-86`; `refusals.test.ts:181-197`) | folding an absent name into the same refusal, which serves `store-unreachable` for a profile that is merely new, reddens the cold-tier rows, and loses `behaviour.md` §9's second arm and `ASM-L2-7` |
