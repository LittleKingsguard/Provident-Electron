# Spec — `U-LISTHOST`: the owned-node list host (`SCH-11`'s adopted shape — own-node ownership + order-as-projection)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-LISTHOST`**, the adopted-reshaped form of
`SCH-11` `TAB-STRIP-SHELL`). **The unit has NOT run: nothing here is implemented, no red set has been
authored and no leg has been run by this pass.** This pass files the contract.
**⟶ STATUS NOTE — 2026-09-27, THE `U-MOUNTGUARD` DONE PASS: THE WAVE-D GO-AHEAD WAS GIVEN.** The
architect **GAVE the wave-D go-ahead (2026-09-27)** and **`U-MOUNTGUARD` is `DONE`** (the ledger's
**FOURTH `DONE` row** — `docs/next-steps.md`'s `## DONE — U-MOUNTGUARD` record; the counts are
**`4 DONE / 16 open`**). **This is a STATUS/ANNOTATION note: it amends no normative clause, adds no row
and moves no section number.** **What it supersedes, and only in its STATUS half:** the go-ahead
paragraph immediately below (and §0 **ruling 8**, §4.5, §7 item 1), whose *"BLOCKED on the architect's
go-ahead … wave D is authorised by no ruling currently on the record … RED SET OWED — NOT AUTHORED, NOT
RUN"* clauses are **kept visible and are the filing pass's state**. **What it does NOT change:**
`AGENTS.md` item 9 still binds — **this unit is delegable only once its red set has been RUN and
REPORTED**, and the **wave-D ORDER still stands unskipped**: `U-MOUNTGUARD` (now `DONE`) → **this unit
(`U-LISTHOST`)** → `U-SLOTHOST` → `U-PROJ`. **So this unit's exact next action is: `TestWriter red` RUN
and REPORTED → green → adversarial → blind greens → legs → documentation review → DONE**, with its
`docs/next-steps.md` `## OPEN` row **`D2`** the queue pointer.

**Go-ahead state — stated plainly: this unit is BLOCKED on the architect's go-ahead for the wave-D
plan.** The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
*"the go-ahead is WAVE B ONLY … waves C–F are not authorised by this go-ahead"*), and it is **spent**
— wave B landed. Wave **D** is authorised by no ruling currently on the record, so this unit's red
set may not be RUN and it may not be delegated (`AGENTS.md` item 9). **Status of its red set: RED SET
OWED — NOT AUTHORED, NOT RUN** (RCA-1). Additional **ordering** obligation from its queue row: it
lands **after `U-MOUNTGUARD`** (`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s
appended **`Amendment record (A-d4…A-d8)` §3**, wave **D** — *"`U-MOUNTGUARD` → `U-LISTHOST` →
`U-SLOTHOST` → `U-PROJ`"*; and `docs/next-steps.md`'s `## OPEN` row **D2**'s `Blocked on` cell).
**Ordering is not a dependency edge this unit may skip** — the wave-D order is the amendment's own.
Source of this unit: the same amendment record's §2.2 `SCH-11` row (the acceptance lines, read),
§2.1 (the sixteen `SCH`-derived unit names), §3 (wave D and the checkpoint rule), `H-r6` (the
**dissolved** `SCH-9 → SCH-11` edge), `H-r8` (the six prohibitions), and `docs/next-steps.md`'s
`## OPEN` row **D2** (*"`U-LISTHOST` — the owned-node list host (own-node ownership +
order-as-projection; **not** a tab strip)"*; spec cell `docs/specs/listhost.md` (**OWED — not
filed**) — this file is that filing).

## 0. The rulings this unit derives from (recorded, NOT re-opened) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-11` is ADOPTED-RESHAPED, and the reshape is a RENAME TO WHAT IT ACTUALLY IS: an owned-node list host** — `createOwnedListHost({mount, orderOf, itemFactory, onActivate, onClose})` — **"not a tab strip"** (the §2.2 row + the D2 queue row, both read). | §1, §2 |
| **2** | **Own-node ownership is kept:** *"the host owns the nodes it created and leaves foreign siblings untouched"*. **Foreign-sibling survival is a HARD row** (amendment §"Per-unit equivalence limits"). | §2.3, §3 (rows `M-8`/`I-3`), §4 |
| **3** | **Order-as-projection is kept:** *"the host projects an order; it does not sort a graph; **no graph pass on order change**"*. | §2.4, §3.4, §4 **⟶ CITATION CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑5**, MED; the as-filed citation is kept visible): there is NO `§3.4` in this spec** — this file's headings run `§3` (742), `§3.1` (747), `§3.2` (795), `§3.3` (910), then `§3a` (1530) and `§3b` (1614) **— *(those six figures are the REVIEW PASS's read of these headings; they have already drifted as this pass appended, so treat them as that pass's snapshot and cite these SECTIONS by number, never by line)* —** so the citation did not resolve. **The real clauses are `§2.4`, §3 (`M-7`/`F-8`), §6** — the form the `§8` index already uses (`§8`: *"Order-as-projection + no graph pass on order change … §2.4, §3 `M-7`/`F-8`, §6"*). **Nothing is renumbered and no clause moved.** |
| **4** | **The acceptance negatives are binding:** **no `querySelectorAll`**, **no tab-strip vocabulary**, **no `matchMedia`** in the mechanism; and **the "one overflow mode" criterion is DROPPED** — *"overflow is CSS and this repo ships no stylesheet for a fork"* (§2.2). | §2.2 (prohibitions), §4 |
| **5** | **`V-7` is resolved by own-node ownership and stays a hard row**: `SCH-9` #2's *"publish replaces the element"* **contradicted** this unit's #1 foreign-sibling-survives rule; the resolution is that **this host replaces only its own nodes** — and **`U-SLOTHOST` must carry the same hard row** (its own §2.2/§3). | §3 (rows `M-8`/`F-2`), §7 item 3 |
| **6** | **The `SCH-9 → SCH-11` dependency edge is DISSOLVED** (`H-r6`): *"each adopted contract takes an injected `orderOf`-shaped callback as its own parameter, so `C-15`'s cycle is broken rather than inherited"*. **`orderOf` is INJECTED HERE — it is not imported from `SCH-4`/`U-ZONES` and not a second authority over ordering** (`SCH-4`'s `orderOf` remains fork-owned). | §2.1 (`orderOf`), §6 |
| **7** | **No unit may claim magnitude-equivalence.** Per the amendment's per-unit equivalence limits: *"order is a **projection**, so the mechanism may not claim the graph's child order changed; foreign-sibling survival is a **hard row**; no overflow/tab vocabulary; no equivalence between 'one visible item' and any graph op."* | §7 item 4, §5.3 |
| **8** | **The go-ahead for wave D does not exist yet**, and within wave D this unit follows `U-MOUNTGUARD`. **This unit is BLOCKED on that go-ahead, on the wave-D order, and on its own red set.** **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the as-written cell is kept visible): the wave-D go-ahead WAS GIVEN (architect, 2026-09-27) and `U-MOUNTGUARD` — the unit this one follows — is `DONE`, so the surviving blocker is this unit's OWN RED SET (plus this spec's `OWED`-cell status in its queue row). The wave-D order still binds.** | this status block, §4.5, §7 item 1 |

**⟶ STATUS NOTE — 2026-09-27, THE `§5.5` RE-DERIVATION PASS (the architect's gate-11 ruling for
code-bearing units): `§5.5`'s RECORDED ZERO-ROW EXEMPTION IS SUPERSEDED, and `§5.5` now carries a
TYPED PROPERTY REGISTER OF `7` ROWS, ALL EXECUTED DETERMINISTICALLY (`§5.5.1`).** This note
**amends no normative clause of §0 and moves no section number**; it exists because the status
block above and §0 ruling 8 name this unit's *status*, and the register's status changed under
them. **The exemption text and its five-cell table are kept verbatim at `§5.5.0`** (the
annotate-never-rewrite convention), and the reconciliation of every dependent in-file cell is
itemized in `§5.5.1`'s change summary and the two new `§8` rows. **No dependency, no leg, no file
and no script is added** — the register rides the existing node suite (`§5.2`).
**This pass ran NO test, NO leg and NO trio: the register is CONTRACT TEXT at `§5.5.1`, and every
`YES` cell in it is the row's execution DESIGN — the executed-layer evidence is owed by this unit's
red→green cycle, and the DONE row must report the attempt counts.**
**File-length census: this file is now `765` lines, and this pass touched ONLY §0's status region,
§3.3 `I-8`, §5.2, §5.3 item 9, §5.5 (`§5.5.0`'s superseded exemption kept verbatim, `§5.5.1`'s
register) and two `§8` rows — so the `619`-line figures carried by `docs/next-steps.md`'s two cells
(`U6`, and the handover-staleness note) and by `docs/pending.md`'s `SCH-11` row are OWED a
reconciliation from their owner (`AGENTS.md` items 3/6): that is a tracker edit, not this unit's
(`§5.1`'s diff scope).** **⟶ DISCHARGED 2026-09-27 (the supervisor's tracker pass): all SEVEN stale
`619` figures (this file's own `§8`/status note excluded) have been reconciled to the current length —
`774` lines — in `docs/next-steps.md` (the handover block's §2 + row `D2`), `docs/pending.md` (the
`SCH-1`-invariant note and the `SCH-11` row), `docs/decisions.md` (amendment note 21) and the gate
record (`U6` + the owed-spec list cell). This file's own census above (`765` lines) is the
re-derivation pass's mid-pass measurement.** *(**⟶ SECOND RECONCILIATION, 2026-09-27, the contract-reconciliation
pass (`4d6a451`):** every one of those figures was updated again to this file's post-ruling length — **`1056`
lines** — and each site now carries the note that a line-count census **drifts on every pass**, so a citation
should name this file's **sections**, never its length. The `774` figure this note previously carried is kept
visible and is that pass's own measurement.)*

**⟶ STATUS NOTE — 2026-09-27, THE ADVERSARIAL + PBT-AUDIT PASS: the unit `U-LISTHOST` is GREEN and a
READ-ONLY adversarial pass plus a PBT audit has RUN; its findings, seed rulings and judgment-call
rulings are recorded in `§3a`/`§3b` and this pass files them as CONTRACT TEXT.** **What the pass
reported (as REPORTED, not measured here — `§7` item 11):** `tests/owned-list-host.test.ts`
**`53/53` rows**; `§5.5.1`'s property register **`168/168` attempts held** (none broken;
stop-after-5 never triggered); the full node suite **`60` files / `971` tests — `969` passed / `0`
failed / `2` skipped**. **This note amends no normative clause of `§0`, adds no member to `§3`'s
existing id sets (`M-19`..`M-21`, `F-11` are APPENDED, `§3b`-1/`§3b`-2 are appended, `§8` gains rows
at its end) and moves no section number.** **One rule binds every fix that follows, and it is
`AGENTS.md`'s: the regression rows are authored RED by a TestWriter FIRST (from `§2.1`'s clauses plus
`§3.1 M-19`/`§3.2 F-11`), then the Implementer makes them green.** **⟶ RE-STATED 2026-09-27 (the
`ADV-LH-1` DISPOSITION-CORRECTION pass): the count is THREE fix-side findings, not four** —
`ADV-LH-1` and `ADV-LH-3`'s **`orderOf` seam** are `NOT-A-FINDING` (a recorded FALSE POSITIVE on the
code; see the correction note after this table), so the fix-side set is `ADV-LH-3`'s **three real
seams** (`itemFactory`/`onActivate`/`onClose`), `ADV-LH-4`, and `ADV-LH-5`. The sentence above is the
adversarial pass's own state and is kept visible. **The fix-side findings, their
owners, and the clause each fix is written against:**

| Finding | Disposition | Owner | The contract clause the fix is written against |
| --- | --- | --- | --- |
| **`ADV-LH-1`** (HIGH) — a throwing `orderOf` escapes `setEntries` | **`NOT-A-FINDING` (code) with a recorded FALSE-POSITIVE note** — the as-recorded **`CONTRACT-AMENDED` + `FIXED-this-pass`** is kept visible in `§3b`-1 and is CORRECTED there 2026-09-27 | Implementer (no host code owed for the `orderOf` seam) + TestWriter (row-placement fix only) **⟶ CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED): NOT a placement fix — the TestWriter KEPT the row as a GREEN positive regression row and re-pinned its assertion to the row's proper drive boundary (five green rows exist; see the note under §0's table and the §2.1 annotation). The as-recorded owner phrase is kept visible.** | `§2.1`'s **totality clause** — kept as a **CLARIFICATION** (the rule is unchanged: a throwing `orderOf` is caught on EVERY path and yields the supplied order) + `§3.3 I-8` |
| **`ADV-LH-3`** (MED) — a throwing injected function escapes mid-call | **THREE seams `CONTRACT-AMENDED` + `FIXED-this-pass`** (`itemFactory`, `onActivate`, `onClose` — guards landed); the **`orderOf` seam `NOT-A-FINDING` (code) with a recorded FALSE-POSITIVE note** (corrected 2026-09-27 at `§3b`-1) | Implementer + TestWriter (for the three seams; the `orderOf` seam owes no host code) | `§2.1`'s **totality-extends-to-injected-functions clause** + the NAMED safe default per function — **`orderOf` ⇒ supplied order (CLARIFICATION)**, `itemFactory` ⇒ refusal `factory-returned-null`, `onActivate` ⇒ swallowed/key stays owned, `onClose` ⇒ swallowed/drop stands (the three real seams' contract) |
| **`ADV-LH-4`** (MED) — a refused first occurrence wrongly reserves its key | **`CONTRACT-AMENDED` + `FIXED-this-pass`** | Implementer + TestWriter | `§2.1`'s **ACCEPTANCE rule** + `N-5`, `§3.2 F-2` (amended in place), NEW `§3.1 M-19`, NEW `§3.2 F-11` |
| **`ADV-LH-5`** (HIGH) — the falsification row cannot fail for the mutation it forbids | **`FIXED-this-pass`** | **TestWriter (strategy ONLY)** | `§2.3` item 3 / `M-8` (the statement **stays**) + `§5.5.1 P-LH-IM-4`'s strengthened strategy |

