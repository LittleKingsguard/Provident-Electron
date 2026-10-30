# L2 — `central-data`: the persistence

- **Layer:** L2 · **Unit:** `central-data-management` · **Branch:** `strata` (D-6) · **Rev:** 7 — §9's `P-3` demand reads "declare" where it read "publish", so no row of this unit's filings asks the package for code (D-24). Rev 6 — §1's and §7's retired-seed sentences now say **at most once per boot** (read at every construction whose record address carries nothing) rather than once per profile, keeping the half that holds: the import never writes the seed. Rev 5 — §1's and §8's test-row sentences now say **marked, not re-grained** (D-31): the marked rows are replaced whole, the unmarked legs are the ones maintained. Rev 4 — §1's construction clause is re-grained to the measured rule: the store is built at the first operation whose reading answered `occupied` (`write` unconditionally, `journal` never), not at the first write — a read over a standing file constructs. Rev 3 — one cite re-grained, no claim moved: the package's version names the `dependencies` block of `package.json` instead of a line range the later `panes` key moved (D-41); rev 2 and behind are read through this one
- **Status:** DESIGN — the store's own on-disk shape as this unit constrains it, and nothing else (D-13)
- **Inputs:** `docs/L2/central-data/interface.md`, `behaviour.md`; L1 rev 4 §4; `docs/L1/central-data-census-exception.md` §1/§2/§5/§7; D-5, D-12, D-13, D-15; the package's shipped declaration, README and guide at this head (read, never edited — D-5)
- **Ceiling:** 150 lines, class max (D-1)
- **Citations:** `guide §n` is `node_modules/provident-storeroom/README.guide.md`, the package's shipped consumer guide; it is read here and never edited (D-5)

## 1. The one new written name

- **`<userData>/provident-profile.json`** — the profile store's file. The **directory** arrives from the module's caller (`DataSurfaceOptions.profileDir`) and the **name** is this module's own choice, so no other module spells it (the `createDataSurface({ profileDir: app.getPath('userData') })` pass in `src/main/main.ts`'s `new ProvidentMcpServer(...)`; D-13).
- This unit adds **exactly one** written name. The other written name at steady state is not this module's: `<userData>/provident-operator-settings.json`, the instance's own file (`operator-settings`, D-16, D-19). `provident-security.json` is a **seed** since the rebuild — read **at most once per boot**, at every construction whose record address carries nothing, and **never written**, which is what makes re-reading it safe — and `<userData>/provident-settings.json` is a seed too since the carrier retirement (D-19, D-22; exception §5, discharged by `settings-carrier-retirement`; D-13).
- D-13's consequence follows and is not absorbed: the compliance battery's Family-B reading "exactly two persisted files" stops being a true standing pin the moment this file exists, and its rows divide by marks, never by a re-grain (D-31, D-30): the **unmarked** legs that still gate — `tests/store-compliance-live.mjs`'s Family-B reading among them — are maintained by this unit's test writer in the unit that adds the file, while every marked `tests/*.test.ts` row is **replaced whole** by the rework and none of its expectations is re-pointed (`tests/store-persist.test.ts` and `tests/store-security.test.ts` are `scope:"file"`, `kind:"rework"` in `strata/marks.json`; `D-13`, `D-15`, D-31).
- This module's own filesystem acts are **the existence probe and nothing else**: it creates no `.tmp`, no lock, no sidecar, no copy, no journal file and no directory of its own (D-13).
- The store's construction is what creates the file (an exclusive zero-length file at a provided, absent path), and it is taken at the first operation that needs one, which is the reading's verdict and not the verb's: `read`, `remove` and `list` construct only when that reading answered **`occupied`** (never on `absent`, never on `unreachable`), `write` constructs **unconditionally** because an absent name is exactly where the exclusive create brings the file into being, and `journal` never constructs at all. So a profile whose file is **absent** costs one `probe()` per operation — `readProfile(profileDir)` in `src/main/data/store.ts`, taken at the top of every operation in `src/main/data/surface.ts` — and **no construction**, which is what makes **a read-only profile on a fresh install create nothing**; a read over a **standing** file does construct, because the rule belongs to the reading and not to the verb (`guide §9.1`; D-13; `behaviour.md` §1/§3; `docs/L3/central-data/design.md` §2).
- `<userData>/provident-settings.json` is **not read, not written and not retired by this module** — L1's ASM-11 half is **delivered** by `settings-carrier-retirement`, which carries the second import-once arm at its §4 (D-22, D-19; exception §5; D-13).

