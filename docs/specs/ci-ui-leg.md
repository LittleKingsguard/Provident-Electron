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
with a non-discriminating one.** **Residual, reported rather than silently fixed:** as landed the leg's
`R1` boolean predicate reads the `typeof window`/`typeof document` pair (`scripts/electron-ui.mjs:387-391`,
read) and the discriminating names are recorded in the row's DETAIL string; a later pass may tighten the
predicate to compare the element/API names — **that tightening is owed, not done here** (no script edit was
in this amendment's scope).

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
pass reading this file must read the count as a MEASURED value at a date, never as a pinned literal.

### M-3. The landing measurement note (STATUS — no clause changes)

**Attributed to the landing pass (labelled, not re-run by this amendment pass — this pass has no shell):**

| # | Measurement | Result |
| --- | --- | --- |
| **MS-1** | the unit's red set → green | **`20` failing rows → `27/27` green** — the 27 rows are `tests/ui-leg-contract.test.ts` (**18** `it(...)`) + `tests/ui-leg-seam.test.ts` (**9**), counted by reading this pass (18 + 9 = 27, agrees) |
| **MS-2** | the live leg's own result line | **`UI RESULT: 0 failures (5/5 rows green)`** (the leg's formatter at `scripts/electron-ui.mjs:469`, read) |
| **MS-3** | `npm test` | **58 files / 822 passed / 2 skipped / 0 failed** |
| **MS-4** | `npm run typecheck` | clean |
| **MS-5** | `npm run build` | clean (bundles emitted) |
| **MS-6** | `npm run battery` | **184 checks / 0 failures** |
| **MS-7** | `npm run divergence` | **`R13 RESULT: 9 checks, 0 failures`** — **unchanged** (the `N = 9` pin intact, `PRE-4`/`U-12` discharged: the helper extraction did not move the count) |
| **MS-8** | the ONE live measurement (`R2`) | **`427x22`** at **`fontSize="16px"`**, read back over **`provident.get_rendered_html`** (both halves non-zero/non-empty ⇒ §3.0 `R2`'s pinned shape, ONE measurement — §1 item 3) |
| **MS-9** | the landed surface (read this pass, status only) | `scripts/electron-ui.mjs` + `scripts/electron-spawn.mjs` exist; `scripts/electron-divergence.mjs:18` imports the helper; `package.json`'s `"ui"` landed at `:19`; the seam landed at `src/main/main.ts:41-64` (flag **`--provident-user-data=`**, applied with `app.setPath('userData', …)` before the stores) |

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
unilaterally by an implementation pass.**

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
| **5** | No new MCP surface — no new tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry | **HOLDS — asserted, and this is the row the leg's measurement channel is chosen to satisfy.** `ALL_TOOLS` **stays 21** and `RpcMethod` **stays 21**; no group is added. The measurement rides the **EXISTING** `provident.load`/`code.load` + `get_rendered_html` (§3.2); the fallbacks (`webContents.executeJavaScript`, CDP) are **leg-only and may NEVER become MCP tools** (an MCP-visible eval tool is a self-granting capability breach). **`H-r14` is not needed here**: this unit adds no tool and needs no new gate. | §3 `R2`, §3.2, §5.2 item 4, §7 item 10 |
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
   (`scripts/electron-divergence.mjs:18` imports the helper, read) plus the unchanged result line
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
| **`R1`** | **The leg is REAL and DISTINGUISHABLE from the shim leg by a TYPED MARKER** — **amended 2026-09-27: the discriminating marker is the ELEMENT/RENDERER-API PROVENANCE, never `typeof window` alone (see the pass condition and the AMENDMENT BLOCK M-1).** | **[U]** vs **[X]** | The leg records a typed marker distinguishing the real-renderer boot from a shim boot — ~~**and the marker must be a *type*, not a string the shim could equally emit.** The pinned marker (the Implementer may extend, not replace it): the real boot reports a **real `window`/`document` provenance** — the probe's own observation that the write it reads back came from a live renderer realm — recorded **alongside the same probe attempted on the shim leg.**~~ *(SUPERSEDED: 2026-09-27 — **THE `typeof window` CLAUSE IS NOT A DISCRIMINATOR, and the landing pass MEASURED that.** In the real renderer boot `typeof window` is the string `'object'` (`scripts/electron-ui.mjs:149`, read). The clause as worded named a **category the shim's own realm also populates**: the shim installs its own `document` object on `globalThis` (`src/shared/dom-shim.ts:136-139`, read) and its elements are **`ShimElement`** instances (`:4`, read), so *"reports a real `window`/`document` provenance"* is not a property only a live renderer realm can have — and `typeof window` is a **realm-global coincidence, not a renderer-API fact**, so it could never answer `U-11`'s vacuity challenge (§3a: *"could the `R1` typed marker be produced by the shim leg too?"*). **What the shim's own `window`-shaped global is, is taken from the landing pass's finding** (*"the shim defines `window`/`document`"*, `docs/next-steps.md` `WAVE-C CHECKPOINT` finding 1, read) **rather than assumed from this tree** — what IS readable in `src/**` is the shim's `document` on `globalThis` (`src/shared/dom-shim.ts:136-139`, read) and `ShimElement` (`:4`), with **no `globalThis.window` assignment found** (read; stated so the discriminator is not built on an unverified premise). **The MEASURED shim attempt is the discriminator that is:** `typeof window=undefined`, `element=ShimElement`, `measure=UNSUPPORTED (never a 0)`, reason `el.getBoundingClientRect is not a function`.)* **RE-PINNED (2026-09-27): the marker must be a *type*, and its DISCRIMINATING half is the ELEMENT/RENDERER-API PROVENANCE** — the probe's own observation, taken in the realm whose write it reads back, of **(i)** the observed element's **constructor name** (**real renderer: `HTMLDivElement`**; shim: **`ShimElement`**) and **(ii)** the **renderer-API class name** of the computed style (**real renderer: `CSSStyleDeclaration`**). **The pinned marker as landed, verbatim:** real boot ⇒ `window=object;document=object;element=HTMLDivElement;style=CSSStyleDeclaration;display=…;measure=<W>x<H>;fontSize=…`; shim boot ⇒ `typeof window=undefined, element=ShimElement, measure=UNSUPPORTED (never a 0)` with reason `el.getBoundingClientRect is not a function`. **`typeof window` / `typeof document` are RECORDED AS SECONDARY OBSERVATIONS (`object`/`object` on the real boot) and may NEVER be the sole basis of this row.** Both markers are written into graph content by the SAME probe and read back over the existing `provident.get_rendered_html` (§3.2), with **the shim attempt recorded alongside**. **The permission this row already carried STANDS: the Implementer may EXTEND the marker (add further typed provenance observations) — it may NOT REPLACE it with a non-discriminating one.** | **Indistinguishable ⇒ a RE-SCOPE FINDING, never a pass** (amendment record §1.11's stop condition; §1.12's cross-unit note that `ui` must not be absorbed into `divergence`). The leg **stops** and reports. | absent |
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

