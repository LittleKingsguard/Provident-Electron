# Green Scenarios — `U-MOUNTGUARD` (the cross-envelope mount cardinality/identity probe) — blind run

**Status: `BLIND RUN (one pass) — 56 scenarios: 48 PASS / 2 FAIL / 6 NOT-BLIND-RUNNABLE`.**
**The two FAILs are findings, not passes** (§8 carries them verbatim with observed-vs-documented
evidence; one is the claim under test — the host defect — and its fix is VERIFIED, the other is a
**teardown-path hole the unit's own row set does not cover**). **No FAIL was converted, no row was
marked runnable to raise the count, and no row was re-scoped to make it pass.**
**⟶ SECTION-REFERENCE CORRECTION (kept visible): the as-filed header line above pointed at `§8` for the
FAIL rows and at `§8.6` for NBR reasons — the FAIL rows are **§8** (`TEAR-3`, `TEAR-4`) and the
NOT-BLIND-RUNNABLE rows are **§7** (`NBR-01`…`NBR-06`); `§8` holds no NBR row. No verdict, count or row
moved — this is a pointer correction in the record's own cross-references.**
**⟶ RUN RECORD + LIVE STATE (2026-09-27, the per-unit documentation review): the counts in the status
line above are THIS PRE-FIX RUN'S OWN readings (`41`-row unit file / `913` passed) and are preserved as
the record of that run; today the unit's file is **`44` rows** and the suite is **`59` files / `916`
passed / `2` skipped / `0` failed**. The two FAILs are **`RESOLVED-BY-PINNING`** (§6's `TEAR-3`/`TEAR-4`
rows and §8's heading carry the annotation; the verdicts stand as returned). See §3's `DATED-COUNT
POINTER` and §6.**

**⟶ CURRENT STATUS OF THE TWO FAILS (added 2026-09-27 by the per-unit DOCUMENTATION REVIEW —
annotation only; the run's own verdicts below are NOT rewritten; read it with the header note above,
which it deliberately does not repeat): both `TEAR-3` and `TEAR-4` are `RESOLVED-BY-PINNING`.**
The contract now **pins the drive** this run measured: the spec's appended **§3.1 `M-19`** is the row
for the never-bootstrapped `teardown()` drive (cycle 1 = ONE mounted root that IS the graph's live
in-tree root; cycles 2/3 = ZERO), **§1.1** is re-pinned to the drive, **§3.1 `M-11`/`M-12`** name their
(bootstrapped) drive, and the two rows are recorded as ONE finding in the spec's disposition table —
**`docs/specs/mount-invariant-guard.md` §3b `ADV-1`/`ADV-8`.**
**No code changed for this**: `teardown()` was not altered (the `RED-5` clause forbids it), and the
record's two FAIL rows, their evidence and every other verdict in this file stand exactly as returned
(§8's own rule: nothing laundered, nothing converted to a pass). **The FAILs were correct as filed;
the contract was the thing that was under-specified, and it has been fixed.**

**Date stamp:** the host clock reads **2026-09-25** during this work (`date -u`); this unit, its
contract and its trackers file the work under **2026-09-27** (the same host-clock-vs-filing-calendar
offset `docs/specs/engine-drift-greens.md` and `docs/specs/ci-ui-leg-greens.md` record). **Cite the
filing date.**

**Authored and run WITHOUT reading the implementation.** The sources read to derive every scenario were
documentation only: `docs/specs/mount-invariant-guard.md` (the unit's contract — status block, the
amendment blocks, the Layer declaration, §1, §2.1–§2.4, §3.1/§3.2/§3.3, §3a `RED-1`…`RED-6`, §4, §5,
§6, §7, §8), `docs/specs/runtime-host.md` (the `Runtime` surface: `loadEnvelope` / `loadDoc` / `load` /
`code.*` / `exportLegacy` / `exportSerialized` / `teardown` / `listTargets`, and §2's **D9** clause that
the CRUD envelope is populated ONLY by a load path), `docs/specs/runtime-host-greens.md` (the setup idiom
`installShim()` + `new Runtime({ mount: mountEl(), envelope: demoEnvelope() })`, the `mount.innerHTML === ''`
teardown rows, and the `placementEnvelope(4)` → `inTree === 7` row), `docs/specs/mcp-endpoint.md`
(`code.loadBatch`'s `ops[]` payload shape), `docs/specs/listhost.md`, `docs/specs/slothost.md`,
`docs/specs/projection.md`'s Layer declaration, `docs/specs/engine-drift-greens.md` +
`docs/specs/ci-ui-leg-greens.md` (the `*-greens.md` conventions), `README.md`, `AGENTS.md`, `package.json`.

**Files NOT read to derive a scenario:** nothing under `src/**` was read for any scenario's *content*,
and nothing under `tests/**` was read at any point. Modules were imported as a **black box** through an
`esbuild` bundle emitted into `/tmp/mountguard-blind/` from the module paths the docs name
(`src/shared/dom-shim.ts`, `src/renderer/runtime.ts`, `src/shared/demo-envelope.ts`,
`src/shared/path-fork-cycle.ts`, and this unit's own `src/shared/mount-invariant-guard.ts`). Public
export **names** were enumerated at runtime (`Object.keys`) rather than read from source; no body of any
module was read; no private field was touched.

**Two narrow, declarable reaches — recorded so the blindness claim is exact:**

1. **The static prohibition census (§2.2 / §3a `A-13`) was run as a `grep -c` TOKEN CENSUS** over
   `src/shared/mount-invariant-guard.ts` (the token list below) — **the file's content was not read**,
   and the census is scored as **NOT-BLIND-RUNNABLE** anyway (§7 `NBR-01`), because a token census is not the
   semantic read the clauses ask for.
2. **The `[U]` leg's preconditions were checked by RUNNING the leg** (`npm run ui`, exit `0`,
   `UI RESULT: 0 failures (11/11 assertions green …)`): the leg **now cleans its scratch profiles** and
   is green on this tree. **This unit's optional real-DOM cardinality row is nevertheless
   NOT-BLIND-RUNNABLE** (§7 `NBR-05`) — the leg contains no drive for it; the row is not in the leg.

**The only repo file this pass wrote is this one.**

---

## 1. Layer declaration — exactly what this run proves

| Label | Layer | What the rows below were read on | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own vitest suite (`npm test`) and `src/shared/dom-shim.ts`'s element tree under node | a browser; the assembled app |
| **[H]** | host-side | this repo's `src/**` as observed **through** its documented public API — `new Runtime({mount, envelope})`, `bootstrap()`, `loadEnvelope()`, `loadDoc()`, `codeLoad()`, `codeLoadBatch()`, `exportLegacy()`, `exportSerialized()`, `teardown()`, `listTargets()`, `renderedHtmlResult()` — plus `esbuild` bundling | engine-internal behaviour |
| **[E]** | engine-side | the installed `provident-ssr` **0.5.1** dist, as reached through the `Runtime`/shim surfaces | a package-defect call |
| **[P]** | probe-layer | this unit's own `probeMountInvariant` / `assertMountInvariant` from `src/shared/mount-invariant-guard.ts`, imported as a black box | host or engine behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — run **once** here for its preconditions and its live status | a mounted cardinality row; assembled-app acceptance |

**Honesty anchors (carried from the unit's own Layer declaration and from
`docs/specs/engine-drift-greens.md` §1):**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** No window was
   booted by it, no IPC round-trip ran, no MCP transport was exercised, and no real DOM was touched.
2. **The count taken by every row below is a count of ENGINE-EMITTED elements** (direct children carrying
   a non-empty `data-node-id`), never of DOM roots.
3. **`[T]`/`[P]` cardinality says what the shim's tree holds.** The shim implements no layout, no CSS
   resolution, no `querySelector*` and no `getComputedStyle`; a green here is not a real-DOM tree
   assertion.
4. **A green `divergence` leg is structural-surfaces-only evidence, never IPC-layer evidence** — the
   `LIVE-OP-REJECT` lesson.
5. **No row below converts a node-green into an app claim**, and no row reads the `[U]` leg's green as
   this unit's optional row.

---

## 2. Exact commands (as run; the two probe scripts live outside the repo)

```bash
# --- the scenario sets (authoritative) ---
node /tmp/mountguard-blind/run-valid.mjs    # §4  (M/F/I families + the §2.1 surface rows) -> TOTAL 40 PASS / 0 FAIL
node /tmp/mountguard-blind/run-defect.mjs   # §5/§6 (host-defect + teardown verification)      -> TOTAL 8 PASS / 2 FAIL
node /tmp/mountguard-blind/run-tear3.mjs    # §6's TEAR-3 re-take with two controls (verbatim)
node /tmp/mountguard-blind/p0-exports.mjs   # the documented export NAMES, enumerated at runtime

# --- how the black-box bundles were produced (no repo file read) ---
mkdir -p /tmp/mountguard-blind/bundle
node_modules/.bin/esbuild src/shared/dom-shim.ts src/renderer/runtime.ts \
  --bundle --platform=node --format=esm --external:provident-ssr --external:'provident-ssr/core/*' \
  --outdir=/tmp/mountguard-blind/bundle --out-extension:.js=.mjs
node_modules/.bin/esbuild src/shared/mount-invariant-guard.ts src/shared/demo-envelope.ts \
  src/shared/path-fork-cycle.ts src/shared/types.ts \
  --bundle --platform=node --format=esm --external:provident-ssr --external:'provident-ssr/core/*' \
  --outdir=/tmp/mountguard-blind/bundle --out-extension:.js=.mjs
ln -sfn "$PWD/node_modules" /tmp/mountguard-blind/node_modules

# --- the corroboration legs, in the contract's order (§5.2 + AGENTS.md item 4) ---
npm test                     # vitest run
npm run typecheck            # tsc --noEmit -p tsconfig.json
npm run build                # esbuild bundles
npm run battery              # dist/main/battery-host.mjs
npm run divergence           # scripts/electron-divergence.mjs (rebuilds first)
npx vitest run tests/mount-invariant-guard.test.ts     # the unit's own row file — COUNT ONLY, not read

# --- the declared reach: token censuses (no file content read) ---
for t in region Region pane tab zone ShellRegionName ShellRegionSpec ShellRegions createElement document \
         window matchMedia getComputedStyle activeElement querySelector querySelectorAll getElementById \
         closest localStorage node:fs electron "from '../renderer" WeakMap ; do
  printf "%-22s %s\n" "$t" "$(grep -c -- "$t" src/shared/mount-invariant-guard.ts)" ; done
python3 -c "…ALL_TOOLS / RpcMethod union census over src/main/mcp-server.ts + src/shared/types.ts…"   # 21 / 21

# --- the declared reach: the [U] leg's precondition check (its own optional row stays untaken) ---
npm run ui
```

**Runner / stack:** Node **v24.20.0**; engine `provident-ssr` **0.5.1** installed with declared pin
**`^0.5.1`** (agreeing); Electron **`^44.4.5`**; `git HEAD` **`c5354cc`** with a **clean** working tree
(`git status --short` → empty) before this pass wrote only this file.

---

## 3. Run counts (the run's arithmetic)

| Leg / artifact | Command | Verbatim result | Exit |
| --- | --- | --- | --- |
| scenario set `[P]`/`[T]`/`[H]` (§4) | `node /tmp/mountguard-blind/run-valid.mjs` | `TOTALS {"total":40,"PASS":40}` | `0` |
| defect + teardown verification (§5/§6) | `node /tmp/mountguard-blind/run-defect.mjs` | `TOTALS {"total":10,"PASS":8,"FAIL":2}` | `0` |
| the unit's own row file (count only) | `npx vitest run tests/mount-invariant-guard.test.ts` | `✓ tests/mount-invariant-guard.test.ts (41 tests) 64ms` · `Test Files 1 passed (1)` · `Tests 41 passed (41)` | `0` |
| node suite `[T]` | `npm test` | `Test Files 59 passed (59)` · `Tests 913 passed \| 2 skipped (915)` | `0` |
| typecheck `[H]` | `npm run typecheck` | no output (clean) | `0` |
| build `[H]` | `npm run build` | 5 bundles (`main.cjs 1.2mb`, `preload.cjs 2.6kb`, `standalone.mjs 1.2mb`, `battery-host.mjs 1.5mb`, `renderer.js 343.3kb`) | `0` |
| battery `[B]` | `npm run battery` | `BATTERY RESULT: 184 checks, 0 failures` | `0` |
| divergence `[A]` | `npm run divergence` | `R13 RESULT: 9 checks, 0 failures` | `0` |
| `ui` leg `[U]` (precondition check only) | `npm run ui` | `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)` · measurement `427x22` · `leftover profiles: NONE` | `0` |
| static censuses | the two commands in §2 | `ALL_TOOLS` **21** · `RpcMethod` **21** · forbidden-token census: **0** for every token except `document` (**2**, both occurrences the word "document" followed by a space, i.e. the phrase "document order" in prose) | `0` |
| **this record** | all of the above | **56 rows — 48 PASS / 2 FAIL / 6 NOT-BLIND-RUNNABLE** | — |

**The row arithmetic, so it closes:** §4 `40` + §5 `4` + §6 `4` + **§7 `6`** = **56** scenario rows;
`40 + 4 + 4 + 0 = 48` PASS, `2` FAIL (`TEAR-3`, `TEAR-4`, both in §6 and detailed in §8), `6`
NOT-BLIND-RUNNABLE (§7's `NBR-01`…`NBR-06`). **⟶ DATED-COUNT POINTER (added 2026-09-27 by the per-unit
documentation review; the figures in this table are THIS RUN'S OWN readings and are the record of that
run, not live counts):** today's values are **`59` files / `916` passed / `2` skipped / `0` failed**
(the pass that appended `M-17`/`M-18`/`M-19` took the unit's file from **`41`** to **`44`** rows, and
the suite from `913` to `916` passed), and the unit's own file reads **`44 passed (44)`**; `typecheck` /
`build` / `battery` `184/0` / divergence `9/0` / `ui` `11/11` are **unchanged today**. **Nothing in this
row is retracted — `913` and `41 passed (41)` were correct when taken, and every verdict, count and
citation above is preserved as that run's evidence.** **The six §7 rows carry a NOT-BLIND-RUNNABLE verdict and are
the record's own scenario rows, not extra reasons** (the count defect `docs/specs/ci-ui-leg-greens.md` §3
had to correct is avoided by stating this explicitly).

**Two self-corrections inside this run, recorded so they are not read as findings or as passes:**

- **The `M-13` `code.loadBatch` drive failed on its FIRST attempt** — `batchErr="code.loadBatch: unknown
  op 'undefined'"` — because I authored the ops payload from `docs/specs/mount-invariant-guard.md` §3.1
  `M-13` alone, which names the call but **not its `ops[]` shape**; re-driven with the shape
  `docs/specs/mcp-endpoint.md` §4 pins (`[{op:'set'|'create'|'delete', path, value?}]`) it is **green**.
  **The row is PASS on the documented payload; the first drive is recorded as a doc gap (§9.3), not as a
  FAIL.**
- **The `assert`-throw row's first assertion was written too strictly** (it counted a plain `Error`'s own
  `message` as an "additional property"); corrected to the clause's actual wording — *"a plain `Error`,
  no additional properties"* beyond `message`/`stack` — after which it is **green**. **The clause is
  satisfied; the correction is my checker's, not the module's.**

---

## 4. The scenarios — `[P]`/`[T]`/`[H]`: §3.1 `M`, §3.2 `F`, §3.3 `I`, and §2.1's surface

`Doc section` cites the unit's contract **by section and row id** (never by line number). Every row was
driven by `node /tmp/mountguard-blind/run-valid.mjs` (§2). **40 rows — 40 PASS.**

### 4.1 §3.1 valid / happy states (`M` family)

| Id | Doc section (row) | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **MG-01** | `MOUNTGUARD` §3.1 `M-1` | `new Runtime({mount, envelope: demoEnvelope()}).bootstrap()` → `probeMountInvariant(mount)` | `ok=true count=1 roots=1 nodeIds=["node-1"] violation=null`; `roots[0].nodeId="node-1"`; `elementIsDirectChildByRef=true` | **PASS** |
| **MG-02** | §3.1 `M-2` (after ONE re-derivation) | bootstrap → `loadEnvelope(demoEnvelope())` → probe | `ok=true count=1 roots=1 nodeIds=["node-25"] violation=null` | **PASS** |
| **MG-03** | §3.1 `M-3` (**amended five-point wording**) | one mount, one sequence: construct → P0 probe → `bootstrap()` → P1 → three `loadEnvelope(demoEnvelope())` → P2/P3/P4; mount reference captured | `P0..P4 counts=[0,1,1,1,1] mountRefStable=true P0.violation=no-root P1..P4.ok=[true,true,true,true]` | **PASS** — reproduces the contract's own amended measurement (`0/1/1/1/1`) exactly |
| **MG-04** | §3.1 `M-4` (identity) | bootstrap → probe → `listTargets()` → probe with `{rootNodeId: <observed root>}` | `probe={ok=true count=1 roots=1 nodeIds=["node-85"] violation=null expectedRootNodeId=true}`; `listTargets.inTree=12` | **PASS** — see §9.1 for the honest form of this row (circular, as documented) |
| **MG-05** | §3.1 `M-5` + §2.2 prohibition 3 | probe with **no** `expect` | `hasOwnProperty(expectedRootNodeId)=false value=undefined ok=true` | **PASS** — the field is **absent**, not `undefined`/`null` |
| **MG-06** | §3.1 `M-6` | capture the mount, 3 re-derivations, probe with `{mount: captured}` each time | `refEqual=[true,true,true] violations=[null,null,null] counts=[1,1,1]` | **PASS** |
| **MG-07** | §3.1 `M-7` + §2.4 item 3 | two caller-created children (no `data-node-id`) appended **before** the probe | `count=1 foreignSiblings=2 refsInOrder=true childrenLen before/after=3/3` | **PASS** — foreign siblings reported by reference and **nothing swept** |
| **MG-08** | §3.1 `M-8` | `probeMountInvariant(null / undefined / '' / 42)` | `threw=null`; all four: `ok=false code=mount-not-appendable count=0 roots=0 echo=true` | **PASS** |
| **MG-09** | §3.1 `M-9` | `probeMountInvariant(mount, 'nope' / 42 / [])` | `threw=null`; all three: `ok=false code=expect-mismatch` | **PASS** |
| **MG-10** | §3.1 `M-10` (**+ §7 item 14's limitation**) | `assertMountInvariant(mount)` then a separate `probeMountInvariant(mount)` | `projectionDeepEqual=true treeReferencesNotCopies=true asserted={ok=true count=1 roots=1 … violation=null}` | **PASS (the recorded closest falsifiable form)** — the identity-equal-to-the-internal-call half is **not observable** and is NOT claimed (§7 `NBR-04`) |
| **MG-11** | §3.1 `M-11` (**amended two-layer wording**) | bootstrap → `teardown()` → probe + `mount.innerHTML` + the census | `mountHalf={ok=false count=0 roots=0 violation=no-root}` · `mountHTML=""` · `graphHalf.inTree=1` · `census={"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}` | **PASS** — **both halves asserted together** |
| **MG-12** | §3.1 `M-12` | `teardown()` × 3, probe + census each cycle | `cycles=[{count:0,ok:false,code:"no-root",inTree:1,html:""} ×3]` | **PASS** — all three cycles hold the **same** state |
| **MG-13** | §3.1 `M-13` | fresh Runtime → `loadEnvelope(demoEnvelope())` (**required**: runtime-host §2 `D9`) → `codeLoad()` → probe → `codeLoadBatch([{op:'set',…},{op:'set',…}])` → probe | `codeLoad={ok=true count=1 nodeIds=["node-253"]}` · `codeLoadBatch census={"census":{"registered":12,"inTree":12,…},"ops":[{"status":"applied"},{"status":"applied"}],…}` · `after={ok=true count=1 nodeIds=["node-277"]}` · `batchErr=null` | **PASS** — on the payload shape `mcp-endpoint.md` §4 pins (see §9.3) |
| **MG-14** | §3.1 `M-14` (**the `RED-1` reproducer drive**) | `new Runtime({mount, envelope: demoEnvelope()})` → `loadEnvelope(placementEnvelope(4))` (**no** `bootstrap()`) → probe | `probe={ok=true count=1 roots=1 nodeIds=["node-277"] violation=null}` · `census={"registered":7,"inTree":7,…}` · `mountChildren=1 engineChildren=1` | **PASS** — the sequence the red run measured at `count 2` now reads **1**, and `inTree=7` matches the contract's path-enumeration row |
| **MG-15** | §3.1 `M-15` | bootstrap → `exportSerialized()` → `loadDoc(doc)` → probe | `probe={ok=true count=1 nodeIds=["node-284"]}` · `census={"registered":12,"inTree":12,…}` | **PASS** |
| **MG-16** | §3.1 `M-16` | `loadEnvelope(demoEnvelope())` → `exportLegacy()` → `loadEnvelope(exported)` → `exportSerialized()` → `loadDoc(…)`, probing at each step | `counts=[1,1,1]` | **PASS** — no cycle accumulates a second root |
| **MG-17** | §3.1 `M-17` (**the host-fix regression row**) | `const mount = mountEl(); const rt = new Runtime({mount, envelope: demoEnvelope()}); rt.loadEnvelope(demoEnvelope())` — **constructed, never `bootstrap()`ed** | `probe={ok=true count=1 roots=1 nodeIds=["node-344"] violation=null}` · `rawChildCount=1 rawEngineChildren=1 rawNodeIds=["node-344"]` · `inTree=12` · `mountSameRef=true` | **PASS** — the `RED-1` `{"childCount":2,"count":2,"nodeIds":["node-234","node-246"]}` read is **not reproducible on this tree** (independently re-verified in §5 `DEF-1`) |
| **MG-18** | §3.1 `M-18` (**attribution**) | the same construct-then-load sequence on the **non-placement** envelope, **and** the placement variant | `nonPlacement={ok=true count=1 nodeIds=["node-368"]}` `rawNonPlacementEngineChildren=1` · `placement={ok=true count=1 nodeIds=["node-392"]}` `rawPlacementEngineChildren=1` | **PASS** — neither half is a placement artefact |

### 4.2 §3.2 documented fail-states (`F` family)

| Id | Doc section (row) | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **MG-19** | §3.2 `F-1` | a caller-supplied two-root mount (two `data-node-id` children) | `probe={ok=false count=2 roots=2 nodeIds=["n-a","n-b"] violation=multiple-roots}` · `violation.nodeIds=["n-a","n-b"]` · `assertMessage="mount invariant violated (multiple-roots): the mount holds 2 engine-emitted direct children (n-a, n-b) where exactly 1 root is the invariant: an earlier root was left behind"` | **PASS** — the assert throws with the pinned prefix |
| **MG-20** | §3.2 `F-2` | a fresh empty mount | `probe={ok=false count=0 roots=0 violation=no-root}` | **PASS** |
| **MG-21** | §3.2 `F-3` | one root, `expect.rootNodeId` = a **stale** id | `probe={ok=false count=1 nodeIds=["node-399"] violation=root-identity-mismatch}` · `violation.expectedRootNodeId="node-399-stale"` · `violation.nodeIds=["node-399"]` (the **observed** root) | **PASS** |
| **MG-22** | §3.2 `F-4` | `probeMountInvariant(mountB, {mount: mountA})` | `probe={ok=false count=0 violation=mount-reference-mismatch}` | **PASS** |
| **MG-23** | §3.2 `F-5` | `null` / `undefined` / a string / a number / `[]` / `{children:'x'}` / `{children:null}` | `threw=null`; all seven: `code=mount-not-appendable` | **PASS** — **no throw** on any shape |
| **MG-24** | §3.2 `F-6` | non-object, non-nullish `expect`: string / number / boolean / array / function | `threw=null`; all five: `code=expect-mismatch` | **PASS** |
| **MG-25** | §3.2 `F-7` | three direct children: a shim element with `data-node-id`, an opaque object (no `getAttribute`, no `outerHTML`), and a serialization-only object (`{outerHTML:'<div data-node-id="n-ser"></div>'}`) | `threw=null` · `probe={ok=false count=2 nodeIds=["n-real","n-ser"] violation=multiple-roots foreignSiblings=1}` · `opaqueInForeign=true` · `serializableOnlyInForeign=false` | **PASS** — no throw; the unreadable child lands in `foreignSiblings`, and the serialization-only child **is** read as engine-emitted (the contract's own second read route, §2.4 item 2) |
| **MG-26** | §3.2 `F-8` | two children with the **same** `data-node-id` | `probe={ok=false count=2 nodeIds=["dup","dup"] violation=multiple-roots}` · `violation.nodeIds=["dup","dup"]` | **PASS** — **reported twice, not deduped** |
| **MG-27** | §3.2 `F-9` | one child with `data-node-id=""` | `threw=null` · `probe={ok=false count=0 violation=no-root}` · `blankChildInForeign=true` | **PASS** — a blank value never satisfies the invariant |
| **MG-28** | §3.2 `F-10` | `probeMountInvariant(mount, null)` on M-1's state | `probe={ok=true count=1 violation=null}` · `hasOwnProperty(expectedRootNodeId)=false` | **PASS** — identical to the omitted-argument case, **no** `expect-mismatch` |

### 4.3 §3.3 every-state invariants (`I` family)

| Id | Doc section (row) | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **MG-29** | §3.3 `I-1` (**amended wording**) | the four required states: M-1's one-root mount, M-8's malformed mount, F-1's two-root mount, F-5's malformed-mount object | `[{state:"M-1",count:1,rootsLen:1,listLen:1,where:"roots.map(nodeId)"},{state:"M-8",count:0,rootsLen:0,listLen:0,where:"violation.nodeIds"},{state:"F-1",count:2,rootsLen:2,listLen:2,where:"violation.nodeIds"},{state:"F-5",count:0,…}]`, and `topLevelNodeIds=false` in **all four** | **PASS** — satisfied by the **amended** reading (no top-level `nodeIds` field exists, so none was added) |
| **MG-30** | §3.3 `I-2` | the three outcomes | `[{ok:true,violation:null},{ok:false,violation:"no-root"},{ok:false,violation:"mount-not-appendable"}]` | **PASS** — no "ok with a violation" state |
| **MG-31** | §3.3 `I-3` | capture `mount.children` + each child's `data-node-id`; three probe calls (one failing); re-read | `len before/after=2/2 elementByElementIdentical=true attrs=["node-423",null]->["node-423",null]` | **PASS** — **zero writes** |
| **MG-32** | §3.3 `I-4` + §2.2 prohibition 4 | the same arguments twice | `call1={"ok":true,"count":1,"roots":["node-435"],"violation":null} call2=<identical> deepEqual=true` | **PASS** |
| **MG-33** | §3.3 `I-5` | `mountEl()`, `null`, `'str'`, `42`, `{children:'x'}` | `[{arg:"object",echoes:true},{arg:"null",echoes:true},{arg:"string",echoes:true},{arg:"number",echoes:true},{arg:"object",echoes:true}]` | **PASS** — the **exact argument by reference**, including the malformed cases |
| **MG-34** | §3.3 `I-6` | probe a fresh state after another Runtime had loaded and torn down | `after-other-activity={"ok":true,"count":1} fresh={"ok":true,"count":1}` | **PASS** — no order dependence |

### 4.4 §2.1's surface, exercised (`S` rows of this record)

| Id | Doc section | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **MG-35** | §2.1 (the two exported functions) | `Object.keys(await import(<bundled module>))` | `moduleExportKeys=["assertMountInvariant","probeMountInvariant"]` · `typeofProbe=function typeofAssert=function` | **PASS** — exactly the two documented functions are reachable |
| **MG-36** | §2.1 (the six `MountViolationCode` members) + the `MountViolation` shape | six drives, one per documented code | `[{want:"no-root",got:"no-root"},{want:"multiple-roots",…},{want:"root-identity-mismatch",…},{want:"mount-not-appendable",…},{want:"mount-reference-mismatch",…},{want:"expect-mismatch",…}]` all `matches=true`; `violationShape={"hasCode":true,"hasMessage":true,"hasCount":true,"hasNodeIds":true,"hasExpected":true}` | **PASS** — all six codes reachable and typed; `code`/`message`/`count`/`nodeIds` present |
| **MG-37** | §2.1 (`expectedRootNodeId` present only when supplied) | a `no-root` violation (no expectation) | `violationKeys=["code","message","count","nodeIds"]` · `hasExpectedRootNodeId=false` | **PASS** — the optional field is `undefined`-absent, not present-and-null |
| **MG-38** | §2.1 (the throw pattern) | `assertMountInvariant(mount)` on a two-root mount | `instanceofError=true`; `message="mount invariant violated (multiple-roots): the mount holds 2 engine-emitted direct children (n1, n2) where exactly 1 root is the invariant: an earlier root was left behind"`; `extraOwnProps=[]` | **PASS** — the pinned prefix + a plain `Error` |
| **MG-39** | §2.1 (*"the probe never throws"*, total by contract) | seven malformed arguments (null / undefined / `''` / 42 / `[]` / `{}` / `{children:'x'}`) | `everyCallReturnedNormally=true thrownFlags=[false ×7]` | **PASS** |
| **MG-40** | §2.4 item 2 (how the probe reads the tree) | a **duck-typed** tree: `{children:[{getAttribute,outerHTML}], tagName:'MAIN'}` — no shim involvement | `probe={ok=true count=1 nodeIds=["duck-1"] violation=null}` · `roots[0].elementIsTheSameObject=true` · `mountEchoByRef=true` | **PASS** — the probe needs only `children` + the child's **own** attribute surface; **no query API** |

---

## 5. The claimed host defect, independently verified — raw tree reads, **without** the probe as evidence

**Every row below took its count by reading the shim tree directly** (direct children with a non-empty
`data-node-id`, `docs/specs/mount-invariant-guard.md` §2.4 item 1), **and** cross-checked the mount
through the documented `Runtime.renderedHtmlResult()` (whose `renderedHtml` is the mount's own
serialization). **`src/shared/mount-invariant-guard.ts` is not imported by this script at all** — the
claim under test is the **host** half, and this is the layer at which it can be checked blind.

| Id | Doc section | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **DEF-1** | §3a `RED-1` + §3.1 `M-17` (the reproducer) | `new Runtime({mount, envelope: demoEnvelope()})` → **one** `loadEnvelope(demoEnvelope())`, **no** `bootstrap()` | `preBootstrap={rawIds:[],htmlBytes:0}` → `afterLoad rawEngineChildren=1 nodeIds=["node-13"] rawMountChildren=1 renderedHtmlTopLevelElements=1 census={"registered":12,"inTree":12,"unplaced":0,"destroyed":0,"prototypes":0} mountSameRef=true` | **PASS — the claimed fix is real** |
| **DEF-2** | §3a `RED-2` (attribution) + §3.1 `M-18` | the same sequence on the **non-placement** envelope; and the placement depth-4 variant | `nonPlacement rawEngineChildren=1 ids=["node-37"] topLevel=1 census={"inTree":12,…}` · `placement rawEngineChildren=1 ids=["node-61"] topLevel=1 census={"inTree":7,…} renderedHtmlBytes=4511` | **PASS** — one root on both routes; the placement census matches `inTree === 7` |
| **DEF-3** | §1 item 4 (the four re-derivation paths) + `RED-5` (*"neither is licensed to skip the other four paths"*) | `codeLoad()` after a load; `codeLoadBatch([{op:'set',…}])`; `loadDoc(doc)` on a **never-bootstrapped** Runtime | `code.load rawEngineChildren=1 ids=["node-104"]` · `code.loadBatch rawEngineChildren=1 ids=["node-152"] err=null` · `loadDoc(no-bootstrap) rawEngineChildren=1 ids=["node-164"] census={"inTree":12,…}` | **PASS** |
| **DEF-4** | §3a `RED-5` (*"the previous root's element is no longer a direct child of the mount"*) | capture the first root element, re-derive, test membership **by reference** | `firstRootId=node-188 previousRootStillADirectChild=false afterLoadIds=["node-200"] rawMountChildren=1` | **PASS** — the old element is **detached**, not merely out-numbered |
| **DEF-6** | §3a `RED-4` (reachability) | the boot-order shape | `construction=0 bootstrap=1 load=1` | **PASS** — a constructed Runtime's mount starts empty; `bootstrap()` and load each leave exactly one |
| **DEF-5** | §7 item 1 / no row (recorded observation only) | a **failing** load (`{template:null, content:'garbage', clientConfig:null}`) after a bootstrap | `threw="legacy-envelope-mismatch: expected { template: { root }, content?, clientConfig? }" rawEngineChildren before=1 after=0 afterIds=[] mountHTMLBytes=0` | **PASS (recorded, no doc pin)** — the failed load leaves the mount **empty** (the pre-load torn-down state `runtime-host.md` §3.1 describes); **no cardinality row covers this state, so nothing is claimed from it** |

---

## 6. `teardown()`'s two-layer state — verified, plus the hole this run found

| Id | Doc section | Drive (exact) | Observed value (verbatim) | Verdict |
| --- | --- | --- | --- | --- |
| **TEAR-1** | §3.1 `M-11` (amended) + `runtime-host.md` §3.6 | bootstrap → `teardown()` | `preTeardown rawEngineChildren=1` → `afterTeardown rawEngineChildren=0 rawMountChildren=0 mountHTML="" census={"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}` · `listTargets inTree=1 inTreeNodeIds=["node-212"]` | **PASS** — **both halves**: the mount is empty **and** the graph holds exactly the root |
| **TEAR-2** | §3.1 `M-12` + §3a `A-6` (the adversarial seed) | `teardown()` × 3, then a `loadEnvelope(demoEnvelope())` | `cycles=[{"raw":0,"inTree":1,"html":""} ×3] afterReload rawEngineChildren=1 ids=["node-236"] census={"registered":12,"inTree":12,…}` | **PASS** — idempotent, and the count returns to `1` after a load |
| **TEAR-3** | §3.1 `M-11`/`M-12` + `runtime-host.md` §3.6 (*"Returns the post-teardown census — `inTree === 1` (root only), mount empty"*) | `teardown()` on a Runtime that was **constructed and never `bootstrap()`ed** (nor loaded) | `teardown rawEngineChildren=1 census={"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}` · after a subsequent load `rawEngineChildren=1 ids=["node-260"]` | **FAIL** — see §8.1 · **⟶ `RESOLVED-BY-PINNING` (2026-09-27, the per-unit documentation review): the contract now pins this drive as §3.1 `M-19`; the verdict above is unchanged and is NOT converted** |
| **TEAR-4** | §1 item 1 (**amended invariant**) at that same point | same drive, taking the amended invariant's own two halves | `mountRawEngineChildren=1 ids=["node-308"] graphInTreeIds=["node-308"] countEqualsGraphRoot=true census={"inTree":1,…} mountHTMLBytes=81` | **FAIL (as a one-root-at-every-point invariant)** / the root-identity half **holds** — see §8.2 · **⟶ `RESOLVED-BY-PINNING` (2026-09-27, the per-unit documentation review): the same finding as `TEAR-3`, one row per reading; §1.1's drive-specific re-pinning supplies the statement this row found missing. The verdict is unchanged** |

**The `TEAR-3` re-take, with controls** (`node /tmp/mountguard-blind/run-tear3.mjs`, verbatim):

```
constructed      :: ids=[] children=0 htmlBytes=0
after teardown() :: ids=["node-1"] children=1 htmlBytes=77 census={"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}
   outerHTML of the surviving direct child(ren): ["<div data-node-id=\"node-1\" id=\"preempt-node-node-1\" class=\"demo-shell\"></div>"]
   listTargets inTree=["node-1"]
   mountSameRef=true
after load       :: ids=["node-13"] children=1 census={"registered":12,"inTree":12,"unplaced":0,"destroyed":0,"prototypes":0}

control: bootstrapped :: ids=["node-25"]
control: after teardown :: ids=[] children=0 htmlBytes=0 census={"registered":11,"inTree":1,...}

control: constructed+loaded :: ids=["node-49"]
control: after teardown :: ids=[] children=0 htmlBytes=0 census={"registered":11,"inTree":1,...}
```

---

## 7. NOT-BLIND-RUNNABLE record

**A row is NOT-BLIND-RUNNABLE when settling it requires reading the module's implementation (or breaking
the tree), not because it failed and not because it was hard.** None of the six is counted as a pass.

| Id | Claim | Why it cannot be settled blind |
| --- | --- | --- |
| **NBR-01** | §2.2 prohibition 1's semantic half — the module contains no `region`/`Region`/`pane`/`tab`/`zone`/`ShellRegion*` concept *as a symbol, union member, default or documented constant* | The **token census** is runnable and reads `0` for every one of those tokens (and `0` for `ShellRegionName`/`ShellRegionSpec`/`ShellRegions`), and `0` for the declined half's names. **The clause is semantic**, so a token count cannot settle it: a concept could be spelled otherwise. Settling it needs reading `src/shared/mount-invariant-guard.ts`'s content, which is the implementation. |
| **NBR-02** | §2.2 prohibitions 2 and 4's static halves — *"creates no element, authors no text/class/style, emits nothing"*; *"zero store, zero persistence, zero module-level mutable state, zero file/`localStorage`/IPC"* | The token census over the module reads **`createElement` 0, `document` 2, `window` 0, `localStorage` 0, `node:fs` 0, `electron` 0, `WeakMap` 0** — and the two `document` hits are the word "document" followed by a space (the phrase **"document order"** in prose). `MG-31`/`MG-32` show the **behavioural** end (zero writes; identical repeat results). **The source-level absence a static row wants is not establishable without reading the module.** |
| **NBR-03** | §2.2 prohibition 5 — the five-seam negative (no tool / resource / group / `VALID_GROUPS` member / `RpcMethod` member / `MUTATING_METHODS` entry / IPC method), `ALL_TOOLS` stays 21 | The **census half is observed** on the current tree: `ALL_TOOLS` = **21**, `RpcMethod` = **21**, `npm test` green (`tests/engine-pin-version.test.ts`'s census row is inside the 913 that pass). Checking that **this unit added nothing** means diffing the changed files' content — implementation reading. |
| **NBR-04** | §2.1's *"`assertMountInvariant` calls the probe **exactly once**"* | The contract itself records this as **not observable** (`M-10`'s limitation, `§7` item 14): the assertion exposes **no seam** into its internal call. This run asserted the **recorded closest falsifiable form** (`MG-10`): no throw, projection-deep-equal to a separate probe, and the tree's **own references, not copies**. **No seam was invented, and no surface change is implied.** |
| **NBR-05** | §5.2's **OPTIONAL** `[U]` row — *one mount, one real-DOM root element after a cycle-2 load* | The `ui` leg **exists and is green on this tree** (`npm run ui` → `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, exit `0`, `leftover profiles: NONE`) — so the leg is a precondition fact, not a blocker. **But the leg contains no drive for this row**: its five declared rows assert an isolation pair, a renderer-provenance marker, ONE measurement, the shim's `UNSUPPORTED` word and the honest-limits statement. Exercising the cardinality row would mean **authoring a new leg step**, i.e. implementation work, not a blind scenario. **Verdict: not blind-runnable; the unit's own status stands — the row is `NOT TAKEN` and every §3 row is `[T]`/`[H]` and stands alone.** |
| **NBR-06** | §2.2 prohibition 6 / §3 row layers — *"the module expands no shim member"*, and every §3 row's `[T]`/`[H]` label | Checking that the module requires no shim member beyond `children`/`getAttribute`/`outerHTML` needs the module's content; `MG-40` shows the **behavioural** half (the probe works on a plain duck-typed tree with **no** shim at all), which is the strongest reachable form here. |

---

## 8. FAIL rows — verbatim (observed vs documented)

**These are findings. Neither was converted to a pass.** **⟶ BOTH ARE NOW `RESOLVED-BY-PINNING`
(2026-09-27, the per-unit documentation review — status annotation only): the contract pins this drive
as **§3.1 `M-19`**, §1.1 is re-pinned to the drive, and the two findings are recorded as one in the
spec's disposition table (`§3b ADV-1`/`ADV-8`). **The verdicts, the evidence and the analysis below are
kept verbatim and unamended** — this file is the run's own record.**

### 8.1 `TEAR-3` — `teardown()` on a never-bootstrapped Runtime leaves ONE engine-emitted root in the mount

- **Doc:** `docs/specs/mount-invariant-guard.md` §3.1 `M-11` (amended) *"After `teardown()` the mount's
  engine-emitted direct children are `0` (`count === 0`) and the mount's serialization is EMPTY
  (`mountHTML: ""`)"*; §3.1 `M-12` *"`count === 0` after EACH of the three cycles, with
  `mountHTML === ""`"*; and `docs/specs/runtime-host.md` §3.6 *"Returns the post-teardown census —
  `inTree === 1` (root only), **mount empty**. Idempotent: calling teardown on an already-root-only graph
  is a no-op."*
- **Command:** `node /tmp/mountguard-blind/run-tear3.mjs` (and row `TEAR-3` of
  `node /tmp/mountguard-blind/run-defect.mjs`).
- **Observed:** on `const rt = new Runtime({mount, envelope: demoEnvelope()})` — **constructed, never
  `bootstrap()`ed, never loaded** — `rt.teardown()` returns
  `{"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}` (i.e. the census the doc
  describes as the ROOT-ONLY case) while the mount holds **one** engine-emitted direct child:
  `ids=["node-1"] children=1 htmlBytes=77`, its serialization
  `<div data-node-id="node-1" id="preempt-node-node-1" class="demo-shell"></div>`, and
  `listTargets inTree=["node-1"]`. The two controls on the **same** tree behave exactly as documented:
  **bootstrapped-then-teardown** → `ids=[] children=0 htmlBytes=0`; **constructed+loaded-then-teardown** →
  `ids=[] children=0 htmlBytes=0`.
- **Documented:** `count === 0` and an empty mount after `teardown()`, on the same reachable public path
  (`teardown()` is public and callable on a constructed Runtime — the same reachability argument §3a
  `RED-4` makes for `loadEnvelope`).
- **Verdict: FAIL — a documented-behaviour contradiction, at a state the unit's row set does not cover.**
  Stated precisely so it is not over-read: (a) the unit's own `M-11`/`M-12` **precondition** is a
  **landed graph**, so this drive is outside those rows' literal trigger; (b) the row the unit *did*
  measure is reproduced exactly (`TEAR-1`/`TEAR-2`); (c) the mount does hold exactly one root **and that
  root is the graph's current root**, so the amended invariant of §1 item 1 **survives** here — what
  fails is the **teardown-path claim that the mount is empty**, which is both `M-11`/`M-12`'s whole point
  and `runtime-host.md` §3.6's sentence. **The unit has no row for `teardown()` on a
  never-bootstrapped Runtime** (neither `M-11`/`M-12` nor §3a's seeds `A-6`/`A-8` name that state), so
  this is a **coverage hole + a contradiction**, not a covered-and-passing behaviour.
- **Not a conversion:** nothing here weakens `TEAR-1`/`TEAR-2`, and the host fix this unit claims
  (§3a `RED-5`) is **not** implicated — `RED-5` explicitly says the fix *"may not change `teardown()`'s
  measured two-layer state"*, and it did not.

### 8.2 `TEAR-4` — at that same point, the amended invariant read as *"`count === 1` at every observation point where the graph has been rendered"* is unsatisfied (the root-identity half holds)

- **Doc:** `docs/specs/mount-invariant-guard.md` §1 item 1 (**amended, governing**) — *"For one stable
  mount and one re-derivation path, at every point where the graph has been re-derived, the mount holds
  exactly one engine-emitted root element, and that element is the graph's current root node … the
  four re-derivation paths … have produced a rendered graph"*; and §3.1 `M-11`'s graph half (`inTree === 1`).
- **Command:** row `TEAR-4` of `node /tmp/mountguard-blind/run-defect.mjs`.
- **Observed:** `mountRawEngineChildren=1 ids=["node-308"] graphInTreeIds=["node-308"]
  countEqualsGraphRoot=true census={"registered":11,"inTree":1,"unplaced":10,"destroyed":0,"prototypes":0}
  mountHTMLBytes=81`.
- **Documented:** as a **quantified claim over every rendered point** the invariant reads `count === 1`
  there; the row is recorded as the **second, narrower form of the same hole** as §8.1 — and, read
  strictly, the **amended invariant is internally under-specified in exactly this direction**: the
  amendment's exclusions list the **pre-bootstrap** point (`F-2`'s `0`) and the **teardown-after-a-landed-
  graph** point (`M-11`/`M-12`'s `0`), but **not** the *never-bootstrapped teardown* point, where the
  measured value is `1`.
- **Verdict: FAIL as a one-root-at-every-point statement / the root-identity half HOLDS.** Reported as a
  FAIL because the record may not launder a state the contract's own quantifier does not cover into a
  pass: the honest statement is *"the amended invariant holds on the four re-derivation paths and on the
  two points it excludes; it is **unspecified** at the never-bootstrapped teardown point, where this run
  measures `1`."* **Same root cause as §8.1, one row per reading — not two independent defects.**

---

## 9. What the unit's DONE row may and may not rest on

**May rest on (independently reproduced in this blind run, on this tree — `git HEAD c5354cc`, clean):**

- **the probe's behaviour over the whole `§3` row set** — the valid states `M-1`…`M-18` (`MG-01`…`MG-18`),
  the fail-states `F-1`…`F-10` (`MG-19`…`MG-28`) and the every-state invariants `I-1`…`I-6`
  (`MG-29`…`MG-34`), **driven from documentation alone through the two documented exports**;
- **the `§2.1` surface as reachable and typed**: exactly the two documented functions exported
  (`MG-35`), all six violation codes reachable with the documented shapes (`MG-36`, `MG-37`), the pinned
  throw prefix on a plain `Error` (`MG-38`), and total non-throwing behaviour on seven malformed
  arguments (`MG-39`);
- **THE HOST-FIX CLAIM, independently verified at the raw-tree/`renderedHtmlResult` layer with the probe
  module NOT imported at all** — `DEF-1` (constructed-then-one-load → **1** engine-emitted root, not 2),
  `DEF-2` (the same on the non-placement envelope **and** the placement depth-4 variant), `DEF-3`
  (`code.load` / `code.loadBatch` / `loadDoc`), `DEF-4` (the previous root element **detached by
  reference**), `DEF-6` (the boot-order shape). **The `RED-1` two-root read does not reproduce.**
- **the teardown two-layer state on a landed graph** — `TEAR-1` (`count 0`, `mountHTML ""`,
  `inTree === 1`) and its idempotence + post-load recovery (`TEAR-2`); the graph half is `listTargets`
  in-tree `= 1`, the mount half is a raw read;
- **the `M-3` five-point sequence**: `0 / 1 / 1 / 1 / 1` — the contract's own amended measurement
  reproduced exactly (`MG-03`);
- **the leg baselines as quoted, on one tree:** `npm test` `59 files / 913 passed / 2 skipped / 0 failed`
  · `npm run typecheck` clean · `npm run build` 5 bundles · `npm run battery` `184 checks, 0 failures` ·
  `npm run divergence` `R13 RESULT: 9 checks, 0 failures` · the unit's own row file **41 passed (41)**
  (count only, not read) · `ALL_TOOLS` **21** / `RpcMethod` **21**.

**May NOT rest on:**

- **any statement that `teardown()` always leaves the mount empty** — contradicted at the
  never-bootstrapped point (§8.1 `TEAR-3`), which the unit's rows do not cover. The landed-graph half
  is verified and may be cited; the unconditional form may not.
- **the amended invariant read as *"one root at EVERY point"*** — unspecified at that same point and
  measured `1` there (§8.2 `TEAR-4`).
- ***"`assertMountInvariant` calls the probe exactly once"*** — NOT observable at this layer, recorded by
  the contract itself (`NBR-04`); only the closest falsifiable form is verified (`MG-10`).
- **the `§2.2` prohibitions as static source rows** — `NBR-01`…`NBR-03`, `NBR-06`: the behavioural ends are
  verified; the source-level absences are not, and the token census (0 forbidden tokens; `document` ×2 =
  the phrase "document order") is a census, not a semantic read.
- **the optional `[U]` real-DOM cardinality row** — `NBR-05`: the leg is green but carries **no drive**
  for it. **No real-DOM cardinality claim may be made from this record**, and the leg's green is
  **not** evidence for this unit's row.
- **any assembled-app, IPC-layer or MCP-transport claim.** The node suite is **envelope/pure-layer
  evidence, never assembled-app evidence**; the battery green is the shim host over MCP and still not the
  app's renderer; the divergence green is **structural-surfaces-only** and asserts no attribute row and
  nothing about the app's `provident.op` hop.

**Contract points this run found internally inconsistent or under-specified (reported, not silently
reconciled):**

1. **`§3.1` `M-11`/`M-12` vs `§1` item 1's amendment — the teardown domain is left open.**
   `M-11`'s trigger is *"`teardown()` on the landed graph"* and its amended expectation is *"`count === 0`,
   `mountHTML: ""`"*; `runtime-host.md` §3.6 states the unconditional *"mount empty"*. `§1` item 1's
   amendment excludes the **pre-bootstrap** point and the **teardown-after-a-landed-graph** point but does
   not name the **never-bootstrapped teardown** point, where this run measures `1`. **The three statements
   cannot all be satisfied by one implementation and the contract does not say which governs.** (§8.1/§8.2.)
2. **`§3.1` `M-13` names `codeLoad(envelope)` and `codeLoadBatch([…])` but not their payload shapes, and
   states `codeLoadBatch` *"reaches `codeLoad` at `:1064`"* as a direct hop.** `codeLoad(envelope)` is
   driven in practice as `codeLoad()` (the CRUD envelope comes from a prior load — `runtime-host.md` §2
   `D9`), and the batch payload shape is pinned only in `mcp-endpoint.md` §4
   (`[{op:'set'|'create'|'delete', path, value?|entry?|index?}]`). **A blind reader cannot drive `M-13`
   from `MOUNTGUARD` alone** — this run's first attempt failed with
   `code.loadBatch: unknown op 'undefined'` until the other spec's shape was used. `M-13` should name the
   payload shapes and the `loadEnvelope` → `codeLoad` → `codeLoadBatch` order.
3. **`M-4`'s identity expectation is circular as written.** The row says `rootNodeId` *"is read from the
   graph (e.g. the in-tree node whose `propsId`/`cssId` matches the envelope's root)"*, but the **auto-minted
   root carries no authored `cssId`/`propsId`** (`runtime-host-greens.md` §R6 row 27), and no documented
   accessor returns *"the graph's current root nodeId"* (`listTargets()` returns all in-tree nodes — this
   run read 12). The row is therefore only satisfiable by taking the probe's own observed value as the
   expectation (`MG-04`), which asserts only *"`ok` when the expectation equals the observation"*. The
   row's real content is carried by `F-3` (`MG-21`), which **is** falsifiable. **Recorded as a
   doc-shape finding; no row was re-scoped here.**
4. **`F-1`'s two-root state has no documented construction recipe.** §3.2 describes the trigger as *"any
   re-derivation sequence whose mount holds ≥ 2 `data-node-id` direct children"* — i.e. the **defect**
   state — and no recipe for building the state by hand. This run built it with two caller-created shim
   elements appended to the mount (`MG-19`) and read the result; **a later blind run must know that this
   is the intended construction**, since the defect state itself is (correctly) no longer reachable.

---

## 10. Recorded observations that are **not** findings

| # | Observation | Why it is not a finding |
| --- | --- | --- |
| **O-1** | The `document` token appears **2** times in `src/shared/mount-invariant-guard.ts` in the §2.2 prohibition census (§2), while §2.2 prohibition 2's static row asks for *"zero `createElement`/`document`/`body`/`textContent` writes"*. | Both occurrences are the word **"document" followed by a space** — the phrase *"in document order"* from §2.1's own contract prose (the `nodeIds`/`roots` descriptions). **A prose token is not a write and not a global lookup** (`window`/`querySelector*`/`getElementById`/`closest`/`getComputedStyle` are all `0`, and `MG-40` shows the probe running with **no** `document` in scope at all). Recorded so a later token census does not read `2` as a violation — **and the row is NBR-06/NBR-02 territory either way, not a pass.** |
| **O-2** | `run-defect.mjs`'s `topLevelElements()` reads `balance=false` on the serialization (my depth counter treats the mount's own root `<div …></div>` pairing as unbalanced because the demo's `<input>`/`<h1>` are emitted as open tags without closers in `renderedHtml`). | **Only the `top` count is used** (and it reads `1` where it matters, in `DEF-1`/`DEF-2`). The tree count every row really rests on is the **raw direct-child read** (`rawIds(mount)`). The balance flag is my helper's artefact and is not read as a serialization defect. |
| **O-3** | The `ui` leg is **green and now cleans its scratch profiles** (`leftover profiles: NONE`, both attempt profiles removed, exit `0`) — the opposite of the wave-C-era `R0-04` FAIL recorded in `docs/specs/ci-ui-leg-greens.md` §5. | This run asserts **nothing** about that unit's disposition beyond the observed line; it is recorded because `R0-04` is still filed as OPEN in that record, and a later reader should not read this pass's green as its closure. **No claim is moved.** |
| **O-4** | `npm test` collects **59** files while `tests/` holds three `.test.mjs` batteries driven by their own scripts (`npm run battery`, `npm run mcp`) — the same split `docs/specs/engine-drift-greens.md` `O-2` records. | `59 passed (59)` is exactly what this unit's filing quotes; **no drift**. |
| **O-5** | The `M-13` second drive and the `assert`-throw row each needed a **correction to my own drive/checker** (§3's two self-corrections). | Both are recorded with their first observed values; **neither is scored as a FAIL and neither is a pass on the first attempt.** No spec row was edited, and no repo file other than this one was touched. |
