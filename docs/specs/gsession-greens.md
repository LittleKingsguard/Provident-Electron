# Green Scenarios — `U-GSESSION` (the node-local interaction session) — **blind run**

**Status: `BLIND RUN (one pass) — 77 executed scenario rows: 66 PASS / 2 FAIL / 9 NOT-BLIND-RUNNABLE`.**

**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS — dated `⟶ CORRECTED` annotations only; THE RUN'S OWN BYTES AND NUMBERS ARE NOT REWRITTEN, because this is a HISTORICAL one-pass blind record and its observed values are that pass's measurements at HEAD `8cc0743`):** **FOUR of this artifact's figures were superseded by later passes and each is annotated AT ITS OWN SITE below, with the superseded form kept visible — (1) `§5`'s and `§5.1`'s *"`58` (`20`×`3` less `2`)"*, the mis-arithmetic `ADV-GS-8`/`-11` corrected in the spec to *"less `1`"* (the declared `58` does NOT move); (2) *"the four `YES (bounded)` rows"* at `§5.1` and `§11`, where the register's bounded set is **FIVE** rows since `ADV-GS-25` marked `P-GS-IM-2`; (3) the two `FAIL` rows' STATUS — `GS-G-50` and `GS-G-70` are **BOTH CLOSED IN THE SPEC** (`D-3` landed: `§2.1`'s `detachGestureListeners` return sentence is corrected, and `§5.5.1 P-GS-IM-3`'s declared code map is corrected to the normative `§2.3` item 7.3 with the superseded half deleted under a dated tombstone), so the unit is doc-clean on the two drifts this artifact found; and (4) the artifact's own suite/row figures (`65` files / `1326` tests; the unit's own file at `77` rows) — the CURRENT figures on this tree are `65` files / **`1336`** tests — **`1334` passed / `2` skipped** — with the unit's file at **`87`** rows, the `+1` unit row being the `DIS-1` discard-shape row that landed after this run. **THE BLIND RUN'S OWN SCORING IS UNCHANGED: `77` = `66` PASS / `2` FAIL / `9` NOT-BLIND-RUNNABLE, register `396` declared / `397` measured / `389` held / `6` broken at that tree state. A reader taking the CURRENT state must also read `docs/specs/gsession.md` `CURRENT STATE` and `§3b.6`'s row 5a.**

**No FAIL was converted, no row was re-scoped to reach a pass, no row was softened, and no
`NOT-BLIND-RUNNABLE` row was scored as a pass.**

| | |
| --- | --- |
| **Unit** | `U-GSESSION` — the node-local interaction session (ledger row `E6`; `SCH-2` ADOPTED-RESHAPED, `A-d3`) |
| **Wave** | **E** (`E6`; the architect approved this unit landing **before** `E3`/`E4`, which compose it — `§0` ruling 14) |
| **Gate** | **5 — the blind green-scenario pass** (`AGENTS.md` item 10a / RCA-4) |
| **Date (filing calendar)** | **2026-09-27**. The host clock reads **2026-09-26** (`date -u` → `Sat Sep 26 03:30:54 AM UTC 2026`) during this work — the same host-clock-vs-filing-calendar offset the sibling greens records note (`docs/specs/projection-greens.md`). **Cite the filing date.** |
| **Tree state (HEAD)** | **`8cc0743`** — `U-GSESSION gate 3 GREEN: module landed (549 lines, 12 exports: 4 value + 8 type) + capture-method ruling landed …`, on `main`, no other branch. Tracked files matching `tests/gesture-session*` / `src/shared/gesture-session*`: **the module + the red set, in `HEAD`, unmodified by this pass** (`git diff --stat HEAD -- src/shared/gesture-session.ts tests/gesture-session.test.ts docs/specs/gsession.md` prints **nothing**). |
| **Working tree** | Before this pass: **clean**. After it: the **14 temporary runner files this pass created are DELETED** (§10) and the **only** untracked file left is **this artifact**. |
| **Authored from** | **THE DOCUMENTATION ONLY.** `src/shared/gesture-session.ts` was **NEVER READ** — it was imported as a **black box** and exercised through the exported surface. `tests/gesture-session.test.ts` (the unit's red set) was **NEVER READ** — it was **RUN three times for its COUNT ONLY** (§3). |
| **Runner** | **`tests/gs-blind-greens.tmp.test.ts`** (the 77 scored rows) + **13 short-lived diagnostics** (`tests/gs-blind-diag{,2,…13}.tmp.test.ts`) — **all 14 DELETED** (§10) |

**Authored and run WITHOUT reading the implementation.** The documentation read to derive every scenario
was: **`docs/specs/gsession.md`** in full — the `CURRENT STATE` block, **§0** (the fourteen rulings),
**§0A** (the twelve dated ruling notes), the Layer declaration and its five honesty anchors, §1 (the nine
scope items), **§2.1** (every exported name, signature, return shape — the four value exports, the eight
type declarations, the `BeginResult`/`TerminalResult`/`DisposeReport`/`GestureCode`/`SessionStats`/
`GestureStats` shapes, the four pinned type constants, and the delegate clause), **§2.2** (the ten
prohibitions P-1..P-10 and the caller-supplied list), **§2.3** (items 1–8: attachment, the gesture window,
one gesture at a time, the four terminals with their commit counts, the commit-is-the-session's-call rule,
the capture table, dispose, the four-state machine), **§2.4** (items 1–8: opaque events, identity, one
gesture per session, monotonic ids, connectivity, unusable sources, values never validated, nothing
survives a gesture), **§2.5** (the eleven-item delegate list), **§2.6** (the seven sibling properties and
the `F-11`/`F-12` split), **§3.1** `M-1`..`M-17`, **§3.2** `F-1`..`F-12`, **§3.3** `I-1`..`I-13`,
**§3.4** `R-1`..`R-9`, **§3.5** `R-10`/`R-11`, §4.1–§4.5 (incl. the `S-1`..`S-9` stop conditions),
**§5.1**, **§5.2** (the four legs and the `[U]`/`[D]` refusals), **§5.3** items 1–11, **§5.5**/**§5.5.1**
(the 11-row typed register and its strategy discipline), **§5.5.2** (the honesty block and the
pool-versus-boundary check), **§5.5.3** (the attempt arithmetic), §6, **§7** items 1–15, **§7a**/**§7a.1**
(the five architect questions and their adoption), the **ARCHITECT APPROVAL** block, §8 (the citation
index), **§3a** (the 17 adversarial seeds) and **§3b** (the disposition vocabulary); plus
`docs/specs/projection-greens.md` (the **house style only** — a different unit), `package.json`,
`vitest.config.ts` (to construct a runnable runner), and `AGENTS.md`.

**Files NOT read to derive any scenario's content — recorded so the blindness claim is exact:**

1. **`src/shared/gesture-session.ts` was never opened, never read, never printed.** It was imported as a
   **black box** (`await import('../src/shared/gesture-session.js')`) and exercised through the exported
   surface `§2.1` names: `createGestureSession`, `installGestureListeners`, `detachGestureListeners`,
   `POINTER_TYPES`. **The one thing this pass learned about the module's own bytes it learned from the
   spec's own amendment** — the capture-method ruling (`§2.3` item 6, the RULED 2026-09-27 block) says the
   session calls **"a method the SOURCE supplies (named by the source, discovered by the session from its
   own supplied surface)"** — and the **name** of that capability was then discovered **black-box**, by
   handing the session a `Proxy` source and recording which non-DOM property names it touched
   (`GS-G-67`: exactly one, **`capturePointer`**; the module itself names no DOM capture method).
2. **`tests/gesture-session.test.ts` (the unit's red set) was never read** — no assertion, row id, fixture
   or message of it was inspected. It was **RUN three times for its count only** (§3) with the output
   filtered to the two summary lines, and **no scenario, drive or expectation here was derived from it**.
3. **No other `src/**` file was read**; `src/**` and `src/renderer/**` were only **probed** (existence,
   `git diff --name-only`, a file-name census) for `R-7`'s static row.
4. **The probes that did read text** read **`docs/next-steps.md`** (an `R-11` precondition probe: does the
   extended divergence harness deliverable exist / is it cited) — **not used to author any scenario's
   content** — and the runner executed **`git status --porcelain` / `git diff --name-only`** for `R-7`.

**The temporary runners.** The scenarios were authored and executed through **temporary** vitest files
inside the repo — **`tests/gs-blind-greens.tmp.test.ts`** (the 77 scored rows) plus **13 short-lived
diagnostics** — and **all fourteen are DELETED**; the artifact is this file, not the runner (§10).

---

## 1. Layer declaration — exactly what this run proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own vitest (`vitest` from `package.json`) under node **v24.20.0**, plus **fake recording sources built inside the runner** (`§2.1`'s injected `EventSource` shape) | a browser; the assembled app; the engine |
| **[H]** | host-side | this unit's own `src/shared/gesture-session.ts`, **imported as a black box** — its documented surface only | engine-internal behaviour |
| **[S]** | static/structural | file/git probes the blind rule permits (existence, a unit-owned file-name census, `git status --porcelain`, `git diff --name-only 33a011d HEAD`) | a semantic source read of the module |
| **[U]** | real-DOM `ui` leg | **NOT OFFERED BY THE UNIT** (`§5.2`: the module has no importer and reads no coordinate) — **not taken** | — |
| **[D]** | divergence harness | **NOT CLAIMED** (`F-12` is `PRECONDITION-GATED` on `U-DIVERGENCE-EXT`, row `C2`) — **not taken** | — |

**Honesty anchors, carried so no row over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** No window was
   booted, no IPC round-trip ran, no MCP transport was exercised, and **no real DOM was touched**.
2. **The element and the event source in every row are CALLER-SUPPLIED OBJECTS, not DOM nodes.** No shim
   member, no `document`, no real `Element` appears anywhere in this run — the whole surface is arguments
   (`§2.2`'s caller-supplied list).
3. **Every row asserts the CALLS the session made against the injected source, never a fact about a
   browser's listener table** (layer anchor 5; the gate record's listen-removal limit). A "listener
   count" here is a count of recorded `on`/`off` invocations.
4. **The property register (`§5.5.1`) is exercised here as this unit's own property layer** — every
   register row is `[T]` work over injectable arguments, so §5 records **measured counts**, not design
   cells.
5. **No rendered-geometry, coordinate, layout, paint or click-retargeting claim is made anywhere in this
   file** — and **no pass may read this run as one** (`§0` ruling 7, `I-11`, `R-8`).
6. **The `[U]` row was not taken and the `[D]` row was not claimed** — and neither was silently moved.

---

## 2. Exact commands (as run)

```bash
node_modules/.bin/vitest run tests/gs-blind-greens.tmp.test.ts        # the 77 scenario rows (final run)
node_modules/.bin/vitest run tests/gs-blind-greens.tmp.test.ts -t '<row name>'   # per-row re-runs while correcting checker defects
node_modules/.bin/vitest run tests/gs-blind-diag{,2..13}.tmp.test.ts  # 13 diagnostics (fixture/identity/log-shape isolation)
node_modules/.bin/vitest run                                          # the node suite (COUNT ONLY)
node_modules/.bin/vitest run tests/gesture-session.test.ts            # the unit's OWN row file (COUNT ONLY — never read)
git status --porcelain                                                # R-7's working-tree probe (uncommitted paths)
git diff --name-only 33a011d HEAD                                     # R-7's committed-range probe (gate-2 baseline → HEAD)
```

**Runner / stack:** Node **v24.20.0**; vitest **v5.0.1** as declared in `package.json`; `git HEAD`
**`8cc0743`**. **The fourteen temporary runner files were the only files this pass created, and all
fourteen are deleted (§10).**

---

## 3. Run counts (the run's arithmetic)

| Leg / artifact | Command | Verbatim result | Exit |
| --- | --- | --- | --- |
| the scenario set (§4), **final run** | `vitest run tests/gs-blind-greens.tmp.test.ts` | **`Test Files 1 passed (1)`** · **`Tests 75 passed (75)`** (75 vitest cases carrying the 77 scored rows; the `ZZ-summary` case carries the totals) | `0` |
| the scenario set's own verdict line | (printed by the runner) | `GSSUMMARY {"scenarios":77,"pass":66,"fail":2,"nbr":9,"failingIds":["GS-G-50","GS-G-70"],…}` | — |
| the unit's own row file, **COUNT ONLY, never read** | `vitest run tests/gesture-session.test.ts` | **`Test Files 1 passed (1)`** · **`Tests 87 passed (87)` *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; the as-run `77 passed (77)` is kept visible): the unit's own row file now carries `87` rows — the closure's row additions plus the `DIS-1` discard-shape row, which landed after this run — so `87 passed (87)` is the CURRENT count. THIS RUN scored `77` scenario rows of ITS OWN and that figure is unchanged.**)*** | `0` |
| node suite `[T]`, **while the 14 temp files existed** | `vitest run` | **`Test Files 79 passed (79)`** · **`Tests 1420 passed \| 2 skipped (1422)`** | `0` |
| node suite `[T]`, **with the 14 temp files moved aside** | `vitest run` | **`Test Files 65 passed (65)`** · **`Tests 1324 passed \| 2 skipped (1326)`** *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; this run's own reading is kept visible): the LIVE suite on this tree is `65` files / **`1336`** tests — `1334` passed / `2` skipped / `0` failed. This run's `1326` is its HEAD-`8cc0743` measurement and the `1335`-test closure set between the two is a THIRD date set; all three are provenance and none may be quoted for another (`docs/specs/gsession.md` `§3b.6` rows 4/5/5a).)*** | `0` |
| the unit's own red set, **COUNT ONLY, never read — re-run with the diagnostics deleted** | `vitest run tests/gesture-session.test.ts` | **`Test Files 1 passed (1)`** · **`Tests 87 passed (87)` *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; the as-run `77 passed (77)` is kept visible): the unit's own row file now carries `87` rows — the closure's row additions plus the `DIS-1` discard-shape row, which landed after this run — so `87 passed (87)` is the CURRENT count. THIS RUN scored `77` scenario rows of ITS OWN and that figure is unchanged.**)*** | `0` |
| node suite `[T]`, **final tree state** (the runners deleted; this artifact present and uncommitted) | `vitest run` | **`Test Files 65 passed (65)`** · **`Tests 1324 passed \| 2 skipped (1326)`** *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; this run's own reading is kept visible): the LIVE suite on this tree is `65` files / **`1336`** tests — `1334` passed / `2` skipped / `0` failed. This run's `1326` is its HEAD-`8cc0743` measurement and the `1335`-test closure set between the two is a THIRD date set; all three are provenance and none may be quoted for another (`docs/specs/gsession.md` `§3b.6` rows 4/5/5a).)*** — **identical to HEAD's recorded state** | `0` |
| **this record** | all of the above | **77 rows — 66 PASS / 2 FAIL / 9 NOT-BLIND-RUNNABLE** | — |

