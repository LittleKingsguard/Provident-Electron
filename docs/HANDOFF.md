# Provident-Electron → Preempt-Providence Issue Handoff

This is the issue-handoff document (AGENTS.md item 7): the finished catalogue
of requirement gaps / defects discovered while consuming `provident-ssr` as an
Electron/MCP host. Each row is an issue candidate for the ORIGINAL project
(`Preempt-Providence`, adjacent folder). This repo does NOT fix the package —
the fix shapes below are upstream-owned.

Full catalogue: `docs/defects.md` (this file is the handoff assembly; defects.md
is the living tracker). Where relevant, "consumer workaround" = what
Provident-Electron does today so the gap is not blocking.

---

## Round 1 — REQ-GAP-1..7 (filed 2026-08-21): RESOLVED by provident-ssr 0.1.1

The upstream ran a three-agent change-analysis (`docs/specs/handoffs-review.md`)
and landed the accepted shapes in **provident-ssr 0.1.1**. Disposition per
issue:

| Issue | 0.1.1 landing | This repo's adoption |
| --- | --- | --- |
| REQ-GAP-1 (inline handlers default modern) | **PASS-AS-DOCUMENTED** — FORMAT MARKER + ssr-synthetic-event.md §2.3 sentence | Demo bodies stay modern `(ctx, value)` |
| REQ-GAP-2 (css.id not a runtime lookup key) | **PASS-WITH-RESHAPE** — host-side index documented (css.id is a set; exclude destroyed/unplaced/prototype); NO engine surface | Runtime target resolver maps css.id → nodeId |
| REQ-GAP-3 (id collision + auto-mint) | **PASS-WITH-RESHAPE** — DEFECT #28 (mint-excluded from reverse), precedence doc (`css.id > props.id > mint`), opt-in `renderOptions.nodeIdAttribute` → `data-node-id` | **ADOPTED** — `emitElements(…, { nodeIdAttribute: true })`; every element carries `data-node-id` |
| REQ-GAP-4 (dispatch returns no dirtied / no idempotency) | **PASS** — `Supervisor.dispatchAndReport` ({results, dirtied}, engine-derived) + opt-in bounded `requestId` dedup + public `flush()` | **ADOPTED** — Runtime uses `dispatchAndReport`; host dedup removed |
| REQ-GAP-5 (re-emit loop boilerplate) | **PASS** — `renderProducingProcess` exported + `flush()` | Partial — see REQ-GAP-8 |
| REQ-GAP-6 (DomAdapter needs a DOM) | **CLOSED-ALREADY-ADDRESSED** | Renderer-hosts the graph; IPC bridge |
| REQ-GAP-7 (CSP silently skips string bodies) | **PASS-WITH-RESHAPE** — distinct `handler-body-eval-blocked` warn code + docs | CSP `'unsafe-eval'` stays (environment constraint); the failure is now detectable |

## Round 2 — REQ-GAP-8 (filed 2026-08-21): RESOLVED by provident-ssr 0.1.2

- **Gap**: the exported canonical re-emit loop `renderProducingProcess` could
  not thread the opt-in `nodeIdAttribute` option (the handoffs-review Opening
  A/B planned the loop absorbing the A2 option in the same pass; the 0.1.1
  loop omitted it).
- **0.1.2 landing**: `renderProducingProcess(actionable, nodeById, adapter,
  prevMap, renderOptions?)` — the optional `renderOptions` threads to
  `emitElements`; `{ nodeIdAttribute: true }` stamps `data-node-id`, default
  undefined = byte-identical render. Ownership rules unchanged.
- **This repo's adoption**: the Runtime's re-emit now calls
  `renderProducingProcess(…, { nodeIdAttribute: true })` per adapter (DOM +
  SSR, each with its own caller-owned prevMap). The explicit emit-with-options
  loop is removed. Verified live in Electron (data-node-id DOM=SSR on all 12
  elements; engine dirtied; engine dedup echo; event.value echo).

## Round 3 — no new gaps

0.1.2 closes the catalogue. No new requirement gaps discovered during the
0.1.2 adoption pass. The sole remaining work is consumer-side debugging
niceties (next-steps items: surface `TranslatedTree.warnings` through MCP,
renderer debug panel).

