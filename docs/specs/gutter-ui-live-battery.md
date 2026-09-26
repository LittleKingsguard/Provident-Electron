# `U-GUTTER-UI` (`E10`) — **GATE 6: THE LIVE / UI BATTERY** (2026-09-27)

**Status of this record: `OPEN / LIVE-PENDING` — NOT green, NOT a pass.** The live battery was RUN, on a
real boot, with the project's own driver; **leg 5 could not take its measurement (exit `2`,
`PRECONDITION-FAILED`)**, **the precondition (`npm run divergence`) is RED (exit `1`, 5 of 9 checks
failing)**, and **six live findings contradict the unit's filed `§5.U` Post observations**, two of them
(`U-5`'s dragged-value reading and `U-8`(e)'s second-gesture reading, both TIGHTENED by `§R.4` `C-A5`)
**FAIL against the live app**. This document is the gate-6 record the DONE row will quote; it is the
runner's MANUAL record (`§5.U` item 2: no shipped instrument emits the coverage report) and it is
**filled from the runs below, never authored**.

| | |
| --- | --- |
| **Unit** | `U-GUTTER-UI` — wave **E**, ledger row `E10` |
| **Contract executed** | `docs/specs/gutter-ui.md` `§5.2` (the SEVEN legs) · `§5.3` item 6 · `§5.U` (the 8-row matrix, item 2's report, item 4's table, `C-A6`'s six clauses) · `§R.4` `C-A5` |
| **Source revision** | `42317ca` (HEAD, unchanged before and after this run) |
| **Tree state at run** | **NOT clean**: `42317ca` + **UNTRACKED scratch test files** (`tests/gutter-ui-greens-blind.test.ts`, `tests/zz-probe*.test.ts` — **7 at the first check, 13 by the end**) written by a **concurrent gate-5 blind pass** (mtimes 17:11–17:12, during this battery). **The only file THIS pass wrote is this one.** **No tracked file was modified and no `src/**` file changed** — verified with `git status --porcelain` and `git rev-parse HEAD` immediately before the divergence leg and again after the CDP work (HEAD `42317ca`, zero tracked modifications both times), so the *"same source revision, no intervening source edit"* claim holds. |
| **Runner** | live-scenario runner (gate 6). **NO HUMAN OPERATOR WAS PRESENT THIS PASS.** |
| **Files written** | **this file only** |

---

## 1. THE LEG TABLE — exact command, exit code, verbatim result line

| # | Command (exact, as run) | Exit | Verbatim result line / observed value | Layer |
| --- | --- | --- | --- | --- |
| **1** | `npm run divergence` | **`1`** | **`R13 RESULT: 9 checks, 5 failures`** (the `N = 9` leg; 4 checks green, 5 red) | `[H]`+`[D]` |
| **2** | `npm run ui` | **`2`** | **`PRECONDITION-FAILED — \`npm run divergence\` is not green for the same built tree`** · `divergence result line (verbatim): R13 RESULT: 9 checks, 5 failures` · `divergence exit code: 1` · **`NO MEASUREMENT TAKEN (ci-ui-leg.md §3.1 step 2, §5 PRE-1/PRE-3).`** — **there is NO `UI RESULT:` line and NO measurement this pass**; `tree digest before: dist/main/main.cjs sha256=802fc6c4e04174ca… provident-ssr@0.5.1 (declared pin: ^0.5.1)` | `[U]` |
| **2a** | the leg's retry label | — | `retry budget: 4 attempt(s) per boot (max 4), handshake timeout 30000 ms/attempt`, backoff 250/500/1000 ms, per-boot ceiling 121750 ms — **`attempt=1`, `retries=0`**: the retry path is the boot HANDSHAKE path and a precondition failure is not retried | `[U]` |
| **3** | `./node_modules/.bin/electron . --no-sandbox --disable-dev-shm-usage --user-data-dir=/tmp/pe-e10-live-kt5E --remote-debugging-port=9333` | (background, held open for the whole sequence) | `[provident-mcp] http transport ready on http://127.0.0.1:3787/mcp` · `[provident-main] renderer ready — MCP backend armed` · `DevTools listening on ws://127.0.0.1:9333/devtools/browser/7decc2f1-c12f-4c3b-a55c-c3c6e980d062`. **Plain `electron .` was NOT attempted** — the host fact (SUID sandbox / `SIGTRAP`) is already recorded; the pinned flags were used, and **ONE boot served every reading below (no restart)**. | `[U]` |
| **4** | `npm run mcp -- --target http --port 3787 targets` | **`0`** | **18 nodes**; `node-12` = `{nodeId:"node-12", cssId:"gutter-vertical", propsId:"gutter-vertical", type:"div", state:"in-tree", handlers:[{name:"gutter-drag", event:"pointerdown"}]}`; also `node-9 gutter-card`, `node-11 gutter-pane` (`size=100 min=0 max=200 resizable=true`), `node-13 gutter-target`, `node-14 gutter-status` (`content:"100"`); JSON 4225 bytes | `[H]` |
| **5** | `npm run mcp -- --target http --port 3787 html` | **`0`** | `renderedHtml` **1758 bytes**; `census {"registered":18,"inTree":18,"unplaced":0,"destroyed":0,"prototypes":0}`; **18 `data-node-id` attributes, `node-1` … `node-18`**; affordance element line verbatim: **`<div data-wire="node-12" id="gutter-vertical" axis="gutter-vertical" class="gutter-handle" data-node-id="node-12">`** — **no `cursor` declaration and no `style` attribute** | `[H]` |
| **6** | `npm run mcp -- --target http --port 3787 dispatch gutter-vertical pointerdown` | **`0`** | **`{"results":[null],"dirtied":[]}`** (the authored handler `gutter-drag` is provident-reachable; `ssrHtml` carries `onpointerdown="true"` on the same element) | `[H]` |
| **7** | `npm run mcp -- --target http --port 3787 op '{"kind":"state-slice","node":"gutter-status","mutation":[{"targetProp":"content","mode":"replace","value":"7"}]}'` | **`1`** | `mcp-cli error: Unexpected token 'M', "MCP error "…` — **`provident.op` is NOT exposed on a default live boot**; `tools` returns exactly 7 (`provident.dispatch`, `provident.get_rendered_html`, `provident.get_markdown`, `provident.list_targets`, `provident.get_node_state`, `provident.code.get`, `provident.code.validate`). Recorded, not worked around. | `[H]` |
| **8** | `node scripts/mcp-cli.mjs --target http --port 3787 node-state gutter-status` (also `gutter-vertical`, `gutter-target`) | **`0`** | graph reads: `node-14` content **`"100"`**, `node-12` content **`""`**, `node-13` content `"resizable pane"`, all `state:"in-tree"` | `[H]` |
| **9** | `node scripts/mcp-cli.mjs --target http --port 3787 run '[{"cmd":"provident.get_markdown","args":{}}]'` | **`0`** | `"markdown": "# Provident-Electron — MCP endpoint demo\n## Counter\n0\n…\n## Gutter \\(drag to resize\\)\nresizable pane\n100\n## Echo (input -> echo-out)\n(nothing yet)"` — **note: the affordance node contributes NO text of its own** | `[H]` |

**THE PRECONDITION CLAIM, IN ITS HONEST FORM** (`§5.2` leg 5's `C-A8` note; `§R.2` `R-16`): `npm run
divergence` was run **on the same source revision `42317ca`, immediately before the `ui` leg, with no
intervening source edit** — and both legs REBUILD, so **no shared "built tree" is claimed and none
exists**. The claim is nonetheless **unsatisfied, because the precondition is RED**.

### 1a. WHY THE PRECONDITION IS RED (measured + source-verified)

`scripts/electron-divergence.mjs` compares the REAL Electron boot against the shim battery host **fed a
HAND-COPIED envelope literal inside the script** (`demoEnvelope()`, whose own comment says *"12 nodes:
root + h1 + counter-card + h2 + counter + 3 buttons + echo-card + h2 + input + echo-out"*). The renderer
boots `src/shared/demo-envelope.ts`, which **grew 12 → 18 nodes at `6f6a011`** — this unit's own
implementer pass, which authored the gutter card. Measured:

* `electron=18 shim=12` ⇒ `census inTree`, `census registered`, `SSR fragment`, `data-node-id set` and
  `nodeId vocabulary` all FAIL; the four that stay green are `dirtied ids`, `counter increment in BOTH`,
  `dispatch results non-empty in BOTH (R7)` and `electron: dispatch renderedNonEmpty`.
* `git show 42317ca^:src/shared/demo-envelope.ts | grep -c "type: '"` → **18** (the card is already in
  the parent commit); `git show b448279:…` → **12**; the divergence script's inline copy has carried
  **12** nodes since `f514657` (wave C). **The divergence leg has therefore been RED since `6f6a011`,
  the whole of this unit's landing, and this battery is the first run to see it.**
* Owner of the remedy: **a pass on `scripts/**`, which is in THIS unit's DENIED set (`§5.1` item 6)** —
  so the unit could not have fixed it, and the supervisor must route it (either the harness imports the
  built `src/shared/demo-envelope` demo, or the card's census is re-mirrored in the harness literal).

---

## 2. THE `§5.U` COVERAGE REPORT — `summary.total === 8`, three verdict counts summing to it

```json
{
  "unit": "U-GUTTER-UI",
  "matrixSource": "docs/specs/gutter-ui.md §5.U",
  "predicateSource": "docs/specs/user-flow-audit.md §7.1",
  "predicateSourcePresent": false,
  "emitter": "MANUAL",
  "rows": [
    {
      "u": "U-1",
      "layer": "U|H",
      "instrument": "npm start + npm run mcp -- --target http --port 3787 targets",
      "cmd": "npm run mcp -- --target http --port 3787 targets",
      "exit": 0,
      "observation": "18 targets; node-12 cssId=gutter-vertical propsId=gutter-vertical type=div state=in-tree handlers=[{name:gutter-drag,event:pointerdown}]; node-9 gutter-card, node-11 gutter-pane(size=100 min=0 max=200 resizable=true), node-13 gutter-target, node-14 gutter-status(content=\"100\"); JSON 4225 bytes",
      "verdict": "CHANGED"
    },
    {
      "u": "U-2",
      "layer": "U",
      "instrument": "npm run mcp -- --target http --port 3787 html + MANUAL OPERATOR (hover half)",
      "cmd": "npm run mcp -- --target http --port 3787 html",
      "exit": 0,
      "observation": "(a) the affordance element's rendered markup is <div data-wire=\"node-12\" id=\"gutter-vertical\" axis=\"gutter-vertical\" class=\"gutter-handle\" data-node-id=\"node-12\"> — it carries NO authored base cursor declaration in the initial boot reading, and src/renderer/index.html carries no .gutter-handle rule and no cursor declaration anywhere; (b) hover half: NO HUMAN OPERATOR WAS PRESENT — not taken by the filed instrument",
      "verdict": "CHANGED",
      "contradiction": "U-2(a)'s filed Post observation ('the authored base cursor declaration is present in get_rendered_html') is NOT satisfied at 42317ca: no cursor declaration exists in the card, the markup or any authored CSS.",
      "additive": "ADDITIVE — NOT-IN-THE-CLOSED-INSTRUMENT-SET: a pointerover on the connected handle (CDP Runtime.evaluate, untrusted PointerEvent) makes the module write it, and the SHIPPED html read then carries it: <div data-wire=\"node-12\" id=\"gutter-vertical\" axis=\"gutter-vertical\" class=\"gutter-handle\" data-node-id=\"node-12\" style=\"cursor: col-resize;\"> (renderedHtml 1758 -> 1801 bytes); pointerout clears it back to style=\"\". So the module's cursor WRITE is live and visible, while the AUTHORED base declaration is absent."
    },
    {
      "u": "U-3",
      "layer": "U",
      "instrument": "MANUAL OPERATOR",
      "cmd": "MANUAL",
      "exit": 0,
      "observation": "NO HUMAN OPERATOR WAS PRESENT THIS PASS — the operator observation the row requires is NOT taken, and no tool output is substituted for it.",
      "verdict": "NOT-OBSERVABLE",
      "reason": "NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT: no shipped instrument carries a pointer coordinate or a pointer button (provident.dispatch carries an event NAME and no coordinates), and no shipped instrument carries a transient style write; the row's own discharge is a MANUAL OPERATOR record, which this pass could not take. STRUCTURALLY HARDER THAN THE ROW ASSUMED: the affordance element renders with a ZERO-AREA box (w=390.5, h=0), so a real primary press cannot land on it at all — see finding L-2.",
      "additive": "ADDITIVE — NOT-IN-THE-CLOSED-INSTRUMENT-SET: real renderer input (CDP Input.dispatchMouseEvent mousePressed at the handle box centre 245,425) produces NO effect (no cursor write, no content change, no geometry change); DOMDebugger.getEventListeners on node-12 reports 6 listeners — THREE pointerdown (the session's own install, E3's controller, this module), plus pointerover, pointerout, pointermove — so a pointerdown that DID reach the element would reach the composition. The gesture was driven anyway through the element's own listeners (untrusted PointerEvents on the connected node, pointerId 11/12, clientX 95/175/315) and reached the composition without any graph effect."
    },
    {
      "u": "U-4",
      "layer": "U",
      "instrument": "MANUAL OPERATOR",
      "cmd": "MANUAL",
      "exit": 0,
      "observation": "NO HUMAN OPERATOR WAS PRESENT THIS PASS — the operator observation the row requires is NOT taken (the row's second half is the shipped read-back npm run mcp -- --target http --port 3787 html, taken and recorded in U-5).",
      "verdict": "NOT-OBSERVABLE",
      "reason": "NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT: the preview is a transient write no shipped instrument drives (it is driven by a pointer coordinate) and no shipped instrument carries a pointer coordinate; the row's discharge is a MANUAL OPERATOR record.",
      "contradiction": "U-4's filed Post observation ('the target's live rendered geometry changes with the pointer during the drag (the preview channel)') is NOT satisfied in the live app: the target's rendered box is byte-identical (x=50, y=424.88, w=390.5, h=22) before the press, after the press, after each of three moves, and after the release. Additionally the wiring's applyPreview patches the AFFORDANCE element (`write(element, state.value)`, src/renderer/renderer.ts), not the target: no pane size/style/geometry write exists on the preview path at all.",
      "additive": "ADDITIVE — NOT-IN-THE-CLOSED-INSTRUMENT-SET: geometry read with getBoundingClientRect() in the renderer over the CDP page target, during a driven gesture (three clientX positions), plus the real-input gesture."
    },
    {
      "u": "U-5",
      "layer": "U|H",
      "instrument": "MANUAL OPERATOR + npm run mcp -- --target http --port 3787 html",
      "cmd": "MANUAL, then npm run mcp -- --target http --port 3787 html",
      "exit": 0,
      "observation": "authored status node (node-14, id=gutter-status) content read back through the shipped html AND through node-state: 100 BEFORE every gesture and 100 AFTER every gesture; the pane's authored size (startSizeOf) is 100, so the pre-drag size is 100 and the read-back EQUALS the pre-drag size.",
      "verdict": "UNCHANGED",
      "reading_C_A5": {
        "dragged_value_reading": "FAIL — the status node never carries the value the operator dragged to: it carries 100, the pre-drag size, after every gesture.",
        "negative_control_pre_drag_size": "SATISFIES the read (100 == 100) — and by §R.4 C-A5's own words 'a record in which the pre-drag size satisfies the reading FAILS the row'.",
        "negative_control_undefined_no_write": "ALSO SATISFIES it: no commit write lands at all (the status node's graph content is unchanged, and a sentinel pre-drag size of 55 / 77 was likewise never written — see the apparatus note below).",
        "verdict_reading": "FAIL"
      },
      "additive": "ADDITIVE — NOT-IN-THE-CLOSED-INSTRUMENT-SET: because the pre-drag size (100) and the authored status content ('100') COINCIDE, a landed commit of the pre-drag size would have been invisible; an APPARATUS-ONLY `data-size` was therefore injected on the pane (55, then 77) — the very DATA key the example seam startSizeOf reads — so that a landed commit of the clamped pre-drag size WOULD be visible. Two full gestures were then driven (pointerover, pointerdown, three pointermoves with real clientX, pointerup) and the status node still read 100 in the DOM, 100 in the shipped html, and 100 in the shipped node-state. No write lands."
    },
    {
      "u": "U-6",
      "layer": "U|H",
      "instrument": "MANUAL OPERATOR",
      "cmd": "MANUAL",
      "exit": 0,
      "observation": "NO HUMAN OPERATOR WAS PRESENT THIS PASS — the operator observation the row requires is NOT taken; the [H] before/after pair IS taken and reads UNCHANGED (status content 100 before and after every gesture).",
      "verdict": "NOT-OBSERVABLE",
      "reason": "NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT: no shipped instrument carries a pointer button (a right-click cannot be dispatched through provident.dispatch) and none reads a transient style write.",
      "contradiction": "the [H] pair the row relies on to establish 'zero sink writes' has NO discriminating power in the live app: the status node reads 100 before and after EVERY gesture, including the ones that must have committed something (a valid drag) and the ones that must not (a drop). An unchanged pair is therefore not evidence of a zero here.",
      "additive": "ADDITIVE — NOT-IN-THE-CLOSED-INSTRUMENT-SET: a driven gesture followed by a right button press+release on the same element produced no observable change (status 100 -> 100, target box unchanged)."
    },
    {
      "u": "U-7",
      "layer": "U|H",
      "instrument": "npm run mcp -- --target http --port 3787 targets and npm run mcp -- --target http --port 3787 html, before and after",
      "cmd": "npm run mcp -- --target http --port 3787 targets",
      "exit": 0,
      "observation": "AFTER: 18 nodes (node-1..node-18); census {\"registered\":18,\"inTree\":18,\"unplaced\":0,\"destroyed\":0,\"prototypes\":0}; renderedHtml 1758 bytes; 18 data-node-id attributes node-1..node-18; the card's nodes node-9..node-14 appear in BOTH views. BEFORE (measured by the supervisor from a worktree of the PRE-CARD tree at 019e0e6, /tmp/pre-card-readings.md): 12 nodes, targets JSON 1819 bytes, no gutter-vertical cssId anywhere, renderedHtml 1099 bytes, census {\"registered\":12,\"inTree\":12,…}, 12 data-node-id attributes node-1..node-12. DELTA: +6 nodes, +659 renderedHtml bytes. get_markdown: NO dedicated command exists in scripts/mcp-cli.mjs; the AFTER reading was taken through the CLI's shipped `run` command and the markdown text carries '## Gutter (drag to resize) / resizable pane / 100' with NO text from the affordance node itself; NO BEFORE markdown reading was ever recorded.",
      "verdict": "CHANGED",
      "before": "12 nodes / targets JSON 1819 bytes / renderedHtml 1099 bytes / census 12 registered-12 in-tree / data-node-id node-1..node-12 / no gutter-vertical cssId (pre-card worktree 019e0e6, supervisor's record /tmp/pre-card-readings.md)"
    },
    {
      "u": "U-8",
      "layer": "U|H",
      "instrument": "npm start; npm run mcp -- --target http --port 3787 targets; npm run mcp -- --target http --port 3787 html; npm run mcp -- --target http --port 3787 dispatch gutter-vertical pointerdown; MANUAL OPERATOR",
      "cmd": "npm run mcp -- --target http --port 3787 dispatch gutter-vertical pointerdown",
      "exit": 0,
      "observation": "(a) targets (exit 0) carries cssId=gutter-vertical AND propsId=gutter-vertical; (b) html (exit 0) carries data-node-id=\"node-12\" for the affordance element and node-1..node-18 overall; (c) dispatch (exit 0) answers {\"results\":[null],\"dirtied\":[]} for the authored handler gutter-drag; (d) all four readings were taken inside ONE boot with no restart; (e)(1) PASS — across the commit write the affordance is the SAME element object (window.__e10handle === document.querySelector('[data-node-id=\"node-12\"]') -> true; isConnected true; exactly 1 element carries data-node-id=\"node-12\"; the html readings before and after both carry data-node-id=\"node-12\"); (e)(2) FAIL — the second gesture's committed value is NOT recorded because NO value is committed: the status node reads 100 after the second gesture, which EQUALS the pre-drag size (negative control: the pre-drag size SATISFIES the read) and EQUALS the first gesture's committed value (100 == 100). NO HUMAN OPERATOR WAS PRESENT for (e).",
      "verdict": "CHANGED",
      "reading_C_A5": {
        "second_gesture_committed_value": "FAIL — 100, i.e. the pre-drag size; no dragged value is committed on either gesture.",
        "negative_control_pre_drag_size": "SATISFIES the read (100 == 100) — FAILS the row by §R.4 C-A5's own rule.",
        "first_vs_second_comparison": "IDENTICAL (100 == 100) — the record reports the two committed values as a comparison, and they DO NOT DIFFER, which FAILS the row.",
        "e1_element_identity": "PASS — same data-node-id in both html readings AND object identity held across the commit write."
      },
      "additive": "ADDITIVE — NOT-IN-THE-CLOSED-INSTRUMENT-SET: (e)(1)'s object identity was taken with an apparatus probe (window.__e10handle captured before the gesture, compared with a fresh querySelector afterwards; identity true, isConnected true, count 1); (e)(2) was taken with the pane data-size sentinel (55, then 77) so that a committed pre-drag size would be visible: the status content stayed 100 after both gestures."
    }
  ],
  "summary": { "total": 8, "changed": 4, "unchanged": 1, "notObservable": 3 },
  "commands": [
    { "cmd": "npm run divergence", "exit": 1, "observed": "R13 RESULT: 9 checks, 5 failures (electron=18 shim=12 on census inTree and census registered; SSR fragment, data-node-id set and nodeId vocabulary also FAIL)" },
    { "cmd": "npm run ui", "exit": 2, "observed": "PRECONDITION-FAILED — `npm run divergence` is not green for the same built tree; divergence exit code: 1; NO MEASUREMENT TAKEN; no UI RESULT line exists this pass; attempt=1, retries=0; tree digest before: dist/main/main.cjs sha256=802fc6c4e04174ca…" },
    { "cmd": "./node_modules/.bin/electron . --no-sandbox --disable-dev-shm-usage --user-data-dir=/tmp/pe-e10-live-kt5E --remote-debugging-port=9333", "exit": 0, "observed": "[provident-mcp] http transport ready on http://127.0.0.1:3787/mcp; [provident-main] renderer ready — MCP backend armed; DevTools listening on ws://127.0.0.1:9333/devtools/browser/7decc2f1-c12f-4c3b-a55c-c3c6e980d062 (ONE boot served every reading)" },
    { "cmd": "npm run mcp -- --target http --port 3787 targets", "exit": 0, "observed": "18 nodes; node-12 cssId+propsId gutter-vertical handlers=[gutter-drag/pointerdown]; node-9..node-14 = the authored card; JSON 4225 bytes" },
    { "cmd": "npm run mcp -- --target http --port 3787 html", "exit": 0, "observed": "renderedHtml 1758 bytes; census {\"registered\":18,\"inTree\":18,\"unplaced\":0,\"destroyed\":0,\"prototypes\":0}; 18 data-node-id node-1..node-18; affordance line has NO cursor declaration" },
    { "cmd": "npm run mcp -- --target http --port 3787 dispatch gutter-vertical pointerdown", "exit": 0, "observed": "{\"results\":[null],\"dirtied\":[]}" },
    { "cmd": "npm run mcp -- --target http --port 3787 op '{\"kind\":\"state-slice\",\"node\":\"gutter-status\",\"mutation\":[{\"targetProp\":\"content\",\"mode\":\"replace\",\"value\":\"7\"}]}'", "exit": 1, "observed": "provident.op is NOT exposed on a default live boot (tools: 7 tools) — no sentinel write is available through a shipped instrument" },
    { "cmd": "node scripts/mcp-cli.mjs --target http --port 3787 tools", "exit": 0, "observed": "[\"provident.dispatch\",\"provident.get_rendered_html\",\"provident.get_markdown\",\"provident.list_targets\",\"provident.get_node_state\",\"provident.code.get\",\"provident.code.validate\"]" },
    { "cmd": "node scripts/mcp-cli.mjs --target http --port 3787 node-state gutter-status", "exit": 0, "observed": "nodeId node-14, content \"100\", state in-tree (also node-12 content \"\", node-13 content \"resizable pane\")" },
    { "cmd": "node scripts/mcp-cli.mjs --target http --port 3787 run '[{\"cmd\":\"provident.get_markdown\",\"args\":{}}]'", "exit": 0, "observed": "markdown carries '## Gutter (drag to resize) / resizable pane / 100'; the affordance node contributes no text; no dedicated get_markdown command exists in the CLI" },
    { "cmd": "MANUAL", "exit": 0, "observed": "U-3 / U-4 / U-6 operator observations NOT TAKEN — no human operator was present this pass" }
  ]
}
```

### 2a. THE FOUR FALSIFIABLE CLAUSES, CHECKED (`§5.U` item 3 + `§R.4` `C-A6`)

1. **`summary.total === 8`** and **`4 CHANGED + 1 UNCHANGED + 3 NOT-OBSERVABLE = 8`** — the report's row set
   is exactly the matrix's row set `U-1`…`U-8`, in matrix order, with no id added or dropped. ✔
2. **Every `instrument` is from the CLOSED SET** (`npm run ui` · `npm run mcp -- --target http --port 3787
   <tool>` · `npm start` · `MANUAL OPERATOR`) — no row says *"the live gate"* or *"the leg"*. ✔
3. **Every `cmd` is the item-4 literal or the literal token `MANUAL`**, each with its own `exit`. ✔
4. **Every `MANUAL` row's `observation` is an operator observation and never a tool's output line** —
   **and since NO HUMAN OPERATOR WAS PRESENT, those three rows record the honest third form: the operator
   observation is NOT TAKEN, no tool output is substituted for it, and the apparatus reading is filed
   separately under `additive`.** The two are not blurred in either direction. ✔
5. **`U-3`/`U-4`/`U-6` carry `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT`** with the structural reason
   *no shipped instrument carries a pointer coordinate and none reads a transient style write* — plus, for
   `U-3`/`U-4`, the **harder structural fact** that the affordance renders with no area at all (finding
   L-2), so even a human's real pointer cannot exercise it. ✔
6. **`U-GAP-1` is recorded OPEN with `predicateSourcePresent: false`** — `docs/specs/user-flow-audit.md`
   does not exist (globbed `docs/**/*user-flow*` this pass → no files). Owner: the next documentation/spec
   pass or a recorded non-adoption; revisit before the next UI-overhaul unit's live-battery gate. ✔

**ONE MEASURED CORRECTION TO CLAUSE 5's REASON, recorded rather than smoothed:** the assertion *"none reads
a transient style write"* is **not exactly true of the style-attribute case**. The shipped `html`
read-out reflects the mount's live markup, and a style write on the element **does** appear in it —
measured: after a hover, `npm run mcp -- --target http --port 3787 html` returns the affordance element as
`… data-node-id="node-12" style="cursor: col-resize;">` (the read grew 1758 → 1801 bytes), and `pointerout`
clears it back to `style=""`. The reason is therefore correct for COMPUTED styles and for the absence of a
coordinate, and the label stands; the reason's second clause should be corrected at the next proofreader
pass to *"none reads a computed style"*.

---

## 3. THE TWO TIGHTENED READINGS (`§R.4` `C-A5`) — both MANDATORY, both FAIL

### 3a. `U-5` — THE DRAGGED-VALUE READING, WITH ITS NEGATIVE CONTROL

| Step | The exact reading | Value |
| --- | --- | --- |
| pre-drag | authored status node `gutter-status` (node-14) content, shipped `html` + `node-state` | **`100`** |
| pre-drag size (the comparand) | the pane's authored size the example's `startSizeOf` reads (`size="100"` / fallback 100) | **`100`** |
| the drag | real renderer input (CDP `Input.dispatchMouseEvent` press/moves/release over the handle box) and, because the handle has no area, a gesture driven through the element's own six listeners with real `clientX` values 95/175/315 | **no change of any kind** |
| post-drag | status content, shipped `html` (exit 0) and shipped `node-state` (exit 0) | **`100`** |
| **dragged-value reading** | does the status node carry the value the operator actually dragged to? | **NO — it carries `100`, the pre-drag size** |
| **negative control** (pre-drag size as comparand) | **the pre-drag size SATISFIES the read** (`100 == 100`) | **the row FAILS by `C-A5`'s own rule** |
| negative control #2 (`undefined` / no write) | a sentinel pre-drag size of **55**, then **77**, was injected as the pane's `data-size` (the exact DATA key the example seam reads) so that a landed commit of the clamped pre-drag size WOULD be visible; two full gestures followed; the status node still read **`100`** in the DOM, in `html` and in `node-state` | **ALSO SATISFIES the read: no sink write lands at all** |

**`U-5`: FAIL.** The pre-drag size satisfies the reading, and so does the no-write case; **no dragged value
is ever committed in the live app.**

### 3b. `U-8` READING `(e)` — THE SECOND GESTURE

| Reading | Result |
| --- | --- |
| **(e)(1) same element object across the commit write** | **PASS** — `data-node-id="node-12"` in the `html` readings before and after the commit; **object identity held** (`window.__e10handle === document.querySelector('[data-node-id="node-12"]')` → `true`); `isConnected` `true`; exactly **1** element carries `data-node-id="node-12"`; the wiring performs no rebind. |
| **(e)(2) the SECOND gesture's COMMITTED VALUE** | **FAIL** — after the second gesture the status node reads **`100`**. Compared against the **pre-drag size** (`100`): the negative control **SATISFIES** the read, which fails the row. Compared against the **FIRST commit's value** (`100`): **IDENTICAL — the two do not differ**, which fails the row. The second gesture was driven with the same apparatus sentinel discipline (`data-size` 55 for gesture 1, 77 for gesture 2) so a committed pre-drag size would have been visible; neither number appears anywhere. |
| what was NOT reported | the record does **not** stop at *"the status content changed again"* — it reports the two committed values as an explicit comparison, and they are equal. |

**`U-8`(e): FAIL on the tightened reading** (its `(e)(1)` half passes).

---

## 4. THE ADDITIVE APPARATUS — WHAT IT IS, AND WHAT IT IS NOT

**Everything in this section is labelled `ADDITIVE — NOT-IN-THE-CLOSED-INSTRUMENT-SET`. It is apparatus,
never a contractual instrument, and NO row's filed `instrument` label or `verdict` was changed by it.**

| # | Mechanism (exact) | What it took |
| --- | --- | --- |
| **A1** | the app booted with **one extra additive flag**, `--remote-debugging-port=9333` (the pinned flags are otherwise unchanged), then `node /tmp/e10-cdp.mjs` attaching to `ws://127.0.0.1:9333/devtools/page/A19C8C1EEBF0BED431FE4C1365D8587E` and issuing **`Input.dispatchMouseEvent`** `mousePressed`/`mouseMoved`×3/`mouseReleased` over the handle's box | **real renderer input**: the handle's box is `x=50, y=424.88, w=390.5, h=0` → hit-testing cannot land on it; status `100` before and after, inline cursor `""`, target box `390.5×22` unchanged, handle text `""` |
| **A2** | `node /tmp/e10-cdp-synth.mjs` — UNTRUSTED synthetic `PointerEvent`s (`pointerover`/`pointerout`/`pointerdown`/`pointermove`×3/`pointerup`) dispatched **on the connected handle element** through `Runtime.evaluate`, with real `clientX` values | hover ⇒ `handle.style.cursor = "col-resize"` (and `pointerout` clears it); the whole gesture ⇒ **no change**: status `100` at every step, handle text `""`, target/pane boxes constant |
| **A3** | `node /tmp/e10-cdp-sentinel.mjs` — the same gesture plus an **APPARATUS-ONLY `data-size`** injected on the pane (`55`, then `77`: the DATA key the example's `startSizeOf` reads) so a committed pre-drag size could not hide behind the coincidentally-equal `100` | two full gestures; status `100` after each; handle text `""` after each; object identity held |
| **A4** | `node /tmp/e10-listeners.mjs` — `DOMDebugger.getEventListeners` on the live elements | **node-12 (the affordance): 6 listeners** — three `pointerdown` (the session's own install, `E3`'s controller, this module) + `pointerover` + `pointerout` + `pointermove`; **node-11 (pane), node-14 (status), `document`: 0 listeners** |
| **A5** | reads only: `getBoundingClientRect()`, `element.dataset`, `element.attributes` in the CDP page target | the handle's live attributes are `data-wire=node-12, id=gutter-vertical, axis=gutter-vertical, class=gutter-handle, data-node-id=node-12` (+`style` after a hover); the pane's are `data-wire=node-11, id=gutter-pane, size=100, min=0, max=200, resizable=true, class=gutter-pane, data-node-id=node-11`; **`handle.dataset = {wire:"node-12", nodeId:"node-12"}` and `pane.dataset = {wire:"node-11", nodeId:"node-11"}` — the `axis`/`size`/`min`/`max`/`resizable` attributes carry NO `data-` prefix, so the example seams' `dataset[...]` reads all miss and every one of them falls back to its default** |

**A COORDINATE WAS NEVER CLAIMED THROUGH `provident.dispatch`.** `provident.dispatch` was used exactly as
the contract allows — an event NAME on an authored target (`{results:[null],dirtied:[]}`) — and every
coordinate in this record came from the CDP apparatus above, which is named and labelled as such.

---

## 5. LIVE CONTRADICTIONS OF THE UNIT'S FILED CLAIMS (findings, with measurements)

| # | Finding | The measurement | The filed claim it contradicts |
| --- | --- | --- | --- |
| **L-1** | **The mandatory leg-5 precondition is RED, and RED BECAUSE OF THIS UNIT'S OWN CARD.** | `npm run divergence` → exit `1`, `R13 RESULT: 9 checks, 5 failures`, `electron=18 shim=12`; red since `6f6a011`; `scripts/**` is DENIED to this unit | `§5.2` leg 5's precondition (*divergence green on the same source revision, immediately before, no intervening source edit*) and `§3.5 R-11` — **unsatisfied** |
| **L-2** | **The affordance has NO RENDERED AREA, so no real pointer can ever press or hover it.** The handle is an empty `<div>` with `class="gutter-handle"` and **no CSS anywhere** (`src/renderer/index.html` carries no `.gutter-handle`/`.gutter-pane`/`.gutter-target` rule at all). | live box `w=390.5, h=0`; a real CDP press at its centre produced zero effect | `U-1`'s *"the demo page has a gutter affordance"* is true in the GRAPH and in the MARKUP but false as a **user-visible, pressable affordance**; `§5.2`'s `[U]` rows (i)/(ii)/(iii) |
| **L-3** | **No authored base `cursor` declaration exists**, so `U-2`(a)'s filed reading cannot be satisfied by the shipped instrument. | element line `… class="gutter-handle" data-node-id="node-12">` — no cursor, no style; no authored CSS anywhere | `§5.U` `U-2` Post (a) and item 4's `U-2` row |
| **L-4** | **The drag can never be VALID in this composition, so the ONLY commit candidate is the reset arm — which `C-A5` exists to catch.** The wiring passes the example's `pointerOf`, which answers `null` by design (*"makes every observed move INVALID — the declared degradation of an unimplemented optional seam"*, `src/shared/demo-envelope.ts`); the module's own resolver then STANDS DOWN (`src/shared/gutter-affordance.ts` l.472–476), `sizeFromPointer` is handed `null` and throws, the clamp answers `NaN`, and every move takes the invalid arm. | the gesture reached the composition (A4: three `pointerdown` listeners on the element) and produced no value anywhere | `§5.U` `U-3`/`U-4`/`U-5`'s Post observations, and the DONE row's clause *"the coordinate is read in ONE place"* — live, the coordinate is read **nowhere** |
| **L-5** | **NO WRITE FROM THE WIRING LANDS ON THE GRAPH.** With the pre-drag size sentinel at 55 and then 77, no commit value ever appears; `U-8`(e)(2) and `U-5` therefore fail. The wiring's `write()` passes the **DOM element** returned by `Runtime.elementForNodeId` as `applyCommand`'s `node`; `Runtime.applyCommand` **rejects an object `node` that is not a registered engine Node** (`src/renderer/runtime.ts` l.439–441 with `isRegisteredNode` at l.532–536: `typeof n.id === 'string' && supervisor.getNode(n.id) === n`), and `Supervisor.getNode` is keyed by ENGINE node id (`node-N`; `node_modules/provident-ssr/dist/core/supervisor.js` l.155 `this.nodes.get(id)`), so a DOM element (`.id === 'gutter-vertical'`/`'gutter-status'`) fails the identity test and the op is refused whole. **The refusal is INVISIBLE: `write()` discards the returned `{status:'rejected'}`** (`src/renderer/renderer.ts`). **Attribution, stated honestly: the LIVE measurement is "no write lands, on either node" (the status node via `html`+`node-state`, the handle via `node-state`/DOM); the reject-route above is the SOURCE-READ mechanism and is reported as such — a second mechanism (E3's `sizeFor` answering `undefined` on the invalid arm, so its `write()` returns before the sink) is independently sufficient, so the row verdicts below do not depend on which one holds.** | status `100` after two sentinel gestures (55/77); handle content `""` in the graph and DOM; a sibling DIRECT DOM write (`applyCursor` → `holder.style.cursor`) DOES land and IS visible in `html` | `§3.1 M-19`'s single-write route, `§2.6` item 5, `§5.U` `U-5`/`U-8`(e), the DONE-row clause *"the module writes to the sink NOWHERE … one `state-slice` write of the clamped value"* |
| **L-6** | **The example seams read `dataset` keys the authored card never emits.** `axisOf`/`startSizeOf`/`boundsOf`/`resizableOf` read `element.dataset['axis'|'size'|'min'|'max'|'resizable']`, while the card emits bare `axis=`/`size=`/`min=`/`max=`/`resizable=` attributes. Every read misses and every seam falls back to its default (lucky for the cursor — the fallback token is the authored token — and for bounds/size, whose fallbacks happen to match the declared values). | A5: `handle.dataset = {wire:"node-12", nodeId:"node-12"}`, `pane.dataset = {wire:"node-11", nodeId:"node-11"}` | `§1` item 7's card description and the example's own comment *"reads the handle's authored data attributes, which are DATA"* — the authored attributes are **not** the data keys it reads |

**THE GATE 5 ARTIFACT IS ALSO OWED.** `§5.3` item 8 names **`docs/specs/gutter-ui-greens.md`** as this
unit's blind-greens set; the file **does not exist** (the contract itself records it *OWED* at
`gutter-ui.md` l.2584). A **scratch** blind test (`tests/gutter-ui-greens-blind.test.ts`, untracked,
mtime 17:11 — written concurrently with this battery) exists, but the artifact the DONE row must cite
does not. This battery was run while gates 5/7/8 were still open; **that ordering is recorded, not
repaired here.**

---

## 6. WHAT THIS BATTERY DOES **NOT** PROVE (one-line honesty statement, expanded)

**One line:** *this record proves that the live app at `42317ca` renders the authored gutter card into the
graph and the markup and that one managed write route is exercised nowhere — it does NOT prove a
user-visible, pressable, resizable gutter affordance exists, because the handle renders with zero area,
the mandatory real-DOM leg took no measurement, and no human operator was present.*

It follows that: (a) the node-suite green is **envelope/pure-layer evidence, not assembled-app evidence**;
(b) `U-3`/`U-4`/`U-6`'s filed `MANUAL OPERATOR` discharge is **INCOMPLETE this pass** and is owed to a
session with a real operator (owner: the supervisor), whatever the additive apparatus found; (c) no
`[D]` row is claimed (`U-DIVERGENCE-EXT` does not exist) and `npm run divergence`'s green was **not
available at all** — it is RED, and it was used as nothing; (d) `U-2`'s hover half and `U-4`/`U-6`'s
interaction halves were exercised only through apparatus outside the closed instrument set; (e) `U-7`'s
markdown column has **no before reading and no dedicated CLI command**, so the markdown delta is
unmeasured, not projected.

## 7. HANDOFF — WHAT THE NEXT ITERATION OF THIS RUNNER (OR THE SUPERVISOR) MUST DO

1. **Do not print this unit green.** The DONE row must record: leg 1 RED (`R13 RESULT: 9 checks, 5
   failures`, exit 1), leg 5 **exit 2 / PRECONDITION-FAILED / NO MEASUREMENT TAKEN**, `U-5` and
   `U-8`(e)(2) **FAIL** on `C-A5`'s tightened readings, and the six findings L-1…L-6 as open.
2. **Route the two blocked paths**: (i) `scripts/electron-divergence.mjs`'s hand-copied 12-node envelope
   literal (DENIED to `E10` — needs a `scripts/**` pass); (ii) the affordance's rendered area and the
   authored base cursor declaration (an authored-card/CSS pass), and the wiring's write route
   (`write()` passing a DOM element to `applyCommand`, and/or the example's `null`-answering `pointerOf`).
3. **Then re-run this battery in ONE boot** with the same pinned flags plus `--remote-debugging-port=<p>`,
   taking: `targets`/`html`/`node-state` before and after each gesture, the `U-5` dragged-value reading
   with the `data-size` sentinel (so a pre-drag-size commit cannot hide behind the authored `100`), and
   `U-8`(e)(1)+(2) on the same window.
4. **Take the three `MANUAL OPERATOR` rows with a human at the window** — they are the only rows a
   shipped instrument cannot discharge, and this pass could not discharge them.
5. **Re-open `U-GAP-1`** (`docs/specs/user-flow-audit.md` still absent, sixth+ confirmation) at the next
   proofreader pass, and correct `§5.U` clause-5's reason for the style-attribute case (§2a above).
