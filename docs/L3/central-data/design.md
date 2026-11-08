# L3 — `central-data`: the module design

- **Layer:** L3 · **Unit:** `central-data-management`, carrying `tier-readout` · **Branch:** `strata` (D-6) · **Rev:** 7 — **A PASSING `read` CARRIES EACH NODE'S OWN TIER, AND IT ASKS THE STORE'S TIERED VERB ONCE**: §3's `read` composes `store.readTiered` at ONE call site — the `readLiteral`-then-`read` pair, and with it both `path.length === 0` arms, are gone — `kind` is compiled FROM the node it received (`'row'` iff that node is a LEAF), the cold arm answers `absent` at `[]` rather than a register node this module spelled itself, §1's census moves `14 → 15` over `13` symbols and §5's `N` `15 → 16` (cap `200 → 210`), and §4 gains `G13`/`G14` — the node's one spelling, and the arms that gain nothing (D-134, D-133, D-101, D-53); Rev 6 — the commit's log is read once, at the seam (`D-103`); Rev 5 — the tier is the caller's (`D-101`); Rev 4 — the construction is deleted and the instance is required (`D-80`) · **Status:** DESIGN — the module and its batteries are filed and landed; this revision is the read verb's, `src/**` is read-only in this pass, and every row it names is RED until its L4 lands (§5) · **Ceiling:** 150 lines, class max (D-1)
- **Inputs:** `docs/L2/central-data/interface.md` **rev 14** (§1, §2, **§2a**, §3, §5, **§9 `H-1`…`H-4`**) and `behaviour.md`/`persistence.md` as landed; L1 `tier-readout` §1/§2/§3/§7 (`E-1`…`E-3`; `endpoints 15 → 16`); `strata/decisions.md` D-5/D-11/D-12/D-13/D-14/D-18/D-26/D-30/D-40/D-41/D-43/D-53/D-79/D-80/D-101/D-103/D-107/D-133/D-134; the read-only package's `index.d.ts` — `TieredNode`, `readTiered` (D-5)
- **Split:** every signature stands in `signatures.md`; this file carries the structure, the reachability reading, the operations' pseudocode, the fourteen guardrails, the five legs and this design's five assumptions (`brief.md` §3; D-1 §1) · **Citations:** `guide §n` is the package's shipped `README.guide.md`, `the declaration` its `index.d.ts`; both read and never edited (D-5)

## 1. Structure and file layout

`src/main/data/` is seven files and this unit adds no eighth; the seam keeps its census, which `D-134` already re-grained (`interface.md` §2; D-5).

| File | What it holds | Cite |
|---|---|---|
| `src/main/data/index.ts` | the module's entry and the only file another module imports: exactly the surface `interface.md` §2 declares and nothing else, **the read node's name among it as a TYPE re-export** | §2; D-11, D-53 |
| `src/main/data/types.ts` | the declared types — **the read answer's node alias on the read arm**, the declared-root pair, the twelfth reason word — and the `DATA_TOOL_NAMES` value | §2, §2a; D-101, D-134 |
| `src/main/data/args.ts` | argument validation: the declared members, the path domain, the tier domain and its two defaults, the cursor domain, the volatile spelling, the sort key | §1; `behaviour.md` §4; D-13, D-101 |
| `src/main/data/store.ts` | the profile's one name, the reachability reading of §2, and the port the operations drive — which returns the caller's instance and constructs nothing | `persistence.md` §1; `behaviour.md` §9; D-13, D-80 |
| `src/main/data/mapper.ts` | the store-status mapping and this module's fixed sentences, the reading's `store-unreachable` sentence among them | §2, §3; `guide §8.1, §8.2` |
| `src/main/data/journal.ts` | the bounded in-memory change window, cursors minted from 1 | `persistence.md` §6; D-12 |
| `src/main/data/surface.ts` | `createDataSurface` and the five operations — one answer site for a tool call and for its route, **the ONE `readTiered` call and the ONE `kind` derivation**, and the one `repaired` derivation, a `repair-run` entry's PRESENCE | §2, §2a, §3, §5; D-11, D-103, D-134 |