> **ANNOTATION (2026-09-27, the engine-pin amendment) — version-stale framing,
> not a claim.** "0.1.2 closes the catalogue" was true of the catalogue **as it
> stood on the 0.1.2 adoption pass**; Rounds 5–9 filed further items afterwards.
> **⟶ CORRECTED (2026-09-27, the wave-B DONE pass): the clause "and Round 9 remains **open**"
> is STALE — Round 9 was measured at the installed `provident-ssr@0.5.1` and is CLOSED**
> (destroy-undo reports `no-op`, the claimed `applied` fall-through is unreachable —
> `docs/specs/engine-drift-measurements.md` `M-31`; `docs/decisions.md`
> `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`; the restatement is the annotation under Round 9
> below). **`docs/defects.md` therefore holds NO open package row**, and **no `provident-ssr`
> round is open.** The sentence is left as the historical record of
> that pass and must **not** be read as "the catalogue is closed today" — it must also not be
> read as "Round 9 is open today".

## Round 4 — REQ-GAP-9..12 (filed 2026-08-21, from the E2E-battery plan) — PUBLISHED in provident-ssr 0.1.3

The upstream ran its own three-agent gate on these four
(`../Preempt-Providence/docs/specs/handoffs-review-2.md`, user rulings
2026-08-21/22) — all **APPROVED-WITH-RESHAPE** and **PUBLISHED in
provident-ssr@0.1.3** (verified in the installed dist: `createLinkHub`,
`LinkConfigNameHub` type, the self-evicting sweep `evictDestroyedNode`/
`destroyedRefs`, the destroy-cascade `markCascadeExplicit`). The battery's
workarounds (vendored hub, accepted registry growth, per-child teardown) are
now droppable in favor of the published surfaces.

| Issue | Gap (as filed) | Upstream disposition (published 0.1.3) | This repo's response |
| --- | --- | --- | --- |
| **REQ-GAP-9** | No public `LinkConfigNameHub` factory; `loadState`→graph construction is test-only | `createLinkHub()` + type export + the `node.ts:463` seed-hub threading + the corrected 4-step recipe (`loadState` → `new Node(d,hub)` template-first → `reconcileParentTargets` → `registerNode` per node, ONE hub everywhere). Caveat (user ruling): component-bearing docs → `translateLegacy(doc, {hub})`; `serializeSlice`→`loadState` is snapshot/restore-only. | Battery A1 uses the exported `createLinkHub()` (no vendored hub). Component-bearing first-class loads use `translateLegacy(doc,{hub})` regardless. |
| **REQ-GAP-10** | No sanctioned handler-body-by-name injection | Doc-only seam letter: `addLayer` sanctioned for PRE-MOUNT prototype setup (fork-stress pattern); in-tree live injection via journaled `state-slice handlers`/`layer-apply`; prefix rules; hooks delimiter; D16 precedence + clone inheritance. `registerHandlerBody` REJECTED. | Battery's pre-mount prototype injection IS the sanctioned seam; bodies imported with provenance comment + guard test. |
| **REQ-GAP-11** | No `Supervisor` reset; destroyed nodes accumulate | Self-evicting sweep (`finalizeDestroyed` evicts from registered/byId/content/minted + supervisor nodes; `destroyedRefs` tombstone keeps `getNode`). `reset()`/`prune()`/`unregisterNode` REJECTED. | Battery asserts `inTree`/mount only (never `registered` equality), fresh requestIds per scenario; the sweep means the registry no longer grows across scenarios. |
| **REQ-GAP-12** | No single clear-children op | Destroy-cascade trigger flag (explicit children only, skips placements + `'component'`-token prototypes, runtimeMinted → retention). `clear-children` op REJECTED. | Battery teardown = per-child destroy loop (the pinned shape for fork-stress even post-cascade: clones are runtimeMinted, prototypes skipped); cascade helps plain family trees. |

## Handoff mechanics

- The upstream project receives these as issues (symptom / reproduction / root
  cause / proposed fix shape above). File them against
  `github.com/LittleKingsguard/Preempt-Providence` (or the project's chosen
  tracker). Round 1 issues are closed by 0.1.1. **CORRECTED 2026-09-27:** the
  clause that stood here — *"REQ-GAP-8 is the open follow-up"* — is **STALE**:
  REQ-GAP-8 was resolved in **0.1.2** (Round 2 above) — the stale half was written
  when the round was still open, and `docs/defects.md` now holds **no open
  package row** (the last one was CLOSED as not reproducible at `0.5.1`; see the
  Round 3 and Round 9 annotations), so **no round is open today**.
