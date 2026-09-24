# Live status — `U-ENGINE-PIN` (the assembled-app / divergence leg)

**Unit:** `U-ENGINE-PIN` (`provident-ssr` `^0.2.1` → `^0.5.1` retarget + the scoped
`ShimElement.removeAttribute` completion + the host-side shape guard).
**Scenarios under test:** `docs/specs/engine-pin-greens.md` (third blind run: 104 rows — 96
PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE).
**Leg under test:** `engine-pin.md` §5.3 **leg 6** — `npm run divergence` on the Electron-44
stack; measured against the contract in `docs/specs/ci-divergence-leg.md`.

## 0. GATE VERDICT — **FINAL (2026-09-27): the gate is PASSED**

> ## ✅ **GREEN — the declared live leg is PASSED, and `U-ENGINE-PIN` is `DONE`.**
>
> - **The harness spawn fix LANDED** (the supervisor's DONE pass), so the obstruction this record
>   was written around is gone: `scripts/electron-divergence.mjs` now spawns Electron with
>   **`--disable-dev-shm-usage`** **and** a fresh scratch **`--user-data-dir`** per spawn
>   (`mkdtempSync` under the system temp dir, cleaned on exit). **Both flags are REQUIRED**; each
>   alone still dies `SIGTRAP` (§1.3). This is the **same fix shape this record's §7 recommended**
>   — it was **recorded as owed to `U-DIVERGENCE-EXT` when this pass could not edit `scripts/**`**;
>   the supervisor landed it, so it is a **supervisor-landed harness fix** and
>   **`U-DIVERGENCE-EXT` INHERITS it** (that unit still owns the `H-r10` channel + extractor +
>   the `props` falsy-toggle scenario). It also discharges `docs/specs/ci-divergence-leg.md` §1's
>   isolation/hermeticity clause.
> - **The repo's own leg — run by the supervisor on the POST-CHANGE tree, verbatim:**
>   **`R13 RESULT: 9 checks, 0 failures`** (`npm run divergence`, Electron **44.4.5**, node
>   **24.21.0**; census 12/12 on both legs, dirtied ids normalized-match, SSR fragment match,
>   `data-node-id` set match, nodeId vocabulary, counter render, R7 dispatch non-empty). **N = 9
>   is a PIN and did not drift** (`ci-divergence-leg.md` §5).
> - **The pre-change caveat is DISCHARGED (§2).** The `9/0` run recorded there is no longer the
>   only good evidence: it is **superseded** by a run **on the final, post-change tree**, which is
>   what a live row requires. `SCRATCH RESULT: 9 checks, 0 failures` (§1.4) is likewise
>   **superseded** — it was evidence, never the gate.
> - **`LIVE-OP-REJECT` was adjudicated (§5) and is now CLOSED — FIXED + LIVE-VERIFIED
>   (2026-09-27):** it was a **HOST-owned, PRE-EXISTING** defect in **this repo's renderer IPC
>   unwrap** (the **pre-fix** `src/renderer/renderer.ts:38`; the landed unwrap is **`:43`**),
>   **not** a `provident-ssr` defect and **not** a `U-ENGINE-PIN` regression — it **never blocked
>   the unit**, whose declared legs do not exercise `provident.op` over the IPC hop. The leg green
>   here is **silent** on it, and the fix flipped the live status from `{status:'rejected'}` to
>   **`{"status":"applied","dirtied":["node-1"], …}` for both wrapped shapes** (§5's fix-pass
>   paragraph).
> - **Nothing else closes the gate.** It closed on exactly two things: the **spawn fix landing**
>   and the **leg being re-run on the post-change tree**. The unit's DONE record is
>   `docs/next-steps.md`'s `U-ENGINE-PIN` DONE record; the decisions are
>   `docs/decisions.md` `DIVERGENCE-SPAWN-FIX` + `DIVERGENCE-LEG-GREEN-POST-CHANGE` +
>   `LIVE-OP-REJECT-IS-A-HOST-DEFECT`.

## 1. What was ATTEMPTED (exact commands, verbatim results)

### 1.1 The repo's live driver — `npm run divergence` (unmodified)

```
cd "/media/ryanr/Shared Files/Projects/Provident-Electron"
npm run divergence            # = npm run build && node scripts/electron-divergence.mjs
```

**Result: `EXIT=1`.** Verbatim tail (full log: `/tmp/divergence-attempt-1.log`, this pass;

```
R13 — REAL-ELECTRON vs DOM-SHIM DIVERGENCE CHECK
================================================

--- real Electron (real DOM) ---
[electron] [3649973:0923/212757.303402:ERROR:components/viz/host/persistent_cache_sandboxed_file_factory.cc:153] Failed to open persistent cache files in directory "/home/ryanr/.config/Electron/GPUPersistentCache/GPUCache/ZBVFTVEKBSX72Y7WF25TMOWFX3JUICO4", error: 1: Permission denied (13)
[electron] [3649973:0923/212757.304304:ERROR:base/memory/platform_shared_memory_region_posix.cc:214] Creating shared memory in /dev/shm/.org.chromium.Chromium.i3g7Di failed: Permission denied (13)
[3649974:0923/212757.309905:ERROR:base/memory/platform_shared_memory_region_posix.cc:214] Creating shared memory in /dev/shm/.org.chromium.Chromium.uQdBKS failed: Permission denied (13)
[electron] /media/ryanr/Shared Files/Projects/Provident-Electron/node_modules/electron/dist/electron exited with signal SIGTRAP
/media/ryanr/Shared Files/Projects/Provident-Electron/node_modules/electron/dist/electron exited with signal SIGTRAP
  ✗ electron connect/drive failed: MCP error -32000: Connection closed

--- DOM-shim battery host (same demo) ---
[provident-mcp] stdio transport ready

--- divergence comparison ---
  ✗ electron leg produced a result (electron failed to bootstrap)

R13 RESULT: 1 checks, 2 failures
--- electron stderr (tail) ---
[3649973:0923/212757.303310:ERROR:base/memory/platform_shared_memory_region_posix.cc:214] Creating shared memory in /dev/shm/.org.chromium.Chromium.cIGEK8 failed: Permission denied (13)
[3649973:0923/212757.303402:ERROR:components/viz/host/persistent_cache_sandboxed_file_factory.cc:153] Failed to open persistent cache files in directory "/home/ryanr/.config/Electron/GPUPersistentCache/GPUCache/ZBVFTVEKBSX72Y7WF25TMOWFX3JUICO4", error: 1: Permission denied (13)
[3649973:0923/212757.304304:ERROR:base/memory/platform_shared_memory_region_posix.cc:214] Creating shared memory in /dev/shm/.org.chromium.Chromium.i3g7Di failed: Permission denied (13)
/media/ryanr/Shared Files/Projects/Provident-Electron/node_modules/electron/dist/electron exited with signal SIGTRAP
```

**Reproduced exactly:** `R13 RESULT: 1 checks, 2 failures`, exit 1 — identical to the
signature the architect measured.

### 1.2 The failure signature, isolated (scratch probes outside the repo)

The repo's driver was **not** modified. To attribute the signature, the app was spawned with
the driver's exact argument vector (from `scripts/electron-divergence.mjs:104`/`:113-118`) and
full stdout/stderr were captured (`/tmp/engine-pin-live/probe-electron.mjs`):

```
STDERR "[…:ERROR:base/memory/platform_shared_memory_region_posix.cc:214] Creating shared memory in /dev/shm/.org.chromium.Chromium.htO6Kl failed: Permission denied (13)"
STDERR "[…:ERROR:components/viz/host/persistent_cache_sandboxed_file_factory.cc:153] Failed to open persistent cache files in directory \"/home/ryanr/.config/Electron/GPUPersistentCache/GPUCache/…\", error: 1: Permission denied (13)"
STDERR "/…/node_modules/electron/dist/electron exited with signal SIGTRAP"
EXIT code=1 signal=null
```

**`[provident-main] …` is never printed** — i.e. under the driver's flag set the main script
does not get to its first line, and **`renderer ready — MCP backend armed` is never reached**.
(The current `docs/next-steps.md` `CURRENT WORK` block — item 2, the wave-A snapshot's own text,
kept for provenance under a supersession banner — says the child dies "**after** `renderer ready — MCP
backend armed`"; the raw evidence this pass places the death **before** it, at early browser
initialisation. That wording drift is flagged here for the supervisor's reconciliation — it
does not change the verdict or the fix.)

### 1.3 The obstructions, measured (not inferred)

| Probe (scratch, `/tmp/engine-pin-live/`) | Result |
| --- | --- |
| `ls -ld /dev/shm` / `touch /dev/shm/…` | `drwxrwxrwt root root` **but a create is `Permission denied`** — the session sandbox intercepts `/dev/shm` writes |
| `touch ~/…` | `[sandbox: file access denied under workspace-write mode]` — `$HOME` is **read-only** in this session, so Chromium's GPU cache dir `/home/ryanr/.config/Electron/GPUPersistentCache/…` cannot be created |
| repo app, driver's flags, 8 s liveness probe | no `[provident-main]` line; SIGTRAP |
| **minimal** `electron` app (3-line `main.cjs` in `/tmp`), `--no-sandbox` | main script reached ⇒ SIGTRAP **after** Node start, before `app.whenReady()` |
| **minimal** app, `--no-sandbox` **+ `--disable-dev-shm-usage`** | still dies |
| **minimal** app, `--no-sandbox` **+ `--user-data-dir=/tmp/…`** | still dies |
| **minimal** app, `--no-sandbox` **+ `--disable-dev-shm-usage` + `--user-data-dir=/tmp/…`** | **`EXIT=0`**, `app ready`, clean exit |
| repo app, same two flags (scratch companion, 10 s) | survives; prints `stdio transport ready` + `renderer ready — MCP backend armed` |
| repo app + SDK client, same two flags, **single instance** | connects, 7 tools, census 12/12, dispatch dirtied `["node-5","node-3","node-1"]` |
| repo app + SDK client, same two flags, **dual instance** (driver's topology) | connects (first instance's death is survivable) |

⇒ **Both flags are necessary; the pair is sufficient.** The obstruction is *not* a
`DISPLAY`/X11 problem (`DISPLAY=:0`, `/tmp/.X11-unix/X0` present and usable) and *not* the
app's own code: the **same SIGTRAP happens to a 3-line minimal Electron app** under the same
sandbox denials.

> **LATER STATE (2026-09-27, the DONE pass) — this measurement is what the landed fix
> implements.** The probe table above is the **basis** of `scripts/electron-divergence.mjs`'s
> landed spawn (`--disable-dev-shm-usage` at `:111`, the per-spawn `mkdtempSync` profile at
> `:112`/`:113` passed as `--user-data-dir=` at both spawn sites `:126`/`:137`, cleaned at
> `:13`), so **both rows marked "still dies" are now the harness's own prevented failure modes**:
> the fix is not a workaround, it is exactly the pair this pass isolated. The three
> "still dies" rows remain the record of why **each flag ALONE is insufficient** — the reason
> the two flags are **one decision**, not two (`docs/decisions.md` `DIVERGENCE-SPAWN-FIX`).

### 1.4 What the fix is worth — the pre-change result REPRODUCED (scratch, NOT the gate)

`/tmp/engine-pin-live/scratch-divergence-single.mjs` replicates the driver's comparison
(same demo envelope, same 8 structural checks, same normalization) with **only the spawn flags
changed**:

```
SCRATCH-DIVERGENCE (repo harness UNMODIFIED; spawn flags extended)
--- real Electron (real DOM) ---
[provident-main] node 24.21.0 electron 44.4.5 crypto=object
[scratch] electron MCP connected        → census {"registered":12,"inTree":12,…}
--- DOM-shim battery host (same demo) --- → census {"registered":12,"inTree":12,…}
--- divergence comparison ---
  OK census inTree matches (shim = real) (electron=12 shim=12)
  OK census registered matches (electron=12 shim=12)
  OK dirtied ids match (normalized)
  OK SSR fragment matches (structural)
  OK data-node-id set matches (structural)
  OK nodeId vocabulary matches (structural)
  OK counter increment rendered in BOTH
  OK dispatch results non-empty in BOTH (R7)
SCRATCH RESULT: 9 checks, 0 failures        EXIT=0
```

**This is NOT the gate.** It is a scratch replication that keeps the repo's harness
**unmodified**; it establishes (a) the live surface is reachable here, (b) the two flags are
necessary and sufficient, (c) the pinned N=9 identity **holds on the post-change tree** for the
surfaces the harness compares, and (d) the candidate fix `U-DIVERGENCE-EXT` is owed is the
right one. The unit's leg closes only when **`npm run divergence` itself** goes green (§7).

> **LATER STATE (2026-09-27, the DONE pass) — SUPERSEDED, and the gate is now closed by the real
> leg.** The fix this section called a "candidate fix `U-DIVERGENCE-EXT` is owed" **landed in the
> harness** (supervisor's DONE pass), and **`npm run divergence` itself** then printed
> **`R13 RESULT: 9 checks, 0 failures`** on the **post-change** tree (§0/§7). So this replication
> is **no longer the strongest evidence in this file** — it is the record that the fix shape was
> correct *before* it landed. **One claim in the paragraph above is now spent:** the fix is
> **not** owed to `U-DIVERGENCE-EXT` any more; that unit **inherits** it.
> `SCRATCH RESULT: 9 checks, 0 failures` must **not** be cited as the unit's gate evidence.

## 2. Pre-change good-run evidence (recorded — and it does NOT close the gate)

| # | Item | Value |
| --- | --- | --- |
| 1 | Command | `npm run divergence` (unsandboxed shell, architect-run) |
| 2 | Result | **`R13 RESULT: 9 checks, 0 failures`**, exit 0 |
| 3 | Stack | **Electron `44.4.5`**, **node `24.21.0`** (Electron's bundled node; the host shell is `v24.20.0`) |
| 4 | Observed surfaces | census 12/12 `registered`+`inTree`, normalized `dirtied` ids, SSR fragment, `data-node-id` set, nodeId vocabulary, counter render, R7 dispatch non-empty |
| 5 | Source | `docs/next-steps.md` `## HANDOVER UPDATE 2` ("**Live-leg evidence is GREEN.**", its opening paragraph) — cited by section, never by line; the same figures now also sit in that file's `## DONE — U-ENGINE-PIN` record |

> **This evidence is PRE-CHANGE and therefore does NOT close the gate.** Both
> `src/renderer/**` (`runtime.ts` — the new `mutationPropsValid` guard + `supervisor.apply`
> path; `secure-panels.ts` — the pane predicate/`applyPaneMutation` seam) **and**
> `src/shared/dom-shim.ts` (the `removeAttribute` completion) **moved after that run**
> (`git diff --stat HEAD` → `runtime.ts +42`, `secure-panels.ts +84`, `dom-shim.ts +31`).
> The pinned structural surfaces it compared are *probably* unaffected (this pass's scratch
> replication of the same checks is green on the post-change tree), but "probably unaffected"
> is exactly what the leg exists to measure. **A live row may not be retired on pre-change
> evidence.**

> **⟶ DISCHARGED (2026-09-27, the DONE pass).** The caveat above is **spent**: the harness fix
> landed and **the repo's own leg was re-run on the post-change tree** —
> **`R13 RESULT: 9 checks, 0 failures`** (§0/§7). The table above therefore stands as the
> **pre-change** record only; the **post-change** run is the one that retired the live row, and
> the two are **not** interchangeable (that is precisely what this section exists to say).
> **The surfaces moved as listed, and the leg was green WITH them.**

## 3. Per-scenario-class disposition

| Scenario class (greens ids) | Layer the greens ran it on | Live disposition |
| --- | --- | --- |
| **Boot / assembled-app / MCP-arm** (`LIVE-BOOT` analogue of `DIV-1`'s precondition) | not run by the greens (no window booted) | **EXERCISED live** — app boots, MCP armed, 7 tools, demo census 12/12. **⟶ UPDATE (2026-09-27, DONE pass): the repo's own leg no longer reports `1 checks, 2 failures`** — with the landed spawn fix it reports **`R13 RESULT: 9 checks, 0 failures`** on the post-change tree, so **this class is PASS and the leg is CLOSED** (§0/§7) |
| **`CEN-1`, `P-IM-4b`** (census/determinism) | `Runtime` under node (bundle) | **EXERCISED live** — `census.registered=12 inTree=12` on the assembled app; PASS |
| **dispatch rows** (`DIV-1`'s R7 check, `E-11`-adjacent) | `Runtime` under node | **EXERCISED live** — `provident.dispatch` applies, `dirtied=["node-5","node-3","node-1"]`, counter `0→1`; PASS |
| **`PA-1..PA-11`, `P-SM-1/2`, the nullish-removal pass-through** | `Runtime.op`/`applyCommand` under node (bundle) | **PARTLY EXERCISED live; one route CONTRADICTED — NOW ADJUDICATED (§5).** The **handler-originated** route (`ctx.clientAPI.apply`) applies a nullish `props.*` removal in the real DOM (PASS, `LIVE-HANDLER-WRITE`/`LIVE-APPLY-ROUTE`); the **`provident.op` command route returns `{status:'rejected'}` for every command shape**. **Root cause (read from the code, not inferred): the renderer's IPC hop does not unwrap the tool payload** — `src/main/battery-host.ts:50` calls `this.runtime.op(p.command)` while `src/renderer/renderer.ts:38` calls `runtime.op(req.payload)`, i.e. `{command:<cmd>}`, so `applyCommand`'s `cmd.kind` is `undefined` and the engine refuses a malformed op. **The predicate is NOT involved** (kind-scoped, so it never runs for `kind: undefined`) and **`renderer.ts` is untouched by this unit** (`git log -1` = `715a923`). **Disposition: was OPEN as a HOST-owned PRE-EXISTING defect (`docs/defects.md` `LIVE-OP-REJECT`) — it did not block this unit, and this leg does not exercise it. ⟶ UPDATE 2026-09-27 (the fix pass): this per-class row is now PASS.** With the landed renderer unwrap (`src/renderer/renderer.ts:43`, incl. the `?? req.payload` fallback for an already-bare command) the **re-run of the same probe returns `{"status":"applied","dirtied":["node-1"], …}` for both wrapped shapes** (was `{status:'rejected'}` for every shape), and the route is pinned in-node by the new `tests/op-command-unwrap.test.ts` (`S1` the RED row that pinned the defect / `S2` the fallback / `S3` `load` stays raw / `F1`+`F2` fail-safe / `S1b` one app-graph-changed push). **The defect row has moved to `docs/defects.md`'s `## FIXED (in this repo)` section; the envelope layer was never broken — the defect lived on the IPC hop.** |
| **`M1..M9` malformed-shape refusals** | `Runtime`/seam under node | **EXERCISED live** — `rejected` with a status, never a throw (`LIVE-M1/M2/M4`); PASS |
| **`PF-1..PF-8`, `PANE-PARITY`, `PANE-SEAM`, `M9` pane half** | `SecurePanels` seam under node | **NOT EXERCISABLE live** — `applyPaneMutation` is renderer-side only: **no IPC method, no MCP tool, no group** (`src/main/mcp-server.ts` never routes to it; `docs/specs/secure-panels.md` §2a says so). Structurally unreachable through the stdio MCP surface; a renderer-side DOM/CDP driver would be required (none in this repo: `scripts/` = `electron-divergence.mjs`, `mcp-cli.mjs`) |
| **`S-01..S-18`, `B-01..B-13` (shim / engine-adapter purity)** | `ShimElement` + `DomAdapter` under node | **NOT live** — pure/envelope-layer by construction; no live assertion is possible or claimed |
| **`P-IM-1/2`, `P-TP-2` (register tables), `PR-2..PR-4`, `G-06`, `G-06b`, `SC-2`, `SC-3`, `H-01`** | repo JSON / built bundle / not blind-runnable | **`PR-2/3/4`, `G-06/G-06b`**: host/bundle-layer, re-readable live only as a file+bundle census (unchanged); **`SC-2`** (real-DOM attribute rows) remains **structurally not this unit's to assert**; **`P-TP-1`/`H-01`** unchanged |

### 3.1 Compensating evidence — and why it is a DIFFERENT layer

| Compensating leg (this pass or the greens pass) | Result | Layer |
| --- | --- | --- |
| `npm test` | 789 passed / 2 skipped / 0 failed (the **greens pass's** count — *the pre-fix count; **⟶ 56 files / 795 passed / 2 skipped / 0 failed** after the 2026-09-27 `LIVE-OP-REJECT` fix pass added `tests/op-command-unwrap.test.ts`*) | **envelope/pure** — vitest, no window, no IPC, no MCP transport, no real DOM |
| `npm run typecheck` / `npm run build` | clean / 5 bundles (greens pass) | **envelope/pure** |
| `npm run battery` | `184 checks, 0 failures` | **shim host under node** — a *different* MCP host, not the assembled app |
| this pass's **live scratch probes** (§1.4, §4) | 9/0 comparison + live rows | **assembled app** — but produced by a **scratch replication**, not by the repo's own leg. **SUPERSEDED 2026-09-27 (DONE pass):** the scratch replication is **no longer the strongest evidence** in this file; the **repo's own leg** is green (§0/§7) |
| **`npm run divergence` — the repo's own leg, POST-CHANGE, with the landed spawn fix (2026-09-27, DONE pass)** | **`R13 RESULT: 9 checks, 0 failures`**, Electron 44.4.5, node 24.21.0 | **assembled app (real DOM) + the shim host, compared structurally** — **this is the leg the unit declares, and the one that retired it.** It does **not** cover the IPC hop (`LIVE-OP-REJECT` — since fixed separately by the renderer unwrap, §5) and asserts **no** attribute row (`H-r10` still owed) |

> **A node-suite / battery green is envelope/pure-layer evidence and never retires a live
> row.** The `battery` leg is emphatically *not* app evidence: the shim host runs the repo's
> own `ShimElement` under node, which (per `engine-pin.md` §2.2 item 6) observes
> set/overwrite/delete only and is **not** a browser.

## 4. Live rows actually EXERCISED this pass (assembled app, real DOM, MCP over stdio)

Scratch driver `/tmp/engine-pin-live/live-rows.mjs`; the app's **own** security store was
seeded in the temp profile with the `graph` group enabled — the same file the manual Settings
pane writes through IPC (`src/main/security-store.ts`), i.e. an operator-equivalent action,
outside the repo, temporary.

| Row | Observation | Verdict |
| --- | --- | --- |
| `LIVE-BOOT` | `census={"registered":12,"inTree":12,…}`, rendered HTML 1099 bytes | **PASS** |
| `LIVE-CEN-1` | census 12/12 on the live demo graph | **PASS** |
| `LIVE-DISPATCH` | `dirtied=["node-5","node-3","node-1"]`, counter `0 → 1` | **PASS** |
| `LIVE-APPLY-ROUTE` (nullish `props.hidden` removal, via a graph handler) | `hidden=""` present → **`hidden` absent**, `dirtied=["node-76","node-75"]` | **PASS** |
| `LIVE-APPLY-ROUTE-2` (defined `props.title`) | `title="x"` → `title="from-handler"` | **PASS** |
| `LIVE-APPLY-ROUTE-3` (nullish `props.value` on an `<input>`) | applies, no throw, no `value="7"` | **PASS** |
| `LIVE-M1/M2/M4` (non-array container / `null` element / unknown node) | `{status:'rejected'}`, no throw | **PASS** |
| `LIVE-TEARDOWN`, `LIVE-TOOL-LIST` | teardown ⇒ `{inTree:1}`, `renderedHtml:''` (identical to the shim host's response); 7 tools by default, 13 with `graph` enabled | **PASS** |
| `LIVE-PA-1 / LIVE-P1 / LIVE-PF-2 analogue` (the same writes through **`provident.op`**) | **BEFORE the fix:** `{status:'rejected'}` for **every** shape — see §5. **AFTER the fix (2026-09-27, re-run of `op-variants2.mjs`):** `{"status":"applied","dirtied":["node-1"], …}` for **both** wrapped shapes (see §5's fix-pass paragraph) | **FAIL → PASS (the fix pass).** The FAIL was a HOST defect adjudicated in §5; it was **never** a `U-ENGINE-PIN` regression and **never** a package defect, and the unit's DONE row stood throughout (its declared legs do not exercise this route). **Since 2026-09-27 this row is PASS.** |

## 5. FINDING — live contradiction of the greens — **ADJUDICATED (2026-09-27): HOST-owned, PRE-EXISTING, NOT this unit's — and since FIXED + LIVE-VERIFIED (the 2026-09-27 fix pass)**

> **`LIVE-OP-REJECT` — on the assembled app, `provident.op` returns `{status:'rejected'}` for
> every mutation, including well-formed ones; the shim battery host applies the identical
> call.**
>
> **⟶ ADJUDICATION (2026-09-27, the DONE pass).** The finding **stands**, its **root cause is
> established by reading the code** (below), and it is filed **OPEN** in `docs/defects.md` as a
> **HOST** defect — **`LIVE-OP-REJECT`** — with the fix shape and the attribution. **It is
> PRE-EXISTING** (`src/renderer/renderer.ts` is **untouched** by this unit: `git log -1` =
> `715a923`) and it is **not a `U-ENGINE-PIN` regression, not a package defect, and not a
> blocker for the unit's declared legs.** **The battery does not exercise `provident.op`, so the
> green `R13 RESULT: 9 checks, 0 failures` leg is SILENT on this finding** — a 9/0 R13 does
> **not** close it. Owner: **recommended** `U-DIVERGENCE-EXT` or a new unit — **recommended,
> not decided** (`docs/decisions.md` `LIVE-OP-REJECT-IS-A-HOST-DEFECT`).
>
> **⟶ FIX PASS (2026-09-27) — the finding is CLOSED, and this paragraph is its live
> re-verification.** **The landed fix is exactly the fix shape recorded in the table below:**
> `src/renderer/renderer.ts:43` (the `op` case of `handleRequest`) now reads
> `value = runtime.op(((req.payload as { command?: unknown })?.command ?? req.payload) as never)`,
> with a comment naming the defect id and the `?? req.payload` fallback for an already-bare
> command. **The testability seam is the `export` keyword on `handleRequest` (`:14`)** — a
> one-keyword production-surface change that is part of this fix, with no body/semantics change —
> and **no other route changed**: `load` deliberately stays **raw** (`:35`) because the
> `provident.load` schema puts its fields at the top level (`src/main/mcp-server.ts:650`).
> **The live re-run is the decisive evidence:** the probe that produced this finding
> (`node /tmp/engine-pin-live/op-variants2.mjs` — real Electron, hermetic scratch profile,
> `--disable-dev-shm-usage`) now returns **`{"status":"applied","dirtied":["node-1"], …}` for
> BOTH wrapped shapes**, where it returned **`{"status":"rejected"}` before** — the contradiction
> this section records is gone. **The tool's registered schema is unchanged**
> (`src/main/mcp-server.ts:651`, `command: z.unknown()`), so a **bare** command object is still
> rejected by the SDK at the MCP layer (`MCP error …`): the **wrapped shape remains the only
> reachable one**, which is why the renderer-side unwrap is the correct fix and why no
> host-side alternative exists. **In-node pins (RED-first):** `tests/op-command-unwrap.test.ts` —
> **`S1`** is the **RED row that pinned the finding** (pre-fix verbatim:
> `expected { command: { kind:'state-slice', … } } to be { kind:'state-slice', … }`), **`S2`** the
> non-destructive fallback, **`S3`** `load` stays raw, **`F1`/`F2`** the fail-safe rows, **`S1b`**
> the single app-graph-changed push. **Legs after the fix:** `npm test` **56 files / 795 passed /
> 2 skipped / 0 failed** (was **789 + 2 skipped** before the new file) · typecheck clean · build
> clean · battery **184 checks / 0 failures** · divergence still green
> (**`R13 RESULT: 9 checks, 0 failures`**). **The layer note stands: the envelope layer was never
> broken — the defect lived on the IPC hop**, which is why every `PA-*`/`P*` row below was green
> while the app was not. **Owner:** the fix is **LANDED by the fix pass**
> (`docs/decisions.md` `LIVE-OP-REJECT-CLOSED`); no `U-DIVERGENCE-EXT` ownership of it remains,
> and **no `docs/HANDOFF.md` row and no upstream issue is owed** (HOST defect, never a package
> defect).

| Evidence | Detail |
| --- | --- |
| **Live app** (`provident.op`, `graph` group enabled) | `{status:'rejected'}` for: `{kind:'state-slice', node:<nodeId>, mutation:[{targetProp:'props.hidden', value:undefined}]}`; the same with `props.title:'live-ok'`; with `content`; with `node:<cssId>`; with `node` omitted; with `mutation:[]`; with `kind:'layer-apply'`; with an unknown `kind`. **Re-reproduced on the post-change tree** by `node /tmp/engine-pin-live/op-variants2.mjs` (the wrapped shape). **⟶ AFTER THE FIX (2026-09-27): the same probe returns `{"status":"applied","dirtied":["node-1"], …}` for both wrapped shapes** (the fix-pass paragraph above) |
| **Shim battery host** (identical call, same build, `dist/main/battery-host.mjs`) | `{"status":"applied","dirtied":["node-3"]}` — and on the shim's own demo graph `{"status":"applied","dirtied":["node-1"],…}` |
| **Not a targeting artefact** | the live node IS addressable: `provident.list_targets` lists it (`nodeId:node-60 cssId:attr-target inTree:true`), `provident.get_node_state` resolves it, and `provident.dispatch` on the same graph dirties it |
| **Not a gate artefact** | with the `graph` group OFF the tool is not registered at all (7 tools); with it ON `provident.op` is registered and answers `{status:'rejected', renderedHtml, ssrHtml, warnings:[]}` — i.e. the app's `runtime.op` **ran** and refused |
| **Not a value-semantics artefact** | it refuses `mutation:[]` and a defined `content` write too |
| **Reproduce** | `node /tmp/engine-pin-live/op-variants2.mjs` (six shapes, **wrapped**, app only — the reachable shape); `node /tmp/engine-pin-live/op-variants.mjs` (six more shapes, app only); `node /tmp/engine-pin-live/ab-op.mjs` (A/B: Electron vs the shim host, wrapped **and** bare) |
| **Scope** | the greens' `PA-*`/`P*`/`E-11` rows were driven on the **`Runtime` bundle under node**, never over the app's IPC/MCP transport (`docs/specs/engine-pin-greens.md`, the run record's own `Layer caveat on the corroboration rows` note — *"no MCP transport was exercised"*; that file carries a LINE-NUMBER FREEZE, so **cite it by section name, never by line**), so this row was **envelope-green and is contradicted live** |
| **Attribution — ESTABLISHED (was: "not established")** | **The renderer's IPC hop does not unwrap the tool payload.** `src/main/battery-host.ts:50` **unwraps** it (`this.runtime.op(p.command)`); the **pre-fix** `src/renderer/renderer.ts:38` passed the **RAW** args object into `Runtime.op` (the landed unwrap is **`:43`**) (`value = runtime.op(req.payload)`, i.e. `{command: <cmd>}`), which forwards it to `applyCommand`, whose `cmd.kind` is then **`undefined`** — so the engine refuses a **malformed op**. The MCP tool schema registers the argument as **`command`** (`src/main/mcp-server.ts:651`) and the SDK **rejects a bare command object** ("MCP error …"), so **the wrapped shape is the only reachable one**. **The unit's guard is NOT the cause:** `mutationPropsValid` is **kind-scoped** and never runs for `kind: undefined`; the refusal is the engine's malformed-op path. **Pre-existing:** `src/renderer/renderer.ts` is **untouched** by this unit (`git log -1` = `715a923`) |
| **Fix shape (HOST-owned — fixed here, never handed off) — ⟶ LANDED 2026-09-27** | the one-line unwrap in the renderer, mirroring the battery host: `value = runtime.op((req.payload as {command?: unknown})?.command ?? req.payload)` (`?? req.payload` keeps a bare-command caller working) **+ a regression row proving a well-formed `provident.op` APPLIES over the IPC hop** — the node-suite/battery route is already green and does **not** cover that hop. **No `docs/HANDOFF.md` row and no upstream issue is owed** (HOST, not package). **⟶ LANDED (2026-09-27):** the unwrap sits at `src/renderer/renderer.ts:43`, and the regression rows are `tests/op-command-unwrap.test.ts` (`S1` the RED row that pinned the defect / `S2` the fallback / `S3` `load` stays raw / `F1`+`F2` fail-safe / `S1b` the single app-graph-changed push); **the defect row moved to `docs/defects.md`'s `## FIXED (in this repo)` section.** |

**Classification: LIVE FINDING — adjudicated 2026-09-27 (the DONE pass) as an OPEN, HOST-owned,
PRE-EXISTING defect; it is NOT a pass and NOT this unit's regression.** Per the live-runner
contract a live result that contradicts the `*-greens.md` is a finding — a live failure is a real
regression or a doc/spec drift, **never a pass**; that still holds, and this finding was **not**
converted into a pass. What changed is the **attribution and the adjudication**, not the finding:
the root cause is the renderer's IPC unwrap (§5's attribution row), the finding is filed OPEN in
`docs/defects.md`, and the unit's declared legs do **not** exercise the route — so the DONE row
was written **with this finding open and recorded**, not in spite of it. **`engine-pin.md` §2.3's
declared command surface (`provident.op` / `Runtime.applyCommand`) works in-process and does
NOT work over the app's IPC hop** — that sentence is the defect, and it is a host-repo bug.

**Note for the other direction (no over-claim):** the handler-originated apply route (outside
the guard's declared boundary) **does** work live, and does apply nullish removals in the real
DOM — so the unit's *mechanism* is demonstrated end-to-end on the assembled app. It is the
**`provident.op` route that is red**.

## 6. What could NOT be exercised, and why (parked for a later iteration)

1. **The `PF-*` pane-seam rows** — `SecurePanels.applyPaneMutation` is **renderer-side only**
   (no IPC, no MCP tool, no gate group; `docs/specs/secure-panels.md` §2a). Reachable only by a
   renderer-side driver (CDP `Runtime.evaluate` or equivalent), which this repo does not ship.
   **Structurally non-exercisable through the MCP surface** — parked with this reason, not
   because no session was available.
2. **The real-DOM attribute rows (`SC-2`, `H-r10`)** — `H-r10`'s attribute-presence extractor
   is owed to `U-DIVERGENCE-EXT`; no row asserts it, and none may be asserted from the shim.
3. **The unit's own leg verdict — CLOSED (2026-09-27, the DONE pass).** The repo's
   `npm run divergence` **could not** be run unmodified in this record's session (§1), so the
   DONE row could not be written on §1.4's scratch replication. **That is no longer the state:**
   the **harness spawn fix landed** (`--disable-dev-shm-usage` + a fresh scratch
   `--user-data-dir`) and the leg was **re-run by the supervisor on the post-change tree** —
   **`R13 RESULT: 9 checks, 0 failures`** (§0/§7). **Retained as the reason §1.4 was insufficient
   evidence:** a scratch replication is never the gate.

## 7. WHAT CLOSED THE GATE (final — replaces the former "single action that closes it")

**Two things closed it, and both happened on 2026-09-27 in the supervisor's DONE pass. The
handoff section that stood here is retained below as the record of what was owed and why, but
nothing in it is owed any more.**

### 7.1 The fix LANDED (owner changed: the supervisor, not `U-DIVERGENCE-EXT`)

`scripts/electron-divergence.mjs` now spawns Electron with **`--disable-dev-shm-usage`** (in the
shared base arg vector, `:111`) **and** a **fresh scratch profile per spawn** —
`mkdtempSync(join(tmpdir(), 'provident-r13-app-'))` / `'provident-r13-drive-'` (`:112`/`:113`),
passed as `--user-data-dir=` at **both** spawn sites (`:126` companion, `:137` SDK transport)
and cleaned on exit (`rmSync`, `:13`). **Both flags are REQUIRED** — each alone still dies
`SIGTRAP` (§1.3, measured on a 3-line minimal Electron app), and without the pair the run is
also **non-hermetic** (it writes `~/.config/Electron/GPUCache`).

**Recorded honestly: this is a HARNESS change, outside `U-ENGINE-PIN`'s §5.1 diff scope, landed
by the supervisor.** This record originally assigned it to `U-DIVERGENCE-EXT` because that unit
owns `scripts/electron-divergence.mjs`'s extension; the assignment is **superseded** —
**`U-DIVERGENCE-EXT` INHERITS the fix** and still owns the `H-r10` scenario-envelope channel,
the **attribute-presence extractor** (set-wise) and the **`props` falsy-toggle scenario**, all
**without changing N=9**.

### 7.2 The leg was RE-RUN on the post-change tree — verbatim

```
cd "/media/ryanr/Shared Files/Projects/Provident-Electron"
npm run divergence        # = npm run build && node scripts/electron-divergence.mjs
```

```
R13 RESULT: 9 checks, 0 failures
```

Stack: **Electron 44.4.5**, node **24.21.0**. Surfaces compared green: census `inTree` 12/12,
census `registered` 12/12, normalized `dirtied` ids, normalized SSR fragment, `data-node-id`
set, nodeId vocabulary, counter rendered in both, R7 dispatch non-empty. Exit 0.

**Why THIS run closes the leg and §1.4's did not:** it is the **repo's own driver** and it ran
**after** `src/renderer/**` and `src/shared/dom-shim.ts` had moved (§2). The scratch
replication kept the harness unmodified and ran outside the repo — evidence, never the gate.

**Recorded caveats that STILL bind:**
- `R13 RESULT: <N> checks, 0 failures` is the pinned shape; **N must stay 9**
  (`ci-divergence-leg.md` §5: "N=9 is a PIN, not a count that may drift"). The `H-r10` extractor
  must be added **without** changing N.
- The leg is **not** an attribute-serialisation check: it compares census / SSR / `dirtied` /
  `data-node-id` / nodeId vocabulary / counter / R7 non-empty dispatch. **No real-DOM attribute
  row may be read off this green** (`SC-2`/`H-r10` still owed to `U-DIVERGENCE-EXT`).
- `LIVE-OP-REJECT` (§5) is **independent** of this leg: the harness only calls
  `get_rendered_html` / `dispatch` / `list_targets`, never `provident.op`, so this green did
  **NOT** clear that finding — **it was cleared separately by the renderer unwrap (2026-09-27 fix
  pass, §5's fix-pass paragraph, `docs/decisions.md` `LIVE-OP-REJECT-CLOSED`); the leg remains
  silent on it.**
- The harness spawns **two** Electron instances (companion `:126` + SDK transport `:137`); both
  now carry the flags, which is why the **shipped dual-instance topology** is the one that went
  green (a single-instance replication was never the gate).

**Former handoff record (retained — it is what was owed before 7.1 landed):**

> **Owner (superseded):** `U-DIVERGENCE-EXT` — because the change is inside
> `scripts/electron-divergence.mjs`'s spawn and the unit holding this record must not absorb it.
> **The change (candidate fix, as it stood):** in both spawn sites — the companion at
> `:104-106` and the SDK transport at `:113-118` — add `--disable-dev-shm-usage` **and**
> `--user-data-dir=<a fresh temp dir, one per instance>`; both are required (§1.3, measured):
> the first alone still SIGTRAPs on the `$HOME` GPU-cache denial, the second alone still
> SIGTRAPs on the `/dev/shm` denial. The `--user-data-dir` half is **already mandated** by
> `ci-divergence-leg.md` §1's isolation clause, so the fix discharged **two** obligations at
> once. *(Line numbers in this quoted block are the pre-fix ones; the landed sites are
> `:111-113`/`:126`/`:137` per 7.1.)*

## 8. Method / hygiene

- **No file under `scripts/**`, `src/**`, `tests/**` or `docs/next-steps.md` was modified by
  this pass.** *(Scoped to the live-runner pass that wrote this section: the **later** 2026-09-27
  fix pass DID modify `src/renderer/renderer.ts` — the unwrap + the `export` seam — and added
  `tests/op-command-unwrap.test.ts`; see §5's fix-pass paragraph.)* `git status` shows those as `M`/`??` because they carry the **unit's own landed
  work** (mtimes 19:23–21:26, all before this session's first command at ~21:27); the **only
  change this pass added to the repo is this file**. Verified by mtime: `runtime.ts` 19:23,
  `dom-shim.ts` 21:13, `secure-panels.ts` 21:21.
  **⟶ SUPERSEDED FOR THE DONE PASS (2026-09-27):** the **supervisor's DONE pass DID modify one
  file under `scripts/**`** — `scripts/electron-divergence.mjs` (the spawn fix, §7.1) — and that
  change is **recorded as a harness change, outside `U-ENGINE-PIN`'s §5.1 scope**. The bullet
  above stays as the *original* pass's hygiene record; **no `src/**` or `tests/**` file was
  touched by any doc/supervisor pass.**
- Every probe lives outside the repo tree: `/tmp/engine-pin-live/` (`probe-electron.mjs`,
  `scratch-divergence.mjs`, `scratch-divergence-single.mjs`, `sdk-probe.mjs`,
  `raw-mcp-probe.mjs`, `live-rows.mjs`, `ab-op.mjs`, `op-variants.mjs`, `attr-op.mjs`,
  `apply-route.mjs`, `minapp/`, logs). The demo envelope used by the scratch replication is
  **copied verbatim** from `scripts/electron-divergence.mjs` (data only).
- **No replacement server was started**, and no `npm run divergence` workaround was committed.
