# Live battery — `U-SECURE-EXCLUSION` (`S1`, wave `S`) · **gate 6, THE MANDATORY LIVE BATTERY — RE-RUN AFTER THE CONTRACT AMENDMENT**

**Status: `RUN — RE-RUN AT THE AMENDED CONTRACT` — `30` measured rows recorded = `30 PASS / 0 FAIL / 0 MANUAL / 0 PARKED`.**
**The as-filed run of this battery was `29` rows = `23 PASS / 6 FAIL / 0 MANUAL / 0 PARKED`; the two rows still red when the
implementer's two fixes landed were `U-6 (reload arm, main-side state)` and `U-4 (return arm, HTTP)`. BOTH ARE NOW ASSESSED,
BOTH WERE INSTRUMENT DEFECTS OF THIS FILE'S OWN — NOT LIVE REGRESSIONS — AND BOTH ARE RE-GROUNDED BELOW, EACH WITH THE
CONTROL THAT PROVES THE RE-GRAINED PREDICATE CAN STILL FAIL (`§4`, `§7`). NO ROW WAS WEAKENED TO MAKE IT PASS: the two
re-grained predicates are STRICTLY STRONGER than the forms they replace, and the one row this pass ADDED is a control.**

## 0. THE RE-RUN'S OWN RECORD (the terms, then the claims)

