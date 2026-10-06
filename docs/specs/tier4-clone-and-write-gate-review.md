# Gate-1 record — the CLONE/WRITE amendment to tier 4 (`D-1` the clone clause · `D-2` the write-`iff` clause)

**STATUS LINE.** **Gate 1 for the CLONE/WRITE AMENDMENT — `DONE`** · filed `2026-10-11` ·
**verdict `BLOCKED-ON-SEMANTICS`** (not delegable) · **the unit it serves is `S2`
`U-TIER4-ARBITRARY-STORAGE`, ADMITTED `2026-10-05` BUT NOT STARTED** · **NO LEDGER ROW MOVES**
(`RCA-8(f)`: the architect admits ROWS, not a pass — the ledger's `S2` row keeps its as-filed
status and this record does **not** move it) · the park rows are `docs/pending.md` `§R` **`P-R3`**
(amended beside, below) and **`P-R6`** (cross-referenced only) · the prior, **CLOSED** record for
the same wave is `docs/specs/secure-tier-generalization-review.md`, which this record **does not
re-open, does not overwrite and does not supersede**.

**⟶ AMENDMENT ONE — `2026-10-11`: THE FIVE `must-fix` ANSWERS LAND, THEIR OBLIGATIONS ARE MEASURED, AND THE VERDICT IS RE-ISSUED `APPROVE-WITH-CONDITIONS`. Read this before the as-filed status line above, whose bytes are KEPT VISIBLE AND NOT REWRITTEN (`RCA-8(d)`); `§12` is the amendment, and where a `§12` clause contradicts an as-filed clause, `§12` governs and the as-filed clause stands as the first filing's record.** The architect answered `Q-1`…`Q-5` (`§12.2`); the store-compliance battery's **Family E** then measured the three obligations those answers add — **`E-1` / `E-2` / `E-3`, ALL THREE `NON-COMPLIANT`** (driver `ad7bbb66…`, `46` rows = `34 PASS / 11 FAIL / 1 MANUAL`, exit `1`, run twice pre-commit and once post-commit, commits `f700aaf`/`742b848`); and `D-1`/`D-2` are restated as the architect's **now-operative clauses, with the measured state beneath each**, at `§12.4`. **THE AS-FILED STATUS LINE ABOVE READS `BLOCKED-ON-SEMANTICS`, AND IT IS RE-ISSUED:** the five `must-fix` questions no longer stand, so the STEP-0 bar they raised is discharged; what remains is the `9` `conditional` questions — re-phrased one line each — **plus ONE NEW condition the measurement forces** (`SECURITY-STORE-RECORD-ADVANCES-PAST-A-REFUSED-PERSIST`, carried with its two admissible readings and decided by nobody here), at `§12.3`. **ZERO LEDGER ROW MOVES AND `S2` STAYS NOT STARTABLE (`§12.7`).** **THE AS-FILED `§9` VERDICT IS NOT DELETED — it is the FIRST filing's verdict, quoted at `§12.6`, and it stands as that filing's record.** `§10`'s *"what this pass did not do"* still holds for `§1`–`§11`; `§12.10` adds this pass's own.

**WHAT THIS FILE IS.** It is the **amendment's gate-1 record**: the architect issued two NEW
clauses on top of the `2026-10-05` tier-4 rulings, the four gate-1 steps for those clauses have run
(validity · critique · architecture review · this change analysis), and the fourth step's product is
this file. It carries: **§1** the proposal verbatim and what it asks; **§2** the STEP-0 semantics
block (dossier path, digest snapshot, the ZERO-ROW EXEMPTION with its written rationale, the open
rows, the OPEN-SEMANTICS list, the architect-answers table); **§3** the four inputs judged, with
their evidence and their instruments; **§4** the `D-GP-SAD-5` decomposition row, keyed
`decomposition`, dispositioned **here** and never inside a spec; **§5** the `P-R3` consequence and
its mechanism; **§6** the measured current state, quoted as measurements with their instrument and
their commit; **§7** the risks carried; **§8** the findings; **§9** the verdict; **§10** what this
pass did not do; **§11** the **proposed** `docs/decisions.md` row text, drafted and **left for the
architect** (this pass writes no ACTIVE row: `RCA-8(f)`).

**IT IS NOT A SPEC, NOT AN ADMISSION, NOT A CODE CHANGE.** No `docs/specs/<unit>.md` is filed; no
`src/**` byte, no test, no battery driver, no `S1` artifact is touched; no register, no red set and
no leg is authored; the ledger does not move.

---

## 1. WHAT THE PROPOSAL ASKS

**The architect's ruling, verbatim:**

> *"Data requests from the security do not return references to original data, they return clones to
> prevent external read/mutation by reference. Writes at runtime are permitted iff the MCP is
> blocked"*

**Read as two clauses (`D-1` / `D-2`), which is how the supervisor filed it and how every input
judged it:**

