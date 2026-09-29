# Spec — `U-REALDOM-BOOT`: the `npm run ui` leg (a REAL Electron renderer under a controlled temp profile, driven over stdio MCP, producing ONE real measurement)

Status: **SPEC — FILED 2026-09-27** (wave **C**, unit `U-REALDOM-BOOT`; architect ruling **A-d8**
of `docs/specs/provident-electron-shell-chrome-handoff-review.md`'s appended
**`Amendment record (A-d4…A-d8)`** §1.11, the governing layer; `H-r18`/`H-r19` bind the leg's
placement, ordering and hermeticity truth). This file is the spec path owed by
`docs/next-steps.md`'s `## OPEN` row **C1** (**was `OWED — not filed`; this file is that filing**)
and by the handoff review §8's owed-spec list (`ci-ui-leg.md`).
~~**The unit has NOT run: no leg exists, nothing here is `DONE`, no `npm run ui` script exists, and
no measurement has been taken by this pass.**~~ *(SUPERSEDED: 2026-09-27 — **the unit HAS run and the
leg is GREEN.** `scripts/electron-ui.mjs`, the shared spawn helper `scripts/electron-spawn.mjs`,
`package.json`'s `"ui"` key and the `src/main/main.ts` seam all EXIST; the unit's test rows are
**27/27 green**; the live leg prints **`UI RESULT: 0 failures (5/5 rows green)`** and ONE real
measurement was taken (`427x22`, `fontSize="16px"`). **The landed state, the measurement note and
the TWO spec defects this amendment corrects are in the AMENDMENT NOTE + AMENDMENT BLOCK below.**)* Source: `docs/next-steps.md` `## OPEN` row **C1** +
`docs/decisions.md` `REAL-DOM-UI-GATE-LEG` (A-d8's decision row) + the amendment record §1.11
(owner artifacts / the one ruled production seam / the red rows `R0`–`R4` / the stop conditions)
+ §1.13 (the honest limits `R4` prints) + §1.14 (the five dissents; **DISSENT 3** is this unit's
production-seam cost, recorded, not waived).
**The blocking state this filing replaces:** row `C1`'s `Blocked on` cell read *"`BLOCKED` → then
`U-ENGINE-PIN` green"* — that blocker is **SPENT** (`U-ENGINE-PIN` and `U-ENGINE-DRIFT` are both
`DONE` 2026-09-27, `npm run divergence` → **`R13 RESULT: 9 checks, 0 failures`**; the two DONE
records above the `## OPEN` table are the authoritative cells). **This unit's own precondition
(§5) and the DISPLAY prerequisite (§6) are what remain, and neither is discharged by those DONE
rows.** *(SUPERSEDED: 2026-09-27 — **both were satisfied in the live run** (`npm run divergence` →
`R13 RESULT: 9 checks, 0 failures`, and a display was available); **what remains is a NEW decision
this spec does not take** — whether the leg should RETRY a bootstrap that dies `SIGTRAP` under this
environment's `/dev/shm` restriction. See the AMENDMENT BLOCK's `RK-14` note.)*

> ## ⛔⛔ RECONSTRUCTION NOTE — THIS FILE WAS REBUILT 2026-09-27 AFTER AN ACCIDENTAL FILE REPLACEMENT. READ THIS BEFORE CITING ANY LATER BLOCK.
>
> **What happened.** A documentation pass that intended to **append** a status/annotation block
> (`AMENDMENT BLOCK 9`) **replaced this whole file instead of appending**. The replacement destroyed
> **≈996 uncommitted lines** — every block this cycle's passes had added **after the base was
> committed**. **No `src/**`, no `tests/**`, no `scripts/**`, no `package.json` and no other doc was
> damaged** — the loss was confined to this one file.
>
> **What was RECOVERED FROM VERSION CONTROL (byte-for-byte, authoritative).** The whole base was
> restored with `git show HEAD:docs/specs/ci-ui-leg.md` — **676 lines**: the title + status block,
> the **AMENDMENT BLOCK 1** (`M-1`…`M-4`: the `R1` re-pin, the scripts-count re-pin, the landing
> measurement note, `RK-14`), **§0**, the **Layer declaration**, **§1**, **§2** + **§2.1**, **§3**
> (**§3.0** the red rows, **§3.1**–**§3.6**), **§4** (`ADD-1`…`ADD-6`), **§5** (+ §5.2–§5.5),
> **§6**, **§7**, **§8** (`N-1`…`N-8`) and **§8a** with the amendment's appended index rows.
> **Not one line of that text was rewritten, renumbered, reflowed or "tidied" by this
> reconstruction** — the appended blocks are *after* it, and where a base clause is now superseded
> the base sentence is kept as filed and the pointer to the superseding block sits in the index.
>
> **What was RECONSTRUCTED (the appended blocks), and from what.** **AMENDMENT BLOCKS 2–8** and
> everything they introduced: the **RETRY ruling** (`A2-1`…`A2-3`) and the **retry clause set
> `§3.7 RT-1`…`RT-9`** (the largest piece) **+ its PRECEDENCE CLAUSE**; the **`RT-*` row set**
> (`B3`); the **`F-1`/shim-integrity RCA** (`B4`); the **timeout-class race RCA + fix** (`B5`); the
> **`F-1` closure** (`B6`); the **doc-review corrections + stale-anchor remap** (`B7`); and the
> **ADVERSARIAL PASS RECORD** (`AP-1`…`AP-5`) with the findings **`F-0`, `G-1`…`G-13`** (`B8`).
> These were rebuilt **from this cycle's MEASURED RECORDS, not from invention**: the session's
> measured facts for each block, cross-checked against the quotes and enumerations the surviving
> records carry — `tests/ui-leg-contract.test.ts` (its `RT-*` and `SEAM-*` row ids and their
> clause references), `tests/ui-leg-seam.test.ts`, `docs/specs/ci-ui-leg-greens.md`,
> `docs/specs/ci-ui-leg-live-status.md`, `docs/next-steps.md` (the `WAVE-C UPDATE`/`UPDATE 2`/
> `DONE — U-REALDOM-BOOT` records), `docs/decisions.md`, `docs/defects.md`, `docs/pending.md` §F and
> `docs/FORKER.md`. **Every number, exit code, signature string and measured boundary below is
> quoted from those records as MEASURED; nothing normative was invented to fill a gap.**
>
> **What could NOT be recovered verbatim — stated honestly rather than faked.** **(i)** the exact
> as-written prose of `A2-1`…`A2-3`, `B3-*`, `B4-*`, `B5-*`, `B6-*`, `B7-*` (only their **content**,
> their **ids**, their **citations** and their **measured values** survive in the records above —
> the wording here is the reconstruction's, and it is marked as such at each block); **(ii)** the
> original **line ranges/anchors** of the appended blocks (they cannot be known — the file's
> byte offsets after the damage differ); **(iii)** **`§8 N-9`** — the surviving records repeatedly
> cite **`N-9`** (the `B7` correction list names *"`B7-1`/`B7-2`/`N-9`"* and the blind-greens
> record cites *"`docs/specs/ci-ui-leg.md` §8 `N-9`"* for the as-filed run summary), so **the base's
> §8 did NOT carry it and its text is UNRECOVERABLE from the surviving records**: **`N-9` is
> recorded as a KNOWN GAP here, not reconstructed** — see the closing note of this block; **(iv)**
> the **`U-14`** seed's as-written prose (the **existence**, **id** and **content of the seed's
> subject** are recorded — a 14-seed sweep `U-1`…`U-14` with none obsolete — but its exact wording is
> not, and it is marked at its own entry rather than invented); **(v)** the `AMENDMENT BLOCK 9` text
> itself was **not** re-added: it exists in the damaged copy at `/tmp/ci-ui-leg.damaged.md` and
> belongs to the pass that damaged the file — this reconstruction records the blocks it destroyed,
> which is its own charge, and **does not re-file another pass's append**.
>
> **How to read the appended blocks.** They are appended in **chronological block order** (`A2` →
> `B3` → `B4` → `B5` → `B6` → `B7` → `B8`), each with its own **`§8a` index append** in the file's
> own convention (the amended/superseded rows named at their owning block). **The file's numbering
> and conventions are unchanged: no existing section or row id was renumbered, and superseded text
> is marked dated `*(SUPERSEDED: …)*` at its own site where a site exists.** **Until a later pass
> re-verifies them against the tree, treat the reconstructed blocks as this file's best record of
> this cycle's measured passes — which is what they are — and not as a fresh measurement.**

> ## ✅ VERIFICATION NOTE — ADDED 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS (the read-only audit the note above asks for at duty 1). **IT AMENDS NO CLAIM ABOVE AND REWRITES NO BASE LINE.**
>
> **What was re-verified against the landed tree, and the verdict: the reconstructed blocks' CONCRETE claims HOLD, with two exceptions this pass fixed in place.** Checked and **CONFIRMED**: the `RT-*` constants (`PROVIDENT_UI_BOOT_ATTEMPTS` default `4` / range `1`–`4` / malformed ⇒ `exit 1`; `PROVIDENT_UI_BOOT_TIMEOUT_MS` default `30 000 ms`, range `≥ 1 ms`; the fixed backoff table `250`/`500`/`1000`; the **derived** ceiling `4 × 30 000 + 250 + 500 + 1000 = 121 750 ms`); the two signature-based retryable classes and every non-retryable `RT-2` class; exhaustion `exit 1` (`RT-7`) with the interpolated budget and the no-measurement statement; the closed exit-code set `{0,1,2,3}`; the `RT-6` label shape (`attempt=<k> of <max>`, `retries=<k-1>`, and the `attempt=1 … retries=0` shape for a non-retried boot); the `RT-7` marker's interpolation; the five declared rows `R0`–`R4` and the **`11/11`** assertion mapping (the leg's `11` `row(...)` call sites: `R0` 4 · `R1` 1 · `R2` 3 · `R3` 1 · `R4` 1); `RT-9`'s leg-locality (the helper exports **no** retry); the seam rows `ADD-1..6` / `PRE-1..4` / `DIS-1..5` and the row ids `L-1`, `R0`, `R1`, `R2-a`, `R2-b`, `R3`, `R4`, the `§`-named rows, the `*-fals` rows, `SEAM-1a`/`1b`…`SEAM-4a`/`4b`, `R0(c)`, `SEAM-R0(c)-a`/`-b`, and the `RT-*` set `RT-0a`…`RT-9d` in `tests/ui-leg-contract.test.ts` / `tests/ui-leg-seam.test.ts`; the `G-1`/`G-2`/`G-3`/`G-6`/`G-7`/`G-13`-`scripts/**` dispositions (the leg takes its own `DISPLAY` observation before the precondition; the divergence child is spawned with the operator's own env; `R0(c)` carries the read-only operator-profile witness; the `R4` row scans the call sites **as a set** with comments stripped; `activeBoot`/`cleanupReported` are declared **before** the exit hook; the effective ceiling + derivation is printed).
>
> **THE TWO EXCEPTIONS, both FIXED IN PLACE THIS PASS (each marked dated at its own site):** **(1)** AMENDMENT BLOCK `M-1`'s residual claimed the landed `R1` predicate reads the `typeof window`/`typeof document` pair and left the element/API tightening "owed" — **the landed row compares the discriminating names directly** (`elementA === 'HTMLDivElement' && displayStyle === 'CSSStyleDeclaration'`), so the residual was stale in substance *and* in its line anchor; **(2)** the row-count census `68/68` (carried by §3.5, §3.7's ledger and `B7-1`) is the **pre-`G-4`** figure — the landed tree reads **`66` + `11` = `77`**.
>
> **ANCHORS: the reconstruction's line anchors are the one part of it that did NOT hold, and the reason is structural.** They were captured mid-pass, and the leg has since grown to **1521** lines while the divergence harness is **192** lines. Re-measured and corrected in place: the `R1` predicate anchor (now cited **by row name**), `MS-2`'s formatter anchor, `MS-9`'s helper-import anchor (`:18` → **`:23`**), §2.1 item 1's helper-import citation, `B5-4`'s snapshot/predicate pair (`:641`/`:660` → the sites in `bootAttempt`'s `catch`), and §5.4's entire "re-read anchors" set (its `−1`-line correction was wrong in **direction and size**; the true offsets are **`+5`** — the corrected set is §5.4's second anchor remap). **The two `B7-3`/`B7-4` notes this file inherited are the same class of drift.**
>
> **THE BASE-REGION LINE CLAIM IS NOT RECONCILED, AND IS NOT PRETENDED TO BE.** This note's own header says the base was **676 lines**; on the landed worktree the **base region runs to line 818** (the marker comments sit at 821–825) — a **142-line** gap against the note's own itemized list, which accounts for the title + status block, the reconstruction note, `AMENDMENT BLOCK 1`, §0, the Layer declaration, §1, §2/§2.1, §3.0–§3.6, §4, §5/§5.2–§5.5, §6, §7, §8 (`N-1`…`N-8`) and §8a, **but not for §3a and §3b** (the `OWED` seed set and the owed disposition table, ~`60` lines, which the base region does carry as its own text — note that base clause `N-9`'s own gap entry says "the base's §8 stops at `N-8`", which is consistent with the rest of that region being HEAD text). **A shell pass must settle this with `git show HEAD:docs/specs/ci-ui-leg.md | wc -l` and a structural diff: this audit had read-only tools and could not run git.** Until then, treat the `676` figure and the "not one line rewritten" sentence as **UNVERIFIED**, not as false — and if the base region is longer than `676`, the note's list of what is "RECOVERED" rather than "RECONSTRUCTED" needs the same correction. **No base line was edited by this pass, and this note is the only thing added to this region.**

---

## AMENDMENT BLOCK (`U-REALDOM-BOOT`, 2026-09-27) — the landing pass's spec correction + its measurement note

> **THIS IS AN AMENDMENT TO THIS FILE, WRITTEN IN THIS FILE'S OWN CONVENTION: the changed text is kept
> STRUCK IN PLACE with a dated `*(SUPERSEDED: …)*` marker (never rewritten, never deleted), the
> supersession index (§8a) is appended, and this block is the status/measurement note.**
> **Only TWO normative clauses are amended** (§3.0 `R1`'s provenance marker; §2 item 3 / §8 `N-8`'s
> scripts count + its reconciliation). **Everything else in this block is STATUS/MEASUREMENT, not a
> contract change** — no other normative clause of this file is altered, and **no test, no `src/**`,
> no `scripts/**`, no tracker and no other doc was edited by this amendment** (this pass ran no shell
> and re-ran no leg; every number below is either READ from the tree or ATTRIBUTED to the landing pass
> and labelled as such).

### M-1. FIX 1 — `R1`'s provenance marker did not discriminate (contract change)

**Measured, and the clause is re-pinned at §3.0 `R1`:** in the real renderer boot `typeof window` is the
string `'object'`, while the **shim (battery host) defines its OWN `window`/`document` DOM surface** —
the landing pass's own finding, verbatim (`docs/next-steps.md`'s `WAVE-C CHECKPOINT` finding 1, read:
*"the shim defines `window`/`document`"*); **what is READABLE in this tree** is the shim's own `document`
object installed on `globalThis` plus its `ShimElement` element class (`src/shared/dom-shim.ts:124-139`,
`:136-139`, `:4`, read) — so
*"the real boot reports a real `window`/`document` provenance"* named a **category the shim's own realm
also populates** — it could never answer the vacuity challenge already seeded as `U-11` (§3a: *"could the
`R1` typed marker be produced by the shim leg too?"*), and `typeof window` is a **realm-global coincidence**,
not a renderer-API fact. **The landed leg records TWO markers side by side and the discriminating half is
the element/renderer-API provenance:** real boot ⇒ `typeof window=object`, `typeof document=object`,
`element=HTMLDivElement`, `style=CSSStyleDeclaration`; shim boot ⇒ `typeof window=undefined`,
`element=ShimElement`, `measure=UNSUPPORTED` (**never a `0`**), reason `el.getBoundingClientRect is not a
function`. **The row's existing permission STANDS: the Implementer may EXTEND the marker, never REPLACE it
with a non-discriminating one.** **Residual, reported rather than silently fixed — ⟶ CORRECTED IN PLACE
2026-09-27 (the RECONSTRUCTION-VERIFICATION proofreader pass; the as-written text is kept struck so the
correction is auditable):** ~~as landed the leg's `R1` boolean predicate reads the
`typeof window`/`typeof document` pair (`scripts/electron-ui.mjs:387-391`, read) and the discriminating
names are recorded in the row's DETAIL string; a later pass may tighten the predicate to compare the
element/API names — **that tightening is owed, not done here** (no script edit was in this amendment's
scope).~~ **THE CLAIM IS NOT TRUE OF THE LANDED TREE, and the owed tightening HAS since been landed by the
`G-4` falsifiability pass:** the `R1` row's predicate compares the **DISCRIMINATING names directly** —
`elementA === 'HTMLDivElement' && displayStyle === 'CSSStyleDeclaration'` — with the `typeof window`/
`typeof document` pair recorded only as **SECONDARY observations in the row's DETAIL string** (the leg's
`R1 real-renderer typed marker` row; `tests/ui-leg-contract.test.ts`'s `R1-fals` row is the falsifier that
**reddens on a `typeof window` revert**). The `:387-391` line citation was **also** stale (it was captured
mid-pass; the leg is now 1521 lines) — **the predicate is cited here by ROW NAME, not by line**, because a
row label survives reflow and a line anchor does not. **No clause of this amendment changes: the re-pin
STAND is exactly what the landed predicate implements.**

### M-2. FIX 2 — the scripts count was off by one (contract change)

**Measured this pass (`package.json:8-21`, read):** the `scripts` block now holds **TWELVE** keys —
`clean`, `build`, `build:watch`, `start`, `start:http`, `typecheck`, `test`, `test:watch`, `battery`,
`divergence`, **`ui`** (landed at `:19`), `mcp` — and the **pre-unit** block held **ELEVEN** (the same set
without `ui`, as-filed `package.json:8-20`). **The as-filed prose said "12 keys" and "would make 13" while
its own enumeration listed eleven names: the enumeration was right and the count was off by one.** Both
sites are corrected in place (§2 item 3, §8 `N-8`) and the enumeration is now stated as **exhaustive** so
the count and the list agree by construction.