- **The store's type reaches this module through the seam and no file here spells the package** (D-5, D-53): `ProfileStore` is `ReturnType<typeof createProfileStore>` in `store.ts`, so `DataReadNode` — `ReturnType<ProfileStore['readTiered']>` — is the package's own type arriving with no second spelling, **no seam byte and no new member**: `src/main/storeroom.ts`, `mapper.ts`, `args.ts`, `store.ts` and `journal.ts` are byte-for-byte unmoved (`interface.md` §9 `H-4`; D-134, D-103).
- **The package is imported by THREE files** — the seam, the secure crossing's own instance (D-16) and the tab record's own (D-63) — and `src/main/data/` names it in `import type` and `ReturnType<typeof …>` only, both erased at build (D-80).
- **The pinned census is `15` members over `13` symbols and this unit moves neither figure**: `readTiered` joined `MEMBERS` third and `memberCount` read `15` at `D-134`, `symbolCount` stayed `13`, `DEFAULT_JOURNAL_LENGTH` stays `4096`, and `tests/e2e/central-data/scenarios.test.ts` `S-9` asserts both counts (the census block of `src/main/storeroom.ts`; D-134, D-86).
- The five registrations, the gate's sixth group and the `RpcMethod` entries are `interface.md` §4/§5's and landed; this module contributes `createDataSurface` and its `DataSurface` value, which `src/main/main.ts` constructs and hands to the server (D-11, D-15; §4, §5). **`src/main/mcp-server.ts`'s `provident.data.read` description is another row's** and L1 `E-4` is where it is named (D-18).

## 2. One written name, and the reading that answers whether it can be occupied

- The profile is `<profileDir>/provident-profile.json`: the directory is the caller's and the name is the module constant `PROFILE_FILE_NAME`. The module writes no byte of it, no `.tmp`, no lock, no sidecar, and creates no directory (`persistence.md` §1, §5; D-13).
- **Its own filesystem act is one reachability reading, taken at the top of every operation and before any store instance is consulted**: *can this one name be occupied here at all?* It constructs nothing, creates nothing and moves no byte; its failures are answers, never throws; and it is probes only — an `lstat` at the name, a resolution where it is a symlink, and where the name is absent an `lstat`/`access` at the parent it would be created in (`persistence.md` §1; `behaviour.md` §5, §9; `ASM-L2-7`; G1; D-13).
- It answers one of three words (`signatures.md` §2, `ProfileReading`): **`occupied`** — the name stands and can back a store file, a regular file this process may write or a symlink resolving to one (`guide §9.1`; `persistence.md` §1).
- **`absent`** — the name does not stand and nothing forbids it, the cold tier, reached by the name being REMOVED under the live process, whose next `write` is the instance's own save (`guide §9.1`; D-80; ASM-L3-U2).
- **`unreachable`** — the name cannot be occupied: `lstat` fails with anything but `ENOENT`, the name stands as something that cannot back a store file, or it is absent under a parent that is not a writable directory. An `unreachable` reading answers `{status:'refused', reason:'store-unreachable', message}` for **all five operations, `journal` included**, with no store built, no file created and no byte moved (`guide §8.2`; `behaviour.md` §9; D-11, D-13).
- `createDataSurface` constructs no store, reads nothing and touches no file: it records the options and returns the five operations, every field read lazily inside the guarded body, so the factory cannot throw — **and no operation constructs one either**: `store()` is `options.store`, the caller's instance, returned as handed in, with no deferred construction and no arm that could answer one (`interface.md` §2; `behaviour.md` §1; `persistence.md` §7; D-11, D-79, D-80).

## 3. The operations

The five share one preamble, and its order is the order the checks run in (`behaviour.md` §4; D-11):

```ts
g = parse(args)          // the tool's declared member set by name, then the path, tier or cursor domain
if (!g.ok) return g.ledger                          // interface.md §1; behaviour.md §4
// tier domain on write | delete | read: 'file' | 'mem' | 'temp', the member named otherwise   // D-101
// first segment begins 'mem.' | 'temp.' | 'secure.' -> 'volatile-path'        // D-13
// path.length === 0 on write | delete -> 'root-not-writable'; at a DECLARED root, another tier -> 'declared-tier', ahead of the reading   // interface.md §1; D-101
r = port.probe()         // THE reading of §2, taken before any store: occupied | absent | unreachable
if (r.kind === 'unreachable') return r.ledger     // all five, journal included: behaviour.md §9
```

- The member set is checked first and refused **by name**, ahead of the reading and of any byte; on `write` an **absent** `value` is `malformed-arguments`, while a supplied `undefined` is a value the store's own walk refuses as `value-not-admitted` (`interface.md` §1; `guide §10`). Every operation then reads `r` the way §2 spells it — `absent` is the cold tier for `read`/`list`/`delete`/`write`, the window alone for `journal` — and no operation asks it a second question (`ASM-L2-7`; D-80).

**`read`** — ONE call to the store's tiered verb, replacing the `readLiteral`-then-`read` pair the two passing arms composed (`interface.md` §2a, §9 `H-2`; D-134):