- None of these require a behavior change in THIS repo to unblock; the consumer
  workarounds are in place.
- Environment-only findings (Node 18 vs Electron 43 tooling, ESM-main CJS
  requirement, MCP SDK stateless-HTTP wiring) are NOT package defects — they are
  recorded in `docs/decisions.md` / `docs/pending.md` for this repo's own
  maintenance.

## Round 5 — DEFECT-SSR-REMOVE (filed 2026-08-23, from the adapter-parity battery) — RESOLVED in provident-ssr 0.1.4

- **Issue**: `SSRFragmentAdapter` retains removed/destroyed elements in the
  serialized fragment, diverging from `DomAdapter`.
- **Symptom / repro**: load an envelope with `keeper`/`doomed`/`nuke` (nuke =
  `{kind:'destroy'}` on `doomed`), dispatch nuke →
  `provident.get_rendered_html`. The DOM collapses to root-only; the SSR
  fragment STILL contains `doomed` AND the full prior subtree
  (`keeper`/`doomed`/`nuke`). Repro: `tests/adapter-parity-battery.test.mjs`
  S5 (spec `docs/specs/adapter-parity-battery.md`, greens
  `docs/specs/adapter-parity-greens.md`).
- **Root cause**: `SSRFragmentAdapter.removeEl` (dist/core/adapters.js:397-400)
  only did `fragments.delete(wireKey(...))` — it never detached the fragment
  from its parent's `children` array nor rematerialized the owner, so the
  removed element survived serialization. `DomAdapter.removeEl`
  (adapters.js:213-229) detaches + removes.
- **0.1.4 landing**: `SSRFragmentAdapter.removeEl` now splices the child out of
  its parent state's `children`, nulls its parent, purges it from `created`,
  and calls `rematerialize(parent)` — mirroring the DomAdapter detach
  (dist/core/adapters.js:397-424).
- **This repo's verification**: the adapter-parity battery S5 now reports "SSR
  drops the destroyed element (parity recovered)" — **73 checks, 0 failures**;
  the full trio green (433 tests, typecheck clean, build clean).

## Round 6 — DEFECT-JOURNAL-UNDO + DEFECT-JOURNAL-REPLAY-APPEND (filed 2026-08-24) — RESOLVED in provident-ssr 0.1.5

Two journal-reversibility defects surfaced by the stress battery
(`docs/specs/journal-reversibility-battery.md`, repro `tests/journal-reversibility.test.ts`):

- **DEFECT-JOURNAL-UNDO** — `Supervisor.undo()` reverted only `attach` /
  `destroy` / `rows-mint`; a `state-slice` undo was a silent no-op.
  **RESOLVED in 0.1.5**: `undo()` now inverts `state-slice` EXACTLY (the
  journaled `sliceLayers` → removeLayer per id + hooks `hookUndo` anchor
  restore + `markPass2`/consumer walk). The remaining kinds
  (`detach`/`move`/`clone-instance`/`layer-apply`/`placement-attach`/
  `rows-clear`) are **DOCUMENTED NO-OPs** in the G14 per-kind table (ops.md §6)
  with parked fact-sets — no longer silent gaps.
- **DEFECT-JOURNAL-REPLAY-APPEND** — a `state-slice append` replayed against an
  already-appended array grew it. **RESOLVED in 0.1.5**: replay() gates a
  state-slice whose recorded `sliceLayers` all exist (the OO-2 idempotency
  pattern); `redo()` is no-journal; clone-instance replay gates on `minted`
  liveness.

- **This repo's verification**: `tests/journal-reversibility.test.ts` (9 tests)
  now asserts the resolved contract — state-slice undo reverts (O1), append /
  append-first / replaceAll replay idempotent (O2/O2b/O3), detach + clone-instance
  undo as the documented no-op pins (O5/O7), destroy no-op (R11), atomicity (R5).
  **9/9 green; trio green (442 tests).**

The destroy-undo NO-OP is the documented contract pin (pending.md REQ-GAP-12 +
supervisor.js "destroy is terminal"), NOT a defect. Host-side: none — all
findings are engine-level.

