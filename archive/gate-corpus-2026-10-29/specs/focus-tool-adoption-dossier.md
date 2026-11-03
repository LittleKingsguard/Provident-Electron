# STEP 0 — THE ADOPTION DOSSIER FOR `U-FOCUS-TOOL` (ledger row `F3`)

**What this file is.** The **STEP-0 adoption dossier** for `U-FOCUS-TOOL`, required by **step 4's `G-2`** of the
gate-1 record (`docs/specs/focus-tool-review.md` `§10`) **BEFORE THE SPEC GATE IS APPROVED** — because **this unit
ADOPTS EXTERNALLY-SOURCED IDENTIFIERS** (the tool name, the method name, the group, the fixed argument and return
shape, the refusal and readiness semantics, the entry-id policy and the notification exclusion), **and no dossier
existed for it: the `F2` class repeating in the very next unit** (`docs/specs/focus-tool-review.md` `§11` `P-8`).

**WHY THIS FILE IS A CONDITION RATHER THAN A COURTESY, IN `G-2`'s OWN TERMS: a SILENT ZERO-ROW is itself a FINDING, and
an OPEN row forces `BLOCKED-ON-SEMANTICS`.** **THE UNIT'S SHAPE IS DECIDED AND ITS FILING-BLOCKER SET IS EMPTY**
(step 3, `DELEGABLE-WITH-CONDITIONS`), **so this dossier is the ONE artifact standing between the record and a filing.**

**`G-2`'s SECOND CLAUSE IS CARRIED HERE AND NOT DISCHARGED BY IT: DO NOT BATCH THE DOSSIER WITH THE SPEC**
(`docs/specs/focus-tool-review.md` `§10`; its `§11` `P-9`) — **the dossier is the gating artifact and the contract is
the gated artifact, so they land in SEPARATE passes or the condition is defeated in substance.** **NO CONTRACT IS FILED
BY THIS PASS: `docs/specs/focus-tool.md` REMAINS `OWED — not filed`.**