**The other eight findings, one line each (`§3b`-1 carries the full table):** `ADV-LH-2` (LOW)
**`PARKED-with-revisit-condition`** — a throwing caller-supplied `mount.appendChild`/node `remove`
escapes with the bookkeeping already rewritten; contract-consistent about the *tree* (`M-16`) but the
state-coherence half is unstated; **revisit if the totality claim is read as extending to
caller-supplied DOM methods, or when a non-shim mount is injected.** `ADV-LH-6` (LOW)
**`ACCEPTED-AS-PINNED`** (doc) — `P-LH-IM-1` gains the same honest bounded marking `P-LH-TP-1`
carries; no statement change. `ADV-LH-7` (LOW) **`PARKED-with-revisit-condition`** (doc drift) — the
register cell's pool list reconciles to the executed **`22`** shapes and the generator's actual
two-step form (`next(1) === 0`, pinned `20260927`) is stated; a **`Symbol`**-keyed shape is recorded
as the pool's **stated boundary** (revisit if one is admitted). **⟶ CORRECTED 2026-09-27 (the
`ADV-LH-7` POOL-RECONCILIATION correction pass; the clause above is kept visible): the **count**
reconciles (`22`, asserted green by `PRE-3`) but the **inventory** does not — the two members the
register block named as "omitted" (`true`, and "a caller node as an entry") **are not in the executed
pool**; the executed shapes the cell's list actually omits are **the `{key:null}` non-string-key shape
and its `[{key:null, node}]` array form**. The step-form half and the `Symbol` boundary stand.**
**⟶ CORRECTED AGAIN 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record:
`archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; the sentence immediately
above is the SECOND wrong form and is kept visible): the sentence above is **FALSE** — **`{key:null}` IS
IN the executed pool.** Verified from the test file: `TP_POOL` member **10** is
`{ id: 'a non-string key ({key:null})', entryArg: () => [{ key: null, node: nodeEl('div','key-null') }] }`
(`tests/owned-list-host.test.ts:649-655`, executed as member **10 of 22**; the file's own comment lists
it as executed at `:3595`, and it **names** the frozen array and the duplicate-key pair at `:3599`). So
the `{key:null}` shape **and** its `[{key:null, node}]` array form **are both executed**, and the two
executed members the cell's `20`-item enum **genuinely does not name** are **"a frozen array"** and
**"a duplicate-key pair"**. **The `22`-shape count, the `64` draws, the `72`-attempt row total and the
`Symbol` boundary are UNCHANGED.** `ADV-LH-8` (LOW)
**`NOT-A-FINDING`** — the two extra executed shapes are an asserted extension beyond the `§3` rows.
`ADV-LH-9` (INFO) **`RESOLVED-BY-PINNING`** — the `dispose()` **composition hazard** (two hosts, one
mount, one disposed: the mount keeps the disposed host's orphans, and the new host appends after them
and treats them as foreign) is recorded at seed `§3a A-10`. `ADV-LH-10` (INFO)
**`ACCEPTED-AS-PINNED`** — the **re-entrancy** ruling at seed `§3a A-17` (ownership is dropped
**before** `onClose`, so no resurrection and no double-fire; a re-entrant `setEntries` inside a
callback changes what the OUTER call's `order`/`placed` report — benign and now stated).
`ADV-LH-11` (INFO) **`NOT-A-FINDING`** — the security/seam sweep is **clean** (exactly 7 exports; no
`tab`/`strip`/`pane`/`zone`/`region`/`overflow` vocabulary; no `document`/`window`/`matchMedia`; no
renderer/main import; no persistence; no module-level state; `RpcMethod` `21`, `ALL_TOOLS` `21`,
`MUTATING_METHODS` `7`, `VALID_GROUPS` `5` — unchanged; the six static rows are source-based).
`ADV-LH-12` (INFO) **`NOT-A-FINDING`** — `I-3`'s foreign-subsequence scoping is intentional (covered
by `M-14` and `§5.5.1 P-LH-SM-2` sequence 6).

**⟶ FIRST FALSE-POSITIVE REVERSAL ON THIS UNIT'S RECORD — `ADV-LH-1`, AND `ADV-LH-3`'s `orderOf`
SEAM, CORRECTED 2026-09-27 (added by the `ADV-LH-1` DISPOSITION-CORRECTION pass; the as-recorded
`HIGH`/`CONTRACT-AMENDED`/`FIXED-this-pass` disposition above is kept VISIBLE and is not rewritten).**
**The corrected disposition is `NOT-A-FINDING` (code) with a recorded false-positive note** for
**`ADV-LH-1`**, and the same for **`ADV-LH-3`'s `orderOf` seam** — while `ADV-LH-3`'s
**`itemFactory`/`onActivate`/`onClose` seams REMAIN REAL findings whose guards the Implementer has
landed** (three code guards: the factory's throw ⇒ **one** `factory-returned-null` refusal with the
key not owned; `onActivate`'s ⇒ swallowed with the key staying owned; `onClose`'s ⇒ swallowed with the
drop standing and the declared result still returned), and those three stay `FIXED-this-pass`.

**The mis-read, named.** The finding claimed *"`setEntries` calls `projectionFor` outside any `try`
(`src/shared/owned-list-host.ts:300`), so a caller/comparator throw escapes"* — but **the cited
unguarded call site is the *projection* call, not the comparator's invocation**. Verified from the
code: the injected comparator (`orderOf`) has **exactly ONE invocation site** — inside `projectionFor`'s
own `try { … } catch { return keys.slice() }` (`src/shared/owned-list-host.ts` as it stands:
`projectionFor` at `:190-241`, the comparator's call inside the guarded block at `:192-198` — the
**only** `comparator(` invocation in the file, `:197` — and the catch at `:214-222` (**⟶ STALE ANCHOR, corrected 2026-09-27 by the DOCUMENTATION REVIEW — `AGENTS.md` item 10d / RCA‑6, record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑15**, LOW: the live range is **`:214-226`**, the comment `:215-221`, the guarded call block `:191-198`, the single `projectionFor` call `:319`, `setOrder` `:354-368`, and the landed guards `:272-284`/`:380-388`/`:341-350`; the authoritative table is at the ANCHOR-DRIFT note below, and the stale numbers are kept visible**), whose comment at
`:215-220` claims "both `setEntries` and `setOrder` reach the comparator through this one guarded
projection", **a code-comment over-statement that this spec does not adopt: `setOrder` reaches it
through no path at all**); `setEntries` reaches it through its **single** `projectionFor` call (`:315`); and
`setOrder` (`:350-363`) **never invokes the comparator at all** — it reorders from the owned key set
and calls `sync()`. **Therefore a throwing `orderOf` never escaped any method**: the totality claim was
**already met on every path**, and the guard **pre-existed the fix** (the fix pass added only the
explanatory comment at that catch, `src/shared/owned-list-host.ts:215-220` — **⟶ STALE ANCHOR corrected 2026-09-27 (the DOCUMENTATION REVIEW, finding **F‑15**, LOW): the live range is `:215-221`; see the ANCHOR-DRIFT note's authoritative table**).

**Why the rows were red — a TEST-AUTHORING defect, not a host defect.** The redness of the `ADV-LH-1`
row (and of `ADV-LH-3`'s `orderOf` seam row) came from their own `expect(h.keys()).toEqual(['a','b'])`
assertions being placed **AFTER** their sequences had already run `close('b')` / `remove('a')` — which
contradicts the same rows' later assertions (`['a']`, then `[]`) and the `§2.1` `close`/`remove`/
`keys()` rules. The **TestWriter is fixing that placement in parallel (strategy-only, no row deleted)**.
**⟶ OWNER/OUTCOME CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 —
record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED; the sentence above is
the AS-RECORDED owner/outcome and is kept visible): what landed is NOT a placement fix — the TestWriter
**KEPT all five rows** (`ADV-LH-1` plus the four `ADV-LH-3` seams: `itemFactory`/`onActivate`/`onClose`
**and** the `orderOf` seam) as **green positive regression rows** and **re-pinned their assertions to
their proper drive boundary**: those rows build their drive arrays by EXECUTING every drive while
constructing the array, so an assertion placed "early" in the row's prose was reading the
**fully-advanced** state (post-`close('b')`/post-`remove('a')`) rather than the state at that earlier
point. **The rows therefore exist, they are green, and the code needed NO behavioural change for those
two seams** (the guards were already there). The five rows are `tests/owned-list-host.test.ts:2421-2691`,
and the unit's file reads `62 passed (62)`.**

**What this leaves as CONTRACT — `§2.1`'s totality clause is KEPT, as a CLARIFICATION.** The clause the
finding produced **stays in force and unchanged in substance**: *a throwing `orderOf` must be caught on
every path and must yield the supplied order, and no refusal code is invented for it*. It is a
**clarification** (a statement of the contract the code already satisfied), **not a behavioural change**
and **not** an amendment made because a method formerly threw. The amended `§2.1`
injected-function clause therefore reads as the contract for **the THREE REAL seams**
(`itemFactory`/`onActivate`/`onClose`), whose named safe defaults are the behaviour the landed guards
implement.

**One line in this spec's own record, so later passes can audit the reversal.** A finding **reversed in
this direction** is worth recording: the false positive came from an **adversarial finding whose
evidence citation was not checked against the call graph** (a line was cited, not traced), and the
correction came from the **Implementer's stop-and-report plus the supervisor's code read** — not from a
later audit, and not from a test run. **A read-only adversarial pass may not report a seam as unguarded
without naming the comparator's (or callback's) actual invocation site; a cited line is not a call
graph.** The `ADV-LH-5` (strategy-power, real), `ADV-LH-3`'s three callback/factory seams (real),
`ADV-LH-4` and `ADV-LH-2` dispositions are **unaffected** by this correction.

**ANCHOR-DRIFT NOTE (surfaced by this correction, recorded rather than silently patched):** the line
numbers cited by the adversarial pass for this finding (`:337`, `:300`) **do not resolve in the file as
it stands today** — the guarded comparator block is at `:192-222`, `setEntries`'s `projectionFor` call
at `:315`, `setOrder` at `:350-363`, and the landed guards at `:269-276` (`itemFactory`), `:379-383`
(`onActivate`) and `:341-345` (`onClose`). The pass's citations were read against the pre-fix revision,
so **every `src/**` anchor in this spec's adversarial block should be re-resolved against the live file
before it is quoted** (the same discipline this file's citation-hygiene paragraph already states for
`docs/decisions.md`). **No clause is weakened by the drift; the anchors are the stale part.** **⟶ THE
NOTE'S OWN ANCHORS WERE THE STALE ONES — RE-RESOLVED AND CORRECTED 2026-09-27 (the DOCUMENTATION
REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`,
finding **F‑15**, LOW; every figure in the sentence above is kept visible because it is the incorrect
form).** Re-resolved against `src/shared/owned-list-host.ts` as it stands (**`410` lines**):

| Anchor | The note said (stale) | **Live anchor (correct)** |
| --- | --- | --- |
| the guarded comparator block (comparator call inside the `try`) | `:192-222` | **`:191-198`** |
| the catch that swallows the comparator throw | `:214-222` | **`:214-226`** |
| the explanatory comment at that catch | `:215-220` | **`:215-221`** |
| `setEntries`'s single `projectionFor` call | `:315` | **`:319`** |
| `setOrder`'s comparator-free path | `:350-363` | **`:354-368`** |
| the landed `itemFactory` guard (factory) | `:269-276` | **`:272-284`** |
| the landed `onActivate` guard (activate) | `:379-383` | **`:380-388`** |
| the landed `onClose` guard (close) | `:341-345` | **`:341-350`** |

**The same six wrong ranges are propagated into `§3b`-1's `ADV-LH-1` and `ADV-LH-3` rows; this table is
the authoritative form for them** (the rows' as-recorded numbers stay visible). **The note's warning
stands as a rule and no longer applies to this spec's own anchors: every `src/**` anchor in the
adversarial block is now re-resolved, and the spec's OTHER anchor set (`security.ts:134`,
`types.ts:259-281`, `renderer.ts:12`, `mcp-server.ts:281-303`, `dom-shim.ts:1-3`/`:89-96`,
`package.json:10/19/26-31`, `engine-pin-version.test.ts:174-197`) was spot-checked correct by the same
review.** **No clause is weakened by any of it — the claims were right; only the anchors were stale.**

**This pass ran NO test, NO leg and NO trio** — it is SPEC TEXT ONLY (no `tests/**`, no `src/**`, no
`scripts/**`, no `package.json` edit, no `git commit`), it edits **this one spec file** and nothing
else, and **nothing is archived, moved or repointed** (`AGENTS.md` item 6). **The known `§5.3 → §5.5`
gap with no `§5.4` remains a RECORDED item owned by the documentation review — this pass does NOT
renumber it**, and neither does it renumber anything else. **⟶ DISCHARGED 2026-09-27 (the DOCUMENTATION
REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`,
findings **F‑11** (this file) and **F‑12** (the two sibling specs): the gap is CONFIRMED and is now
recorded as a DELIBERATE, NON-RENUMBERED OMISSION. **`§5.3` is the DONE-row shape and `§5.5` is the
register; NO clause is missing** — the section simply does not exist. **Renumbering is FORBIDDEN for
citation stability** (`§5.3`/`§5.5` are cited 15+ times across the trackers and this unit's own text;
`docs/pending.md`'s §G row names exactly that hazard). The owning `docs/pending.md` §G row is
**DISCHARGED by this pass** (marking the tracker row is the supervisor's file to change), and the same
one-line record is added to `docs/specs/slothost.md` and `docs/specs/projection.md`, which share the
same `5.3 → 5.5` skip.** **File-length census: this pass grew the
file by anchored appends (the `1062`-line figure earlier notes carry is the state BEFORE them); a
line-count census DRIFTS on every pass, so a citation should name this file's SECTIONS, never its
length** — the rule the contract-reconciliation note above already states.

**⟶ SCOPE OF THE `ADV-LH-1` DISPOSITION-CORRECTION PASS (ADDED 2026-09-27, recorded here so this pass
is auditable).** This pass **ran NO test, NO suite, NO leg and NO trio** — it is **SPEC TEXT ONLY**: no
`tests/**`, no `src/**`, no `scripts/**`, no `package.json` edit, no `git commit`; it edited **this one
spec file**, by **bounded anchored `edit`s** (never a whole-file write, `RCA-8(c)`), **annotate-never-
rewrite** (the superseded text stays visible with the reason and the date), and **no section number
moved** (`AGENTS.md` items 3/6; the trackers are their owner's and the supervisor commits at the gate
boundary). Two corrections landed: **(1)** the `ADV-LH-1` disposition (and `ADV-LH-3`'s `orderOf` seam)
corrected to **`NOT-A-FINDING` (code) with a recorded false-positive note**, keeping the `§2.1`
totality clause as a **CLARIFICATION** and keeping `ADV-LH-3`'s three real seams
(`itemFactory`/`onActivate`/`onClose`) as `FIXED-this-pass` with their landed guards; **(2)** the
`ADV-LH-7` pool reconciliation corrected so it no longer names two members that are **not** in the
executed pool (the `22`-shape count, the `64` draws, the `72`-attempt row total and the `Symbol`
boundary are unchanged). **The corrections were derived from the code** (`src/shared/owned-list-host.ts`
read for the call graph: the comparator's single guarded invocation site, `setOrder` invoking no
comparator, the three landed guards) **and from `tests/owned-list-host.test.ts` read member-by-member
for the executed pool** (read only — **not edited**). A line-count census drifts on every pass: **cite
this file's SECTIONS, never its length.**

**⟶ CONTRACT-RECONCILIATION NOTE — 2026-09-27, THE TESTWRITER-HANDOFF PASS (the red set was AUTHORED
and RUN; eight clauses could not be pinned and were reported instead of guessed).** The red set
`tests/owned-list-host.test.ts` exists and was **RUN and REPORTED: `52` rows = `49` red / `3` pass**
(the `3` greens are harness preconditions, `PRE-1`..`PRE-3`; `37` rows are red on the import
boundary, because `src/shared/owned-list-host.ts` does not exist yet). A TestWriter that cannot pin a
clause **reports it rather than guessing**, and the mirror it wrote in the test file is **its
reading, not a ruling** — so this pass reconciles the eight reported clauses **in the spec**, each
one citing the clauses that decide it, so the Implementer has **one** contract and the adversarial
pass is not left to adjudicate a silent ambiguity. **This note amends no clause beyond the eight
citations below and moves no section number.** What changed, and where:

| # | Reported clause | Reconciliation lands at |
| --- | --- | --- |
| 1 | `§2.1`'s `ListEntry.node` is declared REQUIRED, yet `M-6`/`F-3` drive node-LESS entries | §2.1 (`ListEntry.node` + the "four-case node rule") |
| 2 | `§3.2 F-5` lists `''` as a non-string key, while `§3a A-8`'s premise is that `''` must work identically | §3.2 `F-5` (annotated) + the new `M-18` row + §3a `A-8` |
| 3 | `§5.5.1 P-LH-SM-1`'s "the refused key absent from `keys()`" vs `§3.2 F-2`'s first-wins | §5.5.1 `P-LH-SM-1` (annotated) |
| 4 | `§5.5.1 P-LH-TP-1` says "the SEVEN result-returning methods"; `§2.1` declares EIGHT of which SIX return a `ListHostResult` | §5.5.1 `P-LH-TP-1` (annotated) |
| 5 | `§2.1 ListHostRefusal.key: ListKey` (a string) vs its own doc string "exactly as supplied (never normalized)" | §2.1 (`ListHostRefusal.key` widened) |
| 6 | `M-14` "(reference-held, not removed)" vs `§2.1 dispose()`'s "place nothing" | §2.1 (`dispose()`'s doc string) + §2.3 item 4 |
| 7 | `§3a A-12` (malformed callbacks / a non-array `order`) is a SEED, not a row | §3a `A-12` + §3.3 `I-8` + §5.5.1 `P-LH-TP-1` + §7 item 8 |
| 8 | the brief cited `§4.4`'s "static rows S-3/S-4"; `§4.4` as filed is the stop-condition table `S-1..S-6` | §4.4 + §2.2 + §2.4 + §6 (the static-row citation map) |

**Plus one arithmetic correction, in the same pass and the same file:** `§5.5.1` states **`157`
attempts** (`30 + 34 + 8 + 5 + 8 + 8 + 64`), but the register's own tables drive **`168`**
(`33 + 34 + 8 + 5 + 8 + 8 + 72`) — the `157` cell omitted `P-LH-IM-1`'s **third fixed table** (the
`3` partial `setOrder` drives for `F-8`, `+3`) and `P-LH-TP-1`'s explicit fixed **after-`dispose()`
sweep** (all `8` methods once, `+8`). **Both forms are kept visible below** (the old number is not
erased), the per-row counts are stated, and the caps stay honest: **`168` ≤ `400` total; per-row
max `72` ≤ `100`.** **How they are counted: one "attempt" = one exercised DRIVE of one register row**
— for `P-LH-IM-1` one `setOrder` call, for `P-LH-TP-1` one drawn `(method, input)` attempt **plus**
one method of the fixed after-`dispose()` sweep — counted from the register's own tables as `§5.5.1`
writes them (`S₃` `6` + `S₄` `24` + `3` partial; `64` seed draws + `8` methods). **This pass ran NO
test, NO leg and NO trio: the arithmetic here is COUNTED FROM THE REGISTER'S OWN TABLES, not
measured — the executed-layer evidence remains owed by this unit's red→green cycle.**

**File-length census for this pass: the file was `779` lines on disk when this pass began** and the
pass **grew it by the sixteen annotation/rule blocks the eight findings and the arithmetic required**
(the growth is stated as the number of blocks on purpose: a self-referential "this file is now N
lines" figure inside the file it counts is exactly the stale claim the last three passes had to
reconcile — **a census claim belongs to the pass that lands, and this one is in the report**).
**No normative clause was deleted**, and every superseded form — `readonly node: N`,
`readonly key: ListKey`, `F-5`'s as-filed trigger, `P-LH-SM-1`'s as-filed statement, `P-LH-TP-1`'s
"seven", and the `157` arithmetic — **is still visible in this file.** **A tracker that carries the
`774`-line figure for this file is now stale and owes a reconciliation from its owner**
(`AGENTS.md` items 3/6) — recorded rather than silently corrected here, because the trackers are not
this pass's files (§5.1).** **⟶ DISCHARGED 2026-09-27 (the contract-reconciliation pass): the seven tracker
sites were updated to `1056` and each now says the census DRIFTS — cite sections, never lengths. The `774`
reading is kept visible as the previous pass's own measurement.**

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** No leg of it ran in this pass: no suite ran, no trio ran, no
Electron window booted, and **no probe result is recorded here**.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` (`package.json:19`, read) — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance |

**Three honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says
   this repo's vitest files pass against `src/shared/dom-shim.ts`. **No window is booted, no IPC
   round-trip runs, no MCP transport is exercised, and no real DOM is touched.**
2. **Every row of this unit is a SHIM-TREE row.** The shim has no layout, no CSS resolution, no
   `getComputedStyle`, and no `querySelector(All)` (`src/shared/dom-shim.ts:1-3` announces exactly
   that scope; read this pass, 143 lines). **A `[T]` ordering green says the shim's `children` array
   is in the projected order — it is not a visual-layout assertion, and "one overflow mode" is not
   asserted anywhere** (ruling 4 drops that criterion).
3. **The mount is injected and the module reads no ambient global.** No `document`, no `window`, no
   `matchMedia`, no `getElementById`. The module is therefore admissible under **(B)** (a pure
   transition over injected environment readings) **and** under **(C)** (a consumer-agnostic
   shell-chrome mechanism) — **and it is judged under (C)'s six prohibitions**, which §2.2 asserts.

## 1. Scope

**One deliverable: `createOwnedListHost(...)`** — a host that owns exactly the nodes it created,
projects a caller-supplied order over them, reports activation/close through injected callbacks,
and leaves every other child of the mount exactly as it found it.

1. **What it is, in one sentence.** A container manager for **caller-created nodes**: the caller
   supplies the entries, the nodes, the order and the callbacks; the host places those nodes inside
   the injected mount in the projected order and removes **only** the ones it placed.
2. **What it is NOT.** It is **not a tab strip**. It authors **no** `role`/`aria-*`, **no** label,
   **no** class taxonomy, **no** selected/active state, **no** overflow mode, **no** stylesheet, and
   it does not know what an "item" means. **Every semantic crosses as opaque caller data.**
3. **What the unit may land.** The module + its red/green rows + this spec. **No host change** under
   any circumstance: this unit adds consumer-agnostic code and touches no existing file except this
   spec and the trackers (contrast `U-MOUNTGUARD`, whose host-fix branch exists because it probes
   existing behaviour).

**Explicitly OUT of scope (do not do in this unit):**

- **Any tab-strip vocabulary, symbol, union member, default or documented constant** — `'tab'`,
  `'tabs'`, `'strip'`, `'pane'`, `'zone'`, `'region'`, `'document'`, `'overflow'`, `'active'`,
  `'selected'` as vocabulary. **The module's source must contain none of them** (§2.2 prohibition 1).
- **Any `querySelectorAll`, `querySelector`, `closest`, `getElementById`, `matchMedia`,
  `activeElement`, `getComputedStyle`, `document` or `window` reference** (§2.2).
- **Any styling, class taxonomy, `role`/ARIA attribute, or content authorship** (§2.2 prohibition 2).
- **The dropped "one overflow mode" criterion, in any spelling.** Overflow is **CSS and
  consumer-side**; **this repo ships no stylesheet** for a consumer.
  **⟶ RE-CHECKED 2026-09-27 (the adversarial + PBT-audit pass): still no such file — `docs/skills/`
  holds `process-guardrails.md` alone, so there is NO test-use-case coverage matrix and NO demo-page
  index to update, and this unit's page-design surface is unchanged (`§7` item 6).**
- **Any graph operation on order change.** `setOrder` performs **zero** graph ops — no `dispatch`,
  no `op`, no `applyCommand`, no `load`. A static row asserts the module imports nothing from
  `src/renderer/**` (§2.2, §5.1).
- **Any store, registry, persistence, or module-level mutable state.**
- **⟶ SUPERSEDED-BESIDE ON ITS "ANY STORE" HALF, 2026-10-03 (the H2a gate-4 landing pass;
  `RCA-8(d)` — the as-filed bullet above is KEPT VISIBLE and is NOT rewritten).** Under
  `U-STORE-MODULES-BYTES` (`docs/specs/store-modules-bytes.md` §2.1 — the child that amends this
  module) the host now **RECEIVES the store as a declared call parameter**
  (`OwnedListHostOptions.store` / `hostId`) and writes its OWN records through it — the plan's
  round-3 named-obligation row 9 ("BYTES MOVE"). **WHAT SURVIVES, exactly: no module-level
  state** (the store and subscription handles are closure/parameter-scoped, never module-scope
  bindings — `P-SMB-LH-IM-2`), **no import** (the module still carries `0` import statements —
  the store is a parameter, never an import — `P-SMB-LH-IM-1`), **no persistence owned by the
  module** (the store is a sharing channel; the module persists nothing itself), the five-seam
  MCP negative, and "registry" in the sense of a module-owned registry. The "any store" clause
  is the part that is superseded for THIS module, and for this module only.
- **Any new MCP surface** — the five-seam negative: no tool, resource, group, `VALID_GROUPS` member
  (`src/main/security.ts:134`, read: `read`/`dispatch`/`graph`/`code`/`module`), `RpcMethod` member
  (`src/shared/types.ts:259-281`, read: **21** members) or `MUTATING_METHODS` entry
  (`src/renderer/renderer.ts:12`, read: seven members). `ALL_TOOLS` **stays 21**
  (`src/main/mcp-server.ts:281-303`, read: 21 names).
- **Any shim change.** `src/shared/dom-shim.ts` is untouched; a green must not depend on a new shim
  member (`H-r5`).
- **Any other wave-D/E/F unit** (`U-SLOTHOST`, `U-PROJ`, `U-CENSUS`, …). Each is its own spec, red
  and cycle (RCA-2).
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists** (globbed
  `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
  matrix and no demo-page index to update**.

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and refusal pattern

**New module: `src/shared/owned-list-host.ts`** (a pure `src/shared` module). **Seven exports**, and
nothing else:

```ts
/** An opaque caller key. The host NEVER interprets it: it is a string it can
 *  compare for equality and report back. */
export type ListKey = string

/** One entry: an opaque key, the CALLER-CREATED node for it, and an optional
 *  opaque payload the host may only pass back to the caller's own callbacks. */
export interface ListEntry<N = unknown> {
  readonly key: ListKey
  /** ⟶ AMENDED 2026-09-27 (the TestWriter-handoff pass; the as-filed declaration is kept
   *  visible here): `readonly node: N` REQUIRED declared an entry that cannot be expressed
   *  without a node, while `§3.1 M-6` drives `[{key}]` and `§3.2 F-3` drives an entry with
   *  "no node and no factory" — so the declared type contradicted two documented drives and
   *  its OWN `itemFactory` clause ("used ONLY when an entry supplies no node"). The type
   *  loses; the drives win. The entry is now declared OPTIONAL and NULLABLE, which is the
   *  single shape that expresses every documented drive:   */
  // readonly node: N        ⟵ AS FILED (kept visible; superseded by the line below)
  readonly node?: N | null
  /** Opaque caller data. Never read by the host, never serialized, never
   *  defaulted; returned verbatim on the matching callback. */
  readonly payload?: unknown
}

export interface OwnedListHostOptions<N = unknown> {
  /** The element the host places CALLER-CREATED nodes inside. `null`/absent is
   *  a valid, supported configuration (§3.2 `F-7`). */
  readonly mount: unknown | null
  /** The caller's ordering policy: key -> comparable. INJECTED, never owned.
   *  Omit to keep the order the entries were supplied in. */
  readonly orderOf?: (entry: ListEntry<N>) => string | number
  /** The caller's node factory, used ONLY when an entry supplies no node.
   *  If both are absent the entry is refused (§3.2 `F-3`) — the host
   *  NEVER creates a node itself. */
  readonly itemFactory?: (entry: ListEntry<N>) => N | null
  /** Fired at most ONCE per `activate(key)` for a known key. */
  readonly onActivate?: (key: ListKey, entry: ListEntry<N>) => void
  /** Fired at most ONCE per `remove(key)` for a known key. **⟶ RULED 2026-09-27 (`ADV-LH-3`, the
   *  adversarial + PBT-audit pass; the doc string above is kept visible): a THROWING `onClose`
   *  must not escape `remove`/`close`/`dispose` — the host catches it and continues, which it can
   *  do precisely because ownership is dropped BEFORE the callback fires.**
   */
  readonly onClose?: (key: ListKey, entry: ListEntry<N>) => void
  /** The caller's per-entry ordering position, consulted at render time ONLY
   *  when `orderOf` is absent. */
  readonly order?: readonly ListKey[]
}

export interface ListHostRefusal {
  /** The key the refusal is about, exactly as supplied (never normalized).
   *  ⟶ AMENDED 2026-09-27 (the TestWriter-handoff pass; the as-filed declaration is
   *  visible below): the field was `readonly key: ListKey`, i.e. a STRING, while this
   *  very doc string requires the supplied value VERBATIM and §3.2 F-5's drives supply
   *  NON-string keys (42, null, {}) that are refused — a string-typed field cannot hold
   *  them, and "exactly as supplied" would force a normalization this field's own
   *  parenthetical forbids. The field therefore WIDENS to `unknown`: it holds the
   *  supplied value, verbatim, whatever its type — a `ListKey` when the input was a
   *  string, and `42`/`null`/`{}` (or the entry itself, when the entry was not an
   *  object) when it was not — with NO coercion, NO `String(...)`, NO trimming.   */
  // readonly key: ListKey   ⟵ AS FILED (kept visible; superseded by the line below)
  readonly key: unknown
  readonly code: 'unknown-key' | 'duplicate-key' | 'no-node' | 'factory-returned-null' | 'malformed-entry'
  /** One sentence, in this unit's own voice. */
  readonly message: string
}

export interface ListHostResult {
  /** `true` iff the render placed every entry and removed every node the host
   *  had previously placed and no longer owns. */
  readonly ok: boolean
  /** The keys the host currently owns, IN THE PROJECTED ORDER. */
  readonly order: readonly ListKey[]
  /** The nodes the host placed, IN THE PROJECTED ORDER, by reference. */
  readonly placed: readonly unknown[]
  /** Every node the host REMOVED during this render, by reference. */
  readonly removed: readonly unknown[]
  /** Refusals of THIS call, in encounter order. Never throws; never partial
   *  in the sense of §2.3 (see §3.2's totality note). */
  readonly refused: readonly ListHostRefusal[]
}

export interface OwnedListHost<N = unknown> {
  /** Declare/replace the full entry set. A second call with the same data is a
   *  no-op at the DOM level (row `I-2`). `null`/`undefined` ⇒ an EMPTY set.
   *  ⟶ ADDED 2026-09-27 (`ADV-LH-1`, the adversarial + PBT-audit pass): an `orderOf` that
   *  THROWS on this path is CAUGHT exactly as it is on `setOrder` and NEVER escapes
   *  (see the totality clause at the end of this section); the injected seams of BOTH
   *  paths are total.
   *  ⟶ RE-STATED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass; `ADV-LH-1` is
   *  `NOT-A-FINDING` — the sentence above is kept visible): the CAUGHT-and-never-escapes
   *  behaviour on this path was ALREADY TRUE of the code and is NOT a fix this unit made.
   *  The comparator's single invocation site sits inside `projectionFor`'s guarded block,
   *  and this method reaches it through its one `projectionFor` call, so the clause above
   *  is a CLARIFICATION of an existing behaviour rather than a behavioural change.
   *  ⟶ ADDED 2026-09-27 (judgment call 5, the same pass): a NON-ARRAY argument (`42`, `{}`, a
   *  string) is likewise not a throw: it is read as an EMPTY set — `ok === true`, `refused`
   *  `[]`, `order` `[]` — and it therefore SILENTLY DROPS the prior ownership (the previously
   *  placed nodes are removed and appear in `removed`). That consequence is stated here
   *  because it was previously unstated; the disposition of the reading itself is
   *  `PARKED-with-revisit-condition` (§3b, judgment call 5). */
  setEntries(entries: readonly ListEntry<N>[] | null | undefined): ListHostResult
  /** Remove one entry by key. An UNKNOWN key is a refusal, never a throw. */
  remove(key: ListKey): ListHostResult
  /** Set the projected order. Unknown/duplicate keys in `keys` are IGNORED
   *  (they never appear in the result's `order`). NO graph op occurs.
   *  ⟶ ADDED 2026-09-27 (`ADV-LH-1`, the adversarial + PBT-audit pass): a THROWING `orderOf`
   *  cannot escape this path either (it is caught here by construction and is caught on the
   *  `setEntries` path by the fix `ADV-LH-1` requires).
   *  ⟶ RE-STATED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass; `ADV-LH-1` is
   *  `NOT-A-FINDING`, and the sentence above is kept visible): `setOrder` never invokes the
   *  comparator AT ALL — it reorders the owned key set and syncs — so "caught here by
   *  construction" is exactly right, and the guard is `projectionFor`'s own (`setEntries`
   *  reaches the comparator only through that one guarded call). NO host fix was owed on either
   *  path; the clause is a CLARIFICATION. A NON-ARRAY `keys` argument is a
   *  NO-OP: the current projected order is left UNCHANGED, `ok === true`, `refused` `[]` —
   *  never a throw (judgment call 5). */
  setOrder(keys: readonly ListKey[]): ListHostResult
  /** Place the current set (idempotent).
   *  ⟶ ADDED 2026-09-27 (judgment call 10, the adversarial + PBT-audit pass): the host WRITES
   *  only where its OWN bookkeeping disagrees with the mount — it never re-paints the mount.
   *  A node the CALLER detached is therefore NOT re-appended by `render()`: for that key the
   *  caller's detach is PERMANENT (`render()` is not an undo), and it never throws (the key is
   *  not left dangling, `F-6`). Stated here because the permanence was unstated. */
  render(): ListHostResult
  /** Fire `onActivate` for a KNOWN key (at most once); refusal for unknown. */
  activate(key: ListKey): ListHostResult
  /** Fire `onClose` for a KNOWN key and stop owning it. */
  close(key: ListKey): ListHostResult
  /** The keys the host currently owns, in the projected order. Always valid. */
  keys(): readonly ListKey[]
  /** Drop the host's ownership bookkeeping and place nothing. The nodes are
   *  NOT destroyed — the caller owns them (see §2.3).
   *  ⟶ ADDED 2026-10-03 (the H2a gate-4 landing pass; the release obligation BESIDE the
   *  landed readings, which SURVIVE in full): under the store-backed contract
   *  (`docs/specs/store-modules-bytes.md` §2.2) `dispose()` ALSO releases EVERY store
   *  subscription the host registered — unsubscribe-on-dispose: each held handle's
   *  `unsubscribe()` is called exactly once (first answer `true`), and a post-dispose write
   *  to a released name delivers NOTHING. It releases HANDLES, never RECORDS: the host's
   *  store records remain (H2a §2.2 P6), and the landed "REMOVES NOTHING from the mount"
   *  reading (a) stands unchanged.
   *  ⟶ RULED 2026-09-27 (the TestWriter-handoff pass; the as-filed doc string is kept
   *  visible above, verbatim): "place nothing" was readable TWO ways and the two readings
   *  are now named and one is ruled: **(a)** *it places nothing — the tree is untouched*
   *  (row `M-14`'s "reference-held, not removed"); **(b)** *it places nothing NEW — the
   *  nodes it placed are DETACHED on the way out*. **Reading (a) is the contract**, because
   *  `§2.3` item 4 requires that after `dispose()` every placed node "still exists and is
   *  still reachable by the caller", and a detach would make it reachable only by the
   *  caller's own reference while it silently left the mount — the opposite of "leaves
   *  foreign siblings untouched" being the host's only tree rule (`§2.3` item 3, `I-4`).
   *  **So `dispose()` REMOVES NOTHING from the mount**: the nodes the host placed remain
   *  children of the mount, in their projected order, and appear in NO `removed` list
   *  (`M-14`, new row `M-18`). "Place nothing" means the call adds and removes nothing.   */
  dispose(): void
}

export function createOwnedListHost<N = unknown>(
  options: OwnedListHostOptions<N>,
): OwnedListHost<N>
```

**⟶ `§2.1`'s node rule — the FOUR CASES, stated once (ADDED 2026-09-27, the TestWriter-handoff pass;
finding 1).** `node?: N | null` makes a node-less entry expressible, so the surface now owes the
*behaviour* of each shape rather than leaving it to the implementer. **"Present" below means
`node` is neither `undefined` nor `null`:**

| # | Supplied shape | Behaviour | Clause |
| --- | --- | --- | --- |
| **N-1** | **present** | the supplied object IS the entry's node; **`itemFactory` is NEVER called** (an injected spy asserts the count is `0`) | `M-5` |
| **N-2** | **absent or `null`, and `itemFactory` present** | the factory is called **once per node-less entry** and its return is placed **by reference** | `M-6` |
| **N-3** | **absent or `null`, and NO `itemFactory`** | refusal **`no-node`**; the key is **not owned** and **absent from `order`** | `F-3` |
| **N-4** | **`null` with `itemFactory` present but returning `null`/`undefined`** | refusal **`factory-returned-null`**; the key is **not owned** | `F-4` |
| **N-5** *(ADDED 2026-09-27 — the `ADV-LH-4` hole, closed)* | **a key whose FIRST occurrence is REFUSED, followed by a VALID occurrence of the same key in the same call** | **the VALID occurrence IS placed and owned** (a refused occurrence contributes NOTHING — least of all a reserved key); exactly **one** refusal per refused occurrence (`no-node` for the first in the drive `[{key:'k'}, {key:'k', node:n}]` with no factory), `order` contains `'k'` **once**, `ok === false` | `F-11`, `F-2`'s accepted-only scope, `M-19` |

**The order of checks is part of the rule: the KEY is validated first.** An entry that is **not an
object at all**, or whose **`key` is not a string**, is refused as **`malformed-entry`** (`F-5`) —
**before** any node/factory question is asked, so `{key: 42, node: X}` is `malformed-entry` and never
`no-node`. An entry with a **string key** — **including `''`** — falls through to the cases
above (**⟶ `FIVE` CASES AS OF 2026-09-27: `N-1`..`N-5`, the as-written "four" is superseded by the
appended `N-5` and nothing is renumbered**), which is exactly why `{key: '', node: null}` with no factory (**`F-5`'s own drive**) is
**`no-node`**, not `malformed-entry` (the empty-string ruling is stated in `§3.2` `F-5` and row
`M-18`). **`F-3`'s drive `[{key:'k'}]` is therefore the `N-3` case**, and nothing in `§2.1` requires
a node to be supplied for an entry to be expressed.

**The ACCEPTANCE rule — a key becomes "seen" only when an occurrence is ACCEPTED (ADDED 2026-09-27,
the adversarial + PBT-audit pass; finding `ADV-LH-4`, MED — `CONTRACT-AMENDED`).** The as-shipped
code called `seen.add(key)` **before** the node/factory validity question
(`src/shared/owned-list-host.ts:260`, read by that pass), so a key was "seen" even when the
occurrence that first carried it was **refused**. The observable hole: with **no**
`itemFactory`, `setEntries([{key:'k'}, {key:'k', node:n}])` produced **TWO** refusals
(`no-node` **+** `duplicate-key`) and `order === []` — even though the second entry is
**independently valid** and the mount could hold it. **That contradicts this section's own totality
note** ("refusing an invalid entry while placing the valid ones is **the contract**"), which is
**per-entry**, and it contradicts `N-3` (which refuses the key of a node-less entry only because
that ENTRY supplies no node — it says nothing about a *later* occurrence). **`F-2`'s first-wins rule
does not cover the shape**: it decides *which occurrence HOLDS* a key when both are valid; it never
said that a **REFUSED** first occurrence reserves the key. **The ruling — the majority reading of
this contract: the VALID entry is PLACED, and a refused occurrence contributes NOTHING.** Formally:
**the `duplicate-key` test is made against keys that have been ACCEPTED in this call, and a key is
added to the seen set only AFTER its occurrence is accepted** (i.e. after the key check AND the
node/factory check both pass). So `setEntries([{key:'k'}, {key:'k', node:n}])` with no factory
yields **one** refusal (`no-node`), places `n`, and `order === ['k']`. Disposition
`FIXED-this-pass` (host fix + regression row); **owner: the Implementer + TestWriter.** The row is
`§3.2 F-11`, the valid-state row is `§3.1 M-19`, and `F-2` is annotated **in place** (old text kept
visible) so `F-2` and `N-3` now agree.

**The mount-absence consequence and the `order`/`placed` non-parallelism (ADDED 2026-09-27, the
same pass; judgment call 9, `PARKED-with-revisit-condition`).** An unplaceable mount (`null`,
absent, or a malformed child surface — `M-15`/`M-16`) does **not** stop the host from OWNING keys:
`keys()` and the result's `order` still report the current key set (in the projected order), while
`placed` is `[]` because **nothing could be placed**. **The contract therefore never states
`order.length === placed.length`, and a consumer must not assume it**: `order` is an
ownership/projection statement and `placed` is a *placement* statement, and they diverge **exactly
when the mount cannot hold a node**. Any row or register cell that asserts **index-parallelism** of
`order` and `placed` is assertable **only over a placeable mount** — never over `M-15`/`M-16`'s
shapes. The reading itself stays `PARKED-with-revisit-condition` (§3b, judgment call 9); **the
text above is the contract and is stated here because it was previously unstated.**

**⟶ `§2.1`'s surface census — the eight declared methods and what each RETURNS (ADDED 2026-09-27,
the TestWriter-handoff pass; finding 4).** `OwnedListHost<N>` declares **eight (8)** methods —
`setEntries`, `remove`, `setOrder`, `render`, `activate`, `close`, `keys`, `dispose` — of which
**six (6)** return a **`ListHostResult`** (`setEntries`, `remove`, `setOrder`, `render`, `activate`,
`close` — the same six that are driven per state by every row of `§3`), **one (1)** returns
**`readonly ListKey[]`** (`keys()`) and **one (1)** returns **`void`** (`dispose()`). **The
"six result-returning methods" figure is what `§5.5.1 P-LH-TP-1`'s totality row covers** (the row's
as-written "seven" is corrected there). **"Eight methods" and "seven exports" are different counts
and neither is an error:** the **seven exports** are the **four type/interface declarations
(`ListKey`, `ListEntry`, `ListHostRefusal`, `ListHostResult`) plus `OwnedListHostOptions`,
`OwnedListHost` and `createOwnedListHost`** (§5.1 row 1, the static row `S-1`), while the **eight**
are the **methods on the `OwnedListHost` interface**, which is one of those exports.

**The refusal pattern, exactly.** **No method of this host throws — for any input.** Every method
returns a `ListHostResult`; a refused operation contributes a `ListHostRefusal` to `refused` and
leaves the host's state valid. `dispose()` returns `void` and is idempotent. **`ok` is `false` iff
`refused.length > 0`** (row `I-1`) — there is no "ok with refusals" state.
**⟶ SHARPENED 2026-09-27 (the TestWriter-handoff pass; finding 4 — the as-written sentence is kept
visible and NOT weakened): "Every method returns a `ListHostResult`" is TRUE OF THE SIX
result-returning methods** (`setEntries`, `remove`, `setOrder`, `render`, `activate`, `close`) **and
of nothing else** — `keys()` returns `readonly ListKey[]` and `dispose()` returns `void`, both per
the census above. **The refusal pattern itself (no throw, refusals land in `refused`, state stays
valid, `dispose()` is the only `void` return) is unchanged and applies to all eight methods**: a
refusal is only *reportable* by the six, because a refusal list is part of `ListHostResult`.

**Totality governs EVERY path — the injected seams of `setEntries` and `setOrder` are TOTAL, and
the `catch` is the contract (ADDED 2026-09-27, the adversarial + PBT-audit pass; finding
`ADV-LH-1`, HIGH — `CONTRACT-AMENDED`; `§7` item 8's seed `A-5` is RULED BY THIS CLAUSE, not
deferred).** **⟶ CORRECTED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass — a
DISPOSITION CORRECTION + FALSE-POSITIVE ANNOTATION; `ADV-LH-1` is `NOT-A-FINDING` (code), and the
finding paragraph below is kept VISIBLE, verbatim, because the record of the mis-read is the
point).** The as-shipped code catches a throwing `orderOf` on the `setOrder` path
(`src/shared/owned-list-host.ts:337`, read by that pass) but calls the same projection from
`setEntries` **outside any `try`** (`:300`, read by that pass), so an injected `orderOf` that
throws **escaped `setEntries`** — which **contradicted this section's own "no method of this host
throws — for any input"** and `§3.3 I-8`. **The ruling: the totality claim governs on EVERY path.
An `orderOf` that throws on `setEntries` MUST be caught exactly as it is on `setOrder` and MUST
NEVER escape.** Disposition `FIXED-this-pass` + a regression row owed; **owner: the Implementer
(the host fix) and the TestWriter (the row)**. **⟶ THE DISPOSITION ABOVE IS CORRECTED TO
`NOT-A-FINDING` (code) WITH A RECORDED FALSE-POSITIVE NOTE (2026-09-27, the `ADV-LH-1`
DISPOSITION-CORRECTION pass).** What was wrong is the sentence immediately above it: **the cited
"outside any `try`" call site (`:300`) is the *projection* call, not the comparator's invocation.**
From the code: the comparator's **ONLY** invocation site is inside `projectionFor`'s own
`try { … } catch { return keys.slice() }` (the guarded block: `:192-198` calling, `:214-222`
catching); `setEntries` reaches it through its **single** `projectionFor` call; and `setOrder`
**never invokes the comparator at all**. **⟶ STALE ANCHORS IN THIS SENTENCE, corrected 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑15**, LOW; the numbers above are kept visible): the live ranges are `:191-198` (guarded block), `:214-226` (catch), `:215-221` (comment), `:319` (the single `projectionFor` call), `:354-368` (`setOrder`), `:272-284`/`:380-388`/`:341-350` (the landed guards). The authoritative table is at the ANCHOR-DRIFT note in `§0`.**
So **a throwing `orderOf` never escaped ANY method, the
totality claim was already met on every path, and the guard pre-existed the fix** — the fix pass
added only the explanatory comment at that catch (`:215-220` — **⟶ STALE ANCHOR corrected 2026-09-27,
the DOCUMENTATION REVIEW, finding **F‑15**, LOW: live range **`:215-221`**; see `§0`'s ANCHOR-DRIFT
table**). **No host code is owed for this seam,
and the `§2.1` totality clause is KEPT AS A CLARIFICATION** (the rule is unchanged: a throwing
`orderOf` is caught on every path, yields the supplied order, and produces no refusal). The
**three parts below are therefore the contract's CLARIFICATION of an existing behaviour**, not a
behavioural change, and the **red `ADV-LH-1` row was a TEST-AUTHORING defect** (its
`expect(h.keys()).toEqual(['a','b'])` assertion was placed **after** its own sequence had already run
`close('b')`, contradicting the same row's later `['a']`/`[]` assertions and the `§2.1`
`close`/`remove`/`keys()` rules) — the TestWriter is fixing that placement in parallel
(strategy-only, no row deleted). **⟶ OWNER/OUTCOME CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW,
`AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding
**F‑14**, MED; the sentence above is the AS-RECORDED owner/outcome and is kept visible): the TestWriter
did NOT "fix a placement" — it **KEPT the rows** (`ADV-LH-1` and the four `ADV-LH-3` seams) as **green
positive regression rows** and **re-pinned their assertions to their proper drive boundary** (the rows'
drive arrays are built by executing every drive while constructing the array, so an "early" assertion
read the fully-advanced state). **The rows are kept and green; no behavioural change was needed for
those two seams.** **The observable, stated so the row can be authored
without guessing, is an EXPECTED BEHAVIOUR in three parts:**