## Round 7 — ISO-ADV-D (X13): `translateNodeData` `data.children` recursion drops `graphScope` (CRITICAL, filed 2026-08-25 → **RESOLVED in 0.2.0-rc.4**)

The 0.2.0-rc.3 isolation hardening (ISOLATION-A/B/C) introduced a NEW engine
defect that the host's SecurePanels adoption surfaced:

- **Symptom**: an isolated graph's CHILD nodes (e.g. the security-pane
  controls) are constructed with `graphScope = null` → they register in
  `DEFAULT_SCOPE` (the app/MCP graph's scope). This is an isolation LEAK (the
  pane nodes are resolvable/addressable from the app graph) AND it breaks the
  rc.3 cross-graph-target guard (a `state-slice` on a mis-scoped child is
  rejected `cross-graph-target`, so the pane cannot mutate its own controls).
- **Root cause**: `translate.ts:1046` — the `data.children` recursion in
  `translateNodeData` omits the trailing `graphScope` arg (the def-children
  site :835 and the template/content-children site :1117 both pass it).
- **Fix shape (upstream-owned)**: thread `graphScope` into the `data.children`
  recursion (one-line fix, matching :835/:1117).
- **This repo's verification**: `tests/secure-panels.test.ts` group-toggle +
  `tests/isolation-adversarial-e2e.test.ts` fail on rc.3 with
  `cross-graph-target`; the raw engine probe confirms `t.nodes[1].graphScope ===
  null` for an isolated graph's child. Filed upstream `docs/defects.md`
  ISO-ADV-D (X13) + the isolation-adversarial probe (the raw engine probe
  confirming `t.nodes[1].graphScope === null` for an isolated graph's child).
- **RESOLVED (0.2.0-rc.4, commit `d1691cd`)**: the upstream threaded
  `graphScope` into the `data.children` recursion (translate.ts:1046). The host
  re-verified on rc.4 — SecurePanels + isolation-e2e pass again; `tests/isolation-adv-d.test.ts`
  asserts the child carries its scope. Trio green: 453 / 2 skipped, build clean,
  battery 184/184.

## Round 8 — UNDO-REDO-REPORT (J1): `undo()`/`redo()`/`replay()` return `void` + private stacks (filed 2026-08-26 → **RESOLVED in provident-ssr 0.2.1**)

The journal-endpoint proposal's J1 reshape (the blocking derivability gap) —
filed as a handoff item per AGENTS.md item 7:

- **Issue**: `Supervisor.undo()`/`redo()`/`replay()` return `void` and the
  `undoStack`/`redoStack` are private. An MCP/Electron host cannot faithfully
  report status / dirtied / stack-top-kind after a journal op — it cannot
  distinguish "work done + which nodes touched" from "silent no-op", nor know
  the next undoable/redoable op or the condensed-base boundary.
- **Symptom / repro**: the journal-reversibility battery drives the engine
  methods directly (`tests/journal-reversibility.test.ts`); an MCP agent has no
  tool that calls them, and a host wrapper cannot report the outcome.
- **Root cause**: `undo()`/`redo()`/`replay()` return `void`; the stacks are
  private (`supervisor.ts:131-132`).
- **Fix shape (upstream-owned)**: return an `UndoRedoReport`
  (`{ status: 'applied'|'no-op'|'base-boundary', scheduledDirtied, stackTopKind?,
  redoTopKind?, baseBoundary }`) + read-only stack accessors (`undoDepth`/
  `redoDepth`/`undoTopKind`/`redoTopKind`/`undoBaseBoundary`).
- **RESOLVED (0.2.1, commit `be11b2e`)**: the upstream landed exactly this as
  `../Preempt-Providence/docs/specs/undo-redo-report.md` (DECIDED — an upstream spec
  recoverable from the upstream repo, per `docs/FORKER.md` §2). `scheduledDirtied` is the
  markPass2-SCHEDULED (pending-flush) set; a host awaiting settled states must
  `await flush()` + `takePass2States()`. The adversarial pass also fixed 13
  defects (ISO-1 cross-graph id leak in the undo consumer walk, UR-6 redo-of-
  failed-re-apply, UR-7 replay clears redoStack, MAL-1..6 malformed-op
  containment).
- **This repo's verification**: bumped to `provident-ssr@^0.2.1` (2026-08-26);
  typecheck clean. The journal-endpoint proposal's J1 reshape is unblocked — the
  host can now report `status`/`scheduledDirtied`/`stackTopKind`/`baseBoundary`
  faithfully.

> **ANNOTATION (2026-09-27, the engine-pin amendment) — this install line is
> SUPERSEDED by the `U-ENGINE-PIN` unit.** `provident-ssr` moves `^0.2.1` →
> `^0.5.1` (architect ruling A-d2; `docs/decisions.md` `ENGINE-PIN-0.5`), so
> "bumped to `@^0.2.1`" records the **2026-08-26** state only. As of this
> annotation the pin has **not** moved: `package.json:23` still reads `^0.2.1`
> and the installed copy is still `0.2.1`. The re-verification at the new pin
> belongs to `U-ENGINE-PIN`/`U-ENGINE-DRIFT` (`docs/next-steps.md` `## OPEN`).
> J1 itself stays RESOLVED — `UndoRedoReport` is present in 0.5.1 unchanged.
>
> **SUPERSEDED BY A-d4…A-d8 (2026-09-27, second annotation): the pin HAS MOVED.**
> The architect ran the install — `package.json:23` now reads **`^0.5.1`**,
> `package-lock.json` resolves **`provident-ssr-0.5.1.tgz`**, and
> `node_modules/provident-ssr/package.json` reports **`0.5.1`** (all read
> 2026-09-27). The paragraph above is retained as the intermediate state.
> **`U-ENGINE-PIN` is `DONE` (2026-09-27) — COMPLETE on every leg it declares**: the shim completion
> (`src/shared/dom-shim.ts` `removeAttribute`, incl. the `id`/`value` slot clears) and the
> shape-only host-side prop-mutation guard **landed and are green** (suite **789 passed /
> 2 skipped / 0 failed** *(the DONE-pass count — **⟶ 56 files / 795 passed / 2 skipped / 0 failed
> after the 2026-09-27 `LIVE-OP-REJECT` fix pass**)*, typecheck clean, build clean, battery **184 checks / 0 failures**),
> and its **divergence leg is GREEN on the post-change tree** (`R13 RESULT: 9 checks, 0 failures`,
> 2026-09-27, after the supervisor landed the harness spawn fix — the pre-change `9/0` run and the
> sandboxed SIGTRAP are **both superseded**; `U-DIVERGENCE-EXT` **inherits** the fix).
> **One live finding was NOT a package defect — and it is now FIXED + LIVE-VERIFIED, so this file
> still files nothing for it:** `LIVE-OP-REJECT` (the assembled app's `provident.op` refused every
> command shape over the **IPC hop**; root cause = this repo's renderer IPC unwrap — the **pre-fix**
> `src/renderer/renderer.ts:38`, landed at **`:43`**) is **HOST-owned and pre-existing**, recorded in
> `docs/defects.md` — **now in that file's `## FIXED (in this repo)` section** (fixed 2026-09-27 by
> the renderer unwrap and pinned by `tests/op-command-unwrap.test.ts`
> `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`; live status flipped `rejected` → `applied`); **no upstream issue
> is owed, and none was ever filed — this was never a `provident-ssr` defect.**
> The re-verification at the new pin still belongs to `U-ENGINE-PIN`/`U-ENGINE-DRIFT` for the
> **behavioural** half. *(**⟶ SPENT (2026-09-27, added by the `U-ENGINE-DRIFT` per-unit documentation
> review, AGENTS.md item 10d/RCA-6):** that behavioural half was **DELIVERED** — `U-ENGINE-DRIFT` is
> **`DONE` (2026-09-27)** as a measurement record with zero production code and zero new tests
> (`docs/specs/engine-drift-measurements.md`, `N = 57`; its red run and reported empty —
> `56 files / 795 passed / 2 skipped / 0 failed`, **0** failures attributable to the pin move), and
> **this file files nothing for it**: its only package-facing verdict was `M-31`, whose Round 9
> annotation above records the closure. **The citation this cell carries is also repointed:** the
> row it names no longer sits in `docs/next-steps.md`'s `## OPEN` table — it MOVED, on 2026-09-27,
> into that file's `## DONE — U-ENGINE-DRIFT` record (the `## OPEN` table keeps only a provenance
> row naming the move).)* **The same install also moved three
> devDependencies outside the unit's declared scope** (`electron` `^44.4.5`,
> `esbuild` `^0.28.2`, `vitest` `^5.0.1`) — an **unplanned scope change** now
> **ACCEPTED** by the architect (`docs/decisions.md` `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED`),
> with the Electron-major risk recorded (`docs/pending.md`).

