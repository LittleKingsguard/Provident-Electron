# Spec — `U-SECURE-EXCLUSION` (`S1`): the access-control mutual-exclusion gate between the MCP server and the `secure` (tier-4) store

**STATUS LINE (the status-line rule):** the SPEC GATE's filing — **status `FILED — awaiting the architect's approval`** ·
unit `U-SECURE-EXCLUSION` · wave `S` · ledger row `S1` · **CODE-BEARING — carries its typed `§5.5.1` register BEFORE any
red set is authored** (`AGENTS.md` item 11); **the zero-row exemption is NOT available and is NOT claimed.** **⟶ THE
REGISTER NAMESPACE WAS RE-PREFIXED 2026-10-05 (THE REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE): ALL FIVE ID
SPACES THIS FILE OWNS MOVED TO `P-EX-*` · `S-EX-*` · `M-EX-n` · `FS-EX-n` · `I-EX-n`, because the as-filed `P-SE-*` /
`S-SE-*` forms COLLIDED with the `G3` unit's own register (`docs/specs/store-security.md` `§5.5.1`) — see `§5.5` item 2
for the verified collision and `§7a` `OW-7` for the RECORDED RESOLUTION.** **Every citation in this file carries the NEW
form; the OLD forms survive ONLY where they are quoted as the thing that was renamed.** **Every
substantive claim below carries its authority — one of `A` (an architect ruling, by ruling id/row name) · `P` (the plan
`docs/specs/data-ownership-model-plan.md`, by `§`/row id) · `R` (the gate-1 record
`docs/specs/secure-tier-generalization-review.md`, by `§`/row id) · `S` (a landed store contract
`docs/specs/store-core-graph.md` or its frozen artifacts, by `§`/row id) · `L` (landed code, by `file:symbol`; layer
`[H]`/`[T]` per `RCA-12`) · `M` (a measured figure, with the measuring pass named) · `T` (declared by THIS spec) — and its
class is one of `CONTRACT` · `OBSERVATION` · `CENSUS` · `CROSS-REF` · `OWED` (with an owner and a positive revisit
condition) · `DECLARED-DEFAULT` · `NEGATIVE` (`§0B`). **The unit's authority chain:** the architect's rulings
`D-GATE` · `D-SCOPE` · `D-CLAUSE-2` · `D-18` · `D-19` (`docs/decisions.md`'s `SECURE-TIER-IS-A-FILESTORE-PEER` +
`THE MCP SERVER AND THE SECURE TIER ARE MUTUALLY EXCLUSIVE…` + `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`), the gate-1
record `docs/specs/secure-tier-generalization-review.md` `§5.3`'s seven-race table and `§6`'s nine-column decomposition
row (`R`), the park row `docs/pending.md` `§R` `P-R1`/`P-R2`, and the ledger row `docs/next-steps.md`'s `## OPEN` table
(`S1`, `ADMITTED 2026-10-05`).

**THE BOUNDARY'S DECISIVE PROPERTY, STATED FIRST SO A READER CAN FALSIFY IT IMMEDIATELY: this unit touches NO frozen
artifact and NO store byte.** It touches **no byte of `src/renderer/store-core-graph.ts`**, **no byte of
`src/renderer/store-graph-references.ts`**, **no byte of `docs/specs/store-core-module-store-core-graph-surface.md`** and
**no byte of `src/main/security-store.ts`** (`R` `§6` column 3; `A` `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`).
**If a clause of this contract implied an edit to any of those four paths, the unit would be mis-designed — the correct
response is to STOP and say so, not to edit the path.** `§1.3` names every forbidden path.

---

## CURRENT STATE (2026-10-05) — the ONE status block in this file, placed BEFORE `§0`

1. **This unit is the exclusion gate, standing alone** — the ledger row's own words (`docs/next-steps.md`'s `S1` row):
   *"the access-control mutual-exclusion gate, standing alone: the exclusion state machine (the legal pairs
   `{MCP-ENABLED, TIER-4-CLOSED}` / `{MCP-DISABLED, TIER-4-OPEN}`, the illegal pair unreachable) · the invocation-turn
   refusal (NOT registration alone — `applyGatePatch` mutates the SDK registry and cannot interrupt a call already
   dispatched) · the epoch + in-flight invalidation · BOTH transports (stdio re-gated in place; http per-POST) · the boot
   terminal (fail-safe, unpersisted — `D-19`) · the operator control in the pane · and NO change to the store's own
   bytes (`main` supplies STATE; the store's single `B-SECURE-GATE` keeps the DECISION — a `secure.*` segment check
   written in `main.ts` is a `P-7` second-authority finding)."* (`A`; `R` `§6` column 3's item (i).)
2. **THE SECOND UNIT IS NOT IN THIS SPEC'S SCOPE, AND ITS ABSENCE IS A CONTRACT CONSTRAINT.** `U-TIER4-ARBITRARY-STORAGE`
   (`S2`) owns the tier's **shape** — its API, `sanitize()`'s fate, the persisted format, the boot ingestion pass and the
   spec amendments (`A` `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`, boundary item (ii)) — and **its scope is an OPEN
   architectural question** (`docs/pending.md` `§R` `P-R3`: boot-ingestion reads alone, or also runtime name-addressed
   writes after boot; the second arm requires a genuine re-freeze). **THIS UNIT'S CONTRACT MUST THEREFORE BE SATISFIABLE
   WITH TIER 4 EXACTLY AS IT IS TODAY** — the three-member `SecuritySettings`, the patch-shaped `set`, `sanitize()`, the
   one file at `<userData>/provident-security.json` (`L` `src/main/security-store.ts:25-46`, `:37-46`, `:84-115`). A
   clause of this spec that needs a tier-4 name, a tier-4 shape change or a widened `sanitize()` is **out of scope and
   is a finding**, not a deferred item.