**THE SHAPE THIS DOSSIER USES** is the adoption-dossier shape recorded at
`docs/specs/rca-cross-project-handoff-semantics.md` `§3.1` — **whose own header says its items are REQUESTS, NOT LANDED
RULINGS** (`docs/pending.md` `§K`, request `K-1`) — **and the sibling precedent is
`docs/specs/focus-model-adoption-dossier.md`** (`F2`'s dossier, `7` identifier rows + `2` cited default rows). **This
file therefore claims no gate step, no verdict word and no harness modification as landed.** **WHAT DOES BIND THIS UNIT,
and is cited as binding below, is the architect ruling `A-d5` itself** (`docs/decisions.md`'s
`DECIDED: FOCUS-UI-ONLY-MCP-TOOL`).

**Two hard limits, stated first.**

1. **THE ROW CAP: `≤8` IDENTIFIER ROWS, each carrying a SOURCE CITATION and a STATUS.** This file carries **`8`**
   identifier rows (`§1`) — **`8 ≤ 8`: THE CAP HOLDS, and no row was dropped, merged or left unenumerated to fit it**
   (`AGENTS.md` item 11(f): a row count is an OUTCOME, never a budget). **The entry-id policy (`I-7`) and the
   notification exclusion (`I-8`) are carried as identifier rows because they are ADOPTED FROM OUTSIDE this unit — the
   first as a DERIVED-WORKING-DEFAULT row, the second as a BINDING NEGATIVE — so the cap is not gamed by re-labelling
   them.**
2. **NOTHING HERE IS CLOSED BY ASSERTION.** **`STATUS` is `defined` for every row below, and NO ROW IN THIS FILE IS
   `undefined-until-answered`** — **but a row is `defined` ONLY where the citation below actually FIXES its meaning.**
   **An identifier whose meaning cannot be cited is an OPEN row and must be reported as such, not converted.** **`§4`
   carries that check: this pass found NO identifier in that position, and says so rather than manufacturing one.**

**Provenance of this file, stated before its first row, because its author ran NO SEARCH OF ITS OWN.** **This pass held
read/search and documentation-write tools and NO SHELL**, and it **ran no source scan, no suite, no leg, no `tsc`, no
build and no commit**. **Every tree fact cited below is a fact ALREADY FILED in an existing record — the endpoint
contract `docs/specs/mcp-endpoint.md` `§3.8` and `§6.2`, the architect ruling's row in `docs/decisions.md`, the
adoption's provenance row in `docs/pending.md`, and this unit's own gate-1 record
(`docs/specs/focus-tool-review.md` `§9`).** **NO CENSUS, COUNT OR LINE NUMBER IS RE-MEASURED HERE, and none of the
figures in this file is a leg.**

---

## §1 THE IDENTIFIER ROWS — `8` of the `≤8` the condition allows

**The row set is the set `G-2` names: the tool name, the method name, the group, the argument shape, the return shape,
the refusal and readiness semantics, the entry-id policy, and the notification exclusion** — **grouped the way the
adopted vocabulary actually arrives: the two NAMES (`I-1`, `I-2`) are adopted from the ARCHITECT RULING, the GROUP and
the two SHAPES (`I-3`, `I-4`, `I-5`) from the ENDPOINT CONTRACT, the REFUSAL/READINESS semantics (`I-6`) from the same
contract's binding asymmetry block, the ENTRY-ID policy (`I-7`) from step 3's DERIVATION, and the NOTIFICATION
exclusion (`I-8`) from the ruling's own negative clause.**

| # | Identifier | Kind | What it is / what it decides | SOURCE CITATION (the adoption's origin) | STATUS |
| --- | --- | --- | --- | --- | --- |
| **`I-1`** | **`provident.focus`** — the TOOL NAME | tool name (callable surface) | **The `22nd` `ALL_TOOLS` member**, and the name an agent reaches the flow by | **`docs/specs/mcp-endpoint.md` `§3.8` item 1** (*"§3 (the tool table above) gains the `provident.focus` row"*), **`§3.8`'s status block**, and `docs/specs/mcp-endpoint.md` `§3.8`'s counts clause (`ALL_TOOLS` `21 → 22`); **the ruling is `docs/decisions.md`'s `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`** (architect ruling `A-d5`, verbatim in substance: *"Add `provident.focus` for the tab handling. This is another tool that will be reused in multiple projects."*); **the provenance chain is `SCH-13` → `A-d5`** (`docs/pending.md`'s `SCH-13` row, annotated `SUPERSEDED BY A-d5`; `S-d12` in `docs/specs/provident-electron-shell-chrome-handoff-review.md`) | **`defined`** — the name is `provident.focus`, it is a NEW callable surface, and **it is authorised AS ITS OWN UNIT through the six-site wiring + the endpoint amendment rather than through the `(C)` adoption rule** (`H-r14`; `PROHIBITION-5-IS-AN-ADOPTION-BOUND`) |
| **`I-2`** | **`'focus'`** — the `RpcMethod` MEMBER | method name (renderer-side union member) | **The renderer-side member the tool's call crosses into**, and the switch case the route lands on | **`docs/specs/mcp-endpoint.md` `§3.8`'s status block**: *"no `focus` member in the renderer's `RpcMethod` union"* today, **with `RpcMethod` `21 → 22` in the same amendment**; **`docs/decisions.md`'s `FOCUS-UI-ONLY-MCP-TOOL`** (the tool is **NOT** in `MUTATING_METHODS`); **and step 3's shape decision, filed at `docs/specs/focus-tool-review.md` `§9.1`** | **`defined`** — the member is the lower-case string `'focus'`, **it is NOT a `MUTATING_METHODS` member**, and **the method name and its switch case are LEGITIMATE even though the DOM focus WALK is banned** (`§2` `X-1`) |
| **`I-3`** | **`dispatch`** — the GROUP, ON by default | group name (`VALID_GROUPS` member, reused) | **The permission unit the tool belongs to**, and the default-gate placement that makes it reachable without a human grant | **`docs/specs/mcp-endpoint.md` `§3.8` item 3**: *"§6.2 (the group table below) gains `provident.focus` under `dispatch` — and, separately, the missing `module` row (`VALID_GROUPS` has five members, `src/main/security.ts:134`; the table below lists four)"*; **`§3.8`'s counts clause** (default-gate registered subset `7 → 8`); **`docs/decisions.md`'s `FOCUS-UI-ONLY-MCP-TOOL`**: *"group `dispatch` (ON by default — A-d5 requires it not be reachable only after a human grant)"* | **`defined`** — the group is the EXISTING `dispatch` (**ON**), **THE FIVE `VALID_GROUPS` STAY FIVE**, and **no sixth group is minted** (`docs/specs/focus-tool-review.md` `§9.1`) |
| **`I-4`** | **The ARGUMENT shape — `{target?: string, newTab?: boolean}`** | argument shape (fixed by the endpoint contract) | **What an agent may send**: an OPTIONAL opaque `target` and an OPTIONAL `newTab` flag that opens a new entry for the same target | **`docs/specs/mcp-endpoint.md` `§3.8` item 2**, VERBATIM: `{ target?: string, newTab?: boolean } → …` *"— find-or-open-by-opaque-target on the renderer's focus model, then activate; `newTab: true` opens a new entry for the same target."* | **`defined`** — both members optional, both exactly as the contract fixes them; **the shape is NORMATIVE AND DERIVED, NOT RE-MINTED, so an added member is a SHAPE EXTENSION needing the architect** (`docs/specs/focus-tool-review.md` `§9.1`, `§9.2` `AQ1`) |
| **`I-5`** | **The RETURN shape — `{activeId: string \| null, entries: string[], opened: boolean, refused?: {reason: string}}`** | return shape (fixed by the endpoint contract) | **What the call answers**: the active id or `null`, the entry list, an `opened` boolean, and an OPTIONAL refusal record | **`docs/specs/mcp-endpoint.md` `§3.8` item 2**, verbatim as above; **and `docs/decisions.md`'s `FOCUS-UI-ONLY-MCP-TOOL`** for the UI-only asymmetry the shape serves | **`defined`** — four members with those exact names and optionality; **the spec DERIVES this shape and does NOT re-open it** (`C-7`), and **the live authority for `{entries, activeId}` is the RENDERER'S OWN STATE held in the wiring OUTSIDE the consumed module, not a graph slice** (`docs/specs/focus-tool-review.md` `§9.1`) |
| **`I-6`** | **The REFUSAL and READINESS semantics** | semantics (binding asymmetry block) | **A refused target returns `{refused: {reason}}` and changes nothing; before the renderer signals ready the call REJECTS with the backend's readiness error and the focus state is untouched — no silent no-op, no queued mutation, no special case, no fallback.** **A focus call is never a real user gesture** | **`docs/specs/mcp-endpoint.md` `§3.8` item 2**, VERBATIM: *"A target the consumer refuses returns `{refused:{reason}}` and changes nothing. Before the renderer signals ready, the call **rejects with the backend's readiness error** (`renderer not ready (timeout <n>ms)`) and the focus state is untouched — **no silent no-op, no queued mutation, no special case, no fallback.**"*; **`§3.8` item 6** adds the matching verification rows | **`defined`** — refusal shape, refusal effect (*changes nothing*), the rejection path and its error form are all fixed by the contract; **the not-ready rejection is the unit's FIFTH negative row and the only one FULLY OBSERVABLE NODE-SIDE** (`docs/specs/focus-tool-review.md` `§9.3`) |
| **`I-7`** | **The ENTRY-ID policy — the CALLER'S OWN STRING IS THE LEGAL ENTRY ID** | identity policy (ADOPTED DERIVED WORKING DEFAULT) | **No third party mints an id**: the tool mints nothing, keeps no counter, holds no registry and keeps no string-to-entry map, **so the tool cannot become a second identity authority over the consumed module** | **`docs/specs/focus-tool-review.md` `§9.2` `AQ1` — step 3's DERIVED DEFAULT, filed as substance in the same pass as its verdict** (`A-d5`'s *"opaque ids"* side is the ruling the default serves: `docs/decisions.md`'s `FOCUS-UI-ONLY-MCP-TOOL`; the consumed module's own identity rule is `docs/specs/focus-model.md` `§2.3`) | **`defined` — AS A DERIVED WORKING DEFAULT WITH A RECORDED REVERSIBLE ALTERNATIVE, not as a ruling.** **THE ALTERNATIVE, NAMED SO IT IS NOT HIDDEN: an added OPTIONAL `id` argument** — **it would EXTEND THE FIXED SHAPE (`I-4`) and therefore NEEDS THE ARCHITECT'S CONSENT** |
| **`I-8`** | **The NOTIFICATION exclusion** | negative contract (binding) | **The tool persists nothing, emits NO `notifications/resources/updated` and NO `app-graph-changed`, and CANNOT force a re-render** — so an agent cannot use focus to force a re-render or invalidate a cached `mcp://provident/app` | **`docs/decisions.md`'s `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`**: *"**NOT in `MUTATING_METHODS`**, so an `ok` reply emits **no `notifications/resources/updated`** and **no `app-graph-changed`** … **persists nothing** (this repo owns no UI-config store); **cannot force a re-render**"*; **`docs/specs/mcp-endpoint.md` `§3.8` item 2**'s UI-ONLY ASYMMETRY (binding), **item 4** (a later edit adding `'focus'` to `MUTATING_METHODS` is a CONTRACT VIOLATION) **and item 5** (§8's non-goals must name focus explicitly as a NON-EMITTING mutator of UI state) | **`defined`** — the exclusion is BINDING and is a NAMED negative; **and it is a CLAIM THAT NEEDS A ROW: the notification half is pinned on the NOTIFY PREDICATE staying keyed on the mutating set with the method absent, because a BARE COUNT IS NOT THE INSTRUMENT** (`docs/specs/focus-tool-review.md` `§9.3` row 2) |

**WHY `8` AND NOT FEWER, STATED PLAINLY: the cap is not a budget** (`AGENTS.md` item 11(f)). **Every row above is an
identifier this unit takes from OUTSIDE its own bytes** — **seven of them FIXED by the endpoint contract or the
architect ruling, and the eighth (`I-7`) a DERIVED WORKING DEFAULT whose owner is the spec gate.** **Nothing was merged
to reach the cap and nothing was dropped to stay under it.**

---

## §2 THE COLLISION BLOCK — every adopted identifier checked against the consuming repo's prohibition and vocabulary rows

**The checked set is this repo's own prohibition and vocabulary rows, cited by ROW NAME (the ledger, the prohibition
tables and the ruling rows are appended-to, and their line anchors drift).** **The demanded form is the family's: *"the
token is banned in layer X for reason Y, and legitimate in layer Z because …"*, WITH THE SCAN ROW NAMING ITS EXEMPTIONS
OR STANDING VACUOUS** (`docs/specs/focus-tool-review.md` `§2.5`; `C-6`) — **an unnamed exemption makes the row
unfalsified.** **Each hit below is RECONCILED BY ROW ID or RE-NAMED; none is left unreconciled.**

| # | Adopted identifier | The prohibition / vocabulary row it hits | The reconciliation — `banned in layer X for reason Y, legitimate in layer Z because …` |
| --- | --- | --- | --- |
| **`X-1`** | **`I-1`'s and `I-2`'s `focus` token** | **The SHIM / RUNTIME FOCUS-WALK BAN** — no `activeElement`, no focusable walk; the sibling `U-OVERLAY`'s focus-trap half was REFUSED on exactly that ground (`H-r5` in `docs/specs/provident-electron-shell-chrome-handoff-review.md`; `docs/specs/focus-model-review.md` `§2.4`'s `focus` row) | **BANNED in the shim/renderer layer FOR the reason that a focus walk needs a live DOM the shim does not model.** **LEGITIMATE AS A *METHOD NAME* AND AS A *SWITCH CASE* BECAUSE THE BAN IS ON THE WALK, NOT ON THE WORD** — the route reads no `activeElement`, walks no focusable set and expands no shim surface. **THE SPEC MUST SAY SO IN TERMS** (`C-6`). **NO RE-NAME IS REQUESTED** |
| **`X-2`** | **`I-3`'s group token `dispatch`, and `I-2`'s renderer-side placement** | **Prohibition 5's `VALID_GROUPS` / `MUTATING_METHODS` vocabulary** (`S-d8`(5); `H-r14`; `PROHIBITION-5-IS-AN-ADOPTION-BOUND`) — *"no new tool, resource, tool group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry"* | **BANNED FOR EVERY `(C)`-ADOPTED UNIT FOR the reason that prohibition 5 is an ADOPTION BOUND on units.** **LEGITIMATE HERE BECAUSE THIS IS NOT A `(C)` ADOPTION: `A-d5` AUTHORISES THE TOOL AS ITS OWN UNIT, through the six-site wiring + the endpoint amendment, and `H-r14` records that `A-d5` IS that new gate** — **and the group row is satisfied by REUSING `dispatch`, which the table already lists (`docs/specs/mcp-endpoint.md` `§6.2`), so `VALID_GROUPS` STAYS AT FIVE** |
| **`X-3`** | **`I-4`'s `target`** | **`A-d5`'s NO-VOCABULARY clause** (`docs/decisions.md`'s `FOCUS-UI-ONLY-MCP-TOOL`: *"`'tab'`/`'pane'`/zone/region may not appear as a symbol, union member or default"*) **and the consumed module's opacity rule** (`docs/specs/focus-model.md` `§2.3`; `I-7` of the sibling dossier) | **BANNED FOR the reason that consumer vocabulary would make the mechanism an app-domain authority.** **LEGITIMATE BECAUSE `target` IS AN OPAQUE, CALLER-SUPPLIED VALUE THAT PASSES THROUGH UNINTERPRETED** — the tool names no target, resolves none, compares none and lists none, and **no tab/pane/zone/region noun becomes a symbol, union member or default.** **FALSIFIER: a consumer noun appearing anywhere in the tool's bytes or its test file FAILS the scan row** |
| **`X-4`** | **`I-5`'s return vocabulary and `I-6`'s refusal token** | **The same NO-VOCABULARY clause, read against the *consumer* nouns the return carries** (`activeId` / `entries` / `opened` / `refused` / `reason`) | **BANNED IN THE CONSUMED MODULE FOR the reason that those nouns are CONSUMER vocabulary** — **which the sibling dossier's `X-6` records as the `F2`→`F3` boundary's own collision.** **LEGITIMATE HERE BECAUSE THIS UNIT *IS* THE CONSUMER, AND THE SHAPE IS ALREADY FIXED BY THE ENDPOINT CONTRACT** (`docs/specs/mcp-endpoint.md` `§3.8` item 2; `C-7`): **the spec DERIVES the vocabulary rather than minting it, and the consumed module still owns none of those nouns** |
| **`X-5`** | **`I-8`'s notification and re-render exclusion, against the landed push behaviour** | **The LANDED live-change-notification row**: *"a stdio-only, app-Runtime-sourced `notifications/resources/updated` after a mutating app-graph op"* (`docs/specs/mcp-endpoint.md` `§3`'s push paragraph, `:210-212`), **and `§8`'s non-goals paragraph** | **BANNED FOR THIS UNIT FOR the reason that a push would make focus a graph-state authority and let an agent force a re-render.** **LEGITIMATE BECAUSE THE METHOD IS ABSENT FROM THE NOTIFY PREDICATE'S SET: `§3.8` item 2's binding asymmetry makes focus a NON-EMITTING mutator of UI state, item 4 records a later `MUTATING_METHODS` addition as a CONTRACT VIOLATION, and item 5 requires `§8` to name focus explicitly as such.** **THE ROW'S OWN FALSIFIER: A ROUTE THAT PUSHES FAILS** (`docs/specs/focus-tool-review.md` `§9.3` row 2) |
| **`X-6`** | **`I-7`'s entry-id policy, against the "second authority" prohibition** | **The consumed module's authority ownership** — the module owns the `===`-on-target activation and the id/duplicate rules, so a tool that kept its own string-to-entry map would be A SECOND AUTHORITY (`docs/specs/focus-model-review.md` `§3.1` finding 2; `docs/specs/focus-model.md` `§5.4`; `C-5`) | **BANNED FOR THIS UNIT FOR the reason that a second identity authority makes the module's rules advisory.** **LEGITIMATE BECAUSE THE CALLER'S OWN STRING IS THE LEGAL ENTRY ID AND THE TOOL MINTS NOTHING** — **no counter, no UUID, no registry, no map, no id POLICY** (`docs/specs/focus-tool-review.md` `§9.1`, `§9.2` `AQ1`). **THE RE-NAME/EXTENSION ROUTE IS NAMED RATHER THAN TAKEN: an added optional `id` argument would extend the fixed shape and needs the architect** |
| **`X-7`** | **`I-1`'s and `I-2`'s method NAME vs the `dispatch` TOOL's own name** | **`A-d5`'s NO-VOCABULARY clause + the group/tool vocabulary collision**: the group is called `dispatch` and a LANDED TOOL is also called `provident.dispatch` (`docs/specs/mcp-endpoint.md` `§3`/`§6.2`) | **THE COLLISION IS RECONCILED BY ROW AND BY NAMING, NOT BY PROSE: the group `dispatch` is the EXISTING permission unit and the tool `provident.dispatch` is the EXISTING graph-mutating tool — `provident.focus` JOINS THE GROUP WITHOUT BEING THE TOOL**, so neither name is re-used for the other's object. **FALSIFIER: a filing that reads the group as the tool, or that gives focus the `dispatch` tool's mutating semantics, FAILS the matrix's row 1/row 2 pair** (`docs/specs/focus-tool-review.md` `§9.6`) |
| **`X-8`** | **`I-2`'s `'focus'` member vs the METHOD-SWITCH and `RpcMethod` type wall** | **The renderer's method switch and the `RpcMethod` union** — *"a METHOD ABSENT FROM THE MUTATING LIST STILL CROSSES THE EXISTING IPC INVOKE PATH"* (`docs/specs/focus-model-review.md` `§3.2` `FQ3`; `docs/specs/focus-tool-review.md` `§2.4` row 1) | **BANNED-FOR-THIS-UNIT ONLY IN THE SENSE that exclusion from a RENDERER-SIDE mutating set must never be read as deciding the invoke path.** **LEGITIMATE BECAUSE ROUTING IS DECIDED BY THE `RpcMethod` TYPE WALL PLUS THE RENDERER'S METHOD SWITCH, and the mutating set only decides the NOTIFY PUSH** — **so the census move `RpcMethod` `21 → 22` and the switch case are the same commit's obligation, and the rendering red there is a TYPE-WALL red, not a runtime red** (`docs/specs/focus-tool-review.md` `§9.4`; `H-r18`) |

