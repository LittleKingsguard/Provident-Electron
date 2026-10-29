# L3 — `central-data`: the module design

- **Layer:** L3 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — the unit battery is filed against this file and `signatures.md` and stands red until `src/main/data/` exists (D-1 §4)
- **Inputs:** `docs/L2/central-data/interface.md` §1-§8, `docs/L2/central-data/behaviour.md` §1-§10 and `docs/L2/central-data/persistence.md` §1-§9, all at rev 2; `strata/brief.md` §1/§3/§4, `strata/decisions.md` D-1/D-5/D-10/D-11/D-12/D-13/D-14 and `strata/envelope.md` §1; the seam `src/main/storeroom.ts`; the read-only package `node_modules/provident-storeroom/{index.d.ts,README.md,README.guide.md}` (D-5)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is the package's shipped `README.guide.md` and `the declaration` is its `index.d.ts`; both are read and never edited (D-5)
- **Split:** every signature and every answer shape stands in `signatures.md`; this file carries the structure, the pseudocode and the guardrails (`brief.md` §3; D-1 §1)

## 1. Structure and file layout

`src/main/data/` is new and is seven files; the seam keeps its census (`interface.md` §2; D-5).

| File | What it holds | Cite |
|---|---|---|
| `src/main/data/index.ts` | the module's entry and the only file another module imports: it exports exactly the surface `interface.md` §2 declares and nothing else | `interface.md` §2, §5; D-11 |
| `src/main/data/types.ts` | the declared types and the `DATA_TOOL_NAMES` value — one home for the vocabulary | `interface.md` §2 |
| `src/main/data/args.ts` | argument validation: the declared members, the path domain, the cursor domain, the volatile spelling, the sort key | `interface.md` §1; `behaviour.md` §4; D-13 |
| `src/main/data/store.ts` | the profile's one name, the existence probe, the deferred construction, and the port the operations drive | `persistence.md` §1; D-13 |
| `src/main/data/mapper.ts` | the store-status mapping and this module's fixed sentences | `interface.md` §2, §3; `guide §8.1` |
| `src/main/data/journal.ts` | the bounded in-memory change window, cursors minted from 1 | `persistence.md` §6; D-12 |
| `src/main/data/surface.ts` | `createDataSurface` and the five operations — one answer site for a tool call and for its route | `interface.md` §2, §5; D-11 |

- **The store's construction stays in the seam**, and the seam gains exactly one optional member: `src/main/data/` imports `createProfileStore` from `src/main/storeroom.ts` and never `provident-storeroom`, so the app keeps one import of the package (`src/main/storeroom.ts:5-8`; D-5; `brief.md` §2).
- `ProfileStoreOptions` gains `filePath?: string`, passed through only where a string is supplied, because a store's register tier is fixed at creation and a store built without a `filePath` can never reach the `file` tier (`guide §3.1, §9.1`; `persistence.md` §1; supplied-versus-absent is not the same call, `guide §3.3`).
- **The pinned census does not move**: `STOREROOM_DECLARED_SURFACE` keeps `memberCount: 14` and `symbolCount: 11`, `DEFAULT_JOURNAL_LENGTH` keeps `4096`, no symbol is added, renamed or removed, and `tests/storeroom-surface.test.ts` is left as filed (`src/main/storeroom.ts:45-53`; `brief.md` §2).
- The store's type is named `ReturnType<typeof createProfileStore>`, so no file under `src/main/data/` spells a package type or opens a second import (D-5).
- Everything but `index.ts` is private to the module, and the unit battery imports nothing but `src/main/data/index.ts`: its one injection point is a mock of the seam, which is the package's route into this tree (D-14; `platform.md` §4).
- The five registrations, the gate's sixth group and the `RpcMethod` entries are `interface.md` §4/§5 and are L4's to execute; this module's whole contribution to them is `createDataSurface` and its `DataSurface` value (`interface.md` §5; D-11).

## 2. One written name, and the store built late

- The profile is `<profileDir>/provident-profile.json`: the directory is the caller's and the name is a module constant, `PROFILE_FILE_NAME` (`persistence.md` §1; `interface.md` §2). The module writes no byte of it, no `.tmp`, no lock and no sidecar (`persistence.md` §1, §5; D-13).
- Its own filesystem act is the existence probe and nothing else: an `lstat` at that one name, whose success means the name is occupied — a zero-length file, the store's image, a directory, a dangling symlink (`persistence.md` §1; `guide §8.2`).
- `createDataSurface` constructs no store and touches no file: it records the options and returns the five operations, and every field of the options is read lazily inside the guarded body, so the factory cannot throw (`interface.md` §2; D-13; D-11).
- The store is built at the first operation that needs one — `write` always, `read`/`list`/`delete` only where the name is occupied — and kept for the process's life: one store per surface, no second `filePath`, no re-construction (`persistence.md` §7; `guide §3.2, §9.1`; D-13).
- A profile that is read only therefore costs the probe and no construction, and the file is brought into being by the store's own exclusive create at construction, a residue of the first `write` that the store performs before any verb runs (`behaviour.md` §1; `guide §9.1`; such a file boots cold and holds no row, `persistence.md` §9 P-1).
- Where the directory is absent the name cannot be occupied, so `read`/`list`/`delete` answer the cold tier and `write` answers `store-unreachable`; where the name is occupied but construction refuses, all five answer `store-unreachable` and nothing is created (`behaviour.md` §1, §9; `guide §8.2`; ASM-L3-2).

