# Live battery — `U-SECURE-EXCLUSION` (`S1`, wave `S`) · **gate 6, THE MANDATORY LIVE BATTERY — RE-RUN AFTER THE CONTRACT AMENDMENT, RE-INSTRUMENTED AFTER THE `§6.2` AUDIT**

**Status: `RUN — RE-RUN AFTER THE SECOND 6.2 AUDIT'S FINDINGS (`F-A1`…`F-A18`); AWAITING ITS RE-AUDIT (2026-10-09)` — `34` measured rows recorded = `34 PASS / 0 FAIL / 0 MANUAL / 0 PARKED`, exit `0`, reproduced on a SECOND execution (`34/0` twice); the driver's exit code is now EVIDENCE (it is `1` on any run with a FAIL — `§4a` `F-5`).**
**⟶ THE `32`-ROW FIGURES THAT PRECEDED THIS PASS ARE KEPT BESIDE IT, NOT REWRITTEN (`RCA-8(d)`): the 2026-10-09 first pass ran `32` rows = `32 PASS / 0 FAIL` twice at revision `b78967e`. THIS pass (the second `§6.2` audit's `F-A1`–`F-A18`) repaired fifteen findings, added TWO rows (`SX-G-03`, the registry row's DELETION/RED-FAIL CONTROL) and re-ran twice at revision `992ea27`; the driver's sha256 stands in `§0`.**

