# Green Scenarios — `U-GUTTER` (the node-local resize controller composed on the landed session + the exported pure `clampToBounds`) — **blind run**

**Status: `BLIND RUN (one pass) — 93 executed scenario rows: 87 PASS / 4 FAIL / 2 NOT-BLIND-RUNNABLE`.**

**No FAIL was converted, no row was softened, no row was re-scoped to reach a pass, and no
`NOT-BLIND-RUNNABLE` row was scored as a pass.** Every FAIL below is reported **verbatim, with its
expected/measured pair**, together with the pass's own verdict on whether it is **DOC/SPEC DRIFT** or an
**un-hardened REGRESSION** — and it is **never a pass**.

**This is `AGENTS.md` item 10a / `RCA-4`'s gate-5 blind-greens artifact for `U-GUTTER` (`E3`, wave E), the
`docs/specs/gutter.md` unit's green-scenario set, produced by an agent who did NOT write the
implementation.** The implementation was **imported as a black box**; the harness doubles, the drives and
the expectations were **authored from the documentation only**.

| | |
| --- | --- |
| **Unit** | `U-GUTTER` — the node-local resize controller composed on the landed session (`U-GSESSION`, `E6`, `DONE`) + the exported pure `clampToBounds` (ledger row **`E3`**, wave **E**; upstream `SCH-6` as ADOPTED-RESHAPED by `A-d4`) |
| **Gate** | **5 — the blind green-scenario pass** (`AGENTS.md` item 10a / `RCA-4`) |
| **Date (filing calendar)** | **2026-09-27**. The host clock reads **2026-09-26** (`date -u` → `Sat Sep 26 08:38:34 AM UTC 2026`) during this work — the same host-clock-vs-filing-calendar offset the sibling greens records carry (`docs/specs/gsession-greens.md`, `docs/specs/zones-greens.md`). **Cite the filing date.** |
| **Tree state (HEAD)** | **`69d17149fb36ad43590aabfa0854c288ad930a99`** (`69d1714` — `U-GUTTER (E3) gate 3 CLOSED record: … the module landed and 90/90 rows green …`, on `main`). |
| **Working tree** | **clean** before this pass (`git status --porcelain` → empty). After it: the **only** new file is **this artifact**; every other file this pass used lives **outside the repo** in `/tmp/gutter-greens/` (§9). |
| **Authored from** | **THE DOCUMENTATION ONLY.** `src/shared/gutter.ts` was **never opened, never read, never printed** — it was **imported as a black box** through an esbuild bundle built by the repo's own esbuild. `tests/gutter.test.ts` was **never read and never run** (no assertion, row id, fixture or message of it was inspected, and no count is quoted from it). |
| **Runner** | **`/tmp/gutter-greens/runner.mjs`** (93 scored rows) + 4 short-lived discovery/corroboration scripts + the two esbuild bundles + two `tsc` type probes — **all of them OUTSIDE the repo** (§9). |
| **Instruments** | the **real landed session** (`src/shared/gesture-session.ts`, imported black-box) driven through **a recording event source built in the runner**; **a recording session double authored from `gsession.md` §2.1/§2.3/§2.5**; **a counting sink**; **throwing stubs**; and a **read/`has`-recording `Proxy` session** for the read-set row. |

**Documents read to derive every scenario (and NOTHING else):**

1. **`docs/specs/gutter.md`** — the whole file: the `CURRENT STATE` block and its SIX dated `⟶ RECORDED`
   amendment blocks (the RED-RUN, ARCHITECT-RULING, CELL-CORRECTION, CELL-CORRECTION-II, ATTEMPT-READING and
   ESTABLISHMENT-SEAM passes), **§0** (the seventeen derived rulings) and **§0A** (notes 1–13), the Layer
   declaration and its five honesty anchors, **§1** (items 1–8), **§2.1** (the export census, the two value
   exports, the ten type declarations, the frozen `2 + 10 = 12` set, the five controller members and the
   seven-seam set), **§2.2** (P-1..P-11), **§2.3** (items 1–5: the value chain, the preview-channel rule,
   the `-0` rule and the holder-shape table, the evaluation order, the write-count clause with the
   attempt-versus-write counting rule and both positive controls, the release mapping and the reset clause
   with its nine clauses and the complete reset result-code table), **§2.4** (items 1–6: the seven named
   safe defaults, the totality universal with its stated bound, the four throw paths, the callability
   asymmetry, the `isResizable` per-shape counts, the seven-seam grid), **§2.5** (items 1–6: the frozen
   delegate table, the `U-CENSUS` sentence, the composition boundary, the pinned single-wiring, the reset
   entry point), **§2.6** (items 1–7), **§3.1** `M-1`..`M-20`, **§3.2** `F-1`..`F-19`, **§3.3** `I-1`..`I-15`,
   **§3.4** `R-1`..`R-15`, **§3.5** `R-16`..`R-18`, §4.1–§4.5 (incl. the thirteen stop conditions), **§5.1**
   (the allow-list and the DENIED set), **§5.2** (the four legs, the three-part `[U]` refusal, `[D]`,
   gate 6), **§5.3** (the eleven-item DONE-row shape), **§5.5**/**§5.5.1** (the thirteen-row register and
   the term-less `P-GT-SM-5` cell), **§5.5.2**, **§5.5.3**, §6, **§7** (items 1–15), **§7a**/**§7a.1**,
   **§8** (the citation index), **§3a** (the eighteen adversarial seeds) and **§3b**.
2. **`docs/specs/gutter-review.md`** — the closed gate-1 record in full: the twelve governing rulings,
   `C1`–`C5`, the must-not list and the provenance/citation notes.
