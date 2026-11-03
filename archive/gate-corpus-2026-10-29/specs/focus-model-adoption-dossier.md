# STEP 0 — THE ADOPTION DOSSIER FOR `U-FOCUS-MODEL` (ledger row `F2`)

**What this file is.** The **STEP-0 adoption dossier** for `U-FOCUS-MODEL`, required by **step 4's
`G-2`** of the gate-1 record (`docs/specs/focus-model-review.md` `§4`) **before gate 1 closes, and
recorded there as a `G-2` CONDITION RATHER THAN A COURTESY** — because **step 0 was SKIPPED for this unit
although its whole seam vocabulary is FORK-ADOPTED** (that record's step-4 process finding (b)).

**Its requested shape** is the adoption-dossier request recorded at
`docs/specs/rca-cross-project-handoff-semantics.md` `§3.1` — **whose own header says its items are
REQUESTS, NOT LANDED RULINGS** (`docs/pending.md` `§K`, request `K-1`; the same "background only, not in
force" marking the sibling contracts carry at `docs/specs/relocate.md` `§8`, `docs/specs/container.md`
`§8` and `docs/specs/menulib.md` `§8`). **This dossier therefore uses that shape as a SHAPE, and claims
no gate step, no verdict word and no harness modification as landed.** **What DOES bind this unit, and is
cited as binding below, is the architect ruling `A-d5` itself** (`docs/decisions.md`'s
`DECIDED: FOCUS-UI-ONLY-MCP-TOOL`, and `S-d12` in
`docs/specs/provident-electron-shell-chrome-handoff-review.md`).

**Two hard limits, stated first.**

1. **THE ROW CAP: `≤8` IDENTIFIER ROWS, each carrying a SOURCE CITATION and a STATUS.** This file carries
   **`7`** identifier rows (`§1`), **beside** `2` cited default rows (`§3`) that are **not** counted
   against the identifier cap because they are the step-3 **derived defaults** `G-3` demands, not adopted
   identifiers. **`7 ≤ 8`: THE CAP HOLDS, and no row was dropped, merged or left unenumerated to fit it**
   (`AGENTS.md` item 11(f): a row count is an outcome, never a budget).
2. **NOTHING HERE IS CLOSED BY ASSERTION.** **`STATUS` is `defined` for all nine rows below, and
   `NO ROW IN THIS FILE IS `undefined-until-answered`` — **but a row is `defined` ONLY where the
   citation below actually fixes its meaning.** **An identifier whose meaning cannot be cited is an OPEN
   row and must be reported as such, not converted**: `§5` carries the one identifier this dossier found
   in that position, **with the question the architect must answer and the reading this file refuses to
   infer.**

**Provenance of this file, stated before its first row, because its author ran NO SEARCH OF ITS OWN.**
**This pass held read/search and documentation-write tools and NO SHELL**, and it **ran no source scan, no
suite, no leg, no `tsc`, no build and no commit**. **Every tree fact cited below is a fact ALREADY FILED
in an existing record — the gate-1 record's step-1 measured facts (`docs/specs/focus-model-review.md`
`§2.2`), the architect ruling's row (`docs/decisions.md`), the handoff review's rows
(`docs/specs/provident-electron-shell-chrome-handoff-review.md`), or the ledger's own cells
(`docs/next-steps.md`).** **NO CENSUS, COUNT OR LINE NUMBER IS RE-MEASURED HERE, and none of the
figures in this file is a leg.**

---

## §1 THE IDENTIFIER ROWS — `7` of the `≤8` the condition allows

**The row set is the set `G-2` names: the three seam names and their shapes, the borrowed refusal
callback shape, the verb vocabulary, the refusal codes, and the entry record's members** — **grouped the
way the unit's own vocabulary actually arrives: the three SEAM NAMES as adopted tokens (`I-1`) are
distinguished from the SHAPES they borrow (`I-2`), because the names are adopted from the FORK-SIDE
charter while the shapes are adopted from THIS REPO's landed hosts, and the two adoptions have different
sources and different collision answers.**

