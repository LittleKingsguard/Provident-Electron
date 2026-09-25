# Green Scenarios — `U-PROJ` (the pure projection + **total** applier) — blind run

**Status: `BLIND RUN (one pass) — 75 executed scenario rows: 69 PASS / 2 FAIL / 4 NOT-BLIND-RUNNABLE`**

**No FAIL was converted, no row was re-scoped to reach a pass, no row was softened, and no
`NOT-BLIND-RUNNABLE` row was scored as a pass.**

| | |
| --- | --- |
| **Unit** | `U-PROJ` — the **projection half** of `SCH-8` (`project(values, specOf)` + the total applier) |
| **Wave** | **D** (the last wave-D unit; `U-MOUNTGUARD` → `U-LISTHOST` → `U-SLOTHOST` → this unit, all three predecessors `DONE`) |
| **Gate** | **5 — the blind green-scenario pass** (`AGENTS.md` item 10a / RCA-4) |
| **Date (filing calendar)** | **2026-09-27**. The host clock reads **2026-09-25** (`date -u` → `Fri Sep 25 08:05:20 AM UTC 2026`) during this work — the same host-clock-vs-filing-calendar offset `docs/specs/listhost-greens.md` and `docs/specs/slothost-greens.md` record. **Cite the filing date.** |
| **Tree state (HEAD)** | **`d1e4b27`** — `U-PROJ: in-progress gate record + handover (gate 3 closed green; gates 4-7 and the DONE row OWED)` |
| **Working tree** | **clean** before this pass and **clean** after it (the four temporary runner files are **deleted** — §10) |
| **Authored from** | **THE DOCUMENTATION ONLY.** The implementation was **never read** and the unit's red set was **never read**. |

**Authored and run WITHOUT reading the implementation.** The documentation read to derive every
scenario was: **`docs/specs/projection.md`** in full — the status notes, §0 and **§0A** (the four dated
architect rulings: `A-11` reuse · `A-2`/`F-4` `'accessor-threw'` · `A-3` `Object.create(null)` · `A-7`
re-entrancy), the Layer declaration and its four anchors, §1, **§2.1** (every export, signature, return
shape, the skip pattern, the two-halves contract table), **§2.2** (the six prohibitions), **§2.3** (the
write-or-skip rules incl. both `item 8`s), **§2.4** (the projection rule incl. the value-lookup key
clause, the `'accessor-threw'` trigger clause and the `skipped`-order rule), **§2.5** (the
`Object.create(null)` rule and its consequences), **§3.1** `M-1`..`M-22`, **§3.2** `F-1`..`F-15`
(`F-4A`/`F-4B` split), **§3.3** `I-1`..`I-14`, **§3.4** `R-17`..`R-21`, **§3.5** `R-22`/`R-23`, §4.1–§4.5,
**§5.1**, **§5.2** (the three legs and the optional `[U]` row), **§5.5**/**§5.5.0**/**§5.5.1** (the 8-row
typed register, its strategy discipline, its pool, its attempt arithmetic and its honesty block), §6,
**§7** items 1–13, **§7a** and **§7a.1** (the eleven ruled ambiguities), §8, and §3a/§3b; plus
`docs/specs/slothost-greens.md` (the **house style** only — a different unit), `package.json`,
`vitest.config.ts` and `tsconfig.json` (to construct a runnable runner), and `AGENTS.md`.

**Files NOT read to derive any scenario's content — recorded so the blindness claim is exact:**

1. **`src/shared/layout-projection.ts` was never opened, never read, never printed.** The module was
   imported as a **black box** (`await import('../src/shared/layout-projection.js')`) and exercised
   through the exported surface `§2.1` names: `project`, `projectVar`, `applyProjection`,
   `applyVarsToRoot`.