| Clause | As filed | What it changes |
| --- | --- | --- |
| **`D-1`** | **every tier-4 READ returns a CLONE, never a reference** — the stated purpose is *"to prevent external read/mutation by reference"* | A **read-surface discipline** for tier 4. It **restates landed reality for today's three-member record** (`src/main/security-store.ts:118-120`: `get()` composes a fresh literal and spreads `enabled`; `:140` `set()` returns `this.get()`) and **gains force only from the peer ruling's clause (5)** — the clause that opens the tier's shape to arbitrary caller-keyed data (`docs/decisions.md` `SECURE-TIER-IS-A-FILESTORE-PEER`) — because an opened shape means caller-reachable objects at depth, where a shallow copy stops being a clone. |
| **`D-2`** | **runtime tier-4 WRITES are permitted iff the MCP server is blocked** | **NEW contract**: **no landed clause states tier-4 write-Legality at all** (the write path exists and is unconditional — `src/main/main.ts:385-404`). It also **settles the scope question parked at `docs/pending.md` `§R` `P-R3`**: the boot-ingestion-only reading is refuted and the **runtime write half is IN SCOPE** (`docs/pending.md` `§R` `P-R6`, filed `2026-10-11` by the live battery's Family D). |

**Both clauses attach to the already-admitted unit's contract**, not to a new one: `S2`'s own
contract clause set is *the tier's own API · `sanitize()`'s fate · the persisted format · the boot
INGESTION pass · the spec amendments* (`docs/next-steps.md`, the `S2` cell, admitted `2026-10-05`).

---

## 2. THE STEP-0 SEMANTICS BLOCK (required)

### 2.1 The dossier — path, digest snapshot, and the exemption

**Dossier path:** `docs/specs/secure-tier-generalization-adoption-dossier.md` (the wave's own
dossier, filed `2026-10-05` from the gate-1 scratch artifact; §5 is its post-gate-1 amendment).

| Figure | Value | Provenance — stated, because this pass cannot compute a digest |
| --- | --- | --- |
| the **AS-FILED** snapshot (what the first gate 1 reviewed; 159 lines, 8 `undefined-until-answered` rows) | `sha256:744d7f1998e730427b3bd32a89ab07472a069e1370f4f18d3cf1a4059f20d350` | **cited** from `docs/specs/secure-tier-generalization-review.md` `§2`'s two-figure table |
| the **CURRENT** digest (operative; the same file **plus** §5 *THE ARCHITECT'S RULINGS*) | `sha256:fb77037a1d045a45127549e7eff1be8af0155a21eb46b97202a2318fdc46ef03` | **cited** from the same table |
| **THIS PASS'S OWN READING OF THE DOSSIER'S SHAPE** | §1's **8 identifier rows** (all `defined` by §5) · the **13-hit collision block** · the **6-item open-semantics list** (all disposed by §5) · §5's rulings table — **the bytes that carry the adopted vocabulary this record relies on** | **read this pass**, read/search tools only |

**HONEST LIMIT, RECORDED RATHER THAN ASSERTED AWAY (`RCA-12`):** this pass holds **no shell**, so it
**cannot recompute** either digest. Both are **quoted with their owner** (the `2026-10-05` gate-1
record). **THE DIGEST FIGURES ARE THEREFORE UN-RE-VERIFIED THIS PASS**, and the rule the earlier
record set for itself applies here: **a reader quoting `744d7f19…` MUST also quote the dossier's
§5.** A supervisor-side recomputation at the boundary commit would upgrade both figures from
*cited* to *measured*; nothing in this record's verdict turns on them.

### 2.2 The ZERO-ROW EXEMPTION — claimed, with its written rationale

**`STEP 0` ran. The exemption is claimed in the form the rule requires: an explicit, recorded,
justified exception — never a silent default.** The rationale, stated as the rule asks (the unit's
declared surface, and why nothing in it is externally sourced):

1. **The unit's declared surface, on the record:** `S2` `U-TIER4-ARBITRARY-STORAGE` — *the tier's own
   API · `sanitize()`'s fate · the persisted format · the boot INGESTION pass · the spec amendments*
   (`docs/next-steps.md`, the `S2` cell). Its contract vocabulary is `get` / `set` / `sanitize` /
   the receipt / the persisted record / the ingestion order — **all of it landed in this repo**, by
   `G3` (`docs/specs/store-security.md`) and by the `2026-10-05` rulings.
2. **No identifier this amendment introduces originates outside the project.** Verified, not
   asserted: **`clone` / `deep copy`** — the **landed precedent is this repo's own**, pinned by its
   own architect-ordered re-freeze: *"the export is a FRESH deep copy at EVERY depth — no depth
   bound, no aliasing of a live stored object"* (`docs/specs/store-core-graph-compliance-review.md`
   `§3b` **`G4-F5`**, `MED-LOW`, disposition `HOST-FIX + re-grain — EXECUTED`), implemented as
   `snapshotValue` (`src/renderer/store-core-graph.ts:362-388`: cycle-safe via a `seen` map,
   prototype-safe via `Object.create(null)`) and ruled in `docs/decisions.md`
   `G1 UNIT-ADVERSARIAL RE-FREEZE (option 1)`. The word *"clone"* is a **synonym for that landed
   discipline**, not a foreign term. **`MCP blocked`** maps onto the **landed state name**
   `'mcp-disabled'` (`docs/decisions.md` `D-GATE`; the live channel
   `window.provident.security.setExclusion('mcp-disabled')`, measured `{"applied":true,"state":"mcp-disabled"}`).
   **`read` / `write` / `reference`** are ordinary English usage over a landed API.
3. **Not a fork disposition, not an `A-d*` adoption ruling, not an amendment of an adopted
   contract.** The clause originates from the project's **own architect** in-session, over the
   project's **own** landed tier. The `SCH-*`/`SC-*` dispositions and the `A-d1…A-d8` round are
   untouched by it.
4. **Consequence, stated so a later pass does not read this as a silent zero-row:** **the dossier
   is NOT amended by this pass, and owes no amendment row.** The two clauses are **native**, so the
   dossier's `§5` needs no eleventh ruling. **A pass that later introduces a genuinely
   externally-sourced identifier into this unit's contract must file the dossier row it owes; this
   exemption does not travel.**

### 2.3 The open rows and the collision block

**Open rows: NONE, and that is the exemption's consequence.** The dossier's eight rows are all
`defined` by its `§5`; the amendment introduces no row and leaves no row undefined.

**Collision block: owed by the rule, discharged on the exemption's ground, and here is the check
performed anyway.** The exemption's own rule still requires a check of each consuming project
prohibition-row hit. This pass checked the rows the two clauses could touch, **by row id, against
the bytes**:

| Prohibition row consulted | Hit? | Disposition |
| --- | --- | --- |
| `store-core-graph.md` `§0` `A2` — *"`secure` IS A SEPARATE MAIN-SIDE COLLECTION OUTSIDE THIS ORDERING AND CARRIES NO GRAPH NODE"* | **NO** | `D-1`/`D-2` place nothing in the ordering and mint no node; `D-2`'s write path is the tier's own main-side channel. **Reconciled by the ruling's own clause (1)/(2) (peer claim + the unchanged flag domain).** |
| `store-core-graph.md` `§2.1`'s CLOSED 16-member union (annotation `16 = 8` held + `5` + `3`) | **NO** | `D-2`'s refusal form is **not yet specified**; the standing rule is `D-GATE` clause (2) — **a channel token, never a store-union member** (`SecurityWriteReceipt` precedent, `src/main/security-store.ts:16-23`). **Carried as a standing condition (Q-7).** |
| `store-core-graph.md` `§2.5` items 1/2 — the typed `secure-refused` refusal and its precedence | **NO** | Neither clause edits the generic surface's refusal; `D-1` is about what a tier-4 READ **returns**, `D-2` about whether a runtime WRITE is admitted. |
| `ci-ui-leg.md` `§0` prohibition 3 + `§3.5` `SEAM-4` — *"No policy defaults"* / the default set unchanged | **NO** | Neither clause touches `VALID_GROUPS` (frozen at five) or the `read`+`dispatch` default. |
| `data-ownership-model-plan.md` `§3.8`'s three forbidden reads, esp. (3) the **carrier** prohibition | **NO — and this is the clause that strengthens it** | `D-1` is exactly a **carrier**-hygiene clause: without it, a caller reaching the tier's object in-process holds a live reference into the tier. |
| `mcp-endpoint.md` `§6.4` — *"manual-UI-only by construction"* | **NO** | `D-2` adds a condition **inside** the manual-UI path; it does not widen the MCP channel. |
| `docs/specs/store-security.md` `§0A` items 3/7 — the receipt's closed form; the no-`schemaVersion` clause | **NO** | `D-1` does not change a return **shape** (a clone has the same shape as its subject); `D-2` adds no persisted member. |

**Unreconciled hits: NONE.** **RESULT: `0` unreconciled prohibition-row hits**, and **`0` re-name
requests** — no adopted external name is involved, which is the exemption's whole point.

### 2.4 THE OPEN-SEMANTICS LIST — one line per question, `must-fix` first

**`must-fix` (`5`) — these block a spec, and the verdict is issued because they stand unanswered:**

| # | The question (verbatim for the orchestrator's hand-off) |
| --- | --- |
| **Q-1** | **Is `D-2` a STRUCTURAL admission rule or a runtime PREDICATE?** If a predicate: which holder evaluates *"is the MCP blocked?"* at the write turn, given that `main` may **supply state** but may not **decide** (`P-7`/`N-2`; `docs/specs/secure-exclusion.md`'s `F-11`), and the store cannot hold gate state? |
| **Q-2** | **What is the clone discipline?** A **cycle-safe, prototype-safe DEEP** copy (the landed `G4-F5`/`snapshotValue` precedent: `Object.create(null)` at every depth, a `seen` map, no depth bound) or a **shallow** fresh copy (the landed `get()` shape, `security-store.ts:119`)? A JSON round-trip is **not** admissible (it throws on cycles/BigInt and can poison prototypes). |
| **Q-3** | **What is the CLOSED read-surface set `D-1` binds — and is `lastWriteReceipt()` in it or carved out?** Today it returns the **SAME receipt object by identity** (`src/main/security-store.ts:142-144`), so `D-1` as filed **contradicts one landed read surface**. |
| **Q-4** | **What is write-legality's SCOPE — boot ingestion only, or runtime — and if runtime, does the runtime write path live in the tier's own main-side holders or is it graph-routed?** (The scope half is settled by the ruling; the **implementation site** is not.) |
| **Q-5** | **Does `D-1` bind the BOOT-INGESTION reads and `persist()` — and does an UNREPRESENTABLE (unserializable) tier-4 write FAIL?** (`store-core-graph.md` `§0` `A1` requires an unserializable write to FAIL `'serialize-failed'`; the tier's write path has **no such validation** today.) |

**`conditional` (`9`) — answerable at or after the spec gate; they do not block the gate:**

| # | The question |
| --- | --- |
| **Q-6** | Which **write-refusal token** answers an inadmissible write, and is it a **channel** token (the `SecurityWriteReceipt`/`D-GATE` clause (2) precedent) rather than a store-union member? |
| **Q-7** | Is the write refusal carried **outside the store's closed 16-member union**, and does it therefore need **no re-freeze of that union's annotation**? |
| **Q-8** | **Where is the enforcement site** for the write condition — the `IPC_SECURITY_SET` handler (`src/main/main.ts:385-404`), the store's own `set()`, or a store-local gate the store reads as **state** while it keeps the **decision**? |
| **Q-9** | Does `S1`'s transition set gain a **write arm** — i.e. does the exclusion transition have to do anything about a tier-4 write in flight, or is the write-vs-transition race **observable only at the channel**? |
| **Q-10** | **What is `D-2`'s BOOT terminal?** A stored pair (e.g. *tier open + MCP disabled*) is a pair `D-GATE` clause (1) calls **illegal**; the boot rule today is the landed `D-19` sequence (open → ingest → close → enable). |
| **Q-11** | **Who holds the re-freeze arm**, and is the *"return to MCP enabled"* transition allowed to leave a tier-4 write admitted (the measured `SC-D-07`)? |
| **Q-12** | Does `D-1` bind a **boot-ingestion read into a main-side holder** (a value that then lives in the caller), and is such a holder required to be a clone of the clone? |
| **Q-13** | What does `D-1` mean for a value the tier **itself** mints (the receipt, the post-state record) — clone-on-return, or is the store's own holder exempt? |
| **Q-14** | Is `D-2`'s *"permitted"* an **admission with a success receipt** in the legal state, so that the legal-state write is observably no different from today's (measured `SC-D-06` = `PASS`)? |

### 2.5 The architect-answers table (EMPTY — pending, one row per question)

**No answer is written here. This pass answers nothing.** The table is the hand-off surface: the
architect's answer goes in the right-hand column, and a re-run of this gate-1 step reads it as the
semantics block's answers (`STEP 0`'s rule).

| # | Question (short form) | Class | **THE ARCHITECT'S ANSWER** |
| --- | --- | --- | --- |
| **Q-1** | `D-2` structural or runtime predicate? | `must-fix` | **PENDING** |
| **Q-2** | The clone discipline (deep cycle/prototype-safe vs shallow)? | `must-fix` | **PENDING** |
| **Q-3** | The closed read-surface set; `lastWriteReceipt()` in it or carved out? | `must-fix` | **PENDING** |
| **Q-4** | Write-legality's scope and implementation site? | `must-fix` | **PENDING** |
| **Q-5** | Does `D-1` bind boot reads and `persist()`; does an unserializable write FAIL? | `must-fix` | **PENDING** |
| **Q-6** | The write-refusal token's form? | `conditional` | **PENDING** |
| **Q-7** | Outside the store's 16-member union (no re-freeze)? | `conditional` | **PENDING** |
| **Q-8** | The enforcement site? | `conditional` | **PENDING** |
| **Q-9** | Does `S1`'s transition set gain a write arm? | `conditional` | **PENDING** |
| **Q-10** | `D-2`'s boot terminal (the stored illegal pair)? | `conditional` | **PENDING** |
| **Q-11** | The re-freeze arm and the *"return to MCP enabled"* state? | `conditional` | **PENDING** |
| **Q-12** | Do boot-ingestion reads bind, and must a holder clone the clone? | `conditional` | **PENDING** |
| **Q-13** | Are the tier's own minted records (the receipt) exempt from clone-on-return? | `conditional` | **PENDING** |
| **Q-14** | Is the legal-state write observably unchanged? | `conditional` | **PENDING** |

**RULE THAT FOLLOWS FROM THIS TABLE (STEP 0, verbatim in effect):** *any dossier row still
`undefined-until-answered` (or any OPEN/OVERFLOW open-semantics entry) forbids the delegable
verdict — the verdict is `BLOCKED-ON-SEMANTICS` with the open list attached, escalated to the
architect in that pass.* **Five `must-fix` questions stand; see §9.**

---

## 3. THE FOUR INPUTS — JUDGED, WITH THEIR EVIDENCE

**Each input is recorded as an input judged, not as a conclusion repeated.** Their findings are
carried where this record's own sections need them.

### 3.1 STEP 1 — VALIDITY → `BLOCKED-ON-SEMANTICS` (not delegable)

**Judged: CORRECT IN CLASS, and its reading of `D-1` is the one this record adopts.** Its substance,
which this pass re-grounded at the bytes:

| Its finding | The evidence, re-read this pass |
| --- | --- |
| `D-1`'s read-surface set is **determinable but unclosed** | The tier's declared surface is exactly three members: `get(): SecuritySettings` · `set(patch): SecuritySettings` · `lastWriteReceipt(): SecurityWriteReceipt \| null` (`src/main/security-store.ts:25-33`). **Three members, three questions of scope (Q-3, Q-12, Q-13).** |
| `D-1`'s **clone DISCIPLINE is undecided**, and the landed word is **"a FRESH copy"** | `docs/specs/store-security.md` `§2.1` item 2: *"returns a FRESH copy `{ token, enabled: [...enabled], maxJournalLength }` of the in-memory `current`"* — **a one-level spread, which IS a shallow copy** (`security-store.ts:118-120`). The word *"copy"* is landed; the word *"deep"* is not — **except in the export precedent** (`G4-F5`, `snapshotValue`). And `SecuritySettings` is **flat** today (`src/shared/types.ts:316-323`), so the distinction is invisible until the shape opens — which the peer ruling's clause (5) does. |
| `D-1` **restates landed reality** for today's record | Confirmed at `security-store.ts:118-120`; **empirically confirmed live** by Family D's `SC-D-02a` (§6). |
| `D-2` is **NEW contract** and **settles `P-R3`** | Confirmed: no landed clause states tier-4 write-legality; the write path is unconditional (`main.ts:385-404`). The scope settlement is recorded at `docs/pending.md` `§R` `P-R6`. |
| Its open items: clone discipline · closed read-surface set · write-refusal token · enforcement site · whether `S1`'s transition set gains a write arm · `D-2`'s boot terminal · the re-freeze arm · whether `D-1` binds boot-ingestion reads and `persist()` | **All eight are carried in this record's §2.4** (`Q-2`…`Q-5`, `Q-6`…`Q-12`). |

**Disposition: SUSTAINED ENTIRELY.** Its `BLOCKED-ON-SEMANTICS` class is the class this record
independently reaches.

### 3.2 STEP 2 — CRITIQUE → `FLAWED` (one decisive flaw + supporting must-fixes)

**Judged: SUSTAINED ON SUBSTANCE, and its decisive flaw is the reason §9's verdict is not
delegable.** Every supporting item re-grounded this pass:

| Its finding | The evidence, re-read this pass | Disposition |
| --- | --- | --- |
| **DECISIVE — `D-2` conditions the tier's write on a state the store cannot hold and `main` may not decide** | `F-11`'s standing rule: *the gate supplies STATE, the store keeps the DECISION*; a `secure.*` check written in `main.ts` is a `P-7` second-authority finding (`docs/specs/secure-tier-generalization-review.md` `§2`; `main.ts:383`'s own comment: *"This is NOT a `secure.*` segment check: `main` supplies STATE and asks only 'is the exclusion open?'"*). **So a runtime predicate needs a decider the record has not named.** | **SUSTAINED → `Q-1` (must-fix) + `Q-8`.** |
| A JSON-round-trip clone would throw on cycles/BigInt and poison prototypes; the landed precedent is cycle-safe/prototype-safe | `store-core-graph.ts:362-388` (`snapshotValue`: `seen` map + `Object.create(null)`) — the `G4-F5` pin. | **SUSTAINED → `Q-2` (must-fix).** |
| **`lastWriteReceipt()` returns the SAME receipt object by identity — a landed NON-clone read surface** | `security-store.ts:142-144`: `return lastReceipt` — the identical binding written at `:139`. **`D-1` as filed is contradicted by one landed member.** | **SUSTAINED → `Q-3` (must-fix) + finding `F-1`.** |
| **`D-2` is UNREACHABLE today**: `IPC_SECURITY_SET` is the manual-UI channel, NOT a `D-SCOPE` MCP-reachable surface | `main.ts:385-404` is an `ipcMain.handle` on the manual-UI channel; Family D's own row states it: *"the path is NOT MCP-reachable (`D-SCOPE`: the manual-UI channel is explicitly NOT an MCP method), which is why this is a GATE-SCOPE finding and NOT a leak"* (`docs/specs/store-compliance-live-battery.md` `§7`). **`main.ts:385-404` contains no exclusion read at all**; it calls `mcp.applyGatePatch` at `:396` — the *re-gate*, not an admission check. | **SUSTAINED → `Q-1`/`Q-4`/`Q-8`; and this is what makes the conditionality untestable on the only write path that exists.** |
| Blast radius: the pane's four handler bodies fire `s.set(...)` and never read the resolution | `src/renderer/secure-panels.ts:119` · `:124` · `:134` · `:143-144` — four call sites, none reads the return. **So a new refusal is a SILENT no-op at the pane, and `syncConfig()` would render an uncommitted state** (`store-security.md` `§0` ruling 11: *"NO call site in `src/**` READS the resolved value"*). | **SUSTAINED → finding `F-4`; carried as a mandatory unit condition.** |
| Nothing in `S1` decides the write-vs-transition race | Family D's `SC-D-08` is **`MANUAL` — a withheld claim**, with the reason at the row. | **SUSTAINED → `Q-9` + finding `F-3`.** |
| **`D-1` is structurally NOT-OBSERVABLE through the bridge** (IPC structured-clones) | The battery's own `§5` layer table: `[CDP]` *"the value has ALREADY crossed an IPC boundary and been structured-cloned, so a renderer-side mutation cannot reach `main` whatever `main` returns"*; `SC-D-03` says so **in its own subject**. | **SUSTAINED — and NOT a defect of the clause:** `D-1` therefore buys **identity-aliasing integrity**, not confidentiality. Recorded as the clause's **true scope**, so the spec does not claim a live green it cannot have. |
| `sanitize()` drops unknown keys at boot while clause (5) grants arbitrary subsystem-keyed storage; `A1` requires an unserializable write to FAIL | `security-store.ts:37-46` (`sanitize` rebuilds the three members); `store-core-graph.md` `§0` `A1`; and the already-filed `SECURITY-STORE-SILENT-KEY-DROP` (`docs/defects.md` `## OPEN`, **re-measured live** by `SC-D-05`'s unknown-member half). | **SUSTAINED → `Q-5`, and the defect row's owner is already `S2`.** |
| `D-1` buys identity-aliasing integrity, not confidentiality | Consequence of the two rows above. | **RECORDED as the clause's framing** — it is the honest description. |

**Disposition: `FLAWED` ACCEPTED AS THE CLASS, WITH THE DECISIVE FLAW NAMED: it is an
UNANSWERED-SEMANTICS flaw, not a design impossibility** — every supporting item resolves into one
of §2.4's questions, and **none of them is unanswerable** (see §9's statement).

### 3.3 STEP 3 — ARCHITECTURE REVIEW → `D-1` `FITS-WITH-ONE-NAMED-DECISION` · `D-2` `DOES NOT FIT AS FILED`

**Judged: SUSTAINED, and its `D-2` diagnosis is carried as this record's own mechanism finding
(§5).** Its substance, with the bytes this pass re-read:

| Its verdict | Its mechanism | Re-grounded this pass |
| --- | --- | --- |
| **`D-1` FITS-WITH-ONE-NAMED-DECISION** — the one landed contradiction is `lastWriteReceipt()` | `D-1` restates `get()`/`set()`'s landed fresh-copy shape and only needs the discipline **and** the surface set **named**. | `security-store.ts:118-120` vs `:142-144` — **confirmed**: two of three members already clone, one does not. |
| **`D-2` DOES NOT FIT AS FILED** — second authority + unreachable | *The gate supplies STATE, the store keeps the DECISION*; the write path evaluates no gate member today. | `main.ts:385-404` — **confirmed: no gate read in the handler.** |
| **The FITTING FORM is the STRUCTURAL admission rule**: tier-4 write surfaces stay **non-MCP-reachable**, enforced where enforcement already lives — **`S1`'s invocation turn** | If the write path is unreachable from the MCP surface **by construction**, the conditional's antecedent has no runtime evaluator and needs none; the condition is discharged by the *shape of the reachable surface set*, not by a per-write state read. | Consistent with `D-SCOPE` (`ALL_TOOLS` ∪ resources ∪ notifications — **the manual-UI channel is not in it**) and with `S1`'s mandate (`D-GATE` clause (1): the refusal lives at the **invocation turn**, both transports). **Recorded as this record's recommended adaptation, and it is exactly `Q-1`'s fork.** |
| **`P-R3` consequence: the `GraphNodeFlag`-widening arm is STRUCTURALLY STALE** | `store-core-graph.md` `§0` `A2` puts `secure` **outside the ordering with NO graph node**, and `D-19` **retires the hydrate problem** (`hydrate(rows)` is not widened; the tier never joins the graph), so widening `GraphNodeFlag` would be a **fourth-distinction accretion** — and the peer row orders a pass to *surface* a fourth distinction rather than enforce one. | **See §5, stated as the mechanism it is.** |
| The re-freeze risk re-attaches to the store-core-graph artifact **only** in the graph-routed variant; the arm consistent with `D-18`/`D-19` is a **`security-store`-local name-keyed write path touching no frozen artifact** | The frozen artifact's field-7 edit-set is `{src/renderer/store-core-graph.ts, src/renderer/store-graph-references.ts, src/renderer/renderer.ts, tests/store-core-graph-integration.test.ts}` (`docs/specs/store-security.md` `§1.3` item 1); `src/main/security-store.ts` is **not** a member. | **Confirmed by the edit-set**; operative digest `sha256:29772ac7…`, executed file pins `0664c52f…` / `5c0c1a97…` (`store-security.md` `§1.3`'s dated annotation, which also warns **`29772ac7…` is never a file-pin figure**). |
| **Decomposition (`D-GP-SAD-5`): `NO-SPLIT`** — the two clauses are the already-admitted-but-not-startable `S2`'s own contract's **opening clause set**, no new ledger row | The unit was admitted `2026-10-05` with the write-path question *inside* its scope; the amendment **answers** that question rather than creating a unit. | **ADOPTED — dispositioned as this record's row at §4.** |
| **Adoption: ZERO-ROW EXEMPTION** — no foreign identifier, parameter or vocabulary; `clone`/`deep copy` has the landed `snapshotValue`/export precedent; `MCP blocked` maps to the landed `'mcp-disabled'` state | As stated. | **ADOPTED, and this pass **re-verified both precedents at their bytes** (§2.2). |
| **14 closed questions, of which 5 are `must-fix`** | `Q-1`…`Q-14`. | **ADOPTED verbatim into §2.4** — the wording of `Q-1`…`Q-5` is preserved so the orchestrator can put them to the architect unchanged. |

**PROVENANCE LIMIT, STATED (`RCA-12`):** the architecture review for this amendment is **not a file
in this repo** (globbed: no `docs/specs/*tier4*-architecture*`, no `archive/gate1/*tier4*`); its
substance reached this pass **as the supervisor-supplied digest, item by item**. Where §3.3 says
"re-grounded this pass", **the grounding is the two byte-level claims this pass re-read** (the
`security-store.ts` member set and the `main.ts` handler), **not a re-reading of the review's own
prose.** A later pass that quotes §3.3 should cite the review by this digest's terms, not as if the
file existed.

### 3.4 STEP 3b — LIVE MEASUREMENT (the store-compliance battery's Family D, a distinct input)

**Judged: `D-1 = COMPLIANT` and `D-2 = NON-COMPLIANT` are ACCEPTED AS MEASUREMENTS, quoted in §6
with their instrument, their commit and their own declared limits — and their scopes are read as
their rows state them, not wider.** The one thing this record adds is the **scope translation**: a
`NON-COMPLIANT` verdict on a path the measuring pass itself declares **not MCP-reachable** is a
**gate-scope** reading, and the question it raises is `Q-1`'s (**is the clause structural or a
predicate?**) — not "the app is leaking".

---

## 4. THE `D-GP-SAD-5` DECOMPOSITION ROW — keyed `decomposition`, dispositioned HERE

**Nine columns, the source spec's names verbatim** (`decomposition · recommendation · proposed
fraction · boundary (named) · remainder / coherent core · disposition · decider · bubble ·
ordering anchor`; `docs/specs/store-core-graph-compliance-review.md` `§1` family (3) cites the duty
text). **Dispositioned on this record, never inside a spec.**

| column | content |
| --- | --- |
| **`decomposition`** | **`NO-SPLIT`** — the amendment adds **no unit**; it is the **opening clause set of the unit already admitted** (`S2` `U-TIER4-ARBITRARY-STORAGE`, admitted `2026-10-05`) |
| **`recommendation`** | **`NO-SPLIT`** — no fraction is named and none is delegated |
| **`proposed fraction`** | **NONE.** A fraction was **considered and refused**: a hypothetical `U-TIER4-CLONE-SURFACE` (the read discipline alone, landable with no write question) is **refused** because `D-1` and `D-2` are **the same contract's two halves** — the clone discipline determines the read shape of the very tier the write clause opens, and splitting them would let the write half land against an unclosed read surface (`Q-3`'s `lastWriteReceipt()` contradiction would be inherited, not resolved). **A second ledger row is also refused on `RCA-8(f)`'s terms:** the architect admits rows, and the write-path question is **already inside `S2`'s admitted scope** |
| **boundary (named)** | **THE AMENDMENT'S WHOLE BOUNDARY IS `src/main/security-store.ts` PLUS THE AMENDMENT'S OWN TARGETS — and it touches NO frozen artifact in the store-local arm:** (i) the tier's read surface (`get()` `:118-120` · `set()`'s return `:140` · `lastWriteReceipt()` `:142-144`); (ii) the tier's write path (the store-local name-keyed path `Q-4`/`Q-8` name, or the graph-routed variant `Q-4` must choose); (iii) the tier's persistence/`sanitize` boundary (`:37-46`, `:84-115`); (iv) the **`main`-side handler sites** `src/main/main.ts:385-404` **as STATE suppliers only**; (v) the spec amendments already owed by `S2` (`mcp-endpoint.md` `§6.4`, `secure-panels.md`, `docs/FORKER.md` `§4`). **The boundary's decisive property, stated as the architecture review stated it: the store-local arm touches NO frozen artifact and NO member of the frozen field-7 edit-set** (`store-security.md` `§1.3` item 1) |
| **remainder / coherent core** | **THE COHERENT CORE IS ONE CONTRACT ABOUT ONE TIER'S READ/WRITE SHAPE.** The clause pair is closed under itself: the **clone discipline** (a deep, cycle-safe, prototype-safe copy — or a named carve-out) determines what every read hands out; the **read-surface set** closes which members are bound; the **write-legality rule** determines which surface may write and under what condition; and the **refusal token** answers an inadmissible write. Every one of these is drivable against **the tier's own three-member API + its own file** — the same file, the same exactly-two-file pin, the same `sanitize` — so the sub-parts **hang off one decision** and are **not independently delegable** |
| **disposition** | **`SPLIT-NOW` in the `NO-SPLIT` sense** — the `NO-SPLIT` recommendation **is adopted**, the proposal stands whole, **nothing is delegated and no sub-module is named** (the `store-core-graph-compliance-review.md` `§4` precedent's own reading of this cell). **No bubble fires.** |
| **decider** | **the change-analysis pass (this record)** for the `NO-SPLIT` reading; **the architect** for the **content** questions the row's boundary carries (`Q-1`…`Q-5`) — the split question itself needs no ruling, because the unit is already admitted |
| **bubble** | **`no`** — no decomposition bubble is filed. **`BUBBLE-ANSWERED: DECLINED \| 2026-10-11`** is **not** used here: that token belongs to the answered-bubble form (`H2`'s row), and this row fires no bubble to answer |
| **ordering anchor** | **`S2` `U-TIER4-ARBITRARY-STORAGE` — NOT STARTABLE BEFORE `S1`'s (`U-SECURE-EXCLUSION`) DONE ROW** (`docs/pending.md` `§R` `P-R3`; the `docs/next-steps.md` `S2` cell: *"BLOCKED ON `S1`'s DONE ROW"*). **The amendment changes the ordering anchor in NO way**, and it adds no second anchor: the two clauses are inside the unit that already sits behind `S1`. **The gate halves the ruling also touches — the invocation-turn refusal, both transports, the epoch — belong to `S1` and are NOT moved here** |

**WHY NOT `SPLIT-NOW`-AS-A-REAL-FRACTION (`AR-7`'s class):** the `≤8` register-threshold signal
(`AGENTS.md` item 11(f)) is not in play — no register is authored by this pass, and `S2`'s register
is owed to its own spec gate. **The signal that would argue a split — a named separable component —
is absent by inspection:** both clauses bind to the same member set of the same module.

---

## 5. THE `P-R3` CONSEQUENCE, WITH ITS MECHANISM

**`docs/pending.md` `§R` `P-R3` carries a parenthetical that is now STALE. The mechanism, not the
conclusion:**

> as filed: *"…or does it **also grant runtime name-addressed writes after boot** (**requires
> `GraphNodeFlag` widening and a genuine re-freeze** of `src/renderer/store-core-graph.ts` +
> `docs/specs/store-core-module-store-core-graph-surface.md`, operative digest `sha256:29772ac7…`,
> executed file pins `0664c52f…` / `5c0c1a97…`, plus a seat/integration re-cycle)."*

**Three steps, each with its authority:**

1. **The `GraphNodeFlag`-widening arm is STRUCTURALLY STALE.** `GraphNodeFlag` is a closed
   three-member domain (`'temp' | 'mem' | 'file'`, `store-core-graph.ts:16`, `:255`), `secure` has
   **no durability rank** (`:262`), `holderOf` guards `token !== 'secure'` (`:524`), and the
   architect's own amendment `A2` at `store-core-graph.md` `§0` states: *"`secure` IS A SEPARATE
   MAIN-SIDE COLLECTION OUTSIDE THIS ORDERING AND CARRIES NO GRAPH NODE."* **A runtime name-addressed
   tier-4 write does not need a graph node to be legal** — it needs a **write path**. Widening the
   flag domain would create a **fourth distinction** between tier 4 and the `file` tier, and the
   peer ruling `SECURE-TIER-IS-A-FILESTORE-PEER` orders exactly the opposite: *"A pass that finds a
   FOURTH distinction … must **surface** it rather than enforce one."*
2. **`D-19` retires the hydrate path** — the boot sequence is open → ingest → close → enable, so the
   tier is **consumed into main-side holders at boot** and `hydrate(rows)` (which skips every
   non-`file` token by declaration, `store-core-graph.ts:2192-2196`) is **not widened**. The one
   re-freeze the `P-R3` parenthetical priced as *required* is therefore priced against a path the
   rulings **closed**.
3. **The arm consistent with `D-18`/`D-19` is a `security-store`-LOCAL, name-keyed write path** —
   `src/main/security-store.ts` plus the `main`-side handler as a **state supplier**. **It touches no
   frozen artifact:** the frozen field-7 edit-set is `{src/renderer/store-core-graph.ts,
   src/renderer/store-graph-references.ts, src/renderer/renderer.ts,
   tests/store-core-graph-integration.test.ts}` (`store-security.md` `§1.3` item 1), and
   `src/main/security-store.ts` is **not a member**.
4. **The ONLY live re-freeze arm is the GRAPH-ROUTED variant** — if the architect answers `Q-4` by
   routing runtime tier-4 writes through the graph (a `tiers.secure` handle, or a widened
   `GraphNodeFlag`), then a **genuine re-freeze** is owed: a new digest for
   `store-core-module-store-core-graph-surface.md` + an amendment row + a seat/integration re-cycle,
   **and** a fourth-distinction finding to surface per the peer row. **That arm is available and
   priced — it is not the default, and it is not what `P-R3`'s parenthetical implies.**

**THE ANNOTATIONS THIS FINDING OWES (made in this pass, `RCA-8(d)` annotate-beside):**
`docs/pending.md` `§R` `P-R3` gains a dated pointer to **this record** and to the architecture
review's mechanism finding; `docs/next-steps.md`'s `S2` cell gains a dated block carrying the ruling,
this record's path, the verdict, the measured Family-D state and the five `must-fix` questions.
**The `P-R3` row's own bytes are NOT rewritten; `P-R6` receives a cross-reference only.**

---

## 6. THE MEASURED CURRENT STATE (quoted as measurements, with instrument and commit)

**Instrument and provenance, stated first:** the **store-compliance live battery's Family D**, the
fifth round, commit **`78d1cce`**, driver `tests/store-compliance-live.mjs` sha256
**`41b85af8b71a3d8e7e3e427e95fddb24cfef72a4159ccc6208be2cbbaaeac3c4`**, run **twice pre-commit on
the final bytes** (`37` rows = `30 PASS / 6 FAIL / 1 MANUAL / 0 PARKED`, exit `1` on both, the two
logs differing on exactly two lines — the probe's own sha256 and the race row's `settledAtMs` 2 vs
1). **This pass re-ran NOTHING** (`RCA-12`): every figure below is **the measuring pass's own
reading, quoted with its owner.**

### 6.1 `D-1 = COMPLIANT` (measured)

| Layer | The reading |
| --- | --- |
| **`[B]` — module layer, IN-PROCESS** (`SC-D-02a`) | Round 1: `store.get()` read `{token:"compliance-live-token-9b1f7c33", enabled:"5:read\|dispatch\|graph\|code\|module", mjl:41}`; the return was **mutated** (`token` overwritten, `enabled` pushed AND spliced, `mjl` 999, an extra member added); **the SECOND read was UNMOVED** — `secondReadMoved=false`, `sameObjectReturned=false`. Round 2: `store.set({maxJournalLength:44})`'s **RETURN** mutated the same way; the second read `mjl:44`, `secondReadMoved=false`; the set's receipt `{"status":"committed"}`, `fileAfterSetMoved=true` (the write really landed — the non-vacuity term). `probeExitCode=0`, `probeStdoutToken="PROBE-OK"`, `probeErrors=[]`. |
| **THE DELETION TEST** | **5 of 5 mutations REDDEN** under the deletion of their own term (`add-member`, `change-maxjournal`, `delete-token`, `overwrite-token`, `splice-enabled`) — so the `false`s are **readings, not a dead detector**. |
| **`[CDP]` + `[G]` — the LIVE consequence half** (`SC-D-03`, `SC-D-04`) | The live bridge's record was held in the page realm and mutated (`maxJournalLength→999`, an extra member, token deleted); the pre- and post-mutation fresh reads were **IDENTICAL** (`liveUnmoved=true`) and the file's sha256 `e2758229c9c60cdb… → e2758229c9c60cdb…` (**`fileUnmoved=true`**). |
| **THE ROW'S OWN DECLARED LIMIT** | *"IPC serialization means this arm would hold REGARDLESS of what `main` returns"* — the row states it **in its own subject**; `SC-D-02a` is the reference witness, `SC-D-03` the consequence check. **The battery does NOT present the bridge probe as witnessing the reference half.** |
| **Controls** | CONTROL-1 (a **SHARED object** handed to two readers) → `secondReadMoved=true` (the detector **fires on a reference**); CONTROL-2 (a **REPLACED file** read by a FRESH store) → `secondReadMoved=true`. |
| **This pass's own byte-level re-grounding** | `security-store.ts:119` composes a fresh literal and spreads `enabled` (a **one-level** copy); `:140` returns `this.get()`; `:142-144` returns the **same** `lastReceipt` binding. **So `D-1` holds for 2 of the tier's 3 declared members — and the third is the named contradiction (`Q-3` / `F-1`).** |

### 6.2 `D-2 = NON-COMPLIANT` (measured)

| Arm | The reading |
| --- | --- |
| **`SC-D-05` — MCP ENABLED (the forbidden state, `D-GATE`'s boot terminal, tier CLOSED)** | The state read **from the app**: `exclusion="mcp-enabled"`. The write's whole response: `{"token":"…","enabled":[…5 groups…],"maxJournalLength":42,"write":{"status":"committed"},"exclusion":"mcp-enabled"}` — **`committed`**. The file's sha256 moved **`e2758229… → 4d7c0bd5…`**, `maxJournalLength 44 → 42`, `bytesLanded=true`. → **FAIL**. The unknown-member half answered the same `committed` with `unknownMemberInFileBytes=false` — the already-filed `SECURITY-STORE-SILENT-KEY-DROP`, **re-measured, not new**. |
| **`SC-D-06` — MCP DISABLED (the one legal state)** | `setExclusion('mcp-disabled')` → `{"applied":true,"state":"mcp-disabled"}`; the write `committed`, `4d7c0bd5… → a675446c…`, `42 → 43`, `bytesLanded=true`. → **PASS** (the **non-vacuity** proof: the write path really works). |
| **`SC-D-07` — THE RETURN transition** | `setExclusion('mcp-enabled')` → `{"applied":true,"state":"mcp-enabled"}`; the SAME write answered **`committed` AGAIN**, `a675446c… → e2758229…`, `43 → 44`. → **FAIL**. |
| **`SC-D-08` — the write-vs-transition RACE** | Both calls issued in ONE tick; the exclusion answered `applied`; the file ended at the race arm's own value (`44 → 45`, `bytesLanded=true`). → **`MANUAL` — A WITHHELD CLAIM**, with the reason at the row: *"the two main-side handlers run to completion inside ONE JS turn and this driver controls neither end's scheduling."* |
| **The derivation** | `armFails = ["SC-D-05","SC-D-07"]`, `armManuals = []`, `controlOk = true`. **The conditionality is ABSENT, not merely inverted** — the write is admitted in BOTH forbidden states AND in the one legal state. |
| **The gate under measurement** | `L` `src/main/main.ts:385-404` — **the handler performs NO exclusion check and consults no gate member before persisting** (this pass read the handler: it calls `securityStore.set(patch)`, then `mcp.applyGatePatch(...)`, then attaches `exclusion` to the RESPONSE — **an echo of state, never an admission test**). |
| **The filed scope finding** | `docs/pending.md` `§R` **`P-R6`** (new, `2026-10-11`) — **a GATE-OF-SCOPE item, not a leak**: `D-SCOPE` excludes the manual-UI channel from the MCP-reachable set, so no MCP tool can perform this write. |
| **The battery's other figures (context, same commit)** | `37` rows = `30 PASS / 6 FAIL / 1 MANUAL / 0 PARKED`, exit `1`; the `§5.U` matrix is **`8` U-rows** (at the `≤ 8` cap, `summary.total === 8`, `rows[]` = the same `8`), `§6.1` machine-parses (`PARSE OK rows 8 total 8`). |

**WHAT THE TWO VERDICTS DO NOT SAY, STATED SO THEY ARE NOT OVER-READ.** `D-1 = COMPLIANT` is a
**module-layer `[B]` PASS plus a live consequence PASS** — it is **not** an app-green for the
reference half, and the battery says so. `D-2 = NON-COMPLIANT` is a **gate-scope finding on a
non-MCP-reachable channel** — it is **not** a leak, and it is **not** a defect of a landed contract:
*"the landed handler is exactly what its own contract says it is, and the clause it does not satisfy
arrived AFTER the handler did"* (the battery's own words).

---

## 7. THE RISK TABLE (the architecture review's `R1`–`R6`, carried)

**Carried forward, with its provenance limit stated: these are the architecture review's six risks as
they reached this pass (supervisor-supplied digest). Each is dispositioned by this record — none is
left bare.**

| # | Risk | Disposition |
| --- | --- | --- |
| **R1** | **THE SECOND AUTHORITY** — `D-2` as filed conditions a write on a state the store cannot hold, and `main` may supply **state** but not take the **decision** (`P-7`/`N-2`; a `secure.*` check in `main.ts` is a `P-7` finding). | **MUST-FIX — `Q-1` (`decider`/`Q-8` site).** The **structural admission rule** (tier-4 write surfaces stay non-MCP-reachable, enforced where enforcement already lives) is the **fitting form** and is **recommended** here — but the architect rules. **Not resolvable by a pass.** |
| **R2** | **UNREACHABILITY** — with `'mcp-enabled'` (the boot default) a renderer tier-4 write is admitted on a path with **no gate at all**, so a runtime *predicate* has nothing to evaluate on the only write path that exists. | **MUST-FIX — `Q-1`/`Q-4`.** Measured (§6.2). **This is the risk that decides the structural-vs-predicate fork.** |
| **R3** | **THE REFUSAL TOKEN** — a write refusal must not become a second security token in the store's closed **16-member** union (a collision finding). | **CONDITIONAL — `Q-6`/`Q-7`.** The `D-GATE` clause (2) precedent (`SecurityWriteReceipt`, `security-store.ts:16-23`) is the **named route**; carried as a standing condition. |
| **R4** | **RE-FREEZE EXPOSURE** — a runtime name-addressed write **can** force a genuine re-freeze (`src/renderer/store-core-graph.ts` + its surface artifact, digest `29772ac7…`, pins `0664c52f…`/`5c0c1a97…`, plus a seat/integration re-cycle) **if and only if** the graph-routed variant is taken. | **CONDITIONAL — `Q-4`.** The mechanism is stated at **§5**; **the store-local arm touches no frozen artifact.** |
| **R5** | **THE WRITE-vs-TRANSITION RACE** — nothing in `S1` decides it; the instrument cannot place the transition inside the handler's critical section. | **CONDITIONAL — `Q-9`.** Measured `MANUAL` (§6.2); **carried with its owner: the next pass that gates the write path** (`P-R6`'s own row records it as a declared limit). |
| **R6** | **BLAST RADIUS AT THE PANE** — the pane's four handler bodies fire `s.set(...)` and **never read the resolution**, so a new refusal is a **silent no-op** and `syncConfig()` would render an **uncommitted** state; and the unknown-member write still **commits while the member is absent** (`SECURITY-STORE-SILENT-KEY-DROP`, re-measured). | **CARRIED AS A MANDATORY UNIT CONDITION — `F-4`,** plus the already-owned defect row (`docs/defects.md` `## OPEN`, **owner `S2`**). Any refusal contract for this tier must decide what the pane observes. |

---

## 8. FINDINGS CARRIED INTO THE UNIT (this record's own list)

| # | Sev | Finding | Owner / carrier |
| --- | --- | --- | --- |
| **F-1** | **MED** | **`lastWriteReceipt()` is a landed NON-clone read surface** — it returns the **same** receipt object by identity (`security-store.ts:142-144`). `D-1` as filed **contradicts a landed member**; the set of bound surfaces must be closed and this member either included or expressly carved out. | **`Q-3` (must-fix)** → the unit's spec gate; the architect rules the carve-out or the unit clones it (a one-line change with its own red row). |
| **F-2** | **MED** | **`D-2` has no reachable evaluator**: the only runtime write path is the manual-UI handler, which `D-SCOPE` excludes from the MCP-reachable set and which reads **no** gate member (`main.ts:385-404`). A runtime predicate on this path evaluates a state whose antecedent cannot be observed, and the measured `SC-D-05`/`SC-D-07` show the write proceeding in both forbidden states. | **`Q-1`/`Q-4` (must-fix)**; measured record `docs/specs/store-compliance-live-battery.md` `§7`; park row `P-R6`. |
| **F-3** | **LOW-MED** | **The write-vs-transition race is unmeasured by construction** (`SC-D-08` = `MANUAL`, withheld) and `S1`'s contract does not name a write arm. A gate-6 claim over the write path must not be read as covering it. | **`Q-9` (conditional)**; carried to the unit's gate 6 and to whoever admits `P-R6`. |
| **F-4** | **MED** | **The pane cannot observe a refusal**: four call sites (`secure-panels.ts:119`, `:124`, `:134`, `:143-144`) fire `s.set(...)` and read nothing; `syncConfig()` renders the pane's own state, so a refused write is **indistinguishable from a committed one** at the operator's pane. | **The unit's contract** (the refusal's observability), and the already-filed `SECURITY-STORE-SILENT-KEY-DROP` (`docs/defects.md` `## OPEN`, owner `S2`). |
| **F-5** | **MED** | **The tier's write path has NO representability validation**: the store's `A1` rule requires an unserializable write to FAIL (`'serialize-failed'`), and `persist()` serializes with a bare `JSON.stringify` inside its own `catch` (`security-store.ts:88`), while `sanitize()` drops unknown keys (`:37-46`). With the shape opened by the peer ruling's clause (5), this becomes reachable. | **`Q-5` (must-fix)** → the unit's spec gate. |
| **F-6** | **LOW** | **`D-1` is not observable through the bridge** (IPC structured-clones): the live half of any `D-1` claim is a **consequence** check only. A spec that claims a live green for the reference half would be claiming a reading the instrument cannot take. | **The unit's spec** (`RCA-12`'s layer honesty); the battery already declares its own limit at `SC-D-03`'s subject. |
| **F-7** | **INFO** | **The `2026-10-05` rulings' two "the mechanism is OWED to the unit" cells (`A-1`, `A-5`) are still owed**, and this amendment adds `Q-1`…`Q-5` on top. The unit's spec gate therefore opens with **eight outstanding determinations**, not two. | **The unit's spec gate**; recorded so the spec writer is not surprised by the count. |
| **F-8** | **LOW** | **`P-R3`'s parenthetical is stale** (`GraphNodeFlag` widening presented as *required* for the runtime-write half), and a pass reading it as live would price a re-freeze the rulings do not require. | **FIXED IN THIS PASS** by the dated annotation at `docs/pending.md` `§R` `P-R3` (§5, deliverable 2). |
| **F-9** | **INFO** | **`docs/specs/secure-tier-generalization-review.md` `§2`'s `C-12` carries an attributed clause — *"the exclusion changes `main.ts` sites; the store's own single `B-SECURE-GATE` keeps the decision and `main` supplies only state"* (`F-11`)** — which is **the standing rule `R1`/`Q-1` turns on.** It is cited, **not re-derived**, here. | Cross-reference only; no cell moves. |

