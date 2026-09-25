# Green Scenarios — `U-LISTHOST` (the owned-node list host) — blind run

**Status: `BLIND RUN (one pass) — 57 executed scenario rows: 54 PASS / 0 FAIL / 3 NOT-BLIND-RUNNABLE`**
(`56` id-bearing rows plus `LH-G-43a`/`LH-G-43b`'s shared vocabulary sub-drive `LH-G-43b-vocab`; §3's
arithmetic table closes the count). **⟶ DECOMPOSITION CORRECTED 2026-09-27 (the DOCUMENTATION REVIEW,
`AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding
**F‑18**, LOW; the as-written decomposition is kept visible): the correct form is **`57` executed
scenario rows = `56` id-bearing rows + `1` in-test vocabulary sub-drive** — the arithmetic table in §3
gives the `56` as the sub-total of id-bearing rows and the `LH-G-43b-vocab` recording as the **`57`th
executed test** (the sub-drive lives INSIDE the `LH-G-43b` test and carries its own assertion). The
`57`/`54`/`0`/`3` headline is unchanged and reproducible; only the decomposition sentence's wording
implied `58`.**
**No FAIL was converted, no row was marked runnable to raise the count, and no row was re-scoped to
make it pass.** Three rows that RAN and read clean are nevertheless scored
**`NOT-BLIND-RUNNABLE`** because settling their *semantic* claim needs the module's source
(§2.2's prohibitions) — a token/AST census is not the semantic read those clauses ask for, so
those three are reported with their census readings and **not** counted as passes (§6).

**Date stamp:** the host clock reads **2026-09-25** (`date -u`) during this work; this unit, its
contract and its trackers file their work under **2026-09-27** (the same host-clock-vs-filing-calendar
offset `docs/specs/mount-invariant-guard-greens.md`, `docs/specs/engine-drift-greens.md` and
`docs/specs/ci-ui-leg-greens.md` record). **Cite the filing date.**

**Authored and run WITHOUT reading the implementation.** The documentation read to derive every
scenario was: `docs/specs/listhost.md` (the unit's contract — the status/amendment notes, §0's
ruling table, the Layer declaration, §1, §2.1 (including the node rule `N-1`..`N-5`, the
ACCEPTANCE rule, the mount-absence paragraph, the surface census and the totality clauses), §2.2,
§2.3, §2.4, §3.1 `M-1`..`M-21`, §3.2 `F-1`..`F-11`, §3.3 `I-1`..`I-9`, §4.1–§4.5, §5.1, §5.2,
§5.3, §5.5/§5.5.0/§5.5.1 (the 7-row register), §6, §7 items 1–11, §8, §3a (`A-1`..`A-19`) and
§3b-1/§3b-2), `docs/specs/mount-invariant-guard-greens.md` (the format, and its Layer-declaration
and NOT-BLIND-RUNNABLE conventions), `docs/specs/runtime-host-greens.md` (the `installShim()`
setup idiom), `docs/specs/mount-invariant-guard.md` §2.4 (the shim-tree read layer), and `AGENTS.md`.

**Files NOT read to derive any scenario's content:** **no implementation source was read for any
scenario's *content*** — in particular `src/shared/owned-list-host.ts` was **never opened, never
read, never printed**. The module was imported as a **black box** (`createOwnedListHost` called and
its results observed). Three narrow, declarable reaches, recorded so the blindness claim is exact:

1. **`src/shared/dom-shim.ts` WAS read (lines 1–145)** — it is the *harness* the documentation
   names as the test side of a `[T]` row (`listhost.md`'s Layer declaration row `[T]`, §2.2
   prohibition 6), not the unit under test. It fixed the drive idiom only (`installShim()`,
   `mountEl()`, `document.createElement`, `children`, `appendChild`, `remove`, and the `removed`
   flag that `F-6`'s pinned reading names).
2. **Two STRUCTURAL censuses over `src/shared/owned-list-host.ts`** (§5 rows 42/43a/43b/44): a raw
   token count, and an AST/scanner **identifier census at code positions** (comments excluded).
   **Only counts and declared names were produced**; no body, expression or comment text of the
   module was inspected, printed or quoted.
3. **One accidental disclosure, recorded rather than hidden:** an early *discarded* probe called
   `registeredToolNames()` with no argument and the thrown `TypeError`'s stack trace printed
   **seven lines of `src/main/mcp-server.ts`** (a function body and a comment) into this session's
   transcript. It disclosed nothing about `U-LISTHOST`'s module, and **no scenario, drive or
   expectation in this file was derived from it**; it is recorded because an unrecorded reach is
   worse than a recorded one.

**The temporary runner.** The scenarios were authored and executed through a **temporary** vitest
file inside the repo (paths in §2), which was **DELETED** after the run — the artifact is this file,
not the runner. Proof of deletion is §7.

---

## 1. Layer declaration — exactly what this run proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own vitest (`vitest 5.0.1`) plus `src/shared/dom-shim.ts`'s element tree under node | a browser; the assembled app |
| **[H]** | host-side | this unit's own `src/shared/owned-list-host.ts`, **imported as a black box** — its documented surface only | engine-internal behaviour |
| **[S]** | static/structural | two censuses over the module **file**: raw token totals, and an AST/scanner identifier census at code positions | a semantic source review |
| **[U]** | real-DOM `ui` leg | **not taken by this run** (see below) | — |

**Honesty anchors:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** No window
   was booted, no IPC round-trip ran, no MCP transport was exercised, and **no real DOM was
   touched**. Every mount here is a `ShimElement` created by `mountEl()`.
2. **Every row is a SHIM-TREE row.** The shim has no layout, no CSS resolution, no
   `getComputedStyle` and **no `querySelector(All)`** — so `[T]` ordering greens say the shim's
   `children` array is in the projected order, and **nothing** about visual order, paint, focus or
   geometry.
3. **`[H]` here is this repo's own `src/shared/` module, not the engine.** The engine
   (`provident-ssr`) is not exercised by this unit at all: the module imports nothing (see row 44)
   and this run booted no `Runtime`.
4. **The module is imported by no `src/**` file** — this run found **zero import declarations** in
   it and its only consumer is its own test file. **Nothing here is assembled-app evidence, and a
   green is never a claim that any page, pane or shell uses this host.**
5. **The `[U]` real-DOM row was NOT TAKEN.** `listhost.md` §5.2 makes it OPTIONAL and
   precondition-gated (its preconditions: the `ui` leg green for the built tree, `npm run
   divergence` green, and — for attribute-shaped variants only — the `H-r10` extractor owed to
   `U-DIVERGENCE-EXT`). **This run ran no `ui` leg and no divergence leg**, so **no real-DOM
   identity or reorder claim is made anywhere in this file**; §3's rows do not depend on it.

---

## 2. Exact commands (as run)

```bash
# runner binary (the repo's own vitest; `npx` is unavailable in this session —
# the npm cache dir is not writable: `npm error The operation was rejected … /home/ryanr/.npm`)
node_modules/.bin/vitest run tests/blind-listhost-greens.tmp.test.ts     # the 57 scenario rows
node_modules/.bin/vitest run tests/blind-listhost-detail.tmp.test.ts     # verbatim re-take of 5 long observations
node_modules/.bin/vitest run                                            # the node suite, count-only corroboration
node_modules/.bin/vitest run tests/owned-list-host.test.ts               # the unit's own row file (COUNT ONLY, not read)
node_modules/.bin/vitest run tests/engine-pin-version.test.ts            # the 21-member census row (COUNT ONLY, not read)
git status --porcelain                                                   # the tree, before and after deletion
```

**Runner / stack:** Node **v24.20.0**; vitest **5.0.1**; engine `provident-ssr` **0.5.1** installed
with declared pin **`^0.5.1`** (agreeing); `git HEAD` **`678f502`** ("U-LISTHOST adversarial fixes
GREEN (gate 4 fixes closed): 62/62 rows, register 168/168 held"), with the working tree carrying one
**pre-existing** modification, `docs/specs/listhost.md` (` M`), which **this pass neither made nor
touched**. The two scenario files were the only files this pass created, and both are deleted (§7).

---

## 3. Run counts (the run's arithmetic)

| Leg / artifact | Command | Verbatim result | Exit |
| --- | --- | --- | --- |
| the scenario set `[T]`/`[H]`/`[S]` (§5) | `vitest run tests/blind-listhost-greens.tmp.test.ts` | `✓ tests/blind-listhost-greens.tmp.test.ts (57 tests) 184ms` · `Test Files 1 passed (1)` · **`Tests 57 passed (57)`** | `0` |
| the verbatim detail re-take (§5's long rows) | `vitest run tests/blind-listhost-detail.tmp.test.ts` | `Test Files 1 passed (1)` · `Tests 4 passed (4)` | `0` |
| node suite `[T]` (corroboration, count only) | `vitest run` | `Test Files 60 passed (60)` · **`Tests 978 passed \| 2 skipped (980)`** | `0` |
| the unit's own row file (COUNT ONLY, never read) | `vitest run tests/owned-list-host.test.ts` | `✓ tests/owned-list-host.test.ts (62 tests) 36ms` · `Tests 62 passed (62)` | `0` |
| the pinned 21-member census row (COUNT ONLY, never read) | `vitest run tests/engine-pin-version.test.ts` | `✓ tests/engine-pin-version.test.ts (5 tests) 3ms` · `Tests 5 passed (5)` | `0` |
| **this record** | all of the above | **57 rows — 54 PASS / 0 FAIL / 3 NOT-BLIND-RUNNABLE** | — |

**The row arithmetic, so it closes — 57 executed tests = 57 scored rows, `54 PASS + 0 FAIL + 3 NBR`:**

| Group | Ids | Count |
| --- | --- | --- |
| §3.1 `M` family | `LH-G-01`..`LH-G-19`, `LH-G-20`, `LH-G-20b`, `LH-G-21` | **22** |
| §3.2 `F` family | `LH-G-22`..`LH-G-33` | **12** |
| §3.3 `I` family (+ §2.1 totality) | `LH-G-34`..`LH-G-40`, `LH-G-41`, `LH-G-41b`, `LH-G-41c`, `LH-G-41d`, `LH-G-41e` | **10** |
| §2.1 / §2.2 / §2.4 static + prohibition censuses | `LH-G-42`, `LH-G-43a`, `LH-G-43b`, `LH-G-44`, `LH-G-45` | **5** |
| §5.5.1 register (one row per register row) | `LH-G-46`..`LH-G-52` | **7** |
| **sub-total of id-bearing rows** | | **56** |
| §5.1's `LH-G-43b` vocabulary **sub-drive** (the `LH-G-43b-vocab` recording, with its own assertion, inside the same executed test) | `LH-G-43b-vocab` | **1** |
| **executed tests = scored rows** | | **57** (`54 PASS / 0 FAIL / 3 NOT-BLIND-RUNNABLE`) |

**Four self-corrections inside this run, recorded so none is read as a finding or as a pass.**
Every one was a **defect in my checker**, corrected against the contract's own text; the module was
not implicated and **no scenario was softened**:

1. **`LH-G-15` (`M-15`)** — my first assertion claimed `keys()` must still name `b` after
   `close('b')`. **My assertion was wrong**: `close` drops ownership. Re-pinned against `M-15`'s own
   text (*"`keys()` still reports the **current** keys"*): after `setEntries(a,b)` → `setOrder` →
   `close('b')` the current key set is `['a']`, and the **mount-absent** variant's `keys()` is
   `['a']`. Green on the corrected pin.
2. **`LH-G-47` (`P-LH-IM-2`)** — my first identity expectation for the second step compared the
   `f1` slot against `made[0]` (the node minted in step 1). **My expectation was wrong**: `f1` is a
   node-less key, so a re-declaration re-mints through the factory (`factoryCount` = 3), which is
   exactly `N-2`'s *"called once per node-less entry"*. Re-pinned to the factory's **latest** return
   for that slot. Green on the corrected pin.
3. **`LH-G-37` (`I-4`)** — my first version monkey-patched `Object.getPrototypeOf(mount)` and never
   restored it, reddening every later scenario with `Cannot set properties of undefined (setting
   'parent')`. **The leak was mine**; the row was rewritten to observe the mount through a `Proxy`
   and each caller node through its own property descriptors. Green, and the leak is gone.
4. **`LH-G-49` (`P-LH-IM-4`)** — my first strengthened assertion required the host's own-node
   append count to equal the number of nodes it owns. **That expectation was wrong about the
   *shim*, not about the host**: the shim's `appendChild` is a MOVE (it splices an existing child
   out and pushes it back), so a reorder that re-places each owned node legitimately reads as extra
   appends. The assertion now targets the **falsifiable content of the statement** — a FOREIGN
   sibling is never passed to `appendChild` again and is never removed (`foreignAppends = 0`,
   `foreignRemoves = 0`, on all five sequences) — with the own-node append count **recorded** (§8
   `O-1`). Green on the strengthened form.

---

## 4. The scenarios — `[T]`/`[H]`: §3.1 `M`, §3.2 `F`, §3.3 `I`

`Doc section` cites the unit's contract **by section and row id** (never by line number). The drive
was `node_modules/.bin/vitest run tests/blind-listhost-greens.tmp.test.ts` (§2). Every observed
value below is the **verbatim** `console.log` payload my runner emitted for that id.

### 4.1 §3.1 valid / happy states (`M` family) — 22 rows, all PASS

**⟶ HEADING COUNT CORRECTED TO `22` 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 —
record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑18**, LOW; the as-written
`21 rows` is kept visible here): the table below holds **`22` ids** — `LH-G-01`..`LH-G-21` **plus**
`LH-G-20b` — which is exactly what §3's own group table states (§3.1 `M` family … = **22**). No row
was added, removed or re-scoped by this correction; only the heading's count moves.**

| Id | Doc section (row) | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **LH-G-01** | §3.1 `M-1` | `mountEl()` → `createOwnedListHost({mount})`; `render()`; `setEntries([])` | `{"render":{"ok":true,"order":[],"placed":[],"removed":[],"refused":[]},"setEntriesEmpty":{"ok":true,…all empty…},"mountUnchanged":true}` | **PASS** |
| **LH-G-02** | §3.1 `M-2` | `setEntries([{a,nodeA},{b,nodeB},{c,nodeC}])`, **no** `orderOf` | `{"ok":true,"order":["a","b","c"],"placedOk":true,"childSeq":[true,true,true]}` | **PASS** — supplied order is the default projection, identity preserved, mount child sequence matches |
| **LH-G-03** | §3.1 `M-3` | `orderOf:(e)=>e.payload.n`, payloads `2,0,1` | `{"ok":true,"order":["b","c","a"],"placed":[1,2,0]}` | **PASS** |
| **LH-G-04** | §3.1 `M-4` (**stability**) | `orderOf:()=>0` over two entries | `{"ok":true,"order":["x","y"],"placed0IsX":true,"placed1IsY":true}` | **PASS** — ties keep the supplied order; no tiebreak invented |
| **LH-G-05** | §3.1 `M-5` + §2.1 `N-1` | `setEntries([{key,node}])` with an injected `itemFactory` spy | `{"ok":true,"identity":true,"factoryCalls":0}` | **PASS** — the supplied object **is** the node; the factory is never called |
| **LH-G-06** | §3.1 `M-6` + §2.1 `N-2` | two node-less entries, injected factory | `{"ok":true,"calls":2,"identity":true,"order":["k1","k2"]}` | **PASS** — once per node-less entry, by reference |
| **LH-G-07** | §3.1 `M-7` | place 3, then `setOrder(['c','a','b'])` | `{"ok":true,"order":["c","a","b"],"placedSame":true,"removed":0}` | **PASS** — a reorder removes nothing |
| **LH-G-08** | §3.1 `M-8` (**the `V-7` hard row**) | two caller-created foreign elements appended, then two `setEntries`/`render` cycles | `{"sameRefs":true,"relativeUnchanged":true,"hostInsideSameMount":true,"after":["f1","f2","n1"]}` | **PASS** — same objects, unchanged relative order, host placed inside the same mount |
| **LH-G-09** | §3.1 `M-9` | `activate('k')` twice on a known key | `{"r1ok":true,"r1refused":0,"countAfter2":2,"args":["k","k"],"entryRef":true}` | **PASS** — exactly one fire **per call**, not one-shot; the entry is passed by reference |
| **LH-G-10** | §3.1 `M-10` | `close('k')` | `{"closes":1,"keys":[],"removedHasN":true,"stillChild":false}` | **PASS** |
| **LH-G-11** | §3.1 `M-11` | `remove('k')` with an `onClose` spy | `{"closes":0,"keys":[],"removedHasN":true}` | **PASS** — `remove` and `close` are distinguishable (count 0) |
| **LH-G-12** | §3.1 `M-12` + `I-2` | the **same** entry re-declared | `{"identities":"k|true","removed":0}` | **PASS** — no remove+re-add cycle observable |
| **LH-G-13** | §3.1 `M-13` | `setEntries([{k,n1}])` then `setEntries([{k,n2}])` | `{"removedHasN1":true,"placedIsN2":true,"order":["k"],"keys":["k"]}` | **PASS** |
| **LH-G-14** | §3.1 `M-14` + §2.3 item 4 + `I-5` | place 3, `dispose()`, then `render()` | `{"keys":[],"refsHeld":true,"removedAfterDispose":0}` | **PASS** — the mount's child sequence is **reference-identical** across `dispose()` and nothing is removed: **reading (a) is the contract**, as §2.1's ruled `dispose()` clause says |
| **LH-G-15** | §3.1 `M-15` | `mount:null` — `setEntries`/`setOrder`/`activate`/`close`/`render`/`keys`; and the `mount:undefined` variant | `{"setEntries":{"ok":true,"order":["a"],"placed":0,"removed":0,"refused":0},"setOrderOk":true,"activateOk":true,"closeOk":true,"renderOk":true,"keys":[],"absent":{"a":true,"keysAfter":["a"]},"setterAbsent":"undefined"}` | **PASS** — no throw; `order` is the current key set while `placed`/`removed` are `[]`; **no `setMount` setter exists** (`undefined`), so a later mount is not retro-fitted |
| **LH-G-16** | §3.1 `M-16` | `mount: {}` / `42` / `'div'` | `[{"mount":"{}","ok":true,"refused":0,"placed":0,"order":["k"]},{"mount":"42",…},{"mount":"div",…}]` | **PASS** — a malformed child surface is a configuration, never a throw |
| **LH-G-17** | §3.1 `M-17` | one refused call, then a clean call | `{"first":{"ok":false,"refused":1},"second":{"ok":true,"refused":0}}` | **PASS** — refusals do not accumulate into host state |
| **LH-G-18** | §3.1 `M-18` | `setEntries([{''},{' b\t'},{'ünïcøde'},{'x'.repeat(4096)}])` → `setOrder([long,'','ünïcøde',' b\t'])` → `close('')` | `{"r1ok":true,"r1refused":0,"r1order":[""," b\t","ünïcøde","<long:4096>"],"r1verbatim":true,"r2ok":true,"r2refused":0,"r2order":["<long:4096>","","ünïcøde"," b\t"],"closeOk":true,"closes":1,"removedHasNa":true,"keysAfterClose":["<long:4096>","ünïcøde"," b\t"]}` | **PASS** — all four keys verbatim and byte-identical (`r1verbatim:true`), nothing normalized, `''` never collides, `close('')` fires once and removes that node |
| **LH-G-19** | §3.1 `M-19` + §2.1 **ACCEPTANCE rule** + `N-5` | `setEntries([{key:'k'}, {key:'k', node:n}])`, no factory, then `close('k')` | `{"ok":false,"refused":["no-node"],"order":["k"],"placedIsN":true,"codesHaveDup":false}` + `close('k')` removed `n` | **PASS** — exactly one refusal, **no** `duplicate-key`, the valid occurrence is placed |
| **LH-G-20** | §3.1 `M-20` | populate 3, then `setEntries(42)` | `{"ok":true,"refused":0,"order":[],"placed":0,"removedAll":true,"stillInMount":[false,false,false]}` | **PASS** — silent empty set, `ok true`, and the **prior ownership drop is observable** (all three nodes removed) |
| **LH-G-20b** | §3.1 `M-20` (`setOrder` half) | `setOrder(42)` after a projected order | `{"ok":true,"refused":0,"before":["b","a"],"after":["b","a"]}` | **PASS** — a no-op; the projection is unchanged |
| **LH-G-21** | §3.1 `M-21` + §2.1 `render()` | place, **caller detaches** the node, `render()` twice, then `close` | `{"inMount":false,"detachedFlag":true,"r1ok":true,"r1removed":0,"r2ok":true,"r2removed":0,"keys":["k"]}` | **PASS** — the detach is permanent (`render()` is not an undo), the key stays owned and not dangling, `close` does not throw |

### 4.2 §3.2 documented fail-states / refusals (`F` family) — 12 rows, all PASS

| Id | Doc section (row) | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **LH-G-22** | §3.2 `F-1` | `remove('nope')` / `close('nope')` / `activate('nope')` with both callbacks spied | `{"out":[{"op":"remove","ok":false,"refused":[{"code":"unknown-key","key":"nope"}]},{…"close"…},{…"activate"…}],"fires":0,"keys":[]}` | **PASS** — the exact key string as supplied, no callback fires, state unchanged |
| **LH-G-23** | §3.2 `F-2` (accepted-only scope) | `setEntries([{k,a},{k,b}])` | `{"ok":false,"refused":["duplicate-key"],"order":["k"],"placedIsA":true,"placedHasB":false,"keys":["k"]}` | **PASS** — first-wins; the duplicate's node is never placed; the key is owned once |
| **LH-G-24** | §3.2 `F-3` + `N-3` | `[{key:'k'}, {key:'ok', node:good}]` | `{"ok":false,"refused":[{"code":"no-node","key":"k"}],"order":["ok"],"ownsK":false,"placedGood":true}` | **PASS** — `no-node`, key not owned, **and the valid neighbour in the same call is placed** (the totality note) |
| **LH-G-25** | §3.2 `F-4` + `N-4` | `itemFactory: () => null` | `{"ok":false,"refused":["factory-returned-null"],"order":[],"keys":[]}` | **PASS** |
| **LH-G-26** | §3.2 `F-5` + §2.1 key-first rule | six non-object / non-string-key shapes, each alongside a valid entry | `[{"shape":"x","codes":["malformed-entry"],"keyEcho":"x",…},{"shape":"42",…,"keyEcho":42},{"shape":"{key:number}","keyEcho":42},{"shape":"{key:object}","keyEcho":null},{"shape":"{key:object}","keyEcho":"{}"},{"shape":"{key:undefined(undefined)}","keyEcho":"<undefined>"}]` — every one `"placedGood":true` | **PASS** — one `malformed-entry` per drive, the supplied key echoed **verbatim** (including `42`, `null`, `{}` and `undefined`), and no valid neighbour is aborted |
| **LH-G-27** | §3.2 `F-5` + §2.1 (*"the KEY is validated first"*) | `setEntries([{key:42, node:null}])` | `{"codes":["malformed-entry"],"ok":false}` | **PASS** — the malformed key short-circuits **before** the node question, so it is never `no-node` |
| **LH-G-28** | §3.2 `F-6` (pinned reading) | caller detaches a placed node, then `close(key)` | `{"ok":true,"removedHasN":true,"keys":[],"refused":0}` | **PASS** — no throw, the detached node **still appears in `removed`** (the pinned reading), no dangling ownership |
| **LH-G-29** | §3.2 `F-7` | `mount:null`, valid input | `{"ok":true,"refused":[],"order":["k"]}` | **PASS** — the absent mount is **not** a refusal (deliberately asymmetric with `U-MOUNTGUARD`'s `mount-not-appendable`) |
| **LH-G-30** | §3.2 `F-8` | `setOrder(['a','a','nope'])` on keys `a,b,c` | `{"ok":true,"refused":0,"order":["a","b","c"]}` | **PASS** — unknown/duplicate keys **ignored**, never refused |
| **LH-G-31** | §3.2 `F-9` | 3 host nodes + 1 foreign, then `setEntries(null)` | `{"ok":true,"order":[],"removedAll":true,"foreignSame":true,"foreignIndex":0,"afterLen":1}` | **PASS** — the three host nodes removed, the foreign sibling still the only child, at index 0 |
| **LH-G-32** | §3.2 `F-10` | caller detaches the node, then `activate(key)` | `{"fires":1,"ok":true,"refused":0}` | **PASS** — activation is a caller-semantic event, not a DOM event |
| **LH-G-33** | §3.2 `F-11` (the `ADV-LH-4` refusal half) | `setEntries([{key:'k'}, {key:'k', node:n}])`, no factory, then `close('k')` | `{"refused":["no-node"],"order":["k"],"placedIsN":true,"ok":false,"closes":1,"removedN":true}` | **PASS** — one refusal, **no** `duplicate-key`, the valid occurrence placed and closeable |

### 4.3 §3.3 every-state invariants (`I` family) — 10 rows, all PASS

| Id | Doc section (row) | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **LH-G-34** | §3.3 `I-1` | eight calls spanning every outcome | `[{"i":0,"ok":true,"refused":0,"consistent":true},{"i":1,"ok":false,"refused":1},…8/8 "consistent":true]` | **PASS** — `ok === (refused.length === 0)` on all eight; no "ok with refusals" state |
| **LH-G-35** | §3.3 `I-2` | `render()` with unchanged inputs | `{"removed":0,"sameSeq":true}` | **PASS** — no child mutation, no re-append |
| **LH-G-36** | §3.3 `I-3` | 3 foreign siblings observed across `setEntries` → `setOrder` → `render` → `close` → `setEntries(null)` → `dispose()` | seven snapshots, **all** `f1/f2/f3:true`, `rel:true` (`host` counts `0,2,2,2,1,0,0`) | **PASS** — reference-identical before and after every call, in every state including post-`dispose()` |
| **LH-G-37** | §3.3 `I-4` + §2.2 prohibition 2 | mount observed through a `Proxy`; each caller node through its own property descriptors | `{"nodeCalls":["get:textContent","get:children","set:parent","get:remove","get:parent","get:parent","get:parent","set:parent"],"mountCalls":["get:appendChild","get:appendChild","get:appendChild"],"placed":1,"removedHasN":true}` | **PASS** — **zero forbidden writes** (`setAttribute`/`removeAttribute`/`style`/`className`/`textContent`/`innerHTML`/`classList`/`dataset` never written), and the host's own mount members touched are **only** `appendChild`; the two `set:parent` events are the **shim's** `appendChild` writing `c.parent = this`, not the host. **Bonus observation for §2.4 item 4:** the mount's `children` was **never read** (`mountChildrenReads = 0`) |
| **LH-G-38** | §3.3 `I-5` | place 2, `dispose()`, then `render()` | `{"keys":[],"renderOk":true,"placed":0,"order":0,"nodesStillChildren":true}` | **PASS** — no owned key, no placed-node reference retained; the caller's nodes are still in the mount |
| **LH-G-39** | §3.3 `I-6` + §2.3 item 5 | the same entry observed across `setEntries`/`render`/`setOrder`/`activate` | `{"setEntries":true,"render":true,"setOrder":true,"activate":true,"mountChildIsSameObject":true}` | **PASS** — reference identity for the whole life of the entry, and the mount child **is** that object |
| **LH-G-40** | §3.3 `I-7` (+ the `M-15` witness) | `setOrder(['b','nope','b','a'])`, then an unplaceable mount | `{"r1":{"order":["a","b","c"],"keys":["b","a","c"]},"r2":{"order":["b","a","c"],"keys":["b","a","c"]},"unplaceable":{"order":["a","b"],"placed":0,"parallel":false}}` | **PASS** — `order` is a permutation of the current key set, each key once; and on an unplaceable mount `order` holds while `placed` is `[]`, i.e. **`order.length === placed.length` is NEVER asserted** |
| **LH-G-41** | §3.3 `I-8` + §2.1 totality | 13 constructed shapes × 10-step sequences, plus the 6-method result-shape check | `[{"label":"orderOf-throws","okTrue":true},{"itemFactory-throws",…},{"onActivate-throws",…},{"onClose-throws",…},{"mount-null",…},{"mount-{}",…},{"mount-42",…},{"mount-str",…},{"detached-node",…},{"refused-first-occurrence",…},{"empty-string-key",…},{"dup-key-pair",…},{"non-array-args",…}]` — **all 13 okTrue**, `err` on none; and `LH-G-41b`: all six result-returning methods return exactly `ok\|order\|placed\|refused\|removed` with `okConsistent:true` | **PASS** — **no method threw for any input in the pinned shape set**, and the declared result shape is exact |
| **LH-G-41c** | §2.1 totality clause (the `ADV-LH-1` clarification) | `orderOf: () => { throw }` on the `setEntries` path | `{"ok":true,"order":["a","b"],"refused":[],"placedOk":true}` | **PASS** — the supplied order is used, **no refusal code is invented**, nothing escapes |
| **LH-G-41d** | §2.1 injected-function clause (the three real seams) | throwing `itemFactory` / `onActivate` / `onClose` | `{"factory":{"ok":false,"codes":["factory-returned-null"],"keys":[]},"activate":{"ok":true,"keys":[]},"close":{"ok":true,"closes":1,"keys":[],"removedN":true}}` | **PASS** — all three named safe defaults hold: the factory's throw ⇒ one `factory-returned-null` with the key unowned; `onActivate`'s ⇒ swallowed; `onClose`'s ⇒ swallowed **with the ownership drop standing** and the declared result returned |
| **LH-G-41e** | §3.3 `I-9` | mutate a returned array, then read host state | `{"keysAfterCallerMutation":["a","b"],"renderOrder":["a","b"],"orderArrayIsNewObject":true,"orderNotContainsInjected":true}` | **PASS** — every result array is fresh; a caller mutation cannot reach host state |

---

## 5. §6 / §2.2 / §5.5.1 — the static census rows, the prohibition census and the register rows

### 5.1 §2.1's declared surface and the static/prohibition rows — 5 ids

| Id | Doc section | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **LH-G-42** | §2.1 (*"seven exports, and nothing else"*) + §5.1 row 1 | `Object.keys(await import(module))` **and** an AST declaration census over the file | `{"runtimeKeys":["createOwnedListHost"],"declaredExports":["ListEntry","ListHostRefusal","ListHostResult","ListKey","OwnedListHost","OwnedListHostOptions","createOwnedListHost"],"lineCount":411,"missing":[],"extra":[]}` | **PASS** — **exactly the seven documented exports are declared** (`missing:[]`, `extra:[]`); at runtime only the one value export survives (the four interfaces and two type aliases erase), and `createOwnedListHost` **is** a function |
| **LH-G-43a** | §2.2 prohibitions 1/2/4 (raw census half) | regex token counts over the module file **as text** | `{"forbidden":{"matchMedia":0,"activeElement":0,"getComputedStyle":0,"querySelector":0,"querySelectorAll":0,"closest":0,"getElementById":0,"localStorage":0,"node:fs":0,"electron":0,"fetch":0,"process":0,"createElement":0,"innerHTML":0},"vocab":{"tab":0,"Tab":0,"strip":0,"Strip":0,"pane":0,"zone":0,"region":0,"Region":0,"overflow":0,"selected":0,"active":0},"document":0,"window":0,"writes":{"setAttribute":0,"textContent":0,"className":0,"style":1},"graph":{"dispatch":0,"applyCommand":0}}` | **NOT-BLIND-RUNNABLE** — every count reads clean, but this is a **raw text census over a 411-line heavily annotated file**; it cannot distinguish an identifier from the word in a comment (see §6 `NBR-1`) |
| **LH-G-43b** | §2.2 prohibitions 1/2/4 (AST-classified half) | TypeScript **scanner**: every occurrence in a **CODE position** counted, comment trivia classified separately | `{"code":{"document":0,"window":0,"matchMedia":0,"activeElement":0,"getComputedStyle":0,"querySelector":0,"querySelectorAll":0,"closest":0,"getElementById":0,"localStorage":0,"createElement":0,"innerHTML":0,"setAttribute":0,"removeAttribute":0,"textContent":0,"className":0,"style":0,"dispatch":0,"applyCommand":0,"electron":0,"fetch":0,"appendChild":4,"tab":0,"strip":0,"pane":0,"zone":0,"region":0,"overflow":0,"selected":0,"active":0,"role":0,"aria":0},"commentHits":["style"]}` and the vocabulary sub-recording `{"vocabHits":[],"counts":{…all 0…}}` | **NOT-BLIND-RUNNABLE** — a materially stronger form than `43a` (comments excluded; the single `style` hit lands in comment trivia, and `appendChild` is the one expected code-position identifier at `4`), but the clause is **semantic** (`§2.2` prohibition 1 asks what the module *contains as a symbol/default/constant*) and a scanner census is still not a read (§6 `NBR-1`) |
| **LH-G-44** | §2.4 items 4/5 + §4.4 `S-3`/`S-4` (static row 2) | AST import-declaration census over the module file | `{"importSources":[],"appendChild":4,"remove":23,"dispatch":0}` | **PASS** — the module declares **zero imports** at all, so it imports nothing from `src/renderer/**`/`src/main/**` by construction, and contains no `dispatch` (its `remove` hits are the method/key name and prose, `0` occurrences of the graph seam) |
| **LH-G-45** | §2.2 prohibition 5 (the five-seam negative) + `A-15` | structural censuses: the `RpcMethod` union by AST, `VALID_GROUPS`/`MUTATING_METHODS` by `new Set([...])` literal member count, `ALL_TOOLS` by class-property array initializer length | `{"RpcMethod":21,"RpcMethodNames":["dispatch","renderedHtml","markdown","listTargets","nodeState","load","op","export","validate","teardown","code.get","code.set","code.create","code.delete","code.validate","code.load","code.loadBatch","journal","module.install","module.update","module.list"],"VALID_GROUPS":5,"MUTATING_METHODS":7,"ALL_TOOLS":21}` | **NOT-BLIND-RUNNABLE** — the four counts **agree with the contract exactly** (`21`/`21`, `5`, `7`), but the *other* half of the claim (*"this unit added nothing"*) is a diff against the previous tree, and that is a source read (§6 `NBR-3`) |

### 5.2 §5.5.1's property register — one scenario per row (7 ids), all PASS

| Id | Register row (strategy-id) | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **LH-G-46** | `P-LH-IM-1` (`S-LH-PERM-1`) — the permutation quantification, `YES (bounded)` | exhaustive `S₃` (6) and `S₄` (24) permutation tables, one `setOrder` per permutation, after one `setEntries` | `{"n3":6,"n4":24,"allOk":true,"bad":[]}` | **PASS** — **30/30 permutations hold**: `order` equals the permutation element-wise, `refused` empty, identity preserved per key, `removed` empty. (Bounded form, exactly as the register's `ADV-LH-6` marking claims; the register's own third table — the 3 partial `setOrder` drives for `F-8` — is covered by `LH-G-30`.) |
| **LH-G-47** | `P-LH-IM-2` (`S-LH-IDENT-1`) — identity for every owned key | 2 steps × the shared permutation input family + the 4 identity shapes (caller nodes · factory nodes · a changed node for a repeated key · a factory node beside a node-less key) | `{"step1":{"order":["a","b","f1","f2"],"identity":true},"step2":{"order":["a","b","c","f1"],"identity":true,"factoryCount":3},"keysOnce":true,"keysOrderAgree":true}` | **PASS** — `placed[i]` is the object supplied (or the latest factory return) **by reference**; `keys()`/`order` name every owned key exactly once |
| **LH-G-48** | `P-LH-IM-3` (`S-LH-REPEAT-1`) — a second call performs no child mutation | the fixed 4-shape table (3 caller-node entries · 3 factory entries · 1 entry · empty set) × 2 sequential calls | four records, **all** `{"removed":0,"orderSame":true,"placedSame":true,"childrenSame":true,"freshArrays":true}` | **PASS** — `removed` empty, the mount's `children` reference-identical in element order, `order`/`placed` equal in value, and every returned array **a fresh object** (`I-9`) |
| **LH-G-49** | `P-LH-IM-4` (`S-LH-FOREIGN-1`) — **the strengthened strategy `ADV-LH-5` mandates**: a host that re-appends foreign siblings on every `sync()` must be able to FAIL this row | the 5 documented sequences over a mount pre-seeded with 3 foreign siblings; the mount's `appendChild` and each foreign node's `remove` are counted; the **full child reference sequence** is recorded per step | summaries: `[{"n":1,"appends":2,"foreignAppends":0,"foreignRemoves":0,"hostChildren":2,"finalSeq":"f1,f2,f3,n1,n2","keysAfter":"a,b"},{"n":2,"appends":4,"foreignAppends":0,"foreignRemoves":0,…, "finalSeq":"f1,f2,f3,n2,n1","keysAfter":"b,a"},{"n":3,…,{"n":4,"hostChildren":1,"finalSeq":"f1,f2,f3,n2","keysAfter":"b"},{"n":5,"hostChildren":0,"finalSeq":"f1,f2,f3","keysAfter":""}]` — per-step: 15 snapshots, **all** `foreignIdx:"0/1/2"`, `removedForeign:0` | **PASS** — on all five sequences, at every step: `foreignAppends = 0` and `foreignRemoves = 0` (the **falsifier the row lacked**: a re-appending host would trip it), the foreign triple keeps its exact relative index triple `0/1/2`, `removed` never contains a foreign node, and the host places inside the same mount. The own-node append counts are recorded, not scored (§8 `O-1`) |
| **LH-G-50** | `P-LH-SM-1` (`S-LH-MIXED-1`) — one refused entry among valid ones, per class and per position | for each of the 4 refusal classes: a 3-entry set with one class entry, the class entry rotated through all 3 positions = 12 attempts **⟶ CORRECTED to `8` attempts 2026-09-27 (the DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA‑6 — record `archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`, finding **F‑13**, MED; the as-written `12` is kept visible): the register's own arithmetic and the unit file's `PRE-3` both count `4 × 2 = 8` — per class a **3-entry set** (class entry first) **and** a 4-entry set with the class entry at position 0/1/2/3. `LH-G-52`'s own row was unaffected (`LH-G-50` is ONE scored row), so this file's totals do not move.** | 12 records, **all** `{"ok":false,"refused":"<cls>:<type>","order":"g1,g2","validPlaced":true,"ownershipOk":true,"keys":"g1,g2"}` **⟶ CORRECTED 2026-09-27 (same finding **F‑13**): **8** records, all with the same observed payload — the register drives `8` attempts, not `12`.** | **PASS** — exactly **one** refusal carrying the class's own code, the refused value supplied **verbatim** (`malformed-entry:number` for the `42` key), both valid nodes placed, and the per-class ownership assertion of the corrected statement holds (`duplicate-key` ⇒ the key owned once; the other three ⇒ the refused key absent) |
| **LH-G-51** | `P-LH-SM-2` (`S-LH-SEQ-1`) — the state stays coherent for every step | the 8 documented sequences as literal step data (21 checked steps): `activate` known→unknown · `close` · `remove` · `setEntries([])` after a population · `setEntries(null)` · `dispose()` then `keys()`/`render()`/`setEntries` · `activate` on a detached node's key · a caller-detached node then `close` | `{"steps":21,"bad":[]}` | **PASS** — on all 21 steps `ok === (refused.length === 0)`, every refusal `code` ∈ the **five**-member vocabulary, `keys()` consistent with `order`, and after `dispose()` `keys()` is `[]` while each caller node is still reference-reachable |
| **LH-G-52** | `P-LH-TP-1` (`S-LH-SEED-1`) — the no-throw quantification, `YES (bounded)` | the pinned-seed LCG (`state₀ = 20260927`, `stateₙ₊₁ = stateₙ·1664525 + 1013904223 mod 2³²`), **two LCG steps per attempt**, pool index from the raw state, **64 draws** over a **22-shape pool**, each driving one of the 8 methods; **plus** the explicit 8-method after-`dispose()` sweep | `{"seed":20260927,"draws":64,"attempts":64,"firstDrawNext1":0,"poolSize":22,"errors":[],"shapes":["ListHostResult","ListKey[]","void"],"sweep":[8 × {"err":null}],"sweepErrors":[]}` | **PASS (bounded)** — **72/72 attempts held** (64 draws + 8 sweep methods): nothing threw, every method returned its **declared shape** (`ListHostResult` for the six, `readonly ListKey[]` for `keys()`, `void` for `dispose()`), and `ok === (refused.length === 0)` throughout. **This is a bounded enumeration and is NOT a proof of the unbounded universal** — the register's own marking, reproduced rather than over-read |

---

## 6. NOT-BLIND-RUNNABLE record — 3 rows

**A row is NOT-BLIND-RUNNABLE when settling it requires reading the module's implementation, not
because it failed and not because it was hard.** Each of the three **RAN** and produced a clean
reading; none is counted as a pass.

| Id | Claim | Why it cannot be settled blind (and what the run did observe) |
| --- | --- | --- |
| **NBR-1** (`LH-G-43a`) | §2.2 prohibition 1/2/4 — *"the module's source contains no occurrence of `tab`/`Strip`/`pane`/`zone`/`region`/`document`/`active`/`selected` as vocabulary"*, *"it authors no text/class/style/role/ARIA"*, *"zero store, zero persistence"* | **RAN, clean: 0 for every listed token** and `style` at `1`. But the file is **411 lines of which a large part is narrative** (the contract's own status/annotation apparatus), so a raw text census **cannot** distinguish an identifier from the word in a comment: it is equally consistent with "the module never mentions `style`" and with "the module writes `style` and the one hit is a comment". **The clause is semantic** (a symbol, a default, a documented constant), so settling it needs the module's content, which is the implementation. |
| **NBR-2** (`LH-G-43b`) | the same prohibitions, read at **code positions only** — plus §2.2 prohibition 6's *"the module expands no shim member"* | **RAN, materially stronger and clean:** the AST/scanner census reads **0 at code positions for all 24 forbidden identifiers** (`document`, `window`, `matchMedia`, `activeElement`, `getComputedStyle`, `querySelector`, `querySelectorAll`, `closest`, `getElementById`, `localStorage`, `createElement`, `innerHTML`, `setAttribute`, `removeAttribute`, `textContent`, `className`, `style`, `dispatch`, `applyCommand`, `electron`, `fetch`, `role`, `aria`) and **0** for the eight vocabulary words, with the single textual `style` hit landing in **comment trivia** and `appendChild` the one expected code identifier (`4`). **Still not a pass:** classifying tokens is not reading the module's semantics (a member could be expanded through an alias), and §2.2 prohibition 6's *"no shim member expanded"* half is a source claim this census does not address. |
| **NBR-3** (`LH-G-45`) | §2.2 prohibition 5 / `A-15` — *"**no** new tool, resource, group, `VALID_GROUPS` member, `RpcMethod` member, `MUTATING_METHODS` entry, IPC method … `ALL_TOOLS` **stays 21**; `RpcMethod` **stays 21**"* | **RAN, counts all agree with the contract:** `RpcMethod` **21** (named), `VALID_GROUPS` **5**, `MUTATING_METHODS` **7**, `ALL_TOOLS` **21**, plus the pinned census row `tests/engine-pin-version.test.ts` **5 passed (5)** (count only, not read). **But the claim has a second half** — *that **this unit** added nothing* — which is a **diff of the changed files' content against the previous tree**: a source read. The counts prove the current totals; they cannot prove the unit did not move them. |

---

## 7. The temporary runner — exact paths, and proof of deletion

**Paths used (both temporary, both now deleted):**

- `tests/blind-listhost-greens.tmp.test.ts` — the **57 scenario rows** (§4, §5).
- `tests/blind-listhost-detail.tmp.test.ts` — a **4-test verbatim re-take** of the long observations
  (`LH-G-18`, `LH-G-37`, `LH-G-49`'s summaries *and* per-step sequence, `LH-G-50`) and the
  `LH-G-45` census (including the `RpcMethod` member names), run so the record above could quote them
  in full rather than truncated.

**`git status --porcelain` after deleting both (verbatim):**

```
$ git status --porcelain
 M docs/specs/listhost.md
?? docs/specs/listhost-greens.md
```

**Reading it honestly:** the **only `??` entry is this greens file**, which is the single permanent
artifact of this pass. The ` M docs/specs/listhost.md` entry is **pre-existing** — it was present
in the working tree before this pass began (`git status --porcelain` at the start of the run printed
exactly that one line) and **this pass neither wrote nor reverted it**. Neither temporary runner
appears, so both are gone; `tests/` carries no `tmp` file.

**Scope of the blindness claim, exactly:** `src/shared/owned-list-host.ts` (the unit under test) was
**never opened**. `src/shared/dom-shim.ts` was read as the harness (header item 1), and one discarded
probe leaked seven lines of `src/main/mcp-server.ts` into the transcript (header item 3) — both
disclosed, neither used to derive a scenario. **No `tests/**` file was read at any point**: the
unit's own row file and the pinned census row were **run and counted only** (§2, §3).---

## 8. FAIL rows, recorded observations and ambiguity (reported, not fixed)

### 8.1 FAIL rows — **none**

**This run returned 0 FAIL.** Every scenario the documentation pinned was reproduced exactly. **No
FAIL was converted, and no row was re-scoped to reach a pass.** The three rows whose *semantic*
claim is unreachable blind are in §6, **not** here — they are not passes either.

### 8.2 Recorded observations that are **not** findings

| # | Observation | Why it is not a finding |
| --- | --- | --- |
| **O-1** | **`setOrder` re-places every owned node through the mount's `appendChild`.** `LH-G-49`'s instrumented sequence 2 (`setEntries` → `render` → `setOrder`) records **4** appends for **2** owned nodes, and the per-step sequence shows the owned pair reversing (`f1,f2,f3,n1,n2` → `f1,f2,f3,n2,n1`). The shim's `appendChild` is a **MOVE** (it splices an existing child out and pushes it), so the mount's child order changes through legitimate placement calls. | The contract's re-append prohibition is scoped to **foreign** siblings (`§2.3` item 3: *"a foreign sibling is any child of the mount that the host did not place"*; `M-8`: *"they were never removed or re-appended"*), and the host's own nodes **are** placed by the host. Both **falsifiable** halves hold on all five sequences: **`foreignAppends = 0`** and **`foreignRemoves = 0`**. Recorded because a reader of the register's `P-LH-IM-4` cell could otherwise read "never re-appended" as covering owned nodes too. |
| **O-2** | **§2.4 item 4 / `§4.4 S-3` — *"reordering does not read the tree"* — now has a behavioural witness.** `LH-G-37` observed the mount through a `Proxy`: the host read **`mount.children` zero times** (`mountChildrenReads = 0`; the only mount member it ever touched was `appendChild`). | The clause is a **static** row in the contract (its normative text is `§2.4` item 4, mandated by the stop condition `§4.4 S-3`), which is why `LH-G-37` scores `I-4` and **not** this row. The zero-read observation is **directional evidence toward falsification** — an implementation could read the tree on a path this drive did not take — so it is **recorded, not scored**, and **no static-row pass is claimed from it**. |
| **O-3** | **The five-seam `remove` token count reads `23` while `dispatch` reads `0` and `appendChild` `4`.** | The census counts the **substring** `remove` across a 411-line annotated file, so it necessarily catches `removed`, `remove`, `removeAttribute`-free prose, identifiers and comments. It is recorded so a later reader does not mistake `23` for 23 call sites; **nothing is claimed from it** (and the row it came from, `LH-G-44`, scores on its **import** half only). |
| **O-4** | **The suite's live counts differ from the contract's quoted ones.** This run reads `60` files / **`978` passed / `2` skipped (`980`)**; the unit's own file reads **`62 passed (62)`**; `listhost.md`'s `§3b`-2 record (as *reported* by the adversarial pass) reads `60` files / `971` tests (`969` passed / `2` skipped) and `53/53` rows. | The contract states these as **that pass's own reported numbers, recorded as reported** (`§7` item 11), so **nothing in the contract is contradicted**: the file has grown since (`53/53` → `62/62`, `971` → `980`), which is exactly what a later gate does. Recorded so a documentation reviewer reconciles the counts rather than reading them as drift. |
| **O-5** | **`npm npx`-style tooling is unavailable in this session** — `npx vite-node …` failed with `npm error The operation was rejected … /home/ryanr/.npm` (the npm cache directory is not writable). | The repo's own vitest binary was used instead (`node_modules/.bin/vitest`, §2), which is the same runner `npm test` invokes. **No dependency, no script and no `package.json` change was made** — and no install was attempted. |
| **O-6** | **A discarded probe leaked seven lines of `src/main/mcp-server.ts`** into this session (a `TypeError` stack trace from calling `registeredToolNames()` with no argument). | Disclosed in the header rather than hidden. It concerns a **different** module, disclosed **nothing** about `U-LISTHOST`'s implementation, and **no scenario, drive or expectation here derives from it**. Recorded because the blindness claim should be exact rather than flattering. |

### 8.3 Clauses found ambiguous or under-specified — **reported, not fixed** (no row was invented and no clause edited)

1. **`§2.3` item 3's *"never … re-appended"* is scoped to foreign siblings only, but the register's
   `P-LH-IM-4` statement reads *"every foreign sibling … was never removed or re-appended"* while its
   strategy cell was strengthened to check *"the mount's full child reference sequence per step, or an
   append/re-place counter"*.** Under the strict definition (`§2.3` item 3: a foreign sibling is a
   child the host did **not** place) the two are consistent, and both falsifiable halves hold
   (`O-1`). **The reading that is under-specified:** whether a *place* operation that re-appends an
   **owned** node (as `setOrder` does here, `O-1`) is intended to be **visible** to the strengthened
   row at all — a host whose `sync()` re-appends **everything** (foreign included) and a host that
   re-appends **only its own** nodes produce the same full-sequence change but mean very different
   things. **The contract does not say which of the two the strengthened strategy must be able to
   catch, and this run did not resolve it** — it asserted the foreign half (the contract's own words)
   and recorded the owned half. **Reported for the documentation reviewer; no clause edited.**
2. **`§5.5.1 P-LH-IM-4`'s attempt discipline and this blind run's drive are not the same drive.**
   The register fixes `5` sequences and a per-step assertion set that the **unit's own** test file
   executes; this file re-authorises *equivalent* sequences from the contract text (§5.2). **They
   agree on every falsifiable half** (`foreignAppends = 0`, `foreignRemoves = 0`, unchanged relative
   indices, `removed` never foreign) — but a reader must not read `LH-G-49` as a re-execution of the
   register's own table. **Stated here rather than silently aligned.**
3. **`§2.2` prohibition 1's *"no occurrence"* is a claim about the SOURCE, and the contract's own
   `ADV-LH-11` note records that *"the six static rows are source-based"*.** This run's two censuses
   are the strongest forms reachable without reading, and they read clean (`NBR-1`/`NBR-2`). **The
   ambiguity is in what "occurrence" means**: the raw reading counts the word *anywhere* (comments
   included, `style` = 1), the AST reading counts **code positions only** (`style` = 0). **The
   contract does not say which form the static row is written in**, so a later blind writer cannot
   tell whether the raw `style` hit is a violation or an artefact. **Reported; no clause edited.**
4. **`M-15`'s key-set sentence vs `F-7`'s "supported no-op" wording.** `M-15` says *"`keys()` still
   reports the **current** keys"* and `F-7` says the absent mount is *"a **supported no-op
   configuration**"*. My first reading of `M-15` (that a `close` on an unplaceable host is itself a
   no-op and the key survives) is **not** what the module does — `close` drops the key regardless of
   placeability (`LH-G-15`: `keys` `[]` after `close('b')`; the `mount:undefined` variant's `keys()`
   is `['a']`). **The contract's own text is decidable** (`M-15` pins `keys()` to the *current* key
   set, and *"no-op"* there means *"nowhere to place"*, not *"no state change"*), so this is recorded
   as **my first reading being wrong**, not as a doc defect — but the phrase *"every operation a
   no-op"* invites exactly that misreading, and a footnote would prevent it. **Reported; no clause
   edited.**
5. **`§5.5.1`'s pool inventory vs its pool count** — the register itself records that its cell list
   names `20` shapes while the executed pool holds `22`, and that the `ADV-LH-7` correction pass
   changed *which* two members are the omitted ones. **This blind run did NOT re-derive that
   inventory** (`LH-G-52` drives `22` shapes of its **own** construction, from the contract's own
   listed members, and does not claim to match the unit's executed pool member-for-member). **Stated
   so `LH-G-52` is not read as an audit of that inventory** — the contract leaves it to the
   documentation review, and this record does not resolve it.

---

## 9. What the unit's DONE row may and may not rest on

**May rest on — independently reproduced in this blind run, on this tree:**

- **the whole `§3` row set, driven from documentation alone through the module's public surface**:
  the valid states `M-1`…`M-21` (`LH-G-01`…`LH-G-21`), the refusals `F-1`…`F-11`
  (`LH-G-22`…`LH-G-33`) and the every-state invariants `I-1`…`I-9` (`LH-G-34`…`LH-G-41e`) —
  **51 rows, 0 FAIL**, including the contract's hardest claims: the `V-7` foreign-sibling hard row
  (`LH-G-08`, `LH-G-36`, `LH-G-49`), the five-code refusal vocabulary, the `ADV-LH-4` ACCEPTANCE rule
  (`LH-G-19`, `LH-G-33`), `dispose()`'s ruled **reading (a)** (`LH-G-14`), the empty-string/opaque-key
  rule (`LH-G-18`), and the three injected-function safe defaults (`LH-G-41d`);
- **all seven `§5.5.1` register rows, exercised by one scenario each** (`LH-G-46`…`LH-G-52`), with
  **every asserted claim holding** — including the strengthened `P-LH-IM-4` falsifier
  (`foreignAppends = 0`, `foreignRemoves = 0`) and the bounded `P-LH-TP-1` enumeration
  (**72/72 attempts held**, declared shapes exact);
- **the declared surface**: exactly the seven `§2.1` exports declared, `missing:[]`, `extra:[]`
  (`LH-G-42`), and the module declares **zero imports** (`LH-G-44`);
- **the corroboration legs, on one tree**: node suite `60` files / `978` passed / `2` skipped;
  the unit's own row file **`62 passed (62)`** (count only, never read); the pinned census row
  `tests/engine-pin-version.test.ts` **`5 passed (5)`** (count only, never read).

**May NOT rest on:**

- **any `§2.2` prohibition as a settled static row** — `NBR-1`/`NBR-2` read clean but are censuses,
  not the semantic source read the clauses ask for; **prohibition 5's "this unit added nothing" half
  is `NBR-3`** (the counts agree; the *diff* was not taken);
- **the optional `§5.2 [U]` real-DOM identity/reorder row** — **not taken** (no `ui` leg, no
  divergence leg ran); **no real-DOM, layout, paint, focus or geometry claim may be made from this
  record**, and a node green is never a real-DOM green;
- **any assembled-app, IPC-layer or MCP-transport claim.** `[H]` here is this repo's own pure
  `src/shared/` module, **imported by no `src/**` file**; nothing in this run booted a window,
  exercised a transport or touched the engine;
- **any magnitude-equivalence claim** (ruling 7/§7 item 4): nothing here says the graph's child order
  changed, and nothing equates *"one visible item"* with any graph op;
- **`P-LH-TP-1` as a proof of *"for every input, no method throws"*** — it is `YES (bounded)`:
  `72` attempts over a finite pool, reproduced here exactly at that scope;
- **the register's executed pool's member-for-member inventory** (`§8.3` item 5) — this run drove its
  own `22`-shape pool built from the contract's listed members, and claims nothing about the unit
  file's own `TP_POOL`.

**One-line layer honesty:** *54 node-layer `[T]`/`[H]` scenario rows reproduced from the
documentation alone against `src/shared/owned-list-host.ts` over the repo's `dom-shim`, with
0 FAIL and 3 source-semantic rows declared NOT-BLIND-RUNNABLE — a node green, never assembled-app
evidence.*