**The row arithmetic, so it closes — 77 scored rows = 66 PASS + 2 FAIL + 9 NOT-BLIND-RUNNABLE:**

| Group | Ids | Rows | PASS | FAIL | NBR |
| --- | --- | --- | --- | --- | --- |
| §3.1 valid/happy states (`M-1`..`M-17`) | `GS-G-1`..`GS-G-17` | 17 | 17 | 0 | 0 |
| §3.2 documented fail-states (`F-1`..`F-11`, `F-9c`) | `GS-G-18`..`GS-G-30` | 12 | 12 | 0 | 0 |
| §3.3 every-state invariants (`I-1`..`I-13`) | `GS-G-31`..`GS-G-46` | 16 | 16 | 0 | 0 |
| §2.1/§2.3/§2.4/§2.5 surface, capture, state machine, prohibitions, count seam | `GS-G-47`..`GS-G-57` | 11 | 11 | 0 | 0 |
| §3.4/§3.5 static + existence rows | `GS-G-58`..`GS-G-66`, `GS-G-74`, `GS-G-75` | 11 | 2 | 0 | **9** |
| §5.5.1 register rows (11 rows, one scenario each) | `GS-G-68`..`GS-G-73`, `GS-G-76`..`GS-G-80` | 11 | 10 | **1** | 0 |
| **total** | | **77** | **66** | **2** | **9** |

**Notes so the id sequence is not read as drift:** the ids are **not** contiguous — `GS-G-21`, `-22`, `-23`
and `-58`..`-66` are **not** extra M/F rows: the `M`/`F`/`I` families were laid out with deliberate gaps
(`F-1`..`F-11` carry `GS-G-18`..`GS-G-30`; `GS-G-21`..`-23` were reserved for `F-9(b)`, `F-12` and the
`§2.1`-surface split, which landed at `-75`, no row, and `-29` respectively) so that **later additions
never renumber an existing row**. **No existing row id, verdict or observed value moved after its first
run.**

**The two `FAIL`s are §7.1 (`GS-G-50`) and §7.2 (`GS-G-70`) — both attributed to DOC/SPEC DRIFT, neither to
the module under its own governing clause.** A **self-verified greens set is a review finding** (`RCA-4`):
this record is the **independent** half, authored and run by an agent that never read the module and never
read the red set.

---

## 4. The scenarios

