# Provident-Electron — Work Queue

Maintained by the document-archival loop (AGENTS.md item 6). Open work on
top; finished items move to the tracker rows they produced. This queue is
this repo's local next-steps (the upstream queue lives in
`../Preempt-Providence/docs/next-steps.md`).

Historical pass records are archived in the gitignored `archive/` dir and do
not ship in a fork (see `docs/FORKER.md` §1/§5).

## CURRENT WORK / HANDOVER STATE — `U-ENGINE-PIN` is **DONE (2026-09-27)**: every leg its spec declares is GREEN, including the **live** `npm run divergence` leg (state as of 2026-09-27, the supervisor's DONE pass)

**The unit-status and execution-log paragraphs this block used to carry have been ARCHIVED**
(gitignored): `archive/next-steps/2026-09-27-engine-pin-pre-green-handover.md` (the wave-A
execution log + the 5-row blocker record, verbatim) and
`archive/next-steps/2026-09-27-engine-pin-pre-execution-state.md` (the doc-only pass's
"PARTIALLY LANDED" status paragraph). **Never cite this file by line** — cite the section
names below or the archived snapshots.

**Live status (the authoritative record for the wave-A unit):**

> **⟶ SUPERSEDED BY THE DONE PASS (2026-09-27) — read it as history, not as live status.**
> **The unit is `DONE` on every leg its spec declares; the record is the `U-ENGINE-PIN` DONE
> record immediately below.** The six numbered items in this block are the **wave-A
> doc-review** snapshot: item 1 is **superseded by the DONE row's legs** (same trio/battery
> numbers, now with the divergence leg green); item 2's **"THE LIVE LEG IS NOT PASSED"** is
> **superseded** — the supervisor landed the harness spawn fix and the leg is green
> (`R13 RESULT: 9 checks, 0 failures` on the **post-change** tree); item 3's
> `LIVE-OP-REJECT` **finding was ADJUDICATED, then FIXED + LIVE-VERIFIED (2026-09-27)** — a
> **HOST-owned, pre-existing** defect (`docs/defects.md`, now in that file's `## FIXED (in this
> repo)` section: the renderer IPC unwrap, pinned by `tests/op-command-unwrap.test.ts`
> `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`, live status flipped `rejected` → `applied`), **outside this
> unit's scope and never a blocker for its declared legs**; item 4 still binds (the `PF-*` pane rows stay node-layer; the
> real-DOM attribute rows still need `U-DIVERGENCE-EXT`'s `H-r10` extractor); item 5 is
> discharged (**the doc review ran, and the DONE row is now written — this pass**); item 6
> still holds. The **historical ledger** line below this block is unchanged and still
> provenance only.

1. **`U-ENGINE-PIN` is GREEN on the node-suite / typecheck / build / battery legs — and NOT
   `DONE`, because its declared `npm run divergence` leg is NOT passed.** Legs measured:
   `npm test` **55 files / 789 passed / 2 skipped / 0 failed** *(the DONE-pass count — **⟶ 56
   files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**,
   which added `tests/op-command-unwrap.test.ts` — **⟶ 58 files / 822 passed / 2 skipped / 0
   failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**, which added
   `tests/ui-leg-contract.test.ts` + `tests/ui-leg-seam.test.ts` (27 rows); both earlier figures
   are kept as their dated counts and are NOT re-baselined)*; `npm run typecheck`
   clean; `npm run build` clean; `npm run battery` **184 checks / 0 failures**. The blind
   greens set (`docs/specs/engine-pin-greens.md`) is the **third** run: **104 rows — 96
   PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE** (+1 recorded, +2 restated). Code landed:
   `src/shared/dom-shim.ts` (`removeAttribute` with the `id` + `value` slot special cases),
   `src/renderer/runtime.ts` (`mutationPropsValid`, shape-only, kind-scoped to
   `state-slice`/`layer-apply`), `src/renderer/secure-panels.ts` (`paneMutationValid` with
   the `Array.isArray` guard first, + the public seam `applyPaneMutation`).
2. **THE LIVE LEG IS NOT PASSED (this is the gate).** `npm run divergence` — the repo's own
   driver, unmodified — **fails in this environment**: Chromium is denied `/dev/shm` + its GPU
   cache dir, the spawned Electron dies **SIGTRAP** after `renderer ready — MCP backend armed`,
   and the leg reports **`R13 RESULT: 1 checks, 2 failures`, exit 1**. Its last good run
   (**`R13 RESULT: 9 checks, 0 failures`**) is **PRE-CHANGE** and **cannot retire a live row**.
   A **scratch replication** of the same nine comparisons (spawn extended with
   `--disable-dev-shm-usage` **and** a temp `--user-data-dir`, script outside the repo) is
   **green on the post-change tree** (`SCRATCH RESULT: 9 checks, 0 failures`) — that is
   **evidence, NOT the gate**. The fix lives in `scripts/electron-divergence.mjs`'s spawn and
   belongs to **`U-DIVERGENCE-EXT`, NOT to this unit**; then the architect runs
   `npm run divergence` for the gate. Full record: `docs/specs/engine-pin-live-status.md`.
3. **⛔ OPEN FINDING — `LIVE-OP-REJECT` (must be adjudicated before the DONE row).** **⟶ SUPERSEDED 2026-09-27: it was adjudicated as a HOST-owned, PRE-EXISTING defect and it is now FIXED + LIVE-VERIFIED** (`docs/defects.md`'s `## FIXED (in this repo)` section; `tests/op-command-unwrap.test.ts` `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`; live status flipped `rejected` → `applied`) — the paragraph below is the snapshot's own text, kept for provenance. On the
   **assembled app**, `provident.op` returns **`{status:'rejected'}` for every mutation shape**
   — including well-formed ones — while the **shim battery host applies the identical call**.
   Not a targeting/gate/value artefact (`docs/specs/engine-pin-live-status.md` §5, with the
   reproductions). The greens' `PA-*`/`P*`/`E-11` rows ran on the **`Runtime` bundle under
   node**, never over the app's IPC/MCP transport, so they are **envelope-green and
   contradicted live**. The **handler-originated** route (outside the guard's declared
   boundary) **does** work live. Per the live-runner contract this is a **finding, never a
   pass**; attribution is **not established**. **The architect adjudicates** (live regression →
   host fix + regression row here; or a greens layer correction). **⟶ RESOLVED 2026-09-27: the
   architect's direction was the FIRST branch — the host fix + a regression row over the IPC hop;
   both landed** (`docs/decisions.md` `LIVE-OP-REJECT-CLOSED`).
4. **Not exercisable at this layer (recorded, not a gap):** `SecurePanels.applyPaneMutation` is
   renderer-side only (no IPC, no MCP tool, no group) — the `PF-*` rows stay node-layer; and
   the real-DOM **attribute** rows still need `H-r10`'s extractor (`U-DIVERGENCE-EXT`).
5. **The DONE row is the SUPERVISOR's** (AGENTS.md item 6/10d); the unit's per-unit
   documentation review (RCA-6) has RUN — record:
   `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md` (findings landed in these
   trackers, not in the archive).
6. **Housekeeping:** `.cache/` inside the workspace holds the Electron download cache (already
   gitignored, `.gitignore:96`); no other scratch state was left behind.

**Historical ledger (kept for provenance, not re-measured here):** the three red cycles ran
**79 assertions / 61 red / 18 green-not-red** (cycle 1, against the pre-amendment contract),
then **101 pass / 9 fail of the amended 110-row set** (cycle 2), then the `PF-2`/`PF-4` pair
(cycle 3, discharged by amendment block 6's `§2.2.1` `value`-slot clear); the pre-existing
suite baselines quoted along the way were **658 / 2 skipped** (pre-jump), **737** and **697**
and **759** passed — all superseded by the lands-green **789 passed / 2 skipped / 0 failed** *(the DONE-pass count; **⟶ 56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**; **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**)*.

## DONE — `U-ENGINE-PIN` (2026-09-27, the supervisor's DONE pass)

**The DONE row's facts, in prose (authoritative — the table below is the same record in row form;
cite this paragraph when the row's tail is display-truncated).** **RED, per cycle, each RUN and
REPORTED before implementation (RCA-1):** cycle 1 — **79 assertions / 61 red → green**; cycle 2 —
the amended **110-row** set, **36 red → 101 green**, then the 9 residual reds **adjudicated into
5 dispositions**; cycle 3 — the **`PF-2`/`PF-4` pair (3 red) → green**. **GREEN, on the FINAL
tree:** `npm test` **55 files / 789 passed / 2 skipped / 0 failed** *(the DONE-pass count — **⟶ 56
files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**, which
added `tests/op-command-unwrap.test.ts` — **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the
2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**, which added this unit's two `ui`-leg test files
(27 rows); the other four legs re-measured unchanged)*; `npm run typecheck` clean;
`npm run build` clean (5 bundles); `npm run battery` **184 checks / 0 failures**; `npm run
divergence` → **`R13 RESULT: 9 checks, 0 failures`** (Electron 44.4.5, node 24.21.0) — the
supervisor ran it on the **POST-CHANGE** tree, after landing the **harness spawn fix**
(`scripts/electron-divergence.mjs`: `--disable-dev-shm-usage` + a fresh scratch
`--user-data-dir` per spawn, **both required**; a harness change **outside** this unit's §5.1
scope; discharges `ci-divergence-leg.md` §1's hermeticity clause; **N=9 intact**;
**`U-DIVERGENCE-EXT` inherits it**). **ADVERSARIAL:** **14 findings — 2 BLOCKING, 6 RESHAPE,
6 ADVISORY**; the blocking pair is (A) the seam's `applied` documented wrong and (B) the pane
predicate's missing `Array.isArray` guard; landed dispositions are `M9`, the derived `applied`,
the re-pinned `PA-9`/`PA-10`, the `RemoveAttribute('value')` special case, and the
`secure-panels.md` §2a disclosure. **BLIND GREENS:** **104 rows — 96 PASS / 0 FAIL /
5 NOT-BLIND-RUNNABLE** (earlier runs 65 / 62 / 3 NBR, then 100 / 90 / 6 FAIL / 4 NBR; every
earlier FAIL re-driven to PASS after the contract was corrected to measured reality).
**DOC REVIEW:** `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`. **`LIVE-OP-REJECT`:**
**FIXED + LIVE-VERIFIED (2026-09-27)** — HOST-owned, pre-existing (the renderer IPC unwrap), filed
in `docs/defects.md` and now in that file's `## FIXED (in this repo)` section, **no HANDOFF row
owed** (it was never a package defect). It was **not** cleared by the R13 leg (which never calls
`provident.op`); it was cleared by the one-line renderer unwrap (`src/renderer/renderer.ts:43`),
verified **in-node** by `tests/op-command-unwrap.test.ts` (**`S1`** the RED row that pinned the
defect — pre-fix verbatim `expected { command: { kind:'state-slice', … } } to be { kind:'state-slice', … }`;
**`S2`** the non-destructive `?? req.payload` fallback; **`S3`** `load` stays raw; **`F1`/`F2`** the
fail-safe rows; **`S1b`** the one app-graph-changed push) and **live** by the same probe that
produced the defect (`{"status":"rejected"}` → `{"status":"applied","dirtied":["node-1"], …}`). **OWED,
test-side only:** the §7.12/§7.13 fixture-data items (`docs/pending.md` §D). **LAYER
ATTRIBUTION:** trio = **envelope/pure**; battery = the **shim host under node**; **only the
divergence leg is assembled-app evidence**, and it compares structural surfaces only.

**This is the ledger's FIRST `DONE` row. It supersedes `## OPEN` row **A** (moved out of the
`BLOCKED` table into this record — the row's blocker history is the `CURRENT WORK` block above
plus the archived pre-green snapshot `archive/next-steps/2026-09-27-engine-pin-pre-green-handover.md`;
the row is **not** deleted).** **Reader note on that moved row:** its cells are long enough that a
2000-character line cap truncates the tail in some viewers — **this DONE record is the
authoritative text for the unit's status**, and no tail fragment of the moved row is a live
claim.

