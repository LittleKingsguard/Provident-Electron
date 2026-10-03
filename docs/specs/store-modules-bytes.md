# Spec — `U-STORE-MODULES-BYTES` (`H2a`): the BYTE-MOVING PAIR — `owned-list-host.ts` + `slot-host.ts` go store-backed, each gaining the NEW `dispose()` SUBSCRIPTION-RELEASE obligation

**Unit `H2a` · `U-STORE-MODULES-BYTES` — the first child of the `H2` split; the architect's *"Split per module"* ruling
(2026-10-03, `docs/decisions.md`'s ACTIVE row **`DECIDED: H2 (U-STORE-MODULES) IS SPLIT PER MODULE`**, cited by ROW NAME, with
its `D-GP-SAD-5` decomposition row dispositioned on that record) · derives the two modules' named store obligations from
the four-tier plan's round-3 named-obligation table (`docs/specs/data-ownership-model-plan.md` `§5.2.7`'s round-3 table, rows
**9** and **10**, the BYTE-MOVING pair — `15 = 2 + 6 + 7`, the `2` being THIS pair, `§5.2.7`'s round-3 block and
`§5.6.1`/`§5.6.5`'s recomputed byte terms) · derives the store-side surface from the FROZEN store contract
(`docs/specs/store-core-graph.md` `§2.1`'s `GraphSubscription`/`subscribe`, `§2.8`'s write surface, `§2.10`'s event surface:
the eight `cause` arms, the `subscribe`/`unsubscribe` return shapes, per-reference delivery, and the `'severed'` release arm)
· filed 2026-10-05 (machine clock).**