| | |
| --- | --- |
| The revision the battery re-ran on | **`afd3212`** (`S1 GATE 6 FIX GREEN 2 — …`, the receipt's additive `message` + the deletion of the `exclusionOpen` term from the re-gate path); the as-filed run ran on `da6fc42` |
| The commands | **`npm run build`** then **`node tests/secure-exclusion-live.mjs`** — exit `0` both; the run reproduced on a **second execution** (`30 PASS / 0 FAIL` twice) |
| The verdict-count lineage | `23 PASS / 6 FAIL` (as filed) → **`27 PASS / 2 FAIL`** (the implementer's two fixes, measured on the unchanged driver) → **`30 PASS / 0 FAIL`** (this pass: `+1` row — the predicate control — and two re-grains) |
| The two remaining failures, assessed | **`U-6 (reload arm, main-side state)` = STALE PREDICATE — RE-GRAINED** (it asserted the SUPERSEDED registry-toggling carrier); **`U-4 (return arm, HTTP)` = WRONG INSTRUMENT — RE-GROUNDED ON THE MANUAL-UI PATH** (it asserted an MCP/HTTP return arm the contract does not provide). Neither was a live regression of the amended contract. **The measurements, the clauses and the controls are at `§4` and `§7`, stated so a reader can re-derive both verdicts rather than take them.** |
| The `§5.U` matrix / `§6.1` report | matrix **`8` rows** (`7` U-subjects + the demoted `U-8` precondition note — the `≤ 8` cap **not grown**), report `summary.total === 8` ✓, `§3` |
| `§6.2`'s read-only audit | **STILL OWED TO A NON-AUTHOR — THIS PASS DID NOT RUN IT AND MAY NOT** (`§8` item 5) |

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

## 2. THE `§5.U` DELTA MATRIX — **`8` U-rows, `≤ 8` ✓**

**The shape is the one `docs/specs/user-flow-audit.md` `§5` imports from the landed
`docs/specs/gutter-ui.md` `§5.U`: a `Pre` observation, a `Post` observation MEASURED at the live gate, a
layer label, and the exact instrument. `U-1`…`U-7` are the seven SUBJECTS
`docs/specs/secure-exclusion.md` `§2.4` item 7(2)/(2-note) declares; the cap's eighth slot is NOT filled by
an invented flow.** **`U-8` is carried where the unit's own contract put it: as the matrix's
PRECONDITION / BATTERY NOTE, and it is NOT counted as a U-row — so the matrix carries `7` U-row SUBJECTS
plus `1` named precondition row = `8` rows total, and `summary.total` in `§3` reads `8` to agree with the
matrix's own row count (`docs/specs/user-flow-audit.md` `§6.1` clause 1).**
**⟶ REGENERATED 2026-10-08 TO THE POST-FIX STATE (this pass; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed
`Post` cells are KEPT VISIBLE at `§4`, where each one's contradiction is dispositioned, and are NOT
rewritten here). THE ROW SET IS UNMOVED: the same `7` subjects + the same `1` precondition note = the same
`8` rows, `8 ≤ 8` ✓ — the cap was neither grown nor filled.**

| U-row | The user-visible flow | `Pre` (before this unit / before the transition) | `Post` — **MEASURED at `afd3212`, never projected** | Layer |
| --- | --- | --- | --- | --- |
| **`U-1`** | the exclusion toggle **and its label are painted** in the operator pane | no control: the pane's authored envelope carries no exclusion node, and the status line ends at `journal: ∞` | **the control IS painted and the label IS painted**: box `59 × 36` px at `(679, 781)`, `display: block`, `class="btn"`, label text `MCP / secure-tier exclusion (mutually exclusive)`, button text `Disable MCP`, `data-state="mcp-enabled"` — unchanged from the as-filed reading, and re-measured this run | `[U]` |
| **`U-2`** | clicking it moves the status line's `MCP:` segment `enabled → disabled`, **and the registration set is untouched** | `MCP: enabled`; a normal tool answer (`provident.get_markdown` → 2354-char HTML, `isError` absent); `19` handles listed | **SATISFIED, both halves MEASURED**: a REAL CDP pointer press+release on the painted control (`hit="BUTTON#exclusion-toggle"`, `isTarget=true`, at `(708, 348)` inside a `59 × 36` box) moves the segment to **`disabled`**, the button to `Enable MCP`, `data-state` to `mcp-disabled`, and the live MCP server begins answering the DECLARED RECEIPT; **and across a REAL exclusion transition with the enabled-group set held CONSTANT, `tools/list` answered the SAME `13` handles while open that it answered while closed (set-equal `true`, `19` at boot before the sibling-control row moved the enabled-GROUP set — a DIFFERENT mechanism), on the ONE already-connected client** | `[U]` |
| **`U-3`** | while the state is open, an MCP call answers the declared refusal | the state is `mcp-enabled`, so the predicate does not run at all | **the DECLARED RECEIPT is the live answer, on both a group-enabled tool and the always-registered one**: `provident.get_markdown` and `provident.dispatch` each answered `{"status":"refused","reason":"exclusion-closed","message":"MCP endpoint functionality is blocked because the security store is open — retry once the operator has finished with the secured changes."}` as the tool's RESULT with `isError` **ABSENT** (never an MCP protocol error); on HTTP the authorized POST answered `503` + `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}` | `[U]` + `[H]` |
| **`U-4`** | clicking it back restores normal answers | `MCP: disabled` / answers refused | **SATISFIED on the two arms the contract DECLARES, both MEASURED**: (i) through the pane's own declared bridge member the return restores NORMAL answers (`provident.get_markdown` → `ok=true`, `isError` absent, the receipt `null`, the markdown present), and a call ISSUED while open was answered the receipt and never dispatched; (ii) **on the HTTP transport the return is the OPERATOR's own act** — a REAL CDP pointer gesture on THAT boot's painted control moved its segment `disabled → enabled` (`data-state` `mcp-disabled → mcp-enabled`, bridge `exclusion="mcp-enabled"`) and the authorized POST afterwards answered **`200`** instead of `503`, **while the MCP-carried return POST stayed `503`** (the contract grants an MCP caller no re-arm authority) | `[U]` + `[H]` |
| **`U-5`** | the app graph's `get_rendered_html` / `list_targets` **never** contain the control | the pre-change app graph carries no exclusion-shaped node or id | **the isolation holds with the new node** (re-measured, unchanged): `get_rendered_html` → **2354 chars, contains `exclusion-toggle`: `false`** (and the `#app` mount's `innerHTML` contains none of it), `list_targets` → **`23` nodes, exclusion-shaped: `[]`** (the declared census `23`), while the PANE realm carries the control (`true`/`true`) as the positive control | `[U]` + `[H]` |
| **`U-6`** | the disabled state survives a **renderer reload**, while a **restart** returns to `mcp-enabled` | renderer: the pane reads `MCP: enabled`; main: state `mcp-enabled` | **SPLIT, AND NOW WHOLE ON BOTH SIDES**: after `Page.reload` the live MCP call **is still refused AND the refusal IS the DECLARED RECEIPT** (`isError` ABSENT, the `message` naming cause and remedy) — the state is main-side and the reload did not re-arm it — **and the re-painted pane reads `MCP: disabled` / `data-state="mcp-disabled"` / `Enable MCP` with `IPC_SECURITY_GET` answering `exclusion="mcp-disabled"`, i.e. the operator's view agrees with the server that is refusing**. A restart on the same profile answers normally and writes **no** exclusion key and **no** third store file | `[U]` + `[H]` |
| **`U-7`** | the stdio transport stays **CONNECTED** across the transition | one connected stdio path, `19` handles listed | **CONNECTED throughout, re-measured on the SAME client across a real transition**: the one already-connected stdio client answered `tools/list` while closed (`13` handles), then the transition, then `tools/list` while open (`13` handles, set-equal) — no reconnect, no re-handshake, no rebuild; on the HTTP boot the transport answered `405`/`401`/`200`/`503` **and then `200` again after the operator's return** on the SAME listener | `[U]` + `[H]` |
| **`U-8`** — **PRECONDITION / BATTERY NOTE, `NOT` a U-row** | the battery leaves the tree in its starting state | — | **the run restores `mcp-enabled` before completion** — this run's HTTP boot was returned to `mcp-enabled` by the operator's own act on its pane (`§5` row 25) and every scratch profile was removed (`rmSync` on all three boots), so a re-run starts clean. **This note is NOT counted as a U-row** (`docs/specs/secure-exclusion.md` `§2.4` item 7(2)'s demotion) | — |

**THE CAP, PRINTED WITH ITS TERMS: `7` U-row SUBJECTS + `1` precondition note = `8` matrix rows, and `8 ≤ 8` ✓ — no eighth FLOW was invented to fill the cap, and no subject was merged or dropped. THE POST-FIX RUN DID NOT ADD A U-ROW: the one row this pass ADDED to the BATTERY is a PREDICATE CONTROL (`U-6 (reload arm) — PREDICATE CONTROL`, `§5` row 14), which is a control on a row's falsifier and NOT a user-visible flow.**

**THE PINNED USER-VISIBLE ASSERTION PER ROW (the `§6.1` report's `assertion` field, restated here so the matrix is readable on its own): `U-1` the control and its label occupy a non-zero RENDERED BOX inside the operator pane; `U-2` a real press+release on that box moves the status line's `MCP:` segment `enabled → disabled` and leaves the tool listing SET-IDENTICAL; `U-3` while open, a tool call's RESULT is the declared receipt (both closed tokens + the cause/remedy `message`), with `isError` absent; `U-4` the operator's return — the pane control or the channel — restores NORMAL answers, and no MCP/HTTP route does; `U-5` the app graph's `get_rendered_html`/`list_targets` never contain the control while the PANE realm does; `U-6` the open state survives a reload (the refusal is still the receipt) and the pane agrees, while a restart returns to `mcp-enabled`; `U-7` the ONE stdio client stays connected across the transition; `U-8` the battery exits with the state `mcp-enabled` and every scratch profile removed.**

---

## 3. THE `§6.1` STRUCTURED COVERAGE REPORT — **emitted from the RE-RUN (`afd3212`); the as-filed report's values are kept at `§4`/`§5`, never substituted silently**

> **⟶ REGENERATED 2026-10-08.** The rows below carry the fields `docs/specs/user-flow-audit.md` `§3` mandates
> (`u` · `layer` · `instrument` · `cmd` · `exit` · `observation` · `verdict`, with `reason` owed only for a
> `NOT-OBSERVABLE` row — **none exists**) **PLUS the role's machine-readable additions** (`assertion` · `d_class` ·
> `real_input` · `proxyPASS` · `surface`), each row's `verdictClass` from the closed set `PASS`/`FAIL`/`PARKED`.
> **THE EQUALITY IS ASSERTED AT `summary` AND RE-STATED IN `summary_note`: `summary.total === 8` IS the matrix's
> U-row count (`7` subjects + `1` precondition note), and `8 + 0 + 0 = 8`.**

```json
{
  "unit": "U-SECURE-EXCLUSION",
  "matrixSource": "docs/specs/secure-exclusion-live-battery.md §2 (the §5.U delta matrix; its subjects are declared by docs/specs/secure-exclusion.md §2.4 item 7(2))",
  "predicateSource": "docs/specs/user-flow-audit.md §7.1",
  "predicateSourcePresent": true,
  "emitter": "tests/secure-exclusion-live.mjs (run as `node tests/secure-exclusion-live.mjs`)",
  "rows": [
    { "u": "U-1", "layer": "U",
      "instrument": "tests/secure-exclusion-live.mjs — CDP Runtime.evaluate read of the rendered box + rendered text",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "box 59x36 px at (679,781), display=block, classes=\"btn\", label=\"MCP / secure-tier exclusion (mutually exclusive)\", buttonText=\"Disable MCP\", data-state=\"mcp-enabled\", status=\"token: •••• · enabled: [read, dispatch, graph, code] · journal: ∞ · MCP: enabled\"",
      "verdict": "CHANGED",
      "assertion": "the control and its label occupy a NON-ZERO RENDERED BOX inside the operator pane, and the status line carries the `MCP:` segment",
      "d_class": "D1–D8 (the isolated pane graph — docs/specs/secure-panels.md §2/§4; §2.4 item 1)",
      "real_input": { "flag": true, "evidence": "CDP Runtime.evaluate over the app's own renderer: getBoundingClientRect + textContent/className — the RENDERED box, never a computed-style-only reading" },
      "proxyPASS": false,
      "surface": { "target": "boot A's Electron window (the ASSEMBLED app), operator pane", "liveSurfacePresent": true, "evidence": "the pane painted a 59x36 px box at (679,781) with display=block" } },
    { "u": "U-2", "layer": "U",
      "instrument": "tests/secure-exclusion-live.mjs — CDP Input.dispatchMouseEvent (mouseMoved/mousePressed/mouseReleased at the element's own rendered-box centre) + CDP Runtime.evaluate reads + the app's own stdio MCP client",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "click landed on \"BUTTON#exclusion-toggle\" at (708,348) inside a 59x36 box (isTarget=true); AFTER the gesture: data-state=\"mcp-disabled\", buttonText=\"Enable MCP\", status segment=\"disabled\"; bridge read exclusion=\"mcp-disabled\"; the live MCP get_markdown answered the DECLARED RECEIPT as a VALUE (isError=false, absent). THE SET-EQUALITY HALF, around a REAL exclusion transition with the enabled-GROUP set held CONSTANT: tools/list while CLOSED returned 13 handles and the SAME client answered 13 handles while OPEN, set-equal=true, names lost=[], 19 handles at boot before the sibling-control row moved the group set. CONTROLS in the same run: #token-gen changed the token (\"live-battery-token-4f9c1a7e\" -> \"4b9cvazajps\") and #toggle:graph changed the enabled set (\"read,dispatch,graph,code\" -> \"read,dispatch,code\") under the SAME gesture path; #journal-length-apply read maxJournalLength \"undefined\" -> \"undefined\" (a NO-CHANGE reading: its body reads the prop `value` off the BUTTON node, so it asks for the state the pane already holds)",
      "verdict": "CHANGED",
      "assertion": "a real press+release on the painted control moves the status line's `MCP:` segment `enabled → disabled`, and the tool listing stays SET-IDENTICAL (nothing cleared, nothing toggled)",
      "d_class": "D-GATE clause (1) (the transition is a server-side invariant, §0 ruling 1) + D1–D8 for the control's home",
      "real_input": { "flag": true, "evidence": "CDP mouseMoved + mousePressed + mouseReleased at the element's own rendered-box centre, with document.elementFromPoint confirming the hit (isTarget=true) — the browser's own input pipeline, nothing injected into the page" },
      "proxyPASS": false,
      "surface": { "target": "boot A's Electron window (the ASSEMBLED app) + its own stdio MCP endpoint", "liveSurfacePresent": true, "evidence": "the gesture moved the RENDERED segment AND the live MCP answer changed in the same run" } },
    { "u": "U-3", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — the MCP SDK client over the app's own stdio transport (ChildProcessTransport) + raw fetch POSTs at the app's own HTTP endpoint",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "stdio while open: provident.get_markdown (enabled group 'read') -> isError=false (ABSENT), {\"status\":\"refused\",\"reason\":\"exclusion-closed\",\"message\":\"MCP endpoint functionality is blocked because the security store is open — retry once the operator has finished with the secured changes.\"}; provident.dispatch (the tool the ENABLED-GROUP predicate alone always registers) -> the SAME receipt, isError ABSENT. HTTP while open: authorized POST -> 503 {\"jsonrpc\":\"2.0\",\"error\":{\"code\":-32003,\"message\":\"exclusion-closed\"},\"id\":null}",
      "verdict": "CHANGED",
      "assertion": "while the state is open, a tool call's RESULT is the declared receipt (both closed tokens exactly + the cause/remedy `message`) delivered as a VALUE, with `isError` ABSENT — never an MCP protocol error",
      "d_class": "D-GATE clause (1) (§2.2 item 2(a) — the invocation turn; §2.5 item 1's amended shape)",
      "real_input": { "flag": true, "evidence": "a literal MCP tools/call over the app's own stdio transport, and a literal authorized POST at the app's own HTTP endpoint" },
      "proxyPASS": false,
      "surface": { "target": "the app's own stdio MCP endpoint (boot A) + the app's own HTTP MCP endpoint", "liveSurfacePresent": true, "evidence": "both transports answered the refusal in ONE run (503 on HTTP, the receipt value on stdio)" } },
    { "u": "U-4", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — (i) literal HTTP POSTs at the app's own endpoint and (ii) a REAL CDP pointer gesture on the HTTP boot's own pane control, over the app's own renderer",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "(i) NO MCP RE-ARM: the batched POST carrying the return transition (load+dispatch, pre-loaded while the tier admitted work) answered 503 {\"jsonrpc\":\"2.0\",\"error\":{\"code\":-32003,\"message\":\"exclusion-closed\"},\"id\":null} and the authorized POST after it answered 503. (ii) THE OPERATOR'S ACT: a real CDP pointer gesture on THIS boot's painted control (box 56x36 px, hit=\"BUTTON#exclusion-toggle\", isTarget=true) moved the pane's segment \"disabled\" -> \"enabled\" (data-state \"mcp-disabled\" -> \"mcp-enabled\", button \"Enable MCP\"), the bridge answered exclusion=\"mcp-enabled\", and the authorized POST afterwards answered 200 (not 503)",
      "verdict": "CHANGED",
      "assertion": "the operator's return — the pane control or the channel — restores NORMAL answers on BOTH transports, and NO MCP/HTTP route can re-arm the state",
      "d_class": "D-SCOPE (the manual-UI channel is NOT an MCP method — §2.4 item 1) + D-GATE clause (1) (§2.4 item 6, the operator's re-enable is the ONLY re-arm)",
      "real_input": { "flag": true, "evidence": "a literal HTTP POST (the refused MCP-carried return) AND a CDP mouseMoved/mousePressed/mouseReleased gesture on the HTTP boot's painted control, with elementFromPoint confirming the hit" },
      "proxyPASS": false,
      "surface": { "target": "the app's own HTTP MCP endpoint + the HTTP boot's own Electron window (pane)", "liveSurfacePresent": true, "evidence": "GET /mcp answered 405, the POSTs answered 503 then 200, and the pane painted a 56x36 px box that the gesture hit" } },
    { "u": "U-5", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — provident.get_rendered_html + provident.list_targets over the app's own stdio MCP transport, beside a CDP in-page read of #panes and #app",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "get_rendered_html: ok=true after 1 attempt, 2354 chars, contains 'exclusion-toggle'=false; list_targets: 23 nodes (declared census 23), exclusion-shaped []; CDP: #panes has the toggle=true and #exclusion-control=true, #app has neither",
      "verdict": "UNCHANGED (the isolation holds with the new node)",
      "assertion": "the app graph's `get_rendered_html`/`list_targets` NEVER contain the control, while the PANE realm does (the positive control that makes the absence non-vacuous)",
      "d_class": "D1–D8 (§2.7 item 2 — the pane graph is a SEPARATE GraphScope)",
      "real_input": { "flag": true, "evidence": "literal MCP calls over the app's own stdio transport + a CDP in-page DOM read of both realms" },
      "proxyPASS": false,
      "surface": { "target": "the app's own stdio MCP endpoint + boot A's window (both realms read in the same run)", "liveSurfacePresent": true, "evidence": "get_rendered_html answered 2354 non-empty chars and the pane read found the control" } },
    { "u": "U-6", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — CDP Page.reload + a fresh-process boot on the SAME scratch profile, with the MCP client reading both",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "after Page.reload: pane re-painted=true, status segment=\"disabled\", data-state=\"mcp-disabled\", button \"Enable MCP\", IPC_SECURITY_GET answered exclusion=\"mcp-disabled\", while the live MCP call is STILL REFUSED and the answer IS the declared receipt (isError ABSENT, the message naming cause and remedy); restart on the same profile: get_markdown answers normally (isError=false), the profile holds only [\"provident-security.json\"]",
      "verdict": "CHANGED",
      "assertion": "the open state survives a renderer reload (the refusal is still the declared receipt) AND the pane agrees with the server, while a RESTART returns to `mcp-enabled` with no persisted flag",
      "d_class": "D-19 (the boot terminal / non-persistence) + §0A item 6 (the renderer may not re-arm)",
      "real_input": { "flag": true, "evidence": "CDP Page.reload on the assembled app, a literal MCP call after it, and a genuinely NEW process booted on the same scratch profile" },
      "proxyPASS": false,
      "surface": { "target": "boot A's window + its stdio MCP endpoint, then a fresh process on the same profile", "liveSurfacePresent": true, "evidence": "the pane re-painted after the reload and the new process answered normally" } },
    { "u": "U-7", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — repeated tools/list and tool calls on ONE connected stdio client across the transition, plus the HTTP listener before/after",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "one already-connected client: tools/list (13 handles, closed) -> the transition -> tools/list (13 handles, open, set-equal) with no reconnect and no re-handshake; the HTTP listener answered 405 (GET), 401 (unauthorized POST), 200 (authorized POST, enabled), 503 (authorized POST, open) and 200 again after the operator's return, on the same port",
      "verdict": "UNCHANGED (the transport stays connected; nothing is closed or rebuilt)",
      "assertion": "the ONE stdio client stays CONNECTED across the exclusion transition — no disconnect, no reconnect, no rebuild of the transport",
      "d_class": "D-GATE clause (1)(c) (§2.3 item 1 — the stdio transport is NOT closed and NOT rebuilt)",
      "real_input": { "flag": true, "evidence": "repeated `tools/list` on the SAME ChildProcessTransport client across a real transition, plus literal HTTP requests on the same listener" },
      "proxyPASS": false,
      "surface": { "target": "the app's own stdio MCP endpoint + the app's own HTTP endpoint", "liveSurfacePresent": true, "evidence": "both sides answered on the same connections across the transition" } },
    { "u": "U-8 (PRECONDITION NOTE, NOT A U-ROW — docs/specs/secure-exclusion.md §2.4 item 7(2))", "layer": "H",
      "instrument": "tests/secure-exclusion-live.mjs — the registered exit cleanup + the final transitions",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "every boot's child was killed and every scratch profile removed (3 profiles: stdio, restart, HTTP; the helper's own sweep + this driver's registry); the last transition on each boot left the state at 'mcp-enabled' — this run's HTTP boot was returned to 'mcp-enabled' by the OPERATOR's own act on its pane — so a re-run starts clean",
      "verdict": "CHANGED",
      "assertion": "the battery exits with the state `mcp-enabled` and with every scratch profile removed (a re-run starts clean)",
      "d_class": "D-19 + the battery's own hygiene note (NOT a flow)",
      "real_input": { "flag": false, "evidence": "a PRECONDITION reading, not a user gesture: the run's own teardown (process kills + profile removal) and the final state reads" },
      "proxyPASS": false,
      "surface": { "target": "the run's own process/scratch-profile bookkeeping", "liveSurfacePresent": true, "evidence": "three children killed and three scratch profiles removed on the exit path" } }
  ],
  "summary": { "total": 8, "changed": 5, "unchanged": 3, "notObservable": 0, "verdictClass": { "pass": 8, "fail": 0, "parked": 0 } },
  "summary_note": "5 + 3 + 0 = 8, and 8 IS the matrix's row count (7 U-row subjects + 1 named precondition note); the role's closed verdict set reads 8 PASS / 0 FAIL / 0 PARKED, and 8 + 0 + 0 = 8 — THE EQUALITY `summary.total === the matrix's U-row count` IS ASSERTED, NOT ASSUMED (this file's §2 carries 8 rows: 7 `U-*` subjects + the demoted `U-8` note). NO row carries an embedded `reading_finding` any more: the as-filed run's two `verdict_reading: FAIL` cells (`U-2`, `U-4`) were dispositioned by the fixes and by this pass's re-grain, and their as-filed values stand verbatim at §4. `proxyPASS: false` on EVERY row: no row's PASS is a proxy for an app-level fact — each is the app-level fact itself. `verdict` keeps the landed CHANGED/UNCHANGED vocabulary (docs/specs/gutter-ui.md §5.U's form) BESIDE `verdictClass` (the role's PASS/FAIL/PARKED set), and the `d_class` values are the UNIT'S OWN `D-`names, mapped by this pass so a reader can check the mapping rather than guess it.",
  "commands": [
    { "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observed": "30 recorded rows = 30 PASS / 0 FAIL / 0 MANUAL / 0 PARKED (the driver's own summary line, whose terms are the rows); this figure was reproduced on a SECOND execution of the same command, and this record carries the final run's values" },
    { "cmd": "npm test", "exit": 0, "observed": "Test Files 86 passed (86) · Tests 2729 passed | 2 skipped (2731) — the POST-COMMIT reading (the pre-commit reading, while this driver was edited-but-uncommitted, was 1 failed | 85 passed (86): tests/gutter.test.ts R-12 §3.4's raw dirty-path reading; see §8 item 12)" },
    { "cmd": "npm run typecheck", "exit": 0, "observed": "clean" },
    { "cmd": "npm run typecheck:tests", "exit": 0, "observed": "clean" },
    { "cmd": "npm run build", "exit": 0, "observed": "clean (main cjs + preload cjs + renderer esm)" },
    { "cmd": "git rev-parse --short HEAD", "exit": 0, "observed": "afd3212 at the re-run (the as-filed run read da6fc42)" },
    { "cmd": "sha256sum src/renderer/store-core-graph.ts src/renderer/store-graph-references.ts", "exit": 0,
      "observed": "0664c52f06bd6da5… and 5c0c1a971d7f9268… — both reproduce the unit's declared §6 pins" },
    { "cmd": "git log --name-only --pretty=format: 7142591^..HEAD", "exit": 0,
      "observed": "the landing chain's 15 paths touch no frozen artifact, no store byte and no src/shared/**" }
  ]
}
```

**THE SIX FALSIFIABLE CLAUSES, DISCHARGED ONE BY ONE (`docs/specs/user-flow-audit.md` `§6.1`'s clauses 1–5 and `docs/specs/secure-exclusion.md` `§2.4` item 7(3)):**

| # | The clause | Discharged how |
| --- | --- | --- |
| 1 | **`summary.total` === the matrix's U-row count, and the per-verdict counts sum to it** | **`8 = 7` U-rows + `1` precondition note**, and `8 + 0 + 0 = 8` ✓ (the role's closed verdict set: `PASS`/`FAIL`/`PARKED`), with the landed vocabulary reading `5 + 3 + 0 = 8` ✓ as well. **The total is NOT short and the report is NOT empty** (`docs/specs/user-flow-audit.md` `§2`'s INVALID rule). |
| 2 | **every `post` is MEASURED, never projected** | every `observation` above is a value a command in `commands[]` printed in this run; the driver prints each observation verbatim beside its verdict |
| 3 | **every `instrument` is from the CLOSED set** | **four instruments are named and each is a shipped tool / literal command line**: the repo's own driver (`node tests/secure-exclusion-live.mjs`), the app's **own MCP stdio surface** over the repo's shipped `ChildProcessTransport` helper, **literal `fetch` POSTs/GETs** at the app's own HTTP endpoint, and the app's **own CDP listener** (`--remote-debugging-port=0`, read from the child's own stderr) for the rendered-box reads and the real pointer gestures — the same apparatus the as-filed run declared, now on BOTH boots. **No row names "the live gate" or "the leg".** |
| 4 | **every `cmd` is a literal command line, with its own exit code** | `commands[]` carries eight literal command lines, each with the `exit` code the run produced (`0` for all eight) |
| 5 | **a `MANUAL` row's observation is an operator observation; a `NOT-OBSERVABLE` row carries its STRUCTURAL reason** | **there are ZERO `MANUAL` rows and ZERO `NOT-OBSERVABLE` rows in this report** — every row was taken by a shipped instrument, so neither form is claimed and neither could be used to soften a contradiction. **The re-run needed neither: no row is parked and no row is structurally unreachable, and `§6` records that with the instruments that would have been owed had it been otherwise** |
| 6 | **the predicate's decision is recorded** | `§1` above: **`TRIGGERS`**, both limbs, with the measured evidence for each |

---

## 4. FINDINGS — **the AS-FILED six measured contradictions of the gate-5 set (kept verbatim as the record of the `da6fc42` run), EACH WITH ITS DISPOSITION MEASURED AT THE RE-RUN**

**These were live failures, not doc drift:** the greens row predicted a value, the live app answered a
different one, and the difference is traceable to a named arm of the landed code.

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

## 5. THE FULL ROW SET — every check the RE-RUN recorded, verbatim

**⟶ 2026-10-08 (the RE-RUN's set, `30` rows; the as-filed `29`-row set with its `6 FAIL` stands at this file's
git history and at `§4`, which quotes each failing row's as-filed value). Rows 14 is NEW; rows 7, 9, 10, 11, 13,
15, 22 and 25 are RE-GRAINED or RE-GROUNDED — each says so in its own `evidence` string in the driver.**

| # | Battery row | Verdict | The observation it printed (abridged to the value) |
| --- | --- | --- | --- |
| 1 | the boot ORDER (`store → gate → transports → mcp.start`), read live | **PASS** | the child's stderr carries both landmarks in order: `["[provident-mcp] stdio transport ready", "[provident-main] renderer ready — MCP backend armed"]` |
| 2 | the boot state is the safe pair and the pane shows it | **PASS** | `data-state="mcp-enabled"`, button `Disable MCP`, segment `enabled` |
| 3 | **`U-1`** the toggle + label are PAINTED (rendered-box oracle) | **PASS** | box `59x36` px at `(679,781)`, `display=block`, `classes="btn"`, label `MCP / secure-tier exclusion (mutually exclusive)` |
| 4 | **`U-5`** the control is pane-only, never in the app graph | **PASS** | pane: toggle `true`, control `true`; `#app`: toggle `false`; `get_rendered_html` 2354 chars, contains the id `false` |
| 5 | **`U-5`** `list_targets` carries no pane node | **PASS** | `23` nodes (declared census `23`), exclusion-shaped `[]` |
| 6 | `U-3` precondition — a normal call answers normally | **PASS** | `provident.get_markdown` → ok, `isError` absent, markdown first 60 chars shown |
| 7 | **`U-2`** the REAL gesture moves the segment | **PASS** (was `FAIL`, `F-2`; the row is re-grained to the receipt + set-equality) | the gesture landed on `BUTTON#exclusion-toggle` (`isTarget=true`) and the segment moved `enabled → disabled`, `data-state="mcp-disabled"`, button `Enable MCP`; the live call answered the DECLARED RECEIPT (`isError` absent) |
| 8 | `U-2` sibling controls on the SAME gesture path | **PASS** | `#token-gen` changed the token; `#toggle:graph` changed the enabled set; `#journal-length-apply` `undefined → undefined` (a NO-CHANGE reading — its body reads the prop `value` off the BUTTON node — **NOT a control**, and the evidence string now says so) |
| 9 | **`SX-G-57`** the GET response member reports the LIVE state | **PASS** (was `FAIL`, `F-4`) | after a real accepted transition `IPC_SECURITY_GET` answered `exclusion="mcp-disabled"` |
| 10 | **`U-3`** the arm that answers, read by name | **PASS** (was `FAIL`, `F-3`; re-grained to the RECEIPT's full shape) | `get_markdown` **and** `dispatch` each answered `{"status":"refused","reason":"exclusion-closed","message":"MCP endpoint functionality is blocked because the security store is open — retry once the operator has finished with the secured changes."}` with `isError` **ABSENT** |
| 11 | **`U-2 (registry)` / `U-7` / `SX-G-23`** the registration set across a real transition | **PASS** (was `FAIL`; re-grained from `>0` to SET EQUALITY with the group set held constant) | `tools/list` CLOSED → `13` handles, OPEN → `13` handles, `set-equal=true`, names lost `[]`; `19` at boot before the sibling row moved the enabled-GROUP set |
| 12 | **`U-4`** the return restores normal answers (the pane's own declared call) | **PASS** (re-grained to a bound) | bridge `exclusion="mcp-enabled"`; `get_markdown` → `ok=true`, `isError` absent, **receipt `null`**, markdown present; the call ISSUED while open was answered the receipt and never dispatched |
| 13 | **`U-6`** the state survives a renderer reload (main-side) | **PASS** (`RE-GRAINED` — the as-filed predicate was the STALE `isError === true`) | after `Page.reload` the live call is STILL REFUSED **and the answer IS the declared receipt**: `isError` absent, both closed tokens, the `message` naming cause and remedy |
| 14 | **`U-6` — PREDICATE CONTROL** (NEW this pass) | **PASS** | the re-grained predicate is `null` on the run's OWN enabled-state answers (the renderer's value — what an inert turn would return) **and** on a PRE-RULING TWO-MEMBER receipt, on a CAUSE-LESS message, and on the SUPERSEDED `-32602 … disabled` carrier |
| 15 | **`U-6`** the operator's view after the reload | **PASS** (was `FAIL`, `F-4`) | the pane reads `MCP: disabled` / `data-state="mcp-disabled"` / `Enable MCP` and `IPC_SECURITY_GET` answered `exclusion="mcp-disabled"` **while the server refuses** — the view agrees with the server |
| 16 | **`U-6`** a restart returns to `mcp-enabled` and the flag is not persisted | **PASS** | a new process on the same profile answers normally; the profile holds only `["provident-security.json"]` |
| 17 | the HTTP transport reaches its readiness landmark | **PASS** | `GET /mcp` → `405`; landmarks `http transport ready` then `renderer ready` |
| 18 | `SX-G-38` the AUTHORIZATION arm answers FIRST | **PASS** | tokenless POST → `401` `{"code":-32001,"message":"Unauthorized"}` |
| 19 | `SX-G-42` the positive control (enabled POST) | **PASS** | authorized POST while enabled → `200` |
| 20 | `SX-G-40` a GET keeps its landed `405` | **PASS** | `405` `{"code":-32000,"message":"Method not allowed."}` |
| 21 | **`SX-G-36`** an authorized POST while OPEN answers `503` + the declared body | **PASS** | `503` `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}` |
| 22 | `SX-G-38` the ordering holds while OPEN | **PASS** | tokenless POST while open → `401` |
| 23 | **`SX-G-44`** one predicate, one answer shape, two DELIVERIES | **PASS** (re-grained: the stdio half is the RECEIPT itself, not an `isError` flag) | the same state produced the DECLARED RECEIPT as a stdio tool RESULT **and** the HTTP `503` with `-32003 'exclusion-closed'` in one run; the enabled-state POST answered `200` |
| 24 | **`SX-G-43`** the straddling POST is answered once | **PASS** (with the honest note) | `503`, **1** body line, second status line `false`; the note: this POST did not carry a resolving renderer round trip across the transition, so the mid-flight abandonment path is NOT exercised by this row |
| 25 | **`U-4`** the return arm on HTTP | **PASS** (was `FAIL` — `F-5`; **RE-GROUNDED ON THE MANUAL-UI PATH**) | (i) the MCP-carried return POST → `503` + `exclusion-closed` and the POST after it → `503` (**no MCP re-arm authority**); (ii) a REAL pointer gesture on THAT boot's control (box `56x36`, `isTarget=true`) moved the segment `disabled → enabled` (bridge `exclusion="mcp-enabled"`) and the POST afterwards answered **`200`** |
| 26 | **`SX-G-48/49`** the one new channel constant, spelled once | **PASS** | `store-channels.ts` exports 3 constants, one of them `IPC_SECURITY_EXCLUSION = 'provident:security:exclusion'`; the literal appears under `src/**`/`scripts/**` in exactly one file |
| 27 | **`SX-G-54`** the frozen byte pins | **PASS** | `0664c52f…` and `5c0c1a97…` (both reproduce the declared `sha256`) |
| 28 | **`SX-G-67/68`** no `secure.`-segment check, no `secure-refused`, no name-mapped refusal | **PASS** | hits `[]` over the six declared `src/**` files |
| 29 | **`SX-G-53`** the store union carries no exclusion token | **PASS** | `store-core-graph.ts` contains `'exclusion-closed'`: `false`; the refusal-shaped tokens found are the union's own |
| 30 | **`SX-G-55`** the diff scope touches no frozen artifact | **PASS** | the landing chain's paths (15) — forbidden hits `[]`, `src/shared/**` untouched |

**THE ARITHMETIC, PRINTED WITH ITS TERMS:** `30` recorded rows = `30 PASS` + `0 FAIL` + `0 MANUAL` + `0 PARKED`, and `30 + 0 + 0 + 0 = 30` ✓ — over the matrix's `8` rows (`7` U-subjects + `1` precondition note), which is why the battery's row count and the report's `summary.total` are DIFFERENT numbers and both are printed: **the battery records rows, the report records U-rows, and `summary.total` equals the MATRIX's row count (8), not the battery's (30).**

---

## 6. PARKED / MANUAL / NOT-OBSERVABLE — **`0` of each, and why**

- **PARKED: NONE.** `RCA-11` forbids parking a unit whose surface is exercisable, and this surface
  **is**: three live processes were booted on the operator's display (`DISPLAY=:0`) — the stdio boot, the
  restart probe and the HTTP boot — a real CDP pointer gesture was delivered to the painted control **on
  two of them**, both transports were driven, and the reload/restart/return arms were exercised. **No
  scenario was parked and no structural reason was needed.** **THE RE-RUN'S OWN PARK AUDIT, POSITIVE: no row
  was parked this pass either, and none could have been** — the gesture rows are exercisable through the CDP
  route over both boots, and the one arm that is genuinely NOT deterministically exercisable (a call
  straddling the transition in flight, `§5` row 12's honest limit) is stated as a LIMIT ON A ROW THAT IS
  STILL MEASURED, not converted into a parked row.
- **MANUAL: NONE.** `docs/specs/secure-exclusion.md` `§2.4` item 7(2-note) **predicted** that the gesture
  rows would have to carry `MANUAL` because the pane is an isolated graph and `R4` forbids the two
  `webContents` reach-ins. **The run falsifies that prediction in the unit's favour, and it is recorded
  because the prediction is in the contract**: the CDP route (`--remote-debugging-port=0` + the DevTools
  endpoint + a raw WebSocket + `Input.dispatchMouseEvent`) is **outside the `R4` set**, needs no
  `webContents` call, and **did** deliver a real press+release to the rendered control and did drive
  landed sibling controls. **The `MANUAL` instrument was therefore not required for the measurement — and
  using it would have hidden F-2**, since the instrument IS able to take the reading and the reading it
  takes is a failure. **THE RE-RUN STRENGTHENS THE SAME REFUSAL: the return arm's own `[U]` half was taken by
  the SAME CDP gesture on the HTTP boot's pane** (`§5` row 25), so no row needed `MANUAL` for it either.
- **`NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT`: NONE.**

---

## 7. THE DRIVER — path, and why that location is admissible under the two hard constraints

**`tests/secure-exclusion-live.mjs`** (run as `node tests/secure-exclusion-live.mjs`; `30` recorded rows at the
re-run; exit `0`). It is a **`tests/**`-owned harness**, the second of the two admissible locations:

1. **`scripts/*.mjs` was NOT used, because a NEW file there reddens a frozen row.**
   `tests/ui-leg-contract.test.ts`'s `helperCandidates()` takes
   `readdirSync(scripts).filter(f => f.endsWith('.mjs') && !RESERVED_SCRIPT_NAMES.has(f))` and asserts the
   FIRST candidate carries `mkdtempSync`, `tmpdir()`, `PINNED_SPAWN_FLAGS`, `spawn(`, `process.on('exit')`
   and `rmSync`. **MEASURED in this pass (post-commit)**: with the driver under `tests/**`, `npm test` is
   **`86 files / 2729 passed | 2 skipped (2731) / 0 failed`** — see item 12 of `§8` for the ONE interaction this
   file has with a landed sibling row (the uncommitted-edit reading), which is closed by the gate commit.
2. **`scripts/electron-ui.mjs` was NOT extended and its `R4` row was NOT weakened.** That row scans the
   leg's own code (comments stripped) for the call-site SET
   `app.isPackaged` · `webContents.executeJavaScript` · `webContents.debugger`. **This driver contains
   none of them and adds nothing under `scripts/`.** The route it uses instead is **Chrome DevTools
   Protocol over the app's own `--remote-debugging-port=0` listener** — a channel the `R4` set does not
   name and no shipped file uses. **The re-run now attaches that channel to BOTH boots** (the stdio boot and
   the HTTP boot), which is what makes the operator's return measurable ON the HTTP transport.**

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
2. **`U-6 (reload arm) — PREDICATE CONTROL` — THE ROW THIS PASS ADDED.** It runs the SAME predicate over the
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
its dated record; the re-run's own limits are items 8–13.**

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
9. **IT DID NOT WEAKEN A ROW TO MAKE IT PASS.** Both re-grains are stated with their as-filed forms in the
   driver's own `evidence` strings and at `§4`/`§7`: `isError === true` → **the receipt's full shape with
   `isError` absent** (strictly stronger: it also bites on a bare token string and on a cause-less message);
   `tools/list length > 0` → **set equality** (strictly stronger: a count cannot see a same-size change);
   `text CONTAINS the token` → **the receipt itself**; the HTTP return row → **two assertions where the
   as-filed row had one, one of which measures the contract's own negative**. **AND THE CONTROL WAS ADDED, NOT
   ASSUMED**: `§5` row 14 runs the re-grained predicate over the run's own enabled-state values and over three
   outside shapes, so the predicate's falsifier is itself a reported row.
10. **THE TWO REMAINING FAILURES ARE ASSESSED, NOT DISMISSED, AND THE ASSESSMENT IS WRITTEN WHERE IT CAN BE
    CHECKED.** `U-6 (reload arm, main-side state)` = **`STALE PREDICATE`** (the amended clauses `§2.1` item 3,
   `§2.2` item 2(a), `§2.5` item 1 and the unit's own `G6-F3` row / register cell `G6-F3#1` are quoted in the
   driver's own evidence string and at these sections). `U-4 (return arm, HTTP)` = **`WRONG INSTRUMENT`** —
   **with the `§` stated for the negative as well as the positive**: the contract provides NO MCP/HTTP
   re-enable route (`§2.4` item 6 · `§2.2` item 2(a) · `§2.3` item 2 · `§2.4` item 1), so the row was testing
   a route that does not exist and is re-grounded on the manual-UI path the contract DOES declare. **IF a
   later pass finds an HTTP return arm in the contract, this disposition is wrong and the row reddens again
   — the negative half of the re-grounded row is what would catch it.**
11. **`§6.2`'S READ-ONLY AUDIT IS STILL OWED, AND THIS PASS NEITHER RAN IT NOR MAY RUN IT.** The audit
    (`docs/specs/user-flow-audit.md` `§4`, six duties) must be taken by **a party that did not author the
    matrix** (`AGENTS.md` item 10a / RCA-4's independence rule) — and this pass is the matrix's author, so
    self-auditing would be exactly the self-bless the rule forbids. **ROUTING, STATED SO THE SUPERVISOR CAN
    ACT: the audit is owed over `§2` (the regenerated matrix) and `§3` (the regenerated report) of THIS file,
    by a non-author, read-only.** What it must reconcile: the `summary.total === 8` equality row by row, every
    `verdict`/`verdictClass` against the observation and the named instrument, the `predicateSource`'s filing
    (`docs/specs/user-flow-audit.md` exists, `predicateSourcePresent: true`), the absence of projection, and
    the layer labels — **with the standing warning that a `[T]`/node-suite green is NOT assembled-app
    evidence and that this record's `[U]` claims rest on the CDP + MCP readings quoted in `§5`**.
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