**THE COLLISION BLOCK'S OWN HONESTY NOTE, CARRIED BECAUSE THE SIBLING DOSSIER INSISTS ON IT:** **the checked-set rows
above are cited from RECORDS, and NO GREP WAS RUN BY THIS PASS** (the provenance block). **A row's absence here is
therefore NOT PROOF that the consuming repo carries no prohibition of that name — it is the statement that NO FILED ROW
WAS FOUND for it, and a later scan-capable pass must re-run the check before the contract is filed.** **THE ROWS THIS
BLOCK CANNOT STAND VACUOUS ON ARE `X-1` (the focus-walk ban, absolute and landed), `X-5` (the landed push behaviour)
and `X-8` (the invoke-path reading): all three are reconciled BY ROW above, and none is left as prose.**

---

## §3 THE STATUS OF EVERY ROW — and the `BLOCKED-ON-SEMANTICS` check

**`G-2`'s own terms, restated: A SILENT ZERO-ROW IS A FINDING, and AN OPEN ROW FORCES `BLOCKED-ON-SEMANTICS`.** **This
file is therefore NOT a zero-row dossier, and its row set is enumerated rather than implied:**

| The count | The set | STATUS of every member |
| --- | --- | --- |
| **`8`** | **the IDENTIFIER rows `I-1`…`I-8`** (`§1`) — **the set `G-2` names: the tool name · the method name · the group · the argument shape · the return shape · the refusal/readiness semantics · the entry-id policy · the notification exclusion** | **`defined`, `8` of `8`.** **`0` are `undefined-until-answered`** |
| **`8`** | **the COLLISION rows `X-1`…`X-8`** (`§2`) — **every adopted identifier checked against the consuming repo's prohibition and vocabulary rows, each hit reconciled BY ROW ID or RE-NAMED** | **reconciled, `8` of `8`; NONE left unreconciled and NONE left as prose** |
| **`16`** | **the rows in this file, total** | **`16` `defined` / reconciled · `0` open** |

