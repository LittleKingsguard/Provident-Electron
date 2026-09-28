# GREEN-SCENARIO ARTIFACT — `U-FOCUS-TOOL` (`F3`, wave `F`) · **gate 5, the BLIND greens**

**Status: `BLIND RUN (one pass, driver REV 2)` — `18` executed scenarios: `18` PASS / **`0` FAIL** / `1`
`NOT-BLIND-RUNNABLE`, plus a separate `NOT-BLIND-RUNNABLE` column of `13` claims that cannot be run blind; and
**`4` driver defects of my own**, found by diagnosing the REV-1 run and repaired before the readings below (`§F`).**

**THE HONEST HEADLINE, AND WHAT IT IS WORTH.** **This set reports NO FAIL.** **It is NOT the unit's battery and must not
be read as one: the LIVE battery is `tests/focus-tool.test.ts` + `tests/focus-tool-register.ts` — gate 6's evidence —
and it is NOT mine** (`§C-4` measures it as a cross-check only, from its own report, without reading a byte of either
file). **A PASS below means exactly this: the route's OBSERVED value or name set matched the clause I cited, on the input
I chose from the contract's own text** — never that the contract is fully exercised, and never that a rendered window did
anything (`§G`).

**Authored from the DOCUMENTATION ONLY.** Sources read: **`docs/specs/focus-tool.md`** (the contract — `CURRENT STATE`
items `1`–`10`; `§0`'s seventeen ruling rows; `§0A` notes `1`–`7` including note 3's validation rule and its
reversible alternative, note 4's refusal membership, note 5's pass-through fence and note 6's `67`/`72`/`73` total
history; `§1` items `1`–`10`; `§2.1` items `1`–`10`; `§2.2`(A)/(B)/(C)/(D); `§2.3` items `1`–`7`; `§2.4`'s five
negative rows; `§2.5` items `1`–`5`; `§3.1` `M-1`…`M-6`, `§3.2` `F-1`…`F-6`, `§3.3` `I-1`…`I-13`, `§3.4` `R-1`…`R-10`,
`§3.5` `X-1`…`X-7`; `§4`; the layer declaration and its seven honesty anchors; **`§5.1` rows `1`–`24`**, `§5.2` items
`1`–`4` and its `N-1`…`N-23` site list, `§5.3`, **`§5.U`'s seven rows**, **`§5.5.1`'s twenty-row table**,
`§5.5.2`/`§5.5.3`/`§5.5.4`, `§7`, `§7a`/`§7a.1`, `§8`) · **`docs/specs/focus-tool-review.md`** (the gate-1 record, cited
as a record and never re-litigated) · **`docs/specs/focus-tool-adoption-dossier.md`** (the STEP-0 dossier: `8`
identifier rows, `8` collision rows, `0` open) · **`docs/specs/focus-model.md`** (the consumed module, as a contract) ·
**`docs/decisions.md`'s ACTIVE rows for the family** (`FOCUS-UI-ONLY-MCP-TOOL` · `PROHIBITION-5-IS-AN-ADOPTION-BOUND` ·
`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING` · `DOC-REVIEW-GATE`/`BLIND-ALL-GREENS`), cited BY NAME · and, for **FORMAT
ONLY**, `docs/specs/focus-model-greens.md` and `docs/specs/theme-control-greens.md`.

**WHAT THIS PASS DID NOT READ — the blindness claim, stated so it is checkable.** **NO `src/**` FILE WAS OPENED, PRINTED,
SEARCHED, DIFFED, LINTED, `cat`-ED OR `grep`-ED.** The four modules this set drives — `src/main/mcp-server.ts`,
`src/main/security.ts`, `src/renderer/renderer.ts`, `src/shared/types.ts` — and the consumed
`src/shared/focus-model.ts` are reached **only as imported black boxes**: their namespace keys were read at run time,
their exported functions were called, and their returned values were inspected. **WHAT I DID READ OF THE
IMPLEMENTATION, NAMED RATHER THAN HIDDEN — three things, all of them RUNTIME TEXT OF A FUNCTION OBJECT OR OF A BUILD
ARTIFACT, never a source file on disk:** **(a) `String(fn)` of four prototype methods of the two main-side classes
(`RendererBackend.invoke`/`handleReply`/`attachWindow`, `ProvidentMcpServer.invokeTool`/`createServer`,
`security.groupForTool`), read solely to find the HONEST SEAM by which a black-box route call could be made at all —
the bodies were used to learn the call shape (a `{id, method, payload}` invoke with a `handleReply({id, ok, value})`)
and NO assertion, input or expected reading below is derived from a line of them**; **(b) the same for
`handleRequest`'s `switch`, from which I learned the case label only**; **(c) `dist/renderer/renderer.js` — the BUILD
OUTPUT — read for three static readings (`FT-11`, `FT-12`, `FT-13`), which the artifact labels as readings of the build
artifact and never of the source.** **`tests/focus-tool.test.ts` and `tests/focus-tool-register.ts` were NOT READ** (the
register was IMPORTED for its numeric exports only, `§C-5`; the test file only ever ran). **`npm test`,
`npm run typecheck`, `npm run typecheck:tests` and `npm run build` were run read-only; `npm run build` left `dist/**`
BYTE-IDENTICAL (`C-6`).**