## Round 9 — UNDO-REDO-DESTROY-STATUS: `undo()` of a `destroy` reports `applied` (filed 2026-08-26, from the journal-endpoint adversarial pass) — **⟶ CLOSED 2026-09-27: the `applied` status is NOT reproducible at `provident-ssr@0.5.1` (it reports `no-op`), delivered by the engine's resolve guard; only an optional dead-code tidy-up remains. Read the 2026-09-27 annotation under this round before quoting anything above it.**

- **Issue**: `Supervisor.undo()` of a `destroy` entry (a G14 PINNED NO-OP)
  reports `status:'applied'` with an empty `scheduledDirtied` and an unchanged
  graph — a silent false-success. An MCP host surfaces `status:'applied'`
  verbatim, so an agent cannot tell a real undo from a no-op (the
  docs/FORKER.md §4 J4 "no-op must never be silent" trap).
- **Symptom / repro**: `apply({kind:'destroy', node})` then `undo()` → the
  report is `{status:'applied', scheduledDirtied:[]}` and the render is
  unchanged. Repro: `tests/journal-endpoint.test.ts` J-adversarial destroy-undo.
- **Root cause**: `supervisor.js:1477-1479` — the destroy branch does nothing
  (no inverse, no dirtied ids) then falls through to
  `return this.report('applied', dirtied)` (:1577). The G14 pinned-no-op
  contract says destroy-undo is a no-op, but the report says `applied`.