## 3. The operations

The five share one preamble, and its order is the order the checks run in (`behaviour.md` §4; D-11):

```ts
g = parse(args)            // per-tool declared member set, then the path or cursor domain
if (!g.ok) return g.ledger                          // interface.md §1; behaviour.md §4
path domain: an array, dense, each element a string or a non-negative safe integer
first segment begins 'mem.' | 'temp.' | 'secure.' -> 'volatile-path'          // D-13
path.length === 0 on write | delete -> 'root-not-writable'                    // interface.md §1; D-12
```

- The member set is checked first and refused **by name**; on `write` an **absent** `value` is `malformed-arguments`, while a supplied `undefined` is a value the store's own walk refuses as `value-not-admitted` (`interface.md` §1; `behaviour.md` §4; `guide §10`).

**`read`** — a literal row and a container branch are told apart by `readLiteral`, the package's own leaf-narrowed read (`guide §4`):

```ts
r = port.open()                                     // lazily: cold | ready | unreachable
if (r.kind === 'unreachable') return r.ledger                       // behaviour.md §5
if (r.kind === 'cold') return g.path.length === 0
  ? { status:'read', kind:'branch', path:[], value:{} }             // behaviour.md §1
  : { status:'absent', path: g.path }                              // behaviour.md §1
try { if (g.path.length === 0) return branch(r.store.read([]))       // guide §4 rule 1
      return row(r.store.readLiteral(g.path)) }                     // guide §4
catch (e) { return mapProbe(e, g.path) }                            // the three arms below
```

The probe's arms: a literal answers `kind:'row'` with the value the store copied out; `ReadTargetIsBranch` answers `kind:'branch'` with `read(path)`'s assembled value; `AddressNotFound` and `LeafHasNoDownstream` answer `{status:'absent', path}` — absence is an answer and never an empty success (`interface.md` §2, §3; `guide §4, §8.1`).

**`write`** — one path/value pair at the `file` tier, the store's own durability unit (`interface.md` §1; `guide §9.2`; D-13):

```ts
r = port.construct(); if (r.kind === 'unreachable') return r.ledger   // behaviour.md §5
try { r.store.write(g.path, 'file', g.value)          // no fourth position: guide §3.3
      cursor = journal.append('write', g.path, 'present')            // D-12
      return { status:'committed', path: g.path, cursor } }           // interface.md §2
catch (e) { return mapWrite(e, g.path) }              // no cursor and no entry: behaviour.md §4
```

**`delete`** — the module names one row and never the store's whole-target arm, so it asks whether a row stands before it acts (`ASM-L2-6`; D-12):

```ts
r = port.open()
if (r.kind === 'unreachable') return r.ledger
if (r.kind === 'cold') return emptyReceipt(g.path)                  // behaviour.md §1
try { r.store.readLiteral(g.path)                     // a row stands at the address
      rec = r.store.delete(g.path, 'file')            // one tier token, never an array: guide §5.2
      removed = rec.tiers.length > 0
      cursor = removed ? journal.append('delete', g.path, 'absent') : null
      return { status:'committed', path: g.path, removed, tiers: rec.tiers, cursor } }
catch (e) { return mapProbe(e, g.path) }              // branch | absent -> emptyReceipt
```

- The empty receipt is `{status:'committed', path, removed:false, tiers:[], cursor:null}`, reached with **no** `AddressNotFound` leaving this module: the shipped `delete` throws it where nothing stands, so the module learns that nothing stands from the probe and never enters the throwing arm (`behaviour.md` §6; `guide §5.3`, measured false at this head; exception §7; D-5, D-11).

**`list`** — row paths only, one store call, sorted by the path's JSON text (`ASM-L2-2`; `interface.md` §2):

```ts
r = port.open(); if cold -> { status:'read', prefix: g.prefix, paths: [], count: 0 }
if (r.kind === 'unreachable') return r.ledger                       // behaviour.md §5
if (g.prefix === null || g.prefix.length === 0) rows = walk(r.store.read([]), [])  // guide §4 rule 1
else try { r.store.readLiteral(g.prefix); rows = [g.prefix] }        // that address holds a row
     catch (e) { ReadTargetIsBranch -> rows = walk(r.store.read(g.prefix), g.prefix)
                 AddressNotFound | LeafHasNoDownstream -> rows = [] }
rows.sort(by JSON.stringify)                                        // ASM-L2-2
return { status:'read', prefix: g.prefix, paths: rows, count: rows.length }
```