**NO PACKAGE DEFECTS.** Nothing in this pass implicates `node_modules/provident-ssr/**` or
`../Preempt-Providence/**`; `docs/defects.md` and `docs/HANDOFF.md` receive **nothing** from it.

---

## 9. THE VERDICT (closed vocabulary)

> ## `BLOCKED-ON-SEMANTICS`

**ISSUED EXPLICITLY ON THE STATED GROUND: `Q-1`…`Q-5` are UNANSWERED **and** ANSWERABLE BY THE
ARCHITECT.** This is not a rejection and not a finding of impossibility:

- **Every one of the five is a question of MEANING or SITE, not of feasibility** — clone discipline,
  read-surface set, the structural-vs-predicate reading of the write clause, the write path's
  implementation site, and the write's failure semantics. Each has admissible answers on the present
  record (this record names the fitting form for `Q-1` and the landed precedent for `Q-2`), and none
  requires new mechanism.
- **The blocking conditions are those the STEP-0 rule states:** an open semantics entry forbids the
  delegable verdict; **the delegable verdicts (`PROCEED` / `APPROVE-WITH-CONDITIONS`) may NOT be
  issued while `Q-1`…`Q-5` stand.** **`FLAWED` and `REJECTED` are NOT issued either** — the critique's
  `FLAWED` class is **accepted as an input** (§3.2) and **resolved into open questions**, and
  `REJECTED` is unsupported: `D-1` **restates landed reality** and is **measured COMPLIANT**, and
  `D-2`'s defect is an **unreached evaluator**, not an unrealisable one.