**NO ROW IN THIS FILE IS `undefined-until-answered`** — **and the check was run in the direction that matters: for each
identifier `G-2` names, this pass asked *"can the citation above actually FIX its meaning?"* and answered `YES` EIGHT
TIMES, each with the record quoted at its own row.** **`I-7` is the ONE row whose status carries a QUALIFIER RATHER THAN
A HEDGE: it is `defined` AS A DERIVED WORKING DEFAULT with its reversible alternative recorded (`§1`), exactly as the
sibling dossier's `D-1`/`D-2` are — the qualifier is part of the status, not an escape from it.**

**IS ANY ROW OPEN? NO — and this pass did not have to convert one to say so.** **HAD an identifier's meaning been
uncitable, the instruction is to REPORT IT AS OPEN rather than close it by assertion, and to accept the
`BLOCKED-ON-SEMANTICS` consequence; NO identifier was found in that position, so NO row is reported open and NO
`BLOCKED-ON-SEMANTICS` is triggered BY THIS DOSSIER.**

**WHAT THIS DOSSIER DOES NOT DO.** **It does not file `docs/specs/focus-tool.md`** (that contract remains
`OWED — not filed`, and it is the artifact that will carry the `§0` prohibition table, the semantics table, the
collision reconciliation per token, the derived allow/deny set with the entry-point answer, the layer map, the
seven-row `§5.U` matrix and the typed register). **It does not batch itself with that contract** (`G-2`'s second
clause; `P-9`). **It flips no ledger cell, moves no count and runs no leg: the ledger is UNMOVED at `20 DONE / 1 open`
UNITS = `21` units (`20 + 1 = 21`), the open set being `F3` `U-FOCUS-TOOL` ALONE = `1`, and the unit is DELEGABLE TO
ITS SPEC GATE BUT NOT YET FILED.** **It touches no `src/**` file and no test file, and it proposes no source change.**