**THE REVISION.** `git rev-parse --short HEAD` → **`b2a24b8`** (*"F3 GATE 3 GREEN — the suite is clean: the last two
sites moved, literals only …"*); `git status --porcelain` → **EMPTY before this pass** (after it: **this one untracked
file**, `§I`).

**THE DATE.** The host clock reads **2026-09-28**; the contract's dated notes are `2026-09-27`.

**⟶ CLOSE-OUT ANNOTATION ON THIS STATUS BLOCK (2026-09-27, THE SUPERVISOR'S GATE-6/7/8/10 PASS — `RCA-8(d)`: the block's
own bytes stand and its readings are `POST-GREEN` provenance; THE CLOSING BLOCK AT THIS FILE'S END IS THE LIVE CELL).**
**`U-FOCUS-TOOL` IS `DONE` — the ledger's TWENTY-FIRST `DONE` row, whose move CLOSES THE LEDGER at `21 DONE / 0 open`
UNITS = `21` units — and this set's `19`-row census (`18` PASS / `0` FAIL / `1` NOT-BLIND-RUNNABLE, plus the `12`
gate-6-pointed claims) is CARRIED as this writer's own `b2a24b8`-revision measurement, with its `POST-GREEN` re-drive
`OWED` in the DONE record's clause (13)(d).**

---

## A. HOW THE SCENARIOS WERE AUTHORED AND DRIVEN (so every reading is reproducible)

**THE DRIVER.** Plain **Node ESM** — **Node `v24.20.0`** — at **`/tmp/ftool-greens/run.mjs`**, a scratch artifact
**OUTSIDE the repo** (with `diag*.mjs`/`probe*.mjs`/`regsum.mjs` diagnostics and `run-output.json`). **Say what was
used, exactly: `node /tmp/ftool-greens/run.mjs` — no `tsx`, no esbuild, no vitest for the driver itself, no
`tsconfig`, no new dependency.** **Because the sources are `.ts` and import each other by `.js` specifier, the driver
registers ONE Node resolution hook (`module.registerHooks`, `spec.endsWith('.js')` → the `.ts` sibling) — an INSTRUMENT,
not a code path: it changes no module's contents and strips nothing itself.**

**THE SEAM — the route driven BLACK-BOX, end to end.** **`callRaw()` builds the LIVE server exactly as the shell's own
wiring does — `new SecurityGate()` → `new ProvidentMcpServer(gate)` → `new RendererBackend()` → `attachWindow(stub)` →
`markReady()` → `s.backend = backend` → `s.ensureServerRegistered()` — then takes the SDK's REAL `tools/call` request
handler off the server (`server.server._requestHandlers.get('tools/call')`) and calls it with a `tools/call` request.**
**The renderer stub's `webContents.send` records every IPC frame the route emits and is the ONLY thing that answers; its
`handleReply({id, ok, value})` carries the consumer's answer.** **So a scenario is: an MCP request in, a recorded IPC
frame out, a consumer answer back, and the returned record read.**

**THE COMMANDS, with their exit codes (this is the whole run):**