| # | Identifier | Kind | What it is / what it decides | SOURCE CITATION (the adoption's origin) | STATUS |
| --- | --- | --- | --- | --- | --- |
| **`I-1`** | **`refuse` · `onChange` · `persist`** — the seam NAMES, as one row | seam names (vocabulary) | The three injected couplings, **pre-committed BY NAME AND BY NOTHING ELSE** in the charter — **their signatures, arity, required/optional status, return handling and degradation rules are NOT in the charter** | **The charter, quoted in `docs/next-steps.md`'s `F2` row**: *"the pure ordered-entry transition module over **opaque ids/targets** with injected **`refuse`/`onChange`/`persist`**; **no vocabulary, no store, no DOM**"*; **re-quoted at `docs/specs/focus-model-review.md` `§1` and `§`-header table, and its provenance chain is `SCH-13` → `A-d5`** (`docs/decisions.md` `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`; `S-d12` in `docs/specs/provident-electron-shell-chrome-handoff-review.md`) | **`defined`** — the three tokens are `refuse`, `onChange`, `persist`, in that casing, and **the charter fixes nothing else about them** (`docs/specs/focus-model-review.md` `§1`: *"PRE-COMMITTED BY NAME AND BY NOTHING ELSE"*) |
| **`I-2`** | **The borrowed refusal CALLBACK SHAPE** — `(refusal) => void`, ONE CALL, ONE REFUSAL RECORD | seam shape (borrowed from a landed host) | **The single-call callback form**, chosen over the second landed form so that **no second authority is acquired**: refusal means **the attempt changed nothing**, the prior state is returned **by identity**, and the callback is **observation, never the gate** | **`docs/specs/focus-model-review.md` `§2.2` row 3** (step 1's read-only measurement, carried as filed): **`slot-host.ts`'s `SlotHostOptions.refuse?: (refusal: SlotHostRefusal) => void`** — *"a single-call callback carrying one refusal record"* — **versus `owned-list-host.ts`'s refusal-array / result form, where refusals are COLLECTED AND RETURNED AS DATA**; **step 3's choice of the first form is carried at `docs/specs/focus-model-review.md` `§4` item 4** | **`defined`** — **the shape is the landed `slot-host.ts` callback; the UNION is this unit's own (`I-5`)**, and step 3's record says so explicitly (*"borrows the landed host's callback shape with THIS unit's own closed union"*) |
| **`I-3`** | **The VERB vocabulary** — a CLOSED FIVE-member union | vocabulary token set | The transition alphabet: **`open`** (appends, or activates an existing entry for the same target) · **`activate`** (sets the active id) · **`close`** (drops an entry with the declared re-seating) · **`next`** / **`prev`** (move over the order). **An UNKNOWN verb is TOTAL**: no throw, the state returned by identity, one refusal | **`docs/specs/focus-model-review.md` `§4` item 6** (step 3's return, filed as substance) **and `§2.1` `C-8`** (step 1's condition that demanded the verb set and the unknown-verb rule). **The rule the closed-ness serves is `docs/decisions.md`'s `A-d5` row**: *"no vocabulary (`'tab'`/`'pane'`/zone/region **may not appear as a symbol, union member or default**)"* — **so the verb members must be behaviour words, and NO consumer noun may be a member** | **`defined`** — five members, closed, with the unknown-verb totality stated; **the member NAMES are this unit's own choice of behaviour words, fixed by the contract, not adopted from the fork** |
| **`I-4`** | **The ENTRY RECORD's members** — `{readonly id: unknown; readonly target: unknown; readonly label?: string}` | data shape (members ADOPTED from the fork's ask; the shape is this unit's) | **The closed entry record**: an opaque `id`, an opaque `target`, and a **CALLER-OWNED OPTIONAL `label`** — **the label is the caller's own string, echoed or absent, and it is how the consumer reaches the endpoint shape without this module owning vocabulary** | **The members are the fork-side ask's own nouns**, carried in `docs/next-steps.md`'s `F2` row (*"over **opaque ids/targets**"*), in `docs/decisions.md`'s `A-d5` row (*"a pure ordered-entry transition module over opaque ids/targets"*) and in `S-d12`; **the `label` member's origin is the endpoint shape `docs/specs/focus-model-review.md` `§3.1` finding 2 records as ALREADY PINNED** (*"`activeId` / `entries` / `opened` / `refused`"*) — **and step 3's resolution is that the LABEL is how that vocabulary stays CONSUMER-SIDE** (`§4` item 3) | **`defined`** — three members, closed, `id` required, `target` required, `label` optional; **`id` and `target` are `unknown`, per `A-d5`'s opacity clause**, and `label` is **the caller's own optional string** |
| **`I-5`** | **The REFUSAL CODES** — a CLOSED SIX-member union | error-code vocabulary | The refusal domain's closed set, **this unit's OWN** — **not borrowed**: refusal is **not a store and not a callback's verdict**, it is **a code the result carries** | **`docs/specs/focus-model-review.md` `§4` item 3** (*"a CLOSED six-member refusal-code union"*) **and `§4` item 4** (*"THIS unit's own closed union"*), **against `§2.1` `C-3`** — step 1's condition demanding a closed code union and one call per refused operation. **`§2.2` row 3 is the NEGATIVE half of the citation: the two landed `refuse` shapes carry NO code union this unit can adopt** | **`defined`** — the union is closed at six members and is **this unit's own**; **the six member VALUES are the contract's to fix, and the count `6` is the adopted fact this dossier pins** **⟶ ANNOTATED 2026-09-27 (the gate-3 red run's disposition (a)) — THE ADOPTED SIXTH MEMBER IS UNEXERCISED AND IS THEREFORE WITHDRAWN FROM `U-FOCUS-MODEL`'s CONTRACT.** **MEASURED: this row adopted a SIX-member union while the contract files FIVE emitted bodies and its rows can drive exactly those five — THERE IS NO DRIVABLE SIXTH MEMBER.** **THE AS-FILED ROW ABOVE IS KEPT VERBATIM AND NOTHING IN IT IS RE-WRITTEN: the `STATUS` word, the citation, the adopted count `6` and the OWNERSHIP claim all stay exactly as filed.** **THE WITHDRAWAL, STATED PLAINLY BECAUSE THE ADOPTION IS EXTERNAL: the ADOPTION of the six-member count is a fork-side / external act and is NOT withdrawn by this unit; what is withdrawn is the SIXTH MEMBER'S PLACE IN THIS UNIT'S CONTRACT — the contract's union is aligned to the FIVE bodies it EMITS and its rows DRIVE (`docs/specs/focus-model.md` `§2.1` item 7), so the adopted sixth member is UNEXERCISED and has NO ROW THAT COULD DRIVE IT.** **AND THE WITHDRAWAL IS THIS UNIT'S OWN SCOPE DECISION AND IS REVERSIBLE: a later pass that wants the sixth member takes it as a DECLARED-BUT-UNEMITTED member in the landed `docs/specs/slothost.md` `SlotHostRefusal` `'no-container'` form, on a NEW dated amendment plus a register re-grain** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). **NO ROW ID, STATUS WORD, CITATION OR FIGURE ELSEWHERE IN THIS FILE MOVES, AND THE ROW CAP IS UNAFFECTED: this annotation ADDS NO ROW, so `7 ≤ 8` still holds and `§1`'s `7` identifier rows remain `7`.** |
| **`I-6`** | **`FocusId`** — the opaque id | type (opacity declaration) | **`FocusId = unknown`** — **opacity declared as a TYPE rather than as an adjective**, so no coercion, no naming and no structural comparison is available to the module | **`docs/specs/focus-model-review.md` `§4` item 3** (step 3's type half), **against `§2.1` `C-6`** (step 1's condition that *"opaque"* name its equality rule) **and `§3.1` finding 4** (*"'opaque' has no falsifiable definition here"*) | **`defined`** — `unknown`, with **identity equality plus an OPTIONAL caller-supplied equality function**, and **`Map`/`Set` keying permitted because it coerces nothing while OBJECT KEYING IS BANNED** |
| **`I-7`** | **`target`** | type (opacity declaration) | The opaque entry payload: **carried and returned, NEVER CONSULTED** — **never compared, never named, never resolved, never property-read** | **`docs/specs/focus-model-review.md` `§4` item 5** (step 3's opacity half), **against `§2.1` `C-7`** (step 1's condition naming the banned verbs) **and the landed family form the record cites**: *"`U-THEME`'s caller-supplied name echoed verbatim by identity"* | **`defined`** — `unknown`, echoed by identity, **never compared**; **the forbidden verbs are named over named bytes and a coercion-hook-driving row must FAIL on a hidden coercion** |

**WHY `7` AND NOT `8`.** **The eighth candidate this pass considered — the new `'focus'` METHOD NAME and
its route — is NOT an identifier this unit adopts**: **it belongs to `U-FOCUS-TOOL`, it is `FQ3`, and
step 3's return states in terms that *"it is NOT this unit's and does not block its filing"***
(`docs/specs/focus-model-review.md` `§4` item 11). **It is therefore ROUTED, not filed here** — see `§5`.

---

## §2 THE COLLISION BLOCK — every adopted identifier checked against the consuming repo's prohibition and vocabulary rows

**The checked set is this repo's own prohibition and vocabulary rows, cited by ROW NAME (the ledger and
the prohibition tables are appended-to, and their line anchors drift).** **The demanded form is the
family's: *"the token is banned in layer X for reason Y, and legitimate in layer Z because …"*, WITH THE
SCAN ROW NAMING ITS EXEMPTIONS OR STANDING VACUOUS** (`docs/specs/focus-model-review.md` `§2.4`) — **an
unnamed exemption makes the row unfalsified.** **Each hit below is RECONCILED BY ROW ID or RE-NAMED; none
is left unreconciled.**