**⟶ CLOSE-OUT ANNOTATION 2026-09-27 (THE SUPERVISOR'S GATE-6/7/8/10 PASS — `RCA-8(d)`: the file's own bytes above stand
BYTE-FOR-BYTE and are the STEP-0 pass's dated state).** **EVERY STATUS-ONLY CLAUSE ABOVE IS SPENT: THE DOSSIER WAS
APPROVED AT/BEFORE THE SPEC GATE (discharging `G-2`), `docs/specs/focus-tool.md` IS FILED AND APPROVED AS FILED, AND
`U-FOCUS-TOOL` IS `DONE` — the ledger's TWENTY-FIRST `DONE` row, whose move CLOSES THE LEDGER at `21 DONE / 0 open`
UNITS = `21` units with the OPEN SET EMPTY.** **ITS AUTHORITATIVE RECORD IS `docs/next-steps.md`'s
`## DONE — U-FOCUS-TOOL` section; the unit's doc-review is
`archive/reviews/2026-09-27-U-FOCUS-TOOL-doc-review.md`.** **WHAT THIS DOSSIER REMAINS THE AUTHORITY FOR AND WHAT THIS
ANNOTATION DOES NOT TOUCH: the `8` identifier rows `I-1`…`I-8`, the `8` collision rows `X-1`…`X-8`, the `16`-row
`0`-open reconciliation and the `BLOCKED-ON-SEMANTICS` check — ALL UNCHANGED, and NOT re-opened or re-derived here.**
**NO ROW, IDENTIFIER, COUNT OR CELL MOVES BY THIS ANNOTATION.**