`Doc clause` cites the contract **by section and row id** (never by line number). The `Observed` column
quotes the runner's verbatim `console.log` payload for that id — JSON as printed, **abridged with `…` only
where the payload is long**, every fragment a verbatim prefix of what printed. Where a payload is
abridged, the verdict sentence states the asserted values the abridged tail carried (the runner asserted
them; each row's `check()` is the contract-derived expectation).

### 4.1 §3.1 valid / happy states (`M` family) — 17 rows

| Id | Doc clause (row) | Drive (exact) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **GS-G-1** | §3.1 `M-1` / §2.3 item 1(a) | recording source; `install(elA)`; `install(elB)` | exactly TWO `on` calls, both `'pointerdown'`, one carrying `elA` and one `elB` **by identity**, no foreign element; both installs `true` | `{"i1":true,"i2":true,"onCalls":2,"types":["pointerdown","pointerdown"],"stats":{"installed":2,"sourceCalls":2,…}}` | PASS |
| **GS-G-2** | §3.1 `M-2` / §2.3 item 1(d) / §2.4 item 1 | fire the recorded `pointerdown` handler with a **`Proxy` event whose `get`/`has`/`getOwnPropertyDescriptor` traps throw** | one gesture, id `1`, active, `outcome:null`, `commits:0`; `onStart` ran once with **the element**; the hostile event changes nothing | `{"gestures":1,"id":1,"active":true,"outcome":null,"commits":0,"onStartCalls":1,"onStartArgIsElement":true,"onStartArgCount":1,"gestureStatsKeys":["active","id","outcome","value","commits"]}` | PASS |
| **GS-G-3** | §3.1 `M-3` / §2.4 item 7 / §2.3 item 4 (final-value rule) | `set({k:1})` / `set(Symbol)` / `set(undefined)` then `end`; three terminals | `commit` receives the value **by identity / `Object.is`**; nothing coerced, copied or frozen; three commits, `committed:true` | `{"commits":3,"v1IsObj":true,"v2IsSym":true,"v3IsUndefined":true,"commitValues":["obj","sym","obj"],"committed":[true,true,true],"outcome0":"end"}` | PASS |
| **GS-G-4** | §3.1 `M-4` / §2.3 items 4,5 | begin (via the start listener) → `pointermove` → `pointerup` | `commit` **exactly once**; `stats().commits === 1`; `outcome:'end'`; handle inactive; `gesture()` null; the three tracking `off`s once each | `{"commits":1,"statsCommits":1,"outcome":"end","handleActive":false,"statsActive":false,"gesture":null,"offCounts":{"move":1,"up":1,"cancel":1}}` | PASS |
| **GS-G-5** | §3.1 `M-5` / §2.4 item 8 / §0A note 8 | two full sequences on one element | ids `1` then `2`; two commits; the second handle's value is `undefined` regardless of the first | `{"id1":1,"id2":2,"secondValue":"undefined","commits":2,"gestures":2}` | PASS |
| **GS-G-6** | §3.1 `M-6` / §2.3 item 2 / §0A note 11 | ordered call log across `install` → `begin` → `move` → `up` | `on(pointerdown)`; then `isConnected`, `on(move)`, `on(up)`, `on(cancel)`; then `off(move)`, `off(up)`, `off(cancel)` — **in that order** | `{"afterInstall":["on:pointerdown"],"afterBegin":["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel"],"afterEnd":["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","off:pointermove","off:pointerup","off:pointercancel"],"liveOn":1}` | PASS |
| **GS-G-7** | §3.1 `M-7` / §2.3 item 6 | `{capture:true}` on `elA`, `{}` on `elB`; establish each | **exactly ONE** capture call, on `elA`, **after** the three tracking `on`s; ZERO for `elB` | `{"captureCalls":1,"captureElementIsA":true,"logAfterBeginA":["on:pointerdown","on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","capturePointer"],"listenerEntries":["on:pointerdown","on:pointerdown","on:pointermove","on:pointerup","on:pointercancel"],"capsAfterBoth":1}` | PASS |
| **GS-G-8** | §3.1 `M-8` / §2.3 item 6(a)/(b) | `capture:'yes'` (truthy) and `capture:0` (falsy) | the truthy control gets **one** capture call; the falsy one gets **zero** | `{"captureCalls":1,"element":"A"}` | PASS |
| **GS-G-9** | §3.1 `M-9` / §2.3 item 4 / §0A note 4 | `begin` then fire the recorded `pointercancel` handler | `commit` **zero** times; `onCancel` once; gesture gone; tracking detached; **the start listener remains** | `{"commits":0,"onCancelCalls":1,"gesture":null,"offStart":0,"liveOn":1,"stats":{"installed":1,"sourceCalls":8,"gestures":1,"commits":0,…}}` | PASS |
| **GS-G-10** | §3.1 `M-10` / §2.3 item 4 (final-value rule) | `end` with no `set` at all, then with `set(undefined)` | two gestures, two commits, **both receiving `undefined`**, `committed:true` both times | `{"commits":2,"values":["undefined","undefined"],"results":[{"ok":true,"code":"ok","committed":true},{"ok":true,"code":"ok","committed":true}]}` | PASS |
| **GS-G-11** | §3.1 `M-11` / §2.3 item 2(c) / §0A note 11 | `begin`; **inside `onCancel`** read the call log | at the moment `onCancel` runs the log **already contains the three `off`s** | `{"logInHook":["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","off:pointermove","off:pointerup","off:pointercancel"],"commits":0}` | PASS |
| **GS-G-12** | §3.1 `M-12` / §2.3 item 4 / §0A note 6 | `begin`, `set(userValue)`, `reset(el, handle, suppliedDefault)` | `commit` **once** with the **supplied** value; `outcome:'reset'`; `committed:true` | `{"commits":1,"valueIsSupplied":true,"outcome":"reset","terminal":{"ok":true,"code":"ok","committed":true},…}` | PASS |
| **GS-G-13** | §3.1 `M-13` / §2.3 item 7 / §0A note 3 | install `elA`, `elB`; establish on `elA`; `dispose()`; `dispose()` again | first: 0 commits, `onCancel` once, **5 detaches** matched pairwise (`4` from the gesture element + `1` from the other), `{removed:5,complete:true}`; second: zero source calls, `{removed:0,complete:true}` | `{"d1":{"removed":5,"complete":true},"d2":{"removed":0,"complete":true},"commits":0,"onCancelCalls":1,"offCountByElement":{"A":4,"B":1},"liveAfter":[0,0],"disposed":true}` | PASS |
| **GS-G-14** | §3.1 `M-14` / §2.4 item 5 | an `isConnected` seam returning `true`, then one returning `undefined` | both `begin` calls succeed and attach the three tracking listeners; `isConnected` called **exactly once per attempt** | `{"trueSeam":{"ok":true,"ons":4,"isConn":1},"undefinedSeam":{"ok":true,"ons":4,"isConn":1}}` | PASS |
| **GS-G-15** | §3.1 `M-15` / §0A note 12 / §2.1 `stats` | the `M-4` sequence, then `M-9`, then `M-12` | `gestures:3`, `commits:2`, `active:false`, `gestureId:0`, `lastCode:'ok'`; `sourceCalls` equals the recorded `on`+`off`+`isConnected` entries | `{"stats":{"installed":1,"sourceCalls":22,"gestures":3,"commits":2,"active":false,"gestureId":0,"lastCode":"ok"},"recorded":{"on":10,"off":9,"isConnected":3,"capture":0,"total":22}}` | PASS |
| **GS-G-16** | §3.1 `M-16` / §0 ruling 11 / §1 item 6 (`MULTI-GRAPH-ISOLATION`) | `sessionA.install(elX)`; `sessionB.begin(elX)` | `sessionB.begin` returns `{ok:false,code:'not-installed'}` with **zero** source calls; `sessionA` unaffected | `{"installA":true,"beginB":{"ok":false,"code":"not-installed"},"bSourceCalls":0,"aStats":{"installed":1,"sourceCalls":1,"gestures":0,"commits":0,"active":false,"gestureId":0,"lastCode":"ok"}}` | PASS |
| **GS-G-17** | §3.1 `M-17` / §2.1 `gesture()` / §2.4 item 8 | read `gesture()` before, during and after a gesture | `null` · a `GestureStats` (`active:true`, live id, `outcome:null`, `commits:0`) · **`null` again** after the terminal, with the facts readable through `stats()` | `{"before":null,"afterInstall":null,"during":{"active":true,"id":1,"outcome":null,"value":"[undefined]","commits":0},"after":null,"stats":{"commits":1,"active":false,…}}` | PASS |

### 4.2 §3.2 documented fail-states (`F` family) — 12 rows

| Id | Doc clause (row) | Drive (exact) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **GS-G-18** | §3.2 `F-1` / P-1 / P-7 / `R-1` / §4.4 `S-1` | an options object carrying `selectors`, `threshold`, `data-zone`, `paneCollapseToggle`, an `addEventListener`-shaped field — vs the same install **without** them | the fields are **IGNORED**: the hostile-options session is behaviourally identical to the clean one | `{"cleanLog":["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","capturePointer","off:pointermove","off:pointerup","off:pointercancel"],"hostileLog":[…identical…],"identical":true,…}` | PASS |
| **GS-G-19** | §3.2 `F-2` / §2.3 item 3 / §2.4 item 3 | `begin(elA)` then `begin(elA)` and `begin(elB)` while `elA` is active | both second calls `{ok:false,code:'busy'}`; **zero extra source calls**; the active gesture untouched; listener count still `4` | `{"secondBegin":{"ok":false,"code":"busy"},"crossControl":{"ok":false,"code":"busy"},"extraSourceCalls":0,"activeId":1,"activeValue":"KEEP","commits":0,"onsOnA":4}` | PASS |
| **GS-G-20** | §3.2 `F-3` / §0A note 11 / §2.3 items 4,5 / `I-3c` | (a) `onMove` throws; (b) `onEnd` throws; (c) `commit` throws | each throw **propagates**; in every case the tracking three are **already detached** and the gesture inactive; (c) still counts as the gesture's **ONE** commit and is never retried | `{"onMoveThrows":{"propagated":"onMove hostile","offs":3,"active":false,"commits":1},"onEndThrows":{"propagated":"onEnd hostile","offs":3,"active":false,"commits":1},"commitThrows":{"propagated":"commit hostile","offs":3,"active":false,"commits":1,"callbackCalls":1}}` | PASS |
| **GS-G-24** | §3.2 `F-4` / §2.4 item 4 | `begin`(id1) → `end` → `begin`(id2) → terminals carrying the **id-1 handle**; and an element mismatch | all four refusals `{ok:false,code:'stale',committed:false}`; **nothing committed**; the id-2 gesture **still active** with its value | `{"results":{"end":{"ok":false,"code":"stale","committed":false},"reset":{…},"cancel":{…},"mismatch":{…}},"commits":1,"stillActive":true,"activeId":2,"activeValue":"LIVE"}` | PASS |
| **GS-G-25** | §3.2 `F-5` / §2.3 item 4 (the `no-gesture` row) | `end`/`reset`/`cancel` while idle (installed, no gesture) | all three `{ok:false,code:'no-gesture',committed:false}`; zero commits; **zero source calls** | `{"end":{"ok":false,"code":"no-gesture","committed":false},"reset":{…},"cancel":{…},"commits":0,"sourceCallDelta":0}` | PASS |
| **GS-G-26** | §3.2 `F-6` / §2.3 item 1(c) / `M-16` | `begin(elZ)` on a fresh session | `{ok:false,code:'not-installed'}`; zero source calls; nothing recorded | `{"begin":{"ok":false,"code":"not-installed"},"sourceCallDelta":0,"stats":{"installed":0,"sourceCalls":0,"gestures":0,"commits":0,"active":false,"gestureId":0,"lastCode":"not-installed"}}` | PASS |
| **GS-G-27** | §3.2 `F-7` / §2.4 item 5 | `isConnected(el)` returns exactly `false` | `{ok:false,code:'disconnected'}`; **NO** tracking listener attached (the log shows only the `isConnected` call); no gesture; `onStart` does not run; no capture | `{"begin":{"ok":false,"code":"disconnected"},"log":["on:pointerdown","isConnected"],"ons":1,"onStartCalls":0,"commits":0,"capture":0,"stats":{"sourceCalls":2,"gestures":0,…}}` | PASS |
| **GS-G-28** | §3.2 `F-8` / §2.4 item 6 / §2.3 item 7(4) / §0A note 9 | the seven unusable/throwing source shapes: `createGestureSession(undefined)`, `{source:undefined}`, `{source:42}`, `{source:{}}`, `{source:null}`, a source whose `on` throws, whose `off` throws, whose `isConnected` throws | construction **never throws**; unusable: `install` `false` with no source call, `begin` `'not-installed'`, `stats()` zeros; a throwing `on` leaves **no ledger entry**; a throwing `isConnected` is swallowed and the gesture **PROCEEDS**; a throwing `off` yields `{removed:0,complete:false}` with the detach attempted | `{"cases":[{"label":"undefined-options","constructed":true,"install":false,"beginCode":"not-installed","end":{"ok":false,"code":"no-gesture","committed":false},"stats":{"installed":0,…}},…],"}` — with `source-on-throws` `install:false` / `beginCode:'not-installed'` / `ledgerAfterThrow:0`, `source-isConnected-throws` `install:true` / `beginCode:'ok'`, `source-off-throws` `dispose:{removed:0,complete:false}` | PASS |
| **GS-G-29** | §3.2 `F-9` / §0 ruling 10 / P-6 / `R-6` | the module namespace keys and a session instance member census | the four documented value exports and nothing else; **no consumer-reachable `commit()`**; no MCP descriptor | `{"namespaceKeys":["POINTER_TYPES","createGestureSession","detachGestureListeners","installGestureListeners"],"instanceMembers":["begin","cancel","dispose","disposed","end","gesture","install","reset","stats"],"hasCommitMethod":false,…}` | PASS |
| **GS-G-30** | §3.2 `F-9c` / §2.3 item 3 / §2.4 items 1,3 | `begin(elA)` active; then the recorded `pointerdown` handler for `elA` is fired **again**, with a throwing-traps `Proxy` event (the child-handler case) | a second start is refused (`gestures` stays `1`, `lastCode:'busy'`), **no second listener set**, no extra source call, no commit | `{"gestures":1,"sourceCallDelta":0,"onsOnA":4,"activeId":1,"statsLastCode":"busy"}` | PASS |

### 4.3 §3.3 every-state invariants (`I` family) — 16 rows

| Id | Doc clause (row) | Drive (exact) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **GS-G-31** | §3.3 `I-1` / §2.3 item 3 / §0A note 5 / `P-GS-IM-2` | at most one active gesture; no consumer-reachable `commit` | no `commit()` member; the second `begin` is `'busy'`; exactly one commit and one gesture | `{"members":["begin","cancel","dispose","disposed","end","gesture","install","reset","stats"],"busy":{"ok":false,"code":"busy"},"commits":1,"stats":{"gestures":1,"commits":1,…}}` | PASS |
| **GS-G-32** | §3.3 `I-2` / §2.3 items 4,5 / `P-GS-SM-3` | two gestures reaching `end` and `reset` | two commits; `stats().commits === 2`; outcomes `end` then `reset` | `{"commits":2,"outcomes":["end","reset"],"stats":{"gestures":2,"commits":2,…}}` | PASS |
| **GS-G-33** | §3.3 `I-3` / §2.3 item 4 / `M-9`/`M-11` / `P-GS-SM-3` | a direct `cancel`; a `pointercancel` terminal; a `dispose()` during a gesture | **zero** commits on all three paths | `{"cancelCommits":0,"pointercancelCommits":0,"disposeCommits":0}` | PASS |
| **GS-G-34** | §3.3 `I-3b` / §2.3 item 4 / `M-12` / §0A note 6 | `begin`, `set('PREV')`, `reset(el, handle, 'SUPPLIED')` | **one** commit carrying the **supplied** value; `outcome:'reset'` | `{"commits":1,"value":"SUPPLIED","outcome":"reset","terminal":{"ok":true,"code":"ok","committed":true},…}` | PASS |
| **GS-G-35** | §3.3 `I-3c` / §2.3 item 5 / `F-3`(c) | a throwing `commit` on two consecutive gestures | the throw propagates; `stats().commits` reads `1` after the first; the callback is invoked **once per gesture** (no retry); listeners detached | `{"thrown":"commit hostile","statsCommitsAfterFirst":1,"callbackCalls":2,"offs":6}` | PASS |
| **GS-G-36** | §3.3 `I-4` / §2.3 item 2 / §0A note 11 / `P-GS-IM-4` | the **live** listener footprint at idle, during a gesture, and after **all three** terminals | `1` (the start listener) → `4` → `1` again after `cancel`, `end` **and** `reset`; no type outside the pinned four | `{"installedIdle":{"live":["pointerdown"]},"active":{"live":["pointercancel","pointerdown","pointermove","pointerup"]},"afterCancel":{"live":["pointerdown"]},"afterEnd":{"live":["pointerdown"]},"afterReset":{"live":["pointerdown"]}}` | PASS |
| **GS-G-37** | §3.3 `I-5` / §2.3 item 7 / `M-13` / §0A note 3 / `P-GS-IM-6` | every `on` matched by exactly one `off` with the same three values; a throwing `off` makes `complete:false` | 5 `on` / 5 `off` **pairwise by `(element,type,handler)` identity**; `removed` = that call's successful detaches; `complete:false` for the throwing `off` with the detach still attempted | `{"ons":5,"offs":5,"pairs":[1,1,1,1,1],"removed":2,"complete":true,"throwingOff":{"removed":0,"complete":false},"throwingOffAttempts":1,"throwingOffRecorded":0}` | PASS |
| **GS-G-38** | §3.3 `I-6` / §2.2 P-2 / P-3 (runtime half only) | wrap `globalThis.addEventListener` with a counter, then run the whole lifecycle | no ambient registration; every attach through the injected source; no listener on a non-argument element | `{"ambientRegistrations":0,"ons":4,"offs":3,"log":["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","off:pointermove","off:pointerup","off:pointercancel"]}` | PASS |
| **GS-G-39** | §3.3 `I-7` / §2.3 item 6 / `M-7`/`M-8` / `F-10` / `P-GS-IM-5` | capture counts at four points for an opted-in and a non-opted-in control | opted-in: `0` before establishment, **exactly `1`** at `begin` and never more; not opted in: `0` at every stage | `{"on_afterInstall":0,"on_afterBegin":1,"on_afterMove":1,"on_afterTerminal":1,"off_afterBegin":0,"off_afterMove":0,"off_afterCancel":0}` | PASS |
| **GS-G-40** | §3.3 `I-8` / §2.2 P-3 / `R-7` / `P-GS-TP-1` | an opted-in full lifecycle against a recording source that exposes **no DOM method at all** | every attach/detach and the capture call go through the injected source, carrying the gesture element; no foreign element | `{"onOffCalls":7,"captureCalls":1,"captureElementIsGestureElement":true,"log":["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","capturePointer","off:pointermove","off:pointerup","off:pointercancel"],"sourceSurface":{"addEventListener":"undefined","setPointerCapture":"undefined"}}` | PASS |
| **GS-G-41** | §3.3 `I-9` / §2.4 item 2 / §0A note 2 / `M-1`/`M-16` | the same object installed three times; a structurally identical **distinct** object installed once | one ledger entry for the same object with a `false` repeat; the clone is a **SECOND** control with its own start listener and can be established | `{"installs":[true,true,false],"startListeners":[1,1],"liveListeners":[1,4],"installed":2,"cloneBegin":true}` (`startListeners` counts the `'pointerdown'` `on` calls per element — `1` each; `liveListeners` is the live count — `1` for the idle original, `4` for the clone whose gesture the drive established) | PASS |
| **GS-G-42** | §3.3 `I-10` / §2.4 item 6 / `F-8` / `P-GS-TP-1` | `createGestureSession` handed `undefined`, `{}`, `42`, a hostile source whose `on`/`off` throw and whose `commit` throws, and a **`Proxy` options object whose `get` trap throws** | never throws; every method returns its declared shape | `{"shapes":[{"label":"no-source","kinds":{"install":"boolean","begin":"boolean","term":"undefined","cancel":"boolean","reset":"undefined","gesture":"null","stats":"number","dispose":"number","disposed":"boolean"},"codes":{"begin":"not-installed","cancel":"no-gesture"}},…]}` — five shapes, no `threw` field on any | PASS |
| **GS-G-43** | §3.3 `I-11` / §2.4 item 1 / `R-8` / §0 ruling 7 | every event handed to the handlers is a `Proxy` whose traps throw | nothing throws ⇒ **no event field is read**; the gesture still completes with one commit and the baseline restored | `{"observed":{"threw":null,"commits":1,"active":false,"offs":3}}` | PASS |
| **GS-G-44** | §3.3 `I-12` / §0A note 8 / §2.4 item 8 / `M-5`/`M-13` | nothing carries across a gesture boundary | the new gesture's value is `undefined` and `outcome:null`; the old handle reports inactive; counters monotonic; no store-shaped member | `{"newGesture":{"value":"undefined","outcome":null},"oldHandleActive":false,"members":["begin","cancel","dispose","disposed","end","gesture","install","reset","stats"],"stats":{"gestures":2,"commits":1,…}}` | PASS |
| **GS-G-45** | §3.3 `I-12b` / §0A note 11 / §2.3 item 4 / `F-3` | an `onEnd` hook that re-enters `begin` and `end` while the terminal is running | inside the hook the gesture is **already inactive** and the three `off`s are **already logged**; the re-entrant `end` is refused and there is **no double commit** | `{"trace":[{"insideLog":["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","off:pointermove","off:pointerup","off:pointercancel"],"activeInside":false,"gestureInside":{"active":false,"id":1,"outcome":"end","value":"V","commits":0},"reBegin":"busy","reEndCode":"no-gesture","commitsInside":0}],"commits":1,"stats":{"commits":1,…},"offs":3}` | PASS |
| **GS-G-46** | §3.3 `I-13` / `R-2` / `R-3` / `R-4` | run the lifecycle with `Date.now` and `Math.random` wrapped by counters, in a realm with **no `document`/`window`** | no clock read, no randomness read; the lifecycle completes through the injected source | `{"environment":{"document":"undefined","window":"undefined"},"dateReads":0,"randomReads":0,"onOffCalls":8,"captureCalls":1}` | PASS |

### 4.4 §2 surface / capture / state machine / prohibitions / count seam — 11 rows

| Id | Doc clause (row) | Drive (exact) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **GS-G-47** | §2.1 (the four private type constants) / §0A note 10 / `R-1` | read `POINTER_TYPES`, then try to mutate it | `start:'pointerdown'` · `move:'pointermove'` · `end:'pointerup'` · `cancel:'pointercancel'`; exactly four keys; frozen | `{"POINTER_TYPES":{"start":"pointerdown","move":"pointermove","end":"pointerup","cancel":"pointercancel"},"frozen":true,"keys":["start","move","end","cancel"],"mutateThrew":"Cannot assign to read only property 'start' of object '#<Object>'",…}` | PASS |
| **GS-G-48** | §2.1 EXPORT CENSUS (a) / `R-6`(a) / §4.4 `S-2` | the imported namespace's own keys vs the four documented value exports, **with a fifth-export positive control** | **SET EQUALITY** with `createGestureSession`, `installGestureListeners`, `detachGestureListeners`, `POINTER_TYPES`; the control **FAILS** on a fifth value export | `{"valueNamesSorted":["POINTER_TYPES","createGestureSession","detachGestureListeners","installGestureListeners"],"setEqual":true,"controlFailsOnAFifthExport":true}` | PASS |
| **GS-G-49** | §2.5 items 1–3, 11 / §2.1 signatures | the delegate surface `U-GUTTER`/`U-RELOCATE` may call | the three module functions with their documented arities, the eight session methods, and a boolean `disposed` | `{"arities":{"createGestureSession":1,"installGestureListeners":3,"detachGestureListeners":3},"sessionMethods":["begin","cancel","dispose","disposed","end","gesture","install","reset","stats"],"disposed":false}` | PASS |
| **GS-G-50** | §2.1 `installGestureListeners`/`detachGestureListeners` / `R-3`'s named seam / §2.5 item 11 | the module-level seam driven **without a session**: install once, install with an unusable source, install with a `null` element, detach twice, detach with an unusable source, detach a `null` handler | `installGestureListeners` returns the handler it attached (**`null`** for an unusable source or a `null` element); `detachGestureListeners` returns **`true` iff the source's `off` was callable and threw nothing — `false` for an already-detached, never-attached, unusable or throwing case** | `{"handlerKind":"function","installReturns":["function",null,null],"detachReturns":[true,true,false,false],"finalLog":["on:pointerdown","off:pointerdown","off:pointerdown"]}` | **FAIL — doc/spec drift (§7.1).** The `null`-element and unusable-source halves hold; the **repeat detach returns `true`** and the source's log shows **two** `off:pointerdown` calls, where `§2.1` says the already-detached case returns `false` *(**⟶ RECONCILED 2026-09-27 (THE GATE-7 PROOFREADER PASS): THIS DRIFT IS CLOSED IN THE SPEC (`D-3`(a)/`GS-G-50` LANDED). `§2.1`'s `detachGestureListeners` return sentence now reads what this run OBSERVED: `false` for a non-callable source, a non-callable handler or a THROWING `off`, and a REPEAT detach returns `true` and reaches the source a second time, because the helper is handed `(source, element, handler)` and NOTHING else — the already-detached case belongs to the session's own ledger and to `dispose()` (`§2.3` item 7.5), never to the standalone function. NOTHING in the module was or may be changed for this row, and none was.**)* |
| **GS-G-51** | §2.1 `SessionStats`/`GestureStats`/`GestureHandle` / §0A note 12 | the declared field names of `stats()`, `gesture()` and the handle; `set()` chainability | `SessionStats` = 7 documented fields; `GestureStats` = 5; the handle = `id`/`element`/`active`/`outcome`/`value`/`set`; `set()` returns the handle | `{"statsKeys":["active","commits","gestureId","gestures","installed","lastCode","sourceCalls"],"gestureKeys":["active","commits","id","outcome","value"],"handleKeys":["active","element","id","outcome","set","value"]}` | PASS |
| **GS-G-52** | §2.1 `GestureCode` (seven members) / §2.3 item 4 | the codes observed across the driven refusals | every observed code inside the **seven-member closed union**; `disconnected` and `no-gesture` as declared; refusals `committed:false` | `{"observedCodes":{"disconnected":"disconnected","noGestureFromEnd":"no-gesture","noGestureFromCancel":"no-gesture","lastCode":"no-gesture"},"domain":["ok","not-installed","busy","disposed","disconnected","stale","no-gesture"]}` | PASS |
| **GS-G-53** | §2.3 item 6 / §0A note 4 / `M-9` / `I-7` | an opted-in gesture reaching a **`cancel`** terminal | the one capture call remains the gesture's only one; **no release call is invented**; no unknown source member touched | `{"captureCalls":1,"offCalls":3,"log":["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","capturePointer","off:pointermove","off:pointerup","off:pointercancel"],"unknownSourceMembers":[]}` | PASS |
| **GS-G-54** | §0A note 4 / §2.4 items 1,4 / `M-9` / `F-9c` (pointer-agnostic termination) | `begin` with a `{pointerId:7,isPrimary:true}` event, then the `pointerup` handler fired with `{pointerId:99,isPrimary:false,buttons:0}` | `pointerup` is **unconditionally terminal** regardless of any pointer identity field: one commit, `outcome:'end'`, baseline restored | `{"activeId":1,"commits":1,"outcome":"end","active":false}` | PASS |
| **GS-G-55** | §2.3 item 8 (the four states) / `P-GS-SM-1` | `absent` → `installed-idle` → `active` → `installed-idle` → `disposed`, with the illegal transitions refused | the four states in order; `active`+`begin` `'busy'`; `active`+`end` returns to `installed-idle`; `disposed`+`install` `false` and `disposed`+`begin` `'disposed'`; counters monotonic | `{"states":{"afterInstall":{"installed":1,"active":false,…},"afterBegin":{"active":true,"gestureId":1,…},"afterEnd":{"active":false,"gestureId":0,"commits":1,…},"afterSecondInstall":{"installed":2,…},"afterDispose":{"installed":0,"gestures":1,"commits":1,…}},"busy":{"ok":false,"code":"busy"},"disposedInstall":false,"disposedBegin":{"ok":false,"code":"disposed"}}` | PASS |
| **GS-G-56** | §2.2 P-1, P-3, P-5, P-7, P-8 (the runtime-observable half) | an install carrying `selectors`/`threshold`/`data-zone`/`paneCollapseToggle`/`store`/`localStorage` fields; then a **repeat** install on the same element; then an install on an **unusable** session | the vocabulary fields change nothing; the lifecycle uses the injected source only; a repeat install is a **no-op** (`false`, **zero source calls**); an unusable-source install is `false`; no policy-shaped member | `{"onsOnA":4,"offsOnA":3,"elementsTouched":["A"],"valueIdentity":{"k":1},"unusableInstall":false,"members":["begin","cancel","dispose","disposed","end","gesture","install","reset","stats"]}` | PASS |
| **GS-G-57** | §0A note 12 / §2.1 `stats()`/`gesture()` (the count seam) | read `stats()` twice and `gesture()` twice while idle, counting source calls across the reads | `stats()` stable across reads; `gesture()` `null` while idle; reading the counters makes **no source call**; no agent-reachable member | `{"stats1":{"installed":1,"sourceCalls":1,"gestures":0,"commits":0,"active":false,"gestureId":0,"lastCode":"ok"},"stats2Equal":true,"gesture":null,"sourceCallDelta":0,…}` | PASS |

### 4.5 §3.4 / §3.5 static + existence rows — 11 rows (2 PASS, 9 NOT-BLIND-RUNNABLE)

| Id | Doc clause (row) | Drive (exact) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **GS-G-64** | §3.4 `R-7` (the DIFF-SCOPE row) + §5.1 + `R-10`'s green form | file/git probes: the `gesture-session*` file census under `src/**` and `tests/**`, `git status --porcelain`, `git diff --name-only 33a011d HEAD` | the module and the unit's test file exist; the unit-owned file set is **exactly those two**; no working-tree path outside the allow-list; no DENIED path in the committed range | `{"head":"8cc0743 U-GSESSION gate 3 GREEN: …","moduleExists":true,"testExists":true,"unitOwnedGestureSessionFiles":["src/shared/gesture-session.ts","tests/gesture-session.test.ts"],"workingTreeStatus":["docs/specs/gsession-greens.md","tests/gs-blind-greens.tmp.test.ts"],"gateArtifacts":["docs/specs/gsession-greens.md","tests/gs-blind-greens.tmp.test.ts"],"committedRangeSinceGate2Baseline":["docs/specs/gsession.md","src/shared/gesture-session.ts","tests/gesture-session.test.ts"],"outsideAllowListWorking":[],"deniedPathsInCommittedRange":[],"outsideAllowListCommitted":[]}` | PASS — the two working-tree entries at the moment of the run were **this gate's own mandatory artifact** and **this pass's scenario runner** (deleted in §10); scored per `§3.4 R-7`'s own rule: *"a non-denied path outside the allow-list is a FINDING for the adversarial pass, not an automatic FAIL (a unit's own mandatory gate artifacts must be committable — `RCA-8(a)`)"*. **Every clause that binds absolutely is clean: the `gesture-session*` census is exactly the two canonical artifacts, the committed range is exactly `§5.1`'s three paths, and no DENIED path appears anywhere.** In the FINAL tree state the probe reads exactly one entry — this artifact (§10) |
| **GS-G-65** | §3.4 `R-9` + §3.5 `R-11` (the two existence probes) | `fs` probes on `docs/skills/designing-pages.md` and on the extended divergence harness deliverable | `designing-pages.md` **does not exist** (so the conditional coverage-matrix obligation does not trigger); the `C2` harness is **not landed** | `{"pageDesignExists":false,"skillsDir":["process-guardrails.md"],"divergenceSpecExists":true,"divergenceSpecMentionsHarness":true,"divergenceExtendedRowCited":true}` | PASS (**probe at HEAD `8cc0743` only** — the claim is not generalized beyond this tree state; `O-7`) |
| **GS-G-59** | §3.4 `R-1` | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…the anti-evasion VOCABULARY scan over the module source (comments included, string-literal concatenation joined)…"}` | **NOT-BLIND-RUNNABLE** |
| **GS-G-58** | §3.4 `R-2` | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…a semantic scan of the module source for realm-rooted or aliased global access…"}` | **NOT-BLIND-RUNNABLE** |
| **GS-G-60** | §3.4 `R-3` (the token half) | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…its RUNTIME half IS driven here (GS-G-40, GS-G-53, GS-G-67)…"}` | **NOT-BLIND-RUNNABLE** |
| **GS-G-62** | §3.4 `R-4` (the IMPORT-BOUNDARY row) | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…the import declarations live in the module source…"}` | **NOT-BLIND-RUNNABLE** |
| **GS-G-74** | §3.4 `R-5` (the static half) | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…its runtime halves ARE driven (GS-G-16, GS-G-41, GS-G-56)…"}` | **NOT-BLIND-RUNNABLE** |
| **GS-G-63** | §3.4 `R-6`(b),(c) | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…R-6(b) is a compile-time claim over eight TYPE-ONLY names and R-6(c) a static set-equality census…"}` | **NOT-BLIND-RUNNABLE** |
| **GS-G-61** | §3.4 `R-8` (the geometry/magnitude scan) | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…its behavioural half IS driven (GS-G-43)…"}` | **NOT-BLIND-RUNNABLE** |
| **GS-G-66** | §2.2 P-6 / §3.4 `R-3`(2) (the capture-token prohibition) | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…the capture capability is SOURCE-supplied and named by the source (GS-G-67)…"}` | **NOT-BLIND-RUNNABLE** |
| **GS-G-75** | §3.2 `F-9(b)` (the six registration sites are untouched) | **not driven** | — | `{"verdictKind":"NOT-BLIND-RUNNABLE","why":"…ALL_TOOLS/RpcMethod/MUTATING_METHODS/VALID_GROUPS censuses live in src/main/** and src/renderer/**…"}` | **NOT-BLIND-RUNNABLE** |

