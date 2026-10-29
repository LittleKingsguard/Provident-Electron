# L2 — `security-store-storeroom`: the persistence

- **Layer:** L2 · **Unit:** `security-store-storeroom` · **Branch:** `strata` (D-6) · **Rev:** 1 · **Status:** DESIGN — the instance's own on-disk shape as this unit constrains it, and nothing else (D-13, D-16)
- **Inputs:** `docs/L2/security-store-storeroom/interface.md` §1/§3/§8, `behaviour.md` §1-§7; L1 §3/§5/§7; `docs/L1/security-store-storeroom-exception.md` §2 (E-1..E-5), §4 (C-4), §8; D-5, D-13, D-16, D-19; the package's shipped guide and declaration at this head (read, never edited — D-5)
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`; **the declaration** is its `index.d.ts` (D-5)

## 1. The two written names, and the one that retires

- **`<userDataDir>/provident-operator-settings.json`** — the instance's file. The **directory** arrives from the module's caller and the **name** is this unit's own choice, so no other module spells it (D-13, D-19; L1 §5 ASM-6).
- **`<userDataDir>/provident-security.json`** — the retired name. It is **read at most once** (§3), **never written again**, and its bytes are **left standing**: this unit adds no delete, no rename and no migration of that file (D-19; L1 §5).
- This unit therefore **adds exactly one written name and retires another**, which is what stops D-13's "exactly two persisted files" being a true standing pin. The rows that read that figure are re-grained by this unit's L2 test writer in the task that runs after the implementation (exception §2 E-5, §4 C-4) — named here as owed, not performed here (D-10, D-13).
- `<userDataDir>/provident-settings.json` and `<userDataDir>/provident-profile.json` are **not** this unit's and are neither read nor written nor retired here (§8).

## 2. What construction does, and what the boot does

| Act | What the disk shows | Cite |
|---|---|---|
| `createOperatorSettings({ userDataDir })` on a directory holding no store file | the file is **created exclusively, zero-length and empty**: a provided, absent `filePath` is created at construction, with no register key, no journal entry and no registration committed | `guide §9.1`; L1 §5 |
| the same, over an existing file that carries a record | the file is **not truncated and not reset**: the primitive is an exclusive create whose `AlreadyExists` falls through to a write-mode open that writes no byte | `guide §9.1` |
| the boot read, the import and `attach` | **no byte is written**: a read moves nothing, the absent import arm creates nothing, and the boot's flip is a gate state change with no store write | `guide §6`; L1 §5; `behaviour.md` §1 |

- **A directory or name the store cannot occupy refuses the construction and creates nothing** — no instance, no file, no directory, no byte — and every later write answers `FilePathUnreachable` (`guide §8.2`).

## 3. The retired name is read at most once

- The object is `<userDataDir>/provident-security.json`, the one file the replaced module wrote; the members imported are exactly its four record members, and the five boot arms move as **behaviour**, not as bytes (D-19; L1 §5; `src/main/security-store.ts:112-142`).
- **The import runs iff the instance's own file carries no record at `['operator-settings']`**, so it needs no marker, no version member and no second written name: after the first committed write the new file carries the record and the import does not run again (D-19; `guide §9.1`).
- **The absent arm writes nothing**, so a profile whose operator never writes reaches the same first-run default at every boot — exactly the landed store's behaviour (`src/main/security-store.ts:206`; L1 §5).
- **The import never writes the retired name**, never renames it and never repairs it: its bytes stand as seeded, which is the row `behaviour.md` §3 states (D-19).

## 4. The row shape: the store's image and no header

- The file's content is the **store's own register image at the `file` tier**, written by the store's own writer; this module produces, parses and repairs **none** of it (`guide §9.1`: the file is the store's, not the consumer's).
- **A cleared member is stored as its absence, not as `null`**: the package's walk refuses `null` and `undefined` **anywhere** in a value — an object member whose value is `undefined` refuses the WHOLE value — so the record this module writes carries `token` only when a token stands and `maxJournalLength` only when a cap stands, and `read()` maps that absence back to the carrier's `token:null` / `undefined` (`guide §10.1`, `§10.2`; `interface.md` §2).
- **No wrapper, envelope, marker or version member** is added by this module: what `write` hands the store is the record value itself, and what `read` copies back is the record — the crossing's deep copy on both sides is the store's (`guide §10`; D-13).
- **There is no `schemaVersion` here.** The replaced store stamped none and the central projection's `schemaVersion:'1'` is that projection's (`src/main/main.ts:364`); D-13 makes neither a compatibility constraint (D-13).
- The format's version is the **package's** — `provident-storeroom` `^1.6.1` (`package.json:26`) — and the seam's census pins the fourteen-member instance this module calls into (`src/main/storeroom.ts:45-50`; D-5).
- **A value is what the store admits**: a string with no lone surrogate, a finite number, a boolean, a dense array or a plain object, with `null`/`undefined` refused as a whole value, depth over `126` and more than `1,000,000` visited nodes refused, neither ceiling having a knob (`guide §10.1`, `§10.3`).

## 5. What a `file`-tier commit guarantees, and what a refusal leaves

| Guarantee | Where it comes from |
|---|---|
| a `file`-tier write either commits — the bytes then describe the state the act left — or answers `FileCommitFailed` **after** the store's own journal rollback, the previous bytes intact | `guide §9.2`, `§9.4`; L1 §3 |
| this module writes **no byte** itself: zero module-level file writes, so a torn write has no producer at this layer | D-13, D-16 |
| **no `.tmp`, no lock, no sidecar, no copy and no second name** is written at any point — the replaced module's `${path}.tmp` stage-and-rename machinery retires with it | D-16; L1 §5 |
| the store's writer **mechanism** — stage → fsync → rename, or otherwise — is **not declared by the package**, so no consumer can state that the store's own file is torn-write-free | finding **P-4**, §9; D-5 |
| a refusal leaves the record and the bytes exactly as they stood, and mints no cursor | L1 §3; `guide §9.4` |

- **The consequence, stated plainly:** the module can promise no tear at its own layer because it has no write at its own layer; the store's declared outcome is a commit or a refusal with the old bytes intact (`guide §9.4`; D-5).

## 6. The volatile pair is never persisted

- `exclusion` and the derived `tier4` are **`mem` rows at `['operator-exclusion']`** and never enter the file: a committed transition's bytes are not durable, and a fresh construction answers the safe pair (ASM-L2-2; D-17; `interface.md` §1).
- The **tier-4 boolean is never persisted** either, and `src/main/tier4-state.ts`'s holder is a projection and not a second home (L1 §3 ASM-4; `interface.md` §5).
- **The two tiers are two addresses for a measured reason**: a `file`-tier write purges the versions it outranks (`file` > `mem` > `temp`) at its own key, so one address would let a settings commit reset the pair (`guide §5.1`; `interface.md` §1 ASM-L2-1; finding P-3).
- After a session that used both tiers, the file's bytes carry no `exclusion`, no `tier4` and no `mcp-disabled` spelling — asserted as an absence over the bytes, never as a parse of the store's image (D-13; L1 §8 S-8).

## 7. The key space

- **Two addresses and no third**: the durable record at `['operator-settings']`, the volatile pair at `['operator-exclusion']`; this module mints no other key, reserves no namespace and interprets no segment (D-13; `interface.md` §1).
- A **patch names one tier**, so one call is one store write and one receipt; the surface's two channels never compose a mixed patch, and no row asserts one (`interface.md` §1 ASM-L2-5).
- `entries` is one member of the record value and not a key space of its own: an arbitrary name is a member of that map, and the store's register below `['operator-settings']` is minted by the one whole-value write (`guide §4` arm `W-4`; L1 §5).

## 8. What this module does not touch

- **`<userDataDir>/provident-settings.json`** — `app-shell`'s tier-1 carrier: neither read, written nor retired here; its retirement is parked to the increment that owns the app-shell crossing (exception §2; D-13).
- **`<userDataDir>/provident-profile.json`** — `central-data`'s profile store, unmoved: this module neither reads nor writes it, and the two instances are separate on purpose (D-16; `docs/L2/central-data/persistence.md` §1).
- **`<userDataDir>/provident-security.json`** — the retired name: read at most once, never written again, bytes standing (§1, §3; D-19).
- **The renderer's own store** (`src/renderer/store.ts`, `store-rederive`'s) — read, written and persisted nowhere by this module (D-13).
- **No second store and no second `filePath`**: one instance per surface, constructed at most once and kept for the process's life, which is what makes the one reference of D-18 countable (`guide §3.2`; D-18).

## 9. Package findings — recorded, upstream-owned, never patched here (D-5)

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **P-1** *(carried from exception §8, extended)* | a boot over bytes that are not the store's image has **no declared answer** — and the ordinary **second** boot of an instance that never wrote is exactly such a boot, because construction left a **zero-length** file | call `storeCreate({ filePath })` twice, with no write between: the first creation leaves the file empty and the second boot reads it | the guide's boot clauses declare the creation, reachability and constraint-list arms and **no parse-failure arm**, so the empty file the package itself created has no declared reading | declare the boot's parse-failure arm, and separately the boot-over-empty arm, with the status and whether the bytes stand (`guide §9.1`) |
| **P-2** *(carried from exception §8)* | a listener's only argument is the **triggering address**, never the value and never which member moved; a whole-record write therefore tells a subscriber nothing but that the record was written | `listen('h', [['operator-settings']])` + `register('h', fn)`, then write one member: `fn` receives `['operator-settings']` | the delivery is declared as an address notification, and the value must be re-read | publish the delivery's argument as a declared *notification* form, or declare that a value reader beside it is the supported shape (`guide §6.4`, §6.5a) |
| **P-3** | **one address cannot hold a durable and a volatile row**: a `file`-tier write purges the versions it outranks at its key, so the `mem` shadow is destroyed by the next durable commit | write `file` at `['k']`, write `mem` at `['k']` (a shadow), write `file` at `['k']` again, then read `mem` | the purge is declared **at the key** and not at the tier, and the guide declines to promise the pair-by-pair behaviour (*"whether declared semantics and shipped behaviour agree at every arm and every tier combination is not a consumer guide's question"*) | declare the per-key per-tier survival rule explicitly, with the shadow's destruction arm stated (`guide §5.1`) |
| **P-4** | the writer's mechanism is undeclared, so no consumer can state that the store's own file is torn-write-free | read `guide §9.1-§9.4`: durability, rollback and residue are declared; stage → fsync → rename is not | durability is declared as an outcome (the last successful save's bytes) rather than as a mechanism | declare the mechanism, or explicitly disclaim atomicity, beside `guide §9.2` |

- **All four stand, and this document moves none of them.** They are this unit's D-5 filings for its own record under `strata/records/`; the package side is filed once, upstream-owned, and no clause here patches or proxies a package behaviour (D-5; exception §8).
- **P-1's extension is this unit's measurement**, and it is the reason §3 states the import's marker as *the absence of a record* rather than as a version member: the boot-over-empty arm is undeclared, so this module never depends on it for a correctness claim — the first-run default is served for the `AddressNotFound` read arm, which is declared (`guide §4`).
