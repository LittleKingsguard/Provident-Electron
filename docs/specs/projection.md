# Spec — `U-PROJ`: the pure projection + **total** applier (`SCH-8`'s projection half)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-PROJ`**, the **projection half** of
`SCH-8` `LAYOUT-STATE-PROJECTION`; **`U-CENSUS` is a SEPARATE unit and stays in wave E**). **The unit
has NOT run: nothing here is implemented, no red set has been authored and no leg has been run by
this pass.** This pass files the contract.
**⟶ STATUS NOTE — 2026-09-27, THE `U-MOUNTGUARD` DONE PASS: THE WAVE-D GO-AHEAD WAS GIVEN.** The
architect **GAVE the wave-D go-ahead (2026-09-27)** and **`U-MOUNTGUARD` is `DONE`** (the ledger's
**FOURTH `DONE` row**; the counts are **`4 DONE / 16 open`**). **This is a STATUS/ANNOTATION note: it
amends no normative clause, adds no row and moves no section number — in particular it does NOT touch the
four ruling notes in §0A or any of the `CORRECTED`/approved cells they carry.** **What it supersedes, in
its STATUS half only:** the go-ahead paragraph below (and §0 **ruling 8**, §0 **ruling 9**'s closing
sentence *"the go-ahead of ruling 8 is still absent"*, §4.5, §7 item 1), whose *"BLOCKED on the
architect's go-ahead … Wave D is authorised by no ruling currently on the record … the go-ahead of ruling
8 is still absent … RED SET OWED — NOT AUTHORED, NOT RUN"* clauses are **kept visible and are the filing
and ruling passes' state**. **What it does NOT change:** `AGENTS.md` item 9 still binds (delegable only
once the red set is **RUN and REPORTED**), and the **wave-D order is unskipped** — `U-MOUNTGUARD`
(`DONE`) → `U-LISTHOST` → `U-SLOTHOST` → **this unit (`U-PROJ`), which lands LAST** — so this unit's
ordering precondition is `U-SLOTHOST`, not the go-ahead. **Its exact next action: `TestWriter red` RUN
and REPORTED → green → adversarial → blind greens → legs → documentation review → DONE**, with
`docs/next-steps.md` `## OPEN` row **`D4`** the queue pointer. **The four rulings in §0A are untouched and
still bind** (`A-11` reuse, `A-2`/`F-4` `'accessor-threw'`, `A-3` `Object.create(null)`, `A-7`
re-entrancy).

**⟶ FOURTH STATUS NOTE — 2026-09-27, THE `U-PROJ` `§5.5` RE-DERIVATION PASS (SPEC TEXT ONLY; this
note amends no normative clause and moves no section number).** **The ledger is now `6 DONE / 14
open` (`6 + 14 = 20`): `U-LISTHOST` and `U-SLOTHOST` have BOTH landed `DONE` — the ledger's FIFTH and
SIXTH `DONE` rows — and this unit (`U-PROJ`, row `D4`) is the LAST wave-D unit and the NEXT in the
order.** **This unit's ONE surviving precondition is its own `TestWriter red` set RUN and REPORTED
(`AGENTS.md` item 9)** — the wave-D order is satisfied (`U-MOUNTGUARD` → `U-LISTHOST` →
`U-SLOTHOST` → this unit, all three predecessors `DONE`) and the go-ahead was given. **What THIS pass
discharged, and with it the gate-11 blocker:** `§5.5`'s **RECORDED ZERO-ROW EXEMPTION is SUPERSEDED
by the typed register at `§5.5.1`** (**8 rows** of **this unit's own `P-PJ-*` kind**, **`231`
attempts**, pinned seed **`20260927`**, caps `≤100`/row · `≤400` total · stop-after-5, **no new
dependency**) — the re-derivation `docs/pending.md` **§G**'s `U-PROJ` row records as **BLOCKING for
that unit's red set only** (the ACTIVE decision row is `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` in
`docs/decisions.md`) — and the old exemption is **kept byte-identical as `§5.5.0`** under its own
heading. **The same pass recorded `§7a`** — **eleven** clauses this spec leaves a TestWriter unable to
derive a falsifiable row from, each with its clause pair, a best reading and an owner (**this pass
rules NONE of the eleven**). **Reconciling the trackers is the SUPERVISOR's pass, not this one:**
`docs/next-steps.md`'s `D4` row, `docs/pending.md` §G's `U-PROJ` cell and the counts above are
**recorded here and left for that pass to flip** (`§8`'s D4 annotation says the same). **The four
2026-09-27 rulings (`A-11` reuse, `A-2`/`F-4` `'accessor-threw'`, `A-3` `Object.create(null)`, `A-7`
re-entrancy) are UNTOUCHED in substance and still bind** — this pass only annotates the status cells
and the exemption, never a ruling. **`§5.3 → §5.5` remains a deliberate gap with no `§5.4`, and
nothing was renumbered.**

**Go-ahead state — stated plainly: this unit is BLOCKED on two things only — the architect's go-ahead
for the wave-D plan, and its own red set.** *(The two-argument projection signature was formerly listed
here as a third, OPEN item; **it is no longer open — the architect APPROVED the correction
`project(values, specOf)` on 2026-09-27** (this file's §0 ruling 1 annotation, §7 item 5 and §8's
approved row; `docs/decisions.md`'s `PROJECTION-SIGNATURE-TWO-ARGUMENTS` ACTIVE row; the gate record's
dated ruling note). The go-ahead and the red set remain the blockers, unchanged.)* **⟶ SUPERSEDED ON ITS REMAINING ORDERING HALF (2026-09-27, the `U-PROJ` `§5.5` RE-DERIVATION pass): the two blockers it named are now ONE, and neither is the go-ahead or the ordering.** **`U-LISTHOST` and `U-SLOTHOST` have BOTH landed `DONE`** (the ledger's **FIFTH** and **SIXTH** `DONE` rows — their records are `docs/next-steps.md`'s `## DONE — U-LISTHOST` and `## DONE — U-SLOTHOST` sections, cited by SECTION, never by line), so **the ledger counts are `6 DONE / 14 open` (`6 + 14 = 20`)** — *the `4 DONE / 16 open` / `5 DONE / 15 open` figures this file carries elsewhere are earlier passes' readings, kept visible per the annotate-never-rewrite convention.* **This unit (`U-PROJ`, row `D4`) is therefore the LAST wave-D unit and the NEXT in the order**, and **its only surviving precondition is its own `TestWriter red` set RUN and REPORTED** — `AGENTS.md` item 9 unchanged — **which this pass unblocks** (`§5.5.1` is the gate-11 register the red set was waiting on; see the banner under `## 5.5`). **The wave-D order is spent: it is satisfied, not skipped.** The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
*"the go-ahead is WAVE B ONLY … waves C–F are not authorised by this go-ahead"*), and it is **spent**.
Wave **D** is authorised by no ruling currently on the record, so this unit's red set may not be RUN
and it may not be delegated (`AGENTS.md` item 9). **Status of its red set: RED SET OWED — NOT
AUTHORED, NOT RUN** (RCA-1). **Ordering obligation from its queue row: it lands last in wave D,
after `U-SLOTHOST`** (the amendment's appended **`Amendment record (A-d4…A-d8)` §3**, wave **D** —
*"`U-MOUNTGUARD` → `U-LISTHOST` → `U-SLOTHOST` → `U-PROJ`"*; and `docs/next-steps.md`'s `## OPEN` row
**D4**'s `Blocked on` cell). Source of this unit: that amendment record's §2.2 `SCH-8` row (**BOTH
halves adopted; the `computeTrackVars` refile is WITHDRAWN** under A-d4 — **but the census half is
`U-CENSUS`'s, wave E, and is NOT this unit's**), §1.2 (`U-CENSUS` — kept separate here on purpose),
the amended unit plan's **`U5`** row (the projection-half bullet list, provenance), §2.1/§3 (the unit
list, wave D, the checkpoint rule), §1.5 + `H-r17` (the "dashboard/toolbar use case changes NO
zone/track contract" clause: *"`U-PROJ` still takes an injected write sink and consumer-supplied
variable names/units … **with no zone vocabulary anywhere**"*), the §"Per-unit equivalence limits",
"Adopted units' security / equivalence obligations" and "no new MCP surface" rows, `H-r8` (the six
prohibitions), and `docs/next-steps.md`'s `## OPEN` row **D4** (spec cell `docs/specs/projection.md` —
**OWED — not filed**; this file is that filing).

**The 2026-09-27 ruling pack — stated here so a reader meets it before §0's table: the FOUR contract
inputs this filing left UNRULED (§7 item 8) are now RULED, and ZERO remain unruled.** `A-11` (a
`Projection` is **reusable** — a value, not a session → `I-11`) · `A-2`/`F-4` (a **throwing value
accessor** is **skipped and recorded**, never propagated → the **EIGHTH** `ProjectionSkipReason`
member, `'accessor-threw'`, so the vocabulary is now **eight contract diagnostics**) · `A-3` (the
**prototype-pollution-shaped key**: `Projection.applied` and every internal key→value map are built on
**`Object.create(null)`** → §2.5) · `A-7` (**sink re-entrancy is NOT guarded**; the projection is
**immutable input** to the applier) — see **§0A's dated ruling notes** and §0 ruling 9. **The rulings
advance no unit status: no code, no red set, go-ahead of ruling 8 still absent (§4.5).** **⟶ ANNOTATED 2026-09-27 (the `U-PROJ` `§5.5` RE-DERIVATION pass — STATUS AND GATE-11 ONLY; the four rulings' substance is UNTOUCHED and no clause of theirs is rewritten):** the go-ahead half of that sentence was **already** superseded by the `U-MOUNTGUARD` DONE pass (*the wave-D go-ahead WAS GIVEN*), **and the ledger has since moved twice more — `U-LISTHOST` and `U-SLOTHOST` are BOTH `DONE` (the ledger's FIFTH and SIXTH `DONE` rows), the counts are `6 DONE / 14 open`, and this unit (`D4`) is the LAST wave-D unit and the NEXT in the order**, its **only** surviving precondition being **its own `TestWriter red` set** — which this pass unblocks, because the gate-11 register it was waiting on is now `§5.5.1` (banner under `## 5.5`). **`§5.3 → §5.5` is a deliberate gap with no `§5.4`, and this pass renumbers NOTHING** — the record is at the end of `§5.3`, and the same gap is discharged that way in **both** sibling specs (`docs/specs/listhost.md` `§5.3`; `docs/specs/slothost.md` `§5.3`). **The four rulings still bind** (`A-11` reuse · `A-2`/`F-4` `'accessor-threw'` · `A-3` `Object.create(null)` · `A-7` re-entrancy).

**⟶ FIFTH STATUS NOTE — 2026-09-27, THE `§7a` RULING PASS (SPEC TEXT ONLY; this note amends no
normative clause by itself, adds no section NUMBER and moves no section number).** The `§5.5`
re-derivation pass recorded **eleven** clauses a TestWriter could not derive a falsifiable row from
(`§7a`) and **ruled none of them**, which left the **delegation gate's standard unmet** (`AGENTS.md`
item 9: the underivable list must be **EMPTY or explicitly parked** before this unit's red set is
authored). **This pass rules every one of the eleven from the contract's own majority reading, each
citing the clauses that decide it**, and lands the rulings as the new subsection **`§7a.1`** — the
`docs/specs/slothost.md` `§7a.1` shape (`9` items ruled, `0` open) and the
`docs/specs/listhost.md` rulings for the same classes (a **widened field**, **observables NAMED so a
row can fail**, a **totality boundary stated explicitly with named safe defaults**). **`11` items
ruled · `0` OPEN QUESTIONS** — **no item is left as a silent gap, and no reading is presented as
contract text without the clause that decides it.** **The register's own honesty item 5 is
superseded on one half** (`§5.5.1`: a row may now be READ as resolving the half `§7a.1` rules — the
**statement, strategy, type, attempt count and the `231` total are UNCHANGED**), and **`§5.5.1`'s
`P-PJ-*` ids are not re-pinned**: this pass adds **NO register row** and leaves the attempt
arithmetic alone. **What moved, and where it is visible:** `§2.1` (`projectVar`'s `null`-vs-`''`
clause, `M-13`/`F-10`'s coercion boundary), `§2.2` prohibition 1 (the vocabulary ban's **scope** and
its anti-evasion clause) and prohibition 5 (the seam rows' real ids), `§2.3` (items 1/4: the
malformed-projection vs malformed-sink asymmetry), `§2.4` items 2/3/5 (the non-record-`values` reason,
the coercion, the collision-vs-application rule), `§2.5` item 5 (freeze semantics), `§3.1` **`M-9`**/
**`M-13`**, `§3.2` **`F-9`**/**`F-10`**/**`F-11`**/**`F-15`**, `§3.3` **`I-2`**/**`I-9`**/**`I-10`**, the
new **`§3.4`/`§3.5`** (the static and existence rows' ids), `§4.4` (**`S-12`..`S-15`**, the class its
own note reported as owed), §6, §7 items 9/10, **§7a.1**, and two `§8` rows. **Two rulings are
reported as `CONTRACT-AMENDED` because they change what a `§3` row asserts — item 2 (`M-13` vs
`F-10`) and item 3 (`F-9`'s dropped entries vs `I-10`'s `ok`)** — and **every amended cell keeps its
as-written words visible with the date and the reason** (the `H-r1` cite-and-supersede convention);
**no clause is silently rewritten.** **The `A-13` static probe's own collision** (a module that must
carry `track` nowhere cannot state that prohibition in its comments) **is closed by scoping the
`§2.2` prohibition-1 scan: comments ARE scanned, and the words exist only in THIS spec's prose,
which the module never contains** (item 11 (b)). **What this pass did NOT do:** it **ran no test, no
leg and no trio** (it is spec text only, like the four passes above it), it **edited no file other
than this one**, it **committed nothing**, and it **authored no red row** — the row TEXT each ruling
produces is named in `§7a.1` and **owed to the TestWriter** wherever it is so marked. **The ledger
counts are unchanged (`6 DONE / 14 open`) and this unit's ONE surviving precondition is still its own
`TestWriter red` set RUN and REPORTED** (`§4.5`, `§7` item 1).

**⟶ SIXTH STATUS NOTE — 2026-09-27, THE `U-PROJ` RED-SET REPAIR PASS (SPEC TEXT ONLY; no normative clause
is deleted, no section number moves, and the four 2026-09-27 rulings are UNTOUCHED in substance).** The
`U-PROJ` implementer **landed `src/shared/layout-projection.ts`, spec-faithfully, and STOPPED** rather than
bend code: **`47` of the red set's `70` rows are TEST-SIDE**, and **four of the causes are SPEC-LEVEL GAPS
that only the contract can settle** — so the TestWriter's repair pass needs them **PINNED here**, not
guessed. **The four, ruled from the clauses that decide them:** **(1) THE VALUE-LOOKUP KEY RULE** — the
`specOf` map's own key is what supplies the lookup key, read as an **own property of `values`** (a
`VarSpec.name` is the EMITTED name only) → the new clause in **`§2.4` item 3** + **`§2.5` item 2**'s
`values` bullet; **(2) THE `skipped` ORDER IS NOW PINNED** — **`§2.4` item 8, the `skipped`-order rule**
(the projection's list is SPEC-ENTRY order; the applier's list is ITS OWN decisions first, then the carried
entries in their input order, never re-sorted) — and **that rule carries the list's SECOND `item 8` BY
DESIGN: it was APPENDED, not renumbered, so the pre-existing `§2.4` item 8 (the immutability rule) and
every citation to it stay exactly where they are** (`§2.4` items 1–7 are untouched); **(3) `'accessor-threw'`'s TRIGGER IS PINNED** — an **own accessor whose READ
throws**, never a plain data property holding a function (⇒ `not-a-number`), never an absent key (⇒
`missing-value`), and **the module never INVOKES a caller-supplied function** to discover a throw →
**`§2.4` item 3**; **(4) `R-17`'s SCAN SCOPE IS MADE SATISFIABLE AND HONEST** — module source (raw +
assembled + comments) as the whole claim, the FILE half scoped to the fixtures the row itself controls plus
a **word/identifier-BOUNDARY rule**, with the superseded file-wide wording kept visible →
**`§3.4 R-17`** + **`§7` item 13 (i)**. **Two cells are amended because they change what a `§3` row
ASSERTS — `F-2` (the key rule + the list order, so the "first occurrence" drive is unambiguous) and
`F-12` (the duplicate variant's own order), both marked `CONTRACT-AMENDED` with their as-written words
visible**; `M-1`, `F-3`, `F-4A`, `F-4B` and `F-13(a)` are **clarifications** (their drives already said
the half these pins make explicit) and are marked as such. **This pass ran no test, no leg and no trio, ran
no `git commit`, edited exactly ONE file (`docs/specs/projection.md`, by bounded anchored `edit`s — never a
whole-file `write`, `RCA-8(c)`) and touched no `tests/**`, no `src/**`, no `scripts/**`, no `package.json`
and none of the trackers.** **The four repaired row drives are OWED to the TestWriter** (this pass authors
no red row); the implementer's stop is recorded as the CORRECT behaviour under `AGENTS.md` item 4's
no-bend rule, and **no clause of the landed module is overridden by this pass** — every pin here is the
contract's own majority reading, cited.

## 0. The rulings this unit derives from (recorded, NOT re-opened — with ONE CORRECTION APPROVED) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-8` is adopted as TWO units and this is the projection half only:** *"Adopt `project(values) → record` + a **total applier** (every input yields a write-or-skip decision, never a throw, never a partial write) taking an **injected write sink** (the consumer's root), so the mechanism owns **no root and no store**."* **[the quoted `project(values)` form is the plan's as-filed text, `SUPERSEDED`: **the architect has APPROVED the two-argument correction — the signature is `project(values, specOf)` (ruling dated 2026-09-27; recorded in this file's §7 item 5 and §8's `CORRECTED`/approved row, and as the `PROJECTION-SIGNATURE-TWO-ARGUMENTS` ACTIVE row in `docs/decisions.md`)**; see §2.1. The quote is kept verbatim so the source and its correction stay auditable.]** **`U-CENSUS` (the `computeTrackVars(zones, census, sizes, revealed, specOf)` half — note it too threads a caller `specOf`) is SEPARATE and stays in wave E** (`docs/next-steps.md`'s `## OPEN` row **E2**; §1.2). | §1, §2 |
| **2** | **The acceptance lines are binding:** **purity** (same input ⇒ same output, no environment read) · **totality** over malformed/partial input · **the `computeTrackVars(census, …)` half is ABSENT** (census is app data — `SCH-4`'s concern) · **one write per commit**. | §2.4, §3, §5.2, §6 |
| **3** | **Variable names and units come from the CONSUMER'S SUPPLIED SPEC** — `(C)#1`-clean. There is **no built-in variable name, no built-in unit, and no built-in token literal**, and **no zone vocabulary anywhere** (`H-r17`). | §2.1, §2.2 (prohibitions 1/3), §7 item 4 |
| **4** | **The applier DECLARES nothing and OWNS nothing**: an **injected write sink** is the only environment reading, and the mechanism **owns no root and no store**. | §2.3, §2.1 (`applyProjection`) |
| **5** | **The `U-ZONES`/`U-CENSUS` delegation boundary is NOT this unit's to cross.** The **token-formatting authority is `U-ZONES`** for the **census family** (§1.1/§1.2: *"delegating token formatting to `U-ZONES` (one authority, not two)"*), and **`U-PROJ` must not import `U-ZONES`, `U-CENSUS`, or any zone/track module.** This unit formats **only** what the consumer's own `VarSpec` tells it to, and the contract makes that spec **data**, never a function it delegates to. | §2.1 (`VarSpec`), §2.4, §6 |
| **6** | **`H-r17`'s consequence, quoted because it names this unit:** *"A dashboard/toolbar use case changes NO zone/track contract: `U-PROJ` still takes an injected write sink and consumer-supplied variable names/units, so a dashboard's custom properties are projected by the consumer's data through the repo's pure applier, **with no zone vocabulary anywhere**."* | §1, §2.2, §7 item 4 |
| **7** | **No new MCP surface, no store, no persistence, no CSP change** (the amendment's obligations table): every adopted mechanism is renderer/host-resident module code — no `src/main/**`, no `electron`, no `node:fs`, no RPC types import; **no adopted unit persists anything**. | §2.2 (prohibitions 4/5), §5.1 |
| **8** | **The go-ahead for wave D does not exist yet**, and within wave D this unit lands **last**. **This unit is BLOCKED on that go-ahead, on the wave-D order, and on its own red set.** **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the as-written cell is kept visible): the wave-D go-ahead WAS GIVEN (architect, 2026-09-27) and `U-MOUNTGUARD` is `DONE`, so the surviving blockers are the wave-D order (this unit lands LAST, after `U-SLOTHOST`) and its OWN RED SET.** **⟶ AND THE ORDERING HALF IS NOW SPENT TOO (2026-09-27, the `U-PROJ` `§5.5` RE-DERIVATION pass; the clause above is kept visible): `U-LISTHOST` and `U-SLOTHOST` have BOTH landed `DONE` — the ledger's FIFTH and SIXTH `DONE` rows (`docs/next-steps.md`'s `## DONE — U-LISTHOST` / `## DONE — U-SLOTHOST`, cited by section) — so the counts are `6 DONE / 14 open`, the wave-D order is SATISFIED rather than skipped, and this unit's ONE surviving blocker is its own `TestWriter red` set.** | this status block, §4.5, §7 item 1 |
| **9** | **THE 2026-09-27 RULING PACK (architect) — the FOUR previously UNRULED contract inputs of §7 item 8 are now RULED; ZERO remain unruled.** **(a) `A-11` — a `Projection` is REUSABLE** (a value, not a session: no consumption, no per-projection state; every call is equivalent to a first call with that value) ⇒ **new invariant `I-11`** + §2.3. **(b) `A-2`/`F-4` — a THROWING VALUE ACCESSOR is SKIPPED and RECORDED by the projection, NEVER propagated** ⇒ **`ProjectionSkipReason` 7 → 8 members (the new member `'accessor-threw'`)** + `F-4` split into `F-4A`/`F-4B` + `F-12`. **(c) `A-3` — the prototype-pollution-shaped key: `Projection.applied` (and any internal key→value map) is built on `Object.create(null)`** ⇒ §2.5 (the analysis + the alternatives rejected) + `I-12`/`I-13` + `F-13`/`M-18`/`M-19`/`M-20`. **(d) `A-7` — sink RE-ENTRANCY: NOT GUARDED; the projection is IMMUTABLE INPUT to the applier** ⇒ §2.3 item 8 + `I-11`/`I-14` + `M-21`/`M-22` + `F-14`/`F-15`; a consumer wanting different writes builds a **NEW** projection. **None of the four advances the unit's status** (§4.5): no code, no red set, and the go-ahead of ruling 8 is still absent. **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the clause is kept visible): the wave-D go-ahead WAS GIVEN (architect, 2026-09-27), so this sentence's surviving truth is *"no code and no red set"* — the four rulings still advance no status by themselves, and the unit remains blocked on its own red set.** **⟶ AND ON THE ORDERING HALF TOO (2026-09-27, the `U-PROJ` `§5.5` RE-DERIVATION pass; the cell is kept visible): `U-LISTHOST` and `U-SLOTHOST` are BOTH `DONE` (the ledger's FIFTH and SIXTH `DONE` rows), the counts are `6 DONE / 14 open`, and `U-PROJ` (`D4`) is the LAST wave-D unit and the NEXT in the order — so "blocked on its own red set" is now the WHOLE of the precondition list.** | §0A (the dated notes), §1, §2.3, §2.5, §3.2, §3.3, §7 items 7/8, §8 |

## 0A. The dated ruling notes — **the 2026-09-27 ruling pack (architect): the four UNRULED inputs are RULED**

**What this section is, and what it is not.** §7 item 8 recorded **FOUR** contract inputs this filing
**left UNRULED on purpose** rather than inventing an answer (`A-2`/`F-4`'s throwing getter, `A-11`,
`A-3`, `A-7`). **The architect has now ruled all four (2026-09-27).** These notes record each ruling
with the clause that carries it. **They advance no unit status**: nothing here is implemented, no red
set is authored or run, and §4.5's delegation gate is unchanged — `U-PROJ` is still `BLOCKED` on the
wave-D go-ahead (§0 ruling 8) and on its own red set. **⟶ ANNOTATED 2026-09-27 (the `U-PROJ` `§5.5` RE-DERIVATION pass; the paragraph above is kept visible and these notes' SUBSTANCE is untouched): the go-ahead half is spent and so is the ORDERING half — `U-LISTHOST` and `U-SLOTHOST` are BOTH `DONE` (the ledger's FIFTH and SIXTH `DONE` rows), the counts are `6 DONE / 14 open`, and this unit (`D4`) is the LAST wave-D unit and the NEXT in the order, blocked ONLY on its own `TestWriter red` set — for which the `§5.5` register this pass lands (`§5.5.1`) is the outstanding precondition.** **Every superseded sentence stays visible in
place and is marked `SUPERSEDED`** (this file's citation-and-supersede convention, `H-r1`).

### Ruling note 1 — **`A-11` (2026-09-27): a `Projection` is REUSABLE — it is a VALUE, not a session**

**The ruling:** *the same projection object may be passed to `applyProjection` repeatedly — to the same
sink or different sinks — with independent results; no consumption, no per-projection state. Every call
must be equivalent to a FIRST call with that value.*

**It follows from ruling 4 (`A-7`, note 4 below) and must be consistent with `I-5`/`I-8`:** the applier
**retains no reference** to its projection (`I-5` — no aliasing, no store) and **every returned record
is fresh** (`I-8` — a caller mutating one result cannot change another), so **there is nothing to
consume and nowhere for per-projection state to live**. Reuse is therefore **structural**, not a
promise: a second `applyProjection(p, sink2)` cannot see that `p` was ever used.

**What this note pins, and where:** the **new invariant `I-11`** (§3.3 — the load-bearing clause, since
`A-11` is a cross-state property); **§2.3's write-or-skip rules** (item 1 gains the reuse sentence: the
rules read the projection as an **input**, never as a cursor); **§1 item 3's split table** (the
`applyProjection` column's "Owns: nothing" row already said it — the ruling makes it falsifiable by a
row); and the **rows** `M-21` (reuse across two sinks) and `M-22` (reuse into the same sink twice, with
the write log still recording exactly the writes of the current call). **`ApplyResult` is call-local**:
`ok` reflects **only** the call that produced it (§3.1 `M-15`), so two calls over one projection yield
**two independent `ApplyResult`s**.

### Ruling note 2 — **`A-2`/`F-4` (2026-09-27): the THROWING VALUE ACCESSOR is SKIPPED and RECORDED — NEVER propagated**

**The ruling:** *when reading a value throws (a hostile or absent accessor), the projection **catches
per key**, **records that key as a skip**, and **continues**; one bad key never aborts a projection.*

**The principle it follows, already pinned in this spec for the other half:** a throwing `setProperty`
does not abort the run (§2.3 item 3) — the applier continues, reports each failure individually, and
the caller sees exactly which keys did not land. **The projection is now symmetric with the applier:
`one key, one decision`, and a failure of the *environment* (an accessor that throws, a sink that
refuses) is a **recorded skip**, never an abort and never a propagated throw** (ruling 2's totality
acceptance line, `I-7`).

**THE CHOICE — an EIGHTH member of the closed union, and this spec states plainly that it CHANGES A
CLOSED UNION.** `ProjectionSkipReason` gains **`'accessor-threw'`** (**7 → 8 members**), with its
diagnostic sentence: *"the value's accessor threw while it was being read; the key was skipped and the
projection continued."* **The rejected alternative, and why it is rejected:** **reusing
`'not-a-number'` would SILENTLY CONFLATE two different facts** — *"the value is not a number"* (the
caller's data is the wrong type, which the caller can fix by passing a number) versus *"we could not
read the value at all"* (the caller's **accessor** is hostile or broken, which the caller fixes
somewhere else entirely). That distinction is **information the consumer cannot recover from
`not-a-number`**, and a skip vocabulary exists precisely to hand the consumer recoverable information.
**A closed union is allowed to grow by ruling** — what it may not do is **misreport**: the honest move
is a new member, not a false diagnosis inside an existing one.

**What this note pins, and where (the full recount, so no later pass has to hunt for one):**

| Place | Was | Is |
| --- | --- | --- |
| §2.1, the `ProjectionSkipReason` union | **seven** members | **EIGHT** members — `'accessor-threw'` added, with its own comment |
| §2.2, prohibition 1's string-union count | *"`ProjectionSkipReason` (**seven** contract diagnostics)"* | *"`ProjectionSkipReason` (**eight** contract diagnostics)"* — **⟶ SUPERSEDED: seven → eight (2026-09-27, ruling note 2)** |
| §2.4 item 3, the fixed skip-reason **precedence** | `malformed-spec` → `duplicate-name` → `missing-value` → `not-a-number` → `negative` | the same five, **plus** `accessor-threw`, positioned **where the read happens** — i.e. the read is attempted **once**, and an accessor throw yields `accessor-threw` **in place of** `missing-value`/`not-a-number` (the key was *present* to the lookup and the *read* failed) |
| §3.2 `F-4` | one row: *"`not-a-number` — the whole class"*, with the throwing getter inside it and the behaviour **unpinned** | **SPLIT**: **`F-4A`** (the plain non-numeric inputs keep `not-a-number`) + **`F-4B`** (**the throwing accessor gets its own reason `accessor-threw`**) |
| §3.2 (new) | — | **`F-12`**: the throwing-accessor fail-state as a **row in its own right** (per-key catch, the projection continues, `applied` still carries the good keys, no throw out of `project`) |
| §7 item 8 | FOUR unruled seeds | **ZERO unruled** — `F-4`'s getter is ruled here |
| §8's `RK-10` index row | *"ten recorded contract decisions and **four** deliberately-unruled seeds"* | *"ten recorded contract decisions and **zero** unruled seeds"* |

**THE OPERATIONAL NOTE, recorded as a REQUIREMENT (the architect's words, in substance):** *downstream
code must inspect the result's skip record.* **A consumer that only checks a value's PRESENCE will not
see a skipped key** — presence is not the contract; the **skip record** is. Stated plainly so the two
halves are not confused: **the projection reports INTENT** (`Projection.applied` = *what must be
written*, `Projection.skipped` = *what must not be written, and why*), whereas **the applier's
`ApplyResult` is what a caller checks** — `ok` and `skipped` describe **what actually landed**. **A
caller must read `ApplyResult.skipped` to know what did not land**, and must read
`Projection.skipped` to know **why** a key was never attempted. Neither record may be replaced by a
presence test (`key in applied` / a truthiness check on a value), because a key can be **present in
the caller's `values` and still skipped**, and a key can be **absent from the sink after a call that
reported `ok === false`**.

### Ruling note 3 — **`A-3` (2026-09-27): the prototype-pollution-shaped key — the ANALYSIS, and the ruling: `Object.create(null)`**

**The question, exactly.** A caller-supplied `VarSpec.name` can be **any string** — **the contract does
not require it to be a CSS-legal custom-property name**, and this unit **may not invent a name-legality
rule** (names are **caller data**, §2.2; rulings 3/5). Therefore `'__proto__'`, `'constructor'`,
`'prototype'`, `'toString'` and `'hasOwnProperty'` are all **reachable** both as keys of the returned
`Projection.applied` record and as keys of any internal per-key map the implementation keeps.

**The mechanism, spelled out so the finding is not a slogan.** On a plain-object literal,
`applied['__proto__'] = 'x'` **does not create an own property**: the assignment reaches
**`Object.prototype`'s `__proto__` accessor** and **silently changes the record's prototype** (to
`'x'`'s — here, a `TypeError`-free no-op, since a string is not an object, which is worse: it fails
**silently**). Consequences, all measured facts rather than speculation:

- the key **does not appear in `Object.keys(applied)`** — so **`I-1`'s partition BREAKS**: the spec
  entry is in **neither** `applied` **nor** `skipped`, and a key vanished inside a contract that
  promises it cannot;
- write order (`§2.3` item 6, `M-6`/`M-5`) **silently loses a key**;
- and the projection **still reports `ok`/no-skip for that key while being wrong about it** — the
  false-green class, inside a mechanism whose whole acceptance line is **totality**;
- the **same hazard exists in the duplicate-detection pass**: a lookup table built as a plain object
  and read as `seen[name]` will, for `name === 'constructor'`, read
  **`Object.prototype.constructor`** — a **truthy inherited value that was never written** — so **a
  non-duplicate key is misdiagnosed as `duplicate-name`** (and `'toString'`/`'hasOwnProperty'` likewise
  hand back inherited functions);
- and the hazard is **not only in the write direction**: a **plain-object `values`** returns an
  **inherited value** for such a key, so a spec naming `'constructor'` can be **applied with a string
  the caller never supplied** instead of being skipped `missing-value`.

**THE RULING (adopted, as recommended — and this filing's own reading agrees with it):**
**`Projection.applied` — and any internal key→value map — is built on a NULL-PROTOTYPE object
(`Object.create(null)`).** Every key lookup on caller-supplied data is an **own-property** lookup
(`Object.prototype.hasOwnProperty.call(obj, name)`-equivalent semantics), never a prototype-chain read.
The four reasons, kept as the ruling's own justification:

1. **It costs nothing** — `Object.create(null)` instead of `{}` is one expression, no new dependency,
   no new policy, no new branch.
2. **It is TOTAL** — it covers **every** dangerous key, **including ones nobody enumerated**
   (`'valueOf'`, `'__defineGetter__'`, and every key a later JS engine adds to `Object.prototype`),
   which is exactly this unit's **totality acceptance line** (ruling 2) applied to the record itself.
   An enumerated **denylist** would be a **partial** answer to a total requirement.
3. **It needs NO new skip reason and NO name-legality policy** — the caller's authority over names is
   **intact**: **the unit may not invent a name-legality rule**, because names are caller data (§2.2),
   and a rejected/renamed key would be the unit **editing caller data** (prohibition 2/3).
4. **It is verifiable by ONE row** — a projection whose spec names `'__proto__'` produces an **own key
   `'__proto__'`**, never a mutated prototype, and `I-1`'s partition still holds (`F-13`).

**Alternatives this filing rejected, each with its reason** (recorded so the ruling is auditable and a
later pass does not re-derive it):

| Rejected alternative | Why it is rejected |
| --- | --- |
| **Plain object literal `{}` (status quo, no row)** | **Wrong today**: silently drops `'__proto__'` from `Object.keys`, mutates the record's prototype, breaks `I-1`'s partition, and misdiagnoses `'constructor'`/`'toString'` as `duplicate-name` during duplicate detection. **The false-green class; a review finding.** |
| **`Object.defineProperty(applied, name, {value, enumerable: true, …})` per key** | **Works for own keys, but is not the better rule:** it is a per-key call (more code and more ways to get the descriptor wrong — a forgotten `enumerable: true` silently hides the key from `Object.keys`, re-breaking `I-1`), it does **not** fix the **duplicate-detection lookup** or the **`values` inherited-value** read, and it does not cover keys a later pass writes by plain assignment. **A `create(null)` record fixes all three by construction.** |
| **Reject / rename / skip a "dangerous" name (a denylist, or a `'malformed-name'` skip)** | **A name-legality policy this unit may not have**: `VarSpec.name` is **caller data**, so the module would be **rejecting caller data on a criterion no ruling supplies** (prohibition 3's "no built-in vocabulary", ruling 3's "no built-in name"). It is also **partial** (an enumeration) and it **loses a legitimate caller name** — a consumer is entitled to name a property `'toString'` and have it written. |
| **Return a `Map` / a `null`-prototype `Object` only for the *returned* record** | **A `Map` changes the return shape** (`Object.keys`/spread/`JSON.stringify` all change) — a different contract, needing its own gate. **Fixing only the returned record leaves the internal lookup maps** (duplicate detection, `values` reads) **polluted**, so the ruling is applied to **every** internal key→value map, not just the returned one. |

**THE CONSEQUENCES, RECORDED HONESTLY so no consumer is surprised** (each is a contract fact, not a
caveat):

1. **The returned record has NO prototype.** So: **`applied.hasOwnProperty(k)` DOES NOT EXIST** on it (a
   `TypeError`), and neither do `applied.toString()`/`applied.valueOf()`; `instanceof` is unaffected in
   substance (a null-prototype object is still an object, and was never an instance of anything
   meaningful); **`Object.hasOwn(applied, k)` / `Object.prototype.hasOwnProperty.call(applied, k)` is
   the pinned way to test membership**; and a **`toEqual`-style deep-equality helper that compares
   prototypes** will see a null-prototype actual against an object-literal expected and **must be
   written with that in mind** (a row states it explicitly rather than discovering it as a mystery
   failure).
2. **What still behaves normally, named so the consumer is not over-cautious:** **`Object.keys`**
   (own enumerable string keys), **spread** (`{...applied}` — *into a target that is itself
   null-prototype-safe, see item 3*), **`in`** (own keys answer `true`; nothing else exists to
   answer), **`JSON.stringify`** (`'__proto__'` is serialized as **data**, and re-parsing yields an
   object whose `__proto__` is handled by the **parser**, which is a separate, documented JS hazard and
   **not this module's**), **`structuredClone`**, **`Object.entries`/`Object.fromEntries`** and
   **`Object.assign`** (with a null-prototype target — item 3). **`Object.keys(applied)` still yields
   the pinned deterministic write order** (§2.3 item 6) — the ruling changes the record's
   **prototype**, never its key order.
3. **A hazard the ruling EXPOSES rather than creates, recorded because the fix is a caller-side
   obligation:** **the null prototype is destroyed by a naive copy.** `{...applied}` and
   `Object.assign({}, applied)` produce a **plain-prototype** object — and, if the source held an own
   `'__proto__'`, both **re-invoke `Object.prototype`'s `__proto__` accessor on the target** (spread
   and `Object.assign` copy own keys through `[[Set]]` on the target). **A consumer that copies the
   record MUST use a null-prototype target** (`Object.assign(Object.create(null), applied)` — or
   `Object.entries`/`Object.fromEntries` + an explicit null-prototype build). **This sentence is a
   contract obligation on the consumer, not a defect in the module**: the module returns a record
   whose keys survive, and it may not police how a caller copies it.
4. **`readonly` is a TYPE-LEVEL promise and does NOT freeze the object.** `Projection.applied`'s
   `Readonly<Record<string, string>>` **prevents TypeScript-level reassignment**; **it freezes
   nothing at runtime**, and this spec **does not require `Object.freeze`** (a frozen record is
   **permitted** — it changes no row, since the return value is treated as a value — but it is **not
   a contract clause**, and **a caller may not rely on either behaviour**). **What this spec DOES pin
   about mutation is the direction it can prove:** the applier never mutates the projection (ruling
   note 4 / `I-14`), and `I-5`/`I-8` pin that no returned record aliases module-internal state. **A
   caller mutating an `applied` record mutates its own copy of a value** — the module holds no
   reference to it.
5. **THE APPLIER NEEDS NO GUARD, and the two halves DIFFER here — stated explicitly, because the
   contrast is the point.** The applier calls **`CSSStyleDeclaration.setProperty(name, value)`** with
   a **CSS PROPERTY NAME**. In that position `'__proto__'` is an **ordinary string argument**: the DOM
   API takes a property name string, performs **no object-key assignment**, and therefore has **no
   prototype-write hazard at all**. **The record-key hazard and the CSS-property-name position are
   different objects**: the record is a **JS object keyed by caller data** (null-prototype it), while
   the sink call is a **string argument to a DOM API** (nothing to guard, and **the applier is
   explicitly NOT required to refuse, sanitize or re-name a name for either half**). A row pins the
   contrast: a projection whose spec names `'__proto__'` **is written to the sink verbatim as the
   string `'__proto__'`** (a fake sink records the exact arguments), with no refusal and no
   `sink-unusable`/`write-refused`.
6. **`skipped` is an ARRAY of `{name, reason}` records, so NO key-map hazard exists there.** An array's
   indices are engine-owned **integer** slots; the caller's `name` is a **value** (`ProjectionSkip.name`)
   and is **never used as a key of any object**. **No null-prototype requirement attaches to
   `skipped`**, and **none attaches to `ProjectionSkip`'s own two fields** (they are fixed contract
   field names, not caller data). **This is why the ruling's objects are exactly two — the returned
   `applied` record and the internal key→value maps — and no more**, and it is recorded so a later
   pass does not "complete" the ruling by rewriting `skipped` (which would be a **shape change** to a
   part of the contract `A-3` never implicated).

**What this note pins, and where:** **§2.5** (this analysis, the ruling and the consequences),
**§2.1** (the `Projection.applied` doc-comment now states the null prototype and the copy hazard),
**§3.3**'s **`I-12`** (the own-key invariant for every caller-supplied name, including `'__proto__'`)
and **`I-13`** (the null prototype itself + own-property lookup semantics), and the **rows** `F-13`
(the hazard, falsifiably), `M-18` (the `'__proto__'` name), `M-19` (own-key membership without
`hasOwnProperty`) and `M-20` (the applier-side contrast).

### Ruling note 4 — **`A-7` (2026-09-27): sink RE-ENTRANCY — SKIP it; treat the projection as IMMUTABLE input**

**The ruling, verbatim in substance:** *"skip, treat projection as non-mutable and expect consumers to
create new projection if they want changes."*

**What it pins.** The projection is **immutable INPUT to the applier**: the applier **never mutates it,
never caches into it, and never re-enters it to change it**. **A consumer wanting different writes must
build a NEW projection** (`project(values', specOf')`) — the projection is a **value**, and editing one
in place is **not a supported operation** (which is also why `A-11`'s reuse is safe: nothing consumes
and nothing mutates).

**Re-entrancy, stated as far as the invariants can prove it.** If the injected sink's `setProperty`
**re-enters `applyProjection`** (with the same or another projection), the applier's behaviour is
**call-local**, per `I-5` (no retained reference to an argument), `I-8` (every returned record fresh)
and `I-11` (**no per-projection state exists to interleave**). **Can a re-entrant call interleave
OBSERVABLY? Yes at the SINK, and NO at the contract** — recorded honestly, with the reason:

- **At the sink: yes, trivially.** The sink is the **caller's own object**, and the applier holds no
  lock over it (§2.3 item 4's "the applier owns nothing"; ruling 4 of §0). A sink that re-enters is a
  sink that **chooses** to interleave its own writes — an interleaving **of the sink's state**, which
  this module does **not** own and **may not** arbitrate.
- **At the contract: no.** Each call's `ApplyResult` remains **its own call's** write log: `I-3` pins
  *a key is in `ApplyResult.applied` **iff** `setProperty` was called with it*, and a re-entrant call
  **cannot** place a key in the **outer** result — and **cannot remove** one. The outer iteration set
  is fixed when the call reads `projection.applied` (`I-2`, §2.3 item 6's order), so a re-entrant call
  **cannot change what the outer call writes next**. `ok`/`skipped` stay call-local (`M-15`, `I-10`).
  **Write counts stay one per key per call** (§2.3 item 7): two calls ⇒ two writes, **one each** —
  which is the count the acceptance line ("one write per commit") pins, since each call **is** a
  commit.
- **The module holds NO re-entrancy guard, and that is the ruling, not an omission:** it holds **no
  module-level and no instance-level state at all** (prohibition 4; §1 item 3's "Owns nothing"; the
  §2.5-type static sweep `A-14`). **A guard would have to be state** — which is exactly what this unit
  may not have. **Adding a re-entrancy flag would be a NEW CONTRACT needing its own gate**, and it
  would make the applier non-total in a new way (a nested call would be *refused* for a reason that has
  no `ProjectionSkipReason` member).
- **Is there an ordering hazard the invariants do NOT already cover? NO — and the finding is recorded
  as `CONFIRMED-RULED`, not as an owed guard.** The one candidate is **double-writing a key on a
  shared sink** (outer writes `--a`, the re-entrant call writes `--a` too, then the outer call's
  `--a` write lands again) — but that is the **sink's own ordering choice**, it is **visible in the
  sink's own call log**, the **contract is blind to the sink's prior state by design** (§2.3 item 5,
  `I-6` — the applier never reads the sink back), and **neither `ApplyResult` over-claims**: each
  reports its own write. **No clause is weakened and no `OWED` row is raised.** **If a later pass
  contrives a case where a re-entrant call makes an `ApplyResult` report something its own call did not
  do, that is a `BLOCKING` finding against `I-3` and belongs in §3b as such — the seed `A-7` is
  discharged as RULED here, and the pass that runs after the green re-checks it against the landed
  module, not against this note.**

**What this note pins, and where:** **§2.3 item 8** (the new write-or-skip rule: immutability of the
projection + the new-projection rule + no guard + call-local re-entrancy), **§3.3**'s **`I-14`** (the
applier never mutates its projection and never re-enters it to change it) alongside **`I-11`**, and the
**rows** `M-21`/`M-22` (reuse — the `A-11` pair, whose second half is exactly "reuse is not
consumption"), **`F-14`** (a re-entrant `setProperty` ⇒ both calls' results stay call-local, no throw,
counts intact) and **`F-15`** (the caller's projection is **byte-identical** after a call — the
immutability row).

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** No leg of it ran in this pass: no suite ran, no trio ran, no
Electron window booted, and **no result is recorded here**.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` (`package.json:19`, read) — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance |

**Three honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says
   this repo's vitest files pass. **No window is booted, no IPC round-trip runs, no MCP transport is
   exercised, and no real DOM is touched.** For this unit that sentence is unusually load-bearing:
   **a `[T]` green proves the projection's ARITHMETIC and the applier's write/refuse DECISIONS, and
   proves nothing about what a browser does with the values.**
2. **The `[T]` applier is exercised against `src/shared/dom-shim.ts`'s element**, whose `style` is
   **`{ cssText: string }`** — a plain object with **no `setProperty`** (`src/shared/dom-shim.ts:9`,
   read: `style: { cssText: string } = { cssText: '' }`). **Therefore the `[T]` rows drive a
   caller-supplied FAKE sink**, not the shim element; the shim element is used only where a row needs
   a real element to carry a `style`-shaped object. **A `[T]` row must never claim that a browser
   parsed the value** — and the shim's inability to do so is exactly why the one real-DOM value row is
   a `[U]` row (§5.2).
3. **The sink is injected and the module reads no ambient global.** No `document`, no `window`, no
   `getComputedStyle`, no `matchMedia`, no `getElementById`. The module is admissible under **(B)**
   (a pure transition whose only environment reading is an injected argument) and is judged under
   **(C)'s six prohibitions**, which §2.2 asserts.

**⟶ FOURTH ANCHOR, ADDED 2026-09-27 (the `U-PROJ` `§5.5` RE-DERIVATION pass): the property register
(`§5.5.1`) is THIS unit's own property layer, and it changes NOTHING about the three anchors above.**
Its rows are authored in **this unit's own test file** (`tests/layout-projection.test.ts`, §4.1/§5.1)
and executed by the **same node suite** (`npm test`, §5.2 leg 1) — **so a register row is
`[T]` evidence exactly as a `§3` row is, and no register row may be read as `[H]`, `[U]` or
assembled-app evidence.** Every register row is a **pure `[T]` claim over injectable arguments** (a
fake sink is the whole of the applier's environment), which is why the register could be re-derived
into executed rows at all: **the blocker the superseded `§5.5` records is the HARNESS, not the layer**
(old §5.5.0, cell 3). **No register row depends on the optional `[U]` row of §5.2**, and the one
claim that stays layer-blocked is the `[U]` one (a real custom-property value read back from a real
sink) — unchanged by this pass.

## 1. Scope

**One deliverable: a pure projection plus a total applier**, in one `src/shared` module.

1. **What the projection is, in one sentence.** A **pure function** that turns *(caller values ×
   caller spec)* into a **record of custom-property writes** — `project(values, specOf)` — computing
   and formatting every value itself and producing **no side effect of any kind**.
2. **What the applier is, in one sentence.** A **total function** — `applyProjection(projection,
   sink)` — that takes that record and an **injected write sink**, and for **every** key produces a
   **write-or-skip decision**: writes what it can, records what it skipped and why, **never throws,
   and never performs a partial write for a key it reported as applied**.
3. **What the pure/impure split is, stated crisply (this unit's whole shape):**

   | | `project(values, specOf)` | `applyProjection(projection, sink)` |
   | --- | --- | --- |
   | **Kind** | **PURE** | **IMPURE — exactly one injected sink** |
   | **Reads** | its two arguments only | its two arguments only |
   | **Writes** | **nothing** | **only** the injected sink |
   | **May throw** | **no** | **no** |
   | **Owns** | nothing | nothing (no root, no store, no registry) |

   **Nothing else is in this unit.** There is **no** third function, no state, no cache, no
   observer, no DOM query, and no vocabulary.

4. **What the unit may land.** The module + its red/green rows + this spec. **No host change**: this
   unit adds pure code and touches no existing file except this spec and the trackers.

**Explicitly OUT of scope (do not do in this unit):**

- **The census half.** No `computeTrackVars`, no `zones`/`census`/`revealed`/`sizes` parameter, no
  `specOf`-as-`zones`-lookup, no key-set-`zones` rule, no census-mutation row. **That is `U-CENSUS`,
  wave E** (ruling 1). **A `U-PROJ` implementation that also reads a census is a scope violation.**
- **Any zone/track/pane/tab vocabulary** — no `zoneId`, `trackProp`, `emptyToken`, `isEmpty`,
  `trackFor`, `pane`, `region`. `H-r17` names this unit as the one that must be clean of it.
- **Importing `U-ZONES`/`U-CENSUS`/any sibling module** (ruling 5).
- **Any built-in variable name, unit, token, or formatting literal.** The `'px'` family, `'--'`
  prefixes and property names are **consumer data**.
- **Any DOM query or read** — no `getComputedStyle`, no `getPropertyValue`, no "read the current value
  and skip if equal" optimisation. **The applier is blind to the sink's prior state** (§2.3, `I-6`).
- **Any store, registry, cache, persistence, or module-level mutable state.**
- **Any new MCP surface** — the five-seam negative: no tool, resource, group, `VALID_GROUPS` member
  (`src/main/security.ts:134`, read: `read`/`dispatch`/`graph`/`code`/`module`), `RpcMethod` member
  (`src/shared/types.ts:259-281`, read: **21** members) or `MUTATING_METHODS` entry
  (`src/renderer/renderer.ts:12`, read: seven members). `ALL_TOOLS` **stays 21**
  (`src/main/mcp-server.ts:281-303`, read: 21 names).
- **Any shim change.** `src/shared/dom-shim.ts` is untouched, and **no `setProperty` may be added to
  it** (§2.3 — the sink is a caller-supplied object, not the shim's element type).
- **Any other wave-D/E/F unit.** In particular **`U-SLOTHOST`'s node placement, `U-LISTHOST`'s
  ordering, and `U-CENSUS`'s zone key set** are other contracts (RCA-2).
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists** (globbed
  `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
  matrix and no demo-page index to update**.

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and skip pattern

**New module: `src/shared/layout-projection.ts`** (a pure `src/shared` module). **Eight exports**,
and nothing else: **⟶ RECONCILED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 11 (d), so the count
and the row agree — the as-written words are kept visible): the code block below declares **ELEVEN**
names that carry a module `export` — **FOUR VALUE declarations** (`project`, `projectVar`,
`applyProjection`, `applyVarsToRoot`) and **SEVEN TYPE declarations** (`VarValues`, `VarSpec`,
`ProjectionSkipReason`, `ProjectionSkip`, `Projection`, `VarWriteSink`, `ApplyResult`). **The COUNT is
the filing's and is reconciled by the ROW, not by re-counting prose: `R-22` (`§3.5`) asserts SET
EQUALITY over those eleven names — the four runtime exports (via the imported namespace's own keys)
and the seven type-only names (via a type-level read) — so a NINTH value export or a missing one FAILS
it, which is what *"and nothing else"* was always claiming.** **The as-written "Eight" is kept visible
and no later pass may cite it as the row's count.**

```ts
/** The caller's value set: an opaque property name -> the caller's raw value.
 *  The host interprets NO name and NO value beyond what VarSpec says. */
export type VarValues = Readonly<Record<string, unknown>>

/** The caller's spec for ONE property. EVERY field is caller-supplied; nothing
 *  here has a built-in name, unit or token (ruling 3). */
export interface VarSpec {
  /** The FULL custom-property name, verbatim (e.g. the caller's own
   *  `--app-width`). REQUIRED — a spec without a name is malformed (`F-1`). */
  readonly name: string
  /** The caller's unit token, appended verbatim. An empty string is VALID and
   *  means "no unit". REQUIRED (may be `''`) — never defaulted to a literal. */
  readonly unit: string
  /** The caller's formatting choice for THIS property. `'unit'` (the default)
   *  emits `${value}${unit}`; `'number'` emits the bare number. Both are
   *  caller-visible options, not hidden policy. */
  readonly format?: 'unit' | 'number'
}

/** Every reason a key can be skipped. Closed, and deliberately small.
 *  EIGHT members (2026-09-27 ruling note 2: `'accessor-threw'` was ADDED — a
 *  closed union may grow by ruling; what it may NOT do is misreport). */
export type ProjectionSkipReason =
  | 'missing-value'      // the spec's key is absent from `values`
  | 'not-a-number'       // present, and READ, but not a finite number (string, boolean, null, NaN, ±Infinity)
  | 'accessor-threw'     // the value's accessor THREW while it was being read (A-2/F-4)
  | 'negative'           // finite, a number, but < 0
  | 'malformed-spec'     // the spec entry is not a usable VarSpec
  | 'duplicate-name'     // two specs produce the same `name`
  | 'sink-unusable'      // (applier only) the injected sink cannot be written to
  | 'write-refused'      // (applier only) `setProperty` threw for this key

export interface ProjectionSkip {
  readonly name: string
  readonly reason: ProjectionSkipReason
}

export interface Projection {
  /** EXACTLY the writes to perform: name -> the formatted string, in a
   *  deterministic order. Contains ONLY keys the applier must write, and
   *  NEVER `NaN`/`Infinity`/a negative (ruling 2's fail-soft pin).
   *  ⟶ CORRECTED 2026-09-27 (the `U-PROJ` RED-SET RECONCILIATION pass; the
   *  sentence above is kept visible and is NOT deleted): the as-written clause
   *  was LITERALLY FALSE as an assertion, because this record's values are
   *  STRINGS (`Record<string, string>`, the next line down) — nothing in it can
   *  *be* the number literals `NaN`/`Infinity` or a negative number, so a row
   *  reading it literally asserts a property the type already gives it. THE
   *  ASSERTABLE FORM, which is `§3.3 I-9`'s narrowed reading (`§7a.1` item 7)
   *  and the one a row must use: (1) every applied value is a STRING, and
   *  (2) no applied value EQUALS the exact literals `'NaN'`, `'Infinity'` or
   *  `'-Infinity'` (and none of the three is a substring of an applied value
   *  the caller's own `name`/`unit` did not supply). THE HONEST CORE the
   *  sentence was reaching for: no value whose stringification would BE one of
   *  those literals is ever applied — `NaN`/`+Infinity`/`-Infinity` are read
   *  and skipped `not-a-number` and a finite negative is skipped `negative`
   *  (`§2.4` item 3, `F-4A`/`F-5`), so they produce no string at all rather
   *  than any string in this record.
   *  BUILT ON Object.create(null) — NO prototype (2026-09-27 ruling note 3):
   *  a caller-supplied name may be any string, so `applied[name] = …` must be
   *  an OWN property for EVERY name, including `'__proto__'`, `'constructor'`,
   *  `'prototype'`, `'toString'`, `'hasOwnProperty'`. Test membership with
   *  Object.hasOwn/…hasOwnProperty.call — `applied.hasOwnProperty` does NOT
   *  exist. A COPYING consumer must use a null-prototype target (spread and
   *  Object.assign({}) destroy this record's null prototype). */
  readonly applied: Readonly<Record<string, string>>
  /** EXACTLY the keys that must NOT be written, each with its reason. An
   *  ARRAY of records: `name` is a VALUE, never used as an object key, so NO
   *  key-map hazard exists here (ruling note 3, consequence 6). */
  readonly skipped: readonly ProjectionSkip[]
}

/** The ONE write surface the applier will use. Duck-typed — a caller-supplied
 *  object, never the shim's element type (Layer declaration anchor 2). */
export interface VarWriteSink {
  readonly style: {
    setProperty(name: string, value: string): void
  }
}

export interface ApplyResult {
  /** EXACTLY what was written, name -> value, in write order. `applied` is a
   *  write LOG: a key appears here iff `setProperty` was called with it.
   *  Like `Projection.applied`, this is a null-prototype record — §2.5 binds
   *  it (its keys are the SAME caller-supplied names, so the hazard is
   *  identical); the ruling's objects are the returned `applied` records and
   *  every internal key→value map. */
  readonly applied: Readonly<Record<string, string>>
  /** EXACTLY what was not written, each with its reason. AN ARRAY of records —
   *  no key-map hazard (ruling note 3, consequence 6). */
  readonly skipped: readonly ProjectionSkip[]
  /** `true` iff nothing was skipped. */
  readonly ok: boolean
}

/** THE PURE HALF. Total over every input; reads no environment; never throws.
 *  A THROWING value accessor is CAUGHT PER KEY and recorded as `'accessor-threw'`
 *  (never propagated, 2026-09-27 ruling note 2). The returned `Projection` is a
 *  VALUE and is REUSABLE (ruling note 1 / `I-11`). */
export function project(values: unknown, specOf: unknown): Projection

/** ONE key at a time — the same rules as `project`, exposed so a consumer can
 *  format a single value without building a spec map.
 *  ⟶ `written === null` is the ONLY "not written" observable and it is
 *  EQUIVALENT to `skip !== null`; `written === ''` is a legitimate WRITTEN
 *  value and is never produced when a skip occurred (§7a.1 item 10). */
export function projectVar(spec: unknown, value: unknown): { readonly written: string | null; readonly skip: ProjectionSkip | null }

/** THE IMPURE HALF. Total: one decision per key, at most one write per applied
 *  key, never a throw, never a partial write for a key reported applied.
 *  The projection is IMMUTABLE INPUT: it is never mutated, never cached into
 *  and never re-entered to change it — a consumer wanting different writes
 *  builds a NEW projection (2026-09-27 ruling note 4 / `I-14`). REUSABLE: the
 *  same projection may be passed again, to this sink or another (`I-11`). There
 *  is NO re-entrancy guard, because the module holds no state at all; a
 *  re-entrant `setProperty` yields call-local results (`F-14`). */
export function applyProjection(projection: unknown, sink: unknown): ApplyResult

/** The source-name alias of `applyProjection` (the amendment's own verb,
 *  "`applyVarsToRoot` returns exactly the map it applied"). SAME function. */
export function applyVarsToRoot(projection: unknown, sink: unknown): ApplyResult
```

**The skip pattern, exactly.** **Neither half throws — for any input.** The refusal/skip vocabulary
is the closed `ProjectionSkipReason` union above — **EIGHT members since 2026-09-27** (`'accessor-threw'`
added by ruling note 2; the seven-member form is the pre-ruling text) — and a skip is **recorded**,
never signalled by an exception and never silently dropped. **A value whose accessor THROWS is one of
those recorded skips** — caught **per key**, so **one bad key never aborts a projection** — exactly as
a throwing `setProperty` does not abort the applier (§2.3 item 3). **`Projection.applied` and
`Projection.skipped` PARTITION the spec's key set** (row `I-1`): every spec entry contributes exactly
one — a write or a skip — so "every input yields a write-or-skip decision" (ruling 1) is a structural
property, not a promise. **The two records are not interchangeable, and the difference is operational
(ruling note 2): the projection reports INTENT; the applier's `ApplyResult` is what a caller CHECKS**
(`ok`/`skipped` say what did not land). **A consumer that only tests a value's PRESENCE will not see a
skipped key** — a key can be present in the caller's `values` and still skipped — so **downstream code
must inspect the skip record** (`Projection.skipped` for *why not attempted*; `ApplyResult.skipped` for
*what did not land*).

**The two halves' contracts must be readable off the types alone:**

| | `project` | `applyProjection` |
| --- | --- | --- |
| Returned `applied`'s meaning | **the intended writes** | **the write LOG** |
| Returned `applied`'s prototype | **none — `Object.create(null)`** (`I-13`) | **none — `Object.create(null)`** (`I-13`) |
| May mutate its inputs? | **no** (a frozen `values` and a frozen spec both work — `M-9`) | **no** — it mutates **only the sink**; the projection is **immutable INPUT** (`I-14`) and is **never re-entered to change it** |
| Reusable? | **n/a** (no state: `project` is pure, `I-4`) | **YES — a value, not a session** (`I-11`): the same projection may be passed to this sink again or to another, with independent results |
| Deterministic order | **yes** — spec order | **yes** — `projection.applied`'s order |
| Writes per applied key | **zero** | **exactly one** (`I-3`) |

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** every **property name**;
every **unit token**; the **formatting choice**; the **values**; the **spec set** (including its
membership and order); and the **write sink**. The only literals the module may contain are **its own
contract literals**: the `ProjectionSkipReason` members (**EIGHT** — ruling note 2), the
`'unit'`/`'number'` format tokens, and the diagnostic sentences. **Every caller-supplied name is
OPAQUE: any string whatsoever is a legal `VarSpec.name`, with no CSS-legal-spelling requirement and no
denylist** (ruling note 3) — which is why the two returned `applied` records and every internal
key→value map are **null-prototype** objects and every **key lookup over caller data is an
own-property lookup**, never a prototype-chain read (`I-12`/`I-13`, §2.5).

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module's source contains **no occurrence** of `zone`/`pane`/`tab`/`region`/`track`/`isEmpty`/`emptyToken` as vocabulary; property names and units are typed as an **open** `string` (never a closed union); the module documents **no** consumer constant, **not even an example one**. The only string-unions are `VarSpec['format']` (**two contract tokens**) and `ProjectionSkipReason` (**eight contract diagnostics** — **⟶ SUPERSEDED: "seven", changed to EIGHT on 2026-09-27 by ruling note 2, which added `'accessor-threw'`; the pre-ruling "seven" is kept visible here rather than edited away**). | static source row over the module file — **⟶ its id is `R-17` (`§3.4`), and its SCOPE and its ANTI-EVASION clause are pinned by `§7a.1` item 11 (a)+(b): the scan reads the MODULE's source INCLUDING its comments, plus the unit's own `[T]` fixtures; the words exist only in THIS spec's prose, which the module never contains** — **so `A-13`'s probe no longer collides with the prohibition it states** **⟶ SCOPE COMPLETED 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — a CLARIFICATION; the cell above is KEPT and nothing in it is withdrawn): the FILE half of that scope is now the fixtures `R-17` ITSELF CONTROLS, never the whole file, and the scan carries a WORD/IDENTIFIER-BOUNDARY rule — the reason is that the file cannot pass a whole-file negative (its own positive control must spell the vocabulary, `S-12` requires it, and ordinary words such as `table`/`stable` contain `tab`)** (`§3.4 R-17`'s `CONTRACT-AMENDED` block, `§7` item 13 (i)). **The MODULE half is UNCHANGED: raw, assembled AND comments, no boundary exceptions beyond the boundary rule itself.** |
| **2** | **No app UI content** authored | The module creates **no** element, authors **no** text, **no** class, **no** style string of its own, and **no default value**. It computes strings and calls one injected write method. **Every string it emits is derived from caller data** (`value` + caller `unit`) — a row asserts this by driving it with sentinel caller strings and finding them, unmodified, in the output. | `M-7` (sentinel round-trip) + static row |
| **3** | **No policy defaults** | No default unit, no default name, no default value, no "assume 0", no fallback token. An **omitted** `format` is **documented as `'unit'`** — a **contract default the caller can see and override**, not a hidden policy (the honest reading of ruling 3); **an omitted `unit` is NOT defaulted** — `unit` is required, and `''` is the caller's explicit "no unit". **A NAME-LEGALITY rule is a policy this unit may NOT have** (2026-09-27 ruling note 3): `VarSpec.name` is **caller data** and the contract requires **no CSS-legal spelling**, so the module may **not** reject, rename, sanitize or skip a caller-supplied name — **not even a hostile-looking one** (`'__proto__'`, `'constructor'`, `'toString'` are all written verbatim; the record hazard they pose is solved by the **null prototype**, `I-13`, **not** by editing the caller's name). **⟶ CORRECTED 2026-09-27: the pre-ruling text said "no default name" only, which left the NAME-LEGALITY question open — the clause above closes it, and the pre-ruling half is unchanged.** | `F-1`, `M-2`, `M-8`, `M-18`, `F-13` |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero file/`localStorage`/IPC, zero module-level mutable state. Both halves are **call-local**: the same call twice yields deep-equal results, and no reference to an input or a sink is retained. **Consequences pinned by the 2026-09-27 rulings and asserted here so prohibition 4 covers them:** a `Projection` is therefore **REUSABLE** with **no per-projection state** (`I-11` — there is no state to hold, so there is nothing to consume), and **no re-entrancy guard exists or may be added** (`I-14`'s note; a guard would have to be state, which is exactly what this prohibition forbids). | `I-5`, `I-6`, `I-11`, `I-14` + static row |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, **no IPC method**. `ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**. | `R-19` (**the import-boundary row — `§3.4`**) + `R-20` (**the diff-scope row — `§3.4`**) + **`tests/engine-pin-version.test.ts`'s existing `R-15`/`R-15a`/`R-15b` rows, which are ALREADY set-equality and name-complete** — read this pass at `:102-160` (`PINNED_TOOL_SET`/`PINNED`, the same-set assertion at `:163`, `groupForTool` per name at `:164-166`) and `:174-197` (**21**-member `RpcMethod` census) — **⟶ CORRECTED 2026-09-27 (`§7a.1` item 11 (c)): the as-filed cell read "`tests/engine-pin-version.test.ts:174-197`'s **21**-member census (read) **must still pass unchanged**; plus a static import row". That is HALF-VACUOUS — a count-census passes "unchanged" whether or not this unit adds a seam — so the row that carries this prohibition's falsifiable half is the IMPORT row (R-19) and the diff-scope row (R-20), and the existing census rows are cited as ALREADY SUFFICIENT for the seam half (`R-15`'s set equality is name-complete, so a new tool or a removed one fails it). The as-written sentence is kept visible because it is the filing's state.** |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]** alone. The unit asserts **no** layout, paint, cascade, `getComputedStyle`, or rendered-geometry property, and its module expands no shim member (**it may not add `setProperty` to the shim**). The one real-DOM value row is **OPTIONAL** (`[U]`, §5.2) and nothing in §3 depends on it. | every §3 row carries `[T]`; the `[U]` row is optional and precondition-gated |

### 2.3 The write-or-skip rule — the applier, stated falsifiably

1. **One decision per key.** For every key in `projection.applied`, the applier either writes it
   (exactly one `setProperty` call) or skips it (`write-refused`). For every key already in
   `projection.skipped`, it propagates the skip **unchanged**. **Together these cover the whole
   spec set** — a key can never vanish between the two halves (`I-2`). **The projection is read as an
   INPUT, never as a cursor: it is REUSABLE**, so the same projection may be passed again — to this
   sink or to another — and **every call must be equivalent to a first call with that value** (`I-11`;
   ruling note 1). **Nothing is consumed, and there is no per-projection state**; a second call yields
   an **independent** `ApplyResult` (`ok`/`skipped` are call-local — `M-15`, `I-10`).

   **⟶ ADDED 2026-09-27 (the `§7a` RULING pass, `§7a.1` items 1, 3 and 4 — the SCOPE of this item's
   own clauses): (1)** the "one decision per key" rule and the "never vanish" clause it carries (`I-2`)
   **bind a WELL-FORMED projection** — **a malformed projection (a non-record) has NO keys to decide,
   so a vanished key is not expressible**: `M-11`'s total no-op is the rule, and `I-2` is scoped in the
   same words; **(2)** a malformed `skipped` list is outside this item too — its entries are **DROPPED**
   (`F-9`) and **`ok` is computed from the EMITTED list** (`I-10`), so an all-dropped malformed list is
   `skipped []` with **`ok === true`**; **(3)** a hand-built projection's **non-string `applied` value
   is COERCED by `F-10`, and that coercion is the ONLY re-formatting the applier does** — `M-13`'s
   "exactly that record" is the TRUST half (see the `M-13`/`F-10` boundary sentence under item 2 below).
2. **No partial write for an applied key.** A key is reported in `ApplyResult.applied` **iff**
   `setProperty` was invoked with it; a key whose `setProperty` threw is reported in `skipped` with
   `write-refused` and **is not** in `applied` (`I-3`).
3. **A throwing `setProperty` does NOT abort the run.** The applier continues with the remaining
   keys and reports each failure individually — **the totality rule is what makes this the contract
   rather than a partial-write violation**; the caller sees exactly which keys did not land. **The
   projection half is SYMMETRIC with this rule since 2026-09-27:** a **value accessor that THROWS** is
   caught **per key** and recorded as `'accessor-threw'`, and **one bad key never aborts the
   projection** either (ruling note 2, `F-4B`/`F-12`).
4. **A malformed/unusable sink is a TOTAL skip, not a throw.** A `null`/absent sink, or one whose
   `style` is missing or whose `style.setProperty` is not callable, ⇒ **no writes at all** and
   **every** key skipped with `sink-unusable` (`F-5`/`F-6`) — the applier must **not** attempt a
   write to discover the sink is unusable, and must not throw.

   **⟶ THE MALFORMED-PROJECTION vs MALFORMED-SINK ASYMMETRY, PINNED 2026-09-27 (`§7a.1` item 4 —
   the two objects must not be conflated).** **A malformed PROJECTION decides NOTHING** (`M-11`:
   `applied {}`, `skipped []`, `ok === true`) — a projection is an **INPUT RECORD**: the keys to decide
   live **in it**, and a non-record has none. **A malformed SINK decides EVERY key** (`F-6`: `applied {}`,
   **one `sink-unusable` skip per key**, `ok === false`) — a sink only **RECEIVES** decisions and never
   supplies one. **The asymmetry is deliberate and is the whole of item 4's ruling; no ninth reason
   (`'projection-unusable'`) is invented for the malformed-projection shape** — inventing one is
   `§4.4 S-9`'s class (a new contract needing its own gate), and the `'no-container'`-shaped
   declared-but-not-emitted treatment the sibling units used is **not** available here because
   `ProjectionSkipReason` has no such member to declare.
5. **The applier is BLIND to the sink's prior state.** It never reads a value back, never compares,
   never skips "because it is already correct". **Consequence, stated so it is not a surprise: a
   stale property on the sink is NOT cleared by this mechanism** — removing a property is a
   *removal* concern, not a projection concern, and an empty/absent value is a **skip**
   (`missing-value`), not a removal write. **A later pass that wants a removal API is proposing a
   DIFFERENT contract and needs its own gate.**
6. **Write order is `Object.keys(projection.applied)`'s order** — deterministic, caller-visible.
7. **`one write per commit`** (ruling 2's fourth acceptance line) means **exactly one `setProperty`
   call per applied key per `applyProjection` call** — a row counts the calls (`M-5`). **A reused
   projection writes ONCE PER CALL, not once ever**: each call **is** a commit, so K keys applied twice
   is **2K** calls, one per key per call (`M-21`).
8. **THE `skipped` ORDER IS PINNED — and it is a DIFFERENT LIST in each half** (ADDED 2026-09-27, the
   `U-PROJ` RED-SET REPAIR pass: `§2.1`/`§2.3` pinned `applied`'s order while **nothing pinned the
   order of a skip list at all**, which let two rows of the SAME drive demand incompatible orders).
   **⟶ NUMBERING NOTE (recorded so it is not read as drift, and NOT "fixed" by a later pass):
   `ITEM 8` APPEARS TWICE IN THIS LIST ON PURPOSE.** This pass **appended** the `skipped`-order rule as
   **item 8** rather than renumbering, and the immutability rule below **kept its own as-written item
   8** — **renumbering either is FORBIDDEN by this file's citation-stability convention** (`§5.3`'s own
   *"renumbering is FORBIDDEN for citation stability"* note: `§2.3` item 8 is cited across `§0A` note 4,
   `I-14`, `F-14`, `F-15`, `§5.5.1` and this spec's own text, and the new rule is cited by `§2.4` item
   8's own name in `F-2`/`F-12`). **A citation to "`§2.4` item 8" therefore means the IMMUTABILITY rule
   unless it says *"item 8, the `skipped`-order rule"*** — and the two are distinguishable on their
   subject in one sentence: **the immutability rule is about the applier never touching its INPUT; this
   rule is about the ORDER of a SKIP LIST.** **Two statements, two subjects, and neither may be read as
   the other:**
   **(1) THE PROJECTION'S LIST — SPEC-ENTRY ORDER.** `Projection.skipped`'s entries appear in the
   order of the **spec entries** that produced them — i.e. **the same order that gives `applied` its
   key order** (§2.4 item 4's *"spec order"*, `M-6`, `§2.3` item 6): one entry is appended per decided
   spec entry as that entry is decided, so the list is **NEVER grouped by reason and NEVER re-sorted**.
   **`F-12`'s plain drive is the deciding case:** the four keys `k1`-`k4` with `k2` throwing and `k4`
   absent yield `skipped` `[{'--k2','accessor-threw'}, {'--k4','missing-value'}]` — **spec-entry order,
   even though `missing-value` PRECEDES `accessor-threw` in the fixed precedence of `§2.4` item 3. The
   precedence chooses WHICH reason an entry carries; it NEVER orders the list** — so a
   reason-ordered reading of the same drive (`[missing-value, accessor-threw]`) **FAILS**.
   **(2) THE APPLIER'S LIST — ITS OWN DECISIONS FIRST, THEN THE CARRIED ENTRIES IN INPUT ORDER.**
   `ApplyResult.skipped` is **NOT the projection's list**: it is assembled by the applier as
   (a) **the refusals of the current call, in `projection.applied`'s order** (`write-refused` for a
   key whose write threw or whose value is a non-primitive — `F-7`/`F-8`/`F-10`; `sink-unusable`, one
   per key, for an unusable sink — `F-6`/`§2.3` item 4), and then (b) **the entries CARRIED UNCHANGED
   from `Projection.skipped`, in the caller's own list order** (which is (1) for a `project`-built
   projection, and the caller's input order for a hand-built one). **Neither sub-list is re-sorted,
   and the two are never interleaved**: an unusable sink replaces the WHOLE list with
   `sink-unusable` and **preserves the relative order of the carried entries** (each key once, the
   `applied` keys first and then the caller's skip entries in their own order). **`F-13` (c) and
   `F-2`'s two-entry drives are the small cases: two entries for one name appear in spec-entry order,
   `[{'--dup','missing-value'}, {'--dup','duplicate-name'}]` for the first-occurrence-skipped drive
   (`§7a.1` item 5), and never the reverse.** **A well-formed `project` projection's two lists are
   DISJOINT by `I-1`, so the concatenation in (2) cannot decide one key twice** (a hand-built
   projection whose `applied` and `skipped` name one key is out of `I-2`'s scope and is not this
   clause's case).
   **(3) THIS CLAUSE PINS THE LISTS' ORDER, NEVER THE DECISION-TIME CALL ORDER — and the two must not be
   conflated** (recorded because a repairing row could otherwise assert the wrong observable): the fixed
   precedence of `§2.4` item 3 is applied **in its own written order**, so an entry that is `malformed-spec`
   or `duplicate-name` **has no value read at all** — the precedence's position for `accessor-threw`
   (*"positioned where the read happens"*, `§0A` note 2's recount table) is a statement about **WHICH
   REASON** an entry carries, **not** a promise that every entry's accessor is read before the duplicate
   decision. **A row that counts the caller's accessor INVOCATIONS and expects one per spec entry
   (including the duplicate or otherwise-undecidable entries) asserts a call order this contract does not
   state, and FAILS nothing but its own reading** — what the contract fixes is (a) the entry's reason and
   (b) the LIST's order, and both are asserted on the RESULT. **`P-PJ-IM-3`'s *"the read happens once"*
   variant is about an entry that IS read (an accessor whose SECOND read would throw) and is unaffected
   by this clause.**
8. **The projection is IMMUTABLE INPUT, and sink RE-ENTRANCY is NOT GUARDED** (2026-09-27 ruling
   note 4). The applier **never mutates the projection, never caches into it, and never re-enters it
   to change it**; **a consumer wanting different writes must build a NEW projection** (`I-14`). If the
   injected sink's `setProperty` **re-enters `applyProjection`** — with the same projection or another
   — the applier's behaviour is **call-local** per `I-5`/`I-8`/`I-11`: each call keeps **its own**
   write log, `ok`/`skipped`, and write count, and **a re-entrant call cannot add a key to, or remove
   a key from, the outer call's `ApplyResult`** (the outer iteration set is fixed when it reads
   `projection.applied`). **Observable interleaving IS possible AT THE SINK and is the sink's own
   choice** — the applier is blind to the sink's prior state (item 5) and **owns no lock over an
   object it does not own** (ruling 4 of §0); **no clause of this contract is weakened by it, so no
   guard is owed.** **The module holds NO re-entrancy guard because it holds no module or instance
   state at all** (prohibition 4) — **and a guard would have to be state**, so adding one is a **NEW
   CONTRACT needing its own gate** (`F-14`).

### 2.4 The projection rule — the pure half, stated falsifiably

1. **Purity.** `project` is a function of its two arguments alone: same arguments ⇒ **deep-equal**
   result, every time; no ambient read (`Date`, `Math.random`, `process.env`, `document`, `window`,
   the shim, the module's own past calls). A row calls it twice and asserts deep-equality (`I-4`).
2. **Totality.** For **any** `values` and **any** `specOf` — `null`, `undefined`, a string, a number,
   an array, a frozen object, a getter-bearing object, **a getter that THROWS**, a huge object —
   `project` **returns a `Projection` and never throws** (`I-7`). **Every spec entry produces exactly
   one decision.** **A throwing accessor is caught PER KEY and does not abort the projection**
   (2026-09-27 ruling note 2): the remaining keys are still decided, and the throwing key lands in
   `skipped` with `'accessor-threw'`.
3. **The validity rule, per spec entry (the fail-soft pin, generalized):** a key is **applied**
   **iff** its spec is usable **and** its value is present **and** the value can be **read** **and**
   the read value is a **finite number** **and** that number is **not negative**. Otherwise it is
   **skipped**, with the first matching reason in this fixed precedence: `malformed-spec` →
   `duplicate-name` → `missing-value` → **`accessor-threw`** → `not-a-number` → `negative`. **The read
   happens ONCE, and `accessor-threw` takes the place of `missing-value`/`not-a-number` when the read
   itself threw**: a hostile accessor means *"we could not read the value"*, which is a **different
   fact** from *"the value is not a number"* (ruling note 2 — reusing `not-a-number` would **silently
   conflate** them, and the consumer cannot recover the distinction from it). **`NaN`, `±Infinity`,
   `-1`, `'12'`, `true`, `null` and an absent key are all skips** — **no `NaN`/`Infinity`/negative may
   ever appear in `applied`** (ruling 2's pin, which is the fork's F-2 rule generalized).
   **⟶ SUPERSEDED: the pre-ruling precedence was the five-member list `malformed-spec` →
   `duplicate-name` → `missing-value` → `not-a-number` → `negative`; the sixth member `accessor-threw`
   was inserted at the read point on 2026-09-27 (ruling note 2), and `F-4` was SPLIT into `F-4A`/`F-4B`
   so the plain non-numeric inputs keep `not-a-number`.** **⟶ ADDED 2026-09-27 (the `§7a` RULING pass,
   `§7a.1` items 1 and 5 — two clauses this item's precedence text was silent on, now pinned):
   **(i) a NON-RECORD `values`** (`null`, `undefined`, a string, a number, an array) **contributes NO
   own keys, so EVERY otherwise-well-formed spec entry is skipped `missing-value`** — the same
   own-property read `§2.5` item 2 pins for a plain object, and **no `malformed-spec` may be invented
   for `values`** (it is caller data; prohibition 3) — this is what makes `F-11` and `§2.4` item 2's
   *"for **any** `values`"* agree.

   **⟶ ADDED 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — `'accessor-threw'`'s TRIGGER, PINNED
   PRECISELY; a CLARIFICATION of the ruled `A-2`/`F-4B` class, never a re-ruling of it — `A-2`'s
   substance (`§0A` note 2: caught PER KEY, recorded, never propagated, its OWN eighth reason) stays
   UNTOUCHED).** **The trigger, in the words a row can assert:** `'accessor-threw'` is the recorded
   reason **iff the entry's value is a PRESENT OWN PROPERTY OF `values` and the ACT OF READING IT
   THREW** — i.e. the own property's **accessor (`get`) throws when the value is read**, the shape
   `F-4B` drives (`Object.defineProperty(values, key, {get() { throw … }, enumerable: true})`,
   including a `frozen` `values` carrying that same own accessor) and **nothing else**:
   **(a) A PLAIN DATA PROPERTY HOLDING A FUNCTION IS `not-a-number`, NOT `'accessor-threw'`.** The
   function **is** the value and it is **READ successfully** — *"the value was read and is not a finite
   number"* is exactly its diagnostic (`§2.1`'s union comment, `F-4A`, whose own table drives `a
   function` and asserts that reason). **Reading a value and CALLING it are different acts**, and the
   contract performs only the first. **The module never INVOKES a caller-supplied function to discover
   whether it throws** — doing so would (i) be a **side effect of the module's own**, which `§2.4`
   item 1's purity forbids, (ii) turn a data value into an **execution** the contract never authorised
   (a function value is a *value* here, not a behaviour to probe — prohibitions 2/3), and (iii)
   **misreport a readable value as a read failure**. **A row that drives `{k: () => { throw new Error('x') }}`
   and expects `'accessor-threw'` FAILS: the reason is `not-a-number`, and the function is NEVER
   CALLED** — the module's observable is the skip reason, and a caller-supplied function that had been
   invoked would be a purity violation a row can name.
   **(b) AN ABSENT KEY IS `missing-value`, NOT `'accessor-threw'`.** The own-property test **runs
   FIRST** (`§2.5` item 2, and the key rule above), so **an absent key never reaches a read at all** —
   there is no value to read and therefore no read that could throw: the reason is `missing-value`
   (`F-3`/`F-11` (b)), **never** `'accessor-threw'` and never `not-a-number`.
   **(c) THE ADMISSIBLE PATH, stated in the form the contract can assert:** the module may learn a
   value's shape **without invoking the caller's code** — an own-property membership test
   (`Object.prototype.hasOwnProperty.call`, `§2.5` item 2) followed by **one read inside a
   `try`/`catch`** (or, equivalently, an **`Object.getOwnPropertyDescriptor`-style** read of the
   descriptor's `value`/`get`), and **no more than that**. **The read happens ONCE per spec entry**
   (this item's own *"the read happens ONCE"* clause, `P-PJ-IM-3`'s memoization-trap variant), and an
   **accessor that throws only on a LATER read than the first is not driven** — one decision per entry
   is the rule (`§2.3` item 1, `I-1`).
   **(d) THE DECIDING CLAUSES, cited:** the union's own comment on `'accessor-threw'` (*"the value's
   accessor THREW while it was being read"*, §2.1 — **an accessor, and a read**), `F-4A` (*"a
   function"* ⇒ `not-a-number`, its own table), `§2.4` item 1 (purity: **no side effect of any kind**,
   so calling a caller's function to see whether it throws is forbidden), `§2.5` item 2 (the
   own-property read precedes any value read) and `F-3` (absent ⇒ `missing-value`). **`§4.4 S-9` stays
   the stop condition for a row or an implementation that propagates the throw or folds it into
   `not-a-number`/`missing-value`: this clause does NOT widen `S-9` — it states what the ruled class's
   trigger IS**, so a red-set row demanding `'accessor-threw'` for a function value or for an absent
   key is **a test-side repair, not a contract question**.
   **(ii) `duplicate-name` is decided by NAME COLLISION, never by
   whether the first occurrence was APPLIED**: with two spec entries producing one `name`, the SECOND
   entry is `duplicate-name` **even when the FIRST occurrence was itself skipped** — and the first
   occurrence records **its own** reason from this precedence (`missing-value`, `accessor-threw`,
   `not-a-number`, `negative`, …), because first-wins means **the first DECISION wins**, not the first
   application (`§7a.1` item 5).**

   **⟶ ADDED 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — THE VALUE-LOOKUP KEY RULE, pinned
   normatively, because `§2.4` item 3's *"the spec's key"* and `§2.5` item 2's *"every `values`
   lookup is an own-property lookup"* named an own-property read but **NEVER SAID WHICH OF THE TWO
   CALLER OBJECTS SUPPLIES THE KEY**, which let a fixture read either `values[<specOf key>]` or
   `values[<VarSpec.name>]`).** **THE RULE, in the words a row can assert:**
   **(1) WHICH OBJECT SUPPLIES THE KEY — the `specOf` map's OWN KEY.** `specOf` is a **map whose own
   enumerable keys are the lookup keys** (that is what makes `project({w: 320}, {w: {name:
   '--app-width', unit: 'px'}})` produce `{'--app-width': '320px'}`): the entry's lookup key is the
   key under which that entry sits in `specOf`, and the value for that entry — and the only value —
   is **the own property of `values` under THAT key**. **`VarSpec.name` is the EMITTED name**: it
   determines the key of `Projection.applied` (and the `name` field of a `ProjectionSkip`), and it
   **never** selects a value. **The two are independent by construction** (`M-1`, `F-3`, `F-11(b)`):
   `M-1`'s `name` (`'--app-width'`) is **not** a key of `M-1`'s `values` (`{w: 320}`) and the key
   `'w'` **is**, so any reading under which the *name* supplied the key would make `M-1`'s own drive
   `missing-value` — the row that defines the happy path contradicts it. **A fixture that reads
   `values[name]` (the projection NAME) is therefore WRONG, and the three red-set fixtures that do so
   are test-side repairs, not contract questions.**
   **(2) THE READ IS AN OWN-PROPERTY READ.** The value is taken only where
   `Object.prototype.hasOwnProperty.call(values, <the specOf key>)` (or a null-prototype-safe
   equivalent — `§2.5` item 2) is true: an **inherited** member of `values` is **NOT** a value (so a
   spec entry keyed `'constructor'`/`'toString'`/`'hasOwnProperty'` against a plain-object `values`
   with **no own key of that name** is `missing-value`, §2.5 item 2, `F-13` (a)), and a **non-record
   `values`** has **no own keys** (clause (i) above, `F-11` (b)).
   **(3) A PROTOTYPE-SHAPED NAME MEANS NOTHING FOR THE LOOKUP.** When the **specOf key** is
   `'__proto__'`, `'constructor'`, `'prototype'`, `'toString'`, `'hasOwnProperty'` or `'valueOf'`, it
   is an **ordinary string in a map-key position** and the same own-property read decides it: **no
   prototype-chain read, no misdiagnosis, no name policy** (`I-12`/`I-13`, §2.5 items 1–2). **The
   same is true when only the `VarSpec.name` is prototype-shaped** — the **name never selects a
   value**, so it changes nothing about the lookup (`M-18`/`F-13`).
   **(4) THE DECIDING CLAUSES, cited so this is a majority reading rather than an invention:**
   `§2.5` item 2's own-property rule (which the two named objects made necessary to place), `§2.4`
   item 3's *"its spec is usable and its value is present"*, `M-1`'s drive (above), `F-3` (*"a
   well-formed spec whose key is absent from `values`"* — "the key", in `F-13` (a)'s drive, is the
   **specOf** key) and **`P-PJ-IM-2`**'s own-key shape (the **`specOf` key** is the lookup, and the
   name is only what is emitted). **THE OTHER READING (the name) IS REJECTED, decisively:** it would
   **supersede `M-1`/`F-3`/`F-11(b)`/`P-PJ-IM-2` themselves** — every one of those rows is driven by a
   `specOf` key that is **not** equal to its `VarSpec.name`, so under the name reading the happy-path
   row `M-1` becomes a `missing-value` row, `F-3`'s drive names a key that does not exist in
   either object, and `P-PJ-IM-2`'s `6 × 3` own-key drives have no lookup key at all. **A reading
   that supersedes the row that defines the happy path is not the contract's reading.**
4. **Number formatting is the applier's own arithmetic, not a delegated dependency.** With
   `format: 'unit'` (or omitted): `${value}${spec.unit}`; with `format: 'number'`:
   `String(value)`. **`0` is a legitimate value and is applied** — a row pins that `0` is not
   mistaken for absent (`F-3`'s mirror case). **The output is a string produced by the JS number →
   string conversion, and this spec does NOT claim a CSS serialization** (Layer declaration anchor 2).
5. **`duplicate-name` is resolved FIRST-WINS.** If two specs produce the same `name`, the **first**
   (in spec order) is applied and the **second** is skipped with `duplicate-name`; the `applied`
   record therefore contains each name **at most once** (`F-2`).
6. **The census half is ABSENT, structurally.** `project`'s parameters are `(values, specOf)` —
   there is **no** `census`, `zones`, `sizes` or `revealed` parameter, and **no** key-set rule that
   consults one. A static row asserts the module imports nothing from a zones/census module
   (ruling 5), and a signature row pins the parameter list (`A-15`).

**⟶ ADDED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 2 — the `M-13` vs `F-10` boundary, stated
once so neither row can fail the other).** **`M-13`'s TRUST half and `F-10`'s COERCION half are two
different statements about two different objects, and BOTH bind:**
**(a) `M-13`'s "it does not re-validate, re-format or re-derive it" means the applier never asks
`project` again** — it does **not** re-run the validity rule of item 3 over the projection's entries,
does **not** consult `values`/`specOf`, does **not** re-derive a skip reason from a spec entry, and
never re-formats an `applied` value against a `VarSpec` (there is no `VarSpec` in its arguments — the
signature is `applyProjection(projection, sink)`); it applies the record it is given.
**(b) `F-10` is the ONE exception, and it is not re-validation of the caller's SPEC: it is the
type-safety coercion of an `applied` VALUE** — a real `CSSStyleDeclaration.setProperty` must never
receive a non-string, so the applier performs `String(value)` **only for a PRIMITIVE**, and **skips a
non-primitive with `write-refused`**. **The coercion does NOT touch the caller's projection** (it
produces a fresh string handed to the sink; `I-14` is unbroken — see `F-15`).
**(c) The two halves therefore never collide: `M-13`'s observable is *"no `project` call, no
spec-based re-derivation"*, `F-10`'s observable is *"the exact string the sink received"*, and the
`§3.2` rows carry them.** **This is a `CONTRACT-AMENDED` ruling in `M-13`'s cell and `F-10`'s cell
(both keep their as-written words and the amendment is dated and named there).**

### 2.5 The record-building rule — `Object.create(null)`, stated falsifiably (2026-09-27 ruling note 3)

**Why this section exists, in one sentence:** a caller-supplied `VarSpec.name` is **any string**
(the contract requires **no** CSS-legal spelling and the unit may **not** invent a name-legality rule),
so `'__proto__'`, `'constructor'`, `'prototype'`, `'toString'` and `'hasOwnProperty'` are **reachable
both as keys of the returned `applied` record and as keys of any internal per-key map** — and on a
plain-object literal the assignment `applied['__proto__'] = 'x'` **silently changes the record's
prototype instead of creating an own property**, dropping the key from `Object.keys` and leaving the
projection **wrong for that key while claiming no skip**. **The full analysis, the four reasons and the
rejected alternatives are §0A's ruling note 3** (they are recorded there and not duplicated here).
**This section states the resulting RULES, which are what a row drives.**

1. **The returned `applied` records are built on `Object.create(null)`** — `Projection.applied` and
   `ApplyResult.applied` **alike** — so **every** key is an **own** property for **every** caller name,
   including `'__proto__'`. **`I-12`** pins the own-key requirement; **`I-13`** pins the null
   prototype. **A row is one call:** a spec naming `'__proto__'` yields an **own key `'__proto__'`**,
   it **appears in `Object.keys(applied)` in spec order**, and **`I-1`'s partition still holds** —
   which is exactly the falsification of the plain-object hazard (`F-13`). **A projection's own
   prototype must be unchanged by any caller-supplied name**: `Object.getPrototypeOf(applied) === null`
   after such a call, and the **module's** prototype chain is never written.
2. **Every internal key→value map is built the same way, and every lookup over caller data is an OWN
   property lookup.** The named cases, each a row's drive:
   - **the duplicate-name detection set** — read with own-property semantics, so a **name colliding
     with an `Object.prototype` member** (`'constructor'`, `'toString'`, `'hasOwnProperty'`,
     `'valueOf'`) is **NOT** misdiagnosed as `duplicate-name` and is **not** treated as already seen
     (`F-2`'s rows drive `'--dup'`; this clause adds the prototype-shaped names to that drive);
   - **the `values` lookup** — an **own-property** read (`Object.prototype.hasOwnProperty.call`-style,
     or a null-prototype-safe equivalent), so a **plain-object `values`** with **no** own key named
     `'constructor'` yields **`missing-value`**, never the **inherited function**
     `Object.prototype.constructor` (which would be a value **the caller never supplied**).
     **⟶ KEY IDENTIFIED 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — THIS BULLET named the READ but
     not the KEY, which is the gap `§2.4` item 3's added clause now closes; the bullet above is kept
     and nothing in it is withdrawn): the own property read here is read UNDER THE `specOf` MAP'S OWN
     KEY** — the own-property test is `Object.prototype.hasOwnProperty.call(values, <the specOf key>)`
     — **never under the `VarSpec.name`**, which is only the EMITTED name (`applied`'s key, the skip
     entry's `name`). **The two-object rule and its deciding clauses are `§2.4` item 3's added clause
     (1)/(2); this bullet is where it is applied to the `values` read.** **The prototype-shaped case
     named here is therefore the case where the LOOKUP KEY is prototype-shaped** (a spec entry keyed
     `'constructor'`/`'toString'`/`'hasOwnProperty'`/`'valueOf'`/`'prototype'`/`'__proto__'`); a
     prototype-shaped `VarSpec.name` changes **nothing** about the lookup — it is emitted verbatim
     (`M-18`/`M-20`, `I-12`);
   - **the `specOf` entry lookup** — the same own-property semantics, so a spec set that legitimately
     carries an own key `'__proto__'` (e.g. a `Object.create(null)` spec map, or one built with
     `Object.defineProperty`) is **read as its own entry** rather than silently resolving to the
     prototype;
   - **any other map** the implementation keeps (a formatter memo, an order list) — the same rule, and
     **`A-14`'s static sweep is where a new one would be noticed**.
   **`values` and `specOf` are NOT required to be null-prototype objects** — they are the **caller's**
   data, and this unit may not impose a shape on them (ruling note 3, reason 3). **What is pinned is
   the MODULE's own read semantics**: own properties only.
3. **`Projection.skipped` and `ApplyResult.skipped` are ARRAYS of `{name, reason}` records, so no
   key-map hazard exists there, and the null-prototype rule does NOT extend to them.** `name` is a
   **value** (`ProjectionSkip.name`), never an object key; the array's indices are engine-owned
   integer slots. **A later pass that "completes" this ruling by rewriting `skipped` would be changing
   a part of the shape `A-3` never implicated** (ruling note 3, consequence 6).
4. **The copy hazard is a CONSUMER obligation, stated because the ruling exposes it:** the null
   prototype is **destroyed by a naive copy** — `{...applied}` and `Object.assign({}, applied)`
   produce a **plain-prototype** object and **re-invoke `Object.prototype`'s `__proto__` accessor on
   the target** when the source holds an own `'__proto__'`. **A consumer copying the record MUST use a
   null-prototype target** (`Object.assign(Object.create(null), applied)`). **The module returns a
   record whose keys survive and may not police how a caller copies it** — a contract obligation, not
   a defect.
5. **`readonly` is TYPE-LEVEL and freezes NOTHING at runtime.** `Object.freeze` on the returned record
   is **permitted** (it changes no row — the return value is treated as a value) but **is NOT a
   contract clause**, and **a caller may rely on neither freezing nor non-freezing**. **What IS pinned
   about mutation is provable and directional:** the applier **never** mutates the projection
   (`I-14`), and no returned record **aliases** module-internal state (`I-5`/`I-8`) — so a caller
   mutating its own copy mutates **its own copy of a value**.

   **⟶ PINNED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 8 — shallow vs deep, and WHO freezes).**
   **Two statements, each with its own subject, and neither may be read as the other:**
   **(i) The ROW's drive has the HARNESS freeze the caller's objects, SHALLOWLY.** The `F-15` drive
   freezes **`p.applied` (the record) and `p` (the projection object)** — **one level, `Object.freeze`
   each, and NOTHING deeper** — before `applyProjection(p, sink)`, and **the module must not throw**:
   reading a frozen record and a frozen projection is legal, and the applier **writes nothing into
   either** (`I-14`). **The `skipped` ARRAY is NOT frozen by this drive** (a shallow freeze of `p`
   does not freeze `p.skipped`), and **a deep freeze is NOT a contract clause** — a later pass wanting
   one is proposing a **different contract** needing its own gate.
   **(ii) The MODULE may freeze its own return, and the caller may rely on NEITHER.** `Object.freeze`
   on a returned `applied` record or on a returned `Projection` is **permitted, changes no row, and is
   not required**: **no row asserts that a returned record IS frozen, and none asserts that it is
   not.** **What a row DOES assert is (a) that the applier produces correct results when its INPUT is
   frozen, and (b) that the projection is observably unchanged after the call** (`F-15`). **Neither
   half is a `CONTRACT-AMENDED` change: the as-written sentences above are kept verbatim and this is
   the reading they already carry** — `F-15`'s cell is annotated with the same two statements.
6. **The APPLIER needs NO guard against a dangerous NAME, and the two halves differ — stated
   explicitly, because the contrast is the point.** The applier passes the name as a **string argument
   to `CSSStyleDeclaration.setProperty(name, value)`**, where `'__proto__'` is an **ordinary string in
   a CSS property-name position**: the DOM API performs **no object-key assignment**, so there is **no
   prototype-write hazard on that side at all**. **The record-key hazard (a JS object keyed by caller
   data) and the CSS-property-name position (a string argument to a DOM API) are different objects** —
   the first is solved by the null prototype, the second needs nothing — and **the applier must NOT
   refuse, sanitize or re-name a caller-supplied name on either half** (prohibition 3). `M-20` drives
   the contrast on a fake sink that records its exact arguments.

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** real-DOM `ui` leg. Every row is
a **contract row** for the TestWriter; **none is a measurement this pass took.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **M-1** | **The unit-family shape: one spec, one value, one write** | `project({w: 320}, {w: {name: '--app-width', unit: 'px'}})` then `applyProjection(p, fakeSink)` | `p.applied` is `{'--app-width': '320px'}`; `p.skipped` is `[]`; the sink received **exactly one** `setProperty('--app-width','320px')`; `r.applied` deep-equals `p.applied`; `r.ok === true` | `[T]` |
| **M-1 — CLARIFICATION (2026-09-27, the `U-PROJ` RED-SET REPAIR pass; the row above is KEPT and its assertion is UNCHANGED — this is NOT a `CONTRACT-AMENDED` cell): the KEY this drive already implies is pinned in words.** The lookup key is **the `specOf` map's own key `'w'`**, read as an **own property of `values`** (`{w: 320}`), and the `name` `'--app-width'` is **only the emitted key** of `applied` — which is why this row's `name` is absent from its `values` and its values key is absent from its `applied` (`§2.4` item 3's key clause (1)). **A row that reads `values[name]` here would make THIS row `missing-value` and therefore cannot be `M-1`** — the contradiction is the rule's proof, and no assertion above changes. | `[T]` |
| **M-2** | **Omitted `format` behaves as `'unit'`** | the same spec with **no** `format` | identical to M-1 — a row pins the documented default so it is **not** discovered by accident | `[T]` |
| **M-3** | **`format: 'number'` drops the unit token** | `{name:'--n', unit:'px', format:'number'}`, value `320` | `applied` is `{'--n': '320'}` — the caller's `unit` is **ignored, not emitted** | `[T]` |
| **M-4** | **An empty `unit` is valid and means "no unit"** | `{name:'--z', unit:''}`, value `7` | `applied` is `{'--z': '7'}`; **`unit` was not defaulted to any literal** | `[T]` |
| **M-5** | **Exactly one write per applied key per call** | a counting fake sink over K keys | `setProperty` called **exactly K** times, once per key, in `Object.keys(applied)`'s order (ruling 2's "one write per commit") | `[T]` |
| **M-6** | **Several keys, deterministic order** | a spec of 3 keys with values | `applied`'s key order equals the **spec** order for every call; `r.applied`'s key order equals `applied`'s | `[T]` |
| **M-7** | **Sentinel round-trip — every emitted string is caller data** | `name: '--SENTINEL_NAME'`, `unit: 'SENTINEL_UNIT'`, value `123` | `applied` contains the sentinel name **verbatim** and the value is exactly `'123SENTINEL_UNIT'` — **the module added no prefix, no suffix and no separator of its own** (prohibition 2/3) | `[T]` |
| **M-8** | **A caller-supplied `unit` that looks like a built-in is used verbatim** | `unit: 'px'` and, in the next row, `unit: 'Q'` and `unit: '--'` | all three emit exactly `${value}${unit}` — **the module has no special case for any token** | `[T]` |
| **M-9** | **Purity against FROZEN inputs** | `Object.freeze`d `values` and a `Object.freeze`d spec (and a frozen nested spec object) | **no throw** (no strict-mode write to a frozen object), and the result is correct — the halves **read** both arguments. **⟶ SPLIT AND PINNED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 6; the sentence above is kept verbatim and is NOT rewritten): `M-9` asserts *"no throw"* over BOTH shapes, and its *"the result is correct"* half is PER-SHAPE, in these words — (a) a FROZEN `VarSpec` ENTRY is a VALID spec: freezing changes none of its fields, so the entry is read normally and its key is APPLIED (**the observable**: the key is an OWN key of `applied` with the exact expected string, and it appears in NO `skipped` entry); (b) a FROZEN NESTED OBJECT where `VarSpec` requires a `string` (a frozen `{}` in the `name` or `unit` position, a frozen array where `name` is expected) is **`malformed-spec`** (`F-1`'s class) — **the observable** is that exact reason member, and **nothing about the freeze itself is a reason**: a row must NOT expect a `TypeError`-shaped or freeze-shaped reason, because the module's read of a frozen field is a LEGAL read. The two observables differ, and a row that asserts one for the other shape FAILS.** | `[T]` |
| **M-10** | **`projectVar` agrees with `project` on the same input** | `projectVar(spec, value)` vs `project(values, {k: spec})` | for every §3 row's inputs, the single-key result's `written` equals `project`'s `applied[k]` **and** its `skip` is deep-equal to the corresponding entry in `skipped` (or both `null`/absent) — **one authority, two entry points** | `[T]` |
| **M-11** | **A `null`/absent projection is a total skip, not a throw** | `applyProjection(null, sink)` / `undefined` / `'nope'` / `42` | **no throw**; `applied` `{}`; `skipped` `[]`; `ok === true` (there was nothing to decide). **Distinguished from `F-5`** (a valid projection, an unusable sink ⇒ skips with reasons) | `[T]` |
| **M-12** | **A projection with an empty `applied` applies nothing** | `project({}, {})`; then apply | `applied` `{}`; `skipped` `[]`; the sink received **zero** calls; `ok === true`; **nothing throws** | `[T]` |
| **M-13** | **A hand-built projection object is honoured** | a literal `{applied: {…}, skipped: []}` passed straight to `applyProjection` | the applier writes exactly that record — **it does not re-validate, re-format or re-derive it**. *(A contract decision: the applier trusts the projection it is given; §7 item 7.)* **⟶ `CONTRACT-AMENDED` 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 2 — the as-written clause above is kept visible and is NOT deleted): the TRUST half is now PINNED as four assertions, so this row can FAIL for the mutation it names:** **(1)** the applier **never calls `project`** during a call (a counting/instrumented double is not available, so the observable is structural: the applier's arguments are `(projection, sink)` and no `values`/`specOf` is reachable — a row asserts the module's exported signature and that the call is driven to completion **without any caller-supplied `values`/`specOf` in scope**, i.e. with a projection whose entries could not have come from any `project` call the row made); **(2)** **no re-derivation from a spec**: the row constructs a projection whose entries are **NOT what `project` would produce from the same shape** — e.g. a projection carrying a skip entry with a reason `project` would never emit for that shape (a `skipped` entry `{name:'--x', reason:'missing-value'}` for a key that IS present in the row's `values`) — and asserts the applier writes/records **the GIVEN skip unchanged**, never a recomputed one; **(3)** **the coercion is `F-10`'s and only `F-10`'s**: the row drives `{applied: {'--a': 12}}` and asserts `setProperty('--a', '12')` **and** that the caller's projection is **unmutated** (`I-14`, `F-15`) — *"exactly that record"* means **the same keys, the same order, the same skip entries**, with the value's string form produced fresh for the SINK; **(4)** a **non-record projection** is `M-11`'s no-op, not a re-validation path (§2.3 item 4's asymmetry). **A row asserting that the applier re-derives `malformed-spec`/`missing-value` for a hand-built projection FAILS this row** — that is the `F-10`-only exception, and re-derivation is not it. *(Note the register's `P-PJ-IM-6` statement cell already scopes its write-or-skip rule to a WELL-FORMED projection — the same boundary, `§5.5.1`.)* | `[T]` |
| **M-14** | **`applyVarsToRoot` is the same function** | `applyVarsToRoot(p, sink)` | identical behaviour **and identity** to `applyProjection` (a row asserts `applyVarsToRoot === applyProjection`) — the source-name alias is not a second implementation | `[T]` |
| **M-15** | **`ok` reflects the current call only** | one call with a skip, then a clean call | the second call: `ok === true`, `skipped` `[]` — nothing accumulates | `[T]` |
| **M-16** | **A value of `0` IS applied** | `{name:'--z', unit:'px'}`, value `0` | `applied` is `{'--z': '0'}` — **`0` is not treated as absent, not skipped, and not coerced** | `[T]` |
| **M-17** | **A very large and a very small finite value** | `1e21`, `-0`, `5e-324`, `Number.MAX_VALUE` | all finite ⇒ **applied** as `String(value) + unit` (`-0`'s string is `'0'`; `1e21`'s is `'1e+21'`); a row records the **exact** strings, so a later pass cannot "improve" the number formatting silently | `[T]` |
| **M-18** | **A caller-supplied name `'__proto__'` is an ORDINARY key (`A-3`)** | `project({k: 1}, {k: {name: '__proto__', unit: ''}})` | **own key `'__proto__'`** in `applied`, value `'1'`; `Object.prototype.hasOwnProperty.call(applied, '__proto__') === true`; `Object.keys(applied)` contains `'__proto__'` **in spec order**; **`Object.getPrototypeOf(applied) === null`** (the record's prototype was NOT mutated); `applied['__proto__']` reads back `'1'` as an own value, **not** the prototype; `skipped` is `[]`; `ok === true`; and with the sibling rows below, **`I-1`'s partition still holds** (`'__proto__'` appears in **no** `skipped` entry) | `[T]` |
| **M-19** | **The null-prototype record's own membership API (`A-3`)** | `project({k: 1}, {k: {name: '__proto__', unit: ''}})` | **`applied.hasOwnProperty` is `undefined`** (calling it throws `TypeError`) — the pinned membership test is **`Object.hasOwn(applied, name)`** / `Object.prototype.hasOwnProperty.call(applied, name)`; **`Object.getPrototypeOf(applied) === null`** for **every** returned `applied` record, including one with only ordinary names; **`Object.keys` / spread-into-a-null-prototype-target / `in` / `Object.entries` / `JSON.stringify` behave normally**; and **a deep-equality helper that compares prototypes is written with the null prototype in mind** (the row states which of the two forms it uses, so a mystery failure cannot hide a contract surprise) | `[T]` |
| **M-20** | **The APPLIER-side contrast: a dangerous NAME is an ordinary CSS property name (`A-3`)** | the M-18 projection applied to a **recording** fake sink | `setProperty` received **exactly `('__proto__', '1')`** — the name **verbatim as a string argument**, **no** refusal, **no** sanitization, **no** `sink-unusable`/`write-refused`; `r.applied` carries the own key `'__proto__'`; and **the applier holds no name guard** — the contrast with M-18's record is the point of the row (§2.5 item 6) | `[T]` |
| **M-21** | **A projection is REUSABLE across DIFFERENT sinks (`A-11`)** | `p = project(values, specOf)`; `r1 = applyProjection(p, sinkA)`; `r2 = applyProjection(p, sinkB)`; `r3 = applyProjection(p, sinkA)` again | **all three calls succeed with independent results**; `sinkA` received the writes **of calls 1 and 3** (once per key per call — **2K** calls total for K keys), `sinkB` those of call 2; `r1`, `r2`, `r3` are **deep-equal to each other** and each is a **fresh** object (`I-8`); `ok === true` in each; **`p` is UNCHANGED after all three** (deep-equal to a fresh `project(values, specOf)`, and mutating `r1.applied` does not affect `p` or `r2`) — **`p` was not consumed** | `[T]` |
| **M-22** | **A projection is REUSABLE against the SAME sink, and `applyVarsToRoot` reuses identically (`A-11`)** | `applyProjection(p, sink)` twice; then the same twice via `applyVarsToRoot` | each call is **equivalent to a first call with that value**: the second call's `ApplyResult` is deep-equal to the first's, the write log is the **current call's** log (`I-3`), and **only one** `setProperty` call per key **per call** is made (no memo, no "already applied" skip — §2.3 item 7); `applyVarsToRoot(p, sink)` behaves identically (`M-14`'s identity) | `[T]` |

### 3.2 Documented fail-states / skips (each is a typed reason, and each is a row)

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **A malformed spec entry** | `specOf` entry that is `null`/`undefined`/a string/a number/an array; a missing `name`; a non-string `name`; a missing `unit`; a non-string `unit`; an unknown `format` value | **no throw**; every such entry is skipped with **`malformed-spec`**; **no default is substituted** (prohibition 3) | `[T]` |
| **F-2** | **`duplicate-name` — two specs, one name** | two spec entries producing `name: '--dup'` | **no throw**; the **first** is applied and the **second** is skipped with `duplicate-name`; `applied` contains `--dup` **once** (first-wins, §2.4 item 5) **⟶ `CONTRACT-AMENDED` 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — THE KEY RULE AND THE LIST ORDER ARE NOW PINNED, and this row's `skipped` assertion is what changes; the as-written clause above is kept visible and is NOT deleted).** **TWO additions, each the pin of a different clause:** **(1) THE KEY — "the first" and "the second" are decided against the `specOf` KEYS, not the names**: this row's two entries sit under two `specOf` keys (`a` and `b` in its drives), each lookup being an **own-property read of `values` under THAT key** (`§2.4` item 3's key clause) — the shared `name: '--dup'` decides only the **collision**, never the lookup; **(2) THE ORDER — `p.skipped` is SPEC-ENTRY order** (`§2.4` item 8 (1)): the row's two-entry drives assert the array **by value AND order**, e.g. the `§7a.1` item 5 drive (the first occurrence's value absent) yields exactly `[{'--dup','missing-value'}, {'--dup','duplicate-name'}]` and **a row asserting the reverse order FAILS**; and a drive handed to `applyProjection` asserts the **applier's own** assembly (`§2.4` item 8 (2)): `ApplyResult.skipped` is **the carried entries in the projection's order**, so `F-2`'s list does not become `[{'--dup','duplicate-name'}, {'--dup','missing-value'}]`. **A row that reasons "the reason that won for the second entry must come first" is reasoning about the PRECEDENCE, which orders REASONS, not the LIST.** | `[T]` |
| **F-2 — KEY AND ORDER, STATED FOR THE ROW (`ORDER-1`, 2026-09-27, the `U-PROJ` RED-SET REPAIR pass): the two clauses a repairing row derives this cell from.** **KEY (`§2.4` item 3's added clause (1)/(2)):** the lookup key is the `specOf` map's own key, and the value is that key's **own property of `values`** — so a duplicate pair driven as `project({a: 1, b: 2}, {a: {name: '--dup', …}, b: {name: '--dup', …}})` reads `a` and `b`, not `'--dup'`, and the drive `project({b: 2}, {a: …, b: …})` is the **first-occurrence-skipped** drive (`a` is absent). **ORDER (`§2.4` item 8 (1)–(2)):** the projection's `skipped` is **spec-entry order**, and the applier's is **its own refusals first, then the carried entries in the input list's own order** — never reason-grouped. **This cell amends what the row asserts (an ordered array on both halves), which is why it is `CONTRACT-AMENDED`; the row's drive is OWED to the TestWriter.** | `[T]` |
| **F-3** | **`missing-value`** | a well-formed spec whose key is absent from `values` | skipped with **`missing-value`** — **never a 0, never an empty string, never a removal write** (§2.3 item 5) | `[T]` |
| **F-3 — CLARIFICATION (2026-09-27, the `U-PROJ` RED-SET REPAIR pass; the row above is KEPT and its assertion is UNCHANGED — NOT a `CONTRACT-AMENDED` cell): *"whose key"* now has an owner.** The absent key is **the `specOf` MAP'S OWN KEY** (`{absent: …}` against `values` `{present: 1}` ⇒ `'absent'` is absent), read as an **own property of `values`** (`§2.4` item 3's key clause `(1)`/`(2)`); the entry's `name` (`'--absent'`) is **only the emitted `name` of the skip entry** and is never looked up in `values`. **A repairing fixture that looks up `values[name]` is wrong for this row too** — it would still yield `missing-value` here by accident, which is exactly why the row must state the key it drives rather than pass for the wrong reason. | `[T]` |
| **F-4A** | **`not-a-number` — the whole NON-NUMERIC class** *(was `F-4`, the first half of the 2026-09-27 SPLIT)* | value `'12'`, `true`, `false`, `null`, `undefined` (present), `{}`, `[]`, `NaN`, `Infinity`, `-Infinity`, a `BigInt`, a function **— each READABLE without throwing** | **no throw**; each is skipped with **`not-a-number`** — the reason means *"the value was read and is not a finite number"*, which is a **different fact** from a read failure (ruling note 2) **⟶ TRIGGER CLARIFIED 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — a CLARIFICATION of the ruled `A-2` class, not a re-ruling; the row above is KEPT and its assertion is UNCHANGED):** **the `a function` entry of this row's own table is the DECIDING drive for the function case** — a plain **data** property whose value is a function (`{k: () => 1}`, and equally `{k: () => { throw new Error('x') }}`) is **READ successfully**, so its reason is **`not-a-number`**; **`'accessor-threw'` is NOT this row's and NOT the function case's** (`§2.4` item 3's added trigger clause (a)). **The module never CALLS a caller-supplied function** — a repairing row that drives a throwing function and expects `'accessor-threw'` FAILS, and one that asserts the function was invoked FAILS against `§2.4` item 1's purity clause. | `[T]` |
| **F-4B** | **`accessor-threw` — the THROWING VALUE ACCESSOR (`A-2`), a reason of its OWN** *(was `F-4`'s embedded clause; the SECOND half of the 2026-09-27 SPLIT)* | a `values` object whose **own** property is an accessor that **throws** on read (e.g. `Object.defineProperty(values, 'k', {get() { throw new Error('hostile') }, enumerable: true})`), with a well-formed spec naming it — and the same where the accessor throws **only for the second** of several keys | **`project` does NOT throw** and the key is **skipped with `accessor-threw`** — **caught PER KEY**: the other keys are still decided normally, the good keys still appear in `applied`, and `skipped` carries exactly one entry for the throwing key (the **`F-12`** row drives it in full). **⟶ SUPERSEDED, KEPT VISIBLE — the pre-ruling `F-4` text read: *"A getter that throws: the throw propagates **out of the getter** — the spec does **not** claim to swallow arbitrary accessor throws, and the row must record which behaviour the implementation has (§7 item 8)"*. That sentence is SUPERSEDED by the architect's 2026-09-27 ruling (ruling note 2): the projection now **catches per key and records the skip**, it does **not** propagate, and the behaviour is **no longer deferred to the implementation** — `§7 item 8` no longer lists it as unruled.** **⟶ TRIGGER PINNED 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — CLARIFICATION; `A-2`'s substance is UNTOUCHED and no observable above is withdrawn):** **`'accessor-threw'` is recorded for EXACTLY ONE shape — an OWN property of `values` whose ACCESSOR (`get`) THROWS WHEN THE VALUE IS READ — and for no other** (`§2.4` item 3's added trigger clause, citing this row's own drive and `§4.4 S-9`). **The two red-set shapes this row does NOT cover: a plain data property holding a FUNCTION is `not-a-number` (`F-4A`'s own table, clause (a)), and an ABSENT key is `missing-value` (`F-3`, clause (b))** — the own-property test runs **before** any read, so an absent key never reaches one. **The admissible read is the own-property membership test plus ONE read inside a `try`/`catch` (or an `Object.getOwnPropertyDescriptor`-style read of the descriptor's `value`/`get`) — the module never INVOKES a caller-supplied function to discover whether it throws** (purity, `§2.4` item 1), and the read happens **ONCE per spec entry** (`P-PJ-IM-3`'s memoization-trap variant). **A `VarSpec.name` lookup is not this row's case**: the key rule (`§2.4` item 3, clause (1)) makes the `specOf` key the lookup. | `[T]` |
| **F-5** | **`negative`** | value `-1`, `-Number.MIN_VALUE`, `-0`'s distinction | `-1` and any negative ⇒ **`negative`** skip; **`-0` is NOT negative** (`-0 < 0` is `false`) and is **applied as `'0'`** — a row pins both halves, because `-0` is the one input where a naive `<= 0` test would differ from `< 0` | `[T]` |
| **F-6** | **`sink-unusable` — a malformed sink** | `null`, `undefined`, `42`, `'x'`, `{}` (no `style`), `{style: {}}` (no `setProperty`), `{style: {setProperty: 42}}` | **no throw**; **no write attempted**; **every** key of the projection appears in `skipped` with **`sink-unusable`**; `applied` `{}`; `ok === false` (`F-6` is the whole-sink class — one reason, applied to every key) | `[T]` |
| **F-7** | **`write-refused` — a `setProperty` that throws for ONE key** | a fake sink whose `setProperty` throws on the 2nd key only | **no throw out of the applier**; key 2 is in `skipped` with **`write-refused`** and **absent from `applied`**; keys 1 and 3 **are** applied; `ok === false`; **the run did not abort** (§2.3 item 3) | `[T]` |
| **F-8** | **`write-refused` — a `setProperty` that throws for EVERY key** | a fake sink that always throws | no throw; every key `write-refused`; `applied` `{}`; `ok === false` | `[T]` |
| **F-9** | **A projection whose `skipped` is malformed** | `{applied: {}, skipped: 'nope'}` / `{applied: {}, skipped: [null]}` | **no throw**; the applier still performs the `applied` half's writes; the malformed skip entries are **dropped from `ApplyResult.skipped`** (they carry no decidable reason). *(A contract decision, §7 item 7.)* **⟶ `CONTRACT-AMENDED` 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 3 — the as-written clause above is kept visible and is NOT deleted): `ok` IS NOW PINNED, and the reading is that `I-10` WINS — `ok` is computed from the EMITTED `skipped` list.** **The row's observables, exactly: (1)** no throw; **(2)** the `applied` half is still written in full (every key of `applied` reaches the sink, exactly one `setProperty` per key); **(3)** `ApplyResult.skipped` **omits** the malformed entries — both the whole-list-malformed shape (`skipped: 'nope'`) and the entry-malformed shape (`skipped: [null]`) — so for `{applied:{'--a':'1'}, skipped:'nope'}` the result is `applied {'--a':'1'}`, `skipped []`; **(4)** **`ok === true`** for an all-dropped malformed list, because `I-10` (`ok === (skipped.length === 0)`) is stated over **the result's OWN emitted list** and not over the caller's malformed input; **(5)** a MIXED list (one well-formed entry + one malformed entry) yields `skipped` of length `1` with that entry propagated **unchanged**, and `ok === false` — so the row has a non-vacuous control and cannot be passed by dropping everything. **A row asserting `ok === false` for the all-dropped shape FAILS: that reading is the one this ruling rejects** (it would make `I-10` a two-expression invariant consulting an input the result does not carry). **Neither the caller's malformed entry nor the drop produces a skip REASON — no ninth reason is invented** (`S-9`'s class).** | `[T]` |
| **F-10** | **A projection whose `applied` value is not a string** | `{applied: {'--a': 12}}` / `{'--a': null}` | **no throw**; the applier coerces with `String(value)` **only for a primitive**, and **skips** a non-primitive with `write-refused`. *(A contract decision, §7 item 7: the applier does not re-validate its input, but it must never hand a non-string to a real `setProperty`, which would throw a `TypeError` in a browser.)* **⟶ `CONTRACT-AMENDED` 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 2 — this row OWNS the coercion, and its drive is now an exact table, so the `M-13` collision is gone):** **the applier's coercion is `String(value)` for the PRIMITIVE half and `write-refused` for the non-primitive half, with these exact outcomes — `12` ⇒ `setProperty('--a','12')` and `applied` carries `{'--a':'12'}`; `0` ⇒ `'0'`; `-0` ⇒ `'0'`; `true`/`false` ⇒ `'true'`/`'false'`; `12n` (a `BigInt`) ⇒ `'12'`; `'12'` ⇒ `'12'` (unchanged); `null` ⇒ **skipped `write-refused`**; `undefined` ⇒ **skipped `write-refused`**; `{}` ⇒ **skipped `write-refused`**; `[]` ⇒ **skipped `write-refused`**; a function ⇒ **skipped `write-refused`**. **`String()` is never applied to a non-primitive, and a `Symbol` in the `applied` record is OUTSIDE this row's contract surface** (it contradicts `Projection.applied`'s own `Record<string, string>` declaration; this row's table does not drive it and no row may assert a symbol's outcome). **Every primitive case asserts the EXACT string the SINK received; every skip case asserts the key is ABSENT from `ApplyResult.applied` and present in `skipped` with `write-refused`; and every case asserts the caller's projection is UNMUTATED afterwards (`I-14`/`F-15` — the coercion produces a fresh string and writes nothing into the projection).** **This row is the ONLY re-formatting the applier does; `M-13`'s "does not re-validate/re-format/re-derive" is the TRUST half and not a second coercion rule** (§2.4's `M-13`/`F-10` boundary paragraph). | `[T]` |
| **F-11** | **`project` given a `specOf` that is not a record** | `null`, `undefined`, `'x'`, `42`, `[]` | **no throw**; **zero** spec entries ⇒ `applied` `{}` and `skipped` `[]`. **An empty input set is not an error** (prohibition 3: no default spec is invented) **⟶ EXTENDED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 1 — this row now pins the OTHER half of the same question): THE TWO ARGUMENTS ARE SEPARATE DRIVES, and a NON-RECORD `values` is pinned here too.** **(a) the `specOf` half (as filed):** a non-record `specOf` yields zero spec entries ⇒ `applied {}`, `skipped []`, `ok`-irrelevant (no applier call), no throw; **(b) the `values` half (ADDED):** a **non-record `values`** (`null`, `undefined`, `'x'`, `42`, `[]`) with a **WELL-FORMED, non-empty `specOf`** contributes **NO own keys**, so **EVERY spec entry is skipped with `missing-value`** — `applied` is `{}`, `skipped` has **exactly one entry per spec entry** (each `{name: <the spec's own name>, reason: 'missing-value'}`), the partition `I-1` holds, and **nothing throws**; **no `malformed-spec` is produced for `values`** (it is caller data — prohibition 3 — and the module may not impose a shape on it), and **no `not-a-number`/`accessor-threw` is produced** (there is no readable value to have a judgement about). **The deciding clauses are `§2.4` item 3 (`missing-value` is *"the spec's key is absent from `values`"*) read through `§2.5` item 2 (every `values` lookup is an OWN-property lookup, so a non-record has no own key to find) — see the added clause in `§2.4` item 3.** **Both halves may be one row with two drives, and a row asserting `skipped []` for (b) FAILS.** | `[T]` |
| **F-12** | **One bad key NEVER aborts a projection — the throwing accessor, driven in full (`A-2`)** | a spec of FOUR keys, where key 2's value is an accessor that throws, key 3's is a plain finite number and key 4's key is absent; plus the `format: 'number'` and `duplicate-name` variants | **no throw out of `project`**; key 2 is in `skipped` with **`accessor-threw`**; key 1 (before the throw) **and key 3 (after it) are applied** — **the projection did not stop at the throwing key**; key 4 is skipped `missing-value`; **exactly one** skip entry per key and **no duplicate** entry for the throwing key; the **precedence** holds (`malformed-spec`/`duplicate-name` still win for their own entries — §2.4 item 3); the result is **deep-equal to a repeat call** (`I-4`, the accessor throws every time) **⟶ ORDER PINNED 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — `CONTRACT-AMENDED` on the ORDER half only; the as-written clause above is kept visible and no observable of it is withdrawn).** **`§2.4` item 8 (1) decides this row's `skipped` assertions, and the row's three drives are ONE list in ONE order — SPEC-ENTRY order:** **(a)** the PLAIN drive (`k1..k4`, `k2` throwing, `k4` absent) yields exactly `[{'--k2','accessor-threw'}, {'--k4','missing-value'}]` — **spec order, even though `missing-value` precedes `accessor-threw` in the fixed precedence** — so a row asserting `[missing-value, accessor-threw]` (a reason-grouped list) **FAILS**; **(b)** the `format: 'number'` variant yields the **same reason order**; **(c)** the `duplicate-name` variant (`--dup`, `--k2`, `--dup`, `--k4`) yields exactly `['duplicate-name', 'accessor-threw', 'missing-value']` — **the first `--dup` is applied and the THIRD spec entry's duplicate skip sits in the position that entry occupies, BEFORE the throwing key's entry** — so a row that expects the duplicate to be decided "with the other skips" out of spec order **FAILS a row of the same row family** (the incompatibility this pin closes). **The applier-side half is `§2.4` item 8 (2)**: handed either projection, the applier's `ApplyResult.skipped` carries **those same entries in that same relative order** after its own refusals. **A row asserting a REASON-ordered `skipped` for any of the three drives FAILS: the order is the spec entry's, and the reason is only what the entry carries.** | `[T]` |
| **F-13** | **The prototype-shaped key HAZARD, falsifiably (`A-3`)** | **(a)** a spec whose `values` key is `'constructor'`, `'prototype'`, `'toString'`, `'hasOwnProperty'`, `'valueOf'` or `'__proto__'`, with a plain-object `values` that has **no own** property of that name; **(b)** two spec entries both producing `name: 'constructor'`; **(c)** a `specOf` that legitimately carries an **own** key `'__proto__'` | **(a)** each is skipped **`missing-value`** — **never applied from an inherited value** (`Object.prototype.constructor` and friends are **not** the caller's data), and the module's own prototype chain is **never read** as a value source; **(b)** the FIRST is applied and the second is skipped **`duplicate-name`** — the detection set must **not** see an inherited member as "already seen" (a misdiagnosis of either kind is the finding this row exists to catch); **(c)** the own entry is read as its own entry, and the record it yields has **own key `'__proto__'`** with the caller's formatted value. **In every case: `Object.getPrototypeOf(applied) === null`, no prototype of any object is written, `I-1`'s partition holds, and nothing throws.** **Contrast (the negative half): a pre-fix implementation using plain object literals fails this row exactly as ruled in §0A note 3** — `'__proto__'` vanishes from `Object.keys`, the partition breaks, and `'constructor'` is misdiagnosed **⟶ KEY IDENTIFIED 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — CLARIFICATION, not an amendment of what this row asserts: its three drives carry their own key already).** **"(a) a spec whose `values` key is `'constructor'`/…" means THE `specOf` MAP'S OWN KEY** (`§2.4` item 3's key clause `(1)`): the drive is an entry sitting under the key `'constructor'` with a plain-object `values` holding **no own key** `'constructor'`, and a second legitimate drive is the same six names **as `VarSpec.name`** with the entry sitting under an ordinary key (`{k: {name: 'constructor', unit: ''}}` ⇒ **applied**, own key `'constructor'` in `applied`, and **`values[k]` is the lookup** — `M-18`/`M-20`'s shape). **A repairing row must state WHICH of the two drives it takes for `(a)`: the name half is an APPLIED row, and only the lookup-key half is a `missing-value` row.** | `[T]` |
| **F-14** | **A `setProperty` that RE-ENTERS `applyProjection` — results stay CALL-LOCAL (`A-7`)** | a fake sink whose `setProperty` calls `applyProjection(p2, innerSink)` (same or another projection) on the FIRST key, then returns; also the variant where the inner call targets the **SAME** sink | **no throw out of either call**; the **outer** `ApplyResult` reports **exactly its own call's** writes — the inner call's keys are **absent from the outer `applied`** and the inner call's skips **absent from the outer `skipped`** (`I-3`); neither call's `ok`/`skipped` absorbs the other's (`I-10`, `M-15`); **each key of each call is written exactly once per call** (§2.3 item 7); **the outer call's remaining keys are still written after the re-entrant call returns** (its iteration set was fixed at entry); **no guard exists, and neither call is refused/blocked for re-entering** — the interleaving is **at the sink** and is the sink's own choice. **If this row ever produces an outer `ApplyResult` that reports a write its own call did not make, that is a `BLOCKING` finding against `I-3`, not a defect in this clause** (§0A note 4) | `[T]` |
| **F-15** | **The caller's projection is IMMUTABLE across a call — byte-identical after (`A-7`)** | snapshot `p` (deep copy **and** `JSON.stringify`-with-null-prototype-aware comparison, plus `Object.keys(p.applied)` order and `Object.getPrototypeOf`), call `applyProjection(p, sink)` where the sink throws for one key and succeeds for another, then re-snapshot | **`p` is unchanged in every observable respect** — same own keys **in the same order**, same values, same `skipped` entries, same null prototype, and **no new key, no deleted key, no cached marker, no added field**; a **frozen** `p` (`Object.freeze` on the record and on `p` itself) is also **accepted without a throw**; and **a consumer wanting different writes builds a NEW projection** — the row asserts that `project(values', specOf')` is the sanctioned route, and that no supported operation edits `p` in place (`I-14`). **⟶ SNAPSHOT RECIPE REPLACED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 9 — the as-written recipe is kept visible above and is NOT deleted): THE COMPARISON IS FOUR PINNED OBSERVABLES AND NEVER `JSON.stringify`.** **The named as-written method — *"deep copy and `JSON.stringify`-with-null-prototype-aware comparison"* — names NO EXECUTABLE COMPARISON for the object this row is about**: a null-prototype record holding an own `'__proto__'` cannot be round-tripped through `JSON.parse` (`§2.5` item 4: `JSON.stringify` serializes the own `'__proto__'` key as **data**, and re-parsing hands `__proto__` to the **parser**), so the recipe must not be used and **no row may assert equality through a `JSON.stringify`/`JSON.parse` round-trip**. **The FOUR pinned observables, asserted BEFORE and AFTER the call, exactly:** **(i) `Object.keys(p.applied)` — the same own keys IN THE SAME ORDER (asserted as an ordered array, `toEqual`);** **(ii) each value read BY `Object.hasOwn(p.applied, name)` + index — the same string for every name, with **no key added, removed, renamed or reordered** (the dangerous-name case included: an own `'__proto__'` key must still be an own key after the call, and `Object.getPrototypeOf(p.applied)` must still be `null`);** **(iii) `p.skipped` — deep-equal BY VALUE (`toEqual` over the array of `{name, reason}` records, order included);** **(iv) `Object.getPrototypeOf(p.applied) === null` — asserted by IDENTITY against `null` (never by truthiness), for the record before and after (and, when the row drives `M-18`'s shape, for a projection carrying an own `'__proto__'`).** **The comparison is COMPLETED against a FRESH `project(values, specOf)`**: `(i)`–`(iv)` are asserted on the snapshot **and** on a fresh call's result, so `I-4`'s determinism and this row's immutability are both driven from the same four observables. **The frozen-`p` half is SHALLOW and is the HARNESS's** (`§2.5` item 5 (i)): the row freezes `p.applied` and `p` — one level each, not the `skipped` array, no deep freeze — and the module must not throw. **A row that compares the snapshot through `JSON.stringify` FAILS this ruling's recipe** (it is the unexecutable method this item replaces); **`M-19`'s "`JSON.stringify` behaves normally" clause is a GENERAL serialization statement about the returned record and does NOT license this row's comparison** (`M-19` says nothing about a round-trip through `JSON.parse`, which is where the null prototype is destroyed). | `[T]` |
### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here |
| --- | --- | --- |
| **I-1** | `Projection.applied`'s keys and `Projection.skipped`'s names **partition** the spec's key set: no key in both, and every spec entry in exactly one | "Every input yields a write-or-skip decision" (ruling 1), structurally |
| **I-2** | **A key never vanishes between the halves**: `ApplyResult.applied ∪ ApplyResult.skipped` covers every key of `Projection.applied ∪ Projection.skipped` | No silent drop. **⟶ SCOPED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 4): this invariant binds a WELL-FORMED projection** — its domain is `Projection.applied ∪ Projection.skipped`, so it has **nothing to say about a non-record projection** (`M-11`: no keys were decided, so none can vanish) and **nothing to say about a malformed `skipped` LIST** (`F-9`: an entry carrying no decidable reason is dropped, and the drop is stated in that row rather than hidden here — it is not a "vanished key", because it never entered the emitted list). **A malformed SINK, by contrast, decides every key (`F-6`) and is fully inside this invariant's domain.** |
| **I-3** | A key is in `ApplyResult.applied` **iff** `setProperty` was called with it; **`setProperty` is called at most once per key per call** | The write LOG's meaning + "one write per commit" |
| **I-4** | `project` is **referentially deterministic**: two calls with deep-equal arguments return **deep-equal** results | Purity, made falsifiable |
| **I-5** | Neither half retains a reference to an argument: after the call, mutating the caller's `values`/`spec` object or the sink does not change any already-returned result | No store, no aliasing |
| **I-6** | `applyProjection` reads **nothing** from the sink except the callability of `style.setProperty` — it never reads a current value | §2.3 item 5 (blindness) |
| **I-7** | **No function throws for any input** — asserted by a deterministic table (`null`, `undefined`, numbers, strings, arrays, frozen objects, throwing getters, throwing `setProperty`, malformed projections) | The totality contract's boundary |
| **I-8** | Every returned record/array is a **fresh** object; a caller mutating a returned `applied` record cannot change any other result | Anti-aliasing |
| **I-9** | `projected.applied`'s value for an applied key is **always a string**, and **never** contains `NaN`/`Infinity`/`-Infinity` or begins with `'-'` (except a caller's own `unit`/`name` that literally does) | Ruling 2's fail-soft pin, as an invariant. **⟶ NARROWED, SO THE ROW CAN FAIL 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 7 — the as-written clause above is kept visible and is NOT deleted):** **the `'-'`-prefix half is UNFALSIFIABLE as written and is REPLACED by two assertable forms.** *Why:* for **every** value the contract rejects (`-1`, `-Number.MIN_VALUE`) the module produces **no string at all** (`F-5`), so a `'-'`-prefix assertion can only ever fire on a **legitimate** applied value — i.e. only on **the carve-out**, which is the exempt case: the clause **cannot fail for the mutation it names**. **What a row asserts instead, exactly: (1) the EXACT expected string per applied value, from the enumerated table** (`§2.4` item 4's `${value}${unit}` / `String(value)` semantics — `-0` ⇒ `'0'`, `1e21` ⇒ `'1e+21'`, `M-17`'s table, `P-PJ-IM-5`'s drives); **and (2) that `'NaN'`, `'Infinity'` and `'-Infinity'` appear in NO applied value — i.e. no applied value EQUALS one of those three exact string literals, and none of them is a SUBSTRING of an applied value that the caller's own `name`/`unit` did not supply.** **The honest content of the clause is the non-finite half, now stated as (2); the `'-'` half is retired to this annotation and no row may assert a bare `'-'`-prefix ban.** **The carve-out's surviving scope, stated so no reader over-reads it: a leading `'-'` is legitimate ONLY when it comes from the caller's own `unit`/`name` (caller data, prohibition 3) — NEVER from the module's own formatting of a number, because every value whose stringification would begin with `'-'` is rejected by the validity rule of `§2.4` item 3 before any string exists.** |
| **I-10** | `ok === (skipped.length === 0)` for `ApplyResult` | No "ok with skips" state exists. **⟶ WHICH `skipped` IS PINNED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 3): the `skipped` in this expression is the RESULT'S OWN EMITTED LIST — `ApplyResult.skipped` — never the CALLER'S input list** (`Projection.skipped`, which may itself be malformed). **So `F-9`'s all-dropped malformed list yields `ok === true` with `skipped []`**, and a mixed list yields `ok === false`. The alternative reading (`ok` computed from the caller's list) is **rejected because it would make this invariant consult an input the result does not carry, turning a one-expression invariant into a two-source one.** **`M-15`'s call-locality and `I-11`'s reuse clause are unchanged by this pin — every call's `ok` is its OWN call's emitted list.** |
| **I-11** | **A `Projection` is REUSABLE, and reuse is indistinguishable from a first call (`A-11`, 2026-09-27)**: for any projection `p`, `applyProjection(p, s1)` followed by any number of further calls — **to `s1` again or to other sinks, with the same or another projection** — yields, for every call, a result **equivalent to a first call with that value**; **nothing is consumed and no per-projection state exists** (so a second call cannot observe the first); each call's `ApplyResult` is **its own** call's log (`I-3`) with `ok`/`skipped` **call-local** (`I-10`), and each writes **at most once per key per call** (§2.3 item 7) | `A-11`'s ruling, made falsifiable; it **follows from** `A-7` (§0A note 4) and is **consistent with** `I-5` (no retained reference ⇒ nothing to consume) and `I-8` (every returned record fresh ⇒ a result cannot be a cursor) |
| **I-12** | **EVERY caller-supplied name is an OWN key** — in `Projection.applied` and in `ApplyResult.applied`, `name` is an own property for **any** string, including `'__proto__'`, `'constructor'`, `'prototype'`, `'toString'`, `'hasOwnProperty'`, `'valueOf'`; **no key is dropped, renamed or misdiagnosed**, and `I-1`'s partition holds for every such name | `A-3`'s ruling (2026-09-27, §0A note 3): the contract requires **no** CSS-legal name and the unit may **not** invent a name-legality rule, so the total answer is the record's own keys |
| **I-13** | **The returned `applied` records (and every internal key→value map) have NO prototype**: `Object.getPrototypeOf(applied) === null`; **every key lookup over caller data is an OWN-property lookup** (never a prototype-chain read) — for the duplicate-detection set, the `values` lookup, the `specOf` entry lookup and any other map; **`Object.keys(applied)` still yields the pinned deterministic write order** | `A-3`'s ruling, mechanically: one expression that is **TOTAL** over dangerous keys, needs **no new skip reason** and **no name policy**, and is **verifiable by one row** (`F-13`). **Consequences recorded where a consumer meets them** (§2.5 items 3–6: no `hasOwnProperty`, the copy hazard, `readonly` ≠ frozen, the applier's contrasting position) **⟶ LIMIT STATED 2026-09-27 (the `U-PROJ` RED-SET RECONCILIATION pass; appended, never substituted — the invariant above is kept visible and unchanged): *"any INTERNAL key→value map is null-prototype"* is NOT EXTERNALLY OBSERVABLE, so NO row may assert the internal half directly.** **What a row CAN assert is the two externally visible halves: `Object.getPrototypeOf(applied) === null` on the RETURNED records (`Projection.applied` and `ApplyResult.applied`, by identity) and the OWN-PROPERTY READ SEMANTICS over caller data — a plain-object `values` with no own key of that name yields `missing-value` rather than an inherited member, and `'constructor'`/`'toString'`/… are never misdiagnosed as already-seen or as `duplicate-name`.** **The internal half (the duplicate-detection set and every other internal map) is covered BEHAVIOURALLY and only behaviourally — through `F-13` (`F-13` (a)/(b)/(c): the hazard is falsified by the observable outcome, not by inspecting the map) and `P-PJ-IM-2` (the own-key rule driven over the six dangerous names × three host shapes, where an inherited read WOULD change the observable).** **A row asserting the prototype of a map it cannot reach is unfalsifiable and must not be filed; this limit is recorded so a later pass does not re-litigate it.** |
| **I-14** | **The projection is IMMUTABLE INPUT to the applier — and the module holds NO re-entrancy guard**: `applyProjection` never **mutates** the projection, never **caches into** it, and never **re-enters** it to change it; the caller's projection is **observably unchanged** after any call (`F-15`); a consumer wanting different writes builds a **NEW** projection; and **a re-entrant `setProperty`** yields **call-local** behaviour per `I-3`/`I-5`/`I-8`/`I-11` (`F-14`), with **no guard, because a guard would have to be state and the module holds none** (prohibition 4) | `A-7`'s ruling (2026-09-27, §0A note 4): *"skip, treat projection as non-mutable and expect consumers to create new projection if they want changes"*. **A guard is a NEW CONTRACT needing its own gate**, and it would make a nested call refusable for a reason with no `ProjectionSkipReason` member |

**⟶ ADDED 2026-09-27 (the `U-PROJ` `§5.5` RE-DERIVATION pass): how these invariants relate to the
property register (`§5.5.1`), stated so neither layer is read for the other.** The invariants and rows
above are **per-state contract rows a TestWriter derives first**; the register's typed properties are
**quantifications over those same clauses**, executed by enumeration. **Three consequences, each a
rule:** **(1)** the register **adds no contract** — every register row's statement is a clause already
written in `§2`–`§3` (each row names the compensating `§3` rows it stands on), so **no reader may
derive a new behaviour from `§5.5.1` that `§3` does not state**; **(2)** the register **replaces no
`§3` row** and **weakens none** — a `§3` row stays red-able on its own, and a register row's `YES`
cell is **execution DESIGN**, not a measured result (`§5.3` item 10 is where the measured counts
belong); **(3)** where an invariant is **larger than any finite enumeration** — `I-1`'s partition, `I-7`'s
no-throw universal and `I-9`'s numeric bound — the register's row carries the honest **`YES (bounded)`**
marking instead of an implied proof, and it names the `§3` rows that compensate its sample.

### 3.4 The STATIC rows (ADDED 2026-09-27, the `§7a` RULING pass, `§7a.1` item 11 (a)+(b)+(c)) — **the rows `§2.2` prohibitions 1 and 5 cite and never enumerated**

**What this subsection is, and why it exists.** `§2.2`'s prohibition table cited **two rows with no id
anywhere** (*"static source row over the module file"* for prohibition 1; *"plus a static import row"*
for prohibition 5), and `§4.4`'s own note recorded the class as **owed**. **This subsection gives both
rows ids — extending the `R-` sequence already in the repo's tests (`tests/engine-pin-version.test.ts`
carries `R-1`..`R-16`), and adding NO `M-*`/`I-*`/`F-*` id, so the `§3.1`/`§3.2`/`§3.3` id spaces are
untouched and NOTHING is renumbered.** **Every row here is `static`-layer: it reads the UNIT'S OWN
FILES, never the module's runtime behaviour.** **The rows are row TEXT for the TestWriter (this pass
authors no red row — `§4.2` item 1 is the authoring order and the register rides it); their DRIVES are
the TestWriter's, and where a drive needs file reads the harness may use `node:fs` — the prohibition
against `node:fs` binds `src/shared/layout-projection.ts`, never the test file.**

| id | Row (a TestWriter authors this) | Layer |
| --- | --- | --- |
| **`R-17`** | **The anti-evasion vocabulary row (`§2.2` prohibition 1; closes `A-13`'s evasion class).** *Over the MODULE's source (`src/shared/layout-projection.ts`) INCLUDING its comments, and over the unit's own `[T]` fixtures in `tests/layout-projection.test.ts`: no occurrence of `zone`/`pane`/`tab`/`region`/`track`/`isEmpty`/`emptyToken` as vocabulary — checked over a NORMALIZED view of the text in which **string-literal concatenation is joined before scanning** (`'zo' + 'ne'`, a template literal with substituted parts, a token split across lines) **and comments are scanned like code** — with a POSITIVE control that a module carrying the vocabulary in any of those three forms FAILS, and a NEGATIVE control that this unit's own legitimate text (the `ProjectionSkipReason` members, the `'unit'`/`'number'` format tokens, the diagnostic sentences) PASSES.* **The scan's SCOPE is `§7a.1` item 11 (b): THIS SPEC's prose may carry the words (it must, to state the prohibition) because the module never contains this spec's text; the module and the unit's fixtures may not.** **The row is closed against TOKEN ASSEMBLY and COMMENT-CARRYING, and the reason is the architect's `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` ruling (`docs/decisions.md`): a static prohibition satisfiable by splitting a token is NOT satisfied.** **⟶ `CONTRACT-AMENDED` 2026-09-27 (the `U-PROJ` RED-SET REPAIR pass — the row above is KEPT VERBATIM and its PURPOSE is unchanged; what changes is (i) the SCAN'S FILE HALF, which was UNSATISFIABLE as written, and (ii) the addition of a BOUNDARY RULE. The superseded file-wide reading was: *"over the unit's own `[T]` fixtures in `tests/layout-projection.test.ts`"*, i.e. the whole file — **the as-written words are kept visible in this very cell rather than deleted**).** **THE AMENDED ROW TEXT, in the words a TestWriter can now derive a PASSING drive from:** **ROW TEXT (contract, current):** *Over the **MODULE's** source (`src/shared/layout-projection.ts`) — INCLUDING its comments — and over the **unit's own `[T]` fixtures** in `tests/layout-projection.test.ts` that **THIS ROW ITSELF CONTROLS**: **no occurrence, as vocabulary, of `zone`/`pane`/`tab`/`region`/`track`/`isEmpty`/`emptyToken` — checked over a NORMALIZED view of each scanned text in which string-literal concatenation is joined before scanning (`'zo' + 'ne'`, a template literal with substituted parts, a token split across lines), identifiers assembled the same way, and comments scanned like code** — with a POSITIVE control that a text carrying the vocabulary in ANY of those forms FAILS, and a NEGATIVE control that this unit's legitimate text (the `ProjectionSkipReason` members, the `'unit'`/`'number'` format tokens, the diagnostic sentences) PASSES.* **(i) THE BOUNDARY RULE (why the file half must be scoped, and what it may claim). The FILE half is scoped to the fixtures the row OWNS — never the whole file — because the file CANNOT pass a whole-file negative: the vocabulary is carried in the row's own POSITIVE control (`S-12` requires it, so a control-free scan is circular) and in ORDINARY WORDS (the raw half is a substring test with no word boundary: `table`, `stable` and `IMMUTABLE` all contain the three letters `tab`, and a whole-file raw scan fails a file that uses the word `table`). A whole-file negative is therefore not a claim about the module at all — it is a claim about the TEST AUTHOR'S vocabulary budget, which the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` class forbids as a proof. THE ASSERTABLE FILE HALF: the ASSEMBLED view of the fixtures this row controls, MINUS this row's own vocabulary DATA (`VOCAB_FRAGMENTS` and the positive-control fixtures — the data a scan needs and a violation cannot be defined without). THE ASSERTED LIMIT, kept in the row: the row CANNOT prove that no OTHER `[T]` fixture in the file carries a joined spelling, and NO STRONGER FORM IS ASSERTABLE — a check excluding the controls is circular, and a check banning the fragment technique fails the controls `S-12` requires.** **(ii) THE WORD/IDENTIFIER-BOUNDARY RULE (so ordinary words are NOT violations). A hit is a VIOLATION only where the spelling is a BOUNDED occurrence — bounded on both sides by a non-word character or a word boundary in the SCANNED view (`\\b`-equivalent for `zone`/`pane`/`tab`/`region`/`track`; a case-insensitive exact match for the camel spellings `isEmpty`/`emptyToken`) — so `table`, `stable`, `IMMUTABLE`, `isEmptyish`-free ordinary prose and the module's own `Object.create(null)`/`const out` text are NOT hits. A hit is a violation in the RAW view, in the ASSEMBLED view, or in a COMMENT; the boundary rule applies to BOTH views and NEVER licenses an unbounded substring hit. The row's PURPOSE is unchanged and remains fully assertable: NO banned vocabulary in the MODULE, by raw token OR by assembly (never by obfuscation), and no joined spelling in the fixtures the row controls.** **(iii) THE DECIDING CLAUSES, cited:** this row's own PURPOSE text above (read as the module claim), `§2.2` prohibition 1's assertion cell, `§7a.1` item 11 (b)'s scan-scope ruling, `§4.4 S-12` (token assembly and comment-carrying are the violation — which the boundary rule does NOT weaken), and **`§7` item 13 (i)** (the limit this pass makes assertable in the row rather than only in the prose). **ITS DRIVE IS OWED TO THE TESTWRITER**: this pass authors no red row, and the repairing pass re-scopes the file half to the controlled fixtures (or drops it, stating that its own controls are the reason the whole-file negative is unassertable), adds the boundary rule to both views, and keeps the module half exactly as strong as it is today. | **`R-17` — LIMIT AND COVERAGE (as-written, kept from the `U-PROJ` RED-SET RECONCILIATION pass; SUPERSEDED IN PART by the `CONTRACT-AMENDED` block in this cell, which now makes the stated limit ASSERTABLE IN THE ROW).** **⟶ LIMIT AND COVERAGE STATED 2026-09-27 (the `U-PROJ` RED-SET RECONCILIATION pass; appended, never substituted — the row text above is kept visible and unchanged): WHAT THIS ROW CAN PROVE, AND WHAT IT CANNOT.** *(This limit is stated because the row's own second half is a PARTIAL FALSE GREEN if it is read as covering the whole file — the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` class, ONE LAYER UP.)* **(i) WHAT IT PROVES — the MODULE: that the module's text, RAW (comments included) and ASSEMBLED (string-literal concatenation joined, template substitutions scanned in source order, a token split across lines re-joined), contains NO occurrence of the vocabulary as a token. This half is complete for its subject and is the half that can fail for the mutation it names.** **(ii) WHAT IT PROVES — the FILE: only that the file's own ASSEMBLED view carries no joined spelling, GIVEN that the file's own vocabulary DATA is carried as FRAGMENTS (`['zo','ne']`-style pairs) so that the joined token never appears. The row's controls REQUIRE that assembly: the positive control must spell a banned token in each evading form, and the negative control must spell the legitimate vocabulary the contract DOES own — so the file MUST carry those spellings somewhere, and it carries them assembled on purpose.** **(iii) WHAT IT CANNOT PROVE, plainly: that no OTHER `[T]` fixture in `tests/layout-projection.test.ts` carries the banned vocabulary.** **A fixture can satisfy the scan's letter by the very technique the scan exists to catch — carrying the token as fragments, or spelling it inside a template substitution the normalized join does not reassemble — so NO scan over the file's own text distinguishes *"the file carries the token as control DATA"* from *"the file carries the token as a VIOLATION"*, and the scan cannot be pointed at the file's RAW bytes without failing on the controls it needs.** **(iv) A STRONGER FORM IS NOT ASSERTABLE — stated rather than implied: there is NONE available from this row.** **An independent check would have to scan a SECOND corpus that carries no control data, which for a single-file unit means the module alone — i.e. exactly (i), which is why (i) is the whole assertable half. A check that read the file and excluded the controls would be circular (it would have to know where the token is allowed to appear, which is the question it is asked), and a check that banned the fragment technique outright would fail the controls and the negative control the `S-12` closure requires.** **So this row claims COMPLETE coverage of the module and BOUNDED coverage of the file, and no reader may read it as proving that no other fixture in the file carries the vocabulary.** | static |
| **`R-18`** | **The forbidden-ACCESS row (the `[expr]` clause's assertable half, `§7a.1` item 11 (b)).** *No access in the module is ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE* — e.g. `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`, `const w = window; w.addEventListener` — **and no ambient global (`document`, `window`, `globalThis`-derived realm, `process`, `Date`, `Math.random`) is read for a value.** **STATED LIMIT, so the row is not written unassertably: a BLANKET ban on `[expr]` is NOT assertable** and is not claimed — a **locally constructed object's** computed access and ordinary **array indexing** (`actual[index]`, the module's own iteration) carry no banned token and are **deliberately not banned**. **A row that asserts "no bracket notation at all" FAILS this row's own text and is `§4.4 S-13`.** **⟶ LIMIT RESTATED 2026-09-27 (the `U-PROJ` RED-SET RECONCILIATION pass; appended, never substituted — the row text above is kept visible and unchanged): this row's `[expr]` clause is assertable ONLY in the REALM-ROOTED form, exactly as `§4.4 S-13` defines it, and A BLANKET BAN IS EXPRESSLY NOT CLAIMED.** **The assertable form is: no access is rooted in a banned realm token (`document`, `window`, `globalThis`, `self`, `top`, `parent`, `frames`, …) or in an ALIAS of one — `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`, `const w = window; w.addEventListener` — plus the ambient reads the row lists.** **A locally constructed object's computed access and ordinary array indexing (`actual[index]`, the module's own iteration) are DELIBERATELY outside the ban and must not be asserted against: they carry no banned token, and a row that fails them is `S-13`'s class.** **No broader form is claimed here, and no later pass may widen this row to a general `[expr]` prohibition without a new gate.** | static |
| **`R-19`** | **The import-boundary row (`§2.2` prohibition 5 and `§1`'s out-of-scope list).** *`src/shared/layout-projection.ts` imports NOTHING from `src/main/**`, `src/renderer/**`, `electron`, `node:*` (including `node:fs`), any zones/census module, `U-ZONES`/`U-CENSUS`/`U-LISTHOST`/`U-SLOTHOST`, and no sibling mechanism module — and imports nothing at all except (at most) a TYPE-only import from `src/shared/**`.* **Any occurrence is a SCOPE VIOLATION (ruling 5) and FAILS the row.** **This is the falsifiable half prohibition 5 was missing: the as-filed citation (`tests/engine-pin-version.test.ts:174-197`'s 21-member census "must still pass unchanged") passes whether or not this unit adds a seam.** | static |
| **`R-20`** | **The diff-scope row (`§5.1`).** *Only `src/shared/layout-projection.ts` (NEW), `tests/layout-projection.test.ts` (NEW) and this spec (plus the trackers, the SUPERVISOR's pass) are touched by this unit* — in particular **`src/shared/dom-shim.ts` gains NO member** (the `S-2` prohibition; `tests/engine-pin-version.test.ts`'s existing shim row already asserts `setProperty` is absent from `ShimElement.prototype`, and this unit's row restates the negative for this unit's own change set), **`src/main/**` and `src/renderer/**` are untouched**, and **`package.json` gains no dependency and no script** (`devDependencies` stays the five keys, `§5.5.1`). **A changed file outside that list FAILS the row.** | static |
| **`R-21`** | **The five-seam NEGATIVE row (`§2.2` prohibition 5), citing the EXISTING name-complete rows rather than re-authoring them.** *The tool set equals the pinned 21-NAME set and `RpcMethod`'s census stays 21 — a NEW seam fails it BY NAME, not by count.* **These rows ALREADY EXIST and are name-complete:** `tests/engine-pin-version.test.ts`'s `R-15`/`R-15a` (`PINNED_TOOL_SET`/`PINNED` at `:102-160`, the same-set assertion at `:163`, per-name `groupForTool` at `:164-166`) and `R-15b` (the **21**-member `RpcMethod` census at `:174-197`), plus the shim row at `:201-210`. **What this unit's row adds is the EXPLICIT SCOPE: these rows are the seam half, `R-19`/`R-20` are the import/diff half, and the count alone was never the assertion** (`§7a.1` item 11 (c)). | static |

**What these five rows do NOT do.** They add **no `§3` contract behaviour**: each asserts a property of
**this unit's own files**, and none of them may be satisfied by a runtime observation of the module
(the module does not exist yet, and after it does, a `[T]` behavioural green still would not prove a
static absence — `§4.4 S-12`'s class). **They land in the SAME test file as the red set** (`§4.1`,
`§4.2` item 1) and **change no register statement, type, strategy or attempt count** (`§5.5.1`).

### 3.5 The EXISTENCE rows (ADDED 2026-09-27, the `§7a` RULING pass, `§7a.1` item 11 (d)) — **the two claims this spec made about the repo that no row checked**

**What this subsection is, and why it exists.** Two of this spec's own claims are **existence/count
claims about the repository**, and `§7a` item 11 (d) recorded that **neither is checked by any row**:
`§2.1`'s *"**Eight exports**, and nothing else"* and `§7` item 9's *"`docs/skills/designing-pages.md`
**does not exist**"*. **An unglobbable existence claim is unfalsifiable prose** (`§7` item 9's own
words); **these two rows make each falsifiable.**

| id | Row (a TestWriter authors this) | Layer |
| --- | --- | --- |
| **`R-22`** | **The export-census row (`§2.1`).** *`src/shared/layout-projection.ts` exports **exactly the names its own block declares, and nothing else** — asserted by SET EQUALITY over two halves:* **(a) the RUNTIME value exports — exactly `project`, `projectVar`, `applyProjection`, `applyVarsToRoot`** (read from the imported namespace's own keys, filtered to values — `Object.keys(ns)` minus the type-only erasures), with a **positive control** that a namespace carrying a fifth value export FAILS; **(b) the TYPE-ONLY names — exactly `VarValues`, `VarSpec`, `ProjectionSkipReason`, `ProjectionSkip`, `Projection`, `VarWriteSink`, `ApplyResult`** (read as types — a type-only name is not a runtime key, so the row states which half it reads, and the row is a **type-level + runtime pair**, `A-15`'s idiom). **A row that asserts only a COUNT (`=== 8`, `=== 4`) without naming the names FAILS this row's own text — a count is satisfiable by renaming, and `§2.1`'s *"and nothing else"* is a set claim.** **`§2.1`'s as-written "Eight exports" is the FILING's count and is reconciled by this row (its annotation): the block declares eleven exported names — four values + seven types** (`§7a.1` item 11 (d)). | runtime + type-level |
| **`R-23`** | **The absent-page-design row (`§7` item 9).** *`docs/skills/designing-pages.md` DOES NOT EXIST at the time this unit's red set runs* — checked by an `fs.existsSync`-style probe on the repo-relative path (the harness may read the filesystem; the MODULE may not, `R-19`) — **and the row's PASS and FAIL are both meaningful: if the file DOES exist, this row FAILS, and per `§7` item 9's own clause the unit then OWES a test-use-case coverage row in that file's coverage matrix plus an entry in its demo-page index.** **`§7` item 9's paragraph is the contract this row pins; `§7a.1` item 11 (d) is its ruling.** | static |


**⟶ HEADING LEVEL, RECORDED (2026-09-27, the `§5.5` re-derivation pass): this heading is a `###` where
most top-level sections of this file use `##`, and `§3a`/`§3b` sit after `§8`.** **This pass changed
it to `##` and then put the `###` back — a heading LEVEL is a rendering detail, not this pass's to
change**, and the file's section-number sequence is exactly as filed. **No section number moved, no
clause changed, and the `§4.1`..`§4.5` sub-headings are untouched.** **Reported so a later
documentation review does not read the level as drift this pass caused.**

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/layout-projection.test.ts`** — authored **first**,
**RUN**, and its failing set **REPORTED verbatim** before any implementation. Expected red shape:
`Cannot find module '../src/shared/layout-projection.js'` for every row. **There is no host-fix
branch for this unit**: the module does not exist, so the red is purely additive.

### 4.2 Red-set authoring order

1. Write `I-1`..`I-14` (**`I-11`..`I-14` are the 2026-09-27 ruling pack's rows**), `M-1`..`M-22`
   (`M-18`..`M-22` are the ruling pack's), `F-1`, `F-2`, `F-3`, **`F-4A`/`F-4B`** (the split), `F-5`..
   `F-15` (**`F-12`..`F-15` are the ruling pack's**) **in that order**.
   **⟶ ADDED 2026-09-27 (the `U-PROJ` `§5.5` RE-DERIVATION pass): the `§5.5.1` PROPERTY REGISTER rows
   are part of THIS red set — authored in the same file and RUN as part of the red.** They are not a
   separate pass, a separate file or a separate leg: **the file's own register section is authored in
   register order (`P-PJ-IM-1` · `P-PJ-TP-1` · `P-PJ-IM-2` … `P-PJ-IM-8`) after the rows above**, it
   rides **`npm test` (leg 1)** unchanged, and **it needs no new file, no new script, no
   `package.json` change and no dependency** (§5.1's diff scope is untouched; the
   `devDependencies` key set stays the five keys, `package.json:26-31`). **The gate-11 ruling is why
   this item exists**: a code-bearing unit's red set may not be delegated under the recorded zero-row
   exemption, and **this pass replaces that exemption with the register** (§5.5.1).
   **⟶ ADDED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 11): the SEVEN static/existence rows are
   part of this same red set too — authored in the same file, after the register rows: `R-17`, `R-18`,
   `R-19`, `R-20`, `R-21` (`§3.4`) then `R-22`, `R-23` (`§3.5`).** **They are OWED to the TestWriter and
   their TEXT is `§3.4`/`§3.5`; they ride `npm test` (leg 1) unchanged and need no new file, script,
   dependency or `package.json` change, and the harness may read files (`node:fs`-style) while the
   MODULE may not (`R-19`).** **The rows that can be RED before the module exists are `R-19`–`R-21` and
   `R-23` (they read existing paths/tests); `R-17`/`R-18`/`R-22` become evaluable once
   `src/shared/layout-projection.ts` exists — which is why item 2's "plus every static row that can
   already be evaluated" is the clause that governs their RUN time.**
2. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static
   row that can already be evaluated.
3. **Then** implement the least code that makes them green.
4. **Re-run**, record the green. **No row may be edited to reach green**; a row found wrong is
   corrected **in this spec** first, with the old text kept as `SUPERSEDED`.

### 4.3 What the red is NOT

- **Not a census test.** A `computeTrackVars`/`zones`/`revealed` row is **`U-CENSUS`'s** and belongs
  in `docs/specs/census.md`'s red set (wave E). **Its presence in this unit's red set is a scope
  violation** (ruling 1).
- **Not a zone/track test.** Any `zoneId`/`trackProp`/`emptyToken` input is a prohibition-1
  violation.
- **Not a shim change.** The rows drive a **caller-supplied fake sink**; **`setProperty` may not be
  added to `src/shared/dom-shim.ts`** (Layer declaration anchor 2, §1).
- **Not a CSS-parsing test.** `[T]` asserts the **string the module produced**; whether a browser
  accepts it is a `[U]` question and the `[U]` row is optional.
- **Not assembled-app evidence.** Layer declaration anchor 1.

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | A row cannot be falsified on `[T]` | The row moves to §7 as **UNPROVABLE AT THIS LAYER**; it may not be moved to the `[U]` leg silently. |
| **S-2** | A row requires **adding a member to the shim** (e.g. `setProperty`) | **Scope violation** (`H-r5`) — re-write the row against a caller-supplied fake sink. |
| **S-3** | A row is only satisfiable by delegating token formatting to another module (`U-ZONES`/`U-CENSUS`) | **Violates ruling 5** — this unit formats from the caller's `VarSpec` **data**. **Do not add the import.** |
| **S-4** | A row needs a census, a zone key set, or a `revealed` flag | **Violates ruling 1** — that is `U-CENSUS`. Stop and route the row there. |
| **S-5** | A row is only satisfiable by reading the sink's current value ("skip if unchanged") | **Violates §2.3 item 5** — the applier is blind. Re-write the row. |
| **S-6** | A row is only satisfiable by making a skip a **removal write** | **A different contract** — §2.3 item 5. Stop and report; a removal API needs its own gate. |
| **S-7** | A `[T]` row's "the value is valid CSS" claim cannot be made without a browser | The claim is **deleted**; the row asserts the **string**, and the `[U]` row (optional) carries the real-DOM half. |
| **S-8** | The implementation wants to make `unit` optional with a default | **Violates prohibition 3** — `unit` is caller data; `''` is the caller's explicit "no unit". |
| **S-9** | A row (or an implementation) proposes letting a **value-accessor throw propagate** — or proposes folding it into an existing reason (`not-a-number`, `missing-value`) | **Violates the 2026-09-27 ruling (`A-2`/`F-4`, §0A note 2)** — the throwing accessor is caught **per key** and recorded as its **own** member, **`'accessor-threw'`**; **propagating is now a contract violation**, not a deferred implementation choice, and **reusing `not-a-number` misreports** (it conflates *"could not read"* with *"not a number"*). |
| **S-10** | A row (or an implementation) proposes **rejecting, renaming, sanitizing or skipping** a caller-supplied name because it "looks dangerous" (`'__proto__'`, `'constructor'`, `'toString'`, …) — or proposes testing key membership by **presence/truthiness** on a record | **Violates the 2026-09-27 ruling (`A-3`, §0A note 3) and prohibition 3** — names are **caller data**; the record is fixed by **`Object.create(null)`** (`I-12`/`I-13`), **not** by a name-legality policy. And **presence is not the contract**: downstream code must inspect the **skip record** (`Projection.skipped` / `ApplyResult.skipped`) — a key may be present in `values` and still skipped (ruling note 2's operational note). |
| **S-11** | A row (or an implementation) wants the applier to **mutate or cache into** its projection, to **re-derive** it in place, or to add a **re-entrancy guard/flag** | **Violates the 2026-09-27 ruling (`A-7`, §0A note 4) and prohibition 4** — the projection is **immutable input** (`I-14`); a consumer wanting different writes builds a **NEW** projection, and **a guard would be state** (a new contract needing its own gate). |

**⟶ ADDED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 11): the class this table did not name —
A STATIC ROW THAT IS SATISFIED BY EVASION — now HAS its stop conditions, appended as `S-12`..`S-15`
(the sequence extends; NO existing `S-n` id is renumbered and none is re-scoped).**

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-12** | A static row asserts a prohibition by a **token scan** (a word list, a regex over the source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **normalized** view in which string-literal concatenation is joined (`'zo' + 'ne'`, a template literal, a token split across lines) **and it scans COMMENTS as code**. **A row that passes for a module which spells the banned vocabulary in either form is UNFALSIFIED and must not be filed** — the architect's `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` ruling (`docs/decisions.md`): **a static prohibition satisfiable by splitting a token is not satisfied.** The row form is `§3.4 R-17`/`R-18`. |
| **S-13** | A static row bans **`[expr]` computed access outright** (or bans "bracket notation") | **Not assertable — re-scope it.** The ban binds **accesses ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE** (`globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`); a **locally constructed object's** computed access and ordinary **array indexing** (`actual[index]`) carry no banned token and are **deliberately not banned**. The row form is `§3.4 R-18` and its STATED LIMIT is part of the row text. |
| **S-14** | A static row asserts an **absence** by a **COUNT** ("`ALL_TOOLS` stays 21", "`RpcMethod` stays 21", "N exports") | **A count is not an assertion about this unit** — it passes whether or not the change added a seam, and a count is satisfiable by **renaming**. **The row must assert SET EQUALITY AGAINST THE NAMES** (the pinned name set, the declared export names) or be replaced by the **import/diff row** that can actually fail (`§3.4 R-19`/`R-20`, `§3.5 R-22`). The repo's `tests/engine-pin-version.test.ts` `R-15`/`R-15b` are already name-complete; **a count-only row appended for this unit must not be filed.** |
| **S-15** | A row asserts an **existence/absence claim about the repo** (`X does not exist`, `the count of Y is N`) | **The row must be a PROBE, not a restatement**: an `fs.existsSync`-style check on the repo-relative path, or a namespace/type read of the module — **and its FAIL must be meaningful** (state what the unit owes if the probe trips: `§3.5 R-23` owes the page-design coverage row + demo-page entry if the file exists; `§3.5 R-22`'s set equality fails on a ninth value export). **A prose claim with no probe is unfalsifiable and is NOT a row.** |

**⟶ ADDED 2026-09-27 (the `U-PROJ` `§5.5` RE-DERIVATION pass): the class this table does NOT yet name — A
STATIC ROW THAT IS SATISFIED BY EVASION.** `§2.2`'s prohibition table cites two rows that **were not
enumerated anywhere** (*"static source row over the module file"* for prohibition 1; *"plus a static
import row"* for prohibition 5), and `§1` item 3's *"There is **no** third function, no state, no
cache, no observer, no DOM query, and no vocabulary"* plus `§2.1`'s *"**Eight exports**, and nothing
else"* are **counts/existences whose rows this pass's predecessor found absent**. **A token-scan row in
this class is satisfiable without doing the real thing** — the spelled-out evasion (`'zo'+'ne'`, a
template literal, the vocabulary placed in a comment rather than code) was recorded as **`§7a` item 11
(b)**. **⟶ DISCHARGED 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 11 (a)–(d); the paragraph above
is the PREVIOUS pass's state and is kept visible): the class now has BOTH halves — the stop conditions
`S-12`..`S-15` above (APPENDED, no renumbering) AND the enumerated row ids `R-17`..`R-21` (`§3.4`, the
static class) and `R-22`/`R-23` (`§3.5`, the existence class). The three rows this paragraph called
unenumerated (`A-13`'s probe, the prohibition-1 token scan, the prohibition-5 import row) are `R-17`,
`R-19` and `R-20`; the two trivial existence rows are `R-22` and `R-23`; and `R-18`/`R-21` carry the
`[expr]` limit and the seam-census scope. **The FIVE static rows (`R-17`..`R-21`) and the TWO existence
rows (`R-22`/`R-23`) are ALL OWED to the TestWriter** (this pass authors no red row): their row TEXT is
written in `§3.4`/`§3.5` and their drives are the TestWriter's (`§4.2` item 1's authoring order is
unchanged). **The three rows the previous pass called unenumerated are exactly `R-17` (prohibition 1's
token scan — the same row `A-13`'s probe asks for), `R-19` (prohibition 5's import row) and `R-20` (the
diff-scope row).**

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-D plan**
(§0 ruling 8), (b) the **wave-D order** — `U-MOUNTGUARD`, `U-LISTHOST`, `U-SLOTHOST` before it,
(c) this spec to exist (**done: this filing**), and (d) a **TestWriter to have RUN and REPORTED the
red set** (`AGENTS.md` item 9). Its `## OPEN` row (D4) stays `BLOCKED` until all four hold — **and its
row carries the permanent scoping clause: `U-CENSUS` is separate.**

**⟶ UPDATED 2026-09-27 (the `U-PROJ` `§5.5` RE-DERIVATION pass; the four-condition clause above is
KEPT VISIBLE and three of its four conditions are now SATISFIED).** The gate reads, today:
**(a) SATISFIED** — the architect gave the wave-D go-ahead (2026-09-27); **(b) SATISFIED and SPENT** —
`U-MOUNTGUARD`, `U-LISTHOST` and `U-SLOTHOST` are **all three `DONE`** (the ledger's third-to-sixth
`DONE` rows; the last two are `docs/next-steps.md`'s `## DONE — U-LISTHOST` / `## DONE — U-SLOTHOST`,
cited by section), so **the counts are `6 DONE / 14 open` and `U-PROJ` (`D4`) is the LAST wave-D unit
and the NEXT in the order**; **(c) SATISFIED** — this spec exists and is filed; **(d) THE ONLY REMAINING
CONDITION** — a TestWriter must **RUN and REPORT** the red set, **which this pass makes possible by
replacing the gate-11 blocker**: `§5.5`'s recorded zero-row exemption is **superseded by the typed
register at `§5.5.1`** (`docs/decisions.md`'s ACTIVE row `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`;
`docs/pending.md` §G's `U-PROJ` row, which records the re-derivation as **BLOCKING for that unit's red
set only** — **discharging that tracker cell is the supervisor's, and this pass does not edit the
trackers**). **Its `## OPEN` row (D4) therefore moves from `BLOCKED` to red-oweable at the supervisor's
reconciliation**, and **the permanent scoping clause stands unchanged: `U-CENSUS` is separate.**

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/layout-projection.ts` | **NEW** — the exports of §2.1 (**⟶ RECONCILED 2026-09-27, the `§7a` RULING pass: read this as *the names `§2.1`'s block declares* — **four value exports + seven type declarations** — and NOT as the as-written "eight"; `§3.5 R-22` is the row that pins the SET, `§7a.1` item 11 (d)) | always |
| 2 | `tests/layout-projection.test.ts` | **NEW** — the red set (§4.2) | always |
| 3 | `docs/specs/projection.md` | this spec — §3a/§3b findings as they land | always |
| 4 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` | the unit's own tracker rows (the supervisor's DONE row) | the pass that produces them |

**Outside the scope, always:** `src/renderer/**` · `src/main/**` · `src/shared/dom-shim.ts` ·
`src/shared/types.ts` · **`docs/specs/census.md`'s subject matter** · every **existing** test file ·
`package.json` / `package-lock.json` · `scripts/**` · `node_modules/**` ·
`../Preempt-Providence/**`. **This unit changes no existing file except this spec and the trackers.**

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]** envelope/pure layer | the red (§4) **and** the green. **A green here is envelope/pure-layer evidence, NEVER assembled-app evidence**; for this unit it also proves **nothing** about CSS validity (anchor 2) |
| 2 | typecheck | `npm run typecheck` | **[H]** | the `VarSpec`/`Projection`/`ApplyResult` types are part of the contract |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles (`package.json:10`, read) |

**OPTIONAL `[U]` row — ONE measured custom-property value, with its named preconditions.** The row:
*a caller-specified custom property, written by `applyProjection` to a **real** element in the
renderer, read back and observed as that value.* **Preconditions, all named and none assumed:**
(a) the `ui` leg exists and is green for the same built tree; (b) `npm run divergence` is green for
that tree; (c) the observation route is the landed leg's **preferred measurement channel** — a
provident **handler body** loaded through the **EXISTING** `provident.load`/`code.load`, reading
`getBoundingClientRect`/`getComputedStyle` in the real renderer and **writing the value into graph
content** so it returns over the **existing** `get_rendered_html` (`REAL-DOM-UI-GATE-LEG`'s
preferred channel, `docs/decisions.md:65`, read); and (d) the leg's fallbacks
(`webContents.executeJavaScript`, CDP) are **leg-only and may never become MCP tools**. **If the row is
not taken, no §3 row is weakened** — and **no row may claim a rendered-geometry property**: the
measurement is **one value**, exactly as `U-REALDOM-BOOT`'s `R2` row words it (`width > 0 && height >
0` plus a non-`''` `getComputedStyle` value, both read back through graph content).

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, in this order:

1. **Unit + wave + status**: `U-PROJ` · wave **D** · `DONE` or the honest non-DONE status.
2. **The scope-boundary confirmation, explicitly**: *"the projection half only; `computeTrackVars`
   is absent, and `U-CENSUS` remains a separate wave-E unit."* **A DONE row that does not state this
   is a review finding** — it is the unit's defining constraint (ruling 1).
3. **The purity/totality confirmation, explicitly**: *"`project` is pure (no environment read);
   `applyProjection` is total (one decision per key, never a throw, never a partial write for a key
   reported applied)."*
4. **The code/test delta**: the module + the test file, named.
5. **The red, per §4.1** — the failing set as RUN and REPORTED, verbatim.
6. **The three legs' results with layer labels**, plus the explicit sentence that the node-suite
   green is envelope/pure-layer evidence and **not** assembled-app evidence.
7. **The `[U]` row's status**: taken (with its **one** measured value) or **not taken** (with the
   reason).
8. **The adversarial pass's findings** (§3a) and the **blind-greens + doc-review records**
   (`AGENTS.md` items 10a/10d, RCA-4/6).
9. **The tracker reconciliation** (`AGENTS.md` items 3/6).
10. **The property register's execution record** (`§5.5.1` — **⟶ ADDED 2026-09-27, the `§5.5`
    re-derivation pass under the gate-11 ruling**; the nine items above are the FILING-TIME shape and
    are kept visible): per register row, the **id · type · attempts-run · held · broken** counts,
    **each row's strategy id** (`S-PJ-*`), the **pinned seed** (`20260927`), its **step form** and the
    **pool/index discipline** the row used, **the stop-after-5-consecutive-failures status**
    (`not triggered`, or `triggered at row …`), the **total attempts reported against the `≤400` cap**
    with **every row's count reported against the `≤100` per-row cap**, and the **explicit sentence
    that the three bounded rows — `P-PJ-IM-1`, `P-PJ-TP-1`, `P-PJ-IM-5` — are `YES (bounded)` and are
    NOT proofs of the unbounded universals** they state. **A DONE row that reports the register as
    "executed" without these per-row counts and strategy ids is a review finding** — the register's
    `YES` cells are **execution DESIGN** (`§5.5.1`), so the counts are the only executed-layer
    evidence the ledger can carry, and a **read-only PBT audit may not accept this spec's table
    alone** as that evidence: it reads the counts here and in the ledger, and **the TestWriter's
    tables in `tests/layout-projection.test.ts`.**

**⟶ RECORDED 2026-09-27: the `§5.3 → §5.5` numbering gap (there is NO `§5.4`) is DELIBERATE and needs
NO fix — it is recorded here by the `U-LISTHOST` documentation review (`AGENTS.md` item 10d / RCA‑6;
record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑12**).** `§5.3` is the
DONE-row shape and `§5.5` is the property register; **NO clause is missing** — the section simply does
not exist. **Renumbering is FORBIDDEN for citation stability** (the hazard `docs/pending.md`'s §G row
names: `§5.3`/`§5.5` are cited many times across the trackers and the unit's own text). The same skip
exists in `docs/specs/listhost.md` and `docs/specs/slothost.md`; **this note renumbers nothing and
changes no clause of this spec.** **⟶ CONFIRMED AND EXTENDED 2026-09-27 (the `§5.5` re-derivation
pass): the gap is UNCHANGED and no `§5.4` is created by this pass either.** `§5.5.0` (added this
pass) is a **sub-heading of `§5.5`**, not a new member of the `5.x` sequence — it sorts before
`§5.5.1`, which is its sibling form — so **the `5.3 → 5.5` skip still reads exactly as recorded
above and nothing was renumbered.** The same discharge was made by **both sibling specs** in their own
`§5.3` notes (`docs/specs/listhost.md` `§5.3`, `docs/specs/slothost.md` `§5.3`).

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness) — **2026-09-27: the zero-row exemption is SUPERSEDED; the register is RE-DERIVED below**

> **SUPERSEDED AS-WRITTEN, KEPT VISIBLE (annotate-never-rewrite): the heading above replaced
> `## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**`.**
> **Date: 2026-09-27. Reason: the architect's ruling enforcing the mandatory PBT gate (gate 11) for
> CODE-BEARING units** — recorded in `docs/decisions.md` as the ACTIVE row
> **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`**, whose follow-ups live in `docs/pending.md` **§G** (its
> `U-PROJ` row records **this** re-derivation as **BLOCKING for this unit's red set only**, and
> **discharging that tracker cell is the supervisor's pass, not this one**). The zero-row exemption
> is **restricted** to genuinely invariant-free / doc-only / config-only / non-JS units, and **this
> unit is code-bearing** — a pure `src/shared/` projection + total applier with **eight exports**, a
> red set and (as of this pass) a test file that carries a property layer — so `§5.5` must carry a
> real **typed register**: **`≤8` rows** typed `P-IM`/`P-SM`/`P-TP`, **never** an `F-` row, **never**
> a `§6`/`FS-n` citation as a register row. **The exemption text and its four-cell table are kept
> byte-identical below** (`§5.5.0`, under a heading of its own), followed by **`§5.5.1`, the
> re-derived register that SUPERSEDES them.** **The pilots this register models are
> `docs/specs/listhost.md` `§5.5.1`** (7 typed rows, `S-LH-*` ids, exhaustive `S₃`+`S₄` tables, a
> pinned-seed hand-rolled 32-bit LCG, `168` attempts) **and `docs/specs/slothost.md` `§5.5.1`** (6
> typed rows, `S-SH-*` ids, a `20`-shape pool with a seeded LCG binding and a cycling method table,
> `155` attempts) — **the type algebra, the strategy-id discipline, the pinned seed and the caps are
> the SHARED form, and NO row, pool, table or id is copied from either** (a second authority over a
> landed register is a finding). **The `§5.3 → §5.5` gap with no `§5.4` is DELIBERATE and
> non-renumbered** — recorded at the end of `§5.3`, and **`§5.5.0` is a sub-heading of `§5.5`, not a
> new member of the `5.x` sequence** — so this re-derivation renumbers nothing.

> **⟶ SUPERSEDED 2026-09-27 (the architect's gate-11 ruling for code-bearing units; the text is kept
> visible, not rewritten). This `§5.5.0` block is the exemption AS FILED — it is no longer the
> contract's register. What survives of it is its FACTUAL half only: this repo still has no PBT
> harness, and no dependency is added by this unit. What is refuted below, with in-repo precedent, is
> its CONCLUSIVE half — *"therefore a register cannot be executed here"*: the ruling's decisive point
> is that `docs/specs/engine-pin.md` `§5.5` executed **7 of 8** of ITS register rows with **plain
> deterministic vitest tables and no new devDependency** (`package.json:26-31`, re-read this pass:
> still the five keys `@types/node`, `electron`, `esbuild`, `typescript`, `vitest`) — e.g. its
> `P-IM-2` repeated-call idempotence over a fixed key set and its `P-TP-2` enumerated booleans. **A
> register is therefore executable HERE without a harness**, and this unit's quantifications are
> finite or seed-pinnable exactly as the pilots' were. `§5.5.1` is the re-derived register; the
> replacement of each cell below is itemized in its change summary.**

### 5.5.0 THE SUPERSEDED ZERO-ROW EXEMPTION — kept verbatim (the block `§5.5.0` names)

**⟶ HEADING ADDED 2026-09-27 (the `§5.5` re-derivation pass).** The superseded exemption had **no
heading of its own** — it lived as the body of `## 5.5`, identified only by prose. **This heading
renumbers NOTHING**: `5.5.0` sorts before `5.5.1`, it is the file's own convention for this block
(`### 5.5.1` is the sibling form, and both sibling specs' `§5.5.0` headings are the same device),
and `## 5.5`'s id is untouched. It also does **not** collide with the `§5.3 → §5.5` numbering-gap
note: that gap is the **absent `§5.4`**, which stays absent. **Everything below this line is the
exemption AS FILED, kept byte-identical** — the four-cell table and the four numbered honest
statements are unedited, and each carries its own dated superseded marker rather than being deleted.
**One editorial note, so the block is not misread: the exemption's own second paragraph contains the
words *"This spec therefore records a ZERO-ROW register"*, and those words are the FILING's claim,
superseded by `§5.5.1`; they are left standing as the record.**

**⟶ THE FOUR CELLS OF THE TABLE BELOW ARE SUPERSEDED AS-WRITTEN AND ARE KEPT VERBATIM (2026-09-27,
the gate-11 ruling for code-bearing units). Each is answered by `§5.5.1`, and the answer is stated
here so the superseded table is never read as the current register:**

| Superseded cell | Answered by `§5.5.1` how |
| --- | --- |
| cell 1 (*"FOUR genuine quantifications … and this unit is the strongest PBT candidate in wave D … §3 samples each with fixed tables"*) | **RESOLVED BY ROWS**: the partition quantification becomes **`P-PJ-IM-1`**; totality becomes **`P-PJ-TP-1`**; the numeric bound becomes **`P-PJ-IM-5`**; the no-false-`applied`/write-or-skip quantification becomes **`P-PJ-IM-6`**. The ruled classes the cell names as *"extra INSTANCES of the same ones"* become **rows in their own right** — the throwing accessor ⇒ **`P-PJ-IM-3`**; the null-prototype/own-key rule ⇒ **`P-PJ-IM-2`**; reusability + re-entrancy ⇒ **`P-PJ-IM-8`** — and one row is this register's own beyond them (**`P-PJ-IM-7`**, the per-key read-throw totality). |
| cell 2 (*"No, and not for a reason of effort … adding `fast-check` is a `devDependencies` change"*) | **REFUTED AS A CONCLUSION**: no harness IS added, and the register is nonetheless executed by the deterministic strategy discipline `docs/specs/engine-pin.md` §5.5 established (**7 of 8** rows, plain vitest tables, **no new devDependency**) — the same discipline both pilots' `§5.5.1` used. |
| cell 3 (*"Yes in principle … The blocker is the harness, not the layer"*) | **HOLDS AND IS NOW USED** — every register row is `[T]` work over injectable arguments (a fake sink is the applier's whole environment), and `§5.5.1` executes it there. The **Layer declaration's fourth anchor** records the same. |
| cell 4 (*"A strategy id here is a repeat-drive label, not a property id"*) | **SUPERSEDED**: strategy ids here are **`S-PJ-*` property-execution ids, one per register row** (the pilots' `S-LH-*`/`S-SH-*` convention). |


**`H-r4` obliges an explicit zero-row/typed-PBT decision per unit. Stated exactly as
`docs/specs/engine-drift.md` §5.5 and `docs/specs/engine-pin.md` §5.5 state it: THIS REPO HAS NO PBT
HARNESS.** `package.json`'s `devDependencies` key set is `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **five keys** (`package.json:26-31`, read this pass) — with **no
`fast-check`, no `hypothesis`, and no property runner**. **This spec therefore records a ZERO-ROW
register**, and here is why that is the honest answer rather than a dodge:

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **FOUR genuine quantifications (the count is UNCHANGED by the 2026-09-27 ruling pack — the four new ruled classes are extra INSTANCES of the same ones), and this unit is the strongest PBT candidate in wave D:** (i) *"for **every** unusable input shape, `project` returns a `Projection` and never throws"* — **now explicitly including a throwing accessor (`A-2`/`F-4B`/`F-12`) and a re-entering sink (`A-7`/`F-14`)**; (ii) *"for **every** spec/value pair, the key appears in exactly one of `applied`/`skipped`"* (`I-1`) — **now explicitly including the prototype-shaped names `'__proto__'`/`'constructor'`/`'toString'` (`A-3`/`I-12`/`F-13`)**; (iii) *"for **every** non-finite or negative number, the output never contains `NaN`/`Infinity`/a negative"* (`I-9`); (iv) *"for **every** sink whose `setProperty` throws, no key reported applied is a key whose write failed"* (`I-3`) — **now explicitly including a re-entrant inner call (`F-14`) and a reused projection (`I-11`/`M-21`)**. §3 samples each with fixed tables. **None is proven by its sample**, and this spec says so — (iii) and (iv) are exactly the classes a generator would serve, and **they stay unproven**. |
| Could this unit execute them **as properties**? | **No, and not for a reason of effort:** the harness does not exist, and **adding `fast-check` is a `devDependencies` change** — outside §5.1's diff scope and a gate of its own. **This unit may not smuggle a property runner in.** |
| Do the layers permit a property run here? | **Yes in principle** for (i)…(iv): they are pure `[T]` claims over injectable arguments, and a fake sink makes (iv) trivially drivable. **The blocker is the harness, not the layer** — stated rather than hidden behind a layer claim. **The one claim that stays layer-blocked is the `[U]` one** (a real custom-property value). |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their drive by the unit's own ids (`I-7` = the no-throw drive, `I-1` = the partition drive, **`F-4A`/`F-4B`/`F-12`** = the numeric-boundary **and** accessor-throw drives, **`F-13`** = the prototype-shaped-key drive, **`F-14`/`F-15`** = the re-entrancy/immutability drives, `F-5` = the sign-boundary drive, `F-7`/`F-8` = the write-failure drive). **A strategy id here is a repeat-drive label, not a property id.** *(**⟶ CORRECTED 2026-09-27: the pre-ruling row named `F-4`/`F-5` for the numeric drive; `F-4` is now the SPLIT `F-4A`/`F-4B`, so this drive names both halves and the ruling pack's `F-12`/`F-13`/`F-14`/`F-15`.**)* |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** **⟶ SUPERSEDED 2026-09-27: the register count of THIS unit is `8` rows, ALL executed by design — see `§5.5.1`.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled.**
2. **The four quantified claims are recorded as `NOT EXECUTED — no PBT harness`**, with their
   compensating rows named: `I-7` + `F-1`..`F-15` (totality — **the range endpoint moved from `F-11`
   to `F-15` on 2026-09-27**, the ruling pack's `F-12`..`F-15` being part of the same no-throw drive),
   `I-1` (partition — **now driven also over the prototype-shaped names by `F-13`**), `F-4A`/`F-4B`/
   `F-12`/`F-5`/`I-9` (the numeric bound **and the accessor-throw class**), `I-3` + `F-7`/`F-8` (the
   no-false-applied drive — **now extended by `F-14`'s re-entrancy and `M-21`'s reuse**).
3. **No `fast-check` and no generator is added by this unit.**
4. **Register change summary: none** — nothing to reconcile with `docs/specs/engine-pin.md` §5.5's
   register (its 8 rows: 4 `P-IM` + 3 `P-SM` + 2 `P-TP`; 7 executed deterministically, `P-TP-1`
   `NOT EXECUTED`). **`P-SM-2` (the pin unit's value-space property) is the nearest relative and is
   NOT extended or duplicated here** — it is that unit's row, and copying it would be a second
1. **No row of this unit may be reported as "executed" if it was sampled.**
   — **⟶ KEPT AS A RULE AND HONOURED (2026-09-27, the `§5.5` re-derivation pass):** this is exactly
   why every `§5.5.1` row is executed **by enumeration over a finite, pinned input set**, and why the
   three rows whose property text is larger than their enumeration (`P-PJ-IM-1`, `P-PJ-TP-1`,
   `P-PJ-IM-5`) carry the honest **`YES (bounded)`** marking instead of an implied proof.
2. **The four quantified claims are recorded as `NOT EXECUTED — no PBT harness`**, with their
   compensating rows named: `I-7` + `F-1`..`F-15` (totality — **the range endpoint moved from `F-11`
   to `F-15` on 2026-09-27**, the ruling pack's `F-12`..`F-15` being part of the same no-throw drive),
   `I-1` (partition — **now driven also over the prototype-shaped names by `F-13`**), `F-4A`/`F-4B`/
   `F-12`/`F-5`/`I-9` (the numeric bound **and the accessor-throw class**), `I-3` + `F-7`/`F-8` (the
   no-false-applied drive — **now extended by `F-14`'s re-entrancy and `M-21`'s reuse**).
   — **⟶ SUPERSEDED 2026-09-27 (kept visible): `NOT EXECUTED — no PBT harness` is NO LONGER the
   status of these four claims.** Each is a register row executed by enumeration, with its **strategy
   id** and its **compensating `§3` rows** named in `§5.5.1`: partition ⇒ **`P-PJ-IM-1`** (compensating
   `I-1`, `M-18`/`M-19`, `F-2`, `F-13`); totality ⇒ **`P-PJ-TP-1`** (compensating `I-7`, `F-1`..`F-15`);
   the numeric bound ⇒ **`P-PJ-IM-5`** (compensating `I-9`, `F-4A`, `F-5`, `M-16`, `M-17`); the
   no-false-`applied`/write-or-skip claim ⇒ **`P-PJ-IM-6`** (compensating `I-3`, `F-7`/`F-8`, `F-14`,
   `M-5`, `M-21`). **The compensating-row citations are NOT withdrawn** — a `§3` row stays the
   per-state contract row a TestWriter derives first, and `§5.5.1` item 4 states the same.
3. **No `fast-check` and no generator is added by this unit.**
   — **⟶ KEPT AND SATISFIED (2026-09-27):** no `fast-check` and no property-runner library is added.
   `§5.5.1`'s one generator is a **hand-rolled 32-bit LCG written in the plain TypeScript of this
   unit's own test file, pinned to the literal seed `20260927`** — its constants are the test's own
   literals, **not a dependency** — and `package.json`'s `devDependencies` key set is unchanged (the
   five keys, `package.json:26-31`). **The generator is not a library; the sentence above is honoured
   as written.**
4. **Register change summary: none** — nothing to reconcile with `docs/specs/engine-pin.md` §5.5's
   register (its 8 rows: 4 `P-IM` + 3 `P-SM` + 2 `P-TP`; 7 executed deterministically, `P-TP-1`
   `NOT EXECUTED`). **`P-SM-2` (the pin unit's value-space property) is the nearest relative and is
   NOT extended or duplicated here** — it is that unit's row, and copying it would be a second
   authority over a landed register.
   — **⟶ SUPERSEDED 2026-09-27 (kept visible): the register change summary is `§5.5.1`'s, not
   "none", and it reconciles against that same register by REUSING its type algebra
   (`P-IM`/`P-SM`/`P-TP`) and its strategy-id discipline — without copying a single row of it and so
   without creating a second authority over it.** **One arithmetic correction to the parenthetical
   above, which this spec inherited from an earlier layer: `engine-pin.md` §5.5's split is `3` live
   `P-IM` (`P-IM-1`, `P-IM-2`, `P-IM-4`) + `3` `P-SM` + `2` `P-TP` = `8` rows**, because the former
   `P-IM-3` was **FOLDED** into `P-IM-4`; the `4 P-IM` form sums to `9` against a stated total of `8`
   and was corrected at that file's own count line (`docs/pending.md` §G records the same correction
   as FIXED). **This spec's superseded `§5.5` cells inherited the wrong `4/3/2` form from
   `engine-pin.md`; the correction is recorded here rather than silently rewritten in
   `engine-pin.md`, which is not this pass's file.** *(Both wave-D pilots' `§5.5.1` change summaries
   carry the same correction, so the three wave-D specs agree.)*

### 5.5.1 THE REGISTER (2026-09-27, re-derived under the gate-11 ruling) — **8 rows, ALL executed by design**

**What this section is, in one sentence.** The exemption `§5.5.0` above is replaced by a **typed
register of `8` rows** whose four previously-sampled quantifications (`§5.5.0`'s cell 1: the partition
property, the no-throw property, the numeric bound and the no-false-`applied`/write-or-skip property)
are **executed here as quantifications over finite, pinned enumerations** — **hand-rolled and
deterministic, with no new dependency, no `fast-check`, no `hypothesis` and no property runner** (the
`devDependencies` key set is unchanged: `package.json:26-31`, re-read this pass — the five keys
`@types/node`, `electron`, `esbuild`, `typescript`, `vitest`). **The four ruled classes the 2026-09-27
ruling pack added are rows here too, where they are genuine quantifications** — the throwing accessor
(**`P-PJ-IM-3`**), the null-prototype/own-key rule (**`P-PJ-IM-2`**), reusability + re-entrancy
(**`P-PJ-IM-8`**) — plus **one row this register's own beyond them** (**`P-PJ-IM-7`**, the per-key
read-throw totality, which `§5.5.0`'s cell 1 did not name). Type algebra is `docs/specs/engine-pin.md`
§5.5's: **`P-IM`** = invariant · **`P-SM`** = state-machine · **`P-TP`** = totality.

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-PJ-*`** (`PJ` = this
unit, the **proj**ection) — the analogue of `P-LH-*` for `U-LISTHOST` and `P-SH-*` for `U-SLOTHOST` —
so a register row is never mistaken for a `§3` row and never for either pilot's. **No id of this
register reuses, extends or restates an `M-*`/`I-*`/`F-*` id of §3** (those stay **compensating
sample rows**, cited per row below), and **no `F-` register row is invented** — `F-1`..`F-15` stay
§3.2 table rows. **No `§6`/`FS-n` citation appears as a register row.** **The strategy-id prefix is
`S-PJ-*`, one per row** (`S-PJ-DECISION-1` · `S-PJ-POOL-1` · `S-PJ-OWNKEY-1` · `S-PJ-ACCESSOR-1` ·
`S-PJ-NUMERIC-1` · `S-PJ-WRITELOG-1` · `S-PJ-THROW-1` · `S-PJ-REUSE-1`), and the one **pinned-seed
generator** carries its own id, **`S-PJ-SEED-1`**.

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/layout-projection.test.ts`,
   §4.1/§5.1) — the file the red set already owes, and the file the register **rides as part of the
   red** (§4.2 item 1). **No row of this register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain
   TypeScript inside the test file.** The only generator in this register is **`S-PJ-SEED-1`**'s (used
   by `P-PJ-TP-1` and `P-PJ-IM-2`), and it is pinned to **literals in the test file itself** — a
   hand-rolled 32-bit LCG, the **literal** form a contract so the run is reproducible, and **the
   constants are the test's own choice, not a dependency**: **`state₀ = 20260927`**;
   **`stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`**; **each draw applies ONE LCG step and the
   resulting state selects the pool member — `index = stateₙ₊₁ mod pool.length`** — so **one pool draw
   consumes exactly ONE LCG step**. **Stated so no TestWriter reads a two-step form into it: there is
   NO `next(k)` scaling helper in this register** (a pool draw is an index, never a bounded integer —
   the `slothost` `§5.5.1` form, not the `listhost` one), and **`pool.length` participates in NO
   binding rule**: it is an input to one modular reduction, so a change to the pool would move which
   member a draw lands on (recomputable arithmetic), never the step form, the draw count or the
   attempt count. **No `Math.random`, no wall-clock seed, no shrinking, no adaptive input search.**
3. **Caps, uniform for the whole register:** **≤100 attempts per row, ≤400 attempts in total**, rows
   evaluated sequentially in register order, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's
   remaining attempts are abandoned and no further row starts). The DONE ledger records, per row,
   **attempts-run · held · broken · stopped-early**, plus the **pinned seed** and the strategy id
   (§5.3 item 10).
4. **Sample rows are the `§3` rows this register compensates, never replaced by it.** A register row
   **proves its quantification by enumeration**; the `§3` rows remain the per-state contract rows a
   TestWriter derives first, and **no `§3` row is weakened, widened or re-scoped by the register**.
   **⟶ CONFIRMED UNDER THE FOUR 2026-09-27 RED-SET REPAIR PINS (the `U-PROJ` RED-SET REPAIR pass):
   the register is UNTOUCHED by that pass** — **no statement, type, strategy id, attempt term or the
   `231` total changes, no row is added and none is re-pinned.** **Three of the four pins are already
   what the register's own drives do** (`P-PJ-IM-2`'s own-key shape **is** the key rule's read — its
   `6 × 3 + 4` drives look a value up under the `specOf` key and assert the NAME's own key in
   `applied`; `P-PJ-IM-3`'s accessor variants **are** the throwing-accessor trigger's shape; and no
   register row drives a `values[name]` lookup, a function-value `'accessor-threw'` or an unordered
   skip list), **and the fourth (`R-17`'s scan scope) is a `§3.4` STATIC row that no register row
   compensates** — so **the register's honesty item 5 boundary is unchanged: a register row may be read
   as resolving the half `§7a.1` rules, and these four pins land on the `§3` rows the register cites,
   not on the register itself.**
5. **No row may be reported as executed if it was sampled** — `§5.5.0`'s honesty anchor (item 1) is
   **KEPT and honoured**: every row here is `YES` or `YES (bounded)` by **enumeration over a FINITE,
   pinned input set**, and each row's cell states that input set exactly. **`3` of the `8` rows carry
   the honest `YES (bounded)` marking** (`P-PJ-IM-1`, `P-PJ-TP-1`, `P-PJ-IM-5`) because in each the
   **property text is larger than its enumeration**; the other `5` rows are `YES` over a fully
   enumerated domain that the row's statement matches exactly. **No row is marked `NOT EXECUTED`.**
6. **The register's own bounded-pool boundary, named:** `S-PJ-SEED-1`'s pool is a **finite list of
   `20` input shapes** (enumerated in `P-PJ-TP-1`'s cell), and it is a **SUBSET of the input space
   this contract pins** — so its silence about any shape it does not list is a **stated boundary, not
   an unrecorded omission**. **The pool contains NO shape whose caller-supplied accessor throws
   through a path `F-4B` does not already rule** (the throwing-accessor drives are `P-PJ-IM-3`'s and
   `P-PJ-IM-7`'s fixed tables, deliberately, so no pool draw is ambiguous), and **no dependency,
   `Symbol` key or Proxy shape is added to the pool by this pass.**

| ID | Type | Property | Executed? | Compensating sample rows (§3) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-PJ-IM-1`** *(the PARTITION quantification `§5.5.0` left unproven — required row (ii))* | `P-IM` invariant | **For EVERY spec entry — a well-formed one, a malformed one, a duplicated `name`, an absent value, a throwing accessor, a non-finite number, a negative number, a caller-supplied `'__proto__'` name — the projection makes EXACTLY ONE decision: the entry contributes a key to `Projection.applied` OR an entry to `Projection.skipped`, and NEVER both and NEVER neither** (`I-1`); **each skipped key carries exactly ONE reason, and each applied name appears at most once.** | **YES (bounded — the property text says "EVERY spec entry" while the drive enumerates the `23` decision classes below; the exhaustive claim is over the enumerated classes, which is the whole domain THIS spec's `§2.4`/`§3` pins, and nothing outside it is claimed)** | `I-1`, `I-2`, `M-6`, `M-18`, `F-1`, `F-2`, `F-3`, `F-4A`, `F-4B`, `F-11`, `F-13` | `S-PJ-DECISION-1` | **Exhaustive over a FIXED `23`-drive decision table** (literal spec/value pairs — **no generator, no library**), one `project` call per attempt, driven in fixed order. The `19` spec-shaped classes: **(1)** one spec entry with a finite non-negative value (`M-1`); **(2)** omitted `format` (`M-2`); **(3)** `format: 'number'` (`M-3`); **(4)** `unit: ''` (`M-4`); **(5)** value `0` (`M-16`); **(6)** a `'__proto__'` NAME (`M-18`); **(7)** an absent key (`F-3`); **(8)** a non-record `specOf` ⇒ zero entries and both records empty (`F-11`); **(9)** a malformed spec entry (`F-1`); **(10)** two specs naming one `--dup` (`F-2`); **(11)** a string value; **(12)** a boolean; **(13)** `null` (present); **(14)** `NaN`; **(15)** `+Infinity`; **(16)** `-Infinity`; **(17)** `-1`; **(18)** `-0`; **(19)** a `'constructor'`/`'toString'`/`'hasOwnProperty'`/`'valueOf'`/`'prototype'` name driven with a plain-object `values` holding NO own key of that name (`F-13`); **plus the `4` ruled-class drives**: **(20)** an own accessor that throws (`F-4B`/`F-12`); **(21)** the same accessor with the throwing key in the SECOND position; **(22)** a duplicate `'constructor'` name pair (`F-13` (b): FIRST applied, second `duplicate-name`); **(23)** a `specOf` carrying an own `'__proto__'` entry (`F-13` (c)). **Per attempt assert**: the key is in `Object.keys(p.applied)` **XOR** it appears in `p.skipped` (`Object.hasOwn(p.applied, name)` for membership — never `p.applied.hasOwnProperty`, which does not exist, `M-19`); the skip entry's reason is the single expected member; `p.skipped` has no duplicate entry for that key; and `Object.getPrototypeOf(p.applied) === null`. |
| **`P-PJ-TP-1`** *(the TOTALITY / no-throw quantification `§5.5.0` left unproven — required row (i))* | `P-TP` totality | **For EVERY input shape in the pinned `20`-shape pool below, BOTH halves are total: `project(values, specOf)` returns a `Projection` and NEVER throws, and `applyProjection(projection, sink)` returns an `ApplyResult` and NEVER throws** — each call returns a valid result shape (`Projection` ⇒ `applied` a record, `skipped` an array; `ApplyResult` ⇒ `applied` a record, `skipped` an array, `ok === (skipped.length === 0)`), **the projection's `applied`/`skipped` partition still holds, and no call leaves a value a later call cannot read** (`I-7`). | **YES (bounded — the property text says "EVERY input shape" while the pool holds `20`; the universal is NOT proven, and no reader may read this row as its proof)** | `I-7`, `I-4`, `I-10`, `M-9`, `M-11`, `M-12`, `M-13`, `F-1`, `F-5`, `F-6`..`F-11`, `F-15` | `S-PJ-POOL-1` | **`60` pinned-seed draws** (`S-PJ-SEED-1`: `state₀ = 20260927`; one LCG step per draw; `index = stateₙ₊₁ mod 20`), one draw = one attempt, driven in draw order. **Each draw drives the drawn shape on BOTH halves**: as `values`/`specOf` for `project` **and** — for the `sink` axis — a `null`/absent, a `{style:{}}` (no callable `setProperty`), a throwing-`setProperty`, a counting and a recording fake sink, chosen by the **bound method `HALVES[d mod 2]`** and the **sink `SINKS[d mod 5]`** where `d` is the draw's ordinal (the cycling-binding discipline `slothost` `§5.5.1` landed) — so **both halves and all five sink shapes are covered inside the `60` attempts** and the attempt count stays `60`. **The pool's `20` DISTINCT input values, each counted once** (a shape exercised on a second axis is the SAME member) — **⟶ RECONCILED WITH `F-11(b)` 2026-09-27 (the `U-PROJ` RED-SET RECONCILIATION pass, `§7a.1` item 1's own direction; the as-filed cell is kept visible above and neither its statement, its strategy, its `60` attempts nor its pool is re-pinned): WHAT THIS ROW ASSERTS FOR THE POOL'S NON-RECORD-`values` MEMBERS (`1`–`5`) IS BOTH HALVES, AND THE TWO SENTENCES THAT READ AS MUTUALLY EXCLUSIVE NOW SAY THE SAME THING.** **This row asserts for `1`–`5` BOTH (i) the RESULT SHAPE with totality — no throw, `applied` a record, `skipped` an array, `ApplyResult.ok === (skipped.length === 0)`, the `applied`/`skipped` partition holding, and every otherwise-well-formed spec entry carrying its own key in `applied` or its own entry in `skipped` — AND (ii) the pinned RESULT, which is the SAME pinned result the `§3` layer states: `applied` is `{}` and `skipped` is NON-EMPTY, holding exactly one entry per spec entry, each carrying the reason `'missing-value'`** (`§3.2 F-11`'s `values` half (b), the clause `§7a.1` item 1 added). **There is no tension left to read: *"the RESULT SHAPE ONLY"* was never a claim that these members yield NO skips — a zero-skip reading was never on the table, because a non-record `values` owns no key for any spec entry, so `§2.4` item 3 read through `§2.5` item 2 makes EVERY entry `missing-value`; what *"RESULT SHAPE ONLY"* correctly forbids is inventing a DIFFERENT reason, or a `malformed-spec`/`not-a-number`/`accessor-threw` reason, for a shape whose value cannot even be read.** **The REASON'S AUTHORITY is `§3` and not this register row** (`§7a.1` item 1's own ruling: the pool members *"keep asserting the RESULT SHAPE ONLY … the reason is pinned on the `§3` layer"*) — **so a TestWriter drives these members for shape + totality + partition here, and derives the exact reason from `F-11`'s row text; a row that asserts an EMPTY `skipped` for members `1`–`5`, or a reason other than `missing-value`, FAILS both cells.** **Neither cell is re-pinned by this reconciliation: this row's statement, type, `S-PJ-POOL-1` strategy id, `60`-draw count and `20`-member pool are unchanged, and `F-11`'s text is unchanged.** **(1)** `null` as `values`; **(2)** `undefined`; **(3)** a string; **(4)** a number; **(5)** an array; **(6)** a frozen `values` object (`M-9`); **(7)** a frozen nested spec object (`M-9`); **(8)** a `values` object bearing an own accessor that throws (`F-4B`); **(9)** a `values` proxy-free getter-bearing plain object; **(10)** a non-record `specOf` (`F-1`/`F-11`); **(11)** a `null` projection argument (`M-11`); **(12)** a `42` projection argument (`M-11`); **(13)** a `'nope'` projection argument (`M-11`); **(14)** a hand-built `{applied:{…}, skipped:[]}` projection (`M-13`); **(15)** a projection with an empty `applied` and empty `skipped` (`M-12`); **(16)** a projection whose `skipped` is `'nope'` (`F-9`); **(17)** a projection whose `skipped` is `[null]` (`F-9`); **(18)** a projection whose `applied` value is `12` and one whose value is `null` (the `F-10` pair, driven as one member's two sub-drives in fixed order); **(19)** a 3-key spec with a `NaN` value and a `-1` value; **(20)** a 3-key spec with two keys naming the SAME `--dup`. **Per attempt assert** no throw out of either call, the returned shapes above, `ok === (skipped.length === 0)`, every refused/skipped reason ∈ the EIGHT declared `ProjectionSkipReason` members, and — for the `project` half — `Object.getPrototypeOf(applied) === null`. |
| **`P-PJ-IM-2`** *(the NULL-PROTOTYPE / OWN-KEY rule `A-3` ruled — required row)* | `P-IM` invariant | **For EVERY caller-supplied name — including `'__proto__'`, `'constructor'`, `'prototype'`, `'toString'`, `'hasOwnProperty'` and `'valueOf'` — the name is an OWN property of the returned `applied` record; `Object.getPrototypeOf(applied) === null` for EVERY returned `applied` record, and NO caller-supplied name is ever dropped, renamed, sanitized or misdiagnosed as `duplicate-name`** (`I-12`/`I-13`); every lookup over caller data is an **own-property** lookup, so a plain-object `values` with no own key of that name yields `missing-value` (never an inherited function) and the module's own prototype is never written. | **YES** | `M-18`, `M-19`, `M-20`, `F-2`, `F-13`, `§2.5` items 1–2 | `S-PJ-OWNKEY-1` | **`22` attempts**, driven in fixed order: **`6` fixed dangerous names** (`'__proto__'`, `'constructor'`, `'prototype'`, `'toString'`, `'hasOwnProperty'`, `'valueOf'`) × **`3` host shapes** — (a) the name as a `VarSpec.name` with a plain `values` that DOES own the key under the spec's key, (b) the same name with a plain-object `values` that does **NOT** own it (`missing-value`, `F-13` (a)), (c) two spec entries BOTH naming it (`F-2`/`F-13` (b): the first applied, the second `duplicate-name`) — is `6 × 3 = 18` attempts; **plus `4` fixed shapes**, one each: a `specOf` carrying an own `'__proto__'` entry read as its own entry (`F-13` (c)); an OWN-key-only `values` built with `Object.defineProperty`; an ordinary-name control projection (`'--ok'`) asserting the same null prototype (`M-19`); and the `'__proto__'` projection re-driven against a **recording fake sink** (`M-20`: `setProperty` receives the name **verbatim as a string** and the applier holds no name guard). **Per attempt assert** `Object.getPrototypeOf(applied) === null`, `Object.hasOwn(applied, name) === true` for the applied case, the key present in `Object.keys(applied)` in spec order, the skip reason where a skip is expected, and **that no prototype of any object was written** (asserted through the record's own `Object.getPrototypeOf(applied) === null` plus a snapshot of the caller's `values`/`specOf` prototypes — never by asserting anything about `Object.prototype` itself). |
| **`P-PJ-IM-3`** *(the THROWING-ACCESSOR rule `A-2`/`F-4B` ruled — the ruled class as a row)* | `P-IM` invariant | **For EVERY one bad key among several — an own accessor of `values` that throws on read — the key is SKIPPED with `'accessor-threw'` and the run NEVER aborts: the keys decided BEFORE it and the keys decided AFTER it are still decided normally, the good keys still appear in `applied`, exactly ONE skip entry names the throwing key, and `project` throws NOTHING** (`F-4B`/`F-12`). | **YES** | `F-4B`, `F-12`, `F-4A`, `M-1`, `I-7`, `§2.4` item 3 | `S-PJ-ACCESSOR-1` | **`36` attempts** = **`4`-key spec shapes** (keys `k1..k4`, one finite value each) × **`3` accessor variants** × **`4` positions of the throwing key**: the variants are **(a)** an own accessor that always throws, **(b)** an own accessor that throws only on its SECOND read (the memoization trap — the row asserts the read happens once, so `(b)` behaves as `(a)`), **(c)** a `frozen` `values` object carrying the same throwing own accessor (`M-9` + `F-4B`); the positions are `k1` (first), `k2`, `k3`, `k4` (last), and the remaining three keys' dispositions are fixed per position as (i) all three others finite and applied, (ii) one other key ABSENT (`missing-value`, `F-3` — the precedence control), (iii) one other key `NaN` (`not-a-number`, `F-4A` — the precedence control that `accessor-threw` does NOT take) — **`3` variants × `4` positions × `3` dispositions = `36`.** **Per attempt assert** no throw; the throwing key in `skipped` with `'accessor-threw'`; **exactly one** skip entry for it; every other key's expected decision (applied vs its own reason) — i.e. **the run did not stop at the throwing key**; and `p` deep-equal to a repeat call (the accessor throws every time — `I-4`). |
| **`P-PJ-IM-5`** *(the NUMERIC-BOUND quantification `§5.5.0` left unproven — required row (iii))* | `P-IM` invariant | **For EVERY non-finite or negative number, or non-number value, NO such value reaches `Projection.applied`: `applied` carries a STRING for every applied key, `applied` NEVER contains `NaN`/`Infinity`/`-Infinity`, and no applied value is a number the caller supplied that the contract's validity rule (`§2.4` item 3) would reject** (`I-9`); every rejected input lands in `skipped` with its own reason (`not-a-number` for a read non-finite value, `negative` for a finite negative one — and `-0` is NEITHER). | **YES (bounded — the property text quantifies over EVERY number while the drive enumerates a fixed `26`-value table; the enumeration is the whole value space `§2.4` item 3 names, and nothing larger is claimed)** | `I-9`, `F-4A` (its `NaN` half is class `(14)` of the decision row and the `NaN` table entry here), `F-5` (classes `(17)`/`(18)`, and the negative/`-0` table entries), `M-16`, `M-17`, `§2.4` item 3 | `S-PJ-NUMERIC-1` | **`52` attempts** = the table's **`26` entries × `2` format drives** (`'unit'` — the documented default, and `'number'`), driven in fixed order; **the `26`**: the values, driven in fixed order, are `NaN` · `+Infinity` · `-Infinity` · `-1` · `-Number.MIN_VALUE` · `-0` · `0` · `Number.MIN_VALUE` · `Number.MAX_VALUE` · `1e21` · `1e-21` · `0.1 + 0.2` (the float-printing control) · `'12'` · `true` · `false` · `null` · `undefined` (present) · `{}` · `[]` · a `BigInt` · a `Symbol` · a function · a **finite negative** with `unit: ''` · a **finite non-negative** with `unit: ''` · `-0` re-driven with an explicit `format: 'number'` (the `-0` × format quadrant) · and `0` re-driven with an explicit `format: 'number'` (the `0` × format quadrant). **Per attempt assert**: for the applied cases the value is a **string** and equals the EXACT expected string (`String(value) + unit` semantics: `-0` ⇒ `'0'`, `1e21` ⇒ `'1e+21'`, `M-17`) — **asserted by exact literal, never by stripping a unit and re-parsing** (see `§7a` item 7); for the skipped cases the reason is exactly `not-a-number` / `negative`, with `-0` **applied as `'0'` and NOT `negative`** (`F-5`); and **`'NaN'`, `'Infinity'`, `'-Infinity'` appear in NO `applied` value** — **the assertion is on the module-produced value and NOT on a `'-'`-prefix test** (`§3.3 I-9`'s `'-'`-prefix carve-out is report item `§7a` item 7). |
| **`P-PJ-IM-6`** *(the NO-FALSE-`applied` / WRITE-OR-SKIP quantification `§5.5.0` left unproven — required row (iv))* | `P-IM` invariant | **For every key of a WELL-FORMED projection, `applyProjection` produces exactly one write-or-skip decision: a key is in `ApplyResult.applied` IFF `setProperty` was called with it, `setProperty` is called AT MOST ONCE per key per call, and a key whose `setProperty` threw is in `skipped` with `write-refused` and ABSENT from `applied`** (`I-3`, `I-2`, `§2.3` items 1–3) — **so no key reported applied is a key whose write failed, and no key vanishes between the halves.** **Stated boundary: the rule binds a WELL-FORMED projection.** A `null`/`'nope'`/`42` projection is `M-11`'s total no-op (nothing to decide ⇒ both records empty, `§7a` item 4), and `F-10`'s non-string `applied` value is the coercion case (`§7a` item 2: `M-13` vs `F-10`) — **neither is a false `applied` row here.** | **YES** | `I-2`, `I-3`, `M-5`, `M-21`, `M-22`, `F-7`, `F-8`, `F-10`, `F-14`, `§2.3` items 2/7 | `S-PJ-WRITELOG-1` | **`16` attempts**, driven in fixed order: **(a)** a **`4`-key write log** (a counting + recording fake sink, `K = 4`) asserting `r.applied` deep-equals `p.applied`, the key ORDER equals `Object.keys(p.applied)`, `setProperty` was called exactly `K` times (once per key — `M-5`), and `r.ok === true` — **`4` attempts, one per key position**; **(b)** the **same `4`-key projection against `4` failing sink shapes**, `4` attempts: throw-on-key-1, throw-on-key-2-only (`F-7`: key 2 `write-refused` and absent from `applied`, keys 1/3/4 applied, `ok === false`, the run did NOT abort), throw-on-every-key (`F-8`), and an unusable sink (`F-6`: **no write attempted**, every key `sink-unusable`, `applied` `{}`, `ok === false`) — **one attempt per sink shape, each counting the sink's calls and diffing `applied` against the call log**; **(c)** the **unusable-sink sweep over the `5` shapes** `null` · `undefined` · `42` · `{style:{}}` · `{style:{setProperty: 42}}`, `5` attempts, asserting zero writes in a recording sink where one is present; **(d)** **`3` re-entrant-sink attempts**: an inner `applyProjection` fired from the FIRST key, from the LAST key, and from a key whose write throws — each asserting the outer `applied` reports exactly its own call's writes (the inner call's keys absent from the outer record and the inner call's skips absent from the outer `skipped` — `F-14`), the outer call's remaining keys still written after the re-entrant return, and **one write per key per call**. |
| **`P-PJ-IM-7`** *(THIS register's own beyond the four required quantifications — the per-key read-throw totality the exemption's cell 1 did not name)* | `P-IM` invariant | **For ANY spec set containing an accessor that throws — including one where EVERY key throws — `project` is TOTAL: no throw escapes, EVERY key receives its own recorded decision, and the throwing keys are ALL recorded with `'accessor-threw'` while non-throwing keys keep their own decisions** (`I-7` + `F-12`) — **the per-key catch is not a first-key bail-out.** | **YES** | `F-12`, `F-4B`, `I-7`, `I-1`, `§2.4` item 2 | `S-PJ-THROW-1` | **`12` attempts**, driven in fixed order = **`3` table rows × `4` drives**: the three table rows are **(1)** all `4` keys throwing, **(2)** keys `1`/`3` throwing with `2`/`4` finite (interleaved), **(3)** keys `2`/`4` throwing with `1`/`3` finite (the complement of (2)); each row is driven **`4` times in fixed order**: (i) the plain drive, (ii) the same with `format: 'number'` on every spec, (iii) the same with two specs sharing a `name` (so `duplicate-name` still wins for the second — the precedence control, `§2.4` item 3), (iv) the same with a `frozen` `values` object. **Per attempt assert** no throw; the skip set equals the throwing-key set exactly (one entry each, reason `'accessor-threw'`); the applied set equals the finite-key set exactly; and `p` deep-equal to a repeat call. |
| **`P-PJ-IM-8`** *(the REUSABILITY+RE-ENTRANCY rule `A-11`/`A-7` ruled — the ruled classes as a row)* | `P-IM` invariant | **For EVERY call with the same projection — to the same sink again, to another sink, or from INSIDE a re-entrant `setProperty` — the call is EQUIVALENT TO A FIRST CALL WITH THAT VALUE: each call's `ApplyResult` is its OWN call's log (`ok`/`skipped` call-local), each writes EXACTLY ONE `setProperty` call per applied key PER CALL, and the projection is OBSERVABLY UNCHANGED and UNCONSUMED — no per-projection state, no consumption, no memo, no cached marker, no re-entrancy guard and no re-entrant refusal** (`I-11`, `I-14`, `I-5`, `I-8`, `F-14`, `F-15`). | **YES** | `I-11`, `I-14`, `M-14`, `M-21`, `M-22`, `F-14`, `F-15`, `§2.3` items 1/7/8 | `S-PJ-REUSE-1` | **`10` attempts**, driven in fixed order: **(1)** `K`-key projection (K = 3) × sinks `A`,`A` (the same sink twice) — the second `ApplyResult` deep-equals the first, the call log holds `2K` writes, one per key per call (`M-22`); **(2)** the same projection × sinks `A`,`B` (`M-21`); **(3)** a `3`-call sequence `A`,`B`,`A`; **(4)** the same projection driven via `applyVarsToRoot` twice, asserting `M-14`'s function identity **and** the same reuse behaviour; **(5)** a projection with an empty `applied` reused twice; **(6)** a projection whose `skipped` carries `write-refused` entries reused twice (the skip list is re-propagated unchanged each call); **(7)** an inner `applyProjection` fired from the FIRST key with the SAME projection (`F-14`); **(8)** the inner call targeting the SAME sink (`F-14`); **(9)** an inner call with a DIFFERENT projection (`F-14`); **(10)** a **frozen** projection (`Object.freeze` on the record and on the projection) driven once, accepted without a throw. **Per attempt assert**, after EVERY call: `p` is unchanged in every observable respect — the same own keys in the same order (`Object.keys`), the same values, the same `skipped` entries, `Object.getPrototypeOf(p.applied) === null` (asserted directly, **never through `JSON.stringify`**, which cannot round-trip a null-prototype record holding an own `'__proto__'` — `§7a` item 5) — and **no new key, no deleted key, no added field and no cached marker**; each `ApplyResult` is a FRESH object (`I-8`) and neither absorbs the other's keys (`I-3`); and the per-key write count is **one per key per call** at each sink. |


**⟶ THE REGISTER'S HONESTY BLOCK — what is NOT proven here (stated so no reader over-reads a `YES`).**

1. **Three rows carry the honest bounded marking and it is not a formality.** `P-PJ-IM-1`'s
   statement quantifies over **every** spec entry while its table drives `23` classes; `P-PJ-TP-1`'s
   statement quantifies over **every** input shape while its pool holds `20`; `P-PJ-IM-5`'s statement
   quantifies over **every** number while its table holds `26`. **None of the three is a proof of its
   unbounded universal**, and a DONE row that reports any of them as one is a review finding.
2. **`P-PJ-TP-1`'s pool is a SUBSET of the input space, by construction.** It holds `20` shapes and
   the register names the boundary (strategy-discipline item 6): **a shape whose caller-supplied
   accessor throws through a path `F-4B` does not already rule is NOT in the pool**, and neither is a
   `Symbol`-KEYED `values`, a `Proxy`-shaped sink or a hostile `Symbol.toPrimitive`. **Those
   boundaries are stated rather than silently relied on**, and none of them is a gap this register
   claims to close.
3. **`P-PJ-IM-1`'s enumeration is the decision space THIS spec pins, not a larger one.** Its `23`
   classes are the classes `§2.4`/`§3` name; **an implementation that invents a ninth
   `ProjectionSkipReason` member would FAIL the row's "the reason is the single expected member"
   assertion** (which is the point — `§4.4 S-9`/`S-10` forbid inventing one), **but a class this spec
   never contemplated would not be enumerated by it.** The row is an enumeration over a stated domain,
   never a proof about an unstated one.
4. **`P-PJ-IM-6`'s statement binds a WELL-FORMED projection only** — the boundary is in the cell.
   `M-11` (`null`/`'nope'`/`42`) and `F-10` (a non-string `applied` value) are the two shapes the
   write-or-skip universal deliberately does not cover, and **the reason is reported, not papered
   over** (`§7a` items 4/10).
5. **No register row resolves an ambiguity.** Where a `§3` clause is under-specified, the rows above
   assert **only the half the clause decides**, and the undecidable half is recorded in **`§7a`**
   with its owner — never smuggled into a row. **⟶ SUPERSEDED ON ONE HALF 2026-09-27 (the `§7a` RULING
   pass; the clause above is kept visible and is NOT deleted): the ambiguities are no longer undecided —
   `§7a.1` rules all `11` of them (`0` OPEN QUESTIONS), so a register row **MAY** now be read as
   resolving the half it previously declined to drive, because the ruling is CONTRACT TEXT and is
   visible in the `§3` row it amends.** **What this does NOT license, and what is unchanged: (a) NO
   register ROW is added by the ruling pass** — the `8` `P-PJ-*` rows, their id kinds, their statements,
   their `S-PJ-*` strategy ids, their per-row attempt terms and the **`231`** total arithmetic are all
   exactly as `§5.5.1` writes them; **(b) no row's `YES`/`YES (bounded)` marking changes** (the three
   bounded rows stay bounded — the rulings do not enlarge any enumeration); **(c) the register still
   adds no contract of its own** (honesty item 4 above stands: a `§3` row remains the red-able contract
   row, and the register's `YES` is execution DESIGN until the red run executes it — `§5.3` item 10).
   **Two places where the boundary moved, named so a reader can check them: `P-PJ-IM-6`'s stated
   boundary is CONFIRMED (`F-10` as the coercion case, `M-11` as the no-op — `§7a.1` items 2 and 4), and
   `P-PJ-IM-8`'s per-attempt assertion block is CONFIRMED as the pinned four-observable form
   (`§7a.1` item 9) — in both, the ROW's text already said the half the ruling fixes, so neither is
   re-pinned.**

**Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES (one term per register
row, counted from the tables this section writes).**

| Row | Attempts | What counts as one attempt | Its terms |
| --- | --- | --- | --- |
| `P-PJ-IM-1` | **23** | one `project` call over one decision class | `23` fixed decision classes |
| `P-PJ-TP-1` | **60** | one pinned-seed draw, driven on both halves | `60` draws over the `20`-shape pool (3 full cycles of the pool) |
| `P-PJ-IM-2` | **22** | one dangerous-name × host-shape drive | `6` names × `3` host shapes = `18`; `+` `4` fixed shapes |
| `P-PJ-IM-3` | **36** | one throwing-accessor drive | `3` variants × `4` positions × `3` neighbour dispositions |
| `P-PJ-IM-5` | **52** | one value × format drive | `26` table entries × `2` format drives |
| `P-PJ-IM-6` | **16** | one write-log / sink-shape drive, or one re-entrancy drive | `4` (write log, one per key) `+` `4` (failing sink shapes) `+` `5` (unusable-sink sweep) `+` `3` (re-entrant) |
| `P-PJ-IM-7` | **12** | one table row × drive | `3` table rows × `4` drives |
| `P-PJ-IM-8` | **10** | one reuse/re-entrancy shape | `10` fixed shapes |
| **TOTAL** | **`231`** | — | **`231 ≤ 400` (the register total cap); the per-row maximum is `60` (`P-PJ-TP-1`) `≤ 100`**. **⟶ CORRECTED 2026-09-27 (the `U-PROJ` RED-SET RECONCILIATION pass, SPEC TEXT ONLY; the wrong form is kept visible inside this very cell rather than edited away — the as-written third cell read *"**`239 ≤ 400`** (the register total cap)"* while the second cell read `231`, so the row contradicted itself):** **the correction is DERIVED, not repinned — the eight terms THIS BLOCK ITSELF lists (`23` + `60` + `22` + `36` + `52` + `16` + `12` + `10`) sum to `231`, and the one-line restatement below states those same eight terms, so `239` was a mis-sum of the block's own terms and never an eleventh term.** **REASON, named per `RCA-8(c)`'s annotate-never-rewrite convention: the TestWriter's `PRE-2` row (`tests/layout-projection.test.ts`, this unit's 2026-09-27 red set) asserts each of the eight STATED terms AND their DERIVED sum (`231`), and deliberately does NOT assert a stated total of `239` green — a register whose arithmetic contradicts itself cannot be read as both its terms and one total, and the half a row can falsify is the terms.** **NO per-row count moves and NO row's strategy description changes:** `23`/`60`/`22`/`36`/`52`/`16`/`12`/`10` were each checked against that row's OWN description in the table above and all eight agree with it; **the `≤100`/row and `≤400` total caps, the `8`-row count and the pinned seed `20260927` are all unchanged.** |

**Attempt arithmetic, one line: `23` (`P-PJ-IM-1`) + `60` (`P-PJ-TP-1`) + `22` (`P-PJ-IM-2`) + `36`
(`P-PJ-IM-3`) + `52` (`P-PJ-IM-5`) + `16` (`P-PJ-IM-6`) + `12` (`P-PJ-IM-7`) + `10` (`P-PJ-IM-8`) =
`231` attempts**, inside the `≤400` total cap with every row inside the `≤100` per-row cap (the
largest is `60`). **How the counting works, so the numbers are checkable rather than asserted: one
"attempt" = one exercised DRIVE of one register row** — one `project` call for the decision row, one
pinned-seed draw for the totality row, one name × shape for the own-key row, one value × format for
the numeric row, one sink/sequence shape for the write-log and reuse rows. **Setup is NOT counted**:
the fixture construction, the fake-sink builders, the spec-map literals and the `Object.freeze` of a
harness object a row needs before its first drive are **precondition, not attempt**, and that is
stated because it is the only place the arithmetic could be read two ways. **The `20`-shape pool is
counted in BOTH rows that draw from it on purpose** — `P-PJ-TP-1` and `P-PJ-IM-2` drive the same pool
as their OWN attempts, so **no reader may "deduplicate" the total**; `231` is the register's total as
the caps count it. **A DONE row reporting any total other than the one the test file's tables
produce is a review finding**: the ledger's numbers are read against the test file's tables, exactly
as `§5.3` item 10 requires.

**Register count: `8` rows — `7` `P-IM` (`P-PJ-IM-1`, `P-PJ-IM-2`, `P-PJ-IM-3`, `P-PJ-IM-5`,
`P-PJ-IM-6`, `P-PJ-IM-7`, `P-PJ-IM-8`) + `0` `P-SM` + `1` `P-TP` (`P-PJ-TP-1`) = `8` rows, ALL
executed by design; `0` marked `NOT EXECUTED`.** **The
gap in the numeric sequence (`P-PJ-IM-4` does not exist) is DELIBERATE and non-renumbered** (the
`§5.3 → §5.5` convention this file already states): `P-PJ-IM-4` was **considered and FOLDED** — its
candidate property (the applier never mutates its projection, `I-14`/`F-15`) is **asserted inside
`P-PJ-IM-8`**, and **its would-be strategy `S-PJ-IMMUTABLE-1` was NOT created**, so no id is reserved
and no attempt is counted for it. **The three rows marked `YES (bounded)` are `P-PJ-IM-1`,
`P-PJ-TP-1` and `P-PJ-IM-5`** (honesty item 1); **the five marked `YES` are `P-PJ-IM-2`,
`P-PJ-IM-3`, `P-PJ-IM-6`, `P-PJ-IM-7`, `P-PJ-IM-8`.**

**The ninth candidate, named with its reason (required by the register's own ≤8-row cap).** The
candidate was **`P-PJ-IM-4` — "the applier never mutates its projection and the projection is
observably byte-identical after a call"** (`I-14`, `F-15`). **It is NOT a row here: it is FOLDED
into `P-PJ-IM-8`**, whose statement carries the immutability half in its own words and whose
`10`-shape strategy asserts it after every call. **Its compensating `§3` rows are `F-15` (the
byte-identical drive), `I-14` (the invariant), `M-21`/`M-22` (reuse, which cannot hold if anything is
consumed) and `§2.3` item 8 (the write-or-skip rule's immutability sentence).** **The reason it is
folded rather than kept:** the cap is `≤8` rows and the four required quantifications plus the three
ruled classes already fill seven of them; the immutability half is **only observable through the
same calls the reuse row drives** (a call, then a second call, then a snapshot comparison), so a
ninth row would drive the same inputs twice and report the count twice for one claim.

**Register change summary (what this pass did to `§5.5`).** `§5.5.0`'s **zero-row exemption is
SUPERSEDED** by this register (date + reason in the two banners above, and its heading preserved).
Its **cell 1** (*"FOUR genuine quantifications … §3 samples each with fixed tables … None is proven by
its sample"*) is **resolved by rows**: partition ⇒ **`P-PJ-IM-1`**; totality ⇒ **`P-PJ-TP-1`**; the
numeric bound ⇒ **`P-PJ-IM-5`**; the no-false-`applied`/write-or-skip claim ⇒ **`P-PJ-IM-6`** — with
the four ruled classes it calls *"extra INSTANCES of the same ones"* becoming rows in their own right
(**`P-PJ-IM-3`** the throwing accessor, **`P-PJ-IM-2`** the null-prototype/own-key rule,
**`P-PJ-IM-8`** reuse + re-entrancy) and one row this register's own beyond them (**`P-PJ-IM-7`**).
Its **cell 2** (*"No, and not for a reason of effort … adding `fast-check` is a `devDependencies`
change"*) is **refuted as a conclusion** per the gate-11 ruling's decisive point: no harness IS added,
and the register is nonetheless executed by the deterministic strategy discipline
`docs/specs/engine-pin.md` §5.5 established (**7 of 8** rows, plain vitest tables, **no new
devDependency**). Its **cell 3** (*"yes in principle"*) **holds and is now used** — the Layer
declaration's fourth anchor records the layer reading. Its **cell 4** (*"a strategy id here is a
repeat-drive label, not a property id"*) is **superseded**: strategy-ids here are **`S-PJ-*`
property-execution ids, one per row**. Its **item 1 (the no-sampling anchor) is KEPT and is why every
row is executed by enumeration rather than sampled**; **item 2 (`NOT EXECUTED — no PBT harness`) is
REFUTED for all four claims**; **item 3 (no `fast-check`, no generator library) is KEPT and
satisfied** (the one generator is a hand-rolled LCG pinned to a literal seed in the test file, not a
library); **item 4 ("register change summary: none") is superseded by this summary** — and it carries
the `engine-pin.md` `4/3/2` → `3/3/2` arithmetic correction this spec inherited. **The register is
THIS unit's own and is NOT a copy of `docs/specs/engine-pin.md` §5.5's** — no engine-pin row is
restated, extended or contradicted, so **no second authority over that register is created** (the
discipline §8 states as *"a second authority over a landed register is a finding"*) — and **it is not
a copy of either pilot's either**: the three wave-D registers share the **type algebra, the
strategy-id discipline, the pinned seed and the caps**, and **no row, table, pool, id or count is
shared** (`listhost` `168`, `slothost` `155`, this register `231`).

**Register integration with the legs and the DONE row (so the property layer is not an orphan).**
The register rows are carried by **the same node suite** `npm test` already runs (§5.2 leg 1) in
**this unit's own** `tests/layout-projection.test.ts` — **no new leg, no new file, no new script, no
`package.json` change, no new dependency** (§5.1's diff scope is unchanged). **No `[U]`-leg row is
added**, and the optional real-DOM value row of §5.2 stays optional and precondition-gated: **no
register row depends on it.** **§5.3's DONE row gains item 10** (per-row attempts/held/broken, the
strategy ids, the pinned seed, the stop-after-5 status, the total against the caps, and the explicit
`YES (bounded)` sentence for `P-PJ-IM-1`/`P-PJ-TP-1`/`P-PJ-IM-5`). **A read-only PBT audit may not
report a row as executed on the strength of this table alone** — the audit reads the TestWriter's
tables in the test file and the ledger's numbers against this cell, because **every `YES` here is
execution DESIGN and this pass ran nothing.** **⟶ ARITHMETIC CHECKED AND CORRECTED 2026-09-27 (the
`U-PROJ` RED-SET RECONCILIATION pass):** **the register's total is the DERIVED sum of its own eight
terms — `23 + 60 + 22 + 36 + 52 + 16 + 12 + 10 = 231` — and every cell of this spec that quoted the
former `239` now reads `231`, each keeping the `239` form visible with that date and that reason (the
`TOTAL` row and its one-line restatement here, the `§0A` fourth status note, `§5.5.1`'s honesty item 5
and its scope record, `§7a.1`'s closing note and item 1, and the `§8` register row).** **A per-row
count was NOT changed to reach it:** all eight terms match their rows' own strategy descriptions
(`P-PJ-IM-1`'s `19` + `4` classes = `23`; `P-PJ-TP-1`'s `60` draws and `20`-shape pool; `P-PJ-IM-2`'s
`6 × 3 + 4`; `P-PJ-IM-3`'s `3 × 4 × 3`; `P-PJ-IM-5`'s `26 × 2`; `P-PJ-IM-6`'s `4 + 4 + 5 + 3`;
`P-PJ-IM-7`'s `3 × 4`; `P-PJ-IM-8`'s `10` named reuse/re-entrancy shapes).** **What was wrong is the
SUM, not the terms, and `239` remains visible above only as the corrected form.**

**Scope of this pass, recorded so it is auditable (SPEC TEXT ONLY).** This pass **ran NO test, NO
suite, NO leg and NO trio**, and **it executes none of the rows above** — the `YES` cells are
execution **DESIGN**, and the first execution is the TestWriter's red run (`§5.3` item 10). It
**edited exactly ONE file** (`docs/specs/projection.md`), by **bounded anchored `edit`s** (never a
whole-file `write`, `RCA-8(c)`), with **annotate-never-rewrite** discipline (every superseded form
stays visible with its date and its reason) and **no section number moved** (`§5.5.0`/`§5.5.1` are
sub-headings of `§5.5`, not members of the `5.x` sequence, and **no `§5.4` is created**). **It
touched no `tests/**`, no `src/**`, no `scripts/**`, no `package.json` and none of the trackers**
(`docs/next-steps.md`, `docs/pending.md`, `docs/decisions.md`, `docs/FORKER.md` are the supervisor's
files: **the `docs/pending.md` §G cell that records this re-derivation as BLOCKING, and the `D4` row,
are therefore still the supervisor's to reconcile**), and **it ran no `git commit`.**

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If a projection cannot be computed without
reading an environment value, or an applier cannot make a decision for every input without throwing,
then the two-half split fails and the unit fails.* The falsification tests are **`I-4`** (purity under
frozen inputs), **`I-7`** (no input throws) and **`I-1`** (the partition). **A "read
`getComputedStyle` to skip unchanged values" optimisation would satisfy the unit's apparent purpose
while failing `I-6`** — that is the named failure mode, not a judgement call.

**⟶ WHERE THESE FALSIFICATIONS ARE EXECUTED (ADDED 2026-09-27, the `§5.5` re-derivation pass).** The
register `§5.5.1` carries each of the three named tests as a typed property row, so the falsification
is not left to prose: **`I-4`'s half ⇒ `P-PJ-TP-1`'s fixed frozen-input pool members plus
`P-PJ-IM-3`'s frozen-`values` variant; `I-7`'s half ⇒ `P-PJ-TP-1` (the whole pool, no throw) and
`P-PJ-IM-7` (the all-keys-throw row); `I-1`'s half ⇒ `P-PJ-IM-1` (exactly one decision per entry)
with `P-PJ-IM-2` for the prototype-shaped names.** **This adds no outcome to the list below** and
weakens no clause: the register's rows are **execution design** until the red run executes them
(`§5.3` item 10).

**A second, independent falsification.** *If the projection half cannot be specified without the
census half, then the A-d4 split is not realisable.* The test is the **signature row** (`A-15`): if
`project` needs a `zones`/`census`/`revealed` parameter to be usable, the split fails and the finding
belongs to the architect (a **new gate**), not to this unit.

**The ruling pack sharpens the falsification and adds NO new outcome.** The 2026-09-27 rulings
(`I-11`..`I-14`) are **falsifiable in the same three ways**, so the exhaustive outcome list below is
**unchanged**: **`I-11`** (a projection whose second call differs from a first call ⇒ reuse is not a
value property), **`I-12`/`I-13`** (a caller-supplied name that vanishes from `applied` or whose
record has a non-null prototype ⇒ the record rule is not total), and **`I-14`** (a projection that
changes after a call, or a re-entrant call that moves a key across results ⇒ the immutability/ruling
boundary is broken). **Each of those is a clause-level failure of this spec, not an environment
question** — and, per §0A note 4, a re-entrancy case that breaks `I-3` is escalated as **`BLOCKING`**
rather than quietly guarded.

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause is
found and **the spec is amended** with the clause marked `SUPERSEDED` and the reason recorded
**before** implementation continues; (c) the unit is **routed back** — admissible only if the
projection half is shown to be inseparable from the census half, which would be a finding against
A-d4's split and therefore a **new gate**, not this unit's call (`H-r1`'s cite-and-supersede rule).
**A FOURTH outcome that is NOT admissible** (recorded because the ruling pack makes the temptation
concrete): **inventing a guard, a denylist, a name-legality rule or a tenth-skip-reason to "fix" one
of the four ruled inputs** — that is **a new contract needing its own gate** (§4.4 `S-9`/`S-10`/`S-11`),
not an implementation choice.

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **BLOCKED on the architect's go-ahead for wave D, on the wave-D order (`U-MOUNTGUARD` →
   `U-LISTHOST` → `U-SLOTHOST` first), and on its red set** (§0 ruling 8, §4.5). **⟶ SUPERSEDED ON ITS
   GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the sentence above is kept visible): the
   wave-D go-ahead WAS GIVEN (architect, 2026-09-27) and `U-MOUNTGUARD` is `DONE`; the surviving
   blockers are the wave-D order (this unit lands LAST) and its own red set.** **⟶ AND THE ORDERING
   HALF IS SPENT TOO (2026-09-27, the `U-PROJ` `§5.5` RE-DERIVATION pass; the sentence is kept
   visible): `U-LISTHOST` and `U-SLOTHOST` are BOTH `DONE` — the ledger's FIFTH and SIXTH `DONE` rows
   (`docs/next-steps.md`'s `## DONE — U-LISTHOST` / `## DONE — U-SLOTHOST`, cited by section) — so the
   counts are `6 DONE / 14 open` (`6 + 14 = 20`), `U-PROJ` (`D4`) is the LAST wave-D unit and the NEXT
   in the order, and the surviving blocker is ONE: this unit's own `TestWriter red` set. Nothing in
   this unit is `DONE`, nothing is green, and no leg has been run by THIS pass either — the register
   `§5.5.1` lands is gate-11 design, not a measurement.**
2. **THIS IS THE PROJECTION HALF ONLY, and `U-CENSUS` is a separate wave-E unit.** The
   `computeTrackVars(zones, census, sizes, revealed, specOf)` half **exists in the plan** (its refile
   is WITHDRAWN, §1.2) but it is **not this unit's**, and this unit's diff scope **excludes its
   subject matter**. **A later pass that merges the two halves repeats the multi-unit batching RCA-2
   forbids and blurs two different layer questions.**
3. **The token-formatting authority question is answered by SPLIT OWNERSHIP, and this file states it
   so it cannot be read as a second authority:** for the **census family** (`U-ZONES`/`U-CENSUS`),
   token formatting is **`U-ZONES`'s** (one authority, not two); for **this unit**, formatting is
   derived from the **caller's own `VarSpec`** and **no module is imported**. **`U-PROJ` does not
   delegate to `U-ZONES`, and `U-ZONES` does not own the projection's strings.**
4. **`H-r17` names this unit as the one that must have no zone vocabulary anywhere** — *"`U-PROJ`
   still takes an injected write sink and consumer-supplied variable names/units … with no zone
   vocabulary anywhere"*. **A row, a fixture, a doc sentence or a symbol that carries a zone/track
   concept is a review finding.**
5. **The `project(values)` form in the amended unit plan is INCOMPLETE, and this spec CORRECTED it by
   naming the second parameter — and the correction is no longer a proposal: THE ARCHITECT HAS
   APPROVED IT (2026-09-27).** The plan's own `U5` row writes *"pure `project(values) → record`"*,
   while the governing `SCH-8` per-item row writes *"variable names and units come from the consumer's
   supplied spec"* and the acceptance line writes *"`project(values) → record` + a total applier"*.
   **A projection cannot obtain caller-supplied names/units without a spec argument**, so this spec's
   signature is `project(values, specOf)` and **the single-argument form is `SUPERSEDED`, recorded as a
   source imprecision, not as an alternative contract** (see §8's correction row). **The sibling
   `U-CENSUS` contract already threads `specOf`**, so the vocabulary is consistent with the family.
   **Where the approval is recorded, named because later passes must cite it rather than re-argue it:
   §8's `CORRECTED` row in this file; the `PROJECTION-SIGNATURE-TWO-ARGUMENTS` ACTIVE row in
   `docs/decisions.md` (with that file's `AMENDMENTS TO PRE-EXISTING ACTIVE ROWS` note 16); and the
   dated architect-ruling note in the governing gate record
   `docs/specs/provident-electron-shell-chrome-handoff-review.md` (its `SCH-8` row `:291` and its `U5`
   plan row `:354` both read `project(values, specOf)` now, with the as-filed wording kept visible).**
6. **The `[U]` row, if taken, yields ONE measured value and nothing more.** It is **not** a geometry
   proof and **not** an app-green: `U-REALDOM-BOOT`'s honest limits (its `R4` row, `§1.13`) apply
   verbatim — *"A `ui` green proves that a specific probe, executed inside ONE real Electron renderer
   boot under a controlled profile, produced the asserted value — and nothing else."*
7. **Contract decisions this spec had to make where the sources are silent, recorded so they are
   reviewable rather than implicit:** (i) the **result shapes** — `Projection{applied, skipped}` and
   `ApplyResult{applied, skipped, ok}` (the sources name the *semantics* — "write-or-skip decision",
   "returns exactly the map it applied" — and no field names); (ii) **`unit` is REQUIRED and `''` is
   valid**, while **`format` has the documented default `'unit'`** (the only default this unit may
   have, and it is caller-visible); (iii) **first-wins on duplicate names**, with the second skipped
   (`duplicate-name`); (iv) **the fixed skip-reason precedence** `malformed-spec` → `duplicate-name` →
   `missing-value` → **`accessor-threw`** → `not-a-number` → `negative`; (v) **`-0` is applied as `'0'`
   and is not
   `negative`**; (vi) **the applier trusts its projection** (no re-validation, `M-13`) but **never
   hands a non-string to `setProperty`** (`F-10`); (vii) **a malformed `skipped` list is dropped, not
   fatal** (`F-9`); (viii) **a throwing `setProperty` skips one key and does not abort the run**
   (`F-7`); (ix) **a malformed sink is a total `sink-unusable` skip, never a throw** (`F-6`);
   (x) **`applyVarsToRoot` is an identity alias of `applyProjection`** (`M-14`). **Each is a decision,
   not a derivation — the sources are silent on all TEN.** **⟶ KEPT AT TEN, AND THE COUNT IS
   RECONCILED (2026-09-27): the ruling pack did NOT add an eleventh decision to this list.** What it
   changed is the **status** of four inputs that §7 item 8 recorded as **deliberately unruled** — the
   architect ruled them, so they **stopped being open decisions** and became **pinned contract**
   (`A-11` ⇒ `I-11`; `F-4`'s throwing getter ⇒ the **eighth** union member `'accessor-threw'`;
   `A-3` ⇒ `I-12`/`I-13`; `A-7` ⇒ `I-14`), which **moves the unruled count to ZERO** and leaves the
   decision count at its original **ten**. **They are not appended here as (xi)…(xiv)**: a decision
   item in this list means *"the sources are silent and no ruling exists"*, and that is **no longer
   true** of these four. **The list is otherwise unedited, item (iv)'s precedence line excepted**
   (it gained `accessor-threw`, above).
8. **This spec formerly left FOUR things UNRULED rather than inventing an answer — and ALL FOUR ARE
   NOW RULED (2026-09-27); ⟶ THE COUNT OF UNRULED SEEDS IS ZERO.** The struck-in-place record of what
   was open, kept so the change is auditable: **`F-4`'s throwing getter** (`A-2` — does the
   accessor's throw propagate?), **`A-11`** (is a `Projection` single-use or reusable across sinks?),
   **`A-3`** (the prototype-pollution-shaped key — does the record need a null-prototype?), and
   **`A-7`** (sink re-entrancy) — **the adversarial pass must rule them and record the rulings here.**
   **⟶ SUPERSEDED 2026-09-27 (the architect's ruling pack; §0A carries the four dated notes):**
   **`A-11` ⇒ REUSABLE, a value not a session** (`I-11`, `M-21`/`M-22`); **`A-2`/`F-4` ⇒ the throwing
   accessor is skipped and recorded, never propagated, with its OWN eighth reason `'accessor-threw'`**
   (`F-4A`/`F-4B`/`F-12`, and the vocabulary count moved **seven → eight** everywhere it is stated);
   **`A-3` ⇒ `Object.create(null)` for `applied` and every internal key→value map** (§2.5, `I-12`/
   `I-13`, `F-13`/`M-18`/`M-19`/`M-20`); **`A-7` ⇒ not guarded, the projection is immutable input**
   (`I-14`, `F-14`/`F-15`, §2.3 item 8). **NO SEED OF THIS SPEC REMAINS UNRULED.** Naming an
   unresolved input as unresolved is the contract; silently picking an answer would be the `C-16`
   class (`RK-10` — a contract reverse-engineered from one consumer) — **and the ruling pack is the
   architect's answer to exactly that objection, so it is neither a silence nor an invention by this
   filing.** **What remains OWED is not a ruling but the adversarial PASS itself** (§3a/§3b: it runs
   after the green and re-checks each of these four **against the landed module** — `A-7`'s
   `CONFIRMED-RULED` carries an explicit `BLOCKING` escalation path if a re-entrancy case is ever
   found that `I-3` does not cover).
9. **No page-design layer exists to update.** `docs/skills/designing-pages.md` does not exist
   (globbed this pass), so there is no test-use-case coverage matrix and no demo-page index.   **⟶ NOT RE-GLOBBED, AND THE PAGE-DESIGN QUESTION IS DISCHARGED FOR THIS PASS (2026-09-27, the
   `§5.5` re-derivation pass):** this pass has **no shell**, so it cannot re-run the glob — it relies
   on the **ruling-pack pass's recorded glob** (`docs/skills/*` → `process-guardrails.md` alone) as
   the last evidence, which is recorded rather than presented as a fresh check. **If the file existed,
   this pass would owe it: a `§5.5.1` register whose rows are quantifications would add a
   **test-use-case row** to its coverage matrix and an entry to its demo-page index (which rows a
   demo page must exercise), and nothing in this unit's diff scope (§5.1) would change.** **§7a item
   11 (d)** turns this same claim into a row a TestWriter can falsify, because an unglobbable
   existence claim is otherwise unfalsifiable prose. **⟶ RULED AND ID'D 2026-09-27 (the `§7a` RULING
   pass, `§7a.1` item 11 (d); the clause above is kept visible): the row IS `R-23` (`§3.5`) — an
   `fs.existsSync`-style PROBE on the repo-relative path whose FAIL is MEANINGFUL (if the file DOES
   exist, this row fails **and the unit then OWES the test-use-case coverage row + the demo-page index
   entry** per this item's own clause, which is exactly the page-design layer's contract).** **`§3.5`'s
   `R-22` is the export-census half of the same ruling** (`§2.1`'s *"Eight exports"* reconciled to the
   eleven names its own block declares — four value exports + seven type declarations). **Both are OWED
   to the TestWriter** (their TEXT is written at `§3.4`/`§3.5`); **this pass has no shell and re-runs no
   glob** — the LAST recorded glob (the ruling-pack pass's `docs/skills/*` → `process-guardrails.md`
   alone) stands as the evidence, and the PROBE is what makes this claim falsifiable rather than
   re-asserted.**
10. **The `[T]` layer cannot carry a CSS claim** (Layer declaration anchor 2), and the shim cannot
    either: its `style` is `{ cssText: string }` with **no `setProperty`** (`src/shared/dom-shim.ts:9`,
    read). **A `[T]`-green that is read as "the custom property works in the app" is the exact
    false-green class `RK-19`/`RK-16` name, and a review finding.** **⟶ ANNOTATED 2026-09-27 (the
    `§7a` RULING pass, `§7a.1` item 2 — no clause weakened): `M-13`'s amended TRUST text and `F-10`'s
    coercion table are `[T]`-assertable on a caller-supplied recording fake sink alone, and neither is
    evidence for a CSS claim** — the sink records **the arguments it was handed**, never what a browser
    would accept. **A row that reads the recording sink's log as "the property works" repeats the
    false-green class this item names.**
11. **This unit asserts no magnitude-equivalence and no removal capability.** §2.3 item 5 states both
    boundaries: a stale property is not cleared, and a removal API is **a different contract needing
    its own gate**.
12. **The `U5` plan row is a PRE-EXECUTION plan, kept as provenance.** Its red-set bullet list is
    the same row set this spec expands (`purity`, `totality`, the non-finite/negative fail-soft pin,
    "returns exactly the map it applied", "the `computeTrackVars` half is absent") — **every one of
    those five is a row here**, and **the fourth is re-anchored as `applied`'s write-LOG meaning**
    (§2.1, §2.3 item 2) rather than left as an unbounded phrase. **⟶ RECONCILED 2026-09-27 (the
    `§5.5` re-derivation pass): the five bullets' statuses are unchanged, and the register adds no
    sixth bullet** — the four quantifications the plan's list carries are `§5.5.1`'s rows
    (`P-PJ-IM-1` · `P-PJ-TP-1` · `P-PJ-IM-5` · `P-PJ-IM-6`), **which is the plan row's own list
    answered, not extended.**

13. **FOUR LIMITS THIS PASS RECORDS SO A LATER PASS DOES NOT RE-LITIGATE THEM (2026-09-27, the `U-PROJ`
    RED-SET RECONCILIATION pass — each is a clause a TestWriter reported as unassertable-as-written, and
    each is now stated in the cell it binds rather than left to be re-derived):**
    **(i) `R-17`'s fixture half is BOUNDED** — the row proves the MODULE carries no banned vocabulary,
    raw or assembled, and proves of the test FILE only that its assembled view carries no joined
    spelling given that its own vocabulary data is carried as fragments; it **CANNOT prove that no
    other `[T]` fixture in the file carries the vocabulary**, and **no stronger form is assertable**
    (a check excluding the controls is circular; one banning the fragment technique fails the controls
    `S-12` requires). The row's new limit text is in `§3.4 R-17`. **⟶ LIMIT MADE ASSERTABLE 2026-09-27
    (the `U-PROJ` RED-SET REPAIR pass — `CONTRACT-AMENDED` at `§3.4 R-17`; the as-written sentence above is
    KEPT and its substance is NOT withdrawn):** the limit above was **recorded in prose only**, which is
    the same half-assertable state `§7a` item 11 exists to close — so the repairing pass **scopes the
    row's FILE half to the fixtures the row itself controls**, **adds a WORD/IDENTIFIER-BOUNDARY rule**
    (so ordinary words are not violations — `table`, `stable` and `IMMUTABLE` all contain the three
    letters `tab`, and the raw half has no boundary), and **keeps the row's real purpose fully
    assertable: NO banned vocabulary in the MODULE, by raw token OR by assembly, never by obfuscation.**
    **The file half may be DROPPED instead, with this item's own reason stated as the reason** — that is
    the alternative the row text offers; either form is a PASSING row, and a **whole-file negative is
    neither**. **`R-17`'s drive is OWED to the TestWriter; nothing else in this item changes.**
    **(ii) `I-13`'s internal half is NOT EXTERNALLY OBSERVABLE** — *"any internal key→value map is
    null-prototype"* must not be asserted directly; **only the returned records and the own-property
    read semantics are assertable**, and the internal half is covered **behaviourally** through `F-13`
    and `P-PJ-IM-2`. Recorded at the `§3.3 I-13` cell.
    **(iii) `R-18`'s `[expr]` clause is assertable ONLY in the realm-rooted form `§4.4 S-13` defines**
    (a banned realm token or an alias of one); **a blanket `[expr]` ban is expressly NOT claimed**, and
    a row that fails ordinary array indexing or a locally constructed object's computed access is
    `S-13`'s class. Restated at `§3.4 R-18`.
    **(iv) `§2.1`'s `Projection.applied` doc string was LITERALLY FALSE and is corrected to `§3.3 I-9`'s
    narrowed, assertable form** (`no applied value EQUALS 'NaN'/'Infinity'/'-Infinity'`, plus
    string-only applied values) with the as-written sentence kept visible; **the record's values are
    strings, so no value in it can *be* those number literals** — the honest core is that such values
    are skipped `not-a-number`/`negative` and produce no string at all.
    **None of the four changes a row's drive, a per-row attempt count, the register total, a strategy
    id, a section number or a cap.**

### 7a. Ambiguity report — clauses the TestWriter could NOT derive a falsifiable row from (2026-09-27, the `§5.5` re-derivation pass)

**Why this subsection exists, and what it is.** The `§5.5` re-derivation forced every quantified
claim in `§2`–`§3` to be turned into a **falsifiable** register row, and **eleven clauses did not
admit one**: each is either **self-contradictory**, **under-specified**, **unobservable as stated**,
or a **static row satisfiable by evasion rather than by the code**. **They are REPORTED here, not
guessed** — the same discipline both pilots' passes used when their TestWriters found eight and nine
such clauses respectively. **No register row resolves an item of this report, and none may be read as
doing so** (`§5.5.1`'s honesty item 5): each row asserts only the half the clause decides, and the
undecidable half is listed below with the clause pair that disagrees, **my reading** (the contract's
majority reading, which a TestWriter may write against **without treating it as a ruling**), and the
**owner** of that reading.

| # | The clause(s) | Why a falsifiable row cannot be derived | My reading (best available, NOT a ruling) | Owner |
| --- | --- | --- | --- | --- |
| **1** | `§2.4` item 2 (*"For **any** `values` and **any** `specOf` … `project` **returns a `Projection` and never throws**"*) vs **`F-11`** (which pins the result of a non-record `specOf` — *"**zero** spec entries ⇒ `applied` `{}` and `skipped` `[]`"*) — and **nothing pins a non-record `values`**. | "For any `values`" is total, but the RESULT for a non-record `values` (a string, a number, an array) is not: **a row cannot assert `F-3`'s `missing-value` for a spec entry whose key the caller's non-record `values` cannot own**, nor can it assert that such entries are skipped at all. The two clauses are consistent only under an unstated rule. | **A non-record `values` contributes NO own keys, so every otherwise-well-formed spec entry is skipped `missing-value`** (the same own-property read `§2.5` item 2 pins for a plain object) — and **no `malformed-spec` may be invented for `values`**, which is caller data (prohibition 3). | contract text: the pass that amends `§2.4` item 2 with the `values`-shaped clause. The register reports it: **`P-PJ-TP-1`** asserts no-throw only for these shapes and no reason value. |
| **2** | **`M-13`** (*"the applier writes exactly that record — **it does not re-validate, re-format or re-derive it**"*) vs **`F-10`** (*"the applier **coerces with `String(value)` only for a primitive**, and **skips** a non-primitive with `write-refused`"*). | `F-10` **is** re-validation, and coercion **is** re-formatting: a hand-built projection holding the number `12` cannot be both *"written exactly as given"* and *"coerced to `'12'`"*. The two rows contradict each other for the same shape, so a row deriving from either can be failed by the other. | **`F-10` owns the coercion** (a real `setProperty` must never receive a non-string — its stated safety reason), and **`M-13`'s "exactly that record" is read as "the applier applies the record it is given, and never asks `project` again"** — the trust half. The coercion is `String()` **without touching the caller's projection** (it is not mutated; `I-14`). | contract text: the next `§2.3`/`§7` item 7 pass — this is a **`CONTRACT-AMENDED` candidate** for `§3b`. The register reports it: **`P-PJ-IM-6`**'s stated boundary, and its `F-10` compensating citation is the coercion half only. |
| **3** | **`F-9`** (*"the malformed skip entries are **dropped from `ApplyResult.skipped`**"*) vs **`I-10`** (*"`ok === (skipped.length === 0)`"*) — and `§2.1`'s `ApplyResult.ok` doc string (*"`true` iff nothing was skipped"*). | If a malformed entry is DROPPED, was anything "skipped"? `ok` computed from the caller's list is `false`; computed from the emitted list it is `true`. **Both are derivable, and neither is written** — so no row can assert `ok` for `F-9`'s drive. | **`I-10` is the invariant and wins: `ok` is computed from the EMITTED `skipped` list**, so an all-dropped malformed list yields `ok === true` with `skipped` `[]`. This is the reading that keeps `I-10` a single-expression invariant. | contract text: a one-sentence amendment to `F-9` (or to `§2.1`). The register reports it: **`P-PJ-TP-1`**'s pool members `16`/`17` assert **no throw and the emitted shape only** — never an `ok` value. |
| **4** | `§2.3` item 4 (*"a malformed/unusable **sink** is a TOTAL skip"*) + **`M-11`** (*"a `null`/absent **projection** … **no throw**; `applied` `{}`; `skipped` `[]`; `ok === true`"*) vs **`F-1`**'s discipline (a malformed thing is *recorded* with a typed reason, `malformed-spec`) and `§2.3` item 1 (*"a key can never vanish between the two halves"*, `I-2`). | For a malformed **projection** there is **no reason member to use**: the eight `ProjectionSkipReason` members are all reasons about a KEY, and inventing a ninth (`'projection-unusable'`) is forbidden (`§4.4 S-9`'s class). `M-11`'s "nothing to decide" is therefore **the only admissible rule** — but it reads oddly against a totality contract whose whole claim is that every input yields a decision. | **`M-11` is correct and is the contract's reading: a malformed PROJECTION decides nothing** (a projection is an INPUT record, not a spec set — the keys to decide live in it, and a non-record has none), whereas a malformed SINK decides **every key** (`F-6`, `sink-unusable`). **The asymmetry is deliberate and stated**: the projection supplies the keys, the sink only receives them. | contract text: one sentence distinguishing the two in `§2.3`; no reason is invented. The register reports it: **`P-PJ-IM-6`**'s stated boundary and `P-PJ-TP-1`'s members `11`–`13`. |
| **5** | `§2.4` item 3's fixed precedence (*"`malformed-spec` → `duplicate-name` → `missing-value` → `accessor-threw` → `not-a-number` → `negative`"*) vs `§2.4` item 5 (**first-wins**) and **`F-2`** (*"the **first** is applied and the **second** is skipped with `duplicate-name`"*). | Two spec entries share a `name`, and the FIRST one is itself skipped (its value is absent). `F-2` says the first is **applied** — it is not. Does the second get `duplicate-name` (the precedence's literal order) or `missing-value` (nothing was applied to duplicate)? **Both readings satisfy every written clause**, so no row can assert the second entry's reason. | **The precedence's declared order wins: `duplicate-name` is decided by NAME COLLISION, not by whether the first entry was applied.** First-wins means *the first DECISION wins* for that name; the second entry is `duplicate-name` regardless of how the first was decided. | contract text: a half-sentence in `§2.4` item 5. The register reports it: **`P-PJ-IM-1`**'s class `(10)` drives a duplicate pair whose FIRST member has a value (so the row is silent on the collision-with-a-skipped-first case). |
| **6** | **`M-9`** (*"a `Object.freeze`d `values` and a `Object.freeze`d **spec** (and a frozen nested spec object) — **no throw** … the result is correct"*) vs **`F-1`** (*"a malformed spec entry … is skipped with `malformed-spec`"*). | A **frozen `VarSpec` object is itself a perfectly valid entry** (freezing does not change its fields), while a **frozen NESTED object inside a spec field** is a malformed entry. `M-9`'s single sentence covers both with *"the result is correct"*, and "correct" differs between them — so a row asserting `M-9`'s whole clause cannot be written without choosing. | **The frozen entry is valid and is APPLIED; a frozen nested object where a `string` is required is `malformed-spec`.** `M-9` asserts *"no strict-mode throw"* over both, which is the whole of its claim; its *"result is correct"* half is per-entry. | contract text: a clause split in `M-9`. The register reports it: **`P-PJ-TP-1`**'s pool members `6`/`7` use the frozen-`values` and frozen-nested-spec shapes **for the no-throw assertion only**. |
| **7** | **`I-9`** (*"**never** contains `NaN`/`Infinity`/`-Infinity` or **begins with `'-'`** (except a caller's own `unit`/`name` that literally does)"*) vs `§2.4` item 4 (the module emits `String(value)`). | The carve-out makes the clause **unfalsifiable as a `'-'` test**: for every value the contract rejects (`-1`), the module produces no string at all, so a `'-'`-prefix assertion can only ever fire on a **legitimate** applied value produced by a caller unit/name — the exempt case. The assertion *"never begins with `'-'`"* therefore **cannot fail for the mutation it names**. | **Assert the EXACT expected string per applied value and assert that `'NaN'`, `'Infinity'` and `'-Infinity'` appear in NO applied value — never a bare `'-'`-prefix test.** The clause's honest content is the non-finite half; the `'-'` half is a report item. | contract text: `I-9`'s cell (drop or bound the `'-'` half). The register reports it: **`P-PJ-IM-5`**'s per-attempt assertion is written this way. |
| **8** | `§2.5` item 5 (*"`Object.freeze` on the returned record is **permitted** … **is NOT a contract clause**, and a caller may rely on **neither freezing nor non-freezing**"*) vs **`F-15`** (*"a **frozen** `p` (`Object.freeze` on **the record and on `p` itself**) is also **accepted without a throw**"*). | Two ambiguities in one pair: (a) is the permitted freeze **shallow or deep** (the record, the projection object, or both — `F-15` names both while `§2.5` names one)? (b) *"accepted without a throw"* under **who** freezes — the HARNESS freezing the caller's object before the call (a legality statement about the module) or the MODULE freezing its own return (a behaviour statement)? | **The harness freezes both the caller's record and the projection object before the call, and the module must not throw** — `F-15`'s reading. `§2.5`'s permission is about the MODULE optionally freezing its own return and is **not** what a row asserts. A deep freeze of `skipped` (an array of plain records) is not needed by either clause. | contract text: one sentence in `§2.5` item 5. The register reports it: **`P-PJ-IM-8`**'s shape `(10)` freezes the record and the projection, shallowly, and asserts no throw. |
| **9** | **`F-15`**'s own snapshot recipe (*"deep copy **and** `JSON.stringify`-with-null-prototype-aware comparison, plus `Object.keys(p.applied)` order and `Object.getPrototypeOf`"*) vs **`§2.5`** item 4 (`A-3`'s own words: `JSON.stringify` serializes a `'__proto__'` own key as **data**, and re-parsing hands `__proto__` to the **parser**). | The named comparison method **cannot compare the object the row is about**: a null-prototype record holding an own `'__proto__'` cannot be round-tripped through `JSON.parse`, so "`JSON.stringify`-with-null-prototype-aware comparison" names no executable comparison. A TestWriter must invent one, and an invented one is a reading, not the contract. | **Pin the four exact observables and never `JSON.stringify`:** (i) `Object.keys(p.applied)` **in order**, (ii) each value read by `Object.hasOwn` + index, (iii) `p.skipped` deep-equal by value, (iv) `Object.getPrototypeOf(p.applied) === null` — compared against a **fresh `project(values, specOf)`** for the value halves. | contract text: `F-15`'s snapshot recipe. The register reports it: **`P-PJ-IM-8`**'s per-attempt assertion block **is** the pinned form, and `P-PJ-IM-8`'s strategy says so. |
| **10** | **`M-10`** (*"`projectVar`'s `written` equals `project`'s `applied[k]` **and** its `skip` is deep-equal to the corresponding entry in `skipped` (**or both `null`/absent**)"*) vs `§2.1`'s `projectVar` signature (`written: string \| null`) and **`M-4`**/*M-3* (an empty `unit` and `format: 'number'` both legitimately produce an **empty or short** string). | `written === ''` is a **legitimate written value** (`format: 'number'` on `0`, or `unit: ''`) and is **falsy**: a row asserting "not written" by truthiness, or "written" by truthiness, is wrong in one direction either way. The spec never says which falsy value means what, so `M-10`'s *"both `null`/absent"* is ambiguous. | **`written === null` is the ONLY "not written" observable, and `skip !== null` is its companion** (`{written: null, skip: {…}}`); **`written === ''` is a WRITTEN empty value** and must never be produced when a skip occurred. Never a truthiness test on either field. | contract text: one sentence in `§2.1`'s `projectVar` doc comment. The register reports it: no register row drives `projectVar` directly — **`M-10`'s compensating row** is where it lands. |
| **11** | **`§2.2` prohibitions 1 and 5 and `§1` item 3, each requiring a row that does NOT exist**; and the **zone-vocabulary prohibition** (*"the module's source contains **no occurrence** of `zone`/`pane`/`tab`/`region`/`track`/`isEmpty`/`emptyToken`"*) vs **`A-18`**, which requires the static probe *"does any `name`, `unit`, default, union member, **doc sentence** or test fixture in this unit carry a zone/track/pane/tab name"* — **in a file whose own prose must contain the word `track` to state the prohibition.** | Four separate gaps, all in the static class: **(a)** prohibition 1's row is cited as *"static source row over the module file"* and prohibition 5's as *"plus a static import row"* — **neither has an id in `§4.4` (`S-1`..`S-11` are stop conditions, not rows) and neither is enumerated in `§3`**, so a TestWriter must invent both; **(b)** *"no occurrence … as vocabulary"* is not operational: **a token scan can be satisfied by token ASSEMBLY** (`'zo'+'ne'`, a template literal, a concatenated fixture) and by vocabulary placed in a **comment** rather than code — exactly the evasion class `U-SLOTHOST`'s adversarial pass found in its own static rows; **(c)** prohibition 5's numeric half (*"`ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**"*) is satisfied by the **existing** census test *"unchanged"*, so the row is green whether or not this unit adds a seam — its only falsifiable half is the import row; **(d)** `§2.1`'s *"**Eight exports**, and nothing else"* and `§7` item 9's *"`docs/skills/designing-pages.md` **does not exist**"* are **unchecked existence/count claims with no row at all**. | **(a)+(b)** the TestWriter authors the two rows explicitly, each with **both halves**: a **positive** half (a real vocabulary-bearing module fails it) and a **negative** half (a **token-assembled** spelling *and* a comment-carried spelling must ALSO fail — i.e. the row normalizes/concatenates before scanning and reads comments too). **(c)** the row asserts the **import half** and leaves the `21`-member census to the existing test. **(d)** two trivial existence rows: `Object.keys(module)` equals the eight declared exports exactly, and a `readdir`-style glob over `docs/skills/*` is asserted **only in the pass that claims it**. | **(a) contract text — `§4.4` needs a stop condition for the "no static row enumerated" class** (the pilots' `S-7` analogue); **(b)+(d) the TestWriter** (rows only; no clause changes); **(c) the existing `tests/engine-pin-version.test.ts` census stands** and **no new row is owed**. |

**The register's own boundary against this list.** **No register row above resolves an item of this
report**, and none may be read as doing so: each row's cell states which half it drives and which
half it declines to drive for want of a ruling (`§5.5.1` honesty item 5). **Items 2, 3 and 9 are the
three that most directly threaten the register** — 2 because it governs what `P-PJ-IM-6` may assert
about a hand-built projection, 3 because it leaves an `ok` value unassertable for `F-9`'s shape, and
9 because `P-PJ-IM-8` had to pin the observables the spec names loosely. **Item 11 is the
static-row/evasion class and is the one most likely to be satisfied by a green that proves nothing** —
and two of its four gaps (`§2.1`'s export count, `§7` item 9's missing page-design file) are
**claims this spec makes about the repo that no row checks at all**.

**What this list does NOT do: rule.** Unlike the sibling units' `§7a.1` ruling passes, **this pass
rules NONE of the eleven** — it reports each with its best reading and its owner, so the pass that
owns the ruling has the whole list and the TestWriter knows which drive it may write and which it may
not. **The delegation gate's standard is therefore NOT yet met for these eleven items**, and that is
recorded here rather than left implicit: `AGENTS.md` item 9's TestWriter step must either receive a
ruling for each item or write its rows to these readings **as readings**, and a red set that
silently hardens a reading into the contract is the `C-16`/`RK-10` class.

**⟶ RULED IN FULL 2026-09-27 (the `§7a` RULING pass) — see `§7a.1` below. The paragraph immediately
above is THIS pass's predecessor's own state and is kept visible as the record of what the
re-derivation could not derive; it is not a current statement of the gate.** **The list is now NOT
empty of rulings: `11` items are ruled from the contract's own clauses, `0` remain OPEN QUESTIONS, and
each ruling names the row TEXT it produces** (`§7a.1`'s last column). **`AGENTS.md` item 9's
underivable-clause condition is therefore MET for these eleven items** — what the delegation gate still
needs is the red set itself, RUN and REPORTED, which no ruling pass can supply.

### 7a.1 THE RULINGS — all eleven items ruled 2026-09-27 (the `§7a` RULING pass), so the delegation gate's ambiguity list is EMPTY

**What this subsection is.** The table above is the re-derivation pass's **ambiguity report**; this is
the **ruling pass** over it — the step `docs/specs/slothost.md` took for its own nine clauses
(**`§7a.1`**: `9` ruled, `0` open, **two reported as `CONTRACT-AMENDED`** — `F-10`'s four-seam
defaults and `F-9`'s pinned `removed` membership — plus a **type** amendment, a **widened `key:
unknown`** field, and **observables NAMED** so a row can fail), and the step
`docs/specs/listhost.md` took for the same classes (**a widened `key: unknown` field; observables
NAMED so a row can fail; a totality boundary stated explicitly with named safe defaults**). **The
ruling discipline, in the `§7a.1` precedent's own order: rule each item from the contract's own
MAJORITY reading, cite the clauses that decide it, amend the spec so a TestWriter can derive a
FALSIFIABLE row — and, where the contract genuinely cannot decide an item, record it as an explicit
OPEN QUESTION with BOTH readings and an OWNER.** **`11` of `11` are ruled. `0` are OPEN QUESTIONS** —
**the list is neither silent nor guessed: no item was left as a gap, and no reading is presented as
contract text without the clause that decides it.** **The report above stays visible and verbatim**
(annotate-never-rewrite); **no section number moves** (`§7a.1` is a **sub-heading of `§7a`**, the
`§5.5.0`/`§5.5.1` convention, so the `§0`–`§8` sequence and every citation are unchanged).

**The eleventh item's two halves, stated up front because they are the ones a reader may conflate:**
**(i) the CONTRACT TEXT — authored by THIS pass, now:** the **ids** (`R-17`..`R-23`, `§3.4`/`§3.5`), the
**scan SCOPE** (module source + its comments + the unit's fixtures; never this spec's prose), the
**anti-evasion clause** (`S-12`: token assembly and comment-carrying are the violation, on the
architect's `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` rule), **the `[expr]` limit** (`S-13`: accesses
**rooted in a banned realm token or an alias of one** — a blanket ban is **not assertable** and is
**not** claimed), **the count-vs-set rule** (`S-14`) and the **probe rule** for existence claims
(`S-15`). **(ii) the ROW AUTHORING — owed to the TestWriter, and named as owed:** the drives of
`R-17`, `R-18`, `R-19`, `R-20`, `R-21`, `R-22`, `R-23`, and the re-pinned drives of the `§3` rows
below. **Nothing in (i) is a red row and nothing in (ii) is contract text.**

| # | The clause(s) it cites | The RULING (the contract's majority reading, cited) | Contract decided, or OPEN QUESTION? | The row TEXT the TestWriter now authors or re-pins (§3/§3.4/§3.5/§5.5.1 ids; TEXT, not drives) |
| --- | --- | --- | --- | --- |
| **1** | `§2.4` item 2 (*"for **any** `values` … never throws"*) · `§2.4` item 3 (*"`missing-value`"* = *"the spec's key is absent from `values`"*) · `§2.5` item 2 (every `values` lookup is an OWN-property lookup) · `F-11` · `§2.5` item 2's *"`values` and `specOf` are NOT required to be null-prototype objects"* · prohibition 3 | **A NON-RECORD `values` CONTRIBUTES NO OWN KEYS ⇒ every otherwise-well-formed spec entry is skipped `missing-value` — the reading is CONFIRMED, not corrected.** The deciding clause is `§2.4` item 3 read through `§2.5` item 2: `missing-value` is *"the key is absent from `values`"*, and an own-property lookup finds **no own key** on `null`, `undefined`, a string, a number or an array — so **absence is the fact the module reports**, and **`F-11` and `§2.4` item 2 now agree**. **No `malformed-spec` may be invented for `values`** (`values` is caller data; prohibition 3) and **no `not-a-number`/`accessor-threw`** (there is no readable value to judge). | **DECIDED** | **`§3.2 F-11`'s row TEXT is EXTENDED** (the `values` half (b): `applied {}`, one `missing-value` entry per spec entry, partition holds, no throw, no invented reason); **`§2.4` item 3** gains the clause (i). **OWED to the TestWriter:** `F-11`'s drive (both halves in one row or two), and **`§5.5.1 P-PJ-TP-1`'s pool members `1`–`5` keep asserting the RESULT SHAPE ONLY — the row is NOT re-pinned** (its statement, strategy, attempt count and the `231` total are untouched; the reason is pinned on the `§3` layer). **⟶ RECONCILED WITH `F-11(b)` 2026-09-27 (the `U-PROJ` RED-SET RECONCILIATION pass; the sentence above is kept visible and is given its reading rather than rewritten):** *"the RESULT SHAPE ONLY"* **means the pool members drive the SHAPE + TOTALITY + PARTITION halves (no throw, `applied` a record, `skipped` an array, `ok === (skipped.length === 0)`, every entry with exactly ONE decision) and do NOT OWN that reason's authority — the reason value's home is `§3.2 F-11`, while the RESULT these members must yield is the pinned one stated next. It does NOT mean these members yield no skips.** **The pinned RESULT for a non-record `values` is stated ONCE, in `§3.2 F-11`'s `values` half (b), and both cells now say the same thing: `applied` `{}` and `skipped` NON-EMPTY with exactly one `missing-value` entry per spec entry.** **A row asserting an EMPTY `skipped` for pool members `1`–`5`, or a reason other than `missing-value`, FAILS `F-11`'s row text AND this ruling; a row that asserts the SHAPE for those members and derives the reason from `§3` is exactly what this ruling directs.** |
| **2** | `M-13` (*"it does not re-validate, re-format or re-derive it"*) · `F-10` (*"coerces with `String(value)` only for a primitive"*) · `§2.3` item 2 · `§2.1`'s `applyProjection(projection, sink)` signature · `I-14` · `§4.4 S-11` | **`F-10` OWNS THE COERCION AND `M-13` IS THE TRUST HALF — a `CONTRACT-AMENDED` ruling.** `M-13`'s clause means **the applier never asks `project` again**: it does not re-run the validity rule, does not consult `values`/`specOf` (it has neither — the signature is `(projection, sink)`) and **never re-formats against a `VarSpec`**, because no `VarSpec` is in its arguments. **`F-10` is the ONE exception and it is not spec re-validation: it is the type-safety coercion of an `applied` VALUE** (a real `setProperty` must never receive a non-string) — `String(value)` for a **primitive**, **`write-refused`** for a non-primitive. **The two observables are different objects and never collide**: `M-13`'s is *"no `project` call, no spec-based re-derivation"*; `F-10`'s is *"the exact string the sink received"*. **The coercion writes nothing into the caller's projection** (`I-14` unbroken — `F-15`). | **DECIDED — a real amendment; `CONTRACT-AMENDED`, reported as such** | **`§3.1 M-13`'s row TEXT is CONTRACT-AMENDED** (four assertions: no `project` call; no spec-based re-derivation — driven by a projection carrying a skip `project` would not emit for the same shape; the coercion is `F-10`'s alone and leaves `p` unmutated; a non-record projection is `M-11`'s no-op) — **the as-written cell is kept visible. `§3.2 F-10`'s row TEXT is CONTRACT-AMENDED** (the exact coercion table: `12`⇒`'12'`, `0`⇒`'0'`, `-0`⇒`'0'`, `true`/`false`⇒`'true'`/`'false'`, `12n`⇒`'12'`, `'12'` unchanged; `null`/`undefined`/`{}`/`[]`/a function ⇒ **`write-refused`** and absent from `applied`; every case asserts `p` unmutated — and **a `Symbol` is outside the row's surface**). **NEW normative paragraph: `§2.4`'s `M-13`/`F-10` boundary note.** **`§5.5.1 P-PJ-IM-6`'s stated boundary is CONFIRMED, not changed** (`F-10` as the coercion case, `M-11` as the no-op). **OWED to the TestWriter:** the two re-pinned drives and the symbol-absent note. |
| **3** | `I-10` (*"`ok === (skipped.length === 0)`"*) · `F-9` (*"the malformed skip entries are dropped from `ApplyResult.skipped`"*) · `§2.1`'s `ApplyResult.ok` doc string (*"`true` iff nothing was skipped"*) · `M-15` · `I-11` | **`I-10` IS THE INVARIANT AND WINS: `ok` IS COMPUTED FROM THE EMITTED LIST — a `CONTRACT-AMENDED` ruling.** The `skipped` in `I-10`'s expression is **`ApplyResult.skipped`**, the result's own list, **never the caller's input list** — because the alternative reading (`ok` from `Projection.skipped`) would make a **one-expression invariant consult an input the result does not carry**. So `F-9`'s **all-dropped** malformed list yields **`skipped []` with `ok === true`**, and a **mixed** list (one well-formed entry + one malformed) yields **length `1` with `ok === false`** — the non-vacuous control that stops the row passing by dropping everything. **No ninth reason is invented** (`S-9`'s class). | **DECIDED — a real amendment; `CONTRACT-AMENDED`, reported as such** | **`§3.2 F-9`'s row TEXT is CONTRACT-AMENDED** (five observables: no throw; the `applied` half written in full; malformed entries dropped for BOTH the whole-list and the entry-malformed shape; **`ok === true` for the all-dropped shape**; the mixed shape's `ok === false`) — **the as-written cell is kept visible. `§3.3 I-10`'s cell** gains the *which `skipped`* clause. **`M-15`/`I-11` are annotated as unchanged** (each call's `ok` is its own call's emitted list). **OWED to the TestWriter:** `F-9`'s re-pinned drive (both shapes + the mixed control). **No register row is re-pinned** (`§5.5.1`'s item 5 is annotated, its rows' statements and attempts unchanged). |
| **4** | `§2.3` item 4 (the malformed/unusable SINK) · `M-11` (the malformed PROJECTION) · `F-6` · `I-2` (*"a key can never vanish"*) · `F-1`'s record-it-with-a-typed-reason discipline · `§4.4 S-9` | **THE PAIR IS RULED SEPARATELY, AND THEY ARE DIFFERENT OBJECTS — the reading is CONFIRMED, not corrected.** **A malformed PROJECTION decides NOTHING** (`M-11`: `applied {}`, `skipped []`, `ok === true`) — a projection is an **INPUT RECORD**: the keys to decide live **in it** and a non-record has none, so "every key decided"/"no vanishing" (`I-2`) **has no domain** and is **not** contradicted. **A malformed SINK decides EVERY key** (`F-6`: `applied {}`, one `sink-unusable` skip per key, `ok === false`) — a sink only **RECEIVES** decisions. **The asymmetry is deliberate**: the projection SUPPLIES the keys, the sink RECEIVES them, and **no ninth reason (`'projection-unusable'`) is invented** (`S-9`'s class — a new contract needing its own gate). | **DECIDED** | **`§2.3` item 1 gains the scope sentence** (the well-formed-projection domain of "one decision per key" and of `I-2`), **`§2.3` item 4 gains the normative asymmetry paragraph** (projection vs sink, with the no-invented-reason rule), **`§3.3 I-2`'s cell is SCOPED** (well-formed projections; a malformed sink is fully inside its domain; a dropped malformed `skipped` entry is not a vanished key). **`M-11`/`F-6`'s TEXT is unchanged** (their drives already pin both halves). **`§5.5.1 P-PJ-IM-6`'s stated boundary and `P-PJ-TP-1`'s members `11`–`13` are CONFIRMED, not changed. OWED to the TestWriter:** nothing new beyond the rows already named — the two drives exist; what this ruling adds is that **no row may assert a `sink-unusable`-shaped or vanished-key result for a non-record projection**. |
| **5** | `§2.4` item 3's fixed precedence · `§2.4` item 5 (**first-wins**) · `F-2` · `§2.4` item 3's first line (*"a key is applied **iff** its spec is usable **and** its value is present **and** …"*) | **THE COLLISION DECIDES: `duplicate-name` — AND THE SKIPPED FIRST OCCURRENCE KEEPS ITS OWN REASON.** **First-wins means the first DECISION wins, not the first application** — `duplicate-name` is decided by **NAME COLLISION** (the precedence's own position, before `missing-value`), so the **second** entry is `duplicate-name` **regardless of how the first was decided**. **The FIRST occurrence, being itself unusable, records its own reason from the same precedence** (`missing-value`, `accessor-threw`, `not-a-number` or `negative` — NOT `duplicate-name`, since nothing had collided when it was decided), and **`applied` still contains the name at most once** (`F-2`'s clause is unaffected). | **DECIDED** | **`§2.4` item 3 gains the clause (ii), `§2.4` item 5 gains the half-sentence, and `§3.2 F-2`'s row TEXT is EXTENDED** — the added drive: two spec entries naming `'--dup'` where the **FIRST's value is ABSENT** ⇒ **first entry `missing-value`** (its own reason, one skip entry), **second entry `duplicate-name`** (the collision), `applied` contains `'--dup'` **zero** times, and **a row asserting `missing-value` for the SECOND entry FAILS**. **`§5.5.1 P-PJ-IM-1`'s class `(10)` is NOT re-pinned** (it drives a duplicate pair whose first member HAS a value, and its cell says so — the new drive lands on `F-2`). **OWED to the TestWriter:** `F-2`'s added drive. |
| **6** | `M-9` (*"a `Object.freeze`d … spec (and a frozen nested spec object) … the result is correct"*) · `F-1` (a malformed spec entry ⇒ `malformed-spec`) · `§2.1`'s `VarSpec` field types (`name: string`, `unit: string`) · `§2.1`'s *"a spec without a name is malformed (`F-1`)"* | **A FROZEN ENTRY IS VALID AND APPLIED; A FROZEN NESTED OBJECT WHERE A `string` IS REQUIRED IS `malformed-spec` — the reading is CONFIRMED.** Freezing changes **no field value**, so a frozen `VarSpec` is read normally and **applied** (the observable: the key is an **own key of `applied`** with the exact expected string and appears in **no** `skipped` entry). A frozen **nested** object in the `name`/`unit` position is a non-string where `string` is required ⇒ **`malformed-spec`** (**the observable is the reason member itself**). **`M-9`'s own claim is "no strict-mode throw" over both shapes, and its "the result is correct" half is PER-SHAPE** — a row that asserts one shape's observable for the other **FAILS**. | **DECIDED** | **`§3.1 M-9`'s row TEXT is SPLIT AND PINNED** (per-shape observables (a)/(b) named, with the frozen `values` half unchanged) — **the as-written sentence is kept verbatim. `§2.5` item 5's freeze clause is CROSS-REFERENCED** (item 8's ruling). **`§5.5.1 P-PJ-TP-1`'s pool members `6`/`7` keep their no-throw-only assertion — the row is NOT re-pinned.** **OWED to the TestWriter:** `M-9`'s split drive. |
| **7** | `I-9` (*"never contains `NaN`/`Infinity`/`-Infinity` **or begins with `'-'`** (except a caller's own `unit`/`name` …)"*) · `§2.4` item 4 (`String(value)`) · `§2.4` item 3 / `F-5` (every negative is rejected before any string exists) · `M-17` | **OBSERVABLE RULED: the EXACT expected string per applied value, plus *"no applied value equals `'NaN'`/`'Infinity'`/`'-Infinity'`"* — the `'-'`-PREFIX HALF IS RETIRED AS A TEST.** The carve-out swallows every case: for **every** value whose stringification would begin with `'-'` (`-1`, `-Number.MIN_VALUE`) the module **produces no string at all** (`F-5`), so a `'-'`-prefix assertion can only fire on **a legitimate applied value produced by the caller's own `unit`/`name`** — i.e. only on the exempt case. **The clause cannot fail for the mutation it names, so it is not a row.** The carve-out's surviving scope: **a leading `'-'` is legitimate ONLY from caller-supplied `unit`/`name`, NEVER from the module's formatting of a number.** | **DECIDED** | **`§3.3 I-9`'s invariant cell is NARROWED** (the `'-'` half retired with that reason stated; the two assertable forms (1)/(2) written) — **the as-written clause is kept visible. `§5.5.1 P-PJ-IM-5`'s per-attempt assertion is CONFIRMED as already written this way** (exact strings + the three non-finite literals), **statement/strategy/attempts unchanged. `M-17`'s exact-strings clause is re-cited as the carrier.** **OWED to the TestWriter:** nothing beyond `P-PJ-IM-5`'s existing drives — the point of the ruling is that **no row may assert a bare `'-'`-prefix ban**. |
| **8** | `§2.5` item 5 (*"`Object.freeze` on the returned record is **permitted** … **a caller may rely on neither freezing nor non-freezing**"*) · `F-15` (*"a **frozen** `p` (`Object.freeze` on **the record and on `p` itself**) is also accepted without a throw"*) · `I-14` · `I-5`/`I-8` | **RULED PRECISELY, IN TWO STATEMENTS WITH DIFFERENT SUBJECTS.** **(i) The ROW's drive: the HARNESS freezes the caller's objects, SHALLOWLY** — `p.applied` (the record) and `p` (the projection), **one level each, nothing deeper** — before `applyProjection(p, sink)`, and **the module must not throw** (reading frozen objects is legal; the applier writes nothing into either, `I-14`). **The `skipped` ARRAY is NOT frozen**, and **a deep freeze is NOT a contract clause** (a later pass wanting one is proposing a different contract needing its own gate). **(ii) The MODULE may freeze its own return; the caller may rely on NEITHER** — no row asserts a returned record IS frozen, and none asserts it is not; **what a row asserts is that the applier works on frozen INPUT and that `p` is observably unchanged after the call.** | **DECIDED** | **`§2.5` item 5 gains the two-statement clause (i)/(ii)** (the as-written sentences kept verbatim), **`§3.2 F-15`'s frozen half is annotated with the same two statements. `§5.5.1 P-PJ-IM-8`'s shape `(10)` is CONFIRMED** (it freezes the record and the projection, shallowly, and asserts no throw) — **statement/attempts unchanged. OWED to the TestWriter:** `F-15`'s frozen drive written to the harness-freezes-shallowly form (not a module-freezing assertion). |
| **9** | `F-15`'s snapshot recipe (*"deep copy **and** `JSON.stringify`-with-null-prototype-aware comparison"*) · `§2.5` item 4 (`A-3`'s own words: `JSON.stringify` serializes an own `'__proto__'` as **data**, and re-parsing hands `__proto__` to the **parser**) · `§2.5` item 1/2 (`I-12`/`I-13`) · `M-19` · `I-4` · `I-14` | **THE FOUR OBSERVABLES ARE PINNED BY NAME, AND `JSON.stringify` IS NEVER THE COMPARISON.** The named recipe **cannot compare the object the row is about** (a null-prototype record holding an own `'__proto__'` cannot be round-tripped through `JSON.parse`), so it names **no executable comparison**. **The four, asserted before and after the call:** **(i) `Object.keys(p.applied)` — same own keys IN THE SAME ORDER;** **(ii) each value read by `Object.hasOwn(p.applied, name)` + index — same string per name** (dangerous names included: an own `'__proto__'` stays an own key); **(iii) `p.skipped` deep-equal BY VALUE** (order included); **(iv) `Object.getPrototypeOf(p.applied) === null` by identity** — **compared against a FRESH `project(values, specOf)` so `I-4`'s determinism rides the same four observables.** **`M-19`'s "`JSON.stringify` behaves normally" clause is a general serialization statement and does NOT license a round-trip comparison.** | **DECIDED** | **`§3.2 F-15`'s snapshot recipe is REPLACED** (the four named observables + the fresh-`project` comparison + the shallow-freeze cross-reference) — **the as-written recipe is kept visible with the reason. `§5.5.1 P-PJ-IM-8`'s per-attempt assertion block is CONFIRMED as the pinned form** (its strategy already says so; statement/attempts unchanged). **`M-19` is CROSS-REFERENCED** (its serialization clause does not override this recipe). **OWED to the TestWriter:** `F-15`'s re-pinned drive (four observables, no `JSON.stringify`). |
| **10** | `§2.1`'s `projectVar` signature (`written: string \| null`) · `M-10` (*"its `skip` is deep-equal … **or both `null`/absent**"*) · `M-3`/`M-4` (an empty `unit` and `format: 'number'` both produce short strings) · `M-16`/`M-17` · `§4.4 S-10` (presence/truthiness is not the contract) | **`written === null` IS THE ONLY "NOT WRITTEN" — AND `''` IS A LEGITIMATE WRITTEN VALUE.** The two fields are **mutually exclusive and exhaustive**: `{written: null, skip: {…}}` for a skipped key, `{written: <string>, skip: null}` for an applied one. **`written === ''` is a WRITTEN empty value and is NEVER produced when a skip occurred** (per `§2.4` item 4 the emitted string is `${value}${unit}` or `String(value)`, and **no non-negative finite number stringifies to `''`**, so `''` requires the caller's own `unit: ''` — `M-4`/`M-16`/`M-17` pin it). **A truthiness test on either field is wrong in one direction and is a review finding** (`S-10`'s class). | **DECIDED** | **`§2.1`'s `projectVar` doc block gains the pinned clause** (the `null` ⟺ `skip !== null` equivalence, `''` legitimate, never a truthiness test). **`M-10`'s row TEXT is DERIVABLE and is not re-pinned** (its clause already says *"or both `null`/absent"*; the annotation fixes the meaning of "absent"). **`§5.5.1` drives no `projectVar` row** — **its statement/strategy/attempts are untouched. OWED to the TestWriter:** `M-10`'s drive (exact equality on both fields, including the `unit: ''` case where `written === ''` **and** `skip === null`). |
| **11** | `§2.2` prohibitions **1** and **5** (each citing a row with no id) · `§1` item 3 (*"no vocabulary"*) · `§2.1` (*"**Eight exports**, and nothing else"*) · `§7` item 9 (*"`docs/skills/designing-pages.md` does not exist"*) · `A-13`'s probe · `A-16`'s sweep · `§4.4`'s own note (the class "the contract still OWES") · the architect's `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` ruling (`docs/decisions.md`) · `U-SLOTHOST`'s remanded `S-2`/`S-4` | **THE SHAPE IS RULED, IN FOUR PARTS — and the CONTRACT half and the TESTWRITER half are named separately.** **(a) The rows get ids:** prohibition 1's token scan ⇒ **`R-17`**, the forbidden-ACCESS half ⇒ **`R-18`**, prohibition 5's import row ⇒ **`R-19`**, the diff-scope row ⇒ **`R-20`**, the five-seam negative ⇒ **`R-21`** (which CITES the rows that already exist — `tests/engine-pin-version.test.ts` `R-15`/`R-15a`/`R-15b` — rather than re-authoring them), the export census ⇒ **`R-22`**, the absent-doc probe ⇒ **`R-23`** — landed in **`§3.4`/`§3.5`**; **nothing is renumbered** (the `R-` sequence extends the repo's own test ids; `S-1`..`S-11` are untouched; the four new stop conditions are **`S-12`..`S-15`**, appended). **(b) The static rows MUST close the ASSEMBLY and COMMENT evasions, exactly as `U-SLOTHOST`'s `S-2`/`S-4` now do** (accesses **rooted in a banned token or an alias of one** are the violation; a **blanket `[expr]` ban is NOT assertable** and is stated as a limit), **and the SCOPE is fixed so `A-13`'s probe stops colliding with its own home** — the module must not carry the words, **so the words live only in this spec's prose**; the scan reads the module's source **including comments** plus the unit's `[T]` fixtures. **(c) The five-seam census passes "unchanged" trivially** — the falsifiable half is the **import row (`R-19`) + the diff-scope row (`R-20`)**; the count is replaced by **set equality against NAMES** (`S-14`, `R-21`), and the existing `R-15` rows are cited as already name-complete. **(d) `§2.1`'s export count and `§7` item 9's absent-doc claim get PROBES** (`R-22`, `R-23`), and `§2.1`'s *"Eight exports"* is **reconciled** to the eleven names its own block declares (four values + seven types) rather than left as an uncited count. | **DECIDED** — the CONTRACT half is authored by this pass; **the ROW half is explicitly OWED to the TestWriter** (named, not implied) | **NEW `§3.4`** (`R-17`..`R-21`, each with its row TEXT, its layer and its stated limit) and **NEW `§3.5`** (`R-22`, `R-23`); **NEW `§4.4` stop conditions `S-12`..`S-15`**; **`§2.2` prohibition 1's `Pinned by` cell ⇒ `R-17`** (+ its scope/anti-evasion clause) and **prohibition 5's ⇒ `R-19`/`R-20`/`R-21`** (+ the half-vacuous-count correction); **`§2.1`'s export count RECONCILED**; **`§4.4`'s own "still OWES" note DISCHARGED**; **`§3a A-13` and `A-16` re-annotated with their ids**. **OWED to the TestWriter:** the drives of `R-17`..`R-23` (seven rows, all named above), including the positive/negative controls `R-17` requires and the "FAIL must be meaningful" probe form of `R-23`. **`§5.5.1` is NOT re-pinned** (attempts unchanged — no register row covers a static scan). |

**The gate's ambiguity list is therefore EMPTY: `11` items ruled, `0` OPEN QUESTIONS, and every one of
the eleven names the row TEXT (`§3`/`§3.4`/`§3.5`/`§5.5.1` or a new stop condition) that follows from
it.** **Two rulings are reported as `CONTRACT-AMENDED` because they change what a `§3` row asserts —
items 2 and 3** — and **every amended cell keeps its as-written words visible with the date and the
reason** (`H-r1`); **the rest are clarifications, scopings or pinning of an observable, and NONE
weakens, widens or re-scopes a `§3` row's DRIVE.** **`§5.5.1`'s HONESTY BLOCK, item 5 —
the clause *"no register row resolves an ambiguity"* — is superseded on one half** (`§5.5.1`: a row **may** now be read as resolving the half `§7a.1` rules, because the ruling
is contract text — **but no register statement, type, strategy id, attempt count or the `231` total
changes**, and this pass adds **no** register row). **No section number moves** (`§7a.1` is a
sub-heading of `§7a`; `§3.4`/`§3.5` add subsections where none existed; `S-12`..`S-15` and `R-17`..
`R-23` are appends). **What is still owed, stated so it is not implied: the unit's red set — RUN and
REPORTED — which now means the `§4.2` item 1 order PLUS the seven static/existence rows' drives**
(`§3.4`/`§3.5`). **This pass ran no test, no leg and no trio, and authored no red row.**

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **NOT THIS UNIT** = another unit's contract
or a closed elsewhere row — listed so no later pass routes it here. **CORRECTED** = a source
statement this spec had to amend to be contract-complete; **where a `CORRECTED` row also carries
`ARCHITECT-APPROVED (2026-09-27)`, the amendment is the architect's ruling, not this filing's
proposal** (§7 item 5, the `U5` row below).

| Source row | Section | Status for `U-PROJ` | Where |
| --- | --- | --- | --- |
| `SCH-8`'s **projection half** (`project` + the total applier) | amendment §2.2's `SCH-8` row, §2.1 | **ADOPTED — this unit** | §1, §2 |
| `SCH-8`'s **`computeTrackVars(census, …)` half** | amendment §1.2; `docs/next-steps.md` row **E2** | **NOT THIS UNIT — `U-CENSUS`, wave E** (its refile is WITHDRAWN, so it is *adopted*, not refiled — but **by another unit**) | §0 ruling 1, §1, §7 item 2 |
| **Purity** (same input ⇒ same output, no environment read) | amendment §2.2's acceptance line | **DISCHARGED** as `I-4` + `M-9` | §2.4, §3.3 |
| **Totality** (every input yields a write-or-skip decision, never a throw, never a partial write) | amendment §2.2's acceptance line; the `U5` plan row | **DISCHARGED** as `I-1`/`I-2`/`I-3`/`I-7` + `F-1`..`F-15` (**⟶ CORRECTED 2026-09-27: the range endpoint moved from `F-11` to `F-15`, the ruling pack's `F-12`..`F-15` belonging to the same no-throw drive**) | §2.3, §3.2, §3.3 |
| **The non-finite/out-of-range fail-soft pin** (the fork's F-2 generalized: no `NaN`/`Infinity`/negative in the returned map) | the `U5` plan row's red-set bullet | **DISCHARGED** as the validity rule + `I-9` + `A-1` | §2.4 item 3, §3.2 **`F-4A`**/`F-5` (**⟶ CORRECTED 2026-09-27: `F-4` is the split `F-4A`/`F-4B`; the numeric bound is `F-4A`'s**) |
| **"`applyVarsToRoot` returns exactly the map it applied"** | the `U5` plan row's red-set bullet | **DISCHARGED** as `applied`'s **write-LOG** meaning (`I-3`) **and** the identity alias `M-14` | §2.1, §2.3 item 2 |
| **"the `computeTrackVars(census, …)` half is absent"** | the `U5` plan row's red-set bullet | **DISCHARGED as a structural absence** (parameter list + static import row) | §2.4 item 6, `A-12`, `A-15` |
| **Variable names and units from the consumer's supplied spec** (`(C)#1`-clean) | amendment §2.2's `SCH-8` row | **DISCHARGED** as `VarSpec` (all four fields caller-supplied) | §2.1, §2.2 (prohibitions 1/3) |
| **An injected write sink; the mechanism owns no root and no store** | amendment §2.2's `SCH-8` row; §"Adopted units' security / equivalence obligations" | **DISCHARGED** as `VarWriteSink` (duck-typed, caller-supplied) + `I-5`/`I-6` | §2.1, §2.3, §2.2 (prohibition 4) |
| **`H-r17`'s "no zone vocabulary anywhere" clause, naming `U-PROJ`** | `H-r17` | **DISCHARGED** as prohibition 1 + `A-13` + `A-18` | §2.2, §7 item 4 |
| **Token formatting delegated to `U-ZONES` (one authority, not two)** | amendment §1.1/§1.2 | **NOT THIS UNIT's delegation** — it binds the **census family**; this unit formats from caller `VarSpec` data and imports nothing | §0 ruling 5, §7 item 3 |
| **The `'0px'`-family literal prohibition** | amendment §1.1 (`U-ZONES`) | **NOT THIS UNIT** — but the **same prohibition-3 discipline** applies here (no built-in token) | §2.2 (prohibition 3), `M-8` |
| **`H-r8`'s six-prohibition block** | `S-d8`, `H-r8` | **DISCHARGED** as a six-row assertion table | §2.2 |
| **The amendment's "no new MCP surface" / no-store / no-CSP-change rows** | amendment §"Adopted units' security / equivalence obligations" | **DISCHARGED** as the five-seam negative + prohibition 4 | §2.2, `A-16` |
| **`REAL-DOM-UI-GATE-LEG`** (the third leg; the shim demoted to pre-filter; the preferred measurement channel) | `docs/decisions.md:65`, read | **CARRIED** — the optional `[U]` row uses the leg's **existing** channel and makes **no** app-green claim | §5.2, §7 item 6 |
| **`U-REALDOM-BOOT`'s honest limits (`R4`/`§1.13`)** | amendment §1.13 | **CARRIED verbatim-in-substance** as §7 item 6 | §5.2, §7 item 6 |
| **`H-r19`'s hermeticity truth** (isolation YES, headlessness NO, declared with an actionable failure) | `H-r19` | **NOT THIS UNIT's deliverable**, but **binding if the `[U]` row is taken**: no `DISPLAY` ⇒ a prerequisite error naming the fix, never a silent skip | §5.2 |
| **`H-r5` / `S-d3`** (no shim expansion) | `H-r5`, `S-d3`, `H-r7` | **INHERITED-ONLY** — and for this unit it is **stricter**: the shim may not gain `setProperty` | §1, §4.4 `S-2`, `A-17`, §7 item 10 |
| **`RK-10`** (`C-16`: contracts reverse-engineered from ONE consumer) | amendment §6 | **CARRIED** — §7 items 7/8 are this unit's answer: **ten recorded contract decisions and ZERO unruled seeds** (**⟶ CORRECTED 2026-09-27: this cell read "four deliberately-unruled seeds"; all four were RULED by the architect's 2026-09-27 ruling pack, so the unruled count is ZERO and the decision count is UNCHANGED at ten**) | §7 items 7–8, §0A |
| **`RK-19`** (geometry unprovable here; the node layer asserts contracts/arithmetic only) | amendment §6 | **CARRIED** — §7 item 10 + `A-20` are this unit's compliance rows | §7 item 10, `A-20` |
| **`RK-16`** (a mis-sequenced census change turns a green suite red) | amendment §6 | **NOT THIS UNIT** (`U-FOCUS-TOOL`'s) — but its **false-green reading class** is `A-20`'s | `A-20` |
| `docs/specs/engine-pin.md` §5.5's register (incl. `P-SM-2`) | that file | **NOT THIS UNIT** — the register is not extended, and `P-SM-2` is **not copied** (a second authority over a landed register is a finding) | §5.5 item 4 |
| This unit's **own** register (`§5.5.1`, 2026-09-27) | `docs/specs/projection.md` `§5.5` | **RE-DERIVED — the recorded zero-row exemption is SUPERSEDED** under the architect's gate-11 ruling (ACTIVE row `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, `docs/decisions.md`; follow-ups in `docs/pending.md` §G, whose `U-PROJ` row records this re-derivation as BLOCKING for this unit's red set only). **8 typed rows** `P-PJ-*` (7 `P-IM` + 1 `P-TP`), **`231` attempts**, **pinned seed `20260927`**, caps `≤100`/row · `≤400` total · stop-after-5; **no new dependency, no `fast-check`, no `F-` register row.** The exemption is kept byte-identical as `§5.5.0`; the pilots are `docs/specs/listhost.md` `§5.5.1` and `docs/specs/slothost.md` `§5.5.1` | §5.5 (banners), §5.5.0, §5.5.1, §5.3 item 10, §4.2 item 1, Layer declaration (fourth anchor) |
| Row **D4** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: its spec cell reads `docs/specs/projection.md` (**OWED — not filed**) — **this filing discharges that cell**; the row stays `BLOCKED`, and its *"`U-CENSUS` is separate"* clause is §7 item 2 | this file — **⟶ AND AS OF 2026-09-27 (the `§5.5` RE-DERIVATION pass) THE CELL'S STATUS HALF IS SPENT: the spec cell is `FILED 2026-09-27`, the wave-D order is SATISFIED (`U-LISTHOST` and `U-SLOTHOST` are `DONE` — the ledger's FIFTH and SIXTH `DONE` rows), the counts are `6 DONE / 14 open`, the row is the LAST wave-D unit and the NEXT in the order, and its gate-11 blocker (`docs/pending.md` §G) is discharged by `§5.5.1` — so the ONLY thing `D4` still waits on is this unit's own `TestWriter red` set. Reconciling the tracker row itself is the SUPERVISOR's pass, not this one.** |
| Row **E2** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table | **NOT THIS UNIT** — `U-CENSUS`'s own row, whose spec is `docs/specs/census.md` (`OWED — not filed`) | §0 ruling 1, §4.3 |
| `docs/specs/projection.md`'s entry in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** | this file |
| This unit's **own `§7a` ambiguity report** — the **eleven** clauses a TestWriter could not derive a falsifiable row from (2026-09-27, the `§5.5` re-derivation pass) | this file's `§7a` as written 2026-09-27 | **RESOLVED BY RULING — `§7a.1` (the `§7a` RULING pass, 2026-09-27): `11` items ruled from the contract's own clauses, `0` OPEN QUESTIONS, and each ruling names the row TEXT it produces.** **TWO are `CONTRACT-AMENDED` and reported as such** (`M-13` vs `F-10`'s coercion boundary, `§7a` item 2; `F-9`'s dropped entries vs `I-10`'s `ok`, `§7a` item 3), **every amended cell keeping its as-written words visible**; the other nine are clarifications, scopings or a named observable (`I-9`'s `'-'` half retired, `F-15`'s four pinned observables, `projectVar`'s `null`-vs-`''`, the malformed-projection/sink asymmetry, the duplicate-collision rule, `M-9`'s per-shape split, the shallow-freeze pair, the non-record-`values` reason, and the static/existence row shape). **The report itself is kept visible** (annotate-never-rewrite). **The delegation gate's ambiguity condition is therefore EMPTY (`AGENTS.md` item 9); what remains is the red set itself, RUN and REPORTED.** | §7a (verbatim report), **§7a.1** (the rulings), §2.1, §2.2 prohibitions 1/5, §2.3 items 1/4, §2.4 items 2/3/5 + the `M-13`/`F-10` boundary note, §2.5 item 5, §3.1 `M-9`/`M-13`, §3.2 `F-9`/`F-10`/`F-11`/`F-15`, §3.3 `I-2`/`I-9`/`I-10`, **§3.4**/`§3.5`, §4.4 `S-12`..`S-15`, §5.5.1 (honesty item 5), §7 items 9/10 |
| **The `U-PROJ` RED-SET REPAIR pass's four pins** — the implementer's stop and the four SPEC-LEVEL gaps it exposed (2026-09-27) | this file's `§2.4`/`§2.5`/`§3.1`/`§3.2`/`§3.4`/`§7` as they stood before this pass; the landed module `src/shared/layout-projection.ts` (read this pass) and the red set `tests/layout-projection.test.ts` (read this pass) | **PINNED, as the CONTRACT's own reading — `47` of the red set's `70` rows are test-side and `4` causes are spec-level; the four are now text rather than inference.** **(1) THE VALUE-LOOKUP KEY RULE:** the `specOf` map's own key supplies the lookup key, read as an **own property of `values`**; a `VarSpec.name` is the EMITTED name only; a prototype-shaped name means nothing for the lookup — the NAME reading is **REJECTED because it would supersede `M-1`/`F-3`/`F-11(b)`/`P-PJ-IM-2`** (§2.4 item 3's key clause, §2.5 item 2's `values` bullet, `M-1`/`F-3`/`F-13` annotations). **(2) THE `skipped` ORDER:** the projection's list is **spec-entry order** (never reason-grouped), and the applier's is **its own refusals first, then the carried entries in input order**, never re-sorted — **`§2.4` item 8, the `skipped`-order rule** — **the list's SECOND `item 8`, APPENDED rather than renumbered so the pre-existing `§2.4` item 8 (immutability) keeps its number and every citation to it** (`ORDER-1`; `F-2` **`CONTRACT-AMENDED`**, `F-12`'s order pinned). **(3) `'accessor-threw'`'s TRIGGER:** an **own accessor whose READ throws**; a function VALUE is `not-a-number` and the module **never invokes a caller function**; an absent key is `missing-value`; the admissible path is the own-property test plus ONE `try`/`catch` read (or an `Object.getOwnPropertyDescriptor`-style read) — `A-2`'s substance UNTOUCHED (§2.4 item 3, `F-4A`/`F-4B`). **(4) `R-17`'s SCAN SCOPE:** module source (raw + assembled + comments) is the whole claim; the FILE half is scoped to the fixtures the row controls; a **word/identifier-BOUNDARY rule** is added so ordinary words are not violations — row text **`CONTRACT-AMENDED`**, drive **OWED to the TestWriter** (§3.4 `R-17`; §7 item 13 (i)). **No section number moved, no clause was deleted, no tracker was edited and no test was run by this pass.** | §2.4 items 3/8, §2.5 item 2, §3.1 `M-1`, §3.2 `F-2`/`F-3`/`F-4A`/`F-4B`/`F-12`/`F-13`, §3.4 `R-17`, §5.5.1 item 4, §7 item 13 (i), the header's SIXTH STATUS NOTE |
| **The static/evasion class — `§2.2` prohibitions 1 and 5's unenumerated rows, and the two unchecked repo claims** (the `§4.4` note's "the contract still OWES") | `H-r8`/`H-r17`; `A-13`/`A-16`; `§1` item 3; `§2.1`; `§7` item 9; **the architect's `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` ruling (`docs/decisions.md`) and `U-SLOTHOST`'s remanded `S-2`/`S-4`** | **RULED, ID'D AND SCOPED 2026-09-27 (`§7a.1` item 11): the rows are `R-17`..`R-21` (`§3.4`, static) and `R-22`/`R-23` (`§3.5`, existence); the class's stop conditions are `S-12`..`S-15` (appended, no renumbering); the `§2.2` prohibition-1 scan is SCOPE-FIXED (module source + its comments + the unit's fixtures — the words live only in THIS spec's prose, so `A-13`'s probe no longer collides with its own home) and CLOSED AGAINST ASSEMBLY AND COMMENT-CARRYING** (the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` rule: *a static prohibition satisfiable by splitting a token is not satisfied*), **with the `[expr]` LIMIT STATED** (accesses rooted in a banned realm token or an alias of one; a blanket ban is not assertable) **and the count-vs-set rule (`S-14`) replacing the half-vacuous census**. **The seven rows' DRIVES are OWED to the TestWriter** — their TEXT, ids and limits are contract text as of this pass (`§3.4`/`§3.5`). | §2.2 prohibitions 1/5, §2.1 (the export count reconciled), **§3.4**, **§3.5**, §4.4 (`S-12`..`S-15` + the discharged note), §7 item 9, §3a `A-13`/`A-16`, §7a.1 item 11 |
| **The `U5` plan row's `project(values) → record` form** | the amended unit plan (`U5`) | **CORRECTED — AND THE CORRECTION IS NOW ARCHITECT-APPROVED (2026-09-27)**: this spec's signature is `project(values, specOf)`, and the plan's single-argument form is `SUPERSEDED` (kept as the source text, not deleted), because a projection cannot obtain caller-supplied names/units without a spec argument (§7 item 5). The approval is recorded as this row + §7 item 5 + the `PROJECTION-SIGNATURE-TWO-ARGUMENTS` ACTIVE row in `docs/decisions.md` (its note 16) + the gate record's dated ruling note (its `SCH-8` row, `provident-electron-shell-chrome-handoff-review.md:291`) | §2.1, §7 item 5 |
| **Seed `A-11`** (is a `Projection` single-use or reusable?) — §3a's seed set | §3a, §7 item 8 (**pre-ruling: UNRULED**) | **RULED (2026-09-27) — a `Projection` is REUSABLE: a value, not a session.** Discharged as **`I-11`** + §2.3 item 1 + `M-21`/`M-22`; it **follows from** `A-7` and is **consistent with** `I-5`/`I-8` | §0A note 1, §3.3 `I-11`, §3.1 `M-21`/`M-22` |
| **Seed `A-2` / `F-4`'s throwing getter** (does the accessor's throw propagate?) — §3a's seed set | §3a, §3b, §7 item 8 (**pre-ruling: UNRULED; §3b named it a `CONTRACT-AMENDED` candidate**) | **RULED (2026-09-27) — the throwing accessor is SKIPPED and RECORDED, NEVER propagated.** The spec chose the **eighth** union member **`'accessor-threw'`** over reusing `'not-a-number'` (which would **silently conflate** *"not a number"* with *"could not read it"*); discharged as the **7 → 8 vocabulary change** (§2.1/§2.2/§2.4 item 3), the **`F-4` SPLIT** into `F-4A`/`F-4B`, **`F-12`**, and §8's totality-range correction (`F-11` → `F-15`) | §0A note 2, §2.1, §2.2 prohibition 1, §2.4 item 3, §3.2 `F-4A`/`F-4B`/`F-12` |
| **Seed `A-3`** (the prototype-pollution-shaped key — does the record need a null-prototype?) — §3a's seed set | §3a, §3b, §7 item 8 (**pre-ruling: UNRULED**) | **RULED (2026-09-27) — `Object.create(null)` for `Projection.applied`, `ApplyResult.applied` and every internal key→value map**, with every caller-data key lookup an **own-property** lookup. The analysis + the four rejected alternatives are §0A note 3; the rules are **§2.5**; discharged as **`I-12`/`I-13`** + `F-13`/`M-18`/`M-19`/`M-20`; **no new skip reason and NO name-legality policy** (names are caller data — prohibition 3) | §0A note 3, §2.5, §3.3 `I-12`/`I-13`, §3.1 `M-18`/`M-19`/`M-20`, §3.2 `F-13` |
| **Seed `A-7`** (sink re-entrancy) — §3a's seed set | §3a, §3b, §7 item 8 (**pre-ruling: UNRULED**) | **RULED (2026-09-27) — SKIP: the projection is IMMUTABLE INPUT and NO re-entrancy guard is held.** A consumer wanting different writes builds a **NEW** projection; a re-entrant `setProperty` yields **call-local** results per `I-5`/`I-8`/`I-11`; **no ordering hazard the invariants do not cover was found, so nothing is owed** — and the seed is discharged as **`CONFIRMED-RULED`** (§3b) with an explicit `BLOCKING` escalation path if that ever changes. Discharged as **`I-14`** + §2.3 item 8 + `F-14`/`F-15` | §0A note 4, §2.3 item 8, §3.3 `I-14`, §3.2 `F-14`/`F-15`, §3b |
| **§3a's seed set as a whole** (`A-1`..`A-20`) | §3a (**the pass has NOT run**) | **THE FOUR UNRULED CONTRACT-INPUT SEEDS ARE RULED, AND NO CONTRACT-INPUT SEED REMAINS UNRULED.** What is still **OWED is the adversarial PASS itself** — it runs **after this unit's green** (RCA-3) and must re-check the four against the **landed module**, fill §3b, and record any **new** finding for the remaining behaviour seeds (`A-1`, `A-4`..`A-6`, `A-8`..`A-10`, `A-12`..`A-20`), which are **questions for a pass, not contract decisions awaiting a ruling** | §3a, §3b, §7 item 8 |

**Cross-file citation findings this pass found and did NOT fix (not this unit's files; report, do not
silently reconcile).** Each was read in this pass:

| Claim as written | Verified state (read 2026-09-27) |
| --- | --- |
| `package.json:23` = the `provident-ssr` pin (`docs/decisions.md` note 2 at `:322`, and several spec/queue cells) | **STALE.** `:23` is `@modelcontextprotocol/sdk`; **`"provident-ssr": "^0.5.1"` is at `:24`**. `docs/decisions.md`'s own note 2 cites the stale anchor **in the same sentence** that corrects its substance |
| `package.json:25-31` / `:25-31` = the `devDependencies` block (`docs/decisions.md` note 2 at `:334`; the `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED` row at `:101`) | **STALE as a range.** `"devDependencies"` opens at **`:26`**; the **five** keys run **`:27`-`:31`**; `:32-34` is the installer-owned `allowScripts` block |
| `package.json:18` = the `divergence` script, and "`battery:17`/`divergence:18`" (amendment §1.11; `REAL-DOM-UI-GATE-LEG` at `docs/decisions.md:65`) | **VERIFIED for `:18`**; the same sentence's **`ui` leg is at `:19`** — this spec cites **`:19`** for `npm run ui` and does not repeat the pair's `:17`/`:18` shorthand without the read anchor |
| `src/decisions`-style anchors for `MUTATING_METHODS` (the amendment's prohibition-5 family) | **STALE.** The set is at **`src/renderer/renderer.ts:12`**, not in `src/main/mcp-server.ts` — seven members, read |
| `src/shared/types.ts:259-280` (`RpcMethod`, **21** members) | **VERIFIED in substance** — the union is `:259-281`, **21** members; `RpcRequest` begins at `:282` |
| `src/main/mcp-server.ts:281-303` (`ALL_TOOLS`, **21** names) | **VERIFIED** — declared `:281`, 21 names `:282-302`, closed `:303` |
| `tests/engine-pin-version.test.ts:174-197` (the `RpcMethod` census, asserted **21**) | **VERIFIED** — `RPC_METHOD_CENSUS` `:174-196`, `expect(…).toBe(21)` at `:197` |

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor cited
above was **read in this pass** (`src/main/security.ts:134`; `src/shared/types.ts:259-281`;
`src/renderer/renderer.ts:12`; `src/main/mcp-server.ts:281-303`; `src/shared/dom-shim.ts` — 143
lines, `:9`; `package.json:10`, `:19`, `:24`, `:26-31`; `tests/engine-pin-version.test.ts:174-197`;
`docs/decisions.md:53`, `:54`, `:65`, `:101`, `:294`, `:322`, `:334`). **`docs/next-steps.md` is
cited by row id only** — that file's own convention forbids line citations.

**Citation hygiene — the RULING-PACK pass (2026-09-27), stated separately so the two passes stay
auditable:** the anchors this pass **re-read and added** are `src/shared/dom-shim.ts:9` (re-read:
`style: { cssText: string }`, no `setProperty` — the M-20/§2.5-item-6 contrast rests on it),
`package.json:8-21` (the scripts block — `ui` at `:19`, `divergence` at `:18`),
`package.json:22-35` (**`"dependencies"` opens `:22`; `:24` = the `provident-ssr` pin; `:26-31` =
`devDependencies`' key set, five keys; `:33-35` = `allowScripts`**), and a **glob over
`docs/skills/*`** for the page-design layer (§7 item 9, §8's second archival-loop check). **Every
`docs/decisions.md` citation this pass relied on** (`:230`, `:231`, `:233`, `:235`, `:301-413` — the
insertion notes and the amendment list) was **read directly**; **the four new ACTIVE rows and note 17
are appended so that no previously cited `docs/decisions.md:<n>` anchor moves.**

**Archival-loop check (`AGENTS.md` item 6): the FILING archived, moved and repointed NOTHING.** It
creates one new spec file and edits no existing document. **Row D4's spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded so the staleness
is attributable rather than silent. **⟶ FLIPPED 2026-09-27 (the handover-staleness pass): `D4`'s spec cell
now reads `FILED 2026-09-27`**, so the sentence above describes the filing pass's own state and nothing current.

**Archival-loop check, SECOND pass (`AGENTS.md` item 6 — this is the 2026-09-27 RULING-PACK pass, and
the sentence above is kept as the FILING pass's record). This pass edits exactly TWO files and creates
nothing:** this spec (`docs/specs/projection.md` — the four rulings landed in §0's table + the new
**§0A**, §1, §2.1, §2.2, §2.3, §2.4, **§2.5**, §3.1, §3.2, §3.3, §4.2, §4.4, §5.5, §6, §7 items 7/8,
§8 and §3a/§3b) and **`docs/decisions.md`** (the four new ACTIVE rows + trailing **note 17** in its
`AMENDMENTS TO PRE-EXISTING ACTIVE ROWS` list). **No third document was touched** — `src/**`,
`tests/**`, `scripts/**`, `docs/next-steps.md`, `docs/pending.md`, `docs/defects.md`,
`docs/HANDOFF.md` and the governing gate record are **untouched by this pass**, so **nothing is
archived, moved or repointed**, and **every `docs/decisions.md:<n>` citation in this file still
resolves** (the new rows are **appended after the last cited anchor**, per that file's own insertion
note — the same rule the `INSERTION NOTE` and `SECOND INSERTION NOTE` state). **`docs/next-steps.md`
is still cited by row id only.** **`docs/skills/designing-pages.md` still does not exist** (globbed
again this pass: `docs/skills/*` → `process-guardrails.md` alone), so the page-design layer, its
test-use-case coverage matrix and its demo-page index have **nothing to update** (§7 item 9). **The
one staleness this pass could NOT fix, restated because it is now older:** `package.json:25-31` is a
**stale range for `devDependencies`** — re-read this pass, `"devDependencies"` opens at **`:26`** and
the five keys run **`:27`-`:31`** (`:23` = `@modelcontextprotocol/sdk`, **`:24`** = the `provident-ssr`
pin) — and §5.5's own anchor cites it; **this spec quotes `:26-31` where it must, and the stale range
stands in the other documents, which are not this pass's to edit** (report, do not silently
reconcile).

**Archival-loop check, THIRD pass (`AGENTS.md` item 6 — this is the 2026-09-27 `§5.5`
RE-DERIVATION pass, and the two blocks above are kept as the FILING and RULING-PACK passes' own
records). This pass edits exactly ONE file and creates NOTHING:** `docs/specs/projection.md` only —
the §5.5 banners and the new **`§5.5.0`/`§5.5.1`**, the **`§7a`** report, and the cells this pass
reconciled (§0 ruling 8/9, the status notes, the Layer declaration's fourth anchor, §3.3's
register-relation note, §4.2 item 1, §4.5, §5.3 item 10 and the numbering-gap note, §6, §7 item 1,
§8 and §3a's `A-13`/`A-16` annotations). **`docs/decisions.md` and `docs/pending.md` are NOT edited
by this pass** — unlike the ruling-pack pass — because the gate-11 ruling row and the §G follow-up
already exist and **discharging the §G cell is the supervisor's pass** (`docs/pending.md` §G's
`U-PROJ` row is cited here by row name, never by line). **No third document was touched**, so
**nothing is archived, moved or repointed**, and **every `docs/decisions.md:<n>` citation in this
file still resolves**; **`docs/next-steps.md` is still cited by row id only.** **`docs/skills/designing-pages.md`
still does not exist** (the glob is not re-run by this pass: the spec-text pass has no shell, and the
LAST recorded glob — the ruling-pack pass's `docs/skills/*` → `process-guardrails.md` alone — is the
evidence, which is exactly why §7a item 11 asks for an existence row rather than a repeated claim),
so the page-design layer, its test-use-case coverage matrix and its demo-page index have **nothing to
update** (§7 item 9). **The `package.json:25-31` stale range is UNCHANGED by this pass and is still
NOT fixable here** (the other documents are not this pass's to edit; report, do not silently
reconcile) — and **`package.json` itself was not re-read by this pass**, so this pass adds no new
anchor claim about it; the `:26-31` form §5.5 quotes is the last re-read form on the record.

**Archival-loop check, FOURTH pass (`AGENTS.md` item 6 — this is the 2026-09-27 `§7a` RULING pass, and
the three blocks above are kept as the FILING, RULING-PACK and `§5.5` RE-DERIVATION passes' own
records). This pass edits exactly ONE file and creates NOTHING:** `docs/specs/projection.md` only —
the header's FIFTH STATUS NOTE, §2.1 (`projectVar`'s pinned clause + the export count reconciled), §2.2
prohibitions 1/5, §2.3 items 1/4, §2.4 items 2/3/5 and the new `M-13`/`F-10` boundary note, §2.5 item
5, §3.1 `M-9`/`M-13`, §3.2 `F-9`/`F-10`/`F-11`/`F-15`, §3.3 `I-2`/`I-9`/`I-10`, the new **`§3.4`**/
**`§3.5`**, §4.4 (`S-12`..`S-15` + the discharged note), §5.5.1's honesty item 5, §6, §7 items 9/10,
the new **`§7a.1`** and its annotation of §7a's closing paragraph, §8 (two rows) and §3a's
`A-13`/`A-16` annotations. **`docs/decisions.md`, `docs/pending.md`, `docs/next-steps.md`, `docs/defects.md`
and `docs/HANDOFF.md` are NOT edited by this pass** — the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` ruling
this pass CITES already exists there, and **reconciling the trackers is the SUPERVISOR's pass** (both
files are cited here by ROW NAME, never by line; **`src/**`, `tests/**`, `scripts/**` and
`package.json` are untouched, and this pass ran no test, no leg and no trio**). **No third document was
touched**, so **nothing is archived, moved or repointed**, and **every `docs/decisions.md:<n>` citation
in this file still resolves** — this pass **adds no `docs/decisions.md:<n>` anchor** and cites the
`SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` row by NAME. **`docs/next-steps.md` is still cited by row id
only.** **`docs/skills/designing-pages.md` still does not exist** (the glob is **not** re-run: this
pass also has no shell, and the LAST recorded glob — the ruling-pack pass's `docs/skills/*` →
`process-guardrails.md` alone — remains the evidence), so the page-design layer, its test-use-case
coverage matrix and its demo-page index have **nothing to update** (§7 item 9) — **and this pass is the
one that turns that claim into a PROBE row, `R-23` (`§3.5`), so the next pass that CAN glob falsifies it
rather than repeating it.** **The `package.json:25-31` stale range is UNCHANGED by this pass and is still
NOT fixable here** (the other documents are not this pass's to edit; report, do not silently reconcile)
— and **`package.json` itself was not re-read by this pass**, so this pass adds no new anchor claim
about it; the `:26-31` form §5.5 quotes is the last re-read form on the record. **One anchor this pass
DID read, recorded so it is not mistaken for a stale claim: `tests/engine-pin-version.test.ts:102-166`
and `:169-210`** (the `R-15`/`R-15a`/`R-15b` seam rows and the shim row), cited by `§3.4 R-21` and
`§2.2` prohibition 5 as **already name-complete**.

**Archival-loop check, FIFTH pass (`AGENTS.md` item 6 — this is the 2026-09-27 `U-PROJ` RED-SET REPAIR
pass, and the four blocks above are kept as the FILING, RULING-PACK, `§5.5` RE-DERIVATION and `§7a`
RULING passes' own records). This pass edits exactly ONE file and creates NOTHING:** `docs/specs/projection.md`
only — the header's **SIXTH STATUS NOTE**, `§2.2` prohibition 1's scope clause, **`§2.4` item 3** (the
value-lookup key clause and the `'accessor-threw'` trigger clause) and **`§2.4` item 8** (the new
`skipped`-order rule), §2.5 item 2's `values` bullet, §3.1's `M-1`, §3.2's `F-2` (+ `ORDER-1`), `F-3`,
`F-4A`, `F-4B`, `F-12`, `F-13`, **`§3.4 R-17`** (amended row text + the boundary rule), §5.5.1 strategy
item 4 (the register-untouched confirmation), §7 item 13 (i) and the new **§8** index row. **`docs/decisions.md`,
`docs/pending.md`, `docs/next-steps.md`, `docs/defects.md` and `docs/HANDOFF.md` are NOT edited by this
pass**, and neither is `src/**`, `tests/**`, `scripts/**` or `package.json`: **the module and the red set
were READ (not modified) as this pass's evidence** — the implementer's landed
`src/shared/layout-projection.ts` and the `70`-row red set `tests/layout-projection.test.ts` — and
**reconciling the trackers is the SUPERVISOR's pass** (both files are cited here by ROW NAME, never by
line). **No third document was touched**, so **nothing is archived, moved or repointed**, and **every
`docs/decisions.md:<n>` citation in this file still resolves** — this pass **adds no `docs/decisions.md:<n>`
anchor** and cites the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` row by NAME. **`docs/next-steps.md` is still
cited by row id only.** **`docs/skills/designing-pages.md` still does not exist** (the glob is **not**
re-run: this pass has no shell, and the LAST recorded glob — the ruling-pack pass's `docs/skills/*` →
`process-guardrails.md` alone — remains the evidence), so the page-design layer, its test-use-case coverage
matrix and its demo-page index have **nothing to update** (`§7` item 9), whose probe row is `R-23`.
**The `package.json:25-31` stale range is UNCHANGED by this pass and is still NOT fixable here** (the other
documents are not this pass's to edit; report, do not silently reconcile) — and **`package.json` itself was
not re-read by this pass**, so this pass adds no new anchor claim about it. **This pass ran no test, no leg
and no trio, and ran no `git commit`.**

## 3a. Adversarial findings — **the pass has NOT run**

**Status as filed: `OWED`. No adversarial pass has run for `U-PROJ`** (this pass is the spec-filing
pass; the unit is BLOCKED on its go-ahead and its red set, so there is no green to review — RCA-3
runs *after* a unit's green). **This table is the SEED SET for the pass that will run; no row below
is a finding, and none may be cited as one.** **⟶ UPDATED 2026-09-27 (the architect's ruling pack): the
four seeds that were *contract inputs awaiting a ruling* — `A-2`, `A-3`, `A-7`, `A-11` — are now
marked in place as RULED, with the clause each ruling landed in named. That marking does NOT discharge
the adversarial pass**: the pass still runs after the green and re-checks each of the four against the
**landed module**, records its disposition in §3b, and examines the **remaining** behaviour seeds
(`A-1`, `A-4`..`A-6`, `A-8`..`A-10`, `A-12`..`A-20`), which are **questions for a pass rather than
contract decisions awaiting a ruling** (§7 item 8, §8's last ruling row).

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | **The numeric boundary table, exhaustively:** `NaN`, `±Infinity`, `-Infinity`, `-0`, `0`, `Number.MIN_VALUE`, `Number.MAX_VALUE`, `1e21`, `1e-21`, a `BigInt`, a numeric string, a `Symbol`, a function. Does **any** of them put a non-finite or negative string into `applied`? | `[T]` |
| **A-2** | **A getter that throws** and a **frozen** `values` object with an accessor — does `project` propagate, swallow, or corrupt? **⟶ RULED 2026-09-27 (architect's ruling pack, §0A note 2): CAUGHT PER KEY and recorded as the EIGHTH skip reason `'accessor-threw'` — the throw is NEVER propagated, one bad key never aborts a projection (§2.4 item 3, `F-4B`/`F-12`). The pre-ruling text of this seed — *"`F-4` is deliberately unpinned on this; the pass must rule it and record the ruling here"* — is SUPERSEDED: `F-4` is now SPLIT into `F-4A`/`F-4B` and the behaviour is PINNED. The pass that runs after the green re-checks the ruled behaviour against the landed module and records the disposition in §3b.** | `[T]` |
| **A-3** | A prototype-polluting key (`'__proto__'`, `'constructor'`, `'prototype'`) as a **spec key** and as a **`name`** — does the projection's record become a polluted object, or is the write emitted normally? **⟶ RULED 2026-09-27 (§0A note 3): the record is built on `Object.create(null)` (`I-12`/`I-13`, §2.5) — every caller-supplied name is an OWN key, no prototype is written, and `I-1`'s partition holds (`F-13`/`M-18`/`M-19`/`M-20`). The analysis and the rejected alternatives are §0A note 3; the pass re-checks the LANDED record.** | `[T]` |
| **A-4** | A **huge** spec set (10⁴ keys) — any quadratic path, and is the order still deterministic? (A **performance** observation, not a property claim.) | `[T]` |
| **A-5** | A `name` containing whitespace, a `;`, a `}`, a newline, or a `url(…)` — is it emitted **verbatim** (the contract) or sanitized (a policy default)? **Verbatim is the contract**; sanitizing is a **prohibition-3 finding**. | `[T]` |
| **A-6** | A `unit` containing a `;`, a `}`, or another property declaration — same question, same contract answer. | `[T]` |
| **A-7** | A `setProperty` that **re-enters** the applier (the sink calls back into `applyProjection`) — state coherence, and is the write count still one per key? **⟶ RULED 2026-09-27 (§0A note 4): NOT GUARDED — the projection is IMMUTABLE INPUT and results stay CALL-LOCAL per `I-3`/`I-5`/`I-8`/`I-11` (`I-14`, §2.3 item 8, `F-14`/`F-15`); the write count stays one per key per call. NO ordering hazard the invariants do not cover was found, so nothing is owed — an `I-3`-breaking case would be escalated `BLOCKING`.** | `[T]` |
| **A-8** | A `setProperty` that is a **getter returning a new function each access** — is the method called at most once per key (no double property access)? | `[T]` |
| **A-9** | A sink whose `style` is a **Proxy** that throws on the first access — total skip or throw? | `[T]` |
| **A-10** | A projection object the caller **mutates between** `project` and `applyProjection` — does the applier see the mutation (it must, it reads its argument) and does it **re-format** anything (it must not)? | `[T]` |
| **A-11** | A projection reused for **two** sinks — is it consumed (mutated) or reusable? **⟶ RULED 2026-09-27 (architect's ruling pack, §0A note 1): REUSABLE — a `Projection` is a VALUE, not a session (`I-11`, §2.3 item 1, `M-21`/`M-22`); no consumption, no per-projection state, and every call must be equivalent to a first call with that value. The pre-ruling text — *"Must be ruled (this spec does not decide whether a `Projection` is single-use)"* — is SUPERSEDED.** | `[T]` |
| **A-12** | **The `U-CENSUS` boundary probe:** does the module read a census, a `zones` set, a `revealed` flag, or import any zones/census/`U-ZONES` module? **Any positive is a scope violation** (ruling 1/5). | static |
| **A-13** | **The zone-vocabulary probe:** does any `name`, `unit`, default, union member, doc sentence or test fixture in this unit carry a zone/track/pane/tab name (`H-r17`)? **⟶ ANNOTATED 2026-09-27 (the `§5.5` RE-DERIVATION pass, which found this probe has NO ROW):** this seed is the pass's home for a row **`§2.2` prohibition 1 cites but never enumerates** (its `Pinned by` cell says *"static source row over the module file"* with no id, and `§4.4`'s `S-1`..`S-11` are stop conditions, not rows) — and **the probe as worded collides with its own home**: a module that must carry `track` NOWHERE cannot state this prohibition in its own comments, while this seed requires the probe to read *doc sentences*. **⟶ RULED AND ID'D 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 11 (a)+(b); the paragraph above is kept visible): the probe IS `§3.4`'s `R-17`, and BOTH collisions are closed — (i) the row has an id, and (ii) the SCAN'S SCOPE is fixed: it reads the MODULE's source INCLUDING COMMENTS plus the unit's `[T]` fixtures, while the WORDS live only in THIS spec's prose (which the module never contains), so a module need not state the prohibition to satisfy it. The row is closed against token ASSEMBLY and COMMENT-CARRIED spellings (`§4.4 S-12`, the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` rule); `R-18` carries the forbidden-ACCESS half with its stated `[expr]` limit (`S-13`).** | static |
| **A-14** | **Static/unauthorized-access sweep:** `querySelector*`/`getComputedStyle`/`getPropertyValue`/`document`/`window`/`matchMedia`/`activeElement`, any `src/renderer/**` or `src/main/**` import, any `electron`/`node:fs`, any store, any module-level mutable state, any ambient read (`Date`/`Math.random`/`process.env`). | static |
| **A-15** | **The signature probe:** does `project` take exactly `(values, specOf)` — no `census`/`zones`/`sizes`/`revealed` parameter, and no options object that could smuggle one in? | static + a type-level row |
| **A-16** | The five-seam sweep: any new tool/resource/group/`VALID_GROUPS` member/`RpcMethod` member/`MUTATING_METHODS` entry/IPC method? Does `tests/engine-pin-version.test.ts`'s 21-member census still pass **unchanged**? **⟶ ANNOTATED 2026-09-27 (the `§5.5` RE-DERIVATION pass): the FIRST half of this seed is the one part of the sweep that can FAIL for the mutation it names, and the SECOND half cannot — the census test passes unchanged whether or not this unit adds a seam, because it asserts the EXISTING 21 members rather than the ABSENCE of new ones.** The falsifiable half is the **import row** (does the module import anything from `src/main/**`/`src/renderer/**`?) plus the diff-scope row, and both are **unenumerated rows** in the same class as `A-13`'s (`§2.2` prohibition 5 cites *"plus a static import row"* with no id). **`§7a` item 11 (c)** records the reading; no clause is weakened by it. **⟶ RULED AND ID'D 2026-09-27 (the `§7a` RULING pass, `§7a.1` item 11 (c); the clause above is kept visible): the two "unenumerated" rows are `R-19` (the import-boundary row) and `R-20` (the diff-scope row) at `§3.4`, and the FIRST half is `R-21` — which is a SCOPE statement citing the rows that ALREADY EXIST and are name-complete (`tests/engine-pin-version.test.ts` `R-15`/`R-15a` at `:102-166`, whose set equality fails on a NEW or REMOVED tool BY NAME, and `R-15b`'s 21-member census at `:174-197`). So the sweep's falsifiable half is now named, and the census half is not "unchanged" but `R-21`'s citation of an already-name-complete row (`§4.4 S-14`).** | `[H]` + static |
| **A-17** | **The shim-scope probe:** does anything in the change set touch `src/shared/dom-shim.ts`, or require a member the shim lacks (`setProperty`, `getComputedStyle`)? | static |
| **A-18** | **Cross-unit boundary:** does this unit duplicate any `U-ZONES` responsibility (the `'0px'`-family empty token, emptiness arithmetic), any `U-CENSUS` responsibility (key-set-`zones`, delegation to `U-ZONES`), or any `U-SLOTHOST`/`U-LISTHOST` responsibility? **Duplication is a FINDING** — `U-ZONES`/`U-CENSUS` are wave E and own token authority for the census family. | static + `[T]` |
| **A-19** | **The removal-shaped input probe:** can a caller express "remove this property" through any path — an empty string value, a `null`, an absent key? **Each must land in `skipped`, never as a removal write** (§2.3 item 5). | `[T]` |
| **A-20** | **The false-green probe (`RK-16`'s class):** could a green `[T]` suite be read as "the dashboard's custom properties work in the app"? Does the DONE row and this spec say otherwise in those words? | doc + `[T]` |

## 3b. The adversarial pass's disposition table — **the shape this contract will be reconciled to**

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a host finding, **fixed here + regression-tested** as a new §3 row |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** — the spec is amended with the old text kept as `SUPERSEDED`, and the row lands in §3. **⟶ Its three named candidates are SPENT:** `A-2`, `A-11` and `F-4`'s getter clause were **RULED and the spec AMENDED on 2026-09-27** (§0A notes 1/2; `F-4` split into `F-4A`/`F-4B`, with the pre-ruling sentence kept visible in `F-4B`). **A later pass may still use this status for a NEW gap** — it is not retired, only its current examples |
| **CONFIRMED-RULED (2026-09-27 — the architect's ruling pack; recorded pre-green so the disposition is not left implicit)** | **`A-11`** (a `Projection` is **reusable** — `I-11`), **`A-2`/`F-4`** (a throwing accessor is **skipped and recorded** as **`'accessor-threw'`**, never propagated — `F-4A`/`F-4B`/`F-12`), **`A-3`** (**`Object.create(null)`** for the records and every internal map — `I-12`/`I-13`, `§2.5`), **`A-7`** (**no re-entrancy guard**; the projection is **immutable input** — `I-14`), **and `A-7`'s ordering question specifically: no hazard the invariants do not already cover was found, so NO guard is owed** (an `I-3`-breaking case would be escalated `BLOCKING`) |
| **BLOCKING — SCOPE** | `A-12`/`A-13`/`A-18`/`A-15` returning positive: **the unit does not land** until the census/zone surface is removed |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; the package is never patched |
| **NOT-A-FINDING** | raised, examined, recorded with the reason |
| **OWED** | raised and **not yet resolved** — the pass may not report done with an `OWED` row |

**Status of the table itself: `OWED` — empty by construction.** **A DONE row that cites no adversarial
pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3).

**Why these two sections sit at the END of this file (the `docs/specs/engine-drift.md` convention,
stated so the placement is not read as an oversight):** the **seed set** is the artifact the pass
that runs *after* the green works from, and the **disposition table** is what this contract is
reconciled *to* afterwards. Keeping them last means an appended findings block extends the file
without renumbering §6/§7/§8 — **no section number of this spec moves when the pass lands.**

**⟶ FILE-END NOTE (2026-09-27, the `U-PROJ` RED-SET REPAIR pass — recorded at the end so the file's own
closing marker is unambiguous and no later pass reads a moved tail as drift):** **this file's last content
line is the paragraph above; the pass added no section after it, moved no section number, deleted no
clause, and ended the file exactly where the `§3b` note ends.** **LIVE LINE COUNT AT THIS PASS'S CLOSE:
`2357` lines (final content line `2356`, plus the trailing newline)** — quoted so a later documentation
review can compare against its own count and attribute any difference to the pass that made it.