**⚠ ROW-DISPLAY ARTIFACT (declared, not hidden).** The `U-ENGINE-PIN` DONE row below is a single
very long table line. Editing it hit this session's **file-write length cap**, which **truncated
a `write` mid-cell and left a duplicated adversarial fragment**; the row's cells therefore
display as cut off in some viewers and its tail is cosmetic. **Every fact the row carries is
recorded, complete and in prose, in the bullets above and in the files they name — cite THOSE,
not the row's tail:** the red-cycle ledger (bullet 1 of the DONE section), the adversarial
dispositions (`docs/specs/engine-pin.md` §3b + `docs/decisions.md`'s `U-ENGINE-PIN` sets), the
blind-greens arithmetic (`docs/specs/engine-pin-greens.md`'s status block + §6), the doc-review
record, all five measured legs (`docs/specs/engine-pin-live-status.md` §0/§7.2), the harness
spawn fix (`DIVERGENCE-SPAWN-FIX`), `LIVE-OP-REJECT` (`docs/defects.md` — **since FIXED + live-verified, 2026-09-27**), and the owed fixture
data (`docs/pending.md` §D). **No claim in this record depends on the row's untruncated form.** The unit's own spec is `docs/specs/engine-pin.md` (amendments
through block 7 + the `B-LANDED` reconciliation) with `docs/specs/engine-pin-greens.md` and
`docs/specs/engine-pin-live-status.md`; its decisions are `docs/decisions.md`'s
`ACTIVE — the U-ENGINE-PIN decision set` + `ACTIVE — the U-ENGINE-PIN DONE-pass decision set`.

| Unit | Wave | Red → green (RUN, per cycle) | Landing | Adversarial / blind greens / review | Legs (all run on the FINAL tree) |
| --- | --- | --- | --- | --- | --- |
| **`U-ENGINE-PIN`** — `provident-ssr` `^0.2.1` → **`^0.5.1`** + the scoped shim completion (`ShimElement.removeAttribute`, incl. the `id` **and** `value` slot clears) + the **shape-only** prop-mutation guard at both call sites + the pane seam `SecurePanels.applyPaneMutation`. **The unit is COMPLETE on every leg its spec declares.** | A (`A-d2` + `H-r7`) | **Three cycles, each red RUN and REPORTED before implementation (RCA-1):** cycle 1 — **79 assertions, 61 red → green** (56 of the reds were `TypeError: … removeAttribute is not a function`, on the pre-amendment contract); cycle 2 — the amended **110-row** set, **36 red → 101 green**, then the 9 remaining reds **adjudicated into 5 dispositions** (2 TEST-ONLY, 2 spec amendments + row relabels, 1 spec clause + one hunk); cycle 3 — the **`PF-2`/`PF-4` pair (3 red) → green**, discharged by amendment block 6's `§2.2.1` `value`-slot clear. | `src/shared/dom-shim.ts` `removeAttribute` (the `id` + `value` slot/store clears; `hasAttribute` deliberately **NOT** added), `src/renderer/runtime.ts` `mutationPropsValid` + `applyCommand`, `src/renderer/secure-panels.ts` `paneMutationValid` (**`Array.isArray` as the FIRST statement**) + the public seam `applyPaneMutation(nodeId, mutation)`. **One** new production surface (the seam; renderer-side only). | **Adversarial pass: 14 findings — 2 BLOCKING, 6 RESHAPE, 6 ADVISORY.** The blocking pair: **A** the seam's `applied` was documented wrong (it returned `applied:true` on a refusal) and **B** the pane predicate had **no `Array.isArray`** guard (a non-array batch threw `TypeError: mutation is not iterable`). Landed dispositions: **`M9`** (the new §3.6 row — a non-array batch is **REFUSED**, never a throw), the seam's `applied === (status === 'applied')`, `PA-9`/`PA-10` strengthened from tautologies to **pinned verdicts**, the `RemoveAttribute('value')` special case for `INPUT`/`TEXTAREA` (slot + store) with the wider `prop:value` / `css.value` scope recorded as the contract; §2a of `docs/specs/secure-panels.md` discloses the seam. PBT audit read-only: no row over-strong; coverage adequate except `P-SM-3`/`P-TP-1`'s list, fixed by `M9`. Blind greens run 3: 104 rows / 96 PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE. Doc review RUN: `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`. **Legs, all on the FINAL tree:** `npm test` **56 files / 795 passed / 2 skipped / 0 failed** (the unit's own 8 files + `tests/op-command-unwrap.test.ts`, the `LIVE-OP-REJECT` fix's row) · `npm run typecheck` clean · `npm run build` clean (5 bundles) · `npm run battery` **184 checks / 0 failures** · `npm run divergence` → **`R13 RESULT: 9 checks, 0 failures`** (Electron 44.4.5, node 24.21.0; census 12/12 both legs, dirtied ids normalized-match, SSR fragment match, `data-node-id` set match, nodeId vocabulary, counter render, R7 dispatch non-empty). **The divergence run was executed by the SUPERVISOR on the POST-CHANGE tree after landing the harness spawn fix** (`scripts/electron-divergence.mjs`: `--disable-dev-shm-usage` + a fresh scratch `--user-data-dir` per spawn, both required; outside this unit's §5.1 scope; discharges `ci-diversion-leg.md` §1's hermeticity clause; `U-DIVERGENCE-EXT` inherits it; N=9 intact) — that is what closes the leg the pre-change `9/0` could not. **`LIVE-OP-REJECT` — found by this unit's live leg, HOST-owned, PRE-EXISTING and NOT this unit's regression: FIXED + LIVE-VERIFIED in the immediately following pass** (the renderer unwrap, `src/renderer/renderer.ts:43`; `tests/op-command-unwrap.test.ts` `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`; live status flipped `rejected` → `applied`; no upstream handoff owed). **OWED, recorded, NOT landed (test-side only):** §7.12 the fixture's `PF-7` `build()` should carry the sibling half; §7.13 `PF-5`'s should carry all three malformed shapes. **Layer attribution:** the trio is envelope/pure-layer evidence; the battery is the shim host under node (a different MCP host); **only the divergence leg is assembled-app evidence** — and it compares **structural** surfaces, never the IPC hop. |


**⟶ DONE-ROW REPAIR + STATUS NOTE (2026-09-27, by the `LIVE-OP-REJECT` fix pass).** The
`U-ENGINE-PIN` DONE row above was **repaired by the supervisor**: a mid-cell truncation in the
earlier pass had duplicated its adversarial/legs text and left `END-OF-ADVERSARIAL-CELL /
CELLS-DONE / ZZLEGS` splice markers in it. The row now carries **one** copy of each cell
(5 columns, no splice markers) with the **final** counts. **Superseded text must not be quoted
from any earlier snapshot of it:** the row previously read `npm test` **55 files / 789 passed /
2 skipped / 0 failed** (now **56 files / 795 passed / 2 skipped / 0 failed** — the extra file is
`tests/op-command-unwrap.test.ts`, the `LIVE-OP-REJECT` fix's rows; **⟶ 58 files / 822 passed /
2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass** — the two further
files are that unit's `ui`-leg rows) and described `LIVE-OP-REJECT`
as **OPEN** (it is now **FIXED + LIVE-VERIFIED**: the renderer unwrap at `src/renderer/renderer.ts:43`,
rows `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`, live status flipped `rejected` → `applied`, moved to
`docs/defects.md`'s `## FIXED (in this repo)` section — **HOST-owned, no upstream handoff owed**).
**Every other clause stands:** typecheck clean · build clean (5 bundles) · battery **184 checks /
0 failures** · divergence **`R13 RESULT: 9 checks, 0 failures`** on the post-change tree · the
unit's `DONE` status.

## DONE — `U-ENGINE-DRIFT` (2026-09-27, the supervisor's DONE pass)

**The DONE row's facts, in prose (authoritative — the table row below is the same record in row form;
cite this paragraph and the files it names when a viewer truncates the row).** **THE ARCHITECT'S
RULINGS IT EXECUTED:** **the go-ahead was WAVE B ONLY** (`docs/specs/engine-drift.md` §0 **ruling 1** —
wave A closed, waves C–F *not* authorised by that go-ahead); **the `0.2.1`-baseline capture is
EXCLUDED** (§0 **ruling 2** — the two controls `R-16`/`R-17` stay **forward pins on `0.5.1`**, the
historical-output claim is recorded **`UNMEASURABLE`** as **`M-49`**, and no `0.2.1`/`0.4.x` dist is
installed or read); and **the authorised outcome is what landed**: a **`MEASUREMENT RECORD` with ZERO
production code and ZERO new tests** (§0 **ruling 3** — *"its DONE row MUST SAY SO"*). **THE
CODE/TEST DELTA — stated in one line, as §5.4 item 2 requires: production code: `0` files; new tests:
`0` files.** **THE RED — RUN and REPORTED, and it is EMPTY (that IS the report).** The unit's red is
the **existing suite under the moved pin** (ruling 4; §4.1–§4.2, *not* a new test file):
**`56 files / 795 passed / 2 skipped / 0 failed`** *(the date of that run's count — **⟶ 58 files /
822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass** added
that unit's two `ui`-leg test files; the wave-B record's own red is NOT re-baselined by this)* — **NOT ONE ROW RED**, so there is **no failure
output to quote and none attributable to the pin move**; the `2 skipped` are the suite's pre-existing
skips. **Attribution, per §4.2 item 3:** `0` failures attributable to the pin move · `0`
pre-existing failures · `0` environment failures · `0` stale-build failures. **A "no-drift red"
whose failures are zero is the shape §4.2 item 5 names explicitly** (the red is the *proof of
contact* — the suite really ran **under** the new pin); this record does not claim the suite "was
already green, therefore nothing was reconciled" (the reconciliation is the §3 measurement set).
**THE DELIVERABLE — `docs/specs/engine-drift-measurements.md`** (the path §3.0 **chose**, not a
fallback): **`N = 57` rows (`M-1`…`M-57`) = `47` `CONSISTENT` + `2` `DRIFTED` + `7` `UNMEASURABLE` +
`1` `INVALID`** (`47 + 2 + 7 + 1 = 57 = N` ✔), **one reconciled ledger** (the 2026-09-27 correction
pass re-enumerated every verdict cell by hand and **superseded both pre-correction ledgers** —
`45 + 2 + 8 + 1 = 56` and `44 + 2 + 9 + 1 = 56`; **neither may be quoted**), **each row carrying
§3.1's nine columns in order** (no blank cell), and the **`INVALID` row kept IN PLACE with its reason
and its replacement row**: **`M-52`** (colon-twin take one, §3.2 class 7) → replacement **`M-56`**.
**`N` is 57 and not 56 because the correction pass SPLIT `M-30`** (§3.2's own handling for an
un-carryable claim is *"Split the row"*): the measured half keeps the id **`M-30`**
(store → `SecuritySettings` → `RuntimeOptions` → `Supervisor`) and the un-carryable
**store → IPC → renderer** hop is the **new `M-57`** (`UNMEASURABLE`, own revisit condition) — §3.1
column 1 forbids **reusing or renumbering** an id, **not** adding one. **`M-40` also moved
`UNMEASURABLE` → `CONSISTENT`** on the permitted `P1` recipe already in the tree. **THE TWO
`DRIFTED` ROWS AND THEIR DISPOSITIONS (both tracker halves landed — the record itself writes no
tracker, §5.1):** **(i) `M-14`** — this repo's **raw tool-ish string-census claim** (the greens
file's `23`, = `ALL_TOOLS` 21 + 2 gate-only `module.*` keys) is **UNREPRODUCIBLE**: measured **`24`
normalized / `29` raw** under the now-written-out rule, and the blind run's independent
**`28`/`33`** under the same rule **without** the whole-token boundary clause; the delta is exactly
one name — **`module.fetch`**, whose only bundle occurrence is an **error-message literal**. The whole
class is **RETIRED as an evidence class** (`docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`); the count
authority is **`ALL_TOOLS` set-equality (`R-15`) + the `RpcMethod` census (`R-15b`)**, because **a
census that counts error-message literals cannot detect a tool-set change**; the greens file's claim
was corrected (`G-06b`/`F-6` + its §3a correction block). **Gate: no code change.** **(ii) `M-31`** —
the `UNDO-REDO-DESTROY-STATUS` package claim was **stale on BOTH status and mechanism**: destroy-undo
reports **`{"status":"no-op","scheduledDirtied":[],"baseBoundary":false}`** at `0.5.1` (the host
surface, `[H]/[E]`, permitted route), because the engine's **resolve guard returns first**
(`node_modules/provident-ssr/dist/core/supervisor.js:1536-1538`) — `destroy` deleted the node
(`:1066`), so the `destroy` branch (`:1549-1551`) **and** the `:1649`
`return this.report('applied', dirtied)` fall-through are **unreachable for a destroy entry** — and
**the silent-`applied` false-success is NOT REPRODUCIBLE at `0.5.1` by any route**. The defect row
**MOVED** to `docs/defects.md`'s **`## CLOSED (not reproducible at 0.5.1)`** section (as-filed text
kept, corrected root cause, **FLIP NOTE** for an optional upstream dead-code tidy-up only);
`docs/HANDOFF.md` **Round 9** was rewritten to close it (**the remaining ask is an optional upstream
dead-code tidy-up — no new round, no upstream issue, no host change owed**); `docs/pending.md`
`UPSTREAM-UNDO-REDO-DESTROY-STATUS` was corrected
(`docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`). **NEITHER DRIFT OBLIGES HOST CODE OR
A TEST CHANGE — that is exactly what makes the zero-code landing the AUTHORISED outcome and not a
hole in it:** `M-14` is a **count claim** whose own route says *"gate: no code change"* and whose
repair is a **claim correction in its owning files**, and `M-31` is the case **§3.6 item 5 names
verbatim** — a `DRIFTED` `UNDO-REDO-DESTROY-STATUS` observation *"annotates the existing row"*:
**"no new row is owed and no host change is owed for it"**. **⟶ THE CLAUSE IS AMENDED AND THE
TENSION IS CLOSED (2026-09-27, the `A-d3` clause-level adjudication — `docs/specs/engine-drift.md`'s
status-block `### AMENDMENT`, §3.6, §3.7's new fail-state `F-9`, §5.4a's routing table and §5.4
item 3): §3.6's "no-drift" is RESTATED as "NO DRIFT REQUIRING CODE"** — the literal
*"`DRIFTED` **count of zero**"* clause is **SUPERSEDED (retained struck-through in place)**, and the
zero-code landing is satisfied when **every `DRIFTED` row's routing lands as a claim/tracker
correction (or an upstream handoff item) with NO host-side code and NO test change owed**, with the
**drift count and each row's disposition stated in the record AND in the DONE row** (§5.4 item 3;
`F-9` makes a hidden or unrouted drift a review finding). **Both of this record's `DRIFTED` rows are
exactly that class** (`M-14` claim/count-owned, gate *"no code change"*; `M-31` tracker-owned,
*"no host change and no test edit owed"*), so **this unit lands under the amended §3.6 clause** —
**and the amended clause is STRICTER than a bare count, because it obliges the routing of every
`DRIFTED` row.** **Not changed, and not claimed here:** a `DRIFTED` row whose routing needs host code,
a test change or a package patch still means **no zero-code landing** (§3.6's "what obliges code"
list is intact), and **a zero-code landing may never be achieved by hiding a drift**.)* **THE
ADVERSARIAL PASS RAN** (RCA-3; its findings land in
`docs/specs/engine-drift.md` **§3a**, with `§3b` annotated superseded — **status notes only; no
normative clause amended**). **Its verdict on the record AS FILED was `NOT DONE-ELIGIBLE`, and the
blocking findings were exactly two** (per §3a's own status note): **`B-1`** — the `M-14` count claim
was not precise enough to hold, and **`B-2`** — the `M-31` package row was stale on its status **and**
its mechanism, so a live tracker carried a cause that cannot fire. **Both corrections landed** (the
census-class retirement + the measured `no-op` / corrected resolve-guard root cause / disposition move
/ tracker + HANDOFF corrections) **and the record was then re-verified.** **The reshape-level
corrections the pass produced, both visible in the record's own cells:** **`M-31`'s engine-direct
evidence was STRUCK as §3.2 class-4 non-evidence** (a private-surface read; the verdict now rests on
the **permitted `Runtime.journal('undo')`** route alone — the value agreed, so **no verdict moved**),
and **`M-40` was re-taken on the permitted `P1` recipe already in the tree** (the **`layer-apply`
verdict stays NOT PINNED — no pin was invented**). **An arithmetic finding (`W-1`, the record's two
incompatible ledgers) was the second reason the DONE ruling stayed open and is RESOLVED IN the
record** by its own 2026-09-27 correction pass (single ledger, all 57 verdict cells re-enumerated,
`M-30` split into `M-57`, no id reused or renumbered). **Honest limit, stated rather than invented:**
the source facts for this pass describe **12 findings (2 BLOCKING / 3 RESHAPE / 7 ADVISORY)**; **the
two artifacts record the two BLOCKING findings in full and the pair of reshape-level corrections above,
and do NOT carry a 3-RESHAPE/7-ADVISORY classification** — that breakdown is therefore **not
reproduced here** (see this row's `Tracker reconciliation` note). **BLIND VERIFICATION (gate 5,
`AGENTS.md` item 10a):** **`docs/specs/engine-drift-greens.md` — `51` scenarios = `42` PASS / `3` FAIL
/ `6` NOT-BLIND-RUNNABLE (+ `M-52` carried `INVALID`, not counted as a pass)**, authored from
documentation only (no `src/**` or `tests/**` read to derive a scenario). **All three FAILs were
reconciled in the record, and NO VERDICT MOVED:** **`F-1` = `M-11`** — the `4117` number **exists
once** in the tree, as a **comment line in the installed engine dist**
(`node_modules/provident-ssr/dist/core/translate.js:623`), **not** in this repo's
`src/`/`tests/`/`scripts/`; the row's substantive separation (the two d12 populations; no observable
census for the clone-form population) **holds** and the old `(no output, exit 1)` half is
**STRUCK, not deleted**; **`F-2` = `M-14`** — the exclusion rule was **under-specified**; the rule is
**now written out in full** (regex · prefix filter · whole-token boundary · distinct-token convention ·
raw vs normalized · the single exclusion) and **both values are recorded** (`24`/`29` record, `28`/`33`
blind), **with the class kept RETIRED and no number presented as "the" census**; **`F-3` = `M-19`** —
the counter half **reproduces on the documented call shape** (the blind run's call put `requestId` in a
second argument the API does not read, so the dedup never fired) and the shape sensitivity is recorded
as a **call-shape control section** (two differing `requestId`s and two `requestId`-free dispatches as
controls; counter `"2"`). **THE LEGS — ALL GREEN on the final tree, each as the leg's own line, with
its LAYER label (§5.4 item 5 as amended):**
`npm test` `[T]` **`56 files / 795 passed / 2 skipped / 0 failed`** · `npm run typecheck` **clean (exit 0)** ·
`npm run build` **clean, 5 bundles (exit 0)** · `npm run battery` `[B]` **`184 checks / 0 failures`
(exit 0)** · `npm run divergence` `[A]` **`R13 RESULT: 9 checks, 0 failures` (exit 0)** — Electron
**44.4.5** / node **24.21.0** in the app, node **v24.20.0** for the driver and the shim host,
`DISPLAY=:0` and `/dev/shm` present. **LAYER ATTRIBUTION (state it, so no row here is over-read):**
the record's evidence is **envelope/pure-layer** (`[T]`/`[H]`) plus **shim-host-over-MCP** (`[B]`);
**only the divergence leg is assembled-app evidence (`[A]`), and it is
STRUCTURAL-SURFACES-ONLY — never IPC-layer**; the leg asserts **no** attribute row (`M-42`/`M-46`)
and is silent on the app's `provident.op` hop (the `LIVE-OP-REJECT` lesson). **THE `UNMEASURABLE` SET
NAMES ITS REVISIT CONDITIONS (`7` rows; ruling 2's explicit demand that the row SAY which claims are
unmeasurable):** **`M-46`** real-DOM attribute presence/absence → **`U-DIVERGENCE-EXT`'s `H-r10`
extractor** (a substring row is a guaranteed false red); **`M-49`** the historical-output claim →
**an architect-supplied `0.2.1` (or `0.4.x`) tree/artifact** — never convertible to evidence in this
tree; **`M-50`** the `P-TP-1` command-surface totality property → **no PBT harness**
(`NOT EXECUTED`, quoted as the register's own status word and mapped to verdict `UNMEASURABLE`);
**`M-51`** the `Supervisor` → `renderProducingProcess` `css.<key>`+`undefined` route → **no documented
host recipe** (`H-01` carried; substance covered on the `[T]/[E]` layers by `B-12`/`PA-5`/`S-18` and
here by `M-41`); **`M-57`** the `M-30` split's **store → IPC → renderer hop** → **a documented public
route that sets `SecuritySettings.maxJournalLength` on a live app**; **`M-38`** the engine's
**unexported** boolean-set **count** (`27`) → an engine release publishing the set, or an architect
ruling admitting that one constant as a surface (the **membership half is measured — `M-55`**);
**`M-25`** the raw engine `UndoRedoReport` on a **permitted** surface → a public way to read the
engine's own report object (the host projection is what `M-25` carries today; any direct read is
§3.2 class-4 non-evidence). **WHAT WAVE C INHERITS:** the record is the **citable measurement
artifact** for **`U-REALDOM-BOOT`** (`M-46` + `M-42`'s negative evidence — **no row of the record may
be read as real-DOM evidence**, §6 stop condition 8) and for **`U-DIVERGENCE-EXT`** (`M-46` as its
revisit condition; **`M-48`**'s re-measurement of the leg's own line with **`N = 9` a PIN this unit
did not touch**); **the divergence `N = 9` pin stays intact** and **the spawn flags are already
landed** (`DIVERGENCE-SPAWN-FIX`, inherited); **the `UNMEASURABLE` rows are PRECONDITIONS TO NAME,
NOT CAPABILITIES TO ASSUME**; and the layer discipline is binding on both (envelope greens are never
assembled-app or IPC evidence; a count of any declared tool set is never taken by a whole-bundle
literal census again — `RAW-STRING-CENSUS-RETIRED`; when `U-FOCUS-TOOL` lands, the same-commit
obligation is **`R-15` set-equality + `R-15b` + the default-gate subset**). **TRACKER
RECONCILIATION (this pass):** `docs/next-steps.md` (this record; row **B** moved out of `## OPEN`,
**not deleted**; the totals line now reads **2 DONE**), `docs/pending.md` (the `0.2.1`-baseline
control row corrected to the ruling-2 exclusion + `M-49` `UNMEASURABLE`), `docs/FORKER.md` (the
`U-ENGINE-DRIFT` status row + the digest counts), `docs/HANDOFF.md` (the stale *"Round 9 remains
open"* clause), `docs/specs/provident-electron-shell-chrome-handoff-review.md` (`H-r12` + the
filings-row annotation) and `docs/specs/engine-pin.md` (**§7.8**, plus a status note on §7.7's
pre-landing `removeAttribute`-gap clause), each with that file's `SUPERSEDED` /**status-note**
convention (**no normative clause of either file was amended** — in `engine-pin.md` both edits sit
inside numbered honest-statement items that state *"no requirement of this contract changes"*); §7.7
itself **carries no bare-name/removal claim** (read); the measurement record and the
`docs/specs/engine-drift*.md` artifacts were **read, not
written** (a parallel pass owns the record; a SpecWriter owns the spec). **`U-ENGINE-PIN`'s DONE
record above is INTACT and is not restated or superseded here.** **⟶ THE PER-UNIT DOCUMENTATION
REVIEW (AGENTS.md item 10d/RCA-6) HAS SINCE RUN — the gate this DONE row's item 8 owed — closing the
repo-wide audit's `O-1`:** its record is
`archive/reviews/2026-09-27-U-ENGINE-DRIFT-doc-review.md` (provenance — gitignored). It
**re-enumerated the record's 57 verdict cells by hand** (the `W-1` defect it was asked to confirm:
**genuinely fixed** — one ledger, `N = 57 = 47 + 2 + 7 + 1`, the two pre-correction ledgers struck and
labelled superseded), confirmed **9 columns per row with no blank cell and every `UNMEASURABLE` row's
revisit condition**, and landed **six same-pass fixes** — most importantly a **real arithmetic defect
in `docs/specs/engine-drift-greens.md` §5** (NOT-BLIND-RUNNABLE is **7** over the 51 scenario ids, not
6: `BL-38` is a §2 row) and the **one un-annotated false live claim** in the governing gate record
(`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s amended-plan row `U1`: *"OWED — not
filed"*). **A docs review proves nothing about the app**: no leg, suite, battery, window, MCP transport
or server was run by it (see its §6).

**This is the ledger's SECOND `DONE` row. It supersedes `## OPEN` row **B** (moved out of the
`BLOCKED` table into this record — the row's measured history is the `WAVE-B MEASUREMENT CHECKPOINT`
block below plus the record itself; **the row is not deleted**).**

