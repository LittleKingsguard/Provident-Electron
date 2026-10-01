# Spec — `U-SLOTHOST`: the slot **HOST** (`SCH-9`'s host half only — the publisher/carrier half is DECLINED)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-SLOTHOST`**, the **host-half-only** adoption
of `SCH-9` `SHELL-STATUS-CARRIER` under architect ruling **A-d7**). **The unit has NOT run: nothing
here is implemented, no red set has been authored and no leg has been run by this pass.** This pass
files the contract.
**⟶ STATUS NOTE — 2026-09-27, THE `U-MOUNTGUARD` DONE PASS: THE WAVE-D GO-AHEAD WAS GIVEN.** The
architect **GAVE the wave-D go-ahead (2026-09-27)** and **`U-MOUNTGUARD` is `DONE`** (the ledger's
**FOURTH `DONE` row**; the counts are **`4 DONE / 16 open`**). **This is a STATUS/ANNOTATION note: it
amends no normative clause, adds no row and moves no section number.** **What it supersedes, in its
STATUS half only:** the go-ahead paragraph below (and §0 **ruling 7**, §4.4, §7 item 1), whose
*"BLOCKED on the architect's go-ahead … wave D is authorised by no ruling currently on the record …
RED SET OWED — NOT AUTHORED, NOT RUN"* clauses are **kept visible and are the filing pass's state**.
**What it does NOT change:** `AGENTS.md` item 9 still binds (delegable only once the red set is **RUN
and REPORTED**), and the **wave-D order is unskipped** — `U-MOUNTGUARD` (`DONE`) → `U-LISTHOST` → **this
unit (`U-SLOTHOST`)** → `U-PROJ` — so this unit's ordering precondition is `U-LISTHOST`, not the
go-ahead. **Its exact next action: `TestWriter red` RUN and REPORTED → green → adversarial → blind
greens → legs → documentation review → DONE**, with `docs/next-steps.md` `## OPEN` row **`D3`** the queue
pointer. **The publisher/carrier half stays DECLINED — this note does not restore it.**

**⟶ STATUS NOTE — 2026-09-27, THE `§5.5` RE-DERIVATION PASS (the architect's gate-11 ruling for
code-bearing units, recorded in `docs/decisions.md` as the ACTIVE row
`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, with its follow-ups in `docs/pending.md` §G).** Two things
changed under the status block above, and this note exists so both are visible where a reader
enters this file. **(1) `§5.5`'s RECORDED ZERO-ROW EXEMPTION IS SUPERSEDED, and `§5.5` now carries
a TYPED PROPERTY REGISTER OF `6` ROWS, EACH EXECUTED DETERMINISTICALLY BY DESIGN (`§5.5.1`).** The
exemption text and its four-cell table **are kept visible, byte-for-byte, at `§5.5.0`** (the
annotate-never-rewrite convention), under a heading of their own, and the itemized reconciliation of
every dependent cell in this file is `§5.5.1`'s change summary plus the two new `§8` rows. **No
dependency, no leg, no file, no script and no `package.json` key is added** — the register rides the
existing node suite (§5.2 leg 1) in **this unit's own** `tests/slot-host.test.ts` (§4.1/§5.1).
**(2) THE LEDGER MOVED: `U-LISTHOST` — this unit's ordering predecessor — is `DONE` (the ledger's
FIFTH `DONE` row; its record is `docs/next-steps.md`'s `## DONE — U-LISTHOST` section), so the
counts are now `5 DONE / 15 open`** — **and this unit's own DONE row is the ledger's SIXTH, so when
`U-SLOTHOST` lands the counts read `6 DONE / 14 open`. The two forms are the same arithmetic
(`5 + 1 / 15 − 1`); the `5/15` form is the state a delegator checks while authorising THIS unit's
red, and the `6/14` form is the state this unit's own DONE row produces.** *(`5 DONE / 15 open` is
also the form `§4.5` and `§7` item 1 carry, deliberately — one reading of the ledger, not two.)*
**⟶ CORRECTED IN PLACE 2026-09-27 (the same pass, before commit): this note first read
"`6 DONE / 14 open`" alone while `§4.5`/`§7` item 1 stated `5 / 15`; the as-written form is kept
visible here and the reconciliation is the paragraph above. Neither form is stale — they are
different moments of the same ledger.**
**`U-SLOTHOST` is NOW THE NEXT UNIT IN THE WAVE-D ORDER**
(the order `U-MOUNTGUARD` (`DONE`) → `U-LISTHOST` (`DONE`) → **this unit** → `U-PROJ` is
unskipped), and this unit is therefore **blocked only on its OWN RED SET**. **This note amends no
normative clause, adds no `§3` row, moves no section number and renumbers nothing** — the deliberate,
non-renumbered `§5.3 → §5.5` gap (no `§5.4`) is recorded at the end of `§5.3` and stays as it is
(`§5.5.0` is a sub-heading of `§5.5`, not a new member of the `5.x` sequence). **This pass ran NO
test, NO leg and NO trio: every `YES` marking in `§5.5.1` is that row's execution DESIGN — the
executed-layer evidence is owed by this unit's red→green cycle, and the DONE row must report the
register's per-row attempts/held/broken counts and its strategy ids (`§5.3` item 10).**

**⟶ STATUS NOTE — 2026-09-27, THE `§7a` RULING PASS (the nine clauses the `§7a` ambiguity report
listed as underivable are now RULED, so the delegation gate's list is EMPTY).** This pass **rules all
nine items** of `§7a` from the contract's own majority reading, each citing the clauses that decide
it, and amends this spec so a TestWriter can derive a falsifiable row for every one of them — the
step the sibling unit took when its own TestWriter reported eight such clauses. **What it changed:
`§7a` gains the subsection `§7a.1` — the RULING table (nine rows: `#`, cited clauses, the ruling,
decided-vs-OPEN, and the row TEXT the TestWriter now authors or re-pins) — and, in the clauses
themselves: `§2.1`'s widened `SlotHostRefusal.key` (`unknown`, verbatim, no coercion — `§7a` item 5,
mirroring `docs/specs/listhost.md`'s identical amendment); `§2.1`'s refusal-code-domain clause
(`'no-container'` is DECLARED-BUT-NOT-EMITTED, `§7a` item 1); `§2.1`'s totality-boundary clause with a
NAMED SAFE DEFAULT per injected caller function (`§7a` item 4, the `listhost` shape); `§2.5` item 3's
graph-vs-tree layer ruling (`§7a` item 9); the `§3.2` per-method table for the absent and
unusable-container states plus the `containerFor` anti-vacuity observables (`§7a` items 2/7); the
amended rows `F-9` (membership pinned) and `F-10` (four seams ruled) and the NEW negative row `F-11`;
the amended rows `M-1`, `M-16`, `M-18` and the invariants `I-8`/`I-9`; the `§5.5.1` register-row
reconciliation block and its honesty block; `§7` items 8/9; and two `§8` rows. **Two rulings are
reported as `CONTRACT-AMENDED` because they change what a row asserts (items 4 and 6) — not silently
rewritten: the old text of every amended clause stays visible with the date and the reason.**
**`0` items remain OPEN QUESTIONS, no section number moves, no `§3` drive changes, no register
statement/type/attempt count changes, and the register total stays `155` attempts** (`§5.5.1`).
**This pass ran NO test, NO leg and NO trio** — it is spec text only, like the two passes above it,
and **the unit's red set is still owed** (`§4.2`, `§4.5`: a TestWriter to RUN and REPORT it,
`AGENTS.md` item 9). **The ledger counts are unchanged by this pass (`5 DONE / 15 open`); nothing in
this unit's status moves except the delegation gate's blocking list, which is now empty of
underivable clauses.**

**⟶ STATUS NOTE — 2026-09-27, THE `U-SLOTHOST` RED PASS: THE RED SET HAS **RUN** AND **REPORTED**, AND
THIS UNIT IS STILL NOT IMPLEMENTED, NOT GREEN AND NOT `DONE`.** *(This note **amends no normative
clause**, adds no `§3` row, moves no section number and changes no register statement, type, strategy
id, attempt count or the `155` total. It exists because the clause immediately above — and the
filing-time line **"The unit has NOT run: nothing here is implemented, no red set has been authored
and no leg has been run by this pass"** — is **superseded on its red-set half while its text is kept
visible**: the red set has since been **authored AND RUN** by the TestWriter.)* **MEASURED NUMBERS,
recorded here and in full at `§5.5.1`'s executed-red block so a delegator need not reach it:** red set
**`55` rows — `53` red / `2` pass** (the `2` passes are rows that can be green while the module is
absent — at least one of them being the register's own pool-count precondition row, which the
TestWriter reports as pinning the executed pool at `20` green; **this pass did not read the test file,
so the identity of the second pass is reported as the TestWriter's to confirm, NOT asserted here**);
whole node suite (`npm test`, §5.2 leg 1) **`61` files / `1035` tests — `980` passed / `53` failed /
`2` skipped**; the property register **`5` of `155` attempts executed**, **stopped early at
`P-SH-IM-1`** (`§5.5.1`'s stop-after-5-consecutive-failures rule, executed exactly as designed), with
**the five un-run register rows reported as FAILURES** rather than silently omitted; and the module
`src/shared/slot-host.ts` **does not exist**, which is why every red row reads
`Cannot find module '../src/shared/slot-host.js'`. **THE IMPLEMENTATION HAS NOT BEEN WRITTEN: the unit
is NOT green and NOT `DONE`** — the red RUN discharges the *author-and-run* half of `AGENTS.md` item 9
only, and **`§4.5`'s condition (d) now reads differently: it is no longer "a TestWriter to RUN and
REPORT" but "the Implementer's least-code pass", which has NOT run.** **The `155`/`20`/`60` figures
this file states remain the register's DESIGN accounting — the executed red produced `5` of them —
and nothing in them is re-pinned by this pass.**

**⟶ STATUS NOTE — 2026-09-27, THE ADVERSARIAL PASS AND THE ARCHITECT'S CONTAINER-SOURCE RULING: THE
UNIT IS NOT GREEN AND NOT `DONE`.** *(This note **amends no normative clause by itself** — every
amendment it names lives, dated, in the cell that carries it — and it moves no section number.)* **Two
things happened, and both are visible where a reader enters this file.** **(1) The architect has RULED
the remedy for a HIGH finding (`ADV-SH-1`): the container source is an INJECTED element factory — a new
OPTIONAL seam on `SlotHostOptions`; the ambient read (`globalThis['doc' + 'ument'].createElement('div')`,
`src/shared/slot-host.ts:130-140`, a property name assembled from two literals so the static scans could
not match it) is DELETED, not documented; and the static bans are TIGHTENED** — **no ambient global AND
no assembled/computed member lookup, no aliased/re-derived global reference** (the computed half ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE — `globalThis['doc' + 'ument']`, `globalThis[name]`, `const g = globalThis; g.document`; **⟶ QUALIFIED 2026-09-27, the `M-14` RECONCILIATION pass: it is NOT an unqualified ban on `[expr]`, and a locally constructed object's computed access is deliberately not banned — see `§2.1`'s container-source clause and `§4.4 S-2`**) (`§2.1`'s container-source
clause + the seam, `§1`, `§2.2` prohibitions 1/2, the Layer declaration anchor 3, the new row `§3.2
F-12`, `§4.4 S-2`/`S-4`, `§5.2`). **(2) A read-only ADVERSARIAL pass has RUN and its record is
`§3a`/`§3b`: fifteen findings (`ADV-SH-1`..`ADV-SH-15`), all `20` seeds ruled, the `17` Implementer
judgment calls ruled, the register executed `155` of `155` attempts with NOTHING STOPPED EARLY and TWO
BROKEN attempts (`P-SH-SM-1` `11/12`, `P-SH-SM-2` `7/8`), and SIX ROWS RED — `M-14`, `M-17`, `F-7`,
`P-SH-SM-1`, `P-SH-SM-2` sequence 5, `S-5` — ALL SIX RULED TEST-SIDE, with NO code defect among them.**
**Three items stay OPEN WITH OWNERS: `ADV-SH-2` (OWED: an Implementer guard + a spec pin against a
container passed back as a node), `ADV-SH-3` (OWED: module-local `WeakMap` bookkeeping instead of an
expando `parent` marker on the caller's node), and `ADV-SH-12` (PARKED, revisit when a non-shim/real-DOM
container is injected).** **⟶ RECONCILED 2026-09-27 (the unit's documentation review, findings `F-04`/`F-06`;
the sentence above — and both `OWED` parentheticals in it — is KEPT VISIBLE and is the ADVERSARIAL PASS's
state): `ADV-SH-2` is `FIXED`** — the guard is the landed **`isOneOfOurContainers`** refusal in
`src/shared/slot-host.ts`, called from `setNode` before anything is attached, so a container handed back as a
node is refused with the existing **`'malformed-node'`** code and cannot become its own descendant; **the
spec PIN the finding asked for is STILL OWED** (a `§3.1 M-20`-shaped / `§3.2 F-13`-shaped appended negative
row asserting that refusal and that the tree never becomes cyclic — neither `M-19` nor `F-12` covers the
drive). **`ADV-SH-3` is `CLOSED-IN-PLACE`** — the expando `parent` marker is **DELETED outright, not
replaced** (its value was read by nothing: `holds()` reads the container's `children` and the host's
bookkeeping is its `records` map), and **NO parent bookkeeping is installed at all**, because a module-local
registry is **inadmissible twice over**: this unit's own static row **`§4.4 S-4` bans the bare token**
(`/\b(WeakMap|WeakSet)\b/` over the comment-stripped source) and **`§2.2` prohibition 4** admits only *"its
per-key ownership bookkeeping + the container elements it created"* as state — with `I-5` requiring none of it
to survive `dispose()`. **The property a row may assert is therefore exactly *"the caller's node carries no
host-written marker"*; see `§7` item 7's companion decision and `§3b`-1's `ADV-SH-3` row.**
**`ADV-SH-12` stays `PARKED` unchanged** (revisit when a non-shim/real-DOM container is injected). **`ADV-SH-15`: NO PACKAGE DEFECT — nothing is owed to `docs/defects.md` or
`docs/HANDOFF.md` by this unit.** **The unit therefore may not be reported green, may not be reported
`DONE`, and no tracker row may read otherwise; the container source is being REWORKED** (`§7` item 11).
**This pass ran NO test, NO leg and NO trio** — the counts above are the adversarial pass's own report,
recorded as reported. **The publisher/carrier half stays DECLINED — this note does not restore it.**

**⟶ STATUS NOTE — 2026-09-27, THE UNIT'S GREEN AND ITS DOCUMENTATION REVIEW: THE STATUS STATEMENTS OF THE
FIVE NOTES ABOVE (the filing, `U-MOUNTGUARD`-go-ahead, `§5.5`-re-derivation, `§7a`-ruling and adversarial
notes — each ending with the unit not green and not `DONE`, and the filing one having run nothing) ARE
SUPERSEDED AS STATUS STATEMENTS (their text is KEPT VISIBLE, annotate-never-rewrite),
AND THE UNIT'S MEASURED FINAL STATE IS RECORDED HERE.** *(This note **amends no normative clause**, adds no
`§3` row, weakens no row, moves no section number and changes no register statement, type, strategy id,
attempt count or the `155` total. It exists because a reader entering this file at the adversarial note
above was told the unit is blocked and not green, and the green has since landed.)* **THE MEASURED STATE, as
the pass that measured it reports it — recorded as reported, nothing stronger:**
**`tests/slot-host.test.ts` — `61` rows, ALL GREEN** (`58` spec rows + the `SH-REG-1`/`SH-REG-2`/`SH-REG-3`
regression rows the fix pass appended) · **the property register `§5.5.1` — `155/155` attempts held, `0`
broken, NOTHING STOPPED EARLY** (per-row: `P-SH-IM-1` `33/33/0` · `P-SH-IM-2` `34/34/0` · `P-SH-IM-3`
`8/8/0` · `P-SH-SM-1` `12/12/0` · `P-SH-SM-2` `8/8/0` · `P-SH-TP-1` `60/60/0`, seed `20260927`, stop-after-5
`not triggered`) · **the trio (`§5.2`): `npm test` `[T]` `61` files / `1041` tests — `1039` passed / `0`
failed / `2` skipped · `npm run typecheck` exit `0` (**`src/**` ONLY — it does not cover `tests/**`, a
measured gap `docs/pending.md` §G still carries as an `OWED` row) · `npm run build` exit `0`** · **plus the
standalone strict `tsc` over the test file, exit `0` — a TestWriter-side check, NOT leg 2** · **the blind
record `docs/specs/slothost-greens.md` — `58` scenarios, `57` PASS / `1` FAIL / `0` NOT-BLIND-RUNNABLE,
whose `58` is that run's own commit (`6d5ff00`) and whose one FAIL and one recorded defect (`O-1`) are the
two items the fix pass re-pinned as `SH-REG-1`/`SH-REG-3`** · **and the mandatory per-unit documentation
review, `archive/reviews/2026-09-27-U-SLOTHOST-doc-review.md`** (`AGENTS.md` item 10d / RCA-6). **THE LAYER
HONESTY, unchanged and NOT weakened by the green:** the node suite is **`[T]`-only evidence** — a green node
suite is envelope/pure-layer evidence and **never assembled-app evidence**; the optional `[U]` real-DOM row
is **NOT TAKEN**, and it is not taken **structurally**, not by accident (**the module is a pure
`src/shared/` mechanism: it declares zero imports, reads no ambient global, and is imported by NO `src/**`
file, so no page/pane/shell surface exists to exercise — and the container source is now INJECTED by the
harness, so even the factory's product is a harness value; the `H-r10`/`U-DIVERGENCE-EXT` attribute-extractor
precondition is still `OWED`**). **Nothing in this file may be read as a real-DOM, IPC, MCP-transport or
assembled-app green.** **WHAT IS NOT DONE HERE:** this note **does not write the unit's `DONE` row and does
not claim the unit is `DONE`** — the unit's gates (spec → red → green → adversarial → blind greens →
documentation review) **have run**, and **the `DONE` row itself is OWED BY THE SUPERVISOR** (`§5.3` item 10's
shape, with the layer labels and the `[U]`-NOT-TAKEN reason above; the tracker cells and the ledger counts are
the supervisor's files, not this one's). **The publisher/carrier half stays DECLINED — this note does not
restore it.**

**Go-ahead state — stated plainly: this unit is BLOCKED on the architect's go-ahead for the wave-D
plan.** The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
*"the go-ahead is WAVE B ONLY … waves C–F are not authorised by this go-ahead"*), and it is **spent**.
Wave **D** is authorised by no ruling currently on the record, so this unit's red set may not be RUN
and it may not be delegated (`AGENTS.md` item 9). **Status of its red set: RED SET OWED — NOT
AUTHORED, NOT RUN** (RCA-1). **Ordering obligation from its queue row: it lands after `U-LISTHOST`**
(the amendment's appended **`Amendment record (A-d4…A-d8)` §3**, wave **D** — *"`U-MOUNTGUARD` →
`U-LISTHOST` → `U-SLOTHOST` → `U-PROJ`"*; and `docs/next-steps.md`'s `## OPEN` row **D3**'s
`Blocked on` cell). Source of this unit: the amendment record's **§1.10 `U-SLOTHOST` ← `SCH-9`'s host
half (A-d7 — host-only, mechanism-only)** (read in full), §2.2's `SCH-9` row
(**SPLIT — host half ADOPTED-RESHAPED; publisher/carrier half STAYS DECLINED**), `S-d14`, `H-r15`,
`H-r17`, §3 (wave D), the §"Per-unit equivalence limits" and "no new MCP surface" rows, and
`docs/next-steps.md`'s `## OPEN` row **D3** (spec cell `docs/specs/slothost.md` — **OWED — not
filed**; this file is that filing).

## 0. The rulings this unit derives from (recorded, NOT re-opened) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-9` is SPLIT and the split is BINDING and must not be re-merged (`H-r15`).** The **host** half is adopted as this unit; the **publisher/carrier** half stays **DECLINED** (`AUTHORS-UI-CONTENT`, prohibition `(C)#2`) because *"it authors the element's text and slot content"* — i.e. a UI element authored outside the provident graph, a `UI-RENDERED-WITH-PROVIDENT` **review finding** (`AGENTS.md:23-34`, `docs/decisions.md:53`). | §1, §2.2 (prohibition 2), §7 item 2 |
| **2** | **`H-r15`'s hazard, quoted so it is not lost: *"`U-SLOTHOST` must not grow per-zone/per-pane semantics or a mirror-class taxonomy (`is-empty`/`is-minimized`/`is-revealed`) — that would resurrect `SCH-10`/`SCH-4` under a new name, and its `§0 Contract-prohibitions` table must assert their absence."*** | §2.2 (prohibitions 1/2/3), §3 (`F-1`), §4 `A-17`, §6 |
| **3** | **The adopted contract, contract-exact** (§1.10): `createSlotHost({ container, keys, order?, classNameOf?, attributesOf? })` — (a) opaque keys; (b) caller-created nodes; (c) own-node ownership; (d) **no content authored — no text, no default label, no class taxonomy, no styling, and NO `publish` API**; (e) ordering as a projection of the caller's `order`; (f) empty key set ⇒ an empty container and no throw; a `null`/absent container ⇒ every operation a no-op with a valid state; an **undeclared key ⇒ a TYPED REFUSAL, never a silent create**. | §2.1, §2.3, §3 |
| **4** | **`V-7` is resolved by own-node ownership and stays a HARD row in BOTH units** (§2.2 + §1.10): *"a re-render removes exactly the nodes the host placed and nothing else; a foreign sibling survives two re-renders as the SAME element (`toBe`)"*. | §2.4, §3 (`M-7`/`I-3`), §7 item 3 |
| **5** | **`H-r17`'s decisive consequence — the SLOT host is the host that IS admissible, and the region host is NOT.** *"menus/toolbars/dashboards are containers + content, and the two halves have different admissibility — region host NO (stays declined) … slot host YES (`U-SLOTHOST`)"*. **This unit is therefore the ONLY host of the two that may exist**, and it must not acquire a region concept. | §1, §2.2, §7 item 4 |
| **6** | **`A-d7` reading (a) is the authority: `AGENTS.md:23-34` and `docs/decisions.md:53` are UNCHANGED**, and a mechanism is outside that constraint **because it is not a UI element** (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`, `docs/decisions.md:54`, read) — *"it authors no text, no control, no affordance, no class taxonomy, no slot content and no styling, and every node it creates is empty and consumer-driven (every visual property is consumer-supplied)"*. **A mechanism that authors content — a status text, a status element, a mirror-class taxonomy, a slot model, a literal default — IS a UI element authored outside the provident graph and remains a review finding.** | §2.2, §5, §7 item 5 |
| **7** | **The go-ahead for wave D does not exist yet**, and within wave D this unit follows `U-LISTHOST`. **This unit is BLOCKED on that go-ahead, on the wave-D order, and on its own red set.** **⟶ SUPERSEDED ON ITS GO-AHEAD HALF (2026-09-27, the `U-MOUNTGUARD` DONE pass; the as-written cell is kept visible): the wave-D go-ahead WAS GIVEN (architect, 2026-09-27) and `U-MOUNTGUARD` is `DONE`, so the surviving blockers are the wave-D order (its predecessor `U-LISTHOST`) and this unit's OWN RED SET.** **⟶ FURTHER ANNOTATED 2026-09-27 (the `§5.5` re-derivation pass; the as-written cell and the `U-MOUNTGUARD`-era note are both kept visible): the surviving blocker list of that note is now DOWN TO ONE — `U-LISTHOST` is `DONE` (the ledger's fifth `DONE` row, `docs/next-steps.md`'s `## DONE — U-LISTHOST`), the wave-D order is satisfied, and **this unit's OWN RED SET is the only blocker left**. The go-ahead half of this cell was already superseded; nothing in this cell is rewritten and the counts it implies are stated in the status note above it.** | this status block, §4.4, §7 item 1 |

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
   this repo's vitest files pass against `src/shared/dom-shim.ts`. **No window is booted, no IPC
   round-trip runs, no MCP transport is exercised, and no real DOM is touched.**
2. **Every row of this unit is a SHIM-TREE row.** The shim has no real CSS resolution, no
   `getComputedStyle`, no `querySelector(All)` and no `classList` (`src/shared/dom-shim.ts:1-3`
   announces exactly that scope; the shim's `className` is a **plain string field**, `:12`, read) —
   so a `[T]` green says *"the shim's tree and the shim's attribute store are as asserted"*, **not**
   *"the element renders with this class"*.
3. **The container is injected and the module reads no ambient global.** No `document`, no `window`,
   no `matchMedia`, no `getElementById`. The module is admissible under **(C)** (a consumer-agnostic
   shell-chrome mechanism) and judged under **(C)'s six prohibitions**, which §2.2 asserts.
   **⟶ TIGHTENED AND CORRECTED 2026-09-27 (the architect's option-(a) ruling on the container source;
   `ADV-SH-1`, HIGH, `CONTRACT-AMENDED`; the sentence above is kept visible and stays TRUE only after
   the fix):** the as-written sentence was **FALSE of the module as it stood** — `elementFor()`
   reached the realm itself through `globalThis['doc' + 'ument'].createElement('div')`
   (`src/shared/slot-host.ts:130-140`, read this pass), a property name **assembled from two
   literals** so the `/document/i` scan could not match it, so the module **read an ambient global
   while this anchor asserted it did not**. **The tightened rule, which both anchors 3 and `§2.2`
   prohibition 1 now carry: the module reads NO ambient global AND performs NO assembled/computed
   member lookup and NO aliased/re-derived global reference** — a property name assembled from
   literals, a computed access rooted in a banned realm token, or an aliased global is **the same
   violation as the literal token**. **⟶ NARROWED 2026-09-27 (the `M-14` RECONCILIATION pass; the
   sentence above is kept visible and the tightening is NOT weakened): the computed-access half of
   this rule is **computed access WHOSE RECEIVER IS A BANNED TOKEN (`globalThis`, `window`,
   `document`, `self`, `matchMedia`, a realm name) OR AN ALIAS OF ONE** — a bare `X[expr]` is NOT
   itself a violation, because ordinary dynamic indexing (`actual[index]`, a locally built map read
   by a variable key) is legitimate code and a scan cannot tell the two apart without the banned
   token in the access.**
   **The container source is the INJECTED `containerFactory` seam** (`§2.1`'s container-source
   clause); the ambient read is **DELETED, not documented**, and the static bans were tightened so
   the evasion cannot be re-introduced (`§4.4` `S-2`/`S-4`). **This anchor is therefore an assertion
   the red set must be able to FAIL**, not a description of the code as it stood.

**⟶ ADDED 2026-09-27 (the `§5.5` re-derivation pass): how this unit's QUANTIFIED claims are
executed, stated at the layer declaration so no reader has to reach `§5.5.1` to learn it.** The
three quantifications the pre-ruling exemption recorded as unproven (*every undeclared key is
refused with no silent create* · *no method throws for any input* · *every permutation of the
declared keys projects to that permutation with identity preserved*) are now **`§5.5.1` register
rows executed as finite, pinned enumerations inside this unit's own `[T]` test file** —
**hand-rolled plain TypeScript/vitest, one 32-bit LCG pinned to the literal seed `20260927` for the
totality row, no `fast-check`, no property runner, no new dependency**. **No layer claim is widened
by this**: the register is `[T]` work over an injected container and a shim tree, exactly like every
§3 row, so layer anchor 1 (a node-suite green is envelope/pure-layer evidence, never
assembled-app evidence) and anchor 2 (a shim-tree green is not a rendered-CSS green) **both still
bound every register row**, and **no register row depends on the optional `[U]` leg of §5.2**.

## 1. Scope

**One deliverable: `createSlotHost(...)`** — a host that maps **caller-declared opaque keys** to
containers holding **caller-created nodes**, orders and attributes them by **caller-supplied**
policy, owns exactly the nodes it placed, and **refuses an undeclared key with a typed refusal
instead of creating anything**.

1. **What it is, in one sentence.** A per-key container manager for caller-created nodes. The
   caller declares the keys once; thereafter it supplies *(key → node)* pairs, an order and
   attributes, and the host places each node in that key's container.
2. **What it is NOT — the publisher half, declined.** There is **no `publish` API**, no status
   text, no status element, no default label, no badge, no mirror-class taxonomy, no slot *model*
   (i.e. no notion of "an empty slot", "a minimized slot", "a revealed slot"), and no styling.
   **This is the declined half, and the decline is why the host half is admissible at all.**
3. **What the unit may land.** The module + its red/green rows + this spec. **No host change**: this
   unit adds consumer-agnostic code and touches no existing file except this spec and the trackers.
   **⟶ ADDED 2026-09-27 (the `§5.5` re-derivation pass): the property layer rides the SAME two
   files** — `§5.5.1`'s register rows are ordinary rows of this unit's own
   `tests/slot-host.test.ts`, authored in the same pass as the §3 red set, so this clause is
   **unchanged**: **no third file, no new script, no new leg, no `package.json` key and no new
   dependency** (§5.1's diff scope is not widened by the register).
4. **What the host DOES write (the complete list, so "no DOM writes beyond what is pinned" is
   falsifiable):** it creates **exactly one container element per declared key**; it places a
   **caller-created** node into the container for that node's key; it moves a node between two
   declared containers; it removes a node **it placed**; and it applies a **caller-supplied**
   `classNameOf`/`attributesOf` result to a **caller-created** node. **Nothing else. It authors no
   text and no class value of its own.** **⟶ AMENDED 2026-09-27 (the architect's option-(a) ruling on
   the container source; `ADV-SH-1`, HIGH — the sentence above is kept visible): the host CREATES no
   container element AT ALL.** It obtains **exactly one container per declared key** from the
   **injected `containerFactory`** (the sole container source, `§2.1`'s container-source clause) and
   **reads no ambient global — and performs no assembled/computed member lookup, no aliased or
   re-derived global reference — to obtain one**. **So the complete write list reads: it obtains one
   container per declared key from the factory; it projects those containers onto the injected
   `container`; it places a caller-created node into that key's container; it moves a node between two
   declared containers; it removes a node it placed; and it applies a caller-supplied
   `classNameOf`/`attributesOf` result to a caller-created node.** **With the factory absent (or
   non-callable, or returning an unusable value) it obtains none and every operation is the `F-6`-class
   no-op of the new row `F-12`.**

**Explicitly OUT of scope (do not do in this unit):**

- **The publisher/carrier half, in any spelling** — `publish`, a status string, a status element,
  a label, a badge, an "empty/minimized/revealed" class or state, a slot model, a text write, a
  default value. **Declined, not deferred** (§0 ruling 1).
- **Any per-zone/per-pane semantics, any mirror-class taxonomy, any `is-*` class literal**
  (`H-r15`'s named hazard).
- **Any region concept** — no region name, spec, registry or mount resolution (`H-r17`, ruling 5).
- **Any `querySelectorAll`, `querySelector`, `closest`, `getElementById`, `matchMedia`,
  `activeElement`, `getComputedStyle`, `document` or `window` reference**, and **no class-list
  manipulation beyond the injected `classNameOf`** (§2.2).
- **Any store, registry, persistence, or module-level mutable state** beyond the host's own
  per-key ownership bookkeeping.
- **⟶ ADDED 2026-09-27 (the architect's option-(a) ruling on the container source; `ADV-SH-1`, HIGH):
  NO AMBIENT GLOBAL **AND** NO ASSEMBLED/COMPUTED MEMBER LOOKUP.** The tightening is part of the
  out-of-scope list itself, so it is a scope violation and not a style preference: **a property name
  assembled from literals** (`globalThis['doc' + 'ument']`), **a computed access ROOTED IN A BANNED
  REALM TOKEN** (`globalThis[x]`, `realm[propName]`), **an `eval`/`Function`-constructed access**, and
  **an aliased or re-derived global reference** (`const g = globalThis; g.document` — or any helper
  that returns the realm, the realm's factory owner, or a `createElement`-shaped function) are **ALL
  the same violation as the literal token `document`**. **⟶ NARROWED 2026-09-27 (the `M-14`
  RECONCILIATION pass, on the TestWriter's remand report; everything above is kept visible and the
  ban is NOT weakened): read "computed access" as COMPUTED ACCESS WHOSE RECEIVER IS A BANNED TOKEN OR
  AN ALIAS OF ONE — NOT as blanket bracket notation.** The reason is the row must be assertable: a
  bare `X[expr]` carries no banned token, so a scan cannot tell a realm lookup from ordinary dynamic
  indexing (`actual[index]`, a locally built map keyed by a variable), and a ban phrased that way
  would fail the module's own legitimate code and prove nothing about ambient reach. **The limit,
  stated so no later pass over-reads it: the ban fires when a banned token (`globalThis`, `window`,
  `document`, `self`, `matchMedia`, a realm name) appears in the access, or via an alias/re-derivation
  of it; a LOCALLY CONSTRUCTED object's computed access is deliberately NOT banned** — it reaches no
  ambient global. Rationale, stated so the ban is not read as
  over-broad: the clause exists to forbid the module **reaching the ambient realm for anything**,
  and the assembled form above did exactly that while defeating `/document/i`. **The container source
  is the injected `containerFactory` seam and nothing else** (`§2.1`'s container-source clause).
  **This ADDS to the bullet above and deletes nothing from it** — the `document`/`window` ban keeps
  its as-written text.
- **Any new MCP surface** — the five-seam negative: no tool, resource, group, `VALID_GROUPS` member
  (`src/main/security.ts:134`, read: `read`/`dispatch`/`graph`/`code`/`module`), `RpcMethod` member
  (`src/shared/types.ts:259-281`, read: **21** members) or `MUTATING_METHODS` entry
  (`src/renderer/renderer.ts:12`, read: seven members). `ALL_TOOLS` **stays 21**
  (`src/main/mcp-server.ts:281-303`, read: 21 names). **⟶ ANNOTATED BESIDE 2026-10-04 (THE `SLOT-HOST-ENVELOPE-AUTHORED-CONTAINER-SOURCE` GATE-1 DOCS-ONLY DISPOSITION; `RCA-8(d)` — the as-filed `21` above is KEPT VISIBLE and is NOT rewritten; no clause, row id, register row, term, strategy id, seed or count in this spec moves): the `ALL_TOOLS` figure is STALE — the live listing reads `22` (`provident.focus` joined it, `src/main/mcp-server.ts:364-387`) and this unit's OWN live row asserts `22` (`tests/slot-host.test.ts:3042`, read). The prohibition this cell states is UNHARMED and unmoved (no tool, resource, group, `RpcMethod` member, `MUTATING_METHODS` entry or IPC method was added BY THIS UNIT); only the quoted count drifted, AFTER this unit closed. The anchor `:281-303` is stale for the same reason (the array now sits at `:364-387`). The repo-wide sweep of this figure is CARRIED AS `OWED` — `docs/pending.md` `§N` row `O-3`, measured at `170` hit sites across `20+` `docs/**` files by that disposition's pass, with only this spec's three cells (here, `§2.2` prohibition 5 and `§8 A-16`) annotated by it.**
- **Any shim change.** `src/shared/dom-shim.ts` is untouched; a green must not depend on a new shim
  member (`H-r5`).
- **Any other wave-D/E/F unit.** Each is its own spec, red and cycle (RCA-2). **In particular, this
  unit must not absorb `U-LISTHOST`'s list role or `U-PROJ`'s value role** (§4 `A-18`).
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists** (globbed
  `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
  matrix and no demo-page index to update**.

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and refusal pattern

**New module: `src/shared/slot-host.ts`** (a pure `src/shared` module). **Seven exports**, and
nothing else:

```ts
/** An opaque caller key. The host compares it for equality and reports it
 *  back; it NEVER interprets, normalizes, prefixes or enumerates it. */
export type SlotKey = string

/** A caller-supplied attribute write, applied VERBATIM to a caller-created
 *  node. The host neither validates nor defaults either field. */
export interface SlotAttribute {
  readonly name: string
  readonly value: string | number | boolean
}

export interface SlotHostOptions {
  /** The element the per-key containers are created INSIDE. `null`/absent is a
   *  valid, supported configuration (§3.2 `F-6`). */
  readonly container: unknown | null
  /** The DECLARED key set. The host's vocabulary is EXACTLY this list —
   *  nothing may be created for a key outside it (§3.2 `F-1`). */
  readonly keys: readonly SlotKey[]
  /** The caller's ordering policy for the containers, per key. Omitted ⇒ the
   *  supplied `keys` order. */
  readonly orderOf?: (key: SlotKey) => string | number
  /** The caller's class value for a node. Applied VERBATIM. Omitted ⇒ no class
   *  write at all. */
  readonly classNameOf?: (key: SlotKey, node: unknown) => string | null | undefined
  /** The caller's attribute writes for a node. Applied VERBATIM, in order.
   *  Omitted ⇒ no attribute write at all. */
  readonly attributesOf?: (key: SlotKey, node: unknown) => readonly SlotAttribute[] | null | undefined
  /** Notified ONCE per refusal. The host NEVER awaits it and NEVER lets it
   *  change the refusal's outcome (§2.1's callback rule). */
  readonly refuse?: (refusal: SlotHostRefusal) => void
  /** The SOLE container source: the caller's element factory. Called once per
   *  declared key that needs a container; the value it returns IS that key's
   *  container. The accepted shape is "offers `appendChild`" — the same
   *  predicate the module already uses for `isNodeShaped`. Absent (or
   *  non-callable, or returning an unusable value) ⇒ the EXISTING degradation:
   *  every operation is a valid no-op with a valid state and nothing is
   *  placeable (§2.1's container-source clause, §3.2 `F-12`).
   *  ⟶ ADDED 2026-09-27 (the architect's option-(a) ruling on the container
   *  source; the as-filed option list is kept visible below): the ambient read
   *  is DELETED, not documented, and this seam REPLACES it.
   *
   *  ⟶ AS FILED 2026-09-27 (kept visible, not rewritten): there was NO factory
   *  seam. `SlotHostRefusal`'s own `'no-container'` member was the only trace of
   *  a container source, and the host obtained its container from `container`. */
  readonly containerFactory?: (key: SlotKey) => unknown
}

export interface SlotHostRefusal {
  /** The key exactly as supplied (never normalized, never prefixed).
   *  ⟶ RULED 2026-09-27 (`§7a` item 5, the `§7a` RULING pass; the as-filed declaration is
   *  kept visible below): the field was `readonly key: SlotKey`, i.e. a STRING, while this
   *  very doc string requires the supplied value VERBATIM and `§3.2 F-3` drives NON-string
   *  inputs (`42`, `null`, `''`) that are refused — a string-typed field cannot hold them,
   *  and "exactly as supplied" would force the normalization this parenthetical forbids.
   *  The field therefore WIDENS to `unknown` — the same amendment the sibling unit made to
   *  `ListHostRefusal.key` (`docs/specs/listhost.md`, read this pass) — and it holds the
   *  supplied value VERBATIM, whatever its type: a `SlotKey` when the input was a string,
   *  and `42`/`null`/`undefined`/`{}` when it was not, with NO coercion, NO `String(...)`,
   *  NO trim. `F-3`'s trigger and `P-SH-SM-1`'s assertions are re-pinned to this form; the
   *  refusal `code` union is NOT changed by the amendment.   */
  // readonly key: SlotKey   ⟵ AS FILED (kept visible; superseded by the line below)
  readonly key: unknown
  /** The refusal `code` union — FOUR declared members, of which THREE are EMITTED by this
   *  unit's contract and ONE is DECLARED-BUT-NOT-EMITTED. See the code-domain clause below.
   *  ⟶ RULED 2026-09-27 (`§7a` item 1, the `§7a` RULING pass): `'no-container'` is
   *  reachable by NO method of this unit and is asserted by the negative row `F-11`;
   *  `'container-not-appendable'` is the code `F-6`/`F-7` give the present-but-unusable
   *  container.   */
  readonly code: 'unknown-key' | 'no-container' | 'malformed-node' | 'container-not-appendable'
  /** One sentence, in this unit's own voice. */
  readonly message: string
}

export interface SlotHostResult {
  /** `true` iff nothing was refused. */
  readonly ok: boolean
  /** The declared keys, IN THE PROJECTED CONTAINER ORDER. */
  readonly order: readonly SlotKey[]
  /** Every key that currently holds a host-placed node, in projected order. */
  readonly placed: readonly SlotKey[]
  /** Every node this call REMOVED (the ones the host had placed), by reference. */
  readonly removed: readonly unknown[]
  /** This call's refusals, in encounter order. */
  readonly refused: readonly SlotHostRefusal[]
}

export interface SlotHost {
  /** Declare the node for a key. An UNDECLARED key is refused (never a silent
   *  create). A `null`/malformed node is refused (`malformed-node`). */
  setNode(key: SlotKey, node: unknown | null): SlotHostResult
  /** Remove the node the host placed for a key (unknown key ⇒ refusal). */
  remove(key: SlotKey): SlotHostResult
  /** The projected container order (`orderOf` + supplied `keys`). */
  setOrder(keys: readonly SlotKey[]): SlotHostResult
  /** Place/refresh the current declarations (idempotent). */
  render(): SlotHostResult
  /** The declared keys, in the projected order. Always valid. */
  keys(): readonly SlotKey[]
  /** The container element the host created for a key, or `null` for an
   *  undeclared key. Exposed so the caller can place its OWN content in it. */
  containerFor(key: SlotKey): unknown | null
  /** Relinquish ownership: remove the containers the host created. The
   *  caller's NODES are not destroyed (§2.4 item 5). */
  dispose(): void
}

export function createSlotHost(options: SlotHostOptions): SlotHost
```

**The refusal pattern, exactly.** **No method of this host throws — for any input.** Every method
returns a `SlotHostResult` (except `dispose()`, which returns `void` and is idempotent). A refused
operation contributes a `SlotHostRefusal` and leaves the host's state valid. **`ok` is `false` iff
`refused.length > 0`** (row `I-1`).

**⟶ THE CONTAINER SOURCE — INJECTED, AND THE AMBIENT READ IS DELETED (ADDED 2026-09-27, the
architect's option-(a) ruling; `ADV-SH-1`, HIGH, `CONTRACT-AMENDED`).** *Why this clause exists:* the
module as it stands reaches the realm's element factory through the ambient global itself —
`globalThis['doc' + 'ument'].createElement('div')` (`src/shared/slot-host.ts:130-140`, read this pass)
— with the property name **assembled from two literals** so that a static token scan for `/document/i`
cannot match it. That shape **evaded three clauses at once** (`§1`'s "no `document`/`window`
reference", `§2.2` prohibition 1's static source row, and the Layer declaration's "reads no ambient
global") while doing the banned thing. **The architect has RULED the remedy, and it is option (a): the
container source is an INJECTED element factory — a new OPTIONAL seam on `SlotHostOptions`; the ambient
read is DELETED, not documented; and the static bans are TIGHTENED so the evasion cannot be
re-introduced.** The clause, normatively:

1. **`containerFactory` is the SOLE container source.** `options.containerFactory(key)` is the only way
   this host obtains a container element. **No ambient global, and no assembled/computed member
   lookup rooted in one, is a container source** — not `globalThis`, not a re-derived global
   reference, not an alias of one (`§1`'s out-of-scope list, `§2.2`'s prohibitions 1/2). **⟶ NARROWED
   2026-09-27 (the `M-14` RECONCILIATION pass, on the TestWriter's remand report; the clause above is
   kept visible and the PROHIBITION is NOT weakened): the ban is on a computed/assembled access
   WHOSE RECEIVER IS A BANNED REALM TOKEN OR AN ALIAS OF ONE** — `globalThis['doc' + 'ument']`,
   `globalThis[name]`, `const g = globalThis; g['window']` — **and it is NOT a blanket ban on bracket
   notation**, because `X[expr]` alone is legitimate dynamic indexing (`actual[index]`, a locally
   built map read by a variable key) and asserting "no computed member lookup anywhere in the module"
   would make the row fail on the module's own legitimate code. **What is assertable, exactly: the
   ban fires when the banned token (`globalThis`, `window`, `document`, `self`, `matchMedia`, a realm
   name) appears in the access or in an alias/re-derivation of it**; a locally constructed object's
   computed access is **deliberately NOT banned** — it does not reach an ambient global and no static
   scan can distinguish it from ordinary indexing (a module's own local reads and array indexing are unaffected by this ban).
2. **Its SIGNATURE is `(key: SlotKey) => unknown`,** called **once per declared key that needs a
   container** (the first call for that key that actually needs one — the host may not create a
   container the contract's own drives do not require, `F-1`/`I-10` — and the value it returns for
   that key **is** that key's container, including on a later re-creation after `dispose()`).
3. **What a caller MAY return — the accepted shape, exactly:** a value that **offers `appendChild`**
   (**a function-valued `appendChild` member**). **This is the SAME predicate the module already uses
   for `isNodeShaped`** (`src/shared/slot-host.ts:152-156`, read) and for the injected container's own
   usability (`isUsable`, `:180-184`): the host requires **exactly one operation** — `appendChild` —
   and **no** `tagName`, `children`, `remove`, `setAttribute`, `className` or prototype is required
   for a value to be accepted as a container. A real DOM element satisfies it; a shim `ShimElement`
   satisfies it; a plain object offering an `appendChild` function satisfies it; **no predicate such
   as `instanceof` or a tag check is asserted or admissible** (`§4.4 S-2`, `H-r5`).
4. **ABSENT (or non-callable, or returning an unusable value) ⇒ the EXISTING degradation — STATED
   EXPLICITLY, because it is not a new behaviour:** the factory is optional, and **every operation is
   then a valid no-op with a valid state and nothing is placeable** — `refused` is `[]` and
   `ok === true` for a valid input (`I-1`), `placed` is `[]`, `keys()` still reports the **declared**
   keys in the projected order, `order` is still valid, and `containerFor(k)` returns **`null` for
   every key**. **This is the SAME `F-6`-class behaviour as an absent container**, stated for the
   factory so a TestWriter derives it without guessing: **no container-state refusal is produced**
   (in particular **not `'no-container'`** — that member stays DECLARED-BUT-NOT-EMITTED, `§3.2
   F-11`), and the non-callable/non-conforming-factory shapes are **NOT** the present-but-unusable
   `F-7` refusal class (`F-7` is about an injected **container** that refuses the write, not about
   the factory).
5. **Absent container AND absent factory together ⇒ the same no-op state**, once (not two
   degradations stacked): the host has nowhere to place and nothing creates containers, and every
   method keeps its declared result shape (`I-8`).

**⟶ AS FILED 2026-09-27 (kept visible, annotated): the filing-time option type carried NO container
source seam** — `container: unknown | null` was the ONLY container-shaped input, and this spec's
`§3.2 F-6`/`F-7` rows were the only statements about where containers come from. **The clause above
does not delete any of that**: `container` remains the element whose children the host's containers are
projected onto (the mount), and it is **still injected, still optional, still a supported no-op
configuration** (`F-6`).** What the ruling DELETES is the ambient read the module performed to create
the containers it was projecting — a source this contract never declared, and which no row of `§3`
ever named.

**⟶ THE REFUSAL-CODE DOMAIN, STATED EXACTLY SO THE TESTWRITER'S CODE SET IS EXACT — THREE EMITTED,
ONE DECLARED-BUT-NOT-EMITTED (ADDED 2026-09-27, the `§7a` RULING pass, `§7a` item 1).** The union
above declares **four** members; this unit's contract **emits exactly three** of them, and the
fourth is a **declared-but-not-emitted member**, stated here rather than left as a silent gap:

| # | Member | Emitted by this unit? | The clause that decides it |
| --- | --- | --- | --- |
| 1 | `'unknown-key'` | **YES** | `F-1` (`setNode`/`remove` on an undeclared key), `F-3` (a non-string/`''` key), `F-4` (a malformed `keys` option ⇒ an empty declared set, so every `setNode` is `unknown-key`) |
| 2 | `'malformed-node'` | **YES** | `F-2` (`setNode('a', null)` / `undefined` / `42` / `'x'` / `{}`) |
| 3 | `'container-not-appendable'` | **YES** | `F-7` (a container that is **present but refused by the environment**) — and **only** that shape: `F-6` states in writing that an **absent/`null`** container is **not** a refusal |
| 4 | `'no-container'` | **NO — DECLARED BUT NOT EMITTED (the ruling of `§7a` item 1)** | **Reason:** `F-6` is the contract's majority reading of the absent container (*"`refused` is `[]`, `ok === true`"*, `M-14`, `§2.3` item 6) and it is a **supported no-op configuration**, not a refusal; `F-7` gives every present-but-unusable-container refusal to `'container-not-appendable'`; **no third container state exists in `§2.1`'s option type** (`container: unknown \| null`) — **and the CONTAINER-SOURCE seam adds no state that emits it either: with `containerFactory` absent, non-callable, throwing or returning an unusable value, the host degrades exactly as for an absent container (`§3.2 F-12`), producing `refused` `[]` and `ok === true` and never `'no-container'`** (`§2.1`'s container-source clause, its degradation item) — so **no `§3.2` trigger emits `'no-container'`**, and none is invented. The member stays in the union for contract stability, and the negative is pinned: **the row `F-11` asserts that no method, for any drive in `I-8`/`P-SH-TP-1`'s enumeration *and* in `F-12`'s five factory drives, ever emits `'no-container'`** — a falsifiable assertion (a `code === 'no-container'` entry anywhere fails it) |

**What the TestWriter may therefore assert, in one line:** **every refusal produced anywhere in this
unit carries one of the THREE emitted codes** (`P-SH-SM-2`'s per-step code-membership clause is
re-pinned to the emitted set **plus** the `'no-container'`-absent half, and `F-11` is its own
negative row); a fifth code, and a `'no-container'` entry, are each **findings** — not table
extensions.

**The injected-callback rule, stated because it is a real hazard.** `orderOf`, `classNameOf`,
`attributesOf` and `refuse` are **caller code**. **A throw from caller code is the caller's bug, and
this contract does not claim to swallow it** — a later pass may not read the totality rule as
covering a throwing callback. **`refuse` is NOTIFIED, never awaited**: the host calls it **once per
refusal** and **ignores its return value and any promise it returns**, so a `refuse` callback cannot
change a refusal's outcome or the returned result. *(The adversarial seed `A-5` carried the "what if
`classNameOf`/`attributesOf` throws" question to the pass that runs, because the sources are silent
on it — §7 item 7.)*

**⟶ THE TOTALITY BOUNDARY — RULED AND MADE NORMATIVE HERE (2026-09-27, the `§7a` RULING pass, `§7a`
item 4; the paragraph above is the FILING-TIME clause and is kept visible, not rewritten).** The
filing-time clause above states the **exemption**; this ruling states the **boundary AND the safe
defaults**, so the totality universal is derivable rather than ambiguous. The universal reads, in
the **same words** `§5.5.1 P-SH-TP-1` already carries, and this clause is now its normative home:

> **NO method of this host throws — for any input shape — and `a throwing caller callback is excluded`
> from that universal.**

**The universal is therefore bounded by the injected-callback shape, and the bound is not a silent
exemption: each injected caller function has a NAMED SAFE DEFAULT, the host CATCHES the throw and
CONTINUES with that default, and the method still returns its declared result.** **⟶ THE TABLE CARRIES
`5` SEAMS, NOT `4` (ADDED 2026-09-27, the architect's option-(a) ruling on the container source):
`containerFactory` is the fifth, appended after the four the `§7a` ruling pass named — see the last row
and the count note below the table.** (This follows the
sibling unit's own ruling shape: `docs/specs/listhost.md`'s `§2.1` totality-extends-to-injected-
functions clause and its per-function safe-default table, read this pass — the three real seams
there are `itemFactory`/`onActivate`/`onClose`, each with a named default. **The clause is mirrored
as a SHAPE, not copied as text: this unit's seams, codes and observables are its own.**)

| Injected caller function | What a throw means | The host's safe default (the catch) | Observable a row asserts |
| --- | --- | --- | --- |
| `orderOf` | the caller's container-ordering policy failed for that projection | the container order falls back to the **supplied `keys` order** — identical to the omitted-`orderOf` default, because *omitted `orderOf` ⇒ the supplied `keys` order* **is the absence of a policy** (§2.5 item 1, prohibition 3: no policy is invented) | **no throw**; `order === keys`' order, each declared key once (`I-2`); **no** `SlotHostRefusal` is invented for it; `placed`/ownership unaffected; `ok` reflects only genuine refusals (`I-1`) |
| `classNameOf` | the caller's class policy produced no value | **no class write for that node** — the **same** as a `null`/`undefined` return (`§2.5` item 4, `M-11`): `null`/`undefined` already means *no write for that field*, so the default needs no new rule and writes no empty class | **no throw**; the node's class field is unchanged; **no** refusal; `ok === true` when nothing else was refused |
| `attributesOf` | the caller's attribute policy produced no list | **no attribute write for that node** — the same as a `null`/`undefined` return (`§2.5` item 4); entries are applied **best-effort per entry** (`F-8`), so a **malformed entry** is skipped without failing the call and a **throw** is the whole list's default | **no throw**; the attribute-name set is unchanged; **no** refusal; `ok === true` when nothing else was refused |
| `refuse` | the caller's refusal listener failed | the throw is **swallowed**: the refusal has **already** been recorded in the returned `refused` list, and its outcome is unchanged | **no throw out of the method that produced the refusal**; the refusal **is** present in `refused`; `refuse` is still attempted **exactly once per refusal, in encounter order** (`M-17`) |
| **`containerFactory`** *(THE FIFTH SEAM — ⟶ ADDED 2026-09-27, the architect's option-(a) ruling on the container source; the four rows above are the filing-time/ruling-pass table and are kept visible)* | the caller's **element factory** failed for that key — it threw, or it is present but **not callable**, or it returned a value that **does not offer `appendChild`** | **the key's container is treated as ABSENT**: the host catches the throw (and treats non-callable / non-conforming-factory shapes identically) and CONTINUES — **nothing is placeable for that key**, `placed` gains no key, and `containerFor(key)` returns **`null`** for it (`§2.1`'s container-source clause, `§3.2 F-12`) | **no throw**; the method returns its declared result shape; the key stays **declared** in `keys()`/`order`; **no** `SlotHostRefusal` is invented for it and **`'no-container'` is NOT emitted** (`F-11`); `ok` reflects only genuine refusals (`I-1`) |

**No clause above weakens a refusal, and no new refusal code is invented**: a thrown injected
function **never** becomes a `SlotHostRefusal` of its own kind (there is no code for "the callback
threw"), so `§2.1`'s four-member union and the emitted-three domain above are unchanged. **⟶ THE SEAM
COUNT IS NOW `5`, NOT `4` (ADDED 2026-09-27, the architect's option-(a) ruling on the container
source; the paragraph above is the ruling pass's text and is kept visible and NOT weakened):**
`containerFactory` is the **fifth injected caller function**, it has the NAMED SAFE DEFAULT the new
table row states (the key's container is treated as absent, nothing is placeable for it,
`containerFor` returns `null`, **no** refusal and **no `'no-container'`**), and the totality-boundary
universal above therefore binds **five** seams — `orderOf`, `classNameOf`, `attributesOf`, `refuse`,
**`containerFactory`**. **Everything else in the paragraph stands verbatim:** no invented code, no
re-throw, and `P-SH-TP-1`'s pool still excludes the throwing-callback shapes (which is why the fifth
seam is driven by a `§3.2` row, **`F-12`**, and not by that register row). **What the caller MAY
expect, precisely:** the method returns its declared shape, the host's state stays valid,
caller-code failure is **never** reported as a contract refusal, and the host **never re-throws** a
caller throw. **`F-10` is re-ruled by this clause** — it is **no longer "this spec does not decide
it"**: see the amended `F-10` row and `§3a A-5`'s disposition, and note that **`P-SH-TP-1`'s pool
still excludes the callback-throwing shapes** (the pool's exclusion is a *bounded* marking, not a
licence to re-open `F-10`; the row that now drives the four seams is a `§3.2` row, `F-10`).

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** the **container**; every
**key** (declared by the caller — "opaque keys" is the contract); every **node** (the caller creates
it; the host **never** creates a node of its own); the **order** and the **order policy**; the
**class value**; every **attribute name and value**; and the **refusal listener**.

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module's source contains **no occurrence** of `zone`/`pane`/`tab`/`region`/`is-empty`/`is-minimized`/`is-revealed`/`status` as vocabulary; keys are typed as an **open** `type SlotKey = string` (an alias, not a closed union — so a consumer value can never be a member); no consumer constant is documented. The only string-union is `SlotHostRefusal['code']`'s **four** contract diagnostics. **The declared key set is caller data, not a vocabulary of the mechanism.** **⟶ TIGHTENED 2026-09-27 (the architect's option-(a) ruling on the container source; `ADV-SH-1`, HIGH — this row is STRENGTHENED, not re-scoped, and the sentence above is kept visible): a source scan must ALSO reject an ASSEMBLED or COMPUTED member lookup and an aliased/re-derived global reference** — `globalThis['doc' + 'ument']`, `globalThis[name]`, `const g = globalThis; g['window']`, a returned realm/`createElement` alias — **because that shape does the banned thing while defeating the token scan** (`src/shared/slot-host.ts:130-140`, the evasion `ADV-SH-1` records). **A row that scans only for the literal tokens is an INCOMPLETE row and the evasion it misses is a finding.** **⟶ NARROWED 2026-09-27 (the `M-14` RECONCILIATION pass, on the TestWriter's remand report; the sentence above is kept visible and this row is NOT weakened): the anti-assembly half is asserted over accesses ROOTED IN A BANNED TOKEN OR AN ALIAS OF ONE — "no computed member lookup" UNQUALIFIED is not assertable as a static scan, because a bare `X[expr]` (`actual[index]`, a locally built map read by a variable key) is legitimate dynamic indexing and the scan cannot tell it from a realm lookup without the banned token present.** The row therefore fails on `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]` and `const g = globalThis; g.document`, and **a locally constructed object's computed access is deliberately NOT banned** (the TestWriter's reported limit, recorded here as the row's bound rather than left as an unstated gap). | static source row over the module file **⟶ AND (2026-09-27) an anti-assembly row: no computed/assembled member lookup, no aliased global, no re-derived realm — the row FAILS on `globalThis['doc' + 'ument']`** |
| **2** | **No app UI content** authored | The host authors **no** text, **no** label, **no** status string, **no** `role`/ARIA attribute, **no** class value of its own, **no** style, and **no** default node. It creates **containers** (empty elements) and applies **caller-supplied** class/attribute values to **caller-created** nodes. **A `publish`-shaped surface is ABSENT by contract** (ruling 1). **⟶ TIGHTENED 2026-09-27 (the architect's option-(a) ruling on the container source; `ADV-SH-1`, HIGH — STRENGTHENED, not re-scoped): the containers and every child they hold come FROM THE INJECTED `containerFactory`, so this row's static half gains the source-of-containers negative — the module creates NO element of its own and reads NO ambient global (no `document`/`window` access ROOTED IN A BANNED TOKEN OR AN ALIAS OF ONE, and no aliased realm) to obtain one; a container the module produced from anything other than the injected factory FAILS this row.** *(What the ruling deletes is the ambient read the module performed to create the containers it projects: the row's content half is unchanged, and the created element's emptiness is unchanged — the host still authors no text, no class value and no attribute.)* | static rows: zero `textContent` write, zero `className` value literal, zero `publish`-shaped export **⟶ AND (2026-09-27) zero element creation of the host's own: containers come from the injected `containerFactory` only, and no ambient/assembled global is read to get one** |
| **3** | **No policy defaults** | No default container, no default ordering policy (omitted `orderOf` ⇒ **the supplied key order**, which is the **absence** of a policy), no default class, no default attribute, no default key, no default node, no default text. | `F-4` + `M-2`/`M-5` |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero file/`localStorage`/IPC. The host's **only** state is its per-key ownership bookkeeping + the container elements it created; `dispose()` empties it, and a row asserts no state survives `dispose()`. **No consumer value is retained beyond the current declaration** (no history, no previous-value cache). | `M-13`, `I-5` |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, **no IPC method**. `ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**. **⟶ ANNOTATED BESIDE 2026-10-04 (THE `SLOT-HOST-ENVELOPE-AUTHORED-CONTAINER-SOURCE` GATE-1 DOCS-ONLY DISPOSITION; `RCA-8(d)` — the as-filed `21`/`21` above is KEPT VISIBLE and is NOT rewritten; nothing in this row's prohibition, in its `[T]` basis or in the register moves): `ALL_TOOLS` is NOW **`22`** (`provident.focus` joined the live listing AFTER this unit closed — `src/main/mcp-server.ts:364-387`; this unit's own live row asserts `22`, `tests/slot-host.test.ts:3042`) — **the drift is the LATER unit's addition, not this unit's, so this row's prohibition still holds and its own static row is unaffected**; `RpcMethod` reads its own later count in the same way. **The census anchor cited here (`tests/engine-pin-version.test.ts:174-197`) and the sibling anchor at `§1` are stale for the same reason.** The repo-wide sweep is CARRIED AS `OWED` (`docs/pending.md` `§N` row `O-3`; `170` hit sites across `20+` `docs/**` files, of which this disposition annotated ONLY this spec's three). | `tests/engine-pin-version.test.ts:174-197`'s **21**-member census (read) **must still pass unchanged**; plus a static import row |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]** alone. The unit asserts **no** layout, paint, styling-resolution, focus, real-click or rendered-geometry property, and its module expands no shim member. The real-DOM identity row is **OPTIONAL** (`[U]`, §5.2) and nothing in §3 depends on it. | every §3 row carries `[T]`; the `[U]` row is optional and precondition-gated |

### 2.3 The declared-key rule — the typed refusal, stated falsifiably

1. **The key set is declared once, at construction, by the caller.** `options.keys` is the host's
   **entire** vocabulary. A key not in it is **undeclared**.
2. **An undeclared key is REFUSED, never silently created** (§1.10 (f) — *"never a silent create"*).
   The refusal is `{ code: 'unknown-key', key }`; **no container is created, no node is placed, no
   state changes**, and the host never grows its own key set. **A row asserts that the mount's child
   count is unchanged after the attempt** (`F-1`).
3. **One container per declared key, created by the host inside the injected container.** The order
   of those containers is the projection (§2.5). A row asserts the count is **exactly**
   `keys.length` once rendered (`M-1`).
4. **The caller may place its OWN content inside a container** — that is what `containerFor(key)`
   exposes the container **for**. **The host does not fill it.** *(This is the boundary the declined
   publisher half crossed.)*
5. **An empty key set is a valid state**: `keys: []` ⇒ an empty container, `order` `[]`,
   `refused` `[]`, and **no throw when rendering** (§1.10 (f)).
6. **A `null`/absent container is a valid no-op configuration** (§1.10 (f) — *"a `null`/absent
   container ⇒ every operation a no-op with a valid state"*). It is **NOT a refusal** — see `F-6`.

### 2.4 Own-node ownership — the exact rule (the `V-7` hard row, in this unit too)

1. **The host owns exactly the nodes it placed, and exactly the containers it created.**
2. **On a `remove`/replacement/`dispose`, it removes exactly those** — **and nothing else.**
3. **FOREIGN SIBLINGS ARE NOT TOUCHED.** A foreign sibling is any child of the injected container
   (or of a container) that the host did not place/create. **The hard row: a foreign sibling
   survives two re-renders as the SAME element (`toBe`)** (`M-7`). **`V-7`'s contradiction —
   `SCH-9` #2's "publish replaces the element" versus `SCH-11` #1's foreign-sibling-survives — is
   resolved by this rule and stays a hard row in BOTH units** (§2.2; §1.10 (c)).
4. **A node supplied for a key is the node the caller created; the host never clones or re-creates
   it**, and `placed`-by-reference is asserted against the exact object (`I-6`).
5. **`dispose()` removes the CONTAINERS the host created, and does NOT destroy the caller's
   nodes.** A caller node that was inside a host container is **detached with its container but not
   destroyed**: the caller still holds the object. **A row asserts the node object survives
   `dispose()` and that the host retains no state** (`M-13`, `I-5`). **The choice is deliberate and
   is a contract decision**: destroying caller nodes would be the same ownership overreach as
   authoring their content.
6. **A node moved from one declared key to another is removed from the first container and placed in
   the second** — one node, one key, one container at a time. A row asserts the first container no
   longer holds it (`M-9`).

### 2.5 Order-and-attributes as PROJECTION

1. **`orderOf(key)` is the container-ordering policy; it is INJECTED.** Omitted ⇒ the **supplied
   `keys` order**.
2. **`setOrder(keys)`** sets the projected container order. Keys **not declared** and **duplicate**
   keys in `keys` are **ignored**; the projected order is **exactly** the declared key set, once
   each (`I-7`).
3. **Ordering is a projection of the caller's order — DOM order is never the authority**
   (§1.10 (e)); an order change performs **zero graph ops**. **⟶ RULED 2026-09-27 (`§7a` item 9,
   the `§7a` RULING pass; the as-written clause is kept visible and is NOT weakened): the clause
   makes a claim about the PROVIDENT GRAPH, while `M-3`/`P-SH-IM-1` make the observable claim
   about the SHIM TREE — and on a plain reading the two contradict (*an order change mutates the
   tree*). The ruling is the LAYER: **on the node/`[T]` layer the observable is the CHILD
   SEQUENCE** — the injected container's host-created containers read in child order, which is
   what `M-3` and `P-SH-IM-1` assert, element by element, by reference (`toBe` per index) — while
   **the "zero graph ops" half is a STATIC source assertion (the `S-7` class) — NOT a `[T]` state
   claim and NOT a `[U]` measurement: `§4.4`'s `S-7` asserts it over the module's source (no
   `dispatch`/`op`/`applyCommand`/`load` call, no import from `src/renderer/**`), and it must NOT
   be asserted from a node-suite green, nor moved onto the optional `[U]` leg as though a real-DOM
   run measured it.** There is no graph
   seam in this unit and none may be added (no spy, no hook, no injection point — `S-7`), so a
   `[T]` row asserting "zero graph ops" is a **scope violation**, not a stronger row.**
4. **`classNameOf`/`attributesOf` values are applied VERBATIM to caller-created nodes.** The host
   **validates nothing, defaults nothing, prefixes nothing, and normalizes nothing.** A `null`/
   `undefined` return means **no write for that field** (not an empty-string write) — a row asserts
   the distinction (`M-5`/`M-6`).
5. **Attribute application order is the array's order**, and a later entry for the same name wins
   (the shim's `setAttribute` is last-write-wins, `src/shared/dom-shim.ts:30-39`, read). A row
   asserts the final value (`M-6`).

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** real-DOM `ui` leg. Every row is
a **contract row** for the TestWriter; **none is a measurement this pass took.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **M-1** | **Declared keys ⇒ one container each, in `keys` order** | `createSlotHost({ container, keys: ['a','b','c'] })`; `render()` | `ok === true`; `order === ['a','b','c']`; the injected container's children are **exactly three** host-created elements, in that order; `containerFor('b')` is the second; each container holds **no text and no caller node yet**; `placed` `[]`. **⟶ RE-PINNED 2026-09-27 (`§7a` item 7, the `§7a` RULING pass — the drive is UNCHANGED and nothing is weakened): "is the second" is asserted by the TWO CAN-FAIL OBSERVABLES named under `F-7`'s table — `containerFor('b')` `toBe` the injected container's `children[1]` (reference identity with the caller-supplied container's child, observed as a per-step child-reference sequence) AND the same object on a second `containerFor('b')` call, with `containerFor('a')`/`containerFor('c')` as distinct objects (`!==`) — because "is an element" is TRUE BY CONSTRUCTION on the `unknown \| null` return type and cannot fail.** **⟶ AMENDED 2026-09-27 (the architect's option-(a) ruling on the container source; `ADV-SH-1`): the containers this row observes COME FROM THE INJECTED `containerFactory`** — the three containers are the three values the factory returned for `'a'`/`'b'`/`'c'`, the host creates none of them itself, and it reads no ambient global to obtain one (`§2.1`'s container-source clause, `§2.2` prohibition 2). **The reference-identity observables above are UNCHANGED** — `containerFor('b')` is still `toBe` the injected container's `children[1]`, and per-key identity across two calls is still asserted — **but the drive gains the seam: the harness passes `containerFactory`, and a host that ignores it (or falls back to a realm-created element) FAILS this row.** | `[T]` |
| **M-2** | **Omitted `orderOf` ⇒ the supplied key order** | M-1, no `orderOf` | `order` is exactly `keys`' order; **no sorting occurs**; prohibition-3 row | `[T]` |
| **M-3** | **`orderOf`-projected container order** | `orderOf: (k) => ({a:2,b:0,c:1})[k]` | `order === ['b','c','a']`; the injected container's child sequence matches | `[T]` |
| **M-4** | **`orderOf` ties keep the supplied key order (stability)** | two keys with equal `orderOf` values | relative order is the supplied order; **no invented tiebreak** (prohibition 3). **A row pins it so a later pass cannot "stabilise" differently without amending this clause** | `[T]` |
| **M-5** | **`setNode` places the caller's node — reference identity** | `setNode('a', n)` where `n` is caller-created | `ok === true`; `placed` contains `'a'`; `containerFor('a')`'s children include `n` **by reference** (`toBe`); `removed` `[]` | `[T]` |
| **M-6** | **Verbatim class + attribute application (and last-write-wins)** | `classNameOf: () => 'caller-class'`; `attributesOf: () => [{name:'data-k', value:'v'}, {name:'data-k', value:'w'}]` | the node's class is **exactly** `caller-class`; its attribute store holds `data-k = "w"` (last write wins); **the host added no attribute of its own** — a row asserts the attribute-name set is exactly `{data-k}` plus whatever the caller's node already had | `[T]` |
| **M-7** | **FOREIGN SIBLINGS SURVIVE (the `V-7` hard row)** | Append two caller-created foreign elements to the injected container; `render()` **twice** | `ok === true`; **both foreign elements are the SAME objects after the second render** (`toBe`); they were never removed or re-appended; their relative order and positions are unchanged | `[T]` |
| **M-8** | **Empty key set** | `keys: []`; `render()` | `ok === true`; `order` `[]`; `placed` `[]`; `refused` `[]`; the injected container is **unchanged**; **nothing throws** (§1.10 (f)) | `[T]` |
| **M-9** | **A node moves between declared keys** | `setNode('a', n)` then `setNode('b', n)` | `containerFor('a')` no longer holds `n`; `containerFor('b')` holds `n` **by reference**; `order` unchanged; `placed` contains `'b'` and not `'a'` | `[T]` |
| **M-10** | **Replacement: the same key, a different node** | `setNode('a', n1)` then `setNode('a', n2)` | `n1` appears in `removed`; the container holds `n2` (by reference); `'a'` still in `order` **once** | `[T]` |
| **M-11** | **A `null` class/attribute return is NO WRITE** | `classNameOf: () => null`; `attributesOf: () => undefined` | the node's attribute set is **unchanged**; **no empty-string attribute and no empty class are written** (prohibition 3's boundary) | `[T]` |
| **M-12** | **`remove` keeps the container, drops the node** | `remove('a')` after `setNode('a', n)` | `n` in `removed`; `'a'` still **declared** (`keys()` still contains it, `containerFor('a')` still an element) and still in `order`; the node is gone from the container | `[T]` |
| **M-13** | **`dispose()` removes the host's containers and destroys no caller node** | declare 3, place 3, `dispose()` | no throw; the injected container holds **only** the foreign siblings it held before; the three nodes **still exist as objects**; `keys()` `[]`; a second `dispose()` is a no-op; **no state retained** (`I-5`) | `[T]` |
| **M-14** | **A `null`/absent/ malformed container ⇒ every operation a no-op with a valid state** | `container: null` / `undefined` / `{}` / `42` / `'div'`; then `setNode`/`setOrder`/`remove`/`render`/`keys`/`containerFor`/`dispose` | **no throw for any call**; `keys()` still reports the **declared** keys; `order` still valid; `placed` `[]`; `containerFor(k)` returns `null`; `ok === true` for valid inputs (nothing refused — the host simply has nowhere to place) **⟶ RECONCILED 2026-09-27 (the §7a.1 item-2 RULING pass read against the per-method table under `§3.2 F-7`; this cell is the LAST clause of the contradiction the TestWriter's remand pass found, and the as-written trigger list + `ok === true` clause above are kept visible and are NOT deleted): the five trigger values `null` / `undefined` / `{}` / `42` / `'div'` are TWO CONTAINER STATES, not one — `null` and `undefined` are the ABSENT container (`§3.2 F-6`: no refusal, `refused` `[]`, `ok === true`, and THIS CELL's own `ok` clause is confirmed for them), while `{}` / `42` / `'div'` are the PRESENT-BUT-UNUSABLE container (`§3.2 F-7`: `ok === false`, one refusal per attempted node write of `code === 'container-not-appendable'` — which is the EMITTED code, never `'no-container'`, `F-11`). THE TABLE UNDER `§3.2 F-7` GOVERNS, because it is the later and explicit text (§7a.1 item 2, the ruling that stopped `F-6` and `F-7` contradicting); THIS ROW's `ok === true` clause therefore binds the ABSENT half ONLY, and driving `{}` / `42` / `'div'` with `setNode` / `render` — or a `remove` on a key whose node the host owns (a branch no drive of this row can reach, because nothing is ever placeable on that shape: `placed` is `[]` throughout) — asserts `ok === false` and `code === 'container-not-appendable'` against column (b) of that table, while `setOrder` keeps `ok === true` on BOTH container states and a `remove` with no host-owned node is a no-op with `ok === true` on BOTH (column (b) is explicit that both are write-free, so this row's original seven-method list reads against the table METHOD BY METHOD and is never collapsed into one `ok` for all seven). WHAT THIS ROW STILL ASSERTS FOR ALL FIVE VALUES, class-commonly: no throw for any call; `keys()` still reports the DECLARED keys; `order` still valid; `placed` `[]`; `containerFor(k)` **`null` by value** (`toBe(null)`, never `undefined`) for every key; and every refusal the shape produces is the EMITTED `'container-not-appendable'`, never `'no-container'`. This is a RECONCILIATION of one contradiction, not a re-scoping: the drive keeps all five values, and no other clause of this row or of `§3.2` is weakened.** | `[T]` |
| **M-15** | **`setOrder` with undeclared/duplicate keys ignores them** | `setOrder(['a','a','nope'])` | `ok === true`; `refused` `[]`; `order` is the declared key set in the requested relative order (here `['a', …rest]`) | `[T]` |
| **M-16** | **`render()` is idempotent** | `render()` twice with unchanged state | the second call: `removed` `[]`, `refused` `[]`, **no child re-append**, and the same `order`/`placed`. **⟶ THE OBSERVABLE IS NAMED 2026-09-27 (`§7a` item 8, the `§7a` RULING pass; the clause is kept visible and is NOT weakened): "no child re-append" is NOT observable from values alone, so the row asserts the PER-STEP CHILD-REFERENCE SEQUENCE of the injected container — the child list captured before the second `render()` and after it, each index compared by REFERENCE (`toBe`), which is what makes a re-append (same node, removed and appended again) FAIL — plus each container's `children` array reference-identical element-by-element. A host that re-appends its containers on an unchanged render FAILS this row** (`P-SH-IM-3`'s strategy is the register's home for the same observable). | `[T]` |
| **M-17** | **The refusal listener is notified once per refusal, in order** | a call producing two refusals with `refuse` injected | `refuse` called **exactly twice**, with the two refusal objects in **encounter order**, each `deepEqual` to its entry in the returned `refused`; **its return value is ignored** (a row returns a rejected promise and asserts no effect) | `[T]` |
| **M-18** | **Allocation of the key set to the CONTAINER, not to the caller's node** | `keys: ['a','b']`, only `'a'` placed | **both** containers exist (`containerFor('b')` is an element); `placed === ['a']`; `order === ['a','b']` — the two fields are defined differently and a row asserts the difference. **⟶ RE-PINNED 2026-09-27 (`§7a` item 7, the `§7a` RULING pass — the drive is UNCHANGED): `containerFor('b')` is asserted as the SECOND can-fail observable under `F-7`'s table — an OBJECT distinct from `containerFor('a')` (`!==`) and `toBe` the injected container's `children[1]` — never as "is an element" (true by construction on `unknown \| null`).** **⟶ AMENDED 2026-09-27 (the architect's option-(a) ruling on the container source; `ADV-SH-1`, same amendment as `M-1`): both containers COME FROM THE INJECTED `containerFactory`** (one call per declared key, the returned value IS that key's container), so `containerFor('b')` is the **factory's** value for `'b'` observed as the injected container's `children[1]`, not a realm-created element. **The reference-identity observables and the `!==`/`toBe` assertions are UNCHANGED.** | `[T]` |
| **M-19** | **`render()` does NOT re-append a caller-detached NODE — the detach is PERMANENT** *(⟶ ADDED 2026-09-27, the adversarial pass; judgment call `#17`, which the pass ruled `CONTRACT-CONSISTENT` **but must be pinned** — the sibling unit pinned its own equivalent as `M-21`)* | `setNode('a', n)`, then the **caller** detaches `n` from its container (`n.remove()`), then `render()` (any number of times), with NO `remove(key)` call | **no throw** for any call; `render()` **returns its declared result** and **does NOT re-append `n`** — for that key the caller's detach is **PERMANENT** (`render()` is **not an undo**); `'a'` stays **declared** (`keys()` still reports it, `containerFor('a')` is still the container) and still in `order`, `placed` may still report `'a'` (the host's ownership record is unchanged by a caller detach — `I-7`), and the injected container's child-reference sequence is **unchanged by the second `render()`** (`M-16`'s observable, `toBe` per index). **Assertion shape: the row FAILS for a host that re-appends the detached node on any `render()`** — assert the container's children **do not contain `n` by reference** after each `render()`, and that the tree is otherwise reference-identical. **This is the NODE half of the container/node asymmetry `ADV-SH-12` records** (a caller-detached **container** IS re-appended by the host's order write, because it is one of the host's own containers; a caller-detached **node** is not, because the host keeps no right to re-place a node the caller took back). **Scope: this row pins the `render()` policy ONLY** — `removed`'s membership for a detached node is pinned by `F-9` and is scoped to the `remove(key)` call; no `remove(key)` call ran in this row's drive, so this row asserts **nothing** about `removed` (`§7` item 9's surviving half). | `[T]` |

### 3.2 Documented fail-states / refusals (each is a typed `code`, and each is a row)

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **UNDECLARED KEY — the contract's central refusal** | `setNode('nope', n)` / `remove('nope')` | **no throw**; `ok === false`; **one** refusal with `code === 'unknown-key'` and the **exact key string** as supplied; **no container is created** (the injected container's child count is unchanged); `order` unchanged; `placed` unchanged; `refuse` notified once | `[T]` |
| **F-2** | **A malformed node** | `setNode('a', null)` / `undefined` / `42` / `'x'` / `{}` | **no throw**; `ok === false`; one refusal with `code === 'malformed-node'`; **the key's prior node is left as it was** (a malformed input never removes a valid placement — the row pins this) | `[T]` |
| **F-3** | **A key that is not a string** | `setNode(42, n)` / `setNode(null, n)` / `setNode('', n)` | **no throw**; `''` and non-strings are refused under `code === 'unknown-key'` (they cannot be declared keys, since `keys` is a string array and `''` **may** be declared — **so the row is: a declared `''` works, an undeclared non-string is `unknown-key`**, and a row pins both halves). **⟶ ADDED 2026-09-27 (`§7a` item 5, the `§7a` RULING pass — the row's drive and code are UNCHANGED; the assertion the widened field makes derivable is added here): the refusal's `key` field holds the supplied value VERBATIM — `42` for `setNode(42, n)`, `null` for `setNode(null, n)`, `''` for `setNode('', n)` — with NO `String(...)`, NO trim and NO coercion, asserted by `toBe`/`toEqual` against the exact supplied value (`§2.1`'s widened `SlotHostRefusal.key`). A `42`-keyed refusal whose `key` reads `'42'` FAILS this row.** | `[T]` |
| **F-4** | **An empty/malformed `keys` option** | `keys: []` (valid — `M-8`) / `keys: null` / `keys: 'a,b'` / `keys: [1,2]` | `keys: []` is **valid** (`M-8`); the malformed forms ⇒ **no throw**, an **empty declared set**, and any `setNode` call is `unknown-key`. **`createSlotHost` itself never throws** | `[T]` |
| **F-5** | **A `containerFor` on an undeclared key** | `containerFor('nope')` | returns **`null`** — **this READ is not a refusal** (it creates nothing and changes nothing); a row pins the asymmetry with `F-1` so a later pass does not "unify" them. **⟶ ADDED 2026-09-27 (`§7a` item 7, the `§7a` RULING pass — the `null` and the non-refusal are UNCHANGED): the VALUE here is pinned as `null` (and `undefined` does NOT satisfy the row), and it is one of the two observables that CAN fail on the `unknown \| null` return type — see the observables clause under `F-7`'s table.** | `[T]` |
| **F-6** | **A `null`/absent container is NOT a refusal** | `M-14`'s configuration — **READ, SINCE 2026-09-27, AS `M-14`'s ABSENT HALF ONLY** (`container: null` / `undefined`; the same row's `{}` / `42` / `'div'` drives are `F-7`'s unusable class and were never this row's trigger — see `M-14`'s amended cell and the per-method table below) | `refused` is `[]`, `ok === true` — **the malformed-container class of `U-MOUNTGUARD`'s `mount-not-appendable` does NOT apply here**: this host's absent container is a **supported no-op configuration**, while `U-MOUNTGUARD`'s probe **asks a question about a tree**. **The asymmetry is deliberate and recorded so a later pass does not "harmonise" the two.** `container-not-appendable` therefore fires only when a container is **present but refused by the environment** (e.g. an object with no `appendChild`), **not** when it is absent — a row pins both. **⟶ SCOPED 2026-09-27 (`§7a` items 2 and 3, the `§7a` RULING pass — this row's text is UNCHANGED and is NOT weakened): what `F-6` and `F-7` assert per METHOD is the table under `F-7`; `F-7`'s refusal clause is bounded to the RESULT-RETURNING methods, and the READS return their declared shape, never refuse and never throw (`I-8`).** | `[T]` |
| **F-7** | **A present-but-unusable injected container** | `container: {}` (no `appendChild`), `container: { appendChild: 42 }` | **no throw**; **every** operation reports `code === 'container-not-appendable'` **once per attempted placement**, and the host remains in a valid state. **Distinguished from `F-6`** (absent ≠ unusable). **⟶ THE CLASS IS `M-14`'s SECOND HALF (⟶ ANNOTATED 2026-09-27, the `M-14` RECONCILIATION pass; the trigger list above is kept visible and NOT narrowed): `M-14`'s five container drives split into this row's SECOND state and `F-6`'s — `null` and `undefined` are `F-6`'s absent container, while `{}`, `42` and `'div'` are THIS row's present-but-unusable container, so the two rows are driven by the same row and nothing is missing from either trigger list (`§3.1 M-14`'s amended cell carries the split).** **⟶ RULED 2026-09-27 (`§7a` items 2 and 3, the `§7a` RULING pass; the as-written cell is kept visible, not rewritten): "every operation" is SCOPED — the clause applies to the RESULT-RETURNING methods **when they attempt a NODE WRITE** (`setNode`, `render`, and `remove` where the host actually owns a node under that key — *"once per attempted placement"* is read as **once per attempted node write**), and NOT to `setOrder` (result-returning but write-free: `ok === true` on both container states), NOT to `keys()`, `containerFor()` or `dispose()`, which return their declared shape (`readonly SlotKey[]` / `unknown \| null` / `void`), NEVER refuse and NEVER throw. The two rows stop contradicting each other by the per-method table below.** | `[T]` |
| **F-8** | **`classNameOf`/`attributesOf` returning a malformed value** | a non-string class; an attributes array containing a non-object, a missing `name`, or a non-primitive `value` | **no throw**; the malformed entry is **skipped**; `ok` is **not** forced `false` (attribute application is best-effort per entry — **a contract decision**, §7 item 7) — a row pins that the well-formed entries are still applied | `[T]` |
| **F-9** | **A node placed, then detached by the caller, then removed** | caller detaches `n`, then `remove('a')` | **no throw**; the key is no longer `placed`; **no dangling ownership** (`keys()` still shows `'a'` as declared, per `M-12`). *(The `removed` membership for this case is deliberately not pinned: the shim's `remove()` is idempotent at `src/shared/dom-shim.ts:89-96`, read, so the honest contract is "no throw, no dangling ownership" — stated as a decision, §7 item 7.)* **⟶ RULED 2026-09-27 (`§7a` item 6, the `§7a` RULING pass; the parenthesis above is the AS-FILED text and is kept visible): THE MEMBERSHIP IS NOW PINNED — `removed` CONTAINS `n`, BY REFERENCE.** The ruling follows the sibling unit's pin (`docs/specs/listhost.md`'s `F-6`/`M-21` sequence: a node the caller detached and the host then removes **does** appear in `removed`), and the deciding clauses are the ones this row already cites: `§2.1`'s `removed` doc string (*"Every node this call REMOVED (the ones the host had placed), by reference"*) and `§2.4` items 1–2 (*the host owns exactly the nodes it placed*). **The node detached by the caller is still a node the host placed, still in the host's ownership bookkeeping, and the `remove('a')` call is what relinquishes it — so the call that ends the host's ownership of `n` is the call that reports `n` in `removed`**, whether or not the tree still held it. The `remove()` idempotence the as-filed parenthesis names is a **shim detail about the TREE**, not a licence to leave the RESULT's membership undecided: the assertion is `removed` contains `n` by reference (`toBe`), and `§7` item 9's non-pin is superseded on its membership half only. **The detached-node shape with NO `remove()` call asserts nothing about `removed`** (no call ran), so the two halves do not collide: **the membership claim is scoped to the `remove(key)` call.** A host that drops `n` from its bookkeeping without reporting it in `removed` FAILS this row. | `[T]` |
| **F-10** | **A throwing caller callback** | `classNameOf` that throws | **This spec does not decide it** — a caller-code throw is not this host's refusal class, and the sources are silent. **The row is a seed for the adversarial pass (`A-5`), which must rule it and record the ruling here** (§7 item 8). **⟶ RULED 2026-09-27 (`§7a` item 4, the `§7a` RULING pass; the as-filed cell is kept visible and is NOT deleted): THE FOUR SEAMS ARE DECIDED, WITH NAMED SAFE DEFAULTS — `§2.1`'s totality-boundary clause is the normative home and its per-function table gives the default and the observable.** **Consequence, stated plainly because it CHANGES what this row asserts:** this row is **`CONTRACT-AMENDED`** — it was *"the spec does not decide it"*, and it is now **a normal falsifiable row**: for **each** of the four injected caller functions (`orderOf`, `classNameOf`, `attributesOf`, `refuse`) the host **catches** the throw, **continues with the named safe default**, and **returns its declared result** — the method does not throw, `refused` gains **no** invented code (and no `'no-container'`), and the caller-code failure is **never** reported as a contract refusal. The four defaults: a throwing `orderOf` ⇒ **the supplied `keys` order** (exactly the omitted-`orderOf` fallback, `§2.5` item 1); a throwing `classNameOf` ⇒ **no class write for that node** (`M-11`'s `null`-return rule); a throwing `attributesOf` ⇒ **no attribute write for that node** (`M-11`'s rule, with `F-8`'s per-entry best-effort unchanged); a throwing `refuse` ⇒ **swallowed**, with the refusal **already recorded** in the returned `refused`. **The totality universal is bounded by this shape, in these words: *"NO method of this host throws — for any input shape — and `a throwing caller callback is excluded`"*** — and `P-SH-TP-1`'s statement carries the **same** boundary words (`§5.5.1`). **`§3a A-5`'s disposition follows** (see the amended seed). | `[T]` |
| **F-11** | **`'no-container'` is DECLARED BUT NEVER EMITTED — the negative the code domain needs** | **every** drive of `I-8`'s deterministic table **and** every one of `P-SH-TP-1`'s `20` pool shapes under its `60` pinned-seed draws, **plus `F-12`'s five factory drives (⟶ ADDED 2026-09-27, the architect's option-(a) ruling — the new seam adds a container-SOURCE state and must be inside this negative's enumeration)**, plus the absent-container and unusable-container configurations (`M-14`/`F-6`/`F-7`) and a valid configuration as the control | **no throw**; **NO call ever produces a refusal whose `code === 'no-container'`** — the assertion is over the concatenation of every returned `refused` list in the enumeration (plus every refusal passed to an injected `refuse` listener, `M-17`): **zero entries carry either `'no-container'` or any code outside the three emitted members**. The control half proves the assertion is not vacuous: the **same** enumeration **does** observe `'unknown-key'` (`F-1`/`F-3`/`F-4`), `'malformed-node'` (`F-2`) and `'container-not-appendable'` (`F-7`) — **so a host that emitted nothing at all, or emitted a fifth code, fails this row.** *(Ruling and reason: `§2.1`'s refusal-code-domain clause. `§3.2`'s id set therefore reads `F-1`..`F-11`: this row is **appended after `F-10`**, nothing is renumbered, and it is the **negative row** the ruling of `§7a` item 1 requires — a falsifiable assertion that the code domain is exactly the emitted three.)* | `[T]` |
| **F-12** | **NO FACTORY — the container source is absent, or present-but-broken** *(⟶ ADDED 2026-09-27, the architect's option-(a) ruling on the container source; appended AFTER `F-11`, RE-PINNING nothing and renumbering nothing — `§3.2`'s id set now reads `F-1`..`F-12`)* | **five drives, `containerFactory` supplied five ways:** **(1)** omitted entirely; **(2)** `undefined`; **(3)** present but **not callable** (`containerFactory: 42`, `'div'`, `{}`, `null`); **(4)** callable but **THROWING**; **(5)** callable, returning an **unusable value** (`{}` with no `appendChild`, `{appendChild: 42}`, `42`, `'div'`, `null`, `undefined`). Drive each through **all seven methods** (`setNode` on a declared key with a valid node, `setNode` on an undeclared key, `remove` on a declared key, `setOrder`, `render()`, `keys()`, `containerFor(k)`, `dispose()`) with a **valid** injected `container` (a shim mount element) so the mount is NOT the reason nothing is placed | **THE EXISTING `F-6`-CLASS DEGRADATION, STATED EXPLICITLY — and it is the SAME behaviour for all five drives: no throw for any call; every operation is a valid no-op with a valid state; nothing is placeable** (`placed` `[]` for every result) — `refused` `[]` and **`ok === true`** for every valid input, `keys()` still reports the **declared** keys in the projected order, `order` is still valid and reflects `setOrder`, and **`containerFor(k)` returns `null` for every key** (declared, broken-factory and undeclared alike — `toBe(null)`, never `undefined`); `dispose()` is `void`, idempotent and retains nothing (`I-5`). **The two negatives that make the row falsifiable:** **(i) NO container-state refusal is produced — in particular `'no-container'` is NOT emitted** (`F-11`'s negative; a host that invented `'no-container'` for this shape FAILS, and one that invented `'container-not-appendable'` for drives (1)–(5) fails the `F-6`-class reading, because the CONTAINER is not present-but-unusable here — the **source** is absent); **(ii) NO container is manufactured by any other means** — the injected container's child count is **unchanged from before the call** for every drive, and **a host that falls back to a realm read (an ambient global, or an assembled/computed member lookup) to create a container FAILS this row and `§2.2` prohibition 2's tightened row** (`ADV-SH-1`). **Drive (4) is the fifth seam of `§2.1`'s totality-boundary table** — a throwing factory is CAUGHT, never re-thrown, and never becomes a refusal of its own kind (there is no code for "the factory threw"). *(Reason this row exists: the seam is OPTIONAL and the evasion was reachable, so the degradation must be a row rather than an inference — `ADV-SH-1`. It is a `§3.2` row and **NOT** a change to `P-SH-TP-1`'s pool: that register row's `20` shapes are unchanged, and `§5.5.1` records why a no-factory shape is not added there.)* | `[T]` |

**⟶ THE PER-METHOD TABLE — WHAT `F-6` AND `F-7` EACH ASSERT, METHOD BY METHOD (ADDED 2026-09-27, the
`§7a` RULING pass, `§7a` item 2).** `F-6` (absent container ⇒ `ok === true`, **not** a refusal) and
`F-7` (unusable container ⇒ `code === 'container-not-appendable'`) are **both kept visible above**;
this table is the **ruling that stops them contradicting**, and it is now the contract for the seven
methods. **Both container states are read as "the host has no USABLE container to place into"** —
the difference is what the contract says about each, and **the unifying clause is: an operation that
attempts NO node write to a container never produces a container-state refusal.**

| Method | Returns | (a) **ABSENT / `null` container** (`F-6`, `M-14`) | (b) **PRESENT-BUT-UNUSABLE** container (`F-7`) | (c) **NO FACTORY — absent, non-callable, or returning an unusable value** (NEW `F-12`; ⟶ ADDED 2026-09-27, the architect's option-(a) ruling on the container source) |
| --- | --- | --- | --- | --- |
| `setNode(key, node)` | `SlotHostResult` | **no throw**; **no refusal**; `refused` `[]`; **`ok === true`**; `placed` `[]`; the valid input is simply not placeable | **one refusal per attempted placement**, `code === 'container-not-appendable'`; **`ok === false`**; placed `[]`; state valid | **THE DEGRADATION, IDENTICAL TO (a)**: **no throw**; **no refusal**; `refused` `[]`; **`ok === true`**; `placed` `[]`; nothing is placeable and **no `'no-container'` is emitted**. **(c) is an absent container SOURCE, not a present-but-unusable container** — so it is `F-6`'s class and **never** `F-7`'s, even when the factory is present-but-broken |
| `remove(key)` | `SlotHostResult` | **no throw**; **no refusal**; `ok === true`; `placed` loses no key (nothing was ever placed) | **one refusal** `code === 'container-not-appendable'` **when the host actually owns a node under that key** — the operation relinquishes an ownership the host cannot express in the tree, and `F-7`'s "once per attempted placement" is the per-call refusal for that key's node; **`ok === false`**; state valid. **A `remove` on a key with NO host-owned node is a NO-OP on this shape too** (`ok === true`, `refused` `[]`) — the unifying clause decides it: the call attempts **no node write**, because there is no node whose ownership the host can relinquish | **identical to (a)**: **no refusal**; `ok === true`; the key stays declared. **No node is ever host-placed on this shape** (`placed` `[]` throughout), so no `remove` can reach the `F-7` refusal branch |
| `setOrder(keys)` | `SlotHostResult` | **no throw**; **no refusal**; `ok === true`; the **projected order is updated and reported** (`order` reflects it — the projection is the host's own state, not the tree) | **no refusal; `ok === true`; the projection is updated**: `setOrder` attempts **no node write** (`§2.5` item 1, `M-3`) and therefore produces **no container-state refusal** — the containers, if any are ever creatable, are reordered by a later `render()`. **This is the method the "unusable ≠ refusal for every operation" scoping exists for** (`§7a` item 3): it RETURNS a `SlotHostResult`, so an unqualified *"the four result-returning methods refuse"* would wrongly include it | **identical to (a)**: **no refusal; `ok === true`; the projection is updated and reported** — write-free, so the unifying clause gives it the same result on all three container-SOURCE states |
| `render()` | `SlotHostResult` | **no throw**; **no refusal**; `ok === true`; nothing is written; `order`/`keys()` valid (`M-14`) | **one refusal per key the call attempts to place**, `code === 'container-not-appendable'`; **`ok === false`**; `placed` `[]`; the host stays valid (`M-16`'s idempotence half still holds) | **identical to (a)**: **no throw**; **no refusal**; `ok === true`; nothing is written; `order`/`keys()` valid, and `M-16`'s idempotence half holds. **The host may not manufacture a container to write into** — a `render()` that creates one by any other means (a realm read, an ambient factory) FAILS `F-12` and `§2.2` prohibition 2's tightened row |
| `keys()` | `readonly SlotKey[]` | **no throw**; returns the **declared** keys in the projected order — **a read has no `ok` and no `refused`** | **no throw**; returns the **declared** keys in the projected order — **a read never refuses and never throws**; there is no `ok` to report and none is asserted (`I-8`'s scope clause) | **identical to (a)**: **no throw**; returns the **declared** keys in the projected order — the factory's absence never changes the DECLARED key set (`I-2`) |
| `containerFor(key)` | `unknown \| null` | `null` for **every** key (**no container was created**); **not a refusal** (`F-5`'s asymmetry) | `null` for **every** key (**no container was created** because the environment refused the container); **not a refusal** — and **never `undefined`** | **identical to (a)**: **`null` for every key** — including a declared key, a key the caller's broken factory was called for, and an undeclared key; **not a refusal**, and **never `undefined`** |
| `dispose()` | `void` | **no throw**; idempotent; no state retained (`M-13`, `I-5`) | **no throw**; idempotent; no state retained — it removes the containers **the host created**, and on this shape it created none | **identical to (a)**: **no throw**; idempotent; no state retained — no container was ever obtained, so none is removed, and (per `ADV-SH-3`'s contract decision) the host's parent bookkeeping is module-local and leaves **no expando `parent` marker** on any caller node — **⟶ CORRECTED 2026-09-27 (the unit's documentation review, finding `F-06`; the as-written half of this cell is KEPT VISIBLE and its `WeakMap` implication is WITHDRAWN as a remedy): the host keeps NO parent bookkeeping AT ALL** — the marker is **DELETED, not replaced** (nothing ever read it), because a module-local registry is excluded twice over: `§4.4 S-4` bans the bare `WeakMap`/`WeakSet` token and `§2.2` prohibition 4 admits only the per-key ownership bookkeeping + the created containers as state.** **What SURVIVES of this cell verbatim is the half it actually asserts: no expando `parent` marker on any caller node** |

**⟶ THE `containerFor` OBSERVABLES — THE ANTI-VACUITY CLAUSE (`§7a` item 7, the same pass; the
`ADV-LH-5` class).** `containerFor` is typed `unknown \| null`, so **"an element" is true by
construction and a row asserting it cannot FAIL**; `M-1` and `M-18` say *"`containerFor('b')` is the
second"* / *"`containerFor('b')` is an element"*, which is exactly the over-strength phrasing. **The
two observables that CAN fail, and the ones the rows are re-pinned to, are:**

1. **REFERENCE IDENTITY WITH THE INJECTED CONTAINER'S CHILD** — `containerFor(k)` `toBe` the element
   observed at the projected index in the injected container's child sequence (**the per-step
   child-reference sequence**, `M-3`/`I-10`). This fails for a host that returns a wrapper, a copy,
   the key string, or a different container.
2. **PER-KEY IDENTITY ACROSS TWO CALLS** — `containerFor(k)` **twice** returns the **same object**
   (`toBe`), and two **different** declared keys' `containerFor` results are **different** objects
   (`!==`). This fails for a host that creates a new container per call, or returns one shared
   container for every key.

**And the `null` half is pinned by VALUE**, so *"returns `null`"* is not confused with `undefined`:
`F-5`'s undeclared-key read and both container-state columns above assert **`null` exactly**
(`toBe(null)` / `=== null`), **never** `undefined` and never "falsy". **No row asserts
"`containerFor` is an element" as its only claim**; where a §3 row carries that phrasing, it is read
as *"an object that is the host's container for that key, reference-identical per observables 1/2"*.**

**⟶ NO NEW SHIM MEMBER IS NEEDED FOR EITHER OBSERVABLE** (`§4.4 S-2`, `H-r5`): the shim exposes
`children` (`src/shared/dom-shim.ts`, read) and the assertion is by reference (`toBe`), not by a
predicate such as `instanceof`/`tagName` — which the shim does not model (`:1-3`). **A `[T]` row may
not be written against a "is a DOM element" predicate.**

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here |
| --- | --- | --- |
| **I-1** | `ok === (refused.length === 0)` **always** | No "ok with refusals" state exists |
| **I-2** | `order` is **exactly** the declared key set, each key **once**, in some order | §2.5 item 2 |
| **I-3** | **Foreign siblings are reference-identical before and after every call** — in the injected container **and** inside every host container | The `V-7` hard row as an every-state invariant |
| **I-4** | The host authors **no content**: no `textContent` write, no `className` **value** of its own, no `role`/ARIA attribute of its own, no style, no `publish`-shaped method | Prohibitions 1/2, made falsifiable (static + state rows). **⟶ AMENDED 2026-09-27 (the architect's option-(a) ruling on the container source; `ADV-SH-1`, HIGH): the CONTAINERS and their children come FROM THE INJECTED `containerFactory`** — the host creates no element of its own and reads no ambient global (no `document`/`window` access ROOTED IN A BANNED TOKEN OR AN ALIAS OF ONE, and no aliased realm) to obtain one, so this invariant now covers the container SOURCE as well as the container's emptiness. **The content-negative half is unchanged** (no text, no class value, no attribute, no style, no `publish`). |
| **I-5** | After `dispose()`, the host retains **no** declared key, **no** container reference, **no** node reference and no other state | Prohibition 4 |
| **I-6** | For every placed key, the container holds the caller's node **by reference** — never a clone | §2.4 item 4 |
| **I-7** | `placed` is a **subset** of `order`, and `order` contains every declared key regardless of placement | `M-18`'s distinction |
| **I-8** | No method throws **for any input** — asserted by a deterministic table (`null`, `undefined`, numbers, strings, arrays, undeclared keys, malformed nodes, an absent container, an unusable container, a detached node) | The refusal contract's boundary. **⟶ SCOPED 2026-09-27 (`§7a` item 3, the `§7a` RULING pass; the as-written cell is kept visible and NOT weakened): no method throws — on that this row and `F-7` never disagreed; what `F-7` added was an `ok === false` for "every operation", which CANNOT be asserted of a READ (a read returns no `SlotHostResult`, carries no `ok` and no `refused`). The scope is therefore stated exactly: `F-7`'s refusal clause applies to the RESULT-RETURNING methods **when the call attempts a node write** (`setNode`, `render`, and `remove` where the host owns a node under that key), while the READS AND `dispose()` — `keys()`, `containerFor()`, `dispose()` — return their DECLARED SHAPE (`readonly SlotKey[]`, `unknown \| null`, `void`), NEVER refuse and NEVER throw — and `setOrder`, although result-returning, is **write-free and therefore never refuses on either container state** (`ok === true`, per the table under `F-7`). Both rows are derivable in that form: `I-8` is the no-throw universal over all SEVEN methods, `F-7` is the refusal table over FOUR.** **And the universal's own bound is `§2.1`'s totality-boundary clause: *"a throwing caller callback is excluded"*** (`§7a` item 4). | The refusal contract's boundary |
| **I-9** | Every `SlotHostResult` array is a **fresh array**; a caller mutating a returned array cannot change host state | Anti-aliasing. **⟶ THE OBSERVABLE IS NAMED 2026-09-27 (`§7a` item 8, the `§7a` RULING pass; the invariant is kept visible and is NOT weakened): freshness is a REFERENCE fact and cannot be observed from values — `toEqual` passes for an aliased array too. The row therefore asserts BOTH halves by reference identity: (1) **the returned arrays are NOT the same array objects across two calls** — `second.order !== first.order`, `second.placed !== first.placed`, `second.removed !== first.removed`, `second.refused !== first.refused` (and likewise for two results from different methods); and (2) **the mutation half** — mutating a returned array (`push`/`sort`/index assignment) does NOT change the host's state, asserted by re-reading `keys()`/a second call and observing the pre-mutation values. A host that caches and returns one array per call FAILS half (1) even though `toEqual` would pass** (`P-SH-IM-3`'s strategy is the register's home for the same observable). | Anti-aliasing |
| **I-10** | The number of host-created containers inside the injected container is **exactly** `keys.length` after any successful `render()`, and **never more** — no container is ever created for an undeclared key | `F-1`'s "no silent create", as an invariant. **⟶ SCOPED 2026-09-27 (the `M-14` RECONCILIATION pass; the clause above is kept visible and is NOT weakened — this note makes the scope the clause already carries EXACT, so the count claim cannot be read into an unsuccessful render): "after any successful `render()`" is the invariant's WHOLE domain.** A `render()` that produces a refusal does **not** satisfy this count — on the **present-but-unusable** container (`§3.2 F-7`, column (b)) and on the **no-factory** shape (`F-12`, column (c)) **no container is created at all**, so the count is `0`, `containerFor(k)` is `null` for every key, `placed` is `[]`, and **`I-10` asserts NOTHING about that call's child count** (a row asserting `count === keys.length` on the unusable/refused shape is asserting a clause this invariant does not carry, and its failure is the ROW's, not the host's). **On a successful `render()` the count claim is unchanged and unconditional** (`keys.length`, never more), and the `F-1` half — **no container for an undeclared key** — holds in every state. |

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — proposed **`tests/slot-host.test.ts`** — authored **first**, **RUN**,
and its failing set **REPORTED verbatim** before any implementation. Expected red shape:
`Cannot find module '../src/shared/slot-host.js'` for every row. **There is no host-fix branch for
this unit**: the module does not exist, so the red is purely additive.

### 4.2 Red-set authoring order

1. Write `I-1`..`I-10`, `M-1`..`M-18`, `F-1`..`F-10` **in that order**. **⟶ EXTENDED 2026-09-27
   (the `§7a` RULING pass): the enumeration is now `I-1`..`I-10`, `M-1`..`M-18`, `F-1`..`F-11`** —
   **`F-11` appends after `F-10`** (the `'no-container'`-never-emitted negative row, ruled under
   `§7a` item 1 at `§7a.1`), **nothing is renumbered**, and **`F-10`'s row TEXT is
   `CONTRACT-AMENDED`** (it is now the four-seam safe-default row, `§7a` item 4) while **`F-9`'s is
   amended in its `removed`-membership half** (`§7a` item 6). A red run that authors `F-1`..`F-10`
   from the pre-ruling text would assert the two superseded forms, so **the amended rows are read
   from this spec, not from memory.**
   **⟶ EXTENDED AGAIN 2026-09-27 (the ADVERSARIAL-RECORD pass; the two forms above are kept visible):
   the enumeration is now `I-1`..`I-10`, `M-1`..`M-19`, `F-1`..`F-12`.** **`F-12`** (the NO-FACTORY /
   present-but-broken-factory row, the container-source seam's falsifiable home) **appends after
   `F-11`** — the same "append, never renumber" rule the `F-11` extension states — **and `M-19`**
   (`render()`'s detached-node policy, judgment call `#17`) **appends after `M-18`**. **A red run that
   stops at `F-11`/`M-18` omits the two rows the architect's container-source ruling and the `#17` pin
   require**, so the ids a TestWriter authors are read from `§3.1`/`§3.2` as they stand, never from an
   earlier pass's list.
2. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static
   row that can already be evaluated (e.g. "the module file does not exist").
3. **Then** implement the least code that makes them green.
4. **The property layer is authored IN THIS UNIT'S OWN FILE and RUN AS PART OF THE RED — ⟶ ADDED
   2026-09-27 (the `§5.5` re-derivation pass, under the architect's gate-11 ruling for code-bearing
   units).** `§5.5.1`'s register rows are **not** a separate artifact, a separate pass or a separate
   leg: they are rows of this same `tests/slot-host.test.ts` (§4.1/§5.1), authored **with** the
   `§3` red set and **RUN with it in the same `npm test` red run**, because they ride leg 1
   (§5.2) exactly as the `§3` rows do. **A red run that reports the module-resolution failure for
   the `§3` rows and silently omits the register rows is an incomplete red** — the register is part
   of the unit's red set, and the DONE row's item 10 (`§5.3`) reports the register's per-row
   **attempts-run / held / broken** counts and its strategy ids once the red has actually run.
   **The register's own `YES` markings are execution DESIGN, not results** — this pass ran nothing,
   so a `YES` cell is a promise the red run must keep, and **a row that is `YES` in `§5.5.1` but
   broken when run is a SPEC FINDING**, reported rather than tuned to green.
   **⟶ RECORDED FROM THE EXECUTED RED 2026-09-27 (the `U-SLOTHOST` RED PASS; the item above is
   UNCHANGED and is NOT weakened): the register riding the red run does NOT mean the register's
   `155` attempts all execute in that run.** The register's strategy discipline
   (`§5.5.1`, item 3) is **rows evaluated sequentially, STOP AFTER 5 CONSECUTIVE FAILURES** — so a
   red run of a module-absent unit **is expected to stop early**, and it did: the executed red
   **stopped at `P-SH-IM-1` after `5` of the `155` attempts**, and **the five un-run register rows
   were REPORTED AS FAILURES rather than silently omitted** (a report, not a claim that they were
   driven). **A run that reported all `155` attempts as executed would be the finding, not the
   expectation**, and the `155`/`60`/`20` figures remain the register's **DESIGN** accounting —
   §5.5.1's executed-red block and the status note above carry the measured numbers.
5. **Re-run**, record the green. **No row may be edited to reach green**; a row found wrong is
   corrected **in this spec** first, with the old text kept as `SUPERSEDED`.

### 4.3 What the red is NOT

- **Not a styling/overflow/layout test.** No such criterion exists here.
- **Not a publisher test.** A row asserting a status text, a label, a badge, an `is-*` class, or a
  `publish` method is a **prohibition-1/2 violation** and a `H-r15` re-merge.
- **Not a shim change.** The rows run against the landed shim as-is.
- **Not a real-DOM run.** The `[U]` row is optional and precondition-gated (§5.2).
- **Not assembled-app evidence.** Layer declaration anchor 1.

### 4.4 The stop conditions (binding)

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-1** | A row cannot be falsified on `[T]` | The row moves to §7 as **UNPROVABLE AT THIS LAYER**; it may not be moved to the `[U]` leg silently. |
| **S-2** | A row requires a **new shim member** | **Scope violation** (`H-r5`) — re-write it against the shim's public surface (`children`, `appendChild`, `setAttribute`, `remove`, `className`). **⟶ RE-SCOPED AND STRENGTHENED 2026-09-27 (the architect's option-(a) ruling on the container source; `ADV-SH-1`, HIGH — `CONTRACT-AMENDED`; the sentence above is kept visible and is NOT weakened): the `S-2`-class STATIC SOURCE SCAN now MUST include the ANTI-ASSEMBLY clause.** A source scan for this unit **must reject an assembled/computed member lookup and an aliased/re-derived global reference** (`globalThis['doc' + 'ument']`, `globalThis[name]`, `const g = globalThis; g.document`, a helper returning the realm or a `createElement`-shaped function) **exactly as it rejects the literal token `document`**. **The row is STRENGTHENED, NOT WEAKENED**: it grows a rejection (a token-only scan that passes the assembled form is **unfalsified and incomplete**), no existing rejection is dropped, no shim member is admitted, and the shim's public surface above is unchanged. **The container source the scanned module may use is the INJECTED `containerFactory` seam** (`§2.1`'s container-source clause) — a static row may therefore assert the **absence** of every ambient container source without admitting a new shim member. **⟶ NARROWED 2026-09-27 (the `M-14` RECONCILIATION pass, on the TestWriter's remand report; everything above is kept visible and NOT weakened): the anti-assembly clause is asserted over accesses ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE** — `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`, a helper returning the realm or a `createElement`-shaped function — **and NOT as an unqualified ban on bracket notation, which is not assertable**: a computed access on a **locally constructed object** (or ordinary array indexing such as the module's own `actual[index]`) carries **no** banned token, so a scan cannot distinguish it from a realm lookup, and a blanket `[expr]` ban would fail legitimate code (`§1`'s out-of-scope tightening bullet carries the same bound). **The row loses no rejection by this narrowing** — every shape that reaches an ambient global is still a violation, and the token-only scan this row strengthened is still incomplete without the rooted-computed-access clause.
| **S-3** | A row is only satisfiable by authoring content (a label, a status string, a class taxonomy, a default) | **Violates ruling 1** — the publisher half is declined. **Re-write the row; never the contract.** |
| **S-4** | A row needs to inspect the **real** DOM's class/CSS resolution | The row is `[U]`-only and **optional**; mark it so, do not fake it on the shim. **⟶ RE-SCOPED AND STRENGTHENED 2026-09-27 (the architect's option-(a) ruling on the container source; `ADV-SH-1`, HIGH — same amendment as `S-2`): the `S-4`-class static source scan carries the ANTI-ASSEMBLY clause too.** A scan for **ambient-global vocabulary** (`document`, `window`, `matchMedia`, …) **must reject the assembled/computed member lookup ROOTED IN A BANNED TOKEN OR AN ALIAS OF ONE and the aliased/re-derived global reference**, not only the literal token — which is precisely the shape that evaded the `S-4` word-boundary list (`src/shared/slot-host.ts:130-140`, `ADV-SH-1`). **STRENGTHENED, NOT WEAKENED**: no rejection is dropped, and this row still does **not** admit a real-DOM class/CSS-resolution assertion on the shim — that half stays `[U]`-only, optional and precondition-gated (`§5.2`). **⟶ NARROWED 2026-09-27 (the `M-14` RECONCILIATION pass, on the TestWriter's remand report; the clause above is kept visible and NOT weakened): same bound as `S-2` — the clause is asserted over computed accesses whose receiver is a banned realm token or an alias of one, and NOT as an unqualified ban on `[expr]`, which would fail legitimate dynamic indexing (`actual[index]`, a locally built map read by a variable key) and is not assertable of a LOCALLY CONSTRUCTED object's access at all.** |
| **S-5** | A row requires the host to grow a per-zone/per-pane semantic | **Violates `H-r15`** — this is exactly the named hazard. **Stop and report to the supervisor.** |
| **S-6** | A row is only satisfiable by making `dispose()` destroy caller nodes | **Violates §2.4 item 5** — re-write it. |
| **S-7** | A row needs a **graph seam** to prove "zero graph ops on order change" | There is no seam; the row is **static** (module imports/calls). **Do not add a spy, a hook or an injection point.** |

**⟶ ANNOTATED 2026-09-27 (the `§5.5` re-derivation pass; the table above is the FILING-TIME table
and is kept visible; the stop conditions `S-1`..`S-7` are UNCHANGED and none is added).** Two
things a reader must not have to infer from the table alone: **(1) `S-1` binds every `§5.5.1`
register row as tightly as it binds a `§3` row** — a register row whose assertion cannot be
falsified on `[T]` **is not silently dropped and is not moved to `[U]`**: it is marked in `§7` as
`UNPROVABLE AT THIS LAYER` and reported to the supervisor. **This pass has exactly one such row**
(`P-SH-TP-1`'s caller-callback half, which is bounded to non-callback input shapes because `F-10`
is deliberately unruled — see `§5.5.1`'s honesty block and `§7` item 8). **(2) The pre-ruling
exemption's own stop-condition reading is superseded**: a register row is **never** refused on the
ground that "no PBT harness exists", because `docs/specs/engine-pin.md` `§5.5` executed 7 of its 8
rows with plain deterministic vitest tables and **no new `devDependencies` key** — the gate-11
ruling's decisive point, quoted at `§5.5.0`'s SUPERSEDED banner.

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-D plan**
(§0 ruling 7), (b) the **wave-D order** — `U-MOUNTGUARD`, then `U-LISTHOST`, then this unit, (c) this
spec to exist (**done: this filing**), and (d) a **TestWriter to have RUN and REPORTED the red set**
(`AGENTS.md` item 9). Its `## OPEN` row (D3) stays `BLOCKED` until all four hold — **and its row
carries an extra, permanent prohibition: *"Publisher half stays DECLINED — do not re-merge."***

**⟶ ANNOTATED 2026-09-27 (the `§5.5` re-derivation pass; the FILING-TIME clause above is kept
visible and is NOT rewritten).** Of the four conditions the clause names, **three are DISCHARGED**:
(a) the architect's wave-D go-ahead **was given** (2026-09-27, the `U-MOUNTGUARD` DONE pass);
(b) the wave-D order is **satisfied** — `U-MOUNTGUARD` and **`U-LISTHOST`** are both `DONE`
(`U-LISTHOST` is the ledger's fifth `DONE` row, `docs/next-steps.md`'s `## DONE — U-LISTHOST`), so
**`U-SLOTHOST` is now the next unit in the wave-D order**; and (c) this spec exists (**filed
2026-09-27**, and now carrying `§5.5.1`'s register, which was the **blocking change** named by
`docs/pending.md` §G). **Only (d) is outstanding: a TestWriter to have RUN and REPORTED the red
set.** **The ledger counts are `5 DONE / 15 open` as `U-LISTHOST`'s DONE row left them** (the `4
DONE / 16 open` form the status block above carries is the `U-MOUNTGUARD` pass's). **The permanent
publisher-half prohibition stands unchanged and is the one clause of this section that no future
pass may annotate away.**

**⟶ FURTHER ANNOTATED 2026-09-27 (the `U-SLOTHOST` RED PASS; the filing-time clause and the
`§5.5`-era annotation above are both kept visible, and this note amends no clause of them).** Of the
four conditions, **(d) has moved one step forward and is still not discharged**: a TestWriter has now
**RUN and REPORTED** the red set (§4.1–§4.2, measured numbers at `§5.5.1`'s executed-red block and in
the status note at the head of this file), so the *author-and-run* half of `AGENTS.md` item 9 is
satisfied — but **`AGENTS.md` items 9/3 also require the green to follow, and no Implementer pass has
run: `src/shared/slot-host.ts` does not exist, every red row fails on the module-resolution error, and
this unit is NOT green and NOT `DONE`.** **⟶ SUPERSEDED AS A STATUS CLAIM 2026-09-27 (the unit's documentation review, finding `F-01`; the sentence is KEPT VISIBLE as the RED pass's record): the Implementer pass has since RUN and the green has LANDED — the measured state is the status region's green note at the head of this file — and the unit's `DONE` row is owed by the supervisor.** **The permanent publisher-half prohibition still stands
unchanged, and so does the rest of the filing-time clause.**

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/slot-host.ts` | **NEW** — the seven exports of §2.1 | always |
| 2 | `tests/slot-host.test.ts` | **NEW** — the red set (§4.2) | always |
| 3 | `docs/specs/slothost.md` | this spec — §3a/§3b findings as they land | always |
| 4 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` | the unit's own tracker rows (the supervisor's DONE row; the `U-SLOTHOST` rows the amendment already owes to `docs/pending.md` and `docs/FORKER.md`) | the pass that produces them |

**Outside the scope, always:** `src/renderer/**` · `src/main/**` · `src/shared/dom-shim.ts` ·
`src/shared/types.ts` · every **existing** test file · `package.json` / `package-lock.json` ·
`scripts/**` · `node_modules/**` · `../Preempt-Providence/**`. **This unit changes no existing file
except this spec and the trackers.**

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]** envelope/pure layer | the red (§4) **and** the green. **A green here is envelope/pure-layer evidence, NEVER assembled-app evidence** |
| 2 | typecheck | `npm run typecheck` | **[H]** | the option/result types are part of the contract |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles (`package.json:10`, read) |

**The property layer rides leg 1 — no fourth leg, and no new file (⟶ ADDED 2026-09-27, the `§5.5`
re-derivation).** `§5.5.1`'s register rows are executed by **the same node suite** (`npm test`,
leg 1) in **this unit's own** `tests/slot-host.test.ts` (§4.1/§5.1): the deterministic tables and
the pinned-seed enumeration are ordinary `[T]` rows, authored and RUN as part of the red (§4.2 item
4). **No new leg, no new script, no `package.json` change, no new dependency** — and **no register
row depends on the optional `[U]` row below**, so leg 3 (build) is not the property layer either.
**The DONE row reports the register's per-row attempts/held/broken set, the strategy ids and the
pinned seed `20260927`** (§5.3 item 10).

**⟶ THE HARNESS SUPPLIES THE FACTORY — AND THE LEGS ARE UNCHANGED (ADDED 2026-09-27, the architect's
option-(a) ruling on the container source; `ADV-SH-1`, HIGH).** **Leg 1's harness passes the injected
element factory itself:** the node suite supplies `containerFactory` on every drive that needs a
container, **returning the shim's own element factory's product** (`new ShimElement('div')` via
`mountEl()`/`shimDocument.createElement`, `src/shared/dom-shim.ts:124-143`, read) or any value offering
`appendChild` — **so the module never needs the realm and the harness never relies on the module
reading a global.** **A harness that instead relies on the module reaching `globalThis` (or on
`installShim()`'s global `document`) is testing the DELETED behaviour, not the contract**, and it is
the exact coupling the `ADV-SH-1` remand names. **What this changes about the legs: nothing.** **Leg 1
stays `npm test` (the node suite, `[T]` envelope/pure layer), leg 2 stays `npm run typecheck`
(`[H]`) and leg 3 stays `npm run build` (`[H]`)** — **no leg is added, removed or re-scoped**, **leg 2
still reads `src/**` only** (`tsconfig.json` includes `src/**/*.ts` and excludes `tests`, so a green
leg 2 is evidence about `src/**` and never about this unit's test file or its register tables), and
**leg 1's rows remain `[T]` rows over an injected container and a shim tree** (layer anchors 1/2).
**The factory is INJECTED test input, not a new dependency and not a new file** (`§5.1`'s diff scope
is unchanged). **⟶ ONE PROCESS CAVEAT THAT BINDS THIS LEG (2026-09-27,
surfaced by `docs/pending.md` §G and stated here so no reader over-reads a green):** `npm run
typecheck` (leg 2) **does not read `tests/**` at all** — `tsconfig.json` includes `src/**/*.ts` and
excludes `tests` — so **"typecheck clean" is evidence about `src/**` ONLY and NEVER about this
unit's test file or its register tables.** A register row's type correctness is the TestWriter's own
standalone check, not leg 2's.

**OPTIONAL `[U]` real-DOM identity row — with its named preconditions.** The row: *a caller-created
node placed in a declared slot container, then re-ordered, with the node's **identity** observed in
the **real** DOM across the reorder*. **Preconditions, all named and none assumed:** (a) the `ui`
leg exists and is green for the same built tree, (b) `npm run divergence` is green for that tree,
and (c) for any **attribute-presence**- or **class-presence**-shaped variant, the `H-r10`
extractor, owed to **`U-DIVERGENCE-EXT`** (a real-DOM class/CSS-resolution claim is **not**
derivable from the shim at all — the shim's `className` is a plain string field,
`src/shared/dom-shim.ts:12`, read). **If not taken, no §3 row is weakened.** **A node-suite green is
never a real-DOM green.**

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, in this order:

1. **Unit + wave + status**: `U-SLOTHOST` · wave **D** · `DONE` or the honest non-DONE status.
2. **The wave-D order confirmation**: `U-MOUNTGUARD` and `U-LISTHOST` landed first.
3. **The host/publisher boundary confirmation, explicitly**: *"the publisher/carrier half remains
   DECLINED; this unit adds no `publish` and no content-authoring surface."* **A DONE row that does
   not state this is a review finding** — it is the unit's defining constraint (`H-r15`).
4. **The code/test delta**: the module + the test file, named.
5. **The red, per §4.1** — the failing set as RUN and REPORTED, verbatim.
6. **The three legs' results with layer labels**, plus the explicit sentence that the node-suite
   green is envelope/pure-layer evidence and **not** assembled-app evidence.
7. **The `[U]` row's status**: taken (with its result) or **not taken** (with the reason).
8. **The adversarial pass's findings** (§3a) and the **blind-greens + doc-review records**
   (`AGENTS.md` items 10a/10d, RCA-4/6).
9. **The tracker reconciliation** (`AGENTS.md` items 3/6).
10. **The property register's execution record** (`§5.5.1` — ⟶ ADDED 2026-09-27, the `§5.5`
    re-derivation pass; the nine items above are the FILING-TIME shape and are kept visible): per
    register row, the **id · type · attempts-run · held · broken** counts, **each row's strategy id
    (`S-SH-*`)**, the **pinned seed** (`20260927`), the **stop-after-5-consecutive-failures status**
    (`not triggered`, or `triggered at row …`), the **total attempts** reported **against the `≤400`
    cap** with every row's count reported **against the `≤100` per-row cap**, and the explicit
    sentence that **`P-SH-TP-1` and `P-SH-IM-1` are `YES (bounded)` and are NOT proofs of the
    unbounded universals.** **A DONE row that reports the register as "executed" without these
    per-row counts and strategy ids is a review finding** — the register's `YES` cells are
    **execution DESIGN** (`§5.5.1`), so the counts are the only executed-layer evidence the ledger
    can carry, and a **read-only PBT audit may not accept this spec's table alone** as that
    evidence: it reads the counts here and the TestWriter's tables in the test file.

**⟶ RECORDED 2026-09-27: the `§5.3 → §5.5` numbering gap (there is NO `§5.4`) is DELIBERATE and needs
NO fix — it is recorded here by the `U-LISTHOST` documentation review (`AGENTS.md` item 10d / RCA‑6;
record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑12**).** `§5.3` is the
DONE-row shape and `§5.5` is the property register; **NO clause is missing** — the section simply does
not exist. **Renumbering is FORBIDDEN for citation stability** (the hazard `docs/pending.md`'s §G row
names: `§5.3`/`§5.5` are cited many times across the trackers and the unit's own text). The same skip
exists in `docs/specs/listhost.md` and `docs/specs/projection.md`; **this note renumbers nothing and
changes no clause of this spec.** **⟶ CONFIRMED AND EXTENDED 2026-09-27 (the `§5.5` re-derivation
pass): the gap is UNCHANGED and no `§5.4` is created by this pass either.** `§5.5.0` (added this
pass) is a **sub-heading of `§5.5`**, not a new member of the `5.x` sequence, so the `5.3 → 5.5`
skip still reads exactly as recorded above; **`§5.5.0` sorts before `§5.5.1` and nothing was
renumbered.**

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness) — **2026-09-27: the zero-row exemption is SUPERSEDED; the register is RE-DERIVED below**

> **SUPERSEDED AS-WRITTEN, KEPT VISIBLE (annotate-never-rewrite): the heading above replaced
> `## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**`.**
> **Date: 2026-09-27. Reason: the architect's ruling enforcing the mandatory PBT gate (gate 11) for
> CODE-BEARING units** — recorded in `docs/decisions.md` as the ACTIVE row
> **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`**, whose follow-ups live in `docs/pending.md` **§G**. The
> zero-row exemption is **restricted** to genuinely invariant-free / doc-only / config-only / non-JS
> units, and **this unit is code-bearing** (a pure `src/shared/` slot-host mechanism with seven
> exports, a red set and a test file), so `§5.5` must carry a real **typed register**: `≤8` rows
> typed `P-IM`/`P-SM`/`P-TP`, **never** an `F-` row, **never** a `§6`/`FS-n` citation as a row.
> **The exemption text and its four-cell table are kept verbatim below** (`§5.5.0`, under a heading of
> its own), followed by **`§5.5.1`, the re-derived register that SUPERSEDES them.** **The pilot this
> register models is `docs/specs/listhost.md` `§5.5.1`** (7 typed rows; `§5.5.0` keeping the old
> exemption; `S-LH-*` strategy ids; exhaustive `S₃`+`S₄` permutation tables; a pinned-seed
> hand-rolled 32-bit LCG for the totality row; caps `≤100` attempts/row · `≤400` total ·
> stop-after-5; honest `YES (bounded)` markings). **The `§5.3 → §5.5` gap with no `§5.4` is
> DELIBERATE and non-renumbered** — recorded at the end of `§5.3`, and **`§5.5.0` is a sub-heading
> of `§5.5`, not a new member of the `5.x` sequence** — so this re-derivation renumbers nothing.

> **⟶ SUPERSEDED 2026-09-27 (the architect's gate-11 ruling for code-bearing units; the text is kept
> visible, not rewritten). This `§5.5.0` block is the exemption AS FILED — it is no longer the
> contract's register. What survives of it is its FACTUAL half only: this repo still has no PBT
> harness, and no dependency is added. What is refuted below, with in-repo precedent, is its
> CONCLUSIVE half — *"therefore a register cannot be executed here"*: the ruling's DECISIVE POINT is
> that `docs/specs/engine-pin.md` `§5.5` executed **7 of 8** of ITS register rows with **plain
> deterministic vitest tables and no new devDependency** (`package.json:26-31`, re-read this pass:
> still the five keys `@types/node`, `electron`, `esbuild`, `typescript`, `vitest`) — e.g. its
> `P-IM-2` repeated-call idempotence over a fixed key set and its `P-TP-2` enumerated booleans. **A
> register is therefore executable HERE without a harness**, and this unit's own three
> quantifications are finite or seed-pinnable. `§5.5.1` is the re-derived register; the replacement
> of each cell below is itemized in its change summary.**

### 5.5.0 THE SUPERSEDED ZERO-ROW EXEMPTION — kept verbatim (the block `§5.5.0` names)

**⟶ HEADING ADDED 2026-09-27 (the `§5.5` re-derivation pass).** The superseded exemption had **no
heading of its own** — it lived as the body of `## 5.5`, identified only by prose. **This heading
renumbers NOTHING**: `5.5.0` sorts before `5.5.1`, it is the file's own convention for this block
(`### 5.5.1` is the sibling form), and `## 5.5`'s id is untouched. It also does **not** collide with
the `§5.3 → §5.5` numbering-gap note: that gap is the **absent `§5.4`**, which stays absent.
**Everything below this line is the exemption AS FILED, kept verbatim** — the four-cell table and
the four numbered honest statements are byte-identical to the filing, and each carries its own
dated superseded marker rather than being deleted.

**`H-r4` obliges an explicit zero-row/typed-PBT decision per unit. Stated exactly as
`docs/specs/engine-drift.md` §5.5 and `docs/specs/engine-pin.md` §5.5 state it: THIS REPO HAS NO PBT
HARNESS.** `package.json`'s `devDependencies` key set is `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **five keys** (`package.json:26-31`, read this pass) — with **no
`fast-check`, no `hypothesis`, and no property runner**. **This spec therefore records a ZERO-ROW
register**, and here is why that is the honest answer rather than a dodge:

**⟶ THE FOUR CELLS OF THE TABLE BELOW ARE SUPERSEDED AS-WRITTEN AND ARE KEPT VERBATIM (2026-09-27,
the gate-11 ruling for code-bearing units). Each is answered by `§5.5.1`, and the answer is stated
here so the superseded table is never read as the current register:**

| Superseded cell | Answered by `§5.5.1` how |
| --- | --- |
| cell 1 (*"three genuine quantifications, all sampled deterministically … none of the three is proven by its sample"*) | **RESOLVED BY ROWS**: (i) the undeclared-key/no-silent-create quantification becomes **`P-SH-SM-1`** (+ `P-SH-SM-2`'s sequences); (ii) the no-throw quantification becomes **`P-SH-TP-1`**; (iii) the permutation + identity quantification becomes **`P-SH-IM-1`** (+ `P-SH-IM-2`). |
| cell 2 (*"no harness exists, and adding one is a `devDependencies` change"*) | **REFUTED AS A CONCLUSION**: no harness IS added, and the register is nonetheless executed by the deterministic strategy discipline `docs/specs/engine-pin.md` §5.5 established (7 of 8 rows, plain vitest tables, **no new devDependency**). |
| cell 3 (*"yes in principle … the blocker is the harness, not the layer"*) | **HOLDS AND IS NOW USED** — a property run is `[T]` work here, and `§5.5.1` executes it there. |
| cell 4 (*"a strategy id here is a repeat-drive label, not a property id"*) | **SUPERSEDED**: strategy ids here are `S-SH-*` **property-execution ids**, one per register row. |

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **Three genuine quantifications, all sampled deterministically:** (i) *"for **every** key not in `keys`, `setNode` refuses and creates no container"* — `F-1`/`I-10` sample a few; (ii) *"for **every** input shape, no method throws"* — `I-8` + `F-1`..`F-9` are a deterministic table; (iii) *"for **every** permutation of the declared keys, `order` is that permutation and each container's identity is preserved"* — `M-15`/`I-2` sample it. **None of the three is proven by its sample**, and this spec says so. |
| Could this unit execute them **as properties**? | **No, and not because of effort:** no harness exists, and adding one is a `devDependencies` change — outside §5.1's diff scope and a gate of its own. |
| Do the layers permit a property run here? | **Yes in principle** for (i) and (ii) (pure `[T]` work over an injectable container); (iii)'s identity half is also `[T]`. **The blocker is the harness, not the layer** — stated rather than hidden behind a layer claim. |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their drive by the unit's own ids (`F-1` = the undeclared-key drive, `I-8` = the no-throw drive, `M-7` = the foreign-sibling drive). **A strategy id here is a repeat-drive label, not a property id.** |

**⟶ SUPERSEDED, KEPT VISIBLE (2026-09-27, the gate-11 ruling for code-bearing units): the
four-cell table above is the exemption AS FILED, byte-identical, and it is NOT the contract's
register. Each of its four cells is answered in the four-row reconciliation table immediately above
it. Nothing in it is deleted and no cell is edited in place.**

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that replace
a register:

**⟶ SUPERSEDED 2026-09-27: the register count of THIS unit is `6` rows, ALL executed by design —
see `§5.5.1`.** The four numbered statements below are the exemption AS FILED and are **kept
visible**; items 1, 3 and 4 **survive as rules and are honoured by the register** (item 1 is the
no-sampling anchor; item 3 is why no dependency is added; item 4's "no register exists to
reconcile" is replaced by `§5.5.1`'s change summary), while **item 2 is REFUTED**: the three
quantified claims are **no longer** `NOT EXECUTED — they are register rows with strategy ids**
(`P-SH-IM-1`/`P-SH-IM-2` · `P-SH-TP-1` · `P-SH-SM-1`/`P-SH-SM-2`).

1. **No row of this unit may be reported as "executed" if it was sampled.**
   — **⟶ KEPT AS A RULE AND HONOURED (2026-09-27, the `§5.5` re-derivation pass):** this is why
   `§5.5.1`'s rows are executed **by enumeration over a finite, pinned input set** and why the two
   rows whose property text is larger than their enumeration carry the honest `YES (bounded)`
   marking instead of an implied proof.
2. **The three quantified claims are recorded as `NOT EXECUTED — no PBT harness`**, with their
   compensating rows named: `I-10`/`F-1` (no-silent-create), `I-8` + `F-1`..`F-9` (totality), `I-2`/
   `M-15`/`I-6` (permutation + identity).
   — **⟶ SUPERSEDED 2026-09-27 (kept visible): `NOT EXECUTED — no PBT harness` is NO LONGER the
   status of these three claims.** Each is a register row executed by enumeration, with its
   **strategy id** and its **compensating `§3` rows** named in `§5.5.1`: no-silent-create ⇒
   **`P-SH-SM-1`/`P-SH-SM-2`** (compensating `F-1`, `I-10`); totality ⇒ **`P-SH-TP-1`**
   (compensating `I-8`, `F-1`..`F-9`); permutation + identity ⇒ **`P-SH-IM-1`/`P-SH-IM-2`**
   (compensating `M-15`, `I-2`, `I-6`, `M-5`, `M-7`, `I-3`). **`I-8`'s own row text is NOT changed
   by this** — it stays the every-state invariant and remains the compensating sample row.
3. **No `fast-check` and no generator is added by this unit.**
   — **⟶ KEPT AND SATISFIED (2026-09-27):** no `fast-check` and no property-runner library is
   added. `§5.5.1`'s one generator is a **hand-rolled 32-bit LCG written in the plain TypeScript of
   this unit's own test file, pinned to the literal seed `20260927`** — its constants are the
   test's own literals, **not a dependency** — and `package.json`'s `devDependencies` key set is
   unchanged (the five keys, `package.json:26-31`). **The generator is not a library; the sentence
   above is honoured as written.**
4. **Register change summary: none** — nothing to reconcile with `docs/specs/engine-pin.md` §5.5's
   register (its 8 rows: 4 `P-IM` + 3 `P-SM` + 2 `P-TP`; 7 executed deterministically, `P-TP-1`
   `NOT EXECUTED`).
   — **⟶ SUPERSEDED 2026-09-27 (kept visible): the register change summary is `§5.5.1`'s, not
   "none", and it reconciles against that same register by REUSING its type algebra
   (`P-IM`/`P-SM`/`P-TP`) and its strategy-id discipline — without copying a single row of it and so
   without creating a second authority over it.** **One arithmetic correction to the parenthetical
   above, which this spec inherited from an earlier layer: `engine-pin.md` §5.5's split is
   `3` live `P-IM` (`P-IM-1`, `P-IM-2`, `P-IM-4`) + `3` `P-SM` + `2` `P-TP` = `8` rows**, because
   the former `P-IM-3` was **FOLDED** into `P-IM-4`; the `4 P-IM` form sums to `9` against a stated
   total of `8` and was corrected at that file's own count line (`docs/pending.md` §G records the
   same correction as FIXED). **This spec's superseded `§5.5` cells inherited the wrong `4/3/2`
   form from `engine-pin.md`; the correction is recorded here rather than silently rewritten in
   `engine-pin.md`, which is not this pass's file.** *(`docs/specs/listhost.md` `§5.5.1`'s
   change summary carries the same correction, so the two wave-D specs agree.)*

### 5.5.1 THE REGISTER (2026-09-27, re-derived under the gate-11 ruling) — **6 rows, ALL executed by design**

**What this section is, in one sentence.** The exemption `§5.5.0` above is replaced by a **typed
register of `6` rows** whose three previously-sampled quantifications (`§5.5.0`'s cell 1: the
permutation + identity property, the no-silent-create property and the no-throw property) are
**executed here as quantifications over finite, pinned enumerations** — **hand-rolled and
deterministic, with no new dependency, no `fast-check`, no `hypothesis` and no property runner**
(the `devDependencies` key set is unchanged: `package.json:26-31`, re-read this pass — the five keys
`@types/node`, `electron`, `esbuild`, `typescript`, `vitest`). Type algebra is
`docs/specs/engine-pin.md` §5.5's: **`P-IM`** = invariant · **`P-SM`** = state-machine · **`P-TP`** =
totality.

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-SH-*`** (`SH` =
this unit, the **s**lot **h**ost) — the analogue of the pilot's `P-LH-*` for `U-LISTHOST` — so a
register row is never mistaken for a `§3` row and never for the pilot's. **No id of this register
reuses, extends or restates an `M-*`/`I-*`/`F-*` id of §3** (those stay **compensating sample
rows**, cited per row below), and **no `F-` register row is invented** — the `F-1`..`F-10` refusals
stay §3.2 table rows. **No `§6`/`FS-n` citation appears as a register row.**
**⟶ ANNOTATED 2026-09-27 (the `§7a` RULING pass; the `F-1`..`F-10` figure above is the
re-derivation pass's and is kept visible): `§3.2`'s id set now reads `F-1`..`F-11`** — `F-11` (the
`'no-container'`-never-emitted negative row, `§7a` item 1) is **appended after `F-10`**, nothing is
renumbered, and **this paragraph's rule is unchanged and still binds: none of `F-1`..`F-11` is a
register row, and no `F-` register row is created by the ruling pass** (the register's six rows, their
types and their compensating-sample citations are unchanged — see the reconciliation block after the
register table).
**⟶ ANNOTATED AGAIN 2026-09-27 (the ADVERSARIAL-RECORD pass; the two figures above are kept visible):
`§3.2`'s id set now reads `F-1`..`F-12`** — **`F-12` (NO FACTORY, the container-source seam's row) is
appended after `F-11`** and **`§3.1`'s id set now reads `M-1`..`M-19`** — **`M-19` (`render()`'s
detached-node policy) is appended after `M-18`** — with **nothing renumbered**, and **this paragraph's
rule is unchanged and still binds: none of `F-1`..`F-12` is a register row, and no `F-` register row is
created by this pass either.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/slot-host.test.ts`, §4.1/§5.1)
   — the file the red set already owes, and the file the register **rides as part of the red**
   (§4.2 item 4). **No row of this register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain
   TypeScript inside the test file.** The only generator in this register is `S-SH-SEED-1`'s
   (the `P-SH-TP-1` row), and it is pinned to **literals in the test file itself** — a hand-rolled
   32-bit LCG, the **literal** form a contract so the run is reproducible, and **the constants are
   the test's own choice, not a dependency**: `state₀ = 20260927`;
   `stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`; **draw `n` takes the pool index
   `stateₙ₊₁ mod pool.length`** — i.e. one LCG step is applied and the resulting state selects the
   shape — **so one pool draw consumes exactly ONE LCG step**. **No `Math.random`, no wall-clock
   seed, no shrinking, no adaptive input search.** (Unlike
   the pilot, this register's generator has **one** consumer and needs **no** `next(k)` scaling
   helper, because a `P-TP` pool draw is an index, not a bounded integer: the step form is stated
   exactly so the TestWriter cannot read a two-step form into it.)
3. **Caps, uniform for the whole register:** **≤100 attempts per row, ≤400 attempts in total**,
   rows evaluated sequentially in register order, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running
   row's remaining attempts are abandoned and no further row starts). The DONE ledger records, per
   row, **attempts-run · held · broken · stopped-early**, plus the **pinned seed** (§5.3 item 10).
4. **Sample rows are the §3 rows this register compensates, never replaced by it.** A register row
   **proves its quantification by enumeration**; the `§3` rows remain the per-state contract rows a
   TestWriter derives first, and **no `§3` row is weakened, widened or re-scoped by the register**.
5. **No row may be reported as executed if it was sampled** — `§5.5.0`'s honesty anchor (item 1) is
   **KEPT and honoured**: every row here is `YES` by **enumeration over a FINITE, pinned input set**,
   and each row's cell states that input set exactly. **`2` of the `6` rows carry the honest
   `YES (bounded)` marking** (`P-SH-IM-1`, `P-SH-TP-1`) because in each the **property text is
   larger than its enumeration**; the other `4` rows are `YES` over a fully enumerated domain that
   the row's statement matches exactly. **No row is marked `NOT EXECUTED`** — and this file states
   the one boundary that keeps that honest at the honesty block after the table (the caller-callback
   shape, which `§2.1`/`F-10` leave outside the totality claim).

| ID | Type | Property | Executed? | Compensating sample rows (§3) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-SH-IM-1`** *(the permutation + projection quantification `§5.5.0` left unproven — required row (iii))* | `P-IM` invariant | **For EVERY permutation `p` of the DECLARED key set**, `setOrder(p)` returns `ok === true`, `refused` empty, `removed` empty, and **`order` is EXACTLY `p`** (same keys, once each, in `p`'s order) — and the projected container order (the injected container's host-created containers, read in child order) is that same permutation. **No key outside the declared set is ever projected, and no declared key is ever dropped.** | **YES (bounded — the property text says "EVERY permutation" while the enumeration is `n = 3` and `n = 4` only; the exhaustive claim is over the enumerated sizes, and nothing larger is claimed)** | `M-1`, `M-3`, `M-15`, `M-18`, `I-2`, `I-7`, `I-10` | `S-SH-PERM-1` | **Exhaustive over `S₃` and `S₄`**, hand-authored permutation tables (literal key arrays — **no generator, no library**): `n = 3` keys `['a','b','c']` ⇒ **all `6`** permutations (`6` attempts); `n = 4` keys `['a','b','c','d']` ⇒ **all `24`** permutations (`24` attempts); **plus `3` fixed partial-order drives** of `setOrder` on the SAME `3`-key host (`setOrder(['c','a'])` · `setOrder(['c','a','nope'])` · `setOrder(['a','a','c'])` — the `M-15` ignored-key and duplicate-key ground, one `setOrder` each) — **`33` attempts in all, one `setOrder` call each**, driven in fixed order (`S₃` table, then `S₄` table, then the `3` partial drives) after one `setNode`-per-key + `render()` **setup that is NOT counted as an attempt** (the counted unit is a `setOrder` call). Per attempt assert `ok === true`, `refused.length === 0`, `removed.length === 0`, `order` element-wise equality with the permutation under test **with no missing and no extra key**, and the container child sequence equal to the same permutation — **for the `3` partial drives the expected `order` is the declared key set in the requested relative order with the undeclared/duplicate keys ignored** (`M-15`). |
| **`P-SH-IM-2`** *(the identity half of the same quantification — `V-7`'s own-node half)* | `P-IM` invariant | **For EVERY permutation and every placed key in the enumeration above, IDENTITY IS PRESERVED**: the container element the host created for a key is the **same object** before and after (`toBe`), the caller's node is the **same object** (`toBe`) and is never cloned, re-created or re-parented, `placed` contains that key and no other, and **every foreign sibling of the injected container is still the same object** — the host removes exactly the nodes it placed and **nothing else**. | **YES** | `M-5`, `M-7`, `M-9`, `M-10`, `M-12`, `I-3`, `I-6`, `§2.4` items 3–4, `§2.5` item 2 | `S-SH-IDENT-1` | The **same permutation input family as `P-SH-IM-1`'s two exhaustive tables** (reuse is deliberate: one input family, two properties — the `30` permutation attempts are **DRIVEN AGAIN here as this row's own attempts**, so the register total counts them twice and the arithmetic says so below), **plus `4` fixed identity shapes** = **`34` attempts**. The `4` fixed shapes, driven in fixed order: **(1)** one caller node placed for every declared key of a `3`-key host; **(2)** the same, with the `container` option absent (`null`) — **asserting the no-op configuration places nothing and preserves every reference it was handed**; **(3)** `2` caller-created foreign siblings appended to the injected container **before** the host exists, then two `render()` cycles (`M-7`); **(4)** one node moved between two declared keys (`M-9`) and then replaced by a second node (`M-10`), asserting `removed` holds the first by reference. Per attempt: identity assertions by `toBe` on the container, the node and every foreign sibling; **a row may not pass by asserting presence alone** — the assertion is reference identity, never "an element is there". |
| **`P-SH-IM-3`** | `P-IM` invariant | A **second** call with unchanged inputs performs **no child mutation**: for every declared key, `removed.length === 0`, `refused.length === 0`, **no node is re-appended**, the container's `children` array is **reference-identical element-by-element** (`toBe` per index), `order`/`placed` report the same values, and **every returned array is a fresh array** (`I-9`) — while `ok === true` on both calls. | **YES** | `M-1`, `M-16`, `I-9`, `§2.2` prohibition 4 | `S-SH-REPEAT-1` | Fixed **`4`-shape table × `2` sequential CALLS per shape** = **`8` attempts** (one attempt = one **second** call of a shape after its first call has established the state), driven in fixed order: **(1)** `render()` twice with `3` declared keys and `3` placed caller nodes; **(2)** `render()` twice with `1` declared key and `1` placed node; **(3)** `render()` twice with `keys: []` (`M-8`); **(4)** `render()` twice on the **absent-container** configuration (`M-14`), asserting the valid-state half. Per attempt assert the second call's `removed` `[]`, `refused` `[]`, `order`/`placed` equal to the first call's (by value), each container's `children[i]` **the same object** (`toBe`), and that the returned `order`/`placed`/`removed`/`refused` arrays are **not** the same array object as the first call's (`I-9`). |
| **`P-SH-SM-1`** *(the no-silent-create quantification `§5.5.0` left unproven — required row (i))* | `P-SM` state-machine | For an input set that mixes **valid placements with exactly one REFUSED input**, the valid inputs are **placed and owned** and the refused input is **not placed, not in `placed`, and never creates a container** — `ok === false`, **exactly one** refusal carrying that class's own `code`, **the injected container's child count is unchanged from before the call** (no silent create), and `order` is **exactly the declared key set once each in the projected order** (the refused input contributes no key and no duplicate). | **YES** | `F-1`, `F-2`, `F-3`, `F-4`, `F-7`, `I-1`, `I-2`, `I-10`, `§2.3` items 2/5 | `S-SH-MIXED-1` | Fixed table, **`12` attempts**, driven in fixed order: **(a)** for **each of the `3` refusal classes that `§3.2` gives a trigger** (`'unknown-key'` — `F-1`/`F-3`/`F-4`; `'malformed-node'` — `F-2`; `'container-not-appendable'` — `F-7`) a **`2`-step sequence** — a refused attempt immediately followed by a valid placement for a declared key (`3` classes × `2` steps = `6` attempts; the refused step carries the assertions, the following valid step proves the call did not poison the host's state — **⟶ ANNOTATED IN PLACE 2026-09-27 (the unit's documentation review, finding `F-13`; the `(a)` wording above is KEPT VISIBLE): for the `'container-not-appendable'` class the second step is NOT a placement.** That class can place **nothing** (`F-7`: on a present-but-unusable container no container is created and no node write lands), so the landed drive's second step asserts **the declared RESULT SHAPE and the coherence clauses instead of a placement** (`render()` driven there, with `ok`/`refused`/`order`/`placed` coherence asserted), and the register's shape is read as **"the step proves the refusal did not poison the host"**, which is what the row drives. **The class count (`3`), the `2`-step arithmetic, the `12` attempts, the strategy id `S-SH-MIXED-1` and the `155` register total are UNCHANGED** — `§7a`-era prose that called that step a "valid placement" is superseded by this sentence and by the greens' `O-4`, which is annotated as `RECONCILED BY THE EXECUTED ROW`); **(b)** a **`4`-position rotation** of a mixed drive (`4` attempts — the refused input rotated through positions `1`–`4` of a `4`-entry drive) built from `F-1`, `F-2`, `F-3` and **`F-6`'s absent-container no-op shape**; **(c)** the `''`-key pair (`2` attempts — a declared `''` is a valid key while an **undeclared** non-string is `unknown-key`, `F-3`'s own two halves). **⟶ THE FOURTH DECLARED CODE IS DELIBERATELY NOT DRIVEN HERE (2026-09-27, the `§5.5` re-derivation pass — REPORTED, not guessed): `§2.1`'s `SlotHostRefusal['code']` union declares `'no-container'`, and NO `§3.2` row gives it a trigger** — `F-6` states the opposite in writing (*"a `null`/absent container is **NOT** a refusal … `refused` is `[]`, `ok === true`"*), and `F-7` hands the present-but-unusable case to `'container-not-appendable'`. **A register row may not invent the trigger a contract declined to state**, so this row drives the `3` codes `§3.2` triggers and asserts the **no-op** for the fourth shape. **The gap is reported at the end of this file (ambiguity report item 1) and must be ruled before any pass writes a row that drives `'no-container'`.** Per attempt assert `ok === (refused.length === 0)`, the refusal's `code` **is exactly the class under test** (not merely ∈ the set), `refuse` was notified **once** for that refusal with a `deepEqual` object and **its return value changed nothing** (`M-17`), and the injected container's child count equals the declared key count — **the child-count assertion is the no-silent-create half and is required, not optional** (`I-10`). |
| **`P-SH-SM-2`** | `P-SM` state-machine | **For EVERY step of the fixed operation sequences below, the host's state stays COHERENT**: `ok === (refused.length === 0)` (`I-1`); **every refusal's `code` is one of the FOUR declared members** (`'unknown-key'`, `'no-container'`, `'malformed-node'`, `'container-not-appendable'`) **⟶ RE-PINNED 2026-09-27, THE RED PASS (`§5.5.1`'s executed-red reconciliation block, ruling 4; the as-written clause immediately above is KEPT VISIBLE and is superseded on its DOMAIN half only — this pass could not re-anchor the phrase in place, so its old form is quoted verbatim in that block): the asserted domain is the THREE EMITTED members (`'unknown-key'`, `'malformed-node'`, `'container-not-appendable'`) AND never `'no-container'` (`§2.1`'s refusal-code-domain clause; `§3.2 F-11` is the negative row); the union still DECLARES `4` and is not narrowed, so "no fifth code" is now "no fifth code and no `'no-container'`". The drive, the `8` sequences and the `8` attempts are UNCHANGED.** (the remaining clause ` — no fifth code is ever produced); `order` is exactly the declared key set once each in projected order (`I-2`); `placed` is a **subset** of `order` and contains no key that was never placed (`I-7`); and `keys()` equals `order` (same keys, same relative order). | **YES** | `M-14`, `M-16`, `M-17`, `M-18`, `F-3`, `F-5`, `F-6`, `F-9`, `I-1`, `I-2`, `I-7` | `S-SH-SEQ-1` | **`8` fixed sequences, authored as literal step/expected-outcome data and driven in fixed order** — **`8` attempts, one per sequence** (an attempt = one complete sequence): **(1)** two `render()` cycles over `3` declared keys with `2` placed (`M-16`); **(2)** `render()` with `keys: []` (`M-8`); **(3)** `setNode` on an undeclared key, then `render()` (`F-1`); **(4)** `remove` on an undeclared key, then `containerFor` on the same key (`F-1`/`F-5` — the read is not a refusal); **(5)** the **absent-container** configuration (`null`) driven through **all seven result-returning methods** (`M-14`/`F-6`); **(6)** `keys: null` and `keys: [1,2]` (`F-4` — an empty declared set, every later `setNode` refused), then `render()`; **(7)** the **present-but-unusable** container (an object with no `appendChild`), then `setNode`/`render`/`keys`/`containerFor`/`dispose` (`F-7`); **(8)** a **detached** node — `setNode` a caller node, detach it from its container, then `remove` the key (`F-9`). Per step assert the four coherence clauses above, **and after any refusal assert every method is still callable and still returns a valid `SlotHostResult`** — the sequence proves the host is not left in a state a later call cannot read. **⟶ RULED-IN-PLACE BY THE RED PASS 2026-09-27 (`§5.5.1`'s executed-red reconciliation block, ruling 3): the clause of THIS cell below was authored as "The sequence does NOT assert a specific `removed` membership for sequence 8" and it is SUPERSEDED ON ITS MEMBERSHIP HALF — `§3.2 F-9` pins `removed` to CONTAIN the caller-detached node BY REFERENCE (`CONTRACT-AMENDED 2026-09-27`), the reconciliation table above re-pins this row to that membership, and the HONESTY BLOCK's item 3 (`§5.5.1`) keeps the old prohibition visible with its dated SUPERSEDED note; this pass could not re-anchor that sentence in place, so its as-written form is quoted verbatim in that block.** **The sequence does NOT assert a specific `removed` membership for sequence 8** — that half is deliberately unpinned (`F-9`/`§7` item 9; see the ambiguity report at the end of this file). |
| **`P-SH-TP-1`** *(the no-throw quantification `§5.5.0` left unproven — required row (ii))* | `P-TP` totality | **For EVERY input shape in the pinned pool below, NO method of the slot host throws** (`setNode`, `remove`, `setOrder`, `render`, `keys`, `containerFor`, `dispose` — and `createSlotHost` itself for malformed option shapes): every call returns a valid `SlotHostResult` (or `void` for `dispose()`), the host never leaves a state a later call cannot read, and a refusal — where one occurs — carries one of the four declared codes. **⟶ RE-PINNED 2026-09-27, THE RED PASS (`§5.5.1`'s executed-red reconciliation block, rulings 1/2/4; the clause immediately above is KEPT VISIBLE and is superseded on its domain half, its pool-arithmetic reading and its draw-binding rule — this cell is the one the TestWriter flagged, and its as-written form is quoted verbatim in that block, because the pass could not re-anchor every part of this cell in place): the refusal-code domain asserted here is the THREE EMITTED members AND never `'no-container'`; the pool is `20` DISTINCT input values (a shape reused on more than one method axis is the SAME pool member — the count is NOT `24`), which is what leaves the draw indices, the `60` draws and the `155` total consistent with the executed run; and a draw binds its shape to a method by driving the shape's own bound method AND the cycling method `HOST_METHODS[d mod 7]`, so **all methods are covered inside the `60` attempts** and the attempt count stays `60`. NOTHING in the row's statement, pool count, draw count, strategy id or attempt count is changed by this re-pin.** **STATED BOUNDARY: this row does NOT cover a THROWING caller callback.** `classNameOf`/`attributesOf`/`refuse` are caller code, and `§2.1`'s injected-callback rule states the contract does **not** claim to swallow a caller throw; `F-10`/`A-5` are deliberately UNRULED (`§7` item 8), so **no shape that makes an injected callback throw is in the pool, and none may be added to it by a later pass without first ruling `F-10` in this spec.** **⟶ RECONCILED 2026-09-27 (`§7a` item 4, the `§7a` RULING pass; every sentence above is kept visible and this row's STATEMENT, POOL, DRAW COUNT and `60` attempts are UNCHANGED): `F-10`/`A-5` are NO LONGER UNRULED — `F-10` now carries the ruling and `§2.1`'s totality-boundary clause is its normative home, with a NAMED SAFE DEFAULT per injected function. What changes for THIS row is only the CITATION, not the row: its statement's boundary words are the ruling's own words (*"NO method of this host throws — for any input shape — and `a throwing caller callback is excluded`"*), and **its pool still excludes every callback-throwing shape** — the exclusion is the `YES (bounded)` marking, not a stale reference to an undecided clause. **The callback-throwing shapes are driven instead by the `§3.2` row `F-10`** (which is what the sentence *"none may be added to it by a later pass"* now means: the pool stays as it is; the seam rows live in `§3`). **"one of the four declared codes" is reconciled to the emitted-three domain:** the row asserts membership in the FOUR-member union, and its companion row `F-11` asserts the negative that `'no-container'` is never the member produced (see `§2.1`'s refusal-code-domain clause).** | **YES (bounded — the property text says "EVERY input shape" while the enumeration is a `20`-shape pool under `60` pinned-seed draws; only the enumerated pool is claimed, and the caller-callback boundary above is excluded by the statement itself)** | `I-8`, `F-1`, `F-2`, `F-3`, `F-4`, `F-6`, `F-7`, `F-9`, `M-8`, `M-14` | `S-SH-SEED-1` | **A PINNED-SEED deterministic generator** (item 2 above: `state₀ = 20260927`, one LCG step per pool draw, index `= state mod pool.length`) over a **fixed pool of `20` input shapes**, drawn **`60` times** in a fixed draw order = **`60` attempts** (one attempt = one drawn `(method, input)` pair driven once on a host built for that shape's configuration), all `60` inside the **≤100 per-row cap**. **The pool (each shape is a literal in the test file):** `null` · `undefined` · `42` · `NaN` · `''` · `'x'` · `[]` · `[{}]` · `[42]` · a non-object argument (a bare string used where a node is expected) · `{key: null}` as a node value · an object with no `appendChild` (present-but-unusable container) · an object whose `appendChild` is `42` · `container: null` · `container: 42` · `container: 'div'` · `keys: null` · `keys: 'a,b'` · `keys: [1,2]` · a caller node **already detached** from its container. **Every method is covered**: each draw drives all seven result-returning methods once plus `dispose()` once, so the `60` draws cover the method axis as well as the input axis. **Per attempt assert only that the call did not throw and that the result is a valid `SlotHostResult`** — **asserting a specific `code` per shape is `P-SH-SM-1`/`P-SH-SM-2`'s job, not this row's** (`F-7` vs `M-14` are not reconciled here; see the ambiguity report). **The pool's stated boundary: a `Symbol` key is NOT in the pool** (a `Symbol` is not a `SlotKey` by `§2.1`'s `type SlotKey = string`, so the pool is silent about it **by design**, recorded rather than left as an unrecorded omission), **and no callback shape is in the pool** (the `F-10` boundary above). |

**⟶ THE REGISTER ROWS' RECONCILIATION WITH `§7a`'s RULINGS — WHAT EACH ROW NOW DRIVES, AND WHAT ITS
CELL STILL SAYS (ADDED 2026-09-27, the `§7a` RULING pass).** This block **amends no register row's
statement, type, `YES`/`YES (bounded)` marking, strategy id or attempt count** — the six rows, the
strategy discipline, the caps and the `155`-attempt arithmetic are exactly as `§5.5.1` writes them.
It exists because each row's **cell** names a half it "declines to drive for want of a ruling", and
the rulings have landed; a TestWriter reading only the table must not conclude the declined halves
are still unavailable, and a TestWriter reading only this block must not widen a row.

| Register row | What the rulings change for THIS row (its statement/counts are unchanged) |
| --- | --- |
| `P-SH-IM-1` | **Item 9's layer ruling (`§2.5` item 3, amended):** its container-child-sequence assertion is the **node/`[T]`-layer observable** and is exactly what the row should assert; it asserts **nothing** about graph ops, and the "zero graph ops" half is `§4.4 S-7`'s **static** row. No cell change. |
| `P-SH-IM-2` | **Item 7 (`F-7`'s observables clause):** its `toBe` identity discipline already satisfies the anti-vacuity rule; `containerFor`-shaped identity uses observables 1/2, never "is an element". No cell change. |
| `P-SH-IM-3` | **Item 8 (`M-16`/`I-9`, amended):** its per-step child-reference sequence is now the NAMED observable of `M-16`, and its array-freshness half (`!==` by reference) is the NAMED observable of `I-9` — so both assertions are contract-named rather than the register's private reading. No cell change. |
| `P-SH-SM-1` | **Item 1 (the code domain):** the row's cell says the fourth declared code is "deliberately not driven here — REPORTED, not guessed". **That is now a RULING, not an open report:** `'no-container'` is DECLARED-BUT-NOT-EMITTED (`§2.1`'s refusal-code-domain clause), so the row's `3`-triggered-classes enumeration stays **exactly as it is** and the negative is driven by the new `§3.2` row `F-11`. A TestWriter may **not** add a `'no-container'` drive to this row. |
| `P-SH-SM-2` | **Items 1, 2, 3 and 6.** (a) Its per-step code-membership clause is re-pinned to the **three emitted** members **plus the `'no-container'`-absent negative** (honesty block item 4, sharpened). (b) Its **sequence 5** (absent container, `M-14`/`F-6`) and **sequence 7** (unusable container, `F-7`) may now assert the **`ok` values** the per-method table under `§3.2` fixes — `ok === true` with `refused` `[]` for sequence 5's valid inputs, `ok === false` with `code === 'container-not-appendable'` for sequence 7's placement attempts — **which the row previously declined "for want of a ruling"**. (c) Its **sequence 8** must now assert `removed`'s membership (`F-9`, amended). **Its `8` sequences and `8` attempts are unchanged.** |
| `P-SH-TP-1` | **Item 4.** Its statement's boundary words are the ruling's own (*"a throwing caller callback is excluded"*), its pool still excludes every callback-throwing shape, and its `F-10`/`A-5` citation is no longer "deliberately UNRULED" — the seam rows live in `§3.2 F-10`. Its `20`-shape pool and `60` draws are unchanged. **⟶ AND ON THE FIFTH SEAM (ADDED 2026-09-27, the architect's option-(a) ruling on the container source; `ADV-SH-1`, HIGH): the NO-FACTORY shape is NOT added to this row's pool, and the `20`-shape pool, the `60` draws and the `155` total are UNCHANGED.** The container-source seam is driven by the new **`§3.2` row `F-12`** (five factory drives × all seven methods), and the cell's own dated pool note states the correction to the re-indexing rationale: **the count stands on the EXECUTED `20` (distinct input values, each once) and on the coherence of the `60` draws and `155` total with that executed pool, NOT on the unsound claim that `pool.length` participates in the draw binding.** A TestWriter may **not** widen this row to the factory shapes, and may **not** narrow it: `F-12` is the home. |

**⟶ THE REGISTER'S HONESTY BLOCK — what is NOT proven here (stated so no reader over-reads a `YES`).**

1. **Two rows are `YES (bounded)` and it is not a formality.** `P-SH-IM-1`'s statement quantifies
   over **every** permutation while its tables enumerate `n = 3` and `n = 4`; `P-SH-TP-1`'s
   statement quantifies over **every** input shape while its pool holds `20`. **Neither row is a
   proof of its unbounded universal**, and a DONE row that reports either as one is a review finding.
2. **`P-SH-TP-1` cannot honestly claim the `F-10` half.** *"No method throws for any input"* is
   **false as a universal** if "input" includes a throwing caller callback, because `§2.1` says the
   contract does not claim to swallow it and `F-10` is deliberately unruled. **This pass does not
   resolve that** — it **bounds the row and reports the hole** (ambiguity report, item 4 at the end
   of this file). **The row's statement carries the boundary in its own text**, so the `YES` is
   honest without silently narrowing `§2.1`. **⟶ UPDATE 2026-09-27 (`§7a` item 4, the `§7a` RULING
   pass; the paragraph above is the RE-DERIVATION pass's state and is kept visible): the hole is now
   RESOLVED IN THE OTHER DIRECTION — `F-10` **is ruled** and `§2.1`'s totality-boundary clause names
   the safe default of each of the four injected functions, so the universal's bound is a stated,
   falsifiable contract rather than an unresolved exemption. **This changes NOTHING about this honesty
   item's force: `P-SH-TP-1`'s pool still excludes the callback-throwing shapes, the row is still
   `YES (bounded)`, and the row that now drives the four seams is `§3.2 F-10` — not this register
   row.** A reader must not read "F-10 is ruled" as "this row now proves the callback half": it does
   not, and it must not be extended to.**
3. **`P-SH-SM-2` sequence 8 asserts "no throw, no dangling ownership" and NOT `removed`'s
   membership** — because `F-9`/`§7` item 9 deliberately refuse to pin it (the shim's `remove()` is
   idempotent, so pinning membership would pin a shim detail). **A TestWriter may not strengthen
   that half without amending `§7` item 9 first.** **⟶ SUPERSEDED ON ITS MEMBERSHIP HALF 2026-09-27
   (`§7a` item 6, the `§7a` RULING pass; the sentence above is the AS-WRITTEN prohibition and is kept
   visible): `§7` item 9 HAS BEEN AMENDED — the membership is pinned in `§3.2 F-9` (*"`removed`
   CONTAINS `n`, by reference"*), and therefore **sequence 8 MAY AND MUST now assert that membership**
   (`removed` contains the caller-detached node by reference) **in addition to** "no throw, no
   dangling ownership". **The rest of sequence 8 — its drive, its attempt count (1 sequence of the
   `8`) and its `keys()`/`order` coherence assertions — is UNCHANGED.** The row's statement and the
   register's `8` attempts are not altered by this; only the sequence's assertion set grows from
   what the ruling now permits.**
   **⟶ RECONCILED TO THE EXECUTED RED SET 2026-09-27 (the `U-SLOTHOST` RED PASS, Ruling 3 of
   `§5.5.1`'s executed-red block; the as-written sentence and the `§7a`-era note above are BOTH kept
   visible and NEITHER is rewritten): this item's stale half is now answered IN THE FILE'S OWN
   RECORD — the TestWriter authored sequence 8 to the AMENDED `§3.2 F-9` plus `§7a.1` item 6, i.e.
   **sequence 8 asserts `removed` CONTAINS the caller-detached node BY REFERENCE** (in addition to
   "no throw, no dangling ownership"), and the register-reconciliation table above already reads
   *"MAY AND MUST now assert that membership"*. **The old prohibition is therefore read as
   superseded on its membership half and authoritative on nothing else**: **the drive and the attempt
   count are UNCHANGED** (1 of the `8` sequences; the register's `8` attempts and the `155` total are
   untouched), and a later pass may not cite this item to weaken the membership assertion back out.**
   **Nothing else in this honesty block moves**: items 1, 2 and 4 stand as written (item 4's
   emitted-`3` sharpening is the same domain Ruling 4 reconciles to the `P-SH-TP-1` cell).**
4. **The `4` refusal codes are the register's whole code domain**, taken from `§2.1`'s
   `SlotHostRefusal['code']` union. **A fifth code appearing in any property run is a finding, not a
   table extension** (`P-SH-SM-2` asserts this per step). **⟶ SHARPENED 2026-09-27 (`§7a` item 1, the
   `§7a` RULING pass; the item above is kept visible and NOT weakened): the union's `4` members are
   the row's declared domain, and the EMITTED domain is `3` — `'no-container'` is
   DECLARED-BUT-NOT-EMITTED (`§2.1`'s refusal-code-domain clause; row `F-11`). So `P-SH-SM-2`'s
   per-step assertion is re-pinned to **every refusal `code` ∈ the three emitted members, AND never
   `'no-container'`, AND never a fifth code** — the negative is the half that makes the domain exact.**

**Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES (one term per register
row, counted from the tables this section writes).** **`33` (`P-SH-IM-1`) + `34` (`P-SH-IM-2`) +
`8` (`P-SH-IM-3`) + `12` (`P-SH-SM-1`) + `8` (`P-SH-SM-2`) + `60` (`P-SH-TP-1`) = `155` attempts.**

| Row | Attempts | What counts as one attempt | Its terms |
| --- | --- | --- | --- |
| `P-SH-IM-1` | **33** | one `setOrder` call | `6` (`S₃`, exhaustive) + `24` (`S₄`, exhaustive) + `3` (fixed partial-order drives) |
| `P-SH-IM-2` | **34** | one permutation drive, or one fixed identity shape's drive | `30` (the **same** `S₃`+`S₄` family, driven again as this row's own attempts) + `4` (fixed identity shapes) |
| `P-SH-IM-3` | **8** | one **second** call of a shape | `4` fixed shapes × `2` sequential calls per shape = `8` |
| `P-SH-SM-1` | **12** | one step of a sequence, or one rotation/sweep attempt | `3` triggered classes × `2` steps = `6`; `+` `4` rotation positions; `+` `2` `''`-key pair attempts = `12` |
| `P-SH-SM-2` | **8** | one complete fixed sequence | `8` literal sequences |
| `P-SH-TP-1` | **60** | one drawn `(method, input)` pair | `60` pinned-seed draws over a `20`-shape pool |
| **TOTAL** | **155** | — | **`155 ≤ 400` (the register total cap)**; **per-row max `60` ≤ `100`** |

**How the counting works, so the numbers are checkable rather than asserted:** **one "attempt" = one
exercised DRIVE of one register row** — for the permutation row one `setOrder` call, for the
totality row one drawn `(method, input)` pair, for a sequence row one complete sequence, for the
repeat row one second call. **Setup is NOT counted**: the `setNode`-per-key + `render()` a row needs
before its first drive is precondition, not attempt, and that is stated because it is the only place
the arithmetic could be read two ways. **The `30` shared permutation attempts are counted in BOTH
`P-SH-IM-1` and `P-SH-IM-2`, deliberately** (they are driven twice and each row's count is its own
attempts) — **so no reader may "deduplicate" the total to `125`; `155` is the register's total as
the caps count it.** **If `P-SH-IM-1`'s third fixed table is dropped (the `3` partial drives), the
total is `152` — and a DONE row reporting any total other than the one the test file's tables
produce is a review finding**: the ledger's numbers are read against the test file's tables, exactly
as `§5.3` item 10 requires.

**Register change summary (what this pass did to `§5.5`).** `§5.5.0`'s **zero-row exemption is
SUPERSEDED** by this register (date + reason in the two banners above, and its heading preserved).
Its **cell 1** (*"three genuine quantifications, all sampled … none of the three is proven by its
sample"*) is **resolved by rows**: no-silent-create ⇒ **`P-SH-SM-1`** (with `P-SH-SM-2`'s
sequences); totality ⇒ **`P-SH-TP-1`**; permutation + identity ⇒ **`P-SH-IM-1`** (+
**`P-SH-IM-2`**). Its **cell 2** (*"no harness exists, and adding one is a `devDependencies`
change"*) is **refuted as a conclusion** per the gate-11 ruling's decisive point: no harness IS
added, and the register is nonetheless executed by the deterministic strategy discipline
`docs/specs/engine-pin.md` §5.5 established (**7 of 8** rows, plain vitest tables, **no new
devDependency**). Its **cell 3** (*"yes in principle"*) **holds and is now used**. Its **cell 4**
(*"a strategy id here is a repeat-drive label, not a property id"*) is **superseded**:
strategy-ids here are **`S-SH-*` property-execution ids, one per row**. Its **items 1–4** are
superseded as follows — **item 1 (the no-sampling anchor) is KEPT and is why every row is executed
by enumeration rather than sampled**; **item 2 (`NOT EXECUTED — no PBT harness`) is REFUTED for all
three claims**; **item 3 (no `fast-check`, no generator) is KEPT and satisfied** (the one generator
is a hand-rolled LCG pinned to a literal seed in the test file, not a library); **item 4 ("register
change summary: none") is superseded by this summary**. **Two rows are this register's own beyond
the three required quantifications** — `P-SH-IM-3` (repeat-call write-freedom) and `P-SH-SM-1`'s
mixed-refusal form of the no-silent-create row, both genuine quantifications found in `§2`–`§3`
(`M-16`/`I-9`; `F-3`/`F-4`/`F-7`). **The register is THIS unit's own and is NOT a copy of
`docs/specs/engine-pin.md` §5.5's** — no engine-pin row is restated, extended or contradicted, so
**no second authority over that register is created** (the discipline `docs/specs/projection.md` §8
states as *"a second authority over a landed register is a finding"*) — and **it is not a copy of
`docs/specs/listhost.md` `§5.5.1` either**: the two wave-D registers share the **type algebra and
the strategy discipline**, and no row, table, pool or id is shared.

**Register integration with the legs and the DONE row (so the property layer is not an orphan).**
The register rows are carried by **the same node suite** `npm test` already runs (§5.2 leg 1) in
**this unit's own** `tests/slot-host.test.ts` — **no new leg, no new file, no new script, no
`package.json` change, no new dependency** (§5.1's diff scope is unchanged, and §1 item 3's
annotation says the same). **No `[U]`-leg row is added**, and the optional real-DOM identity row of
§5.2 stays optional and precondition-gated: **no register row depends on it.** **§5.3's DONE row
gains item 10** (per-row attempts/held/broken, strategy ids, the pinned seed, the stop-after-5
status, the total against the caps, and the explicit `YES (bounded)` sentence). **A read-only PBT
audit may not report a row as executed on the strength of this table alone** — the audit reads the
TestWriter's tables in the test file and the ledger's numbers against this cell, because **every
`YES` here is execution DESIGN and this pass ran nothing.**

**⟶ THE EXECUTED RED RUN AND THE FOUR CELL RECONCILIATIONS (ADDED 2026-09-27, the `U-SLOTHOST` RED
PASS — SPEC TEXT ONLY; the pass ran no test, no suite, no leg and no trio).** This block is
**`§5.5.1`'s executed layer, recorded where the register is**, and it does two things in the order the
evidence requires: **(1)** it records what the red set's RUN actually produced, and **(2)** it rules
the four cell drifts the run surfaced so the contract and the executed red set agree. **It amends no
register row's drive, expectation, statement, type, `YES`/`YES (bounded)` marking, strategy id or
attempt count — and NOT the `155` total (`20` pool members each counted once, `60` draws, `155`
attempts).** **It moves no section number, renumbers nothing, and applies the same
annotate-never-rewrite discipline as every pass before it: every clause it re-pins is kept visible,
with its date and its reason, and each ruling QUOTES the as-written form it supersedes** (where a
phrase could not be re-anchored in place — see item 8 — the quotation here is the only form of it
this pass could write).

**(1) The executed red run — MEASURED, not designed.**

The red set has **RUN** and **REPORTED** for `U-SLOTHOST` (`AGENTS.md` item 9; §4.1–§4.2's
author-and-run half is therefore discharged). **The measured numbers, stated exactly:**

| What ran | The measured result |
| --- | --- |
| the red set (§4) | **`55` rows — `53` red / `2` pass** (the two passes are rows that can be green while the module is absent — at least one being the register's own pool-count precondition row, reported by the TestWriter as pinning the executed pool at `20` green; **this pass did not read the test file, so the second pass's identity is the TestWriter's to confirm rather than asserted here**) |
| the node suite, `npm test` (§5.2 leg 1) | **`61` files / `1035` tests — `980` passed / `53` failed / `2` skipped** |
| the property register (`§5.5.1`, riding leg 1) | **`5` of `155` attempts executed — STOPPED EARLY at `P-SH-IM-1`**, with the **five un-run register rows REPORTED AS FAILURES** |

**THE IMPLEMENTATION HAS NOT BEEN WRITTEN and the unit is NOT green and NOT `DONE`.** **⟶ SUPERSEDED AS A STATUS CLAIM 2026-09-27 (the unit's documentation review, finding `F-01`; the sentence and this block are KEPT VISIBLE as the RED PASS's own record, and the whole block's numbers remain that pass's measurements): the implementation has since been WRITTEN, the green has LANDED and the trio has run — the measured state (with its layer limits) is the status region's green note at the head of this file; the unit's `DONE` row is owed by the supervisor.** The module
`src/shared/slot-host.ts` **does not exist**, which is the designed red for this unit (§4.1): every red
row's failure is the module-resolution failure `Cannot find module '../src/shared/slot-host.js'`.
**The `2` passes are NOT evidence that any implementation behaviour is correct**, and no leg of the
trio beyond the node suite (typecheck, build) is claimed to have run: **the red is a RED, not a
partial green.**

**THE EARLY STOP IS THE CORRECT, REPORTABLE BEHAVIOUR — stated because a reader may mistake it for a
harness defect.** `§5.5.1`'s strategy discipline (item 3) evaluates register rows **sequentially and
STOPS AFTER 5 CONSECUTIVE FAILURES**, abandoning the running row's remaining attempts and starting no
further row; a module-absent unit fails every attempt it can make, so the register **must** stop at the
first row — and it did, at **`P-SH-IM-1`**, after **`5`** of the `155` attempts. **The five un-run
register rows are reported as FAILURES**: they were **not driven**, and reporting them as red (rather
than omitting them, or letting an un-run row read as anything other than unresolved) is the honest
accounting this spec requires. **The `155` total and the `20`-shape pool are the register's DESIGN
accounting and are not contradicted by a `5`-attempt execution** — what is executed is reported as
executed, what is un-run is reported as un-run and red, and **no `YES` cell of `§5.5.1` may be cited as
an executed result until an Implementer's green produces attempts that hold** (`§5.3` item 10).

**(2) The four rulings — the contract and the executed red set now agree.**

**Ruling 1 — `P-SH-TP-1`'s pool is `20` DISTINCT INPUT VALUES, EACH COUNTED ONCE.**
**This is the ruling the executed run forces, and the pool is NOT `24`.** The pinned count `20` stands;
**a shape reused on more than one method axis is the SAME pool member, not a new one** — the cell's own
parenthetical list enumerates a value again where a shape is exercised on a second axis (the
**`container`-shaped** members on the render axis, the **`keys`-shaped** members on the `setNode`
axis), and those re-appearances are **the same `20` members seen from another axis, not additional
members**. **The executed run honoured the pinned `20` (each value once), and the TestWriter's own
precondition row pins the executed pool at `20` green — so the executed pool and this ruling agree
member for member.**
**⟶ THE RATIONALE THAT FOLLOWS IS CORRECTED 2026-09-27 (the adversarial pass, `ADV-SH-1`/`ADV-SH-15`;
the as-written sentences are kept visible and are NOT the reason the count stands): the claim that
adding a pool member *"would re-index every seeded draw (`draw n` takes the pool index
`stateₙ₊₁ mod pool.length`), which would change which shapes the `60` draws visit and would leave the
`60`-draw and `155`-attempt figures describing a pool that was never executed"* is **NOT SOUND as a
justification of the `20`-count** — and the register's parallel claim that *"adding members would
re-index every seeded draw"* is unsound for the same reason.**
**WHY IT IS UNSOUND:** the draw binding is **`d mod 7` over the draw's ORDINAL for the method** and
**`stateₙ₊₁ mod pool.length` for the pool member**; **`pool.length` is NOT part of the draw
binding** — it is an input to one modular reduction. Adding a member changes **which member** each draw
lands on, **but it changes nothing about the binding rule, the number of draws (`60`), the number of
attempts (`155`) or the register's arithmetic**: a re-derived pool-index list is **recomputable
arithmetic**, not an impossibility. **THE HONEST REASON THE COUNT STANDS IS THE EXECUTED ONE:** `20`
is the number of **distinct input values** the contract enumerates (each counted once, per-axis
re-appearances being the SAME member), **the executed pool holds `20`** (the TestWriter's precondition
row asserts it), and **the register's `60` draws and `155` total are computed against that executed
pool** — a **COHERENCE** argument, not a re-indexing-impossibility argument. **Adding a pool member is
still not free and still requires a ruling** (it re-derives the draw indices together with the
counts, exactly as the `RE-PINNED` note in that cell says), **but the obstacle is the RE-DERIVATION of
the figures, NOT a binding in which `pool.length` participates** — and **no later pass may cite the
unsound rationale above to refuse a re-derivation, and no later pass may cite this correction to add a
member without one.**
**⟶ AND THE NO-FACTORY SHAPE IS NOT ADDED TO THIS POOL (ADDED 2026-09-27, the architect's option-(a)
ruling on the container source; `ADV-SH-1`, HIGH).** The register row's `20` shapes and `60` draws are
**unchanged**, and **no no-factory / non-callable-factory / throwing-factory / unusable-factory-return
shape is added to `P-SH-TP-1`'s pool** — the fifth seam is driven by the **`§3.2` row `F-12`**, whose
five drives cover all of those shapes through all seven methods. **Reason, stated plainly:** the
register row's property is *"no method throws for every input shape"* and its pool is a **bounded,
pinned, executed enumeration** (`YES (bounded)`) — extending it is a **re-derivation** owned by a
ruling, not a free addition, and the `F-12` row is the falsifiable home the seam needs. **This does
NOT mean the shape is unexercised** — it is exercised by `F-12` — and **it does not change the row's
statement, type, marking, strategy id or attempt count** (`20` members, `60` draws, `155` total).
**The five executed pool members the TestWriter named are recorded
here so the ruling is not name-free: the `container`-shaped members (exercised on the `render` axis),
the `keys`-shaped members (exercised on the `setNode` axis), and the primitive/non-string inputs `42`,
`null` and `''`.** **This cell's own parenthetical enumeration stays visible as written** (it is the
pre-ruling form; read it THROUGH this ruling, each value once) — and the executed file is the authority
on the executed member list. **A later pass may NOT add or remove a pool member, or "reconcile" the
list to `24`, without a new ruling that re-derives the draw indices, the `60` draws and the `155`
total together**, and may not do it by editing the executed test file to match prose.

**Ruling 2 — HOW A SHAPE IS BOUND TO A METHOD: a cycling rule, named, and labelled as a HARNESS
choice.** The cell's own words — *an attempt = one drawn `(method, input)` pair* — and its requirement
that **all methods be covered** are now one rule, and it is this: **a draw's index selects the pool
member (the input) AND the method**, and the draw is exercised against **BOTH (a) the shape's own bound
method and (b) the cycling method `HOST_METHODS[d mod 7]`** (the seven-entry method list, `d` the
draw's ordinal), **within that single attempt**. **The shape→method assignment (the `HOST_METHODS`
ordering and each shape's own bound method) is a HARNESS choice that the row's cell labels as such —
it is NOT a clause of this contract**: no clause of this spec names a method for a shape, the register's
observable is "no method throws", and any enumeration that covers all eight methods within the `60`
attempts satisfies the row. **The rejected alternative reading, stated so it cannot be re-derived: one
draw driving ALL EIGHT methods would make the `60` draws `480` calls and contradict the row's own
`60`-attempt count** — so it is not the reading of this cell. **Under the ruled reading the `60`-attempt
count is CONFIRMED and unchanged**: `60` draws, each one attempt (one drawn `(method, input)` pair),
each attempt exercising the pair's method and its cycling method — the attempt count is not multiplied
by the second method, exactly as the row's cell counts it. **The executed run drove this binding** and
stopped at `P-SH-IM-1` before reaching `P-SH-TP-1`, so **the binding is the DESIGN confirmed
consistent with the executed red set's counts, NOT yet an executed result of this row.**

**Ruling 3 — the honesty block's item 3 is reconciled to the `F-9` ruling: `P-SH-SM-2` sequence 8's
`removed`-membership assertion is now MANDATORY.** `F-9` is **`CONTRACT-AMENDED`** (`§7a` item 6,
2026-09-27): a caller-detached node the host then removes **IS** in `removed`, **by reference** (§2.1's
`removed` doc string; §2.4 items 1–2), and **the TestWriter authored sequence 8 to that amended `F-9`
plus `§7a.1` item 6** — it asserts `removed` contains the detached node **by reference**. **The honesty
block's item 3 therefore reads, on its membership half: SUPERSEDED — sequence 8 asserts "no throw, no
dangling ownership, `keys()`/`order` coherent" AND `removed`'s membership (`removed` contains the
caller-detached node by reference), which the reconciliation table above already permits and requires
("MAY AND MUST").** **Its drive, its position (1 of the `8` sequences), the row's `8` attempts and the
register's total are UNCHANGED**, and **the item's own prohibition sentence is kept visible with its
dated `SUPERSEDED ON ITS MEMBERSHIP HALF` note** — the as-written form stays in the file beside the
ruling that answers it.

**Ruling 4 — the code-domain clause: the two cells now say the SAME thing, and it is THREE EMITTED
plus the `'no-container'`-absent NEGATIVE.** The reconciliation table above re-pins `P-SH-SM-2`'s
per-step code-membership clause to **the three emitted members plus the `'no-container'`-absent
negative** (`§2.1`'s refusal-code-domain clause; `§3.2 F-11`), while **the `P-SH-TP-1` cell's text
still read *"one of the four declared codes"*** — those two forms are reconciled now: **`P-SH-TP-1`'s
code clause reads the emitted THREE (the `FOUR`-member union still DECLARES its fourth member, which is
`'no-container'`, declared-but-never-emitted), and therefore carries the same negative as
`P-SH-SM-2`.** **The TestWriter used three emitted (`'unknown-key'`, `'malformed-node'`,
`'container-not-appendable'`) plus the `'no-container'`-absent negative** — which is what both cells
now assert. **Both as-written forms — `P-SH-TP-1`'s *"one of the four declared codes"* and
`P-SH-SM-2`'s *"one of the FOUR declared members"* — are kept visible in their cells under dated
`RE-PINNED` notes, and are quoted again here with the ruling that supersedes each.** **No row's
positive assertions change by this ruling**: the TestWriter's positive assertions of the three emitted
codes (and `F-11`'s negative) stand exactly as executed.

**(3) The exact cells this pass changed.**

| # | Cell | What this pass wrote there |
| --- | --- | --- |
| 1 | **the status region** (the third status note's close) | a dated `STATUS NOTE — THE U-SLOTHOST RED PASS` block: the measured numbers, the "not implemented / not green / NOT `DONE`" sentence, and the note that the filing-time "nothing here is implemented, no red set has been authored and no leg has been run" line is superseded **on its red-set half only** |
| 2 | **§4.2, item 4's close** | the annotation that riding the red run does **not** mean the register's `155` attempts execute in it — the stop-after-5-consecutive-failures rule is why the run stopped early, and a run claiming all `155` executed would be the finding |
| 2b | **§4.5's delegation-gate close** | the dated note that condition **(d)** has moved one step forward (the red set is RUN and REPORTED) **and is still not discharged** — no Implementer pass has run, the module does not exist, and the unit is not green and not `DONE` |
| 3 | **§5.5.1, `P-SH-SM-2`'s code-membership clause** | a dated `RE-PINNED` note: asserted domain = the THREE EMITTED members **AND never `'no-container'`**; the union still declares `4` |
| 4 | **§5.5.1, `P-SH-SM-2`'s sequence-8 clause** | a dated `RULED-IN-PLACE` note: the `removed`-membership assertion is now MANDATORY (amended `F-9`), with the old prohibition kept visible in the honesty block |
| 5 | **§5.5.1, `P-SH-TP-1`'s code clause** | a dated `RE-PINNED` note carrying **Ruling 1** (pool = `20` distinct values, NOT `24`), **Ruling 2** (the `HOST_METHODS[d mod 7]` binding, a harness choice, `60` attempts confirmed) and **Ruling 4** (the emitted-three domain) |
| 6 | **this block** (`§5.5.1`, after the register's integration paragraph) | the executed-red record and the four rulings, with every superseded as-written form quoted |

**Explicitly NOT changed by this pass** (recorded so the negative is auditable): `§5.2`'s three legs and
its property-layer clause — **not edited**: neither implies that the register completes, and both defer
to `§5.5.1`'s counts; **`§5.3`'s DONE-row shape — not edited**: item 10 already REQUIRES the per-row
attempts/held/broken counts, the strategy ids, the pinned seed, the stop-after-5 status and the
explicit `YES (bounded)` sentence, and **those counts are owed by the DONE row (the green's record),
not by the red run's report**; **`§5.5.1`'s register cells' drives, expectations, strategy ids and
attempt counts, the `155` total and the `F-11` cell — not changed**; and **no other file, no tracker
and no test was touched by this pass.**

**(4) The tool ceiling this pass hit (stated so the record is not over-read).**

**This file's register cells are single lines longer than the read/grep tools return, and the pass's
tools truncate a line at ~2000 characters per result.** Three consequences, all visible in the cells
above: **(a)** `P-SH-TP-1`'s full pool list and `P-SH-SM-2`'s sequence-8 sentence could **not** be
re-anchored in place, so their re-pins are **PREPENDED to the visible portion of the cell** (and the
cell's as-written clause is quoted verbatim in this block) rather than replacing text the pass could
not read; **(b)** **no line of any cell was replaced wholesale** — every edit in this pass is a bounded
anchored `edit` on text that was read first (`RCA-8(c)/(d)`); and **(c)** **this pass asserts no line
count and no byte count for this file** — a census drifts on every pass (§8's convention), and **a
citation must name this file's sections, never its length**.

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If a slot host cannot place, order and attribute
caller-created nodes per caller-declared key without ever authoring content of its own, then the
host/publisher split is not realisable and the unit fails.* The falsification tests are
**`I-4`** (no host-authored content), **`M-7`/`I-3`** (foreign siblings by reference) and
**`F-1`/`I-10`** (no silent create). **A "small" default label, an "empty slot" class, or a
convenience `publish` would each satisfy the unit's apparent purpose while failing `I-4`** — and
each is `H-r15`'s named hazard, not a judgement call.

**A second, independent falsification.** *If ordering the containers cannot be done as a projection
of caller-supplied order, then `§2.5` is not implementable.* The test is the static row (§4.4
`S-7`) plus `I-2`.

**The three outcomes, exhaustively:** (a) the module lands as spec'd; (b) an **impossible** clause is
found and **the spec is amended** with the clause marked `SUPERSEDED` and the reason recorded
**before** implementation continues; (c) the unit is **declined back to the fork** — admissible only
if the host half is shown to be inseparable from the declined publisher half, which would be a
**finding that `H-r15`'s split is not realisable**, and therefore a **new gate**, not this unit's
call (`H-r1`'s cite-and-supersede rule).

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.** It is
   **BLOCKED on the architect's go-ahead for wave D, on the wave-D order (`U-MOUNTGUARD` →
   `U-LISTHOST` first), and on its red set** (§0 ruling 7, §4.5). **⟶ SUPERSEDED ON ITS GO-AHEAD HALF
   (2026-09-27, the `U-MOUNTGUARD` DONE pass; the sentence above is kept visible): the wave-D go-ahead
   WAS GIVEN (architect, 2026-09-27) and `U-MOUNTGUARD` is `DONE`; the surviving blockers are the
   wave-D order (`U-LISTHOST` first) and this unit's own red set.** **⟶ FURTHER ANNOTATED 2026-09-27
   (the `§5.5` re-derivation pass; the as-written sentence and the go-ahead annotation above are both
   kept visible): `U-LISTHOST` is now `DONE`** (the ledger's fifth `DONE` row,
   `docs/next-steps.md`'s `## DONE — U-LISTHOST` section; the `4 DONE / 16 open` counts the status
   block above carries are that earlier pass's, the live counts being `5 DONE / 15 open` with
   **this** unit's DONE row the sixth), so **this unit's OWN RED SET is the only surviving blocker**
   (`§4.5`). **And the unit's quantified claims are NO LONGER unexecuted by design**: `§5.5`'s
   superseded exemption recorded them as `NOT EXECUTED — no PBT harness`, and `§5.5.1` now carries
   them as **six register rows with `S-SH-*` strategy ids, executed by finite enumeration or a
   pinned-seed generator (`20260927`)** — **as execution DESIGN, this pass having run nothing.**
   **The honest statement that survives verbatim is the FIRST one: nothing in this unit is `DONE`,
   nothing is green, and no leg was run by any pass on this file.** **⟶ SUPERSEDED 2026-09-27 (the
   unit's documentation review, finding `F-01`'s spec half; the sentence above is KEPT VISIBLE and is the
   state as of the `§5.5` re-derivation pass): the unit's RED set ran, the GREEN landed and the trio ran —
   see the status region's green note above for the measured state and its layer limits.** **What this item
   may NOT be read as claiming:** that the unit is `DONE` — **it is not; the unit's `DONE` row is OWED BY
   THE SUPERVISOR** (`§5.3` item 10's shape) — and that any leg was run **by the pass that wrote this
   item** (it was not; that is why the note above is dated and attributed).
2. **THE PUBLISHER/CARRIER HALF IS DECLINED — this file must never be read as adopting it.** The
   declined half is what authors the element's text and slot content; it is a `UI-RENDERED-WITH-
   PROVIDENT` review finding, and the host half is admissible **only** because it does not touch that.
   **The queue row carries the same prohibition verbatim: *"Publisher half stays DECLINED — do not
   re-merge."***
3. **`V-7` stays a hard row in BOTH units, and this unit is one of the two.** *"Publish replaces the
   element"* is contradicted by the foreign-sibling-survives rule; the resolution is own-node
   ownership. **A later pass that weakens `M-7`/`I-3` in either spec has re-opened a resolved
   contradiction.**
4. **The slot host is the only admissible host of the two** (`H-r17`): the region host stays
   declined (its blockers are `(C)#1` + `(C)#6`), and **this unit must not acquire a region
   concept** to make itself more useful.
5. **The mechanism-vs-UI-element test is this unit's compliance row, not a licence.**
   `AGENTS.md:23-34` and `docs/decisions.md:53` are **UNCHANGED**; the carve-out (`:54`) excludes a
   mechanism **because it is not a UI element**. **The moment this host writes a label, a status
   string, a class taxonomy or a default, it becomes a UI element authored outside the graph and a
   review finding.**
6. **A node-suite green is envelope/pure-layer evidence, never assembled-app evidence**, and for
   this unit also **never a real-DOM class/CSS-resolution green** (the shim's `className` is a plain
   field). The `[U]` row is optional and precondition-gated (§5.2).
7. **Contract decisions this spec had to make where the sources are silent, recorded so they are
   reviewable rather than implicit:** (i) the **result-object + refusal-list** shape (the sources
   name the contract's *arguments* and its refusal *existence*, and name no return shape); (ii)
   **`ok === refused.length === 0`**; (iii) **`containerFor` is a read and is not a refusal** (`F-5`)
   while `setNode` on an undeclared key is (`F-1`); (iv) **the absent container is a no-op, not a
   refusal**, while a **present-but-unusable** one is `container-not-appendable` (`F-6`/`F-7`) —
   deliberately asymmetric with `U-MOUNTGUARD`; (v) **`dispose()` removes host containers and
   destroys no caller node** (§2.4 item 5); (vi) **attribute/class application is best-effort per
   entry** — a malformed attribute entry is skipped without failing the call (`F-8`); (vii) **the
   refusal listener is notified once and its return value ignored** (§2.1). **Each is a decision,
   not a derivation — the sources are silent on all seven.**
   **⟶ AND A DATE-STAMPED FOLLOW-UP TO THIS ITEM (2026-09-27, the architect's option-(a) ruling on
   the container source; `ADV-SH-1`, HIGH): the seven decisions above are joined by the container
   SOURCE decision — the container source is INJECTED (`containerFactory`) and NO AMBIENT GLOBAL MAY
   BE READ.** Read it as item 7's eighth entry, and read it as a **ruling, not a silence**:
   **(viii) the container source is the injected `containerFactory` seam; the ambient read is
   DELETED, not documented; and nothing may read the ambient realm — no assembled/computed member
   lookup, no aliased/re-derived global reference** (`§2.1`'s container-source clause, `§2.2`
   prohibitions 1/2, `§3.2 F-12`). **⟶ QUALIFIED 2026-09-27 (the `M-14` RECONCILIATION pass; the clause above is kept visible and the ruling is NOT weakened): "no assembled/computed member lookup" is the access ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE** — `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document` — **not an unqualified ban on `[expr]`, which is not assertable of a locally constructed object's access or of ordinary array indexing (`actual[index]`)**: neither carries a banned token, and neither reaches the ambient realm (`§2.1`'s container-source clause, `§4.4 S-2`/`S-4`). **Unlike (i)–(vii) this one is NOT a decision made where the
   sources are silent: it is the architect's ruling on a HIGH finding, and the sentence *"the sources
   are silent on all seven"* above is unchanged and still counts SEVEN of this item's decisions, not
   eight.**
   **A second, smaller contract decision from the same pass — `ADV-SH-3`:** the host's
   **parent-ownership bookkeeping is MODULE-LOCAL** (a `WeakMap` keyed by the caller's node), **not an
   expando marker written onto the caller's node** — the host leaves no `parent` property on a value
   the caller owns, and a frozen/sealed caller node is bookkept exactly like any other. **A row may
   assert the caller's node carries no host-written marker** (§2.4 item 4's identity rule is
   unchanged: the host still clones nothing and re-creates nothing).
   **⟶ CORRECTED 2026-09-27 (the unit's documentation review, finding `F-06`; the parenthetical
   sentence above — *"the host's parent-ownership bookkeeping is MODULE-LOCAL (a `WeakMap` keyed by the
   caller's node)"* — is KEPT VISIBLE and is WITHDRAWN as a remedy): the host writes NO parent marker
   and keeps NO parent bookkeeping AT ALL.** The old code's `markParent` expando write is **DELETED,
   not replaced**: its value was **read by nothing** (the host's bookkeeping is its `records` map;
   `holds()` reads the container's `children`), so deleting it changes no observable behaviour and no
   row. **A `WeakMap` is INADMISSIBLE in this module twice over** — the unit's own static row
   **`§4.4 S-4` bans the token outright** (its scan rejects `/\b(WeakMap|WeakSet)\b/` anywhere in the
   comment-stripped source, *"a WeakMap/WeakSet registry keyed by the container"*), and **`§2.2`
   prohibition 4** admits only *"its per-key ownership bookkeeping + the container elements it
   created"* as state, with `I-5` requiring none of it to survive `dispose()` — so the only state that
   exists is the per-instance `records` `Map`, rebound by `dispose()`. **The finding is therefore
   `CLOSED-IN-PLACE`: the host leaves no `parent` property on a caller-owned value AND installs no
   module-local registry** (the property a row can assert is exactly *"the caller's node carries no
   host-written marker"*, and a frozen/sealed caller node is bookkept like any other — `§2.4` item 4's
   identity rule is unchanged).
8. **This spec deliberately leaves FOUR seeds UNRULED** rather than inventing rules: **`F-10`/`A-5`**
   (a throwing caller callback), **`A-3`** (duplicate declared keys), **`A-6`** (one node for two
   keys) and **`A-7`** (two host instances over one container). **The adversarial pass must rule them
   and record the rulings here.** Naming an unresolved input as unresolved is the contract; silently
   picking an answer would be the `C-16` class (`RK-10` — a contract reverse-engineered from one
   consumer). **⟶ THREE SEEDS REMAIN UNRULED, ONE IS RULED (2026-09-27, the `§7a` RULING pass,
   `§7a` item 4; the sentence above is the AS-WRITTEN list and is kept visible): the list now reads
   `A-3`, `A-6`, `A-7` — three seeds, unchanged — and `F-10`/`A-5` moves OUT of it: the four
   injected caller functions have NAMED SAFE DEFAULTS in `§2.1`'s totality-boundary clause, the
   `§3.2` row `F-10` carries the ruling as a falsifiable row, and `§3a A-5`'s disposition is updated.
   **The adversarial pass still owes the three seeds (`A-3`/`A-6`/`A-7`) its rulings, and it owes
   `F-10` nothing further except confirmation that the landed guards match the four named defaults.**
9. **`F-9`'s `removed` membership is deliberately not pinned** (a caller-detached node). The honest
   contract is *"no throw, no dangling ownership"*; the shim's `remove()` is idempotent
   (`src/shared/dom-shim.ts:89-96`, read), so pinning a specific membership would pin a shim detail
   rather than the mechanism's contract. **⟶ SUPERSEDED ON ITS MEMBERSHIP HALF 2026-09-27 (`§7a`
   item 6, the `§7a` RULING pass; both sentences above are the AS-WRITTEN statement and are kept
   visible): the membership IS NOW PINNED — `removed` contains the caller-detached node by
   reference when the host removes its key (`§3.2 F-9`), so the shim-idempotence argument above is
   answered rather than deferred: the pinned claim is about the RESULT (`removed`'s membership,
   `§2.1`'s `removed` doc string) and about the host's OWNERSHIP (`§2.4` items 1–2), not about what
   the shim's `remove()` does to the tree. **What survives of this item verbatim: a detached node
   with NO `remove(key)` call asserts nothing about `removed`, and the membership claim is scoped to
   the `remove` call that ends the host's ownership.** `F-9`'s "no throw, no dangling ownership"
   half is unchanged and is still asserted.**
10. **No page-design layer exists to update.** `docs/skills/designing-pages.md` does not exist
    (globbed this pass), so there is no test-use-case coverage matrix and no demo-page index.
    **⟶ RE-CHECKED 2026-09-27 (the `§5.5` re-derivation pass): still no such file** — `docs/skills/`
    holds `process-guardrails.md` alone, so this statement stands unchanged and **this pass touched
    no page-design artifact**.
11. **⟶ ITEM 11 ADDED 2026-09-27 (the adversarial pass; `ADV-SH-*`): THE UNIT IS NOT GREEN AND NOT
    `DONE`, and the honest state is recorded here rather than in `§3a` alone.** **Measured state as
    this pass found it: `6` rows RED — `M-14`, `M-17`, `F-7`, `P-SH-SM-1` (`11/12`), `P-SH-SM-2`
    (`7/8`), `S-5` — and ALL SIX are ruled TEST-SIDE, with no code defect among them** (`§3b`-1's red
    table). **The register's six `§5.5.1` rows executed `155` of `155` attempts with NOTHING STOPPED
    EARLY, and TWO BROKEN attempts** (`P-SH-SM-1` `11/12`, `P-SH-SM-2` `7/8`) — both breaks
    **test-side defects, now remanded to the TestWriter** (contrast the RED pass's own early stop at
    `P-SH-IM-1` after `5` attempts, which was that run's designed behaviour: `§5.5.1`'s executed-red
    block). **The container source is being REWORKED** under the architect's option-(a) ruling
    (`ADV-SH-1`, HIGH: the ambient read is deleted, the injected factory is the sole source, the
    static bans are tightened), so **the unit may not be reported green, may not be reported `DONE`,
    and no tracker row may read otherwise** (`AGENTS.md` RCA-3/items 3/6). **Two of the six red rows
    are coupled to that rework and will go red again if the harness keeps relying on the shim global
    instead of passing the factory** (`§5.2`'s harness clause; `ADV-SH-1`'s owner chain). **This
    pass ran NO test, NO leg and NO trio** — the counts above are the pass's own report, recorded as
    reported. **Three further items are OPEN WITH OWNERS and are NOT green by any reading:
    `ADV-SH-2` (OWED-with-owner: Implementer guard + a spec pin against a container passed back as a
    node — the cyclic tree), `ADV-SH-3` (OWED-with-owner: the module-local `WeakMap` bookkeeping
    replacing the expando `parent` marker; the contract decision is recorded at item 7 above), and
    `ADV-SH-12` (PARKED-with-revisit-condition: the orphan container on a failed `appendChild` and
    the silently re-appended caller-detached container; revisit when a non-shim / real-DOM container
    is injected).** **⟶ RECONCILED 2026-09-27 (the unit's documentation review, findings `F-04`/`F-06`; the
     three-item list above is KEPT VISIBLE as the ADVERSARIAL PASS's state): of these three, `ADV-SH-2` is
     `FIXED`** — the landed `isOneOfOurContainers` refusal refuses a container handed back as a node with
     `'malformed-node'`, so the cyclic tree cannot form; **its spec PIN is STILL OWED** (`§3.1 M-20`-shaped /
     `§3.2 F-13`-shaped appended negative row). **`ADV-SH-3` is `CLOSED-IN-PLACE`** — **no parent marker and
     no parent bookkeeping at all** (the marker was DELETED, not replaced, and a `WeakMap` is excluded by this
     unit's own `§4.4 S-4` and `§2.2` prohibition 4 — see item 7's companion decision above and `§3b`-1's
     `ADV-SH-3` row). **`ADV-SH-12` alone stays `PARKED-with-revisit-condition`, unchanged.** **The unit's own
     green has since landed (the status region's green note above: `61` rows all green, the register `155/155`
     held, the trio green), and its `DONE` row is owed by the supervisor — NOT written here.**
     **`ADV-SH-15` records that this unit owes NOTHING to `docs/defects.md` or
    `docs/HANDOFF.md` — no package defect was found.**

### 7a. Ambiguity report — clauses the TestWriter could NOT derive a falsifiable row from (2026-09-27, the `§5.5` re-derivation pass)

**Why this subsection exists, and what it is.** The `§5.5` re-derivation forced every quantified
claim in `§2`–`§3` to be turned into a **falsifiable** register row, and **nine clauses did not
admit one**: each is either **self-contradictory**, **declared-but-untriggered**, or **explicitly
deliberate about not pinning** the thing a row would have to assert. **They are REPORTED here, not
guessed** — the same discipline the pilot's pass used when its TestWriter found eight such clauses.
**None of them is fixed by this pass**: each names the two (or more) clauses that disagree, so the
TestWriter knows exactly which drive it may write and which it must not, and so the pass that rules
them has the whole list. **No `§3` row, prohibition or diff-scope clause is weakened, widened or
re-scoped by this list** — several of these clauses are *deliberately* unpinned, and saying so is
the contract.

| # | The clause(s) | Why a falsifiable row cannot be derived | Where the register handles it today |
| --- | --- | --- | --- |
| **⟶ ALL NINE ARE RULED (2026-09-27, the `§7a` RULING pass): `§7a.1` below carries the ruling for each item, so THIS TABLE IS THE REPORT and `§7a.1` IS THE CONTRACT. Read both: this table records what could not be derived before the rulings, and `§7a.1` says what a TestWriter must now assert and which row TEXT (not drives) it produces.** | | | |
| **1** | `§2.1`'s `SlotHostRefusal['code']` union declares **four** codes, including **`'no-container'`**; **no `§3.2` row gives `'no-container'` a trigger** — `F-6` states the ABSENT container is **not** a refusal (*"`refused` is `[]`, `ok === true`"*), and `F-7` gives the present-but-unusable case to **`'container-not-appendable'`**. | A row asserting "an absent container yields `'no-container'`" would contradict `F-6`; a row asserting the code is reachable at all has no documented trigger to drive. **The declared code and its sole candidate trigger disagree.** | `P-SH-SM-1` deliberately drives only the **three** codes `§3.2` triggers and asserts the **no-op** for the fourth shape; the `'no-container'` branch is **not driven** and the reason is in the row's cell. |
| **2** | `F-6` (*"a `null`/absent container is NOT a refusal … `ok === true`"*) vs **`F-7`** (*"**every** operation reports `code === 'container-not-appendable'` once per attempted placement"*) — for the same "operation" driven against a container the host cannot append to. | `F-6` makes the absent container a **non-refusal**; `F-7` makes a present-but-unusable container a **refusal for every operation**. Both rows claim to be pinned, and a totality/coherence row must assert an `ok` for each shape — so the two rows cannot both be satisfied by one implementation without a rule that says which operations refuse vs no-op. | `P-SH-TP-1` asserts **only "did not throw"** (never an `ok` value) for both; `P-SH-SM-2` sequence 5 and 7 drive them and assert the coherence clauses **it can derive** (`ok === refused.length === 0`, code ∈ the declared set, `order`/`keys()` agreement) — **the `ok` value for the unusable-container shape is NOT asserted.** |
| **3** | `I-8`'s own table list (*"an unusable container"* among the inputs for which **"no method throws **for any input**"**) vs **`F-7`** (*"`ok === false` … every operation reports `code === 'container-not-appendable'`"*). | A no-throw row is satisfiable by a refusal **or** a no-op; `F-7` additionally fixes `ok === false` for **every** operation, including the **reads** (`keys()`, `containerFor()`) that `§3.1`/`§3.2` never attach an `ok` to. The two clauses are read together they are compatible **only** for the write-shaped methods, and the spec does not say that. | `P-SH-TP-1`'s pool includes the unusable-container shape and asserts **no throw only**; `P-SH-SM-2` sequence 7 asserts **callability and result validity** after the shape. **Neither asserts an `ok` value for the reads** — the ambiguity is exposed rather than resolved. |
| **4** | `§2.1`/`I-8`'s totality claim (*"**No method of this host throws — for any input**"*) vs `§2.1`'s own injected-callback rule (*"**a throw from caller code is the caller's bug, and this contract does not claim to swallow it**"*) plus **`F-10`** (*"This spec does not decide it"*). | "For any input" **includes** a `classNameOf`/`attributesOf`/`refuse` that throws — but that very shape is the one `§2.1` exempts and `F-10` refuses to decide. **A universal row is therefore false as written unless the caller-callback shape is excluded from its domain.** This is the pilot's own class of hole, and it is the unit's designated `F-10`/`A-5` seed. | `P-SH-TP-1`'s **statement carries the boundary in its own text** and its pool excludes every callback-throwing shape; the row is marked `YES (bounded)`. **`F-10` still owes a ruling from the adversarial pass** (§3b's `CONTRACT-AMENDED` candidate). |
| **5** | `SlotHostRefusal.key`'s declared type **`SlotKey`** (i.e. `string`, `§2.1`) vs its own doc string *"The key exactly as supplied (never normalized, never prefixed)"* and **`F-3`**, which drives **non-string** keys (`42`, `null`) and requires them to be refused. | A string-typed field cannot hold `42`/`null`, and "exactly as supplied" **forbids** the string coercion that would make it hold them — so a row asserting "the refusal reports the supplied key verbatim" cannot be typed, and a row asserting what it DOES hold would pin an undocumented normalization. **The field's type and its contract disagree.** | `P-SH-SM-1` asserts the refusal's **`code`** and the **child-count/no-silent-create** half, and asserts the refused key's **exact reported form only for STRING keys**; **the non-string-key reporting form is NOT asserted.** `docs/specs/listhost.md` resolved the identical collision by widening its field to `unknown` (`ListHostRefusal.key`) — **this spec has not made that amendment** (it is a `§2.1` type change, i.e. a contract amendment, not a register decision). |
| **6** | **`F-9`/`§7` item 9** (*"`F-9`'s `removed` membership is deliberately not pinned"*) vs **`M-12`/`M-10`**, which assert `removed`'s membership for the neighbouring drives. | A row that asserts the detached-node case contributes to `removed` contradicts `§7` item 9; a row that asserts it does not is equally unsupported. **The clause is deliberately unpinned on the record**, so no falsifiable assertion about `removed` exists for that drive. | `P-SH-SM-2` sequence 8 asserts **"no throw, no dangling ownership, `keys()`/`order` coherent"** and **explicitly declines to assert `removed`**; the honesty block after the register table repeats the prohibition on strengthening that half. |
| **7** | **`M-14`/`F-6`** assert `containerFor(k)` returns **`null`** for every key of an absent/unusable-container host, and **`M-1`/`M-18`** assert it is **"an element"** for a valid host — while `§2.1` types the return as **`unknown \| null`**. | On an `unknown`-typed return, **every** assertion of the form *"is an element"* is true by construction (there is no type-narrowing predicate to fail), so the row cannot **fail** for the mutation it exists to forbid — and *"returns `null`"* cannot be distinguished from `undefined` without pinning a representation the spec does not declare. This is the **`ADV-LH-5` class** (a row that cannot fail) in this unit. | `P-SH-SM-2` sequence 4 asserts only that `containerFor` on an **undeclared** key **is not a refusal and does not throw**; `F-5`'s `null` value is named in the row's compensating list but **the value assertion is not a register row's job**. **The element-vs-null discrimination needs a ruling** (a narrowing shape, or a shim-level predicate such as `children`), and it may not be smuggled into a `[T]` row that passes vacuously. |
| **8** | **`M-16`** (*"`render()` is idempotent … **no child re-append**"*) and **`I-9`** (*"every `SlotHostResult` array is a fresh array"*) vs the **`unknown`-typed** `SlotHostResult` arrays — `placed: readonly SlotKey[]` is checked easily, but `removed: readonly unknown[]` gives no element shape to compare. | "No re-append" is only observable through **child identity/order** on the injected container (which the shim exposes) or a mutation counter (which §4.4 `S-7` forbids adding as an injection point) — and "a **fresh** array" is not observable from the values alone: `toEqual` passes for an aliased array too. | `P-SH-IM-3` asserts the **container's `children` reference sequence** (`toBe` per index) and asserts **array freshness by reference identity of the two returned arrays** (`!==`), which is the only honest `[T]` observable available. **A row asserting "fresh" by value comparison would be vacuous** — the ambiguity is that `§3` never says by which observable the freshness is meant. |
| **9** | **`§2.5` item 3** (*"an order change performs **zero graph ops**"*; `I-2`/`M-15` add nothing about the tree) vs **`M-3`** (*"`order === ['b','c','a']`; **the injected container's child sequence matches**"*) — i.e. `setOrder`/`orderOf` **does** reorder the host's own containers in the DOM. | "Zero graph ops" is a claim about the **provident graph** while M-3 is a claim about the **shim tree's child order**; read together without that distinction they contradict (*an order change mutates the tree*). §4.4 `S-7` makes the "zero graph ops" half a **static** row precisely because there is no seam. | `P-SH-IM-1` asserts the **container child sequence** (the M-3 half, which is observable and falsifiable) and **does not assert anything about graph ops**; the static half stays `S-7`'s row. **The two clauses need one sentence distinguishing graph from tree** — the register records the observable half and reports the ambiguity. |

**The register's own boundary against this list.** No register row above **resolves** an item of this
report, and none may be read as doing so: each row's cell states which half it drives and which half
it **declines** to drive for want of a ruling. **Items 1, 2, 3 and 4 are the four that most directly
threaten the register** — 1 and 4 because they bound `P-SH-SM-1`/`P-SH-TP-1`, 2 and 3 because they
leave an `ok` value unassertable for two input shapes. **Items 5–9 are `§2`/`§3` contract gaps the
re-derivation SURFACED** (they are new findings of this pass, not previously recorded anywhere in
this spec), and each is owed to the pass that rules it: 5 to a `§2.1` type amendment, 7 to a
narrowing ruling, 8 to an observable declaration, 9 to a one-sentence distinction, 6 to nothing at
all (it is a deliberate non-pin and stays one).

### 7a.1 THE RULINGS — all nine items ruled 2026-09-27 (the `§7a` RULING pass), so the delegation gate's list is EMPTY

**What this subsection is.** The list above is the re-derivation pass's **ambiguity report**; this is
the **ruling pass** over it — the same step the sibling unit (`docs/specs/listhost.md`) took when its
TestWriter reported eight clauses: **rule each one from the contract's own majority reading, cite the
clauses that decide it, amend the spec so a TestWriter can derive a FALSIFIABLE row, and where the
contract genuinely cannot decide it, say so as an explicit OPEN QUESTION with both readings and an
owner.** **Nine of nine are ruled; `0` remain open, and no item is left as a silent gap.** The report
above is **kept visible and verbatim** (annotate-never-rewrite): it is the record of what the
re-derivation could not derive, and each ruling below names the clause it amends and the row text it
produces. **A ruling that could not decide an item would be recorded as an OPEN QUESTION with both
readings and an owner — none of the nine needed that, and the two boundary items (4 and the
declared-but-not-emitted member in 1) are recorded as STATED BOUNDARIES rather than as silence.** The
pass is under the delegation gate's standard: **the list of clauses a TestWriter cannot derive a
falsifiable row from must be EMPTY or explicitly parked before this unit's red set is authored**
(`AGENTS.md` item 9; the gate-11 standard in `docs/decisions.md`'s `PBT-REGISTER-REQUIRED-FOR-CODE-
UNITS` row and `docs/pending.md` §G — both cited by row name, never by line).

| # | The clauses it cites | The RULING (the contract's majority reading, cited) | Contract decided, or OPEN QUESTION? | The `§3`/`§5.5.1` row TEXT the TestWriter now authors or re-pins (row ids; TEXT, not drives) |
| --- | --- | --- | --- | --- |
| **1** | `§2.1`'s `SlotHostRefusal['code']` union · `F-6` · `F-7` · `M-14` · `§2.3` item 6 | **UNREACHABLE THIS UNIT — `'no-container'` is a DECLARED-BUT-NOT-EMITTED member.** `F-6` (with `M-14` and `§2.3` item 6) is the majority reading of the absent container — a **supported no-op**, *"`refused` is `[]`, `ok === true`"* — and it is **not** a refusal; `F-7` gives **every** present-but-unusable-container refusal to `'container-not-appendable'`; and `§2.1`'s option type (`container: unknown \| null`) admits **no third container state**, so **no trigger emits `'no-container'`** and none is invented. The member stays in the union (contract stability) and the negative is pinned — a **falsifiable** assertion, not silence. | **DECIDED** (the code domain is exact: `3` emitted, `1` declared-but-not-emitted) | **NEW row `§3.2 F-11`** — the negative: *"no call in `I-8`/`P-SH-TP-1`'s enumeration ever produces `code === 'no-container'`; the same enumeration DOES observe the other three codes (non-vacuous control); a fifth code or a `'no-container'` entry FAILS."* **RE-PIN TEXT:** `§5.5.1 P-SH-SM-2`'s per-step code-membership clause (three emitted members **and never `'no-container'`**); `§5.5.1`'s honesty item 4 (sharpened); `§2.1`'s `code` field comment. **`P-SH-SM-1`'s `3`-class enumeration is NOT widened** (its cell already reports the gap; it stays a ruling, not a drive). |
| **2** | `F-6` · `F-7` · `M-14` · `M-1` · `M-18` · `§2.3` item 6 · `§2.1`'s `setNode`/`remove`/`setOrder`/`render` doc strings | **PER-METHOD TABLE — the two rows stop contradicting.** The unifying clause: **an operation that attempts NO node write to a container never produces a container-state refusal.** Reading the two container states as one class (*the host has no USABLE container to place into*): an **absent** container is a no-op with `ok === true` and **no refusal** (`F-6`), while a **present-but-unusable** container refuses `'container-not-appendable'` on a call that attempts a **node write** (`F-7`). The table (under `§3.2 F-7`) fixes all **seven** methods for **both** states: `setNode` and `render` refuse on (b) and no-op on (a); `remove` no-ops on (a), refuses on (b) **when the host actually owns a node under that key** (and no-ops on (b) when it does not — no node write is attempted); **`setOrder` no-ops with `ok === true` on BOTH** (it attempts no node write, `§2.5` item 1) — this is the method the scoping exists for; `keys()` and `containerFor()` **never refuse** on either (reads); `dispose()` is `void`, idempotent, no throw on either. | **DECIDED** (both rows' text is kept visible; the scoping is stated) | **⟶ RE-PIN TEXT:** `§3.2 F-6`'s and **`§3.2 F-7`'s** required-behaviour cells (the "every operation" scope + the pointer to the per-method table); **`§3.1 M-14`** (its `ok === true` half is confirmed; its method list is read against the table). **⟶ ANNOTATED 2026-09-27 (the `M-14` RECONCILIATION pass; the words above are kept visible and this ruling is not renumbered or deleted): "its `ok === true` half is confirmed" is TOO STRONG AS WRITTEN and must be read through this item's own ruling — the half that is confirmed is `M-14`'s `ok === true` CLAUSE, and that clause now binds the ABSENT-container values (`null`, `undefined`) ONLY.** `M-14`'s trigger list carries five values in TWO container states, so the row's `ok` observable splits with them — absent ⇒ no refusal, `refused` `[]`, `ok === true` (`F-6`, column (a)); present-but-unusable (`{}`, `42`, `'div'`) ⇒ `ok === false` with one `container-not-appendable` refusal per attempted node write (`F-7`, column (b)); `setOrder` `ok === true` on both. **This item's ruling stands exactly as written — the TABLE governs, which is its own sentence — and the amended `§3.1 M-14` cell carries the split in place.** **`§5.5.1 P-SH-SM-2` sequence 5 and sequence 7 MAY now assert the `ok` values the table fixes** (the half its cell declined "for want of a ruling"). |
| **3** | `I-8` · `F-7` · `§3.1`'s four result-returning row drives · `§2.1`'s `keys()`/`containerFor()`/`dispose()` signatures | **SCOPE RULED: `F-7`'s refusal clause applies to the RESULT-RETURNING methods ONLY — and, within those, only to a call that ATTEMPTS A NODE WRITE.** `§2.1` declares **four** methods returning `SlotHostResult` (`setNode`, `remove`, `setOrder`, `render`), **one** returning `readonly SlotKey[]` (`keys()`), **one** returning `unknown \| null` (`containerFor()`) and **one** returning `void` (`dispose()`). A refusal is only *reportable* by a `SlotHostResult` (a refusal list is part of it) — so *"every operation reports `code === 'container-not-appendable'`"* **cannot** be asserted of a read, which carries **no `ok` and no `refused`**. The reads return their **declared shape** and **never refuse and never throw**; `I-8`'s no-throw universal covers **all seven** methods, while `F-7` is the refusal table over the four result-returning ones — **of which `setOrder` never refuses on either container state** (it writes no node; the unifying clause of item 2 decides it) and `remove` refuses **only when the host actually owns a node under that key**. **The row-TEXT consequence is that a TestWriter must not write "all four result-returning methods refuse on an unusable container": the table under `§3.2 F-7` is the exact per-method contract.** | **DECIDED** | **RE-PIN TEXT:** **`§3.3 I-8`**'s invariant cell (the scope sentence: `F-7` over the four result-returning methods; reads return their declared shape, never refuse, never throw); `§3.2 F-7`'s cell (same scoping); the per-method table's `keys()`/`containerFor()`/`dispose()` columns. **`§5.5.1 P-SH-TP-1`'s statement is unchanged** (it already lists all seven and asserts no throw only). |
| **4** | `§2.1`'s totality clause · `§2.1`'s injected-callback rule · `F-10` · `I-8` · `§5.5.1 P-SH-TP-1`'s STATED BOUNDARY · `§3a A-5` · `§7` item 8 | **BOUNDARY RULED — the universal is bounded by the injected-callback shape, and THIS UNIT'S SAFE DEFAULTS ARE NAMED** (the `listhost` shape: a caller-supplied injected function that throws sits outside the universal, and each seam gets a named default — there, `itemFactory` ⇒ refusal, `onActivate`/`onClose` ⇒ swallowed; here the seams and defaults are this unit's own). The universal reads, in these exact words: **"NO method of this host throws — for any input shape — and `a throwing caller callback is excluded`"** (`§2.1`'s totality-boundary clause is now the normative home, and `P-SH-TP-1`'s text already carries the same words). The four seams: **`orderOf` ⇒ the supplied `keys` order** (the omitted-`orderOf` fallback, `§2.5` item 1, prohibition 3); **`classNameOf` ⇒ no class write for that node** (`M-11`'s `null`-return rule); **`attributesOf` ⇒ no attribute write for that node** (`M-11`, with `F-8`'s per-entry best-effort unchanged); **`refuse` ⇒ swallowed, with the refusal already recorded** in the returned `refused` (`M-17`). **No refusal code is invented for a callback throw**, and the host **never re-throws** caller code. **`F-10` is therefore no longer "this spec does not decide it".** | **DECIDED** — a real amendment (a `CONTRACT-AMENDED` row, reported as such) | **`§3.2 F-10`'s row TEXT is CONTRACT-AMENDED** (from *"does not decide it"* to the four named defaults + the no-invented-code rule); **`§2.1`** gains the normative totality-boundary clause + the per-function table; **`§7` item 8's list** drops `F-10`/`A-5` (three seeds remain); **`§3a A-5`** is updated; **`§5.5.1 P-SH-TP-1`'s citation** is reconciled (pool unchanged, still `YES (bounded)`); **`§5.5.1`'s honesty item 2** is annotated. |
| **5** | `§2.1`'s `SlotHostRefusal.key: SlotKey` · its own doc string (*"exactly as supplied (never normalized, never prefixed)"*) · `F-3`'s non-string drives (`42`, `null`, `''`) · `§5.5.1 P-SH-SM-1`'s key-reporting half | **WIDENED — the field is now `readonly key: unknown` and holds the supplied value VERBATIM, with NO `String()`, NO trim, NO coercion** — the amendment the sibling unit made to `ListHostRefusal.key` (`docs/specs/listhost.md`, read this pass: it widened the field so it can hold the supplied value verbatim while the code union documents the string case). The deciding clauses: the doc string's own *"exactly as supplied"* (which **forbids** the coercion a string-typed field would require) and `F-3`'s drives, which are **refused inputs** the refusal must be able to REPORT. A `SlotKey` when the input was a string; `42`/`null`/`undefined`/`{}` when it was not. **The refusal `code` union is not touched by this amendment.** | **DECIDED** (a `§2.1` type amendment, not a register decision — the reason the re-derivation pass reported it rather than resolving it) | **RE-PIN TEXT:** **`§3.2 F-3`**'s required-behaviour cell (the refusal's `key` field holds the supplied value **verbatim** — `42`/`null`/`''` — asserted `toBe` against the exact supplied value; a `42`-keyed refusal reading `'42'` FAILS); **`§2.1`**'s widened declaration; **`§5.5.1 P-SH-SM-1`'s** key-reporting half is now derivable for **non-string** keys (its statement and counts unchanged). |
| **6** | `F-9` · `§7` item 9 · `M-10` · `M-12` · `§2.1`'s `removed` doc string · `§2.4` items 1–2 | **MEMBERSHIP PINNED — a node the caller detached, then removed, DOES appear in `removed`, BY REFERENCE.** The sibling unit pinned exactly this (`listhost`'s detached-node sequence: the host's `remove`/`close` reports the node it owned). The deciding clauses are the row's own citations: `§2.1`'s `removed` doc string (*"Every node this call REMOVED (the ones the host had placed), by reference"*) and `§2.4` items 1–2 (the host owns exactly the nodes it placed, and on a `remove` it removes exactly those). The detached node is **still a node the host placed** and still in its bookkeeping, so **the call that ends the host's ownership is the call that reports it**. The shim's `remove()` idempotence (`src/shared/dom-shim.ts:89-96`, read) is a **tree** detail and does not decide the RESULT's membership. **The row is NOT `NOT-ASSERTABLE`: it is assertable and it is pinned**, and the claim is **scoped to the `remove(key)` call** (a detached node with no `remove` call asserts nothing about `removed`). | **DECIDED** — a real amendment to a deliberately unpinned clause (`CONTRACT-AMENDED`, reported as such) | **`§3.2 F-9`'s row TEXT is CONTRACT-AMENDED** (membership pinned, the as-filed parenthesis kept visible); **`§7` item 9** is annotated as superseded on that half; **`§5.5.1 P-SH-SM-2` sequence 8 MUST now assert the membership** (its drive and `8` attempts unchanged); **`§5.5.1`'s honesty item 3** is superseded on that half; **`§5.5.1`'s honesty block boundary list** follows. |
| **7** | `M-1` · `M-18` · `M-14`/`F-6` · `F-5` · `§2.1`'s `containerFor(key) => unknown \| null` · `§2.4` item 4 (identity) · `§4.4 S-2`/`S-7` | **OBSERVABLE NAMED — the anti-vacuity ruling (the `ADV-LH-5` class: a row that cannot fail).** *"Is an element"* is **true by construction** on an `unknown \| null` return and is therefore **not** an assertion. The two observables that CAN fail: **(1) REFERENCE IDENTITY WITH THE INJECTED CONTAINER'S CHILD** — `containerFor(k)` `toBe` the element at the projected index of the injected container's **per-step child-reference sequence** (fails for a wrapper, a copy, the key string, or a different container); **(2) PER-KEY IDENTITY ACROSS TWO CALLS** — the same object on a second `containerFor(k)` (`toBe`) while two declared keys' results are **different** objects (`!==`). **Plus the `null` half is pinned BY VALUE** (`toBe(null)` / `=== null`, never `undefined`, never "falsy") for undeclared keys (`F-5`) and for both container states. **No new shim member is needed** (the shim's `children` + `toBe`; a "is a DOM element" predicate has no shim support, `S-2`/`H-r5`). | **DECIDED** | **RE-PIN TEXT:** **`§3.1 M-1`** (*"`containerFor('b')` is the second"* → reference identity with `children[1]` + per-key identity across two calls) and **`§3.1 M-18`** (the same, with `containerFor('a') !== containerFor('b')`); **`§3.2 F-5`** (the `null`-by-value half); the observables clause under **`§3.2 F-7`** (normative); **`§5.5.1 P-SH-IM-2`** already uses `toBe` identity (no cell change). |
| **8** | `M-16` (*"no child re-append"*) · `I-9` (*"a fresh array"*) · `§3`'s silence on the observable · `M-3`/`I-10` (the child sequence) · `§4.4 S-7` (no counter injection) | **OBSERVABLES NAMED — the same class as item 7.** **(a) "No re-append"** is observable only as the **PER-STEP CHILD-REFERENCE SEQUENCE** of the injected container — the child list before and after the second `render()`, compared index by index by **reference** (`toBe`), with each container's `children` array reference-identical element-by-element; a host that removes and re-appends the same node FAILS it (and a **mutation counter is NOT available** — `S-7` forbids adding an injection point, so the sequence *is* the observable). **(b) "A fresh array"** is **not observable from values**: `toEqual` passes for an aliased array, so freshness is asserted by **REFERENCE IDENTITY of the returned arrays** (`second.order !== first.order`, and likewise `placed`/`removed`/`refused`), **plus the mutation half** — mutating a returned array does not change the host's state (re-read `keys()` and observe the pre-mutation values). | **DECIDED** | **RE-PIN TEXT:** **`§3.1 M-16`**'s required-behaviour cell (the per-step child-reference sequence named) and **`§3.3 I-9`**'s invariant cell (fresh = `!==` by reference on the returned arrays + the mutation half); **`§5.5.1 P-SH-IM-3`** already asserts exactly these two (no cell change). |
| **9** | `§2.5` item 3 (*"zero graph ops"*) · `M-3` (*"the injected container's child sequence matches"*) · `I-2`/`M-15` · `§4.4 S-7` · `§5.5.1 P-SH-IM-1` | **LAYER RULED — graph vs shim tree.** On the **node/`[T]` layer** the observable is the **CHILD SEQUENCE** (the injected container's host-created containers in child order, by reference) — that is `M-3` and `P-SH-IM-1`, and it is what a `[T]` row may assert. **The "zero graph ops" claim is about the PROVIDENT GRAPH and is a STATIC SOURCE ASSERTION** (the module calls no `dispatch`/`op`/`applyCommand`/`load` and imports nothing from `src/renderer/**`) — it is `§4.4 S-7`'s row and it **must NOT be asserted from a node-suite green** (and must not be moved onto the optional `[U]` leg as though a real-DOM run measured it: this unit has **no graph seam** and may not add one). **An optional append/compile counter is NOT admissible** here: `S-7` forbids the injection point, and the only honest counter-shaped observable is the child-reference sequence itself. | **DECIDED** | **RE-PIN TEXT:** **`§2.5` item 3**'s clause (the layer sentence: node-layer observable = child sequence; graph-op claim = static `S-7` row); **`§3.1 M-3`** (its child-sequence half stands and is the node-layer observable); **`§5.5.1 P-SH-IM-1`** asserts the child sequence and **nothing about graph ops** (no cell change). |

**The gate's list is therefore EMPTY: `9` items ruled, `0` OPEN QUESTIONS, and every one of the nine
names the row TEXT (`§3` or `§5.5.1`) that follows from it.** **Two rulings are REPORTED AS
CONTRACT-AMENDED because they change what a row asserts rather than clarify it — items 4 and 6** —
and **item 5 is an amendment to a TYPE (not to a row's assertion)**: the widened `SlotHostRefusal.key`
makes `F-3`'s refusal-reporting half assertable where a string-typed field made it unassertable.
**Items 1, 2, 3, 7, 8 and 9 are clarifications/scopings** — each states the reading the contract's own
clauses already imply, and **none weakens, widens or re-scopes a `§3` row's drive.** **No item was
parked, and no item's ruling was left to the adversarial pass as a judgement call** — what the
adversarial pass still owns is `A-3`/`A-6`/`A-7` (`§7` item 8) and the **confirmation** that the four
landed guards of item 4 match the named defaults.

**No section number moves in this pass.** `§7a.1` is a **sub-heading of `§7a`** (sibling of
`§5.5.0`/`§5.5.1`'s convention), so the file's `§0`–`§8` sequence, the `§5.3 → §5.5` gap (**no
`§5.4`**) and every existing citation are unchanged.


## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = the part-half that stays
with the fork (and must not be re-merged). **OWED** = an obligation not yet discharged.
**NOT THIS UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

| Source row | Section | Status for `U-SLOTHOST` | Where |
| --- | --- | --- | --- |
| `SCH-9`'s **host half** (A-d7) | amendment §1.10, §2.2's `SCH-9` row, `S-d14` | **ADOPTED — this unit**, host-only, mechanism-only | §1, §2 |
| `SCH-9`'s **publisher/carrier half** (`AUTHORS-UI-CONTENT`, `(C)#2`) | amendment §1.10 (the declined half), §2.2's `SCH-9` row | **DECLINED — must not be re-merged** (`H-r15`) | §2.2 (prohibitions 1/2), §7 item 2, `A-1` |
| `H-r15` (the split + the named hazard: no per-zone/per-pane semantics, no mirror-class taxonomy) | `H-r15` | **DISCHARGED** as §2.2's prohibition rows + `A-1`/`A-17` | §2.2, §3 `F-1`, §4 `S-5`, §6 |
| `H-r17` (the slot host YES / region host NO consequence) | `H-r17` | **DISCHARGED** — this unit acquires no region concept | §0 ruling 5, §1, §7 item 4 |
| `V-7` (publish-replaces-the-element vs foreign-sibling-survives) | `V-7`; amendment §2.2's `SCH-9` row (*"resolved by own-node ownership and kept as a hard row"*) | **RESOLVED + carried as the hard row** | §2.4, §3 `M-7`/`I-3`, `A-19` |
| The **`SCH-9 → SCH-11`** edge | `H-r6` | **DISSOLVED** — `U-LISTHOST` and this unit are **independent** mechanisms, each taking its own injected policy | §4 `A-18` |
| `H-r17`'s **"a dashboard/toolbar use case changes NO zone/track contract"** clause | `H-r17` | **CARRIED** — no zone vocabulary, no track contract, no `contain` declaration in this unit | §1, `A-17` |
| The amendment's **"no new MCP surface"** obligation row | amendment §"Adopted units' security / equivalence obligations" | **DISCHARGED** as the five-seam negative | §2.2 (prohibition 5), `A-16` |
| The amendment's **per-unit equivalence limits** for `U-OVERLAY`/`U-LISTHOST` (the family this unit joins) | amendment §"Per-unit equivalence limits" | **CARRIED in the shared form**: order is a projection; foreign-sibling survival is a hard row; no equivalence between a placed/visible node and any graph op | §2.5, §7 items 3–4 |
| `H-r8`'s six-prohibition block | `S-d8`, `H-r8` | **DISCHARGED** as a six-row assertion table | §2.2 |
| `H-r5` / `S-d3` (no shim expansion) | `H-r5`, `S-d3` | **INHERITED-ONLY** — the shim is untouched | §1, §4 `S-2` |
| `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` (a mechanism is outside the UI constraint because it is not a UI element) | `docs/decisions.md:54`, read | **CARRIED** — prohibition 2 + `I-4` are this unit's compliance rows | §0 ruling 6, §2.2, §7 item 5 |
| `UI-RENDERED-WITH-PROVIDENT` | `docs/decisions.md:53`, read | **CARRIED** — and it is the reason the publisher half is declined | §0 ruling 1, §7 item 2 |
| `UI-STATIC-MEANS-APP-STATE-DERIVED` (A-d7's ruling row) | `docs/decisions.md:64`, read | **CARRIED** — this unit is the "SLOT HOST: YES" half it names | §0 ruling 5 |
| `RK-10` (`C-16`: contracts reverse-engineered from ONE consumer) | amendment §6 | **CARRIED** — §7 items 7/8 are this unit's answer: seven recorded contract decisions and four deliberately-unruled seeds | §7 items 7–8 |
| `RK-15` (the demo appearance control over-read as production UI — the same over-read risk class) | amendment §6 | **CARRIED** — this unit's `A-20` is the tracker-level version of that risk | `A-20` |
| `H-r10`'s attribute-presence extractor | `H-r10` | **NOT THIS UNIT** (`U-DIVERGENCE-EXT`) — a **named precondition** of the optional attribute-shaped `[U]` variant | §5.2 |
| `REAL-DOM-UI-GATE-LEG` (the shim demoted to pre-filter) | `docs/decisions.md:65`, read | **CARRIED** — a node-suite green is never a real-DOM green | Layer declaration, §5.2 |
| The eight-unit plan's **`U7`**-family provenance (`U-OVERLAY`/`U-PROJ` plan rows) | amendment §"The amended unit plan" | **NOT THIS UNIT** — but the amended plan's **`U-SLOTHOST` row is `U-SLOTHOST`'s own** and its red-set cell is expanded in §3 | §3, §4 |
| Row **D3** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: its spec cell reads `docs/specs/slothost.md` (**OWED — not filed**) — **this filing discharges that cell**; the row stays `BLOCKED` and its *"Publisher half stays DECLINED — do not re-merge"* clause is §7 item 2 | this file |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** — gate 11's mandatory typed Property register for CODE-BEARING units (architect ruling 2026-09-27, `docs/decisions.md`'s ACTIVE row; follow-ups in `docs/pending.md` §G, where **this unit's `§5.5` re-derivation is listed as BLOCKING its red set**) | `docs/decisions.md` (cited by row name, never by line — that file's ledger is appended-to and its line anchors drift); `docs/pending.md` §G | **DISCHARGED BY THIS PASS — `§5.5.1`** is `U-SLOTHOST`'s register: **`6` typed rows** (`3` `P-IM` + `2` `P-SM` + `1` `P-TP`), **no `F-` row**, **no `§6`/`FS-n` citation as a row**, all executed by design as finite enumeration or a pinned-seed generator, **`155` attempts** against the `≤400` total and `≤100`-per-row caps, **no new dependency, no `fast-check`, no fourth leg** — the form the ruling requires and the pilot `docs/specs/listhost.md` `§5.5.1` models. **The read-only PBT audit the ruling also requires is OWED to this unit's adversarial pass** (`§3a`/`§3b`, and `§5.3` item 10's evidence rule) | §5.5.1, §5.5.0 (the superseded exemption kept verbatim), §5.3 item 10, §4.2 item 4, §5.2 |
| The unit's **superseded `§5.5` exemption, its three quantified claims and its strategy-id reading** (this file's pre-ruling form, inherited from `docs/specs/engine-drift.md` §5.5 / `docs/specs/engine-pin.md` §5.5) | this file's own `§5.5` as filed 2026-09-27 | **SUPERSEDED (kept visible at `§5.5.0`)**: the register count `0` → **`6`**; the three claims `NOT EXECUTED — no PBT harness` → **register rows with `S-SH-*` strategy ids**; *"a strategy id here is a repeat-drive label, not a property id"* → **strategy ids are property-execution ids, one per row**; *"register change summary: none"* → `§5.5.1`'s change summary, **which reuses `engine-pin.md` §5.5's type algebra and strategy discipline WITHOUT becoming a second authority over that register** (and **not** being a copy of the pilot's register either) | §5.5.0 (verbatim), §5.5.1 (change summary) |
| `docs/specs/slothost.md`'s entry in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** | this file |
| The `U-SLOTHOST` rows the amendment owes to `docs/pending.md` + `docs/FORKER.md` | `H-r15`'s "artifact that must exist" cell | **NOT THIS UNIT's edit** — tracker rows are the supervisor's/doc-review's pass; recorded here so the obligation is not lost | §5.1 item 4 |
| This file's own **`§7a` ambiguity report — its nine underivable clauses** | this file's `§7a` as written 2026-09-27 (the `§5.5` re-derivation pass) | **RESOLVED BY RULING — `§7a.1` (the `§7a` RULING pass, 2026-09-27): `9` items ruled from the contract's own clauses, `0` OPEN QUESTIONS, and each carries the row TEXT it produces.** Two are **`CONTRACT-AMENDED`** (`F-10`'s four-seam defaults, `§7a` item 4; `F-9`'s pinned `removed` membership, `§7a` item 6) and one is a **type amendment** (`SlotHostRefusal.key` widened to `unknown`, `§7a` item 5); the other six are clarifications/scopings. **The report itself is kept visible** (annotate-never-rewrite). **The delegation gate's blocking list is therefore EMPTY** (`AGENTS.md` item 9) | §7a (verbatim report), **§7a.1** (the rulings), §2.1, §2.5 item 3, §3.2 `F-3`/`F-9`/`F-10`/`F-11`, §3.3 `I-8`/`I-9`, §5.5.1 (its register-row reconciliation + honesty block) |
| The **`§5.5.1` register rows' cells** that declined a half "for want of a ruling" (`P-SH-SM-1`'s fourth code, `P-SH-SM-2`'s sequences 5/7/8, `P-SH-TP-1`'s `F-10` citation) | this file's `§5.5.1` (re-derivation pass) | **RECONCILED — the block "THE REGISTER ROWS' RECONCILIATION WITH `§7a`'s RULINGS"**: **no register row's statement, type, `YES`/`YES (bounded)` marking, strategy id or attempt count changes**, and the **`155`-attempt arithmetic is unchanged**; what changes is which halves a TestWriter may now assert (sequence 5/7's `ok` values, sequence 8's `removed` membership, the `'no-container'` negative, the callback-seam rows moving to `§3.2 F-10` while the register's `20`-shape pool keeps excluding them) | §5.5.1 (the reconciliation block, its honesty block) |

| **THE ARCHITECT'S OPTION-(a) RULING ON THE CONTAINER SOURCE** (2026-09-27, on finding **`ADV-SH-1`**, HIGH) — *the container source is an INJECTED element factory (a new OPTIONAL seam on `SlotHostOptions`); the ambient read is DELETED, not documented; and the static bans are TIGHTENED so the evasion cannot be re-introduced* | the architect's ruling, carried by the adversarial pass's finding `ADV-SH-1` (`src/shared/slot-host.ts:130-140`, read: `globalThis['doc' + 'ument'].createElement('div')` — a property name assembled from two literals, defeating the static token scans) | **RULED AND HONOURED — a `CONTRACT-AMENDED` ruling, not a silence.** The seam is **`SlotHostOptions.containerFactory?: (key: SlotKey) => unknown`**, documented as **the SOLE container source** (accepted shape: *offers `appendChild`* — the same predicate as `isNodeShaped`); **absent (or non-callable, or returning an unusable value) ⇒ the existing `F-6`-class degradation: every operation a valid no-op with a valid state and nothing placeable**; the ambient read is **deleted**; and the bans now read **no ambient global AND no assembled/computed member lookup and no aliased/re-derived global reference**. **⟶ QUALIFIED 2026-09-27 (the `M-14` RECONCILIATION pass, on the TestWriter's remand report; the clause above is kept visible and the ban is NOT weakened): the "assembled/computed member lookup" half is asserted over accesses ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE** (`globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`), **NOT as an unqualified ban on `[expr]`** — a locally constructed object's computed access and ordinary array indexing (`actual[index]`) carry no banned token, are legitimate, and are **deliberately not banned** (`§2.1`'s container-source clause, `§1`'s out-of-scope tightening bullet, `§4.4 S-2`/`S-4`). **Every cell the ruling reaches: `§2.1` (the seam + the container-source clause), `§2.1`'s totality-boundary table (the FIFTH seam, named safe default), `§1`'s out-of-scope list, `§2.2` prohibitions 1 and 2, the Layer declaration anchor 3, `§3.1 M-1`/`M-18`, `§3.3 I-4`, `§3.2`'s per-method container-state table (column (c)) and the new row `F-12`, `§4.4 S-2`/`S-4` (STRENGTHENED, not weakened), `§5.2` (the harness supplies the factory), `§5.5.1` (the pool note: `20`/`60`/`155` unchanged), `§7` items 7/11 and the `§8` rows below.** **Owner chain: the Implementer deletes the ambient read; the TestWriter wires the injected factory and authors `F-12`; the static rows are tightened.** | **§2.1** (the seam + the container-source clause), **§3.2 F-12**, **§3a `ADV-SH-1`**, **§3b**-1, §1, §2.2, Layer declaration, **§3.2** (per-method table), §3.1 `M-1`/`M-18`, §3.3 `I-4`, §4.4 `S-2`/`S-4`, §5.2, §5.5.1, §7 items 7/11, §8 |
| **The `U-SLOTHOST` ADVERSARIAL PASS (read-only) and its FIFTEEN findings `ADV-SH-1`..`ADV-SH-15`** — with the `20` seed rulings (`A-1`..`A-20`), the `17` Implementer judgment calls, the register record (`155/155` executed, nothing stopped early, two broken attempts) and the SIX RED rows | the pass's own report; the cells it cites (the module and the unit file are cited by **SECTION** here — `§2.1`, `§3.1`/`§3.2`/`§3.3`, `§4.4`, `§5.5.1` of this file, and `tests/slot-host.test.ts`'s rows by their `M-`/`F-`/`SH-REG-` ids — **cite by section, never by length**; **⟶ CORRECTED 2026-09-27, the unit's documentation review, finding `F-12`: this cell as-written quoted the two files' LINE COUNTS (`src/shared/slot-host.ts` `607` lines; `tests/slot-host.test.ts` `2983` lines), which is exactly what the caveat in the same cell forbids — the figures are kept visible here as the PRE-FIX measurement and no later pass may re-quote them as current**) | **RECORDED 2026-09-27 (this pass) — the findings, seed rulings and judgment-call rulings are contract text at `§3a`/`§3b`.** **`ADV-SH-1` is `CONTRACT-AMENDED` + the option-(a) ruling** (the row above); **`ADV-SH-2`/`ADV-SH-3` are `OWED-with-owner`** (Implementer: a cyclic-container guard + module-local `WeakMap` bookkeeping) — **⟶ SUPERSEDED 2026-09-27 (the unit's documentation review, findings `F-04`/`F-06`; the as-written pairing is KEPT VISIBLE and its remedy is withdrawn): `ADV-SH-2` is `FIXED`** (the landed `isOneOfOurContainers` refusal in `setNode`, `'malformed-node'`; the spec pin `§3.1 M-20`/`§3.2 F-13` is STILL OWED) **and `ADV-SH-3` is `CLOSED-IN-PLACE`** (no parent marker and no parent bookkeeping — the marker was DELETED, not replaced, and a `WeakMap` is excluded by this unit's own `§4.4 S-4` and `§2.2` prohibition 4) **and `ADV-SH-12` is `PARKED-with-revisit-condition`**; **`ADV-SH-5`/`ADV-SH-6`/`ADV-SH-7`/`ADV-SH-8` are `FIXED-this-pass`** (owner = this pass for `ADV-SH-6`'s cell text, the TestWriter for `5`/`7`/`8`); **`ADV-SH-9` is `ACCEPTED-AS-PINNED`, `ADV-SH-10`/`11`/`15` `NOT-A-FINDING`, `ADV-SH-13` `RESOLVED-BY-PINNING`, `ADV-SH-14` `OWED` to the TestWriter** (*⟶ **`FIXED-this-pass` 2026-09-27, the unit's documentation review, finding `F-05`: the NON-SELF-CATCHING drive LANDED** — `tests/slot-host.test.ts`'s `M-17` third half replaces the self-catching rejection with an **instrumented thenable** whose `then`/`catch`/`finally` observations are counted, asserting `observations === 0` and `settledRejected === true`, so the row is now falsifiable; the as-written `OWED` marker is kept visible here*); and **`ADV-SH-4` is folded into `ADV-SH-1`'s fix.** **ALL SIX RED ROWS ARE RULED TEST-SIDE, with no code defect among them**, and **the TestWriter remand is COUPLED to the injected-factory wiring** (`§5.2`). **`ADV-SH-15` finds NO package defect: nothing is owed to `docs/defects.md` or `docs/HANDOFF.md` by this unit.** **The unit is NOT green and NOT `DONE`** (`§7` item 11) — **⟶ SUPERSEDED 2026-09-27 (the unit's documentation review; the as-written clause is KEPT VISIBLE as the ADVERSARIAL PASS's state): the green has since LANDED** — `tests/slot-host.test.ts` **`61` rows, all green**; the register `§5.5.1` **`155/155` held, `0` broken, nothing stopped early**; the trio green (all of it stated with its layer limits in the status region's green note above) — and **the unit's `DONE` row is OWED BY THE SUPERVISOR, not written here.** | `§3a`, `§3b`-1, `§3b`-2, **§2.1**, **§3.2 F-12**, §3.1 `M-19`, §3.3, §4.4, §5.2, §5.5.1, §7 item 11 |

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor cited
above was **read in this pass** (`src/main/security.ts:134`; `src/shared/types.ts:259-281`;
`src/renderer/renderer.ts:12`; `src/main/mcp-server.ts:281-303`; `src/shared/dom-shim.ts` — 143
lines, `:1-3`, `:12`, `:30-39`, `:89-96`; `package.json:10`, `:19`, `:26-31`;
`tests/engine-pin-version.test.ts:174-197`; `docs/decisions.md:53`, `:54`, `:64`, `:65`).
**`docs/next-steps.md` is cited by row id only** — that file's own convention forbids line
citations. **`docs/decisions.md` is 406 lines today** and its ledger is split into labelled appended
blocks plus `## HISTORICAL` (`:230`), `## SPECULATIVE / IN GATE` (`:288`) and `## AMENDMENTS TO
PRE-EXISTING ACTIVE ROWS` (`:294`) to `:406` — so a bare `decisions.md:<n>` from an earlier layer
**must be resolved against the live file before it is quoted**, which is what this spec did.

**⟶ PRE-FIX-ANCHOR RULE, ADDED 2026-09-27 (the unit's documentation review, finding `F-12`; every sentence
above is KEPT VISIBLE and UNCHANGED): every `src/**`/`tests/**` line anchor cited ANYWHERE in this file —
the day's passes' anchors in the status region, `§1`, `§2.1`, `§3a`, `§3b`-1/`-2/`-3, `§5.5.1` and `§8`'s
rows (`src/shared/slot-host.ts:130-140`, `:152-156`, `:167-170`, `:216-224`; `tests/slot-host.test.ts:1528-1544`,
`:1602`, `:1626-1634`, `:2197-2201`) — is the PRE-FIX measurement of the pass that read it.** `src/shared/
slot-host.ts` was **REWRITTEN** under `ADV-SH-1` (the container source became the injected `containerFactory`
seam, the ambient read was deleted, the static rows were tightened) and the unit file **grew** with the green,
so **most of those ranges no longer address the same text and must not be quoted as current: re-resolve an
anchor against the live file before quoting it, or cite the CLAUSE (`§`-section plus row id), never the
line.** **The rule is the file's own — *cite sections, never lengths* — and it covers this paragraph's own
figures too:** `docs/decisions.md`'s *"406 lines today"*, the `:230`/`:288`/`:294` to `:406` block anchors and
`src/shared/dom-shim.ts`'s *"143 lines"* above are **that pass's** readings of files that have since grown,
and the `§8` adversarial row has been re-worded to cite sections instead of the two line **COUNTS** it
previously quoted. **This pass re-pins NO anchor and rewrites no cell: it states the rule, as the review
recommends, rather than re-pinning every citation.**

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates one new spec file and edits no existing document. **Row D3's spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded so the staleness
is attributable rather than silent. **⟶ FLIPPED 2026-09-27 (the handover-staleness pass): `D3`'s spec cell
now reads `FILED 2026-09-27`**, so the sentence above describes the filing pass's own state and nothing current.

**⟶ ARCHIVAL-LOOP CHECK FOR THIS PASS (2026-09-27, the `§5.5` re-derivation; added here so the
scope is auditable, and it does not change the filing-time paragraph above).** This pass
**archives, moves and repoints NOTHING** (`AGENTS.md` item 6): it edits **this one spec file** by
**bounded anchored `edit`s** (never a whole-file write, `RCA-8(c)`), under **annotate-never-rewrite**
(the superseded exemption and every superseded cell stay visible with a dated reason), with **no
section number moved** and **no tracker row touched** — the trackers are the supervisor's files
(`docs/pending.md` §G's `slothost` row is the supervisor's to mark DISCHARGED, exactly as
`docs/decisions.md`'s row and `docs/next-steps.md`'s `D3` cell are). **It ran no test, no suite, no
leg and no trio**, touched no `tests/**`, `src/**`, `scripts/**` or `package.json`, and made no
commit. **What it changed: `§5.5`'s heading + two dated SUPERSEDED banners; the new `§5.5.0`
heading for the exemption kept verbatim; the new `§5.5.1` register (its strategy discipline, six
rows, its honesty block, its attempt arithmetic and its change summary); the status region's new
note; `§0` ruling 7's annotation; the Layer declaration's new quantified-claims clause; `§1` item 3;
`§4.2` item 4; `§4.4`'s annotation; `§4.5`'s annotation; `§5.2`'s property-layer + typecheck-caveat
block; `§5.3` item 10; `§7` item 1's annotation; the new `§7a` ambiguity report; and two `§8`
rows** — **nothing else, and no normative clause weakened.** **A line-count census is deliberately
NOT claimed here**: a census drifts on every pass (the rule the wave-D specs have each had to
reconcile), so a citation should name this file's **sections**, never its length.

**⟶ ARCHIVAL-LOOP CHECK FOR THE `§7a` RULING PASS (2026-09-27; added here so the scope is auditable
and it does not change either paragraph above).** This pass **archives, moves and repoints NOTHING**
(`AGENTS.md` item 6): it edits **this one spec file** by **bounded anchored `edit`s** (never a
whole-file write, `RCA-8(c)`), under **annotate-never-rewrite** (every superseded clause, row cell and
type declaration stays visible with its date and reason), with **no section number moved**
(`§7a.1` is a sub-heading of `§7a`) and **no tracker row touched** — the trackers are the
supervisor's files, and **the tracker-side obligations this pass creates are named for their owner,
not silently assumed: `docs/pending.md` §G's `slothost` row (its `§5.5` re-derivation item is
DISCHARGED and its gate-11 follow-ups now include the ruling pass's effect on this file's red set),
`docs/next-steps.md`'s `D3` row (its `Blocked on` cell loses the underivable-clause blocker and keeps
the red-set one), and `docs/decisions.md` needs NO edit (its `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`
row's standard is met; this pass added no rule to it).** **It ran no test, no suite, no leg and no
trio**, touched no `tests/**`, `src/**`, `scripts/**` or `package.json`, and made no commit. **What it
changed: the status region's new note; `§2.1` (`SlotHostRefusal.key`'s widening, the `code` field's
comment, the NEW refusal-code-domain clause, the NEW totality-boundary clause with the four named safe
defaults); `§2.5` item 3's layer ruling; `§3.1`'s rows `M-1`, `M-16`, `M-18`; `§3.2`'s rows `F-3`,
`F-5`, `F-6`, `F-7`, `F-9` (amended), `F-10` (amended), the NEW row `F-11`, the NEW per-method table
and the NEW `containerFor` observables clause; `§3.3`'s invariants `I-8` and `I-9`; `§4.2` item 1's
enumeration; `§5.5.1`'s NEW register-row reconciliation block and its honesty block; `§7` items 8 and
9; `§7a`'s NEW `§7a.1` rulings table; `§3a A-5`'s disposition; and two `§8` rows** — **nothing else,
no `§3` drive changed, no register statement/type/count changed, and no normative clause weakened.**
**A line-count census is deliberately NOT claimed here** for the same reason the paragraph above
gives: cite this file's **sections**, never its length.

**⟶ ARCHIVAL-LOOP CHECK FOR THE `U-SLOTHOST` RED PASS (2026-09-27; added here so the scope is
auditable and it changes neither paragraph above).** This pass **archives, moves and repoints
NOTHING** (`AGENTS.md` item 6): it edits **this one spec file** by **bounded anchored `edit`s** (never
a whole-file write, `RCA-8(c)`) — **every edit anchored on text this pass had read first, and no line
of any cell replaced wholesale** — under **annotate-never-rewrite** (every superseded clause and cell
form stays visible with its date and reason), with **no section number moved**, **no register row's
drive/expectation/strategy id/attempt count changed**, **the `155` total unchanged**, and **no tracker
row touched** — the trackers are the supervisor's files, and the tracker-side obligation this pass
creates is named for its owner rather than assumed: **`docs/next-steps.md`'s `D3` row (its `Blocked on`
and status cells now have a RUN and REPORTED red set plus an owed Implementer pass) and this unit's
DONE row (still owed), with `docs/decisions.md` needing NO edit and `docs/pending.md` §G's `slothost`
row belonging to the supervisor.** **It ran no test, no suite, no leg and no trio — the RUN it records
is the TestWriter's red run, reported to this pass, not a run by this pass** — and it touched no
`tests/**`, `src/**`, `scripts/**`, `package.json` or tracker, and made no commit. **What it changed:
the status region's new `RED PASS` note; `§4.2` item 4's close; `§5.5.1`'s `P-SH-SM-2` cell (two dated
notes) and `P-SH-TP-1` cell (one dated note); `§5.5.1`'s honesty item 3; and the NEW `§5.5.1`
executed-red block (its measured table, its four rulings and its tool-ceiling note)** — **nothing
else, no `§3` drive changed and no normative clause weakened.** **A line-count census is deliberately
NOT claimed here** for the same reason the two paragraphs above give: cite this file's **sections**,
never its length.

## 3a. Adversarial findings — **the pass HAS RUN (2026-09-27, read-only adversarial + PBT audit); the as-filed status is kept below and the per-seed rulings are IN each row**

**Status as filed: `OWED`. No adversarial pass has run for `U-SLOTHOST`** (this pass is the
spec-filing pass; the unit is BLOCKED on its go-ahead and its red set, so there is no green to review
— RCA-3 runs *after* a unit's green). **This table is the SEED SET for the pass that will run; no row
below is a finding, and none may be cited as one.**

**⟶ STATUS OF THIS SECTION, 2026-09-27 — THE `U-SLOTHOST` ADVERSARIAL PASS HAS RUN, and this section
is no longer `OWED`: FIFTEEN findings (`ADV-SH-1`..`ADV-SH-15`) and the per-seed rulings for ALL `20`
SEEDS (`A-1`..`A-20`) are recorded below, with the findings, the `17` Implementer judgment calls, the
register record and the six red rows disposed of in `§3b`.** The pass was **READ-ONLY** (an adversarial
review plus a PBT audit); it **changed no `tests/**` and no `src/**` file** and it **returned findings
and rulings**. **What it reported about the unit, recorded AS REPORTED** (`§7` item 11): the register's
six `§5.5.1` rows **executed `155` of `155` attempts with NOTHING STOPPED EARLY**, with **two broken
attempts** (`P-SH-SM-1` `11/12`, `P-SH-SM-2` `7/8`); **`6` rows RED** (`M-14`, `M-17`, `F-7`,
`P-SH-SM-1`, `P-SH-SM-2` sequence 5, `S-5`), **ALL SIX ruled TEST-SIDE**; and **the unit is NOT green
and NOT `DONE`** — **the container source is being reworked under the architect's option-(a) ruling**.

**⟶ ALL TWENTY SEEDS ARE RULED AS OF 2026-09-27 (ADDED this pass).** The rulings are appended **in each
seed's own row** (never rewritten), because **silence about a seed is a review finding**. The counts,
so no seed is unaccounted for: **`ACCEPTED-AS-PINNED` — `A-1`, `A-2`, `A-3`, `A-4`, `A-6`, `A-7`,
`A-9`, `A-11`, `A-13`, `A-14`, `A-15`, `A-16`, `A-17`, `A-19`, `A-20` (`15` seeds); `CONFIRMED-RULED` /
`CONFIRMED` — `A-5` (`CONFIRMED-RULED`, with a rejected-promise drive owed) and `A-12` (`CONFIRMED` for
containers); `OWED-with-owner` — `A-8` (= `ADV-SH-2`, the Implementer); `NOT-A-FINDING` — `A-10`,
`A-18` (`2` seeds).** **`15 + 2 + 1 + 2 = 20`, and every seed's row carries its ruling.** **⟶ ONE DISPOSITION MOVED 2026-09-27 (the unit's documentation review, finding `F-04`; the `15 + 2 + 1 + 2 = 20` accounting above is the ADVERSARIAL PASS's own count and is KEPT VISIBLE and unchanged): seed `A-8`'s code-side work LANDED** — `ADV-SH-2` is **`FIXED`** (the landed `isOneOfOurContainers` refusal in `setNode`, `'malformed-node'`), so its `OWED-with-owner` cell reads `FIXED` today and **the item still owed on that seed is the SPEC PIN alone** (`§3.1 M-20`-shaped / `§3.2 F-13`-shaped appended negative row). **Every other seed's ruling is unchanged and no seed is un-ruled; the count itself does not move (`20` seeds, `20` rulings).** **Where the
rulings touch the register:** `§5.5.1`'s honesty block cites the **callback-throwing boundary**
(`P-SH-TP-1`'s pool, seeded by `A-5`) and the **detached-node `removed` membership** (`P-SH-SM-2`
sequence 8, seeded by the `F-9` half), **and neither is re-opened by this pass**; **`A-18` is the
`NOT-A-FINDING` that keeps the two wave-D registers from sharing a row, a table, a pool or an id** (the
count line above mistakenly named `A-18` as an honesty-block citation — corrected here, with the
miscount left visible). **`A-8`'s `OWED` marker is the only seed with unfinished code-side work, and it
names its owner.** **⟶ CORRECTED 2026-09-27 (the unit's documentation review, finding `F-04`; the as-written
sentence above is KEPT VISIBLE and is FALSE of the tree today): `A-8`'s CODE-side work is no longer
unfinished — the Implementer's guard LANDED (`isOneOfOurContainers`, called from `setNode`, refusing a
container handed back as a node with the existing `'malformed-node'` code), so `A-8` is `FIXED` on its code
half; what remains owed is the SPEC PIN — a row asserting that refusal and that the tree never becomes cyclic
(`§3.1 M-20`-shaped / `§3.2 F-13`-shaped). No other seed has code-side work outstanding, and `A-8`'s pin is
the only seed-side item still owed a ROW.**

**⟶ THE PASS'S FINDINGS ARE DISPOSED IN `§3b`, NOT REPEATED ROW-BY-ROW IN THIS TABLE.** The fifteen
`ADV-SH-*` findings, the `17` judgment calls, the register record and the red-row rulings live in
`§3b`'s tables; this section keeps the **seed table** as the pass's work list, with each seed's final
ruling appended in its own row. **A reader looking for a finding's disposition, owner and the clause it
changed goes to `§3b`; a reader looking for a seed's fate reads the row below.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | **THE RE-MERGE PROBE (the unit's defining hazard, `H-r15`):** does any code path, symbol, literal, default or test row introduce a **`publish`**, a status text, a label, a badge, an `is-empty`/`is-minimized`/`is-revealed` class, a slot *model*, or a per-zone/per-pane semantic? **Any positive is a blocking finding.** **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — NO positive: the module's source carries no `publish`-shaped export, no status text, no label, no `is-*` class literal, no slot model and no per-zone/per-pane semantic, and the pass found no row asserting one. The code's observed behaviour IS the pinned reading (`§2.2` prohibitions 1/2, `§3.3 I-4`), and the probe is recorded CLEAN rather than silently assumed.** | static + `[T]` |
| **A-2** | An undeclared key tried by **every** entry point (`setNode`, `remove`, `setOrder`, `containerFor`) — is a container ever created, or a key ever added to the host's set? **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — no container is ever created for an undeclared key and no key is ever added to the host's declared set.** `setNode`/`remove` on an undeclared key are `'unknown-key'` with the injected container's child count unchanged (`F-1`), `setOrder` IGNORES an undeclared key without refusing (`M-15`), and `containerFor` returns **`null`** as a read, not a refusal (`F-5`) — which is the code's observed behaviour and therefore the pinned reading. | `[T]` |
| **A-3** | A declared key set containing **duplicates** (`['a','a']`) — one container or two? **Must be ruled explicitly** (this spec does not decide it) **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — the FIRST OCCURRENCE WINS.** *"Duplicate declared keys ⇒ first occurrence wins"*: the declared set is built by filtering to strings and **de-duplicating on first sight**, so `keys: ['a','a']` declares **one** key and creates **ONE** container, and the second occurrence is dropped without a refusal (`§2.1`'s container-source clause's "one container per declared key", `I-2`'s "each key once", `M-1`). **The code's observed behaviour IS the pinned reading.** | `[T]` |
| **A-4** | A declared key set containing `''`, whitespace, unicode and a very long key — all opaque, all must work identically; a row asserts **no normalization** anywhere **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — all four shapes work identically and nothing normalizes them.** The key is opaque: `''` **may** be declared and then works (`F-3`'s two halves), and whitespace/unicode/very-long keys are compared by **equality only** — no prefix, no trim, no case fold, no enumeration (`§2.3` item 1, `SlotKey`'s doc string, `I-2`). **The code's observed behaviour IS the pinned reading.** | `[T]` |
| **A-5** | A **throwing** `classNameOf`/`attributesOf` (caller code) and a `refuse` callback that **returns a rejected promise** — does the host swallow, propagate, or corrupt its state? **`F-10` is deliberately unruled: the pass must rule it and record the ruling here.** **⟶ RULED 2026-09-27 (the `§7a` RULING pass, `§7a` item 4; the as-written seed is kept visible): `F-10` IS NO LONGER UNRULED — `§2.1`'s totality-boundary clause names the SAFE DEFAULT of each of the four injected functions (a throwing `orderOf` ⇒ the supplied `keys` order · a throwing `classNameOf` ⇒ no class write, `M-11` · a throwing `attributesOf` ⇒ no attribute write, `M-11` with `F-8` unchanged · a throwing `refuse` ⇒ swallowed with the refusal already recorded, `M-17`), and the `§3.2` row `F-10` is a normal falsifiable row. **What the adversarial pass still owes on this seed is narrow and named: confirm the landed behaviour matches the four defaults, and rule the seed's `refuse`-returns-a-rejected-promise half** (`§2.1` states the return value and any promise are IGNORED — a rejected promise must therefore be an unobserved rejection and must not change a refusal's outcome; that half is stated in `§2.1` but is NOT yet driven by a row, so it is a legitimate `[T]` row for this pass to author).** **⟶ FINAL 2026-09-27 (the adversarial pass): `CONFIRMED-RULED` — the landed behaviour matches ALL FOUR named safe defaults** (a throwing `orderOf` ⇒ the supplied `keys` order; a throwing `classNameOf` ⇒ no class write; a throwing `attributesOf` ⇒ no attribute write; a throwing `refuse` ⇒ swallowed with the refusal already in `refused`), and the host **never re-throws** caller code. **The rejected-promise half is ruled BY THE CLAUSE and is OWED A DRIVE:** `§2.1` states the listener's return value and any promise it returns are **IGNORED**, so a rejected promise must be an **unobserved rejection** that changes no refusal's outcome — **and the pass found that the row as authored CANNOT surface a violation** (`M-17`'s drive self-catches its own rejected promise, so a host that awaited it would still pass). **Owner = the TESTWRITER: add a NON-SELF-CATCHING drive** (`ADV-SH-14`) that would fail if the host awaited, re-threw or let the rejection escape. | `[T]` |
| **A-6** | The **same caller node** supplied for **two declared keys** in sequence (M-9 covers one step) and **in one render** — what is placed, and is it a refusal? **Must be ruled explicitly** **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — the node is MOVED, not refused.** A node supplied for a second declared key is **removed from the first key's container and placed in the second** (the old key is CLEARED, the new key PLACED, **not a refusal**), and **the move is NOT reported in `removed`** — the move ends no ownership, it relocates one (`M-9`'s one-node-one-key-one-container rule, `§2.4` item 6). The code's observed behaviour IS the pinned reading. | `[T]` |
| **A-7** | Two **host instances** over the **same** injected container — is ownership isolated per instance, and can one instance remove the other's containers? **Must be ruled explicitly** **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — OWNERSHIP IS PER-INSTANCE.** Each host owns exactly the containers it created and exactly the nodes it placed; a second host neither owns nor removes the first host's containers **and treats them as foreign siblings** — it never touches, removes or reorders them (`§2.4` items 1–3, `I-3`). **The code's observed behaviour IS the pinned reading**, and it is the same isolation the sibling unit records at its own two-hosts-one-mount seed. | `[T]` |
| **A-8** | A caller node that is **itself a container** the host created (node/container aliasing) — infinite recursion or a clean refusal? **⟶ OWED-WITH-OWNER 2026-09-27 (the adversarial pass; finding `ADV-SH-2`, MED): `OWED-with-owner` — the finding is REAL and the fix is NOT in this spec's current text.** `isNodeShaped` accepts **anything offering `appendChild`**, so `containerFor('a')` is admissible as a node; `holds(container, container)` is **false** (an element is not its own child), so `setNode('a', containerFor('a'))` **appends the container INTO ITSELF — the tree becomes CYCLIC**, and the shim's `outerHTML`/`innerHTML` serialization then recurses without bound. **Owner = the IMPLEMENTER: a guard that refuses (or ignores) a container passed back as a node, plus a spec PIN**; the row that pins it is owed (`§3` addition, `ADV-SH-2`'s disposition in `§3b`-1). **This seed is the only one of the twenty whose code-side work is unfinished.** **⟶ FINAL 2026-09-27 (the unit's documentation review, finding `F-04`; the as-written cell above is KEPT VISIBLE and is the ADVERSARIAL PASS's state): the guard LANDED and this seed's hazard is CLOSED.** `isOneOfOurContainers(node, records)` — called from `setNode` before anything is attached — **refuses a container handed back as a node with the existing `'malformed-node'` code**, so `setNode('a', containerFor('a'))` can no longer append the container into itself and the cyclic tree this seed measured cannot form; the host stays in a valid state and **no method throws**. **What is still OWED on this seed is its SPEC PIN, not its code:** an appended negative row (`§3.1 M-20`-shaped / `§3.2 F-13`-shaped) asserting that the refusal happens and that the tree never becomes its own descendant — `M-19` (the detach-is-permanent pin) and `F-12` (the factory seam) do not cover that drive. **`A-8`'s `OWED` marker is therefore `FIXED` on its code half and `OWED`-for-the-pin only.** | `[T]` |
| **A-9** | An injected container that is **already a child of another** host container, or that is the host's own container for a key **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — no throw, no dangling ownership, and the host's own bookkeeping decides.** A container that is already some other element's child is **appended where the host needs it** (the shim's `appendChild` re-parents and removes the prior membership, `src/shared/dom-shim.ts:22-28`, read), and a container that IS the host's own container for a key is treated by the host as one of its own — the projection, the child-reference sequence and `dispose()` are unaffected, and **no call throws** (`I-8`). **The code's observed behaviour IS the pinned reading**; the composition hazard (a nested host container) is a CONSUMER choice, not a host defect. | `[T]` |
| **A-10** | `attributesOf` returning `name` values that collide with the node's **existing** attributes, with `id`, with a `data-*`, and with a duplicate name inside the array **⟶ FINAL 2026-09-27 (the adversarial pass): `NOT-A-FINDING` — raised, examined, and consistent with the contract's own clauses.** A later entry for the same name **wins** (`§2.5` item 5, the shim's last-write-wins `setAttribute`), a colliding `id` is written through the shim's `id` SLOT (the shim's own documented slot/store split, `src/shared/dom-shim.ts:30-39`, read), a `data-*` name is written verbatim, and a duplicate inside the array is simply the last write. **All of it is verbatim application with NO validation, NO default and NO prefix (`§2.5` item 4, `M-6`)** — the shapes are the caller's data, not a contract question. | `[T]` |
| **A-11** | `attributesOf` returning a value of every primitive type (`string`/`number`/`boolean`) and a non-primitive (`{}`/`[]`/`null`) — what is written, and is a malformed entry skipped? **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — the three primitives are written and every non-primitive entry is SKIPPED without failing the call.** A `string`/`number`/`boolean` value is applied verbatim and a non-primitive (`{}`/`[]`/`null`), a missing `name`, or a non-string `name` is **skipped per entry**, while the well-formed entries of the same array are still applied and `ok` is NOT forced `false` (`F-8`, `§2.5` item 4/5, `M-6`). **The code's observed behaviour IS the pinned reading.** | `[T]` |
| **A-12** | An injected container whose `appendChild` **throws** on the 2nd call — is the host left in a valid state, and is the failure reported (it must **not** throw out of a method)? **⟶ CONFIRMED 2026-09-27 (the adversarial pass): `CONFIRMED` FOR CONTAINERS — no throw escapes, and the container class's failure is REPORTED as `'container-not-appendable'`.** A `container` whose `appendChild` throws is the **present-but-unusable** shape (`F-7`): the host catches the throw, reports **one `'container-not-appendable'` refusal per attempted node write**, stays in a valid state, and returns its declared result — never a throw out of any method (`§3.2`'s per-method table, `I-8`). **What the pass does NOT extend this to:** a CALLER-SUPPLIED `appendChild` that throws **mid-call**, where the host's bookkeeping has already been rewritten — that half is `ADV-SH-12`, `PARKED-with-revisit-condition`, and is **not** ruled here. *(The new column (c) of the per-method table and the row `F-12` are the FACTORY seam's; this seed's ruling is about the injected CONTAINER.)* | `[T]` |
| **A-13** | A caller **detaches** a host container, then the host is asked to remove/re-place a key — no throw, no dangling ownership? **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — no throw and no dangling ownership.** A caller-detached host container is simply not in the injected container's children: the host's next `render()`/order write **re-appends it** (it is one of the host's own containers — **unlike a caller-detached NODE, which is NOT re-appended**: `§3.1 M-19`), `remove(key)` still ends the ownership and reports the node in `removed` (`F-9`), and `keys()` still shows the key declared (`M-12`). **The code's observed behaviour IS the pinned reading — and the container/node asymmetry is a contract decision recorded at `ADV-SH-12`.** | `[T]` |
| **A-14** | **Static/unauthorized-access sweep:** `querySelectorAll`/`querySelector`/`closest`/`getElementById`/`matchMedia`/`activeElement`/`getComputedStyle`/`document`/`window`, any `src/renderer/**` import, any `electron`/`node:fs`, any store, any module-level mutable state, any `publish`-shaped export. **⟶ SWEPT, AND THE SWEEP FOUND THE `ADV-SH-1` EVASION — `ACCEPTED-AS-PINNED` for everything else, `CONTRACT-AMENDED` for the container source.** The module imports **nothing**, keeps **no module-level mutable state**, persists nothing, touches no renderer/main/electron/fs surface, and exposes exactly the seven `§2.1` names. **But the sweep ALSO found the ambient read**: `globalThis['doc' + 'ument'].createElement('div')` (`src/shared/slot-host.ts:130-140`, read this pass) — a **property name assembled from two literals**, which is why the pass records that **a token-only static scan is NOT sufficient** and that this seed's own sweep must carry the anti-assembly clause (now `§2.2` prohibitions 1/2, `§4.4` `S-2`/`S-4`). **`ADV-SH-1` is that finding; `ADV-SH-4` records the two now-false ambient claims it falsified.** | static |
| **A-15** | **Vocabulary sweep:** `zone`/`pane`/`tab`/`region`/`is-empty`/`is-minimized`/`is-revealed`/`status` in any spelling; any **closed string union** of consumer values; any documented consumer constant. **⟶ SWEPT CLEAN + ONE WORDING FINDING 2026-09-27 (the adversarial pass; `ADV-SH-4`): `ACCEPTED-AS-PINNED`** — the module carries **no** occurrence of that vocabulary, **no** closed string union of consumer values (the only string-union is `SlotHostRefusal['code']`'s **four** contract diagnostics, of which **three** are emitted), and **no** documented consumer constant; the module ALSO carries **no `document`/`window` token** — **which is exactly the point of `ADV-SH-1`: the token's ABSENCE was not evidence, because the ambient read was assembled to defeat the scan.** | static |
| **A-16** | The five-seam sweep: any new tool/resource/group/`VALID_GROUPS` member/`RpcMethod` member/`MUTATING_METHODS` entry/IPC method? Does `tests/engine-pin-version.test.ts`'s 21-member census still pass **unchanged**? **⟶ SWEPT CLEAN 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED`** — **no new MCP surface of any kind**, the module imports nothing from `src/main/**`/`src/renderer/**`/`shared/types`, and the pinned counts are **unchanged**: `RpcMethod` **21**, `ALL_TOOLS` **21**, `MUTATING_METHODS` **7**, `VALID_GROUPS` **5**. **The `S-5` row that asserts this census is one of the SIX RED rows and its fault is TEST-SIDE (`ADV-SH-5`): the assertion counts GROUP LITERALS in `tests/engine-pin-version.test.ts` by a line regex over a file that holds them inline, so it is self-referential — the census itself is clean.** **⟶ ANNOTATED BESIDE 2026-10-04 (THE `SLOT-HOST-ENVELOPE-AUTHORED-CONTAINER-SOURCE` GATE-1 DOCS-ONLY DISPOSITION; `RCA-8(d)` — the as-filed `21`/`21` above is KEPT VISIBLE and is NOT rewritten, and this row's `ACCEPTED-AS-PINNED` disposition stands): the `ALL_TOOLS` figure it quotes has SINCE DRIFTED — the live listing reads **`22`** (`provident.focus`, added by a LATER unit; `src/main/mcp-server.ts:364-387`) and this unit's own live row asserts **`22`** (`tests/slot-host.test.ts:3042`) — so **the `21` here is stale as a LIVE figure while remaining correct as THIS PASS's dated reading at 2026-09-27**, which is how the row's own sweep must be read. `MUTATING_METHODS` **7** and `VALID_GROUPS` **5** are unchanged. The repo-wide sweep is CARRIED AS `OWED` (`docs/pending.md` `§N` row `O-3`; `170` hit sites across `20+` `docs/**` files).** | `[H]` + static |
| **A-17** | **The `SCH-10`/`SCH-4` resurrection probe:** does the host grow a class taxonomy, a token, a track/zone concept, a `contain` declaration, or an emptiness rule under a new name? **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED`** — **no resurrection**: no class taxonomy, no token, no track/zone concept, no `contain` declaration and no emptiness rule exists in the module, and the "empty slot" model the publisher half would have added has **no member of any kind** (`§1` item 2, `§2.2` prohibition 1, `H-r15`). **This probe and `A-1` are the two the disposition table marks `BLOCKING — RE-MERGE` if positive; both are negative.** | static + `[T]` |
| **A-18** | **Cross-unit boundary:** does this unit duplicate any `U-LISTHOST` responsibility (list ordering, activate/close callbacks) or any `U-PROJ` responsibility (variable values), or does `U-LISTHOST` duplicate this unit's per-key containers? **Duplication is a FINDING** — the wave-D units share one layer idiom and must not share one contract. **⟶ NOT-A-FINDING 2026-09-27 (the adversarial pass)** — no responsibility is duplicated across the boundary: this unit has **no** activate/close callback, no entry/list model and no variable-value surface, `U-LISTHOST` owns no per-key containers, and the two share the **layer idiom and the strategy discipline only** (their registers share no row, table, pool or id — `§5.5.1`'s change summary states the same). **Recorded with its reason rather than left silent.** | static + `[T]` |
| **A-19** | **Content-leak probe (the `(C)#2` boundary):** can a caller's **node** be made to carry host-authored text through any code path (a default text node, a fallback label, an empty-state string)? **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED` — no path carries host-authored content.** The host writes **no** `textContent`, **no** default node, **no** fallback label and **no** empty-state string; the only writes to a caller's node are the **caller-supplied** class value and attribute entries, applied verbatim (`§2.2` prohibition 2, `I-4`, `M-6`/`M-11`), and the containers the host projects are **empty** (`M-1`). **The code's observed behaviour IS the pinned reading.** | `[T]` |
| **A-20** | **The declined-half boundary at the TRACKER level:** does any doc row (this file, `docs/pending.md`, `docs/FORKER.md`, `docs/next-steps.md`) read as if the carrier/publisher half were adopted? **⟶ FINAL 2026-09-27 (the adversarial pass): `ACCEPTED-AS-PINNED`** — every doc row that names this unit keeps the split explicit: the publisher/carrier half is **DECLINED**, the queue row carries the permanent prohibition verbatim, and `§7` item 2 states it as the unit's defining constraint; **no tracker row reads as an adoption, and the pass found no such sentence to correct.** **CLEAN, and recorded as the `BLOCKING — RE-MERGE` probe's negative half.** | static (docs) |

## 3b. The adversarial pass's disposition table — **LANDED 2026-09-27: the fifteen findings, the seventeen judgment calls and the register record, with the filing's "shape this contract will be reconciled to" kept below**

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a host finding, **fixed here + regression-tested** as a new §3 row |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** (`A-3`/`A-6`/`A-7`/`A-5`/`F-10` are the named candidates) — the spec is amended with the old text kept as `SUPERSEDED`, and the row lands in §3 |
| **BLOCKING — RE-MERGE** | `A-1`/`A-17`/`A-20` returning positive: **the unit does not land** until the publisher/zone semantics are removed |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; the package is never patched |
| **NOT-A-FINDING** | raised, examined, recorded with the reason |
| **OWED** | raised and **not yet resolved** — the pass may not report done with an `OWED` row |

**Status of the table itself: `OWED` — empty by construction.** **A DONE row that cites no adversarial
pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3).

**⟶ STATUS OF THE TABLE ITSELF, 2026-09-27 — IT IS NO LONGER EMPTY AND THE PASS IS NO LONGER `OWED`
(the sentence above is the filing state, kept visible).** The `U-SLOTHOST` adversarial + PBT-audit pass
**ran** (read-only) and its findings, seed rulings, judgment-call rulings and register record are the
tables below. **The disposition vocabulary above is EXTENDED by FIVE statuses this pass used**, on the
record so a reader is not left with an undefined word — the same extension the sibling unit's table
carries (its own words, its own rows): **`FIXED-this-pass`** (the pass's own token: the finding's fix is
**mandated and OWNED** — for a HOST finding the fix and its regression row are owed to the
Implementer/TestWriter passes that follow, so the token names *what was decided and who owes it*, not
work this read-only pass performed); **`ACCEPTED-AS-PINNED`** (a behaviour examined and ruled
**CORRECT**, with **the code's observed behaviour as the pinned reading** — the `CONFIRMED-RULED` half
made explicit); **`PARKED-with-revisit-condition`** (a reading **deliberately left unpinned**, with the
condition that reopens it **NAMED** in the row); **`OWED-with-owner`** (`OWED`, with a named owner that
is **not** this pass); and **`RESOLVED-BY-PINNING`** (a question closed by **pin text this spec now
carries**, rather than by a code change). **`HANDOFF` remains UNUSED — and that is a finding's result,
not an omission:** `ADV-SH-15` records that this unit found **no package defect**, so nothing is owed to
`docs/defects.md` or `docs/HANDOFF.md` by it (`AGENTS.md` item 7's handoff rule is satisfied by the
negative).

#### `§3b`-1 — the FIFTEEN `ADV-SH-*` findings, their severity, disposition, owner, and the clause each one changed

| ID | Sev. | The finding, in one line | Disposition | Owner | What it changed, and where |
| --- | --- | --- | --- | --- | --- |
| **`ADV-SH-1`** | **HIGH** | **The evasion: the module reaches the ambient DOM through an ASSEMBLED property name.** `elementFor()` calls `globalThis['doc' + 'ument'].createElement('div')` (`src/shared/slot-host.ts:130-140`, read this pass) — the property name is built from two literals **precisely so the static token scans cannot match it** (`S-2`'s `/document/i` and `S-4`'s word-boundary list both miss it). It therefore **evades `§1`'s "no `document`/`window` reference" clause, `§2.2` prohibition 1's static source row, and the Layer declaration's "reads no ambient global"** — the module does the banned thing and hides the token. | **`CONTRACT-AMENDED` + the ARCHITECT'S OPTION-(a) RULING** — *the container source is an INJECTED element factory (a new OPTIONAL seam on `SlotHostOptions`); the ambient read is DELETED, not documented; and the static bans are TIGHTENED so the evasion cannot be re-introduced.* | **The OWNER CHAIN, all three parts named: (1) the IMPLEMENTER deletes the ambient read (`elementFor()` goes; `containerFactory(key)` becomes the sole container source); (2) the TESTWRITER wires the injected factory into every container-dependent drive and authors the new row `§3.2 F-12`; (3) the STATIC ROWS are TIGHTENED** (`§2.2` prohibitions 1/2, `§1`'s out-of-scope list, `§4.4 S-2`/`S-4`, the Layer declaration anchor 3). | **`§2.1` gains the `containerFactory` seam + the NORMATIVE container-source clause** (sole source; accepted shape = *offers `appendChild`*, the `isNodeShaped` predicate; absent/non-callable/unusable ⇒ the `F-6`-class degradation); **`§2.1`'s totality-boundary table gains the FIFTH seam** with its named safe default; **`§1`'s out-of-scope list, `§2.2` prohibitions 1 and 2 and the Layer declaration anchor 3 carry the tightened ban** (no ambient global **AND** no assembled/computed member lookup, no aliased/re-derived global reference — the literal token's absence was **not** evidence); **`§3.1 M-1`/`M-18`, `§3.3 I-4`** state containers come from the injected factory with the reference-identity observables **unchanged**; **`§3.2`'s per-method table gains column (c) and the row `§3.2 F-12`**; **`§5.2` records that the HARNESS supplies the factory** (the node suite passes the shim's element factory) with **the legs unchanged**; **`§5.5.1`'s `P-SH-TP-1` pool note** keeps the pool at `20`/`60`/`155`; **`§7` items 7/11** record the contract decision; **two `§8` rows** record the ruling and this pass. |
| **`ADV-SH-2`** | MED | **A container passed back as a NODE makes the tree CYCLIC.** `isNodeShaped` (`:152-156`) admits any value offering `appendChild`, so `containerFor('a')` is admissible as a node; `holds(container, container)` is **false** (an element is not its own child, `:167-170`), so `setNode('a', containerFor('a'))` **appends the container INTO ITSELF** — `attach` reports success, the host is in a "valid" state, and the shim's `outerHTML`/`innerHTML` serialization then recurses without bound. | **`OWED-with-owner`** | **the IMPLEMENTER** (a guard that refuses or ignores a container passed back as a node) **+ a spec PIN** (the row that pins it is owed to this unit's next contract pass; recorded here rather than left silent) | **No clause amended yet** — the pin is OWED. The finding is recorded at **seed `§3a A-8`** (its `OWED` marker) and here. **The `A-8` seed's disposition IS this finding**, exactly as the pass's seed ruling says. **⟶ ANNOTATED 2026-09-27 (the unit's documentation review, finding `F-04`; EVERY cell of this row above is KEPT VISIBLE and its `OWED-with-owner` disposition is SUPERSEDED): `ADV-SH-2` is `FIXED`** — the guard is the **landed `isOneOfOurContainers` check** (`src/shared/slot-host.ts`, called from `setNode` before anything is attached), which **refuses a container handed back as a node with the existing `'malformed-node'` code**, so the cyclic tree cannot form and the shim's serializer never recurses. **Still OWED: the SPEC PIN** — an appended negative row asserting that a container passed back as a node is REFUSED with `'malformed-node'` and never becomes its own descendant (`§3.1 M-20`-shaped / `§3.2 F-13`-shaped; neither `M-19` nor `F-12` carries that drive). **The row's own severity, finding text and clause list are unchanged.** |
| **`ADV-SH-3`** | LOW-MED | **The host writes an expando `parent` marker onto the CALLER'S node.** `markParent` (`:216-224`) sets `object['parent'] = parent` on a value the caller owns, **and nothing ever reads it** (the host's own bookkeeping is its `records` map; `holds` uses the container's `children`) — so the host mutates caller-owned objects for no contract reason, and a frozen/sealed caller node is silently treated differently (the write throws and is swallowed). | **`CLOSED-IN-PLACE`** (was **`OWED-with-owner`** + a CONTRACT DECISION — the as-written disposition is KEPT VISIBLE here) | **Owner: the IMPLEMENTER — DONE, BY DELETION** (`markParent` and its call site are REMOVED; a `grep` for `WeakMap\|markParent` over `src/**` returns nothing). **Why NOT the `WeakMap` the row as-written prescribed:** it is **banned by this unit's own static row `§4.4 S-4`** (`/\b(WeakMap\|WeakSet)\b/` over the comment-stripped source — *"a WeakMap/WeakSet registry keyed by the container"*) and by **`§2.2` prohibition 4**'s state list (*"its per-key ownership bookkeeping + the container elements it created"*, with `I-5` requiring none of it to survive `dispose()`), and it is **UNNECESSARY** because the marker had **NO READER** (`holds()` reads the container's `children`; the host's bookkeeping is its `records` map). *(The as-written Owner cell — "replace `markParent` with a module-local `WeakMap` keyed by the caller's node" — is KEPT VISIBLE in this parenthesis and is WITHDRAWN as a remedy.)* | **A contract decision, recorded at `§7` item 7** (item 7's eighth entry's companion), **RE-STATED 2026-09-27 by the unit's documentation review (finding `F-06`) as `CLOSED-IN-PLACE`: the host writes NO parent marker and keeps NO parent bookkeeping AT ALL** — the old cell's wording (**the host's parent-ownership bookkeeping is MODULE-LOCAL; the host leaves NO expando marker on a caller-owned value**) is KEPT VISIBLE and its first half is WITHDRAWN: there is no module-local bookkeeping of any kind, only the per-instance `records` `Map` that `dispose()` rebinds. **No row is weakened** — `§2.4` item 4's identity rule (the host never clones or re-creates a caller node) stands unchanged, and **the property a row may now assert is exactly: *"the caller's node carries no host-written marker"***, with a frozen/sealed caller node bookkept like any other. |
| **`ADV-SH-4`** | LOW | **Two now-FALSE ambient claims.** The Layer declaration anchor 3 (*"the module reads no ambient global"*) and `§2.2` prohibition 1's static-source row both asserted an absence the code contradicted (the assembled `document` read of `ADV-SH-1`). | **`FIXED-this-pass` for the TEXT half — FOLDED INTO `ADV-SH-1`'s fix for the CODE half** | **this pass** (the claim text) **+ the Implementer's `ADV-SH-1` fix** (the code the claim is about) | **Both claims are annotated IN PLACE with the correction kept visible** (annotate-never-rewrite): the Layer declaration's anchor 3 now reads as an assertion the red set **must be able to FAIL**, states that the as-written sentence was **FALSE of the module as it stood**, and carries the tightened rule; `§2.2` prohibition 1's row gains the same tightening. **The old sentences stay visible and are NOT deleted** — that is the point of folding the text half here rather than rewriting them. |
| **`ADV-SH-5`** | LOW | **`S-5`'s census row is brittle AND self-referential.** The row (`tests/slot-host.test.ts:2197-2201`, read this pass) opens `tests/engine-pin-version.test.ts` as **text** and counts matches of `/^\s*'(read\|dispatch\|graph\|code\|module)'\s*,?\s*$/gm`, asserting the count is `5` — i.e. it counts **GROUP LITERALS held inline in that other file**, not `VALID_GROUPS` itself. It is one of the SIX RED rows, and its failure mode is a **test-side** one (the assertion is over a file this unit may not edit, `§5.1`). | **`FIXED-this-pass`** | **the TESTWRITER** | **The fix shape, ruled:** assert **`VALID_GROUPS` from `src/main/security.ts` instead** — the live set is `src/main/security.ts:134` (read: `new Set(['read','dispatch','graph','code','module'])`), so the row asserts the **actual group set of the host**, not a literal count inside a sibling test file. **The prohibition's real assertion is unchanged and unharmed**: `§2.2` prohibition 5 / `§1`'s five-seam negative (no new tool/resource/group/`RpcMethod` member/`MUTATING_METHODS` entry; `ALL_TOOLS` stays `21`) — and **`src/main/**` is outside this unit's diff scope** (`§5.1`), so the TestWriter's fix must read the set, **never edit that file**. **The `S-5` row remains RED until that fix lands.** |
| **`ADV-SH-6`** | LOW | **A register cell still says `F-10`/`A-5` are "deliberately UNRULED" while the same file RULES them.** `§5.5.1`'s `P-SH-TP-1` cell and its honesty item 2 carried the pre-ruling wording after `§7a` item 4 (`F-10`'s four named safe defaults) had ruled the seam — a reader meeting the cell first would conclude the seam is still unpinnable. | **`FIXED-this-pass`** | **this pass** (the cell's TEXT) — the finding is a **documentation** one, and the sibling unit's equivalent was fixed by the doc pass | **The register-cell reconciliation block already carries the correction** (`§5.5.1`: *"its `F-10`/`A-5` citation is no longer 'deliberately UNRULED' — the seam rows live in `§3.2 F-10`"*), and **this pass re-states it where the cell is**: `P-SH-TP-1`'s row in that block now says the seam is RULED and that the pool still excludes callback-throwing shapes. **No register statement, type, marking, strategy id or attempt count changed**; the **honesty item 2** already carries its own dated `UPDATE 2026-09-27` keeping the correction visible. |
| **`ADV-SH-7`** | LOW-MED | **`P-SH-IM-1`'s partial-order drives filter its child-sequence assertion to SURVIVORS, so a host that keeps DECLARATION order passes those `3`.** The row's `3` fixed partial drives (`setOrder(['c','a'])`, `setOrder(['c','a','nope'])`, `setOrder(['a','a','c'])`) assert `order` equals the requested relative order, and the child-sequence half is read only over the keys present in the requested list — so for those `3` of the row's `33` attempts, **a host that ignores `setOrder`'s request and keeps the declared order can still pass**. | **`FIXED-this-pass` — STRATEGY ONLY** | **the TESTWRITER** (the row's STATEMENT stays; only its strategy is strengthened) | **The row's statement and its `33` attempts are UNCHANGED** (`§5.5.1`'s register discipline: no statement change, no attempt-count change). **What the strategy must gain:** for the `3` partial drives the child-sequence assertion must be read over the **WHOLE projected sequence** (the declared key set in the requested relative order, with the undeclared/duplicate keys ignored — `M-15`'s own expected `order`), **not filtered to the keys the caller happened to list** — so declaration-order-keeping FAILS. **This is a STRATEGY GAP, not a proof**: the row's `3` attempts are currently **over-strength relative to what they can falsify**, and the correction is the TestWriter's, with the statement untouched. |
| **`ADV-SH-8`** | LOW | **`P-SH-IM-3` compares only INNER containers, so a host that re-appends its CONTAINERS on an unchanged `render()` passes.** The row asserts each container's `children` are reference-identical element-by-element and that the returned arrays are fresh (`I-9`), but it does **not** snapshot the **outer** injected container's child sequence — so a host that detaches and re-appends all its own containers on every `render()` (the exact mutation `M-16` exists to forbid) **passes**. | **`FIXED-this-pass` — STRATEGY ONLY** | **the TESTWRITER** (an added snapshot; the row's statement and `8` attempts are unchanged) | **What the strategy must gain: the OUTER snapshot** — capture the injected container's child-reference sequence before the second call and compare it index-by-index by **reference** (`toBe`) after it, so a re-append of the host's own containers FAILS. **The statement, the `8` attempts and the register's `155` total are unchanged**; `M-16`'s re-pin (`§7a` item 8) already NAMES the per-step child-reference sequence as the observable, so the row was under-strength against its own contract, not wrong. **A STRATEGY GAP, not a proof.** |
| **`ADV-SH-9`** | INFO | **`P-SH-IM-2` fixed shape (2) — the absent-container configuration — asserts identity preservation, and its `placed` half is vacuous there** (nothing can be placed), so the shape's value is its `order`/reference half rather than a placement claim. | **`ACCEPTED-AS-PINNED`** | — (recorded) | **Examined and ruled CORRECT as authored, with the code's observed behaviour as the pinned reading:** the shape drives the **no-op configuration** (`M-14`/`F-6`) and its assertions (`ok === true`, `refused` `[]`, every reference it was handed preserved, `containerFor` `null`) are exactly what `§2.1`'s container-source clause and `F-6` fix. **No cell change; recorded so the vacuous half is not mistaken for a proof.** |
| **`ADV-SH-10`** | INFO | **`P-SH-SM-1`'s `''`-key pair and its rotations overlap `P-SH-SM-2`'s sequences 3/4** — the same shapes are driven by two register rows. | **`NOT-A-FINDING`** | — (recorded) | **Raised and examined:** the overlap is **deliberate** and is the register's own counting rule — `§5.5.1` states that one attempt is one exercised **DRIVE of one register row**, and the two rows are **two properties over one input family** (no-silent-create vs state coherence), **the same reuse the `30` permutation attempts make between `P-SH-IM-1` and `P-SH-IM-2`**. **No dedup is owed and none may be applied** (`§5.5.1`: *"no reader may 'deduplicate' the total"*). |
| **`ADV-SH-11`** | INFO | **The `17` Implementer judgment calls restate several `§3` rows' observables in the Implementer's own words.** | **`NOT-A-FINDING`** | — (recorded) | **Raised and examined:** a judgment call is the **Implementer's own reading**, and this spec's `§7a`/`§7a.1` already rules that a TestWriter's or Implementer's mirror is **its reading, not a ruling** — the contract text stays the authority, and this pass rules all `17` in `§3b`-2 so none is left as a private reading. **No clause changed.** |
| **`ADV-SH-12`** | LOW | **TWO asymmetries the contract did not state: (a) an ORPHAN CONTAINER is created and RETAINED when `appendChild` fails** — `syncContainers` assigns `record.container` **before** `syncOrder` attempts the write (`:297-299` vs `:336-337`), so a container the injected element refused is still held by the host and returned by `containerFor`; and **(b) a CALLER-DETACHED CONTAINER is SILENTLY RE-APPENDED by `syncOrder`** (`:310-339`), **unlike a caller-detached NODE, which is not re-appended** (`M-19`). | **`PARKED-with-revisit-condition`** | **the pass records it; owner = the pass that revisits** | **Neither asymmetry is currently wrong**: the host's state is valid, nothing throws, and a re-appended container is one of the host's own — but the two halves are **unstated**, and (a) means a refused container is retained with a live `containerFor` handle. **REVISIT CONDITION, NAMED: when a NON-SHIM / real-DOM container is injected** (a real element's failure modes and the cost of retention differ from the shim's), **or** when the totality claim is read as covering caller-supplied DOM methods. **No clause amended, no row owed, and the container/node asymmetry is recorded at `§3.1 M-19` as the NODE half's pin.** |
| **`ADV-SH-13`** | INFO | **The register's pool exclusions are STATED, hence BOUNDED** — `P-SH-TP-1` excludes the callback-throwing shapes and now the factory shapes, and `P-SH-IM-1` quantifies over `n = 3`/`n = 4` only. | **`RESOLVED-BY-PINNING`** | — (recorded) | **Closed by pin text this spec already carries:** the `YES (bounded)` markings (`P-SH-IM-1`, `P-SH-TP-1`), the honesty block's item 1, the pool's stated exclusions and the new factory note (`§5.5.1`) make each boundary **an explicit, falsifiable statement rather than a silence** — and **the pool's `20` count stands on the EXECUTED enumeration** with the re-indexing rationale corrected (see the register record below). **No cell change; the boundary is the pin.** |
| **`ADV-SH-14`** | INFO | **`M-17`'s rejected-promise drive can NEVER surface a violation, because the test SELF-CATCHES it.** The row's hostile listener fires `void Promise.reject(...).catch(() => undefined)` (`tests/slot-host.test.ts:1602`, read this pass) — so the rejection is already handled **inside the test's own callback**, and a host that awaited the listener, re-threw, or let the rejection escape would **still pass**. The `§2.1` clause it means to prove (*"the host NEVER awaits it and ignores its return value and any promise"*) is therefore **unfalsified**. | **`FIXED-this-pass`** (was **`OWED`** — the as-written disposition is KEPT VISIBLE) | **the TESTWRITER** — **DONE this pass** | **A NON-SELF-CATCHING drive is required** — e.g. an unhandled-rejection observer (a `process.on('unhandledRejection')`-style listener or an equivalent) plus a drive that FAILS when the host awaits or re-throws the listener's rejected promise. **The row's STATEMENT is the contract and is unchanged** (`§2.1`, `M-17`); only its drive's power is owed. **This is the second of the two broken/uncatchable test-side items the pass remanded, and it is a STRATEGY GAP, not a proof.** **⟶ `FIXED-this-pass` 2026-09-27 (the unit's documentation review, finding `F-05`; the as-written finding, disposition and remedy above are ALL KEPT VISIBLE and the `OWED` marker is superseded): the NON-SELF-CATCHING drive LANDED** — `tests/slot-host.test.ts`'s `M-17` third half replaces the self-catching `void Promise.reject(…).catch(…)` with an **INSTRUMENTED THENABLE** whose `then`/`catch`/`finally` observations are **counted**, asserts **`observations === 0`** (*"the host NEVER awaits, chains or otherwise observes the listener's returned promise — any then/catch/finally call FAILS this row"*) and **`settledRejected === true`** (so a resolved stub cannot pass), and settles the inner rejection **OUTSIDE the listener** so the drive itself leaks no unhandled rejection; the row title now reads *"…and its rejected promise is NEVER observed"*. **The row's STATEMENT was and is the contract (`§2.1`, `M-17`, unchanged) — only its drive's power was owed, and it is now discharged, so the row is FALSIFIABLE.** *This discharge also answers **seed `§3a A-5`**'s *"OWED A DRIVE"* half for the rejected-promise case, which is the same item.* |
| **`ADV-SH-15`** | — | **The handoff probe: is any finding of this pass a PACKAGE defect** (`node_modules/provident-ssr/` or `../Preempt-Providence/`) that `AGENTS.md` item 7 requires in `docs/defects.md` + `docs/HANDOFF.md`? | **`NOT-A-FINDING` — NO PACKAGE DEFECT; nothing is owed to `docs/defects.md` or `docs/HANDOFF.md` by this unit.** | — (recorded) | **Every finding of this pass is HOST-SIDE or TEST-SIDE**: `ADV-SH-1`/`2`/`3`/`12` are this repo's `src/shared/slot-host.ts`, `ADV-SH-5`/`7`/`8`/`14` are this repo's `tests/slot-host.test.ts`, `ADV-SH-4`/`6`/`13` are this spec's own text, and `ADV-SH-9`/`10`/`11` are records. **The unit's own defect-catalogue duty is therefore DISCHARGED BY THE NEGATIVE, and that negative is recorded rather than left implicit** (the same disposition the sibling unit's security sweep reached). |

#### `§3b`-2 — the SEVENTEEN Implementer judgment calls, each ruled

**Where they come from:** the Implementer's pass reported **`17` judgment calls** — points where the code chose a reading the contract did not spell out. **This pass rules every one**, because a judgment call is a **private reading until the contract adopts or rejects it** (`§7a`'s own standard). **The dispositions used: `CONTRACT-CONSISTENT` (`15` calls — the reading the contract's own clauses imply, each cited), `CONTRADICTS` (`#7` — the container-source evasion, `ADV-SH-1`), `UNRULED` (`#16` — `ADV-SH-12`'s parked asymmetries), and `CONTRACT-CONSISTENT BUT MUST BE PINNED` (`#17` — now pinned as the new row `M-19`).**

| # | Judgment call (as reported) | Disposition | Ruling / owner | Where it is contract text |
| --- | --- | --- | --- | --- |
| **1** | The declared key set is filtered to strings and de-duplicated at construction. | **`CONTRACT-CONSISTENT`** | exactly `§2.1`'s declared-set rule with `F-4` (a malformed `keys` option ⇒ an EMPTY declared set) and the first-occurrence rule at seed `A-3`. | `§2.1` (container-source clause), `M-1`, `I-2`, `F-4`, `§3a A-3` |
| **2** | The projection computes `orderOf` scores once and sorts with an index tiebreak. | **`CONTRACT-CONSISTENT`** | `§2.5` item 1's projection + `M-4`'s stability ("no invented tiebreak" — the index tiebreak IS the supplied order, not a new policy). | `§2.5` items 1/2, `M-2`, `M-4` |
| **3** | A non-function `orderOf` is ignored (the supplied order is used). | **`CONTRACT-CONSISTENT`** | the omitted-policy default (`§2.5` item 1) extended to a non-callable value, which is **the absence of a policy** (prohibition 3 forbids inventing one). | `§2.5` item 1, `§2.2` prohibition 3, `M-2` |
| **4** | A throwing `orderOf` is caught and the supplied order is used. | **`CONTRACT-CONSISTENT`** | `§2.1`'s totality-boundary table's `orderOf` row (named safe default), as ruled at `§7a` item 4 and driven by `F-10`. | `§2.1` (totality boundary), `F-10`, `§3a A-5` |
| **5** | `isNodeShaped` requires only a function-valued `appendChild`. | **`CONTRACT-CONSISTENT`** | `§2.1`'s accepted-shape predicate, now stated **for the factory too** (the ruling's own words: *"offers `appendChild`"*). **The `A-8` hazard this predicate admits is `ADV-SH-2` (`OWED-with-owner`), not a re-reading of this call.** | `§2.1` (container-source clause), `F-2`, `§3a A-8` |
| **6** | A malformed node never removes a valid placement (the refusal is recorded and the prior node stands). | **`CONTRACT-CONSISTENT`** | `F-2`'s required behaviour, stated in the row itself ("the key's prior node is left as it was — the row pins this"). | `F-2` |
| **7** | **The containers are obtained from the REALM'S ELEMENT FACTORY, read off the ambient global, and the property name is ASSEMBLED so the static scans cannot match it.** | **`CONTRADICTS` — THIS CALL IS THE FINDING `ADV-SH-1` (HIGH), AND THE ARCHITECT HAS RULED AGAINST IT.** | **the IMPLEMENTER** deletes the ambient read; **the TESTWRITER** wires the injected factory; **the static rows** are tightened. **The call is not a judgment call at all under the amended contract**: `containerFactory` is the SOLE container source, the ambient read is DELETED, and no assembled/computed member lookup or aliased global is admissible (`§2.1`'s container-source clause, `§2.2` prohibitions 1/2). | `§2.1` (the seam + container-source clause), `F-12`, `§4.4 S-2`/`S-4`, `§3a A-14`/`A-15` |
| **8** | A present-but-unusable container refuses `'container-not-appendable'` **per attempted node write**. | **`CONTRACT-CONSISTENT`** | `F-7`'s per-method table (the scoping `§7a` items 2/3 ruled), including `setOrder`'s write-free `ok === true` and `remove`'s owned-node branch. | `F-7` + the per-method table, `§3.3 I-8`, `M-14` |
| **9** | An absent/`null` container is a no-op with `ok === true`, not a refusal. | **`CONTRACT-CONSISTENT`** | `F-6`'s contract and `M-14`'s drive — the deliberate asymmetry with `U-MOUNTGUARD` is recorded in the row. | `F-6`, `M-14`, `§2.3` item 6 |
| **10** | `setNode` creates the containers for the declared keys BEFORE placing the node. | **`CONTRACT-CONSISTENT`** | `I-10`/`F-1`'s no-silent-create half: the containers exist for **declared** keys, and `M-18` distinguishes the key set allocated to containers from the keys actually placed. | `M-18`, `I-10`, `F-1` |
| **11** | A node moved to a second declared key is detached from the first and **not** reported in `removed`. | **`CONTRACT-CONSISTENT`** | `§2.4` item 6 (one node, one key, one container) + `M-9`; the move ends no ownership, so `removed` is untouched — the pin recorded at seed `A-6`. | `§2.4` item 6, `M-9`, `§3a A-6` |
| **12** | A replacement under the same key reports the OUTGOING node in `removed`. | **`CONTRACT-CONSISTENT`** | `M-10`'s required behaviour and `§2.1`'s `removed` doc string ("every node this call REMOVED … by reference"). | `M-10`, `§2.1` (`removed`) |
| **13** | `remove(key)` on a key the host owns reports the node in `removed` **whether or not the tree still held it**. | **`CONTRACT-CONSISTENT`** | `F-9`'s pinned membership (`§7a` item 6, `CONTRACT-AMENDED`): the call that ends the host's ownership is the call that reports it. | `F-9`, `§7` item 9 (its surviving half), `§5.5.1` sequence 8 |
| **14** | A malformed `keys` option yields an empty declared set rather than a throw. | **`CONTRACT-CONSISTENT`** | `F-4`'s required behaviour, including *"`createSlotHost` itself never throws"*. | `F-4`, `M-8`, `§3.3 I-8` |
| **15** | The refusal listener is called once per refusal and its return value/promise is ignored; a throwing listener is swallowed. | **`CONTRACT-CONSISTENT`** | `§2.1`'s injected-callback rule + the totality-boundary table's `refuse` row; `M-17` is the row. **The drive's POWER is `ADV-SH-14`'s** (`OWED` to the TestWriter) — the call itself is right. **⟶ ANNOTATED 2026-09-27 (the unit's documentation review, finding `F-05`; the sentence is KEPT VISIBLE): the drive LANDED** — `M-17`'s third half drives an instrumented thenable with `observations === 0` + `settledRejected === true` — so the power reads **`FIXED-this-pass`** and is no longer `OWED`. | `§2.1`, `M-17`, `§3a A-5`, `§3b`-1 `ADV-SH-14` |
| **16** | **The host keeps a container handle and re-appends a container the caller detached, and it retains a container whose `appendChild` failed — the container/node asymmetry is unstated.** | **`UNRULED` → `ADV-SH-12` (`PARKED-with-revisit-condition`)** | **the pass records it and NAMES the revisit condition** (a non-shim / real-DOM container injected). **The NODE half IS now pinned** — see `#17`. | `§3.1 M-19` (the node half), `§3b`-1 `ADV-SH-12` |
| **17** | **`render()`'s write policy: a caller-DETACHED NODE is NOT re-appended — the detach is PERMANENT for that key (`render()` is not an undo).** | **`CONTRACT-CONSISTENT` BUT `MUST BE PINNED` — now PINNED** | **the pass pins it as the NEW row `§3.1 M-19`**, the way the sibling unit pinned its own equivalent as `M-21`: the row is falsifiable (a host that re-appends the detached node on any `render()` FAILS it), the key stays declared and in `order`, and the row asserts **nothing** about `removed` (no `remove(key)` call runs in its drive). | **NEW `§3.1 M-19`**, `§2.1` (`render()`'s doc string), `M-16`, `F-9` (scope), `§3b`-1 `ADV-SH-12` |

#### `§3b`-3 — the register record, the six red rows, and the pass's own honesty line

**The register record — EXECUTED, as REPORTED by the pass (`§7` item 11: this spec pass measured nothing).**
`§5.5.1`'s six rows **executed `155` of `155` attempts and NOTHING STOPPED EARLY** (the
stop-after-5-consecutive-failures rule **never triggered** in this run — contrasting the RED pass, whose
module-absent run stopped at `P-SH-IM-1` after `5` attempts by design). **Two attempts were BROKEN, and
both breaks are TEST-SIDE defects now REMANDED to the TestWriter:** **`P-SH-SM-1` `11/12`** and
**`P-SH-SM-2` `7/8`**. **The register's counts, the `155` total, the `20`-shape pool and the `60` draws
are NOT changed by this pass** (`§5.5.1`), and **the `P-SH-TP-1` pool is NOT extended to the factory
shapes** — the fifth seam is driven by the new `§3.2` row `F-12`.

**The register's `20`-count RATIONALE IS UNSOUND — corrected here rather than repeated.** The
register cell and this file's earlier ruling note justified `20` partly by claiming that adding a pool
member *"would re-index every seeded draw (`draw n` takes the pool index `stateₙ₊₁ mod pool.length`),
which would change which shapes the `60` draws visit and would leave the `60`-draw and `155`-attempt
figures describing a pool that was never executed."* **That is not sound, and the reason is now stated
in the cell itself: `pool.length` is NOT part of the draw BINDING** — the binding is
**`HOST_METHODS[d mod 7]` for the method** and **`stateₙ₊₁ mod pool.length` for the member**, so a
member's addition changes **which member** a draw lands on while changing **nothing** about the binding
rule, the `60` draws or the `155` attempts; re-derived indices are **recomputable arithmetic**, not an
impossibility. **The honest reason the count stands is the executed coherence argument:** `20` is the
number of **distinct input values** the contract enumerates (each counted once, a per-axis
re-appearance being the SAME member), **the executed pool holds `20`** (the TestWriter's own
precondition row pins it green), and **the `60` draws and `155` total are computed against that executed
pool.** **What the correction does NOT license:** adding a pool member without a ruling — **a
re-derivation of the indices, the `60` draws and the `155` total together is still required**, and doing
it by editing the executed test file to match prose is forbidden (`§5.5.1`).

**The three over-strength / coverage items are STRATEGY GAPS TO BE FIXED, NOT PROOFS** — ruled
together so no reader mistakes any of them for a green that proves its own statement: **`ADV-SH-7`**
(`P-SH-IM-1`'s partial-order drives filter the child-sequence assertion to survivors, so a
declaration-order-keeping host passes those `3`), **`ADV-SH-8`** (`P-SH-IM-3` compares only inner
containers, so a host re-appending its containers on an unchanged `render()` passes), and **the
pool-boundary case** (`ADV-SH-13` — the exclusions are stated, hence bounded, and `P-SH-TP-1` is
`YES (bounded)`, never a proof of its unbounded universal). **All three are owned by the TestWriter's
strategy and NONE changes a row's statement or its attempt count.**

**The SIX RED ROWS — all ruled TEST-SIDE, no code defect among them.** The pass read the unit as
carrying **`6` failing rows**, and it ruled every one a **test-side** defect:

| Red row | Why it is RED — ruled TEST-SIDE | Owner (and what must change) |
| --- | --- | --- |
| **`M-14`** | **`containerFor` is driven through the `SlotHostResult` helper while the reads return `null` / `readonly SlotKey[]`.** The row funnels **every** method's return through `asResult(...)` (`tests/slot-host.test.ts:1528-1544`, read this pass), but `containerFor` returns `unknown \| null` and `keys()` returns `readonly SlotKey[]` — neither is a `SlotHostResult`, so the helper's shape assertion fails on the row's own calls, **not on the host**. | **TestWriter** — assert the reads on their **declared shape** (`toBe(null)` / element-wise `keys()`), never through the result helper (`§3.2`'s per-method table, `I-8`'s scope clause). |
| **`M-17`** | **`refused` is PER-CALL, so two calls carry one refusal each — and the row reads one call's list as if it held two.** `M-17`'s second half runs **two separate `setNode` calls** inside one drive (`:1626-1634`, read) and asserts the **second call's** `refused.length` is `2` and that the two notifications are in encounter order — but each call returns its **own** result, so the second call's list holds **one**. | **TestWriter** — drive the two refusals **within one call** (or assert each call's single refusal and the encounter order across calls). **The contract is unchanged**: `§2.1` scopes `refused` to *"this call's refusals, in encounter order"`. |
| **`F-7`** | **The unusable-container class cannot hold the declared child count, because `I-10`'s clause is scoped to a SUCCESSFUL `render()`.** The row drives `render()` against a present-but-unusable container and asserts the count of host-created containers equals `keys.length` — but on that shape **no container is created at all** (`containerFor` is `null` for every key), so the count is `0`, and `I-10`'s `keys.length` clause is explicitly scoped to a **successful** `render()` (`§3.1`, and column (b) of the per-method table). | **TestWriter** — assert the **per-method table's** observables for the unusable class (`ok === false`, one refusal per attempted node write, `placed` `[]`, `containerFor` `null`) and read `I-10` as scoped to a successful `render()`. **⟶ ANNOTATED 2026-09-27 (the `M-14` RECONCILIATION pass, on the TestWriter's remand report; the as-written description above is kept visible): this entry's STATED CAUSE was "a host-created container count = `keys.length` clause", but the observable the ROW is reported to have failed on is `render()`'s REFUSAL count — `toBe(2)` asserted against the table's one refusal per attempted node write, i.e. `1` for that drive — and the two must not be conflated.** **The contract was NOT mis-describing that observable**: `§3.2 F-7`'s table (column (b), `render()`) has said "**one refusal per key the call attempts to place**" since the `§7a` RULING pass — the very count this entry's own remedy cites — so no `§3.x` cell has to move for it. **What the described child-count coupling DID expose is real and is now closed in the contract's own text:** `I-10`'s count claim was under-scoped (it read as an unconditional invariant while the count is `0` on the unusable shape), so `§3.3 I-10` carries a dated `SCOPED` note bounding it to a successful `render()`, and a row asserting `count === keys.length` on the refused shape is asserting a clause `I-10` does not carry — the ROW's failure, exactly as this entry rules. |
| **`P-SH-SM-1`** | **`11/12` — the same unusable-container/child-count coupling inside a register sequence.** The row's sequence for the `'container-not-appendable'` class asserts the injected container's child count is unchanged **and** that the declared key set is fully projected through the tree — impossible on the unusable shape, for `F-7`'s reason above. | **TestWriter** — re-anchor that sequence to the per-method table's observables (the row's statement, its `12` attempts and the register's `155` total are **unchanged**). |
| **`P-SH-SM-2`** | **`7/8` — SEQUENCE 5 asserts `keys()` is non-empty after `dispose()`, while `I-5`/`M-13` fix `keys()` at `[]` after `dispose()`.** Sequence 5 (the absent-container configuration) runs `dispose()` and then reads state; the expected value was authored as the **declared** set rather than the **empty** one. | **TestWriter** — sequence 5's expectation becomes `keys()` **`[]`** after `dispose()` (`I-5`, `M-13`, `§5.5.1`'s own register note that *"`keys()` must be `[]` after `dispose()`"*). **The sequence count (`8`) and the attempt count are unchanged.** |
| **`S-5`** | **See `ADV-SH-5` above: a line regex over `tests/engine-pin-version.test.ts` counting group literals that file holds INLINE — a self-referential census.** | **TestWriter** — assert **`VALID_GROUPS` from `src/main/security.ts`** (read, never edited: `§5.1` puts `src/main/**` outside this unit's diff scope). |

**No code defect stands among the six**, and **the TestWriter's remand is COUPLED to the
injected-factory wiring**: under the architect's option (a) the harness **must pass the factory**
rather than rely on the module reading the shim's global, **or the container-dependent rows go red again
for a different reason** — the harness would be exercising the DELETED behaviour (`§5.2`'s harness
clause, `§3b`-1 `ADV-SH-1`'s owner chain).

**⟶ THE PASS'S OWN HONESTY LINE.** **This spec pass RAN NO TEST, NO SUITE, NO LEG AND NO TRIO** — every
number in `§3a`/`§3b` (**`155/155` attempts, the two broken attempts, the `6` red rows, the register's
counts**) is the **adversarial pass's own report, RECORDED AS REPORTED** (`§7` item 11). **The
regressions this pass mandates are CONTRACT TEXT and the fixes are OWED to the passes that follow, in
`AGENTS.md`'s order: the TestWriter authors the rows RED first (`§2.1`'s amended clauses, `§3.2 F-12`,
`§3.1 M-19`, `§4.4`'s re-scoped static rows), then the Implementer makes them green** — with `ADV-SH-1`
the blocking change, `ADV-SH-2`/`ADV-SH-3` the two `OWED-with-owner` code items, and `ADV-SH-14` plus
the three strategy gaps owned by the TestWriter alone. **⟶ RECONCILED 2026-09-27 (the unit's documentation review; the honesty line above is KEPT VISIBLE as the ADVERSARIAL PASS's own state and is SUPERSEDED as a statement of where the unit stands): the passes it names have RUN.** `ADV-SH-1`'s blocking change LANDED (the injected `containerFactory` is the sole container source, the ambient read deleted, the static rows tightened); **`ADV-SH-2` is `FIXED`** (the `isOneOfOurContainers` refusal — its spec pin `§3.1 M-20`/`§3.2 F-13` is STILL OWED); **`ADV-SH-3` is `CLOSED-IN-PLACE`** (the marker was DELETED, not replaced — **no `WeakMap`, no parent bookkeeping at all**); **`ADV-SH-14`'s drive is `FIXED-this-pass`**; the six red rows and the three strategy gaps were repaired test-side; and **the GREEN landed** — `tests/slot-host.test.ts` **`61` rows, all green**, the register `§5.5.1` **`155/155` attempts held, `0` broken, nothing stopped early**, and the trio green (the measured state, with its layer limits, is the status region's green note above). **The unit's `DONE` row is OWED BY THE SUPERVISOR and is not written here.** **What survives of this honesty line VERBATIM, and is the part that must not be softened: THIS SPEC PASS RAN NO TEST, NO SUITE, NO LEG AND NO TRIO — every number in `§3a`/`§3b` is a pass's own report, RECORDED AS REPORTED.**

**⟶ ARCHIVAL-LOOP CHECK FOR THIS PASS (2026-09-27, the `U-SLOTHOST` ADVERSARIAL-RECORD pass; added here
so the scope is auditable).** This pass **archives, moves and repoints NOTHING** (`AGENTS.md` item 6):
it edits **this one spec file** by **bounded anchored `edit`s** (never a whole-file write, `RCA-8(c)`),
under **annotate-never-rewrite** (every superseded sentence, cell form and seed row stays visible with
its date and reason), with **no section number moved** (`§3b`-1/`-2/`-3 are sub-blocks of `§3b`, the
same convention as `§5.5.0`/`§5.5.1` and `§7a.1`), **no `§3` drive changed**, **no register statement,
type, marking, strategy id or attempt count changed**, **the `155` total unchanged**, and **no tracker
row touched** — the trackers are the supervisor's files, and the tracker-side obligations this pass
creates are named for their owner rather than assumed: **`docs/next-steps.md`'s `D3` row (its
`Blocked on`/status cells now owe an Implementer pass and a TestWriter remand), this unit's DONE row
(still owed, and it must NOT be written as green), `docs/pending.md` §G's `slothost` row (the
supervisor's), and `docs/decisions.md` — which needs an entry for the option-(a) container-source
ruling, but is not this pass's file** (`§5.1`'s diff scope; named here so the obligation is not lost).
**It ran no test, no suite, no leg and no trio**, touched no `tests/**`, `src/**`, `scripts/**`,
`package.json` or tracker, and made no commit. **What it changed:** the status region's new
`§3a`-adversarial note; **`§2.1`** (the `containerFactory` seam, the container-source clause, the fifth
totality row, the seam-count note); **`§1`'s out-of-scope list**, **`§2.2` prohibitions 1/2**, the
**Layer declaration anchor 3**; **`§3.1 M-1`/`M-18`** and the NEW row **`M-19`**; **`§3.2`'s per-method
table (column (c))** and the NEW row **`F-12`**; **`§3.3 I-4`**; **`§4.4 S-2`/`S-4`**; **`§5.2`** (the
harness clause); **`§5.5.1`** (the corrected `P-SH-TP-1` pool rationale, the no-factory note and the
reconciliation row); **`§7` items 7 and 11**; **`§3a`** (the status block + each seed's ruling);
**`§3b`** (the status/extension, `§3b`-1's fifteen findings, `§3b`-2's seventeen judgment calls,
`§3b`-3's register record, red-row table and honesty line); and **two `§8` rows** — **nothing else, no
`§3` row's drive changed, and no normative clause weakened.** **A line-count census is deliberately
NOT claimed inside this file** for the reason the paragraphs above give (a census drifts on every pass):
**cite this file's SECTIONS, never its length** — the live count belongs in the pass's report, not in
the file it counts.

**Why these two sections sit at the END of this file (the `docs/specs/engine-drift.md` convention,
stated so the placement is not read as an oversight):** the **seed set** is the artifact the pass
that runs *after* the green works from, and the **disposition table** is what this contract is
reconciled *to* afterwards. Keeping them last means an appended findings block extends the file
without renumbering §6/§7/§8 — **no section number of this spec moves when the pass lands.**

