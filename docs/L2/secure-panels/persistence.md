# L2 — `secure-panels`: the persistence

- **Layer:** L2 · **Unit:** `secure-panels` · **Branch:** `strata` (D-6) · **Rev:** 4 — rev 3 is read through this one: the routed set this file reads is renumbered because `interface.md` §8 gained `R-8`, and no pane cite moves here — this document carries none, its `file:line` cites all landing in `src/main/**`, which E-1 did not touch. Rev 3 — rev 2 is read through this one: §7 no longer says a tier-4 refusal crosses on a click — a closed pair refuses a **read** and commits a **write** (`src/main/settings-surface/index.ts:28`; `behaviour.md` §7). Rev 2: §6's roster row points at `docs/L3/secure-panels/signatures.md` §1-§2.2 for the pane's declaration instead of paraphrasing it. · **Status:** DESIGN — where the grant the sixth toggle writes actually lives, read as **bytes**, and how "no record yet" is told apart from "a record"
- **Inputs:** `interface.md` §1-§9 (the arrangement, S-1…S-7, the surface, R-1…R-8); `behaviour.md` §1-§6; `docs/L2/security-store-storeroom/persistence.md` §1/§5/§9 (the instance's file, whose writer is not this unit's), `docs/L2/settings-carrier-retirement/persistence.md` §2, `docs/L2/central-data/persistence.md` §1/§5; D-12, D-13, D-16, D-17, D-19, D-22, D-25, D-26; the tree at this head
- **Ceiling:** 150 lines, class max (D-1) · **Citations:** `B-n` is a measurement this seat took on **2026-10-30** at this head — under `/tmp`, driving the repo's own `src/main/settings-surface/index.ts` bundled with the repo's own `esbuild`, i.e. the very module `security.set` calls, and none of it in the repository; `S-n` is `interface.md` §3's probe; `P-n` is `docs/L1/secure-panels.md` §4.3's row; the package is read and never edited (D-5)

## 1. Where the grant lives

| | Reading |
|---|---|
| the name | `<userData>/provident-operator-settings.json`, spelled once in `src/**` (`src/main/operator-settings/index.ts:119`) |
| the address | `['operator-settings']` — the record's own address, a first segment that is the namespace the instance names (`:113`) |
| the tier | `file` — the one durable tier of the three the store carries (the sibling `docs/L2/security-store-storeroom/persistence.md` §1; D-13) |
| the writer | `ipcMain.handle(IPC_SECURITY_SET)` → `settingsSurface.set(patch)` → the instance's **one** write at that address (`src/main/main.ts:338`; `src/main/settings-surface/index.ts:139-190`; `src/main/operator-settings/index.ts:537`) |
| the readers | the instance's own `read()`, the surface's answer, the gate's re-patch, and the pane's `refresh()` — all through that one record, none of them reading the file directly (`src/main/operator-settings/index.ts:439-462`; D-17) |
| what the pane adds | **one grant among the record's own list** — no name, no address, no tier, no second file (`interface.md` §5; D-22) |

- **The instance owns the grant and the pane is a view and a setter over it,** so "the pane remembers" is never a claim anywhere in this unit (D-17, D-19).
- **The persisted set this unit touches is the instance's, and this unit adds no name to it** — the two retired carriers are seeds and the profile store is another unit's (`src/main/operator-settings/index.ts:120,123`; D-22, D-19).

## 2. The bytes, measured (B-1…B-5)

