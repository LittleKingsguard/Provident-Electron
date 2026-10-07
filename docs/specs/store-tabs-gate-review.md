# Gate-1 record — the tab unit(s): `T1` `U-STORE-TABS-STRIP` and its admitted fraction `T2` `U-STORE-TABS-RECORD`

**STATUS LINE (the status-line rule).** **Gate 1 for the tab unit(s) — `DONE`** · filed `2026-10-11` ·
**verdict AS FILED: `BLOCKED-ON-SEMANTICS`** (step 3's `role_architecture_review` return; the filed form
reproduces step 1's `FLAWED`) · **NOW: `DELEGABLE-AFTER-SPEC`** — **ISSUED ON THE ARCHITECT'S RULINGS OF
`2026-10-11` RECORDED AT `§5` BELOW, AND ON THOSE RULINGS ONLY.** **THE SPEC GATE REMAINS THE ARCHITECT'S
APPROVAL POINT** (`AGENTS.md` item 10a: the one approval the chain waits for); **`DELEGABLE-AFTER-SPEC`
authorises the two contracts, NOT a red set** — a TestWriter may not be delegated a red set under
either contract before that contract is approved. · **THE ARCHITECT ADMITS ROWS (`RCA-8(f)`): the SPLIT
IS TAKEN, so the ledger moves `33 DONE / 1 open` UNITS = `34` → `33 DONE / 2 open` UNITS = `35`
(`33 + 2 = 35` ✓), live rows `36` → `37` (`35 + 1 + 1 = 37` ✓), open set `T1` · `T2` = `2`** — recorded
by this same pass at `docs/next-steps.md`'s `T1`/`T2` table and the dated ledger-move cell beside it, and
at `docs/pending.md` `§2.12`. · **NO `DONE` ROW MOVES, NO ROW IS REMOVED, AND NO OTHER UNIT'S STATUS IS
TOUCHED.** · the prior records this one does **not** re-open, overwrite or supersede:
`docs/specs/store-node-graph-review.md`, `docs/specs/store-core-graph-compliance-review.md`,
`docs/specs/secure-tier-generalization-review.md`.

**⟶ THE DELEGATED VERDICT IS ISSUED ON THE RULINGS, STATED PLAINLY SO NOTHING IS INFERRED.** As filed,
step 3 returned **`BLOCKED-ON-SEMANTICS`** with a **`SPLIT-RECOMMENDED`** decomposition row and a 9-item
ranked open-semantics list. The architect then answered on `2026-10-11` (`§5`), **took the split** (`§5`
ruling 3), and resolved the open-semantics list **by ruling 2 or by the plan's own text** (`§6`). **The
`DELEGABLE-AFTER-SPEC` verdict is therefore a verdict ON THOSE RULINGS**: it says the semantics are now
sufficiently settled for two contracts to be DERIVED. **It does not say the contracts exist, it does not
say the red sets may be authored, and it does not discharge a single `C-1`…`C-13` condition by itself** —
each condition's disposition is printed at `§8`.

**WHAT THIS FILE IS.** It is the **gate-1 record for BOTH fractions** of the decomposed unit: the four
gate-1 steps' returns and verdicts (`§2`, `§3`, `§4`), **including one dated correction against step 3
itself** (`§4`), the Semantics block with the architect's rulings (`§5`), the answer table (`§6`), the
`D-GP-SAD-5` decomposition row with its nine columns (`§7`), the 13-item conditions list with owners
(`§8`), the verdict and the verdict-bearing conditions (`§9`), the two contracts' OWED paths, their
dependency relation, their diff scopes and their owed legs (`§10`), the claim ledger this record's own
rules require (`§0A`), and what this pass did not do (`§11`).

**IT IS NOT A SPEC, NOT AN ADMISSION, NOT A CODE CHANGE, AND NOT AN AMENDMENT OF ANY EXISTING SPEC.**
No `docs/specs/store-tabs-record.md` and no `docs/specs/store-tabs-strip.md` is filed by this pass; no
`src/**` byte, no `tests/**` byte, no `package.json` script key, no register, no red set and no leg is
authored; the two fractions' contracts are `OWED` (`§1`, `§10`).

---

## 0. SCOPE, BOUNDARY, AND THIS RECORD'S OWN STANDING

**`§0.1` The boundary table — what this record may and may not touch.** The pass holds **read/search
plus doc-write** tools and **no shell**: every figure below is either a byte this pass read, or a figure
**supplied by the coordinator/supervisor and labelled as supplied**. Where a figure is `[SUPPLIED]`, this
pass **did not measure it** and says so at the site.

| May touch (this record's own diff) | May NOT touch (named so a later reader does not read silence as a licence) |
| --- | --- |
| `docs/specs/store-tabs-gate-review.md` (**NEW**, this file) | `src/**` · `tests/**` · `scripts/**` · `package.json` |
| `docs/next-steps.md` — the `T1`-cell dated annotate-beside, the NEW `T2` row, and the dated ledger-move cell (**anchored `edit`s only**) | the plan's own rows (`docs/specs/data-ownership-model-plan.md` `§6.5`/`§1.7` — **a later pass's**) |
| `docs/pending.md` — `§2.12`'s dated annotation (**anchored `edit` only**) | `docs/FORKER.md` (**`§5` ruling 4's annotate-beside is OWED to the landing pass**) |
| — | any other `docs/specs/**` file, any tracker row outside the two named above, `docs/decisions.md` |

**`§0.2` What this record does NOT claim.** It claims **no green at any layer** (`[T]`, `[H]`, `[U]`,
`[D]` or APP), **no register**, **no red set**, **no leg**, and **no measurement of its own**. It
**supersedes no landed clause** — each clause it outgrows is answered at its own site by the architect's
ruling, and the rulings' write-backs into sibling specs are `OWED` items (`§10`).

**`§0.3` The two fractions, named once so every later section can cite them by id.**

| id | Unit | The one-sentence boundary |
| --- | --- | --- |
| **`T1`** (keeps its id and its subject) | **`U-STORE-TABS-STRIP`** | **the LIST SURFACE and its agent-readable carrier**: the provident-authored tab strip, the operator's control for the close verb, and the graph node that makes the tab list MCP-visible. **No record, no constraint, no terminal page** — it renders what `T2` holds. |
| **`T2`** (NEW, this pass's admission of the fraction) | **`U-STORE-TABS-RECORD`** | **everything the store must hold and every terminal state of the close verb, NO LIST SURFACE**: the tier-1 `file.tabs.*` record, the `exactly-one-active` constraint evaluated **on write AND on `remove`**, the persisted close, the reserved landing reference, and the two authored pages. |

---

## 0A. The claim ledger (the closed authority enum and the closed claim-class set)

**THE SPEC-WRITER GATE RULES THIS FILING ENFORCES ARE APPLIED AS STATED, AND THEIR SOURCE FILE IS
OUTSIDE THIS CHECKOUT.** The authority is `.opencode/agent/spec-writer.md`; **that path does not exist in
this workspace** (verified by this pass: `glob **/spec-writer.md` returns nothing, and no `.opencode/`
directory exists), so the claim ledger, the supersession-pointer-edge, the status-line rule and the
parameter-semantics/typed-register rules are **applied as this pass's instructions state them**, with
their landed provenance cited at `docs/specs/store-core-graph-compliance-review.md` `§1` family (3) and
the sibling precedent `docs/specs/fork-store-reads.md` `§0A` (`AMB-2`). **A re-grain is a bounded pass,
not a re-write** — routed to the supervisor if the authority file's wording differs from the applied form.

### 0A.1 The CLOSED FIVE-FORM AUTHORITY ENUM

*(The enum is `Agent Harness` `docs/specs/spec-authoring-discipline.md` §3.3's five-form authority enum,
cited by row id; **its five labels are used here exactly, and no sixth label is invented.**)*

| Label | Means | This record's instances |
| --- | --- | --- |
| **`[RULING]`** | A recorded architect decision, cited by its own name/date — the authority is the ruling, not this file's reading of it | `§5` rulings 1–4 (dated `2026-10-11`) · the pre-existing rules the rulings extend (`R3-1`/`R3-2`, the plan's `§1.7`/`§4.3`/`§6.5`) |
| **`[SPEC]`** | A landed contract clause of a sibling spec, cited by §/row id | `docs/specs/store-focus.md` `:401-408`/`:949` · `docs/specs/focus-tool.md`:1085-1092 · the shell-chrome handoff review `S-d8`/`H-r16` · `docs/specs/runtime-host.md`:53-55 · `docs/specs/mcp-endpoint.md`:167 · `docs/specs/user-flow-audit.md` `§7.1` |
| **`[READ]`** | A reading THIS PASS took of bytes at a named path, with the path stated | the `rows-mint` family (`§4`) · the demo's strip and registry (`§5` ruling 1) · `demo/pane-drag-demo/README.md`:84-97 · `docs/FORKER.md`:402 · `src/renderer/renderer.ts`:43-50 · `src/renderer/store-core-graph.ts`:2164-2175 · `tests/theme-control.test.ts`:115-116 · `tests/ui-leg-contract.test.ts`'s `L-1` · `docs/specs/gutter-ui-live-battery.md`:536-541 |
| **`[DERIVE]`** | A clause DERIVED from `[RULING]`/`[SPEC]`/`[READ]` inputs named in the same row | `§6`'s answer table · `§7`'s decomposition row · `§10`'s owed legs and diff scopes |
| **`[DECL]`** | A clause this record DECLARES normatively, naming the site at which it becomes checkable — never a measurement | `§9`'s verdict · `§8`'s condition dispositions · `§10`'s OWED contract paths · `§0.2` |

