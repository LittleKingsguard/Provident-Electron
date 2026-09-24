# Green Scenarios — `U-ENGINE-PIN` (blind run)

**Status: `BLIND RE-RUN 2026-09-23 (third run) — 104 rows, 96 PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE`
(+ 1 row `recorded, not asserted`; 2 carried rows `RESTATED`, not counted).**

**⚠ LINE-NUMBER POLICY (rewritten 2026-09-27 by the `U-ENGINE-PIN` proofreader pass — this file
cites by SECTION NAME; `(l.<n>)` is an advisory, dated snapshot, never an address. Read this
before using ANY number in the tables below.)**
**The primary key is the section name / row id, and nothing else.** Every `(l.<n>)` here is
advisory: the `DOC source` columns record the lines **the run** read (`docs/specs/engine-pin.md`,
**2118 lines at run time**, 2026-09-23), and the notes that later passes added recorded the lines
as they stood **at those passes**. **The earlier form of this block claimed that every `(l.<n>)`
above §3.5 still resolves exactly as written — that claim is WITHDRAWN (SUPERSEDED 2026-09-27):
it is false on the current file** (e.g. `§2.2 item 5` is cited here at `l.408-420` and `§3.2 row 1`
at `l.1103`, while §2.2 now sits at **432-501** and §3.2 at **1170-1184**). **Every entry below is
resolved by its section name; the numbers are kept only as the dated measurement.**
**Why the freeze is now section-name-only (the evidence, not a preference):** the contract has moved
**2118 → 2155 → 2318 lines** across the amendment blocks and two repointing passes, and this remap
has now been re-measured **twice**. This pass re-measured every entry and found **three had already
drifted again** from the numbers the previous freeze certified (`M8` 1212 → **1270**; `AF-5` 2101 →
**2295**; `AF-9` 2118 → **2299**), and that `docs/specs/engine-pin.md`'s **own internal anchors** had
moved by a **+1…+2 line offset** since the sweep measured them. A table re-measured after every edit
is self-defeating, so **this file cites sections; the numbers below are one dated measurement.**
**The dated measurement: every `Measured 2026-09-27` value below was read from
`docs/specs/engine-pin.md` in one pass on 2026-09-27, with that file at 2318 lines** — i.e. after
this pass's own edits to it (its internal citation anchors converted to section/row names, plus its
new §Layer-declaration "ANCHOR CONVENTION" note, which now carries the same rule there). **Any later
edit to that file moves every number below again: re-resolve by section name, never by number.**