**Two rows the blind rule could NOT run and which are therefore recorded as rows of their own rather than
omitted:** **`F-12`** (the behavioural `F-1` half — `§3.2` marks it `PRECONDITION-GATED` on
`U-DIVERGENCE-EXT`/`C2`, and `§5.2`/`S-6` forbid moving it into the node suite) is **NOT AUTHORED AS A
PASSING ROW by the unit's own contract**, so it has **no scenario id here** and is recorded in §6 as
`NOT-BLIND-RUNNABLE` rather than scored; and **`R-10`'s red form** (the module-absence probe at red time)
is **historically inapplicable** at this tree state — the module has landed, and `R-10`'s **green form** is
driven inside `GS-G-64`.

### 4.6 §5.5.1 register rows — 11 rows (one scenario each)

| Id | Doc clause (row) | Drive (exact) | Expected observable | Observed (verbatim) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **GS-G-68** | §5.5.1 `P-GS-IM-1` (`S-GS-LISTENERS-1`, **58 declared**), `YES (bounded)` | the register's **20 configurations** × 3 observation stages, less configuration `(20)`'s second stage | every configuration: `1` start listener while installed and idle, `4` while a gesture is active, `1` after the terminal — with the declared `(element,type)` multiset | `{"configurations":20,"observationsMeasured":59,"declared":58,"held":59,"broken":0,"refusedBegins":[],"bad1Count":0,"bad2Count":0,"bad3Count":0}` | **PASS** — **59 observations measured** against the **58 declared** (`O-9`) |
| **GS-G-69** | §5.5.1 `P-GS-IM-2` (`S-GS-BUSY-1`, **32 declared**), `YES` | the register's **8 start shapes** × **4 re-start attempts** | every re-start `{ok:false,code:'busy'}`, **zero** extra source calls, the active id/value/commit count untouched, `4` listeners still attached | `{"attempts":32,"declared":32,"held":32,"broken":0,"sample":[{"shape":"direct-begin","reattempt":"direct-begin","code":"busy","ok":false,"active":true,"idUnchanged":true,"valueUnchanged":true,"commitsUnchanged":true,"extraSourceCalls":0,"onsOnA":4},{"shape":"direct-begin","reattempt":"re-fired-start-listener",…},…]}` | **PASS** — 32/32 |
| **GS-G-70** | §5.5.1 `P-GS-IM-3` (`S-GS-CODES-1`, **36 declared**), `YES` / §2.3 items 3,4 / §2.4 items 4,5,6 | the register's **4 call shapes** × **9 state shapes**, asserting the declared code **and** the four inertness facts | the declared code for each of the 36 cells; every refusal inert (no commit, no hook, no source call, active gesture unchanged) | `{"cells":36,"declared":36,"held":30,"broken":6,"codeMismatches":[{"call":"end","state":"disposed","setup":"disposed","code":"disposed","ok":false,"committed":false,"inert":{"commitZero":true,"hooksNone":true,"noSourceCalls":true,"activeUnchanged":true}},{"call":"end","state":"disposed-never-installed",…},{"call":"reset","state":"disposed",…},{"call":"reset","state":"disposed-never-installed",…},{"call":"cancel","state":"disposed",…},{"call":"cancel","state":"disposed-never-installed",…}],"notInert":[]}` | **FAIL — doc/spec drift (§7.2).** 30/36 held; the **6 cells that break are the three terminals in the two `disposed` states**, where the row's own declared code map says `'no-gesture'` and the module returns `'disposed'` — which is what **`§2.3` item 7.3** says it must *(**⟶ RECONCILED 2026-09-27 (THE GATE-7 PROOFREADER PASS): THIS DRIFT IS CLOSED IN THE SPEC (`D-3`(b)/`GS-G-70` LANDED). `§5.5.1 P-GS-IM-3`'s declared code map is now the NORMATIVE `§2.3` item 7.3 reading — `'disposed'` for EVERY terminal in a `disposed` state — and the superseded half (the `'no-gesture'` reading for those two state shapes) is DELETED under a dated tombstone, the `ADV-CN-6`/`D-06` precedent (delete the superseded half, never keep both). The `36` declared term, the row id, the `S-GS-CODES-1` strategy id and the SEVEN-member code union are all UNMOVED. NOTHING in the module was or may be changed for this row, and none was — the module was RIGHT.**)* |
| **GS-G-71** | §5.5.1 `P-GS-IM-4` (`S-GS-WINDOW-1`, **30 declared**), `YES` / §2.3 item 2 / §0A note 11 | the register's **6 terminals** × **5 observation stages**, asserting the ordered call log against each stage's declared prefix | `on(start)` at install; then (on a successful `begin`) `isConnected` iff callable, `on(move)`, `on(end)`, `on(cancel)`, the capture call iff opted in; then at the terminal `off(move)`, `off(end)`, `off(cancel)` — nothing outside the pattern, nothing on another element, and the detach **complete before any consumer hook or `commit` runs** | `{"terminals":6,"observationsMeasured":30,"declared":30,"held":6,"broken":0,"finalLogsByTerminal":[["recorded-up",["on:pointerdown","isConnected","on:pointermove","on:pointerup","on:pointercancel","capturePointer","off:pointermove","off:pointerup","off:pointercancel"]],[…each of the other five terminals identical, with the `dispose` terminal adding `off:pointerdown`…]]}` | **PASS** — 30/30 observations; the logs are stage-identical across all six terminals |
| **GS-G-72** | §5.5.1 `P-GS-IM-5` (`S-GS-CAPTURE-1`, **24 declared**), `YES (bounded)` / §2.3 item 6 / §0 ruling 2 / `I-7` | the register's **4 opt-in flag values** × **6 gesture-life stages** | cumulative capture count `0,1,1,1,1,1` for the truthy flags and `0` at **every** stage for the falsy ones, no capture before the establishment stage | `{"flagValues":["true","false","'yes'","0"],"observationsMeasured":24,"declared":24,"held":24,"broken":0,"matrix":[{"flag":"true","expected":[0,1,1,1,1,1],"observed":[0,1,1,1,1,1],"terminalDetached":true},{"flag":"false","expected":[0,0,0,0,0,0],"observed":[0,0,0,0,0,0],…},{"flag":"'yes'","observed":[0,1,1,1,1,1],…},{"flag":"0","observed":[0,0,0,0,0,0],…}]}` | **PASS** — 24/24 |
| **GS-G-73** | §5.5.1 `P-GS-IM-6` (`S-GS-DISPOSE-1`, **30 declared**), `YES` / §2.3 item 7 / §0A notes 3,8 / `I-5`/`I-12` | the register's **3 session shapes** × **2 gesture states** × **5 post-dispose operations** | every `on` matched by one `off`; `removed` the true detach count of that call; `complete` honest (`false` for a throwing `off`); a second `dispose()` making zero calls and reporting `{removed:0,complete:true}`; ledger empty, `gesture()` null, counters kept, no listener live | `{"attempts":30,"declared":30,"held":30,"broken":0,"brokenList":[],"note":"shape (1) × state (2) is the same drive as state (1) (the register’s own parenthetical), so it is driven once and counted twice","sample":[{"shape":"two-controls-idle","state":"idle","op":"dispose","ret":{"removed":2,"complete":true},…},…]}` | **PASS** — 30/30 |
| **GS-G-76** | §5.5.1 `P-GS-SM-1` (`S-GS-STATE-1`, **40 declared**), `YES` / §2.3 item 8 | the register's **4 states** × **10 ops** | the declared transition/refusal for every cell, counters monotonic | `{"cells":40,"declared":40,"countersMonotonic":true,"grid":[{"state":"absent","op":"install(newEl)","code":"true","postActive":false,"postInstalled":1,"countersMonotonic":true,"commitsDelta":0,"declaredCode":"true"},{"state":"active","op":"begin(el)","code":"busy",…},{"state":"disposed","op":"end(el,activeHandle)","code":"disposed",…},…]}` | **PASS** — 40/40 cells; **the `disposed`×terminal cells read `'disposed'` here and the register's own reference map for them is inconsistent (`O-8`)** — see §7.2 |
| **GS-G-77** | §5.5.1 `P-GS-SM-2` (`S-GS-IDENTITY-1`, **30 declared**), `YES` / §2.4 item 2 / §0A note 2 / `I-9` | the register's **5 element shapes** × **6 operation pairs** | the same object twice ⇒ one entry, `false`, no second `on`; a structural clone ⇒ **two** entries and **two** start listeners; an element mismatch ⇒ `'stale'`; a reinstall after `dispose()` refused | `{"attempts":30,"declared":30,"held":30,"broken":0,"brokenList":[],"sample":[{"shape":"(1) plain {}","pair":"install(1),install(1)","obs":{"i1":true,"i2":false,"ledger":1,"startOns":1}},{"shape":"(1) plain {}","pair":"install(1),install(5)","obs":{"i1":true,"i2":true,"ledger":2,"startOns":[1,1]}},…]}` | **PASS** — 30/30 |
| **GS-G-78** | §5.5.1 `P-GS-SM-3` (`S-GS-COMMIT-1`, **32 declared**), `YES` / §2.3 items 4,5 / `I-2`/`I-3`/`I-3b`/`I-3c` | the register's **4 terminal paths** × **8 value/consumer shapes** | the declared commit count per path and shape; the values verbatim by identity; a throwing `commit` still counting exactly one and never retried | `{"attempts":32,"declared":32,"held":32,"broken":0,"matrix":["recorded-up/no-set=1",…,"direct-reset/commit-throws=1","recorded-cancel/no-set=0",…,"recorded-cancel/commit-throws=0"],"commitThrowsRows":[{"path":"recorded-up","terminalThrew":"commit hostile","callbackCalls":1,"sessionCommits":1},{…direct-end…1…},{…direct-reset…1…},{"path":"recorded-cancel","terminalThrew":null,"callbackCalls":0,"sessionCommits":0}]}` | **PASS** — 32/32 (`cancel` = 0 commits even with a throwing `commit` callback) |
| **GS-G-79** | §5.5.1 `P-GS-TP-1` (`S-GS-TOTAL-1`, **24 declared**), `YES (bounded)` / §5.5.3 / `I-10` | totality drives over the factory, the two module-level seam functions and the session methods under hostile sources | **no** totality drive throws; each call returns its declared kind | `{"drivesMeasured":82,"declaredTerm":24,"perPhase":{"A":8,"B":24,"C":50},"threwCount":0,"propagatedByDesign":2,"threwList":[],"note":"the register’s declared term is 24 DRIVES (one call in one phase on one shape); this run drives the phases’ own enumerations and reports that measured figure beside the declared one, never substituted for it"}` | **PASS (bounded)** — `0` unexpected throws; the **82 measured drives** are reported **beside** the **24 declared** (`O-10`); the two `propagatedByDesign` throws are the register's own two declared `commit`-throws limbs of `P-GS-SM-3` |
| **GS-G-80** | §5.5.1 `P-GS-TP-2` (`S-GS-SEED-1` + `S-GS-POOL-1`, **60 declared**), `YES (bounded)` / §2.4 item 1 / `I-11` | the pinned-seed LCG's **60 draws** over the **30-member pool**, each drawn event driven through **2 event configurations** | the drawn event changes nothing: exactly three tracking `on`s, the path's commit count, the baseline restored, the mutating-getter counter unchanged | `{"seed":20260927,"draws":60,"poolSize":30,"declared":60,"distinctPoolMembersDrawn":26,"distinctIndices":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,17,18,21,23,24,25,26,27,28,29],"membersNeverDrawn":[14,19,20,22],"drivesMeasured":120,"held":120,"broken":0,"note":"a DRAW is not a SWEEP: the 60 draws are reported with their distinct-member count; no “all 30 drawn” claim is made"}` | **PASS (bounded)** — **120/120 drives held**; **26 of 30** distinct pool members drawn |

---

## 5. Register coverage — each of the ELEVEN rows exercised INDEPENDENTLY, observed vs stated

**This is this run's own execution of the register's property text** (`§5.5.1`), driven from the spec's
cells — **not** a re-run of the unit's own file (which was never read). Every attempt count below is what
**this run measured**, against the count the register **states**.

| Register row | Type · stated marking | Register's stated statement (condensed) | Register's stated attempts | This run's drive | **Observed (this run)** | Result vs statement |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-GS-IM-1`** | `P-IM` · **`YES (bounded)`** | for every configuration in the `20`-configuration domain: `1` start listener idle, `4` active, `1` after **every** terminal, no type outside the pinned four (`S-GS-LISTENERS-1`) | **58** (`20`×`3` less `2`) *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; the as-measured `58` is kept visible): the `less `2`` form above is the SPEC's as-filed arithmetic, superseded by `ADV-GS-8`/`ADV-GS-11` — the enumeration is `19×3 + 1×2 = 59`, so ONE unreachable stage subtracts `1`, not `2`, and the DECLARED term `58` is the conservatism the spec's prose names. This run MEASURED `59`, which is the superseded arithmetic's own correction and is why the total below reads `397` measured against `396` declared. NO declared term moves, then or now.)* | the same 20 configurations × 3 observation stages, each observation a **count + `(element,type)` multiset** | **59 observations measured / 59 held / 0 broken**; `bad1Count:0`, `bad2Count:0`, `bad3Count:0`; **no configuration's `begin` refused** | **HELD (bounded)** — **the measured enumeration is `59`, i.e. `19×3 + 1×2`, one MORE than the declared `58`**; the declared figure is conservative by one (§5.1's measurement note, `O-9`). The unbounded universal is **not** proven and **not** claimed |
| **`P-GS-IM-2`** | `P-IM` · **`YES`** | at most ONE active gesture; every further `begin` refused `'busy'`, changing no listener and no active state (`S-GS-BUSY-1`) | **32** (`8`×`4`) | the same 8 start shapes × 4 re-start attempts, each asserting code + active id/value/commits + listener count + **zero extra source calls** | **32 driven / 32 held / 0 broken** | **HELD** |
| **`P-GS-IM-3`** | `P-IM` · **`YES`** | the declared code for every refusal, and every refusal INERT; the two precedence clauses (`'disposed'` over `'not-installed'`; `'busy'` over `'disconnected'`) (`S-GS-CODES-1`) | **36** (`4`×`9`) | the same 4 call shapes × 9 state shapes, each cell asserting its code + the four inertness facts | **36 driven / 30 held / 6 broken** — the 6 broken are the **three terminals × the two `disposed` states**, code `'disposed'` vs the row's declared `'no-gesture'`; `notInert:[]` (**the only refusal that makes a source call is `'disconnected'`, by design — it is the `isConnected` reading itself**) | **BROKEN on the row's declared code map — the DRIFT finding of §7.2.** `'disposed'` **outranks `'not-installed'`** as the row requires; the precedence clause is confirmed |
| **`P-GS-IM-4`** | `P-IM` · **`YES`** | the ordered call log is exactly the pinned pattern for all six terminals, with the detach complete before any consumer code (`S-GS-WINDOW-1`) | **30** (`6`×`5`) | the same 6 terminals × **5** observation stages, each stage asserted against its declared prefix **and** its live listener count (`1→4→4→1`; the `dispose` terminal `1→4→4→0`) | **30 observations measured / 30 held / 0 broken** | **HELD** — the logs are **byte-identical across all six terminals** |
| **`P-GS-IM-5`** | `P-IM` · **`YES (bounded)`** | capture is `0` before establishment, exactly `1` for a truthy flag **at the establishment point**, never more, and `0` for every falsy flag (`S-GS-CAPTURE-1`) | **24** (`4`×`6`) | the same 4 flag values × 6 life stages, each asserting the **cumulative** capture count | **24 driven / 24 held / 0 broken**; matrix `0,1,1,1,1,1` (truthy) and `0,0,0,0,0,0` (falsy) | **HELD (bounded)** — 4 flag values, not "every value" |
| **`P-GS-IM-6`** | `P-IM` · **`YES`** | after `dispose()` every `on` is matched by one `off`; `removed` true; `complete` honest; a second `dispose()` makes zero calls; nothing retained (`S-GS-DISPOSE-1`) | **30** (`3`×`2`×`5`) | the same 3 session shapes × 2 gesture states × 5 post-dispose operations, each asserting the pairwise balance, the exact `removed`, the refusal codes and the retained-state facts | **30 driven / 30 held / 0 broken**; the throwing-`off` shape reports `{removed:0,complete:false}` with the detach **attempted** | **HELD** — the register's own parenthetical that shape `(1)` drives `2` stages like every configuration means its `active-at-dispose` cell is the same drive as `idle`; driven once, counted twice, and reported so |
| **`P-GS-SM-1`** | `P-SM` · **`YES`** | the declared transition or refusal for every state × op, counters monotonic (`S-GS-STATE-1`) | **40** (`4`×`10`) | the same 4 states × 10 ops, each cell driving one op on a fresh session built into that state (the `staleHandle` op carrying a **real** earlier gesture's handle) | **40 driven / 40 held**; `countersMonotonic:true`; the grid shows `absent`+`begin` ⇒ `not-installed`, `active`+`begin` ⇒ `busy`, `active`+`end` ⇒ `ok`, `disposed`+`install` ⇒ `false`, `disposed`+`begin` ⇒ `disposed` | **HELD** — with the same `disposed`×terminal reading as `P-GS-IM-3` (`O-8`, §7.2) |
| **`P-GS-SM-2`** | `P-SM` · **`YES`** | the ledger is keyed by REFERENCE IDENTITY; a repeat install is one entry/`false`/no second `on`; a structural clone is a SECOND control (`S-GS-IDENTITY-1`) | **30** (`5`×`6`) | the same 5 element shapes × 6 operation pairs, including the **structural clone** discriminator and the element-mismatch `'stale'` case | **30 driven / 30 held / 0 broken** | **HELD** |
| **`P-GS-SM-3`** | `P-SM` · **`YES`** | the declared commit count per terminal path, the values verbatim, a throwing `commit` still counting one and never retried (`S-GS-COMMIT-1`) | **32** (`4`×`8`) | the same 4 terminal paths × 8 value/consumer shapes, asserting **both** the injected callback's own count **and** the session's reported `stats().commits` | **32 driven / 32 held / 0 broken**; `end`/`reset` = `1`, `pointercancel` = `0` at every shape; a throwing `commit` reads `1` **and** propagates | **HELD** — and the row is the **only** place the ledger's three commit-count properties are quoted |
| **`P-GS-TP-1`** | `P-TP` · **`YES (bounded)`** | nothing throws at the total boundary: the factory, the two module-level seam functions and the session methods (`S-GS-TOTAL-1`) | **24** (`3` phases × `4` shapes × `2` functions) | the phases' own enumerations: **Phase A** 4 option shapes × 2 callables = **8** drives; **Phase B** 4 source shapes × 2 functions × 3 element shapes = **24** drives; **Phase C** 10 methods × 5 hostile states = **50** drives | **82 drives measured / 0 unexpected throws / 2 `propagatedByDesign`** (the register's own two declared `commit`-throws limbs, which `§2.3` item 5 requires to **propagate**) | **HELD (bounded)** — the register's stated term is **24 drives**; this run drives the phases' enumerations and reports **82** beside it, **never substituted** (`O-10`) |
| **`P-GS-TP-2`** | `P-TP` · **`YES (bounded)`** | for every event object drawn from the pinned 30-member pool, the session reads **no field**: the lifecycle facts are identical to a placeholder event (`S-GS-SEED-1` + `S-GS-POOL-1`) | **60** (`30` pool members × `2` event configurations) | the **pinned LCG exactly** (`state₀ = 20260927`, one step per draw, `index = stateₙ₊₁ mod 30`), the drawn member driven through both configurations as a `pointerdown`-driven gesture | **60 draws / 120 drives measured / 120 held / 0 broken**; **`distinctPoolMembersDrawn: 26`** (indices `[0..13,15,16,17,18,21,23..29]`); `membersNeverDrawn` = **`[14,19,20,22]`**; the mutating-getter counter stayed `0` on every drive | **HELD (bounded)** — **26 of 30** distinct members drawn; **NO "all 30 drawn" claim is made** and no two-cycles claim either |
| **TOTAL** | **6 `P-IM` + 3 `P-SM` + 2 `P-TP` = 11 rows** | — | **`396`** (`58+32+36+30+24+30+40+30+32+24+60`) | — | **`396` declared; `397` attempts MEASURED** (`P-GS-IM-1`: **59** not `58`); **`389` held / `6` broken / `2` `propagatedByDesign`**; stop-after-5 **NOT TRIGGERED** | **10 of 11 rows held; `P-GS-IM-3` broken on its declared code map only (§7.2), attributed to doc/spec drift** *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; the as-measured figures are kept visible): the `389 held / 6 broken` set is THIS RUN's own score at HEAD `8cc0743` and stands as its measurement. THE CURRENT REGISTER RECORD IS `396` DECLARED / `397` MEASURED / `396` HELD / `0` BROKEN, `registerStoppedAt: null`, seed `20260927`, pool draw `26` of `30` — the `6` broken cells are the `P-GS-IM-3` `disposed`×terminal cells this run found, and the SPEC was corrected to the normative `§2.3` item 7.3 so those cells now read `'disposed'` and hold (`D-3` landed; see `docs/specs/gsession.md` `§5.5.1 P-GS-IM-3` and `§3b.6` row 5a). The declared `396` and its eleven terms are UNMOVED in both states.)* |