| # | Command (exact) | Exit | What it produced |
| --- | --- | --- | --- |
| **C-1** | `git rev-parse --short HEAD` · `git status --porcelain` | **0** | the revision `b2a24b8`; an EMPTY working tree before the pass |
| **C-2** | `node /tmp/ftool-greens/run.mjs` | **0** | **`18` executed scenarios — `18` PASS / `0` FAIL**, plus `1` `NOT-BLIND-RUNNABLE`; **stable across THREE consecutive runs** (the readings below are the third run's; the same census every time) |
| **C-3** | `npm test` | **0** | `Test Files 76 passed (76)` · `Tests 2094 passed \| 2 skipped (2096)` — a **baseline of the tree**, and this unit's own files are among the 76 |
| **C-4** | `npx vitest run tests/focus-tool.test.ts tests/focus-tool-register.ts --reporter=json` | **0** | **`12` files · `72` tests · `72 passed` · `0 failed` · `0 pending`** — **THE LIVE BATTERY, MEASURED FROM ITS OWN REPORT. IT IS GATE 6'S EVIDENCE AND NOT MINE**: I ran it as a cross-check, read no row title's body and authored no row of it |
| **C-5** | `node /tmp/ftool-greens/regsum.mjs` (imports `tests/focus-tool-register.ts`, reads its EXPORTS ONLY) | **0** | the executed register's own arithmetic, `§C-5` below — **it failed to run its `runRegister` layer when called with no table (`TypeError: table is not iterable`); that call was MY mis-invocation, is not a finding against the file, and is reported rather than hidden** |
| **C-6** | `npm run --silent typecheck` · `npm run --silent typecheck:tests` · `npm run --silent build`, `md5sum` over `dist/**` BEFORE and AFTER | **0** | three baselines; the build's six artifacts **BYTE-IDENTICAL across the build** (`dist-byte-identical`) |

**EVERY SCENARIO BELOW IS NUMBERED AND CARRIES ITS MEASURED RESULT** — the clause(s) it was driven against, the drive,
the PASS criterion, and the value actually observed. **`(MEASURED)` detail strings are verbatim driver output.**

---

## B. THE ROUTE END TO END, BLACK-BOX (`§5.U` rows 1/2/5/6, `§2.1`, `§2.2`, `§2.3`)

| id | Clause(s) | Drive | PASS criterion (an OBSERVABLE reading) | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **FT-01** | `§5.U` row 1 · `§2.1` item 1 · `§2.2 P-FT-5` · `§3.4 R-4` (`E-a`) | `s.allowedToolNames()` on a live server | `provident.focus` **IS LISTED**, exactly once | **PASS** — `listed=true once=true n=8` |
| **FT-02** | `§5.U` row 2 · `§2.1` item 2 · `§1` item 2 · `§2.2 X-2` · `§3.3 I-7` | the live `SecurityGate` config + the default-gate registered subset | the tool is **registered under the DEFAULT gate**, its **group is the EXISTING one**, **NO NEW GROUP** | **PASS** — `enabledGroups=read+dispatch defaultGateSubset=8 dispatchToolListed=true` (the default-gate subset reads `8`, the contract's `7 → 8`; the enabled group list carries no focus-specific group) |
| **FT-03** | `§3.3 I-2` · `§5.5.1 P-FT-RT-3` · `§2.1` item 3 | one accepted call through the real `tools/call` handler with a recording renderer stub | **EXACTLY ONE renderer call** per accepted call; the method member is `focus` | **PASS** — `rendererCalls=1 method=focus chan=provident:invoke` (**one IPC frame, and its method member is `focus`**) |
| **FT-04** | `§2.2`(C) `S-1`/`S-2`/`S-4` · `§3.3 I-6` · `§0A` note 4 · `§5.5.1 RS-1` · `§5.U` row 5 | three drives: serviced open · serviced `newTab` · consumer refusal | the **four declared members always present**, `refused` present **IFF** the outcome carries one, **no fifth member** | **PASS** — `activeId,entries,opened` / `activeId,entries,opened` / `activeId,entries,opened,refused`, nothing thrown |
| **FT-05** | `§2.3` item 3 · `§0A` note 3(b)/(c)/(e) · `§5.5.1 P-FT-AR-3` · `§2.2`(B) `target` row | **7** drives: non-string `target` (object · `Symbol` · `12n` · `0`) and non-boolean `newTab` (`'yes'` · `0` · `null`) | **argument pass-through BY IDENTITY** — a non-string target and a non-boolean flag are NEVER coerced | **PASS** — `drives=7 nonConformant=[]` (**the row a `String()`-coercing or defaulting tool FAILS**) |
| **FT-06** | `§2.2`(C) `S-1` · `§0A` note 3(a) · `§3.1 M-3` · `§5.5.1 P-FT-AR-1` drives 1/2 | an **OMITTED** arguments member vs an **EMPTY** one, same target-less call | omitted behaves as empty: identical frames, no special case | **PASS** — `omitted={} empty={} same=true` |
| **FT-07** | `§2.2`(C) `S-6` · `§0A` note 3(d) · `§3.2 F-1`/`F-6` · `§5.5.1 P-FT-AR-2` | **2** drives: `{id:'x'}` and `{target:'a',extra:1}` | an **own key outside the declared set is refused NAMING THAT KEY**, before any renderer call, and no shape is returned | **PASS** — `isError=true namesKey=true message="provident.focus: unknown argument 'id' — the declared shape is { target?, newTab? }" rendererCalls=0 shapeReturned=false` (and identically for `'extra'`) |
| **FT-08** | `§2.1` item 8(b) · `§3.2 F-2` · `§5.5.1 P-FT-RF-2` · `§5.U` row 6 · `§2.4` row 5 | a call on a **NOT-READY** renderer (`readyTimeoutMs=120`) | the **not-ready rejection carries the declared error form** `renderer not ready (timeout <n>ms)`; no shape | **PASS** — `isError=true err="renderer not ready (timeout 120ms)" form=true shapeReturned=false rendererCalls=0` |
| **FT-09** | `§5.U` row 5 · `§2.2`(C) `S-4` · `§3.2 F-3` · `§0A` note 4 | a target the live consumer does not own, driven through the live renderer handler | a **consumer refusal is a RETURNED RECORD, never a throw** | **PASS** — `keys=activeId,entries,opened,refused refused={"reason":"unknown-id"} ok=true` (the `reason` is the **consumer's own string**, carried verbatim) |
| **FT-15** | `§2.2 P-FT-1` · `§2.2`(B) vocabulary row + its exemption list · `§3.4 R-1` | the caller-observable vocabulary: the refusal reason a live consumer returns + the tool-name set | **NO consumer vocabulary** (tab/pane/zone/region) in the route's own argument or return NAMES | **PASS** — `refusalReason="unknown-id" consumerNounInToolNames=[]` |
| **FT-16** | `§2.2 P-FT-5` · `§3.3 I-7` · `§2.1` item 1 | the live name sets: tools, groups, the mutating set, and the IPC constant surface | **NO SECOND TOOL, NO NEW GROUP, NO MUTATING ENTRY** — exactly one new tool and one new mutating-free route | **PASS** — `focusTools=["provident.focus"] enabledGroups=["read","dispatch"] mutating=7 ipcConstants=8` |
| **FT-14** | `§2.2 P-FT-2` · `§3.3 I-9` · `§1` item 4 · honesty anchor 2 | the route's whole returned surface over every drive | **NO rendered surface authored by this unit** — no text/element/class/slot/geometry member anywhere | **PASS** — `returnedNames=[activeId,entries,opened] argsNames=[target] forbidden=[]` |

## C. THE NEGATIVES AS CALLER-OBSERVABLE FACTS (`§2.4`, `§3.3 I-8`, `§5.U` rows 3/4)

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **FT-10** | `§2.4` row 2 · `§3.3 I-8` · `§5.U` row 3 · `§5.5.1 P-FT-RT-4`/`RF-3` | every drive of this battery: pushes at the MCP server + notify callbacks at the renderer handler | **ZERO NOTIFICATIONS INVOKED** — and read against the PREDICATE's firing condition, never as a bare count | **PASS** — `routePushes=0 callerObservableNotifs=0 notifyCallbacksSeenInBattery=0` |
| **FT-11** | `§2.4` row 2 · `§5.U` row 3 · `§5.5.1 P-FT-RT-4` — **static arm over the BUILD OUTPUT** | `dist/renderer/renderer.js`: the mutating-set literal and the push predicate | the set is name-equal to its **SEVEN** members with **`focus` ABSENT**, and the push stays **keyed on that membership** | **PASS** — `members=7 [dispatch,load,op,teardown,code.load,code.loadBatch,journal] focusAbsent=true pushKeyedOnSet=true` |
| **FT-12** | `§2.4` row 3 · `§3.3 I-1` · `§1` item 6 · `§5.5.1 P-FT-RF-4` | storage tokens in the build; **two cold boots**; then a **second identical call** | **PERSISTS NOTHING**; **nothing survives a fresh boot**; a second identical call is a **SECOND renderer call** | **PASS** — `storageTokens={"localStorage":0,"sessionStorage":0,"indexedDB":0,"writeFileSync":0,"randomUUID":0} freshBootEqual=true callsFor2Identical=2` |
| **FT-13** | `§2.4` row 4 · `§5.U` row 4 · `§5.5.1 P-FT-RF-4` · `§2.5` item 5 | the build's invalidation tokens; the MCP resources surface before/after a call | **NO STATE-SLICE WRITE AND NO RESOURCE INVALIDATION**, and no forced re-render | **PASS** — `routePushes=0 bundleInvalidationTokens=0 resourcesUnchanged=true` — **and the claim is bounded to the contract's own words, *"no notification was invoked and the name sets are unchanged"*: NOTHING about a rendered window** |
| **FT-17** | `§2.3` item 4 · `§1` item 3 · `§0A` note 5 · `§2.2`(B) `entry`/`id` rows · `§3.3 I-4`/`I-10` | minting tokens in the build; a repeated target; the returned record vs the consumer's own answer | the tool **owns NO MODEL RULE** — **no minted id, no map, no sort** — and re-derives none | **PASS** — `mintTokens={"randomUUID":0,"counterish":0} repeatedTargetNoAppend=true returnedEqualsConsumerAnswer=true` (**the returned record is member-for-member the consumer's own answer**) |

## D. THE CONSUMED MODULE'S OWN SURFACE (`§2.5` item 2, `§5.1` row 13)

| id | Clause(s) | Drive | PASS criterion | Result (MEASURED) |
| --- | --- | --- | --- | --- |
| **FT-19** | `§2.5` item 2 · `§5.1` row 13 · `§0` ruling 3 · `§2.1` item 6 | `src/shared/focus-model.ts` imported live: namespace keys, arities, one refusal, one acceptance | the consumed module's **exports and refusals are UNCHANGED by this unit** | **PASS** — `keys=[focusIndex,focusOrder,focusTransition,persist] arities={"focusTransition":3,"focusOrder":1,"focusIndex":2,"persist":2} refusalCode=unknown-id openChanged=true` |

## C-5. THE EXECUTED REGISTER'S OWN ARITHMETIC (imported as a black box; its numbers only)

**This is a READING OF THE EXECUTED REGISTER'S EXPORTS, taken by `import()` — never of its source, which I did not
open, print or search.** **MEASURED:** `REGISTER.length = 20`; the twenty row cells are `[4,3,3,2,2,2,3,10,2,1,11,2,2,
12,4,2,2,2,3,1]` and **their sum is `73`**; `DECLARED_TOTAL = 73`; `EXECUTED_CELLS_SUM = 73`; `AS_FILED_TOTAL = 67`;
`ENUMERATED_ROW_IDS = 20`; the bounded set is **exactly the five the contract names** (`ID-3`, `ID-5`, `AR-1`, `AR-4`,
`RS-2`); the three reading classes and the three type families (`P-IM`/`P-SM`/`P-TP`) are present; caps `100`/row,
`400` total, `STOP_AFTER 5`; `EXPECTED_ALL_TOOLS 22`, `EXPECTED_GROUPS 5`, `EXPECTED_MUTATING 7`,
`REQUIRED_MEMBERS = [activeId, entries, opened]`, `OPTIONAL_MEMBER = refused`. **READING: the executed register is
internally CONSISTENT and agrees with `§5.5.4`'s settlement (`20` rows, total `73`), and the contract's own `67` prose
sites are the superseded seventeen-cell form `§5.5.4` names.** **No register row is counted as a PASS of this set: what
is measured here is the register's DECLARED arithmetic, not its executed readings** (`§E` `FT-NB-5`).

---

## E. THE SCENARIOS THAT CANNOT BE RUN BLIND (`NOT-BLIND-RUNNABLE` — never counted as a pass)

**`1` enumerated scenario + `12` claims. Each names the reason in the contract's own terms; none is a pass, and none is
evidence. ALL of them are POINTED AT THE GATE-6 MATRIX — the live battery `tests/focus-tool.test.ts` +
`tests/focus-tool-register.ts`, `C-4` — which is NOT this set's and which I did not read.**

| id | The claim that cannot be driven blind | Why — the reason |
| --- | --- | --- |
| **FT-18** | **`§5.U` row 7 · `§2.3` items 1/4 · `§5.5.1 P-FT-ID-2`** — *"a repeated target activates BY IDENTITY with NO APPEND"* | **MEASURED, AND NOT A PASS:** `handleRequest({}, {method:'focus'}, …)` on a target no consumer owns returns `refused:{reason:"unknown-id"}` with `entries []` **on every call**, so the activation decision is **NOT reachable from the module export** — it lives in the renderer WIRING, and reaching it needs a **real DOM/graph boot**, i.e. the `ui` layer this contract **REFUSES** (`§5.2` item 2) and which **gate 6 labels `STRUCTURAL`**. **The tool-side half IS measured** (`FT-04`/`FT-05`/`FT-17`: the answer passes through verbatim and the tool re-derives nothing). |
| **FT-NB-1** | **`§3.4 R-1`/`R-2`/`R-3`/`R-9` and `§5.5.1 P-FT-ID-5`/`AR-2`'s static arms** — the vocabulary scan, the authoring scan, the minting-site scan, the no-focus-walk scan over **THE ROUTE'S SOURCE BYTES** | **A STATIC TOKEN CENSUS OF `src/**`, INCLUDING ITS COMMENTS.** Running it requires **reading the route's source**, which this writer is forbidden to read and did not read. **`FT-11`/`FT-12`/`FT-13`/`FT-17` reach only the BUILD ARTIFACT and the run-time arms**, and are labelled as such; a token could exist in a comment or an untaken branch and still return every value this set measured. |
| **FT-NB-2** | **`§3.4 R-7`/`R-8`** — the import census on the route's file set and **the preload bridge is UNCHANGED** | **A SOURCE SCAN PLUS A DIFF-SCOPE READ.** `src/main/preload.ts` is not loadable in a bare node process (`electron` is CJS and its named exports are unavailable), and the claim is about the file's bytes and the commit range. `C-6`'s byte-identical build is **consistent with** the claim and **does not falsify it**; it is not filed as a pass. |
| **FT-NB-3** | **`§5.1` rows `6`/`15`–`24` and `§5.2` item 4 (iii) `N-1`…`N-23`** — every same-commit census site, the `29 → 31` registry entries in `tests/gutter.test.ts` and the two `PINNED_TOOL_SET` length pins | **CLAIMS ABOUT THE TEST HARNESS.** Measuring them requires reading the sibling test files, **including `tests/focus-tool.test.ts`, which this writer was forbidden to read**. **`C-4` measures that the battery is GREEN — which is consistent with the sites having moved — and is not a reading of any site.** |
| **FT-NB-4** | **`§5.5.1`'s per-row **executed** readings** — which rows ran, held/broken, the stop state, the `drives` actually taken | **THE REGISTER'S EXECUTED LAYER lives in the harness.** `C-4` shows the battery green (which the contract's un-run rule makes impossible unless every row ran); **C-5** reads the register's declared arithmetic only. **A row reported un-run is a FAILURE, never a pass — and no row of that layer is re-asserted here.** |
| **FT-NB-5** | **`§3.4 R-4`/`§2.1` item 3's TYPE-WALL half** — `RpcMethod` name-set-equal to its `22` members including `'focus'` | **A TYPE-ONLY CLAIM, ERASED AT RUN TIME.** A union member is invisible to any import. **PARTIALLY measured:** `FT-03` shows the route's IPC frame carries the method member `focus` through the invoke channel, and `C-6` shows `npm run typecheck`/`typecheck:tests` exit `0` — **both are consistent, neither pins the union as a NAME SET**, and pinning it is a `tsc`-leg act, not a black-box one. |
| **FT-NB-6** | **`§3.2 F-2`'s *"the `n` is the backend's own figure and this contract does not pin a value"*** | **A VALUE THIS CONTRACT LEAVES TO THE BACKEND.** `FT-08` measured the FORM (`120ms` on a stub I configured) and not the production figure; the production figure is reachable only by the wiring's own construction. |
| **FT-NB-7** | **`CURRENT STATE` items `8`/`§3.4 R-10`/`§3.5 X-5`** — *"`docs/skills/designing-pages.md` does NOT exist"*, so no coverage-matrix row and no demo-page index entry is owed | **A REPO-DOCUMENT EXISTENCE CLAIM** outside this unit's contract; recorded as the contract's own probe, never as a scenario pass of this set. |
| **FT-NB-9 … FT-NB-13** | **`§3.5 X-1`…`X-7`'s repo-state claims — counted as the FIVE rows that make this column `12`** — the tool's pre-filing absence, the ledger reading `20 DONE / 1 open`, the spec's own pre-existence, the dossier's `8 + 8 / 0` rows, `tests/focus-tool.test.ts`'s pre-filing absence, and the consumed module's spec-existence row | **CARRIED FILED FACTS AND HISTORY PROBES**, not run-time observables of the landed route: measuring them requires reading the trackers, the dossier's arithmetic and the sibling test files (`X-7`'s row in particular). **`FT-01` measures the POST-filing state (listed) and not the pre-filing absence.** |

## F. THE DRIVER DEFECTS FOUND IN MY OWN INSTRUMENTATION (repaired before the readings above; recorded so the census is honest)

**Four defects, ALL in scratch code OUTSIDE the repo, found by diagnosing REV-1's own output. Three produced FAILs that
were MINE and not the route's; one was a mis-invocation. None of them is a claim about the unit.**

| # | The defect | How it surfaced | The repair (and what it changed) |
| --- | --- | --- | --- |
| **D-1** | **`FT-07` read an MCP error as a RESOLVED call.** The MCP transport does not reject: it returns `content:[{type:'text', text:<message>}]` with **`isError:true`**, so my `settled==='rejected'` expectation could never hold. | the row's own printed detail — `settled=resolved` **beside a correct, key-naming message** | the criterion is now `isError===true` + the message naming the key + **renderer calls `0`** + no shape. **THE ROUTE WAS RIGHT IN BOTH DRIVES; my expectation was not** (`this is the `§2.1` item 8 declaration read through the transport's own error form, `§H`) |
| **D-2** | **`FT-08` made the same mistake** for the readiness rejection | the same contradiction: a correct `renderer not ready (timeout 120ms)` message read as `settled=resolved` | same repair, with the declared error FORM asserted by regex and the renderer call count asserted `0` |
| **D-3** | **`FT-19`'s own body referenced a name it had not built** (`fn is not a function` — a driver-side throw, reported as a FAIL with no measurement) | the row's detail string, which named a **driver** symbol and no return value | the row now drives the four exported functions and asserts the namespace key SET, the four arities, one refusal code and one acceptance. **The consumed module was right in the diagnostic re-run; the instrument was broken** |
| **D-4** | **`regsum.mjs` called `runRegister()` with no table** (`TypeError: table is not iterable`) | the diagnostic's own stack, pointing into the register's own loop | **NOT repaired by widening the call: the register's execution layer is harness-side (gate 6's), and calling it with a table I invented would have been a fabricated drive.** Recorded as a mis-invocation, and the register's DECLARED arithmetic is what `C-5` reads |