| Cited in this file as (**primary key**) | Run-time / earlier-pass number (advisory) | Measured 2026-09-27 (spec at 2318 lines) | Section |
| --- | --- | --- | --- |
| `§3.6` rows / `M8` (`l.1199`) | 1212 (`M9` 1213 — the previous freeze) | **`M8` 1270 · `M9` 1271** | §3.6 Malformed mutations (rows shifted by the block-7 `M9` insertion) |
| `§3.7` (`l.1237-1243`) | 1234-1240 | **1291-1309** | §3.7 the version-mismatch fail-state |
| `§4.1 PA-6 row` (`l.1324`) · `R-15` (`l.1336`) · `R-16`/`R-17` (`l.1338-1339`) | 1328 · 1353 · 1354-1355 | **`PA-6` row 1397 · `R-15` 1413 · `R-16`/`R-17` 1414-1415** | §4.1 the red-set table |
| `§4.2` (`l.1331`) | 1381-1422 | **1440-1491** | §4.2 the scenario envelope (+ the amended pane-vocabulary bullet) |
| `§4.3` | 1471 (the sweep's measurement) | **1492-1535** | §4.3 the red-run ledger shape |
| `§4.4` (`l.1320-1330`) | 1476-1510 | **1536-1577** | §4.4 the honest thin-red fact (+ the divergence-leg scope) |
| `§5.1` (`l.1496-1500`) | 1508-1537 | **1580-1636** | §5.1 diff scope |
| `§5.2` (`l.1558`) | 1561 | **1637-1655** | §5.2 the test files this unit creates/carries |
| `§5.3 leg 5` / `leg 6` | 1587-1591 / 1590-1609 (the whole §5.3: 1576-1611) | **leg 5: 1667-1673 · leg 6: 1674-1695 (the whole §5.3: 1656-1699)** | §5.3 the legs |
| `§5.5` row lines (`l.1650-1660`) | 1655-1665 | **the register table's rows: 1743-1750** (the whole §5.5: 1729-1805) | §5.5 the typed-property register |
| `§5.5` register count + change summaries (`l.1659-1666`, `l.1681-1712`) | 1667-1674 · 1685-1719 | **register count 1752-1760 · block-5 summary 1762-1772 · block-6 1774-1782 · block-7 1784-1804** | §5.5 arithmetic + the block-5/6/7 summaries |
| `§3b AF-5` / `AF-9` (`l.2037`) | `AF-5` 2101 · `AF-9` 2118 | **§3b 2280 · `AF-5` 2295 · `AF-9` 2299** | §3b the adversarial disposition table |
| `§7.2` (`l.1798-1826`) | 1803-1831 | **§7 item 2: 1891-1951** (the whole §7: 1885-2086) | §7.2 "nothing in this unit is DONE" |
| `§7.4` | 1841-1848 | **§7 item 4: 1961-1977** | §7.4 the divergence leg's hermeticity drift |
| `§7.9` (`l.1803-1808`) | 1865-1870 | **§7 item 9: 2029-2034** | §7.9 the pane injection point |
| `§7.11` (`l.1805`) | 1879-1892 | **§7 item 11: 2039-2052** | §7.11 the OWED pane-side id-resolution route |
| **every `(l.<n>)` in §3a's discharge columns** — `§2.2.1` (items 1-4), `§2.3`'s spellings + kind-scope bullets, `§3.2`'s `value` row, `§3.4` (`PA-6`/`PA-10`), `§3.5` `P7b`, `§5.5` `P-SM-2`, `§3b` `AF-5`/`AF-9`, `§2.4b` items, `§4.2`, `§5.1` item 3, `§5.2` | pre-amendment numbers of the amendment passes (`l.1152`, `l.629-646`, `l.1186`, `l.1653`, `l.2037`, `l.995-1042`, …) — **all advisory** | **the section extents, measured 2026-09-27: `§2.2.1` 502-602 · `§2.3` 603-712 · `§3.2` 1170-1184 · `§3.4` 1205-1239 · `§3.5` 1240-1258 · `§2.4a` 770-850 · `§2.4a.1` 851-958 · `§2.4b` 959-1131** (row ids — `PA-10` 1223, `P7b` 1257, `P-SM-2` 1746, `AF-5` 2295, `AF-9` 2299) | resolve by the section/row named in the same cell; the number is a dated snapshot |
| the second run's six FAILs (kept verbatim) | *(was given as line numbers of THIS file — dropped, they drift with every edit here)* | **this file's §3 table + the six verbatim findings in §3a (`F-1`..`F-6`)** | §3/§3a of THIS file |
| the `DIV-1` / `P-TP-1` rows (`l.206`, `l.385`) | *(was given as line numbers of THIS file — dropped)* | **this file's §4 (both rows)** | §4 of THIS file |

**Also frozen, and stated so it is not read as current:** the run-time spec length (**2118
lines**) and this file's run arithmetic (**104 rows — 96 PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE**,
+1 `recorded, not asserted`, +2 `RESTATED`). *(SUPERSEDED 2026-09-27 — kept as the record of the
previous freeze: the sentence that stood here read "the spec is now **2155 lines** … the remap table
above was re-verified against the current file by that proofreader pass; the two ends of it had
drifted again and are corrected there: `M8` is now `:1212` (`M9` `:1213`), `AF-5` is now `:2101`,
and `AF-9` is now `:2118`", with the note that entries it did not re-read were "unchanged". **Its
method was right and every number it certified has since moved** — the file it certified is now
**2318 lines**, and `M8`/`AF-5`/`AF-9` sit at 1270/2295/2299 — which is exactly why the table above
is now a **dated measurement** rather than a live address list, and why **this file cites sections**.
The spec's authoritative form is likewise the **section name**, not a number: `docs/specs/engine-pin.md`
carries the same convention in its §Layer declaration's "ANCHOR CONVENTION" note.)*

**Note — every divergence-leg statement in the "was NOT RUN" or "NOT RUN here" form**
(the run table's leg row, §DIV-1 in §4, §5's command block and its trailing paragraph) is
**superseded as a status statement** — the leg is **green post-change**, so the pre-fix text is
retained in place as the run-time record only. **No row, PASS and no FAIL of the 104 changes.**

Two earlier status lines are **SUPERSEDED, not deleted**:

- `BLIND RE-RUN 2026-09-23 (second run) — 100 rows, 90 PASS / 6 FAIL / 4 NOT-BLIND-RUNNABLE`
  — that run was authored against the contract **before amendment block 7** (the block-7 reconciliation
  set), before the **new `§2.4b`**, and before the corrections to **`§2.2.1` item 3**, **`§2.3`'s
  spellings bullet**, **`§3.4 PA-10`**, **`§3.5 P7b`**, **`§5.5 P-SM-2`'s (b)-half**, **`§2.2.1` item 3**
  and **`§3b AF-9`**. Its six FAILs are re-measured here; §3 records each.
- `BLIND-RUN 2026-09-23 — 65 scenarios, 62 pass, 0 fail, 3 not blind-runnable` — authored against an
  even earlier revision (§6 keeps the old→new mapping row by row).

**What changed since the second run (so this file is read against the right contract):** the six
FAILs of the second run all sat on **clauses the contract has since amended** or on **landed behaviour
the implementation has since changed**. Between the two runs the pane predicate gained the
`Array.isArray` container guard and the seam gained the derived `applied` flag (`§3.6 M9`'s landed
cell: `src/renderer/secure-panels.ts:82`, `:334`, read by the contract's own reconciliation pass) —
both were **measured** in this run (§3, rows `M9 (pane half)`, `PF-1b`, `PANE-PARITY-2`). No row was
converted to a pass: each previously-failing row was re-driven and re-observed against the amended
expectation.

This set was **authored and run WITHOUT reading the implementation**. The only sources read were the
documentation (`docs/specs/engine-pin.md` — the amended contract, 2118 lines at run time; the
`provident-electron-shell-chrome-handoff-review.md` reshape set; `docs/specs/secure-panels.md`,
`docs/specs/runtime-host.md`, `docs/specs/module-u8-greens.md`; `docs/next-steps.md`,
`docs/decisions.md`; `AGENTS.md`; `package.json`), the engine's **published public surface**
(`node_modules/provident-ssr/dist/**/*.d.ts` + the installed `0.5.1` dist), and the **built artifact**
`dist/main/main.cjs` (the artifact census rows `G-06`/`G-06b`, which the contract's own `AF-9` names
as a **greens-layer string census**). **No file under `src/**` was read at any point** — not to author
a row, not to explain a result — and **no file under `tests/**` was read to derive a row**. The repo's
own modules were imported as a **black box** through bundles `esbuild` emitted into `/tmp` from the
module paths the docs name (`dom-shim.ts`, `runtime.ts`, `secure-panels.ts`); the engine was imported
from the repo's `node_modules` under its package name.

Run record: `2026-09-23` (local, ~21:22–21:32), Node `v24.20.0`, `esbuild 0.28.2`; installed engine
`node_modules/provident-ssr/package.json` → `0.5.1`; declared pin `package.json` →
`"provident-ssr": "^0.5.1"`; built `dist/main/main.cjs` re-read after this run's `npm run build`
(21:25).

| Leg | Command | Result |
| --- | --- | --- |
| This scenario set (authoritative — 104 rows) | `node /tmp/engine-pin-blind3/run-all.mjs` | **104 rows — 96 PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE** (+1 recorded, +2 restated) |
| Repo suite (corroboration, run not read) | `npm test` | **55 files / 789 passed / 2 skipped / 0 failed** (exit 0) |
| Typecheck (corroboration) | `npm run typecheck` | clean (exit 0) |
| Build (corroboration) | `npm run build` | clean, 5 bundles (exit 0) |
| Battery leg (`engine-pin.md` §5.3 leg 5) | `npm run battery` → `tests/e2e-battery.test.mjs` | **`BATTERY RESULT: 184 checks, 0 failures`** (exit 0) |
| Divergence leg (§5.3 leg 6) | `npm run divergence` | **NOT RUN here — environment limitation** (see `DIV-1`, §4): this blind run drove no Electron window. **⟶ LEG STATUS SUPERSEDED 2026-09-27 (the `U-ENGINE-PIN` DONE pass): the leg is GREEN — `R13 RESULT: 9 checks, 0 failures`** on the **post-change** tree, run by the supervisor after landing the harness spawn fix (`scripts/electron-divergence.mjs`: `--disable-dev-shm-usage` + a fresh scratch `--user-data-dir`, **both required**; `docs/decisions.md` `DIVERGENCE-SPAWN-FIX`). The history that stood in this cell — the repo's own driver exiting 1 (`R13 RESULT: 1 checks, 2 failures`, SIGTRAP **before** `renderer ready — MCP backend armed`), the last good run being PRE-CHANGE, and the scratch replication (`SCRATCH RESULT: 9 checks, 0 failures`) as evidence-not-the-gate — is **spent**; the scratch replication was **superseded** by the real leg, which is why `U-DIVERGENCE-EXT` now **inherits** the spawn fix instead of owing it. **`N = 9` did not drift, and this leg still asserts NO attribute row** (`H-r10` remains owed). **The greens' layer does not change:** the `PA-*`/`P*`/`E-11` rows below were driven on the `Runtime` bundle under node and **never over the app's IPC/MCP transport**, so they are **envelope-layer** — and the live finding **`LIVE-OP-REJECT`** (the assembled app's `provident.op` refuses every command shape; root cause = this repo's renderer IPC unwrap, `src/renderer/renderer.ts:38`, a file **untouched** by this unit) is recorded **outside this unit's scope as a HOST defect** in `docs/defects.md`/`docs/decisions.md` (`LIVE-OP-REJECT-IS-A-HOST-DEFECT`). **⟶ SINCE FIXED + LIVE-VERIFIED (2026-09-27, the fix pass): the renderer unwrap landed at `src/renderer/renderer.ts:43` and the live probe flipped `{status:'rejected'}` → `{"status":"applied", …}`; the defect row now sits in `docs/defects.md`'s `## FIXED (in this repo)` section.** **It does not contradict any row of this set** — this set never asserted the IPC hop. The leg never calls `provident.op`, so this green is silent on it. |

**Layer caveat on the corroboration rows (do not over-read them):** a green node-suite/battery is
**envelope/pure-layer evidence** — it says the repo's own vitest files and the shim-driven battery
pass under the shim. It is **not assembled-app evidence**: no Electron window was booted, no IPC
round-trip ran, no MCP transport was exercised, and no real DOM was touched. Every "DOM" row below is
the repo's `src/shared/dom-shim.ts` under Node, which (per `engine-pin.md` §2.2 item 6) observes
set/overwrite/delete only and is **not** a browser. The real-DOM half is `H-r10`'s precondition and is
explicitly **not asserted by this unit** (§0 prohibition-6 row, §4.4).

**Environment limitation, recorded with the architect's measured signature (not a doc gap):**
`npm run divergence` (§5.3 leg 6) **could not be run at this layer** — it needs an unsandboxed shell with
a usable display + Chromium `/dev/shm`. The architect's measurement: **SIGTRAP after
`renderer ready — MCP backend armed`, `R13` result `1 check / 2 failures`** (the `docs/next-steps.md`
`CURRENT WORK` block's item 2 — cited by section and item, never by line; §4's `DIV-1` row carries). The reachable structural substitute was
run instead (`npm run battery`, 184 checks / 0 failures).

> **⟶ CLOSED 2026-09-27 (the `U-ENGINE-PIN` DONE pass).** The leg is **no longer un-runnable**:
> `scripts/electron-divergence.mjs` now carries **`--disable-dev-shm-usage`** **and** a fresh
> scratch **`--user-data-dir`** per spawn, and the repo's own driver is **GREEN —
> `R13 RESULT: 9 checks, 0 failures`** on the **post-change** tree (Electron 44.4.5, node
> 24.21.0). **Two corrections to the paragraph above, so it is not quoted as current:** (i) the
> SIGTRAP is **before** `renderer ready — MCP backend armed`, not after it
> (`docs/specs/engine-pin-live-status.md` §1.2's raw evidence — the death is at early browser
> init, which is also why neither `--no-sandbox` variant alone survives); (ii) the fix is
> **landed** and **inherited** by `U-DIVERGENCE-EXT`, not owed to it. The battery remained the
> greens' own reachable substitute and is unchanged (`184 checks / 0 failures`).

The scenario script and the bundles it imports live under `/tmp/engine-pin-blind3/`
(`run-all.mjs`, `run-1.mjs`..`run-7.mjs`, `lib.mjs`, `bundle/**`, `results.json`, `run.txt`).
**Nothing was added to the repo except this file.**

---

## 1. Layer declaration — what this run proves and what it does not

**It proves:** that each documented behaviour in `engine-pin.md` §0, §2.1–§2.4b, §3.1–§3.7, §4.1/§4.2,
§5.5 is **reachable as documented** on a layer this repo owns, driven only through surfaces the docs
name — (a) `ShimElement` directly, (b) the engine's published `DomAdapter`/`SSRFragmentAdapter`
`setProp` surface mounted on the shim, (c) the `Runtime` public API
(`new Runtime({mount, envelope})`, `bootstrap()`, `applyCommand()`, `op()`, `load()`,
`renderedHtmlResult()`, `listTargets()`, `render()`), (d) `new SecurePanels(mount)` + `refresh()` +
the **documented injection seam** `applyPaneMutation(nodeId, mutation)`, (e) the repository JSON, and
(f) the built `dist/main/main.cjs`.

**The pane nodeId vocabulary, as amended (block-7 item F(2) / §2.4b item 4).** The seam's first
parameter is the **engine `nodeId`**, and **no public pane-side accessor converts an authored
`props.id` into it** (§2.4b item 4: `Runtime.listTargets()` reads the APP graph; `SecurePanels.dispatch(id)`
is a click seam that exposes no id; a `listTargets`-analogue is **recommended, parked in §7.11, NOT
admitted**). So this run resolves the pane vocabulary from the **rendered pane mount** — the emitted
`data-node-id` attribute the contract itself names as the traceability surface (§4.2:
`renderOptions.nodeIdAttribute === true`) — and **never** by reading a private field and never by
passing the authored `props.id`. That route is exercised and corroborated by row `PF-1b`, which
reproduces the documented outcome (iii) for an authored `props.id` passed directly: the engine
refuses it. **No row in this set passes an authored `props.id` to the seam.**

**It proves nothing about:**

- **the assembled Electron app** — no window was booted, no IPC round-trip was run, no MCP transport
  was exercised (`DIV-1`, §4);
- **the real DOM** — see the layer caveat above;
- **anything the docs do not name** — in particular `SecurePanels.syncConfig`'s argument shape (still
  undocumented; no row is invented for it) and the pane graph's own id index (no public route exists,
  §2.4b item 4 / §7.11).

---

## 2. The scenario set

`DOC source` cites section + line in `docs/specs/engine-pin.md` (line numbers are those of the file as
read this run, after the block-7 + `B-LANDED` corrections) unless another file is named. `Layer` is
the layer the observable is read on: **dom-shim** (a `ShimElement`, or an engine adapter mounted on
it), **runtime-host** (the `Runtime` public API), **engine** (the installed `provident-ssr` `0.5.1`
dist), **pane** (`SecurePanels` + the §2.4a seam), **host** (repo JSON / built bundles),
**not blind-runnable** (no documented route exists at this layer).

### 2.1 `ShimElement.removeAttribute` — §3.2 / §2.2 → S-01..S-07 (unchanged)