### 5.1 The declared-vs-measured arithmetic (`§5.5.3`'s terms, checked by this run)

| Row | Declared | **Measured by this run** | What counts as one attempt | Note |
| --- | --- | --- | --- | --- |
| `P-GS-IM-1` | **58** | **59** | one observation of the listener footprint in one configuration | `19×3 + 1×2 = 59`; **the spec records the declared figure as `58` while its own enumeration measures `59` — this run observes `59`.** Recorded as an ambiguity (`O-9`), **not silently resolved** |
| `P-GS-IM-2` | **32** | **32** | one re-start attempt in one start shape | — |
| `P-GS-IM-3` | **36** | **36** | one refusal call in one state | 6 cells broken (code map) |
| `P-GS-IM-4` | **30** | **30** | one log observation at one stage of one terminal | — |
| `P-GS-IM-5` | **24** | **24** | one capture-count observation at one stage for one flag value | — |
| `P-GS-IM-6` | **30** | **30** | one dispose-related operation on one session shape in one gesture state | shape (1)'s second state is the same drive (§5's note) |
| `P-GS-SM-1` | **40** | **40** | one operation driven in one state | — |
| `P-GS-SM-2` | **30** | **30** | one operation pair over one element shape | — |
| `P-GS-SM-3` | **32** | **32** | one terminal driven in one value/consumer shape | — |
| `P-GS-TP-1` | **24** | **82 drives** (the phases' enumerations) | one totality DRIVE (one call of one function in one phase on one shape) | **declared `24` vs measured `82`**: the register's `4 shapes × 3 phases × 2 functions` reading is a **sub-enumeration** of the phases' own tables (`O-10`); the declared figure is what the caps compare against |
| `P-GS-TP-2` | **60** | **60 draws / 120 drives** | one pinned-seed draw driven as one gesture | one attempt = one draw, driven through **both** configurations |
| **TOTAL** | **`396`** | **`397` attempts + `82` totality drives + `120` pool-configuration drives** | — | **inside `≤100`/row and `≤400` total against the DECLARED figures** |

**Register counting discipline, as this run followed it:** one attempt = **one exercised drive** (one
configuration observation for `P-GS-IM-1`, one re-start attempt for `P-GS-IM-2`, one refusal call for
`P-GS-IM-3`, one stage observation for `P-GS-IM-4`/`-IM-5`, one post-dispose operation for `P-GS-IM-6`, one
state×op cell for `P-GS-SM-1`, one operation pair for `P-GS-SM-2`, one terminal drive for `P-GS-SM-3`, one
totality call for `P-GS-TP-1`, one pinned-seed draw for `P-GS-TP-2`); **fixture construction is
precondition, not attempt**; and **a draw is not a sweep**.

**The four `YES (bounded)` rows are bounded here too, and this file says so plainly:** *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; the as-run word `four` is kept visible): the register's bounded set is **FIVE** rows — `P-GS-IM-1`, **`P-GS-IM-2`**, `P-GS-IM-5`, `P-GS-TP-1`, `P-GS-TP-2` — because `ADV-GS-25` marked `P-GS-IM-2` `YES (bounded)` (its property text's *every control and EVERY hostile start sequence* is bounded by its `8` shapes × `4` re-start attempts) and `§5.5.1`'s count note, `§5.5.2` item 2 and `§5.3` items 10/11 all print FIVE. THIS RUN SCORED `P-GS-IM-2` `HELD` without a bounded marking because the marking landed AFTER it, so this artifact's own row stands as its measurement; what is superseded is the COUNT, not the run. `P-GS-IM-2` joins the sentence below.)* `P-GS-IM-1`
enumerates **20 configurations** (not "every configuration"), `P-GS-IM-5` drives **4 flag values** (not
"every flag value"), `P-GS-TP-1` drives **4 shapes × 3 phases** (not "every caller-supplied shape"), and
`P-GS-TP-2` draws **60** times over a **30**-member pool, reaching **26** members. **None of the four is a
proof of its unbounded universal, and no reader may read this section as one.** *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; the as-run word `four` is kept visible): `NONE OF THE FOUR` is the superseded COUNT — `P-GS-IM-2` joined the bounded set (`ADV-GS-25`, above), so the honest sentence is `none of the FIVE is a proof of its unbounded universal`, and `P-GS-IM-2`'s boundedness is the fifth case.**)*