| # | Adopted identifier | The prohibition / vocabulary row it hits | The reconciliation — `banned in layer X for reason Y, legitimate in layer Z because …` |
| --- | --- | --- | --- |
| **`X-1`** | **`I-1`'s names and `I-6`/`I-7`'s opacity tokens — the word `focus`** | **The shim / runtime FOCUS-WALK BAN**: no `activeElement`, no focusable walk — *"the shim's focus-walk ban is ABSOLUTE"*; **the sibling `U-OVERLAY`'s focus-trap half was REFUSED on exactly that ground** (`docs/specs/focus-model-review.md` `§2.4`'s `focus` row, citing the landed ban) | **BANNED in the shim/renderer layer FOR the reason that a focus walk needs a live DOM the shim does not model.** **LEGITIMATE in `src/shared/focus-model.ts` BECAUSE the module reads NO DOM, holds NO element, wires NO event and NEVER touches `activeElement` or any focusable set** — its order is **the caller's array** (`docs/specs/focus-model-review.md` `§4` item 6). **THE RECONCILIATION IS A SCAN ROW, NOT A PROSE NOTE: the module's own export census and import census `0` are the falsifier** (`§4` items 1–2). **NO RE-NAME IS REQUESTED** — the ban's layer is named, and the module's layer is outside it |
| **`X-2`** | **`I-3`'s verb members and `I-4`'s `entries`** | **`A-d5`'s NO-VOCABULARY clause**: *"`'tab'`/`'pane'`/zone/region may not appear as a symbol, union member or default"* (`docs/decisions.md` `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`) | **BANNED everywhere in this unit FOR the reason that consumer vocabulary would make the mechanism an app-domain authority.** **LEGITIMATE: NONE OF THE FIVE VERB MEMBERS (`I-3`) AND NONE OF THE THREE ENTRY MEMBERS (`I-4`) IS A CONSUMER NOUN** — `open`/`activate`/`close`/`next`/`prev` are **behaviour words**, and `id`/`target`/`label` are **the caller's own slots**. **THE EXEMPTION IS NAMED RATHER THAN VAGUE, and the row is falsifiable: a `'tab'`, `'pane'` or region noun appearing anywhere in the module's bytes or its test file FAILS the scan row** (`docs/specs/focus-model-review.md` `§2.1` `C-9`; `§4` item 6) |
| **`X-3`** | **`I-2`'s callback shape** | **The LANDED-SHAPE COLLISION itself**: `refuse` **is landed TWICE in INCOMPATIBLE shapes** (a single-call callback vs a collected refusal array) — *"a filing that copies either `refuse` shape silently acquires a precedent; a filing that invents a third acquires a second authority"* (`docs/specs/focus-model-review.md` `§2.2` row 3; `§6` `FM-3`) | **THE COLLISION IS RECONCILED BY ROW ID, IN THE DEMANDED FORM: the single-call callback form is taken (banned-in-this-layer only in the sense that the OTHER landed form must not also be present), FOR the reason that two refusal shapes in one module is a second authority.** **LEGITIMATE in this module BECAUSE exactly ONE of the two landed forms is adopted, as `I-2`, and the union it carries is this unit's own (`I-5`) — so the module is CONFORMANT to a landed shape WITHOUT inheriting the landed union's vocabulary** |
| **`X-4`** | **`I-2`'s and `I-3`'s seam names, seen against the MAIN-SIDE surface tables** | **`VALID_GROUPS` · the `ALL_TOOLS` name set · the `RpcMethod` union · the renderer's `MUTATING_METHODS` set** — the tables that decide what an agent can call and what notifies | **BANNED in the main/renderer layers FOR the reason that a name in those tables is a callable surface an agent can reach.** **LEGITIMATE in this module BECAUSE IT ADDS NOTHING TO ANY OF THE FOUR TABLES** — *"adds no tool, method, group, mutating-list entry, channel or store handle"*, **and the endpoint's output shape is produced by the CONSUMER, never returned here** (`docs/specs/focus-model-review.md` `§4` item 7; `§2.1` `C-12`). **THE SCAN ROW STANDS VACUOUS, DELIBERATELY: there is no exemption to name, because there is no entry** |
| **`X-5`** | **`I-2`'s `persist` name vs the `persist` token's landed meaning** | **`persist` EXISTS ONLY AS MAIN-SIDE STORE INTERNALS — i.e. the one landed meaning of the word is the meaning the charter's own `no store` clause FORBIDS** (`docs/specs/focus-model-review.md` `§2.4`'s `persist` row; `§3.1` finding 3) | **BANNED in this UNIT for the reason that a module that calls storage has acquired the store its charter forbids.** **LEGITIMATE ONLY AS A RETURNED VALUE — `persist(state)` returns a value for the CALLER to store and NO STORAGE IS CALLED ANYWHERE** (`docs/specs/focus-model-review.md` `§4` item 4) — **AND THE NAME IS RECORDED AS IMPRECISE RATHER THAN PRESERVED SILENTLY** (step 3's own decision; `§3.1` finding 3's demanded reconciliation). **NO RE-NAME IS TAKEN HERE; the imprecision is a CONTRACT-LEVEL row this dossier reports, and a re-name would need the architect, since the token is the CHARTER's (`I-1`)** |
| **`X-6`** | **`I-4`'s entry members vs the endpoint's pinned output shape** | **The `F2`→`F3` boundary's already-pinned consumer shape** — `activeId` / `entries` / `opened` / `refused` (`docs/specs/focus-model-review.md` `§3.1` finding 2) | **BANNED in THIS module FOR the reason that `opened` and `refused` are consumer vocabulary the `no vocabulary` clause does not obviously admit.** **LEGITIMATE BECAUSE THE SHAPE IS PRODUCED BY THE CONSUMER, NEVER RETURNED HERE — and the only bridge is the CALLER-OWNED optional `label`**, which lets the consumer reach the endpoint shape **without this module owning a single one of those nouns** (`docs/specs/focus-model-review.md` `§4` items 3 and 7; `I-4`). **FALSIFIER: the string `opened` or `refused` appearing in this module's bytes as a member, union member or default FAILS** |
| **`X-7`** | **`I-3`'s verb members vs the `'focus'` METHOD and its route** | **The renderer's `MUTATING_METHODS` set** — *"a METHOD ABSENT FROM THE MUTATING LIST STILL CROSSES THE EXISTING IPC INVOKE PATH"* (`docs/specs/focus-model-review.md` `§3.2` `FQ3`) | **BANNED-for-this-unit only in the sense that a verb member must never become a CALLABLE NAME.** **LEGITIMATE BECAUSE THE VERB UNION IS A PURE DATA DOMAIN THE CALLER SUPPLIES — the module registers no method and routes nothing** (`docs/specs/focus-model-review.md` `§4` items 2 and 7). **THE ROUTE QUESTION ITSELF IS `FQ3` AND IS ROUTED, NOT ADOPTED HERE: EXCLUSION FROM A RENDERER-SIDE MUTATING SET NEVER DECIDED THE INVOKE PATH** — see `§5` |