3. **What EXISTS today vs what this unit DECLARES — the boundary determination.** Today: the MCP server and the tier are
   **simultaneously available** — `SecurityGate` holds a token + an enabled-group set and `applyGatePatch` re-gates a
   RUNNING server in place (`L` `src/main/security.ts:184-214`; `:438-479`; `main.ts:381`); a store write **re-gates**
   the live server and never disables it (`R` `§2`'s `A-6` OUTSIDE column: *"there is no exclusion state at all"*). This
   unit DECLARES the exclusion state machine, its three enforcement sites (invocation turn, epoch stamping, in-flight
   invalidation), its application to both transports, its fail-safe boot terminal, and one operator control authored as
   provident data in the isolated pane graph.
4. **The exclusion state is a SEPARATE AXIS from `VALID_GROUPS`** (`A`; `R` `§2`'s `C-1`/`C-8` conditions; `R` `§7`
   `G-6`): `VALID_GROUPS` is **frozen at five** (`read` · `dispatch` · `graph` · `code` · `module` — `L`
   `src/main/security.ts:3`, `:138`; `src/main/security-store.ts:35`; `src/renderer/secure-panels.ts:56`), and a design
   that opens the tier by **disabling groups** or by minting a **sixth group** breaches `docs/specs/ci-ui-leg.md` `§0`
   prohibition 3 (*"No policy defaults"*), prohibition 5 (*"No new MCP surface"*) and `§3.5` `SEAM-4` (*"The override
   does not flip a security default. The default enabled-group set (`read` + `dispatch`) is unchanged"*).
5. **The operator control edits `paneEnvelope()` in `src/renderer/secure-panels.ts`** (`L` `:141-227`), so
   `docs/specs/user-flow-audit.md` `§7.1` **limb A TRIGGERS** (`docs/pending.md` `§R` `P-R2`, **RECORDED, NOT WAIVED**):
   gate 6 for this unit is a **MANDATORY live battery** with a `§5.U` delta matrix (≤ `8` U-rows) + a `§6.1` structured
   coverage report + the `§6.2` read-only audit, and **the `G3` `STRUCTURAL` exemption does NOT hold here** — its
   condition (`docs/specs/store-security.md` `CURRENT STATE` item 8: *"authors no rendered surface, no element, no text,
   no class and no slot content"*) **is not satisfied**, because this unit authors all five. `§2.4` carries the
   obligation and the refusal-of-the-exemption, in the family's three-part form.
6. **The refusal token is a CHANNEL token, NOT a member of the store's closed 16-member refusal union** (`A` `D-GATE`
   clause (2); `R` `§2`'s `C-2`; `S` `store-core-graph.md` `§2.1`'s block annotation — `16 = 8` held + `5` + `3`,
   `8 + 5 + 3 = 16` ✓). **The union stays `16`; no re-freeze is owed on that account** (`docs/next-steps.md`'s `S1` row:
   *"so no re-freeze is owed on that account"*). The precedent is `SecurityWriteReceipt` (`L`
   `src/main/security-store.ts:16-23`), whose `'write-failed'` is *deliberately* not a union member.
7. **The decision site is the store's, and it is untouched** (`A`; `R` `§2`'s `C-12`/`F-11`; `docs/next-steps.md`'s `S1`
   row): the store's single `B-SECURE-GATE` **keeps the DECISION**; `main` supplies only **STATE**. **A `secure.*`
   segment check written in `main.ts` — or anywhere else in this unit's diff — is a `P-7` second-authority finding**
   (`§2.6`'s NEGATIVE row).
8. **Nothing in this filing is `undefined-until-answered`.** The vocabulary the rulings deliberately left to this spec
   (`R` `§2`'s `A-6` row: *"the state names, the terminal set, and what a refusal is called (`disabled`/`refused`/
   `unavailable`) are the architect's, and none is currently spelled anywhere in this project"*; the dossier's `§5`
   `A-6` row: *"Exact state names and receipt vocabulary are the unit's to specify"*) is **DECLARED here** and recorded
   as `§0A` items, each with its own reversibility statement. **The operator control's form and the off-state's
   observability — the two things `R` `§6` column 9 names as unit 1's architect needs — are declared at `§2.4`/`§0A`
   items 6/7/8, each architect-reversible at this gate.**

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

1. **`D-GATE` — THE EXCLUSION IS AN ENFORCED SERVER-SIDE INVARIANT, NOT AN OPERATOR PROCEDURE** (`A`;
   `docs/decisions.md`'s `THE MCP SERVER AND THE SECURE TIER ARE MUTUALLY EXCLUSIVE…`, clause (1); quoted at
   `R` `§5.3`). The legal pairs are `{MCP-ENABLED, TIER-4-CLOSED}` and `{MCP-DISABLED, TIER-4-OPEN}`; **the illegal pair
   is unreachable**; **the state is process-global** (`R` `§5.3`'s States paragraph: *"not per-window, not per-realm"*).
   **THE ENFORCEMENT SITE IS THE INVOCATION TURN, NOT REGISTRATION ALONE** (the `moduleToolAllowed` precedent, `L`
   `src/main/security.ts:70-84`): `applyGatePatch` mutates the SDK registry and **cannot interrupt a call already
   dispatched to the renderer** (`L` `src/main/mcp-server.ts:336-348`), and the HTTP transport is **per-POST** (`L`
   `:934`), so a registry-only re-gate leaves a window bounded only by the request timeout. **The gate must therefore
   (a) refuse at invocation, (b) stamp an epoch on accepted work and invalidate in-flight work on the transition, and
   (c) apply to BOTH transports.** The clauses are `§2.1`–`§2.3`.
2. **`D-SCOPE` — THE ACCESS-CONTROL PREDICATE'S DOMAIN** (`A`; the dossier's `§5` `A-4` row, **defined**):
   *"`D-SCOPE` = the MCP server's tool surface ∪ resource surface ∪ notification surface — every method reachable through
   the backend's request path, **not** merely `ALL_TOOLS`. The manual-UI `IPC_SECURITY_*` channel is **NOT** an MCP
   method and stays operator-reachable."* This unit consumes it as the **scope of the refusal** (`§2.2` item 1) and as
   the reason the operator control is reachable at all (`§2.4` item 1).
3. **`D-CLAUSE-2` — THE RESTATEMENT READING** (`A`; the dossier's `§5` `A-3`/`A-8` rows, **defined**): *"`secure.*`
   never resolves through `file`/`mem`/`temp`, and a tier-4 write never clears/aliases/creates a lower-tier holder. Tier 4
   does **NOT** join the ordering (the destructive reading is refused)."* **This unit's duty is to take NO position that
   contradicts it** — the exclusion is an **access-control** state, never a residency change (`§2.7` item 6).
4. **`D-18` — THE GATE IS ADDED BESIDE THE ISOLATED PANE GRAPH, NOT INSTEAD OF IT** (`A`; the dossier's `§5` `A-7` row,
   **defined**). **D1–D8 STANDS** (`docs/specs/secure-panels.md` `§2`, `§4`); the panes do not move and are not
   re-homed; the pane's `cfg` snapshot stays **out** of the generic store, so `data-ownership-model-plan.md` `§2.3` row
   **2.4-12 is NOT superseded** (`R` `§5.2`'s row: *"NEITHER — IT STANDS"*; `docs/pending.md` `§R` `P-R5`). Carried at
   `§2.7`.
5. **`D-19` — THE BOOT SEQUENCE IS OPEN→INGEST→CLOSE→ENABLE** (`A`; the dossier's `§5`'s closing paragraphs, `O-4`/`O-1`
   **CLOSED**). On boot the tier is **opened**, the app's own subsystems **read and cache into their own holders**, the
   tier is **closed**, and **then** the MCP server is enabled. Because the exclusion flag is **NOT persisted** and
   `sanitize()`'s corrupt fallback makes a torn record indistinguishable from cold (`L`
   `src/main/security-store.ts:37-46`, `:53-61`), **a crashed session resolves to the SAFE pair**. Carried at `§2.1`
   items 4/5.
6. **THE REFUSAL TOKEN IS A CHANNEL TOKEN** (`A` `D-GATE` clause (2); the dossier's `§5` `A-6` row: *"The refusal token
   is a CHANNEL token, not a store-union member (the `SecurityWriteReceipt` precedent — the union stays `16`)"*).
   `§2.5`.
7. **THE DECISION SITE IS THE STORE'S** (`A`; `R` `§2`'s `C-12`, verbatim: *"the store's own single `B-SECURE-GATE`
   **keeps the decision** and `main` supplies only **state** (`F-11`; a `secure.*` segment check written in `main.ts` is
   a `P-7` second-authority finding)"*). `§2.6`.
8. **THE DECOMPOSITION AND THE ORDER** (`A` `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`; `R` `§6`): `S1` lands FIRST;
   `S2` is **NOT startable before `S1`'s DONE row** (`docs/pending.md` `§R` `P-R3`: *"Starting it first would make the
   tier name-addressed while the gate that justifies it does not exist — a net security regression window"*). **This
   spec authors NOTHING of `S2`** (`§1.3` item 3).
9. **THE LAYER OBLIGATIONS** (`A`; `R` `§6` column 7): **Unit 1: `[H]` + `[T]` + `[U]` MANDATORY**, because it adds a
   rendered control to `paneEnvelope()`; `§2.4` carries the `[U]` obligation in full.
10. **THE SEVEN RACES THE UNIT MUST PIN** (`R` `§5.3`'s table; each race's disposition is a clause below): (1) an MCP
    request in flight when the tier opens → `§2.2` items 4/5; (2) a tier write in flight when MCP is enabled → `§2.2`
    item 6; (3) two transports re-gated at different moments → `§2.3`; (4) an operator who never re-enables MCP →
    `§2.1` items 4/5 + `§2.4` item 6; (5) a crash between "disable MCP" and "open the tier" → `§2.1` item 5 / `FS-EX-4`;
    (6) a second window / realm → `§2.1` item 6; (7) `markReady()` is unconditional → `§2.4` item 5.
11. **`ALL_TOOLS` and `RpcMethod` are TWENTY-TWO each, and this unit moves NEITHER** (`L`
    `src/main/mcp-server.ts:365-388` — the name list; `src/shared/types.ts:259-281` — the method union; the count
    authority is `docs/specs/foundation-no-config-file-persistence-review.md` `§2` row 8, cited by
    `docs/specs/ci-ui-leg.md` `§0` prohibition 5's dated annotation: *"THE LIVE FIGURE FOR BOTH MEMBERS IS `22`, NOT
    `21`"*). **⟶ ANNOTATED BESIDE 2026-10-05 (THE REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE, cited by this row's
    own subject; the cell above stands byte-for-byte and its figure is UNCHANGED): THE `22` · `22` FIGURE IS NOW `M`
    MEASUREMENT, NOT ONLY A CITED ANNOTATION.** It was **independently re-measured against the landed bytes BY THIS
    FILING'S OWN PASS**, by name-list enumeration of the landed sources: `src/main/mcp-server.ts:365-388`'s `ALL_TOOLS`
    array holds exactly **`22`** quoted member names (`provident.dispatch` · `provident.focus` ·
    `provident.get_rendered_html` · `provident.get_markdown` · `provident.list_targets` · `provident.get_node_state` ·
    `provident.code.get` · `provident.code.validate` · `provident.load` · `provident.op` · `provident.export` ·
    `provident.validate` · `provident.teardown` · `provident.journal` · `provident.code.set` · `provident.code.create` ·
    `provident.code.delete` · `provident.code.load` · `provident.code.loadBatch` · `module.install` · `module.update` ·
    `module.list`), and `src/shared/types.ts`'s `RpcMethod` union's **distinct members number `22`**. **THE MEASURING
    METHOD IS NAMED SO THE FIGURE IS RE-DERIVABLE: both counts come from enumerating DECLARED MEMBERS (the array's and
    the union's typed member set), never from counting the source lines a member list spans** — a line-counting method
    miscounts the array's opening bracket/`static` line as a member and yields `23`, which is **NOT** the live figure.
    **A later pass that re-derives these counts MUST use member enumeration and MUST NOT "correct" `22` to `23`.**
    `MUTATING_METHODS` is **seven** members (`L` `src/renderer/renderer.ts:105`: `dispatch` · `load` · `op` ·
    `teardown` · `code.load` · `code.loadBatch` · `journal`) and is **unmoved**. The default-gate registered subset is
    `8`. **A pass that moves any of these four figures under this unit's name is a finding** (`§2.6`).
12. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed this filing: `docs/skills/` holds exactly
    `process-guardrails.md`) — so **no page-design update and no test-use-case coverage matrix / demo-page index is
    owed**, and the sibling units' ABSENCE-row form applies (`docs/specs/store-security.md` `§1.3` item 7;
    `docs/specs/ci-ui-leg.md` `§1`: *"there is **no test-use-case coverage matrix and no demo-page index to update**"*).
    **This ABSENCE is NOT the `§7.1` exemption**: `§2.4`'s `[U]` obligation rests on the authored **rendered control**,
    not on the skill file. **If `docs/skills/designing-pages.md` comes to exist before this unit lands, THIS UNIT OWES
    the update** (`OWED`; owner: this unit's Implementer; positive revisit condition: the file exists in the tree at the
    landing commit).

### 0A. The dated ruling notes — the decisions THIS spec makes as working defaults, each with its reversibility (none blocks)

1. **THE STATE NAMES** (`T`, `CONTRACT`, `DECLARED-DEFAULT` on the vocabulary the rulings left open — `R` `§2`'s `A-6`
   row; the dossier's `§5` `A-6` row). The two legal pairs are named by TWO CLOSED TOKENS over a single process-global
   record:
   - **`EXCLUSION_STATE = 'mcp-enabled'`** ⇔ the pair `{MCP-ENABLED, TIER-4-CLOSED}` (`false` ‖ `true`);
   - **`EXCLUSION_STATE = 'mcp-disabled'`** ⇔ the pair `{MCP-DISABLED, TIER-4-OPEN}` (`true` ‖ `false`).
   **`'mcp-enabled'` is the BOOT DEFAULT and the fail-safe terminal** (`§2.1` item 4). **The illegal pair is
   UNREACHABLE BY CONSTRUCTION — not by discipline** (the two flags are ONE record with two derived readings, `§2.1`
   item 1). **Reversible by the architect at this spec gate**: the token spellings are the rulings' explicit non-decision,
   and a reversal is a one-item amendment to `§0A` item 1 plus the string literals in `§2.1`'s table and the register's
   `P-EX-SM-1` — never a clause move.
2. **THE RECEIPT VOCABULARY — TWO CLOSED FORMS, ONE CHANNEL TOKEN, AND NO THIRD STATE** (`T`, `CONTRACT`,
   `DECLARED-DEFAULT` on the spelling). `ExclusionReceipt = { status: 'refused'; reason: 'exclusion-closed' }`. The
   `reason` set is **closed at the ONE token `'exclusion-closed'`**; `status` is **closed at the ONE token `'refused'`**.
   **The alternative spelling `'mcp-active'` is priced and NOT taken** — *"closed"* names **what the caller needed and
   did not get** (the tier), while *"active"* names an internal actor and would read as a state name rather than a
   caller-visible refusal; the two spellings are otherwise equivalent and the reversal is a one-token edit at `§0A`
   item 2, `§2.5` and `P-EX-TP-1`. **`'unavailable'` is refused**: it collides with the engine's own readiness
   vocabulary (`L` `src/main/mcp-server.ts:1131`, `:1155`: `'renderer window unavailable'`/`'renderer window destroyed'`),
   and two different failure classes must not share a word.
3. **THE STATE-READ CARRIER IS A DIRECT PREDICATE ON THE GATE OBJECT, NOT A NEW STATE OBJECT** (`T`, `CONTRACT`). The
   exclusion record lives ON the existing `SecurityGate` (`L` `src/main/security.ts:184-214`) as two declared members
   (`§2.1` item 2) rather than in a new module. **Why**: a second object would be the second-authority class `P-7`
   closes, and the gate is already the object `main` constructs once at boot (`L` `main.ts:90`) and the one the MCP
   server already holds (`L` `:354`). **Reversible**: a reversal moves the two members to a new module and adds an
   import edge; no clause and no register term moves.
4. **THE OPERATOR CONTROL'S FORM** (`T`, `CONTRACT`, `DECLARED-DEFAULT` — this is one of the two things `R` `§6`
   column 9 names as unit 1's architect needs). **ONE new authored node** in `paneEnvelope()` — a `<button>`-typed node
   with `props.id = 'exclusion-toggle'`, plus its label node — whose handler body calls the SAME manual-UI bridge the
   four landed bodies call (`window.provident.security`), inside the Security Settings pane beside the group toggles.
   **It adds NO pane, NO group row, NO new pane id namespace and NO new DOM.** Reversible by the architect at this gate:
   a different form (a checkbox, a two-node radio pair) is a one-clause amendment to `§2.4` item 2 with the same register
   terms (§5.5.3).
5. **THE OFF-STATE'S OBSERVABILITY — THE `security-status` LINE** (`T`, `CONTRACT`, `DECLARED-DEFAULT` — the second
   thing `R` `§6` column 9 names). The exclusion state is rendered into the **existing** `security-status` node's
   `content` (`L` `src/renderer/secure-panels.ts:430-432`'s mutation site) as a **trailing segment** appended to the
   landed line, never as a new node: `… · MCP: ${on ? 'enabled' : 'disabled'}`. **Why the existing node**: a new node
   would be a new authored surface with its own `[U]` row, and the `§2.4` obligation is already met by the toggle
   (`R` `§5.3` race 4: *"The unit must still state the off-state's operator-visible signal"*). **Reversible**: a
   dedicated node is a one-row amendment to `§2.4` item 3 plus a `§5.U` `U-` row.
6. **THE RE-ARM RULE — THE RENDERER MAY NOT RE-ARM WHAT THE OPERATOR DISABLED** (`T`, `CONTRACT`; `R` `§5.3` race 7;
   `R` `§7` `G-7`: *"`markReady()` is unconditional; a disable path built on readiness is self-defeating"*; `L`
   `src/main/mcp-server.ts:1093-1097`; `main.ts:430-433`). The `IPC_READY` handler keeps calling `backend.markReady()`
   **unconditionally and unmodified**; the exclusion state is **NEVER** derived from, and never cleared by, the
   readiness signal. **`markReady()` is the renderer's ARRIVAL signal, not the operator's CONSENT signal.** Reversible:
   the alternative (readiness re-arms the gate) is refused on the self-defeating ground and its reversal would require an
   architect ruling that the arrival signal carries operator intent — a ruling this spec does not assume.
7. **THE SWITCH'S STATE IS NOT LEGIBLE FROM OUTSIDE — THE LOW FINDING, DISPOSED** (`T`, `CONTRACT`; `R` `§4`'s `(LOW)`
   row: *"The switch's state is legible from outside (the 401 oracle; disabled-vs-absent registration)"*; `R` `§7`
   `G-8`). Four pins: **(a) the HTTP path performs NO exclusion read of any kind** — no header, no body and no query
   member is consulted (`§2.3` item 3); **(b) the 401 oracle and the refusal become indistinguishable for an operator
   in the disabled state exactly insofar as the operator's own request was unauthorized** — the two answers differ
   (`401 {code:-32001}` vs `503 {code:-32003}`, `§2.3` item 2) **and that is DECLARED, not hidden**: closing the oracle
   entirely would require the HTTP path to answer 401 for an authorized request, which would make a correct operator's
   client unusable; **(c) the stdio registration set is UNCHANGED in both states** — the gate does not deregister tools
   on disable (a `disabled`-vs-`absent` distinction is exactly the legibility `G-8` names, and not creating it is
   cheaper than hiding it, `§2.2` item 2(b)); **(d) the pane's off-state line is operator-only** and, by D1–D8, not
   MCP-reachable (`§2.7` item 2). **Reversible**: (a)/(c) are safe-side pins; if the architect wants the oracle closed
   as well, that is a new clause and a new register arm, never a silent change.
8. **THE SECOND WINDOW / REALM IS DECLARED OUT OF SCOPE AS A SUPPORTED CONFIGURATION** (`T`, `CONTRACT`,
   `DECLARED-DEFAULT`; `R` `§5.3` race 6, whose own cell records `UNVERIFIED-AS-YET`: *"whether this host can open a
   second `BrowserWindow` at all — no evidence found either way"*). **This unit does NOT add per-window serialization,
   a lock file, a mutex or a second state record** — the state is process-global (`D-GATE`), and a serialization
   mechanism would be a new persisted artifact and/or a new writer, both of which the boundary forbids. Where a second
   window or a second realm is opened **against the supported configuration**, the state is still **process-global and
   single-valued**: there is no per-window override, no per-realm copy and no second holder. **Reversible**: if the
   architect rules a serialization obligation in, it is a NEW clause with its own register row and its own legs — this
   filing does not invent it (`§7a`).
9. **THE `[U]` LAYER IS MANDATORY AND THE `STRUCTURAL` EXEMPTION IS REFUSED** (`T`, `CONTRACT`; `docs/pending.md` `§R`
   `P-R2`). No alternative is offered: the trigger is structural (`docs/specs/user-flow-audit.md` `§7.1` limb A), so
   it cannot be parked on availability. `§2.4` item 7 carries the three-part form.

### 0B. The claim ledger — the closed authority enum and the closed claim-class set (the spec-writer gate rules this filing enforces)

1. **THE CLOSED AUTHORITY ENUM — every claim's authority is ONE of**: `A` (an architect ruling, by ruling id/row name) ·
   `P` (the plan, `docs/specs/data-ownership-model-plan.md`, by `§`/row id) · `R` (the gate-1 record
   `docs/specs/secure-tier-generalization-review.md`, by `§`/row id) · `S` (a landed store contract
   `docs/specs/store-core-graph.md` or its frozen artifacts, by `§`/row id) · `L` (landed code, by `file:symbol`; layer
   `[H]`/`[T]` per `RCA-12`) · `M` (a measured figure, with the measuring pass named) · `T` (declared by THIS spec as a
   working default or a contract clause of this unit). **A claim with no authority, or with an authority outside this
   enum, is a filing defect.**
2. **THE CLOSED CLAIM-CLASS SET**: `CONTRACT` (what this unit must land) · `OBSERVATION` (today's state — falsifiable by
   the build) · `CENSUS` (a count, printed with its terms) · `CROSS-REF` (a citation) · `OWED` (a duty carried with an
   owner and a positive revisit condition — never a bare `OWED`) · `DECLARED-DEFAULT` (a reversible working default) ·
   `NEGATIVE` (a finding class — what FAILS a row). **A claim whose class does not exist in this set is a filing defect.**
3. **THE SUPERSESSION POINTER EDGE** (binding on every annotation in this file): a cell that supersedes, or is
   superseded, MUST carry a pointer to the live form (a `§`/row id or a path) — a superseded cell with no successor
   pointer is a dead end and a finding. **This file supersedes nothing**: it is a NEW filing, it edits no other
   document, and every cell it outgrows is annotated BESIDE **by the unit that lands that half** (`docs/pending.md` `§R`
   `P-R5` names the owners of the `mcp-endpoint.md` `§6.4` two-register reading, the `secure-panels.md` D1–D8
   re-labelling and the `foundation-app-data-model.md` `§5` `A-7` citation). **The one cell this unit's OWN landing
   outgrows is `docs/specs/mcp-endpoint.md` `§6.4`'s loaded sentence** — *"The settings surface is manual-UI-only by
   construction: the IPC channel is main→renderer→main, the MCP tool handlers never route to it, AND the pane lives in
   an isolated graph the MCP endpoints cannot read/dispatch"* (`L`, `:456-458`) — whose third mechanism (the gate) is
   added BESIDE by this unit; **the annotation is OWED with an owner** (this unit's documentation half — gate 8; positive
   revisit condition: this unit's DONE row) and is a **CARRY, never a gate on the landing**.
   **⟶ THE CARRY LIST IS RECONCILED INTO ONE LIST, HERE, SO `§7` ITEM 3 AND THIS ITEM CANNOT DRIFT (2026-10-05, THE
   REVIEW-CLOSURE PASS — the two cells were worded differently for the SAME obligations; this is the ONE list, and `§7`
   item 3 restates it by POINTER, not by paraphrase):**
   **(C-1)** `docs/specs/mcp-endpoint.md` `§6.4`'s loaded sentence — the third mechanism (the gate) added BESIDE;
   **owner: this unit's gate-8 documentation half; revisit condition: this unit's DONE row.**
   **(C-2)** `docs/specs/secure-panels.md`'s D1–D8 re-labelling as defence-in-depth beside the gate — **owner: the pass
   that lands that half** (`docs/pending.md` `§R` `P-R5`); **revisit condition: that pass's file scope includes
   `docs/specs/secure-panels.md`.**
   **(C-3)** `docs/specs/foundation-app-data-model.md` `§5` `A-7`'s warranting-mechanism citation re-point — the same
   owner and the same form (`docs/pending.md` `§R` `P-R5`).
   **(C-4)** `docs/FORKER.md` `§4`'s fork-facing statement of the tier's shape and the exclusion's consequences —
   **owner: `S2`** (`R` `§4`'s `(LOW)` row); **revisit condition: `S2`'s spec gate.**
   **(C-5)** `docs/specs/designing-pages.md`'s update, **IF the file comes to exist** — **owner: this unit's
   Implementer; revisit condition: the file exists in the tree at the landing commit** (`§0` ruling 12).
   **(C-6)** `docs/specs/secure-panels.md`'s D1–D8 re-labelling is the SAME obligation as `(C-2)` — no separate row.
   **Every `(C-n)` is an `OWED` WITH an owner and a POSITIVE revisit condition — none is a bare `OWED`, and none gates
   this unit's landing.**
4. **THE PARAMETER-SEMANTICS RULE**: every declared parameter of this unit's declared surfaces (`§2.1`–`§2.4`, `§2.5`)
   has a row spelling its domain and its OUTSIDE values; a declared parameter without a row is a gate-2 finding. **The
   rows are `§2.PAR`, printed as one table so the rule is checkable by enumeration rather than by assurance.**
5. **THE STATUS-LINE RULE**: the status line at the head of this file states the filing state, the unit, the wave, the
   ledger row and the gate — it is the ONE authoritative status statement; no later section may contradict it without an
   annotate-beside dated note.

---

## 1. Scope

### 1.1 What the unit is

1. **The mutual-exclusion gate, in the ledger row's own words** (`A`; `docs/next-steps.md`'s `S1` row, quoted in
   `CURRENT STATE` item 1). This unit lands: **(a)** the exclusion **state machine** with its two legal pairs, its
   process-global single record and its fail-safe boot terminal (`§2.1`); **(b)** the **invocation-turn refusal** with
   the accepted-work **epoch** and the **in-flight invalidation** (`§2.2`); **(c)** the **application to BOTH
   transports** incl. the per-POST HTTP path (`§2.3`); **(d)** **ONE operator control** authored as provident data in
   the isolated pane graph, with its off-state observability and the re-arm rule (`§2.4`); **(e)** the **refusal
   vocabulary's home as a channel token** with the union unmoved (`§2.5`); **(f)** the **decision-site boundary**
   (`§2.6`); **(g)** the `D-18` boundary (`§2.7`); **(h)** the register (`§5.5.1`).
2. **The process-global single writer of the state**: `main` owns the ONE exclusion record (`§2.1` item 2). There is no
   second writer: the renderer observes the state (through the existing manual-UI read) and requests a transition
   (through the existing manual-UI write, and through the ONE new channel member); it never writes the record; the MCP
   transports READ it and never write it.
3. **The unit's declared layer**: `[H]` for the main-process machinery (the state record, the invocation turn, the
   epoch, the invalidation, the transports), `[T]` for the register's drives against the constructed surfaces, and
   **`[U]` MANDATORY** for the authored control and its live behavior (`§2.4` item 7).

### 1.2 Today vs DECLARED — the boundary determination (each row: `OBSERVATION` today, `CONTRACT` owed)

| # | The subject | TODAY (`OBSERVATION`) | DECLARED by this unit (`CONTRACT`) | Authority |
| --- | --- | --- | --- | --- |
| 1 | An exclusion state | **NONE** — *"there is no exclusion state at all"*; a store write RE-GATES the live server and never disables it (`L` `security.ts:184-214`; `mcp-server.ts:438-479`; `main.ts:381`) | TWO legal pairs over ONE process-global record; the illegal pair unreachable by construction (`§2.1`) | `A` `D-GATE` (1); `R` `§2` `A-6` OUTSIDE; `R` `§5.3` |
| 2 | The enforcement site | **registration only** — `applyGatePatch` toggles `RegisteredTool`/`RegisteredResource` handles (`L` `mcp-server.ts:444-459`) and cannot interrupt a dispatched call | the **invocation turn** is mandatory; registration toggling is KEPT and is NOT the enforcement (`§2.2` item 2) | `A` `D-GATE` (1); `L` `security.ts:70-84`; `R` `§5.3` race 1 |
| 3 | An accepted-work epoch | **NONE** | every accepted work item carries the epoch current at acceptance; the transition bumps the epoch (`§2.2` item 3) | `A` `D-GATE` (1)(b); `R` `§5.3` race 1 |
| 4 | In-flight work on the transition | **NOT abandoned by the gate** — `RendererBackend.invoke`'s pending entry survives to its own `invokeTimeoutMs` (60 000 ms default, `L` `mcp-server.ts:1045`, `:1135-1143`); `handleReset` fires only on reload/destroy (`L` `:1070-1081`) | the transition **INVALIDATES** the in-flight set: each such call answers the DECLARED refusal VALUE; the 60 000 ms timer does not need to elapse (`§2.2` items 4/5) | `A` `D-GATE` (1)(b); `R` `§5.3` race 1; `R` `§4`'s `(HIGH)` row 2 |
| 5 | The stdio transport | re-gated in place via captured handles (`L` `mcp-server.ts:438-479`) | **UNCHANGED in mechanism**, plus the invocation-turn check (`§2.3` item 1) | `A` `D-GATE` (1)(c); `R` `§5.3` race 3 |
| 6 | The HTTP transport | per-POST: a FRESH `McpServer` + transport per request, built from the CURRENT gate (`L` `mcp-server.ts:934-936`; the note at `:462-464`) | the per-POST server is built from a gate that carries the state; the POST is answered a declared HTTP 503 BEFORE the server is built (`§2.3` items 2/3) | `A` `D-GATE` (1)(c); `R` `§5.3` race 3 |
| 7 | The boot terminal | **N/A** — no state exists; the MCP server is started unconditionally (`L` `main.ts:459`) | the boot sequence OPEN→INGEST→CLOSE→ENABLE; the terminal is `'mcp-enabled'` on cold, corrupt, torn and missing records alike (`§2.1` items 4/5) | `A` `D-19`; `R` `§5.3` races 4/5 |
| 8 | Persistence of the flag | **N/A** | **NOT PERSISTED** — no new key in `provident-security.json`, no third file (`§2.1` item 4) | `A` `D-19`; `docs/pending.md` `§R` `P-R1` |
| 9 | The operator surface | the four landed handler bodies + five group toggles + the token row + the journal row, all in the isolated pane graph (`L` `secure-panels.ts:141-227`, `:107-136`) | **ONE new authored control** (`exclusion-toggle`) and one trailing segment on the `security-status` line; **no pane, node-set, group-row or DOM change beyond those two** (`§2.4` items 2/3) | `R` `§6` column 3 (i); `AGENTS.md` UI-rendering constraint; `R` `§5.3` race 4 |
| 10 | The refusal's home | **N/A** | a CHANNEL token: `{status:'refused', reason:'exclusion-closed'}`; **the store's union stays `16`** (`§2.5`) | `A` `D-GATE` (2); `S` `store-core-graph.md` `§2.1`; `L` `security-store.ts:16-23` |
| 11 | The decision site | the store's single `B-SECURE-GATE` keeps the DECISION (`S` `store-core-graph.md` `§2.5` items 1/2; `L` `store-core-graph.ts:922-923`, `:1417`, `:2277`) | **UNMOVED** — `main` supplies STATE only; a `secure.*` segment check written in this unit's diff is a `P-7` finding (`§2.6`) | `A`; `R` `§2` `C-12`/`F-11` |
| 12 | `ALL_TOOLS` / `RpcMethod` / `MUTATING_METHODS` / `VALID_GROUPS` / the preload member set / the `scripts` key set | `22` · `22` · `7` · `5` · the landed member set · the landed key set (`L`, cited) | **ALL UNMOVED**; the ONE new channel constant plus ONE new preload member are the only additions, and they are named and counted at `§2.6` item 3 | `A`; `docs/specs/ci-ui-leg.md` `§0` prohibitions 3/5, `§3.5` `SEAM-4`; `R` `§2` `C-1`/`C-8` |
| 13 | The pane graph's isolation (D1–D8) | own `GraphScope`, own hub, own `Supervisor`, own `DomAdapter` (`L` `secure-panels.ts:262-279`); five adversarial suites green | **STANDS UNMOVED** — the gate is ADDED BESIDE it, not instead of it (`§2.7`) | `A` `D-18`; the dossier's `§5` `A-7`; `R` `§5.2` |

### 1.3 What the unit is NOT — the boundary block; a collision is a finding, not a silent move

1. **THE STORE MODULE'S BYTES DO NOT MOVE — and this is the boundary's decisive property** (`A`
   `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`, boundary item (i): *"It touches NO frozen artifact and NO store byte —
   that is the boundary's decisive property"*; `R` `§6` column 3; `docs/next-steps.md`'s `S1` row). **FORBIDDEN PATHS,
   NAMED SO THE LIST IS CHECKABLE:**
   - **`src/renderer/store-core-graph.ts`** — the frozen field-1…7 content (operative artifact digest
     `sha256:29772ac7…`; MEASURED file pin `sha256:0664c52f…`; the span figure is **never** a file-pin figure —
     `docs/specs/store-security.md` `§1.3` item 1's dated annotation, the `G3` doc-review item 4);
   - **`src/renderer/store-graph-references.ts`** — MEASURED file pin `sha256:5c0c1a97…`;
   - **`docs/specs/store-core-module-store-core-graph-surface.md`** — the frozen SURFACE ARTIFACT;
   - **`src/main/security-store.ts`** — the tier's own bytes (`S2`'s, per the decomposition row).
   **These come from THREE authorities, not one, so the pin is not a paraphrase:** the **decomposition row** names the
   `S1`/`S2` split (`A` `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`); the **gate-1 record** names *"NO frozen artifact
   and NO store byte"* as the boundary's decisive property (`R` `§6` column 3, and its RISK/COST table's *"Frozen
   artifacts — NONE touched — the decisive advantage"*); and the **ledger row** repeats it and adds the decision-site
   clause (`docs/next-steps.md`'s `S1` row). **A diff that moves a byte of any of the four paths is a COLLISION finding**
   (register row `P-EX-IM-2`'s static half).
2. **THE STORE'S `secure.*` REFUSAL IS THE STORE'S OWN — this unit adds NO second refusal site** (`S`
   `store-core-graph.md` `§2.5` items 1/2, the fixed precedence `secure → malformed → undeclared → …`; `L`
   `store-core-graph.ts:478-479`, `:766`, `:922-923`, `:1417`, `:2277`; `docs/specs/store-security.md` `§2.4` item 3's
   verbatim precedent: *"this unit adds no second refusal site"*). **No `secure`-segment check, no `'secure-refused'`
   spelling and no generic-rejection surface may appear anywhere in this unit's diff.**
3. **THE SECOND UNIT IS NOT AUTHORED HERE** (`A` `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`; `docs/pending.md` `§R`
   `P-R3`). The tier's **shape**, its **API** (`get()` / `set(patch)` / `lastWriteReceipt()` — `L`
   `security-store.ts:25-33`), **`sanitize()`** (`L` `:37-46`), the **file format**, **name-addressing** and the boot
   **INGESTION** pass are `U-TIER4-ARBITRARY-STORAGE`'s, and that unit's scope is an **OPEN architectural question**
   (`P-R3`). **This contract is written to be satisfiable with the tier EXACTLY as it is today** (`CURRENT STATE`
   item 2). **A clause of this spec that needs a tier-4 name, a shape change or a widened `sanitize()` is a finding.**
4. **D1–D8's CLAUSES ARE NOT RETIRED, MOVED OR RE-HOMED** (`A` `D-18`; `docs/specs/secure-panels.md` `§2`, `§4`).
   The panes do not move; the pane's `cfg` snapshot stays out of the generic store; `data-ownership-model-plan.md`
   `§2.3` row 2.4-12 is **NOT superseded** and needs no RE-NAME REQUEST (`R` `§5.2`; the dossier's `§5`'s `C-10`
   reconciliation; `docs/pending.md` `§R` `P-R5`). **A "fix" that merges the pane into the app graph, that lets the app
   Runtime read pane state, or that re-homes the snapshot into the store is a finding.**
5. **NO NEW MCP SURFACE** (`A`; `docs/specs/ci-ui-leg.md` `§0` prohibition 5 + `§3.5` `SEAM-4`; `R` `§2` `C-1`/`C-8`):
   **no new tool, no new resource, no new group, no `VALID_GROUPS` member, no six-th group, no new `RpcMethod` member
   and no new `MUTATING_METHODS` entry.** `ALL_TOOLS` stays `22`; `RpcMethod` stays `22`; `MUTATING_METHODS` stays `7`;
   `VALID_GROUPS` stays `5`; the default enabled-group set stays `read` + `dispatch` (`§0` ruling 11; `§2.6` item 3).
6. **NO NEW `scripts` KEY** (`AGENTS.md` item 4's hazard note; `tests/ui-leg-contract.test.ts`'s `L-1` pins the
   `scripts` KEY SET — the landed keys plus exactly `ui`): **a config change cannot satisfy `L-1`**, and this unit adds
   no script. The five legs it runs (`§5.2`) are the landed keys (`npm test`, `npm run typecheck`,
   `npm run typecheck:tests`, `npm run build` — plus its own declared register leg, which is part of `npm test`).
7. **NO NEW PERSISTED FILE AND NO NEW PERSISTED KEY** (`A` `D-19`; the `G2` DONE pin: the persisted set is EXACTLY
   `{provident-security.json, provident-settings.json}`). **The exclusion flag is NOT persisted**; no key is added to
   `provident-security.json`; no third filename appears anywhere in this unit's diff. **A third persisted filename is a
   finding** (`docs/specs/store-security.md` `§1.2` item 2).
8. **THE FORBIDDEN CARRIERS STAND** (`A`; `P` `§3.8`'s three forbidden reads; `docs/specs/mcp-endpoint.md` `§6.4`;
   `docs/specs/store-security.md` `CURRENT STATE` item 6): **no token, no group set and no tier-4 value reaches a graph
   node, a tool result, a resource or a notification payload.** This unit adds **NO tier-4 read of any kind** — the
   exclusion state is not a tier-4 value, it is a channel state, and it is not carried in any of the four carriers
   (`§2.6` item 4).
9. **`src/shared/types.ts` stays BYTE-IDENTICAL** — the exclusion's ONE new channel constant lives in
   **`src/main/store-channels.ts`** (`L` `:1-`… the host-side channel-name module; `docs/specs/store-persist.md` `§2.2`
   item 3's single-source rule: *"the channel-name agreement becomes a host-side single-source claim needing its own
   row"*, and item 3's *"`src/main/main.ts` and `src/main/preload.ts` only"* import rule). **A channel literal
   re-spelled in any other file is a finding** (`§2.6` item 3). The `store-channels.ts` census moves **`2 → 3`**
   constants; the preload's `security` member set moves **`2 → 3`** members.
10. **The `F-9`-class doc-drift cells and the other units' documentation halves are ROUTED, not landed** (`docs/pending.md`
    `§R` `P-R5`; `docs/specs/store-security.md` `§1.3` item 8's form): `docs/specs/mcp-endpoint.md` `§6.4`'s loaded
    sentence, `docs/specs/secure-panels.md`'s D1–D8 re-labelling and `foundation-app-data-model.md` `§5` `A-7`'s
    warranting-mechanism citation are annotated BESIDE by the pass that lands the corresponding half. **This unit's own
    half is the `§6.4` addition of the third mechanism** (`§0B` item 3: `OWED` with an owner). **A spec-filing pass may
    not edit another spec** — a filing that edits `docs/specs/mcp-endpoint.md` under this gate's name is a finding.
11. **THE TRACKERS ARE NOT EDITED BY THIS FILING.** `docs/next-steps.md`'s `S1` row's spec cell (currently
    *"`OWED — not filed` … verified free 2026-10-05"*) is **the supervisor's to flip at gate 10** (`docs/next-steps.md`'s
    `G2`/`G3` cells' own precedent: *"CELL ANNOTATION ONLY — the `MOVED TO DONE` LABEL, THE DONE ROW, THE LEDGER MOVE
    and the `## OPEN` flip are GATE 10's, THE SUPERVISOR'S"*). `docs/pending.md` `§R` `P-R1`'s *"OWED — not filed"*
    clause is the orchestrator's to annotate. **This filing edits EXACTLY ONE file: `docs/specs/secure-exclusion.md`.**

### 1.4 The layer honesty

1. Every behavioural claim in this file carries a layer label (`RCA-12`): the state record, the invocation turn, the
   epoch, the invalidation and the two transports are `[H]`-layer (main process); the pane control and its off-state
   line are `[U]`-layer (**MANDATORY** — `§2.4` item 7) with `[H]`-layer wiring beneath them; **the register's rows are
   `[T]`-executed against the unit's own red set**, and `P-EX-IM-2` reads the static diff.
2. **No timing figure is claimed** (`RCA-12`): the 60 000 ms `invokeTimeoutMs` appears ONLY as the evidence that a
   pending entry can outlive a transition (an EXISTENCE witness, never a duration claim); the epoch rows assert ORDER
   and OUTCOME, never elapsed time; the HTTP rows assert the answer's SHAPE and its arrival BEFORE the per-POST server
   is built, never a latency.
3. **This unit's green is main-process + harness evidence, never an APP claim** — except at gate 6, where the `[U]` live
   battery is MANDATORY and its `§5.U` rows carry their own layer labels (`§2.4` item 7).
4. **The full `npm test` context is whatever the supervisor measures at gate 9**; this unit's red set is authored against
   THE SPEC ALONE (`§4.1`), in the unit's own test file.

### 1.5 The declared surfaces (exact) — and the parameter-semantics table

1. **`EXCLUSION_STATE`** — the closed two-token state name (`§0A` item 1). Read through the two gate accessors
   (`§2.1` item 2). **No producer outside this table.** (`T`, `CONTRACT`.)
2. **`ExclusionReceipt`** — the closed one-token refusal record (`§0A` item 2). Produced at three sites only: the MCP
   invocation turn (the tool answer), the HTTP POST (the 503 body) and the manual-UI SET response (the additive
   `exclusion` member). **No fourth producer.** (`T`, `CONTRACT`.)
3. **`ExclusionTransition`** — the operator's request record on the manual-UI channel (`§2.4` item 4). (`T`, `CONTRACT`.)
4. **The one new channel constant** — `IPC_SECURITY_EXCLUSION = 'provident:security:exclusion'` (`§2.6` item 3).
   (`T`, `CONTRACT`.)
5. **THE READ-SIDE TYPING WIDENING — the manual-UI read's DECLARED RETURN** (`T`, `CONTRACT`; `§2.4` item 4; the
   strict-reading-widening rule: a declared-return widening is a **declared surface**, so it needs a row here and a
   `§2.PAR` row, not an implicit consequence of item 2 above). The manual-UI read's declared return **widens** from the
   landed `SecuritySettings` to **`SecuritySettings & { exclusion: EXCLUSION_STATE }`** — the same
   `.security.get()`-superset idiom the landed `set` already uses for its additive `write` member (`L`
   `src/main/preload.ts:36`; `docs/specs/store-security.md` `§2.3` item 2's `Promise<SecuritySettings & { write:
   SecurityWriteReceipt }>` precedent). **THE TWO DECLARATION SITES THIS WIDENS, NAMED SO THE DIFF SCOPE IS HONEST**
   (both are in `§5.1` item 1's ALLOWED list): **`src/main/preload.ts:30`** — `get(): Promise<SecuritySettings>` becomes
   `get(): Promise<SecuritySettings & { exclusion: EXCLUSION_STATE }>` — and **`src/renderer/secure-panels.ts:43`** — the
   renderer-side `declare global` re-declaration of the bridge, which MUST widen in lockstep or the pane cannot read the
   member. **`src/shared/types.ts` IS NOT ONE OF THE SITES**: `SecuritySettings` itself stays **byte-identical** and is
   **DENIED** (`§1.3` item 9); the widening is an INTERSECTION applied at the two declaration sites above, never an edit
   to the shared type. A pass that widens `SecuritySettings` itself, or that adds the member to `src/shared/types.ts`, is
   a **COLLISION finding**.

### 2.PAR. THE PARAMETER-SEMANTICS TABLE (`§0B` item 4 — every declared parameter's domain and its OUTSIDE values)

**Every declared parameter of every declared surface above has a row; a declared parameter without a row is a gate-2
finding. OUTSIDE means: the input is a domain violation, and the declared answer is the one named — NEVER a throw.**
**Each row carries its authority and its class in its third column's leading tag (`§0B` items 1/2), so neither is
implicit.**

| # | The declared parameter | Its declared domain (IN) | The values OUTSIDE it, and what each answers |
| --- | --- | --- | --- |
| **PAR-1** | `SecurityGate.exclusion` (`readonly`, `§2.1` item 2) | `{ mcpEnabled: boolean; tier4Open: boolean }` — **derived, never assigned**: `mcpEnabled === !tier4Open` is an INVARIANT | *OUTSIDE does not exist for a derived reader*: a reader that can observe `mcpEnabled === tier4Open` is a red row (`P-EX-IM-1`). A caller's attempt to ASSIGN it is a compile-time error (a `readonly` accessor, no setter) — and if a setter is ever added, that alone FAILS `P-EX-IM-1`. |
| **PAR-2** | `SecurityGate.exclusionState(): 'mcp-enabled' \| 'mcp-disabled'` (`§2.1` item 2) | the two closed tokens; total over the record | *empty domain* — the function takes no argument; a call with an argument is a TS error. Its return is total: no third token, never `undefined`, never a throw. |
| **PAR-3** | `SecurityGate.withExclusion(next: 'mcp-enabled' \| 'mcp-disabled'): SecurityGate` (`§2.1` item 2) | the two closed tokens | **OUTSIDE:** any other string, `undefined`, `null`, a number, an object, an array, a hostile proxy. **The whole class answers the UNCHANGED gate** (`this` semantics: the returned instance's state equals the receiver's) — **NEVER a throw** (the `SecurityGate.apply` posture at `L` `security.ts:211-213`, which returns on a rejected patch rather than throwing). |
| **PAR-4** | `ProvidentMcpServer.exclusionSnapshot(): ExclusionReceipt \| null` (`§2.2` item 2) | the live gate's reading | `null` ONLY when the gate says `'mcp-enabled'`; a `'mcp-disabled'` gate answers the receipt. **No third return value**; never a throw. |
| **PAR-5** | the exclusion **epoch** (`§2.2` item 3) | a value the gate BUMPs on every accepted transition; carried, never compared across processes | *OUTSIDE*: a caller supplying an epoch. No declared surface takes one — a PASS that adds an epoch-accepting parameter is a new surface and a finding (it would let a caller forge recency). |
| **PAR-6** | `RendererBackend.abandonPendingForExclusion(reason: string): number` (`§2.2` item 4) | any `string`; the caller passes `'exclusion-closed'` | *OUTSIDE*: a non-string. **A non-string is NOT a declared-domain input** — the parameter is `string`, and a caller supplying a non-string is a TS error at the call site; at runtime the method reads the value only to build the rejection message, so a hostile value cannot change the OUTCOME (the count returned). **Never a throw**; returns the number of rejected pending entries (`0` when none). |
| **PAR-7** | `handleHttp`'s per-POST exclusion arm (`§2.3` item 2) | the live gate's reading at POST arrival | *OUTSIDE*: HTTP methods other than `POST` on `/mcp` — those keep their landed answers (`404` off-path, `405` for `GET`/`DELETE`, `405` for other methods; `L` `mcp-server.ts:913-927`) and **the exclusion arm runs ONLY for `POST`**. A `POST` to `/mcp` with an unparseable body, a hostile header set or an oversized body is answered the exclusion arm's 503 when the state is `'mcp-disabled'` — **the state is read BEFORE the body and BEFORE the server is built** (so a hostile body can never reach a server while the tier is open). |
| **PAR-8** | `IPC_SECURITY_EXCLUSION` handler's payload (`§2.4` item 4) | `'mcp-enabled' \| 'mcp-disabled'` — the two closed tokens only | **OUTSIDE:** a bare `boolean`, a number, an object, `undefined`, `null`, an unknown string, a string differing only in case (`'MCP-DISABLED'`, `'mcp_disabled'`, `'mcp-disabled '`). **EVERY outside value is REFUSED AS A VALUE:** the handler answers `{ applied: false, state: <the UNCHANGED state>, reason: 'malformed-state' }` — **never a throw, never a silent no-op that looks applied.** |
| **PAR-9** | the manual-UI read's exclusion member (`§2.4` item 4) | the state string, always present on a GET and on a SET response | *OUTSIDE*: absence. **The member is NEVER absent** (`IPC_SECURITY_GET` always carries it; `IPC_SECURITY_SET` always carries it, additively beside the landed `write` member — `L` `main.ts:379`'s additive precedent). A response missing it FAILS `P-EX-TP-2`. |
| **PAR-10** | the pane control's bridge member (`§2.4` item 2) | `window.provident.security.setExclusion(state)` — the two closed tokens | **OUTSIDE:** the handler body's own `!s` guard (bridge absent) and any rejected transition (the handler answers `applied: false`). **The body NEVER throws** — its four landed siblings' posture (`L` `secure-panels.ts:107-136`, each an early `return`). |
| **PAR-11** | the `security-status` line's `MCP:` segment (`§2.4` item 3) | exactly one of `· MCP: enabled` / `· MCP: disabled`, appended to the landed line | *OUTSIDE*: any other rendering, any interpolated numeric, any tier-4 VALUE. **The segment carries a STATE WORD, never a tier-4 value** — the forbidden carriers stand (`§1.3` item 8). |
| **PAR-12** | the register's strategy drives (`§5.5.1`) | the tables printed in each row's Term cell | *OUTSIDE*: any drive not in a row's own table. **A `(bounded)` marking is not owed by any row here** — every table is the CLOSED input set (`§5.5.2` item 3). |
| **PAR-13** | **the manual-UI read's declared RETURN CARRIER** (`§1.5` item 5; `§2.4` item 4) | **`SecuritySettings & { exclusion: EXCLUSION_STATE }`** — the widened declared return of `window.provident.security.get()`, declared at the two sites `§1.5` item 5 names (`L` `src/main/preload.ts:30`; `L` `src/renderer/secure-panels.ts:43`'s `declare global` re-declaration) | *OUTSIDE*: **(a) a carrier whose declared type is the UNDWIDENED `SecuritySettings`** — then the pane's own read of `exclusion` is not typed and `§2.4` item 4's render obligation is untypeable; **(b) a carrier widened by editing `SecuritySettings` itself or `src/shared/types.ts`** — **DENIED** (`§1.3` item 9), a COLLISION finding; **(c) a carrier that widens `get()` but not the `declare global` re-declaration (or vice versa)** — the two sites MUST move together, and a half-widening FAILS. **The widening is an INTERSECTION at the two named declaration sites; it is never a mutation of the shared type, and it adds no runtime member beyond `PAR-9`'s.** **Authority `T`; class `CONTRACT`** — and its carrier's *presence* is `PAR-9`'s separate reading (`T`, `CONTRACT`), which this row does NOT duplicate. |

---

## 2. The surface (exact)

### 2.1 THE EXCLUSION STATE MACHINE, pinned exactly

1. **THE TWO LEGAL PAIRS, AND WHY THE ILLEGAL ONE IS UNREACHABLE BY CONSTRUCTION** (`T`, `CONTRACT`; `A` `D-GATE`
   clause (1); `R` `§5.3`'s States paragraph). The record is **ONE** object with **TWO derived readings**; the illegal
   pair `{MCP-ENABLED, TIER-4-OPEN}` and its mirror `{MCP-DISABLED, TIER-4-CLOSED}` are not "forbidden" — they are
   **unspellable**, because there is only ever one bit:

   | The single record | `mcpEnabled` (derived) | `tier4Open` (derived) | The pair | Legal? |
   | --- | --- | --- | --- | --- |
   | `'mcp-enabled'` | `true` | `false` | `{MCP-ENABLED, TIER-4-CLOSED}` | **LEGAL** (the boot default / fail-safe terminal) |
   | `'mcp-disabled'` | `false` | `true` | `{MCP-DISABLED, TIER-4-OPEN}` | **LEGAL** (the operator-opened state) |

   **`P-EX-IM-1` is the row that falsifies a two-field implementation**: a gate whose two readers can disagree FAILS.
   **THE STATE IS PROCESS-GLOBAL** (`A` `D-GATE`; `R` `§5.3`: *"not per-window, not per-realm"*) — one record per
   process, held on the ONE `SecurityGate` instance `main` constructs at boot (`L` `main.ts:90`) and passes to the
   server (`L` `main.ts:264` → `mcp-server.ts:354`). **No per-window copy, no per-realm copy, no second holder.**
2. **THE DECLARED SURFACE ON `SecurityGate`** (`T`, `CONTRACT`; `[H]`; the class is `L` `src/main/security.ts:184-214`
   and its constructor/accessor posture is UNCHANGED). Three declared members are ADDED, and nothing else of the class
   moves:
   - `get exclusion(): { readonly mcpEnabled: boolean; readonly tier4Open: boolean }` — the derived pair (`PAR-1`);
   - `exclusionState(): 'mcp-enabled' | 'mcp-disabled'` — the total reader (`PAR-2`);
   - `withExclusion(next: 'mcp-enabled' | 'mcp-disabled'): SecurityGate` — the transition's pure constructor
     (`PAR-3`), **returning a NEW gate in the `apply`-family style** (`L` `security.ts:211-213`: *"`apply(patch): SecurityGate` … `return new SecurityGate(applyPatch(this.config, patch))`"*) so the transition cannot mutate a
     gate another holder already captured.
   **THE IMMUTABLE-STYLE RULE IS NOT COSMETIC**: `applyGatePatch` REPLACES `this._gate` (`L` `mcp-server.ts:441`), so a
   mutating `withExclusion` would leave the server's own replacement invisible to any earlier reader. The declared
   transition therefore REPLACES the server's `_gate` exactly as `applyGatePatch` does (`§2.2` item 6).
3. **THE TRANSITION RULES, each with its guarantee** (`T`, `CONTRACT`):
   - **T-1 `'mcp-enabled'` → `'mcp-disabled'`** (the operator's open request): (a) the gate's record becomes
     `'mcp-disabled'`; (b) the epoch BUMPs; (c) the in-flight invalidation runs (`§2.2` item 4); (d) EVERY registered
     tool and resource is toggled **disabled** on the live stdio server (`applyGatePatch`'s mechanism, unchanged —
     `L` `mcp-server.ts:444-459`) — **but the toggling is NOT what enforces the transition** (`§2.2` item 2);
     (e) the HTTP path needs no re-gate (per-POST, `§2.3` item 1).
   - **T-2 `'mcp-disabled'` → `'mcp-enabled'`** (the operator's close request): (a) the record becomes `'mcp-enabled'`;
     (b) the epoch BUMPs; (c) the in-flight invalidation runs; (d) the registered tool/resource handles are toggled
     **enabled** in accord with the enabled-GROUP set (`this._gate.toolAllowed` — the landed predicate, unchanged), and
     newly-allowed tools are REGISTERED on the live stdio server (the landed widen arm, `L` `mcp-server.ts:460-477`,
     unchanged).
   - **T-3 A SELF-TRANSITION** (`next` equals the current state): a **NO-OP that is still a legal call**. The gate is
     returned with the SAME state; **the epoch is NOT bumped**; **the invalidation does NOT run**; the tool/resource
     toggles are re-applied idempotently. **Why pinned**: an epoch bump on a no-op would invalidate work for a
     transition that never happened, and a caller could then deny service with a loop of no-ops — a denial-of-service
     surface this contract closes (`P-EX-SM-2`).
   - **T-4 AN OUTSIDE-VALUE TRANSITION** (`PAR-3`): the UNCHANGED gate; no epoch bump; no invalidation; no toggling;
     **never a throw**.
   - **T-5 THE WRITE PATH IS NOT A TRANSITION SITE**: an `IPC_SECURITY_SET` (the token/group/journal write) does **NOT**
     change the exclusion state, does **NOT** bump the epoch and does **NOT** invalidate work. It keeps its landed
     `applyGatePatch` re-gate (`L` `main.ts:381`, `store-security.md` `§0A` item 8: *"COMPOSED WITH, never rewritten"*)
     and it gains ONE additive response member (`§2.4` item 4). **A SET that flips the exclusion state is a finding**
     (it would make the exclusion a side effect of an unrelated write).
4. **THE BOOT CLAUSE — AN ORDER-OF-CONSTRUCTION INVARIANT OVER THE ARTIFACTS THAT ACTUALLY EXIST, AND THE SAFE
   TERMINAL** (`T`, `CONTRACT`; `A` `D-19`; `R` `§5.3` races 4/5).
   **⟶ RESTATED 2026-10-05 (THE REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE; the as-filed `OPEN→INGEST→CLOSE→ENABLE`
   phrasing is kept visible at item 4-note below and is NOT rewritten).** **THE HONEST FORM, STATED SO THE CLAUSE CLAIMS
   NO STEP THE LANDED CODE CANNOT EXHIBIT:** `D-19`'s four-step sequence names **`S2`'s mechanism**. **Open and Close are
   `S2`'s, NOT this unit's**: **no ingestion pass exists in `src/main/main.ts`** — the boot **reads `security-store.get()`
   and constructs the gate, and nothing else touches the tier before `mcp.start()`** — and the tier **has no open/closed
   API at all** (`L` `src/main/security-store.ts:25-33` is exactly `get` / `set` / `lastWriteReceipt`; there is no
   `open()`, no `close()`, no handle of any kind). **THIS UNIT THEREFORE PINS ONLY THREE THINGS: (i) the ORDERING
   ENVELOPE over the artifacts that DO exist, (ii) the fail-safe terminal, and (iii) the non-persistence of the flag.**
   **THE ORDERING ENVELOPE, IN ORDER, EACH STEP AN ARTIFACT THE LANDED CODE CONSTRUCTS:**
   1. **the security store is CONSTRUCTED** (`L` `main.ts:86-90` — `createSecurityStore` + the boot read);
   2. **the gate is CONSTRUCTED** (`L` `main.ts:90`) — **and the exclusion record is INITIALIZED to `'mcp-enabled'`
      HERE, from the construction site, not read from any file**, because the flag is not persisted (`A` `D-19`);
   3. **the transports are CONSTRUCTED** (`L` `main.ts:264` — the server is built **after** the store, holding the gate
      it was passed, `L` `mcp-server.ts:354`);
   4. **`mcp.start()` runs** (`L` `main.ts:459`) — the last boot step, and the first moment the transports serve.
   **THE OBSERVABLE INVARIANT IS THE ORDER, AND IT IS THE WHOLE CLAIM**: at every point before step 4 the state is
   `'mcp-enabled'` and no transport serves; **a boot in which the server is constructed or started BEFORE the store/gate
   construction FAILS this clause.** **WHAT THIS CLAUSE DOES NOT CLAIM: any reader, any ingestion pass, any caching into
   a holder, any tier open/close call.** Those are `S2`'s (`§1.3` item 3; `docs/pending.md` `§R` `P-R3`/`P-R4`).
   **THE FAIL-SAFE TERMINAL, TOTAL OVER ITS WHOLE DOMAIN**: the boot state is **`'mcp-enabled'`** for EVERY one of
   `{cold record, missing file, corrupt file, unparsable bytes, a torn write, an EMPTY record, a wrongly-shaped
   record}` — because (a) the flag is not persisted and (b) `sanitize()`'s corrupt fallback (`L`
   `security-store.ts:37-46`, `:53-61`) makes a torn record **indistinguishable from cold**, so a crashed session
   cannot resolve to the open pair even if a record existed. **A boot that resolves `'mcp-disabled'` under ANY of those
   seven inputs FAILS `P-EX-SM-3`.**
   **4-note — THE AS-FILED `D-19` PHRASING, KEPT VISIBLE SO THE RESTATEMENT IS CHECKABLE** (`RCA-8(d)` annotate-beside,
   the old form is the thing that was restated): the as-filed clause read *"OPEN — the tier is opened for the app's own
   subsystems (the `S2`-owned INGESTION pass …) · INGEST — the app's own subsystems read and cache into their own
   holders · CLOSE — the tier is closed · ENABLE — `mcp.start()` runs"*. **THE `ENABLE` STEP AND THE BOOT TERMINAL ARE
   UNCHANGED AND ARE THIS UNIT'S; the `OPEN`/`INGEST`/`CLOSE` **nouns** belong to `S2`'s mechanism, which does not exist
   in the landed tree — so this unit's contract does NOT assert them as steps it will exhibit.** **A pass that drives a
   row against an OPEN or CLOSE call FAILS: there is no such surface to drive** (`§5.5.1` `P-EX-SM-3`'s re-scoped
   drives). **The noun `INGEST` survives in this file ONLY as `S2`'s name for `S2`'s mechanism.**
5. **`R` `§5.3` RACE 5 — A CRASH BETWEEN "disable MCP" AND "open the tier"** is closed by item 4's terminal: the two
   operations leave no persisted trace, so the next boot is cold-or-torn and resolves SAFE. **This is not a
   recovery mechanism; it is the absence of a durable state, and the absence IS the guarantee** (`A` `D-19`;
   `docs/specs/store-security.md`'s `§0A` item 7's precedent: *"the boot read's corrupt-at-read-back posture is
   UNCHANGED"*).
6. **`R` `§5.3` RACE 6 — A SECOND WINDOW / REALM**: declared **out of scope as a supported configuration** and pinned
   as a **NO-SECOND-HOLDER** rule (`§0A` item 8). The security FILE is shared, so the state is declared
   **process-global-and-single-valued**; this unit adds **no** serialization, **no** lock, **no** second record and
   **no** persistence. **`P-EX-IM-3` drives the row at its cells (f)/(g): a second `SecurityGate` constructed from the
   same options does NOT
   observe the first's transition, and the process's ONE live gate is the server's own replacement** — i.e. the state
   has exactly one live home (`§2.2` item 6). **The row that is NOT written here, and why**: *"whether this host can open
   a second `BrowserWindow` at all"* is `UNVERIFIED-AS-YET` in the record itself (`R` `§5.3`), so no row may assert a
   second window's behavior; the supported-configuration declaration is a SCOPE ruling, not an observation (`§7a`).
7. **`R` `§5.3` RACE 4 — AN OPERATOR WHO NEVER RE-ENABLES MCP**: the gate state is not persisted, so the
   dark-agentic-surface failure **cannot become sticky across a restart** (`A` `D-19`; `R` `§5.3` race 4:
   *"boot resolves to the safe pair, so the dark-agentic-surface failure cannot become sticky"*). **Within the session
   the off-state is observable and reversible**: the pane's status line carries `MCP: disabled` and the toggle offers
   the return (`§2.4` items 2/3).

### 2.2 THE ENFORCEMENT SITES — the invocation turn is mandatory

1. **THE THRESHOLD PREDICATE IS THE LANDED ONE, RE-SCOPED — NOT RE-INVENTED** (`T`, `CONTRACT`; `A` `D-GATE` clause (1):
   *"the `moduleToolAllowed` precedent"*; `L` `src/main/security.ts:70-84`). The invocation-turn check is a **new
   predicate in the SAME FILE and the SAME STYLE** as the two landed gates, with the same **fail-closed** posture —
   **it denies, it never throws, and a malformed input fails closed** (the `L` `:75-78` precedent: *"malformed
   `enabled` (non-iterable object) FAILS CLOSED (false), never throws. null/undefined → empty set → false"*):
   - **`exclusionAllowsWork(state: unknown): boolean`** — `true` **iff** `state === 'mcp-enabled'` (an exact
     string comparison against the ONE legal token); **`false` for every other value**, including `undefined`, `null`,
     a non-string, an unknown string and a hostile object. **Total, never a throw.**
2. **THE THREE ENFORCEMENT DEPTHS, EACH WITH ITS OWN GUARANTEE** (`T`, `CONTRACT`; `A` `D-GATE` clause (1)):
   - **(a) THE INVOCATION TURN — MANDATORY, and it is the ONLY depth that closes race 1.** EVERY MCP tool handler
     invocation and EVERY MCP resource read runs the predicate **before any renderer dispatch**, and answers the
     refusal `ExclusionReceipt` as the tool's/resource's RESULT (a VALUE, never a throw — `§3.5`). The predicate's
     read is the LIVE gate's state, read at the turn: **not a captured snapshot** (`P-EX-IM-2`).
   - **(b) THE REGISTRATION TOGGLING — KEPT, and it is NOT the enforcement.** `applyGatePatch`'s existing mechanism
     (`L` `mcp-server.ts:444-459`, `:460-477`) stays and keeps working; the decline is on the same terms
     `docs/specs/store-security.md` `§0A` item 8 states for the re-gate (*"COMPOSED WITH, never rewritten"*). **Its
     LIMIT is DECLARED** (`A` `D-GATE` clause (1), verbatim: `applyGatePatch` *"mutates the SDK registry and **cannot
     interrupt a call already dispatched to the renderer**"*). **A design whose exclusion rests on the toggling ALONE
     FAILS `P-EX-IM-2`'s drive cell (c)** — the registry-only reading, in which the invocation check is live and the
     toggling is withheld, must STILL refuse the call.
   - **(c) THE NON-LEGIBILITY PIN** (`§0A` item 7(c)): the tool/resource set registered during `'mcp-disabled'` is
     **not cleared** — the handles are toggled `enabled: false` and stay RESOLVABLE. **Why**: removing them would make
     the disabled state distinguishable from a never-registered tool by name-listing alone, and not creating that
     oracle is cheaper than hiding it. **A design that DEREGISTERS on disable FAILS this pin.**
   **DECLARED MECHANISM (a `DECLARED-DEFAULT`, reversible at this gate)**: the invocation check is a new module-local
   helper called from the ONE shared tool closure (`L` `mcp-server.ts:759-776`) and from the ONE shared resource
   callback (`L` `:867-882`), rather than a per-tool edit in `registerTools`'s 22 branches. **Why**: it makes the check
   UNFORGETTABLE for a tool added later (one call site per surface, not one per name) and keeps the `P-4`-style
   *"no new surface"* reading. A per-tool implementation is admissible and would be a one-item amendment to this clause
   with the SAME register terms.
3. **THE EPOCH — STAMPED ON ACCEPTED WORK** (`T`, `CONTRACT`; `A` `D-GATE` clause (1)(b): *"stamp an epoch on accepted
   work"*). **What the epoch IS, exactly**: a **per-process monotone counter held beside the exclusion record**, bumped
   **once per accepted TRANSITION** (`T-1`, `T-2`; **never** on `T-3`/`T-4`, `§2.1` item 3). **What it is stamped on**:
   the exclusion epoch is read at ACCEPTANCE (the invocation turn) and carried on the accepted work item.
   **DECLARED CARRIER (a `DECLARED-DEFAULT`, reversible at this gate)**: the epoch rides the `RendererBackend`'s
   **pending entry** — the per-request record the backend already creates at `L` `mcp-server.ts:1135-1143` — rather than
   a new field on the `RpcRequest` wire record (`L` `src/shared/types.ts:283-287`), **because the wire record is a
   shared-type byte and this unit does not touch `src/shared/**`** (`§1.3` item 9). **The semantic is the same either
   way**: at the reply turn (`L` `:1160-1167`) a reply whose entry's stamped epoch is stale is **NOT** resolved with the
   renderer's value — it is settled with the DECLARED refusal (`§2.2` item 5). A wire-carried epoch is admissible and
   would widen this unit's diff to `src/shared/types.ts` — **the architect may reverse this one item without any other
   clause moving.**
4. **THE IN-FLIGHT INVALIDATION — AND THE EVIDENCE THAT A CALL CAN OUTLIVE THE TRANSITION** (`T`, `CONTRACT`;
   `A` `D-GATE` clause (1)(b); `R` `§5.3` race 1). **THE EVIDENCE (a MEASURED reading of the landed bytes, `[H]`)**:
   `RendererBackend.invoke`'s `pending` entry carries a **60 000 ms** timer (`L` `mcp-server.ts:1045` —
   `invokeTimeoutMs = opts.invokeTimeoutMs ?? 60000`; `L` `:1135-1143` — the timer's creation); `handleReset` — the
   ONLY landed bulk-abandon path — is wired to `did-finish-load`/`closed`/`destroyed` (`L` `:1070-1081`) and to
   **nothing else**; **so on a gate transition a dispatched call is abandoned by NOTHING and settles only at its own
   timeout** — a window bounded only by the request timeout, exactly as the ruling states.
   **THE DECLARED MECHANISM**: `RendererBackend` gains ONE declared method —
   **`abandonPendingForExclusion(reason: string): number`** (`PAR-6`) — which, for every entry in `pending`, mirrors
   the landed `handleReset` loop **EXACTLY** (`L` `:1103-1113`): `clearTimeout(entry.timer)`, `entry.reject(new
   Error(reason))`, then `this.pending.clear()`, **returning the number of entries rejected** (a number, so
   `P-EX-IM-3` can observe whether the invalidation found work — the arithmetic is OBSERVED, not inferred).
   **IT IS NOT `handleReset` AND IT MUST NOT BE**: `handleReset` also flips `this.ready = false`, rejects the readiness
   promise and mints a fresh `readyPromise` (`L` `:1109-1112`) — **re-arming the readiness gate is precisely what
   `§0A` item 6 forbids** (*"the renderer may not re-arm what the operator disabled"*). **`abandonPendingForExclusion`
   touches `pending` and NOTHING ELSE.**
5. **WHAT AN IN-FLIGHT CALL ANSWERS — THE DECLARED TOKEN, AND NO THIRD STATE** (`T`, `CONTRACT`; `A` `D-GATE`
   clause (1)(b); `R` `§5.3` race 1: *"every such call answers a **declared refusal token** — no third state"*).
   **EXACTLY ONE ANSWER, at all three depths**:
   - the invocation-turn refusal answers the **tool result** `{status:'refused', reason:'exclusion-closed'}` — a VALUE
     (`content: [{type:'text', text: JSON.stringify({status:'refused', reason:'exclusion-closed'})}]`), **never an MCP
     protocol error** (`P-EX-TP-1`);
   - the in-flight renderer call — a call already DISPATCHED to the renderer at the transition — is rejected with the
     SAME token as its `Error` message (`PAR-6`'s `reason`, spelled `'exclusion-closed'`), which surfaces at the tool
     boundary as the SDK's **isError** result; **its `text` field contains that token verbatim**, which is the row's
     observable.
   **THE TWO MECHANISMS DIFFER IN TRANSPORT, NOT IN TOKEN, AND THAT IS THE POINT OF PINNING THEM TOGETHER**: *"what
   an in-flight call answers after the transition"* has ONE answer — the declared refusal, carrying the declared token
   — whether the call was refused at its turn or aborted mid-flight. **A third answer class** (a bare SDK error with a
   different message, an empty result, a timeout-shaped error, a renderer value that arrived after the transition)
   **FAILS `P-EX-IM-3`.**
6. **THE LANDED JOURNAL AND WHICH `abandon` IS WHICH** (`T`, `CONTRACT`, `NEGATIVE`; `L`). The `RendererBackend` now
   has TWO abandon-shaped operations, and the DIFFERENCE is a pinned row: **`handleReset`** (reload/destroy) — the
   **readiness ARRIVAL gate** is re-armed (invalidation + re-arm); **`abandonPendingForExclusion`** (the exclusion
   transition) — **pending ONLY** (invalidation, **no re-arm**). **A transition that re-arms readiness FAILS
   `P-EX-IM-3`'s cell (d)**, and that failure is exactly the `G-7` hazard materialized.
7. **`R` `§5.3` RACE 2 — A TIER WRITE IN FLIGHT WHEN MCP IS ENABLED** (`T`, `CONTRACT`; `R` `§5.3` race 2: *"The
   transition **waits for or refuses** a mid-write open; the landed two-holder divergence … must **not** gain a third
   unordered holder"*). **THE DECLARED ANSWER: the transition REFUSES, it does not wait — and the refusal is by
   STATE, not by polling.** The tier's write path is the manual-UI channel (`L` `main.ts:370-383`), which performs a
   **synchronous** `set()` + `persist()` (the atomic write, `L` `security-store.ts:84-115`) before the handler returns;
   the exclusion transition is requested over a **different** channel member. **The pinned rule**: the transition
   handler **reads the state, applies the transition and answers — atomically with respect to the SET handler**, because
   both handlers run on the main process's single JS thread and neither awaits inside the critical section. **What this
   buys, and what it does not**: it guarantees the two holders stay ORDERED (the store's `current` and the gate's
   `_config`), and it does NOT merge them (`docs/specs/store-security.md` `§2.3` item 3: *"the two-holder shape … is
   NOT fixed"*, `P` `§7.2` `F-6`). **⟶ DRIVEN 2026-10-05 (THE REVIEW-CLOSURE PASS — the ordering claim above was
   ASSERTED WITHOUT A DRIVE and is now a driven cell rather than a stated property): the interleaving is falsifiable and
   IS driven — DRIVE: an `IPC_SECURITY_SET` (a settings write) and an `IPC_SECURITY_EXCLUSION` transition are issued
   back-to-back in ONE tick, in BOTH orders (SET-then-transition and transition-then-SET); READINGS: after the pair,
   (i) the store's `current` equals the SET's post-state and (ii) the gate's config equals the transition's post-value,
   with **(iii) no third holder observable** — the reading that a copy, memo or snapshot of either holder FAILS. **A
   drive that yields a store `current` mid-update, a gate left at its pre-value, or any third holder FAILS**
   (`P-EX-IM-3`'s cell (k)). **A third holder** — e.g. a copy of the enabled-group set taken for the exclusion's
   decision — **FAILS `P-EX-IM-3`'s cell (g)**. **An in-flight TIER write is never abandoned by the gate**: the write is
   main-side and synchronous, so there is no window in which a gate transition could observe `current` mid-update.

### 2.3 BOTH TRANSPORTS

1. **STDIO — RE-GATED IN PLACE** (`T`, `CONTRACT`; `A` `D-GATE` clause (1)(c); `R` `§5.3` race 3; `L`
   `mcp-server.ts:438-479`). The landed in-place re-gate is KEPT and COMPOSED WITH the invocation-turn check: on a
   transition the captured `RegisteredTool`/`RegisteredResource` handles are toggled (`set.enabled`), newly-allowed
   tools are registered from the current gate, and the long-lived `stdioServer` is NOT closed and NOT rebuilt. **The
   exclusion does NOT close the stdio transport**: closing it would destroy the operator's ability to re-enable (the
   session is spawn-local) and would make the disabled state observable as a disconnect — an oracle `§0A` item 7(c)
   refuses. **A transition that closes or rebuilds the stdio server FAILS `P-EX-SM-2`'s drive cell (6)** (the
   CONNECTED reading).
2. **HTTP — STATELESS, A FRESH SERVER PER POST** (`T`, `CONTRACT`; `A` `D-GATE` clause (1)(c); `R` `§5.3` race 3; `L`
   `mcp-server.ts:903-958`). The landed shape is UNCHANGED (a fresh `McpServer` + a fresh
   `StreamableHTTPServerTransport` per POST, disconnected after the response — `L` `:934-936`; the N2 note at `L`
   `:898-902`). **The declared addition is ONE arm, placed where the landed HTTP token gate is** (`L` `:928-933`):
   - **the state is read at POST ARRIVAL, BEFORE the body is read and BEFORE any per-POST server is built**;
   - a POST arriving while the state is `'mcp-disabled'` is answered **HTTP `503`** with the body
     `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}` — a STATUS and a
     JSON-RPC error object, **both values, never a throw**, and **no server is built for that request** (so no tool
     can run: the depth-(a) guarantee is reached by construction on this transport);
   - the **existing** 401 arm keeps `code:-32001` and its position (`L` `:929-932`) — **the two arms are ORDERED: the
     authorization gate runs FIRST, the exclusion arm SECOND.** **Why this order is pinned**: reversing it would make an
     unauthenticated caller able to distinguish the two states without a token (the `G-8` oracle, `§0A` item 7(a)).
3. **HOW THE EPOCH CHECK REACHES THE HTTP PATH — AND WHAT A STRADDLING REQUEST ANSWERS** (`T`, `CONTRACT`; `A`
   `D-GATE` clause (1)(c); `R` `§5.3` race 3's *"the invocation-turn check is what closes this"*).
   **THE RULE, IN ONE SENTENCE: on the HTTP transport the EXCLUSION EPOCH'S SUBJECT IS THE REQUEST, NOT A `pending`
   ENTRY.** The HTTP transport has **no `pending` map** — the per-POST server and transport are created and torn down
   inside one request (`L` `mcp-server.ts:934-957`), and the renderer round-trip inside that POST goes through the SAME
   `RendererBackend` the stdio path uses. Therefore:
   - a POST that arrives while the tier is OPEN is refused at arrival (`§2.3` item 2) — **it never reaches the epoch**;
   - a POST that arrives while the tier is CLOSED reads the epoch **once, at arrival**, and carries it for the request's
     lifetime;
   - **THE STRADDLE CASE (the request that straddles the transition)**: a POST that arrived under `'mcp-enabled'` and
     whose handler is still in flight when `'mcp-disabled'` is entered **takes the same in-flight path as stdio**: its
     dispatched renderer work is rejected by `abandonPendingForExclusion` with the declared token, its result is
     `{status:'refused', reason:'exclusion-closed'}`, and it is delivered over the SAME response stream the transport
     already owns — **the straddling request is NOT re-answered with a 503** (its headers are long since sent: the
     streamable transport writes them when the request is handled, `L` `:941`). **A design that answers a straddling
     POST with a second status line FAILS `P-EX-IM-2`'s drive cell (g)** (it would corrupt an already-committed response).
   - **a straddling request is bounded by the landed `invokeTimeoutMs`** (60 000 ms) — the pin is not a second timer;
     it is the epoch's staleness, and the invalidation is what settles the call EARLY (`§2.2` item 4's evidence).
4. **THE TRANSPORT-AGNOSTIC RULE, STATED SO NEITHER TRANSPORT CAN BE SPECIFIED TWICE**: the refusal's HOME is the
   predicate and the answer's SHAPE is `ExclusionReceipt`; the transports differ ONLY in how the refusal is DELIVERED
   (a tool result / an isError text on stdio; a 503 + a JSON-RPC error object at POST arrival on HTTP). **A pass that
   implements the exclusion as a transport-specific special case — an stdio-only check, or an HTTP-only arm without the
   invocation turn — FAILS `P-EX-IM-2`'s drive cells (g)/(h).**

### 2.4 THE OPERATOR SURFACE AND THE LIVE BATTERY

1. **THE CONTROL'S HOME IS THE ISOLATED PANE GRAPH, AS PROVIMENT-AUTHORED DATA** (`T`, `CONTRACT`; `AGENTS.md`'s
   project-wide UI-rendering constraint: *"All UI elements that are not directly part of the Electron shell itself …
   MUST be rendered with the provident framework — authored as provident-ssr data … and driven through the producing
   graph, NOT as hand-written HTML/DOM in the renderer"*; `R` `§6` column 3: *"ONE new operator control in
   `src/renderer/secure-panels.ts`"*). **A hand-written DOM control is a review finding**, and the pane's own channel is
   the right one because `D-SCOPE` declares the manual-UI channel NOT an MCP method (the dossier's `§5` `A-4` row).
2. **THE EXACT AUTHORED SURFACE** (`T`, `CONTRACT`; `§0A` item 4; `[U]`). ONE new node plus its label, added inside
   the landed `settings-pane` section of `paneEnvelope()` (`L` `secure-panels.ts:156-197`) — exactly the landed
   `journal-length` row's shape (`L` `:181-196`, the SAME `group-row` class + `token-row` inner div + `<button>` +
   handler), so the addition introduces **no new class, no new CSS and no new structural pattern**:
   - a `label`-typed node with `content` naming the control (the operator's wording: the MCP/tier exclusion);
   - a `button`-typed node with `props.id = 'exclusion-toggle'`, `css.classes = ['btn']`, whose `content` is refreshed
     from the state, and whose handler is ONE function-STRING body (`EXCLUSION_TOGGLE_BODY`) that calls
     `window.provident.security.setExclusion(<the target state>)` with the SAME `!s` early-return guard as its four
     landed siblings (`L` `:107-136`).
   **DECLARED, NOT IMPLIED**: the body reads the CURRENT state from the node's own props (`data-state`, refreshed by
   `syncConfig` exactly as the group toggles' `data-on` is — `L` `:437-441`), so the body is stateless and the toggle
   is a pure flip — the landed `TOGGLE_BODY` pattern (`L` `:119-126`).
3. **THE OFF-STATE'S OBSERVABILITY** (`T`, `CONTRACT`; `§0A` item 5). The landed `security-status` mutation
   (`L` `secure-panels.ts:430-432`) gains ONE **trailing segment** — `· MCP: enabled` / `· MCP: disabled` — and nothing
   else about the line moves. **The toggle's own `content`** carries the affordance word (`Enable MCP` / `Disable MCP`),
   refreshed by the same `syncConfig` pass. **Why the existing node**: a new node is a new rendered surface with its own
   `[U]` row, and the obligation (`§0A` item 5) is met by a segment; a dedicated node is a one-row amendment.
4. **THE MANUAL-UI CHANNEL — ONE NEW CONSTANT, ONE NEW PRELOAD MEMBER, ONE ADDITIVE RESPONSE MEMBER** (`T`, `CONTRACT`;
   `[H]`; `docs/specs/store-persist.md` `§2.2` items 2/3's single-source + import rules):
   - **`IPC_SECURITY_EXCLUSION = 'provident:security:exclusion'`** lives in `src/main/store-channels.ts` (the
     host-side channel-name module), reaching `main.ts` and `preload.ts` by IMPORT — **it does NOT enter
     `src/shared/types.ts`** (`§1.3` item 9);
   - the preload's `security` object gains **ONE member**: `setExclusion(state: 'mcp-enabled' | 'mcp-disabled'):
     Promise<{ applied: boolean; state: 'mcp-enabled' | 'mcp-disabled'; reason?: 'malformed-state' }>`;
   - the `IPC_SECURITY_GET` handler's response record is **EXTENDED ADDITIVELY** by one member —
     `{ ...settings, exclusion: state }` (the `write` member's landed precedent, `L` `main.ts:379`: *"the RESPONSE
     record is the post-state extended by the declared member `write`"*); **the member is NEVER absent** (`PAR-9`);
   - the `IPC_SECURITY_SET` handler's response record is **EXTENDED ADDITIVELY** by the SAME member, beside the landed
     `write` — **and the SET does NOT transition the state** (`§2.1` item 3, `T-5`);
   - **THE TRANSITION IS ITS OWN CHANNEL** (declared, reversible): `'mcp-disabled'` falls **outside**
     `SecuritySettings.enabled`'s `string[]` domain (`L` `src/shared/types.ts:316-323`), and putting the state into the
     landed `set(patch)` argument would require the landed handler to branch on a member whose whole landed contract is
     *"the operator's four settings members"* (`docs/specs/store-security.md` `§2.1` item 3). **Why a separate channel
     beats a patch member**: it keeps the transition and the settings write as two distinguishable operations (so
     `T-5` is observable rather than inferred), and it keeps `set(patch)`'s declared domain unmoved. **Reversible at
     this gate**: adding an optional `exclusion?:` member to the landed `set(patch)` path is a one-item amendment to
     `§0A` item 4 + this clause + `P-EX-TP-2`'s drive table, with no other clause moving.
   **`PAR-8` IS THIS SURFACE'S PARAMETER ROW**: a malformed payload is REFUSED AS A VALUE
   (`{ applied: false, state: <unchanged>, reason: 'malformed-state' }`), **never a throw, never a silent no-op that
   reports success.**
5. **`R` `§5.3` RACE 7 — WHO RE-ARMS THE BACKEND, AND WHY `markReady()` IS NOT THE ANSWER** (`T`, `CONTRACT`;
   `§0A` item 6; `L` `mcp-server.ts:1093-1097` — *"`markReady(): void { if (this.ready) return; this.ready = true;
   this.resolveReady?.() }`*; `L` `main.ts:430-433` — the `IPC_READY` handler). **THE PIN, THREE CLAUSES**: (a) the
   `IPC_READY` handler is **UNCHANGED** — it keeps calling `backend.markReady()` unconditionally; (b) the exclusion
   state is **NEVER derived from `backend.isReady()`** and **never cleared by `markReady()`**; (c) the transition's
   invalidation (`abandonPendingForExclusion`) **does NOT re-arm readiness** (`§2.2` item 6). **Why the landed
   `markReady()` is self-defeating as a disable mechanism, said plainly**: it is idempotent-and-permanent within a
   realm (`if (this.ready) return`) and it fires on THE RENDERER'S OWN ARRIVAL — a signal the operator cannot withhold
   and a renderer can re-send (a reload, `L` `:1078`) — so a gate that re-armed on readiness would be re-armed by the
   very party the gate exists to constrain. **A implementation in which the state is a function of `isReady()` FAILS
   `P-EX-SM-2`'s drive cell (1)** (and cells (2)–(4) for the reload/reset/no-timer arms).
6. **THE OPERATOR'S RE-ENABLE IS THE ONLY RE-ARM** (`T`, `CONTRACT`; `R` `§5.3` race 4). The transition back is the
   operator's own `setExclusion('mcp-enabled')` — the pane control (`§2.4` item 2) or the channel directly. **No
   automatic re-arm exists** — not on readiness, not on a timer, not on a renderer reload, not on an app-graph change.
   **A timer or a reload-triggered re-arm FAILS `P-EX-SM-2`'s drive cells (2)–(5)**: a timer is a policy default the operator did
   not set, and a reload-triggered re-arm gives the renderer exactly the authority `§0A` item 6 withholds.
7. **THE `[U]` OBLIGATION IS MANDATORY AND THE `STRUCTURAL` EXEMPTION IS REFUSED — in the family's three-part form**
   (`T`, `CONTRACT`; `docs/pending.md` `§R` `P-R2`: *"**RECORDED, NOT WAIVED** … **a merely-parked battery is NOT a
   gate-6 pass** (`RCA-11`), and the `G3` `STRUCTURAL` exemption … **does not hold here**"*).
   - **(1) THE PREDICATE DECISION: `TRIGGERS`.** `docs/specs/user-flow-audit.md` `§7.1` **limb A**
     (`DOM-SHIM-BLINDNESS`) holds because this unit **adds a rendered surface** — an element (the toggle node), a text
     (its label, its `content`, the status line's `MCP:` segment), a class (`group-row`/`btn`), and the operator-visible
     flow those author; **limb B** (`UI-OVERHAUL`) holds because it **changes a user-visible flow** — an interaction a
     user performs and observes, whose result (the MCP server's availability) is visible in a real host. **The decision
     is RECORDED with this evidence, per that file's item 1: never from preference and never from convenience.**
   - **(2) THE `§5.U` DELTA MATRIX IS OWED, ≤ `8` U-rows** (`docs/specs/gutter-ui.md` `§5.U` is the landed shape this
     file imports; `docs/specs/user-flow-audit.md` `§5` item 2), each row carrying a **pre** observation, a **post**
     observation that is **MEASURED at the live gate and never projected**, a **layer** label (`[U]`/`[H]`/`[T]`), and
     **the exact instrument that can read it**. **THIS SPEC DECLARES THE ROW SET'S SUBJECTS** (the TestWriter/the live
     runner authors the matrix itself; `docs/specs/user-flow-audit.md` `§5` forbids this file from re-deriving the
     values): (U-1) the toggle node RENDERS in the isolated pane graph with its label; (U-2) clicking it moves the
     status line's `MCP:` segment `enabled → disabled`; (U-3) with the state `'mcp-disabled'`, an MCP tool call answers
     the declared refusal; (U-4) clicking it back moves the segment `disabled → enabled` and restores tool answers;
     (U-5) the app graph's `get_rendered_html` / `list_targets` NEVER contain the pane control (the D1–D8 isolation
     holds with the new node); (U-6) the disabled state survives a renderer reload (the state is main-side, not
     renderer-side) while a RESTART returns to `'mcp-enabled'`; (U-7) the stdio transport stays CONNECTED across the
     transition (no disconnect, no re-registration of the transport).
     **THE CAP READS `7 of ≤8`, AND THE EIGHTH SUBJECT IS NOT CLAIMED AS A FLOW** (`T`, `CONTRACT`; **⟶ DEMOTED
     2026-10-05 BY THE REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE; the as-filed eighth subject is kept visible
     below as the battery note it actually is**): **`7` U-row SUBJECTS = the unit's user-visible flows; the cap's
     eighth slot is NOT used by an eighth flow.** **THE AS-FILED EIGHTH SUBJECT, KEPT VISIBLE AND RE-CLASSED**:
     *"(U-8) the state returns to `'mcp-enabled'` after the battery (the battery leaves the tree in its starting
     state)"* — **this is TEST HYGIENE / a PRECONDITION, not a flow this unit changes**: the unit authors no behavior
     whose teardown is operator-visible, and `docs/specs/user-flow-audit.md` `§7.1`'s predicate is about **flows the
     unit changes** (this unit adds no behavior in which the battery's own exit is a user-visible flow). **IT IS
     CARRIED AS THE MATRIX'S PRECONDITION / BATTERY NOTE** — the matrix records that the run restores `'mcp-enabled'`
     before completion (so a re-run starts clean), and **that note is NOT counted as a U-row.** **THE HONEST CAP
     STATEMENT: `7 of ≤8` — the cap is NOT fully used, and NO eighth flow is invented to fill it.** If the live run
     surfaces a genuinely NEW user-visible flow, it is added as a row and the count is printed with its terms — **the
     cap is a SIGNAL, not a ceiling and never a quota** (`AGENTS.md` item 11(f): *"never a ceiling and never a reason to
     drop, merge or leave unenumerated a discernible property"*).
   - **(3) THE `§6.1` COVERAGE REPORT IS OWED**, with that file's declared fields (`unit` · `matrixSource` ·
     `predicateSource` = *this* obligation's source, i.e. `docs/specs/secure-exclusion.md` `§2.4` item 7, which cites
     `docs/specs/user-flow-audit.md` `§7.1` · `predicateSourcePresent: true` (that file exists — filed 2026-09-27) ·
     `emitter` · `rows[]` · `summary.total`), and with its six falsifiable clauses: **`summary.total === `the matrix's U-row
     count, and the per-verdict counts SUM TO IT** (a short, zero-row or disagreeing total is **INVALID**); **every
     `post` is MEASURED, never projected**; **every `instrument` comes from the CLOSED set** (a shipped tool, a literal
     command line, `MANUAL`, or `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT` — **a row naming "the live gate" or "the leg"
     names NO instrument and FAILS**); **every `cmd` is a literal command line or the literal `MANUAL`, with its own
     exit code**; **a `MANUAL` row's observation is an operator observation, and a `NOT-OBSERVABLE` row carries its
     STRUCTURAL reason**; **the predicate's decision is recorded**.
   - **(4) THE `§6.2` READ-ONLY AUDIT IS OWED**, taken by a party that **did not author the matrix** (`AGENTS.md` item
     10a/RCA-4's independence rule), discharging that file's six duties (reconcile the total row by row; reconcile every
     verdict against the recorded observation and the named instrument; check the predicate's source is filed and
     current; check for projection; **report, do not silently fix**; **never upgrade a layer** — a `[T]`/node-suite
     green is NOT assembled-app evidence).
   - **(5) THE `G3` `STRUCTURAL` EXEMPTION'S CONDITION IS NOT SATISFIED, AND THE REFUSAL IS POSITIVE.** `docs/specs/
     store-security.md` `CURRENT STATE` item 8's condition — *"this unit authors no rendered surface, no element, no
     text, no class and no slot content"* — is **false of this unit on all five counts** (`§2.4` item 2 authors an
     element, a text, a class and content; no slot content is authored by EITHER unit, and that one clause is
     satisfied — **the condition is a CONJUNCTION, so one false clause makes it false**, and the honest form is to say
     which clause holds and which does not rather than to quote the whole sentence as failed). **The `ui` and
     divergence legs both EXIST and are green (`docs/specs/ci-ui-leg.md`), so the refusal is not about availability**,
     and `docs/specs/zones.md` `§4.4 S-6` is carried VERBATIM: *"the row may not be moved to the `ui` leg
     silently."*
   - **(6) `[D]` IS NOT CLAIMED** — `PRECONDITION-GATED`, not implied; **no third `SCENARIO_KINDS` member is added and
     `docs/specs/ci-divergence-leg.md` is NOT amended** (its kind set stays CLOSED AT TWO).

### 2.5 THE REFUSAL TOKEN'S HOME — a CHANNEL token, not a store-union member

1. **THE CLOSED FORM** (`T`, `CONTRACT`; `§0A` item 2; `A` `D-GATE` clause (2); the dossier's `§5` `A-6` row).
   `ExclusionReceipt = { status: 'refused'; reason: 'exclusion-closed' }` — **ONE closed form, ONE closed token.** It
   is produced at the three sites `§1.5` item 2 names and **nowhere else**.
2. **NOT A MEMBER OF THE STORE'S CLOSED 16-MEMBER REFUSAL UNION — THE UNION STAYS `16`** (`T`, `CONTRACT`, `NEGATIVE`;
   `A` `D-GATE` clause (2): *"a second security token added to that union is a collision finding"*; `S`
   `store-core-graph.md` `§2.1`'s block annotation: `16 = 8` held + `5` + `3`; `L` `src/main/security-store.ts:16-23` —
   the `SecurityWriteReceipt` precedent, whose `'write-failed'` is *deliberately* not a union member). **The union's
   operand groups are printed so the pin is checkable, not paraphraseable**: the HELD `8` —
   `'undeclared-name'` · `'malformed-name'` · `'secure-refused'` · `'reserved-name'` · `'malformed-pattern'` ·
   `'cap-exceeded'` · `'ambiguous-path'` · `'reserved-namespace'`; the store contract's amendment's `5` —
   `'duplicate-path-tier'` · `'no-such-anchor'` · `'severed-link'` · `'rebuild-failed'` · `'tier-filter-miss'`; the two
   architect amendments' `3` — `'serialize-failed'` · `'validate-failed'` · `'durability-inversion'`. **`8 + 5 + 3 = 16` ✓,
   and `'exclusion-closed'` appears in NO group.** **A diff that adds a token to the union, or that spells
   `'exclusion-closed'` inside `src/renderer/store-core-graph.ts`, is a COLLISION finding** (`P-EX-IM-2`'s static half).
3. **THE PRECEDENT'S SECOND HALF, CARRIED**: the channel's tokens are the channel's — `docs/specs/store-persist.md`
   `§0A` item 8's form (*"the channel answers `{status:'refused', reason}` with `reason ∈ {'malformed-payload',
   'write-failed'}` — TWO tokens, the channel's own, **NOT members of the store's 16-member refusal union**"*). **The
   exclusion's channel therefore has TWO tokens of its own**: `'exclusion-closed'` (the state refusal, `§2.5` item 1)
   and `'malformed-state'` (the payload refusal, `PAR-8`) — **both OUTSIDE the union, and neither a third store token.**
4. **THE TOKEN IS NEVER A THROW** (`T`, `CONTRACT`, `NEGATIVE`). The refusal is a VALUE at all three depths
   (`§2.2` item 5, `§2.3` item 2, `PAR-8`). **A refusal that throws — anywhere — FAILS `P-EX-TP-1`.**

### 2.6 THE DECISION SITE — `main` supplies STATE; the store keeps the DECISION

1. **THE RULE** (`T`, `CONTRACT`; `A`; `R` `§2`'s `C-12`/`F-11`, quoted at `§0` ruling 7): the store's single
   `B-SECURE-GATE` **keeps the DECISION**; this unit's main-side code supplies **STATE** and nothing else. **`main`'s
   question is *"is the exclusion state open or closed?"* — never *"is this name `secure.*`?"*, never *"should this
   reference be refused?"*, and never *"which reason token applies?"*.**
2. **THE NEGATIVE ROW — THE SECOND-AUTHORITY FINDING, STATED AS A ROW SO IT CAN FAIL A PASS** (`T`, `NEGATIVE`; `A`;
   `R` `§2`'s `C-12`; `S` `store-core-graph.md` `§2.2`'s `P-7`'s *"no second authority"* discipline):

   | The row | What it FAILS on | Why it is a finding, not a style note |
   | --- | --- | --- |
   | **N-1 — NO `secure.*` SEGMENT CHECK IN `main`** | ANY byte of this unit's diff that (a) tests a string for a leading `'secure.'`/`'secure'` segment, (b) splits a reference name on `.` to inspect its first segment, (c) maps a name to a refusal, or (d) constructs a `{status:'refused', reason:…}` record for a NAME (as opposed to the exclusion STATE) | It would be a SECOND authority over the store's own decision, on a surface that has no access to the register, the traversal, the precedence order or the union — so the two authorities would drift the first time either moves. **The store's refusal is decided BEFORE the register and BEFORE any traversal (`S` `§2.5` items 1/2); nothing in `main` can reproduce that decision.** |
   | **N-2 — NO SECOND AUTHORITY OVER THE ENABLED-GROUP SET** (`A`; `R` `§2` `C-1`/`C-8`) | ANY copy, snapshot, memo or derived holder of the enabled-group set taken for the exclusion's decision; ANY sixth `VALID_GROUPS` member; ANY change to the default set | `SecurityGate._config` is the ONE holder (`L` `security.ts:185-191`); a copy is the *"third unordered holder"* `R` `§5.3` race 2 forbids. The exclusion is a SEPARATE AXIS (`CURRENT STATE` item 4). |
   | **N-3 — NO EXCLUSION READ FROM THE GENERIC SURFACE** | ANY tier-4 read, any `secure.*` reference, any generic-surface call introduced by this unit | The forbidden carriers stand (`§1.3` item 8); the exclusion is a CHANNEL state, not a tier-4 value, and it is not stored in, read from or carried by the store. |
   | **N-4 — NO `RpcMethod` MEMBER FOR THE EXCLUSION** (`A`; `docs/specs/ci-ui-leg.md` `§0` prohibition 5) | ANY new `RpcMethod` member, any new `MUTATING_METHODS` entry, any new `ALL_TOOLS`/`ALL_RESOURCES` member | A method member would make the exclusion's state or its transition reachable from the agent-facing request path — the exact surface the gate exists to constrain (`D-SCOPE`'s *"the MCP server's tool surface ∪ resource surface ∪ notification surface"*). |
   | **N-5 — NO NEW PERSISTED ARTIFACT** (`A` `D-19`) | ANY new key in `provident-security.json`, ANY third filename, ANY write to a file for the state | The exactly-two persisted-file pin stands (`§1.3` item 7); the state's non-persistence IS the fail-safe guarantee (`§2.1` item 5). |

3. **THE ADDITIVE-SURFACE CENSUS — THE ONE PLACE THIS UNIT MOVES A COUNT, PRINTED WITH ITS TERMS** (`T`, `CENSUS`):
   **`5` surfaces · `8` distinct additions · the constant before-value read separately** —
   `store-channels.ts`'s constant census **`2 → 3`** (adds `1`: `IPC_SECURITY_EXCLUSION`); the preload's `security`
   member set **`2 → 3`** (adds `1`: `setExclusion`) — **and its `get()`'s declared return widens, which is `PAR-13`'s
   `1` declaration-site change, counted separately below**; the `SecurityGate`'s public member set **adds `3`**
   (`exclusion` · `exclusionState` · `withExclusion`); the `RendererBackend`'s public member set **adds `1`**
   (`abandonPendingForExclusion`); `paneEnvelope()`'s authored node census **adds `2`** (the label node + the toggle
   node). **THE ADDITION TOTAL IS THE SUM OF ITS OWN ADDITIONS: `1 + 1 + 3 + 1 + 2 = 8` distinct additions ✓** (a
   *before-value* is **not** an addition and is therefore **NOT** a term of that total). **THE CONSTANT BEFORE-VALUE IS
   A SEPARATE READING, NOT A TERM**: the census's two starting constants (`store-channels.ts`'s landed `2`) and the two
   starting preload members (the landed `2`) are **before-values**; they are printed here so a reader can check the
   `2 → 3` transitions, and **they are not added into `8`** — the family rule this honours is
   `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`: **a total that is not the sum of its own printed terms is a review
   finding.** **THE `PAR-13` DECLARATION-SITE WIDENING, COUNTED SEPARATELY** (`§1.5` item 5): **`1` declared-return
   widening at `2` declaration sites** (`L` `src/main/preload.ts:30`; `L` `src/renderer/secure-panels.ts:43`) — a
   **type-level** widening that adds **no runtime member and no new surface**, which is why it is not folded into the
   `8`. **THE FIVE SURFACES are `store-channels.ts` · the preload · `SecurityGate` · `RendererBackend` ·
   `paneEnvelope()`** — and **every one of the `8` additions is main-side or pane-side, and none is an MCP surface.**
   **THE UNMOVED SET, so the census is checkable**:
   `ALL_TOOLS` `22` · `RpcMethod` `22` · `MUTATING_METHODS` `7` · `VALID_GROUPS` `5` · the default enabled-group set
   `{read, dispatch}` · the `scripts` key set · the persisted-file set `{provident-security.json,
   provident-settings.json}` · the store's refusal union `16` · the store's persisted-file writer count `1`.
4. **THE TIER-4 INVISIBILITY HOLDS BY CONSTRUCTION — and it is WHY the state cannot leak** (`T`, `CONTRACT`; `A`;
   `docs/specs/store-security.md` `CURRENT STATE` item 6). The exclusion state is **not a tier-4 value**: it is a
   main-side boolean-shaped record, it is never read from the tier, and it reaches the renderer ONLY as the manual-UI
   channel's `exclusion` member (`PAR-9`) — **so no graph node, no tool result, no resource and no notification payload
   can carry it**, and a payload class that DID carry it would be a finding (the four carriers stay empty of tier-4
   values, and the exclusion is not one of them). **Stated the other way, so it is falsifiable**: a row that finds the
   exclusion state inside a graph node, a tool result payload, a resource payload or a notification payload FAILS —
   **not because the state is secret, but because a STATE reaching an agent-facing carrier would let an agent read the
   gate it is subject to, which `D-SCOPE`'s scope exists to prevent.** The `resources/updated` notification is the one
   carrier whose predicate this unit touches (`L` `mcp-server.ts:573-587`): **the notify path is NOT re-aimed at the
   exclusion** — its landed gate-aware check (`n5`) is unchanged, and no new notification is emitted on a transition
   (`P-EX-IM-4`).
   **WHY THE NOTIFICATION SURFACE NEEDS NO REFUSAL, STATED SO `D-SCOPE`'s THIRD MEMBER IS CLOSED BY SOMETHING** (`T`,
   `CONTRACT`): the notification surface is inside `D-SCOPE` as a **CARRIER, not an invocable method** — a notification
   is an **outbound PUSH** the server initiates, so there is **nothing for `exclusionAllowsWork` to refuse** (the
   predicate's domain is *reachable methods*, `§2.2` item 1, and a push is not a call a caller can make). It is closed
   instead **by its NOT CARRYING the exclusion state**: no notification payload holds the state or any tier-4 value
   (`§2.6` item 4's four-carrier emptiness), and no new notification is emitted on a transition — **the register cell
   that drives this closure is `P-EX-IM-4`'s carrier/notify probes (4)/(1)–(3)**, which read the notification payload's
   member set and the `notifyGraphChanged` call count across a transition. **A design that treats the notification
   surface as needing its own refusal clause is over-reading `D-SCOPE`; a design that lets the state ride a payload
   FAILS `P-EX-IM-4`.**

### 2.7 `D-18` — the gate is ADDED BESIDE the isolated pane graph

1. **D1–D8 STANDS** (`T`, `CROSS-REF`; `A` `D-18`: *"Add the gate, keep D1–D8"*; `docs/specs/secure-panels.md` `§2`,
   `§4`, `§5a`–`§5e`). **This unit retires, demotes, moves, re-homes, merges or re-authors NOTHING of the pane
   graph.** The five landed adversarial suites keep their subjects.
2. **THE THREAT THE GRAPH CLOSES IS EXACTLY WHAT A SWITCH CANNOT CLOSE** (`T`, `CROSS-REF`; `R` `§4`'s critique
   disposition and `§5.3`'s closing paragraph). The graph closes **reachability from the MCP-visible app graph** — including
   the case of **an operator socially induced by agent-authored content to open the store**: the induction cannot
   reach the control, because the app graph (which agent-authored content lives in and which `provident.dispatch` drives)
   cannot see or dispatch the pane's nodes (`docs/specs/secure-panels.md` `§4`: *"`Runtime.dispatch`/`get_rendered_html`/
   `list_targets`/`get_markdown`/`get_node_state` … NEVER see the security controls"*). The gate closes **temporal
   co-availability in main**. **Neither closes the other's path** — which is why both are kept (`R` `§5.3`'s
   *"Is the mutual exclusion STRONGER or WEAKER than the isolated graph … Neither"* paragraph).
3. **THE `cfg` SNAPSHOT STAYS OUT OF THE GENERIC STORE** (`T`, `CONTRACT`, `NEGATIVE`; `A` `D-18`; `R` `§5.2`'s
   *"NEITHER — IT STANDS"* row; `docs/pending.md` `§R` `P-R5`). `data-ownership-model-plan.md` `§2.3` row **2.4-12**
   is **NOT superseded** and needs **no RE-NAME REQUEST**: its second sentence — *"It must NOT be re-homed into a
   generic store — routing the security snapshot through the generic read would put `secure.*` inside a fall-through
   structure"* — **stands**, because the pane keeps its `cfg` over the manual-UI channel (`L` `secure-panels.ts:397-404`)
   and the tier is **never** opened for the pane's snapshot path. **The new control uses the SAME channel the snapshot
   already uses** — so `D-18`'s narrow reading is preserved by CONSTRUCTION, not by discipline: there is no new
   renderer-originated access to the store.
4. **THE DOCUMENTATION HALF IS ROUTED, NOT LANDED** (`docs/pending.md` `§R` `P-R5`; `§1.3` item 10): the D1–D8
   **re-labelling as defence-in-depth beside the gate** belongs to the pass that lands the corresponding half —
   **annotation BESIDE, never a rewrite**. **This spec asserts the re-labelling as OWED-with-owner and files no
   amendment to `docs/specs/secure-panels.md`** (a spec-filing pass may not edit another spec, `§1.3` item 10).
5. **THE ANALYSIS' GIFT TO THIS UNIT, STATED SO IT IS NOT LOST** (`T`, `CROSS-REF`; `R` `§5.3`'s closing paragraph):
   *"For the concrete threat 'an agent reads the operator's token': the graph alone is obscurity …; the store's own
   refusal is the strong barrier; and the gate is the enforcement that survives a future widening of the store's
   surface."* **This unit is therefore the enforcement that must remain correct WHEN `S2` WIDENS THE TIER** — which is
   why its contract is written to be satisfiable **with the tier exactly as it is today** (`CURRENT STATE` item 2) while
   its STATE record is deliberately **independent of the tier's shape**.
6. **`D-CLAUSE-2` IS NOT CONTRADICTED** (`T`, `CONTRACT`, `NEGATIVE`). The exclusion is an **access-control** state and
   changes **no residency**: it creates no lower-tier alias, clears no holder, refuses nothing on account of a same-path
   copy and creates no cross-tier interaction (`A` `D-CLAUSE-2`; the dossier's `§5` `A-3`/`A-8`). **A design in which
   opening the tier writes, clears or re-tiers anything FAILS this clause.**

---

## 3. Behaviour (every state / fail-state)

### 3.1 Valid / happy states

**⟶ RE-PREFIXED 2026-10-05 (THE REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE, the same rename recorded at `§5.5`
item 2 and `§7a` `OW-7`): the `M-` space below was as-filed `M-1`…`M-9` and is now **`M-EX-1`…`M-EX-9`**, because the
`G3` unit's `docs/specs/store-security.md` owns **`M-1`…`M-8`** in its own behavioural table. No cell's content, subject
or row count moved.**

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-EX-1** | **A boot resolves to the SAFE pair** | `main()` runs with NO persisted exclusion key (every case: cold, missing, corrupt, torn, empty) | the gate is constructed `'mcp-enabled'`; `exclusionState()` answers `'mcp-enabled'`; `exclusion` answers `{mcpEnabled:true, tier4Open:false}`; no file is read for the state (the exclusion flag has no persistence path) | `§2.1` items 4/5, `P-EX-SM-3` | `[H]` |
| **M-EX-2** | **The operator opens the tier** | `setExclusion('mcp-disabled')` over the manual-UI channel, from `'mcp-enabled'` | the gate's record becomes `'mcp-disabled'`; the pair becomes `{mcpEnabled:false, tier4Open:true}`; the epoch BUMPs by `1`; the in-flight invalidation runs (returning the count of entries it rejected); the registered tool/resource handles are toggled `enabled:false`; the stdio server stays CONNECTED; the handler answers `{applied:true, state:'mcp-disabled'}` | `§2.1` item 3 `T-1`, `§2.2` items 3/4, `P-EX-SM-1`/`P-EX-SM-2` | `[H]` |
| **M-EX-3** | **The operator closes the tier** | `setExclusion('mcp-enabled')` from `'mcp-disabled'` | the record becomes `'mcp-enabled'`; the epoch BUMPs; the invalidation runs; the handles are toggled per the ENABLED-GROUP set (the landed predicate `toolAllowed`, unchanged) and newly-allowed tools are registered on the live stdio server; the handler answers `{applied:true, state:'mcp-enabled'}` | `§2.1` item 3 `T-2`, `§2.3` item 1, `P-EX-SM-1`/`P-EX-SM-2` | `[H]` |
| **M-EX-4** | **A self-transition is a legal no-op** | `setExclusion(<the current state>)` | the state is UNCHANGED; **the epoch does NOT move**; **the invalidation does NOT run** (its count stays `0` for that call); the toggles are re-applied idempotently; the handler answers `{applied:true, state:<unchanged>}` | `§2.1` item 3 `T-3`, `P-EX-SM-2` | `[H]` |
| **M-EX-5** | **The invocation turn refuses while the tier is open** | any MCP tool call / resource read while the state is `'mcp-disabled'` | the call is answered the VALUE `{status:'refused', reason:'exclusion-closed'}` **before any renderer dispatch**; no `pending` entry is created; no epoch is stamped; the renderer never sees the call | `§2.2` items 1/2, `P-EX-IM-2`/`P-EX-TP-1` | `[H]` |
| **M-EX-6** | **The HTTP POST is refused at arrival while the tier is open** | `POST /mcp` with a VALID bearer token while the state is `'mcp-disabled'` | HTTP `503` with `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}`; **the body is not read and no per-POST server is built** (observable: the created-server set does not grow) | `§2.3` items 2/3, `P-EX-IM-2`'s drive cell (g), `P-EX-TP-1`'s HTTP refusal class | `[H]` |
| **M-EX-7** | **The manual-UI channel carries the state on BOTH reads and writes** | `IPC_SECURITY_GET`, then an `IPC_SECURITY_SET` (token/groups/journal), then `IPC_SECURITY_GET` | both GET responses carry `exclusion` (never absent); the SET response carries `exclusion` BESIDE the landed `write` member; **the SET does NOT change the state and does NOT bump the epoch** | `§2.4` item 4, `PAR-9`, `P-EX-TP-2` | `[H]` |
| **M-EX-8** | **The pane renders the control and the off-state** | `SecurePanels` constructed on a mount; `refresh()` resolves; then the state is `'mcp-disabled'` and `refresh()` runs again | the toggle node exists in the PANE graph with its handler and its `data-state`; the label node exists; the `security-status` line's trailing segment reads `· MCP: disabled`; the toggle's `content` names the return affordance; the app graph's `renderedHtmlResult()`/`listTargets()` contain NONE of it | `§2.4` items 2/3, `§2.7` item 1, `P-EX-IM-4`'s isolation cells (a)/(b) | `[U]`/`[H]` |
| **M-EX-9** | **The landed re-gate is COMPOSED WITH, not rewritten** | an `IPC_SECURITY_SET` that changes the enabled-group set, on a running server | `applyGatePatch` is called exactly as today (`L` `main.ts:381`); the live handles follow the GROUP set; the EXCLUSION state is untouched | `§2.6` item 1, `§2.1` item 3 `T-5`, `docs/specs/store-security.md` `§0A` item 8` | `[H]` |

### 3.2 Documented fail-states / non-happy states

**⟶ RE-PREFIXED 2026-10-05 (THE REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE): the `FS-` space below was as-filed
`FS-1`…`FS-15` and is now **`FS-EX-1`…`FS-EX-15`**. The sibling `docs/specs/store-security.md` owns `F-1`…`F-10`; its
`F-n` form is itself a different space, and **this file's `FS-`-prefixed form was never in collision** — the rename is
taken for CONSISTENCY with the unit's new `-EX-` namespace (one unit, one prefix, no mixed forms), and it removes the
last place where a bare id could be mistaken for a sibling row. No cell's content, subject or row count moved.**

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **FS-EX-1** | **An in-flight class-A call answers the DECLARED token, never a third state** | a call accepted under `'mcp-enabled'`, dispatched to the renderer, still pending when `setExclusion('mcp-disabled')` runs; mcp-server-transport = `stdio` | the pending entry is rejected by `abandonPendingForExclusion`; the tool results as the declared refusal `{status:'refused', reason:'exclusion-closed'}`; the token appears VERBATIM; **no renderer value is delivered**; **no exemption for the reply that races the transition** | `§2.2` items 4/5, `P-EX-IM-3`'s cells (a)/(b) | `[H]` |
| **FS-EX-2** | **A call accepted BEFORE the transition and refused AT its turn answers the SAME token** | a call whose handler runs after the state changed but whose payload was queued before | the invocation-turn refusal answers `{status:'refused', reason:'exclusion-closed'}` — **the same token, a VALUE, never a throw** | `§2.2` items 1/2/5, `P-EX-TP-1` | `[H]` |
| **FS-EX-3** | **A call accepted AFTER the transition is refused at the invocation turn, and no `pending` entry exists** | any tool call while the state is `'mcp-disabled'` | the refusal is answered before the backend is touched; `pendingCount()` does NOT grow; **the epoch is not stamped** | `§2.2` items 1/2/3, `P-EX-SM-1` | `[H]` |
| **FS-EX-4** | **A crash between "disable MCP" and "open the tier" resolves SAFE** | the process is killed at any point between the two operator-visible steps, then restarted | the next boot is M-EX-1: the state is `'mcp-enabled'`, because there is NO persisted trace of either step; a torn security file is indistinguishable from cold (`L` `security-store.ts:53-61`) | `§2.1` items 4/5, `P-EX-SM-3` | `[H]` |
| **FS-EX-5** | **An operator who never re-enables MCP is not made sticky** | the state stays `'mcp-disabled'` for the session; the app is restarted | the restarted app is M-EX-1 (safe pair); within the session, the state is observable (`MCP: disabled`) and the return path is offered — **a session that never re-enables loses only the MCP surface, never the app's own boot ingestion** (`D-19` orders the ingestion BEFORE the enable) | `§2.1` item 7, `§2.4` items 2/3 | `[H]`/`[U]` |
| **FS-EX-6** | **`markReady()` does NOT re-arm the exclusion** | the renderer signals `IPC_READY` while the state is `'mcp-disabled'` | `backend.markReady()` runs (landed, unchanged); the exclusion state is UNCHANGED; **the tool handles stay disabled; the invocation turn still refuses** | `§2.4` item 5, `P-EX-SM-2`'s drive cell (1) | `[H]` |
| **FS-EX-7** | **A renderer reload does NOT re-arm the exclusion** | a reload while the state is `'mcp-disabled'` | `handleReset` runs (landed: pending rejected, readiness re-armed); the exclusion state is UNCHANGED; the transition does not re-arm readiness and is not re-armed by readiness | `§2.4` items 5/6, `P-EX-SM-2`'s drive cells (2)/(3) | `[H]` |
| **FS-EX-8** | **A malformed transition payload is REFUSED AS A VALUE** | `setExclusion` invoked with a bare boolean, a number, an object, `undefined`, `null`, `'MCP-DISABLED'`, `'mcp_disabled'`, `'mcp-disabled '` or an unknown string | the handler answers `{applied:false, state:<the UNCHANGED state>, reason:'malformed-state'}`; **no throw**; **the epoch does NOT move**; **the invalidation does NOT run** | `PAR-8`, `P-EX-TP-2` | `[H]` |
| **FS-EX-9** | **An unauthorized HTTP POST is answered 401 before anything else, in BOTH states** | `POST /mcp` with NO/incorrect bearer token, in either state | the landed 401 arm answers first (`code:-32001`) in BOTH states — **the exclusion 503 is never reachable without a valid token** (the oracle pin, `§0A` item 7(a)) | `§2.3` item 2, `P-EX-IM-2`'s drive cells (g)/(h) | `[H]` |
| **FS-EX-10** | **A straddling POST is not re-answered** | a POST that arrived under `'mcp-enabled'`, still in flight when the transition runs | the in-flight result is the declared refusal, delivered **over the SAME response stream**; **no second status line is written** | `§2.3` item 3, `P-EX-IM-3`'s cell (a) | `[H]` |
| **FS-EX-11** | **An outside-value transition is a no-op on the gate, not a throw** | `withExclusion(<outside value>)` called directly on a gate | the receiver's state is UNCHANGED; no epoch bump; no invalidation; **no throw** — the returned instance answers the same state as the receiver | `PAR-3`, `P-EX-SM-1`'s transition class T-4 | `[H]` |
| **FS-EX-12** | **A second holder would FAIL the single-home row** | a second `SecurityGate` constructed from the same options, then the SERVER's gate transitioned | the second gate does NOT observe the transition (it is a different object) and **the process has exactly ONE live gate for the exclusion — the server's own `_gate`, which the transition REPLACES (`L` `mcp-server.ts:441`'s `applyGatePatch` precedent)**; **a design that reads a module-level mutable record FAILS `P-EX-IM-3`'s cell (g)** | `§2.1` item 6, `P-EX-IM-3`'s cell (g) | `[H]` |
| **FS-EX-13** | **A `secure.*` segment check anywhere in the diff FAILS the decision-site row** | any byte of the diff spelling a `secure`-segment test, a name→refusal mapping, or a refusal record for a NAME | the no-second-authority census reddens — a `P-7` COLLISION finding | `§2.6` item 2 `N-1`, `P-EX-IM-2`'s drive cell (i) | `[T]` (static) |
| **FS-EX-14** | **A union extension FAILS the channel-token row** | a new member added to the store's 16-member refusal union, or `'exclusion-closed'` spelled inside the store module | the union's count moves off `16`; the token's home is wrong — a COLLISION finding | `§2.5` item 2, `P-EX-IM-2`'s drive cell (j) | `[T]` (static) |
| **FS-EX-15** | **A frozen-artifact byte moving FAILS the boundary row** | any byte change in `src/renderer/store-core-graph.ts`, `src/renderer/store-graph-references.ts`, `docs/specs/store-core-module-store-core-graph-surface.md` or `src/main/security-store.ts` | the boundary census reddens: **this unit touches NO frozen artifact and NO store byte** (the unit would be mis-designed — `CURRENT STATE`'s head paragraph) | `§1.3` item 1, `P-EX-IM-2`'s drive cells (j)/(k)/(l) | `[T]` (static) |

### 3.3 Invariants that hold in every state

**⟶ RE-PREFIXED 2026-10-05 (THE REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE): the `I-` space below was as-filed
`I-1`…`I-12` and is now **`I-EX-1`…`I-EX-12`**, because the `G3` unit's `docs/specs/store-security.md` owns
**`I-1`…`I-8`** in its own invariant list. No invariant's content, subject or count moved.**

1. **`I-EX-1` — THE TWO READINGS OF THE EXCLUSION RECORD CANNOT DISAGREE**; the illegal pair is unspellable, not merely forbidden (`§2.1` item 1; `P-EX-IM-1`).
2. **`I-EX-2` — THE STATE IS PROCESS-GLOBAL AND SINGLE-VALUED**; one record, one live gate, no per-window and no per-realm copy (`§2.1` item 6; `P-EX-IM-3`'s cell (g)).
3. **`I-EX-3` — EVERY MCP-REACHABLE METHOD IS REFUSED BY THE SAME PREDICATE, AT THE SAME TURN, ON BOTH TRANSPORTS**; the scope is `D-SCOPE`'s (`§2.2`, `§2.3`; `P-EX-IM-2`).
4. **`I-EX-4` — EVERY REFUSAL IS A VALUE, NEVER A THROW, AT ALL THREE DEPTHS** (`§2.2` item 5, `§2.3` item 2, `PAR-8`; `P-EX-TP-1`).
5. **`I-EX-5` — THE REFUSAL'S TOKEN IS `'exclusion-closed'` AND NOTHING ELSE**; never a store-union member, never a second spelling, never a renamed token (`§2.5`; `P-EX-TP-1`).
6. **`I-EX-6` — THE STORE'S DECISION SITE AND ITS BYTES ARE UNTOUCHED**; `B-SECURE-GATE` is the one site, and no byte of `src/main/security-store.ts` moves (`§2.6`; `P-EX-IM-2`'s drive cells (i)/(j)/(k)/(l)).
7. **`I-EX-7` — THE EXCLUSION STATE IS NOT PERSISTED**; no new key, no new file, no new writer; the boot terminal is `'mcp-enabled'` for every input class (`§2.1` items 4/5; `P-EX-SM-3`).
8. **`I-EX-8` — THE EXCLUSION STATE IS INDEPENDENT OF THE ENABLED-GROUP SET AND OF `isReady()`**; neither readers nor transitions consult the other axis (`§2.1` item 3 `T-5`, `§2.4` item 5; `P-EX-SM-2`'s drive cells (1)–(5)).
9. **`I-EX-9` — THE ISOLATED PANE GRAPH'S ISOLATION HOLDS WITH THE NEW NODE**; the app graph never sees, addresses or dispatches it (`§2.4` item 2, `§2.7` item 1; `P-EX-IM-4`'s isolation cells (a)–(e)).
10. **`I-EX-10` — NO TIER-4 VALUE REACHES A GRAPH NODE, A TOOL RESULT, A RESOURCE OR A NOTIFICATION PAYLOAD, AND NO NEW NOTIFICATION IS EMITTED ON A TRANSITION** (`§2.6` item 4; `P-EX-IM-4`'s carrier/notify cells (1)–(5)).
11. **`I-EX-11` — THE UNMOVED SET IS UNMOVED**: `ALL_TOOLS` `22` · `RpcMethod` `22` · `MUTATING_METHODS` `7` · `VALID_GROUPS` `5` · the default enabled-group set · the `scripts` key set · the persisted-file set · the union `16` (`§2.6` item 3).
12. **`I-EX-12` — THE ONE ADDED RENDERED SURFACE IS AUTHORED AS PROVIDENT DATA IN THE PANE GRAPH**; no hand-written DOM, no new pane, no new group row (`§2.4` items 1/2; `AGENTS.md`'s UI-rendering constraint).

### 3.4 The refusal-vs-throw vocabulary, stated once (`§3`'s opening requirement)

**EVERY outcome of every surface this unit declares is a VALUE. There is NO throw in this unit's contract, and a throw
is a FAIL, not a defensive nicety.** The four value classes:

| The outcome class | Its exact shape | Where it is produced |
| --- | --- | --- |
| **the exclusion REFUSAL** | `{status:'refused', reason:'exclusion-closed'}` — a tool RESULT / a renderer-call rejection message / an HTTP 503 body | `§2.2` items 2/5, `§2.3` item 2 |
| **the malformed-payload refusal** | `{applied:false, state:<unchanged>, reason:'malformed-state'}` | `PAR-8`, `FS-EX-8` |
| **the transition's applied answer** | `{applied:true, state:<the new state>}` | `PAR-8`, M-EX-2/M-EX-3/M-EX-4 |
| **the gate's transition** | a `SecurityGate` instance (state unchanged on an outside value or a self-transition) | `PAR-3`, T-3/T-4 |

**AND THE ONE THROW-CLASS THAT SURVIVES IS NOT THIS UNIT'S**: the landed pre-ready backend rejection
(`renderer not ready (timeout …)` — `L` `mcp-server.ts:1123`) and the landed `renderer window unavailable` (`L` `:1131`)
are **pre-existing behaviour this contract does NOT change and does NOT rely on**; they are named here only so a reader
does not mistake them for this unit's refusals. **A pass that answers the exclusion by THROWING one of those two is a
finding.**

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

1. **The red set is authored from THIS SPEC ALONE**, in a NEW test file (`tests/secure-exclusion.test.ts`) plus the
   register's executed layer; it is RUN and REPORTED before any implementation, and its failing class is recorded in the
   DONE row (`RCA-1`/`RCA-2`). The TestWriter is the gate-3 role and never implements alongside.
2. **The red set carries, in addition to the behavioural rows**: the register's EXECUTED layer (`§5.5.1`'s rows ride the
   red); the static/existence rows (the no-second-authority census · the union-count census · the frozen-artifact
   boundary census · the unmoved-count census of `§2.6` item 3 · the channel-constant single-source census · the pane
   node census); and the `[U]`-layer rows' **pre-live** half (the node's existence and its `syncConfig` refresh).
3. **The fail-states the red MUST drive, each named**: the ABSENT exclusion record (no member on the gate) · the ABSENT
   invocation-turn check (a tool call answered normally while the state is open — the red's FIRST reading) · the ABSENT
   epoch · the ABSENT `abandonPendingForExclusion` (an in-flight call currently settles only at its 60 000 ms timer) ·
   the ABSENT HTTP arm (a POST currently reaches a per-POST server in both states) · the ABSENT operator control (no
   `exclusion-toggle` node in the pane envelope) · the ABSENT `setExclusion` bridge member · the ABSENT `exclusion`
   response member · the PRESENT `secure.*` segment check (none may exist after the landing).
4. **A red run whose failing set is EMPTY is itself a finding** — the absent-symbol rows and the register's rows MUST
   fail first.

### 4.2 Red-set authoring order

1. Register rows first (`§5.5.1`, each with its strategy id and its term) → the behavioural `M-*`/`FS-*` rows → the
   static census rows → the `[U]` pre-live rows. **The register rows are never omitted, never reported as "sampled", and
   an un-run register row is a FAILURE, not a pass** (`AGENTS.md` item 11(b)).

### 4.3 The stop conditions (binding)

1. Caps: **`≤100` attempts per register row · `≤400` attempts in total**, executed sequentially in register order,
   **STOP AFTER 5 CONSECUTIVE FAILURES** (`§5.5.1`'s caps).
2. **The delegation gate** (`AGENTS.md` item 9): the Implementer is delegated only after the TestWriter reports the red
   set; **this spec's approval is the one approval the chain waits for** (`AGENTS.md` item 10a).
3. **The `[U]` battery's rows are NOT driven from the red set** — they need a real host and are gate 6's
   (`§2.4` item 7). The red set drives their **structural half** (the node exists, the handler is authored, the bridge
   member exists); the live half is gate 6's and **a red set that claims the live half is a finding.**

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

1. **ALLOWED** (`T`, `CONTRACT`; `A` `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`, boundary item (i) — the named
   moving set): `src/main/security.ts` (the exclusion record's three members + the state predicate) ·
   `src/main/main.ts` (the gate construction site's initialization, the ONE new channel constant's handler, the
   additive `exclusion` member on the two `IPC_SECURITY_*` responses) · `src/main/store-channels.ts` (the ONE new
   constant — the file's constant census `2 → 3`; **⟶ THIS FILE'S TWO NOW-STALE CENSUS COMMENTS ARE ANNOTATION SITES,
   ADDED 2026-10-05 BY THE REVIEW-CLOSURE PASS: `src/main/store-channels.ts:8` reads *"the census stays EXACTLY TWO"*
   and `src/main/preload.ts:13-14` repeats it (*"no third constant enters `store-channels.ts` — the constants census
   stays EXACTLY TWO, §2.2"*). **BOTH COMMENTS ARE MADE FALSE BY THIS UNIT'S OWN ADDITION, SO BOTH ARE LISTED HERE AS
   ALLOWED ANNOTATION SITES** — the landing pass edits BOTH comment sites to record the new census beside the old
   sentence (`RCA-8(d)` annotate-beside: the as-filed words survive, the annotation names the `2 → 3` move). **The two
   comment edits are the ONLY permitted change to those two comment blocks; a pass that silently rewrites the sentence
   instead of annotating beside it is a finding** (`§2.6` item 3's census is the authority for the new figure.).) ·
   `src/main/mcp-server.ts` (the invocation-turn check at the two shared
   closures, the per-POST HTTP arm, the `exclusionSnapshot()` reader, `RendererBackend.abandonPendingForExclusion` and
   the epoch-gated reply turn) · `src/main/preload.ts` (the ONE new `security` member; the member set `2 → 3`;
   **`get()`'s declared-return widening at `:30` — `§1.5` item 5 / `PAR-13`; and the `:13-14` census comment noted
   above**) ·
   `src/renderer/secure-panels.ts` (the ONE authored control + its label + the status line's trailing segment + the
   `syncConfig` refresh for `data-state`/`content`; **the renderer-side `declare global` bridge re-declaration at
   `:43`, which MUST widen in lockstep with `preload.ts:30` — `§1.5` item 5 / `PAR-13`**) · the unit's own test file ·
   its own `*-greens.md` · its
   `§5.U` matrix + `§6.1` report · this spec's `§3a`/`§3b` findings as they land.
2. **DENIED — and these are the boundary's decisive property, so a diff touching them is a COLLISION finding**
   (`§1.3` items 1/3/9): `src/renderer/store-core-graph.ts` · `src/renderer/store-graph-references.ts` ·
   `docs/specs/store-core-module-store-core-graph-surface.md` · `src/main/security-store.ts` · `src/shared/**` (incl.
   `src/shared/types.ts`) · every other `src/**` path · `tests/**` outside the unit's own file · `package.json` and any
   config or `scripts` key · `docs/specs/mcp-endpoint.md` and every other spec (a spec-filing pass edits ONE file,
   `§1.3` items 10/11) · the trackers (`docs/next-steps.md`, `docs/pending.md`, `docs/decisions.md`, `docs/defects.md`,
   `docs/HANDOFF.md`) — except by the gates that own them · the fork's tree (nothing written under `<Astrographer>/`,
   `H-r6`).
3. **THE UNIT'S OWN RECORDS**: `docs/specs/secure-exclusion.md` (this file, with its `§3a`/`§3b` findings as they land)
   · `docs/specs/secure-exclusion-greens.md` (gate 5's authored set) · the `§5.U` matrix and `§6.1` report (gate 6) ·
   the tracker rows the gates produce.

### 5.2 The legs this unit MUST run — FIVE, and the two refusals

1. **FIVE legs**: `npm test` · `npm run typecheck` · `npm run typecheck:tests` (the additive fourth leg — a unit that
   cites typecheck as evidence about its OWN test file MUST cite this leg, `AGENTS.md` item 4) · `npm run build` · the
   unit's own register leg (the `§5.5.1` register executed as part of the red/green set). **NO new `scripts` key**
   (`tests/ui-leg-contract.test.ts`'s `L-1` pins the key set; a new key would redden it — cited, never re-derived).
2. **`[U]` IS MANDATORY — gate 6 is a LIVE battery** (`§2.4` item 7): the three-part refusal form is
   **NOT AVAILABLE** to this unit, and the `STRUCTURAL` exemption's condition is not satisfied.
3. **`[D]` NOT CLAIMED** — precondition-gated: no divergence scenario, no third `SCENARIO_KINDS` member,
   `docs/specs/ci-divergence-leg.md` not amended.
4. **The `ui` leg and the divergence leg are NOT the battery**: the `ui` leg is `[U]` evidence for ITS `R0`–`R4` rows
   (`docs/specs/ci-ui-leg.md` `§1` item 1 — *"It is an OBSERVATIONAL/MEASUREMENT leg, NOT an identity leg"*), **not a
   substitute for this unit's `§5.U` matrix** (`docs/specs/user-flow-audit.md` `§4` item 6: *"never upgrade a layer"*).

### 5.3 The DONE row's shape (what the close-out must carry)

1. The ledger-row/wave/status line (`S1` · wave `S` · `DONE`); the honest gate list (spec filed → red set RUN and
   REPORTED with its failing class → Implementer green → gate 4 with the PBT audit → gate 5 blind greens →
   **gate 6 LIVE** → gates 7/8 → gate 9 (the five legs) → gate 10); the register's executed line with its terms and its
   sub-totals; the `§5.U` matrix's row count and the `§6.1` report's `summary.total`; the unmoved-count census
   (`§2.6` item 3); the boundary attestation (the four forbidden paths byte-identical).
2. **The carries are stated, never laundered** (`§7`): the `docs/specs/mcp-endpoint.md` `§6.4` annotation, the
   `docs/specs/secure-panels.md` D1–D8 re-labelling, the `foundation-app-data-model.md` `§5` `A-7` citation re-point,
   the `docs/FORKER.md` §4 statement (`R` `§4`'s `(LOW)` row: *"the tier-shape unit owes an explicit fork-facing
   statement"* — **`S2`'s, not this unit's**), and the `P-R3`-dependent questions (`§7a`).

### 5.4 Rollback

1. **This unit's landing is reversible at the spec gate by amendment (annotate-beside); after gate 5, a contract change
   is a re-run of the affected gates.** The mechanism is unusually clean and is a property worth stating: **the unit
   adds no persisted artifact and no frozen byte**, so a revert is a source revert with nothing to migrate — **the
   exclusion state has no durable residue by construction** (`§2.1` item 5).

---

## 5.5 Typed Property register (EXECUTED deterministically — plain vitest tables; no PBT harness, no new dependency)

1. **Execution form** (`AGENTS.md` item 11): plain deterministic vitest tables, every row's strategy
   **exhaustive/finite enumeration** — **NO seed, NO generator, NO `Math.random`**; nothing draws, so **no row needs a
   `(bounded)` marking** (`§5.5.2` item 3). Caps: `≤100` attempts per row, `≤400` in total, sequential in register order,
   **STOP AFTER 5 CONSECUTIVE FAILURES**. **An un-run row is a FAILURE, never a pass.**
2. **The family prefix declares the row's type**: `P-EX-IM-*` = `P-IM` invariant · `P-EX-SM-*` = `P-SM` state-machine ·
   `P-EX-TP-*` = `P-TP` totality; strategy-id prefix `S-EX-*`, one per row. **⟶ RE-PREFIXED 2026-10-05 (THE
   REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE; THE COLLISION WAS CONFIRMED AND IS NOW CLOSED).** **THE AS-FILED
   PREFIX WAS `P-SE-*`/`S-SE-*`, AND IT COLLIDED — VERIFIED, NOT INFERRED**: `docs/specs/store-security.md` `§5.5.1`
   declares **`8`** rows (`P-SE-IM-1`…`IM-4` · `P-SE-SM-1` · `P-SE-SM-2` · `P-SE-TP-1` · `P-SE-TP-2` — **the sibling's
   ids, kept in THEIR form, which is why this file had to move**) under
   **`8` of the same ids this file used**, with **DIFFERENT properties and DIFFERENT attempt terms** — e.g. this file's
   as-filed `P-SE-IM-1` was *"the two readings cannot disagree"* while the sibling's `P-SE-IM-1` is *"the security file
   is never torn"*. **The collision was NOT confined to the register ids**: the sibling also owns **`M-1`…`M-8`**,
   **`F-1`…`F-10`** and **`I-1`…`I-8`** in that same file, and its behavioural cells cite its register ids **BARE** — so
   an unqualified `P-SE-IM-2` was **ambiguous in BOTH directions**, and a TestWriter reading this spec alone could have
   implemented the sibling's torn-file property. **THE FIX IS A FILING ACTION, NOT AN `OWED`** (`§7a` `OW-7` is
   re-statused as a RECORDED RESOLUTION): **all five id spaces this file owns were re-prefixed in ONE pass —
   `P-EX-IM/SM/TP-n` · `S-EX-*` · `M-EX-n` · `FS-EX-n` · `I-EX-n`.** **THE NEW PREFIX WAS VERIFIED FREE ACROSS
   `docs/specs/*.md` BEFORE ADOPTION** (a grep for `P-EX-`/`S-EX-` over the whole `docs/specs/` tree returns **no match
   outside this file**); the old `P-SX-*`/`S-SX-*` placeholder this filing had floated in `OW-7` was **superseded
   BESIDE and NOT adopted**. **THE OLD FORMS SURVIVE ONLY WHERE THEY ARE QUOTED AS THE THING RENAMED** — every live
   citation in this file carries the new form, and **no dangling old-form reference remains** (verified by grep after
   the rename). **`docs/specs/store-security.md` IS NOT EDITED BY THIS PASS** (a spec-filing pass edits ONE file,
   `§1.3` item 10); its rows keep their ids byte-for-byte, and **the two registers are now DISJOINT in ALL FIVE id
   spaces, so the FILE-citation rule below is belt-and-braces rather than load-bearing.** **NO term, no row count, no
   clause and no property moved in the rename** — the register arithmetic below re-prints `106 =
   12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10` unchanged.**
3. **The register's subjects** (`R` `§7`'s own naming form): *the exclusion's state-machine / invocation-turn / epoch /
   both-transports / boot-terminal / operator-surface rows.*

### 5.5.1 THE REGISTER — **`9` typed rows = `4` `P-EX-IM` + `3` `P-EX-SM` + `2` `P-EX-TP`, declared total `106 = 12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10`**

**⟶ RE-PREFIXED 2026-10-05 (THE REVIEW-CLOSURE PASS — `RCA-8(d)` ANNOTATE-BESIDE; see `§5.5` item 2 for the verified
collision and `§7a` `OW-7` for the RECORDED RESOLUTION). THE AS-FILED IDS WERE `P-SE-IM-1`…`P-SE-IM-4` ·
`P-SE-SM-1`…`P-SE-SM-3` · `P-SE-TP-1`/`P-SE-TP-2` WITH STRATEGY IDS `S-SE-*`; THE OPERATIVE IDS ARE `P-EX-IM-1`…
`P-EX-IM-4` · `P-EX-SM-1`…`P-EX-SM-3` · `P-EX-TP-1`/`P-EX-TP-2` WITH STRATEGY IDS `S-EX-*`. **THE RENAME MOVED NO
TERM, NO ROW COUNT, NO CLAUSE AND NO PROPERTY** — the totals below are printed UNCHANGED and are re-verified as their
own terms.**

| # | Row id | Type | The property (exact) | Strategy id | Term (the drive table, in full) |
| --- | --- | --- | --- | --- | --- |
| 1 | `P-EX-IM-1` | `P-IM` | **THE EXCLUSION RECORD'S TWO READINGS CANNOT DISAGREE, AND THE ILLEGAL PAIR IS UNSPELLABLE** — for EVERY state the record can hold, `exclusion.mcpEnabled === !exclusion.tier4Open` holds; the state string is one of the two closed tokens; **no assignment path exists** (a `readonly` accessor and no setter — and a setter's very presence FAILS this row); `withExclusion` is pure in the `apply`-family sense (the RECEIVER is unchanged by a transition: a receiver read before and after answers the SAME state) | `S-EX-STATE-1` | **`12` attempts** = `2` legal states × `6` readings per state — (1) `exclusionState()` is the declared token; (2) `exclusion.mcpEnabled === !exclusion.tier4Open`; (3) no assignment path is reachable (the member is a getter: an attempted write throws in strict mode and does NOT change the reading — the two halves of the reading are asserted together); (4) `config`/`enabled` are UNCHANGED by the transition (the exclusion is a separate axis — the enabled-group set is read before and after); (5) the RECEIVER's state is unchanged after a successful `withExclusion` on it; (6) a self-transition returns a gate whose state equals the receiver's |
| 2 | `P-EX-IM-2` | `P-IM` | **THE INVOCATION TURN IS THE ENFORCEMENT, AND IT IS TOTAL OVER `D-SCOPE`** — for EVERY MCP-reachable method class, with the state `'mcp-disabled'`, the call is refused the VALUE `{status:'refused', reason:'exclusion-closed'}` BEFORE any renderer dispatch, on BOTH transports; a registry-only re-gate is NOT the enforcement; the tool/resource set is NOT deregistered (the non-legibility pin); AND the static boundary holds: **the diff adds NO `secure.*` segment check, adds NO token to the store's 16-member union, and moves NO byte of the four forbidden paths** | `S-EX-TURN-1` | **`12` attempts** = `12` drive cells — (a) an invocation while `'mcp-disabled'`: the declared refusal as a VALUE, no `pending` entry created, no epoch stamped; (b) the positive control — the SAME call while `'mcp-enabled'` reaches the renderer normally (the refusal is not vacuous); (c) the registry-only depth FAILS alone: with the toggling DISABLED and the invocation check live, the call is STILL refused (the row that proves the enforcement is not registration); (d) a resource READ is refused by the same predicate (the resource surface is inside `D-SCOPE`); (e) the tool/resource handles are still RESOLVABLE after the transition (the non-legibility pin, `§0A` item 7(c)); (f) the stdio server is still CONNECTED after the transition; (g) the HTTP POST is refused at arrival while `'mcp-disabled'`; (h) the HTTP positive control: the same POST while `'mcp-enabled'` reaches a per-POST server; (i) the diff-spelling census: ZERO `secure`-segment tests and ZERO `'secure-refused'` spellings in the unit's five files; (j) the union-count census: the store's union is READ at `16` and the file `src/main/security-store.ts` is **byte-identical to its measured pre-unit bytes**; (k) **THE MEASURED FILE BYTE-PIN** of `src/renderer/store-core-graph.ts` = **`sha256:0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450`** and `src/renderer/store-graph-references.ts` = **`sha256:5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657`** — both re-read and UNCHANGED after this unit's diff (**the pin's attribution, per the sibling's dated annotations: `sha256:29772ac7…` is the frozen ARTIFACT's SPAN digest and is NEVER a file-pin figure; the FILE pins are the two full digests above** — `docs/specs/store-security.md` `§1.3` item 1's and `§2.7` item 1's dated annotations are the authority for which figure is which); (l) **THE MEASURED ARTIFACT BYTE-PIN** of `docs/specs/store-core-module-store-core-graph-surface.md` — its frozen fields-1–7 SPAN digest reads **`sha256:29772ac7aa27eaa32065a19cfd1e64716746d86371b933108a7e527970d928a6`** (the `HYDRATE-1` re-freeze figure, unchanged and un-annotated by this unit), asserted over the span at the `FROZEN-SPAN-BEGIN`/`FROZEN-SPAN-END` sentinels.unit reading |
| 3 | `P-EX-IM-3` | `P-IM` | **THE EPOCH AND THE INVALIDATION ARE TOTAL OVER THE IN-FLIGHT CLASS, AND THE STATE HAS EXACTLY ONE LIVE HOME** — for EVERY accepted work item, the epoch read at acceptance is carried; a reply whose stamped epoch is stale is settled with the DECLARED token and NEVER with the renderer's value; `abandonPendingForExclusion` rejects EVERY pending entry, returns their COUNT, and touches NOTHING ELSE (never `ready`, never the readiness promise); and the process's exclusion record has ONE live home (the server's own gate, REPLACED by the transition exactly as `applyGatePatch` replaces it) | `S-EX-EPOCH-1` | **`10` attempts** = `10` drive cells — (a) accept-then-transition: the call answers the declared token, and the renderer's late value does NOT surface; (b) the reply turn's stale-epoch arm: a reply arriving after the bump is settled with the refusal even though the renderer answered `ok` (the value is DISCARDED); (c) the invalidation's count is OBSERVED (`abandonPendingForExclusion` returns the number of entries it rejected — `2` pending entries → `2`); (d) the invalidation's non-re-arm arm: `isReady()` and `pendingCount()` are read before and after — the readiness flag is UNCHANGED by the invalidation and the pending map is empty after it; (e) the landed reload path is UNCHANGED: `handleReset` still rejects pending AND re-arms readiness (the two operations are distinguishable); (f) the transition's replay on a live server REPLACES the server's gate (a reader of `mcp.gate` observes the new state); (g) a second gate constructed from the same options does NOT observe the first's transition (no shared mutable module record — the row that FAILS a module-global design); (h) a self-transition does NOT bump the epoch (a pending entry accepted before it is NOT invalidated); (i) an outside-value transition does NOT bump the epoch and does NOT invalidate; (j) **THE RACE-2 ORDERING DRIVE (`§2.2` item 7's drive — ⟶ RE-AIMED 2026-10-05 BY THE REVIEW-CLOSURE PASS: this cell previously read *"a tier-write (`IPC_SECURITY_SET`) does NOT bump the epoch and does NOT invalidate"*, an assertion about ONE holder's response to a write; it is now the INTERLEAVING DRIVE the clause it belongs to actually needs, and it absorbs the old reading rather than adding an eleventh cell — the term stays `10`): a tier-write (`IPC_SECURITY_SET`) does NOT bump the epoch and does NOT invalidate, AND the SET and the EXCLUSION transition are issued back-to-back in ONE tick in BOTH orders — after the pair, (i) the store's `current` equals the SET's post-state, (ii) the gate's config equals the transition's post-value, and (iii) NO third holder is observable. **A store `current` observed mid-update, a gate left at its pre-value, or any third holder FAILS** — the ordering claim `§2.2` item 7 makes is thereby DRIVEN rather than stated** (race 2's ordering rule, `§2.2` item 7) |
| 4 | `P-EX-SM-1` | `P-SM` | **THE EXCLUSION'S STATE MACHINE IS CLOSED, TERMINAL-TOTAL, AND ITS TRANSITION SET IS EXACTLY FIVE** — `MCP-ENABLED → MCP-DISABLED` (T-1) · `MCP-DISABLED → MCP-ENABLED` (T-2) · the self-transition (T-3, a legal no-op) · the outside-value call (T-4, the unchanged gate) · the SET path (T-5, **NOT a transition site**); every drive reaches a declared terminal and no drive invents a sixth | `S-EX-MACH-1` | **`12` attempts** = `5` transition classes × `2` readings + `2` machine-level readings — each class read twice: (i) the state the machine lands on, (ii) the obligations it did or did not fire (the epoch and the invalidation). T-1: `'mcp-disabled'` + (bump, invalidate). T-2: `'mcp-enabled'` + (bump, invalidate). T-3: unchanged + (no bump, no invalidate). T-4: unchanged + (no bump, no invalidate, **no throw**). T-5: unchanged + (no bump, no invalidate). The `2` machine-level readings: the START state (the boot terminal, read before any operator act) and the TOTALITY reading (every class above is reachable from the start state by a declared path); `5 × 2 + 2 = 12` ✓ |
| 5 | `P-EX-SM-2` | `P-SM` | **RE-ARM OWNERSHIP: `markReady()` AND A RELOAD DO NOT RE-ARM WHAT THE OPERATOR DISABLED, AND THE DISABLED STATE DOES NOT CLOSE THE TRANSPORT** — the exclusion state is a function of NEITHER `isReady()` NOR a reload NOR a timer; the only re-arm is the operator's own `setExclusion('mcp-enabled')`; the stdio transport is not closed and not rebuilt by a transition; and the landed `IPC_READY` handler is unmodified | `S-EX-REARM-1` | **`14` attempts** = `7` drive cells × `2` readings per cell — (1) `markReady()` while `'mcp-disabled'`, (2) a `did-finish-load` reload while `'mcp-disabled'`, (3) a `closed`/`destroyed` reset while `'mcp-disabled'`, (4) a monotone clock advance with no operator act (the NO-TIMER arm), (5) the operator's own `setExclusion('mcp-enabled')` (the ONE cell that DOES change the state — the positive control), (6) a transition with the stdio transport live (the CONNECTED reading), (7) a transition with a per-POST HTTP server live (the per-POST reading). Each cell's TWO readings: (i) the state AFTER the drive, (ii) the tool/resource ENABLED-ness after the drive (read through the landed `registeredEnabled`/`resourceEnabled` accessors — `L` `mcp-server.ts:491-511`); `7 × 2 = 14` ✓. **The `IPC_READY` handler's source is read as the STATIC control of cells (1)/(2)** |
| 6 | `P-EX-SM-3` | `P-SM` | **THE BOOT TERMINAL IS THE SAFE PAIR, TOTAL OVER THE WHOLE INPUT DOMAIN, AND NOTHING PERSISTS — RE-SCOPED SO EVERY DRIVE IS OBSERVABLE AGAINST THE LANDED CODE** (**⟶ RE-SCOPED 2026-10-05 BY THE REVIEW-CLOSURE PASS: the as-filed cell asserted an `OPEN→INGEST→CLOSE→ENABLE` sequence whose first three steps the landed tree CANNOT EXHIBIT — the tier has no open/close API (`L` `security-store.ts:25-33`) and no ingestion pass exists in `main.ts`. THE DRIVES ARE RE-SCOPED TO THE ARTIFACTS THAT ACTUALLY EXIST; **the term count is UNCHANGED at `12`**.**) — for EVERY boot input class the state resolves `'mcp-enabled'`/`{mcpEnabled:true, tier4Open:false}`; the ORDER the contract pins is the **ORDER OF CONSTRUCTION** over the landed artifacts (store → gate → transports → `mcp.start()`), **and OPEN/CLOSE are DECLARED `S2`'s mechanism, NOT this unit's — so NO drive here asserts an open/close call or an ingestion pass** (`§2.1` item 4's restatement; `§1.3` item 3); and the state has NO persistence path (no new key, no third file, no writer) | `S-EX-BOOT-1` | **`12` attempts** = `7` input classes + `3` order readings + `2` persistence readings — the `7` input classes (cold · missing file · corrupt/unparsable file · a TORN record · an EMPTY record · a wrongly-shaped record · a file with a stale `${path}.tmp` beside it) each read ONCE for the resolved state; **the `3` ORDER readings, EACH OBSERVABLE ON THE LANDED ARTIFACTS: (i) the security store's construction precedes the `SecurityGate`'s construction (`L` `main.ts:86-90`); (ii) the gate's construction precedes the MCP server's construction (`L` `main.ts:90` → `:264`; the server holds the gate it was passed, `L` `mcp-server.ts:354`); (iii) the server's construction precedes `mcp.start()` (`L` `main.ts:264` → `:459`, the last boot step), and the state reads `'mcp-enabled'` at every point before it**; the `2` persistence readings (the security file's KEY SET is read before and after a transition — byte-identical · the persisted-file census is read at exactly TWO filenames). `7 + 3 + 2 = 12` ✓. **A DRIVE THAT ASSERTS AN OPEN/CLOSE CALL, AN INGESTION PASS, OR A CACHING HOLDER FAILS THIS ROW — no such surface exists in the landed tree, so such a drive cannot be exhibited and is NOT owed (`§5.5.2` item 2's `S2`-scope fence).** |
| 7 | `P-EX-TP-1` | `P-TP` | **EVERY REFUSAL IS A VALUE, NEVER A THROW, AND THE REFUSAL'S TOKEN IS EXACTLY ONE** — for EVERY refusal class (`'mcp-disabled'` invocation turn · `'mcp-disabled'` resource read · the in-flight abandonment · the HTTP POST at arrival · the malformed transition payload), the outcome is a declared VALUE, `status` is exactly `'refused'`, the token is exactly `'exclusion-closed'` for state refusals and exactly `'malformed-state'` for payload refusals, and NO throw escapes any declared surface | `S-EX-RFUS-1` | **`12` attempts** = `5` refusal classes × `2` readings + `2` reading cells — each of the `5` classes read twice: (i) the value's exact shape (`status`/`reason` tokens; for the HTTP class the status line AND the body's `error.code`/`error.message`); (ii) **the no-throw reading** (the call is made inside a `try` that FAILS the row if anything is thrown, and the surface is re-read afterwards to prove the failure was non-destructive). The `2` extra cells: (1) the token census over the whole diff — `'exclusion-closed'` and `'malformed-state'` are the ONLY two new refusal tokens, and NEITHER appears in the store module; (2) the union reading — the store's union count is `16` and no new member was added. `5 × 2 + 2 = 12` ✓ |
| 8 | `P-EX-TP-2` | `P-TP` | **THE MANUAL-UI CHANNEL IS TOTAL OVER ITS DECLARED DOMAIN, AND THE TRANSITION IS NOT A SETTING** — for EVERY payload the transition channel can be given, the handler answers ONE of exactly TWO closed forms (`{applied:true, state}` for the two legal tokens; `{applied:false, state:<unchanged>, reason:'malformed-state'}` for every outside value), never throws; the `exclusion` member is NEVER absent on a GET or a SET response and the SET response keeps its landed `write` member BESIDE it; and a SET does NOT change the state | `S-EX-CHAN-1` | **`12` attempts** = `9` payload classes + `3` channel readings — the `9` payload classes (the two legal tokens; a bare `boolean`; a number; an object; `undefined`; `null`; an unknown string; a case-variant string; a whitespace-padded string) each read ONCE for the answered form; the `3` readings (a GET response's `exclusion` member is present and is the live state; a SET response carries `exclusion` AND the landed `write` member together; a SET does not move the state — read before and after). `9 + 3 = 12` ✓ |
| 9 | `P-EX-IM-4` | `P-IM` | **THE NEW NODE DOES NOT WIDEN THE PANE GRAPH'S ISOLATION, AND THE EXCLUSION STATE REACHES NO CARRIER** — the app graph's `renderedHtmlResult()` / `listTargets()` / `get_markdown` / `get_node_state` and an app-graph `dispatch` on the pane node's authored id observe NONE of the new control (D1–D8 HOLDS WITH the added node — `§2.7` item 1); the app Runtime's census contains no pane content; the exclusion state appears in NO graph node, NO tool result, NO resource payload and NO notification payload (`I-EX-10`); the notify path is NOT re-aimed at the exclusion and a transition emits NO notification; and the pane's `cfg` snapshot path is UNCHANGED (the new control rides the SAME manual-UI channel — `data-ownership-model-plan.md` `§2.3` row 2.4-12 is not breached by construction, `§2.7` item 3) | `S-EX-ISOL-1` | **`10` attempts** = `5` isolation probes + `5` carrier/notify probes — the isolation probes, each read on the CONSTRUCTED pane graph: (a) `Runtime.renderedHtmlResult()` contains NEITHER the toggle's label text NOR its authored id; (b) `listTargets()` exposes no authored id from the pane graph; (c) an app-graph `dispatch` on the toggle's authored id is an unresolved target (never reaching the pane); (d) the app census's node count is UNCHANGED by the pane's construction (before/after readings); (e) `get_markdown`/`get_node_state` carry no pane content. The five carrier/notify probes: (1) no graph node holds the exclusion token (a census over the app NODE SET); (2) a tool result payload carries no exclusion token; (3) a resource payload carries no exclusion token; (4) the notification payload's member set is UNCHANGED and a transition emits ZERO notifications (the `notifyGraphChanged` call count is read across a transition, before and after); (5) the positive control — the SAME probes on the app's OWN `#status`-free content DO observe app content, proving the probes are not vacuous. `5 + 5 = 10` ✓ |

**THE ARITHMETIC, PRINTED WITH ITS TERMS** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`): **`106 = 12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10`**, in register order (`P-EX-IM-1` … `P-EX-IM-4`, `P-EX-SM-1` … `P-EX-SM-3`, `P-EX-TP-1`/`P-EX-TP-2`), with the chain **`12 → 24 → 34 → 46 → 58 → 72 → 84 → 96 → 106` ✓** — **nine terms, and the total IS the sum of its own terms.** **SUBTOTALS BY TYPE**: `P-IM` = `12 + 12 + 10 + 10 = 44` · `P-SM` = `12 + 12 + 14 = 38` · `P-TP` = `12 + 12 = 24` — and **`44 + 38 + 24 = 106` ✓**. **CAPS: largest row `14` ≤ `100` ✓ (headroom `86`); total `106` ≤ `400` ✓ (headroom `294`) — each compared against its OWN cap, never against a subtotal.** **⟶ ANNOTATED BESIDE 2026-10-05 (`U-SECURE-EXCLUSION` `S1`, gate 3; `RCA-8(d)` ANNOTATE-BESIDE — the sentence above stands BYTE-FOR-BYTE and is NOT rewritten; this clause records a **per-row-assignment drift**, NOT a mis-sum).** **THE DRIFT: the term sequence printed above (`12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10`, chain `…46 → 58 → 72…`) TRANSPOSES `P-EX-SM-2` and `P-EX-SM-3` relative to the per-row `§5.5.1` TABLE, which numbers row 5 = `P-EX-SM-2` at `14` attempts and row 6 = `P-EX-SM-3` at `12`.** **THE TABLE IS THE PER-ROW AUTHORITY — it is the cell that carries each row's own term — so the operative sequence is `12 + 12 + 10 + 12 + 14 + 12 + 12 + 12 + 10`, chain `12 → 24 → 34 → 46 → 60 → 72 → 84 → 96 → 106`; the executed register prints that form.** **BOTH FORMS SUM TO `106` AND BOTH GIVE `P-SM = 38`, so the SUBTOTALS and the CAPS above are UNAFFECTED and NO TERM VALUE, ROW, STRATEGY ID OR PROPERTY MOVES — the drift is purely which of the two `P-SM` rows carries `14`.** **A reader MUST treat the TABLE's per-row figures as operative and this paragraph's ordering as its own dated reading.** **ALSO CORRECTED IN THE SAME PASS: the parenthetical order string's *"`P-EX-IM-1` … `P-EX-IM-4`"* above reads as a RANGE but must not be read as the row POSITIONS — the TABLE places `P-EX-IM-4` NINTH, and the register's `REGISTER_ROW_IDS`/strategy-id arrays are in lockstep with the TABLE.** **ROWS: `9` (`4` + `3` + `2`) — the `≤8` component-breakdown SIGNAL is EXCEEDED and the register is REPORTED AS `9`, because the signal is not a ceiling**: `P-EX-IM-4` was added when this filing's own `§2.7`/`I-EX-9`/`I-EX-10` clauses were found to cite a row that did not yet exist — i.e. the D1–D8-with-the-new-node isolation and the four-carrier emptiness are **discernible, independently falsifiable properties**, and enumerating them is exactly what `AGENTS.md` item 11(f) requires (*"never a ceiling and never a reason to drop, merge or leave unenumerated a discernible property"*). **No property was merged, dropped or left unenumerated to fit the signal, and the excess is DECLARED rather than smoothed.**

### 5.5.2 The register's honesty block — what is NOT proven

1. **The register proves the exclusion against constructed drivers** (a constructed `SecurityGate`, a constructed
   `ProvidentMcpServer`, a fake-window `RendererBackend`, stubbed `http.IncomingMessage`/`ServerResponse` objects and a
   constructed pane graph). **It does NOT prove**: the real Electron boot's end-to-end order (no timing figure is
   claimed, `RCA-12`), the rendered pane's pixels (that is gate 6's `[U]` battery, `§2.4` item 7), a REAL HTTP
   client's framing (the wire asserted is the status + the body shape, never a client's parse), or a second
   `BrowserWindow`'s behavior (`§2.1` item 6 — `UNVERIFIED-AS-YET` in the record itself; **no row asserts it**).
2. **The register asserts NOTHING about the tier's shape, contents or format** — those are `S2`'s and its scope is open
   (`docs/pending.md` `§R` `P-R3`). The tier is used exactly as it is today (`CURRENT STATE` item 2). **⟶ THIS FENCE
   NOW ALSO COVERS THE TIER'S *MECHANISM*, NOT ONLY ITS SHAPE (2026-10-05, THE REVIEW-CLOSURE PASS): **OPEN and CLOSE
   are `S2`'s mechanism and this register drives NEITHER** — the landed tier exposes no open/closed API at all (`L`
   `security-store.ts:25-33` is `get`/`set`/`lastWriteReceipt` only) and no ingestion pass exists in `main.ts`, so
   `P-EX-SM-3`'s three order readings are the **store → gate → transports → `mcp.start()` CONSTRUCTION order** over the
   artifacts that exist, and a drive that asserts an open/close call or an ingestion holder is **not owed and cannot be
   exhibited** (`§2.1` item 4's restated boot clause; `§7a` `OW-2`).**
3. **Every row's table is the CLOSED input set of its property** — no `(bounded)` marking is owed; no row is sampled;
   **an un-run row is a FAILURE.**
4. **The `[U]` half of the contract is NOT in this register.** The four `§5.U` obligations live in the matrix and the
   `§6.1` report, whose clause set is `docs/specs/user-flow-audit.md`'s, not this register's. **A pass that reports this
   register as covering the live battery is a finding.**

### 5.5.3 Attempt arithmetic (readable against the tables above)

1. `12 = 2 × 6` (two legal states × six readings) · `12 = 12 × 1` (twelve drive cells × one assertion each) ·
   `10 = 10 × 1` (ten drive cells × one assertion each) · `12 = 5 × 2 + 2` (five transition classes × two readings + two
   machine-level readings) · `14 = 7 × 2` (seven drive cells × two readings) · `12 = 7 + 3 + 2` (seven input classes +
   three order readings + two persistence readings) · `12 = 5 × 2 + 2` (five refusal classes × two readings + two
   reading cells) · `12 = 9 + 3` (nine payload classes + three channel readings) · `10 = 5 + 5` (five isolation probes +
   five carrier/notify probes) — **the nine terms sum to `106`, and each term is the product/sum of the explicit factors
   its own cell prints.**

---

## 6. What this unit is NOT (restated as a checklist, so a pass can falsify the boundary in one read)

1. **NO store byte** — `src/main/security-store.ts` unchanged (`§1.3` item 1).
2. **NO frozen artifact** — `src/renderer/store-core-graph.ts`, `src/renderer/store-graph-references.ts` and
   `docs/specs/store-core-module-store-core-graph-surface.md` unchanged (`§1.3` item 1).
3. **NO second refusal site, NO union member, NO `secure.*` check** (`§1.3` item 2, `§2.5`, `§2.6` item 2 `N-1`).
4. **NO second unit** — no tier-name, no tier-shape, no `sanitize()`, no boot ingestion pass (`§1.3` item 3; **and NO
   tier OPEN/CLOSE API is asserted by this contract — `§2.1` item 4's restated boot clause**).
5. **NO pane move, NO D1–D8 clause retired** (`§1.3` item 4, `§2.7` item 1).
6. **NO new MCP surface** — `ALL_TOOLS` `22` · `RpcMethod` `22` · `MUTATING_METHODS` `7` · `VALID_GROUPS` `5` · the
   default group set · no new tool, resource or group (`§1.3` item 5, `§2.6` item 3).
7. **NO new `scripts` key** (`§1.3` item 6).
8. **NO new persisted file, NO new persisted key** (`§1.3` item 7).
9. **NO tier-4 value in any carrier** (`§1.3` item 8, `I-EX-10`).
10. **NO edit to `src/shared/**`, NO edit to another spec, NO edit to a tracker by this filing** (`§1.3` items 9/10/11).

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **The layer honesty** (`§1.4`): everything here is main-process/constructed-driver evidence, except gate 6's `[U]`
   battery, which is MANDATORY and is the ONLY assembled-app evidence this unit claims. No timing figure is claimed.
2. **The `[U]` battery is a condition on the DONE row, not a formality**: a DONE row that cites no `§5.U` matrix and no
   `§6.1` report is a review finding (`docs/specs/user-flow-audit.md` `§5`, `§2.4` item 7).
3. **The OWED carries, each with its owner and its positive revisit condition — the list is `§0B` item 3's `(C-1)`…
   `(C-5)`, and it is carried HERE BY POINTER rather than by paraphrase** (`§0B` item 3 is the ONE list; a paraphrase in
   a second place is exactly the drift this pointer removes — the review found the two cells worded differently for the
   same obligations). **⟶ RECONCILED 2026-10-05 BY THE REVIEW-CLOSURE PASS.** **Restated here ONLY as the enumeration so
   a reader need not page up: `(C-1)` the `mcp-endpoint.md` `§6.4` third-mechanism annotation — owner: this unit's gate-8
   documentation half; revisit: this unit's DONE row · `(C-2)` the `secure-panels.md` D1–D8 re-labelling — owner: the
   pass that lands that half (`docs/pending.md` `§R` `P-R5`); revisit: that pass's file scope includes that file ·
   `(C-3)` the `foundation-app-data-model.md` `§5` `A-7` citation re-point — the same owner and form · `(C-4)` the
   `docs/FORKER.md` `§4` fork-facing statement — owner: `S2` (`R` `§4`'s `(LOW)` row); revisit: `S2`'s spec gate ·
   `(C-5)` the `docs/skills/designing-pages.md` update IF the file exists — owner: this unit's Implementer; revisit: the
   file exists at the landing commit (`§0` ruling 12).** **None is a bare `OWED`, and none gates this unit's landing.**
4. **The one thing this unit deliberately does NOT decide** — `§0A` item 8's second-window scope and `§7a`'s
   `P-R3`-dependent questions — is stated at `§7a`, not smoothed.
5. **The refusal is not hidden and the oracle (a partial one) is DECLARED**: `§0A` item 7(a)–(d) prints exactly what an
   outside observer can and cannot distinguish. **A pass that claims the switch is indistinguishable from outside is
   over-claiming**, and a pass that claims it is fully legible is under-reading `§0A` item 7(c).
6. **The register-id prefix collision with the `G3` unit's register is RECORDED AND NOW RESOLVED** (`§5.5` item 2;
   `§7a` `OW-7` — **re-prefixed to `P-EX-*`/`S-EX-*` by this pass, so the ids are DISJOINT across all five id spaces**).
   **The file-citation reading rule is KEPT as belt-and-braces**: a claim should still cite the FILE as well as the id
   (`§5.5` item 2), and the long-lived habit of writing a bare register id is exactly what made the collision silent.

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from, or that depend on a ruling that does not exist

**None of this file's contract clauses is un-falsifiable**: every clause above carries a row, an authority, or an
explicit OWED-with-owner. **The `OWED` items are these, each with its owner and its positive revisit condition — none
invented, none smoothed into a pass:**

| # | The item that could NOT be pinned here | Why it could not be pinned | Its owner (and the positive revisit condition) |
| --- | --- | --- | --- |
| **OW-1** | **WHETHER A SECOND WINDOW / REALM OBLIGES SERIALIZATION** | It depends on a question the record itself marks `UNVERIFIED-AS-YET` (`R` `§5.3` race 6: *"whether this host can open a second `BrowserWindow` at all — no evidence found either way"*). **The CLAUSE is pinned** (`§2.1` item 6 / `§0A` item 8: out-of-scope-as-supported, no per-window copy, no serialization mechanism) — **the FALSIFIABLE ROW about a second window is not**, because no row may assert the behavior of a configuration the record cannot confirm exists. | **the architect** — a scope ruling. **Positive revisit condition: a measurement showing this host can open a second `BrowserWindow`** (then a second-window row is authored against this same clause, and the clause is amended, not replaced). |
| **OW-2** | **THE INGESTION READERS' IDENTITY AND THE CONSUMERS' HOLDERS** (`D-19`'s "the app's own subsystems read and cache into their own holders") | It is `S2`'s and it depends on the OPEN `P-R3` scope question (`docs/pending.md` `§R` `P-R3`: boot-ingestion reads alone, or also runtime name-addressed writes after boot). **This unit owns only the ORDER OF CONSTRUCTION over the artifacts that exist** (`§2.1` item 4's restated boot clause — **no ingestion pass and no tier open/close API exists in the landed tree**, `L` `security-store.ts:25-33`), which IS pinned and IS driven (`P-EX-SM-3`'s three re-scoped order readings). **⟶ RE-SCOPED 2026-10-05 BY THE REVIEW-CLOSURE PASS: the as-filed cell cited those three readings against an `OPEN→INGEST→CLOSE→ENABLE` sequence the landed code cannot exhibit; the readings are now the store→gate→server→`mcp.start()` construction order, and NO reading asserts an OPEN, a CLOSE or an INGESTION pass.** | **`U-TIER4-ARBITRARY-STORAGE` (`S2`)**, blocked on `S1`'s DONE row and on the `P-R3` ruling. **Positive revisit condition: the `P-R3` scope ruling is written (either arm) — then `S2`'s spec names the readers and their holders.** |
| **OW-3** | **THE FORK-FACING STATEMENT OF THE EXCLUSION'S CONSEQUENCES** | `R` `§4`'s `(LOW)` row assigns it to the tier-shape unit (*"and the tier-shape unit owes an explicit fork-facing statement"*), and a spec-filing pass may not edit `docs/FORKER.md` (`§1.3` item 10). **This unit's mechanism is fully declared here** — a fork can implement it from this file alone. | **`S2`** (per the record's own assignment). **Positive revisit condition: `S2`'s spec gate.** |
| **OW-4** | **THE `docs/skills/designing-pages.md` UPDATE, ITS TEST-USE-CASE COVERAGE MATRIX AND ITS DEMO-PAGE INDEX** | **The file does not exist** (globbed this filing; `docs/skills/` holds exactly `process-guardrails.md`). The sibling specs' own ABSENCE-row form applies (`docs/specs/ci-ui-leg.md` `§1`). **This ABSENCE is NOT the `§7.1` exemption** (`§2.4` item 7 remains MANDATORY). | **this unit's Implementer**. **Positive revisit condition: the file exists in the tree at the landing commit.** |
| **OW-5** | **THE EXACT `§5.U` U-ROW VALUES AND THE `§6.1` REPORT'S ROWS** | `docs/specs/user-flow-audit.md` `§5` **forbids** a unit's contract from re-deriving its own matrix's values (*"It does not re-derive, restate or cap any unit's matrix … its values are that unit's own measurements"*), and every `post` observation must be MEASURED at the live gate and never projected. **This spec declares the row SUBJECTS** (`§2.4` item 7(2), eight of them) **and cannot declare their values.** | **the live-scenario runner / the supervisor, at gate 6.** **Positive revisit condition: gate 6 runs — then the matrix's values and the report's `summary.total` (which must equal the matrix's U-row count) are authored from the RUNS.** |
| **OW-6** | **WHETHER THE INVOCATION-TURN REFUSAL PROVES INSUFFICIENT FOR THE HTTP TRANSPORT** | It is `R` `§6` column 9's own **positive revisit condition** for unit 1 (*"Revisit if the invocation-turn refusal proves insufficient for the HTTP transport"*) — i.e. a question answered by EVIDENCE, not by a ruling, and the evidence does not exist until the battery has run. | **the architect**, on gate-6 evidence. **Positive revisit condition: a `§6.1` report row whose `verdict` shows a straddling POST delivering a non-refusal value — then a new clause (and a new register arm) is authored, never a silent widening of `§2.3` item 3.** |
| **OW-7** | **THE REGISTER-ID PREFIX COLLISION WITH THE `G3` UNIT'S REGISTER — ⟶ RESOLVED BY THIS PASS 2026-10-05; NO LONGER AN ARCHITECT-RULABLE `OWED`** | `docs/specs/store-security.md` `§5.5.1` declares `8` rows under the ids this file had ALSO used — `P-SE-IM-1`…`4`, `P-SE-SM-1`/`2`, `P-SE-TP-1`/`2` — with **different properties and different terms**; and the sibling owns `M-1`…`M-8`, `F-1`…`F-10`, `I-1`…`I-8` in that same file, cited BARE in its own cells, so an unqualified id was ambiguous in BOTH directions. **THE COLLISION WAS CONFIRMED UPSTREAM, NOT DEBATED.** | **⟶ RECORDED RESOLUTION (executed, not owed): all FIVE id spaces this file owns were re-prefixed in ONE pass — `P-EX-IM/SM/TP-n` · `S-EX-*` · `M-EX-n` · `FS-EX-n` · `I-EX-n`.** The new prefix was **verified free across `docs/specs/*.md` before adoption** (a grep for `P-EX-`/`S-EX-` over the whole `docs/specs/` tree matches **nothing outside this file**); the `P-SX-*`/`S-SX-*` placeholder the filing had floated is **superseded BESIDE and NOT adopted**. **`docs/specs/store-security.md` is NOT edited by this pass** (`§1.3` item 10) and its rows keep their ids byte-for-byte. **The rename moved NO term, no row count, no clause and no property** — the register arithmetic re-prints `106 = 12 + 12 + 10 + 12 + 12 + 14 + 12 + 12 + 10` unchanged (`§5.5.1`). **THE FILE-CITATION RULE IS KEPT AS BELT-AND-BRACES**: a claim should still cite the FILE as well as the id, because the two registers were once disjoint-by-file only. **Revisit condition: none owed** — the resolution is complete at this gate; it reopens only if a future unit adopts a colliding `P-EX-*`/`S-EX-*` id, which is that unit's pass to check. |

### 7b. Contradictions found between the mandatory inputs (each cited from BOTH sides)

**Five, each with its disposition — none is smoothed, and none blocks this filing except `CON-1`, which is a CITATION
correction rather than a contract conflict.**

1. **`CON-1` — THE GATE-1 RECORD'S `§2` `A-6` ROW AND THE DOSSIER'S `§5` `A-6` ROW ATTRIBUTE THE VOCABULARY TO THE
   ARCHITECT; THE ARCHITECT'S RULING ROW DOES NOT CONTAIN IT.** `docs/specs/secure-tier-generalization-review.md` `§2`
   says of the exclusion's vocabulary: *"**the state names, the terminal set, and what a refusal is called
   (`disabled`/`refused`/`unavailable`) are the architect's, and none is currently spelled anywhere in this project**"*,
   and the dossier's `§5` `A-6` row rules: *"**Exact state names and receipt vocabulary are the unit's to specify**"* —
   while `docs/decisions.md`'s `THE MCP SERVER AND THE SECURE TIER ARE MUTUALLY EXCLUSIVE…` pins *"the legal pairs"* and
   the channel-token home but **spells no state name and no receipt token**. **Disposition: NOT a conflict of
   substance — the dossier's `§5` row is the LATER, OPERATIVE reading** (it is the post-ruling amendment; the gate-1
   record's `§2` row is the pre-ruling question list, and its own `§5`-family text elsewhere assigns the vocabulary to
   the unit: *"Exact state names and receipt vocabulary are the unit's to specify"*). **This spec acts on the operative
   reading and records it as `§0A` items 1/2, each architect-reversible at this gate** — which is the disposition the
   review's `§2` row itself invites. **The citation a later pass must quote is the DOSSIER's `§5` `A-6` row.**
2. **`CON-2` — THE `ui` LEG'S WITNESS AND THE THIRD PERSISTED FILE.** The gate-1 record's `§7` `G-5` records that a
   third persisted store filename would be **unwitnessed rather than red** (`docs/specs/ci-ui-leg.md` `§3.0` `R0(c)`'s
   fixed two-name literal in `scripts/electron-ui.mjs`), while the same record's `§5.4`/`§6` **close the question by
   ruling ONE file, unchanged**. **Disposition: NO CONFLICT — the closure is by ruling** (`A` `D-19`'s
   *"the EXACTLY-TWO persisted-file pin is unchanged"*), and this unit adds no file (`§1.3` item 7). **Recorded so a
   later pass does not reopen it silently** (`R` `§7` `G-5`'s own instruction).
3. **`CON-3` — THE CRITIQUE'S `HIGH` FINDING *"a switch is bypassable; a construction-level unreachability is not"*
   versus `D-18`'s *"add the gate, keep D1–D8"*.** The critique's point stands as stated; the ruling **does not choose
   between** the two mechanisms — it **keeps both** (`R` `§4`'s *"the ruling does not choose between them"* paragraph;
   `R` `§5.3`'s *"Neither — they close different paths"*). **Disposition: NO CONFLICT — the finding is answered by the
   ruling, and this spec carries both mechanisms** (`§2.7` items 1/2).
4. **`CON-4` — `store-security.md`'s `CURRENT STATE` item 8 CALLS GATE 6 `STRUCTURAL` FOR *"no admitted unit"*, WHILE
   `docs/pending.md` `§R` `P-R2` SAYS THE EXEMPTION *"does not hold here"*.** Read as a pair, the two statements look
   opposed. **Disposition: NO CONFLICT — they are about DIFFERENT UNITS.** `store-security.md`'s claim is scoped to the
   `G3` unit (*"no admitted unit authors a rendered surface"* / its condition names that unit's own diff);
   `P-R2`'s claim is scoped to `U-SECURE-EXCLUSION`, **a LATER unit that does author one**. **This spec records
   `TRIGGERS` for itself and does NOT edit `store-security.md`'s claim** (`§2.4` item 7(5)) — a pass that reads the
   `G3` sentence as a statement about `S1` has mis-scoped it, and the disambiguator is the UNIT, not the sentence.
5. **`CON-5` — THE `[U]` LEG'S COVERAGE (`ci-ui-leg.md`) versus THE `[U]` BATTERY THIS UNIT OWES.** `ci-ui-leg.md`
   `§1` item 3 says the leg produces *"ONE real measurement (`R2`), plus four rows that are about the leg's own honesty
   (`R0`, `R1`, `R3`, `R4`)"* and item 1 says it is *"a MEASUREMENT leg"* — which could be read as discharging a unit's
   `[U]` obligation. **Disposition: NO CONFLICT, and the mis-reading is FENCED OFF EXPLICITLY**: the `ui` leg's rows
   are its OWN subjects (`docs/specs/ci-ui-leg.md` `§2.1` item 6 excludes CSS resolution and *any* attribute row), and
   `docs/specs/user-flow-audit.md` `§4` item 6 forbids upgrading a layer (*"a `ui`/divergence green is never a
   substitute for a measurement the report claims"*). **`§5.2` item 4 carries the fence.**

### 7c. The one thing this filing does not do that a filing could be read as owing

**It does not flip the trackers.** `docs/next-steps.md`'s `S1` row's spec cell (*"OWED — not filed"*) and
`docs/pending.md` `§R` `P-R1`'s matching clause are **the supervisor's/orchestrator's to flip at their own gates**
(`§1.3` item 11), and **this filing edits exactly ONE file** — `docs/specs/secure-exclusion.md`. **A reader who finds
the trackers still saying `OWED — not filed` after this filing has found the correct state of the TRACKERS, not an
error in this spec.**

---

## 8. Falsification / stop conditions

1. **THE STATE MACHINE**: a third state name, an implementation whose two readings can disagree, a per-window or
   per-realm copy, or a module-global mutable record FAILS (`P-EX-IM-1`/`P-EX-IM-3`).
2. **THE ENFORCEMENT**: a design whose exclusion rests on `applyGatePatch`'s registry toggling ALONE, an stdio-only or
   HTTP-only check, a check that needs a `pending` entry to exist, or a deregistration on disable FAILS
   (`P-EX-IM-2`).
3. **THE EPOCH / INVALIDATION**: a transition that resolves a stale reply with the renderer's value, an invalidation
   that re-arms readiness, an invalidation that touches `ready`, or an epoch bumped by a self-transition, by an
   outside-value call or by an `IPC_SECURITY_SET` FAILS (`P-EX-IM-3`/`P-EX-SM-1`).
4. **THE BOOT**: a boot that resolves `'mcp-disabled'` under ANY input class, a state read from a file, a new persisted
   key, or an MCP server constructed/started before the **store and the gate** FAILS (`P-EX-SM-3`; **this clause names
   the ORDER OF CONSTRUCTION, not an OPEN/CLOSE call — `§2.1` item 4's restated boot clause**).
5. **RE-ARM**: a state derived from `isReady()`, a reload that re-arms the exclusion, a timer that re-arms it, or a
   modified `IPC_READY` handler FAILS (`P-EX-SM-2`).
6. **THE REFUSAL**: a throw anywhere, a token other than `'exclusion-closed'`/`'malformed-state'`, an absent or
   misspelled `reason`, a store-union member added, or a second spelling FAILS (`P-EX-TP-1`).
7. **THE CHANNEL**: an absent `exclusion` member, a SET that moves the state, a malformed payload that throws or that
   reports `applied:true`, or a landed `write` member displaced by the new member FAILS (`P-EX-TP-2`).
8. **THE BOUNDARY**: any byte moved in the four forbidden paths, any `secure.*` segment check in the diff, any new MCP
   surface, any new `scripts` key, any new persisted artifact, or any `src/shared/**` edit FAILS (`P-EX-IM-2`'s static
   arms).
9. **GATE 6**: a parked battery is NOT a pass (`RCA-11`); a `STRUCTURAL` claim for this unit is a review finding; a
   `§6.1` report whose `summary.total` disagrees with its matrix is **INVALID, not empty** (`§2.4` item 7).
10. **PROVENANCE — WHAT WOULD OVERTURN THIS FILING**: a shell-capable read showing `SecurityGate` already carries an
    exclusion record (the `§1.2` OBSERVATION cells spent); a landed change that moves `applyGatePatch`'s semantics; a
    ruling that reverses `§0A` item 6 (readiness re-arms) or `§0A` item 8 (a second window obliges serialization); or
    an architect ruling that the exclusion's vocabulary is his rather than this spec's (then `§0A` items 1/2/3/4/5/7 are
    amended in place, and no row, term or clause count moves).

---

## 3a. Adversarial findings — the seed set for the pass that will run (as filed: the SHAPE this contract will be reconciled to)

The pass hunts, at minimum: **the state record's hostile readers** (a getter proxied, frozen or deleted; a `withExclusion`
called with a token-like object carrying a `toString`; a second gate constructed concurrently) · **the invocation turn's
evasions** (a tool invoked DURING the transition — the reply that races the bump; a resource read; a dynamic
`module:<name>.<tool>` invocation, which goes through `invokeModuleTool`'s OWN two-gate and must ALSO meet the exclusion
turn — **the two-gate and the exclusion are DIFFERENT axes and a design that conflates them is a finding**; a call whose
`args` carry a hostile proxy) · **the epoch's ordering** (two transitions in one tick; a transition while a reply is
already in the reply queue; a reply for an id whose entry was invalidated — it must be DROPPED, never resolved) ·
**the invalidation's blast radius** (an invalidation with no pending entries; an invalidation racing `handleReply`; an
invalidation racing a NEW accepted call in the same tick — the new call must NOT be invalidated by a transition it was
never subject to) · **the transports** (a POST whose body is a slow stream while the transition runs — the 503 must
precede the body; a POST with a hostile `Content-Length`; a GET/DELETE during `'mcp-disabled'` — the landed 405 arms
must be unmoved; an authorized POST in each state) · **the manual-UI channel** (a payload that is a hostile proxy; a
payload carrying the token with a homoglyph; two transitions racing; a GET during a transition) · **the pane control**
(a bridge absent; a `setExclusion` that rejects; a `syncConfig` pass with a hostile `cfg`; the toggle rendered twice) ·
**the boundary** (any `secure.*` spelling; a union member; a byte in the four frozen paths; a third persisted filename) ·
**the oracle** (an unauthenticated POST in each state; a tool-name listing in each state; a disconnect observed across a
transition). Findings are dispositioned in `§3b` with one of the six recorded dispositions (`HOST-FIX` · `RED-SET-FIX` ·
`TEST-SIDE RE-GRAIN` · `DOC-REVIEW-ITEM` · `PAR`-note · `SATISFIED`/`NOT-A-FINDING`), **never a bare `OWED`**; a genuine
`provident-ssr` package defect found by the pass is a handoff item (`docs/defects.md` + `docs/HANDOFF.md`), never a host
patch.

## 3b. The adversarial pass's disposition table — the SHAPE (filled by gate 4; every finding dispositioned, host fixes land here with red-first regression rows)

| # | Finding (as returned) | Severity | Disposition | Red-first row |
| --- | --- | --- | --- | --- |
| *(to be filled by gate 4 — the read-only adversarial pass and the read-only PBT audit over `§5.5.1`; every row dispositioned within the six-disposition vocabulary, and the PBT audit's over-strength / under-assertion / evasion checks dispositioned here rather than left as an `OWED`)* | | | | |

---

**END OF THE SPEC.** Nine typed register rows, executed deterministically with no seed and no new dependency; the
exclusion's state machine closed at two legal pairs over one process-global record; the invocation turn as the
mandatory enforcement beside the landed registry toggling; the epoch and the in-flight invalidation closing the
`RendererBackend`'s 60 000 ms window; both transports pinned, with the HTTP path answered before its per-POST server is
built; the boot terminal fail-safe because the flag is not persisted; ONE operator control authored as provident data in
the isolated pane graph with its off-state line and its re-arm ownership; the refusal a CHANNEL token with the store's
union unmoved at `16`; `main` supplying STATE while the store keeps the DECISION; `D-18`'s panes untouched;
`D-CLAUSE-2` uncontradicted; **and the decisive property stated at the head of this file and restated as `§6`'s
checklist: this unit touches NO frozen artifact and NO store byte.**
