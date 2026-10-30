# L2 — `settings-carrier-retirement`: the persistence

- **Layer:** L2 · **Unit:** `settings-carrier-retirement` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — the instance's on-disk story as this unit constrains it, and nothing else (D-13, D-22)
- **Inputs:** `interface.md` §1–§7, `behaviour.md` §1–§8; L1 §3–§6; `docs/L2/security-store-storeroom/persistence.md` §1–§6, §9 (the sibling's file, tier rules, admitted tree and its D-5 filings, carried here by citation and never re-filed); D-5, D-13, D-19, D-22; the package's shipped guide at this head (read, never edited — D-5)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; **the declaration** is its `index.d.ts` (D-5)

## 1. The written names: three at this head, two after this unit

| Name | Owner after this unit | The act |
|---|---|---|
| `<userDataDir>/provident-operator-settings.json` | `operator-settings` | written by the instance's one `write`/`writeAppState` (sibling §1; D-16) |
| `<userDataDir>/provident-profile.json` | `central-data` | written by the profile store, unmoved (D-13; `docs/L2/central-data/persistence.md` §1) |
| `<userDataDir>/provident-settings.json` | **retired** | read **at most once per boot** by the second import-once arm, **never written** after it (L1 §4; D-22, D-19's precedent) |
| `<userDataDir>/provident-security.json` | **retired** (sibling) | read at most once **per boot**, never written (sibling §1; D-19) |

- **The census moves from three written names to two** (L1 §6; D-22, D-13). The retired names may stand in a profile as **seeds**: read at most once, their bytes left exactly as seeded, and no delete, rename or repair (L1 §4; D-19).
- **The rows that pin three re-grain and are never deleted** — `tests/store-compliance-live.mjs` (`DECLARED_PERSISTED_JSON`, `SC-B-01`, `SC-B-03`, `SC-A-06`), `tests/store-security.test.ts:529-555`, `tests/store-persist.test.ts`'s carrier rows, `tests/store-tabs-record-live.mjs:91-122` and the two `isolation.test.ts` copies' `ISO-6` literal set (L1 §6; `ASM-L2-10`). The re-grain is E-5's, filed by this unit's L2 test writer (L1 §9 E-5; D-10).

## 2. What construction and the boot write

| Act | What the disk shows | Cite |
|---|---|---|
| `createSettingsSurface({ userDataDir })` on a directory holding no instance file | `<userDataDir>/provident-operator-settings.json` is **created exclusively, zero-length and empty** — the store's own act, unchanged by this unit | sibling §2; `guide §9.1` |
| the boot read, both import arms, and `attach` | **no byte is written**: a read moves nothing, and the import writes not even the record it carries | L1 §4; sibling §2 |
| a first `commit` | one `file`-tier save; the file's bytes now describe the rows that commit wrote | `guide §9.2`; L1 §3 |
| a refused `commit` | the bytes stand exactly as they stood, and the store's own journal rollback has already run | `guide §9.4`; L1 §3 |

- **The import's whole point is that the boot is write-free**: the rows it carries stand in memory until an ordinary write supersedes them, exactly as the security import's overlay does (L1 §4; sibling §3).
- **This unit adds no written name of its own and no second file**: the third address lives in the instance's existing file, which is why the census moves by one *retired* name and no *added* one (L1 §6; D-13).

## 3. The app-state record's shape, and the prototype discipline

- **The value at `['operator-app-state']` is `{ rows: [ {name, value}, … ] }`**: one declared member, whose value is an **ordered array of row objects** — never a name→value map — because the store's read-back does **not** preserve an object's member order while a genuine array's order survives exactly (`persistence.md` §8 `P-2`, measured at this head; L1 §3). The map form would make every order the retired record held unservable (L1 §3).
- **A name is a string and is a member of a row, never a path segment**: `file.modules.<id>`, `file.tabs.order` and every other `file.*` spelling is one row's `name`, so no segment is interpreted and no name reaches a filesystem (D-18; `guide §4`).
- **Every row object is built by `Object.create(null)` or as a plain literal with a terminal prototype**, so an entry named `__proto__` lands as an own data property and survives the crossing — and the package admits a null-prototype tree (sibling `interface.md` §2; `guide §10.1`).
- **The record's own members are copied in and out, at every depth**, so no served row shares a container with the record (`guide §10`; sibling §2).
- **The value that crosses is the rows' JSON image** (`ASM-L2-2`): an own member whose value is `undefined` is absent from the image, exactly as the retired carrier's `JSON.stringify` dropped it, and a value `JSON.stringify` refuses answers the commit as a contained refusal rather than a throw (L1 §3; `guide §10.2`).
- **What the image still cannot carry is `null` anywhere in a row's value** — the package's one declared value refusal a JSON file can spell — plus a lone surrogate, a depth over `126` and more than `1,000,000` nodes (`guide §10.1`, §10.2, §10.3). The first is answered by name at the import (`behaviour.md` §7); the other three are refused by the store at the first commit, with its own status verbatim, and nothing is silently dropped (`ASM-L2-9`).

## 4. The retired carrier is read at most once, and writes no byte

- **The marker is the absence of a record at `['operator-app-state']`**: no version member, no second written name and no marker file — after the first committed write the record stands and the arm does not run again (L1 §4; `guide §9.1`).
- **It reads `<userDataDir>/provident-settings.json` at most once per boot** and is the module's **second** `readFileSync`, beside the security record's — so `tests/store-security.test.ts:549`'s one-call count becomes two, and its "no write" half is unmoved (L1 §6; D-19).
- **It never writes, renames, repairs or deletes the retired file**: its bytes stand as seeded, which is the sha256 row `behaviour.md` §6 states (L1 §4; D-19).
- **The marker discipline is the sibling's, chosen for the sibling's reason**: the store's boot over its own zero-length file is an undeclared arm (sibling `persistence.md` §9 `P-1`), so this unit depends on **no** boot-over-empty reading for a correctness claim (sibling §3; L1 §4 `ASM-4`).
- **The two import arms are independent**: each has its own address and its own absence marker, so a profile seeded with both retired files imports both in one construction (L1 §4; D-19).

## 5. What a `file`-tier commit guarantees, and what a refusal leaves

| Guarantee | Where it comes from |
|---|---|
| the commit either lands — the bytes then describe the rows the act left — or answers `FileCommitFailed` after the store's journal rollback, previous bytes intact | `guide §9.2`, §9.4; L1 §3 |
| this unit writes **no byte** itself: `src/main/main.ts` holds no write verb, and the instance's own `fs` surface is two reads | L1 §3/§6; E-1/E-2 |
| **no `.tmp`, no lock, no sidecar and no second name** appears at any point — the retired stage-and-rename machinery has no successor | L1 §3; sibling §5 |
| a refusal leaves the record and the bytes exactly as they stood, mints no cursor and adds no change | L1 §3; `guide §9.4` |
| the store's writer **mechanism** is not declared by the package, so no consumer can state that the store's own file is torn-write-free | sibling `persistence.md` §9 `P-4`; D-5 |

- **The consequence, stated plainly**: this unit can promise no tear at its own layer because it has no write at its own layer; what it promises is that the *retired* writer's `.tmp` stage is gone and the store's declared outcome is a commit or a refusal with the old bytes intact (L1 §3; `guide §9.4`).

## 6. Three addresses, and why they do not touch

- **A `file`-tier write purges the versions it outranks at its own key** (`file` > `mem` > `temp`), so a commit at `['operator-app-state']` cannot clear the exclusion pair at `['operator-exclusion']` and a commit at `['operator-settings']` cannot clear the app-state record (sibling §6; `guide §5.1`; L1 §3 `ASM-1`).
- **The record the token lives in never appears in a value a module-tool path composes**: the token is a member of the record at `['operator-settings']`, and the rows are one value at a different key (D-18; L1 §3 `ASM-1`).
- **The exclusion pair remains `mem` and is never persisted**: no byte of the instance's file carries `exclusion`, `tier4` or an `mcp-disabled` spelling after a session that used both tiers (sibling §6; D-17).

## 7. What this unit does not touch

- **`provident-profile.json`** — `central-data`'s store, unmoved and unread here (D-13; `docs/L2/central-data/persistence.md` §1).
- **`provident-security.json`** — the sibling's retired name, read at most once by the sibling's arm; this unit adds no reader and no writer (D-19; sibling §1).
- **The store's own file image** — never produced, parsed or repaired by this unit: the records are read through the declared verbs, and the two addresses are two keys of an image whose shape is the store's (sibling §4; `guide §9.1`).
- **No second store and no second `filePath`**: one instance, constructed once by the surface, for the process's life (D-18; sibling §8).
- **`provident-modules.json`** — the Q-5 legacy registry, read by `module-store.ts` and removed post-boot; not this unit's file and not retired here (L1 §3; D-22).

## 8. Findings — this unit's own D-5 filing, and what is owed to the tree

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **P-1** | a consumer that must **split** an imported record into carryable and uncarryable rows has **no admission predicate**: `index.d.ts` exports no `admits(value)`/`walk(value)` and the guide publishes the taxonomy only as prose, so the only way to learn whether a value is admitted is to attempt a write and read `ValueRefusedAtBoundary` — which is answered **per whole value**, never naming the member that failed | read `index.d.ts` for an admission export (none), then write `{a: 1, b: null}` at one address: the refusal names no member | admission is decided inside the package's walk, before any store verb, and only its *outcome* crosses (`guide §10.2`) | publish a side-effect-free `admits(value): boolean` (or answer the failing path on the refusal) so a consumer can partition a legacy record without re-implementing `§10.1`'s seventeen rows (D-5) |
| **P-2** | an object's **member order is not preserved across the crossing**: a value whose members stand `zebra, apple, mango` is read back `apple, mango, zebra`, so a durable record used as an *ordered* map cannot serve the order it was written with; a genuine array's order, by contrast, survives exactly | write `{zebra:1, apple:2, mango:3}` at one `file` address and read it back: `Object.keys` answers the sorted order; write `[{name:'zebra'},{name:'apple'},{name:'mango'}]` and the order is the written one | the crossing's copy normalizes an object to a key-ordered collection on the way in or out while `§10.1` promises a *plain object* only, so order is not part of the contract a consumer can rely on — and the guide never says so | declare whether object member order is preserved, and if it is not, say so beside `§10` so a consumer that must persist an ordering chooses an array rather than discovering the loss on a read-back (D-5) |

- **This unit's residue, stated rather than discovered later**: because of `P-1`, the import's representability test is the one refusal L1 §4 names (`null`/`undefined`) and not the store's whole taxonomy, so a row carrying a lone surrogate or a value past the walk's ceilings is imported as an overlay row and **refused by the store at the first ordinary commit** — nothing is silently dropped, and the operator has a refusal rather than a lost row (`ASM-L2-9`; `guide §10.1`–§10.3).
- **Inherited and cited, not re-filed** (D-5 keeps a finding in the unit that surfaced it): the sibling's `P-1` (the undeclared boot-over-empty arm, which is why both import markers are record-absences), `P-3` (the per-key tier purge, which is why there are three addresses) and `P-4` (the undeclared writer mechanism) stand in `docs/L2/security-store-storeroom/persistence.md` §9 (sibling §9; D-5).
- **Owed to the tree, not to the package**: `src/main/preload.ts:72` declares `store.put`'s `reason` as the closed pair `'malformed-payload' | 'write-failed'` while the runtime answer now carries the store's own status verbatim. `preload.ts` is byte-identical after this unit (L1 §9), the renderer branches on `status` alone (`src/renderer/renderer.ts:1312`), and the widening belongs to the unit that next touches the bridge — named here so no reader takes the silence for agreement (`interface.md` §6; D-18).
- **L1's `S-1` and this layer's second import arm agree, and the disagreement this bullet used to charge is retired**: L1 §8 `S-1` permits **exactly one** occurrence of the `provident-settings.json` literal in `src/**` — "the import arm's own name in the instance" — and forbids a read or a write of it in `src/main/main.ts`, which is exactly what L1 §4's second import arm and E-2 (L1 §9) require of `src/main/operator-settings/index.ts`. The re-grain this unit drives is `RET-2`: **one** occurrence, in the instance module, read by one `readFileSync` and written by none (`behaviour.md` §8; D-22).

## 9. Assumptions named here

`ASM-L2-10` — the census is re-grained by this unit's L2 test writer as E-5 licensed it (rejected: leaving the three-name pin standing, which makes a true statement false — D-13). `ASM-L2-9` — the import's representability test is the `null`/`undefined` refusal alone, with the residue named above (rejected: re-implementing `§10.2`'s seventeen rows inside the instance, which duplicates the package's walk and mis-types the set the moment it moves — `P-1`, D-5). `ASM-L2-2` and `ASM-L2-1` are `interface.md` §7's, and `ASM-L2-8` is the **sibling unit's** id for "the surface constructs the instance" — this document does not reuse it (§4; sibling `interface.md` §5).