**NO CLAIM OF THIS RECORD IS LABELLED OUTSIDE THESE FIVE.** Step 1/2/3's own figures that this pass
**reproduces but did not itself take** are labelled `[SUPPLIED]` at the clause and are **not** `[READ]`:
`§2` and `§3` say at each load-bearing site which figures this pass verified at the bytes and which it
merely reproduces.

### 0A.2 The CLOSED CLAIM-CLASS SET

*`spec-authoring-discipline.md` §3.2's claim-class set, cited by row id; used exactly, with no sixth class.
The counts are of **this record's load-bearing claims** (the `§5` rulings, the `§6` answers, the `§7`
row's cells, the `§8` conditions, the `§9` verdict clauses and the `§10` owed items), one class per item.*

| Class | Means | Count, with its terms |
| --- | --- | --- |
| **`NORM`** | A normative clause: it obliges, forbids or declares a shape | **`45`** = `4` (`§5` rulings) + `13` (`§6` answers) + `9` (`§7` row cells) + `13` (`§8` conditions) + `6` (`§9` verdict clauses) |
| **`FACT`** | A reading of landed bytes or a quoted landed clause | **`30`** = `7` (`§4` byte evidence) + `9` (`§2.3`'s load-bearing core findings) + `5` (`§3`'s critique additions carried) + `9` (`§0A.1` `[READ]` rows) |
| **`PRED`** | A prediction about a later pass's behaviour, with its falsifier | **`0`** — **this record makes NO prediction.** Every clause that could be one is a `NORM` declaration or an `OWED`/`OPEN` carry with an owner (`§10`) |
| **`OPEN`** | A named, owned, unresolved item carried rather than decided | **`4`** = the four `OWED` write-backs at `§10`'s foot (the frozen artifact's `D-7` annotate-beside · the `docs/FORKER.md` §4 fork-facing block · the store's reserved first-constraint-evaluation obligation · the plan's `§6.5`/`§1.7` annotation) |

