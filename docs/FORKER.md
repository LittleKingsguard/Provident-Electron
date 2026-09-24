# FORKER — Orientation for Follow-On Projects

> **Read this first.** Provident-Electron is a **base foundation build** that
> follow-on projects fork and build on top of. This doc gives you the orientation
> a fork agent needs WITHOUT reaching into the current project's `archive/`
> directory or the adjacent `../Preempt-Providence/` folder — neither ships in a
> fork.

## 1. What ships in a fork, what does not

| Ships in the fork | Does NOT ship |
| --- | --- |
| `src/` (all TS source) | `archive/` — **gitignored** (`.gitignore:88`); holds only historical review records + retired proposal/review gates |
| `tests/` (all vitest suites + fixtures) | `../Preempt-Providence/` — the ADJACENT upstream package source folder (not a dependency) |
| `docs/` — **this is your contract source of truth** | `node_modules/provident-ssr/` source (a published npm package; install it) |
| `dist/` after `npm run build` | — |

**The active `docs/` tree IS the source of truth.** `docs/specs/mcp-endpoint.md`
is the MCP contract. `docs/decisions.md` is the decision record. `docs/defects.md`
is the active defect list. `docs/pending.md` + `docs/next-steps.md` are the
trackers. Everything landed is documented there; the archived gates in
`archive/` are historical rationale only.

## 2. The dependency map (what to install / where upstream specs live)

- **`provident-ssr`** — the only runtime dependency, published on npm. `npm i
  provident-ssr@^0.5.1`. It is fully self-contained (ESM); zero runtime deps, and
  the `exports` map / `type: module` are identical across the 0.2.x → 0.5.x
  ladder, so `.js`-suffixed `provident-ssr/core/*` imports keep resolving. Its
  bundled type defs (`node_modules/provident-ssr/dist/**/*.d.ts`) + the SDK docs
  are the engine surface.
  > **Version provenance — read this before pinning differently.** `^0.2.1` was
  > this repo's pin through 2026-08-26; **the pin HAS MOVED to `^0.5.1`**
  > (0.5.1 published 2026-09-23), via architect amendment A-d2, and **the
  > architect ran the install**: `package.json:23` reads `"provident-ssr":
  > "^0.5.1"`, `package-lock.json` resolves `provident-ssr-0.5.1.tgz`, and the
  > installed copy reports `0.5.1` (**all read 2026-09-27**). **The unit that
  > owns the move (`U-ENGINE-PIN`) is **COMPLETE on every leg it declares — `DONE` on
  > 2026-09-27**, the **declared live `npm run divergence` leg included** (`R13 RESULT: 9 checks,
  > 0 failures`, post-change tree, after the supervisor landed the harness spawn fix). The shim
  > completion (`ShimElement.removeAttribute`, incl. the
  > `id`/`value` slot clears) and the shape-only host guard **landed and are
  > green** (`npm test` 789 passed / 2 skipped / 0 failed *(DONE-pass count — **⟶ 56 files / 795
  > passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass** — **⟶ 58 files /
  > 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass** — **⟶ 58 files /
  > 863 passed / 2 skipped / 0 failed after the 2026-09-27 RETRY pass**)*, typecheck clean,
  > build clean, battery 184 checks / 0 failures). The paragraph that stood here — the live leg
  > exiting 1 in this environment (`R13 RESULT: 1 checks, 2 failures`), its last good run being
  > **pre-change**, and a **scratch replication** standing in for the gate — is **spent**; the
  > scratch replication was superseded by the real leg, and the spawn fix now belongs to the
  > harness (`U-DIVERGENCE-EXT` **inherits** it). There is
  > also a live finding — `provident.op` refusing every mutation on the assembled app
  > over the **IPC hop** — **ADJUDICATED** as a **HOST-owned, PRE-EXISTING** defect
  > (`docs/defects.md` `LIVE-OP-REJECT`; root cause = this repo's renderer IPC unwrap — the
  > **pre-fix** `src/renderer/renderer.ts:38`, landed at **`:43`**), and then **FIXED +
  > LIVE-VERIFIED (2026-09-27)**: the unwrap landed and the live probe flipped from
  > `{status:'rejected'}` to `{"status":"applied", …}` (pinned by
  > `tests/op-command-unwrap.test.ts`). It is **not** a package defect, so **no upstream issue is
  > owed**, and it **did not block** `U-ENGINE-PIN`. So **treat a green node-suite here as
  > envelope-layer evidence, never as assembled-app evidence** (full record:
  > `docs/specs/engine-pin-live-status.md`). The DONE row is written — the supervisor's pass
  > (`docs/decisions.md` `ENGINE-PIN-0.5` + the `U-ENGINE-PIN` decision set + the DONE-pass set,
  > `docs/next-steps.md`'s `U-ENGINE-PIN` DONE record; **row A has MOVED out of `## OPEN` into
  > that record**). **The old "the pin may not yet have
  > moved" wording is SUPERSEDED — it moved**, and so is the intermediate
  > "shim half + guard still RED" status, **and so is the "its live leg is NOT passed / the DONE
  > row is owed" status** (`R13 RESULT: 9 checks, 0 failures`, 2026-09-27). A fork should boot on `^0.5.1`: the
  > `inert`/boolean-attribute capability this repo's adopted overlay mechanism
  > needs arrives in **0.4.1** and is present in 0.5.1. **The `^0.2.1`-era line
  > above in this doc is (historical provenance).**
  > **The same install also moved three devDependencies, and that is NOT part of
  > the declared retarget:** `electron` `^33.4.11 → ^44.4.5`, `esbuild`
  > `^0.24.0 → ^0.28.2`, `vitest` `^2.0.0 → ^5.0.1` (`package.json:25-31`). It is
  > recorded as an **UNPLANNED SCOPE CHANGE** that the architect has now
  > **ACCEPTED** (`docs/decisions.md` `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED`), so **a
  > fork should still decide its own Electron pin deliberately rather than copy
  > this repo's `^44` by accident** — a MAJOR jump that this repo's own engine
  > red set never covered.
  > **Behavioural note:** 0.4.0 added real text-node emission and 0.5.1 added
  > `bodyRuns` drop diagnostics (a `console.warn` at the emit resolver) — do not
  > read an absent warn line as "nothing dropped" (`docs/pending.md`
  > `UPSTREAM-DIAGNOSTICS-BODYRUNS`).
- **`@modelcontextprotocol/sdk`** — the MCP server SDK.
- **The upstream project** (`github.com/LittleKingsguard/Preempt-Providence`) —
  the `provident-ssr` source + its `docs/specs/`. Several active docs reference
  upstream spec names that do NOT ship locally. They are recoverable from the
  upstream GitHub repo / the published package:
  - `ssr-synthetic-event.md` (Phase A/B dispatch contract)
  - `undo-redo-report.md` (the journal `UndoRedoReport` surface, 0.2.1 —
    **(historical provenance)**; the surface is present unchanged in 0.5.1)
  - `multi-graph-isolation-spec.md` (the SecurePanels `createIsolatedScope` model)
  - `handoffs-review-2.md` (battery + `new Function` trust-gate provenance)
  - `next-feature-batch-0.2.0.md` (0.2 feature roadmap)
  - `pending.md` (Phase C row — the MCP/Electron endpoint this repo implements)