### 5.2 The source-supplied capture capability, discovered black-box (`GS-G-67`)

**The spec's own amendment (`§2.3` item 6, RULED 2026-09-27) says the session calls "a method the SOURCE
supplies (named by the source, discovered by the session from its own supplied surface)" and that the
module's bytes carry **no DOM-specific capture-method token**. A blind run cannot read the name out of the
module — so it was **observed**: the session was handed a `Proxy` source that records every property name
touched and returns a recording function for each, and one opted-in gesture was driven end to end.

`{"capabilityNamesTouched":["capturePointer"],"calls":["capturePointer(1)"],"note":"the capability is the SOURCE’s, under a module-neutral name; the module itself names no DOM capture method (the static half is GS-G-66/NOT-BLIND-RUNNABLE)"}`

**Observed: exactly ONE capability name was touched — `capturePointer` — called once, with one argument
(the gesture's own element), inside `begin`, after the three tracking `on` calls and after `isConnected`**
(`GS-G-7`, `GS-G-39`, `GS-G-53`, `GS-G-71`). The name carries no DOM capture token. **The token-absence
half of the claim remains `NOT-BLIND-RUNNABLE` (`GS-G-66`)**: a black-box run can show that the session
*invokes* a source-supplied capability, **not** that the module's bytes contain no banned token.

---

## 6. NOT-BLIND-RUNNABLE record — **9 rows + 1 contract-declared row**

**These are reported as `NOT-BLIND-RUNNABLE`, never as passes.**

| Id | Row | Why no blind drive exists | What a blind run CAN substitute (and did) |
| --- | --- | --- | --- |
| **GS-G-59** | §3.4 `R-1` — the normalized vocabulary scan (raw + assembled literals + comments) with a positive and a negative control | The row's whole observable is the **module's source text**; the blind rule forbids reading `src/shared/gesture-session.ts` | **nothing** — no runtime substitute proves a vocabulary absence (a banned token could sit in a comment or an unused literal with no behavioural trace) |
| **GS-G-58** | §3.4 `R-2` — no access rooted in a banned realm token or an alias, and no ambient value read | Source-semantic; a runtime observation cannot distinguish "never reads `document`" from "would read it on a path this drive did not take" | **weak corroboration only**: the lifecycle was run in a plain node realm **without** `document`/`window`, with `Date.now`/`Math.random` wrapped by counters — `dateReads:0`, `randomReads:0` (`GS-G-46`). That is **not** the row |
| **GS-G-60** | §3.4 `R-3` — the token half (`addEventListener`/`removeEventListener`/`setPointerCapture`/`releasePointerCapture` absent from the module bytes) | Source scan | **its runtime half is driven**: 7 `on`/`off` calls and exactly one capture call all through the injected source, against a source exposing **no DOM method at all** (`GS-G-40`), and no source member outside `{on, off, isConnected, capturePointer}` was ever touched (`GS-G-53`) |
| **GS-G-62** | §3.4 `R-4` — the module imports NOTHING (not even a type-only import) | The import declarations live in the module source | **weak corroboration only** — the module was imported and exercised in a plain node context and worked with no electron/DOM present; that is **not** the absence claim |
| **GS-G-74** | §3.4 `R-5` — the static isolation/ownership half (no element reaches the source that was not an argument; no `SecurePanels` reference) | Source scan of the module and its references | **its runtime halves are driven**: cross-session isolation (`GS-G-16`), the identity ledger with a structural clone (`GS-G-41`), and an element-touch census showing every attach carried an argument element (`GS-G-56`) |
| **GS-G-63** | §3.4 `R-6`(b),(c) — the eight **type-only** names, and the five-seam negative for `ALL_TOOLS`/`RpcMethod`/`MUTATING_METHODS`/`VALID_GROUPS` | A type-only name is erased at runtime, so the namespace cannot carry it; the censuses live in `src/main/**` and `src/renderer/**` | **the `R-6`(a) half IS driven** (`GS-G-48`: runtime set equality over the four value exports, **with a fifth-export control that fails**) — the type half and the five-seam half stay owed |
| **GS-G-61** | §3.4 `R-8` — the geometry/magnitude scan over the module bytes, the unit test-file bytes and the extracted row descriptions | Reading either file is forbidden by the blind rule | **its behavioural half IS driven**: every event handed to every handler was a `Proxy` whose traps throw, and nothing threw (`GS-G-43`), so **no field of any event was read** — a property this file states as a lifecycle fact, never as a geometry claim |
| **GS-G-66** | §2.2 P-6 / §3.4 `R-3`(2) — the module bytes carry no DOM-specific capture-method token | Source scan | **its runtime consequence IS driven and observed**: the capture capability is source-supplied under a neutral name (`GS-G-67`) |
| **GS-G-75** | §3.2 `F-9(b)` — the six registration sites untouched, asserted by **set equality against the names** | The censuses are in `src/main/**`/`src/renderer/**`, outside this unit's contract surface | **nothing** — and this file deliberately does **not** report a bare count in its place (`§4.4 S-2`) |
| **`F-12`** | §3.2 `F-12` — the **behavioural** `F-1` half (no click retargeting in a real renderer) | **The unit's own contract declares it `PRECONDITION-GATED` on `U-DIVERGENCE-EXT` (row `C2`, `BLOCKED`) and "NOT AUTHORED AS A PASSING ROW"** (`§3.2`, `§4.4 S-6`, `§7` item 3) | **the structural half `F-11` is the static row `R-8`/`R-2`/`R-7`** — which is `NOT-BLIND-RUNNABLE` here; **no pass may report the fork's retargeting criterion as proven** from this unit, the node suite, or the pinned `N = 9` divergence leg |

**One row deliberately NOT substituted for a source row:** `GS-G-64` (`R-7`) is scored because its
falsifier is a **file/git probe** (`git status --porcelain`, `git diff --name-only`, a file-name census)
rather than a semantic read of the module. **A `GS-G-64` pass says nothing about `R-1`/`R-2`/`R-3`/`R-4`/
`R-5`/`R-8`, which stay `NOT-BLIND-RUNNABLE`.**

---

## 7. FAIL rows, attribution and reproduction

**Two rows are FAIL.** Both are attributed to **DOC/SPEC DRIFT — a real documentation defect a later pass
must fix** — and **neither to the module under its own governing clause.** No row was softened, and no
observed value below is inferred: each is the runner's printed payload.

### 7.1 `GS-G-50` — `§2.1`'s `detachGestureListeners` contract disagrees with `§2.4`/`§3.2` about the repeat-detach return, and the module follows the `§2.4`/`§3.2` reading

**Doc clauses cited (the contradiction):**
- **`§2.1`**, `detachGestureListeners`'s own doc block: *"Returns `true` iff the source's `off` was callable and returned without throwing; **`false` for an already-detached, never-attached, unusable or throwing case.**"*
- **`§2.4`** item 6 and **`§3.2 F-8`**'s table: *"`end`/`reset`/`cancel` report …"* — and the `install`-ledger model of **`§2.3`** item 1(b), under which the session holds its own listener ledger *"so that `dispose()` can perform the baseline restore the ledger names"* — i.e. **the session, not the standalone seam helper, owns the "already-detached" knowledge.** The standalone helper is given `(source, element, handler)` and **nothing else** — no ledger, no registry — so it **cannot** observe that a previous call detached the same triple. **`§2.1` is the only clause that demands it.**

**Drive (exact):** with a recording source,
`installGestureListeners(src, el('S'), onStart)` → `h`; then `detachGestureListeners(src, el('S'), h)` **twice**; then with `undefined` as the source; then with `null` as the handler.

**Observed (verbatim):**

```
{"handlerKind":"function","installReturns":["function",null,null],
 "detachReturns":[true,true,false,false],
 "finalLog":["on:pointerdown","off:pointerdown","off:pointerdown"]}
```

**Observed vs expected, exactly:**

| Observable | Expected from `§2.1` | Observed | Which clause the observation satisfies |
| --- | --- | --- | --- |
| `installGestureListeners` returns the handler | a function | **a function** ✔ | `§2.1` |
| `installGestureListeners` with an unusable source | `null` | **`null`** ✔ | `§2.1` |
| `installGestureListeners` with a `null` element | `null` | **`null`** ✔ | `§2.1` |
| **first** `detachGestureListeners` | `true` | **`true`** ✔ (one `off:pointerdown` recorded) | `§2.1` |
| **second** `detachGestureListeners` (already detached) | **`false`** per `§2.1` | **`true`**, and a **second `off:pointerdown` call reaches the source** | **`§2.4`'s "everything goes through the source" + the ledger model** — the helper has no state in which to know the triple was already detached |
| `detach` with an unusable source / a `null` handler | `false` | **`false`** ✔ | `§2.1` |

**Attribution: DOC/SPEC DRIFT — a documentation defect, not a module regression.** The clause that cannot
hold is the phrase *"for an **already-detached** … case"* in `§2.1`'s `detachGestureListeners` block: the
function is handed **exactly** `(source, element, handler)` and the spec elsewhere forbids the module any
registry, cache or store (`P-8`, `I-12`), so **there is no evidence by which the standalone call could
distinguish a first detach from a repeat one** — while the **session-owned** ledger (`§0A` note 3,
`§2.3` item 7) is exactly what makes `dispose()`'s repeat-detach behaviour well-defined. **The module is
consistent with `§2.4` item 6 and `F-8`; `§2.1`'s return-value sentence needs a bounded documentation
edit** (either drop the *already-detached* clause for the standalone helper, or state that the
already-detached `false` applies to the **session's** `dispose()` path, where a ledger exists). **Nothing
in the module may be changed for this row, and nothing was.**

### 7.2 `GS-G-70` — the register's own code map for `P-GS-IM-3` contradicts `§2.3` item 7.3 and `§2.3` item 8 for the `disposed` × terminal cells

**Doc clauses cited (the contradiction):**
- **`§5.5.1 P-GS-IM-3`**, its stated property: *"the session returns the DECLARED code — … `'no-gesture'` when no gesture is active, `'stale'` when the handle is not the active gesture's …"* — read against the row's own `9` state shapes, of which **two are `disposed`** (`disposed`, `disposed-never-installed`).
- **`§2.3` item 7.3** (the governing text): *"…mark the instance **`disposed = true` FOREVER**: `install` returns `false` without a source call, `begin` reports `'disposed'`, **every terminal reports `'disposed'` without detaching or committing**, …"*
- **`§2.3` item 8**'s illegal-transition list: *"`disposed → installed-idle` (`'disposed'`)"*.
- **`§5.5.1 P-GS-SM-1`**: *"`disposed`+ANY op ⇒ refused `'disposed'`, `install` returning `false`"*.

**Reproduction (exact):** for each of the three terminal call shapes, in each of the two `disposed` states — e.g. install `a`; `begin(a)`; `dispose()`; then `end(a, <that gesture's handle>)`:

```ts
const s = createGestureSession({ source, commit })
s.install(a)
const b = s.begin(a)          // an ACTIVE gesture, so the handle is a real one
s.dispose()                   // → the gesture is cancelled with zero commits
s.end(a, b.gesture)           // the cell under test
```

**Expected per `P-GS-IM-3`'s declared code map:** `{ok:false, code:'no-gesture', committed:false}`
(the cell is read as "no gesture is active").

**Observed (verbatim, from the six mismatching cells — the other 30 cells hold):**

```
{"call":"end","state":"disposed","code":"disposed","ok":false,"committed":false,
 "inert":{"commitZero":true,"hooksNone":true,"noSourceCalls":true,"activeUnchanged":true}}
{"call":"end","state":"disposed-never-installed","code":"disposed",…}
{"call":"reset","state":"disposed","code":"disposed",…} … {"call":"reset","state":"disposed-never-installed","code":"disposed",…}
{"call":"cancel","state":"disposed","code":"disposed",…} … {"call":"cancel","state":"disposed-never-installed","code":"disposed",…}
```

**Attribution: DOC/SPEC DRIFT — a self-inconsistent cell in the register, not a module regression, and the
module is right.** `§2.3` item 7.3's list is **normative and explicit** for exactly this case (*"every
terminal reports `'disposed'` without detaching or committing"*), `§2.3` item 8 and `P-GS-SM-1` both say
`'disposed'` for any op on a disposed session, and the refusal is **inert at every cell** (no commit, no
hook, no source call, no half-terminated state — `notInert:[]` and `commitZero:true` in the payload). The
**register's code map for the terminal rows of its two `disposed` states is the outlier**, and the same
inconsistency is visible in **`P-GS-SM-1`'s own op list** (`O-8`, recorded rather than resolved).
**The remedy is a bounded documentation edit inside `§5.5.1 P-GS-IM-3`'s declared map** (and a matching
cell note in `P-GS-SM-1`) — **nothing in the module may be changed for this row, and nothing was.**
**No attempt term, id, strategy id or the `396` total is affected.**

### 7.3 The unit's own red set was **RUN for its count only** — three times, output filtered to the summary lines

**`vitest run tests/gesture-session.test.ts` → `Test Files 1 passed (1)` · `Tests 87 passed (87)` *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS; the as-run `77 passed (77)` is kept visible): the unit's own row file now carries `87` rows — the closure's row additions plus the `DIS-1` discard-shape row, which landed after this run — so `87 passed (87)` is the CURRENT count. THIS RUN scored `77` scenario rows of ITS OWN and that figure is unchanged.**)***, exit `0`,
observed at this tree state. **No assertion, row id, fixture or message of that file reached this session**
(the command's output was filtered to the two summary lines; the diagnostic re-runs used `-t '<row name>'`
on **my own** runner, never on the unit's file). The suite-level counts around it are in §3. **This is
evidence that the unit's own file is green at HEAD `8cc0743`; it is NOT evidence used to author, adjust or
score any row of this record.**

---

## 8. Ambiguities (`O-1`…`O-10`) — recorded, never silently resolved

**No clause below was edited, and no row was invented from an ambiguity.** Each is a claim I could not turn
into **one** falsifiable scenario, with the observed values that made it visible.

| # | The clause(s) | Why no single falsifiable scenario exists | What this run did instead (and observed) |
| --- | --- | --- | --- |
| **`O-1`** | **`§2.1` `GestureOptions.onStart`** (*"`readonly onStart?: (element: GestureElement) => void`"*) vs **`§2.1` `GestureOptionsInput.onStart`**'s doc block (*"It receives **the element and the gesture handle**"*) | The two halves of the same export block disagree on the argument **count**; one reading passes the element, the other passes `(element, handle)`. A row cannot assert both, and the session's own typed view (`GestureOptions`) is the narrower one | Drove the **narrower, typed** reading and recorded the other: `{"onStartCalls":1,"onStartArgIsElement":true,"onStartArgCount":1}` — **one argument, the element**, with `handle.element`-by-identity asserted through the **`begin`** path (`GS-G-49`/`GS-G-18`) and through the handle the session hands to `commit` (`GS-G-3`, `GS-G-12`). **Reported as an unpinned signature detail, not scored against the module** |
| **`O-2`** | **`§2.2` P-3 vs §2.3 item 6 vs the RULED capture-method amendment** — the session "calls a method the SOURCE supplies (named by the source, discovered by the session from its own supplied surface)", while the module's bytes must carry **no** DOM-specific capture-method token | The **capability's name itself is an implementation detail the spec deliberately does not pin** (the ruling names no name). A blind row cannot assert a name it is not given — and asserting the DOM name would be a P-3 violation, while asserting "no name exists" is false (something must be called) | Discovered the name **black-box** and asserted the **contract's observables** instead: exactly **one** capability name is touched (`capturePointer`), exactly **one** call, on the gesture's own element, after the three tracking `on`s and after `isConnected`, and **zero** for every falsy flag (`GS-G-67`, `GS-G-7`, `GS-G-39`, `GS-G-72`). **The name is a REPORTED observation, not a scored contract term** |
| **`O-3`** | **`§5.5.1 P-GS-IM-6`**'s *"`3` session shapes × `2` gesture states"* **vs** its own parenthetical for shape `(1)` (*"two controls installed, no gesture"*) — which has **no** gesture to be active-at-dispose | For shape `(1)`, the `active-at-dispose` cell and the `idle` cell describe **the same drive**; the register's `3 × 2 = 30` therefore counts **one drive twice** | Drove it **once and counted it twice**, and said so in the row's own observed note: `"shape (1) × state (2) is the same drive as state (1) (the register’s own parenthetical), so it is driven once and counted twice"` — **30 attempts reported against 30 declared, with the doubling named rather than hidden** |
| **`O-4`** | **`§2.3` item 7.3** (*"every terminal reports `'disposed'`"*) + **`§2.3` item 8** + **`P-GS-SM-1`** (*"`disposed`+ANY op ⇒ refused `'disposed'`"*) **vs** the `§2.3` item 4 table's own terminal row (*"any terminal on a stale/absent handle … `{ok:false, code:'stale' | 'no-gesture', committed:false}`"*) | Two admissible readings for a terminal on a **disposed** session: the terminal row of item 4's table gives no `'disposed'` member at all, while item 7.3/item 8 make `'disposed'` the governing code. **A row written for one reading is failed by the other** | Drove the **governing** reading (item 7.3/7.3/item 8) and recorded both — **including the fact that the two agree inside the module**: the terminals return `'disposed'` (`GS-G-52`, `GS-G-55`, `GS-G-70`, `GS-G-76`). The divergence is between the item-4 table's terminal row and item 7.3, and it is the **drift finding of §7.2** |
| **`O-5`** | **`§3.1 M-1`** (*"both installs return `true`"*) and **`§2.3` item 1(b)** (*a repeat install is a no-op returning `false`*) — **vs** a repeat install carrying **different options**, which `P-GS-SM-2`'s pair `install (1)` then `(1)` does not exercise with a second config | "First config wins" is pinned, but **whether a repeat install with a DIFFERENT config still returns `false` and keeps the first config** is only implied (the ruling's *"the first config wins and is not replaced"* — with no source call either way) | Drove the **first-config-wins** reading: a repeat install carrying `{selectors,threshold}` on an element already installed with a different config returns **`false`** with **zero source calls** (`GS-G-56`), and the identity ledger is unchanged (`GS-G-77`). **The "different config" case is recorded as driven under the ruling's own words, not as a pinned table cell** |
| **`O-6`** | **`§3.1 M-13`** (*"it reports `{removed: 5, complete: true}`"*) **vs `§2.3` item 7.4** (*"`DisposeReport.removed` counts the **successful** detaches"*) — for a session that has **already** completed a gesture | Both readings are admissible for the count: "every listener this session ever attached" (`5`, the `M-13` drive's own number, where the gesture was still in flight) or "the detaches **this call** performed". They differ whenever a gesture ended before the dispose | Drove **both, each against the reading that governs its own drive**, and recorded the numbers: `GS-G-13` (gesture in flight at dispose) reads **`{removed:5,complete:true}`** — the `M-13` figure; `GS-G-37` (gesture already ended) reads **`{removed:2,complete:true}`** for 5 lifetime `on`s, because the gesture's three went at its terminal; and `GS-G-72`/`GS-G-73` assert the per-call reading across all 30 register cells. **The two are consistent once "this call" is read literally; `M-13`'s figure is a special case of it, not a competing rule** |
| **`O-7`** | **`§3.5 R-11`** (*"the extended divergence harness DOES NOT EXIST"*) and **`§3.4 R-9`** (*"`docs/skills/designing-pages.md` DOES NOT EXIST at the time this unit's red set runs"*) | Both are satisfiable blind, but both are statements about **one tree state**; an existence probe cannot be "run" for all times, and its PASS means "absent **now**" | Probed both (`pageDesignExists:false`, `docs/skills` = `process-guardrails.md` alone; the `C2` deliverable's script is absent while the divergence **spec** exists and cites the harness) ⇒ PASS **as a probe at HEAD `8cc0743` only** (`GS-G-65`). **The claims are not generalized beyond this tree state** |
| **`O-8`** | **`P-GS-SM-1`**'s op list (*"`end(el, activeHandle)` · `end(el, staleHandle)`"*) and its property text (*"`disposed`+ANY op ⇒ refused `'disposed'`"*) — the op list's `staleHandle` op is undefined in the `disposed` state, and the same state×op grid gives a terminal code the `P-GS-IM-3` map reads differently | The register's two rows give **different reference maps** for the same cells: `P-GS-SM-1` says `'disposed'` for any op on a disposed session; `P-GS-IM-3`'s declared map (read by state shape) says `'no-gesture'` for its terminals | Drove the grid and recorded **both**: `GS-G-76`'s observed cells read `'disposed'` for every disposed op (`install` `false`), and its `declaredCode` column is printed **beside** the observation for the reconciliation, with the note *"the code column is this run’s OBSERVATION; the register’s declared cell is printed beside it"*. **The inconsistency is the §7.2 finding and is reported, not resolved** |
| **`O-9`** | **`§5.5.1 P-GS-IM-1`** — its property text quantifies over **every configuration**, its execution cell declares **`58` attempts** (`20 × 3, less 2`), and its own reconciliation sentence computes the enumeration as **`19 × 3 + 1 × 2 = 59`** while stating the declared count *"conservatively as `58`, one attempt fewer than the enumeration produces"* | Three figures for one row's extent (`20` configurations, `58` declared attempts, `59` enumerated attempts). **The spec records the declared figure as `396` while the enumeration measures `397`** — and no row can be scored against two different totals at once | Drove the **`20` configurations × 3 stages** as the cell describes and **measured `59` observations**, reporting **`declared:58` / `observationsMeasured:59` / `held:59`** side by side (`GS-G-68`, and §5.1's arithmetic table which prints **`396` declared / `397` measured**). **The declared figure is what the caps compare against; the measured figure is reported beside it and never substituted** |
| **`O-10`** | **`§5.5.1 P-GS-TP-1`** — its own CORRECTED cell says the declared term **`24` BINDS** and the drive is *"`4` SHAPES × `2` DRIVES per phase"*, while its as-filed prose also described **Phase C** as *"`10` methods × `5` hostile states"* (which does not multiply to `4` shapes) and the §5.5.2 breakdown recommendation describes *"three mechanically distinct totality tests"* whose phases **"do not share one input domain"** | The row's declared term, its per-phase prose and its phase table disagree about what the unit of an "attempt" is; a run that drives the phases' tables measures **more** than the declared term, and one that drives `4 × 2 × 3` measures exactly it | Drove **the phases' own enumerations** (A `8`, B `24`, C `50` = **`82` drives**) and reported them **beside** the declared `24`, with the note *"the register’s declared term is 24 DRIVES …; this run drives the phases’ own enumerations and reports that measured figure beside the declared one, never substituted for it"* (`GS-G-79`). **No id, term or total was moved; the discrepancy is recorded** |

**One further clause this run could not turn into a `§3`-shaped row, stated so it is not read as an
omission:** **`§2.2` P-6** (*"no new MCP surface … none of the six registration sites"*) — the runtime half
is driven (`GS-G-29`: no `commit()` member, no MCP descriptor on the instance, no `list_targets` handle),
and the repo-wide half is **`GS-G-75` (`NOT-BLIND-RUNNABLE`)**: the `ALL_TOOLS`/`RpcMethod`/
`MUTATING_METHODS`/`VALID_GROUPS` censuses live outside this unit's contract surface and were **not**
taken by this pass — **no bare count is reported in their place** (`§4.4 S-2`).

---

## 9. Self-corrections inside this run (checker/fixture defects, recorded so none is read as a finding or a pass)

Every item below was a **defect in my runner or my drive**, re-derived from the contract text; **no
scenario was softened, no expectation was relaxed to match an observation, and the two FAILs are
separate.** The observed values of the **final** run (§4) are the corrected drives only. The defects are
recorded because they are the same class the sibling greens records log, and because a reader must be able
to tell a corrected checker from a changed contract.

1. **My source fixture recorded `isConnected` in a separate array from the ordered call log.** Four rows
   (`GS-G-6`, `GS-G-11`, `GS-G-45`, `GS-G-27`) failed on a log that **omitted** the `isConnected` entry the
   spec's call log includes (`§2.3` item 2(a): *"after the establishment checks"*). Corrected by making
   the fixture record one interleaved log; the rows then held. **The module was right in every case.**
2. **My `isConnected` fixture member was not attached when the seam returned `false`.** A conditional
   built the member only for a truthy value, so `F-7`'s drive ran against a source with **no**
   `isConnected` at all. Corrected so the member is callable whenever it is not explicitly omitted; `F-7`
   then held on both halves. **The module was right.**
3. **My element helper returned a FRESH object on every call.** `el('A')` built a new `{name:'A'}` each
   time, so identity assertions compared two different objects; this broke `M-2`, `M-7`, `I-4`, `I-5`,
   `I-9`, the SM-1 state grid and the SM-2 ledger rows in ways that looked like module defects.
   Corrected to **one object per name**, plus a separate `elFresh()` for the deliberate
   structural-clone cases. **The module was right in every affected row** — and the correction is what
   made `I-9`'s clone discriminator falsifiable at all.
4. **`typesOn()` listed ATTACHMENTS, not live listeners.** A terminal's three `off`s did not shrink the
   list, so `I-4`'s post-terminal assertions read `4`/`7`/`10` instead of `1`. Corrected with a
   `liveTypes()` view built from the fixture's live registry. **The module was right** (`I-4` then read
   `1 → 4 → 1` after all three terminals).
