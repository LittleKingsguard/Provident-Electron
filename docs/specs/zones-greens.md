# Green Scenarios — `U-ZONES` (the pure track-token mechanism) — blind run

**Status: `BLIND RUN (one pass) — 67 executed scenario rows: 57 PASS / 2 FAIL / 8 NOT-BLIND-RUNNABLE`**

**No FAIL was converted, no row was re-scoped to reach a pass, no row was softened, and no
`NOT-BLIND-RUNNABLE` row was scored as a pass.**

| | |
| --- | --- |
| **Unit** | `U-ZONES` — the **mechanism half of `SCH-4`** (architect ruling `A-d4`): `TrackSpec { trackProp, unit, emptyToken }` + `isEmpty(census, zoneId)` + `trackFor(spec, size, empty)`, pure arithmetic over caller-supplied values, no refusal domain, no CSS, no DOM, no imports |
| **Wave** | **E** — this unit is wave E's **first** unit; `U-CENSUS` (row `E2`) **depends on it** |
| **Gate** | **5 — the blind green-scenario pass** (`AGENTS.md` item 10a / RCA-4) |
| **Date (filing calendar)** | **2026-09-27**. The host clock reads **2026-09-25** (`date -u` → `Fri Sep 25 01:55:17 PM UTC 2026`) during this work — the same host-clock-vs-filing-calendar offset the sibling greens records (`docs/specs/projection-greens.md`, `docs/specs/listhost-greens.md`, `docs/specs/slothost-greens.md`) carry. **Cite the filing date.** |
| **Tree state (HEAD)** | **`f36f605`** — `U-ZONES gate 3 GREEN: src/shared/zones.ts landed (77 lines, 3 exports, zero imports) + 5 green-time test repairs … cross-unit diff-scope scoping for zones R-4 + U-PROJ R-20 working-tree halves; trio 63 files/1182 tests 1180 pass/2 skip, typecheck 0, build 0, leg4 0` (the commit **subject** is quoted here as a **claim source**; §3 shows what a re-run actually reads at this tree state, and §7.3 records the difference) |
| **Working tree** | **clean** before this pass and **clean** after it **minus this artifact**; the **two temporary runner files are DELETED** (§10) |
| **Authored from** | **THE DOCUMENTATION ONLY.** `src/shared/zones.ts` was **never opened, never read, never printed** (imported and called as a **black box**); `tests/zones.test.ts` (the unit's red set) was **never read** and was **RUN for counts only** |
| **Runner** | node **v24.20.0**, the repo's own vitest (`node_modules/.bin/vitest`), `environment: 'node'` |

**Documents read to derive every scenario:** `docs/specs/zones.md` in full — both status notes, the
go-ahead state, **§0** (the 12 rulings) and **§0A** (the six dated ruling notes), the Layer declaration
and its four honesty anchors, §1, **§2.1** (every export, signature and return shape, the delegate
clause, the export census), **§2.2** (the six-prohibition table incl. `P-1`'s dated two-scan note),
**§2.3** (the decision tables, the four item-1 limbs and their dated precedence ruling, items 3–7),
**§2.4** (items 1–5), **§3.1** `M-1`..`M-18`, **§3.2** `F-1`..`F-8`, **§3.3** `I-1`..`I-10`, **§3.4**
`R-1`..`R-7`, **§3.5** `R-8`/`R-9`, §4.1–§4.5, **§5.1** (the allow-list and the DENIED set), **§5.2** (the
four legs and the refused `[U]` row), **§5.3** (the DONE-row shape), **§5.5**/**§5.5.1** (the 8-row typed
register, its strategy discipline, its pools, its attempt arithmetic, its honesty block, the
pool-versus-boundary rule and the four cell rulings), §6, **§7** items 1–12, **§7a**/**§7a.1** (the six
ruled ambiguities and the red run's re-statement), §8, §3a/§3b; plus `docs/specs/projection-greens.md`
and the header of `docs/specs/listhost-greens.md` (**house style only — different units**),
`docs/decisions.md` (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`),
`docs/next-steps.md` (rows `E1`/`E2`), `docs/pending.md` §G/§H, `package.json`, `vitest.config.ts` and
`AGENTS.md`.

**Files NOT read to derive any scenario's content — recorded so the blindness claim is exact:**

1. **`src/shared/zones.ts` was never opened, never read, never printed.** The module was imported as a
   **black box** (`await import(/* @vite-ignore */ ['..','src','shared','zones.js'].join('/'))`) and
   exercised through the exported surface `§2.1` names: `isEmpty(census, zoneId)`,
   `trackFor(spec, size, empty)` — and the namespace's own runtime keys for the `R-5`(a) set-equality row.
2. **`tests/zones.test.ts` was never read** — no assertion, fixture, row id or expectation of it was
   inspected. It was **RUN for its count** at four tree states (§3) and its **failure reports** printed
   two row ids and their assertion sentences into this session's transcript (§7.3); that disclosure was
   **not** used as a source for any drive (the R-4 drive was authored from `§3.4`/`§5.1` before it
   appeared, and it is recorded rather than hidden).
3. **No other `src/**` file was read either.** `src/shared/dom-shim.ts` and every sibling mechanism
   module were **not** read; the only file-content reads in this pass were `package.json`,
   `vitest.config.ts`, the documentation listed above, and **`git` probes** (`git log`, `git show
   --name-only`, `git diff --name-only`, `git status --porcelain`).
4. **`node_modules/provident-ssr/` and `../Preempt-Providence/` were never touched.**

**The temporary runners.** The scenarios were authored and executed through **two temporary** vitest
files inside the repo — **`tests/blind-zones-greens.tmp.test.ts`** (the 67 scored rows) and
**`tests/blind-zones-diag.tmp.test.ts`** (one diagnostic for ambiguity `O-7`) — and **BOTH ARE DELETED**
(§10). The artifact is this file, not the runners.

---

## 1. Layer declaration — exactly what this run proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own vitest under node v24.20.0, driving **plain values** (specs, sizes, censuses) — no element, no document, no shim | a browser; the assembled app; the engine |
| **[H]** | host-side | this unit's own `src/shared/zones.ts`, **imported as a black box** — its documented surface only | engine-internal behaviour |
| **[S]** | static/structural | file probes the blind rule permits: `fs.existsSync`, `readdirSync`, `git log/show/diff/status`, `package.json` key sets | a semantic source read of the module |
| **[U]** | real-DOM `ui` leg | **NOT TAKEN — and `§5.2` does not offer one** for this unit | — |

**Honesty anchors, carried so no row over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** No window was
   booted, no IPC round-trip ran, no MCP transport was exercised, and **no real DOM was touched**.
2. **This unit touches no DOM at all, not even the shim.** Every input here is an argument (`TrackSpec`,
   a size, a census value, a zone key, a flag). **A `[T]` green here proves ARITHMETIC and DECISION only**
   (the spec's anchor 2).
3. **NOTHING here is a CSS claim.** `trackFor` returns a **string**; whether a browser accepts it,
   applies it, or paints anything is **not** asserted by any row and is not this unit's claim
   (`§2.3` item 7, `I-10`, `R-7`, `§5.2`).
4. **`§5.2`'s `[U]` row is NOT OFFERED, and the reason is structural, not an excuse**: the module is
   **imported by no `src/**` file** at this tree state (that companion claim is itself **not verified by
   this blind pass** — see §8 `O-1`), so there is no rendered surface to observe. The `ui` leg exists and
   is green for other units (`U-REALDOM-BOOT`), and a later unit that ships this module a consumer would
   own any `ui` row for it.
5. **The property register (`§5.5.1`) is exercised here as this unit's own property layer** (the spec's
   anchor 4): every register row is `[T]` work over injectable arguments, so §5 records **measured
   counts**, not design cells.

---

## 2. Exact commands (as run)

```bash
node_modules/.bin/vitest run tests/blind-zones-greens.tmp.test.ts --reporter=verbose   # the 67 scenario rows (final run)
node_modules/.bin/vitest run tests/blind-zones-diag.tmp.test.ts --reporter=verbose     # diagnostic: the duck-typed-map limb (O-7)
node_modules/.bin/vitest run tests/zones.test.ts                                       # the unit's OWN row file (COUNT ONLY — never read)
node_modules/.bin/vitest run                                                           # the node suite (counts only)
git log --format='%h%x09%s' -8 ; git show --name-only --format= <commit> ; git diff --name-only b8d3e1a..HEAD
git status --porcelain                                                                 # the tree, before and after deletion
date -u ; node -v ; git log -1 --format=%h
```

**Runner / stack:** Node **v24.20.0**; vitest as declared in `package.json`; `git HEAD` **`f36f605`**;
the working tree **clean** at the start of this pass (no pre-existing modification). The two temporary
runner files were the only files this pass created before this artifact, and both are deleted (§10).

---

## 3. Run counts (the run's arithmetic)

| Leg / artifact | Command | Verbatim result | Exit |
| --- | --- | --- | --- |
| the scenario set (§4), **final run**, temp files present | `vitest run tests/blind-zones-greens.tmp.test.ts --reporter=verbose` | `Test Files 1 failed (1)` · **`Tests 2 failed \| 65 passed (67)`** (the two failures are `ZN-G-60` and `ZN-G-67`) | `1` |
| the diagnostic | `vitest run tests/blind-zones-diag.tmp.test.ts` | **`Tests 1 passed (1)`** | `0` |
| node suite `[T]`, **while the two temp files existed** | `vitest run` | **`Tests 4 failed \| 1242 passed \| 2 skipped (1248)`** (the `Test Files` line was not captured in that invocation's output tail — the `Tests` line is quoted verbatim) — the four are **mine** (`ZN-G-60`), **the unit's own `R-4`**, **the unit's own `R-8`** (fired by my files: they are outside its allow-list), and **`U-PROJ`'s `R-20`** (fired by my files, same reason) | `1` |
| the unit's own row file, **while my files existed** (count only) | `vitest run tests/zones.test.ts` | `Tests 2 failed \| 56 passed (58)` — `R-4` + `R-8` | `1` |
| **after deletion, clean tree, before this artifact existed** — the unit's own row file (count only) | `vitest run tests/zones.test.ts` | **`Tests 1 failed \| 57 passed (58)`** — the surviving failure is the unit's own **`R-4`** (§7.3) | `1` |
| **after deletion, clean tree, before this artifact existed** — the node suite | `vitest run` | **`Test Files 2 failed \| 61 passed (63)`** · **`Tests 2 failed \| 1178 passed \| 2 skipped (1182)`** — the two are the unit's own `R-4` and `U-PROJ`'s `R-20` (§7.3) | `1` |
| **FINAL state of this pass** (this greens artifact present and **uncommitted**) — the unit's own row file | `vitest run tests/zones.test.ts` | **`Tests 1 failed \| 57 passed (58)`** — **identical to the clean-tree reading above**: the artifact's own presence adds **no** failure | `1` |
| **FINAL state of this pass** — the node suite | `vitest run` | **`Test Files 2 failed \| 61 passed (63)`** · **`Tests 2 failed \| 1178 passed \| 2 skipped (1182)`** — **identical to the clean-tree reading above**; the two failures are again the committed-range scope rows (`zones` `R-4`, `projection` `R-20`) | `1` |
| **this record** | all of the above | **67 rows — 57 PASS / 2 FAIL / 8 NOT-BLIND-RUNNABLE** | — |

**The row arithmetic, so it closes — 67 scored rows = 57 PASS + 2 FAIL + 8 NOT-BLIND-RUNNABLE:**

| Group | Ids | Rows | PASS | FAIL | NBR |
| --- | --- | --- | --- | --- | --- |
| §3.1 valid/happy states (`M-1`..`M-18`) | `ZN-G-1`..`ZN-G-18` | 18 | 18 | 0 | 0 |
| §3.2 documented non-happy states (`F-1`..`F-8`) | `ZN-G-19`..`ZN-G-26` | 8 | 8 | 0 | 0 |
| §3.3 every-state invariants (`I-1`..`I-10`) | `ZN-G-27`..`ZN-G-36` | 10 | 9 | 0 | **1** |
| §2.3 item 3 input-class enumeration | `ZN-G-37`..`ZN-G-38` | 2 | 2 | 0 | 0 |
| §2.4 value-formatting cases | `ZN-G-39`..`ZN-G-40` | 2 | 2 | 0 | 0 |
| §2.1 the `U-CENSUS` delegate surface | `ZN-G-41`..`ZN-G-42` | 2 | 2 | 0 | 0 |
| §0A ruling notes 1–6 | `ZN-G-43`..`ZN-G-48` | 6 | 6 | 0 | 0 |
| §5.5.1 register rows (one scenario per row) | `ZN-G-49`..`ZN-G-56` | 8 | 8 | 0 | 0 |
| §3.4/§3.5 static + existence rows (`R-1`..`R-9`) | `ZN-G-57`..`ZN-G-66` | 10 | 2 | **1** | **7** |
| §2.1 export-census internal-consistency row (appended) | `ZN-G-67` | 1 | 0 | **1** | 0 |
| **total** | | **67** | **57** | **2** | **8** |

**Ordering note, so the id sequence is not read as drift:** `ZN-G-67` was **appended after the first full
run**, when `§2.1`'s EXPORT CENSUS paragraph was read against `§2.1`'s own block; it registers in the
runner **after `ZN-G-66`**. **No existing row id, verdict or observed value moved.**

**The two `FAIL`s are §7.1 (`ZN-G-60`, doc/scope) and §7.2 (`ZN-G-67`, doc/spec drift), neither of them a
module-behaviour defect.** A **self-verified greens set is a review finding** (RCA-4): this record is the
**independent** half, and neither the module's source nor the unit's red set was read to produce it.

---

## 4. The scenarios

`Doc clause` cites the contract **by section and row id** (never by line number). The `Observed` column
quotes the **verbatim** `console.log` payload the runner printed for that id — JSON as printed,
**abridged with `…` only where the payload is long**, and every fragment is a verbatim prefix of what
printed. Where a payload is abridged, the verdict sentence states the asserted values that the abridged
tail carried.

### 4.1 §3.1 valid / happy states (`M` family) — 18 rows, all PASS

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-1** | §3.1 `M-1` | `trackFor({trackProp:'--w',unit:'px',emptyToken:'0px'}, 120, false)` | `{"r":"120px","typeofR":"string"}` | PASS — exactly `String(120)+'px'`, and a `string` |
| **ZN-G-2** | §3.1 `M-2` | the `M-1` spec; `size = 1.5` | `{"r":"1.5px"}` | PASS — no rounding, no truncation |
| **ZN-G-3** | §3.1 `M-3`, §0A note 2 | three specs identical except `trackProp` (`'--a'`, `'--b'`, `''`) | `{"a":"40px","b":"40px","c":"40px"}` | PASS — `trackProp` affects no output |
| **ZN-G-4** | §3.1 `M-4` | `emptyToken:'SENTINEL-0'`, `size = 40`, `empty = false` | `{"r":"40px","sentinelPresent":false}` | PASS — the sentinel never appears |
| **ZN-G-5** | §3.1 `M-5` | sentinel `emptyToken`, `size = 0`, `empty = false` | `{"r":"0px","formulaic":"0px","isCallerLiteral":false}` | PASS — the row asserts the **formula** `String(size)+unit`, never the known literal (and the drive's sentinel differs from the emitted `'0px'`, so a hard-coded literal could not pass it) |
| **ZN-G-6** | §3.1 `M-6`, §0A note 4 | sentinel `emptyToken`, `size = -0` (a variable, `Object.is` verified), `empty = false` | `{"r":"0px","startsWithMinus":false,"isNegZero":true,"isCallerEmpty":false}` | PASS — `'0px'`, no negative sign, **not** the empty token |
| **ZN-G-7** | §3.1 `M-7`, §2.4 item 3 | `1e21`, `1e-7`, `Number.MAX_VALUE`, `Number.MIN_VALUE` | `{"out":[{"s":"1e+21","r":"1e+21px","expected":"1e+21px"},{"s":"1e-7","r":"1e-7px",…},{"s":"1.7976931348623157e+308","r":"1.7976931348623157e+308px",…},{"s":"5e-324","r":"5e-324px",…}],"bad":[]}` | PASS — verbatim `String(size)`, scientific forms included |
| **ZN-G-8** | §3.1 `M-8` | `size = 0.1 + 0.2` | `{"r":"0.30000000000000004px"}` | PASS — the row's purpose (fail a rounding/`toFixed` module) holds |
| **ZN-G-9** | §3.1 `M-9`, §2.4 item 1 | `unit = 'px; color: red'` | `{"r":"120px; color: red"}` | PASS — no sanitizing, no rejection |
| **ZN-G-10** | §3.1 `M-10`, §7a.1 item 5 | three specs identical except `emptyToken` (`'ZZZ'`, `'none'`, `''`), each with `size = -1` | `{"r1":"ZZZ","r2":"none","r3":""}` | PASS — the same input class yields three different strings; no built-in literal survives |
| **ZN-G-11** | §3.1 `M-11` | `empty = true` with `size = 120`, `0`, `-1` | `{"r120":"SENTINEL-A","r0":"SENTINEL-A","rNeg":"SENTINEL-A"}` | PASS — limb (a) decides |
| **ZN-G-12** | §3.1 `M-12` | `empty` as **omitted**, `null`, `false`, `0`, `''`, `NaN`, each with `size = 120` | `{"out":[{"label":"omitted","r":"120px"},{…all six "120px"}],"bad":[]}` | PASS — every falsy drive returns `'120px'`, never the empty token |
| **ZN-G-13** | §3.1 `M-13` | `isEmpty({a:3,b:1}, 'a')` | `{"r":false,"typeofR":"boolean"}` | PASS |
| **ZN-G-14** | §3.1 `M-14` | `isEmpty({a:0,b:3}, 'a')` | `{"r":true}` | PASS |
| **ZN-G-15** | §3.1 `M-15` | `isEmpty({a:-0}, 'a')` | `{"r":true}` | PASS — `-0 === 0` |
| **ZN-G-16** | §3.1 `M-16`, §0A note 3 | `new Map([['a',0],['b',2]])`, keys `'a'` then `'b'` | `{"ra":true,"rb":false}` | PASS |
| **ZN-G-17** | §3.1 `M-17` | an `Object.create(null)` record carrying `{a:0}`, then a plain `{a:0}` | `{"r1":true,"r2":true}` | PASS — own-key reads |
| **ZN-G-18** | §3.1 `M-18`, `I-3`, §2.4 item 5 | both functions driven twice with identical arguments; census re-snapshotted | `{"a1":"7px","a2":"7px","sameString":true,"b1":true,"b2":true,"sameBool":true,"cAfter":{"kind":"object","keys":["a"],…}}` | PASS — `===` equality on both halves; nothing is carried or written |

### 4.2 §3.2 documented non-happy states (`F` family) — 8 rows, all PASS

**This contract has NO refusal domain** (`§2.3` item 4): **every outcome here is a VALUE**, so each row
asserts the **exact returned value** — never a `code`, a `reason`, an `ok` or a `skipped` field (a row
asserting one of those would be `§4.4 S-3`).

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-19** | §3.2 `F-1` + §2.3 item 1's dated precedence note | 10 malformed specs: `null`, `undefined`, `42`, `'x'`, `[]`, `{}`, a non-string `trackProp`, a non-string `unit`, a non-string `emptyToken`, a **throwing `emptyToken` accessor** — plus **two precedence drives** (`null` and a non-string field, each with `empty = true`, `size = 120`) | `{"attempts":12,"held":12,"broken":0,…}` | PASS — `''` in all 12, **no throw**, **never the empty token**, and **`''` even with `empty === true`** (the malformed limb gates the flag) |
| **ZN-G-20** | §3.2 `F-2`, §2.3 item 1 (b)/item 3 | 18 size shapes: `-1`, `-0.5`, `-Number.MIN_VALUE`, `NaN`, `±Infinity`, `'12'`, `'0'`, `0n`, `12n`, `Symbol('s')`, a function, `null`, `undefined`, `{}`, `[]`, `true`, `false` | `{"attempts":18,"held":18,"broken":0,…}` | PASS — `spec.emptyToken` verbatim in all 18; no `NaN`/`Infinity` string, no coercion |
| **ZN-G-21** | §3.2 `F-3`, `I-7` | `isEmpty({a:0},'zzz')`, `isEmpty({},'a')`, a `Map` without the key; census re-snapshotted | `{"r1":false,"r2":false,"r3":false,"c1After":{"kind":"object","keys":["a"],…},"c2After":{"kind":"object","keys":[],…},"mapAfter":{"kind":"object","mapSize":1,"mapKeys":["\"a\""],…}}` | PASS — **absence is not emptiness**, and nothing is created, defaulted or memoized into the census |
| **ZN-G-22** | §3.2 `F-4`, §0A note 3 | 10 non-record censuses (`null`, `undefined`, `42`, `'x'`, `true`, a `Symbol`, a function, `[]`, `['z']`, `Set(['a'])`) **and** 7 non-string `zoneId`s (`42`, `null`, `undefined`, `Symbol('a')`, `{}`, `[]`, `true`) against a valid record census | `{"attempts":17,"held":17,"broken":0,…,"arrayReason":"an array's index read would give a zoneId a second meaning (§0A note 3)","setReason":"a Set's membership read would be the mechanism inventing a policy (§0A note 3)"}` | PASS — `false` in all 17, no throw; the array/`Set` reasons are carried in the row's own assertion data |
| **ZN-G-23** | §3.2 `F-5`, §2.3 item 2 (i)(iii)(v) | `'constructor'`/`'toString'`/`'__proto__'` asked on a census owning none; a census whose own accessor for the asked key **throws**; a `Proxy` whose `get`/`has`/`getOwnPropertyDescriptor`/`ownKeys` **throw**; a `Map` whose `get` throws; prototype identity re-read after the `'__proto__'` drive | `{"attempts":6,"held":6,"broken":0,"protoUnchanged":true,"protoOnlyKeys":[],"afterCall":false}` | PASS — `false` everywhere, no throw, **no prototype member returned as a value**, prototype unchanged |
| **ZN-G-24** | §3.2 `F-6`, §0A note 5(b) | `trackFor({trackProp:'--r',unit:'',emptyToken:'none'}, 2, false)` | `{"r":"2"}` | PASS — the documented bare-number form |
| **ZN-G-25** | §3.2 `F-7` | `empty = true` with `size = NaN`; then with `size = -3` | `{"r1":"SENTINEL-A","r2":"SENTINEL-A"}` | PASS — limb (a) decides; a size-first module would differ |
| **ZN-G-26** | §3.2 `F-8` | `{trackProp:'',unit:'',emptyToken:''}` with `size = 0`, then `size = -1` | `{"r1":"0","r2":""}` | PASS — the legitimate empty-string token and the malformed-spec `''` are the same string, as recorded |

### 4.3 §3.3 every-state invariants (`I` family) — 10 rows (9 PASS, 1 NOT-BLIND-RUNNABLE)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-27** | §3.3 `I-1` | 19 shapes (`null`, `undefined`, `0`, `-0`, `1`, `NaN`, `Infinity`, `-1`, `'12'`, `0n`, a `Symbol`, a function, `{}`, `[]`, `true`, a valid spec, a record census, a `Map`, a `Set`) × both functions, `typeof` asserted | `{"attempts":38,"held":38,"broken":0,…}` | PASS — `boolean` and `string` only; never `null`/`undefined`/an object/number/array |
| **ZN-G-28** | §3.3 `I-2` | a **revoked `Proxy`**, a spec with a throwing `emptyToken` accessor, `Symbol`, `Object.create(null)`, a throwing-trap `Proxy`, a `Map` whose `get` throws — both functions | `{"attempts":15,"held":15,"broken":0,…}` | PASS — no throw anywhere |
| **ZN-G-29** | §3.3 `I-3`, `P-4` | a 6-call sequence (valid, invalid, valid, `true`/`false`/`true`) run twice, plus a census snapshot | `{"seq1":["5px","SENTINEL-A","5px",true,false,true],"seq2":[…identical…],"equal":true,"cAfter":{"keys":["a","b"],…}}` | PASS — identical results; no module-level state observable |
| **ZN-G-30** | §3.3 `I-4`, §2.4 items 1/2 | 3 specs (units `'px'`, `'Q'`, `''`) × 7 sizes × both flags = 42 drives, each asserted to be **one of exactly three forms** (`spec.emptyToken` ∥ `String(size)+spec.unit` ∥ `''`) | `{"attempts":42,"held":42,"broken":0,…}` | PASS — the mechanism contributes no character of its own |
| **ZN-G-31** | §3.3 `I-5` | 13 `(size, empty)` pairs; the expected value computed **by the row** from `§2.3` item 1's limbs | `{"attempts":13,"held":13,"broken":0,…}` | PASS — the empty token iff a limb fired; no finite non-negative size ever yields it |
| **ZN-G-32** | §3.3 `I-6`, `P-2`/`P-4` | a spec and a census driven through four calls; pre/post snapshots (own keys in order, per-key `Object.hasOwn`, prototypes, freeze flags); then a **frozen** spec and a **frozen** census | `{"before":{"spec":{"keys":["trackProp","unit","emptyToken"],"own":[["trackProp",true,"\"--m\""],["unit",true,"\"px\""],["emptyToken",true,"\"SENTINEL-A\""]],…},"census":{"keys":["a","b"],…}},"after":{…identical…},"equal":true,"frozenSpecResult":"12px","frozenCensusResult":true}` | PASS — nothing mutated, nothing retained; frozen arguments work identically |
| **ZN-G-33** | §3.3 `I-7`, `V-13`'s remedy | `isEmpty({}, 'created')` twice; then the deliberate collapse `isEmpty({a:3},'a') === isEmpty({},'a')` | `{"r1":false,"r2":false,"keysAfter":[],"sameValueForAbsentAndNonEmpty":true}` | PASS — no zone is created/defaulted; **"non-empty" and "absent" are the same value**, as `§2.3` item 5 pins |
| **ZN-G-34** | §3.3 `I-8` (behavioural probe) | throwing **getters** installed on `globalThis` for `document`, `window`, `matchMedia`, `getComputedStyle`, `requestAnimationFrame`, `innerWidth`; the same two calls re-driven and compared with the baseline (then the globals restored) | `{"baseline":{"t":"12px","e":true},"withHostileGlobals":{"t":"12px","e":true},"ok":true,"statedLimit":"the source-level absence of an aliased/computed realm route is R-2 (NOT-BLIND-RUNNABLE); this probe falsifies only a direct ambient read of the six named globals"}` | PASS **with a stated limit** — a direct ambient read of those six globals is falsified; **the aliased/computed realm route is `R-2`'s and stays `NOT-BLIND-RUNNABLE` (§6)** |
| **ZN-G-35** | §3.3 `I-9`, `§7a.1` item 2 | `trackFor` with a census-shaped **4th** argument vs the 3-argument call; `isEmpty(spec, 'trackProp')`; both arities | `{"plain":"12px","with4th":"12px","sameWith4th":true,"specAsCensus":false,"arityT":3,"arityI":2}` | PASS — the two functions share no state and neither consults the other's argument |
| **ZN-G-36** | §3.3 `I-10` (the geometry invariant) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"I-10 is a prohibition over this unit's rows/files and over any pass reporting a green (a prose/source claim, R-7's class). Recorded observation, not the row and NOT a pass: every observable this run asserted is a string or a boolean (typeof checks in ZN-G-27), and no geometry API was called by any drive.","recordedObservation":{"observablesAreStringOrBoolean":true,"geometryApisUsedByThisRun":[]}}` | **NOT-BLIND-RUNNABLE** — the "no row asserts geometry / no green is reported as one" clause is a claim about files and prose; **NOT RECORDED AS A PASS** |

### 4.4 §2.3 item 3 — the whole input-class enumeration — 2 rows, all PASS

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-37** | §2.3 item 3 (the `trackFor` half) | 22 size classes (`0`, `1`, `1.5`, `1024.25`, `1e21`, `-0`, `-1`, `-0.5`, `-Number.MIN_VALUE`, `NaN`, `±Infinity`, `'12'`, `'0'`, `0n`, `12n`, a `Symbol`, a function, `null`, `undefined`, `{}`, `[]`), a malformed spec entry, and `empty = true` beside a valid size | `{"attempts":24,"held":24,"broken":0,…}` | PASS — every documented class yields the documented value |
| **ZN-G-38** | §2.3 item 3 (the `isEmpty` half) | 34 classes: an own `0`, `-0`, a non-zero, `'0'`, `0.0+0`, `NaN`, `0n`, `false`, `''`, `null`, `undefined`, an **absent key**, three **prototype members** (`'constructor'`, `'toString'`, `'__proto__'`), `Map` hit/miss, `[]`/`[0]`/`['a']`, `Set(['a'])`, five non-record censuses, seven non-string `zoneId`s | `{"attempts":34,"held":34,"broken":0,…}` | PASS — including the array's own `'0'` index staying **unread** (`isEmpty([0],'0') === false`) and the `Set` staying a non-record |

### 4.5 §2.4 value-formatting cases — 2 rows, all PASS

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-39** | §2.4 items 1/3 | an integer (`120`), a fractional (`1.5`), `1e21`, `Number.MAX_VALUE`, `Number.MIN_VALUE`, `1e-7`, `0.1+0.2`, `1024.25` | `{"out":[{"label":"integer 120","raw":"120","r":"120px","expected":"120px"},{"label":"fractional 1.5","raw":"1.5","r":"1.5px",…},{"label":"1e21","raw":"1e+21","r":"1e+21px",…},{"label":"Number.MAX_VALUE","raw":"1.7976931348623157e+308","r":"1.7976931348623157e+308px",…},{"label":"Number.MIN_VALUE","raw":"5e-324","r":"5e-324px",…},{"label":"1e-7","raw":"1e-7","r":"1e-7px",…},{"label":"0.1+0.2","raw":"0.30000000000000004","r":"0.30000000000000004px",…},{"label":"1024.25","raw":"1024.25","r":"1024.25px",…}],"bad":[]}` | PASS — `String()` semantics pinned exactly, `MIN_VALUE` and `MAX_VALUE` included |
| **ZN-G-40** | §2.4 items 1/2 | `unit:''` (`size = 2`); a hostile unit `'px; color: red'`; a unit containing a newline (`'\n}'`); an odd `emptyToken` `'  0PX  '` with a negative size; `emptyToken: ''` with a negative size | `{"bare":"2","hostileUnit":"120px; color: red","newlineUnit":"1\n}","oddEmpty":"  0PX  ","emptyEmpty":""}` | PASS — the bare-number form is real, **the hostile unit is emitted verbatim**, and the empty token is **not trimmed, not case-folded** |

### 4.6 §2.1 the `U-CENSUS` delegate surface — 2 rows, all PASS

**The whole delegate surface is two calls**: `isEmpty(census, zoneId) → boolean` and
`trackFor(spec, size, empty) → string`, and **nothing else** (the "nothing else" half is the `R-5`(a)
set-equality row, `ZN-G-61`).

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-41** | §2.1 delegate clause | 7 `isEmpty` drives (record hit/miss, empty record, `null` census, `Map`, `Set`, non-string `zoneId`), each asserted to be a **bare `true`/`false`** — no wrapper object, no result record, no `ok`, no `code`, no `skipped`, no array, no `null` | `{"attempts":7,"held":7,"broken":0,…,"surface":"isEmpty(census, zoneId) → boolean; no wrapper object, no result record, no ok, no code, no skipped, no array, no null"}` | PASS |
| **ZN-G-42** | §2.1 delegate clause | 4 `trackFor` drives across the three documented forms (`'px'`, `''`, `'fr'`, one empty-limb drive), each asserted **equal to the complete token**, plus a wrapper check (`calc(`, `+`, separators) | `{"attempts":5,"held":5,"broken":0,…,"note":"the emitted string is already complete: the delegate appends no unit, no +, no calc(...) wrapper and no separator"}` | PASS — the delegate needs **no post-processing** |

### 4.7 §0A ruling notes 1–6 — 6 rows, all PASS (each is a pinned behaviour a consumer would get wrong)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-43** | §0A note 1 (`§7a.1` item 1) | `Z.isEmpty.length`, `Z.trackFor.length`, and the two-argument call | `{"isEmptyArity":2,"trackForArity":3,"r":true,"r2":false,"ruling":"isEmpty(census, zoneId), TWO arguments and TWO parameters; trackFor.length is 2 or 3"}` | PASS — **arity 2**, census-first; `trackFor.length === 3` is inside the ruling's "2 or 3". **Arity is all a blind run can see** (`O-6`) |
| **ZN-G-44** | §0A note 2 (`§7a.1` item 2) | six specs differing **only** in `trackProp` (`'--a'`, `'--b'`, `''`, `'__proto__'`, `'constructor'`, a 4 kB string) at `size = 40`; then a census owning both `'--a'` and `'a'` asked by `zoneId` | `{"outs":[["--a","40px"],["--b","40px"],["","40px"],["__proto__","40px"],["constructor","40px"],["xxxxxxxxxxxx","40px"]],"allSame":true,"byTrackPropName":true}` | PASS — `trackProp` is the emitted name only, never a census key |
| **ZN-G-45** | §0A note 3 (`§7a.1` item 3) | `Map` hit / non-zero / miss / absent, a **duck-typed map** (an object with a callable `get`), an array's index, `['a']`, `Set(['a'])` | `{"attempts":7,"held":7,"broken":0,…}` | PASS on the documented readings — `Map` supported; **array and `Set` are non-records (`false`)**; the duck-typed `get` limb is a genuine ambiguity (`O-7`) |
| **ZN-G-46** | §0A note 4 (`§7a.1` item 4) | `trackFor(spec, -0, false)`, `isEmpty({a:-0},'a')`, `isEmpty(new Map([['a',-0]]),'a')` | `{"t1":"0px","e1":true,"e2":true}` | PASS — `-0` is a **zero track** and an **empty zone**; no sign inspection on the emit side |
| **ZN-G-47** | §0A note 5 (`§7a.1` item 5) | `unit:''` at `size = 2`; a malformed spec; an empty-limb drive; an `isEmpty` drive — asserted to be **primitives only** with no vocabulary field | `{"bare":"2","malformed":"","results":["\"2\"","\"\"","\"e\"","true"],"primitivesOnly":true,"noVocabulary":true}` | PASS — no refusal domain, no union, no `code`/`ok`; the bare-number form is `unit:''` |
| **ZN-G-48** | §0A note 6 | four drives (valid, empty-limb, malformed, flag-limb) asserted `typeof === 'string'` | `{"drives":["120px","SENTINEL-A","","SENTINEL-A"],"allStrings":true,"statedLimit":"whether a browser accepts/applies/paints the string is not this unit's claim; the geometry negative is R-7/I-10 (NOT-BLIND-RUNNABLE)"}` | PASS **on the observable half** — `trackFor` returns a **string**; the **geometry negative is `R-7`/`I-10` and is `NOT-BLIND-RUNNABLE`** |

### 4.8 §5.5.1 register rows — 8 rows (one scenario each), all PASS

Every count below is **measured by this run**, against the count the register **declares** (§5 has the
row-by-row reconciliation).

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-49** | §5.5.1 `P-ZN-IM-1` (`S-ZN-EMPTY-1`), `YES (bounded)` | the 20 documented size classes (sentinels in `emptyToken`/`unit`) + the 10 flag drives (`5` truthy, `5` falsy controls) | `{"attempts":30,"held":30,"broken":0,"firstBroken":null,"brokenList":[],"declared":30,"decomposition":"20 size-class drives + 10 flag drives (5 truthy + 5 falsy)"}` | **PASS (bounded)** — **30 / 30 held**; classes 19/20 (the same `-1` under different caller `emptyToken`s) differ from class 4, so no mechanism literal survives |
| **ZN-G-50** | §5.5.1 `P-ZN-TP-1` (`S-ZN-TOTAL-1`), `YES (bounded)` | the `20`-shape pool × the `2` one-call-per-function axis bindings = `40`, + the `50` fixed hostile pairings itemized `5+2+2+2+1+4+4+30` | `{"attempts":90,"held":90,"broken":0,…,"declared":90,"decomposition":"20 shapes × 2 axis bindings = 40 pool drives + 50 fixed hostile pairings (5+2+2+2+1+4+4+30)","bindingNote":"… the 30 cross-product pairings alternate the function by index — the row itself claims NO value boundary, so only type/no-throw/repeat-equality are asserted (see ambiguity O-4)"}` | **PASS (bounded)** — **90 / 90 held**: every attempt asserted the **declared type**, **no throw**, and a **repeated call returning an equal value** |
| **ZN-G-51** | §5.5.1 `P-ZN-IM-2` (`S-ZN-ZERO-1`), `YES` | the 6 documented zero values (`0`, `-0`, `0*-1`, `0.0`, `Number('0')`, a `-0` re-drive) × the 6 documented drives (a)–(f) | `{"attempts":36,"held":36,"broken":0,…,"declared":36,"decomposition":"6 zero values × 6 drives (a..f); the not-emptyToken / no-leading-minus assertions are extra checks inside drive (a), not attempts"}` | **PASS** — **36 / 36 held**; the emitted string never starts with `'-'` and is never the empty token |
| **ZN-G-52** | §5.5.1 `P-ZN-IM-3` (`S-ZN-CENSUS-1`), `YES` | the 13 documented census shapes × the 4 documented `zoneId` shapes, with a per-attempt exact boolean, a pre/post census snapshot and an immediate second call | `{"attempts":52,"held":52,"broken":0,…,"declared":52,"decomposition":"13 census shapes × 4 zoneId shapes","note":"shape 13 is one shape with two variants (frozen {a:0} + throwing accessor), counted ONCE per (shape, zoneId) pair; the second variant is a check inside the attempt"}` | **PASS** — **52 / 52 held**; no key added/removed/defaulted, prototype identity unchanged, frozen census identical |
| **ZN-G-53** | §5.5.1 `P-ZN-SM-1` (`S-ZN-TABLE-1`), `YES` | the `16` decision-table cells (`4` size classifications × `4` spec classes), the `20` `empty`-sweep drives (`10` `empty` values × `2` size classifications, per RULING 2) and the `32` limb-order re-drives (`16 × 2` flag halves) | `{"attempts":68,"held":68,"broken":0,…,"declared":68,"decomposition":"16 cells (4 size classifications × 4 spec classes) + 20 sweep drives (10 empty values × 2 size classifications) + 32 limb-order re-drives (16 cells × 2 flag halves)","precedence":"for a MALFORMED spec the answer is \"\" REGARDLESS of empty and size (§2.3 item 1 dated precedence note, RULING 4)"}` | **PASS** — **68 / 68 held**, and it is the row that **falsifies a limb re-ordering**: the malformed cells return `''` in **both** flag halves and `C4`'s own `'0px'` `emptyToken` is never what `''` came from |
| **ZN-G-54** | §5.5.1 `P-ZN-SM-2` (`S-ZN-PURITY-1`), `YES` | the 3 documented caller objects (a spec record, a census record, a spec whose `emptyToken` is an own accessor) × the 2 access patterns × the 2 frozen/unfrozen twin forms; the `Map` twin driven as an extra recorded observation | `{"attempts":12,"held":12,"broken":0,…,"declared":12,"decomposition":"3 caller objects × 2 access patterns × 2 frozen/unfrozen twin forms","mapTwin":{"pre":{"kind":"object","mapSize":2,"mapKeys":["\"a\"","\"b\""],"mapVals":["0","3"],"frozen":false},"post":{…identical…},"result":true,"unchanged":true}}` | **PASS** — **12 / 12 held**; every pre-call snapshot deep-equals its post-call snapshot and the frozen twin behaves as its unfrozen twin |
| **ZN-G-55** | §5.5.1 `P-ZN-IM-4` (`S-ZN-FORMAT-1`), `YES` | the 3 documented spec shapes (`unit:'px'`, `unit:''`, `unit:'px; color: red'`, each with a distinct `emptyToken` sentinel) × the 5 documented sizes (`0`, `1.5`, `0.1+0.2`, `1e21`, `Number.MAX_VALUE`) | `{"attempts":15,"held":15,"broken":0,…,"declared":15,"decomposition":"3 spec shapes × 5 size values"}` | **PASS** — **15 / 15 held**; each result equals `String(size)+unit` **computed by the row**, contains no sentinel, and has no character inserted before the numeric text |
| **ZN-G-56** | §5.5.1 `P-ZN-TP-2` (`S-ZN-SEED-1` + `S-ZN-POOL-1`), `YES (bounded)` | the pinned-seed LCG (`state₀ = 20260927`, one step per draw, `index = state mod 28`) over the documented `28`-value pool with `SPECS[d mod 3]` | `{"attempts":66,"held":66,"broken":0,…,"declared":66,"seed":20260927,"lcg":"state_{n+1} = (state_n * 1664525 + 1013904223) mod 2^32; one step per draw; index = state mod 28","negativeDrawPositions":[29,57,65],"negativeDrawPoolIndices":[22,22,22],"nonNegativeDraws":63,"negativeDraws":3,"distinctPoolMembersDrawn":25,"allDrawnFinite":true,"boundary":"every draw is finite; a NON-NEGATIVE draw emits String(drawn)+unit; a NEGATIVE draw emits spec.emptyToken VERBATIM (the dated narrowing of the row boundary)"}` | **PASS (bounded)** — **66 / 66 held**; the **66 = 63 non-negative + 3 negative** decomposition and the three negative draw positions **`29`/`57`/`65` at pool index `22`** are **reproduced exactly** as the spec's RULING 3 pins them |

### 4.9 §3.4 static rows and §3.5 existence rows — 11 rows (2 PASS, 2 FAIL, 7 NOT-BLIND-RUNNABLE)

| Id | Doc clause (row) | Drive (exact) | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **ZN-G-57** | §3.4 `R-1` (the anti-evasion vocabulary row) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-1 is a normalized SOURCE-TEXT scan of src/shared/zones.ts (comments included, concatenation joined, boundary rule) plus its own controlled corpora, with a positive and a negative control. The blind rule forbids reading the implementation, so no drive can be authored or run. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **ZN-G-58** | §3.4 `R-2` (the forbidden-access row) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-2 asserts that no access in the module is rooted in a banned realm token or an alias of one, over the module source. A runtime observation cannot distinguish \"never reads document\" from \"would read it on a path this drive did not take\"; ZN-G-34 records only a direct-ambient-read probe and is not this row. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **ZN-G-59** | §3.4 `R-3` (the import-boundary row) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-3 asserts src/shared/zones.ts imports NOTHING (not even a type-only import) — an import-declaration claim readable only from the source. Weak corroboration recorded, NOT scored: the module was imported and exercised in a plain node context with no electron/document/DOM present and nothing threw on that basis."}` | **NOT-BLIND-RUNNABLE** |
| **ZN-G-60** | §3.4 `R-4` (the diff-scope row, probe-able half) | the union of the commits whose `git log` subject **mentions `U-ZONES`** (`f36f605`, `a5ad335`, `323a4a0`, `7fb37b3`, `5e17afc`, `65bb77c` — `323a4a0`'s subject names this unit **in passing**) and the anchored range `b8d3e1a..HEAD`; each commit's `--name-only` union against `§5.1`'s allow-list and its DENIED set | `{"unitCommits":["f36f605","a5ad335","323a4a0","7fb37b3","5e17afc","65bb77c"],"touchedFiles":["docs/specs/zones.md","src/shared/zones.ts","tests/layout-projection.test.ts","tests/zones.test.ts"],"rangeFiles":[same four],"outsideAllowList":["tests/layout-projection.test.ts"],"deniedPathsTouched":["tests/layout-projection.test.ts"],"canonicalArtifactsPresent":true,"importCompanionClaim":"NOT VERIFIED — \"imported by no src/** file\" is source-semantic (NBR half of the same row)"}` | **FAIL — §7.1**: a **DENIED-set path** (`tests/layout-projection.test.ts`, "every existing test file of another unit") is inside the unit's committed range; the row's allow-list/conjunction is contravened |
| **ZN-G-61** | §3.4 `R-5`(a) (the runtime export census — SET EQUALITY, with a positive control) | the imported namespace's own keys against `['isEmpty','trackFor']`, plus a control namespace carrying a third value export | `{"valueNames":["isEmpty","trackFor"],"expected":["isEmpty","trackFor"],"setEqual":true,"allFunctions":true,"positiveControlFails":true,"importError":null}` | PASS — set equality holds **and the control fails on a third value export**, so the row is not a count in disguise |
| **ZN-G-62** | §3.4 `R-5`(b) (the TYPE-ONLY name `TrackSpec`) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"The (b) half is a type-level claim: TrackSpec is a type-only declaration, erased at runtime, so the imported namespace cannot carry it (observed runtime keys: [\"isEmpty\",\"trackFor\"]). §5.2 leg 4 (a standalone strict tsc over the unit test file) is the leg that covers it. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** (and **`ZN-G-67` reports a documentation defect in the set claim this row states**) |
| **ZN-G-63** | §3.4 `R-6` (the no-shim / five-seam negative) | **not driven**; a `git diff` observation recorded | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-6 is a repo-wide NAME-COMPLETE census (ALL_TOOLS 21 names, RpcMethod 21 members, MUTATING_METHODS 7 named entries, VALID_GROUPS 5 members) asserted by SET EQUALITY AGAINST THE NAMES in src/main/** — a source read this blind pass may not take. Recorded observation, NOT the row and NOT a pass: over b8d3e1a..HEAD the diff touches no src/shared/dom-shim.ts (shimTouched=false)."}` | **NOT-BLIND-RUNNABLE** |
| **ZN-G-64** | §3.4 `R-7` (the geometry row) | **not driven** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-7 is a three-part text scan (the module bytes, the unit test file bytes, and the row descriptions extracted from that test file) for geometry-observation calls and geometry-shaped claims, with its own controls. Both files are forbidden reads for this blind pass. NOT RECORDED AS A PASS; and no rendered-geometry claim is made anywhere in this greens artifact."}` | **NOT-BLIND-RUNNABLE** |
| **ZN-G-65** | §3.5 `R-8` (the module-absence row) | an `fs.existsSync` probe of the two unit files, **at the current tree only** | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-8 asserts that AT THE MOMENT THE RED SET WAS AUTHORED AND RUN, src/shared/zones.ts did NOT exist. That is a claim about one past tree state (red run); the probe can only be run against the CURRENT tree, and no re-run can recover the earlier instant. NOT RECORDED AS A PASS.","probeObservedNow":{"moduleExists":true,"testFileExists":true},"note":"the module exists now, which does not falsify the historical claim and does not satisfy it either"}` | **NOT-BLIND-RUNNABLE** (a one-instant historical claim; `O-5`) |
| **ZN-G-66** | §3.5 `R-9` (the absent-page-design probe) | `fs.existsSync('docs/skills/designing-pages.md')` + a `readdirSync` of `docs/skills` | `{"pageDesignExists":false,"skillsDir":["process-guardrails.md"],"conditionalObligationTriggered":false}` | PASS — the file does **not** exist, so the conditional obligation (a coverage-matrix row + a demo-page index entry) is **not triggered**. **A probe result at this tree state only** (`O-8`) |
| **ZN-G-67** | §2.1's **EXPORT CENSUS** paragraph read against **§2.1's own block** (the census-agreement rule: *"it must AGREE with the block"*), plus §3.4 `R-5`(b) | the census paragraph's declared name set (`isEmpty`, `trackFor`, `TrackSpec` — *"exactly 2 + 1 = 3 exported names and nothing else"*) compared with **every `export`-prefixed declaration in §2.1's block** (`TrackSpec`, **`ZoneCensus`**, `isEmpty`, `trackFor`) | `{"censusClaim":"EXPORT CENSUS ... THREE exported names, in TWO halves — TWO value exports (isEmpty, trackFor) and ONE type declaration (TrackSpec) ... This block declares exactly 2 + 1 = 3 exported names and nothing else","r5bClaim":"§3.4 R-5(b): the TYPE-ONLY name — exactly TrackSpec","censusNamesDeclared":["isEmpty","trackFor","TrackSpec"],"blockDeclaredNames":["TrackSpec","ZoneCensus","isEmpty","trackFor"],"agrees":false,"extraNamesInBlock":["ZoneCensus"]}` | **FAIL — §7.2**: the census's set claim and the block it must agree with **disagree by one name** (the block exports `ZoneCensus`; the census and `R-5`(b) do not name it) |

---

## 5. Register coverage — each of the 8 rows exercised INDEPENDENTLY, observed vs stated

**This is this run's own execution of the register's property text** (`§5.5.1`), driven from the spec's
cells — **not** a re-run of the unit's own file (which was never read). Every attempt count below is
what **this run measured**, against the count the register **states**.

| Register row | Type · stated marking | Register's stated statement | Strategy id (stated) | Register's stated attempts | This run's drive | **Observed (this run)** | Result vs statement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`P-ZN-IM-1`** | `P-IM` · **`YES (bounded)`** | every size that is not a finite non-negative number ⇒ `spec.emptyToken` **verbatim**; truthy `empty` ⇒ the token for **any** size; falsy `empty` never yields it for a valid size (`I-4`/`I-5`) | `S-ZN-EMPTY-1` | **`30`** (`20` size classes + `10` flag drives) | the same 20 classes in the documented order + the 5 truthy / 5 falsy flag drives, with sentinels in both `emptyToken` and `unit` | **`30` driven / `30` held / `0` broken** — `{"attempts":30,"held":30,"broken":0}`; classes 19/20 differ from class 4 | **HELD (bounded)** — the enumeration's domain matches the cell's 20 classes; **the unbounded universal is NOT proven and NOT claimed** |
| **`P-ZN-TP-1`** | `P-TP` · **`YES (bounded)`** | both functions **total** over the pinned 20-shape pool: declared types, **no throw**, and a repeated call returning an equal value | `S-ZN-TOTAL-1` | **`90`** = `40` (`20` shapes × `2` one-call-per-function bindings) + `50` fixed hostile pairings (`5+2+2+2+1+4+4+30`) | the same decomposition, **using the strategy cell's `40 + 50` partition** (RULING 1) with the documented pool inventory and the documented itemization | **`90` driven / `90` held / `0` broken** — `{"attempts":90,"held":90,"broken":0}` | **HELD (bounded)** — **NOT a proof of the "every input shape" universal**; the row's own cell says so. Two binding details are my documented reading (`O-3`, `O-4`) |
| **`P-ZN-IM-2`** | `P-IM` · **`YES`** | every zero-valued input is the **non-empty** outcome on both sides: `trackFor` emits `'0'+unit` (no sign, no empty token); `isEmpty` answers `true` (`§0A` note 4) | `S-ZN-ZERO-1` | **`36`** = `6` zero values × `6` drives (a)–(f) | the 6 documented zero values (incl. the computed `0*-1` and the `Object.is` re-drive) × drives (a) sentinel-empty falsy, (b) `unit:''`, (c) `empty:true`, (d) record, (e) `Object.create(null)` record, (f) `Map` | **`36` driven / `36` held / `0` broken** — `{"attempts":36,"held":36,"broken":0}`; no emitted string begins with `'-'` | **HELD** |
| **`P-ZN-IM-3`** | `P-IM` · **`YES`** | every census shape in the 13-shape domain × every `zoneId` in the 4-shape domain: the **declared boolean** and the census **observably unchanged** (own keys, prototype identity, freeze flag, no memoized value; a second call equal) | `S-ZN-CENSUS-1` | **`52`** = `13` census shapes × `4` `zoneId` shapes | the documented 13 shapes (shape 13 = the frozen `{a:0}` **plus** the throwing-accessor variant, counted **once** per pair) × `'a'`/`'zzz'`/`42`/`Symbol('a')`, census-major, with pre/post snapshots | **`52` driven / `52` held / `0` broken** — `{"attempts":52,"held":52,"broken":0}` | **HELD** — the declared `trueFor` set is `'a'` only for `{a:0}`, the null-prototype record, the frozen record and the `Map`; the throwing variant is pinned `false` in both the row and the drive |
| **`P-ZN-SM-1`** | `P-SM` · **`YES`** | every cell of the `4 × 4` decision table returns **exactly** what the limb order prescribes; a **malformed spec yields `''`** (never the empty token, never `String(size)+unit`); a truthy `empty` beats an invalid **and** a valid size | `S-ZN-TABLE-1` | **`68`** = `16` cells + `20` sweep (`10` `empty` values × `2` size classifications, RULING 2) + `32` limb-order re-drives (`16 × 2` flag halves) | the documented `S1`–`S4` size classifications × `C1`–`C4` spec classes; the `10` `empty` values × `{S1 valid, S2 invalid}`; then the same `16` cells re-driven under **both** flag halves | **`68` driven / `68` held / `0` broken** — `{"attempts":68,"held":68,"broken":0}`; `C4`'s own `emptyToken: '0px'` is **never** what `''` came from | **HELD** — and it is the row that **falsifies a limb re-ordering**: the 32 flag re-drives put `(malformed spec × empty=true)` beside `(malformed spec × empty=false)` |
| **`P-ZN-SM-2`** | `P-SM` · **`YES`** | for every fixed-table entry the call mutates nothing and retains nothing: snapshots equal, a frozen twin behaves as its unfrozen twin, and the **same call repeated** returns an equal value (no memo/cache/counter/state) | `S-ZN-PURITY-1` | **`12`** = `3` caller objects × `2` access patterns × `2` frozen/unfrozen forms | the documented 3 objects (spec record · census record · spec whose `emptyToken` is an own accessor) × `trackFor`/`isEmpty` × unfrozen/frozen, each with a pre/post snapshot and a repeat call; the `Map` twin recorded as an uncounted observation | **`12` driven / `12` held / `0` broken** — `{"attempts":12,"held":12,"broken":0}`; `mapTwin.unchanged: true` | **HELD** — the `Map`-as-twin wording is my documented reading (`O-9`) |
| **`P-ZN-IM-4`** | `P-IM` · **`YES`** | every legitimate (well-formed, non-empty) spec in the `3 × 5` matrix returns **exactly** `String(size)+spec.unit`: the mechanism contributes **no character of its own**, and a `unit` that is a full declaration is emitted verbatim | `S-ZN-FORMAT-1` | **`15`** = `3` spec shapes × `5` size values | the documented `u1`/`u2`/`u3` shapes (each with a distinct `emptyToken` sentinel) × `0`, `1.5`, `0.1+0.2`, `1e21`, `Number.MAX_VALUE`, each expected string computed **by the row** | **`15` driven / `15` held / `0` broken** — `{"attempts":15,"held":15,"broken":0}` | **HELD** |
| **`P-ZN-TP-2`** | `P-TP` · **`YES (bounded)`** | every drawn size's text is `String(size)` verbatim — narrowed by RULING 3 to: **every draw finite**; a **non-negative** draw emits exactly `String(drawn)+unit` and may **not** yield the empty token; a **negative** draw emits `spec.emptyToken` verbatim | `S-ZN-SEED-1` (generator) · `S-ZN-POOL-1` (draw strategy) | **`66`** draws (seed `20260927`, one LCG step per draw, `index = state mod 28`) | the same hand-rolled LCG, the same `28`-value pool, `SPECS[d mod 3]`, both boundary halves asserted **per draw** | **`66` driven / `66` held / `0` broken** — `{"attempts":66,"held":66,"broken":0}`; `negativeDrawPositions:[29,57,65]`, `negativeDrawPoolIndices:[22,22,22]`, `63` non-negative + `3` negative | **HELD (bounded)** — the corrected boundary's **both** halves are driven, and the draw arithmetic the spec pins is **reproduced exactly**; **NOT a 28-of-28 sweep**: only **`25`** distinct members were drawn by these 66 draws |
| **TOTAL** | **`4` `P-IM` + `2` `P-SM` + `2` `P-TP` = 8 rows** | — | — | **`369`** = `30+90+36+68+52+12+15+66` | — | **`369` driven / `369` held / `0` broken**; stop-after-5 **not triggered** | **ALL 8 ROWS HELD** — the register's own arithmetic is reproduced **term by term**, inside the `≤100`/row and `≤400` total caps |

**The three `YES (bounded)` rows are bounded here too, and this file says so plainly.** `P-ZN-IM-1`
enumerates **20 size classes** (`20` + flag drives, not "every size"); `P-ZN-TP-1` drives a **20-shape
pool** with `90` calls (not "every input shape"); `P-ZN-TP-2` draws **66** times over a **28**-member
pool (not "every size"). **None of the three is a proof of its unbounded universal, and no reader may
read this section as one** (`§5.5.1`'s honesty items 1/2/5).

**Register counting discipline, as this run followed it:** one attempt = **one exercised drive** — one
`trackFor` call on one class (`P-ZN-IM-1`), one call of one function (`P-ZN-TP-1`), one `(zero value,
drive letter)` pair (`P-ZN-IM-2`), one `(census, zoneId)` pair (`P-ZN-IM-3`), one table cell or fixed
drive (`P-ZN-SM-1`), one `(object, pattern, twin form)` triple (`P-ZN-SM-2`), one `(spec shape, size)`
pair (`P-ZN-IM-4`), one pinned-seed draw (`P-ZN-TP-2`); **fixture construction is precondition, not
attempt.**

**Register arithmetic reconciliation, printed with its terms** (the ACTIVE rule
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`): **`369` = `30` + `90` + `36` + `68` + `52` + `12` + `15` + `66`**
— re-added by this run and **equal** to the spec's declared total; the as-filed `400` is the mis-sum the
spec's own gate-2 note corrects, and **no term moved**. **Declared vs distinct-drive figures, reported
BESIDE each other and never substituted:** `P-ZN-TP-2` declares **`66` draws** whose **distinct-member**
count is **`25`** of `28` (a draw is not a sweep — `§5.5.1` honesty item 5), and `P-ZN-SM-1` declares
**`68`** of which **`16`** are exhaustive table cells and **`52`** are fixed additional drives.

**Two register cells carry a binding detail this run had to read rather than receive** — `P-ZN-TP-1`'s
per-shape binding sentence and its `30`-pairing function choice — recorded as `O-3`/`O-4`, never silently
resolved. **The register's own pool-versus-boundary rule was applied member-for-member as I re-drove
each row**, and **no member of any row contradicted its row's boundary text in my reading** — the
`P-ZN-TP-2` negative member (`#23`, index `22`) is driven against the **narrowed** boundary text and held.

---

## 6. NOT-BLIND-RUNNABLE record — **8 rows**

**These eight rows are reported as `NOT-BLIND-RUNNABLE`, never as passes.**

| Id | Row | Why no blind drive exists | What a blind run CAN substitute (and did) |
| --- | --- | --- | --- |
| **ZN-G-36** | §3.3 `I-10` — no row asserts rendered geometry / no green is reported as one | A prohibition over **rows, files and prose**; it is the same class as `R-7` | **Only a recorded observation** (`observablesAreStringOrBoolean: true`, no geometry API called). **That is not the row** |
| **ZN-G-57** | §3.4 `R-1` — the normalized vocabulary/literal scan of the module (comments included; concatenation joined) plus its own positive/negative corpora | The observable is the **module's source text**; the blind rule forbids reading it, and the corpora live in the red set, also forbidden | **nothing** — a runtime substitute cannot prove the absence of a word in a comment or an unused literal |
| **ZN-G-58** | §3.4 `R-2` — no banned realm token or alias, no ambient read for a value | Source-semantic; a runtime observation cannot distinguish "never reads `document`" from "would read it on a path not taken" | **a weak corroboration** (`ZN-G-34`): six ambient globals replaced by throwing getters and the results unchanged. **Not the row, not scored** |
| **ZN-G-59** | §3.4 `R-3` — `src/shared/zones.ts` imports **nothing** | An import-**declaration** claim | **a weak corroboration**: the module was imported and exercised in a plain node context with no `electron`/DOM present and nothing threw on that basis. **Strictly weaker than the row** |
| **ZN-G-62** | §3.4 `R-5`(b) — the **type-only** name `TrackSpec` | A type-only name is **not a runtime key**, and a type-level read requires the module's declarations | **the (a) half was driven** (`ZN-G-61`, runtime set equality with a positive control); **the type half is owed to `§5.2` leg 4**. **`ZN-G-67` reports the documentation defect in the set claim this row states** |
| **ZN-G-63** | §3.4 `R-6` — the no-shim / five-seam negative by **name-complete set equality** in `src/main/**` | A repo-wide census of `src/main/**` names — a source read this pass may not take | **one recorded observation**: over `b8d3e1a..HEAD` the diff touches **no** `src/shared/dom-shim.ts`. **Not the row** |
| **ZN-G-64** | §3.4 `R-7` — the geometry scan over the module bytes, the test-file bytes and the extracted row descriptions | Both source files are forbidden reads | **nothing.** This artifact makes no rendered-geometry claim and asserts no `[U]` row, but **a negative stated here is not `R-7`** |
| **ZN-G-65** | §3.5 `R-8` — the module **did not exist** at the red-run instant | A claim about **one past tree state**; no re-run can recover it | **a probe of the current tree only**: `moduleExists: true`, `testFileExists: true` — which neither falsifies nor satisfies the historical claim (`O-5`) |

**One row that IS scored although it is a static row:** `ZN-G-60` (`R-4`) is *partly* runnable because its
falsifier is a **file/git probe** (`git log --name-only`, `git diff --name-only`) rather than a semantic
read of the module — so it is scored, and it **FAILS** (§7.1). **A `ZN-G-60` result says nothing about
`R-1`/`R-2`/`R-3`/`R-5`(b)/`R-6`/`R-7`, which stay `NOT-BLIND-RUNNABLE`** — and its own **companion
claim** (*"imported by no `src/**` file"*) is **not verified** by it (`O-1`). `ZN-G-61` (`R-5`(a)) and
`ZN-G-66` (`R-9`) are likewise scored, because each is a genuine runtime/`fs` probe whose failure would
be meaningful.

---

## 7. FAIL rows, attribution and reproduction

**Two rows are FAIL.** §7.1 is a **committed-range scope violation** (the row's own DENIED set); §7.2 is
**doc/spec drift** (a self-inconsistent census paragraph inside `§2.1`). **Neither is a defect in the
module's arithmetic, and no observed value below is inferred — each is the runner's printed payload.**
§7.3 records two incidental observations that are **not** my rows and **not** scored.

### 7.1 `ZN-G-60` — `§3.4 R-4`'s **DENIED set** is violated by the unit's committed range

**Doc clause cited:** **`docs/specs/zones.md` §3.4 `R-4`** — *"Only the files of `§5.1`'s allow-list are
touched by this unit's committed range: the module (NEW), the test file (NEW), this spec, and the
unit's own tracker/record artifacts. **A changed path outside that list FAILS the row**"* — read
together with **`§5.1`'s DENIED set**, which *"binds absolutely"* and names *"**every existing test file
of another unit**"* among its members.

**Reproduction (exact):**

```bash
git log --format='%h%x09%s' -8 | grep U-ZONES          # → f36f605 a5ad335 323a4a0 7fb37b3 5e17afc 65bb77c
git show --name-only --format= f36f605                  # → src/shared/zones.ts, tests/layout-projection.test.ts, tests/zones.test.ts
git diff --name-only b8d3e1a..HEAD                      # → docs/specs/zones.md, src/shared/zones.ts, tests/layout-projection.test.ts, tests/zones.test.ts
git diff --stat b8d3e1a..HEAD                           # → tests/layout-projection.test.ts | 136 +-
```

**Expected per `R-4`:** the unit's committed range ⊆ `§5.1`'s allow-list (`src/shared/zones.ts` ·
`tests/zones.test.ts` · `docs/specs/zones.md` · the tracker/record artifacts) and ∩ DENIED set = ∅.
**Observed (verbatim):** `{"outsideAllowList":["tests/layout-projection.test.ts"],"deniedPathsTouched":
["tests/layout-projection.test.ts"],"canonicalArtifactsPresent":true}` — the union of the unit's own
commits, **and** the anchored range `b8d3e1a..HEAD`, both contain the **existing `U-PROJ` test file**
(`+136/-28` across `323a4a0` and `f36f605`), which `R-4` lists in its **DENIED** set.

**Attribution — a COMMITTED-RANGE SCOPE VIOLATION (a process/scope finding), NOT a module behaviour and
NOT doc/spec drift about the module.** The observed value is a fact about **which paths are in the
range**, not about `trackFor`/`isEmpty`; every module-side row in §4 passes. The commit subject of
`f36f605` itself declares the intent — *"cross-unit diff-scope scoping for zones R-4 + U-PROJ R-20
working-tree halves"* — so this is a **deliberate cross-unit edit inside a `U-ZONES` commit**, which the
DENIED set does not permit. **The remedy is not in the module**: either that sibling-test edit belongs to
a **separate `U-PROJ` commit** outside this unit's range, or `§5.1`/`R-4` needs a **dated carve-out**
(its own gate, since it edits a pinned scope clause). **Nothing was changed for this row and nothing was
softened.** This is the same class the sibling addendum recorded for `U-PROJ` (`projection-greens.md`
§12.4.3: *the diff-scope allow-list does not name the workflow's own gate-5 artifact*), i.e. these rows
keep producing findings at exactly the boundary between a unit's own artifacts and its workflow's.

### 7.2 `ZN-G-67` — `§2.1`'s **EXPORT CENSUS** paragraph and **`§2.1`'s own block** disagree by one name

**Doc clause cited:** **`docs/specs/zones.md` §2.1**, the census paragraph above the code block —
*"**EXPORT CENSUS — stated before the block, and it must AGREE with the block: THREE exported names, in
TWO halves — TWO value exports (`isEmpty`, `trackFor`) and ONE type declaration (`TrackSpec`)** … **This
block declares exactly `2 + 1 = 3` exported names and nothing else**"* — read against **the block
immediately below it**, whose declarations are:

```ts
export interface TrackSpec { … }
export type ZoneCensus = Readonly<Record<string, unknown>> | ReadonlyMap<unknown, unknown> | unknown
export function isEmpty(census: unknown, zoneId: unknown): boolean
export function trackFor(spec: unknown, size: unknown, empty?: unknown): string
```

and read together with **`§3.4 R-5`(b)**: *"the **TYPE-ONLY** name — exactly `TrackSpec`"*.

**Observed (verbatim):** `{"censusNamesDeclared":["isEmpty","trackFor","TrackSpec"],
"blockDeclaredNames":["TrackSpec","ZoneCensus","isEmpty","trackFor"],"agrees":false,
"extraNamesInBlock":["ZoneCensus"]}`.

**Expected per the census's own rule** (*"it must AGREE with the block"*): the block's `export`-prefixed
declarations = `{TrackSpec, isEmpty, trackFor}`. **Observed:** the block exports **four** names, the
fourth being **`ZoneCensus`**.

**Attribution: DOC/SPEC DRIFT — a documentation defect inside `§2.1` (a census that does not match the
block beside it), not a module regression.** The spec itself names this exact class as a review finding
(*"the sibling `U-PROJ` review found a spec cell that said 'eight exports' while its own block declared
eleven names — a count that does not match the block beside it is a review finding"*), and the census
paragraph is the cell that owns the agreement claim. **Two readings are available and neither is mine to
choose in this pass** — either (i) `ZoneCensus` **is** a fourth exported name and the census/`R-5`(b) set
claims are wrong (making the census `2` value exports + **`2`** type declarations), or (ii) the block's
`export` keyword on `ZoneCensus` is unintended and the paragraph is right. **The runtime half is
unaffected**: this run's `R-5`(a) probe found the runtime namespace to be **exactly**
`['isEmpty','trackFor']`, so no *value-export* claim is broken by this — but a consumer (`U-CENSUS`)
reading `R-5`(b)'s *"exactly `TrackSpec`"* would be entitled to a **compile-time** guarantee the block's
own text contradicts. **Nothing was changed for this row, and no reading was hardened into the
contract.** The remedy is a documentation edit inside `§2.1`'s census paragraph or its block (owner: the
spec's documentation-review pass), and **`R-5`(b) itself stays `NOT-BLIND-RUNNABLE`** (`ZN-G-62`).

### 7.3 Incidental observations, recorded rather than hidden — **not my rows, not scored**

1. **The unit's OWN `R-4` row is RED at `HEAD` on a CLEAN tree.** With my temporary files deleted and
   this artifact not yet written, `git status --porcelain` printed **nothing**, and
   `vitest run tests/zones.test.ts` read **`Tests 1 failed | 57 passed (58)`** — the surviving row is
   `R-4`, whose own message reads, verbatim: *"R-4/§5.1 — 'tests/layout-projection.test.ts' was
   COMMITTED inside this unit's range `7fb37b3…HEAD` and is in the DENIED set: a boundary violation
   whatever its content. The unit-scoped committed change set was: `["docs/specs/zones.md",
   "src/shared/zones.ts", "tests/layout-projection.test.ts", "tests/zones.test.ts"]`"*. **That is the
   same finding `ZN-G-60` reached blind, from the spec's text alone** — an independent corroboration, and
   also the reason the unit's own file does **not** read the `58/58` its gate-3 commit subject claims.
2. **The node suite is not green at `HEAD` on a clean tree:** `Test Files 2 failed | 61 passed (63)` ·
   **`Tests 2 failed | 1178 passed | 2 skipped (1182)`** — the two are the zones `R-4` above **and
   `U-PROJ`'s `R-20`**, whose own message reads *"R-20/§5.1 (ADV-PJ-12; the O-12 ruling):
   `'src/shared/zones.ts'` was COMMITTED inside this unit's range `b8bd468…HEAD` and is not in the RULED
   allow-list …"*. **The two units' scope rows are mutually red at this tree state** because their
   anchored ranges partition the same interleaved commits differently. **This is a tracker/claim-drift
   finding for the supervisor** (the gate-3 commit subject claims *"1180 pass"*; a re-run reads
   `1178 passed`), and **it is not a defect in this unit's module or in mine to fix.**
3. **My own pass's footprint, recorded so it is attributed rather than confused with the above:** while
   my two **`tests/*.tmp.test.ts`** files existed, the suite read **`4 failed | 1242 passed | 2 skipped
   (1248)`** — the extra failures being **the unit's own `R-8`** (its green-time re-scope probe flags a
   third file in the unit's change set) and the same rows' working-tree halves firing on my files.
   **After deletion both cleared**, leaving only the two committed-range findings of items 1–2. **This
   greens artifact does NOT re-trip them, measured rather than assumed**: with
   `docs/specs/zones-greens.md` present and uncommitted, the unit's file still reads
   **`Tests 1 failed | 57 passed (58)`** and the suite still reads **`1178 passed | 2 skipped (1182)`** —
   **identical to the clean-tree state** (the scope rows' live probes bind `tests/**` files and the
   committed range, not a `docs/**` artifact). **No scenario, drive or expectation in this file was
   derived from any of these failure messages.**

---

## 8. Ambiguities (`O-1`…`O-9`) — recorded, never silently resolved

**No clause below was edited, and no row was invented from an ambiguity.** Each is a claim I could not
turn into **one** falsifiable scenario, with the observed values that made it visible.

| # | The clause(s) | Why no single falsifiable scenario exists | What this run did instead (and observed) |
| --- | --- | --- | --- |
| **`O-1`** | **§3.4 `R-4`**'s companion claim — *"at the time this unit's red set runs, `src/shared/zones.ts` is imported by NO `src/**` file"* | The claim is an **import graph** fact about `src/**`, readable only from source — which this blind pass may not read. The row is therefore a **conjunction with one probe-able conjunct and one unverifiable one** | Scored the **diff-scope conjunct** (`ZN-G-60`, FAIL) and recorded the import conjunct as **NOT VERIFIED** inside the same payload. **No pass is claimed for it** |
| **`O-2`** | **§5.5.1 `P-ZN-TP-1`** — *"every pool member is a shape the row can legally bind; a `TrackSpec`-shaped record is driven as `spec`; everything else is driven as BOTH a `census`/`zoneId` pair and a `size`/`empty` pair"*, against the cell's own **`20 × 2`** arithmetic and the fixed pairing *"(20) × `isEmpty` (a spec passed where a census belongs ⇒ `false`)"* | The sentence, the `20 × 2` product and the fixed `(20) × isEmpty` pairing admit **more than one binding assignment** (if the spec-shaped record is driven only as `spec`, what is `isEmpty`'s second binding for it?), and the row itself **claims no value boundary**, so no expectation distinguishes the readings | Drove **one documented reading** (the spec-shaped record as `spec` on the `trackFor` axis and as a census on the `isEmpty` axis — the very pairing the fixed half asserts) and asserted **only the row's own observables**: declared type, no throw, repeated-call equality. **Recorded as a binding ambiguity, not resolved** |
| **`O-3`** | **§5.5.1 `P-ZN-TP-1`**'s **`30`** cross-product pairings — *"the `30` cross-product pairings of the `6` non-record shapes … with the `5` `[isEmpty, trackFor]` shapes … (`30`)"* against the counting rule *"one attempt = one call of one function"* | `6 × 5 = 30` pairings but **one call each** means the cell does **not** say which function each of the 30 calls uses, and a pairing driven with "both functions" would be `60`, contradicting the declared term | Alternated the function by pairing index (`isEmpty` on even, `trackFor` on odd), asserted type/no-throw/repeat only. **Observed `40 + 50 = 90` held with `0` broken; the ambiguity is the derivation, not the count** |
| **`O-4`** | **§2.3 item 2 (a)** — *"`census` is a `Map` (i.e. `census instanceof Map` **or** it duck-types as a map: **a callable `get`**)"* — against item 2 (b)'s record limb and the *"evaluated IN THIS ORDER"* sentence | A **record owning a callable `get` key** satisfies limb (a)'s duck-type wording *and* limb (b)'s record wording, and the two limbs **can disagree** for the same `(census, zoneId)`: the order sentence makes (a) win, but "duck-types as a map" is not pinned to a **Map-like `get`** (`get(zoneId) → value`) as opposed to any callable named `get` | **Recorded as a diagnostic, not scored** — `{"get()=>0, own a=0":true,"get()=>1, own a=0":false,"get()=>undefined, own a=0":false,"genuine Map, key a=0":true,"plain record, no get":true}`. So the module **treats a callable-`get` object as a map and lets that limb decide** (`get()=>1` beside an own `a:0` answers `false`, where the record limb would answer `true`). **Whether a *record* may be re-classified as a map by owning a `get` key is not stated, and no row may assert either answer as the contract** |
| **`O-5`** | **§3.5 `R-8`** — *"at the moment the red set is AUTHORED and RUN, `src/shared/zones.ts` does not exist"* | A claim about **one past tree state**: once the module lands, no re-run can recover the instant, and the probe can only read the current tree — so the row is not re-drivable at all at this tree state | Probed and recorded (`moduleExists: true`), verdict **`NOT-BLIND-RUNNABLE`** — the historical claim is **neither falsified nor satisfied** by a later probe. **Not scored as a pass** |
| **`O-6`** | **§3.3 `I-8`** (*"reads NO environment"*) vs **§3.4 `R-2`** (*"no access rooted in a banned realm token or an alias of one"*) — the two rows share one claim at two layers | The **direct ambient read** of a named global is falsifiable behaviourally; the **aliased/computed realm route** (`globalThis[name]`, a helper returning the realm, `Function`-shaped construction) is **not**, at any layer this pass may observe | Drove the behavioural half (`ZN-G-34`, PASS) with an explicit stated limit, and left `R-2` **`NOT-BLIND-RUNNABLE`** (`ZN-G-58`). **The split is my reading of the two rows' scope, not a statement of the spec** |
| **`O-7`** | **§3.1 `M-6`**'s drive — *"spec as `M-1`"* — where `M-1`'s spec is `{trackProp:'--w', unit:'px', emptyToken:'0px'}` and `M-6`'s own assertion is *"**the empty token is NOT returned**"* | With **that** fixture the empty token **is** the literal `'0px'` the row also expects, so the row's second claim is **unfalsifiable as its own data is written**: the two observables coincide | Drove the **claim** with a **distinct `emptyToken` sentinel** and it held (`{"r":"0px","startsWithMinus":false,"isNegZero":true,"isCallerEmpty":false}`), and recorded the fixture collision here. **Reported as a spec-data hazard, not resolved**; the same hazard is what `M-5`'s own wording warns about (*"never 'the returned string equals the known literal'"*) |
| **`O-8`** | **§3.3 `I-5`** — *"the empty token is emitted IFF one of **exactly three limbs** fired: a truthy `empty`, a **non-finite** `size`, or a **negative** `size`"* — against **§2.3 item 1 (b)**, whose limb also fires on *"`typeof size !== 'number'`"* (`'12'`, a `BigInt`, a `Symbol`, `null`, `undefined`, an object, an array, a boolean) | `I-5`'s enumeration **omits the not-a-number class**: a numeric string is neither "non-finite" nor "negative" in the ordinary reading, yet `§2.3` item 1 (b) makes it the empty token. A row written **against `I-5`'s literal enumeration** cannot decide that class, and `I-5`'s second clause (*"no finite non-negative size ever yields the empty token"*) does not cover it either | Drove the class from the **governing table** (`§2.3` item 1 (b)) — `ZN-G-31`, `ZN-G-37`, `ZN-G-49` all hold (`'12'` ⇒ the empty token). **`I-5`'s three-limb enumeration is reported as incomplete**; no clause was edited |
| **`O-9`** | **§5.5.1 `P-ZN-SM-2`** — *"`3` caller objects: **(1)** a spec record · **(2)** a census record **(with a `Map` as its `(2)`-twin)** · **(3)** a spec whose `emptyToken` is read through an own accessor"* × *"`2` twin forms: unfrozen, and `Object.freeze`d"* | The cell names **three** objects but gives object **(2)** a `Map` "twin", and the third axis is explicitly the **frozen/unfrozen** form — so whether the `Map` is a **fourth object** or a **twin of (2)** is not stated; the two readings give `12` and `16` attempts against a declared `12` | Drove the reading that matches the declared term (`3 × 2 × 2 = 12`) and drove the `Map` as an **uncounted recorded observation** (`mapTwin.unchanged: true`). **Reported, not resolved** |

**Two further clauses this run could not turn into a `§3`-shaped row, stated so they are not read as
omissions:** **§2.1's `ZoneCensus` type** (the fourth name in the block) is scored **only** as the
documentation-consistency row `ZN-G-67`, because the module-side type census is `R-5`(b) and is
`NOT-BLIND-RUNNABLE`; and **§5.2 leg 2's named limit** (`tsconfig.json` excludes `tests/**`, so
`npm run typecheck` is evidence about `src/**` only) means **no row here rests on the typecheck leg**.

---

## 9. Self-corrections inside this run (checker defects, recorded so none is read as a finding or a pass)

Every item below was a **defect in my checker or my drive**, re-derived from the contract text; **no
scenario was softened, no expectation was relaxed to match an observation, and the two FAILs are
separate**. The observed values of the **final** run (§4) are the corrected drives only.

1. **`ZN-G-28`** — my `repr()` helper read `JSON.stringify` on a **revoked `Proxy`**, which throws
   (`TypeError: Cannot perform 'get' on a proxy that has been revoked`), so the row reported a failure
   that was **entirely mine**. Corrected to a total `repr()` (`[unrepresentable]`); the row then read
   **15 / 15 held** — the module itself never threw.
2. **`ZN-G-49`** — I appended a separate *"classes 19/20 differ from class 4"* entry to the attempt list,
   making the run report **`31`** attempts against the declared `30`. Corrected: that claim is now a
   **check inside class 4's attempt**, and the row reads **`30` / `30` held**.
3. **`ZN-G-51`** — I first counted **every assertion** as an attempt (45 rows for a declared `36`), and
   then over-corrected to **6** by grouping a whole zero value as one attempt. Corrected a second time to
   the register's own unit of counting — **one `(zero value, drive letter)` pair = one attempt** — giving
   **`36` / `36` held** with the extra checks carried inside drive (a).
4. **`ZN-G-52`** — I counted the `13`th shape's **two variants** as two attempts (`56` against the
   declared `52`). Corrected to the cell's own wording (*"driven as one shape's two variants, **counted
   once**"*), giving **`52` / `52` held**.
5. **`ZN-G-56`'s boundary** — before writing the drive I re-derived the spec's own draw arithmetic with a
   throwaway `node -e` LCG (`negatives at 29,57,65`, `count idx22 = 3`) so that my expectation came from
   the spec's pinned form and not from an observation of the module. The final row reproduces
   `[29,57,65]` / index `[22,22,22]` / `63` non-negative / `3` negative.
6. **`ZN-G-3`** — the first version of the drive referenced an undefined `E` binding (my typo). Corrected
   to the named sentinel constant; no verdict was affected.

---

## 10. The temporary runners — exact paths, and proof of deletion

**Paths used (both temporary, both now deleted):**

- **`tests/blind-zones-greens.tmp.test.ts`** — the **67 scored rows** (§4), driven through the
  black-box import of `src/shared/zones.js`.
- **`tests/blind-zones-diag.tmp.test.ts`** — one diagnostic: the `§2.3` item 2 (a) duck-typed-map limb
  against the (b) record limb for a record owning a callable `get` (`O-4`).

**Deletion proof, exactly:** `ls tests/ | grep -ci tmp` prints **`0`**; at the moment of deletion
`git status --porcelain` printed **nothing at all** (the workspace had **no** pre-existing modification),
and the whole suite read **`Test Files 2 failed | 61 passed (63)`** / **`Tests 2 failed | 1178 passed |
2 skipped (1182)`** with **both temporary files gone** against **`4 failed | 1242 passed | 2 skipped
(1248)`** while they existed (§3). **Final state, stated honestly:** `git status --porcelain` now prints
exactly one line — **`?? docs/specs/zones-greens.md`** — this artifact, which is the **only** file this
pass leaves behind; **measured, not assumed: its presence changes no count** (the unit's file still reads
`57 passed` of `58` and the suite `1178 passed | 2 skipped` of `1182`, exactly as on the clean tree —
§3, §7.3 item 3), because the red rows are committed-range findings the gate-boundary commit's owner must
resolve. **This pass edited no other tracked file**: not the spec, not the module, not the red
set, not the trackers, not `package.json`, not `scripts/**`; it ran **no** `git commit`, and it never
touched `node_modules/provident-ssr/` or `../Preempt-Providence/`.

**Scope of the blindness claim, exactly:** `src/shared/zones.ts` was **never opened, never read, never
printed** — it was imported and called as a black box through the two documented functions and the
namespace's runtime key set. `tests/zones.test.ts` was **never read**: it was **run for counts** at four
tree states (§3) and two of its failure reports printed a row id and an assertion sentence into this
session's transcript (§7.3), which contributed **nothing** to any drive. The only content reads in this
pass were the documentation listed in the header, `package.json`, `vitest.config.ts` and `git` probes.

---

## 11. Honesty — exactly what this run does and does not prove

**May rest on this record:**

- **every `M-*` happy state** (`ZN-G-1`..`ZN-G-18`): `String(size)+unit` with `String()` semantics pinned
  exactly (`1.5`, `0.1+0.2`, `1e21`, `MAX_VALUE`, `MIN_VALUE`, `-0` ⇒ `'0'`), `trackProp` inert,
  `emptyToken` caller-supplied and irrelevant when not empty, `size = 0` a **track** and not "empty",
  truthy-vs-falsy flag behaviour, and the four documented `isEmpty` census reads;
- **every documented non-happy state as a VALUE** (`ZN-G-19`..`ZN-G-26`): the malformed-spec `''` (with
  the dated **precedence** over the flag), the 18 non-representable size classes ⇒ `spec.emptyToken`
  verbatim, absent-zone / non-record-census / non-string-`zoneId` ⇒ `false`, four hostile-census shapes
  ⇒ `false` with no throw and no prototype read, `unit:''` ⇒ the bare number, and the two
  indistinguishable `''` outcomes;
- **every `I-*` invariant that is observable** (`ZN-G-27`..`ZN-G-35`): totality and declared types over 38
  drives, no-throw over 15 hostile drives, determinism, the three-form emitted-string set, the
  empty-token-iff-a-limb-fired rule, non-mutation and non-retention incl. frozen arguments, "the census
  is never this unit's state" and the deliberate `absent`/`non-empty` collapse, the no-carried-state
  arity/collision drives, and **a direct ambient-read probe with six hostile globals**;
- **the whole `§2.3` item 3 input-class enumeration** (`ZN-G-37`/`ZN-G-38`): `NaN`, `±Infinity`, numeric
  strings, `BigInt`, `Symbol`, functions, `null`, `undefined`, an absent key, malformed specs, `-0`,
  arrays (own-index reads **not** taken), `Set`s and `Map`s;
- **the `§2.4` formatting cases** (`ZN-G-39`/`ZN-G-40`): integer, fractional, `1e21`, `MAX_VALUE`,
  `MIN_VALUE`, `unit:''`, and **a hostile unit string emitted verbatim** (declaration, newline, odd
  casing — none of it trimmed or case-folded);
- **the six `§0A` ruling notes as behaviour** (`ZN-G-43`..`ZN-G-48`), each a claim a consumer would get
  wrong otherwise;
- **the delegated `U-CENSUS` surface only** (`ZN-G-41`/`ZN-G-42`): `isEmpty(census, zoneId) → boolean` and
  `trackFor(spec, size, empty) → string` — a bare boolean, a **complete** string, **no wrapper**, **no
  post-processing**, and `R-5`(a)'s runtime **set equality** (`ZN-G-61`);
- **the register, exercised independently: `369` attempts driven / `369` held / `0` broken**, term by term
  against the eight stated counts and strategy ids, with the three bounded rows **still marked bounded**,
  the draw arithmetic (`63` + `3` at `29`/`57`/`65`, pool index `22`) reproduced, and the register's
  arithmetic re-added as `30+90+36+68+52+12+15+66 = 369` (§5);
- **the existence probe** `R-9` (`ZN-G-66`): `docs/skills/designing-pages.md` does not exist, so the
  conditional coverage-matrix/demo-page obligation is **not triggered at this tree state**;
- **the corroboration legs, with their exact tree states** (§3): the unit's own row file **`57 passed` of
  `58`** and the node suite **`1178 passed | 2 skipped` of `1182`** on a **clean** tree with my files
  deleted — **both carrying the pre-existing `R-4`/`R-20` scope failures of §7.3**.

**May NOT rest on this record:**

- **the module's source-level prohibitions.** `R-1`, `R-2`, `R-3`, `R-5`(b), `R-6` and `R-7` are
  **`NOT-BLIND-RUNNABLE`** and **ungreen here, as is `I-10`**. **A reader may not infer from this file
  that the module carries no banned vocabulary, no realm-rooted access, no import at all, no fourth
  exported type name, no new seam and no geometry-shaped claim** — those are **owed** to a source-reading
  pass (and `ZN-G-67` shows the census text itself needs a ruling), and a self-verified greens set
  authored by the implementer is a review finding (RCA-4);
- **the `R-8` absence claim** (a one-instant historical claim, `O-5`) and **`R-4`'s import companion
  claim** (`O-1`);
- **ANY rendered-geometry, CSS-validity, applied-length, layout or paint claim** — the ledger's geometry
  clause says such a claim is **UNPROVABLE in this repo today**, this unit **offers no `[U]` row**
  (`§5.2`), and every observable here is a **string or a boolean over arguments**;
- **assembled-app evidence of any kind**: no window was booted, no IPC round-trip ran, no MCP transport
  was exercised, and **this module is imported by no `src/**` file per the unit's own scope rows** — so
  the green says **the contract holds for a caller**, not that app behaviour changed;
- **the two `FAIL`s as anything but what §7 attributes them to.** `ZN-G-60` is a **committed-range scope
  violation** of `R-4`'s DENIED set (reproduced by `git`, and independently red in the unit's own row at
  `HEAD`), and `ZN-G-67` is a **documentation defect inside `§2.1`** (its census paragraph against its own
  block). **Neither may be read as a module regression, and neither was fixed here** — a pass that owns
  `§5.1`/`R-4` and a pass that owns `§2.1`'s census are the owners, and **`ZN-G-67`'s remedy is a
  documentation edit that changes no runtime behaviour**;
- **the `§2.1` export-census / `R-5`(b) set claim** — its runtime half is green (`2` value exports, by set
  equality with a positive control), its **type half is not**, and its **documentation half is red**;
- **any count quoted from a commit subject or a tracker cell** — §3 shows what a re-run reads at `HEAD`
  (`57/58` and `1178/1182`), which is **not** the `58/58` and `1180 pass` those cells claim (§7.3).

**And the rule this record exists to serve:** **every FAIL above is either doc/spec drift or a
committed-range/contract violation — never a pass.** No row was converted, softened, re-scoped or
dropped to reach a green, and the eight `NOT-BLIND-RUNNABLE` rows are **reported as such**.
