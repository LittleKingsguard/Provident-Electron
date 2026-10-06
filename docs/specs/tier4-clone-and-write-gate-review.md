# Gate-1 record — the CLONE/WRITE amendment to tier 4 (`D-1` the clone clause · `D-2` the write-`iff` clause)

**STATUS LINE.** **Gate 1 for the CLONE/WRITE AMENDMENT — `DONE`** · filed `2026-10-11` ·
**verdict `BLOCKED-ON-SEMANTICS`** (not delegable) · **the unit it serves is `S2`
`U-TIER4-ARBITRARY-STORAGE`, ADMITTED `2026-10-05` BUT NOT STARTED** · **NO LEDGER ROW MOVES**
(`RCA-8(f)`: the architect admits ROWS, not a pass — the ledger's `S2` row keeps its as-filed
status and this record does **not** move it) · the park rows are `docs/pending.md` `§R` **`P-R3`**
(amended beside, below) and **`P-R6`** (cross-referenced only) · the prior, **CLOSED** record for
the same wave is `docs/specs/secure-tier-generalization-review.md`, which this record **does not
re-open, does not overwrite and does not supersede**.

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