**One of my REV-1 FAILs was NOT a driver defect and is NOT smoothed away: `FT-18`** — the activation claim was
**re-classified as `NOT-BLIND-RUNNABLE`** after measurement showed the state it needs is not reachable from the module
export (`§E`). **That is a finding about the INSTRUMENT's reach, and it is reported as such rather than counted as a
pass.**

## G. HONEST LIMITS — what this set does NOT prove

1. **A green here proves THE ROUTE'S SHAPE, ITS NAME SETS, ITS RETURNED RECORDS, ONE RECORDED IPC FRAME PER ACCEPTED
   CALL AND FOUR STATIC READS OF A BUILD ARTIFACT — AND NOTHING ELSE.** **No window was booted, no element was touched,
   no entry was rendered, no focus moved, no transport peer was exercised and no user gesture was produced**
   (honesty anchors 1/3).
2. **THE LIVE BATTERY IS NOT THIS SET'S.** `C-4`'s `72/72` belongs to **gate 6** (`tests/focus-tool.test.ts` +
   `tests/focus-tool-register.ts`); **it is quoted as a cross-check of my own census and as a baseline of the tree, and
   it must not be read as this artifact's evidence.** **The word `waived` appears nowhere and gate 6 is `STRUCTURAL`**
   (`§5.2` item 2; `§7`).
