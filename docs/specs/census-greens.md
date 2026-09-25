# Green Scenarios — `U-CENSUS` (the census → track-variable record) — blind run

**Status: `BLIND RUN (one pass) — 77 executed scenario rows: 59 PASS / 6 FAIL / 12 NOT-BLIND-RUNNABLE`**

**No FAIL was converted, no row was re-scoped to reach a pass, no row was softened, and no
`NOT-BLIND-RUNNABLE` row was scored as a pass. No ambiguity was silently resolved.**

| | |
| --- | --- |
| **Unit** | `U-CENSUS` — the **census half of `SCH-8`** (architect ruling `A-d4`): `computeTrackVars(zones, census, sizes, revealed, specOf)` → a null-prototype record whose key set is exactly `zones`, delegating every token byte to `U-ZONES`, never mutating and never reading the census itself, no refusal domain, no CSS, no DOM, one import |
| **Wave** | **E** — this unit is wave E's **second** unit; `U-ZONES` (row `E1`) is its landed predecessor and `U-GUTTER` (row `E3`) depends on it |
| **Gate** | **5 — the blind green-scenario pass** (`AGENTS.md` item 10a / RCA-4) |
| **Date (filing calendar)** | **2026-09-27**. The host clock reads **2026-09-25** (`date -u` → `Fri Sep 25 05:32:25 PM UTC 2026`) during this work — the same host-clock-vs-filing-calendar offset the sibling greens records carry. **Cite the filing date.** |
| **Tree state (HEAD)** | **`71b69b4`** — `U-CENSUS gate 3 GREEN: 13 green-time test repairs … trio 64 files/1246 tests 1244 pass/2 skip, tc 0, build 0, leg4 0` (the commit **subject** is quoted here as a **claim source**; §3 shows what a re-run actually reads at this tree state) |
| **Working tree** | **clean at the start of this pass** (`git status --porcelain` printed nothing). **It is NOT clean at the end, and neither line is mine:** (a) **` M tests/census.test.ts`** — a **190-line uncommitted ADDITION** (`git diff --numstat` → `190 0`) whose mtime is **2026-09-25 12:34:16 −0500**, i.e. **during this pass**; **this pass did not author it, never read it and did not run it for anything but a count** (a concurrent pass is editing the unit's own red set; see §7.4); (b) **`docs/specs/census-greens.md`** — this artifact, the only file this pass leaves behind. **The six temporary runner files are DELETED (§10).** |
| **Authored from** | **THE DOCUMENTATION ONLY.** `src/shared/census.ts` was **never opened, never read, never printed** (imported and called as a **black box**); `tests/census.test.ts` (the unit's red set) was **never read** and was **RUN for counts only** |
| **Runner** | node **v24.20.0**, the repo's own vitest (`node_modules/.bin/vitest`, v5.0.1), `environment: 'node'` |

**Documents read to derive every scenario:** `docs/specs/census.md` in full — the status notes and the
RULING banner, **§0** (the 12 rulings), **§0A** (the ten ruling notes **plus notes 11 and 12**, the
architect ruling *"Non-revealed zones still exist, they just don't get displayed."* and its five falsifiers
and its one stated limit), the Layer declaration and its four honesty anchors, §1, **§2.1** (every export,
signature, return shape, the export census, the delegate clause), **§2.2** (the `H-r8` six-prohibition
table `P-1`..`P-6`), **§2.3** (items 1–6, the enumeration order, the five stated clauses, the ruling
annotation), **§2.4** (`C-A`/`C-B`/`C-C` clause by clause and their dated confirmations), **§2.5** (the
geometry boundary, the value semantics it does not own, the absent-decision `''`, the order guarantee and
the ruling's stated-limit annotation), **§3.1** `M-1`..`M-14`, **§3.2** `F-1`..`F-6` and the `F-2`
annotation, **§3.3** `I-1`..`I-10` and the `I-2`/`I-5` confirmation, **§3.4** `R-1`..`R-10`, **§3.5**
`R-11`..`R-13`, §4.1–§4.5, **§5.1** (the allow-list and the DENIED set and the commit-range scope rule),
**§5.2** (the four legs and the refused `[U]` row), **§5.3** (the DONE-row shape, items 1–11), **§5.5**
and **§5.5.1** (the 8-row typed register, its strategy discipline, every cell, the attempt arithmetic,
the honesty block, the pool-versus-boundary rule and its member-for-member result, the dated register
confirmation), §6, **§7** items 1–14, **§7a**/**§7a.1** (the eight ruled ambiguities), §8, §3a/§3b; plus
**`docs/specs/zones.md`** (the delegate's contract — its **§2.1** delegate clause, its **§2.3** items
1–7 with the **corrected malformed-spec precedence** and the **amended dispatch precedence**, its
**§2.4** value-formatting rules), `docs/specs/zones-greens.md` (the immediately preceding gate-5 blind
run — **HOUSE STYLE ONLY**) and the headers of `docs/specs/projection-greens.md` /
`docs/specs/listhost-greens.md`, `docs/decisions.md` (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`,
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, `SHELL-CHROME-PANES-ZONES-IN-SCOPE`), `docs/next-steps.md`
(rows `E2`/`E3`), `docs/pending.md` §B/§G/§H, `AGENTS.md`, `package.json`, `vitest.config.ts`.

**Files NOT read to derive any scenario's content — recorded so the blindness claim is exact:**

1. **`src/shared/census.ts` was never opened, never read, never printed.** The module was imported as a
   **black box** (`await import(/* @vite-ignore */ ['..','src','shared','census.js'].join('/'))`) and
   exercised through the surface `§2.1` names: `computeTrackVars(zones, census, sizes, revealed, specOf)`
   and the namespace's own runtime keys for the `R-2`(a) set-equality row.
2. **`tests/census.test.ts` was never read** — no assertion, fixture, row id or expectation of it was
   inspected. It was **RUN for its count** at two tree states (§3) and **its one failure report printed a
   row id (`CO-1`) and an assertion sentence into this session's transcript** (§7.4); that disclosure was
   **not** used as a source for any drive of mine, and it is recorded rather than hidden. (It is also the
   **independent corroboration** of my own `CN-G-73`, which was authored and run before that text
   appeared in the log.)
3. **No other `src/**` file was read either.** `src/shared/zones.ts` was **imported as a black box** (its
   two documented functions and its runtime key set, plus a **wholesale replacement of it** in one runner,
   §10); `src/shared/dom-shim.ts`, `src/main/**`, `src/renderer/**` and every sibling mechanism module
   were **not** read. The only content reads in this pass were the documentation listed above,
   `package.json`, `vitest.config.ts` and **`git`/`fs` probes** (`git log`, `git show --name-only`,
   `git diff --numstat`, `git status --porcelain`, `fs.existsSync`, `readdirSync`).
4. **`node_modules/provident-ssr/` and `../Preempt-Providence/` were never touched.**
5. **The one delegated-surface substitution this pass made (recorded because it is a technique, not a
   read):** one runner replaced `src/shared/zones.js` **wholesale** with a spy module
   (`vi.mock('../src/shared/zones.js', …)`) so that `§2.3` item 6's **exact delegate call counts and
   argument tuples** become observable, and so that a declined zone's delegate cost is decidable. **No
   line of the module under test was read for it**; the mock is a black-box substitution at the
   documented specifier `§2.1` prints.

---

## 1. Layer declaration — exactly what this run proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own vitest under node v24.20.0, driving **plain values** (zone enumerations, censuses, lookups, predicates, specs) — no element, no document, no shim | a browser; the assembled app; the engine |
| **[H]** | host-side | this unit's own `src/shared/census.ts`, **imported as a black box** — its documented surface only — and its predecessor `src/shared/zones.ts`, likewise | engine-internal behaviour |
| **[S]** | static/structural | file/git probes the blind rule permits: `fs.existsSync`, `readdirSync`, `git log/show/diff/status`, `package.json` key sets | a semantic source read of the module |
| **[U]** | real-DOM `ui` leg | **NOT TAKEN — and `§5.2` does not offer one** for this unit | — |

**Honesty anchors, carried so no row over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** No window was
   booted, no IPC round-trip ran, no MCP transport was exercised, and **no real DOM was touched**.
2. **This unit touches no DOM at all, not even the shim.** Every input here is an argument. **A `[T]`
   green here proves ARITHMETIC, DECISION and DELEGATION only** (the spec's anchor 2).
3. **NOTHING here is a CSS or geometry claim.** `computeTrackVars` returns **a record of strings**;
   whether a browser accepts them, applies them or paints anything is **not** asserted by any row and is
   not this unit's claim (`§2.5`, `I-8`, `R-6`, `§5.2`).
4. **`§5.2`'s `[U]` row is NOT OFFERED, and the reason is structural, not an excuse**: the module is
   **imported by no `src/**` file** (`R-8`/`R-13`), so there is no rendered surface to observe. That
   companion claim is itself **not verified by this blind pass** (`R-13` is `NOT-BLIND-RUNNABLE`, §6).
5. **The property register (`§5.5.1`) is exercised here as this unit's own property layer** (the spec's
   anchor 4): every register row is `[T]` work over injectable arguments, so §5 records **measured
   counts**, not design cells.
6. **A self-verified greens set is a review finding (RCA-4):** this record is the **independent** half —
   neither the module's source nor the unit's red set was read to produce any row below.

---

## 2. Exact commands (as run)

```bash
node_modules/.bin/vitest run tests/blind-census-a.tmp.test.ts tests/blind-census-b.tmp.test.ts \
    tests/blind-census-c.tmp.test.ts tests/blind-census-d.tmp.test.ts --reporter=verbose   # the 77 rows (final run)
node_modules/.bin/vitest run tests/census.test.ts            # the unit's OWN row file (COUNT ONLY — never read)
node_modules/.bin/vitest run                                 # the node suite (counts only)
node -e '…the pinned-seed LCG, in BigInt…'                   # my own draw arithmetic, before writing P-CN-TP-1
git log --format='%h %s' -20 | grep -i 'U-CENSUS' ; git show --name-only --format= <commit>
git diff --numstat ; git status --porcelain ; date -u ; node -v ; git log -1 --format=%h
```

**Runner / stack:** Node **v24.20.0**; vitest **5.0.1** as declared in `package.json`; `git HEAD`
**`71b69b4`**; the working tree **clean** at the start of this pass. The six temporary runner files were
the only files this pass created before this artifact, and **all six are deleted** (§10).

---

## 3. Run counts (the run's arithmetic)

| Leg / artifact | Command | Verbatim result | Exit |
| --- | --- | --- | --- |
| the scenario set (§4), **final run**, temp files present | `vitest run <the four runners> --reporter=verbose` | `Test Files 3 failed \| 1 passed (4)` · **`Tests 6 failed \| 71 passed (77)`** (the six failures are `CN-G-22`, `CN-G-35`, `CN-G-36`, `CN-G-47`, `CN-G-70`, `CN-G-73`) | `1` |
| the unit's own row file, **while my files existed** (count only) | `vitest run tests/census.test.ts` | `Test Files 1 failed (1)` · **`Tests 1 failed \| 64 passed (65)`** — the failure is the unit's own **`CO-1`** (§7.4) | `1` |
| node suite `[T]`, **while my files existed** | `vitest run` | `Test Files 4 failed \| 66 passed (70)` · **`Tests 7 failed \| 1317 passed \| 2 skipped (1326)`** — the seven are **my six FAIL rows** plus the unit's own **`CO-1`** | `1` |
| **after deletion, before this artifact existed** — the unit's own row file (count only) | `vitest run tests/census.test.ts` | **`Test Files 1 failed (1)`** · **`Tests 1 failed \| 64 passed (65)`** — **identical** to the reading above; **my files' presence changed nothing in the unit's file** | `1` |
| **after deletion, before this artifact existed** — the node suite | `vitest run` | **`Test Files 1 failed \| 63 passed (64)`** · **`Tests 1 failed \| 1244 passed \| 2 skipped (1247)`** — the one failure is the unit's own **`CO-1`** | `1` |
| **this record** | all of the above | **77 rows — 59 PASS / 6 FAIL / 12 NOT-BLIND-RUNNABLE** | — |

**The row arithmetic, so it closes — 77 scored rows = 59 PASS + 6 FAIL + 12 NOT-BLIND-RUNNABLE:**

| Group (as authored) | Ids | Rows | PASS | FAIL | NBR |
| --- | --- | --- | --- | --- | --- |
| the architect ruling `§0A` notes 11/12 | `CN-G-1`..`CN-G-12` + `CN-G-9b` | 13 | 13 | 0 | 0 |
| §2.3 items 1–6 + every `M-*` + `F-1`..`F-6` + `I-1`..`I-10` + the uncoercible-member drive | `CN-G-13`..`CN-G-46` + `CN-G-73` | 35 | 29 | 4 | 2 |
| the per-zone-throw conflict (`P-CN-IM-4` drive 10) | `CN-G-47` | 1 | 0 | 1 | 0 |
| §2.1 surface + §3.4 `R-1`..`R-10` + §3.5 `R-11`..`R-13` + the delegate surface | `CN-G-48`..`CN-G-64` | 17 | 7 | 0 | 10 |
| `§5.5.1` register rows (one scenario per row, 8 rows) | `CN-G-65`..`CN-G-72` | 8 | 7 | 1 | 0 |
| the delegate-count rows under a wholesale delegate mock | `CN-G-74`..`CN-G-76` | 3 | 3 | 0 | 0 |
| **total** | | **77** | **59** | **6** | **12** |

**The two `FAIL` classes, stated once:** **three are doc/spec drift** (`CN-G-22` the order claim,
`CN-G-35` `F-5`, `CN-G-36` `F-6`), **two are a drift BETWEEN two documented clauses** (`CN-G-47`
`P-CN-IM-4` drive (10) against `F-2` (d); `CN-G-70` shape (3)'s declared key order — same root as
`CN-G-22`), and **one is the module-side behaviour the supervisor flagged as under review**
(`CN-G-73`), **corroborated by the unit's own red row `CO-1`** (§7). **No FAIL is a pass, and none was
converted.**

---

## 4. The scenarios

`Doc clause` cites the contract **by section and row id** (never by line number). The `Observed` column
quotes the **verbatim** `console.log` payload the runner printed for that id — JSON as printed,
**abridged with `…` only where the payload is long**, and every fragment is a verbatim prefix of what
printed.

### 4.1 The architect ruling (`§0A` ruling notes 11/12) — 12 rows, all PASS

| Id | Doc clause (row) | Scenario (exact drive) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **CN-G-1** | `§0A` note 11 + `§2.4 C-A` (exact set equality) | `computeTrackVars(['a','b','c'], {a:0,b:3}, {a:40,b:40,c:40}, id => id!=='b', {a,b,c specs})` | key set **exactly** `['a','b','c']` **by set equality, including the declined `'b'`** | `{"keys":["a","b","c"],"setEqual":true,"values":[["a","SENTINEL-E"],["b",""],["c","40px"]]}` | **PASS** — the declined zone EXISTS in the record and is **not** filtered |
| **CN-G-2** | `§0A` note 12 falsifier **(b)** + `§2.3` item 6 | the same shape with caller-lookup spies and `emptyToken:'SENTINEL-E'` | the declined value is **strictly `''`**, is **not** the caller's `emptyToken`, and **no** lookup is called for it | `{"values":["120px",""],"declinedStrictlyEmpty":true,"declinedIsNotEmptyToken":true,"declinedIsNotToken":true,"sizeLookupCalls":["a"],"specLookupCalls":["a"]}` | **PASS** |
| **CN-G-3** | `§0A` note 12 falsifier **(a)** + `§2.4 C-A` (a) | a declined `'b'` over `['a','b']` | `Object.hasOwn(record,'b') === true` and `'b'` is a member of `Object.keys` | `{"hasOwnDeclined":true,"inKeys":true,"keys":["a","b"],"protoNull":true}` | **PASS** |
| **CN-G-4** | `§0A` note 12 falsifier **(d)** + `§2.5` item 3 | `emptyToken:'0px'`, a valid size `0`, `revealed = () => false` | the declined value is **neither** the caller's `emptyToken` **nor** `String(size)+unit` | `{"value":"","equalsCallerEmptyToken":false,"equalsSizePlusUnit":false,"keys":["b"]}` | **PASS** — no token of any kind is emitted for a declined zone |
| **CN-G-5** | `§0A` note 12 falsifier **(e)** + `§2.3` item 3 annotation | `revealed = () => false` beside `revealed` absent, same zones | the two outcomes **differ exactly as pinned**: declined ⇒ keys with `''`; no decision ⇒ `{}` | `{"declinedKeys":["a","b"],"declinedValues":["",""],"noDecisionKeys":[],"differ":true}` | **PASS** — no substitution of a policy for the caller's decision |
| **CN-G-6** | `§3.2 F-2` + `§2.3` item 3 + `§2.4 C-A` (a) | the argument **omitted**, then `undefined`, then `() => false`, all over a NON-EMPTY `zones` | omitted/`undefined` ⇒ `{}`; declined ⇒ keys present with `''` | `{"omittedKeys":[],"omittedArgKeys":[],"declinedKeys":["a"],"declinedValue":""}` | **PASS** — `F-2` is the zero-zone case, **not** the declined-zone case |
| **CN-G-7** | `§3.2 F-2` (b)(c) + `§2.4 C-C` (g) | 9 non-callable `revealed` values (`undefined`, `null`, `42`, `'x'`, `true`, `{}`, `[]`, a `Map`, a `Symbol`) with a counting duck-typed census | `{}` in every cell; **0** census reads; no throw | `{"attempts":9,"bad":[],"seen":[["undefined",[],null,0],["null",[],null,0],["42",[],null,0],["\"x\"",[],null,0],["true",[],null,0],["{}",[],null,0],["[]",[],null,0],["Map",[],null,0],["Symbol",[],null,0]]}` | **PASS** — no visible fallback and no hidden fallback |
| **CN-G-8** | `§3.2 F-2` (d) + `§0A` note 6 | `revealed = () => { throw }` with a non-empty `zones` | `{}`, no throw escapes, no census read | `{"keys":[],"threw":null,"censusReads":0}` | **PASS** |
| **CN-G-9** | `§0A` note 12 stated limit + `§2.5` item 3 annotation | `['x','y','z']` where `y`'s spec is malformed and `z`'s size lookup misses with `emptyToken:''` | the three distinct causes are observable as values | `{"keys":["x","y","z"],"values":["40px","",""],"collision":false,…}` | **PASS** |
| **CN-G-9b** | `§0A` note 12 (i)/(ii)/(iii) | **one** drive holding all three causes: declined / malformed spec / size-miss with `emptyToken:''` | all three values are `''` — **indistinguishable from the value alone** | `{"keys":["declined","malformed","missed"],"values":["","",""],"indistinguishableByValue":true}` | **PASS** — the stated limit is real, exactly as documented |
| **CN-G-10** | `§1` item 7 (sibling-facing) + `§7` item 14 | a consumer iterating `Object.keys(record)` on a drive that declines the middle zone | the consumer **SEES EVERY ZONE**, including the declined one; the value expresses no display state | `{"iterated":[["a","SENTINEL-E"],["b",""],["c","1px"]],"zonesSeen":3,"displayStateExpressed":false}` | **PASS** — keys = existence, values = display payload |
| **CN-G-11** | `§3.1 M-4` + `§2.3` item 6 + `§2.4 C-A` (a) | `revealed = () => false` for both zones; spies on `revealed`, `sizes`, `specOf` and on the census read | the key exists with `''`; **0** lookup calls and **0** census reads; `revealed` called once per enumerated zone | `{"keys":["a","b"],"values":["",""],"revealedCalls":["a","b"],"sizeLookupCalls":[],"specLookupCalls":[],"censusReads":[]}` | **PASS** |
| **CN-G-12** | `§2.4 C-C` + `§0A` note 11 (`C-C` row) | reveal-all versus reveal-`a`-and-`c`, comparing the **revealed** zones' values | the revealed zones' values are **unaffected** by the decline decision | `{"allValues":["40px","40px","40px"],"someValues":["40px","","40px"],"revealedValuesUnchanged":true}` | **PASS** — the predicate decides the VALUE, never the key set |

### 4.2 `§2.3` items 1–6, every `M-*`, `F-1`..`F-6`, `I-1`..`I-10` — 35 rows (30 PASS / 3 FAIL / 2 NBR)

| Id | Doc clause (row) | Scenario (exact drive) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **CN-G-13** | `§2.3` 1(a) + `§3.1 M-2` | `zones = new Map([['a',1],['b',2],['c',3]])`, all revealed | three keys `'a'/'b'/'c'` — **the MAP'S KEYS, never its values** | `{"keys":["a","b","c"],"values":["40px","40px","40px"]}` | **PASS** |
| **CN-G-14** | `§2.3` 1(a) | a `Set`, an `Array`, and an object with an **own callable `Symbol.iterator`** (plus an own string key that must be ignored) | each contributes its **iteration values**, in order | `{"set":["a","b"],"array":["a","b"],"ownIterator":["a","b"]}` | **PASS** — shape (a) wins over the record branch |
| **CN-G-15** | `§2.3` 1(b) + `§0A` note 2 | a plain record; a record with an own `Symbol` key beside `'a'`; a record whose **prototype** carries `b` | own enumerable **STRING** keys only — never a `Symbol` key, never a prototype member | `{"plain":["a","b"],"withSymbolKey":["a"],"protoCarrying":["a"]}` | **PASS** |
| **CN-G-16** | `§2.3` 1(i) | an own `Symbol.iterator` present but **not callable** (`42`), beside own keys `a`,`b` | the test is `typeof it === 'function'` ⇒ it **falls to the record branch** | `{"keys":["a","b"],"emptyOwnerKeys":[]}` | **PASS** |
| **CN-G-17** | `§2.3` 1(ii) + `§3.3 I-1` | an iterator that yields `'a'` and then **throws** | **caught**; the whole enumeration is the members yielded so far; **never a throw** | `{"keys":["a"],"threw":null,"protoNull":true}` | **PASS** |
| **CN-G-18** | `§2.3` 1(c) + `§3.2 F-1` (a) + `§2.4 C-A` (c) | 8 non-enumerable `zones` (`null`, `undefined`, `42`, `'abc'`, `true`, a `Symbol`, a function, `0n`) | `{}` for each; 0 census reads; no throw | `{"attempts":8,"bad":[],"seen":[["null",[],null,0],["undefined",[],null,0],["42",[],null,0],["\"abc\"",[],null,0],["true",[],null,0],["Symbol",[],null,0],["function",[],null,0],["0n",[],null,0]]}` | **PASS** |
| **CN-G-19** | `§2.3` 1(iv) + `§3.2 F-1` (b) + `§2.4 C-A` (f) | `zones = [Symbol('s'), 'a']` | the `Symbol` member is **DROPPED**, **never stringified** | `{"keys":["a"],"hasStringifiedSymbol":false}` | **PASS** |
| **CN-G-20** | `§2.3` 1(iii) + `§3.1 M-7` + `§2.4 C-A` (d) | `zones = ['a','b','a']` with a **stateful** `sizes` callable (5 then 9 for `'a'`) | **one** key per distinct member, at its first-seen position, with the **LAST** occurrence's value; no double count | `{"statefulKeys":["a","b"],"statefulA":"9px","statefulB":"40px","sizeLookupCallsForA":2,"staticKeys":["a","b"],"staticValues":["5px","SENTINEL-E"]}` | **PASS** — 2 lookups for `'a'`, last-write-wins value, first-seen position |
| **CN-G-21** | `§2.5` item 4 + `§0A` note 7 | `zones = ['c','a','b']` (no integer-like ids) | keys in **first-seen enumeration order** | `{"keys":["c","a","b"],"expectedFirstSeen":["c","a","b"],"matches":true}` | **PASS** |
| **CN-G-22** | `§2.5` item 4 + `§0A` note 7 (**the integer-like-key case**) | `zones = ['2','1','a']`; and `['10','2']` | the documented claim: `Object.keys` yields the zones in **first-seen order** ⇒ `['2','1','a']` and `['10','2']` | `{"keys":["1","2","a"],"documentedFirstSeen":["2","1","a"],"matchesDocumentedOrder":false,"twoDigitKeys":["2","10"],"expectedFirstSeenTwoDigit":["10","2"]}` | **FAIL — §7.1** (doc/spec drift) |
| **CN-G-23** | `§2.3` item 2 + `§3.1 M-3` + `§3.1 M-6` + `§2.4 C-B` (f) | `{a:3}` vs `{a:0}` vs `new Map([['a',0]])` vs a duck-typed map, size 120 | the LIMB is the delegate's: non-empty ⇒ `String(120)+unit`; empty ⇒ the caller's `emptyToken`; the `Map` is **observably unchanged** | `{"nonEmptyValue":"120px","emptyValue":"SENTINEL-E","mapCensusValue":"SENTINEL-E","mapUnchanged":true,"duckValue":"SENTINEL-E","duckCensusReads":["a"]}` | **PASS** |
| **CN-G-24** | `§2.3` item 3 + `§3.1 M-11` | `revealed = () => 1` / `()=>'yes'` / `()=>({})` / `()=>[]` / `()=>function` / `()=>true` | every **truthy** return EMITS the zone (the gate is `Boolean(...)`, never `=== true`) | `{"attempts":6,"seen":[["()=>1",["a"],"40px"],["()=>'yes'",["a"],"40px"],["()=>({})",["a"],"40px"],["()=>[]",["a"],"40px"],["()=>function",["a"],"40px"],["()=>true",["a"],"40px"]]}` | **PASS** |
| **CN-G-25** | `§2.3` item 3 + `§3.1 M-12` + `§2.4 C-A` (a) | `revealed = () => 0` / `()=>''` / `()=>null` / `()=>NaN` / `()=>undefined` / `()=>false` | every **falsy** return DECLINES: the key is **present with `''`** and **no** delegate call happens | `{"attempts":6,"bad":[],"seen":[["()=>0",["a"],"",0],["()=>''",["a"],"",0],["()=>null",["a"],"",0],["()=>NaN",["a"],"",0],["()=>undefined",["a"],"",0],["()=>false",["a"],"",0]]}` | **PASS** — a callable returning falsy is the DECLINED case, not the `F-2` case |
| **CN-G-26** | `§2.3` items 3/6 + `§3.2 F-2` (d) + `§2.4 C-A` | a predicate that throws for **every** zone, and one that throws only for `'b'` over three zones | `F-2` (d): a throwing predicate ⇒ the **EMPTY** record | `{"perZoneKeys":[],"perZoneValues":[null,null,null],"perZoneRevealedCalls":["a","b"],"perZoneCensusReads":["a"],"threw":null,"wholeThrowKeys":[],"wholeThrowRevealedCalls":["a"]}` | **PASS on the `F-2`(d) half** — and the **per-zone** half of this observation is **`CN-G-47`'s FAIL** |
| **CN-G-27** | `§2.3` item 4 + `§3.2 F-4` (size half) + `§4.4 S-1` | 10 unusable `sizes` shapes (`undefined`, `null`, `42`, `'12'`, `[]`, a throwing callable, a record with a throwing own accessor, `-1`, `NaN`, a miss) | every one yields **the caller's `emptyToken`** through the delegate's own limb; no throw | `{"attempts":10,"bad":[],"seen":[["undefined","SENTINEL-E",null],["null","SENTINEL-E",null],["42","SENTINEL-E",null],["'12'","SENTINEL-E",null],["[]","SENTINEL-E",null],["throwing callable","SENTINEL-E",null],["throwing accessor record","SENTINEL-E",null],["-1","SENTINEL-E",null],["NaN","SENTINEL-E",null],["missing entry","SENTINEL-E",null]]}` | **PASS** |
| **CN-G-28** | `§2.3` item 5 + `§3.2 F-3` + `§3.2 F-4` (spec half) + `§2.4 C-A` (b) | `['a','b']` with a spec/size for `'a'` only, plus 7 more malformed/absent `specOf` shapes | the **key survives in every case**; the spec cases yield `''`; `F-3`'s `'a'` keeps its token | `{"attempts":8,"bad":[],"seen":[["absent (zones [a,b], specOf has only a)",["a","b"],["40px",""],null],["undefined",["a"],[""],null],["null",["a"],[""],null],["42",["a"],[""],null],["{}",["a"],[""],null],["wrong-typed field",["a"],[""],null],["throwing accessor record",["a"],[""],null],["throwing callable",["a"],[""],null]]}` | **PASS** — no omission, no per-field distinction, no throw |
| **CN-G-29** | `§2.3` items 4/5 + `§3.1 M-9` + `§0A` note 5 | `sizes`/`specOf` records whose **prototype** carries `b` while the record itself does not; and an `Object.create(null)` record | own-property reads only: `'b'` resolves `undefined` (⇒ `''`), `'a'` resolves normally | `{"keys":["a","b"],"a":"0px","b":"","prototypeEntryIgnoredForB":true,"nullProtoRecordA":"0px"}` | **PASS** |
| **CN-G-30** | `§2.3` items 4/5 + `§3.1 M-8` + `§3.1 M-10` | callable `sizes` capturing `(zoneId, census)` and callable `specOf`, two revealed zones | **exactly one call per revealed zone**; the census argument is the caller's own object **by identity** | `{"values":["7px","7px"],"sizeCallCount":2,"sizeArgsFirstId":"a","censusPassedByIdentity":true,"specCallCount":2,"specArgs":["a","b"]}` | **PASS** |
| **CN-G-31** | `§2.3` item 6 + `§3.1 M-5` + `§2.4 C-A` | three zones: 1 revealed+full, 2 declined, 3 revealed with BOTH lookups missing | all **three keys**; lookups and census reads for zones 1 and 3 **only**; `revealed` once per enumerated zone | `{"keys":["a","b","c"],"values":["SENTINEL-E","",""],"revealedCalls":["a","b","c"],"sizeLookupCalls":["a","c"],"specLookupCalls":["a","c"],"censusReads":["a","c"]}` | **PASS** |
| **CN-G-32** | `§3.1 M-1` + `§2.1` + `§0A` note 7 | the `M-1` drive verbatim, plus a sentinel variant `{a:0}` | `{'a':'0px'}`; null-prototype; exactly one key | `{"record":{"a":"0px"},"keys":["a"],"protoNull":true,"delegateSaysEmpty":false,"emptyCensusVariant":"0px"}` | **PASS** — with the note that `M-1`'s expected `'0px'` **coincides** with its own `emptyToken`, so the delegate's limb is separately confirmed by `delegateSaysEmpty:false` |
| **CN-G-33** | `§3.1 M-13` + `§2.4 C-A` (e) + `§3.3 I-10` + `§0A` note 7 | `zones = ['__proto__']` with own `'__proto__'` entries in the census, `sizes` and `specOf` (via `Object.defineProperty`) | `Object.hasOwn(record,'__proto__')`, the delegate's token, null prototype, `Object.prototype` untouched | `{"keys":["__proto__"],"hasOwnProto":true,"value":"7px","protoNull":true,"objectPrototypeUntouched":true}` | **PASS** |
| **CN-G-34** | `§3.1 M-14` + `§2.4 C-B` (i) + `§3.3 I-7` | the `M-1` call driven twice with a **different** census in between | equal by value, same key order, both null-prototype; no state carried | `{"r1":{"a":"0px"},"r2":{"a":"0px"},"otherValue":"S","equalByValue":true,"sameKeyOrder":true,"bothNullProto":true}` | **PASS** |
| **CN-G-35** | `§3.2 F-5` + `§2.3` item 2 + `§2.4 C-B` + `§3.3 I-4` | 10 unusable/hostile censuses (`null`, `undefined`, `42`, `[0]`, a `Set`, a function, a revoked `Proxy`, a throwing own accessor, a throwing-trap `Proxy`, a `Map` whose `get` throws) with **a valid size 40 present** | the row's own words: *"every revealed zone yields **the `emptyToken`** (because `isEmpty` answered `false`)"* | `{"attempts":10,"bad":[["null","40px",null],["undefined","40px",null],["42","40px",null],["array [0]","40px",null],["Set","40px",null],["function","40px",null],["revoked Proxy","40px",null],["throwing record accessor","40px",null],["throwing-trap Proxy","40px",null],["Map with throwing get","40px",null]],…}` | **FAIL — §7.2** (doc/spec drift) |
| **CN-G-36** | `§3.2 F-6` + `§0A` note 3 + `§2.3` items 1/2 | `zones = [42]` with a record census owning `'42' = 0`; and `new Map([[42,0]])` | the row's own words: the key is `'42'` and *"its value is **the `emptyToken`** — because `isEmpty(census, 42)` is `false`"* | `{"arrayKeys":["42"],"arrayValue":"40px","mapKeys":["42"],"mapValue":"40px","delegateSaysEmptyForNumber":false,"lookupArgs":[["specOf",42,"number"],["sizes",42,"number"]],"numZonesValue":"40px",…}` | **FAIL — §7.3** (doc/spec drift) |
| **CN-G-37** | `§3.3 I-1` + `§2.1` (TOTAL) + `§3.3 I-9` | 13 hostile drives (empty args, revoked `Proxy`, hostile `Symbol.iterator`, throwing iterator, `BigInt` size, `Symbol` member, frozen everything, `Map`/`Set`, `Date`/function/array census, throwing `sizes`/`specOf`/`revealed`) | a **record** for every input; **never a throw**; never `null`/`undefined`/an array/a primitive | `{"attempts":13,"bad":[],"seen":[["empty args","[]",null,true],["null zones","[]",null,true],["throwing sizes + spec + revealed","[]",null,true],["revoked proxy census","[\"a\"]",null,true],…["throwing iterator","[]",null,true]]}` | **PASS** |
| **CN-G-38** | `§3.3 I-2` + `§2.4 C-A` + `§0A` note 11 | `['a','b','c','d']` with `'b'` declined and `'c'`/`'d'` spec-less | the key set is **exactly** the enumerated set: no extra, **no omission** | `{"keys":["a","b","c","d"],"setEqual":true,"extras":[],"omissions":[],"values":[["a","SENTINEL-E"],["b",""],["c","SENTINEL-E"],["d",""]]}` | **PASS** |
| **CN-G-39** | `§3.3 I-3` + `§2.4 C-B` (a)..(i) + `§2.2 P-4` | a full drive with `-0` in the census and a getter in `specOf`: pre/post snapshots (own keys order+content, values by `Object.is`, prototype, `isFrozen`, own descriptors), a **repeat** call, and a **frozen** argument drive | everything observably UNCHANGED; the getter stays a getter; `-0` preserved; the repeat is equal; frozen arguments behave like their unfrozen twins | `{"snapshotsEqual":true,"censusKeys":["a","b"],"censusValues":[0,0],"negZeroPreserved":true,"getterStillGetter":true,"repeatEqual":true,"frozenDrive":{"keys":["a"],"prototypeNull":true},"frozenCensusStillFrozen":true}` | **PASS** |
| **CN-G-40** | `§3.3 I-4` + `§2.1` delegate clause + `§2.3` items 2/6 | three zones over an empty census, a non-empty census and a `unit:''` spec, with the expectation composed **by the row** from `isEmpty`+`trackFor` | every emitted byte is the delegate's, **byte for byte** | `{"actual":["SENTINEL-E","120Q","0"],"composedDirectly":["SENTINEL-E","120Q","0"],"equal":true,"censusNeverReadByUnit":true}` | **PASS** |
| **CN-G-41** | `§3.3 I-5` + `§2.4 C-C` (a)..(g) + `§0A` note 11 | decline-all; reveal-one; a drive where the **sizes** differ; one where the **specs** differ; `revealed = true` (a boolean, not a predicate); a truthy predicate with an empty census | nothing is emitted without a truthy predicate return; size/spec/census shape never makes a zone visible; a non-callable `revealed` yields `{}` | `{"cases":[["decline-all",["a","b"],""],["one",["a","b"],["SENTINEL-E",""]],["sizes differ, predicate false",["a","b"],["",""]],["spec differs, predicate false",["a","b"],["",""]],["revealed = true (a boolean, not a predicate)",[],null],["census empty, predicate true",["a"],"SENTINEL-E"]]}` | **PASS** |
| **CN-G-42** | `§3.3 I-7` + `§2.2 P-4`/`P-6` | the same drive twice, then again with **six throwing getters** installed on `globalThis` (`document`, `window`, `matchMedia`, `getComputedStyle`, `requestAnimationFrame`, `innerWidth`), then restored | identical results; a **direct** ambient read of those names is falsified | `{"baseline":["40px","40px"],"deterministic":true,"withHostileGlobals":{"keys":["a"],"value":"40px","equalToBaseline":true},"statedLimit":"the aliased/computed realm route … is R-4 (NOT-BLIND-RUNNABLE); this probe falsifies only a direct ambient read of the six named globals"}` | **PASS with a stated limit** — **the aliased/computed realm route stays `R-4` and is `NOT-BLIND-RUNNABLE`** |
| **CN-G-43** | `§3.3 I-9` + `§0A` note 8 + `§4.4 S-5` | a normal drive and a non-enumerable `zones` | one record, no `code`/`ok`/`reason`/`skipped`/`status`/`errors` field; the empty input is a **plain record** `{}`, not a refusal | `{"normalKeys":["a"],"normalValue":"SENTINEL-E","emptyInputValue":"{}","emptyIsPlainRecord":true,"refusalFieldPresence":[["code",false],["ok",false],["reason",false],["skipped",false],["status",false],["errors",false]]}` | **PASS** |
| **CN-G-44** | `§3.3 I-10` + `§0A` note 7 | `['__proto__','constructor','toString']` over an empty census | null prototype; **every** id an own key; `Object.prototype` unchanged | `{"protoNull":true,"keys":["__proto__","constructor","toString"],"allOwn":[["__proto__",true],["constructor",true],["toString",true]],"objectPrototypeKeysUnchanged":true}` | **PASS** |
| **CN-G-45** | `§3.3 I-6` + `§2.2 P-1`/`P-2`/`P-3` + `§3.4 R-3` | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"I-6 is a claim about the module SOURCE TEXT … Recorded observation, not the row and NOT a pass: every emitted string observed in this run was either the delegate's return or the single literal "" on a declined key (CN-G-2, CN-G-4, CN-G-11).","recordedObservation":{"emittedStringsAreDelegateOrEmptyString":true,"moduleSourceRead":false}}` | **NOT-BLIND-RUNNABLE** — **not scored as a pass** |
| **CN-G-46** | `§3.3 I-8` + `§2.5` + `§3.4 R-6` + `§5.2` | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"I-8 is a prohibition over the unit's rows, its files and any pass reporting a green — a prose/source claim of R-6's class. Recorded observation, not the row and NOT a pass: every observable this run asserted is a string, a key list or a call log; no geometry API was called by any drive in this runner.","recordedObservation":{"observablesAreStringsKeyListsOrCallLogs":true,"geometryApisUsed":[]}}` | **NOT-BLIND-RUNNABLE** |

### 4.3 The per-zone-throw conflict — 1 row, FAIL

| Id | Doc clause (row) | Scenario (exact drive) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **CN-G-47** | `§5.5.1 P-CN-IM-4` **drive (10)** + `§2.3` item 6 + `§2.4 C-A` — **against** `§3.2 F-2` (d) | three zones where the predicate **throws only for `'b'`**, with a counting duck-typed census | drive (10)'s own words: *"the throwing zone costs `0` delegate calls and the other two cost `1` each"* ⇒ `isEmpty` 2, `trackFor` 2, and **all three keys** | `{"keys":[],"revealedCalls":["a","b"],"censusReads":["a"],"P_CN_IM_4_drive10_expects":{"isEmpty":2,"trackFor":2,"keys":["a","b","c"]},"observed":{"isEmpty":1,"keys":0}}` | **FAIL — §7.4** (a drift **between two documented clauses**; the module matches `F-2` (d)) |

### 4.4 `§2.1` surface, `§3.4 R-1`..`R-10`, `§3.5 R-11`..`R-13`, the delegate surface — 17 rows (6 PASS / 11 NBR)

| Id | Doc clause (row) | Scenario (exact drive / probe) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **CN-G-48** | `§2.1` + `§3.4 R-2` (a) runtime / (b) arity + `§4.4 S-3` | the imported namespace's own keys; `computeTrackVars.length`; a positive control carrying a second value export | the value export set is **exactly** `{computeTrackVars}` **by set equality**; arity **5**; the control fails | `{"valueNames":["computeTrackVars"],"expectedValueNames":["computeTrackVars"],"setEqual":true,"arity":5,"expectedArity":5,"positiveControl":false,"docLevelAliasesPresentAsRuntimeKeys":[["SizeLookup",false],["SpecLookup",false]]}` | **PASS** |
| **CN-G-49** | `§2.1` (the two `DOC-LEVEL ALIASES`) + `§3.4 R-2` (a) | `Object.hasOwn(namespace,'SizeLookup'/'SpecLookup')` | both **absent** from the surface | `{"SizeLookupOnNamespace":false,"SpecLookupOnNamespace":false,"namespaceKeys":["computeTrackVars"]}` | **PASS** |
| **CN-G-50** | `§3.4 R-2` (a) **type half** + `§5.2` leg 4 | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"ZoneId and TrackVars are type-only declarations, erased at runtime … needs the module's declarations (a source read) or §5.2 leg 4 … NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-51** | `§3.4 R-1` + `§1` item 3 + `§3.3 I-4` | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-1 is a SOURCE scan: the import statement and its two named bindings, plus the absence of a duplicated token limb … Weak behavioural corroboration, NOT the row: every emitted byte equalled the row's own direct isEmpty+trackFor composition (CN-G-40), and the delegate can be replaced wholesale in this harness.","recordedObservation":{"byteIdentityWithDelegateComposition":true,"delegateIsReplaceable":true}}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-52** | `§3.4 R-3` + `§2.2 P-1`/`P-2` + `§3.3 I-6` | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-3 reads the WHOLE module file (comments included), over a normalized view, with its own controlled corpora … NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-53** | `§3.4 R-4` + `§2.2 P-4`/`P-6` + `§3.3 I-7` | **not driven**; a weak runtime corroboration recorded | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-4 asserts the absence of a realm-rooted access … A runtime observation cannot distinguish “never reads document” from “would read it on a path this drive did not take” … Weak corroboration recorded in CN-G-42 … strictly weaker than the row."}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-54** | `§3.4 R-5` + `§1` items 4/5/10 | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-5 is a source scan for projection/applier, gutter/relocate/container/theme/session/list-host/slot-host and mount-cardinality vocabulary or imports in this unit's own file. Requires reading the module. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-55** | `§3.4 R-6` + `§2.5` + `§3.3 I-8` + `§5.2` | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-6 is a three-part text scan … Both files are forbidden reads for this blind pass. NOT RECORDED AS A PASS; and no rendered-geometry claim is made anywhere in this runner."}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-56** | `§3.4 R-7` + `§2.2 P-5`/`P-6` + `§0` ruling 8 | **not driven**; one `git diff` observation recorded | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-7 is a repo-wide NAME-COMPLETE census in src/main/** … plus a shim no-change claim — source reads this blind pass may not take. NOT RECORDED AS A PASS.","recordedObservation":{"domShimInRecentRange":"(no path — shim untouched in the recent range)"}}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-57** | `§3.4 R-8` + `§5.1` (allow-list, DENIED set, commit-range scope rule) | the union of the commits whose subject mentions `U-CENSUS`, each `git show --name-only`, against `§5.1`'s allow-list and DENIED set | the unit's own committed range ⊆ the allow-list and ∩ DENIED = ∅; the canonical artifacts non-vacuously present | `{"unitCommits":["71b69b4","1c074b8","dc0c24c","e53a383"],"touchedFiles":["docs/specs/census.md","src/shared/census.ts","tests/census.test.ts"],"deniedPathsTouched":[],"outsideAllowList":[],"canonicalArtifactsPresent":true}` | **PASS** — this is a `git` probe, so the row **is** blind-runnable; its import companion claim is **not** (see `CN-G-63`) |
| **CN-G-58** | `§3.4 R-9` + `§2.4 C-B` + `§3.3 I-3` | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-9 asserts the ABSENCE OF A WRITE SITE in the module source … The OBSERVABLE half is scored: CN-G-39."}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-59** | `§3.4 R-10` (GREEN form) + `§0A` note 1 + `§5.1` row 1 | `fs` probes of the two canonical paths and a recursive `readdirSync` of `src/**` + `tests/**` for any other `census*` path, **excluding this pass's own temp runners** | the module EXISTS; the unit-owned change set is **exactly** the module + the unit's test file; non-vacuous | `{"moduleExists":true,"testFileExists":true,"censusPathsInSrcAndTests":["src/shared/census.ts","tests/census.test.ts"],"exactUnitOwnedSet":true,"nonVacuous":true,"scopeRule":"this probe excludes *this blind pass's own* tests/blind-census-*.tmp.test.ts runners …"}` | **PASS** |
| **CN-G-60** | `§3.4 R-10` (RED form) + `§4.1` + RCA-1 | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"The red form asserts that AT THE MOMENT THE RED SET WAS AUTHORED AND RUN src/shared/census.ts did NOT exist — a claim about one past tree state … neither falsifies nor satisfies the historical claim.","probeObservedNow":{"moduleExists":true,"testFileExists":true}}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-61** | `§3.5 R-11` + `§1` item 10 + `§7` item 9 | `fs.existsSync('docs/skills/designing-pages.md')` + a `readdirSync` of `docs/skills` | the file does **not** exist ⇒ the conditional coverage-matrix/demo-page obligation is **not triggered** | `{"pageDesignExists":false,"skillsDir":["process-guardrails.md"],"conditionalObligationTriggered":false}` | **PASS** — a probe at this tree state only |
| **CN-G-62** | `§3.5 R-12` + `docs/specs/zones.md` `§2.1` delegate clause | the predecessor's imported namespace keys and their `typeof` | **exactly** the runtime values `isEmpty` and `trackFor`, both callable | `{"zonesRuntimeValueKeys":["isEmpty","trackFor"],"zonesNamespaceKeys":["isEmpty","trackFor"],"setEqual":true,"bothCallable":true,"importHalf":"NOT VERIFIED — 'src/shared/zones.ts imports nothing' is an import-declaration claim (source-semantic, NBR half of the same row)"}` | **PASS on the runtime surface**; the **"imports nothing" half is NOT verified** |
| **CN-G-63** | `§3.5 R-13` + `§3.4 R-8` companion + `§7` item 2 | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"R-13 asserts that at the red-run instant src/shared/census.ts was imported by NO file under src/** — a source search over src/** asserted non-vacuously. This blind pass may neither read src/** nor search it for the specifier. NOT RECORDED AS A PASS."}` | **NOT-BLIND-RUNNABLE** |
| **CN-G-64** | `§2.1` delegate clause + `§8` (the delegate surface) | four `isEmpty` drives and four `trackFor` drives over every documented limb family | `isEmpty(census, zoneId) → boolean` (a bare boolean, no wrapper) and `trackFor(spec, size, empty) → string` (a **complete** token) | `{"isEmptyReturnTypes":["boolean","boolean","boolean","boolean"],"isEmptyValues":[true,false,false,true],"trackForReturnTypes":["string","string","string","string"],"trackForValues":["120px","SENTINEL-E","","2"],"noWrapperObject":true}` | **PASS** — the delegate needs **no** post-processing |

### 4.5 The uncoercible zone member — 1 row, FAIL (the behaviour under review)

| Id | Doc clause (row) | Scenario (exact drive) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **CN-G-73** | `§2.3` item 1 (iv)/(v) + `§2.4 C-A` (**the single `Symbol` exception**) + `§3.3 I-2` + `§5.5.1 P-CN-TP-1` pool member **30** + `§4.4 S-9` | three members driven **as members** of a one-element array: an object whose own `Symbol.toPrimitive` **throws**; an object whose `toString` **throws**; a `Symbol('s')` — with caller-lookup spies | `C-A`: one enumerated member ⇒ **exactly one own key** (its `String()` image), the **single** stated exception being the `Symbol` member | `{"asAMemberOfAnArray_uncoercible":{"keys":[],"symbolKeys":[],"values":[],"lookupCalls":[["specOf","object","{}"],["sizes","object","{}"]],"gatePassedAndWrittenAsAnObjectKey":true},"asAMemberOfAnArray_throwingToString":{"keys":[],"symbolKeys":[],"values":[],"lookupCalls":[["specOf","object","{}"],["sizes","object","{}"]],"gatePassedAndWrittenAsAnObjectKey":true},"asAMemberOfAnArray_symbol":{"keys":[],"symbolKeys":[],"values":[],"lookupCalls":[],"gatePassedAndWrittenAsAnObjectKey":false}}` | **FAIL — §7.5** (the under-review module behaviour; **corroborated by the unit's own red row `CO-1`**) |

### 4.6 `§5.5.1` register rows — 8 rows (7 PASS / 1 FAIL); the full reconciliation is §5

| Id | Doc clause (row) | Scenario | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **CN-G-65** | `§5.5.1 P-CN-IM-1` (`S-CN-KEYSET-1`) | `17` predicate variants × `4` census shapes = **`68`** calls | the record's own enumerable string-key set is **exactly** the enumerated set; every declined zone is `''`; every revealed zone is the delegate's string; null prototype | `{"attempts":68,"declared":68,"held":68,"broken":[],"brokenCount":0,"keySetIsExactlyZonesAndDeclinedZonesCarryEmptyString":true,"marking":"YES (bounded …)"}` | **PASS (bounded)** |
| **CN-G-66** | `§5.5.1 P-CN-IM-2` (`S-CN-REVEAL-1`) | `3` decisions × `4` census states × `3` missingness configurations = **`36`** calls | presence is the caller's; no zone emitted on the strength of its census/size/spec; the emitted value is byte-identical to the delegate's | `{"attempts":36,"declared":36,"held":36,"broken":[],"heldAgainst":"the DELEGATE-GOVERNING expectation (v2 declined ⇒ key with ''; v3 absent ⇒ {}; v1 ⇒ trackFor(spec,size,isEmpty))","cellTextDeviations":[{"cell":["v1 ()=>true","c1 {a:0}","m2 both missing"],"cellTextSays":"SENTINEL-E","observed":""},…4 cells…],"declinedZone":{"keys":["a"],"value":"","censusReads":[]},…}` | **PASS (bounded)** — with **4 cell-text deviations** recorded as ambiguity `O-4` and the `v2`/`v3` conflict as `O-3` |
| **CN-G-67** | `§5.5.1 P-CN-IM-3` (`S-CN-PURITY-1`) | `3` caller objects × `2` access patterns × `2` twin forms = `12`, **+ `12` repeats** = **`24`** calls | pre/post snapshots deep-equal; frozen twin behaves as its unfrozen twin; the repeat returns an equal record | `{"attempts":24,"declared":24,"held":24,"broken":[],"perAttemptAsserts":"pre/post snapshot deep-equality (own keys order+content, values by Object.is incl. -0/NaN, prototype, isFrozen, own descriptors, Map size+entries) and the repeat call's record deep-equality","marking":"YES (bounded)"}` | **PASS (bounded)** |
| **CN-G-68** | `§5.5.1 P-CN-IM-4` (`S-CN-DELEGATE-1`) | the `8` argument-shape + the `3` argument-fidelity drives (**11 of the declared 14**; drives 9/10/11 run under the mock, §4.7) | every token byte from `trackFor`, every emptiness decision from `isEmpty`; `isEmpty(census, zoneId)` **census-first and the member VERBATIM**; the count per `§2.3` item 6 | `{"attemptsHere":11,"declared":14,"drivesRunHere":11,"held":11,"broken":[],"seen":[["(1) empty census, size+spec present",["SENTINEL-E"],["SENTINEL-E"],null],… ["(12) number member reaches the delegate verbatim",["40px"],["40px"],null],["(13) sizes receives the census by IDENTITY",["SENTINEL-E"],["SENTINEL-E"],null],["(14) records vs callables over the same data",["SENTINEL-E","40px"],["SENTINEL-E","40px"],"{\"asRecords\":…,\"asCallables\":…,\"equal\":true}"]]}` | **PASS (bounded)** on the 11 drives run here |
| **CN-G-69** | `§5.5.1 P-CN-SM-1` (`S-CN-TOTAL-1`) | `10` hostile shape classes × `3` passes = **`30`** calls | a record, no throw, not `null`/an array/a primitive, null prototype, and a second immediate call equal | `{"attempts":30,"declared":30,"held":30,"broken":[],"perAttemptAsserts":"no throw; typeof object, not null, not an array; prototype null; a second immediate call returns an equal record","marking":"YES"}` | **PASS** |
| **CN-G-70** | `§5.5.1 P-CN-SM-2` (`S-CN-SHAPE-1`) | the `10` zone-enumeration shapes, one drive each, with **the expected `Object.keys` list deep-equal IN ORDER** | shape (3) `['a',1,1]` ⇒ **`['a','1']`** in that order | `{"attempts":10,"declared":10,"held":9,"broken":[{"label":"(3) [a,1,1]","keys":["1","a"],"expectedKeys":["a","1"],"values":["40px","SENTINEL-E"],"expectedValues":["SENTINEL-E","40px"]}],"seen":[… all 10 shapes …],"lastOccurrenceCheck":{"keys":["a","b"],"a":"5px","sizeLookupCallsForA":1,"expected":"a Map CANNOT carry a duplicate key … the ARRAY-duplicate case … is M-7/CN-G-20 (observed there: 2 lookups, value 9px)"},"marking":"YES"}` | **FAIL — §7.1** (same root as `CN-G-22`: the documented ordered key list is unachievable for the integer-like key `'1'`) |
| **CN-G-71** | `§5.5.1 P-CN-SM-3` (`S-CN-EMPTY-1`) | `10` empty-input shapes × `3` passes = **`30`** calls (**`10` distinct drives**) | `Object.keys === []`; null prototype; no throw; **0** `isEmpty` calls; `record !== undefined`; `'x' in record === false` | `{"attempts":30,"declared":30,"distinctDrives":10,"held":30,"broken":[],"perAttemptAsserts":"Object.keys === []; prototype null; no throw; isEmpty 0 times (a counting duck-typed census); record !== undefined; \"x\" in record === false","marking":"YES"}` | **PASS** |
| **CN-G-72** | `§5.5.1 P-CN-TP-1` (`S-CN-SEED-1`) | **`36`** pinned-seed draws (`state₀ = 20260927`, one LCG step per draw, `index = state mod 30`) over the `30`-member pool, driven in the row's own drive scope | per draw: a record, no throw, null prototype, the member's declared key outcome, and (where the member IS enumerated) its value carried **verbatim** | `{"attempts":36,"declared":36,"held":36,"broken":[],"seed":20260927,"drawIndices":[26,25,6,15,0,9,18,23,10,11,6,5,26,29,2,3,12,9,12,25,26,23,26,21,10,25,4,21,26,13,26,21,6,21,8,1],"distinctMembersDrawn":20,"repetitionCount":16,"undrawn1BasedPoolNumbers":[8,15,17,18,20,21,23,25,28,29],"allThirtyDrawnClaim":false,…}` | **PASS (bounded)** — **`20` of `30` distinct members drawn, NOT "all 30"** |

### 4.7 The delegate-count rows under a wholesale delegate mock — 3 rows, all PASS

| Id | Doc clause (row) | Scenario (exact drive) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **CN-G-74** | `§5.5.1 P-CN-IM-4` drives **(9)/(10)/(11)** + `§2.3` item 6 | the delegate replaced wholesale (`trackFor` → `'MOCK-TOKEN'`), so every call and tuple is logged | (9) `isEmpty` 3 / `trackFor` 3; (10) the row's text; (11) `revealed` absent ⇒ both **0** | `{"drive9":{"isEmpty":3,"trackFor":3,"expected":{"isEmpty":3,"trackFor":3},"record":{"a":"MOCK-TOKEN","b":"MOCK-TOKEN","c":"MOCK-TOKEN"}},"drive10_perZoneThrow":{"observed":{"isEmpty":1,"trackFor":1,"keys":[]},"rowTextExpects":{"throwingZone":0,"otherTwoEach":1,"keys":["a","b","c"]},"calls":[["isEmpty","a"],["trackFor",40,false]]},"drive11_absent":{"isEmpty":0,"trackFor":0,"keys":[]}}` | **PASS on (9) and (11)** — **drive (10)'s mismatch is `CN-G-47`'s FAIL**, counted once |
| **CN-G-75** | `§2.3` item 6 + `§3.1 M-4`/`M-5` + `§2.4 C-A`/`C-C` | a mixed three-zone call; a **declined** single zone; `revealed` absent — all with the delegate mocked | `M-5`: `isEmpty` **exactly 2**, `trackFor` **exactly 2**, all three keys; a declined zone: `{}` **zero** delegate calls with its key present and `''` | `{"mixed":{"keys":["a","b","c"],"values":{"a":"MOCK-TOKEN","b":"","c":"MOCK-TOKEN"},"calls":[["isEmpty","a"],["trackFor",40,false],["isEmpty","c"],["trackFor",null,false]]},"declinedZone":{"keys":["a"],"value":"","calls":[],"rulingAndM4Expect":{"isEmpty":0,"trackFor":0,"value":""},"P_CN_IM_2_corrected_v2_clauseClaims":{"isEmpty":0,"trackFor":1,"value":""},"resolvedByObservation":"the module makes ZERO delegate calls for a declined zone (M-4/§2.3 item 6/ruling note 11), NOT the corrected P-CN-IM-2 v2 clause's one trackFor call"},"revealedAbsent":{"keys":[],"calls":[]}}` | **PASS** — and it **decides ambiguity `O-3` observably**, in favour of `M-4`/`§2.3` item 6/ruling note 11 |
| **CN-G-76** | `§2.1` delegate clause + `§3.3 I-4` + `§3.4 R-1` (the **"nothing else"** half) | the mocked delegate records **which of its names** the module takes | only `isEmpty` and `trackFor` are ever taken from the delegate; the module's own namespace is exactly `{computeTrackVars}` | `{"delegateFunctionsTaken":["isEmpty","trackFor"],"expected":["isEmpty","trackFor"],"callTuples":[["isEmpty","a"],["trackFor",40,false],["isEmpty","b"],["trackFor",null,false]],"moduleNamespaceKeys":["computeTrackVars"]}` | **PASS** — this is the **runtime** half of the delegated-surface claim, and it is strong (a module taking anything else from the delegate would show it) |

---

## 5. Register coverage — each of the 8 rows exercised INDEPENDENTLY, observed vs stated

**This is this run's own execution of the register's property text** (`§5.5.1`), driven from the spec's
own cells — **not** a re-run of the unit's own file (which was never read). Every attempt count below is
what **this run measured**, against the count the register **states**.

| Register row | Type · stated marking | Register's stated statement (abridged to its own words) | Strategy id (stated) | Register's stated attempts | This run's drive | **Observed (this run)** | Result vs statement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **`P-CN-IM-1`** | `P-IM` · **`YES (bounded)`** | *for EVERY (reveal-predicate variant × census shape) pair in the `17 × 4` table* the record's key set is **exactly** the enumerated zone set — no extra key, no omission — **every non-revealed zone's value is exactly `''`**, every revealed zone's value is the delegate's string, and the record is null-prototype in first-seen order | `S-CN-KEYSET-1` | **`68`** = `17 × 4` | the same `17` predicate variants (incl. `()=>true`, `()=>false`, `()=>0`, `()=>''`, `()=>NaN`, `()=>1`, the thrower and the spy `id !== 'b'`) × the same `4` census shapes, predicate-major, one call per pair | **`68` driven / `68` held / `0` broken** — `{"attempts":68,"held":68,"broken":[]}` | **HELD (bounded)** — the enumeration's domain matches the cell's `17 × 4`; **the unbounded universal is NOT proven and NOT claimed** |
| **`P-CN-IM-2`** | `P-IM` · **`YES (bounded)`** | *for EVERY entry of the `3 × 4 × 3` fixed table* presence is the CALLER'S decision and never the mechanism's; `undefined`/non-callable/throwing `revealed` yields the empty record with ZERO delegate calls; the returned value for every EMITTED zone is byte-identical to `isEmpty`+`trackFor` | `S-CN-REVEAL-1` | **`36`** = `3 × 4 × 3` | the same `3` decision variants (`()=>true`, `()=>false`, absent) × `4` census states (`{a:0}`, `{a:2}`, `{}`, `Map([['a',0]])`) × `3` missingness configurations (`m1` both present, `m2` both missing, `m3` spec `42` + size present), each with a counting duck-typed census | **`36` driven / `36` held / `0` broken** against the **delegate-governing** expectation — plus **`4` cell-text deviations**, all at `(v1, m2)`: the cell text prints `SENTINEL-E` where the delegate's own **malformed-spec-first** limb (`zones §2.3` item 1 (d)) answers `''`. The declined zone's own drive reads `{"keys":["a"],"value":"","censusReads":[]}` | **HELD (bounded)** — with the `m2` cell text recorded as ambiguity `O-4` and the `v2` delegate-cost clause as `O-3`. **No cell was re-scoped to make it hold** |
| **`P-CN-IM-3`** | `P-IM` · **`YES (bounded)`** | *for EVERY entry of the `3` caller-object × `2` access-pattern × `2` frozen/unfrozen-twin table plus its repeat*, nothing is mutated and nothing is retained: post-call snapshots deep-equal pre-call snapshots, a frozen caller object behaves as its unfrozen twin, a `Map` keeps its `size`/entries, no key/default/sentinel is written, and the same call twice returns an equal record | `S-CN-PURITY-1` | **`24`** = `12 + 12` | the three documented caller objects (a zone enumeration + record census; the same with a `Map` census; a `specOf` frozen record + a `sizes` record with an own accessor) × `2` access patterns (`()=>true`, `revealed` absent) × `2` twin forms (unfrozen, frozen), then the whole `12`-cell matrix re-driven as the `12` repeats | **`24` driven / `24` held / `0` broken** — `{"attempts":24,"held":24,"broken":[]}` | **HELD (bounded)** — **NOT a proof of the "every caller object" universal** |
| **`P-CN-IM-4`** | `P-IM` · **`YES (bounded)`** | *for EVERY entry of the `14`-attempt fixed drive table*: every token byte comes from `trackFor` and every emptiness decision from `isEmpty`; `isEmpty` is called with EXACTLY `(census, zoneId)` (**census FIRST**, the member **VERBATIM**), its boolean reaches `trackFor`'s THIRD argument **UNMODIFIED**, `trackFor` gets `(spec, size, empty)` exactly as the lookups yielded, the returned string is the record's value **byte-identically**, and the counts are the ones `§2.3` item 6 pins | `S-CN-DELEGATE-1` | **`14`** = `8 + 3 + 3` | the `8` argument-shape drives (empty limb, `unit:''` bare number, a caller sentinel `emptyToken`, a full declaration string, `-0` ⇒ `'0'+unit`, a `Map` census with `0`, an absent spec ⇒ `''`, an absent size ⇒ the `emptyToken`) + the `3` argument-fidelity drives (a **number** member reaching both lookups as a number; `sizes` receiving the census **by identity**; records vs callables over the same data) here, **plus** the `3` call-count drives under the mocked delegate (`CN-G-74`): (9) `isEmpty` 3 / `trackFor` 3; (10) the per-zone-throw drive — **observed `isEmpty` 1 / `trackFor` 1 with a `{}` record**; (11) `revealed` absent ⇒ both `0` | **`14` driven / `13` held / `1` broken** — drives `1`–`9`, `11`–`14` hold (`CN-G-68` 11/11; `CN-G-74` (9) and (11)); **drive (10) is BROKEN** and is reported as `CN-G-47` | **HELD on 13 of its 14 drives; ONE DRIVE BROKEN** — the row's drive (10) expectation conflicts with `§3.2 F-2` (d) (`O-5`); **the bounded marking stands, and no id, term or `YES` marking was changed** |
| **`P-CN-SM-1`** | `P-SM` · **`YES`** | *for EVERY entry of the `10`-shape parameter table* (all five parameters driven through their enumerated shape lists) the call **RETURNS A RECORD and NEVER THROWS** — non-`null`, null prototype, never an array/a primitive/`undefined` — including a hostile `Symbol.iterator`, a throwing iterator, throwing lookups, a revoked `Proxy` census, a `Symbol` member and a `BigInt` size | `S-CN-TOTAL-1` | **`30`** = `10 × 3` | the same `10` shape classes × the `3` driving passes (a: everything else well-formed; b: `revealed` absent; c: **every other parameter ALSO hostile**), asserting no throw, the record shape, null prototype, and a second immediate call equal | **`30` driven / `30` held / `0` broken** — `{"attempts":30,"held":30,"broken":[]}` | **HELD** — the statement matches its enumeration |
| **`P-CN-SM-2`** | `P-SM` · **`YES`** | *for EVERY zone-enumeration shape of the `10`-shape table* the members become the declared own keys **IN FIRST-SEEN ORDER** with the declared values: a `Map` contributes its **KEYS**; a `Set`/array/own-iterator object its iteration values; a record its own enumerable **string** keys and never a `Symbol` key nor a prototype member; a non-object **zero** zones; a **duplicate** (including `1` beside `'1'`) **one** key at its first-seen position with the **last** occurrence's value; `'__proto__'`/`'constructor'` ordinary own keys; a `Symbol` member **DROPPED** | `S-CN-SHAPE-1` | **`10`** (one drive per shape) | the same `10` shapes, driven **in order**, asserting `Object.keys` **deep-equals the declared list IN ORDER**, every value against the row's own composition, and null prototype | **`10` driven / `9` held / `1` broken** — the broken cell is **shape (3)** `['a',1,1]`: declared `['a','1']`, observed `{"keys":["1","a"],"values":["40px","SENTINEL-E"]}` | **9 of 10 HELD; shape (3) BROKEN** — the declared **ordered** list is unachievable for the integer-like key `'1'` (`O-1`, same root as `CN-G-22`). **The `Symbol` DROP, the prototype-carrying record, the non-callable-`Symbol.iterator` fallback and the `Map`-keys reading all held** |
| **`P-CN-SM-3`** | `P-SM` · **`YES`** | *for EVERY one of the `10` enumeration shapes* the empty-input outcomes are the declared ones — a zero-member or non-enumerable input yields the empty record (never `undefined`, never a throw, never a key), the record's prototype is `null` and `Object.keys` is `[]` | `S-CN-EMPTY-1` | **`30`** = `10 × 3` (**Distinct drives `10`**) | the same `10` empty shapes (`[]`, `new Map()`, `new Set()`, `{}`, `Object.create(null)`, `null`, `undefined`, a number, a function with no `Symbol.iterator`, a record whose own `Symbol.iterator` yields nothing) × the `3` passes (`()=>true`, `()=>false`, absent), with a counting duck-typed census | **`30` driven / `30` held / `0` broken** — `{"attempts":30,"distinctDrives":10,"held":30,"broken":[]}` | **HELD** — the three "nothing to emit" causes return the **same** empty record shape; **a declined zone is NOT merged with this row** |
| **`P-CN-TP-1`** | `P-TP` · **`YES (bounded)`** | *for EVERY zone member drawn from the pinned `30`-member pool under the pinned seed* the call is **TOTAL** and the declared own-key outcome holds: the record carries the member's `String()` image as an own key (or, for the `Symbol` member, DROPS it), never throws, and the member's own VALUE is carried **VERBATIM** to the caller's lookups and to `isEmpty`'s second argument — the falsifiable claim being: for EVERY member the call is TOTAL and the **key set equals the set of zones the member itself enumerates** | `S-CN-SEED-1` | **`36`** draws | the same hand-rolled LCG (`state₀ = 20260927`, **one step per draw**, `index = stateₙ₊₁ mod 30`) over the same `30` members, each draw driving the drawn member **as the sole member** by the row's own **DRIVE SCOPE** (members `22`/`25`/`26` wrapped in a one-element array; every other member passed **directly** as `zones`), asserting no throw, null prototype, the declared key outcome, and per-draw verbatim identity where the member IS enumerated | **`36` driven / `36` held / `0` broken** — `{"attempts":36,"held":36,"broken":[],"distinctMembersDrawn":20,"repetitionCount":16,"undrawn1BasedPoolNumbers":[8,15,17,18,20,21,23,25,28,29],"allThirtyDrawnClaim":false}`, with `drawIndices` reported in full | **HELD (bounded)** — and the honest figure the spec deliberately did **not** assert is now measured: **`20` of `30` distinct members were drawn; `16` of the `36` draws were repetitions; `10` members were NEVER drawn.** **A draw is not a sweep: no "all 30 drawn" claim is made** |
| **TOTAL** | **`4` `P-IM` + `2` `P-SM` + `2` `P-TP` = 8 rows** | — | — | **`248`** = **`68+36+24+14+30+10+30+36`** | — | **`248` driven / `247` held / `1` broken** (the `P-CN-IM-4` drive-(10) cell, reported as `CN-G-47`); stop-after-5 **NOT triggered** (no row accumulated five consecutive failures — `P-CN-SM-2` broke on its third of ten drives and held for the rest) | the register's own arithmetic is reproduced **term by term**, inside the `≤100`/row and `≤400` total caps |

**Register arithmetic reconciliation, printed with its terms** (the ACTIVE rule
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`): **`248` = `68` + `36` + `24` + `14` + `30` + `10` + `30` +
`36`** — re-added by this run, term by term, and **equal** to the spec's declared total; **no term
moved**. **Declared vs distinct-drive figures, reported BESIDE each other and never substituted:**
`P-CN-TP-1` declares **`36` draws** whose **distinct-member** count is **`20`** of `30`;
`P-CN-SM-3` declares **`30`** whose **distinct-drive** count is **`10`** (`10` shapes × `3` passes =
`3` assertions over one drive each — the spec's own `§5.3` item 11 distinction, reproduced here).
**Caps:** the total `248 ≤ 400`; the per-row maximum is `68` (`P-CN-IM-1`) `≤ 100`. **The five bounded
rows are bounded here too and this file says so plainly:** `P-CN-IM-1` enumerates `17 × 4` pairs (not
"every predicate variant"), `P-CN-IM-2` `36` cells, `P-CN-IM-3` `3` caller objects, `P-CN-IM-4` `14`
drives, `P-CN-TP-1` `36` draws over `30` members — **none of the five is a proof of its unbounded
universal, and no reader may read this section as one** (`§5.5.1`'s honesty items 1/2/5).

**Register counting discipline, as this run followed it:** one attempt = **one exercised drive** — one
`computeTrackVars` call on one (predicate × census) pair (`P-CN-IM-1`), one call on one (decision × census
× missingness) cell (`P-CN-IM-2`), one call on one (object × pattern × twin) cell or its repeat
(`P-CN-IM-3`), one call in the fixed drive table (`P-CN-IM-4`), one call on one (shape × pass) cell
(`P-CN-SM-1`, `P-CN-SM-3`), one shape driven once (`P-CN-SM-2`), one pinned-seed draw (`P-CN-TP-1`);
**fixture construction is precondition, not attempt.**

**The register's pool-versus-boundary rule was re-applied member-for-member as I drove each row**, and
**two member-level outcomes did not match their row's own text** — both are recorded (§7.1, §7.5) and
**neither was resolved by editing anything**: `P-CN-SM-2` shape (3)'s **declared ordered key list** and
`P-CN-TP-1` member **30**'s "sole key".

---

## 6. NOT-BLIND-RUNNABLE record — **12 rows**

**These twelve rows are reported as `NOT-BLIND-RUNNABLE`, never as passes.**

| Id | Row | Why no blind drive exists | What a blind run CAN substitute (and did) |
| --- | --- | --- | --- |
| **CN-G-45** | `§3.3 I-6` — no consumer vocabulary / no CSS / no token value / no default / no union member | A claim about the module's **source text and comments**; the corpora live in the unit's red set, also forbidden | **only a recorded observation**: every emitted string this run saw was either the delegate's return or the single literal `''` on a declined key. **That is not the row** |
| **CN-G-46** | `§3.3 I-8` — no row asserts rendered geometry, no green is reported as one | A prohibition over **rows, files and prose** (`R-6`'s class) | **only a recorded observation** (`observablesAreStringKeyListsOrCallLogs: true`, no geometry API called). **That is not the row** |
| **CN-G-50** | `§3.4 R-2` (a) **type half** — `ZoneId`/`TrackVars` are exported | A type-only claim: an imported type name is **erased at runtime**; the runtime namespace carries `computeTrackVars` only | **the runtime half was driven** (`CN-G-48`, `CN-G-49`, with a positive control); the type half is owed to **`§5.2` leg 4** |
| **CN-G-51** | `§3.4 R-1` — the import statement and no second copy of the token arithmetic, with controls | A **source scan** (import declaration + comment-stripped code), both halves requiring a read of the module | **a weak behavioural corroboration**: byte-identity of every value with the row's own `isEmpty`+`trackFor` composition (`CN-G-40`) and the delegation-count rows under a wholesale mock (`CN-G-74`, `CN-G-76`). **Strictly weaker than the row** |
| **CN-G-52** | `§3.4 R-3` — the normalized vocabulary/literal scan of the module (comments included) | The observable is the **module's source text** | **nothing** — a runtime substitute cannot prove the absence of a word in a comment or an unused literal |
| **CN-G-53** | `§3.4 R-4` — no banned realm token or alias, no ambient read for a value, zero module-level state | Source-semantic; a runtime observation cannot distinguish "never reads `document`" from "would read it on a path not taken" | **a weak corroboration** (`CN-G-42`): six ambient globals installed as **throwing getters**, results unchanged. **Not the row, not scored** |
| **CN-G-54** | `§3.4 R-5` — the cross-unit boundary (no `U-PROJ`/`U-GUTTER`/… duplication or import) | A source scan over this unit's own file | **nothing.** That no sibling module is imported is **not** established (the module's import statement is `R-1`'s and is also NBR) |
| **CN-G-55** | `§3.4 R-6` — the geometry scan over the module bytes, the test-file bytes and the extracted row descriptions | Both source files are forbidden reads | **nothing.** This artifact makes no rendered-geometry claim and asserts no `[U]` row, but **a negative stated here is not `R-6`** |
| **CN-G-56** | `§3.4 R-7` — the no-shim / five-seam negative by **name-complete set equality** in `src/main/**` | A repo-wide census of `src/main/**` names — a source read this pass may not take | **one recorded observation**: over the recent range the diff touches **no** `src/shared/dom-shim.ts`. **Not the row** |
| **CN-G-58** | `§3.4 R-9` — the absence of a **write site** in the module source | A source scan; the row's own text says it proves the absence of a write **site**, never of a mutation **behaviour** | **the observable half is scored**: `CN-G-39` (`I-3`/`C-B`, snapshots, frozen twins, repeats) |
| **CN-G-60** | `§3.4 R-10` **RED form** — the module did **not** exist at the red-run instant | A claim about **one past tree state**; no re-run can recover it | **a probe of the current tree only**: `moduleExists: true`, `testFileExists: true` — which neither falsifies nor satisfies the historical claim (`O-8`) |
| **CN-G-63** | `§3.5 R-13` — `src/shared/census.ts` is imported by **no** `src/**` file | A source search over `src/**` asserted non-vacuously; this pass may neither read nor search `src/**` | **nothing.** The `R-8` diff-scope half **was** scored (`CN-G-57`), and **that does not verify this claim** (`O-8`) |

**Three more rows are scored although they are static rows**, because each is a genuine `fs`/`git` probe
whose failure would be meaningful: **`CN-G-57`** (`R-8`, the diff-scope row — the DENIED set is empty for
this unit's range), **`CN-G-59`** (`R-10`'s green form) and **`CN-G-61`** (`R-11`), plus **`CN-G-62`**
(`R-12`'s runtime half). **`CN-G-49`**, **`CN-G-64`**, **`CN-G-65`**..**`CN-G-72`** and the three mocked
rows are likewise genuine runtime drives.

---

## 7. FAIL rows, attribution and reproduction

**Six rows are FAIL.** **Three are doc/spec drift** (`CN-G-22`, `CN-G-35`, `CN-G-36`), **two are a drift
BETWEEN two documented clauses** (`CN-G-47`, `CN-G-70` — the latter sharing `CN-G-22`'s root), and **one
is the module-side behaviour the supervisor flagged as under review** (`CN-G-73`). **No observed value
below is inferred: each is the runner's printed payload, or the printed delegate composition.**

### 7.1 `CN-G-22` (with `CN-G-70` reading the same root) — the documented **key ORDER** is unachievable for integer-like zone ids

**Doc clause cited: `docs/specs/census.md` `§2.5` item 4** — *"`Object.keys(record)` yields the zones in
**first-seen enumeration order**, which is contract text only so a row can assert determinism"* — read
with **`§0A` ruling note 7** (*"the key ORDER is the first-seen order of the zone enumeration (a
duplicate does not move its key)"*, the record being built on **`Object.create(null)`**), with **`§2.3`
item 1 (iii)** (*"the key is written once, at its FIRST-SEEN position"*), and with **`§5.5.1 P-CN-SM-2`**
shape **(3)**, whose declared list is `['a','1']` *"**`Object.keys(record)` deep-equals the expected list
in order**"*.

**Reproduction (exact):**

```ts
computeTrackVars(['2','1','a'], {1:3, 2:3, a:3}, {1:40, 2:40, a:40}, () => true, {1:SPEC, 2:SPEC, a:SPEC})
computeTrackVars(['10','2'],  …, () => true, …)
computeTrackVars(['a', 1, 1], …)          // §5.5.1 P-CN-SM-2 shape (3)
```

**Expected per the clause:** `['2','1','a']` (first-seen) and `['10','2']` (first-seen), and for shape
(3) `['a','1']`. **Observed (verbatim):**
`{"keys":["1","2","a"],"documentedFirstSeen":["2","1","a"],"matchesDocumentedOrder":false,
"twoDigitKeys":["2","10"],"expectedFirstSeenTwoDigit":["10","2"]}` and, for shape (3),
`{"label":"(3) [a,1,1]","keys":["1","a"],"expectedKeys":["a","1"],"values":["40px","SENTINEL-E"]}`.

**Attribution: DOC/SPEC DRIFT — the over-strong order claim, not a module regression.** JavaScript fixes
the order of a plain object's **integer-like own keys**: they are always enumerated **first, in ascending
numeric order**, before the string keys in insertion order (`OrdinaryOwnPropertyKeys`). The spec's own
`§0A` ruling note 7 **requires** the record to be built on `Object.create(null)`, i.e. an ordinary object —
so **"first-seen enumeration order" cannot hold for integer-like ids** while that ruling stands: the
module's observed order is exactly what the language mandates for the required representation. **Two
readings are available and neither is mine to choose in this pass** — either (i) `§2.5` item 4's claim
must be **narrowed** to non-integer-like keys (the reading under which every observation here is correct),
or (ii) `§2.5` item 4 and `§5.5.1 P-CN-SM-2` shape (3)'s declared ordered list are wrong as written. **The
set-equality half of `C-A` is unaffected** — this run measured **set equality in every one of the `68`
`P-CN-IM-1` pairs**, and **`§2.5` item 4's own second sentence says set equality is the BINDING half**;
what fails is the weaker *order* claim, and every row that asserts it **by position** fails with it.
**Nothing was changed for this row and nothing was softened** — the remedy is a documentation edit
(owner: the unit's spec/documentation-review pass).

### 7.2 `CN-G-35` — `§3.2 F-5`'s stated **reason** and its expected value are inconsistent with the delegate's own limbs

**Doc clause cited: `docs/specs/census.md` `§3.2 F-5`** — *"**A census that is unusable or hostile is the
DELEGATE'S answer, not this unit's error** … **no throw**; every revealed zone yields **the `emptyToken`**
(**because** `isEmpty` answered `false` — it is a total function); **the census is unchanged** in every
observable respect"* — read with **`docs/specs/zones.md` `§2.3` item 1**, limb **(a)** *"`Boolean(empty)
=== true` ⇒ `spec.emptyToken`, verbatim"* and limb **(c)** *"otherwise — `size` is a **finite** number and
**not** negative ⇒ `String(size) + spec.unit`"*, plus limb **(b)** (`typeof size !== 'number'` or
non-finite or negative ⇒ the `emptyToken`).

**Reproduction (exact):**

```ts
computeTrackVars(['a'], null,          {a: 40}, () => true, {a: {trackProp:'--t', unit:'px', emptyToken:'SENTINEL-E'}})
computeTrackVars(['a'], [0],           {a: 40}, () => true, {a: SPEC})   // and the other 8 hostile censuses
trackFor({trackProp:'--t', unit:'px', emptyToken:'SENTINEL-E'}, 40, isEmpty(null, 'a'))   // the delegate, composed by the row
```

**Expected per `F-5`:** `'SENTINEL-E'` in all `10` cells. **Observed (verbatim):**
`{"attempts":10,"bad":[["null","40px",null],["undefined","40px",null],["42","40px",null],
["array [0]","40px",null],["Set","40px",null],["function","40px",null],["revoked Proxy","40px",null],
["throwing record accessor","40px",null],["throwing-trap Proxy","40px",null],
["Map with throwing get","40px",null]], … }`, with the delegate composed directly by the row reading
`'40px'`.

**Attribution: DOC/SPEC DRIFT — the row's causal clause inverts the delegate's limb.** `isEmpty`
answering **`false`** means the zone is **NOT empty**, and `zones §2.3` item 1 then takes limb **(c)**
(`String(size)+unit`) for a valid size — so a `false` emptiness **never** yields the `emptyToken`. The
`emptyToken` is reached in this row **only** through limb **(b)**, i.e. **when the size lookup misses or
the size is unusable** — which the row does not state. **The `F-5` reading under which the row's VALUE
claim holds is therefore the size-miss reading, and this run drove it too and recorded it:**
`sizeMissBad` is empty (`r.a === 'SENTINEL-E'` in all `10` cells when `sizes` is `{}`). **The other three
claims of `F-5` all hold** (no throw, the census unchanged, the delegate's answer is the unit's answer).
**The module follows the delegate exactly here and is not at fault**; the drift is in the clause's
parenthetical reason (and in the value expectation it carries when a valid size is present). **No clause
was edited and nothing was softened** — the remedy is a documentation edit (owner: the unit's
spec/documentation-review pass).

### 7.3 `CN-G-36` — `§3.2 F-6`'s expected value contradicts its own row title (same inversion)

**Doc clause cited: `docs/specs/census.md` `§3.2 F-6`** — *"**A NON-STRING zone member is never empty,
whatever the census holds** | `zones = [42]` with a record census owning `'42'` = `0`; and `zones = new
Map([[42, 0]])` | **no throw**; the zone key is `'42'` (the member's `String()` image becomes the own key)
and its value is **the `emptyToken`** — **because `isEmpty(census, 42)` is `false`**"* — read with
**`§0A` ruling note 3** (*"a non-string zone member is **never empty**, whatever the census holds … and
**this unit must not compensate for that**"*) and with **`zones §2.3` item 2 (c)** (a non-string
`zoneId` against a record census ⇒ **`false`**).

**Reproduction (exact):**

```ts
computeTrackVars([42], {42: 0}, {42: 40}, () => true, {42: {trackProp:'--t', unit:'px', emptyToken:'SENTINEL-E'}})
computeTrackVars(new Map([[42, 0]]), {42: 0}, {42: 40}, () => true, {42: SPEC})
isEmpty({42: 0}, 42)   // → false   (the row's own premise)
```

**Expected per `F-6`:** key `'42'`, value `'SENTINEL-E'`. **Observed (verbatim):**
`{"arrayKeys":["42"],"arrayValue":"40px","mapKeys":["42"],"mapValue":"40px",
"delegateSaysEmptyForNumber":false,"lookupArgs":[["specOf",42,"number"],["sizes",42,"number"]],
"numZonesValue":"40px", "delegateAnswersWithAValidSize":"40px",
"sizeMissReading":{"keys":["42"],"value":"SENTINEL-E"}}`.

**Attribution: DOC/SPEC DRIFT — the row's own title and its stated value contradict each other.** The
title says the zone is **never empty**; the expected value is the **empty token** — which is what the
delegate returns for an **empty** zone. With `isEmpty(census, 42) === false` and a valid size `40`, the
delegate's limb **(c)** gives `String(40)+'px' = '40px'`, which is precisely the "never empty" outcome the
title names, and precisely what the module emitted. **The row's premise (`isEmpty` false because the
member is not a string) is CONFIRMED**, its **consequence is inverted**, and its **key claim holds**
(`'42'` is the own key in both drives). As in §7.2, the row's value expectation holds **only** under the
size-miss reading, which this run drove and recorded (`"sizeMissReading":{"keys":["42"],"value":
"SENTINEL-E"}`). **The module follows the delegate and the ruling here and is not at fault. Nothing was
changed and nothing was softened** — the remedy is a documentation edit (owner: the unit's
spec/documentation-review pass).

### 7.4 `CN-G-47` — `§5.5.1 P-CN-IM-4` **drive (10)** conflicts with `§3.2 F-2` (d), and the module matches `F-2` (d)

**Doc clauses cited:** **`§5.5.1 P-CN-IM-4`**, the **`3` call-count drives**: *"(10) three zones where one
predicate throws ⇒ the throwing zone costs `0` delegate calls and the other two cost `1` each"* — read
against **`§2.3` item 6** (*"a zone whose predicate threw costs ZERO delegate calls"*) and, in the other
direction, against **`§3.2 F-2` (d)** with its own annotation: *"`F-2` drives `revealed` that is NOT A
PREDICATE AT ALL (omitted, `undefined`, non-callable, **throwing**), so no zone is ever
enumerated-and-DECLINED in this row: **the whole record is empty** because no decision was supplied"*.

**Reproduction (exact):**

```ts
computeTrackVars(['a','b','c'], {a:0,b:0,c:0}, {a:40,b:40,c:40},
                 (id) => { if (id === 'b') throw new Error('per-zone boom'); return true },
                 {a:SPEC, b:SPEC, c:SPEC})
// and the same drive under the wholesale delegate mock (file D), which logs every call:
//   observed isEmpty = 1, trackFor = 1, calls = [["isEmpty","a"],["trackFor",40,false]]
```

**Expected per drive (10):** `isEmpty` called **`2`** times, `trackFor` **`2`** times, and a record with
**all three keys** (`'a'` emitted, `'b'` the throwing zone at `0` calls, `'c'` emitted). **Observed
(verbatim):** `{"keys":[],"revealedCalls":["a","b"],"censusReads":["a"],
"P_CN_IM_4_drive10_expects":{"isEmpty":2,"trackFor":2,"keys":["a","b","c"]},
"observed":{"isEmpty":1,"keys":0}}` — i.e. **the whole call returns the EMPTY record**, the predicate was
never consulted for `'c'`, and the work already done for `'a'` (one `isEmpty`, one `trackFor`) was
discarded.

**Attribution: DOC/SPEC DRIFT — a conflict BETWEEN two documented clauses (not a module regression).**
`F-2` (d) requires **the empty record** for a throwing predicate, and the module produces exactly that;
`P-CN-IM-4` drive (10) requires the **other two zones to be emitted at one delegate call each**, which is
irreconcilable with an empty record, and the module does not produce it. **The two readings are not
merged by this pass:** one of them must be corrected (`F-2` (d)'s whole-call reading is the one the module
implements, and the one the architect ruling's own boundary note presupposes — *"an ABSENT, non-callable
or throwing `revealed` is the no-decision case, which yields the EMPTY record"*). **This is the same
documented class as ambiguity `O-5`, recorded, never silently resolved**, and the register row's own
result line in §5 reports it as **one broken drive of `14`** rather than a silent pass. **Nothing was
changed and nothing was softened** — the remedy is a documentation edit (owner: the unit's
spec/documentation-review pass).

### 7.5 `CN-G-73` — an **uncoercible** zone member passes the reveal gate and is written under NO key

**Doc clause cited: `docs/specs/census.md` `§2.4 C-A`** — *"Let `E` be the set of zone members the
enumeration of `§2.3` item 1 yields. Then the returned record's own enumerable string-key set equals
`{ String(m) : m ∈ E }` MINUS the `Symbol` members — **no key outside that set ever appears, and no member
inside it is ever omitted**"*, whose **single** exception is **`§2.3` item 1 (iv)** (*"A `Symbol` member is
the one member that CANNOT become an own key … and is therefore DROPPED"*), read with **`§3.3 I-2`**, with
**`§5.5.1 P-CN-TP-1`**'s per-member note (*"the drawn member is the sole key (or the DROP case for member
`24`)"* — member `24` being the `Symbol`), and with **`§4.4 S-9`**.

**Reproduction (exact):**

```ts
const uncoercible = { [Symbol.toPrimitive]() { throw new Error('uncoercible member') } }
computeTrackVars([uncoercible], {a:3}, (id) => 40, () => true, (id) => SPEC)   // the member IS enumerated
```

**Expected per `C-A`:** one enumerated member ⇒ **exactly one own key** (its `String()` image), the
`Symbol` exception aside; and with caller-lookup spies, the member's own value reaching those lookups
**verbatim**. **Observed (verbatim):**
`{"asAMemberOfAnArray_uncoercible":{"keys":[],"symbolKeys":[],"values":[],
"lookupCalls":[["specOf","object","{}"],["sizes","object","{}"]],"gatePassedAndWrittenAsAnObjectKey":true},
"asAMemberOfAnArray_throwingToString":{…same shape…},
"asAMemberOfAnArray_symbol":{"keys":[],"symbolKeys":[],"lookupCalls":[],"gatePassedAndWrittenAsAnObjectKey":false}}`
— i.e. the member **passes the reveal gate** (both caller lookups were called with it, **by identity**),
**nothing throws**, and it is written under **no key at all**: **0 own string keys and 0 own `Symbol`
keys**. The plain `Symbol` member behaves as documented (dropped, and its lookups are **not** called).

**Attribution: the module-side behaviour the SUPERVISOR ALREADY FLAGGED as under review** — an
**uncoercible zone member that passes the reveal gate and is written as an object key**. It is **not a
doc-only finding**: `C-A`'s omission clause is falsified for a member class its stated exception does not
name, and `P-CN-TP-1` member `30` ("an object with an own `Symbol.toPrimitive` that throws", drawn at
**draw 14** of the pinned seed) cannot deliver its declared *"sole key"* outcome. **It is corroborated by
the unit's OWN red row**, which this pass saw **only because it ran the unit's file for a COUNT** (the
disclosure recorded in the header, §7.6 and §10): `tests/census.test.ts`'s **`CO-1`** is **RED at this tree state**, asserting that such a
member *"still costs exactly ONE `isEmpty` and ONE `trackFor` (`§2.3` item 6), and no member AFTER it that
CAN be a key is LOST (`§2.4 C-A`, `§3.3 I-2`)"*, and reporting **`expected 2 to be 4`** observed `isEmpty`
calls. **My drive and that row are independent (mine was authored and run before the text appeared) and
they agree: the class is broken.** **Per the blind rule this pass FIXED NOTHING and changed no clause** —
it is recorded here as an **observation with its reproduction**, and its remedy belongs to the
implementer/test work already in flight. **A second, weaker observation belongs with it:** `§2.3` item 1
(v) says *"No zone member is ever read as a value"* — consistent — while **`P-CN-TP-1`'s `DRIVE SCOPE`
never exercises this hazard at all** (it wraps only members `22`/`25`/`26` and passes every other member
**directly** as `zones`, so member `30`'s coercion is never attempted by the row's own drive), which is
why the register row **held 36/36** while the hazard is real: **a row that cannot reach its own hazard is
not evidence about it** (recorded as ambiguity `O-6`/`O-10`).

### 7.6 Incidental observations, recorded rather than hidden — **not my rows, not scored**

1. **The unit's OWN red set is RED at `HEAD` on a working tree whose only modification is not mine.**
   `vitest run tests/census.test.ts` reads **`Tests 1 failed | 64 passed (65)`** both **before and after**
   my temp files' deletion, so **my pass neither caused nor cleared it**. **The gate-3 commit subject
   claims *"64/64 rows … trio 64 files/1246 tests 1244 pass/2 skip"*** while a re-run reads **`64 passed |
   1 failed (65)`** in that file — **a claim-vs-run drift for the supervisor**, and the failing row is
   `CO-1` (§7.5), which is exactly the under-review behaviour. **The working tree carries an uncommitted
   `+190/-0` addition to `tests/census.test.ts` (mtime 2026-09-25 12:34:16 −0500, i.e. during this pass);
   this pass did not author it, never read it, and does not attribute it.**
2. **The node suite is not green at this tree state either:** with my files deleted,
   **`Test Files 1 failed | 63 passed (64)`** · **`Tests 1 failed | 1244 passed | 2 skipped (1247)`** —
   the single failure is the unit's own `CO-1`. **`1244 passed | 2 skipped` matches the gate-3 subject's
   *"1244 pass/2 skip"***, so the suite count is corroborated and **only the per-file `64/64` claim has
   drifted**.
3. **My own pass's footprint, recorded so it is attributed rather than confused with the above:** while
   my four runner files existed the suite read **`Tests 7 failed | 1317 passed | 2 skipped (1326)`** — the
   extra six being **my own FAIL rows**. **After deletion the suite is back to
   `1 failed | 1244 passed | 2 skipped (1247)`, identical to the pre-pass reading except for `CO-1`'s
   concurrent addition.** **The artifact's own presence adds no failure**: `docs/**` artifacts are not in
   the suite's include list (`tests/**/*.test.ts`).
4. **No scenario, drive or expectation in this file was derived from the unit's `CO-1` failure text.**

---

## 8. Ambiguities (`O-1`…`O-10`) — recorded, never silently resolved

**No clause below was edited, and no row was invented from an ambiguity.** Each is a claim I could not
turn into **one** falsifiable scenario, with the observed values that made it visible.

| # | The clause(s) | Why no single falsifiable scenario exists | What this run did instead (and observed) |
| --- | --- | --- | --- |
| **`O-1`** | **`§2.5` item 4** (*"`Object.keys(record)` yields the zones in first-seen enumeration order"*) vs **`§0A` ruling note 7** (the record is built on **`Object.create(null)`**, i.e. an ordinary object) | JavaScript enumerates a plain object's **integer-like** own keys first, in ascending numeric order — so the order claim and the required representation **cannot both hold** for those ids, and `§5.5.1 P-CN-SM-2` shape (3)'s declared list `['a','1']` is a second, independent assertion of the unachievable order | Drove both halves: `CN-G-21` (non-integer ids ⇒ first-seen order **holds**) and `CN-G-22`/`CN-G-70` (**integer-like ids ⇒ observed `['1','2','a']` / `['1','a']`**, the documented order falsified). **Reported as three FAIL cells (§7.1), not resolved**; the binding set-equality half is green in all `68` `P-CN-IM-1` pairs |
| **`O-2`** | **`§3.2 F-5`** and **`§3.2 F-6`** — *"every revealed zone yields the `emptyToken` (**because** `isEmpty` answered `false`)"* / *"its value is the `emptyToken` — because `isEmpty(census, 42)` is `false`"* — against the delegate's limbs (`zones §2.3` item 1 (a)–(c)) | The stated **reason** is provably inverted (a `false` emptiness means NON-empty ⇒ `String(size)+unit`), while the stated **value** is reachable **only** if the size lookup **misses** — and neither row pins the size, so no single drive can decide which the row means | Drove the size-**present** reading (**FAIL**, §7.2/§7.3) **and** the size-**miss** reading (the value claim holds, recorded in the same payloads). **Two readings, both recorded, neither chosen** |
| **`O-3`** | **`§5.5.1 P-CN-IM-2`**'s **corrected `v2` clause** — *"`trackFor` IS called exactly `1` time, with the emptiness boolean `true` passed in, producing the DECLINED zone's `''`"* — against **`§3.1 M-4`** (*"`isEmpty` called `0` times, `trackFor` called `0` times"*), **`§2.3` item 6** and **`§0A` ruling note 11** (*"a zone the predicate declines costs ZERO delegate calls (§2.3 item 6 is unchanged) while still owning its key"*) | Both clauses describe the same drive and give **different call counts**; a runtime observable cannot decide which TEXT is authoritative — only which the module implements, and that does not settle the contract | Drove it **under a wholesale delegate mock** (`CN-G-75`): `{"declinedZone":{"keys":["a"],"value":"","calls":[],"rulingAndM4Expect":{"isEmpty":0,"trackFor":0},"P_CN_IM_2_corrected_v2_clauseClaims":{"isEmpty":0,"trackFor":1},"resolvedByObservation":"the module makes ZERO delegate calls for a declined zone (M-4/§2.3 item 6/ruling note 11), NOT the corrected v2 clause's one trackFor call"}`. **The module matches `M-4`/the ruling; the text conflict is REPORTED, not resolved** |
| **`O-4`** | **`§5.5.1 P-CN-IM-2`**'s `m2` cell text — *"for `(m2)` exactly `SENTINEL-E` (the delegate's non-finite-size limb reached with `undefined`)"* — against **`docs/specs/zones.md` `§2.3` item 1's corrected precedence** (*"limb (d) is evaluated FIRST … for a malformed spec, `trackFor` returns `''` REGARDLESS of `empty` and REGARDLESS of `size`"*), with `m2` supplying `specOf = undefined` | With `specOf` undefined the **spec is malformed**, so the delegate's own ruled precedence answers `''`, not the empty token; the cell's parenthetical reason is unreachable through the delegate the unit is contractually required to call | Drove all `36` cells: **`36 / 36` hold against the delegate-governing expectation**, and **the `4` `(v1, m2)` cells deviate from the cell text** — `[{"cell":["v1 ()=>true","c1 {a:0}","m2 both missing"],"cellTextSays":"SENTINEL-E","observed":""}, …4 cells…]`. **Reported as a cell-vs-delegate text conflict; the register's terms, ids and markings were not touched** |
| **`O-5`** | **`§5.5.1 P-CN-IM-4`** drive **(10)** — *"the throwing zone costs `0` delegate calls and the other two cost `1` each"* — against **`§3.2 F-2`** (d) with its annotation (*"the whole record is empty because no decision was supplied"*) | The two clauses describe the same drive and require **irreconcilable records** (`{}` versus all three keys); the module can satisfy only one, so no single expectation can be derived without choosing a clause | Drove both (`CN-G-26` for `F-2` (d), `CN-G-47` for drive (10)): `F-2` (d) **holds**; drive (10) is **falsified with its reproduction** (§7.4). **Reported, not resolved** |
| **`O-6`** | **`§5.5.1 P-CN-TP-1`**'s **`DRIVE SCOPE`** (*"for a member that is an ARRAY (member `22`) or a `Map`/`Set` (members `25`/`26`) the drive wraps the member in a one-element array; for every member that is NOT itself a sequence … the drive passes the member DIRECTLY as `zones`"*) against its **per-attempt assertion** (*"the drawn member is the sole key (or the DROP case for member `24`)"*) | Under the stated drive scope most drawn members are **never enumerated as members at all** (a primitive member ⇒ `§2.3` item 1 (c) ⇒ ZERO zones), so *"the drawn member is the sole key"* is unreachable for them; a wrapped drive would enumerate them but contradicts the stated scope — the two readings give different key sets **and different register evidence** | Drove the **stated scope** (36/36 held) **and recorded which member produced what** (e.g. draws `2`/`20`/`26` ⇒ `new Set()` wrapped ⇒ key `'[object Set]'`; draws `24`/`28`/`34` ⇒ `[]` wrapped ⇒ key `''`; every primitive draw ⇒ `{}`) — and **separately drove the wrapped reading for the uncoercible member** (`CN-G-73`), which is where its own hazard lives. **Both readings recorded, neither chosen** |
| **`O-7`** | **`§5.5.1 P-CN-SM-1`** shape **(1)** (*"a `zones` whose own `Symbol.iterator` **throws** on the first `next()`"*) against **`§2.3` item 1 (ii)** (*"the whole enumeration is then the members yielded so far"*) | With the throw on the **first** `next()`, **zero** members were yielded, so the row's shape tests the caught class **and nothing about partial enumeration** — the same clause has two very different drives and the row names only the first | Drove the row's literal shape (`CN-G-69` shape 1: `{}`, no throw) and the partial-enumeration reading as its own scenario (`CN-G-17`: `'a'` then a throw ⇒ `['a']`). **Both recorded** |
| **`O-8`** | **`§3.4 R-10`**'s RED form and **`§3.5 R-13`** | Each is a claim about **one past tree state** (the red-run instant) or about an **import graph over `src/**`** — neither is re-drivable at this tree state by a pass forbidden to read `src/**` | Probed and recorded: `R-10` green form **PASS** (`CN-G-59`), `R-10` red form **NBR** (`CN-G-60`), `R-13` **NBR** (`CN-G-63`), and `R-8`'s diff-scope companion scored (`CN-G-57`) **without** implying the import claim. **Not scored as passes** |
| **`O-9`** | **`§2.3` item 6**'s delegate counts for a **declined** zone (`0` per `M-4`), for a **per-zone throw** and for the `revealed`-absent case | The delegate is **not an injectable parameter** (`§2.1` fixes five parameters and this unit imports its predecessor directly), so `isEmpty`/`trackFor` counts and their argument **tuples** are unobservable from a black-box call — a blind run can spy only the caller's own lookups and the census read | Replaced the delegate **wholesale** at the documented specifier (`vi.mock('../src/shared/zones.js', …)`, `trackFor → 'MOCK-TOKEN'`) and drove the counts and tuples there (`CN-G-74`/`CN-G-75`/`CN-G-76`). **The substitution is a technique, stated wherever its counts are used; no module source was read for it** |
| **`O-10`** | **`§2.4 C-A`**'s exception list (*"MINUS the `Symbol` members"*, and `§2.3` item 1 (iv)'s *"the one member that CANNOT become an own key"*) against the observed behaviour for **uncoercible object members** | The spec names **one** drop class; the module drops a **second** (an object member whose primitive coercion throws). Whether that second class belongs in the clause's exception list, or is the defect the supervisor flagged, is a **contract question this pass may not decide** | Drove it directly (`CN-G-73`, §7.5) with `keys: []`, `symbolKeys: []`, the gate **passed** and **no throw**, and recorded it as **FAIL with the reproduction**, plus the corroboration by the unit's own red row `CO-1`. **Recorded, never resolved, and nothing was fixed** |

**One further clause this run could not turn into a `§3`-shaped row, stated so it is not read as an
omission:** **`§2.1`'s type-only exports** (`ZoneId`, `TrackVars`) are reachable neither at runtime nor
by a blind read, so they are scored **only** as the `NOT-BLIND-RUNNABLE` row `CN-G-50`; and **`§5.2` leg
2's named limit** (`tsconfig.json` excludes `tests/**`, so `npm run typecheck` is evidence about `src/**`
only) means **no row here rests on the typecheck leg**.

---

## 9. Self-corrections inside this run (checker defects, recorded so none is read as a finding or a pass)

Every item below was a **defect in my checker or my drive**, re-derived from the contract text; **no
scenario was softened, no expectation was relaxed to match an observation, and the six FAILs are
separate.** The observed values of the **final** run (§4) are the corrected drives only.

1. **`CN-G-2`** — I concatenated the two caller-lookup spy logs (`['a'] + ['a']`) and expected `['a']`,
   so the row failed on **my** arithmetic. Corrected to per-spy equality; the row then read **PASS**
   (`declinedStrictlyEmpty: true`).
2. **`CN-G-28`** — I expected **every** zone's value to be `''` in the `F-3` drive, forgetting that `'a'`
   has a spec and keeps its token. Corrected to the row's own words (*"'a' gets its token and 'b' gets
   `''`"*); the row then read **PASS** (`["40px",""]`).
3. **`CN-G-35`/`CN-G-36`** — before writing the drives I composed the delegate directly
   (`trackFor(spec, 40, isEmpty(census, id))` → `'40px'`) so that my **expectation came from the
   delegate's own limbs, not from an observation of the module**; the FAILs are then against the rows'
   stated values (**§7.2/§7.3**) and are recorded with both readings.
4. **`CN-G-68`** drive **(12)** and **`CN-G-70`** shape **(3)** — I composed the expected value with the
   member's **string image** instead of the member itself, making a correct module look wrong
   (`'40px'` where I expected `'SENTINEL-E'`). Corrected to pass the **member** (a number `42`; the number
   `1`) into the composition, which is exactly what `§0A` note 3/R5 requires — and which is
   **independently confirmed** by the spies seeing `typeof id === 'number'`. The remaining shape-(3)
   FAIL is **only** the ordered key list (**§7.1**).
5. **`CN-G-70`**'s duplicate check — I expected `'9px'` from a **`Map`** with a repeated key, which is
   impossible (a `Map` cannot carry a duplicate key: the constructor is last-entry-wins, so `sizes` was
   correctly called **once**). Corrected to record the `Map`'s own collapse and to point at the
   **array**-duplicate case (`M-7`/`CN-G-20`), where the last-occurrence rule **does** bite and **did**
   hold (`9px` after **2** lookups).
6. **`CN-G-59`** — my first `readdirSync` probe matched **my own** `tests/blind-census-*.tmp.test.ts`
   runners against `/census/i` and reported six paths instead of two. Corrected to scope the probe to the
   **unit-owned** change set (excluding this pass's own temp runners) with the scope rule printed in the
   payload; the row then read **PASS** (`exactUnitOwnedSet: true`).
7. **`CN-G-42`** — my first drive passed the string `'a'` instead of `['a']` as `zones`, so the drive was
   **degenerate** (`{}` twice) and the hostile-globals comparison proved nothing. Corrected to `['a']`;
   the row then read **PASS** with `baseline: ["40px","40px"]` and
   `withHostileGlobals: {"keys":["a"],"value":"40px","equalToBaseline":true}`.
8. **`CN-G-73`** — its first form only **printed** the uncoercible-member behaviour
   (`expect(true).toBe(true)`), which would have recorded an observation as a silent pass. Corrected to
   assert `C-A`'s own consequence (one enumerated member ⇒ one own key); it then read **FAIL** with the
   reproduction (**§7.5**).
9. **`P-CN-TP-1`'s draw arithmetic** — before writing the register row I computed the seed's sequence
   **independently in BigInt** (`node -e`) by the spec's own pinned form, so that my expectation came from
   the contract and not from the module. The final row reproduces
   `[26,25,6,15,0,9,18,23,10,11,6,5,26,29,2,3,12,9,12,25,26,23,26,21,10,25,4,21,26,13,26,21,6,21,8,1]`,
   **`20` distinct**, **`16` repetitions** — matching the red-set commit's own *"pool draw 20/30
   distinct"* note, which I had not read as a source for the drive.

---

## 10. The temporary runners — exact paths, and proof of deletion

**Paths used (all six temporary, all now deleted):**

- **`tests/blind-census-a.tmp.test.ts`** — 47 scored rows: the architect ruling (`CN-G-1`..`CN-G-12`) and
  `§2.3` items 1–6 with every `M-*`, `F-*` and `I-*` (`CN-G-13`..`CN-G-46`).
- **`tests/blind-census-b.tmp.test.ts`** — 19 scored rows: the per-zone-throw conflict (`CN-G-47`), the
  `§2.1` surface and the `§3.4`/`§3.5` static+existence rows (`CN-G-48`..`CN-G-64`) and the uncoercible
  member (`CN-G-73`).
- **`tests/blind-census-c.tmp.test.ts`** — the 8 `§5.5.1` register rows (`CN-G-65`..`CN-G-72`).
- **`tests/blind-census-d.tmp.test.ts`** — the three delegate-count rows under the **wholesale delegate
  mock** (`CN-G-74`..`CN-G-76`).
- **`tests/blind-census-probe.tmp.test.ts`** — a two-assertion pre-flight probe (namespace keys, arity,
  one call, the declined-zone shape) run **before** any scenario was authored.
- **`tests/blind-census-probe2.tmp.test.ts`** — a one-assertion pre-flight probe of the **delegate-mock
  interception** (does `vi.mock('../src/shared/zones.js')` reach the module's own import), so that `O-9`'s
  technique was validated before its counts were used.

**Deletion proof, exactly:** `ls tests/ | grep -ci tmp` prints **`0`**; `ls tests/ | grep -i census`
prints **`census.test.ts`** alone. **Measured, not assumed — the deletion changes the counts back:**
while the files existed the suite read `Tests 7 failed | 1317 passed | 2 skipped (1326)`; after deletion
it reads **`Tests 1 failed | 1244 passed | 2 skipped (1247)`**. **Final state, stated honestly:**
`git status --porcelain` prints exactly **two** lines — **` M tests/census.test.ts`** (the uncommitted
+190-line addition this pass did **not** author, **not** mine to resolve, §7.6) and
**`?? docs/specs/census-greens.md`** (this artifact, the **only** file this pass leaves behind).
**This pass edited no other tracked file**: not the spec, not the module, not the red set, not the
trackers, not `package.json`, not `scripts/**`; it ran **no** `git commit`, and it never touched
`node_modules/provident-ssr/` or `../Preempt-Providence/`.

**Scope of the blindness claim, exactly:** `src/shared/census.ts` was **never opened, never read, never
printed** — it was imported and called as a black box through the one documented function and the
namespace's runtime key set, with the delegate replaced wholesale in one runner. `tests/census.test.ts`
was **never read**: it was **run for counts** twice and its one failure report printed a row id (`CO-1`)
and an assertion sentence into this session's transcript, which contributed **nothing** to any drive
(mine was authored and run **before** that text appeared). The only content reads in this pass were the
documentation listed in the header, `package.json`, `vitest.config.ts` and `git`/`fs` probes.

---

## 11. Honesty — exactly what this run does and does not prove

**May rest on this record:**

- **the architect ruling's whole territory** (`CN-G-1`..`CN-G-12`): the returned record's key set is
  **exactly `zones` by set equality INCLUDING every declined zone**; a declined zone is **present with
  `''`** and is **not** the caller's `emptyToken` and **not** a token; **an absent/non-callable/throwing
  `revealed` is the EMPTY record**, distinctly different from "declined"; the ruling's five falsifiers
  `(a)`..`(e)` each **hold**; the `''`-collision limitation is real; a consumer iterating keys **sees
  every zone**;
- **every `M-*` happy state** (`CN-G-13`..`CN-G-34`): the `Map`-keys reading, the record-branch own-key
  reading, the `Set`/array/own-iterator shapes, the non-callable-`Symbol.iterator` fallback, the caught
  throwing iterator, the zero-zone shapes, the `Symbol` DROP, the duplicate collapse with the
  last-occurrence value, the null-prototype `'__proto__'` own key, `M-1`/`M-3`/`M-5`/`M-6`/`M-9`/
  `M-10`/`M-11`/`M-12`/`M-14` verbatim, and the **exact `§2.3` item 6 call discipline** (`revealed` once
  per enumerated zone; lookups and `isEmpty` once per **revealed** zone; **zero** for a declined zone);
- **every documented fail-state as a VALUE** (`CN-G-6`..`CN-G-9b` and `CN-G-25`..`CN-G-43`): `{}` for
  every non-enumerable `zones`; `{}` for every non-callable/throwing predicate with **0** census reads;
  the key surviving every missing/malformed spec and size, with `''` and the `emptyToken` respectively;
  the `''` three-case collision; no refusal domain anywhere; no throw in any hostile drive;
- **the `§2.4` clause set** (`CN-G-1`, `CN-G-11`, `CN-G-38`, `CN-G-39`): `C-A`'s set equality in every
  measured drive (the `Symbol`/uncoercible exceptions aside, §7.5), `C-B`'s **nine named observables**
  (own keys order+content, values by `Object.is` incl. `-0`, prototype, frozen-ness, own descriptors, a
  `Map`'s size/entries, no key/default/sentinel, no retention across calls, and the same observables for
  `zones`/`sizes`/`specOf`), and `C-C`'s (a)–(g);
- **the surface** (`CN-G-48`, `CN-G-49`, `CN-G-64`, `CN-G-76`): the runtime value export set is exactly
  `{computeTrackVars}` (with a positive control), the **arity is 5**, the doc-level aliases are **not**
  exported, and **only `isEmpty` and `trackFor` are ever taken from the delegate** — the strongest
  runtime evidence this pass can produce for the delegation contract;
- **the register, exercised independently: `248` attempts driven / `247` held / `1` broken**, term by term
  against the eight stated counts and strategy ids, with the five bounded rows **still marked bounded**,
  the pinned seed's draw arithmetic reproduced (`20` distinct of `30`, `16` repetitions, the full index
  list), `P-CN-SM-3`'s `10` distinct drives reported beside its declared `30`, and the register's
  arithmetic re-added as `68+36+24+14+30+10+30+36 = 248` (§5);
- **two existence probes** (`CN-G-59`, `CN-G-61`): the module and its test file exist as the only
  `census*` paths in `src/**`+`tests/**`, and `docs/skills/designing-pages.md` **does not exist**, so the
  conditional coverage-matrix/demo-page obligation is **not triggered at this tree state**;
- **one scope probe** (`CN-G-57`): the unit's own committed range touches **no** DENIED-set path and no
  path outside `§5.1`'s allow-list, and both canonical artifacts are present;
- **the corroboration legs, with their exact tree states** (§3): the unit's own row file reading
  **`64 passed / 1 failed (65)`** and the node suite **`1244 passed | 2 skipped (1247)`** after deletion,
  **both carrying the pre-existing `CO-1` failure** — which is itself the independent corroboration of
  `CN-G-73`.

**May NOT rest on this record:**

- **ANY rendered-geometry, CSS-validity, applied-length, layout or paint claim.** The ledger's geometry
  clause says such a claim is **UNPROVABLE in this repo today**, this unit **offers no `[U]` row**
  (`§5.2`), and every observable here is a **key list, a string, a call log or a snapshot**;
- **assembled-app evidence of any kind**: no window was booted, no IPC round-trip ran, no MCP transport
  was exercised, and **the module is imported by no `src/**` file per the unit's own scope rows** — so a
  green says **the contract holds for a caller**, not that app behaviour changed;
- **the module's source-level prohibitions.** `R-1`, `R-3`, `R-4`, `R-5`, `R-6`, `R-7`, `R-9`, `R-10`'s
  red form and `R-13` are **`NOT-BLIND-RUNNABLE`** and **ungreen here, as are `I-6`, `I-8` and `R-2`'s
  type half**. **A reader may not infer from this file that the module imports exactly `isEmpty` and
  `trackFor` and nothing else, carries no banned vocabulary, holds no realm-rooted access, duplicates no
  sibling responsibility, makes no geometry claim, contains no write site, or that no `src/**` file
  imports it** — those are **owed** to a source-reading pass, and a self-verified greens set is a review
  finding (RCA-4);
- **the `R-10` absence claim** (a one-instant historical claim, `O-8`), **`R-13`**, and **`R-12`'s
  "imports nothing" half**;
- **`ZoneId`/`TrackVars`'s export** (`CN-G-50`) — owed to `§5.2` leg 4;
- **the unit's own red set's health**: it reads **`1 failed | 64 passed (65)`** at this tree state and
  **the gate-3 subject's `64/64` claim has drifted** (§7.6). **No count quoted from a commit subject or a
  tracker cell may be treated as a measurement** — §3 shows what a re-run reads;
- **the six `FAIL`s as anything but what §7 attributes them to.** `CN-G-22` and `CN-G-70`(shape 3) are a
  **documentation order claim that the required representation cannot satisfy**; `CN-G-35`/`CN-G-36` are
  **`F-5`/`F-6`'s inverted causal clause and its value expectation**; `CN-G-47` is a **conflict between
  `P-CN-IM-4` drive (10) and `F-2` (d)**; `CN-G-73` is the **module-side behaviour under review**
  (corroborated by the unit's own red `CO-1`). **Five of the six are documentation-side; none may be read
  as a pass, none was fixed here, and no reading was hardened into the contract.**

**And the rule this record exists to serve:** **every FAIL above is doc/spec drift, a drift between two
documented clauses, or the module behaviour already under review — never a pass.** No row was converted,
softened, re-scoped or dropped to reach a green; the twelve `NOT-BLIND-RUNNABLE` rows are **reported as
such**; and this greens set was authored and run by an agent who **did not** write the module, the red set
or the register it audits (RCA-4).
