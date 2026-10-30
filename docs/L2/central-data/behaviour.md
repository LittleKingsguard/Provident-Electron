# L2 — `central-data`: the behaviour

- **Layer:** L2 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 3 — one statement re-grained against the tree and no design: a read-only profile does not cost “no filesystem act” — every operation takes one reachability reading first (`probe()` in `src/main/data/store.ts`); rev 2 and behind are read through this one
- **Status:** DESIGN — the expected behaviour of the five `provident.data.*` tools, stated as observable outcomes; the integration battery is filed against this file (D-1 §4)
- **Inputs:** `docs/L2/central-data/interface.md` (§1-§7 fix the surface), `persistence.md` §9, L1 rev 2 §3/§4/§5, `docs/L1/central-data-census-exception.md` §1/§7, D-5/D-11/D-12/D-13, the package's shipped guide and declaration at this head (read, never edited — D-5)
- **Ceiling:** 150 lines, class max (D-1)
- **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`, the package's shipped consumer guide; it is read here and never edited (D-5)

## 1. A first-ever profile serves nothing

| Drive | Answer |
|---|---|
| `createDataSurface({ profileDir })`, nothing else | no store constructed, no file created, no byte read (D-13) |
| `list` | `{ status:'read', prefix:null, paths:[], count:0 }` (D-11) |
| `read` on any path | `{ status:'absent', path }` — absence is an answer, never an empty success (D-11) |
| `read { path: [] }` | `{ status:'read', kind:'branch', path:[], value:{} }` — the register stands and holds nothing, and no store is constructed for it (`guide §4`; D-13) |
| `delete` on any path but `[]` | `{ status:'committed', path, removed:false, tiers:[], cursor:null }` — the empty receipt §6 declares, reached without a store refusal (D-11) |
| `journal` | `{ status:'read', from:0, through:0, floor:0, entries:[], count:0 }` (D-12) |

- The store is constructed at the first operation that needs one, so a read-only profile costs **one reachability reading per
  operation and no store**: `probe()` — `readProfile(profileDir)` in `src/main/data/store.ts` — is taken at the top of every
  operation in `src/main/data/surface.ts`, and while the reading is `absent` the profile file does not exist after `list` —
  the construction a `filePath` forces (an exclusive zero-length file) is deferred to the first write (`guide §9.1`; D-13; `persistence.md` §1).

## 2. A write commits through the store and is re-served

| Drive | Expected |
|---|---|
| `write { path:['window', 'tabs', 0, 'title'], value:'x' }` where the parent stands | `{ status:'committed', path, cursor:1 }`; the store's `file`-tier write is the durability unit (`guide §9.2`; D-13) |
| `read` at the same path | `{ status:'read', kind:'row', path, value:'x' }` — a `row` is a literal standing at that exact address (D-11) |
| `list` | the path appears once; `count` is the number of rows that answered (D-11) |
| a second `write` at the same path | committed with the next cursor; `read` serves the new value; `list.count` unchanged (D-11) |
| `write` beneath a parent that does not stand | `{ status:'refused', reason:'parent-absent', message }` and nothing lands: a nested write does not create its parent (`guide §4`; D-11) |
| `write` where a different container kind stands | `refused`, `reason:'container-kind-conflict'`: the store never converts a container (`guide §4`; D-11) |
| `write { path:[], … }` | `refused`, `reason:'root-not-writable'` — no one-call write of the whole profile (D-12) |
| `read` at a path where only children stand | `{ status:'read', kind:'branch', path, value }`, the assembled value (D-11) |

## 3. The next process serves the same rows

- A fresh surface over the same `filePath` constructs the store at its first operation and boots from the bytes: the same
  `read` answers and the same `list` (`path`, `count`) answer (`guide §9.2`; D-13).
- That process's `journal` starts empty — `through:0`, `entries:[]` — because the change sequence is the process's own and
  the store's journal is not readable (`guide §5.4`; D-12).
- Nothing from the first process's volatile attempts appears, because nothing volatile was ever written (§7).
- A row deleted with the `file` tier stays deleted across the boot: a `file`-tier delete saves its own op (`guide §9.3`; D-12).

## 4. A malformed write is refused with a reason word and changes nothing

| Drive | Answer |
|---|---|
| `arguments` not a plain object, or an own key outside `{path, value}` | `refused`, `reason:'malformed-arguments'`, the key or member named in `message` (D-11) |
| `value` absent, or `path` sparse / negative / fractional / above `2^53 − 1` | the same word, the member named (D-11) |
| `value` carrying `null`, `undefined`, a function, a symbol, a cycle, a `Map`, a class instance, an accessor, or depth over `126` | `refused`, `reason:'value-not-admitted'` — the package's boundary walk refuses the whole value before any store verb (`guide §10`; D-11) |
| a path whose first segment begins `mem.`, `temp.` or `secure.` | `refused`, `reason:'volatile-path'` (§7; D-13) |
| `journal { cursor:'x' }` / `{ cursor:-1 }` | `refused`, `reason:'malformed-arguments'` (D-11) |

- Every one of these answers **normally**: no throw, no protocol error, and the row that stood at the path is still served by
  `read` with its bytes unchanged (D-11).
- A refused call mints no cursor and adds no journal entry: the sequence records committed changes only (D-12).

## 5. A failing write leaves no tear and no residue

- A write whose `file`-tier save cannot land answers `{ status:'refused', reason:'write-failed', message }`; the store's own
  journal rollback has already run and the profile's bytes are byte-identical to the bytes that stood before (`guide §9.4`; D-11).
- No `.tmp` file, no lock, no sidecar and no second name is written at any point: this module writes no byte of the profile
  itself, so a tear has no producer at this layer (D-13).
- A `storeCreate` that refuses answers `{ status:'refused', reason:'store-unreachable', message }` on every data tool and
  creates nothing — no instance, no file, no byte (`guide §8.2`; D-11).

## 6. Delete and journal are observable, in order, with a cursor — and nothing reverses

| Drive | Expected |
|---|---|
| `delete { path }` where a row stands | `{ status:'committed', path, removed:true, tiers:['file'], cursor:2 }`; then `read` → `absent` and `list` loses the path (D-11) |
| `delete { path }` where **no row stands at the address** — nothing there, or only rows beneath it | `{ status:'committed', path, removed:false, tiers:[], cursor:null }`: no cursor is minted, no journal entry is added, no byte moves, and the rows beneath the address are untouched (D-11, D-12; ASM-L2-6) |
| `journal` (no cursor) | every committed change of this process, oldest first, each `{ cursor, kind:'write'|'delete', path, changedTo }`; `count` is their number (D-12) |
| `journal { cursor:2 }` | only the changes after position 2; `from` echoes the requested cursor and entries keep ascending cursors (D-12) |
| `journal { cursor: 99 }` or a cursor below the retained floor | `refused`, `reason:'cursor-unknown'`, and the answer carries the window's own `floor` and `through` so a caller re-anchors (D-12) |
| any `data.*` call that would reverse a change | no such call exists: no `undo`, no `rollback`, no `replay`, no constraint or listener registration on this surface (D-12) |

- **The delete-of-absent arm is the correction of a citation, and the correction is the measurement.** `guide §5.3` declares *"a delete that removes nothing is a SUCCESS — it answers `tiers: []` rather than throwing"*, and that is **not true of the shipped tree at `57c5825`**: the store throws `AddressNotFound` at both the whole-target and the `file`-tier spellings, and `tiers: []` is reachable only where the address stands at another tier. The receipt above is still the answer D-11 owes, so the module reaches it **without a store refusal reaching the caller** — whatever it does to know that no row stands is L3's, and no `AddressNotFound` is ever served as an answer, a `store-refused` ledger or a throw (D-11; exception §7, where the package side is filed upstream and never patched — D-5).
- The branch arm is **declared and not driven by an L2 row**: a delete names one row, so it never performs the store's whole-target removal, and a subtree is never wiped by a call that named no row (D-12; ASM-L2-6). `journal` observes; it reverses nothing. Its entries carry no value, so a caller reads a value with `read` and never out of a journal (D-12).

## 7. Volatile spellings never land in the persisted file

- A write, read or delete at a path whose first segment begins `mem.`, `temp.` or `secure.` answers `volatile-path`; nothing is
  created, nothing is removed, and `list` is unmoved (the `isVolatile` guard and its `refusal('volatile-path')` arms in `src/main/data/args.ts`; D-13).
- After a session that attempted all four of the app's tier spellings, the profile's bytes carry no `mem.`, `temp.` or `secure.`
  spelling — asserted as an absence over the bytes, never as a parse of the store's image (D-13; L1 rev 2 §5 S-8).
- The refusal is a value, so the attempt is visible to the agent instead of being silently dropped the way the retired
  projection dropped it (D-11, D-13).

## 8. While the exclusion tier is open

- Every `data.*` call already dispatched answers the invocation-turn refusal value
  `{ status:'refused', reason:'exclusion-closed', message }`, with the server-authored message and no store call: the wrapper
  sits at the registration boundary, ahead of the adapter (`src/main/mcp-server.ts:94-108,830-831`; D-11).
- No profile byte moves and no store is constructed at that turn (D-11).
- `exclusion-closed` is the server's channel token and not a reason word of this module's vocabulary; `tier4-closed` is the
  tier-4 reader's inverse token — the token is declared at `src/main/mcp-server.ts:42-57` and minted by the settings
  surface at the `TIER4_CLOSED_REFUSAL` constant and the `read` body's `open ? TIER4_CLOSED_REFUSAL : null` arm in `src/main/settings-surface/index.ts`, where the reader that answers it lives now that
  `src/main/security-store.ts` is deleted — and it does not appear on this surface (D-16; L1 rev 2 §4).
- The registry toggle that also runs at the transition is the landed gate's business and this module adds no second mechanism
  (`src/main/mcp-server.ts:649-660`; D-11).

## 9. Two profiles are disjoint; a foreign image answers cold and recovers by declaration

| Drive | Expected |
|---|---|
| two surfaces over two `profileDir`s | two registers: a write through one is never served by the other; their `list`s and `journal`s are disjoint (D-13) |
| a profile seeded with the store's own empty image (`{}`) | `list` answers `count:0`, `read` answers `absent`, and the next `write` answers `committed` — the bytes then carry that row (`guide §4, §9.3`; D-13) |
| a `profileDir` under which the profile's file name **cannot be occupied** (a regular file at that directory, a dangling symlink, an unwritable directory, or a directory standing at the file's own name) | every one of the five tools, **`journal` included**, answers `{ status:'refused', reason:'store-unreachable', message }`, with no instance and nothing created (`guide §8.2`; D-11) |
| an **absent but writable** `profileDir` | not the arm above: `list` and `read` answer the cold tier, and the first `write` is where the store's construction can refuse — answering `store-unreachable` and creating nothing (D-13; ASM-L2-7) |
| a foreign, unparsable profile image is seeded | `list` answers the cold tier (`count:0`), `read` answers `absent`, and the next `write` answers `committed` and replaces the bytes — **measured at `57c5825`: the store boots cold and the foreign bytes stand untouched until that `file`-tier save** (`persistence.md` §9 P-1; D-13, D-5) |
| the profile file removed between two operations | the next `read` answers the cold tier again and the next `write` re-creates the file: this module's file is its own and holds no state it must be told about (D-13) |

- **The two unreachable arms are one rule in two spellings**, and the split above is the rule: §5's *"a `storeCreate` that refuses answers `store-unreachable` on every data tool"* is served by a reachability reading that costs no store instance, so `journal` answers it too — a window is not "empty" where the profile can never be built, and one fact is told once rather than five ways (D-11). `tests/integration/central-data/profile-file.test.ts` drives the occupied-name arm across all five tools; the absent-name arm is the cold tier until a write constructs (D-13; ASM-L2-7).
- This module never unlinks, truncates, parses or rewrites the profile file, so it cannot and does not "repair" a foreign image:
  the recovery is the store's boot plus the next committed save, and where the boot itself refuses, the answer is the refusal. The
  recovery arm is therefore **stateable by this consumer and declared by no package clause**, which is the declaration gap
  `persistence.md` §9 records as finding P-1 (D-5).

## 10. Assumptions

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L2-6 | a `delete` names **one row**: at an address where no row stands it answers the empty receipt and removes nothing, even where rows stand beneath it (D-11, D-12) | the store's whole-target arm, which removes every version at the target and everything downstream of each in one call the agent never named and nothing reverses (D-12) |
| ASM-L2-7 | the unreachability reading precedes any store instance, so a name that cannot be occupied refuses all five tools while an absent name stays the cold tier until a write constructs (D-13) | reading both as the cold tier, which serves `absent` for a directory the store can never be built under and drops the refusal the integration battery drives (D-11) |