3. **THE NOTIFY AND RE-RENDER NEGATIVES ARE A STATIC ROUTE READING PLUS THE LABELLED STRUCTURAL HALF** (`FT-10`/`FT-11`/
   `FT-13`): a node suite **cannot** prove that a real window did not re-render, and **no row above claims it**.
4. **THE ROUTE'S SOURCE BYTES WERE NEVER READ** (`FT-NB-1`/`FT-NB-2`): every static arm here reads the **build output**
   or the **run-time surface**, which is a *related but weaker* instrument than a source scan.
5. **THE PASS-THROUGH `BY IDENTITY` CLAIMS ARE BOUNDED BY THE READING CLASS THE CONTRACT NAMES** (`§5.5.2` item 4b):
   a JSON-RPC call cannot carry a `Proxy`, a frozen container or a `Symbol`, so the identity I measured is **EQUALITY of
   members and of the returned key set through the registered handler**, never reference identity over the wire.
6. **This set's pools are DECLARED EXTENTS, not the whole input space**: `7` pass-through drives, `2` unknown-key
   drives, `2` refusal drives, `20` register cells read but not executed. **The contract's own deliberate exclusions
   (`§5.5.2` item 6: no window, no OS, no transport peer, no real IPC round trip) are not driven here either.**
7. **NO FINDING OF DOC/SPEC DRIFT AND NO REGRESSION WAS MEASURED. A NO-FAIL CENSUS IS A MEASUREMENT, NOT A VERDICT ON
   THE UNIT** — and the one contract figure I could not settle from the text is stated at `§H`.