**Why the absolute number is the wrong thing to pin, recorded so the choice is auditable:** the landed
TestWriter pinned the **DELTA** — *"exactly one additive key, and it is `ui`"* (`tests/ui-leg-contract.test.ts`
`:136-179`, read; the assertion is `Object.keys(scripts).filter(k => !LANDED_SCRIPT_KEYS.includes(k))`
`toEqual(['ui'])` plus `Object.keys(scripts).length === LANDED_SCRIPT_KEYS.length + 1`), **and recorded in
its own comment that it did so deliberately** (`:136-145`, read: *"Asserting the spec's absolute numbers
would leave this row permanently red after a correct implementation"*). **The reason is the general one: an
absolute count is a claim about a file OTHER units also edit** — encoding the spec's 13 would have made a
CORRECT implementation permanently red, and an absolute-count pin silently rots on the next additive script.
**The delta is the contract's real content: this unit adds exactly one script key and it is `ui`.** A later
pass reading this file must read the count as a **MEASURED value at a date**, never as a pinned literal.

### M-3. The landing measurement note (STATUS — no clause changes)

**Attributed to the landing pass (labelled, not re-run by this amendment pass — this pass has no shell):**

| # | Measurement | Result |
| --- | --- | --- |
| **MS-1** | the unit's red set → green | **`20` failing rows → `27/27` green** — the 27 rows are `tests/ui-leg-contract.test.ts` (**18** `it(...)`) + `tests/ui-leg-seam.test.ts` (**9**), counted by reading this pass (18 + 9 = 27, agrees) |
| **MS-2** | the live leg's own result line | **`UI RESULT: 0 failures (5/5 rows green)`** — *(**⟶ ANCHOR REMAPPED 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS:** the as-reconstructed formatter anchor `scripts/electron-ui.mjs:469` is **stale** (caught mid-pass; the leg is now **1521** lines) and `5/5 rows green` is the **superseded formatter** — the landed leg prints `UI RESULT: N failures (N/N assertions green, mapped onto the five declared rows R0-R4)` from the **`F-9`**-derived tally, which is the **`11/11`** the live records carry. **No measured value moves: the green and the ONE measurement are unaffected.**)* |
| **MS-3** | `npm test` | **58 files / 822 passed / 2 skipped / 0 failed** |
| **MS-4** | `npm run typecheck` | clean |
| **MS-5** | `npm run build` | clean (bundles emitted) |
| **MS-6** | `npm run battery` | **184 checks / 0 failures** |
| **MS-7** | `npm run divergence` | **`R13 RESULT: 9 checks, 0 failures`** — **unchanged** (the `N = 9` pin intact, `PRE-4`/`U-12` discharged: the helper extraction did not move the count) |
| **MS-8** | the ONE live measurement (`R2`) | **`427x22`** at **`fontSize="16px"`**, read back over **`provident.get_rendered_html`** (both halves non-zero/non-empty ⇒ §3.0 `R2`'s pinned shape, ONE measurement — §1 item 3) |
| **MS-9** | the landed surface (read this pass, status only) | `scripts/electron-ui.mjs` + `scripts/electron-spawn.mjs` exist; `scripts/electron-divergence.mjs:18` imports the helper; `package.json`'s `"ui"` landed at `:19`; the seam landed at `src/main/main.ts:41-64` (flag **`--provident-user-data=`**, applied with `app.setPath('userData', …)` before the stores) — *(**⟶ ANCHOR REMAPPED 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS:** the helper import is at **`scripts/electron-divergence.mjs:23`**, not `:18` — the `F-1` pass added comment lines above it. **Re-measured and still correct: `package.json:19` = `"ui"` and `src/main/main.ts:41-64` = the seam.** No status changes.)* |

### M-4. `RK-14`'s flake class — **CONFIRMED REAL in this environment** (STATUS — no clause changes)

**`RK-14` (this leg's display/flake cost) is CONFIRMED REAL, not theoretical.** The sandbox **forbids
`/dev/shm` writes**, so an Electron renderer **intermittently dies `SIGTRAP` at bootstrap** — measured
**≈1-in-3 for back-to-back boots** — and **the pre-existing `divergence` leg is flaky in the identical
way** (same spawn vector, same restriction; this is why `DIVERGENCE-SPAWN-FIX`'s two flags exist,
§2.1 item 3). **Consequence, stated so no reader mistakes it for a defect in this unit:** `npm run ui`
can legitimately return the spec'd **exit `2` `PRECONDITION-FAILED`** with **no measurement taken** —
the divergence precondition reports the off-green signature (`§5.4`: `checks = 1`, `failures = 2`) and
`PRE-1` refuses to measure on a tree whose precondition is red. **That is the SPEC'D AUTHORITY ORDER
(`PRE-1`/`PRE-3`: *"a `ui` green is NOT stronger than a `divergence` red"*), NOT a bypass, NOT a skip,
and NOT a weakened measurement — the leg takes no number at all in that state.** **What a FUTURE pass
must decide (this amendment does NOT decide it):** whether the leg — or the divergence precondition it
consumes — should **RETRY a bootstrap that dies `SIGTRAP`** (a declared retry count/backoff, with
`PRE-2`'s same-tree digest re-checked across the retry). **A retry policy is a NEW contract row — a
second design decision in this spec's own terms (§1 item 3's discipline) — and may not be adopted
unilaterally by an implementation pass.** *(ANSWERED 2026-09-27, third pass: the architect **RULED the
bounded retry** and it LANDED as §3.7 `RT-1`…`RT-9` + the PRECEDENCE CLAUSE — see **AMENDMENT BLOCK 2**
below. The question this `M-4` note leaves open is therefore SPENT; the note is kept as the record of the
question, not as live status.)*

## 0. Contract-prohibitions (`H-r8` — the six prohibitions as a per-unit assertion table)

**`H-r4` requires every adopted unit's spec to carry this block** (`H-r8`, six rows). **This unit is
a HARNESS unit, not a `(C)`-admitted shell-chrome mechanism** — it is admitted by `A-d8` directly —
so the table below states **why each prohibition holds**, not a claim that they were tested as
mechanism rows.

| # | Prohibition (`S-d8` / `H-r8`) | Status for `U-REALDOM-BOOT` | The row that pins it |
| --- | --- | --- | --- |
| **1** | No consumer vocabulary as a symbol, closed-union member, default or documented constant | **HOLDS — vacuous, and asserted.** This unit authors **no** consumer vocabulary: it authors a demo envelope that already exists (`demoEnvelope`, `scripts/electron-divergence.mjs:42-72`, read) and one measurement probe. The word a probe writes into graph content is **not** a contract name. | §3 `R4`'s static row |
| **2** | No app UI content (literal text, controls, affordances, styling) | **HOLDS — vacuous.** The leg ships **no** UI, no control, no element and no styling; it drives the **existing** demo envelope through the **existing** MCP surface. | §3 `R4`'s static row; §7 item 9 |
| **3** | No policy defaults | **HOLDS — asserted.** The leg must not set a security default: the store's *defaults* are untouched and its *file* is relocated (§4). `Q8`(a) is explicit that the seam is **not** a default flip; the rejected alternative is recorded (§4.3). | §4.2 (`ADD-1`), §3 `R0` |
| **4** | No UI-config store or persistence of its own | **HOLDS — asserted.** The leg persists **nothing** outside its two scratch temp profiles and deletes them on exit (§3 `R0`, §7 item 3). | §3 `R0` |
| **5** | No new MCP surface — no new tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry | **HOLDS — asserted, and this is the row the leg's measurement channel is chosen to satisfy.** `ALL_TOOLS` **stays 21** and `RpcMethod` **stays 21**; **⟶ ANNOTATED BESIDE 2026-09-29 (`RCA-8(d)`: the as-filed `stays 21`/`stays 21` is KEPT VISIBLE and is NOT rewritten; NO figure moves and nothing is renumbered): THE LIVE FIGURE FOR BOTH MEMBERS IS **22**, NOT `21`.** The move is `docs/decisions.md`'s ACTIVE row **`FOCUS-UI-ONLY-MCP-TOOL`** (cited BY ROW NAME — that ledger is appended-to and its line anchors drift), which records `ALL_TOOLS` **`21 → 22`**, `RpcMethod` **`21 → 22`** and the default-gate registered subset `7 → 8`; **the measuring authority is `docs/specs/foundation-no-config-file-persistence-review.md` §2 rows 8/17** (read 2026-09-29) **⟶ CORRECTED BESIDE 2026-09-29 (THE GATE-7/8 REPAIR PASS, FINDING `F3`; `RCA-8(d)`: the as-filed `§2 rows 8/17` above is KEPT VISIBLE and is NOT rewritten; no figure moves and no row of this table is renumbered): THE COUNT AUTHORITY IS §2 ROW 8 ALONE — row 8 IS the `ALL_TOOLS` count measurement (`22` names in two families, 19 `provident.*` + 3 `module.*`, against `src/main/mcp-server.ts:364-387`). §2 ROW 17 IS NOT A COUNT MEASUREMENT AND MEASURES NO COUNT: it is the two-name-witness census — THIS leg's own witness duty (the fixed two-file literal at `scripts/electron-ui.mjs`, and its fixtures), which is separately relevant here because a third store file would be UNOBSERVED rather than red, and is why the witness's duty is to be extended rather than to fail. Cite row 8 for any count; cite row 17 for the witness.** against **`src/main/mcp-server.ts:364-387`** (22 names, two families: 19 `provident.*` + 3 `module.*`). **THIS ROW'S PROHIBITION-5 STATUS IS UNMOVED BY THE CORRECTION AND STAYS `HOLDS — asserted`:** the unit adds **no** tool, **no** resource, **no** group and **no** RPC method, so the clause's *substance* is untouched by the census the census moved — the number was a dated reading, and **what this leg must assert is the NAME SET, not a count quoted from any doc** (`H-r18`). **`scripts/electron-ui.mjs` and its two-name witness are NOT touched by this annotation, and no leg behaviour moves.** **The as-filed sentence resumes here: no group is added.** The measurement rides the **EXISTING** `provident.load`/`code.load` + `get_rendered_html` (§3.2); the fallbacks (`webContents.executeJavaScript`, CDP) are **leg-only and may NEVER become MCP tools** (an MCP-visible eval tool is a self-granting capability breach). **`H-r14` is not needed here**: this unit adds no tool and needs no new gate. | §3 `R2`, §3.2, §5.2 item 4, §7 item 10 |
| **6** | No criterion unverifiable on a layer this repo owns | **HOLDS for every red row this unit declares.** `R0`/`R1`/`R3`/`R4` are harness-side assertions; `R2`'s value is read back only through an existing MCP tool. **What is NOT a criterion here:** rendered geometry, CSS resolution, layout, IPC behaviour, and *any* attribute row — all four are **outside** this leg and are named as such in §7 item 6. | §3 (every red row), §7 item 6 |

**Register consequence:** `H-r8`'s prohibitions produce **no register row** for this unit — see
**§5.5**'s **RECORDED ZERO-ROW EXEMPTION**.

## Layer declaration (read this before any table below)

**This spec is HARNESS-CONTRACT-LAYER: it declares the leg's contract. No leg of it has been run by
this pass.** Every row in §3 carries its layer label from this table, and **no row may be read on a
layer it does not carry**. *(LANDED-STATE NOTE, 2026-09-27: the sentence above is the **filing** pass's
state; **the leg HAS since been run** — `npm run ui` green (`UI RESULT: 0 failures (5/5 rows green)`)
with ONE measurement, AMENDMENT BLOCK `MS-2`/`MS-8`. **The layer labels themselves are unchanged and
binding:** the `ui` green is `[U]` evidence (a real renderer under a temp profile, **not** the packaged
app), never IPC-layer, and it is **not** a licence to promote any `[T]`/`[X]` green.)*

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[U]** | real-DOM leg | `scripts/electron-ui.mjs` — **TWO** Electron boots (one per scratch profile, for `R0`), each a real `BrowserWindow` in a real renderer realm with a real DOM, driven over **stdio MCP**; **`R2`'s ONE measurement is taken in ONE of them** | **not** the packaged app; **not** a distribution; **not** a boot of the shim host |
| **[X]** | shim leg | the DOM-shim battery host (`src/main/battery-host.ts`) as `npm run battery` / `npm run divergence` drives it | **not** a browser and **not** a real-DOM carrier |
| **[A]** | divergence leg | `npm run divergence` — the **identity** leg on the **same built tree** | **structural-surfaces-only** evidence; never IPC-layer (§5.3) |
| **[T]** | node suite | the repo's own vitest files under the shim | **not** assembled-app evidence (no window, no IPC, no MCP transport) |
| **[H]** | host-side | this repo's `src/**` — the one additive seam (§4) and the store it precedes | **not** engine-internal behaviour |

**Layer anchors carried from `docs/specs/engine-drift.md`'s Layer declaration (binding here):**
**(i)** a node-suite green is envelope/pure-layer evidence and never app evidence; **(ii)** a green
divergence leg is **structural-surfaces-only** evidence, **never IPC-layer** — the `LIVE-OP-REJECT`
lesson (the envelope-layer rows were green while the assembled app refused every `provident.op`
command shape; a HOST defect, since FIXED + LIVE-VERIFIED 2026-09-27, `docs/decisions.md`
`LIVE-OP-REJECT-CLOSED`); **(iii)** **a `ui` green is NOT stronger than a `divergence` red** — the
leg's own precondition row (§5) is *"`npm run divergence` is green for the same built tree"*, and
where it is not, the leg reports **PRECONDITION-FAILED**, not a measurement (`H-r18`).

## 1. Scope

**One deliverable: one runnable leg that takes ONE real measurement, and nothing else.** The leg is
`npm run ui` (a **new** script beside `battery`/`divergence`), and its purpose is exactly one
sentence: **the `ui` leg exists so that a real-DOM claim can be made at all.**
`U-DIVERGENCE-EXT`'s (`H-r10`) real-DOM **attribute** rows depend on a real window existing; today
**none does**, which is why the measurement record's `M-46` is `UNMEASURABLE` (see §8).

1. **It is an OBSERVATIONAL/MEASUREMENT leg, NOT an identity leg.** `divergence` is an **identity
   check** (shim ≡ real on `N = 9` pinned structural properties); `ui` is a **measurement** leg for
   properties no other leg can see. **The two must never merge**, and `ui` is **not** a `divergence`
   variant (`H-r18`).
2. **The leg is outside the trio.** `npm test` / `npm run typecheck` / `npm run build` are
   unaffected; `ui` joins `battery` and `divergence` as a fourth, separate leg.
3. **The leg produces ONE real measurement** (`R2`), plus four rows that are about the leg's own
   honesty (`R0`, `R1`, `R3`, `R4`). **A second measurement is a new design decision, not implied by
   `A-d8`** (the amendment record §1.11's scope clause; the same clause governs the battery's
   migration, §7 item 11).
4. **It may land exactly ONE additive production change** (§4) — red-first, inert when unused.

**Explicitly OUT of scope (do not do in this unit):**

- **The battery's migration to the real renderer.** All four of the amendment record §1.11's
  conditions must hold first (real-DOM green + the landed pin completion + a scenario-envelope
  channel + a **declared runtime budget**). **One Electron boot per scenario is not viable.**
- **Any change to `divergence` or its `N = 9` pin.** `scripts/electron-divergence.mjs`'s pinned
  comparison set is `U-DIVERGENCE-EXT`'s file; this unit may only **consume** its exit code and
  result line as its precondition (§5).
- **Any `show:false` / offscreen claim and any CI config.** `H-r19`: do **not** add `show:false` and
  do **not** add a CI config (this repo has **no CI config** — verified by glob this pass:
  `.github/**` → no files). "CI leg" here means *"a repeatable script a human/agent runs"*.
- **Any new MCP surface** (§0 prohibition 5) and **any `ALL_TOOLS`/`RpcMethod`/`VALID_GROUPS`
  change.**
- **Any attribute row, geometry/layout row, or IPC row** (§7 item 6).
- **Any `src/**` change other than the one seam in §4**, and **no `tests/**` change beyond the
  red-first rows this spec's §3 requires** (§5.2).
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists in this
  tree** (`docs/skills/` contains exactly `process-guardrails.md`, verified by glob this pass), so
  there is **no test-use-case coverage matrix and no demo-page index to update**, and this unit
  makes no page-design change. **Recorded so no later pass hunts for an owed page-design edit.**

## 2. The surface (exact — the unit's diff scope)

| # | Path | Change | State |
| --- | --- | --- | --- |
| 1 | `scripts/electron-ui.mjs` | **NEW — the leg itself.** One Electron boot, the five rows, the exit codes of §3.6. | does not exist |
| 2 | **a shared Electron-spawn helper** | **NEW — MUST BE CREATED; none exists today.** **Verified this pass by listing `scripts/`: the directory contains exactly `mcp-cli.mjs` and `electron-divergence.mjs`** (`glob scripts/*`). There is **no** shared Electron-spawn helper, no `*-spawn.mjs`, and no helper module anywhere in the repo (`grep` for `electron-ui|spawn-helper|electron-spawn` over the tree → matches are **only** the governing docs' *owed*-item rows). The spawn is currently **duplicated inside** `scripts/electron-divergence.mjs` (the companion spawn at `:126` and the SDK-transport spawn at `:137`). **`H-r18` owns the extraction: "a new shared Electron-spawn helper (extracted from the twice-duplicated spawn in `scripts/electron-divergence.mjs`)"** — leg-owned code, so it must be reverted-into by *both* legs' call sites without changing either leg's behaviour. **Recommended path (NOT pinned):** `scripts/electron-spawn.mjs`; the path is the Implementer's/supervisor's to fix, the **contract** is §2.1's. | does not exist |
| 3 | `package.json` — the `"ui"` script | ~~**NEW key in the `scripts` block**, which today has **12 keys**~~ *(SUPERSEDED: 2026-09-27 — **the count was OFF BY ONE; the enumeration beside it was the correct authority.** As filed the block held **ELEVEN** keys — the eleven names listed below are **exhaustive** for the pre-unit tree, and the block ran `package.json:8-20` — so the `"ui"` key makes **TWELVE**, not 13. **Measured this pass (`package.json:8-21`, read):** `clean`, `build`, `build:watch`, `start`, `start:http`, `typecheck`, `test`, `test:watch`, `battery`, `divergence`, **`ui`** (landed at `:19`), `mcp` = **12 keys**. See the AMENDMENT BLOCK M-2.)* **NEW key in the `scripts` block**, which **before this unit** held the **ELEVEN** keys enumerated here — and this enumeration is the **exhaustive** pre-unit set: `clean`, `build`, `build:watch`, `start`, `start:http`, `typecheck`, `test`, `test:watch`, `battery`, `divergence`, `mcp` (as-filed `package.json:8-20`, read; **now `:8-21`** after the landed key) — so the landed key makes **TWELVE**. Shape: `"ui": "npm run build && node scripts/electron-ui.mjs"` — the same shape as `"divergence": "npm run build && node scripts/electron-divergence.mjs"` (`package.json:18`, read — **unchanged by the landing**) and `"battery": "npm run build && node tests/e2e-battery.test.mjs"` (`:17`, read — **unchanged**). | ~~key absent~~ *(SUPERSEDED: 2026-09-27 — **the key LANDED at `package.json:19`**; this cell is the as-filed pre-execution state.)* |
| 4 | `src/main/main.ts` | **ONE additive production seam** (§4), red-first. | not present |
| 5 | the red-first test rows | `tests/**` rows for `R0`'s seam half (a node-layer row is **not possible** for `R0` — see §3's `R0` note) and for the seam's *absent ⇒ unchanged* half. | absent |

**⟶ LANDED-STATE NOTE (2026-09-27 — status only, no contract change).** The table above is the **AS-FILED
pre-execution diff scope**, and every `State` cell in it is **kept as filed** (each is the state the filing
pass read, not a live status). **As landed (read this pass):** `scripts/electron-ui.mjs` (§2 item 1); the
shared spawn helper at **`scripts/electron-spawn.mjs`** — §2 item 2's *recommended, NOT pinned* path, now
imported by **both** legs (`scripts/electron-divergence.mjs:18`) — `package.json`'s `"ui"` key (§2 item 3,
`:19`); the ONE seam in `src/main/main.ts` (§2 item 4, `:41-64`); and the red-first rows (§2 item 5,
`tests/ui-leg-contract.test.ts` + `tests/ui-leg-seam.test.ts`, **27 `it(...)` rows**, 18 + 9, counted this
pass). **The diff scope itself did not widen:** the only other in-scope touched file is
`scripts/electron-divergence.mjs`'s two spawn sites, which §2.1 item 1 / `H-r18` explicitly own — its
pinned vector, its `N = 9` comparison set and its result line are unchanged (measured, AMENDMENT BLOCK
`MS-7`).

### 2.1 The helper's contract (what "shared" means, testably)

The helper is whatever the Implementer writes; **this contract is what it must satisfy**, and both
legs must satisfy it without a behavioural change to the divergence leg's comparison set:

1. **One module, imported by both legs.** `scripts/electron-divergence.mjs`'s two spawn sites become
   helper calls; **its argument vector, its env, its stdio wiring, its `cwd` and its two
   `--user-data-dir` profiles must stay byte-identical** (§5.1's no-weakening clause). The pinned
   spawn vector as landed is: `[mainCjs, '--mcp-transport=stdio', '--no-sandbox', '--disable-gpu',
   '--disable-software-rasterizer', '--in-process-gpu', '--ozone-platform=x11',
   '--disable-dev-shm-usage']` + `--user-data-dir=<fresh scratch>` (`:111`–`:113`, passed at `:126`
   and `:137`, read), with `env` = `{...process.env, DISPLAY: process.env.DISPLAY || ':0',
   ELECTRON_DISABLE_SANDBOX: '1'}`. *(ANCHOR NOTE, 2026-09-27: those `:111`–`:113` / `:126` / `:137`
   line citations are **AS FILED**. The landed extraction moved the divergence file's lines (its two
   spawn sites are now helper calls and the file is one line shorter), so the anchors are stale **as
   line numbers only** — **the pinned vector, env, stdio wiring, `cwd` and the two profiles are
   unchanged**, which is what this clause pins, and that is what the landed tree shows
   (`scripts/electron-divergence.mjs:18` imports the helper, read — *(**⟶ ANCHOR REMAPPED 2026-09-27 BY
   THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS: the import is at `:23`**; the clause's own
   contract half — the vector, env, stdio wiring, `cwd` and the two profiles — is **unchanged and
   re-verified**, including the pair `--disable-dev-shm-usage` + the fresh scratch
   `--user-data-dir=<profile>` (`scripts/electron-spawn.mjs`'s `baseArgs`, **read**) and
   `env = {...process.env, DISPLAY: process.env.DISPLAY || ':0', ELECTRON_DISABLE_SANDBOX: '1'}`
   (`electronEnv()`, **read** — byte-identical to the pair pinned here)*) plus the unchanged result line
   `R13 RESULT: 9 checks, 0 failures` (`MS-7`).)*
2. **It exposes at least:** a fresh-scratch-profile creator (the leg passes `--user-data-dir`), the
   base argument vector, the spawn, and a cleanup hook registered on `process.on('exit')`.
   **Names are not pinned**; the behaviour is.
3. **The two flags are ONE decision, not two** (`docs/decisions.md` `DIVERGENCE-SPAWN-FIX`):
   `--disable-dev-shm-usage` **and** the fresh scratch `--user-data-dir` are both REQUIRED (each
   alone still dies `SIGTRAP`; measured, `docs/specs/engine-pin-live-status.md` §1.3). **The `ui`
   leg inherits the pair and must not drop either.**
4. **The helper must not silently swallow a spawn failure** — a leg that cannot spawn reports its
   own prerequisite/fail state; it never reports `0` (§3.3, `R2`).

## 3. Behavior (every state / fail-state)

**Layer labels:** **[U]** real-DOM leg · **[X]** shim leg · **[A]** divergence leg · **[T]** node
suite · **[H]** host-side (see the Layer declaration).

### 3.0 The red rows, contract-exact (`A-d8` / amendment record §1.11)

**Five red rows. `R0` is the honest red: it FAILS TODAY** (there is no seam and no leg), which is
exactly why it is the first red. **Every row states its own pass condition AND its own fail state.**

*(SUPERSEDED: 2026-09-27 — **the five rows are LANDED and GREEN**, not red: the live leg prints
`UI RESULT: 0 failures (5/5 rows green)` (AMENDMENT BLOCK `MS-2`), and the sentence above is the
as-filed pre-execution state. **The only clause in this table this amendment changes is `R1`'s
provenance marker** (FIX 1); every other row's statement/pass-condition/fail-state stands exactly as
filed, and the `As-filed state` column is kept as filed.)*

| Row | Statement (what is asserted) | Layer | Pass condition | Fail state (required handling) | As-filed state |
| --- | --- | --- | --- | --- | --- |
| **`R0`** | **ISOLATION across TWO temp profiles.** The leg spawns the app **twice** — once per scratch profile — and asserts **(a)** `tools/list` is **identical** across the two boots, and **(b)** `provident.list_targets`' census **and** its `nodeId` vocabulary are **identical** across the two boots, and **(c)** the app **never read the developer's persisted security store** — i.e. neither boot resolved its store file under the default/real `userData` directory. | **[U]** + **[H]** | (a) ∧ (b) ∧ (c), each reported as its own labelled line | Any inequality ⇒ the leg's own `R0` fails. **(c) failing ⇒ the seam is not doing its job or is not being honoured ⇒ a HOST finding fixed here (with a red-first regression row), never a pass, never a skip.** | **RED today** (the *only* honest red this unit declares) |
| **`R1`** | **The leg is REAL and DISTINGUISHABLE from the shim leg by a TYPED MARKER** — **amended 2026-09-27: the discriminating marker is the ELEMENT/RENDERER-API PROVENANCE, never `typeof window` alone (see the pass condition and the AMENDMENT BLOCK M-1).** | **[U]** vs **[X]** | The leg records a typed marker distinguishing the real-renderer boot from a shim boot — ~~**and the marker must be a *type*, not a string the shim could equally emit.** The pinned marker (the Implementer may extend, not replace it): the real boot reports a **real `window`/`document` provenance** — the probe's own observation that the write it reads back came from a live renderer realm — recorded **alongside the same probe attempted on the shim leg.**~~ *(SUPERSEDED: 2026-09-27 — **THE `typeof window` CLAUSE IS NOT A DISCRIMINATOR, and the landing pass MEASURED that.** In the real renderer boot `typeof window` is the string `'object'` (`scripts/electron-ui.mjs:149`, read). The clause as worded named a **category the shim's own realm also populates**: the shim installs its own `document` object on `globalThis` (`src/shared/dom-shim.ts:136-139`, read) and its elements are **`ShimElement`** instances (`:4`, read), so *"reports a real `window`/`document` provenance"* is not a property only a live renderer realm can have — and `typeof window` is a **realm-global coincidence, not a renderer-API fact**, so it could never answer `U-11`'s vacuity challenge (§3a: *"could the `R1` typed marker be produced by the shim leg too?"*). **What the shim's own `window`-shaped global is, is taken from the landing pass's finding** (*"the shim defines `window`/`document`"*, `docs/next-steps.md` `WAVE-C CHECKPOINT` finding 1, read) **rather than assumed from this tree** — what IS readable in `src/**` is the shim's `document` on `globalThis` (`src/shared/dom-shim.ts:136-139`, read) and `ShimElement` (`:4`), with **no `globalThis.window` assignment found** (read; stated so the discriminator is not built on an unverified claim).)* **RE-PINNED MARKER (the Implementer may EXTEND it, never REPLACE it with a non-discriminating one):** the leg records **TWO markers side by side** and **the discriminating half is the ELEMENT/RENDERER-API PROVENANCE** — the observed element's **constructor name** and the computed style's **class name**: real boot ⇒ `typeof window=object`, `typeof document=object`, **`element=HTMLDivElement`**, **`style=CSSStyleDeclaration`**; shim boot ⇒ `typeof window=undefined`, **`element=ShimElement`**, **`measure=UNSUPPORTED`** (**never a `0`**), the reason being **`el.getBoundingClientRect is not a function`**. **`typeof window`/`typeof document` are DEMOTED to SECONDARY `[U]`-side observations** — recorded, never the predicate. **Residual reported, not silently fixed (AMENDMENT BLOCK `M-1`):** as landed the leg's boolean predicate still reads the `typeof window`/`typeof document` pair (`scripts/electron-ui.mjs:387-391`, read) while the discriminating names sit in the row's DETAIL string; **tightening the predicate to compare the element/API names is OWED, not done** (no script edit was in that amendment's scope). | absent |
| **`R2`** | **ONE real measurement:** an element measured inside the **real renderer**, whose value **appears in graph content read back over the existing MCP tool surface.** Pinned shape: **`width > 0 && height > 0`** **and** a **non-`''` `getComputedStyle` value**, both appearing in the graph content read back. | **[U]** | Both halves TRUE **and** both values visible in the `provident.get_rendered_html` response. | **The window never paints ⇒ FAIL LOUDLY, NEVER RECORD `0`** (amendment record §1.11's stop condition). A `0`, a blank, or a missing value is a **finding**, never a measurement. **A second measurement is a new design decision** (§1 item 3). | absent |
| **`R3`** | **The shim leg is recorded `UNSUPPORTED`.** | **[X]** | The shim leg is reported with the single word **`UNSUPPORTED`**, with its reason (the shim has no layout, no `getBoundingClientRect` semantics, no `getComputedStyle`). | **NEVER `divergent`, NEVER a fabricated `0`.** A `0`, an empty string, or a "matches/diverges" verdict from the shim side is a **finding**. | absent |
| **`R4`** | **The honest-limits row:** the amendment record **§1.13's statement printed verbatim**, **plus** a static row that the leg contains no call that could be mistaken for an app-level claim. | **[U]** | The §1.13 statement appears in the leg's own output, **and** a static assertion over the leg's source passes: **no call that asserts app-level behaviour** (the pinned static check: the leg contains **no** reference to a packaged bundle, no `app.isPackaged`-based claim, no assertion phrased as an app-green, no `webContents.executeJavaScript`/CDP call inside a *shipped* path). | A missing §1.13 statement, or a call that could be read as an app-level claim ⇒ **a review finding**; the row fails. | absent |

**The `R0` node-layer caveat, stated so a TestWriter does not write an impossible test:** `R0`'s
`(a)`/`(b)` halves are **leg-layer** assertions (two boots, two profiles, compared in the leg);
its `(c)` half is **[H]** (the seam's behaviour) and **is** pinned node-side — see §3.5's
`SEAM-*` rows. **A TestWriter may not move `(a)`/`(b)` into the node suite**: no window boots there.

### 3.1 The run's pinned sequence (order is contract)

| # | Step | Fail state |
| --- | --- | --- |
| 1 | `npm run build` (the first half of `npm run ui`) | build fails ⇒ stop, exit non-zero; nothing else runs |
| 2 | **PRECONDITION (§5):** `npm run divergence` green **for the same built tree** | not green ⇒ **PRECONDITION-FAILED**, exit **2**, **no measurement taken** |
| 3 | **PREREQUISITE (§6):** a display is available | absent ⇒ **PREREQUISITE ERROR naming the fix**, exit **3**, **never a skip** |
| 4 | boot the real app under **scratch profile A**; record the typed marker (`R1`) | spawn/connect failure ⇒ report loudly, exit **1** |
| 5 | boot under **scratch profile B**; take the isolation comparison (`R0` `(a)`/`(b)`) | inequality ⇒ `R0` fails |
| 6 | drive the ONE measurement probe (§3.2); read it back over `get_rendered_html` (`R2`) | never paints / value absent ⇒ `R2` fails, **never `0`** |
| 7 | record the shim leg as **`UNSUPPORTED`** (`R3`) | any other word ⇒ `R3` fails |
| 8 | print the §1.13 statement + run the static honest-limits row (`R4`); clean both profiles; exit | a missed statement ⇒ `R4` fails |

*(RETRY-ORDER NOTE, 2026-09-27 — added by the retry ruling, and it MOVES NOTHING in the table above:
**steps 2 and 3 DECIDE before any boot and sit OUTSIDE the retry boundary** (`RT-3` item 5, `RT-8`
item 4): a retry re-enters neither, and the `PRE-2` digest pair is never re-taken. Inside steps 4 and
5 the boot is now **up to 4 attempts** under `RT-3`'s bound — and a green reached on a retry is
**LABELLED** (`RT-6`). Steps 6–8 are unchanged and are the rows a retried green must still satisfy
(`RT-6`(b)).)*

### 3.2 The measurement channel (pinned; the fallbacks are leg-only)

**Preferred channel (`R2`'s channel, and the only one this unit pins):**
1. a provident **handler body** is loaded through the **EXISTING** `provident.load` / `code.load`
   (so **`ALL_TOOLS` stays untouched by the channel**);
2. the body reads **`getBoundingClientRect`** / **`getComputedStyle`** **in the real renderer's
   realm**;
3. it **writes the value into graph content** (a `content` write on an authored node);
4. the value therefore comes back over the **existing** `provident.get_rendered_html`.

**The eval gate stays OPT-IN and TEMP-PROFILE-SCOPED.** The leg may enable the `code` group
(`VALID_GROUPS` member, `src/main/security-store.ts:21`, read) **only inside the leg's own scratch
profile** — **it may NEVER enable `code` against the developer's real profile.** Enabling it in the
scratch profile's store file is an operator-equivalent action on a throwaway file (the precedent is
`docs/specs/engine-pin-live-status.md` §4's scratch driver seeding a temp profile).

**Fallbacks — LEG-ONLY, and they may NEVER become MCP tools:** (1) `webContents.executeJavaScript`,
then (2) CDP via `webContents.debugger`. **An MCP-visible "eval in the renderer" tool is a
self-granting capability breach** (amendment record §1.11; `docs/decisions.md` `REAL-DOM-UI-GATE-LEG`).
A fallback is admissible **only** if the preferred channel fails, and it must be recorded as a
fallback in the leg's own output.

### 3.3 What the `ui` green must NOT be read as (the overclaim row, stated once)

**A `ui` green proves that a specific probe, executed inside ONE real Electron renderer boot under a
controlled profile, produced the asserted value — and nothing else** (§1.13, verbatim-in-substance).
It **must never** be used to claim:

| # | Claim the leg must NOT be read as | Why |
| --- | --- | --- |
| **C-1** | that the **packaged** app behaves this way | the leg boots the dev tree's `dist/main/main.cjs`, not a distribution |
| **C-2** | **app-green from node-green** | the node suite is envelope/pure-layer (Layer anchor i) |
| **C-3** | any MCP-contract property obtained **outside** the MCP surface | the leg's value is read back **through** an existing MCP tool; anything read another way is not this leg's evidence |
| **C-4** | that **`provident.dispatch` is a real gesture** | `dispatch` carries an event **name** with no coordinates (`S-d9`) |
| **C-5** | that **`get_rendered_html` observes LAYOUT** | it reads `mount.innerHTML` |
| **C-6** | that **the shim is now faithful** | the shim is **DEMOTED TO PRE-FILTER, not retired**; `R3` records it `UNSUPPORTED` for this leg's measurement |
| **C-7** | **a rendered-geometry proof, an IPC proof, or a proof that any particular attribute row passes** | geometry/layout is **unprovable in this repo today** (`A-d4`'s mandatory clause; the `ui` leg may carry it **only** with the bound attached), IPC is **never** this leg's layer (the `LIVE-OP-REJECT` lesson), and **attribute presence is `U-DIVERGENCE-EXT`'s extractor** (`H-r10`), which does not exist yet |

### 3.4 The `R3` word set (pinned so the shim leg cannot be misreported)

| The shim leg's recorded status | When | What it may NEVER be |
| --- | --- | --- |
| **`UNSUPPORTED`** | always, for this leg's measurement | `divergent`, `matching`, `pass`, `n/a`, `0`, a blank, or a fabricated zero |
| *(nothing else)* | — | any additional status word for the shim side is a **new contract row**, not a free choice |

**Reason the shim cannot carry the measurement, recorded:** the shim observes set/overwrite/delete
only; it has **no layout**, no `getBoundingClientRect` semantics and no `getComputedStyle`
(`docs/specs/engine-pin.md` §2.2 item 6, as `docs/specs/engine-pin-live-status.md` §3.1 quotes it:
*"the shim … is **not** a browser"*).

### 3.5 The seam's own rows (node-testable, red-first)

| Row | Statement | Layer | Pass condition | Fail state |
| --- | --- | --- | --- | --- |
| **`SEAM-1`** | **Absent ⇒ today's behaviour.** With **no** user-data override supplied, the app resolves its security store and its module store exactly as it does today — same path derivation, same defaults, same first-run behaviour. | **[H]** | a node-layer row (or an app boot) shows the store path and the first-run defaults are **unchanged** when the override is absent | any observable difference ⇒ **the seam is not additive** ⇒ review finding, revert it |
| **`SEAM-2`** | **Present ⇒ the override applies BEFORE the store reads.** With the override supplied, both stores are created against the overridden path. | **[H]** | the store file the app reads/writes lands under the override, and the default profile gains **no** such file | a store created against the default path ⇒ `R0`(c) fails, and this row fails |
| **`SEAM-3`** | **Two overrides are independent.** Two boots with two different overrides neither see nor write each other's store file. | **[H]** | both files exist independently; neither boot's defaults/state leak into the other | any cross-read ⇒ `R0`(a)/(b) fails |
| **`SEAM-4`** | **The override does not flip a security default.** The *default* enabled-group set (`read` + `dispatch`) is unchanged whether the override is present or absent, and the leg enables `code` **only** by writing its own scratch store. | **[H]** | the defaults are identical in both boots; `code` is ON only where the leg opted in | a widened default ⇒ **process violation** (§0 prohibition 3; the rejected alternative in §4.3) |

*(LANDED-COUNT NOTE, 2026-09-27 — status only, no clause change: **the `SEAM-*` rows and their
`R0`-witness companions live in `tests/ui-leg-seam.test.ts`, which the unit's own records count as
**9** rows, with the contract file at **59** (`18` non-`RT` + `41` `RT`) — the unit's set is
**`68/68`**. The `R0`(c) halves have grown their own node rows since this table was written
(`SEAM-R0(c)-a`/`-b`, the `G-2` witness) — see AMENDMENT BLOCK 8's `G-2`.)*
*(**⟶ CORRECTED IN PLACE 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS — the figures
above are the PRE-`G-4` counts and are stale; the clause statement itself is unchanged.** Measured on the
landed tree: **`tests/ui-leg-seam.test.ts` holds `11` rows** (`SEAM-1a`/`1b`, `SEAM-2a`/`2b`,
`SEAM-3a`/`3b`, `SEAM-4a`/`4b`, `R0(c)`, `SEAM-R0(c)-a`/`-b` — so the `9` above predates the two `G-2`
witness rows this very note announces, which is the arithmetic slipping by two), and
**`tests/ui-leg-contract.test.ts` holds `66`** (`59` clause rows + the `7` `G-4` falsifiability rows).
**The unit's set is `66 + 11 = 77` (`77/77`)**, which is AMENDMENT BLOCK 8's `G-4` figure and the figure
the unit's own commit records. The leg's own runtime headline is a different number again: the leg prints
`N/N assertions green, mapped onto the five declared rows R0-R4` from its **`11`** `row(...)` call sites
(`R0`: 4 · `R1`: 1 · `R2`: 3 · `R3`: 1 · `R4`: 1) — that is the `11/11` the live runs quote, and it is
§3.0's row set, not the test-file census.)*

### 3.6 The leg's exit codes (pinned vocabulary, so no fail state is a silent skip)

| Code | Meaning | Notes |
| --- | --- | --- |
| **0** | every row the leg declares passed | the only green |
| **1** | a measurement row failed (`R0`–`R4`, or a spawn/connect failure) | the leg prints the failing row by name |
| **2** | **PRECONDITION-FAILED** — `npm run divergence` was not green **for the same built tree** | **no measurement is taken**; the output names the precondition and the divergence result line (§5) |
| **3** | **PREREQUISITE ERROR** — no display available | the message **names the fix** (`DISPLAY`, or an xvfb wrapper the operator supplies) |

**No other exit code is admissible, and no failure may be converted into a skip, a `0`, or a green.**

*(RETRY-EXIT NOTE, 2026-09-27 — added by the retry ruling; **the table above is unchanged**, and this
note only says which existing code a retry state uses: **a bootstrap exhaustion exits `1`** (`RT-7`),
**not** `0`/`2`/`3`; a **malformed retry configuration** also exits `1` (`RT-4` item 4, a programming
error); a **retried green** still leaves through the **single** `exit 0` path (`RT-6`(b)). The live
battery observed exactly `{0, 1, 2, 3}` — **no fifth code, no skip, no fabricated `0`**.)*

## 4. The ONE additive production seam (`src/main/main.ts`)

### 4.1 What it is, in one sentence

**The app honours a user-data override BEFORE the security store is created, so the leg can run
under a controlled temp profile; absent, it behaves exactly as today.**

### 4.2 The pinned contract (what a TestWriter can falsify)

| # | Clause | Exact statement |
| --- | --- | --- |
| **`ADD-1`** | **Position** | The override is honoured **before** `createSecurityStore(...)`. In the landed code the store is constructed at `src/main/main.ts:49-51` with `path: join(app.getPath('userData'), 'provident-security.json')` (read), and the module store at `:57-59` (read); **the seam sits above line 49 in `main()`.** |
| **`ADD-2`** | **Source of the override** | The override arrives as a startup signal carried on the process's own command line (a `--`-prefixed argument alongside the existing `--mcp-transport=` / `--mcp-port=` flags, parsed by the same argv-scan idiom at `src/main/main.ts:19-39`, read). **The exact flag spelling is the Implementer's, and it must be recorded in the leg and in `docs/decisions.md` when it lands** — `electron-divergence.mjs:111` has `--user-data-dir` occupied for Electron's own switch, so reusing that exact spelling requires the `app.setPath('userData', …)` route (below) rather than an Electron switch; **either route is admissible, and neither is pinned here, because this pass may not verify Electron's own flag semantics by reading.** |
| **`ADD-3`** | **Effect** | The effective user-data root (`app.getPath('userData')`) is the override path when the override is present. **The one API certainty available to this pass:** Electron requires `app.setPath('userData', …)` to be called **before `app.whenReady()` resolves**, and the repo's own app body runs inside `app.whenReady().then(...)` (`src/main/main.ts:158`, read) — so a `setPath`-route seam is in time. |
| **`ADD-4`** | **Additive-only** | The seam **adds** an override. It removes no behaviour, changes no default, adds no dependency, and **is inert when unused** (§3.5 `SEAM-1`, `SEAM-4`). |
| **`ADD-5`** | **Red-first** | The seam is its own red-first row: a test (or a boot) that **fails on today's code** must be written and RUN before the seam is implemented (`AGENTS.md` item 3, RCA-1). **The honest red is `R0`(c)/`SEAM-2` + `SEAM-3` failing today.** |
| **`ADD-6`** | **Scope** | One file, one seam. **`src/main/main.ts` is the only `src/**` file this unit may touch**; `security-store.ts`, `module-store.ts`, `mcp-server.ts` and the renderer are **untouched**. |

**The landed spelling (STATUS, recorded for `ADD-2`'s documentation duty — no clause change):** the
seam landed as the argv flag **`--provident-user-data=<path>`**, applied with
**`app.setPath('userData', …)`** above the store reads (`src/main/main.ts:41-64`), which is the
`setPath` route `ADD-2`/`ADD-3` allowed. **The `ADD-3` imprecision is REPORTED, NOT REWRITTEN**
(`G-13`, AMENDMENT BLOCK 8): the sentence *"before `app.whenReady()` resolves"* states the
Electron-ordering constraint imprecisely (the landed seam honours the override inside `main()`,
before the stores — which is what the clause's own second half describes); a clause correction is a
**ruling**, so the wording is left as filed with its owner named.

### 4.3 The REJECTED alternatives (recorded so a later pass does not "simplify" into them)

| Rejected shape | Why it is rejected (amendment record §1.11) |
| --- | --- |
| **Flipping the store's default groups** so the leg can see what it needs | **it changes a SECURITY DEFAULT** (§3.5 `SEAM-4`, §0 prohibition 3) |
| **Writing the developer's real `userData`** | it mutates **operator state outside the app** |
| **The narrower shape — spawn with a distinct `--user-data-dir` and *verify* the app honours it, with no production seam** | **DISSENT 3** (amendment record §1.14) records this as *"unverified from here, and **`R0` is precisely the row that would settle it**"*. **It is NOT adopted**: the governing ruling pins the seam. **Recorded here as the fallback the architect may prefer if `R0`(c) turns out to be satisfiable without production code — and as the shape a later pass may NOT adopt unilaterally.** |

## 5. The precondition: `divergence` green for the SAME BUILT TREE (`H-r18`)

### 5.1 The clause (hard, with its fail state)

| # | Clause | Exact statement | Fail state |
| --- | --- | --- | --- |
| **`PRE-1`** | **The precondition** | `npm run divergence` must be **green** *"for the **same built tree**"* — its own result line (`R13 RESULT: <N> checks, <M> failures`) with **`M = 0`** and **exit 0**. | not green ⇒ **`PRECONDITION-FAILED`**, exit **2**, **no measurement taken**, and the output records the divergence leg's own line + exit code **verbatim** |
| **`PRE-2`** | **Same-tree identity** | The tree the divergence leg ran on is the tree the `ui` leg boots: the leg records a **digest of the built artifacts** (`dist/main/main.cjs` at minimum) before and after the divergence run and requires them **equal**, with `node_modules/provident-ssr/package.json`'s version recorded | a differing digest, or a pin/installed-dist disagreement ⇒ **`PRECONDITION-FAILED`** (the tree moved under the precondition; the measurement would be un-attributable) |
| **`PRE-3`** | **Authority order** | **A `ui` green is NOT stronger than a `divergence` red.** A red divergence leg is **never** overridden, worked around, or re-run until green. | any attempt to proceed past a red ⇒ **review finding** |
| **`PRE-4`** | **No weakening of the precondition's leg** | This unit may **not** edit `scripts/electron-divergence.mjs`, its demo envelope, its comparison set or its `N = 9` pin. **`N = 9` is that leg's PIN** (`docs/specs/ci-divergence-leg.md` §5) and belongs to `U-DIVERGENCE-EXT`. | any diff to that file ⇒ **review finding** (`docs/specs/engine-drift.md` §3.7 `F-8`) |

*(`G-8` PARKED RESIDUAL, AMENDMENT BLOCK 8 — recorded here beside its clause because it is a
`PRE-2` boundary, not a defect: **the digest pair is taken BEFORE the boots**, so a rebuild **after**
the pair and **during** the boots is undetected. **The window is as designed** — a later pass must not
read `PRE-2` as covering the boots; extending it would be a **new clause** (a third digest after the
boots), not a fix. Revisit condition: a shared/CI host, a watcher, or a concurrent `npm run build`.)*

### 5.2 The trio + this leg (the unit's validation plan)

1. `npm test` — the full vitest suite (**`[T]`**), including the `SEAM-*` rows of §3.5.
2. `npm run typecheck` — clean.
3. `npm run build` — clean, the bundles emitted.
4. `npm run divergence` — **`[A]`**, **as the precondition** (`PRE-1`); expected evidence is the
   leg's own line + exit 0. **Quoted baseline (attributed, not re-measured): `R13 RESULT: 9 checks,
   0 failures`**, Electron **44.4.5**, node **24.21.0** (`docs/decisions.md`
   `DIVERGENCE-LEG-GREEN-POST-CHANGE`; `docs/specs/engine-pin-live-status.md` §7.2). **A difference
   is a finding, not a rebaseline.**
5. `npm run ui` — **`[U]`**, this unit's leg.

### 5.3 What a `divergence` green is, and is not (layer discipline, binding on this unit)

**A green divergence leg is STRUCTURAL-SURFACES-ONLY evidence, never IPC-layer evidence.** It buys
the harness's structural comparisons — census `inTree`, census `registered`, normalized `dirtied`
ids, normalized SSR fragment, `data-node-id` set, nodeId vocabulary, counter-in-html, dispatch
results non-empty — and it is **silent** on the app's `provident.op` hop. **The `LIVE-OP-REJECT`
lesson is the proof:** the pin unit's envelope-layer rows were **green** while the assembled app
refused **every** `provident.op` command shape (a HOST-owned, pre-existing defect; **since FIXED +
LIVE-VERIFIED 2026-09-27**, `docs/defects.md` `## FIXED (in this repo)`, `docs/decisions.md`
`LIVE-OP-REJECT-CLOSED`). **Consequence for this unit:** the precondition buys **contact with a
running app**, not a licence to read any `ui` row as IPC evidence — and **no `ui` row of this unit
is an IPC row** (§7 item 6).

**The 8-vs-9 enumeration is left attributed, and this spec names no ninth check** — the harness
script's own summary line is authoritative (verified this pass, §5.4), and `N` is a PIN owned by
`docs/specs/ci-divergence-leg.md` §5.

### 5.4 The `N = 9` arithmetic, verified by reading the harness (this pass)

**Read this pass, `scripts/electron-divergence.mjs` (187 lines):** `function ok(label, cond, extra)`
at `:26` increments `checks` at `:27` and `failures` at `:30-31`; the summary is printed at `:181`
as `` `R13 RESULT: ${checks} checks, ${failures} failures` ``; and `ok(...)` is **called** at
`:146`, `:165`, `:166`, `:167`, `:168`, `:169`, `:170`, `:171`, `:172` and `:174`. **Exactly one
site increments `failures` WITHOUT calling `ok`: the bare `failures += 1` at `:148`** (the
`electron connect/drive failed` catch).

**⇒ `N` is a per-run count, not a call-site count:** **`N = 9` on a green run = `:146` (1) + the
eight comparisons `:165`–`:172` (8) = 9.** The two other `ok(...)` sites are the **off-green
branches**: `:174` is the `else` branch of `if (electronOut)` — it runs **instead of** the eight
comparisons, so it contributes exactly `1` to `checks` — and `:148`'s bare increment adds a failure
**without** a check. **⇒ a bootstrap failure yields `checks = 1`, `failures = 2`, i.e. the
off-green signature `R13 RESULT: 1 checks, 2 failures`** — exactly what the live-run record printed
(`docs/specs/engine-pin-live-status.md` §1.1, read).
**This spec states the arithmetic from its own reading and invents no check name; it consumes only
the leg's result line and exit code** (`PRE-1`).

**⟶ ANCHOR NOTE (2026-09-27 — anchors only; THE ARITHMETIC AND ITS CONCLUSION ARE UNCHANGED).** Every
line citation above is **AS FILED**. The landed shared-helper extraction moved the divergence file's
lines by one (its two spawn sites are now helper calls), so the **re-read anchors are**: `function ok`
`:26` / `checks += 1` `:27` / `failures += 1` `:30` (**unchanged**); the **bare `failures += 1`** at
**`:147`** (as filed `:148`); the **summary line** at **`:180`** (as filed `:181`); the `ok(...)` calls
at **`:145`** and the **eight comparisons `:164`–`:171`** (as filed `:146`, `:165`–`:172`) and the
off-green `else` at **`:173`** (as filed `:174`). **⇒ `N = 9` on a green run and the off-green
signature `R13 RESULT: 1 checks, 2 failures` both hold, verified by the landed tree's own run
(`R13 RESULT: 9 checks, 0 failures`, `MS-7`).** The file is one line shorter than the `187` §8 `N-5`
records (an anchor, not a contract claim).

**⟶ SECOND ANCHOR REMAP, 2026-09-27, BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS — the
"re-read anchors" paragraph directly above does NOT resolve on the landed tree and must not be
trusted.** Re-measured now (`scripts/electron-divergence.mjs`, **192 lines**): a **`−1`-line
correction is wrong in both direction and size** — the landed extraction added an **import line** and
a short comment block, and the `F-1` pass added further comment lines, so the offsets are **+5**, not
`−1`. **The anchors as they actually resolve today:** `function ok` **`:31`** / `checks += 1` **`:32`** /
`failures += 1` **`:35`**; the **bare `failures += 1`** **`:153`** (the `electron connect/drive failed`
catch); the **summary line** **`:186`**; the single `ok(...)` call **`:151`**; the **eight comparisons
`:170`–`:177`**; the **off-green `else`** **`:179`**. **⇒ the arithmetic holds on the landed tree exactly
as this section states it: `1` (`:151`) + `8` (`:170`–`:177`) = **`N = 9`**; the off-green branch
contributes `1` check (`:179`) with the bare increment (`:153`) adding the second failure ⇒
`R13 RESULT: 1 checks, 2 failures`.** **`N = 9` and the `MS-7` result line are unaffected** — this note
corrects **line numbers only**, and the `187`→"one line shorter" sentence in §8 `N-5` and above is
**REPORTED, not rewritten** (it is the base's own as-filed record; the file has since grown to `192`
lines, so the parenthetical's arithmetic is stale in the same way). **A later pass must re-read any
citation it depends on rather than trust either anchor set — which is what this note is an instance of.**

## 6. The DISPLAY requirement (`H-r19`) and the refusal it produces

| # | Clause | Exact statement |
| --- | --- | --- |
| **`DIS-1`** | **The prerequisite** | The leg **requires a display server**: `DISPLAY` (or an **xvfb wrapper the operator supplies**). The app's `BrowserWindow` is created with **no `show:false`/offscreen option** and the leg spawns with `--ozone-platform=x11` + `DISPLAY || ':0'` `(engine recon)`. |
| **`DIS-2`** | **The failure mode** | No `DISPLAY` and no xvfb ⇒ an **ACTIONABLE PREREQUISITE ERROR NAMING THE FIX**, exit **3**. **NEVER a silent skip, NEVER a false green, NEVER a `0`.** |
| **`DIS-3`** | **What is NOT to be done** | **Do NOT add `show:false`** and **do NOT add a CI config** (`H-r19`). A future pass wanting true headlessness must either accept a `show:false` claim it can **measure** or run under xvfb — **either is outside this pass**. |
| **`DIS-4`** | **Why this is declared rather than discovered** | **An undeclared environment prerequisite is the flake class `H-r19` closes** (`RK-7`; `RK-14` names the `ui` leg's display dependency + flake cost). **This repo has NO CI config** (glob `.github/**` → no files, this pass), so "CI leg" means *"a repeatable script a human/agent runs"* — the ruling binds **the spec text and the failure message**, not a runner. |
| **`DIS-5`** | **Isolation is still required** | The DISPLAY prerequisite does **not** relax isolation: a temp `userData` profile, **no network**, and **no writes outside the temp dir** (`H-r19`'s two-part truth: **isolation YES, headlessness NO**). "No network" is a **claim about the leg's own behaviour**: the leg opens no socket and the MCP transport is **stdio** — it is **not** a claim that Chromium makes zero network calls (no such measurement is taken by this unit; recorded honestly rather than asserted). |

*(`G-1` FIX — the DISPLAY observation is now the LEG's OWN — AMENDMENT BLOCK 8, recorded here
because it lands on `DIS-1`/`DIS-2`'s reachability: the leg takes **its own observation of the
operator's `DISPLAY` BEFORE the precondition spawns anything**, and the **divergence child's spawn no
longer injects `DISPLAY || ':0'`**, so the precondition cannot manufacture a display the operator
lacks. **`DIS-1`'s clause text is unchanged**; what changed is that the leg's refusal is decided on
**its own** observation. Measured on this host: `env -u DISPLAY npm run ui` exits **3 before and
after**; the 2-vs-3 regime needs a host with **no X server at all** — reproduced separately
(`ELECTRON_RUN_AS_NODE=1` ⇒ red precondition ⇒ **exit 2** with the `G-1` diagnostic note and **0
roots**). **Named residual, parked**: a display-less no-X-server host still exits **2**, because the
**PINNED** divergence leg manufactures `:0` for its own child — owner the divergence leg's
`PRE-4`/`U-DIVERGENCE-EXT`.)*

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. ~~**Nothing in this unit is `DONE` and no leg has been run by this pass.** This pass files the
   contract. **`npm run ui` does not exist; `scripts/electron-ui.mjs` does not exist; there is no
   shared Electron-spawn helper; the seam does not exist.**~~ *(SUPERSEDED: 2026-09-27 — **the unit HAS
   run: the leg, the helper, the `"ui"` key and the seam all exist and every one of the four claims
   above is now false.** Kept as the filing pass's honest state; the landed state is the AMENDMENT
   BLOCK `MS-1`/`MS-9`.)*
2. ~~**The shared Electron-spawn helper does not exist and MUST BE CREATED** (§2 item 2).~~ *(SUPERSEDED: 2026-09-27 — **the helper EXISTS: `scripts/electron-spawn.mjs` landed**, and the divergence leg now calls it with its arg vector/env/stdio/profiles unchanged (`N = 9` intact). The filing pass's `scripts/` enumeration is kept below as the pre-landing state.)* **Verified
   this pass:** `scripts/` contains exactly `mcp-cli.mjs` and `electron-divergence.mjs` (glob), and
   no helper is referenced anywhere in the tree. **The extraction is `H-r18`'s, and it is the only
   place this unit may touch the divergence leg's spawn.** *(SUPERSEDED: 2026-09-27 — **the helper
   EXISTS at `scripts/electron-spawn.mjs`** and is imported by both legs (`scripts/electron-divergence.mjs:18`,
   read); the `scripts/` listing in this item is the **as-filed** state. **The extraction clause itself
   stands and was honoured:** the divergence leg's vector/`N = 9` line are unchanged, `MS-7`.)*
3. **The leg is a MEASUREMENT leg and its green is ONE measurement.** Five rows are declared; four
   of them are about the leg's own honesty, not about the app.
4. ~~**`R0` is the honest red and it fails today.** There is no seam and no leg, so `R0`(c) and
   `SEAM-2`/`SEAM-3` cannot pass on the current tree.~~ *(SUPERSEDED: 2026-09-27 — **`R0` and the
   `SEAM-*` rows are GREEN on the landed tree** (`27/27` rows, `MS-1`; the live leg's `R0` row is one
   of the `5/5`). The item records the as-filed red, which is what made `R0` the first red (`ADD-5`).)*
5. **The seam is production code changed for a test's benefit — a real cost, recorded and NOT
   waived** (`DISSENT 3`, amendment record §1.14). The ruled alternative was worse (a security
   default flip, or writing the developer's real profile). **The narrower fallback is recorded in
   §4.3 and is NOT adopted.**
6. **What this leg must NOT claim, stated once more because it is the overclaim class:** the leg
   proves **a real DOM exists and is distinguishable** (`R1` — *(amended 2026-09-27: the
   discrimination is carried by the **ELEMENT/RENDERER-API PROVENANCE** marker — the observed
   element's constructor name (`HTMLDivElement` vs `ShimElement`) and the computed style's class name
   (`CSSStyleDeclaration`) — and **NEVER by `typeof window` alone**, which does not discriminate;
   §3.0 `R1`, AMENDMENT BLOCK M-1)*) **and that ONE real measurement was taken** (`R2`). It is
   **not** a rendered-geometry proof, **not** an IPC proof, and **not** a
   proof that any particular **attribute** row passes — attribute presence needs `H-r10`'s
   set-wise extractor, which is `U-DIVERGENCE-EXT`'s and does not exist yet (§3.3 `C-7`, §8).
7. **No production surface other than the one seam is added.** §0 prohibition 5 holds; the
   measurement rides existing tools.
8. **The `ui` leg does NOT retire the shim.** The shim is **DEMOTED TO PRE-FILTER** (amendment
   record §1.13): its authority is limited to what `divergence` + `ui` corroborate; **no unit may
   claim a shim-green is a real-DOM green.** Nothing was retired, archived or moved.
9. **The page-design layer is NOT touched** and, in this tree, **does not exist**
   (`docs/skills/` = `process-guardrails.md` only) — §1's out-of-scope clause.
10. **The Electron-44 assumptions this leg rests on are UNVERIFIED** — `Q7`'s recorded risk, which
    this leg is the first to exercise against a live window (the same flag set already runs the
    divergence leg green, which is contact, not verification).
11. **This spec makes no claim about the battery's migration, no claim about a second measurement,
    and no claim about any other wave-C/D/E/F unit.**
12. **Sources that contradict or under-specify this brief are REPORTED in §8's filing notes and in
    the SpecWriter's report — never silently reconciled.** *(ADDED 2026-09-27, the retry pass: **the
    retry ruling is NOT such a contradiction** — it is a NEW ruled contract row set (§3.7), taken by
    the architect in this spec's own terms (§1 item 3's discipline), not a silent reconciliation.)*

## 8. Filing notes — sources read, and what they leave open

| # | Source (read this pass) | What it gives this spec | What it leaves open / contradicts |
| --- | --- | --- | --- |
| **N-1** | `docs/next-steps.md` `## OPEN` row **C1** | the unit, its five red rows, the one seam, the diff scope, the PRECONDITION-FAILED rule, "Requires a DISPLAY (`H-r19`)" | **the row is still `BLOCKED`**; its `Blocked on` cell names `U-ENGINE-PIN` green, which has since landed — **the row is stale on its blocker, reported rather than edited** (this pass may not edit the tracker) *(SUPERSEDED, 2026-09-27: the landing pass's `WAVE-C CHECKPOINT` **did** correct that cell — row `C1` now reads **NOT `BLOCKED` ANY MORE / LANDED-GREEN-BUT-NOT-DONE** (read); **the tracker is not edited from here**, and this cell's remaining live half is the row's own owed gates, not this spec's filing.)* |
| **N-2** | handoff review **`Amendment record (A-d4…A-d8)` §1.11 / §1.12 / §1.13 / §1.14**, `H-r18`, `H-r19`, `S-d15`, `A-d8`, `RK-14` | the governing contract (§3.0–§3.2, §5, §6, §7) | **§1.12's cross-unit note** fixes the unit ordering (`U-REALDOM-BOOT` → `U-DIVERGENCE-EXT`); **`docs/next-steps.md` row C2's `Blocked on` cell says the same** — **consistent, no contradiction** |
| **N-3** | `docs/decisions.md` `REAL-DOM-UI-GATE-LEG`, `DIVERGENCE-SPAWN-FIX`, `DIVERGENCE-LEG-GREEN-POST-CHANGE`, `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED`, `LIVE-OP-REJECT-CLOSED`, `Q7`/`Q8` rows | the seam ruling, the two-flag spawn decision, the leg baselines, the Electron-44 risk | **`Q7`'s risk is not discharged by this unit** (§7 item 10) |
| **N-4** | `docs/specs/ci-divergence-leg.md` (**read whole**) | the existing pinned leg: §1's isolation/hermeticity clause, §5's `N = 9` pin, and its **`ui`-leg boundary note** (lines 60-73) | **that file ALREADY carries a `ui`-leg boundary note that calls `ci-ui-leg.md` "`OWED` — not filed"**. **This filing makes that clause stale** — the boundary note itself stays correct (the two legs are still separate); only its parenthetical is spent. **Reported, not edited** (this unit's spec file is the only file this pass may create) |
| **N-5** | `scripts/electron-divergence.mjs` (**read whole, 187 lines** — *(ANCHOR 2026-09-27: the `187` is the AS-FILED length; the landed helper extraction makes it one line shorter and shifts the line anchors by one — see §5.4's anchor note. **Nothing in this row's caveat or in the harness's behaviour changed**)*) | the working model for both legs: the demo envelope, the `drive()` probe shape, `norm()`, the `ok()`/`checks`/`failures` arithmetic (§5.4), the landed spawn vector (§2.1) | **its `counterPresent` observable is a substring test** on a demo whose envelope also authors `counter-card`/`counter-value` (`docs/specs/engine-drift.md` §2.3 records the caveat) — **this leg must not copy that pattern for any assertion it makes** |
| **N-6** | `docs/specs/engine-drift-measurements.md` `M-42` / `M-46` (**read**) | the preconditions: **`M-46` = real-DOM attribute presence is `UNMEASURABLE` — "no extractor exists… revisit condition: `H-r10`'s attribute-presence extractor lands (i.e. `U-DIVERGENCE-EXT`)"**; **`M-42` = the divergence leg asserts **no** attribute/removal row and its demo authors no `inert`/`hidden` prop (the negative evidence)** | **`M-46`'s revisit clause says `N = 9` "is re-pinned by that unit"** — which **contradicts** `H-r18`'s *hard constraint* that `N = 9` stays **exactly intact**. **Reported (§8 `N-1`-class; the SpecWriter's report); the contract this filing pins is `H-r18`'s: the new checks land WITHOUT changing `N`.** This unit's own rows are untouched by that record (`docs/next-steps.md`'s wave-C inheritance block, read) |
| **N-7** | `src/main/main.ts` (`:5-59`, `:158`, read), `src/main/security-store.ts` (`:11-32`, read) | the seam's exact position (`ADD-1`), the store's default enabled groups, the `VALID_GROUPS` set | **the override's exact flag spelling and Electron-API route are NOT pinned** (§4.2 `ADD-2`/`ADD-3`) — **this pass may not verify Electron's own `--user-data-dir` semantics by reading, and says so rather than pinning a guess** |
| **N-8** | `package.json` (`:8-20`, `:25-31`, read — **AS FILED**; **now `:8-21`, `:26-32`** after the landed `"ui"` key and its one added line) | the `"ui"` script's shape and placement; ~~the 12 existing scripts~~ *(SUPERSEDED: 2026-09-27 — **ELEVEN** existing scripts: the as-filed count was off by one and its own enumeration (eleven names) is the authority; measured `package.json:8-21`, read)*; the 5-key `devDependencies` set (§9) | ~~**an `"ui"` key would make 13 scripts**~~ *(SUPERSEDED: 2026-09-27 — the landed `"ui"` key makes **TWELVE** (`package.json:8-21`, read this pass; the twelfth is `ui` at `:19`). **The TestWriter deliberately pinned the DELTA, not the absolute number** — *"exactly one additive key, and it is `ui`"* (`tests/ui-leg-contract.test.ts:136-179`, read, with its own reasoning at `:136-145`: encoding the spec's 13 would have left a CORRECT implementation permanently red) — **and that reasoning is recorded in the AMENDMENT BLOCK M-2 so the choice is auditable.**)* — a **count claim a later pass must not read as drift** |

**⟶ `N-9` — A KNOWN GAP, NOT A RECONSTRUCTION (2026-09-27).** The unit's surviving records cite
**`docs/specs/ci-ui-leg.md` §8 `N-9`** as the entry that carried the **blind-greens run's as-filed
summary** (`26` scenarios = `16` PASS / `4` FAIL / `6` NOT-BLIND-RUNNABLE, later **corrected** by the
record's own arithmetic to **`32` = `24` / `4` / `4`** — see `docs/specs/ci-ui-leg-greens.md` §3's
`CORRECTION NOTE`), and the per-unit documentation review's correction list names *"`B7-1`/`B7-2`/`N-9`"*.
**The base's §8 stops at `N-8`, and the `N-9` row's own text was lost with the appended blocks.** It is
**recorded here as a gap rather than invented**: a later pass that needs the row must take its content
from `docs/specs/ci-ui-leg-greens.md` directly (which is that record's own authority), **not from a
reconstruction of this cell**. **This is the ONE content-bearing entry this reconstruction could not
rebuild, and it is stated so no reader mistakes its absence for a deliberate deletion.**

## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**

**`H-r4` obliges an explicit zero-row/typed PBT decision per unit, and `H-r4` requires the spec to
say the repo has NO PBT harness.** Stated exactly as `docs/specs/engine-pin.md` §5.5 and
`docs/specs/engine-drift.md` §5.5 state it: **THIS REPO HAS NO PBT HARNESS.** The `devDependencies`
key set is `@types/node`, `electron`, `esbuild`, `typescript`, `vitest` (`package.json:25-31`,
**read this pass** — five keys; **no `fast-check`, no `hypothesis`, no property runner**). *(SUPERSEDED
anchor only, 2026-09-27: the `devDependencies` block is **`package.json:26-32`** after the landed `"ui"`
line inserted one line above it; the **five-key set is unchanged and still exactly those five names**
(`package.json:26-32`, read this pass). No register clause changes.)* **Every
row this unit can take is a single measurement or a fixed two-boot comparison — so this spec
records a ZERO-ROW register, and here is why that is the honest answer rather than a dodge.**

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **No.** `R2` is **ONE** measurement (that is the contract, not a sampling choice); `R0` is a **fixed pair** of boots; `R1`/`R3`/`R4` are single observations of a marker/word/statement. **A property over "every boot" or "every measurement" would be quantifying over a population this unit is explicitly forbidden to grow** (§1 item 3: one measurement per boot; many scenarios per boot is a new design decision). |
| Could this unit execute a table-driven property **as a property**? | **No, and not because of effort.** There is **no quantified input space** here: the population is **one boot per profile** and **one probe**. Dressing a single measurement as a property would **misreport its evidence class** — exactly what the overclaim rows (§3.3) exist to prevent. |
| Do the layers permit a property run here? | **No for the interesting half.** The leg's own layer is **`[U]`** and its observables are single values read back through MCP; the node suite (`[T]`) cannot boot a window, so no property could run on the layer the rows need. |
| How are the fixed comparisons executed? | **Plain, deterministic, fixed-order comparisons with no randomness, no shrinking and no generated inputs** — the pin spec's §5.5 strategy discipline. **A strategy-id here is a repeat-drive label, not a property id.** |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that replace
a register:

1. **No row of this unit may be reported as "executed" if it was sampled** — the pin spec's honesty
   anchor, carried.
2. **`R2` is ONE measurement by contract, not a sample of many** (§1 item 3). A later pass wanting a
   property over renderer observations needs (a) many scenarios per boot and (b) a PBT harness —
   **neither exists and neither is this unit's** (the amendment record §1.11's declared-runtime-budget
   condition).
3. **No `fast-check` and no generator is added by this unit** — that would be a `devDependencies`
   change, i.e. outside §2's diff scope, and would need its own gate.

**Register change summary: none** — this spec introduces no register row, so there is nothing to
reconcile with `docs/specs/engine-pin.md` §5.5's register or `docs/specs/engine-drift.md` §5.5's
zero-row exemption.

## 3a. Adversarial findings — **OWED** (no pass has run) + the seed set

**Status as filed: `OWED`. THIS PASS TOOK NO MEASUREMENT AND RAN NO ADVERSARIAL REVIEW for
`U-REALDOM-BOOT`.** Per `AGENTS.md` item 6 / RCA-3 the adversarial pass is **MANDATORY per
completed unit**: when it runs, its findings land **here** (host findings fixed here +
regression-tested; package findings → `docs/defects.md` + `docs/HANDOFF.md`). **A DONE row that
cites no adversarial pass is a review finding.**

*(LANDED-STATE NOTE, 2026-09-27: **the unit has LANDED** (`27/27` rows, `MS-1`) **but the adversarial
pass is still `OWED`** — this section's status does NOT change: no adversarial pass has run, and
`docs/next-steps.md`'s `WAVE-C CHECKPOINT` lists it as owed item (1). **One seed's spec half is now
answered** — see the `U-11` note below the table; the other twelve seeds stand unswept.)*
**⟶ THIS STATUS IS SUPERSEDED (2026-09-27, the EIGHTH pass) — STRIKE THE `OWED` READING ABOVE: the
adversarial pass HAS RUN and its record IS this section.** The superseding status is stated, for the
record, exactly as the eighth pass's own block states it: **the pass ran READ-ONLY and swept all
**14** seeds `U-1`…`U-14` with **none obsolete**, returning the verdict **`FIT for its DONE row`** —
and its record is the **`ADVERSARIAL PASS RECORD` (`AP-1`…`AP-5`)** carried in **AMENDMENT BLOCK 8**
below, with its findings table (`F-0`, `G-1`…`G-13`) in the same block. **Status supersession only:
no normative clause of this file is amended by it, no seed is retired, and no `NBR-*` row is
re-dispositioned.** The as-filed `OWED` sentences above are kept because this file never rewrites its
own status text — the marker is the strike, and the record is the block.

| Seed | What to probe (edge cases / unauthorized access / malformed inputs, in this unit's terms) | Why it is a seed |
| --- | --- | --- |
| **U-1** | **The seam as an attack surface**: can the user-data override be used to make the app read a *different* security store — i.e. is it a **capability grant** to anyone who can pass the flag? (It only relocates a file the operator already owns; prove it cannot widen the default groups.) | §4.3's rejected alternative is exactly the widening |
| **U-2** | **Default-profile contamination**: does any boot write `provident-security.json` / `provident-modules.json` / `GPUCache` into the developer's real `userData`? | `R0`(c) is the honest red; a silent write is the failure the seam exists to prevent |
| **U-3** | **`code`-group leakage**: is the `code` group enabled in the **scratch** store only? Confirm the real profile's store is unread and unwritten. | §3.2's eval-gate bound; a breach is a **security** finding |
| **U-4** | **Overclaim smuggling**: does the leg's own output contain a sentence (or a call) that reads as an app-level or IPC-level claim? | §3.3 `C-1`…`C-7`; `R4`'s static row |
| **U-5** | **Fabricated zero**: with a deliberately broken window (no paint / no probe node), does the leg record `0` or a blank anywhere instead of failing loudly? | `R2`'s stop condition |
| **U-6** | **Shim-word drift**: does the shim leg's recorded status ever become `divergent`/`pass`/`0`? | §3.4's pinned word set |
| **U-7** | **Precondition bypass**: with a **red** divergence leg (mutate a comparison to force it), does `ui` still report `PRECONDITION-FAILED` and exit **2** — or does it measure anyway? | `PRE-1`/`PRE-3`; the authority order |
| **U-8** | **Same-tree laundering**: change `dist/main/main.cjs` between the divergence run and the boot — does `PRE-2` catch it? | `PRE-2`'s digest clause |
| **U-9** | **Display refusal**: unset `DISPLAY` — is the message actionable, and is the exit code 3 (never a skip, never a green)? | `DIS-2` |
| **U-10** | **Profile cleanup**: are both scratch profiles removed on every exit path (success, failure, SIGINT), and is a leftover recorded as non-fatal (the divergence leg's own precedent, `:114-123`, read)? | §2.1 item 2's cleanup hook |
| **U-11** | **Marker spoofability**: could the `R1` typed marker be produced by the shim leg too (making `R1` vacuous)? | `R1`'s fail state is a **re-scope finding** |
| **U-12** | **Helper extraction regression**: after the shared helper lands, is the divergence leg's argument vector/env/stdio byte-identical, and does `npm run divergence` still print **`R13 RESULT: 9 checks, 0 failures`**? | §2.1 item 1; `PRE-4`; `docs/specs/engine-drift.md` §3.7 `F-8` |
| **U-13** | **`counterPresent`-class substring copying**: does the leg assert anything by substring on rendered HTML where a set/typed comparison is required? | `N-5`'s caveat; `H-r10`'s *"never a substring diff"* rule |
| **U-14** | *(RECONSTRUCTED ENTRY — the seed's ID and its participation in the sweep are RECORDED (`AP-5`'s 14-seed table, `U-1`…`U-14`, none obsolete), but its as-written prose was lost with the appended blocks and is NOT recoverable from the surviving records. Its subject is recorded by the sweep as the **retry's own attack surface** — the class the pass's verdict explicitly cleared ("**no retry that masks a failure**"), i.e. whether a retry can convert a failure the contract requires to be terminal into a green. **Stated as a reconstruction rather than presented as the original wording.**)* | the retry ruling (`RT-1`…`RT-9`) added a new failure-tolerance mechanism to the leg **after** the seed set was filed; a retry is precisely where a masked failure would live |

**`U-11`'s spec half is ANSWERED by the 2026-09-27 amendment (STATUS, not a new seed disposition):** the
seed predicted exactly the defect that was found — *"could the `R1` typed marker be produced by the shim
leg too (making `R1` vacuous)?"* — and the answer to the **as-filed** marker was **yes** (the shim defines
its own `window`/`document` surface; `typeof window` on the real boot is `'object'`). **The re-pinned §3.0
`R1` moves the discrimination onto the element/renderer-API provenance (`HTMLDivElement` /
`CSSStyleDeclaration` vs `ShimElement` + `measure=UNSUPPORTED`), which the shim cannot produce**, so the
row is no longer vacuous **as re-pinned**. **The seed is NOT retired:** its remaining runtime half — *does
a deliberately spoofed/mis-wired shim attempt ever make the re-pinned pair read as real?* — is still for
the owed adversarial pass, and `R1`'s fail state stays a **re-scope finding**.
*(Swept 2026-09-27, the eighth pass: the seed's **runtime half HOLDS** — the pass's `AP-5` table records
it swept with the discriminator being the **element/API provenance**, and the residual that remains is
**`G-9`** (probe observations not pinned to the loaded envelope — a handler-shadowing mechanism could in
principle answer the probe), which is **parked with a revisit condition** rather than closed.)*

## 3b. The adversarial pass's findings — disposition as THIS contract will reflect them

**Status: `OWED` (the same pass as §3a).** The table below is the **owed disposition table — the
shape the findings must land in**.

*(SUPERSEDED 2026-09-27, the EIGHTH pass: **the table below is superseded by the LANDED findings
table in AMENDMENT BLOCK 8** (`F-0`, `G-1`…`G-13`, each with its class and its disposition). The rows
that were the inherited-not-live list are reconciled there too, with their post-fix statuses
(`M-46` **NOT moved off `UNMEASURABLE`**, `G-5`/`G-10`/`G-11`/`G-12` tracker-only, `G-4` routed to the
TestWriter, `G-13`'s two non-`scripts/**` halves reported — see that block's `A9`-class successors and
`docs/pending.md` §F). **No normative clause is amended by this supersession.**)*

| # | Finding (this unit's — to be filled) | Class | Disposition in this contract |
| --- | --- | --- | --- |
| **G-1..G-n** | *(to be filled by the adversarial pass; each entry states what was probed, the observation, and the classification)* | host / package / contract / instrument / environment | *(per finding: fixed here + regression row, or routed — `docs/defects.md` + `docs/HANDOFF.md` only for a **package** finding)* |

**The rows this contract inherits that are NOT live findings (listed so no later pass reads them as
open):** `M-46` (`UNMEASURABLE`; **this unit does not close it** — its revisit condition is
`H-r10`, `U-DIVERGENCE-EXT`) · `M-42` (the divergence leg's negative evidence, `CONSISTENT`) ·
`DISSENT 3` (the seam's cost, **ruled for**, not a finding) · `RK-14` (this leg's display/flake
cost, mitigated by `DIS-2`'s actionable refusal + `PRE-1`'s PRECONDITION-FAILED report — *(STATUS
UPGRADED 2026-09-27: **`RK-14`'s flake class is CONFIRMED REAL in this environment** (`/dev/shm`
writes forbidden ⇒ intermittent bootstrap `SIGTRAP`, ≈1-in-3 back-to-back; the divergence leg is
flaky identically). **The mitigation above stands and is what keeps the flake honest; whether the leg
should RETRY the boot is a NEW decision this spec does not take** — AMENDMENT BLOCK M-4.)*).

## 8a. Supersession index (every row this unit discharges, inherits, or must not touch)

**Reading the index:** **DISCHARGED** = the row's obligation is met by this unit. **INHERITED-ONLY**
= this unit consumes the row's landed state. **NOT THIS UNIT** = the row belongs elsewhere —
**listed so a later pass does not route it here.**

| Row / item | Section | Status for `U-REALDOM-BOOT` | Where it lands here |
| --- | --- | --- | --- |
| `docs/next-steps.md` `## OPEN` row **C1** | the `## OPEN` table | **DISCHARGED as the spec's filing obligation** — the row's owed path (`docs/specs/ci-ui-leg.md`) now exists; the row itself stays `BLOCKED` until its legs run | this file |
| handoff review §8's owed-spec entry `ci-ui-leg.md` | §8 | **DISCHARGED by this filing** | this file |
| `H-r4`'s owed unit specs (the `ci-ui-leg.md` name in its list) | `H-r4` row | **DISCHARGED for this path** (the other 18 remain owed) | this file |
| `A-d8` / `S-d15` (the third gate leg) | amendment record §1 / `S-d15` | **INHERITED-ONLY** — the ruling is the charter; this unit does not re-open it | §1, §3 |
| `H-r18` (placement / ordering / ownership / the N=9 hard constraint) | `H-r18` row | **DISCHARGED** — §2's diff scope, §5's authority order, §5.4's arithmetic | §2, §5 |
| `H-r19` (the two-part hermeticity truth) | `H-r19` row | **DISCHARGED** — §6's `DIS-1`…`DIS-5` | §6 |
| `H-r10` (the scenario-envelope channel + attribute extractor) | `H-r10` row | **NOT THIS UNIT** (`U-DIVERGENCE-EXT`) — but this leg is its **strict precondition** | §7 item 6, §8 `N-6` |
| `M-46` (real-DOM attribute presence) | `engine-drift-measurements.md` | **NOT THIS UNIT** — the extractor is `H-r10`'s; **this unit does not convert `M-46` to `CONSISTENT`** | §7 item 6 |
| `M-42` (the divergence leg's negative evidence) | `engine-drift-measurements.md` | **INHERITED-ONLY** | §5.3, §8 `N-6` |
| `DIVERGENCE-SPAWN-FIX` | `docs/decisions.md` | **INHERITED-ONLY** — the two flags + the fresh scratch profile; this unit must not drop either | §2.1 item 3 |
| `DIVERGENCE-LEG-GREEN-POST-CHANGE` | `docs/decisions.md` | **INHERITED-ONLY** (the quoted baseline) | §5.2 item 4 |
| `LIVE-OP-REJECT` / `LIVE-OP-REJECT-CLOSED` | `docs/defects.md` (FIXED); `docs/decisions.md` | **NOT THIS UNIT** — **but its layer lesson binds** (§5.3) | Layer declaration; §5.3 |
| `REAL-DOM-UI-GATE-LEG` (A-d8's decision row) | `docs/decisions.md` | **INHERITED-ONLY** — the charter, the seam ruling, the red rows, the `UNSUPPORTED` word | §3, §4 |
| `Q7`'s Electron-44 risk | `docs/next-steps.md` (the answer row) | **PARTLY** — this leg is the first to exercise the stack in a live window; **the risk is not thereby discharged** | §7 item 10 |
| `Q8`(b) (the app-level `ui`-leg claim boundary; the demo control ships) | `docs/next-steps.md` | **DISCHARGED for the claim boundary** — §3.3's `C-1`…`C-7` + `R4`; **the demo appearance control is `U-THEME-CONTROL`'s, not this unit's** | §3.3 |
| the battery's migration to the real renderer | amendment record §1.11 | **NOT THIS UNIT** (out of scope; four conditions) | §1 |
| `SCH-10`'s real-DOM containment proof / any geometry row | amendment record §1.5 / §5 | **NOT THIS UNIT as a contract** — the `ui` leg **may** carry a geometry row **only** with `A-d4`'s mandatory unprovability bound attached; **this unit carries none** | §3.3 `C-7` |
| `ci-divergence-leg.md`'s `ui`-leg boundary note (lines 60-73) | that file §1 | **INHERITED-ONLY** (the boundary holds); **its *"`OWED` — not filed"* parenthetical is SPENT by this filing** — reported, not edited | §8 `N-4` |
| the `N = 9` pin | `ci-divergence-leg.md` §5; `docs/decisions.md` | **NOT THIS UNIT** — this unit may not edit that harness; it consumes only the result line + exit code | §5.1 `PRE-4`, §5.4 |

**APPENDED BY THE 2026-09-27 AMENDMENT (the landing pass's spec correction — this block's rows, and
nothing else, are what the amendment changed):**

| Row / clause (as appended) | Where it lives | Status | Lands at |
| --- | --- | --- | --- |
| §3.0 `R1`'s pinned marker — *"the real boot reports a **real `window`/`document` provenance**"* | §3.0, this file (**SUPERSEDED-IN-PLACE**, struck at its own site) | **AMENDED 2026-09-27 (FIX 1, contract change)** — re-pinned on the **element/renderer-API provenance** (element constructor name + computed-style class name), `typeof window` demoted to a secondary observation; the *may-extend-not-replace* permission kept | §3.0 `R1` + AMENDMENT BLOCK **M-1** |
| §3a seed **`U-11`** (marker spoofability) | §3a, this file | **PARTLY ANSWERED (spec half)** — the as-filed marker WAS vacuous (the shim defines its own `window`/`document`); the re-pin removes the vacuity; **the runtime half stays for the owed adversarial pass** | §3.0 `R1`, the `U-11` note under §3a's seed table |
| §2 item 3's *"which today has **12 keys**"* | §2, this file (**SUPERSEDED-IN-PLACE**) | **AMENDED 2026-09-27 (FIX 2, contract change)** — measured **ELEVEN** pre-unit keys / **TWELVE** after the landed `"ui"`; the enumeration is restated as **exhaustive** so list and count agree | §2 item 3 + AMENDMENT BLOCK **M-2** |
| §8 `N-8`'s *"the 12 existing scripts"* + *"an `"ui"` key would make 13 scripts"* | §8, this file (**SUPERSEDED-IN-PLACE**) | **AMENDED 2026-09-27 (FIX 2)** — **ELEVEN** existing / **TWELVE** landed; the `package.json` anchors shift `:8-20`→`:8-21` and `:25-31`→`:26-32` | §8 `N-8` + AMENDMENT BLOCK **M-2** |
| §5.5's `package.json:25-31` `devDependencies` anchor | §5.5, this file (**ANCHOR ONLY**) | **ANCHOR SUPERSEDED 2026-09-27** — now `:26-32`; **the five-key set and the zero-row register are unchanged** | §5.5 |
| §7 items 1/2/4's *"nothing is `DONE` / the leg+helper+seam do not exist / `R0` fails today"* | §7, this file (**SUPERSEDED-IN-PLACE**, struck at their own sites) | **STATUS SUPERSEDED 2026-09-27** — the unit HAS run; the leg, the helper (`scripts/electron-spawn.mjs`), the `"ui"` key and the seam exist, and `R0` + the `SEAM-*` rows are green. **No normative clause of §7 changes** | §7 items 1/2/4 + AMENDMENT BLOCK `MS-1`/`MS-9` |
| §2's `State` column (*"does not exist"* / *"key absent"* / *"not present"* / *"absent"*) | §2, this file (**KEPT AS FILED**) | **STATUS NOTE 2026-09-27** — the column is the AS-FILED pre-execution diff scope and is kept as filed; the landed state is recorded once, in the note under §2 | §2's landed-state note + `MS-9` |
| §3.0's *"`R0` is the honest red: it FAILS TODAY"* | §3.0, this file (**SUPERSEDED-IN-PLACE**) | **STATUS SUPERSEDED 2026-09-27** — the five rows are landed and green (`5/5`) | §3.0's preamble note + `MS-2` |
| `RK-14` (the leg's display/flake cost — *"mitigated by `DIS-2` + `PRE-1`"*) | §3b's inherited-rows note; `docs/decisions.md` `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED` | **STATUS UPGRADED 2026-09-27 — CONFIRMED REAL in this environment** (`/dev/shm` writes forbidden ⇒ intermittent bootstrap `SIGTRAP`, ≈1-in-3; the divergence leg is flaky identically). **The mitigation stands; the RETRY question is a NEW decision a future pass/architect must take** | AMENDMENT BLOCK **M-4** |
| `docs/next-steps.md` `## OPEN` row **C1**'s status (row 1 of this index) | `docs/next-steps.md` (tracker) | **TRACKER-OWNED — NOT EDITED FROM HERE.** The cell has since been corrected by the landing pass's checkpoint (*"`U-REALDOM-BOOT` … LANDED-GREEN-BUT-NOT-DONE"*, read); **the spec-side filing obligation of that row remains DISCHARGED by this file.** *(The same tracker pass's checkpoint cell 4 carries the spec's old **"13th key"** figure — see the SpecWriter's report; a tracker cell, not edited here.)* | §8 `N-8`, AMENDMENT BLOCK M-2 |
| §8 `N-1`'s *"the row is still `BLOCKED`"* note | §8, this file (**MARKED IN PLACE**) | **STATUS SUPERSEDED-AT-ITS-SITE 2026-09-27** — the `N-1` cell now carries its dated marker: the tracker's `C1` cell was corrected to **NOT `BLOCKED` ANY MORE** by the landing pass's checkpoint (read); **the tracker itself is not edited from here** | §8 `N-1` (marked in place), this row |

---

<!-- ===================================================================== -->
<!-- END OF THE BASE RECOVERED FROM VERSION CONTROL (676 lines, unedited). -->
<!-- EVERYTHING BELOW WAS REBUILT BY THE 2026-09-27 RECONSTRUCTION PASS:  -->
<!-- AMENDMENT BLOCKS 2-8 AND THEIR §8a INDEX APPENDS, IN BLOCK ORDER.     -->
<!-- ===================================================================== -->

## AMENDMENT BLOCK 2 (`U-REALDOM-BOOT`, 2026-09-27, THIRD pass) — **the RETRY RULING and the retry clause set**

> **WHAT THIS BLOCK IS.** It **answers** the question AMENDMENT BLOCK 1's `M-4` note explicitly left
> open (*"whether the leg should RETRY a bootstrap that dies `SIGTRAP`"*) and it lands the answer as a
> **first-class contract clause set, §3.7 `RT-1`…`RT-9`, plus its PRECEDENCE CLAUSE.** **This is a
> NORMATIVE AMENDMENT** — the only amendment in this file that adds a whole clause set beside the red
> rows, and it is added in this file's own convention (a numbered section, every row with its own pass
> condition and fail state, the supersession index appended). **It does NOT amend `R0`–`R4`, the
> `SEAM-*` rows, §4's seam, §5's precondition, §6's DISPLAY clauses or the exit-code vocabulary** —
> it adds a policy that runs *inside* the boot steps those clauses already declare. **Reconstruction
> note: the block's as-written prose was lost; its content, ids, citations and measured values are
> rebuilt from the surviving records (see the RECONSTRUCTION NOTE at the head of this file), and the
> clause text below is the reconstruction's wording of pinned content, not a quote.**

**Why the ruling was taken (STATUS — the measured case, all of it already in `M-4` and its
`docs/decisions.md` row).** The sandbox forbids `/dev/shm` writes; an Electron renderer
**intermittently dies `SIGTRAP` at bootstrap**, measured **≈1-in-3 for back-to-back boots**; the
divergence leg is flaky in the identical way. **The pre-retry contract had exactly one honest answer
to a flake — `PRECONDITION-FAILED`, exit `2`, no measurement — and nothing for a flake *inside the
boot itself*** (`exit 1`). The architect ruled the **bounded retry**: *"retry the failed bootstrap,
do not retry anything else, record every attempt, and never let a retry buy a green it did not
earn."*

| # | Row | Pinned content (what the ruling decided) |
| --- | --- | --- |
| **`A2-1`** | **The retryable set is SIGNATURE-BASED — two signatures, never a text match.** **(i) an OBSERVED CHILD TERMINATION with an unresolved handshake** (the `(code, signal)` pair recorded **verbatim**), and **(ii) the TIMEOUT class** (the **absence of an observed termination** + the handshake-not-completed fact, verbatim — the **PRECEDENCE CLAUSE**, added later and recorded below). A `stderr`-substring match, a *"the boot threw"*, and a *"the run ended non-zero"* predicate are **FORBIDDEN**; the retryable set **may never degenerate into a generic "anything failed" predicate**. | **RULED** — and `A2-1` is the clause `RT-1` and the PRECEDENCE CLAUSE implement |
| **`A2-2`** | **The bounds and the recording.** **Max `4` attempts per boot** (operator-lowerable, never raisable), **a fresh scratch profile per attempt**, the failed child terminated and its transport closed before the next attempt, **no two Electron processes for one boot at once**, the budget **per boot**, **fixed backoff `250`/`500`/`1000 ms` with no jitter**, per-attempt handshake timeout **`30 000 ms`**, a **derived per-boot wall-clock ceiling**, **every attempt recorded with its verbatim signature**, a retried green **LABELLED**, **exhaustion exits `1`** with every signature in attempt order and a no-measurement statement, and the whole policy **LEG-LOCAL** (the helper and the divergence leg carry none; **`N = 9` stays exactly intact**). | **RULED** — and `A2-2` is the clause set `RT-3`…`RT-9` implements, row for row |
| **`A2-3`** | **The ceiling's arithmetic, stated as the ruling's own derivation.** **`4 × 30 000 ms + 250 + 500 + 1000 ms = 121 750 ms` per boot.** **The derivation IS the pin**; the value is not a free literal, and *"a ceiling that admits more than 4 attempts"* (i.e. one that fits a 5th `30 000 ms` attempt) is a violation. **The rounding to `"122 000 ms"` was a copy, not a second decision** — see the block below, where the label is **SUPERSEDED by its own derivation** (measured: the leg enforces and prints **`121750 ms`**). | **RULED (derivation)** — the printed label was later struck in place; the **derivation governs** |

**The environment blocker recorded WITH the ruling, stated so it cannot be read as a contract
state:** the retry landed into a tree on which **the live legs could not run** — recorded at the time
as an *environment* regression and **later RESOLVED AND MISATTRIBUTED** (`docs/decisions.md`
`ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER`: the cause was a **corrupted npm shim inside this
repo's `node_modules`** — `node_modules/electron/cli.js`, a shell script that re-execs itself — since
repaired; a post-repair boot probe exits `0` in `176 ms` printing `BOOT-OK 44.4.5`). **The clause set
did not depend on that outcome and is not weakened by it:** the retry's runtime half was later driven
live (AMENDMENT BLOCK 5's post-fix boundary, the live battery), and the ruling's bounds were checked
by the live drives recorded at `docs/specs/ci-ui-leg-live-status.md` §5.

## 3.7 The RETRY POLICY (`RT-1`…`RT-9`) — the retryable set, its bounds, its records, its exits

**Layer labels carried:** the clause set is **`[U]` at runtime** (it fires only inside a real boot)
and **`[T]` where it is checkable node-side** (eligibility, the classification, the bound, the
backoff table, the records, the exhaustion branch, leg-locality). **This spec's own two-kinds-of-row
note, stated so no TestWriter writes an impossible test: the clause set's *decision* halves are
`[T]`-checkable (the predicate, the classification, the bound, the budget, the printer), while the
`[U]`-only halves — a real boot dying `SIGTRAP`, a genuinely broken boot, a genuinely red
divergence precondition — are NOT reachable in `[T]` because **no window boots there** (§3.0's `R0`
caveat). Every `[U]`-only half must be marked in its row and falsified out of tree, never asserted as
a node green.**

| Row | Statement (what is asserted) | Layer | Pass condition | Fail state (required handling) |
| --- | --- | --- | --- | --- |
| **`RT-1`** | **ELIGIBILITY — the observed-death signature.** A boot IS RETRYABLE **iff** its child was **OBSERVED to terminate** — a **non-zero exit code** or a **terminating signal**, recorded as the raw **`(code, signal)`** pair **verbatim** — **AND** its handshake never resolved, **and nothing else**. A `stderr`-substring-only failure, a *"the boot threw"*, and a *"the run ended non-zero"* predicate are **FORBIDDEN**. The predicate is handed **the pair and the handshake state** and **may read neither the stderr tail, nor the transport error message, nor the outcome**; it is decided **once** per failed attempt and its verdict is carried on that attempt's record. *(**SUPERSEDED IN PART, 2026-09-27, third pass — the PRECEDENCE CLAUSE below: `RT-1`'s conjunction is the **OBSERVED-DEATH** signature and **NOT** the whole eligibility predicate.** The conjunction as written made a timeout-class failure non-retryable, because a leg-timer timeout can never satisfy *"the child was observed to terminate"*. **What stands:** the conjunction, the verbatim-pair rule, the forbidden predicates, the single-decision rule and the anti-blanket rule. **What is superseded:** *"iff"* read as *"only if"* over the whole retryable set.)* | **`[T]`** + **`[U]`** | a boot whose child was observed to die (a non-zero code, or a signal — the class is **not** `SIGTRAP`-only) with an unresolved handshake **IS retried**; every forbidden predicate **is not**; a clean exit (code `0`, no signal) before the handshake is **not** a crash and **is not** retried; a death **after** the handshake resolved is **not** a bootstrap death (`RT-2` item 4). The rule is a **BICONDITIONAL**: a retryable class that is not retried is **also** a finding | a retry fired on any forbidden predicate ⇒ **the retried green is VOID** (the overclaim class §3.3 exists to prevent) — a review finding; a retryable signature that is not retried ⇒ a finding in the other direction |
| **`RT-2`** | **THE NON-RETRYABLE CLASSES — they do not retry and consume no attempt.** **(1)** a **COMPLETED** boot whose measurement/row is wrong; **(2)** a genuine **divergence-precondition red — including the divergence leg's own bootstrap signature `R13 RESULT: 1 checks, 2 failures`**; **(3)** a **DISPLAY absence**; **(4)** a failure **after** the handshake completed (a later signal death, a non-zero exit, a tool error, a security-group refusal, a probe-handler exception — all of them *"outside the boot window"*); **(5)** a **programming error in the leg**, which includes a **malformed retry configuration**; **(6)** a **row-assertion failure**. **None of these is ever a reason to try again, and none spends a second attempt or pays a backoff wait.** | **`[T]`** + **`[U]`** | each class is reported **as itself, naming the clause**, and the boot **fails** (it is never converted into a retry): class 1/6 ⇒ `exit 1` after the rows; class 2 ⇒ `exit 2` `PRECONDITION-FAILED` with **no measurement** (decided **before** the retry boundary); class 3 ⇒ `exit 3` (decided **before** any boot); class 4 ⇒ `exit 1` from the leg-wide failure path, **outside** the retry loop; class 5 ⇒ `exit 1` **before** the precondition and before any boot, with a named message and **no attempt log** | a retry fired on any `RT-2` class ⇒ **a review finding**; and a failure **misreported as another class** (a post-handshake abort riding the "non-retryable" path indistinguishably, with no `RT-7` marker) is **also** a finding — the marker is what separates a class abort from an exhaustion |
| **`RT-3`** | **THE BOUND, THE PROFILES, THE TEARDOWN AND THE BUDGET.** **(i)** **max `4` attempts per boot** (one initial + up to three retries), pinned as a **single named constant** whose value is `4`, and the loop is **retry-AFTER-failure** — **no speculative and no parallel attempts**; **(ii)** **a FRESH scratch profile PER ATTEMPT** — a retried attempt **never** reuses a profile a failed attempt partially wrote, and the accepted attempt's profile is **not** one of the failed attempts'; **(iii)** the failed attempt's **child is terminated and its transport closed BEFORE the attempt returns** — **never two Electron processes for one boot at once**, and the teardown is awaited before another attempt is spent; **(iv)** the budget is **PER BOOT** — boot A and boot B each carry their own `4` attempts and their own numbering; **(v)** the **precondition and the DISPLAY step sit OUTSIDE the retry boundary** — an attempt re-enters neither, and **`PRE-2`'s digest pair is never re-taken**. | **`[T]`** + **`[U]`** | at most `4` attempts, numbered `1..4`, on each boot; `4 + 4` across the two boots; **one fresh profile per attempt** (8 distinct profiles for two exhausted boots); kill + close observed **inside** the attempt; the precondition's `exit 2` and the DISPLAY refusal's `exit 3` both sit **before** the first boot; nothing inside the loop re-checks a digest or re-enters the precondition | any `5th` attempt, a reused profile, a surviving child, two live children for one boot, a shared budget between boots, or an attempt that re-enters the precondition ⇒ **a review finding** |
| **`RT-4`** | **THE BUDGET'S FOUR ITEMS.** **(1) BACKOFF** — the **FIXED table `250` / `500` / `1000 ms`** for the wait before attempts 2/3/4, **no randomness and no jitter** (an identical state produces an identical wait sequence), each wait **recorded with its attempt number**; **the sequence IS the contract — a fixed table, not an exponential expression**. **(2) THE ATTEMPT COUNT** — default **`4`**, admissible range **`1`–`4`**, overridable by an environment variable (**`PROVIDENT_UI_BOOT_ATTEMPTS`**; **the name is the Implementer's to fix and must be recorded in the leg and in `docs/decisions.md`**); **the operator may LOWER it and may NEVER RAISE it** (`1` means *"no retry"*); **a malformed value is a PROGRAMMING ERROR ⇒ exit `1`, never a silent clamp and never a fallback to the default**. **(3) THE PER-ATTEMPT HANDSHAKE TIMEOUT** — default **`30 000 ms`** (the host's own readiness bound), overridable (**`PROVIDENT_UI_BOOT_TIMEOUT_MS`**, range **≥ `1 ms`**) for a deterministic red row; **an attempt that has not completed the handshake within it is a FAILED BOOTSTRAP ATTEMPT and consumes an attempt** (this closes the *"the leg hangs forever and the retry never fires"* hole), with `RT-3`'s bound and `RT-1`'s grace capped by it (`min(2 000 ms, the timeout)`). **(4) THE WALL-CLOCK CEILING — `121 750 ms` per BOOT** (**derived, not a new constant:** `4 attempts × 30 000 ms + 250 + 500 + 1000 ms backoff = 121 750 ms` ⇒ the ceiling is the retry budget's own upper bound); **exceeding it mid-retry is EXHAUSTION**, and the leg **names the ceiling it hit with the observed budget**. *(The as-filed **`122 000 ms`** label is **SUPERSEDED by its own derivation**: measured, the leg enforces and prints **`121750 ms`** — `per-boot ceiling 121750 ms (RT-3/RT-4)`.)* | **`[T]`** + **`[U]`** | the waited sequence is exactly `[250, 500, 1000]` and a lowered count spends fewer waits (the table is indexed by the attempt); a non-integer, a value outside `1..4`, and a value above the pinned maximum **all** exit `1` without a boot; a timed-out attempt is recorded `bootstrap-failed` with its bound named (`handshake did not complete within <bound> ms (RT-4 item 3)`) and **is retried**; the ceiling is **derived** (not a free literal) and is **less than** `5 × 30 000 ms`; a clock past the ceiling stops the loop at the attempt it interrupts and the leg prints `RT-4 item 4: the per-boot wall-clock ceiling was EXCEEDED (<observed> ms > 121750 ms)` + `EXHAUSTION (RT-7)` | a jittered/randomised/exponential wait, a silently clamped knob, a timeout that spends no attempt, a ceiling that admits a 5th attempt, or a ceiling exceeded **silently** ⇒ **a review finding** |
| **`RT-5`** | **RECORDING — every attempt, with its own verbatim signature.** **Every attempt (including the accepted one) is recorded**, and each record carries **its attempt number, which boot (A/B), its scratch profile path, its outcome**, the raw **`(code, signal)`** pair and/or the transport error, **plus the tail of that attempt's child stderr**. **Every failed attempt's signature appears VERBATIM in the leg's own output.** **A count with no signatures is NOT a record**, no attempt's signature may be summarised away, and the two retryable signatures are **not interchangeable evidence** (a timeout may never be re-reported as a child death, or vice versa). | **`[T]`** + **`[U]`** | one record per attempt (a spent `4`-attempt budget hands back four); each printed line carries `attempt <k>/<max>`, `boot A|B`, `profile=…`, `outcome=…`; a failed attempt prints its pair **verbatim** (`child exited (code null, signal SIGTRAP)`) and/or its timeout signature; the stderr **TAIL** is buffered per attempt and printed beside its signature (a head-of-stream buffer is not *"the tail"*) | a summary count with no signatures, a dropped accepted-attempt record, a re-ordered/truncated record list, a collapsed signature, or a stderr **head** presented as the tail ⇒ **a review finding** |
| **`RT-6`** | **THE LABELLED RETRIED GREEN.** **(a)** a green reached on attempt `k > 1` is **LABELLED** — `RT-6 RETRY GREEN (boot A\|B): attempt=<k> of <max> (retries=<k-1>, <n> bootstrap failure(s) recorded)` — printed **for BOTH boots when either retried**, and **a non-retried boot carries the same shape** (`attempt=1 …, retries=0`) so **no green can read as unlabelled**; the label is its own named line, because a later reader must be able to SEE the flake. **(b) THE RETRY BUYS A BOOT, NOT A RELAXATION** — a retried green must still satisfy **every `R0`–`R4` row** and `RT-5`; no row is skipped, no assertion moves into a retry-conditional branch, and there is **one single green exit**. **(c) ONE MEASUREMENT** — **the ONE-measurement rule stands and retries may not multiply measurements: a rejected attempt's measurement is neither counted nor retained** (the measurement site is reached only after both boots are accepted). | **`[T]`** + **`[U]`** | `attempt=<k>` and `retries=<k-1>` both present and driven by real bookkeeping (a dead/constant condition is not a label); exactly one `exit 0` path; the row assertions sit on the single post-boot path; the measurement tally is **real** (a second increment **throws**, naming `RT-6(c)` and the ONE-measurement rule) | an unlabelled retry, a row inside a retry branch, a second `exit 0`, a retry that measures, or a retained value from a rejected attempt ⇒ **a review finding** |
| **`RT-7`** | **EXHAUSTION.** **(i)** exhaustion **exits `1`** — **NOT `0`, NOT `2`, NOT `3`** — and prints `RT-7 EXHAUSTED: <n> of <n> attempts failed (<k> retries)` **per boot** (the budget is **interpolated**, not a literal that can drift) with **one marker per boot**; **(ii)** **EVERY attempt's signature is reported, in ATTEMPT ORDER STARTING AT ATTEMPT 1** — nothing reorders, sorts, reverses, truncates or slices the record list; **(iii)** the run **states that NO MEASUREMENT WAS TAKEN**, **after** the signatures, and where the **ceiling** was the cause it names **the ceiling that was hit** with the observed budget. **Exhaustion is NEVER a skip, NEVER a warning and NEVER a green** — and it is **not** a precondition failure (that is `exit 2`). | **`[T]`** + **`[U]`** | an exhausted boot reports `ok: false`, records **no accepted attempt**, never reaches the green headline, prints the marker per boot with the configured budget interpolated, lists every signature in order, and states `NO MEASUREMENT WAS TAKEN`; the measurement site is **unreachable** from an exhausted run | `exit 0`/`2`/`3` on exhaustion, a marker with a literal budget, a reordered or partial record list, a missing no-measurement statement, or a reachable measurement ⇒ **a review finding** |
| **`RT-8`** | **THE PRECONDITION'S INTERACTION — the retry may not weaken `PRE-1`/`PRE-3`.** **(1)** the divergence leg is invoked **exactly ONCE** and its result line + exit code are **consumed verbatim** (the harness's own summary line is the authority — it is **parsed, not re-derived**); **(2)** a **red precondition is never retried, never worked around** — it exits **`2`** with **no measurement**, decided **before** the retry boundary; **(3)** a divergence red is **never a retry case**, and a `ui` green is **never stronger than a divergence red**; **(4)** `PRE-2`'s digest pair is taken **exactly twice, around the precondition run**, and a retry **never** re-takes it; **(5)** a **diagnostic note** distinguishing *"divergence red"* from *"divergence red **with the bootstrap signature**"* (the off-green `R13 RESULT: 1 checks, 2 failures`) is **ALLOWED and changes NOTHING** — it moves no exit code, retries nothing and measures nothing. | **`[T]`** + **`[U]`** | one declaration + exactly one invocation site of the precondition; the `R13` line and the exit code consumed as produced; the red path prints *"no measurement taken"* and exits `2`; the digest pair appears exactly twice per run and nothing inside the retry loop re-checks a digest; the `1 checks, 2 failures` note is printed **and** provably diagnostic-only | a second precondition run, a retried precondition, a re-taken digest inside the loop, a red overridden to green, or a diagnostic note that moves a code ⇒ **a review finding** |
| **`RT-9`** | **LEG-LOCALITY — where the retry may and may not live.** **(a)** the retry is **LEG-LOCAL to `scripts/electron-ui.mjs`**: the **shared helper** (`scripts/electron-spawn.mjs`) carries **no retry** and its spawns stay **single-shot**, and the **divergence leg** carries **no retry** — its own identical flake is **explicitly NOT this unit's scope**; **(b)** the divergence leg's **`N = 9` stays EXACTLY intact** (its `R13` arithmetic unchanged); **(c)** the helper's **landed export surface is unchanged** — no retry facility was added to it; **(d)** **the helper-carried variant of the retry is a RECORDED, NOT-ADOPTED option, owned by `U-DIVERGENCE-EXT`** — a later pass that wants the divergence leg to retry its own bootstrap takes it up **there**, not here. | **`[T]`** + **`[A]`** | the helper exports carry no retry; each scratch profile is spawned **exactly once**; the divergence file carries no retry and its `R13` line is `9 checks, 0 failures`; no retry marker appears in a divergence run | a retry in the helper, a retry added to the divergence leg, a moved `N`, a second spawn of one profile, or an `N` change ⇒ **a review finding** (`PRE-4`; `docs/specs/engine-drift.md` §3.7 `F-8`) |

### 3.7.1 THE PRECEDENCE CLAUSE (architect-ruled 2026-09-27, third pass, FIX 3) — **a NEW clause added BESIDE `RT-1`, directly under the `RT-1`/`RT-2` table**

> **Why it exists, stated as the ruling stated it:** *"**`RT-4` item 3 governs for the timeout class,
> and `RT-1`'s conjunction is NOT the whole eligibility predicate.**"* The as-written `RT-1`
> conjunction (**child death observed** ∧ **handshake unresolved**) is unsatisfiable for a leg-timer
> timeout — the leg's own timer is what ended the attempt, so **no termination is observed** — which
> left `RT-4` item 3's *"a timed-out attempt is a FAILED BOOTSTRAP ATTEMPT and consumes an attempt"*
> **unimplementable**: the attempt was spent and the boot then failed non-retryably on attempt 1.
> **The clause removes exactly that contradiction and changes nothing else.**

| # | Clause | Exact pinned content |
| --- | --- | --- |
| **(a)** | **A TIMEOUT-CLASS bootstrap failure IS RETRYABLE.** An attempt that does not complete the handshake within the per-attempt timeout (`RT-4` item 3) **is a FAILED BOOTSTRAP ATTEMPT**, **consumes an attempt**, and **IS RETRIED**. **Its signature is the ABSENCE OF AN OBSERVED CHILD TERMINATION plus the HANDSHAKE-NOT-COMPLETED fact, recorded VERBATIM** (`no observed child termination — transport error: handshake did not complete within <bound> ms (RT-4 item 3)`, with the raw `(code, signal)` pair **null**). **A timeout must NEVER be recorded as a child death** — `child exited (code …, signal …)` is the **other** signature, and collapsing the two hides which failure actually occurred (`RT-5`: *"no attempt's signature may be summarised away"*). |
| **(b)** | **THE RETRYABLE SET THEREFORE HAS TWO SIGNATURES AND STAYS SIGNATURE-BASED.** Signature **(i)** = observed termination (`(code, signal)` verbatim) + unresolved handshake; signature **(ii)** = the timeout class above. The two are **different records of the same boundary** and are **not interchangeable**. |
| **(c)** | **EVERY `RT-2` CLASS STAYS NON-RETRYABLE AND CONSUMES NO ATTEMPT** — and *"a generic 'anything failed' predicate remains FORBIDDEN"*. **The clause does not widen the set:** a record with **no observed termination** whose transport error is **NOT** the handshake-not-completed fact is **NOT** retryable; a completed handshake makes **neither** signature hold. |
| **(d)** | **EXHAUSTION STILL EXITS `1`** (`RT-7`), and every `RT-3`/`RT-4`/`RT-5`/`RT-6`/`RT-8`/`RT-9` duty applies to the timeout class **identically** — the class retries **under the bound**, is **recorded**, and **exhausts**. |
| **(e)** | **IMPLEMENTATION DUTY, recorded because it is what makes the clause checkable:** **the timeout fact is carried as an OBSERVED RECORD FACT, never re-parsed from the message text.** The predicate is handed the **observed pair** and the **handshake state** and, for the timeout class, the **recorded timeout fact** — it may not match on the error string. |

**`RT-1`'s as-filed conjunction is SUPERSEDED IN PART by (a)–(b)** *(the strike is carried at `RT-1`'s
own row above and in this file's own convention: the conjunction remains the **observed-death**
signature, and the `iff` in `RT-1`'s statement may not be read as *"only if"* over the whole retryable
set). **Every other word of `RT-1` stands** — the forbidden predicates above all.*

**⟶ THE RACE RCA — the clause's implementation first failed, and the failure is recorded here because
it is the clause's own cautionary record (STATUS + RCA; no clause changed).** **The defect (`F-2`):**
the leg's failed-attempt path handed the predicate the **LIVE** `handshakeResolved` flag
(`rec.retryable = isBootstrapDeath(rec, resolved, rec.timedOut)`) on a line that runs **AFTER**
`await observeTermination(child, timeoutMs)` — the bounded termination-grace look — so the
**handshake half of the signature was sampled ~2 s after** the timeout half. **A slow-but-HEALTHY boot
whose handshake completed inside the grace window therefore flipped the `!handshakeResolved` half to
false while the recorded timeout fact stayed true: the two halves described DIFFERENT INSTANTS, and
the attempt was misclassified `failed non-retryably (RT-2)`.** **Reproduced, and NON-MONOTONIC** —
which is the signature of a race rather than a threshold: **`30`/`100 ms` retried to exhaustion**;
**`200`/`260 ms` aborted on attempt 1** (`✗ boot/connect failure: boot A attempt 1 failed
non-retryably (RT-2): no observed child termination — transport error: handshake did not complete
within 200 ms (RT-4 item 3)`, attempts 2–4 unrecorded, **no `RT-7` marker**, exit `1`); **`300`/`400 ms`
succeeded**. **Instrumented at the decision point:** `120 ms` ⇒ `resolvedAtCatch=false` then
`DIAG-after-grace resolvedNow=false death=none` ⇒ **retried (correct)**; `200`/`260 ms` ⇒
`resolvedAtCatch=false` then **`DIAG-after-grace resolvedNow=true death=none`** ⇒ **non-retryable**.
**THE FIX (LANDED, `scripts/electron-ui.mjs`):** **snapshot the handshake state at the instant the
raced verdict settles, BEFORE the grace is awaited** (`const handshakeResolvedAtSettle = resolved` in
the `catch`, immediately after the message is computed — handed to the predicate
`isBootstrapDeath(rec, handshakeResolvedAtSettle, rec.timedOut)`), so **both halves of the signature
describe the same instant — the timer instant, which is what the timeout signature always meant.**
**POST-FIX, MEASURED — the boundary is MONOTONIC:** **`120`/`200`/`260 ms` ⇒ `RT-7 EXHAUSTED: 4 of 4
attempts failed (3 retries)`, exit `1`, every attempt recorded in order**; **`300 ms` ⇒ accepted**,
`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`,
measurement **`427x22`**. **No normative clause changed** — the leg was corrected **to** the contract;
the full record is AMENDMENT BLOCK 5 below, `docs/decisions.md`
`UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE`, `docs/defects.md` `UI-LEG-TIMEOUT-CLASS-RACE` (CLOSED
host-side) and `docs/specs/ci-ui-leg-live-status.md` §6.2.

**The clause's reachability, stated honestly:** at the layer this spec pins, the timeout class is
drivable **deterministically** by the operator knob (`PROVIDENT_UI_BOOT_TIMEOUT_MS`) — which is exactly
why `RT-4` item 3 pins it — while the **observed-death** signature is reachable only when the flake
fires (`≈1-in-3`). **Both halves are `[U]` at runtime**; the `[T]` rows drive the predicate and the
loop against a state matrix.

### 3.7.2 `§8a` index append — AMENDMENT BLOCK 2

**APPENDED BY THE 2026-09-27 RETRY RULING (AMENDMENT BLOCK 2):**

| Row / clause (as appended) | Where it lives | Status | Lands at |
| --- | --- | --- | --- |
| **§3.7 the retry clause set `RT-1`…`RT-9`** | §3.7, this file (**NEW CLAUSE SET**) | **RULED AND ADDED 2026-09-27** — the architect's answer to `M-4`'s open question; `docs/decisions.md` `REALDOM-UI-LEG-RETRY-RULED-AND-LANDED` | §3.7, above |
| **the PRECEDENCE CLAUSE** | §3.7.1, this file (**NEW**, beside `RT-1`) | **RULED 2026-09-27 (FIX 3)** — **supersedes `RT-1`'s conjunction IN PART**: the timeout class is the SECOND retryable signature; `RT-2`'s classes unaffected; the retryable set stays signature-based | §3.7 `RT-1` (struck in part at its own row), §3.7.1, `RT-4` item 3 |
| `RT-4` item 4's as-filed **`122 000 ms`** label | §3.7 `RT-4` (**SUPERSEDED BY ITS OWN DERIVATION**) | **SUPERSEDED 2026-09-27 (third pass)** — the derivation `4 × 30 000 + 250 + 500 + 1000 = 121 750 ms` governs; measured, the leg enforces and prints **`121750 ms`** | §3.7 `RT-4` item 4; AMENDMENT BLOCK 7 `B7-1`'s correction list |
| **`RT-4` items 2–3's two operator knobs** (`PROVIDENT_UI_BOOT_ATTEMPTS`, `PROVIDENT_UI_BOOT_TIMEOUT_MS`) | §3.7 `RT-4`; `docs/decisions.md` (recorded **later**, see `B7`) | **DISCHARGED (leg half) / the `docs/decisions.md` half was LATE** — the leg names both knobs; the doc half was unmet when the blind run measured `grep -c PROVIDENT_UI docs/decisions.md` = **`0`** (`RT-08` FAIL) and was discharged later | §3.7 `RT-4`; `docs/decisions.md`'s `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED` annotation + its note 9 |
| `M-4`'s open question (*"whether the leg should RETRY a bootstrap that dies `SIGTRAP`"*) | AMENDMENT BLOCK 1 `M-4`; `docs/decisions.md` `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED` | **ANSWERED AND SPENT 2026-09-27** — the ruling is `RT-1`…`RT-9` + the PRECEDENCE CLAUSE, implemented in `scripts/electron-ui.mjs`. **The as-filed `OPEN` wording is kept for provenance and must not be read as live status** | AMENDMENT BLOCK 2, §3.7 |
| the retry's **runtime obligation** (`RT-7`'s exhaustion, `RT-6`'s label, `RT-3`'s fresh-per-attempt profile) | this file §3.7; `docs/specs/ci-ui-leg-live-status.md` | **OBTAINED LATER (live drives)** — a real retry, a real exhaustion, a real red precondition, a real DISPLAY absence; the blind record's `NBR-03`/`NBR-04`/`NBR-05` were NOT re-dispositioned by the fix passes, they were **closed by the live drives** | `docs/specs/ci-ui-leg-live-status.md` §4–§5, §7.1 |

**The clause set's row ledger, for a TestWriter (STATUS — a census, recorded honestly):** the retry
pass added **`39`** `RT-*` rows; **`RT-0a`/`RT-0b`** were added later by the `F-1` fix (AMENDMENT
BLOCK 6), making **`41`** `RT-*` rows in `tests/ui-leg-contract.test.ts`; that file's **CLAUSE** set is
**`59`** rows total (**`18`** non-`RT` + **`41`** `RT` — the `18` being `L-1`, `R1`, `R2-a`, `R2-b`, `R3`, `R4`, and
the `§`-named rows, plus the six `*-fals` rows), and with the **`9`** `SEAM-*` rows in
`tests/ui-leg-seam.test.ts` the unit's set is **`68/68`** green. **The retry pass's own census claim
(`57`/`39`) is corrected by AMENDMENT BLOCK 7 `B7-1`**; the honest process record of that pass — the
**INVERTED red-first order** for this clause set, with a **`32`-mutation out-of-tree matrix** as the
falsifiability substitute — is `B3`'s below.
*(**⟶ CURRENT CENSUS, ADDED 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS — the
`68/68` above is the PRE-`G-4` figure and must not be quoted as the tree's state.** Measured on the
landed tree: `tests/ui-leg-contract.test.ts` holds **`66`** `it(...)` rows — the `59`-row clause set
above **plus the `7` `G-4` falsifiability rows** (`R0-fals`, `R0(c)-fals`, `R1-fals`, `R2-tally-fals`,
`R2-frame-fals`, `R3-fals`, `R4-fals`) — and `tests/ui-leg-seam.test.ts` holds **`11`**
(`SEAM-1a`/`1b`, `SEAM-2a`/`2b`, `SEAM-3a`/`3b`, `SEAM-4a`/`4b`, `R0(c)`, `SEAM-R0(c)-a`/`-b`). **The
unit's set is therefore `66 + 11 = 77` rows — `77/77` — which is the figure AMENDMENT BLOCK 8's `G-4`
already carries (`66 + 11 = 77`, a `15`-mutation matrix, the `+9`/`+2` row delta), and it is the figure
the unit's own commit records (`tests/ui-leg-contract.test.ts` `66 = 59 clause + 7 rebuilt falsifiable
rows` · `tests/ui-leg-seam.test.ts` `11`). The `59 = 18 non-RT + 41 RT` clause-set arithmetic above is
**unchanged and still correct**; what the `68/68` line predates is the `G-4` strengthening. The leg's
own runtime headline is a THIRD, unrelated number and is NOT this census: it prints
`N/N assertions green, mapped onto the five declared rows R0-R4` from its own **`11`** `row(...)` call
sites (`R0`: 4 · `R1`: 1 · `R2`: 3 · `R3`: 1 · `R4`: 1), which is the `11/11` the live runs quote —
`docs/specs/ci-ui-leg.md` §3.0's row set, not the test-file row count. `docs/specs/ci-ui-leg-live-status.md`
and `docs/pending.md` §F still carry `68/68`; **REPORTED here, not edited by this file.**)*

## AMENDMENT BLOCK 3 (`U-REALDOM-BOOT`, 2026-09-27, THIRD pass) — **the retry's test rows, and the honest process record**

> **WHAT THIS BLOCK IS.** The **row/process record** of the pass that landed §3.7: the **`39` new
> `RT-*` rows**, and — recorded rather than hidden — the fact that **the red-first order was INVERTED
> for this clause set** (the implementation preceded the rows, `AGENTS.md` item 3 / RCA-1), with
> **falsifiability established OUT-OF-TREE** by a **`32`-mutation matrix** and stub probes against a
> `/tmp/` copy of the leg, and **one row (`RT-6a`) found NOT FALSIFIABLE and strengthened.** **It is a
> process/status record: it amends no normative clause of §3.7** (its one re-point is recorded at
> `B3-3`). **Reconstruction note: the as-written prose is lost; the ids, the census, the mutation-matrix
> size and the strengthened row are rebuilt from the surviving records.**

| # | Item | Content |
| --- | --- | --- |
| **`B3-1`** | **What landed** | **`39` new `RT-*` rows** in `tests/ui-leg-contract.test.ts`, driving §3.7: `RT-1a`…`RT-1e`, `RT-2a`…`RT-2e`, `RT-3a`…`RT-3e`, `RT-4a`…`RT-4d`, `RT-5a`…`RT-5c`, `RT-6a`…`RT-6c`, `RT-7a`…`RT-7f`, `RT-8a`…`RT-8d`, `RT-9a`…`RT-9d` — **`+2` later** (`RT-0a`/`RT-0b`, the `F-1` fix), so the file's `RT` set is **`41`** today. |
| **`B3-2`** | **The honest process record (the RCA-1 violation, stated in the open)** | **The red-first order was INVERTED for this clause set: the retry was implemented before its rows existed.** That is a **process violation under `AGENTS.md` item 3 / RCA-1** even though the final set is green, and it is **recorded rather than smoothed**. **The substitute for the missing red run: FALSIFIABILITY WAS ESTABLISHED OUT-OF-TREE** — a **`32`-mutation matrix** plus **stub probes** against a **`/tmp/` copy of the leg**, never against the tracked tree (**the leg's own precondition rebuilds it, `PRE-1`**). The row set's design principle (recorded here because it is what makes the substitute workable): the rows **drive the leg's REAL functions extracted from `scripts/electron-ui.mjs` at test time** — the predicate, the attempt loop, the bound, the backoff table, the recorder and the exhaustion printer — against a **state matrix**, so a mutated predicate/bound/table/record/teardown reddens them; the **source-text rows** assert a call count, an ordering, a census or the **ABSENCE** of a forbidden predicate/term (never a bare *"the file mentions X"*, which a comment can satisfy); and the extraction **fails loudly** if a declaration is renamed or removed (*"the function no longer exists"* is a red row, not a skip). |
| **`B3-3`** | **The one clause re-point (+ the honest state of the landed predicate)** | **`RT-4c` was RE-POINTED at the PRECEDENCE CLAUSE**: the row previously asserted the literal shape `return !handshakeResolved &&` — i.e. it **pinned `RT-1`'s CONJUNCTION as the ONLY admissible form of the predicate**, which is precisely the superseded reading — and a structural assertion requiring that shape would have made the **ruled timeout signature a red row.** The row now asserts (i) the **behavioural** boundary (four quadrants: a timeout and an observed death are **both** retryable; a completed handshake and every generic predicate are retryable under **neither**) and (ii) the **structural** half that still stands (the predicate reads the handshake half and **never returns a verdict unconditionally** — no blanket `return true`). **Recorded honestly, and reported to the doc reviewer:** the as-landed leg **still implemented `RT-1`'s conjunction** at that time — the timeout-class signature **was** present in the record (`no observed child termination …`), but the conjunction defeated it; that state is the **`F-2` race**'s territory and was corrected at the implementation (AMENDMENT BLOCK 5). **The row's own comment records the re-point** (`tests/ui-leg-contract.test.ts`, the `RT-1b`/`RT-4c` comment blocks, read). |
| **`B3-4`** | **The strengthened row (`RT-6a` was NOT falsifiable as first written)** | **`RT-6a` was found NON-FALSIFIABLE and strengthened:** as first written it could be satisfied by the **mere presence of the label's TEXT** in the source — a **dead or constant condition** would silence the label while leaving its text in place. The row now asserts that **a branch that prints the retry label is conditioned ON the retry bookkeeping** (a real `attempt`/`retries` interpolation, and a conditional that actually prints), i.e. the label must be **driven**, not merely present. **The general rule this row is the first instance of** is later promoted for the whole unit (AMENDMENT BLOCK 8's `G-4` and `docs/decisions.md` `TEST-MARKER-MUST-BE-THE-ASSERTION`): *a row must assert the ASSERTION, not a marker that a dead condition can also satisfy.* |
| **`B3-5`** | **The census this block claimed, and its later correction** | **`B3` claimed the retry pass left the file at `57` rows (`39` of them `RT`).** **Measured later: `59` rows = `18` non-`RT` + `41` `RT`** — the delta being the `F-1` fix's **`RT-0a`/`RT-0b`**, and the unit's set with the **`9`** seam rows being **`68/68`**. **AMENDMENT BLOCK 7 `B7-1` carries the correction**; this cell keeps the as-filed figure marked so the drift is auditable. *(**⟶ DATED MARKER, 2026-09-27, the RECONSTRUCTION-VERIFICATION proofreader pass: `59 = 18 non-RT + 41 RT` remains exactly true of the clause set, but the `9`/`68/68` pair is the PRE-`G-4` census — the landed tree reads `66` + `11` = `77`. See §3.5's landed-count note and §3.7's CURRENT CENSUS note; the cell's as-filed figures are kept for audit.)* |
| **`B3-6`** | **The follow-up cycle that RESTORED red-first order** | The **timeout re-point** (§3.7.1, `B3-3`) produced a **real red-first cycle**: **`3` red (`RT-4c`, `RT-1e`, `RT-7f`) → green** after the classification change. **Recorded because it is the honest repair of `B3-2`'s inversion:** for that change the rows ran FIRST and were RED against the landed leg, which is the order `RCA-1` requires. |

### 3.7.3 `§8a` index append — AMENDMENT BLOCK 3

**APPENDED BY THE 2026-09-27 RETRY-ROWS PASS (AMENDMENT BLOCK 3):**

| Row / clause (as appended) | Where it lives | Status | Lands at |
| --- | --- | --- | --- |
| **the `39` `RT-*` rows** | `tests/ui-leg-contract.test.ts` | **LANDED — red-first order INVERTED for this clause set (RCA-1), recorded at `B3-2`; falsifiability established out-of-tree by a `32`-mutation matrix** | `B3-2`, `B3-5` |
| **`RT-6a`** (the labelled retried green) | the row set | **FOUND NON-FALSIFIABLE, STRENGTHENED** — it now requires a branch **conditioned on** the retry bookkeeping, not the label's text | `B3-4` |
| **`RT-4c`**'s predicate-shape assertion | the row set (**RE-POINTED**) | **RE-POINTED 2026-09-27 at the PRECEDENCE CLAUSE** — it no longer requires `RT-1`'s conjunction as the predicate's only admissible shape; the behavioural four-quadrant boundary + the anti-blanket structural half stand | `B3-3`, §3.7.1 |
| **`B3-5`**'s `57`/`39` census *(**⟶ CITATION FIXED 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS: this index row and `B7-1` cite a `B3-MS-1` id that does not exist in this file — the census cell is `B3-5`.** No claim, count or disposition changes; see `B3`'s own note.)* | AMENDMENT BLOCK 3 (**CORRECTED IN PLACE, kept marked**) | **CORRECTED 2026-09-27 (seventh pass) to `59` = `18` non-`RT` + `41` `RT`** — the delta is the `F-1` fix's `RT-0a`/`RT-0b`; the unit's set with the 9 seam rows is `68/68` **(pre-`G-4`; the current census is `66 + 11 = 77` — see §3.5's landed-count note)** | `B3-5`, AMENDMENT BLOCK 7 `B7-1` |
| §3a's seed sweep and §3b's findings table (*"`OWED`"*) | §3a / §3b, this file | **NOT THIS BLOCK** — the pass's own record was still owed when `B3` landed; it is the **eighth** pass's (AMENDMENT BLOCK 8) | §3a's struck status, AMENDMENT BLOCK 8 |

## AMENDMENT BLOCK 4 (`U-REALDOM-BOOT`, 2026-09-27, FOURTH pass) — **the npm-shim RCA (`F-1`'s blocker), the shim-integrity hazard, and the adversarial pass recorded as unrun**

> **WHAT THIS BLOCK IS.** A **status/RCA record**, not a contract change: the pass that established
> why **both live legs had stopped booting** — a **corrupted npm shim inside this repo's
> `node_modules`** — plus the **integrity hazard** it leaves behind (with a **recommended, NOT
> implemented** precondition check) and the honest statement that **the adversarial pass had not run
> and was still owed** at that point. **Reconstruction note: the as-written prose is lost; the RCA's
> mechanism, its discriminating evidence, the hazard and the unrun record are rebuilt from the
> surviving trackers (`docs/decisions.md` `ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER` +
> `NPM-SHIM-INTEGRITY`, `docs/pending.md`, `docs/next-steps.md`'s `RESOLVED + MISATTRIBUTED` block).**

| # | Item | Content |
| --- | --- | --- |
| **`B4-1`** | **The blocker, and its MISATTRIBUTION** | The live legs (`npm run divergence`, `npm run ui`) **could not run**: a direct Electron launch produced **no output and had to be killed after 25–40 s**; `npm run divergence` printed the off-green `R13 RESULT: 1 checks, 2 failures`; `npm run ui` hung in its own precondition. **It was recorded as an ENVIRONMENT regression and A/B-"proven" not this unit's** (*"the same failure reproduces with the UNMODIFIED HEAD helper"*). **THAT ATTRIBUTION WAS WRONG** (see `B4-2`), and the A/B test **could not discriminate**: both versions spawned through the **same corrupted entry point**. |
| **`B4-2`** | **The root cause, and the discriminating evidence** | **One file, inside this repo:** **`node_modules/electron/cli.js`** — the file `node_modules/.bin/electron` symlinks to, and the entry point **every** Electron spawn here goes through — had been **replaced by a shell script that re-execs itself** (`#!/bin/sh` … `exec …/node_modules/.bin/electron "$@"`), so **every boot re-entered `exec` in an infinite loop at ~99 % CPU printing nothing**. **The discriminating test was a TRACE of the resolved entry point, not "does another repo fail too":** `strace -f` showed an **unbroken cycle of `openat(… node_modules/.bin/electron)`** with the dynamic loader re-running each time and **no `clone`/`execve` progress**, `/proc/<pid>/status` read **`State: R (running)` at 99 % CPU**, and there were **0 `EPERM`/`EACCES` markers** — i.e. **no syscall denial at boot**. **The two red herrings, recorded because they are the lesson:** **(1)** a **second repo on the same machine** runs the same spawn vector and reproduced the same signature — it was **hitting its own copy of the same corruption**, so it was **not a control**; **(2)** the **`/dev/shm` permission denial is REAL but SEPARATE and older**, already mitigated by `--disable-dev-shm-usage` + the scratch profile — **it was not the hang's cause** (and it *is* the mechanism behind `RK-14`'s `SIGTRAP` flake). |
| **`B4-3`** | **The fix, and the SHAVED hazard it exposes (RECOMMENDED, NOT IMPLEMENTED)** | **The correct Node wrapper was RESTORED** from a healthy install of the same package (`electron` 44.4.3/44.4.5 — identical wrapper: `#!/usr/bin/env node`, `require('./')`, `spawn(electron, process.argv.slice(2), {stdio:'inherit'})`, plus the SIGINT/SIGTERM/SIGUSR2 forwarding); **a post-repair boot probe exits `0` in `176 ms` printing `BOOT-OK 44.4.5`**, and both live legs then ran green. **The hazard, stated exactly:** this is an **npm-shim INTEGRITY hazard, not a system one** — the corrupt file's **mtime was `2026-09-24 14:01`**, written by an **install/reinstall**, and **only `electron/cli.js` was affected** (`node_modules/.bin/{esbuild,tsc,vitest}` are intact), so **a future install can corrupt it again in the same way** — and the failure mode (**silent ~99 %-CPU hang with no output**) is **indistinguishable from a wedged host**, which is what cost multiple passes of misattribution. **RECOMMENDED, NOT IMPLEMENTED — one line in the leg's precondition:** assert the **resolved Electron entry point is the expected Node wrapper** (e.g. `file -L node_modules/electron/cli.js` reports a **Node** script, not a **shell** script) **before the leg spawns anything**. **It is a harness change (`scripts/**`) with its own red-first row, so it belongs to the pass that touches the precondition — owner on record: the harness's next change (`U-DIVERGENCE-EXT`), parked at `docs/pending.md` with a named revisit condition** (*a pass that touches the harness precondition / `scripts/electron-spawn.mjs`*). |
| **`B4-4`** | **The adversarial pass recorded as UNRUN (later spent)** | **At this point the adversarial pass had NOT run** — §3a/§3b still read **`OWED`**, and this block **records that as the status rather than leaving it implicit**: the unit was landed-green but its per-unit adversarial pass (`AGENTS.md` item 6 / RCA-3, **mandatory**) was **still owed**, as was the per-unit documentation review. **Both were spent later** — the adversarial pass's record is **AMENDMENT BLOCK 8** (`AP-1`…`AP-5` + `F-0`, `G-1`…`G-13`), and the documentation review's record is **AMENDMENT BLOCK 7** (`B7`); the `OWED` status lines in §3a/§3b are **struck in place** at that point. |
| **`B4-5`** | **What this block did NOT change** | **No normative clause, no row, no exit code, no bound.** The live legs' evidence was **obtained after this pass** (post-repair: `npm run divergence` → `R13 RESULT: 9 checks, 0 failures`; `npm run ui` → exit `0`, `UI RESULT: 0 failures (11/11 assertions green …)`, `retries=0`, the ONE measurement `427x22`); **the one environment noise line that remains is not a failure** (`dconf-CRITICAL … '/run/user/1000/dconf/user': Permission denied` — settings persistence only). |

### 3.7.4 `§8a` index append — AMENDMENT BLOCK 4

**APPENDED BY THE 2026-09-27 NPM-SHIM RCA PASS (AMENDMENT BLOCK 4):**

| Row / clause (as appended) | Where it lives | Status | Lands at |
| --- | --- | --- | --- |
| `ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER` (the "environment regression" attribution) | `docs/decisions.md` (**ANNOTATED IN PLACE**) | **RESOLVED / MISATTRIBUTED 2026-09-27** — the cause was the corrupted in-repo npm shim; **the row is kept as the RCA's record**, which is why it is not moved to `## SUPERSEDED` | `B4-1`, `B4-2`; `docs/decisions.md` |
| **the shim-integrity precondition check** (RECOMMENDED, NOT implemented) | `docs/pending.md` (parked, named owner + revisit condition) | **RECORDED, NOT OWED BY THIS UNIT** — a harness change with its own red-first row; the hazard is live (an install can re-corrupt the wrapper) | `B4-3` |
| §3a/§3b's **`OWED`** status | §3a / §3b, this file | **RECORDED AS UNRUN here (status only) — later SPENT** | `B4-4`, §3a's struck status, AMENDMENT BLOCK 8 |
| the retry's **live verification** | §3.7; `docs/specs/ci-ui-leg-live-status.md` | **OBTAINED AFTER THIS BLOCK** (post-repair legs green; the runtime half driven live later) — **this block's blocker retired nothing and verified nothing** | `B4-5` |

## AMENDMENT BLOCK 5 (`U-REALDOM-BOOT`, 2026-09-27, FIFTH pass) — **the timeout-class RACE: RCA + fix (no normative clause changed)**

> **WHAT THIS BLOCK IS.** The **RCA + fix record** of the defect the live battery found as **`F-2`**:
> §3.7's **PRECEDENCE CLAUSE was only half-implemented** because the retryability predicate was handed
> a **LIVE** handshake flag read **after** the termination-grace `await`, so the two halves of the
> timeout signature described **different instants** and a slow-but-healthy boot was misclassified
> non-retryable. **It states, in its own words, that NO NORMATIVE CLAUSE CHANGED** — the leg was
> corrected **to** the contract. **Reconstruction note: the as-written prose is lost; the symptom, the
> instrumented evidence, the fix, the post-fix boundary and the regression set are rebuilt from
> `docs/specs/ci-ui-leg-live-status.md` §6.2 and `docs/decisions.md`
> `UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE`.**

| # | Item | Content |
| --- | --- | --- |
| **`B5-1`** | **The finding (`F-2`) and where it lived** | **`F-2` — *"the timeout class's retryability is a RACE, so §3.7's PRECEDENCE CLAUSE is only half-implemented"*** (the live battery's finding, filed at `docs/specs/ci-ui-leg-live-status.md` §6.2). **The clause it contradicts:** §3.7's PRECEDENCE CLAUSE (a) — *"a TIMEOUT-CLASS bootstrap failure IS RETRYABLE — it consumes an attempt and its signature is the absence of an observed child termination PLUS the handshake-not-completed fact, recorded VERBATIM"* — and clause (c), *"the retryable set stays SIGNATURE-BASED"*, together with `RT-4` item 3. |
| **`B5-2`** | **The symptom, reproduced (NON-MONOTONIC)** | With the operator knob lowered: at **`30`/`100 ms`** the attempts **retried to exhaustion correctly** (`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`, exit `1`); at **`200`/`260 ms`** the leg **aborted on attempt 1** with `✗ boot/connect failure: boot A attempt 1 failed non-retryably (RT-2): no observed child termination — transport error: handshake did not complete within 200 ms (RT-4 item 3)` — **attempts 2–4 unrecorded, no `RT-7` marker**, exit **`1`**; at **`300`/`400 ms`** the boot was **accepted** and the leg went **green**. **A boundary that moves the WRONG WAY as the budget grows is the signature of a RACE, not of a threshold.** |
| **`B5-3`** | **The mechanism (instrumented — the exact TORN READ)** | The leg's failed-attempt path handed the predicate the **LIVE** `resolved` flag: `rec.retryable = isBootstrapDeath(rec, resolved, rec.timedOut)` — **on a line that runs AFTER `await observeTermination(child, timeoutMs)`**, the bounded termination-grace look, so **`resolved` was read ~2 s after the timeout fact.** **Instrumented at the decision point:** `120 ms` ⇒ `DIAG-settle timedOut=true resolvedAtCatch=false terminationAtCatch=null` then `DIAG-after-grace resolvedNow=false death=none` ⇒ **RETRIED (correct)**; `200 ms` and `260 ms` ⇒ `resolvedAtCatch=false` then **`DIAG-after-grace resolvedNow=true death=none`** ⇒ **NON-RETRYABLE, attempt 1 aborted**. **The two halves described DIFFERENT INSTANTS:** the timeout fact was snapshotted **when the timer fired**, the handshake flag ~2 s later. **The boot was actually ALIVE AND SLOW — a real handshake that completed just after the deadline — so the leg was discarding a perfectly healthy boot.** |
| **`B5-4`** | **The fix (LANDED)** | **Snapshot the handshake state at the instant the raced verdict settles, BEFORE the grace is awaited** — `const handshakeResolvedAtSettle = resolved` in the `catch`, immediately after the message is computed — and **hand the predicate the snapshot**: `isBootstrapDeath(rec, handshakeResolvedAtSettle, rec.timedOut)`. **The timeout signature is a statement about the INSTANT THE TIMER FIRED, so both halves are now read there.** *(**⟶ ANCHORS REMAPPED 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS:** the as-reconstructed citations `scripts/electron-ui.mjs:641` / `:660` were captured **mid-pass** and no longer resolve — the leg is now **1521** lines and the two sites are the snapshot in the `catch` of `bootAttempt` and the `rec.retryable = isBootstrapDeath(...)` line beside it. **Cited by row/site name above rather than by line**, because these anchors had already been remapped twice (the same stale pair is carried by `docs/specs/ci-ui-leg-live-status.md` §6.2, which is that record's to remap; **REPORTED, not edited from here**). **No clause, no measured value and no disposition changes.**)* |
| **`B5-5`** | **The post-fix boundary, VERIFIED (monotonic) + the regression set** | **`120`/`200`/`260 ms` ⇒ `RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`, EVERY attempt recorded in order, exit `1`** (**the `200`/`260 ms` rows were previously attempt-1 aborts**); **`300 ms` ⇒ accepted**, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, measurement **`427x22`**, exit `0`. **Regression-free the same pass:** unit rows **`68/68`** *(**⟶ DATED MARKER, 2026-09-27, the RECONSTRUCTION-VERIFICATION proofreader pass: this pass's measurement is kept as recorded; the `G-4` pass later took the landed set to `66 + 11 = 77`. No measured value of THIS pass moves.**)* · `npm test` **58 files / 863 passed / 2 skipped / 0 failed** · `npm run typecheck` **clean** · `npm run battery` **184 checks / 0 failures** · `npm run divergence` **`R13 RESULT: 9 checks, 0 failures`** · `npm run ui` → **exit 0**, `11/11`, `427x22`, `retries=0`. |
| **`B5-6`** | **What this block did NOT do — and the clause later superseded** | **No normative clause changed:** `RT-1` / `RT-2` / `RT-4` item 3 and the **PRECEDENCE CLAUSE** are **byte-unchanged** — *"the leg was corrected to the contract, not the reverse."* **It re-dispositioned no `NBR-*` row and rewrote no clause of this spec.** *(**SUPERSEDED 2026-09-27, the sixth pass: this block recorded that `F-1` — the leftover scratch profiles — "remains `OPEN`".** **`F-1` is CLOSED by AMENDMENT BLOCK 6** (the spawn-the-BINARY + cleanup-hook-at-creation fixes), so **that half of this cell is spent**; the `F-2` half stands.)* |
| **`B5-7`** | **WHY THE ROW SET DID NOT CATCH IT (recorded honestly — it is the general lesson)** | The unit's `RT-*` rows drive the predicate with **hand-built attempt records**, so they pin the predicate's **SHAPE** but **cannot observe the live sampling point**; the race lives in the **ORDER OF THE TWO READS** in the leg's `catch` path, which is **only reachable in a real boot**. **The live battery found it.** **RECOMMENDED, NOT IMPLEMENTED (a TestWriter-side change, not this pass's): a snapshot-ordering row** that asserts the predicate is handed the handshake state **read at settle** — the general rule is `docs/decisions.md` `UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE` (*"a retryability/eligibility predicate must be handed values that describe ONE INSTANT"*). |

### 3.7.5 `§8a` index append — AMENDMENT BLOCK 5

**APPENDED BY THE 2026-09-27 GOLDPATH RACE-FIX PASS (AMENDMENT BLOCK 5):**

| Row / clause (as appended) | Where it lives | Status | Lands at |
| --- | --- | --- | --- |
| **`F-2`** (`docs/specs/ci-ui-leg-live-status.md` §6.2) | the live-battery record | **CLOSED 2026-09-27 (FIXED + VERIFIED)** — a snapshot at settle; the boundary is monotonic; **the record's as-filed `OPEN` row is kept struck-but-visible, never rewritten** | `B5-1`…`B5-5`, §3.7.1's race RCA |
| the greens' **`RT-05` FAIL** | `docs/specs/ci-ui-leg-greens.md` §5 | **DISPOSITION CORRECTED to *REAL DEFECT, NOW FIXED*** — the record's row text is **NOT rewritten**; it was never a doc drift and never a spec defect | `B5-5`; `B5-7` |
| the **`F-1` "remains OPEN"** clause in `B5-6` | AMENDMENT BLOCK 5 (**SUPERSEDED IN PLACE**) | **SUPERSEDED 2026-09-27 (sixth pass)** — `F-1` is closed by the spawn-the-BINARY + cleanup-hook-at-creation fixes | `B5-6`, AMENDMENT BLOCK 6 |
| the **recommended snapshot-ordering test row** | this file; `docs/pending.md` | **RECOMMENDED, NOT IMPLEMENTED** — owner: the TestWriter (the row pins a read ORDER, reachable only in a real boot) | `B5-7` |
| **`RT-1`/`RT-2`/`RT-4` item 3 + the PRECEDENCE CLAUSE** | §3.7, §3.7.1, this file | **UNCHANGED BY THIS BLOCK** — the fix was implemented *to* the contract; **no normative clause moved** | `B5-6` |

## AMENDMENT BLOCK 6 (`U-REALDOM-BOOT`, 2026-09-27, SIXTH pass) — **the `F-1` CLOSURE: leftover scratch profiles, root cause, fix, exit-path matrix**

> **WHAT THIS BLOCK IS.** The **closure record** of the live battery's **`F-1`** (*"every green run
> leaves a scratch root holding BOTH attempt profiles on disk, while the leg reports `leftover
> profiles: NONE`"*): the **root cause**, the **two-part fix**, and the **exit-path matrix** that
> verifies it. **It is an implementation/RCA record — it amends no normative clause**, and it is the
> block that added the two `RT-*` rows (`RT-0a`/`RT-0b`) the census corrections refer to.
> **Reconstruction note: the as-written prose is lost; the root cause, the fix, the matrix and the
> two rows are rebuilt from `docs/specs/ci-ui-leg-live-status.md` §6.1, `docs/decisions.md`
> (`UI-LEG-SPAWN-THE-BINARY-NOT-THE-WRAPPER`, `UI-LEG-CLEANUP-HOOK-AT-CREATION`), `docs/pending.md`
> and `docs/FORKER.md`.**

| # | Item | Content |
| --- | --- | --- |
| **`B6-1`** | **The finding (`F-1`)** | Measured on **`4` of `4`** repo-leg green runs: a scratch root survived an **exit `0`**, holding **both** attempt profiles — while the leg printed **`leftover profiles: NONE`**; persistence at **`t+10 s`** ruled out a racing check, and **`31`** roots had accumulated in one session. **Documented behaviour:** profiles deleted on **every** exit path ⇒ **`0`** roots (a leftover is at minimum a recorded, non-fatal note — the `U-10` seed's own clause). |
| **`B6-2`** | **THE ROOT CAUSE, exact** | **The helper spawned the `cli.js` WRAPPER instead of the BINARY.** `scripts/electron-spawn.mjs` spawned **`node_modules/.bin/electron`**, a **symlink to `electron/cli.js`** — a Node **WRAPPER that `spawn`s the real Electron binary as its own child** — so **the `child` handle the helper held was the WRAPPER, not the app**: killing it **orphaned the real Electron main process and its Chromium helpers**, which kept writing and **re-created the profile directory AFTER `cleanupProfiles` had unlinked and verified it**. **The discriminator that named the MECHANISM rather than the symptom:** the leftovers held **only Chromium artifacts and NO `provident-security.json`** — the leg's own seeded store **WAS** deleted, which is exactly what made the re-creation invisible. |
| **`B6-3`** | **THE FIX, both halves** | **(1) SPAWN THE BINARY, NOT THE WRAPPER.** `electronBin` now resolves the **BINARY directly** — canonical **`node_modules/electron/dist/electron`**, then the package's **`path.txt` contract**, then the bare package entry — under an explicit **NO-FALLBACK-TO-THE-WRAPPER** rule that **throws a named error** if no binary is found. **One process, one handle, no orphaned grandchild**, and the **stdio chain stays SINGLE-HOP** (*the `detached: true` + process-group alternative was TRIED and BACKED OUT because it regressed the SDK stdio transport — `R13 RESULT: 1 checks, 2 failures`*). **(2) REGISTER THE CLEANUP HOOK AT CREATION, NOT AT THE BOTTOM OF THE FILE.** The leg's **`process.on('exit')` cleanup hook is registered at the moment `scratchRoot` is created**, not ~350 lines later after the retry-configuration validation: the malformed-config early exit (`PROVIDENT_UI_BOOT_ATTEMPTS=abc` ⇒ `process.exit(1)`) had been exiting **BEFORE the hook existed** and leaking an **EMPTY** scratch root (`npm test`'s **6 empty roots per run** — one per malformed value the unit's own `RT-2e` row spawns). **The hook is IDEMPOTENT**, so the signal handlers and the explicit call sites still work; a **`typeof activeBoot !== 'undefined'` guard** covered an exit during module evaluation — **a guard later found TDZ-UNSAFE and fixed structurally** (AMENDMENT BLOCK 8's `G-6`: the declarations now precede the hook). |
| **`B6-4`** | **THE EXIT-PATH MATRIX (the verification)** | **Every exit path leaves `0` scratch roots, and `0` surviving Electron processes:** **green run ⇒ exit `0`, `0` roots** · **malformed config (`PROVIDENT_UI_BOOT_ATTEMPTS=abc`) ⇒ exit `1`, `0` roots** · **timeout exhaustion (`PROVIDENT_UI_BOOT_TIMEOUT_MS=30`) ⇒ exit `1`, `0` roots** · **a red divergence precondition ⇒ exit `2`, `0` roots** — each **checked IMMEDIATELY and again after an `8 s` settle** (the settle is what would catch a re-creation), with the report **now matching the disk** (`ls -d /tmp/provident-ui-run-*` empty). **The `SIGINT`/`SIGTERM` rows of the matrix are the one part this cell does NOT claim to have re-run** — see `B6-5`. |
| **`B6-5`** | **What this block did NOT close (routed / parked)** | **`G-12`** (raised later by the adversarial pass): **the leg's exit-path matrix lacks explicit `SIGINT`/`SIGTERM` rows** — the hook is registered for them and is idempotent, but the **matrix's own rows** do not name them; **owner: the leg** (`scripts/electron-ui.mjs`), recorded **tracker-only** in AMENDMENT BLOCK 8 / `docs/pending.md` §F. **Also NOT this block's:** the **battery host** and the **divergence child** are spawned **outside** the helper's cleanup sweep (`G-11`'s residual — its inherited half is `U-DIVERGENCE-EXT`'s, `RT-9`(a) discipline); **measured end state: no profile is written by those two paths and the divergence leg leaves `0` roots.** |
| **`B6-6`** | **The rows this block ADDED, and what they pin** | **`RT-0a`** (§0 prohibition 4 / §3.7 `RT-3`) — **every attempt profile is a FRESH scratch dir from the helper's creator, and only the leg's own store is written into it**; **`RT-0b`** (§0 prohibition 4 / §2.1 item 2) — **the per-attempt profiles are removed through the helper's ONE cleanup on every exit path**. **These two are why the census moved `39` → `41` `RT` rows** (`B3-5`, `B7-1`). |

### 3.7.6 `§8a` index append — AMENDMENT BLOCK 6

**APPENDED BY THE 2026-09-27 `F-1` RCA + FIX PASS (AMENDMENT BLOCK 6):**

| Row / clause (as appended) | Where it lives | Status | Lands at |
| --- | --- | --- | --- |
| **`F-1`** (the leftover scratch profiles) | `docs/specs/ci-ui-leg-live-status.md` §6.1; `docs/defects.md` (CLOSED host-side) | **CLOSED 2026-09-27 (FIXED + VERIFIED)** — spawn the BINARY + cleanup-hook-at-creation; the `as-filed` OPEN text is kept struck-but-visible in that record | `B6-1`…`B6-4` |
| **`R0-04` FAIL** (the blind-greens record's row) | `docs/specs/ci-ui-leg-greens.md` §5 | **DISPOSITION CORRECTED to *REAL DEFECT, NOW FIXED*** — the record's row text is **NOT rewritten** | `B6-4` |
| §0 prohibition 4 / §2.1 item 2 / §3.7 `RT-3` (*"deletes them on exit"*, *"a cleanup hook"*, *"a fresh profile per attempt"*) | this file | **DISCHARGED — no clause changed, the LEG was corrected to them** | `B6-3`, `B6-6`; rows `RT-0a`/`RT-0b` |
| the two new rows **`RT-0a`/`RT-0b`** | `tests/ui-leg-contract.test.ts` | **ADDED** — the `F-1` regression pair; the census becomes `59` = `18` non-`RT` + `41` `RT` | `B6-6`, `B3-5`, `B7-1` |
| **`G-12`** (the `SIGINT`/`SIGTERM` matrix rows) | this file; `docs/pending.md` §F | **TRACKER-ONLY, leg-owned** — recorded, nothing owed by this pass | `B6-5`, AMENDMENT BLOCK 8 |
| the npm-shim **integrity check** | this file; `docs/pending.md` | **STILL RECOMMENDED, NOT IMPLEMENTED — and the row's trigger has now been TOUCHED** (`scripts/electron-spawn.mjs` was edited by this fix), so the parked item is **LIVE** | `B4-3` |

## AMENDMENT BLOCK 7 (`U-REALDOM-BOOT`, 2026-09-27, SEVENTH pass) — **the per-unit DOCUMENTATION REVIEW's corrections**

> **WHAT THIS BLOCK IS.** The **per-unit documentation review** (`AGENTS.md` item 10d / RCA-6) applied
> **as a gate**: it reconciled this file against the actual build and **fixed the stale entries in the
> same pass**. **Two corrections are factual** (the greens ledger's row-count census, and the
> documentation duty's discharge); **the rest are ANCHOR REMAPS** (~`30` stale line citations moved by
> the landed edits) — **status/annotation only: no normative clause of this file is amended by this
> block.** **Reconstruction note: the as-written prose is lost; the two corrections, the anchor-count,
> the docstring contradiction, the `N-9` pointer and the owed-adversarial restatement are rebuilt from
> `docs/next-steps.md`'s `COULD NOT RECONCILE` list and `WAVE-C UPDATE`'s closure row,
> `docs/specs/ci-ui-leg-greens.md`'s dated-count pointer, `docs/decisions.md` note 13 and
> `docs/FORKER.md`.**

| # | Item | Content |
| --- | --- | --- |
| **`B7-1`** | **FACTUAL CORRECTION 1 — the greens ledger's row-count census** | **`B3-5`'s claim — the retry's file holds `57` rows, `39` of them `RT` — is CORRECTED to the measured `59` rows = `18` non-`RT` + `41` `RT`.** *(As reconstructed this row cited **`B3-MS-1`**, an id that **does not exist** in this file — the census cell is **`B3-5`**; fixed 2026-09-27 by the RECONSTRUCTION-VERIFICATION proofreader pass, no claim changed.)* The delta is the **`F-1` fix's `RT-0a`/`RT-0b`**; with the **`9`** seam rows in `tests/ui-leg-seam.test.ts`, **the unit's set is `68/68` green.** **The as-filed figure is kept marked in place at `B3-5`** so the drift is auditable, and the corrected figures are the ones a later pass must quote. *(The same correction closes the review's own `COULD NOT RECONCILE` item (i) — see `docs/next-steps.md`'s closure row, which names `B7-1` as the spec-side fix.)* **⟶ SUPERSEDED-AT-ITS-SITE 2026-09-27 (the RECONSTRUCTION-VERIFICATION proofreader pass): this correction's `59`/`9`/`68/68` is the PRE-`G-4` census and is now stale — the landed tree reads `66` rows in `tests/ui-leg-contract.test.ts` (`59` clause rows + the `7` `G-4` falsifiability rows) and `11` in `tests/ui-leg-seam.test.ts`, i.e. `66 + 11 = 77` rows / assertions. The correction above was right when it was written (`59 = 18 non-RT + 41 RT` remains exactly true of the clause set) and is kept as the dated record; the CURRENT figures are stated in §3.5's landed-count note and §3.7's row ledger. `docs/next-steps.md`'s closure row and `docs/pending.md` §F still carry the older `68/68` — REPORTED here, not edited by this file.** |
| **`B7-2`** | **FACTUAL CORRECTION 2 — the retry knobs' documentation duty is DISCHARGED** | **`RT-4` items 2–3 require the two operator knob names to be recorded "in the leg and in `docs/decisions.md`".** The leg half was met at landing; the **`docs/decisions.md` half was NOT** — the blind run measured **`grep -c PROVIDENT_UI docs/decisions.md` = `0`** (its FAIL row `RT-08`), which is what made the retry rows **non-drivable from documentation alone**. **The record now exists:** `docs/decisions.md`'s `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED` row carries the two names *(`PROVIDENT_UI_BOOT_ATTEMPTS` — default `4`, range `1`–`4`, the operator may LOWER and never RAISE; `PROVIDENT_UI_BOOT_TIMEOUT_MS` — default `30 000 ms`, range **≥ `1 ms`**; **a malformed value of either ⇒ a PROGRAMMING ERROR ⇒ exit `1`, before the precondition and before any boot — never a silent clamp, never a fallback to the default**)*, with its trailing note 9 recording the duty's discharge. **`RT-08` is therefore CLOSED.** |
| **`B7-3`** | **THE ANCHOR REMAP (~`30` stale line citations)** | The landed edits (the `"ui"` key, the helper extraction, the seam, the retry, the `F-1` fix) moved **~`30`** line citations this file carries. **They are ANCHORS, not contract claims:** each remap is recorded **in place at its own site** as a dated note, and **no clause's meaning, number or pass condition changes**. The remaps already carried in the base, for the record: `scripts/electron-divergence.mjs`'s `187` → one line shorter (§8 `N-5`, §5.4's anchor note: the bare `failures += 1` `:148`→`:147`, the summary `:181`→`:180`, the `ok(...)` call `:146`→`:145`, the eight comparisons `:165`–`:172`→`:164`–`:171`, the off-green `else` `:174`→`:173`); `package.json`'s `:8-20`→`:8-21` (§2 item 3, §8 `N-8`) and `:25-31`→`:26-32` (§5.5). **A later pass must re-read any citation it depends on rather than trust the anchor.** |
| **`B7-4`** | **The findings of this review (item 1 = a DOCSTRING CONTRADICTION; item 3 = the adversarial record restated as OWED)** | **Item 1 — CONTRADICTION (reported; owner: the leg's comments):** the shared helper's **`cleanupScratch` "PROCESS GROUP" docstring contradicted the landed implementation** — the process-group (`detached: true`) approach was **tried and BACKED OUT** (`B6-3`: it regressed the SDK stdio transport, `R13 RESULT: 1 checks, 2 failures`), so a docstring (or comment) still describing a *process group* described behaviour the file does not have. **FIXED with the other stale `scripts/**` comments** (see `B8`'s `G-13`). **⟶ FILENAME CORRECTED IN PLACE 2026-09-27 (the RECONSTRUCTION-VERIFICATION proofreader pass):** the docstring in question is the **`cleanupScratch` docstring in `scripts/electron-ui.mjs`** (it narrates why the cleanup order is the fix and records that the `detached: true` + process-group route was tried and **BACKED OUT**), **not** the shared helper's — the helper (`scripts/electron-spawn.mjs`) carries its own `liveChildren`/`cleanupProfiles` notes with the same history. **The finding, its FIXED disposition and `G-13`'s `scripts/**` third are unchanged; only the file named here was wrong.** **Item 2 —** the review's reconciliation of **§3a/§3b's `OWED` status**: recorded in the DONE record **as-is, both halves stated** rather than smoothed (`docs/decisions.md` `ADVERSARIAL-PASS-RECORD-VS-CLOSURES`). **Item 3 — the adversarial pass restated as OWED:** this review **restated** that the unit's **adversarial pass record was still owed** (§3a/§3b `OWED`), *not* that the pass had run. **⟶ SPENT 2026-09-27 (the eighth pass): the pass RAN and its record is AMENDMENT BLOCK 8** — this item is the record of the review's state, and it is superseded by that block, not deleted. |
| **`B7-5`** | **The `N-9` pointer (the review's own citation debt)** | The review's correction list names **`B7-1`/`B7-2`/`N-9`**, and the blind-greens record cites **§8 `N-9`** as the entry carrying the run's as-filed summary. **`N-9` is NOT reconstructable** from the surviving records (see the RECONSTRUCTION NOTE at the head of this file and §8's `N-9` gap entry): **a later pass must take that record's figures from `docs/specs/ci-ui-leg-greens.md` directly**, whose §3 `CORRECTION NOTE` carries the corrected arithmetic (`32` = `24` PASS + `4` FAIL + `4` NOT-BLIND-RUNNABLE) and the re-runnable counting method. |
| **`B7-6`** | **What this review fixed and did NOT fix** | **FIXED in this pass:** `B7-1` (the census) and `B7-2` (the documentation duty), plus the `B7-3` anchors, plus the `scripts/**` comment staleness (`B7-4` item 1 / `G-13`'s third). **NOT fixed, reported with owners named:** **§4.2 `ADD-3`'s** *"before `app.whenReady()` resolves"* sentence (**owner: contract text — a clause correction is a ruling, not a record edit**) and **the same imprecision at `src/main/main.ts:58-62`** (**owner: the host seam**) — both are `G-13`'s other two halves in AMENDMENT BLOCK 8. |

### 3.7.7 `§8a` index append — AMENDMENT BLOCK 7

**APPENDED BY THE 2026-09-27 PER-UNIT DOCUMENTATION REVIEW (AMENDMENT BLOCK 7):**

| Row / clause (as appended) | Where it lives | Status | Lands at |
| --- | --- | --- | --- |
| **`B3-5`**'s `57`/`39` census *(**⟶ CITATION FIXED 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS:** as reconstructed this row cited **`B3-MS-1`**, an id that **does not exist** in this file — `AMENDMENT BLOCK 3`'s cells are `B3-1`…`B3-6`, and the census cell is **`B3-5`**. The same phantom id appeared twice more: this block's own heading item and `docs/next-steps.md`'s `DONE` record, where the **INVERTED red-first record is cited as `B3-MS-2`** but its cell is **`B3-2`**. **The ids are correct here; `docs/next-steps.md` is REPORTED, not edited from this file.** No count, claim or disposition changes.)* | AMENDMENT BLOCK 3 (marked in place); this file | **CORRECTED 2026-09-27 → `59` = `18` non-`RT` + `41` `RT`; unit set `68/68`** (the `68/68` is the pre-`G-4` census; **current: `66 + 11 = 77`**) | `B7-1`, `B3-5` |
| **`RT-4` items 2–3's `docs/decisions.md` half** | this file; `docs/decisions.md` | **DISCHARGED 2026-09-27** — the two knob names and their ranges/malformed rule are recorded; `RT-08` **CLOSED** | `B7-2` |
| **~`30` stale line anchors** | this file (§2 item 3, §5.4, §8 `N-5`/`N-8`, §5.5) | **REMAPPED 2026-09-27 — anchors only; no clause, row or number changed** | `B7-3` |
| the `cleanupScratch` **"PROCESS GROUP" docstring** | `scripts/electron-spawn.mjs` (comment) | **CONTRADICTION REPORTED, FIXED with `G-13`'s `scripts/**` third** — the process-group approach was backed out; the comment said otherwise | `B7-4` item 1; `G-13` |
| §3a/§3b's **`OWED`** status | §3a / §3b, this file | **REPORTED-AS-IS by the DONE record (both halves stated, never smoothed)** — and **SPENT later** by the eighth pass's record | `B7-4` item 2/3; AMENDMENT BLOCK 8 |
| **§8 `N-9`** | §8, this file | **CITATION DEBT — the entry is UNRECONSTRUCTABLE; a later pass must take its figures from `docs/specs/ci-ui-leg-greens.md` §3** | `B7-5`, §8's `N-9` gap entry |
| **§4.2 `ADD-3`** + `src/main/main.ts:58-62` (the `whenReady` imprecision) | this file; `src/main/main.ts` (comment) | **REPORTED, NOT REWRITTEN — owners named (contract text; the host seam)** | `B7-6`; `G-13` |

## AMENDMENT BLOCK 8 (`U-REALDOM-BOOT`, 2026-09-27, EIGHTH pass) — **the ADVERSARIAL PASS RECORD (`AP-1`…`AP-5`) + the landed findings `F-0`, `G-1`…`G-13`**

> **WHAT THIS BLOCK IS.** **The unit's adversarial pass's OWN RECORD** (`AGENTS.md` item 6 / RCA-3 —
> mandatory per completed unit, and the obligation §3a/§3b carried as `OWED`) **plus the findings table
> it produced.** **The `OWED` status lines in §3a and §3b are SUPERSEDED (struck in place) by this
> block — status supersession only: no normative clause of this file is amended, no seed is retired
> and no `NBR-*` row is re-dispositioned.** **Reconstruction note: the as-written prose of `AP-1`…`AP-5`
> and of each finding is lost; the verdict, the sweep, the evidence classes, `F-0`, and every finding's
> class and disposition are rebuilt from the surviving records —
> `docs/next-steps.md`'s `DONE — U-REALDOM-BOOT` adversarial cell + its `⟶ ADVERSARIAL-FIX PASS` note,
> `docs/decisions.md` (`ADVERSARIAL-PASS-RECORD-VS-CLOSURES`, `LEG-ENV-PREREQUISITES-ON-OWN-OBSERVATION`,
> `EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`, `TEST-MARKER-MUST-BE-THE-ASSERTION`), `docs/defects.md`,
> `docs/pending.md` §F, `docs/FORKER.md`, and `docs/specs/ci-ui-leg-live-status.md`'s header note.**

### `AP-1`. SCOPE AND EVIDENCE CLASS

**The pass ran READ-ONLY, in the unit's own terms, against the landed tree.** It swept **the whole
seed set of §3a — all `14` seeds `U-1`…`U-14` — and found NONE obsolete**; it examined the leg, the
helper, the seam, the precondition, the DISPLAY refusal, the exit-code vocabulary and the retry policy
in the terms of *edge cases / unauthorized access / malformed inputs*. **Every finding's evidence is
marked by class: `[READ]` = established by reading the tree; `[NOT-VERIFIED — no shell]` = asserted
reasoning that this pass did not run.** **The pass had no shell** (see `AP-3`).

### `AP-2`. VERDICT

**VERDICT: `FIT for its DONE row`** — with the four negative results stated, because they are the
verdict's content: **(i) no security escalation** (the seam relocates a file the operator already owns;
the `code` group is opt-in **only** inside the leg's own scratch store; `R0`(c) holds); **(ii) no
fabricated-measurement path** (a broken boot fails loudly; **never a `0`**, never a blank, never a
skip); **(iii) no retry that masks a failure** (the retryable set is signature-based; every `RT-2`
class stays non-retryable; exhaustion exits `1` with no measurement); **(iv) NO PACKAGE DEFECT — so no
`docs/HANDOFF.md` round is owed** for this unit (the `R13-HOST-FIX` precedent: **host-side findings are
fixed here, not handed off**). **The measurement record's `M-46` is NOT moved off `UNMEASURABLE`** —
its revisit condition remains `H-r10` / `U-DIVERGENCE-EXT`.

### `AP-3`. THE REPRODUCTION POLICY — **DESIGNED, NOT RUN**

**Each finding below carries a designed reproduction, and the pass RAN NONE OF THEM: the pass had no
shell.** The evidence classes are marked per finding (`[READ]` / `[NOT-VERIFIED — no shell]`), and
**this is recorded rather than smoothed** because a reader must know which findings were *read* and
which were *reasoned*. **The fixes' reproductions were run LATER, by the implementing passes** — those
measurements are quoted, attributed, at each finding's disposition (`A9`-class evidence) and in the
active trackers.

### `AP-4`. THE PROCESS FINDING `F-0`

| # | Finding | Class | Content and disposition |
| --- | --- | --- | --- |
| **`F-0`** | **The DONE row cited this record while it read `OWED` — citing an `OWED` record IS the RCA-3 defect** | process (record-integrity) | **THE FINDING:** the unit's `DONE` row cited `docs/specs/ci-ui-leg.md` §3a/§3b as its adversarial record **while those sections' own status line still read `OWED`** — i.e. *"no adversarial pass has run"*. **A DONE row that cites an `OWED` record is exactly the defect RCA-3 makes a review finding** (the cell claimed a pass the record denied). **DISPOSITION: CLOSED BY THIS RECORD.** The `OWED` status lines are **struck in place** (§3a/§3b), this block is the pass's record, and the findings below are the table the `OWED` disposition shape promised. **The general rule it produced is recorded at `docs/decisions.md` `ADVERSARIAL-PASS-RECORD-VS-CLOSURES`:** a unit's **findings** and its **review record** are **two different artifacts** and must be reported **separately, never smoothed into one** — here: *findings FIXED* **and** *the pass's own record landed later*. |

### `AP-5`. THE 14-ROW SEED SWEEP

**All fourteen seeds of §3a were swept; NONE was obsolete.** The dispositions below are the sweep's
record; where a seed's subject later became a named finding, the finding id is given.

| Seed | Swept? | Disposition of the sweep |
| --- | --- | --- |
| **`U-1`** (the seam as an attack surface) | yes | **HOLDS** — the override relocates a file the operator already owns; the seam adds no capability and widens no default group (`SEAM-4`) `[READ]`. Residual: none new (the `G-1` `DISPLAY` observation is a different concern) |
| **`U-2`** (default-profile contamination) | yes | **HOLDS — now OBSERVED, not asserted** (`G-2`): the `R0`(c) row carries a read-only operator-profile witness (directory existence + each store's presence/mtime/size, **never contents**), captured before the precondition and compared after |
| **`U-3`** (`code`-group leakage) | yes | **HOLDS** — `code` is enabled only by writing the leg's own scratch store; the real profile's store is neither read nor written (`SEAM-4b`) `[READ]` |
| **`U-4`** (overclaim smuggling) | yes | **HOLDS — after `G-3` was found and fixed**: the leg's `R4` printed a claim narrower than the clause it claimed (**and one of its phrases was FALSE of the source**, which legitimately contains the word *"packaged"* inside `HONEST_LIMITS`). The row now scans the leg's **CODE comment-aware for the honest-limits CALL-SITE SET** and **prints exactly what it checks** |
| **`U-5`** (fabricated zero) | yes | **HOLDS** — no path records `0`/blank on a broken boot; the failure is loud and exits `1` (`R2`'s stop condition, `RT-2` class 1 verified live: *"a completed boot with a bad row is not retried"*) |
| **`U-6`** (shim-word drift) | yes | **HOLDS** — the shim status word is **derived from the shim's own observation**, never a constant (`R3-fals`), and stays `UNSUPPORTED` |
| **`U-7`** (precondition bypass) | yes | **HOLDS** — a genuinely red precondition exits `2` with **no measurement and no retry** (verified live; `RT-8` item 2). **`G-1`'s residual** is the *reachability* of exit `3` on a no-X-server host, not a bypass |
| **`U-8`** (same-tree laundering) | yes | **HOLDS for its clause — with a NAMED residual `G-8`:** the `PRE-2` digest pair is taken **around the precondition**, exactly twice, and no retry re-takes it (`RT-8` item 4) — **but the window closes BEFORE the boots**, so a concurrent rebuild during the boots is undetected. **Parked with a revisit condition** (extending it would be a NEW clause, not a fix) |
| **`U-9`** (display refusal) | yes | **HOLDS after `G-1`** — the leg takes its **own** `DISPLAY` observation before the precondition spawns anything, and the divergence child no longer gets an injected default. **Named residual:** a display-less **no-X-server** host still exits `2` because the **PINNED** divergence leg manufactures `:0` for its own child — owner `PRE-4` / `U-DIVERGENCE-EXT`, parked |
| **`U-10`** (profile cleanup on every exit path, leftover recorded) | yes | **HOLDS — after the `F-1` closure** (spawn the BINARY + cleanup hook at creation): **`0` roots on every exit path**, checked immediately and after an `8 s` settle, `0` surviving Electron processes, the report matching the disk. **Residual `G-12`** (the matrix's own `SIGINT`/`SIGTERM` rows) is tracker-only |
| **`U-11`** (marker spoofability) | yes | **RUNTIME HALF HOLDS** — the discriminator is the **element/API provenance**, which the shim cannot produce (`R1-fals` reddens on a `typeof window` revert). **Residual `G-9`:** the probe's observations are not **pinned to the loaded envelope**, so a handler-shadowing mechanism could in principle answer the probe — **not reachable today**, parked with a revisit condition |
| **`U-12`** (helper-extraction regression) | yes | **HOLDS** — the divergence leg's vector/env/stdio/profiles are unchanged in the landed extraction and its `R13` arithmetic is intact (`N = 9`); `RT-9b`/`RT-9c` pin the leg-locality and the single-spawn rule |
| **`U-13`** (`counterPresent`-class substring copying) | yes | **HOLDS** — no assertion rests on a substring where a set/typed comparison is required; the `R4` static row was **strengthened** away from phrases onto the call-site set (`G-3`), and the `R3` word is derived (`R3-fals`) |
| **`U-14`** (the retry as a masking mechanism) | yes | **HOLDS** — this is the seed whose subject the verdict's clause (iii) answers: **no retry that masks a failure.** Every `RT-2` class stays non-retryable and consumes no attempt; exhaustion exits `1` with **no measurement**; a retried green is **labelled** and must still satisfy every `R0`–`R4` row; retries may not multiply measurements. *(Seed prose reconstructed; see §3a's `U-14` entry.)* |

### The findings table — `G-1`…`G-13`, each with its CLASS and its DISPOSITION

**Class vocabulary (this unit's):** **host** (this repo's `scripts/**`, `src/**`, `tests/**`) ·
**contract** (this file) · **instrument** (the row/test apparatus) · **environment** · **package**
(`provident-ssr` — **none found**). **A package finding would have owed a `docs/defects.md` +
`docs/HANDOFF.md` round; there is none, so no round is owed.**

| # | Finding | Class / severity | Evidence | Disposition |
| --- | --- | --- | --- | --- |
| **`G-1`** | **Exit `3` was unreachable through `npm run ui` on a display-less host.** The leg's precondition spawn injected **`DISPLAY \|\| ':0'`** while the leg's own check read **raw `process.env.DISPLAY`** — so the precondition could **manufacture a display the operator lacks**, and the leg's DISPLAY refusal was decided on a value the leg had itself fabricated for its child. | host (`scripts/`) · **MED** | `[READ]` (no shell) | **FIXED.** The leg now takes **its OWN observation of the operator's `DISPLAY` BEFORE the precondition spawns anything**, and the **divergence child no longer gets an injected default**. **§3.1's DECISION order (precondition → display) and `PRE-1`/`PRE-3`/`RT-8` item 2 are intact**, and the red-precondition branch prints a **`G-1` diagnostic note — diagnostic only** (no exit code, no verdict, no measurement moves). **MEASURED, kept exact:** on **this** host (a real X server answers at `:0`) `env -u DISPLAY npm run ui` exits **`3` BOTH before and after** — **the recorded defect expected `2` and did not reproduce here**, because the manufactured `:0` is live; **the 2-vs-3 regime needs a host with no X server at all**, reproduced separately (**`ELECTRON_RUN_AS_NODE=1` ⇒ red precondition ⇒ exit `2`**, `PRECONDITION-FAILED`, the **`G-1` note**, `NO MEASUREMENT TAKEN`, **`0` roots**). **NAMED RESIDUAL (owner: the divergence leg's `PRE-4` / `U-DIVERGENCE-EXT` — explicitly NOT this unit's):** a display-less host with **no X server** still exits `2`, because the **PINNED** divergence leg manufactures `:0` **for its own child** — parked at `docs/pending.md` §F with its revisit condition. **General rules promoted:** `docs/decisions.md` `LEG-ENV-PREREQUISITES-ON-OWN-OBSERVATION`; `docs/defects.md` `UI-LEG-DISPLAY-PRECONDITION` (**CLOSED** host-side) |
| **`G-2`** | **`R0`(c) printed an UNOBSERVED claim.** The row's output asserted that neither boot touched the developer's persisted store while the row itself **took no observation** capable of falsifying it. | host (`scripts/`) · **MED** | `[READ]` | **FIXED.** `R0`(c) now **OBSERVES what it prints**: a **read-only operator-profile witness** — **directory existence + each store's presence/mtime/size, NEVER contents** — captured **before** the precondition and compared **after**, printed in the row. **Falsified out of tree:** a real run prints `unchanged:true`; a simulated **write** ⇒ an mtime change; a simulated **creation** ⇒ presence `false→true`. **General rule:** `docs/decisions.md` `EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`; `docs/defects.md` `UI-LEG-EVIDENCE-ROW-OBSERVES-ITS-CLAIM` (**CLOSED**, consolidated with `G-3`). **New node rows:** `SEAM-R0(c)-a`/`-b` in `tests/ui-leg-seam.test.ts` |
| **`G-3`** | **`R4`'s executed row was NARROWER than it printed, and its text was FALSE.** The row's printed claim (*"no packaged-bundle reference, no packaged-mode detection claim"*) did not cover the clause's stated scope (*"no `webContents.executeJavaScript`/CDP call inside a shipped path"*), and the phrase-based scan was falsified by the source itself — **the leg legitimately contains the word `"packaged"` inside its `HONEST_LIMITS` statement.** | host (`scripts/`) · **MED** | `[READ]` | **FIXED.** The row now scans the leg's **CODE** (comment-aware) for the honest-limits **CALL-SITE SET** — **`app.isPackaged`**, **`webContents.executeJavaScript`**, **`webContents.debugger`** — and **prints exactly what it checks**. **Falsified:** the real source ⇒ **`0`** sites; a **comment** naming a site ⇒ **`0`** (no false red); a real **call site** ⇒ **`1`**, the row fails; the `HONEST_LIMITS` prose word *"packaged"* ⇒ still **`0`**. **Residual recorded (`G-4`'s pass):** the comment-stripping half is **unfalsifiable on the landed tree** (the raw source contains no joined call-site pattern) |
| **`G-4`** | **The `tests/**` rows could survive a revert of the behaviour they pin.** The Node rows stayed green after reverting the behaviour they assert, and the **`R1` row matched the STRUCK `typeof window` marker** — i.e. the row asserted a **marker** the contract had already superseded (the `M-1` re-pin), not the assertion. | host (`tests/**`) · **MED** | `[READ]` | **FIXED by the TestWriter (the fix pass's own routing).** The rows were **rebuilt to EXTRACT and RUN the leg's own predicates/producers** rather than match source text: **`+9` rows in the contract file and `+2` in the seam file** — the contract file's `RT-0a`/`RT-0b` and the six `*-fals` rows (`R0-fals`, `R0(c)-fals`, `R1-fals`, `R2-tally-fals`, `R2-frame-fals`, `R3-fals`, `R4-fals`) with the seam file at **`11`** — the unit's set now reading **`66 + 11 = 77` assertions** in the strengthened form, with a **`15`-mutation out-of-tree matrix** showing **each strengthened row reddens**. **General rule:** `docs/decisions.md` `TEST-MARKER-MUST-BE-THE-ASSERTION`. **One residual recorded:** the `G-3` comment-stripping is **unfalsifiable on the landed tree** (no joined call-site pattern exists in the raw source) |
| **`G-5`** | **The `provident-modules.json` half is runtime-uncovered.** The module store's relocation is asserted by the seam rows/`R0`, but no **runtime** observation covers that store the way the security store's witness (`G-2`) covers its half. | instrument · **LOW** | `[READ]` | **TRACKER-ONLY (recorded; nothing owed by this pass)** — the end state is safe as measured; recorded so the asymmetry is not read as coverage |
| **`G-6`** | **A TDZ-unsafe guard in the exit hook.** The `typeof activeBoot !== 'undefined'` guard introduced by the `F-1` fix (`B6-3`) could be evaluated **before the declaration was initialised** — a temporal-dead-zone `ReferenceError` on an exit that happens during module evaluation, i.e. the guard could abort **before** `recordCleanup()`. | host (`scripts/`) · **LOW** | `[READ]` | **FIXED STRUCTURALLY.** **The declarations now precede the hook** (`activeBoot` and `cleanupReported` are declared **before** `process.on('exit')` is registered), so the hook cannot abort before `recordCleanup()`. **Residual case parked** (an exit during module evaluation *before* the declarations — `docs/pending.md` §F, with its revisit condition) |
| **`G-7`** | **The leg printed the PINNED ceiling even when the operator's configuration made the effective ceiling different.** With the timeout knob raised, the printed ceiling no longer described the run. | host (`scripts/`) · **LOW** | `[READ]` | **FIXED.** The leg prints the **EFFECTIVE** per-boot ceiling for the **current configuration**, **with its derivation** — e.g. **`181750 ms for THIS configuration`** when the timeout knob is raised — and **states that the timeout knob is unbounded above**; it also notes when the configuration differs from the pinned default |
| **`G-8`** | **The `PRE-2` digest window closes BEFORE the boots**, so a **concurrent rebuild** during the boots is undetected by the same-tree identity clause. | contract/design boundary · **LOW** | `[READ]` | **PARKED with a revisit condition** (`docs/pending.md` §F, owner: the leg). **The clause's window is as designed** — the hazard is a reader taking `PRE-2` to cover the boot window. Extending it (a **third** digest after the boots) would be a **new clause**, not a fix. Revisit: a shared/CI host, a watcher, or a concurrent `npm run build` |
| **`G-9`** | **Probe observations are NOT PINNED to the LOADED envelope** — a handler-shadowing mechanism could in principle satisfy `R1`/`R2` without the leg's own probe producing them. | host (`scripts/`) + instrument · **LOW** | `[READ]` | **PARKED, NOT REACHABLE TODAY** — it is the residual of `U-11`/`U-13`; the sweep found the runtime half **holds** and the discriminator is the element/API provenance. **Revisit condition:** a scenario-envelope channel, a **second** envelope in the boot (`H-r10`'s channel, `U-DIVERGENCE-EXT`), or any new path that can write the probe node's `content` — at which point the row must **name which envelope it read** |
| **`G-10`** | **`R0`(a)/(b) compare the SAME envelope across two boots** — a **weaker isolation claim than the row reads**: they show **boot-to-boot stability**, not isolation across **different** graphs. The isolation claim is actually carried by **`R0`(c)**. | contract/instrument · **LOW** | `[READ]` | **TRACKER-ONLY, no code change owed** — the row's **claim** should **name which half carries isolation**. Routed with `G-4` (same edit surface, owner: the TestWriter) |
| **`G-11`** | **The shim battery-host and the divergence child sit OUTSIDE the helper's cleanup** — they do not get the `F-1` fix's delete-and-verify + recorded-report treatment (**split: leg half / inherited half**). | host (`scripts/`) + inherited · **LOW** | `[READ]` | **END STATE SAFE AS MEASURED** (`0` roots in every case; the divergence leg leaves `0` roots; no profile is written by those two paths) ⇒ **tracking row, not a defect.** **Leg half: the leg owner; inherited half: `U-DIVERGENCE-EXT`** (`RT-9`(a) discipline). **Revisit:** any pass that spawns a profile-writing process outside the helper, or a measured leftover attributable to those paths |
| **`G-12`** | **The leg's exit-path matrix lacks explicit `SIGINT`/`SIGTERM` rows.** The cleanup hook is registered for the signals and is idempotent, but **the matrix's own rows do not name them** — so the `F-1` closure's matrix is not exhaustive over the signals it claims. | host (`scripts/`) · **LOW** | `[READ]` | **TRACKER-ONLY, leg-owned** — recorded (the `B6-4` matrix's missing signal rows); nothing owed by this pass |
| **`G-13`** | **Stale text in three places.** (i) the shared helper's **`cleanupScratch` "PROCESS GROUP" docstring** contradicted the landed implementation (the process-group approach was **backed out** — `B6-3`); (ii) this file's **§4.2 `ADD-3`** sentence *"before `app.whenReady()` resolves"* states the ordering constraint imprecisely; (iii) the same imprecision appears at **`src/main/main.ts:58-62`**. | host (`scripts/**`, `src/**`) + contract · **LOW** | `[READ]` | **SPLIT.** **The `scripts/**` third (i) is FIXED** (with the other stale comments — the precondition-ordering comment and the divergence-leg comment); **the other two halves are REPORTED, NOT REWRITTEN, with owners named:** **§4.2 `ADD-3` — owner: contract text (a clause correction is a RULING, not a record edit)**; **`src/main/main.ts:58-62` — owner: the host seam**. See §4.2's landed-spelling note and `B7-6` |

**What this block does NOT do — stated so the record's honesty is preserved.** **It converts no row of
§3a/§3b into a pass, retires no seed, and re-dispositions no `NBR-*` row.** **The two live-battery
findings this cycle also carries (`F-1`, `F-2`) are NOT re-opened here** — they are `F`-class
*implementation* findings **CLOSED by their own passes** (AMENDMENT BLOCKS 6 and 5), and `F-0` above is
this pass's own **process** finding. **`G-4` was ROUTED, and the routing was SPENT** (the TestWriter's
re-point landed, `+9`/`+2` rows, the `15`-mutation matrix) — **with one residual on record** (the
`G-3` comment-stripping is unfalsifiable on the landed tree). **No package defect was found, so no
`docs/HANDOFF.md` round is owed and no upstream issue exists** for this unit.

### `§8a` index append — AMENDMENT BLOCK 8

**APPENDED BY THE 2026-09-27 ADVERSARIAL PASS + ITS FIX PASS (AMENDMENT BLOCK 8):**

| Row / clause (as appended) | Where it lives | Status | Lands at |
| --- | --- | --- | --- |
| §3a's **`OWED`** status (*"no adversarial pass has run"*) | §3a, this file (**SUPERSEDED-IN-PLACE**, struck at its own site) | **SUPERSEDED 2026-09-27 (eighth pass)** — the pass RAN read-only, swept **all `14` seeds `U-1`…`U-14`** with none obsolete, verdict **`FIT for its DONE row`**. **Status supersession only; no normative clause amended, no seed retired** | §3a's struck status; `AP-1`…`AP-5` |
| §3b's **`OWED`** status + its *"owed disposition table"* | §3b, this file (**SUPERSEDED-IN-PLACE**, struck at its own site) | **SUPERSEDED 2026-09-27** — the **landed findings table** (`F-0`, `G-1`…`G-13`) replaces the owed shape; the inherited-rows list reconciled with post-fix statuses | §3b's struck status; the findings table above |
| **`U-14`** (the seed set's fourteenth entry) | §3a, this file | **CONFIRMED SWEPT, NONE OBSOLETE** — the sweep table carries `U-1`…`U-14`; **its as-written prose is UNRECONSTRUCTABLE and is marked at its entry** | §3a's `U-14` entry; `AP-5` |
| **`F-0`** (the DONE row cited an `OWED` record) | this block; `docs/decisions.md` `ADVERSARIAL-PASS-RECORD-VS-CLOSURES` | **CLOSED BY THIS RECORD** — the `OWED` lines are struck and the record landed; the general rule (findings vs record, reported separately) is ACTIVE | `AP-4` |
| **`G-1`** (MED) | `scripts/electron-ui.mjs` (leg's own `DISPLAY` observation); §6 | **FIXED** + named residual parked (the no-X-server `2`-vs-`3` regime; owner `PRE-4`/`U-DIVERGENCE-EXT`) | `G-1`; §6's `G-1` note; `docs/defects.md` `UI-LEG-DISPLAY-PRECONDITION` |
| **`G-2`** (MED) | `scripts/electron-ui.mjs` (`R0`(c) witness); §3.0 `R0`(c); §3.5 | **FIXED** — the row observes what it prints; new node rows `SEAM-R0(c)-a`/`-b` | `G-2`; §3.5's landed-count note |
| **`G-3`** (MED) | `scripts/electron-ui.mjs` (`R4` call-site scan); §3.0 `R4` | **FIXED** — the row scans CODE for the call-site set and prints exactly what it checks; one residual (the comment-stripping is unfalsifiable on the landed tree) | `G-3`; `G-4`'s residual |
| **`G-4`** (MED) | `tests/**` | **FIXED by the TestWriter** — rows rebuilt to **extract and RUN** the leg's predicates/producers; `+9` contract / `+2` seam; **`66 + 11 = 77`**; a `15`-mutation out-of-tree matrix | `G-4`; `docs/decisions.md` `TEST-MARKER-MUST-BE-THE-ASSERTION` |
| **`G-5`** (LOW) | instrument | **TRACKER-ONLY** | `G-5` |
| **`G-6`** (LOW) | `scripts/electron-ui.mjs` (declarations before the hook) | **FIXED structurally**; residual case parked | `G-6`; `docs/pending.md` §F |
| **`G-7`** (LOW) | `scripts/electron-ui.mjs` (effective ceiling + derivation) | **FIXED** — e.g. `181750 ms for THIS configuration`; the knob is unbounded above | `G-7` |
| **`G-8`** (LOW) | `PRE-2`'s window (§5.1) | **PARKED, revisit-conditioned** — extending it is a NEW clause | `G-8`; §5.1's note; `docs/pending.md` §F |
| **`G-9`** (LOW) | the probe's envelope pinning | **PARKED, not reachable today** — the residual of `U-11`/`U-13` | `G-9`; §3a's `U-11` note |
| **`G-10`** (LOW) | `R0`(a)/(b)'s claim | **TRACKER-ONLY** — routed with `G-4` (owner: the TestWriter) | `G-10` |
| **`G-11`** (LOW) | the battery host + divergence child's cleanup | **SPLIT** — leg half leg-owned; inherited half `U-DIVERGENCE-EXT` | `G-11`; `B6-5` |
| **`G-12`** (LOW) | the exit-path matrix's signal rows | **TRACKER-ONLY, leg-owned** | `G-12`; `B6-4`/`B6-5` |
| **`G-13`** (LOW) | the helper docstring + §4.2 `ADD-3` + `src/main/main.ts:58-62` | **SPLIT** — the `scripts/**` comments FIXED; the other two halves **REPORTED, NOT REWRITTEN, owners named** | `G-13`; §4.2's landed-spelling note; `B7-6` |
| **`M-46`** | `engine-drift-measurements.md` | **NOT MOVED — stays `UNMEASURABLE`**; revisit condition remains `H-r10` / `U-DIVERGENCE-EXT` | `AP-2`; §8 `N-6` |
| **`docs/HANDOFF.md`** | the handoff document | **NO ROUND OWED** — no `provident-ssr` package defect was found; every finding is host-side and fixed here | `AP-2`; `G-*` dispositions |
| **`docs/next-steps.md`'s DONE row adversarial cell** | tracker | **TRACKER-OWNED — NOT EDITED FROM HERE.** The cell cites **this record** and reports both halves (findings fixed · record landed); its reconciled cell + dated `⟶ ADVERSARIAL-FIX PASS` note are the reader's citation | `AP-4`; `docs/next-steps.md` |
| **the unit's `DONE` status** | `docs/next-steps.md`; `docs/decisions.md` `U-REALDOM-BOOT-COMPLETE-ON-EVERY-DECLARED-LEG` | **UNCHANGED BY THIS BLOCK** — the pass's verdict `FIT for its DONE row` **does not move** the status, and **no leg result moves** (`npm test` `58` files / **`863`** passed / `2` skipped / `0` failed · typecheck clean · build clean · battery **`184/0`** · divergence **`R13 RESULT: 9 checks, 0 failures`** · `npm run ui` **exit `0`**, **`11/11`**, **`427x22`**, **`retries=0`**) | `AP-2`; `docs/next-steps.md` |

---

## CLOSING NOTE OF THE RECONSTRUCTION (2026-09-27) — what a later pass must do with this file

**This file now carries the base recovered from version control (676 lines, unedited) followed by the
rebuilt AMENDMENT BLOCKS 2–8 and their `§8a` index appends.** **Three duties are owed by the next pass
that touches this file, and they are named here rather than left implicit:**

1. **RE-VERIFY the reconstructed blocks against the tree.** They are the session's **measured records**,
   rebuilt — **not a fresh measurement**. A pass with a shell should confirm the load-bearing literals
   (the `121 750 ms` derivation and the leg's printed ceiling; `PROVIDENT_UI_BOOT_ATTEMPTS` default `4`
   / range `1`–`4`; `PROVIDENT_UI_BOOT_TIMEOUT_MS` default `30 000 ms`; the backoff table
   `250`/`500`/`1000`; the `RT-7` marker's interpolation; the `RT-6` label shape; `RT-0a`/`RT-0b`'s
   presence) against `scripts/electron-ui.mjs`, `scripts/electron-spawn.mjs` and the two test files.
   *(**⟶ DISCHARGED 2026-09-27 BY THE RECONSTRUCTION-VERIFICATION PROOFREADER PASS — see the
   VERIFICATION NOTE at the head of this file.** Every literal named above was re-checked against the
   landed tree and **holds**; the pass's two substantive corrections (`M-1`'s `R1` residual, the
   row-count census), its **anchor remaps** and its **unresolved `676`-line base-count discrepancy** are
   recorded in that note. **The residual half of this duty is the base-count question only:** a pass with
   a shell must run `git show HEAD:docs/specs/ci-ui-leg.md | wc -l` and a structural diff, which the
   verification pass could not do.)*
2. **CLOSE THE `N-9` GAP** (§8's `N-9` entry) if the blind-greens record's as-filed summary needs a
   home in THIS file — its figures live at `docs/specs/ci-ui-leg-greens.md` §3.
3. **KEEP THE CONVENTION.** Nothing in this file may be renumbered, no base line may be rewritten, and
   any further change lands as **a new amendment block with its own `§8a` index append**, in **append
   mode** — which is the rule the damage that forced this reconstruction exists to enforce.