**THE UNIT'S THREE AUTHORITY CLUSTERS, STATED ONCE.** **(1) THE SPLIT RULING** — `docs/decisions.md`'s
`DECIDED: H2 (U-STORE-MODULES) IS SPLIT PER MODULE` (2026-10-03; its `D-GP-SAD-5` decomposition row: `recommendation =
SPLIT-RECOMMENDED` · `proposed fraction` = the plan's OWN byte terms `15 = 2 byte-moving + 6 caller/seam-side + 7 pure` ·
`boundary (named)` = **(i) THE BYTE-MOVING PAIR** — `owned-list-host.ts` + `slot-host.ts` — whose own records/order go
through the store AND which each gain the NEW `dispose()` subscription-release obligation · **(ii) THE CALLER/SEAM-SIDE
SIX** → `H2b`'s); **the queue row** (`docs/next-steps.md`'s row **`H2a`**, read at its own cell: the two modules' obligations,
the three register rows, the spec path `docs/specs/store-modules-bytes.md` verified free 2026-10-03, and the two DECISIONS
OWED AT THIS SPEC GATE: **(a)** the exact `dispose()` release shape — *"unsubscribe-on-dispose vs the store's own
`sever`/release path"* — and **(b)** whether the two modules land in one red→green cycle or two). **(2) THE PLAN'S NAMED
OBLIGATIONS** — `data-ownership-model-plan.md` `§5.2.7`'s round-3 named-obligation table rows **9** (`owned-list-host.ts`:
"the HOST's own records and order (`mem.list.<hostId>.order` / `.node.<key>`) read and written through the host's own
closures and its injected container source, plus the new `dispose()` release duty" · **BYTES MOVE**) and **10**
(`slot-host.ts`: "the HOST's opaque key→placement/container record (`mem.slots.<hostId>.<key>`)" · **BYTES MOVE** · "the
store must NOT become the container source", `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` unmoved), plus `§5.2.7`'s round-3 item
(4) (the THREE register rows per store-backed module) and `§6.5`'s `U-STORE-MODULES` row (round-2 clause (b)). **(3) THE
FROZEN STORE SURFACE** — `store-core-graph.md` `§2.10` (the event surface), `§2.8` (the write surface), `§2.4` (the
register), `§2.1` (the `GraphStore` interface — **THE STORE IS FROZEN: this unit changes NO byte of it and adds NO member**),
and the two constraint-machinery rows `docs/decisions.md` `CONSTRAINTS-ARE-PASSED-FUNCTIONS` and
`THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION` (cited by ROW NAME; they govern the store-side of
every write these modules' closures make).**

**CITE SECTIONS AND ROW IDS, NEVER LINE NUMBERS, OF ANY FILE; BYTES BY `file:symbol`.** **THIS SPEC CARRIES NO LENGTH
CENSUS OF ANY FILE** (a line-count census drifts on every pass — the sibling convention). **`docs/decisions.md` rows are
cited BY ROW NAME; `docs/next-steps.md` BY ROW ID; `docs/pending.md` BY §/clause.** **ONE FILE, ONE CONCERN: this unit's
concern is the pair's store-backed record contract and its `dispose()` release obligation — the sibling seam-side six are
`H2b`'s (`docs/specs/store-modules-seams.md`, `OWED`) and are OUT OF SCOPE here.**

**LAYER LABELS (`RCA-12`), binding on every behavioural claim below:** **[T]** node suite / pure module layer · **[H]**
this repo's `src/**` · **[U]** the real-DOM `ui` leg · **[D]** the divergence leg · **APP** the assembled app.

---

## CURRENT STATE (2026-10-05) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end note — the
placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY. THE TWO MODULES EXIST AND ARE GREEN AS THEIR OWN LANDED UNITS; THEIR STORE EDGES DO NOT
   EXIST, AND NOTHING OF THIS UNIT IS IMPLEMENTED.** This pass wrote **exactly ONE NEW file — `docs/specs/store-modules-bytes.md`
   (this contract) — and edited NO existing file**: not the two landed module specs, not the plan, not the store contract,
   not a tracker, not `docs/decisions.md`, not `AGENTS.md`, not `package.json`, and no `src/**` or `tests/**` byte.
   **The modules `src/shared/owned-list-host.ts` (`410` lines as read this pass, `7` exports, `0` import statements) and
   `src/shared/slot-host.ts` (`643` lines as read this pass, `7` exports, `0` import statements) are the LANDED artifacts of
   `U-LISTHOST` / `U-SLOTHOST` (their contracts: `docs/specs/listhost.md`, `docs/specs/slothost.md`). Their store edges —
   the reads, writes, subscriptions, the `dispose()` release and the re-grained register rows — ALL DO NOT EXIST YET; the
   test files (`tests/owned-list-host.test.ts` `62` rows as the landed doc-review records, `tests/slot-host.test.ts` `61`
   rows as the landed green note records) carry NO store-backed family yet; and no in-tree `src/**` file imports either
   module (the landed note for each module states `imported by NO src/** file`, so no wiring pass that would hand a store
   to a host exists — the store handle is supplied by this unit's `[T]` harness).** **The unit is **`OWED` at every gate
   after this one**, and it is **NOT delegable until a TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9,
   `§4.5`).** **The store itself is LANDED-GREEN and FROZEN-artifacted** (`store-core-graph.md`, the storage module wave
   `FROZEN` 2026-10-03; `docs/specs/store-core-module-store-core-graph-surface.md` field 8): **this unit changes NO store
   byte (`§2.5` prohibition 2).**

2. **THE SURFACE THIS FILING PINS (none of it exists in `src` yet):** the two factories' **options gain ONE store-shaped
   member and ONE host-identity member** (`§2.1`): the store enters **ONLY as a declared call parameter** (the
   no-module-level-binding row), the modules keep **`0` import statements and their `7`-name export censuses UNCHANGED**
   (the store is injected, never imported — `R3-4`'s point), the modules' closures read/write **`mem.list.<hostId>.order`**
   and **`mem.list.<hostId>.node.<key>`** (`owned-list-host`) and **`mem.slots.<hostId>.<key>`** (`slot-host`), the tier is
   **`mem`** throughout, and **each module's `dispose()` gains the NEW obligation to release every store subscription it
   registered — DECIDED HERE AS UNSUBSCRIBE-ON-DISPOSE** (`§2.2`), **not** the store's `sever` path — with the post-conditions,
   the in-flight rule, the observable proving release, the leak fail-state and its detection pinned.** **The subscriptions:
   `owned-list-host` registers EXACTLY ONE, on `mem.list.<hostId>.order`; `slot-host` registers EXACTLY ONE PER DECLARED
   KEY, on `mem.slots.<hostId>.<key>` — the exact-reference form (§2.4).** **The `slot-host` container source STAYS the
   injected `containerFactory`; the store must NOT become the container source (`§2.3`).**

3. **THE REGISTER (`§5.5.1`): `6` typed rows — `4` `P-IM` + `2` `P-TP` — `79` declared attempts, printed WITH their six
   terms and with a term-by-term addition at `§5.5.3`**, **`6` strategy ids (`S-SMB-*`)**, **NO generator, NO pinned seed,
   NO new dependency** (plain deterministic vitest tables and fixed corpus scans — `AGENTS.md` item 11(d), the `engine-pin`
   precedent) and `0` `(bounded)` rows. **Three rows per module — the plan's `§5.2.7` round-3 item (4) set: (a) the
   IMPORT-CENSUS `P-IM` row with its positive control · (b) the NO-MODULE-LEVEL-BINDING `P-IM` row · (c) the
   STORE-STATE-INDEPENDENCE TWO-RUN DIFFERENTIAL `P-TP` row (COLD / SHADOWING / COMMITTED).** **The caps are compared
   against the DECLARED figures: `79 ≤ 400`; per-row maximum `31` (`P-SMB-LH-TP-1`) ≤ `100`; the `≤8` per-module
   component-breakdown signal is an OUTCOME, not a budget — each module carries exactly `3` of its mandated rows
   (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`).**

4. **THE LEGS THIS UNIT DECLARES (none run): `npm test` `[T]`** — the whole of this unit's green, in **`tests/owned-list-host.test.ts`**
   and **`tests/slot-host.test.ts`** (the store-backed families appended to the landed suites; the landed rows must stay
   green — the re-grain is ADDITIVE) — plus **`npm run typecheck` `[H]`** (`src/**` ONLY — it never reads `tests/**`),
   **`npm run typecheck:tests` `[H]`** (the ADDITIVE fourth leg — the ONLY typecheck leg that reads a test file,
   `AGENTS.md` item 4's ruled clause), **`npm run build` `[H]`**, and a **standalone strict `tsc --noEmit` over this
   unit's own two test files** (`§5.2`). **NO `[U]` ROW IS OFFERED and `[D]` IS NOT CLAIMED — both refusals are
   STRUCTURAL** (`§6`): each module is imported by NO `src/**` file, so no assembled rendered flow exists to exercise and
   the module-level green is `ENVELOPE-GREEN` by `RCA-12` (never `APP-green`). **GATE 6 IS `STRUCTURAL`, never `waived`.**
   **THE `user-flow-audit.md` `§7.1` PREDICATE IS DETERMINED AS NOT TRIGGERING, RECORDED, AND NO REPORT IS DUE:** this
   unit authors **no element, no envelope node, no handler body, no component binding and no control** (limb A absent) and
   **no assembled rendered flow changes** (limb B absent — the modules' flows are harness-only today), so the admissible
   form is NO report; a zero-row report is INVALID (`§6`).**

5. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no read-only PBT audit,
   no blind-greens record, no per-unit documentation review and no DONE row (`§5.3` fixes its shape).

6. **THE TWO DECISIONS THE QUEUE ROW LEFT OPEN ARE DECIDED HERE, EACH WITH ITS REASON, SO THE RED SET IS AUTHORABLE
   TODAY** (`§2.2`, `§4.1`): **(a) THE `dispose()` RELEASE SHAPE = UNSUBSCRIBE-ON-DISPOSE** — the captured-release arm is
   TAKEN, the store's `sever`/reclaim arm is NOT (`§2.2`'s decision block, with the four-part reason); **(b) THE PAIR
   LANDS IN ONE RED→GREEN CYCLE** — one TestWriter red set (both modules' store-backed families in their own landed test
   files), one Implementer green pass (`§4.1`). **No other decision blocks: `§2.2`'s in-flight-delivery rule and the
   store-record MISS rule are DECLARED as working defaults with their landing rows, and `§7a.1` carries the four-item
   decision/working-default ledger (the MISS handling · the release path, DECIDED · the cycle count, DECIDED · the
    registration timing) — NOTHING is
   `undefined-until-answered`.**

7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO tracker):** the
   `H2a` queue row's spec cell still reads `OWED — not filed` (this file is that filing); the ledger stays
   **`24 DONE / 5 open` UNITS = `29`** (`RCA-8(f)` — the architect admits ROWS, not a pass); and the `§Q` mechanism-set
   flip cells in `docs/pending.md` that list the list/slot-host flows as `PENDING REBUILD` flip WHEN THIS UNIT LANDS, not
   at this filing.

8. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` this pass: `process-guardrails.md` alone),
   so **there is no test-use-case coverage matrix and no demo-page index to update — and this unit renders no page and
   authors no page design** (the modules are mechanisms; their subscribers re-invoke host paths, they author no element).

9. **THE AMENDMENT SET THIS UNIT OWES TO THE LANDED SPECS, NAMED ONCE SO THE LANDING PASS NEED NOT RE-DERIVE IT**
   (`§2.5` item 6, `§5.1`): the queue row's own words — *"their `dispose()` rows and their store-emitting rows are what
   this child amends"* — land as **ANNOTATED-BESIDE amendments (`RCA-8(d)`, dated, never a rewrite)** to
   `docs/specs/listhost.md` (`§2.1`'s `OwnedListHostOptions` and `dispose()` doc, `§2.2` prohibition 4 and its `§3.3` `I-5`
   companion, `§2.2`/`§4.4`'s `S-6` static row, `§3.1` `M-14`, `§3a` `A-16`, `§5.5.1`'s re-grain) and
   `docs/specs/slothost.md` (`§1`'s out-of-scope store bullet, `§2.1`'s `SlotHostOptions` and `dispose()` doc, `§2.2`
   prohibition 4, `§2.4` item 5 / `§3.1` `M-13` / `§3.3` `I-5`, `§4.4` `S-7`, `§5.5.1`'s re-grain) — **every one keeping
   its landed bytes visible and its superseded reading spelled beside it.** **`SLOTHOST-CONTAINER-SOURCE-IS-INJECTED`
   (and `slothost.md` `§2.1`'s container-source clause) is NOT amended, weakened or re-read — it is the boundary this
   unit asserts (`§2.3`).**

10. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **One file written, zero files edited, no test run, no leg
    run, no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, no `git` command, no commit.** The
    new file is **untracked and must be committed by the supervisor** (`RCA-8(a)`'s per-gate commit rule; `RCA-8(c)` — it
    is a NEW file).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.** **Every ruling is
cited by §/row id or ROW NAME, never restated in words that weaken it.**

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **THE `H2` SPLIT** — `docs/decisions.md` `DECIDED: H2 (U-STORE-MODULES) IS SPLIT PER MODULE` (2026-10-03), its `D-GP-SAD-5` decomposition row dispositioned ON that record (never inside a spec): the BYTE-MOVING PAIR is `owned-list-host.ts` + `slot-host.ts`, whose own records/order go through the store AND which each gain the NEW `dispose()` subscription-release obligation; the six caller/seam-side obligations are `H2b`'s | `§1`, `§2.1`, `§2.2` |
| **2** | **THE `H2a` QUEUE ROW** — `docs/next-steps.md` row `H2a`: `U-STORE-MODULES-BYTES`; the two modules' obligations; the three register rows per module; the spec path **verified free 2026-10-03**; the two spec-gate decisions (release shape; one cycle vs two) | `§2.2`, `§4.1`, `CURRENT STATE` items 2/3/6 |
| **3** | **THE PLAN's NAMED OBLIGATION, ROW 9** — `data-ownership-model-plan.md` `§5.2.7`'s round-3 table: `owned-list-host.ts` reads/writes **its own records and order** (`mem.list.<hostId>.order` / `mem.list.<hostId>.node.<key>`, PROPOSED spellings), **BYTES MOVE** (its own read/write sites and its `dispose()`); the own-node ownership rule and the foreign-sibling rule UNCHANGED; the store holds the host's OWN records, not the container's | `§2.1` (rows `M-LS-1`..`M-LS-5`) |
| **4** | **THE PLAN's NAMED OBLIGATION, ROW 10** — same table: `slot-host.ts` reads/writes **the opaque key→placement/container record** (`mem.slots.<hostId>.<key>`), **BYTES MOVE** (same shape as row 9); **the store must NOT become the container source** (`SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` stays unmoved); the typed refusal for an undeclared key stays the module's | `§2.1`, `§2.3`, `§2.4` (rows `M-SS-1`..`M-SS-5`, `F-SS-4`, `I-SS-1`) |
| **5** | **THE BYTE TERMS** — `§5.2.7`'s round-3 block and `§5.6.1`/`§5.6.5`'s round-3 blocks: **`15 = 2 + 6 + 7`**, the `2` being THIS pair (the only two modules whose OWN bytes move); the fork's re-digest set shrinks to TWO modules | `§1`, `§5.1` |
| **6** | **THE THREE REGISTER ROWS** — `§5.2.7` round-3 item (4), carried by `§6.5`'s `U-STORE-MODULES` row round-2 clause (b): per store-backed module, **(a)** the import-census `P-IM` row with its POSITIVE CONTROL (the `container.md` `§3.4` `R-1` / `zones.md` `§3.4` `R-3` scanner pattern; "a fixture that imports the store FAILS the row"), **(b)** the NO-MODULE-LEVEL-BINDING `P-IM` row (the store handle ONLY as a declared call parameter, never a module-scope `const`/`let`), **(c)** the STORE-STATE-INDEPENDENCE DIFFERENTIAL `P-TP` row, TWO-RUN: a FIXED ARGUMENT TUPLE's answer is identical when the tiers are COLD / hold a SHADOWING `temp`/`mem` value / hold a committed `file` value — with the round-3 comparator ruling (`R-3`): **`===` only where the return is a primitive; for object-returning modules (the HOST OBJECTS, a fresh identity every call) the CANONICAL STRUCTURAL COMPARISON** (own enumerable keys, sorted, primitives by value; no deep-equality dependency) | `§5.5.1` rows `P-SMB-LH-IM-1`/`-2`/`-TP-1`, `P-SMB-SH-IM-1`/`-2`/`-TP-1` |
| **7** | **THE CALLER-OWNED-SPELLING RULE** — `§1.3` `R-1`/`R-6` (the store OWNS NO VOCABULARY; *"a declared name is a declaration of the CALLER'S spelling, not a vocabulary the store owns"*), `R-2`/`R-3` (one spelling, one home; a second literal spelling is a FAIL), `R-5` (no reference names an engine id) | `§2.6` |
| **8** | **THE FROZEN STORE SURFACE** — `store-core-graph.md` `§2.1` (`GraphSubscription` = `{name, subtree, unsubscribe(): boolean}`; `subscribe(name, listener, opts?)` with `opts.subtree` DEFAULTING to `false`; the `GraphStore` interface), `§2.8` (the write surface: `set` NEVER mints — a `set` on a path with NO node is refused `'undeclared-name'`; `commit` MINTS and re-mints; a tier-free write is refused `'malformed-name'`), `§2.10` items 1–6 (the event surface) | `§2.1`, `§2.2`, `§2.4` |
| **9** | **THE RELEASE SURFACE THAT DECIDES `§2.2`** — `store-core-graph.md` `§2.10` item 4: *"`unsubscribe()` answers `true` the first time and `false` on every later call — never a throw"*, per-reference-per-realm delivery, a non-callable listener refused `'malformed-name'` registering NOTHING, a throwing listener never propagating to the mutator's caller; **item 3**: the `'severed'` arm is **the SEVERANCE's release-reporting arm** — `sever(from, anchorKey)` DELETES the `file`-flagged node on the far side of a LINK and releases every subscription on it, **one event per released reference** | `§2.2` (the decision), `§2.4` |
| **10** | **THE CONTAINER-SOURCE BOUNDARY** — `docs/decisions.md` `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` (cited by ROW NAME; `slothost.md` `§2.1`'s container-source clause): the SOLE container source is the injected `containerFactory`; the ambient read is DELETED; the anti-assembly bans in force | `§2.3`, `§2.5`, rows `F-SS-4`/`I-SS-1` |
| **11** | **THE CONSTRAINT/REPAIR MACHINERY** — `docs/decisions.md` `CONSTRAINTS-ARE-PASSED-FUNCTIONS` (cited by ROW NAME): constraints and repairs are CALLER-SUPPLIED FUNCTIONS, evaluated by the store on matching writes; **and `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION`** (cited by ROW NAME): a throwing caller-supplied constraint/repair is absorbed at the WIRING turn, never at the store's evaluation; the store's evaluation stays UNGUARDED and the store's closed refusal surface is unchanged | `§2.1` (the write-turn rule), `§3.2` `F-LS-3`'s note |
| **12** | **THE LANDED MODULES' OWN CONTRACTS** — `docs/specs/listhost.md` (the `dispose()` ruling at `§2.1`/`§3.1 M-14`/`§3.3 I-5`, reading (a) *"place nothing — the tree is untouched"*; the `A-16` dispose-then-use ruling; the totality clause "no method of this host throws — for any input" `§2.1`; the static rows `§2.2` prohibition 4/5, `§4.4` `S-1`..`S-6`; the register `§5.5.1` `7` rows / `168` attempts) and `docs/specs/slothost.md` (the `dispose()` shape at `§2.1`/`§2.4` item 5/`§3.1 M-13`/`§3.3 I-5`; the refusal-code domain `§2.1` — FOUR declared, THREE emitted, `'no-container'` declared-but-not-emitted; the totality boundary `§3.3 I-8`; the static rows `§4.4` `S-1`..`S-7`; the register `§5.5.1` `6` rows / `155` attempts) — **the rows this unit AMENDS and the rows it MUST NOT break** | `§2.2`, `§2.5` item 6, `§3`, `§5.1` |
| **13** | **THE REGISTER DISCIPLINE** — `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` (all cited by ROW NAME, `docs/decisions.md`): a code-bearing unit's spec MUST carry its typed register BEFORE the red set; a declared term is a DRIVE count; the total is printed WITH its terms; an un-run row is a FAILURE | `§5.5` |
| **14** | **ONE-RED-SET / ONE-GREEN PER UNIT** — `AGENTS.md` item 9 / RCA-1 (red first, run and reported), `RCA-2` (a multi-unit deliverable is split PER UNIT — this unit IS the split child), the wave-`H` queue row's second decision | `§4.1`, `§4.5` |

---

## 1. Scope

**One deliverable: the two byte-moving modules' store-backed record contract and their `dispose()` release obligation —
landed in the modules' OWN bytes (their reads, writes, subscriptions and the release), with the store injected as a
declared call parameter and never imported, plus the three register rows per module and the amendment set to the two
landed specs.**

1. **What it is, in one sentence.** `createOwnedListHost` and `createSlotHost` each gain a declared store handle and a
   declared host identity; each module's own closures read/write its OWN records through that handle — `mem.list.<hostId>.order`
   / `mem.list.<hostId>.node.<key>` for the list host, `mem.slots.<hostId>.<key>` for the slot host — each registers its
   declared store subscriptions, and **each `dispose()` releases every subscription it registered**.
2. **What it is NOT.** It is **not** `H2b` (the six caller/seam-side obligations — `gutter`/`relocate` are LANDED by
   `U-PANE-DRAG-COMPLIANCE` already, `overlay`/`theme`/`menu-template`/`focus-model` are `H2b`'s); **not** a store change
   (the store is FROZEN); **not** a wiring pass (no in-tree `src/**` file imports either module, so no caller wiring
   exists for this unit to edit — the store handle is supplied by the `[T]` harness; the future wiring that constructs
   hosts with stores is the consuming project's composition, exactly as the split ruling's "remaining/coherent core"
   cell records for the six); **not** the `Q-14` fork-facing recording pass (owed AFTER this unit lands, `§5.6.4`);
   **not** the `§5.9.1` sweep (owed to the first admitted store unit); **not** a page design (`§6`).
3. **What the unit may land.** The two module files' store-backed bytes + the two test files' store-backed families +
   this spec + the annotated-beside amendment set to `docs/specs/listhost.md` / `docs/specs/slothost.md` (`§5.1`). **No
   other file's bytes move.**

**Explicitly OUT of scope (do not do in this unit):**

- **Any store byte.** `src/renderer/store-core-graph.ts` and `src/renderer/store-graph-references.ts` are LANDED-GREEN
  and FROZEN-artifacted; this unit adds NO member, NO arm, NO refusal token, NO release trigger and NO rule to them
  (`§2.5` prohibition 2). **The `'severed'` arm's RELEASE ROLE is the store's own; this unit only chooses which declared
  release path its `dispose()` calls (`§2.2`).**
- **Any import of the store by the modules.** The handle is a DECLARED CALL PARAMETER; the modules keep `0` import
  statements (`§5.5.1` rows `P-SMB-LH-IM-1`/`P-SMB-SH-IM-1`). **The `R3-4` reading binds: an obligation that lands in a
  module's own bytes does NOT break its no-import census when the store arrives as a parameter — and MAY NOT break it by
  an import.**
- **Any second authority over the hosts' records.** The store holds the hosts' OWN records; it never holds the
  container's (row 9), never becomes the container source (row 10, `§2.3`), never decides an order, a placement or a
  refusal for the host, and never carries consumer decision vocabulary (`§2.5`).
- **Any module-level binding.** No module-scope `const`/`let`/`var` holds the store or a subscription (`§5.5.1` rows
  `P-SMB-LH-IM-2`/`P-SMB-SH-IM-2`); the handles live in the factory's closures, which are parameter-scoped.
- **Any MCP surface change, any renderer/main/electron/fs touch, any persistence, any new dependency** — the modules'
  landed five-seam negatives and static rows SURVIVE (amended BESIDE only where a landed row forbids a store: `§2.5`
  item 6).
- **Any second subscription authority.** Exactly one subscription per declared reference per host instance (`§2.4`);
  the wiring/harness registers NONE on the hosts' references.
- **The `H2b` seam-side six** — each is its own spec/red/cycle (RCA-2).
- **The fork's UI bytes** — `H-r6`; this repo writes no file under `<Astrographer>/`.

---

## 2. The surface (exact)

### 2.1 The store-backed record contract per module — the read/write surface, the tier, the byte delta, the seam

1. **THE SEAM — ONE NEW DECLARED OPTION MEMBER + ONE NEW DECLARED IDENTITY MEMBER, PER FACTORY.** `OwnedListHostOptions`
   and `SlotHostOptions` each gain EXACTLY TWO members, declared with per-parameter semantics rows:

   | Option member | Declared type (contract) | Semantics (per-parameter) |
   | --- | --- | --- |
   | `store` | `readonly store: …` — a handle carrying **at least** the frozen surface's `commit`, `resolve` (the read face of `§2.1` item 2's table), and `subscribe` returning a handle shaped like `GraphSubscription` (`{name, subtree, unsubscribe(): boolean}`, `store-core-graph.md` `§2.1`) | **The SOLE store-access path.** The module reads/writes/subscribes ONLY through this parameter. It is REQUIRED for the store-backed contract (a host constructed without it is the LANDED contract's host — see §2.1 item 4). It is a CALL PARAMETER — never imported, never a module-level binding (`§5.5.1` rows `P-SMB-*-IM-1`/`-2`). The module calls on it ONLY the members its contract names; it asserts NOTHING about the store's other members and adds NO member to it. |
   | `hostId` | `readonly hostId: string` | **The host instance's declared identity — the CALLER's spelling of the host in the store's namespace.** Non-empty string; the module NEVER mints, defaults, normalizes or re-interprets it (a non-string/empty value is the LANDED refusal read for a malformed option — `'malformed-entry'` for the list host's option surface, `F-4`-class for the slot host's `keys`-shape degradation — **never a throw**, per the landed totality). It is the `<hostId>` segment of every reference this host reads/writes/subscribes (`§2.6`). |

   **The landed option members are UNCHANGED** (`mount`/`orderOf`/`itemFactory`/`onActivate`/`onClose`/`order` for the list
   host; `container`/`keys`/`orderOf`/`classNameOf`/`attributesOf`/`refuse`/`containerFactory` for the slot host) — **and
   `containerFactory` KEEPS being the slot host's SOLE container source** (`§2.3`). **The `7`-name export census of each
   module is UNCHANGED** (no export is added, removed or renamed: the `410`-line list host and the `643`-line slot host
   keep their seven names each — verified against `src/shared/owned-list-host.ts` and `src/shared/slot-host.ts` as read
   this pass).
2. **THE READ/WRITE SURFACE PER MODULE — the tier is `mem` throughout, every name is the CALLER's spelling
   (`§2.6`), and the write verb is `commit` with the edit outcome (NEVER `set` for the module's own records, NEVER a
   tier-free name):**

   | Module | The record set it reads/writes (PROPOSED spellings, the plan's own) | Tier | The store turn, exact |
   | --- | --- | --- | --- |
   | `owned-list-host.ts` | **`mem.list.<hostId>.order`** — the host's OWN projected order (a key list, written on `setOrder`/`setEntries`' order change; read on the subscription-driven re-invocation) · **`mem.list.<hostId>.node.<key>`** — the host's OWN node record per owned key (written when a key is acquired) | **`mem`** | write: `store.commit('mem.list.<hostId>.order', <key list>, {onRepeat:'edit'})` and `store.commit('mem.list.<hostId>.node.' + key, <node>, {onRepeat:'edit'})` — **`commit` is the minting+editing verb** (`store-core-graph.md` `§2.8` item 3: it MINTS on a path with no node and routes a repeat to the pair's declared outcome — `{onRepeat:'edit'}`); `set` is NEVER used for the module's own records (a `set` on a path with no node is refused `'undeclared-name'`, `§2.8` item 1); read: `store.resolve('mem.list.<hostId>.order')` (the re-invocation's read face) |
   | `slot-host.ts` | **`mem.slots.<hostId>.<key>`** — the host's OWN opaque placement/container record per DECLARED key (written when a key's placement is acquired or vacated; read on the subscription-driven re-invocation for that key) | **`mem`** | write: `store.commit('mem.slots.<hostId>.' + key, <placement record>, {onRepeat:'edit'})` per affected key; read: `store.resolve('mem.slots.<hostId>.' + key)` for the re-invoked key |

   **THE RECORD VALUES ARE THE HOSTS' OWN OPAQUE DATA — opaque to the store, never interpreted, never a live object the
   store must understand.** The list host's `.order` value is its key list; its `.node.<key>` values are the caller's
   NODES by reference (the store holds values — `unknown` — and the host writes what it owns); the slot host's
   `mem.slots.<hostId>.<key>` value is its placement record for that key. **A container is NEVER a store value** (the
   container source stays injected — `§2.3`). **THE STORE'S EVENT SURFACE IS THE FROZEN ONE:** a commit that clears a
   lower tier emits that tier's `cause:'clear'` on ITS OWN path; the module's own subscription on the written ref receives
   the write's event (`§2.4`).
3. **THE WRITE-TURN RULE (governed by `CONSTRAINTS-ARE-PASSED-FUNCTIONS` + `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION`,
   cited by row name).** Every store call the module's closures make is an **UNGUARDED call to the store's own TOTAL
   surface** — the store returns RECORDS (a receipt, a resolve answer, a subscription handle) and its only throws are the
   factory's load refusal and the test-seam throws (`store-core-graph.md` `§2.2` `P-5`), so **no new throw class enters
   either module** and the landed no-throw totality (`listhost.md` `§2.1`, `P-LH-TP-1`; `slothost.md` `§3.3 I-8`,
   `P-SH-TP-1`) is UNCHANGED: every store-returned record — a receipt, a `{status:'refused', …}` write refusal, a repair
   outcome, a read MISS, a read refusal — is consumed as the store's declared return and cannot make a module method
   throw. **A store write that a CALLER-SUPPLIED constraint refuses or repairs (evaluated by the store on a matching
   matched set) is the CALLER's contract matter: the module does NOT re-interpret the receipt, does NOT absorb the throw
   (absorption lives at the WIRING turn — there is no in-tree wiring, so the `[T]` harness's turn is the wiring for this
   unit's rows), and its OWN answer is computed from its own bookkeeping exactly as the landed contract declares.**
   **THE STORE IS A SHARING CHANNEL, NEVER A SECOND AUTHORITY over any host decision** (the own-node ownership rule and
   the foreign-sibling rule are UNCHANGED — `listhost.md` `§3.1 M-8`/`§3.3 I-3`, `slothost.md` `§3.1 M-7`/`§3.3 I-3`).
4. **THE LANDED-CONTRACT DEGRADATION, DECLARED.** A host constructed WITHOUT the `store` member (or with a non-conforming
   `store`) is **the LANDED contract's host**: every store turn is a valid no-op — the module proceeds on its own
   bookkeeping, answers exactly as the landed rows declare, and **the new obligations (subscriptions, the release,
   re-invocation) simply do not engage**. This keeps the landed suites' rows green while this unit's rows drive the
   store-carrying shapes; the `[T]` harness drives BOTH shapes and the landed shape's answers must equal the landed
   rows' (the differential's comparator, `§5.5.1`).
5. **THE STORE-RECORD MISS RULE (a WORKING DEFAULT, decided here; recorded at `§7a.1` item 1).** A read of the module's
   OWN declared name that answers the declared MISS (`{found:false}`, never a refusal for a `mem.*` spelled name, never a
   default) means "no stored copy": **the module proceeds with its own current bookkeeping as its authority for that
   turn — it invents NO default order, NO default placement, NO value — and its NEXT store-write turn re-mints the record
   from its own bookkeeping (self-healing, writing its OWN data, never an invented value).** A read answered by a
   REFUSAL (a `secure.*`-class name or a malformed name) cannot occur for the module's own spellings (the harness
   double and the real store both answer `mem.*` reads with HIT/MISS) — and if one is ever returned, the module treats it
   as the same MISS outcome: a declared non-throwing consume, per item 3.
6. **THE BYTE DELTA, STATED AS A SHAPE — NEVER AS A LINE COUNT (this spec carries no length census; `RCA-12`).** Each of
   the two files' OWN bytes move — that is what makes them the `2` of `15 = 2 + 6 + 7`: the factories' option types gain
   the two members (item 1); the closures gain the store read/write turns (item 2), the subscription registration
   (`§2.4`), the subscription-driven re-invocation (`§2.4` item 3) and the `dispose()` release loop (`§2.2`). **The
   modules' `0`-import censuses and `7`-name export censuses are UNMOVED.** The fork consequence is `§5.6.1`'s round-3
   block's: the re-digest set for the pair is the two files — recorded here as the fork's scheduled obligation, owned by
   `Q-14`'s one documentation pass after this unit lands (`§5.1`).

### 2.2 THE HEADLINE — the `dispose()` RELEASE OBLIGATION (the queue row's decision, DECIDED)

**THE OBLIGATION, EXACT.** Each module's `dispose()` **releases EVERY store subscription the module registered** — no
more and no less. It does NOT delete the module's store records (the records are the host's OWN records in the store —
they persist, which is what lets a later host instance with the same `hostId` re-adopt them; disposal is a lifecycle
event of the HOST, not a reclaim of the RECORDS). It does NOT emit any store event (`F-LS-3`/`F-SS-3`). It does NOT
change any landed `dispose()` behaviour: the list host still places nothing (its nodes stay in the mount — `listhost.md`
`§2.1` `dispose()` ruling (a), `M-14`), the slot host still removes the containers it created (`slothost.md` `§2.4` item
5, `M-13`), both stay `void`, idempotent and non-throwing.

**THE DECISION THE QUEUE ROW LEFT OPEN — MADE HERE: UNSUBSCRIBE-ON-DISPOSE.** The release path is the per-subscription
**`unsubscribe()`** handle the module's own `subscribe` calls returned — **NOT** the store's `sever` path. The reason, in
four parts, each with its authority:

1. **`sever` has no subject for this unit.** `sever(from, anchorKey)` is the store's RECLAIM operation: it *"DELETES the
   `file`-flagged node on the far side of the link and RELEASES the subscriptions on it, emitting the `'severed'` arm"*
   (`store-core-graph.md` `§2.10` item 3). Its subject is a **`file`-flagged node reached through a LINK's
   `from`/`anchorKey` pair**. This unit's records are **`mem`-tier** and the hosts hold NO link to themselves: a host has
   no `from`/`anchorKey` pair whose far side is its own record, so a `sever`-driven release would require the module to
   invent a link — a store-surface use with no referent, on names `sever` does not reach (sever releases subscriptions
   on the severed NODE and on references IT HELD, not on arbitrary `mem.*` references).
2. **The store's OWN declared per-subscription release path is `unsubscribe()`.** `subscribe` RETURNS
   `GraphSubscription` with `unsubscribe(): boolean`, and `§2.10` item 4 pins its shape: *"`unsubscribe()` answers `true`
   the first time and `false` on every later call — never a throw."* That IS the store's closed caller-driven release
   surface. The `'severed'` arm's release-REPORTING role is the SEVERANCE's (`§2.10` item 3: *"a reclaim that released a
   live subscriber's reference and reported NOTHING would be a silent disappearance"*) — the arm exists to report a
   RECLAIM's release, and this unit's dispose performs NO reclaim (it releases handles, keeps records) — so a dispose
   must emit NO store event, by construction of the path chosen.
3. **The observable the contract must prove is the `unsubscribe()` return shape.** The queue row's own phrases — *"the
   observable proving release (the store's `subscribe`/`unsubscribe` return shapes from `§2.10`)"* — name the shape this
   decision uses: `true` on the first call per handle, `false` afterwards, asserted directly (`F-LS-2`'s detection) plus
   the delivery-record negative (a post-dispose write delivers nothing — `F-LS-1`). A `sever`-based release would be
   observable only through a `'severed'` EVENT — an event this unit must NOT emit — so it cannot serve the row.
4. **Decidability and the frozen surface.** Unsubscribe-on-dispose is deterministic, testable on both the recording
   double and the real store, and touches NO store member: the store stays byte-identical and FROZEN (`§2.5`
   prohibition 2). A ruling that a host's dispose must drive `sever` would be a NEW store-surface coupling this unit
   does not own.

**⟶ THE RULING STATE, RECORDED SO NO PASS RE-LITIGATES IT: the queue row's "unsubscribe-on-dispose vs the store's own
`sever`/release path" is ANSWERED — unsubscribe-on-dispose. The alternative is recorded at `§7a.1` item 2 with its cost
(none of the row's observables would be satisfiable without emitting `'severed'`) — and a later pass that re-opens it
OWES a gate.**

**THE POST-CONDITIONS, ENUMERATED (each a row a TestWriter can FAIL):**

| # | Post-condition | Row |
| --- | --- | --- |
| **P1** | **Every** subscription the host registered is released: each held handle's `unsubscribe()` is called EXACTLY ONCE (registration order), each first call answers `true`, and any further call on the same handle answers `false` — never a throw (`store-core-graph.md` `§2.10` item 4) | `F-LS-1`/`F-SS-1` (leak arm), `F-LS-2`/`F-SS-2` |
| **P2** | **No further delivery** to a disposed host: a post-dispose write to ANY released name delivers NOTHING to the host's listeners (the delivery-record counter stays at its pre-write value) | `F-LS-1`/`F-SS-1`, `M-LS-5`/`M-SS-5` |
| **P3** | **Idempotence**: a second (and every later) `dispose()` is a no-op — the landed no-op rule (listhost `M-14`, slothost `M-13`) AND the handles' later-call-`false` rule both hold; no handle is called again | `M-LS-5`/`M-SS-5` |
| **P4** | **A delivery in flight during dispose — DECLARED RULE.** The store's fan-out is SYNCHRONOUS in registration order (`§2.10` items 4/5), so an in-flight delivery during `dispose()` can arise ONLY when `dispose()` is invoked re-entrantly from within a listener body. **RULED: the in-flight delivery COMPLETES — the store continues its fan-out in registration order (the same catch-and-continue discipline `§2.10` item 4 applies to a throwing listener), the completing body runs against the host's declared post-dispose behaviour (listhost `A-16`: every method after `dispose()` returns a valid result, no ownership resurrected; slothost `I-5`: no state retained), and from the moment `dispose()` begins NO FURTHER delivery is dispatched to that host's listeners.** The mid-fan-out unsubscribe semantics are the STORE's own concern (`§2.10` item 4 + the store's own `ADV-GR-5` seed) — this unit does NOT re-rule the store's fan-out; it pins the MODULE-level guarantee: dispose() removes the subscriptions synchronously and returns normally. | `M-LS-4`/`M-SS-4`, register `P-SMB-*-TP-1`'s dispose step |
| **P5** | **No store event is emitted by the release itself** — no `'severed'`, no `'clear'`, no `'set'` is attributable to the `dispose()` call (the release is the `unsubscribe()` surface, which is event-silent; the `'severed'` arm is the SEVERANCE's own, `§2.10` item 3) | `F-LS-3`/`F-SS-3` |
| **P6** | **The records remain**: the module's store records are NOT deleted, cleared or re-minted by `dispose()` (disposal releases SUBSCRIPTIONS, not RECORDS — the plan's *"release the store subscriptions it registered"* is the whole of the obligation) | `M-LS-5`/`M-SS-5` |
| **P7** | **No second release authority**: dispose() releases EXACTLY the subscriptions the module registered — never a subscription another party registered, never a subscription on a reference outside the module's declared set | `F-LS-2`/`F-SS-2`, `§2.4` |

**THE LEAK FAIL-STATE AND ITS DETECTION.** **`LS-LEAK` = the state in which a subscription the host registered is NOT
released by `dispose()`** (a handle never unsubscribed, or a release that did not take effect). **Detection is
THREE-ARMED, each arm a negative row with its own observable:** **(a) DELIVERY AFTER DISPOSE** — write a released name
post-dispose and read the subscriber-driven delivery counter: any delivery > 0 FAILS (`F-LS-1`/`F-SS-1`); **(b) THE
HANDLE'S RETURN SHAPE** — on the recording double, the held handles' first `unsubscribe()` call must answer `true` and
the active-subscription set must read EMPTY after dispose: a non-empty set, or a first call answering `false`, FAILS
(`F-LS-2`/`F-SS-2`); **(c) THE EVENT NEGATIVE** — the dispose call itself must add `0` to the store's event census:
`events: 0` attributable to it; a `'severed'`/`'clear'`/`'set'` fired BY the dispose FAILS (`F-LS-3`/`F-SS-3`). **The
leak's root-cause posture, stated:** the only way a leak survives all three arms is a subscription the module registered
OUTSIDE its own closure-held handle set — which `§2.4` item 1's registration discipline (one handle per declared ref,
held in the factory's closure) forbids by construction, and the register's no-module-level-binding row
(`P-SMB-*-IM-2`) scans for.

### 2.3 The `slot-host` container-source boundary — the store must NOT become the container source

1. **THE BOUNDARY, EXACT.** `containerFactory` (the injected seam, `slothost.md` `§2.1`'s container-source clause)
   remains the SOLE container source in every state the store-backed slot host can be in: with the store present, absent,
   cold, shadowing or committed. **The store is NEVER consulted for a container** — no container is read from a store
   value, no container is constructed from a store-derived value, and **the `mem.slots.<hostId>.<key>` RECORD's value
   never IS, and never CONTAINS, a container** (the record is the opaque placement/container RECORD — data the host
   wrote — and the container the host places into is obtained from `containerFactory` exactly as landed).
   `containerFor(key)` keeps returning the injected factory's product (or `null` per the landed degradation), never a
   store value (`slothost.md` `§2.1`/`§2.4`).
2. **THE FALSIFIER (named, positive-controlled).** Two drives FAIL `F-SS-4`: **(a) a module-side container-from-store path** — any byte of `src/shared/slot-host.ts` that reads a store value and routes it into a container-obtaining position (a container obtained from a `resolve` answer, a record value placed as a container); **(b) the RECORD-VALUE rule** — a `mem.slots.<hostId>.<key>` record whose value IS, or CONTAINS, a container (the module must not store a container in its own records — records are opaque data, `§2.3` item 1). The caller-SIDE shape is recorded as a boundary, not driven: a WIRING whose `containerFactory` implementation reads the store would make the store the container source — a violation of `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED`'s no-tree-reading clause — and the in-tree wiring does not exist (`E-1`), so the module-side rows are the driveable half and the positive control is the injected-factory drive (`M-SS-2`), which passes with `containerFor` reference-identical to the factory's product.

### 2.4 The subscription/event surface per module (per-reference delivery; rule 2's listener discipline)

1. **THE REGISTRATION, EXACT — ONE SUBSCRIPTION PER DECLARED REFERENCE, HELD IN THE FACTORY'S CLOSURE.** **`owned-list-host`:
   EXACTLY ONE subscription, on `mem.list.<hostId>.order`**, registered at construction (or lazily at the first
   store-carrying turn — the registration shape is the double's active-set, and the count must read `1` from the moment
   the contract says the subscription exists; **the count after `N` graph re-derivations stays `1`**, per `§2.10` item
   4's per-realm-per-reference rule). **`slot-host`: EXACTLY ONE subscription PER DECLARED KEY, on
   `mem.slots.<hostId>.<key>`** — the declared key set's placement refs, the EXACT-REFERENCE form (**never capped**,
   `store-core-graph.md` `§2.4`'s `RCAP-3` annotation: *"an EXACT-reference subscription is NEVER capped"*), one handle
   per key held in the factory's closure; the count reads `= declaredKeyCount` while alive and `0` after dispose.
   **`{subtree}` is NOT set — every subscription is exact-reference** (a `subtree:true` form on a host's own records
   would fire for every descendant write; the hosts' records are their OWN and nothing the hosts need fires below them).
2. **THE LISTENER DISCIPLINE (rule 2's shape, per `§2.10` items 4/5/6).** Each listener is the host's OWN closure: write
   an exact path → its event delivers to the listener **on that reference, per-reference**, with the event's
   `{name, flag, value, cleared[], cause}` envelope; **one event to one listener is `events: 1` and one delivery**. The
   listener body is:
   - **READ-ONLY against the store** — it re-invokes the host's OWN render/refresh path (the list host's render/setOrder
     path; the slot host's per-key placement refresh), which READS the stored record but NEVER writes the store from
     inside the listener. **This is the write-loop proof: the host's own commit fires its own subscription synchronously;
     the re-invocation reads (never writes) and the re-invoked path is the landed IDEMPOTENT render (listhost `I-2`:
     unchanged inputs ⇒ no child mutation; slothost `M-3`), so the own-write → event → re-invocation ⇒ terminates after
     one re-invocation with no second write and no second event.**
   - **TOTAL** — a listener body never throws (the re-invoked host methods never throw, and the store catches a throwing
     listener anyway, `§2.10` item 4); a throwing body cannot propagate to the mutator's caller.
   - **RE-ENTRANCY-SAFE** — a re-entrant host-method call inside a listener changes the OUTER call's report exactly as
     the landed re-entrancy ruling states (listhost `A-17`: benign and stated; slothost `A-6`-family), and the landed
     no-throw/valid-state discipline holds throughout.
3. **THE RE-INVOCATION'S READ FACE.** The re-invoked path reads the stored record through `store.resolve(...)` and
   applies it per the module's own contract: the list host re-projects/re-renders from the stored ORDER (the store holds
   the host's own order — an order change therefore stops being hand-passed: an external `commit` to
   `mem.list.<hostId>.order` fires the subscriber, which re-invokes `render`/`setOrder`; **the foreign-sibling rule and
   the own-node ownership rule are UNCHANGED throughout**); the slot host refreshes the affected key's placement from the
   stored record. **A MISS on the read is the `§2.1` item 5 outcome** (proceed on bookkeeping, re-mint on next write —
   never a default). **A write to a DESCENDANT of a host's record NEVER pings the host's exact subscription** (`§2.10`
   item 6: ancestors fire only for `{subtree:true}`, and the hosts use none).
4. **THE SECOND-SUBSCRIPTION-AUTHORITY NEGATIVE.** No other party registers a subscription on the host's references: the
   per-reference count on those references is EXACTLY the module's own (`1` for the list host's order ref; `1` per
   declared key for the slot host) — a second subscription authority on the same references is a FAIL (`F-LS-4`/`F-SS-4`),
   positive-controlled by the module-alone drive (count `1`). The module itself never registers a second subscription for
   a reference it already subscribed (its registration is once-per-declared-ref by construction, and the double asserts
   the membership is a SET).

### 2.5 The prohibitions — every prohibition cites an ENUMERATED static or negative row

| # | Prohibition | Pinned by |
| --- | --- | --- |
| **1** | **NO CONSUMER VOCABULARY IN THE STORE'S BYTES** — the store ships no `list`/`slots`/`hostId`/`placement`/`order`/`node` token and no mirror-class literal; the reference spellings live in the MODULES' closures (the tenant code) and in the CALLER's declaration input, NEVER in the store's module bytes (`§1.3` `R-1`/`R-6`; `store-core-graph.md`'s own scan rows) | `§2.6`; the store's own rows are UNMOVED — this unit adds no store byte to scan |
| **2** | **NO STORE-SURFACE CHANGE** — the store is FROZEN: no member, no arm, no refusal token, no release trigger is added or amended by this unit | `§5.1`'s DENIED set, `§1` out-of-scope bullet 1 |
| **3** | **NO SECOND SUBSCRIPTION AUTHORITY** — one subscription per declared reference per host instance; nobody else subscribes the hosts' references (`§2.4` item 4) | `F-LS-4`/`F-SS-4` |
| **4** | **NO STORE AS CONTAINER SOURCE** — `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` unmoved; the store never yields a container; the slot host's record values never contain a container (`§2.3`) | `F-SS-4`, `I-SS-1` |
| **5** | **NO AMBIENT READ, NO ASSEMBLED/COMPUTED REALM LOOKUP, NO MODULE-LEVEL BINDING** — the landed anti-assembly discipline (slothost `§4.4` `S-2`/`S-4`, the `ADV-SH-1` chain) and the register's `P-IM` rows hold; the store arrives ONLY as a declared call parameter | `P-SMB-*-IM-1`/`-2`, `S-LS-3`/`S-SS-3` |
| **6** | **THE LANDED PURITY/IMPORT ROWS THIS UNIT AMENDS — NAMED (each amended BESIDE at the landing pass, `RCA-8(d)`; none rewritten)** — `listhost.md`: `§2.2` prohibition 4 (*"No UI-config store or persistence"* — the no-store clause is SUPERSEDED BESIDE for THIS module; what survives: the module persists nothing itself and keeps no module-level state, and the new store-carrying reading is the declared-parameter one), `§2.2` prohibition 5's static import row and `§4.4` `S-6` (*"no store, no persistence, no module-level mutable state, no randomness"* — the no-store half re-worded BESIDE; the five-seam MCP negative and the no-ambient halves UNMOVED), `§2.1`'s `dispose()` doc and `§3.1 M-14`/`§3.3 I-5`/`§3a A-16` (the release obligation added BESIDE, the landed assertions kept), `§5.5.1` (RE-GRAINED, widened — `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-…`); `slothost.md`: `§1`'s out-of-scope store bullet and `§2.2` prohibition 4 (same supersession-beside reading), `§2.1`'s `SlotHostOptions`/`dispose()` doc, `§2.4` item 5/`§3.1 M-13`/`§3.3 I-5`, `§4.4` `S-7` (the zero-graph-seam static — UNMOVED in substance: the module still imports nothing from `src/renderer/**`; the store is REACHED as a parameter, not imported — the static row's own text already bans imports, which stay `0`), `§5.5.1` (RE-GRAINED). **The PURE-side rows that DO NOT move for these two modules: NONE of them — both modules are `STORE-BACKED` by the scope ruling; their landed no-store rows are the amended set above.** **⟶ MISQUOTE CORRECTED BESIDE 2026-10-06 (the H2a gate-4 landing pass; F-1 — the as-filed citation above is KEPT VISIBLE): the `§4.4 S-6` citation in this cell is a MISQUOTE — the landed `listhost.md` `§4.4` is the STOP-CONDITION table `S-1..S-6`, and `S-6` is *"A test asserts a `callback count of exactly one` and the implementation fires twice for a replace-then-render cycle"* — a stop condition, not a static row. THE NO-STORE STATICS ACTUALLY LIVE AT: `listhost.md` `§2.2` prohibition 4 (*"No UI-config store or persistence"* — the row whose no-store half this unit amends BESIDE) + `§2.2` prohibition 5's static import row (the five-seam negative: the module imports NOTHING — the store arrives as a declared call parameter, never an import) + `§1`'s out-of-scope bullet (*"Any store, registry, persistence, or module-level mutable state."*) + the `§3a A-13`/`§3b ADV-LH-11` sweep records; the "no randomness" member of the misquoted text belongs to `§5.5.0`'s strategy-discipline cell (*"fixed input, fixed order, no randomness, no shrinking"*), not to any static row. The amendment set of THIS item is the set the F-1 landing lands (prohibition 4 · prohibition 5 · §1 bullet · `dispose()` doc / `M-14` / `I-5` / `A-16` / `A-13` / `ADV-LH-11` · `§5.5.1` re-grain, on the listhost side above).** | `§5.1`, `CURRENT STATE` item 9 |
| **7** | **NO DECISION VOCABULARY IN THE MODULES' STORE READS** — a store-sourced value is a VALUE the host re-renders/re-refreshes from, never a decision the host bakes in (the `NW-4`-class ambient hazard is what the two-run differential executes, `§5.5.1` rows `P-SMB-*-TP-1`) | `§5.5.1`, `I-LS-1`/`I-SS-1` |

### 2.6 The caller-owned-spelling rule

1. **THE SPELLINGS ARE THE CALLER'S**, carried verbatim: `mem.list.<hostId>.order`, `mem.list.<hostId>.node.<key>`,
   `mem.slots.<hostId>.<key>` — the plan's OWN PROPOSED references (`§5.2.7` rows 9/10, `§1.3`). The module's bytes
   carry them as reference literals composed from the declared `hostId` parameter (function-local, inside the factory's
   closures — never module-level constants, per `P-SMB-*-IM-2`), and **the CALLER's declaration input
   (`src/renderer/store-graph-references.ts`, the store's register input) declares the top-level roots a host's names
   hang under** (the `list`/`slots` roots per the wiring's own composition — the one-declaration rule `§1.3` `R-2`/`R-3`,
   and the modules never declare names to the store and never spell a second home for a reference). **THE MODULES' OWN
   LANDED VOCABULARY BANS ARE UNMOVED** (the list host still ships no tab-strip vocabulary; the slot host still ships no
   mirror-class taxonomy) — the spellings `list`/`slots`/`order`/`node`/`placement` are the modules' OWN domain words and
   the plan's proposed reference spellings, neither a banned taxonomy member nor a store-shipped token.
2. **THE HOST-IDENTITY SEGMENT.** `<hostId>` is the declared `hostId` parameter's verbatim string: the module never
   mints, defaults, normalizes, prefixes or re-interprets it (the same opacity discipline the family applies to `edge` —
   `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`, cited by row name — and to `zoneId`).
3. **A SECOND LITERAL SPELLING OF A REFERENCE IS A FAIL** (`§1.3` `R-3`): each module composes each of its references at
   exactly ONE site in its closures (the double and the scan rows assert the spelling appears exactly once per
   reference; a second copy — e.g. a duplicated `'mem.list.'` prefix literal — FAILS `S-LS-1`/`S-SS-1`'s spelling-count
   reading).

---

## 3. Behaviour — every state, fail-state, invariant and static/existence row

**NOTATION: `LS-` = the list-host store-backed family (`owned-list-host.ts`); `SS-` = the slot-host store-backed family
(`slot-host.ts`).** The families are ADDITIVE to the landed suites — no landed row id is re-used, renumbered or deleted.

### 3.1 Valid / happy states (store-carrying drives; the store double in the `[T]` layer — `§4.2`)

| # | The state | The drive | Required behaviour | Pinned by |
| --- | --- | --- | --- | --- |
| **M-LS-1** | construction registers the list host's subscription | build the host with a recording store double | the double's active-subscription set = `{mem.list.<hostId>.order}` EXACTLY or is empty-until-first-turn and `1` from the first store-carrying turn; the handle is held in the factory's closure (`P-SMB-LH-IM-2`'s declaration-position half) and the subscription is EXACT-REFERENCE (`{subtree}` unset) | `§2.4` item 1 |
| **M-LS-2** | the record writes land | `setEntries([…])`, `setOrder([…])` on the double | the double's written map holds `mem.list.<hostId>.order` (the key list) and `mem.list.<hostId>.node.<key>` per owned key, each via `commit(…, {onRepeat:'edit'})`; every module answer matches the landed M-row answers for the same drives (`M-7`/`M-13`-family) | `§2.1` item 2 |
| **M-LS-3** | a store-sourced order change re-invokes the host | an EXTERNAL `commit('mem.list.<hostId>.order', …)` through the store | the subscriber's delivery counter reads `1` (one event, one delivery, `events: 1`), the re-invoked render path re-projects/re-renders from the stored order, and the landed order/identity/foreign-sibling rows hold (`M-7`, `M-8`, `I-3`) | `§2.4` items 2/3 |
| **M-LS-4** | dispose() releases | build, subscribe, `dispose()` | each held handle's `unsubscribe()` called once, first answer `true`; active-set EMPTY; a post-dispose external write to `mem.list.<hostId>.order` delivers `NONE` (counter stays); `dispose()` returns normally, `void`, no throw | `§2.2` P1/P2/P5 |
| **M-LS-5** | dispose-then-use, records remain | `dispose()` then every landed method once (`setEntries`, `remove`, `setOrder`, `render`, `activate`, `close`, `keys`) | every method answers a valid result, no ownership resurrected (landed `A-16`); the double's written map STILL holds the host's records (dispose released subscriptions, not records) | `§2.2` P3/P6 |
| **M-SS-1** | construction registers one subscription per declared key | build with `keys: ['a','b','c']` on the double | active-set = `{mem.slots.<hostId>.a, mem.slots.<hostId>.b, mem.slots.<hostId>.c}` (or the same empty-until-first-turn reading), EXACT-count `3`, one handle per key, EXACT-REFERENCE each | `§2.4` item 1 |
| **M-SS-2** | the placement write lands; the container stays injected | `setNode('a', node)` on the double + injected `containerFactory` | the double's written map holds `mem.slots.<hostId>.a`; `containerFor('a')` is the FACTORY's product (reference-identical to the value `containerFactory('a')` returned), never a store value | `§2.1` item 2, `§2.3` |
| **M-SS-3** | a store-sourced placement change re-invokes the host FOR THAT KEY | an external `commit('mem.slots.<hostId>.b', …)` | the `b` subscriber's delivery counter reads `1`; the host refreshes key `b`'s placement; keys `a`/`c` receive NO delivery | `§2.4` items 2/3 (per-key re-invocation) |
| **M-SS-4** | dispose() releases every key | build, subscribe, `dispose()` | every held handle's `unsubscribe()` called once (`true`); active-set EMPTY; post-dispose external writes to any released key deliver NONE; `void`, no throw | `§2.2` P1/P2/P5 |
| **M-SS-5** | dispose-then-use, records remain | `dispose()` then every landed method once | landed per-method table holds (the `F-6`/`F-7`/`F-12` classes, `dispose` column: `void`, idempotent, no throw); the double's written map still holds the placement records | `§2.2` P3/P6 |

### 3.2 Documented fail-states (each FAILS — the negative rows, the leak's detection, the boundary's falsifiers)

| # | Fail-state | The drive | What FAILS | Positive control |
| --- | --- | --- | --- | --- |
| **F-LS-1** | **LS-LEAK arm (a) — a delivery after dispose** | build, subscribe, `dispose()`, then an external `commit('mem.list.<hostId>.order', …)` | the delivery counter reads `> 0` after dispose (any further delivery to a disposed host) | the SAME drive BEFORE dispose delivers exactly `1` |
| **F-LS-2** | **LS-LEAK arm (b) — an un-released handle** | build, subscribe, `dispose()` on the double | the double's active-subscription set is NON-EMPTY after dispose, or any held handle's first `unsubscribe()` answers `false`, or a handle's `unsubscribe()` is never called | the pre-dispose active-set = the declared set |
| **F-LS-3** | **the release emits a store event** | build, subscribe; `dispose()` with the real store (or a double with an event census) | the dispose call adds `events: 1+` (a `'severed'`, `'clear'` or `'set'` attributable to the release) — the `'severed'` arm is the SEVERANCE's release-reporting arm and a dispose is NOT a severance | a real `sever` on a store link emits exactly ONE `'severed'` naming the released reference (the store's own `F-11`, cited) |
| **F-LS-4** | **a second subscription authority** | subscribe the host's `mem.list.<hostId>.order` from OUTSIDE the module while the host is alive | the per-reference count reads `2` (the one-reference-one-subscription rule, `§2.10` item 4) — a harness drive, asserted on the double | the module-alone drive reads exactly `1` |
| **F-SS-1** | **SS-LEAK arm (a)** | build with `keys:['a']`, `dispose()`, external `commit('mem.slots.<hostId>.a', …)` | delivery counter `> 0` after dispose | the same drive before dispose delivers `1` |
| **F-SS-2** | **SS-LEAK arm (b)** | build, `dispose()` on the double | active-set non-empty, or a first `unsubscribe()` answering `false`, or a never-called handle | pre-dispose active-set = the declared key set |
| **F-SS-3** | **the release emits a store event** | build, `dispose()` with the event census | `events: 1+` attributable to the dispose call | the `sever` control of `F-LS-3` (the store's own `F-11`) |
| **F-SS-4** | **the store becomes a container source** | two drives: (a) a MODULE-side container-from-store path — a module byte that reads a store value (a `resolve` answer, a record value) into a container-obtaining position, or stores a container in its own record; (b) a `mem.slots.<hostId>.<key>` record whose VALUE IS (or contains) a container | drive (a) and drive (b) FAIL the boundary — the module never obtains a container from the store and its records never hold one (`§2.3` items 1/2; `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` unmoved, and the caller-side no-tree-reading shape is recorded as `§2.3` item 2's boundary, not driven — no in-tree wiring exists, `E-1`); the caller-side prohibition itself is the plan row 10 + `§5.9` row 23 negative's substance | the injected-factory drive (`M-SS-2`) passes, `containerFor` reference-identical to the factory's product |

**THE STORE-RECORD MISS DRIVE (`§2.1` item 5) — a declared outcome, not a fail-state:** a read of the module's own name
that answers `{found:false}` drives the module's bookkeeping-authority rule (no invented default; re-mint on the next
write). Positive control: after the MISS, the next `commit` re-mints the record and a subsequent read answers a HIT with
the module's own value. **A read answered by a refusal is out-of-reach for the module's own spellings** — the harness
double and the real store answer `mem.*` reads with HIT/MISS; the module consumes any returned record without throwing
(§2.1 item 3).

### 3.3 Invariants (hold in EVERY state, landed and store-backed)

| # | Invariant | Pinned by |
| --- | --- | --- |
| **I-LS-1** | **the store is a sharing channel, never a second authority**: no module answer consults a store name OUTSIDE the module's declared set (`mem.list.<hostId>.order`, `mem.list.<hostId>.node.<key>`), and no store value becomes a host DECISION (order, placement, refusal) — the ambient-read negative the differential executes | `§2.5` item 7, `P-SMB-LH-TP-1` |
| **I-LS-2** | the own-node ownership and foreign-sibling rules are UNCHANGED in every store state (the store holds the host's OWN records, never the container's — plan row 9) | `§2.1` item 3 |
| **I-LS-3** | **no throw class added**: every store-call result is a returned record; every module method keeps the landed no-throw totality (listhost `§2.1`, `I-8`) | `§2.1` item 3 |
| **I-SS-1** | **the container source is the injected factory in EVERY state** — store present/absent/cold/shadowing/committed — and `containerFor` never returns a store value | `§2.3`, `F-SS-4` |
| **I-SS-2** | the typed refusal for an undeclared key stays the module's (landed `F-1`/`F-3` — the store-backed turns change NO refusal code; the `'no-container'` declared-but-not-emitted member stays non-emitted, landed `F-11`) | plan row 10, slothost `§2.1` |
| **I-SS-3** | the per-key placement re-invocation is READ-ONLY and the write-loop terminates (item 3 of `§2.4`): the re-invoked path never writes the store and the landed idempotent render performs no child mutation on unchanged inputs | `§2.4` items 2/3 |

### 3.4 The STATIC rows — the rows `§2.5`'s prohibition table cites, ENUMERATED (each a scanner with its positive control)

| # | The row (contract) | The scan, closed against assembly and comments |
| --- | --- | --- |
| **S-LS-1** | the import census (static form of `P-SMB-LH-IM-1`): `src/shared/owned-list-host.ts` carries ZERO `import` statements — over the RAW bytes, a NORMALIZED view (string-literal concatenation joined, template substitutions joined), and COMMENTS-scanned-as-code | positive controls: a corpus with `import { createGraphStore } …`, a `require(…)`, and a dynamic `import(…)` EACH FAIL the row |
| **S-LS-2** | the no-module-level-binding scan (static form of `P-SMB-LH-IM-2`): no module-scope `const`/`let`/`var` binding of a store-shaped value; store-shaped tokens appear ONLY in the factory's parameter position and the closures' parameter-scoped references | positive controls: a module-level `const store = …` and a module-level `let store;` EACH FAIL |
| **S-LS-3** | **the zero-graph-seam row SURVIVES**: the module still imports NOTHING from `src/renderer/**` (the store is a parameter, never an import — `R3-4`); the landed `S-4`-class static is unchanged | a corpus importing `../renderer/store-core-graph.js` FAILS |
| **S-SS-1** | the slot import census (static form of `P-SMB-SH-IM-1`) — same three-view scan, same three positive controls | as `S-LS-1` |
| **S-SS-2** | the slot no-module-level-binding scan (static form of `P-SMB-SH-IM-2`) — same two positive controls | as `S-LS-2` |
| **S-SS-3** | the container-source static: no code path in `src/shared/slot-host.ts` obtains a container from a store value; the injected `containerFactory` is the SOLE container source; the record's value never becomes a container (scan the module's container-obtaining sites against the store-access sites — a store-access site feeding a container-obtaining site FAILS) | positive control: the injected-factory drive passes `M-SS-2` |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| # | Claim | Probe |
| --- | --- | --- |
| **E-1** | no in-tree `src/**` file imports either module (the reason `[T]` evidence is envelope-green and gate 6 is STRUCTURAL) | a glob/static probe: `createOwnedListHost`/`createSlotHost` appear in NO `src/**` import statement |
| **E-2** | **no store byte changes in this unit** | the store's frozen-artifact digests (`store-core-graph` = `sha256:2933fcb8…` per the last re-freeze record, `docs/decisions.md`'s wave records) recompute UNCHANGED after this unit's pass; the probe is the landing pass's git diff |
| **E-3** | the two landed suites' landing counts are the ones this unit adds to (listhost `62` rows as the doc-review recorded; slothost `61` rows as the green note recorded) | the landing pass's `npx vitest run tests/owned-list-host.test.ts tests/slot-host.test.ts` — the landed rows stay green and the new families add **⟶ RE-GRAINED 2026-10-06 (F-2/MED — the RED SET'S HOME; the as-filed probe is KEPT VISIBLE): the probe runs the unit's OWN red set — `npx vitest run tests/store-modules-bytes.test.ts` — with the landed suites re-run UNEDITED as their own regression homes (the `62`-row listhost / `61`-row slothost landing counts are THEIRS and stay green); the store-backed families add in the unit's own file, not in the landed suites.** |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**ONE RED→GREEN CYCLE — the queue row's second decision, DECIDED here with its reason.** The pair shares a boundary
(both hosts are `dispose()`-aware store subscribers, both carry the SAME three register-row shapes, both consume the
SAME frozen store surface), so the red set and the green land as ONE cycle: **one TestWriter pass authors the store-backed
families in BOTH landed test files** (`tests/owned-list-host.test.ts`, `tests/slot-host.test.ts`), one Implementer pass
makes them green, and one adversarial/blind/doc-review chain follows. **Reason: the alternative — two cycles — would run
the same store-surface discovery twice and double the gate toll for no boundary separation (the modules' store edges are
not independent authorities; they are two instances of one obligation shape).** `RCA-2`'s per-unit split is SATISFIED by
the `H2` split itself — this unit IS the child.

The red set is the `§3` store-backed families (`M-LS-*`/`M-SS-*`, `F-LS-*`/`F-SS-*`, `I-LS-*`/`I-SS-*`, `S-LS-*`/`S-SS-*`),
the `§3.5` existence rows, and the register's EXECUTED layer (`§5.5.1` — every row's `attempts` must RUN and report
held/broken; **an un-run register row is a FAILURE**, never a pass). The landed rows must stay green (the re-grain is
ADDITIVE).

**⟶ SUPERSEDED-BESIDE 2026-10-06 (F-2/MED — the RED SET'S HOME; the as-filed sentence above —
families in BOTH landed test files — is the FILING-TIME plan and is KEPT VISIBLE): the families'
HOME is the unit's OWN NEW FILE — `tests/store-modules-bytes.test.ts`, the unit's own red set
(`1475` lines, as the TestWriter's parallel pass authored it), and ONE red→green cycle spans it
(both modules' store-backed families in that one file). The landed suites
`tests/owned-list-host.test.ts` / `tests/slot-host.test.ts` REMAIN the implementations' own
regression homes, UNEDITED — their landed rows stay green, and no family byte and no register row
of this unit is added to them.**

### 4.2 Red-set authoring order

1. The harness/double layer first: the recording store double covering the members this unit's contract names (`commit`,
   `resolve`, `subscribe` returning `{name, subtree, unsubscribe}` handles, an active-subscription set, a written map, a
   delivery counter, an event census) — **the double conforms to the FROZEN surface's shapes for the used members and
   adds no member of its own.**
2. The store-backed positive families (`§3.1`), then the fail-states (`§3.2`), then the invariants (`§3.3`), then the
   statics with their positive controls (`§3.4`), then the existence probes (`§3.5`).
3. The register's executed layer (`§5.5.1`) — deterministic vitest tables over the declared drive counts; **no
   `fast-check`, no property runner, no new dependency** (`AGENTS.md` item 11(d)).
4. The REAL-store integration reading (the `[T]` layer may import the store — the frozen module's exports are landed):
   at least one row per module drives the hardware store (the delivery counter and the `events` census on a real store),
   plus the `F-LS-3`/`F-SS-3` negative (a dispose adds `0` events) against the real store.

### 4.3 What the red is NOT

- NOT a test of the store (the store's own suite owns that; this unit asserts ONLY the store-surface members its
  contract names, and can only FAIL by mis-using them).
- NOT a second-authority probe that re-opens a frozen rule (the `'severed'` arm's meaning, the per-reference count,
  the refusal union — each is cited, never re-ruled).
- NOT a test that requires the modules to absorb a throwing caller-supplied constraint/repair (the absorption lives at
  the wiring turn — `THROWING-SUPPLY-ABSORPTION-…`; the harness's turn IS the wiring for this unit's rows, but the rows
  assert the module's answers are UNCHANGED by a constrained receipt, never that the module swallows a throw).
- NOT a test that makes the module write the store from inside a listener (`§2.4` item 3's read-only rule).

### 4.4 The stop conditions (binding)

| # | Condition |
| --- | --- |
| **SMB-S-1** | A row is only satisfiable by changing a store byte, a store member or a store arm — **stop and report: it is a frozen-contract change and owes its own gate** |
| **SMB-S-2** | A row requires the module to IMPORT the store (a `src/renderer/**` import) — violates the no-import census and the declared-parameter rule — **stop and report** |
| **SMB-S-3** | A row requires the module to hold the store or a subscription at MODULE scope — violates the no-module-level-binding row — **stop and report** |
| **SMB-S-4** | A row asserts a substitution-satisfiable spelling (a banned token split across literals, or a second home for a reference) — the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` rule's anti-assembly discipline — **stop and report** |
| **SMB-S-5** | A row is only satisfiable by making `dispose()` delete the module's store RECORDS — violates `§2.2` P6 (dispose releases subscriptions, not records) — **stop and report** |
| **SMB-S-6** | A row is only satisfiable by making a listener WRITE to the store — violates `§2.4` item 3's read-only rule — **stop and report** |

### 4.5 Delegation gate

**This unit is delegable only once (a) this spec's spec gate has passed, and (b) a TestWriter has RUN and REPORTED the
red set** (`AGENTS.md` item 9). The red run's report must state: the file counts, the red set list, the register's
per-row attempts/held/broken, and the landed rows' status (must stay green). After the spec gate is approved, the chain
proceeds WITHOUT further permission per `AUTONOMY AFTER SPEC APPROVAL` (cited by row name) — the one approval the chain
waits for is the spec gate.

---

## 5. Wiring

### 5.1 Diff scope (what this unit MAY touch)

| File | What lands |
| --- | --- |
| `src/shared/owned-list-host.ts` | the store-backed bytes: the two option members, the closure read/write/subscribe turns, the re-invocation, the `dispose()` release loop (`§2.1`/`§2.2`/`§2.4`) |
| `src/shared/slot-host.ts` | the store-backed bytes: same shape, plus the container-source boundary's negative kept (`§2.3`) |
| `tests/owned-list-host.test.ts` | the `LS-` family + `P-SMB-LH-*` register rows (ADDITIVE; the landed rows stay) |
| `tests/slot-host.test.ts` | the `SS-` family + `P-SMB-SH-*` register rows (ADDITIVE; the landed rows stay) |
| `docs/specs/listhost.md` · `docs/specs/slothost.md` | the ANNOTATED-BESIDE amendment set of `§2.5` item 6 (`RCA-8(d)`: dated, superseded readings kept visible, never a rewrite) |

**⟶ RE-GRAINED BESIDE 2026-10-06 (F-2/MED — the RED SET'S HOME; the two landed-test-file rows
above are the AS-FILED MAY rows and are KEPT VISIBLE): the `LS-`/`SS-` families and the
`P-SMB-*` register rows land in the unit's OWN file — `tests/store-modules-bytes.test.ts` —
which this table's MAY set gains as the unit's own red-set home; the landed suites REMAIN the
implementations' own regression homes, UNEDITED (outside this unit's diff — no family byte and
no register row of this unit is added to them). THE MAY/DENIED SET, SO RE-STATED: **MAY** =
`src/shared/owned-list-host.ts` · `src/shared/slot-host.ts` · **`tests/store-modules-bytes.test.ts`**
· the two landed specs' annotations (`docs/specs/listhost.md` · `docs/specs/slothost.md`); the two
landed test files are NOT this unit's files (untouched regression homes); the DENIED list below is
UNCHANGED.**

**DENIED, with the reason:** `src/renderer/store-core-graph.ts` / `src/renderer/store-graph-references.ts` (FROZEN —
`E-2`'s digest probe), `src/renderer/renderer.ts` and any other `src/**` file (no in-tree consumer of either module
exists — the wiring that will hand stores to hosts is the consuming project's composition, not this unit's), the
fork's tree (`H-r6`), `docs/FORKER.md` and `docs/pending.md`'s fork-request region (`Q-14`'s one documentation pass is
owed AFTER this unit lands — `data-ownership-model-plan.md` `§5.6.4`), `docs/next-steps.md`/`docs/pending.md` (the
supervisor's), `package.json`/scripts/config (no new script, no new dependency).

### 5.2 The legs this unit MUST run

| # | Leg | What it is |
| --- | --- | --- |
| **1** | `npm test` `[T]` | the whole of this unit's green — the two suites' store-backed families + all register rows |
| **2** | `npm run typecheck` `[H]` | `src/**` ONLY — it never reads `tests/**` |
| **3** | `npm run typecheck:tests` `[H]` | the ADDITIVE fourth leg — the ONLY typecheck leg that reads `tests/**` (`AGENTS.md` item 4's ruled clause); a claim about THIS unit's own test file must cite this leg |
| **4** | `npm run build` `[H]` | the esbuild bundles (main cjs + preload cjs + renderer esm) |
| **5** | standalone strict `tsc --noEmit` over this unit's two test files | the TestWriter-side strictness leg (the sibling convention; a `--strict --target ES2022 --lib ES2022,DOM,DOM.Iterable --module ESNext --moduleResolution bundler --types node,vitest/globals` compile) |

**`[U]` NOT OFFERED and `[D]` NOT CLAIMED — STRUCTURAL, three-part:** **(1)** each module is imported by NO `src/**`
file (`E-1`), so no assembled rendered flow exists to exercise; **(2)** the modules' render paths are shim-tree rows in
the `[T]` layer exactly as landed; **(3)** gate 6 is `STRUCTURAL` — the word `waived` may not be substituted for it.

### 5.3 The DONE row's shape

The unit's DONE row (the supervisor's to write at gate 10) must carry: the unit id/wave (`H2a` · wave `H`), the honest
gate list (spec → red → green → adversarial + PBT audit → blind greens → doc review → trio/legs → DONE), the register's
per-row attempts/held/broken with the **printed terms** (`79 = 6 + 4 + 31 + 6 + 4 + 28`, `§5.5.3`), an un-run register
row listed as a FAILURE, the landed suites' added-count delta and their green status, the `[U]`-NOT-OFFERED structural
reason, the store's frozen digests recomputed UNCHANGED (`E-2`), and the amendment set of `§2.5` item 6 as landed.

**⟶ RE-GRAINED BESIDE 2026-10-06 (F-2/MED — the RED SET'S HOME; the as-filed DONE-row clause is
KEPT VISIBLE): "the landed suites' added-count delta and their green status" is re-read — the
ADDED-count delta is measured on the unit's OWN file (`tests/store-modules-bytes.test.ts`); the
two landed suites' green status is their OWN (they are not edited by this unit and carry no added
family). The printed register terms (`79 = 6 + 4 + 31 + 6 + 4 + 28`, `§5.5.3`) and the rest of
this DONE-row shape are UNCHANGED.**

### 5.4 Rollback

The store-backed bytes are contained in the two module files + two test files + the two landed specs' annotations:
reverting this unit's diff (a) restores the two modules to their landed byte sets (their landed suites re-green) and (b)
leaves the store byte-identical by construction (`E-2`). **No migration exists and none is owed**: the records are
`mem`-tier, per-host, written-by-the-host — there is no legacy carrier to migrate (the landed hosts kept their state in
their own bookkeeping).

### 5.5 The typed Property register

**`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` (cited by row name) binds: a code-bearing unit's spec MUST carry its typed
`§5.5.1` register BEFORE its red set is authored; the zero-row exemption is NOT available here** (this unit's modules
are code-bearing and their landed registers are this unit's re-grain subjects). **The `≤8` per-module figure is a
component-breakdown SIGNAL, never a ceiling and never a reason to drop a discernible property**
(`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`): each module carries exactly its THREE mandated
rows — the plan's `§5.2.7` round-3 item (4) set — and no other discernible property is left unenumerated (the disposal
post-conditions, the leak arms and the container-source negative are `§3` rows, not register rows; a `§6`/`FS-n`
citation is never used as a register row). **A declared term IS a DRIVE count**
(`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`); the total is printed WITH its terms
(`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).

### 5.5.1 THE REGISTER — `6` typed rows (`4` `P-IM` + `2` `P-TP`), ALL executed deterministically, no PBT harness

**Typed rows only — `P-IM` (invariant) and `P-TP` (totality); no `F-` row and no `§6` citation is a register row.**

| # | Type | Strategy id | What it asserts | Drive | Cap |
| --- | --- | --- | --- | --- | --- |
| **P-SMB-LH-IM-1** | `P-IM` | `S-SMB-LH-IM-1` | **THE LIST HOST'S IMPORT CENSUS, WITH ITS POSITIVE CONTROL:** `src/shared/owned-list-host.ts` carries ZERO import statements — over the RAW bytes, a NORMALIZED view (concatenation joined, template substitutions joined) and COMMENTS-scanned-as-code; the store handle arrives ONLY as a declared call parameter (the module's own bytes import nothing) | **`6` attempts** = `3` module readings (raw · normalized · comments-as-code) + `3` positive controls (a corpus carrying `import { createGraphStore } from '../renderer/store-core-graph.js'` MUST FAIL · a corpus carrying `require('../renderer/store-core-graph.js')` MUST FAIL · a corpus carrying `import('../renderer/store-core-graph.js')` MUST FAIL) | `6 ≤ 100` |
| **P-SMB-LH-IM-2** | `P-IM` | `S-SMB-LH-IM-2` | **THE LIST HOST'S NO-MODULE-LEVEL-BINDING ROW:** the store handle (and each subscription handle) appears ONLY inside the factory's parameter declarations and its closures' parameter-scoped references; no module-scope `const`/`let`/`var` holds it; the options type declares the `store` member as a readonly call-parameter member | **`4` attempts** = `1` module scan (top-level scope, closed against assembly and comments) + `2` positive controls (a module-level `const store = …` MUST FAIL · a module-level `let store;` MUST FAIL) + `1` declaration-position check (the options type declares the member) | `4 ≤ 100` |
| **P-SMB-LH-TP-1** | `P-TP` | `S-SMB-LH-TP-1` | **THE LIST HOST'S STORE-STATE-INDEPENDENCE DIFFERENTIAL:** for the FIXED ARGUMENT TUPLE (fixed options incl. `hostId` + the fixed 8-call script), the canonical projection of every answer is IDENTICAL across THREE runs whose ONLY difference is the store's tier state — COLD (no nodes under the module's names) · SHADOWING (the module's names pre-held at `temp` — the tier `commit` clears, exercising the mid-script clear-event fan-out) · COMMITTED (the module's names pre-held at `file` — never cleared by a `mem` commit). **Comparator: the round-3 `R-3` rule — canonical structural comparison for object answers (the `ListHostResult` records and the host object's projection: own enumerable keys, sorted by key, primitives by value), `===` for primitive answers; the host OBJECT itself is compared by its member projection (a fresh identity every call, so `===` is unsatisfiable-by-construction)**. The readbacks (the module's declared names, read through `resolve` after the script) are compared by canonical equality. **The tier-state differences legitimately change the STORE's internal transitions (clears, events); they NEVER change a module answer — a projection that differs across runs FAILS.** | **`31` attempts** = `3` runs × (`8` script answers + `2` readbacks) + `1` positive control (a fixture module whose answer consults an AMBIENT name — a name outside its declared set — MUST FAIL the cross-run equality) | `31 ≤ 100` |
| **P-SMB-SH-IM-1** | `P-IM` | `S-SMB-SH-IM-1` | **THE SLOT HOST'S IMPORT CENSUS, WITH ITS POSITIVE CONTROL** — same three-view scan over `src/shared/slot-host.ts`, same three positive controls | **`6` attempts** = `3` module readings + `3` positive controls | `6 ≤ 100` |
| **P-SMB-SH-IM-2** | `P-IM` | `S-SMB-SH-IM-2` | **THE SLOT HOST'S NO-MODULE-LEVEL-BINDING ROW** — same shape, its own scan and the same two positive controls + the declaration-position check | **`4` attempts** = `1` scan + `2` positive controls + `1` declaration-position check | `4 ≤ 100` |
| **P-SMB-SH-TP-1** | `P-TP` | `S-SMB-SH-TP-1` | **THE SLOT HOST'S STORE-STATE-INDEPENDENCE DIFFERENTIAL** — same form as `P-SMB-LH-TP-1`, with the slot host's fixed 8-call script (`setNode`, `setOrder`, `render`, `keys`, `containerFor`, `remove`, `render`, `dispose`) and ONE readback (`mem.slots.<hostId>.<key>` for one declared key) | **`28` attempts** = `3` runs × (`8` script answers + `1` readback) + `1` positive control (the ambient-reading fixture MUST FAIL) | `28 ≤ 100` |

**REGISTER-ROWS 5.5.1's `≤8`-per-module READ:** `owned-list-host` carries `3` rows (≤ 8) · `slot-host` carries `3` rows
(≤ 8) — the mandated set is complete and no discernible property is left unenumerated.

### 5.5.2 The register's honesty block — what is NOT proven

1. **The differential proves the ANTI-AMBIENT claim, not the store's correctness.** The fixed script's answers are the
   module's ARGUMENT-DETERMINED surface (computed from the fixed tuple); a cross-run projection difference proves the
   module consulted ambient tier state, and the positive control makes the probe non-vacuous. The module's store-touching
   turn EFFECTS (the writes themselves, the delivery counts, the event census) are the `§3` rows' subjects, not this
   row's — no over-strength claim is made here.
2. **The differential does NOT claim the store's writes are value-deterministic across tier states** — run C legitimately
   leaves the pre-seeded `file` copy of the module's names in place (a `mem` commit never clears a higher tier) while the
   module's OWN `mem` copies are identical across runs; the readbacks compare the module's names as READ (the `mem` hit),
   and the row's equality is over the ANSWERS, never over the store's full byte state.
3. **No timing figure, no length census, no suite size is claimed anywhere in this file** (`RCA-12`).

### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THE DECLARED TOTAL, WITH ITS TERMS: `79 = 6 (P-SMB-LH-IM-1) + 4 (P-SMB-LH-IM-2) + 31 (P-SMB-LH-TP-1) + 6
(P-SMB-SH-IM-1) + 4 (P-SMB-SH-IM-2) + 28 (P-SMB-SH-TP-1)`** (chain `6 → 10 → 41 → 47 → 51 → 79`; per-family subtotals
**IM `20` · TP `59`**). **Caps: `79 ≤ 400` ✔ · per-row maximum `31` (`P-SMB-LH-TP-1`) ≤ `100` ✔ · stop-after-5
consecutive failures applies per row.** **A total that is not the sum of its own terms, or a total quoted without its
terms, is a review finding** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) — the form above is the operative one; a
mis-sum is corrected BY ANNOTATION beside the as-filed form, never by silent rewrite.

---

## 6. Honest statements (recorded so no later pass over-reads this unit)

1. **A green `[T]` suite is envelope/pure-layer evidence — never assembled-app evidence** (`RCA-12`): the modules are
   imported by NO `src/**` file (`E-1`), so every green claim about them is a module-level green; **the store-backed
   reading of the hosts' records is not observable in any assembled flow this repo ships.**
2. **The `user-flow-audit.md` `§7.1` predicate is determined NOT TRIGGERING, and NO report is due.** Limb A (an authored
   rendered surface): this unit authors no element, no envelope node, no handler body, no component binding, no control.
   Limb B (a changed user-visible flow): the modules' flows are harness-only today (no in-tree consumer), so no
   assembled rendered flow changes. **A pass that files a zero-row `§5.U` report for this unit has failed this item.**
3. **This unit performs NO fork-facing recording** — `Q-14`'s one documentation pass (`docs/FORKER.md` §4, the
   `docs/pending.md` fork-request region, the feedback document) is owed AFTER this unit lands and is not this unit's.
4. **The release event-silence (`F-LS-3`/`F-SS-3`) is a claim about THIS unit's path choice, not a re-reading of the
   store's `'severed'` arm** — the arm stays the severance's release-reporting arm (`store-core-graph.md` §2.10 item 3),
   and a future host that outlives a store-side severance of its records OBSERVES the `'severed'` event exactly as the
   store contract declares (the store's own `F-11` row governs; this unit asserts nothing about that path beyond its
   frozen shape).

---

## 7. Falsification / stop conditions

1. **The spec-gate falsification:** a review that finds a clause above contradicts a cited §/row of the plan, the store
   contract, `docs/decisions.md` (by row name) or the two landed module specs — with BOTH citations named — is a finding
   against THIS file, and the architect's ruling settles it; a contradiction this pass cannot resolve on its own is a
   genuine blocker report (the one class that may not be resolved in-pass).
2. **The assembly rule:** every static row scans a NORMALIZED view (concatenation joined) and scans COMMENTS as code —
   the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` rule (*a static prohibition satisfiable by splitting a token is not
   satisfied*) binds every scanner this unit authors.
3. **The leak alarm is the register's disposition of last resort:** a leak observed by any of the three arms
   (`F-LS-1`/`F-SS-1` delivery · `F-LS-2`/`F-SS-2` handle shape · `F-LS-3`/`F-SS-3` event negative) blocks the passing
   of `P-SMB-*-TP-1`'s dispose step and of `M-LS-4`/`M-SS-4` — the unit cannot report green while a leak arm is red.

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from as written

**None is reported at filing: every clause above is stated with its drive or its working default.** The three judgment
clauses are recorded as DECIDED or as working defaults with their owners:

### 7a.1 The decision/working-default ledger

| # | Item | Decision / working default | Owner of a reversal |
| --- | --- | --- | --- |
| **1** | the store-record MISS handling (`§2.1` item 5) | **WORKING DEFAULT**: bookkeeping-authority + re-mint on the next write — never a default, never a throw. The alternative (an in-write re-mint at the miss site) costs one extra store write per miss and is NOT taken | the architect; a reversal is a spec amendment |
| **2** | the `dispose()` release path | **DECIDED: unsubscribe-on-dispose** (`§2.2`). The alternative (`sever`-driven release) cannot satisfy any of P1/P2/P5's observables without emitting `'severed'` — recorded so no pass re-litigates it | the architect; a reversal OWES a gate and a re-derivation of `§2.2`'s observable set |
| **3** | one red→green cycle vs two | **DECIDED: ONE cycle** (`§4.1`) | the architect; a reversal re-splits the red chain, not the unit |
| **4** | the subscription registration moment (construction vs first store-carrying turn) | **WORKING DEFAULT**: the count reads `1` from the first store-carrying turn and stays `1` (`M-LS-1`/`M-SS-1` accept either the construction-registration or the lazy reading of the SET's timing; the SET's membership and the "stays 1" half are fixed) | the TestWriter pins ONE reading in the red set and reports it |

---

## 8. Falsification, cross-references and the citation index

| §/Row | Cites (by §/row id or ROW NAME) |
| --- | --- |
| `§0` rulings 1–14 | `docs/decisions.md` `DECIDED: H2 (U-STORE-MODULES) IS SPLIT PER MODULE` (+ `D-GP-SAD-5`) · `docs/next-steps.md` row `H2a` · `data-ownership-model-plan.md` `§5.2.7` (round-3 table rows 9/10, round-3 item (4), `15 = 8 STORE-BACKED + 7 PURE` with the byte terms `15 = 2 + 6 + 7`) · `§5.6.1`/`§5.6.5` (the byte terms, the fork consequence) · `§6.5`'s `U-STORE-MODULES` row (round-2 clause (b)) · `§1.3` `R-1`/`R-2`/`R-3`/`R-5`/`R-6` · `store-core-graph.md` `§2.1`/`§2.8`/`§2.10` items 1–6 · `docs/decisions.md` `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` · `CONSTRAINTS-ARE-PASSED-FUNCTIONS` · `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION` · `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` · `AUTONOMY AFTER SPEC APPROVAL` · `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE` |
| `§1` | the split ruling's boundary (i) vs (ii); `H2b`'s spec `OWED`; `Q-14`'s recording pass `§5.6.4`; `H-r6` |
| `§2.1` | plan `§5.2.7` rows 9/10; store `§2.1` (`GraphSubscription`, `subscribe`, the `GraphStore` members), `§2.8` items 1/3/4, `§2.2` `P-5`; `R-3`'s comparator; `listhost.md`/`slothost.md` totality rows |
| `§2.2` | store `§2.10` items 3/4/5; `store-core-graph.md` `F-11`; listhost `M-14`/`A-16`; slothost `M-13`/`I-5`; the queue row's decision cell |
| `§2.3` | `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED`; slothost `§2.1`'s container-source clause; plan `§5.6.1` row 10 + `§5.9` row 23 |
| `§2.4` | store `§2.10` items 4/5/6; `§2.4`'s `RCAP-3` annotation; listhost `I-2`/`A-17`; slothost `M-3`/`A-6`-family |
| `§2.5` | plan `§1.3` `R-1`/`R-6`; the landed purity/import rows named in item 6 (`listhost.md` `§2.2` prohibition 4/5, `§4.4` `S-6`; `slothost.md` `§1` bullet, `§2.2` prohibition 4, `§4.4` `S-7`) |
| `§3` | the landed M/F/I/S rows cited per cell (listhost `M-7`/`M-8`/`M-13`/`M-14`, `I-2`/`I-3`/`I-5`/`I-8`, `A-16`, `A-17`; slothost `M-3`/`M-7`/`M-13`/`M-14`, `F-1`/`F-3`/`F-6`/`F-7`/`F-11`/`F-12`, `I-5`/`I-8`; store `F-11`) |
| `§5.5` | `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` + the register-row family (cited by row name) |
| `§6` | `docs/specs/user-flow-audit.md` `§7.1`; `RCA-12` |
| `§8` (this index) | every § above |

**FILE-END NOTE (the sibling convention):** nothing follows this section's `§3a`/`§3b` blocks; the adversarial seed set
and the disposition table sit at the file end so that no later annotation lands after them.

---

## 3a. Adversarial findings — status as filed: `OWED`; this table is the SEED SET for the pass that will run

| # | Seed (the class the pass must probe) | Note |
| --- | --- | --- |
| **ADV-SMB-1** | a listener that calls `dispose()` during its own delivery (the `§2.2` P4 in-flight rule's live drive) | the module-level guarantee is pinned; the store's fan-out is the store's own (`ADV-GR-5`-family, cited) |
| **ADV-SMB-2** | a host whose `hostId` collides with another live host's — two hosts, one `mem.list.<hostId>.*` namespace | the plan's records are `mem.list.<hostId>.*` per host; a collision is a CALLER composition matter (the module writes what it is given) — the pass's verdict will be recorded here |
| **ADV-SMB-3** | a post-dispose `dispose()` inside a re-entrant re-invocation | `M-LS-5`/`M-SS-5`'s landed-post-dispose rows govern |
| **ADV-SMB-4** | the store-backed slot host with a `containerFactory` that THROWS (the landed `F-12` degradation under the store-backed shape) | the landed degradation is UNMOVED (`F-12`), and the store-backed turns must not change it |
| **ADV-SMB-5** | a writing listener (a listener that makes a store write from inside the re-invocation) | the read-only rule `§2.4` item 3 — the pass must confirm the red set contains the positive negative, or record its absence as a finding |

## 3b. The adversarial pass's disposition table — the SHAPE this contract will be reconciled to

**As filed this table is EMPTY and every row of `§3a` reports its disposition here at the adversarial gate (gate 4,
recorded with one of the six recorded dispositions, never a bare `OWED`), plus the read-only PBT audit's verdicts on the
`§5.5.1` rows (over-strength / under-assertion / evasion — each dispositioned here).** **A unit DONE row that cites no
adversarial pass, or whose findings are unrecorded, is a review finding (`RCA-3`).**

**⟶ STATUS OF THE TABLE ITSELF, 2026-10-06 (the H2a GATE-4 LANDING PASS; the as-filed shape above
is the FILING state and is KEPT VISIBLE): NO LONGER EMPTY — the gate-4 doc-review audit returned
`20` findings naming this unit's documents, every one dispositioned below (NO bare `OWED`), plus
the read-only PBT audit's verdict on the `§5.5.1` register. THE DISPOSITION VOCABULARY, defined so
no row carries an undefined token: **`HOST-FIX`** — a document finding owed to THIS spec-writer
pass, landed here (this file + the two landed specs, `RCA-8(d)` annotate-beside); **`RED-SET-FIX`**
— a finding whose remedy lives in the red set, owed to the TestWriter's PARALLEL pass
(`tests/store-modules-bytes.test.ts`); **`PAR-note`** — a note the parallel pass records beside a
cell, no host document change owed; **`SATISFIED`** — a finding the audit verified SATISFIED, with
what was verified named; **`GATE-10`** — a tracker-cell fix owed to the supervisor's DONE-row pass
at gate 10; **`DOC-REVIEW-ITEM`** — an item CARRIED to the gate-8 documentation-review pass
(recorded here, not required at this gate).**

| # | The finding (as reported by the gate-4 audit) | Disposition | Owner | What it lands / carries |
| --- | --- | --- | --- | --- |
| **F-1** | **HIGH — THE NAMED LANDED-ROW AMENDMENT SET.** The H2a queue row's own words — *"their `dispose()` rows and their store-emitting rows are what this child amends"* — verified against the landed specs: NONE of the named rows carried the amendment; the landed specs CONTRADICT the landing modules (a `store`/`hostId` option member exists on both factories while the specs still say "zero store") | **`HOST-FIX`** | THIS spec-writer pass | the full annotated-beside amendment set, landed in this pass: `docs/specs/listhost.md` (`§1` out-of-scope bullet · `§2.2` prohibitions 4/5 · `§2.1`'s `dispose()` doc · `§3.1 M-14` · `§3.3 I-5` · `§3a A-16`/`A-13` · `§3b ADV-LH-11` · `§5.5.1` re-grain) · `docs/specs/slothost.md` (the mirror set + the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` caveat) + the misquote correction in THIS file's `§2.5` item 6 |
| **F-2** | **MED — THE RED SET'S HOME IS UNDECLARED.** `§4.1`, `§5.1`, `E-3`, `§5.3` still name `tests/owned-list-host.test.ts` + `tests/slot-host.test.ts` as the families' home; the red set lives in the unit's OWN new file `tests/store-modules-bytes.test.ts` (`1475` lines, the TestWriter's parallel pass) | **`HOST-FIX`** | THIS spec-writer pass | the four cells re-grained BESIDE (this file: `§4.1`, `§5.1`, `§3.5 E-3`, `§5.3`); the MAY/denied set re-stated: the landed suites remain the implementations' own regression homes, UNEDITED |
| **F-3a** | a gate-4 finding on this unit's red-set clauses (family F-3, content per the audit record) | **`RED-SET-FIX`** | the TestWriter's parallel pass | the red set, authored/executed in `tests/store-modules-bytes.test.ts` |
| **F-3b** | same family | **`PAR-note`** | the TestWriter's parallel pass | a cell noted beside in the red-set pass; no host document change owed |
| **F-3c** | same family (a) | **`RED-SET-FIX`** | the TestWriter's parallel pass | the red set (as F-3a) |
| **F-3d** | same family (a) | **`RED-SET-FIX`** | the TestWriter's parallel pass | the red set (as F-3a) |
| **F-3e** | same family (a) | **`RED-SET-FIX`** | the TestWriter's parallel pass | the red set (as F-3a) |
| **F-3f** | same family (a) | **`RED-SET-FIX`** | the TestWriter's parallel pass | the red set (as F-3a) |
| **F-3g** | same family (b) | **`PAR-note`** | the TestWriter's parallel pass | a cell noted beside (as F-3b) |
| **F-3h** | same family (b) | **`PAR-note`** | the TestWriter's parallel pass | a cell noted beside (as F-3b) |
| **F-4a** | **THE GATE-8 CARRIES — TWO `DOC-REVIEW-ITEM`s, RECORDED HERE, NOT REQUIRED AT THIS GATE:** **(i) the `F-SS-4` DUAL ID** — the same id names BOTH the second-subscription negative (`§2.4` item 4, `§2.5` prohibition 3) AND the container-source falsifier (`§3.2`'s row, `§2.5` prohibition 4): the gate-8 pass **re-ids the spec's `§3.2` container-source-falsifier cell to `F-SS-5`** and **updates the `§2.4`-item-4 / `§2.5`-prohibition-3 citations to the audit authority**; **(ii) the `E-2` INSTRUMENT MISMATCH** — the recorded frozen-store digest (`sha256:2933fcb8…`, `E-2`'s cell) vs the current tree: the gate-8 pass fixes the citation to the store's authoritative freeze record | **`DOC-REVIEW-ITEM`** | the gate-8 documentation-review pass | two carry items recorded here (this row); landed by the gate-8 pass |
| **F-5a** | a gate-4 PBT-audit finding on the `§5.5.1` register (family F-5, content per the audit record) | **`RED-SET-FIX`** | the TestWriter's parallel pass | the register's executed layer, run in `tests/store-modules-bytes.test.ts` |
| **F-5b** | same family (a) | **`RED-SET-FIX`** | the TestWriter's parallel pass | the register's executed layer (as F-5a) |
| **F-5c** | **SATISFIED — THE DIFFERENTIAL MECHANICS VERIFIED:** the store-state-independence differential rows (`P-SMB-*-TP-1` — the round-3 `R-3` comparator: `===` for primitive answers, canonical structural comparison for the host-object projections; the COLD / SHADOWING / COMMITTED three-tier runs; the ambient-reading positive control) verified by the audit | **`SATISFIED`** | — (verified, recorded) | nothing further owed; the mechanics stand as written |
| **F-5e** | **SATISFIED — THE REGISTER ARITHMETIC VERIFIED:** `§5.5.3`'s declared total printed WITH its terms — `79 = 6 + 4 + 31 + 6 + 4 + 28` (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, cited by row name; caps `79 ≤ 400` · per-row max `31 ≤ 100`) — verified by the audit | **`SATISFIED`** | — (verified, recorded) | nothing further owed; the arithmetic stands as printed |
| **F-6a** | a gate-4 finding on this unit's red-set/register cells (family F-6, content per the audit record) | **`RED-SET-FIX`** | the TestWriter's parallel pass | the red set (as F-3a) |
| **F-6b** | same family (a) | **`PAR-note`** | the TestWriter's parallel pass | a cell noted beside (as F-3b) |
| **F-6c** | same family (a) | **`PAR-note`** | the TestWriter's parallel pass | a cell noted beside (as F-3b) |
| **F-6d** | **THE QUEUE-ROW CELLS AT GATE 10:** the `H2a` queue row's spec cell (`OWED — not filed`) and the `§Q` mechanism-set flip cells flip WHEN THE UNIT LANDS — at the gate-10 DONE-row pass | **`GATE-10`** | the supervisor's DONE-row pass | the queue-row cells (the DONE row + ledger move); not this pass's file |

**THE COUNT: `19` finding rows above + the PBT audit's verdict line below = the gate-4 audit's
`20` findings — NO bare `OWED` among them.** *(The audit's sub-letter enumeration is transcribed as
reported to this pass — F-3a–h (eight) · F-4a (one) · F-5a/b/c/e (four) · F-6a–d (four), beside
F-1/F-2; if the audit record's lettering differs, the gate-8 documentation review reconciles the
count and records it there.)*

**THE READ-ONLY PBT AUDIT'S VERDICT LINE — `§5.5.1`'s six executed register rows reviewed for
over-strength / under-assertion / evasion, each verdict dispositioned here:** the register's design
is verified on its two quantified halves — **`F-5c`/`F-5e` `SATISFIED`** (the differential
mechanics and the register arithmetic, above); **`F-5a`/`F-5b` `RED-SET-FIX`** — the executed-layer
evidence (per-row attempts/held/broken, strategy ids `S-SMB-*`, the declared caps) is owed by the
red set in the unit's OWN file, `tests/store-modules-bytes.test.ts`; **no over-strength claim
survives the review** (the differential proves the anti-ambient claim, not the store's correctness —
`§5.5.2`'s honesty block is the audit's own basis), and **an un-run register row is a FAILURE,
never a pass** — the standing rule, unchanged.