**THE COLLISION BLOCK'S OWN HONESTY NOTE, CARRIED BECAUSE THE SIBLING RECORD INSISTS ON IT:** **the
checked-set rows above are cited from records, and NO GREP WAS RUN BY THIS PASS** (the pass's provenance
block). **A row's absence here is therefore NOT PROOF that the consuming repo carries no prohibition of
that name — it is the statement that NO FILED ROW WAS FOUND for it, and a later scan-capable pass must
re-run the check before the contract is filed.** **The two rows this block CANNOT stand vacuous on are
`X-1` (the focus-walk ban, which is absolute and landed) and `X-5` (the `persist` token, whose landed
meaning is the one the charter forbids): both are reconciled above BY ROW and neither is left as prose.**

---

## §3 THE TWO DERIVED DEFAULTS — rows WITH CITATIONS, and NEITHER is `undefined-until-answered`

**`G-3` in terms: the two derived defaults each appear as a dossier row WITH A CITATION, NEVER
`undefined-until-answered`, because a silent open row would force `BLOCKED-ON-SEMANTICS`.** **Step 4
AGREED the two defaults are fileable under `AGENTS.md` item 10a — BUT ONLY UNDER `G-3`**
(`docs/specs/focus-model-review.md` `§4` item 13). **So the two rows below are `defined` BY THE CITATION
IN THE THIRD COLUMN, and each carries the ARCHITECT-REVERSIBLE ALTERNATIVE its filing requires.**

