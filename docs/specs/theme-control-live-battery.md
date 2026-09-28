# Live battery record — `U-THEME-CONTROL` (`F1`), GATE 6: the DECLARED GATE-6 BATTERY, RUN

**Unit `U-THEME-CONTROL` · wave `F` · ledger row `F1` · contract `docs/specs/theme-control.md`
(`§5.2`'s DECLARED GATE-6 BATTERY, `§5.U`'s eight rows, `§6.1`'s coverage report) · runner = the
live-scenario runner (gate 6) · run date 2026-09-27 · source revision `c65c475` (gate-4 commit,
working tree unchanged by this battery).**

**THE BATTERY RAN — it is NOT waived, NOT parked and NOT a `STRUCTURAL` substitution.** Every
reading below is a command that was executed against a BOOTED app on this tree, with its exit code
and its observed value, and this file is `§5.2` leg 7's record. **The `ui` leg's green and the
divergence leg's output are recorded here as PRECONDITIONS, never as this control's measurement**
(`§5.2`; `S-TC-4`).

## 1. THE BOOT (one boot, window held open; no restart inside the sequence)

- **Declared:** `npm start`.
- **RUN — and the one deviation, stated rather than silently substituted:** `npm start` is
  `npm run build && electron .`, and it carries **no `--mcp-transport` flag**, so the app's own
  default applies — which is `http` **unless a `stdio` flag reaches it**; `electron .` launches with
  the base vector's `--mcp-transport=stdio` first, and `src/main/main.ts`'s `transportFromArgs`
  returns the **FIRST** match, so the literal `npm start` boots the app on the **stdio** transport and
  exposes **no `http://127.0.0.1:3787/mcp` endpoint** for the battery's declared commands to reach.
  **MEASURED: two boots through the landed base vector both printed
  `[provident-mcp] stdio transport ready` and never bound port 3787.** **The battery was therefore
  booted with the repo's OWN script key `npm run start:http`'s flag** — the same built tree, the same
  entry (`dist/main/main.cjs`), the landed base vector verbatim **except** its one transport member
  substituted in place, plus the ui leg's fresh-scratch-profile discipline
  (`--provident-user-data=<scratch>`, the §4.2 ADD-2/ADD-3 seam) so no operator profile is touched:
  `electron node_modules/electron/dist/electron dist/main/main.cjs --mcp-transport=http --no-sandbox
  --disable-gpu --disable-software-rasterizer --in-process-gpu --ozone-platform=x11
  --disable-dev-shm-usage --mcp-port=3787 --provident-user-data=/tmp/tc-gate6-profile-*`
  (exit 0; `[provident-mcp] http transport ready on http://127.0.0.1:3787/mcp`;
  `[provident-main] renderer ready — MCP backend armed`).
- **The window was held open for the whole sequence** (one process, pid recorded, alive at every
  reading below), and **all battery commands ran against that one boot.**

## 2. THE DECLARED COMMAND SEQUENCE (§5.2 items 2–6), each with its exit code

| Step | Exact command | Exit | Observed value (verbatim, abridged where marked) |
| --- | --- | --- | --- |
| 2(a) `targets` | `npm run mcp -- --target http --port 3787 targets` | **0** | **23 in-tree nodes**; the control's ids present: `theme-card` (node-19), `theme-dark` (node-21, `handlers[0]={name:'theme-set', event:'click'}`), `theme-light` (node-22, same), `theme-setting` (node-23, **both `cssId` and `propsId` = `theme-setting`**) |
| 2(b) `html` | `… html` | **0** | the card's nodes render **from the graph** with their `data-node-id`s: `node-19`/`node-20`/`node-21`/`node-22`/`node-23`; the SSR and rendered strings both carry them; **23 distinct `data-node-id` values** |
| 2(c) `node-state theme-setting` — **PRE** | `… node-state theme-setting` | **0** | `content: "dark"` (the authored initial token), `pathKey: root/node-19/node-23` |
| 3 `dispatch theme-dark click` (**as declared — no `jsonArgs`**) | `… dispatch theme-dark click` | **0** | `{"results":[null],"dirtied":["node-23","node-19","node-1"],…}` — the authored handler IS reachable and the **state node is in the dirtied reading** |
| 4 `node-state theme-setting` — **POST** | `… node-state theme-setting` | **0** | **`content: ""`** — see §3: **it DIFFERS from PRE, but it is NOT the dispatched token** |
| 3b + 4b (the declared command WITH the token argument) | `… dispatch theme-light click '["light"]'` then `… node-state theme-setting` | **0 / 0** | dispatch: `{"results":[null],"dirtied":["node-23","node-19","node-1"], renderedHtml …>light<…}`; **POST `content: "light"`** |
| U-5 negative: unresolvable target | `… dispatch no-such-node click` | **1** | `mcp-cli error: Unexpected token 'u', "unresolved"... is not valid JSON` — the tool returned the **`unresolved target`** failure text, i.e. **a not-found reading, never a fabricated success** |
| U-5 negative: reading after it | `… node-state theme-setting` | **0** | `content: "light"` — **UNCHANGED by the failed dispatch** |
| re-boot retention (no-store row) | fresh profile, **boot 2**, then `… node-state theme-setting` | **0** | **`content: "dark"`** — the AUTHORED INITIAL value; **nothing survived the restart** (`P-TC-SM-2`, ruling `A-d6`'s persistence boundary) |
| tool census, asserted **BY NAME** | seeded-scratch **boot 3**, then `… tools` | **0** | **21 names, set-equal to `tests/engine-pin-version.test.ts`'s `PINNED_TOOL_SET`**: `live-minus-pinned=[]`, `pinned-minus-live=[]`, `setEqual=true` (measured by diff, not by quote) |

**THE PRE/POST PAIR, printed as the battery demands:** **PRE `content = "dark"`** (step 2(c)) ·
**POST `content = ""`** (step 4, the declared literal) · **POST `content = "light"`** (step 4b, the
declared command plus its token argument). **PRE ≠ POST holds in both cases; POST `==` the dispatched
token holds only in the second.**

## 3. THE TWO FINDINGS THIS BATTERY REPORTS (a live/apparent contract defect and a doc drift)

**FINDING-1 (contract-vs-implementation, `U-4`'s filed text).** `§5.2` item 3 files the dispatch as
`dispatch theme-dark click` — **no `jsonArgs`** — and `§5.2` item 4 requires the POST `content` to
equal **"the dispatched token character for character"**. **MEASURED: that literal command leaves
`content` at the EMPTY STRING** (the tool passes no argument, `ctx.tree`'s handler receives
`value === undefined`, and the authored body's `value == null ? '' : String(value)` gate writes `''`).
The contract's own `§2.1` item 2(a) and the envelope's own comment (`"provident.dispatch theme-dark
click with the token as its argument"`) both say the value is the **CALLER's argument**, so the
implementation is the one the contract describes **and the filed battery command is under-specified**:
the declared sequence needs its `[jsonArgs]` (`'["light"]'` / `'["dark"]'`) for `U-4`'s "equals the
dispatched token" clause to be satisfiable. **This is a finding against `docs/specs/theme-control.md`
`§5.2` item 3/4 (a doc drift), not against the app** — the app's token carry is MEASURED WORKING
(step 4b).

**FINDING-2 (a rough edge in the shipped `dispatch` reading, not this unit's contract).** An
unresolvable target is returned by the tool as **plain failure text** while the CLI expects a JSON
body, so the driver prints a JSON-parse complaint (`Unexpected token 'u', "unresolved"…`, exit 1)
instead of the failure text itself. The **declared `U-5` semantics hold** (not-found, exit 1, content
unchanged) but the *reading* is unreadable as filed; recorded for the tracker, not fixed here.

## 4. §6.1 — THE STRUCTURED COVERAGE REPORT (matrix WITH VERDICT)

```json
{
  "unit": "U-THEME-CONTROL",
  "matrixSource": "docs/specs/theme-control.md §5.U (U-1..U-8)",
  "predicateSource": "docs/specs/user-flow-audit.md §7.1",
  "predicateSourcePresent": true,
  "emitter": "MANUAL",
  "emitterReason": "no shipped instrument emits this report; it is filled from the battery's own commands and their outputs",
  "rows": [
    { "u": "U-1", "layer": "[U]", "instrument": "npm start (boot) + npm run mcp -- --target http --port 3787 targets|html",
      "cmd": "npm run mcp -- --target http --port 3787 targets", "exit": 0,
      "observation": "23 in-tree nodes; theme-card/theme-dark/theme-light/theme-setting all present in the target vocabulary; the html reading carries node-19..node-23 with their data-node-ids",
      "verdict": "CHANGED" },
    { "u": "U-2", "layer": "[U]+[T]", "instrument": "npm run mcp -- --target http --port 3787 targets|html",
      "cmd": "npm run mcp -- --target http --port 3787 targets", "exit": 0,
      "observation": "FIVE nodes under theme-card with the declared ids; EACH button carries exactly ONE handlers entry {name:theme-set, event:click}; theme-setting carries BOTH cssId and propsId",
      "verdict": "CHANGED" },
    { "u": "U-3", "layer": "[U]", "instrument": "npm run mcp -- --target http --port 3787 dispatch",
      "cmd": "npm run mcp -- --target http --port 3787 dispatch theme-dark click", "exit": 0,
      "observation": "{results:[null], dirtied:[node-23,node-19,node-1]} — the authored handler answers and the state node is in the dirtied reading",
      "verdict": "CHANGED" },
    { "u": "U-4", "layer": "[U]", "instrument": "npm run mcp -- --target http --port 3787 node-state|dispatch",
      "cmd": "npm run mcp -- --target http --port 3787 node-state theme-setting (before) · npm run mcp -- --target http --port 3787 dispatch theme-light click '[\"light\"]' · npm run mcp -- --target http --port 3787 node-state theme-setting (after)", "exit": 0,
      "observation": "PRE content=\"dark\" → POST content=\"light\" (character for character the dispatched token). The battery's LITERAL command `dispatch theme-dark click` (no jsonArgs) writes the EMPTY string instead — FINDING-1, a §5.2 doc drift, reported not bent",
      "verdict": "CHANGED" },
    { "u": "U-5", "layer": "[U]", "instrument": "npm run mcp -- --target http --port 3787 dispatch|node-state",
      "cmd": "npm run mcp -- --target http --port 3787 dispatch no-such-node click", "exit": 1,
      "observation": "unresolvable target → the tool returns the `unresolved target` failure (CLI prints its parse complaint); the following node-state reading is UNCHANGED (content=\"light\"), so the PRE value FAILS as a post-dispatch reading and no success is fabricated",
      "verdict": "CHANGED" },
    { "u": "U-6", "layer": "[U] (structural)", "instrument": "NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT",
      "cmd": "MANUAL", "exit": null,
      "observation": "no appearance write exists to observe",
      "verdict": "NOT-OBSERVABLE",
      "reason": "STRUCTURAL: this unit writes a graph node's `content` and nothing else — no attribute, no class, no style, no stylesheet reaction — and NO shipped instrument reads an applied declaration, a computed style, an attribute/class presence or a stylesheet reaction back (the ui leg's ONE measurement is its own probe envelope's and its exclusions are its own). The battery's own readings are graph-side only (node-state content + dispatch result)" },
    { "u": "U-7", "layer": "[U]+[T]", "instrument": "node -e (the authored envelope) + npm run mcp -- --target http --port 3787 targets|html",
      "cmd": "node -e 'import(\"./src/shared/demo-envelope.ts\")…' (AUTHORED) · npm run mcp -- --target http --port 3787 targets (LOADED)", "exit": 0,
      "observation": "AUTHORED OBJECT CENSUS = 23 (18 + 5: theme-card, its h2, theme-dark, theme-light, theme-setting — the five id-bearing nodes named in the reading); LOADED CENSUS = 23 in-tree / 23 distinct data-node-ids, read from the live app. BOTH figures printed with their own command; RECONCILED: 23 = 23 — a measurement, never a projection",
      "verdict": "CHANGED" },
    { "u": "U-8", "layer": "[U]", "instrument": "npm start (boot) + the four declared npm run mcp -- --target http --port 3787 commands",
      "cmd": "npm run mcp -- --target http --port 3787 targets · … html · … node-state theme-setting · … dispatch theme-dark click", "exit": 0,
      "observation": "FOUR readings from ONE open window on ONE pid (recorded, never restarted): (a) targets carries the ids; (b) html carries the nodes' data-node-ids; (c) PRE content=\"dark\"; (d) dispatch's {results,dirtied} — followed by the POST reading, the census pair and the re-boot row. NO RESTART occurred inside the sequence",
      "verdict": "CHANGED" }
  ],
  "summary": { "total": 8, "changed": 7, "unchanged": 0, "notObservable": 1 }
}
```

**⟶ THE RUNNER'S OWN VERDICT ANNOTATION ON THE `U-5` CELL — `AUD-TC-1`, ANNOTATED BESIDE IT (`RCA-8(d)`; the `"verdict": "CHANGED"` byte of the `U-5` row above is NOT REWRITTEN, NO CELL IS FLIPPED AND NO READING IS WITHDRAWN; this annotation is placed BESIDE the matrix — after its closing fence and before the `§4` summary annotation — so the JSON block stays exactly as filed and PARSEABLE, and the `U-5` row's bytes are UNTOUCHED).** **THE DECLARED OUTCOME *IS* THE UNCHANGED READING:** the unresolvable `no-such-node` target left the state node at its PRIOR value — `content: "light"`, `§2` step 4b — with the tool's own `unresolved target` result and exit `1`, and **`§2`'s U-5 negatives sequence table files the reading after the failed dispatch as `content: "light"` — the UNCHANGED reading.** **SO THE ROW'S VERDICT FIELD IS MISLABELLED, NOT ITS READING WRONG:** the field carries the matrix's row-level `CHANGED` while the observation it sits beside is the not-found / UNCHANGED arm — **a LABEL defect and NOT a measurement defect.** **THE READINGS STAND, and none is disputed:** the `U-5` observation text, its `exit 1`, the `unresolved target` failure text and the `U-5` sequence row are all kept EXACTLY AS MEASURED, and **the correction lands HERE, beside the cell, exactly as `§9`'s `AUD-TC-1` row requires.**

**⟶ `AUD-TC-1` REACHES `§4`'s SUMMARY TOO, AND THE SUMMARY IS ANNOTATED BESIDE ITSELF, NEVER REWRITTEN (`RCA-8(d)`).** **THE AS-WRITTEN LINE ABOVE — `"summary": { "total": 8, "changed": 7, "unchanged": 0, "notObservable": 1 }` — KEEPS EVERY FIGURE AND STAYS VISIBLE.** **ANNOTATION: the `unchanged 0` count is THE SAME MISLABELLING AS THE `U-5` VERDICT CELL — the summary's own `changed 7` count includes `U-5`, whose observation is the UNCHANGED reading, so the honest reading of this summary is `changed 7` = the SEVEN rows the summary enumerates with `U-5`'s label mis-carried and the UNCHANGED arm counted nowhere.** **`total 8` · `changed 7` · `unchanged 0` · `notObservable 1` are KEPT AS FILED (no count is moved, and the `8 = 7 + 0 + 1` arithmetic still closes on the filed figures while the label defect stands); `unchanged 0` is the FILED COUNT and NOT a claim that no row's observation was unchanged.**

**⟶ THE PER-COMMAND EXIT FORM FOR THE TWO MULTI-COMMAND ROWS — `AUD-TC-2`, ADDED BESIDE THE ROWS (`RCA-8(d)`; the rows' own `cmd` and `exit` fields above are NOT REWRITTEN and NOTHING MEASURED IS WITHDRAWN).** **`§4`'s report carries ONE `cmd` and ONE `exit` per row while `U-4`'s and `U-8`'s commands are SEVERAL EACH; the per-command form is added here, and EVERY EXIT CODE IS TAKEN FROM THIS RECORD'S OWN SEQUENCE TABLE (`§2`) — NOTHING IS INVENTED, NOTHING IS RE-RUN, and where the record carries no per-command exit it is said so plainly rather than filled.** **The rows' own single-command summaries and the `U-6` row (whose command is `MANUAL` and whose `exit` is the declared `null`) are unchanged and are not duplicated here.**

| Row | `commands[]` — each command with ITS OWN exit code | Where the exits come from |
| --- | --- | --- |
| **`U-4`** | **(1)** `npm run mcp -- --target http --port 3787 node-state theme-setting` (**PRE**) — exit **`0`** · **(2)** `npm run mcp -- --target http --port 3787 dispatch theme-light click '["light"]'` — exit **`0`** · **(3)** `npm run mcp -- --target http --port 3787 node-state theme-setting` (**POST**) — exit **`0`** | **`§2`'s step-3b/4b row reads `0 / 0` for the dispatch and its POST reading, and its step-2(c) row reads `0` for the PRE reading — the three per-command exits are the sequence table's own.** |
| **`U-8`** | **(1)** `npm run mcp -- --target http --port 3787 targets` — exit **`0`** · **(2)** `npm run mcp -- --target http --port 3787 html` — exit **`0`** · **(3)** `npm run mcp -- --target http --port 3787 node-state theme-setting` — exit **`0`** · **(4)** `npm run mcp -- --target http --port 3787 dispatch theme-dark click` — exit **`0`** | **`§2`'s step-2(a)/2(b)/2(c)/3 rows — each of the four is filed with its own exit code, and each of the four reads `0`; the row's `observation` names the same four readings from ONE open window on ONE pid.** |

**NO EXIT CODE IS MISSING FROM THIS FORM, AND THAT IS STATED RATHER THAN LEFT TO BE INFERRED: `§2` files a per-command exit for EVERY command of both rows, so NOTHING here is owed as unfillable and no cell is left as a gap.** **A `commands[]` entry whose exit does not appear in `§2` would be said plainly as such — there is none.** **`U-5`'s two-command negative sequence carries its own per-command exits in `§2` (`1` for the unresolvable dispatch, `0` for the reading after it) and is dispositioned at `AUD-TC-1` above, so it is not re-tabled here.**

**THE READ-ONLY AUDIT (§6.2) IS NOT THIS RUNNER'S TO TAKE** — this report is emitted, not blessed;
`U-4`'s drifted literal (FINDING-1) and the `dispatch` failure-reading (FINDING-2) are the rows the
audit must reconcile. **⟶ ANNOTATED 2026-09-27 (THE SUPERVISOR'S GATE-7/8/10 CLOSE-OUT PASS — a dated
annotation BESIDE the sentence above, whose bytes are KEPT; `RCA-8(d)`): THE AUDIT `HAS` RUN — it is this
record's `§9`, taken by a party that authored none of the matrix — and its findings, its *"GATE 6 NOT CLOSED"*
verdict and its THREE OWED ITEMS are dispositioned in `§8`'s close-out annotation below. THIS RUNNER'S
SENTENCE STANDS AS THE RUNNER'S OWN READING OF ITS SCOPE.**

## 5. THE PRECONDITIONS (§5.2, `G-2`) — the legs' OWN measurements, never this control's

| Precondition | Command | Exit | Its own green |
| --- | --- | --- | --- |
| the `ui` leg | `npm run ui` | **0** | `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`; its ONE real measurement `427x22`; shim leg recorded `UNSUPPORTED`; scratch profiles cleaned |
| the divergence leg | `npm run divergence` | **0** | `R13 RESULT: 9 checks, 0 failures`; `EXT RESULT: 4 extension checks, 0 extension failures`; digest byte-equality held on both hosts |

**NEITHER SUBSTITUTES FOR ANY ROW ABOVE**; both measure their own surfaces (the `ui` leg its own
probe envelope, the divergence leg the shim≡real identity).

## 6. THE UNIT'S OTHER LEGS, RUN ALONGSIDE (this unit's own, by name)

| Leg | Command | Exit | Result |
| --- | --- | --- | --- |
| the unit's rows + the pinned tool census | `npx vitest run tests/engine-pin-version.test.ts tests/theme-control.test.ts` | **0** | **66 passed / 0 failed** — `tests/theme-control.test.ts` **61/61** (every gate-4 repair holds), the pinned name-set equality green |
| typecheck `[H]` | `npm run typecheck` | **0** | clean |
| test-layer typecheck `[H]` | `npm run typecheck:tests` | **0** | clean |
| build `[H]` | `npm run build` | **0** | six outputs, no renamed entry, no missing copy; renderer bundle carries the authored demo data (expected delta) |

## 7. HONEST LIMITS

1. **The boot deviation of §1 is the one place this run does not follow the contract verbatim**, and
   it is reported with its measurement (the literal `npm start` boots stdio; no 3787 endpoint). **It
   is a `§5.2` drift item for the supervisor**, not a substituted reading: the app, the entry, the
   built tree and the flags are the repo's own (`npm start`'s app + `npm run start:http`'s transport
   flag + the ui leg's profile seam).
2. **No applied-appearance reading was taken and none can be** (`U-6`); every verdict above is a
   graph-side or transport-side reading.
3. **The tool-name census needed a seeded scratch security store** (the default store enables only
   `read`+`dispatch`, which gates 14 of the 21 pinned names out of `tools/list`); the seeded store is
   the ui leg's own discipline and lives in a scratch profile — the operator's profile was never
   touched.
4. **This runner took no measurement of the group/mutating-method censuses from the live app** (no
   shipped tool exposes them): they were read **by name from the source of record** —
   `VALID_GROUPS = {read, dispatch, graph, code, module}` (`src/main/security.ts` /
   `security-store.ts`) and `MUTATING_METHODS = {dispatch, load, op, teardown, code.load,
   code.loadBatch, journal}` (`src/renderer/renderer.ts`) — **both unchanged and carrying no
   theme-control member.**
5. **`U-4`'s filed literal FAILS its own "equals the dispatched token" clause** (FINDING-1) and
   `U-5`'s failure reading is unreadable as filed (FINDING-2). **Neither is parked: the battery RAN,
   the carry works, and both are reported as OPEN items with their exact reason** — a UI unit is not
   green while a filed reading contradicts its own contract text.

## 8. DISPOSITION OF THIS RECORD'S THREE OPEN ITEMS, AND THE AUDIT THAT IS STILL OWED (annotated 2026-09-27 by the supervisor's doc-writer pass)

**WHAT THIS SECTION IS:** the **dated disposition annotation** on the record above — **every reading,
table, exit code, verdict and honest limit in `§1`–`§7` stands EXACTLY AS FILED and NOT ONE IS
REWRITTEN** (`RCA-8(d)`: annotate beside, never rewrite). **It adds no reading, moves no row id, no
term, no strategy id, no seed, no cap and no ledger count, and it measures nothing itself.**

**THE THREE ITEMS, DISPOSED — TWO CORRECTED IN THE CONTRACT'S OWN BATTERY TEXT, ONE ROUTED OUT OF
SCOPE WITH ITS OWNER.** **All three are dispositioned at their own sites in `docs/specs/theme-control.md`
`§5.2.1` (the new dated annotation under the DECLARED GATE-6 BATTERY, which keeps each as-filed
wording visible beside its correction):**

1. **`DEV-1` (this record's `§1` boot deviation / `§7` item 1) — FIXED IN THE CONTRACT TEXT.** The
   contract's battery now names **`npm run start:http`** (the repo's OWN script key —
   `npm run build && electron . --mcp-transport=http`) as **the boot that actually binds
   `http://127.0.0.1:3787/mcp`**, states that **the `stdio` default is for MCP CLIENTS and NOT for
   this battery**, and keeps the as-filed `npm start` line visible. **The record's own literal
   deviation clause `§1` is kept as written — it is superseded by the contract text, not by a rewrite
   here.**
2. **`FINDING-1` (this record's `§3`) — FIXED IN THE CONTRACT TEXT.** The filed dispatch step is
   corrected to **carry its token argument** (`dispatch theme-light click '["light"]'`), the as-filed
   no-arg literal is kept visible as the counter-example, and **this record's own measured PRE/POST
   pair — PRE `content: "dark"` (`§2` step 2(c)) → POST `content: "light"` (`§2` step 4b) — is
   recorded at the contract as the battery's own evidence that the `U-4` carry is MEASURED WORKING.**
   **The record's `§5.U` `U-4` verdict is unchanged and no matrix cell is rewritten.**
3. **`FINDING-2` (this record's `§3`) — ROUTED OUT OF SCOPE, WITH ITS OWNER.** The driver lives under
   `scripts/**`, which this unit's contract **DENIES** (`docs/specs/theme-control.md` `§1` item 8 ·
   `§5.1`), so **it is out of scope for `F1` and is fixed nowhere by this pass. THE DRIVER WAS NOT
   CHANGED.** It is recorded as **its own owed row, `docs/pending.md` `§L-4` `L-4j`**, **owner = the
   next pass that touches the driver or the MCP client surface**, with its acceptance test (**the
   driver prints the failure text for an unresolvable target**), and **it gates no unit.**

**THE `§6.2` READ-ONLY AUDIT IS STILL OWED — AND IT BELONGS TO A PARTY THAT DID NOT AUTHOR THE MATRIX.**
`§4`'s structured coverage report is **EMITTED, NOT BLESSED** (`emitter: "MANUAL"`): **no pass has
blessed it, and this runner is not that party** (a self-blessed matrix is the self-verified-greens
anti-pattern, `AGENTS.md` item 10/RCA-4). **The audit must reconcile `U-4`'s drifted literal
(`FINDING-1`) and the `dispatch` failure-reading (`FINDING-2`), and until it lands the matrix carries
NO verdict from an independent eye.**

**THE MATRIX STANDS AS MEASURED, AND THE UNIT IS NOT YET GREEN.** `§4`'s summary stands unchanged:
**`total 8` · `changed 7` · `unchanged 0` · `notObservable 1`** — **the SEVEN `CHANGED` rows (`U-1`,
`U-2`, `U-3`, `U-4`, `U-5`, `U-7`, `U-8`) plus the ONE structurally `NOT-OBSERVABLE` row (`U-6`,
reason `STRUCTURAL` and non-empty) are measured readings from one boot, not projections.** **THE UNIT IS
NOT GREEN WHILE THE `§6.2` AUDIT IS OUTSTANDING**: the battery RAN and its readings hold, but **a live
battery without its read-only audit is an unblessed matrix, so `F1`'s gate-6 half is RUN AND
UN-AUDITED, not closed** — and the two contract-side corrections and the one routed item above are
this record's complete disposition of its own three open items.

**⟶ CLOSE-OUT ANNOTATION (2026-09-27, the supervisor's GATE-7/8/10 CLOSE-OUT PASS — a dated annotation appended BESIDE this section; `RCA-8(d)`: every byte of `§1`–`§8` stands and NOT ONE READING, TABLE, EXIT CODE OR VERDICT IS REWRITTEN, and the clause above that is now superseded is named rather than rewritten).** **THE CLAUSE SUPERSEDED: *"THE `§6.2` READ-ONLY AUDIT IS STILL OWED"* and *"THE UNIT IS NOT GREEN WHILE THE `§6.2` AUDIT IS OUTSTANDING"* are THIS RUNNER'S OWN DATED READING.** **THE AUDIT HAS SINCE LANDED — IT IS `§9` BELOW — AND ALL THREE OF THE ITEMS IT NAMED ARE NOW CLOSED, EACH AT ITS OWN SITE: (i) THE RUNNER'S VERDICT ANNOTATION AND THE PER-COMMAND EXIT FORM (`AUD-TC-1` annotated beside the `U-5` cell and beside the `§4` summary, both unrewritten; `AUD-TC-2`'s `commands[]`/exit table added with every exit taken from `§2`, nothing re-run and nothing invented; and `AUD-TC-4`'s boot-instrument drift annotated at the contract's `§5.2.1`); (ii) THE UNIT-WIDE `§3a`/`§3b` TRANSCRIPTION WITH THE READ-ONLY GATE-11 PBT AUDIT (`AUD-TC-7`, `HIGH` — transcribed at `docs/specs/theme-control.md`'s `§3b`, its filled `ADV-TC-1`…`ADV-TC-5` table, its three negative-generator tasks and its PBT confirmations); AND (iii) THIS AUDIT'S OWN RECORDING IN THE TRACKERS (`docs/pending.md` `§L-4` `L-4k`).** **SO THE MATRIX IS NOW AUDITED AND THE UNIT IS NOW `DONE` — THE LEDGER'S NINETEENTH `DONE` ROW, its authoritative record the `## DONE — U-THEME-CONTROL` section of `docs/next-steps.md`.** **WHAT THIS CLOSE-OUT DOES **NOT** DO: it blesses no cell, it rewrites no `verdict`, and it withdraws no reading — the `U-5` verdict field stays the mislabel `AUD-TC-1` named, the filed summary stays `total 8 · changed 7 · unchanged 0 · notObservable 1`, and the two contract-side corrections stay CORRECTIONS WITH THEIR AS-FILED FORMS VISIBLE.** **IT ALSO DOES NOT DISCHARGE THE UNIT'S CARRIED ROWS, which live in that record's clause (12): the three negative-generator tasks (`OWED — TEST-SIDE`), the structurally unobservable `U-6` row, the census carry-forward, the routed-out driver item `L-4j`, the `docs/FORKER.md` carry, the blind set's `POST-GREEN` re-drive and the page-design gap.** **THIS ANNOTATION MOVES NO ROW ID, NO TERM, NO STRATEGY ID, NO SEED, NO CAP, NO MATRIX CELL AND NO LEDGER COUNT.**

## 9. THE `§6.2` READ-ONLY AUDIT — LANDED (recorded 2026-09-27 by the supervisor's doc-writer pass)

**WHAT THIS SECTION IS:** the **transcription of the `§6.2` audit's findings into this record** — **the audit was
READ-ONLY, it authored none of `§4`'s matrix and it ran nothing.** **Every reading, table, exit code, verdict and
honest limit in `§1`–`§8` stands EXACTLY AS FILED and NOT ONE IS REWRITTEN** (`RCA-8(d)`): **the findings below are
ANNOTATED BESIDE the material they concern, they add no reading, and they move no row id, no term, no strategy id,
no seed, no cap and no ledger count.** **This section measures nothing itself.**

**VERDICT: GATE 6 IS NOT CLOSED.** **`F1`'s gate-6 half is RUN, AUDITED AND NOT CLOSED** — the audit does **not**
bless the matrix, and the three owed items below are what stands between it and closure.

| # | Finding (clause · evidence · severity · disposition) |
| --- | --- |
| **`AUD-TC-1`** | **THE NEGATIVE-CONTROL ROW'S VERDICT CONTRADICTS ITS OWN TEXT — `MED`.** `§4`'s **U-5** row files its `verdict` as **`CHANGED`** while **its own observation is the UNCHANGED reading** (the unresolvable `no-such-node` target left the state node at `content: "light"`, its prior value; exit non-zero) — **a verdict that contradicts its own observation text.** **THE READINGS STAND: the `U-5` observation and its `exit 1` are kept as measured and the `verdict` cell is NOT rewritten — the correction is an ANNOTATION BESIDE it** (`RCA-8(d)`). **DISPOSITION: OWED — the runner's OWN verdict annotation** (owner: the runner's next pass); **it changes no reading and no matrix cell.** |
| **`AUD-TC-2`** | **THE FALSIFIABLE CLAUSE IS NOT SATISFIED LITERALLY — `MED`.** `§4`'s report carries **one `cmd` and one `exit` per row**, while **two rows' commands are several each** (**U-4**'s three-command PRE/dispatch/POST sequence and **U-8**'s four-reading sequence) **and their exit codes live only in this record's own sequence table (`§2`), never in the row's `exit` field.** **NO READING IS DISPUTED and nothing measured is withdrawn.** **DISPOSITION: OWED — the per-command `commands[]`/exit FORM** (owner: the runner's next pass). |
| **`AUD-TC-3`** | **NO PROJECTED POST-READING FOUND — `NOT-A-FINDING / LOW`.** **The single carry-forward is NAMED:** the contract's **filing-time authored census** (`18`, a `§2.1`/`CURRENT STATE` filing figure), carried into `§4`'s **U-7** row **because NO pre-control tree exists to measure a "before" against** — **a named carry-forward, not a projection.** **Each census was measured with its OWN command** (authored via `node -e`, loaded via `… targets`), **and the loaded `23` and authored `18 + 5 = 23` figures RECONCILE.** **DISPOSITION: `NOT-A-FINDING`, recorded with its reason; nothing owed.** |
| **`AUD-TC-4`** | **THE ADDITIVE/SCOPING STORY IS SOUND — `LOW`.** **Every verdict in `§4` is a GRAPH-SIDE reading or the LIVE TOOL CENSUS**; **the `ui` leg (`§5`) and the divergence leg (`§5`) appear ONLY as PRECONDITIONS**; **and NO APPLIED-APPEARANCE CLAIM EXISTS ANYWHERE in this record** (`§4`'s **U-6** stays `NOT-OBSERVABLE (STRUCTURAL)`). **ONE ITEM RECORDED FOR ANNOTATION — a BOOT-INSTRUMENT DRIFT:** the **as-filed start command** of `§1` (**`electron … --mcp-transport=http …`**) is **SUPERSEDED BY the corrected battery text** at **`docs/specs/theme-control.md` `§5.2.1`** (**`npm run start:http`**). **The as-filed line stands as written** (`RCA-8(d)`). **DISPOSITION: that one drift item is OWED for annotation** (owner: the runner's next pass). |
| **`AUD-TC-5`/`AUD-TC-6`** | **THE TWO CONTRACT-TEXT CORRECTIONS ARE CORRECTIONS, NOT RETRO-FITS — `NOT-A-FINDING`.** **The as-filed forms stay VISIBLE** at the contract (`npm start`; the no-arg dispatch literal) **and the recorded PRE/POST pair (`§2` steps 2(c)/4b) traces EXACTLY** onto the corrected text. **The out-of-scope routing is VERIFIED against the contract's OWN denied path** (`§1` item 8 · `§5.1`'s denied set contain `scripts/**`, the driver's home), **and THERE IS NO CONTRADICTION BETWEEN THE LIVE READINGS AND THE BLIND GREENS.** **DISPOSITION: `NOT-A-FINDING`, each with its reason; nothing owed.** |
| **`AUD-TC-7`** | **🔴 THE UNIT-WIDE ADVERSARIAL PASS AND THE GATE-11 PBT AUDIT ARE OUTSTANDING IN THE CONTRACT'S OWN RECORD — `HIGH`.** **The contract STILL READS that NO adversarial pass has run and that EVERY SEED IS `OWED`** (`docs/specs/theme-control.md` `CURRENT STATE` item 5 · `§3a`'s `OWED` header and its eight `OWED` seeds) **and ITS `§3b` DISPOSITION TABLE IS EMPTY** (`| *(none yet — the pass has not run)* | … | OWED |`) — **ALTHOUGH THE PASS **HAS** RUN: its findings, their dispositions and the read-only gate-11 PBT audit EXIST and were LANDED BY THAT PASS in the ledger commit.** **THIS SCOPED `§6.2` AUDIT DOES NOT DISCHARGE THE UNIT-WIDE GATE-4 RECORD** (a read-only matrix audit is not the unit's adversarial pass and is not its PBT audit). **A READER OF `§3a`/`§3b` IS CURRENTLY TOLD THE PASS HAS NOT RUN; the contract's dated annotation beside the as-written text (landed this pass) points at where its findings actually live.** **DISPOSITION: OWED — the UNIT-WIDE `§3a`/`§3b` RECORD with its PBT audit; the `DONE` ROW OWES BOTH** (owner: **the supervisor's formal `§3a`/`§3b` transcription**). **It gates the `DONE` row and it is NOT closed here.** |
| **LOW — one authored binding** | **ONE AUTHORED BINDING SITS OUTSIDE THE DECLARED FIVE IDS AND ONE HANDLER NAME — `LOW`, recorded as a NOTE.** **`THEME_INITIAL_TOKEN`** is an authored binding **outside** the declared five ids (`theme-card`/`theme-dark`/`theme-light`/`theme-setting` and the handler `theme-set`); **it is UNEXPORTED.** **NO CLAUSE REDDENED** — it is **recorded as a note only**, and it moves no id, term, seed or cap. **DISPOSITION: NOTE, nothing owed.** |

**THE AUDIT'S VERDICT AND ITS FINDINGS, WITH OWNERS — and the THREE ITEMS THE RECORDS STILL OWE:**

1. **THE RUNNER'S VERDICT ANNOTATION AND THE PER-COMMAND EXIT FORM** (`AUD-TC-1` · `AUD-TC-2`, plus `AUD-TC-4`'s
   boot-instrument drift item) — **owner: the runner's next pass.** **The readings stand; nothing measured is
   withdrawn and no matrix cell is rewritten.**
2. **THE UNIT-WIDE `§3a`/`§3b` RECORD WITH THE GATE-11 PBT AUDIT** (`AUD-TC-7`) — **owner: the supervisor's formal
   transcription.** **The pass HAS run and its findings exist and were landed by that pass in the ledger commit;
   the contract's as-written `§3a`/`§3b` are annotated beside this pass to say so, and the record itself is still
   OWED — the record is NOT COMPLETE and this pass does not claim it is.**
3. **THIS AUDIT RECORDED IN THE TRACKERS** — **owner: the supervisor's doc-writer pass** — **landed as
   `docs/pending.md` `§L-4` `L-4k`.**

**WHAT IS NOT CHANGED, STATED EXPLICITLY:** **`§4`'s summary stands as measured** — **`total 8` · `changed 7` ·
`unchanged 0` · `notObservable 1`** — **the seven `CHANGED` rows and the one `NOT-OBSERVABLE` (`U-6`) row are
measured readings from one boot and NOT ONE CELL IS REWRITTEN, `U-5`'s contradiction included (annotated, per
`AUD-TC-1`).** **THE LEDGER IS UNMOVED: `18 DONE / 3 open` UNITS = `21` units (`18 + 3 = 21`)** — **this record's
`§9` flips no cell, moves no ledger count and authors no unit's status.** **⟶ SUPERSEDED ON ITS LEDGER FIGURE ONLY 2026-09-27 (THE SUPERVISOR'S GATE-7/8/10 CLOSE-OUT PASS — a dated annotation BESIDE the sentence above, whose bytes are KEPT; `RCA-8(d)`): `18 DONE / 3 open` WAS THIS RECORD'S OWN DATED READING OF THE LEDGER BEFORE THE UNIT'S OWN MOVE.** **THE LIVE ARITHMETIC IS `19 DONE / 2 open` UNITS = `21` units (`19 + 2 = 21`), because `U-THEME-CONTROL` ITSELF HAS MOVED TO `DONE` — the ledger's NINETEENTH `DONE` row — with the open set now `F2` · `F3` and `22` live rows = `21` unit rows + the non-unit fork row `F4`, the `MOVED TO DONE` label set equalling the `DONE` set at `19`.** **THE REST OF THE SENTENCE STANDS AS FILED AND IS STILL TRUE OF THIS SECTION: `§9` FLIPS NO CELL, REWRITES NO READING AND AUTHORS NO UNIT'S STATUS.**