| ID | Doc source | Procedure | Expected observable | Result |
| --- | --- | --- | --- | --- |
| S-01 | §3.2 row 1 (l.1103) + §2.2 item 1 | `setAttribute('title','t')`; `removeAttribute('title')` | `getAttribute === null`; no `title=` | **PASS** (`getAttribute=null`, `outerHTML=<div></div>`) |
| S-02 | §3.2 row 2 + P-IM-2 | `removeAttribute('title')` on an absent key, twice | byte-identical `outerHTML`; no throw | **PASS** (`identical=true`, `threw=null`) |
| S-03 | §3.2 row 3 + §2.2 item 1 | `setAttribute('id','x')`; `removeAttribute('id')` | both stores cleared | **PASS** (`getAttribute=null`, `outerHTML=<div></div>`) |
| S-04 | §3.2 row 4 | `setAttribute('id','x')`, `setAttribute('title','t')`, `removeAttribute('title')` | `id` slot + `id="x"` survive | **PASS** (`id="x"`) |
| S-05 | §3.2 row 9 + §2.2 item 2 | `removeAttribute(42)` coerced key, no-op, no `TypeError` | **PASS** (`threw=null`) |
| S-06 | §3.2 row 10 | `className='c'`; removals | `className` untouched | **PASS** (`className="c"`) |
| S-07 / PR-1 | §2.2 item 5 (l.408-420) + §1 out-of-scope (l.304-307) + §7.3 | `Object.getOwnPropertyNames(ShimElement.prototype)` | exactly the 10 documented members; `removeAttribute` present; **`hasAttribute` absent**; no forbidden member | **PASS** (`constructor, appendChild, setAttribute, getAttribute, removeAttribute, addEventListener, removeEventListener, remove, innerHTML, outerHTML`; `forbiddenPresent=[]`) |

### 2.2 `removeAttribute('value')` — the §2.2.1 special case → S-08..S-17 **(stand)** + S-18 **(NEW)**

| ID | Doc source | Procedure | Expected observable | Result |
| --- | --- | --- | --- | --- |
| S-08 | §3.2 row 5 (l.1107) | `input`; `setAttribute('value','7')` (store only) | `value="7"` serialized; slot stays at its `''` default | **PASS** (`attr="7"`, slot `""`) |
| S-09 | §2.2.1 item 2 state row 1 (l.460) + §3.2 (l.1108) | `input`; slot `'7'` + `setAttribute('value','7')`; `removeAttribute('value')` | **BOTH cleared** — `el.value === ''` **and** `getAttribute === null` **and** no `value="7"` | **PASS** (`before {slot:"7",attr:"7"}` → `slot=""`, `attr=null`, `<input>`) |
| S-10 | §2.2.1 item 2 state row 1 + item 3 scope (l.466-514) | the same on a `TEXTAREA` | both stores cleared | **PASS** (`slot=""`, `attr=null`) |
| S-11 | §2.2.1 item 2 state row 2 (l.461) | `input`, slot untouched; `removeAttribute('value')` ×3 | idempotent no-op, no throw, byte-identical | **PASS** (`identical=true`, `threw=null`) |
| S-12 | §2.2.1 item 2 state row 3 (l.462) | `input`; attr present, slot at default; remove | store cleared; slot already `''` | **PASS** (`attr=null`, `slot=""`) |
| S-13 | §2.2.1 item 2 state row 4 (l.463) + §3.2 (l.1110) | `div`; attr + slot `'7'`; remove | **store-only**: the slot is NOT touched | **PASS** (`attr=null`, `slot="7"`) |
| S-14 | §3.2 row 9 + §5.5 P-IM-2 | `data-x` present; remove twice | removed; repeat idempotent; never throws | **PASS** (`attr=null`, `identical=true`) |
| S-15 | §5.5 P-IM-2 / `S-TAB-IDEMP-1` (l.1654) | fixed 4-key × call-count `[1,2,3]` table | repeat N times ≡ once | **PASS** (`mismatches=[]`) |
| S-16 | §5.5 P-IM-2's `value` extension note (l.1654) + §2.2.1 item 2 | `input` seeded slot+attr; `removeAttribute('value')` ×1 vs ×3 | identical `outerHTML` + slot | **PASS** (`identical=true`, slot `""`) |
| S-17 / SC-1 | §2.2.1 item 3 scope (l.486-488) | `SELECT` + `removeAttribute('value')` | store-only rule kept (`SELECT` is in `FORM_CONTROLS`, NOT `VALUE_FORMS`) | **PASS** (`attr=null`, `slot="7"`) |
| **S-18 (NEW ROW)** | §2.2.1 item 3 (l.466-514, block-7 item C) — *"`prop:value` (the fallback removal path) **and** `css.value` (`:214-224`) both clear the slot"* | an `INPUT` driven through the engine's **published `DomAdapter`**: (a) `prop:value` ON → `undefined`; (b) `prop:value` ON, `css:value` ON → `css:value` `undefined`; (c) the **non-`value`** key `css:title` removal as the store-only control | both removal routes leave `el.value === ''` **and** `getAttribute('value') === null`; only a non-`value` key stays store-only | **PASS** (`viaPropValue {slot:"",attr:null}`; `viaCssValueSeeded {attr:"9",outer:'<input value="9">'}` → `viaCssValue {slot:"",attr:null}`; `css:title` control `{slot:"7",attr:null}`) |

*Why S-18 is a new row:* the block-7 item C correction widened `§2.2.1` item 3's scope from "the tags
the engine sends down its property path" to "the **key `'value'` + the tag** — `prop:value` **and**
`css.value` both reach it". The second route was never driven by the second run.

### 2.3 The boolean-attribute emit contract on BOTH adapters — §3.3 → B-01..B-13 (unchanged)

| ID | Doc source | Procedure | Expected observable | Result |
| --- | --- | --- | --- | --- |
| B-01 | §3.3 truthy row (l.1121) | `prop:inert:'true'` (DOM leg) | present, `'true'`, `inert="true"` | **PASS** |
| B-02 | §3.3 false row (l.1122) + P-TP-2 | `'false'`, `0`, `'0'`, `''` | absent in every case; never `inert="false"` | **PASS** (`violations=[]`) |
| B-03 | §3.3 `undefined` row (l.1123) | `inert` → `undefined` | absent, no `TypeError` | **PASS** (`attr=null`) |
| B-04 | §3.3 (l.1121) | `prop:hidden:'true'` | `hidden="true"` (the existing pin) | **PASS** |
| B-05 | §3.3 + R-5 (l.1126) | `readonly` ON → OFF | ON present / OFF absent | **PASS** (`on="true"`, `off=null`) |
| B-06 | §3.3 SSR truthy row (l.1121) | SSR `prop:inert:'true'` | present with the authored form | **PASS** (`[["inert","true"]]`) |
| B-07 | §3.3 SSR false + `undefined` rows (l.1122-1123) | SSR `'false'`, `0`, `'0'`, `''`, `undefined` | absent; never `inert="false"` | **PASS** (`violations=[]`) |
| B-08 | §3.3 + R-5, SSR leg | SSR `readonly` ON → OFF | ON present / OFF absent | **PASS** (`on=true`, `off=false`) |
| B-09 / P-TP-2 | §5.5 P-TP-2 / `S-TAB-OFF-2` (l.1659) | 16-row table: members × falsy × 2 legs | absent on both legs in all 16 | **PASS** (`violations=[]`) |
| B-10 | §3.3 `null` row (l.1124) + §3a `A-4` / §3b `AF-4` | `inert` → `null` (DOM leg) | **NOT asserted by this unit** — recorded, never converted | **recorded** (`attr=null`, `<div></div>`) |
| B-11 | §2.2 item 7 (l.425-430) + §3.7 (l.1220-1237) + R-4 | `DomAdapter.setProp('w1','inert','false')` with `removeAttribute` instrumented | the engine reaches the ONE admitted method | **PASS** (`calls=["inert"]`, `attr=null`) |
| B-12 | §3.2 (l.1107) + §2.2.1 item 3 (l.472-483) + R-7 | `setProp('w1','role',undefined)` instrumented | the engine reaches `removeAttribute`; attribute gone; no throw | **PASS** (`calls=["role"]`, `attr=null`) |
| B-13 | §3.3 false row (l.1122), SSR state | SSR `inert` ON → OFF, re-serialize | deleted from the adapter state; well-formed | **PASS** (`attrs=[]`, `wellFormed=true`) |

### 2.4 The attribute-path **PASS-THROUGH** table — §3.4 → PA-1..PA-11

| ID | Doc source | Procedure (through `applyCommand`) | Expected observable | Result |
| --- | --- | --- | --- | --- |
| PA-1 | §3.4 PA-1 (l.1143) | `props.hidden: undefined` | applied; `hidden` absent (DOM+SSR) | **PASS** (`nodeAttrs=[data-node-id,id]`, `ssrHasHidden=false`) |
| PA-2 | §3.4 PA-2 (l.1144) + AF-7 | `props.hidden: null` | applied; same absence | **PASS** (`domAttrs=[data-node-id,id]`) |
| PA-3 | §3.4 PA-3 (l.1145) | batch `props.hidden: undefined` + sibling `props.title:'t'` | applied whole; siblings touched normally | **PASS** (`title="t"` present) |
| PA-4 | §3.4 PA-4 (l.1146) + AF-7 | `[{targetProp:'props.hidden'}]` (no `value` key) | applied; same absence (absent ≡ explicit `undefined`) | **PASS** (`domAttrs=[data-node-id,id]`) |
| PA-5 | §3.4 PA-5 (l.1147) + §2.3 defect (a) | `css.role: undefined` on an authored `css.role` node | applied; `role` absent | **PASS** (`before=[role,…]` → `after=[data-node-id,id]`) |
| PA-6 | §3.4 PA-6 rewritten (l.1148) + §4.1 PA-6 row (l.1324) | `props.id: undefined` | applied **WITHOUT removal**: `id` still present, `!== "<authored id>"`, as the synthesized form | **PASS** (`id` attr = the auto-minted node id; `authoredGone=true`) |
| PA-7 | §3.4 PA-7 (l.1149) | `css.id: undefined` | applied; the `id` attribute **absent** (`elem.id = ''`) | **PASS** (`attrs=[]`; no `id="n-hidden"`) |
| PA-8 | §3.4 PA-8 (l.1150) + §5.5 P-SM-1 | 3-element batch: nullish middle + two distinct defined writes | applied whole; all three observables changed | **PASS** (`hidden` gone, `title="t"`, `X="mid2"`) |
| PA-9 | §3.4 PA-9 (l.1151) + §2.3 | `css:role: undefined` (colon spelling) | verdict **not pinned**; INERT as a mutation target | **PASS** (`status=applied`, `role` unchanged) |
| PA-10 | §3.4 PA-10 **rewritten** (l.1152) + §2.3 spellings bullet (l.571-594) + §3b AF-5 (l.2095) | bare `title: undefined`, bare `title:'v'`, then the `props.title` control (tag compared after **each** call) | the row is **NOT a removal row**: the bare spelling is **INERT** (attribute present before and after both bare writes); the prefixed control **does** remove | **PASS** (`tagBefore == tagAfterBareNullish == tagAfterBareDefined = '<div title="x" …>'`; `tagAfterPropsControl` has no `title=`; `controlRemoved=true`) |
| PA-11 (G8) | §3.4 G8 STANDS (l.1168) | `content: 'X'` | pass-through | **PASS** (`status=applied`, content rendered) |