- **THE ESCALATION IS THIS PASS'S DELIVERABLE:** the five questions are put to the architect
  **verbatim and unchanged** (§2.4, §2.5's table) so the orchestrator can hand them over without
  re-phrasing. **A re-run of gate-1 step 4 reads the answers back into §2.5 and re-issues the
  verdict.**
- **`PROCEED`/`APPROVE-WITH-CONDITIONS` REMAIN AVAILABLE** the moment the answers land —
  **subject to two standing conditions that do not depend on the answers:** (a) the write refusal
  must ride the **channel-token** route (`D-GATE` clause (2)), never the store's 16-member union;
  (b) `D-2`'s resolution must **not** place the decision in `main` (`F-11`'s rule).
- **AND ONLY A PASSING REVIEW PLUS THE USER'S GO-AHEAD MAY PROCEED TO THE SPEC GATE** (the gate-1
  contract; `AGENTS.md` item 8/10a). **This record is not a passing review.** It is the gate-1 record
  of a `BLOCKED-ON-SEMANTICS` disposition.

**WHAT THE VERDICT IS NOT.** It is not a statement that the proposal is a bad idea — on the
evidence, **`D-1` is a good idea on balance and already true for 2 of 3 members**, and **`D-2`'s
INTENT is the fitting one** under the peer ruling (`D-SCOPE` already keeps tier-4 writes off the MCP
surface; the amendment asks for that to be **stated as a rule**). **It is a statement that the
clauses as WRITTEN do not yet determine their own meaning**, and that this repo's gate may not supply
that meaning for the architect.

**ON BALANCE — the four answers the gate was asked for, in the negative-and-positive form:**

1. **Is the proposal a good idea?** **YES ON BALANCE — for `D-1` cleanly; for `D-2` in intent, not as
   written.** `D-1` closes a real aliasing hole the moment the tier's shape opens (today it is
   defensive rather than load-bearing, and the measurement shows it holds for `get()`/`set()`);
   `D-2` states a rule the architecture already implies (`D-SCOPE`) and gives the scope ruling the
   `S2` unit was waiting on, at the cost of one landed contradiction and one unreachable evaluator.
2. **What needs to change?** **`D-2` must be re-expressed as a STRUCTURAL admission rule over the
   set of reachable write surfaces** (the fitting form), **or** the architect must name the
   decider and the state-holder for a runtime predicate. **`D-1` must name its discipline and close
   its surface set** — which forces the `lastWriteReceipt()` carve-out (or its clone).
   **Both are adaptations that KEEP the proposal's substance.**
3. **Costs and benefits?** **Benefits:** the tier's reads stop handing out live interiors the moment
   arbitrary data arrives; tier-4 write-legality becomes a **stated contract** instead of an accident
   of which channel happens to exist; `P-R3`'s scope question is answered. **Costs:** one landed
   member must change or be carved out (`F-1`); the write path gains a refusal whose **operator-visible
   signal must be designed** (the pane reads nothing, `F-4`); a **live battery re-measure** at the
   unit's gate 6; **zero re-freeze** in the store-local arm, **one genuine re-freeze + a
   fourth-distinction finding** in the graph-routed arm; and **eight outstanding determinations** at
   the spec gate (`F-7`).
