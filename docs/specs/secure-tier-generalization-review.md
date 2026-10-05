# Gate-1 record — the tier-4 (`secure`) generalization: the RCA, the adoption dossier, the critique, and the change analysis

**STATUS LINE.** **Gate 1 for the tier-4 generalization PROPOSAL — `DONE`** · filed `2026-10-05` ·
**verdict at first filing `BLOCKED-ON-SEMANTICS`, verdict after the architect's rulings
`APPROVE-WITH-CONDITIONS`** · **NO UNIT ADMITTED** (`RCA-8(f)`: the architect admits ROWS, not a pass
— the ledger stays `30 DONE / 0 open` UNITS = `30`) · the park row is `docs/pending.md` `§R` · the
rulings record is `docs/decisions.md`'s `SECURE-TIER-IS-A-FILESTORE-PEER` +
`THE MCP SERVER AND THE SECURE TIER ARE MUTUALLY EXCLUSIVE…` + `THE TIER-4 GENERALIZATION IS SPLIT
PER UNIT`.

**WHAT THIS RECORD IS.** The architect asked two questions and issued one design statement. The
questions: **is the security store capable of arbitrary runtime storage or is it constrained to
predetermined fields**, and **an RCA of where the additional constraints came from**. The statement:
*"The only distinction between the security store behavior and the file store behavior should be
saving to different files, not permitting lower-tier copies, and the access control policies limiting
it from being readable by MCP-accessible methods. This includes arbitrary data storage. In practice
this was previously constrained by presenting the secure settings UI in a separate provident graph
that was not accessible from the MCP server. Proposed post-store implementation is to make the MCP
server and the security store access mutually exclusive…"* This record carries the resulting gate-1
artifacts: the **§1 answer** to the capability question, the **§2 STEP 0 dossier** and its snapshot,
the **§3 provenance RCA**, the **§4 critique summary**, the **§5 change analysis**, and the **§6
decomposition recommendation**. **It files NO spec for a unit, NO code, NO test, NO register and NO
leg**; it edits no `src/**` byte.

---

## 1. THE CAPABILITY ANSWER (the architect's first question)

**The tier is CONSTRAINED to predetermined fields — it cannot store arbitrary information at runtime.**
Verified in code, not read from prose:

| Evidence | What it shows |
| --- | --- |
| `src/main/security-store.ts:25-33` | The tier's whole API is `get()` · `set(patch)` · `lastWriteReceipt()`. **There is no name-addressed API at all** — `set` has no name parameter. |
| `security-store.ts:121-141` | `set()` admits exactly four patch members (`token`/`groups`/`disable`/`maxJournalLength`) and rebuilds `current` from exactly three (`:138`). **An unknown key is a SILENT DROP** — committed receipt, nothing persisted, no diagnostic. |
| `security-store.ts:37-46` | `sanitize()` reconstructs the same closed shape on load, so an unknown key already in the file is **discarded** and gone at the next write. |
| `src/renderer/store-core-graph.ts:922-923` (read) · `:1417` (write) · `:2277` (`subscribe`) · `:478-479` (construction load) · `:766` (`rootParts`) | The generic four-tier store refuses every `secure.*` name at `B-SECURE-GATE` **before parse, before the register, before traversal**. `resolve('secure.anything')` → a refusal record; `commit('secure.x', v)` → a refused receipt, no write. |
| `store-core-graph.ts:16`, `:255`, `:262`, `:524`, `:2299-2303` | No `secure` flag exists (`GraphNodeFlag = 'temp'\|'mem'\|'file'`), no durability rank, no `tiers.secure` handle; `holderOf` guards `token !== 'secure'`. |

**Empirical probe (6 rows, run and removed; tree left clean):** the file's `arbitaryBlob`/`extra` keys
did not survive a load; after a `set()`, a `"PRESERVE-ME"` key was absent from disk; `set({myNewField:'v'})`
left the file byte-identical. **The refusal is a WALL, not a doorway** — and that is the same fact as
"the generic surface can never store arbitrary data in tier 4."

**Extension cost, in one sentence:** a new tier-4 record is a **release-time** change —
`security-store.ts` (`set` type + `sanitize` + `get` + body), `src/shared/types.ts`, both bridge
declarations, the pane, plus new register rows — and a rebuild; **no runtime path exists.**

**One caveat, recorded as a carrying finding:** `VALID_GROUPS` (`security-store.ts:35`) admits `'module'`,
which is live (`secure-panels.ts:56-63`, `security.ts:3`), while the type comment at
`src/shared/types.ts:318` still lists four groups. A doc drift on a file the `G3` boundary froze
byte-identical — **a routed carry, not an in-unit fix** (finding `F-3` of the adversarial pass; owner:
the next pass touching `src/shared/**`).

---

## 2. THE STEP 0 ADOPTION DOSSIER — ITS SNAPSHOT AND ITS DISPOSITION

**Path:** `docs/specs/secure-tier-generalization-adoption-dossier.md` (filed this pass from the
gate-1 scratch artifact).