5. **`offAttempts` was being counted from the recorded log.** The fixture pushes an `off` record *after*
   `off` returns, so a **throwing** `off` leaves no record — and my `I-5` drive read `0` attempts where
   the session had in fact attempted the detach once (confirmed by a diagnostic that counted attempts
   inside the source). Corrected to count the **attempt** separately from the **record**. **The module was
   right** (`{removed:0,complete:false}` with one attempt).
6. **Three register checkers compared the wrong view.** `P-GS-IM-1` compared **attachment** counts at the
   terminal stage (`4`) where the property is about **live** listeners (`1`); `P-GS-IM-4` did the same
   (`counts` came out `[1,4,4,4]`); and `P-GS-IM-1`'s stage list also leaked a non-stage field into the
   observation count (`78` instead of `59`). Corrected to count live listeners and to enumerate only the
   declared stages. **The module was right in all three.**
7. **`P-GS-IM-3`'s `idle-installed` state started a gesture by mistake.** My setup fell through to the
   `active` branch for the `idle-installed` state, so the cell drove `begin` against an **active** session
   and read `'busy'` where the declared code is `'ok'`. Corrected so `idle-installed` stays idle.
   **The module was right.**
8. **`P-GS-IM-3`'s stale-handle state did not stay stale.** I overwrote the stale handle with the newly
   active one, so the `'stale'` cells drove an **active** handle and read `'ok'`. Corrected to keep the
   earlier gesture's handle for the stale cells. **The module was right** — and the corrected grid is what
   isolated the **genuine** `disposed`×terminal drift of §7.2 (6 cells, `'disposed'` vs the map's
   `'no-gesture'`).