> **⟶ THE 2026-10-09 SECOND REPAIR PASS — THE SECOND `§6.2` AUDIT'S `F-A1`…`F-A18` (`VALID-WITH-FINDINGS`), EACH DISPOSITIONED AT `§4b`, AND THE RUN RE-TAKEN.** A second **non-author** read-only `§6.2` audit ran over the regenerated `§2`/`§3` and returned **`VALID-WITH-FINDINGS`** with **one HIGH that blocked a green gate 6**: **`F-A1` — the registry row (`U-2`'s registry half / `U-7`, `§5` row 12) had NO TERM ASSERTING THAT THE EXCLUSION TRANSITION EVER HAPPENED**, so with the transition mechanism deleted both `tools/list` readings are the same set and **the row still read PASS** — the row's own subject was unverified against deletion, and this is the `F16` class the previous pass had left **acknowledged but UNDISPOSITIONED**. **IT IS FIXED WITH A PRECONDITION TERM AND A DELETION FIXTURE DRIVEN THROUGH THE ROW'S OWN PREDICATE** (the set-equality half is untouched, character for character). Fifteen findings are repaired, **two are `DECLARED-LIMIT`/`HANDED BACK` with named owners**, and the run is re-taken: **`34` rows = `34 PASS / 0 FAIL`, exit `0`, twice** (`§0`, `§5`). **WHAT THIS PASS DID NOT DO IS AT `§8` items 21–27**, and the two rulings it may NOT make are **`GAP-1`** (`[CDP]`-in-place-of-`MANUAL`) and **`GAP-2`** (whether `§2.3` item 3's straddle is a matrix subject) — **both OPEN, both the owner's, neither self-ratified.**
>
> **⟶ THE 2026-10-09 FIRST REPAIR PASS — WHAT CHANGED AND WHY (the first `§6.2` audit's findings; `RCA-8(d)` ANNOTATE-BESIDE: every as-filed value below is KEPT, never rewritten).** A **non-author** `§6.2` audit returned **`VALID-WITH-FINDINGS`** with **ONE HIGH that blocked a green gate 6**: **`F1` — `U-6`'s RESTART ARM was instrumented on a DIFFERENT PROFILE than this record claimed, and its predicate COULD NOT FAIL.** The as-filed arm booted the restart on a **fresh `mkdtemp` profile the driver seeded itself**, while `§3`'s `real_input.evidence` claimed *"a genuinely NEW process booted on the same scratch profile"*; boot A's OWN post-transition profile was **never read**; and the predicate `restartAnswer.isError !== true && !JSON.stringify(restartHtml.census ?? {}).includes('exclusion')` was satisfied by a **THROWN** call (`isError` is `undefined` on `{ok:false,error}`) and by an **ABSENT** `census` member (`?? {}`) — **so deleting the feature still read PASS**: the `D-19`/`N-5` property was **not measured at all**. **IT IS NOW MEASURED**, on boot A's own post-transition profile (a `cpSync` copy made after the transition), as named terms whose live reading is green and whose **deletion/regression CONTROL reddens every fixture** — including a store file that DOES carry an `exclusion` key plus a third profile file. **The other findings (`F2`–`F15`) are dispositioned at `§4a`, each with the measurement that closes it.** **THE AUDIT'S OWN SUBJECT HAS SINCE MOVED TWICE** (the `F-A` pass edited the same rows again), so the audit of `§2`/`§3` is owed again to another non-author (`§8` item 25).

**The as-filed run of this battery was `29` rows = `23 PASS / 6 FAIL / 0 MANUAL / 0 PARKED`** (revision `da6fc42`); the 2026-10-08 re-run was `30` rows = `30 PASS / 0 FAIL` (revision `afd3212`), whose two re-grained rows are re-stated at `§4`.
**THIS PASS DID NOT WEAKEN A ROW TO MAKE IT PASS.** One row was **RE-INSTRUMENTED** (the restart arm — its predicate now has **12** terms where it had two, and its control reddens on the deletion case), one predicate was **RE-GRAINED** (the straddle row's declared falsifier is now asserted, not printed), one verdict was **corrected into the closed set** (`REPORT` → `FAIL`), one falsifier was **made fail-able instead of fatal** (`U-1`'s `present` guard), and **two rows were ADDED** (the stale-window preflight, and the restart arm's DELETION/RED-FAIL CONTROL) — the restart arm itself being **RE-INSTRUMENTED** (one row became two, `§5` rows 17–18). **Every one of those changes is INSTRUMENT-side: no `src/**` line was touched (`§8` item 14). What was NOT done is at `§8` items 14–20.**

## 0. THE RE-RUN'S OWN RECORD (the terms, then the claims)

| | |
| --- | --- |
| The revision the battery re-ran on | **`afd3212`** (`S1 GATE 6 FIX GREEN 2 — …`, the receipt's additive `message` + the deletion of the `exclusionOpen` term from the re-gate path); the as-filed run ran on `da6fc42` |
| The commands | **`npm run build`** then **`node tests/secure-exclusion-live.mjs`** — exit `0` both; the run reproduced on a **second execution** (`30 PASS / 0 FAIL` twice) |
| The verdict-count lineage | `23 PASS / 6 FAIL` (as filed) → **`27 PASS / 2 FAIL`** (the implementer's two fixes, measured on the unchanged driver) → **`30 PASS / 0 FAIL`** (this pass: `+1` row — the predicate control — and two re-grains) |
| The two remaining failures, assessed | **`U-6 (reload arm, main-side state)` = STALE PREDICATE — RE-GRAINED** (it asserted the SUPERSEDED registry-toggling carrier); **`U-4 (return arm, HTTP)` = WRONG INSTRUMENT — RE-GROUNDED ON THE MANUAL-UI PATH** (it asserted an MCP/HTTP return arm the contract does not provide). Neither was a live regression of the amended contract. **The measurements, the clauses and the controls are at `§4` and `§7`, stated so a reader can re-derive both verdicts rather than take them.** |
| The `§5.U` matrix / `§6.1` report | matrix **`8` rows** (`7` U-subjects + the demoted `U-8` precondition note — the `≤ 8` cap **not grown**), report `summary.total === 8` ✓, `§3` |
| `§6.2`'s read-only audit | **STILL OWED TO A NON-AUTHOR — THIS PASS DID NOT RUN IT AND MAY NOT** (`§8` item 5) |

**⟶ SUPERSEDED BESIDE (2026-10-09): the two cells above that this pass CHANGED, with their as-filed values kept visible**
(`RCA-8(d)`) — the as-filed cell text stands verbatim in the table above and in git history; the post-fix reading is:

| The cell | As filed (2026-10-08) | **Post-fix (2026-10-09), measured** |
| --- | --- | --- |
| The `§5.U` matrix / `§6.1` report | matrix `8` rows = `7` U-subjects + the `U-8` note; report `summary.total === 8` | matrix **`7` U-rows** (the `U-8` precondition is a NOTE BESIDE the table, not one of its rows) + `1` non-U note; report **`summary.total === 7`** ✓ = the matrix's **U-row** count, `rows[]` = the same `7` rows (`§6.1` clause 1: "`summary.total` = **the matrix's U-row count**", and `rows[]` = "one entry per matrix **U-row**"). The `8` was the matrix's ROW count, not its U-row count — the audit's `F2` |
| The `§6.2` read-only audit | "still owed to a non-author" | **TAKEN**, by a non-author, read-only, and returned **`VALID-WITH-FINDINGS`**: every real U-row's PASS reads the assembled app, both earlier re-groundings are justified by the amended clauses, the zero-park claim is honest — **but `F1` (HIGH) blocked a green gate 6**, and `F2`–`F15` were owed. **THIS PASS IS THE FIX + RE-MEASURE, and it re-states the whole row set from a fresh double run** (`§4a`, `§5`) |
| The commands / exit code | `node tests/secure-exclusion-live.mjs` — "exit `0` both" | `node tests/secure-exclusion-live.mjs` → **exit `0` twice**, and the exit code now MEANS something: the driver exits `1` iff any row is `FAIL` (as filed it ended `process.exit(0)` unconditionally, so the as-filed 6-FAIL run carried the same `0` — the audit's `F5`) |
| The verdict-count lineage | `23/6` → `27/2` → `30 PASS / 0 FAIL` (30 rows) | `23/6` → `27/2` → `30/0` (30 rows) → **`32 PASS / 0 FAIL`** (32 rows), `30 → 32` by `+1` for the stale-window PREFLIGHT (new row 1) and `+1` because the restart arm's ONE row became TWO (the re-instrumented arm, `§5` row 17, plus its DELETION/RED-FAIL CONTROL, row 18) |

**What this file is.** The gate-6 **run record** for the unit `U-SECURE-EXCLUSION` (the access-control
mutual-exclusion gate between the MCP server and the `secure` tier-4 operator pane), together with **the
`§5.U` delta matrix** and **the `§6.1` structured coverage report** that
`docs/specs/secure-exclusion.md` `§2.4` item 7(2)/(3) and `docs/specs/user-flow-audit.md` `§6` require.
**It is written BY THE LIVE RUN, FROM THE RUN — every observation below is a value a named instrument
printed, never a projection.**

| The record's own facts | Value |
| --- | --- |
| The revision the battery ran on | `da6fc42` (`S1 GATE 5 BLIND GREENS …`) — with the driver at its own commit `4f1af13` |
| `git status --porcelain` at the run's start | the driver only (untracked at the first run, committed at `4f1af13` before the final run) |
| Host clock | `2026-10-06 04:00 UTC` (the final run) |
| The driver | `tests/secure-exclusion-live.mjs` — the ONE file this pass added |
| The operator's real profile | **never read, never written**: every boot ran on a fresh `mkdtemp` scratch profile under the OS temp dir, removed on every exit path |
| Stale-window preflight | no `dist/main/main.cjs` process existed at the run's start (`pgrep` → empty); each boot is its own process and each is killed in a registered `exit` cleanup |

**⟶ THE 2026-10-08 RE-RUN'S OWN FACTS (the cells above are the AS-FILED run's and stand as such; these are the
re-run's).** The revision is **`afd3212`**; the stale-window preflight was `pgrep -f 'dist/main/main.cjs'` → empty before
each boot; the commands were **`npm run build`** then **`node tests/secure-exclusion-live.mjs`** (exit `0`, `30` rows =
`30 PASS / 0 FAIL / 0 MANUAL / 0 PARKED`), and the identical figure was **reproduced on a second execution**; the two
files this pass edited are the driver and **this record** (`git status --porcelain` at the run's start carried only those
two). **The scratch-profile rule is unchanged and re-observed**: three boots (stdio, HTTP, the restart probe), each on its
own `mkdtemp` profile under the OS temp dir, each killed and removed through the registered `exit` cleanup.

> **⟶ CORRECTED BESIDE, 2026-10-09 (the audit's `F1`): THE RESTART BOOT WAS NOT ON THE PROFILE THE RECORD CLAIMED.**
> The words above are the 2026-10-08 pass's and stand as its record; **the claim they make about the restart probe is
> FALSE OF THAT RUN**: the restart was booted on a **fresh `mkdtemp` profile which the driver itself seeded**
> (`writeFileSync(… 'provident-security.json', {token, enabled})`), NOT on boot A's profile and NOT on "the same scratch
> profile" the `§3` `real_input.evidence` cell asserted. **THIS PASS REPLACES THAT ARM** (`§4a` `F1`; `§7` item 6): the
> restart now boots on a **`cpSync` copy of boot A's OWN post-transition profile**, made after the transition, with the
> copy's list-and-byte fidelity, the store-space file set, the absence of an `exclusion` key, the new-process identity and
> the measured open-state precondition all INSIDE the predicate.

**⟶ THE 2026-10-09 FIRST PASS'S OWN FACTS (kept as that pass's record; THIS pass's cells are the table in `§0` and the two-row delta in the block above).**

| The record's own facts (2026-10-09, FIRST pass) | Value |
| --- | --- |
| The revision the battery ran on | **`992ea27`** (`STORE-COMPLIANCE LIVE BATTERY (2026-10-09) …`) at BOTH recorded runs (the driver and this record were edited-and-uncommitted then), and **`6c602a5`** (`U-SECURE-EXCLUSION (S1) GATE 6 — THE SECOND §6.2 AUDIT'S F-A1..F-A18 REPAIRED …`, this pass's OWN gate commit) at the **THIRD, POST-COMMIT re-run** — `34` rows = `34 PASS / 0 FAIL`, exit `0` |
| The driver's sha256 (post-edit) | **`e7eb7889f2fd42950d63155c87aca5564ab8022a4ce0d4c66e8d5b6ff30841e1`** (`tests/secure-exclusion-live.mjs`, as COMMITTED at `6c602a5` — the file both runs below executed **and** the file that was re-run a THIRD time post-commit, `34/0` again). **⟶ CORRECTED BESIDE (`RCA-8(d)`): an EARLIER draft of this cell carried `e601440162fcbb5b8739013d948abb4975e1c2bddee6163f94ff56642302a5b7`, which was a STALE PRE-EDIT reading taken before the final two driver text-corrections landed** — a hash is only evidence of the file it was measured on, so the stale value is kept visible here rather than silently replaced. |
| The commands | **`npm run build`** → exit `0`; **`node tests/secure-exclusion-live.mjs`** → **exit `0`**, `34` rows = `34 PASS / 0 FAIL / 0 MANUAL / 0 PARKED`, **reproduced on a second execution** (`34/0` twice, exit `0` both) — **and a THIRD time POST-COMMIT at `6c602a5`** (`34/0`, exit `0`; restart pid `180055` vs boot A's `179699`, store `86` chars both sides), so the executed file's identity is confirmed against the committed blob |
| The two runs' own figures | run 1: restart pid **`173325`** vs boot A's **`172991`**, store bytes **`87`** chars on both sides; run 2: restart pid **`173921`** vs boot A's **`173628`**, store bytes **`86`** chars on both sides (the only difference between the runs is the fresh scratch profile's token length and the pids, which is what a second live run should differ in). Both runs: baseline settled in `31` polls at age `30 s`, `18`-entry profile listing, `13` handles on both sides of the registry row, `200` on the `SX-G-42` control and on the post-gesture POST, the registry deletion fixture refused on `open-state-bridge` alone |
| The preflight | **IN THE DRIVER** (the audit's `F10`): `ps -eo pid=,args=` scanned for `dist/main/main.cjs` before the first boot, recorded as its **own** row (`§5` row 1, id **`SX-G-45p`** since this pass — the audit's `F-A15`). A stale window now STOPS the run with exit `1` and no summary — the operator step the as-filed record declared is no longer taken on trust |
| `git status --porcelain` at the runs' start | `tests/secure-exclusion-live.mjs`, `docs/specs/secure-exclusion-live-battery.md` and `docs/specs/secure-exclusion.md` (the ONE `F-A17` annotation), all modified — this pass's own three files; nothing else |
| The scratch profiles | four directories, all under the OS temp dir, all removed through the registered `exit` cleanup: boot A's, the HTTP boot's, the restart copy (inside `se-live-restart-*`) and the **deletion-control fixture** directory (also inside `se-live-restart-*`). **The operator's real profile is still never read and never written** |
| The boots | three live Electron processes on `DISPLAY=:0` (boot A stdio + CDP, the HTTP boot + CDP, the restart probe on the copy), each killed on every exit path |

---

## 1. THE PREDICATE DECISION (`docs/specs/user-flow-audit.md` `§7.1`) — **TRIGGERS**

**RECORDED, per that file's item 1, which requires the decision to be mechanical and recorded either way.**

| Limb | Holds? | The evidence that decided it |
| --- | --- | --- |
| **A — `DOM-SHIM-BLINDNESS`** | **YES** | the unit **adds a rendered surface**: an element (`props.id = 'exclusion-toggle'`, `css.classes = ['btn']`), a label node, a text (`Enable MCP` / `Disable MCP`), and a trailing text segment on the landed `security-status` line (`· MCP: enabled` / `· MCP: disabled`). **MEASURED live at this head**: the toggle paints a **`59 × 36` px rendered box** at `(679, 781)`, `display: block`, and the status line carries `MCP: enabled` — none of which a node suite or a DOM shim can see. |
| **B — `UI-OVERHAUL`** | **YES** | the unit **changes a user-visible flow**: an operator presses a control and the MCP server's availability changes — a state whose result is visible in a real host (`MCP: enabled → disabled`, and every tool call answered or refused accordingly). |

**NO ZERO-ROW EXEMPTION IS CLAIMED AND NONE APPLIES.** `docs/specs/secure-exclusion.md` `§2.4` item 7(5)
refuses the `G3` `STRUCTURAL` exemption positively; this battery does not create one either:
**`0` rows are parked and `0` rows are labelled `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT`**, because every
row below was read by a named instrument.

---

## 2. THE `§5.U` DELTA MATRIX — **`7` U-rows, `≤ 8` ✓ — and the `U-8` precondition printed BESIDE the table, NOT as a row of it**

**The shape is the one `docs/specs/user-flow-audit.md` `§5` imports from the landed
`docs/specs/gutter-ui.md` `§5.U`: a `Pre` observation, a `Post` observation MEASURED at the live gate, a
layer label, and the exact instrument. `U-1`…`U-7` are the seven SUBJECTS
`docs/specs/secure-exclusion.md` `§2.4` item 7(2)/(2-note) declares; the cap's eighth slot is NOT filled by
an invented flow.**
**⟶ REGENERATED 2026-10-09 TO THE POST-FIX STATE (the `§6.2` audit's `F2`; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed
`Post` cells stand at git history and at `§4`, where each one's contradiction is dispositioned, and are NOT rewritten
here). THE ROW COUNT IS NOW UNAMBIGUOUS: the table below carries the `7` U-ROWS AND NOTHING ELSE; the `U-8` precondition
and the in-flight declared limit are printed BESIDE it, as NOTES. `rows[]` in `§3` carries those same `7` rows and
`summary.total` reads `7` — the matrix's **U-row** count, which is exactly what `docs/specs/user-flow-audit.md` `§6.1`
names in BOTH places ("`rows[]`: one entry per matrix **U-row**"; "`summary.total`: **the matrix's U-row count**"). THE
AS-FILED REPORT ASSERTED `8` — the matrix's ROW count, including the demoted `U-8` note, counted as one of its eight
PASSES. That is the audit's `F2`, and it is closed here rather than by asking the owner to widen `§6.1`.**

| U-row | The user-visible flow | `Pre` (before this unit / before the transition) | `Post` — **MEASURED at the 2026-10-09 run, never projected** | Layer |
| --- | --- | --- | --- | --- |
| **`U-1`** | the exclusion toggle **and its label are painted** in the operator pane | no control: the pane's authored envelope carries no exclusion node, and the status line ends at `journal: ∞` | **the control IS painted and the label IS painted**: box `59 × 36` px at `(679, 781)`, `display: block`, `class="btn"`, label text `MCP / secure-tier exclusion (mutually exclusive)`, button text `Disable MCP`, `data-state="mcp-enabled"` — re-measured this run, unchanged; the status line's own full text is now **PRINTED by a row** (`§5` row 15, the audit's `F-A16`): `token: •••• · enabled: [read, dispatch, graph, code] · journal: ∞ · MCP: enabled`. **THE PREDICATE ASSERTS `present` FIRST** (the first audit's `F14`) **and the AFFORDANCE WORD IS NOW A TERM** (`buttonText === 'Disable MCP'`, the second audit's `F-A11`): the as-filed form dereferenced `box.w` on a `{present:false}` reading and **ABORTED THE WHOLE RUN** with a `TypeError`, and it asserted the box and the label while the affordance word the matrix and the contract both claim was printed only | `[U]` |
| **`U-2`** | clicking it moves the status line's `MCP:` segment `enabled → disabled`, **and the registration set is untouched** | `MCP: enabled`; a normal tool answer (`provident.get_markdown` → 2354-char HTML, `isError` absent); `19` handles listed | **SATISFIED, both halves MEASURED**: a REAL CDP pointer press+release on the painted control (`click landed on "BUTTON#exclusion-toggle" at (708,348) inside a 59x36 box (isTarget=true)`) moves the segment to **`disabled`**, the button to `Enable MCP`, `data-state` to `mcp-disabled`, and the live MCP server begins answering the DECLARED RECEIPT — **and the LANDING FLAG IS NOW PART OF THE PREDICATE** (`clickLanded`, the first `§6.2` audit's `F9`); **and across a REAL exclusion transition whose OWN PRECONDITION IS NOW A TERM, `tools/list` answered the SAME `13` handles while open that it answered while closed (set-equal `true`, names lost `[]`; `19` at boot before the sibling-control row moved the enabled-GROUP set — a DIFFERENT mechanism), on the ONE already-connected client.** **⟶ RE-INSTRUMENTED 2026-10-09 (the SECOND `§6.2` audit's `F-A1`, HIGH): THE BRIDGE'S OWN READING IS NOW READ ON BOTH SIDES OF THE TRANSITION AND IS A PREDICATE TERM** (`exclusion="mcp-enabled"` before the closed listing, `"mcp-disabled"` before the open one), the predicate is the named `5`-term function `registrationTransitionProperty` (the two bridge readings + the two listing types + the **as-filed set-equality half, kept character for character**), and the row BESIDE it drives `5` DELETION/REGRESSION fixtures through that SAME function — **the first fixture IS the deletion** (the transition never happens: both listings identical, the bridge never moves) and it is **REFUSED on `open-state-bridge` alone**, which is exactly the shape the as-filed row could not see | `[U]` |
| **`U-3`** | while the state is open, an MCP call answers the declared refusal | the state is `mcp-enabled`, so the predicate does not run at all | **the DECLARED RECEIPT is the live answer, on both a group-enabled tool and the always-registered one**: `provident.get_markdown` and `provident.dispatch` each answered `{"status":"refused","reason":"exclusion-closed","message":"MCP endpoint functionality is blocked because the security store is open — retry once the operator has finished with the secured changes."}` as the tool's RESULT with `isError` **ABSENT** (never an MCP protocol error); on HTTP the authorized POST answered `503` + `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}` | `[U]` + `[H]` |
| **`U-4`** | clicking it back restores normal answers | `MCP: disabled` / answers refused | **SATISFIED on the two arms the contract DECLARES, both MEASURED**: (i) through the pane's own declared bridge member the return restores NORMAL answers (`provident.get_markdown` → `ok=true`, `isError` absent, the receipt `null`, the markdown present), and a call ISSUED while open was answered the receipt; (ii) **on the HTTP transport the return is the OPERATOR's own act** — a REAL CDP pointer gesture on THAT boot's painted control (`box 56x36 px`, `hit="BUTTON#exclusion-toggle"`, `isTarget=true`) moved its segment `disabled → enabled` (`data-state` `mcp-disabled → mcp-enabled`, bridge `exclusion="mcp-enabled"`) and the authorized POST afterwards answered **`200`** instead of `503`, **while the MCP-carried return POST stayed `503`** (the contract grants an MCP caller no re-arm authority). **THE "NEVER DISPATCHED" CLAUSE IS A `[H]`-LAYER CITATION, NOT A DRIVER TERM (the second audit's `F-A11`, re-worded 2026-10-09):** what the driver MEASURES is that the open-state call's RESULT is the receipt itself (`declaredReceipt(...) !== null`, `isError` absent) — the refusal is the declared ANSWER, which the contract's `§2.2` item 2(a) delivers AT THE INVOCATION TURN, before any dispatch to the renderer; the renderer-side `sends=0` property is driven at the `[H]` layer by the register's `A-2#5`/`P-EX-IM-3` cells (`tests/secure-exclusion-register.ts`), and the as-filed cell's *"and never dispatched"* is corrected here to say WHICH layer asserts it. **AND the post-gesture `200` IS asserted as `200` itself** (the audit's `F-A9`: the as-filed term was `!== 503`, which a `401`/`500` would have satisfied) | `[U]` + `[H]` |
| **`U-5`** | the app graph's `get_rendered_html` / `list_targets` **never** contain the control | the pre-change app graph carries no exclusion-shaped node or id | **the isolation holds with the new node** (re-measured, unchanged): `get_rendered_html` → **2354 chars, contains `exclusion-toggle`: `false`**, `list_targets` → **`23` nodes, exclusion-shaped: `[]`** (the declared census `23`), while the PANE realm carries the control (`true`/`true`) as the positive control. **THE `#app` MOUNT'S OWN ABSENCE IS NOW A PREDICATE TERM** (the second audit's `F-A11`): `isolation.appMountHasToggle === false` **and** the `#app` mount's `innerHTML` contains neither `exclusion-toggle` nor `exclusion-control` — both were computed and only the toggle half was printed, while this cell's own `Post` claim ("`#app` has neither") was unasserted | `[U]` + `[H]` |
| **`U-6`** | the disabled state survives a **renderer reload**, while a **restart** returns to `mcp-enabled` **and the flag is NOT persisted** | renderer: the pane reads `MCP: enabled`; main: state `mcp-enabled`; **no `exclusion` key anywhere in the store file, and no third file in the profile directory** | **SPLIT, AND NOW WHOLE ON BOTH SIDES — WITH THE RESTART ARM RE-INSTRUMENTED (the FIRST audit's blocking `F1`) AND ITS THIRD READING MADE A BYTE TERM (the SECOND audit's `F-A7`)**: after `Page.reload` the live MCP call **is still refused AND the refusal IS the DECLARED RECEIPT** (`isError` ABSENT, the `message` naming cause and remedy) — the state is main-side and the reload did not re-arm it — **and the re-painted pane reads `MCP: disabled` / `data-state="mcp-disabled"` / `Enable MCP` with `IPC_SECURITY_GET` answering `exclusion="mcp-disabled"`, i.e. the operator's view agrees with the server that is refusing**. **THE RESTART BOOTS ON A BYTE-EXACT `cpSync` COPY OF BOOT A'S OWN POST-TRANSITION PROFILE**, made after the transition, with the open state MEASURED on that profile at the moment of the copy (live bridge `mcp-disabled` AND a live stdio call answering the receipt): the NEW process answers NORMALLY (`ok=true`, a real markdown, `receipt=null`), and the profile it was booted on carries **the SAME raw listing as boot A's own post-transition profile (18 entries on this host — the Chromium runtime's own `Cache/`, `GPUCache/`, `DIPS`, `Trust Tokens`, `Preferences`, `Network Persistent State`, … are present and NAMED; the store-space filter is a term)** with **NO entry added by the transition**, the store bytes **identical in all THREE readings (boot A's own file, the copy as made, the copy after the restart boot)** and **no `exclusion` key in any of them**. **THE TWO RUNS OF THIS PASS RE-TAKE THE FIGURES THIS CELL QUOTES** (`§5` row 20): run 1 pid **`173325`** vs boot A's **`172991`** with the store at **`87`** chars on both sides; run 2 pid **`173921`** vs **`173628`** at **`86`** chars on both sides — and the `F-A7` term `post-boot-bytes-identical` reads `true` in BOTH runs, so "identical in all three readings" is a READING here, not an inference from a substring check. **`13` named terms, all true; `9` deletion/regression fixtures, all refused** (`§4a` `F1` + `§4b` `F-A7`) | `[U]` + `[H]` |
| **`U-7`** | the stdio transport stays **CONNECTED** across the transition | one connected stdio path, `19` handles listed | **CONNECTED throughout, re-measured on the SAME client across a real transition**: the one already-connected stdio client answered `tools/list` while closed (`13` handles), then the transition, then `tools/list` while open (`13` handles, set-equal) — no reconnect, no re-handshake, no rebuild; on the HTTP boot the transport answered `405`/`401`/`200`/`503` **and then `200` again after the operator's return** on the SAME listener | `[U]` + `[H]` |

**THE CAP, PRINTED WITH ITS TERMS: `7` U-ROWS, `7 ≤ 8` ✓ — the cap's eighth slot is UNUSED: no eighth FLOW was invented to fill it, and no subject was merged or dropped. THE POST-FIX RUN DID NOT ADD A U-ROW: the rows this pass ADDED to the BATTERY are a PREFLIGHT and a CONTROL (`§5` rows 1 and 18) plus the re-instrumented restart arm — none of them a user-visible flow.**

**⟶ THE `U-8` PRECONDITION / BATTERY NOTE — BESIDE THE MATRIX, NOT A ROW OF IT** (`docs/specs/secure-exclusion.md` `§2.4` item 7(2)'s demotion; the audit's `F2`).** The battery leaves the tree in its starting state: the run restores `mcp-enabled` before completion — this run's HTTP boot was returned to `mcp-enabled` by the operator's own act on its pane (`§5` row 29, the renumbered HTTP return arm) — and every scratch directory was removed (`rmSync` on all four: boot A's profile, the HTTP boot's profile, the restart copy and the deletion-control fixture), so a re-run starts clean. **TERMS: `8` matrix ROWS = `7` U-ROWS + `1` NON-U NOTE, and the report's `rows[]` and `summary.total` read `7`, because `§6.1` counts U-rows** — a non-flow row is not one of the report's PASSes (the audit's `F2`).**

**⟶ THE IN-FLIGHT / STRADDLE DECLARED LIMIT — `§6.1` clause 5's form, ALSO BESIDE THE MATRIX (the audit's `F15`).** `docs/specs/secure-exclusion.md` `§2.3` item 3 declares a behaviour this battery does **not** deterministically exercise: **a call ISSUED while the tier is closed whose dispatched renderer work straddles a transition in flight** — the window is a renderer round trip wide (milliseconds) and no shipped instrument in this run can place a transition inside it. The row this battery DOES take (`§5` row 28, `SX-G-43`) measures the **ARRIVAL** decision — one status line, one body, the declared falsifier's COUNT now ASSERTED (`F4`) with the `F-A6` **DECLARED LIMIT** stated in its own evidence (`§4b` `F-A6`: the POST arrives when the tier is ALREADY closed, so this row measures the ARRIVAL decision of `§2.3` item 2 and NOT the straddle of `§2.3` item 3) — and says so in its own evidence string; the **abandonment** half is NOT claimed. **WHY THIS IS A NOTE AND NOT AN EIGHTH U-ROW (the audit's `F15` offered both forms; the choice is STATED, not assumed):** `docs/specs/user-flow-audit.md` `§5` item 1 forbids this record from re-deriving a unit's subject list, and `docs/specs/secure-exclusion.md` `§2.4` item 7(2) **declares** the row set's subjects (`U-1`…`U-7`) and demotes the eighth slot — and the in-flight arm is a **server-side protocol property** (`§2.3` item 3), not a flow an OPERATOR performs and observes: an operator cannot see a straddle, they see one answer. **GAP-2 — FOR THE SPEC OWNER, NOT SELF-RATIFIED:** if the owner rules that `§2.3` item 3's straddle IS a matrix subject, the count becomes `8` (the cap's last slot), `rows[]` gains a row and `summary.total` follows to `8`; this record does not make that call.**

**THE PINNED USER-VISIBLE ASSERTION PER ROW (the `§6.1` report's `assertion` field, restated here so the matrix is readable on its own — **`7` assertions, one per U-ROW**): `U-1` the control and its label occupy a non-zero RENDERED BOX inside the operator pane; `U-2` a real press+release on that box moves the status line's `MCP:` segment `enabled → disabled` and leaves the tool listing SET-IDENTICAL; `U-3` while open, a tool call's RESULT is the declared receipt (both closed tokens + the cause/remedy `message`), with `isError` absent; `U-4` the operator's return — the pane control or the channel — restores NORMAL answers, and no MCP/HTTP route does; `U-5` the app graph's `get_rendered_html`/`list_targets` never contain the control while the PANE realm does; `U-6` the open state survives a reload (the refusal is still the receipt) and the pane agrees, while a RESTART on boot A's OWN post-transition profile returns to `mcp-enabled` with NO persisted flag, NO third profile file and NO `exclusion` key in the store bytes; `U-7` the ONE stdio client stays connected across the transition.** **THE `U-8` NOTE'S OWN TERMS ARE KEPT BESIDE IT AND ARE NOT AN ASSERTION OF THE REPORT (`F2`): the battery exits with the state `mcp-enabled` and with every scratch directory removed.**

---

## 3. THE `§6.1` STRUCTURED COVERAGE REPORT — **emitted from the 2026-10-09 RUN; the as-filed and 2026-10-08 reports' values are kept at `§4`/`§5` and in git history, never substituted silently**

> **⟶ REGENERATED 2026-10-09.** The rows below carry the fields `docs/specs/user-flow-audit.md` `§3` mandates
> (`u` · `layer` · `instrument` · `cmd` · `exit` · `observation` · `verdict`, with `reason` owed only for a
> `NOT-OBSERVABLE` row — **none exists**) **PLUS the role's machine-readable additions** (`assertion` · `d_class` ·
> `real_input` · `proxyPASS` · `surface`), each row's `verdictClass` from the closed set `PASS`/`FAIL`/`PARKED`.
> **THE EQUALITY IS AT THE U-ROW COUNT, WITH ITS TERMS (the audit's `F2`): `rows[]` = `7` entries = the matrix's `7`
> U-ROWS (`U-1`…`U-7`), and `summary.total === 7`; `7 + 0 + 0 = 7`. THE MATRIX HAS `8` ROWS — `7` U-rows + `1` NON-U
> NOTE (the `U-8` precondition) — and the NOTE IS NOT A ROW OF THIS REPORT AND NOT ONE OF ITS PASSES; it and the
> in-flight DECLARED LIMIT are emitted in the additive `nonRowNotes` array BESIDE `summary`, each with its terms.**
> **WHY THE U-ROW READING AND NOT A WIDENING OF `§6.1`:** `docs/specs/user-flow-audit.md` `§6.1` defines BOTH halves at
> the U-row count (`rows[]`: "one entry per matrix **U-row**"; `summary.total`: "**the matrix's U-row count**"), and
> `docs/specs/secure-exclusion.md` `§2.4` item 7(2)'s demotion is the unit's own contract — so a report that read `8`
> would BE the `INVALID` total that file's `§2` names. **NOTHING IS LEFT AS A SILENT GAP:** the one question this pass
> could have raised (should `§6.1`'s definition change?) is answered by the contract as filed, and the two questions it
> CANNOT answer are filed for their owners at `§2`/`§6` (`GAP-1`, `GAP-2`).

```json
{
  "unit": "U-SECURE-EXCLUSION",
  "matrixSource": "docs/specs/secure-exclusion-live-battery.md §2 (the §5.U delta matrix; its subjects are declared by docs/specs/secure-exclusion.md §2.4 item 7(2))",
  "predicateSource": "docs/specs/user-flow-audit.md §7.1",
  "predicateSourcePresent": true,
  "emitter": "MANUAL — `tests/secure-exclusion-live.mjs` prints the driver's own 34 rows (its `check()` lines and one tally line, `§5`); the 7-U-row projection, `rows[]`, `summary`, `nonRowNotes` and `commands[]` are AUTHORED FROM those printed rows by this gate-6 pass (the live-scenario-runner role, `OW-5`) — the driver itself emits NO U-row projection of any kind. **CORRECTED 2026-10-09 (the second `§6.2` audit's `F-A5`): the as-filed value claimed the report 'is emitted BY THE 2026-10-09 RUN FROM THE RUN', which is FALSE of the 1079-line driver — no computation of `rows[]`/`summary.total`/`nonRowNotes`/`commands[]` exists in it. `docs/specs/user-flow-audit.md:80` gives this honest `MANUAL` form; every `observation` below remains a value the driver PRINTED, which is what `§6.1` clause 2 requires.**",
  "rowSetRule": "rows[] carries ONE ENTRY PER MATRIX U-ROW (docs/specs/user-flow-audit.md §6.1's `rows[]` row) — the matrix's 7 U-rows and nothing else; the U-8 precondition and the in-flight declared limit are NON-ROW NOTES beside `summary` (see `nonRowNotes`), because a non-flow row must not be one of the report's PASSes (the §6.2 audit's F2)",
  "rows": [
    { "u": "U-1", "layer": "U",
      "instrument": "tests/secure-exclusion-live.mjs — CDP Runtime.evaluate read of the rendered box + rendered text",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "box 59x36 px at (679,781), display=block, classes=\"btn\", label=\"MCP / secure-tier exclusion (mutually exclusive)\", buttonText=\"Disable MCP\", data-state=\"mcp-enabled\"; THE STATUS LINE'S OWN FULL TEXT, printed by its own row (§5 row 15, the second audit's F-A16 — as filed it was cited here but printed by NO row): \"token: •••• · enabled: [read, dispatch, graph, code] · journal: ∞ · MCP: enabled\". THE PREDICATE ASSERTS `present` FIRST (the first audit's F14: the as-filed form dereferenced box.w on a {present:false} reading and aborted the run with a TypeError instead of recording the FAIL) AND THE AFFORDANCE WORD IS NOW A TERM (buttonText === 'Disable MCP', the second audit's F-A11: it was a printed-only value here while this row's assertion and the contract §2.4 item 2 both claim it)",
      "verdict": "CHANGED",
      "verdictClass": "PASS",
      "assertion": "the control and its label occupy a NON-ZERO RENDERED BOX inside the operator pane, the control carries the enabled-state AFFORDANCE WORD, and the status line carries the `MCP:` segment",
      "d_class": "D1–D8 (the isolated pane graph — docs/specs/secure-panels.md §2/§4; §2.4 item 1)",
      "real_input": { "flag": true, "evidence": "CDP Runtime.evaluate over the app's own renderer: getBoundingClientRect + textContent/className — the RENDERED box, never a computed-style-only reading" },
      "proxyPASS": false,
      "surface": { "target": "boot A's Electron window (the ASSEMBLED app), operator pane", "liveSurfacePresent": true, "evidence": "the pane painted a 59x36 px box at (679,781) with display=block" } },
    { "u": "U-2", "layer": "U",
      "instrument": "tests/secure-exclusion-live.mjs — CDP Input.dispatchMouseEvent (mouseMoved/mousePressed/mouseReleased at the element's own rendered-box centre) + CDP Runtime.evaluate reads + the app's own stdio MCP client",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "click landed on \"BUTTON#exclusion-toggle\" at (708,348) inside a 59x36 box (isTarget=true) AND THE LANDING FLAG IS A PREDICATE TERM (`clickLanded`, the first audit's F9); AFTER the gesture: data-state=\"mcp-disabled\", buttonText=\"Enable MCP\", status segment=\"disabled\"; bridge read exclusion=\"mcp-disabled\"; the live MCP get_markdown answered the DECLARED RECEIPT as a VALUE (isError absent). THE SET-EQUALITY HALF, around a REAL exclusion transition with the enabled-GROUP set held CONSTANT and the transition's OWN PRECONDITION NOW ASSERTED: the bridge read exclusion=\"mcp-enabled\" BEFORE the closed listing and \"mcp-disabled\" BEFORE the open one (terms `closed-state-bridge`/`open-state-bridge`, added by the second audit's F-A1), so the transition is MEASURED to have happened; tools/list while CLOSED returned 13 handles and the SAME client answered 13 handles while OPEN, set-equal=true, names lost=[], 19 handles at boot before the sibling-control row moved the group set; the row's own TERMS read {\"closed-state-bridge\":true,\"open-state-bridge\":true,\"closed-listing\":true,\"open-listing\":true,\"set-equality\":true}. THE DELETION/RED-FAIL CONTROL BESIDE IT (F-A1, §5 row 14): 5 fixtures driven through the SAME `registrationTransitionProperty`, ALL refused — the DELETION fixture (both listings as the live run reads them, the bridge never moving) refused on `open-state-bridge` ALONE, the cleared listing and the same-size toggle on `set-equality`, the `{__cdpError}` read on `closed-state-bridge`, the failed `tools/list` on `open-listing`. CONTROLS in the same run: #token-gen changed the token and #toggle:graph changed the enabled set under the SAME gesture path; #journal-length-apply read maxJournalLength \"undefined\" -> \"undefined\" (a NO-CHANGE reading: its body reads the prop `value` off the BUTTON node, so it asks for the state the pane already holds)",
      "verdict": "CHANGED",
      "verdictClass": "PASS",
      "assertion": "a real press+release on the painted control moves the status line's `MCP:` segment `enabled → disabled`, and the tool listing stays SET-IDENTICAL across a transition whose own precondition (the bridge's reading moving) is ASSERTED — nothing cleared, nothing toggled, and DELETING the transition is not a PASS",
      "d_class": "D-GATE clause (1) (the transition is a server-side invariant, §0 ruling 1) + D1–D8 for the control's home",
      "real_input": { "flag": true, "evidence": "CDP mouseMoved + mousePressed + mouseReleased at the element's own rendered-box centre, with document.elementFromPoint confirming the hit (isTarget=true) — the browser's own input pipeline, nothing injected into the page" },
      "proxyPASS": false,
      "surface": { "target": "boot A's Electron window (the ASSEMBLED app) + its own stdio MCP endpoint", "liveSurfacePresent": true, "evidence": "the gesture moved the RENDERED segment AND the live MCP answer changed in the same run" } },
    { "u": "U-3", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — the MCP SDK client over the app's own stdio transport (ChildProcessTransport) + raw fetch POSTs at the app's own HTTP endpoint",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "stdio while open: provident.get_markdown (enabled group 'read') -> isError=false (ABSENT), {\"status\":\"refused\",\"reason\":\"exclusion-closed\",\"message\":\"MCP endpoint functionality is blocked because the security store is open — retry once the operator has finished with the secured changes.\"}; provident.dispatch (the tool the ENABLED-GROUP predicate alone always registers) -> the SAME receipt, isError ABSENT. HTTP while open: authorized POST -> 503 {\"jsonrpc\":\"2.0\",\"error\":{\"code\":-32003,\"message\":\"exclusion-closed\"},\"id\":null}",
      "verdict": "CHANGED",
      "verdictClass": "PASS",
      "assertion": "while the state is open, a tool call's RESULT is the declared receipt (both closed tokens exactly + the cause/remedy `message`) delivered as a VALUE, with `isError` ABSENT — never an MCP protocol error",
      "d_class": "D-GATE clause (1) (§2.2 item 2(a) — the invocation turn; §2.5 item 1's amended shape)",
      "real_input": { "flag": true, "evidence": "a literal MCP tools/call over the app's own stdio transport, and a literal authorized POST at the app's own HTTP endpoint" },
      "proxyPASS": false,
      "surface": { "target": "the app's own stdio MCP endpoint (boot A) + the app's own HTTP MCP endpoint", "liveSurfacePresent": true, "evidence": "both transports answered the refusal in ONE run (503 on HTTP, the receipt value on stdio)" } },
    { "u": "U-4", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — (i) literal HTTP POSTs at the app's own endpoint and (ii) a REAL CDP pointer gesture on the HTTP boot's own pane control, over the app's own renderer",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "(i) NO MCP RE-ARM: the batched POST carrying the return transition (load+dispatch, pre-loaded while the tier admitted work) answered 503 {\"jsonrpc\":\"2.0\",\"error\":{\"code\":-32003,\"message\":\"exclusion-closed\"},\"id\":null} and the authorized POST after it answered 503. (ii) THE OPERATOR'S ACT: a real CDP pointer gesture on THIS boot's painted control (box 56x36 px, hit=\"BUTTON#exclusion-toggle\", isTarget=true) moved the pane's segment \"disabled\" -> \"enabled\" (data-state \"mcp-disabled\" -> \"mcp-enabled\", button \"Enable MCP\"), the bridge answered exclusion=\"mcp-enabled\", and the authorized POST afterwards answered 200 — ASSERTED `=== 200` itself (the second audit's F-A9: the as-filed term was `!== 503`, which a 401/500 would have satisfied); on boot A's stdio arm the return restored NORMAL answers (ok=true, receipt=null, markdown present) with the bridge reading mcp-enabled. THE 'NEVER DISPATCHED' CLAUSE (the second audit's F-A11): what this report's driver term measures is the open-state call's RESULT BEING the receipt (the invocation-turn refusal, §2.2 item 2(a)); the renderer-side `sends=0` half is asserted at the [H] layer by the register's A-2#5/P-EX-IM-3 cells, not by a driver counter",
      "verdict": "CHANGED",
      "verdictClass": "PASS",
      "assertion": "the operator's return — the pane control or the channel — restores NORMAL answers (`200`) on BOTH transports, and NO MCP/HTTP route can re-arm the state",
      "d_class": "D-SCOPE (the manual-UI channel is NOT an MCP method — §2.4 item 1) + D-GATE clause (1) (§2.4 item 6, the operator's re-enable is the ONLY re-arm)",
      "real_input": { "flag": true, "evidence": "a literal HTTP POST (the refused MCP-carried return) AND a CDP mouseMoved/mousePressed/mouseReleased gesture on the HTTP boot's painted control, with elementFromPoint confirming the hit" },
      "proxyPASS": false,
      "surface": { "target": "the app's own HTTP MCP endpoint + the HTTP boot's own Electron window (pane)", "liveSurfacePresent": true, "evidence": "GET /mcp answered 405, the POSTs answered 503 then 200, and the pane painted a 56x36 px box that the gesture hit" } },
    { "u": "U-5", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — provident.get_rendered_html + provident.list_targets over the app's own stdio MCP transport, beside a CDP in-page read of #panes and #app",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "get_rendered_html: ok=true after 1 attempt, 2354 chars, contains 'exclusion-toggle'=false; list_targets: 23 nodes (declared census 23), exclusion-shaped []; CDP: #panes has the toggle=true and #exclusion-control=true, #app has neither — AND BOTH #app TERMS ARE NOW ASSERTED (the second audit's F-A11): isolation.appMountHasToggle === false AND the #app mount's innerHTML contains neither 'exclusion-toggle' nor 'exclusion-control' (as filed the toggle flag was printed only and the innerHTML was computed but never asserted, while this row's claim was exactly the absence)",
      "verdict": "UNCHANGED (the isolation holds with the new node)",
      "verdictClass": "PASS",
      "assertion": "the app graph's `get_rendered_html`/`list_targets` NEVER contain the control, and the `#app` mount holds neither the id nor the control (both asserted), while the PANE realm does (the positive control that makes the absence non-vacuous)",
      "d_class": "D1–D8 (§2.7 item 2 — the pane graph is a SEPARATE GraphScope)",
      "real_input": { "flag": true, "evidence": "literal MCP calls over the app's own stdio transport + a CDP in-page DOM read of both realms" },
      "proxyPASS": false,
      "surface": { "target": "the app's own stdio MCP endpoint + boot A's window (both realms read in the same run)", "liveSurfacePresent": true, "evidence": "get_rendered_html answered 2354 non-empty chars and the pane read found the control" } },
    { "u": "U-6", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — CDP Page.reload + a RESTART booted on a byte-exact cpSync COPY OF BOOT A'S OWN POST-TRANSITION PROFILE (RE-INSTRUMENTED 2026-10-09 after the first §6.2 audit's blocking F1; the third store reading made a BYTE term after the second audit's F-A7), with the MCP client reading both; **plus the [G] node-side `readdirSync`/`readFileSync` records of the profile listing and the store bytes (`§5` row 20's terms are those readings)** — the second audit's F-A10, which found the [G] instrument missing from this cell while it produced the listing and the bytes",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "after Page.reload: pane re-painted=true, status segment=\"disabled\", data-state=\"mcp-disabled\", button \"Enable MCP\", IPC_SECURITY_GET answered exclusion=\"mcp-disabled\", while the live MCP call is STILL REFUSED and the answer IS the declared receipt (isError ABSENT, the message naming cause and remedy). THE RESTART ARM, on boot A's own post-transition profile (precondition MEASURED: live bridge exclusion=\"mcp-disabled\" AND a live stdio call answering the receipt at the moment of the copy), RE-TAKEN ON THIS PASS'S TWO RUNS (§5 row 20): run 1 — the new process pid 173325 vs boot A's 172991 — answered ok=true isError=false receipt=null with a real markdown; the copied profile's raw listing EQUALS boot A's own post-transition listing (18 entries, the Chromium runtime's own Cache/GPUCache/DIPS/Trust Tokens/Preferences/Network Persistent State among them); NO entry was added to the profile by the transition (the tight window and the wide window are both terms); the store bytes are IDENTICAL IN ALL THREE READINGS — boot A's own file = the copy as made = the copy after the restart boot, both 87 chars, and the term `post-boot-bytes-identical` reads true (as filed this third reading contributed only the ABSENCE of the substring `exclusion`, so a restart that rewrote the store with a different key set still read PASS — the second audit's F-A7); NONE of the three contains an `exclusion` key; the store-space file set is exactly [\"provident-security.json\"]; the store parses to an object carrying token+enabled. RUN 2 reproduced every term, every listing and both byte readings identically (pid 173921 vs 173628, 86 chars each side — the fresh profile's token length). TERMS: {\"answer-ok\":true,\"answer-not-error\":true,\"answer-normal\":true,\"new-process\":true,\"precondition-open\":true,\"no-new-entry\":true,\"baseline-settled\":true,\"transition-window-clean\":true,\"copy-is-of-source\":true,\"no-exclusion-key\":true,\"post-boot-bytes-identical\":true,\"store-file-set\":true,\"store-non-vacuous\":true} — 13 of 13; and 9 deletion/regression fixtures, ALL refused (§5 row 22)",
      "verdict": "CHANGED",
      "verdictClass": "PASS",
      "assertion": "the open state survives a renderer reload (the refusal is still the declared receipt) AND the pane agrees with the server, while a RESTART on boot A's OWN post-transition profile returns to `mcp-enabled` with NO persisted flag, NO third profile file, NO `exclusion` key in the store bytes AND the post-boot store bytes BYTE-IDENTICAL to the copy (13 named terms)",
      "d_class": "D-19 (the boot terminal / non-persistence) + §0A item 6 (the renderer may not re-arm) + §1.3 item 7's two-file pin (N-5)",
      "real_input": { "flag": true, "evidence": "CDP Page.reload on the assembled app, a literal MCP call after it, and a genuinely NEW process booted on a cpSync COPY of boot A's OWN post-transition profile — made after the transition, with the copy's list-and-byte fidelity, the profile file LIST and the store BYTES (all three readings, the third one BYTE-IDENTICAL) all INSIDE the predicate, plus a mandatory DELETION-REGRESSION CONTROL (9 fixtures, all refused — the first being the deletion case itself)" },
      "proxyPASS": false,
      "surface": { "target": "boot A's window + its stdio MCP endpoint, then a fresh process on a copy of that profile", "liveSurfacePresent": true, "evidence": "the pane re-painted after the reload and the new process answered normally while the profile carried no exclusion key and no third file" } },
    { "u": "U-7", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — repeated tools/list and tool calls on ONE connected stdio client across the transition, plus the HTTP listener before/after",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "one already-connected client: tools/list (13 handles, closed) -> the transition -> tools/list (13 handles, open, set-equal) with no reconnect and no re-handshake — and the transition's OWN precondition is now a term of that same row (the bridge read exclusion=\"mcp-enabled\" before the closed listing and \"mcp-disabled\" before the open one, the second audit's F-A1); the HTTP listener answered 405 (GET), 401 (unauthorized POST), 200 (authorized POST, enabled), 503 (authorized POST, open) and 200 again after the operator's return, on the same port (the 200s asserted as `=== 200`, the second audit's F-A9)",
      "verdict": "UNCHANGED (the transport stays connected; nothing is closed or rebuilt)",
      "verdictClass": "PASS",
      "assertion": "the ONE stdio client stays CONNECTED across the exclusion transition — no disconnect, no reconnect, no rebuild of the transport — across a transition whose own precondition is ASSERTED",
      "d_class": "D-GATE clause (1)(c) (§2.3 item 1 — the stdio transport is NOT closed and NOT rebuilt)",
      "real_input": { "flag": true, "evidence": "repeated `tools/list` on the SAME ChildProcessTransport client across a real transition, plus literal HTTP requests on the same listener" },
      "proxyPASS": false,
      "surface": { "target": "the app's own stdio MCP endpoint + the app's own HTTP endpoint", "liveSurfacePresent": true, "evidence": "both sides answered on the same connections across the transition" } }
  ],
  "nonRowNotes": [
    { "id": "U-8 (PRECONDITION / BATTERY NOTE — NOT A U-ROW, NOT A rows[] ENTRY, NOT ONE OF THE PASSES)",
      "terms": "8 matrix ROWS = 7 U-ROWS + 1 NON-U NOTE; docs/specs/secure-exclusion.md §2.4 item 7(2)/(2-note) demotes it",
      "observation": "the run restores `mcp-enabled` before completion (both runs' HTTP boots were returned to `mcp-enabled` by the OPERATOR's own act on its pane, §5 row 29) and removes every scratch directory (four: boot A's profile, the HTTP boot's profile, the restart copy, the deletion-control fixture) — a re-run starts clean",
      "reason": "it is TEST HYGIENE, not a flow the unit changes: the unit authors no behaviour whose teardown is operator-visible, and §7.1's predicate is about flows the unit changes" },
    { "id": "THE IN-FLIGHT / STRADDLE ARM (§6.1 clause 5's DECLARED-LIMIT form — NOT a U-row, NOT a rows[] entry)",
      "terms": "asserted by NO shipped instrument in any run so far; the ARRIVAL half is measured at §5 row 28 (SX-G-43)",
      "observation": "a call ISSUED while the tier is closed whose dispatched renderer work straddles a transition in flight is NOT deterministically exercisable: the window is a renderer round trip wide (milliseconds) and the driver cannot place a transition inside it. The row the battery DOES take measures the ARRIVAL decision — one status line (asserted ≤ 1 inside the one response body, the first audit's F4), one body — and says so in its own evidence string. **THE SECOND AUDIT'S `F-A6` IS DISPOSITIONED HERE AS A DECLARED LIMIT, NOT A FIX:** (i) the as-filed driver comment claimed the POST arrives 'while the tier is ADMITTED ... still in flight', and this record's own row cell said 'while the tier was in transition' — BOTH FALSE of the code, because the tier is ALREADY `mcp-disabled` when the POST is issued (measured at §5 row 25, the 503 on this process); (ii) `countStatusLines` reads an `HTTP/1.x NNN` occurrence inside the BODY of ONE fetch Response, while a second status line is a framing event fetch cannot represent (and `res.text()` would reject and ABORT the run); (iii) the counter's control drives a SYNTHETIC STRING, not the transport. What the row therefore evidences is ONE-ANSWER-PER-STREAM and the ARRIVAL decision; the straddle is NOT exercised by it",
      "reason": "STRUCTURAL, and it is the CONTRACT's to name rather than this battery's to invent: docs/specs/secure-exclusion.md §2.3 item 3 declares the behaviour as a SERVER-SIDE protocol property (not an operator-visible flow), §2.4 item 7(2) declares the matrix's subjects as U-1…U-7, and docs/specs/user-flow-audit.md §5 item 1 forbids this record from re-deriving that subject list. **GAP-2 — FOR THE SPEC OWNER, STILL OPEN AND NOT SELF-RATIFIED:** if the owner rules the straddle a matrix subject the count becomes 8 (the cap's last slot) and summary.total follows; if the owner rules it is NOT, the row the battery takes stands as a DECLARED LIMIT with the three F-A6 corrections above. EITHER WAY, the ruling is what a genuine straddle implementation waits on, and this record does not make that call" }
  ],
  "summary": { "total": 7, "changed": 5, "unchanged": 2, "notObservable": 0, "manual": 0, "verdictClass": { "pass": 7, "fail": 0, "parked": 0 } },
  "summary_note": "**THE SPLIT IS DERIVED FROM `rows[]`, NOT CARRIED (`RCA-8(d)`; the second §6.2 audit's F-A3): `rows[]` reads CHANGED on U-1, U-2, U-3, U-4 and U-6 and UNCHANGED on U-5 and U-7, so `changed: 5` / `unchanged: 2`; `5 + 2 + 0 = 7`. THE AS-FILED `changed: 4, unchanged: 3` CONTRADICTED ITS OWN `rows[]` — it was STALE from the PRE-`F2` report (whose row set differed) — and it survives here as a correction with its reason rather than as a silent rewrite. `summary.total` was never wrong (4 + 3 = 7 too), which is exactly why the drift was possible: a total that is right by accident does not certify its terms. `manual: 0` is stated as its OWN member because the `0 MANUAL` claim is what GAP-1 turns on, and the closed per-row class set (`PASS`/`FAIL`/`PARKED`, on EVERY row as `verdictClass`) cannot represent `MANUAL` — so the manual count is printed beside the class map instead of being silently outside it (F-A12). `5 + 2 + 0 = 7` AND `summary.total === 7` IS THE MATRIX'S **U-ROW** COUNT (docs/specs/secure-exclusion-live-battery.md §2 carries 7 U-rows: U-1…U-7; the U-8 precondition and the in-flight declared limit are NON-ROW NOTES and are NOT counted and NOT among the 7 PASSes — the first §6.2 audit's F2 corrected the as-filed report, which read 8 by counting the demoted U-8 note as a PASS). THE EQUALITY IS ASSERTED TWICE and with its terms: the report's row set is {U-1, U-2, U-3, U-4, U-5, U-6, U-7} and the matrix's U-row set is {U-1, U-2, U-3, U-4, U-5, U-6, U-7} — the SAME SET, 7 = 7; and 7 pass + 0 fail + 0 parked = 7. `proxyPASS: false` on EVERY row: no row's PASS is a proxy for an app-level fact — each is the app-level fact itself. `verdict` keeps the landed CHANGED/UNCHANGED vocabulary (docs/specs/gutter-ui.md §5.U's form) BESIDE per-row `verdictClass` (the role's closed PASS/FAIL/PARKED set — a `REPORT` verdict is OUTSIDE it and the boot-order row was corrected to FAIL, the first audit's F6), and the `d_class` values are the UNIT'S OWN `D-`names, mapped so a reader can check the mapping rather than guess it.",
  "commands": [
    { "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observed": "34 recorded rows = 34 PASS / 0 FAIL / 0 MANUAL / 0 PARKED (the driver's own summary line, whose terms are the rows); reproduced on a SECOND execution of the same command (34/0 again, exit 0 both) AND on a THIRD, POST-COMMIT execution at 6c602a5 (34/0, exit 0; restart pid 180055 vs boot A's 179699, store 86 chars both sides). THE THREE RUNS' OWN FIGURES: run 1 restart pid 173325 vs boot A 172991 @87 chars; run 2 pid 173921 vs 173628 @86 chars; run 3 (post-commit) pid 180055 vs 179699 @86 chars. Exit 0 is EVIDENCE: the driver exits 1 iff any row is FAIL (the first §6.2 audit's F5 — as filed it always exited 0, so the as-filed 6-FAIL run carried the same code). THE `32`-ROW READING OF THE FIRST 2026-10-09 PASS IS KEPT BESIDE THIS ONE, not substituted" },
    { "cmd": "npm run build", "exit": 0, "observed": "clean (main cjs + preload cjs + renderer esm + standalone/battery-host bundles) — run immediately before both battery executions" },
    { "cmd": "git rev-parse --short HEAD", "exit": 0, "observed": "992ea27 at BOTH RECORDED RUNS and 6c602a5 at the POST-COMMIT re-run — this pass's own gate commit, which is the file revision the four legs below were measured at; the driver, this record, the one F-A17 spec annotation, docs/defects.md and docs/next-steps.md were the only files it carried" },
    { "cmd": "sha256sum tests/secure-exclusion-live.mjs", "exit": 0,
      "observed": "e7eb7889f2fd42950d63155c87aca5564ab8022a4ce0d4c66e8d5b6ff30841e1 — the driver AS COMMITTED at 6c602a5, i.e. the file the two recorded runs executed and the file re-run a THIRD time POST-COMMIT (34/0 again, exit 0, HEAD 6c602a5). A stale pre-edit reading (e601440162fcbb5b8739013d948abb4975e1c2bddee6163f94ff56642302a5b7) is kept visible at §0 beside this cell with its correction (the second audit's F-A18 asked for the driver's own sha256 as it stands after the repairs)" },
    { "cmd": "sha256sum src/renderer/store-core-graph.ts src/renderer/store-graph-references.ts", "exit": 0,
      "observed": "0664c52f06bd6da5e95de957a6170e5be07b5a8c5a459489f98c2b01921e8450 and 5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657 — both reproduce the unit's declared §6 pins (read by the battery's own SX-G-54 row in both runs)" },
    { "cmd": "git log --name-only --pretty=format: 7142591^..HEAD", "exit": 0,
      "observed": "the landing chain's paths (18 in both runs) touch no frozen artifact, no store byte and no src/shared/** (read by the battery's own SX-G-55 row in both runs)" },
    { "cmd": "ps -eo pid=,args=", "exit": 0,
      "observed": "the stale-window preflight, INSIDE the driver (the first audit's F10): no process matching dist/main/main.cjs before the first boot — §5 row 1, id SX-G-45p since this pass (the second audit's F-A15). A probe that FAILS now stops the run (exit 1, no summary)" },
    { "cmd": "npm test", "exit": 0, "observed": "86 files / 2729 passed | 2 skipped (2731) / 0 failed — measured POST-COMMIT at this pass's own HEAD (6c602a5), MEASURED THIS PASS (`Test Files 86 passed (86)` / `Tests 2729 passed | 2 skipped (2731)`); the PRE-COMMIT reading of this pass, taken while this driver was edited-but-uncommitted, is stated beside it at §8 item 26" },
    { "cmd": "npm run typecheck", "exit": 0, "observed": "clean, POST-COMMIT at this pass's own HEAD" },
    { "cmd": "npm run typecheck:tests", "exit": 0, "observed": "clean, POST-COMMIT at this pass's own HEAD (the additive fourth leg; it is the leg that would read a new `tests/**` TypeScript file, and this pass added none)" }
  ]
}
```

**THE SIX FALSIFIABLE CLAUSES, DISCHARGED ONE BY ONE (`docs/specs/user-flow-audit.md` `§6.1`'s clauses 1–5 and `docs/specs/secure-exclusion.md` `§2.4` item 7(3)):**

| # | The clause | Discharged how |
| --- | --- | --- |
| 1 | **`summary.total` === the matrix's U-row count, and the per-verdict counts sum to it** | **`7 = 7`: `rows[]` carries `7` entries and `summary.total` reads `7`, and both ARE the matrix's `7` U-ROWS (`U-1`…`U-7`)** — asserted as a SET equality (`{U-1…U-7}` = `{U-1…U-7}`), with `7 + 0 + 0 = 7` ✓ on the role's closed verdict set (`PASS`/`FAIL`/`PARKED`) and the landed vocabulary reading `4 + 3 + 0 = 7` ✓ as well. **The `U-8` precondition is NOT one of the `7`** (it is a non-row note beside `summary`, `F2`), and the matrix's `8` ROWS = `7` U-rows + `1` non-U note, both printed with their terms. **The total is NOT short and the report is NOT empty** (`docs/specs/user-flow-audit.md` `§2`'s INVALID rule). |
| 2 | **every `post` is MEASURED, never projected** | every `observation` above is a value a command in `commands[]` printed in this run; the driver prints each observation verbatim beside its verdict. **THE ONE PLACE THIS PASS COULD HAVE PROJECTED AND DID NOT** is the `U-6` restart arm: its `Post` cell carries the two profile LISTINGS, the three store-BYTES readings, the two pids and the `12`-term predicate result — all printed by the run, none inferred from the fix's diff (`§4a` `F1`) |
| 3 | **every `instrument` is from the CLOSED set** | **four instruments are named and each is a shipped tool / literal command line**: the repo's own driver (`node tests/secure-exclusion-live.mjs`), the app's **own MCP stdio surface** over the repo's shipped `ChildProcessTransport` helper, **literal `fetch` POSTs/GETs** at the app's own HTTP endpoint, and the app's **own CDP listener** (`--remote-debugging-port=0`, read from the child's own stderr) for the rendered-box reads and the real pointer gestures — the same apparatus the as-filed run declared, now on BOTH boots **and on the restart-arm profile copy**. **No row names "the live gate" or "the leg".** **THE `MANUAL` SUBSTITUTION'S AUTHORITY IS A GAP, NOT THIS PASS'S ANNOTATION (`GAP-1`, `§6`):** the owner citation that admits `[CDP]` at all is `docs/decisions.md`'s `REAL-DOM-UI-GATE-LEG` row (architect ruling `A-d8`, leg-only channels), and it rules about the `ui` LEG, not about this battery — so `§2.4` item 7(2-note)'s `MANUAL` prediction is superseded HERE by measurement with its own reading printed, and the ruling that formalises it is owed by the spec owner |
| 4 | **every `cmd` is a literal command line, with its own exit code** | `commands[]` carries **ten** literal command lines, each with the `exit` code the run produced (**`0` on all ten**) — **CORRECTED 2026-10-09 (the second `§6.2` audit's `F-A13`): the as-filed cell read "nine literal command lines … (`0` for all eight)", which contradicted its own array on BOTH numbers; the array held `9` entries, all `exit: 0`.** The count moved `9 → 10` when this pass added the driver's own `sha256sum` cell (the audit's `F-A18`). — **and the battery's OWN exit code is information, not decoration**: `node tests/secure-exclusion-live.mjs` exits `1` iff any row is `FAIL` (the first audit's `F5`; as filed it exited `0` unconditionally), which is why this pass ran it twice and reports `exit 0` twice |
| 5 | **a `MANUAL` row's observation is an operator observation; a `NOT-OBSERVABLE` row carries its STRUCTURAL reason** | **there are ZERO `MANUAL` rows and ZERO `NOT-OBSERVABLE` rows among the `7` U-rows** — every U-row was taken by a shipped instrument, so neither form is claimed and neither could be used to soften a contradiction. **THE FORM IS USED WHERE IT IS OWED, THOUGH: the in-flight/straddle arm carries its STRUCTURAL reason as a non-row note** (`nonRowNotes`, with `§2.3` item 3 / `§2.4` item 7(2) / `§5` item 1 cited and **GAP-2** filed for the owner — the audit's `F15`), and `§6` records the same with the instruments that would have been owed had the arm been parkable |
| 6 | **the predicate's decision is recorded** | `§1` above: **`TRIGGERS`**, both limbs, with the measured evidence for each |

---

## 4. FINDINGS — **the AS-FILED six measured contradictions of the gate-5 set (kept verbatim as the record of the `da6fc42` run), EACH WITH ITS DISPOSITION MEASURED AT THE RE-RUN**

**These were live failures, not doc drift:** the greens row predicted a value, the live app answered a
different one, and the difference is traceable to a named arm of the landed code.

> **⟶ ROW-NUMBER MAP, ADDED 2026-10-09 SO NO CITATION IN THIS SECTION POINTS AT A MOVED ROW (`RCA-6`), AND EXTENDED
> BY THE SECOND REPAIR PASS.** The dated disposition blocks below cite `§5` rows by the number they carried in the
> **2026-10-08 30-row set**. **THE CURRENT SET IS `§5`'s `34` ROWS** (the first 2026-10-09 pass added the preflight at
> row 1 and the restart arm's deletion control; **this pass added `SX-G-03` and the registry row's DELETION/RED-FAIL
> CONTROL**, which sit at rows 15 and 14 respectively). **THE MAP, TWO HOPS — old `1`…`16` → +1 (`2`…`17`); old `17`…`30`
> → +2 (`19`…`32`); THEN this pass's TWO insertions shift the tail again: rows `1`…`13` are unchanged, row `14` is NEW
> (the registry deletion control), the former `14`…`31` are now `15`…`32`, and the former `32` is now `33`… `34` (the
> new status-line row `SX-G-03` sits at `15`, inside that shifted block).** So the as-filed citations read:
> `§4` `F-2`'s *"rows 7, 8 and 15"* = the 30-row set's **8, 9 and 16** = today's **9, 10 and 17**; `F-3`'s *"rows 10 and
> 11"* = **11 and 12** = today's **12 and 13**; `F-4`'s *"rows 9 and 15"* = **10 and 16** = today's **11 and 17**;
> `F-5`'s *"row 25"* = **27** = today's **28**; `§7` item 2's *"row 14"* = **15** = today's **16**. **Every citation THIS
> PASS added uses the CURRENT (`34`-row) numbering.** **CORRECTED 2026-10-09 (the second `§6.2` audit's `F-A13`): the
> as-filed map's LAST entry — `§8` item 6's *"§5 row 14"* = today's `15` — cited a site that contains no such text
> (`§8` item 6 speaks of `npm test` figures and the `tests/gutter.test.ts` interaction, not of a `§5` row), so the
> entry is WITHDRAWN rather than re-pointed: there is nothing there to map.**
>
> **⟶ 2026-10-08 — HOW TO READ THIS SECTION (`RCA-8(d)` ANNOTATE-BESIDE).** The tables below are the AS-FILED
> run's, byte-intact: they are the record of what `da6fc42` answered, and this pass neither rewrites them nor
> softens them. **Each finding carries a dated DISPOSITION block appended beneath it, and every disposition is
> a MEASUREMENT from the re-run at `afd3212` — never an inference from the fix's diff.** **THE LINEAGE, WITH ITS
> TERMS:** six failures `F-1`…`F-6` (the tracker's numbering; this file's `§4` groups `F-1`/`F-2` in one
> subsection) → the implementer's two landed fixes (`afd3212`: the receipt's additive `message`, and the
> DELETION of the `exclusionOpen` term from the re-gate path) → **`27 PASS / 2 FAIL`** → this pass's assessment
> of the last two + two re-grains + one control row → **`30 PASS / 0 FAIL`**. **FIVE of the six are FIXED AND
> MEASURED; the sixth (`F-5`, the HTTP return path) WAS NEVER A DEFECT OF THE APP — it was a defect of THIS
> FILE'S OWN ROW INSTRUMENT, and it is re-grounded at `§7`.**

### F-1 / F-2 — **THE OPERATOR CONTROL IS INERT ON A REAL CLICK** (`F-2`), and it takes the operator-visible half of `U-2`, `U-4` and `U-6` with it

| | |
| --- | --- |
| **The contradicting rows** | the gate-5 `OPEN` rows **`SX-G-59`** (`§2.4` item 1: the control's home and authoring medium), **`SX-G-60`** (`§2.4` item 2 / `§0A` item 4 / `§3.1` `M-EX-8`: the toggle node and its handler), **`SX-G-61`** (`§2.4` item 3 / `§0A` item 5 / `PAR-11`: the status line's trailing segment and the toggle's content) and **`SX-G-63`** (the `§5.U` `U-1`…`U-7` subjects) — all four are `OPEN`/`NOT-OBSERVABLE-BY-THIS-LAYER` in the greens, i.e. **their live half was explicitly left to this gate** |
| **The spec clauses** | `docs/specs/secure-exclusion.md` `§2.4` items 1/2/3; `§0A` items 4/5; `§3.1` `M-EX-8`; `PAR-10`/`PAR-11`; and the `U-2` subject itself (`§2.4` item 7(2): *"clicking it moves the status line's `MCP:` segment `enabled → disabled`"*) |
| **Expected (as the documentation states it)** | a `button`-typed node with `props.id='exclusion-toggle'`, `data-state` refreshed by `syncConfig`, `css.classes=['btn']`, whose **handler is ONE function-STRING body** that reads the state from the node's own props and calls `window.provident.security.setExclusion(<the flip>)` — so **a real press flips the state, the status line's trailing segment moves `MCP: enabled → disabled`, and the MCP server refuses while open** |
| **Observed** | the control **IS authored and IS painted** (box `59 × 36` px, label text `MCP / secure-tier exclusion (mutually exclusive)`, `class="btn"`, `data-wire="node-44"`, `data-node-id="node-44"`, a bound `click` listener of 1 on the element) — and **a real CDP press+release at its own rendered-box centre (708, 348) resolves `document.elementFromPoint` to the button and reaches the renderer** (a capture-phase `click` listener on the same element fires, and the event bubbles from `#exclusion-toggle`) — **yet the authored body NEVER RUNS**: no `setExclusion` call is made, the bridge still answers `exclusion: "mcp-enabled"`, `data-state` never moves off `mcp-enabled`, the button text never moves off `Disable MCP`, and the status line's trailing segment stays `MCP: enabled` |
| **The control that makes it a finding rather than a driver defect** | in the SAME pane and the SAME gesture path, `#token-gen` **did** run its authored body (the token changed `live-battery-token-4f9c1a7e → zuv13jyf7j`) and `#toggle:graph` **did** run its body (the enabled set changed `read,dispatch,graph,code → read,dispatch,code`). The discriminating pattern the run measures: **the two handlers that ran call the bridge FIRST; the two that did not (`#exclusion-toggle` — this unit's, and `#journal-length-apply` — a LANDED control of a prior unit) both read `ctx.node.props` BEFORE their bridge call.** So the failing step is the **authored prop read** (`ctx.node.props['data-state']`, `exclusion-toggle`; `ctx.node.props['value']`, journal) and **the exclusion control's dead click is not this unit's defect alone** — it is the shape the landed sibling shares |
| **Why this is NOT recorded as `MANUAL`** | `docs/specs/user-flow-audit.md` `§6.1` admits `MANUAL` where **no shipped instrument can take the reading**. Here the instrument **demonstrably can** (`#token-gen` proves it), so the honest verdict is `FAIL`, not `MANUAL` — a `MANUAL` row here would be the convenience move `§6.1` clause 5 forbids |
| **Consequence for the `§5.U` matrix** | `U-2`'s post observation is `CHANGED-PARTIALLY-AND-CONTRADICTED` (the gate moves; the CONTROL does not), `U-4`'s bridge arm holds while its gesture arm cannot be reached from the control, and `U-6`'s reload arm shows the operator an `MCP: enabled` pane over a refusing server |

> **⟶ DISPOSITION 2026-10-08 — `F-2` (and the `F-1`/`F-6` operator-view clauses that hung off it): `FIXED AND
> MEASURED GREEN`.** **THE MEASUREMENT (re-run at `afd3212`, `§5` rows 7, 8 and 15):** a REAL CDP
> press+release on the painted control (`hit="BUTTON#exclusion-toggle"`, `isTarget=true`) now **moves the status
> line's trailing segment to `MCP: disabled`**, moves `data-state` to `mcp-disabled`, moves the button's own
> text to `Enable MCP`, and the live MCP server begins answering the DECLARED RECEIPT in the same run — i.e.
> **the control and the gate AGREE, which is exactly the disagreement this finding was.** **THE CONTROL THAT
> MADE IT A FINDING STILL RUNS, and its reading is corrected rather than re-used:** `#token-gen` still changes
> the token and `#toggle:graph` still changes the enabled set under the same gesture path, so the driver's own
> ability to click is still proved; **the as-filed claim that `#journal-length-apply` "did NOT run its body" was
> this file's own over-read** — that control's `maxJournalLength` reading is `undefined → undefined` because its
> authored body reads the prop `value` off ITS OWN node (the BUTTON, which carries none, `L`
> `src/renderer/secure-panels.ts:132-140`) and therefore asks for the state the pane already holds — **a
> NO-CHANGE reading that can never be a control, and the driver's own evidence string now says so** (`§7` item 2).
> **NO ROW WAS MOVED TO `MANUAL` FOR IT AND NONE IS MOVED NOW**: the instrument could always take the reading,
> and it takes it green.

### F-3 — **THE DECLARED REFUSAL RECEIPT IS NOT THE LIVE ANSWER ON STDIO: EVERY TOOL CALL IS ANSWERED `-32602 … disabled`** (and `tools/list` is empty while open)

| | |
| --- | --- |
| **The contradicting rows** | **`SX-G-19`** (`§2.2` item 2(a) / `§3.1` `M-EX-5`: the stdio turn answers the **VALUE** `{status:'refused', reason:'exclusion-closed'}` as the tool's RESULT — *never an MCP protocol error*), **`SX-G-23`** (`§0A` item 7(c) / `§2.2` item 2(c): `tools/list` while open is NOT cleared, the handles stay RESOLVABLE, observed as a non-empty set — the blind probe read `count=8`), and **`SX-G-34`**'s no-throw/no-protocol-error class |
| **The spec clauses** | `docs/specs/secure-exclusion.md` `§2.2` item 2(a)/(c); `§2.5` item 1 (the closed refusal form); `§0A` item 7(c); `§3.1` `M-EX-5`; `§3.2` `FS-EX-3`; `§3.3` `I-EX-3` |
| **Expected** | the invocation turn (`exclusionTurn`) answers the two-member receipt as the tool result, and the registered handles stay **resolvable** while open (toggled, never deregistered) |
| **Observed** | `provident.get_markdown` → `MCP error -32602: Tool provident.get_markdown disabled`; **`provident.dispatch` → `MCP error -32602: Tool provident.dispatch disabled` too** — and `provident.dispatch` is the one tool that stays registered on the group predicate alone when it is allowed, so its answer is the arm that reaches `exclusionTurn`; `tools/list` → **`0` handles** (was `19` while enabled) |
| **The arm that actually answers, read by name** | `regateLiveServer` toggles **every** captured handle `enabled: false` while the tier is open, **including `provident.dispatch`** — so the MCP framework refuses the call **before the handler runs**, and the `exclusionTurn` handler (which is registered and wired correctly, and which the unit's own `A-1#1`/`A-1#2` cells drive green) is **never reached on a live call**. The `-32003 'exclusion-closed'` receipt is the **HTTP arrival** answer, not the stdio invocation-turn answer |
| **The honest reading** | the SAFETY outcome holds (nothing is dispatched to the renderer while open; `sends=0` is not contradicted), but the **declared OBSERVABILITY does not**: a live MCP client cannot list or invoke anything while open, and the receipt value the contract pins is not what a client sees. This is the `docs/specs/user-flow-audit.md` `§4` item 6 *"never upgrade a layer"* case in reverse — the `[T]`/`[B]` greens are **not** app-layer evidence, and here the app layer answers differently |

> **⟶ DISPOSITION 2026-10-08 — `F-3`: `FIXED AND MEASURED GREEN` (the registry-toggling carrier is GONE by the
> architect's ruling).** **THE MEASUREMENT (re-run at `afd3212`, `§5` rows 10 and 11):** while the state is open,
> `provident.get_markdown` (an ENABLED-group tool) **and** `provident.dispatch` (the tool the enabled-group
> predicate alone always registers) **each answered the DECLARED RECEIPT as the tool's RESULT, with `isError`
> ABSENT** — `{"status":"refused","reason":"exclusion-closed","message":"MCP endpoint functionality is blocked
> because the security store is open — retry once the operator has finished with the secured changes."}` —
> never an MCP protocol error. **And the listing is no longer emptied:** across a REAL exclusion transition
> with the enabled-GROUP set held constant, `tools/list` answered the SAME `13` handles while open that it
> answered while closed (set-equal `true`, `names lost []`), on the one already-connected client. **THE AS-FILED
> `0`-HANDLE READING IS EXPLAINED AND CLOSED**: it was `regateLiveServer`'s toggling, which the ruling deleted
> from the exclusion path (`§2.1` item 3's supersession clause; `§2.2` item 2(b)). **The `A-1` fix is what makes
> the receipt REACHABLE** — with the toggling gone, nothing stands between an MCP call and the renderer except
> the invocation turn, and the row above measures it answering. **NO ROW WAS WEAKENED**: the as-filed predicate
> (text CONTAINS the token) is REPLACED BY A STRONGER ONE (the receipt's full shape + `isError` ABSENT), which
> can fail on a bare token string, on an absent/cause-less `message`, or on the renderer's own value.

### F-4 — **THE `IPC_SECURITY_*` RESPONSE MEMBERS REPORT A STALE GATE — the operator's view never follows a transition**

| | |
| --- | --- |
| **The contradicting rows** | **`SX-G-57`** (the manual-UI channel's responses: *the member is NEVER absent on a GET or a SET response*, `T-5`, `PAR-9`) and the operator-visible half of **`SX-G-61`** / **`U-6`** |
| **The spec clauses** | `docs/specs/secure-exclusion.md` `§3.1` `M-EX-7`; `§2.4` item 4 (`{ ...settings, exclusion: state }`); `PAR-9`; `§2.2` item 3's coupling clause |
| **Expected** | the `IPC_SECURITY_GET` response record carries the **state** (`'mcp-enabled' | 'mcp-disabled'`) — i.e. the state the app is actually in |
| **Observed** | after a **REAL accepted transition** (`window.provident.security.setExclusion('mcp-disabled')` answered `applied: true` and the live server immediately began refusing every call), `IPC_SECURITY_GET` answered **`exclusion: "mcp-enabled"`** — the BOOT state. The pane reads that member at its own boot (`renderer.ts` awaits `bridge.security.get()` BEFORE the panes are constructed) and on every `refresh()`, so the operator's status line and toggle read the boot state forever after a transition: after the `Page.reload` row the pane showed `MCP: enabled` / `data-state="mcp-enabled"` / `Disable MCP` **while the server refused every call** |
| **The mechanism, from the landed code** | `main.ts` constructs ONE `SecurityGate` (`gate = new SecurityGate({ token: persisted.token, enabled: … })`) and closes the `IPC_SECURITY_GET`/`IPC_SECURITY_SET` handlers over it, while `mcp.applyExclusion()` REPLACES the server's private `_gate` with `this._gate.withExclusion(state)` — and `SecurityGate.withExclusion` **returns a NEW gate** (`src/main/security.ts`: *"a NEW gate is returned and the RECEIVER is unchanged"*). The handlers therefore keep reading the **boot-time gate instance**, which no transition ever moves: `IPC_SECURITY_GET`/`IPC_SECURITY_SET` answer the constructed state, not the live one. **This also explains why F-2's dead click could not have been detected by the `[T]` layer alone**: the unit's own cells drive the transition site (`applyExclusion` + `gate.exclusionState()`), never the IPC response record |

> **⟶ DISPOSITION 2026-10-08 — `F-4` (and the `F-5`/`F-6` operator-view clauses of the tracker's numbering):
> `FIXED AND MEASURED GREEN`.** **THE MEASUREMENT (re-run at `afd3212`, `§5` rows 9 and 15):** after a REAL
> accepted transition `IPC_SECURITY_GET` answered `exclusion="mcp-disabled"` — the LIVE state, not the boot
> state — and after a `Page.reload` the pane re-painted reading `MCP: disabled` with `data-state="mcp-disabled"`
> and the button reading `Enable MCP`, i.e. **the operator's view now follows the transition and agrees with the
> server that is refusing**. **THE SAME READING IS TAKEN ON THE HTTP BOOT'S OWN PANE** (`§5` row 25): the segment
> reads `disabled` before the operator's return gesture and `enabled` after it. **WHAT THIS PASS DID NOT DO:
> re-derive the mechanism's fix.** The host fix is the implementer's (`afd3212`) and its own red row is
> `G6-F1`; this record reads only what the assembled app answers.

### F-5 — **THE RETURN FROM `mcp-disabled` HAS NO MCP-REACHABLE PATH ON THE HTTP TRANSPORT**

| | |
| --- | --- |
| **The contradicting row** | **`SX-G-43`**'s straddle class and the `U-4` subject (`§2.4` item 7(2): *"clicking it back … restores tool answers"*), read on the HTTP transport |
| **The spec clauses** | `docs/specs/secure-exclusion.md` `§2.3` items 2/3; `§2.2` item 2(a); `§2.4` item 6 (*the operator's re-enable is the ONLY re-arm*) |
| **Observed** | the transition envelope for the return was **pre-loaded while the tier still admitted MCP work** (a batched `load`+`dispatch` in ONE POST, on the run's own initialized session — the form that works in the enabled direction and moved the HTTP gate both ways in this run), and then the POST that carries the **dispatch** is itself an invocation: the gate is read **at POST arrival**, the tier is open, so the request is answered **`503 {"code":-32003,"message":"exclusion-closed"}`** and the handler that would re-enable never runs. The POST after it is still `503` |
| **The honest reading** | **this is the invocation turn working as declared** (`§2.2` item 2(a) refuses EVERY tool invocation while open), and it makes the return reachable **only through the renderer bridge** — the pane control (F-2: inert on a real click) or a renderer-realm `setExclusion` call. **No row in the greens predicted this asymmetry** (`SX-G-43`/`SX-G-44` speak only of the refusal's delivery), so it is recorded as a live finding about the unit's recovery path rather than as a projected verdict. It is also the datum `§7a` `OW-6` asked gate 6 to supply |

> **⟶ DISPOSITION 2026-10-08 — `F-5`: `NOT A DEFECT OF THE APP. IT WAS A DEFECT OF THIS FILE'S OWN ROW
> INSTRUMENT, AND THE ROW IS RE-GROUNDED ON THE MANUAL-UI PATH.`** **THE ASSESSMENT, WITH ITS CLAUSES — THE
> CONTRACT PROVIDES NO MCP/HTTP RETURN ARM ANYWHERE, AND THAT IS SAID WITH THE `§`, NOT ASSUMED:** `§2.4` item 6
> pins the return as the **operator's own** `setExclusion('mcp-enabled')` — *"the pane control (`§2.4` item 2) or
> the channel directly"* — and its 2026-10-08 annotation adds *"the re-enable remains the OPERATOR's own
> `setExclusion('mcp-enabled')` and nothing else … a message is a VALUE, not a transition"*; `§2.2` item 2(a)
> refuses **every** tool invocation while open, so no dispatch can perform it on either transport; `§2.3` item 2
> answers a POST arriving while open with the `503` and builds no server for it; `§2.3` item 3's straddle clause
> settles only **already-accepted** work and is not a re-arm; and `§2.4` item 1 declares the manual-UI channel
> **NOT an MCP method**. **So the as-filed row was testing a route the contract does not provide, and its red
> was uninformative — NOT because a red is inconvenient, but because the row's subject was mis-instrumented.**
> **THE RE-GROUNDED ROW (`§5` row 25) ASSERTS BOTH HALVES AND IS GREEN ON BOTH, MEASURED:** (i) the MCP-carried
> return POST answered `503` with the declared body and the authorized POST after it **also** `503` — the
> exclusion grants an MCP caller **no re-arm authority** (a regression that handed it some would redden this
> half); and (ii) a REAL CDP pointer gesture on **that boot's own painted control** moved its segment
> `disabled → enabled` (`data-state` `mcp-disabled → mcp-enabled`, bridge `exclusion="mcp-enabled"`) and the
> authorized POST afterwards answered **`200`** (a return that failed to restore would redden this half). **THE
> IN-FLIGHT ARM IS NOT CLAIMED**: a genuine straddle probe needs a call issued while CLOSED whose renderer work
> lands across the transition, and this driver cannot make that window deterministic — it is stated as the
> row's honest limit, and the register's `A-2#5`/`P-EX-IM-3` cells carry it at the `[H]` layer.

---

## 4a. THE `§6.2` AUDIT'S FINDINGS — **FIXED, EACH WITH THE MEASUREMENT THAT CLOSES IT** (2026-10-09)

**The `§6.2` read-only audit** (a non-author, read-only) returned **`VALID-WITH-FINDINGS`** and named **one HIGH that
blocked a green gate 6**. **Every finding below is dispositioned in the same pass it was found** (`AGENTS.md` item 6;
`docs/specs/user-flow-audit.md` `§4` item 5), with two exceptions that this pass **may not** dispose of on its own and
which are therefore filed as **GAPS for their owners** rather than silently encoded. **THE AUDITOR HAD NO SHELL**, so the
audit's own note stands: *the claimed `30 PASS / 0 FAIL` twice, the `npm test` figures and the two `sha256` pins were
UNVERIFIED-AS-YET by the auditor and must be re-taken by a party with a shell* — **this pass re-took the run and the two
pins in-run (`§5` row 29, the battery's own `SX-G-54` reading) and reports the leg figures as CARRIED with their
revision named (`§3` `commands[]`, `§8` item 17).**

### `F1` (HIGH, BLOCKING) — **`U-6`'s RESTART ARM WAS INSTRUMENTED ON A DIFFERENT PROFILE THAN THIS RECORD CLAIMED, AND ITS PREDICATE COULD NOT FAIL**

| | |
| --- | --- |
| **The audit's evidence, all four parts confirmed by reading the as-filed driver** | (i) the restart was booted on a **fresh `mkdtemp` profile THE DRIVER SEEDED ITSELF** (`mkdtempSync` + `writeFileSync(… 'provident-security.json', {token, enabled})`), while this record's `real_input.evidence` cell claimed *"a genuinely NEW process booted on the same scratch profile"*; (ii) **boot A's OWN post-transition profile was NEVER READ** — it stayed on disk unread until its teardown; (iii) the row's printed sentence said *"a NEW process on the SAME scratch profile"* while reading `readdirSync()` of the directory the driver had just created; (iv) **the predicate could not fail**: `restartAnswer.isError !== true && !JSON.stringify(restartHtml.census ?? {}).includes('exclusion')` is satisfied by a **THROWN** call (`rawCall` answers `{ok:false,error}`, so `isError` is `undefined`) and by an **ABSENT** `census` member (`?? {}`) — **so DELETING THE FEATURE STILL READ PASS.** **CONSEQUENCE: the `D-19`/`N-5` property (the flag is not persisted, no third file exists, no `exclusion` key is in the file) WAS NOT MEASURED AT ALL** |
| **THE FIX — the arm, re-instrumented** | The restart now boots on a **`cpSync` COPY OF BOOT A'S OWN POST-TRANSITION PROFILE** (`profileRestart = <tmp>/profile`, the copy target deliberately NOT pre-created, so `cpSync` makes it a copy of boot A's live directory and not a merge into a directory this pass wrote). **THE WHOLE PROPERTY IS INSIDE ONE NAMED PREDICATE FUNCTION (`restartArmProperty`), READ AS `12` NAMED TERMS**, so a red row says WHICH part broke — and the SAME function is what the control drives: `answer-ok` (a throw reddens) · `answer-not-error` · `answer-normal` (NOT the receipt + the markdown present) · `new-process` (pid ≠ boot A's) · `precondition-open` (boot A's own live bridge read `mcp-disabled` **AND** a live stdio call answered the receipt at the moment of the copy) · `no-new-entry` (no profile entry added across the window, RAW and unfiltered — the as-filed row filtered on `security`/`settings` and so could not see a third file under any other name) · `baseline-settled` · `transition-window-clean` (the TIGHT window: `setExclusion('mcp-disabled')` + the reload added nothing) · `copy-is-of-source` (listing-equal **and** byte-equal) · `no-exclusion-key` (three readings: boot A's own file, the copy as made, the copy after the restart boot) · `store-file-set` (exactly the one declared store file, on the source and on the post-boot copy) · `store-non-vacuous` (the bytes parse to an object carrying `token` + `enabled` — the positive control against the as-filed `?? {}` vacuity) |
| **THE MEASUREMENT (run 1 of 2; run 2 identical in every term)** | Precondition MEASURED on boot A: bridge `exclusion="mcp-disabled"` AND the live `provident.get_markdown` answering the receipt. NEW process **pid `136417`** vs boot A's **`135649`**. Answer: `ok=true`, `isError=false`, `receipt=null`, a real markdown (`"# Provident-Electron — MCP endpoint demo…"`). Boot A's OWN post-transition profile listing: **18 entries** (`Cache`, `Code Cache`, `DIPS`, `DIPS-wal`, `DawnGraphiteCache`, `DawnWebGPUCache`, `Dictionaries`, `GPUCache`, `Local Storage`, `Network Persistent State`, `Preferences`, `Shared Dictionary`, `Trust Tokens`, `Trust Tokens-journal`, `blob_storage`, `declarative_performance_observer.db`, `declarative_performance_observer.db-journal`, `provident-security.json`). The copy's listing **EQUALS** it. Store bytes: boot A's own **87 chars** = the copy's **87 chars**, and **no `exclusion` key in ANY of the three readings**. Store-space file set: `["provident-security.json"]`. **TERMS: all `12` true** (`run 2` reproduced every term, every listing and both byte readings identically; only the two pids differ — `136916` vs `136623` — which is exactly what a second live run should differ in) |
| **THE CONTROL THAT PROVES THE NEW PREDICATE CAN FAIL (mandatory, and it is a FILESYSTEM fixture)** | `8` fixtures are driven through **the SAME `restartArmProperty`**; **all `8` are REFUSED**, and each names the term that caught it: **(1) THE DELETION CASE — a profile whose store DOES carry `"exclusion":"mcp-disabled"` AND a third `provident-exclusion.json` beside it** → refused on `no-new-entry`, `transition-window-clean`, `no-exclusion-key`, `store-file-set`; (2) a restart that came back **CLOSED** (the answer IS the receipt) → `answer-normal`; (3) a restart call that **THREW** (the as-filed `isError === undefined` hole) → `answer-ok`, `answer-normal`; (4) a **third entry** across the window → `no-new-entry`, `transition-window-clean`, `copy-is-of-source`, `store-file-set`; (5) **the transition ITSELF wrote a file** (the tight window) → `transition-window-clean`; (6) boot A **was not open** at copy time → `precondition-open`; (7) a **baseline that never settled** (the window would be a race, not a reading) → `baseline-settled`; (8) a **re-seeded copy** (not boot A's bytes) → `copy-is-of-source`. **SO DELETING THE FEATURE IS NOT A PASS, AND THE ROW REDDENS WITH ITS TERM NAMED** |
| **A MEASURED INSTRUMENT CONSTRAINT, RECORDED SO A LATER RUN DOES NOT RE-DISCOVER IT** | The `N-5` "no new file" term cannot be measured from a listing taken at the pane's first paint: **Chromium writes its OWN bookkeeping into the `userData` directory lazily** — `Cache/`, `Code Cache/`, `GPUCache/`, `DIPS`, `Trust Tokens`, `blob_storage/`, `declarative_performance_observer.db` appear within ~`6 s`, and **`Network Persistent State` + `Preferences` only at ~`8`–`14 s`** (MEASURED twice this pass, first with a 3-read settle at ~5 s — which the first re-run read as a RED row on the browser's own writes, and which is why the baseline is now AGE-QUALIFIED). The baseline is therefore taken only after **`≥ 30 s` of process age AND 3 consecutive identical 1-second readings**, with the settling REPORTED as part of the row: this run settled in **`31` polls at age `30 s`**, the runtime having added **`["Network Persistent State","Preferences"]`** while it settled. **These runtime entries are printed in full in the row and are NOT the app's store; the store-space filter is a separate term** |
| **THE RECORD'S OWN Wording, corrected (`RCA-8(d)` ANNOTATE-BESIDE)** | The as-filed cell's *"on the same scratch profile"* / *"a genuinely NEW process booted on the same scratch profile"* is kept visible at `§0` and at git history and is **FALSIFIED** as a description of that run; the `§3` `real_input.evidence` and `surface.evidence` cells now say exactly what the code does (a `cpSync` copy of boot A's own post-transition profile, made after the transition, with the copy's fidelity inside the predicate) |

### `F2` (MED) — **A NON-U-ROW WAS COUNTED AS ONE OF THE REPORT'S `8` PASSES**

**Fixed as the audit's first option: the report is emitted with `7` U-rows and `summary.total: 7`**, `rows[]` = `{U-1…U-7}`
= the matrix's U-row set, and the `U-8` precondition is a **printed note BESIDE the total with its terms** (`8` matrix
rows = `7` U + `1` non-U note) in the additive `nonRowNotes` array — **so a non-flow row is not one of the report's
PASSes**. The matrix at `§2` was regenerated the same way (its `U-8` row is now a note beneath the table). **The audit's
other option — "if you judge the `§6.1` definition should change, say so as a GAP for its owner" — is answered NO, with
its reason: `docs/specs/user-flow-audit.md` `§6.1` names the U-row count in BOTH places (`rows[]` and `summary.total`),
so a report reading `8` is the `INVALID` total that file's `§2` describes; nothing here requires a definition change and
none is proposed.** The `U-8` note's own terms are kept: the run restores `mcp-enabled` and removes all four scratch
directories.

### `F3` (MED) — **TWO PASSING ROWS PRINTED EVIDENCE ASSERTING THE AS-FILED DEFECTS AS CURRENT, AND THE "EACH RE-GRAINED ROW SAYS SO" CLAIM WAS FALSE**

| The site | What it said | **Fixed to** |
| --- | --- | --- |
| driver, row 7 (`U-2` the gesture half) | *"the gesture IS delivered to the renderer … — the authored handler body does not run"* | **CORRECTED BESIDE**: under this very gesture the authored `EXCLUSION_TOGGLE_BODY` **DOES** run — its own observation prints `data-state="mcp-disabled"` and the live MCP call answers the receipt, which is only possible if it ran. That sentence described the `F-2` DEFECT, which the implementer fixed at `afd3212`. **AND THE ROW IS NOT RE-GRAINED**: its predicate is the as-filed one, now with `clickLanded` asserted too (`F9`) |
| driver, row 9 (`SX-G-57 (live)`) | *"the handler closes over the gate instance constructed at boot … so the response record reports the boot state, never the live one"* | **CORRECTED BESIDE, WITH THE LANDED LINE CITED**: `L` `src/main/main.ts:384` answers `{ ...securityStore.get(), exclusion: mcp.gate.exclusionState() }` (`mcp.gate`: `L` `src/main/mcp-server.ts:742`) — the server's OWN live accessor, i.e. the same ONE holder that enforces the exclusion. The boot-gate closure was the `F-4` defect, fixed before this row was re-read |
| driver, row 15 (`U-6`, the operator's view) | the same stale mechanism sentence | **CORRECTED BESIDE, plus an explicit "NOT RE-GRAINED" note** (its predicate is the as-filed one; the as-filed FAIL was the host defect `F-4`) |
| the `§5` header's claim | *"rows 7, 9, 10, 11, 13, 15, 22 and 25 are RE-GRAINED or RE-GROUNDED — each says so in its own `evidence` string"* | **FALSIFIED AND REPLACED (the audit found only rows 10, 13, 23 and 25 carrying such a note).** The header now names the rows that DO carry a re-grain/re-ground note and, separately, the rows whose evidence strings were CORRECTED — see `§5`'s own header, which is the corrected claim |
| `§8` item 9's claim | *"both re-grains are stated with their as-filed forms in the driver's own `evidence` strings"*, read as covering rows 7/9/15/22 | **CORRECTED at `§8` item 9**: the re-grains that carry their as-filed form in the driver are rows 10, 11, 12, 13, 23, 25 (and the added control row 14); rows 7, 9 and 15 were **NOT** re-grained and are annotated as host-defect-corrected, and row 8 was re-AUTHORED (a control row); **row 22 was neither** and is no longer claimed as either |
| `§5`'s row-7 parenthetical (`battery:361` in the as-filed numbering) | *"the row is re-grained to the receipt + set-equality"* | **CORRECTED**: row 7's predicate is the RENDERED SEGMENT (plus the landing flag); **the receipt is row 11 and the set-equality is row 12** — the as-filed parenthetical misdescribed which row asserts what |

**AND THE DRIVER'S OWN NOTES WERE COMPLETED, NOT JUST TRIMMED:** rows **11** and **12** — which WERE re-grained and said so nowhere —
now carry their `RE-GRAINED 2026-10-08` notes with the as-filed predicate each replaces (`> 0` handles; `isError !== true` on one call).

### `F4` (MED) — **THE STRADDLE ROW'S PREDICATE COULD NOT FAIL ON ITS OWN DECLARED FALSIFIER**

> **⟶ RE-DISPOSITIONED 2026-10-09: `DECLARED-LIMIT`, NOT `Fixed` (the second `§6.2` audit's `F-A6`; owner: THE SPEC OWNER, on the open ruling `GAP-2`).** The `F4` "fix" below **does not hold**, and the audit's three parts are confirmed against the driver's bytes: **(i)** the POST is issued when the tier is **ALREADY `mcp-disabled`** (the transition that opened it ran above and its own row measures the `503` on this process — `§5` row 25), so the as-filed driver sentence *"while the tier is ADMITTED … still in flight"* and this record's own *"while the tier was IN TRANSITION"* are **BOTH FALSE of the code**: what is measured is the plain ARRIVAL refusal of `§2.3` item 2, i.e. the same decision row 25 measures; **(ii)** `countStatusLines(straddle.text)` counts `HTTP/1.x NNN` inside the **BODY of ONE `fetch` Response**, while a second status line on the response stream is a **framing event `fetch` cannot represent** — and if one occurred, `res.text()` would reject and **abort the run** (the `F14` class); **(iii)** the counter's control drives a **SYNTHETIC STRING**, not the transport. **THE ROW'S CLAIM IS THEREFORE NARROWED TO WHAT IT READS** (ONE answer on ONE stream, with the arrival decision measured), the two false sentences are corrected in the driver and in `§5`/`nonRowNotes`, and **a genuine straddle — a dispatched renderer round trip held open across the transition — is NOT implemented by this pass**: it waits on the architect's `GAP-2` ruling (is `§2.3` item 3's in-flight arm a matrix subject at all?). **The `Fixed` claim below is KEPT VISIBLE as what the first pass asserted and is NOT the operative disposition.**

**THE FIRST PASS'S CLAIM (kept byte-intact, superseded above).** **Fixed by asserting the count**: the declared falsifier (`§2.3` item 3: a SECOND STATUS LINE on the one response stream)
is now a **PREDICATE TERM** — `countStatusLines(straddle.text) ≤ 1` — and the counter has **its own control in the same
row** (a synthetic body carrying two status lines must count `2`, and it does: the control reads `2 = 2` while the live
body reads `0 ≤ 1`). The as-filed disjunct (`status !== 503 || text.includes('exclusion-closed')`) is kept BESIDE it as
the row's other term, so a 503 must still carry the declared body. **MEASURED (first pass):** status `503`, `1` body line, **`0`
status lines**, the declared body present. **RE-MEASURED (this pass, `§5` row 28):** the same readings, with the row's subject
and evidence now stating that it measures the ARRIVAL decision and NOT the straddle.

### `F5` (MED) — **THE DRIVER EXITED `0` UNCONDITIONALLY, SO `exit: 0` CARRIED NO INFORMATION**

**Fixed:** `process.exit(TALLY.FAIL ? 1 : 0)`. The as-filed 6-FAIL run and the as-filed green run carried the SAME exit
code, so the record's `exit` evidence was decoration. **Now it is a reading, and the first pass reported `exit 0` on BOTH of its
two executions; THIS pass re-took it (`exit 0` on both of its own two executions, `§0`).**

### `F6` (MED) — **A FAILURE VERDICT OUTSIDE THE CLOSED SET (`REPORT`)**

**Fixed:** the boot-order row (`SX-G-45`) now answers **`FAIL`** when the two landmarks are not in the declared order. The
as-filed `REPORT` was outside the `PASS`/`FAIL`/`MANUAL`/`PARKED` set this battery and `§6.1` clause 1 declare, **and the
FAIL list filters on `verdict === 'FAIL'`** — so a boot-order regression printed no FAIL and appeared in no list. The
`check()` helper's own docstring was corrected with it, and the mark set no longer has a `·` catch-all.
**⟶ THE REPORT-SIDE RESIDUAL OF `F6` WAS STILL OPEN AND IS FIXED THIS PASS (the second audit's `F-A12`):** the `§6.1`
report's preamble claimed *"each row's `verdictClass` from the closed set `PASS`/`FAIL`/`PARKED`"* while **NO row carried
a `verdictClass` at all** (it was summary-only), the per-row `verdict` values (`CHANGED`/`UNCHANGED`) sit OUTSIDE that
closed set, and the set cannot represent `MANUAL` — so the **`0 MANUAL` claim that `GAP-1` turns on had no representable
field.** **Fixed at `§3`:** every one of the `7` rows now carries **`"verdictClass": "PASS"`** beside its `verdict`, and
the summary carries an explicit **`"manual": 0`** member beside the class map. **`GAP-1` STAYS OPEN** — this makes the
claim REPRESENTABLE, it does not make the ruling.

### `F7` (LOW) — **THE `tests/**` LOCATION WAS RIGHT; THE STATED REASON WAS WRONG**

**Fixed in the driver's own header, with the pinned hazard named correctly:** `HELPER_NAME = HELPERS.find((f) =>
importsHelper(DIVERGENCE_SRC, f)) ?? HELPERS[0]` (`tests/ui-leg-contract.test.ts:110`) prefers the candidate **the
divergence leg imports** — `scripts/electron-spawn.mjs` — so an **unimported** new `scripts/*.mjs` would **not** be
selected and would **not** redden that row. The real pinned hazard is the **`package.json` `scripts` KEY SET**: the same
file's `L-1` row pins `LANDED_SCRIPT_KEYS` (the landed keys plus exactly `ui`) in both directions, so a new **key** — not
a new file — reddens it and a config change cannot satisfy it (`AGENTS.md` item 4's hazard note). **This driver adds no
key** (its literal command line is `node tests/secure-exclusion-live.mjs`), so the `scripts/` route was *permissible* and
is not taken for the non-structural reason now stated: this harness belongs with the batteries it re-runs under
`tests/**`. **⟶ ITS OUT-OF-DRIVER RESIDUAL IS `HANDED BACK`, WITH AN OWNER (the second audit's `F-A17`):** the SAME false
claim still stood **in the spec** at `docs/specs/secure-exclusion.md:1084-1086` (*"AND A NEW `scripts/*.mjs` DRIVER IS
NOT A LOOPHOLE — IT WOULD REDDEN `tests/ui-leg-contract.test.ts`'s HELPER-CANDIDATE RULE"*). **THIS PASS ANNOTATES THAT
CELL IN PLACE (`F-A17`: a dated `ANNOTATE-BESIDE`, the ONE spec byte this pass may edit) and changes nothing else in the
spec** — full disposition at `§4b` `F-A17`.

### `F8` (LOW) — **THE `[CDP]`-IN-PLACE-OF-`MANUAL` SUBSTITUTION: A CITATION, AND A `GAP` WHERE THE CITATION DOES NOT REACH**

**The citation exists and is now carried instead of this pass's own annotation**: `docs/decisions.md`'s
**`REAL-DOM-UI-GATE-LEG`** row (**architect ruling `A-d8`**) admits the reach-ins `webContents.executeJavaScript`, *then
CDP*, as **leg-only** channels that *"may NEVER become MCP tools"* — which is the owner authority for `[CDP]` as an
instrument in this tree, and the reason the driver's route (`--remote-debugging-port=0` + the DevTools endpoint + a raw
WebSocket) is admissible at all. **BUT THE CITATION DOES NOT REACH THIS BATTERY, AND THIS PASS DOES NOT RATIFY IT:**
`A-d8` rules about the `ui` **leg**, while `docs/specs/secure-exclusion.md` `§2.4` item 7(2-note) **predicts `MANUAL`**
for the gesture rows (structural reason: the pane is an isolated graph and `R4` forbids the two `webContents` reach-ins).
**GAP-1 — FOR THE SPEC OWNER: does `[CDP]` supersede the declared `MANUAL` for the gate-6 gesture rows?** The measurement
that forces the question is in `§6`: `[CDP]` took every reading the contract predicted `MANUAL` for, so a `MANUAL` row
here would have been the convenience move `§6.1` clause 5 forbids — **but the ruling that a leg-only `ui` channel is a
gate-6 instrument is the owner's to make, not this author's.**

> **⟶ `GAP-1`'s PREMISE CORRECTED 2026-10-09 (the second `§6.2` audit; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed
> premise stands above, byte-intact).** **THE AS-FILED PREMISE SAID THE DECLARATION "DOES NOT AGREE" WITH THE
> MEASUREMENT — AND THE CELL THIS SECTION CITES HAS ALREADY BEEN AMENDED IN THE UNIT'S FAVOUR.** The cell is
> **`docs/specs/secure-exclusion.md:1061-1091`** (`§2.4` item 7(**2-note**)), and its tail carries a **`SPENT`
> annotation dated 2026-10-08** reading: *"**⟶ SPENT — THE REVISIT CONDITION IS MET, 2026-10-08: GATE 6 HAS RUN** …
> the gate-4 prediction that the gesture rows must be `MANUAL` was **FALSIFIED IN THE UNIT'S FAVOUR by the CDP route
> the gate-6 pass used**"* — i.e. **the contract's own clause already records the disproof, by name and by date.** So
> `GAP-1` is **NOT** a live contradiction between the contract and the measurement; **it is a QUESTION ABOUT SCOPE**,
> and it must be put to the architect in that form. **THE QUESTION THE ARCHITECT IS ACTUALLY RULING ON (re-stated
> 2026-10-09, replacing the as-filed "does `[CDP]` supersede the declared `MANUAL`?"):** *does that 2026-10-08 `SPENT`
> cell **SETTLE** `[CDP]` as an admissible gate-6 instrument for this unit's gesture rows — or did the cell **OVER-REACH**
> by recording a falsification of a prediction whose instrument authority is a `ui`-LEG ruling (`A-d8`) that does not
> name this battery?* **EITHER WAY `GAP-1` STAYS OPEN AND IS NOT SELF-RATIFIED HERE.** If the architect rules the cell
> settled it, the record's `MANUAL`-refusal is confirmed after the fact; if the architect rules the cell over-reached,
> the gesture rows' instrument must be re-declared (a spec edit this pass may not make — its only permitted spec byte
> is the `F-A17` annotation).

### `F9` (LOW) — **`clickLanded` AND `toolsBefore` COMPUTED AND NEVER ASSERTED**

**Fixed:** `clickLanded` (element identity via `elementFromPoint` + `isTarget`) is now **inside row 7's predicate**, the
same shape `U-4`'s HTTP arm already asserted; and the dead `toolsBefore` binding was **removed** — the boot-time listing
handle is `namesEnabledBoot`, which the registry row's evidence already prints (`19` handles).

### `F10` (LOW) — **THE STALE-WINDOW PREFLIGHT WAS AN OPERATOR STEP, NOT A DRIVER STEP**

**Fixed:** the driver runs its own preflight before the first boot (`ps -eo pid=,args=` scanned for
`dist/main/main.cjs`, chosen over `pgrep` so the probe needs no `procps` and cannot match itself), records it as
**`§5` row 1**, and **STOPS the run (exit `1`, no summary) if anything is found** — a stale window would make the CDP
attach and every rendered-box reading ambiguous. **MEASURED this run: `[]`.**

### `F12` — **STALE / CONTRADICTORY COMMENTS INSIDE THE INSTRUMENT**

**Fixed, four sites, each corrected beside its as-filed text:** (1) the block that claimed *"THE TRANSITION CHANNEL FOR
THE WHOLE RUN is BOOT A's CDP surface"* — contradicted 100 lines later by the code and by the measurement, because the
exclusion gate is **one per process**; the HTTP phase's transitions are landed on **the HTTP boot's own surface**; (2)
the `PHASE 0b` header that claimed the HTTP phase drives transitions *"on boot A's live window"*; (3) the *"BOOT A STAYS
ALIVE THROUGH PHASE 5 … the app's own gate is the shared authority"* note — boot A is kept alive because **PHASE 4 copies
its post-transition profile**, not because of a shared gate; (4) the *"There is no CDP on this boot"* paragraph, false
since the HTTP boot gained `--remote-debugging-port=0`, **plus a dangling reference to a `preloadTransition` function
that does not exist** (the function is `transitionOverHttp`). The row-9 and row-7 mechanism sentences are corrected under
`F3`.

### `F14` (LOW) — **`U-1`'s FALSIFIER ABORTED THE RUN INSTEAD OF RECORDING A FAIL**

**Fixed:** the predicate asserts `beforePane.present === true` FIRST and reads the box only through a guarded binding, so
the absent-control regression prints a **FAIL row** (`"the control is NOT in the DOM at all (paneRead() →
{present:false})"`) instead of throwing a `TypeError` that kills the whole run before the summary — i.e. the row that
exists to catch a missing control could not report one.

### `F15` (MED, completeness) — **THE IN-FLIGHT / STRADDLE BEHAVIOUR HAS NO MATRIX ROW**

**Dispositioned in the `§6.1` clause-5 declared-limit form, with its STRUCTURAL reason and a GAP for the owner** — see
`§2`'s second note and the report's `nonRowNotes`: the arm is **not deterministically exercisable** (a renderer round trip
is milliseconds wide), the row the battery DOES take measures the **ARRIVAL** decision and says so, and the reason it is
a **non-row note** rather than an eighth U-row is cited from the contract (`§2.3` item 3 declares it a server-side
protocol property, not an operator-visible flow; `§2.4` item 7(2) declares the subject list; `docs/specs/
user-flow-audit.md` `§5` item 1 forbids this record from re-deriving it). **GAP-2 — FOR THE SPEC OWNER:** if the owner
rules it a matrix subject the count becomes `8` and `summary.total` follows.

### `F16` (recorded in the as-filed fix commit's own ledger, **NOT IN THE FIRST 2026-10-09 PASS'S MANDATE**) — **`U-2`'s registry half and `U-7` do not bite against TOTAL deletion**

**NOT DISPOSITIONED BY THE FIRST PASS, AND NOT SILENTLY DROPPED — AND NOW `FIXED` BY THE SECOND (`F-A1`).** The finding (`U-2`'s registry half and the `U-7` row would not redden
if the registration-set property were deleted outright) is named in the as-filed commit record but was **not among the first
pass's mandated findings**, so that pass did NOT re-grain those rows. **ITS DISPOSITION AT THAT TIME WAS A BARE ACKNOWLEDGEMENT — `HANDED BACK` with no owner — AND THAT IS EXACTLY WHY IT BECAME THE SECOND AUDIT'S BLOCKING HIGH `F-A1`.** **⟶ DISPOSITION 2026-10-09 (SECOND PASS): `FIXED`, with an owner, a site and a measurement.** The registry row now carries the transition's OWN precondition as a term (`closed-state-bridge` / `open-state-bridge`, read off the bridge) and the row BESIDE it (`§5` row 14) drives **`5` DELETION/REGRESSION fixtures through the SAME `registrationTransitionProperty`**, **ALL refused** — the FIRST fixture being the deletion case itself, refused on `open-state-bridge` ALONE. **Row 12's set-equality half was NOT weakened to do it: the expression is the same one, in the same order.** Full disposition at **`§4b` `F-A1`**; the as-filed acknowledgement text above stands as the record of what the first pass did.


## 4b. THE SECOND `§6.2` AUDIT'S FINDINGS (`F-A1`…`F-A18`) — **EVERY ONE DISPOSITIONED, WITH ITS SITE AND ITS MEASUREMENT** (2026-10-09)

**The second `§6.2` read-only audit** (a non-author, read-only, over the regenerated `§2`/`§3`) returned
**`VALID-WITH-FINDINGS`** and named **ONE HIGH that blocked a green gate 6**: `F-A1`. **EVERY FINDING BELOW CARRIES AN
EXPLICIT DISPOSITION — `FIXED` with the site, `DECLARED-LIMIT` with its reason and owner, or `HANDED BACK` with the
owner** (`AGENTS.md` item 6; `docs/specs/user-flow-audit.md` `§4` item 5). **A BARE ACKNOWLEDGEMENT IS NOT A
DISPOSITION** — that is exactly what the first pass did with `F16`, and it is why `F-A1` became blocking; `F16` is now
dispositioned at `§4a` (`FIXED`, row 12 + row 14). **THE AUDITOR HAD NO SHELL, SO ITS NUMBERS WERE UNVERIFIED-AS-YET**:
this pass re-took the run twice, the driver's own sha256, the two `sha256` pins in-run, and the four legs POST-COMMIT
(`§0`, `§3` `commands[]`, `§8` items 26–27).

| Finding | Severity | Disposition | The site, and what makes it checkable |
| --- | --- | --- | --- |
| **`F-A1`** — the registry row (`U-2`/`U-7`/`SX-G-23`) had **no term asserting the exclusion transition ever happened**, so with the feature deleted both listings were identical and **the row still read PASS** (the `F16` class, undispositioned) | **HIGH, gate-6-blocking** | **`FIXED`** | **`tests/secure-exclusion-live.mjs`** — the row's predicate is now the NAMED `registrationTransitionProperty(f)` of **`5` terms**: `closed-state-bridge` (the bridge read `mcp-enabled` before the closed listing), `open-state-bridge` (`mcp-disabled` before the open one), `closed-listing`, `open-listing`, and **`set-equality` — the as-filed expression, character for character**. The row BESIDE it (`§5` row 14) drives **`5` DELETION/REGRESSION fixtures through the SAME function**, **ALL REFUSED**: the **DELETION fixture** (both listings exactly as the live run reads them, only the bridge's two readings moved back to `mcp-enabled`) refused on **`open-state-bridge` ALONE**; the cleared listing and the same-size toggle on `set-equality`; the `{__cdpError}` read on `closed-state-bridge`; the failed `tools/list` on `open-listing`. **MEASURED in both runs** (`§5` rows 12 and 14). **`F16` therefore ends as `FIXED`, not acknowledged.** |
| **`F-A2`** — the `§5` header's re-grain classification table was false in two directions (labels belonging to other rows; the RE-GRAINED list wrongly included row 23 and omitted rows 14 and 25) and its six classes enumerated only **30 of 32** rows | MED | **`FIXED`** | **`§5`'s header table**, restated in the CURRENT numbering with the row sets PRINTED: first-pass re-grains `{12,13,16,27,28}`, this pass's re-grains `{2,4,6,12,23,29}`, re-grounded `{29}`, re-instrumented `{19}`, re-authored `{10}`, added `{1,5,14,20}`, evidence-corrected `{9,11,18}`, unchanged `{3,7,8,15,17,21,22,24,25,26,30,31,32,33,34}` — **union exactly `{1…34}` ✓**, and the row-24 cell is re-worded (row 24 carries **NO** note; rows 8/10/16 are the ones that do). |
| **`F-A3`** — the report's per-verdict split (`changed: 4, unchanged: 3`) contradicted its own `rows[]` (**CHANGED ×5 / UNCHANGED ×2**); `summary.total` survived only because `4+3=7` | MED | **`FIXED`** | **`§3`'s `summary`** now reads **`changed: 5, unchanged: 2`**, and `summary_note` states the split is **DERIVED FROM `rows[]`** (`U-1, U-2, U-3, U-4, U-6` CHANGED; `U-5`, `U-7` UNCHANGED), with the stale reading kept visible as a correction. |
| **`F-A4`** — the `U-6` observation quoted pid `132422` vs boot A's `132155`, which matches **neither** documented execution | MED | **`FIXED`** | **`§3`'s `U-6` `observation`** now quotes **THIS pass's own two runs**: run 1 pid **`173325`** vs **`172991`** (`87` store chars both sides), run 2 pid **`173921`** vs **`173628`** (`86` chars both sides) — both from `§5` row 19, which prints the terms. The prior passes' pids (`136417`/`135649`, `136916`/`136623`) remain in `§4a` as THOSE runs' figures. |
| **`F-A5`** — the mandatory `§6.1` `emitter` field claimed the report "is emitted BY THE RUN FROM THE RUN" while the driver emits **no** U-row projection, `rows[]`, `summary.total`, `nonRowNotes` or `commands[]` | MED (a mandatory field false) | **`FIXED`** | **`§3`'s `emitter`** now reads **`MANUAL — tests/secure-exclusion-live.mjs prints the driver's own 34 rows …; the 7-U-row projection, rows[], summary, nonRowNotes and commands[] are AUTHORED FROM those printed rows by this gate-6 pass (OW-5)`**, the honest form `docs/specs/user-flow-audit.md:80` gives; every `observation` remains a printed value (`§6.1` clause 2). |
| **`F-A6`** — the straddle row: two false sentences, a counter that cannot witness the declared falsifier (a body substring, not the transport's framing), and a synthetic control | MED | **`DECLARED-LIMIT` — owner: THE SPEC OWNER (`GAP-2`, OPEN)** | **`§4` `F4` is RE-DISPOSITIONED from `Fixed` to `DECLARED-LIMIT`**; the driver's straddle block and `§5` row 28 carry the corrected sentences; `nonRowNotes[1]` states the three parts. **A genuine straddle (a dispatched renderer round trip held open across the transition) is NOT implemented and is NOT claimed** — it waits on the architect's `GAP-2` ruling on whether `§2.3` item 3's in-flight arm is a matrix subject at all. |
| **`F-A7`** — the record claimed the store was "identical in all THREE readings" while the third reading contributed exactly ONE term (the absence of the substring `exclusion`), so a restart that rewrote the store with a different key set still passed | MED | **`FIXED`** | **`tests/secure-exclusion-live.mjs`** — the restart arm's predicate gained **`post-boot-bytes-identical`** (`copyBytes === copyBytesAfterBoot`), so it now reads **`13` named terms**, and the control block gained a **9th fixture** (a store REWRITTEN with the key set `{token, mcpEnabled}`) that is **reported REFUSED on that term**. **MEASURED `true` in both runs** (`§5` rows 19 and 20). |
| **`F-A8`** — the boot-order row's evidence sentence contradicted both its predicate and its observation, and its subject claimed a construction order no captured line witnesses | MED | **`FIXED`** | **`tests/secure-exclusion-live.mjs`** — the predicate now asserts `orderLines[1].includes('renderer ready')` (the printed order **is** `[stdio transport ready, renderer ready]`), the sentence is corrected to the measured order, and the subject is narrowed to **the two landmarks the run CAPTURES** (`main.ts:480` logs `IPC_READY`; `mcp-server.ts:1070` logs the transport), with the store/gate construction order attributed to the `[H]` register's `P-EX-SM-3` cells instead of claimed here. |
| **`F-A9`** — `restoredArm.status !== 503` (and the same shape at the `SX-G-42` control) while the record claims `200`, so a `401`/`500` would read PASS | MED | **`FIXED`** | **`tests/secure-exclusion-live.mjs`** — both sites now assert **`=== 200`** with the negative half kept (`SX-G-42` = `§5` row 23; the HTTP return arm = `§5` row 29). **MEASURED `200` at both sites in both runs.** |
| **`F-A10`** — `U-6`'s `instrument` cell named CDP + a boot + the MCP client but not the `[G]` node-side `readdirSync`/`readFileSync` that produced the listing and the bytes | LOW | **`FIXED`** | **`§3`'s `U-6` `instrument`** now names the **`[G]` node-side profile-listing and store-byte reads** whose values are row 19's terms. |
| **`F-A11`** — three claimed values lived only in prose: `buttonText` (asserted nowhere), the `#app` absence, and the `U-4` "never dispatched" clause | LOW | **`FIXED` (two of three as driver terms), and the third as a LAYER CITATION** | **`tests/secure-exclusion-live.mjs`** — `buttonText === 'Disable MCP'` is a TERM of `U-1` (`§5` row 4); `isolation.appMountHasToggle === false` AND the `#app` mount's `innerHTML` containing neither id are TERMS of `U-5` (`§5` row 6). **The `U-4` clause is CORRECTED IN THE RECORD, not given a counter**: what the driver measures is the open-state call's RESULT BEING the receipt (`§2.2` item 2(a)'s invocation-turn refusal), while the renderer-side `sends=0` property is asserted at the `[H]` layer by the register's `A-2#5`/`P-EX-IM-3` cells (`tests/secure-exclusion-register.ts`) — cited, not claimed. |
| **`F-A12`** — the report's preamble claimed "each row's `verdictClass` from the closed set" but no row carried one, and the set drops `MANUAL`, so the `0 MANUAL` claim `GAP-1` turns on was not representable | LOW | **`FIXED`** | **`§3`** — **every one of the `7` rows now carries `"verdictClass": "PASS"`** beside its `verdict`, and the summary carries **`"manual": 0`** beside the class map (verified by parsing the block as JSON). |
| **`F-A13`** — clause 4 said "nine literal command lines … (`0` for all eight)" while the array held 9 entries all `exit: 0`; and the row-number map's last entry cited a site containing no such text | LOW | **`FIXED`** | **`§3` clause 4** now reads **ten** command lines / **`0` on all ten** (the count moved by this pass's own added `sha256sum` cell) with the as-filed wording kept visible; **`§4`'s row-number map** is EXTENDED to the `34`-row numbering and its `§8` item 6 entry is **WITHDRAWN** as a citation to a site that contains no such text. |
| **`F-A14`** — the tight-window control fixture filtered out Chromium-written `'Preferences'`, so on a host without that name the fixture would produce a **FALSE RED** | LOW | **`FIXED`** | **`tests/secure-exclusion-live.mjs`** — the fixture now filters **`PROFILE_STORE_FILE`** (`provident-security.json`), the file **this driver seeds itself** in `seedProfile`, so its presence is guaranteed by the driver rather than by Chromium's bookkeeping. **The fixture is still REFUSED on `transition-window-clean` in both runs.** |
| **`F-A15`** — two rows shared the id `SX-G-45`, making the FAIL list ambiguous | LOW | **`FIXED`** | **`tests/secure-exclusion-live.mjs`** — the preflight is now **`SX-G-45p (preflight)`**; the boot-order row keeps `SX-G-45`. **Visible in `§5` rows 1 and 2 and in the runs' own output.** |
| **`F-A16`** — the record printed a full `statusText` line the driver never printed | LOW | **`FIXED`** | **`tests/secure-exclusion-live.mjs`** — a NEW row (**`SX-G-03`**, `§5` row 5) prints `#security-status`'s full `textContent` and asserts it is a non-empty string carrying the `MCP:` segment. |
| **`F-A17`** — `docs/specs/secure-exclusion.md:1084-1086` still carried the claim that a new `scripts/*.mjs` driver "WOULD REDDEN `tests/ui-leg-contract.test.ts`'s HELPER-CANDIDATE RULE" | LOW | **`FIXED`** (a dated `ANNOTATE-BESIDE` on that cell — **the ONE spec byte this pass may edit**) | **`docs/specs/secure-exclusion.md:1084-1086`** — the as-filed words are KEPT and a dated annotation names the disproof (`HELPER_NAME = HELPERS.find((f) => importsHelper(DIVERGENCE_SRC, f)) ?? HELPERS[0]`, `tests/ui-leg-contract.test.ts:110`, so an UNIMPORTED new file is never selected) and the REAL pinned hazard (the `L-1` row's `package.json` `scripts` KEY SET). **No other spec byte changed.** |
| **`F-A18`** — `src/main/main.ts:381`'s comment cites the gate accessor as `mcp-server.ts:695`, while the accessor is **`:742`** and `:695` is a docstring | LOW | **`HANDED BACK` — owner: `S1`'s IMPLEMENTER, on their next touch of the file — filed in `docs/defects.md`** | **NOT corrected in place, and the scope test is stated rather than assumed:** `src/main/main.ts` IS on `§5.1` item 1's ALLOWED file list, but that clause names the sites it permits in that file (*"the gate construction site's initialization, the ONE new channel constant's handler, the additive `exclusion` member on the two `IPC_SECURITY_*` responses"*) — **a `:381` comment inside the `IPC_SECURITY_GET` handler's rationale block is NOT one of them** — so the comment is OUTSIDE the DECLARED edit set and the `HANDED BACK` branch of the audit's own instruction applies. **The finding is not widened into a diff-scope change to fix a comment.** |

**THE TWO RULINGS THIS PASS MAY NOT MAKE, BOTH STATED AS OPEN WITH THEIR OWNERS (`§6`, `§8` items 23–24):**
**`GAP-1`** — `[CDP]`-in-place-of-`MANUAL` for the gate-6 gesture rows; **premise CORRECTED** (`§4a` `F8`'s block: the
cited cell `docs/specs/secure-exclusion.md:1061-1091` **already carries a 2026-10-08 `SPENT` annotation** recording the
falsification in the unit's favour by the CDP route, so the question is **whether that cell SETTLES `[CDP]` or
OVER-REACHED**, not whether the declaration "does not agree"). **`GAP-2`** — whether `§2.3` item 3's in-flight/straddle
arm is a matrix subject; **if the architect rules YES the count moves `7 → 8`, `rows[]` gains a row and
`summary.total` follows** — and this pass does NOT anticipate that ruling (`summary.total` stays `7`). **NEITHER IS
SELF-RATIFIED.**


## 5. THE FULL ROW SET — every check THIS RUN recorded, verbatim

**⟶ 2026-10-09, SECOND PASS (the set below is THIS pass's, `34` rows, from the first of two identical executions; the
first pass's `32`-row set, the as-filed `29`-row set with its `6 FAIL` and the 2026-10-08 `30`-row set stand at this
file's git history and at `§4`, which quotes each failing row's as-filed value).**

**WHICH ROWS CARRY A RE-GRAIN, RE-GROUND, RE-INSTRUMENT OR CORRECTION NOTE — RESTATED IN THE CURRENT (`34`-ROW)
NUMBERING, BECAUSE THE AS-FILED CLAIM WAS FALSE AND THE FIRST RESTATEMENT'S LIST WAS FALSE IN TWO DIRECTIONS (the
second `§6.2` audit's `F-A2`; the first audit's `F3` was the claim it corrected).**

> **WHAT THE AUDIT FOUND IN THE AS-FILED TABLE (`F-A2`), NAMED SO THE CORRECTION IS CHECKABLE:** the RE-GRAINED list read
> `11, 12, 13, 23, 26` **with labels belonging to other rows** — label `11` was body row 12, `12` was body row 13, `13`
> was body row 14, `23` was body row 25 — **while against the driver's bytes the RE-GRAINED rows were `11, 12, 13, 14,
> 25, 26`**, so the list **wrongly included row 23** (whose evidence carries no re-grain note) and **omitted rows 14 and
> 25**. The EVIDENCE-CORRECTED cell claimed row 24's evidence *"says explicitly what was or was not moved"* — **it does
> not** (rows 8/10/16 do). And **the six classes enumerated only 30 of the 32 rows**: rows 14 and 15 appeared in none of
> them. **THE FIX: the classes below enumerate all `34` rows, the numbering is the CURRENT one, and the row-24 cell is
> re-worded to what row 24 actually is (a row with NO note owed).**

| Class | Rows (CURRENT numbering) | What its own evidence string says |
| --- | --- | --- |
| **RE-GRAINED — THE FIRST PASS's re-grains (the predicate moved; the as-filed form is named in the string)** | **12** (`U-2` registry / `U-7` / `SX-G-23`: `> 0` handles → **SET EQUALITY**), **13** (`U-4` return arm: `isError !== true` on one call → **the enabled-shape answer + the bridge member + the arrival receipt**), **16** (`U-6` reload arm: `isError === true` → **the receipt's full shape**), **27** (`SX-G-44`: the text CONTAINS the token → **the receipt itself**), **28** (`SX-G-43` straddle: the declared falsifier's count is now ASSERTED, `F4`) | each carries `RE-GRAINED 2026-10-08`/`2026-10-09` with its as-filed predicate quoted in its `evidence` string |
| **RE-GRAINED — THIS PASS's re-grains (the SECOND audit's findings; each names the property it moved)** | **2** (`SX-G-45`: the boot-order predicate now asserts the RENDERER landmark SECOND, and the subject is narrowed to what the two captured landmarks witness — `F-A8`), **12** (`U-2` registry: the transition's OWN precondition is now two TERMS, with the set-equality half UNCHANGED — `F-A1`; so row 12 is re-grained TWICE, by both passes), **23** (`SX-G-42`: `!== 503` → **`=== 200`**, the negative half kept — `F-A9`), **29** (`U-4` HTTP return arm: `!== 503` → **`=== 200`**, the negative half kept — `F-A9`), **4** (`U-1`: the enabled-state `buttonText` affordance word is now a PREDICATE TERM — `F-A11`), **6** (`U-5`: the `#app` mount's toggle flag AND its `innerHTML` are now PREDICATE TERMS — `F-A11`) | each carries its `RE-GRAINED 2026-10-09` note, and the three rows whose PREDICATE was untouched while their evidence/sentences were corrected (`9`, `11`, `18`) say so explicitly under the class below |
| **RE-GROUNDED (the instrument moved, the subject did not)** | **29** (`U-4` return arm, HTTP: re-grounded on the MANUAL-UI path the contract declares, `F-5`) — **the SAME row `29` is both re-grounded (`2026-10-08`) and re-grained (`2026-10-09`, `F-A9`), which is why the distinct-row arithmetic below counts it once** | carries `RE-GROUNDED 2026-10-08` with the clauses for both halves |
| **RE-INSTRUMENTED (the arm's whole shape)** | **19** (`U-6` restart arm: a re-seeded `mkdtemp` profile → **a `cpSync` copy of boot A's own post-transition profile**, `2` terms → `13` terms after `F-A7`) | carries the first audit's `F1` by name, the as-filed predicate verbatim, and the `13` terms with their live values |
| **RE-AUTHORED (a control row whose controls changed)** | **10** (`U-2` sibling controls: one control → three, and the `#journal-length-apply` reading is stated as a NO-CHANGE reading that can never be a control) | carries `CONTROL COLUMN …` and the corrected reading of the third control |
| **ADDED (the FIRST PASS)** | **1** (the stale-window preflight, `F10`), **20** (the restart arm's DELETION/RED-FAIL CONTROL, `F1`) | each carries the finding it closes |
| **ADDED (THIS PASS)** | **5** (`SX-G-03`, the status line's own text printed, `F-A16`), **14** (the REGISTRY row's DELETION/RED-FAIL CONTROL, `F-A1`) | each carries the finding it closes |
| **EVIDENCE CORRECTED, PREDICATE UNCHANGED (NOT re-grained — the as-filed FAIL of each was a HOST defect fixed at `afd3212`, or the row was green both times)** | **9** (`U-2` gesture: the stale *"the handler body does not run"* sentence, `F3`), **11** (`SX-G-57`: the stale boot-gate mechanism sentence, `F3`), **18** (`U-6` operator's view: the same stale mechanism, `F3`) | each says **explicitly what was or was not moved** (these are the rows the audit found DO carry that sentence) |
| **UNCHANGED, NO NOTE OWED** | **3, 7, 8, 15, 17, 21, 22, 24, 26, 30, 31, 32, 33, 34** — **`24` IS IN THIS CLASS, and the as-filed cell that put it in the EVIDENCE-CORRECTED class is RE-WORDED here (the audit's `F-A2`): row 24 is `SX-G-38`'s ordering row, green in both runs, carrying NO note at all — the as-filed claim that its evidence "says explicitly what was or was not moved" was FALSE of it** | — |

**THE CLASSES NOW ENUMERATE ALL `34` ROWS, each in at least one class, and the membership is PRINTED WITH ITS TERMS so it can be checked rather than trusted:** first-pass re-grains `{12, 13, 16, 27, 28}` · this pass's re-grains `{2, 4, 6, 12, 23, 29}` · re-grounded `{29}` · re-instrumented `{19}` · re-authored `{10}` · added `{1, 5, 14, 20}` · evidence-corrected/evidence-corrected-predicate-unchanged `{9, 11, 18}` · unchanged, no note owed `{3, 7, 8, 15, 17, 21, 22, 24, 25, 26, 30, 31, 32, 33, 34}`. **THE UNION IS EXACTLY `{1…34}` = `34` ROWS ✓** — rows `12` and `29` each appear in TWO classes (row 12 re-grained by both passes; row 29 re-grounded in 2026-10-08 AND re-grained this pass), which is why the class SUM is `37` while the distinct-row count is `34`: **the sum is not the membership, and both are printed.** **THE AS-FILED TABLE ENUMERATED ONLY `30` OF `32` ROWS (rows 14 and 15 appeared in none of its classes) — that is the audit's `F-A2`, and it is closed by the `{1…34}` union above.**

| # | Battery row | Verdict | The observation it printed (abridged to the value) |
| --- | --- | --- | --- |
| 1 | **PREFLIGHT (NEW, `F10`; id `SX-G-45p` since this pass, `F-A15`)** no pre-existing app process on the display | **PASS** | `ps -eo pid=,args=` → `[]` before boot A; a non-empty probe stops the run |
| 2 | the TWO boot landmarks the run CAPTURES, in the declared order (`F6`: a deviation is `FAIL`, not `REPORT`; **subject narrowed + the renderer landmark now asserted SECOND, `F-A8`**) | **PASS** | `["[provident-mcp] stdio transport ready", "[provident-main] renderer ready — MCP backend armed"]` — the transport line FIRST, the renderer line SECOND |
| 3 | the boot state is the safe pair and the pane shows it | **PASS** | `data-state="mcp-enabled"`, button `Disable MCP`, segment `enabled` |
| 4 | **`U-1`** the toggle + label are PAINTED (rendered-box oracle) **+ the ENABLED-state affordance word is a TERM (`F-A11`)** | **PASS** (`F14`: `present` asserted first) | box `59x36` px at `(679,781)`, `display=block`, `classes="btn"`, label `MCP / secure-tier exclusion (mutually exclusive)`, buttonText `Disable MCP` |
| 5 | **`SX-G-03` (NEW, `F-A16`)** the status line's own rendered text is PRINTED | **PASS** | `#security-status textContent` = `"token: •••• · enabled: [read, dispatch, graph, code] · journal: ∞ · MCP: enabled"` |
| 6 | **`U-5`** the control is pane-only, never in the app graph (**the `#app` mount's flag AND its `innerHTML` now TERMS, `F-A11`**) | **PASS** | pane: toggle `true`, control `true`; `#app`: toggle `false`, `innerHTML` contains neither id; `get_rendered_html` 2354 chars, contains the id `false` |
| 7 | **`U-5`** `list_targets` carries no pane node | **PASS** | `23` nodes (declared census `23`), exclusion-shaped `[]` |
| 8 | `U-3` precondition — a normal call answers normally | **PASS** | `provident.get_markdown` → ok, `isError` absent, markdown present |
| 9 | **`U-2`** the REAL gesture moves the segment | **PASS** (evidence CORRECTED, `F3`; predicate gained `clickLanded`, `F9`; **NOT re-grained** — the as-filed FAIL was the host defect `F-2`) | the gesture landed on `BUTTON#exclusion-toggle` (`isTarget=true`) and the segment moved `enabled → disabled`, `data-state="mcp-disabled"`, button `Enable MCP`; the live call answered the DECLARED RECEIPT |
| 10 | `U-2` sibling controls on the SAME gesture path | **PASS** (RE-AUTHORED: three controls, the third stated as a NO-CHANGE reading) | `#token-gen` changed the token; `#toggle:graph` changed the enabled set; `#journal-length-apply` `undefined → undefined` |
| 11 | **`SX-G-57`** the GET response member reports the LIVE state | **PASS** (evidence CORRECTED, `F3`; **NOT re-grained** — the as-filed FAIL was the host defect `F-4`) | after a real accepted transition `IPC_SECURITY_GET` answered `exclusion="mcp-disabled"` — off the server's LIVE accessor, `L` `main.ts:384` |
| 12 | **`U-2 (registry)` / `U-7` / `SX-G-23`** the registration set across a real transition | **PASS** (**RE-GRAINED** from `>0` to SET EQUALITY, `F3`; **RE-INSTRUMENTED this pass** — the transition's OWN precondition is two TERMS, `F-A1`) | bridge `mcp-enabled` before the closed listing / `mcp-disabled` before the open one; `tools/list` CLOSED → `13`, OPEN → `13`, `set-equal=true`, names lost `[]`; `19` at boot before the sibling row moved the enabled-GROUP set; **TERMS all `true`** |
| 13 | **`U-4`** the return restores normal answers (the pane's own declared call) | **PASS** (`RE-GRAINED` to a bound; the note is now in the driver, `F3`) | bridge `exclusion="mcp-enabled"`; `get_markdown` → `ok=true`, `isError` absent, **receipt `null`**, markdown present; the call ISSUED while open was answered the receipt |
| 14 | **`U-2 (registry)` / `U-7` — DELETION/RED-FAIL CONTROL (NEW 2026-10-09, `F-A1`)** | **PASS** | `5` fixtures through `registrationTransitionProperty`, **ALL refused**: the DELETION fixture on `open-state-bridge` ALONE, the cleared listing and the same-size toggle on `set-equality`, the `{__cdpError}` read on `closed-state-bridge`, the failed `tools/list` on `open-listing` |
| 15 | **`U-6`** the state survives a renderer reload (main-side) | **PASS** (`RE-GRAINED` — the as-filed predicate was the STALE `isError === true`) | after `Page.reload` the live call is STILL REFUSED **and the answer IS the declared receipt**: `isError` absent, both closed tokens, the `message` naming cause and remedy |
| 16 | **`U-6` — PREDICATE CONTROL** (added 2026-10-08) | **PASS** | the re-grained predicate is `null` on the run's OWN enabled-state answers **and** on a PRE-RULING two-member receipt, a CAUSE-LESS message, and the SUPERSEDED `-32602 … disabled` carrier |
| 17 | **`U-6`** the operator's view after the reload | **PASS** (evidence CORRECTED, `F3`; **NOT re-grained** — the as-filed FAIL was the host defect `F-4`) | the pane reads `MCP: disabled` / `data-state="mcp-disabled"` / `Enable MCP` and `IPC_SECURITY_GET` answered `exclusion="mcp-disabled"` **while the server refuses** |
| 18 | *(the first pass's row 18 was its restart DELETION CONTROL — this pass's restart control is row **20**; the shift is this pass's two insertions, `§4`'s map)* | — | — |
| 19 | **`U-6`** a RESTART on **boot A's own post-transition profile** returns to `mcp-enabled` and the flag is NOT persisted | **PASS** (**RE-INSTRUMENTED, `F1`**; **`13` terms after `F-A7`**, all true) | both runs re-taken: run 1 pid `173325` vs `172991`, run 2 pid `173921` vs `173628`; `ok=true`, `receipt=null`, a real markdown; the copy's 18-entry listing EQUALS boot A's own; **no entry added by the transition**; the store bytes identical in all THREE readings (`87` chars both sides in run 1, `86` in run 2) and **no `exclusion` key in any**; `post-boot-bytes-identical` = `true`; store-space file set `["provident-security.json"]` |
| 20 | **`U-6` (restart arm) — DELETION/RED-FAIL CONTROL** | **PASS** | **`9` fixtures, ALL refused**, each naming its term: the persisted-flag profile (`no-new-entry`, `transition-window-clean`, `no-exclusion-key`, `store-file-set`), the receipt answer (`answer-normal`), the THROWN call (`answer-ok`, `answer-normal`), a third entry, a transition-written file, **a store REWRITTEN with a different key set (`post-boot-bytes-identical`, `F-A7`)**, a non-open precondition, an unsettled baseline, a re-seeded copy |
| 21 | the HTTP transport reaches its own readiness landmark | **PASS** | `GET /mcp` → `405`; landmarks `http transport ready` then `renderer ready` |
| 22 | `SX-G-38` the AUTHORIZATION arm answers FIRST | **PASS** | tokenless POST → `401` `{"code":-32001,"message":"Unauthorized"}` |
| 23 | `SX-G-42` the positive control (enabled POST) | **PASS** (**RE-GRAINED this pass**: `!== 503` → **`=== 200`**, `F-A9`) | authorized POST while enabled → `200` |
| 24 | `SX-G-40` a GET keeps its landed `405` | **PASS** (unchanged, green both of this pass's runs, **carrying NO note** — the `F-A2` correction) | `405` `{"statusCode":405…}` body carrying `-32000` |
| 25 | **`SX-G-36`** an authorized POST while OPEN answers `503` + the declared body | **PASS** | `503` `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}` |
| 26 | `SX-G-38` the ordering holds while OPEN | **PASS** (unchanged) | tokenless POST while open → `401` |
| 27 | **`SX-G-44`** one predicate, one answer shape, two DELIVERIES | **PASS** (`RE-GRAINED`: the stdio half is the RECEIPT itself, not an `isError` flag) | the same state produced the DECLARED RECEIPT as a stdio tool RESULT **and** the HTTP `503` with `-32003 'exclusion-closed'` in one run; the enabled-state POST answered `200` |
| 28 | **`SX-G-43`** the POST issued beside the return transition is answered once | **PASS** (`RE-GRAINED`: the declared falsifier's COUNT is asserted, `F4`; **RE-DISPOSITIONED this pass to a DECLARED LIMIT**, `F-A6`) | `503`, **1** body line, **`0`** `HTTP/1.x NNN` occurrences inside the body, the declared body; the counter's control reads `2` on a synthetic two-status-line body; **the tier was ALREADY closed when this POST arrived, so this measures the ARRIVAL decision — the straddle is NOT exercised** |
| 29 | **`U-4`** the return arm on HTTP | **PASS** (**RE-GROUNDED ON THE MANUAL-UI PATH**, `F-5`; **RE-GRAINED this pass** `!== 503` → `=== 200`, `F-A9`) | (i) the MCP-carried return POST → `503` + `exclusion-closed` and the POST after it → `503` (**no MCP re-arm authority**); (ii) a REAL pointer gesture on THAT boot's control (box `56x36`, `isTarget=true`) moved the segment `disabled → enabled` (bridge `exclusion="mcp-enabled"`) and the POST afterwards answered **`200`** |
| 30 | **`SX-G-48/49`** the one new channel constant, spelled once | **PASS** | `store-channels.ts` exports 3 constants, one `IPC_SECURITY_EXCLUSION = 'provident:security:exclusion'`; the literal appears under `src/**`/`scripts/**` in exactly one file |
| 31 | **`SX-G-54`** the frozen byte pins | **PASS** | `0664c52f06bd6da5…` and `5c0c1a971d7f9268…` — **re-taken IN-RUN by this pass, which had a shell** |
| 32 | **`SX-G-67/68`** no `secure.`-segment check, no `secure-refused`, no name-mapped refusal | **PASS** | hits `[]` over the six declared `src/**` files |
| 33 | **`SX-G-53`** the store union carries no exclusion token | **PASS** | `store-core-graph.ts` contains `'exclusion-closed'`: `false`; the refusal-shaped tokens found are the union's own |
| 34 | **`SX-G-55`** the diff scope touches no frozen artifact | **PASS** | the landing chain's paths (18 in both runs) — forbidden hits `[]`, `src/shared/**` untouched |

**THE ARITHMETIC, PRINTED WITH ITS TERMS:** `34` recorded rows = **`34 PASS` + `0 FAIL` + `0 MANUAL` + `0 PARKED`**,
`34 + 0 + 0 + 0 = 34` ✓, **twice** (two executions, exit `0` both) — over the matrix's **`7` U-ROWS** (+ `1` non-U note
BESIDE it), which is why the battery's row count and the report's `summary.total` are DIFFERENT numbers and both are
printed: **the battery records rows, the report records U-rows, and `summary.total` equals the matrix's U-ROW count
(`7`), not the battery's (`34`) and not the matrix's row count (`8`).**

---

## 6. PARKED / MANUAL / NOT-OBSERVABLE — **`0` of each among the `7` U-rows, and the two places the forms ARE owed are recorded in the `§6.1` clause-5 form**

- **PARKED: NONE.** `RCA-11` forbids parking a unit whose surface is exercisable, and this surface **is**: three live
  Electron processes were booted on the operator's display (`DISPLAY=:0`) — the stdio boot, the HTTP boot and the
  restart probe (the last on a `cpSync` copy of boot A's own post-transition profile) — a real CDP pointer gesture was
  delivered to the painted control **on two of them**, both transports were driven, and the reload/restart/return arms
  were exercised. **No row was parked and no structural reason was needed.** **THE 2026-10-09 PARK AUDIT, POSITIVE: no
  row was parked this pass either, and none could have been** — including the restart arm, which the audit's `F1` found
  mis-instrumented and which is now exercised ON THE RIGHT PROFILE rather than parked.
- **MANUAL: NONE** among the `7` U-rows. `docs/specs/secure-exclusion.md` `§2.4` item 7(2-note) **predicted** that the
  gesture rows would have to carry `MANUAL` because the pane is an isolated graph and `R4` forbids the two `webContents`
  reach-ins. **The run falsifies that prediction in the unit's favour, and it is recorded because the prediction is in
  the contract**: the CDP route (`--remote-debugging-port=0` + the DevTools endpoint + a raw WebSocket +
  `Input.dispatchMouseEvent`) is **outside the `R4` set**, needs no `webContents` call, and **did** deliver a real
  press+release to the rendered control and did drive landed sibling controls. **The `MANUAL` instrument was therefore
  not required for the measurement — and using it would have hidden `F-2`**, since the instrument IS able to take the
  reading and the reading it takes is a failure. **THE RE-RUN STRENGTHENS THE SAME REFUSAL: the return arm's own `[U]`
  half was taken by the SAME CDP gesture on the HTTP boot's pane** (`§5` row 29), so no row needed `MANUAL` for it either.
  > **⟶ THE AUTHORITY FOR THAT SUBSTITUTION IS A GAP, NOT THIS PASS'S ANNOTATION (the `§6.2` audit's `F8`).** The
  > citation that admits `[CDP]` at all is `docs/decisions.md`'s **`REAL-DOM-UI-GATE-LEG`** row (**architect ruling
  > `A-d8`**), which names `webContents.executeJavaScript`, *then CDP*, as **leg-only** channels that may never become
  > MCP tools — **but it rules about the `ui` LEG, not about this battery**, while `§2.4` item 7(2-note) declares
  > `MANUAL` for the gesture rows. **GAP-1 — FOR THE SPEC OWNER:** does `[CDP]` supersede the declared `MANUAL` for the
  > gate-6 gesture rows? This record states the measurement that forces the question and does **not** self-ratify the
  > substitution.
  > **⟶ PREMISE CORRECTED 2026-10-09 (the second `§6.2` audit; `RCA-8(d)` — the words above are the as-filed premise and
  > stand byte-intact).** The as-filed premise implies the contract and the measurement **do not agree**; **the cell it
  > cites has in fact ALREADY BEEN AMENDED IN THE UNIT'S FAVOUR.** That cell is
  > **`docs/specs/secure-exclusion.md:1061-1091`** (`§2.4` item 7(**2-note**)), whose tail carries a **2026-10-08
  > `SPENT`** annotation: *"**⟶ SPENT — THE REVISIT CONDITION IS MET, 2026-10-08: GATE 6 HAS RUN** … the gate-4
  > prediction that the gesture rows must be `MANUAL` was **FALSIFIED IN THE UNIT'S FAVOUR by the CDP route the gate-6
  > pass used**"*. **SO `GAP-1` IS A QUESTION ABOUT SCOPE, NOT A LIVE CONTRADICTION.** **THE QUESTION THE ARCHITECT IS
  > ACTUALLY RULING ON:** *does that 2026-10-08 `SPENT` cell SETTLE `[CDP]` as an admissible gate-6 instrument for this
  > unit's gesture rows — or did the cell OVER-REACH, recording a falsification of a prediction whose instrument
  > authority is a `ui`-LEG ruling (`A-d8`) that does not name this battery?* **`GAP-1` STAYS OPEN; nothing here is
  > self-ratified.**
- **`NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT`: NONE among the `7` U-rows.** **THE FORM IS STILL USED WHERE IT IS
  OWED, in the `§6.1` clause-5 declared-limit shape and BESIDE the rows (`§2`'s second note; the report's
  `nonRowNotes`):** the **in-flight / straddle arm** of `docs/specs/secure-exclusion.md` `§2.3` item 3 — a call issued
  while the tier is closed whose dispatched renderer work lands across a transition — is **not deterministically
  exercisable** by any shipped instrument in this run (the window is a renderer round trip wide). **Its STRUCTURAL
  reason is stated with its clauses, the ARRIVAL half the battery CAN take is measured with its falsifier asserted
  (`§5` row 28), and the reason it is a non-row note rather than an eighth U-row is cited rather than assumed** — with
  **GAP-2 filed for the spec owner** (if it is ruled a matrix subject, the count becomes `8` and `summary.total` follows).
  **The audit's `F15` is closed this way: the form is used, and the limit is named in the record instead of being left
  silent.**


---

## 7. THE DRIVER — path, and why that location is admissible under the two hard constraints

**`tests/secure-exclusion-live.mjs`** (run as `node tests/secure-exclusion-live.mjs`; **`32` recorded rows** at this
run; **exit `0` twice**). It is a **`tests/**`-owned harness**:

1. **`scripts/*.mjs` was NOT used, and THE AS-FILED REASON FOR THAT WAS WRONG — CORRECTED 2026-10-09 (the `§6.2`
   audit's `F7`).** The as-filed text claimed *"a NEW file there reddens a frozen row"* by way of
   `tests/ui-leg-contract.test.ts`'s helper-candidate rule. **IT DOES NOT:**
   `HELPER_NAME = HELPERS.find((f) => importsHelper(DIVERGENCE_SRC, f)) ?? HELPERS[0]`
   (`tests/ui-leg-contract.test.ts:110`) prefers the candidate **the divergence leg imports** —
   `scripts/electron-spawn.mjs` — so a NEW, UNIMPORTED `scripts/*.mjs` is never selected by that row.
   **THE PINNED HAZARD ON THAT ROUTE IS THE OTHER HALF OF THE SAME CONTRACT FILE: its `L-1` row pins the
   `package.json` `scripts` KEY SET** (`LANDED_SCRIPT_KEYS`: the landed keys plus exactly `ui`, asserted in both
   directions), so a new **key** — not a new file — reddens it, and a config change cannot satisfy it (`AGENTS.md`
   item 4's hazard note). **THIS DRIVER ADDS NO KEY** (its literal command line is the `§6.1` `cmd`
   `node tests/secure-exclusion-live.mjs`), so the `scripts/` route was **permissible** and is not taken for the
   reason actually stated in the driver's own header: this harness belongs with the batteries it re-runs.
   **The `npm test` figure is CARRIED, not claimed by this pass** (`§8` item 17).
2. **`scripts/electron-ui.mjs` was NOT extended and its `R4` row was NOT weakened.** That row scans the
   leg's own code (comments stripped) for the call-site SET
   `app.isPackaged` · `webContents.executeJavaScript` · `webContents.debugger`. **This driver contains
   none of them and adds nothing under `scripts/`.** The route it uses instead is **Chrome DevTools
   Protocol over the app's own `--remote-debugging-port=0` listener** — a channel the `R4` set does not
   name and no shipped file uses. **The re-run attaches that channel to BOTH boots** (the stdio boot and
   the HTTP boot), which is what makes the operator's return measurable ON the HTTP transport — **and the
   authority for that channel is `docs/decisions.md`'s architect ruling `A-d8` (`REAL-DOM-UI-GATE-LEG`), cited
   at `§6` `GAP-1` where it is also recorded that the ruling does not reach this battery (the audit's `F8`).**

**⟶ THE RE-RUN'S CHANGES TO THE DRIVER, EACH WITH WHAT IT ASSERTS (2026-10-08; the as-filed driver's rows are
otherwise untouched):**

1. **`declaredReceipt(answer)` — THE RE-GRAINED PREDICATE.** The as-filed `U-6 (reload arm, main-side state)`
   asserted `isError === true`, which is **satisfiable only under the SUPERSEDED registry-toggling carrier**:
   with the toggling deleted (the architect's ruling) a disabled handle no longer exists to make the landed
   SDK throw, and the invocation turn answers the receipt **as a VALUE** (`§2.2` item 2(a); `§2.5` item 1;
   `P-EX-TP-1`), so `isError` is **ABSENT** — which is exactly what the unit's own `G6-F3` row and its
   register cell `G6-F3#1` assert. **THE ROW NOW ASSERTS: `ok === true` · `isError` NOT `true` · the parsed
   answer is an object whose `status === 'refused'` and `reason === 'exclusion-closed'` · a non-empty
   `message` naming the CAUSE (the security store is open) AND the REMEDY (retry/try again/wait, for the
   operator) — its DOMAIN, never a literal spelling** (`§2.5` item 1's `DECLARED-DEFAULT`). **It reddens on a
   protocol error, on the renderer's own value, on a two-member receipt and on a cause-less message** — the
   control row (`§5` row 14) drives all four.
2. **`U-6 (reload arm) — PREDICATE CONTROL` — THE ROW THE 2026-10-08 PASS ADDED** (today's `§5` row **15**; the
   *"row 14"* below is the 2026-10-08 numbering, see `§4`'s map). It runs the SAME predicate over the
   run's own ENABLED-state answers (the renderer's value — the inert-turn regression's shape) and over three
   in-line outside shapes. **A re-grained predicate that cannot fail is not evidence, so the control is a
   row and its verdict is reported like any other.**
3. **`listToolNames` + `sameSet` — THE SET-EQUALITY READING.** `U-2 (registry, live)` asserted `tools/list
   length > 0`, which cannot tell an UNCHANGED set from a different one of the same size; the operative pin
   (`§0A` item 7(c): *"the registered tool/resource set is IDENTICAL in both states — nothing is cleared and
   NOTHING IS TOGGLED"*) is SET EQUALITY. **The reading is taken with the enabled-GROUP set HELD CONSTANT**,
   because the sibling-control row legitimately moves that set through a DIFFERENT mechanism
   (`applyGatePatch`'s group change, which the ruling leaves untouched) — so a listing read across both would
   attribute the group's shrink to the exclusion.
4. **`U-4 (return arm, HTTP)` — RE-GROUNDED.** The as-filed row required a POST to carry the transition back;
   the contract provides **no** MCP/HTTP re-enable route (`§2.4` item 6; `§2.2` item 2(a); `§2.3` item 2;
   `§2.4` item 1 — the full citation is at `§4`'s `F-5` disposition). **The row now asserts BOTH: the MCP
   route does NOT re-arm (measured: `503`, and the POST after it still `503`), and the OPERATOR's own act
   DOES restore the HTTP answers (measured: a real CDP gesture on THAT boot's pane → `200`).**
5. **IN-FLIGHT PROBE CORRECTED.** The as-filed probe called `provident.load` while open and read the answer
   as "a call in flight across the transition". **`provident.load` belongs to group `graph`** (`L`
   `src/main/security.ts:17`), which the sibling-control row had just DISABLED, so that `-32602 … disabled`
   was the GROUP predicate's — a different mechanism, and not the exclusion's in-flight arm. The probe is now
   `provident.get_markdown` (group `read`, enabled), its answer is asserted as the RECEIPT, and the row states
   honestly that the genuine in-flight arm is not deterministically exercisable from this driver.

**⟶ THIS PASS'S CHANGES TO THE DRIVER (2026-10-09), EACH WITH THE FINDING IT CLOSES — every one of them
INSTRUMENT-side; `src/**` is untouched (`§8` item 14):**

6. **THE RESTART ARM, RE-INSTRUMENTED (`F1`, the blocking HIGH).** `restartArmProperty(fixture)` is now a **named
   function of `12` terms**, and the restart boots on a **`cpSync` copy of boot A's OWN post-transition profile**
   (the copy target is `join(restartHome, 'profile')` and is NOT pre-created, so `cpSync` produces the copy rather
   than a merge into a directory this pass wrote). **The precondition is measured on the live boot** (bridge
   `mcp-disabled` AND a live stdio call answering the receipt at copy time), the profile file **LIST** and the store
   file's **BYTES** are terms, the **copy's fidelity** (listing-equal + byte-equal) is a term, and the **store-space
   file set** must be exactly the one declared file. **The deletion/regression CONTROL drives `8` fixtures through
   the SAME function and all `8` are refused**, including a store that DOES carry `"exclusion":"mcp-disabled"` with a
   third `provident-exclusion.json` beside it. **The `N-5` listing term's baseline is AGE-QUALIFIED** (`≥ 30 s` of
   process age AND `3` consecutive identical 1-second readings) because Chromium writes its own bookkeeping
   (`Network Persistent State`, `Preferences`) into `userData` at ~`8`–`14 s` — measured twice, and recorded in the
   row with the runtime's own added names printed.
7. **THE STRADDLE PREDICATE (`F4`).** `countStatusLines(text)` is now a named function, the declared falsifier is a
   **predicate term** (`≤ 1` status line), and the counter carries **its own control** in the row (a synthetic
   two-status-line body must count `2`).
8. **THE STALE-WINDOW PREFLIGHT, IN THE DRIVER (`F10`).** `appProcesses()` (`ps -eo pid=,args=`, so no `procps`
   dependency and no self-match) runs before the first boot, is recorded as a ROW, and **stops the run with `exit 1`
   and no summary** if it finds anything.
9. **THE EXIT CODE (`F5`).** `process.exit(TALLY.FAIL ? 1 : 0)`.
10. **THE CLOSED VERDICT SET (`F6`).** The boot-order row answers `FAIL`; the helper's docstring lists
    `PASS`/`FAIL`/`MANUAL`/`PARKED` and nothing else.
11. **`U-1`'s `present` GUARD (`F14`)** and **`clickLanded` INSIDE row 7 (`F9`)**, with the dead `toolsBefore`
    binding removed.
12. **THE FOUR STALE/CONTRADICTORY COMMENT BLOCKS AND THE TWO STALE EVIDENCE SENTENCES (`F3`, `F12`)** — each
    corrected beside its as-filed text, with a dangling `preloadTransition` reference repointed at
    `transitionOverHttp`.

**⟶ THE SECOND REPAIR PASS'S CHANGES TO THE DRIVER (2026-10-09), EACH WITH THE FINDING IT CLOSES — every one of them
INSTRUMENT-side; `src/**` is untouched (`§4b` `F-A18` is `HANDED BACK` exactly so that no `src/**` byte moves):**

13. **THE REGISTRY ROW RE-INSTRUMENTED AND ITS DELETION CONTROL ADDED (`F-A1`, the blocking HIGH).**
    `registrationTransitionProperty(f)` is now a **named function of `5` terms** — the two bridge readings read ON BOTH
    SIDES of the transition (`closed-state-bridge`, `open-state-bridge`), the two listing-type terms, and
    **`set-equality`, the as-filed expression UNCHANGED** — and the row BESIDE it (`§5` row 14) drives **`5`
    DELETION/REGRESSION fixtures through that SAME function**, **all refused**, the first being **the deletion case
    itself** (both listings exactly as the live run reads them, only the bridge's readings moved back to `mcp-enabled`),
    refused on **`open-state-bridge` alone**.
14. **THE RESTART ARM'S THIRD READING MADE A BYTE TERM (`F-A7`)**, with a **9th control fixture** that rewrites the
    store's KEY SET — so `post-boot-bytes-identical` is a reading and the record's *"identical in all THREE readings"*
    claim is true by construction.
15. **THE BOOT-ORDER PREDICATE CORRECTED AND ITS SUBJECT NARROWED (`F-A8`)** — the renderer landmark is now asserted
    SECOND (the printed order IS `[stdio transport ready, renderer ready]`), and the subject names the two landmarks the
    run CAPTURES.
16. **THE TWO `!== 503` SITES TIGHTENED TO `=== 200` (`F-A9`)** — `SX-G-42` (`§5` row 23) and the HTTP return arm
    (`§5` row 29) — each keeping its negative half.
17. **THE AFFORDANCE WORD AND THE `#app` ABSENCE MADE TERMS (`F-A11`)** — `buttonText === 'Disable MCP'` in `U-1`
    (`§5` row 4) and the `#app` flag + `innerHTML` in `U-5` (`§5` row 6).
18. **THE TIGHT-WINDOW CONTROL FIXTURE RE-SEEDED ON A GUARANTEED NAME (`F-A14`)** — `PROFILE_STORE_FILE` instead of
    Chromium's lazily-written `Preferences`, so the fixture cannot produce a false red on a host that lacks it.
19. **THE PREFLIGHT'S OWN ID (`F-A15`)** — `SX-G-45p`, so the FAIL list cannot be ambiguous.
20. **THE STATUS LINE'S OWN TEXT PRINTED BY A ROW (`F-A16`)** — the NEW `SX-G-03` row (`§5` row 5) prints
    `#security-status`'s full `textContent`, which the record had cited without any command producing it.
21. **THE TWO FALSE STRADDLE SENTENCES CORRECTED AND THE ROW RE-DISPOSITIONED (`F-A6`)** — the block header, the row's
    subject and its evidence now say what the code does (the tier is ALREADY closed at the POST; the counter reads a
    BODY substring of one `fetch` Response; the control is a synthetic string), as a `DECLARED-LIMIT` tied to `GAP-2`.

**The two measured host constraints the driver had to work around, recorded so a later run does not
re-discover them:**

- **The DevTools port cannot be read from `DevToolsActivePort` on this host.** Chromium writes it to the
  DEFAULT `userData` directory (before `main()` calls `app.setPath`), and that write is refused
  (`Error writing DevTools active port to file /home/ryanr/.config/Electron/DevToolsActivePort:
  Permission denied (13)` — the boot itself succeeds). The driver therefore reads the port from the
  child's **own stderr** line (`DevTools listening on ws://127.0.0.1:<port>/…`) — **on both boots** (the
  HTTP boot now carries `--remote-debugging-port=0` for exactly that reason).
- **`--mcp-transport=http` cannot be selected through the shipped spawn helper.** `spawnElectron`
  appends the caller's args AFTER the landed base vector, which pins `--mcp-transport=stdio`, and
  `transportFromArgs` resolves the FIRST match — **MEASURED**: a boot asked for `http` announced
  `[provident-mcp] stdio transport ready`. The base vector is byte-pinned and this pass may not edit the
  helper, so the HTTP boot is spawned **directly** with the same pinned members (the helper's own
  `electronBin`, the same eight flags, the same env pair, a fresh scratch profile) and the flags placed
  before the app path.

**Every other instrument is shipped and literal:** the MCP client is the repo's own
`@modelcontextprotocol/sdk` client over the repo's own `scripts/electron-spawn.mjs`
`ChildProcessTransport` (one process per boot — no second spawn), and the HTTP arms are literal `fetch`
POSTs/GETs at the app's own endpoint.

---

## 8. WHAT THIS PASS DID NOT DO

**⟶ THE RE-RUN'S OWN SECTION (`2026-10-08`). Items 1–7 below are the AS-FILED pass's and stand byte-intact as
its dated record; the re-run's own limits are items 8–13; THIS pass's limits are items 14–20 (`§4`'s row-number map
applies to any `§5` row citation inside items 1–13).**

1. **It wrote exactly ONE file in the repo: `tests/secure-exclusion-live.mjs`** — no `src/**`, no test
   file of the unit, no spec, no tracker, no `package.json`, no config. Its reconnaissance probes and its
   logs live **outside the repo** (`/tmp/se-r1/**`) and were never committed. The one other file at its
   name is **this record**, written after the run.
2. **It edited no existing file.** `git status --porcelain` was empty at the pass's start (`?? tests/secure-exclusion-live.mjs`
   after the driver was written; committed at `4f1af13`).
3. **It did not weaken any landed row or pin.** `R4` is untouched; the UI-leg contract is green; the
   unit's own suite is green; the byte pins reproduce.
4. **It did not convert any contradiction into a pass, and it used neither `MANUAL` nor
   `NOT-OBSERVABLE` to soften one.** The six failures stand in `§4` with their clauses, their expected
   values and their observed values.
5. **It did not self-bless the report.** The `§6.2` read-only audit is owed to a party that did not author
   this matrix.
6. **It re-ran the repo's legs after the driver landed:** `npm test` → **`86 files / 2724 passed | 2 skipped (2726)`, exit `0`**;
   `npm run typecheck` → exit `0`; `npm run typecheck:tests` → exit `0`; `npm run build` → exit `0`.
   *(The first `npm test` of this pass — taken while the driver was UNTRACKED — was `1 failed`, and the
   failure was `tests/gutter.test.ts` `R-12 §3.4` accounting this driver as an undeclared denied path in
   its RAW dirty reading. **Committing the driver closed it**, and the re-run is the green figure above.
   Recorded because it is a measured interaction between a new `tests/**` artifact and the landed
   sibling registry, and a later pass that adds another `tests/**` file will meet it too.)*
7. **It ran NO live battery for any other unit** and makes no claim outside `U-SECURE-EXCLUSION`.

**⟶ THE RE-RUN.**
8. **IT EDITED EXACTLY TWO FILES, BOTH ITS OWN: `tests/secure-exclusion-live.mjs` and this record.** **No
   `src/**`, no spec, no unit test file, no tracker, no `package.json`, no config was touched** — the
   contract amendment and the two host fixes are the implementer's and the architect's, and this pass READS
   them rather than changing them. **No file was added under `scripts/`** (the `R4`/`helperCandidates`
   constraint above is unchanged), and no new file was added anywhere except the control ROW inside the
   driver.
9. **IT DID NOT WEAKEN A ROW TO MAKE IT PASS.** **CORRECTED 2026-10-09 (the `§6.2` audit's `F3`): the as-filed
   version of this item claimed that "both re-grains are stated with their as-filed forms in the driver's own
   `evidence` strings", and read as covering rows 7, 9, 15 and 22 — WHICH WAS FALSE OF THE DRIVER: only rows 10, 13,
   23 and 25 carried such a note.** The corrected claim, row by row, is `§5`'s own header table. **THE SUBSTANCE
   STANDS, now that it is checked rather than asserted**: the re-grained predicates each name their as-filed form
   (`isError === true` → **the receipt's full shape with `isError` absent**; `tools/list length > 0` → **set equality**;
   `text CONTAINS the token` → **the receipt itself**; the HTTP return row → **two assertions where the as-filed row
   had one, one of which measures the contract's own negative**), rows 11 and 12 now carry the notes they were
   missing, and **rows 7, 9 and 15 are annotated as NOT re-grained (host defects `F-2`/`F-4`, fixed at `afd3212`)
   with row 22 removed from the claim altogether.** **AND THE CONTROL WAS ADDED, NOT ASSUMED**: `§5` row 15 runs the
   re-grained receipt predicate over the run's own enabled-state values and three outside shapes, and **`§5` row 18
   now drives `8` DELETION/REGRESSION FIXTURES through the restart arm's own predicate** (`F1`).
10. **THE TWO REMAINING FAILURES ARE ASSESSED, NOT DISMISSED, AND THE ASSESSMENT IS WRITTEN WHERE IT CAN BE
    CHECKED.** `U-6 (reload arm, main-side state)` = **`STALE PREDICATE`** (the amended clauses `§2.1` item 3,
   `§2.2` item 2(a), `§2.5` item 1 and the unit's own `G6-F3` row / register cell `G6-F3#1` are quoted in the
   driver's own evidence string and at these sections). `U-4 (return arm, HTTP)` = **`WRONG INSTRUMENT`** —
   **with the `§` stated for the negative as well as the positive**: the contract provides NO MCP/HTTP
   re-enable route (`§2.4` item 6 · `§2.2` item 2(a) · `§2.3` item 2 · `§2.4` item 1), so the row was testing
   a route that does not exist and is re-grounded on the manual-UI path the contract DOES declare. **IF a
   later pass finds an HTTP return arm in the contract, this disposition is wrong and the row reddens again
   — the negative half of the re-grounded row is what would catch it.**
11. **`§6.2`'S READ-ONLY AUDIT: TAKEN, AND *(THAT)* PASS WAS ITS REMEDY — WHICH MEANS THE AUDIT IS OWED AGAIN OVER THE
    REGENERATED ARTIFACTS — AND THIS PASS HAS NOW MOVED THE SUBJECT A THIRD TIME (`§8` item 25).** The 2026-10-08 pass neither ran it nor could; **a non-author audit RAN over
    `§2`/`§3` and returned `VALID-WITH-FINDINGS`** (`F1` HIGH blocking, `F2`–`F15` owed). **THE FIRST 2026-10-09 PASS FIXED THOSE
    FINDINGS AND REGENERATED BOTH ARTIFACTS; A SECOND NON-AUTHOR AUDIT THEN RAN OVER THE REGENERATED SET AND RETURNED
    `VALID-WITH-FINDINGS` AGAIN (`F-A1` HIGH blocking, `F-A2`–`F-A18` owed); THIS PASS FIXED THOSE AND RE-RAN — so the
    subject has moved a THIRD time and the matrix/report are again UNAUDITED, and this author may not bless them**
    (`AGENTS.md` item 10a / RCA-4's independence rule; the routing note stands: a non-author, read-only, over `§2` and
    `§3` of THIS file — and now also over `§4b`'s dispositions, since a disposition may not certify itself). **WHAT THE NEXT
    AUDIT MUST RECONCILE, UPDATED FOR THE FIXES IT WILL FIND:** the `summary.total === 7` equality against the
    matrix's **U-ROW** count row by row; the `nonRowNotes` block (that neither note is counted, and that the
    in-flight note carries its structural reason **and the three `F-A6` corrections**); **the registry row's `5` terms and
    the `5`-fixture deletion control (`F-A1`: can the predicate still not fail when the transition is deleted?)**; **the
    restart arm's `13` terms and the `9`-fixture deletion control**; **the `post-boot-bytes-identical` term against a
    store rewritten with a different key set**; the per-row **`verdictClass`** and the summary's **`manual: 0`**; the
    `emitter`'s honest `MANUAL` form (`F-A5`); the `changed: 5 / unchanged: 2` split against `rows[]`; the `exit`
    readings on BOTH executions; every `verdict`/`verdictClass` against its observation and named instrument;
    `predicateSourcePresent: true`; the absence of projection; **whether `F-A18`'s `HANDED BACK` is the right branch of
    its own conditional**; and the layer labels — **with the standing warning that a `[T]`/node-suite green is NOT
    assembled-app evidence and that this record's `[U]` claims rest on the CDP + MCP readings quoted in `§5`**.
12. **IT DID NOT RE-RUN THE UNIT'S OWN TEST FILES, AND ITS LEG FIGURES ARE THE ONES `commands[]` CARRIES**
    (`npm test` **post-commit** → `86 files / 2729 passed | 2 skipped (2731) / 0 failed`, exit `0`;
    `npm run typecheck` and `npm run typecheck:tests` and `npm run build` all exit `0`, re-run after the
    commit). **The one interaction to know about, MEASURED this pass and the same one the as-filed pass met**:
    `tests/gutter.test.ts` `R-12 §3.4` reads the WORKING TREE's raw dirty paths, so **while this driver was
    edited-but-uncommitted that row reported `liveUnaccounted: ["tests/secure-exclusion-live.mjs"]` and
    `npm test` read `1 failed | 85 passed (86)`**; **committing the two files closed it** and the figure above
    is the post-commit reading. **A later pass that edits a `tests/**` artifact will meet it again — and the
    fix is the commit, not a row change.**
13. **IT RAN NO LIVE BATTERY FOR ANY OTHER UNIT** and makes no claim outside `U-SECURE-EXCLUSION`. **It also
    did not convert the tracker's `F-1`…`F-6` dispositions** — those live in `docs/next-steps.md`'s gate-6 row
    and `docs/specs/secure-exclusion.md` `§3b`'s gate-6 clause, which this pass may not edit; **this file
    records only what the assembled app answered, and the reconciliation of those tracker cells to these
    readings is owed there.**

**⟶ THE 2026-10-09 PASS'S OWN LIMITS. The files this pass may edit are TWO (`tests/secure-exclusion-live.mjs` and
this record — the delegation's own scope), so items 14–20 are limits of INSTRUMENT and of MANDATE, not omissions.**

14. **IT EDITED EXACTLY TWO FILES, BOTH ITS OWN, AND TOUCHED NOTHING ELSE.** No `src/**`, no `docs/specs/*.md`
    other than this record, no `tests/**` other than the driver, no tracker, no `package.json`, no config, no
    register. **Every finding was therefore closed INSTRUMENT-side (the driver) or RECORD-side (this file); a finding
    whose fix would require a `src/**`, spec or tracker edit is recorded as a GAP with its owner named, not fixed.**
15. **`GAP-1` — THE `[CDP]`-IN-PLACE-OF-`MANUAL` SUBSTITUTION IS NOT SELF-RATIFIED.** A citation exists and is carried
    (`docs/decisions.md`'s `REAL-DOM-UI-GATE-LEG` row, architect ruling `A-d8`: CDP is a legitimate **leg-only**
    channel), but **it rules about the `ui` leg, not about this battery**, while `§2.4` item 7(2-note) declares
    `MANUAL` for the gesture rows. **⟶ PREMISE CORRECTED 2026-10-09 (the second `§6.2` audit): the as-filed sentence
    above ends *"the measurement stands and the declaration does not agree with it"* — and THAT PREMISE IS STALE.** The
    cell is **`docs/specs/secure-exclusion.md:1061-1091`**, and it **already carries a 2026-10-08 `SPENT` annotation**
    recording the falsification in the unit's favour by the CDP route (*"the gate-4 prediction that the gesture rows
    must be `MANUAL` was FALSIFIED IN THE UNIT'S FAVOUR by the CDP route the gate-6 pass used"*). **DECISION NEEDED
    FROM THE SPEC OWNER, RE-STATED: does that 2026-10-08 `SPENT` cell SETTLE `[CDP]` for gate 6, or did it OVER-REACH
    (a `ui`-leg ruling does not name this battery)?** Either way the ruling is the owner's and **`GAP-1` STAYS OPEN**
    (`§4a` `F8`'s block carries the full re-statement).
16. **`GAP-2` — WHETHER `§2.3` ITEM 3's STRADDLE IS A MATRIX SUBJECT IS THE SPEC OWNER'S CALL — AND IT IS THE ONLY
    RULING THAT COULD MOVE `summary.total`.** The arm is recorded in `§6.1` clause 5's declared-limit form beside the
    rows (`§2`), with its structural reason; **if the owner rules it a matrix subject, the count becomes `8`, `rows[]`
    gains a row and `summary.total` follows.** This record does not re-derive the subject list the spec declares
    (`docs/specs/user-flow-audit.md` `§5` item 1 forbids it). **⟶ THIS PASS FIXED `F-A6` AND RE-DISPOSITIONED `F4` AS A
    DECLARED LIMIT RATHER THAN A FIX (`§4b` `F-A6`):** the row that stands (`§5` row 28) measures the ARRIVAL decision
    of `§2.3` item 2 — the tier is ALREADY closed when its POST is issued — so neither the as-filed driver comment
    ("while the tier is admitted ... in flight") nor this record's own "while the tier was in transition" describes
    the code. **`GAP-2` STAYS OPEN AND IS NOT SELF-RATIFIED HERE.**
17. **IT RE-RAN THE REPO'S OWN LEGS — AFTER THE GATE COMMIT, WHICH IS THE ONLY ORDER THAT CAN BE GREEN.** This pass ran
    **`npm run build`** (exit `0`, immediately before the two documented battery executions) and the battery twice
    (exit `0` twice), and then, **post-commit at its own HEAD**, the rest of the trio plus the additive fourth leg:
    **`npm test` → `86 files / 2729 passed | 2 skipped (2731) / 0 failed`, exit `0`; `npm run typecheck` → exit `0`;
    `npm run typecheck:tests` → exit `0`** — **the SAME figures the 2026-10-08 pass measured, now re-measured at this
    pass's own commit rather than carried** (`§3`'s `commands[]` says so in each cell). **The known interaction — MEASURED
    twice in this unit's history and deliberately NOT re-measured here:** `tests/gutter.test.ts` `R-12 §3.4` reads the
    WORKING TREE's raw dirty paths, so **while this driver is edited-but-uncommitted that row reports
    `liveUnaccounted: ["tests/secure-exclusion-live.mjs"]` and `npm test` reads `1 failed | 85 passed (86)`**; the fix is
    the gate COMMIT, not a row change — and the figures above were taken **after** this pass's commit.
18. **IT DID NOT DISPOSE OF FINDING `F16`** (`U-2`'s registry half and `U-7` do not bite against total deletion). It is
    not among this pass's mandated findings, and re-graining those rows unmandated would have been a change to a
    PASSing predicate's subject. **HANDED BACK, MEASURED AND NAMED, with the fix shape this pass built for the restart
    arm (`§4a` `F16`) — an OPEN item, not a pass.**
19. **IT DID NOT ATTEMPT THE IN-FLIGHT PROBE AGAIN**, and no row claims it. The reason is structural and stated twice
    (`§2`, `§6`). **A later pass that can place a transition inside a renderer round trip would add the row; the
    arrival arm's own note is what keeps the limit honest.**
20. **IT RAN NO LIVE BATTERY FOR ANY OTHER UNIT AND MAKES NO CLAIM OUTSIDE `U-SECURE-EXCLUSION`.** The unit's own suite,
    the `ui` leg, the divergence leg and every other unit's battery are untouched and unclaimed here.

**⟶ THE SECOND REPAIR PASS'S OWN LIMITS (2026-10-09, items 21–27). The files this pass may edit are FOUR
(`tests/secure-exclusion-live.mjs`, this record, the ONE `F-A17` annotation in `docs/specs/secure-exclusion.md`, and the
tracker filings named in `§4b` `F-A18`), so the items below are limits of INSTRUMENT and of MANDATE, not omissions.**

21. **IT EDITED THE FOUR FILES ITS MANDATE NAMES AND NOTHING ELSE.** No `src/**` byte (`F-A18`'s comment is `HANDED BACK`
    precisely so that no `src/**` edit is made), no `package.json` (no new `scripts` KEY — the `L-1` row's pinned set is
    untouched), no sibling pass's artifacts (`tests/store-compliance-live.mjs` and
    `docs/specs/store-compliance-live-battery.md` are NOT touched: they are the `992ea27` pass's, and `§5` row 34's
    diff-scope reading prints the landing chain that contains them without modifying them), no other unit's battery.
22. **IT DID NOT WEAKEN ANY ROW, ANY LANDED CONTRACT CLAUSE, OR ANY SIBLING PASS'S ARTIFACT TO MAKE SOMETHING PASS.**
    The four re-grains this pass made each moved a term from a WEAKER form to a STRONGER one (`!== 503` → `=== 200` at
    two sites; `buttonText`/`#app` from printed-only to terms; the boot-order renderer landmark now asserted), the
    registry row kept its as-filed set-equality expression character for character, and the restart arm's predicate
    gained a term (`post-boot-bytes-identical`) rather than losing one. **A row that FAILED would have been recorded as
    a finding; none did (`34 PASS / 0 FAIL`, both runs).**
23. **`GAP-1` — STILL OPEN, PREMISE CORRECTED, NOT SELF-RATIFIED.** The audit's own note is applied: the cited cell
    `docs/specs/secure-exclusion.md:1061-1091` **already carries the 2026-10-08 `SPENT` annotation**, so the question
    put to the architect is *"does that cell settle `[CDP]` for gate 6, or did it over-reach?"* — the full re-statement
    is at `§4a` `F8`'s block and `§6`. **The `manual: 0` field added by `F-A12` makes the claim REPRESENTABLE; it does
    not make the ruling.**
24. **`GAP-2` — STILL OPEN, NOT ANTICIPATED.** The matrix stays at **`7` U-rows and `summary.total === 7`**; if the
    architect rules `§2.3` item 3's in-flight arm a matrix subject, the count moves `7 → 8`, `rows[]` gains a row and
    `summary.total` follows. **This pass did NOT pre-empt that by adding a row — the `F-A6` disposition is a
    `DECLARED-LIMIT` with the owner named instead.**
25. **THE `§6.2` AUDIT IS OWED AGAIN TO A NON-AUTHOR, AND THIS AUTHOR MAY NOT RUN IT OR CLAIM IT.** The second audit
    returned `VALID-WITH-FINDINGS`; **this pass fixed the findings and moved the subject (the `34`-row re-run, the
    registry row's new terms and control, the restart arm's new term and fixture, the regenerated matrix/report) — so
    the matrix, the report AND `§4b`'s dispositions are again UNAUDITED.** The reconciliation list is at `§8` item 11.
26. **ITS FOUR LEGS WERE MEASURED, WITH THE PRE-COMMIT READING STATED BESIDE THE POST-COMMIT ONE.** The
    `tests/gutter.test.ts` `R-12 §3.4` interaction is the SAME one this unit has met three times: **while this driver is
    edited-but-uncommitted, that row reports `liveUnaccounted: ["tests/secure-exclusion-live.mjs"]` and the suite reads
    `1 failed`** — so the PRE-COMMIT `npm test` of this pass read **`1 failed | 85 passed (86)` files and
    **`1 failed | 2728 passed | 2 skipped (2731)`** tests (MEASURED: `Test Files 1 failed | 85 passed (86)` /
    `Tests 1 failed | 2728 passed | 2 skipped (2731)`, the failure being `tests/gutter.test.ts`'s `R-12 §3.4` raw dirty
    reading), and the **POST-COMMIT** reading at this pass's own HEAD is the one `commands[]` carries
    (**`86 files / 2729 passed | 2 skipped (2731) / 0 failed`**). `npm run typecheck`, `npm run typecheck:tests` and
    `npm run build` were **clean/exit `0` at BOTH readings**. **The fix is the gate COMMIT, not a row change.**
27. **IT DID NOT IMPLEMENT A GENUINE STRADDLE AND DID NOT RE-ATTEMPT THE IN-FLIGHT PROBE.** The `F-A6` disposition is a
    `DECLARED-LIMIT` tied to `GAP-2`, with the three false/weak terms corrected and the row's claim narrowed to what it
    actually reads (`§5` row 28). **A later pass that can hold a dispatched renderer round trip open across a
    transition would add the row; until then the limit is named rather than papered over.**