**Content-hash snapshot — TWO FIGURES, EACH NAMED, BECAUSE THE FILE WAS AMENDED AFTER FILING**
(`RCA-8(d)`: the amendment is an anchored append, and the pre-amendment bytes are intact):

| Figure | Value | What it is |
| --- | --- | --- |
| the **AS-FILED** snapshot (what gate 1 actually reviewed) | `sha256:744d7f1998e730427b3bd32a89ab07472a069e1370f4f18d3cf1a4059f20d350` | the 159-line artifact, **8 `undefined-until-answered` rows** — the state that produced `BLOCKED-ON-SEMANTICS`. |
| the **CURRENT** digest (operative) | `sha256:fb77037a1d045a45127549e7eff1be8af0155a21eb46b97202a2318fdc46ef03` | the same file **plus** `§5 THE ARCHITECT'S RULINGS` (the post-gate-1 amendment). **A reader quoting `744d7f19…` MUST also quote `§5`.** |

**Structure, as filed:** **8 identifier rows** (the ≤ 8 cap fully used, **no row dropped**) · a **13-hit
collision block** · a **6-item open-semantics list** · 4 explicit "what this dossier does not do"
statements. The zero-row exemption was **not** available and **not** claimed (the proposal adopts
externally-sourced vocabulary).

**THE OPEN ROWS AND THEIR DISPOSITION.** All **8** rows were `undefined-until-answered` at filing.
**All 8 are now `defined`** — three of them with their *mechanism* still owed to the unit's own spec
gate (an owed specification is not an open identifier). The row-by-row rulings table is the dossier's
`§5`; the substantive answers are `docs/decisions.md`'s three rows.

**THE COLLISION BLOCK — `13` hits, `0` unreconciled after the rulings.** The one hit the proposal **as
stated** did not discharge was `C-10` = `docs/specs/data-ownership-model-plan.md` `§2.3` row **2.4-12**,
which reads verbatim: *"`cfg: SecuritySettings` (the pane's snapshot) … **It must NOT be re-homed into
a generic store** — routing the security snapshot through the generic read would put `secure.*` inside
a fall-through structure and **widen `§6.4`'s channel by construction.**"* **Reconciled by `D-18`:**
the ruling takes the narrower reading the row itself supports — **the pane's `cfg` snapshot stays OUT of
the generic store**; the tier is opened for the app's **own subsystems at boot ingestion** (`D-19`),
never for the pane's snapshot path. **The row is NOT superseded and needs no RE-NAME REQUEST.**

**THE REFUSAL-TOKEN QUESTION (`C-2`/`F-6`) — RESOLVED CHEAPLY.** The exclusion's refusal rides the
`SecurityWriteReceipt` precedent (`security-store.ts:16-23`: `'write-failed'` is *deliberately* not a
store-union member). **The store's closed 16-member union stays `16`** — no union change, no re-freeze
on that account. A second security token added to the store's union is a collision finding.

**Two collisions carry standing CONDITIONS, recorded so the units inherit them:** `C-1`/`C-8` — the
exclusion state must be a **separate axis from `VALID_GROUPS`** (frozen at five,
`security.ts:138`/`security-store.ts:35`/`secure-panels.ts:56`); implementing "open the store" by
disabling groups or by adding a sixth member breaches `ci-ui-leg.md` `§0` prohibition 3 and `§3.5`
`SEAM-4`. `C-12` — the exclusion changes `main.ts` sites; the store's own single `B-SECURE-GATE`
**keeps the decision** and `main` supplies only **state** (`F-11`; a `secure.*` segment check written
in `main.ts` is a `P-7` second-authority finding).

---

## 3. THE PROVENANCE RCA (the architect's second question)

**The extra constraints are FOUR different things that later documents fused into one invariant.**
Every classification is dated and cited; the operative classification is the dossier's `§2` block and
the `docs/decisions.md` rulings row.