2. **`tests/layout-projection.test.ts` (the unit's red set) was never read** — no assertion, name, row or
   fixture of it was inspected. It was **RUN twice for its count only** (§3) and **no scenario, drive or
   expectation here was derived from it**. One of its **failure reports** (while my temporary files
   existed) printed the row id **`R-20`** and its assertion text into this session's transcript — see
   §7.3; that disclosure was **not** used as a source for any drive (a `R-20` drive was already authored
   from `§3.4` before it appeared, and the incidental disclosure is recorded rather than hidden).
3. **`src/shared/dom-shim.ts` was never read by me.** The **runner** read it **as text** for the `R-20`
   probe's `setProperty` census (`PJ-G-62`); the probe asserts a **token count**, and the file's contents
   were not used to author any scenario.
4. **`tests/engine-pin-version.test.ts` was never read by me.** The runner read it as **text** for
   `R-21`'s presence probe (the tokens `PINNED_TOOL_SET`, `RPC_METHOD_CENSUS`, `toBe(21)`) and ran it
   **once for its count** (`Tests 5 passed (5)`).

**The temporary runners.** The scenarios were authored and executed through **temporary** vitest files
inside the repo — **`tests/blind-projection-greens.tmp.test.ts`** (the 75 scored rows) plus three
short-lived diagnostics (`tests/blind-projection-diag.tmp.test.ts`, `…-diag2.tmp.test.ts`,
`…-diag3.tmp.test.ts`) — and **all four are DELETED**; the artifact is this file, not the runner (§10).

---

## 1. Layer declaration — exactly what this run proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own vitest (`vitest` from `package.json`) under node v24.20.0, plus **fake sinks built inside the runner** (`§2.3`'s injected sink shape) | a browser; the assembled app; the engine |
| **[H]** | host-side | this unit's own `src/shared/layout-projection.ts`, **imported as a black box** — its documented surface only | engine-internal behaviour |
| **[S]** | static/structural | file probes the blind rule permits (existence, `package.json` key sets, `git diff --name-only`, a `setProperty` token census over the shim, the presence of the cited seam rows) | a semantic source read of the module |
| **[U]** | real-DOM `ui` leg | **not taken by this run** (`§5.2` makes it OPTIONAL and precondition-gated) | — |

**Honesty anchors, carried so no row over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** No window was
   booted, no IPC round-trip ran, no MCP transport was exercised, and **no real DOM was touched**.
2. **The `[T]` applier in this run is driven against a CALLER-SUPPLIED FAKE SINK** whose `style` has only
   a `setProperty` method (`§2.3`; the Layer declaration's anchor 2: the shim's `style` is
   `{ cssText: string }` with no `setProperty`, so the shim element cannot be the sink). **Therefore
   nothing here is a CSS claim**: the rows assert **the exact strings the sink was handed**, never that a
   browser would accept them (`§4.3`, `§7` item 10, `S-7`).
3. **The module is a pure `src/shared/` module imported by NO `src/**` file** — this run adds no
   evidence that any page, pane or shell uses it; that is the assembler's question.
4. **The property register (`§5.5.1`) is exercised here as this unit's own property layer** (Layer
   declaration's fourth anchor): every register row is `[T]` work over injectable arguments, so §5
   records **measured counts**, not design cells.
5. **The `[U]` real-DOM row was NOT TAKEN** — no `ui` leg and no divergence leg ran. **No rendered-value,
   geometry, cascade or paint claim is made anywhere in this file.**

---

## 2. Exact commands (as run)

```bash
node_modules/.bin/vitest run tests/blind-projection-greens.tmp.test.ts --reporter=verbose   # the 75 scenario rows (final run)
node_modules/.bin/vitest run tests/blind-projection-diag.tmp.test.ts                        # diagnostic: frozen vs unfrozen throwing accessor
node_modules/.bin/vitest run tests/blind-projection-diag2.tmp.test.ts                       # diagnostic: PJ-G-70 frozen variant reproduction
node_modules/.bin/vitest run tests/blind-projection-diag3.tmp.test.ts                       # diagnostic: freeze flags / one-read observation
node_modules/.bin/vitest run                                                               # the node suite (count-only corroboration)
node_modules/.bin/vitest run tests/layout-projection.test.ts                               # the unit's OWN row file (COUNT ONLY — never read)
node_modules/.bin/vitest run tests/engine-pin-version.test.ts                              # the seam leg R-21 CITES (count only)
git diff --name-only 58c7feb HEAD                                                          # R-20's change-set probe (unit gate 2 → HEAD)
git status --porcelain                                                                     # the tree, before and after deletion
```

**Runner / stack:** Node **v24.20.0**; vitest as declared in `package.json`; `git HEAD` **`d1e4b27`**;
the working tree **clean** (no pre-existing modification — unlike the sibling greens records, this tree
had none). **The four temporary runner files were the only files this pass created, and all four are
deleted (§10).**

---

## 3. Run counts (the run's arithmetic)

| Leg / artifact | Command | Verbatim result | Exit |
| --- | --- | --- | --- |
| the scenario set (§4) | `vitest run tests/blind-projection-greens.tmp.test.ts` | `Test Files 1 failed (1)` · **`Tests 2 failed \| 74 passed (76)`** (75 scenario rows + the `ZZ-summary` line; the two failures are `PJ-G-58` and `PJ-G-75`) | `1` |
| node suite `[T]`, **while the temp files existed** | `vitest run` | `Test Files 2 failed \| 64 passed (66)` · **`Tests 3 failed \| 1188 passed \| 2 skipped (1193)`** — the third failure is the **unit's own `R-20` row firing on my temporary files** (§7.3) | `1` |
| the unit's own row file, **while the temp files existed** | `vitest run tests/layout-projection.test.ts` | `Tests 1 failed \| 69 passed (70)` — the same `R-20` firing | `1` |
| the cited seam leg (`R-21`) | `vitest run tests/engine-pin-version.test.ts` | **`Tests 5 passed (5)`** | `0` |
| node suite `[T]`, **after deletion, BEFORE this greens file existed** | `vitest run` | **`Test Files 62 passed (62)`** · **`Tests 1109 passed \| 2 skipped (1111)`** | `0` |
| the unit's own row file, **after deletion, BEFORE this greens file existed** (count only) | `vitest run tests/layout-projection.test.ts` | **`Tests 70 passed (70)`** | `0` |
| node suite `[T]`, **final state of this pass** (this greens artifact present and **uncommitted**) | `vitest run` | `Test Files 1 failed \| 61 passed (62)` · **`Tests 1 failed \| 1108 passed \| 2 skipped (1111)`** — the single failure is the **unit's own `R-20` row firing on this greens file** (§7.3) | `1` |
| the unit's own row file, **final state** | `vitest run tests/layout-projection.test.ts` | `Tests 1 failed \| 69 passed (70)` (`R-20` only); **with this file moved aside, the same command reads `Tests 70 passed (70)`** (§7.3, controlled check) | `1` / `0` |
| **this record** | all of the above | **75 rows — 69 PASS / 2 FAIL / 4 NOT-BLIND-RUNNABLE** | — |

**The row arithmetic, so it closes — 75 scored rows = 69 PASS + 2 FAIL + 4 NOT-BLIND-RUNNABLE:**

| Group | Ids | Rows | PASS | FAIL | NBR |
| --- | --- | --- | --- | --- | --- |
| §3.1 valid/happy states (`M-1`..`M-22`) | `PJ-G-01`..`PJ-G-22` | 22 | 22 | 0 | 0 |
| §3.2 documented fail-states (`F-1`..`F-15`, `F-4` split) + the `F-12` (c) literal-claim row | `PJ-G-23`..`PJ-G-38`, `PJ-G-75` | 17 | 16 | **1** | 0 |
| §3.3 every-state invariants (`I-1`..`I-14`) | `PJ-G-39`..`PJ-G-52` | 14 | 14 | 0 | 0 |
| §2.1/§2.3/§2.4/§2.5 surface + key/order/copy rules | `PJ-G-53`..`PJ-G-58` | 6 | 5 | **1** | 0 |
| §3.4/§3.5 static + existence rows (`R-17`..`R-23`) | `PJ-G-59`..`PJ-G-66` | 8 | 4 | 0 | **4** |
| §5.5.1 register rows (8 rows, one scenario each) | `PJ-G-67`..`PJ-G-74` | 8 | 8 | 0 | 0 |
| **total** | | **75** | **69** | **2** | **4** |

**Ordering note, so the id sequence is not read as drift:** `PJ-G-75` was **appended after the first
run**, when the `F-12` (c) cell's internal inconsistency was found; it registers in the runner
**between `PJ-G-35` and `PJ-G-36`**. **No existing row id, verdict or observed value moved.**

**The two `FAIL`s are §7.1 (`PJ-G-58`) and §7.2 (`PJ-G-75`) — both attributed to doc/spec drift, neither
to the module.** A **self-verified greens set is a review finding** (RCA-4): this record is the
**independent** half, and the unit's own file was **never read** to produce it.

---

## 4. The scenarios

`Doc clause` cites the contract **by section and row id** (never by line number). The `Observed` column
quotes the **verbatim** `console.log` payload the runner printed for that id — JSON as printed,
**abridged with `…` only where the payload is long**, and every fragment is a verbatim prefix of what
printed. Where a payload is abridged, the verdict sentence states the asserted values that the abridged
tail carried (the runner asserted them; each row's `check()` is the contract-derived expectation).

### 4.1 §3.1 valid / happy states (`M` family) — 22 rows

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-G-01** | §3.1 `M-1` (+§2.4 item 3 key clause) | `project({w:320},{w:{name:'--app-width',unit:'px'}})` then `applyProjection(p, fakeSink)` | `{"p":{"applied":{"--app-width":"320px"},"appliedKeys":["--app-width"],"skipped":[],"proto":"null"},"calls":[["--app-width","320px"]],"r":{"applied":{"--app-width":"320px"},"appliedKeys":["--app-width"],"skipped":[],"ok":true,"proto":"null"}}` | PASS — exactly one write, `r.applied` deep-equals `p.applied`, `ok === true` |
| **PJ-G-02** | §3.1 `M-2` | the same spec with **no** `format`, against the explicit `format:'unit'` | `{"omitted":{"applied":{"--app-width":"320px"},"appliedKeys":["--app-width"],"skipped":[],"proto":"…` (byte-identical to the `explicit` half) | PASS — the documented default is not discovered by accident |
| **PJ-G-03** | §3.1 `M-3` | `{name:'--n',unit:'px',format:'number'}`, value `320` | `{"p":{"applied":{"--n":"320"},"appliedKeys":["--n"],"skipped":[],"proto":"null"}}` | PASS — the caller's `unit` is ignored, not emitted |
| **PJ-G-04** | §3.1 `M-4` | `{name:'--z',unit:''}`, value `7` | `{"p":{"applied":{"--z":"7"},"appliedKeys":["--z"],"skipped":[],"proto":"null"}}` | PASS — `unit` was not defaulted to any literal |
| **PJ-G-05** | §3.1 `M-5` (+§2.3 item 7) | counting fake sink over `K=4` keys | `{"K":4,"callCount":4,"callNames":["--a","--b","--c","--d"],"appliedKeys":["--a","--b","--c","--d"],"ok":true}` | PASS — exactly K calls, once per key, in `Object.keys(applied)` order |
| **PJ-G-06** | §3.1 `M-6` (+§2.4 item 4 spec order) | 3 keys `z,a,m` (deliberately not sorted) | `{"pKeys":["--z","--a","--m"],"rKeys":["--z","--a","--m"],"callNames":["--z","--a","--m"]}` | PASS — spec order preserved in `applied`, in `r.applied` and at the sink |
| **PJ-G-07** | §3.1 `M-7` (+§2.2 prohibitions 2/3) | `name:'--SENTINEL_NAME'`, `unit:'SENTINEL_UNIT'`, value `123` | `{"p":{"applied":{"--SENTINEL_NAME":"123SENTINEL_UNIT"},"appliedKeys":["--SENTINEL_NAME"],"skipped":[…` | PASS — sentinel name verbatim; the value is exactly `'123SENTINEL_UNIT'`: no prefix, suffix or separator added |
| **PJ-G-08** | §3.1 `M-8` | `unit` ∈ `'px'`, `'Q'`, `'--'` | `{"out":{"px":{"--u2":"8px"},"Q":{"--u1":"8Q"},"--":{"--u2":"8--"}}}` | PASS — all three are `${value}${unit}`; no special case for any token |
| **PJ-G-09** | §3.1 `M-9` (+§7a.1 item 6 per-shape) | (a) `Object.freeze`d `values` + `Object.freeze`d `VarSpec`; (b) a frozen `{}` in the `name` position | `{"shapeAThrew":null,"a":{"applied":{"--app-width":"320px"},"appliedKeys":["--app-width"],"skipped":[],"proto":"null"},"shapeBThrew":null,"b":{"applied":{},"appliedKeys":[],"skipped":[["","malformed-spec"]],"proto":"null"}}` | PASS — the frozen **entry** is valid and **applied**; a frozen **nested object** where a `string` is required is `malformed-spec`; **both no-throw**. (The skip's `name` is `''` — unpinned for this class: ambiguity `O-1`) |
| **PJ-G-10** | §3.1 `M-10` (+§7a.1 item 10) | `projectVar(spec,value)` vs `project(values,{the specOf key: spec})` over 8 drives | `{"out":[{"label":"ok","written":"320px","vSkip":null,…,"agreeWritten":true,"agreeSkip":true},…,{"label":"absent-key","written":null,"vSkip":{"name":"--absent","reason":"not-a-number"},"skipEntry":{"name":"--absent","reason":"missing-value"},"nullEquivalent":true,"agreeWritten":true,"agreeSkip":false,"channelUndefined":true},…]}` | PASS on the **6 expressible drives** (`written===null` ⟺ `skip!==null`, and `written`/`skip` agree with the `project` half exactly, including the `unit:''` case where `written==='7'` — **never a truthiness test**). **2 drives are recorded, not scored** — see `O-2`: `projectVar` has **no channel** for "the key is absent" or "the read threw" |
| **PJ-G-11** | §3.1 `M-11` (+§2.3 item 4 asymmetry) | `applyProjection(null \| undefined \| 'nope' \| 42, sink)` | `{"out":[{"pv":"null","err":null,"r":{"applied":{},"appliedKeys":[],"skipped":[],"ok":true,"proto":"null"},"calls":0},{"pv":"undefined",…},{"pv":"nope",…},{"pv":"42",…}]}` | PASS — no throw, `applied {}`, `skipped []`, `ok === true`, zero writes, for all four shapes |
| **PJ-G-12** | §3.1 `M-12` | `project({},{})` then apply | `{"err":null,"p":{"applied":{},"appliedKeys":[],"skipped":[],"proto":"null"},"calls":0,"r":{"applied":{},"appliedKeys":[],"skipped":[],"ok":true,"proto":"null"}}` | PASS — nothing applied, zero sink calls, nothing throws |
| **PJ-G-13** | §3.1 `M-13` (+§7a.1 item 2, four assertions) | a hand-built literal projection (driven with **no `values`/`specOf` in scope**), a skip entry `project` would not emit, and `{applied:{'--a':12}}`; then a non-record projection | `{"r":{"applied":{"--a":"1","--b":"2"},"appliedKeys":["--a","--b"],"skipped":[["--x","missing-value"]],"ok":false,"proto":"null"},"calls":[["--a","1"],["--b","2"]],"handAfter":{"keys":["--a","--b"],"skipped":[["--x","missing-value"]]},"coercingBefore":"{\"--a\":12}","coercingAfter":"{\"--a\":12}","coercingCalls":[["--a","12"]],"c…` | PASS — writes exactly the given record in order; the **given skip is carried unchanged** (never re-derived); the coercion is `F-10`'s and leaves the caller's projection **unmutated**; a non-record projection is `M-11`'s no-op |
| **PJ-G-14** | §3.1 `M-14` | `applyVarsToRoot === applyProjection` and identical behaviour | `{"identity":true,"typeofAlias":"function","r1":{"applied":{"--k":"1"},…,"ok":true,"proto":"null"},"r2":{…},"calls1":[["--k","1"]],"calls2":[["--k","1"]]}` | PASS — **identity** alias, one implementation |
| **PJ-G-15** | §3.1 `M-15` (+§2.3 item 1, `I-10`) | one call with a refusal (throwing sink), then a clean call over the **same** projection | `{"r1":{"applied":{"--b":"2"},"appliedKeys":["--b"],"skipped":[["--a","write-refused"]],"ok":false,"proto":"null"},"r2":{"applied":{"--a":"1","--b":"2"},"appliedKeys":["--a","--b"],"skipped":[],"ok":true,"proto":"null"}}` | PASS — the second call is `ok === true` with `skipped []`: nothing accumulates |
| **PJ-G-16** | §3.1 `M-16` | `{name:'--z',unit:'px'}`, value `0` | `{"p":{"applied":{"--z":"0px"},"appliedKeys":["--z"],"skipped":[],"proto":"null"}}` | PASS — `0` is applied, not mistaken for absent |
| **PJ-G-17** | §3.1 `M-17` (+§3.3 `I-9` narrowed form) | `1e21`, `-0`, `5e-324`, `Number.MAX_VALUE` with `unit:'px'` | `{"p":{"applied":{"--h":"1e+21px","--z":"0px","--t":"5e-324px","--m":"1.7976931348623157e+308px"},"appliedKeys":["--h","--z","--t","--m"],"skipped":[],"proto":"null"}}` | PASS — the **exact** strings are recorded, so a later pass cannot silently "improve" the number formatting |
| **PJ-G-18** | §3.1 `M-18` (+§2.5 item 1, `I-12`) | `project({k:1},{k:{name:'__proto__',unit:''}})` then apply | `{"p":{"applied":{"__proto__":"1"},"appliedKeys":["__proto__"],"skipped":[],"proto":"null"},"rawKeys":["__proto__"],"ownHas":true,"readBack":"1","getProto":"null","r":{"applied":{"__proto__":"1"},"appliedKeys":["__proto__"],"skipped":[],"ok":true,"proto":"null"}}` | PASS — own key `'__proto__'`, in `Object.keys` in spec order, read back as its own value, **`Object.getPrototypeOf(applied) === null`**, no skip |
| **PJ-G-19** | §3.1 `M-19` (+§2.5 items 2/3/4/6) | the `'__proto__'` record's own membership API and the ordinary-name control | `{"hasOwnPropType":"undefined","callingItThrows":"p.applied.hasOwnProperty is not a function","getProtoDangerous":"null","getProtoOrdinary":"null","objectHasOwn":true,"callHasOwn":true,"inOperator":true,"entries":[["__proto__","1"]],"json":"{\"__proto__\":\"1\"}","nullProtoSpreadTargetKeys":["__proto__"],"nullProtoSpreadTargetVal…` | PASS — `applied.hasOwnProperty` **does not exist** (calling it throws `TypeError`); `Object.hasOwn`/`…hasOwnProperty.call` are the usable tests; `in`/`entries`/`JSON.stringify`/copy-into-a-**null-prototype**-target behave normally; **every** returned `applied` record has a null prototype |
| **PJ-G-20** | §3.1 `M-20` (+§2.5 item 6) | `M-18`'s projection applied to a **recording** fake sink | `{"calls":[["__proto__","1"]],"r":{"applied":{"__proto__":"1"},…,"ok":true,"proto":"null"},"ownInResult":true}` | PASS — the name reaches the sink **verbatim as a string argument**, with no refusal/sanitization and no name guard |
| **PJ-G-21** | §3.1 `M-21` (+§0A note 1, `I-11`, `I-8`) | one projection → sinkA, sinkB, sinkA again; then `r1.applied['--a']` is mutated | `{"K":3,"aCalls":6,"bCalls":3,"r1":{"applied":{"--a":"1px",…},…},"r2":{…},"r3":{…},"freshEqP":true,"pValueAfter":"1px","r2ValueAfter":"1px","r1AppliedIsPApplied":false,"r1FreshVsR2":true}` | PASS — `2K` writes at sinkA and `K` at sinkB; `r1`/`r2`/`r3` deep-equal; `p` unchanged (deep-equal to a fresh `project`); mutating `r1.applied` changes neither `p` nor `r2`; the results are **fresh** objects |
| **PJ-G-22** | §3.1 `M-22` (+§2.3 item 7) | the same projection twice into **one** sink, then twice through `applyVarsToRoot` | `{"r1":{"applied":{"--a":"1","--b":"2","--c":"3"},…,"ok":true,"proto":"null"},"r2":{…},"r3":{…},"r4":{…},"calls":6,"calls2":6,"K":3}` | PASS — every call is equivalent to a first call; **one `setProperty` per key per call** (no memo, no "already applied" skip); the alias reuses identically |

### 4.2 §3.2 documented fail-states / skips (`F` family) — 17 rows

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-G-23** | §3.2 `F-1` (+§2.2 prohibition 3) | 11 malformed `specOf` entries: `null`, `undefined`, a string, a number, an array, `{}`, non-string `name`, missing `name`, missing `unit`, non-string `unit`, unknown `format` | `{"out":[{"label":"null","err":null,"skipped":[["","malformed-spec"]],"appliedKeys":[],"calls":0,"rApplied":[]},{"label":"undefined",…},{"label":"string",…},{"labe…` | PASS — **no throw**; every entry is skipped **`malformed-spec`**; **no default is substituted** (applied empty, zero writes) for all 11. The skip's `name` is `''` — **unpinned** (`O-1`) |
| **PJ-G-24** | §3.2 `F-2` (+§2.4 items 5/8, §7a.1 item 5) | duplicate `'--dup'`: (1) both values present, (2) the **first occurrence's value absent**, (3) the applier-side list | `{"d1":{"applied":{"--dup":"1"},"appliedKeys":["--dup"],"skipped":[["--dup","duplicate-name"]],"proto":"null"},"d2":{"applied":{},"appliedKeys":[],"skipped":[["--dup","missing-value"],["--dup","duplicate-name"]],"proto":"null"},"d3":{"r1":{"applied":{"--dup":"1"},…,"skipped":[["--dup","duplicate-name"]],"ok":fal…` | PASS — first-wins **by name collision**: the skipped first occurrence keeps **its own** reason (`missing-value`, listed **first**), the second is `duplicate-name`; the applier carries the list unchanged and writes once |
| **PJ-G-25** | §3.2 `F-3` (+§2.3 item 5) | `project({present:1},{absent:{name:'--absent',unit:''}})` then apply | `{"p":{"applied":{},"appliedKeys":[],"skipped":[["--absent","missing-value"]],"proto":"null"},"calls":[],"r":{"applied":{},"appliedKeys":[],"skipped":[["--absent","missing-value"]],"ok":false,"proto":"null"}}` | PASS — `missing-value`; **never a `0`, never an empty string, never a removal write** (zero sink calls) |
| **PJ-G-26** | §3.2 `F-4A` (+§2.4 item 3 trigger clause (a)) | 12 readable non-numeric values: `'12'`, `true`, `false`, `null`, `undefined` (present), `{}`, `[]`, `NaN`, `Infinity`, `-Infinity`, a `BigInt`, **a function** | `{"p":{"applied":{},"appliedKeys":[],"skipped":[["--s","not-a-number"],["--t","not-a-number"],["--f","not-a-number"],["--n","not-a-number"],["--u","not-a-number"],["--o","not-a-number"],["--a","not-a-number"],["--nan","not-a-number"],["--inf","not-a-number"],["--ninf","not-a-number"],["--big","not-a-number"],["--fn","not-a-number…` (plus `invoked:0`) | PASS — **12 `not-a-number`** skips and **the caller's function was NEVER invoked** (`invoked:0`): the module reads the value, it does not call it |
| **PJ-G-27** | §3.2 `F-4B` (+§2.4 item 3 trigger clause (c)) | an own accessor that always throws (with a good sibling key); and an accessor that throws only on a **second** read | `{"err":null,"p1":{"applied":{"--good":"7"},"appliedKeys":["--good"],"skipped":[["--k","accessor-threw"]],"proto":"null"},"p2":{"applied":{"--other":"1","--k2":"3"},"appliedKeys":["--other","--k2"],"skipped":[],"proto":"null"},"reads":1}` | PASS — the throwing accessor is **caught per key**, recorded `accessor-threw`, the good key still applied, `project` did not throw; the read happens **once** (`reads:1`) |
| **PJ-G-28** | §3.2 `F-5` (+§2.4 item 3) | `-1`, `-Number.MIN_VALUE`, `-0` | `{"p":{"applied":{"--zero":"0"},"appliedKeys":["--zero"],"skipped":[["--neg","negative"],["--tiny","negative"]],"proto":"null"}}` | PASS — both negatives are `negative`; **`-0` is NOT negative and is applied as `'0'`** |
| **PJ-G-29** | §3.2 `F-6` (+§2.3 item 4) | 7 malformed sinks: `null`, `undefined`, `42`, `'x'`, `{}`, `{style:{}}`, `{style:{setProperty:42}}` | `{"out":[{"label":"null","err":null,"r":{"applied":{},"appliedKeys":[],"skipped":[["--a","sink-unusable"],["--b","sink-unusable"],["--c","sink-unusable"]],"ok":false,"proto":"null"}},{"label":"undefined",…},{"label":"42",…},{"label":"'x'",…},{"label":"{}",…},{"label":"{style:{}}",…},{"label":"{style:{setProperty:42}}",…}]}` | PASS — **no throw**, **no write attempted**, `applied {}`, **one `sink-unusable` per key**, `ok === false` on all seven |
| **PJ-G-30** | §3.2 `F-7` (+§2.3 items 2/3) | a sink whose `setProperty` throws on the **2nd** key only | `{"err":null,"r":{"applied":{"--a":"1","--c":"3"},"appliedKeys":["--a","--c"],"skipped":[["--b","write-refused"]],"ok":false,"proto":"null"},"attempted":["--a","--b","--c"],"calls":[["--a","1"],["--b","2"],["--c","3"]]}` | PASS — key 2 is `write-refused` and **absent from `applied`**, keys 1 and 3 are applied, `ok === false`, **the run did not abort** (3 attempts) |
| **PJ-G-31** | §3.2 `F-8` | a sink that always throws | `{"err":null,"r":{"applied":{},"appliedKeys":[],"skipped":[["--a","write-refused"],["--b","write-refused"],["--c","write-refused"]],"ok":false,"proto":"null"},"attempted":6}` | PASS — no throw, every key `write-refused` **in `projection.applied`'s order**, `applied {}`, `ok === false`. **`attempted:6` is a checker artifact, not an attempt count** (the drive called the applier twice on one sink — §9 item 6) |
| **PJ-G-32** | §3.2 `F-9` (+§7a.1 item 3, `I-10`) | `skipped:'nope'`; `skipped:[null]`; and a **mixed** list (one well-formed entry + one `null`) | `{"out":[{"label":"skipped:'nope'","err":null,"r":{"applied":{"--a":"1"},"appliedKeys":["--a"],"skipped":[],"ok":true,"proto":"null"},"calls":[["--a","1"]]},{"label":"skipped:[null]",…same…},{"label":"mixed","err":null,…}]}` | PASS — no throw; the `applied` half is written in full; malformed entries are **dropped**; **`ok === true` with `skipped []` for the all-dropped shapes**; the mixed shape keeps `1` entry with `ok === false` (the non-vacuous control) |
| **PJ-G-33** | §3.2 `F-10` (+§7a.1 item 2 exact table) | `{applied:{'--a':v}}` for `12`, `0`, `-0`, `true`, `false`, `12n`, `'12'` (primitives) and `null`, `undefined`, `{}`, `[]`, a function (non-primitives) | `{"prim":[["12",{"err":null,"calls":[["--a","12"]],"applied":["--a"],"skipped":[],"projValue":true,"projKeyStill":true}],["0",{"calls":[["--a","0"]]…}],["-0",{"calls":[["--a","0"]]…}],["true",{"calls":[["--a","true"]]…}],["false",…],["12n",{"calls":[["--a","12"]]…}],["'12'",{"calls":[["--a","12"]]…}]],"nonPrim":[["null",{"err":null,"calls":[],"applied":[],"skipped":[["--a","write-refused"]],"projValue":true,"projKeyStill":true}],…]}` | PASS — **every primitive's exact string** reaches the sink (`12`→`'12'`, `0`/`-0`→`'0'`, `true`/`false`, `12n`→`'12'`, `'12'` unchanged); every non-primitive is **`write-refused`**, absent from `applied`, with **no write attempted**; the caller's projection is unmutated in every case |
| **PJ-G-34** | §3.2 `F-11` (+§7a.1 item 1) **both halves** | (a) non-record `specOf` `null`/`undefined`/`'x'`/`42`/`[]`; (b) non-record `values` with a well-formed non-empty `specOf` | `{"a":[{"sp":"null","err":null,"p":{"applied":{},"appliedKeys":[],"skipped":[],"proto":"null"}},{"sp":"undefined",…},{"sp":"x",…},{"sp":"42",…},{"sp":"[]",…}],"b":[{"v":"null",…},{"v":"undefined",…},{"v":"x",…},{"v":"42",…},{"v":"[]",…}]}` | PASS — (a) zero spec entries ⇒ both records empty; (b) **one `missing-value` per spec entry** with `applied {}`, no `malformed-spec`/`not-a-number`/`accessor-threw` invented, nothing throws |
| **PJ-G-35** | §3.2 `F-12` (a)(b) + the **normative** order of (c) (§2.4 item 8 (1)) | 4 keys: `k2` throws, `k4` absent (`--k1..--k4`); the `format:'number'` variant; and the duplicate-name variant in **both** arrangements | `{"err":null,"a":{"applied":{"--k1":"1","--k3":"3"},"appliedKeys":["--k1","--k3"],"skipped":[["--k2","accessor-threw"],["--k4","missing-value"]],"proto":"null"},"b":{"applied":{"--k1":"1","--k3":"3"},"skipped":[["--k2","accessor-threw"],["--k4","missing-value"]]},"cA":{"applied":{"--dup":"1"},"appliedKeys":["--dup"],"skipped":[["--k2","accessor-threw"],["--dup","duplicate-name"],["--k4","missing-value"]],"proto":"null"},"cB":{"applied":{"--dup":"1"},"skipped":[["--dup","duplicate-name"],["--k2","accessor-threw"],["--k4","missing-value"]]},"cCalls":[["--dup","1"]],"repeat":true}` | PASS — (a)/(b) skip list is **spec-entry order** (`accessor-threw` before `missing-value`, i.e. **NOT** reason-grouped); (c) in **both** arrangements the list is that arrangement's **spec-entry order** and never reason-grouped; the first `--dup` is applied, the applier carries the list unchanged, the result is deep-equal to a repeat call |
| **PJ-G-36** | §3.2 `F-13` (a)(b)(c) + the name-half drive | (a) the six prototype-shaped **lookup keys** on a `values` owning none of them; (b) two specs naming `'constructor'`; (c) a `specOf` with an **own** `'__proto__'` entry; (d) the same six names as **`VarSpec.name`** under an ordinary key | `{"a":{"applied":{},"appliedKeys":[],"skipped":[["--constructor","missing-value"],["--prototype","missing-value"],["--toString","missing-value"],["--hasOwnProperty","missing-value"],["--valueOf","missing-value"],["--__proto__","missing-value"]],"proto":"null"},"b":{"applied":{"constructor":"1"},"appliedKeys":["constructor"],"skip…` + `cKeys:["__proto__"], cHasOwn:true, cRead:"9px", d.applied:{"constructor":"4"}` | PASS — (a) six `missing-value`, **never from an inherited member**; (b) first applied, second `duplicate-name` (no seen-set misdiagnosis); (c) the own `'__proto__'` entry is read as its own entry (`'9px'`, own key, null prototype); (d) a prototype-shaped **name** changes nothing — it is applied verbatim |
| **PJ-G-37** | §3.2 `F-14` (+§2.3 item 8, §0A note 4) | a `setProperty` that re-enters `applyProjection` — from the FIRST key into a different sink, and from the FIRST key into the SAME sink | `{"err1":null,"outer":{"applied":{"--a":"1","--b":"2","--c":"3"},"appliedKeys":["--a","--b","--c"],"skipped":[],"ok":true,"proto":"null"},"outerCalls":[["--a","1"],["--b","2"],["--c","3"]],"inner":{"applied":{"--i":"9"},…,"ok":true,"proto":"null"},"innerCalls":[["--i","9"]],"err2":null,"outerSame":{…}}` | PASS — no throw from either call; the outer result reports **exactly its own call's** writes (the inner key is absent from the outer `applied`/`skipped`); the outer's remaining keys are still written after the re-entrant return; **neither call is refused** — no guard exists, because a guard would be state |
| **PJ-G-38** | §3.2 `F-15` (+§7a.1 item 9 four observables; §2.5 item 5 (i)) | snapshot `p` (own keys in order, per-name values via `Object.hasOwn`, `skipped` by value, prototype **by identity**), call the applier with a sink that throws for one key, re-snapshot; then a **shallowly frozen** `p` (`Object.freeze` on the record and on the projection) | `{"before":{"keys":["--a","--b","__proto__"],"values":[["--a",true,"1"],["--b",true,"2"],["__proto__",true,"3"]],"skipped":[],"protoIsNull":true},"after":{…identical…},"freshSnap":{…identical…},…}` + `frozenErr:null`, `frozenCalls:[["--a","1"],["--b","2"],["__proto__","3"]]` | PASS — `p` is unchanged in **all four** observables (and equals a fresh `project(values, specOf)`); the shallowly frozen input is accepted **without a throw** and still written correctly. **No `JSON.stringify`/`JSON.parse` round-trip was used** (`§7a.1` item 9) |
| **PJ-G-75** | §3.2 `F-12` (c) **AS LITERALLY PRINTED** (the tuple + the expected list) | the printed tuple `(--dup, --k2, --dup, --k4)` with `--k2` the throwing key, asserted against the printed expected list `[duplicate-name, accessor-threw, missing-value]` | `{"driveTuple":["--dup","--k2","--dup","--k4"],"printedExpectedList":[["--dup","duplicate-name"],["--k2","accessor-threw"],["--k4","missing-value"]],"observedSkipped":[["--k2","accessor-threw"],["--dup","duplicate-name"],["--k4","missing-value"]],"observedApplied":{"--dup":"1"},"specEntryOrderOfThatTuple":[["--k2","accessor-threw"],["--dup","duplicate-name"],["--k4","missing-value"]],"normativeRule":"§2.4 item 8 (1) — the projection skipped list is SPEC-ENTRY order, never reason-grouped"}` | **FAIL — doc/spec drift (§7.2).** The module returns the tuple's **spec-entry** order; the printed expected list corresponds to a **different arrangement** of the same four entries. `§2.4` item 8 (1) is satisfied; the `F-12` (c) cell's two printed halves cannot both hold |

### 4.3 §3.3 every-state invariants (`I` family) — 14 rows

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-G-39** | §3.3 `I-1` (+`P-PJ-IM-1`'s statement) | 9 decision classes, **per spec ENTRY** | `{"out":[{"label":"happy","nameInApplied":true,"nameInSkipped":false,"perEntryDecisions":1,"entries":1,"everyEntryDecided":true,…},{"label":"malformed","perEntryDecisions":1,"entries":1,…},{"label":"duplicate","nameInBoth":true,"perEntryDecisions":2,"entries":2,"everyEntryDecided":true,…},{"label":"throwing-accessor","perEntryDecisions":2,"entries":2,…},…]}` | PASS — **exactly one decision per spec entry** in every class; each skip carries a `reason`; no applied name repeats. (`duplicate`'s name legitimately appears in **both** lists — one decision per **entry**, not per name) |
| **PJ-G-40** | §3.3 `I-2` (+§7a.1 item 4 scope) | a key must not vanish between the halves — refusal case and malformed-sink case | `{"p":{"applied":{"--a":"1","--b":"2"},"skipped":[["--m","missing-value"]],…},"r":{"applied":{"--a":"1"},"skipped":[["--b","write-refused"],["--m","missing-value"]],"ok":false,…},"badSink":{"applied":{},"skipped":[["--a","sink-unusable"],…]},"covered":true,"sinkCovers":true}` | PASS — `ApplyResult.applied ∪ skipped` covers the projection's union; **a malformed sink decides every key** |
| **PJ-G-41** | §3.3 `I-3` (+§2.3 items 2/7) | iff-rule and at-most-once, plus a refusing key | `{"appliedKeys":["--a","--b","--c"],"callNames":["--a","--b","--c"],"maxPerKey":1,"r2Applied":["--a","--c"],"r2Calls":["--a","--b","--c"],"r2Skipped":[["--b","write-refused"]],"iff":true}` | PASS — a key is in `applied` **iff** `setProperty` was called with it, **at most once per key per call**, and a refused key is absent from `applied` |
| **PJ-G-42** | §3.3 `I-4` (+§2.4 item 1) | the same arguments twice, both halves | `{"pEq":true,"rEq":true,"pSameRef":false,"appliedSameRef":false}` | PASS — deep-equal results, and they are **different objects** (determinism without aliasing) |
| **PJ-G-43** | §3.3 `I-5` (+§2.2 prohibition 4) | mutate the caller's `values`, its `spec`, and the sink's call log **after** the call | `{"before":{…},"after":{…},"rBefore":{…},"rAfter":{…}}` (all four snapshots byte-identical; `--a` stays `'1'`) | PASS — neither half retains a reference to an argument |
| **PJ-G-44** | §3.3 `I-6` (+§2.3 item 5) | a `Proxy` over `style` recording **every** property get, with a `cssText` getter that **throws** if read | `{"err":null,"gets":["setProperty"],"calls":[["--a","1"],["--b","2"]],"r":{"applied":{"--a":"1","--b":"2"},…,"ok":true,…}}` | PASS — the only member read is **`setProperty`** (its callability); no read of a current value was attempted; both keys still written |
| **PJ-G-45** | §3.3 `I-7` (+§2.4 item 2) | the no-throw table: **16** `project`-shaped inputs (incl. throwing getters, frozen inputs, a 300-key object) × **45** `applyProjection` shapes (9 projections × 5 sinks) | `{"projectShapeFailures":[],"applyShapeFailures":[],"projectShapes":16,"applyShapes":45}` | PASS — **no failure in either half**, for any shape in the table |
| **PJ-G-46** | §3.3 `I-8` | mutate `r1.applied` and `r1.skipped`, then read `r2` and `p` | `{"r1NotR2":true,"skipArrFresh":true,"r2Value":"1","r2Skipped":[],"pValue":"1","pNotR":true}` | PASS — every returned record/array is **fresh**; a caller mutating one result cannot change another |
| **PJ-G-47** | §3.3 `I-9` (narrowed: exact strings + the three literals) | `NaN`, `±Infinity`, `-1`, `0`, `-0`, `Number.MIN_VALUE`, `Number.MAX_VALUE`, `1e21`, `'12'`, `true` | `{"applied":{"--zero":"0px","--nzero":"0px","--small":"5e-324px","--max":"1.7976931348623157e+308px","--e21":"1e+21px"},"skipped":[["--nan","not-a-number"],["--inf","not-a-number"],["--ninf","not-a-number"],["--neg","negative"],["--s","not-a-number"],["--b","not-a-number"]],"allStrings":true,"literalHits":[]}` | PASS — every applied value is a **string** and equals the **exact** expected string; no applied value equals `'NaN'`/`'Infinity'`/`'-Infinity'`; **no bare `'-'`-prefix test was used** (`§7a.1` item 7) |
| **PJ-G-48** | §3.3 `I-10` (+§7a.1 item 3) | `ok === (emitted skipped.length === 0)` over 7 drives | `{"out":[{"label":"clean","ok":true,"skippedLen":0,"holds":true},{"label":"one-refusal","ok":false,"skippedLen":1,"holds":true},{"label":"all-refused","ok":false,"skippedLen":2,"holds":true},{"label":"unusable-sink","ok":false,"skippedLen":2,"holds":true},{"label":"malformed-projection","ok":true,"skippedLen":0,"holds":true},{"label":"all-dropped-malformed-skipped","ok":true,"skippedLen":0,"holds":true},{"label":"mixed-malformed-skipped","ok":false,"skippedLen":1,"holds":true}]}` | PASS — the invariant holds in all seven, including the `F-9` all-dropped shape (`ok === true`) and the mixed control (`ok === false`) |
| **PJ-G-49** | §3.3 `I-11` (+§0A note 1) | the same projection: first call, the same sink again, and a different sink | `{"firstSnapshot":{…},"sameAgain":{…},"other":{…},"s1Calls":4,"s2Calls":2,"pKeys":["--a","--b"],"sameAgainFresh":true,"otherFresh":true,"equivalent":true}` | PASS — reuse is **indistinguishable from a first call**; `2K`/`K` writes; every result fresh; nothing consumed |
| **PJ-G-50** | §3.3 `I-12` | the six dangerous names as `VarSpec.name`, through both halves | `{"out":[{"n":"__proto__","pKeys":["__proto__"],"pOwn":true,"pRead":"1","pProto":"null","rKeys":["__proto__"],"rOwn":true,"rSkipped":[],"calls":[["__proto__","1"]]},{"n":"constructor",…},{"n":"prototype",…},{"n":"toString",…},{"n":"hasOwnProperty",…},{"n":"valueOf",…}]}` | PASS — **every** name is an own key in `Projection.applied` **and** in `ApplyResult.applied`, none dropped/renamed, all prototypes null, all written verbatim |
| **PJ-G-51** | §3.3 `I-13` (the externally visible halves only) | both returned `applied` records by identity; and the own-property read semantics for `'constructor'`/`'toString'`/`'hasOwnProperty'` lookup keys | `{"projProto":true,"resProto":true,"constructorSkip":[["--c","missing-value"]],"toStringSkip":[["--t","missing-value"]],"hasOwnSkip":[["--h","missing-value"]],"constructorApplied":[],"toStringApplied":[],"hasOwnApplied":[],"callerProtosUntouched":true,"objectProtoConstructorIntact":true}` | PASS — both returned records have **no prototype**; an inherited member is **never** used as a value; `Object.prototype` was not written. **The internal-map half is NOT asserted** — it is not externally observable (`I-13`'s stated limit, `O-5`) |
| **PJ-G-52** | §3.3 `I-14` (+§2.3 item 8) | snapshot `p`, drive it with a re-entrant sink, re-snapshot; then build a new projection for different writes | `{"before":"{\"keys\":[\"--a\",\"--b\"],\"vals\":[[\"--a\",\"1\"],[\"--b\",\"2\"]],\"skipped\":[],\"proto\":true}","after":{…identical…},"unchanged":true,"outer":{"applied":{"--a":"1","--b":"2"},…,"ok":true,…},…}` | PASS — the projection never changes; the re-entrant call is **not refused** (no guard exists); the sanctioned route for different writes is a fresh `project(values, specOf)` |

### 4.4 §2 surface / key / order / copy rules — 6 rows

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-G-53** | §2.1 (the declared surface) + §2.2 prohibitions 1/3/6 | the imported namespace's runtime keys | `{"runtimeKeysSorted":["applyProjection","applyVarsToRoot","project","projectVar"],"rawKeys":["project","projectVar","applyProjection","applyVarsToRoot"],"types":{"project":"function","projectVar":"function","applyProjection":"function","applyVarsToRoot":"function"},"controlFlags":true}` | PASS — **exactly the four documented value exports and nothing else**; all four are functions |
| **PJ-G-54** | §2.1 skip pattern (+§2.4 items 1/2, §7a.1 item 10) | 7 `projectVar` drives + `project(null,null)` + `applyProjection(null,null)` | `{"out":[{"label":"ok","err":null,"written":"320px","skip":null,"equivalent":true,"emptyStringWithSkip":false},{"label":"ok-zero","written":"0","skip":null,…},{"label":"missing-is-not-a-thing-here","written":null,"skip":{"name":"--m","reason":"not-a-number"},"equivalent":true},…],"projectThrows":null,"applyThrows":null}` | PASS — neither half throws for any of these; **`written === null` ⟺ `skip !== null`** on every drive; `written === ''` was **never** produced together with a skip (and no truthiness test was used) |
| **PJ-G-55** | §2.1 signatures (+§2.4 item 6, §3a `A-15`) | the runtime arity of the four exports and alias identity | `{"projectArity":2,"applyArity":2,"aliasArity":2,"projectVarArity":2,"projectSourceLen":1872,"applySourceLen":1575,"identityAlias":true}` | PASS — `project.length === 2`, `applyProjection.length === 2`, `projectVar.length === 2`, identity alias. **This is arity only** — the *absence* of a `census`/`zones` parameter behind a default/rest is a source-level claim (`O-6`) |
| **PJ-G-56** | §2.4 item 3 clauses (1)/(2) — the VALUE-LOOKUP KEY RULE | the `name` present in `values` but not the `specOf` key; the `specOf` key with an unrelated name; an **inherited** member; an own key via `Object.defineProperty` | `{"nameNotKey":{"applied":{},"skipped":[["--app-width","missing-value"]],"proto":"null"},"keyNotName":{"applied":{"--unrelated":"320px"},"appliedKeys":["--unrelated"],"skipped":[],…},"inherited":{"applied":{},"skipped":[["--inh","missing-value"]],"proto":"null"},"ownViaDefine":{"applied":{"--k":"6"},"appliedKeys":["--k"],"skipped":[],…}}` | PASS — the **`specOf` map's own key supplies the lookup** and is read as an **own property** of `values`; `VarSpec.name` is the emitted name only; an inherited member is not a value |
| **PJ-G-57** | §2.4 item 8 (2) — the APPLIER-side `skipped` order | a hand-built projection (`applied` 3 keys, `skipped` 2 carried entries) against a sink that refuses the **second** write | `{"r":{"applied":{"--a":"1","--c":"3"},"appliedKeys":["--a","--c"],"skipped":[["--b","write-refused"],["--s1","missing-value"],["--s2","not-a-number"]],"ok":false,"proto":"null"},"calls":[["--a","1"],["--b","2"],["--c","3"]],"attempted":["--a","--b","--c"]}` | PASS — **its own refusals first (in `projection.applied`'s order), then the carried entries in the caller's own order**, never re-sorted, never interleaved |
| **PJ-G-58** | §2.5 item 4 (the copy hazard, a consumer obligation) — and §0A note 3, consequence 3 | copy the `'__proto__'` record with `{...applied}`, with `Object.assign({}, applied)`, and with `Object.assign(Object.create(null), applied)` | `{"sourceKeys":["__proto__"],"sourceRead":"1","sourceProto":"null","spreadKeys":["__proto__"],"spreadHasOwn":true,"spreadProto":"object","spreadRead":"1","assignKeys":[],"assignHasOwn":false,"assignProto":"object","nullTargetKeys":["__proto__"],"nullTargetHasOwn":true,"nullTargetValue":"1"}` | **FAIL — doc/spec drift (§7.1).** The conclusion (*a naive copy destroys the null prototype*) holds, and `Object.assign({}, …)` does lose the own `'__proto__'` key — but the spec's claim that **spread** also re-invokes `Object.prototype`'s `__proto__` accessor and loses the key is **false**: the spread copy **keeps** the own key |

### 4.5 §3.4 / §3.5 static + existence rows — 8 rows (4 PASS, 4 NOT-BLIND-RUNNABLE)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-G-59** | §3.4 `R-17` (prohibition 1, the anti-evasion vocabulary row) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-17 is a normalized source-text scan over src/shared/layout-projection.ts (raw + assembled + comments) plus the unit fixtures; the blind rule forbids reading the implementation and the red set, so no drive can be authored or run for it here. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **PJ-G-60** | §3.4 `R-18` (the forbidden-ACCESS row) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-18 asserts that no access in the module is rooted in a banned realm token or an alias of one; it is a source-reading row (S-13). No blind drive exists. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **PJ-G-61** | §3.4 `R-19` (the import-boundary row) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-19 asserts the module imports nothing (or at most a type-only import from src/shared/**); it is a source-reading row. A runtime substitute proves only that no import was OBSERVED to throw, not that none exists. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **PJ-G-62** | §3.4 `R-20` (the diff-scope row) + §4.4 `S-2` | file probes: the shim text for `setProperty`; `package.json`'s `devDependencies` key set; `git diff --name-only 58c7feb HEAD` | `{"shimHasSetProperty":false,"shimLines":143,"devDependencyKeys":["@types/node","electron","esbuild","typescript","vitest"],"scriptKeys":["clean","build","build:watch","start","start:http","typecheck","test","test:watch","battery","divergence","ui","mcp"],"changedFilesSorted":["docs/next-steps.md","docs/specs/projection.md","src/shared/layout-projection.ts","tests/layout-projection.test.ts"],"moduleExists":true,"testFileExists":true}` | PASS — **the shim gained no `setProperty`**; `devDependencies` is still the **five** keys and `scripts` is unchanged; the unit's whole change set is **exactly** `§5.1`'s four allowed paths — **no file outside the diff scope** |
| **PJ-G-63** | §3.4 `R-21` (the five-seam negative, citing the EXISTING name-complete rows) | a token census over `tests/engine-pin-version.test.ts` + that file **run once for its count** | `{"fileExists":true,"hasPinnedToolSet":true,"hasPinnedSet":true,"hasRpcCensus":true,"census21":true,"groupForToolMentions":4,"legResult":"Tests  5 passed (5)…"}` | PASS — the cited rows are **present** (`PINNED_TOOL_SET`, `PINNED`, `RPC_METHOD_CENSUS`, a `toBe(21)`) and the cited leg reads **`5 passed (5)`**. **Presence + a green leg, not a re-authorship**: the name-complete set equality is that file's own row |
| **PJ-G-64** | §3.5 `R-22` (a) — the runtime export census (**SET EQUALITY**, not a count) | the namespace's own keys against the four documented value exports, **with a positive control** | `{"valueNamesSorted":["applyProjection","applyVarsToRoot","project","projectVar"],"setEqual":true,"controlFailsOnAFifthExport":true,"countOnlyWouldPass":true}` | PASS — set equality holds and the **control fails on a ninth value export** (so the row is not a count in disguise) |
| **PJ-G-65** | §3.5 `R-22` (b) — the seven TYPE-ONLY names | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"The (b) half of R-22 is a type-level read (VarValues, VarSpec, ProjectionSkipReason, ProjectionSkip, Projection, VarWriteSink, ApplyResult). A type-only name is not a runtime key, and reading the module source to census its declarations is forbidden by the blind rule. The (a) half is PJ-G-64. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **PJ-G-66** | §3.5 `R-23` (the absent-page-design probe) + §7 item 9 | `fs.existsSync` probe on `docs/skills/designing-pages.md` + a `readdirSync` of `docs/skills` | `{"pageDesignExists":false,"skillsDir":["process-guardrails.md"]}` | PASS — the file **does not exist**, so the conditional obligation (a coverage-matrix row + a demo-page index entry) does **not** trigger. **This is a probe result at this tree state only** (`O-7`) |

### 4.6 §5.5.1 register rows — 8 rows (one scenario each)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-G-67** | §5.5.1 `P-PJ-IM-1` (`S-PJ-DECISION-1`), `YES (bounded)` | the fixed **23-class** decision table, one `project` call per attempt | `{"attempts":23,"held":23,"broken":0,"firstBroken":null,"brokenList":[]}` | PASS — **23 / 23 held** |
| **PJ-G-68** | §5.5.1 `P-PJ-TP-1` (`S-PJ-POOL-1` + `S-PJ-SEED-1`), `YES (bounded)` | the pinned-seed LCG (`state₀ = 20260927`, one step per draw, `index = state mod 20`), **60 draws** over the documented 20-shape pool, both halves, sink axis by `SINKS[d mod 5]` | `{"seed":20260927,"draws":60,"poolSize":20,"distinctShapesSeen":19,"sinksSeen":["null","{style:{}}","throwing","counting","recording"],"halvesSeen":["project-then-apply","apply"],"attempts":60,"held":60,"broken":0,"firstBroken":null,"brokenList":[]}` | **PASS (bounded)** — **60 / 60 held**; all five sink shapes and both halves exercised; **19 of the 20 pool members were reached** by these 60 draws (`O-8`) |
| **PJ-G-69** | §5.5.1 `P-PJ-IM-2` (`S-PJ-OWNKEY-1`), `YES` | 6 dangerous names × 3 host shapes = 18, plus 4 fixed shapes = **22** | `{"attempts":22,"held":22,"broken":0,"firstBroken":null,"brokenList":[],"callerProtosUntouched":true,"objectProtoIntact":true}` | PASS — **22 / 22 held**; no prototype of any caller object was written and `Object.prototype` is intact |
| **PJ-G-70** | §5.5.1 `P-PJ-IM-3` (`S-PJ-ACCESSOR-1`), `YES` | 3 accessor variants × 4 throwing-key positions × 3 neighbour dispositions = **36** | `{"attempts":36,"held":36,"broken":0,"firstBroken":null,"brokenList":[]}` | PASS — **36 / 36 held**. The **frozen-`values`** variant carries the **same always-throwing accessor** and behaves as variant (a); the **second-read** variant shows the read happens **once** and the key is **applied** — see `O-4` for the register's contradicting parenthetical |
| **PJ-G-71** | §5.5.1 `P-PJ-IM-5` (`S-PJ-NUMERIC-1`), `YES (bounded)` | the fixed **26-value** table × **2** format drives = **52** | `{"attempts":52,"held":52,"broken":0,"firstBroken":null,"brokenList":[],"nonFiniteHits":[],"appliedStringCount":20}` | **PASS (bounded)** — **52 / 52 held**; 20 applied values, all strings, **no non-finite literal anywhere** |
| **PJ-G-72** | §5.5.1 `P-PJ-IM-6` (`S-PJ-WRITELOG-1`), `YES` | (a) 4 write-log position attempts + (b) 4 failing sink shapes + (c) 5 unusable sinks + (d) 3 re-entrant sinks = **16** | `{"attempts":16,"held":16,"broken":0,"firstBroken":null,"brokenList":[],"pUnchanged":true}` | PASS — **16 / 16 held**; the projection is unchanged after all 16 |
| **PJ-G-73** | §5.5.1 `P-PJ-IM-7` (`S-PJ-THROW-1`), `YES` | 3 table rows (all throw · 1/3 throw · 2/4 throw) × 4 drives (plain · `format:'number'` · duplicate-name · frozen) = **12** | `{"attempts":12,"held":12,"broken":0,"firstBroken":null,"brokenList":[]}` | PASS — **12 / 12 held**; the skip **multiset** equals the throwing-key set plus the duplicate entry, one entry per key, applied set equals the finite-key set |
| **PJ-G-74** | §5.5.1 `P-PJ-IM-8` (`S-PJ-REUSE-1`), `YES` | the **10** named reuse / re-entrancy / immutability shapes | `{"attempts":10,"held":10,"broken":0,"firstBroken":null,"brokenList":[],"pUnchanged":true}` | PASS — **10 / 10 held**; no consumption, no memo, no cached marker, no guard, no re-entrant refusal |

---

## 5. Register coverage — each of the 8 rows exercised INDEPENDENTLY, observed vs stated

**This is this run's own execution of the register's property text** (`§5.5.1`), driven from the spec's
cells — **not** a re-run of the unit's own file (which was never read). Every attempt count below is
what **this run measured**, against the count the register **states**.

| Register row | Type · stated marking | Register's stated statement | Register's stated attempts | This run's drive | **Observed (this run)** | Result vs statement |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-PJ-IM-1`** | `P-IM` · **`YES (bounded)`** | exactly one decision per spec entry over the **23** enumerated decision classes (`I-1`) | **23** | the same 23 classes, one `project` call per class | **23 driven / 23 held / 0 broken** (`{"attempts":23,"held":23,"broken":0}`) | **HELD (bounded)** — the enumeration's domain matches the cell's 23 classes exactly; the unbounded universal is **not** proven and **not** claimed |
| **`P-PJ-TP-1`** | `P-TP` · **`YES (bounded)`** | both halves total over the **20**-shape pool, `ok === (skipped.length === 0)`, partition holds | **60** draws (seed `20260927`, one LCG step per draw, `index = state mod 20`) | the same seed/step/index form; `HALVES[d mod 2]` × `SINKS[d mod 5]` cover both halves and all five sink shapes | **60 driven / 60 held / 0 broken**; `distinctShapesSeen:19` of `20`; `sinksSeen` all five; `halvesSeen` both | **HELD (bounded)** — 60/60 throws nothing; **NOT a 20-of-20 pool sweep** (`O-8`) and **not** a proof of the universal |
| **`P-PJ-IM-2`** | `P-IM` · **`YES`** | every caller-supplied name is an OWN key; the record has no prototype; no name dropped/renamed/sanitized/misdiagnosed | **22** (`6 × 3 + 4`) | 6 names × 3 host shapes (owns / does not own / two entries naming it) + 4 fixed shapes (own `'__proto__'` entry · `defineProperty`-only own key · ordinary-name control · recording sink) | **22 driven / 22 held / 0 broken**; `callerProtosUntouched:true`, `objectProtoIntact:true` | **HELD** |
| **`P-PJ-IM-3`** | `P-IM` · **`YES`** | one bad key among several never aborts: the key is `accessor-threw`, neighbours keep their own decisions | **36** (`3 × 4 × 3`) | variants (a) always-throwing, (b) throws-on-second-read, (c) frozen `values` with the same throwing accessor × 4 positions × 3 dispositions | **36 driven / 36 held / 0 broken**; the read happens once; the frozen variant behaves as (a) | **HELD** — with the register's own parenthetical for variant (b) recorded as **unusable** (`O-4`); the driven reading is `§2.4` item 3 (c)'s |
| **`P-PJ-IM-5`** | `P-IM` · **`YES (bounded)`** | no non-finite or negative value reaches `applied`; the reason is exact; `-0` is neither | **52** (`26 × 2`) | the 26-entry table × the two format drives, **exact-string assertions** | **52 driven / 52 held / 0 broken**; `nonFiniteHits:[]`; 20 applied values, all strings | **HELD (bounded)** — the table is not the whole number space and is not claimed to be |
| **`P-PJ-IM-6`** | `P-IM` · **`YES`** | for a well-formed projection: one write-or-skip decision per key; a key is in `applied` iff written; at most once per key per call; a throwing write is `write-refused` and absent | **16** (`4 + 4 + 5 + 3`) | (a) 4 write-log positions · (b) 4 failing sink shapes · (c) 5 unusable sinks · (d) 3 re-entrant sinks | **16 driven / 16 held / 0 broken**; `pUnchanged:true` | **HELD** — the stated boundary (well-formed projections only) is respected: `M-11` and `F-10` are **not** driven as false-`applied` rows |
| **`P-PJ-IM-7`** | `P-IM` · **`YES`** | for **any** spec set with a throwing accessor — **including one where EVERY key throws** — the per-key catch is not a first-key bail-out | **12** (`3 × 4`) | 3 table rows (all throw · keys 1/3 throw · keys 2/4 throw) × 4 drives (plain · `format:'number'` · duplicate-name · frozen) | **12 driven / 12 held / 0 broken** | **HELD** — including the all-keys-throw row |
| **`P-PJ-IM-8`** | `P-IM` · **`YES`** | every call with the same projection is equivalent to a first call with that value: call-local results, one write per key **per call**, the projection observably unchanged and unconsumed, **no guard** | **10** | the 10 named shapes (same sink twice · two sinks · `A,B,A` · `applyVarsToRoot` twice · empty `applied` · `write-refused` skip list · inner call from the first key · inner call to the same sink · inner call with a different projection · a frozen projection) | **10 driven / 10 held / 0 broken**; `pUnchanged:true` | **HELD** |
| **TOTAL** | **7 `P-IM` + 1 `P-TP` = 8 rows** | — | **`231`** (`23+60+22+36+52+16+12+10`) | — | **`231` driven / `231` held / `0` broken**, stop-after-5 **not triggered** | **ALL 8 ROWS HELD** — the register's own arithmetic is reproduced term-by-term, inside the `≤100`/row and `≤400` total caps |

**The three `YES (bounded)` rows are bounded here too, and this file says so plainly:** `P-PJ-IM-1`
enumerates **23 classes** (not "every spec entry"), `P-PJ-TP-1` draws **60** times over a **20**-member
pool (and reached **19** members), and `P-PJ-IM-5` enumerates **26** values (not "every number").
**None of the three is a proof of its unbounded universal, and no reader may read this section as one.**

**Register counting discipline, as this run followed it:** one attempt = **one exercised drive** (one
`project` call for `P-PJ-IM-1`, one pinned-seed draw for `P-PJ-TP-1`, one name × shape for
`P-PJ-IM-2`, one value × format for `P-PJ-IM-5`, one sink/sequence shape for `P-PJ-IM-6`/`-IM-8`);
**fixture construction is precondition, not attempt**.

---

## 6. NOT-BLIND-RUNNABLE record — **4 rows**

**These four rows are reported as `NOT-BLIND-RUNNABLE`, never as passes.**

| Id | Row | Why no blind drive exists | What a blind run CAN substitute (and did) |
| --- | --- | --- | --- |
| **PJ-G-59** | §3.4 `R-17` — the normalized source scan (raw + assembled + comments) for the banned vocabulary, plus a positive control and a negative control | The row's whole observable is the **module's source text**; the blind rule forbids reading `src/shared/layout-projection.ts`, and the unit's fixtures are in the red set, which is also forbidden | **nothing** — no runtime substitute proves a vocabulary absence (the module could carry the word in a comment or an unused literal without any behavioural trace) |
| **PJ-G-60** | §3.4 `R-18` — no access rooted in a banned realm token or an alias of one, and no ambient global read for a value | Source-semantic (`S-13`'s realm-rooted form); a runtime observation cannot distinguish "never reads `document`" from "would read it in a path this drive did not take" | **nothing** |
| **PJ-G-61** | §3.4 `R-19` — the import-boundary row (nothing from `src/main/**`, `src/renderer/**`, `electron`, `node:*`, any zones/census module; at most a type-only `src/shared/**` import) | A source/import-declaration claim. **A runtime substitute is strictly weaker**: it can show the module *worked* in this process, not that it imports nothing | **weak corroboration only** — the module was imported and exercised in a plain node context with **no** `electron`, `document` or DOM present, and nothing threw on that basis; that is **not** the row and is not scored |
| **PJ-G-65** | §3.5 `R-22` (b) — the seven **type-only** names (`VarValues`, `VarSpec`, `ProjectionSkipReason`, `ProjectionSkip`, `Projection`, `VarWriteSink`, `ApplyResult`) | A type-only name is **not** a runtime key, so the namespace cannot carry it; a type-level read requires the module's declarations, i.e. the source | **the (a) half was driven** (`PJ-G-64`: runtime set equality over the four value exports, with a fifth-export control) — and the type half stays **owed** |

**One row that is deliberately NOT substituted for a source row:** `PJ-G-62` (`R-20`) is *partly*
runnable because its falsifier is a **file/git probe** (`git diff --name-only`, a `setProperty` census
over the shim, `package.json`'s key set) rather than a semantic read of the module — so it is scored,
and it PASSES. **A `PJ-G-62` pass says nothing about `R-17`/`R-18`/`R-19`, which stay
`NOT-BLIND-RUNNABLE`.**

---

## 7. FAIL rows, attribution and reproduction

**Two rows are FAIL. Both are attributed to DOC/SPEC DRIFT — a real documentation defect a later pass
must fix — and NEITHER to the module.** No row was softened, and no observed value below is inferred:
each is the runner's printed payload.

### 7.1 `PJ-G-58` — `§2.5` item 4's copy-hazard claim is **false for object spread**

**Doc clause cited:** **`docs/specs/projection.md` §2.5 item 4** (*"the null prototype is **destroyed by a
naive copy** — `{...applied}` and `Object.assign({}, applied)` produce a **plain-prototype** object and
**re-invoke `Object.prototype`'s `__proto__` accessor on the target** when the source holds an own
`'__proto__'`"*), and the same sentence in **§0A ruling note 3, consequence 3** (*"spread and
`Object.assign` copy own keys through `[[Set]]` on the target"*).

**Drive (exact):** `p = project({k:1}, {k:{name:'__proto__',unit:''}})` →
`{...p.applied}` · `Object.assign({}, p.applied)` · `Object.assign(Object.create(null), p.applied)`.

**Observed (verbatim):**

```
{"sourceKeys":["__proto__"],"sourceRead":"1","sourceProto":"null",
 "spreadKeys":["__proto__"],"spreadHasOwn":true,"spreadProto":"object","spreadRead":"1",
 "assignKeys":[],"assignHasOwn":false,"assignProto":"object",
 "nullTargetKeys":["__proto__"],"nullTargetHasOwn":true,"nullTargetValue":"1"}
```

**Observed vs expected, exactly:**

| Observable | Expected from `§2.5` item 4 | Observed | Clause |
| --- | --- | --- | --- |
| spread copy: own `'__proto__'` key survives? | **no** — the accessor is re-invoked, the key is lost | **yes** (`spreadKeys:["__proto__"]`, `spreadHasOwn:true`, `spreadRead:"1"`) | `§2.5` item 4, `§0A` note 3 consequence 3 |
| spread copy's prototype | plain (`Object.prototype`) | **plain** (`spreadProto:"object"`) — this half **holds** | `§2.5` item 4 |
| `Object.assign({}, …)`: own `'__proto__'` key survives? | **no** | **no** (`assignKeys:[]`, `assignHasOwn:false`) — this half **holds** | `§2.5` item 4 |
| `Object.assign(Object.create(null), …)`: key survives? | **yes** (the mandated consumer recipe) | **yes** (`nullTargetKeys:["__proto__"]`, value `'1'`) | `§2.5` item 4 |
| the module's own record | own key, null prototype | **own key `'__proto__'`, `sourceProto:"null"`** — the module is correct | `§2.5` item 1, `I-12`/`I-13` |

**Attribution: DOC/SPEC DRIFT — a documentation defect, not a module regression.** The language fact is
that **object spread defines own data properties** (`CopyDataProperties` uses `CreateDataPropertyOrThrow`)
and therefore **never** invokes a target setter; only `Object.assign` (and any other `[[Set]]`-based copy)
does. The spec's **conclusion** (*a naive copy destroys the null prototype*, so a consumer MUST use a
null-prototype target) is **correct and still worth following**; its **stated mechanism and its per-method
claim are wrong for spread**, and a consumer reading them literally would expect a lost key that is in
fact retained. **The remedy is a documentation fix inside `§2.5` item 4 / `§0A` note 3 consequence 3 —
nothing in the module may be changed for this row, and nothing was.**

### 7.2 `PJ-G-75` — `§3.2` `F-12` cell **(c)**'s printed tuple and printed expected list cannot both hold

**Doc clause cited:** **`§3.2 F-12` (`ORDER PINNED` block, (c))**: *"the `duplicate-name` variant
(`--dup`, `--k2`, `--dup`, `--k4`) yields exactly `['duplicate-name', 'accessor-threw', 'missing-value']`
— **the first `--dup` is applied and the THIRD spec entry's duplicate skip sits in the position that
entry occupies, BEFORE the throwing key's entry**"* — read together with the normative rule it cites,
**`§2.4` item 8 (1)**: *"`Projection.skipped`'s entries appear in the order of the **spec entries** that
produced them … **NEVER grouped by reason and NEVER re-sorted**."*

**Reproduction (exact):** a four-entry spec in the printed tuple's order, with the **second** entry's
value an own throwing accessor and the fourth key absent:

```ts
const v = { k1: 1, k3: 3 }
Object.defineProperty(v, 'k2', { get() { throw new Error('hostile') }, enumerable: true, configurable: true })
const specOf = { k1: { name: '--dup', unit: '' }, k2: { name: '--k2', unit: '' },
                 k3: { name: '--dup', unit: '' }, k4: { name: '--k4', unit: '' } }
project(v, specOf)
```

**Expected per the printed cell:** `skipped === [['--dup','duplicate-name'], ['--k2','accessor-threw'],
['--k4','missing-value']]`.
**Observed (verbatim):** `[["--k2","accessor-threw"], ["--dup","duplicate-name"],
["--k4","missing-value"]]` (and `applied === {"--dup":"1"}`).

**Attribution: DOC/SPEC DRIFT — a documentation defect (a self-inconsistent cell), not a module
regression.** The **normative** rule the cell itself cites is `§2.4` item 8 (1), and the module
**follows it**: in the printed tuple's order the throwing entry is **second**, so its skip is second —
the printed expected list (which puts `duplicate-name` first) is satisfiable **only** under a
**different arrangement of the same four entries**, and I drove that arrangement too:
**`(--dup applied, --dup duplicate, --k2 throwing, --k4 absent)` → `[["--dup","duplicate-name"],
["--k2","accessor-threw"], ["--k4","missing-value"]]` — exactly the printed list, and exactly that
arrangement's spec-entry order (`PJ-G-35`, `cB`, PASS).** So the cell's **tuple** and its **expected
list** disagree on the order of two entries, and one of the two printed halves is wrong. **The module
is consistent in both arrangements; the `F-12` (c) cell needs a bounded documentation edit** (either the
tuple or the printed list), and **nothing in the module may be changed for this row, and nothing was.**

### 7.3 An incidental observation, recorded rather than hidden — the unit's OWN `R-20` row fires on THIS greens artifact

**Twice in this pass**, the unit's own `tests/layout-projection.test.ts` failed **exactly one** row —
`R-20 §3.4 — the diff-scope row` — and **both times the cause was my own pass's footprint, not the unit**:

1. **While the four temporary runner files existed:** the message read *"'tests/blind-projection-diag.tmp.test.ts'
   is OUTSIDE this unit's diff scope … git status said: `?? tests/blind-projection-diag.tmp.test.ts …`"*.
   After deleting them the file read `Tests 70 passed (70)` and the suite `62 passed (62)` — **that
   green is what §3's "BEFORE this greens file existed" rows record.**
2. **Final state of this pass (this artifact present and uncommitted):** the message reads, verbatim,
   *`R-20/§5.1: 'docs/specs/projection-greens.md' is OUTSIDE this unit's diff scope (only
   src/shared/layout-projection.ts + tests/layout-projection.test.ts + docs/specs/projection.md may be
   touched) — git status said: "?? docs/specs/projection-greens.md\n"`*, and the unit's file reads
   `Tests 1 failed | 69 passed (70)` while the suite reads `1 failed | 61 passed (62)` /
   `1108 passed | 2 skipped (1111)`.

**Controlled check, so the cause is attributed rather than assumed:** with `docs/specs/projection-greens.md`
**moved aside**, the same command (`vitest run tests/layout-projection.test.ts`) reads **`Tests 70 passed
(70)`**; with it restored, the `R-20` failure returns. **The row's probe reads `git status --porcelain`
and flags any entry outside its three-path allow-list — including this gate's own mandatory artifact.**

**Attribution: NOT a defect in the module and NOT a defect in `R-20`'s contract** — it is a
**workflow/commit-order consequence**: the row's allowed list does not name a `*-greens.md` artifact, and
its probe only sees **uncommitted** files. **The one action that restores the unit's green is the
gate-boundary commit of this artifact** (`AGENTS.md` RCA-8a: *every gate leaves a commit*), after which
`git status --porcelain` is clean and `R-20` passes — **this pass deliberately did not commit** (it may
write this file and its temporary runners and nothing else), so **the commit is the supervisor's**.
**Reported rather than silently worked around**, and **also recorded as independent evidence that
`R-20`'s probe is genuinely falsifiable** (it fires on an out-of-scope file rather than passing
vacuously). **No scenario, drive or expectation in this file was derived from the failure messages** —
`PJ-G-62`'s drive was authored from `§3.4` before either message appeared; the two are the same claim by
construction (one run through the module's surface as a git probe, one as the unit's own row).

---

## 8. Ambiguities (`O-1`…`O-9`) — recorded, never silently resolved

**No clause below was edited, and no row was invented from an ambiguity.** Each is a claim I could not
turn into **one** falsifiable scenario, with the observed values that made it visible.

| # | The clause(s) | Why no single falsifiable scenario exists | What this run did instead (and observed) |
| --- | --- | --- | --- |
| **`O-1`** | **§3.2 `F-1`** (*"every such entry is skipped with `malformed-spec`"*) + **§2.1**'s `ProjectionSkip` (`readonly name: string`) | For an entry that is not a usable `VarSpec` — `null`, `undefined`, a string, a number, an array, `{}`, a non-string/missing `name` — **the skip entry's `name` field is unpinned**: `F-1` fixes only the **reason**, and `§2.1` says only that `name` is a string. A row cannot assert a value the contract does not state, and a *fixture* that asserted one would be hardening a reading into the contract (`C-16`/`RK-10`'s class) | Asserted the **reason only**: **`malformed-spec`** for all **11** malformed shapes, `applied` empty, zero writes (`PJ-G-23`). **Observed**: the module emits `name: ""` for each of the 11 (`skipped:[["","malformed-spec"]]`). **Reported as unpinned, not scored** |
| **`O-2`** | **§3.1 `M-10`** (*"for every §3 row's inputs, the single-key result's `written` equals `project`'s `applied[k]` … or both `null`/absent"*) + **§7a.1 item 10** | **`projectVar(spec, value)` has no channel for a shape whose decision depends on how the value is OBTAINED.** "The key is absent from `values`" (`F-3`) and "the read threw" (`F-4B`) are decisions about **the read**, and `projectVar` is handed an already-obtained value: passing `undefined` is the natural encoding and means *a present `undefined`*, which the validity rule makes **`not-a-number`**. So `M-10`'s "for every §3 row's inputs" is **not satisfiable** for those two shapes, and the spec never says how (or whether) absence/read-failure is expressed at this entry point | Scored the **6 expressible drives** (all agree exactly, both fields, no truthiness test — including the `unit:''` drive where `written` is a short but **real** string). **Recorded, not scored**: `absent-key` → `projectVar` gives `{"written":null,"skip":{"name":"--absent","reason":"not-a-number"}}` while `project({present:1},{absent:…})` gives `missing-value`; `accessor-threw` → `projectVar(spec, undefined)` gives `not-a-number` while `project` on the throwing own accessor gives `accessor-threw` |
| **`O-3`** | **§3.2 `F-12` (c)** — its printed **tuple** `(--dup, --k2, --dup, --k4)` vs its printed **expected list** `['duplicate-name','accessor-threw','missing-value']`, read against **§2.4 item 8 (1)** (spec-entry order, never reason-grouped) | The two printed halves are satisfiable only by **different arrangements** of the same four entries, so **no single drive can assert the cell as written**. As printed, the list is in the **precedence** order (`duplicate-name` → `accessor-threw` → `missing-value`) — the very grouping `§2.4` item 8 (1) declares FAILS | Drove **both** arrangements and asserted the **normative** rule for each (`PJ-G-35`, both PASS), then drove the **printed tuple against the printed list** as its own row: **FAIL** (`PJ-G-75`, §7.2) with both lists and the spec-entry order printed. **Reported as drift, not resolved** |
| **`O-4`** | **§5.5.1 `P-PJ-IM-3`** variant **(b)** — *"an own accessor that throws only on its SECOND read (the memoization trap — the row asserts the read happens once, so **(b) behaves as (a)**)"* vs **§2.4 item 3 clause (c)** (*"an **accessor that throws only on a LATER read than the first is not driven**"*) | The register's parenthetical and the contract clause **contradict each other**: if the read happens exactly once, an accessor that throws only on the **second** read does **not throw** on that one read, so the key is **read successfully** and (being a finite number) is **APPLIED** — it cannot "behave as (a)" (whose observable is `accessor-threw`). Both readings cannot be driven at once | Drove the reading **`§2.4` item 3 (c)** decides (the contract clause wins over a register parenthetical): counted the reads and asserted the single read succeeds ⇒ the key is applied. **Observed: `reads === 1` and the key applied with its value (`'7'`)** — the row held **36/36** on that reading. **The register's parenthetical is reported as unusable as written**, and no register cell was edited |
| **`O-5`** | **§3.3 `I-13`**'s internal half (*"any internal key→value map"*) — and the register's `P-PJ-IM-2`'s *"every lookup over caller data is an own-property lookup"* | The internal maps are **not externally observable**; `I-13`'s own appended limit says so and forbids a row from asserting their prototypes. What is observable is the **behaviour** (the own-property read semantics), not the map | Asserted only the two visible halves (`Projection.applied`/`ApplyResult.applied` by identity, plus the own-property read outcomes — `PJ-G-51`, PASS). **No internal-map claim is made anywhere in this file** |
| **`O-6`** | **§2.4 item 6** (*"`project`'s parameters are `(values, specOf)` — there is **no** `census`, `zones`, `sizes` or `revealed` parameter"*; *"a signature row pins the parameter list (`A-15`)"*) | A blind run can read **`Function.length`** (arity) but **not parameter names**, and a smuggled parameter behind a default, a rest parameter or an options object is invisible at runtime. The structural absence is a **source-level** claim (`S-1`/`S-12`'s class) | Asserted **arity only**: `project.length === 2`, `applyProjection.length === 2`, `projectVar.length === 2`, alias identity (`PJ-G-55`, PASS). **The absence claim is NOT made here** — it belongs to the static rows, and `R-19` is `NOT-BLIND-RUNNABLE` (§6) |
| **`O-7`** | **§3.5 `R-23`** (*"`docs/skills/designing-pages.md` DOES NOT EXIST at the time this unit's red set runs"*) + **§7 item 9**'s conditional obligation | The probe is satisfiable blind, but its result is a statement about **one tree state**: an existence probe cannot be "run" for all times, and its PASS means "absent now", not "never owed" | Probed it (`existsSync` → **`false`**; `docs/skills` holds `process-guardrails.md` alone) ⇒ PASS **as a probe at HEAD `d1e4b27`**, and the conditional obligation is **not triggered**. **The claim is not generalized beyond this run's tree state** |
| **`O-8`** | **§5.5.1 `P-PJ-TP-1`** — *"`60` pinned-seed draws … over the pinned `20`-shape pool"* (the register pins the **draw count** and the **pool inventory**, not the coverage) | The register **does not state** that every pool member is reached by the 60 draws, so no row can assert a 20-of-20 sweep; equally the register does not pin **which** member each draw lands on beyond the stated `index = state mod 20` form, so a reader must not read the draw list as a coverage claim | Reproduced the LCG exactly and **recorded the coverage**: `distinctShapesSeen:19` of `20` — **pool member `19`** (the 3-key spec with two keys naming the same `--dup`) is **never drawn** by these 60 draws. All five sink shapes and both halves **were** covered. **`60/60` is therefore NOT a 20-of-20 pool sweep** |
| **`O-9`** | **§2.5 item 5 (ii)** — *"the MODULE may freeze its own return, and the caller may rely on NEITHER: no row asserts that a returned record IS frozen, and none asserts that it is not"* | A clause that **explicitly forbids** a row from asserting either side of an observable is, by construction, not scorable — it can only be **recorded** | **Recorded as an observation** (diagnostic run): `Object.isFrozen` reads **`false`** for `Projection.applied`, the projection, its `skipped` array, `ApplyResult.applied` and the result record itself. **No row above scores this**, and no consumer may rely on it either way |

**Two further clauses this run could not turn into a `§3`-shaped row, stated so they are not read as
omissions:** **§2.2 prohibition 1** and **§2.2 prohibition 5**'s *"`ALL_TOOLS` stays 21 / `RpcMethod` stays
21"* half — the former is `R-17` (`NOT-BLIND-RUNNABLE`), and the latter is a **repo-wide census this run
deliberately did not take**: `PJ-G-63` shows the **cited seam rows exist and read green** (`5 passed (5)`),
which proves the cited rows are live, **not** that the totals are still 21/21 in `src/main/**` — those
files were not censused by this pass.

---

## 9. Self-corrections inside this run (checker defects, recorded so none is read as a finding or a pass)

Every item below was a **defect in my checker or my drive**, re-derived from the contract text; **no
scenario was softened, no expectation was relaxed to match an observation, and the two FAILs are
separate**. The observed values of the **final** run (§4) are the corrected drives only.

1. **`PJ-G-09`** — my first drive asserted the skip's **`name`** for the frozen-nested-object shape
   (`'--k'`); the contract pins only the **reason** (`O-1`). Corrected to assert the reason.
2. **`PJ-G-10`** — three defects in one drive: (a) I asserted `written === null` **equal to**
   `skip === null`, which is the inverse of `§7a.1` item 10's equivalence; (b) the `project` half was
   driven with the **wrong lookup key** (the name instead of the `specOf` key) and read
   `applied['k']` instead of the **emitted** name's value; (c) the absent-key and throwing-accessor
   drives were scored, though `projectVar` has no channel for them (`O-2`). All three corrected.
3. **`PJ-G-21`** — I snapshotted `r1` **after** mutating `r1.applied` (so "r1/r2/r3 not deep-equal" was my
   own ordering bug) and expected `'1'` where the `px` unit makes it `'1px'`. Both corrected; the row
   then held on the real observables (2K writes, `p` unchanged, mutation contained).
4. **`PJ-G-39`** — I asserted `I-1` **per name** rather than **per spec entry**, which flags a duplicate
   name as "in BOTH lists". `I-1` partitions the **entries**; corrected to a per-entry decision count,
   with the duplicate class explicitly allowed to show one name twice.
5. **`PJ-G-67`/`PJ-G-73`** — the same per-entry error inside the register drives, plus two wrong
   expectations: a malformed entry's list membership (`O-1`) and the **duplicate-name precedence** for a
   throwing key that is also the duplicate second occurrence (`duplicate-name` beats `accessor-threw`,
   `§2.4` item 3's fixed precedence). Corrected; the register rows then read 23/23 and 12/12.
6. **`PJ-G-29`/`PJ-G-31`/`PJ-G-11`** — three drives called `applyProjection` **twice on one sink** (once
   inside my no-throw probe, once for the observation). The **asserted** observables come from a single
   call's result and are unaffected; the only affected payload field is `PJ-G-31`'s `attempted: 6`
   (2 calls × 3 keys), which this file therefore **does not read as an attempt count**. Recorded rather
   than hidden.
7. **`PJ-G-32`/`PJ-G-33`/`PJ-G-38`/`PJ-G-44`** — the same double-call error made the sink logs read
   doubled (`[["--a","1"],["--a","1"]]`); re-driven with exactly one call per shape.
8. **`PJ-G-69`** — I compared the module's `skipped` **records** (`{name, reason}`) against
   `[name, reason]` **pairs**, so 12 of 22 attempts reported a shape mismatch that was entirely mine.
   Corrected to compare the flattened pairs; the row then held 22/22.
9. **`PJ-G-70`** — my `frozen-values` variant built a **non-throwing** accessor (only the
   `always-throws` variant threw), so its 12 attempts were reported broken. Corrected so the frozen
   variant carries **the same always-throwing accessor** (which is what the register's cell says); the
   row then held 36/36. **The diagnostic (`diag2`) that isolated this is recorded here** because it
   temporarily looked like a frozen-input behaviour difference and is **not** one.
10. **`PJ-G-51`** — my check read two payload fields my drive never returned. Corrected.
11. **`PJ-G-35`/`PJ-G-75`** — after the first run I re-driven the `duplicate-name` variant in the
    **arrangement its printed expected list requires** (throwing accessor on the third entry) and added
    `PJ-G-75` for the printed tuple, which is what turned `O-3` from an ambiguity into a **drift
    finding** with a reproduction. **The `PJ-G-35` verdict is PASS on the normative rule in both
    arrangements; `PJ-G-75` is the FAIL.**

---

## 10. The temporary runners — exact paths, and proof of deletion

**Paths used (all temporary, all now deleted):**

- **`tests/blind-projection-greens.tmp.test.ts`** — the **75 scored rows** (§4) + the `ZZ-summary` line.
- **`tests/blind-projection-diag.tmp.test.ts`** — isolated the frozen-vs-unfrozen throwing-accessor
  behaviour (§9 item 9).
- **`tests/blind-projection-diag2.tmp.test.ts`** — reproduced the `PJ-G-70` frozen variant exactly and
  showed the defect was mine, not the module's.
- **`tests/blind-projection-diag3.tmp.test.ts`** — the recorded observations (`O-9`'s freeze flags; the
  single-read observation).

**Deletion proof, exactly:** `ls tests/ | grep -ci tmp` prints **`0`**; **at the moment of deletion
`git status --porcelain` printed nothing at all** (verbatim: an empty output — the workspace had **no**
pre-existing modification and this pass left none), and the full suite read **`Test Files 62 passed
(62)`** with the four temporary files gone against **`2 failed | 64 passed (66)`** while they existed
(§3). **Final state, stated honestly:** `git status --porcelain` now prints exactly one line —
**`?? docs/specs/projection-greens.md`** — this artifact, which is the **only** file this pass leaves
behind (it is also what makes the unit's `R-20` row red until it is committed: §7.3).
**This pass edited no other tracked file**: not the spec, not the module, not the red set, not the
trackers, not `package.json`, and it never touched `node_modules/provident-ssr/` or
`../Preempt-Providence/`.

**Scope of the blindness claim, exactly:** `src/shared/layout-projection.ts` was **never opened, never
read, never printed** — it was imported and called as a black box through its documented surface.
`tests/layout-projection.test.ts` was **never read**: it was **run twice for its count** (§3) and its one
failure report disclosed a row id and an assertion sentence (§7.3), which is recorded and which
contributed **nothing** to any drive. The probes that did read **text** read
`src/shared/dom-shim.ts` (a `setProperty` token census) and `tests/engine-pin-version.test.ts` (a
presence census of the rows `R-21` **cites**) — **neither file's contents were used to author any
scenario**, and neither is the unit's contract.

---

## 11. Honesty — exactly what this run does and does not prove

**May rest on this record:**

- **the documented surface and the four rulings, exercised black-box**: the two-argument
  `project(values, specOf)`, the total applier, the identity alias, and the skip pattern (`PJ-G-01`..`-22`,
  `-53`..`-57`);
- **every documented fail-state, each as its typed reason**: `malformed-spec`, `duplicate-name`,
  `missing-value`, `not-a-number`, `accessor-threw`, `negative`, `sink-unusable`, `write-refused` —
  all **eight** members of the closed union were driven and observed (`PJ-G-23`..`-38`);
- **the four `§0A` rulings as behaviour**: reuse across different sinks and into the same sink
  (`PJ-G-21`/`-22`/`-49`), the per-key catch of a throwing accessor with its **own** reason
  (`PJ-G-27`/`-35`/`-70`), the `Object.create(null)` record with own keys for every caller name
  (`PJ-G-18`/`-19`/`-20`/`-36`/`-50`/`-51`), and the projection as **immutable input** with **no**
  re-entrancy guard (`PJ-G-37`/`-38`/`-52`/`-74`);
- **the pinned orders**: `applied`'s spec order, the projection's **spec-entry** `skipped` order, and the
  applier's **own-refusals-first-then-carried** order (`PJ-G-06`, `-24`, `-35`, `-57`);
- **the write-log discipline**: one write per key per call, a refusal never reported as applied, a
  malformed sink deciding every key (`PJ-G-05`, `-29`, `-30`, `-31`, `-41`, `-72`);
- **the `skipped`-order-independent partition and no-throw contracts** (`PJ-G-39`, `-40`, `-45`, `-47`,
  `-48`);
- **the register, exercised independently: `231` attempts driven / `231` held / `0` broken**, term-by-term
  against the eight stated counts, with the three bounded rows still marked bounded (§5);
- **the diff scope and the shim negative**, by file/git probe (`PJ-G-62`), and the cited seam rows are
  live and green (`PJ-G-63`);
- **the corroboration legs, with their exact tree states**: the full node suite **`62 passed (62)` /
  `1109 passed | 2 skipped (1111)`** and the unit's own row file **`70 passed (70)`** (count only, never
  read) — both measured **with my temporary files deleted and before this greens artifact existed**; the
  cited seam leg **`5 passed (5)`**. **In the final state the only red in the suite is the unit's own
  `R-20` firing on this uncommitted artifact (§3, §7.3), and the gate-boundary commit discharges it.**

**May NOT rest on this record:**

- **the module's source-level prohibitions.** `R-17`, `R-18` and `R-19` are **`NOT-BLIND-RUNNABLE`** and
  **ungreen here**; `R-22`'s type-only half likewise. **A reader may not infer from this file that the
  module carries no banned vocabulary, no realm-rooted access and no unauthorized import** — those are
  **owed** to a source-reading pass, and a self-verified greens set authored by the implementer is a
  review finding (RCA-4).
- **the two `FAIL`s as anything but drift.** `PJ-G-58` and `PJ-G-75` are **doc/spec defects** (§7.1,
  §7.2) with reproduced inputs; **the module was not changed for either**, and **no DONE row may read the
  unit as fully doc-clean** until `§2.5` item 4 / `§0A` note 3 consequence 3 and `§3.2 F-12` (c) are
  edited by the pass that owns them.
- **`§2.4` item 6's parameter-list absence** (`O-6`) — arity is green, the **absence** is not claimed.
- **`§2.2` prohibition 5's repo-wide totals** — the seam rows' **existence and greenness** are shown; the
  `21`/`21` censuses in `src/main/**` were **not** taken by this pass.
- **any CSS, layout, paint, geometry or rendered-value claim.** Every sink here is a **fake sink**, so
  the green proves **the exact strings the sink was handed** and **nothing** about what a browser does
  with them (`§7` item 10; the Layer declaration's anchor 2).
- **any assembled-app, IPC-layer or MCP-transport claim.** The module is imported by **no** `src/**` file;
  no window was booted and no transport was exercised.
- **the optional `[U]` real-DOM row** — **NOT TAKEN**, and no row was moved to it.
- **the unit's suite as green in the FINAL state of this pass** — `R-20` is red **because this artifact is
  uncommitted** (§7.3); that red is a commit-order artifact, is **not** a module or contract defect, and
  is **not** evidence about `U-PROJ`'s behaviour either way.

**One-line layer honesty:** *75 node-layer `[T]`/`[H]`/`[S]` scenario rows, authored and run from
`docs/specs/projection.md` alone against `src/shared/layout-projection.ts` imported as a black box over
caller-supplied fake sinks — **69 PASS / 2 FAIL / 4 NOT-BLIND-RUNNABLE**, the register at 231/231 held and
both FAILs attributed to doc/spec drift — a node green, never assembled-app evidence, and the `[U]` row is
not taken.*

---

# ADDENDUM (§12) — TARGETED RE-VERIFICATION, after the three host fixes (`e16ee8e`) and the spec amendment (`d959c4c`)

**Status: `BLIND RE-VERIFICATION ADDENDUM — 47 executed scenario rows: 42 PASS / 3 FAIL / 2 NOT-BLIND-RUNNABLE`.**

**Why this addendum exists.** The 75 rows above (§1–§11) were authored and run against the **pre-fix**
module. THREE HOST FIXES have since landed (`e16ee8e`: `ADV-PJ-1` totality for a `values` whose own-property
question throws, `ADV-PJ-2` totality for a projection whose `applied`/`skipped` field read throws,
`FUNCTION-VALUES-1` the callable-`values` ruling) and the spec was amended (`d959c4c` + the
four-cell re-derivation). **A green artifact that predates a behavioural change to the module it validates is
a review finding unless it is re-verified** — so the affected territory was re-authored **from the amended
documentation**, re-run, and is recorded here. **NOTHING above this line was rewritten, renumbered or
re-scored; this is an append (§12).**

| | |
| --- | --- |
| **Gate** | 5 (blind greens) — the **re-verification pass** after `e16ee8e` / `d959c4c` |
| **Tree state (HEAD)** | **`e16ee8e`** (`e16ee8e3c785159c9c8c5f5e5e2c2fe871b826bd`) — `U-PROJ gate 4 GREEN (host fixes + coupled test repair): ADV-PJ-1/-2 totality guards + FUNCTION-VALUES-1 callable-values ruling` |
| **Authored from** | **THE DOCUMENTATION ONLY, as amended**: `docs/specs/projection.md` (§2.3, §2.4 items 2/3/5/6/8, §2.5 item 4 **as corrected**, §3.2 `F-1`/`F-2`/`F-4A`/`F-4B`/`F-9`/`F-10`/`F-11`/`F-12` **cell (c) as corrected**, §3.3 `I-7`/`I-9`, §3.4 `R-17`..`R-20`, §3.5 `R-22`/`R-23`, §5.1, §5.2 **leg 4**, §5.5.1 **all eight cells** incl. the pool enumeration and the two re-derived binding cells, §3b-1's `ADV-PJ-1`/`ADV-PJ-2`/`ADV-PJ-3`/`ADV-PJ-5`/`ADV-PJ-6`/`ADV-PJ-9`/`ADV-PJ-11`/`ADV-PJ-12`/`ADV-PJ-17` cells, §3b-2's `(e)`/`(h)`/`(m)` rulings, §3b-3's corrections, §0/§0A, and `scripts`/`package.json`/`vitest.config.ts` only to construct a runnable runner) |
| **Implementation read?** | **NO.** `src/shared/layout-projection.ts` was **never opened, never read, never printed** — imported as a black box (four documented value exports) and exercised through fake sinks. |
| **Red set read?** | **NO.** `tests/layout-projection.test.ts` was **never read**: it was **run twice for its count only**, and only the summary lines were inspected (grep filter above the failure detail) — no assertion, row id or fixture of it reached this session. |
| **Line-number citations** | The §2.5/§8 **citation rule** (`§8`'s closing note: *cite sections, never lengths*) is honoured as the **primary** form; a `projection.md:NNNN` figure is added only where this task requires `file:line`, and is a **convenience for the reviewer at HEAD `e16ee8e`**, never the contract's own citation form. |

---

## §12.1 The scenario rows

**Format as §4's: `Doc clause` cites by section + row id; `Observed` quotes the runner's verbatim printed
`console.log` payload (JSON as printed, abridged with `…` only where long, every fragment a verbatim prefix).**

### §12.1.1 The `ADV-PJ-1` territory — a `values` whose own-property question throws (7 rows: 6 PASS / 1 FAIL)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-R-01** | §2.4 item 2 + §3.3 `I-7` + §3b-1 `ADV-PJ-1` (`projection.md:852-857`, `:1192`, `:2444`) | `Proxy.revocable({k1:1,k2:2})` + `revoke()`, then `project(values, {k1:…,--k1/k2 px})` | `{"err":null,"skipped":[["--k1","accessor-threw"],["--k2","accessor-threw"]],"applied":[],"decisions":2,"specEntries":2,"reasonDomainOk":true,"proto":"null"}` | **PASS on the TOTALLITY half** — `project` did **not** throw, exactly one decision per spec entry, every reason ∈ the **eight-member** domain (**no ninth reason**), `applied` a null-prototype record |
| **PJ-R-02** | §2.4 items 2/3 (2) + `ADV-PJ-1` | a `Proxy` whose **`getOwnPropertyDescriptor` trap throws** | `{"err":null,"skipped":[["--k1","accessor-threw"],["--k2","accessor-threw"]],"applied":[],"decisions":2,"specEntries":2,"reasonDomainOk":true}` | **PASS** (same assertions) |
| **PJ-R-03** | §2.4 item 2 + `I-7` + `ADV-PJ-1` | a `Proxy` whose **`ownKeys` trap throws** | `{"err":null,"skipped":[],"applied":[["--k1","1px"],["--k2","2px"]],"decisions":2,"reasonDomainOk":true}` | **PASS** — no throw; both entries **applied** (the own-property test does not consult `ownKeys`); the keys are **accounted for** |
| **PJ-R-04** | §2.4 item 3's `'accessor-threw'` trigger clause + `F-4B` | a `Proxy` whose **`get` trap throws for `k1` only** | `{"err":null,"skipped":[["--k1","accessor-threw"]],"applied":[["--k2","2px"]],"reasonDomainOk":true}` | **PASS** — per-key decision, the read-failure key recorded, the neighbour still applied, no bail-out |
| **PJ-R-05** | §2.4 item 3 (2) own-property read — **control** | a **healthy** `Proxy({k1:1,k2:0})` vs the equivalent plain object | `{"plainApplied":[["--k1","1px"],["--k2","0px"]],"proxyApplied":[["--k1","1px"],["--k2","0px"]],"plainSkipped":[],"proxySkipped":[],"equal":true}` | **PASS** — the healthy Proxy is **indistinguishable** from the plain object |
| **PJ-R-06** | **§3b-1 `ADV-PJ-1`'s remedy cell** (`projection.md:2444`): *"a `values` whose own-property test throws yields … the decision the module can honestly make (**`missing-value` — the key could not be established as an own key**)"* | the same revoked-Proxy drive as `PJ-R-01`, asserted against the **cell's stated reason** | `{"observed":[["--k1","accessor-threw"]],"cellStatedReason":"missing-value","holds":false}` | **FAIL — doc/spec drift (§12.4.1).** The module records **`accessor-threw`**; the cell states **`missing-value`** |
| **PJ-R-42** | §3b-1 `ADV-PJ-1`'s **regression-row drive shapes** (a `Proxy` with a throwing `has` trap; an object whose `hasOwnProperty` access throws) | both shapes, one `project` call each | `{"throwing has trap":{"err":null,"skipped":[],"applied":[["--k1","1px"],["--k2","2px"]],"decisions":2,"reasonDomainOk":true},"throwing own hasOwnProperty access":{…same…}}` | **PASS** — no throw, one decision per entry, reasons in-domain (both shapes are **applied**: the own-property read used does not consult `[[HasProperty]]` nor an own `hasOwnProperty` shadow) |

### §12.1.2 The `ADV-PJ-2` territory — a projection whose field read throws (5 rows: 4 PASS / 1 FAIL)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-R-07** | §3b-1 `ADV-PJ-2` (`projection.md:2445`) + §2.3 item 4 + `M-11` | a projection whose **`applied` is a throwing own accessor** (`skipped: []` readable) | `{"err":null,"applied":[],"skipped":[],"ok":true,"calls":0,"reasonDomainOk":true}` | **PASS** — the cell's result holds exactly: `{applied:{}, skipped:[], ok:true}` and **zero sink calls**, no throw, no ninth reason |
| **PJ-R-08** | **§3b-1 `ADV-PJ-2`'s concluding sentence** (`projection.md:2445`): *"so the call returns `ApplyResult{ applied: {}, skipped: [], ok: true }`"* | a projection whose **`skipped` is a throwing own accessor** and whose **`applied` is readable** (`{'--a':'1','--b':'2'}`) | `{"err":null,"applied":[["--a","1"],["--b","2"]],"skipped":[],"ok":true,"calls":[["--a","1"],["--b","2"]]}` | **FAIL — doc/spec drift (§12.4.2).** The cell's **per-field** first half holds (the unreadable `skipped` contributes no carried entries); its **concluding blanket sentence** does not (the readable `applied` half **is** written) |
| **PJ-R-09** | §3b-1 `ADV-PJ-2` + §3.3 `I-7` | a **revoked-Proxy** projection (`{applied:{'--a':'1'}, skipped:[]}` in the target) | `{"err":null,"applied":[],"skipped":[],"ok":true,"calls":0,"reasonDomainOk":true}` | **PASS** — exact `M-11` shape, zero sink calls, nothing throws |
| **PJ-R-10** | §2.3 item 1 (the projection is an INPUT record) — **control** | a projection whose **`applied` is a NON-throwing own accessor** returning `{'--a':'1','--b':'2'}` | `{"applied":[["--a","1"],["--b","2"]],"skipped":[],"ok":true,"calls":[["--a","1"],["--b","2"]]}` | **PASS** — a non-throwing accessor-bearing `applied` is **honoured normally**; the write proceeds |
| **PJ-R-11** | §2.3 items 2/3 + §3.2 `F-10` (an unreadable/coercible value ⇒ `write-refused`) — **control** | a well-formed projection whose `applied['--a']` is a **value-level throwing accessor**, with a good neighbour `--b` | `{"err":null,"applied":[["--b","2"]],"skipped":[["--a","write-refused"]],"ok":false,"calls":[["--b","2"]]}` | **PASS** — per-key **`write-refused`**, the neighbour still written, the run did not abort, no throw |

### §12.1.3 The `FUNCTION-VALUES-1` ruling and its three controls (5 rows)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-R-12** | **§2.4 item 3 clause (iii) `FUNCTION-VALUES-1`** (b)/(c) (`projection.md:971`) | `function f(a){}` as `values`, with spec **keys literally named `length`/`name`/`prototype`** | `{"err":null,"applied":[],"skipped":[["--len","missing-value"],["--nm","missing-value"],["--proto","missing-value"]],"proto":"null","reasonDomainOk":true}` | **PASS** — a function is a **NON-RECORD `values`**: every entry `missing-value` (including the function's own real `length`/`name`/`prototype` properties), `applied {}`, nothing throws |
| **PJ-R-13** | clause (iii)(d)(1) — the **sink** position stays duck-typed | a **function** `sink` carrying a callable `setProperty` on its own `style` | `{"applied":[["--k1","1px"],["--k2","2px"]],"skipped":[],"ok":true,"calls":[["--k1","1px"],["--k2","2px"]]}` | **PASS** — **USABLE**, the write proceeds |
| **PJ-R-14** | clause (iii)(d)(1) + §2.3 item 4 / `F-6` | a **function** `sink` with no `style` path | `{"applied":[],"skipped":[["--k1","sink-unusable"],["--k2","sink-unusable"]],"ok":false}` | **PASS** — **`sink-unusable` for every key**, `applied {}`, `ok false` |
| **PJ-R-15** | clause (iii)(d)(2) + `F-10` | a **function** as a hand-built `applied` field, with own `'--a'='1'`, `'--b'='2'`, `'--c'={}` | `{"applied":[["--a","1"],["--b","2"]],"skipped":[["--c","write-refused"]],"ok":false,"calls":[["--a","1"],["--b","2"]]}` | **PASS** — duck-typed by the same own-key rule; the non-primitive value is `write-refused` |
| **PJ-R-16** | clause (iii)(d)(3) | a **function** as the **projection argument**, carrying own `applied`/`skipped` | `{"applied":[["--a","1"]],"skipped":[],"ok":true,"calls":[["--a","1"]]}` | **PASS** — object-like and **NOT** a non-record: `M-11`'s no-op does **not** apply; the write proceeds |

### §12.1.4 The re-derived `P-PJ-IM-3` variant (b) (1 row)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-R-17** | **§5.5.1 `P-PJ-IM-3` variant (b) re-derived** (`ADV-PJ-5`; `projection.md:1690`) + §2.4 item 3 clause (c) | a 4-key spec where `k2`'s own accessor **succeeds on the FIRST read and would throw on a SECOND** (read counter) | `{"err":null,"reads":1,"applied":[["--k1","1"],["--k2","2"],["--k3","3"],["--k4","4"]],"skipped":[],"hasAccessorThrewEntry":false}` | **PASS** — the key is **APPLIED** with the first read's formatted value, the read count is **exactly `1`**, and there is **no `'accessor-threw'` entry** |

### §12.1.5 The two corrected doc-drift cells — the two gate-5 FAILs re-driven (3 rows)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-R-18** | **§2.5 item 4 AS CORRECTED** (`projection.md:1065-1091`) + §0A note 3 consequence 3 — *this is the drive of the gate-5 FAIL `PJ-G-58`* | `p = project({k:1},{k:{name:'__proto__',unit:''}})`; then `{...p.applied}`, `Object.assign({}, …)`, `Object.assign(Object.create(null), …)` | `{"sourceKeys":["__proto__"],"sourceProto":"null","spreadKeys":["__proto__"],"spreadHasOwn":true,"spreadRead":"1","spreadProto":"object","assignKeys":[],"assignHasOwn":false,"assignProto":"object","nullTargetKeys":["__proto__"],"nullTargetHasOwn":true,"nullTargetValue":"1"}` | **PASS (was FAIL) — `PJ-G-58`'s new verdict.** The corrected cell's three per-method claims hold **exactly**: spread **KEEPS** the own `'__proto__'` key (and destroys the null prototype); `Object.assign({}, …)` loses **both**; the null-prototype recipe keeps the key |
| **PJ-R-19** | **§3.2 `F-12` cell (c.1) AS CORRECTED** (`projection.md:1178`) — the printed tuple `(--dup, --k2, --dup, --k4)` with the **second** entry's value a throwing own accessor — *this is the drive of the gate-5 FAIL `PJ-G-75`* | the printed tuple, in its own order | `{"driveTuple":["--dup","--k2","--dup","--k4"],"applied":[["--dup","1"]],"skipped":[["--k2","accessor-threw"],["--dup","duplicate-name"],["--k4","missing-value"]],"correctedCellList":[[…same…]]}` | **PASS (was FAIL) — `PJ-G-75`'s new verdict.** The corrected cell's (c.1) list is **exactly** the module's output (spec-entry order) |
| **PJ-R-20** | §3.2 `F-12` cell **(c.2)** — the arrangement the as-written list actually describes | the two `--dup` entries adjacent, the throwing entry **third** | `{"applied":[["--dup","1"]],"skipped":[["--dup","duplicate-name"],["--k2","accessor-threw"],["--k4","missing-value"]]}` | **PASS** — exactly (c.2)'s stated list, and exactly that arrangement's spec-entry order |

### §12.1.6 Further amended-cell rows a first-time reader derives differently now (13 rows)

**Every row below is derived from a clause that the amendment **ADDED, PINNED or RE-DERIVED** — i.e. a row a
reader of the pre-amendment text **could not** have authored in this form.**

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-R-21** | **`§3.2 F-1` + `SKIP-NAME-1` (1)/(iii)** (`projection.md:1162-1163`) | six entries whose `name` is unusable: `42`, `null`, `{}`, `['--x']`, missing, `null` entry | `{"skipped":[["","malformed-spec"],["","malformed-spec"],["","malformed-spec"],["","malformed-spec"],["","malformed-spec"],["","malformed-spec"]],"applied":[]}` | **PASS** — the name is **`""`** for every shape that declares none, **never invented** (not the `specOf` key, not a coercion) |
| **PJ-R-22** | **`SKIP-NAME-1` (1) (ii)** | `{a:{name:'--dup', unit:7}}` (usable name, malformed `unit`) | `{"skipped":[["--dup","malformed-spec"]],"applied":[]}` | **PASS** — a declared usable string `name` is kept **verbatim** |
| **PJ-R-23** | **§2.4 item 3 clause (iv) `SKIP-ACCEPT-1` (A)** (`projection.md:985`) | `project({a:1,b:2}, {a:{name:'--dup'}, b:{name:'--dup',unit:''}})` | `{"applied":[["--dup","2"]],"skipped":[["--dup","malformed-spec"]],"hasDuplicateName":false}` | **PASS** — the malformed `a` **reserves nothing**; `b` is **APPLIED**; **no `duplicate-name` entry exists** |
| **PJ-R-24** | **`SKIP-ACCEPT-1` (B)** (the non-vacuous control) | the same with **two VALID** entries naming `'--dup'` | `{"applied":[["--dup","1"]],"skipped":[["--dup","duplicate-name"]]}` | **PASS** — the set **is still written** for accepted entries (the row cannot pass by never writing it) |
| **PJ-R-25** | **`SKIP-ACCEPT-1` (C)** + `§3.2 SKIP-THREW-1` | the FIRST entry's own `specOf` read throws; the second valid entry names `'--dup'` | `{"err":null,"applied":[["--dup","2"]],"skipped":[["","malformed-spec"]],"hasDuplicateName":false}` | **PASS** — the throwing entry read is `malformed-spec` with `name: ""`, the throw never propagates, and nothing is reserved |
| **PJ-R-26** | **`§3.2 SKIP-THREW-1`** (`projection.md:1164`) — the two-layer clause | (i) a `specOf` whose own key read throws; (ii) a `values` whose own key read throws | `{"specLayer":[["","malformed-spec"]],"valuesLayer":[["--v","accessor-threw"]]}` | **PASS** — the **SPEC-MAP layer** ⇒ `malformed-spec` with `name:""`; the **CALLER-DATA layer** ⇒ `accessor-threw` with the key's **own emitted name** |
| **PJ-R-27** | **§3.2 `F-2` (KEY AND ORDER)** + §2.4 item 8 (1)/(2) | `project({b:2},{a:{name:'--dup'},b:{name:'--dup'}})` then the applier | `{"applied":[],"projSkipped":[["--dup","missing-value"],["--dup","duplicate-name"]],"resultSkipped":[…same…],"calls":[]}` | **PASS** — the first occurrence's **own** reason first, the second `duplicate-name`, in **spec-entry order**; the applier carries the list **unchanged** |
| **PJ-R-28** | **§3b-2 (e)** + §2.3 items 4/8 (2) (`projection.md:2472`) — the `sink-unusable` re-labelling of CARRIED entries | a hand-built projection: 2 applied keys + 2 carried skip entries, against `null` | `{"applied":[],"skipped":[["--a","sink-unusable"],["--b","sink-unusable"],["--s1","sink-unusable"],["--s2","sink-unusable"]],"ok":false}` | **PASS** — **every** applied key **and every carried entry** appears with `sink-unusable`, the carried order preserved, `applied {}`, `ok false` |
| **PJ-R-29** | **§3b-2 (h)** (`projection.md:2475`) — a non-record `applied` FIELD | `{applied:'nope', skipped:[]}` and `{applied:'nope', skipped:[1 entry]}` | `{"err":null,"emptySkips":{"applied":[],"skipped":[],"ok":true},"carried":{"skipped":[["--s","missing-value"]],"ok":false},"calls":0}` | **PASS** — zero planned writes; `ok` computed from the **emitted** list (`true` when empty, `false` when one entry is carried); no throw |
| **PJ-R-30** | **§2.4 item 8 (2)** + §3.3 `I-2`/`I-3` (the applier-side assembly no pre-amendment row drove) | a hand-built projection (3 applied keys, 2 carried entries) against a sink refusing the **second** write | `{"applied":[["--a","1"],["--c","3"]],"skipped":[["--b","write-refused"],["--s1","missing-value"],["--s2","not-a-number"]],"calls":[["--a","1"],["--b","2"],["--c","3"]]}` | **PASS** — **its own refusals first (in `applied` order), then the carried entries in input order**; neither sub-list re-sorted; never interleaved |
| **PJ-R-31** | **§3.3 `I-9`'s NARROWED form (2)** (`§7a.1` item 7) + §2.4 item 4 | `NaN`,`±Infinity`,`-1`,`-0`,`0`,`1e21` with `unit:'px'` | `{"applied":[["--zero","0px"],["--pz","0px"],["--e21","1e+21px"]],"skipped":[["--nan","not-a-number"],["--inf","not-a-number"],["--ninf","not-a-number"],["--neg","negative"]],"literalHits":[],"allStrings":true}` | **PASS** — exact strings, every applied value a **string**, **no applied value equals `'NaN'`/`'Infinity'`/`'-Infinity'`**, and **no bare `'-'`-prefix test was used** |
| **PJ-R-32** | **§2.3 item 4's pinned ASYMMETRY** (`projection.md:761-770`) | 4 malformed **projections** (`null`/`undefined`/`'nope'`/`42`) vs 5 unusable **sinks** over a well-formed projection | `{"malformedProjection":{"42":{"applied":0,"skipped":0,"ok":true},…all four…},"unusable":{"42":{"applied":0,"skipped":[["--k1","sink-unusable"],["--k2","sink-unusable"]],"ok":false},…all five…}}` | **PASS** — a malformed **projection decides NOTHING**; a malformed **sink decides EVERY key** (one `sink-unusable` per key), `ok false`; **no ninth reason** |
| **PJ-R-33** | **§2.5 item 4 AS CORRECTED**, second half | the same record with a **non-dangerous** neighbour key `'--b'` as well | `{"spreadKeys":["__proto__","--b"],"spreadProto":"object","assignedKeys":["--b"],"assignedProto":"object","nullTargetKeys":["__proto__","--b"],"nullTargetValue":"1","resultProto":"null"}` | **PASS** — spread keeps **every** own key; `Object.assign({}, …)` loses **only** the own `'__proto__'` key; the null-prototype recipe keeps every key; the module's own record stays null-prototype |

### §12.1.7 The 8 register rows re-driven from the amended `§5.5.1` (8 scenario rows)

**Each row below is ONE scenario recording this pass's own execution of that register row's property text
(`§5.5.1`), driven from the **amended** cells** — including the re-derived `P-PJ-TP-1` binding
(`half = shape.axis`, `sink = SINKS[i mod 5]`) and the re-derived `P-PJ-IM-3` variant (b). The **statement,
type, strategy id and attempt count** columns quote the register as it now stands.

| Id · register row | Type · stated marking | Register's stated statement (abridged to its quantifier) | Strategy id · stated attempts | This run's drive | **Observed (this run)** | Result vs statement |
| --- | --- | --- | --- | --- | --- | --- |
| **PJ-R-34** · `P-PJ-IM-1` | `P-IM` · `YES (bounded)` | exactly one decision per spec entry over the enumerated decision classes (`I-1`) | `S-PJ-DECISION-1` · **23** | the 23 fixed classes, one `project` call each | `{"attempts":23,"held":23,"broken":0,"firstBroken":null}` | **HELD (bounded) — 23/23**; unchanged from the earlier blind run |
| **PJ-R-35** · `P-PJ-IM-2` | `P-IM` · `YES` | every caller-supplied name is an OWN key; null prototype; nothing dropped/renamed/misdiagnosed | `S-PJ-OWNKEY-1` · **22** (`6×3+4`) | 6 dangerous names × 3 host shapes + 4 fixed shapes | `{"attempts":22,"held":22,"broken":0,"brokenList":[]}` | **HELD — 22/22** |
| **PJ-R-36** · `P-PJ-IM-3` | `P-IM` · `YES` | one bad key never aborts; the key is `accessor-threw` (variant (a)/(c)); **variant (b) is the APPLIED case** | `S-PJ-ACCESSOR-1` · **36** (`3×4×3`) | variants (a) always-throws · (b) second-read-only · (c) frozen + always-throws × 4 positions × 3 dispositions, with a fresh-fixture repeat call per attempt | `{"attempts":36,"held":36,"broken":0,"brokenList":[]}` | **HELD — 36/36** on the **re-derived** reading (variant (b) applied, read count asserted `1`) |
| **PJ-R-37** · `P-PJ-IM-5` | `P-IM` · `YES (bounded)` | no non-finite/negative value reaches `applied`; the reason is exact; `-0` is neither | `S-PJ-NUMERIC-1` · **52** (`26×2`) | the 26-entry table × 2 format drives, **exact-string** assertions | `{"attempts":52,"held":52,"broken":0,"appliedStringCount":20,"nonFiniteHits":[]}` | **HELD (bounded) — 52/52**; 20 applied values, all strings, no non-finite literal |
| **PJ-R-38** · `P-PJ-IM-6` | `P-IM` · `YES` | one write-or-skip decision per key; `applied` iff written; at most once per key per call; a throwing write is `write-refused` and absent | `S-PJ-WRITELOG-1` · **16** (`4+4+5+3`) | (a) 4 assertions over ONE `K=4` execution (the **`ADV-PJ-9` honest reading**) · (b) 4 failing sink shapes · (c) 5 unusable sinks · (d) 3 re-entrant sinks | `{"attempts":16,"held":16,"broken":0,"pUnchanged":true}` | **HELD — 16/16**; the stated boundary (well-formed projections only) respected |
| **PJ-R-39** · `P-PJ-IM-7` | `P-IM` · `YES` | for any spec set with a throwing accessor — **including every key throwing** — the per-key catch is not a first-key bail-out | `S-PJ-THROW-1` · **12** (`3×4`) | 3 table rows × 4 drives (plain · `format:'number'` · duplicate-name · frozen), expected reasons derived per entry from §2.4 item 3's precedence + `SKIP-ACCEPT-1` | `{"attempts":12,"held":12,"broken":0,"brokenList":[]}` | **HELD — 12/12**; incl. the all-keys-throw row and the duplicate-name drive (the second occurrence of a shared name is `duplicate-name`, the first keeps `accessor-threw`) |
| **PJ-R-40** · `P-PJ-IM-8` | `P-IM` · `YES` | every call with the same projection is equivalent to a first call with that value; call-local results; one write per key **per call**; the projection observably unchanged and unconsumed; **no guard** | `S-PJ-REUSE-1` · **10** | the 10 named shapes (same sink twice · two sinks · `A,B,A` · `applyVarsToRoot` twice + identity · empty `applied` · `write-refused` skip list · inner from the first key · inner to the same sink · inner with a different projection · a frozen projection) | `{"attempts":10,"held":10,"broken":0,"pUnchanged":true}` | **HELD — 10/10** |
| **PJ-R-41** · `P-PJ-TP-1` | `P-TP` · `YES (bounded)` | both halves total over the **20**-shape pool; `ok === (skipped.length === 0)`; the partition holds | `S-PJ-POOL-1` + `S-PJ-SEED-1` · **60** draws (`state₀ = 20260927`, one LCG step per draw, `index = stateₙ₊₁ mod 20`; `half = shape.axis`; `sink = SINKS[i mod 5]`) | the same seed/step/index form; the pool enumerated **member by member** from the amended cell; both halves driven; 5 sink shapes | `{"seed":20260927,"draws":60,"poolSize":20,"attempts":60,"held":60,"broken":0,"distinctShapesSeen":19,"missingMembers":[20],"sinksSeen":["null","{style:{}}","throwing","counting","recording"],"axesSeen":["project","apply"],"reasonViolations":[],"shapeCheckFailures":[]}` | **HELD (bounded) — 60/60**; **19 of the 20 pool members reached** — the undrawn member is the doc's **(20)**, `a 3-key spec with two keys naming the SAME --dup` (**identical to the earlier blind run's `O-8` finding**; the draw is a pinned-seed draw, **NOT a 20-of-20 sweep**) |
| **TOTAL** | **7 `P-IM` + 1 `P-TP` = 8 rows** | — | **`231`** (`23+60+22+36+52+16+12+10`) | — | **`231` driven / `231` held / `0` broken**; stop-after-5 **not triggered**; per-row maximum `60 ≤ 100`, total `231 ≤ 400` | **ALL 8 ROWS HELD — no change from the earlier blind run's `231/231`** |

**The three `YES (bounded)` rows are bounded here too, and this addendum says so plainly:** `P-PJ-IM-1`
enumerates **23 classes**, `P-PJ-TP-1` draws **60** times over a **20**-member pool (reaching **19**), and
`P-PJ-IM-5` enumerates **26** values. **None is a proof of its unbounded universal**, and none of the three
is reported as one. **`P-PJ-TP-1`'s undrawn member protects nothing** — recorded, per the re-derived cell's
own coverage obligation.

### §12.1.8 The re-derived STATIC rows (5 scenario rows: 2 PASS / 1 FAIL / 2 NOT-BLIND-RUNNABLE)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **PJ-R-43** | **§3.4 `R-20`** (`projection.md:1233`) + §5.1, in the **leg-independent (committed-range) form** the `ADV-PJ-12` finding names (`projection.md:2455`) | `git rev-parse HEAD` + `git diff --name-only 58c7feb HEAD` + `git status --porcelain` + the `devDependencies` key set | `{"head":"e16ee8e3c785159c9c8c5f5e5e2c2fe871b826bd","committedChangeSet":["docs/next-steps.md","docs/specs/projection-greens.md","docs/specs/projection.md","src/shared/layout-projection.ts","tests/layout-projection.test.ts"],"outsideTheAllowList":["docs/specs/projection-greens.md"],"worktreeStatus":["M docs/next-steps.md","?? tests/blind-projection-reverify-a.tmp.test.ts","?? tests/blind-projection-reverify-b.tmp.test.ts","?? tests/blind-projection-reverify-c.tmp.test.ts"],"devDependencyKeys":["@types/node","electron","esbuild","typescript","vitest"]}` | **FAIL — doc/spec drift (§12.4.3).** The committed change set carries **one file outside the row's allow-list**: `docs/specs/projection-greens.md` (the workflow's own mandatory gate-5 artifact) |
| **PJ-R-44** | §3.5 `R-22` **(a) — SET EQUALITY, not a count** (`projection.md:1252`) | the imported namespace's own keys vs the four documented value exports, **with a fifth-export control** | `{"runtimeKeys":["project","projectVar","applyProjection","applyVarsToRoot"],"valueNamesSorted":["applyProjection","applyVarsToRoot","project","projectVar"],"setEqual":true,"controlFailsOnAFifthExport":true,"countOnlyWouldPass":true}` | **PASS** — set equality holds and the control **does** fail on a fifth export |
| **PJ-R-45** | §3.5 `R-23` + §7 item 9 — the absent-page-design probe (a probe, not a timeless claim) | `existsSync('docs/skills/designing-pages.md')` + a `readdirSync` of `docs/skills` | `{"pageDesignExists":false,"skillsDir":["process-guardrails.md"]}` | **PASS at this tree state** — the conditional obligation (a coverage-matrix row + a demo-page index entry) does **not** trigger |
| **PJ-R-46** | §3.4 `R-17` **re-derived** (`VOCAB-SCAN-1`, `ADV-PJ-11`; `projection.md:1229-1230`) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"The re-derived R-17 is a normalized source-text scan (raw + assembled + comments) over src/shared/layout-projection.ts plus its own controlled corpora, with a camel-half word-boundary rule (ADV-PJ-11). No runtime drive substitutes for a vocabulary/identifier-boundary absence, and the blind rule forbids reading the module. NOT SCORED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **PJ-R-47** | §3.4 `R-18` **re-derived** (the NO-TOKEN realm route, `ADV-PJ-17`; `projection.md:1231`) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"The re-derived R-18 (ADV-PJ-17) adds the NO-TOKEN realm route (a constructor-chain call, reflection APIs, code-constructing calls) plus an extended token list including global. It is a source-semantic row; a runtime observation cannot distinguish \"never reaches a realm\" from \"would reach it on a path this drive did not take\". The blind rule forbids reading the module and the red set. NOT SCORED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |

**`R-17`/`R-18` remain `NOT-BLIND-RUNNABLE` after their re-derivation** — the re-derivation changed the
**scan rules** (a camel-token word boundary; the no-token realm route), and a **rule change inside a
source-reading row is still a source-reading row**. **No reader may infer from this addendum that the
module carries no banned vocabulary, no realm-rooted access and no no-token realm route** — those stay
**owed** to a source-reading pass. **`R-19` and `R-22`(b) also stay `NOT-BLIND-RUNNABLE`** (unchanged from
§6 above); **§5.2's new LEG 4** (the standalone strict `tsc` over the unit's test file) is the leg that
closes `R-22`(b), and it is **not a blind scenario** — it is recorded here as the **documented leg this
addendum did not run** (it is a leg, and running it would compile the unit's own file, not this pass's).

---

## §12.2 The row arithmetic, so it closes — 47 rows = 42 PASS + 3 FAIL + 2 NOT-BLIND-RUNNABLE

| Group | Ids | Rows | PASS | FAIL | NBR |
| --- | --- | --- | --- | --- | --- |
| §12.1.1 `ADV-PJ-1` territory (`values` own-property question throws) | `PJ-R-01`..`PJ-R-06`, `PJ-R-42` | 7 | 6 | **1** | 0 |
| §12.1.2 `ADV-PJ-2` territory (projection field read throws) | `PJ-R-07`..`PJ-R-11` | 5 | 4 | **1** | 0 |
| §12.1.3 `FUNCTION-VALUES-1` ruling + its three controls | `PJ-R-12`..`PJ-R-16` | 5 | 5 | 0 | 0 |
| §12.1.4 re-derived `P-PJ-IM-3` variant (b) | `PJ-R-17` | 1 | 1 | 0 | 0 |
| §12.1.5 corrected doc-drift cells (both gate-5 FAILs re-driven) | `PJ-R-18`..`PJ-R-20` | 3 | 3 | 0 | 0 |
| §12.1.6 further amended-cell rows | `PJ-R-21`..`PJ-R-33` | 13 | 13 | 0 | 0 |
| §12.1.7 the 8 register rows re-driven | `PJ-R-34`..`PJ-R-41` | 8 | 8 | 0 | 0 |
| §12.1.8 re-derived static rows | `PJ-R-43`..`PJ-R-47` | 5 | 2 | **1** | **2** |
| **total** | | **47** | **42** | **3** | **2** |

**No FAIL was converted, no row was re-scoped or softened to reach a pass, and no `NOT-BLIND-RUNNABLE` row
was scored as a pass.** **The register is `231/231` held — unchanged from the earlier blind run.**

---

## §12.3 Exact commands (as run) and the run's arithmetic

```bash
node_modules/.bin/vitest run tests/blind-projection-reverify-a.tmp.test.ts \
                        tests/blind-projection-reverify-b.tmp.test.ts \
                        tests/blind-projection-reverify-c.tmp.test.ts   # the 47 scenario rows (final run)
node_modules/.bin/vitest run tests/layout-projection.test.ts            # the unit's OWN row file — COUNT ONLY, never read
node_modules/.bin/vitest run                                          # the node suite (COUNT ONLY)
git rev-parse HEAD ; git status --porcelain                           # tree state
rm -f tests/blind-projection-reverify-{a,b,c}.tmp.test.ts             # deletion
```

| Leg / artifact | Command | Verbatim result | Exit |
| --- | --- | --- | --- |
| the scenario set (§12.1) | `vitest run` over the three temp runners | **`Test Files 2 failed \| 1 passed (3)`** · **`Tests 3 failed \| 44 passed (47)`** (47 scenario rows; the failures are `PJ-R-06`, `PJ-R-08`, `PJ-R-43`) | `1` |
| the unit's own row file, **while the temp files existed** (count only) | `vitest run tests/layout-projection.test.ts` | `Test Files 1 failed (1)` · **`Tests 1 failed \| 79 passed (80)`** | `1` |
| node suite, **while the temp files existed** (count only) | `vitest run` | `Test Files 2 failed \| 62 passed (64)` · **`Tests 3 failed \| 1158 passed \| 2 skipped (1163)`** | `1` |
| the unit's own row file, **AFTER deletion** (count only) | `vitest run tests/layout-projection.test.ts` | **`Test Files 1 passed (1)` · `Tests 80 passed (80)`** | `0` |
| node suite, **AFTER deletion** (count only) | `vitest run` | **`Test Files 62 passed (62)` · `Tests 1119 passed \| 2 skipped (1121)`** | `0` |
| the unit's own row file, **FINAL state** of this pass — this addendum present and **uncommitted**, `M docs/next-steps.md` also present (count only) | `vitest run tests/layout-projection.test.ts` | **`Test Files 1 passed (1)` · `Tests 80 passed (80)`** | `0` |
| node suite, **FINAL state** of this pass (count only) | `vitest run` | **`Test Files 62 passed (62)` · `Tests 1119 passed \| 2 skipped (1121)`** | `0` |
| **this record** | all of the above | **47 rows — 42 PASS / 3 FAIL / 2 NOT-BLIND-RUNNABLE**; register `231/231` | — |

**The one red in the unit's own row file is attributed by CONTROLLED CHECK, not by reading it:** with the
three temporary runners present the file reads `1 failed | 79 passed (80)`; **after deleting them the same
command reads `80 passed (80)`** and the suite reads `62 passed (62)`. So the single failure is **this
pass's own out-of-scope footprint** (the same `R-20` diff-scope probe the earlier blind pass recorded at
§7.3), **not a module or contract defect** — and, as §12.1.8's `PJ-R-43` shows, **the committed form of that
same probe fires on the gate-5 artifact itself** (§12.4.3). **No failure text from the red set was read:
only the two summary lines were taken (grep-filtered above the failure detail), which is why no row id or
assertion of that file appears in this addendum.**

---

## §12.4 The FAIL rows — attribution and exact reproduction

**Three FAILs. Each is attributed below with its input, its expected value, its observed value, and the
clause site the expectation was derived from. NOTHING was fixed by this pass; this pass may write only this
addendum and its temporary runners.**

### §12.4.1 `PJ-R-06` — the `ADV-PJ-1` cell's **stated reason** does not match the module's recorded reason

**Doc clause cited:** **§3b-1 `ADV-PJ-1`'s remedy cell** — *"a `values` whose own-property test throws yields,
for that key, the decision the module can honestly make (**`missing-value` — the key could not be established
as an own key**, per `§2.4` item 3 clause (i)/(2) and `§2.5` item 2)"* — **`docs/specs/projection.md:2444`**
(section form: `§3b-1`, `ADV-PJ-1`).

**Reproduction (exact):**

```ts
const { proxy, revoke } = Proxy.revocable({ k1: 1, k2: 2 }, {})
revoke()
project(proxy, { k1: { name: '--k1', unit: 'px' }, k2: { name: '--k2', unit: 'px' } })
```

**Expected per the cell:** `skipped === [['--k2','missing-value']]`-style entries — i.e. **each key
`missing-value`**, and (in the single-key form) `skipped === [['--k1','missing-value']]`.
**Observed (verbatim):** `{"observed":[["--k1","accessor-threw"]],"cellStatedReason":"missing-value","holds":false}`
(single-key form) and `{"skipped":[["--k1","accessor-threw"],["--k2","accessor-threw"]], …, "reasonDomainOk":true}`
(two-key form, `PJ-R-01`).

| Observable | Expected from the cell | Observed | Clause |
| --- | --- | --- | --- |
| `project` throws? | **no** | **no** (`err:null`) — **this half HOLDS** | `§2.4` item 2 (`projection.md:852-857`), `§3.3 I-7` (`:1192`) |
| one decision per spec entry? | **yes** | **yes** (`decisions:2`, `specEntries:2`) — **HOLDS** | `§3.3 I-1`/`I-7` |
| reason ∈ the eight-member domain, no ninth? | **yes** | **yes** (`reasonDomainOk:true`) — **HOLDS** | `§2.1`'s union (`:570-581`) |
| **the reason itself** | **`missing-value`** (the key could not be established as an own key) | **`accessor-threw`** — **FAILS** | `§3b-1` `ADV-PJ-1` (`:2444`) |

**Attribution: DOC/SPEC DRIFT — the cell's stated reason is the only clause that pins this reason, and the
module records a different (also documented) member.** Two readings, both stated so the supervisor rules
rather than this pass:

1. **The cell is the clause and it is wrong** (my primary attribution): `§2.4` item 3's `'accessor-threw'`
   trigger is pinned **precisely** and requires *"the entry's value is a PRESENT OWN PROPERTY OF `values` and
   the ACT OF READING IT THREW"* (`:883-887`) — for a **revoked Proxy** or a throwing `getOwnPropertyDescriptor`
   trap the **presence test itself** threw, so nothing established that the value was present, and
   `accessor-threw`'s meaning (*"the value's accessor THREW while it was being read"*, `§2.1`'s union comment
   `:576`) is not literally satisfied. Under this reading the **cell** should state `accessor-threw` (a
   one-cell documentation edit), OR `§2.4` item 3's trigger clause should name the throwing-presence-test
   shape explicitly.
2. **The module over-reports** (the alternative): if the cell's `missing-value` is the contract, the module
   folds the presence-test throw into the read's `try`/`catch` and reports a reason the trigger clause does
   not authorise for this shape. That would be a **host finding** (an un-hardened reason classification), not
   a missing guard: **the totality half — the thing `ADV-PJ-1` was filed about — is GREEN** (`PJ-R-01`,
   `-02`, `-42`: no throw, one decision per entry, reasons in-domain).

**Either way this is NOT a pass and NOT a totality regression.** **The clause that would have to move is
`§3b-1`'s `ADV-PJ-1` cell (and, at most, `§2.4` item 3's trigger clause); the module's guards are in place
and green.** **No fix was made by this pass.**

### §12.4.2 `PJ-R-08` — the `ADV-PJ-2` cell is **self-inconsistent** about which field was unreadable

**Doc clause cited:** **§3b-1 `ADV-PJ-2`'s remedy cell** — *"a field that cannot be read is treated as
**ABSENT**: an unreadable `applied` contributes **no planned writes**, an unreadable `skipped` contributes
**no carried entries**, so the call returns **`ApplyResult{ applied: {}, skipped: [], ok: true }`** (the
`M-11` shape for a projection that decided nothing) and nothing throws"* — **`docs/specs/projection.md:2445`**
(section form: `§3b-1`, `ADV-PJ-2`).

**Reproduction (exact):**

```ts
const p: any = { }
const applied = { '--a': '1', '--b': '2' }      // READABLE, intended to be written
Object.defineProperty(p, 'skipped', {
  get() { throw new Error('hostile-skipped') }, enumerable: true, configurable: true,
})
p.applied = applied
applyProjection(p, recordingSink())              // ⇒ 2 writes are attempted and land
```

**Expected per the cell's concluding sentence:** `{applied:{}, skipped:[], ok:true}` with **zero sink calls**.
**Observed (verbatim):**
`{"err":null,"applied":[["--a","1"],["--b","2"]],"skipped":[],"ok":true,"calls":[["--a","1"],["--b","2"]]}`.

| Observable | Expected from the cell | Observed | Clause |
| --- | --- | --- | --- |
| unreadable `skipped` contributes no carried entries? | **yes** | **yes** (`skipped:[]`) — **HOLDS** | the cell's **per-field** sentence, `F-9`/`I-10` |
| `ok` computed from the emitted list? | **`true`** | **`true`** — **HOLDS** | `§3.3 I-10` (`:1195`) |
| nothing throws? | **yes** | **yes** (`err:null`) — **HOLDS** | `§3.3 I-7` |
| **the readable `applied` half** | **`{}` and zero sink calls** (the cell's blanket result shape) | **`{'--a':'1','--b':'2'}` written to the sink (2 calls)** — **FAILS** | the cell's concluding sentence (`:2445`) |

**The two halves of that one cell cannot both hold for this shape**, and the module follows the **per-field**
half — which is also the half that agrees with `§2.3` item 1 (the projection is read as an **input record**
whose readable fields are honoured) and with the `ADV-PJ-2` cell's own first clause. **Attribution: DOC/SPEC
DRIFT — a self-inconsistent cell (the same class as the gate-5 `F-12` (c) finding), NOT a module
regression.** **Note the propagation: the gate-4 landing record repeats the blanket form** ("a projection
whose `applied`/`skipped` read throws ⇒ `{applied:{},skipped:[],ok:true}` with zero sink calls"), so **the
record and the cell must be reconciled in the same pass as the cell.** **The unreadable-`applied` shape and
the wholly-unreadable (revoked-Proxy) shape both satisfy the blanket sentence exactly** (`PJ-R-07`, `PJ-R-09`:
`{applied:{},skipped:[],ok:true}`, `calls:0`) — **the drift is confined to the case where only `skipped` is
unreadable.** **No fix was made by this pass.**

### §12.4.3 `PJ-R-43` — the diff-scope allow-list does not name the workflow's own gate-5 artifact

**Doc clause cited:** **§3.4 `R-20`** — *"Only `src/shared/layout-projection.ts` (NEW),
`tests/layout-projection.test.ts` (NEW) and this spec (plus the trackers, the SUPERVISOR's pass) are touched
by this unit … **A changed file outside that list FAILS the row**"* — **`docs/specs/projection.md:1233`**
(section form: `§3.4`, `R-20`), read with **§5.1**'s diff scope and the `ADV-PJ-12` finding's named
**leg-independent form** (`:2455`).

**Reproduction (exact):** `git diff --name-only 58c7feb HEAD` at HEAD `e16ee8e` (the unit's own gate-2 → HEAD
change set), plus `git status --porcelain`.

**Expected per the row:** every entry ∈ {`src/shared/layout-projection.ts`, `tests/layout-projection.test.ts`,
`docs/specs/projection.md`, the trackers}.
**Observed (verbatim):** `["docs/next-steps.md","docs/specs/projection-greens.md","docs/specs/projection.md","src/shared/layout-projection.ts","tests/layout-projection.test.ts"]`
⇒ **one entry outside the list: `docs/specs/projection-greens.md`.**

**Attribution: DOC/SPEC DRIFT in the allow-list (a documentation/scope defect), with the counter-reading
recorded rather than hidden:**

1. **Literal reading (my expectation, and the FAIL):** the row names three unit paths + *"the trackers, the
   SUPERVISOR's pass"*; a **`*-greens.md` artifact is authored by the blind writer and is neither**. Under
   the literal list the committed change set **does** carry a file outside it — and it will **always** do so
   for any unit that ran its **mandatory** gate-5 blind pass (`AGENTS.md` item 10a/RCA-4) and committed its
   artifact at the gate boundary (RCA-8a), which this unit did (`b952597`). **The remedy is a scope wording
   that names the gate artifacts** (`docs/specs/*-greens.md`, and the review records) **or an explicit
   statement that the row's allow-list binds the unit's own edits rather than the unit's landing commit
   range.**
2. **The counter-reading:** if *"the SUPERVISOR's pass"* is read to cover every **mandatory gate artifact**
   of the unit's pass — the greens set, the gate records, the doc-review record — then the observation is
   **inside** the allow-list and this row would **PASS**. **That reading is defensible**, and this pass
   records it explicitly. **If the supervisor rules that reading, `PJ-R-43` is a row whose expectation was
   too narrow and the FAIL is mine, not the spec's — it is reported as a FAIL under the literal text because
   that is the only text this blind pass could derive an assertion from.**

**Neither reading makes this a module regression.** **It IS the corroboration the `ADV-PJ-12` finding asked
for:** the committed-range form of the row is **not vacuous** (it fires), while the predecessor's
**worktree** form (`git status --porcelain`) was vacuous here — the worktree carried no unit file at all once
the artifact was committed. **`PJ-G-62`'s worktree-form PASS therefore does not substitute for this row**, and
**the `R-20`-vs-gate-artifact interaction is now recorded in both forms** (the predecessor's §7.3 for the
worktree form; this row for the committed form). **No fix was made by this pass.**

**OBSERVED CORROBORATION FOR READING 2, added after the fact and NOT guessed at (count-only, no failure text
read):** in this pass's **final state** — **this addendum present and uncommitted**, and
`M docs/next-steps.md` also present — the unit's **own** `R-20` row reads
**`Tests 80 passed (80)`** (§12.3), i.e. **the landed row's own probe does NOT flag
`docs/specs/projection-greens.md` as out of scope** once that artifact is **tracked**. **That is a measured
observation about the landed row's allow-list and it supports Reading 2** (the artifact is treated as
belonging to the pass). **It does not settle the question for the *committed-range* form this addendum drove**
— a probe over `git diff --name-only <base> HEAD` and a `git status`-based probe can carry different
allow-lists, and this pass may not read the red set to find out which. **Reported so the supervisor rules on
evidence: under Reading 2 `PJ-R-43` PASSES and this FAIL is attributable to my too-narrow expectation; under
Reading 1 the spec's allow-list needs a wording that names the gate artifacts.**

---

## §12.5 Checker defects of MY OWN, recorded so none is read as a finding (the §9 class)

**Six defects in this addendum's drives/checkers were found and corrected before the final run; none of the
three FAILs above is one of them, and no expectation was relaxed to match an observation.**

1. **`PJ-R-32`** — my first drive asserted **one** `sink-unusable` entry for a projection that actually
   carried **one applied key AND one carried skip** (2 decisions). Corrected to derive the expected count
   from the projection itself; the row then held on both halves of §2.3 item 4's asymmetry.
2. **`PJ-R-34`** — my per-name XOR guard fired on the **`F-2` duplicate class**, where one name legitimately
   appears in `applied` **and** in `skipped` (`I-1` partitions **entries**, not names — the same
   self-correction the earlier blind run recorded at its §9 item 4). Corrected to apply the XOR check only
   where the emitted names are **distinct**; the row then held 23/23.
3. **`PJ-R-37`** — my first drive never wired the **drive's own `format`** into the spec (only the entry's),
   so seven `number`-format attempts were asserted against `unit`-format output. Corrected; the row then
   held 52/52 with **20** applied values.
4. **`PJ-R-39`** — my duplicate-pair fixture picked keys `1`/`3` and, for the *"keys 2/4 throw"* row, selected
   an undefined key (both of that row's chosen indices were throwing). Corrected to choose the row's first two
   **finite** keys; the row then held 12/12.
5. **`PJ-R-40`** — check shape (6) compared its projection against **another projection's** snapshot.
   Corrected to snapshot the projection under test; the row then held 10/10.
6. **`PJ-R-43`'s first form** — I initially asserted a **four-path** allow-list and then re-read the row's
   own parenthetical (*"plus the trackers, the SUPERVISOR's pass"*). The expectation was **not** relaxed to
   reach a pass: the row is filed as a **FAIL** with **both readings stated** (§12.4.3), and the ambiguity
   is recorded rather than resolved in my favour.

---

## §12.6 Ambiguities this addendum could NOT resolve into one falsifiable row

| # | The clause(s) | Why one row cannot decide it | What this pass did instead (and observed) |
| --- | --- | --- | --- |
| **`O-10`** | **§3b-1 `ADV-PJ-1`'s cell** (`:2444`) vs **§2.4 item 3's `'accessor-threw'` trigger clause** (`:883-887`) | The cell names `missing-value` for a *presence-test* throw; the trigger clause authorises `accessor-threw` **only** for a *value read* that threw. Neither clause covers "the presence test threw", so **two different reasons are each derivable** | Drove the shape four ways (`PJ-R-01`, `-02`, `-42`, `-06`) and recorded the reason the module emits; reported the mismatch as a **FAIL** (§12.4.1) rather than choosing a reading |
| **`O-11`** | **§3b-1 `ADV-PJ-2`'s cell** (`:2445`) — per-field sentence vs concluding result sentence | For a projection whose **`skipped` alone** is unreadable the two sentences give **different** results (`{applied:{},skipped:[],ok:true}` vs "the readable half is honoured") | Drove both the unreadable-`applied`, the unreadable-`skipped` and the wholly-unreadable shapes and reported the divergence as a **FAIL** (§12.4.2) |
| **`O-12`** | **§3.4 `R-20` + §5.1** (`:1233`, `:1385-1398`) — *"plus the trackers, the SUPERVISOR's pass"* | Whether a **`*-greens.md` gate artifact** is inside that parenthetical is not stated by any clause; the two readings give opposite verdicts **and** the workflow makes the artifact mandatory | Filed the **literal** reading as a **FAIL** and stated the counter-reading in full (§12.4.3), **with the measured corroboration that the landed row's own probe stays green (`80 passed (80)`) while this addendum is present and uncommitted** — i.e. the observable supports the counter-reading while the committed-range form this addendum drove still fires |
| **`O-13`** | **§5.5.1 `P-PJ-TP-1`'s pool** — the enumeration lists **what** each member is, but **not each member's `axis` value** | The re-derived binding is `half = shape.axis`, and the axis is a property the enumerated cell does not print per member, so a blind reader must **infer** it (input-shaped members ⇒ `project`; projection-shaped members ⇒ `apply`) | Inferred the axis from each member's own description (`projection.md:1688`'s enumeration tail): members (1)…(10) and (19)/(20) are `values`/`specOf` shapes ⇒ `project`; (11)…(18) are projection arguments ⇒ `apply`. **Recorded, not scored**: the draws, the distinct-member count and the held/broken counts are unaffected either way for the 60 draws driven here |

**One clause this addendum deliberately did NOT drive:** **§5.2's LEG 4** (`:1406`, the standalone strict
`tsc` over `tests/layout-projection.test.ts`) — it is a **leg**, and running a compiler over the unit's own
file is not a blind scenario. **`R-22`(b) therefore stays owed to that leg**, exactly as §6 above and the
`ADV-PJ-16` finding state.

---

## §12.7 The temporary runners — exact paths, and proof of deletion

**Paths used (all temporary, all now deleted):**

- **`tests/blind-projection-reverify-a.tmp.test.ts`** — the 34 territory / re-derived-cell / amended-clause
  rows (`PJ-R-01`…`PJ-R-33`, `PJ-R-42`).
- **`tests/blind-projection-reverify-b.tmp.test.ts`** — the 8 register rows (`PJ-R-34`…`PJ-R-41`), 231
  attempts.
- **`tests/blind-projection-reverify-c.tmp.test.ts`** — the 5 re-derived static rows (`PJ-R-43`…`PJ-R-47`).

**Deletion proof, exactly:** `ls tests/ | grep -c tmp` prints **`0`**; `git status --porcelain` after
deletion prints exactly one line — **`M docs/next-steps.md`** — and **no `tests/**` entry at all**. **Final
state, stated honestly: that tracker modification is NOT this pass's** (see §12.8 item 5). **The only file
this pass leaves behind is this addendum** (`docs/specs/projection-greens.md`, tracked and modified by this
append).

**This pass edited no other file**: not the spec, not the module, not the red set, not the trackers, not
`package.json`, not `scripts/**`, and it never touched `node_modules/provident-ssr/` or
`../Preempt-Providence/`.

**Blindness, exactly:** `src/shared/layout-projection.ts` was **never opened, never read, never printed** —
it was imported as a black box through the four documented value exports and driven only through
caller-supplied fake sinks. `tests/layout-projection.test.ts` was **never read**: it was **run twice for its
count only**, with the output **grep-filtered to the two summary lines** so that no failure text, row id or
assertion could enter this session — **a strictly narrower exposure than the earlier blind pass recorded at
its §7.3.**

---

## §12.8 Honesty — exactly what this addendum does and does NOT prove

**May rest on this addendum:**

1. **the three landed host fixes, driven black-box on their own territory and green on totality**:
   `ADV-PJ-1` — no `project` throw for a **revoked Proxy**, a throwing **`getOwnPropertyDescriptor`** trap, a
   throwing **`ownKeys`** trap, a throwing **`get`** trap, a throwing **`has`** trap and a throwing own
   `hasOwnProperty` access, **with one decision per spec entry and every reason inside the eight-member
   domain** (`PJ-R-01`…`-04`, `-42`); `ADV-PJ-2` — **`{applied:{},skipped:[],ok:true}` with zero sink calls**
   for an unreadable **`applied`** field and for a **revoked-Proxy** projection (`PJ-R-07`, `-09`), with both
   controls green (`PJ-R-10` honoured accessor; `PJ-R-11` per-key `write-refused`); `FUNCTION-VALUES-1` —
   a **function `values` yields `missing-value` for every entry** including spec keys named
   `'length'`/`'name'`/`'prototype'`, `applied {}`, no throw (`PJ-R-12`), **and clause (iii)(d)'s three
   positions stay deliberately duck-typed** (`PJ-R-13`/`-14`/`-15`/`-16`);
2. **both gate-5 FAILs have NEW verdicts and both are PASSES against the corrected text**: `PJ-G-58` ⇒
   `PJ-R-18` (`§2.5` item 4 as corrected, all three per-method claims exact) and `PJ-G-75` ⇒ `PJ-R-19`/`-20`
   (both arrangements of `F-12` cell (c) exact). **Neither FAIL's remedy changed the module, and the module
   satisfies both corrected cells as written**;
3. **the four new pinned clauses are green as drives**: `SKIP-NAME-1` (`PJ-R-21`, `-22`), `SKIP-ACCEPT-1`
   (A)/(B)/(C) (`PJ-R-23`, `-24`, `-25`), `SKIP-THREW-1`'s two-layer clause (`PJ-R-26`) and
   `FUNCTION-VALUES-1` (`PJ-R-12`, `-13`, `-14`, `-15`, `-16`);
4. **the re-derived cells hold**: `P-PJ-IM-3` variant (b) is the **APPLIED** case with read count exactly `1`
   and no `'accessor-threw'` entry (`PJ-R-17`), and `P-PJ-TP-1`'s binding `half = shape.axis`,
   `sink = SINKS[i mod 5]` reproduces the earlier pass's `60 draws / 19 of 20 members` exactly (`PJ-R-41`);
5. **the register re-driven from the amended cells: `231` attempts driven / `231` held / `0` broken**,
   term-by-term against the eight stated counts, with the three `YES (bounded)` rows still marked bounded
   (§12.1.7). **No register row's statement, type, strategy id, attempt count or total moved, and the pinned
   seed `20260927` is unchanged**;
6. **the run corroboration, with its exact tree states**: the unit's own row file **`80 passed (80)`** and
   the node suite **`62 passed (62)` / `1119 passed | 2 skipped (1121)`** — both measured **after the three
   temporary runners were deleted**; and the controlled attribution of the one red seen while they existed
   (§12.3);
7. **two further documented fail-states from the amended rows are green with controls**: the
   `sink-unusable` **re-labelling** of carried entries (`PJ-R-28`, `ADV-PJ-8`'s owed row), the applier-side
   **assembly order** (`PJ-R-30`, `ADV-PJ-7`'s owed row), the non-record `applied` field (`PJ-R-29`), the
   pinned asymmetry (`PJ-R-32`) and `I-9`'s narrowed form (`PJ-R-31`).

**May NOT rest on this addendum:**

1. **the three FAILs as anything but doc/spec drift or an ambiguity** — `PJ-R-06` and `PJ-R-08` are
   **cell-vs-module divergences in `§3b-1`'s `ADV-PJ-1`/`ADV-PJ-2` cells** and `PJ-R-43` is a **scope-wording
   divergence in `§3.4 R-20`/`§5.1`** (§12.4). **A DONE row may NOT read the unit as doc-clean until those
   sites are edited by the pass that owns them; no module change is owed for `PJ-R-08` or `PJ-R-43` by this
   pass's evidence, and `PJ-R-06`'s classification is a supervisor ruling** (`O-10`);
2. **any source-level prohibition** — `R-17`, `R-18` (both **re-derived**, `PJ-R-46`/`-47`), `R-19` and
   `R-22`(b) stay **`NOT-BLIND-RUNNABLE`** and **ungreen here**;
3. **`§5.2` LEG 4** — **not run by this pass**; `R-22`(b) remains owed to that leg;
4. **any CSS, layout, paint, geometry or rendered-value claim** — every sink here is a **fake sink**, so the
   greens are **the exact strings the sink was handed**, never that a browser would accept them. **No `[U]`
   row was taken**; no window was booted, no IPC round-trip ran, no transport was exercised, and no real DOM
   was touched. The module is still imported by **no** `src/**` file, so **nothing here is assembled-app
   evidence**;
5. **a clean working tree** — the tree carried **one pre-existing modification** at this pass's close,
   **`M docs/next-steps.md`**, which **this pass neither made nor touched**: at this pass's **entry** the
   tree was **clean** (the pass's first `git status --short` printed nothing), and the modification appeared
   **during** the pass from **outside** it (a concurrent tracker/gate pass). **Every file this pass wrote is
   listed in §12.7**; the tracker's changed content is **not** this pass's to attribute or to commit;
6. **the three bounded register rows as proofs** — `P-PJ-IM-1` (`23` classes), `P-PJ-TP-1` (`60` draws,
   **19 of 20** members) and `P-PJ-IM-5` (`26` values) are **bounded enumerations**, and the register's own
   honesty block is what binds them.

---

## §12.9 Is the earlier 75-scenario set (§1–§11, `75 = 69 PASS / 2 FAIL / 4 NOT-BLIND-RUNNABLE`) still valid for the AMENDED territory?

**Answer, stated precisely — NOT a blanket yes and NOT a blanket no: the earlier set is PARTIALLY valid. Its
observed values were not falsified by the three host fixes for the ~68 rows whose drives contain no
Proxy / throwing-presence-test `values`, no field-read-throwing projection and no function `values`; but
FOUR things about it are now stale, and a reader must not treat it as covering the amended territory.**

1. **TWO ROWS' VERDICTS ARE SUPERSEDED OUTRIGHT.** `PJ-G-58` and `PJ-G-75` are recorded as **FAIL** against
   the **pre-correction** text. The corrected text is driven in §12.1.5 and **both now PASS**
   (`PJ-R-18`, `PJ-R-19`, `PJ-R-20`). **A reader must read those two rows' verdicts as superseded, not as a
   live red on the module.**
2. **THREE ROWS MUST BE RE-DERIVED because the amendment WIDENED their territory — their drives do not reach
   the amended shapes, so their PASS is evidence about the OLD territory only:**
   - **`PJ-G-45`** (`§3.3 I-7`'s no-throw table: *"16 `project`-shaped inputs … × 45 `applyProjection`
     shapes"*): the amended `I-7`/`§2.4` item 2 territory now **includes a `values` whose own-property
     question throws** and (via `ADV-PJ-2`) a **projection whose field read throws** — neither shape is in
     that table, so **the row's green says nothing about the amended shapes** (this addendum's
     `PJ-R-01`…`-09` are that re-derivation);
   - **`PJ-G-34`** (`F-11` both halves): its non-record-`values` drives are `null`/`undefined`/`'x'`/`42`/`[]`
     — the amendment **added a FUNCTION to that class** (`FUNCTION-VALUES-1`), which the earlier row does
     not drive (**`PJ-R-12` is the added drive**);
   - **`PJ-G-23`** (`F-1`'s eleven malformed shapes): it asserted the **reason only**, with the skip's `name`
     recorded as **unpinned** (`O-1`). **`O-1` is now PINNED** (`SKIP-NAME-1`), so the row is **weaker than
     the contract** — its PASS is not falsified, but the **name** half must be asserted
     (**`PJ-R-21`/`-22` are that re-derivation**).
3. **TWO ROWS' METHOD STATEMENTS ARE SUPERSEDED while their observed values REPRODUCE EXACTLY** — they stay
   valid as counts and must not be quoted as methods:
   - **`PJ-G-68`** (`P-PJ-TP-1`): its recorded `60/60` and `distinctShapesSeen:19` reproduce term-for-term in
     `PJ-R-41`, **but the binding it names (`HALVES[d mod 2]`)** is the **`SUPERSEDED`** form — the amended
     cell binds `half = shape.axis`, `sink = SINKS[i mod 5]` (`ADV-PJ-6`). **The row's numbers stand; its
     description of the drive does not.**
   - **`PJ-G-70`** (`P-PJ-IM-3`): its `36/36` reproduces in `PJ-R-36`, and its variant (b) reading is
     **already the re-derived one** (the earlier pass recorded `O-4` and drove the APPLIED case). **The row
     stands as written by that pass; the register's contradicting parenthetical is what moved.**
4. **EVERYTHING ELSE IN §1–§11 THAT IS NOT `NOT-BLIND-RUNNABLE` REMAINS VALID EVIDENCE**, and its
   `NOT-BLIND-RUNNABLE` rows (`PJ-G-59`, `-60`, `-61`, `-65`) remain NBR here — with the **re-derived**
   `R-17`/`R-18` now recorded as `PJ-R-46`/`-47` and `R-19`, `R-22`(b) still owed to a source-reading pass
   and to §5.2's **LEG 4** respectively.

**The four earlier `FAIL`/`NBR`-adjacent rows NOT affected, stated so the list is not read as a purge:** of
the earlier 75, **68 rows** (all `M`/`F`/`I`/surface rows whose drives stay outside the three fixes'
territory, plus the 8 register rows as counts, plus `PJ-G-62`/`-63`/`-64`/`-66` as probes) are **unchanged
and remain valid**; **2** have superseded verdicts (item 1); **3** owe re-derivation (item 2); **2** have
superseded method statements with reproducing numbers (item 3). **This addendum supersedes nothing above
this line and rewrites nothing above this line** — it records the re-verification, the new verdicts and the
staleness so the next pass can act on it.

**One-line layer honesty:** *47 node-layer `[T]`/`[H]`/`[S]` re-verification rows, authored and run from the
**amended** `docs/specs/projection.md` alone against `src/shared/layout-projection.ts` imported as a black box
over caller-supplied fake sinks — **42 PASS / 3 FAIL / 2 NOT-BLIND-RUNNABLE**, the register re-driven
**231/231 held** with **19 of 20** pool members reached, the two gate-5 FAILs' territory now **PASS**, and the
three FAILs all doc/spec-level or ambiguity-level (never a totality regression) — a node green, never
assembled-app evidence, and the `[U]` row is not taken.*
