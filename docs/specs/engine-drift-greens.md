# Green Scenarios — `U-ENGINE-DRIFT` (blind run of the measurement record)

**Status: `BLIND RE-RUN 2026-09-27 (one pass) — 51 scenarios, 42 PASS / 3 FAIL / 6 NOT-BLIND-RUNNABLE`**
**(+1 `INVALID` row carried in place, not counted as a pass; the record's `M-52`).**

> **⟶ DATE NORMALIZED 2026-09-27 (date-correction pass; no row, count or verdict changed).** This
> header first read `2026-09-24`, which came from the **host system clock** — the host runs ~3 days
> behind the repo's filing calendar (`date -u` reads `2026-09-24` during this work). The unit, its
> contract, its record and the trackers all file this work under **2026-09-27**, and
> `docs/specs/engine-drift-measurements.md`'s header carries the full **date-normalization note**
> (same day for the measurement pass, correction pass 2 and the correction pass; the withdrawn
> `2026-09-25`/`2026-09-28` stamps appear nowhere else in the repo). **Cite the filing date.**

**Authored and run WITHOUT reading the implementation.** The only sources read to derive a
scenario were the documentation: `docs/specs/engine-drift.md` (the wave-B contract),
`docs/specs/engine-drift-measurements.md` (read as **documentation of claims**, never as code —
its in-cell line numbers, file names and quoted outputs were used the same way any spec's are),
`docs/specs/engine-pin.md`, `docs/specs/engine-pin-greens.md`,
`docs/specs/engine-pin-live-status.md`, `docs/specs/e2e-test-battery.md`,
`docs/specs/mcp-endpoint.md`, `AGENTS.md`, `README.md`, `package.json`. **No file under `src/**`
was read to derive a scenario, and no file under `tests/**` was read to derive a scenario.** The
repo's own modules were imported as a **black box** through an `esbuild` bundle emitted into
`/tmp` from the module paths the docs name (`src/renderer/runtime.ts`, `src/shared/dom-shim.ts`,
`src/shared/demo-envelope.ts`, `src/shared/path-fork-cycle.ts`), and the MCP surface was driven
by spawning the **built** `dist/main/battery-host.mjs` under `--mcp-transport=stdio` with the
SDK's `StdioClientTransport` (the route `docs/specs/engine-drift.md` §2.1 `P3` names). Nothing
was monkey-patched; no private field was read; no engine-internal call was used to derive an
observable (§2.2 `F1`/`F2`).

**The only repo file this pass wrote is this one.**

---

## 1. Layer declaration — exactly what this run proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own vitest suite (`npm test`) and the shim's serialization | a browser; the assembled app |
| **[H]** | host-side | the `Runtime` public API (`new Runtime({mount, envelope, maxJournalLength?})`, `bootstrap()`, `load()`, `applyCommand()`, `op`-class commands, `dispatch()`, `journal()`, `listTargets()`, `renderedHtmlResult()`, `teardownResult()`, `markdownResult()`) under node, on the shim's `document` | engine internals; IPC |
| **[E]** | engine-side | the installed `provident-ssr` **0.5.1** dist, as observed **through** the `Runtime` surface and its published `.d.ts` names | a package-defect call |
| **[B]** | shim-battery host | `dist/main/battery-host.mjs` driven over MCP (`npm run battery`; and my own `provident.load`/`op`/`list_targets`/`get_rendered_html`/`get_markdown` calls) | the assembled app |
| **[A]** | assembled app | `npm run divergence` (real Electron vs the shim) — **structural surfaces only** | **never IPC-layer evidence** |

**Honesty anchors (carried from `docs/specs/engine-pin-greens.md` §1 and
`docs/specs/engine-drift.md`'s Layer declaration):**

1. **A green node suite is envelope/pure-layer evidence.** `npm test` booted no window, ran no
   IPC round-trip, exercised no MCP transport and touched no real DOM. `56 passed` says the
   repo's vitest files pass **under the shim**.
2. **A green divergence leg is structural-surfaces-only evidence, never IPC-layer evidence.**
   The `9 checks, 0 failures` leg compares the harness's own structural surfaces; it asserts
   **no attribute row**, and it is silent on the app's `provident.op` hop — the `LIVE-OP-REJECT`
   lesson. **No row below converts an envelope green into an IPC claim**, and none reads `9/0`
   as an IPC pass.
3. **A green battery leg is shim-host-over-MCP evidence** — the real tool surface, but still not
   the assembled app's renderer, and not the real DOM.
4. **`(engine recon)`-attributed statements stay attributed.** Where the record measured a recon
   claim, this run re-measured the measurable half; the `27`-member count stays unmeasured here
   too (`BL-16`).

---

## 2. The scenario set

`DOC source` cites the file + row id + section this run derived the expected value from.
`Record row` is the `M-n` row of `docs/specs/engine-drift-measurements.md` whose claim is under
test. Every row's **exact command** is in §4.

### 2.1 Version / pin agreement (census family, `M-1`/`M-2`)

| ID | DOC source | Record row | Probe (exact) | Observed (verbatim) | Result |
| --- | --- | --- | --- | --- | --- |
| **BL-01** | `engine-pin.md` §4.1 `R-14` | `M-1` | read `package.json` dep + `node_modules/provident-ssr/package.json` | `^0.5.1` · `0.5.1` | **PASS** — the declared pin and the installed dist agree |
| **BL-02** | handoff-review §4.1; `engine-pin.md` §2.1 | `M-2` | read `package-lock.json`'s `node_modules/provident-ssr` entry | `version 0.5.1`, `resolved …/provident-ssr-0.5.1.tgz`, `integrity sha512-HoRYx5T0rM0aXLs6ZLL1Ku68f1jSCezD4l6vmYObtr9UdsoMTw92bovcOtIQdjq2irFjMXsAQe90HyAaaDGLXQ==` | **PASS** — byte-for-byte the recorded value; the **unverifiable half stands** (no registry route in-session) |

### 2.2 Census family (`M-3`–`M-11`)

| ID | DOC source | Record row | Probe | Observed (verbatim) | Result |
| --- | --- | --- | --- | --- | --- |
| **BL-03** | `mcp-endpoint.md` census clause; `debug-panel.md` census line | `M-3` | `renderedHtmlResult()` on the demo envelope | field set `["destroyed","inTree","prototypes","registered","unplaced"]`, count `5`; result keys `["census","renderedHtml","ssrHtml"]` | **PASS** — exactly the five documented fields |
| **BL-04** | `engine-pin.md` §4.1 `R-17`, §4.2 (`BASE`); greens `CEN-1` | `M-4` | `new Runtime({mount, envelope: BASE}).bootstrap()` — the §4.2 envelope re-declared verbatim from the pin spec | `{"registered":5,"inTree":5,"unplaced":0,"destroyed":0,"prototypes":0}` | **PASS** — 5/5, rest 0 |
| **BL-05** | `decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE` | `M-5` | `renderedHtmlResult().census` on the demo + the divergence leg's own census lines | Runtime: `{"registered":12,"inTree":12,…}`; leg: `✓ census inTree matches (shim = real) (electron=12 shim=12)` · `✓ census registered matches (electron=12 shim=12)` | **PASS** — 12/12 on both legs |
| **BL-06** | `engine-pin.md` §6 stop condition 2's pinned list | `M-6` | `await rt.teardownResult().census` + `npm run battery` | probe `{"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}`; battery `✓ teardown inTree === 1 (inTree=1)` · `✓ post-teardown inTree === 1 (inTree=1)` | **PASS** — post-teardown `inTree === 1`, population recorded |
| **BL-07** | `engine-pin.md` §6 stop condition 2's list; `e2e-test-battery.md` census block | `M-7`, `M-9` | `rt.load({kind:'envelope', envelope: pathForkCycleLegacyData(12)})` → `.census` | `{"registered":23,"inTree":23,"unplaced":0,"destroyed":0,"prototypes":0}`; `data-node-id` count DOM `4095` / SSR `4095` | **PASS** — the d12 cycle variant's `inTree`/`registered` **and** the record's element count reproduced |
| **BL-08** | `e2e-test-battery.md`; `FORKER.md` §4 `R1-R16` → `R4` | `M-11` (static half) | `translateLegacy` route via the public load (above) + `grep -rn "4117"` | static family `23` (`inTree`, `registered`, `LoadResult.census`); `grep -rn "4117" src/ · tests/ · scripts/` → **no match** | **PASS (static half only)** — **SCOPE NOTE (2026-09-27, so this row is not read against `BL-09`):** this row's `grep` is scoped to **this repo's `src/`/`tests/`/`scripts/`** and its "no match" is a statement about **those three trees only** — the number **does** exist once, as a **comment line in the installed engine dist** (`node_modules/provident-ssr/dist/core/translate.js:623`), which is exactly the single match `BL-09` reports and the record's `M-11` cell carries. The two rows are therefore **consistent, not contradictory**: the repo tree is clean; the installed dist carries one comment match. See `engine-drift-measurements.md`'s `M-11` and this file's §3 `F-1` (whose substantive half — the two d12 populations, no observable census for the clone-form population — HOLDS; only the old `(no output, exit 1)` half is struck) |
| **BL-09** | `engine-drift-measurements.md` `M-11` (observed-value cell) | `M-11` (the `grep` claim) | `grep -rn "4117" src/ tests/ scripts/ node_modules/provident-ssr/dist/` (the cell's own command, run verbatim) | `node_modules/provident-ssr/dist/core/translate.js:623: * pollute… the fork-stress-data census (registered 4161 vs 4117) and broke` → **exit 0, one match** | **FAIL** — see §3 `F-1` |
| **BL-10** | `engine-drift.md` §2.1 `P5`; `ci-divergence-leg.md` §5 | `M-48` | `npm run divergence` | `R13 RESULT: 9 checks, 0 failures`, exit `0` | **PASS** — the leg is green on the current tree; `N = 9` untouched |

### 2.3 Counts family (`M-12`–`M-16`)

| ID | DOC source | Record row | Probe | Observed (verbatim) | Result |
| --- | --- | --- | --- | --- | --- |
| **BL-11** | `engine-drift.md` §3.1's `M-12` claim; `engine-pin.md` §3b `AF-9` | `M-12` | extract the `RpcMethod` union member list (name-level read of `src/shared/types.ts`) | `["dispatch","renderedHtml","markdown","listTargets","nodeState","load","op","export","validate","teardown","code.get","code.set","code.create","code.delete","code.validate","code.load","code.loadBatch","journal","module.install","module.update","module.list"]` — count `21` | **PASS** — 21 members, identical list and order to the record's |
| **BL-12** | greens §2.9 `G-06`; `engine-pin.md` §4.1 `R-15` | `M-13` | extraction over `dist/main/main.cjs` + `client.listTools()` on the battery host | `ALL_TOOLS` count `21` (18 `provident.*` + `module.install`/`update`/`list`), duplicates `0`; battery host registered `18` | **PASS** — both halves of the census as recorded |
| **BL-13** | `engine-drift.md` §3.3.3 `M-14`; greens `G-06b`/`F-6` | `M-14` | the record's own string-census command over a fresh `npm run build` of `dist/main/main.cjs` | my filter reads raw `33` / normalized `28`; the record reads raw `29` / normalized `24`. **The delta is entirely `moduleStore.*` + `modules.json` tokens** (`moduleStore.list`, `moduleStore.setDisabled`, `moduleStore.status`, `modules.json`) captured by the documented regex; the **record's own** extra-vs-`23` name, `module.fetch`, **is** present | **FAIL** — the verdict is confirmed (`23` does not hold) but the count `24` is not reproducible from column 4 — see §3 `F-2` |
| **BL-14** | `next-steps.md` `## OPEN` row `F3`; `pending.md` §C | `M-15` | read the tracker row's count clause | `F3` carries `ALL_TOOLS` 21 → 22 / `RpcMethod` 21 → 22 and marks the pre-correction "19 → 20" stale | **PASS** — matches the measured live census (`21`/`21`) and the recorded correction |
| **BL-15** | `engine-pin.md` §3b `AF-9`, §7.10 | `M-16` | `npm run typecheck` exit code as the compile-time exhaustiveness proof | `tsc --noEmit -p tsconfig.json` → no output, exit `0` | **PASS** — the union census is exhaustive against the record's own `Record<RpcMethod, true>` form |

### 2.4 `dirtied` family (`M-17`–`M-24`)

| ID | DOC source | Record row | Probe | Observed (verbatim) | Result |
| --- | --- | --- | --- | --- | --- |
| **BL-17** | `engine-pin.md` §6 stop condition 2's list; `FORKER.md` battery digest `R7` | `M-17` | demo bootstrap then `await rt.dispatch({target:{kind:'cssId',cssId:'inc'}, event:'click'})` | `["node-5","node-3","node-1"]` — every element a string, `length 3` | **PASS** — non-empty `string[]`, identical to the record |
| **BL-18** | `engine-drift.md` §3.3.4 `M-18` claim | `M-18` | `listTargets()` → the counter entry, then the dispatch | counter `{nodeId:"node-5", propsId:"counter", cssId:"counter"}`; `dirtied.includes("node-5") === true`; content `0 → 1` | **PASS** — the mutated counter's engine nodeId is in `dirtied` |
| **BL-19** | `engine-drift.md` §3.3.4 `M-19` claim | `M-19` | two `dispatch(…, {requestId:'blind-req-A'})` on one runtime | `first.dirtied = ["node-5","node-3","node-1"]` · `second.dirtied = ["node-5","node-3","node-1"]` · deep-equal `true` · counter `0 → 1 → 2` | **FAIL** — the echo half reproduces, the "does not advance twice" half does not; see §3 `F-3` |
| **BL-20** | `engine-drift.md` §3.3.4 `M-22` (an owed measurement, explicitly not an in-repo pin) | `M-22` | two identical `requestId`-free dispatches on one runtime | `d1 = ["node-32","node-30","node-28"]` · `d2 = ["node-32","node-30","node-28"]` · identical `true` · counter `1 → 2` | **PASS** — the set is stable across the repeat; no order pin created |
| **BL-21** | `engine-drift.md` §3.3.4 `M-24` claim (`dirtied` ORDER not pinned) | `M-24` | the verbatim arrays of both paths | dispatch `["node-5","node-3","node-1"]` · requestId-free repeat `["node-32","node-30","node-28"]` (descending by 2, the record's own shape) | **PASS** — recorded verbatim; no order pin invented |
| **BL-22** | `engine-drift.md` §3.3.4 `M-23` claim | `M-23` | `applyCommand` well-formed, then `[null]`, then `null` | `{"status":"applied","dirtied":["node-46"]}` · `{"status":"rejected"}` · `{"status":"rejected"}` | **PASS** — the engine ran for the well-formed write; the rejection shape carries no `dirtied` |
| **BL-23** | `decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE` | `M-20` | `npm run divergence` | `✓ dirtied ids match (normalized) (electron=["node#","node#","node#"] shim=["node#","node#","node#"])` | **PASS** — normalized match on both legs |

### 2.5 Journal family (`M-25`–`M-35`)

| ID | DOC source | Record row | Probe | Observed (verbatim) | Result |
| --- | --- | --- | --- | --- | --- |
| **BL-24** | `engine-drift.md` §3.3.5 `M-25` claim (the report's status union + fields, projected through the host) | `M-25` | `rt.journal('undo')` after a state-slice write | `{status:"applied", scheduledDirtied:["node-5"], redoTopKind:"state-slice", baseBoundary:false}`; `status` ∈ `{applied, no-op, base-boundary}` | **PASS (projection only)** — the engine's own report object stays unmeasured by design (**`M-25` itself remains `UNMEASURABLE` and is not counted here**); the host view carries all three required fields |
| **BL-25** | `engine-drift.md` §3.3.5 `M-26` claim | `M-26` | `Object.keys(res)` and the object minus the two views | keys `["status","scheduledDirtied","redoTopKind","baseBoundary","renderedHtml","ssrHtml","warnings"]` — **no `stackTopKind`**; without views `{status, scheduledDirtied, redoTopKind, baseBoundary}` | **PASS** — the spread-guard behaviour reproduced (an absent kind field is absent, not `undefined`) |
| **BL-26** | `engine-pin.md` §6 stop condition 2's `dirtied` equalities; `journal-endpoint.test.ts` rows | `M-27` | write `content='42'`, then `await rt.journal('undo')` | `status "applied"` · `baseBoundary false` · counter `42 → 0` · `ssrHtml` contains `counter` | **PASS** — ordinary undo is `applied`, no condense |
| **BL-27** | `pending.md` §DEFERRED GAP-1 | `M-28` | `new Runtime({maxJournalLength: 2})`, five writes, one undo, `console.warn` captured | `{status:"applied", scheduledDirtied:["node-18"], stackTopKind:"state-slice", redoTopKind:"state-slice", baseBoundary:false}`; no throw; warn `condense-skipped-size at journal-6: base 2111B >= pre-base journal 584B; no rewrite (raise maxJournalLength)` | **PASS** — status in vocabulary, never throws, and the size guard's own diagnostic reproduced (my journal index reads `journal-6`; the record's take read `journal-7` — the guard, the byte figures' shape and `baseBoundary:false` match) |
| **BL-28** | `pending.md` §DEFERRED GAP-1 | `M-29` (small-graph half) | two writes, three undos, unset `maxJournalLength`, warns captured | statuses `["applied","applied","no-op"]`; `baseBoundary` flags `[false,false,false]`; warns `[]` | **PASS** — the small-graph end is a `no-op`, and no condense diagnostic fires unset |
| **BL-29** | `journal-endpoint.test.ts` replay-clears-redo row | `M-34` | `undo → redo → replay → redo` on the demo | statuses `["applied","applied","applied","no-op"]` | **PASS** — `no-op` **is** reachable on the demo graph; the sequence position differs from the record's wording (mine reaches it on the redo-after-replay, i.e. the last step) |
| **BL-30** | `pending.md` §DEFERRED GAP-2/GAP-3 | `M-32` | `toHaveProperty`-class presence check on a live call | `status` `true` · `baseBoundary` `true` · `scheduledDirtied` `true` | **PASS** — properties present, contents/value boundary untouched |
| **BL-31** | `engine-drift.md` §3.3.5 `M-33` claim; `pending.md` §DEFERRED GAP-11 | `M-33` | `await rt.journal('bogus')` | throws `unknown journal action: bogus` | **PASS** — a documented throw, not a silent no-op |
| **BL-32** | `pending.md` `UPSTREAM-AVAILABLE-0.5` | `M-35` | `typeof rt.journalEntries`; the installed `supervisor.js`/`.d.ts` names | `Runtime.journalEntries` → `undefined`; the dist **declares** `journalEntries` + `JournalEntryView` | **PASS** — available at the engine, **unadopted** by the host (0 `journalEntries` sites under `src/`) |
| **BL-33** | `defects.md` `UNDO-REDO-DESTROY-STATUS` (as filed); `pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS` | `M-31` | `applyCommand({kind:'destroy'})` then `await rt.journal('undo')`, bracketed by `listTargets()` | `destroy verdict {"status":"applied","dirtied":["node-5"]}` · `undo {"status":"no-op","scheduledDirtied":[],"baseBoundary":false}` · lengths `[12,7,7]` · `nodeState(destroyed)` post-undo → `{"ok":false,"thrown":"unresolved target: \"node-5\""}` | **PASS** — the `DRIFTED` row's measured value reproduces **exactly**: the destroy-undo reports `no-op`, **not** the tracker's `applied`; the graph is not restored |

### 2.6 Boolean / removal family (`M-36`–`M-47`, `M-52`–`M-56`)

| ID | DOC source | Record row | Probe | Observed (verbatim) | Result |
| --- | --- | --- | --- | --- | --- |
| **BL-34** | `engine-pin.md` §3.3 + §4.1 `R-1`..`R-5`; greens §2.3 `B-01`..`B-13` | `M-39` | `inert:'true'` / `inert:'false'` / `readonly:'false'` / `readonly:'true'` on both legs | ON DOM `<div … inert="true" …>`, ON SSR `<div id="n-a" inert="true" …>`; OFF DOM `<div data-node-id="node-4" id="n-a">`, OFF SSR `<div id="n-a" data-node-id="node-4">`; `inert="false"` present anywhere → `false`; `readonly` ON present on both legs, OFF absent on both | **PASS** — ON emits the authored form, OFF is **absent**, never `="false"`, on both adapters; two named members |
| **BL-35** | `engine-pin.md` §3.3's `null` row; greens §2.3 `B-10` | `M-36` | `props.inert: null` (DOM leg) | `<div data-node-id="node-10" id="n-a">` — attribute **absent**; markup contains no `inert` | **PASS** — the `null` member is OFF on the DOM leg (matches `B-10`'s recording; the pin unit asserts nothing here) |
| **BL-36** | `engine-pin.md` §3.3 (`:520`-anchored read); §3b `AF-4` | `M-37` | the same `null` member on the SSR leg | `<div id="n-a" data-node-id="node-16">` — attribute **absent** | **PASS** — consistent with the pin spec's read (the SSR branch is entered only when `val !== undefined`) |
| **BL-37** | `decisions.md` `ENGINE-PIN-0.5`; `pending.md` `UPSTREAM-CAPABILITY-FLOOR` | `M-55` | `inert:'false'` vs `download:'false'` through the published adapter behaviour | `inert="false"` → DOM `<div data-node-id="node-18" id="n-a">` (**absent ⇒ IN the set**) / SSR absent; `download="false"` → DOM `<div download="false" data-node-id="node-20" id="n-a">` (**present ⇒ OUT of the set**) / SSR `download="false"` | **PASS** — both membership facts (`inert` present, `download` absent from the set) measured; the count half stays unmeasured (`BL-16`) |
| **BL-38** | `engine-pin.md` §3a `A-4`; `decisions.md` `ENGINE-PIN-0.5` | `M-38` | — | — | **NOT-BLIND-RUNNABLE** — the `27`-member **count** is a `(engine recon)` claim with no documented public route to the set; only membership is observable (`BL-37`). Revisit: a published engine accessor for the boolean set |
| **BL-39** | `engine-pin.md` §3.3 + §2.4a `PF-2`/`PF-3`; §3.4 `PA-2` | `M-41` | the three nullish forms on the attribute paths + `props.value` on an `INPUT` (VALUE_FORMS) | `props.title = undefined` → `applied`, `<div placeholder="p" … id="n-a">` (**REMOVED**, no `title=`) · `props.title = null` → `applied`, `title="null"` (**STRINGIFIED**) · `props.placeholder` with the `value` key **absent** → `applied`, **REMOVED** · `props.value = null` on an INPUT → `applied`; DOM tag `<input placeholder="p" data-node-id="node-2" id="n-a">`, **SSR** `<input id="n-a" placeholder="p" value="null" data-node-id="node-2">`; the shim slot reads `{"value":"null","attr":null,"outer":"<input placeholder=\"p\" … >"}` · `props.value = undefined` → `applied`, absent on **both** legs | **PASS** — every form matches the record and the in-tree pins, including the `PA-2` boundary sentence (`null` is a removal on the attribute paths but **not** on a `VALUE_FORMS` tag: the DOM slot clears to `String(null)`, the SSR form stringifies) |
| **BL-40** | `engine-pin.md` §3a `A-1` + §4.2's conflicting-pair clause; §3.4 `PA-7` | `M-43` | `css:{id:'css-a'}` + `props:{id:'props-a'}` on one node, then three writes | initial `<div title="t" data-node-id="node-21" id="css-a">`; `cssId:"css-a"` / `propsId:"props-a"`; `css.id='from-css'` → `applied`, `id="from-css"`; `props.id='from-props'` → `applied`, `id="from-props"`; `css.id=undefined` → `applied`, **attribute absent** | **PASS** — last write wins the slot, and the `css.id` removal route is the one that clears it (`PA-7`) |
| **BL-41** | `engine-pin.md` §3a `A-3`, §3.5 `P4` | `M-44` | non-scalar `props` values | authored `tags:['x']` → `<div tags="x" …>`; `props.tags=['y']` → `applied`; `props.obj={a:1}` → `applied`; tag after `<div tags="y" … obj="{"a":1}" …>` | **PASS** — the engine's verdict recorded verbatim (`applied`, stringified); nothing pinned |
| **BL-42** | `engine-pin.md` §3a `A-6`, §3b `AF-5`, §3.4 `PA-10`; greens §3a `F-1` | `M-45` | a **bare** name with a nullish value vs the `props.<key>` control | `placeholder = null` → `{"status":"applied","dirtied":["node-46"]}` with markup **byte-identical** before/after (INERT); control `props.placeholder = undefined` → `applied` and `placeholder` **REMOVED** | **PASS** — the bare name is inert and never a removal row; the prefixed control removes |
| **BL-43** | `engine-pin.md` §3.4 `PA-9`; greens §4's closing clause | `M-52` (the `INVALID` row) | the colon twins, re-taken on the permitted `Runtime` route | `props:title = null` → `applied`, markup unchanged (INERT) · `css:title = null` → `applied`, markup unchanged (INERT) · control `props.placeholder = undefined` → REMOVED | **PASS (as the `M-56` replacement's content)** — the colon twins are inert, exactly as the `INVALID` row was re-taken; **the `M-52` row itself remains `INVALID` and is not counted as a pass** |
| **BL-44** | `engine-pin.md` §2.3's kind-scope bullet + §3.5 `P7b`; greens §3 `F-3` | `M-40` | `layer-apply` carrying a `mutation`, then a shape-malformed element | with `mutation` → `{"status":"rejected"}`, markup **unchanged**; `[null]` element → `{"status":"rejected"}` | **PASS** — the mutation-carrying verdict is not pinned and my run reads `rejected` with no attribute change; the shape-malformed half is decidable exactly as the record records it |
| **BL-45** | `engine-pin.md` §3a `A-10` (`M-47`'s claim) | `M-47` | `provident.op` with a nullish `props.title` write through the **battery host** over MCP, then `get_rendered_html` / `get_markdown` | before `<div title="t" data-node-id="node-3" id="n-a">`; `provident.op` → `applied`; after `<div data-node-id="node-3" id="n-a">` (**REMOVED**) | **PASS** — the removal class **is** reachable from the battery-host path, so `A-10`'s battery-host half is covered by the completion, as the record's disposition says |
| **BL-46** | `engine-pin.md` §3a `A-7`, §4.4's "does NOT buy"; greens §4 `SC-2`; `H-r10` | `M-46` | — | — | **NOT-BLIND-RUNNABLE** — the harness has **no attribute-presence extractor** and its demo authors no boolean prop; real-DOM attribute presence is not observable at `[A]`. Revisit: `U-DIVERGENCE-EXT` (`H-r10`) |

### 2.7 The pin-unit hand-offs and the record's own boundary rows

| ID | DOC source | Record row | Probe | Observed (verbatim) | Result |
| --- | --- | --- | --- | --- | --- |
| **BL-47** | `engine-pin.md` §4.1 ("What the two controls are NOT") + §3b `AF-1` | `M-49` | — | no `0.2.1`/`0.4.x` dist is installed; no historical bytes exist in this tree | **NOT-BLIND-RUNNABLE (by construction)** — matches the record's `UNMEASURABLE`; **this run did not convert it into a pass** |
| **BL-48** | `engine-pin.md` §5.5 `P-TP-1`; greens §4 | `M-50` | read `package.json` `devDependencies` | `["@types/node","electron","esbuild","typescript","vitest"]` — no property runner | **NOT-BLIND-RUNNABLE** — the record's `NOT EXECUTED — no PBT harness` status is confirmed as a **fact about the tree** (5 devDeps, no `fast-check`), but the property itself is not executable and is not counted as a pass |
| **BL-49** | greens §4 `H-01` | `M-51` | — | — | **NOT-BLIND-RUNNABLE** — no documented host recipe for the `Supervisor` → `renderProducingProcess` `css.<key>`+`undefined` route; the substance is covered at `[T]/[E]` (`BL-39`), not at the engine-graph layer |
| **BL-50** | `docs/specs/engine-drift.md` §3.3.5 `M-30` | `M-30` | the measurable half only | `new Runtime({maxJournalLength: 2})` demonstrably changes the journal behaviour (the condense size guard fires and reports the threshold), so the option **reaches** the engine | **NOT-BLIND-RUNNABLE (the record's own half)** — the `SecuritySettings` → store → `RuntimeOptions` chain and the `new Supervisor({events, maxJournalLength})` call site are `src/**` reads; the record measures them at `[T]`. My run can only confirm the behavioural end, which it does (`BL-27`) |
| **BL-51** | `engine-drift.md` §3.3.5 `M-57` | `M-57` | — | — | **NOT-BLIND-RUNNABLE** — the store → **IPC** → renderer hop is not observable from a node-layer probe (no IPC transport is exercised); the record's `UNMEASURABLE` verdict stands |
| **BL-52** | `pending.md` `UPSTREAM-AVAILABLE-0.5` | `M-53` | engine availability + the host census | installed `supervisor.js` exposes `dispose` `true` / `finalizeHookCount` `true` / `journalEntries` `true`; `grep "new Supervisor(" src/` → `6`; `grep "\.dispose()" src/` → `0` | **PASS** — `6` constructions / no disposal reproduces the recorded census; adoption is not this unit's |
| **BL-53** | `pending.md` `UPSTREAM-DIAGNOSTICS-BODYRUNS`; `H-r11` | `M-54` | `console.warn` captured across a demo bootstrap + render + markdown | warns `[]` | **PASS (observation only)** — the absence of a warn line is recorded and is **not** read as "nothing was dropped" (`H-r11`) |

---

## 3. FINDINGS — where the blind run contradicts the record or the docs

**A contradiction is reported, never converted into a pass** (`docs/specs/engine-drift.md` §3.5,
§6 stop condition 7). Three findings, each with its observed-vs-documented evidence.

### `F-1` (FAIL) — `M-11`'s `grep -rn "4117"` cell does not reproduce; the tree **does** contain `4117`

- **The record's observed-value cell** (`docs/specs/engine-drift-measurements.md` `M-11`) reads:
  *"`grep -rn "4117" src/ tests/ scripts/ node_modules/provident-ssr/dist/` → `(no output, exit 1)`"*,
  and its claim cell concludes *"**`4117` exists ONLY in documentation, NOT in the tree**"*.
- **My run of the cell's own command, verbatim:**
  `grep -rn "4117" src/ tests/ scripts/ node_modules/provident-ssr/dist/` →
  `node_modules/provident-ssr/dist/core/translate.js:623: * polluted the fork-stress-data census (registered 4161 vs 4117) and broke`
  → **exit 0, one match**.
- **Scope of the contradiction, stated so it is not over-read:** the match is in the **installed
  engine's dist** (a comment in `translate.js`), **not** in `src/`, `tests/` or `scripts/` — those
  three trees return **no match**, and the row's substantive point (the `4117` clone-form number has
  **no observable census** here; only the static family's `23` does) still holds and is confirmed by
  `BL-08`. What fails is the **verbatim observation** that the search over the engine dist returns
  nothing. A later pass citing `M-11` must not quote `(no output, exit 1)`.
- **Doc line it came from:** `docs/specs/engine-drift-measurements.md` `M-11`, observed-value cell,
  column 6 (and its column-7 statement *"`4117` exists ONLY in documentation"*).
- **Routing suggestion:** a tracker/record correction (the row's evidence cell), owner = the
  supervisor / doc-review pass; **no code change**.

### `F-2` (FAIL on reproducibility) — `M-14`'s normalized count is not reproducible from the documented command; the **retirement is justified**

- **The record's observed value:** *"(b) normalized, minus the Node interop artifact: **`24`** →
  `18 provident.* + ["module.disable","module.enable","module.fetch","module.install","module.list",
  "module.update"]` · (a) raw, trailing-dot artifacts kept: `29`"*.
- **My run of the record's own documented census** (same regex
  `[a-z][a-zA-Z]*\.[a-zA-Z_][a-zA-Z0-9_.]*`, same prefixes `provident`/`module`, same
  trailing-dot stripping, same `module.exports` exclusion, over a **fresh** `npm run build` of
  `dist/main/main.cjs`): **raw `33` · normalized `28`**. The four names my filter captures that the
  recorded enumeration does not are `moduleStore.list`, `moduleStore.setDisabled`,
  `moduleStore.status`, and `modules.json` — all of which are `module`-prefixed by the documented
  rule, which the cell does not state to exclude. The record's own predicted extra name,
  **`module.fetch`**, is present in my run too.
- **Why this is a FAIL and not a shrug:** the row's **verdict** (`DRIFTED`, i.e. "the claim's `23`
  does not hold") is **confirmed** — my count is `28`, not `23` — but **the specific measured value
  `24` is not reproducible from column 4 as written**. That is exactly the evidence class the record
  itself retired (`docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`; `docs/specs/engine-pin-greens.md`
  §3a `F-6`'s correction block): a whole-bundle substring census with no stated tokenizer boundary.
  **The retirement is sound; the `24` should not be quoted as a reproducible measurement.**
- **Doc line it came from:** `docs/specs/engine-drift-measurements.md` `M-14`, columns 3/4/6; the
  claim it tests is `docs/specs/engine-pin-greens.md` §2.9 `G-06b` / §3b `F-6`.

### `F-3` (FAIL, narrow) — `M-19`'s counter half does not reproduce: my counter advanced **twice** under a duplicate `requestId`

- **The record's observed value:** *"`first.dirtied = ["node-18","node-16","node-14"]` ·
  `second.dirtied = […]` (deep-equal `true`) · counter after first `"1"`, after second `"1"`"* — i.e.
  the duplicate `requestId` dispatch **does not advance the counter twice**.
- **My run:** `pre "0"` → after first dispatch `"1"` → after second **identical** dispatch with the
  **same** `requestId` (`'blind-req-A'`, and a second runtime with `'R'`) → `"2"`. The `dirtied`
  arrays **are** identical (`["node-5","node-3","node-1"]`, deep-equal `true`) — the **report echo**
  half of the row reproduces — but the **state** half does not: the counter advanced on both
  dispatches in my run.
- **Which half is which:** the record's claim cell has two clauses (*"`second.dirtied` deep-equals
  `first.dirtied`"* **and** *"the counter does **not** advance twice"*). The first is confirmed; the
  second is contradicted by my observation. Because the row is one claim, I record it as a **FAIL**
  rather than splitting it into a pass and a note.
- **Layer caveat that keeps this honest:** mine is a `Runtime`-level rerun of the same public route
  the record used; a **`requestId` idempotence** in the engine may be keyed on something my probe
  does not reproduce (e.g. the record's exact call shape/args). **I am not calling the engine
  wrong** — I am reporting that the recorded value is not reproducible from the command as
  documented, and that the row's second clause must not be relied on as verified.
- **Doc line it came from:** `docs/specs/engine-drift-measurements.md` `M-19`, observed-value cell
  (column 6); the claim's owning row is `docs/specs/engine-drift.md` §3.3.4 `M-19`.
- **Routing suggestion:** retake `M-19` with the exact call shape recorded, or narrow its claim to
  the echo half; owner = the record's / doc-review pass; **no code change is implied by this pass.**

### Recorded observations that are **not** findings (stated so they are not misread as passes or drifts)

| # | Observation | Why it is not a finding |
| --- | --- | --- |
| **O-1** | **Correction to my own first read, recorded so the finding does not stand.** An earlier read of `git status` in this pass filtered the output and made it look as if `tests/engine-pin-*.test.ts` were **committed**; on re-reading (`git ls-files` → **0** of them tracked; every one is an `??` untracked entry), the record's tree block is **accurate**: `git HEAD b27e698` ("Documentation rebuild", 2026-08-26) with the pin tests **uncommitted and present**, which is exactly what `docs/specs/engine-drift-measurements.md`'s header says. **What is worth recording is the narrower point:** the record's enumeration of the uncommitted set (`tests/engine-pin-*.test.ts` + `tests/dom-shim-remove-attribute.test.ts`) is **not exhaustive** — `tests/host-guard.test.ts`, `tests/host-guard-panes.test.ts`, `tests/op-command-unwrap.test.ts` and `tests/fixtures/pane-mutation-fixture.mjs` are untracked too, so `git status` prints more than the quoted list. | A **tree-identification** nuance in an accurate tree block, not one of the measurements I re-ran: the pin agreement (`BL-01`), the census equalities (`BL-03`…`BL-07`) and the counts (`BL-11`…`BL-13`) all reproduce on this tree. §3.2 class 1 turns on identifiability, and the tree **is** identified (commit + named edits + agreeing pin/dist), so no class-1 `INVALID` follows. |
| **O-2** | `npm test` reports `Test Files 56 passed (56)` while `tests/` holds **59** collectable test files; the three not run by vitest are `adapter-parity-battery.test.mjs`, `e2e-battery.test.mjs`, `mcp-stdio-e2e.test.mjs` — i.e. the batteries driven by their **own** scripts (`npm run battery`, `npm run mcp`). | `56` is exactly the number the record and `docs/specs/engine-drift.md` §4.2 quote, so there is **no drift**. Recorded so a later pass does not read "56 vs 59" as a stale count. |
| **O-3** | `M-28`'s guard diagnostic: the record reads `journal-7`, my run reads `journal-6` (same message shape, `base 2111B >= pre-base journal 584B`, `baseBoundary:false`). | The row's claim is the *status vocabulary + never-throws + the size guard's existence*, all reproduced; the journal **index** depends on the write count in the probe, which the row does not pin. Not a FAIL, and not a pass on the index. |
| **O-4** | The divergence leg's `✓ counter increment rendered in BOTH` line prints even though (per the record's own `§2.3` caveat) the check is a **substring** test satisfiable by the demo's `counter-card`/`counter-value` markup. | The record already records this caveat; my run adds nothing and asserts nothing about it. **No row here reads that check as an increment-render assertion.** |
| **O-5** | `M-45`'s re-take in the record shows `dirtied` on a bare-name INERT write (`{"status":"applied","dirtied":["node-46"]}`); my run reads the same (`dirtied:["node-46"]`, markup byte-identical). | Reproduces the record exactly; recorded because an inert write carrying a non-empty `dirtied` is counter-intuitive and a later pass should not read it as a removal. |

---

## 4. Exact commands (every row's column 4, reproducible verbatim)

```bash
# --- the five legs, in the contract's order (§5.3) ---
npm test            # vitest run                      -> Test Files 56 passed (56); Tests 795 passed | 2 skipped (797)
npm run typecheck   # tsc --noEmit -p tsconfig.json  -> no output, exit 0
npm run build       # esbuild bundles                -> 5 bundles, exit 0
npm run battery     # dist/main/battery-host.mjs via tests/e2e-battery.test.mjs
                    #                                -> BATTERY RESULT: 184 checks, 0 failures, exit 0
npm run divergence  # scripts/electron-divergence.mjs (rebuilds first)
                    #                                -> R13 RESULT: 9 checks, 0 failures, exit 0

# --- the corpus / tree reads ---
python3 -c "import json;print(json.load(open('package.json'))['dependencies']['provident-ssr']);print(json.load(open('node_modules/provident-ssr/package.json'))['version'])"
python3 -c "import json;print(json.load(open('package-lock.json'))['packages']['node_modules/provident-ssr'])"
grep -rn "4117" src/ tests/ scripts/ node_modules/provident-ssr/dist/   # <- M-11's own command (F-1)
grep -rn "new Supervisor(" src/ | wc -l
grep -rn "\.dispose()" src/ | wc -l
grep -rn "journalEntries" src/ | wc -l
npx vitest run --reporter=json --outputFile=/tmp/engine-drift-blind/vitest.json   # which files vitest collects

# --- the [H]/[T]/[E] probe surface: modules imported as a BLACK BOX from /tmp (§2.1 P1) ---
# /tmp/engine-drift-blind/entry.mjs re-exports ONLY documented public names, then:
node_modules/.bin/esbuild /tmp/engine-drift-blind/entry.mjs --bundle --platform=node --format=esm \
  --outfile=/tmp/engine-drift-blind/bundle.mjs
node /tmp/engine-drift-blind/p1-census.mjs      # census family:      BL-03..BL-07
node /tmp/engine-drift-blind/p2-counts.mjs      # counts family:      BL-11..BL-15, BL-12's MCP list
node /tmp/engine-drift-blind/p3-dirtied.mjs     # dirtied family:     BL-17, BL-18, BL-20..BL-22
node /tmp/engine-drift-blind/p3b-m19.mjs        # the requestId echo retake: BL-19 (F-3)
node /tmp/engine-drift-blind/p4-journal.mjs     # journal family:     BL-25..BL-32
node /tmp/engine-drift-blind/p4b-m31.mjs        # the destroy-undo row: BL-33
node /tmp/engine-drift-blind/p5-boolean.mjs     # boolean/removal:    BL-34..BL-37, BL-39..BL-44
node /tmp/engine-drift-blind/p6-misc.mjs        # shape/availability: BL-52, BL-53, BL-48
node /tmp/engine-drift-blind/p7b.mjs            # VALUE_FORMS + battery-host removal: BL-39, BL-45
```

**The `[B]` leg's own route** (documented at `docs/specs/engine-drift.md` §2.1 `P3`): spawn
`node dist/main/battery-host.mjs --mcp-transport=stdio` with the MCP SDK's `StdioClientTransport`
and drive `provident.load` / `provident.op` (`{ command: OpCommand }` — the shape
`docs/specs/e2e-test-battery.md` names) / `provident.list_targets` / `provident.get_rendered_html` /
`provident.get_markdown`. **Noted boundary: `provident.op`'s schema rejects an input whose `value`
key was dropped by JSON serialization** (`MCP error -32602 … expected nonoptional, received
undefined at command`) — so a *removal* write cannot be driven over MCP with a JSON `undefined`;
this run drove `null` there (which does reach the removal path) and used the `Runtime` route for
the `undefined` forms.

**Run counts**

| Leg / artifact | Command | Verbatim result | Exit |
| --- | --- | --- | --- |
| node suite | `npm test` | `Test Files 56 passed (56)` · `Tests 795 passed \| 2 skipped (797)` | `0` |
| typecheck | `npm run typecheck` | no output (clean) | `0` |
| build | `npm run build` | 5 bundles (`main.cjs 1.2mb`, `preload.cjs 2.6kb`, `standalone.mjs 1.2mb`, `battery-host.mjs 1.5mb`, `renderer.js 341.1kb`) | `0` |
| battery | `npm run battery` | `BATTERY RESULT: 184 checks, 0 failures` | `0` |
| divergence | `npm run divergence` | `R13 RESULT: 9 checks, 0 failures` (8 comparison `✓` lines + `✓ electron: dispatch renderedNonEmpty`) | `0` |
| this scenario set | the `/tmp/engine-drift-blind/*.mjs` runs above | **51 rows — 42 PASS / 3 FAIL / 6 NOT-BLIND-RUNNABLE** (+1 `INVALID` row not counted) | — |

**Stack this run was taken on:** node **v24.20.0**; declared pin `^0.5.1`; installed dist **0.5.1**;
`git HEAD b27e698` with **modified-not-committed** `docs/**`, `package.json`, `package-lock.json`,
`scripts/electron-divergence.mjs`, `src/renderer/{renderer,runtime,secure-panels}.ts`,
`src/shared/dom-shim.ts`, plus the untracked `docs/specs/engine-drift-measurements.md` and this file;
`DISPLAY` present; Electron 44.4.5 (reported by the divergence leg's own output). **Every leg was
run on this one tree, after `npm run build`, and no tracked file was modified by this pass.**

---

## 5. NOT-BLIND-RUNNABLE — the record complete

**Count arithmetic, stated so the numbers reconcile** — **CORRECTED 2026-09-27 by the unit's
per-unit documentation review (AGENTS.md item 10d / RCA-6), which re-enumerated every `BL-nn` row.
The CORRECTION NOTE below this paragraph records what was wrong and what now stands.** This section
records **8 `NOT-BLIND-RUNNABLE` ids** (`BL-16`, **`BL-38`**, `BL-46`…`BL-51`). **Seven** of them —
**`BL-38`** *and* `BL-46`…`BL-51` — are **scenario rows of §2 as well** (`BL-38`'s row in **§2.6**
carries the `NOT-BLIND-RUNNABLE` result), so the scenario set's own breakdown is: **51 rows
(`BL-01`…`BL-51`) = 42 PASS + 3 FAIL + 7 NOT-BLIND-RUNNABLE** — the 42 PASS rows are
`BL-01`…`BL-15`, `BL-17`…`BL-37`, `BL-39`…`BL-45` and `BL-52`/`BL-53`; the 3 FAIL rows are `BL-09`,
`BL-13`, `BL-19`; and the scenario rows recording `NOT-BLIND-RUNNABLE` are **`BL-38`, `BL-46`,
`BL-47`, `BL-48`, `BL-49`, `BL-50`, `BL-51`** — **7**, not 6. **`BL-16` is the ONE id recorded in
this section alone** (it carries **the same unreachable claim as `BL-38`** — `M-38`'s `27`-member
count — as its own auditable id); it is a **section id, not a 52nd scenario row**, so `BL-16` +
**51** scenario rows = the section's **8** ids, and **no scenario row is unaccounted for**.
**No NOT-BLIND-RUNNABLE row is counted as a pass** (`docs/specs/engine-drift.md` §3.5).

> **⟶ CORRECTION NOTE (2026-09-27, the `U-ENGINE-DRIFT` per-unit documentation review — a
> status/count correction only; no scenario, no verdict, no `M-n` row and no revisit condition is
> changed).** This section previously read: *"**Six** of them (`BL-46`…`BL-51`) are rows **of §2** as
> well, which is why the header reads *6* NOT-BLIND-RUNNABLE: **51 scenario rows = 42 PASS + 3 FAIL +
> 6 NOT-BLIND-RUNNABLE**. `BL-16` and `BL-38` are **two ids for the same unreachable claim** …
> recorded **in this section only** — they are listed here for completeness and are **not** part of
> the 51, so the section's 8 ids and the header's 6 do not conflict."* **Two counts in that sentence
> were stale, and they are corrected in place:**
> 1. **`BL-38` IS a §2 scenario row** (its **§2.6** row carries the `NOT-BLIND-RUNNABLE` result and
>    it was counted inside the 51). The §2 ids recording `NOT-BLIND-RUNNABLE` are therefore **seven**
>    (`BL-38`, `BL-46`…`BL-51`), not the six the old sentence named — so the old *"the header's 6 and
>    the section's 8 do not conflict"* reconciliation was **arithmetically wrong** (`42 + 3 + 6 = 51`
>    cannot hold with `BL-38` inside the 51).
> 2. **`BL-16` is the only section-only id** — the old sentence named **`BL-16` and `BL-38`** as the
>    two section-only ids; **`BL-38` is not section-only**.
> **WHAT IS *NOT* CHANGED BY THIS NOTE (stated so the correction is not over-read):** the **`42 PASS`
> and `3 FAIL`** figures, **every `BL-nn` → `M-n` mapping, every verdict, every revisit condition**,
> and the **`M-38` count claim's `UNMEASURABLE` disposition** are untouched — this correction moves
> **counts**, never a result. **The header (and every downstream citation, including
> `docs/specs/engine-drift-measurements.md`, `docs/next-steps.md`'s DONE record and
> `docs/FORKER.md`) still reads `42 PASS / 3 FAIL / 6 NOT-BLIND-RUNNABLE`:** that line is the
> **as-filed summary** of this blind run, and it is **kept as filed** (it is the historical run
> record, and 4 active files quote it) — a reader must take the numbers from **this section's
> enumeration above**, which is the corrected one. **`docs/specs/engine-drift-measurements.md`'s
> `c = 7` `UNMEASURABLE` ledger is unaffected in either direction**: it is the **record's own**
> enumeration of its own `M-n` rows, and was never derived from this file's row count.

| ID | Record row | The claim | Why it cannot be blind-run | Recorded revisit condition |
| --- | --- | --- | --- | --- |
| **BL-16** | `M-38` | the engine's closed boolean set is **27 members** | a `(engine recon)` count with **no documented public route** to the set; only membership is observable (BL-37) | a published engine accessor for the boolean set |
| **BL-38** | `M-38` (the count half, listed again because the main table's row is the same claim) | the same `27`-member count — this greens set records it as its own NOT-BLIND-RUNNABLE row id so the count is auditable | the set is not enumerable through any documented surface | a published engine accessor for the boolean set |
| **BL-46** | `M-46` | real-DOM attribute presence/absence | no attribute-presence extractor in the harness; the demo authors no boolean prop; `[A]` asserts no attribute row | `U-DIVERGENCE-EXT` (`H-r10`) |
| **BL-47** | `M-49` | `^0.2.1` → `^0.5.1` changed the rendered output at all | no `0.2.1`/`0.4.x` dist is installed and the architect excluded the historical capture (ruling 2) | an architect-supplied `0.2.1` tree/artifact |
| **BL-48** | `M-50` | the command-surface totality property | no PBT harness in the tree (5 devDeps, no property runner) — the property is not executable | a PBT harness (`fast-check` etc.) admitted by its own gate |
| **BL-49** | `M-51` | the `css.<key>`+`undefined` route through the graph engine | no documented host recipe at the blind layer; the substance is covered at `[T]/[E]` | a documented host recipe |
| **BL-50** | `M-30` | `SecuritySettings` → store → `RuntimeOptions` → `new Supervisor({maxJournalLength})` | the record's own half is a `src/**` read (`[T]`); only the option's behavioural end is drivable from a probe | the record's `[T]` row (already measured there) |
| **BL-51** | `M-57` | the store → **IPC** → renderer hop | a node-layer probe exercises no IPC transport | an IPC-layer harness |
| — | `M-52` | (carried `INVALID`) the colon-twin first take | taken through a self-mis-wired route; **not evidence, not a pass**; its replacement `M-56` was re-driven here (BL-43) | already re-taken as `M-56` |

---

## 6. What the unit's DONE row may and may not rest on

**May rest on (independently reproduced in this blind run, on the current tree):**

- **the census equalities** — `M-3` (5 fields), `M-4` (5/5 on the §4.2 `BASE` envelope), `M-5`
  (12/12 both legs), `M-6` (post-teardown `inTree === 1` + the battery check), `M-7`/`M-9`
  (d12 = 23/23 + the 4095 element count);
- **the count equalities** — `M-12` (`RpcMethod` = 21 members, the recorded list exactly), `M-13`
  (`ALL_TOOLS` = 21, no duplicates, battery host registers 18), `M-15` (the trackers' `21 → 22`
  forward move + the stale-pair correction);
- **the `dirtied` behaviour** — `M-17`/`M-18` (non-empty `string[]`, contains the mutated counter's
  nodeId), `M-20` (normalized match on both legs), `M-22` (stable set across a `requestId`-free
  repeat with a double advance), `M-23` (presence vs the `{status:'rejected'}` control), `M-24`
  (order recorded, not pinned) — **but NOT `M-19`'s "does not advance twice" clause** (`F-3`); the
  duplicate-`requestId` **report echo** reproduced, the counter half did not;
- **the journal family** — `M-26` (the spread-guard key set), `M-27` (`applied`, `baseBoundary`
  false), `M-28` (status vocabulary, never throws, the size guard's diagnostic), `M-29`
  (small-graph `no-op` end), `M-32`, `M-33` (the documented throw), `M-35` (`journalEntries`
  available, unadopted);
- **both `DRIFTED` rows' measured values** — **`M-31`** (`no-op`, empty `scheduledDirtied`, graph not
  restored — **the single most load-bearing confirmation in this run**), and `M-14`'s **verdict**
  (the claim's `23` does not hold; `module.fetch` is the extra tool-ish name) **with its `24`/`29`
  numbers excluded** (`F-2`);
- **the boolean/removal contract the pin spec pins** — `M-39` (ON emits the authored form; OFF is
  absent, never `="false"`; two named members, both legs), `M-36`/`M-37` (the `null` member), `M-55`
  (the two membership facts), `M-41` (the three nullish forms + the `PA-2` `VALUE_FORMS` boundary,
  DOM and SSR recorded separately), `M-43` (the conflicting `css.id ≠ props.id` pair + the `css.id`
  removal), `M-44` (recorded engine verdict), `M-45`/`M-56` (bare-name and colon-twin inertness with
  the prefixed control removing), `M-40`, `M-47` (the battery-host removal path);
- **the leg baselines** — `M-48` (`R13 RESULT: 9 checks, 0 failures`), and the suite/battery/typecheck
  counts, all **quoted, not rebaselined**.

**May NOT rest on:**

- **`M-11`'s `grep` cell or its `(no output, exit 1)`** — contradicted (`F-1`). The row's *substantive*
  separation (only the static family's `23` is observable here) survives and may be cited.
- **`M-14`'s `24` as a reproducible number** — the documented command yields `28` under my filter
  (`F-2`). The row's **verdict** may be cited; the **number** may not, and the whole-bundle raw string
  census stays retired as an evidence class.
- **`M-19`'s "does not advance twice" clause** — contradicted by my observation (`F-3`). Only the
  report-echo half may be cited.
- **`M-25`'s raw engine report object** — not observable through a permitted surface; only the host
  projection is (`BL-24`), exactly as the record's own `UNMEASURABLE` verdict says.
- **`M-30`'s `src/**` chain, `M-57`'s IPC hop, `M-38`'s `27`-member count, `M-46`, `M-49`, `M-50`,
  `M-51`** — each stays `UNMEASURABLE`/unreachable here, with its revisit condition; **a "no-drift"
  reading of this run must not be presented as covering them** (`docs/specs/engine-drift.md` §0.2,
  §3.6).
- **any assembled-app or IPC-layer claim** — this run produced an envelope/pure-layer green (suite),
  a shim-host-over-MCP green (battery) and a structural-surfaces-only green (divergence). **None of
  them is IPC-layer evidence**, and the `9/0` divergence leg asserts no attribute row
  (Layer declaration, anchor 2).

**And, stated for the record:** this greens set was authored by an agent that did **not** write the
implementation or the measurement record — it re-derived its scenarios from the documentation and ran
them against the live modules/host. Where it contradicts the record, the contradiction is filed above
as a finding and **no contradicting row was converted into a pass**.