| # | The drive | The reading |
|---|---|---|
| **B-1** | construct the surface on a directory holding only the **seed** (`provident-security.json`, the retired name) and no instance file; read the file before any write | the file **exists and is zero-length** (`size 0`); `read()` answers `{token:null, enabled:['read','dispatch','graph','code'], read:null, exclusion:'mcp-enabled'}` — the seed, served from memory, with no byte written (`:404-417`) |
| **B-2** | one `set({ groups: ['data'] })` — the patch the sixth row's click composes | `committed`; `enabled` gains `data`; the file is **75 bytes**: `{"operator-settings":{"enabled":["read","dispatch","graph","code","data"]}}` |
| **B-3** | one `set({ disable: ['data'] })` — the same control, second click | `committed`; the file is **68 bytes** and no longer names `data`: `{"operator-settings":{"enabled":["read","dispatch","graph","code"]}}` |
| **B-4** | every group revoked: `set({ disable: ['read','dispatch','graph','code'] })` | `committed`; `enabled: []`; the file is **36 bytes**: `{"operator-settings":{"enabled":[]}}` — **a record whose list is empty**, which is not the same thing as no record |
| **B-5** | the store alone, at an absent path: construct, read the record address, then construct again over the result | the first construction creates the file at **size 0**; the read at the record address **throws `{status:'AddressNotFound'}`**; the second construction leaves it at **size 0** (the sibling's `P-1`, `docs/L2/security-store-storeroom/persistence.md` §9) |

- **The record's byte shape is the store's own image,** never a projection this repo composes: the instance hands a value to `write(address, 'file', value)` and the package writes its own spelling (`src/main/operator-settings/index.ts:537`; `guide §9.1`; D-13).
- **No `version`, no `schemaVersion`, no envelope:** the image carries the register at the address and nothing else, so a reader keys on the address and never on a header (`docs/L2/central-data/persistence.md` §4; D-13).

## 3. Zero-length until the first write — and the two states it separates

- **The store's construction is what creates the file** — exclusively, zero-length and empty, where it is absent — so **the file's existence is not evidence of a grant**: a first boot on a clean profile has a file and no record at all (`src/main/operator-settings/index.ts:404-405`; B-1; `docs/L2/security-store-storeroom/persistence.md` §1).
- **"No record yet"** is a **zero-length file**, and a read at the address answers `AddressNotFound` — which the instance turns into the import answer or the first-run default, never into a refusal (B-5, B-1; `src/main/operator-settings/index.ts:414-417,447-448`).
- **"A record"** is bytes, and the record may carry **an empty grant list** — a state B-4 produces with one gesture and which no absence can be confused with (B-4).
- **So the two claims P-5 and P-6 make are byte claims, never existence claims:** P-5 asks whether the record's `enabled` **names `data`**, and P-6 asks whether it **no longer names it** — the leg reads the file's text and prints it verbatim, and its reader distinguishes absent / zero-length / unparsable / a record with no `enabled` list before it judges either row (P-5, P-6; `tests/e2e/secure-panels/panes-live.mjs`'s record reader).
- **The write is not this unit's act:** the module performs no filesystem call of its own, keeps no `.tmp`, no lock and no sidecar, and creates no name but the one it was given (`docs/L2/central-data/persistence.md` §5; D-13, D-22).

## 4. The import-once rule, and why the seed is not this unit's grant

- **The instance reads the retired bytes once, at construction, and only over a standing instance with no record** — the marker is the **absence of the record at its address**, and there is no version member and no second written name (`src/main/operator-settings/index.ts:411-417`; D-19).
- **What it carries is held, not written:** the imported row stands in memory until an ordinary write supersedes it, so a boot that imports and then writes nothing leaves the file at **zero-length** (B-1; D-19, D-25).
- **The import carries exactly the record's four members** — the token, the grant list, `maxJournalLength` and the entries row set — and the **exclusion pair is not an import member**: it is a `mem` row at `['operator-exclusion']`, written in memory, booting to the safe pair on every start and **never a byte in this file** (`:114,499`; D-25).
- **For P-3's seed this matters and is why the leg seeds the retired name rather than the instance's file:** the driver's state must arrive through a path the product owns, because the instance file's bytes are the store's own image and no leg may hand-write them (P-3; `docs/L2/security-store-storeroom/persistence.md` §4; D-19).

## 5. The record's members, and the whole-record write

- **The record carries four members and this unit moves one of them:** the token, the grant list, `maxJournalLength`, the entries row set (`src/main/operator-settings/index.ts:184-195`; D-25).
- **A click writes the whole record, not a byte-level patch:** the instance composes `read()`'s durable row with the supplied members and writes it in one `file`-tier verb, so a grant is a **replace** of the bytes and never an edit of the array inside them (`:514-537`; B-2, B-3).
- **A cleared member crosses as its absence, never as `null`,** because the store's walk refuses `null`/`undefined` anywhere in a value — which is why B-2's bytes carry no `token` member at all (`:184-192`; D-25).
- **The grant list is admitted, de-duplicated and kept in the caller's order** — appended as grants arrive, never re-sorted — so the bytes' array order is the order the operator's gestures produced (`:176-181`; `behaviour.md` §4).

## 6. What is never written, and never appears

| Never | Why |
|---|---|
| a second name, a `.tmp`, a lock, a sidecar, a journal file or a directory of this unit's | the store's act is the only writer, and it creates exactly the one path it was given (`docs/L2/central-data/persistence.md` §5; D-13) |
| the exclusion pair | it is a `mem` row and boots to the safe pair on every start (`src/main/operator-settings/index.ts:114,499`; D-25) |
| the group **roster** | the pane's roster is its table's own key projection — the declaration's shape is `docs/L3/secure-panels/signatures.md` §1-§2.2, cited and not paraphrased — and no roster is ever a stored value (`interface.md` §1; S-5) |
| a `version` / `schemaVersion` header | the image carries the register, not a document (`docs/L2/central-data/persistence.md` §4; D-13) |
| the retired names, ever again | both are read at most once and written by nothing (`src/main/operator-settings/index.ts:120,123`; D-19, D-22) |
| the profile store's file | another unit's name and another unit's writer (`docs/L2/central-data/persistence.md` §1; D-22) |

## 7. A refusal keeps the previous bytes, and a torn write has no producer here

- **A write either commits — the bytes then describe the state the act left — or answers a refusal with the previous bytes intact,** the store's own rollback being its answer to a refused constraint pass (`guide §9.2, §9.4`; the sibling `docs/L2/central-data/persistence.md` §5).
- **This unit produces no torn write because it produces no write of its own:** the gesture's one call is the surface's, the surface's one call is the instance's, and the instance's one call is the store's (`src/main/settings-surface/index.ts:139-190`; §1).
- **A refused write is a value, not a throw — and a closed tier is not a refused write:** the store's own refusals cross as answer members, so the pane repaints from the carrier and no error path writes a byte (§1; `guide §9.4`). The `tier4-closed` token is a **read** member and never a write outcome (D-16), so a `set` attempted while the pair is closed **commits** and moves the bytes like any other — measured, and an earlier sentence here said the opposite (`src/main/settings-surface/index.ts:28`; `behaviour.md` §7).
- **The window between intent and bytes is one synchronous handler:** the store call runs inside the SET handler, so the bytes stand before that handler answers, and the pane's re-read is issued after it on the same bridge pair (`src/main/main.ts:337-338`; `behaviour.md` §3).

## 8. Package findings: none new, and the neighbour is cited rather than re-filed (D-5)

- **This unit surfaces no `provident-storeroom` defect.** The one package arm its evidence leans on — a boot over the **zero-length** file the package's own construction created has **no declared reading** — is `P-1` of `docs/L2/security-store-storeroom/persistence.md` §9 and of `strata/records/security-store-storeroom-unit.md`, filed once, upstream-owned (B-5; D-5).
- **Nothing here needs that arm for a correctness claim:** the boot over a zero-length file is answered as *no record*, which is the instance's own first-run path, and the package's silence about the arm is recorded above, not patched here (B-1, B-5; D-5, D-19).
- **No byte of the package, the sibling or the instance's module is written by this unit** — the sixth toggle changes what the pane *asks for*, never how the answer is stored (`interface.md` §5; D-3).

## 9. Assumptions, each with the alternative it rejected (`brief.md` §8)

| id | Assumption | Rejected alternative |
|---|---|---|
| ASM-L2-10 | "the file carries the grant" is read as **bytes at the record address**, never as the file's existence (§3) | an existence assertion, which a first boot satisfies with a zero-length file and no record at all (B-1) |
| ASM-L2-11 | "no record yet" and "a record with an empty list" are **two states** and both are reachable (§3) | treating an empty `enabled` as an absent record, which would make P-6 unreadable on a fully revoked profile (B-4) |
| ASM-L2-12 | the seed for P-3 arrives through the **retired name's import-once path**, not by hand-writing the instance's file (P-3, §4) | a hand-authored instance file, which no leg may write because its bytes are the store's own image (D-19, D-25) |
| ASM-L2-13 | the zero-length boot's undeclared package arm is the **sibling's** finding, cited (B-5, §8) | filing it again here, which D-5 forbids |