4. **Does a better solution exist?** **YES — and it is a simplification of the same idea, not a
   competitor:** **`D-1` = clone-on-return at EVERY depth, cycle-safe and prototype-safe, over a
   CLOSED read-surface set (the tier's own declared members, receipt included)**; **`D-2` = tier-4
   write surfaces are non-MCP-reachable BY CONSTRUCTION, and the write's legality is enforced where
   reachability is already enforced (`S1`'s invocation turn)** — with the write's refusal carried as a
   **channel token**. That reading needs **no** gate state in the store, **no** decision in `main`,
   **no** `GraphNodeFlag` widening, and **no** frozen-artifact change; it lands inside `S2`'s admitted
   scope. **It is offered as the recommendation — `Q-1`/`Q-2`/`Q-4` remain the architect's to rule.**

---

## 10. WHAT THIS PASS DID NOT DO

1. **No spec.** No `docs/specs/<unit>.md` is filed for `S2`; this file is a gate-1 record, and
   `docs/specs/secure-tier-generalization-review.md` — the earlier, **CLOSED** record for the same
   wave — is **not** overwritten, re-opened or superseded.
2. **No code, no test, no battery driver, no `S1` artifact.** Zero `src/**` bytes; the batteries'
   drivers (`tests/store-compliance-live.mjs`, `tests/secure-exclusion-live.mjs`) and
   `docs/specs/secure-exclusion.md` are **untouched**.
3. **No register, no red set, no leg.** Nothing is authored for a unit that is not started.
4. **No ledger move and no admission** (`RCA-8(f)`): `docs/decisions.md` receives **no ACTIVE row**
   from this pass — the proposed row text is drafted at **§11** and left for the architect; the
   `S2`/`S1` rows in `docs/next-steps.md` keep their as-filed status (the `S2` cell gains a **dated
   annotation only**).
5. **No re-run and no measurement of its own.** Every figure in §6 is **quoted with its owner**; this
   pass holds read/search/doc-write tools and ran nothing. The dosier digests are **cited, not
   re-verified** (§2.1's stated limit).
6. **No semantics decided.** The five questions are **put**, not answered; the `P-R3` annotation
   **cites** the mechanism finding rather than rewriting the cell.
7. **No fork-facing edit.** `docs/FORKER.md` is untouched; the `S2` row's `§4` obligation remains
   `S2`'s own to land.

---

## 11. THE **PROPOSED** `docs/decisions.md` ROW TEXT — drafted here, **for the architect** (`RCA-8(f)`)

> **THIS IS A PROPOSAL, NOT A ROW.** It is **not** written into `docs/decisions.md`. The architect
> admits rows; a pass may not. It is filed here so that admission is a copy, not a drafting job.

```
| **DECIDED: TIER-4 READS RETURN CLONES, AND TIER-4 WRITE SURFACES ARE ADMISSION-CONTROLLED BY THEIR REACHABLE SET — `D-1` · `D-2`, taken on the CLONE/WRITE amendment's gate-1 record (`BLOCKED-ON-SEMANTICS` at its first filing)** | 2026-10-__ | **THE ARCHITECT'S RULING, verbatim:** *"Data requests from the security do not return references to original data, they return clones to prevent external read/mutation by reference. Writes at runtime are permitted iff the MCP is blocked"*. **WHAT IT PINS (as filed, and as re-expressed by the ruling this row records):** **(1) `D-1` — EVERY tier-4 READ RETURNS A CLONE.** The discipline and the CLOSED read-surface set are the row's operative cells; the landed precedent is the export's `G4-F5` pin (a FRESH deep copy at every depth, cycle-safe, prototype-safe — `snapshotValue`, `src/renderer/store-core-graph.ts:362-388`). **The named contradiction the ruling resolves is `lastWriteReceipt()` (`src/main/security-store.ts:142-144`), which returns the SAME receipt object by identity — included in the set or expressly carved out.** `D-1` buys **identity-aliasing integrity**, and the bridge cannot witness its reference half (IPC structured-clones). **(2) `D-2` — TIER-4 WRITE LEGALITY IS CONDITIONAL ON THE MCP SERVER BEING BLOCKED.** The runtime half is IN SCOPE (settling `docs/pending.md` `§R` `P-R3`'s scope question; the `P-R3` parenthetical's `GraphNodeFlag`-widening arm is STALE — `A2`/`D-19`). The write refusal is a CHANNEL token (`D-GATE` clause (2)), never a second security token in the store's 16-member union; the decision is NOT `main`'s to take (`F-11`); and the enforcement site is the invocation turn where enforcement already lives (`S1`). **THE TWO CLAUSES LAND INSIDE `S2` `U-TIER4-ARBITRARY-STORAGE` — admitted 2026-10-05, NOT STARTED; the amendment adds NO ledger row (`NO-SPLIT`, `D-GP-SAD-5`).** **THE FIVE `must-fix` QUESTIONS THIS ROW ANSWERS, each in its own clause:** clone discipline · closed read-surface set · the structural-vs-predicate reading of `D-2` (with its decider) · write-legality's scope and implementation site · whether `D-1` binds boot-ingestion reads and `persist()`, and whether an unserializable write FAILs. |
```

**PLACEMENT NOTE (for the architect's admission pass, not a claim of this pass):** the `2026-10-05`
tier-4 rows were appended **at the end of the `## ACTIVE` row region**, immediately above
`_(none yet — decisions opened 2026-08-21.)``, so that no previously cited
`docs/decisions.md:<n>` anchor moves (`RCA-8(c)`). **This row belongs in the same region under the
same rule.**

---

**END OF RECORD.** The verdict: **`BLOCKED-ON-SEMANTICS`** — five `must-fix` questions attached
(§2.4), `9` conditional questions beside them, `0` unreconciled collision hits, decomposition
`NO-SPLIT`, `D-1` measured `COMPLIANT` / `D-2` measured `NON-COMPLIANT` by Family D at `78d1cce`.

**⟶ THE TRAILER ABOVE IS THE FIRST FILING'S CLOSE AND STANDS AS SUCH (`RCA-8(d)`). It is read TOGETHER WITH §12 below, which is AMENDMENT ONE and which governs where the two differ: the verdict is re-issued `APPROVE-WITH-CONDITIONS` (`§12.6`), `D-1`'s `COMPLIANT` reading is WIDENED by the full read surface (`§12.4.1` — one named gap), and Family D's `D-2 = NON-COMPLIANT` is restated in the structural reading's own terms (`§12.4.2`).**

---

## 12. AMENDMENT ONE — THE FIVE `must-fix` ANSWERS LAND, THEIR OBLIGATIONS ARE MEASURED, AND THE VERDICT IS RE-ISSUED (`2026-10-11`)

**HOW TO READ THIS SECTION (`RCA-8(d)`, ANNOTATE-BESIDE).** **No as-filed byte of `§1`–`§11` is rewritten, renumbered or deleted.** Where this section restates a clause, it **quotes** the as-filed form and states the change beside it. **Where `§12` contradicts an as-filed clause, `§12` governs** — the as-filed clause remains the first filing's record, quotable, and is never silently superseded. **This pass ran NOTHING (`RCA-12`)**: every figure below is the **measuring pass's own reading**, quoted with its instrument, its driver pin and its commit.

**THE INSTRUMENT AND PROVENANCE OF THIS AMENDMENT, STATED FIRST.** The **store-compliance live battery's Family E**, the **sixth round**, driver `tests/store-compliance-live.mjs` sha256 **`ad7bbb6639ef9b7ad0f2d8ffa3b2c2d64bb6d3e03d5579fa1929562c06647751`**, **`46` rows = `34 PASS / 11 FAIL / 1 MANUAL / 0 PARKED`**, exit **`1`**, **run twice pre-commit on the final bytes and once post-commit**, at commits **`f700aaf`** / **`742b848`**. The `§5.U` matrix remains **`8` U-rows** with `summary.total === 8` and `§6.1` machine-parses; the three new obligations are **folded onto the rows whose subjects already name them** (`U-1` + `E-2` `PASS→FAIL`, `U-2` + `E-1` `FAIL→FAIL`, `U-7` + `E-3` `PASS→FAIL`) and **no ninth subject was invented, merged or displaced** (`store-compliance-live-battery.md` `§9.6`). The record is `docs/specs/store-compliance-live-battery.md` `§9`; the three host defects the round filed are `docs/defects.md` `## OPEN` `SECURITY-STORE-UNREPRESENTABLE-SETTING-PERSISTS-AS-NULL` · `SECURITY-STORE-COMMITTED-RECEIPT-ON-A-DROPPED-VALUE` · `SECURITY-STORE-RECORD-ADVANCES-PAST-A-REFUSED-PERSIST`.

### 12.1 THE STATUS, IN THE FOUR PARTS THIS RECORD'S FORMAT REQUIRES

| Part | Content of THIS amendment |
| --- | --- |
| **status** | **Gate 1 for the CLONE/WRITE AMENDMENT — `DONE`, AMENDMENT ONE APPLIED `2026-10-11`.** **Verdict RE-ISSUED: `APPROVE-WITH-CONDITIONS`** (the delegable class; the spec gate still requires the architect's go-ahead — `AGENTS.md` item 10a). **No spec, no code, no test, no register, no red set, no leg, no admission, no ledger move.** |
| **what the proposal asks** | **UNCHANGED from `§1`:** `D-1` — every tier-4 READ returns a CLONE, never a reference (*"to prevent external read/mutation by reference"*); `D-2` — runtime tier-4 WRITES are permitted **iff** the MCP server is blocked. **WHAT CHANGED IS THAT BOTH CLAUSES NOW HAVE OPERATIVE READINGS**, supplied by the architect (`§12.2`) and restated at `§12.4`, with the **measured state beneath each**. |
| **feasibility verdict** | **`APPROVE-WITH-CONDITIONS`** — **every `must-fix` bar is discharged**, the reading is feasible on the present tree, and the residual is `9` `conditional` questions plus ONE new condition, **all of them spec-dischargeable or architect-named** (`§12.3`, `§12.6`). **Not `BLOCKED-ON-SEMANTICS`** (nothing architect-answerable-but-unanswered remains in the `must-fix` class); **not `FLAWED` / `REJECTED`** (the clauses are realisable and the tree is measurably fixable). |
| **gaps + costs / benefits** | **§12.4**'s three measured `NON-COMPLIANT` obligations · **§12.3**'s residual list with the E-2 condition's two readings and their consequences · **§12.6**'s two lists (what the SPEC must discharge / what is the ARCHITECT's) · **§12.8**'s three new findings. |

### 12.2 THE ANSWERS TABLE — **FILLED** (one row per `must-fix` question, with the answer, its date and the contract consequence)

**These are the architect's answers to the five questions `§2.4` put, quoted as they were issued.** **The date is `2026-10-11`** — the date the answers reached this record and the date the round that measured them was executed on them (the answers are quoted verbatim in the measuring driver's own Family-E header block). **No question's wording is changed: the questions stand at `§2.4` exactly as the first filing put them.**

| # | The question (short form, `§2.4`) | **THE ARCHITECT'S ANSWER** | Date | **THE CONTRACT CONSEQUENCE** |
| --- | --- | --- | --- | --- |
| **Q-1** | Is `D-2` a STRUCTURAL admission rule or a runtime PREDICATE — and if a predicate, which holder evaluates *"is the MCP blocked?"* at the write turn? | **STRUCTURAL — not a runtime predicate over MCP state.** *"The tier's write surfaces stay non-MCP-reachable; enforcement lives where enforcement already lives (the exclusion gate's invocation turn over the MCP transports)."* | **2026-10-11** | **The fork is CLOSED in favour of the fitting form this record recommended at `§3.3`/`§9`(4).** **Consequences, each named:** (a) **`§7 R1`'s SECOND-AUTHORITY risk is DISCHARGED BY FORM** — a structural clause needs **no runtime evaluator**, therefore **no gate state in the store** and **no decision in `main`**; `F-11`'s rule is not approached, and `§7 R2`'s unreachability stops being a defect and becomes the clause's **operative content**. (b) **The enforcement site is NAMED as the principle, not as new mechanism** — the exclusion gate's **invocation turn over the MCP transports** (the `D-GATE` clause (1) site, `S1`'s mandate) — so **`S1`'s file scope is not widened by this clause** and the refusal's epoch/transport duties stay `S1`'s. (c) **`§8 F-2` is REFRAMED, not deleted:** from *"`D-2` has no reachable evaluator"* to **"the reachability claim is the operative claim and must be PROVED"** — and the proof obligation is the battery's own **declared limit** (`SC-E-09`: *"the unlock is only reachable while the MCP is blocked"* is **not measured at any layer**). (d) **The answer's second half (answer (3)) adds a LOCK/ACCESS CONDITION the clause did not carry as filed** — *access is full only when the tier is unlocked and the MCP is blocked* — which is why the measured `SC-D-05`/`SC-D-07` FAILs are carried **beside** the structural reading rather than explained away by it (`§12.4.2`). |
| **Q-2** | What is the clone DISCIPLINE — a cycle-safe, prototype-safe **DEEP** copy (the `G4-F5`/`snapshotValue` precedent) or a **shallow** fresh copy (the landed `get()` shape)? | **DEEP — and JSON-safety is a SECOND, COUPLED requirement.** *"DEEP copy — and the store has to be JSON-safe anyway because it needs to store to file"*: a deep copy (**the landed cycle-safe, prototype-safe precedent is `snapshotValue`, `src/renderer/store-core-graph.ts:362-388`**) **AND any value the tier cannot persist as JSON must not be accepted.** | **2026-10-11** | **The discipline is CLOSED, and a NEW admission requirement is added in the same answer.** (a) **The clone is DEEP at every depth, cycle-safe (`seen` map) and prototype-safe (`Object.create(null)`)** — the landed `G4-F5` pin, exactly as this record named it at `§3.2`/`§9`(4). **The landed one-level spread at `security-store.ts:118-120` is therefore NOT the clause's discipline** and must be replaced; `§3.1`'s "the word *deep* is not landed" gap is closed by the answer. (b) **JSON-representability becomes an ADMISSION PREDICATE on the write path** — *"must not be accepted"* — which converts **`§8 F-5` from an inference into a landed obligation** and gives `store-core-graph.md` `§0` `A1` (`'serialize-failed'`) its tier-4 counterpart. (c) **The measured state is `NON-COMPLIANT` on this very clause** (`§12.4.1`: `0` refusals, `22` coerced/dropped under a `committed` receipt, `33` unrepresentable probes answering `committed`, one `Infinity` divergence). (d) **A JSON round-trip is NOT the implementation of either half** — it throws on cycles/BigInt, so the deep copy is the `snapshotValue` shape and the JSON-safety check is a **value-preservation test**, not a serialization. |
| **Q-3** | What is the CLOSED read-surface set `D-1` binds — and is `lastWriteReceipt()` in it or carved out? | **FULL ACCESS SURFACE — NO CARVE-OUT** — *"the read-surface set is the FULL access surface — no carve-out — and access is full only when the tier is unlocked and the MCP is blocked."* | **2026-10-11** | **`Q-3` is ANSWERED, and the answer REMOVES the carve-out arm this record had left open.** (a) **The set is every value-returning member of the tier** — the measured census is exactly **`["get","lastWriteReceipt","set"]`** — and **the member that returns the same object by identity (`lastWriteReceipt()`, `src/main/security-store.ts:142-144`) is IN the set**, so it is **not** carved out and is **a fix obligation, not an exemption**. (b) **`§8 F-1` therefore moves from "a landed contradiction to be resolved either way" to "a measured `NON-COMPLIANT` member with a one-line remedy and its own red row"** (`§12.8 F-11`). (c) **The answer's second half is a LOCK/ACCESS condition** — access is *full* only when **unlocked AND the MCP is blocked** — and it is the condition carried at `§12.3`'s new entry and at `SC-E-09`'s `CONDITION-1`. |
| **Q-4** | What is write-legality's SCOPE — boot ingestion only, or runtime — **and where does the runtime write path live** (the tier's own main-side holders, or graph-routed)? | **Runtime is IN SCOPE, and the terminal condition is COMMIT ⟺ PERSISTED.** *"The store has read/write access on unlock. A write is NOT treated as fully committed until it successfully saves to file."* | **2026-10-11** | (a) **The scope half is settled in the direction `P-R6`/`P-R3` had already read from the original ruling:** **runtime tier-4 writes are in scope**, and the boot-ingestion-only reading is refuted. (b) **The implementation-site half is settled in FORM by answer (1):** the write path is **not** graph-routed — it is the tier's own **`security-store`-local, name-keyed path** with the `main`-side handler as a **state supplier** — so the **store-local arm carries no re-freeze** (`§5`) and the widening arm stays stale. (c) **A NEW TERMINAL CONDITION IS ADDED TO THE WRITE PATH:** *not fully committed until it successfully saves to file* — which is **neither** of the two landed behaviours (the receipt is honest **and** the record advances) and which **forces the new condition** `SECURITY-STORE-RECORD-ADVANCES-PAST-A-REFUSED-PERSIST` onto this record (`§12.3`). **The answer does not say "roll back"; it says "not fully committed" — and that gap is exactly what the new condition names.** (d) **The measured state is `NON-COMPLIANT`** (`§12.4.2`). **⟶ FOLLOW-UP RULING, `2026-10-11` (`RCA-8(d)`: this answer row's as-filed bytes are KEPT VISIBLE and this clause is added beside them; the row's own wording governs where the two differ). **THE READING IS NAMED — (b), LIVE STATE EQUALS DURABLE STATE** (*"Live state equals durable state"*): a refused persist ROLLS THE RECORD BACK, so the gap this row's (c) named is CLOSED. The `§12.3` condition is therefore RESOLVED BY THE ARCHITECT — no longer spec-dischargeable by a declared default — and the spec's discharge item becomes a DECIDED CLAUSE rather than a declared default. The host change it implies sits in `S2`'s boundary (`src/main/security-store.ts`) and is CARRIED until that unit starts; **`S2` REMAINS NOT STARTABLE** behind `S1`'s DONE row and gate 10 (`§12.7`). **NO UNIT IS ADMITTED AND NO LEDGER COUNT MOVES (`RCA-8(f)`).** |
| **Q-5** | Does `D-1` bind the **boot-ingestion** reads and `persist()` — and does an **unrepresentable** tier-4 write FAIL? | **"See above" — (2)/(3)/(4) extend to the boot-ingestion reads and the persist path; an unrepresentable write must not be committed.** | **2026-10-11** | (a) **The SCOPE half is ANSWERED AFFIRMATIVELY:** the clone discipline, the full access surface **and** the commit⟺persisted condition **all bind the boot-ingestion reads and the persist path**, so the boot sequence's open→ingest→close→enable pass is **inside the clause** and `§2.4 Q-12`'s *"does a boot-ingestion read into a main-side holder bind?"* is **narrowed to the holder's own clone-of-clone question** (`§12.3`). (b) **The FAILURE half is answered in the same words:** an unrepresentable write **must not be committed** — which is the `E-1` obligation at **both** the live write and the persist path, and which the tree satisfies **nowhere** today. (c) **The one thing answer (5) does NOT decide is the refusal's FORM** — what the write answers when it refuses an unrepresentable value (`§12.3` `Q-6` residue). |

**THE STEP-0 RULE, RE-READ AGAINST THIS TABLE.** *"Any dossier row still `undefined-until-answered` (or any OPEN/OVERFLOW open-semantics entry) forbids the delegable verdict."* **On this table:** the **five** rows that were filed `undefined-until-answered` (`Q-1`…`Q-5`, §2.4's `must-fix` class) are **answered, each with its consequence**; the dossier's **own** eight rows were already `defined` (`§2.3`) and the ZERO-ROW EXEMPTION's ground is untouched by this amendment (`§2.2` — no externally-sourced identifier is introduced by the answers either: `deep copy`, `JSON-safe`, `full access surface`, `not fully committed` all resolve onto **landed** identifiers or onto the answered clauses themselves). **The `9` `conditional` questions are NOT in the forbidding class** — `§2.4` filed them as *"answerable at or after the spec gate; they do not block the gate"*, and **none of them is a `must-fix` item re-classified**. **So no item remains architect-answerable-but-unanswered, and `BLOCKED-ON-SEMANTICS` no longer stands.** **What replaces it is not `PROCEED`:** the residual is a **CONDITIONAL set with measurement behind it**, which is `APPROVE-WITH-CONDITIONS` (`§12.6`).

### 12.3 THE RESIDUAL OPEN-SEMANTICS LIST — the `9` `conditional` questions, re-phrased one line each, **plus the ONE condition the measurement forces**

**Count, stated plainly so it cannot be misread: `9` `conditional` questions + `1` NEW condition = `10` residual entries; `0` `must-fix` entries stand.** Each conditional is marked with **whether an answer NARROWED it** — narrowed is **not** closed, and **none is dropped**.

| # | The question, re-phrased in one line | Narrowed by which answer | Class |
| --- | --- | --- | --- |
| **Q-6** | **Which token answers an INADMISSIBLE write** — and, now that a *value* can be inadmissible (not only a *key*), is the refusal a **third closed receipt form** (e.g. `{status:'refused', reason:'unrepresentable-value'}`) or a `dropped:[…]` member on the committed receipt? | **answer (2)** makes the *value* axis exist; `D-GATE` clause (2) still pins the **channel-token route** | `conditional` → **spec-dischargeable by a declared default**, architect-namable |
| **Q-7** | **Does the write refusal stay OUTSIDE the store's closed 16-member union** — and does that hold for the **new value-axis refusal** as well, so no re-freeze of the union's annotation is owed? | **answer (2)** + `D-GATE` clause (2)'s `SecurityWriteReceipt` precedent | `conditional` → **spec-dischargeable by a declared default** |
| **Q-8** | **What is the enforcement site of the write condition now that it is STRUCTURAL** — and, since the clause has no runtime evaluator, **what MEASURES "the unlock is only reachable while the MCP is blocked"?** | **answer (1)** names the principle (the invocation turn over the MCP transports); **the proof obligation is unmeasured** (`SC-E-09`'s declared limit) | `conditional` → **the spec must either discharge it at its own layer or decline it in writing** |
| **Q-9** | **Does `S1`'s transition set gain a WRITE arm** — must the exclusion transition do anything about a tier-4 write in flight, or is the write-vs-transition race observable only at the channel? | **none** — `S1`'s contract is untouched by the answers; `SC-D-08` is still `MANUAL` (a withheld claim) | `conditional` → **the architect's (it is `S1`'s contract)** |
| **Q-10** | **What is `D-2`'s BOOT TERMINAL** — the stored pair *tier open + MCP disabled* is a pair `D-GATE` clause (1) calls **illegal**, so how does the structural rule read the boot sequence's close-before-enable? | **answers (1)/(3)** read the pair as a **reachability property**, not a stored pair — the narrowing is real but not a resolution | `conditional` → **the architect's** |
| **Q-11** | **Who holds the re-freeze arm**, and may the *"return to MCP enabled"* transition leave a tier-4 write admitted (the measured `SC-D-07`)? | **answer (1)** makes the widening arm **structurally stale** (`§5`), so the re-freeze arm is now **named as unnecessary rather than ruled on** | `conditional` → **the architect's** |
| **Q-12** | **Does `D-1` bind a boot-ingestion read into a main-side holder** (a value that then lives in the caller), and must such a holder be a **clone of the clone**? | **answer (5)** binds the boot-ingestion reads — so the *whether* is answered; **the holder's own depth obligation is not** | `conditional` → **the spec must name it (it is the tier's own ingestion contract)** |
| **Q-13** | **Are the tier's OWN minted records (the receipt, the post-state record) exempt from clone-on-return** — or is the store's internal holder bound too? | **answer (3)** — *no carve-out* — resolves the **return** half (the receipt IS in the set); **the internal-holder half is stated for the first time here** | `conditional` → **the spec must name it** |
| **Q-14** | **Is the legal-state write observably UNCHANGED** — so that a permitted write carries a success receipt indistinguishable from today's? | **`SC-D-06` measured `PASS`** (the legal-state write commits and lands) — the measurement answers the behaviour; **the receipt's new JSON-safety form** re-opens it | `conditional` → **the spec must re-state it beside `SC-D-06`** |

**THE NEW CONDITION THE MEASUREMENT FORCES — ONE ENTRY, `CONDITION` (NOT A BLOCKER), WITH BOTH READINGS NAMED AND NEITHER CHOSEN:**

**⟶ RESOLVED BY THE ARCHITECT — ANNOTATED BESIDE `2026-10-11` (`RCA-8(d)`: the condition entry, its two-reading table and every as-filed byte below stand UNCHANGED; this paragraph is INSERTED beside them and GOVERNS the reading).** **THE ANSWER, in full and verbatim: *"Live state equals durable state"* — READING **(b)**.** **SO, FIVE CONSEQUENCES:** **(1) THE CONDITION IS RESOLVED BY THE ARCHITECT ON THE DATE OF THIS PASS** — it is NOT discharged as a spec-declared default, and the recommended-default sentence in the paragraph below is **SUPERSEDED IN EFFECT while its bytes stand**. **(2) THE SPEC'S DISCHARGE ITEM THAT CARRIED IT BECOMES A DECIDED CLAUSE — A NAMED ANSWER**, no longer a declared default and no longer `C-A1`'s to name. **(3) THE HOST CHANGE IT IMPLIES SITS IN `S2`'s BOUNDARY — `src/main/security-store.ts`** (the `current` assignment moves AFTER a SUCCESSFUL `persist()`, and a refusal returns the **PRE-WRITE** record, so the receipt and the tier agree) **— AND IS CARRIED UNTIL THAT UNIT STARTS.** **(4) `S2` IS STILL NOT STARTABLE: `S2` `U-TIER4-ARBITRARY-STORAGE` remains behind `S1` `U-SECURE-EXCLUSION`'s DONE ROW and its gate 10 (`§12.7`), and nothing in this ruling changes that ordering.** **(5) NO UNIT IS ADMITTED AND NO LEDGER COUNT MOVES (`RCA-8(f)`)** — this annotation rewrites no as-filed byte, re-grains no register, moves no verdict and re-runs nothing. **THE MEASUREMENT THE RULING ANSWERS IS THE ONE ALREADY FILED BENEATH THIS ENTRY** (`SC-E-04`'s three unwritable paths, `SC-E-05`'s LIVE arm; driver `ad7bbb66…`, `46` rows = `34 PASS / 11 FAIL / 1 MANUAL`, exit `1`, commits `f700aaf`/`742b848`) — **cited, not re-measured.** **AND THE CLAUSE THIS READING SUPERSEDES IS NAMED EXACTLY: `docs/specs/store-security.md` `§2.1` item 2 — the in-memory-applies clause — which now carries its own dated `SUPERSEDED BY` note pointing at the decisions row's reading (b).**

> **`SECURITY-STORE-RECORD-ADVANCES-PAST-A-REFUSED-PERSIST`** (`docs/defects.md` `## OPEN`, filed `2026-10-11` by the Family E round, `SC-E-04` module / `SC-E-05` LIVE). **THE CONFLICT, IN THE ANSWER'S OWN WORDS:** answer (4) says *"a write is NOT treated as fully committed until it successfully saves to file"*; the tree **refuses in the receipt** (`{"status":"refused","reason":"write-failed"}`, measured at three unwritable paths and LIVE) **yet still ADVANCES the in-memory record** (`security-store.ts:138-139` assigns `current` **before** `persist()` runs), so the live read-back shows a value the file does not carry. **TWO READINGS ARE ADMISSIBLE; THIS RECORD NAMES THEM AND DECIDES NEITHER.**

| Reading | What it means, mechanically | Its consequences — the pane, a restart, and the documented clause |
| --- | --- | --- |
| **(a) APPLY-IN-MEMORY, NEVER REPORT COMMITTED** — *the tree's current shape*: the record advances, the receipt answers `refused`/`write-failed`, and answer (4) is read as a statement **about the RECEIPT alone** | `current` is assigned as it is today; the refusal is the receipt's; the failed `${path}.tmp` is removed (measured: `residualTmpEntries=[]`) | **The pane:** `syncConfig()` renders the tier's own (advanced) state, so the operator **sees a value that will not survive** — and because the pane's four handler bodies **read nothing** (`§8 F-4`, `secure-panels.ts:119`/`:124`/`:134`/`:143-144`), the refusal is **indistinguishable from a success at the operator's pane** unless the spec adds an observability rule. **A restart:** the advanced value is **silently lost** — the file never carried it, so the next boot reads the older record with **no data-loss signal**. **The documented clause:** `docs/specs/store-security.md` `§2.1` item 2 (*"the in-memory config still applies for this process lifetime"*, `:105`) **STANDS UNCHANGED**, and answer (4)'s word **"fully"** carries the whole reading. **Cost:** the tier keeps a degraded-mode behaviour whose divergence is visible only in the receipt the pane ignores. |
| **(b) LIVE STATE EQUALS DURABLE STATE** — a refused persist **ROLLS THE RECORD BACK** | `current` is assigned **only after** a successful `persist()`, and a refusal returns the **PREVIOUS** record (the receipt and the tier agree) | **The pane:** the rendered state is the **pre-write** state, so **no phantom value is ever shown** — at the price that the operator's action appears to do nothing unless the spec designs the refusal's signal (`F-4` again, and now it *must* be designed). **A restart:** **nothing is lost, because nothing was promised**; the durable state is the single authority. **The documented clause:** `docs/specs/store-security.md` `§2.1` item 2's **in-memory-applies sentence must be SUPERSEDED** (a dated annotate-beside, `RCA-8(d)`), because it documents exactly the discipline this reading forbids — **so this reading costs one provenance artifact, not just one code line.** **Cost:** a documented landed discipline is superseded, and the store loses its degraded-mode behaviour on a failed write. |

**WHY THIS IS A `CONDITION` AND NOT A BLOCKER — stated in the terms `§9` used for the five:** it is **answerable**, it is **not a question of meaning the record cannot derive**, and **both readings keep the proposal's substance**. It is carried **for the spec gate** because **answer (4) does not distinguish them** and **the tree satisfies neither in full**: the receipt is already honest (reading (a)'s first half) while the answer's word *"fully"* points at (b). **The two readings' cost is one documented clause in one direction and one refused-write signal in the other; neither costs a re-freeze, a ledger row, or the clause's intent.** **If the architect does not name the reading before the spec gate, the spec takes a DECLARED DEFAULT (recommended: (b), because it is the only reading under which the answer's sentence is true as written) and STATES ITS REVERSIBILITY** — the flip back to (a) moves **one assignment site** plus the supersession annotation, and moves **no** interface, no receipt shape and no ledger term.

### 12.4 `D-1` AND `D-2` RESTATED AS THE ARCHITECT'S NOW-OPERATIVE CLAUSES, WITH THE MEASURED STATE BENEATH EACH

#### 12.4.1 `D-1` — the clone clause, restated

> **`D-1` (operative):** **every tier-4 READ returns a DEEP, cycle-safe and prototype-safe clone of the tier's own state, never a reference — over the FULL read surface, with NO carve-out — and the same discipline binds the boot-ingestion reads and the persist path.** **Source of the operative words:** the architect's answers (2), (3) and (5) (`§12.2`); the landed precedent the answer names is **`snapshotValue`** (`src/renderer/store-core-graph.ts:362-388`: a `seen` map for cycles, `Object.create(null)` for prototypes, no depth bound — the `G4-F5` pin). **A COUPLED SECOND REQUIREMENT rides the same answer:** **any value the tier cannot persist as JSON must not be accepted** — i.e. the write path carries a **value-preservation admission test**, not a serialization.

**THE MEASURED STATE BENEATH `D-1`, from Family E (commits `f700aaf`/`742b848`, driver `ad7bbb66…`):**

| The obligation | The reading | Verdict |
| --- | --- | --- |
| **FULL-SURFACE CLONE IDENTITY (`E-3`, `SC-E-07`)** | The surface is **censused from the module's own object, never assumed**: `Object.keys(store)` = **`["get","lastWriteReceipt","set"]`** (the census is a term). **`get()` — DETACHED** (a fresh object **and** a fresh array: `sameObjectReturnedTwice=false`, `mutationVisible=false`, `enabledSameIdentity=false`). **`set(patch)`'s return — DETACHED.** **`lastWriteReceipt()` — `NON-COMPLIANT`: the SAME receipt object is handed back on every call (`sameObjectReturnedTwice=true`) and a holder's mutation is VISIBLE on the next read (`mutationVisible=true`)** — `src/main/security-store.ts:142-144`. | **`NON-COMPLIANT` — ONE NAMED GAP, and it is the only member that fails.** **The control `SC-E-08` PASSES in BOTH directions** (it does **not** fire on a subject that returns a fresh copy; it **does** fire on one that hands out a shared object), which is the direction the Family-D control set could not carry. **So `§6.1`'s `D-1 = COMPLIANT` is WIDENED, not overturned: it was true of two of the three members because it measured two of the three.** A spec that claims `D-1` green over the full surface today would be claiming a reading the instrument refutes. |
| **JSON-SAFETY (`E-1`, `SC-E-01`/`SC-E-02`)** | **48 module-layer probes = 16 values × the store's three patch members (`token` / `maxJournalLength` / `groups`), each read THREE ways** — the receipt, the in-memory read afterwards, and **the file's own bytes**. **The tree REFUSES nothing.** **22 values are silently COERCED/DROPPED by the patch boundary while the receipt still reads `{"status":"committed"}`** (`BigInt`, a cyclic object, `function`, `Symbol`, `Map`, `Set`, `Date`, `NaN`, `-Infinity`). **`undefined` is IGNORED** (the undefined-marker semantics keep the prior value, and the write still answers `committed`). **Every `groups` element is silently filtered.** **Exactly ONE value COMMITS WITH A DIVERGENCE — `Infinity` as `maxJournalLength`: it enters the record as `<Infinity>` and the file's bytes carry `null`.** **Only a NON-OBJECT patch throws** (`set(null)` → `TypeError`, recorded **outside `set()`'s declared domain** and not charged). **ALL 33 unrepresentable probes answer `{"status":"committed"}`.** The live bridge arm (`SC-E-02`, 9 values, each required to have **transported** its payload first) **reproduces the `Infinity` divergence through the app's own channel**; **`function` and `Symbol` CANNOT cross `structuredClone`** (`DataCloneError`, demonstrated in the page) and are therefore **`[B]`-only**. | **`NON-COMPLIANT` on all three named terms** (`t1` no unrepresentable value is committed · `t2` no committed receipt for an unrepresentable value · `t3` no in-memory-versus-file divergence — all `false`). **Controls PASS:** a JSON-safe write of the SAME shape **commits and lands at both layers** (`SC-E-03`), the survivability predicate equals its **pinned 16-value table on `16/16`**, and **deleting the value-preservation conjunct flips five values** (`Map`/`Set`/`Date`/`NaN`/`Infinity`/`-Infinity` class) to "survivable" — so the readings are **not a dead instrument**. |
| **THE SURFACE CENSUS TERM** | `["get","lastWriteReceipt","set"]` — a fourth member would redden the row. | **Holds at the measurement.** |