1. **No throw from any of the six `ListHostResult`-returning methods** for a host constructed with
   an `orderOf` that always throws (the drive: `orderOf: () => { throw new Error('x') }`).
2. **Nothing is lost to the throw**: every VALID entry is still placed and owned, exactly as if
   `orderOf` had been omitted for the ordering decision — i.e. the **supplied order** is the
   fallback and `order` is the current key set in supplied order, each key once (`I-7`).
3. **No refusal code is invented for it.** `orderOf` is CALLER code, and this host's refusal
   vocabulary is **five** codes, none of which is "the comparator threw" — so a swallowed
   `orderOf` throw contributes **no** `ListHostRefusal` entry and `ok` stays `true` when nothing
   was refused (`I-1`). **The host never reports caller-code failure as a contract refusal and
   never re-throws it.**

**Totality extends to the INJECTED FUNCTIONS — a throwing `itemFactory`/`onActivate`/`onClose`
must not escape either, and each has a NAMED safe default (ADDED 2026-09-27, the same pass;
finding `ADV-LH-3`, MED — `CONTRACT-AMENDED`; `§3a A-12`'s THROWING half is RULED HERE, and its
NON-function half stays `RESOLVED-BY-PINNING`).** **⟶ SCOPED 2026-09-27 (the `ADV-LH-1`
DISPOSITION-CORRECTION pass; `ADV-LH-1` is `NOT-A-FINDING` and the `orderOf` seam of `ADV-LH-3` is
`NOT-A-FINDING` too, so this clause governs **THREE REAL seams** — `itemFactory`, `onActivate`,
`onClose` — whose guards the Implementer has landed; the `orderOf` row of the table below stays
visible as a CLARIFICATION of already-true behaviour, never as an amendment made because a method
formerly threw).** `A-12`'s wording covered **non-functions**, not
**throwing functions** — a caller-supplied `onActivate`/`onClose`/`itemFactory` that **throws**
also escaped, mid-call, and an `onClose` that threw escaped **with ownership already dropped**
(no result was returned at all). `A-12` is therefore ruled **in two halves**:

- **(i) NON-function / non-array injections stay as already recorded**: guarded and excluded from
  `I-8` and `§5.5.1 P-LH-TP-1` (`RESOLVED-BY-PINNING` — no assertion over those shapes is pinned
  in this unit's red set, and no seed may be cited as a finding).
- **(ii) A THROWING injected function MUST NOT escape a method either** — the same totality rule as
  `ADV-LH-1`, with the boundary stated explicitly: **the host catches the throw and continues with
  the safe default named for that injection.** `FIXED-this-pass` (host fix + regression row);
  **owner: the Implementer + TestWriter.**

| Injected function | What a throw means | The host's safe default (the catch) | Observable |
| --- | --- | --- | --- |
| `orderOf` | the caller's ordering policy failed **for that projection** | the entry takes the **supplied order** — identical to the omitted-`orderOf` default (`§2.2` prohibition 3: the default IS the absence of a policy, so no policy is invented). **⟶ CLARIFICATION, NOT A FIX (2026-09-27, the `ADV-LH-1` disposition-correction pass; `ADV-LH-1` and this seam of `ADV-LH-3` are `NOT-A-FINDING`): the comparator's single invocation site was ALREADY guarded inside `projectionFor`, so this row states behaviour the code met before any fix; `setOrder` never invokes the comparator at all, and `setEntries` reaches it only through that guard.** | no throw; `order` is the current key set in supplied order, once each; **no** refusal; ownership/placement unaffected |
| `itemFactory` | the caller's factory produced no node | the entry is refused **`factory-returned-null`** — the **same** class as a factory that RETURNS `null`/`undefined` (`F-4`) | no throw; `ok === false`; one refusal, `code === 'factory-returned-null'`; the key is not owned and absent from `order` (`N-4`) |
| `onActivate` | the caller's activation handler failed | the event is **swallowed**: activation is reported as it would be without a handler, and the method returns its `ListHostResult` | no throw; `ok === true`; the key stays owned; the callback is attempted **exactly once** for that `activate(key)` (`M-9`) |
| `onClose` | the caller's close handler failed | the event is **swallowed and the ownership drop STANDS** — the drop happens BEFORE the callback would fire | no throw; `ok === true`; the key is GONE from `keys()` and its node is removed (`M-10`); never "ownership dropped with no result returned" |

**No clause above weakens a refusal**: a thrown injected function never becomes a refusal of the
`orderOf`/`onActivate`/`onClose` kind (there is no code for it), and only `itemFactory` maps to an
existing documented code.

**Totality note, stated precisely so it cannot be over-read as a partial-write licence.** The host
is **atomic per call at the ownership level**: an entry that is refused is **not placed, not
owned, and not added to `order`**, while **every other entry in the same call is placed normally**.
This is **not** a partial write in the sense the prohibition-6/`SCH-8` family forbids: the host's
own contract is a **list of entries whose individual validity is caller-controlled**, and refusing
an invalid entry while placing the valid ones is **the contract**, not an error path. **A caller
that needs all-or-nothing supplies valid entries** — and a row asserts exactly that behaviour
(`F-3`, `F-4`, `F-5`).

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** the **mount**; every
**key** (an opaque string — "an opaque key" is the contract); every **node** (the caller creates it,
or supplies a factory that does); the **order** and the **`orderOf`** policy; the **payload**; every
**callback**; and every **visual/structural attribute** of the nodes.

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module's source contains **no occurrence** of `tab`/`Tab`, `strip`/`Strip`, `pane`, `zone`, `region`, `document`, `active`/`selected` as vocabulary; keys are typed as an **open** `type ListKey = string` (an alias, not a closed string union — so a consumer value can never be a member); the module documents **no** consumer constant. The only string-union is `ListHostRefusal['code']`'s **five** contract diagnostics. | static source row over the module file |
| **2** | **No app UI content** authored | The host authors **no** text, **no** label, **no** class, **no** style, **no** `role`/ARIA attribute, **no** default node, and **no** selected/active state. It writes **only** three things: `appendChild` (or the equivalent place operation) of a caller node, `remove()` of a node **it placed**, and **nothing else**. A static row asserts the module calls no attribute-writing method. | static row + `I-4` |
| **3** | **No policy defaults** | No default order policy, no default mount, no default node, no default label, no built-in comparator beyond *"keep the supplied order"* (which is the **absence** of a policy, not a policy), no default key. Omitted `orderOf`/`order` ⇒ **supplied order**, and that fact is pinned by a row. | `F-6` + `M-2` |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero file/`localStorage`/IPC. The host's **only** state is its own ownership bookkeeping (owned keys → placed nodes), which is the mechanism's necessary state — **it is not a store of consumer data and it persists nothing**; `dispose()` empties it, and a row asserts no state survives `dispose()`. **⟶ SUPERSEDED-BESIDE ON ITS NO-STORE HALF, 2026-10-03 (the H2a gate-4 landing pass; the as-filed row above is KEPT VISIBLE and is NOT rewritten): the "zero store" reading is superseded for THIS module — under `U-STORE-MODULES-BYTES` the module now RECEIVES the store as a DECLARED CALL PARAMETER and writes its OWN records through it (`docs/specs/store-modules-bytes.md` §2.1) — it is still NO UI-CONFIG STORE FOR CONSUMER DATA (that half of the clause is unchanged; the host owns no consumer-UI state and stores none). WHAT SURVIVES: no module-level state and no import (the handles are parameter-scoped; the module's `0`-import census is unmoved), the module persists nothing itself, and `dispose()` empties the bookkeeping — with the NEW release obligation reading BESIDE the landed "no state survives `dispose()`" claim: `dispose()` ALSO releases every store subscription the host registered (unsubscribe-on-dispose — releasing HANDLES, never the host's RECORDS; H2a §2.2).** | `M-14`, `I-5` |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, **no IPC method**. `ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**. | `tests/engine-pin-version.test.ts:174-197`'s **21**-member census (read) **must still pass unchanged**; plus a static import row **⟶ RE-READ BESIDE 2026-10-03 (the H2a gate-4 landing pass; `RCA-8(d)` — the as-filed row is NOT rewritten): the five-seam MCP negative and its census rows are UNMOVED — the store-backed amendment adds NO tool, NO resource, NO group, NO `RpcMethod`/`MUTATING_METHODS` member and NO IPC method. The STATIC IMPORT ROW's reading is re-stated BESIDE: the module still imports NOTHING — the store arrives as a DECLARED CALL PARAMETER, never as an import statement — so the no-import static and the `ALL_TOOLS`/`RpcMethod` census rows hold exactly as filed.** |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]** alone. The unit asserts **no** layout, paint, overflow, focus, real-click or rendered-geometry property, and its module expands no shim member. Real-DOM identity is **OPTIONAL** (`[U]`, §5.2) and **nothing in §3 depends on it**. | every §3 row carries `[T]`; the `[U]` row is optional and precondition-gated |

**⟶ THE STATIC ROWS' HOME, STATED SO THE CITATION CANNOT DRIFT (ADDED 2026-09-27, the
TestWriter-handoff pass; finding 8 — annotation, nothing moved).** **The static rows over the module
file live HERE, in `§2.2`'s six prohibitions, and in `§2.4` items 4/5** — *"the module's source
containing none of X"*, *"it calls no attribute-writing method"*, *"it imports nothing from
`src/renderer/**` and reads no child order"*. They are **assertion content of `§2.2`/`§2.4`, not
rows of a table**, and `§4.4` does **not** own them: **`§4.4` is the stop-condition table
`S-1`..`S-6`** (exactly as filed), and its `S-3`/`S-4` cells are the **stop conditions that MANDATE
those static rows** — `S-3` mandates the no-tree-read static row (`§2.4` item 4) and `S-4` mandates
the zero-graph-seam static row (`§2.4` item 5, `§5.1`, `§6`). **A citation of "the static row" may
therefore name `§2.2` prohibition 1/2/5/6, or `§2.4` item 4/5, or state the stop condition
(`§4.4 S-3`/`S-4`) whose mandated assertion it is — all three descriptions denote the SAME rows, and
no clause is weakened by any of them.** A brief that calls `§4.4`'s static rows "S-3/S-4" is citing
the **stop conditions**, not a row table; the reconciliation is this sentence, **not** a renumbering.

### 2.3 Ownership — the exact rule (the amendment's hard row, stated falsifiably)

1. **The host owns exactly the nodes it placed.** "Placed" means the node objects passed to (or
   returned by the factory for) the current entry set and appended by the host.
2. **On a `remove`/`close`/replacement, the host removes exactly those.** If a node it placed was
   meanwhile **detached by the caller**, the host's removal is a **no-op that must not throw**
   (`F-6`).
3. **Foreign siblings ARE NOT TOUCHED.** A foreign sibling is any child of the mount that the host
   did not place. **The hard row: a foreign sibling survives two re-renders as the SAME element
   (`toBe`, reference identity), and its position among its siblings is unchanged** (`M-8`).
4. **`dispose()` relinquishes ownership WITHOUT destroying the nodes.** The caller created them;
   destroying caller nodes would be a content/ownership overreach. **A row asserts that after
   `dispose()` every placed node still exists and is still reachable by the caller**, and that the
   host's bookkeeping is empty.
5. **The host never re-parents, clones, or re-creates a caller node.** **A row asserts reference
   identity** (`toBe`) of `placed[i]` against the exact object the caller supplied — for the whole
   life of the entry (`I-6`).

### 2.4 Order-as-projection — the exact rule

1. **`orderOf(entry)` is the comparator; it is INJECTED.** Omitted ⇒ the **supplied order**.
2. **`setOrder(keys)`** sets the projected order. Keys **not** in the current set and **duplicate**
   keys in `keys` are **ignored**; the projected order contains **exactly** the current keys, once
   each. **A row asserts the `order` field is a permutation of the current key set** (`I-7`).
3. **A permutation reorders the placed nodes with per-entry identity preserved** (`M-7`): after
   `setOrder`, `placed` is in the new order and each element is the **same object** as before.
4. **DOM order is NEVER the authority.** The host's own `keys()` is the state; the tree is its
   projection. **A row asserts that reordering does not read the tree** (the module contains no
   child-order read other than its own bookkeeping — a static row).
5. **An order change performs ZERO graph ops** (ruling 3): no `dispatch`, `op`, `applyCommand`,
   `load`, `teardown`. Static import row + a counter row using an injected spy is **not** possible
   (there is no graph seam) — so the row is the **static** one, and this spec says so rather than
   inventing a spy.

**⟶ THE TWO STATIC ROWS OF THIS SECTION, NAMED (ADDED 2026-09-27, the TestWriter-handoff pass;
finding 8).** **Static row 1 — "no tree read for order"**: the module's source contains **no**
child-order read (no `children` read used to compute `order`, no `firstChild`/`nextSibling`/
`childNodes` walk, no `querySelector`/`querySelectorAll`/`closest`/`getElementById`); `order` is
computed from the host's own bookkeeping. **Its id in the red set is `S-3`, cited as "`§4.4`'s
stop-condition `S-3` + `§2.4` item 4"** — the stop condition that mandates it, and the normative
clause that states it. **Static row 2 — "zero graph seam"**: the module imports nothing from
`src/renderer/**` or `src/main/**`, references no `electron`/`node:fs`, and contains no
`dispatch`/`op`/`applyCommand`/`load` call. **Its id in the red set is `S-4`, cited as "`§4.4`'s
stop-condition `S-4` + `§2.4` item 5, `§5.1`, `§6`"** (`§6`'s second falsification names exactly
this row as its test). **Neither row is owned by `§4.4` — `§4.4` owns the STOP CONDITIONS.**

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** real-DOM `ui` leg. Every row is
a **contract row** for the TestWriter; **none is a measurement this pass took.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **M-1** | **Empty set** | `createOwnedListHost({ mount })`; `render()`; `setEntries([])` | `ok === true`; `order` `[]`; `placed` `[]`; `removed` `[]`; `refused` `[]`; the mount is **unchanged**; **nothing throws** | `[T]` |
| **M-2** | **Supplied order is the default projection** | `setEntries([a, b, c])` with **no** `orderOf` | `order` is exactly `[a.key, b.key, c.key]`; `placed[i]` is entry `i`'s node **by reference**; the mount's child sequence for those nodes is `a, b, c` | `[T]` |
| **M-3** | **`orderOf`-projected order** | `orderOf: (e) => e.payload.n` with payloads `2, 0, 1` | `order` is by ascending `n`; `placed` follows; identity preserved | `[T]` |
| **M-4** | **`orderOf` ties keep supplied order (stability)** | Two entries with equal `orderOf` values | Their relative order is the supplied order — **the host does not invent a tiebreak** (prohibition 3). **A row asserts this, and a later pass must not "stabilise" it differently without amending this clause** | `[T]` |
| **M-5** | **The caller supplies nodes directly** | `setEntries([{key, node}])` | `placed[0] === node` (`toBe`); `itemFactory` is **never called** (an injected spy row) | `[T]` |
| **M-6** | **The factory path — a caller-INJECTED factory** | `setEntries([{key}])` with `itemFactory` | `placed[0]` is the factory's return **by reference**; the factory is called **once per node-less entry** | `[T]` |
| **M-7** | **Order-as-projection: a permutation preserves identity** | place 3 entries, then `setOrder([c, a, b])` | `order === [c, a, b]`; `placed` matches; **each element is the SAME object as before** (`toBe`); `removed` is `[]` (a reorder removes nothing) | `[T]` |
| **M-8** | **FOREIGN SIBLINGS SURVIVE (the `V-7` hard row)** | Append two caller-created foreign elements to the mount; `setEntries`/`render` **twice** | `ok === true`; **both foreign elements are the SAME objects after the second render** (`toBe`); they were never removed or re-appended; their relative order is unchanged; the host placed its own nodes **inside the same mount** | `[T]` |
| **M-9** | **Activation fires exactly once** | `activate(key)` on a known key | `onActivate` called **exactly once** with `(key, entry)`; `ok === true`; `refused` `[]`; a second `activate(key)` calls it **again once** (activation is not one-shot — a row asserts the count is exactly 1 **per call**) | `[T]` |
| **M-10** | **Close fires exactly once and drops ownership** | `close(key)` on a known key | `onClose` called **exactly once**; the key leaves `keys()`; the node the host placed is **removed from the mount**; `removed` contains it | `[T]` |
| **M-11** | **`remove(key)` is `close`'s sibling and does not fire `onClose`** | `remove(key)` | the key leaves `keys()`; the node is removed; **`onClose` is NOT called** (the two are distinguishable — a row asserts the count is 0) | `[T]` |
| **M-12** | **Replacement keeps the caller's node identity when the caller supplies the same object** | `setEntries([e])`, then `setEntries([e])` again | the same node object is still placed (`toBe`); **no remove+re-add cycle is observable** (`removed` is `[]`) — `I-2` | `[T]` |
| **M-13** | **`setEntries` replaces a changed node for the same key** | `setEntries([{key:'k', node: n1}])` then `setEntries([{key:'k', node: n2}])` | `n1` appears in `removed`; `placed[0] === n2`; `order` still contains `'k'` **once** | `[T]` |
| **M-14** | **`dispose()` relinquishes ownership without destroying caller nodes** | place 3, `dispose()` | no method throws; `keys()` `[]`; the three nodes **still exist and are still reachable by the caller** (reference-held, not removed); **no further host state** (`I-5`); a second `dispose()` is a no-op. **⟶ RULED 2026-09-27 (the TestWriter-handoff pass; finding 6): "(reference-held, not removed)" is the CONTRACT, not one reading of `dispose()`'s "place nothing" — `dispose()` REMOVES NOTHING from the mount (the nodes stay children of the mount, in their projected order, and appear in no `removed` list); the reasoning and the two readings are stated at `§2.1 dispose()` and `§2.3` item 4. **The assertion is the ROW ITSELF** — every placed node `removed === false`, the mount's child sequence reference-identical across `dispose()` — **and the register's home for the same behaviour is `§5.5.1 P-LH-SM-2`'s `dispose()` sequence (the `8`-sequence table's sixth entry), which asserts `keys()` `[]` + each caller node still reference-reachable with its `removed` flag unchanged.** **⟶ ADDED 2026-10-03 (the H2a gate-4 landing pass; the RELEASE OBLIGATION BESIDE the landed assertions): under the store-backed contract (`docs/specs/store-modules-bytes.md` §2.2) `dispose()` now ALSO releases every store subscription the host registered — the one subscription on `mem.list.<hostId>.order` is unsubscribed (its `unsubscribe()` called exactly once, first answer `true`), the active-subscription set reads EMPTY, and a post-dispose external write to `mem.list.<hostId>.order` delivers NOTHING to the host (`F-LS-1`/`F-LS-2` of that contract). The landed reading SURVIVES in full: `dispose()` still REMOVES NOTHING from the mount (reference-held, not removed; `M-18`), releases HANDLES never RECORDS (the store records remain — H2a §2.2 P6), and stays `void`, idempotent and non-throwing.** | `[T]` |
| **M-15** | **A `null`/absent mount ⇒ every operation a no-op with a VALID state** | `createOwnedListHost({ mount: null })`; `setEntries`/`setOrder`/`activate`/`close`/`render`/`keys` | **no throw for any call**; `ok === true` when the input was valid (nothing was refused — the host simply has nowhere to place); `keys()` still reports the **current** keys; `placed` is `[]`; `removed` is `[]`. **A later `mount` is NOT retro-fitted** (the option is read once — a row pins that no setter exists). **⟶ ANNOTATED 2026-09-27 (the adversarial + PBT-audit pass; judgment call 9): `order` here is the CURRENT KEY SET while `placed` is `[]` — this drive is the witness that `order.length === placed.length` is NEVER asserted by this contract (`§2.1`'s mount-absence paragraph, `I-7`). No clause of this row is weakened and its drive is unchanged.** | `[T]` |
| **M-16** | **A mount whose child surface is malformed is a valid no-op, never a throw** | `mount: {}`, `mount: 42`, `mount: 'div'` | **no throw**; operations behave as M-15's no-op path; `ok === true` for valid inputs (nothing refused), `refused` `[]`. **The mount's absence is a configuration, not an error** | `[T]` |
| **M-17** | **`ok` reflects the current call only** | A call with one refused entry followed by a clean call | The second call's `ok === true` and `refused` `[]` — refusals do not accumulate into host state | `[T]` |
| **M-18** | **An EMPTY-STRING key is an ordinary opaque key — `''`, whitespace, unicode and long keys all work IDENTICALLY, and NOTHING normalizes a key** (ADDED 2026-09-27, the TestWriter-handoff pass; finding 2 — the `§3a A-8` premise, made a row) | `setEntries([{key:'', node:na}, {key:' b\t', node:nb}, {key:'ünïcøde', node:nc}, {key:'x'.repeat(4096), node:nd}])`, then `setOrder([the long key, '', 'ünïcøde', ' b\t'])`, then `close('')` | **no throw anywhere**; `ok === true` and `refused` `[]` for every call; `order` is exactly the four keys **verbatim** (byte-identical, **no trim, no case-folding, no unicode normalization, no length check, no empty-string special case**); each `placed[i]` is the supplied node **by reference**; `''` is a **key like any other** and never collides with `' b\t'` or the long key; `close('')` fires `onClose` **once** with `('', entry)` and removes that node **from the mount**; the host's own `keys()` contains `''` **exactly once** and no longer contains it after the `close`. **This row rules NOTHING about the `§3a A-9` seed (`A-9` gives TWO keys ONE shared node object; `M-18` gives each key its OWN node) — `A-9` stays `OWED`** | `[T]` |
| **M-19** | **A REFUSED first occurrence does NOT reserve its key — a later valid duplicate is PLACED** (ADDED 2026-09-27, the adversarial + PBT-audit pass; finding `ADV-LH-4`, MED — the valid-state half of the hole `F-11` documents) | `setEntries([{key:'k'}, {key:'k', node:n}])` with **no** `itemFactory` | **no throw**; **exactly one** refusal and its `code === 'no-node'` (the FIRST occurrence — the only refused one); **no** `duplicate-key` refusal exists for this call; `order` is exactly `['k']` (each key **once**); `placed` is `[n]` **by reference** (`toBe`); `ok === false` (the first occurrence WAS refused — `I-1`); the key is owned **once** and `close('k')` removes `n` from the mount (`§2.1`'s ACCEPTANCE rule, `N-5`, `F-11`) | `[T]` |
| **M-20** | **A NON-ARRAY argument is a silent empty set / a no-op — never a throw, and `setEntries`'s reading DROPS prior ownership** (ADDED 2026-09-27, the same pass; judgment call 5) | populate 3 entries, then `setEntries(42)` / `setEntries({})` / `setEntries('x')`; and separately `setOrder(42)` after a projected order **⟶ DRIVE NARROWED TO WHAT IS ACTUALLY DRIVEN 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑17**, LOW; the wider form above is kept visible): the unit's own row drives **`42` ONLY, for BOTH halves** (`tests/owned-list-host.test.ts:1954`), and the blind record drives only `setEntries(42)` too (`docs/specs/listhost-greens.md`). The `{}` and `'x'` argument shapes are covered by the **register's executed pool** (`§5.5.1 P-LH-TP-1`), **not by this row's drive** — the stated drive was a superset of what runs. The RULE the row states (a non-array argument is a silent empty set / a no-op) is unaffected and stands as the contract for every non-array shape** | `setEntries`: **no throw**; `ok === true`; `refused` `[]`; `order` `[]`; `placed` `[]`; **the 3 previously placed nodes are removed and appear in `removed`** — the ownership drop is the OBSERVABLE consequence and it is the contract (`§2.1 setEntries`). `setOrder`: **no throw**, the projected order is **UNCHANGED**, `ok === true`, `refused` `[]`. **This is the drive `§3b`'s judgment call 5 carries: the disposition of the reading is `PARKED-with-revisit-condition`, while the ownership-drop consequence above is CONTRACT TEXT** | `[T]` |
| **M-21** | **`render()`'s write policy — a caller-detached node is never re-appended, so its detach is PERMANENT for that key** (ADDED 2026-09-27, the same pass; judgment call 10) | place entries, the caller detaches one host-placed node from the mount, then `render()` (twice) | **no throw** on either call; the host **does not** re-append the detached node (`render()` writes only where its own bookkeeping disagrees with the mount, and the bookkeeping still owns the key) — the node stays out of `mount.children` after both renders; `keys()`/`order` still name the key (`I-7`); the second render is a no-op at the DOM level (`I-2`, `removed` `[]`); the key is not left dangling and a later `close(key)` removes nothing (no throw, `F-6`) | `[T]` |

**⟶ ROW `M-18` IS ADDED AFTER `M-17` — NOTHING IS RENUMBERED (ADDED 2026-09-27, the
TestWriter-handoff pass).** `M-18` is the **positive** drive of the empty-string-key rule that
`§3.2 F-5`'s corrected trigger needs (finding 2); `I-1`..`I-9`, `M-1`..`M-17`, `F-1`..`F-10` keep
their ids and their text. The row exists because `§3a A-8`'s premise (*"a key of `''` (empty
string), a key with whitespace, a unicode key, and a very long key — opaque, so all must work
**identically**; a row asserts no normalization anywhere"*) **needs a §3 row to be falsifiable
against**, and because the reconciled `F-5` must not be the only clause mentioning `''`.

**⟶ ROWS `M-19`, `M-20` AND `M-21` ARE ADDED AFTER `M-18` — NOTHING IS RENUMBERED (ADDED
2026-09-27, the adversarial + PBT-audit pass; findings `ADV-LH-4` and the pass's judgment calls
5 and 10).** The three rows are APPENDED after `M-18` for the same reason `M-18` was appended after
`M-17`: they are the falsifiable drives of three clauses that had none. **`I-1`..`I-9`, `M-1`..`M-18`
and `F-1`..`F-10` keep their ids and their text.** `M-19` carries the **valid-state** half of the
`ADV-LH-4` ruling (`§2.1`'s ACCEPTANCE rule); `M-20` carries the **silent-empty-set /
silent-no-op** reading whose **ownership-drop consequence is now contract text** (judgment call 5,
whose disposition stays `PARKED-with-revisit-condition`); `M-21` carries `render()`'s **write
policy** and the **permanence** of a caller detach (judgment call 10, `ACCEPTED-AS-PINNED`).
**These three rows are NOT in the `52`-row red set that was authored and RUN** (`§0`'s
TestWriter-handoff note) — they are **contract rows owed to the regression-row pass the `ADV-LH-*`
findings mandate** (`§3b`), so the next TestWriter authors them RED before the Implementer fixes
anything, and **no already-authored row is edited to make them pass** (§4.2 item 4).

### 3.2 Documented fail-states / refusals (each is a typed `code`, and each is a row)

**⟶ ONE `M-18` LINK, STATED SO THE "each is a row" CLAUSE STAYS EXACT (ADDED 2026-09-27, the
TestWriter-handoff pass; finding 2).** Every `F-*` id below is a row of **this** table. **`F-5`'s
correction (see the ruling after the table) adds NO row here and renumbers nothing: the corrected
`F-5` is still one row, and the positive drive of the empty-string-key rule it was corrected to is
the `§3.1` row `M-18`** — a valid-state row, not a refusal row, which is why it is not in this
table. The `F-1`..`F-10` id set is unchanged.

**⟶ ROW `F-11` IS ADDED AFTER `F-10` — NOTHING IS RENUMBERED, AND THE `F-1`..`F-10` ID SET NOW READS
`F-1`..`F-11` (ADDED 2026-09-27, the adversarial + PBT-audit pass; finding `ADV-LH-4`, MED —
`CONTRACT-AMENDED`).** `F-11` is the **refusal half** of the `ADV-LH-4` ruling (the valid-state half
is `§3.1 M-19`): it documents the shape the as-shipped code got **wrong** (two refusals and an empty
`order` where the contract places the valid entry), and it is the drive whose **RED** row the next
TestWriter authors before the Implementer touches the host. **`F-2` and `F-11` are two different
shapes and both remain rows**: `F-2` is *two valid occurrences* of one key (first-wins, one refusal,
first occurrence placed) and `F-11` is *a refused first occurrence followed by a valid one* (the
valid occurrence placed, the refusal counted per refused occurrence). **`F-11` is NOT in the
`52`-row red set that was authored and RUN** — like `M-19`..`M-21`, it is **contract text owed to
the regression-row pass** (`§3b`), and the counts that cite `F-1`..`F-10` (`§4.2` item 1,
`§5.5.1 P-LH-SM-2`'s compensating-sample cell, `§5.5.1`'s register integration) are annotated where
they appear rather than renumbered here.

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **Unknown key** | `remove('nope')` / `close('nope')` / `activate('nope')` | **no throw**; `ok === false`; `refused` has exactly one member with `code === 'unknown-key'` and the **exact key string** as supplied; **no callback fires**; state unchanged | `[T]` |
| **F-2** | **Duplicate key in one `setEntries` call** | `setEntries([{key:'k', node:a}, {key:'k', node:b}])` | **no throw**; **one** refusal with `code === 'duplicate-key'`; **the FIRST occurrence is placed and the second is refused** (first-wins, stated so it is not ambiguous) — **⟶ SCOPED 2026-09-27 (the adversarial + PBT-audit pass, finding `ADV-LH-4`; the as-written clause is kept visible and NOT weakened): first-wins applies when the FIRST occurrence is itself ACCEPTED, i.e. the duplicate test is made against keys ACCEPTED in this call (`§2.1`'s ACCEPTANCE rule). A first occurrence that is REFUSED reserves nothing and its key may be taken by a later VALID occurrence — see `F-11` and row `M-19`**; `order` contains `'k'` **once** | `[T]` |
| **F-3** | **An entry with no node and no factory** | `setEntries([{key:'k'}])` with **no** `itemFactory` (the node **absent** — the type is `node?: N \| null`, so *absent* and *`null`* are the SAME case here; see the §2.1 node rule `N-3`) | **no throw**; one refusal with `code === 'no-node'`; the key is **not owned**; `order` does not contain it; `ok === false` | `[T]` |
| **F-4** | **The factory returns `null`/`undefined`** | `itemFactory: () => null` | **no throw**; one refusal with `code === 'factory-returned-null'`; the key is not owned | `[T]` |
| **F-5** | **A malformed entry** | A non-object entry (a bare string, a number); a **non-string `key`** (`42`, `null`, `{}`, `undefined`) — the entry **shape** is what this class refuses, and a string key (including `''`) is never malformed (see the ruling below, and `F-3` for `node: null` with no factory) | **no throw**; one refusal with `code === 'malformed-entry'`; other entries in the same call are placed normally (the §2.1 totality note) | `[T]` |

> **⟶ THE THREE NODE/FACTORY REFUSAL CLASSES, DISAMBIGUATED IN ONE PLACE (ADDED 2026-09-27, the
> TestWriter-handoff pass; findings 1 and 2).** `F-3`, `F-4` and `F-5` are adjacent and were the
> clauses a TestWriter could not pin without a ruling, so their boundaries are stated once here:
> **(1)** a **non-string `key`** or a **non-object entry** ⇒ **`malformed-entry`** (`F-5`);
> **(2)** a **string key** whose node is **absent or `null` and no `itemFactory` is supplied** ⇒
> **`no-node`** (`F-3`) — **including the drive `{key:'', node:null}`**, because `''` is a valid key;
> **(3)** a **string key** whose node is **absent or `null` with an `itemFactory` that returns
> `null`/`undefined`** ⇒ **`factory-returned-null`** (`F-4`). **`F-3` never yields
> `malformed-entry`, and `F-5` never yields `no-node`** — the check order is stated in `§2.1`'s node
> rule (key first, then node/factory).

> **⟶ CORRECTED IN PLACE 2026-09-27 (the TestWriter-handoff pass; finding 2 — the old trigger text is
> kept visible, not rewritten).** **AS FILED, `F-5`'s trigger read `key` not a string (`` `42` ``,
> `` `null` ``, `` `{}` ``, `` `''` ``)** — and **`''` is a string**, so the cell was
> self-contradictory (it listed a member of the class it claimed to exclude) *and* it contradicted
> `§3a A-8`'s premise that a key of `''` "must work **identically**" to any other opaque key.
> **THE RULING — `''` IS A VALID KEY AND `F-5` IS THE CLAUSE THAT LOSES.** The deciding clauses are
> the contract's own, in this order: **(i)** `§2.1` declares `export type ListKey = string`, and
> **nothing in this spec states any content/emptiness/length/normalization restriction on a
> `ListKey`**; **(ii)** `§2.2` names every key "an **opaque** string — *'an opaque key'* is the
> contract", i.e. the host may **compare for equality and report back** and **never interprets it**;
> **(iii)** `§2.1`'s refusal vocabulary is **five** codes, none of which is "empty" or "invalid key
> content" — and `F-5`'s own parenthetical was the only text claiming otherwise, in a parenthetical
> that mis-classified its own example. **A clause that contradicts its own example loses to the
> definitional clauses**, so `''` is **valid**, `''` is **never normalized**, and the corrected
> trigger supplies `undefined` in the non-string position (`undefined` is not a string under
> `ListKey`, and no other clause mentions it — so the substitution invents nothing). **`A-8`'s
> premise SURVIVES AS CORRECT** (annotated there); the **positive** drive of the rule is the new
> `§3.1` row **`M-18`**. **`A-8` is corroboration, NOT the authority for this ruling** — it is a seed
> row in `§3a`, and this ruling rests on `§2.1`/`§2.2`'s definitional clauses (i)–(iii) above; a later
> pass may not overturn the ruling on the ground that a seed is not normative.
>
> **What this means for each drive that touches `''` — stated so no reader has to infer it, and so a
> one-pass remand can re-pin exactly the right rows:**
>
> | `''` drive | Refusal? | Code | Deciding clauses |
> | --- | --- | --- | --- |
> | `setEntries([{key:'', node:n}])` | **no** — placed and owned | — | `M-18`, `§2.1` (`ListKey`), `§2.2` (opaque) |
> | `setEntries([{key:'', node:null}])`, no factory | **yes** | **`no-node`** — because **`''` is a valid key**, so the entry is **not** malformed and falls through to `§2.1`'s case `N-3` | `§2.1` node rule (`N-3`), `F-3`, `F-5`'s `node: null`-with-no-factory clause |
> | `setEntries([{key:''}])`, no factory | **yes** | **`no-node`** | `§2.1` node rule (`N-3`), `F-3` |
> | `setEntries([{key:'', node:null}])` with a factory | **no** | — | `§2.1` node rule (`N-2`), `M-6` |
> | `remove('')`/`activate('')`/`close('')` on a **known** key | **no** | — | `M-9`, `M-10`, `M-11` |
> | `remove('')`/`activate('')`/`close('')` on an **unknown** key | **yes** | `unknown-key` | `F-1` |
> | `setOrder([''])` | **no** — ignored-if-unknown, never refused | — | `F-8`, `§2.4` item 2 |
>
> **`F-5`'s OTHER trigger, `node: null` with a factory absent, is a SHAPE (not a code) and it is
> RE-HOMED by this correction** — the **as-filed** cell listed that shape while expecting
> `malformed-entry`, but `§2.1`'s node rule and `F-3` make it **`no-node`**, so the **corrected
> `F-5` trigger above no longer claims it** (the shape remains documented, in `F-3`). The two rows
> agree once the corrected trigger is read as *"a non-object entry, or a non-string `key`"* (the
> `malformed-entry` class) rather than as a list of codes for every shape in the cell. **This is the
> single sharpest consequence of the ruling: a `node: null` + no-factory entry is `no-node`, and
> `''` is a key like any other.**
| **F-6** | **A previously placed node was detached by the caller** | The caller removes a host-placed node from the mount itself, then `close(key)`/`setEntries([])` | **no throw**; the removal is a no-op; the key still leaves `keys()`; the node appears in `removed` **or not** — **the row pins that the host does NOT throw and that the key is not left owned**. **⟶ PINNED 2026-09-27 (the adversarial + PBT-audit pass; judgment call 10): the code's observed behaviour is the pinned reading — a DETACHED node still appears in `removed` (the host reports what it removed for the key, whether or not the tree still held it). The "or not" above is therefore no longer an open choice for the implementer; it is the as-shipped reading of an already-shipped unit, and `render()` does not undo the detach (`M-21`).** *(This is the one cell deliberately stated as a choice for the implementer, because the shim's `remove()` is idempotent at `src/shared/dom-shim.ts:89-96`, read: the honest contract is "no throw, no dangling ownership", not a specific `removed` membership.)* | `[T]` |
| **F-7** | **A `null`/absent mount is NOT a refusal** | M-15's configuration | `refused` is `[]` and `ok === true` — **the malformed-mount class of `U-MOUNTGUARD`'s `mount-not-appendable` does NOT apply here**: this host's absent mount is a **supported no-op configuration**, while `U-MOUNTGUARD`'s probe is **asking a question about a tree**. **The asymmetry is deliberate and recorded so a later pass does not "harmonise" the two** | `[T]` |
| **F-8** | **`setOrder` with unknown/duplicate keys** | `setOrder(['a','a','nope'])` | **no throw**; unknown/duplicate keys are **ignored**, not refused; `order` is the current key set in the requested relative order; `ok === true`; `refused` `[]`. **Stated so the "ignored" rule is not confused with a refusal** | `[T]` |
| **F-9** | **`setEntries(null)` after a populated set** | populate 3, then `setEntries(null)` | **no throw**; the 3 host-placed nodes are removed; `order` `[]`; the 3 nodes appear in `removed`; foreign siblings untouched (**the `M-8` row re-run in this shape**) | `[T]` |
| **F-10** | **`activate` on a key whose node was detached** | detached node, then `activate(key)` | The callback **still fires once** (activation is a caller-semantic event, not a DOM event) — a row pins it, so a later pass cannot make activation silently depend on the tree | `[T]` |
| **F-11** | **A key whose FIRST occurrence is REFUSED, followed by a VALID occurrence of the same key** (ADDED 2026-09-27, the adversarial + PBT-audit pass; finding `ADV-LH-4` — the hole between `F-2` and `N-3`, now closed) | `setEntries([{key:'k'}, {key:'k', node:n}])` with **no** `itemFactory` | **no throw**; **ONE** refusal, `code === 'no-node'` (the refused first occurrence; `refused` has exactly one member and **NO** `duplicate-key` member); **the second, valid occurrence IS placed** — `placed === [n]` by reference (`toBe`) and `order === ['k']` (the key owned **once**, `I-7`); `ok === false` (`I-1`); a subsequent `close('k')` fires `onClose` once and removes `n` from the mount. **This is the EXPECTED BEHAVIOUR the `ADV-LH-4` fix must satisfy: a key becomes "seen" only when an occurrence is ACCEPTED** (`§2.1` ACCEPTANCE rule, `N-5`, `M-19`) | `[T]` |

**⟶ TWO COMPOSITION/RE-ENTRANCY RULINGS FOR THIS TABLE'S SHAPES (ADDED 2026-09-27, the adversarial +
PBT-audit pass; `ADV-LH-9` and `ADV-LH-10`, both INFO — `RESOLVED-BY-PINNING`).** Neither adds a row;
both are rulings a later pass would otherwise have to guess at.

1. **`ADV-LH-9` — the `dispose()` composition hazard, ruled at seed `§3a A-10`.** `dispose()` leaves
   its nodes **as ORPHANS IN THE MOUNT** (no detach — that is `M-14`/`§2.3` item 4 and it is NOT
   changed here). The consequence, now stated: **a SECOND host on the same mount appends AFTER those
   orphans**, and the orphans are not its own nodes, so it neither owns nor removes them — the new
   host remains correct (`I-3`/`M-8`: it treats them as foreign siblings), but the **mount's child
   sequence carries the disposed host's dead entries**. **This is a CONSUMER COMPOSITION HAZARD, not
   a host defect**: the contract for one host on one mount is unchanged, and a consumer that wants a
   clean mount must clear it itself (the host authors no cleanup, prohibition 2/4).
2. **`ADV-LH-10` — the re-entrancy ruling, ruled at seed `§3a A-17`.** **Ownership is dropped BEFORE
   `onClose` fires** (`M-10`'s order), so a **re-entrant callback cannot resurrect state or
   double-fire** the callback: a `close(key)` issued from inside `onActivate`/`onClose` sees the key
   already dropped or still owned exactly once, and the callback count for the outer call stays
   **exactly one** (`M-9`/`M-10`). **One benign consequence is now stated rather than left
   implicit:** a re-entrant `setEntries` **inside** a callback **does change what the outer call's
   `order`/`placed` report**, because those arrays are computed from the host's bookkeeping when the
   outer method returns — so the outer result describes the **state after** the re-entrant call
   settled, not a snapshot taken at the outer call's start. **That is the pinned reading; it is
   benign and it is not a defect** — the result stays internally consistent (`I-1`, `I-7`) and no
   ownership is duplicated.

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here |
| --- | --- | --- |
| **I-1** | `ok === (refused.length === 0)` **always** | No "ok with refusals" state exists |
| **I-2** | A `render()` with unchanged inputs performs **no** child mutation: `removed === []` and no node is re-appended | Idempotence, and what makes `M-12`/`M-7` assertable |
| **I-3** | **Foreign siblings are reference-identical before and after every call** | The amendment's hard row, as an every-state invariant (stronger than `M-8` alone) |
| **I-4** | The host writes **only** `appendChild`-class placement of caller nodes and `remove()` of **its own** placed nodes — **no attribute write, no `textContent` write, no `className`, no `style`** | Prohibition 2, made falsifiable (static row + a state row) |
| **I-5** | After `dispose()`, the host retains **no** owned key, **no** placed-node reference, and no other state **⟶ 2026-10-03 (the H2a gate-4 landing pass; the release obligation BESIDE): under the store-backed contract, "no other state" now ALSO reads **no retained store-subscription handle** — each closure-held handle is released by `dispose()` (`unsubscribe()` once per handle, first call `true`; H2a §2.2 P1) — and the landed reading (no owned key, no placed-node reference) SURVIVES | Prohibition 4 |
| **I-6** | For every owned key, `placed[i]` is **reference-identical** to the object the caller supplied (or the factory returned) for the whole life of the entry | §2.3 item 5 — the anti-cloning rule |
| **I-7** | `order` is **exactly** the current key set, each key **once**, in some order — **⟶ SHARPENED 2026-09-27 (the adversarial + PBT-audit pass; judgment call 9): `order` is an OWNERSHIP statement and not a placement statement, so it holds even when nothing could be placed (`M-15`/`M-16`: `order` is the current key set while `placed` is `[]` — `order.length === placed.length` is NEVER asserted by this contract)** | §2.4 item 2 |
| **I-8** | No method throws **for any input** — the totality claim, asserted by a fuzz-shaped deterministic table (`null`, `undefined`, numbers, strings, arrays-in-place-of-objects, detached nodes, a mount that is a `ShimElement` already holding host-placed children) | The refusal contract's boundary. **⟶ NOTE 2026-09-27 (the `§5.5` re-derivation; the clause above is kept visible): this row's quantification now has a REGISTER HOME — `§5.5.1`'s `P-LH-TP-1` / `S-LH-SEED-1`, which drives all eight public methods against a pinned-seed enumeration (seed `20260927`, 64 attempts, ≤100-row / ≤400-register caps). "Fuzz-shaped" is NOT a licence to add a generator: the enumeration is hand-rolled in the test file (no `fast-check`, no dependency). The row stays a per-state `[T]` row; the register row is what makes its `for any input` claim count.** **⟶ SCOPED 2026-09-27 (the TestWriter-handoff pass; finding 7): the table this row is driven by MUST NOT include the `§3a A-12` shapes (`orderOf`/`itemFactory`/`onActivate`/`onClose` supplied as NON-functions; `order` as a NON-array; `options` as `null`/a string), because `§3a` says no seed "is a finding" and `§7` item 8 leaves the unruled seeds unruled — pinning `A-12` here would answer what the contract has not. `A-12` is named as OWED, with its owner, at `§3a A-12`, at `§7` item 8 and at `§5.5.1 P-LH-TP-1`'s pool note. `I-8`'s "for any input" therefore remains an UNBOUNDED claim that NO row of this unit proves — honestly, not silently.** |
| **I-9** | Every `ListHostResult` array is a **fresh array** and the result object is not reused across calls (a caller mutating a returned array cannot change host state) | A small but assertable anti-aliasing rule |

**⟶ `I-8`'s QUANTIFICATION IS NOW SCOPED BY TWO RULED CLAUSES (ADDED 2026-09-27, the adversarial +
PBT-audit pass; findings `ADV-LH-1`, `ADV-LH-3` and `ADV-LH-4` — `CONTRACT-AMENDED`).** **⟶ CORRECTED
2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass): the REAL scoping findings are `ADV-LH-3`
(its three `itemFactory`/`onActivate`/`onClose` seams — `CONTRACT-AMENDED`, guards landed) and
`ADV-LH-4`; `ADV-LH-1` and `ADV-LH-3`'s `orderOf` seam are `NOT-A-FINDING` (the throwing comparator
was ALREADY caught on every path — see the note under item 1).** The cell above
is kept as written and is **NOT weakened**; what changed is that "for any input" now has three
ruled boundaries instead of one:

1. **`ADV-LH-1` — the THROWING `orderOf`.** A host built with an `orderOf` that throws is **inside**
   `I-8`'s quantification, on **both** the `setEntries` and `setOrder` paths: **no method throws**
   and the supplied order is used (`§2.1`'s totality clause). The as-shipped `setEntries` path
   violated this and is `FIXED-this-pass` — so the TestWriter's no-throw table may (and must) drive
   the throwing-comparator shape, and the row's RED is the escape.
   **⟶ CORRECTED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass; the sentence above is kept
   visible): `ADV-LH-1` is `NOT-A-FINDING` (code) — the comparator's single invocation site was
   ALREADY inside `projectionFor`'s guarded block, `setEntries` reaches it only through that one
   call, and `setOrder` never invokes it, so **no method of this host ever threw for the
   throwing-comparator shape** and there is **no RED owed for it**. The TestWriter may still drive
   the shape (the `§2.1` totality clause is a CLARIFICATION of existing behaviour and the drive is
   a valid assertion), but it is **not** a red-then-green regression row, and the redness recorded
   against this row was a **test-authoring defect** (an `expect(h.keys()).toEqual(['a','b'])`
   placed AFTER its own sequence's `close('b')`, contradicting the same row's later assertions).**
   **⟶ OWNER/OUTCOME CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 —
   record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED): the outcome is
   NOT "the row was deleted or its placement merely fixed" — the TestWriter **KEPT the row** as a
   **GREEN positive regression row** and **re-pinned its assertion to the row's proper drive boundary**
   (the drive array is built by executing every drive while constructing the array, so an "early"
   assertion read the fully-advanced state). **So `ADV-LH-1` DOES have a driven row — one of the five
   green rows (`ADV-LH-1` + the four `ADV-LH-3` seams) at
   `tests/owned-list-host.test.ts:2421-2691` — and the owner reads "row KEPT + re-pinned", not "no red
   row owed".** The clause's substantive half above STANDS: **no red-then-green HOST regression was
   owed**, because the guard pre-existed and the code needed no behavioural change for those two
   seams.**
2. **`ADV-LH-3` — the THROWING injected functions.** The same holds for **throwing**
   `itemFactory`/`onActivate`/`onClose` (each with the safe default `§2.1` names), which `A-12`'s
   as-written wording did **not** cover. **This is ADDED to `I-8`'s scope** — while `A-12`'s
   **NON-function/non-array** shapes remain **outside** it (`RESOLVED-BY-PINNING`, per the SCOPED
   note in the cell above).
3. **`ADV-LH-4` — the REFUSED-first-occurrence shape.** `I-8`'s "for any input" includes
   `setEntries([{key:'k'}, {key:'k', node:n}])` with no factory; that call must not throw **and**
   must satisfy `F-11`/`M-19` (one refusal, `n` placed). The cell's own table therefore gains this
   shape as a **valid** drive rather than an excluded one.

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/owned-list-host.test.ts`** — authored **first**,
**RUN**, and its failing set **REPORTED verbatim** before any implementation. Expected red shape:
`Cannot find module '../src/shared/owned-list-host.js'` (or the equivalent resolution failure) for
every row. **There is no host-fix branch for this unit** (contrast `U-MOUNTGUARD`): the module does
not exist, so the red is purely additive.

### 4.2 Red-set authoring order

1. Write `I-1`..`I-9`, `M-1`..`M-17`, `F-1`..`F-10` **in that order**. **⟶ AMENDED 2026-09-27 (the
   TestWriter-handoff pass): the enumeration is now `I-1`..`I-9`, `M-1`..`M-18`, `F-1`..`F-10`** —
   the new row **`M-18`** (the empty-string/opaque-key rule, finding 2) **appends after `M-17`** and
   **nothing is renumbered**. **The `§4.4` stop conditions' mandated static rows (`S-3`/`S-4`) are
   written with them** — their **content lives in `§2.2`'s prohibitions and `§2.4` items 4/5**, not
   in a `§4.4` row table (`§4.4` owns the stop conditions; see the citation map at `§2.2`/`§2.4`).
   **⟶ EXTENDED 2026-09-27 (the adversarial + PBT-audit pass): the enumeration is now
   `I-1`..`I-9`, `M-1`..`M-21`, `F-1`..`F-11`** — `M-19`/`M-20`/`M-21` append after `M-18` and `F-11`
   appends after `F-10`, **nothing is renumbered**, and those four rows are the **contract rows the
   `ADV-LH-4`/judgment-call fixes are written against** (`§3b`). **They were NOT in the `52`-row red
   set that was RUN** (`§0`'s TestWriter-handoff note): the regression-row pass authors them **RED
   first**, and no already-authored row is edited to reach green (item 4 below).
2. **RUN and REPORT** the failing set verbatim — the file/module resolution failure plus any row
   that can already be evaluated (e.g. a static source row over the module file fails as
   "file does not exist").
3. **Then** implement the least code that makes them green.
4. **Re-run**; record the green. **No row may be edited to reach green**; a row found wrong is
   corrected **in this spec** first, with the old text kept as `SUPERSEDED`.

### 4.3 What the red is NOT

- **Not a shim change.** The rows run against the landed shim as-is.
- **Not a styling or overflow test.** Ruling 4 drops the "one overflow mode" criterion; a row
  asserting a style, a class, or an overflow behaviour is a **scope violation**.
- **Not a tab-strip test under another name.** A row asserting `role`, `aria-selected`, a label, or
  a "selected item" is a **prohibition-1/2 violation**.
- **Not a real-DOM run.** The `[U]` row is optional and precondition-gated (§5.2).
- **Not assembled-app evidence.** Layer declaration anchor 1.

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | A row cannot be falsified on `[T]` | The row moves to §7 as **UNPROVABLE AT THIS LAYER**; it may not be moved to the `[U]` leg silently. |
| **S-2** | A row requires a **new shim member** (`querySelectorAll`, `getComputedStyle`, …) | **Scope violation** (`H-r5`) — re-write the row to use the shim's public `children`/`remove()` surface. |
| **S-3** | A row requires reading the **tree** to establish order | **Violates ruling 3** (order is a projection) — re-write it against `keys()`/`order`. |
| **S-4** | A row needs a **graph seam** to prove "zero graph ops on order change" | There is no seam; the row is **static** (module imports/calls). **Do not add a spy, a hook, or an injection point.** |
| **S-5** | A row is only satisfiable by making `dispose()` destroy caller nodes | **Violates §2.3 item 4** — re-write it. |
| **S-6** | A test asserts a **callback count of exactly one** and the implementation fires twice for a replace-then-render cycle | **The implementation is wrong, not the row** — `M-9`/`M-10`/`M-11` are counted rows. |

**⟶ `§4.4` OWNS THE STOP CONDITIONS, NOT A STATIC-ROW TABLE (ADDED 2026-09-27, the
TestWriter-handoff pass; finding 8 — annotation, nothing moved and no clause weakened).** This
section is, as filed, the stop-condition table **`S-1`..`S-6`**. **The STATIC rows over the module
file are asserted in `§2.2` (prohibitions 1/2/5/6) and `§2.4` (items 4/5)**, and two of these stop
conditions **mandate** them: **`S-3` mandates the no-tree-read static row** — its normative text is
`§2.4` item 4; and **`S-4` mandates the zero-graph-seam static row** — its normative text is `§2.4`
item 5, `§5.1` (the import scope) and `§6` (whose second falsification names exactly this row as its
test). **So a citation of "the static rows `S-3`/`S-4`" is a citation of these two STOP CONDITIONS
and of the assertions they mandate — the same rows `§2.2`/`§2.4` state — and neither `S-3` nor `S-4`
asserts anything of its own.** The three descriptions (stop condition · prohibition · static-row id
in the red set) **denote the same rows: none is invented and none is weakened**, so any of the three
is a valid citation. **No renumbering, and no new stop condition, is created by this note.**

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-D plan**
(§0 ruling 8), (b) the **wave-D order** — `U-MOUNTGUARD` first, (c) this spec to exist (**done: this
filing**), and (d) a **TestWriter to have RUN and REPORTED the red set** (`AGENTS.md` item 9). Its
`## OPEN` row (D2) stays `BLOCKED` until all four hold.

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/owned-list-host.ts` | **NEW** — the seven exports of §2.1 | always |
| 2 | `tests/owned-list-host.test.ts` | **NEW** — the red set (§4.2) **⟶ AMENDED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑10**, MED; the `NEW` cell above is the FILING-TIME form and is kept visible): `NEW` was true at the filing pass only. The file is now **TRACKED and MODIFIED** — `9258caf` (the red set landed), `d59478c` (the remanded red set), `678f502` (`U-LISTHOST` adversarial fixes green) — and it is THE UNIT'S RED SET, carrying the regression rows added today on top of the `52`-row red set (`62` rows in total, `62 passed (62)`). It is the row file `§5.5.1`'s register rides (§5.2).** | always |
| 3 | `docs/specs/listhost.md` | this spec — §3a/§3b findings as they land | always |
| 4 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` | the unit's own tracker rows (the supervisor's DONE row) | the pass that produces them |

**Outside the scope, always:** `src/renderer/**` · `src/main/**` · `src/shared/dom-shim.ts` ·
`src/shared/types.ts` · every **existing** test file · `package.json` / `package-lock.json` ·
`scripts/**` · `node_modules/**` · `../Preempt-Providence/**`. **This unit changes no existing file
except this spec and the trackers.** **⟶ AMENDED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item
10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑10**, MED; the
clause above is the FILING-TIME statement and is kept visible): the DIFF-SCOPE PRINCIPLE is intact and
holds — **the unit's diff scope did not widen.** What changed is the filing-time wording: both of the
unit's own files (`src/shared/owned-list-host.ts` and `tests/owned-list-host.test.ts`) were
**new-at-filing** and are now **modified in place in the tracked tree**, so "changes no existing file"
must be read as **"touches no PREVIOUSLY-EXISTING file other than this spec and the trackers"** — no
other existing file was touched (verified: no `src/**` file imports the module, `dom-shim.ts` is
untouched, `package.json` gains no key, `tests/` still holds the suite's `60` files).** **A
`docs/pending.md` §G row recorded this stale cell as `OWED` to this pass; it is DISCHARGED by this
pass** (the tracker row itself is the supervisor's file to mark).**

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]** envelope/pure layer | the red (§4) **and** the green. **A green here is envelope/pure-layer evidence, NEVER assembled-app evidence** |
| 2 | typecheck | `npm run typecheck` | **[H]** | the generic signatures (`N = unknown`) are part of the contract |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles (`package.json:10`, read); a new `src/shared/` module that fails to bundle is a failure even when the suite is green |

**The property layer rides leg 1 — no fourth leg, and no new file (⟶ ADDED 2026-09-27, the §5.5
re-derivation).** `§5.5.1`'s register rows are executed by **the same node suite** (`npm test`,
leg 1) in **this unit's own** `tests/owned-list-host.test.ts` (§4.1/§5.1): the deterministic
tables and the pinned-seed enumeration are ordinary `[T]` rows. **No new leg, no new script, no
`package.json` change, no new dependency** — and **no register row depends on the optional `[U]`
row below**, so §5.2 leg 3 (build) is not the property layer either. The DONE row reports the
register's per-row attempts/held/broken set and the pinned seed (§5.3 item 9).

**OPTIONAL `[U]` real-DOM identity row — and its named preconditions.** The row: *one mount, a
caller-supplied node placed and then re-ordered, with the node's identity observed in the **real**
DOM across the reorder*. **Preconditions, all named and none assumed:** (a) the `ui` leg exists and
is green for the same built tree, (b) `npm run divergence` is green for that tree, and (c) for any
**attribute-presence**-shaped variant, the `H-r10` extractor, owed to **`U-DIVERGENCE-EXT`** — a
real-DOM reorder row reads element **identity/order**, not attribute presence, so it does **not**
depend on the extractor, but it **does** depend on the leg. **If not taken, no §3 row is weakened.**
**A node-suite green is never a real-DOM green** (`REAL-DOM-UI-GATE-LEG`'s "the shim is DEMOTED to
pre-filter — not retired" clause, `docs/decisions.md:65`, read).

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, in this order:

1. **Unit + wave + status**: `U-LISTHOST` · wave **D** · `DONE` or the honest non-DONE status.
2. **The wave-D order confirmation**: that `U-MOUNTGUARD` landed (its rule-3 outcome named) before
   this unit's red.
3. **The code/test delta**: the module + the test file, named.
4. **The red, per §4.1** — the failing set as RUN and REPORTED, verbatim.
5. **The three legs' results with layer labels**, plus the explicit sentence that the node-suite
   green is envelope/pure-layer evidence and **not** assembled-app evidence.
6. **The `[U]` row's status**: taken (with its result) or **not taken** (with the reason).
7. **The adversarial pass's findings** (§3a) and the **blind-greens + doc-review records**
   (`AGENTS.md` items 10a/10d, RCA-4/6).
8. **The tracker reconciliation** (`AGENTS.md` items 3/6).
9. **The property register's execution record** (`§5.5.1`, ⟶ ADDED 2026-09-27): per row the
   **id · attempts-run · held · broken** counts, the **pinned seed** (`20260927`), the
   **stop-after-5-consecutive-failures** status (`not triggered` / `triggered at row …`), the
   **total attempts** against the ≤400 cap, and the explicit sentence that **`P-LH-TP-1` is
   `YES (bounded)` and is NOT a proof of the unbounded universal**. **A DONE row that reports the
   register as "executed" without these counts is a review finding** — and a **read-only PBT audit
   may not accept this table alone** as the executed-layer evidence: it reads the counts here and
   in the ledger.

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness) — **2026-09-27: the zero-row exemption is SUPERSEDED; the register is RE-DERIVED below**

> **SUPERSEDED AS-WRITTEN, KEPT VISIBLE (annotate-never-rewrite): the heading above replaced
> `## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**`.**
> **Date: 2026-09-27. Reason: the architect's ruling enforcing the mandatory PBT gate (gate 11) for
> CODE-BEARING units** — this unit is a code-bearing pure `src/shared/` owned-node list host, so its
> `§5.5` must be a real typed register. **The exemption text and its five-cell table are kept verbatim
> below** (§5.5.0), followed by **`§5.5.1`, the re-derived register that SUPERSEDES them.**

> **⟶ SUPERSEDED 2026-09-27 (the architect's gate-11 ruling for code-bearing units; the text is kept
> visible, not rewritten). This `§5.5.0` block is the exemption AS FILED — it is no longer the
> contract's register. What survives of it is its FACTUAL half only: this repo still has no PBT
> harness, and no dependency is added. What is refuted below, with in-repo precedent, is its
> CONCLUSIVE half — *"therefore a register cannot be executed here"*: `docs/specs/engine-pin.md`
> §5.5 executed **7 of 8** of ITS register rows with **plain deterministic vitest tables and no new
> `devDependencies` key** (`package.json:26-31`, re-read this pass: still the five keys
> `@types/node`, `electron`, `esbuild`, `typescript`, `vitest`) — e.g. its `P-IM-2` repeated-call
> idempotence over a fixed key set and its `P-TP-2` enumerated booleans. `§5.5.1` is the
> re-derived register; the replacement of each cell below is itemized there.**

### 5.5.0 THE SUPERSEDED ZERO-ROW EXEMPTION — kept verbatim (the block `§5.5.0` names, cited eleven times in this file)

**⟶ HEADING ADDED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record
`archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑6**, MED).** `§5.5.0` was cited
**eleven** times in this file (the review's own count, taken at that pass — its line numbers are not
restated here, because a line-number census DRIFTS on every pass and this rule applies to this file's
own text too) and once in
`docs/pending.md`, but the section had **no heading of its own** — the superseded exemption lived inside
two blockquotes under `## 5.5`, identified only by prose. **This heading renumbers NOTHING**: `5.5.0`
sorts before `5.5.1`, it is the file's own convention for this block (`### 5.5.1` is the sibling form),
and `## 5.5`'s and `### 5.5.1`'s ids are untouched. It also does **not** collide with the `§5.3 → §5.5`
numbering-gap item (finding **F‑11**, recorded at the end of this file): that gap is the **absent
`§5.4`**, which stays absent — `5.5.0` is a sub-heading of `§5.5`, not a new member of the `5.x`
sequence. **Everything below this line is the exemption AS FILED, kept visible.**

> **`H-r4` obliges an explicit zero-row/typed-PBT decision per unit. Stated exactly as
`docs/specs/engine-drift.md` §5.5 and `docs/specs/engine-pin.md` §5.5 state it: THIS REPO HAS NO PBT
HARNESS.** `package.json`'s `devDependencies` key set is `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **five keys** (`package.json:26-31`, read this pass) — with **no
`fast-check`, no `hypothesis`, and no property runner**. **This spec therefore records a ZERO-ROW
register**, and here is why that is the honest answer rather than a dodge:

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **Two candidates, both genuine quantifications, both sampled deterministically:** (i) *"for **every** permutation of the current key set, `order` is that permutation and every element's identity is preserved"* — §3 samples a handful (`M-7`, `I-7`); (ii) *"for **every** input shape, no method throws"* — §3 samples a deterministic table (`I-8`, `F-1`..`F-10`). **Neither property is proven by its sample**, and this spec says so rather than implying coverage. |
| Could this unit execute them **as properties**? | **No, and not because of effort:** no harness exists, and **adding one is a `devDependencies` change** — outside §5.1's diff scope and a gate of its own. |
| Do the layers permit a property run here? | **Yes for the node layer, in principle** — everything here is pure `[T]` work over an injectable mount. **The blocker is the harness, not the layer**, and that is stated rather than hidden behind a layer claim. |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their drive by the unit's own ids (`M-7` = the reorder drive, `M-8` = the foreign-sibling drive, `I-8` = the no-throw drive). **A strategy id here is a repeat-drive label, not a property id.** |

**⟶ THE FOUR CELLS ABOVE ARE SUPERSEDED AS-WRITTEN AND KEPT VERBATIM (2026-09-27, the gate-11
ruling for code-bearing units): each is answered by `§5.5.1` — cell 1 by `P-LH-IM-1`/`P-LH-IM-2` and
`P-LH-TP-1`; cell 2 by the executed register (no harness added, the strategy discipline instead);
cell 3 holds and is used; cell 4 is replaced by `S-LH-*` property-execution ids.** *(The rows are
plain paragraphs rather than quoted lines here on purpose — quoting them would turn this table into
a blockquote and garble its rendering; nothing is hidden by that, and the cells are byte-identical
to the filing.)*

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** **⟶ SUPERSEDED 2026-09-27: the register count of THIS unit is `7` rows, all executed — see `§5.5.1`.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled.**
2. **The two quantified claims are recorded as `NOT EXECUTED — no PBT harness`**, with their
   compensating rows named: `M-7`/`I-7`/`I-6` (identity-under-permutation) and `I-8` + `F-1`..`F-10`
   (totality/no-throw).
3. **No `fast-check` and no generator is added by this unit.**
4. **Register change summary: none** — nothing to reconcile with `docs/specs/engine-pin.md` §5.5's
   register (its 8 rows: 4 `P-IM` + 3 `P-SM` + 2 `P-TP`; 7 executed deterministically, `P-TP-1`
   `NOT EXECUTED`). **⟶ SUPERSEDED 2026-09-27: the change summary is `§5.5.1`'s, and it now
   reconciles against that same register by reusing its type algebra (`P-IM`/`P-SM`/`P-TP`) and its
   strategy-id discipline — without copying a single row or creating a second authority over it.**

### 5.5.1 THE REGISTER (2026-09-27, re-derived under the gate-11 ruling) — **7 rows, ALL executed**

**⟶ RE-GRAINED BESIDE 2026-10-03 (the H2a gate-4 landing pass; `RCA-8(d)` — the seven rows and
the `168`-attempt arithmetic (`168 = 33 + 34 + 8 + 5 + 8 + 8 + 72`) STAND untouched and are this
module's own landed register).** The module's STORE-BACKED register rows land in the H2a unit's
OWN register — `docs/specs/store-modules-bytes.md` §5.5.1, rows `P-SMB-LH-IM-1` (import census,
`6` attempts) · `P-SMB-LH-IM-2` (no-module-level-binding, `4`) · `P-SMB-LH-TP-1`
(store-state-independence differential, `31`) — the plan's `§5.2.7` round-3 item (4) set, executed
in the unit's OWN red set `tests/store-modules-bytes.test.ts`
(`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`, cited by row name). A
reader of THIS register reads the store-driving rows at that contract; this register is not their
home. **⟶ EXECUTED-TERMS BESIDE 2026-10-03 (the H2a gate-8 documentation review; DRIFT SMB-G-50's face here CLOSED —
the as-filed `6`/`4`/`31` terms above are KEPT VISIBLE): the EXECUTED terms of the three H2a rows are `P-SMB-LH-IM-1`
`8` · `P-SMB-LH-IM-2` `5` · `P-SMB-LH-TP-1` `31` (the gate-4 F-5a/F-5b term extensions `4 → 5` and `6 → 8`); the unit
register's executed total is `85 = 8 + 5 + 31 + 8 + 5 + 28`, printed with its terms at
`docs/specs/store-modules-bytes.md` §5.5.3.**

**What this section is, in one sentence.** The exemption `§5.5.0` above is replaced by a **typed
register of 7 rows** whose two previously-sampled quantifications (`§5.5.0`'s cell 1: the
permutation/identity property and the no-throw property) are **executed here as quantifications over
finite, pinned enumerations** — **hand-rolled and deterministic, with no new dependency, no
`fast-check`, no `hypothesis` and no property runner** (the `devDependencies` key set is unchanged:
`package.json:26-31`, re-read this pass). Type algebra is `docs/specs/engine-pin.md` §5.5's:
**`P-IM`** = invariant · **`P-SM`** = state-machine · **`P-TP`** = totality. **The rows are this
unit's own ids (`P-LH-*`), so they collide with nothing: `P-IM`/`P-SM`/`P-TP` prefix an id and `LH`
is this unit** — no id collides with `M-*`/`I-*`/`F-*` of §3, and **no `F-` register row is invented**
(the `F-1`..`F-10` refusals stay §3.2 table rows, cited here as **compensating sample rows**).

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/owned-list-host.test.ts`,
   §4.1/§5.1) — the file the red set already owes. **No row of this register is executed by a
   generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain
   TypeScript inside the test file.** The only generator is `S-LH-SEED-1`'s, and it is pinned to
   literals **in the test file itself** (a hand-rolled 32-bit LCG — the *literal* form is a
   contract so the run is reproducible, **and the constants are the test's own choice, not a
   dependency**): `state₀ = 20260927`, `stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`,
   `next(k) = Math.floor(stateₙ₊₁ / 2³² · k)`; the pool is indexed `state mod pool.length`. **No
   `Math.random`, no wall-clock seed, no shrinking, no adaptive input search.**
3. **Caps, uniform for the whole register:** **≤100 attempts per row, ≤400 attempts in total**,
   rows evaluated sequentially in register order, **STOP AFTER 5 CONSECUTIVE FAILURES** (the
   remaining attempts of the running row are abandoned and no further row starts). The DONE
   ledger records **attempts-run**, **held**, **broken**, **stopped-early** and the **seed**
   (§5.3's DONE-row shape is extended by item 9 below).
4. **Sample rows are the §3 rows this register compensates, never replaced by it.** A register
   row **proves its quantification by enumeration**; the §3 rows remain the per-state contract
   rows a TestWriter derives first.
5. **No row may be reported as executed if it was sampled** — `§5.5.0`'s honesty anchor (`§5.5.0`
   item 1) is **kept and honoured**: every row here is `YES` by **enumeration over a FINITE,
   pinned input set**, and each row's cell states that input set exactly. **No row is marked
   `NOT EXECUTED`** — and no row *could* honestly be, now that `engine-pin.md` §5.5's precedent is
   on the record for every shape this unit needs.
6. **THE GENERATOR'S ACTUAL STEP FORM, AND TWO REGISTER-CELL RECONCILIATIONS — ⟶ ADDED 2026-09-27
   (the adversarial + PBT-audit pass; findings `ADV-LH-6`, `ADV-LH-7`, `ADV-LH-8`).** The
   pinned-seed generator `S-LH-SEED-1` is **deterministic and pinned to `20260927`**, and its
   **step form is now stated exactly** as the executed code performs it: `next(k) = floor(state · k
   / 2³²)` with `k = 1` on **every** call (so `next(1) === 0` **by construction**), the pool index
   is taken from the **raw state** (`state mod pool.length`), and **each attempt consumes TWO LCG
   steps** (one draw per attempt component). **The pool is 22 shapes, and its stated boundary is
   named**: a **`Symbol`-keyed shape is NOT in the pool** (deliberately — the pool is a subset of
   the key shapes this contract pins, and `Symbol` keys are not `ListKey`), so the pool's silence
   about `Symbol` is a **stated boundary rather than an unrecorded omission**. `P-LH-IM-1` and
   `P-LH-TP-1` carry their markings below; **`ADV-LH-8` is `NOT-A-FINDING`** — the two extra
   EXECUTED shapes are an asserted extension beyond the `§3` rows, and the drift is the doc matter
   `ADV-LH-7` covers. **⟶ ANNOTATED 2026-09-27 (the `ADV-LH-7` POOL-RECONCILIATION correction pass;
   the item above is kept visible): the `22`-shape count, the two-step generator form and the
   `Symbol` boundary STAND, and the "two extra EXECUTED shapes" of `ADV-LH-8` stand as an asserted
   extension — but **the two members the register block names as "omitted" (`true`, "a caller node as
   an entry") are NOT in the executed pool**; the executed shapes the cell's list actually omits are
   the **`{key:null}` non-string-key shape** and its **`[{key:null, node}]` array form**. **⟶ CORRECTED AGAIN 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; the clause above is the SECOND wrong form and is kept visible): the clause above is **FALSE** — **`{key:null}` IS IN the executed pool** (`TP_POOL` member **10**, `tests/owned-list-host.test.ts:649-655`, executed as member **10 of `22`**; the test file's comment lists it as executed at `:3595` and names the genuinely-omitted members at `:3599`), so its array form is executed too. The two executed members the cell's `20`-item enum **genuinely does NOT name** are **"a frozen array"** and **"a duplicate-key pair"**. The `22`-shape count, the two-step generator form, the `Symbol` boundary and the `22 → 24` prohibition below all STAND unchanged.** Naming the
   two mis-named members would move the pool `22 → 24` and shift every drawn index, which the
   `ADV-LH-7` ruling forbids, so they are NOT named into the pool.**

| ID | Type | Property | Executed? | Compensating sample rows (§3) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-LH-IM-1`** *(the permutation quantification `§5.5.0` left unproven)* | `P-IM` invariant | **⟶ `ADV-LH-6` — THE SAME HONEST BOUNDED MARKING `P-LH-TP-1` CARRIES IS ADDED HERE 2026-09-27 (the adversarial + PBT-audit pass; `ACCEPTED-AS-PINNED`, doc reconciliation — the property STATEMENT is NOT changed): this cell says "EVERY permutation" while its strategy enumerates `n = 3` (`6`) and `n = 4` (`24`) ONLY — `33` attempts in all. The property TEXT is therefore LARGER THAN ITS ENUMERATION, so the executed? cell reads `YES (bounded)` on the same discipline `P-LH-TP-1` uses, and no clause of the statement is weakened (the exhaustive-over-what-is-enumerated claim stands).** | **For EVERY permutation of the current key set**, a `setOrder(p)` call leaves `order === p` exactly, `refused` empty, and **every element's identity preserved** (each placed node is the same object per key, `toBe`) — and the permutation never removes anything (`removed` `[]`). | **YES (bounded — the `ADV-LH-6` marking: the property text is larger than its enumeration, so this row reads the same bounded form `P-LH-TP-1` carries; nothing else is claimed)** | `M-7`, `I-6`, `I-7` | `S-LH-PERM-1` | **Exhaustive over `S₃` and `S₄`**, hand-authored permutation tables (literal key arrays — **no generator, no library**): `n=3` keys `['a','b','c']` ⇒ **all 6** permutations; `n=4` keys `['a','b','c','d']` ⇒ **all 24** permutations; **30 attempts, one `setOrder` each**, after one `setEntries`/`render()` — **plus the third fixed table below, so THIS ROW'S TOTAL is `33` attempts** (the `30` exhaustive permutations `+` the `3` partial drives; the register arithmetic counts `33`, corrected 2026-09-27) **⟶ `ADV-LH-7` (the same pass): the `33` figure, the two table shapes and the attempt discipline are UNCHANGED by the cell's own reconciliations — the `ADV-LH-6` bounded marking is a DOC act and it must not alter this row's statement or its attempt discipline**; per permutation assert `order` equals the permutation element-wise, `refused.length === 0`, each `placed[i]` `toBe` the object supplied for that key, `removed.length === 0`, and the host-owned subsequence of `mount.children` matches. A third fixed table adds the **partial `setOrder`** shape (`['c','a']`, `['c','a','nope']`, `['a','a','c']`) for `F-8`'s ignored-key/duplicate rule. |
| **`P-LH-IM-2`** | `P-IM` invariant | **For EVERY owned key and every enumeration above**, `placed[i]` is **reference-identical** to the exact object the caller supplied (or the factory returned) — the host never re-parents, clones or re-creates a caller node. | **YES** | `M-2`, `M-3`, `M-5`, `M-6`, `M-13`, `I-6`, `§2.3` item 5 | `S-LH-IDENT-1` | The **same permutation input family as `P-LH-IM-1`'s first two tables** (reuse is deliberate: one input family, two properties — the `30` shared permutation attempts + `4` fixed identity shapes), for **`34` attempts in this row** — the `30` permutations are DRIVEN AGAIN here (they are this row's own attempts, so the register total counts them twice: `§5.5.1`'s arithmetic states that; the `3` partial `F-8` drives of `P-LH-IM-1`'s third table are **not** re-driven here). The identity half is the `4` shapes — caller nodes; factory nodes; a changed node for a repeated key (`M-13`); a factory node supplied for one key while another key is node-less — each asserting `placed[i] === supplied[i]` (`toBe`) **and** that `keys()`/`order` still name every owned key exactly once. |
| **`P-LH-IM-3`** | `P-IM` invariant | A **second** call with unchanged inputs performs **no child mutation** — `removed` is empty, no node is re-appended, the mount's `children` array is **reference-identical in element order** — for every entry-set shape of the fixed table. | **YES** | `M-1`, `M-12`, `M-17`, `I-2`, `I-9` | `S-LH-REPEAT-1` | Fixed **4-shape** table (3 entries with caller nodes · 3 entries through a factory · 1 entry · an empty set) × **2 sequential calls** each (fixed order) = **8 attempts**: `render()` twice per shape; assert the second `removed.length === 0`, `order`/`placed` equal the first call's **values**, each `children[i]` is the **same object** (`toBe`), and every returned array is a **fresh array** (`I-9`). |
| **`P-LH-IM-4`** *(the `V-7` hard row, quantified over operation sequences)* | `P-IM` invariant | **⟶ `ADV-LH-5`, HIGH — THE STATEMENT BELOW STAYS EXACTLY AS IT IS; THE STRATEGY MUST BE STRENGTHENED (2026-09-27, the adversarial + PBT-audit pass). RULING: this row's statement IS the contract (`§2.3` item 3 / `M-8` — a foreign sibling is never removed and never RE-APPENDED) and it is NOT weakened, shortened or re-scoped by this finding. What is wrong is the ENUMERATION'S POWER: as written, the per-step assertions check only the foreign siblings' RELATIVE order among themselves, `removed === false`, `parent === mount`, and non-membership in `removed` — ALL FOUR OF WHICH HOLD for a host that RE-APPENDS every foreign sibling on every `sync()`. The row therefore CANNOT FAIL for the mutation it exists to forbid, while `§6` names this row as the unit's designated falsification. FIX: the STRATEGY is strengthened so the row can fail for that mutation — the TestWriter chooses the exact form (assert the mount's FULL child reference sequence per step, or an append/re-place COUNTER), and the change must NOT alter this row's statement or its attempt discipline (`5` sequences, `5` attempts, ≤100 per-row cap). Owner: the TestWriter. Disposition `FIXED-this-pass`; the `ADV-LH-5` register-cell note in the block after this table carries the same ruling.** | **For EVERY sequence below, every foreign sibling of the mount is the SAME element (`toBe`) before and after, at an unchanged relative index, and was never removed or re-appended by the host.** | **YES** | `M-8`, `M-16`, `F-9`, `I-3`, `§2.3` item 3 | `S-LH-FOREIGN-1` | **5 fixed sequences** over a mount pre-seeded with **3 foreign siblings** (`a`,`b`,`c` appended by the caller before the host exists), each sequence driven in fixed order: **(1)** `setEntries` → `render`; **(2)** sequence 1 then `setOrder` of the reverse key set; **(3)** two `setEntries`→`render` cycles; **(4)** `close(key)`; **(5)** `setEntries(null)`. Per step assert each foreign sibling `toBe` its original object, its index within `mount.children` unchanged relative to the other foreign siblings, `removed` contains no foreign node, and the host's own nodes are placed **inside the same mount**. **⟶ `ADV-LH-5` STRENGTHENING OWED HERE — the statement above is unchanged; these per-step assertions are NOT sufficient as written (all of them hold for a host that re-appends every foreign sibling on every `sync()`), so the `5` sequences must additionally assert the mount's full child reference sequence per step, or an append/re-place counter. The `5`-attempt discipline and the ≤100 per-row cap are unchanged.** |
| **`P-LH-SM-1`** | `P-SM` state-machine | For an entry set that mixes **valid entries with exactly one refused entry**, the valid entries are **placed and owned** and the refused one is **not placed, not owned and absent from `order`** — `ok === false`, **one** refusal carrying the class's own code, and **`order` is exactly the valid keys in their supplied order** (the `§2.1` totality note: refusing one entry must not abort the call). **⟶ CORRECTED 2026-09-27 (the TestWriter-handoff pass; finding 3 — the as-written words are kept visible above and the reason is named): as written, "the refused one is … absent from `order`" and the per-attempt clause "the refused key absent from `keys()`" are TRUE OF THE OTHER THREE CLASSES and FALSE OF `duplicate-key`, because `§3.2 F-2`'s FIRST-WINS rule keeps a duplicated key owned ONCE (the first occurrence placed, the refused *duplicate* occurrence's node never placed). A `P-SM` row's statement must be true OF THE CONTRACT, not of one drive — so the row is restated by class: for `no-node`, `factory-returned-null` and `malformed-entry` the refused key is absent from `order`/`keys()`; for `duplicate-key` the key stays owned EXACTLY ONCE and the refused occurrence contributes NO node and NO second `order` entry (`§3.2 F-2`, `§2.4` item 2, `I-7`).** | **YES** | `F-2`, `F-3`, `F-4`, `F-5`, `I-1`, `I-7`, `§2.1` totality note | `S-LH-MIXED-1` | Fixed table: for **each of the 4 refusal classes** (`no-node`, `factory-returned-null`, `malformed-entry`, `duplicate-key`) a **3-entry set** with exactly one entry of that class and two valid ones, **plus** a **4-entry set** with the class entry rotated through **all 4 positions** = **8 attempts**, fixed order. **⟶ STRATEGY PROSE CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑16**, LOW; the sentence above is the AS-WRITTEN form and is kept visible): the sentence above under-states ONE case and mis-reads its own arithmetic — the enumeration is **TWO cases per class** (a 3-entry set **plus** a 4-entry set) `⇒ 4 × 2 = 8` attempts, which is what the executed file does (eight `id: 'N-entry set · … at position N'` cases, `tests/owned-list-host.test.ts:3255-3371`, driving eight `rec.run(…)` attempts; the file's own `PRE-3` counts `4 * 2 = 8`). "Rotated through all 4 positions" is TRUE of the executed table (the class entry sits at position 0/1/2/3 across the four 4-entry cases) — what was wrong is the prose's "one 3-entry case per class" reading. **The attempt count does not move: `8`, and the `168` total is unaffected.** Per attempt assert `ok === false`, `refused.length === 1` with the expected `code` **and `refused[0].key` STRICTLY EQUAL (`===`-identity by value) to the value supplied for that position, VERBATIM** — a string when the drive supplied a string, `42`/`null`/`{}` when it did not, with no `String(...)` coercion and no normalization (`§2.1 ListHostRefusal.key`'s amended type), `order` equals the expected valid-key permutation, every valid node placed by reference, and **the per-class ownership assertion of the corrected statement above** (`duplicate-key`: `keys()` names the key exactly once and the refused occurrence's node is never placed; the other three: the refused key absent from `keys()`). |
| **`P-LH-SM-2`** | `P-SM` state-machine | **For EVERY step of the fixed sequences, the host's state stays coherent**: `ok === (refused.length === 0)` (I-1), **every refusal `code` is one of the FIVE declared members** (`'unknown-key'`, `'duplicate-key'`, `'no-node'`, `'factory-returned-null'`, `'malformed-entry'` — no sixth), and **after `dispose()` no ownership is resurrected** while every caller node stays reachable. | **YES** | `F-1`..`F-10`, `M-9`, `M-10`, `M-11`, `M-14`, `M-15`, `I-1`, `I-4`, `I-5` | `S-LH-SEQ-1` | **8 fixed sequences, authored as literal step/expected-outcome data** and driven in fixed order: `activate` known → unknown · `close` known → unknown · `remove` known → unknown · `setEntries([])` after a populated set · `setEntries(null)` after a populated set · `dispose()` then `keys()`/`render()`/`setEntries` · `activate` on a **detached** node's key (`F-10`) · a **caller-detached** placed node then `close` (`F-6`). Per step assert `ok === (refused.length === 0)`, the `code` of every refusal ∈ the five-member set, `keys()` consistent with `order`, and — on the `dispose()` sequence — `keys()` `[]` with each caller node still reference-reachable and its `removed` flag unchanged by the host. |
| **`P-LH-TP-1`** *(the no-throw quantification `§5.5.0` left unproven)* | `P-TP` totality | **⟶ `ADV-LH-7` (2026-09-27, the adversarial + PBT-audit pass — `PARKED-with-revisit-condition`, doc drift): this cell's pool LIST and its step form are reconciled in the block after this table; the executed pool holds `22` shapes while the list below names `20` (`true` and "a caller node as an entry" are in the executed pool but not in this list), and the index formula below describes a SINGLE LCG step where the executed generator consumes TWO per attempt with `next(1) === 0` always. The STATEMENT of this row is NOT changed.** **⟶ CORRECTED 2026-09-27 (the `ADV-LH-7` POOL-RECONCILIATION correction pass; the sentence above is kept visible): the COUNT half holds (`20`-named vs `22`-executed) and the step-form half was already reconciled, but the INVENTORY half above is FACTUALLY WRONG — **neither `true` nor "a caller node as an entry" is in the executed pool**. The executed pool's `22` members were checked member-by-member against the test file, and the two executed shapes this cell's list actually OMITS are **the `{key:null}` ENTRY-HOLDER shape** (a `null` key supplied with its own node) and **its `[{key:null, node}]` ARRAY-ARGUMENT form** (the executed pool's `[{key:42}]` member with `null` in the key's place) — (the nearest executed primitives are `42`/`NaN`; the nearest executed object shapes are `[{}]`, `[{key:42}]`, a detached node and a caller array also held by the test). So the count reconciles and the INVENTORY does not — corrected in the `ADV-LH-7` block after this table, with the old wording kept visible.** **⟶ CORRECTED AGAIN 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record: `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; the sentence immediately above is the SECOND wrong form and is kept visible): the sentence above is **FALSE** — **`{key:null}` IS IN the executed pool** (it is `TP_POOL` member **10**, `tests/owned-list-host.test.ts:649-655`, executed as member **10 of 22**), so its `[{key:null, node}]` array form is executed too. The two executed members the `20`-item enum below **genuinely does not name** are **"a frozen array"** and **"a duplicate-key pair"**. **The `22`-shape count, the `64` draws and the `72`-attempt row total are UNCHANGED.** | **For EVERY input shape drawn from the finite pool, no method of the host throws, and every method returns its declared shape** — a `ListHostResult` for the **six** result-returning methods (`setEntries`, `remove`, `setOrder`, `render`, `activate`, `close`), **`readonly ListKey[]` for `keys()`** and **`void` for `dispose()`** (`§2.1`'s surface census: **8** declared methods, **6** returning a `ListHostResult`) with `ok === (refused.length === 0)` and `order` always a permutation of a subset of the keys the host has been given. **⟶ CORRECTED 2026-09-27 (the TestWriter-handoff pass; finding 4 — the as-written words are kept visible and the reason is named): this cell read "a `ListHostResult` for the SEVEN result-returning methods", which mis-counts the surface `§2.1` declares: EIGHT methods, of which SIX return a `ListHostResult` — `keys()` returns `readonly ListKey[]` and `dispose()` returns `void`. The count is corrected to the declared surface and the covered methods are NAMED, so the totality row's scope is checkable.** | **YES (bounded — pinned-seed enumeration, ≤100 attempts; a table can only enumerate a FINITE pool)** | `I-8` (the no-throw row) + `F-1`..`F-10` + `M-15`, `M-16` (the absent/**malformed**-mount shapes) | `S-LH-SEED-1` | **Pinned-seed enumeration, seed `20260927`** (LCG above): **64 attempts**, each drawing `(method, input)` pairs from an ordered **pool of 22 input shapes** — `null`, `undefined`, `42`, `NaN`, `''`, `'x'`, `[]`, `[{}]`, `[{key:42}]`, a non-string key, an entry with no node and no factory, `itemFactory: () => null`, a **detached** node, a `ShimElement` mount already holding host-placed children, `mount: null`, `mount: {}`, `mount: 42`, `mount: 'div'`, a frozen array, a caller array also held by the test, a duplicate-key pair, and a key of `''` — driving all **8** public methods of `§2.1` with fixed per-method argument forms, plus an explicit fixed **after-`dispose()`** sweep (all 8 methods once). **Attempt arithmetic for this row: `64` drawn attempts `+` `8` sweep methods `=` `72`** (the as-written `64` did not count the sweep; the sweep is executed and is now counted). Per attempt: `expect(() => …).not.toThrow()`, then the shape assertion, then `ok === (refused.length === 0)`. Any thrown error, any non-conforming result, or any `code` outside the five-member vocabulary **breaks its row** and is reported as `broken` (and counts toward the 5-consecutive-failure stop). **This row does NOT prove the unbounded universal** — it enumerates a finite, pinned pool, and the DONE row must report the **attempt count** with the `YES (bounded …)` marking, never as a proof of "all inputs". **⟶ POOL BOUNDARY, STATE IT EXPLICITLY (ADDED 2026-09-27; finding 7): the 22-shape pool does NOT include the `§3a A-12` shapes — non-function `orderOf`/`itemFactory`/`onActivate`/`onClose`, a non-array `order`, `options` as `null`/a string — because `§7` item 8 leaves the unruled seeds UNRULED and `§3a` says no seed is a finding. `A-12` is OWED to the adversarial pass (named at `§3a A-12`, `§7` item 8, `§3.3 I-8`), so this row's finite pool is honest about the shapes it EXCLUDES rather than silently implying them. The pool shape `''` is the empty-string key: per the corrected `§3.2 F-5` it is a valid key, so any refusal code it produces is `no-node` (no factory) or `unknown-key` (an unknown-key call), never `malformed-entry`.** |

**⟶ REGISTER-CELL RECONCILIATIONS — `ADV-LH-5` (register), `ADV-LH-6` AND `ADV-LH-7` (ADDED
2026-09-27, the adversarial + PBT-audit pass).** Three register cells needed a ruling; **none of the
three changes a row's property STATEMENT**, and **no attempt count of the `168` total moves** —
every change below is a doc/strategy reconciliation, and the `168 = 33 + 34 + 8 + 5 + 8 + 8 + 72`
arithmetic stands.

| Finding | What the cell said | The ruling, and what the cell now carries |
| --- | --- | --- |
| **`ADV-LH-5`** (HIGH — the unit's designated falsification is not executed) | `P-LH-IM-4`'s statement claims foreign siblings were *"never removed or **re-appended**"*, while its strategy only checks the foreign siblings' relative order among themselves, `removed === false`, `parent === mount` and non-membership in `removed`. | **THE STATEMENT STAYS — it is the contract** (`§2.3` item 3 / `M-8`), and **it is NOT weakened**. **The STRATEGY MUST BE STRENGTHENED so the row can FAIL for a host that re-appends every foreign sibling on every `sync()`** — the TestWriter chooses the exact form (**the mount's full child reference sequence per step**, or an **append/re-place counter**); the strengthening **must not alter the row's statement or its attempt discipline** (`5` sequences; the per-row cap is `100`). Disposition `FIXED-this-pass`; **owner: the TestWriter (strategy only)**. The in-table notes at `P-LH-IM-4` carry the same ruling, so the reader sees the statement is intact. |
| **`ADV-LH-6`** (LOW) | `P-LH-IM-1` states "EVERY permutation" but executes `n = 3` and `n = 4` only (`33` attempts) and carried no bounded marking. | **`ACCEPTED-AS-PINNED` (doc reconciliation, not a statement change): `P-LH-IM-1` now carries the SAME honest bounded marking `P-LH-TP-1` carries** — the property text is larger than its enumeration, and the executed? cell says so instead of implying coverage. No statement of the row is touched; the `33` figure is unchanged. |
| **`ADV-LH-7`** (LOW — doc drift, `PARKED-with-revisit-condition`) | (i) the cell's `P-LH-TP-1` pool LIST names **20** shapes while the executed pool holds **22** — `true` and "a caller node as an entry" are in the executed pool but not in the cell's list; (ii) the cell describes a **single-step** index formula where the executed generator consumes **two LCG steps** per attempt and always draws `next(1) === 0`. **⟶ CORRECTED 2026-09-27 (the `ADV-LH-7` POOL-RECONCILIATION correction pass; the clause above is kept visible): the two member NAMES above are FACTUALLY WRONG — the TestWriter checked the executed `TP_POOL` member by member and found that NEITHER `true` NOR "an object argument that is a CALLER NODE used as an entry" is IN it. The INVENTORY half is corrected below: the `22`-shape COUNT is right and reconciles, but the named reconciliation does not, and the executed pool is what stands.** | **RECONCILE TO THE EXECUTED POOL AND STATE THE ACTUAL STEP FORM** (done at strategy-discipline item 6 above): **the pool is `22` shapes** and the two missing members are now named — so the cell's list reconciles to the executed pool exactly; the generator is **deterministic, pinned to `20260927`**, consumes **two steps per attempt**, draws `next(1)` (always `0`) and takes the pool index from the **raw state** (`state mod pool.length`); and a **`Symbol`-keyed shape is absent from the pool** — recorded as the pool's **stated boundary**, not left silent. **The pool's `22`-shape count, the `64` draws and the `72`-attempt row total are unchanged.** **⟶ CORRECTED 2026-09-27 (the `ADV-LH-7` POOL-RECONCILIATION correction pass; the ruling above is kept visible): the STEP-FORM half is CONFIRMED (two LCG steps per attempt, `next(1) === 0` by construction, pool index from the raw state) and the `Symbol` boundary is CONFIRMED; the INVENTORY half is CORRECTED — the two members that were "now named" are not in the executed pool at all, so the cell's list does **NOT** "reconcile to the executed pool exactly". What reconciles is the NUMBER (`22`) and the step form; the two genuinely-missing executed shapes are named in the spelled-out block below, and the `22`-shape count, the `64` draws and the `72`-attempt row total remain UNCHANGED (`22` is asserted green by the row's own `PRE-3`, and the inventory is a doc matter, so no attempt discipline moves).** |

**⟶ THE `ADV-LH-7` POOL RECONCILIATION, SPELLED OUT (so the TestWriter may re-pin the cell's list
against the executed pool without guessing).** **⟶ CORRECTED A THIRD TIME 2026-09-27 (the
DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record
`archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; THE AUTHORITATIVE FORM IS
THE PARAGRAPH AFTER THIS INTRODUCTORY NOTE): the INVENTORY this block states — in BOTH the as-filed
quotation AND the `ADV-LH-7` POOL-RECONCILIATION correction that follows it in the register-cell block
after the table — is **FALSE**. **`{key:null}` IS IN the executed pool** (`TP_POOL` member **10**,
`tests/owned-list-host.test.ts:649-655`, executed as member **10 of `22`**; the test file's own comment
lists it as executed at `:3595` and names the genuinely-omitted members at `:3599`). **The two executed
members the cell's `20`-item enum genuinely does NOT name are "a frozen array" and "a duplicate-key
pair".** The `22`-shape count, the `64` draws, the `72`-attempt row total and the `Symbol` boundary are
UNCHANGED.** **⟶ CORRECTED 2026-09-27 (the `ADV-LH-7`
POOL-RECONCILIATION correction pass; the block below is the as-filed wording and is KEPT VISIBLE
because the mis-naming it contains is the record).** As filed it read: *"The executed pool holds
**`22` shapes**: the `P-LH-TP-1` cell's own enum-listed members (the `20` it names — `null` ·
`undefined` · `42` · `NaN` · `''` · `'x'` · `[]` · `[{}]` · `[{key:42}]` · a non-string key · an entry
with no node and no factory · `itemFactory: () => null` · a **detached** node · a `ShimElement` mount
already holding host-placed children · `mount: null` · `mount: {}` · `mount: 42` · `mount: 'div'` · a
frozen array · a caller array also held by the test) **plus the two members the list OMITS**:
**`true`** (a non-array, non-null primitive argument shape) and **an object argument that is a CALLER
NODE used as an entry** — with the cell's closing members (a duplicate-key pair and a key of `''`)
counted as the `21`st and `22`nd shapes when the whole pool is written out. **So the cell's list
reconciles to the executed pool exactly once `true` and "a caller node as an entry" are named** — and
the `22`-shape count, the `64` draws and the `72`-attempt row total are unchanged."*

**THE CORRECTION — the count reconciles, the INVENTORY does not.** **⟶ THIS BLOCK IS ITSELF WRONG IN
ITS INVENTORY HALF AND IS CORRECTED BELOW — 2026-09-27, the DOCUMENTATION REVIEW (`AGENTS.md` item 10d
/ RCA‑6; record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH); the block
is kept visible because it is the record of the second mis-naming.** The executed pool **IS `22`
shapes** (asserted green by the row's own `PRE-3`), so the **COUNT** is right; but the two members the
block above calls "omitted" **are not in the executed pool at all**, so the block's reconciliation
claim ("reconciles to the executed pool exactly once `true` and 'a caller node as an entry' are
named") is **FALSE** and **neither member may be added to the pool list**: adding them would move the
pool from `22` to `24`, shift every drawn pool index, and breach this row's own ruling that **the
`22`-shape count, the `64` draws and the `72`-attempt row total are UNCHANGED** (the TestWriter
checked the executed `TP_POOL` member by member and reported exactly this). **The nearest executed
primitives are `42` and `NaN`; the nearest executed object shapes are `'[{}]'`, `'[{key:42}]'`,
`'a detached node'` and `'a caller array also held by the test'`** — and no executed pool member is
`true`, and none is a caller node supplied as an entry.

**The two executed shapes the cell's list actually OMITS, named from the pool itself (the executed
member ids, read from the test file):** **a `{key:null}` ENTRY-HOLDER shape** — the entry whose `key`
is `null` (`{key: null, node: <a div named for it>}`), supplied with its own node — and **its
`[{key:null, node}]` ARRAY-ARGUMENT form** (the pool's `[{key:42}]` member with `null` in the key's
place). Those two are the executed members that the cell's
`20`-member enum does not name, which is what makes the cell's list `20` and the pool `22`; the cell's
closing members (**a duplicate-key pair** and **a key of `''`**) are the `21`st and `22`nd shapes of
the pool as executed. **So the reconciliation is: `20` named + `2` genuinely-omitted executed members =
`22` executed — with the omitted members being the `{key:null}` entry-holder shape and its
`[{key:null, node}]` array-argument form, NOT `true` and NOT a caller-node-as-entry.**

**⟶ THE THIRD AND FINAL INVENTORY, 2026-09-27 (the DOCUMENTATION REVIEW — `AGENTS.md` item 10d /
RCA‑6; record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; the
paragraph immediately above is the SECOND wrong form and is kept visible).** The sentence above is
**FALSE**: **`{key:null}` IS in the executed pool**, so it is **not** one of the omitted members. Read
from the test file: `TP_POOL` member **10** is
`{ id: 'a non-string key ({key:null})', entryArg: () => [{ key: null, node: nodeEl('div','key-null') }] }`
— `tests/owned-list-host.test.ts:649-655` — executed as member **10 of `22`**, and the test file's own
comment lists it as executed (`:3595`) and **names both** of the genuinely-omitted members (`:3599`).
**So: the `{key:null}` entry-holder shape and its `[{key:null, node}]` array-argument form are EXECUTED
members (the cell's `20`-item enum already covers that ground through its own "a non-string key"
member, which IS this shape), and the two executed members the cell's `20`-item enum genuinely does NOT
name are "a frozen array" and "a duplicate-key pair".** The count (`20` named vs `22` executed) still
reconciles exactly. **The nearest executed primitives are `42` and `NaN`; the nearest executed object
shapes are `'[{}]'`, `'[{key:42}]'`, `'a detached node'` and `'a caller array also held by the test'`**
— and no executed pool member is `true`, and none is a caller node supplied as an entry. **The pool's `22`-shape
count, the `64` draws, the `72`-attempt row total and the step form are unchanged by this
correction** (it is a DOC correction to a member list, not an attempt-discipline change), and **the
TestWriter's step-form alignment stands as recorded in the test file** (two LCG steps per attempt,
`next(1) === 0` by construction, pool index from the raw state). **The executed pool stays what it
is; `ADV-LH-7` remains `PARKED-with-revisit-condition` (doc drift), with the revisit
condition unchanged.**

**`ADV-LH-8` is `NOT-A-FINDING`:** the two extra executed shapes (beyond the `§3` rows) are an
**asserted extension beyond the `§3` rows**, and the doc drift they exposed is exactly what
`ADV-LH-7` reconciles — so the extension needs no ruling of its own and the pool's `22` count is not
an error. **⟶ ANNOTATED 2026-09-27 (the `ADV-LH-7` POOL-RECONCILIATION correction pass): this
`NOT-A-FINDING` reading STANDS unchanged; what changes is only WHICH two members the extension
consists of — the `{key:null}` non-string-key shape and its `[{key:null, node}]` array form, not the
two mis-named members. The pool's `22` count is still not an error.** **⟶ CORRECTED AGAIN 2026-09-27
(the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record
`archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; the sentence above is the
SECOND wrong form and is kept visible): the sentence above is **FALSE** — **`{key:null}` IS executed**
(the `TP_POOL` member 10), so the extension is **not** it. The two executed members the `20`-item enum
genuinely does not name are **"a frozen array"** and **"a duplicate-key pair"**. The pool's `22` count
is still not an error.**

**The pool's boundary, named:** a **`Symbol`-keyed shape is NOT in the pool** — a `Symbol` is not a
`ListKey`, so the pool is silent about it **by design**, and that silence is now recorded rather than
mistakable for an omission.

**Register count: `7` rows — `4` `P-IM` (`P-LH-IM-1`..`P-LH-IM-4`), `2` `P-SM` (`P-LH-SM-1`,
`P-LH-SM-2`), `1` `P-TP` (`P-LH-TP-1`). `7` executed deterministically by enumeration; `0` marked
`NOT EXECUTED`.** **⟶ TWO ROWS NOW CARRY HONEST BOUNDED MARKINGS — `ADV-LH-6` (2026-09-27):**
`P-LH-IM-1` and `P-LH-TP-1` each say `YES (bounded)` because each row's **property text is larger
than its enumeration**; **neither statement changed**, and the two cells' reconciliations
(`ADV-LH-5`'s strategy strengthening, `ADV-LH-6`'s marking, `ADV-LH-7`'s pool/step-form
reconciliation) are itemized in the register-cell block immediately above. **The executed-layer
numbers this unit landed are `168/168` attempts held** (the pass's own report, `§3b`) — the register
text here is the CONTRACT and the ledger's numbers are what get read against the test file's tables
(`§5.3` item 9). **⟶ ATTEMPT ARITHMETIC — CORRECTED IN PLACE 2026-09-27 (the TestWriter-handoff pass; the as-written
line is kept visible below). AS FILED:** *"Attempt arithmetic (stated so it can be checked):** 30 (`P-LH-IM-1`) + 34 (`P-LH-IM-2` = 30 shared permutation attempts + 4 identity-shape attempts) + 8 (`P-LH-IM-3`) + 5 (`P-LH-IM-4`) + 8 (`P-LH-SM-1`) + 8 (`P-LH-SM-2`) + 64 (`P-LH-TP-1`) = **157 attempts**, inside the ≤400 total cap and every row inside the ≤100 per-row cap."* **THE RULING — `157` IS WRONG AND `168` IS THE TRUE TOTAL, COUNTED FROM THIS REGISTER'S OWN TABLES:** the `157` form **omitted `P-LH-IM-1`'s third fixed table** (the `3` partial `setOrder` drives — `['c','a']`, `['c','a','nope']`, `['a','a','c']` — that the `F-8` ignored-key/duplicate clause requires, `+3`) and **omitted `P-LH-TP-1`'s explicit fixed after-`dispose()` sweep** (all `8` methods once, `+8`). **THE CORRECTED ARITHMETIC, one term per register row: `33` (`P-LH-IM-1` = `6` `S₃` permutations + `24` `S₄` permutations + `3` partial-`setOrder` drives) + `34` (`P-LH-IM-2` = `30` shared permutation attempts + `4` identity-shape attempts) + `8` (`P-LH-IM-3`) + `5` (`P-LH-IM-4`) + `8` (`P-LH-SM-1`) + `8` (`P-LH-SM-2`) + `72` (`P-LH-TP-1` = `64` drawn `(method, input)` attempts + `8` after-`dispose()` sweep methods) = `168` attempts** — **inside the `≤400` total cap, and every row inside the `≤100` per-row cap (the max is `72`, `P-LH-TP-1`).** **HOW THEY ARE COUNTED, stated so the numbers are checkable rather than asserted: one "attempt" = one exercised DRIVE of one register row** — one `setOrder` call for the permutation row, one `(method, input)` draw for the pinned-seed row, one method of the fixed after-`dispose()` sweep for the sweep — **and each term above is counted from the row's own deterministically-fixed table as the row's cell writes it** (`S₃`/`S₄` exhaustive sizes, the `3`-shape partial table, the `4`-shape identity table, the `4`-shape × `2`-call repeat table, the `5` sequences, the `4`-class × `2`-position mixed table, the `8` literal sequences, the `22`-shape pool with `64` draws, the `8`-method sweep). **One term is SHARED and is stated as shared rather than double-counted away:** `P-LH-IM-2` drives the **same** `30` permutation inputs as `P-LH-IM-1` (one input family, two properties) and the total above counts that row's own `34` drives — i.e. the `30` permutation drives ARE executed twice, once per row, and the arithmetic counts executions, not distinct inputs.
 **Sample rows are named per row, so no quantification
here is left to "and the §3 rows cover it"** — each row's cell names the §3 rows it compensates.
**`P-LH-TP-1` carries the bounded marking deliberately**: it is the one row whose property text
(the `for EVERY input shape` half) is **larger than its enumeration**, and `§5.5.0`'s no-sampling
anchor is why that is stated rather than hidden.

**Register change summary (what this pass did to `§5.5`).** `§5.5.0`'s **zero-row exemption is
SUPERSEDED** by this register (date + reason in the two banners above). Its **cell 1** — *"two
candidates, both genuine quantifications, both sampled… neither property is proven"* — is
**resolved by rows**: the permutation/identity quantification becomes **`P-LH-IM-1`** (+
`P-LH-IM-2`) and the no-throw quantification becomes **`P-LH-TP-1`** (+ the `P-LH-SM-*` sequences).
Its **cell 2** — *"no harness exists, and adding one is a `devDependencies` change"* — is
**refuted as a conclusion**: no harness IS added, and the register is nonetheless executed by the
deterministic strategy discipline `docs/specs/engine-pin.md` §5.5 established. Its **cell 3**
(*"yes for the node layer, in principle"*) **holds and is now used**. Its **cell 4** (*"a strategy
id here is a repeat-drive label, not a property id"*) is **superseded**: strategy-ids here are
`S-LH-*` **property-execution ids**, one per row. Its **items 1–4** are superseded by items 1–5 of
the strategy discipline above — except **item 1 (the no-sampling anchor), which is KEPT and is why
every row above is executed by enumeration rather than sampled.** **The register is this unit's own
and is NOT a copy of `docs/specs/engine-pin.md` §5.5's** — no engine-pin row is restated, extended
or contradicted, so no second authority over that register is created (the discipline
`docs/specs/projection.md` §8 states as *"a second authority over a landed register is a finding"*).

**Register integration with the legs and the DONE row (so the property layer is not an orphan).**
The register rows are carried by **the same node suite** `npm test` already runs (§5.2 leg 1) in
**this unit's own** `tests/owned-list-host.test.ts` — **no new leg, no new file, no new script, no
`package.json` change** (§5.1's diff scope is unchanged). **No `[U]`-leg row is added**, and the
optional real-DOM identity row of §5.2 stays an optional precondition-gated row that **no register
row depends on**. **§5.3's DONE row gains one item (item 9):** the register's execution record —
per row: **id · attempts-run · held · broken**, plus the **pinned seed**, the **stop-after-5**
status (`not triggered` or `triggered at row …`), and the explicit sentence that **`P-LH-TP-1` is
`YES (bounded)` and is not a proof of the unbounded universal**. **⟶ THE REPORTED ATTEMPT NUMBERS
ARE `§5.5.1`'s CORRECTED FORM (2026-09-27, the TestWriter-handoff pass): the DONE row's total is
expected to be `168` per row-counts `33/34/8/5/8/8/72`, and a DONE row reporting `157` or a
per-row figure the test file's own tables do not produce is a review finding** — the ledger's
numbers are read against the test file's tables, exactly as this clause already requires. **A read-only PBT audit may not
report a row as executed on the strength of this table alone** — the audit reads the test file's
attempt counts and the ledger's numbers against this cell.

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If the host cannot be written such that a
foreign sibling survives re-renders **by reference** while the host still owns and removes exactly
its own nodes, then "own-node ownership" is not a coherent contract and the unit fails.* The
falsification test is `M-8` plus `I-3`: **if any implementation reaches `M-8` by re-creating,
re-parenting or re-appending a foreign sibling, the row fails** — the rule is identity, not
presence.

**A second, independent falsification.** *If order cannot be projected without a graph pass or a
tree read, then ruling 3 is not implementable and the unit fails.* The test is the static row
(§4.4 `S-3`/`S-4`): the module imports nothing from `src/renderer/**` and reads no tree for order.
**⟶ CITATION RECONCILED 2026-09-27 (the TestWriter-handoff pass; finding 8): "§4.4 `S-3`/`S-4`"
names the two STOP CONDITIONS that mandate these static rows, and the rows' normative content is
`§2.4` items 4/5 (with `§2.2` prohibitions 1/2/5/6) — the citation map is stated at `§4.4` and
`§2.4`. Nothing here is weakened by the reconciliation; the same two rows are meant.**

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause
is found (§6's two falsifications) and **the spec is amended** with the clause marked `SUPERSEDED`
and the reason recorded, **before** any implementation continues; (c) the unit is **declined back
to the fork** — admissible only if the amendment's own adoption is shown to rest on a false premise,
which would be a **new gate**, not this unit's call (`H-r1`'s cite-and-supersede rule).

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **BLOCKED on the architect's go-ahead for wave D, on the wave-D order (`U-MOUNTGUARD` first), and
   on its red set** (§0 ruling 8, §4.5). **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the
   `U-MOUNTGUARD` DONE pass; the sentence above is kept visible): the wave-D go-ahead WAS GIVEN
   (architect, 2026-09-27), `U-MOUNTGUARD` is `DONE`, and this unit is now blocked only on its own red
   set — the wave-D order still binds.**
2. **"Owned-node list host" is the amendment's own rename, and the rename is normative.** A later
   pass that implements a tab strip (labels, `role`, selected state, overflow) under this spec's
   symbol has **violated the contract**, not fulfilled it. **`SCH-11`'s own pre-amendment decline
   reason was "`createTabStripHost` leaks consumer vocabulary"** — the reshape exists because of it.
3. **`V-7` is resolved here by ownership, and the same hard row binds `U-SLOTHOST`.** `SCH-9` #2's
   "publish replaces the element" is **declined**; the surviving rule is *"a re-render removes
   exactly the nodes the host placed and nothing else"*. **A later pass that re-merges the two units
   must not weaken this row** (`H-r15`).
4. **No magnitude-equivalence claim exists here.** Order is a projection: **the host may not claim
   the graph's child order changed**, and **no equivalence between "one visible item" and any graph
   op** may be asserted (the amendment's per-unit equivalence limits, read). The mechanism owns **no
   graph and no store**.
5. **A node-suite green is envelope/pure-layer evidence, never assembled-app evidence**, and for
   this unit also **never a real-DOM or layout green**. The `[U]` row is optional and
   precondition-gated (§5.2).
6. **No page-design layer exists to update.** `docs/skills/designing-pages.md` does not exist
   (globbed this pass), so there is no test-use-case coverage matrix and no demo-page index.
7. **Contract decisions this spec had to make where the sources are silent, recorded so they are
   reviewable rather than implicit:** (i) the **result-object + per-call refusal list** shape (the
   sources say "the host projects an order" and "unknown key ⇒ a typed refusal", but name no return
   shape for the LIST host — note that the **typed refusal** phrasing is `SCH-9`'s; this unit's
   refusals are the same discipline applied to its own five codes); (ii) **first-wins** on a
   duplicate key within one call (`F-2`); (iii) **`ok` is `refused.length === 0`**; (iv) **stability**
   of `orderOf` ties (`M-4`); (v) the **absent-mount no-op is NOT a refusal** (`F-7`) — deliberately
   asymmetric with `U-MOUNTGUARD`'s `mount-not-appendable`; (vi) `remove` does **not** fire
   `onClose` while `close` does (`M-11`); (vii) `dispose()` **relinquishes without destroying**
   (§2.3 item 4). **Each of these is a decision, not a derivation — the sources are silent on all
   seven.**
8. **This spec deliberately leaves TWO seeds UNRULED** rather than inventing a rule: **`A-5`**
   (`orderOf` that throws) and **`A-9`** (one node object for two keys). **The adversarial pass must
   rule them and record the ruling here.** Naming an unresolved input as unresolved is the contract;
   silently picking an answer would be the `C-16` class (a contract reverse-engineered from one
   consumer). **⟶ DISCHARGED FOR `A-5` 2026-09-27 (the adversarial + PBT-audit pass; finding
   `ADV-LH-1`, HIGH — `CONTRACT-AMENDED`): `A-5` IS HEREBY RULED BY THE CLAUSE, NOT DEFERRED — an
   `orderOf` that throws is CAUGHT on every path, the SUPPLIED ORDER is used, no method throws, and
   no refusal code is invented for it. The ruling is normative text at `§2.1` (the totality clause
   that governs every path) and it is the EXPECTED BEHAVIOUR its regression row must satisfy. So the
   UNRULED set is no longer `A-5`/`A-9`: it is `A-9` and `A-11`, both now `OWED-with-owner` (the
   next contract pass for this module) — see `§3a`'s per-seed rulings.** **⟶ CORRECTED 2026-09-27 (the
   `ADV-LH-1` DISPOSITION-CORRECTION pass): `A-5` stays RULED BY THE CLAUSE, and that clause is a
   **CLARIFICATION** of the contract the code already satisfied, NOT a behavioural change — the
   comparator's **single** invocation site was ALREADY inside `projectionFor`'s guarded block,
   `setOrder` never invokes the comparator at all, and `setEntries` reaches it only through that one
   guarded call, so **no method of this host ever threw for a throwing-`orderOf` shape**. `ADV-LH-1`
   is therefore `NOT-A-FINDING` (code) with a recorded false-positive note, and **no host fix and no
   red-then-green regression row was owed for it**; the redness the pass recorded against this seam
   came from a **test-authoring defect** (an `expect(h.keys()).toEqual(['a','b'])` assertion placed
   after its own sequence's `close('b')`). **⟶ OWNER/OUTCOME CORRECTED 2026-09-27 (the DOCUMENTATION
   REVIEW — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED; the
   clause "the TestWriter is fixing that placement in parallel, strategy-only, no row deleted" is the
   AS-RECORDED owner/outcome and is kept visible above): the TestWriter **KEPT the row** as a **GREEN
   positive regression row** and **re-pinned its assertion to its proper drive boundary** (the row's
   drive array is built by executing every drive while constructing the array, so an "early" assertion
   read the fully-advanced state). **The rows are kept and green — five rows, `ADV-LH-1` plus the four
   `ADV-LH-3` seams, at `tests/owned-list-host.test.ts:2421-2691` — and the code needed NO behavioural
   change for those two seams.** The observable above stands as what it is: the CLARIFICATION's
   contract — caught on every path, the supplied order used, no refusal code invented.** **⟶ CONFIRMED AND EXTENDED 2026-09-27 (the TestWriter-handoff pass; finding 7): the
   count is THREE seeds, not two — `A-5`, `A-9` and `A-12`.** **`A-12`** (malformed injections:
   `orderOf`/`itemFactory`/`onActivate`/`onClose` as non-functions; `order` as a non-array;
   `options` as `null`/a string) **is a SEED, not a row**: `§3a`'s preamble says *"no row below is a
   finding, and none may be cited as one"*, and this item's own rule leaves unruled seeds unruled — so
   **the malformed-callback and non-array-`order` shapes may NOT be pinned as assertions in this
   unit's red set**, and the `§3.3 I-8` no-throw table is restricted to the shapes this contract
   actually pins (and `§5.5.1 P-LH-TP-1`'s 22-shape pool excludes them — both clauses say so).
   **Disposition of `A-12`, recorded rather than left as a gap: `OWED`, OWNER = the `U-LISTHOST`
   adversarial pass (`AGENTS.md` RCA-3, post-green) — its ruling is recorded back into `§3a`/§7 by
   that pass, and if it exposes a contract gap it lands as `CONTRACT-AMENDED` in `§3b` with the old
   text kept as `SUPERSEDED`.** **An omission that is a named, owned decision is not a gap; the same
   sentence is therefore carried at `§3a A-12`, at `§3.3 I-8` and at `§5.5.1 P-LH-TP-1` so no reader
   can mistake it for an oversight.** **⟶ RULED IN TWO HALVES 2026-09-27 (the adversarial + PBT-audit
   pass; finding `ADV-LH-3`, MED — `CONTRACT-AMENDED`): (i) the NON-function/non-array shapes stay
   exactly as the paragraph above records — guarded, excluded from `I-8` and `P-LH-TP-1`,
   `RESOLVED-BY-PINNING`; (ii) the THROWING-function half is ruled by the `§2.1` totality clause that
   extends to injected functions (each with a named safe default: `orderOf` ⇒ supplied order,
   `itemFactory` ⇒ refusal `factory-returned-null`, `onActivate`/`onClose` ⇒ swallowed with the
   ownership drop standing), `FIXED-this-pass`, owner the Implementer + TestWriter.** **So exactly TWO
   seeds remain open after this pass — `A-9` and `A-11`, both `OWED-with-owner` (the next contract
   pass for this module) — and the count in item 8's own first sentence is annotated rather than
   rewritten.**
9. **`SCH-4`'s `orderOf` is NOT this unit's and is not imported.** Ruling 6 dissolves the edge; the
   callback is **injected here**. A later pass that imports a zone/track module to get an ordering
   policy has **reinstated a dissolved edge** (`H-r6`).
   **⟶ ONE HALF OF `A-12` CORRECTED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass): item 8's
   (ii) `orderOf` half is a CLARIFICATION and not a code fix — `ADV-LH-3`'s `orderOf` seam is
   `NOT-A-FINDING` (the comparator's single invocation site was already guarded inside
   `projectionFor`, and `setOrder` never invokes it at all), so the REAL `ADV-LH-3` seams are
   `itemFactory`, `onActivate` and `onClose`, whose three guards the Implementer has landed and
   which stay `FIXED-this-pass`. `A-12`'s ruling is otherwise unchanged, and the two open seeds
   (`A-9`, `A-11`) are unchanged.**
10. **The dropped "one overflow mode" criterion stays dropped.** A later pass may not add it back
    "because a host needs it": overflow is CSS, **this repo ships no stylesheet**, and the reshape's
    acceptance line records the drop explicitly.
11. **⟶ ITEM 11 ADDED 2026-09-27 (the adversarial + PBT-audit pass): THE PASS'S OWN HONESTY LINE.**
    **This spec pass RAN NO TEST, NO SUITE, NO LEG AND NO TRIO**, and the numbers it carries about
    the unit's green — **`53/53` rows, the property register `168/168` attempts held, the suite's
    `60` files / `971` tests (`969` passed / `0` failed / `2` skipped)** — are **THAT pass's own
    report, recorded as reported and NOT measured by this pass**. The register row **`P-LH-SM-1`**'s
    corrected wording, `P-LH-IM-4`'s strengthened strategy and the `P-LH-TP-1` pool/step-form
    reconciliations are **contract/doc text**; whether the executed tables match them is **the
    ledger's and the audit's to read against the test file** (`§5.3` item 9, `§5.5.1`'s integration
    note). **Two seeds (`A-9`, `A-11`) are left `OWED-with-owner` ON PURPOSE** — an `OWED` seed with
    a named owner is a recorded decision, not a gap, and **silence about a seed is a review
    finding** (all `19` seeds now carry a ruling or an `OWED-with-owner` marker in `§3a`).

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DROPPED** = a criterion the reshape
removed. **DISSOLVED** = a dependency edge the amendment breaks. **NOT THIS UNIT** = closed
elsewhere or another unit's — listed so no later pass routes it here.

| Source row | Section | Status for `U-LISTHOST` | Where |
| --- | --- | --- | --- |
| `SCH-11` `TAB-STRIP-SHELL`, **ADOPTED-RESHAPED** | amendment §2.2 (the `SCH-11` row), §2.1 | **ADOPTED — this unit**, as the renamed **owned-node list host** | §1, §2, §7 item 2 |
| `SCH-11`'s acceptance: **no `querySelectorAll`** | amendment §2.2 | **DISCHARGED** as a static + behavioural row | §2.2 (prohibitions 1/6), §3 `I-4`, `A-13` |
| `SCH-11`'s acceptance: **no tab-strip vocabulary, no `matchMedia`** | amendment §2.2 | **DISCHARGED** as static rows | §2.2 (prohibition 1), `A-14` |
| The **"one overflow mode" criterion** | amendment §2.2 (*"DROPPED"*) | **DROPPED — must not be re-added** | §1, §7 item 10 |
| **Order-as-projection** + **no graph pass on order change** | amendment §2.2 | **DISCHARGED** | §2.4, §3 `M-7`/`F-8`, §6 |
| **Own-node ownership** + **foreign-sibling-survives (the `V-7` hard row)** | amendment §2.2, §"Per-unit equivalence limits" | **DISCHARGED as the hard row** | §2.3, §3 `M-8`/`I-3`/`F-9`, §7 item 3 |
| **`orderOf` injected as this contract's own parameter** (the dissolved `SCH-4 → SCH-11` edge) | `H-r6`; `C-15` | **DISSOLVED — `orderOf` is injected here**, not imported | §2.1, §7 item 9 |
| The **`SCH-9 → SCH-11`** edge (`"`SCH-9` declined"`, pre-amendment) | `H-r6` | **DISSOLVED**, then **partially re-created by A-d7 in the OPPOSITE direction**: `U-SLOTHOST` is now adopted (host half only) and its publisher half stays declined | §7 item 3 |
| The eight-unit plan's **`U6`** row (its red-set cell) | amendment §"The amended unit plan" | **INHERITED-ONLY provenance** (superseded by the 20-unit plan, `H-r20`) — its red-set cell lists exactly the rows this spec expands (`M-7`/`M-8`/`M-17`/`F`-family) | §3, §4 |
| `H-r8`'s six-prohibition block | `S-d8`, `H-r8` | **DISCHARGED** as a six-row assertion table | §2.2 |
| The amendment's **"no new MCP surface"** obligation row | amendment §"Adopted units' security / equivalence obligations" | **DISCHARGED** as the five-seam negative | §2.2 (prohibition 5), `A-15` |
| `H-r5` / `S-d3` (no shim expansion) | `H-r5`, `S-d3` | **INHERITED-ONLY** — the shim is untouched. **⟶ RECONCILED 2026-09-27 (the `§5.5` re-derivation): the property layer changes none of this** — no shim member is expanded, `tests/owned-list-host.test.ts` carries the register rows (`§5.5.1`) **inside the existing node suite**, and no new leg, file or script is added | §1, §4.4 `S-2`, `§5.5.1` (the legs/integration note) |
| `RK-10` (`C-16`: contracts reverse-engineered from ONE consumer) | amendment §6 | **CARRIED** — §7 items 2/7/8 are this unit's answer: the rename, the seven recorded contract decisions, and the **THREE** deliberately-unruled seeds (`A-5`, `A-9`, `A-12` — `A-12` added by the 2026-09-27 reconciliation) | §7 items 7–8 |
| `H-r10`'s attribute-presence extractor | `H-r10` | **NOT THIS UNIT** (`U-DIVERGENCE-EXT`) — a **named precondition** of the optional attribute-shaped `[U]` variant | §5.2 |
| `REAL-DOM-UI-GATE-LEG` (the shim is demoted to pre-filter) | `docs/decisions.md:65` | **CARRIED** — a node-suite green is never a real-DOM green | Layer declaration, §5.2 |
| `UI-RENDERED-WITH-PROVIDENT` / `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` (a mechanism authors no content) | `docs/decisions.md:53` / `:54`, both read | **CARRIED** — prohibition 2 is this unit's compliance row | §2.2, §7 item 4 |
| Row **D2** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: its spec cell reads `docs/specs/listhost.md` (**OWED — not filed**) — **this filing discharges that cell** (the row itself stays `BLOCKED`, and its leg cell's *"a real-DOM identity row (**optional**) → `ui`"* is §5.2) | this file |
| `docs/specs/listhost.md`'s entry in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** | this file |
| **`H-r4`'s required explicit PBT decision for this unit** | `H-r4` (as `H-r20` re-scoped it to twenty units), `docs/specs/engine-pin.md` §5.5 (the executed-register precedent) | **RECONCILED 2026-09-27 — the as-filed form was **`ZERO-ROW-EXEMPTION (recorded, justified)`**, which is **SUPERSEDED** by the architect's gate-11 ruling for code-bearing units**: the decision is now a **typed register of `7` rows, all executed deterministically**, and the `H-r4` *"this repo has no PBT harness — do not imply one"* clause **survives intact** (no `fast-check`, no property runner, no `devDependencies` change). The register row `P-LH-TP-1` is `YES (bounded)` — the one place where the enumeration is smaller than the property text, marked so rather than implied. | `§5.5` (the two SUPERSEDED banners + `§5.5.1`) |
| The zero-row exemption's **strategy-id discipline** (a strategy id is a repeat-drive label, not a property id) | `§5.5` as filed (cell 4) | **SUPERSEDED 2026-09-27** — strategy-ids are now **property-execution ids** (`S-LH-PERM-1`, `S-LH-IDENT-1`, `S-LH-REPEAT-1`, `S-LH-FOREIGN-1`, `S-LH-MIXED-1`, `S-LH-SEQ-1`, `S-LH-SEED-1`), one per register row | `§5.5.1` |
| **The red set's run and its EIGHT reported unpinnable clauses** | `tests/owned-list-host.test.ts` (**RUN and REPORTED: `52` rows = `49` red / `3` pass**, `37` red on the import boundary), the TestWriter's report | **RECONCILED 2026-09-27 (this pass)** — each clause is ruled in the spec with its deciding clauses cited: `ListEntry.node` (finding 1), `''` vs `F-5`/`A-8` (finding 2, new row `M-18`), `P-LH-SM-1` vs `F-2` (finding 3), `P-LH-TP-1`'s method count (finding 4), `ListHostRefusal.key` (finding 5), `M-14` vs `dispose()` (finding 6), `A-12`'s disposition (finding 7), the static-row citation map (finding 8) | the `§0` reconciliation note's table + `§2.1` (node rule, surface census), `§2.2`, `§2.4`, `§3.1 M-18`, `§3.2 F-5`, `§3.3 I-8`, `§4.4`, `§5.5.1`, `§7` item 8, `§3a A-8`/`A-12` |
| **The register's ATTEMPT TOTAL** (`§5.5.1`) | `§5.5.1`'s tables as filed (`157` = `30+34+8+5+8+8+64`) | **CORRECTED 2026-09-27 (this pass): `168` = `33+34+8+5+8+8+72`** — `+3` for `P-LH-IM-1`'s third fixed `setOrder` table (`F-8`), `+8` for `P-LH-TP-1`'s after-`dispose()` sweep; both forms kept visible, caps re-checked (`168 ≤ 400`, per-row max `72 ≤ 100`) and the counting method stated | `§5.5.1` (the arithmetic block), `§5.3` item 9's expectation |
| **This pass's own scope** | `AGENTS.md` items 9/10 + the TestWriter's report | **SPEC TEXT ONLY** — no `tests/**`, no `src/**`, no `scripts/**`, no `package.json` edit, no `git commit`, **no test run**; the eight rulings and the arithmetic are contract text | this note + the citations above |

| **The `U-LISTHOST` adversarial + PBT-audit pass (READ-ONLY) and its twelve findings** | the pass's own report: `tests/owned-list-host.test.ts` `53/53` rows; `§5.5.1`'s register `168/168` attempts held; suite `60` files / `971` tests (`969` passed / `0` failed / `2` skipped) | **RECORDED 2026-09-27 (this pass)** — twelve findings (`ADV-LH-1`..`ADV-LH-12`) with severity, disposition and owner; all `19` seeds ruled (`A-9`/`A-11` `OWED-with-owner`); the **ten** Implementer judgment calls each ruled; **four fix-side findings** carry the clause their regression row is written against (`ADV-LH-1`/`ADV-LH-3`/`ADV-LH-4` = `CONTRACT-AMENDED` + host fix + RED row; `ADV-LH-5` = TestWriter strategy only, statement unchanged) **⟶ CORRECTED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass; the sentence above is this pass's own report and is kept visible): there are THREE fix-side findings — `ADV-LH-3`'s THREE real seams (`itemFactory`/`onActivate`/`onClose`, `CONTRACT-AMENDED` + host fix + RED rows), `ADV-LH-4`, and `ADV-LH-5`. `ADV-LH-1` and `ADV-LH-3`'s `orderOf` seam are `NOT-A-FINDING` (code; false positive — the comparator's only invocation site was already guarded), so no host fix and no RED row is owed for them.** | the `§0` adversarial status note + `§2.1` (totality clause, injected-function clause, ACCEPTANCE rule, `N-5`, mount-absence/`order`-`placed` paragraph, `setEntries`/`setOrder`/`render`/`onClose` doc strings) + `§3.1 M-19`..`M-21` + `§3.2 F-2` (amended in place)/`F-6`/`F-11` + `§3.3 I-7`/`I-8` + `§4.2` item 1 + `§5.5.1` (register-cell block) + `§7` items 8/11 + `§3a` (per-seed rulings) + `§3b`-1/`§3b`-2 |
| **The four `CONTRACT-AMENDED`/`FIXED-this-pass` dispositions, AS THE CONTRACT THEY GOVERN** | `§3b`-1's findings table, `§3b`-2's judgment-call table | **NORMATIVE FOR THE NEXT PASSES** — the TestWriter authors the RED regression rows from **`§2.1`'s totality clause** (`ADV-LH-1`), **`§2.1`'s injected-function clause with its four named safe defaults** (`ADV-LH-3`), **`§2.1`'s ACCEPTANCE rule + `N-5` + `§3.2 F-11` + `§3.1 M-19`** (`ADV-LH-4`), and the Implementer makes them green; `ADV-LH-5`'s strategy strengthening (`§5.5.1 P-LH-IM-4`) is a **TestWriter** change that **must not alter the row's statement or its attempt discipline** **⟶ CORRECTED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass; the sentence above is kept visible): the dispositions that are NORMATIVE as contract are now **THREE** real seams' worth of work plus `ADV-LH-4` — the TestWriter authors RED rows from **`§2.1`'s injected-function clause for `itemFactory`/`onActivate`/`onClose`** (whose Implementer guards have LANDED) and from **`§2.1`'s ACCEPTANCE rule + `N-5` + `§3.2 F-11` + `§3.1 M-19`** (`ADV-LH-4`). **`§2.1`'s totality clause (`ADV-LH-1`) is a CLARIFICATION, so NO red row is authored from it**, and the `orderOf` seam of `ADV-LH-3` owes none either.** | `§2.1`, `§3.1 M-19`, `§3.2 F-11`, `§5.5.1` |
| **The register-cell reconciliations (`ADV-LH-5`'s strategy half, `ADV-LH-6`, `ADV-LH-7`) and `ADV-LH-8`'s `NOT-A-FINDING`** | `§5.5.1`'s `P-LH-IM-1`/`P-LH-IM-4`/`P-LH-TP-1` cells and its strategy-discipline items 2/6 | **RECONCILED 2026-09-27** — no row's STATEMENT changed, **no attempt count of `168` moved**: `P-LH-IM-1` gains `YES (bounded)`, `P-LH-IM-4`'s strategy is strengthened (statement intact), `P-LH-TP-1`'s pool list reconciles to the executed `22` shapes with the two missing members named, the generator's actual step form is stated, and the `Symbol` boundary is recorded **⟶ CORRECTED 2026-09-27 (the `ADV-LH-7` POOL-RECONCILIATION correction pass; the clause above is kept visible): the **count** `22` reconciles but the **named members did not** — the two members named as "missing" (`true`, "a caller node as an entry") are NOT in the executed pool, and the executed shapes the cell's list actually omits are the `{key:null}` non-string-key shape and its `[{key:null, node}]` array form. No row's STATEMENT changed, no attempt count of `168` moved, and the generator's step form and the `Symbol` boundary stand as stated.** **⟶ CORRECTED AGAIN 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; the clause above is the SECOND wrong form and is kept visible): the clause above is **FALSE** — **`{key:null}` IS executed** (the `TP_POOL` member 10), so its array form is executed too. The two executed members the `20`-item enum genuinely does not name are **"a frozen array"** and **"a duplicate-key pair"**. No row's STATEMENT changed, no attempt count of `168` moved, and the generator's step form and the `Symbol` boundary stand as stated.** | `§5.5.1` (items 2/6, the register-cell block, and the three cells) |
| **This pass's own scope** | `AGENTS.md` items 9/10 + the adversarial pass's report | **SPEC TEXT ONLY** — no `tests/**`, no `src/**`, no `scripts/**`, no `package.json` edit, no `git commit`, **no test run, no leg, no trio**; every number attributed to the pass is recorded AS REPORTED (`§7` item 11) | this note + the `§0` status note + `§7` item 11 |

**Citation hygiene for this file:** every `src/**` and `tests/**` anchor cited above was **read in
this pass** (`src/main/security.ts:134`; `src/shared/types.ts:259-281`;
`src/renderer/renderer.ts:12`; `src/main/mcp-server.ts:281-303`; `src/shared/dom-shim.ts` (143 lines,
`:1-3`/`:89-96`); `package.json:10`/`:19`/`:26-31`; `tests/engine-pin-version.test.ts:174-197`;
`docs/decisions.md:53`/`:54`/`:65`). **`docs/next-steps.md` is cited by row id only** — that file's
own convention forbids line citations. **One anchor the sibling spec found stale is re-stated here
for the same reason:** `docs/decisions.md` is **406 lines** today, its ledger is split into labelled
appended blocks (`:104`, `:124`, `:139`, `:155`, `:172`, `:189`, `:209`) plus `## HISTORICAL`
(`:230`), `## SPECULATIVE / IN GATE` (`:288`) and `## AMENDMENTS TO PRE-EXISTING ACTIVE ROWS`
(`:294`) — so a bare `decisions.md:<n>` from an earlier layer **must be resolved against the live
file before it is quoted**, which is what this spec did.

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates one new spec file and edits no existing document. **Row D2's spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded so the staleness
is attributable rather than silent. **⟶ FLIPPED 2026-09-27 (the handover-staleness pass): `D2`'s spec cell
now reads `FILED 2026-09-27`**, so the sentence above describes the filing pass's own state and nothing current.
**⟶ ARCHIVAL-LOOP CHECK FOR THIS PASS (2026-09-27, the TestWriter-handoff pass): nothing is archived,
moved or repointed.** This pass **edits this one spec file, and only it** — bounded anchored edits
(never a whole-file write, `RCA-8(c)`), no section renumbered, no tracker touched (`AGENTS.md` items
3/6 leave the trackers to their owner, and the supervisor commits at the gate boundary: **this pass
runs no `git commit`**). **The known `§5.3 → §5.5` gap with no `§5.4` is a RECORDED item owned by the
documentation review — this pass does NOT "fix" it by renumbering**, exactly as the filing pass
recorded. **⟶ DISCHARGED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record
`archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑11**): the gap is CONFIRMED and is
recorded as a **DELIBERATE, NON-RENUMBERED OMISSION** — `§5.3` is the DONE-row shape and `§5.5` is the
register, **NO clause is missing**, and **renumbering is FORBIDDEN for citation stability** (`§5.3` /
`§5.5` are cited 15+ times across the trackers and this unit's own text). The owner (`docs/pending.md`'s
§G row) is **DISCHARGED by this pass**.** The file's length moved from `779` lines to this pass's landed length (the census is stated
in the `§0` reconciliation note; a later census claim is the owner's to reconcile).

## 3a. Adversarial findings — **the pass HAS RUN (2026-09-27, read-only adversarial + PBT audit); the as-filed status is kept below and the per-seed rulings are IN each row**

**Status as filed: `OWED`. No adversarial pass has run for `U-LISTHOST`** (this pass is the
spec-filing pass; the unit is BLOCKED on its go-ahead and its red set, so there is no green to
review — RCA-3 runs *after* a unit's green). **The table is the SEED SET for the pass that will
run; no row below is a finding, and none may be cited as one.**

**⟶ STATUS 2026-09-27 — THE `U-LISTHOST` ADVERSARIAL PASS HAS RUN, and this section is no longer
`OWED`: twelve findings (`ADV-LH-1`..`ADV-LH-12`), the per-seed rulings for ALL `19` SEEDS
(`A-1`..`A-19`), and the TEN IMPLEMENTER JUDGMENT CALLS are recorded below and disposed of in `§3b`.**
The pass was **read-only** (an adversarial review + a PBT audit) and it **reported the unit green as
it stands**: `tests/owned-list-host.test.ts` **`53/53` rows**, `§5.5.1`'s property register
**`168/168` attempts held (none broken, stop-after-5 never triggered)**, full suite **`60` files /
`971` tests — `969` passed / `0` failed / `2` skipped**. **Those are the PASS'S OWN REPORTED numbers,
recorded as reported; this spec pass measured nothing** (`§7` item 11). **The pass changed no
`tests/**` and no `src/**` file: it returned findings and rulings, and every fix it mandates is
disposed in `§3b` with an OWNER — the regression rows belong to the TestWriter pass that follows,
the host fixes to the Implementer pass after it.** **`ADV-LH-1`/`ADV-LH-3`/`ADV-LH-4` are
`CONTRACT-AMENDED` and their rulings are normative text at `§2.1` + `§3.1`/`§3.2`; `ADV-LH-5`'s
ruling is a STRATEGY change (the statement stays); **⟶ CORRECTED 2026-09-27 (the `ADV-LH-1`
DISPOSITION-CORRECTION pass; the sentence above is kept visible): `ADV-LH-1` and `ADV-LH-3`'s
`orderOf` seam are `NOT-A-FINDING` (code) — real findings with host fixes are `ADV-LH-3`'s THREE
seams (`itemFactory`/`onActivate`/`onClose`, guards landed), `ADV-LH-4` (guard landed), and
`ADV-LH-2`'s parked state-coherence question**; `ADV-LH-6`/`ADV-LH-7` are register-cell
reconciliations; `ADV-LH-8`/`ADV-LH-11`/`ADV-LH-12` are `NOT-A-FINDING`; `ADV-LH-2` and
`ADV-LH-7` are `PARKED-with-revisit-condition`; `ADV-LH-9`/`ADV-LH-10` are `RESOLVED-BY-PINNING`.
The full table — **finding · severity · disposition · owner · what it changed and where** — is
`§3b`'s.** **"No row below is a finding, and none may be cited as one" NOW READS: the seed TABLE's
rows are still seeds, and every one of them has been RULED by the pass — silence about a seed is a
review finding, so `A-9` and `A-11` carry a named owner instead.**
**⟶ THREE SEEDS ARE MARKED OWED (`A-5`, `A-9`, `A-12`) — 2026-09-27, the TestWriter-handoff pass;
finding 7.** "No seed is a finding" and "no seed may be cited as one" **do not** mean every seed is
ignorable: three carry an explicit **`OWED`** status with a named owner (the `U-LISTHOST`
adversarial pass), and the DONE row must report each one's ruling or its still-owed status. **The
distinction is the whole point of this note: an `OWED` seed is a recorded DECISION to leave a
question open, not a gap and not a finding.**

**⟶ ALL NINETEEN SEEDS ARE RULED AS OF 2026-09-27 (ADDED this pass — the adversarial + PBT-audit
pass).** The markers above are the TestWriter-handoff pass's state and are kept visible; the rulings
they owed have now landed **in each seed's own row** (appended, never rewritten). The count is
exhaustive so that no seed is silent: **`ACCEPTED-AS-PINNED` (with the code's observed behaviour as
the pinned reading) — `A-1`, `A-2`, `A-3`, `A-4`, `A-6`, `A-7`, `A-8`, `A-10` (plus `ADV-LH-9`'s
composition hazard), `A-13`, `A-14`, `A-15`, `A-16`, `A-17` (plus `ADV-LH-10`), `A-19`; `RULED BY
THE CLAUSE` — `A-5` (by `ADV-LH-1`) and `A-12` (in two halves, by `ADV-LH-3`); `NOT-A-FINDING` —
`A-18`; `OWED-with-owner` (owner = the next contract pass for this module) — `A-9` and `A-11`.** **So
the `OWED` set is `2`, not `3`: `A-12` was RULED by this pass, and `A-11` was added to the `OWED` set
by it.**

**⟶ THE PASS'S FINDINGS ARE DISPOSED IN `§3b`, NOT REPEATED ROW-BY-ROW IN THIS TABLE (ADDED
2026-09-27).** The twelve `ADV-LH-*` findings, the ten judgment calls and every seed ruling live in
`§3b`'s three tables; this section keeps the **seed table** as the pass's work list, with each seed's
final ruling appended in its own row. **A reader looking for a finding's disposition, owner and the
clause it changed goes to `§3b`; a reader looking for a seed's fate reads the row below.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | Two foreign siblings appended **before and between** two renders: are they the **same objects** at the end (`toBe`), and were they ever re-appended or re-parented? **⟶ FINAL 2026-09-27 (the adversarial + PBT-audit pass): `ACCEPTED-AS-PINNED` — the code's observed behaviour is the pinned reading (foreign siblings are neither removed nor re-appended; `M-8`/`I-3`), with `ADV-LH-5` governing the ROW's strategy power, not this seed.** | `[T]` |
| **A-2** | A caller **detaches** a host-placed node, then the host is asked to remove it, then asked to re-add the same key — does any path throw, or leave the key dangling in `keys()`? **⟶ FINAL 2026-09-27 (the adversarial + PBT-audit pass): `ACCEPTED-AS-PINNED` — no path throws and no key is left dangling (`F-6`).** | `[T]` |
| **A-3** | `setOrder` with a permutation that **omits** a current key and **adds** an unknown one — is the resulting `order` exactly the current key set? **⟶ FINAL 2026-09-27 (the adversarial + PBT-audit pass): `ACCEPTED-AS-PINNED` — yes: omitted and unknown keys are ignored, and `order` is exactly the current key set (`§2.4` item 2, `F-8`, `I-7`).** | `[T]` |
| **A-4** | `setOrder` given the same array object twice, and given a caller array the caller later mutates — does host state change? (`I-9`) **⟶ FINAL 2026-09-27 (the adversarial + PBT-audit pass): `ACCEPTED-AS-PINNED` — host state does NOT change: results are fresh arrays and the host holds no reference to a caller array that would let a later mutation reach its state (`I-9`).** | `[T]` |
| **A-5** | `orderOf` that **throws** (a malformed injected comparator) — is that the caller's bug surfacing, or does the host swallow it? **This row must be RULED explicitly** (this spec does not decide it: `orderOf` is caller code, and a caller-code throw is not this host's refusal class — the pass must record the ruling rather than leave it unspecified) **⟶ RULED 2026-09-27 (the adversarial + PBT-audit pass; finding `ADV-LH-1`, HIGH — `CONTRACT-AMENDED`, and THIS SEED IS RULED BY THE CLAUSE, NOT DEFERRED): the host SWALLOWS the throw. The totality claim governs on EVERY path — an `orderOf` that throws is caught exactly as it is on `setOrder` (the supplied order is used), it must NEVER escape, and no refusal code is invented for it (it is CALLER code, and the refusal vocabulary is five codes). Normative text: `§2.1`'s totality clause; the observable is an EXPECTED BEHAVIOUR the regression row must satisfy; owner: the Implementer (host fix) + the TestWriter (row); `FIXED-this-pass`.** **⟶ CORRECTED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass): the SEED stays RULED, and the ruling stands as the observable — the host SWALLOWS the throw, the supplied order is used, no method throws, no refusal code is invented. What is CORRECTED is the disposition: `ADV-LH-1` is `NOT-A-FINDING` (code), because the comparator's single invocation site was ALREADY inside `projectionFor`'s `try/catch` and `setOrder` never invokes the comparator at all — so nothing escaped, the `§2.1` totality clause is a CLARIFICATION of the existing contract, and **no host fix and no red-then-green regression row was owed for this seam**. The redness recorded for this row was a TEST-AUTHORING defect (`expect(h.keys()).toEqual(['a','b'])` placed after the sequence's own `close('b')`), which the TestWriter is fixing in parallel, strategy-only.** **⟶ OWNER/OUTCOME CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED; the clause above is the AS-RECORDED owner/outcome and is kept visible): the outcome is NOT a mere placement fix — the TestWriter **KEPT the row** as a **GREEN positive regression row** and **re-pinned its assertion to its proper drive boundary** (the row's drive array is built by executing every drive while constructing the array, so an "early" assertion read the fully-advanced state). **The row is kept and green (part of the five green rows — `ADV-LH-1` + the four `ADV-LH-3` seams — at `tests/owned-list-host.test.ts:2421-2691`), and the code needed NO behavioural change for this seam.** The seed's ruling stands as the observable — the host swallows the throw, uses the supplied order, and invents no refusal code.** | `[T]` |
| **A-6** | `orderOf` returning **mixed types** (`string` vs `number`) — what order results, and is the projection still a permutation of the key set? **⟶ FINAL 2026-09-27 (the adversarial + PBT-audit pass): `ACCEPTED-AS-PINNED` — the pinned reading is the code's observed behaviour: a mixed-type `orderOf` compares NUMERIC-ELSE-STRING (numbers by value; a string compared against a number falls to the string form), TIES ARE BROKEN BY THE SUPPLIED INDEX (so `M-4`'s stability survives), and `order` remains a permutation of the key set, each key once (`I-7`). This is also the Implementer judgment call 4's ruled reading.** | `[T]` |
| **A-7** | Duplicate keys across **separate** `setEntries` calls (not within one) — is the refusal class the same, and is the first-wins rule consistent? **⟶ FINAL 2026-09-27 (the adversarial + PBT-audit pass): `ACCEPTED-AS-PINNED` — a duplicate ACROSS separate calls is NOT a `duplicate-key` refusal at all (the key is simply replaced, `M-13`); first-wins is a WITHIN-one-call rule (`F-2`) and, after `ADV-LH-4`, it applies only between ACCEPTED occurrences.** | `[T]` |
| **A-8** | A key of `''` (empty string), a key with whitespace, a unicode key, and a very long key — opaque, so all must work **identically**; a row asserts no normalization anywhere. **⟶ CONFIRMED 2026-09-27 (the TestWriter-handoff pass; finding 2): this premise is CORRECT and it is the premise `§3.2 F-5` was corrected TO — `''` is valid, nothing normalizes it, and the positive drive is `§3.1 M-18`. A later pass may not flip `F-5` back.** | `[T]` |
| **A-9** | The **same node object** supplied for **two different keys** — what happens (double placement? one placement?), and is it a refusal? **This row must be RULED explicitly** (this spec does not decide it; the pass must, and record the ruling here) **⟶ STILL OPEN, OWNED 2026-09-27 (the adversarial + PBT-audit pass): `OWED-with-owner`. The pass RECORDS the implementation's observed behaviour for the next contract pass rather than ruling it here: the same node object is placed TWICE (once per key), the host OWNS TWO KEYS POINTING AT ONE NODE, and `close(a)` DETACHES the object the other key still owns — i.e. a single object can be removed while a live key still claims it. That is a STATED LIMITATION to be recorded as contract text, not silently pinned: OWNER = the next contract pass for this module. `M-18` rules NOTHING about this shape (each of its keys has its OWN node).** | `[T]` |
| **A-10** | A mount that **already contains** host-placed-looking children from a **prior host instance** (two hosts, one mount) — is ownership isolated per host instance? **Must be ruled** **⟶ RULED 2026-09-27 (the adversarial + PBT-audit pass; finding `ADV-LH-9`, INFO — `RESOLVED-BY-PINNING`): ownership IS isolated per host instance — host B neither owns nor removes host A's nodes and treats them as foreign siblings (`I-3`/`M-8`). THE COMPOSITION HAZARD IS RECORDED: `dispose()` leaves host A's nodes as ORPHANS IN THE MOUNT (no detach, `M-14`), so a SECOND host on the same mount APPENDS AFTER them and the mount's child sequence carries the disposed host's dead entries. That is a CONSUMER composition hazard, not a host defect — a consumer wanting a clean mount clears it itself (the host authors no cleanup).** | `[T]` |
| **A-11** | `itemFactory` returning a node **already placed** for another key, or returning the host's own mount **⟶ STILL OPEN, OWNED 2026-09-27 (the adversarial + PBT-audit pass): `OWED-with-owner` — UNRULED AND UNPINNED, deliberately. The pass records the question rather than answering it: a factory that returns a node ALREADY PLACED for another key, or the MOUNT itself, has no ruled outcome (and the mount-as-node shape would make the host append the mount into itself). OWNER = the next contract pass for this module.** | `[T]` |
| **A-12** | Malformed injections: `orderOf`/`itemFactory`/`onActivate`/`onClose` supplied as non-functions; `order` as a non-array; `options` as `null`/a string. **⟶ STATUS 2026-09-27 (the TestWriter-handoff pass; finding 7): `OWED` — OWNER = the `U-LISTHOST` adversarial pass (post-green, `AGENTS.md` RCA-3). This is a SEED and not a row; NO assertion over these shapes was pinned in this unit's red set, and `§3.3 I-8` + `§5.5.1 P-LH-TP-1` both say so explicitly. The ruling is recorded back here by that pass.** **⟶ RULED IN TWO HALVES 2026-09-27 (the adversarial + PBT-audit pass; finding `ADV-LH-3`, MED — `CONTRACT-AMENDED`): (i) the NON-function/non-array shapes (`orderOf`/`itemFactory`/`onActivate`/`onClose` as non-functions, `order` as a non-array, `options` as `null`/a string) stay GUARDED and EXCLUDED from `§3.3 I-8` and `§5.5.1 P-LH-TP-1` — `RESOLVED-BY-PINNING`, exactly as the TestWriter-handoff note above records; (ii) the THROWING-function half is ruled: a caller-supplied `onActivate`/`onClose`/`itemFactory` that THROWS must NOT escape a method, must not leave ownership dropped with no result returned, and is caught with the NAMED SAFE DEFAULT per injection (`orderOf` ⇒ supplied order; `itemFactory` ⇒ refusal `factory-returned-null`; `onActivate` ⇒ swallowed, key stays owned; `onClose` ⇒ swallowed with the ownership drop STANDING). Normative text: `§2.1`'s totality clause; `FIXED-this-pass`, owner the Implementer (host fix) + the TestWriter (row).** **⟶ CORRECTED IN ONE HALF 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass): the `orderOf` seam of this ruling is `NOT-A-FINDING` (code) — the comparator's single invocation site was already guarded inside `projectionFor` and `setOrder` never invokes it, so **nothing escaped on that seam** and the `orderOf` safe default is a CLARIFICATION of existing behaviour. The `itemFactory`, `onActivate` and `onClose` seams of (ii) **remain REAL findings**, `CONTRACT-AMENDED` + `FIXED-this-pass`, with the Implementer's three landed guards (factory throw ⇒ ONE `factory-returned-null` refusal and the key NOT owned; `onActivate` throw ⇒ swallowed with the key staying owned; `onClose` throw ⇒ swallowed with the drop STANDING and the declared result still returned).** | `[T]` |
| **A-13** | Static/unauthorized-access sweep: does the module contain `querySelectorAll`/`querySelector`/`closest`/`getElementById`/`matchMedia`/`activeElement`/`getComputedStyle`/`document`/`window`, any `src/renderer/**` import, any `electron`/`node:fs`, any store, any module-level mutable state? **⟶ SWEPT CLEAN 2026-09-27 (the adversarial + PBT-audit pass; `ADV-LH-11`, INFO — `NOT-A-FINDING`): the module contains NONE of `document`/`window`/`matchMedia`, no renderer/main import, no persistence, no module-level state; the seven `§2.1` exports are exactly seven; the six static rows are SOURCE-BASED and not self-referential.** **⟶ RE-READ 2026-10-03 (the H2a gate-4 landing pass; the sweep records get the BESIDE reading): the sweep's "any store" and "any module-level mutable state" limbs are RE-READ for the store-backed module — the sweep now scans for a MODULE-LEVEL/IMPORTED store binding (the landing module still carries ZERO import statements and NO module-scope binding; the store arrives ONLY as a declared call parameter — `P-SMB-LH-IM-1`/`P-SMB-LH-IM-2` of the H2a contract); no renderer/main import, no persistence and no module-level state SURVIVE; the seven `§2.1` exports stay exactly seven.** | static |
| **A-14** | Vocabulary sweep: does the module contain `tab`/`strip`/`pane`/`zone`/`region`/`overflow`/`active`/`selected` in any spelling, or any closed string-union of consumer values? **⟶ SWEPT CLEAN 2026-09-27 (the adversarial + PBT-audit pass; `ADV-LH-11`, INFO — `NOT-A-FINDING`): NO occurrence of `tab`/`strip`/`pane`/`zone`/`region`/`overflow` vocabulary and no closed string-union of consumer values (the only string-union is the five-code refusal union).** | static |
| **A-15** | The five-seam sweep: any new tool/resource/group/`VALID_GROUPS` member/`RpcMethod` member/`MUTATING_METHODS` entry/IPC method? Does `tests/engine-pin-version.test.ts`'s 21-member census still pass **unchanged**? **⟶ SWEPT CLEAN 2026-09-27 (the adversarial + PBT-audit pass; `ADV-LH-11`, INFO — `NOT-A-FINDING`): NO new MCP surface, and the pinned census counts are UNCHANGED — `RpcMethod` **21**, `ALL_TOOLS` **21**, `MUTATING_METHODS` **7**, `VALID_GROUPS` **5**.** | `[H]` + static |
| **A-16** | **`dispose()`-then-use:** every method called after `dispose()` — does each return a valid result, and is no ownership resurrected? **⟶ FINAL 2026-09-27 (the adversarial + PBT-audit pass): `ACCEPTED-AS-PINNED` — after `dispose()` every method returns a valid result and NO ownership is resurrected: `keys()` stays `[]` (no re-creation from `render()`/`setEntries` unless the caller supplies entries again), and every caller node stays reachable with nothing detached (`M-14`, `I-5`, `§2.3` item 4).** **⟶ 2026-10-03 (the H2a gate-4 landing pass; the release obligation BESIDE the landed ruling): under the store-backed contract, dispose()-then-use ALSO proves the RELEASE — every method after `dispose()` still returns a valid result and no ownership is resurrected (the landed ruling SURVIVES), no subscription is re-registered, and a post-dispose store write to the host's reference delivers NOTHING (H2a §2.2 P2); dispose() releases HANDLES, never the host's RECORDS (H2a §2.2 P6).** | `[T]` |
| **A-17** | **Callback re-entrancy:** `onActivate` calling `close(key)` (or `setEntries`) inside the callback — is the host's state coherent, and is the callback count still exactly one? **⟶ RULED 2026-09-27 (the adversarial + PBT-audit pass; finding `ADV-LH-10`, INFO — `RESOLVED-BY-PINNING`): ownership is dropped BEFORE `onClose` fires, so a re-entrant callback CANNOT resurrect state or double-fire (`M-10`, `M-9`). ONE BENIGN CONSEQUENCE IS NOW STATED: a re-entrant `setEntries` inside a callback DOES change what the OUTER call's `order`/`placed` report (those arrays are computed from the bookkeeping at return), so the outer result describes the state AFTER the re-entrant call settled — benign, and consistent with `I-1`/`I-7`.** | `[T]` |
| **A-18** | **Cross-unit boundary:** does this unit duplicate any `U-SLOTHOST` responsibility (per-key containers, attribute/class application), any `U-PROJ` responsibility (variable values), or any `U-MOUNTGUARD` responsibility (counting engine-emitted roots)? **Duplication is a FINDING** — the three units share one layer idiom and must not share one contract. **⟶ NOT-A-FINDING 2026-09-27 (the adversarial + PBT-audit pass; `ADV-LH-12` is the sibling ruling and `A-18` is `NOT-A-FINDING`): no `U-SLOTHOST`/`U-PROJ`/`U-MOUNTGUARD` responsibility is duplicated — `I-3`'s foreign-subsequence scoping is INTENTIONAL and is covered instead by `M-14` and `§5.5.1 P-LH-SM-2`'s sequence 6.** | static + `[T]` |
| **A-19** | **The `V-7` re-entry probe:** does any behaviour of this host let a "replace" remove a foreign sibling — i.e. is the foreign-sibling rule truly ownership-scoped and not position-scoped? **⟶ FINAL 2026-09-27 (the adversarial + PBT-audit pass): `ACCEPTED-AS-PINNED` — the rule IS ownership-scoped, not position-scoped: no behaviour of this host removes a foreign sibling on any "replace" (`M-8`, `I-3`, `§2.3` item 3), and `ADV-LH-5` strengthens the ROW's power to prove it without changing the rule.** | `[T]` |

**⟶ THE OWED MARKERS IN THIS SEED TABLE (ADDED 2026-09-27, the TestWriter-handoff pass; finding 7).**
**No seed in this table is a finding** (this section's own rule). **Three seeds carry an explicit
"must be RULED" or `OWED` marker and are therefore OWNED, not forgotten:** `A-5`, `A-9` (both stated
in this table and in `§7` item 8) and **`A-12`** (added to `§7` item 8 by this pass). **A pass that
pins `A-12`'s shapes as assertions before the adversarial pass rules them is answering a question
this contract has not asked** — `§3.3 I-8` and `§5.5.1 P-LH-TP-1` record the restriction, and the
DONE row reports `A-12`'s status (§5.3 item 7's adversarial-findings record).

## 3b. The adversarial pass's disposition table — **LANDED 2026-09-27: the twelve findings, the ten judgment calls and the rulings, with the filing's "shape this contract will be reconciled to" kept below**

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a host finding, **fixed here + regression-tested** as a new §3 row |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** (`A-5`/`A-9`/`A-10` are named candidates; **`A-12` is the fourth candidate — its status is `OWED`, owner = the adversarial pass, and if it exposes a gap it lands here**) — the spec is amended with the old text kept as `SUPERSEDED`, and the row lands in §3 |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; the package is never patched |
| **NOT-A-FINDING** | raised, examined, recorded with the reason |
| **OWED** | raised and **not yet resolved** — the pass may not report done with an `OWED` row |
| **FIXED-this-pass** *(used by the 2026-09-27 adversarial + PBT-audit pass)* | the finding's fix is **mandated and owned by this pass's ruling**; for a host finding the host fix + regression row are owed to the Implementer/TestWriter passes that follow. **Not** a claim that a read-only pass edited code |
| **ACCEPTED-AS-PINNED** *(same pass)* | the behaviour was examined and ruled **CORRECT**, with **the code's observed behaviour as the pinned reading** — the explicit form of `CONFIRMED-RULED` |
| **PARKED-with-revisit-condition** *(same pass)* | a reading **deliberately left unpinned**, with the condition that reopens it **NAMED** in the row |
| **OWED-with-owner** *(same pass)* | `OWED`, with a named owner that is **not** this pass — used for seed `A-9`/`A-11` (the next contract pass for this module) |

**Status of the table itself: `OWED` — empty by construction.** **A DONE row that cites no
adversarial pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3).

**⟶ STATUS OF THE TABLE ITSELF, 2026-09-27 — IT IS NO LONGER EMPTY AND THE PASS IS NO LONGER `OWED`
(the sentence above is the filing state, kept visible).** The `U-LISTHOST` adversarial + PBT-audit
pass **ran** (read-only) and its findings, seed rulings and judgment-call rulings are the three
tables below. **The disposition vocabulary above is EXTENDED by three statuses this pass used**, on
the record so a reader is not left with an undefined word: **`FIXED-this-pass`** (the pass's own
disposition token: the finding's fix is mandated and OWNED — for a HOST finding the host fix and its
regression row are owed to the Implementer/TestWriter passes that follow, so the token names
*what was decided and who owes it*, not work this read-only pass performed), **`PARKED-with-revisit-
condition`** (a reading deliberately left unpinned, with the condition that reopens it NAMED), and
**`ACCEPTED-AS-PINNED`** (a behaviour examined and ruled CORRECT with **the code's observed behaviour
as the pinned reading** — the `CONFIRMED-RULED` half made explicit), plus the **`OWED-with-owner`**
variant (`OWED`, with a named owner that is **not** this pass).

#### `§3b`-1 — the twelve `ADV-LH-*` findings, their severity, disposition, owner, and the clause each one changed

**⟶ TWO ROWS OF THIS TABLE ARE CORRECTED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass) and
ONE 2026-09-27 (the `ADV-LH-7` POOL-RECONCILIATION correction pass); in every case the as-recorded
text is KEPT VISIBLE and the correction is appended inside the row.** `ADV-LH-1` → **`NOT-A-FINDING`
(code), false positive**; `ADV-LH-3` → **split**: its `orderOf` seam `NOT-A-FINDING` (code) while
`itemFactory`/`onActivate`/`onClose` stay `CONTRACT-AMENDED` + `FIXED-this-pass` (guards landed);
`ADV-LH-7` → **`PARKED-with-revisit-condition` unchanged, with the INVENTORY half corrected** (its
`22`-shape count is right; the two members it named as "omitted" are not in the executed pool). **No
other row's disposition moved, no severity changed, and the `§3a` seed rulings and `§3b`-2 judgment
calls are corrected only where they cite these two rows.**

| ID | Sev. | The finding, in one line | Disposition | Owner | What it changed, and where |
| --- | --- | --- | --- | --- | --- |
| **`ADV-LH-1`** | **HIGH** | An injected `orderOf` that **throws** escapes `setEntries` (`projectionFor`'s `try/catch` covers the `setOrder` path, `src/shared/owned-list-host.ts:337`, but `setEntries` calls it outside any `try`, `:300`), contradicting `§2.1`'s totality claim and `§3.3 I-8`. | **`CONTRACT-AMENDED` + `FIXED-this-pass`** ⟶ **CORRECTED 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass): `NOT-A-FINDING` (code), with a recorded FALSE-POSITIVE note.** The claim above is **WRONG on the code**: the cited "outside any `try`" call site (`:300`) is the ***projection*** call, **not the comparator's invocation**. Verified: the comparator (`orderOf`) has **exactly ONE invocation site** — inside `projectionFor`'s own `try { … } catch { return keys.slice() }` (guarded block `:192-198`, catch `:214-222`); `setEntries` reaches it through its **single** `projectionFor` call (`:315`); `setOrder` (`:350-363`) **never invokes the comparator at all**. So **a throwing `orderOf` never escaped any method**, the totality claim was **already met on every path**, and **the guard pre-existed the fix** (the fix pass added only the explanatory comment at that catch, `:215-220`). The row's RED was a **TEST-AUTHORING defect**: its `expect(h.keys()).toEqual(['a','b'])` was placed **AFTER** its own sequence had run `close('b')`/`remove('a')`, contradicting the same row's later assertions (`['a']`, then `[]`) and `§2.1`'s `close`/`remove`/`keys()` rules — the TestWriter is fixing that placement **in parallel (strategy-only, no row deleted)**. **Disposition: `NOT-A-FINDING` (code).** | **Implementer: NO host code owed for this seam** (the guard pre-existed) + TestWriter (row placement only) **⟶ CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED): NOT "row placement only" — the row was KEPT as a GREEN positive regression row and its assertion re-pinned to the drive boundary (all five `ADV-LH-1`/`ADV-LH-3` rows are green at `tests/owned-list-host.test.ts:2421-2691`), so `ADV-LH-1` HAS a driven row. The as-recorded owner phrase is kept visible.** | **`§2.1`'s totality clause is KEPT as a CLARIFICATION, not a behavioural change** — its rule is unchanged (*a throwing `orderOf` is caught on EVERY path and yields the supplied order, with no refusal*): `§2.1`'s clause + `setEntries`/`setOrder` doc strings (annotated in place), `§2.1`'s injected-function table (`orderOf` row = CLARIFICATION), seed `§3a A-5` (annotated), `§3.3 I-8`'s `ADV-LH-1` item (annotated), `§7` item 8 (annotated), `§4.2` (**no regression row owed**). **NO RED row owed for the escaping claim.** |
| **`ADV-LH-3`** | MED | A caller-supplied `onActivate`/`onClose`/`itemFactory` that **throws** also escapes mid-call (and `onClose` fires **after** ownership is dropped, leaving ownership dropped with no result returned). `A-12`'s wording covered **non-functions**, not **throwing functions**. | **`CONTRACT-AMENDED` + `FIXED-this-pass`** ⟶ **SPLIT 2026-09-27 (the `ADV-LH-1` DISPOSITION-CORRECTION pass): THREE REAL SEAMS `CONTRACT-AMENDED` + `FIXED-this-pass` (`itemFactory`, `onActivate`, `onClose` — the Implementer's three guards have LANDED) + the `orderOf` SEAM `NOT-A-FINDING` (code) with a recorded FALSE-POSITIVE note.** A throwing `orderOf` **cannot escape**: its **only** invocation site is inside `projectionFor`'s guarded `try/catch`, `setEntries` reaches it solely through that call, and `setOrder` never invokes it — so that half of this finding is a **CLARIFICATION** of pre-existing behaviour, not a fix. **The three REAL seams, as the contract their guards implement:** the factory's throw ⇒ **ONE** `factory-returned-null` refusal with the key **NOT owned**; `onActivate`'s throw ⇒ **swallowed** with the key **staying owned**; `onClose`'s throw ⇒ **swallowed** with the **drop STANDING** and the **declared result still returned**. | Implementer (host fix for the **three** real seams — landed) + TestWriter (regression rows for those three; **no red row owed for the `orderOf` seam**) **⟶ CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED): "no red row owed" stands for the HOST, but the `orderOf` seam's row was **KEPT as a GREEN positive regression row and re-pinned** to its proper drive boundary — the five green rows (`ADV-LH-1` + the four `ADV-LH-3` seams) are at `tests/owned-list-host.test.ts:2421-2691`. The as-recorded owner phrase is kept visible.** | `§2.1`'s **totality-extends-to-injected-functions clause** (annotated in place, now scoped to the THREE real seams) + the NAMED safe default per injected function — `orderOf` ⇒ supplied order (**CLARIFICATION**), `itemFactory` ⇒ refusal `factory-returned-null`, `onActivate` ⇒ swallowed/key stays owned, `onClose` ⇒ swallowed/ownership drop stands; `§2.1 onClose`'s doc string; `§3a A-12` (ruled **in two halves**, `orderOf` half corrected), `§3.3 I-8`, `§5.5.1`; `§7` item 8. **RED rows owed for the three real seams only.** |
| **`ADV-LH-4`** | MED | `seen.add(key)` runs **before** the node/factory validity question (`:260`), so `setEntries([{key:'k'}, {key:'k', node:n}])` with no factory yields **TWO** refusals (`no-node` + `duplicate-key`) and `order === []` even though the second entry is independently valid; `§2.1`'s totality note and `N-3` read **per-entry**, and `F-2`'s first-wins never covered a **refused first occurrence**. | **`CONTRACT-AMENDED` + `FIXED-this-pass`** | Implementer (host fix) + TestWriter (regression row) | `§2.1`'s **ACCEPTANCE rule** (new normative text: a key becomes "seen" only when an occurrence is ACCEPTED) + node-rule case **`N-5`**; `§3.2 F-2` **amended in place** (old text visible, scoped to accepted-only) so `F-2`/`N-3`/`F-11` agree; NEW rows **`§3.1 M-19`** and **`§3.2 F-11`**; `§4.2` item 1; `§3.3 I-8`. **RED row owed.** |
| **`ADV-LH-5`** | **HIGH** | The unit's designated falsification is **not executed**: `§5.5.1 P-LH-IM-4`'s statement claims foreign siblings were "never removed or **re-appended**", but its strategy checks only their relative order among themselves, `removed === false`, `parent === mount` and non-membership in `removed` — all of which hold for a host that **re-appends every foreign sibling on every `sync()`**. | **`FIXED-this-pass`** | **TestWriter (strategy ONLY)** | **The row's STATEMENT stays — it is the contract (`§2.3` item 3 / `M-8`) and is NOT weakened**; the **strategy must be strengthened** so the row can fail for that mutation (mount's full child reference sequence per step, or an append/re-place counter — the TestWriter picks the form), and **the change must not alter the row's statement or its attempt discipline**. Recorded at `§5.5.1 P-LH-IM-4` (statement cell + strategy cell) and in `§5.5.1`'s register-cell block. |
| **`ADV-LH-6`** | LOW | `P-LH-IM-1` states "EVERY permutation" but executes `n = 3` and `n = 4` only (`33` attempts), carrying no bounded marking. | **`ACCEPTED-AS-PINNED`** (doc reconciliation) | the documentation pass's own record (no code owner) | `§5.5.1 P-LH-IM-1` now carries the **same honest bounded marking `P-LH-TP-1` carries** (`YES (bounded)`); **the property text is larger than its enumeration** — stated, not implied. **No statement change, no attempt change.** |
| **`ADV-LH-7`** | LOW | Doc drift in the register cell: the cell's `P-LH-TP-1` pool **list** names `20` shapes while the **executed** pool holds `22` (`true` and "a caller node as an entry" are executed but unlisted), and the cell describes a **single-step** index formula where the executed generator consumes **two LCG steps** per attempt and always draws `next(1) === 0`. | **`PARKED-with-revisit-condition`** (doc drift) **⟶ CORRECTED 2026-09-27 (the `ADV-LH-7` POOL-RECONCILIATION correction pass; the finding sentence above is kept visible): the COUNT is right and the member NAME is wrong. The executed `TP_POOL` holds `22` (asserted green by the row's own `PRE-3`), but **`true` and "a caller node as an entry" are NOT in it** — checked member by member by the TestWriter. The executed shapes the cell's list actually omits are **a non-string key (`{key:null}`)** and **its `[{key:null, node}]` array-argument form** (the nearest executed primitives are `42`/`NaN`; the nearest executed object shapes are `'[{}]'`, `'[{key:42}]'`, `'a detached node'`, `'a caller array also held by the test'`).** **⟶ CORRECTED AGAIN 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; the sentence above is the SECOND wrong form and is kept visible): the sentence above is **FALSE** — **`{key:null}` IS IN the executed pool** (`TP_POOL` member **10**, `tests/owned-list-host.test.ts:649-655`, executed as member **10 of `22`**; the test file's own comment lists it as executed at `:3595`), so its `[{key:null, node}]` array form is executed too. The two executed members the cell's `20`-item enum **genuinely does NOT name** are **"a frozen array"** and **"a duplicate-key pair"**. The `22`-shape count, the `64` draws and the `72`-attempt row total are UNCHANGED.** | the documentation pass's own record | The cell's list is **NOT** reconciled by naming the two members it named — **naming them would move the pool `22` → `24` and shift every drawn index, which this row's own ruling forbids.** What reconciles: the **`22`-shape count** and the generator's **actual step form** (deterministic, pinned to `20260927`, two steps per attempt, `next(1) === 0`, pool index from the raw state); **the two genuinely-omitted executed members are now named** (`{key:null}` and `[{key:null, node}]`), and the **`Symbol`-keyed shape remains the pool's stated BOUNDARY**. The executed pool stays as it is; the mismatch is recorded in the test file's own comment for the supervisor. **The `22`-shape count, the `64` draws and the `72`-attempt row total are UNCHANGED.** Revisit condition: if a `Symbol`-keyed shape is later admitted to the pool. |
| **`ADV-LH-8`** | LOW | The two extra executed shapes (beyond the `§3` rows) looked like unexplained drift. | **`NOT-A-FINDING`** | — (recorded) | The two shapes are an **asserted extension beyond the `§3` rows**; the drift is the **doc** matter `ADV-LH-7` reconciles. Recorded at `§5.5.1`'s register-cell block. |
| **`ADV-LH-9`** | INFO | `dispose()` leaves its nodes as **orphans in the mount** (no detach), so a second host on the same mount appends after them. | **`RESOLVED-BY-PINNING`** | recorded at seed `§3a A-10` | The **composition hazard** is recorded at **seed `§3a A-10`** and at `§3.2`'s composition note: two hosts, one mount, one disposed ⇒ the mount carries the disposed host's dead entries; ownership stays isolated per instance and the new host treats them as foreign siblings (`I-3`/`M-8`). **A consumer composition hazard, not a host defect.** |
| **`ADV-LH-10`** | INFO | Callback **re-entrancy**: ownership is dropped **before** `onClose` fires, so a re-entrant callback cannot resurrect state or double-fire — but a re-entrant `setEntries` inside a callback **does** change what the outer call's `order`/`placed` report. | **`ACCEPTED-AS-PINNED`** | recorded at seed `§3a A-17` | The re-entrancy ruling is recorded at **seed `§3a A-17`** and at `§3.2`'s composition note: the outer result describes the **state after** the re-entrant call settled — **benign and now stated**, still consistent with `I-1`/`I-7`. |
| **`ADV-LH-11`** | INFO | The security/seam sweep: exports, vocabulary, globals, imports, persistence, module-level state, the five-seam counts, the static rows' basis. | **`NOT-A-FINDING`** | — (recorded) | **SWEPT CLEAN** and recorded at seeds `§3a A-13`/`A-14`/`A-15`: **exactly 7 exports**; **no** `tab`/`strip`/`pane`/`zone`/`region`/`overflow` vocabulary; **no** `document`/`window`/`matchMedia`; **no** renderer/main import; **no** persistence; **no** module-level state; `RpcMethod` **21**, `ALL_TOOLS` **21**, `MUTATING_METHODS` **7**, `VALID_GROUPS` **5** — all **unchanged**; the six static rows are **source-based, not self-referential**. **⟶ RE-READ 2026-10-03 (the H2a gate-4 landing pass; the sweep record gets the BESIDE reading): the sweep's no-persistence / no-module-level-state / no-import limbs SURVIVE under the store-backed contract — the module still imports NOTHING (the store is a DECLARED CALL PARAMETER, never an import), keeps NO module-level state, and persists nothing itself; the store-backed re-grain's statics are the H2a contract's own (`P-SMB-LH-IM-1`/`-2` of `docs/specs/store-modules-bytes.md` §5.5.1), and `ADV-LH-11`'s recorded `NOT-A-FINDING` disposition stands for the limbs it swept exactly as recorded.** |
| **`ADV-LH-12`** | INFO | `I-3`'s foreign-subsequence scoping looked like a narrowed invariant. | **`NOT-A-FINDING`** | — (recorded) | The scoping is **intentional** and is covered instead by **`M-14`** and **`§5.5.1 P-LH-SM-2`'s sequence 6**. Recorded at seed `§3a A-18`. |
| **`ADV-LH-2`** | LOW | A caller-supplied `mount.appendChild` / node `remove` that **throws** escapes with the host's bookkeeping already rewritten. | **`PARKED-with-revisit-condition`** | the next contract pass for this module (or the pass that injects a non-shim mount) | Contract-consistent about the **tree** (`M-16`) but the **state-coherence** half is **unstated** and is **deliberately not pinned here**. **Revisit condition, NAMED: if the totality claim (`§2.1`, `I-8`) is read as extending to CALLER-SUPPLIED DOM METHODS, or when a NON-SHIM mount is injected.** Recorded here; **no clause amended, no row owed.** |

#### `§3b`-2 — the TEN Implementer judgment calls, each ruled (`§3a` is where they are recorded)

| # | Judgment call (as reported) | Disposition | Ruling / owner | Where it is contract text |
| --- | --- | --- | --- | --- |
| **1** | `setEntries` recomputes the **whole** projection. | **`ACCEPTED-AS-PINNED`** | the code's observed behaviour is the pinned reading — the recompute is the mechanism of order-as-projection. | `§2.4` item 2, `M-17`, `F-8` |
| **2** | The **scope** of the duplicate rule (`seen` before validity). | **RULED BY `ADV-LH-4`** | a key becomes "seen" only when an occurrence is **ACCEPTED**; `FIXED-this-pass`. | `§2.1` ACCEPTANCE rule + `N-5`, `§3.2 F-2` (amended in place) + `F-11`, `§3.1 M-19` |
| **3** | A **throwing `orderOf`**. | **RULED BY `ADV-LH-1` — WHICH IS NOW `NOT-A-FINDING` (code) (corrected 2026-09-27, the `ADV-LH-1` DISPOSITION-CORRECTION pass; the as-recorded `RULED BY`/`FIXED-this-pass` reading is kept visible)** | the ruling **stands as the observable** — caught on every path; the supplied order is used; it never escapes; no refusal code. **What changes is the disposition: nothing was escaping** (the comparator's only invocation site was already guarded, and `setOrder` never invokes it), so the clause is a **CLARIFICATION** and **no host fix or regression row is owed**; the row's redness was a **test-authoring defect** (assertion placed after its own sequence's `close('b')`), fixed by the TestWriter in parallel. **⟶ CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED; the clause above is the AS-RECORDED owner/outcome and is kept visible): NOT "fixed in parallel" — the TestWriter **KEPT the row as a GREEN positive regression row** and **re-pinned its assertion to the row's proper drive boundary** (the drive array is built by executing every drive, so an "early" assertion read the fully-advanced state). **The rows are kept and green (five rows, `ADV-LH-1` + the four `ADV-LH-3` seams, `tests/owned-list-host.test.ts:2421-2691`), and the code needed NO behavioural change for those two seams.** The owner is therefore "row KEPT + re-pinned", not "row placement fixed".** | `§2.1` totality clause (**CLARIFICATION**), `§3a A-5` (annotated), `§3.3 I-8`, `§7` item 8 |
| **4** | The **mixed-type comparator** (`string` vs `number`). | **`ACCEPTED-AS-PINNED`** | **numeric-else-string** compare; **ties by supplied index** (so `M-4`'s stability survives); `order` stays a permutation of the key set. | `§3a A-6`, `M-4`, `I-7` |
| **5** | A **non-array `setEntries`** argument ⇒ empty set, `ok true`, **silently dropping prior ownership**; a non-array `setOrder` ⇒ **no-op**. | **`PARKED-with-revisit-condition`** — **but the ownership-drop consequence IS now contract text** | the reading stays parked (revisit: when a consumer relies on a non-array argument being a refusal, or when a `malformed`-class code is added for it); **the OBSERVABLE is stated**: `setEntries(42)` ⇒ `ok true`, `refused []`, `order []`, and the previously placed nodes are **removed** (they appear in `removed`); `setOrder(42)` ⇒ no-op, projected order unchanged. | `§2.1 setEntries`/`setOrder` doc strings + the mount-absence paragraph, `§3.1 M-20` |
| **6** | A **non-string lookup key** ⇒ `unknown-key` **verbatim**. | **`ACCEPTED-AS-PINNED`** | the refusal carries the supplied value **verbatim**, no coercion (`ListHostRefusal.key: unknown` — the TestWriter-handoff widening holds). | `§2.1 ListHostRefusal.key`, `F-1`, `§5.5.1 P-LH-SM-1` |
| **7** | `onClose` fires **after** ownership is dropped. | **`ACCEPTED-AS-PINNED`** | the pinned reading — and it is what makes `ADV-LH-3`'s catch possible: the drop stands even if the callback throws. | `M-10`, `§2.1 onClose`, `§3a A-17`, `§3.2`'s composition note |
| **8** | A **detached** node still appears in `removed`. | **`ACCEPTED-AS-PINNED`** | pinned as the as-shipped reading; `F-6`'s "or not" is therefore no longer an open implementer choice. | `F-6`, `M-21` |
| **9** | `placed` and `order` are **NOT index-parallel** when the mount is unplaceable. | **`PARKED-with-revisit-condition`** | **recorded in the contract text**: `order` is an ownership/projection statement, `placed` is a placement statement, `order.length === placed.length` is **never asserted**, and parallelism holds only over a **placeable** mount. Revisit: if a consumer contract needs parallel arrays (then a `placed`-pad or a separate field is a gate). | `§2.1`'s mount-absence paragraph, `M-15` (its drive annotated), `I-7` |
| **10** | `render()`'s **write policy** (written only when the host's own bookkeeping differs; a caller-detached node is **not** re-appended). | **`ACCEPTED-AS-PINNED`** | pinned, **and the PERMANENCE is stated**: for that key the caller's detach is permanent — `render()` is not an undo (it never throws, and the key is not left dangling). | `§2.1 render()`'s doc string, `§3.1 M-21`, `F-6` |

**The two judgment calls that NEEDED contract text, named (the rest were already pinned):** **call 5**
(the ownership-drop consequence of a non-array `setEntries` argument — previously **unstated**) and
**call 9** (`order`/`placed` non-parallelism when the mount is unplaceable — previously **unstated**,
and the register's index-parallel assumptions would mislead a consumer). **Both are now written into
`§2.1`'s text and carried by a row (`M-20`, `M-15`'s annotated drive).**

**The pass's EXECUTED-LAYER numbers, recorded as REPORTED (`§7` item 11 — this spec pass measured
nothing):** the adversarial + PBT audit read the unit **green** — `tests/owned-list-host.test.ts`
**`53/53` rows**; `§5.5.1`'s property register **`168/168` attempts held, none broken**, stop-after-5
**never triggered**; the full node suite **`60` files / `971` tests — `969` passed / `0` failed / `2`
skipped**. **Those numbers do NOT re-open `P-LH-TP-1`'s `YES (bounded)` marking** (`§5.5.1`): a
bounded enumeration can hold at every attempt and still not prove the unbounded universal, and the
register's integration note stands unchanged.

**Why these two sections sit at the END of this file (the `docs/specs/engine-drift.md` convention,
stated so the placement is not read as an oversight):** the **seed set** is the artifact the pass
that runs *after* the green works from, and the **disposition table** is what this contract is
reconciled *to* afterwards. Keeping them last means an appended findings block extends the file
without renumbering §6/§7/§8 — **no section number of this spec moves when the pass lands.**
**⟶ THE PASS LANDED 2026-09-27 AND THE PLACEMENT DID ITS JOB: `§3a`'s seed rows and `§3b`'s added
tables (`§3b`-1, `§3b`-2) are APPENDED here, in this section, and NO number of `§3`–`§8` moved. The
two new `§3` rows (`M-19`..`M-21`) and the new refusal row (`F-11`) are appended inside their own
tables for the same reason; the `1062`-line figure earlier notes carry is the pre-pass state, and a
census claim belongs to the pass that lands (this one's is in the report, not in this file).**

**⟶ TWO CORRECTIONS APPENDED 2026-09-27, IN PLACE, WITH NOTHING RENUMBERED AND NOTHING REWRITTEN (the
`ADV-LH-1` DISPOSITION-CORRECTION pass and the `ADV-LH-7` POOL-RECONCILIATION correction pass, one
file).** **(1)** `ADV-LH-1` is corrected to **`NOT-A-FINDING` (code)** with a recorded false-positive
note — the comparator's **single** invocation site was already guarded inside `projectionFor`,
`setEntries` reaches it only through that one call, and `setOrder` never invokes it, so **nothing ever
escaped**; the **`§2.1` totality clause is kept as a CLARIFICATION** (its rule is unchanged), and
`ADV-LH-3`'s **`orderOf` seam is likewise `NOT-A-FINDING`** while its **three real seams**
(`itemFactory`/`onActivate`/`onClose`) stay `CONTRACT-AMENDED` + `FIXED-this-pass` with the
Implementer's landed guards. The redness of those two rows was a **test-authoring defect** (an
`expect(h.keys()).toEqual(['a','b'])` placed after the row's own `close('b')`/`remove('a')`), which the
TestWriter is correcting in parallel, strategy-only, with no row deleted. **⟶ OWNER/OUTCOME CORRECTED
2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record
`archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑14**, MED; the clause above is the
AS-RECORDED owner/outcome and is kept visible): the TestWriter **KEPT the five rows** (`ADV-LH-1` plus
the four `ADV-LH-3` seams) as **GREEN positive regression rows** and **re-pinned their assertions to
their proper drive boundary** — the rows' drive arrays are built by executing every drive while
constructing the array, so an "early" assertion was reading the fully-advanced state. **The rows are
kept and green (`tests/owned-list-host.test.ts:2421-2691`), and the code needed NO behavioural change
for those two seams.** **(2)** `ADV-LH-7`'s pool
reconciliation is corrected so it **no longer names two members that are not in the executed pool**:
the count (`22`) is right — asserted green by the row's own `PRE-3` — but the named members (`true`,
"a caller node as an entry") are **not** in it, and the executed shapes the cell's list actually omits
are **the `{key:null}` entry-holder shape and its `[{key:null, node}]` array-argument form** (the
nearest executed primitives are `42`/`NaN`; the nearest executed object shapes are `[{}]`,
`[{key:42}]`, a detached node and a caller array also held by the test). **⟶ CORRECTED AGAIN 2026-09-27
(the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record
`archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑7**, HIGH; the clause above is the
SECOND wrong form and is kept visible): the clause above is **FALSE** — **`{key:null}` IS IN the
executed pool** (`TP_POOL` member **10**, `tests/owned-list-host.test.ts:649-655`, executed as member
**10 of `22`**; the test file's comment lists it as executed at `:3595` and names the genuinely-omitted
members at `:3599`), so its `[{key:null, node}]` array form is executed too. The two executed members
the cell's `20`-item enum **genuinely does NOT name** are **"a frozen array"** and **"a duplicate-key
pair"**.** **The `22`-shape count, the
`64` draws, the `72`-attempt row total and the `Symbol`-boundary note are UNCHANGED by both
corrections** — no attempt discipline moves, no row statement moves, and **no section number moves**.
**Both corrections were derived by READING the code (`src/shared/owned-list-host.ts`'s call graph) and
the test file (`tests/owned-list-host.test.ts`'s executed pool, read only, NOT edited); this pass ran
NO test, NO leg and NO trio.**

