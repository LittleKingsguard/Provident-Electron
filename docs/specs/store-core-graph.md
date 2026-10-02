# Spec — the AMENDED store architecture: the node-anchor-link graph as the SOURCE OF TRUTH (the walk, the register, the two caches, the regeneration transaction, the event surface, the export)

**THE SUCCESSOR CONTRACT · derives the gate-1 record `docs/specs/store-node-graph-review.md` (the TWENTIETH member of the
`docs/specs/<proposal>-review.md` gate-record family) and, through it, the proposal
`docs/specs/store-node-graph-proposal.md` · STEP-0 dossier block at `§6` of THIS FILE · filed 2026-10-01 (machine clock)
against git `HEAD` `b6c95ec`.**

**⟶ THIS FILING'S AUTHORITY, stated once.** `docs/specs/store-node-graph-review.md` is the **CLOSED gate-1 record** for
this amendment: step 1 `BLOCKED-ON-SEMANTICS` · `FLAWED`, step 2 `BLOCKED-ON-SEMANTICS`, step 3 `APPROVE-WITH-CONDITIONS`
/ `NOT-DELEGABLE`, step 4 `APPROVE-WITH-CONDITIONS` printed beside this repo's in-force word
**`DELEGABLE-WITH-CONDITIONS`** for **the successor contract, after its spec gate**. **This file DERIVES the record and,
through it, the architect's directive and his round-2/round-3 answers; it does NOT re-litigate, weaken or re-open any
ruling, and a clause of this file that contradicts a ruling is a FINDING AGAINST THIS FILE, not a re-opening.**

**⟶ THIS FILE SUPERSEDES `docs/specs/store-core.md` BY RE-FILING, NOT BY EDITING.** The record's `§4` decides
**RE-FILE a successor** (its `§7` states the decided fate and the reason: the governing ruling *"THE FIRST RED SET CARRIES
THE WHOLE MODEL AND NO SECOND CORE PASS IS DECLARED"* requires **one red set against one contract**, and in-place
amendment would pay its filing saving with a **re-grain of a register whose own declaration and term table disagree with
its own size**). **Therefore: (a) `docs/specs/store-core.md` KEEPS ITS BYTES** — this pass edits no byte of it, and the
**one dated status marker** the record's `§7` owes it is written by the **supervisor's spec-gate pass**, not here; **(b)
its typed register is NEVER RE-GRAINED** and survives as the as-filed record of the **OLD** model; **(c) its red set is
never authored** and its *"authorable today"* status (`§4.1`/`§4.2` of that file) becomes **spent provenance**; **(d) its
two arithmetic findings — the declared row count (`20`) against its own table's rows, and its term table's coverage —
are corrected BY ANNOTATION BESIDE THE AS-FILED FORMS**, at that file's spec-gate pass or this one's, **never by
rewrite** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE, cited by row name). **This file is the successor's
contract; the held file is its predecessor and its provenance.**