| Unit | Wave | Red → green (RUN, per cycle) | Landing | Adversarial / blind greens / review | Legs (all run on the FINAL tree) |
| --- | --- | --- | --- | --- | --- |
| **`U-ENGINE-DRIFT`** — the behavioural reconciliation / measurement pass at the moved `provident-ssr` pin (`^0.5.1`). **The unit is COMPLETE on every leg its spec declares, and it lands as §0 ruling 3 authorises: a measurement record with ZERO production code and ZERO new tests.** | B | **THE RED IS THE EXISTING SUITE UNDER THE NEW PIN (ruling 4) — RUN and REPORTED, and it is EMPTY: `56 files / 795 passed / 2 skipped / 0 failed`.** **NOT ONE ROW RED**; **0 failures attributable to the pin move**, so there is no failure output to quote and none to attribute (§4.2 item 5's "no-drift red" — the red is the proof of contact, not a required failure). Red ledger, verbatim: `npm test` → `Test Files 56 passed (56) · Tests 795 passed, 2 skipped (797)`. | **`docs/specs/engine-drift-measurements.md` — THE DELIVERABLE, and the unit's ONLY authored artifact: `N = 57` = `47 CONSISTENT` + `2 DRIFTED` + `7 UNMEASURABLE` + `1 INVALID`, one reconciled ledger, nine columns per row, `INVALID` (`M-52`) kept in place with its replacement (`M-56`).** **CODE/TEST DELTA: production code `0` files; new tests `0` files.** No `src/**`, no `tests/**`, no pinned harness touched; `N = 9` untouched. | **ADVERSARIAL PASS RAN** (`docs/specs/engine-drift.md` §3a; `§3b` annotated superseded — status notes only): verdict on the record **as filed = `NOT DONE-ELIGIBLE`**, on **exactly two BLOCKING findings** — **`B-1`** the `M-14` count claim was not precise enough to hold, **`B-2`** the `M-31` package row was stale on status **and** mechanism. **Both corrected, then re-verified.** Reshape-level corrections visible in the record: **`M-31`'s engine-direct half STRUCK as §3.2 class-4 non-evidence** (verdict rests on the permitted `Runtime.journal('undo')` route; value agreed, **no verdict moved**) and **`M-40` re-taken on the permitted `P1` recipe** (**`layer-apply` verdict stays NOT PINNED** — no pin invented). Arithmetic finding **`W-1`** (two incompatible ledgers) **RESOLVED IN the record** by its 2026-09-28 pass. *(The source facts' **3 RESHAPE / 7 ADVISORY** classification is **not** carried by the artifacts; the 2 blocking findings are.)* **BLIND GREENS (`docs/specs/engine-drift-greens.md`, gate 5): `51` scenarios = `42 PASS` / `3 FAIL` / `6 NOT-BLIND-RUNNABLE` (+`M-52` carried `INVALID`).** All 3 FAILs reconciled in the record, **no verdict moved**: **`F-1` = `M-11`** (`4117` exists once, as a **comment line in the installed engine dist** — `dist/core/translate.js:623` — **not** in this repo's `src/`/`tests/`/`scripts/`; the separation holds); **`F-2` = `M-14`** (exclusion rule was under-specified — now written out in full, both values recorded: `24`/`29` and the blind `28`/`33`; class stays RETIRED); **`F-3` = `M-19`** (counter half reproduced on the documented call shape; the blind call put `requestId` in a **second argument the API does not read**, so dedup never fired — recorded as a call-shape control). **DOC REVIEW / tracker reconciliation: THIS pass** (owner: the supervisor; the unit's doc-review gate is discharged here). | `npm test` **56 files / 795 passed / 2 skipped / 0 failed** · `npm run typecheck` **clean (exit 0)** · `npm run build` **clean, 5 bundles (exit 0)** · `npm run battery` **`184 checks / 0 failures` (exit 0)** · `npm run divergence` **`R13 RESULT: 9 checks, 0 failures` (exit 0)**. Electron **44.4.5** / node **24.21.0** in the app; node **v24.20.0** driver; `DISPLAY=:0`, `/dev/shm` present. **LAYERS, per §5.4 item 5 as amended:** node suite **`[T]`** envelope/pure layer · battery **`[B]`** shim-host-over-MCP · divergence **`[A]`** **structural-surfaces-only**; typecheck/build are build gates, not evidence layers. **The record's rows were taken on `[T]`/`[H]`/`[E]`/`[B]` + the `[A]` leg (its own column 5).** **`UNMEASURABLE` (7) with named revisit conditions:** `M-25` raw engine report (permitted surface) · `M-38` unexported boolean-set count · `M-46` real DOM → `H-r10` (`U-DIVERGENCE-EXT`) · `M-49` historical baseline → architect-supplied artifact · `M-50` no PBT harness · `M-51` no documented graph recipe · `M-57` store→IPC→renderer hop. |

**⟶ ROW-DISPLAY NOTE (2026-09-27).** The `U-ENGINE-DRIFT` DONE row above is a single very long table
line (the same display hazard the `U-ENGINE-PIN` row carries). **Every fact it carries is recorded,
complete and in prose, in the paragraph above and in the files it names — cite THOSE, not the row's
tail.** No claim in this record depends on the row's untruncated form.

## WAVE-B MEASUREMENT CHECKPOINT — `U-ENGINE-DRIFT` (2026-09-27): the measurement record landed **and was reconciled in its own 2026-09-27 correction pass**

> **⟶ SUPERSEDED BY THE `U-ENGINE-DRIFT` DONE PASS (2026-09-27) — read it as history, not as live
> status.** The unit **IS `DONE`** on every leg its spec declares; **the record is the `U-ENGINE-DRIFT`
> DONE record immediately above.** This block's own status lines (*"`U-ENGINE-DRIFT` is NOT marked
> `DONE` by this pass"*, *"the unit is NOT `DONE`"*, *"`U-ENGINE-DRIFT`'s DONE row remains owed to the
> supervisor/architect"*) and **its `## OPEN` row-B pointer** are consequently **superseded**: row **B
> has MOVED into that DONE record** (not deleted), and the **one remaining item it recorded — the
> `docs/specs/engine-drift.md` §3.6 *"`DRIFTED` count of zero"* clause-level tension — was CLOSED by
> the architect's `A-d3` clause-level adjudication** (§3.6 restated as **"no drift requiring CODE"**;
> see the DONE record's own text). Everything else in this block
> (the final tally and its arithmetic, `W-1`'s resolution, the red, the two `DRIFTED` dispositions, the
> adversarial verdict, and what wave C inherits) **stands and is not restated above.**