**THE TOTAL, PRINTED WITH ITS TERMS (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`' discipline applied to a
claim ledger): `45` `NORM` + `30` `FACT` + `0` `PRED` + `4` `OPEN` = `79` claims.**
**THE IDENTITY CHECK: `45 + 30 + 0 + 4 = 79` ✓ ; and `4 + 13 + 9 + 13 + 6 = 45` ✓ ; `7 + 9 + 5 + 9 = 30` ✓.**

### 0A.3 The supersession pointer edges (the rules' second duty)

**A claim that supersedes, strikes or re-points a landed clause MUST carry a SUPERSESSION POINTER EDGE,
each edge naming its target; an edge-less supersession is a review finding. THIS RECORD'S EDGES ARE
CLOSED AND ENUMERATED — and every one of them is the ARCHITECT'S (`§5`), never this pass's.**

| Edge | What supersedes | Its target | Arm taken / not taken |
| --- | --- | --- | --- |
| **`S-T1`** | `§5` ruling 2(b) (the adopted management lands on the tier-1 `file.tabs.*` record) | the demo's realm-lifetime `mem.tabs.*` record (`demo/pane-drag-demo/demo.ts`:596-598, `:144`) | **ARM-TAKEN** — the demo's record is the **SUPERSEDED REFERENCE**; `docs/FORKER.md`:402 gains a dated annotate-beside (OWED, `§10`) |
| **`S-T2`** | `§5` ruling 2(c) (membership = the record's own `order`; the ruled rule stands) | the demo's module-level `let tabIds: string[]` registry (`demo.ts:593`) and its `mem.tabs.*` constraint arms incl. the tab-local-`lastActive` recency arm (`demo.ts:125-139`, `:130-137`) | **ARM-TAKEN** — the registry **RETIRES**; the recency arm is **SUPERSEDED** |
| **`S-T3`** | `§4`'s dated correction (an N-row list IS expressible) | step 3's clause *"the runtime's command surface cannot create a node"* and **the fixed-cardinality limit derived from it** | **STRUCK** — the derived limit is withdrawn; it is superseded by the `rows-mint`/`rows-clear` route plus its two replacement caveats |
| **`S-T4`** | `§7`'s decomposition row (`disposition = SPLIT-NOW`) | the as-filed single unit `T1` `U-STORE-TABS-STRIP` as ONE row and ONE contract | **ARM-TAKEN** — the split is taken; `T1` keeps its id and subject, `T2` is admitted beside it |
| **`S-T5`** | `§5` ruling 2(a) (re-authored providently; no hand-written DOM in `src/**`) | the demo's hand-written strip (`index.html:19-29`, `:56`; `demo.ts`:304-351) as an **implementation reference** | **ARM-TAKEN** — the demo's strip becomes a **SUPERSEDED REFERENCE**; `demo/**` is named in the fractions' DENIED sets; **no new spec supersession edge is created** (the plan's `§6.5` proposal row is annotated by a later pass, `§10`) |

**FIVE EDGES, ENUMERATED AND COUNTED: `5` ✓.** **A later pass that strikes or re-points a clause this
record's rulings settled, WITHOUT an edge, is a review finding.**

---

## 1. WHAT WAS ADMITTED, AND WHAT THE UNIT ASKED FOR

**`[RULING]`** The architect's directive **"proceed with deferred unit"** admitted the deferred rendered
tab strip as the ledger's row **`T1` = `U-STORE-TABS-STRIP`** (wave `T`), and the ledger moved
**`33 DONE / 0 open` = `33` → `33 DONE / 1 open` = `34`** with its terms printed at the row's own dated
ledger-move cell (`docs/next-steps.md`, verified by this pass at its bytes).

**The proposal the gate reviewed, in its own three asks** (`[SPEC]` the plan's `§6.5` row, `§1.7` item 6,
`B-9`): **(1)** the **provident-authored tab list** (envelope-authored nodes + bounded wiring roles —
`AGENTS.md`'s project-wide UI-rendering constraint); **(2)** the **OPERATOR's control for the close
verb**; **(3)** **the graph node that makes the tab list MCP-visible** (`data-ownership-model-plan.md`
`§2.3`'s graph-canon rule). **The unit's own row states it RENDERS what `U-STORE-FOCUS` defined and
defines nothing** — *"the close verb, the `exactly-one-active` constraint with its `REPAIR` outcome and
the persisted close are that unit's (`DONE`)"*.

**The four gate-1 steps, all read-only and non-author, whose returns `§2`–`§4` carry:**

| Step | Role | Return |
| --- | --- | --- |
| **1** | `role_validity` | **`FLAWED`** — **16 findings** |
| **2** | `role_critique` | **16 findings** — independently confirmed the same core, and added the additions carried at `§3` |
| **3** | `role_architecture_review` | **`BLOCKED-ON-SEMANTICS`** (the filed form also reproducing `FLAWED`) + a **`D-GP-SAD-5` decomposition row: `SPLIT-RECOMMENDED`** + **`C-1`…`C-13`** + a **9-item ranked open-semantics list** |
| **4** | `role_change_analysis` | **this pass's — the verdict of `§9`** |

---

## 2. STEP 1 — VALIDITY: `FLAWED`, 16 findings

**`[SUPPLIED]` The 16-finding return is step 1's own; this pass reproduces the load-bearing core as
step 1 filed it, and states at each row which of its two halves it verified at the bytes.**

### 2.1 The must-fix core

| id | The finding, as step 1 filed it | This pass's verification |
| --- | --- | --- |
| **`F-1`/`F-3`** | **The unit's load-bearing dependency is FALSE.** `U-STORE-FOCUS` is `DONE`, **but its contract DISCLAIMS the tabs-slice record, the constraint and the close verb** — so the record the unit would RENDER is owned by nobody | **VERIFIED AT THE BYTES (`[READ]`)**: `docs/specs/store-focus.md` **`:401-408`** — *"What it is NOT. It is **not** the tabs-slice RECORD landing (`file.tabs.*` + the close verb + the reserved landing reference + the exactly-one-active constraint's repair arm — the deferred units' …)"* — and **`:949`** — `§7a.1` item 2, **THE TABS-SLICE RECORD LANDING**, *"CARRIED — the deferred units' (the slice / the pending tab-strip proposal …)"*. **AND the whole-tree negative VERIFIED (`[READ]`)**: `grep 'file\.tabs'` over `src/**` returns **0 hits** — the `tabs` root is *declared* (`src/renderer/renderer.ts`:43-50, read this pass: `window` · `tabs` · `layout` · `settings` · `tracked` · `modules`) and **nothing writes or reads it** |
| **`F-4`** | The *"no operator entry point for the close verb"* half is **true for `src/**`** and **false as unqualified prose**: a **hand-built, live-green tab strip already exists** under `demo/pane-drag-demo/` | **VERIFIED IN BOTH HALVES (`[READ]`)**: `demo/pane-drag-demo/README.md` **`:84-97`** records the strip live-green (*"TAB-BEHAVIOR + TAB-MANAGEMENT LIVE TESTS: ALL GREEN (50/50 PASS, exit 0)"*) with focus/close/open/last-tab arms; and `docs/FORKER.md` **`:402`** points the fork at exactly that demo as the surface *"the fork's H-r6 pass consumes"* |
| **`F-3`/`C-4`** | **That demo is a SECOND AUTHORITY**: it writes `mem.tabs.*` with **its own constraint arms** — *most-recently-active by a tab-local `lastActive`* — **plus a module-level `let tabIds: string[]` registry**; its policy **CONTRADICTS** the ruled next-surviving-by-`file.tabs.order`-with-wrap rule (`R3-1`) | **VERIFIED AT THE BYTES (`[READ]`)**: `demo.ts`:125-139 — the `exactlyOneActiveMember` arms, with **`:130-137`** the recency repair (`active.reduce` on `lastActive`) and `:136` the `landingPage` mint; **`:593`** — `let tabIds: string[] = ['tabA', 'tabB', 'tabC']`; `:596-598` the `mem.tabs.<id>` seed writes. **The ruled rule is `[RULING]`**: the plan's `R3-1` — *"ACTIVATE THE NEXT SURVIVING ENTRY BY `file.tabs.order`, WRAPPING TO THE FIRST WHEN THE CLOSED ENTRY WAS LAST"* |
| **`F-5`** | **The proposed MCP-visibility node collides with a LANDED NEGATIVE** | **VERIFIED AT THE BYTES (`[READ]`)**: `docs/specs/focus-tool.md` **`:1085-1092`** — item 5, *"WHAT THE TOOL CANNOT DO TO THE GRAPH, STATED AS `C-1`'s OWN NEGATIVE. `list_targets`, `get_rendered_html`, `get_markdown` and `get_node_state` NEVER OBSERVE a focus call's effect … **The tool mutates no graph node, no envelope and no state slice***", with its `2026-10-03` amended reading *"STILL TRUE AFTER THE RE-HOME"*. **The finding's subject is the COLLISION, not the node**: the strip's node must be authored in the ENVELOPE (a different carrier), which is what `§5` ruling 2(a)'s route supplies |
| **`F-6`** | **`P-16` was not cited by row name** | **CONFIRMED** (`[SPEC]` the plan's `§2.3` graph-canon rule and `docs/specs/mcp-endpoint.md` `§6.4`) — **DISPOSITION `FIXED` by `§6`'s answer: `P-16` is cited BY ROW NAME in both contracts (`§10`) |
| **`F-7`** | **The gate-11 register was omitted from the proposal** | **CONFIRMED** — **DISPOSITION `FIXED`**: `§10` makes the typed `§5.5.1` register a pre-red-set obligation on BOTH fractions (`AGENTS.md` item 11) |
| **`F-10`** | **No re-freeze is needed FOR THE SUBJECT AS STATED** — the frozen artifacts freeze **two STORE modules only** — **BUT two obligations have no owner**: (a) the store's reserved *"first constraint evaluation"* (`:2169-2170`); (b) the frozen artifact's `D-7` `>=2`-repair-arm revisit condition | **VERIFIED AT THE BYTES (`[READ]`)**: `src/renderer/store-core-graph.ts` **`:2164-2175`** — the `hydrate(rows)` block: *"WITHOUT the constraint capture (the FIRST constraint evaluation stays reserved for U-STORE-FOCUS's boot step)"*. **DISPOSITION `DECLARED-LIMIT` with owners named** at `§8` (`C-12`) and `§10`'s OWED foot — the reservation's owner is **`T2`** (it is the constraint's landing), and `D-7`'s revisit is routed to an architect annotate-beside (`§5` ruling 2(c)) |
| **`F-11`** | **The two authored pages have no owner** | **CONFIRMED by `F-1`'s citation** (`store-focus.md`:404 names *"the strip's deferred unit + the slice's own `§5.U` rows"* for the pages) — **DISPOSITION `FIXED` by the split**: the two pages are **fraction 1's (`T2`)** (`§5` ruling 4, `§6`, `§10`) |
| **`F-13`** | **The strip's owning tree was unresolved** | **CONFIRMED** — **DISPOSITION `FIXED` by `§5` ruling 2(a)**: re-authored **providently**, authored prototype + `rows-mint`/`rows-clear` + ONE bounded wiring role; **no hand-written DOM in `src/**`**, because `AGENTS.md`'s project-wide UI constraint binds and the shell carve-out covers only the Electron shell's own chrome — window frame, native menu bar, preload bridge, MCP server — **not an app tab bar** |

### 2.2 Step 1's dispositions, in this repo's gate-1 vocabulary

**The closed vocabulary is `FIXED` / `VALID` / `DECLARED-LIMIT` (with owner) / `UNSUBSTANTIATED` /
`OVERSTATED` / `REFUTED-AT-THE-BYTES`; no finding below is left homeless and no seventh disposition is
invented.**

| Disposition | Findings | What it means here |
| --- | --- | --- |
| **`FIXED`** | `F-6` · `F-7` · `F-11` · `F-13` · `F-8`'s subject-half · `F-9` · `F-12` · `F-14` · `F-15` · `F-16` | the finding's subject is closed by the rulings or by the split's own boundary; each lands in one of the two contracts' diff scopes (`§10`) |
| **`DECLARED-LIMIT` (with owner)** | `F-10`'s two halves (`C-12`, `C-13`) | an obligation with no owner at this head, **carried with a named owner** — never smoothed, never a bare `OWED` |
| **`REFUTED-AT-THE-BYTES`** | `F-4`'s unqualified half | the *"no operator entry point"* prose is refuted at `demo/pane-drag-demo/**` + `docs/FORKER.md`:402; the `src/**` half stands as `VALID` |
| **`OVERSTATED`** | `F-3`'s *"no owner at all"* framing **and** step 3's fixed-cardinality limit (`§4`) | the substance is real; the unqualified form over-claims. `F-3`'s substance is `VALID` (the second authority is real and verified); step 3's limit is **STRUCK** |
| **`UNSUBSTANTIATED`** | none | **`0`** — every finding was citable, which is why step 1 could be answered rather than re-run |
| **`VALID`** | `F-1`/`F-3`'s core · `F-4`'s `src/**` half · `F-5` · `F-10`'s two halves · the step-1 core as a whole | verified at the bytes by this pass, as cited at `§2.1` |

---

## 3. STEP 2 — CRITIQUE: 16 findings

**`[SUPPLIED]` Step 2 independently confirmed the same core and added the following. Each addition is
carried here with the byte-evidence this pass took where the pass could take it.**

| id | Step 2's addition | This pass's verification / disposition |
| --- | --- | --- |
| **`S2-1`** | **The fork's `TAB-STRIP-SHELL` ask was `DECLINED-REFILED`** — so a shipped strip **MODULE** is inadmissible while **authored data** is permitted | **VERIFIED AT THE BYTES (`[READ]`)**: `docs/specs/provident-electron-shell-chrome-handoff-review.md` **`:184`** (`S-d8` prohibition 1 names *"**tab**"* among the consumer-vocabulary literals a (C)-admissible contract **MAY NOT** contain) · **`:272`** (`SCH-11` `TAB-STRIP-SHELL` **`DECLINE + REFILE`** — *"No in-tree consumer: this repo ships **no** tab strip (**no `querySelectorAll`, no tab module, no `matchMedia`** — grep over `src/**`, this pass)"*) · **`:294`** (post-amendment: **`ADOPTED-RESHAPED`** as `U-LISTHOST` — *"an **owned-node list host** …, **not** a tab strip … **no tab-strip vocabulary**"*) · and **`H-r16`** (**`:244`**), whose own note states *"`U-THEME-CONTROL` is app UI content authored in **this repo's own graph** (permitted — `AGENTS.md:23-34` `REQUIRE`s provident-authored UI)"*. **DISPOSITION `VALID` + `DECLARED-LIMIT`**: **no shipped strip module**; **authored data is the admissible route**, which is exactly `§5` ruling 2(a) |
| **`S2-2`** | The `[U]` rows this unit needs are **operator-owed** — three `MANUAL OPERATOR` rows of exactly this class remain untaken | **VERIFIED AT THE BYTES (`[READ]`)**: `docs/specs/gutter-ui-live-battery.md` **`:536`** (`"instrument": "MANUAL OPERATOR"`), **`:539-541`** (the observation *"NO HUMAN OPERATOR WAS PRESENT THIS RE-RUN — the operator observation the row requires is NOT taken, and no tool output is substituted for it"* with its structural reason), and **`:682`** (item 1: *"Take the three `MANUAL OPERATOR` rows with a human at the window — they remain the only rows no …"*). **DISPOSITION `DECLARED-LIMIT` with a positive owner and a literal `cmd`** (`§6`'s answer table, `§8` `C-11`) |
| **`S2-3`** | A new pointer-carrying leg **collides** with `tests/ui-leg-contract.test.ts`'s pinned `scripts` KEY SET | **VERIFIED AT THE BYTES (`[READ]`)**: the suite's `L-1` row asserts `Object.keys(scripts).filter(k => !LANDED_SCRIPT_KEYS.includes(k))` **equalling exactly `['ui']`** *and* set-equality against `[...LANDED_SCRIPT_KEYS, 'ui']` — so **any further script key reddens `L-1` and a config change cannot satisfy it**. **DISPOSITION `DECLARED-LIMIT` with owner**: any new script key is OWED to a TestWriter extension of the landed set (`§8` `C-7`) |
| **`S2-4`** | Authored nodes **redden** `tests/theme-control.test.ts`'s landed `PRE_CENSUS = 18` / `POST_CENSUS = 23` rows, **owned by another unit** | **VERIFIED AT THE BYTES (`[READ]`)**: `tests/theme-control.test.ts` **`:115-116`** — `const PRE_CENSUS = 18 // §3.5 X-1 — the filing-time authored census`, `const POST_CENSUS = 23 // §3.1 M-2 — 18 + 5` — with the census rows at `:830-832`, `:1212-1213`, `:1418-1420`, `:1818`. **DISPOSITION `DECLARED-LIMIT` with owner**: the re-grain is declared in **both fractions' diff scopes** (`§10`) and named `C-6` (`§8`); the rows' owner is the unit that touched the envelope, and **`T1`/`T2` must declare the re-grain rather than perform it silently** |
| **`S2-5`** | **One operator close costs ≥2 whole-file writes plus per-reference events** | **DISPOSITION `VALID` (cost, not defect)** — it is the mechanical consequence of the persisted close landing on the tier-1 record with per-reference receipts; recorded so the contract **declares** the write count rather than letting a reader infer one write (`§10`, `C-10`) |
| **`S2-6`** | **The strip must be TOTAL over every non-list store answer** — MISS, `parts`, `'undeclared-name'`, `'ambiguous-path'`, `'reserved-name'`, a refused receipt | **DISPOSITION `VALID` — and it is the strongest design constraint in the list.** It is carried as `C-1`/`C-5` and as `§10`'s strip obligation: the strip's totality is a **`P-TP` property of the strip's own register** over the closed answer set, with the refusal tokens named rather than summarized |

**`S2-*` dispositions, in this repo's closed set: `VALID` (`S2-1` substance, `S2-5`, `S2-6`) ·
`DECLARED-LIMIT` with owner (`S2-1`'s module-inadmissibility half, `S2-2`, `S2-3`, `S2-4`) ·
`REFUTED-AT-THE-BYTES` (`0`) · `UNSUBSTANTIATED` (`0`).**

---

## 4. STEP 3 — ARCHITECTURE REVIEW: `BLOCKED-ON-SEMANTICS`, AND THE DATED CORRECTION AGAINST ITS OWN `rows-mint` ERROR

### 4.1 Step 3's return, as filed

**`[SUPPLIED]`** Step 3 returned **`BLOCKED-ON-SEMANTICS`** (the filed form also reproducing step 1's
`FLAWED`), together with: **a `D-GP-SAD-5` decomposition row reading `SPLIT-RECOMMENDED`** (`§7`
reproduces it with its nine columns), **a 13-item conditions list `C-1`…`C-13`** (`§8`), and **a 9-item
ranked open-semantics list** (answered at `§6`).

### 4.2 THE CORRECTION — A DATED CORRECTION BESIDE THE CLAIM, NEVER A SILENT FIX

**`[READ]` THE CLAIM STEP 3 MADE, IN ITS OWN TERMS.** Step 3's change-analysis asserted that ***"the
runtime's command surface cannot create a node"*** (`src/renderer/runtime.ts:426-460`), reading that
region as allowing only `state-slice`/`layer-apply` **content mutations on EXISTING nodes**.

**`[READ]` THAT CLAIM IS FALSE, AND THE BYTES BELOW ARE WHY. THIS IS A DATED CORRECTION BESIDE THE
CLAIM (`RCA-8(d)`): step 3's sentence is kept visible above and is NOT rewritten; this clause is the
operative reading, and it is verified by the supervisor at the bytes.**

| # | The byte evidence | What it refutes, and what it establishes |
| --- | --- | --- |
| **1** | **The host forwards the op payload straight to the engine** — `src/renderer/runtime.ts` **`:480`**: `const result = this.supervisor.apply(payload)` (read this pass at the bytes, in context from `:474`) | The *"cannot create a node"* reading is refuted: the host **passes the payload through**. The `:426-460` region the claim cited shape-guards **only** `state-slice`/`layer-apply`'s `mutation` (`:455-460`, `:471-473` are the kind-scoped guards) |
| **2** | **The op-kind vocabulary is ENGINE-OWNED and the host NEVER whitelists it** — `docs/specs/runtime-host.md` **`:53-55`**: *"`OpCommand` = a managed-channel op payload (`{ kind: 'clone-instance' \| 'attach' \| 'detach' \| 'move' \| 'state-slice' \| 'layer-apply' \| 'rows-mint' \| 'rows-clear' \| 'placement-attach' \| 'destroy', ... }`). **The op-kind vocabulary is ENGINE-owned** (`supervisor.apply` rejects an unknown kind with `{status:'rejected'}`); **the host forwards and never whitelists the kind itself**."* | The union **names `'rows-mint'` and `'rows-clear'` BESIDE `state-slice`/`layer-apply`** — so the host's two-kind guard is a SHAPE guard, never an admissible-kind set |
| **3** | **The engine implements `rows-mint` as ONE atomic mint op resolving a prototype BY NAME**, keyed by the prototype's `keyField` anchor, registered and structure-evented, with `rows-clear` as its teardown — `node_modules/provident-ssr/dist/core/ops.js` **`:183-241`** (read this pass: `rowsMint(op, ctx)` at `:228`, the node-scoped layerId `` `hook-${target.id}-${op.hookName}-rows` `` at `:230`, the `keyField` **KEYED BATCH-REUSE** semantics at `:216-227`, the ATOMIC row-shape validation at `:240-247`, and the fail-with-warning `rows-prototype-unresolved` at `:193-194`) | **A list of N rows IS mintable as ONE op** — *"ONE atomic mint op … mints ONE family node per raw data row (each row's fields become VALUE-BEARING source anchors on the minted node), marks each minted node's `originLayer` + registers it"*. **This is the byte that strikes step 3's fixed-cardinality limit** |
| **4** | The engine's supervisor side registers and events the mint — `dist/core/supervisor.js` **`:839`** · **`:1218`** · **`:1552`** | The mint is **registered and structure-evented** at the supervisor, so the strip's rows are reachable and observable — not a side-channel |
| **5** | **It is on the tool surface with a per-kind undo contract** — `docs/specs/mcp-endpoint.md` **`:167`**: *"undo is **EXACT** for `state-slice`/`attach`/`rows-mint`, a PINNED NO-OP for `destroy`, and a **DOCUMENTED NO-OP** for `detach`/`move`/`clone-instance`/`layer-apply`/`placement-attach`/`rows-clear`"* | `rows-mint`'s undo is **EXACT**; **`rows-clear`'s undo is a DOCUMENTED NO-OP** — the asymmetry the replacement caveats must state (`C-3`) |
| **6** | **It is agent-reachable through `provident.op`** — `src/main/mcp-server.ts` **`:938`**: `{ name: 'provident.op', description: 'Apply a single managed-channel op', inputSchema: { command: z.unknown().describe('the OpCommand payload') } }` | **The path is agent-reachable**, so the strip's list surface is agent-visible by construction once the node is authored |
| **7** | **It is already exercised by this repo's own batteries** — `docs/specs/journal-reversibility-battery.md` (`O9`/`S9`) · `docs/specs/e2e-test-battery.md` **`:89`** · `docs/specs/engine-pin.md` **`:1028-1030`** (read this pass: the supervisor's first guard *"`if (!node && op.kind !== 'clone-instance' && op.kind !== 'layer-apply' && op.kind !== 'rows-mint' && op.kind !== 'rows-clear') return { status: 'rejected', error: { code: 'unknown-node' } }`"*) | The kind is **landed and rehearsed**; the engine-pin clause even exempts `rows-mint`/`rows-clear` from the node requirement — **another direct refutation of the cited claim** |
| **8** | **`rows-mint` has NO landed `src/**` consumer today** — the only `src/**` hit for the token is the comment at `src/renderer/runtime.ts` **`:453`** (`// F6 — a `state-slice`/`rows-mint`-style op whose `mutation` is missing or …`) — verified by this pass's whole-`src/**` grep, which returned **that single comment hit and nothing else** | The route is **engine-landed and consumer-unexercised**: the strip's contract is its FIRST `src/**` consumer, which is a **cost to declare**, never a reason to refuse the route |

### 4.3 THE CONSEQUENCE — THE FIXED-CARDINALITY LIMIT IS STRUCK, AND THE TWO CAVEATS THAT REPLACE IT

**`[DERIVE]` `STRUCK: the "fixed cardinality" limit that step 3 derived from the false premise.`** An
**N-row, data-driven list IS expressible** as **authored data + `rows-mint`/`rows-clear` + ONE bounded
wiring role**, **with no new engine capability, no package-side ask, and no hand-written DOM**. The
package is never patched (`AGENTS.md` item 1); nothing is requested of the upstream project; and the
`AGENTS.md` UI constraint holds in full.

**THE TWO CAVEATS THAT REPLACE THE LIMIT, each of which the strip's contract MUST write:**

1. **The prototype must be DECLARED BY NAME IN THE AUTHORED ENVELOPE.** `rows-mint` resolves its
   prototype **by name** (`ops.js`:183-184); so the authority for *what a tab row looks like* stays
   **authoring data** in the envelope. **A contract that mints from a wiring-side prototype factory, or
   that names a prototype not declared in the authored envelope, contradicts the route's own premise**
   and is a finding on that contract.
2. **`rows-clear`'s undo is a DOCUMENTED NO-OP while `rows-mint`'s is EXACT** (`mcp-endpoint.md`:167) —
   so **the teardown/undo reasoning must be WRITTEN, not assumed**: a contract that reads
   `rows-clear` as *"the inverse of mint"* asserts an undo the engine does not provide, and the closing
   path's recovery semantics are the contract's to declare (`C-3`).

**`[DECL]` And the honest cost, stated rather than buried:** `rows-mint` is **consumer-unexercised in
`src/**`** today (`§4.2` row 8). The strip is its first consumer, which means the contract's red set
carries the **route's first `src/**` drive** — a cost named at `C-8`, not a defect.

---

## 5. THE SEMANTICS BLOCK — the three axes, the rulings, and the struck/withdrawn terms

**`[RULING]` THE ARCHITECT'S RULINGS, DATED `2026-10-11`. Each names what it supersedes or strikes; none
is this pass's reading.** For each ruling: the text, then **what it settles**, then **what it supersedes
or strikes**.

### 5.1 RULING 1 — "ADOPT THE DEMO'S TABS MANAGEMENT INTO THE CORE SHELL."

**The demo's tabs management, ENUMERATED so "adopt" has a subject (`[READ]`):**

| # | The adopted element | Its bytes |
| --- | --- | --- |
| **(1)** | `mem.tabs.<id>` **records** shaped `{active, lastActive}` | `demo/pane-drag-demo/demo.ts`:596-598 (the seed commits), `:125` (the record's typing `{ active?: boolean; lastActive?: number }`) |
| **(2)** | a **module-level `tabIds` registry** | `demo.ts`:**`:593`** — `let tabIds: string[] = ['tabA', 'tabB', 'tabC']` |
| **(3)** | the **`exactlyOneActiveMember`** constraint with the **recency repair** and the **`landingPage` mint** | `demo.ts`:125-139, the arms at **`:130-137`** (surplus → keep the max-`lastActive`; none → re-activate the most recent; empty → `tabs.landingPage = { active: true, lastActive: 0 }`) |
| **(4)** | the **hand-written strip** — `+ new` control, per-tab `×`, active class | `demo/pane-drag-demo/index.html`:**`:19-29`** (the `.tab-bar`/`.tab-btn`/`.tab-close`/`.tab-new`/`.tab-btn.active` styles) and **`:56`** (`<div class="tab-bar" id="tab-bar"></div>`); `demo.ts`:**`:304-351`** (`renderTabPane` rebuilding from the LIVE registry, `wireTabs`, the persistent `+ new`, the per-tab close via `data-close-tab`) |
| **(5)** | the **subtree subscription on `mem.tabs`** | `demo.ts`:**`:639`** — `store.subscribe('mem.tabs', () => fn(), { subtree: true })` |
| **(6)** | the **live-verified behaviours**: focus by recency · open a new focused leaf · close → most-recent survivor reactivated · close-all → landing page | `demo/pane-drag-demo/README.md` **`:84-97`** — FOCUS (a click bumps `lastActive` to `max+1`), OPEN (a new active leaf at `max+1`, the bar shows it), CLOSE (arm (b) reactivates the most-recent survivor), CLOSE-ALL (arm (c) opens the landing page) |

**What it settles.** The **subject** of the adoption is exactly the six elements above — so a contract
that adopts "the demo's tabs management" while silently adding a seventh element, or omitting one, is a
finding on that contract. **What it supersedes/strikes.** **`S-T1`/`S-T2`** (`§0A.3`): the adopted
management is **re-homed** (ruling 2(b)) and its **policy arms are superseded** (ruling 2(c)); the demo's
strip becomes a **SUPERSEDED REFERENCE** (`S-T5`).

### 5.2 RULING 2 — "PROCEED WITH PLANNED CHANGES AS DEFINED BY THE FORK PROPOSALS."

**`[RULING]` This resolves the three forks IN THE PLAN'S OWN TERMS.** Each is recorded explicitly,
because each is a fork between what the demo does and what the plan asks:

| Axis | The fork | The ruling, in the plan's own terms | What it supersedes / strikes |
| --- | --- | --- | --- |
| **(a) RENDERING** | hand-written DOM (the demo's strip) **vs** envelope-authored nodes (the plan's `§6.5` ask) | **THE ADOPTED SURFACE IS RE-AUTHORED PROVIDENTLY**: **authored prototype + `rows-mint`/`rows-clear` + ONE bounded wiring role**; **no hand-written DOM in `src/**`** — because **`AGENTS.md`'s project-wide UI constraint binds** and **the shell carve-out covers only the Electron shell's own chrome — the window frame, the native menu bar, the preload bridge, the MCP server — NOT an app tab bar** | **`S-T5`** (the demo's strip as an implementation reference is superseded); **`§4`'s struck fixed-cardinality limit is replaced by the route + its two caveats** |
| **(b) TIER/PERSISTENCE** | the demo's realm-lifetime `mem.tabs.*` **vs** the plan's tier-1 `file.tabs.*` | **THE ADOPTED MANAGEMENT LANDS ON THE PLAN'S TIER-1 `file.tabs.*` RECORD** — **the `tabs` root is ALREADY RESERVED** (`src/renderer/renderer.ts` **`:43-50`**, read this pass: the closed root set `window` · `tabs` · `layout` · `settings` · `tracked` · `modules`), **NOT the demo's `mem.tabs.*`** | **`S-T1`** — the demo's realm-lifetime record is the superseded reference; the persistence half is `T2`'s (the persisted close) |
| **(c) REPAIR RULE AND AUTHORITY** | the demo's **recency** arm + its `tabIds` registry **vs** the plan's ruled order-based rule | **THE RULED RULE STANDS: NEXT-SURVIVING BY `file.tabs.order`, WRAPPING**; **the reserved landing entry is a NORMAL MEMBER of `order`, activated AS A REPAIR**; and **the demo's `tabIds` registry RETIRES — MEMBERSHIP = THE RECORD'S OWN ORDER.** The demo's **recency arm is SUPERSEDED**, and **the frozen artifact's in-span `D-7` note naming that arm is ROUTED TO AN ARCHITECT ANNOTATE-BESIDE — NOT A RE-FREEZE** | **`S-T2`** (the registry retires; the recency arm is superseded) · **`F-10`'s (b) half** dispositioned `DECLARED-LIMIT` with the annotate-beside as its route — **a `D-7` note correction is NOT a re-freeze**, and a pass that re-freezes the artifact to correct a note is a finding |

### 5.3 RULING 3 — THE SPLIT IS TAKEN

**`[RULING]` "The split is taken — it is the fork's own filing's own separation and step 3's
`SPLIT-RECOMMENDED`."** **Fraction 1 is admitted as the ledger's NEW OPEN ROW `T2` = `U-STORE-TABS-RECORD`
(wave `T`), and `T1` keeps its id and its subject (the strip).**

**The ledger move, with its terms (`[DECL]`, and recorded in the trackers by this pass):**

- **`33 DONE / 1 open` UNITS = `34` (`33 + 1 = 34` ✓) → `33 DONE / 2 open` UNITS = `35` (`33 + 2 = 35` ✓)** —
  **an admission adds a unit; it does not move a `DONE`.**
- **The identity clause, re-read with its NEW term (`2` (T) instead of `1`):** **`2` engine + `2` harness +
  `4` (D) + `10` (E) + `3` (F) + `3` (G) + `4` (H) + `1` (the pane-drag compliance unit, unwaved) +
  `1` (the `H2` split's `+1`) + `3` (S) + `2` (T) = `35`** — `2 + 2 + 4 + 10 + 3 + 3 + 4 + 1 + 1 + 3 + 2 = 35` ✓
  *(equivalently written `… + 1 + 2 = 35` ✓)*.
- **THE ROWS: `37` LIVE ROWS = `35` UNIT ROWS + the `1` NON-UNIT FORK ROW `F4` + the `1` WAVE-`H` QUEUE ROW
  that is not a unit row** — `35 + 1 + 1 = 37` ✓.
- **THE OPEN SET, NAMED: `T1` · `T2` = `2`.**
- **THE `MOVED TO DONE` LABEL SET STILL EQUALS THE `DONE` SET AT `33` — `33` = `33`** — no `DONE` unit's
  row reads in the open form, and the only rows reading in the open form are `T1` and `T2`.
- **WHAT MOVED, AND WHAT DID NOT (`RCA-8(f)`): exactly ONE thing — a NEW ROW (`T2`) was admitted** by the
  architect's split ruling; **no `DONE` row was re-opened, no row was removed, `T1`'s id and subject are
  unchanged, and the only counts that moved are the `+1` unit and the `+1` live row.**

### 5.4 RULING 4 — THE REMAINING SMALLER QUESTIONS

**`[RULING]` "The remaining smaller questions are resolved by ruling 2 or by the plan's own text."** Each
is recorded at `§6`'s answer table with **its disposition and what it now reads**; no question on step 3's
9-item list is left without a row, and none is answered by this pass's preference.

---

## 6. THE ANSWER TABLE — question → ruling → where it now lands

**`[DERIVE]` One row per open semantics item and per smaller question, with the ruling that answers it and
the site at which it now lands. Nothing here is left to assembly, and no row is answered by silence.**

| # | The question | Answered by | Where it now lands |
| --- | --- | --- | --- |
| **`Q1`** | **Which authority holds tab MEMBERSHIP?** | ruling 2(c) | **the RECORD's own `file.tabs.order`** — the demo's `tabIds` registry **retires**; membership is the record's order, in `T2` |
| **`Q2`** | **Which REPAIR rule selects the next active entry?** | ruling 2(c), extending the plan's `R3-1` | **next-surviving by `file.tabs.order`, WRAPPING to the first when the closed entry was last**; on a `remove`-triggered evaluation **the removed entry's own index is the referent** — `T2` |
| **`Q3`** | **How does the reserved LANDING entry fit the model?** | ruling 2(c), extending `R3-2` | **a NORMAL `<tabId>` instance** — inside the `file.tabs.<tabId>.*` matched set **and** a member of `file.tabs.order`; its reservation is **one `concrete` declaration outranking the pattern**, so only the entry's own removal is refused; **it is activated AS A REPAIR** (the zero-active arm writes its `active` **and** its place in `order`, in the same committed write) — `T2` |
| **`Q4`** | **Where do the TWO AUTHORED PAGES land?** | ruling 4 (by ruling 2's boundary) | **fraction 1 (`T2`)** — the landing page and the error page are the record's terminal surfaces (§1.7 item 6, `NW-9`); `T1` authors no page |
| **`Q5`** | **What is the TAB-ID MINTING site?** | ruling 4 (by ruling 2(a)) | **the ONE bounded wiring role** — ids are minted at the wiring role and only there; the plan's `§6.5` item (c) question (*"who mints a tab id, its uniqueness across restarts, and what a duplicate means"*) is thereby answered with a single site, and the contract must state the duplicate's meaning |
| **`Q6`** | **What is the demo's disposition?** | ruling 2(a)/(b)/(c) + `S-T1`/`S-T2`/`S-T5` | **ADOPTED-AS-CORE; the demo's strip becomes a SUPERSEDED REFERENCE.** `demo/**` is **named in the unit's DENIED set**, and **`docs/FORKER.md`:402's pointer must gain a dated annotate-beside** reading *"the tab implementation now lives in the core shell; the fork consumes the core"* — **OWED to the landing pass** (`§10`'s foot) |
| **`Q7`** | **Where does the fork-facing statement of the new authority go?** | ruling 2(a) + the `H-r6` convention | **`docs/FORKER.md` §4 gains a block for the new authority — OWED AT THE LANDING** (`§10`) — the same convention every sibling store unit used; **this repo writes no file under `<Astrographer>/`** |
| **`Q8`** | **The `§7a.1` item 7 re-seed write — whose register row is it?** | ruling 4 (by the plan's own text) | **owed as a REGISTER ROW of the landing fraction (`T2`).** `docs/specs/store-focus.md` `§7a.1` item 7 (`:954`) declares the re-seed write **CARRIED-DEFERRED** with a named revisit condition — *"when that record + projection source land, the re-seed WRITE becomes executable and MUST be driven by a register row of that landing unit's own register"* — so the row is `T2`'s, **by that clause's own words** |
| **`Q9`** | **Is `P-16` cited?** | ruling 4 | **YES — `P-16` is cited BY ROW NAME in BOTH contracts** (`docs/specs/mcp-endpoint.md` `§6.4` / `data-ownership-model-plan.md` `§2.3`), because `T1`'s third ask (the MCP-visible node) exists to satisfy it and `T2`'s record is what the node carries |
| **`Q10`** | **The census re-grain of `tests/theme-control.test.ts`** | ruling 4, `S2-4` | **DECLARED IN BOTH CONTRACTS' DIFF SCOPES** — the `PRE_CENSUS = 18` / `POST_CENSUS = 23` pair (`:115-116`) belongs to another unit, so `T1`/`T2` **declare** the drift and the re-grain's owner rather than editing the rows silently |
| **`Q11`** | **The operator rows — how are they discharged?** | ruling 4 + `S2-2` | **declared `MANUAL OPERATOR` with a POSITIVE OWNER and a LITERAL `cmd`:** a session **with a human at the window**, discharging each row as a recorded operator observation with the accompanying tool readings; **the three untaken precedents are named** (`gutter-ui-live-battery.md` `U-3` · `U-4` · `U-6`, `:478`/`:536-541`/`:682`) |
| **`Q12`** | **Does the subject as stated need a RE-FREEZE?** | step 1 `F-10`, answered by ruling 2 | **NO.** The frozen artifacts freeze **two STORE modules only**; **a `D-7` NOTE correction is an architect annotate-beside, not a re-freeze** (ruling 2(c)) — `S-T2`'s edge |
| **`Q13`** | **What is the strip's answer-set TOTALLITY requirement?** | `S2-6`, carried as `C-1`/`C-5` | **the strip must be TOTAL over every non-list store answer**: MISS · `parts` · `'undeclared-name'` · `'ambiguous-path'` · `'reserved-name'` · a refused receipt — **each a named state the strip renders, and each a `P-TP` row in `T1`'s register** |

---

## 7. THE `D-GP-SAD-5` DECOMPOSITION ROW — nine columns, and its disposition

**`[SPEC]` Placement.** The duty text pins the row to *"the gate-1 record
(`docs/specs/<proposal>-review.md`), **never inside a spec**"*, with the nine columns *verbatim*
(`decomposition · recommendation · proposed fraction · boundary (named) · remainder / coherent core ·
disposition · decider · bubble · ordering anchor`). **This file IS the gate-1 record for both fractions**,
so the row lives here; and because the split is **taken**, the row's disposition cell is the **operative**
reading. **`AMEND-FROZEN` is unavailable before a freeze exists** — and here no re-freeze is owed at all
(`Q12`), so it is not merely unavailable but **inapplicable**.

**THE ROW, AS STEP 3 RETURNED IT (`[SUPPLIED]` for the fraction/boundary texts; this pass reproduces
them and does not re-derive them):**

| decomposition | recommendation | proposed fraction | boundary (named) | remainder / coherent core | disposition | decider | bubble | ordering anchor |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `decomposition` | **`SPLIT-RECOMMENDED`** | **FRACTION 1 = `U-STORE-TABS-RECORD`** (admitted as `T2`): the tier-1 `file.tabs.*` **record** + the **exactly-one-active constraint evaluated on write AND on `remove`** + the **persisted close** + the **reserved landing reference** + **the two authored pages** | **EVERYTHING THE STORE MUST HOLD AND EVERY TERMINAL STATE OF THE CLOSE VERB — NO LIST SURFACE**: the record · the constraint and its repair · the close's terminal states · the landing reference · the two pages. **It authors no tab list, wires no operator control and adds no MCP-visible list node** | **FRACTION 2 = `U-STORE-TABS-STRIP`** (kept by `T1`): **THE LIST SURFACE AND ITS AGENT-READABLE CARRIER — no record, no constraint, no terminal page.** **IT IS THE COHERENT CORE** because it is **one concern with ONE ARTIFACT PAIR** (the authored envelope prototype + the bounded wiring role) and **the only `[U]`-heavy part**; `T1` renders what `T2` holds and defines nothing | **`SPLIT-NOW`** — the split is **TAKEN** by the architect `2026-10-11` (`§5` ruling 3); on this row's reading the proposal **is** split, `T2` is admitted, and `T1` keeps its id and its subject | **the architect** | **yes — FIRED AND ANSWERED `2026-10-11`** (the as-filed row carried `BUBBLE-TO-USER`; the bubble's answer is `SPLIT-NOW`) | **`T2` LANDS FIRST; `T1` CONSUMES IT.** `T1`'s list surface cannot be driven before `T2`'s contract settles the record's shape and the close verb's terminal states; **neither fraction blocks the other's CONTRACT, and `T2` blocks `T1`'s GREEN** |

**`[DERIVE]` The row's consequence, stated so the ordering is not re-derived:** the two fractions are
**independent contracts with a one-directional consumption edge** — `T2` produces, `T1` consumes. **No
contract may be authored "for both"**: `T1`'s contract that re-states the record's shape is a
**second authority** over membership, and is a finding on that contract.

**`[DECL]` NO `NO-SPLIT` was returned, so nothing in this row is silent:** the duty's
*"SILENCE IS A FINDING"* clause is satisfied by the row's presence and by its answered disposition.

---

## 8. THE `C-1`…`C-13` CONDITIONS, WITH OWNERS

**`[SUPPLIED]` For the 13-item list as step 3 returned it. `[DECL]` For each row's disposition and owner,
which this pass records — and no condition is left as a bare `OWED`.**

| id | The condition, as step 3 returned it | Disposition | Owner |
| --- | --- | --- | --- |
| **`C-1`** | The strip must be TOTAL over every non-list store answer (MISS · `parts` · `'undeclared-name'` · `'ambiguous-path'` · `'reserved-name'` · a refused receipt) — **and the totality must be driven, not asserted** | **STANDING — carried into `T1`'s contract as a `P-TP` obligation before its red set** | the `T1` spec-writer (contract) → the `T1` TestWriter (drives) |
| **`C-2`** | The MCP-visible node must not re-open the landed negative (`focus-tool.md`:1085-1092) — the carrier is the **authored envelope**, never a tool-side graph mutation | **STANDING — `T1`'s contract cites the landed negative BY ROW/SITE and states its carrier** | the `T1` spec-writer |
| **`C-3`** | The teardown/undo reasoning must be **written**: `rows-mint`'s undo is EXACT, **`rows-clear`'s is a DOCUMENTED NO-OP** | **STANDING — `T1`'s contract declares the closing path's recovery semantics; a contract reading `rows-clear` as "the inverse of mint" is a finding** | the `T1` spec-writer |
| **`C-4`** | The demo is a **SECOND AUTHORITY** whose policy contradicts the ruled rule; it must not survive as a live competitor | **DISCHARGED IN SUBSTANCE by `§5` ruling 2(c)** (`tabIds` retires; membership = the record's `order`; the recency arm superseded) — **the superseded-reference record is `S-T1`/`S-T2`/`S-T5`** | the architect (ruling taken) → the landing pass (`docs/FORKER.md`:402 annotate-beside, `§10`) |
| **`C-5`** | The strip's answer set must be a **CLOSED, ENUMERATED** set — the refusal tokens named, not summarized | **STANDING, paired with `C-1`** | the `T1` spec-writer |
| **`C-6`** | The `tests/theme-control.test.ts` census (`PRE_CENSUS = 18` / `POST_CENSUS = 23`) is **another unit's** rows; authored nodes redden them | **DECLARED-LIMIT with owner — DECLARED in BOTH contracts' diff scopes (`§10`); the re-grain is not performed silently** | the two spec-writers (declare) → the pass that touched the envelope / the owning unit (re-grain) |
| **`C-7`** | A new pointer-carrying leg collides with `tests/ui-leg-contract.test.ts`'s `L-1`-pinned `scripts` KEY SET | **DECLARED-LIMIT with owner — any new script key is OWED to a TestWriter extension of the landed set; a config change cannot satisfy `L-1`** | the pass that authors the leg → a TestWriter (extends the set) |
| **`C-8`** | `rows-mint`/`rows-clear` has **no landed `src/**` consumer** — the strip is the route's first `src/**` drive | **DECLARED-LIMIT — named as a cost in `T1`'s contract, with the red set carrying the route's first drive** | the `T1` spec-writer → the `T1` TestWriter |
| **`C-9`** | The `T1`/`T2` boundary must be **asserted as a set**: an edit outside a fraction's declared diff scope is a finding (`⊆` with a positive control, never a bare name list) | **STANDING — each contract carries its own `edit-set ⊆ declared scope ∪ wiring points` row with a positive control** | the two spec-writers |
| **`C-10`** | One operator close costs **≥2 whole-file writes plus per-reference events** — the cost must be **declared**, never inferred as one write | **STANDING — `T2`'s contract declares the write count and the event count** | the `T2` spec-writer |
| **`C-11`** | The operator rows: `MANUAL OPERATOR`, a **positive owner**, a **literal `cmd`**, and **no tool output substituted** — with the three untaken precedents named | **STANDING — declared in both contracts' gate-6 sections** | the two spec-writers → a session **with a human at the window** (the discharge) |
| **`C-12`** | The store's **reserved "first constraint evaluation"** (`store-core-graph.ts`:2169-2170) has no owner | **DECLARED-LIMIT with owner, now OWNED**: the reservation's owner is **`T2`** — it is the constraint's landing, and its boot-step claim is `T2`'s to take or to decline in writing | **`T2`** (the fraction that lands the constraint) |
| **`C-13`** | The frozen artifact's in-span **`D-7` `>=2`-repair-arm revisit condition** has no owner | **DISCHARGED IN SUBSTANCE by `§5` ruling 2(c): routed to an ARCHITECT ANNOTATE-BESIDE — NOT A RE-FREEZE** (`S-T2`); a pass that re-freezes to correct a note is a finding | the architect (annotate-beside) |

**`[DECL]` THE CONDITIONS' ARITHMETIC: `13` conditions = `2` DISCHARGED IN SUBSTANCE (`C-4`, `C-13`) +
`4` DECLARED-LIMIT with owner (`C-6`, `C-7`, `C-8`, `C-12`) + `7` STANDING contract obligations (`C-1`,
`C-2`, `C-3`, `C-5`, `C-9`, `C-10`, `C-11`)** — `2 + 4 + 7 = 13` ✓. **NO condition is dismissed, and NO
condition is carried without an owner.**

---

## 9. THE VERDICT

**`[DECL]` AS FILED: `BLOCKED-ON-SEMANTICS`** (`§4.1`) — the delegable verdicts were **unavailable** and
were not issued. **NOW: `DELEGABLE-AFTER-SPEC`**, issued **on the architect's rulings of `2026-10-11`
recorded at `§5` and on nothing else**, with the two fractions as the admitted units (`T1` keeps its id
and subject; `T2` is new).

**What `DELEGABLE-AFTER-SPEC` DOES say** (`6` clauses): **(1)** the semantics are settled enough for **two
contracts to be DERIVED** (`docs/specs/store-tabs-record.md`, `docs/specs/store-tabs-strip.md`); **(2)**
each fraction's declared diff scope, boundary and owed legs are as `§10` states them; **(3)** `T2` lands
first as an ORDERING matter, while both contracts may be authored in parallel; **(4)** each contract
carries its typed `§5.5.1` register **before** any red set (`AGENTS.md` item 11); **(5)** the 13
conditions carry the owners `§8` names; **(6)** the gate-1 chain is **complete** and this record is its
product.

**What it does NOT say:** it does **not** file a contract, does **not** authorise a red set, does **not**
discharge a condition by itself, does **not** claim a leg, and does **not** move any unit to `DONE`.
**THE SPEC GATE REMAINS THE ARCHITECT'S APPROVAL POINT** (`AGENTS.md` item 10a) — **for EACH fraction
separately**, since they are two contracts.

**`[DECL]` The verdict-bearing conditions, restated in one line each so a reader need not assemble them
from `§8`:** the contracts must carry (`i`) the strip's closed answer-set totality (`C-1`/`C-5`), (`ii`)
the authored-envelope carrier citing the landed negative (`C-2`), (`iii`) the written teardown/undo
asymmetry (`C-3`), (`iv`) the declared census re-grain (`C-6`), (`v`) the leg/`L-1` constraint (`C-7`),
(`vi`) the first-`src/**`-consumer cost (`C-8`), (`vii`) each an asserted edit-set (`C-9`), (`viii`) the
declared write/event cost of one close (`C-10`), (`ix`) the operator rows with their literal `cmd`
(`C-11`), and (`x`) `T2`'s answer on the reserved first constraint evaluation (`C-12`).

---

## 10. THE TWO CONTRACTS — paths, the OWED items, the diff scopes, and the legs each owes

### 10.1 The OWED contract paths (`[DECL]`)

| Fraction | Unit | The OWED contract path | Derives from | Its boundary, in one line |
| --- | --- | --- | --- | --- |
| **`T1`** | **`U-STORE-TABS-STRIP`** | **`docs/specs/store-tabs-strip.md`** — **OWED, NOT FILED by this pass** | `docs/specs/store-focus.md` (the state's provenance, **stays**), the plan's `§6.5` row, the two contracts' own rulings | the list surface + the agent-readable carrier; **no record, no constraint, no terminal page** |
| **`T2`** | **`U-STORE-TABS-RECORD`** | **`docs/specs/store-tabs-record.md`** — **OWED, NOT FILED by this pass** | `docs/specs/store-focus.md` (its `§7a.1` item 2 and item 7 carries), the plan's `§1.7`/`§4.3`/`§6.5`, the ruled `R3-1`/`R3-2` | everything the store must hold + every terminal state of the close verb; **no list surface** |

**`[DECL]` `T1`'s existing OWED cell reads `docs/specs/store-tabs-strip.md`; that path is UNCHANGED and is
now `T1`'s alone** (`T2` takes the new path), so no citation in the tree is re-pointed by the split — the
split **adds** a path and **moves no existing citation**.

### 10.2 The dependency relation (`[DERIVE]`)

**`T2` → `T1`, one-directional, at the CONSUMPTION edge:**

| Relation | Statement |
| --- | --- |
| **`T1` depends on `T2` for its SUBJECT** | `T1` renders the record `T2` holds and the terminal states `T2` defines; **`T1` cannot be driven to green before `T2`'s contract settles the record's shape and the close verb's terminal states** |
| **`T2` does NOT depend on `T1`** | the record, the constraint, the close and the two authored pages are **store-side and page-side**; none needs a list surface |
| **Both contracts may be AUTHORED in parallel** | the dependency is an **ordering** fact (`§7`'s `ordering anchor`), not a filing gate; the only ordering hard edge is at GREEN: **`T2` lands first** |
| **No shared file's authority is doubled** | the split exists precisely so that **no contract speaks for the other's subject**; a `T1` clause that re-states membership is the second authority `C-4` names |

### 10.3 The diff scopes (`[DECL]` — declared shapes, not authored diffs)

| Fraction | Declared diff scope, named | DENIED set (named) |
| --- | --- | --- |
| **`T1`** | the authored envelope's strip prototype/rows and its **ONE bounded wiring role**; the new `tests/store-tabs-strip.test.ts` (or the unit's own suite name); the contract; the greens record; the `tests/theme-control.test.ts` **census re-grain (DECLARED)**; any new leg key (**declared, `L-1`-owned**) | the store's bytes (frozen artifacts) · `T2`'s record/constraint/close/pages · **`demo/**`** (superseded reference) · `docs/FORKER.md` (a later pass) · any second wiring role |
| **`T2`** | the renderer wiring's tab-record region (the reserved `tabs` root is already declared, `renderer.ts`:43-50); the constraint with its ruled repair; the persisted close; the reserved landing entry; the two authored pages; the `tests/theme-control.test.ts` **census re-grain (DECLARED)**; the new `tests/store-tabs-record.test.ts` (or its own suite name) | the strip's list surface and its carrier (`T1`'s) · `demo/**` · the frozen artifacts (no re-freeze owed — `Q12`) · any second membership authority |

**`[DECL]` Both fractions' contracts must assert their scope as a SET** (`C-9`): `edit-set ⊆ declared
scope ∪ declared wiring points`, with a positive control that an edit outside it **FAILS**.

### 10.4 The legs each fraction owes (`[DECL]`)

| Fraction | The legs | The gate-6 determination |
| --- | --- | --- |
| **`T2`** | `[T]` (the record's arithmetic, the constraint/repair, the close's terminal states, the landing entry's repair write) + `[H]` (the renderer wiring region) + **`[U]` MANDATORY for the two authored pages** | **`§7.1` limb A TRIGGERS** (two re-authored rendered surfaces whose truth is real-DOM-only) and **limb B TRIGGERS** (the close flows become visible only once assembled) — so **the capped `§5.U` delta matrix + the `§6.1` coverage report + the `§6.2` read-only audit are owed HERE**, with a real operator at the window for the operator rows. **A parked UI row is `OPEN`, never green.** |
| **`T1`** | **MANDATORY LIVE BATTERY** — `[T]` (the strip's totality over its closed answer set) + `[H]` (the wiring role) + **`[U]` MANDATORY** + the same capped matrix/report/audit triple | **`§7.1` TRIGGERS on BOTH limbs, exactly as `B-9`, the plan's `§6.5` row and `docs/pending.md` `§2.12` already state**: **limb A** (a re-authored rendered surface whose truth is real-DOM-only) and **limb B** (the focus/close flows becoming visible only once assembled). **The `§7.1` predicate FOLLOWS THE RENDERED FRACTION — `T1` — with limbs A and B BOTH present**; `T2`'s pages carry their own rows. **`[D]` is NOT claimed**; **the word `waived` is FORBIDDEN** |

**`[DECL]` Both fractions are CODE-BEARING, so each carries its typed `§5.5.1` / `§5.x` Property register
BEFORE any red set is authored** (`AGENTS.md` item 11) — typed rows only (`P-IM`/`P-SM`/`P-TP`), executed
by the TestWriter with strategy ids + held/broken, caps `≤100`/row · `≤400` total · stop-after-5, and an
un-run row reported as a **FAILURE**. **The zero-row exemption is NOT available** to either, and any
exemption block a contract carries must stay visible under a dated SUPERSEDED banner.

### 10.5 The four write-backs owed to OTHER files (`[DECL]`, and this pass edits none of them)

1. **`docs/FORKER.md` §4** — the fork-facing block for the new authority, and **`:402`'s dated
   annotate-beside** (*"the tab implementation now lives in the core shell; the fork consumes the core"*).
   **OWED at the landing** (owner: the pass that lands the fractions' contracts).
2. **The frozen surface artifact's in-span `D-7` note** — the architect's **annotate-beside naming the
   superseded recency arm** (ruling 2(c)); **NOT a re-freeze** (owner: the architect).
3. **The store's reserved "first constraint evaluation"** (`store-core-graph.ts`:2169-2170) — an
   ownership statement, owned by **`T2`** (`C-12`).
4. **The plan's own `§6.5` / `§1.7` rows** — the annotation that `B-9`'s seventh proposal is now the two
   ledger rows `T1` + `T2`. **A LATER PASS'S ACT**, by instruction; no byte of
   `docs/specs/data-ownership-model-plan.md` moves in this pass.

---

## 11. PROVENANCE, LIMITS, AND WHAT THIS PASS DID NOT DO

**READ AT THEIR OWN BYTES BY THIS PASS (`[READ]`).** `docs/specs/store-focus.md` (`§1.7`'s *"What it is
NOT"* block, `:390-419`; `§7a.1` items 1–7, `:944-957`) · `docs/specs/focus-tool.md` (`:1080-1092`) ·
`docs/specs/runtime-host.md` (`:40-69`) · `docs/specs/mcp-endpoint.md` (`:160-179`) ·
`docs/specs/provident-electron-shell-chrome-handoff-review.md` (`S-d8`, `S-d11`–`S-d15`, `:180-193`; the
`SCH-11` rows at `:272`/`:294`/`:1096`; `H-r16` at `:244`) · `docs/specs/user-flow-audit.md` (`:28-102`,
the `§7.1` predicate and the `§6.1` fields) · `docs/specs/engine-pin.md` (`:1026-1033`) ·
`docs/specs/gutter-ui-live-battery.md` (`:534-543`, `:478`, `:682`) · `docs/specs/data-ownership-model-plan.md`
(the `B-9`/`R3-1`/`R3-2`/`§1.7` item 6/`§6.1` clause 1/`§6.5` blocks) · `docs/specs/secure-tier-generalization-review.md`
(the gate-1 shape and its `§6` decomposition row) · `docs/specs/store-core-graph-compliance-review.md`
(§1 family (3), `:1-348`, for the ledger provenance) · `docs/specs/fork-store-reads.md` (`§0A`) ·
`src/renderer/runtime.ts` (`:420-489`) · `src/renderer/renderer.ts` (`:40-53`) ·
`src/renderer/store-core-graph.ts` (`:2162-2175`) · `src/main/mcp-server.ts` (`:932-943`) ·
`node_modules/provident-ssr/dist/core/ops.js` (`:178-247`) · `demo/pane-drag-demo/demo.ts`
(`:125-149`, `:300-354`, `:588-602`, `:632-645`) · `demo/pane-drag-demo/index.html` (`:17-61`) ·
`demo/pane-drag-demo/README.md` (`:80-99`) · `docs/FORKER.md` (`:398-407`) ·
`tests/theme-control.test.ts` (`:115-116`, `:830-832`, `:1212-1213`, `:1418-1420`, `:1818`) ·
`tests/ui-leg-contract.test.ts` (its `L-1` row and `LANDED_SCRIPT_KEYS`) · `docs/next-steps.md`
(`:2644-2653`, `:74`–`:130`, `:2524`) · `docs/pending.md` (`:40-79`).

**MEASURED BY THIS PASS, IN ADDITION — AND THESE ARE THE PASS'S OWN MEASUREMENTS, NOT INHERITED.**
Whole-`src/**` grep for `file\.tabs` → **0 hits** · whole-repo glob `**/spec-writer.md` → **0 files**
(no `.opencode/` directory) · whole-`src/**` grep for `rows-mint`/`rowsMint`/`rows-clear` → **exactly ONE
hit: the comment at `src/renderer/runtime.ts:453`** · the `tabs` root's reservation (`renderer.ts`:43-50) ·
the demo's registry, arms, strip and subscription at the cited lines · the `PRE_CENSUS`/`POST_CENSUS`
pair · the `L-1` script-key pin's shape.

**`[SUPPLIED]` NOT VERIFIED BY THIS PASS, AND LABELLED WHERE USED:** **step 1's full 16-finding return**,
**step 2's full 16-finding return**, and **step 3's return, its 13-item `C-` list and its 9-item
open-semantics list** are the supervisor's records, reproduced at `§2`/`§3`/`§4.1`/`§8`; this pass verified
**the load-bearing core of each** at the bytes (`§2.1`, `§3`, `§4.2`) and says so **at each row**. **The
nine columns' fraction/boundary texts at `§7` are step 3's**, reproduced and not re-derived.

**NOT RUN BY THIS PASS:** any `npm` leg (`test`, `typecheck`, `typecheck:tests`, `build`) · the `ui` leg ·
the divergence leg · any Electron boot · any MCP session. **This pass holds read/search and doc-write tools
and NO SHELL**, so it **ran no suite, no tsc, no build, no commit**, and **no green is claimed at any
layer** — not `[T]`, not `[H]`, not `[U]`, not `[D]`, not APP.

**WHAT THIS PASS EDITED, IN FULL:** **`docs/specs/store-tabs-gate-review.md` (NEW, this file)** · **one
anchored `edit` in `docs/next-steps.md`** — inserting the `T1` cell's dated annotate-beside, the NEW `T2`
row, and the dated ledger-move cell, **at the existing ledger-arithmetic anchor, so that not one
pre-existing byte was rewritten** · **one anchored `edit` in `docs/pending.md`** — the `§2.12` dated
annotation. **NO byte of any `src/**` file, any `tests/**` file, the plan, `docs/FORKER.md`, any other
spec, or any other tracker row moved.** **Every pre-existing byte of both edited files stands**, verified
by line-count delta and by re-grepping the pre-existing anchors (reported to the supervisor).

**`[DECL]` THE ONE THING THIS RECORD MUST NOT BE READ AS:** it is **not** a licence to start either unit.
**The SPEC GATE — the architect's approval of `docs/specs/store-tabs-record.md` and
`docs/specs/store-tabs-strip.md`, each on its own — is the one point the chain waits for** (`AGENTS.md`
item 10a). **After that approval each fraction proceeds autonomously** through red → green → adversarial +
PBT audit → blind greens → live battery → proofread → per-unit documentation review → trio → DONE row,
with every repair cycle landing on the orchestrator's own authority.