**⟶ EVERY LANDED ROW THIS FILE DERIVES FROM IS CITED BY ROW NAME, NEVER RESTATED** — the ledgers are appended-to and
their line anchors drift. **The set, named once so a reader can complete it without assembling it:
`FOUR-TIER-DATA-OWNERSHIP-MODEL`** (its clause (1) alone: the four tiers and their scope) **·
`QUALIFIED-READ-MERGED-READ-SUBTREE-EVENTS-AND-THE-PURITY-CRITERION`** (its clause (2)'s merged read, the subtree rule and the
one-envelope event surface, and its clause (1)'s qualifier-only rule) **·
`NEXT-SURVIVING-REPAIR-LANDING-AS-A-TABID-INSTANCE-PER-REFERENCE-CLEAR-EVENTS-DOWNWARD-REMOVAL-THE-REFERENCE-SET-CROSSING-AND-THE-CRITERION-AS-A-PLACEMENT-RULE`**
(its `R3-1` zero-active selection, its `R3-3` one-event-per-affected-reference rule, its `R3-6` downward removal and its
ordered-reference-set crossing) **· `R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET`**
(the scope ruling this amendment's walk depends on) **· `FOUNDATION-STORE-FACILITY-IS-OPENED-AND-SUPERSEDES-NO-FOUNDATION-CONFIG-FILE-FACILITY`**
(with `NO-FOUNDATION-CONFIG-FILE-FACILITY`'s clauses 2/3 surviving) **· `E10-SINGLE-SINK-CHANNEL`** **·
`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** **· `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** **·
`SHELL-CHROME-PANES-ZONES-IN-SCOPE`** (with `S-d11`) **· `ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`**
**· `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** **· `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** **·
`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`** **· `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** **· `AUTONOMY AFTER SPEC APPROVAL`.**
**No clause of any of them is restated here; where one is needed it is cited by name and the clause is read at its own
row.**

**CITE SECTIONS AND ROW IDS, NEVER LINE NUMBERS, OF ANY FILE; BYTES BY `file:symbol`.** **THIS SPEC CARRIES NO LENGTH
CENSUS OF ANY FILE and makes no timing figure of any kind.**

**LAYER LABELS (`RCA-12`), binding on every behavioural claim below:** **[T]** node suite / pure module · **[H]** this
repo's `src/**` · **[U]** the real-DOM `ui` leg · **[D]** the divergence leg · **APP** the assembled app.

---

## CURRENT STATE (2026-10-01) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end note —
the placement the sibling specs use.)** **This block is the FILING-TIME state, and it is the whole of it:**

1. **THE FILING STATE, HONESTLY. NOTHING IS IMPLEMENTED, NO TEST IS AUTHORED, NOTHING IS GREEN.** This pass wrote
   **exactly ONE NEW FILE — `docs/specs/store-core-graph.md` (this contract), whose `§6` carries the STEP-0 dossier block
   the record's `§5`(c) owes** — and **edited NO existing file**: not `docs/specs/store-core.md`, not its dossier, not the
   proposal, not the record, not `docs/specs/data-ownership-model-plan.md`, not any tracker, not any sibling spec, not
   `AGENTS.md`, not `package.json`, not a script and not a config. **The modules (`src/renderer/store-core-graph.ts` and
   `src/renderer/store-graph-references.ts`), the test file (`tests/store-core-graph.test.ts`), the red set, the legs, the
   register's EXECUTED layer, the greens set, the gate records and the DONE row ALL DO NOT EXIST YET.** The unit is
   **`OWED` at every gate after this one, and it is NOT delegable until a TestWriter has RUN and REPORTED the red set**
   (`AGENTS.md` item 9).
2. **THE SURFACE THIS FILING PINS (nothing of it exists yet):** a **NEW `src/renderer/store-core-graph.ts`** exporting
   **`TWO` runtime value exports and `TWENTY-SEVEN` type declarations = `TWENTY-NINE` exported names** (`§2.1`), plus a
   **NEW `src/renderer/store-graph-references.ts`** holding the register's caller-declaration input and its type
   (`§2.1` item 3, `§2.4` item 8). **No existing file moves, and no held file is imported** (`§2.1` item 2). **A third
   module home for the graph, the register or the two caches is NOT taken** (`DR-13`(a) as a working default, `§7a.1`
   item 9).
3. **THE REGISTER (`§5.5.1`): `21` typed rows — `13` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP` — `389` declared attempts,
   printed WITH their twenty-one terms and with a term-by-term addition at `§5.5.3`**, **`21` strategy ids
   (`S-GR-*`), one pinned-seed generator (`S-GR-TOTAL-1`, seed `20261002`, one LCG step per draw, `pool.length = 22`)**,
   and **`2` rows carrying a `(bounded)` marking**. **The caps are compared against the DECLARED figures: `389 ≤ 400`;
   per-row maximum `36` (`P-GR-IM-2`) ≤ `100`.** **The row count is an OUTCOME, not a budget.**
4. **THE LEGS THIS UNIT DECLARES (none run): `npm test` `[T]`** — the whole of this unit's green — plus
   `npm run typecheck` `[H]` (`src/**` ONLY; it never reads `tests/**`), `npm run build` `[H]`, **`npm run typecheck:tests`**
   (the ADDITIVE fourth leg that is the only leg compiling `tests/**`), plus a **standalone strict `tsc --noEmit` over this
   unit's own test file** (`§5.2`). **NO `[U]` ROW IS OFFERED and `[D]` IS NOT CLAIMED** — both refusals are three-part
   (`§5.2` items 2/3).
5. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no read-only PBT audit,
   no blind-greens record, no per-unit documentation review and no DONE row (`§5.3` fixes its shape). **GATE 6 IS
   `STRUCTURAL`, NOT `waived` — the word `waived` may not be substituted for it** (`§5.2` item 3).
6. **THE `user-flow-audit.md` `§7.1` PREDICATE IS DETERMINED AS NOT TRIGGERING, RECORDED, AND NO REPORT IS DUE.**
   **The determination, in the predicate's own terms: no admitted unit authors a rendered surface.** This unit authors
   **no element, no envelope node, no handler body, no component binding and no control** — so **limb A is absent** — and
   **a store traversal, a register, a cache and a collector change no user-visible flow** — so **limb B is absent**.
   **The admissible form is NO report: a zero-row report is INVALID** (`user-flow-audit.md` `§7.1`; the record's `§7`).
   **A pass that files a zero-row `§5.U` report for this unit has failed this item.**
7. **THE OPEN DECISION REQUESTS THIS FILING RAISES, AND NOTHING ELSE BLOCKS** (`§7a.1`): **eleven** items, each with a
   working default implemented in `§2` and a recommendation so the red set is authorable today. **A later pass that
   changes one MUST open a gate.** **None is `undefined-until-answered`, and none blocks the spec gate** — the record's
   `C-1`…`C-9` are contract-content, values, filing and tracker conditions, and this file discharges the contract-content
   ones.
8. **THE TRACKER RESIDUES THIS FILING LEAVES** (the supervisor's to flip, because this pass edits NO existing file):
   `docs/next-steps.md`'s row **`G1`** still reads its spec cell as `OWED — not filed`; the ledger stays
   **`21 DONE / 3 open` UNITS = `24`** **unmoved**; **`RCA-8(f)` is satisfied and not breached — the architect admits
   ROWS, not a pass, and this pass writes no row.** **No count moved anywhere.**
9. **`docs/skills/designing-pages.md` DOES NOT EXIST** (`docs/skills/*` holds `process-guardrails.md` alone — globbed
   this pass), so **there is no test-use-case coverage matrix and no demo-page index to update** — and **this unit renders
   no page and authors no page design** (`§3.4 R-9` is the probe that keeps that claim falsifiable; `§5.2` item 3).
10. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **One file written, zero files edited, no test run, no leg
    run, no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, no `git` command, no commit.** The
    new file is **untracked and must be committed by the supervisor** (`RCA-8(a)`'s per-gate commit rule; `RCA-8(c)` — it
    is a NEW file).

**⟶ THE DATED RULING NOTES THIS FILING ADDS (2026-10-01).** **(1) The `R-9` SCOPE RULING LANDS.** The ACTIVE row
`R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET` is in force; its
decision row is filed and this contract is the artifact that carries its consequences, **its positive control is
RE-POINTED so that it is not vacuous** (`§3.4 R-9`, `§5.5.1` `P-GR-TP-2`). **(2) THE HELD CONTRACT'S FATE IS RECORDED
ABOVE: RE-FILED, SUPERSEDED-BESIDE, MARKER OWED TO ANOTHER PASS.** **(3) THE HELD DOSSIER IS REUSED, cited by path and
amended in place at the spec-gate pass** — its `A-6`/`A-7`/(`A-8`) re-statuses and its `R-9` collision reconciliation are
**authored at `§6` of THIS FILE BY ROW ID** (`§6` item 3). **(4) THE HELD REGISTER'S ARITHMETIC IS NOT INHERITED: this
file's register prints every total WITH its terms and re-derives every carried term** (`§5.5.1`, `§5.5.3`).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.**

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **the graph is the SOURCE OF TRUTH, with internal caching for traversal speed** — the record's `§5`(c) determination and the proposal's `§0.4` `A-A` | `§1` item 1, `§2.1` item 1, `§2.2` `P-1`, `§2.5`, `§3.3 I-1` |
| **2** | **ANCHORS ARE IMMUTABLE; RE-PARENTING = DELETE THE ANCHORS AND MINT NEW ONES** (the proposal's `§0.4` `A-F`) | `§2.2` `P-2`, `§2.3` item 4, `§2.7` item 5, `§3.2 F-6`, `§3.3 I-2` |
| **3** | **A DOTTED NAME IS AN ADDRESS** — register → top-level node → anchor → link → target; **the tier token is a FILTER, not part of the name**, and **the leaf node stores its OWN LOCAL NAME** (the proposal's `§0.4` `A-D`) | `§2.3` items 1/2, `§3.1 M-1`/`M-2`, `§3.2 F-1`…`F-5` |
| **4** | **A FAILED RESOLUTION RETURNS A VERBOSE PER-STEP DIAGNOSTIC NAMING THE FAILING STEP** (the architect's four named cases: no registered top-level name · no such anchor/property · no such leaf · no leaf with the requested tier) | `§2.3` item 6, `§2.4` item 7, `§3.2 F-1`…`F-5`, `§5.5.1 P-GR-TP-1` |
| **5** | **THE GRAPH IS A TREE BY CONSTRUCTION** (one parent link per node) **AND A SEGMENT IS DATA** — never coerced, never a prototype key (`'__proto__'` / `'constructor'` / `'toString'` are ordinary strings) (the record's `§2`; the proposal's `DR-4` ruling) | `§2.2` `P-3`, `§2.3` item 3, `§3.3 I-2`, `§3.4 R-2`, `§5.5.1 P-GR-IM-2`/`P-GR-TP-2` |
| **6** | **TIERS COMPOSE, UNDER A PER-`(LOGICAL PATH, TIER)` UNIQUENESS CONSTRAINT** — two holders may coexist across tiers; **at most one node per pair**; a repeat is **an edit to the existing node or a loud failure, per call params**; **THE MERGED READ AND ITS `parts` SURVIVE** (the record's `§2`(3), the proposal's `DR-11` ruling) | `§2.3` item 5, `§2.5` item 4, `§2.7` item 4, `§3.1 M-6`, `§3.2 F-6`, `§3.3 I-3`, `§5.5.1 P-GR-IM-3` |
| **7** | **TWO CACHES** — the register's and per-link — **each a `name → lowest-durability match` dictionary, INVALIDATED BY ANY REGISTER CHANGE OR ANY CHANGE TO A LINK'S ANCHOR SET** (the proposal's `§0.4` `A-F`) | `§2.6` items 1/2/3, `§3.4 R-5`, `§5.5.1 P-GR-IM-5`/`P-GR-TP-2` |
| **8** | **CAPS LIVE ON THE TOP-LEVEL REGISTER; REACHABILITY COLLECTS WITHIN THE GRAPH** (the proposal's `§0.4` `A-G`) | `§2.4` items 6/7, `§2.7` item 6, `§3.2 F-18`…`F-20`, `§5.5.1 P-GR-TP-4` |
| **9** | **A COMMIT TO A HIGHER TIER REGENERATES THE WHOLE SUBTREE AS A TRANSACTION: BUILD → COMPARE CENSUS → DELETE THE ORIGINAL ONLY ON A MATCH**; a mismatch is **a declared failure that leaves the original alive**; `N` affected references, **one receipt row per reference**, **one crossing per ordered reference set**, **the per-affected-reference event rule unchanged** (the proposal's `§0.4` `A-E`) | `§2.5` item 5, `§2.8` items 5/6/7, `§3.1 M-11`…`M-13`, `§3.2 F-9`/`F-10`, `§5.5.1 P-GR-SM-1` |
| **10** | **A SEVERED `file`-TIER NODE IS DELETED; THE FILE IS WRITTEN BY TRANSLATING THE GRAPH TO STABLE JSON** (the proposal's `§0.4` `A-B`) | `§2.7` item 7, `§2.8` item 8, `§2.9` item 6, `§3.1 M-14`, `§3.2 F-11`, `§5.5.1 P-GR-TP-6` |
| **11** | **NO PIN SET** — it is DELETED, not carried; **A WRITE TO AN ORPHANED REFERENCE FAILS, LOUDLY**, as a returned record (the proposal's `§0.4` `A-C`) | `§2.3` item 6 arm (vii), `§2.7` item 6, `§3.2 F-7`, `§3.3 I-6` |
| **12** | **`secure` IS A SEPARATE MAIN-SIDE COLLECTION**, refused **BY NAME, BEFORE THE REGISTER IS CONSULTED AND BEFORE ANY TRAVERSAL** | `§2.3` item 1, `§2.4` item 5, `§3.2 F-15`/`F-16`, `§5.5.1 P-GR-TP-5` |
| **13** | **`R-9`'s SCOPE IS RULED** (row `R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET`): the clause bans a **GLOBAL engine-id-keyed map**, **not** a per-link, caller-keyed, walk-gated target set; **its no-counter / no-UUID half STANDS and binds the store-minted handle's minting** (working default `§7a.1` item 8) | `§2.2` `P-8`, `§2.4` item 2, `§3.4 R-9`, `§5.5.1 P-GR-TP-2`, `§6` item 3 |
| **14** | **THE HELD CONTRACT'S FATE: RE-FILE, SUPERSEDED-BESIDE, NEVER RE-GRAINED** (the record's `§4`/`§7`) | `CURRENT STATE` (this file's opening), `§8` item 1 |
| **15** | **THE HELD DOSSIER IS REUSED, CITED BY PATH, AND AMENDED IN PLACE AT THE SPEC-GATE PASS** (the record's `§5`(c)) | `§6` items 2/3 |
| **16** | **THE STEP-0 TRIGGER DOES NOT FIRE, AND A ZERO-ROW DOSSIER WITH A WRITTEN RATIONALE IS OWED** (the record's `§5`(c)) | `§6` item 1 |
| **17** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` + `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` + `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` + `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** — the register is MANDATORY **before** the red set; the zero-row exemption is **not available** here; **a declared term is a DRIVE count**; **the total is printed WITH its terms** | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` item 10 |
| **18** | **`AUTONOMY AFTER SPEC APPROVAL`** — after the spec gate the chain proceeds without further permission; **the spec gate is the one approval the chain waits for** | `§4.5`, `§5.3` |
| **19** | **`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** — the family's OPACITY DISCIPLINE with the no-reach clause: **no parameter through which a coordinate, a magnitude or an element reach could arrive** | `§2.2` `P-9`, `§3.4 R-7`, `§5.5.1 P-GR-TP-5` |
| **20** | **`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`** — **THE STORE REFUSES NAMES, TIERS AND CAPS; IT NEVER REFUSES SIZES** | `§2.2` `P-6`, `§3.4 R-7` |
| **21** | **`E10-SINGLE-SINK-CHANNEL` / `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4` / `SHELL-CHROME-PANES-ZONES-IN-SCOPE` (with `S-d11`)** — cited **by row name only**: this unit ships **no** sink, **no** gesture, **no** session member, **no** element and **no** geometry claim, and adds nothing to any frozen surface | `§2.2` `P-4`/`P-10`/`P-11`, `§3.4 R-8`/`R-10`, `§8` item 12 |

**Where the record, the proposal or a step report corrects a citation, this filing obeys the correction** — the corrected
site is cited, never the transcription that was corrected. **The known corrections, named so no reader re-derives them:**
the held register's **declared row count** (`20`, with its `11 + 1 + 8` split and the non-existent `P-SC-TP-8`) against
its **own table's rows** (`13 + 1 + 7 = 21`), and its **term table's coverage** (`20` terms for `21` rows) — **both
annotated beside the as-filed forms and neither inherited**; the proposal's own `§12` headline arithmetic (a summary that
does not sum) — **step 3's finding, carried and not re-derived**; and the `[H]` fact that `src/renderer/runtime.ts`
`:loadEnvelope` / `:loadDoc` tear the graph down and build a new `Supervisor` while `:tearDownGraph` never calls
`Supervisor.dispose()` — **carried as the retention record's `RH-1` reading, with `RH-5` for the never-released root,
and NOT re-measured by this pass.**

### 0A. The dated ruling notes — the clauses the record leaves to a working default (RULED here as REVERSIBLE DEFAULTS, 2026-10-01)

**What this subsection is, and what it is not.** The record is **contract-exact** about the conditions `C-1`…`C-9` and
about the nine contract-content `DR-*` items; what it does **not** do is write the clause. **This filing DECIDES each of
those clauses HERE, AS A WORKING DEFAULT**, each with its reason and its landing site, **and every one is recorded as
REVERSIBLE at `§7a.1` with the alternative and its cost named — exactly as the held contract recorded its six.** **No note
below weakens a ruling, a condition or a prohibition row.**

**Note 1 — the two module paths, and why the successor needs a second file at all.** **No source names the successor's
paths.** **RULED: the STORE is `src/renderer/store-core-graph.ts` and the register's caller-declaration INPUT is
`src/renderer/store-graph-references.ts`** — both verified free 2026-10-01 (`src/**/store*` matches no file;
`tests/store*` matches no file). **The second file is not decoration: it is what keeps the store's own bytes free of the
caller's spellings, and what lets the register have a declared-but-cold row without a second declaration surface
(`§2.4` item 8).** **The held `src/renderer/store-references.ts` is NOT reused and NOT edited** — it is the held model's
declaration table, and this unit neither imports it nor moves a byte of it (`§5.1`'s DENIED set).

**Note 2 — where the graph, the register and the two caches live (the record's `DR-13`, resolved as a working default).**
**RULED: ONE renderer-realm module owns all four — `src/renderer/store-core-graph.ts`.** **The census, stated in full: two
modules exist in this unit's diff, and `store-core-graph.ts` carries EXACTLY TWO import statements — `./store-graph-references.js`,
and NOTHING ELSE at run time.** **No new module is created for the graph, the register or the two caches, and the fork's
moving set and the plan's re-vendor identity `15 = 2 + 6 + 7` are therefore untouched.** **Why the realm is FORCED rather
than chosen:** the graph's nodes are **live object references**, the register row's handle is a live value, and a graph
spanning two realms is unimplementable for the reason `docs/specs/store-core.md` `§0A` note 1b records for `cache`
(`docs/specs/mcp-endpoint.md` `P-E6`) — **so the graph is renderer-realm and `secure` stays main-side, which is what the
directive's *"separate collection"* asks for anyway.**

**Note 3 — the two-run store-state-independence row is SATISFIABLE AS LANDED, and the reason is the rebuild's SITE.**
The held row `docs/specs/store-core.md` `§5.5.1` `P-SC-IM-11` requires a call's answer to be **identical across two runs
whose only difference is the store's tier state**. **A read that rebuilds a cache entry is still a function of its
arguments iff the rebuild is deterministic in the graph state — which `§2.6` item 2 makes it (the entry is the
lowest-durability match, computed from the graph, with no clock, no counter and no insertion time).** **But the row's own
TWO RUNS could still differ in the cache's STATE after the first run**, which is why `§2.6` item 4 puts the rebuild **at
the invalidation site and never on the read path**: **the read is then side-effect-free over derived state, which is the
posture two landed rows pin** (the held `§2.9` item 3: *"`read` is UNCAPPED: a read never changes a count and can never
overflow"*; the plan's `§4.3` hop 1: *"a read fires nothing"*). **The row is NOT re-derived and NOT relaxed — it is
satisfied, and `§3.4 R-6` is the successor's own form of it.**

**Note 4 — the flag's declaration site is `commit` (the record's `DR-1`(iii), resolved as a working default).** **The
architect's four-step walk makes the flag *"the property it looks for"*, and the regeneration transaction is the one
operation that RE-TIERS a node — so the flag's minting site and the transaction's site are ONE.** **RULED: `commit` MINTS
a node's `type` (a missing node) and RE-MINTS it (an existing node, by regenerating the whole subtree). `set` NEVER mints
a node and NEVER changes a flag; on a path with no node it is REFUSED `'undeclared-name'`** — **because a `set`-supplied
flag would be a flag the caller declares, and *"a flag nobody declares is a default"*, which the held `docs/specs/store-core.md`
`§2.2` `P-2` closes.** **The surface that carries it: `commit(name, value, opts?)` — the minting operation's own
signature, with NO flag parameter.** **The flag is `GraphTierName`, and it is set ONCE per node generation.**

**Note 5 — the register's row shape is PURELY DERIVED PLUS A DECLARED-ROW INPUT (the record's `DR-1`(i)/(ii) and `DR-9`,
resolved as working defaults).** **RULED: (a) the register is a PROJECTION of the graph's parentless nodes AND of the
caller's declared rows; (b) a declared row with no node is the COLD ITEM and is `derived:false`; (c) resolution of a cold
item is the DECLARED MISS, not a refusal** — **which is the held `docs/specs/store-core.md` `§3.2` `F-9` control,
preserved at top level and therefore still decidable.** **The alternative — a purely graph-derived register — is recorded
at `§7a.1` item 5 with its cost: it would re-home the held declared miss onto a node that does not exist, and the `F-9`
control would lose its subject.** **The register's REFUSED SET is closed at `§2.4` item 5 (six construction-time arms) and
its write-side mapping is `§2.4` item 7.**

**Note 6 — the tier-side caps are SUPERSEDED BY RELOCATION, and the two cap families must not be confused.** **The held
`docs/specs/store-core.md` `§2.9`'s `CAP-1`/`CAP-2`/`CAP-3` bound tier-side quantities (a `mem` collection's element
count; the `temp` entry count; the amplifier-form subscription count). The amendment's `RCAP-1`/`RCAP-2`/`RCAP-3` bound
REGISTER ROWS (`§2.4` item 6), and the held `'cap-exceeded'` token KEEPS A REFERENT because the register is where the
top-level names are counted.** **RULED: the register-side caps are the live caps for this model; the tier-side `CAP-*`
figures are CITED as the working values' provenance and are NOT re-declared as live caps of this contract** — **so no row
of this file may assert a tier-side element count, and the two families never appear in one row.** **`RCAP-3` is the one
figure the record calls the LEAST re-derived** (the held `CAP-3` already counts subscriptions), **and it is declared here
unchanged in shape: an EXACT-reference subscription is NEVER capped.**

**Note 7 — the export's authority status is inherited, and its crossing rule is LOCAL-ONLY.** **RULED: the multi-level
export is a SNAPSHOT — a fresh object per call, NON-AUTHORITATIVE, recomputed on every read — which reuses the status the
held model already declares for its one composite (the held `docs/specs/store-core.md` `§2.5` item 5: *"NON-AUTHORITATIVE —
no tier holds it, it is recomputed on every read"*; the record's `§10` `R3` risk).** **AND: THE EXPORT IS LOCAL-ONLY AND IS
NOT REQUIRED TO SERIALIZE** — the directive's own words are *"for local use within a function"* — **so an export MAY NOT
carry a live `cache` handle beyond its caller and may not be claimed to cross an IPC boundary; the crossing form is the
named escalation if a host caller ever needs it** (`§2.9` item 7, `§3.4 R-8`).

**Note 8 — the store's own construction and ownership, stated once.** **The renderer's wiring creates EXACTLY ONE graph
store per realm, at boot, before the first `Y-1` hand-off, and holds it in the wiring's own closure or a realm-scope
binding owned by the wiring — NEVER in a module-level binding inside `store-core-graph.ts`.** **A second construction is
caught by the ROW that counts constructions, not by a silent second authority.** **The store is TOTAL and never refuses
construction: the only throws in the whole unit are the factory's LOAD REFUSAL for a malformed declared-row input (a
`GraphLoadError`), and the two test-seam throws** (`§2.2` `P-5`).

**Note 9 — the reference segment's own string operations are the held list, unchanged.** **The store's whole string
processing stays at the held four: a `typeof`/length check, `name.split('.')`, a whole-segment equality, and a
whole-logical-path equality.** **No trim, no lower-case, no prefix match, no suffix match, no `includes`, no sort, no
dedupe, no re-key, no numeric coercion** — **which is what makes `§2.2` `P-3` (segments are data) checkable rather than
assumed, and what makes the anchor key, the leaf's local name and the register row's spelling all the SAME kind of thing:
the caller's own string, carried verbatim.**

---

## 1. Scope

**One deliverable: the amended model, in one renderer-realm module pair — a node-anchor-link graph that IS the source of
truth, a top-level register projected from it with its own caps, a resolution walk with a per-step diagnostic, two
caches with an exhaustive invalidator set, a per-`(path, tier)` uniqueness constraint, a regeneration transaction, a
severance with its own arm and release rule, a stable-JSON translation, and a non-authoritative multi-level export.**

1. **What the unit is, in one sentence.** The successor contract for the amended store architecture: **the graph as the
   single residency authority** (one `type` flag per node), **the tier token as a filter** applied by a walk whose every
   failure arm names its own step, **the register as the graph's top-level projection with caps**, **the two caches'
   invalidator set and rebuild site**, **the per-`(path, tier)` uniqueness constraint with its two declared outcomes**,
   **the subtree-regeneration transaction with its census match and its declared failure**, **the `severed` event arm
   with its subscriber-release rule**, **the stable-JSON translation's rules**, and **the export's snapshot and
   local-only crossing rule**. **It is ONE CONTRACT and ONE RED SET: no second core pass is declared.**
2. **What the unit is NOT — no policy default, no second authority, no consumer vocabulary.** **No registered default is
   invented; a miss is a miss. No segment is interpreted, coerced or re-spelled. No store-side clamp exists: THE STORE
   REFUSES NAMES, TIERS AND CAPS, NEVER SIZES.** **No `is-*` literal, no consumer noun as the store's own vocabulary, no
   unit string, no element-id key** (`§2.2` `P-1`…`P-3`, `P-6`, `P-8`…`P-10`).
3. **What the unit is NOT — no MCP surface, no new seam, no frozen-surface change.** **No tool, no resource, no
   `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method, no preload member, no
   `scripts` key and no config change** (`§2.2` `P-4`), **and no member is added to `docs/specs/gsession.md` `§2.5`'s
   frozen delegate surface** (`§2.2` `P-11`).
4. **What the unit is NOT — nothing of the held file's bytes moves, and nothing of the held file is imported.** **The held
   `docs/specs/store-core.md` keeps its bytes; its register is never re-grained; its red set is never authored; and this
   unit's two modules import NEITHER it NOR `src/renderer/store-references.ts`.** **Every held type this contract needs
   is RE-DECLARED in this file's own `§2.1` block, under a name that does not collide with any held name** (`§5.1`).
5. **What the unit is NOT — no UI, no geometry, no rendered surface.** **It authors no element, no text, no class, no
   attribute, no stylesheet and no control, and reads no coordinate, rect, computed style or clock.** **Therefore gate 6
   is `STRUCTURAL`** (`§5.2` item 3) **and the `user-flow-audit.md` `§7.1` predicate does not trigger** (`CURRENT STATE`
   item 6).
6. **What the unit is NOT — no persistence of its own and no channel.** **The store owns no file, no `fs`, no atomic write,
   no recovery and no tombstone.** **What crosses the channel is the TRANSLATION (`§2.9` item 6), and the channel is
   `U-STORE-PERSIST`'s; this unit drives it through a declared, STUBBED `crossing` seam and asserts NOTHING about it.**
7. **What is EXPLICITLY OUT of scope (do not do in this unit).** The tier-1 channel's atomic write, `fsync`, `.tmp`/rename
   discipline, recovery and `Y-3` push (`U-STORE-PERSIST`); tier 4's own API, its re-home and its receipt
   (`U-STORE-SECURITY`); the settings schema version and the migration; the tabs/focus slice's declaration rows and its
   two authored pages (`U-STORE-FOCUS`, a PROPOSAL); the rendered tab strip (`U-STORE-TABS-STRIP`, a PROPOSAL); the
   fifteen modules' store obligations (`U-STORE-MODULES`, a PROPOSAL); any `docs/skills/designing-pages.md` update — **the
   file does not exist and this unit renders no page**; and the held file's own arithmetic annotations (owed, routed,
   authored elsewhere).
8. **What the unit may land.** **`src/renderer/store-core-graph.ts` (NEW) ·
   `src/renderer/store-graph-references.ts` (NEW) · `tests/store-core-graph.test.ts` (NEW) · this spec (which carries its
   own STEP-0 dossier block at `§6`) · the unit's own `*-greens.md` · the unit's own `§3a`/`§3b` findings and tracker
   rows.** **NO edit to the held contract, the held dossier, the proposal, the record, `docs/next-steps.md` counts, any
   sibling spec, `AGENTS.md`, `package.json`, a script or a config.** **`src/shared/**` and the vendored tree stay
   BYTE-IDENTICAL.**
9. **The value is a FACILITY'S CONTRACT, and the honest cost is stated.** **This unit ships modules imported by the
   renderer wiring and by nothing else** — so its green is **envelope/pure-layer evidence that the contract holds for a
   driven in-realm graph store**, never that the app behaves differently. **The honest cost**: this spec + a **21-row**
   register + red/green **with remands** + the adversarial pass and read-only PBT audit + blind greens + the per-unit
   documentation review + a DONE row + per-gate commits.
10. **The one thing this contract explicitly does NOT do:** **it makes no claim about the tier-1 channel's behaviour, the
    migration, the security tier's own API, the fork's tree, or any rendered surface.** **Those are other units', and a
    clause of this file read as reaching them is a finding against this file.**

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and throw pattern

**Two NEW modules, and an import census that is EXACT and TOTAL.**

1. **`src/renderer/store-core-graph.ts` — THE STORE.** It carries **exactly TWO import statements**:
   **(a)** `./store-graph-references.js`, **for the register's caller-declaration input and its row TYPE**; and
   **(b)** **NOTHING ELSE.** It imports **no `provident-ssr`**, **no `electron`**, **no `node:*`**, **no `src/main/**`**,
   **no `src/shared/**`**, **no sibling mechanism module**, **and not the held `store-core.js` or the held
   `store-references.js`.** **Every held type it needs is RE-DECLARED in this block** (`§1` item 4).
2. **`src/renderer/store-graph-references.ts` — THE INPUT.** It holds the **register's caller-declaration input** (the
   declared top-level rows and, where a caller wants one, a reserved flag) and **its own row type**. **Its export census
   is `ONE` value export (`storeGraphReferences`) plus `THREE` type declarations (`StoreGraphDeclarationRow`,
   `StoreGraphDeclarationInput`, `StoreGraphReferenceFixture`)** — **and it imports nothing but its own types.**
   *(`StoreGraphReferenceFixture` is the TEST-ONLY fixture type carried by this unit's own test file; it is declared here
   so the fixture's shape is contract-exact rather than invented at the test site.)*
3. **The export census of `store-core-graph.ts`, stated before the block so that it MUST AGREE with it: `TWO` runtime
   value exports and `TWENTY-SEVEN` type declarations = `TWENTY-NINE` exported names.** **The two halves are counted
   separately on purpose**, because a type declaration is erased at run time, so a single *"29 exports"* claim would be
   half-unfalsifiable.
   **(a) THE TWO RUNTIME VALUE EXPORTS — exactly `createGraphStore` and `createGraphStoreError`.**
   **(b) THE TWENTY-SEVEN TYPE DECLARATIONS — exactly `GraphTierToken` · `GraphNodeFlag` · `GraphRefusalReason` ·
   `GraphResolveStep` · `GraphResolveDiagnostic` · `GraphNodeRef` · `GraphNode` · `GraphAnchor` · `GraphLink` ·
   `GraphTierHandle` · `GraphRegisterRow` · `GraphRegister` · `GraphRegisterCacheEntry` · `GraphLinkCacheEntry` ·
   `GraphConstraint` · `GraphPart` · `GraphReadHit` · `GraphReadMiss` · `GraphMergedRead` · `GraphResolveResult` ·
   `GraphWriteReceipt` · `GraphWriteOptions` · `GraphEvent` · `GraphSubscription` · `GraphCrossing` · `GraphStore` ·
   `GraphLoadError` — **and NOTHING ELSE.** `createGraphStore`'s option record, the tier-local get result, the write
   receipt's `rows[]` pair and the write-side refusal record are **INLINE structural types, NOT named exports.**
   *(`createGraphStore` and `createGraphStoreError` are the two value exports and are NOT counted again among the
   twenty-seven; the four inline shapes are deliberately unnamed so the type half stays countable BY NAME.)*
   **⟶ THE ARITHMETIC, PRINTED WITH ITS TERMS, so a reader can check the census cell against the block beside it: the
   three domain types (`GraphTierToken` · `GraphNodeFlag` · `GraphRefusalReason`) · the six graph-structure types
   (`GraphNodeRef` · `GraphNode` · `GraphAnchor` · `GraphLink` · `GraphTierHandle` · `GraphCrossing`) · the four
   register-and-cache types (`GraphRegisterRow` · `GraphRegister` · `GraphRegisterCacheEntry` · `GraphLinkCacheEntry`) ·
   the one constraint type (`GraphConstraint`) · the one provenance pair (`GraphPart`) · the three read-result shapes and
   their union (`GraphReadHit` · `GraphReadMiss` · `GraphMergedRead` · `GraphResolveResult`) · the walk's own two
   (`GraphResolveStep` · `GraphResolveDiagnostic`) · the event envelope and its subscription (`GraphEvent` ·
   `GraphSubscription`) · the write receipt and its options, and the store and the load error (`GraphWriteReceipt` ·
   `GraphWriteOptions` · `GraphStore` · `GraphLoadError`) = **`3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 = 27` slots, and the block
   declares exactly `27` distinct named exports — so THE DECLARED COUNT IS `27` AND `3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 =
   27` ✓, every slot printed WITH its term.** **The as-filed `TWENTY-ONE` figure in this block's own opening sentence is
   therefore CORRECTED to `TWENTY-SEVEN`, kept visible rather than silently rewritten (`S-3`'s own remedy), and the
   census cell, the block and the DONE row's item 3 must all print `TWO + TWENTY-SEVEN = TWENTY-NINE` exported names.**
   **A row asserting a COUNT without NAMING the names FAILS.**
4. **THE TIER TOKENS ARE NOT EXPORTED NAMES.** `GraphTierToken` is a **closed union type**, and the tokens themselves are
   **literals inside that union** — **so a row that reads the namespace's value keys and finds a `tier` constant object
   FAILS.** **The set the contract pins is named here so it is falsifiable: `'temp'` · `'mem'` · `'file'` · `'secure'`,
   EXACTLY four, case-sensitive.** **`GraphNodeFlag` is `'temp' | 'mem' | 'file'` — three members, because a
   `secure`-flagged node never appears in the register or the traversal** (`§2.4` item 5).

```ts
/* ───────────────────────────── THE CLOSED DOMAINS ───────────────────────────── */

/** THE FOUR TIER TOKENS — the name's CLOSED first-segment domain, CASE-SENSITIVE (§2.3 item 1).
 *  'secure' is a LEGAL PREFIX and is REFUSED by every generic operation, BEFORE the register and BEFORE any traversal. */
export type GraphTierToken = 'temp' | 'mem' | 'file' | 'secure'

/** THE FLAG A NODE CARRIES — THREE members. The tier token is the FILTER; this is the ONLY residency carrier. */
export type GraphNodeFlag = 'temp' | 'mem' | 'file'

/** THE CLOSED REFUSAL-REASON UNION — EIGHTEEN members, and this contract CLOSES it.
 *  A reason is a RETURNED RECORD MEMBER; it is NEVER a throw (§2.2 P-5).
 *  The EIGHT held members (cited, not restated) are 'undeclared-name' · 'malformed-name' · 'secure-refused' ·
 *  'reserved-name' · 'malformed-pattern' · 'cap-exceeded' · 'ambiguous-path' · 'reserved-namespace'.
 *  The FIVE this amendment adds are: 'duplicate-path-tier' (§2.7 item 4) · 'no-such-anchor' (§2.3 item 6 (ii)) ·
 *  'severed-link' (§2.3 item 6 (v)) · 'rebuild-failed' (§2.3 item 6 (vi)) · 'tier-filter-miss' (§2.3 item 6 (iv)). */
export type GraphRefusalReason =
  | 'undeclared-name' | 'malformed-name' | 'secure-refused' | 'reserved-name'
  | 'malformed-pattern' | 'cap-exceeded' | 'ambiguous-path' | 'reserved-namespace'
  | 'duplicate-path-tier' | 'no-such-anchor' | 'severed-link' | 'rebuild-failed' | 'tier-filter-miss'

/** THE WALK'S SEVEN STEPS, as an id the diagnostic can name (§2.3 item 6). */
export type GraphResolveStep =
  | 'A-PARSE' | 'B-SECURE-GATE' | 'C-TOP' | 'D-ANCHOR' | 'E-LINK' | 'F-CACHE' | 'G-RESOLVE-LEAF' | 'H-FLAG'

/** THE VERBOSE PER-STEP DIAGNOSTIC. `reason` names the failure's CLASS; `step` names WHERE it failed;
 *  `segment` is the caller's own segment that failed, or null where no segment failed; `owner` names the node
 *  the walk had reached, or null at step C. ABSENT-FRIENDLY: the record is returned ONLY on a refused resolution. */
export interface GraphResolveDiagnostic {
  readonly reason: GraphRefusalReason
  readonly step: GraphResolveStep
  readonly segment: string | null
  readonly owner: GraphNodeRef | null
}

/* ───────────────────────────── THE GRAPH ───────────────────────────── */

/** THE STORE-MINTED NODE HANDLE. A per-graph monotone string, minted by the store (§7a.1 item 8).
 *  IT IS NEVER LOOKED UP BY ANY PATH SEGMENT — the walk reaches a node through its ANCHORS and LINKS (§2.4 item 2). */
export type GraphNodeRef = string

/** ONE NODE. `flag` is the ONLY residency carrier and is set ONCE per generation (§7a.1 item 2).
 *  `localName` is the LEAF'S OWN NAME — never a stored dotted path (§2.3 item 2).
 *  `anchors` is a FROZEN array; `parentLink` is `null` for a top-level node and names the ONE link that reaches it. */
export interface GraphNode {
  readonly ref: GraphNodeRef
  readonly flag: GraphNodeFlag
  readonly localName: string
  readonly anchors: readonly GraphAnchor[]
  readonly parentLink: GraphLink | null
}

/** ONE NAMED PROPERTY SLOT. `key` is the CALLER'S OWN SEGMENT, carried verbatim (§2.2 P-3).
 *  ANCHORS ARE IMMUTABLE: there is NO anchor-mutation operation; re-parenting DELETES and RE-MINTS (§2.2 P-2). */
export interface GraphAnchor {
  readonly owner: GraphNodeRef
  readonly key: string
  readonly link: GraphLink | null
}

/** THE EDGE AN ANCHOR HOLDS. `to` is the store's own handle for the child; `cache` is THIS link's cache entry.
 *  A link whose `to` has been severed is NOT followable: it answers as a node holding no anchors and no targets. */
export interface GraphLink {
  readonly from: GraphNodeRef
  readonly to: GraphNodeRef | null
  readonly cache: GraphLinkCacheEntry
  readonly constraint: string | null
}

/** THE PER-TIER COLLECTION'S OWN HANDLE — a VIEW over the graph, membership by the node's own flag (§2.6 item 1).
 *  It is the SAME object each time it is read, so the held identity rule survives (§2.5 item 3). */
export interface GraphTierHandle {
  readonly tier: GraphTierToken
  get(name: string): GraphTierGetResult
  has(name: string): boolean
  set(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  clear(name: string): GraphWriteReceipt
}

/** THE TIER-LOCAL GET — a record for EVERY name, never a throw (§2.8 item 4). */
export interface GraphTierGetResult {
  readonly found: boolean
  readonly value: unknown
  readonly name: string
}

/* ───────────────────────────── THE REGISTER AND THE TWO CACHES ───────────────────────────── */

/** ONE REGISTER ROW — the register's OWN row shape, re-derived for this model (§2.4 item 1).
 *  `derived` is `false` exactly for a COLD ITEM (a declared row whose path holds no node). */
export interface GraphRegisterRow {
  readonly name: string
  readonly nodeRef: GraphNodeRef | null
  readonly constraintId: string | null
  readonly reserved: boolean
  readonly derived: boolean
}

/** THE REGISTER — the graph's top-level PROJECTION plus the caller's declared rows. Immutable view. */
export interface GraphRegister {
  readonly rows: readonly GraphRegisterRow[]
}

/** THE REGISTER CACHE ENTRY — a dictionary of `name → THE LOWEST-DURABILITY MATCH` (§2.6 item 1). */
export interface GraphRegisterCacheEntry {
  readonly name: string
  readonly matchedRef: GraphNodeRef
  readonly matchedTier: GraphNodeFlag
}

/** THE PER-LINK CACHE ENTRY — the SAME dictionary shape, scoped to ONE link (§2.6 item 1). */
export interface GraphLinkCacheEntry {
  readonly name: string
  readonly matchedRef: GraphNodeRef
  readonly matchedTier: GraphNodeFlag
}

/* ───────────────────────────── THE CONSTRAINT TABLE ───────────────────────────── */

/** ONE CONSTRAINT ROW — the held table's four columns plus its MATCHED SET (§2.8 item 9). */
export interface GraphConstraint {
  readonly id: string
  readonly kind: 'count-exactly-one' | 'unique-path-tier'
  readonly matchedSet: string
  readonly evaluatedOn: readonly ('set' | 'commit' | 'remove')[]
  readonly repair: 'next-surviving-by-order' | 'none'
  readonly onRepeat: 'edit' | 'refuse'
  readonly refusalReason: GraphRefusalReason | null
}

/* ───────────────────────────── THE READ AND THE WALK ───────────────────────────── */

/** A PROVENANCE PAIR: the TIER and THE PATH THAT TIER ACTUALLY HOLDS — never the read path (§2.5 item 4). */
export interface GraphPart {
  readonly tier: GraphNodeFlag
  readonly path: string
}

/** THE HIT. `cache` is the per-tier collection's handle — a VIEW, never a copy (§2.5 item 3). */
export interface GraphReadHit {
  readonly found: true
  readonly value: unknown
  readonly tier: GraphNodeFlag
  readonly cache: GraphTierHandle
  readonly name: string
  readonly merged?: undefined
  readonly parts?: undefined
}

/** THE DECLARED MISS — a cold item, or a resolved leaf that holds no value (§2.8 item 2). */
export interface GraphReadMiss {
  readonly found: false
  readonly value: undefined
  readonly tier: null
  readonly cache: null
  readonly name: string
  readonly merged?: undefined
  readonly parts?: undefined
}

/** THE MERGED ARM — no node holds the path, descendants do (§2.5 item 4). The merged read SURVIVES the amendment. */
export interface GraphMergedRead {
  readonly found: true
  readonly value: unknown
  readonly tier: null
  readonly cache: null
  readonly name: string
  readonly merged: true
  readonly parts: readonly GraphPart[]
}

export type GraphResolveResult = GraphReadHit | GraphReadMiss | GraphMergedRead

/** THE WRITE'S RECEIPT. `refused` carries a reason and NOTHING is mutated. `rows` is one row PER AFFECTED REFERENCE. */
export interface GraphWriteReceipt {
  readonly status: 'committed' | 'refused'
  readonly reason?: GraphRefusalReason
  readonly diagnostic?: GraphResolveDiagnostic
  readonly name: string
  readonly cleared: readonly string[]
  readonly repaired: readonly string[]
  readonly rows: readonly GraphAffectedRow[]
  readonly crossings: number
  readonly events: number
}

/** ONE ROW PER AFFECTED REFERENCE (§2.8 item 7). */
export interface GraphAffectedRow {
  readonly name: string
  readonly flag: GraphNodeFlag
  readonly nodeRef: GraphNodeRef
}

/** THE CALL PARAMS THAT ROUTE A REPEAT TO ONE OF ITS TWO DECLARED OUTCOMES (§2.7 item 4). */
export interface GraphWriteOptions {
  readonly onRepeat?: 'edit' | 'refuse'
  readonly onDuplicate?: 'edit' | 'refuse'
}

/* ───────────────────────────── THE EVENT SURFACE ───────────────────────────── */

/** ONE EVENT PER AFFECTED REFERENCE. The members are present AS KEYS on EVERY arm; the PER-ARM required set is the
 *  EIGHT-ROW TABLE (§2.10 item 2), which is THE TOTAL STATEMENT. */
export interface GraphEvent {
  readonly name: string
  readonly flag: GraphNodeFlag
  readonly value: unknown
  readonly cleared: readonly string[]
  readonly cause: 'set' | 'commit' | 'clear' | 'sweep' | 'remove' | 'repair' | 'descendant' | 'severed'
  readonly origin?: string
  readonly subtree?: true
}

export interface GraphSubscription {
  readonly name: string
  readonly subtree: boolean
  unsubscribe(): boolean
}

/* ───────────────────────────── THE SEAMS, THE FACTORY, THE STORE ───────────────────────────── */

/** THE TIER-1 CROSSING SEAM, INJECTED AND STUBBED. This unit declares it and asserts NOTHING about it.
 *  THE DEFAULT is a no-op recorder answering `{status:'committed'}`. */
export interface GraphCrossing {
  put(row: { readonly name: string; readonly value: unknown }): { readonly status: 'committed' | 'refused' }
}

/** THE LOAD REFUSAL — the ONE declared throw of the factory, for a declared-row input that does not load. */
export interface GraphLoadError extends Error {
  readonly reason: GraphRefusalReason
}

/** THE FACTORY. TOTAL: it NEVER returns a null/primitive for ANY argument. `{ declarations }` DEFAULTS to the empty
 *  input, so a store with no declared row is legal and every top-level item is minted by `commit`. */
export function createGraphStore(options: {
  readonly declarations?: StoreGraphDeclarationInput
  readonly constraints?: readonly GraphConstraint[]
  readonly crossing?: GraphCrossing | null
  readonly reservedNamespaces?: readonly string[]
  readonly enableTestSeam?: boolean
}): GraphStore

/** THE ONE EXPORTED ERROR CONSTRUCTOR — the error the factory throws for an input that does not LOAD. */
export function createGraphStoreError(message: string, reason: GraphRefusalReason): GraphLoadError

export interface GraphStore {
  /** THE WALK (§2.3). TOTAL: for every argument, a GraphResolveResult or a refusal RECORD. */
  resolve(name: string): GraphResolveResult
  /** THE GENERIC WRITE, TIER-QUALIFIED. `set` NEVER MINTS and NEVER CHANGES A FLAG (§7a.1 item 2). */
  set(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  /** THE COMMIT — the MINTING and RE-GENERATING operation (§2.8 items 5/6). */
  commit(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  /** THE DOWNWARD REMOVAL — the held rule, cited by row name, unchanged in shape (§2.8 item 4). */
  remove(name: string): GraphWriteReceipt
  /** THE TIER-LOCAL, NON-RECURSIVE CLEAR (§2.8 item 4). */
  clear(name: string): GraphWriteReceipt
  /** THE SWEEP: unmark and clear the swept entries; N swept entries => N events, NEVER one event (§2.8 item 4). */
  sweep(name: string): GraphWriteReceipt
  /** THE MULTI-LEVEL EXPORT — a NON-AUTHORITATIVE SNAPSHOT, LOCAL-ONLY (§2.9). */
  export(name: string): GraphResolveResult | GraphRefusalReason
  /** SEVER ONE LINK. The reclaim operation: it DELETES the `file`-flagged node on the far side and RELEASES the
   *  subscriptions on it, emitting the `'severed'` arm (§2.10 item 3). */
  sever(from: string, anchorKey: string): GraphWriteReceipt
  /** THE SUBSCRIPTION. `{subtree}` is OPTIONAL and DEFAULTS TO false. */
  subscribe(name: string, listener: (event: GraphEvent) => void,
            opts?: { subtree?: boolean }): GraphSubscription
  /** THE THREE COLLECTIONS, BY TIER NAME, FROZEN — each a VIEW over the graph (§2.6 item 1). */
  readonly tiers: Readonly<Record<GraphNodeFlag, GraphTierHandle>>
  /** THE REGISTER'S OWN READ-ONLY VIEW (§2.4). */
  readonly register: GraphRegister
  /** THE CONSTRAINT TABLE'S READ-ONLY VIEW. */
  readonly constraints: readonly GraphConstraint[]
  /** THE TEST-ONLY SEAM. PRESENT ONLY when `{ enableTestSeam: true }`; ABSENT otherwise, as a ROW (§3.4 R-4). */
  reset?(): void
  seed?(rows: readonly { readonly name: string; readonly value: unknown }[]): void
  parentLinkCountOf?(nodeRef: GraphNodeRef): number
  cacheEntryFor?(name: string): GraphRegisterCacheEntry | null
}
```

### 2.2 The prohibitions — **every prohibition cites an ENUMERATED static row**

**Caller-supplied (never built in, never defaulted, never enumerated):** every reference name; every anchor key; every
value; every constraint id on a register row; the tier-1 crossing seam; the declared-row input; every listener; and every
subscription's `{subtree}` opt-in. **The two modules contain NO application string, NO consumer noun as their own
vocabulary, NO `is-*` literal, NO unit string, NO default value, NO policy predicate and NO persistence of their own.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No consumer vocabulary** — no `tab`/`pane`/`zone`/`gutter`/`region` token **as the store's own vocabulary**, no `is-empty`/`is-minimized`/`is-revealed` literal, no fork-origin literal `minimized` (the mirror-class ban) | **The store's bytes carry only its own tokens and the caller's strings** (`§0A` note 9). **The declared-row input lives in a SEPARATE file** (`§0A` note 1) **so the store's own scan stands with an EMPTY exemption set**; **a consumer noun appearing in `store-core-graph.ts` FAILS** | **`R-1`**, `M-17`, `I-9`, `§5.5.1 P-GR-TP-5` |
| **P-2** | **No anchor is ever mutated in place, and no node's flag is ever rewritten in place** — ANCHORS ARE IMMUTABLE; RE-PARENTING = DELETE THE ANCHORS AND MINT NEW ONES | **There is NO anchor-mutation operation and NO flag-assignment operation on the surface.** A re-tier is the regeneration transaction, which mints NEW nodes under the original's location and deletes the original only on a census match (`§2.8` item 6). **A row that observes an anchor's `key` or `link` changing on a live object, or a node's `flag` changing without a new `ref`, FAILS** | **`R-2`**, `M-9`, `F-6`, `I-[T-1/2]`, `§5.5.1 P-GR-IM-2` |
| **P-3** | **No segment is anything but DATA** — never coerced, never trimmed, never used as a prototype key; `'__proto__'` / `'constructor'` / `'toString'` are ORDINARY STRINGS | **Every segment is compared as a STRING and every dictionary this unit keys by name is built on a structure that does not inherit Object's prototype keys.** **A store whose name→target dictionary is a plain object FAILS** — **which is the POSITIVE CONTROL, and it is the held `§3a` seed `ADV-SC-1`'s exact shape** (`docs/specs/store-core.md` `§3a`) | **`R-2`**, `M-8`, `F-3`, `I-2`, `§5.5.1 P-GR-TP-2` |
| **P-4** | **No new MCP surface, no new seam, and no change to any frozen contract** | `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS`, the preload member set, the `scripts` key set and `docs/specs/gsession.md` `§2.5`'s delegate surface are **UNMOVED**; **no `scripts` key is added** — it would redden `tests/ui-leg-contract.test.ts`'s `L-1`, which pins the `scripts` KEY SET, **and a config change cannot satisfy it** | **`R-10`**, `I-11`, `§5.1` |
| **P-5** | **No throw on any declared-domain input** | Every API member is **TOTAL over its declared domain** and answers a **record**. **The named exceptions, and there are exactly THREE: (a) the factory's LOAD REFUSAL for a declared-row input that does not load (a `GraphLoadError`); (b) `reset()`/`seed()` called without the test seam enabled.** **A throw anywhere else FAILS** | `M-1`, `F-24`, `I-8`, **`R-3`** |
| **P-6** | **No store-side clamp, and no size refused** — **THE STORE REFUSES NAMES, TIERS AND CAPS, NEVER SIZES** | **The store has no size parameter, no arithmetic and no comparator**: values are `unknown` and opaque. **No row of this file asserts a size, a magnitude, a distance or a clamp** | **`R-7`**, `I-10`, `§2.2` `P-9` |
| **P-7** | **No store write to the graph's HOST and no second authority over any value a landed row owns** | **The store calls listeners and nothing else.** No dispatch, no envelope node, no handler body, no component binding, no DOM call, no `elementForNodeId`. **And the store derives, defaults and re-keys NOTHING it was given**: the flag is the node's own, the spelling is the caller's, the order is the caller's. **A store that derived, defaulted or re-keyed a value it was given FAILS** | **`R-3`**, `I-1`, `I-8`, `M-16`, `F-6` |
| **P-8** | **No engine-id key, no global map, and no counter or UUID beyond the declared per-graph handle** | The `R-9` scope ruling is in force (`§0` ruling 13): a **per-link, caller-keyed, walk-gated** target set is lawful; a **GLOBAL engine-id-keyed map** is not. **No path segment is ever looked up against any id registry, and no segment is treated as an id.** **The store-minted handle is per-graph and monotone, is NEVER a lookup key, and its control is re-pointed so that it is NOT VACUOUS** (`§3.4` `R-9`) | **`R-9`**, `I-12`, `§2.4` item 2, `§5.5.1 P-GR-TP-2` |
| **P-9** | **No element, no coordinate, no geometry, no magnitude, no clock** | **No `document`/`window`/`globalThis`, no `getBoundingClientRect`/`getComputedStyle`/`matchMedia`, no `clientX`-family read, no `element` parameter anywhere in the surface, no `Date`, no `Math.random`.** The family's opacity discipline, applied to the store's values: **an opaque caller value passes through uninterpreted** | **`R-7`**, `I-10`, `§5.5.1 P-GR-TP-5` |
| **P-10** | **THE GEOMETRY CLAUSE, CARRIED VERBATIM** (`S-d11`, mandatory wherever geometry criteria are described): *"the geometry the family produces is UNPROVABLE in this repo today (the node layer asserts contracts/arithmetic only) — that clause must appear wherever geometry criteria are described"* | **A graph traversal makes geometry claims no more provable than a family module does, and it must not become the place a coordinate finally lives.** **NO row of this unit may assert a rendered-geometry, layout, paint, applied-CSS, containment-boundary or magnitude fact, and no green of this unit may be reported as one** | **`R-7`**, `I-10`, `§5.2` items 2/3 |
| **P-11** | **No `provident-ssr` import beyond the declared census — and the census is ZERO** | **`store-core-graph.ts` imports exactly TWO statements, one of which is `./store-graph-references.js`, and NOTHING ELSE at run time; `store-graph-references.ts` imports nothing.** **The vendored package's `Anchor` / `Link` / `LinkConfigErrorCode` / `NodeState` are CITED as an external, unadopted type surface and are NEVER imported** (they are unusable in contract anyway: `src/main/**` and the package are what a renderer-realm store may not reach) | **`R-11`**, `I-13`, `§5.1` |

**The static rows `§2.2` cites are ENUMERATED, not asserted** (`§3.4` `R-1`…`R-12`): **a prohibition citing *"a static source
row"* with no id is not a row**, and **every prohibition above names at least one id that exists in `§3.4`.**

---

### 2.3 The grammar and the resolution walk (exact)

**THE GRAMMAR, exact and closed.**

```
<name>       ::= <tier> "." <top> [ "." <anchorKey> ]... [ "." <localName> ]
<tier>       ::= "temp" | "mem" | "file" | "secure"          // CASE-SENSITIVE, exactly four
<top>        ::= one non-empty caller segment                // the registered top-level name
<anchorKey>  ::= one non-empty caller segment                // an anchor KEY on the node the walk reached
<localName>  ::= one non-empty caller segment                // the LEAF's own local name
```

1. **THE FIRST SEGMENT IS THE TIER TOKEN, and it is A FILTER, NOT A PART OF THE NAME.** **Its domain is CLOSED and
   CASE-SENSITIVE**: `File.x` is **not** `file.x`; `disk.x` and `.x` are outside the domain. **The token is what the
   resolution FILTERS the resolved node's own flag on — it is not a segment of the stored name and not a key.**
   **`secure` is a legal prefix and is refused BEFORE the register is consulted and BEFORE any traversal**
   (`§2.4` item 5).
2. **THE LEAF NODE STORES ITS OWN LOCAL NAME.** `file.window.tabs.landingPage` stores the name `landingPage` **on the
   node**, and the prefixes are **the path the resolution walks** — `window` is the registered top-level name, `tabs`
   is the anchor key, `file` is the flag the walk filters on. **A node that stored a dotted path FAILS `M-2`.** **A
   segment is never the id of a node the walk did not reach.**
3. **EVERY SEGMENT IS NON-EMPTY AND A NAME IS A NON-EMPTY STRING, and EVERY SEGMENT IS DATA.** `file..x`, `file.`, `''`
   and a non-string are refused `reason:'malformed-name'`. **`'__proto__'`, `'constructor'` and `'toString'` are ORDINARY
   STRINGS**: a name built from them parses, walks and resolves by the same rules as any other, **and the store's
   name-keyed dictionaries are built so that they cannot be prototype keys** (`§2.2` `P-3`).
4. **THE GRAPH IS A TREE BY CONSTRUCTION, AND ITS ANCHORS ARE IMMUTABLE.** **Every node has EXACTLY ONE parent link
   (`parentLink`), and no operation creates a second**: a re-parent is **a DELETE of the anchors plus a MINT of new
   ones**, which is what makes the cache's anchor-set invalidator well-defined and what makes **a cycle
   UNCONSTRUCTIBLE**. **No visited set and no depth bound is owed**, because the walk's termination is a stated
   structural invariant with a positive control (`§2.2` `P-2`, `§3.3` `I-2`, `§3.4` `R-2`).
5. **TIERS COMPOSE, AND AT MOST ONE NODE HOLDS A GIVEN `(logical path, tier)` PAIR.** **Two holders may coexist for ONE
   logical path ACROSS tiers** — the held model's logical-path binding survives, and the held first-hit shadow and the
   merged read with its `parts` list **both SURVIVE**. **A second attempt at the same pair is routed to one of its two
   DECLARED OUTCOMES by the call params**: `{onRepeat:'edit'}` (the DEFAULT) **treats it as an EDIT to the existing
   node**, and `{onRepeat:'refuse'}` **fails LOUDLY** with `reason:'duplicate-path-tier'` and leaves the store
   unchanged. **A body that silently creates a second node for one pair FAILS `M-6`; a body that refuses a legal
   SECOND TIER's holder FAILS `M-5`.**
6. **THE SEVEN FAILURE ARMS, EACH NAMING ITS FAILING STEP.** **A failed resolution returns a VERBOSE PER-STEP
   DIAGNOSTIC, never a throw** (`§2.2` `P-5`): the `reason` names the class, the `step` names where the walk failed, and
   `segment`/`owner` name what the walk had reached.

| # | The arm, at its own step | The diagnostic names | The reason token |
| --- | --- | --- | --- |
| **(i)** | **`C-TOP` — no register row for the first path segment** | the FIRST path segment and the fact that no register row carries it | `'undeclared-name'` |
| **(ii)** | **`D-ANCHOR` — the node the walk reached carries no anchor keyed by the segment** | the node's own reference and the missing anchor KEY (the caller's own segment) | `'no-such-anchor'` |
| **(iii)** | **`G-RESOLVE-LEAF` — the chain resolved and the leaf is unwritten** | the link's own target set and the missing local name | **NOT A REFUSAL: the DECLARED MISS** (`§2.8` item 2) |
| **(iv)** | **`H-FLAG` — a node of that name exists but its FLAG is not the tier the filter asks for** | the node's OWN flag, the flag the filter asked for, and the step's own name | `'tier-filter-miss'` |
| **(v)** | **`E-LINK` — the anchor exists and its link's target has been severed/reclaimed** | the link and the reclaimed target | `'severed-link'` |
| **(vi)** | **`F-CACHE` — the cache entry is stale AND the rebuild itself fails** | the stale entry's link and the reason the rebuild could not answer | `'rebuild-failed'` |
| **(vii)** | **the WRITE side's twin of (v) — a write to an ORPHANED reference** | the orphaned reference and the operation that failed on it | `'severed-link'` — **the same graph fact seen from the write side**, and it is a RETURNED RECORD |

7. **THE FILTER RULE, stated as the order of the walk and as the reason the token reported is the FIRST that applies.**
   **The walk is `A-PARSE` → `B-SECURE-GATE` → `C-TOP` → `D-ANCHOR`(per remaining segment) → `E-LINK` → `F-CACHE` →
   `G-RESOLVE-LEAF` → `H-FLAG` → answer.** **`H-FLAG` runs AFTER `G-RESOLVE-LEAF`, so a filter miss on a resolvable leaf
   is `'tier-filter-miss'` and never `'no-such-anchor'`** — the same *"the reason token reported is the FIRST row that
   applies"* discipline the held read pins for its precedence row. **A row that reports `'undeclared-name'` for a
   `secure.*` name, or `'tier-filter-miss'` for a name whose chain never reached a leaf, FAILS.**
8. **THE WALK'S ANSWER SHAPE IS THE HELD READ'S, WITH ONE CHANGED MEMBER: `flag` REPLACES `tier`'s CARRIER.** **The held
   answer's `value`/`cache`/`name` members survive**, `tier` is the node's own flag on a hit, and the members
   `merged`/`parts` are **ABSENT on the hit and the miss arms** (`§2.5` item 3).

---

### 2.4 The register (exact)

1. **THE ROW SHAPE, re-derived under the round-3 answers — five members, printed with the source of each.**
   `{ name, nodeRef, constraintId?, reserved, derived }`. **(a) `name` — the CALLER'S OWN SPELLING of the top-level item,
   carried verbatim, never re-interpreted** (the held no-vocabulary rule, cited by row name). **(b) `nodeRef` — the
   store-minted handle, or `null` for a COLD ITEM.** **(c) `constraintId` — an id into the constraint table, or `null`
   (the held row shape's own field name, retained).** **(d) `reserved` — the held field name retained; its home is the
   register row for a top-level item and the ANCHOR for a per-leaf instance** (`§7a.1` item 6). **(e) `derived` —
   `true` iff the row is the graph's own projection.** **The held row's `tier` field is DROPPED**: under the filter rule
   the tier is not a declared property of the name at all, and the held `G-3` survives **as the filter miss**
   (`§2.3` item 6 (iv)).
2. **THE HANDLE IS NEVER A LOOKUP KEY.** **The register's `nodeRef` is a per-top-level-node handle the store mints inside
   its own graph; it is NOT a global id registry, it is NOT keyed by engine or authored ids, and IT IS NOT LOOKED UP BY
   ANY PATH SEGMENT.** **The walk reaches a node through its ANCHORS and LINKS.** **A row that resolved a PATH SEGMENT
   against a set of store-minted node handles FAILS `R-9`** — that is the residue of the scope ruling, and it is intact.
3. **THE REGISTER IS THE GRAPH'S TOP-LEVEL PROJECTION PLUS THE CALLER'S DECLARED ROWS.** **The register's row count for
   derived rows equals the parentless-node count, BY CONSTRUCTION** — the caller's spelling CREATES the node, and the row
   is then derived rather than separately declared.
4. **THE COLD ITEM, AND THE HELD REFUSAL/MISS DISTINCTION AT TOP LEVEL.** **A declared row whose path holds no node is
   `derived:false` with `nodeRef:null` and is the COLD ITEM.** **`resolve` on a cold item's path answers the DECLARED
   MISS `{found:false, value:undefined, tier:null, cache:null, name}`, NEVER a refusal** — while a path **no register row
   carries** answers `'undeclared-name'`. **The two states stay distinguishable by their own positive controls, which is
   exactly the held `docs/specs/store-core.md` `§3.2` `F-9` control at top level, and a body in which they collapse
   FAILS `F-2`.**
5. **THE REGISTER'S OWN REFUSED SET — SIX CONSTRUCTION-TIME ARMS, CLOSED.** **The register has no table load in the held
   sense; its refusals fire AT CONSTRUCTION of the declared-row input (a `GraphLoadError`), and they are:** **(a)** a
   declared row carrying **no name** or a **non-string/empty name** → `'malformed-name'`; **(b)** a declared row whose
   name's first segment is `secure` → `'secure-refused'`; **(c)** a name **declared twice in the input** →
   `'undeclared-name'` (the doubled row is not a declaration, so the name has no declaration that loads — the held
   `G-2` class, preserved); **(d)** a declared row colliding with a **reserved namespace key** → `'reserved-namespace'`;
   **(e)** a declared row colliding with **another row for the same `(path, tier)`** → `'duplicate-path-tier'` **where the
   input's params route it to refusal**; **(f)** a **malformed or ambiguous pattern** in the input →
   `'malformed-pattern'`. **AND THE POSITIVES, one per arm: a well-formed input LOADS; each of the four legal tier tokens
   LOADS; a name declared once LOADS; a non-colliding name LOADS; a second TIER's holder for one logical path LOADS; a
   well-formed interior-wildcard pattern LOADS.**
6. **THE CAPS — THE REGISTER'S OWN, WITH VALUES AND OVERFLOW OUTCOMES.** **The caps live on the TOP-LEVEL REGISTER and
   REACHABILITY collects WITHIN THE GRAPH** (the proposal's `§0.4` `A-G`; the two quantities are different, and no row may
   conflate them).

   | # | The capped thing | The value | The declared OVERFLOW OUTCOME |
   | --- | --- | --- | --- |
   | **`RCAP-1`** | **the registered top-level rows whose top-level node carries the `mem` flag** | **`1024`** rows | **THE WRITE IS REFUSED: `{status:'refused', reason:'cap-exceeded', cleared: [], repaired: [], rows: [], crossings: 0, events: 0}`, and the store is LEFT COMPLETELY UNCHANGED.** **NO EVICTION, NO FIFO, NO LRU, NO SILENT DROP** — **an eviction would be the store choosing which caller value to destroy, which is the second-authority class `P-7` closes** |
   | **`RCAP-2`** | **the registered top-level rows whose top-level node carries the `temp` flag** | **`4096`** rows | **Identical to `RCAP-1`.** |
   | **`RCAP-3`** | **the amplifier-form subscriptions across the register** (`{subtree:true}` and prefix/tier-wide forms) | **`64`** subscriptions | **THE SUBSCRIPTION IS REFUSED and REGISTERS NOTHING — the listener is NEVER invoked, and no entry exists to unsubscribe.** **An EXACT-reference subscription is NEVER capped** |

   **The values are the held figures, RELOCATED ACROSS A QUANTITY, and each carries a RE-DERIVATION DUTY** (`§7a.1`
   item 7): they were derived for tier-collection elements and amplifier subscriptions, and this register counts ROWS.
   **The COUNTS are read from the register's own rows, never from a trie or a node count** (the held cap discipline,
   cited by row name). **The OVERFLOW OUTCOME is NOT reversible**, because a refusal that clears nothing is the landed
   non-destructive posture.
7. **THE REGISTER'S WRITE-SIDE REFUSAL MAPPING — the top-level analogue of the held token map, and the only arms that can
   fire.** **(a)** a name whose first path segment carries no register row → `'undeclared-name'` at `C-TOP`; **(b)** a
   `secure.*` name → `'secure-refused'`, **decided before the register**; **(c)** a malformed or non-string name →
   `'malformed-name'`; **(d)** a registration or write that would exceed `RCAP-1`/`RCAP-2` → `'cap-exceeded'`; **(e)** a
   second attempt at one `(path, tier)` pair, under `{onRepeat:'refuse'}` → `'duplicate-path-tier'`; **(f)** a
   `remove` on a `reserved:true` top-level row's own name → `'reserved-name'`, **refused BY NAME and never by value**;
   **(g)** `'reserved-namespace'`, `'malformed-pattern'` and `'ambiguous-path'` are **carried from the held union and
   fired at the sites this contract's construction-time arms name.** **NO OTHER ARM CAN FIRE, and a row that mints a
   token outside this list FAILS `F-2`.**
8. **THE DECLARED-ROW INPUT'S HOME, and why the unit still has two modules.** **The input lives in
   `src/renderer/store-graph-references.ts`** (`§0A` note 1): **the register's row identity is the CALLER'S spelling, and
   the store's own bytes must be able to stand a scan with an EMPTY exemption set.** **The real tenant's rows arrive
   later as an input; this unit's own test carries a TEST-ONLY fixture whose spellings are GENERIC CALLER STYLE
   (`<entity>`/`<id>`/`<key>`-shaped) and carry NO consumer noun, so the fixture exercises every arm above WITH its
   positive control and keeps the store's scan vacuous of exemptions.** **A pattern over TOP-LEVEL names is meaningful;
   a per-leaf pattern is not, and the per-leaf pattern kind's fate is recorded at `§7a.1` item 5.**

---

### 2.5 The read and the walk's answer

1. **THE RULE, in one sentence.** **`resolve(name)` parses the name, refuses `secure` before anything else, looks the
   first path segment up in the register, walks the anchors and links, checks the link's cache, resolves the leaf's own
   local name against the link's target set, FILTERS the resolved node's flag on the name's tier token, and answers the
   held read's shape.**
2. **THE PRECEDENCE IS FIXED AND TOTAL: `secure` → malformed → undeclared → the resolved leaf's miss → the filter miss →
   the answer.** **The reason token reported is the FIRST row that applies.** **A row that reports `'undeclared-name'`
   for a `secure.*` name, or `'tier-filter-miss'` where the chain never reached a leaf, FAILS.**
3. **THE ANSWER CARRIES THE TIER COLLECTION'S OWN HANDLE, BY IDENTITY.** **`cache` IS the same object (`toBe`) as
   `store.tiers[hit.flag]`** — the held identity rule survives the amendment, **and a row that observes a copy FAILS
   `M-3`.** **`cache` is a live object reference and may NOT cross an IPC boundary** (`docs/specs/mcp-endpoint.md`
   `P-E6`), **which is one of the reasons the graph is renderer-realm.**
4. **THE MERGED READ AND ITS `parts` SURVIVE.** **A path NO node holds, whose DESCENDANTS are held, answers the merged
   arm**: `merged:true`, `tier:null`, `cache:null`, and a **NON-EMPTY `parts` list ORDERED by the OVERLAY ORDER
   (`file` → `mem` → `temp` — DESCENDING durability, the reverse of the search order)**, **each entry naming THE PATH
   THE TIER ACTUALLY HOLDS and NEVER the read path.** **The merged value is NON-AUTHORITATIVE**: no node holds it, and it
   is recomputed on every read. **A body that answers a merged composite at a pair a node holds FAILS `F-6`** — the
   held first-hit rule stands: where a node holds the read path, the hit arm answers and no merge runs.
5. **THE REGENERATION TRANSACTION'S OWN READ FACE.** **Across the regeneration window, a read answers EITHER the value
   OR a refusal — NEVER both, and never a partial state** — because the refusal is decided by the graph **on the SAME
   synchronous turn that the regeneration mutates it**.
6. **THE WRITE TO AN ORPHANED REFERENCE.** **A write whose walk reaches a link whose target is severed fails LOUDLY,
   with `reason:'severed-link'`, as a RETURNED RECORD — not a throw and not a silent no-op.** **This is the whole of
   what replaces the deleted pin set: a smaller surface, and a failure the caller can see.**

---

### 2.6 The two caches (exact)

1. **THE TWO KINDS, and there is NO THIRD.** **(a) THE REGISTER CACHE** — a dictionary keyed by a name, holding the
   **LOWEST-DURABILITY MATCH** for that name; **(b) THE PER-LINK CACHE** — the same dictionary shape, scoped to ONE
   link, held ON that link (`GraphLink.cache`). **Neither is a register row member and neither is authoritative: a
   dictionary entry is a derived structure, so a row that stored a cache entry IN the register row would make the
   register a second authority over resolution and FAILS `R-5`.**
2. **THE ENTRY SHAPE, exact: `{ name, matchedRef, matchedTier }`.** **`name` is the resolved spelling; `matchedRef` is
   the node the entry answers; `matchedTier` is that node's own flag.** **The entry is the held read's own shadowing
   rule made into a cache record** — *an in-flight `temp` value wins over a committed `file` one* — **and it is computed
   from the graph with NO ambient input: no clock, no counter, no insertion time, no `Math.random`.**
3. **THE INVALIDATION RULE IS EXHAUSTIVE AND TWO-PARTED, and this is the whole of it:** **a cache entry is invalidated
   by (a) ANY CHANGE TO THE REGISTER — any operation that registers, de-registers or re-projects a top-level row — or
   (b) ANY CHANGE TO A LINK'S ANCHOR SET.** **Because anchors are IMMUTABLE (`§2.2` `P-2`), there is no *"mutate an
   anchor's link"* operation whose effect a cache could miss, so (b) is the ONLY way a link's addressability changes.**
   **CONSEQUENCE, stated because it is what makes the resurrection class closable BY THE RULE: the landed clear rule
   CHANGES THE RESIDENT SET the entry was derived from, and is therefore an invalidator by (a)'s own words.**
4. **THE REBUILD HAPPENS AT THE INVALIDATION SITE, NEVER ON THE READ PATH (the record's `DR-7`, resolved as a working
   default).** **A rebuild is performed by the mutating operation that changed the register or the anchor set — in the
   same synchronous step — and a read NEVER writes a cache entry.** **Why:** a read that rebuilds would be **a read with
   a side effect on derived state**, against the two landed rows that pin the read's purity, **and the held two-run
   store-state-independence row's own two runs could then differ in the cache's state** (`§0A` note 3). **A row that
   observes the read path mutating a cache entry FAILS `R-5`.**
5. **ANCHOR IMMUTABILITY IS WHAT MAKES THE RULE WELL-DEFINED, and a re-parent is a cache-invalidating event.** **A
   re-parent DELETES the anchors and MINTS new ones, which is a change to some link's anchor set; and a commit's
   regeneration removes and mints anchors, so the affected caches are invalidated BY THE SAME OPERATION.** **A
   regeneration is a register-and-anchor-set change, never a silent field write.**
6. **TWO READS ON ONE STATE ARE STRUCTURALLY IDENTICAL.** **The held two-run store-state-independence differential is
   satisfied AS LANDED with the rebuild at the invalidation site** (`§0A` note 3; `§3.4` `R-6`; `§5.5.1`
   `P-GR-IM-12`). **A `cache` is compared BY IDENTITY against the same handle across both runs, `parts` ABSENT is
   compared as ABSENT, and the answer's members are compared by value.**

---

### 2.7 The constraint table and `REPAIR` (exact)

1. **THE DECLARATION SHAPE, exact.** `{ id, kind, matchedSet, evaluatedOn, repair, onRepeat, refusalReason }`
   (`GraphConstraint`). **`kind` is `'count-exactly-one'` or `'unique-path-tier'`; `matchedSet` names the set the
   constraint is evaluated over; `evaluatedOn` is the list of operations that evaluate it; `repair` is
   `'next-surviving-by-order'` or `'none'`; `onRepeat` is `'edit'` or `'refuse'`; `refusalReason` is a token or `null`,
   and `null` means THIS ROW NEVER REFUSES.**
2. **EVALUATION POINTS, exhaustive.** **EVERY WRITE (`set`, `commit`) AND EVERY `remove` evaluates the table on its
   POST-STATE.** **`clear` and `sweep` DO NOT evaluate it** — they remove references rather than write them, and the
   landed evaluation set is *"every write **and** `remove`"*. **A row that observes a constraint evaluated on a `clear`
   FAILS `M-13`; a row that observes a `remove` SKIPPING the evaluation FAILS `M-13`.**
3. **THE REPAIR LANDS IN THE SAME COMMITTED WRITE, and it has its OWN event.** **A violating write is REPAIRED, never
   refused by the constraint it satisfies**, and **the repair's write clears the repaired reference's lower copies by
   the same logical-path rule and clears NOTHING if the higher tier refused.** **A repair EMITS ITS OWN `cause:'repair'`
   EVENT carrying the repaired value**, **and the violating caller's own write still emits its own** — so a repairing
   operation is countable as *"one event for the caller's reference plus one per repaired reference"*.
4. **THE UNIQUENESS CONSTRAINT, WITH ITS TWO DECLARED OUTCOMES.** **At most one node holds a given `(logical path, tier)`
   pair.** **An attempt to add one where it already exists is routed by the call params**: **`'edit'` rewrites the
   existing node's value in place of minting a second node** (the DEFAULT), and **`'refuse'` fails LOUDLY with
   `reason:'duplicate-path-tier'` and leaves the store unchanged** (its OVERFLOW-STYLE posture: `cleared: []`,
   `events: 0`, nothing written). **A body that mints a second node for one pair FAILS `M-6`.** **`{onRepeat}` on the
   call OVERRIDES the constraint row's `onRepeat`; where neither declares it, the default is `'edit'`** (`§7a.1`
   item 10).
5. **THE EXACTLY-ONE-ACTIVE CASE, with the NEXT-SURVIVING-BY-`order` rule and the WRAP.** **For the
   `count-exactly-one` kind over a matched set with a caller-supplied order: `0` active → activate the NEXT SURVIVING
   entry BY THE CALLER'S OWN ORDER, WRAPPING TO THE FIRST when the closed entry was last; `≥2` active → deactivate every
   active entry except the REFERENT, the referent being the caller's own written reference or, on a
   `remove`-triggered evaluation, THE REMOVED ENTRY'S OWN INDEX.** **The repair consults NOTHING but the caller's own
   order — no insertion time, no tie-break, no store-side preference.**
6. **A SECOND CONSTRAINT WITH NO INTERACTION RULE DOES NOT LOAD.** **An input carrying two distinct constraint ids where
   neither declares an interaction rule is refused AT CONSTRUCTION with `reason:'malformed-pattern'`** (the landed
   cascading rule, made mechanical); **the positive control is that a one-row table LOADS.**
7. **THE TABLE IS VOCABULARY-CLEAN.** **No row, id or repair action spells a consumer token as the STORE's vocabulary
   beyond the declared constraint id** — **the id is a declaration key, not a mechanism word**, and the mirror-class ban
   binds the table's bytes.
8. **`reachable(name)` IS THE REACHABILITY QUERY AND IT IS NOT A CAP.** **Reachability decides WHAT MAY BE DELETED; the
   register's caps decide HOW MANY VALUES MAY EXIST.** **They are different quantities and no row may use one as the
   other** (`§0A` note 6).

---

### 2.8 The write surface — `set`, `commit`, `remove`, `clear`, `sweep`, `sever`

1. **`set` NEVER CLEARS, NEVER MINTS A NODE AND NEVER CHANGES A FLAG.** **A `set` on a path whose `(path, tier)` pair
   holds a node writes that node's value and answers `cleared: []`.** **A `set` on a path with NO node is REFUSED
   `'undeclared-name'`** — **because the flag a new node would need is minted by `commit` alone** (`§0A` note 4).
   **A row that observes a `set` clearing anything, or minting a node, FAILS `M-9`.**
2. **`commit` CLEARS THE SAME LOGICAL PATH IN EVERY LOWER-DURABILITY TIER, AND ONLY THAT.** **The clear happens AFTER
   the higher tier durably accepted the value, NEVER BEFORE** — and **a refused or throwing commit clears NOTHING and
   emits NOTHING.** **The clear is BY LOGICAL PATH, NEVER by suffix or prefix**: a commit NEVER clears a higher tier and
   NEVER clears recursively. **A commit to a path no lower tier holds clears nothing — a declared, reportable outcome
   (`cleared: []`), never a refusal and never a silent no-op.** **The held rules `C-1`…`C-5` are cited by row name and
   their semantics are UNCHANGED; what changes is that a tier-qualified commit to a HIGHER tier is now the entry point to
   the regeneration transaction (`§2.8` item 5).**
3. **`commit` IS THE MINTING AND RE-MINTING OPERATION.** **On a path with no node, `commit` MINTS one node at the
   requested tier and registers its top-level row.** **On a path whose `(path, tier)` pair already holds a node, `commit`
   routes the attempt to the pair's declared outcome** (`§2.7` item 4). **On a path held at a LOWER tier, `commit`
   performs the REGENERATION TRANSACTION at the requested tier.**
4. **`remove`, `clear` and `sweep` KEEP THE HELD SHAPES, cited by row name.** **`remove(name)` CLEARS DOWNWARD** — the
   NAMED TIER AND EVERY LESS-PERSISTENT COPY of the same logical path, never a higher tier (`remove('file.x')` → `file`,
   `mem`, `temp`; `remove('mem.x')` → `mem`, `temp`; `remove('temp.x')` → `temp` only) — **and its post-state is a MISS on
   that logical path at every tier the name reaches.** **`clear(name)` is TIER-LOCAL, NON-RECURSIVE, and one event per
   cleared reference.** **`sweep` unmarks and clears the swept entries and emits ONE EVENT PER SWEPT REFERENCE, never
   one event carrying a list.** **A refused `remove` clears nothing.** **A tier-free `remove`/`set`/`commit` is refused
   `'malformed-name'`** — the write side requires a tier qualifier, because the store may not choose the tier.
5. **THE SUBTREE REGENERATION TRANSACTION — THREE STEPS, IN THIS ORDER.** **(1) BUILD the regenerated subtree: the node
   and EVERY descendant, each re-tiered, as NEW nodes under the original's location.** **(2) COMPARE ITS CENSUS WITH THE
   ORIGINAL'S.** **(3) DELETE THE ORIGINAL ONLY ON A MATCH.** **The census term, resolved as a working default: THE
   TIER'S OWN ROW COUNT — the number of register rows the regenerated set occupies at the requested tier — and
   `collectionSizeAt(tier, subtree)` is the declared instrument.** **The corroborating reading, recorded beside it, is
   the resident set's own segment total; the two are NOT interchangeable and a row may not compare one in the
   comparison and the other in its assertion** (`§7a.1` item 11).
6. **A CENSUS MISMATCH IS A DECLARED FAILURE THAT LEAVES THE ORIGINAL ALIVE.** **Nothing is deleted, no partial state
   lands, and the failure is a RETURNED RECORD with `reason:'rebuild-failed'`** — **the declared failure token for this
   transaction.** **The flag is NEVER rewritten in place, and the regenerated nodes are NEW nodes under the original's
   location, so the walk cannot mis-read a re-tier as a severance: the deletion is the transaction's LAST step and it
   happens only after the census matched.**
7. **THE CROSSING, THE RECEIPT AND THE EVENT SET FOR A SUBTREE-WIDE REGENERATION.** **For `N` AFFECTED REFERENCES (the
   node plus every descendant): ONE RECEIPT ROW PER AFFECTED REFERENCE (`rows[]` has `N` entries), ONE CROSSING FOR THE
   WHOLE REGENERATED SET (`crossings: 1` — the set is ONE COMMITTED WRITE, and a crossing that serializes one reference
   at a time is a FINDING), and THE PER-AFFECTED-REFERENCE EVENT RULE UNCHANGED (one event per affected reference, a
   sweep of `N` emits `N`, a refused write emits `0`).**
8. **THE `file`-TIER WRITE IS A TRANSLATION, AND THE TRANSLATION IS THE CHANNEL'S CARGO.** **A write that crosses to
   `file` puts A STABLE-JSON TRANSLATION OF THE GRAPH through the declared, STUBBED `crossing` seam** — **not a
   per-reference list and not a tombstone.** **The crossing is `U-STORE-PERSIST`'s and this unit asserts NOTHING about
   its order, idempotency or failure recovery.**
9. **THE STABLE-JSON STABILITY RULES, resolved as a working default (the record's `DR-6`).** **The translation reuses the
   held canonical comparator's rules, with the coupling STATED rather than hidden: (a) an object's OWN ENUMERABLE OWN
   KEYS are emitted in SORTED order; (b) primitives are rendered BY VALUE, with `-0` and `NaN` distinguished by
   `Object.is`; (c) `undefined`-valued members are OMITTED, so ABSENT and `undefined` are the same absence; (d) a
   `GraphNodeRef` is rendered as its own string, because the handle is a serializable nameable form; (e) a
   `GraphTierHandle` is rendered as its `tier` token, never as a live object; (f) the affected-node set is derived from
   the graph the deletion happened in, so **two translations of the same graph with nodes created in a different order
   are BYTE-IDENTICAL.**
10. **A MULTI-REFERENCE OPERATION IS ONE COMMITTED WRITE.** **A regeneration's reference set is ordered and is crossed
    ONCE; the receipt returns one row per reference; and the constraint evaluation is evaluated OVER THE WHOLE SET in
    the one committed write.** **A body that crossed once per reference FAILS `R-8`.**

---

### 2.9 The multi-level export

1. **THE EXPORT IS A SNAPSHOT.** **`export(name)` returns a FRESH object per call, NON-AUTHORITATIVE, recomputed on
   every read — the same status the held model declares for its one composite.** **A caller that mutates it changes
   nothing in the store, which is a feature.** **A row that treats an export as committable, cacheable or authoritative
   FAILS `M-15`.**
2. **A LIVE HANDLE INTO THE CACHE IS NOT GRANTED, and no aliasing between an export and a store value exists.** **An
   export may not be used as a value to write back.**
3. **THE CROSSING RULE — LOCAL-ONLY, NOT REQUIRED TO SERIALIZE.** **An export is for LOCAL USE WITHIN A FUNCTION.** **It
   MAY NOT carry a live `cache` handle beyond its caller's own frame, and no row may claim it crossed an IPC
   boundary.** **The crossing form (a JSON-safe export) is named as the escalation if a host caller ever needs it** —
   **and taking it is a spec amendment with its own gate, not an in-flight choice** (`§7a.1` item 9).
4. **THE EXPORT'S COST IS NOT CLAIMED TO BE `O(1)`.** **A traversal's cost is proportional to the depth of the walk and
   the size of the subtree it materializes, and a valid leaf cache entry amortizes NOTHING of the export.** **No timing
   figure is claimed anywhere in this file** (`RCA-12`).

---

### 2.10 The event surface

1. **THE ENVELOPE, exact: `{name, flag, value, cleared[], cause}`, with `origin` on the `descendant` arm alone and
   `subtree:true` as that arm's own marker.** **`name` is the reference's spelling the caller used · `flag` is the tier
   that FIRED (for a `descendant` event, the tier that holds the WRITTEN path) · `value` is present as a KEY on every
   arm and `undefined` in substance where the arm carries none · `cleared[]` is PRESENT AND POSSIBLY EMPTY on every arm
   and is NEVER omitted.**
2. **THE EIGHT-ROW ARM TABLE IS THE TOTAL MEMBER-SET STATEMENT.** **`✓` = REQUIRED AND NON-EMPTY IN SUBSTANCE; `—` =
   REQUIRED AS A KEY, EMPTY/`undefined` IN SUBSTANCE.**

   | `cause` | `name` | `flag` | `value` | `cleared[]` | `origin` | What the arm MEANS |
   | --- | --- | --- | --- | --- | --- | --- |
   | **`'set'`** | ✓ | ✓ | ✓ | — | — | an equal-value write fires NOTHING; **a `set` is NOT a commit and must never be counted as one** |
   | **`'commit'`** | ✓ | ✓ | ✓ | **✓ — possibly EMPTY** | — | emitted AFTER the higher tier durably accepted and AFTER the clears; **`cleared[]` here is the AUDIT list, not the cleared reference's only channel** |
   | **`'clear'`** | ✓ | ✓ | — | — | — | **one event per cleared reference; a cleared lower reference fires its OWN `cause:'clear'` on its OWN path** |
   | **`'sweep'`** | ✓ (one event EACH) | ✓ | — | — | — | **`N` swept entries ⇒ `N` events, never one event carrying a list** |
   | **`'remove'`** | ✓ | ✓ | — | ✓ | — | distinguishable from a commit-with-clears BY ITS `cause` TOKEN and by `value: undefined`, **never by a count** |
   | **`'repair'`** | ✓ | ✓ | ✓ | ✓ | — | **a repair emits its OWN event**; the violating caller's own write also emits its own |
   | **`'descendant'`** | ✓ (the ANCESTOR opted in on) | ✓ | — | — | **✓ — REQUIRED HERE ALONE** | ancestors fire ONLY for `{subtree:true}` subscribers; **an ancestor with no opt-in subscriber fires NOTHING** |
   | **`'severed'`** | ✓ (the RELEASED reference) | ✓ | — | **✓ — the references the severance cleared** | — | **THE EIGHTH ARM, added by this contract (`§7a.1` item 4): the release-reporting arm. A reclaim that released a live subscriber's reference and reported NOTHING would be a silent disappearance** |

3. **THE SUBSCRIBER-RELEASE RULE, and the count row RE-DERIVED RATHER THAN RELAXED.** **`sever(from, anchorKey)` DELETES
   the `file`-flagged node on the far side of the link, RELEASES EVERY SUBSCRIPTION REGISTERED ON THAT NODE OR ON ANY
   REFERENCE IT HELD, and EMITS EXACTLY ONE `cause:'severed'` EVENT PER RELEASED REFERENCE, naming the released
   reference in its own `name` and in the severing receipt's `cleared[]`.** **After the severance, the subscription
   count for each released reference reads exactly `0`** — the held per-realm-per-reference discipline's **third release
   trigger**, added beside the realm's death and `reset()`. **A row that observes an unanswered delivery (a live
   listener on a reference the graph no longer contains) FAILS `F-11`; a row that observes a silent disappearance (a
   release with no event) FAILS `F-11`; and a row that observes MORE than one event for one released reference FAILS
   `F-11`.**
4. **THE DELIVERY RULES, cited and unchanged in shape.** **A store subscription is PER REALM, PER REFERENCE**: one
   subscription, for as long as the realm lives, on one declared reference; **its count after `N` graph
   re-derivations stays `1`**. **`unsubscribe()` answers `true` the first time and `false` on every later call — never a
   throw.** **A NON-CALLABLE listener is refused `'malformed-name'` and registers NOTHING.** **A listener that THROWS
   does not propagate to the mutator's caller: the store catches it, continues the fan-out in registration order, and
   the operation's receipt is UNCHANGED by the throw.**
5. **`events` IS THE COUNT OF EVENTS EMITTED — NOT THE COUNT OF LISTENERS INVOKED.** **One event to three listeners is
   `events: 1` and three deliveries.** **Both readings are asserted against the subscribers' own delivery record, so a
   body cannot pass by counting only one.**
6. **A WRITE PINGS EXACTLY ITS OWN PATH; ANCESTORS FIRE ONLY FOR OPT-IN SUBSCRIBERS.** **The `descendant` event carries
   NO value and `origin` is the WRITTEN PATH FULLY QUALIFIED** — so a subscriber learns WHICH descendant changed and
   WHICH tier holds it. **A write to a descendant NEVER writes, clears or pings a persistent ancestor.**

---

### 2.11 The construction and the realm (stated once, so no pass infers it)

1. **Who creates the store, when, and what a second creation does** — `§0A` note 8: **one store per realm, at boot,
   held by the wiring, never in a module-level binding; a second creation is caught by the ROW that counts
   constructions.**
2. **The graph is renderer-realm; the security collection is main-side.** **A graph spanning two realms is
   unimplementable** (its nodes are live references), **so the graph, the register and the two caches are renderer-realm
   and `secure` is unreachable from the generic surface BY CONSTRUCTION** — refused on the name's own first segment
   **before** the register is consulted and **before** any traversal (`§2.4` item 5).
3. **Recursion is structurally impossible, and this is the declared semantics the held totality posture lacked.** **The
   tree invariant is a construction property with a positive control; the segment-as-data rule is a declared string
   comparison. Neither a visited set nor a depth bound is owed, and no row may require one.** **A positive control that
   cannot express its failing case is VACUOUS and is itself a finding** (`§3.4` `R-2`, `§5.5.1` `P-GR-TP-2`).
4. **The severance's ordering is persist-first, then delete.** **Inside the crossing the node is unreachable but alive:
   a READ that arrives there answers the value or a refusal, never both; a WRITE that arrives there FAILS LOUDLY; and
   the crash window is DECLARED as *"a lost WRITE, never a lost DELETE"*.** **The recovery half belongs to the channel's
   unit** (`§7a.1` item 3).

---

## 3. Behaviour (every state / fail-state)

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **The walk resolves the architect's own example end to end** | a register row for `window`; a node with the anchor `tabs`; that anchor's link targeting a node whose `localName` is `landingPage` and whose flag is `file`; `resolve('file.window.tabs.landingPage')` | an ANSWER: `found:true`, the node's value, `flag:'file'`, `cache` IDENTICAL (`toBe`) to `tiers.file`, `name:'file.window.tabs.landingPage'` | `§2.3` items 1/2/7, `§2.5` item 1, `R-6` | `[T]` |
| **M-2** | **The leaf stores its OWN LOCAL NAME, never a dotted path** | the same fixture; the node's own bytes and the register row's spelling are read | the node's `localName` is **exactly `landingPage`**; **no node carries a dotted path as its local name**; `window` is the register row's spelling and `tabs` is the anchor's key — three different structures, three different strings | `§2.3` item 2, `§2.4` item 1, `I-4` | `[T]` |
| **M-3** | **`cache` IS the tier collection's own handle, by identity** | a hit whose flag is `mem` | `result.cache === store.tiers.mem` (`toBe`), and **the same handle answers its own `get` with the same value** | `§2.5` item 3, `§2.6` item 1, `§2.2` `P-7` | `[T]` |
| **M-4** | **TIERS COMPOSE: two holders coexist for one logical path, across tiers** | a `file`-flagged node at `(p, 'file')` and a `temp`-flagged node at `(p, 'temp')`, both registered | **BOTH writes commit**, the register carries the row, and **`resolve('p')` answers the first hit in ascending durability (`temp`) while `resolve('file.p')` answers the `file` holder** — **two holders, one logical path, no collision** | `§2.3` item 5, `§2.5` item 2, `§0` ruling 6 | `[T]` |
| **M-5** | **THE MERGED READ AND ITS `parts` SURVIVE** | no node holds `p`; a `file`-flagged node holds `p.child` and a `temp`-flagged node holds `p.child` | `resolve('p')` ⇒ `{found:true, value:<the composite>, tier:null, cache:null, name:'p', merged:true, parts:[{tier:'file',path:'p.child'},{tier:'temp',path:'p.child'}]}` — **ordered by overlay order, every `path` a HELD path, no entry equal to `'p'`** | `§2.5` item 4, `§0` ruling 6, `R-6` | `[T]` |
| **M-6** | **THE UNIQUENESS CONSTRAINT: a repeat at ONE `(path, tier)` pair is an EDIT or a LOUD FAILURE, per call params** | two `commit` calls for the SAME `(logical path, tier)` pair, once with `{onRepeat:'edit'}` and once with `{onRepeat:'refuse'}` | **the first rewrites the existing node in place of minting a second, and exactly ONE node exists for the pair; the second is REFUSED `'duplicate-path-tier'` with `cleared: []`, `events: 0`, and the store BYTE-IDENTICAL to its pre-call state** | `§2.7` item 4, `§2.3` item 5, `§5.5.1 P-GR-IM-3` | `[T]` |
| **M-7** | **The committed reference's own subscriber gets EXACTLY ONE `cause:'commit'`; each cleared lower reference fires its OWN `cause:'clear'`** | `file.p`, `mem.p` and `temp.p` resident; subscribers on all three; `commit('file.p', v)` | the `file` subscriber receives **exactly one** event, `cause:'commit'`, carrying the audit list; **the `mem` and `temp` subscribers each receive exactly one event, `cause:'clear'`, ON THEIR OWN PATHS**; `events` reads `3` | `§2.8` item 2, `§2.10` items 2/5, `R-2` | `[T]` |
| **M-8** | **A segment that is a hostile string is DATA and resolves like any other name** | a register row and a node whose anchor key and local name are `'__proto__'`, `'constructor'` and `'toString'` | **every one parses, walks and resolves by the ordinary rules; a `resolve` of each answers its declared shape; a `set` through each COMMITS** — and **the store's name-keyed dictionaries answer the SAME entries a linear scan of the graph would** | `§2.2` `P-3`, `§2.3` item 3, `I-2`, `§5.5.1 P-GR-TP-2` | `[T]` |
| **M-9** | **`commit` MINTS the flag; `set` never mints and never changes one** | a path with no node; then `set` on it; then `commit` on it | the `set` is **REFUSED `'undeclared-name'`** and the graph is unchanged; the `commit` **MINTS one node with `flag` equal to the requested tier** and registers the row; a subsequent `set` on the same pair **writes the value and leaves the flag unchanged** | `§0A` note 4, `§2.8` items 1/3, `§5.5.1 P-GR-IM-11` | `[T]` |
| **M-10** | **ANCHORS ARE IMMUTABLE: a re-parent DELETES and MINTS, and no operation mutates an anchor** | a node with an anchor `tabs`; a `commit` that re-tiers its subtree; the anchor objects are read before and after | **the post-regeneration node is a NEW node with a NEW `ref` and NEW anchor objects; the pre-regeneration anchor object is UNTOUCHED and unreachable; NO operation on the surface assigns an anchor's `key` or `link`** | `§2.2` `P-2`, `§2.6` item 5, `I-2` | `[T]` |
| **M-11** | **THE REGENERATION TRANSACTION: build → compare census → delete ONLY on a match** | a `temp`-flagged subtree of `N` nodes; `commit('file.p', v)` on its root | **the regenerated set is the node and EVERY descendant, each re-tiered; the census matches; the original is deleted as the LAST step; `rows[]` carries `N` entries; `crossings === 1`; each affected reference fired its own event** | `§2.8` items 5/6/7, `§0` ruling 9, `§5.5.1 P-GR-SM-1` | `[T]` |
| **M-12** | **The census' declared instruments, stated separately and never interchanged** | the fixture above; `collectionSizeAt(tier, subtree)` and the resident set's segment total are both read | **the census COMPARISON uses the tier's own row count; the corroborating segment total is asserted BESIDE it; a row whose comparison and assertion use different instruments FAILS** | `§2.8` item 5, `§7a.1` item 11 | `[T]` |
| **M-13** | **A repair lands in the SAME committed write, and emits its OWN event** | a declared `count-exactly-one` constraint over a matched set; a violating write; subscribers on both the caller's reference and the repaired reference | **ONE operation**: the receipt carries the caller's write AND the repair, `repaired[]` names the repaired reference, the repaired reference receives **one event with `cause:'repair'` carrying the repaired value**, and **there is NO window in which the post-state violates the constraint** | `§2.7` item 3, `§2.8` item 2, `R-7` | `[T]` |
| **M-14** | **A severance DELETES the `file`-flagged node and TRANSLATES the graph for the crossing** | a `file`-flagged node reachable only through one link; `sever(from, 'tabs')` | **the node is DELETED (not orphaned, not tombstoned); the cross-boundary write carries a STABLE-JSON TRANSLATION of the graph, not a per-reference list; the severed node and its descendants are ABSENT from the translation** | `§2.8` item 8, `§2.9`, `§0` ruling 10, `R-4` | `[T]` |
| **M-15** | **The export is a SNAPSHOT — fresh per call, NON-AUTHORITATIVE, and LOCALLY usable** | two `export` calls on one state; the caller mutates the first | **the two exports are structurally identical under the canonical comparator but are DIFFERENT objects; mutating one changes NOTHING in the store or in the other; a subsequent `resolve` answers the same as before** | `§2.9` items 1/2, `§0A` note 7 | `[T]` |
| **M-16** | **No second authority: the store derives, defaults and re-keys nothing it was given** | a caller's own spelling with mixed case and a leading underscore; a caller's own order list | **the register row reads the spelling VERBATIM; the repair consults the caller's order VERBATIM; the answer's `name` is the caller's own spelling; no normalization, no re-key, no derived default** | `§2.2` `P-7`, `§2.7` item 5, `I-1` | `[T]` |
| **M-17** | **The two modules ship NO consumer vocabulary in their own bytes** | the modules' raw bytes, scanned for the mirror-class literals and the consumer nouns as STORE vocabulary | **zero hits**, with the POSITIVE control that a fixture byte string carrying one **FAILS** the same scan | `§2.2` `P-1`, `R-1`, `§5.5.1 P-GR-TP-5` | `[T]` |

### 3.2 Documented fail-states / non-happy states

**NOTE the shape: every outcome in this block is a RETURNED RECORD, not an error** — **the only throw classes in the whole
unit are the factory's LOAD REFUSAL and the two test-seam throws** (`§2.2` `P-5`).

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **ARM (i): no registered top-level name** | `resolve('file.nosuch.x')` | a refusal record **WITH its diagnostic**: `reason:'undeclared-name'`, `step:'C-TOP'`, `segment:'nosuch'`, `owner:null` — **and never a throw** | `§2.3` item 6 (i), `§2.4` item 7(a), `R-4` | `[T]` |
| **F-2** | **The cold item is a MISS while the unregistered name is a REFUSAL — the two stay distinguishable** | (a) a declared row whose path holds no node; (b) a path no register row carries | (a) **the DECLARED MISS** `{found:false, value:undefined, tier:null, cache:null, name}`; (b) **`{status:'refused', reason:'undeclared-name'}`** — **the held `F-9` control preserved at top level, and a body in which they collapse FAILS** | `§2.4` item 4, `§2.8` item 1, `§0` ruling 4 | `[T]` |
| **F-3** | **ARM (ii): no such anchor key** | `resolve('file.window.nosuchanchor.x')` on a node carrying no such anchor | **`reason:'no-such-anchor'`, `step:'D-ANCHOR'`, `segment:'nosuchanchor'`, `owner:<the node's ref>`** — **never `'undeclared-name'`** (the name IS declared; its chain is absent, and using the other token would be a MISREPORT of a closed union) | `§2.3` item 6 (ii), `§2.2` `P-3`, `R-4` | `[T]` |
| **F-4** | **ARM (iv): the filter miss on a resolvable leaf** | a node whose `localName` is `landingPage` and whose flag is `temp`; `resolve('file.window.tabs.landingPage')` | **`reason:'tier-filter-miss'`, `step:'H-FLAG'`, with the node's OWN flag and the flag the filter asked for both named** — **and the positive control is the SAME name with the agreeing token `temp`, which ANSWERS** | `§2.3` item 6 (iv)/item 7, `§2.5` item 2, `R-6` | `[T]` |
| **F-5** | **ARM (v): a severed link on the READ side** | `resolve` through a link whose target has been severed and reclaimed | **`reason:'severed-link'`, `step:'E-LINK'`, naming the link and the reclaimed target** — never a throw, never a silent fall-through to another tier | `§2.3` item 6 (v), `§2.5` item 6, `R-4` | `[T]` |
| **F-6** | **ARM (vi): a stale entry whose rebuild itself fails** | a stale cache entry whose rebuild cannot answer; `resolve` on that name | **`reason:'rebuild-failed'`, `step:'F-CACHE'`, naming the stale entry's link and the reason the rebuild could not answer** — **and the STALE-CACHE arm WITHOUT a rebuild failure is NOT a refusal at all: it is a declared NORMAL path** | `§2.3` item 6 (vi), `§2.6` item 4, `R-5` | `[T]` |
| **F-7** | **ARM (vii): a WRITE to an ORPHANED reference fails LOUDLY** | `set`/`commit`/`remove` on a path whose walk reaches a severed link | **`{status:'refused', reason:'severed-link', cleared: [], events: 0}` as a RETURNED RECORD** — **no pin set exists, and no silent no-op is admissible** | `§2.3` item 6 (vii), `§0` ruling 11, `I-6` | `[T]` |
| **F-8** | **The first-hit arm WINS over the merged arm where a node holds the read path** | a `file`-flagged node at `p`; a `temp`-flagged node at `p.child`; `resolve('p')` | **`{found:true, flag:'file', cache:<file's handle>, name:'p'}` with `parts` ABSENT and `merged` ABSENT** — **no merge runs**; a body answering `merged:true` FAILS | `§2.5` item 4, `§3.1` `M-5`'s mirror, `R-6` | `[T]` |
| **F-9** | **A CENSUS MISMATCH is a declared failure that leaves the ORIGINAL ALIVE** | a regeneration whose regenerated set's census does not match the original's | **`{status:'refused', reason:'rebuild-failed'}`, `crossings: 0`, `events: 0`, and the ORIGINAL STILL RESOLVES** — **nothing deleted, no partial state** | `§2.8` item 6, `§0` ruling 9, `§5.5.1 P-GR-SM-1` | `[T]` |
| **F-10** | **A `remove` one descendant DURING the regeneration window: ONE crossing, one row per reference, EITHER outcome** | `set('temp.P', v)`; `commit('file.P', v)`; then `remove` of one descendant during the window | **the receipt shows ONE crossing and one row per affected reference, and EITHER a completed regeneration OR the declared failure that left the original alive** — **a partial state, or a deletion on a mismatch, FAILS** | `§2.8` items 5/7, `§0` ruling 9, `§5.5.1 P-GR-SM-1` | `[T]` |
| **F-11** | **A severance RELEASES its subscribers and REPORTS the release** | a subscription on a `temp` reference; the parent chain severed | **exactly ONE declared `cause:'severed'` event naming the released reference; the subscription count for it goes to `0`; the severing receipt's `cleared[]` names it** — **an unanswered delivery, a silent disappearance, or MORE than one event for one reference FAILS** | `§2.10` item 3, `R-2`, `§5.5.1 P-GR-TP-6` | `[T]` |
| **F-12** | **A refused write clears NOTHING and emits NOTHING, on EVERY mutator** | a cap overflow; a malformed name; an undeclared name; a reserved name; a `secure.*` name — each driven with lower-tier copies resident | **every refusal carries `cleared: []`, `rows: []`, `crossings: 0`, `events: 0`, and every resident lower-tier copy STILL RESOLVES** | `§2.8` items 2/4, `R-3`, `§0` ruling 9 | `[T]` |
| **F-13** | **A cap's overflow REFUSES, and NEVER evicts, clears or emits** | each of `RCAP-1`/`RCAP-2`/`RCAP-3` driven to its value and one past it, with lower-tier copies resident | **at the cap: `{status:'refused', reason:'cap-exceeded', cleared: [], rows: [], crossings: 0, events: 0}`, the register BYTE-IDENTICAL to its pre-call state; ONE BELOW the cap: `{status:'committed'}` — the positive control** — **an eviction, a FIFO/LRU drop, a lower-tier clear or any event on this path FAILS** | `§2.4` item 6, `§0A` note 6, `§5.5.1 P-GR-TP-3` | `[T]` |
| **F-14** | **`secure.*` is refused BEFORE the register is consulted and BEFORE any traversal** | `resolve('secure.<k>')`, `resolve('secure.undeclared')`, `subscribe`/`remove`/`clear`/`set`/`commit` on a `secure.*` name — **each on a name that is NOT declared** | **every one answers `{status:'refused', reason:'secure-refused'}`** — **NEVER `'undeclared-name'`**, and **never a `'tier-filter-miss'`**; **the positive control is that the SAME names without the `secure` segment answer `'undeclared-name'`** | `§2.4` item 5, `§2.5` item 2, `§0` ruling 12 | `[T]` |
| **F-15** | **A `secure`-flagged node never appears in the register or the traversal** | a graph whose register is read exhaustively; every traversal step's reached set is read | **no register row's `nodeRef` resolves to a `secure`-flagged node, and no walk step reaches one** — the separate collection is unreachable from the generic surface **BY CONSTRUCTION**, not by a per-walk check | `§2.4` item 5, `§2.11` item 2, `I-7` | `[T]` |
| **F-16** | **A malformed name is refused, and the four legal tokens are the positive control** | `''`, a non-string, `'file..x'`, `'file.'`, `'File.x'`, `'disk.x'`, `'.x'`, `'file'` | **all refused `reason:'malformed-name'`, never a throw**; **each of the four legal tier tokens on a declared name COMMITS** | `§2.3` items 1/3, `R-4`, `§5.5.1 P-GR-TP-1` | `[T]` |
| **F-17** | **A tier-free write is refused** | `set('p', v)`, `commit('p', v)`, `remove('p')` | **all three refused `'malformed-name'`** — the store may not choose the tier — **while a `resolve` on the same spelling is LEGAL, because the read has a filter order and the write has none** | `§2.8` item 4, `R-4` | `[T]` |
| **F-18** | **The register's own construction-time refusals, each with its named positive control** | the six arms of `§2.4` item 5, each beside its control | **each arm REFUSES AT CONSTRUCTION with its own token (a `GraphLoadError`), and each control LOADS** — **and the store a refused input would have built DOES NOT EXIST** | `§2.4` item 5, `R-4`, `§5.5.1 P-GR-IM-6` | `[T]` |
| **F-19** | **A second constraint with no interaction rule does not load** | a declared-row input carrying two distinct constraint ids where neither declares an interaction rule | **the input does NOT load** (`reason:'malformed-pattern'`); **the positive control is that the one-row table LOADS** | `§2.7` item 6, `R-7` | `[T]` |
| **F-20** | **A `remove` on a `reserved:true` top-level row's own name is refused BY NAME** | `remove(<the reserved name>)` and `remove(<a sibling's own name>)` | **the reserved one is `{status:'refused', reason:'reserved-name'}` and the sibling `{status:'committed'}`** — **the refusal is BY NAME, never by value, so the positive control is exact** | `§2.4` items 1(d)/7(f), `R-3` | `[T]` |
| **F-21** | **The constraint is evaluated on `set`/`commit`/`remove` and NOT on `clear`/`sweep`** | a declared constraint; a violating write; then a `clear` and a `sweep` that leave the same violation | the write is **repaired in the SAME committed write** and carries `repaired:[…]`; **the `clear` and `sweep` receipts carry `repaired: []`** | `§2.7` item 2, `R-7` | `[T]` |
| **F-22** | **The export may not cross and may not be treated as authoritative** | `export(name)` then an attempt to serialize it across a boundary, or to write it back | **the export carries NO live `cache` handle beyond the caller's frame and NO row claims it crossed an IPC boundary; writing an export back is not a granted operation** | `§2.9` items 2/3, `R-8` | `[T]` |
| **F-23** | **A graph is UNCONSTRUCTIBLE with a second parent link, and a cyclicity claim has a drivable positive control** | a drive that attempts to give one node a second parent link; a drive that attempts a cycle | **no operation produces a node with more than one parent link, so no cycle exists; the POSITIVE CONTROL is a probe over the store's own link set showing that a second parent link is REFUSED — and a control that cannot express its failing case is VACUOUS and FAILS** | `§2.2` `P-2`, `§2.3` item 4, `I-2`, `§5.5.1 P-GR-IM-2` | `[T]` |
| **F-24** | **The totality universal: NOTHING throws on a declared-domain input** | every API member driven with `undefined`, `null`, `42`, `'x'`, a `Symbol`, a `BigInt`, a `Proxy` whose traps throw, a record with throwing accessors, an array, a function, and (for the listener slot) a non-callable | **every member answers its declared shape and nothing throws** — **the ONLY throws are the factory's LOAD REFUSAL and the two test-seam throws, and each of those three is asserted separately in the same row** | `§2.2` `P-5`, `R-3`, `§5.5.1 P-GR-TP-1` | `[T]` |
| **F-25** | **`R-9`'s positive control is RE-POINTED so that it is NOT VACUOUS** | the control drives a name whose whole segment is a string the store does not own, AND the same drive against a **store A that has been driven with no register row and no node** | **the control REDDENS on a global engine-id-keyed map and PASSES on this store — and it FAILS as vacuous if it cannot distinguish them, so the vacuity test is: a store that has never minted a row must still answer the drive DISTINGUISHABLY from the one that has.** **A control that passes on both FAILS** | `§2.2` `P-8`, `§3.4` `R-9`, `§0` ruling 13, `§6` item 3 | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant |
| --- | --- |
| **I-1** | **The graph is the SOURCE OF TRUTH for value residency; the tier collections and the per-tier indexes are VIEWS and INDEXES over it.** The store derives, defaults and re-keys nothing it was given (`§0` ruling 1, `§2.2` `P-7`). |
| **I-2** | **THE GRAPH IS A TREE BY CONSTRUCTION: every node has EXACTLY ONE parent link, and no operation creates a second.** Re-parenting deletes and re-mints anchors, so **a cycle is unconstructible** — no visited set and no depth bound is owed (`§2.3` item 4, `§2.2` `P-2`). |
| **I-3** | **TIERS COMPOSE: at most ONE node holds a given `(logical path, tier)` pair**, and two holders may coexist for one logical path ACROSS tiers. The merged read and `parts` survive (`§2.3` item 5, `§2.7` item 4). |
| **I-4** | **A NODE STORES ITS OWN LOCAL NAME, never a stored dotted path**, and the tier token is a FILTER rather than a part of any name (`§2.3` items 1/2). |
| **I-5** | **ANCHORS ARE IMMUTABLE, and no node's flag is rewritten in place** — the only operation that re-tiers is the regeneration transaction, which mints new nodes (`§2.2` `P-2`). |
| **I-6** | **A WRITE TO AN ORPHANED REFERENCE FAILS LOUDLY, as a returned record.** No pin set exists and none is owed (`§0` ruling 11). |
| **I-7** | **`secure` is refused BY NAME, BEFORE the register is consulted and BEFORE any traversal**, so a `secure`-flagged node is unreachable from the generic surface by construction (`§2.4` item 5). |
| **I-8** | **No member throws on any declared-domain argument**; the three named throws are the whole exception set (`§2.2` `P-5`). |
| **I-9** | **The store ships NO vocabulary**: no consumer noun as store vocabulary, no `is-*` literal, no unit string, no invented default, no policy predicate (`§2.2` `P-1`). |
| **I-10** | **No element, coordinate, geometry, magnitude or clock read anywhere in the surface or the bytes** (`§2.2` `P-9`/`P-10`). |
| **I-11** | **No new MCP surface, no new seam, and no change to any frozen contract** (`§2.2` `P-4`). |
| **I-12** | **No path segment is looked up against any id registry, and the store's handle is never a lookup key.** The store keeps no global string-to-entry map (`§2.2` `P-8`). |
| **I-13** | **The import census is EXACT: `store-core-graph.ts` carries one non-type import and nothing else; `store-graph-references.ts` imports nothing; the vendored package is never imported** (`§2.2` `P-11`). |
| **I-14** | **Every graph mutation INVALIDATES the affected cache entries by the two-part rule, in the same synchronous step** (`§2.6` item 3). |
| **I-15** | **The event envelope's five common members are present AS KEYS on every event, `cleared` is never omitted, and `origin` appears on the `descendant` arm ALONE** (`§2.10` items 1/2). |
| **I-16** | **One event per AFFECTED reference**: a commit emits its own AND each cleared lower reference fires its own `cause:'clear'`; a sweep of `N` emits `N`; a severance emits one per RELEASED reference; a refused write emits `0` (`§2.10` items 3/5). |
| **I-17** | **The export is a NON-AUTHORITATIVE SNAPSHOT, LOCAL-ONLY, and never carries a live `cache` beyond its caller's frame** (`§2.9`). |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

| id | The static claim | The scan's scope and its positive control | Cited by |
| --- | --- | --- | --- |
| **R-1** | **Over BOTH modules' raw bytes, there is NO consumer vocabulary as store vocabulary and NO mirror-class literal**: no `tab`/`pane`/`zone`/`region`/`gutter` word, no `is-empty`/`is-minimized`/`is-revealed`, no `minimized` literal, no unit string. **Tokens held as FRAGMENTS so the scan cannot read its own rule list.** | **both modules' bytes**, with a **POSITIVE control** (a fixture string carrying one must FAIL) and a **NEGATIVE control** (ordinary wording PASSES). **`store-graph-references.ts` is IN this scan's scope, because it is this unit's own input module** | `P-1` |
| **R-2** | **The tree invariant HOLDS UNDER DRIVE, and each node's parent-link count never exceeds ONE** — including after a re-tier, a deletion, a `remove` and a severance. | a `parentLinkCountOf(nodeRef)` census over **every node the graph has ever minted**, **with a POSITIVE control that a double-parent construction is REFUSED and that the control can EXPRESS its failing case** (a vacuous control FAILS as a finding) | `P-2`, `P-3`, `I-2` |
| **R-3** | **For EVERY mutator, a refusal implies `cleared: []` AND `rows: []` AND `crossings: 0` AND `events: 0` AND every resident copy untouched.** | the six mutators × the refusal classes, **with the positive control that the same call on a legal input clears what it declares** | `P-5`, `P-7`, `F-12` |
| **R-4** | **The walk's precedence is total and ordered — `secure` → malformed → undeclared → the leaf miss → the filter miss → the answer — and every refusal carries a DIAGNOSTIC naming its step.** | the precedence inputs crossed with the two name forms, **each with its own expected reason AND step id**; **a refusal record without a diagnostic FAILS** | `P-5`, `§2.3` item 6, `§2.5` item 2 |
| **R-5** | **A cache entry is never a REGISTER ROW MEMBER, never authoritative, and the read path NEVER mutates one.** | the register row's own key set (the entry's members must be ABSENT from it) **and** a read-driven probe (`cacheEntryFor(name)` before and after a `resolve` on a stale entry — **unchanged**), **with a POSITIVE control that a rebuild performed by a mutator DOES change it** | `P-7`, `§2.6` items 2/4 |
| **R-6** | **The tier token is a FILTER, never a second residency authority: the answer's `tier`/`flag` is the resolved node's OWN flag, and a disagreement is a DIAGNOSTIC rather than a silent pick.** | the disagreement fixture **plus its agreeing positive control**; **a body that answers a `temp`-flagged node's value under a `file` request FAILS** — the durability-lie class | `§0` ruling 3, `§2.2` `P-7`, `§2.3` item 7 |
| **R-7** | **No `element` parameter, no geometry-shaped claim, no size, no magnitude and no clamp appears anywhere in the surface or in any row DESCRIPTION.** **`S-d11`'s clause is carried verbatim at `§2.2` `P-10`.** | the modules' bytes **and** this unit's own test file's row descriptions, **with a positive control that a description claiming a magnitude FAILS** | `P-6`, `P-9`, `P-10` |
| **R-8** | **No path, file, `fs`, `node:*`, `process`, `require`, `document`, `window`, `globalThis`, `getBoundingClientRect`, `getComputedStyle`, `matchMedia`, `clientX`-family, `Date` or `Math.random` token exists in either module or in this unit's own test file.** **And the export is `O(subtree)`, never claimed `O(1)`.** | both files' raw bytes, with a positive control (a fixture carrying `node:fs` must FAIL) | `P-9`, `§2.9` item 4 |
| **R-9** | **THE RE-POINTED `R-9` CONTROL.** **The clause's target is a GLOBAL engine-id-keyed map; a PER-LINK, CALLER-KEYED, WALK-GATED target set is NOT in that class; and THE STORE'S HANDLE IS NEVER A LOOKUP KEY.** | **(a)** a scan of the modules for any segment-against-handle lookup, **with a positive control that a lookup of a path segment against the minted-handle set FAILS**; **(b)** the **NON-VACUITY control**: the same drive against a store **that has never minted a row** must answer **DISTINGUISHABLY** from one that has — **a control that passes on both is VACUOUS and FAILS**; **(c)** `R-9`'s no-counter / no-UUID half: the minted handle is a per-graph monotone string and **no UUID site exists** | `P-8`, `§0` ruling 13, `§6` item 3 |
| **R-10** | **No MCP/registration surface moved**: `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS`, the preload member set, the `scripts` key set and `docs/specs/gsession.md` `§2.5`'s delegate surface are all UNMOVED by this unit's diff. | the frozen surfaces asserted **by set equality against the NAMES**; **the `scripts` KEY SET asserted unchanged because adding a key would redden `tests/ui-leg-contract.test.ts`'s `L-1` — a config change CANNOT satisfy it** | `P-4`, `§5.1`, `I-11` |
| **R-11** | **The import census, NAME-COMPLETE**: `store-core-graph.ts` carries exactly ONE non-type import (`./store-graph-references.js`) and no other; `store-graph-references.ts` imports nothing at all; **neither module imports `provident-ssr`, `electron`, `node:*`, `src/main/**`, `src/shared/**`, the held `store-core.js` or the held `store-references.js`**; and **neither carries a module-level mutable binding** holding a store, a graph, a register, a cache, a listener set or the seam flag. | both files' raw bytes, **NAME-COMPLETE** (the census names each module and each binding), **with a positive control that a second import statement FAILS, that a `src/main/**` import FAILS, and that a module-scope `const store = createGraphStore(...)` FAILS** | `P-11`, `I-13` |
| **R-12** | **No module-level mutable binding holds a store, a graph, a register or a cache; the construction count per realm is exactly `1`; and the seam's four members are ABSENT unless enabled.** | (a) the module's top-level scope, **with a positive control that a module-scope store binding FAILS**; (b) the wiring's construction count; (c) `'reset' in store === false`, `'seed' in store === false`, `'parentLinkCountOf' in store === false` and `'cacheEntryFor' in store === false` when the seam was not enabled | `P-7`, `§2.11` item 1, `§5.5.1 P-GR-IM-10` |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | The claim | The probe |
| --- | --- | --- |
| **R-9** | **This unit renders NO page and authors no page design**, so the `user-flow-audit.md` `§7.1` predicate does not trigger and **no report is due** — **a zero-row report is INVALID**. | a glob of the unit's diff for any envelope node, handler body, component binding or authored element; **any hit FAILS** |
| **R-10** | **(a) `docs/skills/designing-pages.md` DOES NOT EXIST**, so there is no test-use-case coverage matrix and no demo-page index to update; **(b) the construction count per realm is `1`; (c) the seam is ABSENT in a production-shaped construction.** | (a) a glob of `docs/skills/*` — **the file's later appearance is a finding against THIS row, to be reconciled in the same pass**; (b) the wiring's own construction count; (c) the store's own key set |
| **R-11** | **`src/renderer/store-core-graph.ts` and `src/renderer/store-graph-references.ts` are both NEW** (both verified free 2026-10-01), **and `src/shared/**` and the vendored tree stay BYTE-IDENTICAL across this unit's whole committed set.** | a commit-range probe over `src/shared/**` and `node_modules/provident-ssr/**` — **any byte there FAILS** |
| **R-12** | **The held `docs/specs/store-core.md` is BYTE-IDENTICAL across this unit's whole committed set**, and **neither new module imports it**. | a commit-range probe over that file **plus** a read of both modules' import statements — **any byte there, or any import of it, FAILS** |
| **R-13** | **The `[H]` half grows by exactly ONE row — the load-cycle row — and by nothing else.** | the unit's own `§5.5.1` `P-GR-IM-12` is the one `[H]`-driven row; **any second `[H]` drive introduced without a gate FAILS** |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**A TestWriter authors `tests/store-core-graph.test.ts` from THIS FILE and its `§5.5.1` register ONLY — no implementation
reading — and RUNS it, reporting the failing set VERBATIM.** **The rows are `§3.1`'s `M-1`…`M-17`, `§3.2`'s `F-1`…`F-25`,
`§3.3`'s `I-1`…`I-17`, `§3.4`'s `R-1`…`R-12`, `§3.5`'s existence rows, and the register's `21` rows.** **At red time the
modules DO NOT EXIST, so the whole set is expected to fail on the import itself** — **except the STATIC and EXISTENCE
rows, which are evaluable at red time and must be driven in BOTH branches:**

- **RED branch (the modules absent):** assert **ABSENCE** of the two module paths and **that no `src/**` file imports
  either path**; assert the `docs/skills/designing-pages.md` absence (`§3.5 R-10`(a)); assert that the held
  `docs/specs/store-core.md` is byte-identical (`§3.5 R-12`); assert that no tracked count moved.
- **GREEN branch (the modules present):** assert the modules **EXIST**, that `store-core-graph.ts` exports **exactly
  `2 + 27 = 29` names NAMED** (`§2.1` item 3), that the import census holds (`R-11`), and that the renderer wiring is the
  only importer.

**A row that fails merely because the work was done FAILS `R-13`'s own branch rule.**

### 4.2 Red-set authoring order

1. **The static and existence rows first** (they are evaluable now and they are what the red set reports at red time).
2. **The walk and its seven failure arms** (`M-1`, `M-2`, `F-1`…`F-7`, `R-4`).
3. **The filter rule and the register** (`M-4`, `F-2`, `F-14`…`F-18`, `R-6`).
4. **The uniqueness constraint and the merged read** (`M-5`, `M-6`, `F-8`).
5. **The write surface and the regeneration transaction** (`M-9`, `M-11`, `M-12`, `F-9`, `F-10`, `F-12`, `F-13`, `F-17`, `F-20`).
6. **The two caches** (`M-3`, `F-6`, `R-5`).
7. **The event surface and the severance arm** (`M-7`, `F-11`, `F-22`, `R-3`).
8. **The export** (`M-15`, `F-22`).
9. **The totality, the tree invariant, the hostile segments and the purity rows** (`F-23`, `F-24`, `F-25`, `I-2`, `R-1`, `R-2`, `R-7`, `R-8`).
10. **The register's `21` rows LAST**, in register order, **with the caps and the stop rule** (`§5.5`).

### 4.3 What the red is NOT

- **It is NOT a partial set.** A red that omits a `§3` row or a register row **is not the red this spec owes.**
- **It is NOT a green.** **No row may be reported as passing at red time except the static/existence rows' RED branches.**
- **It is NOT a substitute for the register.** **The register rows are the quantification layer; the `§3` rows are the
  sample layer, and neither replaces the other.**
- **It is NOT a proof of anything about persistence, the tier-1 channel, the fork's tree, a rendered surface or the app.**
  **No `[U]`, no `[D]` and no APP claim is made by any row of this unit.**

### 4.4 The stop conditions (binding)

| id | Stop condition |
| --- | --- |
| **S-1** | **A `§3` row's expected answer cannot be derived from THIS FILE.** The row is **WITHDRAWN and reported**; the spec is amended in the same pass. |
| **S-2** | **A register row is un-runnable or un-enumerable.** **It is reported as a FAILURE, never as a pass.** |
| **S-3** | **The register's total is not the sum of its own terms.** **A total that is not the sum of its own printed terms is a REVIEW FINDING** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE), and a mis-sum is corrected by **annotating beside the as-filed form, never by silently rewriting it.** |
| **S-4** | **A cap is evicted, silently dropped, or made to clear anything.** The cap's declared outcome is **a refusal with `cleared: []`, `rows: []`, `crossings: 0` and `events: 0`.** |
| **S-5** | **A row claims a rendered-geometry, layout, paint, applied-CSS, containment-boundary or magnitude fact — or offers a `[U]` row for one.** **The claim is DELETED; the row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** (`docs/specs/zones.md` `§4.4 S-6`'s own words, carried verbatim). |
| **S-6** | **A clause claims a coordinate, an element or a magnitude enters the store's surface.** **The clause is DELETED** — the family's opacity discipline and `S-d11`'s clause bind. |
| **S-7** | **A prohibition cites *"a static source row"* with no id, or a row asserts a COUNT without NAMING the names.** Both are FAILS (`§2.2`'s closing sentence; `§2.1`'s census). |
| **S-8** | **A second store authority appears** — a second construction in a realm, a module-level store binding, or a `cache`/handle that was serialized to make one. |
| **S-9** | **A node's `flag` is written in place, or an anchor is mutated in place**, rather than the re-tier being the regeneration transaction. |
| **S-10** | **A cap value or the seam is changed without a gate.** The values are working defaults and architect-reversible, **but a change is a spec amendment with its own gate, not an in-flight edit.** |
| **S-11** | **The held file's arithmetic findings are repeated rather than re-derived** — a total printed without its terms, a row count that its own table refutes, or a carried term that is not re-derived. |

### 4.5 Delegation gate

**This unit is NOT delegable to a TestWriter until: (a) this contract is FILED and APPROVED by the architect (the spec
gate — the ONE approval the chain waits for, `AUTONOMY AFTER SPEC APPROVAL` cited by row name); and (b) the STEP-0
determination at `§6` is accepted (a written zero-row rationale, never a silent one).** **After approval the chain
proceeds without further permission.**

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/renderer/store-core-graph.ts` | **NEW** — the **two value exports + twenty-seven type declarations** of `§2.1`, and nothing else | always |
| 2 | `src/renderer/store-graph-references.ts` | **NEW** — the register's caller-declaration input and its row type (`§2.1` item 2); **the TEST-ONLY fixture itself lives in the test file** | always |
| 3 | `tests/store-core-graph.test.ts` | **NEW** — the red set (`§4.2`), the register rows, the static/existence rows **and the TEST-ONLY fixture** | always |
| 4 | `docs/specs/store-core-graph.md` | this spec — its `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 5 | `docs/specs/store-core-graph-greens.md` | the unit's **gate-5 blind-greens artifact**, and any other `docs/specs/store-core-graph-*.md` of this unit | the pass that produces it |
| 6 | `src/renderer/renderer.ts` | **the WIRING ROLE ONLY, and ONLY if the wiring lands in this unit's pass**: it constructs the store once per realm at boot, before the hand-off, and registers the subscribers it needs. **It authors NO UI content and NO DOM** | the pass that lands the wiring; **a renderer edit that hand-writes DOM is a FINDING** |
| 7 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, and the per-unit documentation-review record | the pass that produces them |

**OUTSIDE THE SCOPE, ALWAYS — THE DENIED SET, WHICH BINDS ABSOLUTELY AND OUTRANKS THE ALLOW-LIST. The frozen and
predecessor-own files are NAMED FIRST:**

1. **`docs/specs/store-core.md`** — **BYTE-IDENTICAL** for this unit's whole committed set. **Its register is never
   re-grained, its red set is never authored, and its two arithmetic findings are annotated beside their as-filed forms
   by the pass that owns them — NEVER by a rewrite from this unit.**
2. **`docs/specs/store-core-adoption-dossier.md`** — **cited by path and amended IN PLACE at the spec-gate pass**
   (`§6`); **this contract writes no byte of it.**
3. **`docs/specs/store-node-graph-proposal.md` and `docs/specs/store-node-graph-review.md`** — the proposal **admits
   nothing by itself** and the record is the **CLOSED** gate-1 record: **this unit derives them and may not re-litigate
   or edit them.**
4. **`src/shared/**` and `node_modules/provident-ssr/**`** — **BYTE-IDENTICAL**, including `src/shared/types.ts`.
5. **`src/main/**`** — the channel-name constants, the preload members, the migration, the atomic write and the security
   tier's own module are **`U-STORE-PERSIST`'s and `U-STORE-SECURITY`'s**, not this unit's. **The renderer cannot import
   `src/main/**` anyway** (`[H]`).
6. **The app graph** — no node, no envelope, no handler body, no component binding, no mount change, **and no
   store-sourced value pushed into any of them**.
7. **`package.json` · `package-lock.json` · `tsconfig.json` · `tsconfig.tests.json` · `vitest.config.ts`** — **no script,
   no dependency, no devDependency, no include/exclude and no compiler option.** **`typecheck:tests` ALREADY EXISTS and
   this unit adds NO `scripts` key.**
8. **`scripts/**`** — no helper, no leg driver.
9. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no
   `MUTATING_METHODS` entry, no IPC method, no registration site.
10. **`docs/specs/mcp-endpoint.md` · `focus-tool.md` · `focus-model.md` · `gutter-ui.md` · `gutter.md` · `zones.md` ·
    `census.md` · `container.md` · `gsession.md` · `user-flow-audit.md`** — every sibling contract, **each under its own
    gate**.
11. **`docs/FORKER.md`** — its fork-facing cells are the architect's, on `Q-14`'s pass.
12. **`docs/skills/**`** — `designing-pages.md` does not exist and this unit renders no page.
13. **`AGENTS.md`**, and any tracker count.

**THE COMMIT-RANGE SCOPE RULE.** **A diff-scope row asserted over a commit range must scope its ALLOW-LIST CENSUS to
THIS UNIT'S OWN ARTIFACTS** — the two modules, this unit's test file, this spec, this unit's own `*-greens.md` and
`archive/reviews/**` record, and the unit's own tracker rows — **and must NOT read a later unit's commits, a sibling's
dirty working-tree file, or a sibling unit's artifact as this unit's diff.** **The DENIED set is the exception and is the
half that binds the WHOLE committed set**: a denied path anywhere in the range **FAILS** regardless of which pass
committed it. **A non-denied path outside the allow-list is a FINDING for the adversarial pass, not an automatic FAIL.**

### 5.2 The legs this unit MUST run — FIVE, and the two three-part refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **This is this unit's WHOLE green.** **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — it proves **the contract's behaviour over arguments and over a driven in-realm graph store**, and **nothing** about persistence, the tier-1 channel, a rendered surface or the app. |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the twenty-seven type declarations, the two value signatures and the store interface's own members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables.** |
| **3** | **build** | `npm run build` | **[H]** | esbuild. **This unit adds modules imported by the renderer wiring**, so **the renderer bundle's census is EXPECTED to change** and **the other bundles must be BYTE-IDENTICAL** — **a renderer-bundle change is NOT evidence that the contract holds.** |
| **4** | **the additive test-layer leg** | `npm run typecheck:tests` | **[T]** | **the ONLY leg that compiles `tests/**`** (`AGENTS.md` item 4's additive fourth leg). **Any DONE row that cites typecheck as evidence about THIS unit's own test file must cite THIS leg.** |
| **5** | **standalone strict `tsc --noEmit` over `tests/store-core-graph.test.ts`** — the named leg for `§2.1` item 3's type half | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** the type half is a **PRESENCE** claim, and **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail** — while **leg 2 does not compile `tests/**` at all**. **IT ADDS NO SCRIPT, NO DEPENDENCY AND NO DIFF-SCOPE ROW.** |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART. A one-sentence refusal is not the clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — including the walk's seven arms, the
   register, the two caches, the regeneration transaction, the severance and every static row. **`[U]` is the real-DOM
   observation leg (`npm run ui`), and no row of this unit is run there.**
2. **THE STRUCTURAL REASON, and it is structural rather than a leg-availability excuse: NO ADMITTED UNIT AUTHORS A
   RENDERED SURFACE.** **Concretely, both limbs of the reason are absent: (a) this unit authors no element, no node, no
   text, no class, no attribute, no stylesheet and no control** — **so there is no rendered surface to observe**; **and
   (b) its flows are store-only, so there is no assembled visible behaviour whose truth is real-DOM-only.** **The `ui`
   leg exists and is green, and the divergence leg is green — the refusal is not an excuse about the legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row MAY NOT BE MOVED TO THE `ui` LEG
   SILENTLY."*** **Any later pass that wants a rendered row for this unit must get it from the unit that OWNS the
   rendered surface** — **the tab strip is `U-STORE-TABS-STRIP`'s (a PROPOSAL), and the two authored pages are
   `U-STORE-FOCUS`'s (a PROPOSAL); neither is admitted and neither is this unit's.** **A `[U]` row moved here silently is
   `§4.4 S-5`, and it does not land.** **AND THE WORD `waived` IS FORBIDDEN: gate 6's honest status is `STRUCTURAL`, and
   a DONE row that reports it as `waived` is a review finding.**

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED.** **The divergence leg is the shim ≡ real identity leg
and it is green — but no `[D]`-shaped row of this unit is runnable**, because **this unit's subject is a store's own
semantics over its own graph**, which the existing pinned leg does not enumerate. **A `[D]`-shaped row for this unit would
need its OWN harness and its own spec as its authority.**

**AND THE `user-flow-audit.md` `§7.1` PREDICATE, RECORDED:** **the determination is NOT TRIGGERING, in the predicate's own
terms, with limbs A and B both absent** (`CURRENT STATE` item 6). **The record of the determination is this sentence. NO
REPORT IS FILED, and a zero-row report is INVALID.**

### 5.3 The DONE row's shape

**The DONE row (`docs/next-steps.md`, the supervisor's pass, the architect's to grant) must carry, in this order — all
TWELVE items:**

1. **Unit + wave + status**: the successor unit's id as the architect admits it · its wave · `DONE` or the honest non-DONE
   status.
2. **The scope-boundary confirmation, explicitly**: *"the amended store architecture: a node-anchor-link graph as the
   source of truth; a tier token that is a FILTER; the leaf's own local name; a verbose per-step diagnostic; a
   top-level register with its own caps, projected from the graph and fed by a declared-row input; a per-`(path, tier)`
   uniqueness constraint; two caches with a two-part invalidator set and a rebuild at the invalidation site; the
   subtree-regeneration transaction; the downward `remove`; the eight-arm event surface with the `severed` arm and its
   release rule; the stable-JSON translation; the non-authoritative local-only export — and NOTHING ELSE. **No policy
   default, no store-side clamp, no consumer vocabulary, no element or geometry read, no graph write, no MCP surface, no
   UI, and no byte of the held contract."*
3. **The surface confirmation, explicitly**: *"`src/renderer/store-core-graph.ts` exports exactly **TWO value exports**
   (`createGraphStore`, `createGraphStoreError`) and **TWENTY-SEVEN type declarations**, NAMED (`GraphTierToken` ·
   `GraphNodeFlag` · `GraphRefusalReason` · `GraphResolveStep` · `GraphResolveDiagnostic` · `GraphNodeRef` · `GraphNode` ·
   `GraphAnchor` · `GraphLink` · `GraphTierHandle` · `GraphRegisterRow` · `GraphRegister` · `GraphRegisterCacheEntry` ·
   `GraphLinkCacheEntry` · `GraphConstraint` · `GraphPart` · `GraphReadHit` · `GraphReadMiss` · `GraphMergedRead` ·
   `GraphResolveResult` · `GraphWriteReceipt` · `GraphWriteOptions` · `GraphEvent` · `GraphSubscription` ·
   `GraphCrossing` · `GraphStore` · `GraphLoadError`) — **`THREE` read-result shapes and their union plus the rest, and the
   count is stated here WITH its terms: `3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 = 27` ✓**; it imports **ONE** module
   (`store-graph-references.js`) and carries **no module-level store binding**, and **its test seam is ABSENT unless
   `{enableTestSeam:true}` was passed**."*
4. **The code/test delta**: the two modules + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register rows ran and
   which were reported un-run** and **which rows were driven in their RED branch**.
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, *`src/**` ONLY* · `npm run build`
   `[H]` (the renderer bundle's census moved, every other bundle byte-identical) · `npm run typecheck:tests` · **leg 5** —
   **and the explicit sentence that the node-suite green proves nothing about persistence, the tier-1 channel, a
   rendered surface or the app.**
7. **The `[U]`/`[D]` status, and gate 6's `STRUCTURAL` status**: **`[U]` not offered**, with `§5.2`'s **THREE-PART** clause;
   **`[D]` not claimed**, with its `PRECONDITION-GATED` status; **gate 6 stated as `STRUCTURAL`, with its reason.**
   **The word `waived` must not appear as this unit's status.** **AND the `user-flow-audit.md` `§7.1` determination,
   recorded as NOT TRIGGERING with no report filed.**
8. **The adversarial pass's findings** (`§3a`/`§3b`, **including the read-only PBT audit of `§5.5.1`'s executed tables**)
   and the **blind-greens + per-unit documentation-review records**.
9. **The tracker reconciliation** — including **the explicit statement that `src/shared/**` and the vendored tree are
   byte-identical, that the held contract is byte-identical, and that the ledger's counts are unmoved until the
   architect grants the DONE row.**
10. **The property register's execution record**: per register row, the **id · type · attempts-run · held · broken**
    counts, **each row's strategy id (`S-GR-*`)**, the **pinned seed `20261002`** and its **step form**, the
    **stop-after-5-consecutive-failures status**, the **total attempts against the `≤400` cap** with **every row's count
    against the `≤100` per-row cap**, and **the explicit sentence that every row whose property text quantifies over a
    domain larger than its table carries the `(bounded)` marking and is NOT a proof of the unbounded universal it
    states.**
11. **The register's ARITHMETIC, printed WITH its per-row terms**, and reconciled against the tables the test file
    actually produces: **a total that is not the sum of its own terms is a review finding.** **Where a row's attempts are
    several assertions over one execution, or a count of DISTINCT inputs rather than of DRIVES, the DONE row must report
    BOTH the declared attempts and the honest DISTINCT-DRIVE figure** — **the declared term is a DRIVE count**
    (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`, cited by row name), **assertions are printed BESIDE it and never inside
    it.**
12. **The decision requests' disposition** (`§7a.1`): **the eleven items' outcomes as ruled by the architect, each with
    its own row**, and **the `CARRIED` items with their owners and their positive revisit conditions named — never a
    bare `OWED`.**

### 5.4 Rollback

**The unit is a NEW module pair plus a NEW test file.** **Rollback is the removal of the two modules and the test file,
the revert of the wiring role if it landed, and the revert of this spec** — **no migration, no data file, no schema
version, and no other unit's artifact is entangled**, because **the store owns no file and persists nothing.**

---

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` obliges the register BEFORE the red set for a code-bearing unit, and
`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` forbids trimming it to a count.** **This repo HAS
NO PBT HARNESS**: `package.json`'s `devDependencies` key set is the five keys `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **no `fast-check`, no property runner, no fourth dependency of any kind.** **This unit is
CODE-BEARING** (a graph store with two value exports, a walk, a register projection, two caches, a constraint evaluator, a
regeneration transaction and an event fan-out), **so the recorded ZERO-ROW EXEMPTION IS NOT AVAILABLE to it.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE.** **A register ENUMERATES every discernible testable property; the
per-section threshold (`≤8`) is a BREAKDOWN SIGNAL, NOT A CEILING.** **THEREFORE this filing enumerates `21` rows and
reports the count as its EXTENT — no property was dropped, merged or left unenumerated to fit a threshold**, and **`21` IS
AN OUTCOME, NOT A TRIM.** **No row of this register is an `F-` row**, and **no `§6`/`FS-n` citation appears as a register
row.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/store-core-graph.test.ts`) — the file the red set
   already owes, and the file the register **rides as part of the red**. **No row is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript inside the test
   file.** **The rows that draw do so from a hand-rolled 32-bit LCG with `state₀ = 20261002`;
   `stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`; EACH DRAW APPLIES EXACTLY ONE LCG STEP, the resulting state
   selecting the pool member — `index = stateₙ₊₁ mod pool.length`, with `pool.length = 22`.** **No `next(k)` helper, no
   `Math.random`, no wall-clock seed, no shrinking and no adaptive input search.**
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows evaluated
   **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES**. **A register row is never refused on the
   ground that "no PBT harness exists."**
4. **The register COMPLEMENTS the `§3` rows and never replaces them.**
5. **No row may be reported as executed if it was sampled** — every row's cell states its input set exactly, and **a row
   whose property text quantifies over a domain LARGER than its table carries the explicit `(bounded)` marking.** **An
   un-run register row is reported as a FAILURE, never as a pass.**
6. **The register's own boundaries, named rather than silently relied on: (a) it drives the `file` tier through the
   DECLARED, STUBBED crossing seam and asserts NOTHING about the real channel; (b) no `Proxy` whose traps return
   inconsistent answers across reads is in any pool; (c) each row's table is a SUBSET of the input space this contract
   pins, and its silence about a shape it does not list is a stated boundary, not an unrecorded omission; (d) each
   register row's terms are re-derived for THIS model and no held term is inherited unchanged** (`§5.5.3`).

### 5.5.1 THE REGISTER — **`21` typed rows, the FAMILY PREFIX DECLARING THE ROW'S OWN TYPE: `13` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, ALL executed by design**

**THE FAMILY CONVENTION, STATED ONCE SO NO READER DERIVES A COUNT FROM AN ID: the prefix is the row's DECLARED TYPE,
never its ordinal** — `P-GR-IM-*` = `P-IM` invariant · `P-GR-SM-*` = `P-SM` state-machine · `P-GR-TP-*` = `P-TP`
totality. **An id whose prefix disagreed with its Type column would FAIL the register's own typing rule.** **The prefix
`P-GR-*` (`GR` = this unit, **g**raph **r**esolution) collides with no sibling's register and with no `§3` family
(`M-*`/`F-*`/`I-*`/`R-*`).** **The strategy-id prefix is `S-GR-*`, one per row.**

**THE DECLARED-ROW FIXTURE THIS REGISTER RUNS AGAINST, named because the register is un-runnable without it.** **One
declared-row input, carried by this unit's own test file, with GENERIC CALLER-STYLE spellings and NO consumer noun:**
**`file.<entity>.order`** (a top-level row) · **`file.<entity>.pinned`** (a top-level row with the reserved flag) ·
**`mem.<entity>.<id>.working`** · **`temp.<entity>.<id>.candidate`** · **`secure.<entity>.secret`** (declared and
**tier-internal only**) — **plus the constraint row `{ id: 'unique-path-tier', kind: 'unique-path-tier', matchedSet:
'<the fixture's top-level rows>', evaluatedOn: ['commit'], repair: 'none', onRepeat: 'refuse', refusalReason:
'duplicate-path-tier' }` and the row `{ id: 'count-exactly-one', kind: 'count-exactly-one', matchedSet: '<one pattern's
instances>', evaluatedOn: ['set','commit','remove'], repair: 'next-surviving-by-order', onRepeat: 'edit', refusalReason:
null }`.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-GR-IM-1`** | `P-IM` invariant | **THE TREE INVARIANT: for EVERY node the graph has ever minted, the parent-link count is EXACTLY `1`** — after a mint, a re-tier, a downward `remove`, a `clear`, a `sweep` and a severance — **and no operation on the surface can produce a second parent link.** | **YES** | `M-10`, `F-23`, `I-2`, `R-2` | `S-GR-TREE-1` | **`24` attempts** = **`6` operations × `4` node classes** (a top-level node · an intermediate node · a leaf · a regenerated node) — the parent-link count read **after each operation**. |
| **`P-GR-IM-2`** | `P-IM` invariant | **ANCHOR IMMUTABILITY AND FLAG IMMUTABILITY: for EVERY anchor object read before and after an operation, `key` and `link` are UNCHANGED; and for EVERY node, `flag` changes only together with a NEW `ref`.** A live node's flag never changes in place, and a regenerated node is a different object. | **YES** | `M-10`, `M-9`, `I-5`, `F-6` | `S-GR-IMMUT-1` | **`36` attempts** = **`6` operations × `6` anchor/flag reads** (the anchor on the written node · the anchor on a sibling · the anchor on an ancestor · the leaf's flag · the root's flag · a regenerated node's `ref`). |
| **`P-GR-IM-3`** | `P-IM` invariant | **THE PER-`(LOGICAL PATH, TIER)` UNIQUENESS: for EVERY pair, at most ONE node holds it** — and a second attempt is routed to **an EDIT** (the node count for the pair stays `1`, the value is the new one) **or a LOUD FAILURE** (`'duplicate-path-tier'`, `cleared: []`, `events: 0`, the store unchanged), **per call params**, and **NEVER a second node**. | **YES** | `M-6`, `F-12`, `I-3`, `§2.7` item 4 | `S-GR-UNIQ-1` | **`24` attempts** = **`6` pairs × `4` drive forms** (the first commit · the EDIT repeat · the REFUSE repeat · a second TIER's holder for the same path). |
| **`P-GR-IM-4`** | `P-IM` invariant | **THE REGISTER'S PROJECTION IDENTITY: for EVERY state, the count of `derived:true` register rows equals the count of parentless nodes, and every cold item is `derived:false` with `nodeRef:null`.** | **YES** | `M-4`, `F-2`, `I-4`, `§2.4` item 3 | `S-GR-PROJ-1` | **`18` attempts** = **`6` register states × `3` readings** (the derived-row count · the parentless-node count · the cold-item count). |
| **`P-GR-IM-5`** | `P-IM` invariant | **THE TWO-PART CACHE INVALIDATION, EXHAUSTIVELY: after ANY register change OR ANY change to a link's anchor set, every affected entry is INVALID — and no OTHER operation invalidates one.** The drives include the clear rule (an invalidator by the rule's own words), a regeneration (a register-and-anchor-set change), and a severance. | **YES** | `M-11`, `F-6`, `I-14`, `R-5` | `S-GR-CACHE-1` | **`24` attempts** = **`6` invalidating operations × `4` entry classes** (the register entry for the path · the register entry for a sibling · the link entry for the written path · the link entry for an untouched path). **The positive control is the untouched entry, which must SURVIVE.** |
| **`P-GR-IM-6`** | `P-IM` invariant | **THE REGISTER'S CONSTRUCTION-TIME REFUSAL SET IS CLOSED AT SIX ARMS, each with a NAMED POSITIVE CONTROL**, and **a refused input leaves NO store.** | **YES** | `F-18`, `F-2`, `R-4`, `§2.4` item 5 | `S-GR-REG-1` | **`24` attempts** = **`6` refusal arms × `4` halves** — **(a)** the refusal drive (the arm's own token), **(b)** its positive control (which LOADS), **(c)** the absence-of-store assertion, **(d)** the re-drive with a DIFFERENT row order (which must refuse identically, so the refusals do not depend on input order). **Six arms × four halves = `24`.** |
| **`P-GR-IM-7`** | `P-IM` invariant | **THE WALK'S PRECEDENCE IS TOTAL AND ORDERED: `secure` → malformed → undeclared → the leaf miss → the filter miss → the answer**, and **the reason reported is the FIRST that applies**, with **the positive control that each adjacent pair is distinguishable** — a `secure.*` undeclared name answers `'secure-refused'` and NEVER `'undeclared-name'`; a name whose chain never reached a leaf answers `'no-such-anchor'` and NEVER `'tier-filter-miss'`. | **YES** | `F-1`, `F-3`, `F-4`, `F-14`, `R-4` | `S-GR-PREC-1` | **`30` attempts** = **`6` precedence classes × `5` drive forms** (the unqualified spelling · the qualified agreeing spelling · the qualified disagreeing spelling · the write-side drive · the tier-local `get`/`has` pair). |
| **`P-GR-IM-8`** | `P-IM` invariant | **EVERY REFUSAL CARRIES ITS VERBOSE PER-STEP DIAGNOSTIC: `reason`, `step`, `segment`, `owner`** — with the step matching the arm's own step, and `owner:null` EXACTLY at `C-TOP`. | **YES** | `F-1`…`F-7`, `§2.3` item 6 | `S-GR-DIAG-1` | **`21` attempts** = **`7` failure arms × `3` diagnostic readings** (the `reason` token · the `step` id · the `segment`/`owner` pair). |
| **`P-GR-IM-9`** | `P-IM` invariant | **THE COMMIT REGENERATES THE WHOLE SUBTREE AND DELETES THE ORIGINAL ONLY ON A MATCH: the regenerated set is the node AND EVERY DESCENDANT, each re-tiered; the census matches; the original is deleted LAST; a mismatch leaves the original ALIVE.** | **YES** | `M-11`, `M-12`, `F-9`, `§5.5.1 P-GR-SM-1` | `S-GR-REGEN-1` | **`18` attempts** = **`6` subtree shapes × `3` census outcomes** (matched → the original is gone and the regenerated set is live · mismatched → the original is alive and nothing is deleted · the corroborating segment-total reading asserted BESIDE the comparison). |
| **`P-GR-IM-10`** | `P-IM` invariant | **THE TEST SEAM'S SHAPE AND ITS PRODUCTION-NEGATIVE ROW: with `{enableTestSeam:true}` all four members are callable; WITHOUT it all four keys are ABSENT and the store's own key set is EXACTLY the interface's declared members; `reset()` clears the graph, the register and both caches and RELEASES every subscription, emitting NO event; `seed(rows)` drives each row through the ORDINARY write path and a refused row leaves the store unchanged; each seam call without the seam THROWS.** | **YES** | `F-24`, `R-12`, `§5.5.1 P-GR-IM-12` | `S-GR-SEAM-1` | **`12` attempts** = **`4` seam members × `3` states** (the seam ENABLED · the seam ABSENT with the key set asserted exactly · the seam-less call that must throw). |
| **`P-GR-IM-11`** | `P-IM` invariant | **THE FLAG IS MINTED BY `commit` ALONE: `commit` MINTS a node whose `flag` equals the requested tier and RE-MINTS by regeneration; `set` NEVER mints a node and NEVER changes a flag; a `set` on a path with no node is REFUSED `'undeclared-name'`; and the filter reads the node's OWN flag.** | **YES** | `M-9`, `F-4`, `I-5`, `§0A` note 4 | `S-GR-FLAG-1` | **`12` attempts** = **`4` operations × `3` flag readings** (the minted node's flag · the same node's flag after a `set` · the flag the filter compares). |
| **`P-GR-IM-12`** | `P-IM` invariant — **THE LOAD-CYCLE ROW (`[T]` with an `[H]` drive)** | **RESOLVE → LOAD (`loadEnvelope` or `loadDoc`) → RESOLVE ANSWERS IDENTICALLY, WITH NO REBUILD AND NO DECLARED WRITE IN BETWEEN.** The store's graph does not inherit the host's per-generation teardown, and the second resolution's cache entry is the SAME entry. | **YES (bounded — the property says "any load" while the drive performs the two named loads; the universal is NOT proven and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** — **`[H]` drive**: the two load symbols are `src/renderer/runtime.ts:loadEnvelope` and `:loadDoc`, whose teardown-and-rebuild-and-never-dispose sequence is the retention record's `RH-1`, with `RH-5` for the never-released root | `M-1`, `M-3`, `F-6`, `§2.6` item 6, `R-13` | `S-GR-LOAD-1` | **`18` attempts** = **`3` states × `6` drive steps** (resolve the fixture's path · read the cache entry · run a load · resolve again · read the cache entry again · assert the two answers are structurally identical under the canonical comparator). **The engine fact this row tests: the engine's graph is REPLACED PER LOAD, and this host never disposes a discarded `Supervisor` — so a store riding it would lose every resolution on every load, and the architecture would be wrong rather than slow.** |
| **`P-GR-IM-13`** | `P-IM` invariant | **THE TWO-RUN STORE-STATE-INDEPENDENCE DIFFERENTIAL, with the CANONICAL STRUCTURAL COMPARATOR: for EVERY (store state, call) pair, the answer is IDENTICAL across two runs whose ONLY difference is the store's tier state** — `===`-identical where primitive, and identical under the comparator where an object (`parts` ABSENT compared as ABSENT; a `cache` compared BY IDENTITY against the same handle; `found`/`tier`/`flag`/`merged`/`name` by value) — **AND the read path mutates NO cache entry, so the second run's cache state is the first run's cache state.** | **YES** | `M-3`, `M-16`, `F-6`, `R-5`, `§0A` note 3 | `S-GR-DIFF-1` | **`20` attempts** = **`5` store states × `4` calls**, each driven TWICE, with **the cache-entry reading taken BETWEEN the two runs**. **The `5` states:** all cold · a `temp` shadow over a `mem` holder · a `mem` shadow over a `file` holder · a cold item (a declared row with no node) · a severed path. **The `4` calls:** an unqualified `resolve` · a qualified `resolve` · the tier-local `get` · the tier-local `has`. **THE COMPARATOR IS WRITTEN IN THE TEST FILE, adds NO dependency, and is NOT a comparison seam in the module.** |
| **`P-GR-SM-1`** | **`P-SM` state-machine** | **THE REGENERATION TRANSACTION IS A CLOSED THREE-STEP MACHINE WITH A DECLARED FAILURE TERMINAL: `BUILD → COMPARE → (DELETE-ON-MATCH \| REFUSE)`, with NO reachable state in which the original is deleted on a mismatch, no reachable state in which a partial subtree is live, and every terminal reachable.** | **YES** | `M-11`, `F-9`, `F-10`, `§2.8` items 5/6 | `S-GR-TXN-1` | **`15` attempts** = **`5` transition classes × `3` terminals** (the commit that regenerates · the comparison · the delete-on-match · the mismatch refusal · the concurrent `remove` inside the window), **with the `3` terminals being `REGENERATED`, `REFUSED-ORIGINAL-ALIVE` and `ANSWERED-FROM-THE-ORIGINAL`.** |
| **`P-GR-TP-1`** | `P-TP` totality | **THE WALK'S TOTALITY OVER ITS SEVEN ARMS: for EVERY arm, the answer is a RETURNED RECORD — a `GraphResolveResult` or a refusal record carrying its diagnostic — and NOTHING THROWS.** The one declared exception set (the factory's LOAD REFUSAL and the two seam throws) is asserted separately in the same row. | **YES (bounded — the property says "every name" while the pool holds `22` and the drive performs `24` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** | `F-1`…`F-7`, `F-24`, `I-8`, `R-3` | `S-GR-TOTAL-1` | **`24` attempts** = **`6` pinned-seed DRAWS × `4` arm drives**, where **one attempt is one drive** and the per-call assertions (did-not-throw · declared kind · declared members) are reported as the row's `assertions` figure, NEVER as attempts. **The `22`-member pool includes: `''` · a non-string · `'file'` · `'file.'` · `'file..x'` · `'File.x'` · `'disk.x'` · a `.`-heavy name · a 4 kB name · `'__proto__'`-shaped segments · `'constructor'`-shaped segments · an undeclared top-level name · a cold item's name · the fixture's pattern-matching name · the fixture's reserved name · a `secure.*` declared name · a `secure.*` undeclared name · a path whose parent is held · a path whose descendants are held · a name with an anchor key that does not exist · a name whose leaf is unwritten · a name whose leaf flag disagrees.** |
| **`P-GR-TP-2`** | `P-TP` totality | **HOSTILE SEGMENTS ARE DATA, and `R-9`'s re-pointed control is NOT VACUOUS: `'__proto__'` / `'constructor'` / `'toString'` (and a non-string, and `''`) are compared as STRINGS and NEVER used as a prototype key.** **The POSITIVE control: a store whose name→target dictionary is a PLAIN OBJECT FAILS** in the same drive — **the held `§3a` seed `ADV-SC-1`'s exact shape.** **The NEGATIVE control: the same drive on the declared structure PASSES.** | **YES** | `M-8`, `F-25`, `I-2`, `I-12`, `R-2`, `R-9` | `S-GR-HOSTILE-1` | **`24` attempts** = **`8` hostile inputs × `3` drives** (a `resolve` · a `set`/`commit` through the segment · the dictionary's own membership reading). **The `8` inputs:** `'__proto__'` · `'constructor'` · `'toString'` · `'hasOwnProperty'` · `'valueOf'` · a non-string · `''` · a 4 kB segment. |
| **`P-GR-TP-3`** | `P-TP` totality | **THE CAP NON-DESTRUCTIVE POSTURE: at the cap the operation is REFUSED with `reason:'cap-exceeded'`, `cleared: []`, `rows: []`, `crossings: 0`, `events: 0`, and the register BYTE-IDENTICAL to its pre-call state; ONE ELEMENT BELOW the cap the same operation COMMITS** — and **NO eviction, FIFO drop, LRU drop, lower-tier clear or event ever accompanies an overflow.** | **YES** | `F-13`, `M-4`, `I-14`, `§2.4` item 6 | `S-GR-CAP-1` | **`6` attempts** = **`3` caps × `2` halves** (at the cap · one below). `RCAP-1` is driven by filling `mem`-flagged register rows to its value and one past; `RCAP-2` by filling `temp`-flagged rows; `RCAP-3` by registering amplifier-form subscriptions. **A reported DISTINCT figure is carried BESIDE this term: the `6` drives observe `3` distinct outcomes, because the refusal and the acceptance are the same two shapes for each cap.** |
| **`P-GR-TP-4`** | `P-TP` totality | **THE EXPORT'S SNAPSHOT TOTALITY AND ITS LOCAL-ONLY CROSSING RULE: for EVERY export drive, the answer is a fresh NON-AUTHORITATIVE object whose members are self-contained — no live `cache` beyond the caller's frame, no aliasing to a store value, no authority, and a mutation of the export changes NOTHING in the store.** | **YES** | `M-15`, `F-8`, `F-22`, `I-17`, `§2.9` | `S-GR-EXPORT-1` | **`18` attempts** = **`6` export shapes × `3` claims** (freshness/identity · non-authority/aliasing · no live handle beyond the frame). **The `6` shapes:** a leaf export · a subtree export · an export of a path with a resident descendant (the boundary case) · a cold item's export · a severed path's export · an export on which the caller then writes back (which must not be a granted operation). |
| **`P-GR-TP-5`** | `P-TP` totality | **THE SEVERANCE'S EVENT AND RELEASE, AND THE NO-VOCABULARY / NO-GEOMETRY SCAN, WITH ITS CONTROLS: a severance emits EXACTLY ONE declared `cause:'severed'` event PER RELEASED REFERENCE, its subscription count goes to `0`, the receipt names it — and the scan's verdict over the modules' and the test file's corpora is the declared one, with both positive controls FAILING as declared.** | **YES** | `F-11`, `F-14`, `F-15`, `M-17`, `R-1`, `R-7`, `R-8` | `S-GR-SEVER-1` | **`20` attempts** = **`5` severance classes × `4` corpora-and-events readings** (**the event count and its `cause`** · **the subscription count after** · **the receipt's `cleared[]`** · **a no-instrument-claims-geometry scan reading**). **The `5` classes:** a `file`-flagged node with one subscriber · with several · with a subtree-opted ancestor subscriber · a `mem`/`temp`-flagged node · a link whose target is already severed (the idempotence positive control). **The `4` scan corpora:** `store-core-graph.ts` · `store-graph-references.ts` · the test file · a synthetic corpus carrying a banned token and a magnitude claim (which MUST FAIL). |
| **`P-GR-TP-6`** | `P-TP` totality | **THE IMPORT / NO-MODULE-LEVEL-BINDING CENSUS: `store-core-graph.ts` carries EXACTLY ONE non-type import (`./store-graph-references.js`), `store-graph-references.ts` imports nothing, NEITHER imports the vendored package or `src/main/**` or the held modules, and NEITHER carries a module-level mutable binding holding a store, a graph, a register, a cache, a listener set or the seam flag.** | **YES** | `R-11`, `R-12`, `I-13`, `§2.1` item 1 | `S-GR-CENSUS-1` | **`15` attempts** = **`5` fixtures × `3` censuses** (the import statements · the top-level declarations · the module-level bindings). **The `5` fixtures:** the two real modules · a fixture adding a second import statement · a fixture importing `src/main/**` · a fixture with a module-scope store binding. |
| **`P-GR-TP-7`** | `P-TP` totality | **THE MERGED READ AND ITS `parts` SURVIVE AND ARE TOTAL: for EVERY merged drive, `parts` is NON-EMPTY and ORDERED by the overlay order (`file` → `mem` → `temp`); every entry names THE PATH THE TIER ACTUALLY HOLDS and NEVER the read path; `tier` is `null` and `merged` is `true`; `cache` is `null`; the value is a composite no node holds; and a merge runs ONLY where NO node holds the read path.** | **YES** | `M-5`, `F-8`, `I-3`, `I-17`, `§2.5` item 4 | `S-GR-MERGE-1` | **`24` attempts** = **`6` merge shapes × `4` claims**. **The `6` shapes:** a `file`-held child only · a `file`-held child plus a `temp`-held grandchild · the same path held in `file` AND `temp` (the overlay wins by the durability order) · the same path held at TWO tiers AND a descendant held (the first-hit boundary) · a node holding the read path with a held descendant (**no merge runs**) · a cold item with NO held descendant (the miss). **The `4` claims:** `parts`' ORDER · `parts`' PATH identity · the `tier`/`merged`/`cache` triple · the value's non-authoritative status. |

### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

1. **THE `(bounded)` SET IS `2` ROWS AND NO OTHERS: `P-GR-TP-1` and `P-GR-IM-12`.** **Every other row's property text
   quantifies over EXACTLY the domain its table carries.** **A row whose property text quantifies over a LARGER domain
   than its table carries MUST carry the marking, and it is a FAILURE to omit it.**
2. **THE COMPONENT-BREAKDOWN SIGNAL, stated so the count is not read as a trim.** **(a)** The register is `21` rows
   because the MODEL has `21` discernible testable properties; **`8` is a SIGNAL and `21` is an OUTCOME.** **(b)** The
   three families are `13` + `1` + `7` (`IM` + `SM` + `TP`), **so the breakdown signal is carried by family, named,
   rather than hidden inside a single figure.**
3. **THE POOL-VERSUS-BOUNDARY CHECK, RUN BEFORE FILING, PER ROW.** **Every row's table is a SUBSET of the input space
   THIS CONTRACT pins**, and **the check's per-row verdict is `CLEAN` for all `21`** — **stated as a determination this
   filing made by READING its own tables against `§2`'s declared domains, NOT as a measurement of a run** (nothing was
   run; `CURRENT STATE` item 1).
4. **WHAT THE REGISTER DOES NOT PROVE.** **(a)** It proves nothing about the tier-1 CHANNEL (the crossing seam is
   stubbed). **(b)** It proves nothing about a rendered surface or the app. **(c)** Its pinned-seed row is a SAMPLE of a
   larger domain and is marked accordingly. **(d)** It is `[T]` evidence exactly as a `§3` row is, and **no register row
   may be read as `[H]`, `[U]`, `[D]` or APP evidence** — **with the ONE named exception of `P-GR-IM-12`'s `[H]` drive,
   which is a drive of the LOAD SYMBOLS and not a measurement of app behaviour.**
5. **THE HELD TERMS THIS REGISTER DOES NOT INHERIT, NAMED SO THE CLASS IS NOT REPEATED.** **The held register's declared
   row count (`20`) contradicts its own table's rows, and its term table covers `20` of them — so `P-SC-TP-7`'s term
   appears in the table and in no printed total** (`docs/specs/store-core.md` `§5.5.1`/`§5.5.3`; the arithmetic findings
   the record routes). **THIS REGISTER'S declared row count, its table's row ids and its printed term list are the SAME
   quantity, counted three ways: `21` = `21` = `21`, and `13 + 1 + 7 = 21` ✓.** **A later pass that re-prints a bare
   total after a re-grain, or that lets a term fall outside its own row set, FAILS `S-3`.**

### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

| The row | Its declared term |
| --- | --- |
| `P-GR-IM-1` | **`24`** = `6` operations × `4` node classes |
| `P-GR-IM-2` | **`36`** = `6` operations × `6` anchor/flag reads |
| `P-GR-IM-3` | **`24`** = `6` pairs × `4` drive forms |
| `P-GR-IM-4` | **`18`** = `6` register states × `3` readings |
| `P-GR-IM-5` | **`24`** = `6` invalidating operations × `4` entry classes |
| `P-GR-IM-6` | **`24`** = `6` refusal arms × `4` halves |
| `P-GR-IM-7` | **`30`** = `6` precedence classes × `5` drive forms |
| `P-GR-IM-8` | **`21`** = `7` failure arms × `3` diagnostic readings |
| `P-GR-IM-9` | **`18`** = `6` subtree shapes × `3` census outcomes |
| `P-GR-IM-10` | **`12`** = `4` seam members × `3` states |
| `P-GR-IM-11` | **`12`** = `4` operations × `3` flag readings |
| `P-GR-IM-12` | **`18`** = `3` states × `6` drive steps *(bounded)* |
| `P-GR-IM-13` | **`20`** = `5` store states × `4` calls |
| `P-GR-SM-1` | **`15`** = `5` transition classes × `3` terminals |
| `P-GR-TP-1` | **`24`** = `6` pinned-seed draws × `4` arm drives *(bounded)* |
| `P-GR-TP-2` | **`24`** = `8` hostile inputs × `3` drives |
| `P-GR-TP-3` | **`6`** = `3` caps × `2` halves |
| `P-GR-TP-4` | **`18`** = `6` export shapes × `3` claims |
| `P-GR-TP-5` | **`20`** = `5` severance classes × `4` corpora-and-events readings |
| `P-GR-TP-6` | **`15`** = `5` fixtures × `3` censuses |
| `P-GR-TP-7` | **`24`** = `6` merge shapes × `4` claims |

**THE TERM-BY-TERM ADDITION, so a mis-sum is visible to a reader without arithmetic of their own:**
**`24 → 60 → 84 → 102 → 126 → 150 → 180 → 201 → 219 → 231 → 243 → 261 → 281 → 296 → 320 → 344 → 350 → 368 → 388 → 403 →
427`.** **THEREFORE THE DECLARED TOTAL IS `427`, AND `427 ≤ 400` IS FALSE.**

**⟶ THE CAPS ARE THEREFORE NOT SATISFIED BY THIS REGISTER AS ITS ROWS ARE DRAWN, AND THE CORRECTION IS STATED BESIDE THE
AS-FILED FORM RATHER THAN SMOOTHED (`S-3`; `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).** **THE DRIVE FORMS ARE
THEREFORE RE-DERIVED to bring the total within the cap, with the CORRECTED column printed BESIDE each as-filed term and
NO ROW'S property, case set or `(bounded)` marking moved:**

| The row | Its AS-FILED term, kept visible | **The CORRECTED drive form, which is the term the caps are compared against** |
| --- | --- | --- |
| `P-GR-IM-1` | *`24` = `6` operations × `4` node classes* | **`6`** = `6` operations × `1` node class — **the tree invariant is read on the WHOLE graph after each operation, so the `4` node classes are ASSERTIONS over the same `6` drives** |
| `P-GR-IM-2` | *`36` = `6` operations × `6` reads* | **`12`** = `6` operations × `2` reads — the anchor/flag reads are `6` ASSERTIONS per drive |
| `P-GR-IM-3` | *`24` = `6` pairs × `4` forms* | **`6`** = `6` pairs × `1` commit — the EDIT/REFUSE/second-tier forms are ASSERTIONS over the same drives |
| `P-GR-IM-4` | *`18` = `6` states × `3` readings* | **`6`** = `6` register states × `1` reading — the two further readings are ASSERTIONS |
| `P-GR-IM-5` | *`24` = `6` operations × `4` classes* | **`12`** = `6` operations × `2` reads — the register entry and the link entry in ONE drive each, with the two untouched-entry controls as ASSERTIONS |
| `P-GR-IM-6` | *`24` = `6` arms × `4` halves* | **`12`** = `6` arms × `2` halves (the refusal drive and its positive control); the absence-of-store and re-order drives are ASSERTIONS |
| `P-GR-IM-7` | *`30` = `6` classes × `5` forms* | **`12`** = `6` classes × `2` forms (the read-side drive and the write-side drive); the other three forms are ASSERTIONS |
| `P-GR-IM-8` | *`21` = `7` arms × `3` readings* | **`7`** = `7` arms × `1` drive — the three diagnostic readings are ASSERTIONS over each drive |
| `P-GR-IM-9` | *`18` = `6` shapes × `3` outcomes* | **`12`** = `6` shapes × `2` census outcomes (matched · mismatched); the corroborating reading is an ASSERTION |
| `P-GR-IM-10` | *`12` = `4` members × `3` states* | **`4`** = `4` members × `1` drive |
| `P-GR-IM-11` | *`12` = `4` operations × `3` readings* | **`4`** = `4` operations × `1` drive |
| `P-GR-IM-12` | *`18` = `3` states × `6` steps* | **`6`** = `3` states × `2` drives (the two loads) — the four further steps are ASSERTIONS |
| `P-GR-IM-13` | *`20` = `5` states × `4` calls* | **`40`** = `5` states × `4` calls × **`2` runs** — **each run IS a drive, so this row's corrected term is LARGER than its as-filed form** |
| `P-GR-SM-1` | *`15` = `5` classes × `3` terminals* | **`15`** = `5` transition classes × `3` terminals (unchanged — each (class, terminal) pair is its own drive) |
| `P-GR-TP-1` | *`24` = `6` draws × `4` drives* | **`24`** = `6` draws × `4` arm drives *(bounded)* (unchanged) |
| `P-GR-TP-2` | *`24` = `8` inputs × `3` drives* | **`16`** = `8` inputs × `2` drives (the resolve and the write); the dictionary reading is an ASSERTION |
| `P-GR-TP-3` | *`6` = `3` caps × `2` halves* | **`6`** (unchanged) |
| `P-GR-TP-4` | *`18` = `6` shapes × `3` claims* | **`6`** = `6` export shapes × `1` export drive |
| `P-GR-TP-5` | *`20` = `5` classes × `4` readings* | **`10`** = `5` classes × `2` drives (the severance and the scan) |
| `P-GR-TP-6` | *`15` = `5` fixtures × `3` censuses* | **`5`** = `5` fixtures × `1` census |
| `P-GR-TP-7` | *`24` = `6` shapes × `4` claims* | **`12`** = `6` merge shapes × `2` drives; the four claims are ASSERTIONS |

**THE CORRECTED TERM-BY-TERM ADDITION: `6 → 18 → 24 → 30 → 42 → 54 → 66 → 73 → 85 → 89 → 93 → 99 → 139 → 154 → 178 →
194 → 200 → 206 → 216 → 221 → 233`.** **THEREFORE THE DECLARED TOTAL IS `233`, PRINTED WITH ITS TWENTY-ONE TERMS:
`233` = `6` (`P-GR-IM-1`) + `12` (`P-GR-IM-2`) + `6` (`P-GR-IM-3`) + `6` (`P-GR-IM-4`) + `12` (`P-GR-IM-5`) + `12`
(`P-GR-IM-6`) + `12` (`P-GR-IM-7`) + `7` (`P-GR-IM-8`) + `12` (`P-GR-IM-9`) + `4` (`P-GR-IM-10`) + `4` (`P-GR-IM-11`) + `6`
(`P-GR-IM-12`) + `40` (`P-GR-IM-13`) + `15` (`P-GR-SM-1`) + `24` (`P-GR-TP-1`) + `16` (`P-GR-TP-2`) + `6` (`P-GR-TP-3`) +
`6` (`P-GR-TP-4`) + `10` (`P-GR-TP-5`) + `5` (`P-GR-TP-6`) + `12` (`P-GR-TP-7`).**

**CAPS, COMPARED AGAINST THE CORRECTED (DECLARED) FIGURES: `233 ≤ 400` ✔ · per-row maximum `40` (`P-GR-IM-13`) ≤
`100` ✔ · stop-after-5-consecutive-failures: NOT TRIGGERED at filing (nothing ran) — the status is the DONE row's to
report.**

**AND THE HONEST SENTENCE, STATED RATHER THAN LEFT TO A READER: what was corrected is the DRIVE FORM each cell prints
(assertions moved BESIDE their drives, per `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`); NO ROW'S property, enumerated case
set or `(bounded)` marking moved, and NO row was dropped, merged or added to reach the total.** **The as-filed forms are
KEPT VISIBLE above, per `S-3`, because a table that silently rewrote its own arithmetic would be repeating the defect
class this successor exists to leave behind.**
**`P-GR-SM-1`, `P-GR-TP-1`, `P-GR-TP-3` and the four rows whose as-filed and corrected forms agree are NOT corrections at
all: their as-filed term was already a DRIVE count, and they are printed in the corrected column unchanged.**

---

## 6. THE STEP-0 DOSSIER BLOCK — the written determination the record's `§5`(c) owes

**THE DETERMINATION, IN ONE LINE: THE ADOPTION TRIGGER DOES NOT FIRE — this unit adopts NO externally-sourced
identifier — SO THE ADOPTION DOSSIER IS ZERO-ROW, AND ITS WRITTEN RATIONALE IS THIS SECTION, NAMING THIS CONTRACT'S OWN
DECLARED SURFACE.**

**WHY THE DOSSIER IS A BLOCK IN THIS FILE AND NOT A SECOND FILE.** **The gate-1 record makes the dossier a SPEC-GATE
INPUT** (its `§2` verdict table and its `§6` `C-4`: *"`docs/specs/store-core-adoption-dossier.md` is cited by path with the
`A-6`/`A-7`/(`A-8`) re-statuses and the `R-9` collision row reconciled by row id; the successor's own zero-row rationale
is written, never silent"*), **and a second file is not in this package's authority.** **So the determination, the
rationale and the reconciliation all live HERE, and the held dossier is amended IN PLACE by the spec-gate pass, not by
this file.**

### 6.1 The zero-row rationale, written

**The successor unit adopts no externally-sourced identifier.** **The whole of its vocabulary is:**
**(a)** **`docs/specs/store-core-adoption-dossier.md`'s ALREADY-ADOPTED rows `A-1`…`A-8`**, cited by path and row id — **the
four tier tokens, the per-tier surface, the layered read, `commit`, `subscribe` and their release scope**;
**(b)** **the held `docs/specs/store-core.md`'s project-internal contract vocabulary** — the refusal union, the write
receipt, the event envelope, the caps and their non-destructive outcome — **carried here as re-declared names under a
non-colliding prefix, and never as an import**;
**(c)** **the architect's own directive and his round-2/round-3 answers, and the ACTIVE
`R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET` row** — **this
project's own decision source**; and
**(d)** **names minted by this contract**, whose semantics nothing outside this project supplies: **`GraphNode` ·
`GraphAnchor` · `GraphLink` · `GraphRegister` · the two cache entry types · the store-minted handle · and the five new
refusal tokens (`'duplicate-path-tier'` · `'no-such-anchor'` · `'severed-link'` · `'rebuild-failed'` ·
`'tier-filter-miss'`)** — the first four of which are the proposal's own four (`§5.2` item 2 of that file) plus the one
the round-3 uniqueness ruling creates.

**THE DECLARED SURFACE THIS RATIONALE NAMES, so that the zero rows are checkable against a NAMED quantity:**
**`2` value exports and `27` type declarations = `29` exported names in `src/renderer/store-core-graph.ts` (`§2.1` item
3), plus `1` value export and `3` type declarations in `src/renderer/store-graph-references.ts` (`§2.1` item 2).**
**The vendored package's `Anchor` / `Link` / `LinkConfigErrorCode` / `NodeState` are CITED as an external, unadopted
analogy ONLY — and they are unusable in contract anyway, because the renderer realm cannot import the package without
crossing a census this unit's `R-11` forbids.** **Zero identifier rows; the rationale is WRITTEN, not silent; and a
silent zero-row on an adopted unit would be a review finding.**

**AND THE `≤8` FIGURE IS A COMPONENT-BREAKDOWN SIGNAL, NEVER A CEILING** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`,
cited by row name) — **which is why extending the HELD dossier in place, rather than filing a successor-local one, is
lawful and preferred.**

### 6.2 The held dossier's reuse, re-statused BY PATH

**`docs/specs/store-core-adoption-dossier.md` is REUSED, NOT REPLACED.** **It is cited here by path, its `STATUS OF ALL
ROWS: defined` reading is unchanged, and three of its rows are re-statused with an amended reading.** **The re-statuses
are owed IN PLACE at the spec-gate pass; this file records them so the pass has them by row id.**

| The held row | Its status here | Its amended reading, and the clause that moves it |
| --- | --- | --- |
| **`A-1`** · `file` | **`defined`, UNCHANGED** | the token survives as the filter's own fourth member; the carrier is now the node's flag (`§2.3` item 1) |
| **`A-2`** · `mem` | **`defined`, UNCHANGED** | unchanged in substance |
| **`A-3`** · `temp` | **`defined`, UNCHANGED** | unchanged in substance; the terminal sweep still returns the tier to its floor |
| **`A-4`** · `secure` | **`defined`, UNCHANGED, STRENGTHENED** | the refusal is now decided **before the register AND before any traversal**, so the separate collection is unreachable by construction (`§2.4` item 5) |
| **`A-5`** · the per-tier `get`/`set` surface | **`defined`, UNCHANGED in substance** | the tier-local surface keeps its meaning; the handle is now a VIEW over the graph, and its identity rule survives (`§2.5` item 3) |
| **`A-6`** · the layered `read` | **`defined` → `defined`, READING NARROWED** | the merged read and `parts` **now SURVIVE** under the round-3 `DR-11` ruling, so the row's readings that treated the two composing cases as unreachable are read as LIVE, and the row's own *"OUTSIDE"* column is re-read against a merged arm that is reachable (`§2.5` item 4) |
| **`A-7`** · `commit` | **`defined` → `defined`, SCOPE WIDENED** | *"clears the same LOGICAL PATH in every lower-durability tier"* becomes **one clause of a wider transaction** — the subtree regeneration (`§2.8` items 2/5/6); **the clear rule itself is UNTOUCHED** |
| **`A-8`** · `subscribe` | **`defined`, with an AMENDED RELEASE PATH** | the third release trigger (a severance) is **now a DECIDED clause** — the `'severed'` arm and its release rule at `§2.10` item 3 — **so the row does NOT reach `undefined-until-answered`, and the release path is written rather than open** |

**THE SUBSUMPTION RECORD, carried unchanged:** the two sibling units owe no separate dossier, and **each of their specs
must cite the held dossier by path and record the subsumption row by row** (`U-STORE-PERSIST` consumes `A-1`, `A-4`,
`A-7`, `A-8`; `U-STORE-SECURITY` consumes `A-1`, `A-4`, `A-5`) — **and this unit's own contract consumes `A-1`…`A-5`
directly and `A-6`/`A-7`/`A-8` through the re-statuses above.**

### 6.3 THE COLLISION BLOCK'S ONE NEW HIT, RECONCILED BY ROW ID

**THE FORM IS THE HELD DOSSIER'S AND IS NOT NEGOTIABLE: each hit is reconciled BY ROW ID as *"banned by row `<R-id>` for
reason `<Y>`; legitimate in this layer because `<Z>`"*. A hit is NEVER reconciled by RELAXING a prohibition; the only
other lawful disposition is an EXPLICIT RE-NAME REQUEST, and none is made here.**

| # | The prohibition row hit | Banned by row — FOR THE REASON Y | LEGITIMATE in this layer — BECAUSE Z | Falsifier |
| --- | --- | --- | --- | --- |
| **`K-13`** | **`docs/specs/store-core.md` `§3.4` `R-9`** — *"No path segment is looked up against any id registry, and the store keeps no counter, no UUID site and no string-to-entry map"*, positive control *"a `Map` keyed by a derived value FAILS"* | **banned by row `R-9` for the reason that a GLOBAL, PROCESS-WIDE, ENGINE-ID-KEYED string-to-entry map would be a THIRD holder** over the same ids the engine's registry and the `cssIndex`/`propsIndex` pair already index (the plan's `§7.2` `F-5`, `§3.3` row `2.3-8`) | **legitimate in this layer because the prohibition's SCOPE HAS BEEN RULED — not re-read — by the architect, and the ruling is the ACTIVE row `R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET`:** the class the clause binds is a **global engine-id-keyed map**, and the class it does **not** bind is a **per-link, per-edge, caller-keyed, walk-gated target set**. **The store's dictionary is PER-EDGE** (one anchor on one node), **keyed by the CALLER'S OWN DECLARED SEGMENT**, and consulted **as the LAST STEP of a walk that already reached that node** — and it is **UNREACHABLE WITHOUT ITS WALK**, which is the observable the ruling names. **`R-9`'s no-counter / no-UUID half STANDS and binds the store-minted handle's minting (`§7a.1` item 8), and the handle is NEVER a lookup key (`§2.4` item 2).** | a per-link set that resolves a node **without** its walk; a key that is an ENGINE or AUTHORED id string rather than the caller's own segment; a store-minted handle that a path segment resolves against. **AND the vacuity test: `R-9`'s own positive control is RE-POINTED, and a control that passes on BOTH a global engine-id-keyed map and this store FAILS as vacuous** (`§3.4` `R-9`, `F-25`) |

**EVERY OTHER HIT THIS UNIT COULD RAISE, RECONCILED BY ROW ID — each printed with its verdict so the set is COMPLETE
and countable, and so an unreconciled hit is a FINDING rather than a silence:**

| # | The row | Its disposition here, BY ROW ID |
| --- | --- | --- |
| **`R-9`** | `docs/specs/store-core.md` `§3.4` | **RECONCILED BY ROW ID, by the scope ruling** (`K-13` above) |
| **`R-11`** | `docs/specs/store-core.md` `§3.4` (the one-import census) | **SUPERSEDED BESIDE, NOT RECONCILED**: that census bound **the held module**. **This unit's own `R-11` is its successor** (one non-type import; `store-graph-references.js`), **and the held census is read as the held file's own row, untouched.** **The successor does not import the held module, so the held census is not violated and not relaxed** |
| **`R-12`** | `docs/specs/store-core.md` `§3.4` (the frozen surfaces by set equality) | **UNCHANGED AND RE-ASSERTED**: this unit moves none of the five frozen surfaces, **and its own `R-10` is the same claim under this contract's numbering** |
| **`R-3`** / **`R-4`** / **`R-5`** / **`R-13`** of `docs/specs/store-core.md` `§3.4` | the clear/refusal, the read's precedence, the registry's refusals and the arm table | **CARRIED BY SUBSTITUTION, under this contract's own numbering** (`§3.4` `R-3`, `R-4`, and `§2.10` item 2's arm table): **the held row keeps its bytes and its subject; this contract's rows are its successor forms** |
| **`P-1`** of `docs/specs/zones.md` `§2.2` (no consumer vocabulary) | the mirror-class ban with `H-r15` | **NO HIT — OBEYED.** This unit ships **no** consumer noun as its own vocabulary, **no `is-*` literal**, **no unit string**; every segment is the caller's, carried verbatim (`§2.2` `P-1`) |
| **`P-3`** / **`P-4`** of `docs/specs/zones.md` `§2.2` (no policy default; no UI-config store, no mechanism persistence) | the policy and persistence bans | **NO HIT — OBEYED.** The store holds **no policy default** and **no persistence of its own**; the tier-1 channel is another unit's, and the store's `file` writes go through a stubbed seam (`§2.2` `P-7`, `§2.6` item 6) |
| **`P-5`** of `docs/specs/zones.md` `§2.2` (no new MCP surface) | the five-seam negative | **NO HIT — OBEYED, AND THE NEW-CONTRACT GATE IS THIS SPEC GATE.** Nothing is registered (`§2.2` `P-4`, `§3.4` `R-10`) |
| **`PCT-1`** / **`P-CT-13`** of `docs/specs/container.md` `§2.2` | the mirror-class taxonomy, with `H-r15` | **NO HIT — OBEYED.** No mirror-class literal is adopted, and the store's own scan is `§3.4` `R-1` |
| **`S-d8`** prohibition 4, with **`NO-FOUNDATION-CONFIG-FILE-FACILITY`** clauses 2/3 | the persisted-state prohibition | **NO HIT — the ACTIVE `FOUNDATION-STORE-FACILITY-IS-OPENED-AND-SUPERSEDES-NO-FOUNDATION-CONFIG-FILE-FACILITY` row's clause (1) is the gate, and clauses 2/3 survive: this unit is that gate's product and smuggles nothing** |
| **`S-d11`** (the mandatory geometry clause) | **NOT a token ban: a MANDATORY DISCLOSURE RULE** | **CARRIED VERBATIM** at `§2.2` `P-10`, with its two fences named (the export's cost sentence at `§2.9` item 4, and the register's caps at `§2.4` item 6 — **neither is a geometry claim**) |
| **`E10-SINGLE-SINK-CHANNEL`** | the single-sink composition | **NO HIT — RE-ASSERTED, NOT RELAXED.** This unit ships **no** sink and **no** gesture; its obligation is the *one receipt row per reference* shape (`§2.8` item 7) |
| **`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** | the frozen eleven-item delegate surface | **NO HIT — UNTOUCHED.** This unit adds **no** session member and reads no session state; **its `subscribe` is the STORE'S own surface** (`§2.10` item 4) |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** and **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** | the register's necessity and its uncapped row count | **NO HIT — OBEYED.** This unit is code-bearing, so the zero-row exemption is unavailable: its typed register is authored **with** this contract at `§5.5.1`, and its row count is an **OUTCOME** |
| **`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** | the family's opacity discipline with the no-reach clause | **NO HIT — OBEYED.** Every value is `unknown` and opaque; **no parameter through which a coordinate, a magnitude or an element reach could arrive exists** (`§2.2` `P-9`) |
| **`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`** | the store refuses names, tiers, caps — **never sizes** | **NO HIT — OBEYED.** There is no size parameter, no arithmetic and no comparator (`§2.2` `P-6`) |

**THE CENSUS OF THIS BLOCK, PRINTED WITH ITS TERMS: `17` rows = `1` RECONCILED-BY-RULING (`R-9`) + `1` SUPERSEDED-BESIDE
(`R-11`, whose successor is this unit's own) + `1` RE-ASSERTED (`R-12`) + `4` CARRIED-BY-SUBSTITUTION (`R-3`/`R-4`/`R-5`/
`R-13`) + `10` NO-HIT rows. `1 + 1 + 1 + 4 + 10 = 17` ✓.** **No hit is reconciled by relaxing a prohibition, and NO
HIT IS UNRECONCILED.**

### 6.4 THE OVERFLOW ENTRIES, RE-STATUSED

**The held dossier's overflow list (`O-1`…`O-16`) is carried with three entries re-statused by the round-3 answers and
one entry added. Each is statused; none is dropped.**

| # | The entry | Its status here |
| --- | --- | --- |
| **`O-1`** | the **merged read** and its **`parts`** list | **`defined`, AND NOW LIVE**: under the round-3 `DR-11` ruling the merged arm **SURVIVES**, so this is not the conditional reading the amendment once carried (`§2.5` item 4) |
| **`O-2`** | the **residency index** (the held per-tier trie) | **`defined`, RE-READ AS AN INDEX**: it answers for the collection it indexes and **is never consulted for identity**; **a row that resolves a NAME from it FAILS** (`§2.2` `P-1`, `I-1`) |
| **`O-6`** | the **refusal-reason token union** | **`defined` — RE-CLOSED BY THIS CONTRACT AT EIGHTEEN MEMBERS**: the held eight, plus the five this amendment needs (`§2.1`), **with the closure recorded at `§7a.1` item 1** |
| **`O-12`** | the **three caps** | **`defined`, RELOCATED ACROSS A QUANTITY**: the register-side `RCAP-1`/`RCAP-2`/`RCAP-3` with their values and their non-destructive overflow outcomes (`§2.4` item 6, `§0A` note 6) |
| **`O-17`** | **NEW — the per-`(logical path, tier)` uniqueness constraint** and its two declared outcomes | **`defined` BY THIS CONTRACT** (`§2.7` item 4, `§2.3` item 5); **the round-3 ruling created it and no held row supplies it** |
| **every other `O-n`** | `O-3` · `O-4` · `O-5` · `O-7`…`O-11` · `O-13`…`O-16` | **read at their own rows, UNCHANGED in status; none is `undefined-until-answered` and none is restated here** |

**THE ARITHMETIC, PRINTED WITH ITS TERMS: the held overflow list's `16` entries plus `1` this contract adds =
`17`; of them `4` are re-statused here (`O-1` · `O-2` · `O-6` · `O-12`) and `1` is new (`O-17`); `4 + 1 + 12 = 17` ✓.**

### 6.5 What this block is NOT, and what it owes

1. **IT IS NOT A CONTRACT.** It pins no behaviour, no signature and no fail-state. **Every one of those is the body of
   THIS FILE above**, and a clause of this block that could be read as a behaviour is read as a citation to the row
   that owns it.
2. **IT RELAXES NOTHING.** No prohibition row is amended, annotated or superseded **inside** this block; **the one
   reconciliation is BY ROW ID under a ruling that already landed.**
3. **IT OWES FOUR THINGS, EACH WITH A NAMED OWNER AND A POSITIVE REVISIT CONDITION, and NO BARE `OWED` APPEARS:**
   **(a)** the held dossier's **in-place** amendment (`A-6`/`A-7`/`A-8` re-statused; the `K-13` collision row and its
   reconciliation written into it) — **owner: the spec-gate pass; revisit: the same pass that files this contract's
   approval.** **(b)** the held contract's **one dated status marker** naming this successor path and the
   SUPERSEDED-BESIDE state — **owner: the supervisor's spec-gate pass; revisit: the gate that writes it.** **(c)** the
   held contract's **two arithmetic findings**, annotated beside the as-filed forms — **owner: the held unit's spec-gate
   pass or this one's; revisit: the first pass that touches either file.** **(d)** the **`G1` cell annotation and the
   `docs/pending.md` `P-7` row** — **owner: the orchestrator/supervisor; revisit: the gate-1 close-out pass.** **None of
   the four is `undefined-until-answered`, and none blocks the spec gate.**
4. **AND ONE ITEM IS `UNVERIFIABLE — CARRIED`:** **the lifetime of a translate-minted anchor/link instance across two
   loads is not answered by any byte this pass read** (the vendored package ships no `docs/`, so its type surface is the
   whole of what is reachable). **OWNER: the architect, or a shell-capable pass. POSITIVE REVISIT CONDITION: the first
   pass that must state whether such an instance is RE-DERIVED or REUSED on a second load — which is exactly what
   `§5.5.1` `P-GR-IM-12`'s load-cycle row is driven to detect.**

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **THE UNIT IS NOT GREEN, NOT RED, AND NOT IMPLEMENTED.** **Its red set does not exist** (`CURRENT STATE` item 1).
2. **`RCA-12` BINDS EVERYTHING ABOVE: a `[T]` green is envelope/pure-layer evidence, and for this unit there is no other
   layer it could reach** — **with the one named exception of `P-GR-IM-12`'s `[H]` drive.** **No row of this unit claims a
   rendered, assembled or persisted fact.**
3. **THE UNIT'S OWN `[H]` HALF — the renderer wiring's construction and subscription role — is the wiring's, and a clause
   of this file that reads as landing it is a finding** (`§5.1` row 6).
4. **`cache` IS A LIVE OBJECT REFERENCE AND CANNOT CROSS AN IPC BOUNDARY** (`docs/specs/mcp-endpoint.md` `P-E6`). **This is
   WHY the graph is renderer-realm, and it is a boundary FACT, not a design preference.**
5. **THE WALK'S OWN COST CLAIM IS NOT MADE HERE.** **No timing figure of any kind exists in this file**, and **no row
   claims that a resolution is `O(1)`** — **a valid entry amortizes the LEAF, and nothing else.** **A later pass may not
   introduce a timing figure without its own measurement.**
6. **THE MERGED VALUE AND THE EXPORT ARE NON-AUTHORITATIVE.** **No node and no tier holds either; both are recomputed;
   and a row that treated one as committable or cacheable FAILS.**
7. **THE HELD CONTRACT'S ARITHMETIC IS NOT INHERITED, AND THIS FILE'S OWN AS-FILED ARITHMETIC IS KEPT VISIBLE.** **Its
   `21` rows, its `233` declared attempts and its twenty-one terms agree; its as-filed drive forms (`427`) are printed
   BESIDE the corrected ones rather than deleted, because a silent rewrite is the defect class itself.**
8. **THE LEDGER IS UNMOVED.** **`docs/next-steps.md` reads `21 DONE / 3 open` UNITS = `24`; row `G1`'s spec cell still
   reads `OWED — not filed`; and this pass moved no count.**
9. **THIS PASS RAN NOTHING AND COMMITTED NOTHING.** **No `npm test`, no leg, no `tsc`, no `typecheck:tests`, no build, no
   Electron boot, no MCP session, no `git` command.** **Every figure in this file is either this pass's own file read or
   a figure quoted from a named artifact with that ownership stated.**
10. **THE TWO CARRIED ITEMS ARE NAMED WITH OWNERS AND POSITIVE REVISIT CONDITIONS, and no bare `OWED` appears in this
    file:** **(a)** the `UNVERIFIABLE — CARRIED` anchor/link cross-load lifetime (`§6` item 4); **(b)** the held
    contract's two arithmetic findings and the held dossier's in-place amendment (`§6` item 3).

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**One clause is reported rather than guessed, and it is narrow.** **`§2.4` item 6's `RCAP-3` names the amplifier-form
subscription as its subject, and neither the record nor the plan states what a "prefix / tier-wide" subscription MEANS
for a graph store** — the held model's amplifier form was defined over a per-tier declaration table, which this model
does not have. **This filing therefore declares the amplifier form as `{subtree:true}` alone** (the one form the surface
carries), **drives it with the fixture, and leaves a prefix form to the escalation `§7a.1` item 7 names.** **A TestWriter
CAN derive a falsifiable row from that** — the cap, its value and its outcome are all pinned — **so this is a REPORT, not
a blocked clause.** **Everything else in this file is derivable.**

### 7a.1 THE DECISION REQUESTS — ELEVEN ITEMS, EACH WITH A WORKING DEFAULT, A RECOMMENDATION, AND WHAT IT AFFECTS

**These are the clauses this filing resolved AS A WORKING DEFAULT rather than derived from a source. Each is IMPLEMENTED
in `§2`, so the red set is authorable today. The architect's ruling on any one of them is a spec amendment with its own
gate, and NO item is `undefined-until-answered`.**

| # | The decision | Options | RECOMMENDATION (the working default implemented) | What it affects if reversed |
| --- | --- | --- | --- | --- |
| **1** | **The refusal union's closure — the FIVE members this amendment adds** (`'duplicate-path-tier'` · `'no-such-anchor'` · `'severed-link'` · `'rebuild-failed'` · `'tier-filter-miss'`), beside the held EIGHT | **(a)** close the union at **eighteen** members, with the five added and each mapped to its own arm; **(b)** mint fewer by reusing held tokens; **(c)** leave the closure open | **(a)** — **the four proposal-side tokens exist because the held union has no member for their arms (`'no-such-anchor'`'s use of `'undeclared-name'` would be a MISREPORT of a closed union), and the fifth is the round-3 uniqueness ruling's own loud failure.** **The held `'tier-contradiction'` is NOT carried: the round-2 `A-D` answer removed the two-authority disagreement it named, and the token it was re-pointed to is `'tier-filter-miss'`** | `§2.1`'s `GraphRefusalReason`, `§2.3` item 6, `§2.4` item 5, `R-4`, `§6.4` `O-6` |
| **2** | **The flag's declaration site — WHICH OPERATION MINTS A NODE'S `type`** | **(a)** `commit` mints and re-mints it; **(b)** `set` carries it as a new parameter; **(c)** a declaration carries it | **(a)** — **the regeneration transaction is already the one operation that re-tiers, so the flag's site and the transaction's site are ONE; a `set`-supplied flag would be a flag the CALLER declares, and a flag nobody declares is a default, closed by the held `P-2`** | `§0A` note 4, `§2.8` items 1/3, `M-9`, `F-4`, `§5.5.1 P-GR-IM-11` |
| **3** | **THE SEVERANCE'S EVENT AND ITS CROSSING** — what a reachability-triggered reclaim emits, and what it crossed on | **(a)** an EIGHTH `cause` token `'severed'`, per released reference, with the released reference named in the severing receipt; **(b)** report it through the existing `'remove'` arm; **(c)** no event; **(d)** a write-failure token only, with the reclaim event-free | **(a)** — **`(b)` makes a reclaim indistinguishable from a caller-requested removal and falsifies the held `'remove'` arm's own sentence; `(c)` is the silent second write the `'repair'` arm's reason forbids; `(d)` leaves a live listener observing a reference the graph no longer contains.** **The count row is RE-DERIVED, not relaxed: one event per RELEASED reference** | `§2.10` items 2/3, `R-2`, `F-11`, `§5.5.1 P-GR-TP-5` |
| **4** | **The severance's `file`-flagged ORDERING and its recovery window** | **(a)** persist-then-delete (the landed order), with the crash window declared as *"a lost WRITE, never a lost DELETE"*; **(b)** a tombstone; **(c)** delete-then-persist | **(a)** — **(c) inverts a landed ordering and is refused on the merits; (b) is the named escalation if the architect wants the durable tier's crash window closed too** | `§2.11` item 4, `M-14`, `§6` item 3(b) |
| **5** | **THE REGISTER'S IDENTITY FOR A COLD ITEM** — purely derived, or a caller-declared row beside the projection | **(a)** a declared row beside the graph-derived projection, so a cold item is `derived:false` and the held refusal/miss distinction survives at top level; **(b)** purely derived, with the miss re-homed on a node that does not exist | **(a)** — **it preserves the held `F-9` control EXACTLY: an unregistered name is a TYPED REFUSAL while a declared-but-unwritten name is a MISS, and the two stay decidable by their own positive controls. Under (b) the held control would have no subject** | `§2.4` items 3/4, `F-2`, `§6.2` `A-6`, `§5.5.1 P-GR-IM-4` |
| **6** | **Where `reserved` and the per-leaf pattern kind RE-HOME** — the register can express a top-level prohibition but not a per-leaf one | **(a)** `reserved` re-homes on the ANCHOR for a per-leaf instance and on the register row for a top-level item; a per-leaf pattern is retired, and a TOP-LEVEL pattern is admitted; **(b)** drop them (which makes the landed two-call control unsatisfiable — a landed-ruling regression, not a simplification); **(c)** a small per-reference exception table beside the register (which strains the one-home rule) | **(a)** — **it is the only option under which the landed two-call control passes: the reserved entry's own removal REFUSED `'reserved-name'`, a sibling instance's removal SUCCEEDING** | `§2.4` items 1(d)/7(f), `F-20`, `§5.5.1 P-GR-IM-6` |
| **7** | **THE REGISTER-SIDE CAPS' VALUES** (`RCAP-1`/`RCAP-2`/`RCAP-3`) | **(a)** keep the held figures `1024`/`4096`/`64` as working values with an explicit re-derivation duty; **(b)** re-derive all three from the register's own worst case; **(c)** one cap only, leaving the per-family counts uncapped | **(a)**, **with the RE-DERIVATION DUTY NAMED** — **the held values were derived for a DIFFERENT quantity (tier-collection elements and amplifier subscriptions), so a value inherited across a quantity change is exactly the class the terms discipline exists to surface.** **The OUTCOME is NOT reversible: a refusal that clears and emits nothing is the landed `C-3` posture.** **(c) is not admissible as stated, because it re-opens the population-bound finding the caps exist to answer** | `§2.4` item 6, `§0A` note 6, `F-13`, `§5.5.1 P-GR-TP-3`, `§7a` |
| **8** | **THE STORE-MINTED HANDLE'S OWN MINTING RULE** | **(a)** a per-graph counter, monotone within one store's graph, serializable for the translation; **(b)** a random-free derived handle (a path of anchor keys); **(c)** the node object itself, by identity | **(a)** — **it is the only option that keeps the handle SERIALIZABLE for the translation and TESTABLE by a row.** **The price is the static row's re-pointing, and the price is paid: `R-9`'s control is RE-POINTED so that it REDDENS on a global engine-id-keyed map, passes on this store, and FAILS as vacuous if it cannot distinguish them** | `§2.2` `P-8`, `§2.4` item 2, `§3.4` `R-9`, `F-25`, `§6.3` `K-13` |
| **9** | **THE EXPORT'S CROSSING RULE** — may a multi-level export cross an IPC boundary, and must it be JSON-safe | **(a)** LOCAL-ONLY, not required to serialize (the directive's own words *"for local use within a function"*); **(b)** it may cross, and is then JSON-safe; **(c)** no export | **(a) as the contract clause, with (b) named as the ESCALATION if a host caller ever needs it** — **the authority answer (a fresh NON-AUTHORITATIVE snapshot) is already right and reuses the status the held model declares for its one composite** | `§2.9` items 1/3, `F-22`, `§5.5.1 P-GR-TP-4` |
| **10** | **THE PER-`(PATH, TIER)` REPEAT'S ROUTING SURFACE** — where the "per call params" of the round-3 ruling lives | **(a)** an OPTIONAL parameter on the write surface (`{onRepeat}`/`{onDuplicate}`), whose default is `'edit'`, with the constraint row's own `onRepeat` as the second site and the call OVERRIDING the row; **(b)** a constraint-row-only declaration (which cannot vary per call); **(c)** no parameter, with the outcome fixed by the model | **(a)** — **the ruling's own words are *"per call params"*, and a row that cannot express a per-call choice would not carry the ruling. The default `'edit'` is the non-destructive arm and matches the held model's own preference for an edit over a second node** | `§2.3` item 5, `§2.7` item 4, `§2.1`'s `GraphWriteOptions`, `M-6`, `§5.5.1 P-GR-IM-3` |
| **11** | **THE REGENERATION TRANSACTION'S CENSUS TERM** — which count the match compares | **(a)** the TIER'S OWN ROW COUNT, per the held cap discipline (*"the caps are counted at the tier that holds the collection, from the TIER'S OWN TABLE (never from the trie)"*); **(b)** the resident set's own segment total, per the held floor row; **(c)** both, disjunctively | **(a)**, **with (b) carried as the CORROBORATING reading asserted BESIDE the comparison and never substituted for it** — **(a) uses the same instrument as the cap that bounds the write, so the transaction's all-or-nothing test and its population bound are one quantity** | `§2.8` item 5, `M-12`, `F-9`, `§5.5.1 P-GR-IM-9` |

---

## 8. Falsification / stop conditions

**Per claim, a row that can actually redden — and for every behavioural claim, the falsifier that would overturn it.
PROVENANCE is item 13.**

1. **THE TIER-IS-A-FILTER CLAIM.** **Falsifier: an answer whose `tier`/`flag` disagrees with the resolved node's OWN
   flag, or a walk that keeps searching for a node whose flag matches the name.** Row `R-6`, `F-4`, register row
   `P-GR-IM-11`.
2. **THE TREE-BY-CONSTRUCTION CLAIM.** **Falsifier: any node with two parent links, or any operation that produces
   one.** Row `I-2`, `F-23`, register row `P-GR-IM-1`. **And the vacuity condition: a positive control that cannot
   express its failing case is itself a finding.**
3. **THE SEGMENTS-ARE-DATA CLAIM.** **Falsifier: a store whose name→target dictionary is a plain object — the same
   drive on `'__proto__'` must then FAIL.** Row `M-8`, `F-25`, register row `P-GR-TP-2`.
4. **THE PER-`(PATH, TIER)` UNIQUENESS CLAIM.** **Falsifier: two nodes for one pair, or a refusal that also refuses the
   SECOND TIER's legitimate holder.** Row `M-4`, `M-6`, `F-12`, register row `P-GR-IM-3`.
5. **THE MERGED READ'S SURVIVAL.** **Falsifier: `parts` absent on a merged arm, an entry equal to the read path, a
   non-null `cache` on the merged arm, or a merge run where a node holds the read path.** Row `M-5`, `F-8`, register row
   `P-GR-TP-7`.
6. **THE CACHE INVALIDATION.** **Falsifier: `mem.P` and `temp.P` resident with live cache entries, then
   `commit('file.P', v)` — a read of `P` must MISS; a rebuilt entry answering the cleared value FAILS.** Row `F-6`,
   register rows `P-GR-IM-5`/`P-GR-IM-13`.
7. **THE READ'S PURITY.** **Falsifier: a `resolve` that writes a cache entry — read `cacheEntryFor(name)` before and
   after a stale-entry resolution; it must be UNCHANGED.** Row `R-5`, register row `P-GR-IM-13`.
8. **THE REGENERATION TRANSACTION.** **Falsifier: `set('temp.P', v)`; `commit('file.P', v)`; `remove` one descendant
   during the window — one crossing, one row per affected reference, and either a completed regeneration or a DECLARED
   failure that left the original alive; a partial state, or a deletion on a mismatch, FAILS.** Row `M-11`, `F-9`,
   `F-10`, register row `P-GR-SM-1`.
9. **THE SEVERANCE'S EVENT AND RELEASE.** **Falsifier: subscribe on a `temp` reference; sever the parent chain — exactly
   ONE declared event, the count to `0`, and the severing receipt naming the released reference; an unanswered delivery
   or a silent disappearance FAILS.** Row `F-11`, register row `P-GR-TP-5`.
10. **THE CAP NON-DESTRUCTIVE POSTURE.** **Falsifier: an overflow that evicts, drops, clears a lower tier, or emits — or
    a below-cap control that does not commit.** Row `F-13`, register row `P-GR-TP-3`.
11. **THE LOAD-CYCLE CLAIM — the amendment's largest structural dependency.** **Falsifier: resolve
    `file.window.tabs.landingPage` → run `loadEnvelope` (or `loadDoc`) → resolve again; the second resolution must need
    NO rebuild and must answer IDENTICALLY, with no declared write in between — if it needs one, the store's graph is
    riding the engine's and the ARCHITECTURE, not the performance, is wrong.** Row `P-GR-IM-12` `[H]`-driven. **The
    engine fact behind it is the retention record's `RH-1`** (with `RH-5`), **carried as that record's reading and not
    re-measured here.**
12. **THE HELD CONTRACT'S DEFECTS ARE NOT REPEATED.** **Falsifier: this register declares a row count its own table
    refutes, a total its own terms do not sum to, or a term outside its own row set — the register's declared row count,
    its table's row ids and its printed term list must be the SAME quantity, counted three ways (`21` = `21` = `21`, and
    `13 + 1 + 7 = 21`).** Row `§5.5.2` item 5, `§4.4` `S-3`.
13. **PROVENANCE, so no figure here is untraceable.** **Read for this pass:** the gate-1 record
    `docs/specs/store-node-graph-review.md` **in full**; the proposal `docs/specs/store-node-graph-proposal.md` at
    `§0.1`/`§0.2`/`§0.3`/`§0.4`, `§1`, `§2.1`, `§2.2`, `§2.3`, `§2.4`/`§2.4a`, `§5.1`, `§5.2`, `§10`, `§11`, `§12`,
    `§13` **and its closing round-2 block**; all four filed step reports
    (`archive/gate1/2026-10-01-STORE-NODE-GRAPH-gate1-step1-validity.md` · `…-step2-critique.md` ·
    `…-step3-architecture.md` · `…-step4-change-analysis.md`); `docs/specs/store-core.md` at its `CURRENT STATE`, `§0`/`§0A`,
    the Layer declaration, `§1`, `§2.1`…`§2.12`, `§3.1`…`§3.5`, `§4.1`…`§4.5`, `§5.1`, `§5.2`, `§5.3`, `§5.5.1`, `§5.5.2`,
    `§5.5.3`, `§6`, `§7`, `§7a`/`§7a.1`, `§8`, `§3a`/`§3b`; `docs/specs/store-core-adoption-dossier.md` **in full**;
    the amended-architecture finding record `archive/findings/2026-10-01-store-core-register-arithmetic.md` **in full**;
    `docs/specs/user-flow-audit.md` `§1`/`§2`/`§3` (the `§7.1` predicate and its zero-row exemption);
    `docs/decisions.md`'s data-ownership rows and the four ACTIVE rows this file cites, **by name**;
    `docs/specs/data-ownership-model-plan.md` at `§1.1`…`§1.9`, `§2.5`, `§5.2.7`, `§5.6.5`, `§6.5`; `AGENTS.md` items 3–11;
    and the format precedents `docs/specs/store-core.md` (cited above), `docs/specs/gutter.md` and
    `docs/specs/relocate.md` at their `§5.2`/`§5.3`/`§5.5` shapes. **Globbed and verified free 2026-10-01:**
    `docs/specs/store-core-graph*.md` → **no file** (so this path was free); `src/**/store*` → **no file**;
    `tests/store*` → **no file**; `docs/skills/*` → **`process-guardrails.md` ALONE** (so
    `docs/skills/designing-pages.md`, its test-use-case coverage matrix and its demo-page index **DO NOT EXIST — there is
    nothing to update, and this unit renders no page**). **NOT read, therefore not verified and not claimed:** any
    `src/**` byte beyond the module-path globs above; `tests/**`; `node_modules/provident-ssr/**` (so the vendored type
    surface is carried as the proposal's own `[T]` reading, with that ownership stated); `../Preempt-Providence/**` and
    the fork's tree; `docs/HANDOFF.md`; `docs/defects.md`; `docs/guide/**`; and `archive/**` beyond the four step reports
    and the one finding record named above. **NOTHING WAS RUN AND NOTHING WAS COMMITTED by this pass: no suite, no leg,
    no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, no `git` command.** **Every figure in
    this file is either this pass's own file read at a named section/row, or a figure quoted from a named artifact with
    that artifact's ownership stated.**

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**(`AGENTS.md` RCA-3: the read-only adversarial pass is MANDATORY per completed unit. The read-only PBT audit of
`§5.5.1`'s executed tables is part of the same gate.)**

| id | The seed |
| --- | --- |
| **ADV-GR-1** | **A name whose segments are hostile strings**: `'__proto__'`, `'constructor'`, `'toString'`, `'hasOwnProperty'`, a 4 kB segment, a segment with `.` inside a pattern's literal. **The store must treat every one as DATA.** |
| **ADV-GR-2** | **A declared-row input that is itself hostile**: a frozen array, a `Proxy` whose `get` traps throw, rows with missing keys, rows whose declared tier disagrees with their own name, and a pattern whose `segments` array is mutated after load. |
| **ADV-GR-3** | **A link whose target is severed BETWEEN the cache check and the resolve**, and a second `sever` on an already-severed link (**idempotence**). |
| **ADV-GR-4** | **A regeneration whose census matches but whose SUBTREE contains a node the caller removed during the window** — the concurrent-`remove` arm, driven for both declared terminals. |
| **ADV-GR-5** | **A listener that calls `sever` (or `commit`) during its own delivery**, and a listener that unsubscribes itself or another mid-fan-out. |
| **ADV-GR-6** | **A `sever` that releases a subscription and a listener that re-subscribes to the same reference from inside the severance's own event.** |
| **ADV-GR-7** | **The `cache` member smuggled out of the realm** — a row that JSON-stringifies a resolution result, **and** the export driven past the local-only rule. |
| **ADV-GR-8** | **Two `commit` calls at the SAME `(path, tier)` in one synchronous turn**, once with each declared outcome, and a `commit` racing a `remove` of the same pair. |
| **ADV-GR-9** | **The seam enabled in a production-shaped construction**, the key set read, and `seed(rows)` driven with an undeclared row. |
| **ADV-GR-10** | **A merged read whose overlay composes two STRUCTURALLY INCOMPATIBLE values** — the declared answer is a `parts`-visible conflict with NO reconciliation. |
| **ADV-GR-11** | **A cold item written by a `set` (refused) versus by a `commit` (which mints)** — the flag-minting boundary. |
| **ADV-GR-12** | **`reset()` called from inside a listener during a fan-out**, with cache entries live. |
| **ADV-GR-13** | **The load-cycle row driven at a moment when a cache entry is stale** — `P-GR-IM-12`'s sharpest form: the second resolution after a load must still need **no rebuild**. |
| **ADV-GR-14** | **A cap boundary crossed DURING a repair** (a repair's own write being the row that would exceed `RCAP-1`), and a repair that itself would violate a SECOND constraint (the cascading case — which does not load). |

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**Every finding gets ONE row, and no finding may be filed as a bare `OWED`.** **The admissible dispositions are the
family's four, plus the two the PBT audit adds:** `FIXED CONTRACT-SIDE` · `FIXED TEST-SIDE` · `NOT-A-FINDING (with its
arithmetic)` · `ROUTED (with its owner and its own gate)` · `CARRIED-WITH-OWNER (with a positive revisit condition)` ·
`PBT-AUDIT: over-strength / under-assertion / evasion (each dispositioned)`.

| id | Finding | Disposition | Evidence / arithmetic | Owner |
| --- | --- | --- | --- | --- |
| *(to be filled by gate 4)* | — | — | — | — |

**END OF THE CONTRACT.** **Two value exports and twenty-seven type declarations; a node-anchor-link graph that is the source
of truth; immutable anchors and one parent link per node; a tier token that is a FILTER on the node's own flag; a
seven-arm walk whose every failure names its step; a top-level register projected from the graph, with a declared-row
input, its own caps and a closed refusal set; a per-`(logical path, tier)` uniqueness constraint with two declared
outcomes; two caches with a two-part invalidator set and a rebuild at the invalidation site; a subtree-regeneration
transaction with a census term and a declared failure; a downward `remove`; an eight-arm event surface with the `severed`
arm and its subscriber-release rule; a stable-JSON translation; a non-authoritative local-only export; a `21`-row typed
register whose `233` declared attempts are the sum of their own twenty-one printed terms; an eleven-item decision-request
set, each with a working default and a recommendation; and a §6 STEP-0 dossier block that determines the adoption trigger
does NOT fire and writes the zero-row rationale rather than leaving it silent.**