## 2. The key space

- The register's **addresses are the key space**: a path is an array of segments, and the first segment is the namespace
  the caller names. This module mints no namespace, reserves none, and interprets no segment (D-13).
- A **row** is one value standing at one address; a **branch** is composed from the rows beneath it and is stored nowhere of
  its own. `read` distinguishes the two and `delete` speaks of a row only (`interface.md` §2; D-11).
- Three spellings are refused rather than stored: a first segment beginning `mem.`, `temp.` or `secure.` (`behaviour.md` §7;
  D-13).
- The empty path names the register itself: readable, never writable (`interface.md` §1; D-12).

## 3. The row shape

- A row is the store's **admitted tree and nothing else**: a string with no lone surrogate, a finite number, a boolean, a
  dense array, or a plain object — with `null` and `undefined` refused as a whole value, nesting depth over `126` refused,
  and more than `1,000,000` visited nodes refused, neither ceiling having a knob (`guide §10.1, §10.3`; D-13).
- This module adds **no wrapper, envelope or marker** around a value: what a caller writes is what `read` copies back, and the
  crossing's deep copy is the store's (`guide §10`; D-13).
- The row's on-disk spelling is the store's own and is never produced, parsed or repaired by this module (`guide §9.1`; D-13).

## 4. Stamping — there is no `schemaVersion` here

- The store's image carries the **register**, not a document header; this module stamps no version member and reads none
  (`guide §9.1`; D-13).
- The retired projection's `schemaVersion: '1'` was that projection's, and the projection is gone from `src/main/main.ts` (which stamps no `schemaVersion` and holds no store); it has no counterpart in this
  file, and D-13 makes it no compatibility constraint (D-13).
- The format's version is the **package's** — `provident-storeroom ^1.6.1` (the `dependencies` block of `package.json`) — and the seam's census pins
  the fourteen-member instance this unit calls into (`src/main/storeroom.ts:45-50`; D-5).
- A change to the shape is the store's to make; the unit that makes one records it in that unit's record, and no migration
  obligation stands (`D-13`).

## 5. Atomicity, and the residue that must not appear

| Guarantee | Where it comes from |
|---|---|
| this module writes **no byte** of the profile: zero module-level file writes, so a torn write has no producer here | D-13 |
| a `file`-tier write either commits — the bytes then describe the state the act left — or answers `FileCommitFailed` **after** the store's own journal rollback, with the previous bytes intact | `guide §9.2, §9.4`; D-11 |
| a `delete` at the `file` tier saves its own op, so a durable deletion stays deleted across a boot | `guide §9.3`; D-12 |
| no `.tmp`, no lock, no sidecar, no second name at any point | D-13 |
| the store's writer **mechanism** — stage → fsync → rename, or otherwise — is *not declared by the package* | finding **P-2**, §9; D-5 |

- The consequence stated plainly: the module can promise no tear at its own layer because it has no write at its own layer;
  the store's own file's atomicity is the store's declared outcome (a commit or a refusal with the old bytes intact) and its
  undeclared mechanism (`guide §9.4`; D-5).

## 6. The committed change sequence, and what a restart does to it

- The store's own journal is **in memory, bounded by `journalLength`, and not readable**: no `journalEntries()`, no
  `journalLength()`, no `clearJournal()`, and `rollback` is its only consumer — which this surface does not call
  (`guide §5.4`; D-12).
- This module therefore observes rather than reads: each commit it causes hands back the store's own `op`, which is reduced to
  `{ cursor, kind, path, changedTo }`. **No value is copied into the sequence**, and nothing in it can be replayed (`D-12`).
- The window is `4096` entries — the seam's `DEFAULT_JOURNAL_LENGTH`, the same figure the profile store opens with
  (`src/main/storeroom.ts:53`; D-12). The oldest entries fall out, `floor` moves, and a request below the floor is
  `cursor-unknown` (`interface.md` §3; D-12).
- **Across a restart the sequence is empty and starts again at 1**: a cursor naming a previous process's position is
  `cursor-unknown`, and `floor`/`through` in the refusal let a caller re-anchor (`behaviour.md` §3, §6; D-12).
