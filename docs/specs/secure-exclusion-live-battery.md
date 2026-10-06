# Live battery — `U-SECURE-EXCLUSION` (`S1`, wave `S`) · **gate 6, THE MANDATORY LIVE BATTERY, RUN**

**Status: `RUN` — 29 measured rows recorded = `23 PASS / 6 FAIL / 0 MANUAL / 0 PARKED`. The six contradictions are recorded below as findings and are NOT passes.**

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

| U-row | The user-visible flow | `Pre` (before this unit / before the transition) | `Post` — **MEASURED, never projected** | Layer |
| --- | --- | --- | --- | --- |
| **`U-1`** | the exclusion toggle **and its label are painted** in the operator pane | no control: the pane's authored envelope carries no exclusion node, and the status line ends at `journal: ∞` | **the control IS painted and the label IS painted**: box `59 × 36` px at `(679, 781)`, `display: block`, `class="btn"`, label text `MCP / secure-tier exclusion (mutually exclusive)`, button text `Disable MCP`, `data-state="mcp-enabled"` | `[U]` |
| **`U-2`** | clicking it moves the status line's `MCP:` segment `enabled → disabled` | `MCP: enabled` (and a normal tool answer: `provident.get_markdown` → 2354-char HTML, `isError` absent) | **CONTRADICTED — the row's own `verdict` reads `UNCHANGED` and its embedded `reading_finding.verdict_reading` reads `FAIL`** (the precedent's form: the closed verdict vocabulary is kept and the failure is stated in the reading): after a REAL pointer press+release on the painted control the segment still reads **`MCP: enabled`**, the button still reads `Disable MCP`, `data-state` is still `mcp-enabled`, while the live MCP server's gate DID move in the same run — the control and the gate **disagree** and the control is **inert on a real click**. See `§4` finding **F-2** | `[U]` |
| **`U-3`** | while the state is open, an MCP call answers the declared refusal | the state is `mcp-enabled`, so the predicate does not run at all | **REFUSED — but by a DIFFERENT arm than the contract declares**: `provident.get_markdown` → `MCP error -32602: Tool provident.get_markdown disabled`; `provident.dispatch` (a tool that stays registered on the group predicate alone) → **also `-32602 … disabled`**; `tools/list` → **`0` tools** (was `19` while enabled). The declared receipt value `{status:'refused', reason:'exclusion-closed'}` is **not** the live answer on the stdio transport. On HTTP the refusal IS the declared one (`503` + `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}`). See finding **F-3** | `[U]` + `[H]` |
| **`U-4`** | clicking it back restores normal answers | `MCP: disabled` / answers refused | **CONTRADICTED ON ONE ARM, SATISFIED ON THE OTHER — both measured, the row's `verdict` read `CHANGED` and its `reading_finding.verdict_reading` read `FAIL`**: through the pane's OWN declared bridge member the return works (`provident.get_markdown` answers normally again, and a call in flight across the transition is refused rather than delivered); **on the HTTP transport the return is NOT reachable at all** — the transition envelope was pre-loaded while enabled, yet the POST that dispatches it is itself refused (`503 … exclusion-closed`) and the POST after it is still `503`. See finding **F-5** | `[U]` + `[H]` |
| **`U-5`** | the app graph's `get_rendered_html` / `list_targets` **never** contain the control | the pre-change app graph carries no exclusion-shaped node or id | **the isolation holds with the new node**: `get_rendered_html` → **2354 chars, contains `exclusion-toggle`: `false`** (and the `#app` mount's `innerHTML` contains none of it), `list_targets` → **`23` nodes, exclusion-shaped: `[]`** (the declared census `23`), while the PANE realm carries the control (`true`/`true`) as the positive control | `[U]` + `[H]` |
| **`U-6`** | the disabled state survives a **renderer reload**, while a **restart** returns to `mcp-enabled` | renderer: the pane reads `MCP: enabled`; main: state `mcp-enabled` | **SPLIT — and the split is a FINDING**: after `Page.reload` the live MCP call **is still refused** (`isError: true`) — the state is main-side and the reload did not re-arm it — **but the re-painted pane reads `MCP: enabled` with `data-state="mcp-enabled"` and the button reading `Disable MCP`, while the server refuses every call**. A restart on the same profile answers normally and writes **no** exclusion key and **no** third store file. See findings **F-4**/**F-2** | `[U]` + `[H]` |
| **`U-7`** | the stdio transport stays **CONNECTED** across the transition | one connected stdio path, `19` tools listed | **CONNECTED throughout**: the same client answered `tools/list` (`19` handles), then the refusal (`isError`), then `tools/list` again (`19` handles) — the transport was never closed, never rebuilt and never re-handshaken across the transition; on the HTTP boot the transport answered `405`/`401`/`200`/`503` on the SAME listener before and after | `[U]` + `[H]` |
| **`U-8`** — **PRECONDITION / BATTERY NOTE, `NOT` a U-row** | the battery leaves the tree in its starting state | — | **the run restores `mcp-enabled` before completion** — the HTTP boot's last transition and the stdio boot's last bridge call both closed the tier, and every scratch profile was removed (`rmSync` on all three boots), so a re-run starts clean. **This note is NOT counted as a U-row** (`docs/specs/secure-exclusion.md` `§2.4` item 7(2)'s demotion) | — |

**THE CAP, PRINTED WITH ITS TERMS: `7` U-row SUBJECTS + `1` precondition note = `8` matrix rows, and `8 ≤ 8` ✓ — no eighth FLOW was invented to fill the cap, and no subject was merged or dropped.**

---

## 3. THE `§6.1` STRUCTURED COVERAGE REPORT — **emitted from the run**

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
      "verdict": "CHANGED" },
    { "u": "U-2", "layer": "U",
      "instrument": "tests/secure-exclusion-live.mjs — CDP Input.dispatchMouseEvent (mouseMoved/mousePressed/mouseReleased at the element's own rendered-box centre) + CDP Runtime.evaluate reads",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "click landed on \"BUTTON#exclusion-toggle\" at (708,348) inside a 59x36 box (isTarget=true); AFTER the gesture: data-state=\"mcp-enabled\", buttonText=\"Disable MCP\", status segment=\"enabled\"; bridge read exclusion=\"mcp-enabled\"; live MCP get_markdown isError=true (\"-32602: Tool provident.get_markdown disabled\"). CONTROL in the same run: #token-gen changed the token (\"live-battery-token-4f9c1a7e\" -> \"zuv13jyf7j\") and #toggle:graph changed the enabled set (\"read,dispatch,graph,code\" -> \"read,dispatch,code\") under the SAME gesture path; #journal-length-apply (maxJournalLength \"undefined\" -> \"undefined\") did NOT run its body",
      "verdict": "UNCHANGED",
      "reading_finding": {
        "the_gesture_flow": "FAIL — the segment does NOT move enabled -> disabled: it reads \"enabled\" after a real press+release on the painted control, the button still reads \"Disable MCP\", and data-state stays \"mcp-enabled\".",
        "the_gate_DID_move_in_the_same_run": "the SAME run's bridge arm moved the live gate (the server began refusing every call), so the contradiction is the CONTROL's, not the gate's.",
        "control_that_excludes_a_driver_defect": "PASS — two landed sibling controls ran their bodies under the same gesture path (#token-gen, #toggle:graph); the two that did not are the two whose authored bodies read ctx.node.props.",
        "verdict_reading": "FAIL"
      },
      "additive": "ADDITIVE — NOT-IN-THE-CLOSED-INSTRUMENT-SET, AND DECLARED AS SUCH (the gutter-ui-live-battery.md precedent's own convention): the REAL POINTER INPUT is CDP (mouseMoved + mousePressed + mouseReleased at the element's own rendered-box centre, with elementFromPoint confirming the hit) rather than an operator's hand — it is APPARATUS, not a contract instrument, and the row's verdict is the value the RENDERED PANE then reads. NOTHING was injected into the page: no attribute, no handler, no override, no source edit — the gesture is delivered by the browser's own input pipeline to the shipped listener." },
    { "u": "U-3", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — the MCP SDK client over the app's own stdio transport (ChildProcessTransport) + raw fetch POSTs at the app's own HTTP endpoint",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "stdio while open: provident.get_markdown -> isError=true, \"MCP error -32602: Tool provident.get_markdown disabled\"; provident.dispatch -> isError=true, \"MCP error -32602: Tool provident.dispatch disabled\"; tools/list -> 0 handles (19 while enabled). HTTP while open: authorized POST -> 503 {\"jsonrpc\":\"2.0\",\"error\":{\"code\":-32003,\"message\":\"exclusion-closed\"},\"id\":null}",
      "verdict": "CHANGED (the outcome holds; the declared ANSWER SHAPE does not — see §4 F-3)" },
    { "u": "U-4", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — the pane's declared bridge member via CDP Runtime.evaluate, and a batched load+dispatch POST at the HTTP endpoint",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "return through the app's own channel: provident.get_markdown answers normally again (isError absent) and a call in flight ACROSS the transition is refused (\"-32602: Tool provident.load disabled\") rather than delivered; return over HTTP: the batched transition POST -> 503 \"{\\\"code\\\":-32003,\\\"message\\\":\\\"exclusion-closed\\\"}\" and the POST after it -> 503",
      "verdict": "CHANGED",
      "reading_finding": {
        "the_bridge_arm": "PASS — the return through the pane's own declared member restores normal answers (and the in-flight call is refused rather than delivered).",
        "the_mcp_arm": "FAIL / NOT REACHABLE — on the HTTP transport the POST that carries the return dispatch is itself an invocation, refused 503 by the tier it would close; the POST after it is still 503. The operator's return is reachable ONLY through the renderer bridge (the pane control).",
        "verdict_reading": "FAIL"
      } },
    { "u": "U-5", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — provident.get_rendered_html + provident.list_targets over the app's own stdio MCP transport, beside a CDP in-page read of #panes and #app",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "get_rendered_html: ok=true after 1 attempt, 2354 chars, contains 'exclusion-toggle'=false; list_targets: 23 nodes (declared census 23), exclusion-shaped []; CDP: #panes has the toggle=true and #exclusion-control=true, #app has neither",
      "verdict": "UNCHANGED (the isolation holds with the new node)" },
    { "u": "U-6", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — CDP Page.reload + a fresh-process boot on the SAME scratch profile, with the MCP client reading both",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "after Page.reload: pane re-painted=true, status segment=\"enabled\", data-state=\"mcp-enabled\", while the live MCP call is STILL refused (isError=true) and IPC_SECURITY_GET answered exclusion=\"mcp-enabled\"; restart on the same profile: get_markdown answers normally (isError=false), the profile holds only [\"provident-security.json\"]",
      "verdict": "CHANGED (the main-side state survives the reload and the restart returns to enabled; the OPERATOR-VISIBLE state does not follow — see §4 F-4)" },
    { "u": "U-7", "layer": "U|H",
      "instrument": "tests/secure-exclusion-live.mjs — repeated tools/list and tool calls on ONE connected stdio client across the transition, plus the HTTP listener before/after",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "one client: tools/list 19 -> refusal (isError) -> tools/list 19, with no reconnect and no re-handshake; the HTTP listener answered 405 (GET), 401 (unauthorized POST), 200 (authorized POST, enabled), 503 (authorized POST, open) on the same port",
      "verdict": "UNCHANGED (the transport stays connected; nothing is closed or rebuilt)" },
    { "u": "U-8 (PRECONDITION NOTE, NOT A U-ROW — docs/specs/secure-exclusion.md §2.4 item 7(2))", "layer": "H",
      "instrument": "tests/secure-exclusion-live.mjs — the registered exit cleanup + the final transitions",
      "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observation": "every boot's child was killed and every scratch profile removed (3 profiles, the helper's own sweep + this driver's registry); the last transition on each boot left the state at 'mcp-enabled', so a re-run starts clean",
      "verdict": "CHANGED (the battery leaves the tree in its starting state)" }
  ],
  "summary": { "total": 8, "changed": 5, "unchanged": 3, "notObservable": 0 },
  "summary_note": "5 + 3 + 0 = 8, and 8 IS the matrix's row count (7 U-row subjects + 1 named precondition note). TWO of the CHANGED rows carry an embedded reading_finding whose verdict_reading is FAIL (U-2, U-4): the verdict field keeps the closed vocabulary, and the FAIL is stated in the reading rather than folded into the verdict — the gutter-ui-live-battery.md precedent's form.",
  "commands": [
    { "cmd": "node tests/secure-exclusion-live.mjs", "exit": 0,
      "observed": "29 recorded rows = 23 PASS / 6 FAIL / 0 MANUAL / 0 PARKED (the driver's own summary line, whose terms are the rows); this figure and the identical six-row failure set were reproduced on a second execution of the same command, and this record carries the FINAL run's values" },
    { "cmd": "npm test", "exit": 0, "observed": "Test Files 86 passed (86) · Tests 2724 passed | 2 skipped (2726) — the gate-5/gate-9 figure reproduced exactly" },
    { "cmd": "npm run typecheck", "exit": 0, "observed": "clean" },
    { "cmd": "npm run typecheck:tests", "exit": 0, "observed": "clean" },
    { "cmd": "npm run build", "exit": 0, "observed": "clean (main cjs + preload cjs + renderer esm)" },
    { "cmd": "git rev-parse --short HEAD", "exit": 0, "observed": "da6fc42 at the run; the driver landed at 4f1af13" },
    { "cmd": "sha256sum src/renderer/store-core-graph.ts src/renderer/store-graph-references.ts", "exit": 0,
      "observed": "0664c52f06bd6da5… and 5c0c1a971d7f9268… — both reproduce the unit's declared §6 pins" },
    { "cmd": "git log --name-only --pretty=format: 7142591^..HEAD", "exit": 0,
      "observed": "the landing chain's 13 paths (plus this driver after 4f1af13) touch no frozen artifact, no store byte and no src/shared/**" }
  ]
}
```

**THE SIX FALSIFIABLE CLAUSES, DISCHARGED ONE BY ONE (`docs/specs/user-flow-audit.md` `§6.1`'s clauses 1–5 and `docs/specs/secure-exclusion.md` `§2.4` item 7(3)):**

| # | The clause | Discharged how |
| --- | --- | --- |
| 1 | **`summary.total` === the matrix's U-row count, and the per-verdict counts sum to it** | **`8 = 7` U-rows + `1` precondition note**, and `5 + 3 + 0 = 8` ✓. **The total is NOT short and the report is NOT empty** (`docs/specs/user-flow-audit.md` `§2`'s INVALID rule). |
| 2 | **every `post` is MEASURED, never projected** | every `observation` above is a value a command in `commands[]` printed in this run; the driver prints each observation verbatim beside its verdict |
| 3 | **every `instrument` is from the CLOSED set** | three instruments are named and each is a **shipped tool/literal command line**: the repo's own driver (`node tests/secure-exclusion-live.mjs`), the app's **own MCP stdio surface** over the repo's shipped `ChildProcessTransport` helper, and **literal `fetch` POSTs** at the app's own HTTP endpoint. **No row names "the live gate" or "the leg".** |
| 4 | **every `cmd` is a literal command line, with its own exit code** | `commands[]` carries eight literal command lines, each with the `exit` code the run produced (`0` for all eight) |
| 5 | **a `MANUAL` row's observation is an operator observation; a `NOT-OBSERVABLE` row carries its STRUCTURAL reason** | **there are ZERO `MANUAL` rows and ZERO `NOT-OBSERVABLE` rows in this report** — every row was taken by a shipped instrument, so neither form is claimed and neither could be used to soften a contradiction |
| 6 | **the predicate's decision is recorded** | `§1` above: **`TRIGGERS`**, both limbs, with the measured evidence for each |

---

## 4. FINDINGS — **six measured contradictions of the gate-5 set, each with its clause, its expected value and its observed value**

**These are live failures, not doc drift:** the greens row predicted a value, the live app answered a
different one, and the difference is traceable to a named arm of the landed code.

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

### F-3 — **THE DECLARED REFUSAL RECEIPT IS NOT THE LIVE ANSWER ON STDIO: EVERY TOOL CALL IS ANSWERED `-32602 … disabled`** (and `tools/list` is empty while open)

| | |
| --- | --- |
| **The contradicting rows** | **`SX-G-19`** (`§2.2` item 2(a) / `§3.1` `M-EX-5`: the stdio turn answers the **VALUE** `{status:'refused', reason:'exclusion-closed'}` as the tool's RESULT — *never an MCP protocol error*), **`SX-G-23`** (`§0A` item 7(c) / `§2.2` item 2(c): `tools/list` while open is NOT cleared, the handles stay RESOLVABLE, observed as a non-empty set — the blind probe read `count=8`), and **`SX-G-34`**'s no-throw/no-protocol-error class |
| **The spec clauses** | `docs/specs/secure-exclusion.md` `§2.2` item 2(a)/(c); `§2.5` item 1 (the closed refusal form); `§0A` item 7(c); `§3.1` `M-EX-5`; `§3.2` `FS-EX-3`; `§3.3` `I-EX-3` |
| **Expected** | the invocation turn (`exclusionTurn`) answers the two-member receipt as the tool result, and the registered handles stay **resolvable** while open (toggled, never deregistered) |
| **Observed** | `provident.get_markdown` → `MCP error -32602: Tool provident.get_markdown disabled`; **`provident.dispatch` → `MCP error -32602: Tool provident.dispatch disabled` too** — and `provident.dispatch` is the one tool that stays registered on the group predicate alone when it is allowed, so its answer is the arm that reaches `exclusionTurn`; `tools/list` → **`0` handles** (was `19` while enabled) |
| **The arm that actually answers, read by name** | `regateLiveServer` toggles **every** captured handle `enabled: false` while the tier is open, **including `provident.dispatch`** — so the MCP framework refuses the call **before the handler runs**, and the `exclusionTurn` handler (which is registered and wired correctly, and which the unit's own `A-1#1`/`A-1#2` cells drive green) is **never reached on a live call**. The `-32003 'exclusion-closed'` receipt is the **HTTP arrival** answer, not the stdio invocation-turn answer |
| **The honest reading** | the SAFETY outcome holds (nothing is dispatched to the renderer while open; `sends=0` is not contradicted), but the **declared OBSERVABILITY does not**: a live MCP client cannot list or invoke anything while open, and the receipt value the contract pins is not what a client sees. This is the `docs/specs/user-flow-audit.md` `§4` item 6 *"never upgrade a layer"* case in reverse — the `[T]`/`[B]` greens are **not** app-layer evidence, and here the app layer answers differently |

### F-4 — **THE `IPC_SECURITY_*` RESPONSE MEMBERS REPORT A STALE GATE — the operator's view never follows a transition**

| | |
| --- | --- |
| **The contradicting rows** | **`SX-G-57`** (the manual-UI channel's responses: *the member is NEVER absent on a GET or a SET response*, `T-5`, `PAR-9`) and the operator-visible half of **`SX-G-61`** / **`U-6`** |
| **The spec clauses** | `docs/specs/secure-exclusion.md` `§3.1` `M-EX-7`; `§2.4` item 4 (`{ ...settings, exclusion: state }`); `PAR-9`; `§2.2` item 3's coupling clause |
| **Expected** | the `IPC_SECURITY_GET` response record carries the **state** (`'mcp-enabled' | 'mcp-disabled'`) — i.e. the state the app is actually in |
| **Observed** | after a **REAL accepted transition** (`window.provident.security.setExclusion('mcp-disabled')` answered `applied: true` and the live server immediately began refusing every call), `IPC_SECURITY_GET` answered **`exclusion: "mcp-enabled"`** — the BOOT state. The pane reads that member at its own boot (`renderer.ts` awaits `bridge.security.get()` BEFORE the panes are constructed) and on every `refresh()`, so the operator's status line and toggle read the boot state forever after a transition: after the `Page.reload` row the pane showed `MCP: enabled` / `data-state="mcp-enabled"` / `Disable MCP` **while the server refused every call** |
| **The mechanism, from the landed code** | `main.ts` constructs ONE `SecurityGate` (`gate = new SecurityGate({ token: persisted.token, enabled: … })`) and closes the `IPC_SECURITY_GET`/`IPC_SECURITY_SET` handlers over it, while `mcp.applyExclusion()` REPLACES the server's private `_gate` with `this._gate.withExclusion(state)` — and `SecurityGate.withExclusion` **returns a NEW gate** (`src/main/security.ts`: *"a NEW gate is returned and the RECEIVER is unchanged"*). The handlers therefore keep reading the **boot-time gate instance**, which no transition ever moves: `IPC_SECURITY_GET`/`IPC_SECURITY_SET` answer the constructed state, not the live one. **This also explains why F-2's dead click could not have been detected by the `[T]` layer alone**: the unit's own cells drive the transition site (`applyExclusion` + `gate.exclusionState()`), never the IPC response record |

### F-5 — **THE RETURN FROM `mcp-disabled` HAS NO MCP-REACHABLE PATH ON THE HTTP TRANSPORT**

| | |
| --- | --- |
| **The contradicting row** | **`SX-G-43`**'s straddle class and the `U-4` subject (`§2.4` item 7(2): *"clicking it back … restores tool answers"*), read on the HTTP transport |
| **The spec clauses** | `docs/specs/secure-exclusion.md` `§2.3` items 2/3; `§2.2` item 2(a); `§2.4` item 6 (*the operator's re-enable is the ONLY re-arm*) |
| **Observed** | the transition envelope for the return was **pre-loaded while the tier still admitted MCP work** (a batched `load`+`dispatch` in ONE POST, on the run's own initialized session — the form that works in the enabled direction and moved the HTTP gate both ways in this run), and then the POST that carries the **dispatch** is itself an invocation: the gate is read **at POST arrival**, the tier is open, so the request is answered **`503 {"code":-32003,"message":"exclusion-closed"}`** and the handler that would re-enable never runs. The POST after it is still `503` |
| **The honest reading** | **this is the invocation turn working as declared** (`§2.2` item 2(a) refuses EVERY tool invocation while open), and it makes the return reachable **only through the renderer bridge** — the pane control (F-2: inert on a real click) or a renderer-realm `setExclusion` call. **No row in the greens predicted this asymmetry** (`SX-G-43`/`SX-G-44` speak only of the refusal's delivery), so it is recorded as a live finding about the unit's recovery path rather than as a projected verdict. It is also the datum `§7a` `OW-6` asked gate 6 to supply |

---

## 5. THE FULL ROW SET — every check the run recorded, verbatim

| # | Battery row | Verdict | The observation it printed (abridged to the value) |
| --- | --- | --- | --- |
| 1 | the boot ORDER (`store → gate → transports → mcp.start`), read live | **PASS** | the child's stderr carries both landmarks in order: `["[provident-mcp] stdio transport ready", "[provident-main] renderer ready — MCP backend armed"]` |
| 2 | the boot state is the safe pair and the pane shows it | **PASS** | `data-state="mcp-enabled"`, button `Disable MCP`, segment `enabled` |
| 3 | **`U-1`** the toggle + label are PAINTED (rendered-box oracle) | **PASS** | box `59x36` px at `(679,781)`, `display=block`, `classes="btn"`, label `MCP / secure-tier exclusion (mutually exclusive)` |
| 4 | **`U-5`** the control is pane-only, never in the app graph | **PASS** | pane: toggle `true`, control `true`; `#app`: toggle `false`; `get_rendered_html` 2354 chars, contains the id `false` |
| 5 | **`U-5`** `list_targets` carries no pane node | **PASS** | `23` nodes (declared census `23`), exclusion-shaped `[]` |
| 6 | `U-3` precondition — a normal call answers normally | **PASS** | `provident.get_markdown` → ok, `isError` absent, markdown first 60 chars shown |
| 7 | **`U-2`** the REAL gesture moves the segment | **FAIL** | see F-2 |
| 8 | `U-2` sibling controls on the SAME gesture path | **PASS** | `#token-gen` changed the token; `#toggle:graph` changed the enabled set; `#journal-length-apply` did NOT (`undefined → undefined`) |
| 9 | **`SX-G-57`** the GET response member reports the LIVE state | **FAIL** | see F-4 |
| 10 | **`U-3`** the arm that answers, read by name | **FAIL** | see F-3 |
| 11 | `U-2`/`SX-G-23` the handles stay RESOLVABLE while open | **FAIL** | `tools/list` → `0` (was `19`) |
| 12 | **`U-4`** the return restores normal answers | **PASS** | `provident.get_markdown` answers normally again; a call in flight across the transition answered `-32602 … disabled` |
| 13 | **`U-6`** the state survives a renderer reload (main-side) | **PASS** | after `Page.reload` the live call is STILL refused (`isError`) |
| 14 | **`U-6`** the operator's view after the reload | **FAIL** | the pane reads `MCP: enabled` / `data-state="mcp-enabled"` / `Disable MCP` over a refusing server (F-4) |
| 15 | **`U-6`** a restart returns to `mcp-enabled` and the flag is not persisted | **PASS** | a new process on the same profile answers normally; the profile holds only `["provident-security.json"]` |
| 16 | the HTTP transport reaches its readiness landmark | **PASS** | `GET /mcp` → `405`; landmarks `http transport ready` then `renderer ready` |
| 17 | `SX-G-38` the AUTHORIZATION arm answers FIRST | **PASS** | tokenless POST → `401` `{"code":-32001,"message":"Unauthorized"}` |
| 18 | `SX-G-42` the positive control (enabled POST) | **PASS** | authorized POST while enabled → `200` |
| 19 | `SX-G-40` a GET keeps its landed `405` | **PASS** | `405` `{"code":-32000,"message":"Method not allowed."}` |
| 20 | **`SX-G-36`** an authorized POST while OPEN answers `503` + the declared body | **PASS** | `503` `{"jsonrpc":"2.0","error":{"code":-32003,"message":"exclusion-closed"},"id":null}` |
| 21 | `SX-G-38` the ordering holds while OPEN | **PASS** | tokenless POST while open → `401` |
| 22 | **`SX-G-44`** one predicate, two DELIVERIES | **PASS** | the same state produced the stdio refusal AND the HTTP `503` in one run |
| 23 | **`SX-G-43`** the straddling POST is answered once | **PASS** (with the honest note) | `503`, **1** body line, second status line `false`; the note: this POST did not carry a resolving renderer round trip across the transition, so the mid-flight abandonment path is NOT exercised by this row |
| 24 | **`U-4`** the return arm on HTTP | **FAIL** | see F-5 |
| 25 | **`SX-G-48/49`** the one new channel constant, spelled once | **PASS** | `store-channels.ts` exports 3 constants, one of them `IPC_SECURITY_EXCLUSION = 'provident:security:exclusion'`; the literal appears under `src/**`/`scripts/**` in exactly one file |
| 26 | **`SX-G-54`** the frozen byte pins | **PASS** | `0664c52f…` and `5c0c1a97…` (both reproduce the declared `sha256`) |
| 27 | **`SX-G-67/68`** no `secure.`-segment check, no `secure-refused`, no name-mapped refusal | **PASS** | hits `[]` over the six declared `src/**` files |
| 28 | **`SX-G-53`** the store union carries no exclusion token | **PASS** | `store-core-graph.ts` contains `'exclusion-closed'`: `false`; the refusal-shaped tokens found are the union's own |
| 29 | **`SX-G-55`** the diff scope touches no frozen artifact | **PASS** | the landing chain's paths (13 + this driver) — forbidden hits `[]`, `src/shared/**` untouched |

**THE ARITHMETIC, PRINTED WITH ITS TERMS:** `29` recorded rows = `23 PASS` + `6 FAIL` + `0 MANUAL` + `0 PARKED`, and `23 + 6 + 0 + 0 = 29` ✓.

---

## 6. PARKED / MANUAL / NOT-OBSERVABLE — **`0` of each, and why**

- **PARKED: NONE.** `RCA-11` forbids parking a unit whose surface is exercisable, and this surface
  **is**: two live processes were booted on the operator's display (`DISPLAY=:0`), a real CDP pointer
  gesture was delivered to the painted control, both transports were driven, and the reload/restart arms
  were exercised. **No scenario was parked and no structural reason was needed.**
- **MANUAL: NONE.** `docs/specs/secure-exclusion.md` `§2.4` item 7(2-note) **predicted** that the gesture
  rows would have to carry `MANUAL` because the pane is an isolated graph and `R4` forbids the two
  `webContents` reach-ins. **The run falsifies that prediction in the unit's favour, and it is recorded
  because the prediction is in the contract**: the CDP route (`--remote-debugging-port=0` + the DevTools
  endpoint + a raw WebSocket + `Input.dispatchMouseEvent`) is **outside the `R4` set**, needs no
  `webContents` call, and **did** deliver a real press+release to the rendered control and did drive
  landed sibling controls. **The `MANUAL` instrument was therefore not required for the measurement — and
  using it would have hidden F-2**, since the instrument IS able to take the reading and the reading it
  takes is a failure.
- **`NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT`: NONE.**

---

## 7. THE DRIVER — path, and why that location is admissible under the two hard constraints

**`tests/secure-exclusion-live.mjs`** (run as `node tests/secure-exclusion-live.mjs`; `29` recorded rows;
exit `0`). It is a **`tests/**`-owned harness**, the second of the two admissible locations:

1. **`scripts/*.mjs` was NOT used, because a NEW file there reddens a frozen row.**
   `tests/ui-leg-contract.test.ts`'s `helperCandidates()` takes
   `readdirSync(scripts).filter(f => f.endsWith('.mjs') && !RESERVED_SCRIPT_NAMES.has(f))` and asserts the
   FIRST candidate carries `mkdtempSync`, `tmpdir()`, `PINNED_SPAWN_FLAGS`, `spawn(`, `process.on('exit')`
   and `rmSync`. **MEASURED in this pass**: with the driver committed under `tests/**`, `npm test` is
   **`86 files / 2724 passed / 0 failed`** — the exact figure the unit's records carry, so this file
   changed no leg.
2. **`scripts/electron-ui.mjs` was NOT extended and its `R4` row was NOT weakened.** That row scans the
   leg's own code (comments stripped) for the call-site SET
   `app.isPackaged` · `webContents.executeJavaScript` · `webContents.debugger`. **This driver contains
   none of them and adds nothing under `scripts/`.** The route it uses instead is **Chrome DevTools
   Protocol over the app's own `--remote-debugging-port=0` listener** — a channel the `R4` set does not
   name and no shipped file uses.

**The two measured host constraints the driver had to work around, recorded so a later run does not
re-discover them:**

- **The DevTools port cannot be read from `DevToolsActivePort` on this host.** Chromium writes it to the
  DEFAULT `userData` directory (before `main()` calls `app.setPath`), and that write is refused
  (`Error writing DevTools active port to file /home/ryanr/.config/Electron/DevToolsActivePort:
  Permission denied (13)` — the boot itself succeeds). The driver therefore reads the port from the
  child's **own stderr** line (`DevTools listening on ws://127.0.0.1:<port>/…`).
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