| # | The default, as step 3 derived it | STATUS | THE CITATION THAT FIXES IT (never an open row) | The architect-reversible alternative, recorded rather than hidden |
| --- | --- | --- | --- | --- |
| **`D-1`** | **`FQ1` — WHAT AN ENTRY IS AS DATA** | **`defined`** | **Resolved by step 3, `docs/specs/focus-model-review.md` `§4` item 3**: **the entry is a CLOSED record `{readonly id: unknown; readonly target: unknown; readonly label?: string}`** — members fixed, `id`/`target` required and opaque, `label` optional and caller-owned; **a duplicate is REFUSED on the first-occurrence rule with the refused occurrence not reserving the id** (`§4` item 6). **Its provenance is `I-4`'s citation** (the charter's *"opaque ids/targets"* plus the endpoint shape of `§3.1` finding 2) | **REVERSIBLE: a member set that is open rather than closed, or an identity that is a caller-supplied key rather than the opaque `id`, is a contract change the architect may take at the spec gate** — it would move the register's entry-shape domain and every `P-IM` row, so it is named here rather than assumed |
| **`D-2`** | **`FQ2` — WHO SUPPLIES AND OWNS PERSISTENCE (and who owns `{entries, activeId}`)** | **`defined`** | **Resolved by step 3, `docs/specs/focus-model-review.md` `§4` items 1 and 4**: **`persist(state)` RETURNS A VALUE FOR THE CALLER TO STORE — NO STORAGE IS CALLED ANYWHERE** (the returned-write precedent), **and the CALLER owns `{entries, activeId}` while the module owns nothing and mutates no argument**; **the seam's NAME is RECORDED AS IMPRECISE rather than preserved silently.** **Its provenance for the ownership half is `A-d5`'s own `no store` clause** (`docs/decisions.md` `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`: *"no store"* on the model's side; *"persists nothing (this repo owns no UI-config store)"* on the tool's side) | **REVERSIBLE: `MISNAMED` is the third reading `§3.1` finding 3 names** — if the architect rules the seam misnamed, it is re-named rather than kept; **and `no store` could be read as *"no SECOND store"* (making the module the owner) instead of *"the caller owns it"*** — `C-2` names both readings and step 3 took the second |