### 2.5 The defined-value pass-through paths + the kind-scope half — §3.5 → P1..P7b-ii

| ID | Doc source | Procedure | Expected observable | Result |
| --- | --- | --- | --- | --- |
| P1 | §3.5 P1 (l.1179) | `props.X:'v'` | applied | **PASS** |
| P2 | §3.5 P2 (l.1180) | `props.value: ''` on an `input` | applied — falsy ≠ nullish | **PASS** (`status=applied`) |
| P2-obs | §3.5 P2 + §3.3 `VALUE_FORMS` + §2.2.1 item 3 | same, read the node's attributes | no `value` **attribute** for a `VALUE_FORMS` tag (property path) | **PASS** (`tagAttrs=[type,data-node-id,id]`) |
| P3 | §3.5 P3 (l.1181) | `props.data-on:'false'` (the shipped write's shape) | applied — falsy, defined | **PASS** (`data-on="false"` present) |
| P4 | §3.5 P4 (l.1182) + §3a A-3 | `props.tags:['x']`, `props.tags:{a:1}` | not rejected (engine verdict recorded, not pinned) | **PASS** (`applied` ×2) |
| P5a / P5b | §3.5 P5 (l.1183) | `props.X: 0` / `props.X: false` | applied | **PASS** ×2 |
| P6 | §3.5 P6 (l.1184) | `mutation: []` | not rejected (status not pinned) | **PASS** (`applied`) |
| P7 | §3.5 P7 (l.1185) | `{kind:'destroy', node:<resolved>, mutation:[nullish props.hidden]}` | kind-scoped: not intercepted; no throw | **PASS** (`status=applied`, `threw=null`) |
| P7b-i | §3.5 P7b **reworded** (l.1186) + §2.3 kind-scope bullet (l.551-553) + §5.5 P-TP-1 (l.1658) | `layer-apply` carrying a **shape-malformed** element (`[null]`, `[{targetProp:5}]`) | the **decidable** half: rejected — the predicate runs for this kind | **PASS** (`["rejected","rejected"]`, no throws) |
| P7b-ii | §3.5 P7b reworded (l.1186) + §2.3 (l.551-553) — *"the valid-`layer-apply` verdict stays NOT PINNED"* | a mutation-carrying `layer-apply` **and** the valid `target`+`nodes` shape | the amended contract pins **no discriminator**; the row asserts only *no throw + no `applied` claim* | **PASS** (`carryStatus=rejected`, `validStatus=rejected`, `discriminatorAvailable=false`, no throws) |
| E-10 | §2.3 (l.617-620) | `load({kind:'commands', commands:[… nullish props.hidden …]})` | never throws; the nullish command applies as a removal | **PASS** (`threw=null`, `hidden` gone, 0 warnings) |
| E-11 | §2.3 + `runtime-host.md` §2 | `op({kind:'state-slice', …})` | status + render views + warnings; same verdict | **PASS** (`keys=[dirtied,renderedHtml,ssrHtml,status,warnings]`, `applied`) |

### 2.6 Malformed mutations / unknown nodes — §3.6 → M1..M9

| ID | Input | Expected | Result |
| --- | --- | --- | --- |
| M1a/M1b/M1c | `mutation` = `'x'` / `{}` / missing (`state-slice`) | rejected, never thrown (the container guard) | **PASS** ×3 |
| M2a/M2b/M2c | element = `null` / `'x'` / `42` | rejected (the shape gate) | **PASS** ×3 |
| M3a/M3b | element missing `targetProp` / `targetProp: 5` | rejected | **PASS** ×2 |
| M4 | `node` = an unresolvable string | rejected | **PASS** |
| M5 | `node` = `5` | rejected | **PASS** |
| M6 | `node` = `{}` | rejected | **PASS** |
| M7a/M7b/M7c | `cmd` = `null` / `undefined` / `42` | rejected, never thrown | **PASS** ×3 |
| **M9 — pane half (NEW ROW)** | the **fixed six-shape** container table §3.6 `M9`'s landed cell names (`{}`, `undefined`, `'x'`, `42`, `null`, a `Symbol.iterator`-throwing Proxy) handed to `SecurePanels.applyPaneMutation(nodeId, mutation)` | each `{status:'rejected', applied:false}`, nothing applied, last-known render kept, **never a throw** (outcome (i), §2.4b item 1) | **PASS** — all six refused, `anyThrow=null`, `htmlUnchanged=true`, slot kept |

### 2.7 §5.5 register — the deterministic tables

| ID | Doc source | Procedure | Expected observable | Result |
| --- | --- | --- | --- | --- |
| P-IM-1 | §5.5 P-IM-1 / `S-TAB-PAIR-1` (l.1650) | 2 envelopes × 2 legs × fixed tag order; compare `attrsPresent` sets | the two legs agree per tag | **PASS** (`mismatches=[]`) |
| P-IM-2 | §5.5 P-IM-2 (l.1651) | the 4-key × 3-count table + the `value` extension | idempotence | **PASS** (`mismatches=[]`) |
| P-IM-4a (R-14) | §5.5 P-IM-4 / `S-READ-JSON-1` (l.1657) + §2.1 (l.336-338) | read `package.json` + the installed manifest | `^0.5.1` declared / `0.5.1` installed | **PASS** |
| P-IM-4b (R-16/R-17) | §5.5 P-IM-4 `S-TAB-CYCLE-2` (l.1657) + §4.1 R-16/R-17 (l.1338-1339) | render BASE twice + the boolean-free variant twice | byte-identical cycles; stable census | **PASS** (BASE `{registered:5,inTree:5,…}`; variant `{registered:2,inTree:2,…}`) |
| P-SM-1a | §5.5 P-SM-1 (a) (l.1652) | the fixed 3-batch `{props.hidden:<nullish>, props.title:'t', content:'X'}` with the nullish element rotated through all 3 positions | applied in every rotation; nullish target REMOVED, both others changed | **PASS** (`violations=[]`) |
| P-SM-1b | §5.5 P-SM-1 (b) (l.1652) + §2.3 total refusal | the same 3-batch with one **malformed** element | rejected; no partial application | **PASS** (`violations=[]`, 4 malformed variants) |
| P-SM-2a | §5.5 P-SM-2 / `S-TAB-PASS-1` (l.1653) | fixed 6-value table `['v','',0,false,[],{}]` | none refused | **PASS** (all six `applied`) |
| **P-SM-2b** | §5.5 P-SM-2 **(b)-half RECONCILED** (l.1653) + §2.3 spellings bullet (l.629-646) | fixed 5-spellings × 3-nullish-forms = 15-row table, per-spelling observables | `props.<key>`: removed for `undefined`/`null`/absent; `css.<key>`: removed for `undefined`/absent, **`role="null"` for `null`**; colon twins + bare: **INERT, no removal** | **PASS** (`violations=[]`, 15/15) |
| P-SM-3 | §5.5 P-SM-3 / `S-TAB-PANE-1` (l.1654) | the `PF-1..PF-8` pane table + the seam rows | see §2.8 | **PASS** (11/11, incl. the new `M9` pane half) |
| P-TP-1 | §5.5 P-TP-1 (l.1657) | quantify over every mutation reaching the command surface | the spec itself marks it `NOT EXECUTED — no PBT harness` | **NOT-BLIND-RUNNABLE** (§4) |
| P-TP-2 | §5.5 P-TP-2 / `S-TAB-OFF-2` (l.1656) | the fixed 16-row table | never `k="false"` on either leg | **PASS** — B-09 |
| REG-1 | §5.5 register count (l.1659-1666) + the block-6/block-7 change summaries (l.1681-1712) | repeat the spec's own arithmetic | 8 rows = 4 `P-IM` + 3 `P-SM` + 2 `P-TP`; 7 executed deterministically; 1 (`P-TP-1`) `NOT EXECUTED` | **PASS** (this run drove 7 of the 8; the arithmetic reconciles) |

### 2.8 The pane fixture rows — §2.4a `PF-1..PF-8` + the parity/seam rows

`pane()` = `new SecurePanels(mountEl())`; `await refresh()`. **The pane node's engine `nodeId` is
resolved from the pane mount's emitted `data-node-id`** (the vocabulary of §2.4b item 4 + §4.2's
amended bullet); the input's `value` slot/attribute is read through the class's own
`adapter.wires` map — the engine's published adapter surface, not a private field of the class.