`walk(v, at)` emits `at` for a scalar, recurses over an array's indices `0…length-1` and an object's own enumerable keys, and emits nothing for an empty container — so a branch is never reported as a row (`interface.md` §2; `guide §4`, arms `R-2`/`R-3`/`W-4`).

**`journal`** — the window is this process's own and the store is never consulted (`persistence.md` §6; D-12):

```ts
w = journal.window(g.from)                            // g.from is `cursor ?? 0`
if (!w.ok) return { status:'refused', reason:'cursor-unknown', message, floor: w.floor, through: w.through }
return { status:'read', from: g.from, through: w.through, floor: w.floor, entries: w.entries, count: w.entries.length }
```

- `from` is an integer `>= 0` or the answer is `malformed-arguments`; an integer below `floor` or above `through` is `cursor-unknown` carrying both bounds so a caller re-anchors (`behaviour.md` §4, §6; D-12).
- A cursor is minted from `1` per committed write and per delete that removed a row; a refused call mints none and appends nothing; the window holds the newest `journalLength` entries, `floor` is the highest cursor that fell out, `through` is the last minted (`persistence.md` §6; D-12).
- No entry carries a value: `{cursor, kind, path, changedTo}`, with the path a fresh copy, so nothing in the window can be replayed or mutated into the register (`D-12`; `interface.md` §2).

## 4. The guardrails, as invariants the battery drives

| # | Invariant | Cite |
|---|---|---|
| G1 | no operation throws for any argument of any type or any store state: every failure is a `refused` ledger, and the store call of every operation sits inside the one `try` that produces it | D-11; `interface.md` §6 |
| G2 | a refusal moves no byte and mints no cursor: where a save failed the store's own rollback has already run and this module adds no compensation | `behaviour.md` §4, §5; `guide §9.4`; D-11 |
| G3 | exactly one written name, `<profileDir>/provident-profile.json`, brought into being by the store's own exclusive create at construction and by no act of this module's; it is never truncated, parsed or repaired here, and no second name exists at any point | `persistence.md` §1, §5, §9; `guide §9.1`; D-13 |
| G4 | nothing reverses: no `rollback`, no undo, no replay, and no constraint or listener is registered on any instance this module builds | D-12; `interface.md` §6 |
| G5 | the volatile-spelling refusal moves no byte, creates nothing, and leaves `list` unmoved | D-13; `behaviour.md` §7 |
| G6 | `read` answers `kind:'row'` for a literal and `kind:'branch'` for a container, and `list` answers the paths that hold a row | `interface.md` §2; ASM-L2-2 |
| G7 | a delete where no row stands answers `committed`/`removed:false`/`tiers:[]`/`cursor:null`, and no store refusal is served as an answer, a `store-refused` ledger or a throw | `behaviour.md` §6; `guide §5.3`; D-11, D-5 |
| G8 | a store status outside the mapped set is never read as success: it answers `store-refused` with that status verbatim in `storeStatus` | `interface.md` §2, §3; `guide §8.1`; D-5, D-11 |
| G9 | the value's admission is the package's walk and never a second one here: nothing is wrapped, defaulted or dropped, and a refused value lands no row | `persistence.md` §3; `guide §10`; D-13 |
| G10 | every answer is a fresh object and `read`'s value is the store's own copy-out, so no answer aliases module or store state | `guide §10`; D-13 |
| G11 | the tier token is always spelled — `'file'` at `write` and at `delete` — never an array and never a supplied `undefined` | `guide §3.3, §5.2` |
| G12 | `exclusion-closed` is never produced here: it is the invocation turn's answer ahead of the adapter, so no operation mints it | `interface.md` §3, §4; `behaviour.md` §8 |

The mapping behind G8 is one table, and it is closed against the package's twenty-status set plus its escape arm: `signatures.md` §3 (`guide §8.1`; D-5).

## 5. The harness, its budget, and the commands that must go green

- `N = 15` — 5 tools + 5 routes + the 5 `provident-storeroom` exports called (`storeCreate`, `read`, `readLiteral`, `write`, `delete`; `register` has no call site) — so **the harness cap is `50 + 10 × 15 = 200` lines** (`strata/modules.json`; exception §1; D-14; `platform.md` §4).
- The harness is `tests/unit/central-data/support/`: a temp-profile factory (a `mkdtemp` directory, its removal, and the `<dir>/provident-profile.json` name it seeds or scans), a scripted seam factory (a `vi.mock` of `src/main/storeroom.ts` returning a fake `createProfileStore` whose `read`/`readLiteral`/`write`/`delete` throw chosen store refusals), and an answer-shape assertion helper. Driver, fixtures, factories and mock seams together: **≤ 200 lines** (D-14; `platform.md` §4).
- The battery — `tests/unit/central-data/*.test.ts` — is evidence and does not count against the cap (D-14).
- Both commands run from the workspace root and must go green once L4 lands: `npx vitest run tests/unit/central-data` and `npm run typecheck:tests` (`brief.md` §6; D-1 §4).