- **Fix shape (upstream-owned)**: `undo()` should return `status:'no-op'` for a
  `destroy` entry (matching the G14 pinned-no-op contract), or expose a
  `destroyed` hint so a host can distinguish a no-op from a real inverse.
- **This repo's response**: the host surfaces the engine report verbatim (no
  host-side downgrade — the engine's `applied` is authoritative). The
  adversarial test pins the current behavior (no crash, report returned) and
  documents the package finding. Recorded in `docs/defects.md`
  UNDO-REDO-DESTROY-STATUS. **Adversarial gaps 4-10 closed 2026-08-26** — 7
  additional adversarial tests added to `tests/journal-endpoint.test.ts` (17
  total): replay-clears-redo (GAP 4), double-undo non-idempotent (GAP 5),
  dispatch-not-undoable (GAP 6), id-index-coherence (GAP 7), fail-closed gate
  (GAP 8), teardown-no-op (GAP 9), load-no-op (GAP 10). Gaps 1,2,3,11,12
  deferred (pending.md).

> **RE-VERIFICATION (2026-09-27, the engine-pin amendment's `H-r12` obligation)
> — ROUND 9 IS STILL OPEN; the 0.5.1 re-verification does NOT close it.**
> The destroy-undo branch is **still an empty no-op at 0.5.1 and still falls
> through to `report('applied', …)`**, so the false-success reporting shape
> survives the version move. **Corrected dist line numbers:** the branch sits at
> **`src/core/supervisor.js:1549-1551`** in the 0.5.1 dist, falling through to
> **`:1649`** — the `:1477-1479` / `:1577` citations above are **0.2.1-dist**
> lines and are left as the historical record of what was read at filing time
> (evidence attributed to the engine recon; **this repo ran nothing**).
> **Qualification:** the upstream repo classifies the **no-op itself as
> contract-correct** while the **`applied` status is unaddressed** — the two
> repos do not disagree about the branch, only about whether the reporting shape
> is a defect, which is why the row stays OPEN in `docs/defects.md` rather than
> being closed as a false positive. **No new round is owed.**
>
> **⟶ REPLACED (2026-09-27, the `U-ENGINE-DRIFT` measurement pass — `M-31` `DRIFTED`).**
> **The `RE-VERIFICATION` block above is SUPERSEDED ON BOTH ITS FACTS: the destroy-undo does
> NOT report `applied` at 0.5.1, and it does NOT fall through. ROUND 9 IS CLOSED, and the
> false-success is NOT REPRODUCIBLE at `provident-ssr@0.5.1` by any route.**
> **Measured at the installed `0.5.1`** (`docs/specs/engine-drift-measurements.md` `M-31`;
> `[E]/[H]`, one probe through the host `Runtime` and one through the engine's own
> `Supervisor`): `apply({kind:'destroy', node})` then `undo()` returns
> **`{"status":"no-op","scheduledDirtied":[],"baseBoundary":false}`** — an empty
> `scheduledDirtied`, an unchanged graph (the target list is identical before and after,
> `[7,7]`) — i.e. **the no-op behaviour, reported AS a no-op.**
> **Corrected root cause (a READ of the installed dist file, not a call through it):** `undo()` pops the
> destroy entry and the **resolve guard returns first** —
> `node_modules/provident-ssr/dist/core/supervisor.js:1536-1538`
> (`const resolved = !node.destroyed && this.nodes.get(node.id) === node ? node : (this.nodes.get(node.id) ?? null); if (!resolved) return this.report('no-op', new Set())`)
> — because `destroy` **deleted** the node (`:1066`, `this.nodes.delete(target.id)`). The
> `destroy` branch (`:1549-1551`) and the `return this.report('applied', dirtied)`
> fall-through (`:1649`) are therefore **UNREACHABLE for a destroy entry**: the as-filed
> mechanism (*"falls through to `report('applied', …)`"*) **cannot fire**. The adjacent
> upstream source agrees (`../Preempt-Providence/src/core/supervisor.ts:1597-1598` guard vs
> `:1608-1609` branch, `:1696` fall-through).
> **Status of the row, and what this means for the upstream:** the row's **own proposed fix
> shape** (`undo()` should return `status:'no-op'` for a `destroy` entry) **is now the
> engine's behaviour**, so the filed defect is **discharged by the engine** —
> **disposition `CLOSED as delivered-by-the-resolve-guard`** (`docs/defects.md`
> `## CLOSED (not reproducible at 0.5.1)`; `docs/decisions.md`
> `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`; the `docs/pending.md`
> `UPSTREAM-UNDO-REDO-DESTROY-STATUS` row). The upstream's own position is **not
> contradicted**: the no-op itself is contract-correct.
> **THE REMAINING ASK (the only live residue — all of it optional, none of it behavioural):**
> **(1)** a **dead-code tidy-up** upstream — the now-unreachable `destroy` branch at
> `dist/core/supervisor.js:1549-1551` and the unreachable `:1649` fall-through can be removed
> (they cannot be reached with a destroyed node; a comment there saying *"undo is a no-op for
> destroyed nodes"* describes behaviour the resolve guard performs earlier); **(2)** nothing
> else. **No new round is owed, no upstream issue is owed, no host change is owed** — and this
> repo edits no `node_modules/**` or upstream file (`AGENTS.md` goal 1 + item 7). **One in-tree
> note, routed rather than fixed:** `tests/journal-endpoint.test.ts:116-118` carries a comment
> repeating the stale `applied` claim — **it is a test file, it was NOT edited, and its
> assertions are correct** (they assert the report's *shape*, not its status value); a later
> **test-side** pass may re-word the comment, and may **not** weaken or strengthen an assertion
> to do it.

## Verified state (the workarounds ARE proven)

- Unit: `tests/runtime.test.ts` (9) + `tests/engine-surfaces.test.ts` (5) —
  green (14 total).
- MCP e2e (both transports, standalone server): `tests/mcp-stdio-e2e.test.mjs`
  — green (all four tools over stdio AND Streamable HTTP).
- Real-Electron e2e (0.1.2): MCP client → HTTP → IPC → renderer graph —
  `data-node-id` on all 12 elements (DOM = SSR, via the canonical
  `renderProducingProcess` loop), `provident.dispatch` on `inc` mutates the
  graph + re-renders both views with engine-derived `dirtied`
  (`["node-5","node-3","node-1"]`), engine `requestId` dedup echoes the first
  report (no re-fire), `event.value` echo works, node state works.
- Trio (this repo's gate): `npm test` green, `npm run typecheck` clean,
  `npm run build` clean.

> **ANNOTATION (2026-09-27, the engine-pin amendment).** The "Verified state"
> block above is a **historical** record: its 0.1.2 real-Electron census and its
> `data-node-id`/`dirtied` values are **engine-derived** and are re-baselined by
> `U-ENGINE-DRIFT` at the new pin — the amendment does **not** re-assert them,
> and no leg was run in the amendment pass. The `0.1.2` pin here is
> **(historical provenance)**. *(**⟶ DELIVERED (2026-09-27, added by the `U-ENGINE-DRIFT`
> per-unit documentation review, AGENTS.md item 10d/RCA-6):** the re-baselining named in the
> previous sentence **has since run** — `U-ENGINE-DRIFT` is `DONE` (2026-09-27) and its record
> `docs/specs/engine-drift-measurements.md` **re-measures** the engine-derived census / `dirtied` /
> journal claims rather than re-asserting them (`M-1`…`M-57`; the `0.1.2`-era values in the block
> above remain **historical provenance** and are cited on the record's own row ids there).)*
>
> **The 0.5.1 amendment files NO new round.** The two gaps the upgrade surfaced
> are **not** package defects, and stating why is the point of this annotation:
> 1. **The `removeAttribute` / boolean-attribute gap is a HOST-owned HARNESS
>    gap — and it is now CLOSED** (status corrected 2026-09-27 by the unit's
>    documentation review). The engine calls `element.removeAttribute(...)` on
>    real paths (three sites at the `0.2.1` pin:
>    `node_modules/provident-ssr/dist/core/adapters.js:120`, `:187`, `:194`; a
>    fourth + the boolean-attribute set at 0.5.1) and this repo's
>    `src/shared/dom-shim.ts` did not implement it then (`:30`,`:41`). **The shim is
>    host-owned test code**, so this was fixed here (the scoped `H-r7`
>    completion + the shape-only host-side prop-mutation guard,
>    `docs/decisions.md` `SHIM-COMPLETION-CARVE-OUT`,
>    `ENGINE-PIN-VALUE-SLOT-CLEAR`), **never** handed off — and it **landed and is
>    green** (`removeAttribute(k)`, `id` + `value` slot/store clears;
>    `hasAttribute` still deliberately NOT added). The completion is now the
>    **sole mechanism for the removal class**, so no rollback may delete it
>    (`docs/specs/engine-pin.md` §2.2 item 7, §5.4).
> 2. **The `inert` gap is CLOSED by the pin**, not created by it — `inert` is in
>    the engine's closed boolean-attribute set as of 0.4.1/0.5.1 `(engine
>    recon)`. There is nothing to request upstream; the residual `inert`/a11y
>    **documentation** half stays with the fork's `PS-1` stream
>    (`docs/pending.md`).
>
> `docs/defects.md` is the **package**-gap catalogue; host findings follow the
> `R13-HOST-FIX` precedent (`docs/decisions.md:39`) *(row cited by name: `R13-HOST-FIX`; `:39` was the pre-amendment anchor and is now `GSESSION-THE-DISPOSAL-GOVERNS-A-MID-CALL-BEGIN`; the row sits at `:58` — dated clause added 2026-09-29 by the gate-7/8 repair pass, finding `PF-NC-1`/`PF-NC-2`/`PF-NC-3`; `RCA-8(d)`: the as-filed anchor is kept visible and is not rewritten)*. **No row was added either
> place** for the 0.5.1 move — `UNDO-REDO-DESTROY-STATUS` (Round 9) was
> annotated as still open, and that is the only row this pass touched.
> **⟶ SUPERSEDED 2026-09-27 (`U-ENGINE-DRIFT` `M-31`): the sentence above is no longer
> true of the row.** `UNDO-REDO-DESTROY-STATUS` was **re-measured at the installed
> `0.5.1`** by the drift pass and is **CLOSED — the destroy-undo reports `no-op`, not
> `applied`, and the claimed fall-through is unreachable** (resolve guard,
> `dist/core/supervisor.js:1536-1538`); the row now sits in `docs/defects.md`'s
> `## CLOSED (not reproducible at 0.5.1)` section, and **this file's Round 9 annotation
> above is the upstream-facing restatement.** **`docs/defects.md` therefore currently
> holds NO open package row.** *(The 0.5.1-move paragraph is otherwise unchanged: that
> pass added no row, and neither did this one — it corrected the one row that existed.)*