```ts
if (r.kind === 'absent') return { status:'absent', path: g.path }   // the COLD arm: no store answered, so no node and NO tier is minted here (§2a; D-80)
s = port.store()                                    // THE CALLER'S instance; nothing is built here (D-80)
try { n = g.tier === null ? s.readTiered(g.path)                          // the position is OMITTED, never a supplied `undefined` (D-101)
                          : s.readTiered(g.path, g.tier)                  // a named token NARROWS the read; the node names what the STORE answered, never what the caller asked
      return { status:'read', kind: kindOf(n), path: g.path, value: n } } // `n` is the release's node, its members INLINE; `kind` is compiled FROM it (D-134, D-53)
catch (e) { o = readOutcome(e)                      // ONE argument, the caught value (signatures.md §2)
            return o.kind === 'ledger' ? o.ledger : { status:'absent', path: g.path } }
```

- **`kindOf(n)` — the total function of node kind, and the discriminator is the node's SHAPE, not its key count** (`signatures.md` §2): `'row'` exactly when `n` is a LEAF — two own keys, `value` among them, and `value` a PRIMITIVE — and `'branch'` otherwise, which covers an OBJECT node, an ARRAY node (`{_tier, value:[…]}`, its `value` an ARRAY) **and an object node whose own member is named `value`** (`{_tier, value:{_tier, …}}`), and the empty register node `{_tier}`. So the two words describe ONE node and no arm carries a tier beside it (§2a; ASM-L3-U4).
- **`branch` is no longer reachable from this verb**: `readTiered` reads an object and an array as readily as a leaf, so `ReadTargetIsBranch` is not in the refusal set this call can meet — `readOutcome`'s `branch` arm stays live for `list`'s walk and `delete`'s standing probe, which keep their `read`/`readLiteral` calls (`interface.md` §9 `H-4`; D-134, D-103). **The occupied empty address needs no arm of its own**: `readTiered([])` answers the store's own register node — `{_tier}` where the register holds no row — the same call that answers a register with members (D-134).
- An absence is answered and never an empty success: `AddressNotFound`, `LeafHasNoDownstream` and `TierNotFound` are `{status:'absent', path}` (`interface.md` §2, §3; `guide §4, §5.1`; D-101).

**`write`** — one path/value pair at the caller's tier, the store's own durability unit (`interface.md` §1; `guide §9.2`; D-13):

```ts
s = port.store()                                                     // the supplied instance saves, or refuses
try { rec = s.write(g.path, g.tier, g.value)   // the caller's token or the default 'file'; no fourth position: guide §3.3
      cursor = journal.append('write', g.path, 'present')            // D-12
      return { status:'committed', path: g.path, cursor, repaired: passRepaired(log), log } }  // log = commitLog(rec) ?? [], the SEAM's one declared reader of the NON-enumerable member (D-103)
catch (e) { return refusalLedger(e, g.path) }         // no cursor and no entry: behaviour.md §4
```

**`delete`** — the module names one row and never the store's whole-target arm, so it asks whether a row stands before it acts (`ASM-L2-6`; D-12):

```ts
if (r.kind === 'absent') return emptyReceipt(g.path)               // behaviour.md §1
s = port.store()                                                     // the caller's one instance (D-80)
try { s.readLiteral(g.path, g.tier)            // a row stands at the address, AT THIS TIER
      rec = s.delete(g.path, g.tier)            // one tier token, never an array: guide §5.2
      removed = rec.tiers.length > 0
      cursor = removed ? journal.append('delete', g.path, 'absent') : null
      return { status:'committed', path: g.path, removed, tiers: rec.tiers, cursor, repaired: passRepaired(log), log } }  // D-103
catch (e) { o = readOutcome(e); return o.kind === 'ledger' ? o.ledger : emptyReceipt(g.path) }   // branch | absent -> the empty receipt
```

The empty receipt is `{status:'committed', path, removed:false, tiers:[], cursor:null, repaired:false, log:[]}` — its `log` empty because this arm reached no store and so ran no pass — reached with **no** `AddressNotFound` leaving this module (`behaviour.md` §6; `guide §5.3`; D-103, D-5, D-11).

**`list`** — **UNTOUCHED, and that is the readout's boundary**: row paths only, one store call, sorted by the path's JSON text, its walk still on `read`/`readLiteral`, and it declares no `tier`, so a per-path tier is nobody's answer here (`interface.md` §2a; `ASM-L2-2`; D-101):