**WHAT `D-1` KEEPS FROM THE FIRST FILING, stated so nothing is over-read.** `§3.2`'s framing stands **unchanged and now measured**: **`D-1` buys identity-aliasing integrity, not confidentiality** — the bridge cannot witness the reference half, because the value has **already** crossed an IPC boundary and been structured-cloned (`§8 F-6`; the battery declares the same limit in `SC-D-03`'s own subject). **A spec that claims a LIVE green for the reference half would be claiming a reading no instrument in this repo can take.**

#### 12.4.2 `D-2` — the write clause, restated in the STRUCTURAL reading's own terms

> **`D-2` (operative):** **tier-4 WRITE SURFACES stay NON-MCP-REACHABLE BY CONSTRUCTION — the condition is STRUCTURAL, not a runtime predicate over MCP state — and the enforcement that remains lives at the exclusion gate's INVOCATION TURN over the MCP transports.** **Access is FULL only when the tier is UNLOCKED and the MCP is BLOCKED.** **Runtime writes are IN SCOPE (the boot-ingestion-only reading is refuted), and a write is NOT treated as fully committed until it successfully saves to file.** **Source of the operative words:** the architect's answers (1), (3) and (4) (`§12.2`); the enforcement-site principle is `D-GATE` clause (1)'s **invocation turn** (`docs/decisions.md`, cited by row name), and the site has **no store state and no `main`-side decision** (`F-11`'s standing rule).

**THE MEASURED STATE BENEATH `D-2`, from Family D and Family E:**

| The obligation | The reading | Verdict |
| --- | --- | --- |
| **THE WRITE CONDITION IS ABSENT (`SC-D-05`/`SC-D-07`)** | **`SC-D-05` — MCP ENABLED, the forbidden state, tier CLOSED:** the state read **from the app** is `exclusion="mcp-enabled"`; the write's whole response carries `"write":{"status":"committed"}`; the file's sha256 moves **`e2758229… → 4d7c0bd5…`** with `maxJournalLength 44 → 42` and `bytesLanded=true`. **`SC-D-07` — after the operator's RETURN:** `setExclusion('mcp-enabled')` → `{"applied":true,"state":"mcp-enabled"}`, and **the SAME write answers `committed` AGAIN** (`a675446c… → e2758229…`, `43 → 44`). **`SC-D-06` — MCP DISABLED, the one legal state: `PASS`** (`4d7c0bd5… → a675446c…`, `42 → 43`) — the non-vacuity proof that the write path really works. **`SC-D-08` — the write-vs-transition race: `MANUAL`, a WITHHELD claim**, with its reason at the row. | **The conditionality is ABSENT, not merely inverted** — the write is admitted in **both** forbidden states **and** in the one legal state. **NOW STATED IN THE STRUCTURAL READING'S OWN TERMS (`SC-E-09`, `PASS`, a `CONDITION` and not an arm):** the clause needs **no** evaluator at the write site, because under the structural reading the **LEGAL PAIRS are `{MCP-ENABLED, TIER-4-CLOSED}` / `{MCP-DISABLED, TIER-4-OPEN}`** and **CLOSED is a property of the write surface's REACHABILITY.** **Its facts are measured:** the tier module's CODE carries **no** lock/unlock/MCP/state member (a code-only census over 11 tokens in `src/main/security-store.ts` → `[]`), the live surface census is the three members, the MCP server's own bytes carry **none** of `IPC_SECURITY_SET`/`security.set`/`securityStore.set` (→ `[]`), and the live tool set is **SET-EQUAL** to the landed `ALL_TOOLS`; **the control can refuse** (the same census over a synthetic source that really carries such members finds **7**). **AND ITS DECLARED LIMIT IS KEPT VISIBLE:** *"the unlock is only reachable while the MCP is blocked"* is **NOT measured by that battery at any layer**. |
| **COMMIT ⟺ PERSISTED (`SC-E-04`/`SC-E-05`)** | **THE RECEIPT IS HONEST, THE TIER IS NOT.** On **three independent unwritable paths** (the parent is a regular **file**; the parent directory is **`0500`**; **the target path IS a directory**) a real `set({token, maxJournalLength})` answers **`{"status":"refused","reason":"write-failed"}`** — **but the in-memory record ADVANCES at all three** while the file carries nothing. **THE LIVE ARM IS DECISIVE AND IT RAN, so it is never `MANUAL`:** the scratch profile is seeded so that **`<profile>/provident-security.json` is a DIRECTORY before the boot**; **the app BOOTED**, the boot read fell back to the default record, **the app's own MCP surface answered**, a **REAL OPERATOR WRITE** returned `{"status":"refused","reason":"write-failed"}`, and **the live read-back afterwards reads `{token:'E2-LIVE-OPERATOR-WRITE', maxJournalLength:55}`** while the on-disk write returned **`EISDIR`** and **no `.tmp` residue remained** (`residualTmpEntries=[]`). A **writable-path control (`SC-E-06`) PASSES** — so *"the receipt says refused"* is a statement about the **PATH**. | **`NON-COMPLIANT` on the record half; the receipt half holds.** `r1_theReceiptDoesNotClaimFullCommitment=TRUE` · **`r2_theRecordDoesNotAdvancePastARefusedPersist=FALSE`** · `r3_theFileIsUnmoved=TRUE`. **Cause, named at the bytes: `src/main/security-store.ts:138-139` assigns `current` BEFORE `persist()` runs.** **A CONTRACT DRIFT IS NAMED BESIDE THE READING, NOT USED TO EXPLAIN IT AWAY:** `docs/specs/store-security.md` `§2.1` item 2 (`:105`) **documents the in-memory-applies discipline** (*"the in-memory config still applies for this process lifetime"*), and **the answer's sentence was issued after that documentation** — which is exactly why the E-2 condition carries a **documented-clause cost** in one of its two readings (`§12.3`). |
| **NO `src/**` BYTE WAS TOUCHED BY THE MEASUREMENT** | The live arm changes **only the SHAPE of the path the app was told to persist to** (a scratch profile seeded before the boot). | **The measurement is admissible as a reading of the landed tree.** |