**Unit / wave / status:** `U-ENGINE-DRIFT` · wave **B** · **⟶ SUPERSEDED BY THE DONE PASS
(2026-09-27): the unit IS `DONE` — the record is the `U-ENGINE-DRIFT` DONE record above, and row `B`
has MOVED into it.** *(As this block read: **MEASURED — the record, its reconciliation and both
`DRIFTED` rows' tracker halves have LANDED; the unit is NOT `DONE`**, and this pass does not mark it
so. **The one clause-level tension it recorded for the architect:** `docs/specs/engine-drift.md`
§3.6's "no-drift" zero-code shape required *"a `DRIFTED` **count of zero**"* **literally**, while this
unit is a **two-drift, zero-code** outcome — both `DRIFTED` rows are inside **§3.6 item 5**'s
annotate-only case (a `DRIFTED` `UNDO-REDO-DESTROY-STATUS` observation *"annotates the existing
row"*: **no new row owed, no host change owed**) — under §0 **ruling 3**. **⟶ THAT TENSION WAS
ADJUDICATED (2026-09-27, the `A-d3` clause amendment, `docs/specs/engine-drift.md`): §3.6's "no-drift"
is restated as "NO DRIFT REQUIRING CODE" and the literal count clause is superseded in place** (see
the DONE record above). The record's own tally
ledger **has now been reconciled** (see the `RECORD STATE` block below), so the earlier ledger
discrepancy was **no longer** an open gate. **Nothing here is `DONE` by implication** — the DONE row
is the supervisor/architect's, and **it is written above**.)*

**RECORD STATE (the FINAL tally — re-read after the parallel correction pass, because the record was
being corrected while this pass ran).** Path **`docs/specs/engine-drift-measurements.md`** (the spec
at `docs/specs/engine-drift.md` §3.0 chose that separate file; the record **outlives the unit** and is
the citable artifact the next waves re-run against). **The measurement pass is dated 2026-09-27; the
record carries a correction pass dated 2026-09-27** *(the date-correction pass normalized this from a withdrawn `2026-09-28` stamp; see the record's date-normalization note)* (its own line: a re-read/correction of the same
tree, **no leg re-run**, re-opening `M-11`, `M-22`, `M-25`, `M-30`/`M-57`, `M-31`, `M-40`, `M-41`,
`M-45`, `M-53`, `M-54` **and the header arithmetic**). **FINAL tally, as the corrected record states
it in one ledger:** **`N = 57`** rows (`M-1`…`M-57`) = **`47` `CONSISTENT`** + **`2` `DRIFTED`**
(**`M-14`**, **`M-31`** — unchanged by the correction) + **`7` `UNMEASURABLE`** (`M-25`, `M-38`,
`M-46`, `M-49`, `M-50`, `M-51`, **`M-57`**) + **`1` `INVALID`** (`M-52`, kept in place, replaced by
`M-56`); `47 + 2 + 7 + 1 = 57 = N`. **Why `N` GREW from 56 to 57, and why that is correct:** the
correction pass **SPLIT `M-30`** — §3.2's own handling for an un-carryable claim is *"Split the
row"* — so the **measured half keeps the id `M-30`** (it is what §3.3 names) and the **un-carryable
store→IPC→renderer hop is the NEW row `M-57`** (`UNMEASURABLE`, with its own revisit condition);
§3.1 column 1 forbids **reusing or renumbering** an id, **not** adding one. **`M-40` also moved
`UNMEASURABLE` → `CONSISTENT`** (re-taken on the permitted recipe already in the tree), which is why
`c` is **7** and `a` is **47**. **FINDING `W-1` — TWO INCOMPATIBLE LEDGERS — is RESOLVED, and this
block records the resolution rather than the discrepancy:** before the correction pass, the record's
header (`45 + 2 + 8 + 1 = 56`) and its foot's "Honesty statements" item 1 (`44 + 2 + 9 + 1 = 56`)
disagreed on the `CONSISTENT`/`UNMEASURABLE` split (they summed to the same `N`, so the arithmetic
closed while the ledger identity did not — a review finding under `docs/specs/engine-drift.md` §3.1).
**That is now fixed IN the record by the pass that owns it:** both pre-correction ledgers are
**superseded**, every verdict cell was **re-enumerated by hand** (not read off either ledger and not
trusted from the header), the foot quotes the header's arithmetic and no other, and **the record
carries no second ledger.** **`W-1` therefore no longer blocks the DONE ruling**; **the DONE ruling
itself is written above — and the one item this block recorded as outstanding for it (the §3.6
clause-level tension) was CLOSED by the `A-d3` clause-level adjudication: `docs/specs/engine-drift.md`
restates §3.6's "no-drift" as "NO DRIFT REQUIRING CODE", supersedes the literal *"`DRIFTED` count of
zero"* clause in place, reconciles §3.5's `DRIFTED` obliges cell + §5.4a's routing table to it, adds
§3.7's `F-9` fail-state, and requires §5.4's DONE row to state the drift count and each row's
disposition** (both of this record's `DRIFTED` rows are the claim/count/tracker-owned class the
amended clause makes zero-code-landable). *(The raw pass took no vote between the two ledgers while
they were incompatible — it recorded the discrepancy as a finding instead — and the pre-correction
`45/8` and `44/9` readings are both **superseded and must not be quoted**.)*

**THE RED — `0` FAILED, and that is the honest "no-drift red".** The unit's red is the **existing
suite under the moved pin, as RUN and REPORTED** (ruling 4; not a new test file): **`56 files /
795 passed / 2 skipped / 0 failed`** — **NOT ONE ROW RED, so there is no failure output to quote
and none attributable to the pin move** (the `2 skipped` are the suite's pre-existing skips). The
other four legs: **typecheck clean (exit 0) · build clean, 5 bundles (exit 0) · battery `184
checks / 0 failures` (exit 0) · divergence `R13 RESULT: 9 checks, 0 failures` (exit 0)**. **So the
unit lands as its spec's ruling 3 authorises — a `MEASUREMENT RECORD` with ZERO production code
and ZERO new tests**, its only authored artifact being the record itself: **the outcome the
architect authorised** (`docs/specs/engine-drift.md` §0 ruling 3 + the `docs/next-steps.md` `Q1`
answer, which named measurement-only as an acceptable outcome for this unit).

**THE TWO `DRIFTED` FINDINGS, WITH THEIR DISPOSITIONS (both tracker halves landed this pass —
the record itself may not write trackers, `docs/specs/engine-drift.md` §5.1).**

1. **`M-14` — the raw tool-ish string census claim (`23`) is UNREPRODUCIBLE; the census class is
   RETIRED.** Measured on the drift pass's **own** `npm run build` of `dist/main/main.cjs`:
   **`24` normalized / `29` raw**, the delta being exactly one name — **`module.fetch`**, whose only
   bundle occurrence is the **error-message literal** `module.fetch: network is deferred (M-r12)`
   (`src/renderer/extensions.ts:132`). **`ALL_TOOLS = 21` is EXACT and not in question.** The
   adversarial pass named the fault precisely: **the count claim was never precise enough to
   hold** (no regex, no prefix filter, no normalization stated; its own enumeration leaves one
   `module.*` unexplained). **Disposition: retire the whole-bundle raw string census as an evidence
   class** — the count authority is **`ALL_TOOLS` set-equality (`R-15`) + the `RpcMethod` census
   `R-15b`**, because **a census that counts error-message literals cannot detect a tool-set
   change**. **Gate: no code change.** Landed: the greens file's `G-06b`/`F-6` (+ the §3a `F-6`
   correction block) with the old `23` marked **SUPERSEDED** and the `21` half left standing,
   `docs/specs/engine-drift.md` §3.3.3 `M-14` + §8 restatements (marked SUPERSEDED, **no normative
   clause amended**), `docs/pending.md` §C `ALL-TOOLS-CENSUS-CLAIM`, and
   **`docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`.**
2. **`M-31` — the `UNDO-REDO-DESTROY-STATUS` row was stale on BOTH its status and its root
   cause.** Measured at the **installed `provident-ssr@0.5.1`**: the destroy-undo reports
   **`status:"no-op"`** (empty `scheduledDirtied`, `baseBoundary:false`, the graph unchanged,
   target-list lengths `[7,7]`) — the **behaviour** half of the claim holds, the **reported status**
   does not; the claimed *"falls through to `report('applied', …)`"* mechanism is **unreachable**,
   because the **resolve guard** returns first (`dist/core/supervisor.js:1536-1538`, since `destroy`
   deleted the node at `:1066`), leaving the `destroy` branch (`:1549-1551`) and the `:1649`
   fall-through dead for a destroy entry (adjacent upstream source agrees:
   `../Preempt-Providence/src/core/supervisor.ts:1597-1598` vs `:1608-1609`, `:1696`). **So the
   silent-`applied` false-success is NOT REPRODUCIBLE at `0.5.1` by any route.** **Disposition
   applied: `CLOSED as delivered-by-the-resolve-guard`** (`docs/defects.md`'s new
   `## CLOSED (not reproducible at 0.5.1)` section — the row's as-filed text retained verbatim with
   the corrected root cause and a **FLIP NOTE** so the architect can switch it to *"OPEN — upstream
   dead-code cleanup only"* by changing one heading); the residue is **(i)** the now-dead `destroy`
   branch + the unreachable `:1649` fall-through and **(ii)** the stale in-tree comment
   **`tests/journal-endpoint.test.ts:116-118` — routed as a NOTE, NOT edited** (test file; its
   assertions are correct). Landed: `docs/pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS` (status +
   mechanism corrected), **`docs/HANDOFF.md` Round 9** (the upstream-facing copy — now states the
   false-success is not reproducible at `0.5.1` and that the remaining ask is an optional dead-code
   tidy-up, with **no new round owed**), `docs/defects.md`, `docs/FORKER.md` (its `J4` digest
   bullet), `docs/specs/engine-drift.md` §3.3.5 `M-31` + §8, and **`docs/decisions.md`
   `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`.** **No assertion was edited to match any
   measurement** (stop condition 7 did not fire); **no `node_modules/**` or upstream file was
   touched.**

**THE ADVERSARIAL PASS — verdict on the record AS FILED: `NOT DONE-ELIGIBLE`, with exactly two
blocking findings; both are fixed.** The adversarial review (2026-09-27) ruled the record **not
ready to be reported `DONE` as filed**, on the **two blocking findings** above and nothing else:
**`B-1`** — the `M-14` claim half was not precise enough to hold (a count-of-strings carried as a
tool-set count); **`B-2`** — the `M-31` package row was stale on its status **and** its mechanism,
so a live tracker carried a cause that cannot fire. **What fixed them:** `B-1` → the **census-class
retirement** + the greens/`engine-drift` restatement corrections + the count authority moving to
`R-15`/`R-15b` (no code); `B-2` → the **measured `no-op` at `0.5.1`**, the **corrected resolve-guard
root cause**, the **disposition move** and the tracker/HANDOFF corrections (no code, no test edit).
**Both are recorded in `docs/specs/engine-drift.md` §3a's status note with `§3b` annotated
superseded** (status notes only — **no normative clause of that contract was amended**). **The
pass's further finding (`W-1`, this block): the record's own two tally ledgers disagreed** — it was
**not** one of the two blocking findings on the record's *claims*, but it **was** the second reason
the DONE ruling stayed open; **it has since been RESOLVED in the record by the 2026-09-27 correction
pass** (single ledger, all 57 verdict cells re-enumerated, `M-30` split into `M-57`, no row id reused
or renumbered — see `RECORD STATE` above). **⟶ SUPERSEDED (2026-09-27, the DONE pass):** the one
item this block left for the DONE ruling was the §3.6 *"`DRIFTED` count of zero"* clause-level tension
recorded at the top of this block — **and the architect adjudicated it: `docs/specs/engine-drift.md`'s
`A-d3` clause amendment restates §3.6's "no-drift" as "NO DRIFT REQUIRING CODE", supersedes the
literal *"`DRIFTED` count of zero"* clause in place, and makes both of this record's `DRIFTED` rows
(claim/count/tracker-owned routing; no host code, no test change) zero-code-landable.** **The DONE row
is written above and states the count and both dispositions, as §5.4 item 3 now requires.**

**WHAT THE NEXT WAVE INHERITS FROM THE RECORD (both waves-C units are `BLOCKED`; this is inheritance,
not authorisation — the wave-B unit itself is `DONE`).**
- **`U-REALDOM-BOOT` (row `C1`, the `npm run ui` leg)** inherits **`M-46`** (`UNMEASURABLE` — **no
  real-DOM attribute-presence extractor exists**; `H-r10` is owed to `U-DIVERGENCE-EXT`) and
  **`M-42`** (the divergence leg asserts **no** attribute/removal row and its demo authors no
  `inert`/`hidden` prop — the negative evidence). Practical consequence: **the leg's own red rows
  (`R0`–`R4`) are untouched by this record, and no row of the record may be read as real-DOM
  evidence** — `docs/specs/engine-drift.md` §6 stop condition 8 forbids that conversion.
- **`U-DIVERGENCE-EXT` (row `C2`)** inherits **`M-46` as its revisit condition** (the `H-r10`
  **set-wise** attribute-presence extractor — a substring row is a **guaranteed false red**) and
  the record's **`M-48`** re-measurement of the leg's own result line (`R13 RESULT: 9 checks,
  0 failures`, exit 0, **`N = 9` a PIN this unit did not touch**). It also inherits the **landed
  spawn fix** and **must keep `N = 9` intact**.
- **Both** inherit the record's **layer discipline as binding**: envelope greens are **not**
  assembled-app or IPC evidence (anchor 2's `LIVE-OP-REJECT` lesson), a **`no-op` status is now
  engine-truthful for `destroy`** (`M-31`/`M-34`), and **no count of any declared tool set may be
  taken by a whole-bundle literal census again** (`RAW-STRING-CENSUS-RETIRED`) — when
  `U-FOCUS-TOOL` lands, the **same-commit census obligation is `R-15` set-equality + `R-15b` +
  the default-gate subset**, never a bundle census.
- **Also carried forward for whoever runs the next measurement:** the record's `UNMEASURABLE` set
  with its named revisit conditions (`M-49` the historical-output claim — **never convertible to
  evidence in this tree**; `M-38` the boolean-set count; **`M-57`** the `M-30` split's unreachable
  **store→IPC→renderer hop**; `M-46` no real-DOM extractor; `M-25` the raw `UndoRedoReport` on a
  **permitted** surface; `M-50` the `P-TP-1` property — no PBT harness; `M-51` the
  `Supervisor`→`renderProducingProcess` `css.<key>` recipe), and
  the **journal family's honest boundary** (the condense path was **refused by the engine's own size
  guard** on the demo graph, so the `base-boundary` **status was not reached and is not claimed** —
  `M-29`, whose row is `CONSISTENT` on the refusal it measured and which **must not** be read as the
  large-graph leg). **Three correction-pass changes are relevant to a re-run: `M-30` is now SPLIT
  (`M-30` measured `CONSISTENT` / `M-57` unmeasurable), `M-40` moved `UNMEASURABLE` → `CONSISTENT`,
  and the row count is `N = 57`, not 56** — **read the record's rows, not an older snapshot of its
  tally, before quoting any of them.**

**PROCESS RECORD for the checkpoint (so a fresh supervisor can audit it in one read):** the
`U-ENGINE-PIN` **DONE record above is INTACT and is not restated or superseded here** — this block
is **added**, and no row of the wave-A record changed. **`U-ENGINE-DRIFT`'s tracker reconciliation**
landed in the same pass: `docs/decisions.md` (the new `ACTIVE — the U-ENGINE-DRIFT measurement-pass
decision set` block, three rows: `RAW-STRING-CENSUS-RETIRED`,
`UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`, `ENGINE-DRIFT-MEASUREMENT-RECORD`),
`docs/pending.md` (§C `ALL-TOOLS-CENSUS-CLAIM` + the corrected `UPSTREAM-UNDO-REDO-DESTROY-STATUS`
row), `docs/defects.md` (the row moved `## OPEN` → `## CLOSED`, **the `## OPEN` table is now
empty**), `docs/HANDOFF.md` (Round 9 corrected + the trailing note superseded), `docs/FORKER.md`
(the `U-ENGINE-DRIFT` status row + the `J4` bullet), `docs/specs/engine-pin-greens.md` (the
`G-06b`/`F-6` correction + the §3a correction block + the §6 mapping pointer) and
`docs/specs/engine-drift.md` (`M-14`/`M-31`/§8 restatements + `§3a`/`§3b` status notes).
**Unchanged by this pass:** every leg number, the `N = 9` divergence pin, `ALL_TOOLS = 21`,
`RpcMethod = 21`, the `U-ENGINE-PIN` DONE record, `src/**`, `tests/**`, the measurement record,
and the normative clauses of `docs/specs/engine-drift.md`. **`U-ENGINE-DRIFT`'s DONE row remains
owed to the supervisor/architect.** *(**⟶ THIS CELL IS SPENT (2026-09-27, the `U-ENGINE-DRIFT`
DONE pass — already superseded by the `SUPERSEDED BY THE U-ENGINE-DRIFT DONE PASS` note at the top
of this block; restated here in-line by the unit's per-unit documentation review, AGENTS.md item
10d/RCA-6, so a reader arriving at this cell sees it):** the DONE row was **written** — it is the
`## DONE — U-ENGINE-DRIFT` record above — and the unit is `DONE` on every leg its spec declares.
The sentence above is the **pre-DONE-pass** state and must not be read as live.)*

**⟶ ADDENDUM to that process record (2026-09-27, the DONE pass):** **the SpecWriter's clause-level
`A-d3` amendment to `docs/specs/engine-drift.md` LANDED in parallel with this pass and IS the wording
the DONE record follows** — its status-block `### AMENDMENT` section, §3.6 (restated as **"no drift
requiring CODE"**, the literal *"`DRIFTED` count of zero"* clause **struck in place**), §3.5's
`DRIFTED` obliges cell, §3.7's new fail-state **`F-9`**, §5.4 items 3/5/6 (the DONE row must state the
drift count, each `DRIFTED` row's disposition, the layer attribution and the final `c` membership) and
§5.4a's new **claim/count/tracker-owned** routing row. **That file was READ, not written, by this
pass**; the only `docs/specs/engine-drift*.md` writes belong to the parallel pass and the SpecWriter.
**`U-ENGINE-DRIFT`'s DONE row is therefore NO LONGER owed — it is written at the top of this file,
under the amended clause.**

## WAVE-C CHECKPOINT — `U-REALDOM-BOOT` (2026-09-27): the `npm run ui` leg is **LANDED-GREEN-BUT-NOT-DONE**

> **⚑ STATUS, READ THIS FIRST: `U-REALDOM-BOOT` IS NOT `DONE`.** The unit **LANDED** and **every row it declares is green** — including the **live** `npm run ui` leg — but **THREE gates are still owed** (its per-unit **adversarial** pass, its **blind-greens** gate (AGENTS.md item 10a), and its per-unit **documentation review** (item 10d/RCA-6)), **plus ONE architect decision** (whether the leg should **retry** a boot — see finding 2). **The unit's two spec defects (`R1`'s non-discriminating marker; the scripts count) were RE-PINNED by the parallel wave-C SpecWriter while this pass ran** — recorded below as findings/defects, **not as open gates**, and **no tracker here treats them as unresolved**. **No DONE row is written for this unit by this pass, and none of its blockers may be read as met.** This is the **wave-C checkpoint**; the checkpoint's own convention was followed (wave B's `WAVE-B MEASUREMENT CHECKPOINT` is the shape).

**Unit / wave / status:** `U-REALDOM-BOOT` · wave **C** · **LANDED-GREEN-BUT-NOT-DONE** (spec `docs/specs/ci-ui-leg.md`, **FILED 2026-09-27**; row `C1`; architect ruling `A-d8`).

**THE RED — RUN and REPORTED before implementation (RCA-1), and it is the unit's own new files.** `npx vitest run tests/ui-leg-contract.test.ts tests/ui-leg-seam.test.ts` → **20 failed / 7 passed**, in **three attributable classes**: **13 rows** failed because **`scripts/electron-ui.mjs` did not exist**; **4 rows** because **no shared Electron-spawn helper existed**; **3 rows** because the **user-data override seam was absent from `src/main/main.ts`**. **So the honest red is the `R0`(c)/`SEAM-*` class plus the missing-leg class together — 20 of the unit's 27 rows were red on the pre-landing tree.**

**THE GREEN — 27/27 rows** (`tests/ui-leg-contract.test.ts` + `tests/ui-leg-seam.test.ts`), i.e. **20 red → 27 green**, each class of the red set discharged by a landed artifact (below).

**THE LANDED DIFF SCOPE (five paths + the two test files; nothing else):**

| # | Path | Change |
| --- | --- | --- |
| 1 | **NEW `scripts/electron-ui.mjs`** | the `[U]` leg itself — the two-boot `R0` comparison, the `R1` typed marker, the ONE `R2` measurement, the `R3` shim record, the `R4` honest-limits row and the §3.6 exit codes |
| 2 | **NEW `scripts/electron-spawn.mjs`** | the **shared Electron-spawn helper** (`H-r18`'s extraction). **The divergence leg now calls it**, and its **arg vector / env / stdio / profiles are UNCHANGED**, so the **`R13` arithmetic is untouched** (`N = 9` is not a count this unit moved) |
| 3 | **`src/main/main.ts`** | the **ONE additive seam**: a `--provident-user-data=<path>` **argv scan** + `app.setPath('userData', path)` **above the store reads**. **Absent ⇒ no call, today's behaviour.** (§4 `ADD-1`…`ADD-6`; the `setPath` route `ADD-3` names.) |
| 4 | **`package.json`** | **exactly ONE additive script key: `"ui"`** — it is the **TWELFTH** key (the pre-unit block held **ELEVEN**; the as-filed spec prose said *"12 keys … would make 13"* and its own eleven-name enumeration was the authority — **that count defect is the SpecWriter's `M-2` re-pin, LANDED while this pass ran**); no dependency row, no other script touched |
| 5 | `tests/ui-leg-contract.test.ts`, `tests/ui-leg-seam.test.ts` | the unit's red-first rows (the 27) |

**THE LIVE LEG — `npm run ui` → exit 0** (after `build`), its own line: **`UI RESULT: 0 failures (5/5 rows green)`**, and the **ONE** measurement: **`427x22`** at **`fontSize="16px"`**, read back over **`provident.get_rendered_html`** (the `R2` channel of §3.2 — no new MCP surface, `ALL_TOOLS` untouched by it). The other four rows as the leg reports them: **`R0`**(a)/(b)/(c) **isolation** — **identical census and identical `nodeId` vocabulary across the two scratch boots**, neither reading the developer's store · **`R1`** the **real-renderer typed marker** (`HTMLDivElement` / `CSSStyleDeclaration`) with the **shim side recorded `UNSUPPORTED`** — **never a `0`**, reason **`el.getBoundingClientRect is not a function`** · **`R3`** the shim `UNSUPPORTED` record · **`R4`** the honest-limits statement.

**THE LEGS (all run on the final tree):** `npm test` `[T]` **58 files / 822 passed / 2 skipped / 0 failed** — **was 56 / 795**; the delta is exactly this unit's **two new test files / 27 rows**, and **it is not a re-baseline of the engine counts** *(the wave-A/wave-B figures `55 files / 789` and `56 files / 795` are kept below as provenance)* · `npm run typecheck` **clean** · `npm run build` **clean** · `npm run battery` `[B]` **184 checks / 0 failures** · `npm run divergence` `[A]` **`R13 RESULT: 9 checks, 0 failures` — UNCHANGED** (the shared-helper extraction moved no comparison, no label and no count; `PRE-4`'s no-weakening clause holds **and** the leg still prints its nine).

**THE TWO FINDINGS THIS PASS PRODUCED (both carried, neither closed):**

1. **`R1`'s pinned marker DID NOT DISCRIMINATE.** The spec's pinned marker (`typeof window`, `window`/`document` *provenance*) is satisfied by **the real boot AND the shim boot** — `typeof window` is `'object'` in the real realm **and** the shim defines `window`/`document` — so **as pinned, `R1` could not have failed for the right reason** (`R1`'s own fail state is a **re-scope finding**, never a pass). **The SpecWriter re-pinned it — ⟶ LANDED while this pass ran** (`docs/specs/ci-ui-leg.md`'s AMENDMENT BLOCK **`M-1`** + the amended `§3.0` `R1` row: the discriminator is now the **ELEMENT/RENDERER-API provenance** — the observed element's constructor name and the computed style's class name — **never `typeof window`**, with the vacuity challenge (`U-11`) answered explicitly). The leg's landed evidence is the **typed** pair `HTMLDivElement` / `CSSStyleDeclaration`, which the shim cannot produce. **The re-pin is a SPEC defect, not a leg defect**, it was landed in `docs/specs/ci-ui-leg.md` **by the wave-C SpecWriter pass**, and **this tracker pass did not write it** — the spec's remaining residue is its §7 honest statements (items 1/2/7 still describe the pre-landing tree).
2. **`RK-14`'s flake class is CONFIRMED REAL *HERE*.** The sandbox **forbids `/dev/shm` writes**, so **an Electron renderer intermittently dies `SIGTRAP` at bootstrap** — measured **≈1-in-3 for back-to-back boots** — and **the pre-existing divergence leg is flaky identically** (it is the same spawn, now the same helper). **Consequence, stated honestly:** `npm run ui` can **legitimately exit `2` PRECONDITION-FAILED with no measurement taken** — that is **the specified authority order** (§3.6 exit 2 / `PRE-1`/`PRE-3`: *a `ui` green is never stronger than a `divergence` red*), **not a bypass, not a skip and not a `0`**. **Whether the `ui` leg should RETRY a bootstrap-`SIGTRAP` boot is an OPEN ARCHITECT DECISION** (`docs/decisions.md` `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED`), because a retry is a **new flake-policy contract row**, not a bug fix. **No retry was added by this landing.**

**WHAT IS STILL OWED (this is the whole list — the unit is NOT `DONE` on any of it):** **(1)** the per-unit **adversarial pass** (RCA-3) — `docs/specs/ci-ui-leg.md` §3a/§3b are **`OWED`** as filed, with the 13-row seed set (`U-1`…`U-13`); **(2)** the **blind-greens** gate (item 10a) — **no `*-greens.md` set exists for this unit**; **(3)** the per-unit **documentation review** (item 10d/RCA-6) — including the §3a/§3b status flip and the archive record; **(4)** the **`R1`-marker re-pin + the scripts-count correction** in `docs/specs/ci-ui-leg.md` — **⟶ BOTH LANDED WHILE THIS PASS RAN (the wave-C SpecWriter's `M-1`/`M-2` amendment blocks):** `R1`'s pinned clause is now the **discriminating ELEMENT/RENDERER-API provenance** (`HTMLDivElement`/`CSSStyleDeclaration`, **never `typeof window`**, with the vacuity challenge `U-11` answered explicitly), and the count is re-pinned as **TWELVE** keys (`package.json:8-21`, `ui` at `:19`) with the as-filed `12 → 13` claim struck in place; **the remaining SpecWriter-side item is that file's §7 honest statements (items 1/2/7 still describe the pre-landing tree)**; **(5)** the **architect's retry decision** for finding 2. **A DONE row written before those land is a review finding** (`AGENTS.md` items 3/10a/10c/10d, RCA-3/RCA-4/RCA-6) — **and note the shape of the list honestly: (4) is the SPEC-SIDE item and the SpecWriter has discharged it; the DONE-BLOCKING gates still open are (1) the adversarial pass, (2) the blind greens, (3) the documentation review, plus (5) the architect's retry decision. Nothing is waived by (4) landing: the unit still may not be marked `DONE`.**

**LAYER ATTRIBUTION (state it, so no row here is over-read):** the red/green rows are **[T]** (vitest, no window); the five `R*` rows and the ONE measurement are **[U]** (a real renderer in a real window, under a temp profile — **not** the packaged app); `battery` is **[B]** (shim host under node); **only `npm run divergence` is `[A]` assembled-app evidence, and it is STRUCTURAL-SURFACES-ONLY — never IPC-layer.** **What this landing does NOT buy:** no attribute row (`H-r10`'s extractor is still `U-DIVERGENCE-EXT`'s; `M-46` stays `UNMEASURABLE` — this unit may **not** convert it), no geometry/layout proof, no IPC proof, no `provident.dispatch`-is-a-real-gesture claim, and **no proof the shim is faithful** (it is demoted to **pre-filter**, not retired). The `Q7` **Electron-44 risk is EXERCISED but NOT discharged**: the leg is the first live-window contact with that stack, and the flake of finding 2 is exactly the class `Q7` left open.

**PROCESS RECORD (so a fresh supervisor can audit it in one read):** this block is **ADDED**; the `U-ENGINE-PIN` and `U-ENGINE-DRIFT` DONE records above, the `WAVE-B MEASUREMENT CHECKPOINT` block and the `HANDOVER UPDATE 2` block are **not restated, not superseded and not edited** except for the dated count annotations this pass owed. **Tracker reconciliation landed in this pass:** this file (the checkpoint, row `C1`'s corrected `Blocked on` cell, the dated suite-count annotations, the `## OPEN` prose and the totals line), `docs/decisions.md` (**`REALDOM-UI-LEG-LANDED` + `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED`**), `docs/pending.md` (the `ui`-leg row's `NOT STARTED` clause → **LANDED-GREEN-BUT-NOT-DONE** + the devDependency row's stale *"unverified until `U-REALDOM-BOOT` lands"* clause), `docs/FORKER.md` (the `ui`-leg table cell and the outside-the-trio `ui` row), and `docs/specs/ci-divergence-leg.md` (its filing-note `M-2` cell + the second *"`OWED — not filed`"* parenthetical in the boundary note — **status notes in that file's own `SUPERSEDED` convention; no normative clause amended**). **Read, not written:** `docs/specs/ci-ui-leg.md` (a parallel **SpecWriter** owns it and **amended it while this pass ran** — its `M-1` `R1` re-pin on the discriminating element/renderer-API provenance and its `M-2` scripts-count re-pin to **TWELVE** keys are **quoted from, never written by, this pass**; that file's §7 honest statements still describe the pre-landing tree) and `docs/defects.md` (**read and NOT changed: every reference to the `ui` leg there is accurate — the file's `## OPEN` table is empty and its `LIVE-OP-REJECT` row is CLOSED; no stale "not landed" clause exists in it**). **Unchanged by this pass:** `src/**`, `tests/**`, `scripts/**`, `package.json`, the `N = 9` divergence pin, `ALL_TOOLS = 21`, `RpcMethod = 21`, the battery's **184/0**, and both DONE records.

## HANDOVER UPDATE 2 (2026-09-27, wave-A green cycle 2 + supervisor adjudication)

> **STATUS CAVEAT (added by the `U-ENGINE-PIN` doc review, 2026-09-27).** This block and the
> five-row table below are the record of the **green cycle 2** state — read them as the
> **adjudication ledger**, not as live status: the `759 passed / 9 failed` figure, the
> "live-leg evidence is PRE-CHANGE / must be re-run" note and the open `Q7` decision were all
> true then and are **superseded** by the "CURRENT WORK" block above (green on the declared
> legs; the divergence leg **OPEN**; the devDep jump **accepted** — `docs/decisions.md`
> `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED`). The table's **content binds**: its five rulings are the
> dispositions the spec amendments implement, and `docs/specs/engine-pin.md` §4 cites it.

**Live-leg evidence is GREEN.** The architect ran `npm run divergence` in an unsandboxed shell
on the accepted stack — **`R13 RESULT: 9 checks, 0 failures`**, Electron **44.4.5**, node
24.21.0 (census 12/12, registered 12/12, normalized dirtied ids, SSR fragment, `data-node-id`
set, nodeId vocabulary, counter render, R7 dispatch non-empty). **This evidence is PRE-CHANGE**:
`src/renderer/**` changed after it (both guard predicates and the new pane seam), so **the leg
must be re-run by the architect before the unit's DONE row.**

**Green cycle 2: 101 pass / 9 fail of the amended 110-row set.** The 27 "guard still rejecting"
rows are green. The Implementer landed the two authorised hunks: `Runtime.mutationPropsValid` is
now **shape-only** (rejects only a non-array batch, a non-object element, a missing/non-string
`targetProp`; every value-shaped write passes through), and
`SecurePanels.applyPaneMutation(nodeId, mutation)` is the §2.4a injection point with the same
shape-only predicate, skip-whole + last-known render on refusal, and **no change to either
shipped write**. Legs on the current tree: `npm test` **759 passed / 9 failed / 2 skipped** (all
9 are the unit's own rows), `typecheck` clean, `build` clean, `battery` **184/0**.
**Rollback:** the value half of the predicate and the pane method are independently revertible;
`ShimElement.removeAttribute` must **never** be reverted with them — it is now the sole
mechanism for the removal class.

**The 9 remaining rows are 5 contract conflicts, adjudicated by the supervisor (execute in this
order):**

| # | Conflict | Ruling |
| --- | --- | --- |
| 1 | `css.role: null` asserted as a removal; the engine's `css:` branch removes **only** on `undefined`, and `null` is baked to `role="null"` (`adapters.js:214-224`). The row cites PA-5 (which uses `undefined`) while applying PA-2's `null` | **TEST FIX** (test-only): `undefined` ⇒ removal per PA-5; `null` ⇒ the stringification §3.4 PA-2's boundary sentence already states. Do not weaken either assertion |
| 2 | `props.id: undefined` asserted to remove the id; the engine's **auto-mint fill** re-materialises it (`node.js:1908-1912`) before compile, so the adapter's removal branch is never reached | **SPEC AMENDMENT + ROW RELABEL** (the PA-9/PA-10 treatment): record the auto-mint reality in §3.4 PA-6 — the `css.id` route removes, the `props.id` route **cannot** on this engine — and assert the observed reality |
| 3 | The kind-scope row pins `status === 'applied'` for `layer-apply`, but `layer-apply` is the **mint-and-wire** op (`supervisor.js:1188-1225`, needs `target`+`nodes`); a mutation-carrying one is `unknown-node` | **ROW RELABEL**: drive a valid `layer-apply`, or record the engine verdict unpinned as PA-9/PA-10 already do. No host change |
| 4 | `P-SM-1`'s three rotations read `res.renderedHtml` off `applyCommand`, whose pinned signature is `{status, dirtied?, minted?}` (§2.3) | **TEST FIX**: read the render through `op()`/`renderedHtmlResult()`; the atomicity claim stands |
| 5a | `PF-1` asserts a serialized `value` **attribute** the engine never sets (`VALUE_FORMS` tags take the **property** path, `adapters.js:315-318` / `:201-203`) | **TEST FIX**: assert the property/slot observable §2.4a actually names |
| 5b | `PF-2`/`PF-4` need the pane cycle to **persist the diffed baseline** — the removal op is emitted (`set node-21 prop:value undefined`) but the pane render loop does not carry it into `prevMap`, so `formEl.value=''` never runs | **SPEC CLAUSE + ONE HUNK**: authorise the pane baseline persistence (the Runtime's `prevStates` pattern) in §2.4a, then land it with a regression row. The only production hunk left in the unit |

**After those five:** re-run the unit set (target 110/110) → trio → `battery` → **ask the
architect for the divergence re-run** → per-unit documentation review → DONE row → wave-A
checkpoint handover, then wave B (`U-ENGINE-DRIFT`; measurement-only is an acceptable outcome).

**New-surface note for the per-unit doc review:** `SecurePanels.applyPaneMutation` is a genuine
new production public surface (renderer-side only; no IPC, no MCP tool, no group change, and the
isolated pane graph stays non-agent-addressable). Record it as such, keep its rollback unit, and
have the next adversarial pass review it as a seam.

**What a fresh supervisor picks up next.** The `SCH-1..SCH-13` shell-chrome handoff gate was
**amended twice** — first by architect rulings A-d1/A-d2/A-d3 and then by **A-d4…A-d8** — and
the **A-d4…A-d8 layer governs**. It yields **20 units**:

**13 items · 16 `SCH`-derived units · 2 engine units · 2 harness units = 20 units.**
`SCH`-derived (16): `U-MOUNTGUARD` (`SCH-1` invariant half) · `U-GSESSION` (`SCH-2`) ·
`U-ZONES` (`SCH-4`) · `U-CENSUS` (`SCH-8` census half) · `U-GUTTER` (`SCH-6`) ·
`U-RELOCATE` (`SCH-7`) · `U-CONTAINER` (`SCH-10`) · `U-MENULIB` (`SCH-5`) · `U-PROJ`
(`SCH-8` projection half) · `U-LISTHOST` (`SCH-11`) · `U-SLOTHOST` (`SCH-9` host half) ·
`U-THEME` + `U-THEME-CONTROL` (`SCH-3`, two units) · `U-FOCUS-MODEL` + `U-FOCUS-TOOL`
(`SCH-13`, two units) · `U-OVERLAY` (`SCH-12`). Engine (2): `U-ENGINE-PIN`,
`U-ENGINE-DRIFT`. Harness (2): `U-REALDOM-BOOT`, `U-DIVERGENCE-EXT`.
**Arithmetic:** the ruling's own list names **fifteen** `SCH`-derived units and **omits
`U-OVERLAY`**, which is the **sixteenth**; **15 + 1 = 16**, and **16 + 2 + 2 = 20**. The
identity's leading "13 items" is a **different population** from the unit total (three items
contribute two units each) — **there is no single sum that yields both, and any table that
presents "13 items … = 20 units" as one addition is arithmetically wrong.** The full
statement is in the gate record's `Amendment record (A-d4…A-d8)` §2.1.

**3 items carry a DECLINED part-half:** `SCH-1`'s region host · `SCH-9`'s publisher/carrier ·
`SCH-12`'s focus-trap + the `inert`/a11y documentation half (→ the fork's `PS-1`).
**0 PARK · 2 DONE · 2 units fully green** (`U-ENGINE-PIN` is **COMPLETE on every leg its spec
declares** — the live `npm run divergence` leg included (`R13 RESULT: 9 checks, 0 failures`);
its one live finding (`LIVE-OP-REJECT`) is **CLOSED — FIXED + LIVE-VERIFIED on 2026-09-27** (a
HOST-owned, pre-existing defect that never blocked it; the renderer IPC unwrap, now in
`docs/defects.md`'s `## FIXED (in this repo)` section) — see the `U-ENGINE-PIN` DONE record at the top of this file and
`docs/defects.md`; **`U-ENGINE-DRIFT` is likewise `DONE` on every declared leg and COMPLETE, as a
measurement record with 0 production code / 0 new tests** — see its DONE record above); every other
unit is not started. ***(The A-d4…A-d8 gate-record layer still
carries "0 DONE / 0 units fully green"; this paragraph is that layer's counts, corrected by the
wave-A DONE pass and again by the wave-B DONE pass — the pre-wave-B reading was `1 DONE · 1 unit
fully green`.)***

**What is PARTIALLY LANDED and what is RED — SUPERSEDED BY THIS PASS; the LIVE status is the
`## CURRENT WORK / HANDOVER STATE` block at the top of this file (green on the node-suite /
typecheck / build / battery legs; **the declared live `npm run divergence` leg NOT passed** — a
clause that is itself stale: the leg went green on the **post-change** tree and the unit is `DONE`;
`LIVE-OP-REJECT` **fixed + live-verified (2026-09-27)**; the DONE row the supervisor's). The paragraphs below are the
**pre-wave-A doc-only pass's** record, kept verbatim for provenance only — they describe a tree
on which the shim completion and the guard did not yet exist (a snapshot of this section is
archived at `archive/next-steps/2026-09-27-engine-pin-pre-execution-state.md`).** **The pin HAS
MOVED:** `package.json:23` = `^0.5.1`, `package-lock.json:2264` resolves
`provident-ssr-0.5.1.tgz`, and `node_modules/provident-ssr/package.json:3` = `0.5.1` (all read
at the time). **Was RED (now LANDED + green):** the shim completion (`removeAttribute`, which
did not exist then) and the host-side prop-mutation guard; the red run was **live** with
**79 assertions across six new test files — 61 red (56 of them throwing
`TypeError: … removeAttribute is not a function`) and 18 green-not-red**, with the
pre-existing **48 files / 658 passed / 2 skipped** unchanged. **Three open findings from that
red run** were recorded in `docs/pending.md` §C: the `R-13` seam question (`Q8`), the
`css.<key>` spec bug, and the two controls captured on the `0.5.1` tree — **all three are now
DISCHARGED** (`Q8` answered by the architect ruling + `docs/specs/engine-pin.md` §2.4a/§2.4b;
the `css.<key>` defect fixed in §2.3; the controls relabelled as **forward pins** — AF-1/AF-2).

**The source of truth** is
`docs/specs/provident-electron-shell-chrome-handoff-review.md` (amended **in place**; read its
`Layer` column **and** its appended `Amendment record (A-d4…A-d8)`, which is the governing
layer — the pre-amendment and A-d1/A-d2/A-d3 layers are kept for provenance). **The
adjudication to carry:** the A-d5…A-d8 architecture pass re-declined `SCH-4`/`SCH-6`/`SCH-7`/
`SCH-10` after reading the **landed pre-A-d4 rows** and the A-d4 amendment had **never been
landed**. **A-d4 is the architect's explicit ruling and is binding; the re-decline is an
artefact. A-d4 stands — the five panes/zones units are part of the plan.** Trackers reconciled
in the same pass: `docs/decisions.md` (six new ACTIVE rows + a trailing amendment note for
three pre-existing rows), `docs/pending.md` (the rewritten dispositions + §C's open items),
`docs/specs/ci-divergence-leg.md` (hermeticity corrected), `docs/specs/mcp-endpoint.md` (the
focus obligation recorded as `OWED`), `docs/FORKER.md` (tool table + digest + non-trio leg),
`README.md` + `docs/specs/mcp-server-gate.md` + `docs/specs/e2e-test-battery.md` (count and
citation drift). **`docs/defects.md` / `docs/HANDOFF.md`: NO new rows** — every drift found is
this repo's own claim drift (host-owned).

**The single next action is the architect's.** **No unit is delegable:** each needs (a) the
go-ahead for **this 20-unit** plan, (b) its `docs/specs/<unit>.md` spec to exist, and (c) a
TestWriter to have RUN and REPORTED its red set (`AGENTS.md` item 9). **No unit is DONE, no
leg has been run, nothing is green** other than the pre-existing suite — this queue was
authored from a document-only pass.

**What gates everything downstream — CORRECTED (the pin has moved):** (1) **`U-ENGINE-PIN`'s
shim completion + guard must go green first** — the install is **DONE**, so the remaining
blocker is the **61-red ledger → green** and the three open findings above, **not** an install
route; (2) **`U-REALDOM-BOOT`** (the `ui` leg) must exist before **any** unit may claim a
real-DOM attribute row, a layout/geometry row, or that F-1 is proven — and it needs a
**display** (`H-r19`); (3) the **census re-parameterisation must land in the SAME commit** as
`U-FOCUS-TOOL`, or the tool turns a green suite red (`H-r18`). **20 units cannot land in one
pass** — the plan proceeds **wave-by-wave with a tracker reconciliation + handover at each
checkpoint** (waves A–F; `Amendment record (A-d4…A-d8)` §3).

**Open architect decisions** — recommendations are this record's, not rulings:

| # | Decision | Options | Recommendation |
| --- | --- | --- | --- |
| **Q1** | **The plan go-ahead — RE-OPENED for the 20-unit plan** | (a) approve the 20-unit sequence wave-by-wave, with `U-ENGINE-DRIFT` authorised to land as a **measurement-only** unit; (b) approve wave A only and re-adjudicate after the engine settles; (c) reject the A-d4…A-d8 adoptions and keep the 8-unit plan | **(a)** — with the explicit caveats that `U-ENGINE-DRIFT` may legitimately produce **zero code** and that the waves are checkpoints, not one pass |
| **Q2** | **The `setPointerCapture` reading** | (a) the **narrow** reading — capture forbidden before the interaction is established, permitted after, per-control opt-in; (b) the **strong** reading — no capture at all for these flows | **ANSWERED — (a)**, per `S-d9`/`H-r9`. The ruling stands and is now carried into `U-GUTTER`/`U-RELOCATE` as contract rows. **No further action** |
| **Q3** | **`SCH-3`'s marginal case** | (a) downgrade to a documented refile; (b) adopt as `U-THEME-MIN` | **ANSWERED — the architect chose adoption, in a shape neither option named:** A-d6 ruled **two units** (`U-THEME` + `U-THEME-CONTROL`), and `U-THEME-MIN` is **retired**. **The pre-amendment recommendation (a) is OVERRULED.** See `THEME-MECHANISM-AND-AUTHORED-CONTROL` |
| **Q4** | **`SCH-13`** | (a) confirm the decline; (b) overrule and adopt a `focus`/selection seam | **ANSWERED — the architect chose (b)**, via A-d5, **as its own gate**: the six-site wiring + the `mcp-endpoint.md` amendment (`H-r14`). **The pre-amendment recommendation (a) is OVERRULED.** See `FOCUS-UI-ONLY-MCP-TOOL` |
| **Q5** | **The install route + the shim call** | Install: (a) the architect runs it; (b) escalate under `~/.npm` (unavailable); (c) defer the retarget. Shim: (i) `removeAttribute` only; (ii) forbid it; (iii) a host-side no-undefined-props prohibition; (iv) (i)+(iii) | **INSTALL DONE — route (a) was taken** (`package.json:23` = `^0.5.1`, installed `0.5.1`). **Shim: (iv) stands** — `removeAttribute` only, plus the red-first `{status:'rejected'}` guard as **defence in depth, never a substitute**; `hasAttribute` is still **NOT added**. **CLOSED**, except for its side-effect → `Q7` |
| **Q6** | **The static-UI reading** | (a) app-state-derived chrome authored as provident graph data; (b) hand-authored HTML/CSS chrome | **ANSWERED — (a)**, per A-d7 (`H-r17`): `AGENTS.md:23-34` and `docs/decisions.md:53` are **UNCHANGED**; the region host **stays declined**; `U-SLOTHOST` adopted **host-only**. **No further action** |
| **Q7** | **NEW — the devDependency scope change: ACCEPT or REVERT** | (a) **ACCEPT** the three moves (`electron` `^44.4.5`, `esbuild` `^0.28.2`, `vitest` `^5.0.1`), amend `docs/specs/engine-pin.md`'s §2.1 diff-scope pin + the register; (b) **REVERT** to the declared pins, which needs **another architect-run install** (no in-session install route) | **ANSWERED — (a) ACCEPT** (status corrected 2026-09-27 by the unit's documentation review): the three moves are **accepted** and recorded as `docs/decisions.md` `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED`; §2.1/§5.1 name them; **nothing is reverted**. **The recorded risk stands and is not waived:** `electron` `^44` is a MAJOR jump against this repo's own `ELECTRON-PIN` row, the engine pin's red set never covered it, and the `ui` leg's Electron-44 API assumptions stay **unverified** until `U-REALDOM-BOOT` lands. The pre-decision "658/2 re-baseline" is superseded by the lands-green **789 / 2 skipped / 0 failed** *(the DONE-pass count — **⟶ 56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**)* |
| **Q8** | **NEW — the two unit-level blockers from the `U-ENGINE-PIN` red run** | (a) **the `R-13` seam**: give `SecurePanels` a public injection seam so the managed-channel row is writable, **or** rule `R-13` predicate-level only; (b) **the app-level `ui`-leg claim boundary + whether the demo appearance control ships at all** | **ANSWERED — the architect took (a) `SecurePanels.applyPaneMutation`, NOT the predicate-level-only option this record recommended** (status corrected 2026-09-27 by the unit's documentation review): the seam **landed** with red-first rows (`PF-1..PF-8`, `PF-1b`, `M9`) under §2.4a/§2.4b, and its `applied` is **derived** (`applied === (status === 'applied')`). **(b) the demo control SHIPS** (A-d6 requires it) and the `ui` leg's claims stay inside §1.13's honest limits. **The "also owed" `css.<key>` spec-bug amendment LANDED** (§2.3's covered-spellings bullet + the guard rows). See `docs/pending.md` §C (both findings annotated DISCHARGED) and `docs/decisions.md` `ENGINE-PIN-PANE-INJECTION-SEAM` |

## OPEN

**Rows C1 onward are `BLOCKED`** (then its spec, then a TestWriter red reported). **Rows A and B
have MOVED to the DONE records above — `U-ENGINE-PIN` (the ledger's first `DONE` row) and
`U-ENGINE-DRIFT` (the second, `DONE` 2026-09-27: a measurement record, `0` production code, `0` new
tests)** — and neither is in this table any more; their blocker/measured history stays visible in the
`CURRENT WORK` / `WAVE-B MEASUREMENT CHECKPOINT` blocks and the archived pre-green snapshot. The
`Legs` column is what a unit must run once delegable — **none of the rows below has been run.**
**Two DONE rows** (`U-ENGINE-PIN` and `U-ENGINE-DRIFT`, every declared leg green on each).
**⟶ WAVE-C UPDATE (2026-09-27, the wave-C checkpoint pass): `U-REALDOM-BOOT` (row `C1`) is
`LANDED-GREEN-BUT-NOT-DONE`** — the leg exists, its **27 rows** are green, the **live** `npm run ui`
leg is green (**`UI RESULT: 0 failures (5/5 rows green)`**, the ONE measurement **`427x22`** at
`fontSize="16px"`), and `npm run divergence` is **UNCHANGED** (`R13 RESULT: 9 checks, 0 failures`).
**It is NOT a third DONE row: three gates + one architect decision are still owed** (its two spec
defects are re-pinned) — see the
**`WAVE-C CHECKPOINT`** block above and row `C1`'s corrected `Blocked on` cell.
**⟶ `U-ENGINE-DRIFT` CLOSED OUT (2026-09-27): row `B` was `MEASURED`, and its DONE ruling landed —
the DONE record above is the authoritative cell.** The measurement record
(`docs/specs/engine-drift-measurements.md`, single reconciled ledger, `N = 57` = 47 `CONSISTENT` +
2 `DRIFTED` + 7 `UNMEASURABLE` + 1 `INVALID`) with **both `DRIFTED` rows' tracker halves landed**, the
red **run and reported as empty** (`56 files / 795 passed / 2 skipped / 0 failed`, **zero failures
attributable to the pin move**), the five legs green, the blind greens (**51 scenarios: 42 PASS /
3 FAIL / 6 NOT-BLIND-RUNNABLE**) and the adversarial pass (verdict on the record **as filed**:
**`NOT DONE-ELIGIBLE`** on two blocking findings, **both corrected and re-verified**) are all recorded
there. **Every row below
remains `BLOCKED` — no leg run, nothing green** *(**⟶ ONE EXCEPTION, added 2026-09-27 by the
wave-C checkpoint pass: row `C1` (`U-REALDOM-BOOT`) is **LANDED and its rows are green** — its
`Blocked on` cell no longer says `BLOCKED`; it is **`LANDED-GREEN-BUT-NOT-DONE`** and the **three
owed gates + one architect decision** it still owes are named in that cell (its two **spec** defects
— the `R1` marker and the scripts count — were **re-pinned by the wave-C SpecWriter** in the same
window, so they are recorded defects and not open gates). **Every other row below remains
`BLOCKED`/not started and no leg of those has been run.**)*
The wave
letter is the checkpoint it belongs to (`Amendment record (A-d4…A-d8)` §3). **All 20 units
are listed; 18 are open here — `U-ENGINE-PIN` and `U-ENGINE-DRIFT` are `DONE`** (`U-ENGINE-PIN` on
every declared leg green, including
`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`) and its one live finding
(`LIVE-OP-REJECT`) is **CLOSED — FIXED + LIVE-VERIFIED on 2026-09-27** (the renderer IPC unwrap,
now in `docs/defects.md`'s `## FIXED (in this repo)` section; live status flipped `rejected` →
`applied`) — it was HOST-owned and pre-existing and it never blocked this unit.**

| # | Wave | Unit | Spec it owes (path) | Derives from | Blocked on | Legs it must run |
| --- | --- | --- | --- | --- | --- | --- |
| **A — MOVED TO DONE (2026-09-27)** | A | The **`U-ENGINE-PIN`** row that stood here MOVED, not deleted — it is the **`U-ENGINE-PIN` DONE record** above (the ledger's first `DONE` row), which is the ONE authoritative cell. Nothing on this row is a blocker or a live claim: its former `Blocked on` cell is **spent**. | *(spec — unchanged)* `docs/specs/engine-pin.md` (filed + amended through block 7 + the `B-LANDED` reconciliation) + `docs/specs/engine-pin-greens.md` (third blind run: 104 rows / 96 PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE) + `docs/specs/engine-pin-live-status.md` (verdict: FINAL green) | A-d2 (+ `H-r7`) | **SPENT — nothing is blocked on this row.** Both former blockers discharged: **(i)** the harness spawn fix **LANDED** (`scripts/electron-divergence.mjs`; `U-DIVERGENCE-EXT` inherits the flags) and the leg was **re-run GREEN** by the supervisor on the post-change tree, and **(ii)** `LIVE-OP-REJECT` was adjudicated HOST-owned/pre-existing **and is now FIXED + LIVE-VERIFIED** (`docs/defects.md` `## FIXED (in this repo)`). Legs, final tree: `npm test` **56 files / 795 passed / 2 skipped / 0 failed** · typecheck clean · build clean (5 bundles) · battery **184 / 0** · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`**. *(Provenance: this row previously carried a duplicated, splice-damaged copy of its own cells — the markers and the stale `55 files / 789` / "NOT PASSED" text were removed by the 2026-09-27 repair; every superseded clause is recorded in the DONE-row repair note above and in `archive/next-steps/2026-09-27-engine-pin-pre-green-handover.md`.)* |
| **B — MOVED TO DONE (2026-09-27)** | B | The **`U-ENGINE-DRIFT`** row that stood here MOVED, not deleted — it is the **`U-ENGINE-DRIFT` DONE record** above (the ledger's **second** `DONE` row), which is the ONE authoritative cell. Nothing on this row is a blocker or a live claim: its former `Blocked on` cell is **spent**. | *(spec — unchanged)* `docs/specs/engine-drift.md` (**FILED 2026-09-27**) + **`docs/specs/engine-drift-measurements.md` — THE MEASUREMENT RECORD: LANDED 2026-09-27 (its own correction pass 2026-09-28)** (`N = 57` rows = 47 `CONSISTENT` + 2 `DRIFTED` + 7 `UNMEASURABLE` + 1 `INVALID`, single ledger; **0 production code / 0 new tests**) + `docs/specs/engine-drift-greens.md` (blind re-run: 51 scenarios / 42 PASS / 3 FAIL / 6 NOT-BLIND-RUNNABLE) | A-d2 (behavioural half) | **SPENT — nothing is blocked on this row.** The unit is `DONE` (2026-09-27) on every leg its spec declares, and it landed as §0 **ruling 3** authorises: a measurement record with **zero production code and zero new tests**. Red: the existing suite under the new pin, **RUN and REPORTED as empty** — `56 files / 795 passed / 2 skipped / 0 failed`, **0 failures attributable to the pin move**. Both `DRIFTED` rows' tracker halves landed (`RAW-STRING-CENSUS-RETIRED`, `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`); the adversarial verdict `NOT DONE-ELIGIBLE` (as filed) was discharged by the corrections and the record re-verified. Legs, final tree: `npm test` **56 files / 795 passed / 2 skipped / 0 failed** · typecheck clean · build clean (5 bundles) · battery **184 / 0** · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`**. *(Provenance: the row's former **MEASURED — NOT DONE** status and its §3.6-gated DONE ruling are superseded by the DONE record above; the row is not deleted.)* |
| **C1** | C | `U-REALDOM-BOOT` — the **`npm run ui`** leg: real Electron renderer under a controlled temp profile, driven over stdio MCP, **ONE** real measurement; red rows R0 isolation / R1 real+distinguishable / R2 one measurement / R3 shim recorded **UNSUPPORTED** / R4 the honest-limits row. **One additive production seam** (user-data override before the security store; absent ⇒ today's behaviour). **LANDED (2026-09-27) — the leg exists, every declared row is green, the ONE measurement is `427x22` at `fontSize="16px"`, and `npm run divergence` is UNCHANGED (`R13 RESULT: 9 checks, 0 failures`).** | **FILED** `docs/specs/ci-ui-leg.md` (**FILED 2026-09-27** — **no longer `OWED`**; the **`R1`-marker + scripts-count re-pin has LANDED in it**, by the wave-C SpecWriter pass, while this pass ran) + **LANDED** `package.json`'s `"ui"` key (**the TWELFTH script key** — the pre-unit block held eleven; the SpecWriter's `M-2` re-pin lands that count) + **LANDED** `scripts/electron-spawn.mjs` (the shared helper — the divergence leg calls it; arg vector/env/stdio/profiles unchanged, `R13` arithmetic untouched) + **LANDED** `scripts/electron-ui.mjs` | A-d8 | **⟶ NOT `BLOCKED` ANY MORE (corrected 2026-09-27, the wave-C checkpoint — the old cell read `BLOCKED` → `U-ENGINE-PIN` green; every one of those is MET: the spec is FILED, the leg is LANDED and green, and `U-ENGINE-PIN` (+ `U-ENGINE-DRIFT`) is `DONE`).** **What actually remains before a DONE row:** **(i)** the per-unit **adversarial** pass (RCA-3 — §3a/§3b are `OWED`); **(ii)** the **blind-greens** gate (item 10a — no `*-greens.md` exists); **(iii)** the per-unit **documentation review** (item 10d/RCA-6); **(iv)** the **`R1`-marker + scripts-count spec re-pin** — **⟶ LANDED by the wave-C SpecWriter while this pass ran**: `R1` is now pinned on the **discriminating element/renderer-API provenance** (`HTMLDivElement`/`CSSStyleDeclaration`, never `typeof window`) and the count is **TWELVE** keys; that file's §7 honest statements are its remaining residue; **(v)** the **architect's retry decision** — the leg can legitimately exit **2 PRECONDITION-FAILED** because `RK-14`'s flake class is **CONFIRMED REAL here** (`/dev/shm` writes forbidden ⇒ an Electron renderer intermittently dies `SIGTRAP` at bootstrap, ≈1-in-3 back-to-back; the pre-existing divergence leg is flaky identically). **Requires a DISPLAY** (`H-r19`) — met here | `npm run ui` (after `build`) — **RUN: exit 0, `UI RESULT: 0 failures (5/5 rows green)`** + the `ui` leg's own precondition: `npm run divergence` green for the **same built tree**, else **PRECONDITION-FAILED** (exit 2 — the specified authority order, never a bypass) |
| **C2** | C | `U-DIVERGENCE-EXT` — the `H-r10` scenario-envelope channel + the **attribute-presence extractor** (set-wise, never a substring diff) + a `props` falsy-toggle scenario. **`divergence`'s pinned N=9 stays EXACTLY intact** | an amendment to `docs/specs/ci-divergence-leg.md` (**`OWED — not filed` is SPENT: FILED by the wave-C SpecWriter pass — the `AMENDMENT BLOCK` is in the file; the row stays `BLOCKED` until its legs run**) | `H-r10` / A-d8 | `BLOCKED` → **then `U-REALDOM-BOOT` (SPENT — it HAS landed, 2026-09-27: the new leg exists and its rows are green, and the divergence leg already calls the landed shared helper `scripts/electron-spawn.mjs` with its arg vector/env/stdio/profiles unchanged)** (it modifies a **pinned, passing** leg and must be revertible without touching the new one) | `npm run divergence` (**N=9**) — and it is the **strict precondition** for every real-DOM **attribute** row |
| **D1** | D | `U-MOUNTGUARD` — the cross-envelope mount cardinality/identity probe (`SCH-1` invariant half) | `docs/specs/mount-invariant-guard.md` (**OWED — not filed**) | `SCH-1` invariant half | `BLOCKED` + spec + `TestWriter red` | node suite (the shim is host-owned test code — **no shim change needed**) |
| **D2** | D | `U-LISTHOST` — the owned-node list host (own-node ownership + order-as-projection; **not** a tab strip) | `docs/specs/listhost.md` (**OWED — not filed**) | `SCH-11` | `BLOCKED` → then the wave-D order → spec → `TestWriter red` | node suite; a real-DOM identity row (**optional**) → `ui` |
| **D3** | D | `U-SLOTHOST` — the slot **host** only: opaque keys → containers of caller-created nodes, caller-supplied order/attributes, own-node ownership, foreign siblings survive, unknown key ⇒ **typed refusal**, **NO `publish`** | `docs/specs/slothost.md` (**OWED — not filed**) | `SCH-9` host half (A-d7) | `BLOCKED` → then `U-LISTHOST` → spec → `TestWriter red` | node suite; a real-DOM identity row (**optional**) → `ui`. **Publisher half stays DECLINED — do not re-merge** |
| **D4** | D | `U-PROJ` — the pure projection + total applier (`SCH-8` **projection** half; `U-CENSUS` is separate) | `docs/specs/projection.md` (**OWED — not filed**) | `SCH-8` projection half | `BLOCKED` → then `U-SLOTHOST` → spec → `TestWriter red` | node suite; one measured custom-property value (**optional**) → `ui` |
| **E1** | E | `U-ZONES` — pure tracks/zones: `TrackSpec { trackProp, unit, emptyToken }` all caller-supplied; `isEmpty`, `trackFor`; **the literal `'0px'` is NOT built in**; no DOM/registry/writes; non-finite/negative ⇒ the empty token | `docs/specs/zones.md` (**OWED — not filed**) | `SCH-4` (A-d4) | `BLOCKED` → spec → `TestWriter red` | node suite. **Geometry clause:** the contract/arithmetic is provable here; **any rendered-geometry claim is UNPROVABLE in this repo today** → `ui` only |
| **E2** | E | `U-CENSUS` — `computeTrackVars(zones, census, sizes, revealed, specOf)` delegating token formatting to `U-ZONES`; `revealed` a **consumer decision, never a default**; key set **exactly `zones`**; **the census object is never mutated** | `docs/specs/census.md` (**OWED — not filed**) | `SCH-8` census half (**refile WITHDRAWN**, A-d4) | `BLOCKED` → then `U-ZONES` → spec → `TestWriter red` | node suite |
| **E3** | E | `U-GUTTER` — `createResizeController({session, axisFor, boundsFor, defaultSizeFor, isResizable, commit})` driven by the **adopted node-local session** (no second gesture authority) + an exported pure `clampToBounds`; one commit per gesture; cancel ⇒ zero commits/sink writes; reset ⇒ exactly one commit of the **supplied** default; no capture before establishment | `docs/specs/gutter.md` (**OWED — not filed**) | `SCH-6` (A-d4) | `BLOCKED` → then `U-CENSUS` **and `U-GSESSION`** (the session it composes) → spec → `TestWriter red` | node suite (call counts); rendered-geometry rows → `ui` only |
| **E4** | E | `U-RELOCATE` — `createRelocateSession({session, candidatesFor, resolveTarget, onReveal, commit, threshold})`; **reveal written EXACTLY ONCE per gesture at gesture end** (a deliberate strengthening — the fork's per-crossing implementation **fails this row** until it changes); resolve policy injected; interrupt/cancel leaves no retained sinks or listeners | `docs/specs/relocate.md` (**OWED — not filed**) | `SCH-7` (A-d4) | `BLOCKED` → then `U-GUTTER` → spec → `TestWriter red` | node suite |
| **E5** | E | `U-CONTAINER` — `tokensFor(chrome, tokenFn)` / `orientationFor(edge, axisResolver)` with the **mirror-class taxonomy caller-supplied** (no `is-empty`/`is-minimized`/`is-revealed` literals) + **ONE** shipped declaration (`contain: layout style paint`) whose **class name is caller-supplied**; consumer selectors/`:has()` stay consumer-side | `docs/specs/container.md` (**OWED — not filed**) | `SCH-10` (A-d4) | `BLOCKED` → then `U-RELOCATE` → spec → `TestWriter red` | node suite; **the real-DOM containment proof → the `ui` leg** |
| **E6** | E | `U-GSESSION` — the node-local interaction session (the A-d3 unit) | `docs/specs/gsession.md` (**OWED — not filed**) | `SCH-2` | `BLOCKED` → then `U-MOUNTGUARD` → spec → `TestWriter red` | node suite. **Divergence leg NOT required for the adopted core** — but the **F-1 behavioural row** requires the extended harness (`U-DIVERGENCE-EXT`), a **named precondition**, not an assumed capability |
| **E7** | E | `U-MENULIB` — the consumer-agnostic menu catalog builder + injected picker seam | `docs/specs/menulib.md` (**OWED — not filed**) | `SCH-5` | `BLOCKED` → then `U-GSESSION` → spec → `TestWriter red` | node suite |
| **E8** | E | `U-THEME` — the pure total `resolveTheme(setting, env)` + the **declaration-only** applier with a **caller-supplied** attribute name; **no token values, no `data-theme` literal, no `matchMedia`, no store** | `docs/specs/theme.md` (**OWED — not filed**) | `SCH-3` (A-d6) | `BLOCKED` → then `U-MENULIB` → spec → `TestWriter red` | node suite only (the six-prohibition static rows) |
| **E9** | E | `U-OVERLAY` — the overlay state machine + inert-background **declaration** + re-parent contract | `docs/specs/overlay.md` (**OWED — not filed**) | `SCH-12` | `BLOCKED` → then `U-THEME` **and `U-ENGINE-PIN`** (its `inert` rows need the landed pin + the `H-r7` completion) → spec → `TestWriter red` + **`U-DIVERGENCE-EXT`** if the real-DOM `inert` row is in scope | node suite; **the real-DOM half of any `inert` row → the `ui`/divergence leg** |
| **F1** | F | `U-THEME-CONTROL` — the **AUTHORED** provident appearance control in the demo envelope, dispatchable + MCP-visible through the **EXISTING** tools; **no new tool, no new group**; demo census drift **measured, not assumed** | `docs/specs/theme-control.md` (**OWED — not filed**) | `SCH-3` (A-d6) | `BLOCKED` → then `U-THEME` → spec → `TestWriter red` | node suite (+ the demo census-drift measurement). **Demonstration code — no unit may generalise it into a shipped appearance UI** |
| **F2** | F | `U-FOCUS-MODEL` — the pure ordered-entry transition module over opaque ids/targets with injected `refuse`/`onChange`/`persist`; **no vocabulary, no store, no DOM** | `docs/specs/focus-model.md` (**OWED — not filed**) | `SCH-13` (A-d5) | `BLOCKED` → then `U-THEME-CONTROL` → spec → `TestWriter red` | node suite only |
| **F3** | F | `U-FOCUS-TOOL` — the new MCP tool: group **`dispatch`**, **NOT** in `MUTATING_METHODS`, **emits no notification**, persists nothing, cannot force a re-render; **`ALL_TOOLS` 21 → 22, `RpcMethod` 21 → 22** (CORRECTED 2026-09-27 — the live census is **21**, `src/shared/types.ts:259-280`, asserted at 21 by `tests/engine-pin-version.test.ts:174-197`; the pre-correction **"19 → 20"** is stale and must not be quoted), default-gate subset 7 → 8; the **six wiring sites** incl. the **unchanged** notification path and the **no-change** preload bridge | `docs/specs/focus-tool.md` (**OWED — not filed**) + the `docs/specs/mcp-endpoint.md` amendment (**§3 · new §3.8 · §6.2 incl. the `module` row · §7 · §8 · §9**) + **the census rows of `tests/engine-pin-version.test.ts` — the SET-EQUALITY re-parameterisation has ALREADY LANDED (`:85-165`: `PINNED_TOOL_SET` compared by set equality; the `ALL_TOOLS === 21` count is retained only as a duplicate check), so the remaining same-commit obligation is to ADD `provident.focus` to that set + the `RpcMethod` census (`21 → 22`) + the default-gate subset, IN THE SAME COMMIT AS THE TOOL** + `docs/specs/mcp-server-gate.md`'s counts | `SCH-13` (A-d5) | `BLOCKED` → then `U-FOCUS-MODEL` → spec → `TestWriter red`. **The census re-parameterisation may NOT be deferred** — land it in the same commit or the tool turns a green suite red (`H-r18`) | node suite · battery · **the `ui` leg once it exists** (the tool must be observable in a live window) + the **negative notification row** |
| **F4** | F | **`H-r1` correction package owed to the FORK** — the per-item disposition re-issued in this repo's own voice with the withdrawal set (`SCH-2`/`SCH-5`/`SCH-8`/`SCH-11` → this repo; `SCH-12`'s package refile withdrawn; **`SCH-13` and `SCH-3` move OUT of the declined set under A-d5/A-d6**; **`SCH-4`/`SCH-6`/`SCH-7`/`SCH-10` move OUT under A-d4**; **`SCH-9` is now host-adopted/publisher-declined**; `SCH-1`'s region half **stays** declined; `SCH-8`'s `computeTrackVars` half **stays with this repo**), plus the `[target]`/`[fork]` attribution corrections, the `SCH-2`/`SCH-6`/`SCH-7` capture-reading row edits, and the **prohibition-5 clarification** (so the fork does not read the handoff as banning tools) | **no path in this repo** — see `docs/specs/provident-electron-shell-chrome-handoff-review.md` (`H-r1`, `H-r2`, `H-r9`, `H-r14`) and `docs/FORKER.md` §4 | `H-r1` / `H-r2` / `H-r9` / `H-r14` | **`BLOCKED` — the fork's own pass.** This repo writes **no** file under `<Astrographer>/`; nothing here can action it | n/a (documentation handoff) |

**Total: 20 units (A/B: 2 engine · C: 2 harness · D: 4 · E: 9 · F: 3) + the fork correction
package as a queue row (NOT a unit). 2 DONE — `U-ENGINE-PIN` (wave A) and
`U-ENGINE-DRIFT` (wave B): COMPLETE on every leg each spec declares. `U-ENGINE-PIN` (`npm test`
**55 files / 789 passed / 2 skipped / 0 failed** *(the DONE-pass
count — **⟶ 56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix
pass** — **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C
`U-REALDOM-BOOT` landing pass**, which added that unit's two `ui`-leg test files / 27 rows)* · typecheck clean ·
build clean · battery **184 checks / 0 failures** · **`npm run divergence` → `R13 RESULT: 9
checks, 0 failures`**); its one live finding `LIVE-OP-REJECT` is **CLOSED — FIXED + LIVE-VERIFIED (2026-09-27)**: it was a
HOST-owned, pre-existing defect that never blocked the unit, and it now sits in `docs/defects.md`'s
`## FIXED (in this repo)` section; its DONE record is above.** **`U-ENGINE-DRIFT`'s DONE record is
also above** (a measurement record with **0** production code and **0** new tests, its red **run and
reported as empty** — `56 files / 795 passed / 2 skipped / 0 failed` *(that run's count — **⟶ 58
files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing
pass**)*, **0** failures attributable to
the pin move — with `N = 57` = 47 `CONSISTENT` + 2 `DRIFTED` + 7 `UNMEASURABLE` + 1 `INVALID`; the
other four legs green: typecheck clean · build clean (5 bundles) · battery **184 / 0** ·
`npm run divergence` **9 / 0**). **The `## OPEN` table
therefore carries **18** rows (rows A and B moved to the DONE records, 2026-09-27) — **18 remain
`BLOCKED`/not started** (*with **one exception added 2026-09-27**: row `C1` is **LANDED and its rows
are green** — `LANDED-GREEN-BUT-NOT-DONE`, three owed gates + one architect decision — so read
"18 blocked" as **17 `BLOCKED` + row `C1` landed-but-not-DONE**; **no third DONE row exists**)*, and **no row is in the `MEASURED` state any more: row `B`'s ruling landed**
(see the **WAVE-B MEASUREMENT CHECKPOINT** block for its measured history); the
`U-DIVERGENCE-EXT` spawn fix the old row named is
**landed** (that unit **inherits** it), and the `H-r10` extractor it still owns is
**unaffected**.

**Tracker reconciliation for this pass (2026-09-27, the `U-ENGINE-PIN` documentation review,
AGENTS.md item 10d / RCA-6):** the pre-amendment execution-log blocks were **archived** (see
the `CURRENT WORK` block's pointer) and every `docs/next-steps.md:<n>` citation held by other
files was re-resolved in the same pass; `U-DIVERGENCE-EXT`'s role (it owned the harness-spawn
fix and the `H-r10` extractor), the wave-A unit's new production surface
(`SecurePanels.applyPaneMutation`) and its rollback boundary are recorded in
`docs/decisions.md`'s `ACTIVE — the U-ENGINE-PIN decision set` block, the unit's
**live-leg verdict + finding** are recorded in `docs/specs/engine-pin-live-status.md`, and the
per-unit documentation-review record is
`archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`.

**Tracker reconciliation for the DONE pass (2026-09-27, the supervisor's pass):** `U-ENGINE-PIN`
moved from `## OPEN` row A into the DONE record above; `docs/decisions.md` gained the
`ACTIVE — the U-ENGINE-PIN DONE-pass decision set` block (`DIVERGENCE-SPAWN-FIX`,
`DIVERGENCE-LEG-GREEN-POST-CHANGE`, `LIVE-OP-REJECT-IS-A-HOST-DEFECT`) plus amendment notes 6/7
on the pre-existing rows it supersedes; `docs/defects.md` gained the **`LIVE-OP-REJECT`**
row **under an explicit HOST-owned caveat** (the catalogue is the *package*-gap list, so **no
`docs/HANDOFF.md` round and no upstream issue is owed** for it) — **it was filed OPEN there and has
since MOVED into that file's `## FIXED (in this repo)` section (the 2026-09-27 fix pass)**; `docs/pending.md` parked the two
owed **fixture-data** items (§7.12/§7.13) and its `U-ENGINE-PIN`/`ENGINE-0.5`/`ui`-leg rows no
longer say the divergence leg is unavailable; `docs/specs/engine-pin-live-status.md` was updated
from **`BLOCKED-with-signature`** to the **FINAL green state**; and the two spec files carry the
short status note (divergence green **post-change**; `LIVE-OP-REJECT` a host defect **outside**
this unit's scope — **since FIXED + live-verified, 2026-09-27**). **One citation was re-resolved in the same pass:** `docs/pending.md`'s
`docs/next-steps.md ## OPEN row A` reference (row A is now the DONE record) and
`docs/specs/engine-pin.md`'s matching parenthetical. **`U-DIVERGENCE-EXT`'s role is now
narrower:** it **inherits** the landed spawn fix (`--disable-dev-shm-usage` + a fresh scratch
`--user-data-dir`) and still owns the `H-r10` scenario-envelope channel, the attribute-presence
extractor and the `props` falsy-toggle scenario.

**Tracker reconciliation for the `LIVE-OP-REJECT` fix pass (2026-09-27):** the defect is **FIXED +
LIVE-VERIFIED** and this pass moves it OPEN → CLOSED across the docs. `docs/defects.md`: the row
**MOVED** from `## OPEN` to `## FIXED (in this repo)` with its as-filed history kept, plus the
landed hunk + unwrap expression (`src/renderer/renderer.ts:43`), the RED row that pinned it
(`S1`), the fallback row (`S2`), the `load`-stays-raw row (`S3`), the fail-safe rows (`F1`/`F2`),
the `S1b` notify row, the `handleRequest` `export` seam (`:14`), the live before/after status
(`rejected` → `applied`) and the five leg results (**56 files / 795 passed / 2 skipped / 0
failed** · typecheck clean · build clean · battery **184/0** · divergence **9/0**). `docs/decisions.md`:
`LIVE-OP-REJECT-IS-A-HOST-DEFECT` annotated **CLOSED**, the new **`LIVE-OP-REJECT-CLOSED`** row
added, `ENGINE-PIN-DIVERGENCE-LEG-IN`'s tail annotated, amendment notes 5/7 and
`DIVERGENCE-LEG-GREEN-POST-CHANGE` re-pointed. `docs/pending.md`: the governing counts
(**1 DONE · 1 unit fully green** *at that pass — **⟶ 2 DONE · 2 units fully green after the
2026-09-27 wave-B DONE pass***), the `UPSTREAM-ENGINE-0.5` status clause, §D's closing note and
the devDependency row's count. `docs/specs/engine-pin.md`: the status block + §7.2 item 2 + the
§4.4/§8 notes + the leg bullet, with **the layer note kept** (the envelope layer was never broken;
the defect lived on the **IPC hop**). `docs/specs/engine-pin-live-status.md`: §0's finding bullet,
the `provident.op` per-class row (**FAIL → PASS**), `§3.1`'s live-rows table, **§5's adjudication
heading + blockquote (now carrying the fix + the live re-verification)** and the §8 hygiene note.
`docs/specs/engine-pin-greens.md` + `docs/FORKER.md`: their "open / stays OPEN" clauses. This file:
every counted occurrence (**55 files / 789 → 56 files / 795**, each annotated as the DONE-pass count
where a historical claim was kept), the `CURRENT WORK` block, the six-item snapshot, the DONE prose,
the dated correction under the DONE row, the queue tables and the summary. **No `docs/HANDOFF.md`
upstream row exists or is owed for this defect** — it was never a `provident-ssr` defect, and
`docs/HANDOFF.md`'s Round-8 annotation now says so with the CLOSED status.

**Tracker reconciliation for the wave-B DONE pass (2026-09-27, the supervisor's pass,
`AGENTS.md` item 3/6/10d):** `U-ENGINE-DRIFT` moved from `## OPEN` row **B** into the
**`U-ENGINE-DRIFT` DONE record** above (**not deleted** — the `WAVE-B MEASUREMENT CHECKPOINT` block
stays as its measured history, annotated superseded on its status lines only). **The same pass
corrected two stale cross-document clauses the wave-B doc pass reported but could not touch** —
`docs/specs/provident-electron-shell-chrome-handoff-review.md` (`H-r12` + the `Filings this verdict
owes` annotation, both of which asserted the destroy-undo `applied`/fall-through claim) and
`docs/specs/engine-pin.md` (**§7.8**, which read *"`UNDO-REDO-DESTROY-STATUS` is NOT resolved by this
unit … the destroy-undo false-success survives the version move"*) — **each corrected to the measured
reality with the file's `SUPERSEDED` convention and citing
`docs/specs/engine-drift-measurements.md` `M-31` + `docs/decisions.md`
`UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1` and `RAW-STRING-CENSUS-RETIRED`** (in `engine-pin.md` the
correction is a **status note under a numbered honest-statement item — "no requirement of this
contract changes"**, which is that file's own convention for a status-only correction; §7.7 was read
and **carries no bare-name/removal claim**, so nothing was changed there). **Trackers reconciled:**
`docs/pending.md` (the `R-16`/`R-17` control row — *"STILL OPEN"* → **the ruling-2 EXCLUSION of the
`0.2.1` baseline + the historical-output claim recorded `UNMEASURABLE` (`M-49`)**, which is what the
ruling actually decided; the governing counts → **2 DONE · 2 units fully green**), `docs/FORKER.md`
(the `U-ENGINE-DRIFT` row → `DONE`; the digest counts → **2 DONE · 2 units fully green**),
`docs/HANDOFF.md` (the Round-3 annotation's stale *"and Round 9 remains **open**"* — measured reality:
**Round 9 is CLOSED as delivered-by-the-resolve-guard**), and this file (the DONE record, row B's move,
the checkpoint's status lines, the `## OPEN` prose, the `0 PARK · 2 DONE · 2 units fully green` counts
and the totals line). **Read, not written (a parallel pass owns the record; a SpecWriter owns the
spec):** `docs/specs/engine-drift-measurements.md` and `docs/specs/engine-drift.md` — including the
**blind-run reconciliation** (the greens file's `F-1`/`F-2`/`F-3`, all three already reconciled in the
record with **no verdict moved**). **⟶ THE PER-UNIT DOCUMENTATION REVIEW (AGENTS.md item 10d/RCA-6)
HAS SINCE RUN, closing the repo-wide audit's `O-1`:** record
`archive/reviews/2026-09-27-U-ENGINE-DRIFT-doc-review.md` (provenance — gitignored). Its `SAME-PASS
FIXES` landed here and in three other files: this block's *"DONE row remains owed"* cell (now marked
SPENT in-line), `docs/specs/provident-electron-shell-chrome-handoff-review.md`'s amended-plan row
`U1` spec cell (*"`OWED — not filed`"* → annotated SUPERSEDED: the spec is FILED and the unit is
`DONE`), `docs/HANDOFF.md`'s two engine-pin/baseline annotations (the *"still belongs to
`U-ENGINE-PIN`/`U-ENGINE-DRIFT`"* and *"re-baselined by `U-ENGINE-DRIFT`"* clauses → annotated
DELIVERED/SPENT, with the `## OPEN`-row citation repointed to the DONE record), and
`docs/specs/engine-drift-greens.md` §5 (a NOT-BLIND-RUNNABLE arithmetic defect: `42 + 3 + **7**` over
the 51 scenario ids, with `BL-38` inside §2 and `BL-16` the only section-only id — corrected in
place with a correction note; the as-filed header line is kept). **The record's 57 rows, its single
ledger (`N = 57 = 47 + 2 + 7 + 1`), the `INVALID` row's in-place handling and every revisit condition
were re-enumerated and CONFIRMED** (see that record's §2 for the re-runnable method).
**Not touched:** `src/**`, `tests/**`,
`scripts/electron-divergence.mjs` (the `N = 9` pin), `package.json`, `node_modules/**` and the
upstream folder.