| ID | Doc source | Injected | Expected (all `not.toThrow()`) | Result |
| --- | --- | --- | --- | --- |
| PF-1 | §2.4a PF-1 (l.746) + §2.4b item 4 (l.995-1042) | `props.value:'7'` on the pane node whose authored label is `journal-length-input`, addressed **by its engine nodeId** | applied, `applied:true`; the slot is `'7'` | **PASS** (`{status:'applied',applied:true}`, slot `"7"`) |
| PF-1b | §2.4b item 1 (l.1020-1042) + item 2 (l.1044-1064) | an authored `props.id` **and** an unknown/foreign nodeId passed to the seam | `applied === (status === 'applied')`: an engine refusal is `{status:'rejected', applied:false}` | **PASS** (both `{status:'rejected',applied:false}`) |
| PF-2 | §2.4a PF-2 (l.747) + §2.4a.1 item 2 (l.850-858) + §2.2.1 item 1 | `props.value: undefined` after a defined `'7'` write | `el.value === ''`, `el.value !== '7'`, `getAttribute === null` | **PASS** (slot `""`, attr `null`) |
| PF-3 | §2.4a PF-3 (l.748) + §3.4 PA-2 boundary | `props.value: null` | applied; prior `'7'` not retained; exact form recorded, not pinned | **PASS** (`slot="null"` — the documented `String(null)` form) |
| PF-4 | §2.4a PF-4 (l.749) + §3.4 PA-4 | `props.value` with the key **absent** | same as PF-2, pinned as `el.value === ''` | **PASS** (slot `""`, attr `null`) |
| PF-5 | §2.4a PF-5 (l.750) + §3.6 M8 (l.1199) + §2.4b outcome (i) | a shape-malformed **element** (`null` / no `targetProp` / non-string `targetProp`) | `{status:'rejected', applied:false}`; nothing applied; last-known state still rendered | **PASS** ×3 (`slotUnchanged=true`, `htmlUnchanged=true`) |
| PF-6 | §2.4a PF-6 (l.751) | `props.data-on:'false'` on the `toggle:read` pane node (by nodeId) | applied; `data-on="false"` renders | **PASS** (`<label … data-on="false" …>` ) |
| PF-7 | §2.4a PF-7 (l.752) | PF-2's mutation **plus** a defined write in the same call; a sibling pane's tag compared before/after | other panes untouched | **PASS** (`siblingSame=true`, `placeholderKept=true`, slot `""`) |
| PF-8 | §2.4a PF-8 (l.753) | a repeated PF-2 | still applied, no throw, state identical | **PASS** (`htmlIdentical=true`) |
| PF-1v | §8 block-6 note + §2.4a.1 scope question (l.860-871) | does a defined `props.value` write ever produce a `value` **attribute** in the pane mount? | per §2.4a.1: the attribute half is **vacuously absent** on the pane path (the slot half is the real assertion) | **PASS** (slot `"7"`, attr `null`, no `value="7"` in the mount) |
| PANE-PARITY | §2.4 (l.713-720) — *"differ in nothing but their container"* | the same 5 shape-malformed elements + an 8-value table through **both** the seam and `Runtime.applyCommand` | identical reject class; no value-shaped write refused at either site | **PASS** (both `["rejected"×5]`; pane value table all `applied`) |
| **PANE-PARITY-2 (NEW ROW)** | §2.4b item 3 (l.1050-1062) + §2.4 (l.721-740) + §3.6 M9 | the **non-array container** (`{}`, `'x'`, `42`, `null`, `undefined`) through **both** channels | the same reject class on both, differing only in the container's shape: a status, never a throw | **PASS** (pane: 5× `{status:'rejected',applied:false}`; Runtime: 5× `{status:'rejected'}`; no throws) |
| PANE-SEAM | §2.4a injection-point row (l.716) + §7.9 (l.1803-1808) + `secure-panels.md` §2a | `Object.getOwnPropertyNames(SecurePanels.prototype)` | `applyPaneMutation` is public (the ONE production seam this unit adds) | **PASS** (`constructor, debugText, dispatch, applyPaneMutation, refreshDebug, refresh, syncConfig, render`) |

### 2.9 Prohibition rows, version/census claims — §0, §2.1, §3b, §4, §5.1

| ID | Doc source | Procedure | Expected observable | Result |
| --- | --- | --- | --- | --- |
| PR-2 | §0 prohibition 4 (l.253) + §5.1 (l.1496-1500) | read `package.json` `scripts` + `dependencies` | no `engine`/`pin` script; dependencies exactly `@modelcontextprotocol/sdk` + `provident-ssr` | **PASS** (11 scripts; 2 dependencies) |
| PR-3 | §2.1 (l.356-362) + §5.5 (l.1638-1641) | read `devDependencies` **keys** | exactly `@types/node`, `electron`, `esbuild`, `typescript`, `vitest` (no PBT harness) | **PASS** (+ the §5.1 item 1 `allowScripts` block `{esbuild@0.28.2: true}` recorded) |
| PR-4 (R-14b / G-07) | §2.1 (l.353-355) + §3.7 (l.1234) | read the installed engine manifest | `type: module`, dependencies empty, a single ESM `main` | **PASS** (`type=module`, 0 deps, `./dist/index.js`, `0.5.1`) |
| G-06 | §0 prohibition 5 (l.254) + R-15 (l.1336) + §3b AF-9 (l.2037) | string census of the built `dist/main/main.cjs`; assert no `provident.focus` and no unlisted `provident.*` name | 18 `provident.*`, the pinned set exactly; no `provident.focus` | **PASS** (18 names, listed; `focusPresent=false`) |
| **G-06b** | §3b AF-9 (l.2037) + §1 (l.304-305) + §0 prohibition 5 (l.254) + amendment block 7's `AF-9` note | extract the bundle's **`ALL_TOOLS` array** and the gate-map `module.*` keys | `ALL_TOOLS` = **21** (18 `provident.*` + the `module.*` trio) **plus 2 gate-only `module.*` group keys** ⇒ a raw tool-ish string census reads **23** | **PASS** (`allToolsCount=21`, 18 + `[module.install, module.update, module.list]`, `gateOnly=[module.disable, module.enable]`, `rawToolishCensus=23`) — **⟶ `rawToolishCensus=23` SUPERSEDED 2026-09-27: the whole-bundle raw string census is RETIRED as an evidence class and the measured value was `24` (normalized) / `29` (raw), not `23` — the `21` half of this row is EXACT and unaffected. See §3a `F-6`'s correction block, `docs/specs/engine-drift-measurements.md` `M-14`, and `docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`.** |
| CEN-1 | §5.5 P-IM-4b + §4.1 R-16 census form (l.1338) | `runtime.census()` on the §4.2 `BASE` envelope | `registered`/`inTree` = 5; the rest 0 | **PASS** |

---

## 3. The second run's six FAILs, re-driven against the amended contract

Each of the second run's FAIL findings is kept verbatim (its measured observation is unchanged), with
the **amended clause** and the **third-run observation**. **All six are now PASS** — every one of them
was a clause the contract has since corrected (or a landed behaviour the implementation has since
changed), **not** a behaviour regression that was waved away. No row was converted without a
re-measurement.

| Second-run FAIL | Second-run doc basis | Amended clause (block 7 / `B-LANDED`) | Third-run observation | Status |
| --- | --- | --- | --- | --- |
| **F-1** (`PA-10` + `P-SM-2b`): a **bare attribute name** documented as a legitimate removal spelling, but INERT on `0.5.1` | `§3.4 PA-10` + `§2.3` covered-spellings + `§3b AF-5` — *"and a bare attribute name … the shim's method performs the removal"* | **`§3.4 PA-10` REWRITTEN** (l.1152): *"the spelling is INERT as a mutation target … NEVER a row that proves a removal"*; **`§2.3`'s spellings bullet** (l.629-646) moves the bare name OUT of the four prefixed removal spellings; **`AF-5`** (l.2037) carries the same correction | `PA-10`: bare `title: undefined` → `applied`, tag **byte-identical** before/after; bare `title:'v'` → identical; the `props.title` control **does** remove. `P-SM-2b`: all 5 bare rows assert **inertness**, all 15 rows pass | **PASS** |
| **F-4** (`P-SM-2b`): `css.<key>` + **`null`** presented as a removal; the engine stringifies it | `§5.5 P-SM-2`'s (b)-half — *"for the four prefixed spellings … the attribute absent"* | **`§5.5 P-SM-2`'s (b)-half RECONCILED** (l.1653): *"`css.<key>` with `null` ⇒ NOT removed — the engine STRINGIFIES it (`role="null"`) … never absence"*; the colon twins and bare names ⇒ inert | `P-SM-2b` asserts the **per-spelling observable**: `css.role/null` → `role="null"` retained; `props.hidden/null` → removed; colon twins + bare → unchanged; `violations=[]` | **PASS** |
| **F-3** (`P7b-ii`): the `layer-apply` kind-scope half **not decidable** on the public surface | `§3.5 P7b` + `§2.3` — *"the row may assert only 'NOT rejected by the predicate' … a valid `layer-apply` … is the shape that reaches `applied`"* | **`§3.5 P7b` REWORDED** (l.1186): the **malformed half is the decidable row**; *"the `applied`/verdict for a VALID `layer-apply` stays NOT PINNED"*; `§2.3` (l.601-605) states the same | `P7b-i` (malformed) → `rejected` ×2; `P7b-ii` asserts **only** the documented non-pinnability: both shapes `rejected`, `discriminatorAvailable=false`, no throw. **No row claims `applied`** | **PASS** |
| **F-2** (`PF-1`): the pane seam does **not** resolve the authored-`props.id` vocabulary | `§4.2` — *"the pane fixture addresses pane nodes by their authored `props.id` because that is the vocabulary `SecurePanels` itself uses"* | **`§4.2`'s sentence SUPERSEDED** + **NEW `§2.4b` item 4** (l.995-1042): the parameter is the **engine `nodeId`**; the harness resolves it from the pane graph's node list; a `listTargets`-analogue is **recommended, parked (§7.11), NOT admitted**; `§2.4a`'s PF-table preamble (l.783-793) relabels the authored ids as harness labels | `PF-1` addressed **by the engine nodeId resolved from the mount's `data-node-id`** → `{status:'applied', applied:true}`, slot `'7'`; `PF-1b` passes the authored id → `{status:'rejected', applied:false}` (the documented outcome (iii)) | **PASS** |
| **F-5** (`PF-1b`): the documented refusal shape did not hold for an unresolved target | `§2.4a` injection row — *"on `false` it returns `{status:'rejected', applied:false}` … returning the engine's `status`"* | **`§2.4a`'s two-branch cell SUPERSEDED**; **NEW `§2.4b` item 1** (l.1020-1042): *"`applied` must mean 'the ENGINE applied it', i.e. `applied === (status === 'applied')`; a refusal is never reported as applied"*, with the three reachable outcomes; + `B-LANDED` states the landed seam derives it | the seam now returns `{status:'rejected', applied:false}` for **both** an authored `props.id` and a foreign nodeId (measured; `PF-1b` PASS) | **PASS** (landed behaviour changed — measured, not assumed) |
| **F-6** (`G-06b`): the census count claim (`ALL_TOOLS` = 21) vs the built artifact (23 tool-ish names) | `§0` prohibition 5 / `§1` / `R-15` / `§3b AF-9` — *"`ALL_TOOLS` was 21 names … 18 `provident.*` + the `module.*` trio"*; `AF-9` records the 21-vs-23 question as **NOT resolved here** | `AF-9` (l.2037) keeps the count freeze and the set-equality rule; amendment block 7 declares the census question a **greens-layer measurement** to be applied at this layer, not a contract change | The bundle's **`ALL_TOOLS` array is exactly 21** (18 `provident.*` + `module.install`/`update`/`list`); the **2** extra tool-ish strings are the gate-map-only group keys **`module.enable`/`module.disable`**. The 23 was a raw literal census over the whole bundle, not an `ALL_TOOLS` measurement | **PASS** (the `21` claim is exact; the `23` is the documented raw-census artifact) — **⟶ the `23` half SUPERSEDED 2026-09-27 (measured `24` normalized / `29` raw; the census class is retired). See §3a `F-6`'s correction block.** |