| # | The constraint | Classification | Dated citation | What it ACTUALLY protects |
| --- | --- | --- | --- | --- |
| **1** | `set(patch)`'s fixed member surface instead of a name-addressed `set(name, value)` | **ENGINE/STRUCTURAL** | `src/main/security-store.ts:27`, `:121`; `src/shared/types.ts:316-323`; the plan records it as the landed fact at `§1.1` store 4 (*"`get()`/`set(patch)` as they stand today"*) | **Nothing security-bearing.** The patch shape follows from a 3-field settings payload plus the pane's four fire-and-forget handler bodies (`secure-panels.ts:107-136`). **It is UI-shape, not policy** — and the proof it is not policy is that `set` has **no name parameter at all**, so the tier's own API cannot address a name either. |
| **2** | `sanitize()`'s closed-shape reconstruction | **ENGINE/STRUCTURAL** (robustness) | `security-store.ts:37-46`; the corrupt-file fallback `:53-61`; plan `§1.1` store 4 failure mode (1) | **A boot-read robustness rule**: a corrupt/partial file must not crash the app or smuggle an unexpected member into the config. **The wrong place to look for a data-shape policy.** |
| **3** | "the security tier is NOT in the fall-through" | **ARCHITECT-DECIDED** | the architect's own sentence, quoted in the plan `§3.8` opening (*"for the non-security caches…"*); landed at `store-core-graph.md` `§0` `A2` and `P-GR-IM-14` | **Genuinely load-bearing** — and it is about **reads**, not about the tier's payload. |
| **4** | the typed `secure.*` refusal (stronger than mere exclusion) | **DERIVED-BY-AGENT** | the plan's `§1.3` `R-4` + `§2.3` row `2.4-12` + `§3.8`'s three forbidden reads; `store-core-graph.md` `§2.5` items 1/2; frozen at `G1` | Your exclusion, **re-encoded one step stronger**. It is what makes "not in the fall-through" *a testable row* — but it also converted a **read-scope** rule into a **name-and-shape** wall. |
| **5** | "manual-UI-only by construction" (`mcp-endpoint.md` `§6.4`) | **DUAL-REGISTER — a design rule AND a post-hoc description in the SAME section** | the design paragraph at `:477-482` vs the **implementation-status block** at `:441-458`, headed *"Implementation status (2026-08-25): LANDED"* | The first is a stated rule; the second **appends** *"AND the pane lives in an isolated graph the MCP endpoints cannot read/dispatch"* to it — **a description of what landed, sharing a heading with the rule.** |
| **6** | the isolated-graph UI constraint (`secure-panels.md` D1–D8) | **BOTH — and its FIRST-WRITTEN text says which dominates** | commit `b7a3332` (2026-08-25). The adopted spec's own purpose text: *"Prior to this adoption, the panes were hand-written HTML/DOM in `index.html` … **violating the constraint**, AND they lived in the same trust domain as the app. This spec renders them as provident data in a SECOND, ISOLATED graph."* | **The move was made for the AGENTS.md UI-rendering constraint FIRST** (hand-written DOM was non-compliant); isolation is listed as **a property it achieves**, not as the purpose. Its own §4 then titles that property *"the security-critical acceptance criteria."* |
| **7** | the plan's `§2.3` row 2.4-12 / `§3.8`'s three forbidden reads / `§9` `Q-2` | **MIXED** — `Q-2` and the three forbidden reads are the **architect's** (`A-3`/`A-4`, `Q-2` recorded **ANSWERED**, not open); row 2.4-12 and the plan's exclusion wording are the **plan author's derived additions** carrying the architect's sentence | plan `:1063`, `:1133-1146`, `:3041-3051`; the rulings record in `docs/decisions.md` | **(1)/(2)** forbid **renderer-originated generic-surface access**; **(3)** is a **CARRIER** prohibition — *no tier-4 value in a graph node, a tool result, a resource or a notification payload*. |

### The RCA verdict

**The hypothesis is CONFIRMED, and the promotion is datable and documentation-side.** *"The
isolated-graph UI arrangement was an implementation detail that got re-read as a tier-4 access-control
invariant, and the store wave then re-encoded it as the `secure.*` typed refusal"* — the evidence
supports it on all three links:

1. **The arrangement was adopted for UI-rendering compliance** (`b7a3332`, 2026-08-25), with isolation
   as an achieved property.
2. **It was re-read as a security invariant** — same section, same date, two registers (`§6.4`), and
   then promoted into a §5 **absence** at `foundation-app-data-model.md` `A-7`, where a
   *deliberate-absence* ledger lists the isolated graph as a **warranting mechanism** beside the IPC
   channel.
3. **The store wave froze it as a name-negated typed refusal** at `G1` (`B-SECURE-GATE`, five sites),
   which is strictly stronger than what either the rule or the property requires.

**WHERE THE RCA SEPARATES CLEANLY — and this is the ruling's ground:**

- **Rows saying "tier 4 must hold no arbitrary data": NONE.** The closest is the plan's *"That file,
  that path and that value are the tier's whole content"* (`§1.1` store 4) — an **OBSERVATION about
  today, not a prohibition.**
- **Rows saying "a tier-4 value must not reach these carriers": `§3.8` (3), `store-security.md`
  `CURRENT STATE` item 6, `§6.4`'s isolation half.** **The architect's statement changes NOTHING about
  these** — it changes *data-shape*, and keeps *capability-access*.

**So the constraints split into: (a) genuinely load-bearing policy — the carrier prohibitions and the
capability-access rule — which MUST survive; and (b) incidental consequences of the pre-store
implementation — the closed three-member shape, the fixed patch surface, the name-negation as the
*only* enforcement — which the store change had silently promoted to invariants. The architect's
statement correctly re-separates them.**

---

## 4. THE CRITIQUE (gate-1 step 2) — SUMMARY AND ITS DISPOSITION

The read-only critique returned **`FLAWED`** (approaching `UNIMPLEMENTABLE-AS-STATED` on clause 2),
carrying a threat-model table and 17 findings. Its substantive objections and their dispositions:

| The objection | Disposition |
| --- | --- |
| **(HIGH)** The proposal trades **three** construction-level barriers (isolated graph, IPC direction, name-negated refusal) for **one stateful barrier** operated by the party the attack targets, and **enlarges the prize** (arbitrary secrets behind the same switch). | **PARTLY SUSTAINED, ADDRESSED BY `D-18`.** The ruling does **not** trade: **the gate is ADDED BESIDE the isolated graph**, so the barrier count is **four**, and the "operator socially induced to flip the switch" path — the one the graph actually closes — **stays closed**. The prize is **not** enlarged for the agent: `D-AGENT-SECRETS` puts tier 4 out of the agent's reach entirely. |
| **(HIGH)** No barrier/revocation semantics are specified; the HTTP transport is per-POST, and nothing abandons in-flight work on a gate patch. | **SUSTAINED — CARRIED AS A MANDATORY UNIT CONDITION.** `D-GATE` clause (1) requires the **invocation-turn** refusal, an **epoch + in-flight invalidation**, and **both transports**; the critique's own evidence (`mcp-server.ts:934`, `:1115-1158`, `:1103-1113`) is the unit's red set. |
| **(HIGH)** The "lower-tier copies" clause is either vacuous or **destructive** (under `C-1..C-5`, `commit('secure.settings.theme.token', v)` would clear `file.settings.theme.token` — writing a secret deletes a persistent setting). | **SUSTAINED — AND THIS IS EXACTLY WHY `D-CLAUSE-2` RULES THE RESTATEMENT READING.** The destructive arm is refused by ruling. |
| **(HIGH)** 15 landed rows are contradicted; several quote the proposal's own thesis back at it (notably row 2.4-12). | **PARTLY SUSTAINED — the count was the critique's own tally under the WIDEST reading (panes re-homed). `D-18` closes 2.4-12, `D-CLAUSE-2` closes `A2`/`P-GR-IM-14`, `D-SCOPE` closes the `A-7`/`§3.8` set by construction.** The remaining live cells are **amendments to be annotated BESIDE** at each unit's documentation half (`§6.4`'s two-register reading; D1–D8's re-labelling as defence-in-depth), **not supersessions**. |
| **(HIGH)** The central tension: the agentic use case needs an agent-held secret, and mutual exclusion forbids exactly that. | **SUSTAINED AS A REAL TENSION — AND DISSOLVED BY RULING, NOT BY A CARVE-OUT.** `D-AGENT-SECRETS`: the agent's data belongs to `mem`/`file`; the agent neither reads nor modifies API keys; the app token is handled by the handshake authenticating the agent to the app. |
| **(MED)** "Arbitrary data storage" has no declared subject for the policy (tier vs name vs channel); no registry decision. | **DEFINED BY RULINGS:** policy attaches to the **tier**, via the **tier's own API** (main-side, store-internal — not the graph register). Exact mechanism owed to the unit. |
| **(MED)** The closed payload shape is silently in scope; `sanitize()` drops unknown keys, so arbitrary keys would not round-trip. | **SUSTAINED AND RULED:** the shape is opened (ruling clause (5)) **and the `enabled`/`token`/`maxJournalLength` validation SURVIVES** — a general record validating nothing is inadmissible, because the live `SecurityGate` trusts that object. |
| **(MED)** The `E-2` re-freeze is undocumented; `store-security.md` `§2.4` item 3 calls any store-module edit a collision finding. | **CARRIED — AND AVOIDED FOR UNIT 1.** The gate touches **no** store byte; the re-freeze risk attaches to the tier-shape unit's **runtime-write** scope only (pending `P-R3`). |
| **(MED)** The live-battery obligation is unaddressed; the `G3` `STRUCTURAL` exemption does not hold for a unit adding a control. | **SUSTAINED — CARRIED AS `docs/pending.md` `§R` `P-R2`.** `user-flow-audit.md` `§7.1` limb A triggers; a `§5.U` matrix + `§6.1` report + `§6.2` audit are **mandatory** and **structurally** required (not parkable on availability). |
| **(MED)** The UI-rendering constraint and the isolation contract pull in opposite directions if the panes move. | **AVOIDED BY `D-18`.** The panes do not move. |
| **(MED)** The illegal persisted pair has no boot terminal. | **CLOSED BY `D-19`/`F-2`:** the boot sequence is open→ingest→close→enable, and `sanitize()`'s corrupt fallback makes a torn record indistinguishable from cold — so a torn exclusion record resolves to the **safe** pair. |
| **(MED)** `markReady()` is unconditional, so a disable path built on readiness is self-defeating; a sticky "MCP off" silently darkens the app's core purpose. | **CARRIED TO THE UNIT** (not a gate-1 blocker): the re-arm ownership and the off-state's observability are the unit's contract. `D-19` removes the sticky-risk for the tier by construction (the tier is closed at boot; only the *gate state* could be sticky, and the ruling leaves it **unpersisted**). |
| **(LOW)** The switch's state is legible from outside (the 401 oracle; disabled-vs-absent registration). | **CARRIED AS A LOW FINDING TO THE UNIT.** |
| **(LOW)** The fork-facing `K-9` exemption's *reason* is removed. | **CARRIED — and the tier-shape unit owes an explicit fork-facing statement** (`docs/FORKER.md`). |
| **(LOW)** Migration of `provident-security.json` is unaddressed; arbitrary data + no versioning + a fixed file census is an unsatisfiable triple. | **PARTLY CLOSED:** the file census is **unchanged** (one file, no third file). The versioning question is **owed to the unit** (the `store-security.md` `§2.2` item 4 no-`schemaVersion` clause is in the unit's diff scope). |

**THE CRITIQUE'S STRONGEST POINT, KEPT AND ANSWERED:** *"a switch is bypassable; a construction-level
unreachability is not."* **True — and the ruling does not choose between them.** The construction-level
unreachability (the isolated graph + the store's own refusal) **stays**, and the gate is an
**additional** enforcement for the path the construction never covered: **the app's own subsystems
reading tier 4 in the same process and realm as the MCP-accessible surface.**

---

## 5. THE CHANGE ANALYSIS (gate-1 step 4) — THE VERDICT AND THE CONTRACT CELLS

### 5.1 The verdict

**`BLOCKED-ON-SEMANTICS` at filing** (6 `undefined-until-answered` rows at the time of the first
reading, 6 open-semantics entries, 1 unreconciled collision hit) — the delegable verdicts were
**unavailable** and were not issued. **After the architect's rulings: `APPROVE-WITH-CONDITIONS`.** The
conditions are the standing ones named in `§2` (`C-1`/`C-8` separate axis; `C-12`/`F-11` decision-site)
plus the two ledger/ruling steps the architect owns (`RCA-8(f)`).

### 5.2 The cells that must move, and how (`amendment` vs `supersession` vs `re-freeze`)

| Cell | Exact text / location | Disposition |
| --- | --- | --- |
| `docs/specs/mcp-endpoint.md` `§6.4` | *"The settings surface is **manual-UI-only by construction** …"* (`:477-482`) + its implementation-status block (`:441-458`) | **AMENDMENT (annotate-beside)** — the two-register reading recorded; the clause is **strengthened**, not weakened, so no supersession. |
| `docs/specs/secure-panels.md` D1–D8 | *"Manual-UI-only by construction"*, *"No cross-graph addressability"* (`§2`, `§4`) | **AMENDMENT** — D1–D8 **STANDS**; re-labelled as defence-in-depth **beside** the gate. **NOT retired** (`D-18`). |
| `data-ownership-model-plan.md` `§2.3` row 2.4-12 | *"It must NOT be re-homed into a generic store…"* (`:1063`) | **NEITHER — IT STANDS.** `D-18` takes the reading the row supports; **no supersession needed.** |
| `store-core-graph.md` `§0` `A2` + `P-GR-IM-14` | *"`secure` IS A SEPARATE MAIN-SIDE COLLECTION OUTSIDE THIS ORDERING AND CARRIES NO GRAPH NODE"* | **STANDS UNMOVED** (`D-CLAUSE-2` is a restatement of it). |
| `store-core-graph.md` `§2.5` items 1/2 (the refusal + its precedence) | the `secure → malformed → undeclared → …` order | **AMENDMENT to be defined by the tier-shape unit** if arbitrary names are in scope; the **decision site stays the store's own** (`B-SECURE-GATE` unchanged as the ONE site). **Only the tie-break between "this name is refused" and "the tier is closed" is new.** |
| `store-core-graph.md` `§2.1`'s closed 16-member union | the union's annotation | **UNCHANGED at `16`** — the exclusion token is a **channel** token (`C-2`/`F-6`). |
| `docs/specs/store-security.md` `§1.3` item 1 / `§2.4` item 3 | *"The store module's bytes do NOT move in this unit"*; an edit is a collision finding | **SCOPED BY ITS OWN WORDS ("in this unit")** — a NEW unit may move them, but **not for free**: re-freeze + amendment row + seat/integration re-cycle. **AVOIDED for unit 1 entirely.** |
| the frozen surface artifact `store-core-module-store-core-graph-surface.md` | operative digest `sha256:29772ac7…`; executed file pins `0664c52f…` / `5c0c1a97…` | **A GENUINE RE-FREEZE — ONLY IF** the tier-shape unit's runtime-write scope is taken (`P-R3`). **Unit 1 touches no frozen artifact.** |
| `foundation-app-data-model.md` `§5` `A-7` | the absence *"No MCP-visible path to the operator's configuration"* | **AMENDMENT** — the gate **targets exactly `A-7`'s property**; its *warranting-mechanism* citation gains the gate beside the isolated graph. **No supersession.** |
| `docs/specs/ci-ui-leg.md` `§0` prohibitions 3/5 + `§3.5` `SEAM-4` | *"No policy defaults"*; *"No new MCP surface"*; the default group set unchanged | **STANDING CONDITIONS** (`C-1`/`C-8`): the exclusion state must be a **separate axis from `VALID_GROUPS`**; `ALL_TOOLS`/`RpcMethod` counts do not move; no new tool/resource/group. |
| `docs/decisions.md`'s ACTIVE store rows | `FOUNDATION-STORE-FACILITY-IS-OPENED…`, `FOUR-TIER-DATA-OWNERSHIP-MODEL`, `QUALIFIED-READ…`, `NEXT-SURVIVING-REPAIR…` | **UNMOVED.** The new rulings **extend** the model (tier 4's shape + its access control); the four-tier model's clauses are not contradicted. |
| `docs/FORKER.md` §4 | the store-facility block | **AMENDMENT at the tier-shape unit** — the fork-facing statement of tier 4's shape and the exclusion's consequences. |
| `docs/next-steps.md`'s `G1`/`G2`/`G3` DONE rows | the landing records | **UNMOVED this pass** — no count changes, no cell re-grain. |

### 5.3 The mutual-exclusion state machine, as the unit must specify it

**States.** Legal pairs: `{MCP-ENABLED, TIER-4-CLOSED}` and `{MCP-DISABLED, TIER-4-OPEN}`. The
**illegal pair is unreachable**. The state is **process-global** (not per-window, not per-realm).

**The transitions, and what each must guarantee** (the critique's 7 races, each with its disposition):

| # | The race | What the unit must pin |
| --- | --- | --- |
| 1 | **An MCP request in flight when the tier opens.** | An **epoch** stamped on accepted work; the transition **invalidates in-flight work** and every such call answers a **declared refusal token** — no third state (`RendererBackend.invoke`'s 60 000 ms `pending` is the red-set evidence, `mcp-server.ts:1115-1158`). |
| 2 | **A tier write in flight when MCP is enabled.** | The transition **waits for or refuses** a mid-write open; the landed two-holder divergence (`store-security.md` `§2.3` item 3) must **not** gain a third unordered holder. |
| 3 | **Two transports re-gated at different moments.** | `stdio` is re-gated in place (`applyGatePatch`, `:438`); **http is per-POST** (`:934`) — the **invocation-turn** check is what closes this, and it is mandatory (`D-GATE` clause (1)). |
| 4 | **An operator who never re-enables MCP.** | The gate state is **NOT persisted** (`D-19`): boot resolves to the **safe** pair, so the dark-agentic-surface failure cannot become sticky. The unit must still state the off-state's operator-visible signal. |
| 5 | **A crash between "disable MCP" and "open the tier".** | The **boot terminal is the safe pair** and is defined by `D-19`; a torn record is indistinguishable from cold (`security-store.ts:53-61`) and therefore resolves safe. |
| 6 | **A second window / realm.** | Declared **out of scope as a supported configuration**, or explicitly serialized; the security file is shared, so the unit must state which. (`UNVERIFIED-AS-YET`: whether this host can open a second `BrowserWindow` at all — no evidence found either way.) |
| 7 | **`markReady()` is unconditional.** | The unit must pin **who re-arms** the backend after a disable — a renderer-owned signal must not re-arm what the operator disabled (`mcp-server.ts:1093-1097`, `main.ts:430-433`). |

**Is the mutual exclusion STRONGER or WEAKER than the isolated graph it is added beside?** **Neither —
they close different paths, which is why both are kept.** The graph closes **reachability from the
MCP-visible app graph**. The gate closes **temporal co-availability in main**. **For the concrete
threat "an agent reads the operator's token":** the graph alone is obscurity (the token is one
`tiers` handle away from a generic read once a path exists); the **store's own refusal** is the strong
barrier; and the **gate is the enforcement that survives a future widening of the store's surface** —
which is precisely the change the architect is asking for.

### 5.4 Arbitrary storage — the structural questions, and which are settled

| Question | State |
| --- | --- |
| Where do arbitrary names live? | **SETTLED: store-internal, main-side** (`A-5`) — not the graph's declared registry. **Mechanism OWED to the unit.** |
| What is the durable format on disk? | **OWED to the unit.** Constraints that bind it: **one file** (no third persisted file — the exactly-two pin), the `sanitize()` validator **survives**, and the format must round-trip arbitrary keys (today it **silently discards** them — the capability finding). |
| How do arbitrary names interact with `hydrate(rows)`? | **SETTLED (`D-19`/`O-4`): they do not.** Tier 4 is consumed **at boot into main-side holders** and **never joins the graph**, so `hydrate` — which skips every non-`file` token by declaration (`store-core-graph.ts:2184-2196`, a frozen clause) — is **not widened and not touched.** |
| Does a caller name collide with `secure.*` / the refusal grammar? | **CARRIED to the unit's spec gate** — the tier's own names live in its own API, so the generic refusal grammar is untouched; the unit must state what a `secure.`-prefixed *tier-internal* name means. |
| Does `sanitize()`'s closed shape survive? | **PARTLY SETTLED:** the **shape is opened**; the **`enabled`/`token`/`maxJournalLength` validation SURVIVES** (ruling clause (5)). The exact validator is **owed**. |
| Does the tier gain `commit`/`subscribe`/`remove`/`clear`/`has`? | **SETTLED: it does not gain the generic store's member set** (`A-2`: it stays a main-side store with its own API, not a `tiers` handle). Which of its **own** members it gains is **owed**. |
| What does "no lower-tier copies" mean? | **SETTLED (`A-3`/`A-8`): the restatement reading.** No lower-tier alias exists; nothing is cleared; nothing is refused on account of a same-path copy; **there is no cross-tier interaction at all.** |

---

## 6. THE DECOMPOSITION RECOMMENDATION (`D-GP-SAD-5`, nine columns, keyed `decomposition`)

**Dispositioned on THIS record** (never inside a spec) and landed as the `docs/decisions.md` row
`THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`.

| # | Column | Content |
| --- | --- | --- |
| 1 | **`recommendation`** | **`SPLIT-RECOMMENDED` — TWO UNITS, IN ORDER, WITH A HARD STOP AFTER THE FIRST.** |
| 2 | **proposed fraction** | **`U-SECURE-EXCLUSION`** (the access-control gate, standing alone) → **then** **`U-TIER4-ARBITRARY-STORAGE`** (the tier's shape). |
| 3 | **boundary (named)** | **(i)** `U-SECURE-EXCLUSION` owns the exclusion **state machine** + its **enforcement sites**: `src/main/main.ts` (the boot gate construction `:86-90`, the `IPC_SECURITY_*` handler sites `:369-383`, the transport construction + `mcp.start()`), `src/main/security.ts` (`SecurityGate`), `src/main/mcp-server.ts` (`applyGatePatch` `:438`, the captured transport handles `:335-348`, the invocation-turn refusal, the per-POST http path `:934`), `src/main/preload.ts`, one channel constant, and **ONE** new operator control in `src/renderer/secure-panels.ts`; new contract `docs/specs/secure-exclusion.md`. **It touches NO frozen artifact and NO store byte — that is the boundary's decisive property.** **(ii)** `U-TIER4-ARBITRARY-STORAGE` owns the tier's shape: `src/main/security-store.ts` (`:25-33` the API, `:37-46` `sanitize()`'s fate, the persisted format), the boot **INGESTION** pass (open→read/cache→close per `D-19`), and the spec amendments (`mcp-endpoint.md` `§6.4`, `secure-panels.md`, `FORKER.md` §4). |
| 4 | **why the remainder is the coherent core** | **(i) is NOT the coherent core**: it is independently landable, independently falsifiable, and carries **no re-freeze** — the exclusion alone removes the specific guarantee that made tier 4 unreachable while touching nothing frozen. **(ii) IS the coherent core**: one contract about one tier's shape, whose sub-parts (the name mechanism, the persisted format, the validator's survival, the refusal-token home) all hang off the same decision and are **not independently delegable**. |
| 5 | **why not `NO-SPLIT`** | Merging them makes the gate's landing **contingent on a re-freeze the gate does not need**; `AGENTS.md` RCA-2/RCA-5 make *"a multi-unit deliverable split PER UNIT"* a hard gate; and the halves have **different red sets, different legs and different frozen-artifact exposure**. |
| 6 | **spec homes** | `docs/specs/secure-exclusion.md` (**new**, unit 1 — **OWED, not filed**) · a new `docs/specs/tier4-*.md` deriving `store-security.md` (unit 2), with `docs/specs/store-security.md` **staying the tier's provenance**. |
| 7 | **layer obligations** | **Unit 1:** `[H]` + `[T]` **+ `[U]` MANDATORY** — it adds a rendered control to `paneEnvelope()` (`secure-panels.ts:141-227`), so `user-flow-audit.md` `§7.1` **limb A TRIGGERS** and gate 6 becomes a live battery with a `§5.U` matrix + `§6.1` coverage report + `§6.2` audit. **The `G3` `STRUCTURAL` exemption does NOT hold here** (`store-security.md` `CURRENT STATE` item 8's condition — *"authors no rendered surface, no element, no text, no class and no slot content"* — is not satisfied). **Unit 2:** `[T]`-dominant; `[U]` **not** triggered unless the pane is touched. |
| 8 | **interaction with the ledger** | **`30 DONE / 0 open` UNITS = `30`, and this row ADMITS NOTHING.** `RCA-8(f)` holds — the architect admits ROWS, not a pass — so both units are **PROPOSALS** until the architect writes their ledger rows. The park is `docs/pending.md` `§R`. |
| 9 | **architect decision the fraction needs · positive revisit condition** | **Unit 1 needs:** the operator control's form, and the off-state's observability. Its persistence rule is **settled** (`D-19`: fail-safe, unpersisted). **Revisit if** the invocation-turn refusal proves insufficient for the HTTP transport. **Unit 2 needs:** **the `P-R3` scope ruling** — boot-ingestion reads alone (`D-19`; bounded, **no re-freeze**) **or also runtime name-addressed writes after boot** (**requires `GraphNodeFlag` widening + a genuine re-freeze + a seat/integration re-cycle**). **Revisit when** a consumer needs a tier-4 name the operator did not pre-declare. |

**A THIRD FRACTION WAS CONSIDERED AND NOT TAKEN — explicit `NO-SPLIT`, with its written reason.** A
`U-PANE-ISOLATION-AMENDMENT` (the D1–D8 re-labelling + the `§6.4`/`A-7` cross-reference re-points)
authors **no rendered surface, no element, no text, no class and no slot content**; it triggers **no**
`user-flow-audit.md` `§7.1` limb; and making it a unit would **add a ledger row for a documentation
pass**, which `RCA-8(f)`'s *"the architect admits ROWS, not a pass"* does not support. **It is folded
into unit 1's documentation half.**

**RISK / COST PER CANDIDATE UNIT.**

| Candidate unit | Files | Frozen artifacts | Gate 6 | MCP contract | Cost |
| --- | --- | --- | --- | --- | --- |
| **`U-SECURE-EXCLUSION`** | `main.ts`, `security.ts`, `mcp-server.ts`, `preload.ts`, one channel constant, one control in `secure-panels.ts` | **NONE touched** — the decisive advantage | **MANDATORY live battery** (`§5.U` + `§6.1` + `§6.2`) | `§6.4` amended; `ALL_TOOLS`/`RpcMethod` counts and `VALID_GROUPS` **unchanged** (standing conditions `C-1`/`C-8`) | **HIGH but bounded.** Two states, two transports, the in-flight rule, the boot rule, one UI control. Code-bearing → typed `§5.x` register mandatory (`AGENTS.md` item 11). |
| **`U-TIER4-ARBITRARY-STORAGE`** | `security-store.ts` (+ `store-core-graph.ts` **only if** runtime writes are in scope) | **A genuine RE-FREEZE if runtime writes are taken**: new sha256 + amendment row + seat/integration re-cycle (`29772ac7…`, `0664c52f…`/`5c0c1a97…`) | `[T]`-dominant; `[U]` **not** triggered unless the pane is touched | The tier's own surface; the store's refusal tie-break; `FORKER.md` §4 fork-facing statement | **HIGHEST if runtime writes are taken; LOW-MED if boot-ingestion only.** Must not start before unit 1 lands. |

---

## 7. FINDINGS CARRIED INTO THE UNITS (this record's own list)

| # | Sev | Finding | Owner / carrier |
| --- | --- | --- | --- |
| **G-1** | **MED** | `VALID_GROUPS` admits `'module'` (`security-store.ts:35`, five members) while `src/shared/types.ts:318`'s own doc comment lists four. A doc drift on a file the `G3` boundary froze byte-identical. | **Routed carry** — the next pass touching `src/shared/**`. |
| **G-2** | **MED** | The unknown-key contract is an **undocumented silent drop**; `store-security.md` `§0B` item 4 owes an OUTSIDE-values row, and no row drives it. | The tier-shape unit. |
| **G-3** | **MED** | `±Infinity` passes the `> 0` guard (`security-store.ts:136`, `:42`) with no `Number.isFinite`; it persists as JSON `null` and **silently clears the setting on the next boot** while the live process reports `Infinity`. Register class (7) drives `[0,-3,NaN,null]` — `Infinity` absent, which is why it is green. | **HOST fix + red-first regression row** — the tier-shape unit (its own file). |
| **G-4** | **MED** | `user-flow-audit.md` `§7.1` limb A **triggers** for unit 1; the `G3` `STRUCTURAL` exemption's condition is not satisfied; a parked battery is **not** a gate-6 pass (`RCA-11`). | `docs/pending.md` `§R` `P-R2` → the unit's gate 6. |
| **G-5** | **MED** | A third persisted store filename would be **unwitnessed rather than red** in the `ui` leg (FORKER §4 (ii)/(iv); `electron-ui.mjs`'s fixed two-name witness). | **Closed for this proposal** by ruling (one file, unchanged) — **recorded so a later pass does not reopen it silently.** |
| **G-6** | **LOW** | The `C-1`/`C-8` condition: the exclusion state must **not** be implemented via `VALID_GROUPS` (frozen at five) or policy defaults. | Standing condition on unit 1. |
| **G-7** | **LOW** | `markReady()` is unconditional (`mcp-server.ts:1093-1097`); a disable path built on readiness is **self-defeating**. | The exclusion unit's contract. |
| **G-8** | **LOW** | The switch's state is legible from outside (the 401 oracle; disabled-vs-absent registration). | The exclusion unit's contract (indistinguishability requirement). |

**NO PACKAGE DEFECTS.** Nothing in this pass implicates `node_modules/provident-ssr/**` or
`../Preempt-Providence/**`; `docs/defects.md` and `docs/HANDOFF.md` receive **nothing** from it.

---

## 8. WHAT THIS RECORD IS NOT

It is **not a unit's spec** — no `docs/specs/<unit>.md` is filed, because no unit is admitted. It is
**not an admission** — no ledger row moves (`30 DONE / 0 open`). It is **not a code change** — no
`src/**` byte and no test is touched. It **supersedes nothing** — every cell it outgrows is amended
**beside** at the owning unit's documentation half. It is the **gate-1 record**: the RCA, the dossier
snapshot, the critique's disposition, the change analysis, and the decomposition row.