**THE TWO READINGS, KEPT VISIBLE AS A NAMED CONDITION (this record's `§12.3` entry, and the battery's own `§9.5` `CONDITION`).** **READING A — a lock-state rule at the store's own write site — is what `SC-D-05`/`SC-D-07` ASSERT**, and both rows are **still present and still `FAIL`**; **READING B — structural non-reachability, answer (1) — is the architect's operative reading**, whose facts the same battery measured and whose **proof obligation it declares unmeasured**. **The battery CHOOSES NEITHER AND DROPS NEITHER, and this record does the same:** the FAILs are **carried beside** the structural reading, never converted into a leak (the path is **not MCP-reachable** — `D-SCOPE`; `P-R6` is a **gate-of-scope** item), and **never dropped** (`SC-E-09`'s `c4` counts both).

### 12.5 THE CANDIDATE-PROPERTIES TABLE — WHAT THE SPEC WILL OWE (register rows, with provenance and status)

**This is the hand-off to `S2`'s spec gate: the properties the spec's register must carry, each with the authority it cites and whether it is `defined` or still `undefined-until-answered`.** **Provenance codes, as the task frames them: `A` = an architect ruling/answer · `S` = a landed site · `C` = code · `M` = a measurement.** **This pass authors NO register and NO row text for a unit that is not started (`§10` item 3 stands).**

| # | The property the spec owes | Provenance | Status |
| --- | --- | --- | --- |
| **`CP-1`** | **READ-CLONE IDENTITY — the detaching members.** For each of the tier's **fresh-copy** members (`get()`, `set(patch)`'s return), **what it hands back is a fresh object at every depth and every nested array is fresh too** (measured depth-complete today for the flat record), **so a holder's mutation of the return is NOT visible on the next read and does NOT reach the file.** The falsifier is the **shared-object control**; the non-vacuity term is that the write really lands. | **`A`** (answer 2's DEEP discipline) + **`S`** (`G4-F5`/`snapshotValue` precedent, `store-core-graph.ts:362-388`) + **`M`** (`SC-E-07`'s two rows; `SC-D-02a`'s two rounds; `SC-E-08` both directions) | **`defined`** — the requirement is closed by the answer, and the measured tree already satisfies it **for these members** |
| **`CP-2`** | **READ-CLONE IDENTITY — the FULL SURFACE, no carve-out (the named gap `F-1`).** **`lastWriteReceipt()` must stop returning the tier's own receipt object by identity** (`security-store.ts:142-144`): a holder's mutation of the return must not rewrite the tier's answer to its last write. **The remedy is a clone-on-return of the receipt, or the store holding no receipt it hands out.** | **`A`** (answer 3 — *no carve-out*) + **`C`** (`:142-144`, read at the bytes) + **`M`** (`SC-E-07`'s `sameObjectReturnedTwice=TRUE`, `mutationVisible=TRUE`; `SC-E-08`) | **`defined`** as a **requirement with a landed `NON-COMPLIANT` reading** — i.e. a **fix obligation with its own red row**, **not** a semantics gap. `§8 F-1` is superseded into this row (`§12.8 F-11`) |
| **`CP-3`** | **JSON-REPRESENTABILITY — a value the tier cannot persist as JSON is NOT ACCEPTED, and no committed receipt is issued for a discarded value.** Three terms, each its own row: **(i)** no unrepresentable value is committed; **(ii)** no `{"status":"committed"}` answers an unrepresentable value; **(iii)** the tier's own record and its file's bytes never disagree. **It binds the LIVE write AND the persist path** (answer 5), and it must **not** be implemented as a JSON round-trip (it would throw on cycles/`BigInt`). | **`A`** (answer 2's second half + answer 5) + **`C`** (`set()`'s total, silent coercion; `sanitize()`'s rebuild; a bare `JSON.stringify` inside `persist()`'s `catch`) + **`M`** (`SC-E-01` 48 probes, `SC-E-02` live, `SC-E-03` controls) | **`defined` in the REQUIREMENT; `undefined-until-answered` in the REFUSAL FORM** → the residue is **`Q-6`/`Q-7`** (`§12.3`), **spec-dischargeable by a declared default under `D-GATE` clause (2)** |
| **`CP-4`** | **COMMIT ⟺ PERSISTED — a write is not fully committed until it successfully saves to file.** The row must state **which of the two readings** it implements: **(a)** apply-in-memory but never report committed, or **(b)** the live state equals the durable state, so **a refused persist rolls the record back** — and, if (b), the **`store-security.md` `§2.1` item 2 supersession** it owes. | **`A`** (answer 4, verbatim) + **`C`** (`security-store.ts:138-139`, the assignment before `persist()`) + **`M`** (`SC-E-04`'s three unwritable paths; `SC-E-05`'s LIVE arm; `SC-E-06` control) | **`defined` as the requirement; `undefined-until-answered` as the READING** → **the new condition `SECURITY-STORE-RECORD-ADVANCES-PAST-A-REFUSED-PERSIST`** (`§12.3`): **a CONDITION, not a blocker**, spec-dischargeable by a **declared default with its stated reversibility** |
| **`CP-5`** | **LOCK/ACCESS CONDITION — the write surfaces are non-MCP-reachable BY CONSTRUCTION, and access is full only when the tier is UNLOCKED and the MCP is BLOCKED.** The row must state the **structural rule** and **what, at the spec's own layer, proves the second conjunct** — or **decline it in writing** as unmeasurable there. | **`A`** (answers 1 and 3) + **`S`** (`D-GATE` clause (1)'s invocation turn; `D-SCOPE`'s reachable set) + **`C`** (the tier module's code census → `[]`; the MCP server's bytes → `[]`) + **`M`** (`SC-E-09` `c1`–`c5`, with its **declared limit**; `SC-D-05`/`SC-D-07` both still `FAIL`) | **`defined` as the structural rule; `undefined-until-answered` as the PROOF OBLIGATION** → **`Q-8`'s residue** (`§12.3`); the spec must **either discharge it or decline it in writing** |