**NO ROW IN THIS FILE IS `undefined-until-answered`:** **`§1`'s seven identifier rows, `§3`'s two default
rows and `§2`'s collision rows are all `defined`** — **`9` rows in total, `7` of them identifier rows
against a cap of `≤8`.** **The one identifier whose meaning this pass could NOT cite is not in those
counts, because it is not this unit's: it is reported as an OPEN question at `§5`, per the condition's own
instruction not to close an uncitable meaning by assertion.**

---

## §4 WHAT THIS DOSSIER DOES *NOT* DO

1. **NO CONTRACT.** **It does not file `docs/specs/focus-model.md`, does not stub it and does not pre-empt
   a clause of it** — that file **REMAINS `OWED — not filed`**, and it is the artifact that will carry the
   `§0` prohibition table, the semantics table, the collision reconciliation, the derived denied set, the
   layer map and the typed `§5.x` register (`docs/specs/focus-model-review.md` `§7` item 4).
2. **NO GLOSSARY INSERTED.** **The requested shape's fourth item — the definition-of-terms block that goes
   INTO the unit's spec — is NOT inserted here**, because **the spec does not exist**; **`§1` is the
   dossier half, and the spec-side glossary is that contract's row** (`docs/specs/rca-cross-project-handoff-semantics.md`
   `§3.1` item 4, requested).
