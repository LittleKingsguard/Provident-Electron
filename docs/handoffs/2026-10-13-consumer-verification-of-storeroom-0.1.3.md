# CONSUMER VERIFICATION — `provident-storeroom@0.1.3`

## The third retry: the construction-time probe defect is CLOSED, and one construction behaviour we had asserted is superseded by ruling

| | |
| --- | --- |
| **From** | `Provident-Electron` (the consumer) — the third retry in the family `docs/handoffs/2026-10-11-…` → `2026-10-12-…` |
| **To** | the `Provident-Storeroom` repository |
| **Dated** | `2026-10-13` |
| **Sibling revision examined** | `2e6a259` (`the census cell reads the property instead of a pinned major, and gains the check it lacked`) |
| **Artefacts under test** | `provident-storeroom@0.1.3` + `@auspicion/provident-storeroom-js-linux-x64-gnu@0.1.3`, installed from the registry in a clean directory, `linux-x64-gnu`, uid `1000` |
| **Result** | **ITEM 1 — still closed.** **ITEM 2 — CLOSED at `0.1.3`.** **ONE CONSUMER-SIDE ASSERTION WE WROTE IS SUPERSEDED by the sibling's own ruling (§4).** **ITEM 3 — unchanged, latent.** |
| **Prior records, unamended** | `docs/handoffs/2026-10-11-storeroom-sibling-build-and-file-creation.md`; `docs/handoffs/2026-10-12-consumer-verification-of-storeroom-0.1.2.md` |

---

## §0. IN ONE LINE

**`0.1.3` loads (`version()` = `"0.1.3"` = the manifest) and its construction-time probe now refuses every path this process cannot write — measured: `/usr/bin` (root-owned `0755`, uid `1000`) answers `FilePathUnreachable` at construction instead of constructing and failing later — so the consumer-side hard stop has no open upstream item left in it; and the ONE thing we had asserted that is no longer true is our own claim that a construction "creates nothing", which the sibling has superseded by an explicit ruling because the construction now creates its own zero-length store file.**

---

## §1. THE BATTERY RUN (every line a command's own output, `2026-10-13`, clean install)

**§1.1 Identity and load**

| Read | Value |
| --- | --- |
| wrapper manifest `version` | `0.1.3`, with all five `optionalDependencies` pinned exactly at `0.1.3` |
| platform package | `LICENSE`, `README.md`, `package.json`, `storeroom_js_binding.node`; its manifest `0.1.3` |
| **the artefact's own `version()`** | **`"0.1.3"` — equal to its manifest** |
| the artefact's export set / the wrapper's export set | `version,errorMessage,storeCreate,call,register` / the eight verbs |
| `import('provident-storeroom')` | resolves; every verb exported |

**§1.2 The construction matrix — the same five cases across three releases**

| Configuration | `0.1.1` | `0.1.2` | **`0.1.3`** |
| --- | --- | --- | --- |
| no `filePath` | throws (load) | constructs | **constructs** |
| writable parent, absent file | throws (load) | constructs | **constructs** |
| absent parent directory | throws (load) | `FilePathUnreachable` (path subject) | **`FilePathUnreachable`** ✓ |
| a directory as `filePath` | throws (load) | `FilePathUnreachable` (`/tmp`) | **`FilePathUnreachable`** ✓ |
| **`/usr/bin/…` — root-owned `0755`, uid `1000`** | throws (load) | **constructs (FALSE PASS)** | **`FilePathUnreachable`** ✓ **CLOSED** |
| **dangling symlink** | — | — | **`FilePathUnreachable`** ✓ |
| symlink to an absent target directory | — | — | **`FilePathUnreachable`** ✓ |
| symlink to a real writable file | — | — | **constructs** — the sibling's declared accepted state |

**§1.3 The store, end to end**

| Step | Result |
| --- | --- |
| `read` of an empty store | `AddressNotFound` — *"'a' does not exist in '', it holds no keys"* |
| `write(s, ['a'], 'mem', 42)` → `read` → `rollback(op-1)` | `42`; `{ opId: 'op-1', undoneOps: ['op-1'], restoredTo: { present: false } }`; then `AddressNotFound` |
| `write(s, ['b'], 'file', 'v')` | the file exists, `9` bytes, contents `{"b":"v"}` |
| a fresh `storeCreate` over that path, then `read(['b'])` | `"v"` — the boot-load round trip |
| **reconstruction over a file carrying committed bytes** | **bytes byte-identical (`17` → `17`), boot-load returns `"committed"` — the construction does NOT truncate** |
| **a REFUSED construction (`/usr/bin`)** | **`FilePathUnreachable`, and NO file is left behind** |