### 3a. The six findings, kept verbatim (claim / observed / classification) with their discharge

#### F-1 — `PA-10` + `P-SM-2b`: a **bare attribute name** documented as a legitimate removal spelling; on `0.5.1` it is **inert as a mutation target** — *was: doc drift (over-stated capability)*

- **Claim (second-run text).** `§3.4 PA-10` + `§2.3` "the covered spellings" + `§3b AF-5`: a nullish
  write may use `props.<key>`, `css.<key>`, `props:<key>`, `css:<key>` **"and a bare attribute name
  (`targetProp:'hidden'`, no prefix), which the engine's adapter also routes to `removeAttribute`"** —
  *"the shim's method performs the removal"*.
- **Observed (second run, rows `PA-10` / `P-SM-2b`).** Three probes on an authored-attribute node, all
  `{status:'applied'}` with a `dirtied` entry: bare `title: undefined` → DOM unchanged
  (`<div title="x" id="t">` before and after); bare `title:'v'` → unchanged; the `props.title` control on
  the same node → `<div id="t">` (removed). Across the 15-row `P-SM-2b` table every bare-`title` row
  failed the "attribute absent" claim while all four **prefixed** spellings passed it.
- **Classification (second run):** doc drift — the spelling list over-stated a capability; **no host or
  engine code change implied**.
- **Discharge (amended contract).** `§3.4 PA-10` (l.1152) was **rewritten**: the bare spelling is
  **INERT**, *"NEVER a row that proves a removal"*; `§2.3`'s spellings bullet (l.629-646) keeps only the
  **four prefixed spellings** in the removal list; `§3b AF-5` (l.2037) carries the same correction and
  keeps the SUPERSEDED sentence in place.
- **Third-run observation (row `PA-10`, tag compared after **each** call):** `tagBefore ==
  tagAfterBareNullish == tagAfterBareDefined` (all `<div title="x" …>`), `tagAfterPropsControl` has no
  `title=` → **PASS**. `P-SM-2b`'s bare rows assert **inertness** → **PASS**.

#### F-4 — `P-SM-2b`: `css.<key>` + **`null`** presented as an attribute removal; the engine **stringifies** it — *was: doc drift / internal inconsistency*

- **Claim (second-run text).** `§5.5 P-SM-2`: the (b) half of `S-TAB-PASS-1` is *"a fixed 5-spellings ×
  3-nullish-forms … table … each asserting `NOT rejected by the predicate` **and (for the four prefixed
  spellings with an authored-attribute node) the attribute absent**"*; `§3.4 PA-2`'s boundary sentence
  says *"`null` is an attribute **removal** on the **attribute** paths"*.
- **Observed (second run, row `P-SM-2b`).** `css.role: null` → `{status:'applied'}` with `role="null"`
  still present (stringified, not cleared). The other 14 rows behaved as documented; `props.hidden` ×
  (`undefined`/`null`/absent) all removed.
