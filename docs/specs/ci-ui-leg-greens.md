# Green Scenarios — `U-REALDOM-BOOT` (the `npm run ui` leg) — blind run

**Status: `BLIND RUN (one pass) — 26 scenarios, 16 PASS / 4 FAIL / 6 NOT-BLIND-RUNNABLE`.**
**⟶ SCENARIO-COUNT CORRECTION (2026-09-27, the per-unit documentation review — the as-filed totals above are
KEPT and the corrected enumeration is authoritative; see §3's `CORRECTION NOTE`). The file's own §4 tables
enumerate **32** scenario ids and their verdicts are **24 PASS / 4 FAIL / 4 NOT-BLIND-RUNNABLE**
(`11` + `9` + `5` + `4` + `3` = `32`; the six `NBR-01`…`NBR-06` ids in §6 are the record's NOT-BLIND-RUNNABLE
*reasons*, not scenario rows, and the as-filed arithmetic counted them as verdicts while also dropping six
rows from the total). **No verdict, no FAIL, no disposition and no `NBR-*` row changes** — this is a count
defect in the record's own summary, exactly the class the wave-B review fixed in
`docs/specs/engine-drift-greens.md` §5.**
**The four FAILs are findings, not passes** (§5 below carries them verbatim with
observed-vs-documented evidence). **No FAIL was converted, no row was marked runnable to raise the
count, and no row was re-scoped to make it pass.**
**⟶ POST-RUN DISPOSITIONS (2026-09-27, FIFTH pass — the `F-2` RCA + fix; STATUS/ANNOTATION ONLY, and
**NO row's text in this file is rewritten**): `RT-05` — **REAL DEFECT IN THE LEG, NOW FIXED** (the live
battery's `F-2` race; see §5's disposition note) · `RT-06` — **CLOSED** (the spec re-pinned the ceiling
to the derived `121 750 ms`, which is what the leg prints) · `RT-08` — **CLOSED** (both operator knob
names/defaults/ranges are recorded in `docs/decisions.md` and were driven from there live) · `R0-04` —
**REMAINS OPEN** as the live finding **`F-1`** (see the note on `R0-04` in §5). **No conversion: none of
these is a pass on this record's own terms, and the `NBR-*` rows are not re-dispositioned.**

**Date stamp:** the host clock reads **2026-09-24** during this work; the unit, its contract and
its trackers file this work under **2026-09-27** (the same host-clock-vs-filing-calendar offset
`docs/specs/engine-drift-greens.md`'s header records). **Cite the filing date.**

**Authored and run WITHOUT reading the implementation.** The sources read to derive every scenario
were documentation only: `docs/specs/ci-ui-leg.md` (the contract — §3.0 `R0`–`R4`, §3.1 the pinned
sequence, §3.3, §3.4, §3.5, §3.6, **§3.7 `RT-1`–`RT-9`**, §4, §5, §6, §7, §3a/§3b, §8a),
`docs/specs/ci-divergence-leg.md` (the `N = 9` pin, §5), `docs/specs/engine-drift.md`'s Layer
declaration and §3.7 `F-8`, `docs/specs/engine-drift-measurements.md` `M-42`/`M-46`,
`docs/specs/provident-electron-shell-chrome-handoff-review.md` §1.11–§1.14 (A-d8, the honest
limits, `H-r18`/`H-r19`, `RK-14`), `docs/specs/engine-pin-greens.md` + `docs/specs/engine-drift-greens.md`
(the conventions, read as `*-greens.md`), `docs/decisions.md` (`REAL-DOM-UI-GATE-LEG`,
`DIVERGENCE-SPAWN-FIX`, `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED`), `package.json`, `AGENTS.md`.

**Files NOT read to derive a scenario:** nothing under `src/**` and nothing under `tests/**` was
read, at any point, for any reason.

**ONE declared deviation from a strictly blind loop, recorded so it is auditable:** to drive the
retry clauses `RT-3`/`RT-4` at runtime, this run needed the **operator-facing environment-variable
names**, which `RT-4` items 2–3 make part of the leg's contract but which **no documentation in the
tree pins** (that absence is FAIL row `RT-08`). Two **narrow** `grep`s / extracts over
`scripts/electron-ui.mjs` were therefore made, and nothing else: (a) a token census
(`PROVIDENT_UI_*`, `attempt=`, `EXHAUSTED`, the backoff literals) and (b) the **retry-configuration
block plus the `R4` static-check lines**, needed to judge the R4 row's scope (FAIL row `R4-02`).
**Every other scenario below was derived from documentation and observed only through the leg's
own output, exit codes, `package.json`, `git diff` and the filesystem.** Where a claim could only be
settled by reading the implementation, the row is marked **NOT-BLIND-RUNNABLE** rather than settled.

**The only repo file this pass wrote is this one.** One scratch log was briefly written into the
repo root by a shell-cwd slip; it was deleted in the same pass and `git status --short` confirms the
tree carries only the five pre-existing modified files (see §3 run counts).

---

## 1. Layer declaration — exactly what this run proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[U]** | real-DOM leg | `npm run ui` / `node scripts/electron-ui.mjs` — real Electron boots under scratch profiles, driven over stdio MCP; the `R2` value read back out of the graph content | the packaged app; a distribution; the shim host |
| **[A]** | divergence leg | `npm run divergence` on the same built tree — **structural surfaces only** | **never IPC-layer evidence** |
| **[T]** | node suite | `npm test` (vitest under the shim), `npm run typecheck` | assembled-app evidence (no window, no IPC, no MCP transport) |
| **[X]** | shim leg | `npm run battery` (the DOM-shim host over MCP) | a browser; a real-DOM carrier |
| **[H]** | host-side | `package.json`, `git diff --stat`, the operator's `~/.config` profiles read-only, `/tmp` scratch state | engine-internal behaviour |
| **[D]** | documentation | the contract's own pinned values | a measurement |

**Honesty anchors (carried from `docs/specs/engine-pin-greens.md` §1 and
`docs/specs/engine-drift-greens.md`'s Layer declaration, and binding here):**

1. **A `ui` green proves a real renderer exists and is distinguishable, and that ONE probe produced
   the asserted value under a controlled profile — and nothing else.** It proves **no** rendered
   geometry, **no** CSS resolution, **no** layout, **no** IPC-layer behaviour and **no** attribute
   row (`docs/specs/ci-ui-leg.md` §3.3 `C-1`…`C-7`, §7 item 6; `A-d4`'s mandatory unprovability
   clause).
2. **A green `divergence` leg is structural-surfaces-only evidence, never IPC-layer.** It is silent
   on the app's `provident.op` hop — the `LIVE-OP-REJECT` lesson (§5.3; Layer anchor ii).
3. **This unit does NOT convert the measurement record's `M-46`** (real-DOM attribute presence) from
   `UNMEASURABLE`: `M-46`'s revisit condition is `H-r10`'s attribute-presence extractor, which is
   `U-DIVERGENCE-EXT`'s and does not exist yet (§7 item 6, §8a `M-46` row).
4. **Nothing below is read as an app-green from a node-green, and no retry result below is read as
   evidence about the `divergence` leg** (§3.3 `C-2`; §3.7 `RT-8` item 3).
5. **The shim's `UNSUPPORTED` record is not a verdict on the shim's fidelity** — the shim stays
   demoted to pre-filter (§3.3 `C-6`, §3.4).

## 2. Exact commands (as run)

| Id | Command (from the repo root) | Notes |
| --- | --- | --- |
| `CMD-1` | `npm run ui` | full leg incl. its own `npm run build` and its divergence precondition |
| `CMD-2` | `npm test` | `[T]` |
| `CMD-3` | `npm run typecheck` | `[T]` |
| `CMD-4` | `npm run battery` | `[X]` |
| `CMD-5` | `npm run divergence` | `[A]` |
| `CMD-6` | `node scripts/electron-ui.mjs` | leg only, on the already-built tree (used for the env-knob and failure probes; **this is the same entry point `CMD-1` runs after its build**) |
| `CMD-7` | `PROVIDENT_UI_BOOT_ATTEMPTS=<v> node scripts/electron-ui.mjs` | operator attempt-count knob (`RT-4` item 2) |
| `CMD-8` | `PROVIDENT_UI_BOOT_TIMEOUT_MS=<v> node scripts/electron-ui.mjs` | per-attempt handshake timeout (`RT-4` item 3) |
| `CMD-9` | `( unset DISPLAY; node scripts/electron-ui.mjs )` | the `DIS-2` prerequisite probe |
| `CMD-10` | `npx vitest run tests/ui-leg-contract.test.ts tests/ui-leg-seam.test.ts` | **count-only** corroboration of the two landing row files (`MS-1`'s `27`); **no test source was read** |
| `CMD-11` | `git status --short` · `git diff --stat HEAD -- scripts/electron-divergence.mjs` · `node -e "…package.json scripts…"` · `sha256sum`/`ls`/`find` over `~/.config` and `/tmp` | `[H]` surface checks |

Runner: this agent's shell under the repo root; Node `v24.20.0`, Electron `44.4.5`, engine
`provident-ssr` **0.5.1** installed with declared pin **`^0.5.1`** (agreeing).

## 3. Run counts (the run's arithmetic)

| Leg | Command | Result |
| --- | --- | --- |
| This scenario set (authoritative — **26 rows**; **⟶ `32`, see the `CORRECTION NOTE` below**) | `CMD-1`…`CMD-11` as tabulated below | **26 rows — 16 PASS / 4 FAIL / 6 NOT-BLIND-RUNNABLE** *(as filed)* — **⟶ CORRECTED: `32` rows — `24` PASS / `4` FAIL / `4` NOT-BLIND-RUNNABLE** |
| The `ui` leg (clean runs) | `CMD-1` ×4, `CMD-6` ×5 | **9 × exit 0**, every one `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, measurement `427x22` at `fontSize="16px"`, **`retries=0` in every attempt line — no retry occurred in any run of this pass** |
| Attempt-count probes | `CMD-7` (`1`, `5`, `0`, `abc`) | `1` → exit **0** (green, `1 attempt(s) per boot (max 4)`); `5`/`0`/`abc` → exit **1**, malformed-config message naming the range |
| Handshake-timeout sweep | `CMD-8` (`30000` default, `300`, `150`, `100`, `60`) | `300`/`150`/`100`/`60` → the failure probe below; default `30000` → green |
| Prerequisite probe | `CMD-9` | exit **3**, actionable message |
| Repo suite `[T]` | `CMD-2` | **`Test Files 58 passed (58)` · `Tests 822 passed | 2 skipped (824)`** (exit 0) |
| Typecheck `[T]` | `CMD-3` | clean (exit 0) |
| Battery `[X]` | `CMD-4` | **`BATTERY RESULT: 184 checks, 0 failures`** (exit 0) |
| Divergence `[A]` | `CMD-5` ×4 | **`R13 RESULT: 9 checks, 0 failures`** in all four (exit 0) — **`N = 9` unchanged** |
| Landing row files (count only) | `CMD-10` | **`2 passed (2)` files, `27 passed (27)` tests** — `ui-leg-seam.test.ts` **9**, `ui-leg-contract.test.ts` **18** (= `MS-1`'s `27`) |
| Diff scope | `CMD-11` | `git status --short`: `M docs/decisions.md`, `M docs/specs/ci-ui-leg.md`, `M scripts/electron-divergence.mjs`, `M scripts/electron-spawn.mjs`, `M scripts/electron-ui.mjs`; `package.json` **clean** with exactly the `ui` key added |

**Exit codes observed in this pass (the §3.6 vocabulary, never a fifth code):**
`0` ×3 recorded explicitly (+6 more green runs), `1` ×4 (three malformed-config probes + one failed
boot probe), `3` ×1 (`DISPLAY` absent). **`2` was NOT observed** — see `PRE-01`.

**⟶ CORRECTION NOTE (2026-09-27, the per-unit DOCUMENTATION REVIEW — a count correction, NOT a verdict
change; every verdict cell in §4 is kept exactly as written, and the as-filed `26 / 16 / 4 / 6` form above is
kept marked).** **Measured this pass by enumerating this file's own §4 tables:**

| §4 section | ids | PASS | FAIL | NOT-BLIND-RUNNABLE |
| --- | --- | --- | --- | --- |
| §4.1 the five red rows | `R0-01`…`R0-04`, `R1-01`, `R1-02`, `R2-01`…`R2-03`, `R3-01`, `R4-01` = **11** | **10** | **1** (`R0-04`) | 0 |
| §4.2 the retry clause set | `RT-01`…`RT-09` = **9** | **5** | **3** (`RT-05`, `RT-06`, `RT-08`) | **1** (`RT-09`) |
| §4.3 exit codes / authority order / seam | `EX-01`…`EX-05` = **5** | **4** | 0 | **1** (`EX-04`) |
| §4.4 the divergence leg and the scope limit | `DIV-01`…`DIV-04` = **4** | **2** | 0 | **2** (`DIV-03`; `DIV-04` is PASS on its scope statement / NOT-BLIND-RUNNABLE on the flake behaviour) |
| §4.5 the `[T]`/`[X]`/`[A]` corroboration rows | `SEAM-01`…`SEAM-03` = **3** | **3** | 0 | 0 |
| **total** | **32** | **24** | **4** | **4** |

**⇒ the record's scenario arithmetic is `32` rows = `24` PASS + `4` FAIL + `4` NOT-BLIND-RUNNABLE.** The
as-filed `26 / 16 / 4 / 6` does not close against this file's own tables: `26` counts neither the tables'
`32` ids nor the `26` ids left after removing the six §6 `NBR-*` **reason** rows, and the `6` treated those
six reasons as scenario verdicts (which is why `16` — `26 − 4 FAIL − 6` — was arithmetically self-consistent
and still wrong). **What does NOT change:** every verdict, all four FAILs and their dispositions, the six
`NBR-*` rows' content, the run counts below/above, and the "may/may not rest on" list in §7. **Downstream
quotes of the as-filed form** (`docs/specs/ci-ui-leg.md` §8 `N-9`, `docs/next-steps.md`, `docs/pending.md`,
`docs/FORKER.md`, and this record's own header line) are **as-filed run summaries**; the corrected figures
are the ones here, and a later pass quoting a scenario total must quote this table.
**Re-runnable method:** `grep` this file for `^\| \*\*\`[A-Z0-9-]+\`\*\* \|` → `38` matches = the `32`
scenario rows + the six §6 `NBR-*` rows; a re-count that disagrees with the table above wins, and this note
should then be corrected in place.

**⟶ DATED-COUNT POINTER (same pass, status/annotation only).** Three numbers in §3 are **correct readings
taken on this run's own date** and are **kept as filed**; a later reader must not re-quote them as current:
`npm test` **`58 files / 822 passed / 2 skipped / 0 failed`** (row 6) — the suite then; **`58 files /
863 passed / 2 skipped / 0 failed`** after the retry pass and the `F-1` fix · the landing row files
**`18 + 9 = 27`** (rows 10/`SEAM-01`) — today **`59`** (`tests/ui-leg-contract.test.ts`) **+ `9`**
(`tests/ui-leg-seam.test.ts`) = **`68/68`** (the spec's AMENDMENT BLOCK 7 `B7-1`) · `docs/decisions.md`'s
`PROVIDENT_UI` occurrence count **`0`** (`RT-08`'s observed value, which is what the FAIL was about) — the
knob names are recorded there now, which is why `RT-08` is **CLOSED**. **No verdict moves by any of this.**

---

## 4. The scenarios

### 4.1 The five red rows `R0`–`R4` (`docs/specs/ci-ui-leg.md` §3.0)

| Id | Clause (doc section) | Command | Observed value (verbatim where quoted) | Verdict |
| --- | --- | --- | --- | --- |
| **`R0-01`** | `R0`(a) — `tools/list` identical across the two boots (§3.0 `R0`) | `CMD-1` | `· tools/list: A=18 tools, B=18 tools` and `✓ R0(a) tools/list identical across the two boots (A=identical)` | **PASS** |
| **`R0-02`** | `R0`(b) — census **and** nodeId vocabulary identical (§3.0 `R0`) | `CMD-1` | `✓ R0(b) provident.list_targets census identical … (A={"registered":4,"inTree":4,"unplaced":0,"destroyed":0,"prototypes":0})` and `✓ R0(b) nodeId vocabulary identical across the two boots (4 nodeIds)`, with **two distinct profile paths** (`provident-ui-A-…` / `provident-ui-B-…`) | **PASS** |
| **`R0-03`** | `R0`(c) — neither boot resolved its store under the default/real `userData` (§3.0 `R0`; §3.5 `SEAM-2`) | `CMD-1` + read-only `~/.config` inspection | `✓ R0(c) neither boot read/wrote the developer's persisted security store … (A=… honoured, B=… honoured, no default-profile store touched; boot surfaces expose code-group tools … that a first-run/default store could not produce)`; operator profiles `~/.config/provident-electron` (holds `provident-security.json`) and `~/.config/Electron` contain **no entry newer than this pass** (`find … -newermt` → empty) | **PASS — with the leg's own report as the only direct evidence** (the default profile is provably *untouched by mtime*; the positive half is the leg's self-report, which is why it is also `NBR-02`) |
| **`R0-04`** | §3.1 step 8 / §0 prohibition 4 / §3.7 `RT-3`/`RT-5` — **each scratch profile is deleted on exit** | `rm -rf /tmp/provident-ui-run-*` then `CMD-6` | before: **0** roots; after a **green** run (exit 0): **1** root — `/tmp/provident-ui-run-ZyOELD` — still present 2 s later, containing `provident-ui-A-vbu5at` **and** `provident-ui-B-igkVFO`; the run printed **no** leftover/cleanup record; **43** such roots had accumulated earlier in this pass | **FAIL** |
| **`R1-01`** | `R1` — the real boot is distinguishable by the **element/renderer-API provenance** marker (§3.0 `R1`, AMENDMENT BLOCK `M-1`) | `CMD-1` | `· real renderer realm — DISCRIMINATING (element/renderer-API provenance): element=HTMLDivElement styleCtor=CSSStyleDeclaration` and `✓ R1 real-renderer typed marker: ELEMENT/RENDERER-API provenance (element=HTMLDivElement, style=CSSStyleDeclaration)` | **PASS** |
| **`R1-02`** | `R1` — the **shim** attempt recorded alongside, `typeof window` demoted to secondary (§3.0 `R1`, §3.4) | `CMD-1` | `shim: typeof window=undefined, element=ShimElement, measure=UNSUPPORTED (never a 0), … el.getBoundingClientRect is not a function`; `typeof window=object typeof document=object` appear only as `SECONDARY observations` | **PASS** |
| **`R2-01`** | `R2` — **exactly ONE** measurement, both halves `> 0`, non-empty computed style (§3.0 `R2`, §1 item 3) | `CMD-1` | `✓ R2 measurement taken (exactly ONE) (1 measurement(s) recorded by the probe path)`; `probe observation (verbatim graph content): 427x22`; `width=427 (>0: true) height=22 (>0: true) computedStyle fontSize="16px"`; one measurement value appears in the whole output | **PASS** |
| **`R2-02`** | `R2` — the value is read back **in the `provident.get_rendered_html` response** (§3.0 `R2`, §3.2) | `CMD-1` | `✓ R2 both values visible in the provident.get_rendered_html response (framed readMarker observation) (framed measure="427x22" fontSize="16px" (read out of the PROBE[…]]PROBE block in 528 bytes of renderedHtml))` | **PASS** |
| **`R2-03`** | `R2` — fail loudly, **never a `0`** (§3.0 `R2` fail state, §2.1 item 4, §3.7 `RT-2` class 1) | `CMD-8` at `150`/`100`/`60` | the leg never records a measurement on a failed boot: `✗ boot/connect failure: boot A attempt 1 failed … a leg that cannot spawn or connect reports this loudly — never a 0, never a green (ci-ui-leg.md §2.1 item 4, §3.6 exit 1)`, exit **1**, no `UI RESULT:` line | **PASS** |
| **`R3-01`** | `R3` — the shim leg is reported with the single word `UNSUPPORTED` + its reason, **never `divergent`/`matching`/a fabricated `0`** (§3.0 `R3`, §3.4) | `CMD-1` | `· shim leg: UNSUPPORTED` with `reason: the shim has no layout, no getBoundingClientRect semantics and no getComputedStyle … never divergent, never matching, never a fabricated 0.`; `✓ R3 shim leg recorded with the exact word UNSUPPORTED and its reason` | **PASS** |
| **`R4-01`** | `R4` — §1.13's statement printed by the leg (§3.0 `R4`; handoff review §1.13) | `CMD-1` | `R4 HONEST LIMITS: a ui green proves that a specific probe … and nothing else.` — **all seven** §1.13 components present: packaged app · app-green-from-node-green · MCP-contract property outside the MCP surface · `dispatch` is not a real gesture · `get_rendered_html` does not observe layout · the shim is not now faithful · **not** a rendered-geometry/IPC/attribute-row proof | **PASS** |

### 4.2 The retry clause set `RT-1`…`RT-9` (`docs/specs/ci-ui-leg.md` §3.7)

| Id | Clause | Command | Observed value | Verdict |
| --- | --- | --- | --- | --- |
| **`RT-01`** | `RT-1` — retryability is decided by **failure signature**, never a generic "anything failed" predicate | `CMD-8` at `150` (default `4` attempts) | the boot's handshake did not complete ⇒ the attempt recorded `outcome=bootstrap-failed` with `signature: no observed child termination — transport error: handshake did not complete within 150 ms (RT-4 item 3)` + a child-`stderr` tail; the leg classified it **`failed non-retryably (RT-2)`** and exited **1** | **PASS (as implemented)** — the predicate matched `RT-1`'s literal conjunction (*child death* **and** *no resolved handshake*), no `stderr`/outcome-match retry was observed. **But this PASS is exactly the seam of FAIL `RT-05`** |
| **`RT-02`** | `RT-2` — a **row** failure / a **leg programming error** / a **precondition** red is never retried | `CMD-1` green runs; `CMD-8` sweep; `CMD-9` | no retry occurred in any of the 9 green runs (`retries=0`); the malformed-config probes exited **1** with a named message and **no** attempt log (`RT-2` class 5); `DISPLAY` absence was refused with exit **3** before any boot (`RT-2` class 3) | **PASS** (for classes 3/5 and "nothing retried when nothing failed"); **class 1** (`R0`–`R4` row failure) and **class 2** (divergence red) were **not reachable blind** — see `NBR-04`, `NBR-05` |
| **`RT-03`** | `RT-3` — bound **4** attempts per boot, retry only after a failed attempt, **fresh scratch profile per attempt**, per-boot budgets | `CMD-7` (`1`, `5`), `CMD-1`/`CMD-6` startup line, `CMD-8` failure log | startup: `retry budget: 4 attempt(s) per boot (max 4)`; `PROVIDENT_UI_BOOT_ATTEMPTS=1` ⇒ `1 attempt(s) per boot (max 4)` (green); `5` and `0` ⇒ **exit 1**, `out of the admissible range 1..4: the operator may LOWER the retry count, never RAISE it (RT-4 item 2)`; the failed attempt recorded its **own** fresh profile (`attempt 1/4 boot A … profile=/tmp/provident-ui-run-zKIFx2/provident-ui-A-iYwzxa`); no run spent an attempt speculatively and **no run of this pass ever had two attempts of one boot** | **PASS** for the bound, the range clamp and the per-attempt profile **naming**; the parts that need a *second* attempt (`RT-3`'s "fresh profile on the retry", cleanup between attempts, per-boot budget independence) are **`NBR-03`** (no retry could be induced) |
| **`RT-04`** | `RT-4` item 1 — backoff `250 → 500 → 1000 ms`, fixed, no jitter | `CMD-1`/`CMD-8` startup line | `backoff table 250/500/1000 ms (fixed, no jitter)` on every run | **PASS (declared value)** — the sequence is printed as the fixed table; its *consumption* is unobservable without a retry (`NBR-03`) |
| **`RT-05`** | `RT-4` item 3 — a per-attempt handshake timeout is a **FAILED BOOTSTRAP ATTEMPT and consumes an attempt** | `CMD-8` at `150` / `100` / `60` | `✗ boot/connect failure: boot A attempt 1 failed non-retryably (RT-2): no observed child termination — transport error: handshake did not complete within 150 ms (RT-4 item 3)` → **exit 1 on attempt 1 of 4**, no retry, no `EXHAUSTED`/budget marker, no per-attempt record for attempts 2–4 | **FAIL** — **⟶ DISPOSITION CORRECTED 2026-09-27 (FIFTH pass, the `F-2` RCA + fix): REAL DEFECT IN THE LEG, NOW FIXED** (never a doc drift; the timeout class now consumes an attempt and retries in **every** regime — the residual defect above the 30 ms regime was the **`F-2` race**, fixed; see §5's `RT-05` disposition note) |
| **`RT-06`** | `RT-4` item 4 — per-boot wall-clock ceiling | `CMD-1`/`CMD-8` startup line vs the doc | leg prints `per-boot ceiling 121750 ms (RT-3/RT-4)`; the doc pins the ceiling as **`122 000 ms`** while stating its own derivation `4 × 30 000 + 250 + 500 + 1000` = **121 750 ms** | **FAIL (documentation vs implementation, 250 ms apart)** |
| **`RT-07`** | `RT-5` — **every** attempt recorded, every failed attempt's **signature verbatim** (child `(code, signal)` pair and/or the transport error + stderr tail) | `CMD-8` at `150` | `· attempt 1/4 boot A outcome=bootstrap-failed profile=…` + `signature: no observed child termination — transport error: handshake did not complete within 150 ms (RT-4 item 3)` + a multi-line `child stderr (tail):` — attempt number, boot, profile, outcome and raw signature all present | **PASS (for the failing attempt)** — the *accepted*-attempt and multi-attempt records are `NBR-03` |
| **`RT-08`** | `RT-4` items 2–3 — the operator knobs exist **and their names are recorded in the leg and in `docs/decisions.md`** | `CMD-7`/`CMD-8` + `grep` over `docs/decisions.md` | the knobs work and the **leg** names them (`PROVIDENT_UI_BOOT_ATTEMPTS`, `PROVIDENT_UI_BOOT_TIMEOUT_MS`); **`docs/decisions.md` contains ZERO occurrences of `PROVIDENT_UI`** (grep count `0`), and no other doc in the tree pins the names | **FAIL (the `docs/decisions.md` half of the clause is unmet)** |
| **`RT-09`** | `RT-6`(a) — a retried green is **labelled `attempt=<k>` / `retries=<k-1>`, for both boots** | `CMD-1`, `CMD-7`, `CMD-8` | no retry occurred, so the labelled-retry line was never produced; the per-boot labels **are** present on a clean green: `boot A green on the first attempt: attempt=1 of 4 (retries=0)` / `boot B green on the first attempt: attempt=1 of 4 (retries=0)` — i.e. the labelling machinery exists and is exercised at `k=1` | **NOT-BLIND-RUNNABLE** (`NBR-03`) — the `k>1` half cannot be forced without inducing a retryable bootstrap death |

### 4.3 Exit codes, authority order, precondition and the seam

| Id | Clause | Command | Observed value | Verdict |
| --- | --- | --- | --- | --- |
| **`EX-01`** | §3.6 — the vocabulary is exactly `{0,1,2,3}` and no failure becomes a skip/`0`/green | all commands above | `0` (green legs), `1` (failed boot / malformed config), `3` (`DISPLAY` absent); no fifth code, no skip, no fabricated `0`, no `UI RESULT:` line on any failing run | **PASS** |
| **`EX-02`** | §3.6 exit **3** / `DIS-2` / §3.1 step 3 — no display ⇒ **actionable** prerequisite error naming the fix, before any boot | `CMD-9` | exit **3**; `PREREQUISITE ERROR — no display server: DISPLAY is unset. … FIX: run under a display — either export DISPLAY (e.g. `DISPLAY=:0 npm run ui`) … or wrap the run in xvfb: `xvfb-run -a --server-args="-screen 0 1024x768x24" npm run ui``; the same log's earlier section shows the divergence precondition had already run green ⇒ **the prerequisite is decided outside/after the precondition and before the boot, and was not retried** | **PASS** |
| **`EX-03`** | §5.1 `PRE-1`/`PRE-2` — divergence green **for the same built tree**, its line + exit code reported verbatim, digest pair equal, engine pin/dist agreement | `CMD-1` | `--- §5 PRECONDITION: npm run divergence (same built tree) ---`, `R13 RESULT: 9 checks, 0 failures (exit 0)`, `tree digest before: dist/main/main.cjs sha256=802fc6c4e04174ca… provident-ssr@0.5.1 (declared pin: ^0.5.1)`, `✓ precondition: divergence green …, tree digest after matches before, pin/dist agree`; independently: installed `0.5.1` vs declared `^0.5.1` | **PASS** |
| **`EX-04`** | §3.5 `SEAM-1`/`SEAM-4` — the seam is **inert when unused**; the default enabled-group set is unchanged; `code` is ON only in the leg's scratch store | `CMD-1` + `CMD-10` | the leg's own runs are consistent with it (`SCRATCH_GROUPS`-seeded scratch store; `code` group tools appear per boot); the *absent-override* half is a node-layer row in `tests/ui-leg-seam.test.ts` (**9 tests**, `CMD-10`) that **this pass did not read** | **NOT-BLIND-RUNNABLE** (`NBR-02`) |
| **`EX-05`** | `RT-8` — the precondition is invoked **once**; a `divergence` red (bootstrap-class or not) is **never** retried; `PRE-2`'s digest pair is never moved by a retry | `CMD-1` + `git diff --stat` | one precondition block per run, one `R13` line per run, exactly one `tree digest before:` per run; zero `attempt`/`retry` markers anywhere in the precondition section; `scripts/electron-divergence.mjs`'s diff is the `H-r18`-owned spawn-site extraction only | **PASS (structural)** — the **positive** half (a genuinely red precondition ⇒ `exit 2`, no measurement, no retry) is **`NBR-04`** |

### 4.4 The divergence leg and the scope limit

| Id | Clause | Command | Observed value | Verdict |
| --- | --- | --- | --- | --- |
| **`DIV-01`** | `PRE-4` / `RT-9`(b) / `docs/specs/ci-divergence-leg.md` §5 — **`N = 9` stays exactly intact** | `CMD-5` ×4 (`npm run divergence`) | `R13 RESULT: 9 checks, 0 failures` in **all four** (exit 0) | **PASS** |
| **`DIV-02`** | §3.7 `RT-9`(a)/(d) — the retry is **leg-local**; the divergence leg's own flake is **not** this unit's and the shared helper must not carry a retry | `CMD-11`, `CMD-7`/`CMD-8` | retry knobs affect **only** the `ui` leg; `git diff --stat HEAD -- scripts/electron-divergence.mjs` = `12 insertions(+), 6 deletions(-)` (the two spawn-site call rewrites + the import, the extraction `H-r18` owns), while `docs/specs/ci-ui-leg.md` §2.1 item 1 requires the **vector/env/stdio/cwd/profiles byte-identical** and `MS-7` requires the result line unchanged — which `DIV-01` confirms empirically | **PASS (as landed)**; the byte-identity of the vector itself is **`NBR-06`** |
| **`DIV-03`** | §5.4 — the off-green signature a bootstrap-killed divergence run produces | `CMD-9` (the only run in which the divergence leg's child died) | `R13 RESULT: 9 checks, 0 failures (exit 0)` — **the divergence leg survived even when the `ui` leg's boot died**, so the pinned off-green signature `R13 RESULT: 1 checks, 2 failures` was never produced here | **NOT-BLIND-RUNNABLE** (`NBR-04`) |
| **`DIV-04`** | `H-r18` / §3b — the divergence leg's identical flake is an **inherited, uncorrected cost**; the `ui` leg must not answer it | `CMD-1` ×4, `CMD-5` ×4 | **no flake occurred at all in this pass** (9 `ui` boots ×2 profiles, 4 divergence runs, all green) — so neither leg's retry behaviour under a real `SIGTRAP` was observed; the `/dev/shm` restriction itself **was** confirmed (`touch /dev/shm/…` → `Permission denied`) | **PASS for the scope statement / NOT-BLIND-RUNNABLE for the flake behaviour** (`NBR-03`) |

### 4.5 The `[T]`/`[X]`/`[A]` corroboration rows

| Id | Clause | Command | Observed value | Verdict |
| --- | --- | --- | --- | --- |
| **`SEAM-01`** | `MS-1` — the unit's row files are `18 + 9 = 27`, green | `CMD-10` | `ui-leg-seam.test.ts (9 tests)`, `ui-leg-contract.test.ts (18 tests)`, `Tests 27 passed (27)` | **PASS (count-only; no test source read)** |
| **`SEAM-02`** | §2 item 3 / §8 `N-8` / AMENDMENT BLOCK `M-2` — the `scripts` block is **TWELVE** keys, the twelfth being `ui`, and the pre-unit set is the exhaustive eleven | `CMD-11` | `12 ["clean","build","build:watch","start","start:http","typecheck","test","test:watch","battery","divergence","ui","mcp"]`; `git status --short` shows `package.json` **unmodified since HEAD** (the `ui` key is committed) | **PASS** |
| **`SEAM-03`** | §0 prohibition 5 / §7 item 7 — no new MCP surface: `ALL_TOOLS` and `RpcMethod` unchanged | `CMD-4` | `BATTERY RESULT: 184 checks, 0 failures` (the pre-existing battery count, unchanged) | **PASS (indirect)** — the battery's own tool census is the corroboration; the `21`/`21` counts themselves were **not** driven here |

---

## 5. FAIL rows — verbatim (observed vs documented)

**These are findings. None was converted to a pass.**

### `R0-04` — the scratch profiles are NOT deleted on the documented exit path

- **Doc:** §3.1 step 8 *"print the §1.13 statement + run the static honest-limits row (`R4`); **clean
  both profiles**; exit"*; §0 prohibition 4 *"the leg persists **nothing** outside its two scratch
  temp profiles **and deletes them on exit**"*; §3.7 `RT-3` *"the profile is created **per attempt**
  … **each is deleted**"*; §3.7 `RT-5`'s recording duty; §3a seed `U-10` (*"are both scratch profiles
  removed on every exit path (success, failure, SIGINT), and is a leftover recorded as non-fatal"*).
- **Command:** `rm -rf /tmp/provident-ui-run-*` (roots present: **0**) → `node scripts/electron-ui.mjs`
  → `ls -d /tmp/provident-ui-run-*`.
- **Observed:** exit **0**, `UI RESULT: 0 failures (11/11 assertions green …)`; **roots present after
  the run: 1** — `/tmp/provident-ui-run-ZyOELD`, still present 2 s later, holding **both**
  `provident-ui-A-vbu5at` and `provident-ui-B-igkVFO`; the run printed **no** leftover/cleanup record
  (grep for `leftover|not removed|failed to remove` → no match). Earlier in this pass **43** such
  roots had accumulated; a re-check 3 s after another exit 0 showed the root still present.
- **Documented:** profiles deleted on every exit path ⇒ **0** roots; a leftover ⇒ *at minimum a
  recorded, non-fatal note* (the divergence-leg precedent the `U-10` seed names).
- **Verdict: FAIL.** The profiles are inside `/tmp` (not the operator's profile, and no
  `provident-security.json` was found in any leftover), so this is a **hygiene/recording** failure
  against the contract's "deletes them on exit" + "a leftover is recorded" halves — **not** a
  measurement or isolation failure. Not a pass, not a skip.

### `RT-05` — a per-attempt handshake timeout does not consume an attempt and does not retry

**⟶ DISPOSITION (added 2026-09-27, FIFTH pass — the `F-2` RCA + fix pass; STATUS/ANNOTATION ONLY, and
this row's text above/below is NOT rewritten): REAL DEFECT IN THE LEG — NOW FIXED.** This FAIL was a
**correct observation of a real defect**, never a documentation drift and never a spec defect — so it is
**not** withdrawn, **not** converted to a pass, and **not** re-scoped. **The three-step history, so no
later pass re-argues it:** **(1)** at filing, `RT-05` read the **precedence gap** between `RT-1`'s
conjunction and `RT-4` item 3 — that gap was **closed by the architect's PRECEDENCE CLAUSE**
(`docs/specs/ci-ui-leg.md` §3.7, AMENDMENT BLOCK 3 `B3-3`); **(2)** the live battery then showed the
remaining behaviour was a **RACE**, not a missing clause — the **timeout-class retryability** depended on
whether the handshake flag was sampled before or after the termination-grace `await`, so the clause held
at `PROVIDENT_UI_BOOT_TIMEOUT_MS=30` and was **violated at `100`/`200`/`260 ms`** (the finding **`F-2`**,
`docs/specs/ci-ui-leg-live-status.md` §6.2); **(3)** the race is **FIXED** — the leg now **snapshots the
handshake state at the instant the raced verdict settles** (`handshakeResolvedAtSettle`,
`scripts/electron-ui.mjs:641`, read; handed to the predicate at `:660`, before the grace `await` at
`:651`), so the timeout class **consumes an attempt and retries in EVERY regime**, and **this FAIL's
complaint no longer reproduces**. **The post-fix boundary is MONOTONIC:** `120`/`200`/`260 ms` →
`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`, exit `1`, **every attempt recorded in order**;
`300 ms` → **accepted**, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared
rows R0-R4)`, measurement `427x22`. **NO CONTRACT CLAUSE CHANGED** (`RT-1`/`RT-2`/`RT-4` item 3 and the
PRECEDENCE CLAUSE are byte-unchanged — the leg was corrected **to** the contract). **What this
disposition does NOT do:** it does **not** re-disposition any `NBR-*` row, it does **not** close this
record's **`R0-04` FAIL** (the leftover scratch profiles — the live battery's **`F-1`**, still **OPEN**;
that record's §6.1 is unamended), and it converts **no** row to a pass. **The record of the fix:** the
spec's **AMENDMENT BLOCK 5** (status only), `docs/decisions.md`
`UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE`, `docs/defects.md` `UI-LEG-TIMEOUT-CLASS-RACE` (CLOSED
host-side), and `docs/next-steps.md`'s `WAVE-C UPDATE 2`.

- **Doc:** §3.7 `RT-4` item 3 — *"**an attempt that has not completed the handshake within it is a
  FAILED BOOTSTRAP ATTEMPT and consumes an attempt** (this closes the 'the leg hangs forever and the
  retry never fires' hole)"*, with the bound of `RT-3` (`4` attempts per boot) governing.
- **Command:** `PROVIDENT_UI_BOOT_TIMEOUT_MS=150 node scripts/electron-ui.mjs` (reproduced at `100` and `60`).
- **Observed:** `· attempt 1/4 boot A outcome=bootstrap-failed profile=/tmp/provident-ui-run-zKIFx2/provident-ui-A-iYwzxa`,
  `signature: no observed child termination — transport error: handshake did not complete within 150 ms (RT-4 item 3)`,
  then `✗ boot/connect failure: boot A attempt 1 failed non-retryably (RT-2): no observed child
  termination — …` and **exit 1 on attempt 1 of 4** — no second attempt, no backoff wait, no
  `EXHAUSTED` marker, no attempt records for 2–4, no measurement.
- **Documented:** the timeout is a failed bootstrap attempt that consumes the budget ⇒ per `RT-3`
  the boot should have been re-attempted (fresh profile, 250 ms backoff) until the budget was spent,
  and only then exhaust.
- **Verdict: FAIL.** The implementation instead applied `RT-1`'s literal conjunction (**child death
  observed** AND **handshake unresolved**) — a leg-timer timeout can never satisfy the first half,
  because the leg's own timer is what ended the attempt. **The two clauses are in tension (see the
  inconsistency record below); the implementation chose `RT-1`, and `RT-4` item 3's
  attempt-consumption clause is therefore not implemented.** `RT-1` in isolation passes (`RT-01`).

### `RT-06` — the documented per-boot ceiling is `122 000 ms`; the leg uses `121 750 ms`

- **Doc:** §3.7 `RT-4` item 4 — *"**WALL-CLOCK CEILING — `122 000 ms` per BOOT** (**derived, not a
  new constant:** 4 attempts × 30 000 ms + 250 + 500 + 1000 ms backoff = 121 750 ms ⇒ the ceiling is
  the retry budget's own upper bound)"*; AMENDMENT BLOCK 2 `A2-3` repeats `122 000 ms`; the
  supersession index's `RT-1`…`RT-9` row repeats it.
- **Command:** `node scripts/electron-ui.mjs` (any run).
- **Observed:** `per-boot ceiling 121750 ms (RT-3/RT-4)` on every run — i.e. the **arithmetic sum**,
  matching `RT-4`'s own parenthesis and contradicting the `122 000 ms` value the same cell pins.
- **Documented:** `122 000 ms`.
- **Verdict: FAIL (doc/implementation drift of 250 ms).** The contract is **internally
  inconsistent as written**: it labels `121 750` the derivation *and* `122 000` the pinned ceiling.
  The implementation cannot satisfy both; a later reader cannot know which value is the contract, and
  the record of *which* number the leg enforces is only available through its startup line.

### `RT-08` — the operator knobs' names are not recorded in `docs/decisions.md`

- **Doc:** §3.7 `RT-4` items 2–3 — the attempt count *"is overridable by an environment variable (the
  leg's own idiom; **the name is the Implementer's to fix and must be recorded in the leg and in
  `docs/decisions.md` when it lands**)"*; the handshake timeout *"is overridable by an environment
  variable for a deterministic red row, **default `30 000 ms`**"*.
- **Command:** `grep -c 'PROVIDENT_UI' docs/decisions.md` (and the same grep over `docs/`).
- **Observed:** **`0`** — no doc in the tree names `PROVIDENT_UI_BOOT_ATTEMPTS` or
  `PROVIDENT_UI_BOOT_TIMEOUT_MS`; only the *constant* name `PROVIDENT_UI_BOOT_ATTEMPTS` appears in
  `docs/specs/ci-ui-leg.md` §3.7 `RT-3`'s pass-condition cell (as the implementation's idiom), never
  as the operator-facing environment variable.
- **Documented:** the landed names recorded in the leg **and** in `docs/decisions.md`.
- **Verdict: FAIL (the `docs/decisions.md` half of the clause is unmet).** Consequence, stated
  honestly: **a blind re-run cannot drive `RT-3`/`RT-4` at runtime from documentation alone** — this
  pass only could because it grepped the leg's source (the declared deviation above). That is the
  operational cost of the missing record.

### Related finding (reported, not scored as a scenario): the `R4` static row is narrower than the clause it claims

`docs/specs/ci-ui-leg.md` §3.0 `R4`'s pass condition is *"a static assertion over the leg's source
passes: **no call that asserts app-level behaviour** (the pinned static check: the leg contains **no**
reference to a packaged bundle, no `app.isPackaged`-based claim, no assertion phrased as an
app-green, no `webContents.executeJavaScript`/CDP call inside a *shipped* path)"*. The landed check
is a single regex — `const appClaim = /app\.isPackaged/.test(legSource)` — and its row text is
`R4 no app-level claim: no packaged-bundle reference, no packaged-mode detection claim in this leg
(61011 bytes scanned)`. So the executed assertion covers **only** the `app.isPackaged` half; the
*executeJavaScript/CDP-call-in-a-shipped-path* half is **not** asserted by it. This run could
**not** test that half itself **without reading the shipped call paths** — hence `NBR-01` — and it
does not assert that the half is violated. It is filed because `R4`'s printed claim ("no
packaged-bundle reference, no packaged-mode detection claim") and the clause's stated scope are not
the same scope, and a reader could take the green as covering both.

---

## 6. NOT-BLIND-RUNNABLE record

**A row is NOT-BLIND-RUNNABLE when the only way to settle it is to read the implementation (or to
break the repo/environment), not because it failed and not because it was hard.** None of the six
rows below is a pass and none is counted as one.

| Id | Row it covers | Why it cannot be settled at this layer |
| --- | --- | --- |
| **`NBR-01`** | `R4`'s **static** half (§3.0 `R4`) — *"no `webContents.executeJavaScript`/CDP call inside a shipped path"* | The executed assertion is a regex over the leg's own source; the printed row states a narrower claim than the clause's scope. Deciding whether a *shipped* path calls `executeJavaScript`/CDP requires reading the leg's call graph — i.e. reading `scripts/**` as implementation. The **`[U]`** half of `R4` (the §1.13 statement, row `R4-01`) **was** run and passes. |
| **`NBR-02`** | §3.5 `SEAM-1`/`SEAM-2`/`SEAM-3`/`SEAM-4` (`[H]`) | These are **node-layer** rows. In this tree they live in `tests/ui-leg-seam.test.ts` (9 tests, observed green by `CMD-10`) and `tests/ui-leg-contract.test.ts` (18) — **reading them to derive or execute an assertion is implementation reading**, so this pass reports the files' count only. The **reachable** parts are recorded instead: `R0-03` (no operator-profile write, by mtime) and `EX-04`. |
| **`NBR-03`** | `RT-1`'s runtime retry loop, `RT-3`'s second-attempt profile/cleanup/budget halves, `RT-4` item 1's consumed backoff, `RT-5`'s accepted-attempt record, `RT-6`(a)'s `k>1` label, `RT-7` (all) | **A retryable bootstrap failure could not be induced deterministically from outside the repo, and none occurred naturally.** The docs' own flake class (`SIGTRAP` at init, ≈1-in-3) **did not fire in this pass at all** (9 `ui` boots × 2 profiles + 4 divergence runs, all green), and the leg's `[U]` retryable signature requires an **observed child termination together with an unresolved handshake** (`RT-1`), which no leg-side knob can force: the only failure knob this run could reach is the leg's **own** handshake timeout, which by construction leaves **no observed child termination** and is therefore classified non-retryable (`RT-05`). Forcing a real death instead would require breaking the built artifact — which the leg's own **precondition rebuilds** (`PRE-1` runs `npm run divergence`, i.e. `npm run build && …`), so the mutation is erased before the boot — or stubbing `node_modules/.bin/electron`, which would also break the precondition and would leave a **shared `node_modules` artifact** at risk in this read-mostly pass. **Both were declined deliberately; the retry loop is therefore unverified at this layer, not verified.** |
| **`NBR-04`** | §5.1 `PRE-1`/`PRE-3` — a genuinely **red** divergence precondition ⇒ `exit 2`, no measurement, no retry; §5.4's off-green signature | The same mechanism as `NBR-03`: the precondition **rebuilds the tree** before running, so a mutated `dist/main/main.cjs` is regenerated (measured: mutated `b06fed74…` → the leg's own precondition printed `R13 RESULT: 9 checks, 0 failures` on a freshly built `802fc6c4…`). A real red can only be produced by editing `src/**`/`scripts/**` (forbidden for this pass and for this unit) or by breaking Electron itself — which would red **both** legs and prove the wrong clause. `PRE-3`'s **authority order** is nonetheless **observed** (`DIV-01`, `EX-03`, `EX-05`): every run of this pass invoked divergence first and reported its line verbatim, and `EX-02` shows the DISPLAY prerequisite is decided outside/after the precondition. |
| **`NBR-05`** | `RT-2` class 1 — a **completed** boot whose `R0`–`R4` row is wrong is not retried | Provoking a row failure (an inequality across boots, a `0`/blank measurement, a non-`UNSUPPORTED` shim word, a missing §1.13 statement) means breaking the probe/rows — implementation work, not a blind scenario. The negative evidence available: **no** retry marker or attempt loop appears anywhere in the 9 green runs, and the only non-green runs failed **inside** the boot/handshake window. |
| **`NBR-06`** | §2.1 item 1 — the divergence leg's argument vector/env/stdio/`cwd`/profiles stay **byte-identical** after the helper extraction (`U-12`'s concern) | Checking byte-identity means comparing the two call sites' arguments to the as-filed vector — i.e. reading `scripts/**`. What **is** reachable and recorded: `N = 9` intact across four runs (`DIV-01`), the divergence file's diff is the spawn-site extraction only (`DIV-02`), and the leg's arg vector as **printed by the `ui` leg** shows the documented pair (`--disable-dev-shm-usage` + a fresh scratch `--user-data-dir` per `DIVERGENCE-SPAWN-FIX`; the `ui` leg additionally states it deliberately withholds Electron's own `--user-data-dir` so `R0`(c) attributes the relocation to the seam). |

---

## 7. What the unit's DONE row may and may not rest on

**May rest on (independently reproduced in this blind run, on the current tree):**

- **the five declared rows' `[U]` content** as `docs/specs/ci-ui-leg.md` §3.0 states it —
  `R0`(a)/(b) isolation across two scratch profiles (`R0-01`, `R0-02`), `R1`'s discriminating
  **element/renderer-API** provenance with the shim's `ShimElement`/`UNSUPPORTED` recorded alongside
  (`R1-01`, `R1-02`), `R2`'s **ONE** measurement `427x22` at `fontSize="16px"` read back out of the
  graph content (`R2-01`, `R2-02`), `R3`'s exact word `UNSUPPORTED` + reason (`R3-01`), and `R4`'s
  §1.13 statement with all seven components (`R4-01`);
- **the leg's live green**: 9 of 9 clean runs `UI RESULT: 0 failures (11/11 assertions green, mapped
  onto the five declared rows R0-R4)`, exit 0, **`retries=0` in every run**;
- **the exit-code vocabulary and the authority order**: `0`/`1`/`3` observed, never a skip or a
  fabricated `0` (`EX-01`), the actionable `DISPLAY` refusal (`EX-02`), and the precondition reported
  verbatim once per run with an equal digest pair (`EX-03`, `EX-05`);
- **the `N = 9` pin**: `R13 RESULT: 9 checks, 0 failures` in four of four `npm run divergence` runs
  (`DIV-01`) — this unit did not move the divergence leg's count;
- **the scope/claim discipline**: the retry knobs are `ui`-leg-local and the divergence file's diff is
  the `H-r18`-owned extraction (`DIV-02`); the diff scope is the documented five files
  (`CMD-11`), `package.json`'s twelve keys include exactly one additive `ui` (`SEAM-02`), engine pin
  `0.5.1` vs `^0.5.1` agrees, and the landing row files are `27` (18 + 9) green (`SEAM-01`);
- **the trio + battery counts as quoted baselines**: `npm test` `58 files / 822 passed / 2 skipped /
  0 failed`, `npm run typecheck` clean, `npm run battery` `184 checks, 0 failures`;
- **the two retry-config rows**: the bound `4` with the `1..4` admissible range and the malformed-value
  refusal (`RT-03`), the labelled per-boot attempt lines on a clean green (`RT-09`), and `RT-5`'s
  verbatim signature + stderr-tail recording for a failed attempt (`RT-07`).

**May NOT rest on:**

- **the retry loop itself** — no retryable bootstrap failure was reachable or observed (`NBR-03`).
  `RT-1`'s runtime retry, `RT-3`'s per-attempt re-profile/cleanup/budget, `RT-4` item 1's consumed
  backoff, `RT-6`(a)'s `k>1` label and **`RT-7`'s exhaustion path (exit `1` with every attempt's
  signature) are UNVERIFIED at this layer.** A claim that "a `SIGTRAP` boot is retried and exhaustion
  exits 1" currently rests on the contract text, not on this run.
- **`RT-4` item 3's attempt-consumption clause** — contradicted by the handshake-timeout probe
  (`RT-05` FAIL), and in tension with `RT-1` as written.
- **the `122 000 ms` ceiling figure** — the leg enforces/prints `121 750 ms` (`RT-06` FAIL).
- **`RT-4` items 2–3's "recorded in `docs/decisions.md`" half** — unmet (`RT-08` FAIL); a blind agent
  cannot drive those rows from documentation alone.
- **any claim that the scratch profiles are removed on exit** — contradicted (`R0-04` FAIL): a green
  run leaves its root and both attempt profiles on disk, and records nothing about it.
- **`R4`'s static row as covering the clause's full scope** — the executed assertion is the
  `app.isPackaged` regex only (`NBR-01`).
- **any rendered-geometry, CSS-resolution, layout, IPC-layer or attribute-row claim** — out of this
  leg's layer by contract (§3.3 `C-7`, §7 item 6; `A-d4`'s bound). In particular **this unit does NOT
  move `M-46` off `UNMEASURABLE`** — that needs `H-r10`'s set-wise attribute extractor
  (`U-DIVERGENCE-EXT`), which does not exist yet.
- **any app-level reading of a `ui` green, or an IPC reading of a divergence green** (§3.3 `C-1`/`C-2`,
  §5.3 — the `LIVE-OP-REJECT` lesson).
- **any statement about the shim's fidelity** — `UNSUPPORTED` is this measurement's silence, not a
  verdict (§3.3 `C-6`).

---

## 8. Contract inconsistencies and unexecutable-as-written clauses (reported, not reconciled)

1. **The ceiling figure contradicts its own derivation** (§3.7 `RT-4` item 4): `122 000 ms` pinned vs
   `121 750 ms` derived in the same sentence. The leg prints `121750 ms`. **A later reader cannot
   tell which number is the contract** — reported to the supervisor, not silently reconciled here.
2. **`RT-1` and `RT-4` item 3 are in tension at the timeout boundary**: `RT-1` makes the retryable
   signature the conjunction of *an observed child termination* **and** *an unresolved handshake*,
   while `RT-4` item 3 makes a leg-timed handshake timeout *"a FAILED BOOTSTRAP ATTEMPT [that]
   consumes an attempt"*. A leg-timer timeout cannot produce an observed child termination, so under
   `RT-1`'s predicate it can never be retried — i.e. the very hole `RT-4` item 3 says it closes
   ("the leg hangs forever and the retry never fires") is closed only in the sense that the run
   **fails immediately** instead (`RT-05`). **The clauses need a stated precedence.**
   *(**⟶ RESOLVED, TWICE — 2026-09-27:** the **stated precedence** this record asked for **LANDED** as
   §3.7's **PRECEDENCE CLAUSE** (architect-ruled, `ci-ui-leg.md` AMENDMENT BLOCK 3 `B3-3`: **the
   timeout class IS retryable**, its signature being the absence of an observed termination **plus** the
   handshake-not-completed fact, verbatim, exhaustion still exit `1`); **and the residual defect the
   live battery then found — the `F-2` RACE, i.e. the classification being sampled at two different
   instants — is FIXED** (the leg snapshots the handshake state at settle). **`RT-05`'s live
   disposition is REAL DEFECT, NOW FIXED** (§5). This record's own row text is left as written.)*
3. **§3.6's exit-`1` row and `RT-7` cannot be distinguished in the observed output**: the failed-boot
   probe printed `failed non-retryably (RT-2)` and exit `1` with **no** `EXHAUSTED` marker and no
   record of the (unspent) attempts 2–4, so a reader cannot tell "a non-retryable failure" from
   "exhaustion" except by the presence of the `RT-7 EXHAUSTED:` marker — which `RT-7` does pin, so the
   clause is satisfiable, but §3.6's shared exit `1` carries two meanings with only the marker to
   separate them.
4. **The status/measurement record drifted from the leg's own formatter**: `MS-2` (and the wave-C
   checkpoint cells in `docs/decisions.md`) quote `UI RESULT: 0 failures (5/5 rows green)`, while the
   live leg prints `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows
   R0-R4)`. Both are "0 failures"; **the quoted string is stale**, and a later pass quoting `MS-2`
   will quote a line the leg no longer emits. (Consistent with the spec's own §3.0 count of five
   declared rows *and* eleven assertion lines — the two counts are about different things, which the
   stale quote obscures.)
5. **`RT-4` items 2–3 impose a documentation duty that the landing did not discharge** (`RT-08`), which
   makes the retry rows **non-drivable from documentation alone** — the opposite of `RT-3`'s stated
   intent that these be the `[T]`-checkable rows.
6. **A row that only the implementation can settle is named as a row**: `R4`'s static half includes a
   *shipped-path* call-graph claim (`NBR-01`). Per this project's own rule (§3.0's `R0` node-layer
   caveat and §5.5's honesty anchors), a criterion a blind agent cannot reach should be marked as such
   in the clause, or scoped to what the executed assertion actually checks.

**And, stated for the record:** this greens set was authored by an agent that did **not** write the
implementation, the seam, the retry policy or any of their tests, and that read **no** file under
`src/**` and **no** file under `tests/**` to derive any scenario. Where it contradicts the contract,
the contradiction is filed above as a finding and **no contradicting row was converted into a pass**;
where a row could not be reached blind, it is recorded as **NOT-BLIND-RUNNABLE with its reason**
rather than counted as a pass.

**⟶ AND, FOR THE RECORD (2026-09-27, FIFTH pass — the `F-2` RCA + fix): what this record's dispositions
do and do not settle.** **Settled:** `RT-05` is a **real leg defect, now fixed** (§5's disposition
note); `RT-06` and `RT-08` were **closed** by the spec re-pin and the `docs/decisions.md` record
respectively (the live battery drove the knobs from documentation alone); inconsistency records **1**,
**2**, **4** and **5** are each **closed by later passes** (the ceiling re-pin, the PRECEDENCE CLAUSE,
the stale-quote correction and the knob-name record) — **each by the pass that owned it, not by this
one**. **NOT settled, and NOT to be read as closed by the fix:** this record's **`R0-04` FAIL** — the
live battery reproduced it as **`F-1`** (every green run leaves a root + both attempt profiles while the
leg reports `leftover profiles: NONE`) and it **REMAINS OPEN**; the **`NBR-01` sub-finding** (`R4`'s
executed row covers only the `app.isPackaged` half of its clause) **STANDS**; and **inconsistency
record 3** (§3.6's exit `1` carrying two meanings separated only by `RT-7`'s marker) **still stands as a
readability caveat** — the `F-2` fix removed the spurious mid-budget abort, **not** the shared exit code.
**No `NBR-*` row is re-dispositioned here, and no row of this record is converted to a pass.**