> **Rule:** this repo NEVER edits the package or the upstream folder. Defects go
> to `docs/defects.md` → `docs/HANDOFF.md` (outgoing issue records), never patched
> here. Follow-on projects should keep this: the engine is a dependency, not a
> thing to vendor-patch.

## 3. The MCP surface (what an agent drives)

The repo's purpose is **full synthetic-event access + rendered-HTML visibility
for MCP endpoints** (agentic use + debugging). The MCP tools (gated by tool
groups, all in `docs/specs/mcp-endpoint.md` §3):

| Tool | Group | Purpose |
| --- | --- | --- |
| `provident.dispatch` | dispatch | drive a synthetic event on a node |
| `provident.get_rendered_html` | read | rendered DOM + SSR fragment + census |
| `provident.get_markdown` | read | simplified text-only output |
| `provident.list_targets` | read | addressable node vocabulary |
| `provident.get_node_state` | read | a node's resolved states |
| `provident.code.get` / `provident.code.validate` | read | read a handler body / schema-validate an envelope — **added to this table 2026-09-27** (both are `read`-group in `src/main/security.ts:10-11`; the table listed only the four `read` rows above, which made the read group look like 4 when it is **6**) |
| `provident.load` / `op` / `export` / `validate` / `teardown` | graph (OFF) | envelope/doc/commands load, managed-channel ops, export, validate, teardown |
| `provident.journal` | graph (OFF) | undo/redo/replay (journal reversibility) |
| `provident.code.*` | code (OFF) | envelope authoring (get/set/create/delete/validate/load/loadBatch) |
| `module.install` / `module.update` / `module.list` | module+code (OFF) | the extension system (see `docs/specs/module-feature-list.md`) |
| `provident.focus` — **OWED, NOT YET IMPLEMENTED** | dispatch (ON) | UI-only entry focus (find-or-open-by-target on the renderer's focus model). **Do not look for this tool in the tree yet:** it lands with unit `U-FOCUS-TOOL` (architect ruling A-d5), and `docs/specs/mcp-endpoint.md` §3.8 records the contract as **`OWED`**. When it lands: `ALL_TOOLS` **21 → 22**, `RpcMethod` **21 → 22** (CORRECTED 2026-09-27 — the live census is **21**, `src/shared/types.ts:259-280`; the earlier **"19 → 20"** was stale), default-gate subset **7 → 8**. **It is NOT in `MUTATING_METHODS`: it emits no notification, mutates no graph, persists nothing, and cannot force a re-render.** |

**Tool groups OFF by default:** `graph`, `code`, `module` — a human enables them
via the manual-UI Settings pane (main process owns the gate; an agent can never
self-grant).

> **Counts, as of 2026-09-27:** `ALL_TOOLS` is **21** names today
> (`src/main/mcp-server.ts:281-303`, read this pass) and becomes **22** when
> `provident.focus` lands; the default-gate registered subset is **7** today and
> becomes **8**. **Older docs in this tree say 12/15/18 — they are stale.** The
> authoritative current list is `docs/specs/mcp-endpoint.md` §3/§4.1 plus §3.8's
> `OWED` note.

## 4. Reshape digest — the "why" behind the current shapes (recoverable without the archive)

The following reshape sets are the decision rationale that was archived. The
outcomes are in the active docs; the definitions are reproduced here so a fork
agent extending the surface knows why the shapes were chosen.

### J1-J8 — the journal endpoint (`provident.journal`)
- **J1 (was blocking, RESOLVED by upstream 0.2.1)** — the derivability gap:
  `undo()/redo()/replay()` returned `void` + private stacks. 0.2.1 gives an
  `UndoRedoReport` (`{status, scheduledDirtied, stackTopKind?, redoTopKind?,
  baseBoundary}`) + read-only stack accessors.
- **J2 (superseded)** — originally a narrowed `{status, renderedHtml, ssrHtml,
  warnings}` return; superseded by the full report surface.
- **J3** — whole-graph rebuild on base-restore (the host must rebuild
  `nodes`/`rootNode`/id-index, not focused-slice).
- **J4** — honest framing: undo reverses only EXACT subset (state-slice/attach/
  rows-mint); destroy is a pinned no-op; 6 op kinds documented no-ops; dispatch
  NEVER undoable; stacks emptied by any re-derive. **⟶ destroy-undo's REPORTED status
  is `no-op` at `0.5.1`** (re-measured 2026-09-27, `U-ENGINE-DRIFT` `M-31`: the engine's
  resolve guard returns before the `destroy` branch, so the earlier `applied` reading is
  **not reproducible** — `docs/defects.md` `## CLOSED`, `docs/HANDOFF.md` Round 9), so a
  host surfaces a **truthful** no-op for that kind. **The "no-op must never be silent"
  trap this bullet exists for is therefore satisfied for `destroy` by the engine itself**;
  the other documented no-ops' statuses are unchanged and NOT covered by that measurement.
- **J5** — single `provident.journal { action: 'undo'|'redo'|'replay' }` tool.
- **J6** — five-seam registration (`security.ts` TOOL_GROUPS + mcp-server
  ALL_TOOLS + types RpcMethod + renderer switch + MUTATING_METHODS).
- **J7** — no `requestId` (intrinsically non-idempotent).
- **J8** — app-Runtime-only (never the isolated SecurePanels graph).

### R1-R5 — the MCP resources (`mcp://provident/app`, `/node/{id}`, `/targets`)
- **R1** — resources are `read`-group members (register only when group allowed;
  never always-registered).
- **R2** — capture + live re-gate the resource handles.
- **R3** — wire into both transport builds (stdio + per-POST HTTP).
- **R4** — node-template read hardening + isolation (validate in-tree id, never
  read the SecurePanels graph).
- **R5** — always-fresh snapshots, per-resource mimeType, template-over-enumerated.

### N1-N7 — the live-change notification
- **N1** — typed notification (`resource-updated` / `resource-list-changed` /
  `tool-list-changed`) with correct triggers.
- **N2** — stdio-only push (HTTP no-op), enforced not just documented.
- **N3** — app-Runtime-only source; SecurePanels never emits (isolation guard).
- **N4** — new `provident:notify` renderer→main IPC channel.
- **N5** — gated + opt-in (manual-UI), default OFF.
- **N6** — coalescing: one notify per tool invocation's write-side.
- **N7** — low-level `sendResourceUpdated` + per-client `resources/subscribe` gate.

### B1-B8 — `code.loadBatch`
- **B1** — single-tool `code.loadBatch(ops[])` form (reject the write-buffer).
- **B2** — all-or-nothing clone-then-validate-then-commit.
- **B3** — ordered-with-dependencies (apply to the evolving clone).
- **B4** — pinned discriminated batch-op schema.
- **B5** — `LoadResult` + per-op status return.
- **B6** — the six-site `code`-group registration checklist.
- **B7** — no-envelope case throws the same error as other `code.*` writes.
- **B8** — honest framing (N-1 round-trips, NOT re-derive cost) + test matrix.

### R1-R16 — the E2E battery (Units B/C/D)
R1 version-pin + tracker reconcile; R2 corrected A1 recipe; R3 snapshot-parity
scope; R4 the fork-stress census arithmetic (`inTree = 2^d − 1 + 2(d−1)` = 4117
at d12); R5 C4-vs-d12 depth amendment; R6 the `hasPendingWork()` settle-gate in
teardown; R7 battery assertion hygiene (key on css.id, never `node-N`);
R8 userData lifecycle; R9 pass-2 drain ownership; R10 warning surfacing;
R11 cycle-variant A3 scoping; R12 stress-expand body provenance; R13 DOM-shim
fidelity; R14 live-prod privacy guard rail; R15 `hook-kind-mismatch` containment
list; R16 C3 wording.

### SCH-1..SCH-13 — the shell-chrome work package (AMENDED TWICE: A-d1/A-d2/A-d3 **and** A-d4…A-d8, 2026-09-27 — the A-d4…A-d8 layer GOVERNS)

**Read this table before filing a shell-chrome request.** This repo adjudicated a
downstream fork's 13-item shell-chrome package
(`docs/specs/provident-electron-shell-chrome-handoff-review.md`, amended in
place — read its appended `Amendment record (A-d4…A-d8)`) and **now owns sixteen
of those mechanisms itself**, plus two engine prerequisite units and two harness
units. **Do NOT re-request them** — a re-request must cite and supersede that
record, and it will be declined as already-owned.

**Governing counts: 13 items · 16 `SCH`-derived units · 2 engine units · 2 harness
units = 20 units. 3 items carry a declined part-half. 0 PARK · 2 DONE · 2 units fully
green.** **Both engine units are `DONE` (2026-09-27) and COMPLETE on every leg they declare.**
`U-ENGINE-PIN` is COMPLETE on every leg it declares — the live `npm run divergence`
leg included (`R13 RESULT: 9 checks, 0 failures`, post-change tree, after the supervisor landed
the harness spawn fix); its one live finding (`LIVE-OP-REJECT`) was a HOST-owned pre-existing
defect that did not block it and is **since FIXED + LIVE-VERIFIED (2026-09-27)** — the renderer IPC
unwrap; `docs/defects.md`'s `## FIXED (in this repo)` section. **`U-ENGINE-DRIFT` is `DONE` too, and
it landed exactly as authorised: a MEASUREMENT record (`docs/specs/engine-drift-measurements.md`,
`N = 57`) with ZERO production code and ZERO new tests** — its red is the existing suite under the
moved pin, **run and reported as empty** (`56 files / 795 passed / 2 skipped / 0 failed`, **0**
failures attributable to the pin move), with **both `DRIFTED` rows' tracker halves landed**. *(Suite
counts are dated: **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C
`U-REALDOM-BOOT` landing pass**, which added that unit's two `ui`-leg test files / 27 rows — **⟶ 58 files /
863 passed / 2 skipped / 0 failed after the 2026-09-27 RETRY pass**, which added the retry's 39 `RT-*`
rows (**`41`** `RT-*` rows in the file today after the `F-1` fix's two, `RT-0a`/`RT-0b`; the contract file holds 59 = 18 non-`RT` + 41 `RT`; the unit's set with the 9 seam rows is `68/68` green).)* See §2's
version note and `docs/specs/engine-pin-live-status.md`; the two DONE records are `docs/next-steps.md`'s
`U-ENGINE-PIN` and `U-ENGINE-DRIFT` DONE records. *(The pre-wave-B reading — "1 DONE · 1 unit fully
green" — is superseded.)*

| Unit | Derives from | What it is | Status |
| --- | --- | --- | --- |
| `U-ENGINE-PIN` | A-d2 | `provident-ssr` `^0.2.1` → `^0.5.1` (**install DONE**) + the scoped shim completion (`removeAttribute`, with the `id`/`value` slot special cases) + the shape-only prop-mutation guard across both call sites (`Runtime.applyCommand`, the pane channel) + the pane seam `applyPaneMutation` | **`DONE` (2026-09-27) — COMPLETE on every leg it declares:** `npm test` 55 files / 789 passed / 2 skipped / 0 failed *(DONE-pass count — **⟶ 56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass** — **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**)* · typecheck clean · build clean (5 bundles) · battery 184/0 · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`** (post-change tree; the harness spawn fix `--disable-dev-shm-usage` + a fresh scratch `--user-data-dir` **landed** and is **inherited** by `U-DIVERGENCE-EXT`). Blind greens **104 / 96 PASS / 0 FAIL / 5 NBR**; doc review RUN. **One live finding stood OUTSIDE this unit's scope and is SINCE FIXED + LIVE-VERIFIED (2026-09-27)** — `LIVE-OP-REJECT` (the assembled app's `provident.op` over the IPC hop; root cause = **this repo's** renderer IPC unwrap — the **pre-fix** `src/renderer/renderer.ts:38`, landed at **`:43`**, untouched by the unit; **HOST**-owned, **no** upstream handoff owed; pinned by `tests/op-command-unwrap.test.ts` `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`) — `docs/defects.md` / `docs/specs/engine-pin-live-status.md` §5. The leg asserts **no** attribute row (`H-r10` still owed) and is **silent** on that finding |
| `U-ENGINE-DRIFT` | A-d2 | the behavioural reconciliation / measurement pass at the new pin (may land zero code) | **`DONE` (2026-09-27) — COMPLETE on every leg it declares, and it landed as its spec's ruling 3 authorises: a measurement record with ZERO production code and ZERO new tests.** The record `docs/specs/engine-drift-measurements.md` is the unit's only authored artifact — **single reconciled ledger**, `N = 57` rows (`M-1`…`M-57`) = 47 `CONSISTENT` + **2 `DRIFTED`** (`M-14`, `M-31`) + 7 `UNMEASURABLE` (`M-25`, `M-38`, `M-46`, `M-49`, `M-50`, `M-51`, **`M-57`** [the `M-30` split's IPC hop]) + 1 `INVALID` (`M-52`, kept in place, replaced by `M-56`); nine columns per row. The red is the existing suite under the new pin, **RUN and REPORTED as empty — `56 files / 795 passed / 2 skipped / 0 failed`** *(that run's count — **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**)*, 0 failures attributable to the pin move; the other four legs are green (typecheck clean · build clean, 5 bundles · battery **184/0** · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`**, `N = 9` untouched). **Both `DRIFTED` rows' tracker halves landed** (`RAW-STRING-CENSUS-RETIRED`, `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`); the adversarial verdict on the record **as filed** was `NOT DONE-ELIGIBLE` on **two blocking findings**, **both corrected and then re-verified**; the blind re-run (`docs/specs/engine-drift-greens.md`) was **51 scenarios / 42 PASS / 3 FAIL / 6 NOT-BLIND-RUNNABLE**, all three FAILs reconciled in the record with **no verdict moved**. Its DONE record is `docs/next-steps.md`'s `U-ENGINE-DRIFT` DONE record. **Do not quote the pre-correction ledgers (`45 + 2 + 8 + 1 = 56` or `44 + 2 + 9 + 1 = 56`); both are superseded.** |
| `U-REALDOM-BOOT` | A-d8 | **⟶ PREREQUISITE STATUS, 2026-09-27 (FOURTH pass — the npm-shim RCA): "a working Electron runtime" **IS MET**.** The blocker this cell recorded was **NOT environmental**: the corruption was **one file inside this repo's `node_modules`** (`electron/cli.js` — the file `node_modules/.bin/electron` symlinks to — replaced by a shell script that re-execs itself, so every boot spun at ~99 % CPU printing nothing), now **REPAIRED**; a post-repair boot probe exits `0` in `176 ms` printing `BOOT-OK 44.4.5`, and both live legs ran green (`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`; `npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`). **The unit is still `LANDED-GREEN-BUT-NOT-DONE`** — what remains is the per-unit documentation review + the supervisor's `DONE` row *(**⟶ ✅ THAT CLAUSE IS SPENT (2026-09-27, the DONE pass): the unit is `DONE` — the documentation review RAN and the `DONE` row IS WRITTEN; see this row's `DONE` cell and `docs/next-steps.md`'s `## DONE — U-REALDOM-BOOT` record.**)*. **⟶ SIXTH PASS (2026-09-27, the `F-1` RCA + fix): its BOTH live-battery findings are now CLOSED** — `F-1` (the leftover scratch profiles) by **spawning the Electron BINARY instead of the CLI wrapper + registering the cleanup hook at `scratchRoot` creation** (exit-path matrix: **0 roots** on every path, checked immediately and after an 8 s settle, **0 surviving `electron` processes**; the leg's `leftover profiles: NONE` report now **matches the disk**), and `F-2` (the timeout-class retryability race) by the settle-snapshot fix. **The blind run's `R0-04` FAIL is dispositioned REAL DEFECT, NOW FIXED.** **⟶ ADVERSARIAL STATUS UPDATED 2026-09-27 (the ADVERSARIAL-FIX pass — status/annotation only; no clause of this cell, of the unit's spec or of this file's contract text is amended):** the unit's **adversarial pass HAS RUN and its record has LANDED** — `docs/specs/ci-ui-leg.md` §3a (**ADVERSARIAL PASS RECORD** `AP-1`…`AP-5`: a read-only sweep of **all 14 seeds `U-1`…`U-14`**, **none obsolete**, verdict **`FIT for its DONE row`** — **no security escalation, no fabricated-measurement path, no retry that masks a failure, no PACKAGE defect ⇒ no `docs/HANDOFF.md` round owed**; the measurement record's `M-46` **stays `UNMEASURABLE`**, untouched by it) + §3b (the landed findings table `F-0`/`G-1`…`G-13`). **The `OWED` status lines those sections carried are SPENT.** **Its HOST findings are FIXED, and the fixes are two general rules a fork inherits:** **(1) `G-1` (MED, headline) — the leg now takes its OWN observation of the operator's `DISPLAY` BEFORE the precondition spawns anything, and the divergence-child spawn no longer injects `DISPLAY \|\| ':0'`** — §3.1's DECISION order and `PRE-1`/`PRE-3`/`RT-8` item 2 are **intact**, and the red-precondition branch prints a `G-1` **diagnostic-only** note; **the rule: an environment PREREQUISITE is decided on the LEG'S OWN observation of the operator's environment, NEVER on a default the harness MANUFACTURES for a child it invokes** (`docs/decisions.md` `LEG-ENV-PREREQUISITES-ON-OWN-OBSERVATION`); **`G-1`'s NAMED RESIDUAL — owner: the divergence leg's `PRE-4` / `U-DIVERGENCE-EXT` — is that a display-less host with NO X server still exits `2`**, because the **pinned** divergence leg manufactures `:0` for its own child (`scripts/electron-divergence.mjs`; parked at `docs/pending.md` §F). **(2) `G-2` + `G-3` — evidence rows must OBSERVE what they print:** `R0`(c) now witnesses the **real operator profile** read-only (existence + per-store presence/mtime/size, **never contents**) before/after, and `R4`'s executed row scans the leg's **CODE, comment-aware**, for the honest-limits **call-site set** (`app.isPackaged`, `webContents.executeJavaScript`, `webContents.debugger`) **instead of phrases**, printing exactly what it checks — **the rule: a row's printed claim and its assertion must be the same object** (`docs/decisions.md` `EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`; a fork's own harness rows are exposed to the identical trap). Also FIXED: `G-6` (the TDZ-unsafe exit-hook guard — declared before the hook), `G-7` (the leg prints the **effective** per-boot ceiling with its derivation and the unbounded-above note), `G-13`'s `scripts/**` third (three stale comments). **ROUTED, STILL OPEN: `G-4`** (`tests/**` — the `R1` row matched the **STRUCK** `typeof window` marker, so a predicate revert stays green; **owner: the TestWriter**; rule ACTIVE as `TEST-MARKER-MUST-BE-THE-ASSERTION`). **PARKED with revisit conditions:** `G-6`'s residual case, `G-8` (the `PRE-2` digest window closes before the boots), `G-9` (probe not pinned to the loaded envelope) — `docs/pending.md` §F. **HOST rows:** `G-1`/`G-2`/`G-3` are filed CLOSED host-side in `docs/defects.md` (`UI-LEG-DISPLAY-PRECONDITION` + `UI-LEG-EVIDENCE-ROW-OBSERVES-ITS-CLAIM`), **no `docs/HANDOFF.md` round owed, no upstream issue owed.** **POST-FIX VERIFICATION (implementer-measured):** `npm run ui` **exit 0**, **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, **`427x22`**, **`retries=0`**, **`leftover profiles: NONE`**, `ls -d /tmp/provident-ui-run-*` **empty**, **`0` roots on every exit path** (green `0`; `PROVIDENT_UI_BOOT_ATTEMPTS=abc` → `1`; `PROVIDENT_UI_BOOT_TIMEOUT_MS=30` → `1` exhaustion; the `200 ms` regime — the borderline `RK-14` handshake — one retried green, one exhausted, both **0 roots**), the raised-timeout run prints **`181750 ms for THIS configuration`**; unit **`68/68`**; `npm test` **58 files / 863 passed / 2 skipped / 0 failed**; typecheck + build **clean**; battery **`184/0`**; `npm run divergence` **`R13 RESULT: 9 checks, 0 failures`** (UNCHANGED). **No row converted to a pass, no seed retired, no `NBR-*` re-dispositioned.** **What is left is documentation/review work only: the per-unit documentation review (now ELIGIBLE) + the `DONE` row.** **Fork-relevant integrity note: see §5's outside-the-trio table.** — the `npm run ui` leg: a real Electron renderer under a controlled temp profile, driven over stdio MCP, **ONE** real measurement; **needs a DISPLAY** | **⟶ `LANDED-GREEN-BUT-NOT-DONE` (2026-09-27; the `BLOCKED` status this cell carried, and the "then the `U-ENGINE-PIN` DONE row" blocker, are both SPENT).** **⟶ ✅ `DONE` (2026-09-27, the supervisor's DONE pass — the ledger's THIRD `DONE` row; this cell's `LANDED-GREEN-BUT-NOT-DONE` status is kept as provenance and is SPENT): COMPLETE on every leg its spec declares.** `npm test` **58 files / 863 passed / 2 skipped / 0 failed** · typecheck clean · build clean (5 bundles) · battery **184 / 0** · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`** (`N = 9` intact) · **`npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, the ONE measurement `427x22` at `fontSize="16px"`, `retries=0`**; the **live battery RAN** (a real retry, a real exhaustion at exit `1`, a red precondition at exit `2`, a DISPLAY absence at exit `3`) and **both live-battery findings are CLOSED** (`F-1` the leftover scratch profiles — **ZERO roots on every exit path**, checked immediately and after an 8 s settle, with `0` surviving `electron` processes; `F-2` the timeout-class race — boundary now MONOTONIC); the **blind greens were `32` ids = `24` PASS / `4` FAIL / `4` NOT-BLIND-RUNNABLE** (all four FAILs REAL defects, all FIXED; the earlier as-filed `26/16/4/6` form is corrected in that file's §3 `CORRECTION NOTE`), and the **per-unit documentation review RAN**. **Fork-relevant limits, binding:** the green is **`[U]` + `[T]` evidence with `[B]`/`[A]` only where the leg invokes them** — **no rendered geometry, no IPC-layer behaviour, no attribute row** (the measurement record's **`M-46` stays `UNMEASURABLE`**), and a green `divergence` leg stays **structural-surfaces-only**. **The DONE record is `docs/next-steps.md`'s `## DONE — U-REALDOM-BOOT` section, which also marks every wave-C owed list DISCHARGED.** **What is left is RESIDUE and gates nothing:** the adversarial pass's own record (`docs/specs/ci-ui-leg.md` §3a/§3b — its two findings are FIXED and CLOSED; the record itself lands there) and the recommended snapshot-ordering test row (TestWriter-side, RECOMMENDED and NOT IMPLEMENTED). *(Previous cell text, kept as provenance: "what remains is the per-unit documentation review + the supervisor's `DONE` row".) 2026-09-27 (THIRD pass — read this before the rest of this cell: its tail list of what is owed is SUPERSEDED):** the **retry ruling is ANSWERED and the retry is IMPLEMENTED** (`docs/specs/ci-ui-leg.md` §3.7 `RT-1`–`RT-9` + its PRECEDENCE CLAUSE; `scripts/electron-ui.mjs`), the unit's rows are **`68/68` green** (`39` new `RT-*` rows; `tests/ui-leg-contract.test.ts` holds **`59`**) on a **`58 files / 863 passed / 2 skipped / 0 failed`** suite, the **blind-greens gate HAS RUN** (`26 scenarios = 16 PASS / 4 FAIL / 6 NOT-BLIND-RUNNABLE`, all four FAILs dispositioned — the ceiling re-pinned to `121 750 ms`, the knob names recorded, the timeout class made retryable, the profile cleanup fixed), and **two host-code defects found by that run are FIXED** (the scratch-profile cleanup — a delete-and-verify sweep + a recorded cleanup report on all five exit paths; so `ls -d /tmp/provident-ui-run-*` is empty after every path; and a pre-existing unhandled-`EPIPE` crash that had hidden every attempt record). **The `5/5 rows green` quote below is STALE** (the landed form is `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`) **and PRE-REGRESSION. THE CURRENT BLOCKERS: (1) the two LIVE legs — `npm run divergence` and `npm run ui` — CANNOT RUN: the host's Electron runtime is non-functional (ENVIRONMENT, A/B-proven not this repo's diff: `✗ electron connect/drive failed: MCP error -32001: Request timed out` → `R13 RESULT: 1 checks, 2 failures`; `npm run ui` hangs in its own precondition; a bare `electron -e 'console.log(1)'` hangs). The retry change has had NO live verification; the last GOOD divergence evidence stays `R13 RESULT: 9 checks, 0 failures` (post-change tree, earlier). (2) the per-unit documentation review (item 10d/RCA-6). (3) the adversarial pass's own record (spec §3a/§3b), whose known findings are the FIXED pair above. THE UNIT IS STILL NOT `DONE`.** See `docs/next-steps.md`'s `WAVE-C UPDATE` block and `docs/decisions.md`'s `REALDOM-UI-LEG-RETRY-RULED-AND-LANDED` + `ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER`. **LANDED:** `scripts/electron-ui.mjs` (the leg) + **`scripts/electron-spawn.mjs`** (the shared Electron-spawn helper — the divergence leg calls it, arg vector/env/stdio/profiles unchanged) + the **one additive seam** in `src/main/main.ts` (`--provident-user-data=<path>` argv scan + `app.setPath('userData', path)` above the store reads; **absent ⇒ no call, today's behaviour**) + **one** additive `package.json` script key (`"ui"` — the **TWELFTH** key; the pre-unit block held eleven, per the SpecWriter's `M-2` count re-pin). **MEASURED:** red **20 failed / 7 passed** (13 rows: no leg file · 4: no helper · 3: no seam) → **27/27 green**; **live `npm run ui` → exit 0, `UI RESULT: 0 failures (5/5 rows green)`**, the ONE measurement **`427x22`** at `fontSize="16px"` read back over `provident.get_rendered_html`; `R0` isolation across two scratch boots, `R1` the real-renderer typed marker (`HTMLDivElement`/`CSSStyleDeclaration`) with the shim side **`UNSUPPORTED`** (never `0`); `npm test` **58 files / 822 passed / 2 skipped / 0 failed** · typecheck clean · build clean · battery **184/0** · **`npm run divergence` `R13 RESULT: 9 checks, 0 failures` — UNCHANGED**. **STILL OWED (no DONE row exists):** the per-unit **adversarial** pass, the **blind-greens** gate, the per-unit **documentation review**, the **`R1`-marker + scripts-count spec re-pin** (the wave-C SpecWriter's), and the **architect's retry decision** — `RK-14`'s flake class is **CONFIRMED REAL here** (`/dev/shm` writes forbidden ⇒ a renderer intermittently dies `SIGTRAP` at bootstrap, ≈1-in-3, so the leg can legitimately exit **2 PRECONDITION-FAILED**; the divergence leg is flaky identically) |
| `U-DIVERGENCE-EXT` | A-d8 / `H-r10` | the scenario-envelope channel + attribute-presence extractor for the **existing** `divergence` leg, **N=9 unchanged**; **INHERITS the landed spawn fix** (it no longer owes the flags) | **BLOCKED** — then `U-REALDOM-BOOT`; its former "unblocks `U-ENGINE-PIN`'s open divergence leg" role is **DISCHARGED** (that leg is green — the supervisor landed the fix). **⟶ 2026-09-27 (THIRD pass): its declared leg `npm run divergence` was UNRUNNABLE — the host's Electron runtime is non-functional (ENVIRONMENT regression, A/B-proven not this repo's diff). ⟶ CORRECTED 2026-09-27 (FOURTH pass, the npm-shim RCA): that attribution was WRONG and the runtime works — the cause was a **corrupted in-repo npm shim** (`node_modules/electron/cli.js`, a shell script re-execing itself), repaired, and `npm run divergence` RAN GREEN post-repair (`R13 RESULT: 9 checks, 0 failures`; census `12/12` both legs). SO THIS ROW IS **BLOCKED ONLY ON ITS OWN DELIVERABLES** — the runtime half of its blocker is DISCHARGED.** |
| `U-MOUNTGUARD` | `SCH-1` invariant half | cross-envelope mount cardinality/identity guard (this repo's own consumer) | **BLOCKED** |
| `U-GSESSION` | `SCH-2` | the **node-local interaction session** — local handlers on the element that receives the interaction, injected event source, one commit per gesture; document-delegated `pointerdown` + per-event `closest` + capture-at-`pointerdown` are **REJECTED** (capture *after* establishment, per-control opt-in, is permitted) | **BLOCKED** |
| `U-MENULIB` | `SCH-5` | consumer-agnostic menu catalog builder + injected picker seam (the OS-integration item) | **BLOCKED** |
| `U-PROJ` | `SCH-8` projection half | pure projection + **total** applier over an injected write sink | **BLOCKED** |
| `U-LISTHOST` | `SCH-11` | owned-node list host (own-node ownership + order-as-projection; not a "tab strip") | **BLOCKED** |
| `U-SLOTHOST` | `SCH-9` **host half** (A-d7) | slot **host** only: opaque keys → containers of caller-created nodes; own-node ownership; foreign siblings survive; unknown key ⇒ typed refusal; **NO `publish`** | **BLOCKED** |
| `U-OVERLAY` | `SCH-12` | overlay state machine + inert-background **declaration** + re-parent contract; no event wiring inside the mechanism | **BLOCKED** |
| `U-ZONES` | `SCH-4` (**A-d4**) | pure tracks/zones: `TrackSpec` all caller-supplied, `isEmpty`/`trackFor`, **the literal `'0px'` is NOT built in**, non-finite/negative ⇒ the empty token | **BLOCKED** |
| `U-CENSUS` | `SCH-8` **census half** (**A-d4 — its refile is WITHDRAWN**) | `computeTrackVars(...)` delegating token formatting to `U-ZONES`; `revealed` a consumer decision, never a default; key set exactly `zones`; **the census object is never mutated** | **BLOCKED** |
| `U-GUTTER` | `SCH-6` (**A-d4**) | resize controller **driven by the adopted session** (no second gesture authority) + a pure `clampToBounds`; one commit per gesture; cancel ⇒ zero commits; reset ⇒ one commit of the **supplied** default | **BLOCKED** |
| `U-RELOCATE` | `SCH-7` (**A-d4**) | relocate session with an **injected** resolve policy; **reveal written EXACTLY ONCE per gesture at gesture end** (a deliberate strengthening) | **BLOCKED** |
| `U-CONTAINER` | `SCH-10` (**A-d4**) | `tokensFor`/`orientationFor` with the mirror-class taxonomy **caller-supplied** + **ONE** shipped `contain` declaration whose class name is caller-supplied | **BLOCKED** |
| `U-THEME` | `SCH-3` (**A-d6**) | the pure total `resolveTheme(setting, env)` + a **declaration-only** applier with a **caller-supplied** attribute name; no token values, no `data-theme` literal, no `matchMedia`, no store | **BLOCKED** |
| `U-THEME-CONTROL` | `SCH-3` (**A-d6**) | an **AUTHORED** provident appearance control in this repo's own demo envelope — visible/drivable through the **existing** tools, **no new tool and no new group** | **BLOCKED** |
| `U-FOCUS-MODEL` | `SCH-13` (**A-d5**) | the pure ordered-entry transition module over opaque ids/targets with injected `refuse`/`onChange`/`persist`; no vocabulary, no store, no DOM | **BLOCKED** |
| `U-FOCUS-TOOL` | `SCH-13` (**A-d5**) | the new **`provident.focus`** MCP tool: group `dispatch`, **not mutating**, emits no notification, persists nothing, cannot force a re-render | **BLOCKED** |

**Declined / part-declined (the fork keeps these — file them in YOUR namespace):**
`SCH-1`'s **region-host half** (`ShellRegionName`/`ShellRegionSpec`/`ShellRegions` — **A-d7
does NOT restore it**; its blockers are prohibitions #1 and #6, and **prohibition 5 was never
its blocker**) · `SCH-9`'s **publisher/carrier half** (it authors content) · `SCH-12`'s
**focus-trap half** plus the `inert`/a11y **documentation** half (the package-doc stream).

**Everything else moved to THIS repo** — under A-d4 (`SCH-4`, `SCH-6`, `SCH-7`, `SCH-10`),
A-d5 (`SCH-13`), A-d6 (`SCH-3`), A-d7 (`SCH-9`'s host half) and the earlier round (`SCH-2`,
`SCH-5`, `SCH-8` **in both halves now**, `SCH-11`, `SCH-12`'s mechanism).

**PROHIBITION-5 CLARIFICATION — read this so you do not misread the handoff (`H-r14`).**
This repo's (C)-admission rule's **prohibition 5** says a **(C)-admissible unit's own
contract may not itself require a new MCP surface**. **It was an ADOPTION BOUND ON UNITS —
it was never a ban on this repo adding MCP tools.** This repo has added tools repeatedly and
legitimately (`provident.journal`, the `mcp://provident/*` resources, `code.loadBatch`, the
`module.*` trio), and **A-d5 authorised `provident.focus` as its own unit**, which is a
**different gate** (the six-site wiring + a `docs/specs/mcp-endpoint.md` amendment). **Do not
read this record as "this repo refuses to add tools"** — and note that **prohibition 5 is
still binding for every other (C) unit** (a mechanism whose contract *requires* a new tool is
still not adoptable as a unit).

**If you are the fork that filed the package:** this repo's amended dispositions mean **most
of your requests now have THIS repo as owner** (see the table), **`SCH-12`'s package-stream
refile is WITHDRAWN** (the `inert` capability exists as of 0.4.1/0.5.1 — it was a version
fact, not a package gap), and **the A-d5…A-d8 architecture pass's re-decline of `SCH-4`/
`SCH-6`/`SCH-7`/`SCH-10` is ADJUDICATED AWAY** — it read this repo's **landed pre-A-d4 rows**
and the A-d4 amendment had never been landed; **A-d4 is the architect's ruling and is
binding.** Withdraw those rows on your side; the `H-r1`/`H-r2` correction package is
**your** pass — this repo writes no file under your tree. **Also note the interaction rule
above is binding on your re-files:** `SCH-2`/`SCH-6`/`SCH-7`'s "no capture" clauses become
**"no capture before the interaction is established"** (capture *after* establishment,
per-control opt-in, is the honest mechanism and is permitted) — and **`SCH-7`'s reveal
timing is a NEW hard row**: reveal is written **exactly once per gesture, at gesture end**, so
**a per-crossing implementation will fail it.**

## 5. The archival-loop convention (was only in gitignored `archive/README.md`)

`archive/` is **gitignored and does not ship**. It is a write-only dump for
retired review records; nothing there is a source of truth. The convention:

1. After every change, merge new info into the **core docs** (`mcp-endpoint.md`,
   `defects.md`, `decisions.md`, `pending.md`, `next-steps.md`).
2. Move obsolete docs / stale test data / findings / review records to
   `archive/<topic>/<date>-<name>.md` (gitignored).
3. Repoint/remove every reference to an archived file.

**For fork agents:** never cite `archive/` (it won't be there). Cite the active
trackers. If you see a `*greens.md` doc referencing a review's location, it's
provenance only — the contract is in `docs/specs/`.

## 6. The process (brief)

- **TDD always**: a new method/tool is red → green → adversarial → greens →
  doc-review. See `docs/skills/process-guardrails.md` for the full gates.
- **Defect-handoff**: a `provident-ssr` defect → `docs/defects.md` +
  `docs/HANDOFF.md` (issue to the upstream), never patched here.
- **Three-agent gate**: a contract change goes through validity → critique →
  change-analysis before code (records in `docs/specs/`).
- **Trio to verify**: `npm test` (vitest) + `npm run typecheck` + `npm run build`.
  **The trio is not the whole verification set** — three further legs sit
  **OUTSIDE** it (`AGENTS.md` item 4 names only the trio):

  | Leg | Command | What it is | Prerequisite |
  | --- | --- | --- | --- |
  | battery | `npm run battery` | the E2E battery against a real Runtime **under the DOM shim** in a spawned host — **184 checks / 0 failures today** (the leg's own runner line; **corrected 2026-09-27** from the stale `93-check` label, which was the 2026-08-23 B/C/D-era count — `docs/specs/battery-units-greens.md` keeps that as its historical record) | none |
  | divergence | `npm run divergence` | the **identity** leg: shim ≡ real Electron on the pinned structural properties (**N=9**) | a **DISPLAY** (`--ozone-platform=x11` + `DISPLAY`; **not** headless — see `docs/specs/ci-divergence-leg.md`'s corrected two-part truth) |
| **`ui`** | `npm run ui` — **LANDED (2026-09-27) · `DONE` (2026-09-27, the supervisor's DONE pass — the `LANDED-GREEN-BUT-NOT-DONE` form this cell carried is kept as provenance and is SPENT: the unit `U-REALDOM-BOOT` is COMPLETE on every leg its spec declares; see §4's `U-REALDOM-BOOT` row and `docs/next-steps.md`'s `## DONE — U-REALDOM-BOOT` record)** | the **measurement** leg (unit `U-REALDOM-BOOT`, architect ruling A-d8): boots the real Electron renderer under a controlled temp profile, drives it over stdio MCP, and obtains **ONE** real measurement. **Measured: exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`** *(the older `5/5 rows green` form is STALE — five = the declared row identities `R0`–`R4`, eleven = the `row(...)` assertion call sites)*, the ONE measurement `427x22` at `fontSize="16px"` — **⟶ AND THAT GREEN IS NOW CURRENT, NOT PRE-REGRESSION (2026-09-27, FOURTH pass): `npm run ui` RAN post-repair with `retries=0`, and the retry policy (`docs/specs/ci-ui-leg.md` §3.7 `RT-1`–`RT-9`) is live-drivable **⟶ RETRY STATUS UPDATED 2026-09-27 (FIFTH pass — the `F-2` RCA + fix; fork-relevant, because a fork that lowers `PROVIDENT_UI_BOOT_TIMEOUT_MS` will hit it): the retry policy is live-verified (a real retry, a real exhaustion at exit `1`, the labelled retried green, a red precondition at exit `2`, a DISPLAY refusal at exit `3` — all driven live), AND the timeout class's retryability had a RACE that is now FIXED.** As filed, the classification depended on **when the handshake flag was sampled**: retryable at `30`/`100 ms`, **non-retryable at `200`/`260 ms`** (attempt 1 aborted, attempts 2–4 unrecorded, no `RT-7` marker), green at `300`/`400 ms` — a boundary moving the **wrong way** as the budget grew. The fix **snapshots the handshake state at the instant the raced verdict settles** (`handshakeResolvedAtSettle`, `scripts/electron-ui.mjs:641`), so **both halves of the retryable signature describe the timer instant**; the boundary is now **MONOTONIC** (`120`/`200`/`260 ms` → `RT-7 EXHAUSTED: 4 of 4 (3 retries)`, every attempt recorded in order, exit `1`; `300 ms` → accepted, `11/11`, `427x22`). **No contract clause changed**; the rule is recorded at `docs/decisions.md` `UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE` and the defect is CLOSED host-side at `docs/defects.md` `UI-LEG-TIMEOUT-CLASS-RACE`. **A fork should apply the same rule to ANY conjunctive eligibility predicate: never mix a LIVE flag with a RECORDED fact.**; the "cannot run / host's Electron runtime is non-functional (ENVIRONMENT, A/B-proven not this repo's diff)" clause this cell carried was a MISATTRIBUTION of a corrupted in-repo npm shim, REPAIRED — see the fork-relevant environment note after this table** | **a DISPLAY**, a **working Electron runtime** — **⟶ MET (2026-09-27, FOURTH pass): the runtime is functional again and this leg's live green is CURRENT, not pre-regression** *(the blocker was a **corrupted npm shim inside this repo's `node_modules`** — `node_modules/electron/cli.js`, the file `node_modules/.bin/electron` symlinks to, replaced by a shell script that re-execs itself, so every boot spun at ~99 % CPU printing nothing — **repaired**; the "ENVIRONMENT regression" attribution was **WRONG**: `strace -f` showed an unbroken `openat(… node_modules/.bin/electron)` cycle with **0 `EPERM`/`EACCES`** markers, and a post-repair boot probe exits `0` in `176 ms` printing `BOOT-OK 44.4.5`. Post-repair: `npm run divergence` → `R13 RESULT: 9 checks, 0 failures`; `npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`, `427x22` at `fontSize="16px"`, scratch cleanup verified)* — and `npm run divergence` must be **green for the same built tree** or the leg reports **PRECONDITION-FAILED** (a `ui` green is **not** stronger than a `divergence` red). **It can legitimately report PRECONDITION-FAILED here** because `RK-14`'s flake class is confirmed real (`/dev/shm` writes forbidden ⇒ intermittent renderer `SIGTRAP` at bootstrap) |

  **⟶ FORK-RELEVANT ENVIRONMENT NOTE (2026-09-27, FOURTH pass) — the `ui`/`divergence` legs depend on `node_modules/electron/cli.js` being intact, and a corrupted copy fails SILENTLY:** that file (`node_modules/.bin/electron` symlinks to it, and every Electron spawn here goes through it) was found **replaced by a shell script that re-execs itself**, which made every boot **spin at ~99 % CPU printing nothing** — **indistinguishable from a wedged host** — and cost multiple passes of misattribution to "the environment". **A fork should sanity-check its entry point before blaming the host:** `file -L node_modules/electron/cli.js` must report a **Node** script (not a shell script); a corrupted one is **written by an install/reinstall** (the corrupt file's mtime was `2026-09-24 14:01`, and only `electron/cli.js` was affected — `node_modules/.bin/{esbuild,tsc,vitest}` were intact). **The one-line precondition check is RECOMMENDED, not implemented** (`docs/pending.md` §E; `docs/decisions.md` `NPM-SHIM-INTEGRITY`; `docs/defects.md` `NPM-SHIM-INTEGRITY`, CLOSED host-side). **⟶ SIXTH PASS (2026-09-27, the `F-1` RCA + fix) — WHAT A FORK MUST CHANGE, because this is the ONE note here that a fork's own harness has to act on:** the spawn entry point matters twice over, and the second half is the surprising one. **A harness must NOT spawn the CLI WRAPPER** (`node_modules/.bin/electron` → `electron/cli.js`) **when its child is the real application.** The helper's `ChildProcess` handle is then the **wrapper, not the app**: killing it **orphans the real app and its helpers**, and — in this repo — the orphan **re-created the scratch profile AFTER the helper's delete-and-verify sweep had reported success**, so the leg reported **`leftover profiles: NONE` while the directory survived** (**4 of 4** green runs; **31** roots in one session; the leftovers held **only Chromium artifacts and NO security store**, which is what made it invisible). **This repo now resolves the BINARY** (`node_modules/electron/dist/electron`, falling back through the package's **`path.txt`** contract to the bare package entry) under a **no-fallback-to-the-wrapper rule that throws a named error** — **one process, one handle, no orphan**. **A fork should do the same**, and should register any **exit/signal cleanup hook at the moment the resource is created** — this repo's hook had sat **below** a validation gate that could call `process.exit`, so the earliest exit path ran **before the hook existed** and leaked an **empty** scratch root (**6 per `npm test`**, exactly the six malformed knob values the unit's own row spawns). **Both rules are ACTIVE here** (`docs/decisions.md` `UI-LEG-SPAWN-THE-BINARY-NOT-THE-WRAPPER` + `UI-LEG-CLEANUP-HOOK-AT-CREATION`), the host row is CLOSED (`docs/defects.md` `UI-LEG-LEFTOVER-PROFILES`), **no `docs/HANDOFF.md` round is owed**, and **the fork-relevant lesson is the general one: a cleanup that verifies its own delete is NOT a clean end state — only a POST-EXIT check (immediately and after a settle window) can tell the two apart.**

  **⟶ THE `ui` LEG'S LEFTOVER SCRATCH PROFILES ARE FIXED (2026-09-27, SIXTH pass — fork-relevant, because a fork that spawns an app through a CLI wrapper inherits the defect):** as filed, **every green run left a scratch root holding BOTH attempt profiles on disk while the leg reported `leftover profiles: NONE`** (**4 of 4** green runs; **31** roots in one session). The cause was the **spawn entry point**: the helper spawned **`node_modules/.bin/electron`**, a **symlink to `electron/cli.js` — a Node WRAPPER whose child is the REAL Electron binary** — so the `ChildProcess` handle the helper held was the **wrapper, not the app**: killing it **orphaned the real main process and its Chromium helpers**, which **re-created the profile directory after `cleanupProfiles()` had unlinked it AND verified the unlink**. **The tell that named the mechanism:** the leftovers held **only Chromium artifacts and NO security store** — the harness's own seeded store WAS deleted. A **second, deterministic** half: the **exit-cleanup hook sat BELOW a validation gate** that could call `process.exit`, so the earliest exit path ran **before the hook existed** and leaked an **empty** scratch root (**6 per `npm test`**). **The fix (both rules are now ACTIVE in `docs/decisions.md` — `UI-LEG-SPAWN-THE-BINARY-NOT-THE-WRAPPER` + `UI-LEG-CLEANUP-HOOK-AT-CREATION`):** resolve and spawn **the BINARY** (`node_modules/electron/dist/electron`, falling back through the package's **`path.txt`** contract to the bare package entry) under a **no-fallback-to-the-wrapper rule that throws a named error** — **one process, one handle, no orphan**; and register the cleanup hook **at the moment the resource is created**, **idempotently**. **Verified: ZERO roots on every exit path (green · malformed config · timeout-class exhaustion · `npm run ui`), checked immediately and after an 8 s settle, with 0 surviving `electron` processes** — and the leg's report now **matches the disk**. Filed CLOSED host-side at `docs/defects.md` `UI-LEG-LEFTOVER-PROFILES` (**no `docs/HANDOFF.md` round owed**). **THE GENERAL LESSON A FORK SHOULD CARRY:** **a cleanup that verifies its own delete is NOT a clean end state** — the sweep was accurate when it ran and the orphan re-created the directory afterwards; only a **post-exit** check (immediately **and** after a settle window) can tell the two apart.

  **⟶ THE `ui` LEG'S TIMEOUT-CLASS RETRYABILITY IS FIXED (2026-09-27, FIFTH pass — fork-relevant if a fork lowers `PROVIDENT_UI_BOOT_TIMEOUT_MS`):** as filed, the retry classification was **race-dependent** — retryable at `30`/`100 ms`, **non-retryable at `200`/`260 ms`** (attempt 1 aborted, attempts 2–4 unrecorded, no `RT-7` marker), green at `300`/`400 ms`. The cause: the leg handed the predicate the **LIVE** `resolved` flag on a line running **after** the termination-grace `await`, so the handshake half of the signature was sampled **~2 s after** the recorded `timedOut` half — **two halves, two different instants**. The fix (`scripts/electron-ui.mjs`) **snapshots the handshake state at the instant the raced verdict settles** (`handshakeResolvedAtSettle`) and hands **that** to the predicate; the boundary is now **MONOTONIC** (`120`/`200`/`260 ms` → `RT-7 EXHAUSTED: 4 of 4 (3 retries)`, every attempt recorded in order, exit `1`; `300 ms` → accepted, `11/11`, `427x22`). **No contract clause changed** — the leg was corrected **to** the clause. **The general rule a fork should carry (`docs/decisions.md` `UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE`): a retryability/eligibility predicate must be handed values describing ONE INSTANT — never a LIVE flag mixed with a RECORDED fact.** Filed CLOSED host-side at `docs/defects.md` `UI-LEG-TIMEOUT-CLASS-RACE` (no `docs/HANDOFF.md` round owed).

  **⟶ THE `ui` LEG HAS LANDED (2026-09-27) AND IS `DONE` (2026-09-27, the supervisor's DONE pass — the `LANDED-GREEN-BUT-NOT-DONE` form this note carried is kept as provenance and is SPENT)** *(the spec `docs/specs/ci-ui-leg.md` is FILED and the `package.json` `"ui"` script exists; **see §4's `ui`-leg row and `docs/next-steps.md`'s `## DONE — U-REALDOM-BOOT` record**)*: **the honest-limits list below BINDS unchanged** — it is the leg's own `R4` row, printed by the leg. **Its green proves one probe in one real boot**; **never** the packaged app · **never** app-green from
  node-green · **never** an MCP-contract property obtained outside the MCP surface · **never**
  that `provident.dispatch` is a real gesture · **never** that `get_rendered_html` observes
  layout · **never** that the shim is now faithful. **The shim is DEMOTED TO PRE-FILTER, not
  retired**, and the battery's migration onto the real renderer is **out of scope**.

## 7. Where to start

1. `docs/specs/mcp-endpoint.md` — the MCP contract (the core).
2. `docs/specs/module-feature-list.md` — the extension system (the newest,
   self-contained).
3. `docs/decisions.md` — the decision record.
4. `src/` — the implementation (main = MCP + gate + store; renderer = Runtime +
   router + panes; shared = types).
5. `tests/` — the suites; `module-*.test.ts` show the module system's TDD.