3. **`docs/specs/gsession.md`** — **`§2.1`** (the frozen surface: `EventSource`, `GestureHandle`,
   `SessionOptions`, `GestureOptionsInput`, the session's own members and readings), **`§2.3`** (items 1–8:
   attachment, the gesture window, one gesture at a time, **the terminal table with its commit counts**,
   the commit-is-the-session's-call rule, the capture table, dispose, the four-state machine), **`§2.5`**
   (the eleven-item frozen delegate list) and **`§2.6`** (the seven sibling properties) — **the FROZEN
   surface this unit composes.**
4. **`docs/specs/gsession-greens.md`** and **`docs/specs/zones-greens.md`** — **house style only** (two
   different units); no scenario content was derived from them.
5. **`package.json`**, **`vitest.config.ts`**/**`tsconfig.json`**-free invocation flags, `AGENTS.md` — to
   construct a runnable runner and to state the layer.

**Files NOT read to derive any scenario's content — recorded so the blindness claim is exact:**

1. **`src/shared/gutter.ts` was never opened, never read, never printed.** It was **imported as a black
   box** (`await import('/tmp/gutter-greens/gutter.mjs')` — the bundle the repo's own
   `node_modules/.bin/esbuild` produced from `src/shared/gutter.ts`), and exercised **only** through the
   exported surface: `createResizeController`, `clampToBounds`, and the five controller members.
   **ONE EXCEPTION, DISCLOSED: `GT-G-80` runs a mechanical byte probe** (a regex count of `import`
   statement lines and of the module specifier) whose **only output is derived counts/booleans**; **no
   source line, no identifier of the implementation's body and no prose of the file was emitted or read by
   the author** — and `GT-G-81` scans `src/**` for *references to* the module, emitting only matching
   **file paths**.
2. **`tests/gutter.test.ts` was never read and never run.** It was not opened, and **no count, row id,
   assertion or fixture of it is quoted anywhere in this record**. This run's 93 rows are its own.
3. **No other `src/**` file was read.** `src/shared/gesture-session.ts` (the composed session) was
   **imported black-box** under the same rule as the docs describe it in full; no other module, no
   `src/main/**` and no `src/renderer/**` file was opened.
4. **No tracker was read to author a scenario** (`docs/next-steps.md`, `docs/pending.md`,
   `docs/decisions.md`, `docs/defects.md` and `docs/HANDOFF.md` were **not opened**); the two existence
   probes that touch repo state (`GT-G-82`/`GT-G-83`) read **`docs/skills/`**, **`scripts/`**,
   **`docs/specs/`'s file NAMES** and **`package.json`'s script names** — never a tracker cell.
5. **`node_modules/`** was used only as tooling (esbuild, tsc); **no engine file was read**, and
   `../Preempt-Providence/` was never touched.

---

## 1. Layer declaration — exactly what this run exercised and what it proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own esbuild bundle of the module, run under **node v24.20.0**, plus **fake recording session doubles / sources / sinks built inside the runner from the docs** | a browser; the assembled app; the engine |
| **[H]** | host-side | this unit's **own module**, imported as a black box — its documented surface only | engine-internal behaviour |
| **[S]** | static/structural | file/git probes the blind rule permits: existence probes, a name census of `src/**`, `scripts/`, `docs/skills/`, `docs/specs/`, `package.json`'s script names, and the two `tsc` type probes run in `/tmp` | a semantic source read of the module |
| **[U]** | real-DOM `ui` leg | **NOT OFFERED BY THE UNIT** (`§5.2`'s three-part refusal, verified present in the spec's own bytes at `GT-G-89`) — **not taken** | — |
| **[D]** | divergence harness | **NOT CLAIMED** — `PRECONDITION-GATED` on `U-DIVERGENCE-EXT` (`C2`); the extended deliverable does not exist (`GT-G-83`) — **not taken** | — |

**Honesty anchors, carried so no row over-reads its layer:**

1. **Every element, axis token, gesture handle, session, seam and sink in every row is an
   ARGUMENT-SUPPLIED OBJECT**, built inside the runner. **No DOM was touched: no `document`, no `window`,
   no real `Element`, no shim member, no pointer, no pointer event, no capture, no IPC and no MCP
   transport appears anywhere in this run.** The word "listener" below always means **a recorded
   `on`/`off` invocation on a fake source**, never a fact about a browser's listener table.
2. **This is `[T]` node-envelope evidence over argument-supplied objects — NOT assembled-app evidence.**
   A green here proves **the contract's call counts and one pure function's arithmetic**; it says
   **nothing** about a rendered pane, a pane's width, an applied CSS value, a layout pass, a pointer drag,
   a coordinate, or a click retarget.
3. **The module is imported by no `src/**` file (`GT-G-81`) and appears in none of the five bundles**, so
   **gate 6 is STRUCTURAL** — there is **no rendered surface to observe and nothing for a measuring leg to
   measure**.
4. **No rendered-geometry, coordinate, magnitude, layout, paint, applied-CSS or retargeting claim is made
   anywhere in this file, and none may be read out of it** — and **the module makes no property access of
   any kind on the element it is handed** (`GT-G-84`: a read/`has`/write-recording `Proxy` element records
   **zero** touches across an end, a reset and a detach).
5. **The `[U]` row was not taken and the `[D]` row was not claimed** — and **neither was silently moved**
   (`zones.md` `§4.4 S-6`'s sentence is carried in the spec's own refusal, `GT-G-89`).

---

## 2. Exact commands (as run — all from `/tmp/gutter-greens/`)

```bash
# 1. the two black-box bundles (the repo's own esbuild; the bundles live OUTSIDE the repo)
cd "/media/ryanr/Shared Files/Projects/Provident-Electron"
node_modules/.bin/esbuild src/shared/gutter.ts           --bundle --format=esm --platform=node --outfile=/tmp/gutter-greens/gutter.mjs
node_modules/.bin/esbuild src/shared/gesture-session.ts  --bundle --format=esm --platform=node --outfile=/tmp/gutter-greens/session.mjs

# 2. the 93 scored rows (each row prints PASS/FAIL/NBR + its expected and measured values)
node /tmp/gutter-greens/runner.mjs

# 3. the two BLIND type probes (a symlink /tmp/gutter-greens/tsc/src -> the repo's src/; nothing inside the repo is written)
cd /tmp/gutter-greens/tsc
"/media/ryanr/Shared Files/Projects/Provident-Electron/node_modules/.bin/tsc" \
  --strict --noEmit --target es2022 --module esnext --moduleResolution bundler --skipLibCheck probe10.ts      # the ten type names
  ... probe_extra.ts                                                                                          # ResizeCode / ResizeResetResult

# 4. the corroboration script (the dead-handle reset against the REAL session; the read-set and
#    registration-seam probes)
node /tmp/gutter-greens/corroborate.mjs

# 5. the state probes
git rev-parse HEAD ; git status --porcelain
```

**Runner / stack:** node **v24.20.0**; the repo's `esbuild ^0.28.2`; `typescript ^5.5.0`; `git HEAD`
**`69d1714`**. **No vitest run was made** — this pass **did not run the unit's own test file** and quotes
**no** count from it.

---

## 3. Run counts (the run's arithmetic)

| # | What | Verbatim result |
| --- | --- | --- |
| 1 | the scenario set, **final run** (`node /tmp/gutter-greens/runner.mjs`) | **`SUMMARY {"scenarios":93,"pass":87,"fail":4,"nbr":2}`** — failing ids **`GT-G-5` · `GT-G-66` · `GT-G-93` · `GT-G-94`**; not-blind-runnable ids **`GT-G-67` · `GT-G-92`** |
| 2 | the raw record | **`/tmp/gutter-greens/results.json`** (the 93 rows with their clauses, expectations and measured values) — outside the repo |
| 3 | the type presence probe (`probe10.ts`) | `tsc` **exit 0**, **zero diagnostics** — all **ten** type names import as types |
| 4 | the census negative control (`probe_extra.ts`) | `tsc` **exit 2**, **`TS2459` × 2**: `ResizeCode` and `ResizeResetResult` are **declared locally, not exported** |
| 5 | the byte probe (`GT-G-80`) | **one** `import` statement line, **`import type`**, specifier **`./gesture-session.js`**, **one** `from '…'` specifier in the whole file |
| 6 | the import-graph probe (`GT-G-81`) | **zero** `src/**` files referencing the module |
| 7 | the runtime export census (`GT-G-77`) | namespace keys exactly **`["clampToBounds","createResizeController"]`**; positive control (a third value export) **fails the row** |
| 8 | the working tree | **clean at HEAD**, and the only new file after the pass is **this artifact** |

**The row arithmetic, so it closes — 93 scored rows = 87 PASS + 4 FAIL + 2 NOT-BLIND-RUNNABLE:**

| Group | Ids | Rows | PASS | FAIL | NBR |
| --- | --- | --- | --- | --- | --- |
| A. the clamp (totality, fail-state table, holder domain, purity) | `GT-G-1`..`GT-G-17` | 17 | 16 | **1** | 0 |
| B. the seven named safe defaults (+ the totality/factory rows) | `GT-G-19`..`GT-G-30` | 12 | 12 | 0 | 0 |
| C. the callability asymmetry + the four throw paths | `GT-G-31`..`GT-G-38` | 8 | 8 | 0 | 0 |
| D. the single-writer / write-count discipline | `GT-G-39`..`GT-G-49` | 11 | 11 | 0 | 0 |
| E. the release mapping | `GT-G-50`..`GT-G-55` | 6 | 6 | 0 | 0 |
| F. the reset entry point's refusals | `GT-G-56`..`GT-G-67` | 12 | 10 | **1** | **1** |
| G. `attach` / `detach` / repeat-attach / the inert surface | `GT-G-68`..`GT-G-76` | 9 | 9 | 0 | 0 |
| H. census, static/existence probes, the layer refusals | `GT-G-77`..`GT-G-94` | 18 | 15 | **2** | **1** |
| **total** | | **93** | **87** | **4** | **2** |

**Note so the id sequence is not read as drift:** `GT-G-18` does not exist — the eighteenth slot was folded
into `GT-G-19`'s drive (the factory's totality is asserted there for both the `undefined`-session and the
no-argument shapes); no scenario was dropped, and the ids are otherwise contiguous.

---

## 4. The scenarios — 93 rows, each with its clause, its verdict and the measured value

Every row below was **authored from the docs before the module was touched** (the runner is the record).
The measured column is the **live module's own answer**, printed by the runner.

#### A. The clamp — totality and its enumerated fail-state table

| id | clause it derives from | verdict | measured value (the live module) |
| --- | --- | --- | --- |
| `GT-G-1` | §3.2 F-1 / §2.3 item 2 / ruling 12 — a NON-NUMBER value answers NaN | **PASS** | non-NaN answers: [] |
| `GT-G-2` | §3.2 F-2 — NaN as the value answers NaN | **PASS** | NaN |
| `GT-G-3` | §3.2 F-3 — a non-finite VALUE reaches the formula verbatim | **PASS** | 100 then 0 |
| `GT-G-4` | §3.2 F-4 — a finite negative value clamps to min | **PASS** | 0 and 0 |
| `GT-G-5` | §3.2 F-5 third drive + §2.3 item 2's `-0` case-2 rule — `{min:-0,max:100}` driven with `value = 42` ⇒ `-0` | **FAIL** | a=-0 b=42 c=0 |
| `GT-G-6` | §3.2 F-6 — equal bounds answer the value | **PASS** | 7 then 7 |
| `GT-G-7` | §3.2 F-7 — INVERTED bounds answer min in every drive | **PASS** | [100,100,100] |
| `GT-G-8` | §3.2 F-8 — an UNUSABLE/UNREADABLE bounds pair answers NaN, no throw escapes | **PASS** | non-NaN: []; threw: null |
| `GT-G-9` | §3.2 F-8 tail — a number-typed non-finite bound pair is answered by the formula verbatim | **PASS** | 42 |
| `GT-G-10` | §2.3 item 2 holder table / P-GT-PU-3 shape (5) — a `Map` holder is OUT of the domain (NaN in every drive) | **PASS** | ["NaN","NaN","NaN"] |
| `GT-G-11` | §2.3 item 2 holder table — an OWN-ACCESSOR record behaves exactly like its data twin | **PASS** | [[100,100],[0,0],[42,42]] |
| `GT-G-12` | §2.3 item 2 holder table / I-12 — a FROZEN record behaves like its unfrozen twin and stays frozen | **PASS** | 42 vs 42; frozen after = true |
| `GT-G-13` | §3.2 F-8 — a THROWING bound-field read answers NaN with no escaping throw | **PASS** | "NaN" (threw: null) |
| `GT-G-14` | §3.3 I-1 / §0A note 8 — TOTALITY: a number for every hostile input, never a throw | **PASS** | drives=154; non-number=null; threw=null |
| `GT-G-15` | §4.4 S-PURE-1 / F-1 — NO coercion: a numeric string is NOT parsed | **PASS** | NaN, NaN, NaN |
| `GT-G-16` | §3.1 M-19 / §3.3 I-12 — PURITY: equal repeats, untouched arguments, no memo | **PASS** | 42,42,42; snapshot identical=true |
| `GT-G-17` | §3.1 M-2 — the formula verbatim: 150->100, -5->0, 42->42 | **PASS** | [100,0,42] |

#### B. The seven seams' named safe defaults

| id | clause it derives from | verdict | measured value (the live module) |
| --- | --- | --- | --- |
| `GT-G-19` | §0A note 9 / §3.2 F-16 — an ABSENT session yields a VALID but INERT controller | **PASS** | {"undefinedSession":{"keys":["attach","detach","detached","reset","stats"],"detached":false,"attach":false,"reset":{"ok":false,"code":"no-gesture","committed":false},"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"detachedAfter":false},"noArgument":{"keys":["attach","detach","detached","reset","stats"],"detached":false,"attach":false,"reset":{"ok":false,"code":"no-gesture","committed":false},"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"detachedAfter":false},"throws":[null,null]} |
| `GT-G-20` | §3.2 F-16 — a NON-OBJECT session (42, 'x', null) yields the inert controller, no throw | **PASS** | {"measured":[{"attach":false,"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}},{"attach":false,"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}},{"attach":false,"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}}],"threw":null} |
| `GT-G-21` | §3.2 F-16 group C variants (3)/(4) — non-callable members, a throwing accessor, a frozen record and a trap-throwing Proxy all degrade to the inert controller | **PASS** | {"measured":{"nonCallableMembers":{"attach":false,"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"reset":{"ok":false,"code":"no-gesture","committed":false},"detached":false},"throwingAccessor":{"attach":false,"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"reset":{"ok":false,"code":"no-gesture","committed":false},"detached":false},"frozenEmpty":{"attach":false,"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"reset":{"ok":false,"code":"no-gesture","committed":false},"detached":false},"trapProxy":{"attach":false,"detach":false,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"reset":{"ok":false,"code":"no-gesture","committed":false},"detached":false}},"threw":null} |
| `GT-G-22` | §2.4 item 1 (axisFor) / §2.2 P-5 — an ABSENT axisFor: the token is `undefined`, passed on opaquely | **PASS** | {"seen":[["size","undefined"],["bounds","undefined"]],"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":0,"lastCode":"ok"}} |
| `GT-G-23` | §2.4 item 1 (axisFor) — a PRESENT NON-CALLABLE axisFor yields `undefined` with no throw | **PASS** | {"seen":["undefined"],"threw":null,"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":0,"lastCode":"ok"}} |
| `GT-G-24` | §3.2 F-18(a) / C2 path 1 — a THROWING axisFor is SWALLOWED: the token is undefined and the gesture ESTABLISHES | **PASS** | {"seen":["undefined"],"threw":null,"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":0,"lastCode":"ok"}} |
| `GT-G-25` | §2.4 item 1 (boundsFor) — an ABSENT boundsFor leaves the clamp at NaN ⇒ NO SINK WRITE | **PASS** | {"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"sink":[],"terminal":{"ok":true,"code":"ok","committed":true}} |
| `GT-G-26` | §2.4 item 1 (defaultSizeFor) / §3.2 F-12 — an ABSENT default refuses the reset with ZERO session calls | **PASS** | {"r":{"ok":false,"code":"unusable-default","committed":false},"sessionCallsAfter":[],"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"unusable-default"}} |
| `GT-G-27` | §2.4 item 1 (isResizable) / §3.1 M-8 — an ABSENT isResizable: NOT RESIZABLE, the gesture still establishes and terminates with zero writes | **PASS** | {"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"ran":["onEnd"],"sessionGestures":1} |
| `GT-G-28` | §2.4 item 1 (sizeFor) — an ABSENT sizeFor gives sinkCalls 0 AND IT IS NOT A CANCEL | **PASS** | {"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"ran":["onEnd"]} |
| `GT-G-29` | §3.2 F-10 + C1's sentence — the SLOT-EMPTY composition writes 0 times WHILE THE SESSION REPORTS committed:true | **PASS** | {"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"sessionTerminal":{"ok":true,"code":"ok","committed":true},"sessionOwnChannelCalls":1} |
| `GT-G-30` | §3.2 F-11 / §2.4 item 1 (commit) — a THROWING sink is SWALLOWED: counted once, never retried | **PASS** | {"threw":null,"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":0,"resets":0,"lastCode":"ok"}} |

#### C. The callability asymmetry

| id | clause it derives from | verdict | measured value (the live module) |
| --- | --- | --- | --- |
| `GT-G-31` | §2.4 item 2 asymmetry (i) — a PRESENT NON-CALLABLE boundsFor is NEVER INVOKED, nothing propagates, 0 writes | **PASS** | {"threw":null,"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"sink":[]} |
| `GT-G-32` | §2.4 item 2 asymmetry (i) — a PRESENT NON-CALLABLE sizeFor is NEVER INVOKED, nothing propagates, 0 writes | **PASS** | {"threw":null,"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}} |
| `GT-G-33` | §2.4 item 2 asymmetry (ii) / §2.4 item 5 shape (2) — a PRESENT NON-CALLABLE isResizable is REACHED with its TypeError SWALLOWED | **PASS** | {"threw":null,"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"terminal":{"ok":true,"code":"ok","committed":true}} |
| `GT-G-34` | §2.4 item 2 asymmetry (iii) / §3.2 F-17 DRIVE 1 — a CALLABLE boundsFor that THROWS at the terminal PROPAGATES | **PASS** | {"threw":"bounds boom","stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}} |
| `GT-G-35` | §2.4 item 2 asymmetry (iii) / §3.2 F-17 DRIVE 1 — a CALLABLE sizeFor that THROWS at the terminal PROPAGATES with 0 writes | **PASS** | {"threw":"size boom","stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}} |
| `GT-G-36` | §3.2 F-17 DRIVE 2 — after the throwing terminal the gesture is IDLE (not busy) and a NEW gesture establishes and ends (its own fire) | **PASS** | {"firstThrew":"boom","idleAfter":true,"secondThrew":null,"stats":{"attached":1,"gestures":2,"sinkCalls":1,"written":1,"resets":0,"lastCode":"ok"},"sink":[["end",7]]} |
| `GT-G-37` | §3.2 F-18(b) / C2 path 2 — a THROWING isResizable is SWALLOWED: establishes, not busy, 0 writes, the terminal is an END | **PASS** | {"threw":null,"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"ran":["onEnd"]} |
| `GT-G-38` | §3.1 M-17 / C2 path 3 — a THROWING defaultSizeFor is SWALLOWED: the refusal is INERT and the active gesture is untouched | **PASS** | {"r":{"ok":false,"code":"unusable-default","committed":false},"threw":null,"defaultCalls":1,"boundsCalls":1,"sessionCalls":["install"],"idBefore":1,"valBefore":777,"stillActive":true,"handleSame":true,"term":{"ok":true,"code":"ok","committed":true},"sink":[["end",7]]} |

#### D. The single-writer / write-count discipline

| id | clause it derives from | verdict | measured value (the live module) |
| --- | --- | --- | --- |
| `GT-G-39` | §3.1 M-5 / §2.3 item 3 — an `end` writes EXACTLY ONCE with the CLAMPED value | **PASS** | {"sink":[["end",0.3]],"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":0,"lastCode":"ok"}} |
| `GT-G-40` | §3.1 M-5 second half — the sink receives the CLAMPED value, never the raw seam value | **PASS** | [["end",50]] |
| `GT-G-41` | §3.1 M-6 / §1 item 2 — the value is CONSUMER-PRODUCED: onMove sets 777 and sizeFor reads gesture.value | **PASS** | {"readAtSeam":777,"sink":[["end",777]]} |
| `GT-G-42` | §3.1 M-4 / §2.6 item 2 — a `cancel` writes nothing and the sink callback is NEVER invoked | **PASS** | {"sink":[],"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"ran":["onCancel"]} |
| `GT-G-43` | §0A note 6 / ruling 10 / §3.1 M-8 — `isResizable === false` establishes and terminates NORMALLY with ZERO writes | **PASS** | {"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"},"counts":{"axisCalls":1,"isrCalls":1,"sizeCalls":0,"boundsCalls":0,"defaultCalls":0},"ran":["onEnd"]} |
| `GT-G-44` | §2.6 item 4b / I-2b — the consumer-owned PREVIEW channel is NEVER the sink | **PASS** | {"preview":[7,7,"revert"],"sink":[]} |
| `GT-G-45` | §3.2 F-9 / F-19 / §3.4 R-13 — THE TWO-WRITER DIVERGENCE (failure limb): sink record 2 vs controller counter 1 | **PASS** | {"sinkRecordLength":2,"controllerCounter":1,"record":[["end",7],["end",7]]} |
| `GT-G-46` | §3.2 F-10 / C1 — the NO-WRITER (slot-empty) composition MUST FAIL the one-write row | **PASS** | {"writes":0,"sessionTerminal":{"ok":true,"code":"ok","committed":true}} |
| `GT-G-47` | §3.3 I-2 — for EVERY gesture the write record has length ≤ 1 (end + cancel + non-resizable end + reset) | **PASS** | {"afterEnd":1,"afterCancel":1,"afterNonResizable":1,"afterReset":2,"resetResult":{"ok":true,"code":"ok","committed":true},"stats":{"attached":1,"gestures":4,"sinkCalls":2,"written":2,"resets":1,"lastCode":"ok"},"record":[["end",7],["reset",100]]} |
| `GT-G-48` | §2.3 item 3 — NO OTHER WRITE CHANNEL: nothing is written from onStart/onMove (mid-gesture the sink record is empty) | **PASS** | {"mid":0,"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}} |
| `GT-G-49` | §3.3 I-3 / §2.5 item 1 / §3.4 R-14 — the composition NEVER calls session.begin/end/cancel | **PASS** | {"names":["install","reset","dispose"],"forbidden":[]} |

#### E. The release mapping (`end` vs `reset` vs a right-click-style `cancel`)

| id | clause it derives from | verdict | measured value (the live module) |
| --- | --- | --- | --- |
| `GT-G-50` | §2.3 item 4 release mapping — a VALID dragged state reaches `end` and commits the CLAMPED DRAGGED VALUE once | **PASS** | {"sink":[["end",100]],"term":{"ok":true,"code":"ok","committed":true},"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":0,"lastCode":"ok"}} |
| `GT-G-51` | §3.1 M-14 / M-15 — the reset (INVALID release) commits the CLAMPED supplied default ONCE with outcome `reset` | **PASS** | {"sink":[["reset",100]],"r":{"ok":true,"code":"ok","committed":true},"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":1,"lastCode":"ok"}} |
| `GT-G-52` | §2.5 item 5 clause 5 — the committed value is the CLAMPED default, never the raw default, never the user value | **PASS** | {"sessionResetValue":[100],"sink":[["reset",100]],"r":{"ok":true,"code":"ok","committed":true}} |
| `GT-G-53` | §2.3 item 4 release mapping — a RIGHT-CLICK / DROP (`cancel`) yields ZERO commits and ZERO sink writes | **PASS** | {"sink":[],"term":{"committed":false,"code":"ok","ok":true},"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}} |
| `GT-G-54` | §2.3 item 4 clause 7 / gsession §2.5 item 10 — `gesture.outcome` is the discriminator the sink reads | **PASS** | ["end","reset"] |
| `GT-G-55` | §3.1 M-14 — exactly ONE `session.reset` call carrying the CAPTURED handle and the clamped value | **PASS** | {"resetCallCount":1,"handleIdentity":true,"elementIdentity":true,"value":100,"r":{"ok":true,"code":"ok","committed":true},"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":1,"lastCode":"ok"}} |

#### F. The reset entry point's refusals

| id | clause it derives from | verdict | measured value (the live module) |
| --- | --- | --- | --- |
| `GT-G-56` | §3.1 M-16 / §2.3 item 4 clause 5 — reset with NO active gesture refuses `no-gesture` with ZERO SESSION CALLS | **PASS** | {"r":{"ok":false,"code":"no-gesture","committed":false},"callsAfter":[],"defaultCalls":0,"neverAttached":{"ok":false,"code":"no-gesture","committed":false},"stats":{"attached":1,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"no-gesture"}} |
| `GT-G-57` | §3.2 F-12 — a reset whose default is ABSENT refuses `unusable-default` with ZERO session calls and ZERO writes | **PASS** | {"r":{"ok":false,"code":"unusable-default","committed":false},"sessionCalls":[],"sink":[],"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"unusable-default"}} |
| `GT-G-58` | §3.2 F-12 (throwing limb) — a THROWING default refuses `unusable-default` with ZERO session calls and boundsFor NOT called | **PASS** | {"r":{"ok":false,"code":"unusable-default","committed":false},"threw":null,"sessionCalls":[],"boundsCalls":0,"sink":[]} |
| `GT-G-59` | §3.2 F-13 / §2.3 item 4 clause 2 — an established NON-RESIZABLE reset refuses the CONTROLLER-LOCAL `not-resizable` with ZERO session calls | **PASS** | {"r":{"ok":false,"code":"not-resizable","committed":false},"sessionCalls":[],"defaultCalls":0,"sink":[],"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":0,"lastCode":"not-resizable"}} |
| `GT-G-60` | §3.2 F-14 / §2.3 item 4 clause 3 — an unusable BOUNDS pair calls `session.reset` EXACTLY ONCE with NaN and does NOT write the sink | **PASS** | {"resetCalls":1,"resetValue":"NaN","controllerResult":{"ok":false,"code":"ok","committed":false},"sessionTerminal":{"ok":true,"code":"ok","committed":true},"sink":[],"stats":{"attached":1,"gestures":1,"sinkCalls":0,"written":0,"resets":1,"lastCode":"ok"}} |
| `GT-G-61` | §3.2 F-15 / §2.5 item 5 clause 6 — a reset on a DISPOSED session propagates the session's own `disposed` VERBATIM | **PASS** | {"r":{"ok":false,"code":"disposed","committed":false},"sink":[]} |
| `GT-G-62` | §3.4 R-15 / §2.3 item 4 table — the session's refusal codes propagate VERBATIM | **PASS** | {"not-installed":{"ok":false,"code":"not-installed","committed":false},"busy":{"ok":false,"code":"busy","committed":false},"disconnected":{"ok":false,"code":"disconnected","committed":false},"stale":{"ok":false,"code":"stale","committed":false}} |
| `GT-G-63` | §2.5 item 5 clause 9 / M-17 — a REFUSED reset changes NOTHING: same handle, same id, same value | **PASS** | {"r":{"ok":false,"code":"unusable-default","committed":false},"stillActive":true,"handleSame":true,"id":1,"value":4242} |
| `GT-G-64` | §2.4 item 4 / §4.4 S-11 — neither controller-local code is EVER passed INTO the session | **PASS** | {"leaked":[],"d1Calls":["install"],"d2Calls":["install"]} |
| `GT-G-65` | §2.1 ResizeStats.lastCode — every reset path reports its code through `stats().lastCode` | **PASS** | {"noGesture":{"ok":false,"code":"no-gesture","committed":false},"lc1":"no-gesture","unusable":{"ok":false,"code":"unusable-default","committed":false},"lc2":"unusable-default"} |
| `GT-G-66` | §2.5 item 5 clause 2 / §2.5 item 6 — a reset after a completed terminal finds NO handle and refuses | **FAIL** | {"r":{"ok":false,"code":"stale","committed":false},"sessionCalls":["reset"],"resetArgs":[{"elementIsTheControl":true,"handleIsTheDeadGestureHandle":true,"value":"100"}],"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":1,"lastCode":"stale"}} |
| `GT-G-67` | §5.5.1 P-GT-SM-4 / §2.5 item 5 clause 2 — reset with an ESTABLISHED gesture but NO move (the handle channel): the docs pin no code | **NOT-BLIND-RUNNABLE** | {"code":"no-gesture","ok":false,"committed":false,"sessionResetCalls":0,"sessionSawAnActiveGesture":1} — reason: The docs pin the handle channel (onMove is the ONLY legal one, no synthesis) and pin the refusal ONLY for "no active gesture"; the code for an ESTABLISHED-but-handle-less reset is not pinned. Measured for the record only. |

#### G. `attach` / `detach`, the repeat-attach rule, and the inert-controller surface

| id | clause it derives from | verdict | measured value (the live module) |
| --- | --- | --- | --- |
| `GT-G-68` | §3.1 M-1 / R-10 — attach delegates EXACTLY ONCE with the four hooks and NO `capture` (with the positive control) | **PASS** | {"installs":1,"sameElement":true,"keys":["onCancel","onEnd","onMove","onStart"],"capturePresent":false,"ret":true,"positiveControlPasses":false} |
| `GT-G-69` | §3.1 M-12 / §2.3 item 5 — a REPEAT attach delegates NOTHING and the FIRST config stays in force | **PASS** | {"r1":true,"r2":false,"installs":1,"repeatSessionCalls":0,"ran":["firstStart","first"],"attached":1} |
| `GT-G-70` | §2.1 item 3 — attach(null) / attach(undefined) return false with NO session call | **PASS** | {"a":false,"b":false,"installs":0,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}} |
| `GT-G-71` | §2.1 item 3 — attach on a session the session itself reports DISPOSED returns false with no ledger entry | **PASS** | {"r":false,"installCallMadeByTheComposition":1,"stats":{"attached":0,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}} |
| `GT-G-72` | §3.1 M-10 / ruling 10 — `isResizable` is NEVER an install-time gate | **PASS** | {"r1":true,"r2":true,"isrCalls":0,"installs":2,"stats":{"attached":2,"gestures":0,"sinkCalls":0,"written":0,"resets":0,"lastCode":"ok"}} |
| `GT-G-73` | §3.1 M-13 — detach() restores the baseline once, is idempotent, and `detached` reads true forever | **PASS** | {"r1":true,"r2":false,"disposesAfterFirst":1,"repeatSessionCalls":[],"detached":true} |
| `GT-G-74` | §3.1 M-20 / §5.5.1 P-GT-SM-5 — detach()'s MULTI-ELEMENT limb refuses with ZERO session calls | **PASS** | {"r1":false,"sessionCalls":[],"r2":false,"attached":2,"detached":false,"controlDrive":{"ret":true,"disposes":1}} |
| `GT-G-75` | §2.1 item 4 — detach() returns true IFF the session reported `complete === true` | **PASS** | {"r":false,"detached":true,"disposes":1} |
| `GT-G-76` | §2.1 item 3 / §2.2 P-7 / R-10 — the composition NEVER OPTS IN TO CAPTURE (inherited and observed) | **PASS** | {"captureCalls":0,"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":0,"lastCode":"ok"}} |

#### H. Census, static/existence probes, and the layer refusals

| id | clause it derives from | verdict | measured value (the live module) |
| --- | --- | --- | --- |
| `GT-G-77` | §2.1 export census (a) / §3.4 R-5(a) — the value exports are EXACTLY `createResizeController` and `clampToBounds` (with the positive control) | **PASS** | {"keys":["clampToBounds","createResizeController"],"positiveControlPasses":false} |
| `GT-G-78` | §2.1 export census (b) / §5.2 leg 4 — the TEN type declarations are importable as types (standalone strict tsc, run blind in /tmp) | **PASS** | exit=0; diagnostics=[] |
| `GT-G-79` | §2.1's census ruling / §3.4 R-5 — `ResizeCode` and `ResizeResetResult` are NON-EXPORTED (the census's negative control) | **PASS** | exit=2; ["probe_extra.ts(1,15): error TS2459: Module '\"./src/shared/gutter.js\"' declares 'ResizeCode' locally, but it is not exported.","probe_extra.ts(1,27): error TS2459: Module '\"./src/shared/gutter.js\"' declares 'ResizeResetResult' locally, but it is not exported."] |
| `GT-G-80` | §0A note 2 / §3.4 R-4 — EXACTLY ONE import statement, TYPE-ONLY, from the session module (mechanical byte probe: only derived counts emitted) | **PASS** | {"importStatementLines":1,"typeOnlyLines":1,"specifiers":["./gesture-session.js"]} |
| `GT-G-81` | §3.4 R-6 / R-12 / §3.5 R-16 green branch / §5.2 gate 6 — the module is imported by NO `src/**` file | **PASS** | {"importersOrReferences":[]} |
| `GT-G-82` | §3.5 R-9 — the page-design skill DOES NOT EXIST (no coverage matrix / demo-page entry is owed) | **PASS** | {"exists":false,"skills":["process-guardrails.md"]} |
| `GT-G-83` | §3.5 R-17 / §5.2 — the EXTENDED divergence harness is absent, so NO `[D]` row is runnable | **PASS** | {"divergenceScripts":["divergence"],"extendedHarnessNamesFound":[]} |
| `GT-G-84` | §3.4 R-11 / R-8 runtime half — a WRITE-RECORDING element: the module makes NO property read or write on it | **PASS** | {"touches":[]} |
| `GT-G-85` | §2.1 item 4 / §2.2 P-1 / C3 — the controller carries EXACTLY FIVE members and an eighth option member cannot smuggle a policy default in | **PASS** | {"keys":["attach","detach","detached","reset","stats"],"installKeys":["onStart","onMove","onEnd","onCancel"],"captureOnInstall":false} |
| `GT-G-86` | §3.1 M-3 / §2.3 item 2 — the seam ORDER with the token passed BY IDENTITY | **PASS** | {"named":["axisFor","isResizable","sizeFor","boundsFor","sink"],"identities":[true,true,true]} |
| `GT-G-87` | §3.1 M-7 / §3.3 I-5 — the TOKEN IS OPAQUE: object / string / undefined tokens behave identically | **PASS** | {"a":{"emitted":[7],"established":1,"tokenIdentity":true},"b":{"emitted":[7],"established":1,"tokenIdentity":true},"c":{"emitted":[7],"established":1,"tokenIdentity":true}} |
| `GT-G-88` | §3.1 M-11 / §3.3 I-9 — TWO GESTURES ARE TWO GESTURES: the token and the decision are re-derived, nothing carries | **PASS** | {"axisCalls":2,"isrCalls":2,"sink":[["end",7]],"stats":{"attached":1,"gestures":2,"sinkCalls":1,"written":1,"resets":0,"lastCode":"ok"}} |
| `GT-G-89` | §5.2 — the `[U]` refusal is THREE-PART in the spec's own bytes, and gate 6 is STRUCTURAL | **PASS** | {"refusal":true,"structuralReason":true,"zonesS6":true,"gate6Structural":true} |
| `GT-G-90` | §5.5.1 P-GT-PU-1 / §2.3 item 2 — the clamp is TOTAL over the row's class structure (value classes + bounds classes + the cross-product subset) | **PASS** | {"count":48,"nonNumber":[],"threw":null} |
| `GT-G-91` | §2.3 item 3 / §5.5.1 P-GT-SM-3 — for the correct composition the two recorded readings AGREE at 1 | **PASS** | {"sinkRecordLength":1,"controllerCounter":1,"sessionOwnChannelCalls":1} |
| `GT-G-92` | §2.5 item 4 — THE SESSION'S `commit` OPTION HAS EXACTLY ONE WIRING, pinned in the session's own words | **NOT-BLIND-RUNNABLE** | see GT-G-93 (the read-set probe) and GT-G-91 (the two readings) — reason: The property is pinned but the SEAM is not: neither §2.5 item 4 nor the frozen delegate list (gsession.md §2.5) names any member by which THIS composition could wire the session's `commit` option, and the controller may call only install/reset/dispose. A blind drive of the wiring is therefore not constructible from the docs. BLACK-BOX MEASUREMENT, recorded for the record: the landed module invokes its sink from the terminal hook it installs (one call per `end`/`reset`, zero on a cancel) and, when the session object EXPOSES a `registerCompositionWriter` member, it calls that member once at attach with a function (the landed session exposes none); and (iii) under such a session the composition ALSO still writes from its terminal hook, so a session that invoked the registered writer would produce TWO sink calls for one gesture (measured sink record 2) — the single-writer discipline holds only because the landed session has no such seam. |
| `GT-G-93` | §3.4 R-7 / §2.5 item 1 / §3.3 I-8 — THE CLOSED READ SET: the only session member names read are `install`,`reset`,`dispose`,`stats`,`gesture`,`disposed` | **FAIL** | {"readNames":["install","reset","dispose","stats","gesture","registerCompositionWriter","registerCommit"],"outsideTheClosedSet":["registerCompositionWriter","registerCommit"]} |
| `GT-G-94` | §2.1 item 4 (`detached`) — `detached` reads TRUE once the session reads `disposed === true` | **FAIL** | {"detachedBeforeAnyDetach":false,"detachedAfterAttach":false} |

---

## 5. The four FAILs, verbatim — with the expected/measured pair and the drift-vs-regression verdict

**Each FAIL below is a finding. Each was re-derived from the doc's own words a second time, and two of the
four were re-measured with a SECOND instrument (the real landed session beside the recording double)
before being reported.**

### FAIL 1 — `GT-G-5` · `§3.2 F-5`'s third drive + `§2.3` item 2's `-0` case-2 rule

| | |
| --- | --- |
| **Derived from** | `§2.3` item 2's dated `-0` ruling block, case `2`: *"the `min` operand is `-0` AND `value` is not BELOW it — then `Math.min(value, max)` is ≥ `-0` and the answer is `min` itself, `-0`"*; and `§3.2 F-5`: *"the third drive is the same rule's `min`-operand case, **`{min: -0, max: 100}` with `value = 42` ⇒ `-0`**"* |
| **Drive** | `clampToBounds(-0, {min:-0,max:100})` · `clampToBounds(42, {min:-0,max:100})` · `clampToBounds(-0, {min:0,max:100})` |
| **Expected** | `a = -0` (F-5's first drive) · **`b = -0`** (F-5's third drive) · `c = +0` |
| **Measured** | **`a = -0` · `b = 42` · `c = +0`** (`Object.is(a,-0) === true`, `Object.is(c,0) === true`; the `b`-limb is `42`) |
| **Verdict** | **DOC DRIFT — the doc is wrong, and the module is right.** The spec's **own** `§2.3` item 2 pins the mechanism as *"the FORMULA VERBATIM: `Math.max(min, Math.min(value, max))`"* and says *"`-0` is PRESERVED when it is the formula's answer"*. `Math.max(-0, Math.min(42, 100))` is `Math.max(-0, 42)` = **`42`**, so the case-2 rule's inference (*"the answer is `min` itself, `-0`"*) is false as written: case 2 holds **only when the `min` operand is also the answer**, i.e. when `value ≤ min`. **The module returns the formula's answer; the row's declared answer contradicts the same section's formula.** Remedy: **correct `§2.3` item 2's case-2 rule and `§3.2 F-5`'s third drive** (drive a `value ≤ min`, e.g. `-0` or a below-range value, if a second `-0`-preserving limb is wanted) — **no module change is implied.** No attempt term, register cell or count moves for it. |

### FAIL 2 — `GT-G-66` · `§2.5` item 6 + `§2.5` item 5 clause 3

| | |
| --- | --- |
| **Derived from** | `§2.5` item 6: *"The controller clears its per-gesture record at the terminal — inside the same sink callback — so **a later `reset(element)` cannot reach for a dead handle**"*; `§2.5` item 5 clause 3: *"No active gesture ⇒ refuse `'no-gesture'` with **ZERO session calls**"*; `§3.3 I-9`: *"NOTHING CARRIES ACROSS A GESTURE … the handle … is DISCARDED at every terminal"* |
| **Drive** | double: `attach(el)` + consumer `onMove` → `begin` → `move` → **`end`** (the composition's own terminal, which WROTE: `sinkCalls 1`) → then **`controller.reset(el)`** |
| **Expected** | a refusal record with **zero session calls** (no dead handle is reached for) |
| **Measured** | **`{"r":{"ok":false,"code":"stale","committed":false},"sessionCalls":["reset"],"resetArgs":[{"elementIsTheControl":true,"handleIsTheDeadGestureHandle":true,"value":"100"}],"stats":{"attached":1,"gestures":1,"sinkCalls":1,"written":1,"resets":1,"lastCode":"stale"}}`** — i.e. **ONE `session.reset` call, carrying the DEAD gesture handle by identity and the clamped default `100`**, refused by the session with `'stale'` |
| **Second instrument** (the REAL landed session, `corroborate.mjs`) | after the same lifecycle, `controller.reset(el)` returned `{ok:false, code:'no-gesture', committed:false}` **and the session's own `stats().lastCode` moved `'ok'` → `'no-gesture'`** — a terminal call **did reach** the session (a locally-refused reset would have left the session's `lastCode` at `'ok'`) |
| **Verdict** | **REGRESSION — the module is wrong (un-hardened).** The per-gesture record is **not discarded at the composition's own terminal**, so a later `reset(element)` reaches for a dead handle — exactly the state `§2.5` item 6, `§3.3 I-9` and clause 3's ZERO-session-call rule declare impossible. The **code** it returns is within the doc's domain (the session's own answers: `'no-gesture'` on the real session, `'stale'` on the double — `§2.3` item 4's table allows both for *"a stale/absent handle"*); **the violated half is the CALL COUNT and the retained handle.** Note honestly: `§2.3` item 4's code table's row 7 (`'stale'` for *"a handle the session no longer honours"*) shows the code is legitimate on a DIFFERENT path — a gesture terminated outside the composition (a session-level cancel/disconnect while the composition still holds a live handle) — so the fix must clear the record **at the composition's own observed terminal** without disabling that propagation. |

### FAIL 3 — `GT-G-93` · `§3.4 R-7` + `§2.5` item 1 + `§3.3 I-8` (the closed session read set)

| | |
| --- | --- |
| **Derived from** | `§3.4 R-7`: *"Over the MODULE's source, the ONLY member names READ FROM the session object are `install`, `reset`, `dispose`, `stats`, `gesture` and `disposed`"*; `§2.5` item 1's table (*"AND IT MAY CALL NOTHING ELSE ON THE SESSION"*); `§3.3 I-8`: *"THE COMPOSITION BOUNDARY IS A CLOSED SET"* |
| **Drive** | a `Proxy` session recording **every** `get`/`has`/`ownKeys`/`getOwnPropertyDescriptor` name, driven through `attach` → `stats` → `reset` → `detach` → `stats`, **plus** a second proxy whose `disposed` getter returns `true` (driven through `attach` → `reset` → `detach`) |
| **Expected** | the read set closed at the **six** documented names |
| **Measured** | **`{"readNames":["install","reset","dispose","stats","gesture","registerCompositionWriter","registerCommit"],"outsideTheClosedSet":["registerCompositionWriter","registerCommit"]}`** — and **`disposed` is NEVER read on either drive** |
| **Second instrument** (`corroborate.mjs`, disposed-session probe) | the same two extra names, and `attach` returned **`true`** for a session reporting `disposed === true` (see §8's observation) |
| **Verdict** | **An un-hardened REGRESSION against `R-7`'s closed read set, whose ROOT CAUSE is DOC DRIFT.** The module **reads two session member names the contract's read set does not contain** (`registerCompositionWriter`, `registerCommit`), and **calls** the first when a session exposes it (once, at attach, with a function). **The doc side of the drift, stated precisely: `§2.5` item 4 pins *"the composition wires the SESSION's `commit` option to EXACTLY ONE CALLBACK"* — but neither `§2.5` nor the frozen delegate list (`gsession.md` `§2.5`, eleven items + "Nothing else exists") names ANY member by which a composition could wire that option, while `§2.5` item 1 forbids it every other call. The clause as written is therefore not implementable on the frozen surface**, so the module invented an extension seam — and the seam is **not harmless**: under a session that exposes it the composition **both registers its writer and still writes from the terminal hook**, so a session invoking the registered writer would produce **TWO sink calls for one gesture** (measured record length `2`; see `GT-G-92`'s NBR note). **The single-writer discipline holds today only because the LANDED session exposes no such member** — an accident of the frozen surface, not a property of the composition. Remedy shape (report-only here): either the spec names the wiring seam (a gate-1-visible contract addition) or the module drops the undocumented probes and its `onEnd`/`onCancel` wrapping is reconciled with `§2.1` item 5's *"forwarded BY REFERENCE, unwrapped"* clause (measured, `discover3.mjs`: **all four** consumer hooks arrive at the session as **different function references** `{onStart:false,onMove:false,onEnd:false,onCancel:false}` while the **arguments** they receive pass through unchanged — `GT-G-41`/`GT-G-44`/`GT-G-51`; **recorded as §8's observation 4 rather than scored a second time, because it is the COMPENSATING HALF of this same doc gap**: a composition that forwarded `onEnd` by reference could not observe the terminal it must write at). |

### FAIL 4 — `GT-G-94` · `§2.1` item 4's `detached` doc block (its second limb)

| | |
| --- | --- |
| **Derived from** | `§2.1` item 4, the `detached` member: *"`true` FOREVER once `detach()` has completed, **or once the session reads `disposed === true`**"* |
| **Drive** | a session whose `disposed` getter returns `true` (with install/`dispose` otherwise usable); read `controller.detached` **before any `detach()`** and again after an `attach` |
| **Expected** | `detached` reads **`true`** (the doc's second limb), with no `detach()` call |
| **Measured** | **`{"detachedBeforeAnyDetach":false,"detachedAfterAttach":false}`** |
| **Verdict** | **REGRESSION — a documented limb with no implementation**, and the honest weaker alternative is recorded beside it: the module **never reads `session.disposed` at all** (`GT-G-93`), so the second limb cannot fire. If the cell is read as *describing the `detach()` path only*, then the finding degrades to a **DOC-PRECISION defect** (the cell's `or` clause is then unfalsifiable prose); **either way the cell and the module disagree, and the pass that owns it must pick one and record it** — the same treatment `F-15`'s and `§2.5` item 5 clause 6's `'disposed'` propagation already received. |

**What is NOT a finding, recorded so the four FAILs are not read as a general module fault.** **87 of 93
rows pass**, including **every** clamp fail-state class, the entire holder domain (`Map`, getter, frozen,
`Object.create(null)`, throwing read), the seven named safe defaults, the full callability asymmetry
(non-callable seams guarded, `isResizable` reached-and-swallowed, callable-throwing seams propagating), all
four throw paths and their post-states, the single-writer counts with **both positive controls** (the
two-writer divergence measured `2 vs 1`; the slot-empty composition `0` writes with the session reporting
`committed: true`), the release mapping (`end`/`reset`/`cancel`), every reset refusal and its session-call
count, the handle identity and `gesture.outcome` discriminator, the multi-element `detach()` limb, the
repeat-attach first-config rule, the inert controller across six hostile session shapes, the whole export
census, and the `[U]`/gate-6 structural refusals.

---

## 6. The two NOT-BLIND-RUNNABLE rows — never scored as passes

1. **`GT-G-67` — the reset code for an ESTABLISHED-but-handle-less reset.** **Reason: the docs pin no
   code for it.** `§2.5` item 5 clause 2 pins the handle channel (`onMove` is the ONLY legal one; no
   synthesis) and clause 3 pins the refusal **only** for *"no active gesture"* — here a gesture IS active
   (the double's `gestures` reads `1`) and the composition holds no handle. **Measured for the record
   only:** the refusal was **`{ok:false, code:'no-gesture', committed:false}` with ZERO `session.reset`
   calls** — i.e. the composition treats *"a live gesture I hold no handle for"* exactly as *"no gesture"*,
   which is a **third, undecided case** the spec text does not name. **Owner: the spec** (a one-cell
   amendment with its own gate, not a module change).
2. **`GT-G-92` — `§2.5` item 4's *"THE SESSION'S `commit` OPTION HAS EXACTLY ONE WIRING"*.** **Reason: the
   property is pinned but the SEAM is not** (see FAIL 3's verdict: the frozen delegate list names no member
   by which this composition could wire the session's `commit` option, and the controller may call only
   `install`/`reset`/`dispose`), so a blind drive of the wiring is **not constructible from the docs**.
   **Black-box measurements recorded for the record:** (i) the composition invokes its sink from the
   terminal hook it installs — **one call per `end`/`reset`, ZERO on a `cancel`** (`GT-G-91`, `GT-G-42`);
   (ii) when the session exposes `registerCompositionWriter` the composition calls it **once at attach**
   with a function; (iii) under such a session it **also** still writes from the hook (sink record `2`).

---

## 7. What this record may NOT be read as

- **NOT assembled-app evidence, and NOT `[U]`/`[D]` evidence.** No window booted, no IPC round-trip ran,
  no MCP transport was exercised, **no real DOM was touched**, and **no rendered-geometry, coordinate,
  magnitude, layout, paint, applied-CSS or retargeting claim is made or implied**. The `[U]` row is
  **not offered** (three-part refusal verified in the spec's bytes, `GT-G-89`) and the `[D]` row is **not
  claimed** (its precondition's deliverable is absent, `GT-G-83`).
- **NOT a proof of the register.** This pass **did not drive `§5.5.1`'s register** and **did not read or
  run `tests/gutter.test.ts`**: the register's `299` declared / measured terms, its strategy ids, its
  `(bounded)` set, the pinned seed and the pool-versus-boundary check are **the unit's own rows and the
  adversarial/PBT audit's business**, and **no figure of this artifact may be quoted for them.**
- **NOT a claim about the session.** Every session-side reading here is a reading of **my own double** or
  of the landed session's **documented surface**, used as an instrument; **no session property is asserted
  as this unit's row** (`§4.3`'s *"not a session test"*).
- **NOT a claim about the module's source-level prohibitions beyond what `[S]` measured.** `GT-G-80`
  measured the **import shape** and `GT-G-81` the **import graph**; the banned-vocabulary scans
  (`R-1`/`R-11`), the realm/access scan (`R-2`), the listener scan (`R-3`) and the geometry-text scan
  (`R-8`) are **not** measured here — they need a source-reading pass, and **no row of this record may be
  read as one of them.** The runtime halves of `R-8`/`R-11` **are** measured (`GT-G-84`: zero element
  property touches; `GT-G-76`: zero capture calls).
- **NOT evidence that the unit is DONE.** The gates after 3 (**adversarial + the gate-11 PBT audit, this
  blind set, gate 6 as structural, the documentation review and the DONE row**) remain the supervisor's;
  this artifact takes **no gate** itself.

---

## 8. Observations recorded beside the verdicts (not FAILs, and not silently dropped)

1. **`attach` on a session that reports `disposed: true`** (`GT-G-71`, `GT-G-93`'s second probe): the
   controller returned **`false`** and created **no ledger entry** — but it **called `session.install`**
   once to get there (`installCalls: 1`; on the real session the same shape is unobservable because the
   disposed session's own `install` returns `false`). `§2.1` item 3's attach block lists *"the session is
   unusable or disposed"* under *"delegating NOTHING"*, and **that sentence does not distinguish "no
   listener attached" from "no session call made"** — the doc's own `M-1` row (one `install` call) and
   this cell should be read together in one pass.
2. **`detached` after a `detach()` whose session reported `complete: false`** (`GT-G-75`): the call
   returned **`false`** (correct: *"true iff the session reported a detach with `complete === true`"*) while
   `detached` read **`true`** (the *"forever once `detach()` has completed"* limb). Both are consistent
   with the doc's words; recorded because the two limbs meet on exactly this path.
3. **`stats().resets` counts a reset that REACHED the session and was refused** (`GT-G-66`:
   `resets === 1` for a call the session answered `'stale'`). `§2.1`'s `ResizeStats` defines the field as
   *"`reset(element)` calls that reached the session's `reset` terminal"* — the reading is literal and the
   count follows it; recorded so the number is not misread as *"a reset committed"*.
4. **The consumer-supplied hooks reach the session as DIFFERENT function references** — measured in
   `discover3.mjs`: `{onStart:false, onMove:false, onEnd:false, onCancel:false}`, i.e. **all four**
   `!==` the consumer's own functions — while **the arguments those hooks receive pass through
   unchanged** (`GT-G-41`, `GT-G-44`, `GT-G-51`). **Recorded as an observation rather than scored a second
   time: it is the compensating half of FAIL 3's doc gap** (a composition that forwarded the consumer's
   `onEnd` BY REFERENCE could not observe the terminal it must write at), and the doc's own clauses speak
   to two different things.
   `§2.1` item 5's *"the consumer's `onEnd` and `onCancel` are forwarded BY REFERENCE, unwrapped"* and
   the establishment-seam ruling's *"the argument it receives passes through BY IDENTITY"* speak to
   **different things** (the function reference vs the argument), and the doc's own `M-12` narrowing is
   written in the **argument** terms — a one-sentence reconciliation belongs to the pass that owns
   `§2.1` item 5. **The behaviour is what the composition's write site requires**: the write happens
   inside the terminal hook it installs (`GT-G-92`'s measurements).
5. **Two-writer limb confirmed falsifiable** (`GT-G-45`): a consumer whose own `onEnd` calls the same sink
   for the same gesture produced **sink record 2 with the controller's counter at 1** — the divergence
   `F-9`/`R-13`/`P-GT-SM-3` declare; and the slot-empty limb (`GT-G-46`) produced **0 writes where the row
   requires 1** while the session reported **`committed: true`**. **Both positive controls behave as the
   contract demands**, which is what makes the single-writer rows falsifiable.

---

## 9. Provenance — exactly what this pass touched

- **Written inside the repo: `docs/specs/gutter-greens.md` (NEW) — this file, and nothing else.**
  **No `src/**`, no `tests/**`, no other `docs/**` file, no `package.json`, no `scripts/**` and no config
  file was written, edited or deleted.** No tracking file was read or edited.
- **Scratch, OUTSIDE the repo (`/tmp/gutter-greens/`, all of it disposable):** `gutter.mjs` and
  `session.mjs` (**the two esbuild bundles the runner imports as black boxes**), `runner.mjs` (the 93
  scored rows), `results.json` (the raw record), `discover.mjs`, `discover2.mjs`, `discover3.mjs` and
  `corroborate.mjs` (the discovery/corroboration probes) and `tsc/` (the symlink + the two blind type
  probes). **Nothing in `/tmp` is part of the deliverable.**
- **No commit was made, and no writing git command was run** — `git rev-parse HEAD` and
  `git status --porcelain` are the only git commands used, and the tree was **clean** before this pass.
  **The new artifact is untracked and is the supervisor's to commit** (`RCA-8`'s per-gate commit rule).
- **The implementation was not read** (`src/shared/gutter.ts` never opened; imported black-box), **the
  unit's test file was neither read nor run**, and **every harness double, drive and expectation in this
  record was authored from the documentation listed at the top of this file.**