---

## §2. ITEM 1 — STILL CLOSED

`0.1.3` keeps the build-stamp carrier (`option_env!("STOREROOM_JS_PACKAGE_VERSION")` with the crate's version as fallback) and the crate's own version remains `0.1.0` in source by declaration. Nothing regressed: the artefact equals its manifest, the load path passes, and the rung-one observable (`acceptance.md §3.1` row `3`) still holds from a published install. The consumer's residual `R-3` stays discharged.

---

## §3. ITEM 2 — CLOSED AT `0.1.3`, BY THE SIBLING'S TENTH BOUNDED AMENDMENT

**Measured closure:** the configuration that was a false pass at `0.1.2` — a `filePath` whose parent the process cannot write — **now refuses at construction**, with `FilePathUnreachable` naming the path. The same unit closes the neighbouring states this consumer never reached: a **dangling symlink** and a **symlink into an absent directory** each refuse, while a **symlink to a real writable file** constructs (the declared accepted arm).

**What the sibling changed, in its own terms** (`U-STOREROOM-ACCESS-PROBE`, the tenth bounded amendment of `docs/specs/storeroom-native/contract.md`):

- **THE MODE-BIT SCREEN IS WITHDRAWN AS THE DECISION.** Its `seams-and-lifecycle.md §7.1` step `3`'s arm `(b)` — the arm this consumer's handoff measured as a false pass — is now a **screen and not the verdict**, and the withdrawn reading is quoted at `:192` so it is not read as operative.
- **THE BINDING VERDICT IS THE KERNEL'S ANSWER AT AN EXCLUSIVE CREATE.** Step `4b` performs `create_new` (`O_CREAT|O_EXCL`) where `filePath` is provided and the file is absent; `EROFS` (read-only mount), `EACCES` (an ACL deny, **an ownership mismatch between the mode bits and the process**) and `ENOENT` all answer `FilePathUnreachable` at construction with no instance. **The three states its own record names are exactly the class this consumer's finding belongs to.**
- **THE REMEDY THIS CONSUMER PROPOSED WAS ABANDONED, AND THAT IS ON THE RECORD.** Our handoff's §3 named `libc::access(W_OK)` / `faccessat(AT_EACCESS)`; the sibling's `docs/decisions.md` now carries a dated correction that the **`libc::faccessat` remedy was ABANDONED and never landed**. The instrument they chose — an exclusive create, decided by the kernel — is stronger than the one we proposed, because it needs no separate effective-access query and no TOCTOU reasoning about a permission check that is not the act itself. **We record the abandonment without objection: the finding was ours, the instrument was theirs, and theirs is better.**
- **A FOURTH MEMBER OF THE CLASS WAS FOUND BY THEIR OWN BLIND SET, NOT BY US:** `DEF-2026-10-13-D` — a dangling symlink constructed, reported success and never created a file (their adversarial pass had *predicted* refusal; the blind set *measured* `Ok`). Its fix is one lookup swapped at the decision point (`symlink_metadata`/`lstat` rather than `metadata`/`stat`). **Our §1.2 measurement confirms the fix from the published artefact.**
- **OUR OWN MIS-FILING IS NOW FULLY RECONCILED.** The `2026-10-11` handoff filed the probe as a code defect against `A52`/`A55`/`DD-40` and never cited `DD-45`; the sibling re-filed it as `DEF-20`, a decision conflict; the amendment has now **resolved the conflict by moving the clause** — the mode-bit arm is no longer the decision anywhere. **Both halves of that correction stand: our behaviour measurement was right, our authority citation was incomplete, and the sibling's disposition was the correct class.**

---

## §4. THE ONE CONSUMER ASSERTION THAT IS NOW SUPERSEDED — OURS

Our `2026-10-12` verification's `§5` assertion 5 ended: *"a writable parent with an absent file constructs **and creates nothing**"*. **At `0.1.3` that limb is FALSE, by an explicit ruling, and the sibling reconciled it against our own document** (`docs/specs/storeroom-native/contract.md` :211 — *"THE CONSUMER'S ASSERTION 5 IS PARTLY DELIVERED AND PARTLY SUPERSEDED"*, quoting our `§5` verbatim):

- **MEASURED:** `storeCreate({journalLength: 8, listeners: [], filePath: …})` over an ABSENT path **creates that file, zero-length, at construction** (`after storeCreate : EXISTS size=0`), before any write. A `mem`-tier write leaves it at `0`; the first `file`-tier write fills it.
- **DECLARED, with the architect's own words carried in the sibling's decision row:** *"Yes, creating the store with a file path can cause a test write to that file path."* The create is `create_new`, exclusive, never a truncating create; on `AlreadyExists` it falls through to the write-mode open, so **an existing file is never truncated and its bytes reach `boot_load` unaltered** — which our §1.3 reconstruction measured directly (`17` → `17`, boot-load `"committed"`).
- **AND THE FAILURE SIDE OF `A55` IS PRESERVED IN A STRONGER FORM:** *"EVERY CONSTRUCTION THAT FAILS LEAVES NOTHING BEHIND"* — because no argument is validated after the create. Our §1.3 records the measurement: the refused `/usr/bin` construction left no file.

**THE ASSERTION, CORRECTED FOR `0.1.3` AND LATER:** *a `filePath` the process cannot write must be refused at construction (the first limb — now delivered); an absent parent and a directory each answer `FilePathUnreachable`; a writable parent with an absent file constructs, creates a ZERO-LENGTH store file, commits no byte, and a subsequently failed construction leaves nothing behind.* **Consumers that must not create a file at construction therefore must not pass a `filePath` for a path they have not already created — the `mem` tier and a pre-created file both remain lawful.**

---

## §5. ITEM 3 — UNCHANGED, LATENT

The load-path refusal and the store's `filePath` refusal still share one clause, so a package-level failure still reads as a filesystem one to a consumer who parses only the message. With `0.1.2` and `0.1.3` loading correctly it remains latent rather than live. Filed as a wording finding; no new status proposed.

---

## §6. WHAT REMAINS OPEN

| Item | Owner | State |
| --- | --- | --- |
| The consumer's hard stop on its `U-STOREROOM-BINDING` unit | **`Provident-Electron`'s architect** — the residue is `P-9`'s collision clause alone | **`R-3` discharged; `R-1`/`R-2`/`R-5` unchanged; `R-4` stands** |
| The clause ambiguity (item 3) | the sibling, at its discretion | OPEN — LOW, latent |
| The sibling's own open rows (`DEF-2026-10-13-C`'s residue and its class) | the sibling's passes | tracked there, not here |
| **The probe defect this family filed** | **the sibling — CLOSED at `0.1.3`** | **CLOSED; the consumer's `docs/defects.md` row `STOREROOM-FILE-PROBE-FALSE-PASS` is resolved-by-upstream** |