### 3.6 The leg's exit codes (pinned vocabulary, so no fail state is a silent skip)

| Code | Meaning | Notes |
| --- | --- | --- |
| **0** | every row the leg declares passed | the only green |
| **1** | a measurement row failed (`R0`–`R4`, or a spawn/connect failure) | the leg prints the failing row by name |
| **2** | **PRECONDITION-FAILED** — `npm run divergence` was not green **for the same built tree** | **no measurement is taken**; the output names the precondition and the divergence result line (§5) |
| **3** | **PREREQUISITE ERROR** — no display available | the message **names the fix** (`DISPLAY`, or an xvfb wrapper the operator supplies) |

**No other exit code is admissible, and no failure may be converted into a skip, a `0`, or a green.**

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

## 6. The DISPLAY requirement (`H-r19`) and the refusal it produces

| # | Clause | Exact statement |
| --- | --- | --- |
| **`DIS-1`** | **The prerequisite** | The leg **requires a display server**: `DISPLAY` (or an **xvfb wrapper the operator supplies**). The app's `BrowserWindow` is created with **no `show:false`/offscreen option** and the leg spawns with `--ozone-platform=x11` + `DISPLAY || ':0'` `(engine recon)`. |
| **`DIS-2`** | **The failure mode** | No `DISPLAY` and no xvfb ⇒ an **ACTIONABLE PREREQUISITE ERROR NAMING THE FIX**, exit **3**. **NEVER a silent skip, NEVER a false green, NEVER a `0`.** |
| **`DIS-3`** | **What is NOT to be done** | **Do NOT add `show:false`** and **do NOT add a CI config** (`H-r19`). A future pass wanting true headlessness must either accept a `show:false` claim it can **measure** or run under xvfb — **either is outside this pass**. |
| **`DIS-4`** | **Why this is declared rather than discovered** | **An undeclared environment prerequisite is the flake class `H-r19` closes** (`RK-7`; `RK-14` names the `ui` leg's display dependency + flake cost). **This repo has NO CI config** (glob `.github/**` → no files, this pass), so "CI leg" means *"a repeatable script a human/agent runs"* — the ruling binds **the spec text and the failure message**, not a runner. |
| **`DIS-5`** | **Isolation is still required** | The DISPLAY prerequisite does **not** relax isolation: a temp `userData` profile, **no network**, and **no writes outside the temp dir** (`H-r19`'s two-part truth: **isolation YES, headlessness NO**). "No network" is a **claim about the leg's own behaviour**: the leg opens no socket and the MCP transport is **stdio** — it is **not** a claim that Chromium makes zero network calls (no such measurement is taken by this unit; recorded honestly rather than asserted). |

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
    the SpecWriter's report — never silently reconciled.**

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

**`U-11`'s spec half is ANSWERED by the 2026-09-27 amendment (STATUS, not a new seed disposition):** the
seed predicted exactly the defect that was found — *"could the `R1` typed marker be produced by the shim
leg too (making `R1` vacuous)?"* — and the answer to the **as-filed** marker was **yes** (the shim defines
its own `window`/`document` surface; `typeof window` on the real boot is `'object'`). **The re-pinned §3.0
`R1` moves the discrimination onto the element/renderer-API provenance (`HTMLDivElement` /
`CSSStyleDeclaration` vs `ShimElement` + `measure=UNSUPPORTED`), which the shim cannot produce**, so the
row is no longer vacuous **as re-pinned**. **The seed is NOT retired:** its remaining runtime half — *does
a deliberately spoofed/mis-wired shim attempt ever make the re-pinned pair read as real?* — is still for
the owed adversarial pass, and `R1`'s fail state stays a **re-scope finding**.

## 3b. The adversarial pass's findings — disposition as THIS contract will reflect them

**Status: `OWED` (the same pass as §3a).** The table below is the **owed disposition table — the
shape the findings must land in**.

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