3. **NO FORK-FACING RESTATEMENT.** **`docs/FORKER.md` is NOT edited by this pass**: **the fork-facing
   glossary/restatement is that document's block and another pass's row** (`docs/FORKER.md` already
   carries the `provident.focus` row with its `OWED, NOT YET IMPLEMENTED` marker).
4. **NO LAYER MAP.** **The per-behaviour `[T]`/`[H]`/`[U]`/`[D]` layer map is `§5.2`-class contract text,
   not dossier text**, and step 3's layer answer is filed at `docs/specs/focus-model-review.md` `§4`
   item 8 — **including the three-part `[U]`/`[D]` refusal, with the word `waived` FORBIDDEN**.
5. **NO COUNT, CELL, ROW ID, TERM, STRATEGY ID, SEED OR CAP MOVED — AND NO LEDGER FLIP.** **The ledger
   remains `19 DONE / 2 open` UNITS = `21` units, the open set `F2` `U-FOCUS-MODEL` · `F3`
   `U-FOCUS-TOOL` = `2`, and `F2` remains an OPEN row at gate 1.** **This pass flips no cell.** **It
   neither registers nor executes a single register term** — a register row that has not run is a
   FAILURE, never a pass, and none is run here.
6. **NO SOURCE AND NO TEST.** **No `src/**` file and no test file was read into this file, written,
   edited or proposed** — **`src/shared/focus-model.ts` and `tests/focus-model.test.ts` DO NOT EXIST**
   (`docs/specs/focus-model-review.md` `§2.2` row 1: no module in `src/shared/**` models focus, entry,
   order or transition today).

---

## §5 THE ONE OPEN ROW — `FQ3`, ROUTED TO THE CONSUMER UNIT'S RECORD AND NOT SILENTLY DROPPED

**`G-4` in terms: the third question is ROUTED TO THE CONSUMER UNIT'S RECORD AND NOT SILENTLY DROPPED.**
**`FQ3` is: WHO OWNS THE NEW `'focus'` METHOD AND ITS NON-NOTIFYING, NON-RE-RENDERING ROUTE — given that
a method ABSENT from the mutating list STILL CROSSES THE EXISTING IPC INVOKE PATH**
(`docs/specs/focus-model-review.md` `§3.2` `FQ3`).

**IT IS NOT THIS UNIT'S IDENTIFIER AND DOES NOT BLOCK `F2`'s FILING** — step 3's return says so in terms
(`docs/specs/focus-model-review.md` `§4` item 11), **and step 4 did not disturb that reading (item 13).**
**It is therefore ROUTED — ANNOTATED BESIDE `docs/next-steps.md`'s `F3` LEDGER ROW, the consumer unit's
own record, whose OWNER IS `U-FOCUS-TOOL`** — **and NOT filed as a dossier row, because filing it here
would attribute the consumer's identifier to the model unit.**