```ts
if (r.kind === 'absent') return { status:'read', prefix: g.prefix, paths: [], count: 0 }
if (g.prefix === null || g.prefix.length === 0) rows = walk(s.read([]), [])   // guide §4 rule 1
else try { s.readLiteral(g.prefix); rows = [g.prefix] }
     catch (e) { o = readOutcome(e); 'ledger' -> return o.ledger; 'branch' -> rows = walk(s.read(g.prefix), g.prefix); 'absent' -> rows = [] }
rows.sort(by JSON.stringify); return { status:'read', prefix: g.prefix, paths: rows, count: rows.length }
```

`walk(v, at)` emits `at` for a scalar, recurses over an array's indices `0…length-1` and an object's own enumerable keys, and emits nothing for an empty container — so a branch is never reported as a row (`interface.md` §2; `guide §4`, arms `R-2`/`R-3`/`W-4`).

**`journal`** — the reading is consulted and the store is not: its window is this process's own (`persistence.md` §6; `behaviour.md` §9; D-12):

```ts
w = journal.window(g.from)      // r was read above and gated the call; no store is built, none is read
if (!w.ok) return { status:'refused', reason:'cursor-unknown', message, floor: w.floor, through: w.through }
return { status:'read', from: g.from, through: w.through, floor: w.floor, entries: w.entries, count: w.entries.length }
```

`from` is an integer `>= 0` or the answer is `malformed-arguments`; below `floor` or above `through` is `cursor-unknown` carrying both bounds; a cursor is minted from `1` per committed write and per delete that removed a row; a refused call mints none; and no entry carries a value — `{cursor, kind, path, changedTo}`, the path a fresh copy (`behaviour.md` §4, §6; `persistence.md` §6; D-12).

## 4. The guardrails, as invariants the battery drives

| # | Invariant | Cite |
|---|---|---|
| G1 | no operation throws for any argument of any type or any store state, **nor does the reading**: every failure is a `refused` ledger, and the probe and the store call of every operation sit inside the one `try` that produces it | D-11; §6; `behaviour.md` §5; D-80 |
| G2 | a refusal moves no byte and mints no cursor: where a save failed the store's own rollback has already run and this module adds no compensation | `behaviour.md` §4; `guide §9.4`; D-11 |
| G3 | exactly one written name, brought into being by the BOOT's construction and by no act of this module's — never truncated, parsed or repaired here, no second name at any point | `persistence.md` §1, §5, §9; D-13, D-80 |
| G4 | nothing reverses: no `rollback`, no undo, no replay, no constraint or listener registered on any instance this module builds, and no fixed sentence carries a reversal word | D-12; §6; `surface-and-profile.test.ts` |
| G5 | the volatile-spelling refusal moves no byte, creates nothing, and leaves `list` unmoved | D-13; `behaviour.md` §7 |
| G6 | `read` answers `kind:'row'` **iff the node it received is a LEAF** and `kind:'branch'` for an object node, an array node and the empty register node — the derivation is the node's SHAPE, never its key count — and `list` answers the paths that hold a row | §2a; ASM-L3-U4; D-134 |
| G7 | a delete where no row stands answers `committed`/`removed:false`/`tiers:[]`/`cursor:null`, and no store refusal is served as an answer or a throw | `behaviour.md` §6; `guide §5.3`; D-5, D-11 |
| G8 | a store status outside the mapped set is never read as success: it answers `store-refused` with that status verbatim in `storeStatus` | §2, §3; `guide §8.1`; D-5, D-11 |
| G9 | the value's admission is the package's walk and never a second one here: nothing is wrapped, defaulted or dropped, **and the readout is not applied to a value this module hands the store** — an answer handed back to `write` is stored as ordinary members, `_tier` and `value` included, because the readout is the read's compilation and does not round-trip | `persistence.md` §3; `guide §10`; D-13, D-134 |
| G10 | every answer is a fresh object — `path` copied, `value` the node the store answered, and nothing this module serves aliasing module or store state | `guide §10`; D-13; D-134 |
| G11 | **the tier is the CALLER's and it is exactly ONE token** — `file` where a `write` or a `delete` omits it, NO token at all (the position OMITTED, never `undefined`) on a `read` that omits it — and `declared-tier` where the address is a declared root and the token is not that family's | `guide §3.3, §5.2`; §1, §2; D-101 |
| G12 | `exclusion-closed` is never produced here: it is the invocation turn's answer ahead of the adapter | §3, §4; `behaviour.md` §8 |
| G13 | **the readout is the NODE's and it is spelled ONCE**: `DataReadNode` is `ReturnType<ProfileStore['readTiered']>`, so no file under `src/main/data/` spells the package, no seam byte is added, no seam member is minted and `S-9`'s census is the pin; no tier is ever a SET on the answer, `TierSet` being the ARGUMENT's type | §2a; `signatures.md` §1; D-134, D-53, D-103 |
| G14 | **the readout rides the two PASSING arms and nothing else**: no `tier` (and no node) on `absent` or on any ledger arm — an absence is about the caller's argument and a refusal that reached no store has no node — **no second read to LEARN a tier**, every node naming its own; and no member, tool, group, route or `RpcMethod` added, `list`'s walk unmoved | §2a; `behaviour.md` §4; D-133, D-107, D-18, D-101 |

