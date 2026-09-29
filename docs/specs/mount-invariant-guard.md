# Spec — `U-MOUNTGUARD`: the cross-envelope mount cardinality/identity probe (`SCH-1`'s invariant half)

Status: **SPEC — FILED 2026-09-27** (wave **D**, unit **`U-MOUNTGUARD`**, the invariant half of
`SCH-1` `SHELL-REGION-HOST`). **The unit has NOT run: nothing here is implemented, no probe exists,
no red set has been authored and no leg has been run by this pass.** This pass files the contract.

**⟶ AMENDMENT — 2026-09-27, the RED-SET pass (the same date; this is the unit's next gate).** The
as-filed filing status above is **SUPERSEDED**, kept in place: the unit's **red set HAS been authored
AND RUN**, so `H-r4`'s *"the red is written and RUN and REPORTED before any implementation"* is now
**DISCHARGED**, not owed. **The run HIT the spec's own stop condition `S-1`** (§4.4) and produced
**two contract findings this amendment records** (§3a's red-run block — `RED-1`…`RED-6`; and §3.1
`M-11`/`M-12` + §1.1's wording for the teardown decision). **The unit's shape
is therefore §6 outcome (b) — THE HOST-FIX BRANCH:** this unit is now the probe module **plus a fix
in `src/renderer/runtime.ts`** with a **regression row** (§5.1 rows 1–3, §3.1 `M-17`/`M-18`, §3a).
**The probe stays the unit's acceptance evidence** — nothing of §2.1's surface is weakened, and the
acceptance is that the probe reports the invariant on the reproducer (§3a `RED-1`). **Evidence, dated
and verbatim:** the red set is `tests/mount-invariant-guard.test.ts` (**41 rows: 39 red / 2 pass**,
committed **`aa8b92e`**; the 2 green are the harness preconditions `PRE-1`/`PRE-2`, which are **not
spec rows**); the raw observation is recorded in §3a's red-run block; the ledger is §4.6. **⟶ RE-TAKEN (2026-09-27, the adversarial + blind-verification pass): the file is now `44` rows — `41` red / `3` pass — and every row of it PASSES on the tree that carries the fix; the suite is `59 files / 916 passed / 2 skipped / 0 failed`; `M-17`/`M-18`/`M-19` are appended (§3.1) and the regression rows `M-17`/`M-18` now EXIST. Read §4.6 item 2 as the governing ledger.**
*(**Struck in place, superseded:** this pass's own sentence — "**no red set has been authored**" —
and §0 ruling 6's *"**Status of its red set: RED SET OWED — NOT AUTHORED, NOT RUN**"*. What the red
run authorises is only `S-1`'s branch: **wave D is still not authorised as a whole**, and no other
wave-D/E/F unit is touched by this amendment.)*

**⟶ AMENDMENT — 2026-09-27, the ADVERSARIAL-PASS + BLIND-VERIFICATION pass (this unit's next gate,
same date).** **BOTH PASSES HAVE RUN**, and they found the **SAME blocker** independently: the
teardown wording of this contract (and of `docs/decisions.md`) stated **unconditionally** that
`teardown()` leaves the mount with **ZERO** engine-emitted direct roots. **That is true only on a
BOOTSTRAPPED / RE-BASELINED runtime.** On a runtime that was **constructed and never `bootstrap()`ed**
(and never loaded before the teardown), the **FIRST** `teardown()` leaves **ONE** engine-emitted root
mounted — the graph's **live in-tree root** (`listTargets` agrees, `census.inTree === 1`) — while
cycles **2** and **3** leave **0**; the idempotence claim (§3.1 `M-12`) is therefore **drive-specific
too**. **Verbatim, re-taken before the new row was written:** never-bootstrapped teardown — cycle 1:
`childCount 1`, `nodeIds ["<root>"]`, `class "demo-shell"`,
`mountHTML '<div data-node-id="…" id="preempt-node-…" class="demo-shell"></div>'`,
`census {"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}`; cycle 2: `childCount 0`,
`mountHTML ""`; cycle 3 identical to cycle 2. Bootstrapped drive (control): teardown → `0` on the mount,
`inTree 1`, `html ""` — **unchanged**. **MECHANISM (confirmed in code):** `tearDownGraph()` calls
`render()`, and `render()`'s compile branch runs whenever `bootstrapped === false`
(`src/renderer/runtime.ts:155-173`) — so on the never-bootstrapped drive the emptying render **MOUNTS**
the graph it is about to discard and sets `bootstrapped = true`; `reconcileMount()` is reachable only
through `resetRenderState()` (i.e. via a load) and `teardown()` never calls it. **THIS AMENDMENT'S
SUBSTANCE:** §1.1's amended invariant and §7 item 13 are re-pinned to the **drive**; §3.1 `M-11`/`M-12`
now NAME their drive and cross-reference the new row; **§3.1 `M-19` is APPENDED — the row that pins the
never-bootstrapped teardown drive** (cycle 1 = one root that IS the graph's live in-tree root; cycles
2/3 = 0); §3a's status is corrected (the adversarial pass **RAN**) and its findings land as **§3b**
rows with dispositions; §4.4 `S-2`, §4.6's ledger, §8 and the counts are reconciled. **The fix's
regression rows `M-17`/`M-18` NOW EXIST** in `tests/mount-invariant-guard.test.ts` (the earlier
amendment named them as owed — **that hole is CLOSED**; `M-17` = the regression row, `M-18` = the
non-placement attribution + placement variant, and `M-14`'s `plainRaw` is **now an assertion**, not a
failure-message interpolation). **With `reconcileMount()` reverted in an out-of-tree mirror, the target
files go 5-failed — `M-17`, `M-18`, `M-14`'s attribution half, and the two blind teardown rows — while
all pre-existing rows stay green.** **UPDATED COUNTS (the same pass's green trio):** the unit's file is
**44 rows** (`npx vitest run tests/mount-invariant-guard.test.ts` → **44 passed**), and the suite is
**`59 files / 916 passed / 2 skipped / 0 failed`**. **No row and no section number moves; `M-17`,
`M-18` and `M-19` are appended ids.**

**⟶ STATUS NOTE — 2026-09-27, THE SUPERVISOR'S DONE PASS: THE WAVE-D GO-AHEAD WAS GIVEN AND THIS UNIT IS
`DONE` (the ledger's FOURTH `DONE` row).** **This note is a STATUS/ANNOTATION note: it amends NO normative
clause of this contract, adds no row and no id, moves no section number, and supersedes nothing but the
STATUS of the cells named below** (each of which keeps its own text, marked in place). **THE FACTS, one line
each.** **(1) THE GO-AHEAD: the architect GAVE the wave-D go-ahead on 2026-09-27.** **EVERY CELL BELOW THAT
STILL SAYS *"the go-ahead for wave D does not exist yet / wave D is authorised by no ruling on the record /
the architect's wave-D go-ahead half STANDS / is still FALSE"* IS THEREFORE STALE — the cells are the filed
status block, §0 **ruling 6**, §4.5's delegation-gate update and §7 **item 1**; all four are annotated this
pass and their old text is kept visible.** **What the go-ahead does and does not do:** it makes the wave-D
units **delegable in their own order, each blocked only on its own red set** — it does **not** weaken `AGENTS.md`
item 9 for a unit whose red set has not run, and it does **not** authorise any unit out of order.
**(2) THE UNIT: `U-MOUNTGUARD` IS `DONE`** — COMPLETE on every leg this §5.2/§5.3 declare, with §5.3's DONE-row
order honoured by the record in `docs/next-steps.md` (**`## DONE — U-MOUNTGUARD`**), and row `D1` of that
file's `## OPEN` table **moved** to it (kept visible, not deleted). **The rule-3 outcome, FIRST and
explicitly, as §5.3 item 2 demands: `cycle-2 count = 2`** — measured **`{"childCount":2,"count":2,
"nodeIds":["node-234","node-246"]}`**, and **not on a cycle-2 load alone**: **one `loadEnvelope` into one
mount** on a `Runtime` constructed and **never `bootstrap()`ed** is already enough, with the **non-placement
attribution run reproducing `count 2`** (so the read is not placement-specific). **The branch taken is the
HOST-FIX BRANCH** (`§6` outcome (b)). **The guard's disposition, §5.3 item 3: the guard SHIPS** — `S-2`'s
*"not shipped because the adversarial pass found no reproduction"* sentence does **NOT** apply, because the
adversarial + blind-verification pass **DID reproduce a violation** (`§3b` `ADV-1`/`ADV-8`, `§3.1` `M-19`).
**The code/test delta, §5.3 item 4:** `src/shared/mount-invariant-guard.ts` (**NEW** — four exports, two
functions), the **host fix `reconcileMount()` in `src/renderer/runtime.ts`** (called from
`resetRenderState()`; the previous root is detached **by reference**), and `tests/mount-invariant-guard.test.ts`
(**`44` rows, all green**). **The red, §5.3 item 5:** RUN and REPORTED before any implementation (commit
**`aa8b92e`**) — **`41` rows: `39` red / `2` pass**, the `2` greens being the harness preconditions
`PRE-1`/`PRE-2`; the `39` split **`36` module-absent + `3` red against the tree** (`M-14`, `M-11`, `M-12`).
**The legs, §5.3 item 6, each with its layer label:** `npm test` **`[T]`** `59` files / `916` passed /
`2` skipped / `0` failed · `npm run typecheck` `[H]` **clean** · `npm run build` `[H]` **clean (5 bundles)**;
**and the sentence the contract requires: a node-suite green is ENVELOPE/PURE-LAYER EVIDENCE and is NEVER
assembled-app evidence.** (§5.2 declares **no battery and no divergence leg** for this unit — neither was
claimed.) **The `[U]` row, §5.3 item 7: NOT TAKEN** — and now for the **measured** reason §3b `ADV-4` gives
(the probe **refuses a real-DOM mount**: `directChildren()` requires `Array.isArray(children)` while a real
DOM's `children` is an `HTMLCollection`), i.e. the refusal is a contract gap owned by the pass that would take
the row, not a silent gap. **Adversarial + blind + doc review, §5.3 item 8:** the adversarial pass **RAN**
(`§3a` `RED-1`…`RED-6` + `§3b` `ADV-1`…`ADV-10`) and closed the hole it found (the fix's named regression rows
`M-17`/`M-18` **did not exist**; reversion in an out-of-tree mirror now reddens exactly `5` rows); the blind
record is **`docs/specs/mount-invariant-guard-greens.md` (`56` rows = `48` PASS / `2` FAIL /
`6` NOT-BLIND-RUNNABLE**, both FAILs the same teardown-drive finding, **resolved by pinning**); the doc review
is **`archive/reviews/2026-09-27-U-MOUNTGUARD-doc-review.md`** (it fixed one genuine code/doc drift — the
result's **seventh** field `expectedRootNodeId?` was undocumented — and two count/arithmetic residues).
**Tracker reconciliation, §5.3 item 9:** `docs/next-steps.md` (the DONE record + its ledger and moved-`D1`
rows + the re-enumerated totals `4 DONE / 16 open` + the `⟶ HANDOVER` block), `docs/decisions.md` (amendment
note **21** + the four stale go-ahead cells annotated), this file, `docs/pending.md`, `docs/FORKER.md` and
`README.md` (status annotations only). **COMMITS: `aa8b92e` … `1b7d1ca`.** **OWED, all non-blocking and
recorded:** `§3b`'s `OWED-with-owner` (`ADV-4`, `ADV-7`) and `PARKED-with-revisit-condition` rows (`ADV-2`,
`ADV-3` with the one-runtime-per-mount precondition), and the host comment `src/renderer/runtime.ts:559`
(`ADV-10`) which still repeats the unconditional teardown form. **NO `docs/defects.md` row and NO
`docs/HANDOFF.md` round is owed** — the finding is HOST-owned (§7 item 10's own standing statement).

**Go-ahead state — stated plainly: this unit is BLOCKED on the architect's go-ahead for the wave-D
plan.** The go-ahead in force covers **wave B only** (`docs/specs/engine-drift.md` §0 ruling 1:
*"the go-ahead is WAVE B ONLY … waves C–F are not authorised by this go-ahead"*), and it is
**spent** — wave B landed. Wave **D** is authorised by no ruling currently on the record, so this
unit's red set may not be RUN and it may not be delegated (`AGENTS.md` item 9).
**Status of its red set: RED SET OWED — NOT AUTHORED, NOT RUN** (RCA-1: the red is written and RUN
and REPORTED before any implementation). **⟶ THAT CLAUSE IS SUPERSEDED (2026-09-27, the red-set pass;
kept in place): the red set HAS been authored and RUN — see the amendment block above, §4.6's ledger
and §0 ruling 6's updated cell. What survives of this paragraph is the go-ahead half: wave D is still
authorised by no ruling on the record, so the unit may not be delegated and no implementation of it may
land.** **⟶ THIS PARAGRAPH'S GO-AHEAD HALF IS NOW SUPERSEDED (2026-09-27, the supervisor's DONE pass; the
as-filed sentences are kept visible): the architect GAVE the wave-D go-ahead (2026-09-27), the unit's
implementation HAS landed (the module + `reconcileMount()` + its regression rows), and the unit is `DONE` on
every leg this contract declares — read the dated STATUS NOTE at the head of this file, and `docs/next-steps.md`'s
`## DONE — U-MOUNTGUARD` record. The whole paragraph is now a record of the filing pass's blocker, not live
status.** Source of this unit:
`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s appended
**`Amendment record (A-d4…A-d8)` — the governing layer** (`S-d8`'s admission rule with the six
prohibitions; the `SCH-1` per-item row in §2.2; the `U-MOUNTGUARD` rows in §2.1/§3; `H-r4`/`H-r8`
as amended by `H-r20`), plus `docs/next-steps.md`'s `## OPEN` row **D1**
(`docs/specs/mount-invariant-guard.md` — **OWED — not filed**; this file is that filing) and the
pre-amendment eight-unit plan's `U2` row (kept for provenance: it is the row that names the owner
artifact and the four call sites).

## 0. The rulings this unit derives from (recorded, NOT re-opened) and the go-ahead

| # | Ruling | Where it lands here |
| --- | --- | --- |
| **1** | **`SCH-1` IS SPLIT** (`S-d2`, unchanged): the **cross-envelope mount cardinality/identity invariant** is ADOPTED as this repo's own unit; the **region host** half (`ShellRegionName`/`ShellRegionSpec`/`ShellRegions`) is **DECLINED + REFILED to the fork** and **is not restored by A-d7**. | §3, §7 item 2 |
| **2** | **The region half's blockers are `(C)#1` + `(C)#6`, NOT prohibition #5** (adjudicated in the amendment's §0 and restated in the `SCH-1` row of §2.2). It fails **(C)#1** as a consumer-specified closed region set and **(C)#6** (API-shape criteria plus a render-count row this repo refuses), and it is **redundant for the invariant it was meant to support** — a declared region sits **outside** the mount, so root counting is unaffected. | §3, §6 (prohibition table) |
| **3** | **The falsification is BINDING and unchanged:** a cycle-2 load into one mount yielding **2** engine-emitted roots ⇒ **a HOST fix is owed**; **1** ⇒ **detection + pin only**, and **no guard ships if the adversarial pass finds no reproduction**. This is the *only* ruling that decides the unit's shape. **⟶ ITS OUTCOME IS MEASURED (2026-09-27, the red-set pass): the red run produced `{"childCount":2,"count":2,"nodeIds":["node-234","node-246"]}` on a Runtime constructed but never `bootstrap()`ed — one `loadEnvelope` into one mount leaves TWO engine-emitted direct children, and the NON-placement attribution run reproduces `count 2`, so the read is not placement-specific. Rule 3's FIRST branch therefore FIRES: a HOST fix IS owed, and this unit's shape is §6 outcome (b). The finding, its mechanism, its reachability and the fix's required achievement are §3a's red-run block; the stop-condition state is §4.4 `S-1`.** | §4, §5.4, §7 item 3 |
| **4** | **The verification layer is HELD** (`S-d3`, `H-r5`): the DOM shim **must NOT be expanded**; real-DOM claims belong on the offscreen Electron legs. The **one** admitted shim carve-out (`H-r7`, `ShimElement.removeAttribute`) is **already landed** and is **not this unit's to touch**. | §2.2, §5.3, §6 (prohibition 6) |
| **5** | **The mount invariant's current behaviour is UNPROVEN** (the amendment's Layer declaration item 2): *"`U-MOUNTGUARD`'s red run is what settles the cardinality; this record asserts none."* **This spec asserts none either.** The per-teardown test that exists (`tests/runtime-host.test.ts:150-161`, read) is a **per-teardown** statement, **not** a cross-envelope one. | §2.4, §4.1, §7 item 4 |
| **6** | **The go-ahead for wave D does not exist yet.** The wave-B go-ahead is spent; *"No unit is delegable"* (amendment §3, `H-r20`). **This unit is BLOCKED on that go-ahead plus its red set.** **⟶ UPDATED (2026-09-27): the RED-SET half of this blocker is DISCHARGED** — the red set was authorised, written and RUN (`tests/mount-invariant-guard.test.ts`, 41 rows: 39 red / 2 pass, `aa8b92e`), so *"Status of its red set: RED SET OWED — NOT AUTHORED, NOT RUN"* above is **SUPERSEDED** and `AGENTS.md` item 9's condition (c) is met. **The architect's wave-D go-ahead half STANDS: this unit is still BLOCKED on it** for anything beyond `S-1`'s branch — and `S-1`'s branch (the probe + the `src/renderer/runtime.ts` fix + its regression row) is **itself implementation, so it is not delegable or landable under this amendment either.** **⟶ THE `S-1`-BRANCH HALF IS NOW LANDED (2026-09-27, the adversarial + blind-verification pass): the module, the fix (`reconcileMount()`) and the regression rows `M-17`/`M-18` exist and are green, with `M-19` appended to pin the never-bootstrapped teardown drive; the wave-D go-ahead half of this ruling is unaffected and STANDS.** **⟶ THE GO-AHEAD HALF IS NOW SUPERSEDED TOO (2026-09-27, the supervisor's DONE pass; keep the as-written cell visible): the architect GAVE the wave-D go-ahead (2026-09-27), so this ruling's whole blocker is discharged — the red set ran, the `S-1` branch landed, and the unit is `DONE` (the ledger's FOURTH `DONE` row). Ruling 6's SUBSTANCE survives as an ordering statement for the wave-D units that follow (`U-LISTHOST` → `U-SLOTHOST` → `U-PROJ`), each blocked only on its own red set — and `AGENTS.md` item 9 still applies to every one of them.** | this status block, §4.5, §7 item 1 |

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** No leg of it ran in this pass: no suite ran, no trio ran, no
Electron window booted, and **no probe result is recorded here**. Every row below is a *contract
row*, never a measurement.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, `src/renderer/runtime.ts` and this unit's own `src/shared/` module | not engine-internal behaviour |
| **[E]** | engine-side | the **installed** `provident-ssr@0.5.1` dist's own behaviour, as observed through a public engine surface | not a package defect call |
| **[U]** | real-DOM `ui` leg | `npm run ui` (`package.json:19`, read), the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity/divergence leg, **not** assembled-app acceptance |

**[B]**/**[A]** (the shim battery host and the `divergence` leg) are **not** layers this unit uses:
its only leg is the node suite (§5.3), and its optional real-DOM row is a `[U]` row.

**Three honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says
   this repo's vitest files pass against `src/shared/dom-shim.ts`. **No window is booted, no IPC
   round-trip runs, no MCP transport is exercised, and no real DOM is touched.** *A node-suite green
   is envelope/pure-layer evidence, **never assembled-app evidence*** — that sentence is part of
   this contract, not a caveat attached to it.
2. **The count the probe takes is a count of ENGINE-EMITTED elements**, never of DOM roots: only
   elements carrying `data-node-id` are engine-emitted (the opt-in `renderOptions` pinned at
   `src/renderer/runtime.ts:90`, read). A cross-envelope count of *DOM* roots is on the
   "what every node-green must NOT be claimed as" list (amendment's §"Adopted units' security /
   equivalence obligations") and is **not** this unit's claim.
3. **The probe's own subject is the SHIM's element tree.** The shim implements no
   `querySelector`/`querySelectorAll`/`closest`, no layout, no CSS resolution, and no
   `getComputedStyle` (`src/shared/dom-shim.ts:1-3` announces exactly this scope; read this pass,
   143 lines). **A `[T]` cardinality green says what the shim's tree holds under the engine's
   emitted output — it is not a real-DOM tree assertion.**

## 1. Scope

**One deliverable: a cross-envelope mount cardinality/identity probe** — the repo's own, in-tree
half of `SCH-1` — plus its red set, and **conditionally** a host fix in `src/renderer/runtime.ts`
**only if** the red run proves rule 3's two-root outcome. **⟶ THE CONDITION IS DISCHARGED
(2026-09-27, the red-set pass): the red run DID prove it (rule 3's first branch, §0 ruling 3's
amendment; the evidence is §3a's red-run block). The deliverable is therefore now BOTH halves — (1)
the module of §2.1 (`src/shared/mount-invariant-guard.ts`: the probe + the thin assert) and (2) **a
HOST fix in `src/renderer/runtime.ts`** with a regression row (§5.1 rows 1–3, §3.1 `M-17`/`M-18`).
The as-filed conditional phrasing above is kept visible and is **no longer conditional**. The fix is
owed by THIS unit and is not a `docs/defects.md` row (§3a, §4.4 `S-1`, the `R13-HOST-FIX`
precedent).**

1. **What the invariant is, stated in this spec's own voice.** *For one stable mount and one
   re-derivation path, at every point where the graph has been re-derived, the mount holds exactly
   one engine-emitted root element, and that element is the graph's current root node.* The mount
   reference may not change across re-derivations. **⟶ AMENDED WORDING (2026-09-27, the red-set
   pass) — read this as the governing phrasing, with the as-filed sentence kept above: *at every
   point where the graph has been re-derived* means at every point where the four re-derivation
   paths of item 4 **have produced a rendered graph** — `loadEnvelope`, `loadDoc`, the `code.*`
   route, and a cycle of any of them. THE TEARDOWN PATH IS NOT SUCH A POINT, and the invariant does
   **not** claim one root there: `teardown()` deliberately DETACHES the root element from the mount
   while the graph KEEPS the root node (`inTree === 1`) — `tests/runtime-host.test.ts:157`/`:160`
   assert `mount.innerHTML === ''`, the serialization side of the same fact. **Two layers, two facts,
   and the amended `M-11`/`M-12` rows assert BOTH halves. ⟶ RE-PINNED TO THE DRIVE (2026-09-27, the
   adversarial + blind-verification pass) — read this as the governing wording, with the red-set
   pass's unqualified sentence above kept visible and marked.** **The post-`teardown()` mount state is
   DRIVE-SPECIFIC, and it is stated here in the two cases the pass measured twice independently:**
   **(1) ON A BOOTSTRAPPED / RE-BASELINED RUNTIME (the landed drive, and the only drive the live boot
   order uses), `teardown()` leaves the mount with ZERO (`0`) engine-emitted direct children while the
   graph keeps the root (`inTree === 1`) — `M-11`/`M-12`'s measured case, unchanged.** **(2) ON A
   NEVER-BOOTSTRAPPED RUNTIME (`new Runtime({mount, envelope})` with NO `bootstrap()` and no prior
   load — the same public reachability §3a `RED-4` establishes), the FIRST `teardown()` leaves **ONE**
   engine-emitted root mounted and it is genuinely the graph's LIVE in-tree root (`listTargets` agrees;
   `census.inTree === 1`); cycles 2 and 3 then leave **0**, so the settled state is the same as (1) and
   only the FIRST cycle differs. **That difference is pinned by §3.1 `M-19`** (the appended row), and
   it is what makes `M-12`'s idempotence subject drive-specific: idempotence holds from the SETTLED
   point, not between cycle 1 and cycle 2.** **The mechanism, confirmed in code:** `tearDownGraph()`
   calls `render()`, and `render()`'s compile branch runs whenever `bootstrapped === false`
   (`src/renderer/runtime.ts:155-173`) — so on drive (2) the emptying render **MOUNTS** the graph it is
   about to discard and sets `bootstrapped = true`; `reconcileMount()` is reachable only through
   `resetRenderState()` (i.e. via a load), and `teardown()` never calls it. **§3.1 `M-19` pins this
   measured state, and it is NOT a regression row for the load-path fix: reverting `reconcileMount()`
   leaves `M-19` green.** *(**As-filed, superseded and kept visible — twice over:** the as-filed phrase
   "exactly one engine-emitted root element" read literally over the teardown path is **WRONG** — the
   measurement is `0` on drive (1) — and §3.2's own rule makes that state read as `'no-root'`, not as a
   one-root state; and the red-set pass's replacement sentence, *"the measured state after `teardown()`
   is **zero** engine-emitted direct children on the mount"*, is **unconditional and therefore WRONG on
   drive (2)**, where the first cycle measures **1**. Both supersessions are recorded here; the
   drive-specific phrasing above is the correction.)***
2. **What the probe is.** A **pure** function over an injected mount element (and an optional
   injected identity expectation + an optional injected callback) — **no ambient `document`, no
   `window`, no global lookup, no store, no I/O** (admission **(B)**; §2.1). It **observes**; it
   never renders, loads, tears down, dispatches, or mutates.
3. **What the unit may land.** Either (a) **detection + pin only** — the probe + its rows, no host
   change, if the red run yields **1**; or (b) **a host fix** in `src/renderer/runtime.ts` + the
   probe + the regression rows, if the red run yields **2**. **Rule 3's third clause binds both
   outcomes: if the adversarial pass finds no reproduction, NO GUARD SHIPS** — the unit then lands
   as its recorded red evidence + this spec's rows as *contract rows that failed their own
   falsification*, and the supervisor's DONE row must say so. **⟶ THE CHOICE IS MADE (2026-09-27,
   the red-set pass): branch (b) — the HOST fix + the probe + the regression rows. Branch (a) is NOT
   taken (the red run yielded `count 2`, not `1`), and rule 3's third clause (`S-2`) stays live
   against the ADVERSARIAL pass, which has not run: if that pass finds no reproduction, `S-2`'s
   no-guard landing is still the outcome and the host fix's regression row is reported as
   unreproduced rather than as green. The as-filed "either (a) … or (b)" phrasing is kept visible.**
   **⟶ THE PASS HAS RUN (2026-09-27, the adversarial + blind-verification pass) and it DID reproduce a
   violation (§4.4 `S-2`'s state block, §3b `ADV-1`/`ADV-8`), so `S-2`'s no-guard landing is NOT the
   outcome: the guard ships, and this unit's shape is branch (b) confirmed rather than branch (b)
   pending.**
4. **The four re-derivation paths the invariant is stated over** (each read this pass; **one of the
   four anchors the sources cite is STALE — see §8**):
   `loadEnvelope` (`src/renderer/runtime.ts:303`), `loadDoc` (`:330`), `teardown` (`:560`), and the
   `code.*` route — `codeLoad` (`:980`) → `loadEnvelope` (`:994`), entered from
   `codeLoadBatch` (`:1016`). Every one of them calls `tearDownGraph()` first (`:304`, `:331`,
   `:561`, and `:994`'s `loadEnvelope` call), **so all four are one code path with one mount**.

**Explicitly OUT of scope (do not do in this unit):**

- **The region host, in any spelling.** No `ShellRegionName`, `ShellRegionSpec`, `ShellRegions`, no
  region declaration, no region registry, no region→mount resolution. **Declined, not deferred to a
  later wave of this unit** (§0 rulings 1–2).
- **Any shim change.** `src/shared/dom-shim.ts` is **not touched**; the shim is host-owned test code
  and **no shim change is needed** (the leg cell of row D1) — the probe reads the shim's public
  element tree. The one admitted carve-out (`H-r7`) is landed and **not re-opened**.
- **Any new MCP surface.** No tool, resource, group, `VALID_GROUPS` member (`src/main/security.ts:134`,
  read: the five members `read`/`dispatch`/`graph`/`code`/`module`), renderer RPC method or
  `MUTATING_METHODS` entry (the set lives at `src/renderer/renderer.ts:12`, read — seven members).
  `ALL_TOOLS` **stays 21** for this unit (`src/main/mcp-server.ts:281-303`, read: 18 `provident.*`
  + the `module.*` trio; the `21 → 22` move belongs to `U-FOCUS-TOOL`).
- **Any registry, store, persistence, file, or `localStorage`.**
- **Any claim about render counts, listener removal, focus/`activeElement`, layout/paint,
  real clicks, or attribute absence after a close.** Each is on the amendment's
  "what every node-green must NOT be claimed as" list.
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists in this
  tree** (globbed `docs/skills/*` this pass: the directory holds `process-guardrails.md` alone), so
  there is **no test-use-case coverage matrix and no demo-page index to update**, and this unit
  changes no page design. **Recorded so no later pass hunts for an owed page-design edit.**
- **Any other wave-D/E/F unit.** `U-LISTHOST`, `U-SLOTHOST`, `U-PROJ`, `U-CENSUS` and every later
  unit are other units, with their own specs, reds and cycles (RCA-2).

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and throw pattern

**New module: `src/shared/mount-invariant-guard.ts`** (a pure `src/shared` module; no `electron`,
no `node:fs`, no `src/main/**`, no renderer import). **Four exports** — **two interfaces + two functions**; the module's three further interfaces (`MountRootObservation`, `MountViolation`, `MountExpectation`) are the field types of those two; **⟶ the as-filed phrase above counts the two exported FUNCTIONS and the two headline interfaces, and the landed module's export list is `MountRootObservation` · `MountViolationCode` · `MountViolation` · `MountInvariantResult` · `MountExpectation` · `probeMountInvariant` · `assertMountInvariant` (the seven declarations of this block, read on `src/shared/mount-invariant-guard.ts` by the doc review) — no eighth export exists, and `S-1` asserts that exactly the two FUNCTIONS are reachable at run time (the interfaces are type-only)** — and nothing else:

```ts
/** One engine-emitted element observed as a DIRECT child of the mount. */
export interface MountRootObservation {
  /** The `data-node-id` attribute value exactly as read off the element. */
  readonly nodeId: string
  /** The element itself, by reference (never a copy, never a clone). */
  readonly element: unknown
  /** The element's serialized open tag + inner HTML, as the shim emits it —
   *  recorded so a failure can be reported without re-reading the element. */
  readonly serialization: string
}

export type MountViolationCode =
  | 'no-root'                     // 0 engine-emitted direct children
  | 'multiple-roots'              // ≥ 2 engine-emitted direct children
  | 'root-identity-mismatch'      // exactly 1, but its nodeId ≠ expect.rootNodeId
  | 'mount-not-appendable'        // mount is malformed: not object-like, or has no children array
  | 'mount-reference-mismatch'    // expect.mount is supplied and !== mount
  | 'expect-mismatch'             // expect is present and not an object

export interface MountViolation {
  readonly code: MountViolationCode
  /** One sentence, in this unit's own voice, naming what was observed. */
  readonly message: string
  /** The count actually observed (0, 1, or N). */
  readonly count: number
  /** Every engine-emitted direct child's nodeId, in document order. */
  readonly nodeIds: readonly string[]
  /** Present only when `expect.rootNodeId` was supplied. */
  readonly expectedRootNodeId?: string
}

export interface MountInvariantResult {
  /** `true` iff there is EXACTLY ONE engine-emitted direct child and, when an
   *  expectation was supplied, its nodeId equals `expect.rootNodeId`. */
  readonly ok: boolean
  /** The number of engine-emitted direct children observed. */
  readonly count: number
  /** Every engine-emitted direct child, in document order. */
  readonly roots: readonly MountRootObservation[]
  /** Every DIRECT child that is NOT engine-emitted (no `data-node-id`). */
  readonly foreignSiblings: readonly unknown[]
  /** The mount element, by reference — returned so a caller can assert that
   *  the mount did not change across re-derivations. */
  readonly mount: unknown
  /** `null` when `ok`; otherwise exactly one typed violation. */
  readonly violation: MountViolation | null
  /** **⟶ ADDED 2026-09-27 (the per-unit documentation review, AGENTS.md item
   *  10d/RCA-6) — the SEVENTH field, documented here because the landed module
   *  returns it and `S-2`/`M-4` assert it.** The `expect.rootNodeId` value the
   *  caller supplied, echoed back; the field is ADDED only when a USABLE id was
   *  supplied (omitted / `null` / `''` / non-string ⇒ the field is ABSENT, the
   *  `M-5`/`F-10`/prohibition-3 rule), on the same `Object.prototype.hasOwnProperty`
   *  test `M-5` uses. It is therefore on the RESULT in the `ok` outcome and on
   *  `MountViolation` in the non-`ok` one (the declaration above; both are the
   *  same field name and presence rule). Landed module: `src/shared/mount-invariant-guard.ts:68-69`
   *  + `:174` (`assemble()`'s conditional spread). */
  readonly expectedRootNodeId?: string
}

export interface MountExpectation {
  /** The graph's current root nodeId. Omit to assert cardinality only. */
  readonly rootNodeId?: string | null
  /** The mount the caller believes it is probing (identity, by reference). */
  readonly mount?: unknown
}

/** PROBE (pure, total, non-throwing). Reads mount.children and each direct
 *  child's `data-node-id`; never renders, loads, tears down or mutates. */
export function probeMountInvariant(
  mount: unknown,
  expect?: MountExpectation | null,
): MountInvariantResult

/** ASSERTION (calls the probe once, then throws on a violation). */
export function assertMountInvariant(
  mount: unknown,
  expect?: MountExpectation | null,
): MountInvariantResult
```

**The throw pattern, exactly.** `probeMountInvariant` **never throws** — not for a `null`/`''`/
string/number/array mount, not for a malformed `expect`, not for an unreadable child. It returns
`ok:false` with a typed `violation` (`'mount-not-appendable'` for a malformed mount,
`'expect-mismatch'` for a malformed `expect`). **⟶ ONE MIS-TYPING RECORDED (2026-09-27, the
adversarial + blind-verification pass; §3b `ADV-5`, `ACCEPTED-AS-PINNED`):** a mount that IS
object-like but whose `children` getter THROWS is refused as **`'mount-not-appendable'`** — the same
code as a genuinely malformed mount. The probe stays **total** (that is the contract), and the six
codes have no member for *"the tree could not be read"*; **a caller must not read
`'mount-not-appendable'` as proof that the mount's SHAPE is wrong.** Adding a seventh code would be a
surface change (§2.1's exact-surface rule, `S-2`) and is not done here. `assertMountInvariant` calls the probe **exactly
once** and:

| Case | `assertMountInvariant` behaviour |
| --- | --- |
| `ok === true` | returns the **same** result object it read |
| `ok === false` | **throws** `Error` whose `message` begins `mount invariant violated (<code>):` and continues with `violation.message`; the thrown object carries **no** additional properties (a plain `Error`, matching this repo's existing throw style at `src/renderer/runtime.ts:1178`, read) |
| the probe itself were to throw | not a case — **the probe is total by contract, and a test that observes it throwing is a red row of its own** |

**Why a result object AND an assert function.** The result object is what a **probe/red row** needs
(it must be able to *record* a violation, not die on it), and the assert function is what a
**regression row** needs. **A guard that only threw could not produce the red evidence rule 3
depends on.**

### 2.2 What is CALLER-SUPPLIED, and what the unit may NOT contain

**Caller-supplied (never built in, never defaulted, never enumerated):** the **mount element**; the
**expected root nodeId** (or its absence); the **mount identity expectation**; and — if a later pass
adds one — any **observer callback**. There is **no built-in vocabulary of any kind**: no region
name, no mount id, no tag name, no `data-node-id` value list, no element-type enum, no default
expectation. The only string literals the module may contain are **the probe's own contract
literals**: the observed attribute name `data-node-id`, the six `MountViolationCode` members, the
`'mount invariant violated ('` message prefix, and the diagnostic sentences.

**The six prohibitions (`H-r8`), as this unit's own assertion set — every row must be able to FAIL:**

| # | Prohibition | This unit's binding assertion | Pinned by |
| --- | --- | --- | --- |
| **1** | **No consumer vocabulary** as a symbol, closed union member, default or documented constant | The module contains **no** `region`/`Region`/`pane`/`tab`/`zone`/`ShellRegionName`/`ShellRegionSpec`/`ShellRegions` occurrence **at all** (source-level static row), and its only string-union is the six-member `MountViolationCode` whose members are contract diagnostics, not consumer values. Consumer values cross as **opaque strings** (`data-node-id` values are never enumerated). | static source row over the module file |
| **2** | **No app UI content** authored | The module creates **no** element, authors **no** text, **no** class, **no** style, **no** affordance, and emits **nothing** into any tree. It is a **reader**. *(This is what makes it a mechanism and not a UI element — `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`, `docs/decisions.md:54`.)* | static row: zero `createElement`/`document`/`body`/`textContent` writes |
| **3** | **No policy defaults** | There is no default expectation, no "assume 1", no default mount, no fallback rootNodeId. An omitted `expect.rootNodeId` means **cardinality-only**, and the result reports `expectedRootNodeId` **absent** — a row asserts that absence. | §3.1 rows + a row asserting the field is omitted |
| **4** | **No UI-config store or persistence** | Zero store, zero persistence, zero module-level mutable state, zero file/`localStorage`/IPC. The module holds **no state between calls** — a row probes twice with the same arguments and asserts byte-identical results + no retained reference. | static row + an idempotence row (§3.3) |
| **5** | **No new MCP surface** — the **five-seam negative** | No tool, no resource, no group, no `VALID_GROUPS` member (`src/main/security.ts:134`), no `RpcMethod` member (`src/shared/types.ts:259-281`, read: **21** members), no `MUTATING_METHODS` entry (`src/renderer/renderer.ts:12`), **and no IPC method at all**. `ALL_TOOLS` **stays 21**. | `tests/engine-pin-version.test.ts:174-197`'s census row (read: 21 keys, asserted 21) **must still pass unchanged**; plus a static import row |
| **6** | **No unverifiable criterion** | Every row of §3 is falsifiable on **[T]/[H]** alone. The unit asserts **no** layout, paint, focus, listener-removal, real-click or real-DOM-tree property, **and its module expands no shim member** (§2.4). The **optional** `[U]` row (§5.3) is the only real-DOM row and it is **optional** and **precondition-gated**. | the `[U]` row is marked optional; every §3 row carries `[T]`/`[H]` |

### 2.3 What it must NOT do (the short list, for the TestWriter)

- **No render/load/teardown/dispatch/mutation call** from the module — a static row asserts the
  module imports nothing from `src/renderer/**` and calls no `render`/`load`/`apply`.
- **No DOM writes beyond what is pinned — and what is pinned is NOTHING.** The module writes
  nothing: it does not append, remove, reorder, or set an attribute. (`U-LISTHOST`/`U-SLOTHOST` are
  the units that write; this one reads.)
- **No global lookup**: no `document`, `window`, `matchMedia`, `getComputedStyle`, `activeElement`,
  `querySelector`, `querySelectorAll`, `getElementById`, `closest`.
- **No registry/store**, no caching keyed on the mount, no `WeakMap` of mounts.
- **No MCP surface, no vocabulary, no literals** beyond §2.2's list.

### 2.4 How the probe reads the tree (so the layer is not over-read)

1. **Direct children only.** The engine-emitted roots are the **direct** children of the mount
   carrying `data-node-id` (`src/renderer/runtime.ts:90`'s `{ nodeIdAttribute: true }`, read: every
   emitted element carries its engine `nodeId` in **both** views). Nested elements are **not**
   counted — `SCH-1`'s claim is about **roots**.
2. **Serialization-derived read, no query API.** The attribute value is read off the child's
   **own attribute surface**: a child exposing `getAttribute('data-node-id')` is read through it;
   otherwise the value is parsed out of the child's serialized form (`outerHTML` in the shim,
   `src/shared/dom-shim.ts:108-119`, read — which emits `attrs` then the `id` slot then
   `class`/`style`). **The module must not require `querySelectorAll` anywhere**, matching `SCH-11`'s
   own acceptance line for the sibling unit. **⟶ KNOWN LIMITATION OF THE FALLBACK (2026-09-27, the
   adversarial + blind-verification pass; recorded, NOT a defect): because the fallback parse is
   UNANCHORED, a direct child that carries no `data-node-id` of its OWN but contains a NESTED element
   that does can be counted as a ROOT. The fallback is required behaviour (§2.4 item 1 pins *direct
   children only* for the tree read, and a query-API-free read is what this item mandates), so the
   over-count is a known cost of the second route — §3b `ADV-6`, `ACCEPTED-AS-PINNED`.**
3. **`foreignSiblings` is defined by absence of `data-node-id`** among the mount's direct children.
   That is exactly the class `SCH-11`/`SCH-9` call foreign siblings; this unit never removes them,
   it **reports** them.
4. **No shim member is required and no shim member may be added.** The probe is written against
   the shim's **already-public** surface (`children`, `getAttribute`, `outerHTML`) — which is why
   the row's leg cell says *no shim change is needed*. **A red run that "needs" a new shim member is
   a scope violation, not a red** (`H-r5`; the sole carve-out is landed and closed).
5. **The mount is not resolved by id.** The mount is whatever element the caller injects; the
   module never calls `getElementById` (the shim's `getElementById` **auto-creates** on a miss —
   `src/shared/dom-shim.ts:126-129`, read — so a lookup-based probe would silently probe a **new,
   empty** element and report a false `'no-root'`). **That hazard is named here so no later pass
   "simplifies" the probe into a lookup.**

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[E]** engine-side · **[U]** real-DOM
`ui` leg (see the Layer declaration). Every row is a **contract row** for the TestWriter to turn
into a test; **none is a measurement this pass took.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **M-1** | **One engine-emitted root — fresh graph** | `new Runtime({ mount, envelope: demoEnvelope() })`; `bootstrap()`; `probeMountInvariant(mount)` | `ok === true`; `count === 1`; `roots.length === 1`; `violation === null`; `roots[0].nodeId` is a **non-empty** string; `roots[0].element` is a **direct child of the mount by reference** (present in `mount.children`) | `[T]`/`[H]` |
| **M-2** | **One engine-emitted root — after ONE re-derivation** | `loadEnvelope(demoEnvelope())` (cycle 2) | `ok === true`; `count === 1`; `violation === null` | `[T]`/`[H]` |
| **M-3** | **THE CROSS-ENVELOPE ROW (the unit's reason to exist)** | Two loads into **one** mount, in **one** sequence, with the **same** mount reference | **⟶ AMENDED (2026-09-27, the red-set pass) — read this as the governing wording; the as-filed wording is kept below and marked.** **THE FIVE OBSERVATION POINTS, exact, and the count each one holds:** **P0** = constructed but **BEFORE `bootstrap()`** ⇒ **`count === 0`** — this is `F-2`'s state (`'no-root'`), **NOT** a one-root state; **P1** = after `bootstrap()` (the fresh graph, `M-1`'s state) ⇒ `count === 1`; **P2**/**P3**/**P4** = after load #1 / #2 / #3 ⇒ `count === 1` each. The row's required behaviour is therefore **`count === 1` at every observation point where the graph has been rendered (P1–P4), and `count === 0` at the pre-bootstrap point (P0)**; **`count === 2` at ANY point is rule 3's HOST-fix branch and the row is reported as such, never softened. ⟶ MEASURED (2026-09-27): this row's own five points read `0 / 1 / 1 / 1 / 1`, so `M-3`'s drive alone does NOT produce the two-root read — the `count === 2` observation was made by the **`M-14` reproducer** (`new Runtime(…) → loadEnvelope(placementEnvelope(4))`, the as-written `M-14` drive) and by its non-placement attribution run (§3a `RED-1`/`RED-2`). `M-3`'s expectations above are therefore UNCHANGED and its row stands; no expectation of it is loosened by the measurement.** *(**As-filed, superseded and kept visible:** *"`count === 1` **at every observation point** — before the first load, after the first, after the second, and after a third."* The bracketed "before the first load" cannot hold for a **pre-bootstrap** mount: a Runtime constructed and not yet `bootstrap()`ed has no rendered graph, and `F-2` pins that state at **`0`**. The two readings are reconciled by naming the point: **point 1 = the bootstrapped fresh graph** — the first observation point that is a root state — while the pre-bootstrap point is **recorded as `0`** and asserted as `F-2`'s state.)* | `[T]`/`[H]` |
| **M-4** | **Identity — the root is the graph's current root node** | `probeMountInvariant(mount, { rootNodeId })` where `rootNodeId` is read from the graph (e.g. the in-tree node whose `propsId`/`cssId` matches the envelope's root) | `ok === true`; `roots[0].nodeId === rootNodeId`; `expectedRootNodeId === rootNodeId` **— read this against §2.1's result shape: the field is on the RESULT (and on `MountViolation` in the non-`ok` outcome), added only when a usable `rootNodeId` was supplied (the amended §2.1 block's cross-reference; `S-2` asserts both key sets)** | `[T]`/`[H]` |
| **M-5** | **Cardinality-only mode omits the identity field** | `probeMountInvariant(mount)` (no `expect`) | `ok === true`; `expectedRootNodeId` is **absent** (`Object.prototype.hasOwnProperty` is `false` — not `undefined`, not `null`); prohibition-3 row | `[T]` |
| **M-6** | **Mount identity does not change across re-derivations** | Capture `mount`; run N re-derivations; `probeMountInvariant(mount, { mount })` | Every call returns `mount` **by reference** equal to the captured mount; `violation` is never `'mount-reference-mismatch'` | `[T]`/`[H]` |
| **M-7** | **Foreign siblings are reported, never swept** | Append two caller-created elements to the mount **before** the probe (no `data-node-id`); probe | `ok === true`; `count === 1`; `foreignSiblings.length === 2`; both are the **same references**, in document order; the probe **removed nothing** (`mount.children.length` unchanged) | `[T]` |
| **M-8** | **A `null`/absent mount is a typed refusal, not a throw** | `probeMountInvariant(null)` / `undefined` / `''` / `42` | returns (does not throw); `ok === false`; `violation.code === 'mount-not-appendable'`; `count === 0`; `roots` empty; `mount` echoes the argument | `[T]` |
| **M-9** | **A malformed `expect` is a typed refusal, not a throw** | `probeMountInvariant(mount, 'nope')` / `42` / `[]` | returns; `ok === false`; `violation.code === 'expect-mismatch'` | `[T]` |
| **M-10** | **`assertMountInvariant` returns the probe's own result on success** | `assertMountInvariant(mount)` on M-1's state | returns an object **deep-equal** to the probe's result and **identity-equal** to the probe's single call result; throws nothing. **⟶ LIMITATION RECORDED (2026-09-27, the red-set pass — the TestWriter's report): the "identity-equal to the probe's single call result" half is NOT OBSERVABLE on `[T]`.** §2.1's surface exposes **no seam** into the assertion's internal call (the probe is called inside `assertMountInvariant` and nothing is injected or instrumented), so a `[T]` row **cannot** compare the assertion's return value against the probe's *internal* single call. **The closest falsifiable form is used and it is this row's contract:** the assertion throws nothing on M-1's state, its result is **projection-deep-equal** to a separate `probe(mount)` call on the same state, and its result carries the **tree's own references, not copies** (`roots[0].element` is the same object as the direct child, and `roots[0].element` is identity-equal to the reference the separate probe call returned; `mount` echoes by reference). **"`assertMountInvariant` calls the probe exactly once" remains a §2.1 contract clause — it is stated, and it is NOT a `[T]` row of this unit**; a later pass that wants the identity half must add an admitted seam, which is a surface change and needs its own gate. | `[T]`/`[H]` |
| **M-11** | **`teardown` leaves the mount with ZERO engine-emitted roots — ON THE BOOTSTRAPPED / LANDED DRIVE** | **THE DRIVE, NAMED (2026-09-27, the adversarial + blind-verification pass): `teardown()` on the LANDED graph — the landed/demo runtime, i.e. a runtime that HAS `bootstrap()`ed (the landed test's own `bootedDemo()` helper, `tests/mount-invariant-guard.test.ts:280-284`).** **⟶ `M-19` (§3.1, appended) IS THIS ROW'S NEVER-BOOTSTRAPPED COUNTERPART, and `count === 0` HERE IS NOT AN UNCONDITIONAL CLAIM:** on a runtime that was **constructed and never `bootstrap()`ed**, the **first** `teardown()` leaves **1** mounted root while later cycles leave **0** (`M-19`, measured; §1.1's drive-specific re-pinning). **A reader may not generalise this row's `0` to every drive — the drive is part of the row.** | `teardown()` on the landed graph | **⟶ AMENDED TO THE MEASUREMENT (2026-09-27, the red-set pass) — read this as the governing expectation; the as-filed expectation is kept below and marked.** **After `teardown()` the mount's engine-emitted direct children are `0` (`count === 0`) and the mount's serialization is EMPTY (`mountHTML: ""`).** The row therefore asserts **BOTH HALVES of the two-layer fact, and a pass may not assert only one:** **(a) THE MOUNT HALF** — the probe on the mount reports `count === 0`, `roots` empty, `ok === false`, `violation.code === 'no-root'` (§3.2's own rule: a state with no engine-emitted root **is** `'no-root'`), matching `tests/runtime-host.test.ts:157`/`:160`'s `mount.innerHTML === ''`; and **(b) THE GRAPH HALF** — the root node stays in the graph: the post-teardown census reads `inTree === 1`, and exactly one node is in tree (the root). **The root is deliberately detached from the mount while the graph keeps it; that is the whole content of this row.** A row that asserts `count === 1` after `teardown()` **contradicts the measurement and is not this contract.** *(**As-filed expectation, SUPERSEDED and kept visible:** *"`count === 1` and the probe reports that root as the **graph root** … **the mount's direct children are exactly one `data-node-id` element after teardown**, matching `tests/runtime-host.test.ts:150-161`'s `mount.innerHTML === ''` from the **serialization** side of the same fact."* **The measurement is `0`, and the cited serialization line says `''` — so the as-filed row was internally inconsistent: it took a one-root reading of a citation that asserts an EMPTY mount.** The citation resolves; the as-filed count does not.)* | `[T]`/`[H]` |
| **M-12** | **`teardown` is idempotent across N cycles** | `teardown()` × 3 | **⟶ AMENDED TO THE MEASUREMENT (2026-09-27, the red-set pass), consistently with `M-11`: `count === 0` after EACH of the three cycles, with `mountHTML === ""` and the graph still `inTree === 1`; and `ok === false` with `violation.code === 'no-root'` after each. Idempotence is the row's subject: cycle 1, 2 and 3 all hold the SAME state (`0` on the mount, `1` in the graph) — a later cycle that produced a DIFFERENT count would be the failure the row rejects, in either direction (`1` or `2`).** *(**As-filed expectation, SUPERSEDED and kept visible:** *"`count === 1` after each; `ok === true` after each."* The measurement is `0` after each, so the as-filed half read the mount as still holding the root; the amended row keeps both halves of the two-layer fact instead.)* **⟶ THE DRIVE IS PART OF THIS ROW (2026-09-27, the adversarial + blind-verification pass): this row's `count === 0` after EACH of the three cycles is the BOOTSTRAPPED / LANDED drive — the landed `bootedDemo()` helper (`tests/mount-invariant-guard.test.ts:280-284`).** **Idempotence is therefore DRIVE-SPECIFIC: on a never-bootstrapped runtime the cycles are NOT all the same — cycle 1 holds `1` and cycles 2/3 hold `0` (§3.1 `M-19`, the never-bootstrapped counterpart). The SETTLED state is idempotent on both drives; the claim "all three cycles are identical" is true only on this row's drive.** | `[T]`/`[H]` |
| **M-19** | **⟶ NEW (2026-09-27, the adversarial + blind-verification pass) — THE NEVER-BOOTSTRAPPED TEARDOWN DRIVE (the drive whose state both passes measured and neither the spec nor `docs/decisions.md` pinned)** | **`const mount = mountEl(); const rt = new Runtime({ mount, envelope: demoEnvelope() })` with NO `bootstrap()` call and NO prior load — i.e. constructed-and-never-rendered — then `teardown()` × 3.** This is `M-11`'s counterpart and it is a **distinct id** from `M-11` (bootstrapped drive) and from the host's load-then-teardown row (`tests/runtime-host.test.ts:150-161`) | **THE MEASURED STATE, per cycle, verbatim:** **cycle 1 — `count === 1`** (one engine-emitted direct child; the probe reports `ok === true` / `count === 1` / `violation === null`), the mounted element's `class` is the demo shell root (`"demo-shell"`, serialized `<div data-node-id="…" id="preempt-node-…" class="demo-shell"></div>`, empty body), **and the mounted element IS the graph's live in-tree root** — `listTargets()`'s in-tree node-id list is exactly the mount's observed `nodeIds` (`census.inTree === 1`, `{"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}`); **cycles 2 and 3 — `count === 0`** with `mountHTML === ""` and the probe reporting `ok === false` / `violation.code === 'no-root'`; **and the DIFFERENCE IS ASSERTED, not assumed** (cycle 1 ≠ cycle 2 in `childCount`/`count`/`mountHTML`; cycle 3 === cycle 2). **Every cycle's teardown census reads `inTree === 1`.** **WHY THE ROW EXISTS:** with `M-11`/`M-12` it pins the **drive-specific** truth of §1.1 and `M-12` — a reconciliation bolted onto `teardown()` that zeroed cycle 1 would redden here. **NOT a regression row for the load-path fix:** reverting `reconcileMount()` leaves this row **green** (the teardown path never calls it) | `[T]`/`[H]` |
| **M-13** | **The `code.*` route enters the same invariant** | `codeLoad(envelope)` (`src/renderer/runtime.ts:980`, which calls `loadEnvelope` at `:994`); then `codeLoadBatch([…])` (`:1016` → `codeLoad` at `:1064`) | `count === 1` after each; the **first** `codeLoadBatch` is the row that exercises the multi-step staging path | `[T]`/`[H]` |
| **M-14** | **The placement-routed path obeys the same invariant** | `loadEnvelope(placementEnvelope(4))` — the path-enumeration `compilePath` case (`tests/runtime-host.test.ts:183-189`, read: `inTree === 7`) **⟶ MEASURED (2026-09-27, the red-set pass): this is the row that produced the `count 2` observation — the as-written drive is `new Runtime({mount, envelope}) → loadEnvelope(placementEnvelope(4))` with NO `bootstrap()` call — i.e. the §3a `RED-4` reachable sequence. **⟶ IT IS GREEN ON THE FIXED TREE (2026-09-27, the adversarial + blind-verification pass): the fix `reconcileMount()` has landed and this row passes; its ATTRIBUTION half (`plainRaw`) is now an ASSERTION rather than a failure-message interpolation, so a placement-only fix reddens here. Its RED state against the pre-fix tree stands as the §3a `RED-1` record.** | `count === 1`; `ok === true`. **This is the row that distinguishes "one root" from "one element"** — a depth-4 tree emits many elements, and the probe counts only **direct mount children** | `[T]`/`[H]` |
| **M-15** | **`loadDoc` (the snapshot path) obeys the same invariant** | `loadDoc(doc)` where `doc` comes from `exportSerialized()` (`src/renderer/runtime.ts:516`) | `count === 1`; `ok === true` | `[T]`/`[H]` |
| **M-16** | **Round-trip identity: legacy → serialized → legacy** | `loadEnvelope(env)` → `exportLegacy()` (`:501`) → `loadEnvelope(exported)` → `exportSerialized()` → `loadDoc(…)` | `count === 1` at each step; **no cycle accumulates a second root** | `[T]`/`[H]` |
| **M-17** | **⟶ NEW (2026-09-27, the red-set pass) — THE HOST-FIX REGRESSION ROW (the reproducer of §3a `RED-1`)** | **`const mount = mountEl(); const rt = new Runtime({ mount, envelope: demoEnvelope() }); rt.loadEnvelope(demoEnvelope())`** — i.e. **a load into a Runtime that was CONSTRUCTED but NEVER `bootstrap()`ed**, which is exactly the landed host sequence at `tests/runtime-host.test.ts:183-189` and exactly the sequence the red run measured at `count 2` | **`count === 1`** (on the mount, engine-emitted DIRECT children, per §2.4) **and the probe reports `ok === true`, `count === 1`, `violation === null`** — the same expectations as `M-2`'s state, entered by the SEQUENCE rather than by the envelope. **This is the row that failed on the pre-fix tree** (§3a `RED-1`'s raw `{"childCount":2,"count":2,"nodeIds":["node-234","node-246"]}`) and the row the host fix had to turn green — **and it IS green on the fixed tree (2026-09-27, the adversarial + blind-verification pass): the row now EXISTS in `tests/mount-invariant-guard.test.ts` and passes; reverting `reconcileMount()` in an out-of-tree mirror reddens it.** **It asserts the probe's result, not a private seam** — the probe of §2.1 is this unit's acceptance instrument. Preconditions the row asserts so it cannot pass for the wrong reason: the census reports a non-root graph (`inTree > 1`) and the mount is the SAME reference captured before the load | `[T]`/`[H]` |
| **M-18** | **⟶ NEW (2026-09-27, the red-set pass) — the ATTRIBUTION row (the defect is not placement-specific)** | The same construct-then-load sequence of `M-17` with the **NON-placement** demo envelope, AND the placement-routed variant of `M-14` (`loadEnvelope(placementEnvelope(4))`) | **`count === 1` in both.** The red run measured **`count 2` in the non-placement attribution run** (§3a `RED-2`), so neither half may be excused as a placement artefact (§3a `RED-1`). The row exists so a fix that repairs only the path-enumeration case is **red**, not green | `[T]`/`[H]` |

### 3.2 Documented fail-states (each is a typed violation, and each is a row)

| id | Fail-state | Trigger (exact) | Required behaviour | Layer |
| --- | --- | --- | --- | --- |
| **F-1** | **Two or more engine-emitted roots in one mount** — the defect class this unit exists for | Any re-derivation sequence whose mount holds ≥ 2 `data-node-id` direct children | `ok === false`; `violation.code === 'multiple-roots'`; `count === 2` (or N); `nodeIds` lists **every** child in document order; `assertMountInvariant` **throws** with the `multiple-roots` prefix. **RULE 3: this row is the HOST-FIX branch** — the finding lands in this spec's §3a (a host finding is **not** a `docs/defects.md` row: the `R13-HOST-FIX` precedent, `docs/decisions.md:39`, read) **⟶ AND IT HAS FIRED (2026-09-27, the red-set pass): the defect class is INSTANTIATED in this tree, not hypothetical — §3a `RED-1` carries the verbatim two-root observation, and the `M-3`/`M-14` raw rows are its evidence. `F-1`'s own `twoRootState()` row (a **caller-supplied** second root) stays a distinct row: it pins the PROBE's report on a two-root mount, while `RED-1` pins the ENGINE's production of one via a load.** | `[T]`/`[H]` |
| **F-2** | **Zero engine-emitted roots** | A mount with no `data-node-id` direct children — e.g. a mount never bootstrapped, or an empty fresh mount before `bootstrap()` | `ok === false`; `violation.code === 'no-root'`; `count === 0`; `roots` empty. **Not** an exception, and **not** reported as `ok` | `[T]` |
| **F-3** | **Root identity mismatch** | Exactly one root whose `nodeId` ≠ `expect.rootNodeId` (e.g. a **stale** expectation captured before a reload whose envelope has a different root) | `ok === false`; `violation.code === 'root-identity-mismatch'`; `count === 1`; `expectedRootNodeId === expect.rootNodeId`; `nodeIds[0]` is the **observed** root | `[T]`/`[H]` |
| **F-4** | **Mount reference mismatch** | `probeMountInvariant(mountB, { mount: mountA })` where `mountA !== mountB` | `ok === false`; `violation.code === 'mount-reference-mismatch'`. **This is the row that makes "one stable mount" checkable** — it is a violation of the caller's own claim, not of the tree | `[T]` |
| **F-5** | **Malformed mount** | `null` / `undefined` / a string / a number / an array / an object with a non-array `children` | `ok === false`; `violation.code === 'mount-not-appendable'`; **no throw** | `[T]` |
| **F-6** | **Malformed `expect`** | A non-object, non-nullish `expect` | `ok === false`; `violation.code === 'expect-mismatch'`; **no throw** | `[T]` |
| **F-7** | **A child that exposes no readable attribute surface** | A direct child that is neither `getAttribute`-bearing nor serializable | **The probe must not throw**: the child is counted as **engine-emitted only if a non-empty `data-node-id` can be read**; otherwise it lands in `foreignSiblings`. **A row asserts the no-throw and the placement** | `[T]` |
| **F-8** | **A duplicated `data-node-id` among direct children** | Two children carrying the **same** `data-node-id` (the same engine node emitted twice) | `ok === false`; `violation.code === 'multiple-roots'`; `count === 2`; `nodeIds` contains the value **twice** (the probe reports duplicates, it does not dedupe — deduping would hide F-1) | `[T]` |
| **F-9** | **An empty-string `data-node-id`** | A child with `data-node-id=""` | Counted as **NOT engine-emitted** (empty ⇒ unreadable value), so a mount whose only child has `data-node-id=""` reports **`'no-root'`**, not `ok`. **Recorded because the engine emits a real nodeId in practice and a blank value must never satisfy the invariant** | `[T]` |
| **F-10** | **The probe is called with a second argument of `null`** | `probeMountInvariant(mount, null)` | Behaves exactly as the omitted-`expect` case (M-5): `ok === true` on M-1's state, `expectedRootNodeId` absent **and no `expect-mismatch`** | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here |
| --- | --- | --- |
| **I-1** | `roots.length === count` **always**, and `nodeIds.length === count` **always** | The three fields cannot disagree; a row asserts it for M-1, M-8, F-1 and F-5. **⟶ AMENDED (2026-09-27, the red-set pass) — read this as the governing wording, and do NOT satisfy it literally by adding a field.** **`nodeIds` is NOT a top-level field of the result**: §2.1's surface has **no top-level `nodeIds`** — it lives on `MountViolation.nodeIds` alone, and §2.1's exact-surface rule plus `S-2` (the surface row) **fail a module that adds one**. The invariant therefore reads: **`roots.length === count` always**, and **the `nodeIds` list, in whichever layer it exists, has length `=== count`** — the violation's `nodeIds` in every **non-`ok`** state (where §2.1 requires it), and `roots.map(r => r.nodeId)` in the **`ok`** state (where there is no violation to carry it). **A row asserts exactly that, for `M-1`, `M-8`, `F-1` and `F-5`.** *(**As-filed, superseded and kept visible:** *"`nodeIds.length === count` **always**"* — read literally it demands a top-level `nodeIds`, which would **break `S-2`** and §2.1's exact-surface rule; the red set already reads the list from the violation else from `roots`, which is the corrected reading.)* |
| **I-2** | `violation === null` **iff** `ok === true`; `violation !== null` **iff** `ok === false` | No "ok with a violation" state exists |
| **I-3** | The probe performs **zero** writes: `mount.children` is **reference-identical (element-by-element, in order)** before and after every call, and no child's attribute set changes | The read-only claim, made falsifiable |
| **I-4** | The probe holds **no state**: calling it twice with the same arguments returns deep-equal results, and the second call is unaffected by the first | Prohibition 4's row |
| **I-5** | `mount` echoes the **exact argument** by reference (never a copy) in every outcome, including the malformed-mount case | Lets a caller chain a mount-identity check |
| **I-6** | No outcome depends on the **order** in which the caller called anything else — the probe reads the tree as it finds it | Purity |

## 4. The red (RCA-1) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — this unit's rows are not present anywhere today, so unlike
`U-ENGINE-DRIFT` (whose red was the existing suite under a moved pin) this unit's red is **authored
first and RUN**. Proposed path: **`tests/mount-invariant-guard.test.ts`**. **The red run's
observed outcome is the unit's decisive fact and must be quoted verbatim:**

- If `count === 1` at every observation point of M-3 (and the identity rows hold): the red set's
  guard-dependent rows (`F-1`…`F-10`-by-assert) fail with *"module does not exist / is not a
  function"*, and the **host-fix branch is NOT taken**. The unit lands as **detection + pin only**.
- If `count === 2` at any observation point: **the red set's `M-3` row fails against the SHIM
  TREE**, and that failure **names a host defect** — a second engine-emitted root surviving a
  re-derivation into one mount. **That is rule 3's HOST-fix branch**, and the fix is in
  `src/renderer/runtime.ts` (the `tearDownGraph()`/diff-removal path, `:777-795` read), **not**
  in the probe. The finding is recorded in **§3a** of this spec — **never** in `docs/defects.md`
  (the `R13-HOST-FIX` precedent, `docs/decisions.md:39`, read).

**The red must be reported with the raw observed `count`, the raw `nodeIds`, and the mount's child
count — never as a summary.** A red run reported as *"the probe does not exist yet"* **without** the
`count` observation **has not settled rule 3** and may not be reported as this unit's red.

### 4.2 Red-set authoring order and the ⛔ shape

1. **Write all §3 rows first**, in this order: `I-1`..`I-6`, `M-1`..`M-16`, `F-1`..`F-10`.
2. **RUN them** on the untouched tree and **REPORT** the failing set verbatim (expected:
   `Cannot find module '../src/shared/mount-invariant-guard.js'` — or the equivalent — for every
   row, **plus** whatever `M-3`'s raw count turns out to be, measured **directly against the
   mount** so the count is obtainable **before** the module exists — this is the one row whose
   *observation* is written against the tree, not against the module; it is the reason the red can
   settle rule 3 at all).
3. **Only then** implement the least code that makes them green.
4. **Re-run** and record the green. **No test row may be edited to reach green**; a row that turns
   out to be wrong is corrected in **this spec** first, with the old text kept as `SUPERSEDED`.

### 4.3 What the red is NOT

- **Not a shim change.** `src/shared/dom-shim.ts` stays at its landed state; an "add
  `querySelectorAll` so the probe can count" move is a **scope violation** (`H-r5`).
- **Not a licence to edit an existing test.** `tests/runtime-host.test.ts`'s per-teardown row
  (`:150-161`) is **read-only evidence** for M-11 and is **never edited**.
- **Not a real-DOM run.** The `[U]` row is optional and precondition-gated (§5.3).
- **Not a measurement of the assembled app.** §Layer declaration, anchor 1.

### 4.4 The stop conditions (binding)

**⟶ STATE OF THE TABLE (2026-09-27, the red-set pass, **AMENDED BY THE ADVERSARIAL +
BLIND-VERIFICATION PASS** — the table itself is NOT re-ordered, re-numbered
or re-worded; this block records each stop condition's measured state, the amended state LAST):**
**`S-1` is HIT AND TAKEN.** **`S-2` is DISCHARGED — the ADVERSARIAL + BLIND-VERIFICATION pass HAS RUN
and it DID reproduce a violation (§3b `ADV-1`/`ADV-8`, §3.1 `M-19`), so `S-2`'s no-guard landing is
NOT the outcome.** (`S-3` is discharged — the red DID obtain raw counts; `S-4` did not fire; `S-5`
did not fire.) *(**As filed by the red-set pass, SUPERSEDED and kept visible:** "`S-2`, `S-3`, `S-4`
and `S-5` are NOT reached / still live (`S-2` binds the adversarial pass, which has not run…)").*

| # | Stop condition | Required behaviour | **State (2026-09-27)** |
| --- | --- | --- | --- |
| **S-1** | The cycle-2 count is **2** | **STOP implementation of the probe-first sequence and take the HOST-fix branch** — fix `src/renderer/runtime.ts`, add the regression rows, and record the finding in §3a. **Do not ship the probe as if the invariant held.** | **⟶ HIT AND TAKEN.** The measured count is **2** (`{"childCount":2,"count":2,"nodeIds":["node-234","node-246"]}`) — not only on a cycle-2 load but on **the first** `loadEnvelope` into a **never-`bootstrap()`ed** Runtime; the **non-placement attribution run also reads `2`**. The probe-first sequence is **STOPPED**: this unit's shape is the **HOST-fix branch** (the module + a `src/renderer/runtime.ts` fix + regression rows `M-17`/`M-18`), the finding is recorded **in §3a's red-run block** (§4.4's own instruction: `§3a`, **not** `docs/defects.md`), and **the probe is NOT shipped as if the invariant held** — it ships as the instrument whose reproducer row `M-17` is the acceptance evidence. *(**Superseded, kept visible:** the as-filed cell *"STOP implementation of the probe-first sequence and take the HOST-fix branch"* is unamended and is exactly what was done; only its **state** is new.)* |
| **S-2** | The adversarial pass finds **no reproduction** of a violation | **NO GUARD SHIPS** (rule 3's third clause). The unit lands as its red evidence + this spec's rows as contract rows; the DONE row must say *"the guard was not shipped because its falsification produced no reproduction"* in exactly those terms. | **NOT REACHED — LIVE.** The adversarial pass has **not run** (RCA-3 runs after a green, and the unit has no green). The red run is **not** the adversarial pass: it produced the reproduction, so `S-2` is not triggered by it, and it remains the pass's binding clause if the later adversarial pass fails to reproduce. **⟶ DISCHARGED (2026-09-27, the adversarial + blind-verification pass): THE PASS HAS NOW RUN, and it did produce a reproduction — the `M-14`/`M-17` reproducer plus the new never-bootstrapped teardown contradiction (§3b `ADV-1`/`ADV-8`, §3.1 `M-19`).** The guard therefore **SHIPS** and the no-guard landing is **NOT** the outcome: the fix is landed (`reconcileMount()`, §3a `RED-5(ii)`), its regression rows exist, and the teardown drive is pinned. **The as-filed cell is kept above as the state before the pass; the DONE row must NOT use S-2's "not shipped" sentence.** |
| **S-3** | The red run cannot obtain a raw `count` | The red is **incomplete**; report that, and do not proceed to implementation. | **DISCHARGED — raw counts WERE obtained** (both the cycle-2 sequence's and the attribution run's), reported verbatim per §4.1. |
| **S-4** | The probe "needs" a new shim member, a global lookup, or a render call | **Scope violation** — re-read §2.4 and re-write the probe. | **NOT FIRED.** The red set added **no shim member** and required none; the raw measurement is taken through the shim's already-public surface (`children`, `getAttribute`, `outerHTML`). |
| **S-5** | A row of §3 turns out to be unverifiable on `[T]`/`[H]` | The row moves to §7's honest statements as **UNPROVABLE AT THIS LAYER**; it may not be moved to the `[U]` leg silently. | **NOT FIRED — but one HALF of `M-10` is unobservable on `[T]`, and it is recorded in §7, not moved silently** (§7 item 14, `M-10`'s limitation). No row of §3 moved to the `[U]` leg. |

### 4.5 Delegation gate

**This unit is NOT delegable.** It needs (a) **the architect's go-ahead for the wave-D plan**
(§0 ruling 6 — the wave-B go-ahead is spent and authorises nothing here), (b) this spec to exist
(**done: this filing**), and (c) a **TestWriter to have RUN and REPORTED the red set**
(`AGENTS.md` item 9). Its row in `docs/next-steps.md` `## OPEN` (D1) is `BLOCKED` and stays
`BLOCKED` until (a) and (c) are both true.

**⟶ UPDATED (2026-09-27, the red-set pass): condition (c) is now TRUE** — a TestWriter **has RUN and
REPORTED** the red set (§4.6 below), and **(a) — the architect's wave-D go-ahead — is still FALSE**,
so the gate's verdict is **unchanged: NOT delegable.** The unit's remaining work (the module + the
`src/renderer/runtime.ts` host fix + the regression rows) is **implementation**, so it may not be
delegated or landed until that go-ahead exists. **No status line of this subsection is rewritten; the
as-filed `BLOCKED` reasoning stands and only its (c)-half is discharged.** **⟶ BOTH HALVES ARE NOW DISCHARGED
(2026-09-27, the supervisor's DONE pass; every sentence above is kept visible): the architect GAVE the wave-D
go-ahead (2026-09-27) AND the implementation it gated HAS landed — the module, the host fix
`reconcileMount()` and the regression rows `M-17`/`M-18` (with `M-19` appended) — so this subsection's
`NOT delegable` verdict is a record of the gate as it stood before the go-ahead. **It remains the gate for
the wave-D units that follow:** each needs (a) the go-ahead (**now in force for the wave-D plan**), (b) its
own spec, and (c) its own **RUN and REPORTED** red set.**

### 4.6 The red set as RUN and REPORTED (2026-09-27, the red-set pass) — the unit's decisive record

**Everything in this subsection is a MEASUREMENT made by the red run, or the ledger of that run's
rows. It is the one place in this file where a row is evidence rather than contract** (the Layer
declaration's rule is otherwise absolute: *every row below is a contract row, never a measurement* —
this subsection is the declared exception, added by the amendment, and it cites no leg as passed
beyond the red set itself).

| # | Item | Value |
| --- | --- | --- |
| 1 | The red file | **`tests/mount-invariant-guard.test.ts`** — **NEW**, §5.1 row 2, committed **`aa8b92e`** |
| 2 | **THE LEDGER** | **⟶ SUPERSEDED AND RE-TAKEN (2026-09-27, the adversarial + blind-verification pass) — read this cell as the governing count, with the red-set pass's 41/39/2 kept below as the record of that pass: THE FILE IS `44` ROWS — `41` RED / `3` PASS.** The **3 pass** are **`PRE-1`/`PRE-2`** (the harness preconditions, **NOT spec rows**) **plus §3.1 `M-19`** (appended this pass; on the red set's own tree the `teardown`-drive rows were RED, and `M-19` is green on the tree that now carries the fix). The **41 red** keep their split of cause exactly as item 3 below records it (36 module-absent + 3 red-against-the-tree + the 2 harness-precondition greens were the only greens). *(**As taken by the red-set pass, SUPERSEDED and kept visible:** **41 rows total: `39` red / `2` green.** The **2 green** are **`PRE-1`/`PRE-2`** — the **harness preconditions**, which are **NOT spec rows** (they assert the red file's own import boundary and its raw tree-reader mirror, so "a red row cannot be a harness artefact"). Their green is a **precondition fact, not a spec-row pass.**)* |
| 3 | **The 39 red, split by cause** | **⟶ RE-TAKEN WITH THE LEDGER (2026-09-27, the per-unit documentation review): the governing split is `41` RED — read item 2 above.** Of the `41` red, **`38`** were red **because the module was absent** and **`3`** were red **AGAINST THE TREE, with the module irrelevant to the failure**: **`M-14` (raw `count 2` — the `S-1` host-fix branch)**, **`M-11` and `M-12` (raw `count 0` after `teardown()`, contradicting the as-filed one-root expectation)**. **Those 3 are the findings**; the `38` are the expected `module-absent` class of §4.2 step 2 and they are green on the tree that now carries the fix. *(**As taken by the red-set pass, SUPERSEDED and kept visible:** *"the **39** red, split by cause — **36** red because the module is absent (`S-1`…`S-7`, the `§2.1` surface + `§2.2` prohibition rows, and every row whose first reach is the import boundary) **+ 3** red AGAINST THE TREE …"*. The `39` is a **subset** count of item 2's red total (the red-set pass's own ledger reads `41 rows · 39 red / 2 pass`), so the split could not close over all of them; the re-take above closes it as `38 + 3 = 41`. **No finding, no cause and no disposition moves** — `M-14`, `M-11` and `M-12` are the same three rows the red-set pass named.)* |
| 4 | **The 39 spec-declared rows, exactly (the arithmetic, so no later pass reads a row as missing)** | The file asserts **39 spec-declared rows**: **`I-1`…`I-6` (6) + `M-1`…`M-16` (16) + `F-1`…`F-10` (10) = 32 ided rows**, **plus `S-1`…`S-7` (7)** — the `§2.1` exactly-surface rows (`S-1` exports, `S-2` return shape, `S-3` throw pattern) and the `§2.2` six-prohibition rows (`S-4`…`S-7`), which the spec states as its own contract but to which it gives **no `M`/`I`/`F` id**. **32 + 7 = 39**; adding the **2 harness preconditions** (`PRE-1`/`PRE-2`, **not spec rows**) gives the file's **41** rows. **⟶ RE-TAKEN (2026-09-27, the adversarial + blind-verification pass) — the ARITHMETIC DOES NOT CHANGE, only the totals, and the sentence above is kept visible as the red-set pass's count.** With `M-17`/`M-18`/`M-19` **now existing in the file** (they are spec rows, not harness rows), the arithmetic reads: **`I-1`…`I-6` (6) + `M-1`…`M-19` (19) + `F-1`…`F-10` (10) = 35 ided rows + `S-1`…`S-7` (7) = 42 spec-declared rows**, plus the **2 harness preconditions** (`PRE-1`/`PRE-2`, **not spec rows**) = **44 rows**, which is the file's own `44` (`npx vitest run tests/mount-invariant-guard.test.ts` → **44 passed**). **The 3 appended `M` ids are the whole delta: 39 → 42 spec-declared, 41 → 44 total.** *(**As counted by the red-set pass, SUPERSEDED and kept visible:** *"39 spec-declared rows … `M-1`…`M-16` (16) … 32 + 7 = 39 … gives the file's 41 rows."* — correct for that tree, before the three rows were appended.)* **Each `S` row is one row covering a declared group — the file's own header and §4.2 item 1 state that mapping — so no row of the file lacks a spec source and no spec obligation lacks a row.** |
| 5 | **The decisive raw observations** | **The reproducer, verbatim (first load into a mount on a Runtime never `bootstrap()`ed — the `M-14` drive and `M-17`'s sequence):** `{"childCount":2,"count":2,"nodeIds":["node-234","node-246"]}`. **The `M-3` five-point drive itself read `0 / 1 / 1 / 1 / 1`** (the pre-bootstrap point is `0`, `F-2`'s state; the four rendered points are `1`). **Attribution run (the NON-placement demo envelope, same sequence): `count 2`** (§3a `RED-2`).**After `teardown()` — ON THE BOOTSTRAPPED DRIVE** `count 0`, `mountHTML: ""` (`M-11`/`M-12`)**; on the NEVER-BOOTSTRAPPED drive cycle 1 is `count 1` — one mounted root whose nodeId IS the graph's live in-tree root (`census.inTree === 1`) — and cycles 2/3 are `count 0` (`M-19`, appended this pass).** **The fix's own verification, re-taken this pass (out-of-tree mirror, `reconcileMount()` reverted): the target files go 5-failed — `M-17`, `M-18`, `M-14`'s attribution half, and the two blind teardown rows — while every pre-existing row stays green** (§3b `ADV-1`). **The verbatim per-row reports are §3a's red-run block; the mechanism, reachability and owed fix are there too.** |
| 6 | **The `[U]` row** | **§5.2's OPTIONAL `[U]` row was NOT TAKEN.** Reason: it needs the `ui` leg and is precondition-gated; §3's rows are all `[T]`/`[H]` and stand alone, so nothing in §3 is weakened by its absence. **Recorded in the DONE row's item 7 per §5.3.** |

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/mount-invariant-guard.ts` | **NEW** — the seven declarations of §2.1 (two exported functions + five interfaces; see that block's amended export note) | always |
| 2 | `tests/mount-invariant-guard.test.ts` | **NEW** — the red set (§4.2) | always |
| 3 | `src/renderer/runtime.ts` | a **host fix** on the teardown/diff-removal path | **only** under rule 3's two-root branch (S-1), with a regression row. **⟶ THE CONDITION IS MET (2026-09-27, the red-set pass): the two-root branch is TAKEN (§4.4 `S-1`, §3a `RED-1`), so this row is now an OBLIGATION of this unit — and it is OWED, not landed: no `src/**` file has been touched by the red-set pass or by this amendment.** The fix's required achievement is §3a's red-run block, its regression rows are §3.1 `M-17`/`M-18`, and its acceptance instrument is §2.1's probe **⟶ LANDED (2026-09-27, the adversarial + blind-verification pass): the fix is `reconcileMount()` in `src/renderer/runtime.ts` — §3a `RED-5(ii)`'s second acceptable reading, reconciled before the new tree is emitted and reachable only through `resetRenderState()` (i.e. via a load). The as-filed "OWED, not landed" clause is kept visible as the state the red-set pass left.** |
| 4 | `docs/specs/mount-invariant-guard.md` | this spec — §3a/§3b findings as they land, §7 additions | always |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/defects.md` | the unit's own tracker rows (the supervisor's DONE row; a decision row **if** a host fix lands; **no** `defects.md` row — host finding) | the pass that produces them |

**Outside the scope, always:** `src/shared/dom-shim.ts` · `src/main/**` (incl.
`src/main/mcp-server.ts` and `src/main/security.ts`) · `src/renderer/renderer.ts` ·
`src/shared/types.ts` · every **existing** test file · `package.json` / `package-lock.json` ·
`scripts/**` · `node_modules/**` · `../Preempt-Providence/**` · the declined region-host surface
under any name.

### 5.2 The legs this unit MUST run

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | **[T]/[H]** envelope/pure layer | the red (§4) **and** the green, run before and after. **A green here is envelope/pure-layer evidence, NEVER assembled-app evidence** |
| 2 | typecheck | `npm run typecheck` | **[H]** | `tsc --noEmit`; the probe's types are part of the contract, and a malformed signature is a typecheck failure, not a runtime one |
| 3 | build | `npm run build` | **[H]** | esbuild, five bundles (`package.json:10`, read); a new `src/shared/` module that fails to bundle is a build failure even if the suite is green |

**That is the whole required set.** Row D1's leg cell says **node suite** alone; the trio's other two
legs (`typecheck`, `build`) are mandatory for any source change under `AGENTS.md` item 4 and are
therefore listed here **as obligations, not as new claims**. **No battery, no divergence leg** — the
unit asserts no MCP-surface behaviour and no real-DOM property.

**OPTIONAL `[U]` row (needs the `ui` leg — and names its precondition):** the real-DOM
cardinality row — *one mount, one real-DOM root element after a cycle-2 load*. **⟶ STATUS OF THIS ROW
(2026-09-27, the red-set pass): NOT TAKEN — and its non-taking is correct, not a gap.** The red set
ran **only** the node suite (§5.2 row 1); every §3 row is `[T]`/`[H]` and stands alone, so **nothing
in §3 is weakened** by the row's absence. **This row is now MORE relevant than it was, and that is
recorded rather than exploited:** the measured defect (§3a `RED-1`) is a **host-side** cardinality
defect, and a real-DOM `[U]` row is the layer that could confirm it in a real renderer — but the row
stays **optional + precondition-gated**, and **no claim about the real DOM is made anywhere in this
unit** (Layer declaration anchor 3). **If it is taken, it is taken with its preconditions; it is never
a substitute for `M-17`/`M-18`, which are the acceptance rows.** **⟶ FURTHER PRECONDITION RECORDED (2026-09-27, the adversarial + blind-verification pass): the row is ALSO blocked by §3b `ADV-4` — the probe currently REFUSES a real-DOM mount (`directChildren()` requires `Array.isArray(children)`, while a real DOM's `children` is an `HTMLCollection`), so this row **CANNOT be taken until that is fixed**, and taking it would today read `'mount-not-appendable'` on a perfectly good mount. That finding is `OWED-with-owner` (the pass that would take this row), and it does not weaken any §3 row.** **Preconditions, all
named and none assumed:** (a) the `ui` leg exists and is green on the same built tree,
(b) `npm run divergence` is green for that tree, and (c) — for any **attribute-presence**-shaped
variant of the row — the `H-r10` attribute-presence extractor, which is owed to
**`U-DIVERGENCE-EXT`**. **A cycle-2 cardinality row reads element COUNTS, not attribute presence, so
it does not depend on the extractor** — but it **does** depend on the leg. **If the row is not
taken, nothing in §3 is weakened: every §3 row is `[T]`/`[H]` and stands alone** (row D1's own
wording: *"a real-DOM identity row is OPTIONAL"* is not this unit's leg — this unit's D1 cell names
the node suite and the shim; the OPTIONAL `[U]` row is stated here because the layer must be named
before anyone claims it).

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, in this order:

1. **Unit + wave + status**: `U-MOUNTGUARD` · wave **D** · `DONE` or the honest non-DONE status.
2. **The rule-3 outcome, FIRST and explicitly**: *"cycle-2 count = N"* with the **raw observed
   value**, and then *"the HOST-fix branch / the detection-only branch"*. **A DONE row that does
   not state the cycle-2 count is a review finding** — it is the unit's whole point.
3. **The guard's disposition, explicitly**: shipped / **not shipped because the adversarial pass
   found no reproduction** (S-2), in those terms.
4. **The code/test delta**: files changed, named, with the host fix named if taken.
5. **The red, per §4.1** — the failing set as RUN and REPORTED, verbatim, **including the raw count**.
6. **The three legs' results** (§5.2), each with its **layer label** (`[T]/[H]`), plus the explicit
   sentence that the node-suite green is envelope/pure-layer evidence and **not** assembled-app
   evidence.
7. **The `[U]` row's status**: taken (with its result) or **not taken** (with the reason).
8. **The adversarial pass's findings** (§3a) and the **blind-greens + doc-review records**
   (`AGENTS.md` items 10a/10d, RCA-4/6).
9. **The tracker reconciliation** (`AGENTS.md` items 3/6).

## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**

**`H-r4` obliges an explicit zero-row/typed-PBT decision per unit. Stated exactly as
`docs/specs/engine-drift.md` §5.5 and `docs/specs/engine-pin.md` §5.5 state it: THIS REPO HAS NO PBT
HARNESS.** `package.json`'s `devDependencies` key set is `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **five keys** (`package.json:26-31`, read this pass) — with **no
`fast-check`, no `hypothesis`, and no property runner**. **This spec therefore records a ZERO-ROW
register**, and here is why that is the honest answer rather than a dodge:

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **One candidate exists and is a genuine quantification:** *"for every re-derivation sequence of any length over the four paths, `count === 1` at every observation point."* §3's `M-2`/`M-3`/`M-12`/`M-13`/`M-16` sample that space **deterministically** (a fixed table of cycles). **The property is not thereby proven — a sampled table is not the property**, and this spec **says so** rather than implying coverage. |
| Could this unit execute that property **as a property**? | **No, and not for reasons of effort:** there is no PBT harness to run it in, and **adding one is a `devDependencies` change** — i.e. outside §5.1's diff scope and a new gate of its own. |
| Do the layers permit a property run here? | **No for the interesting half.** The real-DOM cardinality question is a `[U]`-layer question and the `[U]` row is **optional and precondition-gated** (§5.2); a property over an unmountable population is not executable at any layer. |
| How are the deterministic tables here executed? | **Plain vitest: fixed input, fixed order, no randomness, no shrinking, no generated inputs.** Rows name their strategy by the unit's own ids (`M-3` = the cycle-2 drive; `I-3` = the write-freedom drive; `F-8` = the duplicate drive). **A strategy id here is a repeat-drive label, not a property id.** |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled** — the carried honesty
   anchor of `docs/specs/engine-drift.md` §5.5.
2. **The one quantified claim in this unit is recorded as `NOT EXECUTED — no PBT harness`**: the
   *"every re-derivation sequence"* property. **Its compensating rows are named**: `M-1`..`M-16`
   (the fixed table), `I-1`..`I-6` (the per-state invariants), and `F-1`..`F-10` (the fail-states).
3. **No `fast-check` and no generator is added by this unit** — adding one would be a
   `devDependencies` change outside the diff scope and would need its own gate.
4. **Register change summary: none** — this spec introduces no register row, so there is nothing to
   reconcile with `docs/specs/engine-pin.md` §5.5's register (counted there as 8 rows: 4 `P-IM` +
   3 `P-SM` + 2 `P-TP`, 7 executed deterministically, `P-TP-1` `NOT EXECUTED`).

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.** *If no cycle-2 (or later-cycle) re-derivation
into one mount ever produces two engine-emitted roots, then the invariant this unit exists to guard
is not being violated in this tree, and rule 3 forbids shipping a guard for it.* **The unit does not
thereby fail** — it lands as detection + pin + recorded evidence — **but it must not manufacture a
guard to justify itself.** The three outcomes, exhaustively:

| Outcome | Condition | What lands |
| --- | --- | --- |
| **(a) Detection + pin only** | the red run yields `count === 1` and the adversarial pass reproduces **no** violation | the probe module + the §3 rows as contract rows; **no** guard claim, **no** host change. The DONE row says the probe *detects a class that is not currently occurring* |
| **(b) Host fix** | the red run yields `count === 2` | a fix in `src/renderer/runtime.ts` + its regression row + the §3a finding; the probe ships as the regression's instrument |
| **(c) The guard does not ship** | the red run yields `count === 2` but the adversarial pass cannot reproduce it, **or** the violation is not reproducible outside a single sequence | the probe is **withdrawn from the contract** and `§2.1`'s surface is marked **SUPERSEDED** with the reason; the recorded evidence stands |

**A fourth outcome is not admissible.** *"The probe was needed because the invariant says so"* is not
an outcome — it is a restatement of the claim under test.

**⟶ THE OUTCOME IS SELECTED (2026-09-27, the red-set pass): `(b) HOST FIX`.** The falsification
**DID** produce two engine-emitted roots (§4.4 `S-1`, §3a `RED-1`/`RED-2`), so the unit lands as
**a fix in `src/renderer/runtime.ts` + its regression rows (`M-17`/`M-18`) + the `§3a` finding**, with
**the probe shipping as the regression's instrument** — outcome (b)'s own text, unamended. **Outcome
(a) is NOT selected** (the red run did not yield `count === 1`). **Outcome (c) is not selected and is
NOT foreclosed:** rule 3's third clause (§4.4 `S-2`) keeps it live until the adversarial pass runs and
either reproduces the violation or does not — **a fix landed before that pass is not yet a fixed
finding, and the DONE row must say which of (b)/(c) governs.**

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE`, nothing is green, and no leg has been run by this pass.**
   **⟶ AMENDED (2026-09-27, the red-set pass): ONE leg has been run — the RED node-suite run (§4.6) —
   and it is NOT a green; nothing in this unit is `DONE`, and the trio has not been run (no
   implementation exists to run it against). The as-filed sentence's *"no leg has been run"* is
   superseded by that one fact and kept visible; its substance (no green, nothing DONE) is
   unchanged.** This
   pass files the contract. **The unit is BLOCKED on the architect's go-ahead for wave D and on its
   red set** (§0 ruling 6, §4.5). The wave-B go-ahead authorises **nothing here**. **⟶ The *"and on
   its red set"* half of that blocker sentence is now SPENT (the red set has been run, §4.6); the
   wave-D go-ahead half STANDS.** **⟶ THE GO-AHEAD HALF IS SUPERSEDED (2026-09-27, the supervisor's DONE
   pass; the sentences above are kept visible): the architect GAVE the wave-D go-ahead (2026-09-27), and this
   unit is `DONE` — so item 1's opening words *"Nothing in this unit is `DONE`, nothing is green, and no leg
   has been run by this pass"* describe the FILING pass and no longer this unit's state. Read the dated STATUS
   NOTE at the head of this file as the governing status.**
2. **The region host stays DECLINED and this file must not be read as adopting it.** `SCH-1`'s
   region half is refiled to the fork; its blockers are `(C)#1` and `(C)#6` (**not** prohibition 5),
   and it is redundant for the invariant. **A later pass that re-merges the two halves to satisfy
   one fork request is repeating a landed ruling.**
3. **The unit's shape is CONDITIONAL.** Rule 3 decides between detection-only, a host fix, and no
   guard at all — and **the third outcome is allowed**. Any document that presents the guard as a
   certainty of this unit is over-reading §0 ruling 3. **⟶ AMENDED (2026-09-27, the red-set pass):
   the CONDITION IS RESOLVED — §6 outcome (b), the HOST-fix branch — so the shape is no longer
   conditional *as to which branch*; what remains open is whether the later adversarial pass
   reproduces the violation (`S-2`), which is the third outcome's own trigger. The as-filed sentence
   is kept: it was true, and it is exactly what the red run settled.**
4. **The mount invariant's current behaviour is UNPROVEN, and this spec asserts no cardinality.**
   The per-teardown test at `tests/runtime-host.test.ts:150-161` (read) is a **per-teardown**
   statement; the validity pass's characterization of it as *"diff-based emptying exists and is
   tested"* is **not** a cross-envelope statement. **Rule 3's red run is what settles it. ⟶ IT HAS
   SETTLED IT (2026-09-27): the cross-envelope behaviour is now MEASURED, not unproven — two
   engine-emitted roots on the construct-then-load sequence (§3a `RED-1`), and zero on the mount
   after `teardown()` (§3a `RED-6`/§4.6 item 5, `M-11`/`M-12` amended). The as-filed sentence is
   kept because it is the state the red run was owed to end; the *per-teardown* citation above is
   still accurate as a per-teardown statement, and the amended `M-11`/`M-12` are the per-teardown
   rows.**
5. **A node-suite green is envelope/pure-layer evidence, never assembled-app evidence** — and for
   this unit it is also **never real-DOM-tree evidence** (the shim has no layout, no CSS, no query
   API). The `[U]` row is optional and precondition-gated (§5.2).
6. **The probe counts ENGINE-EMITTED elements, never DOM roots.** A cross-envelope count of DOM
   roots is explicitly on the "what every node-green must NOT be claimed as" list, and this unit's
   claim is **narrower**, not wider.
7. **`docs/decisions.md`'s line anchors are pre-amendment in several sources and were re-resolved
   here by reading the live file.** The file is **406 lines** today (read this pass) and its ledger
   is **not** one contiguous table — it carries the main ACTIVE table, then appended labelled blocks
   (the `U-ENGINE-PIN` sets, then `U-ENGINE-DRIFT`, then five `U-REALDOM-BOOT` blocks at
   `:139`/`:155`/`:172`/`:189`/`:209`), then `## HISTORICAL` (`:230`), `## SPECULATIVE / IN GATE`
   (`:288`) and `## AMENDMENTS TO PRE-EXISTING ACTIVE ROWS` (`:294`). **The six rows this spec cites
   were read directly and resolve as claimed**: `R13-HOST-FIX` at `:39`, `HOST-OP-REJECT` at `:42`, **⟶ ANNOTATED BESIDE 2026-09-29 (THE GATE-7/8 REPAIR PASS, FINDING `F2`; `RCA-8(d)`: THE AS-WRITTEN PAIR ABOVE IS KEPT VISIBLE AND IS NOT REWRITTEN — NOTHING IS RENUMBERED — AND THE AS-FILED VERIFICATION CLAIM IS MARKED STALE, BECAUSE A VERIFICATION CLAIM THAT NO LONGER VERIFIES IS WORSE THAN A BARE STALE ANCHOR). THE AS-WRITTEN `R13-HOST-FIX` at `:39` / `HOST-OP-REJECT` at `:42` PAIR IS STALE ON BOTH FIGURES: the LIVE anchors, each read by this pass on 2026-09-29, are `R13-HOST-FIX` at `:58` (:39 is now `DECIDED: GSESSION-THE-DISPOSAL-GOVERNS-A-MID-CALL-BEGIN`) and `HOST-OP-REJECT` at `:61`. THE SAME CLAIM'S REMAINING FOUR FIGURES HAVE ALSO DRIFTED, AND ARE CORRECTED HERE RATHER THAN LEFT TO READ AS VERIFIED: `MULTI-GRAPH-ISOLATION` is at `:70` (as written `:51`), `UI-RENDERED-WITH-PROVIDENT` at `:72` (as written `:53`), `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` at `:73` (as written `:54`), and `SHELL-CHROME-HANDOFF-DISPOSITION` at `:77` (as written `:58` — the figure that now resolves to `R13-HOST-FIX` instead, which is exactly the hazard a line anchor carries). THE CAUSE IS THE CAUSE THIS SPEC'S OWN ITEM 7 ALREADY NAMES: `docs/decisions.md` is appended-to, so every line anchor in it drifts as ACTIVE rows land above it.** **The ruling stands and this is a correction of addresses only: CITE THOSE ROWS BY NAME — `R13-HOST-FIX`, `HOST-OP-REJECT`, `MULTI-GRAPH-ISOLATION`, `UI-RENDERED-WITH-PROVIDENT`, `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`, `SHELL-CHROME-HANDOFF-DISPOSITION` — never by line, exactly as the "cite this record by ID, not by line" rule below requires. The substance of every citation this spec rests on (a HOST finding owes no `defects.md`/`HANDOFF.md` row; the never-throw shape; the isolation pin; the UI constraint and its carve-out; the adjudication) is UNCHANGED and unmoved; only the addresses moved. `RCA-12`: every anchor in this annotation is this pass's own FILE READ of `docs/decisions.md` on 2026-09-29 — no suite, no leg, no Electron boot and no battery ran in this pass, and no leg figure is quoted as its measurement.**
   `MULTI-GRAPH-ISOLATION` at `:51`, `UI-RENDERED-WITH-PROVIDENT` at `:53`,
   `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` at `:54`, `SHELL-CHROME-HANDOFF-DISPOSITION` at `:58`. **Every
   one is cited here by ID as well as by line**, per the gate record's own "cite this record by ID,
   not by line" rule (`§7` item 7). **⟶ STALE IN ONE RESPECT (2026-09-27) — only the *line count*
   ("406 lines") is stale, and it is kept visible: read item 17 below as the governing note. The
   structure description above and the six row anchors still resolve as claimed, and all six are
   cited by ID as well as by line.**
8. **Stale citations this pass found and did NOT fix (they are not this unit's files to edit — the
   rule is report, do not silently reconcile):** see §8's closing block. **Every anchor this spec
   cites by line was read by this pass**; every anchor this spec could **not** verify is either
   named as unverified or replaced by the line that was read.
9. **No page-design layer exists to update.** `docs/skills/designing-pages.md` **does not exist**
   (globbed; the directory holds `process-guardrails.md` alone), so there is **no test-use-case
   coverage matrix and no demo-page index**, and this unit makes no page-design change.
10. **This unit is not a `docs/defects.md` row**, and a host finding it produces is not one either:
    the amendment's adjudicated residual disagreement #1 (read) is explicit that the mount
    invariant is a **target hardening unit**, and the `R13-HOST-FIX` precedent
    (`docs/decisions.md:39`, read) **refuses** a `defects.md`/`HANDOFF.md` row for a host finding.
11. **The probe's contract is deliberately a RESULT OBJECT plus a thin ASSERT.** An implementation
    that only throws cannot produce the evidence rule 3 requires; an implementation that only
    returns cannot be used as a regression assertion. **Both are required, and the split is a
    contract decision recorded here** (the sources name the probe only by its purpose).
12. **⟶ ADDED (2026-09-27, the red-set pass). The red set was RUN and it HIT `S-1`; this unit's shape
    is the HOST-fix branch.** Stated so no later pass reads the as-filed conditional shape: §4.6
    carries the ledger (41 rows · 39 red / 2 pass · the 2 green are harness preconditions, not spec
    rows **⟶ SUPERSEDED BY THIS PASS'S OWN LEDGER: 44 rows · 41 red / 3 pass — read §4.6 item 2 as the
    governing count**), §3a `RED-1`…`RED-6` carry the finding, mechanism, reachability and the fix's required
    achievement, and §3.1 `M-17`/`M-18` are the regression rows the fix must turn green. **The probe
    has NOT been implemented, the host fix has NOT landed, and no leg beyond the red node-suite run
    has been run by this amendment.** **⟶ UPDATED (2026-09-27, the adversarial + blind-verification
    pass — read this as the governing state, with the sentence above kept visible): the probe module
    HAS been implemented, the host fix (`reconcileMount()`, §3a `RED-5(ii)`) HAS landed, the regression
    rows `M-17`/`M-18` EXIST and are green, `M-19` is appended to pin the never-bootstrapped teardown
    drive, and the trio is green (`59 files / 916 passed / 2 skipped / 0 failed`) — see §4.6 and §3b.**
13. **⟶ ADDED (2026-09-27). The teardown path is EXCLUDED from §1.1's invariant, and the exclusion is
    a measurement, not a preference.** `M-11`/`M-12` are amended to the measured `count === 0` on the
    mount with the graph's `inTree === 1` retained; the mount is empty after `teardown()` and the root
    leaves the mount while staying in the graph. **Both halves must be asserted together** — a
    one-half reading is the contradiction this amendment removed. **⟶ AMENDED IN PLACE — THE EXCLUSION
    IS DRIVE-SPECIFIC (2026-09-27, the adversarial + blind-verification pass; read this as the governing
    statement, with the sentences above kept visible):** the teardown exclusion is a measurement **per
    drive**, not one number. **On a bootstrapped / re-baselined runtime `teardown()` leaves the mount
    empty (`0`) with the graph keeping the root (`inTree === 1`) — `M-11`/`M-12`'s drive.** **On a
    never-bootstrapped runtime (constructed, no `bootstrap()`, no prior load) the FIRST `teardown()`
    leaves ONE mounted root — the graph's live in-tree root, `inTree === 1` — and subsequent teardowns
    leave `0`; that difference is pinned by §3.1 `M-19`.** **A sentence that states the post-teardown
    mount as zero without naming the drive is the unconditional form this amendment supersedes** — the
    previous sentence of this very item (*"the mount is empty after `teardown()`"*) is that form, and it
    is kept above only as the record of it.
14. **⟶ ADDED (2026-09-27). `M-10`'s identity half is NOT observable on `[T]`**, and the row records
    its closest falsifiable form (§3.1 `M-10`). *"Calls the probe exactly once"* stays a `§2.1`
    contract clause; it is **not** a row of this unit, and adding a seam to observe it would be a
    surface change needing its own gate.
15. **⟶ ADDED (2026-09-27). The `[U]` row of §5.2 was NOT TAKEN** (§4.6 item 6, §5.2's status note).
    Every §3 row is `[T]`/`[H]` and stands alone; **no real-DOM claim is made anywhere in this unit**,
    and the optional row is never a substitute for the acceptance rows `M-17`/`M-18`.
16. **⟶ ADDED (2026-09-27). The host finding is NOT a `docs/defects.md` row** — restated here as the
    standing consequence, because the fix is now owed and a later pass might be tempted to file it as
    a defect: §4.4 `S-1` and §4.1 both require the finding to land **in §3a**, and the `R13-HOST-FIX`
    precedent (`docs/decisions.md:39`) refuses a `defects.md`/`HANDOFF.md` row for a **host** finding.
    **What is owed instead is the fix in `src/renderer/runtime.ts` + its regression rows (§5.1 row 3,
    §3a `RED-5`).** **⟶ THE OWED SET HAS LANDED (2026-09-27, the adversarial + blind-verification
    pass; the sentence above is kept as the state it described): the fix is `reconcileMount()`
    (§3a `RED-5(ii)`), and its regression rows `M-17`/`M-18` **now exist** in
    `tests/mount-invariant-guard.test.ts` — the gap the adversarial pass measured (*"the spec and the
    decision log name `M-17`/`M-18` as the rows the host fix must turn green, but no such row existed:
    the only row that reddened when `reconcileMount()` was removed was `M-14`, i.e. 40 of the 41 rows
    stayed green"*) is **CLOSED**. `M-14`'s attribution half is **now an assertion** rather than an
    interpolation into a failure message, so reverting `reconcileMount()` in an out-of-tree mirror
    produces **5 failures — `M-17`, `M-18`, `M-14`'s attribution half, and the two blind teardown
    rows** — while every pre-existing row stays green. **`M-19` is appended in the same pass and is
    explicitly NOT one of those rows** (reverting the fix leaves it green — it pins `teardown()`, which
    never calls `reconcileMount()`).** The host finding is still **NOT** a `defects.md` row.
17. **⟶ ADDED (2026-09-27). The `docs/decisions.md` line-count claim in item 7 (*"406 lines"*) is
    STALE, kept visible and superseded by this note — it was correct when written.** The file has
    grown since (the `U-REALDOM-BOOT` and `U-PROJ` decision blocks appended after item 7's reading).
    **This spec cites `docs/decisions.md` rows BY ID AS WELL AS BY LINE on purpose** (item 7's own
    closing line, and the gate record's *"cite this record by ID, not by line"* rule), so the **row
    ids are the durable reference and the line numbers are provenance**; every anchor this spec uses
    was re-read when item 7 was written, and **no claim here is a line-number claim about the live
    file's total length.**

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = the row's obligation is this unit's charter. **DECLINED** = a
part-half that stays with the fork. **OWED** = an obligation this unit has not yet discharged.
**NOT THIS UNIT** = the row is closed elsewhere or belongs to another unit — listed so no later pass
routes it here.

| Source row | Section | Status for `U-MOUNTGUARD` | Where |
| --- | --- | --- | --- |
| `SCH-1`'s **invariant half** (`S-d2`; §2.2's `SCH-1` row) | amendment §1 preamble, §2.2 | **ADOPTED — this unit** | §1, §2 |
| `SCH-1`'s **region host** (`ShellRegionName`/`ShellRegionSpec`/`ShellRegions`) | amendment §0, §2.2, `S-d11`, `H-r17` | **DECLINED + REFILED to the fork** — **must not be re-merged** | §3, §7 item 2 |
| Row **D1** (`docs/next-steps.md` `## OPEN`) | that file's `## OPEN` table (**cited by row id, never by line**) | **OWED**: the row's spec cell reads *"`docs/specs/mount-invariant-guard.md` (**OWED — not filed**)"* — **this filing discharges that cell** (the row itself stays `BLOCKED`) **⟶ AND THE ROW HAS SINCE MOVED (2026-09-27, the per-unit documentation review): `D1` is `D1 — MOVED TO DONE`, the unit is the ledger's fourth `DONE` row, and this index cell's `BLOCKED` clause is kept only as the filing pass's record.** | this file |
| **THE RED SET** — `tests/mount-invariant-guard.test.ts` (41 rows: 39 red / 2 pass at the red-set pass; **`44` rows today, and every row of it PASSES on the tree that carries the fix**) and its report | this file **§4** (the red plan), **§4.2** (authoring order) | **ADOPTED + DISCHARGED IN PART (2026-09-27, the red-set pass): AUTHORED and RUN**, with the outcome recorded as **§4.6 (the ledger)**, **§4.4 `S-1` (HIT and TAKEN — the stop-condition state)** and **§3a `RED-1`…`RED-6` (the finding, the attribution, the mechanism, the reachability, the owed fix, its disposition)**. **What remains OWED: the probe module (§5.1 row 1), the host fix (§5.1 row 3) and the regression rows (§3.1 `M-17`/`M-18`).** **⟶ THAT OWED SET IS DISCHARGED (2026-09-27, the adversarial + blind-verification pass, verified by the per-unit documentation review): the module EXISTS (§5.1 row 1), the host fix `reconcileMount()` is LANDED (§5.1 row 3, §3a `RED-5(ii)`), and `M-17`/`M-18` EXIST and are green (§3.1), with `M-19` appended — the as-filed `OWED` clause is kept above as the red-set pass's state.** The finding is a **HOST** finding and is **NOT** a `docs/defects.md`/`HANDOFF.md` row (§4.4 `S-1`; the `R13-HOST-FIX` precedent) | §3a, §3.1 `M-17`/`M-18`/`M-19`, §4.4, §4.6, §5.1 |
| The eight-unit plan's **`U2`** row | amendment §"The amended unit plan" | **INHERITED-ONLY provenance** (superseded by the 20-unit plan, `H-r20`); its owner-artifact + red-set cells are re-anchored in §5.1/§4 | §5.1, §4 |
| `H-r4` (the spec's required shape) | `H-r4` as amended by `H-r20` | **DISCHARGED by this filing**: status/source block, `§0` prohibitions, exact surface, every state/fail-state, red-set plan, trio plan, explicit falsification/stop condition, explicit zero-row PBT decision | §0–§7 |
| `H-r8`'s six-prohibition block | `S-d8`, `H-r8` | **DISCHARGED** as a six-row assertion table | §2.2 |
| `H-r5` / `S-d3` (no shim expansion) | `H-r5`, `S-d3`, `H-r7` | **INHERITED-ONLY** — the shim is untouched; the sole carve-out is landed and closed | §1, §5.1, §5.5 `A-15` |
| The amendment's "no new MCP surface" obligation row | amendment §"Adopted units' security / equivalence obligations" | **DISCHARGED** as the five-seam negative | §2.2 (prohibition 5), `A-14` |
| "What every node-green must NOT be claimed as" | same section | **CARRIED** as the layer declaration's anchors + §7 item 5–6 | Layer declaration, §7 |
| `RK-19` (geometry criteria unprovable here) | amendment §6 | **NOT THIS UNIT** — no geometry row exists here | — |
| `RK-6` (the real-DOM `hidden` substring false red) | amendment §6, `H-r10` | **NOT THIS UNIT**, but **binding if the OPTIONAL `[U]` row is taken** as an attribute-presence row: it needs `U-DIVERGENCE-EXT`'s extractor | §5.2 |
| `H-r10`'s attribute-presence extractor | `H-r10` | **NOT THIS UNIT** (`U-DIVERGENCE-EXT`) — a **named precondition** of the optional attribute-shaped `[U]` variant | §5.2 |
| `LIVE-OP-REJECT` | `docs/defects.md` `## FIXED (in this repo)`; `docs/decisions.md` | **NOT THIS UNIT** — but its **layer lesson binds**: an envelope green must never be converted into an IPC claim | Layer declaration anchor 1 |
| `U-ENGINE-PIN`'s landed state (pin at `package.json:24` = `^0.5.1`; the shim's `removeAttribute`) | amendment §4.1, `docs/specs/engine-pin.md` | **INHERITED as landed state** — this unit does not re-open or re-measure it | §0 ruling 4, §2.4 |
| `docs/specs/mount-invariant-guard.md`'s row in amendment §8's owed-spec list | amendment §8 | **DISCHARGED by this filing** (the file exists) | this file |
| **`docs/decisions.md`'s ledger** — the two `U-MOUNTGUARD` ACTIVE rows added by **this amendment's pass** (the `S-1`/host-fix-branch row and the teardown-two-layer row) + the new **AMENDMENTS-to-pre-existing-rows** note | this spec's §3a `RED-5`/`RED-6`, §4.4 `S-1`, §3.1 `M-11`/`M-12` | **ADDED — APPENDED (2026-09-27, the red-set pass)**, deliberately appended so that **no previously cited `docs/decisions.md:<n>` anchor moves**; the rows are the compact pointers to this contract, and the contract is the sections named here | `docs/decisions.md` (appended blocks + the amendment note) |
| **The red run's finding** (`RED-1`…`RED-6`) | this spec **§3a** (recorded here **per §4.4 `S-1`**), `docs/decisions.md`'s amendment note | **OWED — a HOST finding, fixed HERE, never a `docs/defects.md`/`HANDOFF.md` row**; **landed status: the finding is recorded, the FIX is not landed** **⟶ UPDATED (2026-09-27, the adversarial + blind-verification pass; read the as-filed cell above as that pass's state): the FIX IS LANDED — `reconcileMount()` (§3a `RED-5(ii)`), §3b `ADV-1`/`ADV-9`'s dispositions, and the regression rows `M-17`/`M-18` exist and are green. §3a's own status line now reads `CONFIRMED-FIXED`. It remains NOT a `docs/defects.md`/`HANDOFF.md` row — a HOST finding, fixed here** | §3a, §5.1 row 3, §3.1 `M-17`/`M-18`/`M-19`, §3b |

**Cross-file citation findings this pass found and did NOT fix (not this unit's files; report, do
not silently reconcile).** Each was read in this pass:

| Claim as written | Verified state (read 2026-09-27) |
| --- | --- |
| `src/renderer/runtime.ts:735-753` declares `tearDownGraph` (amendment §Layer declaration item 2, the pre-amendment `SCH-1` row, `H-r2`) | **STALE.** `:735-741` is `shapeSig()`; `tearDownGraph()` is declared at **`:777`** and its body ends at **`:795`**. The **citation's substance holds** — the method exists, is called by every re-derive path, and does the diff-based emptying the row describes |
| `src/renderer/runtime.ts:1074-1075` backs the invariant by reading `mount.innerHTML` | **STALE.** `renderedHtml()` reads `this.mount.innerHTML` at **`:1116-1118`** |
| Re-derive call sites `:304`, `:331`, `:519` | **`:304` and `:331` VERIFIED** (`loadEnvelope`/`loadDoc` each call `tearDownGraph()`); **`:519` is STALE** — `teardown()` is declared at **`:560`** and calls it at **`:561`** |
| `codeLoad` at `:938` → `:304`; `codeLoadBatch` at `:974` | **BOTH STALE.** `codeLoad` is declared at **`:980`** and calls `loadEnvelope` at **`:994`**; `codeLoadBatch` is declared at **`:1016`** and reaches `codeLoad` at **`:1064`**. **The dependency claim holds** — both routes do enter `loadEnvelope`, hence `tearDownGraph` |
| `tests/runtime-host.test.ts:150-160` / `:150-161` (the per-teardown row) | **VERIFIED in substance.** The row is at `:150-161`: `teardown → inTree === 1, mount empty, and is idempotent`; `mount.innerHTML === ''` asserted at `:157` and `:160`. **⟶ MEASURED AGAINST, 2026-09-27: the cited `mount.innerHTML === ''` is now the CORRECT side of the fact** — the red run reads `count 0` / `mountHTML: ""` after `teardown()`, i.e. the landed test was right and the as-filed `M-11`/`M-12` one-root expectation was not. **This citation is read-only evidence and was NOT edited** (§4.3) |
| `tests/runtime-host.test.ts:183-189` (the placement-routed load row) | **VERIFIED and REACHABILITY-LOAD-BEARING (2026-09-27).** The row is the `compilePath` case (`inTree === 7`, many elements) and it uses the **construct-then-`loadEnvelope` sequence with NO `bootstrap()`** — the exact sequence §3a `RED-4` names as the defect's reachable host entry, and the sequence measured at `count 2` in `M-14`'s attribution run. **Read-only evidence; NOT edited** |
| `src/shared/dom-shim.ts:77-88` (the `outerHTML` serialization gap) | **STALE as an anchor, and the substance is spent**: the file was amended by the landed `U-ENGINE-PIN` unit and is **143 lines** today; `outerHTML` is the getter at **`:108-119`** |
| `src/shared/dom-shim.ts:50-56` (listener removal by reference) | **STALE.** `removeEventListener` is at **`:81-87`** today |
| `src/main/mcp-server.ts:281-303` (21 `ALL_TOOLS`) | **VERIFIED.** `ALL_TOOLS` is declared at `:281`, the 21 names run `:282-302`, the array closes at `:303` |
| `src/main/security.ts:134` (`VALID_GROUPS`) | **VERIFIED** — five members |
| `src/shared/types.ts:259-280` (`RpcMethod`, **21** members) | **VERIFIED in substance.** The union is `:259-281`; **21** members; `RpcRequest` begins at `:282` |
| `package.json:23` = the pin, and `package.json:18` = the `divergence` script | **`:23` is STALE** for the pin (`:23` is `@modelcontextprotocol/sdk`; **`provident-ssr: "^0.5.1"` is at `:24`**); the `divergence` script **is at `:18`**, and the **`ui` script is at `:19`** |
| `MUTATING_METHODS` cited at `src/main/mcp-server.ts` (amendments §"no new MCP surface" family) | **STALE.** The set is at **`src/renderer/renderer.ts:12`** — seven members: `dispatch`, `load`, `op`, `teardown`, `code.load`, `code.loadBatch`, `journal` |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates one new spec file and edits no existing document. **The `## OPEN` row `D1`'s spec cell
therefore still reads `OWED — not filed` until the supervisor's reconciliation pass flips it** —
recorded here so the staleness is attributable rather than silent. **⟶ FLIPPED 2026-09-27 (the unit's DONE
pass, and annotated again by the handover-staleness pass): the `D1` spec cell reads `FILED 2026-09-27` and the
row has MOVED to the `## DONE — U-MOUNTGUARD` record**, so the clause above is the filing pass's state only.

**⟶ ARCHIVAL-LOOP CHECK, AMENDED (2026-09-27, the red-set pass): the *"archives, moves and repoints
NOTHING"* clause above is SUPERSEDED for this pass and kept visible.** The red-set pass **did** edit an
existing document — **this file** — by the amendment recorded throughout it, plus the two ACTIVE
decision rows and the amendment note it adds to `docs/decisions.md`. **It archived nothing, moved
nothing, and repointed no citation**, so the archival loop's own obligation (`AGENTS.md` item 6c —
*never leave a citation pointing at a moved file*) is **discharged by doing nothing**: **no file was
moved, so no reference needed repointing.** **The `D1` spec cell is STILL `OWED — not filed`** *(**⟶ NO LONGER TRUE — FLIPPED 2026-09-27**: the unit's DONE pass flipped the cell to `FILED 2026-09-27` and moved the row to the `## DONE — U-MOUNTGUARD` record; the sentence is kept visible as the red-set pass's own statement)*: this
amendment does not flip it, because flipping the row's status is the supervisor's reconciliation, not
a spec pass's. **Cross-file citation claims: NO NEW STALE ANCHOR was created by this amendment** —
every line anchor this section lists was re-read in the filing pass and this pass moved **no row of
`docs/decisions.md`: the two new rows + the one new amendment note were APPENDED** (so no cited
`docs/decisions.md:<n>` anchor shifted). **All other findings in the citation block above are
unchanged and remain reported-not-fixed**, exactly as the filing pass recorded them.

## 3a. Adversarial findings — **the pass HAS NOW RUN (2026-09-27); the as-filed heading "the pass has NOT run" is kept below as the record of the filing pass**

**Status as filed: `OWED`. No adversarial pass has run for `U-MOUNTGUARD`** (this pass is the
spec-filing pass; the unit is BLOCKED on its go-ahead and its red set, so **there is no green for an
adversarial pass to review** — RCA-3 runs *after* a unit's green). **⟶ STILL CORRECT AS AMENDED
(2026-09-27, the red-set pass): `OWED` — a red set exists (§4.6), a green does not, and the
adversarial pass has NOT run. The as-filed reason's *"its red set"* half is spent; its *"no green"*
half is exactly why the status is unchanged.** **The table below is the SEED SET
for the pass that will run**, not a findings table. **No row below is a finding, and none may be
cited as one.**

**⟶ STATUS UPDATED (2026-09-27, the red-set pass) — the `OWED` status line above STANDS, and this is
the one amendment in this section.** The section's status is **still `OWED`**, for a sharpened reason:
the unit now has a **red set** (§4.6) but **no green**, and RCA-3's adversarial pass runs **after a
green**. **The red run is NOT the adversarial pass**, and the finding recorded immediately below is
**not** one of §3a's seed-set dispositions — it is the **red run's own measurement**, recorded here
because §4.4 `S-1`/§4.1 require a host finding to land **in §3a** and **not** as a
`docs/defects.md` row (the `R13-HOST-FIX` precedent, `docs/decisions.md:39`). **The seed set below is
untouched by the amendment and remains the pass's work list**; its `A-1`/`A-6`/`A-7` rows are now
**known-live** rather than hypothetical, which is why this section still matters. **⟶ THE PASS HAS
SINCE RUN (2026-09-27, the adversarial + blind-verification pass): the two `OWED` status lines above are
SUPERSEDED as statements about this section's present state and are kept visible; the seed set below
was resolved row by row, and the findings + dispositions are §3b's landed table at the end of this
file (`ADV-1`…`ADV-10`).**

**THE RED RUN'S FINDING (§3a `RED-1`…`RED-6`) — recorded here per §4.4 `S-1`, and it is a HOST finding, so it
is deliberately NOT a `docs/defects.md` / `docs/HANDOFF.md` row** (a host finding is fixed **here**;
the `R13-HOST-FIX` precedent is the class). **Layer: `[T]`/`[H]` (`src/renderer/runtime.ts` +
the shim tree). Status: **⟶ `CONFIRMED-FIXED` (2026-09-27, the adversarial + blind-verification pass)** — the fix **HAS** landed (`reconcileMount()`, §3a `RED-5(ii)`), `M-17`/`M-18` exist and are green, and the out-of-tree mirror check (fix reverted) reddens exactly the 5 expected rows. *(**As filed by the red-set pass, SUPERSEDED and kept visible:** "Status: `OWED` — the fix has NOT landed; no `src/**` file is touched by this pass.")*
The probe is the acceptance evidence; `M-17`/`M-18` are the regression rows.**

| # | Item | Record |
| --- | --- | --- |
| **`RED-1`** | **THE MEASURED DEFECT — a re-derivation leaves TWO engine-emitted roots in one mount** | **Verbatim, measured:** one `loadEnvelope` into one mount leaves **two engine-emitted direct children** — **`{"childCount":2,"count":2,"nodeIds":["node-234","node-246"]}`** — on a Runtime that was **constructed but NEVER `bootstrap()`ed**. The first `loadEnvelope` is therefore already enough: this is not a cycle-2-only effect. |
| **`RED-2`** | **THE ATTRIBUTION — the defect is NOT placement-specific** | The same sequence run with the **NON-placement demo envelope** reproduces **`count 2`**, so the read is not an artefact of the path-enumeration (`compilePath`) route. **A fix that repairs only the placement path is red** (§3.1 `M-18`). |
| **`RED-3`** | **THE MECHANISM, as visible in the serialization** | `tearDownGraph()`'s re-render mounts an **emptied previous root** — serialized as **`class="demo-shell"` with no children** — and then `loadEnvelope`'s **`resetRenderState()` drops the diff baseline** (`src/renderer/runtime.ts:803-809`: `domPrevMap`/`ssrPrevMap` → `null`, `prevStates.clear()`), so the removal ops the diff would have emitted for the previous root are **never emitted** and **the new root is appended ALONGSIDE the old one**. Both elements carry `data-node-id` (`src/renderer/runtime.ts:90`'s `{ nodeIdAttribute: true }`), so both count as engine-emitted and the mount holds **`count === 2`**. The runtime itself has **no mount-clearing call**: the only `this.mount` uses are the assignment (`:110`) and the `innerHTML` read (`:1117`). |
| **`RED-4`** | **REACHABILITY — stated so the fix is scoped to what is actually reachable** | **The live boot order does NOT reach it:** `src/renderer/renderer.ts` `bootstrap()`es before any load, so a fresh graph exists before the first `loadEnvelope`. **The HOST'S OWN LOAD ENTRY ON A NOT-YET-RENDERED RUNTIME DOES reach it** — `Runtime.loadEnvelope`/`loadDoc`/`codeLoad` are public and callable on a constructed-but-unbootstrapped runtime, and **the landed placement row `tests/runtime-host.test.ts:183-189` uses exactly that sequence** (`new Runtime({mount, envelope})` → `loadEnvelope(env)`, no `bootstrap()`). **The defect is therefore host-reachable through a documented public entry, not only through a synthetic drive.** |
| **`RED-5`** | **WHAT THE FIX MUST ACHIEVE — the invariant, and the acceptance** | **Required outcome, and the whole of the obligation:** *after every re-derivation of the four paths of §1 item 4 completes, the mount holds exactly ONE engine-emitted root element and it is the graph's current root node* — so the sequence `new Runtime(…) → loadEnvelope(…)` (and every cycle after it, on **both** the placement and the non-placement envelopes) yields **`count === 1`**, and **the previous root's element is no longer a direct child of the mount**. **Both readings of the mechanism are acceptable and the fix must pick one and say which:** (i) `tearDownGraph()`'s diff-based emptying is completed **before** the baseline is dropped, so the previous root is removed and the mount is genuinely empty; **or** (ii) the load path **reconciles the mount** (removing leftover engine-emitted direct children) before the new tree is emitted. **Neither is licensed to skip the other four paths:** `loadEnvelope`, `loadDoc`, the `code.*` route and a cycle of any of them must all hold the invariant. **The acceptance is the probe, not a private seam:** §2.1's `probeMountInvariant` on the reproducer's mount must report **`ok === true` / `count === 1` / `violation === null`** (`M-17`), and `assertMountInvariant` must stop throwing there. **The fix may not touch the shim** (§5.1's outside-scope list), **may not add an MCP surface**, and **may not change `teardown()`'s measured two-layer state** (`M-11`/`M-12`: `count 0` on the mount, `inTree 1` in the graph) — the teardown path is **not** the defect path. |
| **`RED-6`** | **THE DISPOSITION — and what is still owed** | **`OWED`.** §3b's disposition vocabulary is what this row is reconciled to: the host fix (with its regression rows) is what moves it to **`CONFIRMED-FIXED`**, and neither the fix nor the regression rows exist yet. **No `docs/defects.md` row is filed, and none is owed** (§4.4 `S-1`; §7 item 10). **`S-2` stays live over the whole unit:** if the later adversarial pass cannot reproduce the violation, the no-guard outcome governs and this finding is reported as unreproduced rather than as fixed. **⟶ DISPOSITION LANDED (2026-09-27, the adversarial + blind-verification pass): `CONFIRMED-FIXED`.** The fix (`reconcileMount()`) **has landed**, its regression rows **`M-17`/`M-18` exist and are green**, the previous root is **detached** rather than out-numbered (`RED-5`'s other half, independently verified), and reverting the fix in an **out-of-tree mirror** reddens exactly `M-17`, `M-18`, `M-14`'s attribution half and the two blind teardown rows **while every pre-existing row stays green**. **`S-2` is discharged — the pass DID reproduce a violation** (§4.4's own state block), so the no-guard outcome does **NOT** govern. **Still not a `docs/defects.md` row, and none is owed.** *(The as-filed `OWED` clause above is kept visible as the state before the pass.)* |

**THE SEED SET — every row is an edge case / malformed input / unauthorized-access probe that the
later pass MUST resolve:**

**⟶ STATUS: THE ADVERSARIAL + BLIND-VERIFICATION PASS HAS RUN (2026-09-27) — `OWED` IS DISCHARGED.**
The two `OWED` status lines above are **SUPERSEDED and kept visible**; what survives of them is the
sharpened reason they gave, now satisfied: the unit had a red set and **no green**, and RCA-3's
adversarial pass runs after a green — **the green has since landed** (the probe + the `reconcileMount()`
fix + `M-17`/`M-18` green, `59 files / 916 passed / 2 skipped / 0 failed`), so the pass **RAN**, the
seed set below **was resolved row by row**, and the results are **§3b**'s disposition table (the
findings `ADV-1`…`ADV-10` are the pass's, not this section's seeds). **The two blind FAILs the pass's
independent verification returned — `TEAR-3`/`TEAR-4` in
`docs/specs/mount-invariant-guard-greens.md` §6/§8 — are the SAME finding this pass pinned as §3.1
`M-19` (the never-bootstrapped teardown drive), and they are resolved by pinning the drive rather than
by changing `teardown()`.** **`RED-6`'s disposition is `CONFIRMED-FIXED`** (see its own amendment
below), and the seed set's `A-1`/`A-6`/`A-7` rows — the ones the red-set pass marked known-live — are
resolved in §3b.

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **A-1** | Two loads into **one** mount with the **same** envelope, then a third — does any intermediate observation point show `count === 2`? (This is `M-3` re-run adversarially, with the mount inspected **between** every call, not only after.) | `[T]`/`[H]` |
| **A-2** | A foreign sibling appended **between** two re-derivations: does the probe still find exactly one engine-emitted root, and does the diff-removal leave the foreign sibling's **reference** intact? | `[T]` |
| **A-3** | A mount reference mismatch (`probeMountInvariant(mountB, { mount: mountA })`) — is it reported rather than silently accepted? | `[T]` |
| **A-4** | `loadDoc` after `loadEnvelope`, then `loadEnvelope` again — does the **serialized** path leak a second root? | `[T]`/`[H]` |
| **A-5** | `codeLoadBatch` with several staged `code.*` ops (one re-derive) — does the batch path leave exactly one root? | `[T]`/`[H]` |
| **A-6** | `teardown()` × 3, then a load — does the count return to 1? | `[T]`/`[H]` |
| **A-7** | A placement-routed envelope at depth 4 (the `compilePath` path) — is `count` still **1**, or does the path enumeration emit a second **direct** child? | `[T]`/`[H]` |
| **A-8** | An envelope whose graph is **root-only** (`inTree === 1`) — one root, or zero? | `[T]`/`[H]` |
| **A-9** | Malformed mounts: `null`, `undefined`, `''`, `0`, `{children: 'x'}`, a `ShimElement` with a **removed** child still referenced | `[T]` |
| **A-10** | `expect.rootNodeId` set to a **stale** id, a **foreign** id, `''`, `null`, and a number | `[T]` |
| **A-11** | Duplicate `data-node-id` values among direct children — reported **twice**, or deduped (a dedupe is a FINDING: it hides F-1)? | `[T]` |
| **A-12** | A child with `data-node-id=""` — does a blank value satisfy the invariant? (It must not — F-9.) | `[T]` |
| **A-13** | Static/unauthorized-access sweep: does the module contain `querySelector`/`querySelectorAll`/`getElementById`/`closest`, `document`, `window`, `matchMedia`, `getComputedStyle`, `activeElement`, any `src/renderer/**` import, any `electron`/`node:fs` import, any registry/store, any module-level mutable state? | static |
| **A-14** | The five-seam sweep: does the unit add a tool/resource/group/`VALID_GROUPS` member/`RpcMethod` member/`MUTATING_METHODS` entry/IPC method? Does `tests/engine-pin-version.test.ts`'s **21**-member census still pass **unchanged**? | `[H]` + static |
| **A-15** | **Shim-scope probe:** does anything in the change set touch `src/shared/dom-shim.ts`, or require a member the shim lacks (`querySelectorAll`, `setProperty`, `getComputedStyle`)? | static |
| **A-16** | **The region re-entry probe:** does any file of this unit reintroduce a region/`ShellRegion*` concept, or import a name from the declined half? | static |

## 3b. The adversarial pass's disposition table — **the shape this contract is reconciled to; §3b's landed table is at the END of this file**

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a host finding, **fixed here + regression-tested** (a new §3 row) |
| **CONFIRMED-RULED** | a behaviour reviewed and ruled correct; the ruling is recorded with its reason |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md` (symptom · repro · root cause · proposed fix shape); **the package is never patched** |
| **NOT-A-FINDING** | raised, examined, and recorded with the reason it is not a finding |
| **OWED** | raised and **not yet resolved** — the pass may not report done with an `OWED` row |

**Status of the table itself: `OWED` — empty by construction.** **No row may be moved out of
§3a's seed set into this table without a named disposition and, for a host finding, a landed fix +
its regression row.** **A DONE row that cites no adversarial pass (or whose findings are
unrecorded) is a review finding** (`AGENTS.md` RCA-3). **⟶ UPDATED (2026-09-27, the red-set pass):
the table is still EMPTY BY CONSTRUCTION, and `OWED` still governs it — but the red run has landed
its finding in §3a, and §3a's `RED-6` states the disposition it is owed. When the host fix lands with
its regression rows, the host finding's disposition is `CONFIRMED-FIXED` and **this table is where it
is recorded**; nothing in the red run may be filed here before that.** **⟶ DISCHARGED (2026-09-27, the adversarial + blind-verification pass; read the two `OWED` clauses above as that pass's state): the table is NO LONGER EMPTY — the landed disposition rows `ADV-1`…`ADV-10` are at the file's END under the `## 3b (continued …)` heading below, no row is left in the bare `OWED` state, and the host finding's disposition is recorded there as `CONFIRMED-FIXED`. The clause that survives unamended is the review rule: a DONE row that cites no adversarial pass, or whose findings are unrecorded, is a review finding (RCA-3).**

**Why these two sections sit at the END of this file (the `docs/specs/engine-drift.md` convention,
stated so the placement is not read as an oversight):** the **seed set** is the artifact the pass
that runs *after* the green works from, and the **disposition table** is what this contract is
reconciled *to* afterwards. Keeping them last means an appended findings block extends the file
without renumbering §6/§7/§8 — **no section number of this spec moves when the pass lands.**

---

## 3b (continued, at the file's END by the convention stated above). THE LANDED DISPOSITION TABLE — the adversarial pass + blind verification (2026-09-27). **This is the same §3b, not a new section: the landed rows were appended here so no section number moved.**

**THE ADVERSARIAL PASS RAN, and the unit's independent BLIND VERIFICATION RAN.** Both passes returned
**the SAME blocker, measured twice independently**, in this contract's teardown wording (and in
`docs/decisions.md`): the **unconditional** claim that `teardown()` leaves the mount with **zero**
engine-emitted direct roots, true **only on a bootstrapped / re-baselined runtime**. **The measurement
now exists and this pass pins it as §3.1 `M-19`; the wording is re-pinned to the drive in §1.1, §3.1
`M-11`/`M-12`, §7 item 13 and `docs/decisions.md`.** **Every row below is one of those findings, with a
disposition; the §3a seed set was resolved row by row in the same pass.** **The unit's state at the
end of this pass: fix landed, regression rows `M-17`/`M-18` existing and green, `M-19` appended and
green, trio green (`59 files / 916 passed / 2 skipped / 0 failed`; unit file **44 rows**).**

**Disposition vocabulary — the five §3b members plus the ONE this pass needs** (recorded rather than
smuggled, so the table above is not read as violated): **`FIXED-this-pass`** = found here, fixed here,
with its regression row; **`RESOLVED-BY-PINNING`** = the finding was a contract gap, and the contract
now pins the measured behaviour (no code change); **`OWED-with-owner`** = real and NOT resolved, with a
**named owner** and a named target — the honest form of an `OWED` row that does **not** block this
unit's DONE row because the owner is a later, already-named pass; **`PARKED-with-revisit-condition`**
= real, deliberately not fixed, with the condition that re-opens it; **`ACCEPTED-AS-PINNED`** = the
behaviour is already covered by a landed contract row, so it is a recorded limitation, not a defect;
**`NOT-A-FINDING`** = raised, examined, and shown to be already-required behaviour.
**§3a's `OWED` vocabulary means "the pass may not report done with a row in that state" — that clause
is honoured: NO row below is left in the bare `OWED` state.**

| # | Finding (as the pass returned it) | Layer | Disposition | Where it lands |
| --- | --- | --- | --- | --- |
| **`ADV-1`** | **The teardown claim was unconditional and is drive-specific** — `teardown()` leaves **ZERO** engine-emitted roots only on a **bootstrapped / re-baselined** runtime; on a **never-bootstrapped** runtime the **FIRST** `teardown()` leaves **ONE** mounted root (the graph's live in-tree root, `inTree === 1`) and cycles 2/3 leave **0**. The idempotence claim is drive-specific too. Found by the adversarial pass **and** independently by the blind run. | `[T]`/`[H]` | **RESOLVED-BY-PINNING** | §1.1 (drive-specific re-pinning, old text kept and marked), §7 item 13, §3.1 **`M-19`** (the new row), §3.1 `M-11`/`M-12` (their drive NAMED + cross-referenced), `docs/decisions.md` (`MOUNTGUARD-TEARDOWN-LEAVES-THE-MOUNT-NOT-THE-GRAPH`) |
| **`ADV-2`** | **The reconciler is not total** — `reconcileMount()`'s `holder.children` read and its `Array.from(kids)` iteration sit **OUTSIDE** the local `try` (`src/renderer/runtime.ts:836-858`), so a throwing `children` getter or a throwing iterator propagates out of `loadEnvelope()`. | `[H]` | **PARKED-with-revisit-condition** | **Owner: the host (`src/renderer/runtime.ts`), no pass owns it yet.** **Revisit condition:** the next `src/renderer/runtime.ts` change, **or** any red row that observes a load throwing on a hostile mount — then `reconcileMount()` is made total (guard the read and the iteration like the per-child reads already are). **Why parked rather than fixed here:** the mount's own unreadability is a pre-existing host property that the `Runtime` constructor shares, so this pass neither introduced nor widened it, and no §3 row of this unit measures it. |
| **`ADV-3`** | **The detach rule is a heuristic, and it could detach ANOTHER GRAPH'S live root if two graphs shared one mount** — `reconcileMount()` removes **every** direct child with a non-empty `data-node-id`, on the reasoning that any such child belongs to a discarded graph. | `[H]` | **PARKED-with-revisit-condition**, **plus a stated precondition** | **THE PRECONDITION, now explicit in this contract: ONE RUNTIME PER MOUNT.** A caller that mounts two runtimes on one element is **outside the contract**, and `MULTI-GRAPH-ISOLATION` (`docs/decisions.md`, its own GraphScope + own mount `#panes`) is the adopted answer for a second graph. **Revisit condition:** any unit that puts two runtimes on one mount — then the detach rule must be scoped by ownership (a marker/registry), not by the presence of `data-node-id`. |
| **`ADV-4`** | **The probe REFUSES a real-DOM mount** — `directChildren()` requires `Array.isArray(kids)` (`src/shared/mount-invariant-guard.ts:134-143`), while a real DOM's `children` is an **`HTMLCollection`**, so a real mount is refused as `'mount-not-appendable'`. | `[H]` | **OWED-with-owner** | **Owner: the pass that would take §5.2's OPTIONAL `[U]` row** (a real-DOM cardinality row is **not takeable until this is fixed** — recorded in §5.2). **The fix shape is a widening to array-like (plus its own rows); it is a §2.1-adjacent host change and needs its own gate, which is why this pass does not take it.** **This is also why §5.2's `[U]` row's status stays `NOT TAKEN`, with a stronger reason than before.** |
| **`ADV-5`** | **Two unguarded property GETs can mis-type a refusal as `mount-not-appendable` and MASK a real violation** — a mount whose `children` getter throws is reported as the malformed-mount refusal rather than as an unreadable tree, so a caller reads a **shape** refusal where the truth is a **host defect** (the same class as `ADV-2`, on the probe's side). | `[H]` | **ACCEPTED-AS-PINNED** | §2.1 (*"the probe never throws"*, the malformed-mount refusal) and §3.2 `F-5` **already pin** the refusal for exactly these shapes — the probe is total **by contract**, and no §3 row is falsified. **The honest limitation is recorded here rather than fixed:** a caller that needs to distinguish "the tree is unreadable" from "the mount is malformed" has **no code for it** in the six-member `MountViolationCode`, and adding a seventh member is a **surface change** (§2.1's exact-surface rule, `S-2`) needing its own gate. |
| **`ADV-6`** | **The serialization fallback's `/data-node-id="…"/` is UNANCHORED**, so a child that carries no `data-node-id` of its own but contains a nested element that does **can be counted as a ROOT** — the probe's second read route over-counts in that shape. | `[H]` | **ACCEPTED-AS-PINNED** | §2.4 item 2 **pins the serialization-derived read as the contract's second route** (and §2.4 item 1 pins *direct children only* for the tree read), so the fallback is required behaviour, not drift — and requiring a query API instead is forbidden (§2.4 items 2/4). **The limitation is recorded here so a later pass reads the over-count as a known cost of the fallback rather than as a finding; the revisit condition is a later pass admitting a tighter, still query-API-free read.** |
| **`ADV-7`** | **`A-10`'s non-string / blank `expect.rootNodeId` is UNPINNED, and a WHITESPACE-ONLY `data-node-id` is counted as engine-emitted** — §2.1 documents only *"Omit to assert cardinality only"*, and the implementation's rule is `typeof value === 'string' && value.length > 0` (`src/shared/mount-invariant-guard.ts:126-130`, `:96`), so `' '` counts as an engine id while `''` does not. | `[T]`/`[H]` | **OWED-with-owner** | **Owner: the next contract pass for this module** (this pass's amendment scope is the teardown wording, plus recording findings). **The two clauses owed, exactly:** (a) a row pinning that a **non-string** or **empty** `expect.rootNodeId` is **cardinality-only** (no `expect-mismatch`, no `root-identity-mismatch`), extending `A-10`/`F-6`; (b) a **ruling** on whitespace-only `data-node-id` — either `F-9` is widened to *"blank"* (non-empty **after** a whitespace rule) or the current `length > 0` behaviour is pinned as intentional. **No row of §3 is falsified today** (`F-9` names the **empty-string** case only), which is why this is owed rather than a defect. |
| **`ADV-8`** | **The blind run returned TWO `FAIL`s — `TEAR-3` (`teardown()` on a never-bootstrapped Runtime leaves ONE engine-emitted root) and `TEAR-4` (the amended invariant read as *"one root at EVERY point"* is unsatisfied there)** — against the contract's teardown wording, at a state the row set did not cover. | `[T]`/`[H]` | **RESOLVED-BY-PINNING** | **The same finding as `ADV-1`, one row per reading, not two independent defects** (the blind record says exactly that). §3.1 **`M-19`** pins the drive; §1.1's re-pinning supplies the statement `TEAR-4` found missing. **Nothing is laundered: the blind record's two FAIL verdicts stand as returned, and `docs/specs/mount-invariant-guard-greens.md`'s §6/§8 remain the verbatim record.** |
| **`ADV-9`** | **The fix's regression rows were NAMED BUT DID NOT EXIST** (the adversarial pass found the spec and the decision log citing `M-17`/`M-18` as "the rows the host fix must turn green" while no such row existed — the only row that reddened when `reconcileMount()` was removed was `M-14`, i.e. 40 of 41 stayed green). | `[T]`/`[H]` | **FIXED-this-pass** | §3.1 **`M-17`** (the regression row) and **`M-18`** (the non-placement attribution + placement variant) **now exist** in `tests/mount-invariant-guard.test.ts`; **`M-14`'s `plainRaw` is now an ASSERTION**, not a failure-message interpolation. **Verified by reversion in an out-of-tree mirror: the target files go 5-failed — `M-17`, `M-18`, `M-14`'s attribution half, and the two blind teardown rows (`TEAR-3`/`TEAR-4`) — while all pre-existing rows stay green.** |
| **`ADV-10`** | **HOST COMMENT / FOREIGN SPEC repeating the unconditional teardown form (found by this pass's READ-before-cite, NOT edited here — `src/**` and the sibling spec are outside this pass's write scope).** (a) `src/renderer/runtime.ts:559`'s own doc string reads *"Returns the post-teardown census (inTree === 1). **Idempotent.**"* — the **post-teardown census** half is accurate on both drives, the **idempotence** half is now **drive-specific** (cycle 1 vs cycles 2/3 differ on a never-bootstrapped runtime). (b) `docs/specs/runtime-host.md:119` states *"Idempotent: calling teardown on an already-root-only graph is a **no-op**"* and §3.6's row states *"mount empty"* — the unconditional form. | `[H]` + doc | **OWED-with-owner** | **Owner: (a) the next pass that edits `src/renderer/runtime.ts` — it should say "drive-specific" explicitly, and this pass may NOT edit `src/**`; (b) the next `docs/specs/runtime-host.md` pass — its §3.6 row needs the same drive qualifier and an `M-19` cross-reference.** Reported, not silently reconciled (§7 item 8's rule). |

**Not one row above is a package-class finding:** every one is this repo's own host code or contract,
so **no `docs/defects.md` / `docs/HANDOFF.md` row is owed** (§7 item 10, the `R13-HOST-FIX`
precedent) — recorded because a later reader may expect an engine-catalogue entry.

**The §3a seed set's disposition, so no seed is left unaccounted for:** `A-1`/`A-6`/`A-7` were
**known-live** and are now pinned (`A-1` by `M-3`'s five points, `A-6` by `M-12`/`M-19`, `A-7` by
`M-14`/`M-18`); `A-2`/`A-3`/`A-8`/`A-9`/`A-11`/`A-12` are pinned by `M-7`/`F-4`/`F-2`/`F-5`/`F-8`/`F-9`;
`A-4`/`A-5` by `M-15`/`M-13`; `A-10` is **partly pinned** and its remainder is **`ADV-7`**;
`A-13`…`A-16` are the static sweeps and are **green** on the landed tree (`0` forbidden tokens;
`ALL_TOOLS` **21** / `RpcMethod` **21** unchanged; no shim member added; no region concept
reintroduced).