- The sequence **does not survive a restart, and no sidecar carries it** (D-13). If it ever must, it lives inside the one file,
  and today the store's image exposes no reader for it (`guide §5.4`; ASM-L2-3).

## 7. What this module does not touch

- `provident-security.json` — `operator-settings`' **retired seed**, never a written name since the rebuild: read **at most once per boot** — the import runs at **every construction whose record address carries nothing**, so a second boot re-reads the same bytes — its bytes left standing, and **never written by that import**, which is exactly what makes the re-read safe; nothing here reads or writes it (the `operator-settings` row of `strata/modules.json`; D-13, D-19).
- `<userData>/provident-settings.json` — neither read, written nor retired (exception §5; D-13).
- No second store and no second `filePath`: one store per surface, constructed at most once and kept for the process's life
  (`guide §3.2`; D-13).
- No file of the renderer's: the producing process's store (`src/renderer/store.ts`) is another module's and is read, written
  and persisted nowhere by this one (the `store-rederive` row of `strata/modules.json`; D-13).

## 8. Migrations: none standing

- This unit owes **no migration**: the store chooses its own shape, and the existing settings bytes are not a compatibility
  constraint (D-13).
- A future shape change is read through `read` and written through `write`, never by rewriting bytes by hand (`guide §9.1`; D-13).
- The C-3 rows of L1 §8's re-grain set — that row's own form, the persisted set at **exactly two named files** — move only if this new file actually reddens
  them, and **how they move is D-31's**: the marked `tests/*.test.ts` rows among them are replaced whole by the rework and never re-pointed
  (`tests/store-persist.test.ts`, `tests/store-security.test.ts` — `kind:"rework"` in `strata/marks.json`), and the unmarked legs are the ones this unit's test writer maintains (exception §5; D-15, D-31).

## 9. Package findings — recorded, upstream-owned, never patched here (D-5)

| id | Symptom | Reproduction | Suspected root cause | Proposed fix shape |
|---|---|---|---|---|
| **P-1** | a boot over bytes that are not the store's image has **no declared answer**: a foreign, unparsable image boots **cold** and its bytes stand **untouched** until the next `file`-tier save — **symptom measured at `57c5825`** — so a consumer can state the recovery arm while the package declares neither it nor a parse-failure arm; the finding **survives as a declaration gap** | place non-image bytes at the `filePath`, call `storeCreate`, then `list`/`read` (the cold tier answers, the bytes are byte-identical) and one `write` (the bytes are replaced) | the shipped guide's boot clauses declare the creation, reachability and constraint-list arms and no parse-failure arm, and the declaration carries no such status for a boot; that the boot is cold is measured, why it carries no declared arm is not | declare the boot's parse-failure arm — its status and whether the bytes are left untouched — in the native contract and in the guide's §9.1 |
| **P-2** | the writer's mechanism is undeclared, so no consumer can state that the store's own file is torn-write-free | read `guide §9.1-§9.4`: durability, rollback and residue are declared; stage → fsync → rename is not | durability is declared as an outcome ("the last successful save's bytes") rather than as a mechanism | declare the mechanism, or explicitly disclaim atomicity, beside §9.2 |
| **P-3** | `register` cannot be called on its own: the package publishes no route by which a consumer restricted to `register` alone can observe a change, so `central-data`'s declared sixth export has no call site (ASM-5; exception §1) | `store.register('h', fn)` under a handle never passed to `listen` | the listener route is declared as `listen` **+** `register`, with `unlisten` as its withdrawal, and `register` alone names no watched address | declare `register`'s arm on an unlistened handle, or declare the pair as the one counted surface it is |

- **All three stand, and the measurement moves none of them.** P-1's symptom is now measured — the boot is cold and the bytes
  survive until the next `file`-tier save — which is what lets `behaviour.md` §9 state the recovery arm as a behaviour; the
  finding is unchanged in kind, because what the package owes is the **declaration** and the tree supplies only the observed
  arm (D-5). P-2 is unmoved: the mechanism is undeclared whether or not the outcome holds. These are this unit's D-5 filings for
  its own record; the package side is filed once, upstream-owned, in `docs/L1/central-data-census-exception.md` §7, and no
  clause of this document patches or proxies a package behaviour (D-5). **P-3 is also the reason this unit's map row reads
  `endpoints: 15` and not the 16 an earlier count carried** — the five exports called, and `register` off the called set
  (exception §1; D-14).