**ONE ROW THAT IS NOT A PROPERTY BUT A CONSTRAINT ON THE ROWS, carried here so the spec writer cannot miss it:** **the write refusal's OPERATOR OBSERVABILITY (`§8 F-4`)** — the pane's four handler bodies fire `s.set(...)` and **read nothing** (`secure-panels.ts:119`/`:124`/`:134`/`:143-144`), so **any** refusal the answers' obligations introduce is **invisible at the operator's pane** unless the spec says what the pane renders. **Provenance `C` + `M`; status `defined` as an obligation, `undefined-until-answered` in its shape; the SPEC must discharge it (it is the tier's own surface).**

### 12.6 THE VERDICT, RE-ISSUED (closed vocabulary)

> ## `APPROVE-WITH-CONDITIONS`

**ISSUED EXPLICITLY ON THE STATED GROUND: the five `must-fix` questions are ANSWERED (§12.2), so the STEP-0 bar they raised is discharged and `BLOCKED-ON-SEMANTICS` no longer stands.** **`PROCEED` is NOT issued** — the residual `9` `conditional` questions and the one NEW condition are **live conditions with measurement behind them**, and this record will not call a measured `NON-COMPLIANT` tree a clean pass. **`FLAWED` and `REJECTED` are NOT issued:** `D-1` is **realisable and measurably two-thirds satisfied**, `D-2`'s defect is a **missing admission rule on a non-MCP-reachable path**, and **neither clause requires new mechanism** (the store-local write path touches no frozen artifact — `§5`). **The first filing's verdict, quoted and kept: `BLOCKED-ON-SEMANTICS` at `§9` — that verdict is now SUPERSEDED IN EFFECT, never rewritten, and remains the record of the filing that had five open `must-fix` questions.**

**THE CONDITIONS — AND WHO DISCHARGES WHICH. THE SPLIT IS THE POINT OF THIS SECTION.**

**(A) THE **SPEC** MUST DISCHARGE THESE — each by a NAMED ANSWER, or by a DECLARED DEFAULT whose REVERSIBILITY IS WRITTEN DOWN (a spec may not leave one undefined, and may not invent semantics the architect owns):**

| # | The condition | Discharge allowed |
| --- | --- | --- |
| **`C-S1`** | **`CP-1` + `CP-2` — the read-clone identity contract over the FULL surface (`get`, `set`'s return, and `lastWriteReceipt`), at every depth, cycle-safe and prototype-safe, with the receipt's clone-on-return as its own row.** | **A NAMED ANSWER** — answers (2)/(3) supply it; the spec must not soften it, and must carry the receipt's red row (`F-1`/`CP-2`) |
| **`C-S2`** | **`CP-3` — the JSON-representability admission test with its refusal FORM.** The requirement is named; **the form is not** (`Q-6`/`Q-7`). | **A DECLARED DEFAULT** — the `D-GATE` clause (2) route (a **channel token / third closed receipt form**, `'write-failed'`'s own precedent) with the union-annotation consequence stated. **Reversible:** the form is additive to the response, no stored member moves, and `store-security.md` `§0A` item 3's closed-receipt annotation is the only clause to annotate |
| **`C-S3`** | **`CP-4` — the commit⟺persisted READING** (the E-2 condition), with the `store-security.md` `§2.1` item 2 supersession if reading (b) is taken. | **Architect-namable; otherwise a DECLARED DEFAULT with stated reversibility** — recommended **(b)** (live state equals durable state), because it is the only reading under which answer (4)'s sentence is true as written. **Reversible:** one assignment site + one supersession annotation; **no interface, no receipt shape, no ledger term moves** |
| **`C-S4`** | **`CP-5`'s PROOF OBLIGATION** — what, at the spec's layer, shows *"the unlock is only reachable while the MCP is blocked"*, or a **written decline** of it as unmeasurable there. | **A NAMED ANSWER or a DECLARED DECLINE** — the battery's own declared limit (`SC-E-09`) is the precedent for declining honestly rather than asserting |
| **`C-S5`** | **`§8 F-4`'s operator observability** — what the pane renders when a write is refused (four call sites read nothing today). | **A NAMED ANSWER** — the tier's own surface; the spec must decide it, because **every** refusal the answers introduce is otherwise a silent no-op |
| **`C-S6`** | **The BOOT-INGESTION holder obligation (`Q-12`/`Q-13`'s residue)** — the depth obligation of a main-side holder read at boot, and whether the tier's own internal holder is bound. | **A NAMED ANSWER** — answer (5) extends the discipline to the boot reads; the holder's own depth obligation is the spec's to state |

**(B) THE **ARCHITECT** OWNS THESE — a pass may not decide them, and this record does not:**

| # | The condition | Why it is the architect's |
| --- | --- | --- |
| **`C-A1`** | **The E-2 condition's reading (a) vs (b)** (`§12.3`) — if unnamed, the spec's declared default (`C-S3`) stands and is reversible | The answer's own sentence is the ambiguity; only its author can resolve which half it meant |
| **`C-A2`** | **`Q-6`/`Q-7`'s refusal token form and its union/annotation consequence** | `D-GATE` clause (2) names the route but not the form; a second security token in the closed 16-member union is a **collision finding** and only the architect admits a union change |
| **`C-A3`** | **`Q-9` — whether `S1`'s transition set gains a WRITE arm** | **It is `S1`'s contract** (`docs/specs/secure-exclusion.md`), its artifacts are **off-limits to this pass**, and `SC-D-08` remains `MANUAL` |
| **`C-A4`** | **`Q-10` — `D-2`'s boot terminal** (the stored illegal pair read structurally) | It re-reads `D-GATE` clause (1)'s legal pairs; a pass may not re-read a ruling |
| **`C-A5`** | **`Q-11` — the re-freeze arm and the *"return to MCP enabled"* state** | The widening arm is now **structurally stale** (`§5`) but only the architect may rule that it is not owed |
| **`C-A6`** | **The `docs/decisions.md` ADMISSION of the answers as a row** (`RCA-8(f)`; the row TEXT is drafted at `§12.9`, updated to the answers) | **The architect admits rows, not a pass** |

**ON BALANCE — the four questions this record's format asks, re-answered on the amended evidence:**

1. **Is the proposal a good idea, on balance, given all three reviews?** **YES — MORE CLEARLY NOW THAN AT THE FIRST FILING.** `D-1` closes a real aliasing hole with a landed precedent and **is already two-thirds satisfied**; `D-2`'s intent is the one the architecture already implies (`D-SCOPE`), and **the structural reading removes the second-authority risk entirely** (no evaluator, no store state, no decision in `main`). The five answers also **settled `P-R3`'s scope question** and **made the widening arm stale**, which removes a re-freeze the park row had priced as required. **What the measurement adds is cost, not doubt:** three obligations are measurably `NON-COMPLIANT` on the present tree, and one of them (`E-2`) exposes a documented clause the answer contradicts.
2. **What needs to change?** **`D-2` is CONFIRMED in the structural form** (this record's own recommendation at `§3.3`/`§9`(4), now the architect's answer) — **no re-expression needed**. **`D-1` names its discipline (deep, cycle-safe, prototype-safe) and closes its surface set (no carve-out), which converts `F-1` into a fix obligation** — a one-line-class change with its own red row. **Two NEW obligations ride along and must be discharged:** JSON-representability as an admission test (`CP-3`) and commit⟺persisted (`CP-4`, whose reading is the one open fork). **Nothing in the proposal needs to be abandoned; the adaptations keep its substance and cost no re-freeze and no ledger row.**
3. **Costs and benefits?** **Benefits:** the tier's reads stop handing out live interiors the moment arbitrary data arrives; **tier-4 write-legality becomes a stated contract instead of an accident of which channel exists**; **`P-R3`'s scope question is answered** and **the `GraphNodeFlag`-widening/re-freeze arm is retired as stale**; and the exclusion gate's existing invocation-turn machinery is reused rather than duplicated. **Costs:** **one landed read member must change** (`CP-2`, `F-1`); **the write path gains a value-preservation admission test with a refusal whose FORM and whose OPERATOR SIGNAL must be designed** (`CP-3`, `F-4`); **one new terminal condition forces a reading choice that costs EITHER the pane's honesty OR a documented clause** (`CP-4`, the E-2 condition); **a live battery re-measure is owed at the unit's gate 6** (its `§6.2` audit is owed again over Family E — the ninth round, not run and not claimed); and **the spec gate opens with the `9` `conditional` questions plus `C-S1`…`C-S6`**, rather than with five `must-fix` blockers. **Zero re-freeze in the store-local arm; one genuine re-freeze plus a fourth-distinction finding only in the graph-routed arm, which the answers did not take.**
4. **Does a better solution exist?** **THE BETTER SOLUTION IS NOW THE ADOPTED ONE, WITH TWO ADDITIONS THIS RECORD RECOMMENDS.** The recommended shape stands as the architect's answers define it: **`D-1` = a deep, cycle-safe, prototype-safe clone-on-return over the full read-surface set, receipt included; `D-2` = tier-4 write surfaces non-MCP-reachable by construction, enforced where enforcement already lives (`S1`'s invocation turn)** — **no gate state in the store, no decision in `main`, no `GraphNodeFlag` widening, no frozen-artifact change.** **The two additions, offered as recommendations only:** **(i) implement JSON-safety as a VALUE-PRESERVATION TEST, never a JSON round-trip** — the round-trip throws on cycles/`BigInt` and cannot see a `Map`/`Set`/`Date` the way the predicate must, and the landed `snapshotValue`/`serializationFailureOf` shape is the precedent; **(ii) take reading (b) of the E-2 condition**, because it is the only reading under which *"not treated as fully committed until it successfully saves to file"* is true as written, and because a value the operator can see but cannot keep is the more expensive failure of the two. **Both additions cost one clause each and neither widens the diff.**

### 12.7 `S2` STARTABILITY — THE LINE THAT DOES NOT MOVE

**`S2` `U-TIER4-ARBITRARY-STORAGE` REMAINS NOT STARTABLE.** **The answer to `P-R3` does NOT unblock it: it only fixes the SHAPE its spec will take** (`§12.3`'s residual list, `§12.5`'s property table — the spec writer now knows what to write and not when to start). **The ordering anchor is unmoved and is restated here in the terms `§4` used:** `S2` stays behind **`S1` `U-SECURE-EXCLUSION`'s DONE ROW** and its **gate 10** (`docs/next-steps.md`'s `S2` cell: *"BLOCKED ON `S1`'s DONE ROW"*; `docs/pending.md` `§R` `P-R3`). **Starting it first would make the tier name-addressed while the gate that justifies it does not exist — a net security regression window — and nothing in the five answers changes that arithmetic.** **NO ADMISSION, NO LEDGER COUNT MOVES (`RCA-8(f)`)**: the ledger stays exactly as filed, no new row is minted, and this record's amendment moves **no** `DONE`/`OPEN` term.

### 12.8 THE ANNOTATIONS THIS AMENDMENT OWES — MADE IN THIS PASS (`RCA-8(d)`, annotate-beside)

1. **`docs/pending.md` `§R` `P-R3`** — a **SECOND** dated annotation recording that **the scope question is now ANSWERED** (runtime reads/writes **in scope**; the write path is the **store-local, name-keyed** path; **NO `GraphNodeFlag` widening** — the widening arm **stays stale**). **The row's own bytes and its FIRST annotation are untouched.**
2. **`docs/pending.md` `§R` `P-R6`** — a dated annotation recording that the **write path's gate-absence is now measured twice** (Family D's `SC-D-05`/`SC-D-07`, and Family E's re-measurement of the same path plus `SC-E-09`'s `c4` count), and that the **structural ruling** now stands beside the measurement — **with the battery's declared limit and both readings kept visible**. **The row's bytes and its owner are untouched.**
3. **`docs/next-steps.md`** — one anchored append recording the amended verdict, the Family E state and what remains; **the pre-existing bytes are verified present afterwards** (`RCA-8(d)`).
4. **This record** — the amendment banner above the status line, and `§12` itself.

**FINDINGS THIS AMENDMENT ADDS (numbered `F-10`…`F-12` and carried here; `§8`'s list is NOT renumbered and NOT rewritten).**

| # | Sev | Finding | Owner / carrier |
| --- | --- | --- | --- |
| **`F-10`** | **LOW — RECORD, not host** | **A CITATION TO A NON-EXISTENT LEDGER ROW.** The Family E block (`docs/specs/store-compliance-live-battery.md` `§9`'s Family-E cell) states the five answers are recorded at *"`docs/decisions.md`'s ACTIVE row `DATA-REQUESTS-RETURN-CLONES-AND-RUNTIME-WRITES-IFF-MCP-BLOCKED`"*. **MEASURED THIS PASS (read/search only):** a search of `docs/decisions.md` for that row name, for `DATA-REQUESTS` / `REQUESTS-RETURN`, for `TIER-4`, for `ADMISSION-CONTROLLED` and for `IFF` returns **no such row** — the only copy of that row's text is **this record's `§11` proposed draft**. **Consequence, stated so it is not over-read:** the answers are **operative as the architect's answers** (and are quoted verbatim in the measuring driver's own header block), but they are **not yet ledger-recorded**, and the *"ACTIVE row"* wording is a **forward reference** at best. **A later pass must not cite that row name as if it existed.** | **The architect** — the ADMISSION of `§12.9`'s updated row text (`RCA-8(f)`); the **battery record's owner** for the wording of its own cell |
| **`F-11`** | **MED** | **`§8 F-1` IS NO LONGER AN OPEN EITHER/OR — IT IS A MEASURED GAP WITH ONE REMEDY.** Answer (3) removes the carve-out, and `SC-E-07` measures the third member `NON-COMPLIANT` (`lastWriteReceipt()` hands back the **same** object; a holder's mutation is **visible** on the next read, `security-store.ts:142-144`), with `SC-E-08`'s both-direction control making the detector attributable. | **The unit's spec gate** (`CP-2`'s row, `§12.5`), with its own red row; `§6.1`'s `COMPLIANT` reading is **widened, not overturned** |
| **`F-12`** | **LOW-MED** | **THREE NEW OBLIGATIONS ARE MEASURABLY `NON-COMPLIANT` ON THE PRESENT TREE, AND THE UNIT'S SPEC GATE MUST THEREFORE OPEN WITH `C-S1`…`C-S6` PLUS `C-A1`…`C-A6` (15 conditions), NOT WITH FIVE OPEN QUESTIONS.** Recorded so a spec writer is not surprised by the count, and so **no live green is claimed for any of the three** before its fix lands. **The `§6.2` audit is owed AGAIN — a NINTH round — over Family E** (the eighth, over Family D, is not discharged by the measuring pass). | The unit's spec gate; the audit owed to a **non-author** |

### 12.9 THE **PROPOSED** `docs/decisions.md` ROW TEXT — **UPDATED TO THE ANSWERS** (still drafted here, still the architect's to admit; `RCA-8(f)`)

**THE FIRST FILING'S DRAFT AT `§11` STANDS AS FILED AND IS NOT REWRITTEN. THIS IS ITS UPDATED FORM**, carrying (i) the five answers, (ii) the re-issued verdict, and (iii) the measured state that now grounds the row — so that admission is a copy, not a drafting job. **It is NOT written into `docs/decisions.md` by this pass.**

```
| **DECIDED: TIER-4 READS RETURN DEEP CLONES OVER THE FULL READ SURFACE, AND TIER-4 WRITE SURFACES ARE ADMISSION-CONTROLLED BY THEIR REACHABLE SET — `D-1` · `D-2`, TAKEN ON THE CLONE/WRITE AMENDMENT'S GATE-1 RECORD AT ITS AMENDED VERDICT (`APPROVE-WITH-CONDITIONS`)** | 2026-10-__ | **THE ARCHITECT'S RULING, verbatim:** *"Data requests from the security do not return references to original data, they return clones to prevent external read/mutation by reference. Writes at runtime are permitted iff the MCP is blocked"*. **THE FIVE ANSWERS ON WHICH THIS ROW RESTS, verbatim in substance (issued 2026-10-11, gate-1 record `docs/specs/tier4-clone-and-write-gate-review.md` `§12.2`, measured by the store-compliance battery's Family E — `E-1`/`E-2`/`E-3` ALL `NON-COMPLIANT`, driver `ad7bbb66…`, `46` rows = `34 PASS / 11 FAIL / 1 MANUAL`, commits `f700aaf`/`742b848`):** **(1) `D-2` IS STRUCTURAL — not a runtime predicate over MCP state; the tier's write surfaces stay non-MCP-reachable and enforcement lives at the exclusion gate's invocation turn over the MCP transports.** **(2) THE CLONE DISCIPLINE IS A DEEP COPY** (the landed cycle-safe, prototype-safe precedent is `snapshotValue`, `src/renderer/store-core-graph.ts:362-388`) **AND any value the tier cannot persist as JSON MUST NOT BE ACCEPTED.** **(3) THE READ-SURFACE SET IS THE FULL ACCESS SURFACE — NO CARVE-OUT — and access is full only when the tier is UNLOCKED and the MCP is BLOCKED.** **(4) A WRITE IS NOT TREATED AS FULLY COMMITTED UNTIL IT SUCCESSFULLY SAVES TO FILE.** **(5) "See above" — (2)/(3)/(4) EXTEND TO THE BOOT-INGESTION READS AND THE PERSIST PATH, and an unrepresentable write must not be committed.** **WHAT IT PINS:** the runtime write half is IN SCOPE and the `P-R3` scope question is ANSWERED (**the `GraphNodeFlag`-widening arm is STALE — `A2`/`D-19`**; the write path is `security-store`-LOCAL, name-keyed, with the `main`-side handler as a STATE SUPPLIER, and touches NO frozen artifact); the write refusal rides the **CHANNEL token** route (`D-GATE` clause (2)), never a second token in the store's 16-member union; and the decision is **NOT `main`'s to take** (`F-11`). **THE CLAUSES LAND INSIDE `S2` `U-TIER4-ARBITRARY-STORAGE` (admitted 2026-10-05, NOT STARTED; the amendment adds NO ledger row — `NO-SPLIT`, `D-GP-SAD-5`).** **THE CONDITIONS, NAMED: the SPEC owes the read-clone identity contract over the full surface (incl. `lastWriteReceipt()`), the JSON-representability refusal's FORM, the commit⟺persisted READING (+ the `store-security.md` `§2.1` item 2 supersession if the roll-back reading is taken), the lock/access proof obligation, the refusal's operator observability (`F-4`) and the boot-ingestion holder obligation; the ARCHITECT still owes the E-2 reading, the refusal token's form, `D-2`'s boot terminal, the re-freeze arm, `S1`'s write arm and this admission.** |
```

**PLACEMENT NOTE (unchanged from `§11`, restated so it is not lost):** the `2026-10-05` tier-4 rows were appended **at the end of the `## ACTIVE` row region**, immediately above `_(none yet — decisions opened 2026-08-21.)`; this row belongs in the **same** region under the same rule, so **no previously cited `docs/decisions.md:<n>` anchor moves** (`RCA-8(c)`). **AND THE `F-10` CHECK APPLIES TO IT:** the row this amendment's measuring record cites as *ACTIVE* does **not** exist at the bytes; **a later pass must not read that citation as an admission.**

**⟶ THE ADMISSION IS MADE AND `F-10` CLOSES — ANNOTATED BESIDE `2026-10-11` (`RCA-8(f)`; `RCA-8(d)`: this paragraph is an INSERTION between `§12.9` and `§12.10`, and no as-filed byte of `§1`–`§12.9` is rewritten, renumbered or deleted).** **THE ROW DRAFTED ABOVE HAS LANDED.** It now sits in `docs/decisions.md`'s `## ACTIVE` region, **appended at the end of that region immediately above the `_(none yet — decisions opened 2026-08-21.)_` line** — the placement rule `§11` and the note above name, so **no previously cited `docs/decisions.md:<n>` anchor moves** (`RCA-8(c)`) — under the name **`TIER-4 READS RETURN DEEP CLONES OVER THE FULL READ SURFACE, AND TIER-4 WRITE SURFACES ARE ADMISSION-CONTROLLED BY THEIR REACHABLE SET — D-1 · D-2, TAKEN ON THE CLONE/WRITE AMENDMENT'S GATE-1 RECORD AT ITS AMENDED VERDICT (APPROVE-WITH-CONDITIONS)`**, dated **`2026-10-11`** — this draft's `2026-10-__` placeholder landed with its date. **HOW THE LANDED CELL RELATES TO THIS DRAFT, stated so nothing is over-read:** it follows this draft's own order and cells — the ruling verbatim, the five answers one line each, `WHAT IT PINS`, `WHAT IT DOES NOT DECIDE`, and the sources with their commits — and it **IS the row of record**; where the draft's tail carried a wording this pass could not read back byte-for-byte, the landed cell's wording governs and this draft remains the drafting record. **`F-10` CLOSES, AND ITS CONSEQUENCE IS THE ONE THE FINDING ASKED FOR:** the Family E block's citation of an ACTIVE row **`DATA-REQUESTS-RETURN-CLONES-AND-RUNTIME-WRITES-IFF-MCP-BLOCKED`** — a forward reference when this amendment filed it — **now resolves to that row**, which names that forward-reference name as its own; the ledger's operative name for the ruling is the one written above, and **the battery record's cell wording remains its owner's to reconcile** (this pass edits no byte of `docs/specs/store-compliance-live-battery.md`, and no byte of the driver). **NOTHING ELSE MOVES WITH THE ADMISSION:** `§12.2`'s answers, `§12.3`'s `9` `conditional` questions plus the E-2 condition, `§12.4`'s measured states, `§12.5`'s property table, `§12.6`'s `C-S1`…`C-S6` / `C-A1`…`C-A6` split and `§12.7`'s `S2` startability line **stand exactly as filed**; **`C-A6` — the admission itself — is the one condition this closes**, and **no other condition is discharged, softened or re-read** (the E-2 refused-persist reading, the write-refusal token, `S1`'s write arm and `D-2`'s boot terminal stay undecided, exactly as `§12.3`/`§12.6` carry them). **NO UNIT IS ADMITTED AND NO LEDGER COUNT MOVES (`RCA-8(f)`)** — `S2` `U-TIER4-ARBITRARY-STORAGE` keeps its as-filed status behind `S1`'s DONE row — and **this pass touched no `src/**` byte, no test, no battery driver and no `S1` artifact.**

**AND `§12.10` BELOW IS `§12`'s OWN ACCOUNT OF ITSELF — KEPT AS FILED, AND NOT CONTRADICTED HERE.** Its item 2's *"no ACTIVE row is written to `docs/decisions.md`"* is **true of that pass**; the row `§12.9` drafted **landed in the later admission pass this note records**, which is why item 2's sentence is read together with the paragraph above rather than against it.

### 12.10 WHAT **THIS** PASS DID NOT DO (addendum to `§10`, which stands for `§1`–`§11`)

1. **No spec, no code, no test, no battery driver, no `S1` artifact, no register, no red set, no leg.** No `src/**` byte and no `tests/**` byte was touched; **the three host defects the round filed stay OPEN in `docs/defects.md` and are NOT fixed here** (`docs/HANDOFF.md` owes **nothing** — none is a `provident-ssr` gap).
2. **No ledger move and no admission** (`RCA-8(f)`): **no ACTIVE row is written to `docs/decisions.md`**; `§11`'s draft stands and `§12.9`'s updated draft is **text in this record only**. The `S1`/`S2` rows in `docs/next-steps.md` keep their **as-filed status**, and the `S2` cell gains a **dated annotation only**.
3. **No re-run and no measurement of its own** (`RCA-12`): every Family E figure is **quoted with its owner, its driver pin and its commit**; this pass holds read/search/doc-write tools and **ran nothing**.
4. **No semantics decided.** The E-2 condition's reading is **named in both admissible forms and chosen in neither**; `Q-6`…`Q-14` are **re-phrased, not answered**; **the architect's answers themselves are quoted, never re-derived.**
5. **No as-filed byte rewritten.** The banner and `§12` are **insertions beside** `§1`–`§11` (`RCA-8(d)`); the trailer above remains the first filing's close.

---

**END OF AMENDMENT ONE.** The re-issued verdict: **`APPROVE-WITH-CONDITIONS`** — five `must-fix` answers landed and quoted with their contract consequences (§12.2), `9` `conditional` questions re-phrased plus ONE new condition with its two readings named and neither chosen (§12.3), `D-1`/`D-2` restated as the operative clauses with the measured state beneath each (§12.4), the register the spec will owe (§12.5), the conditions split between the SPEC's `C-S1`…`C-S6` and the ARCHITECT's `C-A1`…`C-A6` (§12.6), and `S2` **still NOT STARTABLE** behind `S1`'s DONE row and its gate 10 (§12.7). **Measured clause states: `D-1` full-surface clone — ONE NAMED GAP (`lastWriteReceipt()`) · JSON-safety — `NON-COMPLIANT` (`0` refusals, `22` coerced/dropped under a `committed` receipt, `33` unrepresentable probes `committed`, ONE `Infinity` divergence) · commit⟺persisted — `NON-COMPLIANT` (record advances past a refused persist, at three unwritable paths and LIVE).** The first filing's close remains as it was written.