9. **`P-GS-IM-6` mixed the `two-controls-idle` and `two-controls-active` shapes for the same state key.**
   My shape loop always built `two-controls-active` while the state branch keyed its expected `removed`
   on the shape label, so two cells compared `2` against `5`. Corrected so each state's drive builds the
   shape it names and the expected `removed` follows the **drive**, not the label. **The module was right**
   (`{removed:2}` idle / `{removed:5}` active).
10. **`P-GS-SM-3` asserted value identity on shapes that never set a value, and across a shared commit
    list.** `last` was read from a list that persisted across shapes of the same path, and the identity
    checks ran over the `commit-throws` and `reset` shapes too — where the committed value is *correctly*
    `undefined` or the supplied default. Corrected to take the **last entry of that drive's own list** and
    to scope the identity checks to the `end`-family shapes, adding the **inverse** assertions for `reset`
    (commits the **supplied** value, not the gesture's) and `cancel` (zero commits). **The module was
    right throughout** — `32/32` counts, and the values verbatim by identity on both `end` shapes.
11. **`P-GS-TP-1` treated one of the register's own declared throws as a totality failure.** A `commit`
    callback that throws **must** propagate per `§2.3` item 5 (and `I-3c`), so two `end`/`reset` drives
    legitimately threw. Corrected to classify those two as `expectedPropagation` (the register's own
    declared `commit`-throws limbs) while still failing on **any** other throw. **The module was right**;
    `0` unexpected throws remained.
12. **`P-GS-IM-5` and `P-GS-IM-6` carried bookkeeping that never reached an assertion** (an unused
    pre-terminal `off` count and a stray terminal-stage variable). Removed; the observations are unchanged.
13. **`V` — one diagnostic run revealed that `gesture()` returns a `GestureStats` with no `element`
    field** (the five documented keys), while the **handle** carries `element` by identity. My first
    `M-2` drive asserted the identity on `gesture()`; corrected to assert it on the handle the session
    hands to `onStart`/`commit`. **This is the `O-1` ambiguity's sibling** (which argument the hooks
    receive) and is **recorded, not scored**.

**What these corrections do NOT do:** they **do not** touch the two FAILs, they **do not** convert any
`NOT-BLIND-RUNNABLE` row into a pass, and they **do not** change any of the register's declared terms. The
final run's `GSSUMMARY` line is the only scoring record.

---

## 10. The temporary runners — exact paths, and proof of deletion

**Paths used (all temporary):**

- **`tests/gs-blind-greens.tmp.test.ts`** — the **77 scored rows** (§4) + the `ZZ-summary` line.
- **`tests/gs-blind-diag.tmp.test.ts`** — the capture-capability discovery (which source member the
  session invokes) and the namespace/`POINTER_TYPES` census.
- **`tests/gs-blind-diag2.tmp.test.ts`** — the `isConnected` seam on a plain recording source (§9 item 2).
- **`tests/gs-blind-diag3.tmp.test.ts`** — `P-GS-SM-3`'s value-verbatim shapes including the throwing
  `commit` (§9 item 10).
- **`tests/gs-blind-diag4.tmp.test.ts`** — `on`/`off` handler identity and the `dispose()` `removed`
  semantics (§9 items 5, 9).
- **`tests/gs-blind-diag5.tmp.test.ts`** — the `I-4` stage sequence with an inline fixture, which isolated
  the attachment-vs-live-listener defect (§9 item 4).
- **`tests/gs-blind-diag6.tmp.test.ts`** — the same replay against the runner's own fixture, which
  reproduced the defect (§9 items 3, 4).
- **`tests/gs-blind-diag7.tmp.test.ts`** — the handle `element` descriptor, the `off`-attempt count and the
  reference match for a throwing `off` (§9 items 5, 13).
- **`tests/gs-blind-diag8.tmp.test.ts`** / **`tests/gs-blind-diag9.tmp.test.ts`** — the throwing-`off`
  `dispose()` behaviour across one control, two controls and a gesture in flight (§9 item 5).
- **`tests/gs-blind-diag10.tmp.test.ts`** — `gesture()` vs the handle's `element` (§9 item 13).
- **`tests/gs-blind-diag11.tmp.test.ts`** / **`tests/gs-blind-diag12.tmp.test.ts`** — the `I-4` row shape
  step by step, inline then via the fixture (§9 items 3, 4).
- **`tests/gs-blind-diag13.tmp.test.ts`** — `P-GS-IM-1`'s single configuration: live count vs `off` types.

**Deletion proof, exactly:** `ls tests/ | grep -c 'tmp'` prints **`0`**; `git status --porcelain` prints
**exactly one** line — **`?? docs/specs/gsession-greens.md`** — this artifact, which is the **only** file
this pass leaves behind. **The suite's file count returns to its HEAD value**: **`65 passed (65)` /
`1324 passed | 2 skipped (1326)`** with the temporary runners gone *(**⟶ CORRECTED 2026-09-27, THE GATE-7 PROOFREADER PASS: the live suite reads `1334` passed / `2` skipped (`1336`) and the unit's own file `87` rows — see §3's annotated rows and `docs/specs/gsession.md` `§3b.6` row 5a; this run's own figures stand as its HEAD-`8cc0743` measurement**)*, against **`79 passed (79)` /
`1420 passed | 2 skipped (1422)`** while they existed (§3). **This pass edited no tracked file**: not the
spec, not the module, not the red set, not the trackers, not `package.json`, not `scripts/**`, and it
never touched `node_modules/provident-ssr/` or `../Preempt-Providence/`.

**Scope of the blindness claim, exactly:** `src/shared/gesture-session.ts` was **never opened, never read,
never printed** — it was imported and called as a black box through its four documented value exports.
`tests/gesture-session.test.ts` was **never read** — it was **run three times for its count only**, with
the output filtered to the summary lines, and it contributed **nothing** to any drive. The only text read
for a probe was **`docs/next-steps.md`** (an `R-11` precondition lookup: is the extended divergence
harness cited) — **not used to author any scenario's content**.

---

## 11. Honesty — exactly what this run does and does not prove

**May rest on this record:**

- **the documented surface, exercised black-box**: `createGestureSession`, `installGestureListeners`,
  `detachGestureListeners`, `POINTER_TYPES` as the **only** four value exports (set equality with a
  fifth-export control — `GS-G-48`), `POINTER_TYPES`' four pinned names frozen (`GS-G-47`), and the
  `§2.5` delegate surface with its documented arities (`GS-G-49`);
- **the whole lifecycle as call counts**: one start listener per installed control on **its own element**
  (`GS-G-1`), the tracking three opened **only between start and terminal** (`GS-G-6`, `GS-G-36`,
  `GS-G-71`), **exactly one `commit`** per committing terminal (`GS-G-4`, `GS-G-32`, `GS-G-78`), **zero on
  cancel** (`GS-G-33`, `GS-G-78`), **one on reset of the caller-supplied value** (`GS-G-12`, `GS-G-34`),
  and the **baseline restored** by `dispose()` with `{removed, complete}` and idempotence (`GS-G-13`,
  `GS-G-37`, `GS-G-73`);
- **the five ruled decisions as behaviour**: `reset` as a terminal with exactly one commit of the
  caller-supplied value (`GS-G-12`, `GS-G-34`); the **session** invoking `commit` with **no
  consumer-reachable `commit()`** (`GS-G-29`, `GS-G-31`, `GS-G-1`); pointer-agnostic termination with
  `pointerup` unconditionally terminal (`GS-G-54`, `GS-G-30`); a repeat `install` as a
  **first-config-wins no-op with no source call** (`GS-G-56`, `GS-G-77`); and the count seam being
  `stats()`/`gesture()` with no MCP visibility (`GS-G-57`, `GS-G-29`);
- **the capture table**: zero before establishment, exactly one on an opted-in establishment, zero for
  every falsy flag, never more than one per gesture and **no release call invented** (`GS-G-7`, `GS-G-8`,
  `GS-G-39`, `GS-G-53`, `GS-G-72`) — and **the capability arrives through the INJECTED SOURCE under a
  source-supplied, module-neutral name** (`GS-G-67`), so **no DOM capture method is named by the module's
  invocation path as far as a black-box run can see**;
- **the four-state machine** (`GS-G-55`, `GS-G-76`), **every documented fail-state code** in the
  seven-member union (`GS-G-24`..`GS-G-28`, `GS-G-52`), **the ten prohibitions as far as black-box
  behaviour can show them** (`GS-G-18`, `GS-G-38`, `GS-G-40`, `GS-G-56`), and **totality at the seam for
  every hostile shape driven** (`GS-G-28`, `GS-G-42`, `GS-G-79`);
- **the register, exercised independently: `396` declared attempts, `397` measured, `389` held, `6` broken,
  `2` `propagatedByDesign`; stop-after-5 NOT TRIGGERED** — term by term against the eleven stated counts,
  with the four `YES (bounded)` rows still marked bounded *(`⟶ CORRECTED 2026-09-27, THE GATE-7 PROOFREADER PASS — the as-run word `four` is kept visible and the register's bounded set is **FIVE** rows: `ADV-GS-25` marked `P-GS-IM-2` `YES (bounded)` after this run, so the set is `P-GS-IM-1`, `P-GS-IM-2`, `P-GS-IM-5`, `P-GS-TP-1`, `P-GS-TP-2`; see `§5.1`'s own annotation above and `docs/specs/gsession.md` `§5.5.1`'s count note, `§5.5.2` item 2 and `§5.3` items 10/11)*, and **`26 of 30` distinct pool members drawn by
  the 60 pinned-seed draws** (no "all 30" claim);
- **the diff-scope and existence probes** by file/git probe (`GS-G-64`, `GS-G-65`), and the unit's own file
  green at HEAD `8cc0743` (`77 passed (77)`, count only). *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS): the count-only figure is now `87 passed (87)` (the unit's own file) and the suite is `65` files / `1336` tests — `1334` passed / `2` skipped; the blind run's own `77` SCENARIO rows and its `66 PASS / 2 FAIL / 9 NOT-BLIND-RUNNABLE` scoring are UNCHANGED. See this file's header note and `docs/specs/gsession.md` `§3b.6` row 5a for the current set.)*

**May NOT rest on this record:**

- **the module's source-level prohibitions.** `R-1`, `R-2`, `R-3`'s token half, `R-4`, `R-5`'s static half,
  `R-6`(b)/(c), `R-8` and `F-9(b)` are **`NOT-BLIND-RUNNABLE`** and **ungreen here**. **A reader may not
  infer from this file that the module carries no banned vocabulary, no realm-rooted access, no
  unauthorized import, no geometry read or no new registration-site entry** — those are **owed** to a
  source-reading pass, and a self-verified greens set authored by the implementer is a review finding
  (`RCA-4`).
- **the two `FAIL`s as anything but drift.** `GS-G-50` and `GS-G-70` are **doc/spec defects** (§7.1,
  §7.2) with reproduced inputs; **the module was not changed for either**, and **no DONE row may read the unit as fully doc-clean** until
  `§2.1`'s `detachGestureListeners` sentence and `§5.5.1 P-GS-IM-3`'s declared code map are edited by the
  pass that owns them. *(**⟶ CORRECTED 2026-09-27 (THE GATE-7 PROOFREADER PASS — the condition above is now MET, and the as-run sentence is kept visible): BOTH SPEC SITES ARE EDITED (`D-3` landed — the two FAIL rows above carry their own `⟶ RECONCILED` annotations), so the unit is DOC-CLEAN ON THE TWO DRIFTS THIS RUN FOUND. What still may NOT be read from this artifact: its suite/row figures, which are this run's HEAD-`8cc0743` measurement (`65` files / `1326` tests; the unit's own file at `77` rows) — the CURRENT tree reads `65` files / **`1336`** tests — `1334` passed / `2` skipped — with the unit's file at **`87`** rows.**)*
- **anything about the assembled app, the renderer, IPC, the MCP transport, or a real pointer.** The
  module is imported by **no `src/**` file**; no window was booted, no transport was exercised, and **no
  real DOM element or event was touched** in any row.
- **any CSS validity, rendered geometry, layout, paint, coordinate or click-retargeting claim.** Every
  source here is a **recording object** and every element an **argument**, so the green proves **the calls
  the session made** and **nothing** about what a browser does with them (`§7` item 6, layer anchors 3/5).
- **the `[U]` row** — the unit **offers none** (`§5.2`'s structural reason: no importer, no coordinate
  read, all claims are counts) — and the `[D]` row — **`F-12` is `PRECONDITION-GATED` and NOT CLAIMED**.
  Neither was taken, and **no row was moved to either leg**.
- **no `[U]`-shaped consequence may be inferred either**: this run says nothing about whether a real pane
  resizes, a drag is agent-drivable, or a `click` is or is not retargeted (`I-11`, `R-8`, `RK-19`'s class).

**One-line layer honesty:** *77 node-layer `[T]`/`[S]` scenario rows, authored and run from
`docs/specs/gsession.md` alone against `src/shared/gesture-session.ts` imported as a black box over
caller-supplied recording sources — **66 PASS / 2 FAIL / 9 NOT-BLIND-RUNNABLE**, the register at `397`
attempts measured against `396` declared and `10 of 11` rows held, both FAILs attributed to doc/spec drift
— a node green, never assembled-app evidence, and the `[U]`/`[D]` rows are not taken.*