- **Context then recorded:** the supervisor had **already adjudicated this conflict** Test-side
  (`docs/next-steps.md`, cited by section — its `## HANDOVER UPDATE 2` adjudication table's row 1;
  that file's pre-amendment execution log is archived, so it must never be cited by line) and `§8`
  called it TEST-ONLY — **but the register cell had never been
  amended**, so the contract contradicted itself.
- **Discharge (amended contract).** `§5.5 P-SM-2`'s (b)-half is **reconciled** (l.1653) to the **true
  per-spelling observables**: `props.<key>` ⇒ removed (`undefined`/`null`/absent); `css.<key>` ⇒ removed
  for `undefined`, **stringified (`role="null")** for `null`; colon twins and bare names ⇒ **inert, no
  removal observation** — *"No row of this table may assert 'the attribute absent' for a
  `null`+`css.<key>`, colon, or bare-name spelling."*
- **Third-run observation (row `P-SM-2b`, 15/15):** `violations=[]` → **PASS**.

#### F-3 — `P7b-ii`: the `layer-apply` kind-scope half is **not decidable on the public surface** — *was: unexecutable as written at this layer*

- **Claim (second-run text).** `§3.5 P7b` + `§2.3`: *"the predicate **does run for this kind** … the row
  may assert only **'NOT rejected by the predicate'** … or **the engine's own verdict, NOT PINNED** … a
  row that wants the kind-scope proven drives a **valid** `layer-apply` (`target` + `nodes`)"*.
- **Observed (second run, row `P7b-ii`).** **Both** shapes returned the same opaque
  `{"status":"rejected"}` — a mutation-carrying `layer-apply` **and** the spec's own valid shape — so
  `status !== 'rejected'` cannot attribute the verdict. The **decidable** half was green (`P7b-i`: a
  `layer-apply` carrying a shape-malformed element is rejected).
- **Classification (second run):** unexecutable as written — the contract asked for a distinction the
  public `status` field does not carry; **never converted to a pass**.
- **Discharge (amended contract).** `§3.5 P7b` (l.1186) was **reworded**: the **shape-malformed half is
  the decidable row** ("that is the observation that goes red if the predicate is removed"), the
  **valid-`layer-apply` verdict stays NOT PINNED**, and *"a row may NOT assert `status === 'applied'`
  here"*; `§2.3` (l.601-605) states the same and marks the old wording SUPERSEDED.
- **Third-run observation:** `P7b-i` → `["rejected","rejected"]`; `P7b-ii` asserts only *no throw +
  no `applied` claim* and records `discriminatorAvailable=false` → **PASS** (the row is now stated in
  its decidable form, not converted).

#### F-2 — `PF-1`: the pane seam does **not** resolve the authored-`props.id` vocabulary the contract names — *was: doc drift (unstated surface requirement)*

- **Claim (second-run text).** `§2.4a` defines
  `SecurePanels.applyPaneMutation(nodeId: string, mutation: unknown[]): { status: string; applied: boolean }`;
  `§4.2` states the pane fixture *"addresses pane nodes by their **authored `props.id`** because that is
  the vocabulary `SecurePanels` itself uses"*; `PF-1` is written as `props.value:'7'` **on
  `journal-length-input`**.
- **Observed (second run, rows `PF-1`, `PF-1b`).** `applyPaneMutation('journal-length-input', …)` →
  `{"status":"rejected","applied":true}` with the slot staying `""`; the identical call with the pane
  node's **engine nodeId** (`'node-21'`) → `{"status":"applied","applied":true}`, slot `"7"`. Same for
  `toggle:read`. Noted then: the authored vocabulary **does** work on the app channel
  (`Runtime.applyCommand({node:'tgt'})`) — so this was a **pane-seam** behaviour, not an engine rule.
- **Classification (second run):** doc drift (unstated surface requirement) + a real mismatch between
  the documented argument contract and the landed method.
- **Discharge (amended contract).** `§4.2`'s sentence is **SUPERSEDED** in place and replaced by the
  amended bullet (l.1601-1614); **`§2.4b` item 4** (l.995-1042) **decides** the vocabulary: the parameter
  is the **engine `nodeId`**, *"no documented route converts an authored `props.id` into it"*, the
  resolution route a caller may use is the **host's own id index**, the test-side resolution is a
  **harness detail**, and a pane-side `listTargets`-analogue is **recommended, parked in §7.11, NOT
  admitted**. `§2.4a`'s PF-table preamble (l.783-793) relabels every authored id in the `PF-*` cells as a
  **harness label, never the seam's argument**.
- **Third-run observation (row `PF-1`):** the pane node's engine nodeId, resolved from the mount's
  emitted `data-node-id`, gives `{status:'applied', applied:true}` and slot `'7'` → **PASS**; row
  `PF-1b` reproduces the documented outcome (iii) for the authored id → **PASS**.

#### F-5 — `PF-1b`: `applyPaneMutation`'s documented refusal shape does **not** hold for an unresolved target — *was: doc drift (return-shape claim)*

- **Claim (second-run text).** `§2.4a`'s injection row: *"It (a) runs `paneMutationValid(mutation)`, and
  (b) on `true` calls `this.supervisor.apply({kind:'state-slice', node, mutation})` + `this.render()`,
  **returning the engine's `status`**; on `false` it returns `{ status: 'rejected', applied: false }` and
  applies nothing."*
- **Observed (second run, row `PF-1b`).** For an **unresolved** `nodeId` the method returned
  `{"status":"rejected","applied":true}` — the engine's `rejected` in `status`, the **predicate's** `true`
  in `applied`. `PF-5`'s shape failures behaved exactly as documented, so the drift was specifically the
  **third** outcome (predicate passes, engine refuses) that the two-branch description did not cover.
- **Classification (second run):** doc drift — the description omitted the engine-refusal branch.
- **Discharge (amended contract).** `§2.4a`'s two-branch cell is **SUPERSEDED** in place;
  **`§2.4b` item 1** (l.1020-1042) pins the return shape: *"`applied` must mean 'the ENGINE applied it',
  i.e. `applied === (status === 'applied')`; a refusal is never reported as applied"*, with the **three**
  reachable outcomes and the reachable refusal cause (unknown/foreign `nodeId` ⇒ `getNode` `undefined` ⇒
  the engine's `unknown-node`). The block-7 **`B-LANDED`** follow-up records that the landed seam
  **derives** `applied` and the predicate carries the container guard — i.e. the **implementation changed**
  as well as the text.
- **Third-run observation (row `PF-1b`):** both an authored `props.id` **and** a foreign nodeId now
  return `{status:'rejected', applied:false}` (`applied === (status === 'applied')`) → **PASS**
  (measured, not assumed).

#### F-6 — `G-06b`: the census count claim (`ALL_TOOLS` = 21) vs the built artifact (23 tool-ish names) — *was: doc/measurement item, unresolved at this layer*

- **Claim (second-run text).** `§0` prohibition 5 / `§1` / `R-15` / `§3b AF-9`: *"`ALL_TOOLS` was **21**
  names … 18 `provident.*` + the `module.*` trio"*; `§3b` states the `21`-vs-`23` question is **NOT
  resolved here** and is *"a doc/measurement item for the doc review, not a contract change"*.
- **Observed (second run, row `G-06b` — the artifact the battery leg drove at 184/0).** **18**
  `provident.*` + **5** `module.*` = **23**, `module.exports` excluded as esbuild's interop helper; the
  two names over the trio were **`module.enable`/`module.disable`**; the set-equality half of `R-15`
  pins 21 and the repo suite was green, so the two extra strings were **not** members of the
  `ALL_TOOLS` set-equal list — the gap was between the **bundled string census** and the **pinned set**.
- **Classification (second run):** doc/measurement drift, unresolved at that layer (settling it would
  have meant reading `src/main/mcp-server.ts`, forbidden there).
- **Discharge (this run — the layer the amendment assigns the question to).** Amendment block 7's `AF-9`
  declares the `21`-vs-`23` question a **greens-layer measurement**; `AF-9` (l.2037) keeps the count
  freeze as exact and time-bounded. **The row was re-expressed to measure what the claim is about** —
  the bundle's **`ALL_TOOLS` array** — instead of a whole-bundle literal count:
- **Third-run observation (row `G-06b`, `dist/main/main.cjs` after this run's build):**
  **`ALL_TOOLS` = 21** — 18 `provident.*` + `module.install`/`module.update`/`module.list` — plus the
  **2** gate-map-only group keys `module.enable`/`module.disable`, i.e. a raw tool-ish literal census
  reads **23** exactly as the second run measured. **The `21` claim is exact and the 23 is the
  documented raw-census artifact** → **PASS**. The positive half (`G-06`) is unchanged: no
  `provident.focus`, and the 18 names are set-identical to the pinned list.
- **⟶ CORRECTION (2026-09-27, `U-ENGINE-DRIFT`'s measurement pass — `docs/specs/engine-drift-measurements.md`
  `M-14`, `DRIFTED`; the tracker half is `docs/decisions.md` `RAW-STRING-CENSUS-RETIRED` +
  `docs/pending.md` §C's `ALL-TOOLS-CENSUS-CLAIM` row).** **The `23` is SUPERSEDED and the whole-bundle
  raw string census is RETIRED as an evidence class.** Measured on the drift pass's **own** `npm run
  build` of `dist/main/main.cjs`, with the command and the two normalizations stated in `M-14`
  (tokens matching `[a-z][a-zA-Z]*\.[a-zA-Z_][a-zA-Z0-9_.]*`, filtered to the `provident`/`module`
  prefixes; normalization = trailing dots stripped, `module.exports` excluded as esbuild/Node
  interop): **`24` normalized** (`18 provident.*` + `["module.disable","module.enable","module.fetch",
  "module.install","module.list","module.update"]`) and **`29` raw** (trailing-dot artifacts kept).
  **The delta from this row's `23` is exactly one name: `module.fetch`**, whose only bundle occurrence
  is the **error-message literal** `module.fetch: network is deferred (M-r12)`
  (`src/renderer/extensions.ts:132`, read). **This row's `ALL_TOOLS` half stands EXACT** — the bundle's
  `ALL_TOOLS` array is **21** (18 `provident.*` + `module.install`/`update`/`list`) and the two
  gate-map-only keys `module.enable`/`module.disable` are as predicted (`M-13`, independently measured);
  **`ALL_TOOLS = 21` is not in question anywhere and no assertion of it is weakened.**
  **Named fault (the honest form of the correction): this row's `23` was never precise enough to hold.**
  It states **no regex, no prefix filter and no normalization** (the two `module.*`-prefix filters and
  the trailing-dot exclusion are properties of an unreported command), and **its own enumeration leaves
  one `module.*` name unexplained** — a count whose command is under-specified, and whose arithmetic
  does not close over the names it lists, cannot carry a claim. **The `PASS` verdict on the `21` half
  is therefore unchanged, and this row is retained verbatim above as the run's own observation** —
  what is superseded is the **`23` count and the census that produced it as an evidence class**, not
  the `ALL_TOOLS` measurement.
  **Retirement (the decision, recorded in `docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`):** the
  **whole-bundle raw tool-ish string census is RETIRED as an evidence class.** The count authority is
  **`ALL_TOOLS` set-equality** (`tests/engine-pin-version.test.ts` `R-15`'s `PINNED_TOOL_SET`
  comparison) **plus the `RpcMethod` census `R-15b`** — which already carry the count. The reason is
  structural, not cosmetic: **a census that counts error-message literals cannot detect a tool-set
  change.** It reads the same `24` (or `23`, or `29`) whether a tool is added, removed or renamed,
  because its population is *strings* and the claim it was asked to support is *a set of tools* —
  `module.fetch` is the demonstration, and any future literal `provident.<something>` in an error text
  would be the next one. **A count is therefore only taken by a set comparison over the declared list
  (`R-15`/`R-15b`); no row of any set may rest on a whole-bundle literal census again.** *(A future
  census is admissible only as a **reproducible command with its regex, its prefix filter and its
  normalizations stated**, and then only for a question about **literals**, never as the count of a
  declared tool set.)*
- **What is NOT changed by the correction, stated so no later pass over-reads it:** the `21` count,
  the `18 + module.* trio` split, the two gate-only group keys, `G-06`'s positive half
  (`focusPresent=false`), `R-15`'s set-equality obligation, `R-15b`'s `RpcMethod` census, and the
  `F-6` finding's own discharge. **No assertion is weakened and no row's `PASS` is withdrawn.**

### 3b. New rows and splits

**New rows added by this run** (they exist because the amended contract names behaviour no earlier run
drove): **`S-18`** (§2.2.1 item 3's widened key+tag scope — both adapter removal routes),
**`M9 (pane half)`** (§3.6 `M9`'s fixed six-shape container table through the public seam),
**`PANE-PARITY-2`** (the same container class on both channels). Rows **split** so each state is its own
row: `M1a/M1b/M1c`, `M2a/M2b/M2c`, `M3a/M3b`, `M7a/M7b/M7c`, `P5a/P5b` (the second run grouped some of
these; the split changes the count, never a verdict).

**Rows whose status could have moved because the implementation changed — all re-checked:**
the **pane rows** (`PF-*`, `PANE-PARITY`, `PANE-SEAM`), the **shape-refusal rows** (`M1..M9`,
`P-SM-1b`) and §2.4b's **three outcomes** (`PF-1`, `PF-1b`, `PF-5`) were all re-driven in this run;
`PF-1`, `PF-1b` and the new `M9`/`PANE-PARITY-2` rows are the ones the change is visible in.

---

## 4. Not blind-runnable at this layer (recorded, never converted to a pass)

| ID | Doc source | Why it cannot be blind-run at this layer | Compensating evidence |
| --- | --- | --- | --- |
| **P-TP-1** | §5.5 P-TP-1 (l.1657) — the command-surface totality property | The property **quantifies over every input**; a table can only sample, and the repo has **no PBT harness** (verified this run: `devDependencies` = `@types/node`, `electron`, `esbuild`, `typescript`, `vitest`). **The spec itself marks the row `NOT EXECUTED — no PBT harness`.** | Every **compensating example-based row the spec names** was reproduced in this run: `PA-1..PA-11`, `PF-1..PF-8` (`P-SM-3`), `M2`/`M3`/`M8`/`M9` (§3.6), `P-SM-1`/`P-SM-2`, plus the structural parity rows (`PANE-PARITY`, `PANE-PARITY-2`, `E-10`, `E-11`). A sampled table is **not** the property. |
| **SC-2** | §2.2.1 item 4 (l.569-575) + §2.4a.1 item 4(c) (l.900-906) + §4.4 (l.1320-1330) | The **real-DOM** half. `§2.2.1`'s semantics note is the **shim's own contract**, explicitly *"NOT a claim about `HTMLElement`"*; no real-DOM attribute row may be made from a node-green, and the only shim-vs-real-DOM check is the Electron divergence script (needs a live window). | Nothing here asserts a real-DOM observable. Every "DOM" row is the repo's `dom-shim` under Node (the layer caveat states this once). `B-11`/`B-12`/`S-18` show the **engine's** own DOM path reaching the shim completion — the strongest reachable form of this claim at this layer. |
| **SC-3** | §5.2 (l.1558) + §7.2 (l.1798-1826) — the **test-side items** | The spec records test-side items (the `§2.2.1` regression row under `tests/dom-shim-remove-attribute.test.ts`; the `PF-1` assertion reconciliation) — and the `M9`/`PF-1b` re-writes. A blind writer **may not read `tests/**`** to derive a row, so the landed byte-form is not a leg of this set. | The **behaviour** those rows assert is green at this layer (`S-08..S-18` cover every state of `§2.2.1`'s table; `M9`'s six-shape table, `PF-1b`'s two id forms and the three outcomes are all driven here), and the repo suite reports **789 passed / 2 skipped / 0 failed** — i.e. **no landed row contradicts** it. **Documentation-review resolution (2026-09-27): the items are LANDED, not owed** — the `value`-special-case row and the value-case idempotence table are in `tests/dom-shim-remove-attribute.test.ts` (`R-10 (value sibling, §2.2.1)` + the `P-IM-2 … value-case` table), and `M9`/`PF-1b` landed as recorded in §3b's `B-LANDED` row; the two **fixture-data** items (`PF-5`/`PF-7` `build()` coverage, spec §7.12/§7.13) remain genuinely owed and are **test-side only**. |
| **DIV-1** | §5.3 leg 6 + §4.4 (l.1320-1330) + §7.4 | The divergence leg **is a leg of this unit** (ruling 3) but needs a **live Electron window** (Chromium `/dev/shm` + a `DISPLAY`). **Environment limitation, not a doc gap:** the architect measured **SIGTRAP** (early browser init, **before** `renderer ready — MCP backend armed`; `R13` 1 check / 2 failures). | The leg's expected evidence and scope are recorded (`R13 RESULT: <N> checks, 0 failures`, exit 0; eight structural comparisons; **not** an attribute-serialization check — `H-r10` is still owed). The reachable structural substitute — the battery leg (§5.3 leg 5) — was run here at **184 checks / 0 failures**. **No real-DOM claim is made anywhere in this set.** **⟶ RESOLVED (2026-09-27, the DONE pass): the leg is GREEN — `R13 RESULT: 9 checks, 0 failures` on the post-change tree**, after the supervisor landed the harness spawn fix (`--disable-dev-shm-usage` + a fresh scratch `--user-data-dir`; `U-DIVERGENCE-EXT` **inherits** it). **This row is therefore no longer a NOT-BLIND-RUNNABLE item — the leg itself ran; what remains unrunnable at THIS layer is the window, not the leg.** **One live finding is recorded OUTSIDE this unit's scope: `LIVE-OP-REJECT`** — the assembled app's `provident.op` refuses every command shape (root cause: this repo's renderer IPC unwrap, `src/renderer/renderer.ts:38`, **untouched** by this unit), filed as a **HOST** defect in `docs/defects.md`. **⟶ SINCE FIXED + LIVE-VERIFIED (2026-09-27, the fix pass): the renderer unwrap + the new `tests/op-command-unwrap.test.ts` rows; see `docs/defects.md`'s `## FIXED (in this repo)` section.** **It contradicts no row of this set:** the `PA-*`/`P*`/`E-11` rows below were driven on the `Runtime` bundle under node and **never over the app's IPC/MCP transport**, so those rows are envelope-layer — and the leg never calls `provident.op`, so a `9/0` R13 is **silent** on it. |
| **H-01 (carried)** | §2.2 item 7 + §3.7 — the graph-engine (`Supervisor` → `renderProducingProcess`) route for `css.<key>`+undefined | Still **no documented host recipe** for that route at this layer: the spec names the engine call site, not a public recipe a blind writer may build. Kept as an unresolved surface gap, **not** converted. | Its substance is covered: `B-12` (the engine's published `DomAdapter` route, instrumented — `calls=["role"]`), `PA-5` (the full graph through `Runtime` — `css.role: undefined` removes) and the new `S-18` (both engine adapter removal routes + the store-only control). |

**Carried rows for continuity (not counted as rows of this run):**

- **`H-02` — RESTATED: RUNNABLE NOW.** The second run's "pane predicate unreachable" false-green is
  discharged: `PF-1..PF-8` + the `M9` pane half were **driven** in this run, all PASS.
- **`H-03` — RESTATED: no longer a claim.** `R-16`/`R-17` were relabelled **forward pins on `0.5.1`**
  (`§4.1`, `AF-1`/`AF-2`); this run asserts the determinism form (`P-IM-4b`).
- **`B-10` — recorded, not asserted:** the boolean member with a `null` **value**. Run on the DOM leg
  and observed (`attr=null`, `<div></div>`, i.e. OFF), but `§3.3`'s `null` row keeps the `null`
  **member** case outside this unit's pin (`§3a A-4` / `§3b AF-4`).
- **`PA-9`'s inertness** is asserted only as *"nothing throws and `role` is still present"* — the spec
  pins **no verdict** for the colon spelling, so no stronger claim is made.

**No row in this run asserts `applied` for a mutation-carrying `layer-apply`** (§2.3's consequence
clause, l.601), and **no row asserts a bare-name or colon-spelling removal** (l.629-646, l.1151-1152).

---

## 5. Exact commands

```bash
# 0. bundle the repo's own modules into /tmp (import-only: no repo file was read; the engine stays external)
cd "/media/ryanr/Shared Files/Projects/Provident-Electron"
mkdir -p /tmp/engine-pin-blind3/bundle
node_modules/.bin/esbuild src/shared/dom-shim.ts src/renderer/runtime.ts \
  src/renderer/secure-panels.ts src/shared/types.ts \
  --bundle --platform=node --format=esm --external:provident-ssr --external:'provident-ssr/core/*' \
  --outdir=/tmp/engine-pin-blind3/bundle --out-extension:.js=.mjs
ln -sfn "$PWD/node_modules" /tmp/engine-pin-blind3/node_modules   # so the /tmp bundle resolves the installed engine

# 1. this scenario set (authoritative)
node /tmp/engine-pin-blind3/run-all.mjs \
  # TOTALS {"total":104,"pass":96,"fail":0,"nbr":5,"recorded":1,"restated":2}

# 2. corroboration (RUN, not read) — the trio + the battery leg of engine-pin.md §5.3
npm test            # 55 files / 789 passed, 2 skipped, 0 failed  (exit 0)
npm run typecheck   # clean (exit 0)
npm run build       # 5 bundles, clean (exit 0) — re-read dist/main/main.cjs after this for G-06b
npm run battery     # BATTERY RESULT: 184 checks, 0 failures (exit 0)

# 3. NOT runnable in this environment — the divergence leg (§5.3 leg 6): needs a live Electron window
#    npm run divergence      # run-time signature: SIGTRAP at early browser init (before "renderer ready …")
#    ⟶ SUPERSEDED 2026-09-27 (DONE pass): the leg IS runnable with the landed harness spawn fix
#       (--disable-dev-shm-usage + a fresh scratch --user-data-dir) and reports:
#       R13 RESULT: 9 checks, 0 failures
```

`npm run divergence` was **not** run **by this blind run** (see `DIV-1`, §4) — it was run
**afterwards, by the supervisor on the post-change tree**, and it is **GREEN**
(`R13 RESULT: 9 checks, 0 failures`). The trio and the battery **were** run by this blind run, and
their summaries are quoted above as **corroboration only** — per §4.4, a node-suite green is
envelope/pure-layer evidence and is **not** assembled-app evidence. **The same qualification
applies to the divergence leg in the other direction:** it is assembled-app evidence for the
**structural** surfaces it compares, and it asserts **no** attribute row and **nothing** about
the app's `provident.op` IPC hop (the `LIVE-OP-REJECT` host defect — **since FIXED +
LIVE-VERIFIED, 2026-09-27**; the leg remains silent on it).

---

## 6. Row-by-row mapping from the earlier runs (65 rows → second run → this run)

| Earlier run | Earlier result | This run | Why it changed |
| --- | --- | --- | --- |
| `S-01..S-07` | PASS ×7 | `S-01..S-07` | unchanged (same `§3.2` states) |
| `B-01..B-07`, `C-01..C-07` | PASS ×14 | `B-01..B-13` | consolidated to one leg per state + the instrumented-completion rows |
| `D-01..D-08`, `E-08` (**reject** rows, `G1..G8`) | PASS ×9 as reject rows | **SUPERSEDED BY RULING 1** → `PA-*` APPLIED rows | the contract's §3.4 is the pass-through table; `G8` stands as `PA-11` |
| `E-01..E-10` (pass-through) | PASS ×10 | `P1..P7`, `P7b-i/ii`, `E-10`, `E-11` | extended by the kind-scope rows and the `op()` seam |
| `F-M1..F-M7` | PASS ×14 | `M1a..M7c` + **`M9`** | the container class was added by block 7 item B (and has since landed) |
| `G-01..G-08` | PASS ×8 | `P-IM-4a/4b`, `PR-2..PR-4`, `G-06`, **`G-06b`**, `CEN-1` | the census row is now exact (`ALL_TOOLS` = 21 vs the 23-literal raw census) — **⟶ the `23`-literal half is SUPERSEDED 2026-09-27 (measured `24`/`29`; the whole-bundle raw census is RETIRED as an evidence class): see §3a `F-6`'s correction block. The `ALL_TOOLS` = 21 half is EXACT and is the count authority (`R-15` set-equality + `R-15b`).** |
| **`H-01`** | NOT BLIND-RUNNABLE | **still NOT BLIND-RUNNABLE**, substance covered (`B-12`, `PA-5`, new `S-18`) | the `Supervisor` route still has no documented recipe |
| **`H-02`** | NOT BLIND-RUNNABLE | **RUNNABLE — `PF-1..PF-8` + `M9` pane half, all PASS** | the injection seam exists and the nodeId vocabulary is documented (§2.4b item 4) |
| **`H-03`** | NOT BLIND-RUNNABLE | **no longer a claim** | `R-16`/`R-17` are forward pins on `0.5.1` |
| — | — | **`S-18`, `PANE-PARITY-2`, `M9 (pane half)`** | **NEW ROWS** from the block-7 amendments (`§2.2.1` item 3's width; `§2.4b` item 3's container class) |

**Status arithmetic:** first run **65 rows / 62 PASS / 0 FAIL / 3 NOT-BLIND-RUNNABLE**; second run
**100 rows / 90 PASS / 6 FAIL / 4 NOT-BLIND-RUNNABLE**; this run **104 rows / 96 PASS / 0 FAIL /
5 NOT-BLIND-RUNNABLE** (+ 1 `recorded`, 2 `RESTATED`). Rows whose **status** changed since the second
run: `PA-10` FAIL→PASS, `P-SM-2b` FAIL→PASS (F-1/F-4 discharged by the amendments), `P7b-ii`
FAIL→PASS (reworded to its decidable form), `PF-1` FAIL→PASS, `PF-1b` FAIL→PASS (the documented
nodeId vocabulary + the measured `applied` derivation), `G-06b` FAIL→PASS (the exact `ALL_TOOLS`
extraction). **No row moved the other way, and no row was converted to a pass without a fresh
observation.**

---

**Authored and run by** a blind-test writer who read **only** the documentation listed at the top of
this file plus the engine's published type declarations, the installed dist's public surface and the
built bundle (the artifact the contract's own `AF-9` names), and who never opened a file under
`src/**` and never read a file under `tests/**` to derive a row. Any row that could not be driven from
a documented surface is recorded as `NOT-BLIND-RUNNABLE` with its reason — none was converted into a
pass. The previous run's six FAIL findings are retained verbatim in §3 with the amendment that
discharged each; **no FAIL is deleted**.
