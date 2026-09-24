# Live status — `U-REALDOM-BOOT` (gate 6: the LIVE BATTERY for the `npm run ui` leg)

**Unit:** `U-REALDOM-BOOT` (wave `C`) — the real-DOM measurement leg (`npm run ui`), its ONE
additive seam, and the §3.7 `RT-1`…`RT-9` retry policy.
**Scenarios under test:** `docs/specs/ci-ui-leg-greens.md` — the independent **blind** run,
**26 scenarios / 16 PASS / 4 FAIL / 6 NOT-BLIND-RUNNABLE**.
**⟶ GATE STATUS AFTER THE `F-1` RCA + FIX PASS (2026-09-27, SIXTH pass — status/annotation only; this
pass ran no leg and its every number is the `F-1` fix pass's recorded measurement, attributed):
BOTH LIVE FINDINGS ARE NOW CLOSED — `F-1` (leftover scratch profiles) **CLOSED** (§6.1: the
spawn-the-BINARY fix + the cleanup-hook-at-creation fix, with the RCA and the exit-path matrix) and
`F-2` (the timeout-class retryability RACE) **CLOSED** (§6.2).** The unit is **no longer gated by any
live finding**: what remains is the **per-unit documentation review** (item 10d/RCA-6 — for which this
unit is now **eligible**) and the supervisor's **`DONE` row**. The greens' **`RT-05` FAIL** carries the
corrected disposition **REAL DEFECT, NOW FIXED** and the blind record's **`R0-04` FAIL** carries
**REAL DEFECT, NOW FIXED** (their row texts in that file are **not** rewritten); and **no row of this
record is converted to a pass by the update** — the `NBR-*` dispositions stand as recorded. The
as-filed verdict in §0 and the as-filed finding texts in §6.1/§6.2 are **kept struck-but-visible**.
**The one split this header must carry:** the earlier *"delete-and-verify sweep + recorded report"* fix
closed the **REPORTING half only**; **this pass closes the END STATE** (§6.1's split table).
**Previous header state (fifth pass), kept as the record:** `F-2` **CLOSED** · `F-1` **(then) REMAINS
OPEN**.
**Contract:** `docs/specs/ci-ui-leg.md` (§3.0 red rows `R0`–`R4`, §3.1 the pinned sequence, §3.4 the
`UNSUPPORTED` word set, §3.6 the exit codes, **§3.7 `RT-1`…`RT-9` + its PRECEDENCE CLAUSE**, §5 the
precondition `PRE-1`…`PRE-4`, §6 `DIS-1`…`DIS-5`, §3a seed `U-10`/`U-14`); the divergence leg's
own contract is `docs/specs/ci-divergence-leg.md` (§1 isolation/hermeticity, §5 the `N = 9` pin).
**This pass's job (gate 6, MANDATORY and now runnable):** drive the blind run's **6
NOT-BLIND-RUNNABLE** rows — *the retry's runtime half* — against the **live** application, re-drive
the core live rows, and record every verdict with its verbatim evidence.
**Date stamp:** the host clock reads **2026-09-24** during this work; the unit, its contract and its
trackers file this work under **2026-09-27** (the same host-clock-vs-filing-calendar offset
`docs/specs/ci-ui-leg-greens.md`'s header records). **Cite the filing date.**

**⟶ ADVERSARIAL PASS + ADVERSARIAL-FIX PASS (2026-09-27) — READ THIS BEFORE ANY STATUS LINE BELOW, WHICH
IS KEPT AS ITS DATED RECORD:** **the adversarial pass HAS RUN** (`docs/specs/ci-ui-leg.md` §3a's
**ADVERSARIAL PASS RECORD**, `AP-1`…`AP-5`: a **read-only sweep of all 14 seeds `U-1`…`U-14`**, none
obsolete, verdict **`FIT for the DONE row`** — no security escalation, no fabricated-measurement path, no
retry that masks a failure, **no PACKAGE defect ⇒ no `docs/HANDOFF.md` round owed**; `M-46` stays
`UNMEASURABLE`) **and its HOST findings are FIXED** — `G-1` (MED, the headline: the leg now takes its **OWN
`DISPLAY` observation before the precondition spawns** and the divergence-child spawn **no longer injects
`DISPLAY || ':0'`**, §3.1's DECISION order and `PRE-1`/`PRE-3`/`RT-8` item 2 intact, a `G-1` **diagnostic-only**
note on the red-precondition branch) · `G-2` (`R0`(c) now **OBSERVES** the operator profile read-only —
existence + per-store presence/mtime/size, never contents — before/after) · `G-3` (`R4`'s executed row scans
the leg's **CODE**, comment-aware, for the honest-limits **call-site set** and prints exactly what it checks)
· `G-6` (the TDZ-unsafe guard is gone) · `G-7` (the **effective** per-boot ceiling, with its derivation and
the unbounded-above note) · `G-13`'s `scripts/**` third (the three stale comments). **ROUTED, STILL OPEN:
`G-4`** (TestWriter, `tests/**` — the `R1` row matched the **STRUCK** `typeof window` marker). **PARKED with
revisit conditions: `G-6`'s residual case / `G-8` / `G-9`** (`docs/pending.md` §F). **`G-1`'s NAMED RESIDUAL
(owner: the divergence leg's `PRE-4` / `U-DIVERGENCE-EXT`):** a **display-less host with NO X server still
exits `2`**, because the **PINNED** divergence leg manufactures `:0` for its own child. **THIS RECORD'S OWN
STATUS IS THEREFORE SPENT IN ONE PLACE AND NOT ANOTHER, stated plainly:** **the unit IS `DONE`** (2026-09-27,
the supervisor's DONE pass — the record is `docs/next-steps.md`'s `## DONE — U-REALDOM-BOOT` section with
its dated `⟶ ADVERSARIAL-FIX PASS` note), **so every `LANDED-GREEN-BUT-NOT-DONE` line below and every owed
list naming the documentation review / the `DONE` row / "the adversarial pass's own record" is SPENT** —
while **this battery's own verdicts, its `F-1`/`F-2` closures, its exit-path matrix and its `NBR-*`
dispositions stand exactly as recorded, unchanged by the adversarial pass and by the fixes** (**no `NBR-*`
row was re-dispositioned, no seed retired, no row converted to a pass**). **Post-fix verification
(implementer-measured):** `npm run ui` **exit 0**, **`11/11`**, **`427x22`**, **`retries=0`**, **`leftover
profiles: NONE`**, `ls -d /tmp/provident-ui-run-*` **empty**, **`0` roots on every exit path**, the
raised-timeout run prints **`181750 ms for THIS configuration`**; unit **`68/68`**; `npm test`
**58 files / 863 passed / 2 skipped / 0 failed**; typecheck + build **clean**; battery **`184/0`**;
`npm run divergence` **`R13 RESULT: 9 checks, 0 failures`** (UNCHANGED).

**⟶ SIXTH-PASS CLOSURE NOTE (2026-09-27, the `F-1` RCA + fix pass's documentation half — STATUS/ANNOTATION
ONLY; this pass ran no shell, no leg and no build, and every number it records is that fix pass's
measurement, attributed):** **BOTH live findings of this battery are now CLOSED — `F-1` CLOSED (§6.1,
with the RCA, the fix and the exit-path matrix) · `F-2` CLOSED (§6.2).** The **as-filed text of both
findings is kept struck-but-visible**, and **no normative clause of `docs/specs/ci-ui-leg.md` was
rewritten** by this pass. **The one split this record must not blur:** the *reporting* half of `F-1` was
closed by an **earlier** pass (the delete-and-verify sweep + the recorded cleanup report — the `R0-04`/
`U-10` "FIXED" reading), and **this pass closes the *end state*** — the leftover roots are now
**actually gone**, because the leg no longer spawns a **CLI wrapper whose child is the real app**.
**The earlier "FIXED" reading is therefore kept and CORRECTED, not deleted** (`docs/specs/ci-ui-leg.md`
AMENDMENT BLOCK 6 `B6-5`), and **`docs/next-steps.md`'s owed list for this unit is now two items: the
per-unit documentation review — for which the unit is ELIGIBLE — and the supervisor's `DONE` row.**
*(**⟶ BOTH ARE DISCHARGED 2026-09-27:** the documentation review **RAN** (`archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md`)
and the **`DONE` row IS WRITTEN** — the unit is **`DONE`** on every leg its spec declares
(`docs/next-steps.md`'s `## DONE — U-REALDOM-BOOT` record); the sentence above is kept as the seventh-pass
reading it was. **What this file still owes: nothing** — and the **adversarial pass has since RUN** and its
HOST findings are FIXED (see the ADVERSARIAL-FIX header note at the top of this file), with `G-4` the one
routed item **OPEN** at the TestWriter.)*

---

## 0. GATE VERDICT — **the live battery RAN IN FULL (nothing parked): GREEN on the five declared rows `R0`–`R4` and on all four legs — CLEAN ON BOTH FINDINGS NOW: `F-1` CLOSED · `F-2` CLOSED**

> ## ✅ **LIVE BATTERY: EXECUTED. `R0`–`R4` PASS (11/11, ONE measurement `427x22`); BOTH FINDINGS ARE NOW CLOSED — `F-1` (the leftover scratch profiles) by the spawn-the-BINARY fix + the exit-path matrix (§6.1), `F-2` (the timeout-class retryability race) by the settle-snapshot fix (§6.2). The as-filed verdict and both as-filed findings are kept struck-but-visible below.**
>
> **⟶ ✅ UPDATE 2 (2026-09-27, the `F-1` RCA + fix pass — READ THIS BEFORE THE BLOCK BELOW, WHICH IS THE AS-FILED VERDICT AND IS KEPT STRUCK-BUT-VISIBLE):** **`F-1` IS CLOSED — the leftover scratch profiles are FIXED and VERIFIED on every exit path.** **Root cause (established by reading + measurement):** `scripts/electron-spawn.mjs` spawned **`node_modules/.bin/electron`** — a **symlink to `electron/cli.js`**, a Node **WRAPPER that `spawn`s the real binary as its own child** — so the `child` handle the helper held was the **wrapper, not the app**: killing it **orphaned** the real Electron main process and its Chromium helpers, which kept writing into the scratch profile and **re-created the profile directory after `cleanupProfiles` had unlinked and verified it**. The leg's report was therefore true at the moment it looked and false afterwards (`leftover profiles: NONE` while the directory survived — **31 roots** had accumulated in one session). **The discriminating evidence:** the leftovers contained **only Chromium artifacts and no `provident-security.json`** — the leg's **own seeded store WAS deleted**, which is exactly what made the re-creation invisible. **The fix (LANDED, `scripts/electron-spawn.mjs` + `scripts/electron-ui.mjs`):** **(1)** `electronBin` now resolves the **BINARY** (`node_modules/electron/dist/electron`, falling back through the package's `path.txt` contract to the bare package entry) under an explicit **no-fallback-to-the-wrapper** rule that **throws a named error** if no binary is found — **one process, one handle, no orphaned grandchild**, and the **stdio chain stays SINGLE-HOP** (the `detached: true` + process-group alternative was **tried and BACKED OUT** because it regressed the SDK stdio transport: `R13 RESULT: 1 checks, 2 failures`); **(2)** the leg's **`process.on('exit')` cleanup hook is now registered at the moment `scratchRoot` is created**, not ~350 lines later after the retry-config validation — the malformed-config path (`PROVIDENT_UI_BOOT_ATTEMPTS=abc` ⇒ `process.exit(1)`) had been exiting **BEFORE the hook existed** and leaking an **EMPTY** scratch root; the hook is **idempotent** (so the signal handlers and the explicit call sites still work) and a **`typeof activeBoot !== 'undefined'` guard** covers an exit during module evaluation. **Exit-path matrix — ALL paths now leave ZERO roots, checked immediately and after an 8 s settle:** green ⇒ exit **0**, roots **0** · malformed config ⇒ exit **1**, roots **0** · timeout-class exhaustion ⇒ exit **1**, roots **0** · `npm run ui` ⇒ **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, roots **0** · **0 surviving `electron` processes** after the runs. **The leg's own report is unchanged** (`removed 2 scratch profile(s) … leftover profiles: NONE`) and **now MATCHES the disk.** **`F-2` stays CLOSED** (§6.2), **regression-free** (unit rows **`68/68`**; `npm test` **58 files / 863 passed / 2 skipped / 0 failed**; typecheck clean; build clean; battery **184 checks / 0 failures**; **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`**, the pinned **`N = 9`** intact and **0 roots** after the divergence leg too), and **the race fix still holds** (`120`/`200`/`260 ms` ⇒ `RT-7 EXHAUSTED` exit `1` with every attempt recorded; `300 ms` ⇒ accepted, `427x22`). **No contract clause changed; the leg was corrected to the contract.** **The ONE line that moved in the "consequence" paragraph below: the recorded state is now live-run, `R0`–`R4` green, `F-1` CLOSED · `F-2` CLOSED — what remains is the per-unit documentation review and the supervisor's `DONE` row.**
>
> **⟶ ✅ UPDATE 1 (2026-09-27, the RCA + fix pass — READ THIS BEFORE THE BLOCK BELOW, WHICH IS THE AS-FILED VERDICT AND IS KEPT STRUCK-BUT-VISIBLE):** **`F-2` IS CLOSED — the timeout-class retryability RACE is FIXED and VERIFIED.** The fix **snapshots the handshake state at the instant the raced verdict settles** (`const handshakeResolvedAtSettle = resolved` in the leg's `catch`, `scripts/electron-ui.mjs:641`, read; handed to the predicate at `:660`, **before** the termination-grace `await` at `:651`), so **both halves of the retryable signature now describe the same instant** (the timer instant). **The boundary is now MONOTONIC:** **`120`/`200`/`260 ms`** → **`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`**, exit **`1`**, **every attempt recorded in order**; **`300 ms`** → **accepted**, **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, measurement **`427x22`**. **No contract clause changed** (`RT-1`/`RT-2`/`RT-4` item 3 and the PRECEDENCE CLAUSE are unchanged — the leg was corrected to the contract). **`F-1` (the leftover scratch profiles) was NOT closed by that pass — it is CLOSED by UPDATE 2 above (§6.1).** **The two closed/dispositioned rows that update moved: `F-2` → CLOSED (§6.2); the greens' `RT-05` FAIL → its disposition is corrected to *REAL DEFECT, NOW FIXED* (its row text in `docs/specs/ci-ui-leg-greens.md` is NOT rewritten).** **`NBR-03`/`NBR-04`/`NBR-05` are NOT re-dispositioned** — those passes re-ran no leg; the numbers below are the fix passes' recorded measurements, attributed.
>
> **THE AS-FILED VERDICT (2026-09-27, first live-battery pass — kept verbatim as the record of what was wrong):**
>
> **What PASSES live, in one list:**
> - **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`** (exit 0) — `N = 9` intact.
> - **`npm run ui` → exit 0**, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five
>   declared rows R0-R4)`, **ONE** measurement **`427x22`** at `fontSize="16px"`, `retries=0`, all
>   five declared rows `R0`(a)/(b)/(c), `R1`, `R2`, `R3`, `R4` green (§2/§3).
> - **All 6 of the blind run's NOT-BLIND-RUNNABLE rows are CLOSED** by live evidence (§4): a **real
>   retry**, a **real exhaustion**, the **timeout class as a real retry case**, the **labelled
>   retried green**, a **genuinely red precondition (`exit 2`)** and the **DISPLAY absence
>   (`exit 3`)** — plus `RT-2` class 1 (a completed boot with a wrong row is **not** retried), the
>   `SEAM-*` node rows driven live, and the divergence leg's spawn-boundary argv captured.
> - **`npm test`** 58 files / **863 passed** / 2 skipped / 0 failed · **`npm run typecheck`** clean ·
>   **`npm run build`** clean · **`npm run battery`** **`184 checks, 0 failures`** (§1).
> - The two greens FAILs that were **documentation/implementation drift** are **CLOSED by the landed
>   state, live-verified**: the leg prints the **`121750 ms`** ceiling the spec now pins (`RT-06`) and
>   `docs/decisions.md` now names both operator knobs (`RT-08`) (§6).
>
> **What is NOT clean — both are findings, neither is a pass:**
> - ~~**`F-1` (OPEN) — the gate's explicit hygiene requirement FAILS: every green run leaves a scratch
>   root holding BOTH attempt profiles on disk, while the leg reports `leftover profiles: NONE`.**~~
>   **⟶ ✅ CLOSED 2026-09-27 (UPDATE 2, the `F-1` RCA + fix pass): the spawn-the-BINARY fix + the
>   cleanup-hook-at-creation fix leave ZERO roots on every exit path (green · malformed config ·
>   timeout-class exhaustion · `npm run ui`), checked immediately and after an 8 s settle, with 0
>   surviving `electron` processes — see §6.1's CLOSED entry (the as-filed text is kept struck, not
>   deleted).** **The as-filed finding text follows, kept verbatim so the record shows what was wrong:**
>   Measured **4 of 4** repo-leg green runs (`ls -d /tmp/provident-ui-run-*` → **1** root, **2**
>   attempt profiles, still present at t+3 s and t+10 s), and **2 of 2** out-of-tree A/B runs that
>   reproduce the repo's **two-process spawn chain** (a Node wrapper that SPAWNS Electron, which is
>   exactly what `node_modules/.bin/electron` → `node_modules/electron/cli.js` is); the single run
>   whose spawn chain `exec`-ed straight into the Electron binary left **none** (§7.1). The
>   **blind run's `R0-04` FAIL is therefore NOT closed** — and it is *worse* than recorded, because
>   the cleanup **report** claims a clean state that does not hold. A second, strictly deterministic
>   leak rides the same clauses: **`npm test` creates exactly 6 empty `/tmp/provident-ui-run-*` roots
>   per run**, with the root cause read from the code (the malformed-config path calls
>   `process.exit(1)` **before** the `process.on('exit')` cleanup hook is registered — §7.1).
>   **⟶ BOTH LEAKS ARE NOW FIXED (§6.1): the orphaned-grandchild leak by the binary spawn, the
>   empty-root leak by registering the hook at `scratchRoot` creation.**
> - ~~**`F-2` (OPEN) — the TIMEOUT class's retryability is RACE-DEPENDENT, so §3.7's PRECEDENCE CLAUSE
>   (B3-3) is only half-implemented.**~~ **⟶ ✅ CLOSED 2026-09-27 (the RCA + fix pass): the RACE is
>   FIXED and VERIFIED — see §6.2's CLOSED entry below (the as-filed text is kept struck, not
>   deleted). The fix snapshots the handshake state at the instant the raced verdict settles
>   (`handshakeResolvedAtSettle`, `scripts/electron-ui.mjs:641`, read; handed to the predicate at
>   `:660`, before the grace `await` at `:651`), the boundary is now MONOTONIC (`120`/`200`/`260 ms` →
>   `RT-7 EXHAUSTED: 4 of 4 (3 retries)`, exit `1`, every attempt recorded in order; `300 ms` →
>   accepted, `11/11`, `427x22`), and **no contract clause changed**. **The as-filed finding text
>   follows, kept verbatim so the record shows what was wrong:** With **`PROVIDENT_UI_BOOT_TIMEOUT_MS=30`** the timeout class
>   **is** retried (§5.3 — 4 attempts, each with its timeout signature, then `RT-7 EXHAUSTED`, exit
>   `1`); with **`=100`** attempts 1–2 are retried and **attempt 3 aborts the run non-retryably**;
>   with **`=200`** **attempt 1 aborts immediately** — `✗ boot/connect failure: boot A attempt 1
>   failed non-retryably (RT-2): …`, exit `1`, **no `RT-7` marker and no record for attempts 2–4**.
>   Instrumenting an out-of-tree copy pins the mechanism: `resolved` is read **after** the
>   termination-grace `await`, so a handshake that completes inside that window flips a
>   timeout-class attempt to non-retryable (`DIAG: boot=A attempt=1 resolved=true timedOut=true …
>   retryable=false`) (§7.2). The greens' `RT-05` FAIL is therefore **partly closed and partly
>   CONFIRMED**, and their inconsistency record 3 (§3.6's exit `1` carrying two meanings with only
>   the marker to separate them) is **still true live**.
>
> **Consequence for the supervisor, stated plainly:** the unit's **declared rows** are live-green and
> the retry's runtime half is no longer NOT-BLIND-RUNNABLE — but **this battery must NOT be recorded
> as a clean live-gate pass.** Record it as **live-run, `R0`–`R4` green, `F-1` + `F-2` OPEN**; route
> `F-1` and `F-2` to the leg's owner (both are `scripts/**` fixes — **not** this pass's to make:
> this pass may write **one** repo file, this one).
> *(**⟶ CURRENT DISPOSITION 2026-09-27 — the ONE line that moved in this "consequence" paragraph, and
> it has moved TWICE:** **`F-2` is CLOSED** (fixed + verified; §6.2) **and `F-1` is CLOSED** (fixed +
> verified on every exit path; §6.1, UPDATE 2), so the recorded state is now **live-run, `R0`–`R4`
> green, `F-1` CLOSED · `F-2` CLOSED.** **Both route lines are DISCHARGED** — the leg's owner landed
> both `scripts/**` fixes; **`docs/next-steps.md`'s `WAVE-C UPDATE 2` now carries the remaining list as
> the per-unit documentation review + the supervisor's `DONE` row only.** The as-filed sentence above
> is kept verbatim as the record of what the first live-battery pass correctly concluded at its date.)*

---

## 1. What was RUN (exact commands) and the four legs' results

All logs and every probe/stub live **outside the repo tree**, under `/tmp/probe/` (§12).

| # | Command (repo root) | Exit | Verbatim key result |
| --- | --- | --- | --- |
| **1** | `npm run divergence` | **0** | **`R13 RESULT: 9 checks, 0 failures`** (all 8 comparisons green: `census inTree matches (shim = real) (electron=12 shim=12)`, `census registered matches`, `dirtied ids match (normalized)`, `SSR fragment matches (structural)`, `data-node-id set matches (structural)`, `nodeId vocabulary matches (structural)`, `counter increment rendered in BOTH`, `dispatch results non-empty in BOTH (R7)`) |
| **2** | `npm run ui` | **0** | **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**; `· boot A green on the first attempt: attempt=1 of 4 (retries=0)` / `· boot B green on the first attempt: attempt=1 of 4 (retries=0)`; **`· probe observation (verbatim graph content): 427x22`**; `· pinned shape: width=427 (>0: true) height=22 (>0: true) computedStyle fontSize="16px"` |
| **3** | `npm test` | **0** | **`Test Files  58 passed (58)` · `Tests  863 passed | 2 skipped (865)`** |
| **4** | `npm run typecheck` | **0** | clean (`tsc --noEmit -p tsconfig.json`, no diagnostics) |
| **5** | `npm run build` | **0** | clean (bundles emitted: `dist/main/main.cjs`, `preload.cjs`, `standalone.mjs`, `battery-host.mjs`, `dist/renderer/renderer.js` 341.1 kb + `index.html`) |
| **6** | `npm run battery` | **0** | **`BATTERY RESULT: 184 checks, 0 failures`** |
| **7** | `npx vitest run tests/ui-leg-contract.test.ts tests/ui-leg-seam.test.ts` | **0** | **`✓ tests/ui-leg-seam.test.ts (9 tests)` · `✓ tests/ui-leg-contract.test.ts (59 tests)` → `Test Files 2 passed (2)` · `Tests 68 passed (68)`** — the unit's own row files, driven live (the `SEAM-*`/`RT-*` half of `NBR-02`) |
| **8** | `ls -d /tmp/provident-ui-run-*` **after** command 2 | — | **`1` root present: `/tmp/provident-ui-run-wIpJjb`**, holding `provident-ui-A-xdzNsp` **and** `provident-ui-B-nCgnHq` (real Chromium profile state: `Cache/`, `Preferences`, `Session Storage/`, `Network Persistent State`); **0** `provident-security.json` files in any leftover. **The leg's own report in the same run reads `· leftover profiles: NONE` and `the leg's own run tree … removed`** → **F-1**, §7.1 **⟶ ✅ `F-1` CLOSED 2026-09-27 (the spawn-the-BINARY fix + the cleanup-hook-at-creation fix, §6.1): the same check is now EMPTY on every exit path, and the leg's report matches the disk.** |

**Pre-existing state, recorded so the check above is attributable:** **73** `/tmp/provident-ui-run-*`
roots existed *before* this pass (leftovers of the earlier blind/greens work); they were removed
once, before command 1, so every count below is this pass's own. **`npm run divergence` alone left
0** (its own profiles are separate). *(**⟶ THE ACCUMULATION'S CAUSE IS NOW IDENTIFIED (2026-09-27,
the `F-1` fix pass, attributed):** `scripts/electron-spawn.mjs` spawned the **CLI wrapper**, so the
real Electron main process was **orphaned** by the helper's kill and **re-created the profile
directory after the helper's delete-and-verify sweep** had already reported success — the two-pass
report was true when it looked and false afterwards. **31 roots had accumulated in one session**
(measured that pass); the fix spawns the **BINARY** and registers the cleanup hook **at `scratchRoot`
creation**, so the count is now **0** on every exit path — §6.1.)*

**The green-state rows, verbatim (command 2):**

```
  ✓ R0(c) neither boot read/wrote the developer's persisted security store: each boot's OWN seeded store
     resolved under its scratch profile (seam flag only) and the boot's code-group surface follows it
     (… A=…/provident-ui-A-xdzNsp honoured, B=…/provident-ui-B-nCgnHq honoured, no default-profile store
     touched; boot surfaces expose code-group tools (provident.code.set, provident.code.load) that a
     first-run/default store could not produce)
  ✓ R0(a) tools/list identical across the two boots (A=identical)
  ✓ R0(b) provident.list_targets census identical across the two boots (A={"registered":4,"inTree":4,"unplaced":0,"destroyed":0,"prototypes":0})
  ✓ R0(b) nodeId vocabulary identical across the two boots (4 nodeIds)
  ✓ R1 real-renderer typed marker: ELEMENT/RENDERER-API provenance (element=HTMLDivElement, style=CSSStyleDeclaration), with the shim attempt recorded alongside
  ✓ R2 measurement taken (exactly ONE) (1 measurement(s) recorded by the probe path)
  ✓ R2 width > 0 && height > 0 in the REAL renderer (width=427 height=22 — the window never paints ⇒ FAIL LOUDLY, NEVER RECORD 0)
  ✓ R2 non-empty getComputedStyle value read back in the graph content (fontSize="16px")
  ✓ R2 both values visible in the provident.get_rendered_html response (framed readMarker observation) (framed measure="427x22" fontSize="16px" (read out of the PROBE[…]PROBE block in 528 bytes of renderedHtml))
  ✓ R3 shim leg recorded with the exact word UNSUPPORTED and its reason (… recorded status="UNSUPPORTED" (the pinned word set, §3.4))
  ✓ R4 no app-level claim: no packaged-bundle reference, no packaged-mode detection claim in this leg (64821 bytes scanned)
```

---

## 2. The five declared rows `R0`–`R4` — re-driven live (independently of the greens)

| Row | Live observation (command 2, verbatim) | Verdict |
| --- | --- | --- |
| **`R0`(a)** `tools/list` identical across the two boots | `· tools/list: A=18 tools, B=18 tools` + `✓ R0(a) tools/list identical across the two boots (A=identical)` | **PASS** |
| **`R0`(b)** census **and** nodeId vocabulary identical | `· census: A={"registered":4,"inTree":4,"unplaced":0,"destroyed":0,"prototypes":0} B={…}` (identical) + `✓ R0(b) … census identical …` + `✓ R0(b) nodeId vocabulary identical across the two boots (4 nodeIds)`, with two distinct profile paths | **PASS** |
| **`R0`(c)** neither boot resolved its store under the default/real `userData` | `✓ R0(c) …` (verbatim in §1) — the boot's surface carries the **code**-group tools (`provident.code.set`, `provident.code.load`), which a first-run/default store (defaults `read` + `dispatch`) cannot produce; the seeded scratch stores are the files the boots read | **PASS** |
| **`R1`** real **and distinguishable** from the shim | `· real renderer realm — DISCRIMINATING (element/renderer-API provenance): element=HTMLDivElement styleCtor=CSSStyleDeclaration`; `· shim leg (battery host) attempt: typeof window=undefined, element=ShimElement, measure=UNSUPPORTED (never a 0), measurement step: el.getBoundingClientRect is not a function` → `✓ R1 …` | **PASS** |
| **`R2`** ONE real measurement, both halves `> 0`, non-empty computed style, read back over `provident.get_rendered_html` | `427x22` at `fontSize="16px"`, `1 measurement(s) recorded by the probe path`, framed re-read identical (`framed measure="427x22" fontSize="16px"`) | **PASS (ONE measurement — no second)** |
| **`R3`** the shim leg recorded `UNSUPPORTED` | `· shim leg: UNSUPPORTED` + the reason (no layout / no `getBoundingClientRect` / no `getComputedStyle`) → `✓ R3 …` | **PASS** |
| **`R4`** §1.13's statement + the static honest-limits row | all seven §1.13 components printed; `✓ R4 no app-level claim … (64821 bytes scanned)` | **PASS** (with the row-scope caveat, §7.3) |

**Exit-code vocabulary observed live this pass: `0` (the four legs + the retried green), `1`
(malformed config ×3 values; a **timeout-class fatal** at 100/200 ms; a deliberate row failure; real
exhaustion), `2` (a genuinely red precondition), `3` (DISPLAY absent). No fifth code, no skip, no
fabricated `0`, and no `UI RESULT:` line on any failing run.**
*(**⟶ STATUS UPDATE 2026-09-27, the RCA + fix pass:** the **"timeout-class fatal at 100/200 ms"** half
of this sentence is **SPENT** — that abort was **`F-2`**, the race, and **`F-2` is CLOSED**: post-fix
**`120`/`200`/`260 ms`** all reach **`RT-7 EXHAUSTED: 4 of 4 (3 retries)`** with **every attempt
recorded in order** (exit `1`), and **`300 ms`** is accepted and green. **The vocabulary itself is
unchanged — still exactly `{0,1,2,3}`, no fifth code**; what changed is that the `1` seen at 100/200 ms
is now **exhaustion** (`RT-7`'s marker present) rather than a **non-retryable attempt-1 abort** (no
marker). **The greens' inconsistency record 3** — exit `1` carrying two meanings separated only by the
`RT-7` marker — **therefore still stands as a readability caveat** (the fix removed the *spurious* abort,
not the shared exit code).)*

---

## 3. The blind run's 6 `NOT-BLIND-RUNNABLE` rows — CLOSED / remaining

**All six are CLOSED by live evidence.** Nothing was parked; nothing was structurally unreachable
from this surface. The one row whose *clause* the live leg did not fully satisfy is called out
(`NBR-03`'s timeout half → **`F-2`**, **now CLOSED** — the race is fixed; **the `NBR-*` verdicts below
are kept as the first pass recorded them and are NOT re-dispositioned**), and the one whose
*sub-finding* survives is called out (`NBR-01` → §7.3).

| Id | Row it covers (greens §6) | Live closure — command and verbatim evidence |
| --- | --- | --- |
| **`NBR-01`** | `R4`'s **static** half — *"no `webContents.executeJavaScript`/CDP call inside a shipped path"*, and the row's narrower scope | **CLOSED as to the substantive clause, by source inspection out-of-band** (the live surface cannot execute a static call-graph claim, so this is a read, not a drive — stated as such): `grep -nE "executeJavaScript|debugger|isPackaged|packaged|BrowserWindow" scripts/electron-ui.mjs` → the only `executeJavaScript`/`debugger` occurrences are **inside comments** (`:46`) and the only `app.isPackaged` occurrence is **inside the R4 check's own regex literal** (`:1092`, `/app\.isPackaged/`, which cannot match its own escaped form). ⇒ **the clause holds on the landed source**; the greens' *sub-finding* — the **executed row asserts only the `isPackaged` half**, so a reader could over-read the green — **STANDS** (§7.3). |
| **`NBR-02`** | §3.5 `SEAM-1`…`SEAM-4` (`[H]`, node-layer) | **CLOSED — the rows were RUN live** (`npx vitest run tests/ui-leg-contract.test.ts tests/ui-leg-seam.test.ts` → **68/68 green**, `ui-leg-seam.test.ts` **9**; the full suite `npm test` → 863 passed / 0 failed). The **reachable** live halves are also recorded: `R0`(c) green (§2) and its **falsifiability demonstrated** (below, `NBR-05`/P8: the same row turns **red** when the scratch store's group set is narrowed ⇒ the row can fail). |
| **`NBR-03`** | `RT-1`'s runtime retry loop, `RT-3`'s second-attempt profile/cleanup/budget half, `RT-4` item 1's consumed backoff, `RT-5`'s accepted-attempt record, `RT-6`(a)'s `k>1` label, `RT-7` (all) | **CLOSED by three independent live drives** (§5.1 real retry, §5.2 real exhaustion, §5.3 the timeout class), on an **unmutated out-of-tree copy** of the leg whose byte-identity with the repo's leg was verified (`diff` → **IDENTICAL**). Every sub-row: **bound 4 per boot** ✓ (4 attempts, never 5); **fresh profile per attempt** ✓ (`provident-ui-A-iZ2Bwi` → `provident-ui-A-r2-wBrub7`); **backoff consumed 250/500/1000** ✓ (printed before attempts 2/3/4); **`RT-5` records** ✓ (attempt number, boot, profile, outcome, raw `(code, signal)` pair, transport error, child-stderr tail); **`RT-6`(a) label** ✓ (`RT-6 RETRY GREEN (boot A): attempt=2 of 4 (retries=1, 1 bootstrap failure(s) recorded)`); **`RT-7` exhaustion** ✓; **`RT-6`(c) ONE measurement** ✓ (`1 measurement(s)`; the retried green still prints the identical framed `427x22`). **Caveat that is itself a finding: the TIMEOUT class is retryable only in one timing regime — §5.3 + `F-2` (§7.2).** *(**⟶ CAVEAT SPENT 2026-09-27, the RCA + fix pass: `F-2` is CLOSED — the TIMEOUT class is retryable in **every** regime now, the boundary is **MONOTONIC** (`120`/`200`/`260 ms` → `RT-7 EXHAUSTED: 4 of 4 (3 retries)`, every attempt recorded in order; `300 ms` → accepted), so this CLOSED verdict stands **WITHOUT** the caveat. **No `NBR-*` row is re-dispositioned by the fix** — §6.2's CLOSED entry is the record.)* |
| **`NBR-04`** | §5.1 `PRE-1`/`PRE-3` — a genuinely **red** divergence precondition ⇒ `exit 2`, no measurement, no retry; §5.4's off-green `1 checks, 2 failures` | **CLOSED** (§5.5): `R13 RESULT: 1 checks, 2 failures (exit 1)` → `PRECONDITION-FAILED — \`npm run divergence\` is not green for the same built tree` → **exit `2`**, `NO MEASUREMENT TAKEN`, **no boot, no attempt, no retry**, plus the `RT-8` item 5 diagnostic note. |
| **`NBR-05`** | `RT-2` class 1 — a **completed** boot whose `R0`–`R4` row is wrong is **not** retried | **CLOSED** (§5.6): a deliberately mutated **copy** (scratch store groups narrowed) produced both boots **`outcome=accepted` on attempt 1** and a **red `R0`(c)** row → `UI RESULT: 1 failures (10/11 assertions green, mapped onto the five declared rows R0-R4)`, **exit `1`**, **zero** backoff/retry/`RT-6` lines. |
| **`NBR-06`** | §2.1 item 1 — the divergence leg's argument vector/env/stdio/`cwd`/profiles stay **byte-identical** after the helper extraction (`U-12`) | **CLOSED by spawn-boundary evidence** (§5.7): a stub replacing `node_modules/.bin/electron` **in the copy tree only** logged the divergence leg's **actual argv** at both spawn sites, and it is the pinned vector member-for-member; the helper's exported `baseArgs`/`stdioWiring` match the as-filed vector and wiring; the divergence leg contains **no inline `spawn`** (its two sites are helper calls); `N = 9` intact on the real repo leg. |

---

## 4. The retry's RUNTIME HALF — the verbatim evidence (§3.7 `RT-1`…`RT-9`)

**Method, stated once and binding on every quote below:** the leg was driven from an **unmutated
copy** at `/tmp/probe/tree/scripts/electron-ui.mjs` (**`diff` vs the repo's leg → IDENTICAL**), whose
`node_modules/.bin/electron` is an **out-of-tree stub** that either **delegates to the real Electron
binary** or **injects a `SIGTRAP` death at init** according to `PROBE_STUB_MODE`. **No file under
`scripts/**`, `src/**` or `tests/**` was touched** — the failure is induced at the **spawn boundary
of a copy**, which is the only way to make a deterministic bootstrap death without editing the repo:
an `npm run ui` invocation **rebuilds the tree before the leg runs**
(`npm run build && node scripts/electron-ui.mjs`), so a mutated `dist/**` cannot serve as a
repeatable probe (greens `NBR-03`/`NBR-04`), and breaking Electron itself would red **both** legs and
prove the wrong clause. **The copy tree's `dist/` and `node_modules/` are symlinks to the repo's**, so
the app under test is the **same built bundle**; the stub only chooses whether the boot lives.

### 4.1 A REAL RETRY (bootstrap fails, then a boot succeeds) — `PROBE_STUB_MODE=retry-A`

```
  · attempt 1/4 boot A outcome=bootstrap-failed profile=/tmp/provident-ui-run-wUZFeC/provident-ui-A-iZ2Bwi
      signature: child exited (code null, signal SIGTRAP) — transport error: MCP error -32000: Connection closed
      child stderr (tail): PROBE-STUB[mode=retry-A]: INJECTED bootstrap death (SIGTRAP at init) for profile=[…]
  · RT-4 backoff before attempt 2: 250 ms (fixed table, no jitter)
  · attempt 2/4 boot A outcome=accepted profile=/tmp/provident-ui-run-wUZFeC/provident-ui-A-r2-wBrub7
  · attempt 1/4 boot B outcome=accepted profile=/tmp/provident-ui-run-wUZFeC/provident-ui-B-4uIYBB
  · profile A: /tmp/provident-ui-run-wUZFeC/provident-ui-A-r2-wBrub7 (attempt 2)
  · profile B: /tmp/provident-ui-run-wUZFeC/provident-ui-B-4uIYBB (attempt 1)
  · RT-6 RETRY GREEN (boot A): attempt=2 of 4 (retries=1, 1 bootstrap failure(s) recorded)
  · boot B green on the first attempt: attempt=1 of 4 (retries=0)
  …
UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)
  measurement: 427x22
  RT-6 labelled green: boot A attempt=2 (retries=1), boot B attempt=1 (retries=0)
```

**Exit `0`.** Verifies **`RT-1`** (eligibility by the **observed-death signature**: an observed
`SIGTRAP` **and** an unresolved handshake — recorded as the raw `(code null, signal SIGTRAP)` pair,
**never** a stderr text match), **`RT-3`** (attempt 1 → attempt 2, **fresh profile per attempt**,
boot B on its **own** budget, attempt 1), **`RT-4`** item 1 (**250 ms** consumed before attempt 2),
**`RT-5`** (failed **and** accepted attempts both recorded), **`RT-6`**(a) (**labelled** green, for
the **retried boot**, printed per boot) and **`RT-6`**(b)/(c) (**all five `R0`–`R4` rows still
green** on the accepted attempt — 11/11 — and **still exactly ONE measurement**, `427x22`).

### 4.2 A REAL EXHAUSTION (every attempt fails) — `PROBE_STUB_MODE=ui-die` (the divergence leg unaffected)

```
  · attempt 1/4 boot A outcome=bootstrap-failed profile=…/provident-ui-A-ZpiXbV
  · RT-4 backoff before attempt 2: 250 ms (fixed table, no jitter)
  · attempt 2/4 boot A outcome=bootstrap-failed profile=…/provident-ui-A-r2-CIViDZ
  · RT-4 backoff before attempt 3: 500 ms (fixed table, no jitter)
  · attempt 3/4 boot A outcome=bootstrap-failed profile=…/provident-ui-A-r3-qL1Qra
  · RT-4 backoff before attempt 4: 1000 ms (fixed table, no jitter)
  · attempt 4/4 boot A outcome=bootstrap-failed profile=…/provident-ui-A-r4-ZZCPYv

RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries) for boot A
  every attempt, in order, with its signature verbatim:
    attempt 1 (boot A, profile …/provident-ui-A-ZpiXbV): child exited (code null, signal SIGTRAP) — transport error: MCP error -32000: Connection closed
      child stderr (tail): PROBE-STUB[mode=ui-die]: INJECTED bootstrap death (SIGTRAP at init) for profile=[…]
    attempt 2 (boot A, profile …/provident-ui-A-r2-CIViDZ): … (same signature)
    attempt 3 (boot A, profile …/provident-ui-A-r3-qL1Qra): … (same signature)
    attempt 4 (boot A, profile …/provident-ui-A-r4-ZZCPYv): … (same signature)
  NO MEASUREMENT WAS TAKEN (an exhausted run takes none).
  exhaustion is not a pass and not a `2`: the bootstrap never completed (ci-ui-leg.md §3.7 RT-7, §3.6 exit 1).
```

**Exit `1`** (not `0`, not `2`, not `3`). Verifies **`RT-7`** in full: **(i)** the explicit
`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)` marker; **(ii)** **every** attempt's signature
**in attempt order, attempt 1 first** (with its own fresh profile and its child-stderr tail); **(iii)**
the **no-measurement** statement — and the run prints **no `UI RESULT:` line** and takes **no
measurement**. The precondition ran **green once** in the same run (`R13 RESULT: 9 checks, 0
failures`), i.e. the exhaustion is **not** misattributed to the precondition (`RT-8`, `RT-7`'s
"why `1` and not `2`").

### 4.3 The TIMEOUT class as a real retry case — `PROVIDENT_UI_BOOT_TIMEOUT_MS=30` (real Electron, no stub injection)

```
  · retry budget: 4 attempt(s) per boot (max 4), handshake timeout 30 ms/attempt,
  · attempt 1/4 boot A outcome=bootstrap-failed profile=…/provident-ui-A-qcoAxS
      signature: no observed child termination — transport error: handshake did not complete within 30 ms (RT-4 item 3)
  · RT-4 backoff before attempt 2: 250 ms (fixed table, no jitter)
  · attempt 2/4 boot A outcome=bootstrap-failed profile=…/provident-ui-A-r2-hPRy4Z   (same signature)
  · RT-4 backoff before attempt 3: 500 ms (fixed table, no jitter)
  · attempt 3/4 boot A outcome=bootstrap-failed profile=…/provident-ui-A-r3-4PiQHU   (same signature)
  · RT-4 backoff before attempt 4: 1000 ms (fixed table, no jitter)
  · attempt 4/4 boot A outcome=bootstrap-failed profile=…/provident-ui-A-r4-4Xuy36   (same signature)
RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries) for boot A
  NO MEASUREMENT WAS TAKEN (an exhausted run takes none).
```

**Exit `1`.** This is the **PRECEDENCE CLAUSE's signature (B)** — *the absence of an observed child
termination **plus** the handshake-not-completed fact, verbatim* — and here it **consumes an
attempt, retries under the bound, and exhausts** exactly as the ruling (`RT-4` item 3 + the
PRECEDENCE CLAUSE) requires. **The greens' `RT-05` FAIL is CLOSED for this regime** — *and* **the
same knob at 100 ms and 200 ms produces the opposite classification**; that is finding **`F-2`**
(§5.4/§7.2), and it is why this row is recorded as **CLOSED WITH A QUALIFICATION**.
*(**⟶ QUALIFICATION SPENT 2026-09-27, the RCA + fix pass:** **`F-2` is CLOSED** — the opposite
classification at 100/200 ms was the **race**, now fixed, so **the greens' `RT-05` FAIL is CLOSED
WITHOUT qualification** (its disposition: **REAL DEFECT, NOW FIXED**). The 30 ms regime quoted above
was correct both before and after the fix; the post-fix boundary is **MONOTONIC** at **`120`**,
**`200`**, **`260`** and accepted at **`300 ms`** — §6.2's CLOSED entry carries the table.)*

### 4.4 The LABELLED RETRIED GREEN (`RT-6`(a)) — the exact lines

```
  · RT-6 RETRY GREEN (boot A): attempt=2 of 4 (retries=1, 1 bootstrap failure(s) recorded)
  · boot B green on the first attempt: attempt=1 of 4 (retries=0)
  …
  RT-6 labelled green: boot A attempt=2 (retries=1), boot B attempt=1 (retries=0)
```

Both forms are printed **for both boots** (a retried boot labelled `attempt=`/`retries=`, a clean
boot labelled `attempt=1 … (retries=0)`), the run's summary line is printed **after** the label, and
**`retries=0` on a clean run** is what this pass's core `npm run ui` (§1, command 2) shows — i.e. no
flake occurred naturally in that run, and the label is not a blanket.

### 4.5 A GENUINELY RED PRECONDITION — `exit 2` (§5.1 `PRE-1`/`PRE-3`, §5.4, `RT-8`)

The divergence leg's **own** bootstrap was killed in the copy tree (the stub dies for every
invocation, so its `electron connect/drive failed` path runs):

```
  R13 RESULT: 1 checks, 2 failures (exit 1)
PRECONDITION-FAILED — `npm run divergence` is not green for the same built tree
  divergence result line (verbatim): R13 RESULT: 1 checks, 2 failures
  divergence exit code: 1
  diagnostic note (RT-8 item 5): the divergence leg itself hit the bootstrap-death class
  (§5.4 signature `1 checks, 2 failures`) — still a PRECONDITION failure, exit 2, never retried here.
  NO MEASUREMENT TAKEN (ci-ui-leg.md §3.1 step 2, §5 PRE-1/PRE-3).
```

**Exit `2`.** Verifies `PRE-1` (the divergence line + exit code reported **verbatim**, no
measurement, and **no boot** — no `attempt`/`RT-6`/`RT-7` line appears anywhere in the run),
`PRE-3`/`RT-8` item 1–3 (**a red precondition is never retried, never worked around**), `RT-8` item 5
(the **diagnostic-only** note distinguishing a plain red from the bootstrap-class red — it changes no
exit code, verdict or measurement), and §5.4's off-green arithmetic (`1` check + `1` bare failure
increment = `1 checks, 2 failures`).

### 4.6 `RT-2` class 1 — a **completed** boot with a wrong ROW is not retried

A **copy** whose scratch store's group list omits `code` (so the boot cannot expose the code-group
tools the row needs) drives a **row** failure **after** both handshakes completed:

```
  · attempt 1/4 boot A outcome=accepted profile=…/provident-ui-A-gWdE3A
  · attempt 1/4 boot B outcome=accepted profile=…/provident-ui-B-PE8wJm
  · boot A green on the first attempt: attempt=1 of 4 (retries=0)
  · boot B green on the first attempt: attempt=1 of 4 (retries=0)
  ✗ R0(c) neither boot read/wrote the developer's persisted security store: …
UI RESULT: 1 failures (10/11 assertions green, mapped onto the five declared rows R0-R4)
```

**Exit `1`.** No `RT-4 backoff`, no `RT-6`, no `RT-7` — a **post-handshake row failure consumes no
attempt and is never retried** (`RT-2` class 1/6). This is also the **falsifiability proof for the
`R0`(c) row** the greens could not reach (`R0-03`'s positive half): the row **can turn red**.

### 4.7 The divergence leg's spawn vector at the spawn boundary (`NBR-06`)

The stub logged the **actual argv** it was invoked with (the copy tree's paths differ only in the
tree root; the flag vector is what §2.1 item 1 pins):

```
off|<tree>/dist/main/main.cjs --mcp-transport=stdio --no-sandbox --disable-gpu --disable-software-rasterizer \
    --in-process-gpu --ozone-platform=x11 --disable-dev-shm-usage --user-data-dir=/tmp/provident-ui-run-…/provident-r13-app-…
off|<tree>/dist/main/main.cjs … --disable-dev-shm-usage --user-data-dir=/tmp/provident-ui-run-…/provident-r13-drive-…
off|<tree>/dist/main/main.cjs … --disable-dev-shm-usage --provident-user-data=/tmp/provident-ui-run-…/provident-ui-A-…
off|<tree>/dist/main/main.cjs … --disable-dev-shm-usage --provident-user-data=/tmp/provident-ui-run-…/provident-ui-B-…
```

| §2.1 item 1 element | Live observation |
| --- | --- |
| base argument vector | **byte-identical** to the pinned vector — the helper's exported `baseArgs` is `["<root>/dist/main/main.cjs","--mcp-transport=stdio","--no-sandbox","--disable-gpu","--disable-software-rasterizer","--in-process-gpu","--ozone-platform=x11","--disable-dev-shm-usage"]` (the **first** member is the path, the tree root's only difference), and **both** divergence sites append exactly `--user-data-dir=<fresh scratch>` |
| the two flags (§2.1 item 3) | `--disable-dev-shm-usage` **and** a fresh `--user-data-dir` per spawn — **both present at both sites** |
| stdio wiring / `cwd` / env | `stdioWiring` = `["pipe","pipe","pipe"]` (the divergence leg passes `JSON.parse(stdioWiringJson)` — the same array); `cwd` = the helper's `repoRoot` at both sites; env = `electronEnv()` = `{…process.env, DISPLAY: process.env.DISPLAY || ':0', ELECTRON_DISABLE_SANDBOX: '1'}` |
| no inline spawn left | `scripts/electron-divergence.mjs` imports the helper (`:23`) and its two sites are `spawnElectron([--user-data-dir=${profileA}])` (`:129`) and `StdioTransport args: [...baseArgs, --user-data-dir=${profileB}]` (`:139`) |
| the `ui` leg's own choice | the `ui` boots pass **only** the seam flag `--provident-user-data=` and **deliberately not** Electron's `--user-data-dir` — which is what makes `R0`(c) an attribution of the **seam** (visible in the same log, and green in `R0`(c)) |

---

## 5. The knob rows (`RT-4` items 2–3) and the exit-code vocabulary — live

| Row | Command | Verbatim | Verdict |
| --- | --- | --- | --- |
| `RT-4` item 2 — the operator may **LOWER** the count (`1` = no retry) | `PROVIDENT_UI_BOOT_ATTEMPTS=1 … electron-ui.mjs` | `· retry budget: 1 attempt(s) per boot (max 4), …` + `· boot A green on the first attempt: attempt=1 of 1 (retries=0)` + `UI RESULT: 0 failures (11/11 …)` | **PASS** (exit 0) |
| `RT-4` item 2 — never **RAISE** it | `PROVIDENT_UI_BOOT_ATTEMPTS=5 node scripts/electron-ui.mjs` | `✗ retry configuration is malformed (a PROGRAMMING ERROR, RT-2 class 5): PROVIDENT_UI_BOOT_ATTEMPTS=5 is out of the admissible range 1..4: the operator may LOWER the retry count, never RAISE it (RT-4 item 2)` — **exit 1**, and **0 occurrences of `PRECONDITION`** in the log (it never reached the precondition, let alone a boot) | **PASS** |
| `RT-4` items 2–3 — malformed ⇒ exit 1, never a silent clamp | `PROVIDENT_UI_BOOT_ATTEMPTS=abc node scripts/electron-ui.mjs` | `… PROVIDENT_UI_BOOT_ATTEMPTS="abc" is malformed: expected an integer in 1..4 (RT-4 item 2)` — **exit 1**, no boot | **PASS** |
| §3.6 exit `3` / `DIS-2` — no display ⇒ actionable refusal **before** any boot | `env -u DISPLAY node scripts/electron-ui.mjs` | precondition green first, then `PREREQUISITE ERROR — no display server: DISPLAY is unset.` … `FIX: run under a display — either export DISPLAY (e.g. \`DISPLAY=:0 npm run ui\`) … or wrap the run in xvfb: \`xvfb-run -a --server-args="-screen 0 1024x768x24" npm run ui\`` — **exit `3`**, no `attempt` line | **PASS** |

**`RT-06` (greens FAIL) — CLOSED live:** the leg prints `per-boot ceiling 121750 ms (RT-3/RT-4)` on
every run, which is the value `ci-ui-leg.md` now pins (the `122 000 ms` label is struck there).
**`RT-08` (greens FAIL) — CLOSED live:** `grep -n PROVIDENT_UI docs/decisions.md` now **matches**
(the `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED` row `:153`, the `REALDOM-UI-LEG-RETRY-RULED-AND-LANDED`
row `:165` and trailing note 9 `:341` — **anchors as read at 15:24; that file is being edited
concurrently by another pass, so cite the row names, not the digits** — name **both** `PROVIDENT_UI_BOOT_ATTEMPTS` (default `4`, range `1`–`4`) and
`PROVIDENT_UI_BOOT_TIMEOUT_MS` (default `30 000 ms`, range `≥ 1 ms`) with the malformed-value
behaviour), and the knobs were driven from those names in this pass — i.e. the retry is now
**drivable from documentation alone**, which is exactly what the greens' deviation note said it
could not be.

---

## 6. FINDINGS — live contradictions (each is a finding, never a pass)

### 6.1 `F-1` — **CLOSED 2026-09-27 (FIXED + VERIFIED)**: the scratch profiles were **not** gone after a green run, and the leg's cleanup **report said they were**

**VERDICT, CURRENT: `CLOSED` — the leftover scratch profiles are FIXED and the **END STATE** is now
clean on **every** exit path. Disposition of the blind run's `R0-04`: **REAL DEFECT, NOW FIXED** — with the
split stated explicitly below (the *reporting* half was closed earlier; **this** pass closed the
*end state*).** The **as-filed finding text is kept verbatim below, struck-but-visible** (the record
shows what was wrong), followed by the **RCA**, the **fix** and the **exit-path matrix**.

**⟶ AS FILED — `F-1` (OPEN), the finding text verbatim (⚠ DO NOT READ AS LIVE STATUS; superseded by
the CLOSED entry below):** ~~**`F-1` (OPEN) — the scratch profiles are not gone after a green run, and
the leg's cleanup report says they are.**~~ **The as-filed row, kept:**

| Evidence (AS FILED 2026-09-27, first live-battery pass) | Detail |
| --- | --- |
| **Doc clauses it contradicts** | §3.1 step 8 (*"… clean both profiles; exit"*); §0 prohibition 4 (*"the leg persists **nothing** outside its two scratch temp profiles **and deletes them on exit**"*, extended by the retry ruling to *"one fresh scratch profile PER ATTEMPT, each deleted"*); §3.7 `RT-3`/`RT-5`; §3a seed `U-10` (*"are both scratch profiles removed on every exit path (success, failure, SIGINT), and is a leftover recorded as non-fatal"*); **`docs/decisions.md` `ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER`'s recovery step (2)**, which requires `ls -d /tmp/provident-ui-run-*` to be **EMPTY** afterwards. |
| **Command** | `rm -rf /tmp/provident-ui-run-*` (0 roots) → `npm run ui` (exit 0) → `ls -d /tmp/provident-ui-run-*` |
| **Observed (as filed)** | **1 root present** — `/tmp/provident-ui-run-wIpJjb` — holding `provident-ui-A-xdzNsp` **and** `provident-ui-B-nCgnHq`, with real Chromium state (`Cache/`, `Preferences`, `Session Storage/`, `Network Persistent State`); **0** `provident-security.json`. The **same run's own report** reads `· removed 2 scratch profile(s) through the helper's ONE cleanup (2 delete pass(es), each verified); the leg's own run tree /tmp/provident-ui-run-wIpJjb removed` followed by **`· leftover profiles: NONE`**. |
| **Reproduced under a timing protocol** | `node scripts/electron-ui.mjs` (the real leg, direct) → exit 0, 11/11: **`t+3 s: 1` root, `t+10 s: 1` root, 2 attempt profiles** — **twice**; and again twice in the first protocol run ⇒ **4 of 4 repo-leg green runs**. Persistence at `t+10 s` rules out "the check merely raced the deletion". |
| **Mechanism, A/B (measured, not assumed)** | A stub was used **only in the copy tree** to A/B the **spawn chain**: (i) `exec` straight into the Electron binary → **0** leftovers (1/1); (ii) a wrapper that **SPAWNS** Electron and waits — **the repo's actual shape**, `node_modules/.bin/electron` → `electron/cli.js` → `proc.spawn(electron, …)` → **1 root + 2 attempt profiles at t+3 s and t+10 s, 2 of 2**. ⇒ **6 of 6** runs through the two-process chain leave the tree; **1 of 1** `exec`-chain run does not. **Suggested mechanism (stated as a hypothesis, not proven):** the helper's `child.kill('SIGKILL')`/`cleanupProfiles()` reach only the **direct child** (the Node wrapper), so the **Electron main process and its Chromium helpers survive long enough to re-materialise the profile directories after the delete-and-verify sweep has already reported success** — the race the helper's own comment documents, one process layer deeper than it accounts for. |
| **A second, deterministic leak on the same clauses** | `PROVIDENT_UI_BOOT_ATTEMPTS=abc node scripts/electron-ui.mjs` → exit 1 and **the scratch root is left behind** (2 malformed runs → **2 roots**), and `npm test` → **exactly 6 empty `/tmp/provident-ui-run-*` roots per run**. **Root cause read from the code, not inferred:** the leg `mkdtemp`s its run root at **module load** (`scripts/electron-ui.mjs:373`) but registers the `process.on('exit')` cleanup hook **after** the retry-configuration gate (`:713-721`), while the malformed value exits at **`:691` — before the hook exists**. The six roots are exactly the six malformed values the unit's own row `RT-2e` spawns (`tests/ui-leg-contract.test.ts:1654`, `['9','abc','0','2.5','-1',' 4']`). |
| **Verdict (as filed)** | **FAIL / OPEN.** It is a **hygiene + recording** defect (the leftovers are inside `/tmp`, hold **no** security store, and no operator-profile write occurs — the isolation half of the contract holds), **but the gate's explicit requirement — *no leftover scratch profiles* — is NOT met**, and the leg's own cleanup line asserts a state that does not hold. **Not a pass, not a skip.** Owner: the leg's (`scripts/**`) — **that pass may not edit it**. |

**⟶ ✅ CLOSED — THE RCA (2026-09-27, the `F-1` RCA + fix pass; every number below is that pass's
measured evidence, attributed — this documentation pass ran no shell and re-ran no leg).**

**THE SPLIT THIS RECORD MUST NOT BLUR — the reporting half vs the END STATE.** `F-1` was **closed in
two steps, by two different passes**, and neither step is the whole finding:

| Step | What it closed | What it did NOT close |
| --- | --- | --- |
| **EARLIER pass (the profile-cleanup fix — recorded as `R0-04`/`U-10` "FIXED")** | the **REPORTING half**: a **delete-and-verify sweep** + a **recorded cleanup report on all five exit paths**, so the leg no longer silently claimed a state it had not checked (`removed 2 scratch profile(s) … leftover profiles: NONE`). | **The END STATE — nothing.** The sweep was **accurate when it ran** and the profiles **re-appeared afterwards**, so the report became a **true-at-the-time, false-afterwards** claim (`leftover profiles: NONE` **while the directory survived**). This is exactly why the live battery was able to read the report as evidence of a clean state on four consecutive green runs. |
| **THIS pass (2026-09-27 — the spawn-the-BINARY fix + the cleanup-hook-at-creation fix)** | the **END STATE**: the orphan that re-created the profiles is **not spawned at all**, and the malformed-config path can no longer exit **before** its cleanup hook exists. | nothing further is owed for this finding: the exit-path matrix below is the closure. |

**ROOT CAUSE (established by READING + MEASUREMENT — the A/B hypothesis the as-filed row stated is now
CONFIRMED).** `scripts/electron-spawn.mjs` spawned **`node_modules/.bin/electron`** — and that name is a
**SYMLINK to `electron/cli.js`**, a **Node WRAPPER that `spawn`s the REAL Electron binary as its own
child** (`spawn(electron, process.argv.slice(2), {stdio:'inherit'})` — the very wrapper
`docs/decisions.md` `NPM-SHIM-INTEGRITY`/`ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER` describe). **The
`child` handle the helper held was therefore the WRAPPER, not the app.** Killing it **orphaned the real
Electron MAIN process and its Chromium helpers**; those orphans kept writing into the scratch profile
and **re-created the profile directory after `cleanupProfiles` had unlinked it AND verified the
unlink**. ⇒ **the leg's report was true at the moment it looked and false afterwards**: exactly the
as-filed A/B reading (`6 of 6` two-process-chain runs leave the tree; `1 of 1` `exec`-chain run does
not), now with the mechanism named. **The accumulation it explains:** **31 roots** had accumulated in
one session. **THE DISCRIMINATING EVIDENCE — the one fact that names the mechanism and not merely the
symptom:** the leftover profile directories contained **only Chromium artifacts and NO
`provident-security.json`** — i.e. **the leg's OWN seeded store WAS deleted** by the sweep, and only
the **re-created Chromium state** survived. **That is precisely what made the defect invisible:** a
leftover holding the leg's own store would have looked like a failed delete; a leftover holding only
Chromium's cache looked like nothing at all.

**THE FIX (LANDED — `scripts/electron-spawn.mjs` + `scripts/electron-ui.mjs`; TWO parts, both
required):**

| # | Part | What changed | Why it is required |
| --- | --- | --- | --- |
| **1** | **SPAWN THE BINARY, NEVER THE CLI WRAPPER** | **`electronBin` now resolves the BINARY** — `node_modules/electron/dist/electron`, **falling back through the package's `path.txt` contract to the bare package entry** — under an explicit **NO-FALLBACK-TO-THE-WRAPPER** rule that **throws a NAMED error** if no binary is found. | **One process, one handle, no orphaned grandchild:** the handle the helper kills **is** the app, so the delete-and-verify sweep deletes a profile nothing is left alive to re-create. **The stdio chain stays SINGLE-HOP.** *(The alternative shape was **tried and BACKED OUT**: `detached: true` + a process-group kill regressed the SDK stdio transport — measured `R13 RESULT: 1 checks, 2 failures`, i.e. it red the divergence precondition. Recorded so no later pass "simplifies" into it.)* |
| **2** | **REGISTER THE CLEANUP HOOK AT CREATION, NOT AT THE BOTTOM OF THE FILE** | the leg's **`process.on('exit')` cleanup hook is now registered at the moment `scratchRoot` is created**, not ~**350 lines later** after the retry-configuration validation. | The malformed-config path (`PROVIDENT_UI_BOOT_ATTEMPTS=abc` ⇒ `process.exit(1)`) had been exiting **BEFORE the hook existed** and leaking an **EMPTY** scratch root (`npm test`'s **6 empty roots/run** — one per malformed value the unit's own `RT-2e` row spawns). **The hook is IDEMPOTENT**, so the signal handlers and the explicit call sites **still work**, and a **`typeof activeBoot !== 'undefined'` guard** covers an exit that happens **during module evaluation**. |

**EXIT-PATH MATRIX (VERIFIED — every exit path this pass could reach now leaves ZERO roots; the check
was taken IMMEDIATELY and again after an **8 s settle**, so "the check merely raced the deletion" is
excluded — the exact protocol the as-filed finding used to convict the old behaviour):**

| Exit path | Exit code | Roots immediately | Roots after 8 s settle |
| --- | --- | --- | --- |
| **green** (`npm run ui`) — **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`** | **`0`** | **`0`** | **`0`** |
| **malformed config** (`PROVIDENT_UI_BOOT_ATTEMPTS=abc`) | **`1`** | **`0`** | **`0`** |
| **timeout-class exhaustion** | **`1`** | **`0`** | **`0`** |
| **`npm run ui`** (the declared leg, end to end) | **`0`** | **`0`** | **`0`** |
| **surviving `electron` processes after the runs** | — | **`0`** | **`0`** |

**THE REPORT AND THE DISK NOW AGREE.** The leg's own line is **unchanged** — `removed 2 scratch
profile(s) … leftover profiles: NONE` — and for the first time it **matches the disk**, because the fix
removed the thing that made it a moving target. **The divergence leg is clean too: `0` roots after it**
(the binary spawn is shared, so the fix reaches both legs — while its arg vector, env, stdio wiring,
`cwd`, profiles and **`N = 9`** result line stay unchanged, `R13 RESULT: 9 checks, 0 failures`).

**Regression-free (measured the same pass):** the unit's rows **`68/68`** · `npm test` **58 files /
863 passed / 2 skipped / 0 failed** · `npm run typecheck` clean · `npm run build` clean · `npm run
battery` **184 checks / 0 failures** · `npm run divergence` **`R13 RESULT: 9 checks, 0 failures`** (the
pinned **`N = 9`** intact, **0 roots** after the divergence leg) · `npm run ui` → exit **`0`**,
**`11/11`**, **`427x22`**.

**The `F-2` race fix still holds (re-affirmed, not re-argued):** `PROVIDENT_UI_BOOT_TIMEOUT_MS` at
**`120`/`200`/`260 ms`** ⇒ **`RT-7 EXHAUSTED`**, exit **`1`**, **every attempt recorded**; at
**`300 ms`** ⇒ **accepted**, **`427x22`** (§6.2's boundary table). **No contract clause changed by
this fix either** — §3.1 step 8, §0 prohibition 4, §3.7 `RT-3`/`RT-5` and §2.1's helper contract are
**unchanged**; the `scripts/**` landed state was corrected **to** the contract, not the reverse.

**What this CLOSED entry does NOT do:** it re-dispositions **no** `NBR-*` row (the battery's own
`NBR-*` verdicts stand as recorded), and it **rewrites no normative clause** of
`docs/specs/ci-ui-leg.md`. **The blind run's `R0-04` FAIL is now CLOSED** (its substantive clause holds
on the landed tree and its live half is verified by the matrix above) — **but its TEXT in
`docs/specs/ci-ui-leg-greens.md` is NOT rewritten**, per this repo's convention: the corrected
disposition lives here.

### 6.2 `F-2` — **CLOSED 2026-09-27 (FIXED + VERIFIED)**: the timeout class's retryability WAS a **race**, so §3.7's PRECEDENCE CLAUSE was only half-implemented

**VERDICT, CURRENT: `CLOSED` — the race is FIXED and the boundary is now MONOTONIC. Disposition of the
greens' `RT-05`: REAL DEFECT (not a spec drift), NOW FIXED.** The **as-filed finding text is kept
verbatim below, struck-but-visible** (the record shows what was wrong), followed by the **RCA**, the
**instrumented evidence**, the **fix** and the **post-fix boundary table**.

**⟶ AS FILED — `F-2` (OPEN), the finding text verbatim (⚠ DO NOT READ AS LIVE STATUS; superseded by
the CLOSED entry below):** ~~**`F-2` (OPEN) — the timeout class's retryability is a RACE, so §3.7's
PRECEDENCE CLAUSE is only half-implemented.**~~ **The as-filed row, kept:**

| Evidence (AS FILED 2026-09-27, first live-battery pass) | Detail |
| --- | --- |
| **Doc clause it contradicts** | §3.7's **PRECEDENCE CLAUSE** (ARCHITECT-RULED, FIX 3): *"**(a) a TIMEOUT-CLASS bootstrap failure IS RETRYABLE** — it **consumes an attempt** and its **signature** is the **absence of an observed child termination PLUS the handshake-not-completed fact, recorded VERBATIM** … **(c) the retryable set stays SIGNATURE-BASED**"*; and `RT-4` item 3 (*"an attempt that has not completed the handshake within it is a FAILED BOOTSTRAP ATTEMPT and consumes an attempt"*). |
| **Command / observed** | `PROVIDENT_UI_BOOT_TIMEOUT_MS=30` → **retried** to exhaustion (§4.3: 4 attempts, `RT-7 EXHAUSTED`, exit 1). `PROVIDENT_UI_BOOT_TIMEOUT_MS=100` → attempts **1 and 2 retried**, then `✗ boot/connect failure: boot A attempt 3 failed non-retryably (RT-2): no observed child termination — transport error: handshake did not complete within 100 ms (RT-4 item 3)`, **exit 1, no `RT-7` marker, no record for attempt 4**. `PROVIDENT_UI_BOOT_TIMEOUT_MS=200` → **attempt 1 aborts immediately**, same shape. |
| **Mechanism, measured on an instrumented out-of-tree copy** | `DIAG: boot=A attempt=1 resolved=true timedOut=true code=null signal=null retryable=false err=handshake did not complete within 200 ms (RT-4 item 3)` (vs `resolved=false … retryable=true` on the same probe at 30 ms). The leg reads the **mutable** `resolved` flag **after** `await observeTermination(child, timeoutMs)` (`scripts/electron-ui.mjs:639-648`), so a handshake that completes **inside** the termination-grace window (≤ `min(2000 ms, timeoutMs)`) flips a **timeout-class** attempt to **non-retryable** — i.e. the classification depends on a race between the leg's timer and a late handshake, not on a deterministic signature. |
| **Consequences** | (1) The greens' `RT-05` FAIL is **partly closed** (§4.3, the 30 ms regime) and **partly CONFIRMED** (100/200 ms). (2) A mid-budget non-retryable abort is **indistinguishable from exhaustion** to a reader: both exit `1`, and only `RT-7`'s marker separates them — the greens' inconsistency record 3, **still true live**. (3) `RT-2`'s classes stay non-retryable here **by accident**, not by classification: the abort rides the same "non-retryable" path a genuine `RT-2` failure uses. |
| **Verdict** | **FAIL / OPEN** against the PRECEDENCE CLAUSE (a leg defect, `scripts/**`), **never** a pass. Note for the doc reviewer: `ci-ui-leg.md`'s AMENDMENT BLOCK 3 `B3-3` says the landed leg *"still implements the `RT-1` conjunction"* — **that is now only half true**: the record-timeout signature **is** present (`:516-522`, `:647`), and it is the **race above** that defeats it in the 100/200 ms regimes. |

**⟶ ✅ CLOSED — THE RCA (2026-09-27, the RCA + fix pass; every number below is that pass's measured
evidence, attributed — this documentation pass ran no shell and re-ran no leg).**

**Symptom (reproduced, NON-MONOTONIC).** With the operator knob `PROVIDENT_UI_BOOT_TIMEOUT_MS`
lowered, the timeout class behaved inconsistently: at **`30 ms`** and **`100 ms`** the attempts retried
to exhaustion correctly (**`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`**, exit **`1`**); at
**`200 ms`** and **`260 ms`** the leg **aborted on attempt 1** with **`✗ boot/connect failure: boot A
attempt 1 failed non-retryably (RT-2): no observed child termination — transport error: handshake did
not complete within 200 ms (RT-4 item 3)`** — **attempts 2–4 unrecorded, no `RT-7` marker**, exit
**`1`**; at **`300`/`400 ms`** the boot was **accepted** and the leg went **green**. **A boundary that
moves the WRONG WAY as the budget grows is the signature of a RACE, not of a threshold.**

**Mechanism (instrumented; the exact TORN READ).** In `scripts/electron-ui.mjs`'s failed-attempt path
the predicate was handed the **LIVE** `resolved` flag:
`rec.retryable = isBootstrapDeath(rec, resolved, rec.timedOut)`. **That line runs AFTER
`await observeTermination(child, timeoutMs)`** — the bounded termination-grace look — so **`resolved`
was read AFTER the grace window**. **Instrumented output at the decision point:**

| Knob | At the catch (settle) | After the grace | Classification |
| --- | --- | --- | --- |
| **`120 ms`** | `DIAG-settle timedOut=true resolvedAtCatch=false terminationAtCatch=null` | `DIAG-after-grace resolvedNow=false death=none` | **RETRIED (correct)** |
| **`200 ms`** | `DIAG-settle timedOut=true resolvedAtCatch=false terminationAtCatch=null` | **`DIAG-after-grace resolvedNow=true death=none`** | **NON-RETRYABLE — attempt 1 aborted** |
| **`260 ms`** | identical to `200 ms` | **`resolvedNow=true death=none`** | **NON-RETRYABLE — attempt 1 aborted** |

**The two halves of the retryable signature described DIFFERENT INSTANTS:** the **timeout fact** was
snapshotted **when the timer fired**, the **handshake flag** was sampled **~2 s later**. The boot was
actually **ALIVE AND SLOW** — a real handshake that completed just after the deadline — so the leg was
**discarding a perfectly healthy boot**.

**The fix (LANDED).** **Snapshot the handshake state at the instant the raced verdict settles, before
the grace is awaited** — `const handshakeResolvedAtSettle = resolved` in the `catch`, immediately after
the message is computed (`scripts/electron-ui.mjs:641`, read) — and **hand the predicate the snapshot**:
`isBootstrapDeath(rec, handshakeResolvedAtSettle, rec.timedOut)` (`:660`, read). **The timeout
signature is a statement about the INSTANT THE TIMER FIRED, so both halves are now read there.**
**No contract clause changed:** `RT-1` / `RT-2` / `RT-4` item 3 and the **PRECEDENCE CLAUSE** are
unchanged (the leg was corrected to the contract, not the reverse).

**Post-fix boundary table (VERIFIED — the boundary is now MONOTONIC):**

| `PROVIDENT_UI_BOOT_TIMEOUT_MS` | Post-fix result | Exit |
| --- | --- | --- |
| **`120 ms`** | **`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`**, **every attempt recorded in order** | **`1`** |
| **`200 ms`** | **`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`**, every attempt recorded in order *(was: attempt-1 abort)* | **`1`** |
| **`260 ms`** | **`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`**, every attempt recorded in order *(was: attempt-1 abort)* | **`1`** |
| **`300 ms`** | **accepted** — **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, measurement **`427x22`** | **`0`** |

**Regression-free (measured the same pass):** the unit's rows **`68/68`** · `npm test` **58 files /
863 passed / 2 skipped / 0 failed** · `npm run typecheck` clean · `npm run battery` **184 checks /
0 failures** · `npm run divergence` **`R13 RESULT: 9 checks, 0 failures`** · `npm run ui` → **exit 0**,
**`11/11`**, **`427x22`**, **`retries=0`**.

**WHY THE ROW SET DID NOT CATCH IT (recorded honestly, and it is the general lesson).** The unit's
`RT-*` rows drive the predicate with **hand-built attempt records**, so they pin the predicate's
**SHAPE** but **cannot observe the live sampling point**; the race lives in the **ORDER OF THE TWO
READS** in the leg's `catch` path, which is **only reachable in a real boot**. **The live battery found
it** (`F-2`), and **`F-2` is CLOSED by this fix.** **RECOMMENDED, NOT IMPLEMENTED (a TestWriter-side
change, not this pass's):** a **snapshot-ordering row** that asserts the predicate is handed the
handshake state **read at settle** — see `docs/decisions.md`'s
`UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE` row's *What pins it* cell and
`docs/next-steps.md`'s `WAVE-C UPDATE` owed list.

**What this CLOSED entry does NOT do:** it does **not** re-disposition any `NBR-*` row, it does **not**
close **`F-1`** — **`F-1` is closed by its OWN pass** (the spawn-the-BINARY fix + the cleanup-hook-at-creation fix; **§6.1**'s CLOSED entry, and the as-filed `F-1` text there is kept struck-but-visible) —
and it **rewrites no normative clause** of `docs/specs/ci-ui-leg.md`.

### 6.3 `NBR-01`'s sub-finding — **STANDS** (the `R4` row is narrower than the clause it claims)

`ci-ui-leg.md` §3.0 `R4`'s static clause names four halves (no packaged-bundle reference, no
`app.isPackaged`-based claim, no assertion phrased as an app-green, **no `webContents.executeJavaScript`/CDP
call in a shipped path**). The landed row asserts **one** regex over the leg's source
(`const appClaim = /app\.isPackaged/.test(legSource)`, `:1092`) and prints
`R4 no app-level claim: no packaged-bundle reference, no packaged-mode detection claim in this leg
(64821 bytes scanned)`. **The substantive clause does hold** (this pass's out-of-band source check,
`NBR-01` in §3 — the only occurrences of `executeJavaScript`/`debugger` are in comments) — **but the
executed row does not assert it**, so a reader can over-read the green. **Reported as a leg/row
finding, not converted into a pass or a failure of the clause.**

---

## 7. Per-scenario-class disposition (the greens' 26 rows, by class)
*(**⟶ COUNT POINTER, added 2026-09-27 by the per-unit documentation review: `26 rows` is the as-filed summary; the greens file's own §4 tables enumerate `32` scenario ids = `24` PASS / `4` FAIL / `4` NOT-BLIND-RUNNABLE (its §3 `CORRECTION NOTE`). **This section's dispositions, its six `NBR-*` closures and every verdict below are unchanged** — the class rows below group ids, so a count correction moves none of them.)*

| Scenario class (greens ids) | Layer the greens ran it on | Live disposition (this pass) |
| --- | --- | --- |
| **`R0-01`…`R0-03`, `R1-01`/`R1-02`, `R2-01`/`R2-02`, `R3-01`, `R4-01`** (the five declared rows) | `[U]` `npm run ui` | **EXERCISED live and PASS** — 11/11 assertions, `427x22` @ `fontSize="16px"`, `retries=0`; §2 |
| **`R0-04`** (each scratch profile deleted on exit) | `[U]` + filesystem | **CONFIRMED FAIL live → ⟶ ✅ CLOSED 2026-09-27** — `F-1` (§6.1). *As filed: 4/4 repo-leg green runs left the root + both attempt profiles while the leg reported `leftover profiles: NONE`.* **CLOSED by the spawn-the-BINARY fix + the cleanup-hook-at-creation fix: ZERO roots on every exit path (green · malformed config · timeout-class exhaustion · `npm run ui`), immediately and after an 8 s settle; 0 surviving `electron` processes; the report now MATCHES the disk. Its row text in `docs/specs/ci-ui-leg-greens.md` is NOT rewritten — the disposition lives here.** |
| **`R2-03`** (fail loudly, never a `0`) | `[U]` | **RE-EXERCISED live** — every failure path this pass (real exhaustion, timeout aborts, a red precondition, a red row) printed a **named** failure and **no** measurement; no `0`/blank was recorded anywhere |
| **`RT-01`/`RT-02`** (eligibility by signature; non-retryable classes) | `[U]` + source | **PASS, now runtime-backed** — §4.1 (observed-death signature retried), §4.3 (timeout signature retried), §4.5 (divergence red never retried), §4.6 (`RT-2` class 1 never retried), §5 (`DISPLAY` absence never retried, decided before any boot) — **was: "except the timeout race, `F-2`" — ⟶ that exception is SPENT 2026-09-27 (the RCA + fix pass): `F-2` is CLOSED and the timeout class is retryable in every regime the operator knob can set (§6.2)** |
| **`RT-03`, `RT-04`, `RT-05`, `RT-06`, `RT-07`** | `[U]` (blind: source/declared values only) | **NOW FULLY LIVE** — bound `4`, per-attempt fresh profiles, backoff `250/500/1000` **consumed**, verbatim per-attempt records, `RT-7 EXHAUSTED` + no-measurement statement, exit `1` (§4.1–§4.3). **`RT-06`'s greens FAIL is CLOSED** (the leg prints `121750 ms`, the pinned value); **`RT-05`**: was *"CLOSED for the 30 ms regime and CONFIRMED at 100/200 ms (`F-2`)"* — **⟶ 2026-09-27 (the RCA + fix pass): `F-2` is CLOSED, so `RT-05` is CLOSED in EVERY regime — the greens' `RT-05` FAIL is dispositioned REAL DEFECT, NOW FIXED, and the boundary is MONOTONIC (`120`/`200`/`260 ms` → `RT-7 EXHAUSTED: 4 of 4 (3 retries)` with every attempt recorded in order; `300 ms` → accepted)** |
| **`RT-08`** | documentation | **CLOSED live** — both knob names/defaults/ranges are now in `docs/decisions.md` and were driven from there; malformed ⇒ exit `1` before the precondition (§5) |
| **`RT-09`** | `[U]` (blind: `k>1` unreachable) | **CLOSED** — the labelled retried green (§4.4), with **`R0`–`R4` re-asserted on the accepted attempt** and **ONE** measurement retained (`RT-6`(b)/(c)) |
| **`EX-01`/`EX-02`/`EX-03`/`EX-05`** (vocabulary, DISPLAY refusal, precondition, authority order) | all layers | **RE-EXERCISED live** — `0`/`1`/`2`/`3` all observed, no fifth code (§2 note); the actionable `DISPLAY` refusal at exit `3` (§5); the precondition reported verbatim **once** per run with an equal `PRE-2` digest pair and the pin/dist agreement line; `EX-04`'s `[H]` half is now **RUN** (`NBR-02` → the `SEAM-*` rows, 68/68) |
| **`DIV-01`, `DIV-02`** (`N = 9` intact; the retry is `ui`-leg-local) | `[A]` | **RE-EXERCISED live** — `R13 RESULT: 9 checks, 0 failures`; the retry knobs affected only the `ui` leg (the divergence leg booted **green inside the same runs** that exhausted `ui`, §4.2), and its spawn vector is captured at the boundary (§4.7) |
| **`DIV-03`, `DIV-04`** (the off-green signature; the inherited flake) | `[A]` | **NOW LIVE** — the off-green `R13 RESULT: 1 checks, 2 failures` was **produced and consumed** as a precondition red (§4.5). **The divergence leg's own flake/retry remains NOT this unit's** (`RT-9`(a)) — unchanged, and no retry was added to it |
| **`SEAM-01`, `SEAM-02`, `SEAM-03`** | `[T]`/`[H]` | **RE-EXERCISED live** — the two row files **68/68 green** (§1 command 7), `npm test` 863 passed, `npm run battery` `184 checks, 0 failures` (the tool census unchanged), `package.json` untouched by this pass |

---

## 8. Layer honesty — exactly what this live battery does and does NOT prove

**What it proves (and the only things it may be read as):**

1. **A real Electron renderer exists and is distinguishable from the shim** — `element=HTMLDivElement`
   / `styleCtor=CSSStyleDeclaration` vs the shim's `ShimElement` + `measure=UNSUPPORTED` (`R1`,
   §2), driven **live** under **two** profile-scoped boots.
2. **ONE real measurement** — `427x22` at `fontSize="16px"`, both halves `> 0`, read back **out of
   graph content over the EXISTING `provident.get_rendered_html`** (`R2`, §2), and **still exactly
   ONE** on a retried green (`RT-6`(c), §4.1).
3. **A profile-scoped store** — each boot resolved its seeded security store under **its own scratch
   profile** (seam flag only) and exposed the **code**-group surface only a store it actually read
   could produce (`R0`(c), §2), with the row's **falsifiability demonstrated** (§4.6).
4. **The retry contract at runtime** — a real retry, a real exhaustion, a real labelled retried
   green, a real red precondition, a real DISPLAY refusal, and the exit-code vocabulary `{0,1,2,3}`
   (§4, §5).
5. **The four legs' other checks** — `npm test` / `typecheck` / `build` / `battery` (§1).

**What it does NOT prove — binding, and unchanged by this pass:**

| # | Not proven | Why |
| --- | --- | --- |
| **1** | **No geometry.** | The `ui` green carries **no** rendered-geometry row; `A-d4`'s mandatory unprovability bound stands (`ci-ui-leg.md` §3.3 `C-7`, §7 item 6). The `427x22` value is **one measurement taken by one probe**, not a layout proof. |
| **2** | **No IPC-layer behaviour.** | This leg never exercises the app's `provident.op`/IPC hop (`LIVE-OP-REJECT`'s lesson); the green is silent on it (§5.3 of the contract; `engine-drift.md`'s Layer anchor ii). |
| **3** | **No attribute row.** | Attribute presence needs `H-r10`'s set-wise extractor, which is `U-DIVERGENCE-EXT`'s and **does not exist yet** (`ci-ui-leg.md` §3.0 `R4`, §8 `N-6`). |
| **4** | **The measurement record's `M-46` does NOT move off `UNMEASURABLE`.** | `M-46`'s revisit condition is exactly `H-r10`'s extractor (`engine-drift-measurements.md`) — **this unit does not close it, and this pass does not either.** |
| **5** | **Not the packaged app; not a distribution.** | The legs boot the dev tree's `dist/main/main.cjs` (§3.3 `C-1`); a `ui` green is never an app-green from a node-green (`C-2`). |
| **6** | **Not a statement about the shim's fidelity.** | `UNSUPPORTED` is this measurement's silence; the shim stays **demoted to pre-filter** (`C-6`, §3.4). |
| **7** | **The leftover/isolation *end state* is NOT proven clean.** | ~~`F-1`: the profiles survive the run on disk while the report says they do not.~~ **⟶ ✅ RESOLVED 2026-09-27 (the `F-1` RCA + fix pass): `F-1` is CLOSED and this item is SPENT — the end state IS now proven clean**, on every exit path the leg can reach, checked immediately and after an **8 s settle**, with **0 surviving `electron` processes** and the leg's report matching the disk (§6.1's exit-path matrix). **The item was TRUE and BINDING at its date** (and the **isolation** half — no operator-profile write, no store beyond the scratch profiles — held in every run then; it still holds). **What remains unproven is unchanged and narrower:** the matrix covers the **exit paths this pass could reach**, not "every process outcome is impossible" — a future path added to the leg **re-opens this item** unless it is added to the matrix. |

**Layer of each leg:** `[U]` = `npm run ui` / the copy-tree drives (a real renderer, a real
profile-scoped store, ONE measurement) · `[A]` = `npm run divergence` (structural surfaces only) ·
`[X]` = the shim battery host (`UNSUPPORTED` for this measurement) · `[T]` = the vitest suite
(no window, no IPC, no MCP transport) · `[H]` = the host seam + `package.json`/filesystem checks.

---

## 9. Method and hygiene (what was touched, and what was not)

- **The only repo file this pass wrote is THIS file.** No file under `src/**`, `tests/**`,
  `scripts/**` or any other `docs/**` path was created or modified; `docs/specs/ci-ui-leg.md`,
  `docs/specs/ci-ui-leg-greens.md`, `docs/decisions.md` and the trackers were **read only** — the two
  findings above are **reported**, not reconciled into them (`AGENTS.md` item 6 / RCA-6 own that pass).
- **⟶ RECONCILIATION PASS RECORD (2026-09-27, FIFTH pass — the RCA + fix pass's documentation half):**
  that *later* pass **did** reconcile them, and it is the pass that wrote this bullet: **`F-2` is
  recorded CLOSED here (§6.2, with the RCA, the instrumented evidence, the fix and the post-fix
  boundary table; the as-filed text kept struck-but-visible)**; ~~**`F-1` is left OPEN and unamended
  (§6.1)**~~ *(**⟶ SUPERSEDED 2026-09-27, SIXTH pass — see the record below: `F-1` is now CLOSED too
  (§6.1), by its own fix pass, and the SIXTH pass amended §6.1 in the same struck-but-visible shape.**)*;
  the greens' **`RT-05`** FAIL carries the corrected disposition **REAL DEFECT, NOW FIXED**
  (its row text in `docs/specs/ci-ui-leg-greens.md` is **not** rewritten); and the trackers took the
  change in the same pass (`docs/decisions.md` `UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE`,
  `docs/defects.md` `UI-LEG-TIMEOUT-CLASS-RACE` CLOSED host-side, `docs/next-steps.md` `WAVE-C
  UPDATE`, `docs/specs/ci-ui-leg.md`'s amendment block 5). **That pass ran no shell and re-ran no leg
  — every number it records is the fix pass's measurement, attributed.**
- **⟶ RECONCILIATION PASS RECORD 2 (2026-09-27, SIXTH pass — the `F-1` fix's documentation half; a
  documentation-only pass: no shell, no leg, no build):** the live battery's **BOTH** findings are now
  recorded **CLOSED** — **`F-1` in §6.1** (the as-filed text struck-but-visible, then the **RCA**, the
  **TWO-PART FIX**, the **exit-path matrix** and the **reporting-half-vs-END-STATE split**) and
  **`F-2` in §6.2** (unchanged by this pass). **The same pass** annotated §0's verdict and its
  `F-1 OPEN · F-2 CLOSED` line to **both CLOSED**, §0's "consequence" paragraph, §1's command-8 row
  and its 73-root provenance note, §7's `R0-04` row and §8's honesty item 7, and reconciled the
  trackers: **`docs/decisions.md`** (the new ACTIVE rules `UI-LEG-SPAWN-THE-BINARY-NOT-THE-WRAPPER` +
  `UI-LEG-CLEANUP-HOOK-AT-CREATION`, and their trailing note 12), **`docs/defects.md`**
  (`UI-LEG-LEFTOVER-PROFILES` FILED + CLOSED host-side, **no `HANDOFF.md` round owed** — `R13-HOST-FIX`
  precedent), **`docs/next-steps.md`** (`### WAVE-C UPDATE 2`'s "WHAT DID NOT MOVE" paragraph, the owed
  list, row `C1` and the `## OPEN` prose — the remaining list is now the **per-unit documentation
  review** + the **`DONE` row** only, and **`U-REALDOM-BOOT` is ELIGIBLE for its documentation
  review**), **`docs/pending.md`** and **`docs/FORKER.md`** (their leftover-profiles/spawn-entry-point
  clauses). **This pass re-ran no leg and converted no row to a pass; every number it records is
  attributed to the fix pass.** **`docs/specs/ci-ui-leg.md` took a status/annotation note only**
  (§3a `U-10`, the `N-9` cell, AMENDMENT BLOCK 6) — **no normative clause of it was rewritten.**
- **Every probe, stub, mutated copy and log lives OUTSIDE the repo tree:** `/tmp/probe/tree/`
  (an **unmutated copy** of the three legs + a stub `node_modules/.bin/electron` with `dist/` and
  `node_modules/` **symlinked to the repo's**), `/tmp/probe/tree-mut/` (the deliberately narrowed
  scratch store), `/tmp/probe/tree-diag/` (the instrumented classification probe), `/tmp/probe/*.sh`
  and `/tmp/probe/logs/*`. The copy was verified **byte-identical** to the repo's leg
  (`diff` → IDENTICAL) before it was trusted as evidence.
- **No repo artifact was broken to force a failure.** The failures were induced **at a copy's spawn
  boundary** (a stub binary), never by editing `scripts/**`, `tests/**` or `src/**`; the built tree
  itself was never mutated (`PRE-2`'s digest pair stayed equal in every run, and the pinned
  `sha256=802fc6c4e04174ca…` appears in every precondition block).
- **No server was started**, no CI config added, and no `show:false`/offscreen shortcut was used.
- **`/tmp` hygiene:** **73** pre-existing `/tmp/provident-ui-run-*` roots were cleared once before the
  first core run (count recorded in §1); the counts afterwards are this pass's own.
- **CONCURRENT EDITOR, mtime-attributed (recorded so nothing here is misattributed):** `git status`
  during this session shows `M docs/decisions.md`, `M docs/next-steps.md`, `M docs/pending.md`,
  `M docs/defects.md`, `M docs/FORKER.md` with **mtimes 15:19:58–15:22:12 (2026-09-24 host clock) —
  i.e. written DURING this pass by another agent's documentation/tracker pass, not by this one.**
  `docs/specs/ci-ui-leg.md` also moved at **15:20:51** (it **grew**; its §3.7 PRECEDENCE CLAUSE,
  `RT-4` items 2–4, `RT-5` and `RT-7` all still carry the substance quoted here **verbatim**, and
  `B3-3`'s *"contradiction with the landed tree"* note is unchanged — read together with `F-2`, which
  shows that note is now only **half** true). **⟶ 2026-09-27 (the RCA + fix pass) — the `B3-3` reading
  this bullet is about, stated finally so no later pass re-argues it:** at the time of this battery,
  `B3-3`'s claim that the landed leg *"still implements the `RT-1` conjunction"* was **only half true**
  — the **record-timeout signature WAS present**, and it was the **`F-2` race** that defeated it above
  the 30 ms regime. **The fix settles it in the contract's favour:** the leg now classifies the timeout
  class **retryable in every regime**, so `B3-3`'s substantive requirement is **implemented**, and the
  **half-true** qualifier is **spent**. **`docs/specs/ci-ui-leg.md`'s `B3-3` note itself is left as
  written** (this pass adds a dated status note beside it; it rewrites no normative clause). **The executable artifacts this pass measured are all
  OLDER than the session start and therefore stable across every run quoted here:**
  `scripts/electron-ui.mjs` (14:58:59), `scripts/electron-spawn.mjs` (14:28:35),
  `scripts/electron-divergence.mjs` (13:26:01), `tests/ui-leg-contract.test.ts` (14:57:35),
  `package.json` (03:41:44), `docs/specs/ci-ui-leg-greens.md` (13:40:50).
  `sha256(scripts/electron-ui.mjs) = 3c09d8c1aa7f65971bb4f669a4749b0488a1c980807afd4c1cbcb3e33d591e2b`
  (verified `diff`-identical to the copy every stub drive used).
- **Host facts:** node `v24.20.0` (shell) / Electron `44.4.5` (the app's own line: `[provident-main]
  node 24.21.0 electron 44.4.5 crypto=object`) · `DISPLAY=:0` · npm `12.0.2`.

---

## 10. THE EXACT COMMAND THE ARCHITECT CAN RE-RUN

```bash
cd "/media/ryanr/Shared Files/Projects/Provident-Electron"

# 0. hygiene baseline (the check F-1 USED TO fail — now the fix's own verification row):
ls -d /tmp/provident-ui-run-* 2>/dev/null | wc -l        # clear it first: rm -rf /tmp/provident-ui-run-*

# 1. the unit's declared legs (require BOTH lines verbatim):
npm run divergence   # → R13 RESULT: 9 checks, 0 failures            (exit 0)
npm run ui           # → UI RESULT: 0 failures (11/11 assertions green, mapped onto the five
                     #   declared rows R0-R4) ; measurement: 427x22 ; exit 0
ls -d /tmp/provident-ui-run-*                        # F-1 CLOSED: EMPTY per the contract — and now EMPTY in
                                                     #   fact, immediately and after an 8 s settle (as filed: 1 root
                                                     #   + 2 attempt profiles, while the leg reported NONE)
ps -ef | grep -c '[e]lectron'                        # F-1's second half: 0 surviving electron processes
PROVIDENT_UI_BOOT_ATTEMPTS=abc node scripts/electron-ui.mjs   # malformed ⇒ exit 1, and STILL 0 roots
                                                     #   (the exit-hook-at-creation fix; as filed: 1 empty root/run)

# 2. the retry's runtime half (the knobs the contract pins; a small timeout forces the timeout class):
PROVIDENT_UI_BOOT_ATTEMPTS=1   node scripts/electron-ui.mjs            # 1 attempt per boot, green, attempt=1 of 1
PROVIDENT_UI_BOOT_TIMEOUT_MS=30 node scripts/electron-ui.mjs           # timeout class retried → RT-7 EXHAUSTED, exit 1
PROVIDENT_UI_BOOT_TIMEOUT_MS=200 node scripts/electron-ui.mjs          # F-2 (CLOSED): NOW ALSO retries → RT-7 EXHAUSTED, exit 1
                                                                      #   (the as-filed reading was "attempt 1 aborts non-retryably, exit 1")
PROVIDENT_UI_BOOT_TIMEOUT_MS=260 node scripts/electron-ui.mjs          # F-2's post-fix boundary: RT-7 EXHAUSTED, exit 1
PROVIDENT_UI_BOOT_TIMEOUT_MS=300 node scripts/electron-ui.mjs          # F-2's post-fix boundary: ACCEPTED, 11/11, 427x22, exit 0
env -u DISPLAY node scripts/electron-ui.mjs                            # PREREQUISITE ERROR naming the fix, exit 3
PROVIDENT_UI_BOOT_ATTEMPTS=5   node scripts/electron-ui.mjs            # malformed ⇒ exit 1 before the precondition

# 3. the [H]/[X]/[A] corroboration:
npm test && npm run typecheck && npm run build && npm run battery
```

**The two drives that need an out-of-tree stub (a real retry and a real exhaustion) are recorded in
§4.1/§4.2 with their probe description; their scripts are `/tmp/probe/probes.sh`,
`/tmp/probe/e3e4.sh` and `/tmp/probe/tree/node_modules/.bin/electron` — they induce the death at a
**copy's** spawn boundary, which is why they never touch `scripts/**`.**

---

## 11. Reported to the supervisor, in one paragraph

**⟶ CURRENT DISPOSITION (2026-09-27, the `F-1` RCA + fix pass — read this, then the two earlier blocks
below, which are the fourth/first-pass records kept verbatim):** **BOTH live findings are now CLOSED.**
**`F-1` is CLOSED (fixed + verified — the leg spawns the Electron BINARY, never the CLI wrapper, and its
cleanup hook is registered at `scratchRoot` creation; every exit path now leaves ZERO roots, checked
immediately and after an 8 s settle, with 0 surviving `electron` processes, and the leg's own report
MATCHES the disk — §6.1); `F-2` is CLOSED (fixed + verified — the timeout-class retryability RACE is
gone and the boundary is MONOTONIC, §6.2); the greens' `RT-05` FAIL is dispositioned REAL DEFECT, NOW
FIXED; the blind run's `R0-04` FAIL is dispositioned REAL DEFECT, NOW FIXED.** **The one-line state:
live-run, `R0`–`R4` green (11/11, ONE measurement `427x22`), `F-1` CLOSED · `F-2` CLOSED, the unit
still `LANDED-GREEN-BUT-NOT-DONE`** *(**⟶ SPENT 2026-09-27: the unit IS `DONE`, and the adversarial pass
has RUN with its host findings FIXED — see the ADVERSARIAL-FIX header note at the top of this file and
`docs/next-steps.md`'s `## DONE — U-REALDOM-BOOT` record; the clause is kept as the sixth-pass reading.**)*
— what remains is the **per-unit documentation review** (for which
**`U-REALDOM-BOOT` is now ELIGIBLE** — no live finding gates it) and the **supervisor's `DONE` row**,
plus the **recommended, not-implemented snapshot-ordering test row** (`docs/next-steps.md` `WAVE-C
UPDATE 2`; a TestWriter-side change, **not this pass's**). **This pass re-ran no leg and converted no
row to a pass.**

**⟶ PRIOR DISPOSITION (2026-09-27, the `F-2` RCA + fix pass — kept as the record of the intermediate
state):** **`F-2` is CLOSED** (fixed + verified — the timeout-class retryability RACE is gone and the
boundary is MONOTONIC, §6.2); **`F-1` REMAINED OPEN** at that point and was **not** closed by that pass
(§6.1 — closed by the later pass above); the greens' `RT-05` FAIL is dispositioned REAL DEFECT, NOW
FIXED. **The one-line state then: live-run, `R0`–`R4` green, `F-1` OPEN · `F-2` CLOSED.** That pass
re-ran no leg and converted no row to a pass.

**THE AS-FILED REPORT (2026-09-27, first live-battery pass — kept verbatim as the record of what was
wrong):** The live battery **ran in full** — nothing parked, nothing structurally non-exercisable — and it
**closes all six of the blind run's NOT-BLIND-RUNNABLE rows** (a real retry, a real exhaustion, the
timeout class as a real retry case, the labelled retried green, a genuinely red precondition at exit
`2`, the DISPLAY absence at exit `3`, plus `RT-2` class 1, the `SEAM-*` node rows and the divergence
leg's spawn-boundary argv). The five declared rows `R0`–`R4` are **live-green (11/11, ONE measurement
`427x22`)** and all four legs are green (`R13 RESULT: 9 checks, 0 failures`; `npm test` 863 passed;
typecheck/build clean; `battery` 184/0). **Two findings stay OPEN and this battery must not be
recorded as a clean pass:** `F-1` — the gate's own **no-leftover-scratch-profiles** requirement
**FAILS** (1 root + both attempt profiles persisting after every green run, 4/4 repo runs, while the
leg prints `leftover profiles: NONE`; plus a deterministic `npm test` leak of 6 roots/run whose root
cause is the exit-hook ordering) — and `F-2` — the **timeout class's retryability is a race**, so the
PRECEDENCE CLAUSE (B3-3) is satisfied at `PROVIDENT_UI_BOOT_TIMEOUT_MS=30` and violated at 100/200 ms.
Both are `scripts/**` defects for the leg's owner; both findings and the greens' surviving
sub-finding (`R4`'s row is narrower than its clause) are **reported here, not reconciled** into the
contract or the trackers.