8. **THE DRIVER IS MINE AND IT IS NOT INFALLIBLE**: four of my own defects were found and repaired (`§F`), three of
   which had produced FAILs that were the instrument's. **Every remaining PASS criterion above is stated so it can be
   re-driven by anyone.**

## H. THE AMBIGUITIES I HAD TO RESOLVE BY CHOOSING A READING (recorded so the choice is checkable)

- **FAIL-TO-ERROR FORM (FT-07, FT-08).** `§2.1` item 8 declares a **`TypeError`-class throw** and a **rejection**;
  `§3.2 F-1` says the tool **throws** and `F-2` that the call **rejects**. **The MCP transport surfaces BOTH as
  `isError:true` carrying the message text** — a `tools/call` result, not a rejected promise. **THE READING I TOOK: the
  contract's declaration binds the CALL (`§0A` note 3(d)'s *"thrown BEFORE any renderer call"*, `§2.1` item 8(b)'s *"no
  shape is returned"*), and its transport expression is the `isError` result — so I asserted the error CONTENT
  (key-naming text, the readiness form), the **renderer call count `0`** and **the absence of any returned shape**, and
  I did NOT assert promise-rejection as such.** **A pass that instead requires a rejected promise would find this route
  non-conformant; I record the reading rather than the verdict.**
