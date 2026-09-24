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
  > 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**)*, typecheck clean,
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
`U-REALDOM-BOOT` landing pass**, which added that unit's two `ui`-leg test files / 27 rows.)* See §2's
version note and `docs/specs/engine-pin-live-status.md`; the two DONE records are `docs/next-steps.md`'s
`U-ENGINE-PIN` and `U-ENGINE-DRIFT` DONE records. *(The pre-wave-B reading — "1 DONE · 1 unit fully
green" — is superseded.)*

| Unit | Derives from | What it is | Status |
| --- | --- | --- | --- |
| `U-ENGINE-PIN` | A-d2 | `provident-ssr` `^0.2.1` → `^0.5.1` (**install DONE**) + the scoped shim completion (`removeAttribute`, with the `id`/`value` slot special cases) + the shape-only prop-mutation guard across both call sites (`Runtime.applyCommand`, the pane channel) + the pane seam `applyPaneMutation` | **`DONE` (2026-09-27) — COMPLETE on every leg it declares:** `npm test` 55 files / 789 passed / 2 skipped / 0 failed *(DONE-pass count — **⟶ 56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass** — **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**)* · typecheck clean · build clean (5 bundles) · battery 184/0 · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`** (post-change tree; the harness spawn fix `--disable-dev-shm-usage` + a fresh scratch `--user-data-dir` **landed** and is **inherited** by `U-DIVERGENCE-EXT`). Blind greens **104 / 96 PASS / 0 FAIL / 5 NBR**; doc review RUN. **One live finding stood OUTSIDE this unit's scope and is SINCE FIXED + LIVE-VERIFIED (2026-09-27)** — `LIVE-OP-REJECT` (the assembled app's `provident.op` over the IPC hop; root cause = **this repo's** renderer IPC unwrap — the **pre-fix** `src/renderer/renderer.ts:38`, landed at **`:43`**, untouched by the unit; **HOST**-owned, **no** upstream handoff owed; pinned by `tests/op-command-unwrap.test.ts` `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`) — `docs/defects.md` / `docs/specs/engine-pin-live-status.md` §5. The leg asserts **no** attribute row (`H-r10` still owed) and is **silent** on that finding |
| `U-ENGINE-DRIFT` | A-d2 | the behavioural reconciliation / measurement pass at the new pin (may land zero code) | **`DONE` (2026-09-27) — COMPLETE on every leg it declares, and it landed as its spec's ruling 3 authorises: a measurement record with ZERO production code and ZERO new tests.** The record `docs/specs/engine-drift-measurements.md` is the unit's only authored artifact — **single reconciled ledger**, `N = 57` rows (`M-1`…`M-57`) = 47 `CONSISTENT` + **2 `DRIFTED`** (`M-14`, `M-31`) + 7 `UNMEASURABLE` (`M-25`, `M-38`, `M-46`, `M-49`, `M-50`, `M-51`, **`M-57`** [the `M-30` split's IPC hop]) + 1 `INVALID` (`M-52`, kept in place, replaced by `M-56`); nine columns per row. The red is the existing suite under the new pin, **RUN and REPORTED as empty — `56 files / 795 passed / 2 skipped / 0 failed`** *(that run's count — **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**)*, 0 failures attributable to the pin move; the other four legs are green (typecheck clean · build clean, 5 bundles · battery **184/0** · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`**, `N = 9` untouched). **Both `DRIFTED` rows' tracker halves landed** (`RAW-STRING-CENSUS-RETIRED`, `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`); the adversarial verdict on the record **as filed** was `NOT DONE-ELIGIBLE` on **two blocking findings**, **both corrected and then re-verified**; the blind re-run (`docs/specs/engine-drift-greens.md`) was **51 scenarios / 42 PASS / 3 FAIL / 6 NOT-BLIND-RUNNABLE**, all three FAILs reconciled in the record with **no verdict moved**. Its DONE record is `docs/next-steps.md`'s `U-ENGINE-DRIFT` DONE record. **Do not quote the pre-correction ledgers (`45 + 2 + 8 + 1 = 56` or `44 + 2 + 9 + 1 = 56`); both are superseded.** |
| `U-REALDOM-BOOT` | A-d8 | the **`npm run ui`** leg: a real Electron renderer under a controlled temp profile, driven over stdio MCP, **ONE** real measurement; **needs a DISPLAY** | **⟶ `LANDED-GREEN-BUT-NOT-DONE` (2026-09-27; the `BLOCKED` status this cell carried, and the "then the `U-ENGINE-PIN` DONE row" blocker, are both SPENT).** **LANDED:** `scripts/electron-ui.mjs` (the leg) + **`scripts/electron-spawn.mjs`** (the shared Electron-spawn helper — the divergence leg calls it, arg vector/env/stdio/profiles unchanged) + the **one additive seam** in `src/main/main.ts` (`--provident-user-data=<path>` argv scan + `app.setPath('userData', path)` above the store reads; **absent ⇒ no call, today's behaviour**) + **one** additive `package.json` script key (`"ui"` — the **TWELFTH** key; the pre-unit block held eleven, per the SpecWriter's `M-2` count re-pin). **MEASURED:** red **20 failed / 7 passed** (13 rows: no leg file · 4: no helper · 3: no seam) → **27/27 green**; **live `npm run ui` → exit 0, `UI RESULT: 0 failures (5/5 rows green)`**, the ONE measurement **`427x22`** at `fontSize="16px"` read back over `provident.get_rendered_html`; `R0` isolation across two scratch boots, `R1` the real-renderer typed marker (`HTMLDivElement`/`CSSStyleDeclaration`) with the shim side **`UNSUPPORTED`** (never `0`); `npm test` **58 files / 822 passed / 2 skipped / 0 failed** · typecheck clean · build clean · battery **184/0** · **`npm run divergence` `R13 RESULT: 9 checks, 0 failures` — UNCHANGED**. **STILL OWED (no DONE row exists):** the per-unit **adversarial** pass, the **blind-greens** gate, the per-unit **documentation review**, the **`R1`-marker + scripts-count spec re-pin** (the wave-C SpecWriter's), and the **architect's retry decision** — `RK-14`'s flake class is **CONFIRMED REAL here** (`/dev/shm` writes forbidden ⇒ a renderer intermittently dies `SIGTRAP` at bootstrap, ≈1-in-3, so the leg can legitimately exit **2 PRECONDITION-FAILED**; the divergence leg is flaky identically) |
| `U-DIVERGENCE-EXT` | A-d8 / `H-r10` | the scenario-envelope channel + attribute-presence extractor for the **existing** `divergence` leg, **N=9 unchanged**; **INHERITS the landed spawn fix** (it no longer owes the flags) | **BLOCKED** — then `U-REALDOM-BOOT`; its former "unblocks `U-ENGINE-PIN`'s open divergence leg" role is **DISCHARGED** (that leg is green — the supervisor landed the fix) |
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
  | **`ui`** | `npm run ui` — **LANDED (2026-09-27), `LANDED-GREEN-BUT-NOT-DONE`** | the **measurement** leg (unit `U-REALDOM-BOOT`, architect ruling A-d8): boots the real Electron renderer under a controlled temp profile, drives it over stdio MCP, and obtains **ONE** real measurement. **Measured: exit 0, `UI RESULT: 0 failures (5/5 rows green)`, the ONE measurement `427x22` at `fontSize="16px"`** | **a DISPLAY**, and `npm run divergence` must be **green for the same built tree** or the leg reports **PRECONDITION-FAILED** (a `ui` green is **not** stronger than a `divergence` red). **It can legitimately report PRECONDITION-FAILED here** because `RK-14`'s flake class is confirmed real (`/dev/shm` writes forbidden ⇒ intermittent renderer `SIGTRAP` at bootstrap) |

  **⟶ THE `ui` LEG HAS LANDED (2026-09-27) — this paragraph's "does not exist yet" premise is SPENT** *(the spec `docs/specs/ci-ui-leg.md` is FILED and the `package.json` `"ui"` script exists; the unit is **`LANDED-GREEN-BUT-NOT-DONE`** — see §4's `ui`-leg row and `docs/next-steps.md`'s `WAVE-C CHECKPOINT — U-REALDOM-BOOT`)*: **the honest-limits list below BINDS unchanged** — it is the leg's own `R4` row, printed by the leg. **Its green proves one probe in one real boot**; **never** the packaged app · **never** app-green from
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