**THE READING THIS DOSSIER REFUSES TO INFER, STATED BECAUSE IT IS THE ONE A LATER PASS IS MOST LIKELY TO
ASSUME:** **EXCLUSION FROM A RENDERER-SIDE MUTATING SET NEVER DECIDED THE INVOKE PATH.** **The
`MUTATING_METHODS` set is a RENDERER-SIDE list** (`docs/specs/focus-model-review.md` `§3.2` `FQ3`);
**membership in it is not what decides whether a call mutates or re-renders, so a method's absence from
it does NOT remove the method from the IPC invoke path.** **Consequently `F3`'s prose — which is scoped to
the renderer's mutating-methods set — and its census cell — which quotes tool obligations
(`ALL_TOOLS`/`RpcMethod`) — name TWO DIFFERENT OBJECTS IN ONE ROW** (`§3.1` finding 1; step 4's `G-7`),
**and the repair is a TRACKER-ROW REPAIR AT ITS OWN SITE: ONE CELL NAMES ONE OBJECT.** **This dossier
records the routing and the refusal; it performs neither the contract clause nor the ledger repair.**

**AND THE REASON THIS FILE EXISTS AT ALL, CARRIED AS ITS CLOSING FINDING:** **STEP 0 WAS SKIPPED for a unit
whose whole seam vocabulary is FORK-ADOPTED, with no written zero-row rationale**
(`docs/specs/focus-model-review.md` `§4` item 14(b)). **A zero-row dossier would have been an acceptable
answer had the rationale been WRITTEN; it was not written, so this file is a `G-2` CONDITION rather than a
courtesy.** **Every row above therefore names the record it read — and where no record could be cited, this
file says so instead of asserting a meaning.**

**⟶ CLOSE-OUT ANNOTATION (`2026-09-27`, appended BESIDE the as-filed rows and the `§5` routing above — `RCA-8(d)`: every row of this dossier stands byte-for-byte, its `7` identifier rows, its `X-1`…`X-7` collision block, its `2` cited default rows and its `1` routed open row are NOT rewritten, and this note adds the unit's outcome and its one withdrawal.)** **THE UNIT IS `DONE`: `U-FOCUS-MODEL` (`F2`) is the ledger's TWENTIETH `DONE` row** (authoritative record: `docs/next-steps.md`'s `## DONE — U-FOCUS-MODEL` section), **and this dossier's `D-1`/`D-2` are the two WORKING DEFAULTS the contract implemented and re-asked at its `§7a.1` — both still recorded working defaults, architect-reversible, and NOT promoted to rulings by the close-out.** **THE ONE ROW THAT MOVES IS ANNOTATED AT ITS OWN SITE AND IS NOT SMOOTHED HERE: `I-5`'s ADOPTED SIX-MEMBER REFUSAL-CODE UNION IS WITHDRAWN FROM THIS UNIT'S CONTRACT — the contract files FIVE emitted bodies and its rows drive exactly those five, so there is NO DRIVABLE SIXTH MEMBER — and the withdrawal is THIS UNIT'S SCOPE DECISION, recorded at `I-5`, REVERSIBLE, with the EXTERNAL adoption itself NOT withdrawn** (`docs/specs/focus-model.md` `§2.1` item 7, `§0A` note 9 disposition (a)). **THE WITHDRAWAL IS CARRIED AS AN OWED ITEM IN THE UNIT'S RECORD** (its clause (11)(c); `docs/pending.md` `§L-4l`). **`§5`'s ROUTED ROW IS DISCHARGED AT THE SITE IT NAMED: `FQ3` is carried at `docs/next-steps.md`'s `F3` row's own status cell, and that row's routing clause names this dossier's `§5` as its home in turn.** **THE CLOSE-OUT RECORD IS `archive/reviews/2026-09-27-U-FOCUS-MODEL-doc-review.md`.** **NO LEG, NO SUITE AND NO `tsc` WAS RUN BY THIS PASS, AND NO FIGURE IN THIS NOTE IS ITS OWN MEASUREMENT.**

---

**⟶ DATED POINTER, `2026-10-11` — THE `docs/pending.md` CITATIONS IN THIS DOSSIER RESOLVE HERE (`RCA-8(d)`: an ADDITIVE block at the file's end; NOT ONE PRE-EXISTING BYTE IS REWRITTEN, no identifier row, collision row, default row or routed row moves).** **THE TWO CITED SITES: the `§0` framing block cites `docs/pending.md` `§K`, request `K-1` (the unadopted adoption-dossier role — *"REQUESTS, NOT LANDED RULINGS"*), and the close-out annotation cites `docs/pending.md` `§L-4l` for the unit's carried withdrawal item.** **`§K` AND `§L-4l` (with the whole letter `§L`) ARE RETIRED BY THE `2026-10-11` SWEEP, AND BOTH CITE-SITES RESOLVE TO STUBS IN `docs/pending.md` `§6.4` + `§6.6`.** **THE PER-ROW RECORD IS `archive/pending/2026-10-11-retired-rows-index.md` (`§D`); THE AS-FILED TEXT IS `archive/pending/2026-10-11-pending-as-filed-pre-sweep.md` (`sha256 b437a7db5398af3f14d8286f8b3e442ceae38308baf17ee8970da4fa89368382`, byte-identical to `git show 35fc7f2:docs/pending.md`).** **THE LIVE OBLIGATIONS ARE RESTATED IN `docs/pending.md`'S NUMBERED SECTIONS: the `§K` `K-1` request is `§1(c)` (the unadopted systemic-guard set, which the `H-1`…`H-4` requests comprise); the unit's carried register gap and its `docs/FORKER.md` seam carry are `§3`.** **This dossier's authority remains `docs/next-steps.md`'s `## DONE — U-FOCUS-MODEL` section.**