The mapping behind G8 is one table, closed against the package's twenty-status set plus its escape arm: `signatures.md` §3 (`guide §8.1`; D-5).

## 5. The harness, its budget, the battery's disposition, and the five legs

- `N = 16` — 5 tools + 5 routes + the 6 `provident-storeroom` exports called (`storeCreate`, `read`, `readLiteral`, **`readTiered`**, `write`, `delete`; `register` has no call site) — so **the harness cap is `50 + 10 × 16 = 210` lines** (`strata/modules.json`; exception §1; D-14; `platform.md` §4).
- The harness as filed is `tests/unit/central-data/support/temp-profile.ts`: one temp-profile factory, one answer-shape helper and one `surfaceAt` that stands the BOOT's construction (`createProfileStore` and the two crossings' declared roots) — **no seam is scripted and no store is faked**, so fixture, helper and driver stay inside `210` (`temp-profile.ts`; D-14, D-80; `platform.md` §4).
- **THE BATTERY'S DISPOSITION** (`D-30`, `D-40`, `D-9`): the four MARKED files are **not re-grained** — their bare-value assertions become the on-notice reading of a shape this unit outdates — and this change's unit evidence is ONE new unmarked file, `tests/unit/central-data/read-node-readout.test.ts`, whose three rows gate: **`R-1`** an object node whose own member is named `value` answers `branch` with the member INLINE (the derivation G6 states, which no e2e or integration row drives); **`R-2`** an open register holding nothing answers the store's own `{_tier}` node; **`R-3`** the cold arm answers `absent` at `[]` and mints no tier. All three are RED at this head, each for the absence it names (ASM-L3-U5).
- **THE FIVE LEGS THIS CHANGE MUST BRING GREEN** (`brief.md` §6; D-1 §4; ASM-3): `npm run typecheck` `0`; `npm run typecheck:tests` `0`; `npx vitest run tests/integration/central-data/ tests/unit/central-data/`; `npx vitest run tests/e2e/tier-readout/`; `npm run build`. The fourth is L1's own battery and red until this unit lands; **the third's green is its GATING rows'** — the marked files inside it report the on-notice reading `D-30` sends to the rework, and `node scripts/strata-marks.mjs index` regenerates L1's registry for the new file (D-30, D-31, D-43).

## 6. This design's five assumptions, each with the alternative it rejected

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L3-U1 | the **occupied-name** arm refuses **all five** tools, `journal` included, which the unit battery's marked rows drive on four and the integration battery asserts on five | refusing only the tools a row happens to drive, which makes the answer depend on the battery's coverage instead of `behaviour.md` §9 |
| ASM-L3-U2 | the **absent-name** arm stays the cold tier — `read`/`list`/`delete`/`write` cold, `journal` its window — with the instance never consulted, reached by the name being removed under the live store | folding an absent name into `store-unreachable`, which refuses a profile that is merely new and loses `behaviour.md` §9's second arm (`ASM-L2-7`) |
| ASM-L3-U3 | the declared-root guard keys on the address's ROOT — its first segment — because a family is one whole value at its root, so `['panes','pane-a','size']` is guarded by `['panes']` | a full-prefix match on each declared address, the same set here and one more thing to keep equal (D-101) |
| ASM-L3-U4 | **`kind` is compiled from the node's KIND and never from its key count**: a leaf is `{_tier, value}` with `value` a PRIMITIVE, so an object node whose own member is named `value` and an array node are both `branch` | a key-count discriminator (`Object.keys(n).length === 2`), which reads that object node as a `row` and serves a node where the answer promises a literal (D-134; `read-node-readout.test.ts` `R-1`) |
| ASM-L3-U5 | the four MARKED unit files are NOT re-grained; the change's gating unit evidence is the one new unmarked file, and the marked rows' post-landing reds are the on-notice reading `D-30` sends to the rework, beside the three marked integration files' | re-graining a marked battery in the same shot, which is the maintenance `D-30`/`D-31` removes and which would make the change's evidence indistinguishable from the reading it outdates (D-40) |