---

## §7. EVIDENCE AND PROVENANCE

| What | Where |
| --- | --- |
| The two prior records (bytes unamended) | `docs/handoffs/2026-10-11-storeroom-sibling-build-and-file-creation.md` · `docs/handoffs/2026-10-12-consumer-verification-of-storeroom-0.1.2.md` |
| The sibling's amendment and its carriers | `docs/specs/storeroom-native/seams-and-lifecycle.md §7.1` steps `3`/`3`-bis/`4b` (its `⟶ AMENDED 2026-10-13` clauses, the withdrawn reading quoted at `:192`, the five parts `(A)`–`(E)`) · `docs/specs/storeroom-native/contract.md` (`§10.4` parts `1`–`7`, the consumer-assertion clause at `:211`, the create clause at `:4156`) |
| The sibling's rulings and its own corrections | `docs/decisions.md` (`D-GP-REL-0.1.3`; `D-GP-NODE-1`; the dated correction that the `libc::faccessat` remedy was abandoned) · `docs/defects.md` (`DEF-20`'s discharge, `DEF-2026-10-13-D`, the proofread corrections) · `docs/specs/storeroom-publish/retrospective-0.1.3.md` |
| **This repo's own measurements** | taken `2026-10-13` in `/tmp/psr013/probe`, against the registry's `0.1.3` tarballs, by this repo's supervisor; every figure in §1 is a command's own output |

**Labels honoured: measured = a command's own output; declared = the sibling's own clause; derived = a consequence reasoned from a citation. Nothing was patched, stubbed or vendored in either repository. The `2026-10-12` verification document was never delivered into the sibling tree (the write was denied and the escalation declined); this document inherits that non-delivery and stands in this repo only — the sibling nonetheless reconciled our `§5` assertion 5 against it, so its content is known there independently of the delivery.**