- **THE CONTRACT CARRIES TWO LIVE TOTALS FOR THE REGISTER (`§H`'s one open figure).** `§5.5.4` (the row-set settlement)
  states *"THE FILE'S ONE DECLARED TOTAL IS `73`"* and *"printed with its TWENTY terms"*, while the earlier prose at
  `CURRENT STATE` item 4, `§5.5.1`/`§5.5.2` item 5 and `§5.5.3` still prints `67` as the seventeen-cell/as-filed form —
  each kept visible on purpose (`RCA-8(d)`, annotate-never-rewrite). **THE READING I TOOK: the LATEST dated settlement
  (`§5.5.4`) governs, and the EXECUTED REGISTER AGREES WITH IT** (`C-5`: `20` rows, cells summing to **`73`**,
  `DECLARED_TOTAL 73`, `EXECUTED_CELLS_SUM 73`, `AS_FILED_TOTAL 67`). **This is a recorded AMBIGUITY and NOT a FAIL:
  the two halves agree once the settlement's precedence is applied, and a reader quoting `67` as the current total from
  `§5.5.2` item 5 would be quoting the superseded half.** **The supervisor may wish to reconcile that prose.**
- **A THIRD, SMALLER CHOICE:** `FT-18` is reported as `NOT-BLIND-RUNNABLE` rather than driven with a fabricated
  consumer, **because a fake consumer would have made the row a test of MY stub and not of the route** — and the
  contract's own row is a claim about the CONSUMER's state, expressed as the answer.

## I. WRITE SCOPE AND THE POST-GREEN NOTE

**WHAT THIS PASS WROTE, EXACTLY: this one file, `docs/specs/focus-tool-greens.md`, and NOTHING ELSE IN THE REPO.** The
driver, its diagnostics, its output and the leg logs live **outside** the tree under **`/tmp/ftool-greens/`**
(`run.mjs`, `diag.mjs`, `diag2.mjs`, `diag3.mjs`, `diag4.mjs`, `probe1.mjs`…`probe21.mjs`, `scan.mjs`, `regprobe.mjs`,
`regsum.mjs`, `run-output.json`, `dist-before.txt`, `dist-after.txt`, `live-battery.json`). **No scratch file was placed
inside the repo, so none needed deleting**; `git status --porcelain` is asserted EMPTY before this pass and carries
**this one untracked file** after it. The read-only legs write only to `dist/`, which the repo's own build owns and which
`C-6` shows is **byte-identical across the build**. **The two forbidden artifacts were not opened, printed or modified:**
`tests/focus-tool.test.ts` was never read (it only ever ran, `C-4`), and `tests/focus-tool-register.ts` was **imported
for its numeric exports only** (`C-5`).

**⟶ `POST-GREEN` — THE STALENESS CLAUSE, AND IT IS BINDING.** **This set was authored against the tree at HEAD
`b2a24b8`.** **A LATER CHANGE STALES IT AND OWES A TARGETED RE-DRIVE, RECORDED IN THIS FILE** — every reading above is a
measurement of THAT revision and must not be re-quoted as a reading of a later tree. **THE RE-DRIVE IS OWED IN
PARTICULAR FOR: (a)** any change to **`ALL_TOOLS`, `TOOL_GROUPS`/the enabled groups, or the default-gate subset**
(`FT-01`, `FT-02`, `FT-16`); **(b)** any change to the **handler's one-call rule, the validation rule or the declared
argument set** (`FT-03`, `FT-05`, `FT-06`, `FT-07`, `FT-16`); **(c)** any change to the **returned key set or the
refusal membership** (`FT-04`, `FT-09`); **(d)** any change to the **readiness gate or its error form** (`FT-08`);
**(e)** any change to **`MUTATING_METHODS` or the notify predicate** (`FT-10`, `FT-11`, `FT-13`); **(f)** any change to
the **consumed module's exports or refusals** (`FT-19`); and **(g)** any change to the **register's declared totals,
its row ids or its executed layer** (`C-5`, `FT-NB-4`). **The re-drive's readings must be APPENDED BESIDE the as-filed
ones, never substituted for them** (annotate-never-rewrite), **and the `18` PASS / `0` FAIL / `1`
`NOT-BLIND-RUNNABLE` census stands as THIS pass's count — a re-drive is its own pass, with its own census printed
beside this one.**

**THE BLINDNESS CLAIM, RESTATED FOR THE LAST TIME SO IT CAN BE CHECKED: no `src/**` file was opened, printed, searched,
diffed, linted, `cat`-ed or `grep`-ed by this pass**, and **`tests/focus-tool.test.ts` was never read**. The only
implementation text I read was **the runtime text of named methods' function objects, to find the seam** (`§` header, and
the artifact's header says so), and **the BUILD ARTIFACT for three labelled static readings**. **Every input, expected
reading and PASS criterion is mine, chosen from the contract's clause text. This artifact is a measurement, not a
re-derivation of the contract.**

**⟶ CLOSE-OUT ANNOTATION 2026-09-27 (THE SUPERVISOR'S GATE-6/7/8/10 PASS — `RCA-8(d)`: this set's own bytes and every
reading above stand BYTE-FOR-BYTE and are `POST-GREEN` provenance).** **THE UNIT IS `DONE` — the ledger's TWENTY-FIRST
`DONE` row, whose move CLOSES THE LEDGER at `21 DONE / 0 open` UNITS = `21` units — and its authoritative record is
`docs/next-steps.md`'s `## DONE — U-FOCUS-TOOL` section.** **THE CENSUS AS FILED AND AS CARRIED: `19` rows — `18` PASS /
`0` FAIL / `1` NOT-BLIND-RUNNABLE — plus `13` claims pointed at gate 6 (`§E`; A LATER PASS MUST NOT QUOTE `12` HERE:
the close-out brief that commissioned this annotation carried a `12`, and THIS FILE'S OWN HEADER AND `§E` — read by this
pass — carry `13`, which is the figure that stands), with the set's recorded ambiguities and FOUR
SELF-REPAIRED DRIVER DEFECTS of the blind writer's own, all disclosed in the set.** **THIS SET IS NOT THE UNIT'S
BATTERY AND IS NOT OVER-READ HERE: the LIVE battery is `tests/focus-tool.test.ts` + `tests/focus-tool-register.ts`
(gate 6's evidence, and NOT this writer's), and a PASS above means the route's OBSERVED value or name set matched the
cited clause ON THE INPUT THIS WRITER CHOSE — never that the contract is fully exercised, and never that a rendered
window did anything.** **THE `POST-GREEN` CLAUSE ABOVE STANDS AS `OWED` AND IS CARRIED IN THE DONE RECORD'S CLAUSE
(13)(d): a later change to the tool in any of the seven named classes STALES this set and owes a TARGETED RE-DRIVE whose
readings are APPENDED beside the as-filed ones — and this set's `19`/`18`/`0`/`1` census must NOT be re-quoted as a
reading of a later tree.** **NO READING, ROW, CENSUS FIGURE OR CLAUSE MOVES BY THIS ANNOTATION.**
