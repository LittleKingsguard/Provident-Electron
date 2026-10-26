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
> `R13-HOST-FIX` precedent (`docs/decisions/ACTIVE-store-and-package-binding.md:26`) *(row cited by name: `R13-HOST-FIX`; `docs/decisions/ACTIVE-store-and-package-binding.md:26` was the pre-amendment anchor and is now `GSESSION-THE-DISPOSAL-GOVERNS-A-MID-CALL-BEGIN`; the row sits at `docs/decisions/ACTIVE-store-and-package-binding.md:45` — dated clause added 2026-09-29 by the gate-7/8 repair pass, finding `PF-NC-1`/`PF-NC-2`/`PF-NC-3`; `RCA-8(d)`: the as-filed anchor is kept visible and is not rewritten)*. **No row was added either
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
---

## Round 10 (NEW SURFACE) — `provident-storeroom`, the native Rust store — the published addon cannot construct a store

**⟶ DATED `2026-10-11` (the `U-STOREROOM-BINDING` gate-1 close; `RCA-8(d)`: this is an APPEND —
no pre-existing byte of this file was rewritten, moved or deleted).** **Rounds 1–9 above concern
`provident-ssr`. THIS ROUND CONCERNS A DIFFERENT PACKAGE** — `provident-storeroom` (npmjs.com, 0.1.1,
AGPL-3.0, published 2026-10-10) and its platform artefact — whose source repo is the ADJACENT
`../Provident-Storeroom` (the sibling project), **not** `../Preempt-Providence`. The handoff target is
therefore the sibling repository. Row: `docs/defects.md` `STOREROOM-PUBLISHED-ADDON-VERSION-MISMATCH`.
Evidence: `docs/specs/storeroom-binding-review.md` §2/§3; `archive/gate1/2026-10-11-U-STOREROOM-BINDING-gate1-step1-validity.md` (`BF-1`);
`archive/gate1/2026-10-11-U-STOREROOM-BINDING-gate1-step2-critique.md` (`C-09`).

**Observed symptom.** `npm install provident-storeroom` (0.1.1, `linux-x64-gnu`) succeeds and
`import('provident-storeroom')` exposes exactly the eight declared verbs (`storeCreate`, `read`,
`readLiteral`, `write`, `delete`, `rollback`, `listen`, `unlisten`) — **but every
`storeCreate(...)` call throws** the declared failure form:

```
{ status: 'FilePathUnreachable',
  message: "'@auspicion/provident-storeroom-js-linux-x64-gnu' is not reachable at construction, the path must exist or the application must be able to write it" }
```

No store can be constructed on any covered target, from a published install or from the sibling's own
checkout, so no verb can be exercised at all.

**Reproduction.** (1) `npm install provident-storeroom` in an empty project; (2) run
`import('provident-storeroom').then(m => m.storeCreate({journalLength: 32, listeners: [], filePath: '/tmp/x.json'}))`;
(3) observe the throw. Control: `require('@auspicion/provident-storeroom-js-linux-x64-gnu').version()`
answers `"0.1.0"`, while that platform package's own manifest and the wrapper's both declare `0.1.1`.
The sibling checkout's own built addon answers `"0.1.0"` too. `provident-storeroom@0.1.0` also fails
(rung one misses; a tarball carries no module-relative addon).

**Suspected root cause.** The addon's self-reported version was not bumped with the wrapper's. Rung one
loads the platform package and then compares `candidate.version()` **exact-string** against the
package's own manifest version (`index.mjs:136` `packageVersion()`; the comparison at `:226-232`); the
shipped artefact answers `"0.1.0"` (`bindings/js/Cargo.toml` `version = "0.1.0"`, read at
`bindings/js/src/facade.rs:1414` via `env!("CARGO_PKG_VERSION")`) while `bindings/js/package.json`
declares `0.1.1` — so the mismatch arm fires, and by the package's own design rung two is **not**
reached after a mismatch (no fallback).

**Proposed fix shape (upstream-owned).** A release in which the artefact's `version()` equals the
wrapper manifest's version — bump the crate's version constant and re-run the publish workflow so the
five platform packages' binaries report the wrapper's version, or declare the artefact's own version in
the manifest. The sibling's own spec already records the condition and owns the remedy
(`Provident-Storeroom/docs/specs/storeroom-publish/release.md:161-166`, its `Q3-1` duty); this round is
the consumer-side record that the condition **blocks adoption in this repo**. **THIS PROJECT DOES NOT
PATCH THE PACKAGE** (`AGENTS.md` item 7).

**⟶ ROUND 10'S DELIVERED FORM, DATED `2026-10-11` (an APPEND — `RCA-8(d)`: no pre-existing byte of this file was rewritten, moved or deleted).** The round above is the catalogue entry; **the HANDOFF ITSELF is `docs/handoffs/2026-10-11-storeroom-sibling-build-and-file-creation.md`**, and a byte-identical copy was delivered into the sibling tree at `Provident-Storeroom/docs/handoffs/2026-10-11-incoming-from-provident-electron.md` (untracked at the sibling's `4143be8`; the sibling's own pass owns its commit). It files **three** sibling items against `provident-storeroom@0.1.1`: **(1) BLOCKING** — the published artefact's `version()` answers `0.1.0` against the manifest's `0.1.1`, and the load path's version read refuses the released artefact at rung one with no fallback, so every verb throws (with the sibling's own `release.md` §2.2 vs `acceptance.md` §3.1 row `4` contradiction named, and two remedies priced); **(2) MEDIUM** — the construction-time file probe passes over a path whose parent the process cannot write, against `A52`/`A55`/`DD-40`'s own rule; **(3) LOW** — one clause, two failures. **It carries the live battery that would close all three.** **NO PACKAGE BYTE WAS PATCHED.**

**⟶ ROUND 10'S RETRY RESULT, DATED `2026-10-12` (an APPEND — `RCA-8(d)`: no pre-existing byte of this file was rewritten, moved or deleted).** **`provident-storeroom@0.1.2` CLEARS the round's blocking item.** The sibling stamped the artefact's self-report at build time from the package manifest (its `docs/decisions.md`, `DEF-19`'s remedy `(a2)`; `bindings/js/src/facade.rs` :1434) while the crate's own version stays independent in source — **remedy (a) in the build-stamp form this repo's handoff recommended, with `PAR-PUB-32`'s substitution guard preserved.** **Measured against the registry's `0.1.2` tarballs in a clean directory (`linux-x64-gnu`):** the artefact's `version()` answers `"0.1.2"` = its manifest; `storeCreate` constructs (no `filePath`, a writable `filePath`, and the `/usr/bin` case); `write` → `read` → `rollback` round-trips; a `file`-tier write creates the file and a fresh `storeCreate` boot-loads the value; both `DD-40` refusals answer `FilePathUnreachable` with the PATH as subject. **`0.1.1` remains true of the registry's immutable bytes and is unrecoverable by patch — a consumer pinned to it cannot load the package.** **THE ROUND'S SECOND ITEM (the file probe) IS UNCHANGED AT `0.1.2` AND IS NOW THE ONLY SIBLING ITEM OPEN ABOVE `LOW`** (⟶ QUALIFIER, ADDED `2026-10-12` BY THE SUPERVISOR-RECONCILIATION PASS: **THE CLAIM AS FILED HERE WAS TOO BROAD** — ITEM 3, the clause-ambiguity wording finding (one clause emitted for two unrelated failures), **STANDS OPEN AND LATENT AT `LOW`** (the verification document's §4 and its §6 table), so ITEM 2 is the only sibling item open ABOVE `LOW`, never the only one open): the sibling re-filed it as **`DEF-20`, a DECISION CONFLICT rather than a code defect** (`DD-45`'s mode-bit arm, ACTIVE, against `A52`/`A55`/`DD-40`'s write-access requirement — the code implements `DD-45` faithfully), split out of its fix unit as *"a decision reversal is not a defect repair"*

**⟶ ROUND 10'S THIRD RETRY RESULT, DATED `2026-10-13` (an APPEND — `RCA-8(d)`: no pre-existing byte of this file was rewritten, moved or deleted).** **`provident-storeroom@0.1.3`: THE ROUND'S BLOCKING ITEM STAYS CLOSED AND THE ROUND'S SECOND ITEM IS NOW CLOSED TOO.** **ITEM 1 — still closed:** the wrapper manifest is `0.1.3` with all five `optionalDependencies` pinned exactly at `0.1.3`, **the artefact's `version()` answers `"0.1.3"` = its manifest**, the package loads, the eight verbs work, `mem` write → `read` (`42`) → `rollback` round-trips, and a `file`-tier write creates the file (`9` bytes) with a fresh `storeCreate` boot-loading the value. **ITEM 2 — CLOSED AT `0.1.3` BY THE SIBLING'S TENTH BOUNDED AMENDMENT (`U-STOREROOM-ACCESS-PROBE`, the tenth amendment of its `docs/specs/storeroom-native/contract.md`):** the configuration that was a FALSE PASS at `0.1.2` — a root-owned `0755` parent with uid `1000` — **now answers `FilePathUnreachable` AT CONSTRUCTION** (also measured closed: a dangling symlink, and a symlink into an absent directory; a symlink to a real writable file constructs, the DECLARED accepted arm; a refused construction leaves NO file behind). **The amendment withdrew the mode-bit screen as the decision and made the binding verdict the kernel's own answer at an EXCLUSIVE CREATE** (`create_new`, `O_CREAT|O_EXCL`), naming `EROFS`/`EACCES`/`ENOENT`. **THE INSTRUMENT THIS REPO'S HANDOFF PROPOSED — `libc::access(W_OK)` / `faccessat(AT_EACCESS)` — WAS ABANDONED AND NEVER LANDED** (the sibling's dated correction in its own `docs/decisions.md`); **the sibling's instrument is the stronger one, and we record the abandonment without objection.** **AND ONE ASSERTION THIS REPO WROTE IS SUPERSEDED, WITH ITS CORRECTION OURS TO CARRY:** the `2026-10-12` verification's `§5` assertion 5 claimed a writable-parent-and-absent-file construction *"constructs AND CREATES NOTHING"* — **at `0.1.3` the construction CREATES that file, zero-length**

---

## Round 11 (NEW SURFACE, OWED SINCE THE `2026-10-13` `0.2.0` REVIEW) — `provident-storeroom`, THE CONSTRAINT/REPAIR FACILITY: three reviews against `0.2.0` / `0.3.1` / `0.4.0`, and the package-gap set the upstream project can act on

**⟶ DATED `2026-10-13` (an APPEND at this file's foot — `RCA-8(d)`: no pre-existing byte of this file was rewritten, moved, reflowed or deleted; `RCA-8(g)`: this is the round's standing text and there is no superseded body to move). THE ROUND WAS OWED:** the six `docs/defects.md` rows filed `2026-10-13` (`DEF-A`…`DEF-F`) each carry *"A `docs/HANDOFF.md` ROUND (Round 11) AND AN UPSTREAM ISSUE ARE OWED"*, and the round had not been written. **THIS ROUND IS THAT WRITING — it is the assembly, not a new review.** **ITS SUBJECT IS A DIFFERENT PACKAGE FROM ROUNDS 1–9** (`provident-ssr`): this is `provident-storeroom`, whose sibling repo is the adjacent `../Provident-Storeroom` (the same subject as Round 10, which closed the package's *load* path). **THE HANDOFF TARGET IS THE SIBLING REPOSITORY.**

**⟶ THE ROUND EXTENDED AT `provident-storeroom@0.5.0`, DATED `2026-10-13` (an APPEND at this round's foot — `RCA-8(g)`: no pre-existing byte of this file was rewritten, moved, reflowed or deleted; the rows and clauses above stand byte-for-byte as the `0.4.0` state and are read THROUGH this extension). THIS SECTION IS THE `0.5.0` ASSEMBLY; the table below it is the `0.4.0` table, and where the two disagree the `0.5.0` table governs.** **THE ARTIFACT:** `provident-storeroom@0.5.0` is **published and `dist-tags.latest`** (supervisor-measured). **TWO INDEPENDENT PASSES ran against it** — a **17-experiment LIVE PROBE of the INSTALLED artifact** (`/tmp/probe-storeroom-050`, node `v24.20.0`, uid `1000`, report `PROBE-RESULT-050.md`; labelled `observed`) and a **SOURCE/RECORD CRITIQUE** (`read` for code and declaration citations, `declared` for the package's own prose, `derived` for a mechanism not read). **THE RECONCILED VERDICT IS `MEETS-IN-PART`, AND THE DECIDING REQUIREMENT `R3` IS UNCHANGED: this consumer's COMMIT register — commits not yet past all constraints, with their ops and error messages — DOES NOT EXIST AT ANY PUBLISHED VERSION.** **The catalogue is `docs/defects.md` (`DEF-M`, `DEF-N`, `DEF-O` are its new rows); that file is authoritative and the table below is the handoff assembly.**

| Row | State at `0.5.0` | One line, for the upstream project |
| --- | --- | --- |
| **`DEF-G`** | **CLOSED at `0.5.0` — RECORDED SO THE CLOSURE IS NOT RE-FILED** | **the reversal no longer overshoots its scope:** the lawful pre-existing value that `0.4.0` destroyed is restored (`readAfter`: `AddressNotFound` → `2`). The cause is the `src/constraint-kernel.mjs` rollback-composition change whose own rationale reads *"Overshoot is a defect"*. **No action owed on this half.** |
| **`DEF-A`** | **CLOSED, re-confirmed at `0.5.0`** | the discriminator is an identity mark, so a caller-shaped `{status,message}` cannot be laundered into the package's own refusal. **No action owed.** |
| **`DEF-M`** | **OPEN — NEW, and it is the release's most consequential behaviour** | **the same edit that closes `DEF-G` INVERTS THE REPAIR ARM: one data-loss defect is traded for one data-integrity defect.** The repaired `1` becomes the rejecting **`9`** (`observed`). **The release's own record does not mention this.** Four parts: (1) the overshoot is gone; (2) the repaired value is now discarded; (3) the record is silent on the inversion; (4) **a repair's op is UNREACHABLE ON THE PASSING ARM** — the passing arm builds the repair report and the entry **discards** it. **THE FIX SHAPE IS YOUR CALL, and it is the fork this review sharpens:** *restore-the-repaired-value* (the reversal excludes repair ops so a repair survives the rewind) or *leave-the-rejecting-value* (the reversal is total and the repair arm's outcome is declared void on a reversal) — **whichever you choose must be DECLARED in the record**, and the passing arm must **return** the report. |
| **`DEF-N`** | **OPEN — NEW; NOT A REGRESSION (`0.4.0` behaved the same)** | **registration is a refusing, throwing act.** `addConstraint(pair, fn)` invokes the constraint **once immediately** and refuses a **well-formed pair** whose function is not `true`, with `{status:'ConstraintListInvalid', message:"'a' is not a valid constraint entry…"}` — **a message describing a MALFORMED pair**. The same evaluation **re-runs at `constraintOn`, so a re-enable can be refused**. **The reused code is a false attribution, the same class as `DEF-H`'s `FileCommitFailed`.** |
| **`DEF-O`** | **OPEN — NEW; a MIS-FILING IN THE RELEASE RECORD** | **the new thirteenth member `constraints()` is a reader for the CONSTRAINT register, shipped in the same release this consumer asked for a COMMIT register.** It returns a fresh array of `{address, id}` pairs and **never changes** — `0` ops, `0` messages, `0` state — across a pass, a refusal, a toggle and a `rollback`. **Its own shipped declaration says it: *"It is NOT a `pending()` reader, NOT an `attempts()` enumerator and NOT a live view of a running commit"*** (`bindings/js/index.d.ts:609-610`). **The release record treats it as the `R3` delivery; it closes nothing of `R3`/`R6`/`R9`/`R16`.** |
| **`DEF-H`** | **UNCHANGED — and now explicitly re-ruled AS DESIGN** | a constraint refusal still throws labelled `FileCommitFailed` while the kernel's real token rides `log[].state`. **The record now rules the label intended, so this is no longer a fix to await but a design a consumer must accept or refuse** — and this consumer's `D-1`/`X-1` (a **returned record**, a **closed** reason union) refuse it. |
| **`DEF-I`** | **UNCHANGED** | the undo handle is still published in `log[].opId` — the datum that must be **a record, not an undo handle** still arrives as exactly the argument `rollback(opId)` accepts. **Still a collision, not merely a defect.** |
| **`DEF-J`** | **UNCHANGED** | the kernel's `CLOSED` map still grows with **no `delete`** — no removal arm, no declared bound. |
| **`DEF-K`** | **UNCHANGED** | the shipped declaration's batch element still carries **no body**, so a typed consumer still cannot use the batch route without a cast. |
| **`DEF-L`** | **NARROWED, NOT CLOSED** | the record now describes *a* registration-time evaluation, but still not the behaviour filed as `DEF-N`, so the record and the bytes remain in disagreement about **which** evaluation shipped. |
| **the `log`-is-a-live-reference finding** | **UNCHANGED** | the failure form's `log` is still a **live reference** to the attempt's own trace, not a snapshot. |

**THE REQUIREMENT VIEW AT `0.5.0`, RANKED — the upstream should read these as requirements, not only as defects.** **`R3` — the commit register; the whole of this consumer's second table. NOT MET, and it decides the verdict.** · **`R16` — no removal arm, no declared bound, and the package's own retention is unbounded (`DEF-J`, `DEF-E`).** · **`R14` — NO PER-GRAPH SPLIT AT ALL. AND A DISAGREEMENT RECORDED BY NAME: the sibling has now WITHDRAWN `R14` in its own catalogue, which is in DIRECT CONTRADICTION with this consumer's binding `UK-5` ruling (`R14`-WITHDRAWN-BY-UPSTREAM vs `UK-5`-BINDING-HERE). This repo's ruling stands; the withdrawal is noted; this filing reconciles neither.** · **`R15` — every data condition still THROWS, and this cycle added a THIRD throwing site (`DEF-N`).** · **and one new: a REPAIR'S OP IS UNREACHABLE ON THE PASSING ARM (`DEF-M` part 4).**

**THE SIBLING'S OWN CLAIM, TESTED — recorded because a claim that is not tested becomes a handoff that is not owed.** The sibling's re-review claims *"`R6`/`R7`/`R13` are LARGELY DELIVERED"*. **The tested result:** **`R6` (a caller-supplied name reaching a register) is true in NO sense** — the name crosses as **a log column on a THROWN per-attempt trace**; there is **no registry to add it to**, and the sibling's own record concedes the commit-record half is unbuilt. **`R7` (a repair's op recorded) holds on the FAILURE ARM ONLY** — the passing arm builds the report and the entry **discards** it (`DEF-M` part 4). **`R13` (the op's provenance confirmable) holds in the WEAKEST sense** — the spelling crosses, but the same member is **exactly the argument `rollback(opId)` accepts**, and **no clause declares it a record rather than an undo handle**; the sibling says so itself. **ALSO RECORDED: the declared fourth `LogKind`, `'commit'`, is NEVER EMITTED on any arm.**

**WHAT THIS EXTENSION ASKS FOR, AND WHAT IT DOES NOT.** **ASKED:** that the upstream project treat **`DEF-M` and `DEF-N` as new open items**, **`DEF-O` as a mis-filing in the release record to reconcile**, **`DEF-H` as settled-as-designed (so the consumer's refusal is the consumer's own problem, recorded rather than re-filed)**, and **`DEF-I`/`DEF-J`/`DEF-K`/`DEF-L` and the live-`log` finding as still open at `0.5.0`**; and that **`DEF-G`'s and `DEF-A`'s closures be read as closures** — a closed defect is as important as an open one. **NOT ASKED, AND NOT DONE HERE:** **THIS PROJECT DOES NOT PATCH THE PACKAGE** (`AGENTS.md` item 7). **No byte of `node_modules/**`, no published artifact and no byte of `Provident-Storeroom` was written by this pass** — delivery into the sibling tree is the architect's own act. **NO PACKAGE BYTE WAS PATCHED.** **LABEL DISCIPLINE, STATED FOR THE READER OF THIS TABLE: every `observed` is a probe execution, every `read` is a code or declaration citation, every `declared` is the package's own prose — and NO RELEASE NOTE'S CLAIM IS PRESENTED HERE AS A MEASUREMENT.**

**THE REGISTRY STATE THE REVIEWS MEASURED AGAINST — the supervisor's measurements, cited as such, not re-taken by this pass.** Published versions `0.0.0-stage · 0.1.0 · 0.1.1 · 0.1.2 · 0.1.3 · 0.2.0 · 0.3.0 · 0.3.1 · 0.4.0`; **`dist-tags.latest = 0.4.0`** (measured `2026-10-13` with `npm view … --cache /tmp/npmcache-pk`). **Three requirements reviews have run against FRESH INSTALLS of the published artifacts, and all three returned `MEETS-IN-PART`:**
- **`0.2.0`** — the baseline review; it filed `DEF-A`…`DEF-F`.
- **`0.3.1`** — `MEETS-IN-PART` (**6 MET · 5 PARTIAL · 5 NOT PRESENT**). **MOVEMENT: `R7` CLOSED** (a repair write's returned op is now recorded — the log's `repair-run` entry carries `opId`); **`R13` CLOSED** (the `op.opId` provenance is now confirmable on the failing arm); **`R8`'s op list exposed.** **`DEF-F` CLOSED here** (`src/constraint-kernel.mjs` became the fourth `files` entry, and the write itself evaluates constraints — `R2`/`R11` moved to MET), and **`DEF-A` was re-measured still OPEN here.**
- **`0.4.0`** — `MEETS-IN-PART`, and the movement is **real but narrow**: **`DEF-A` CLOSED** (the config path now stands outside the `try`, and the discriminator is a `Symbol.for` identity mark rather than a member's presence).

**THE EVIDENCE PATHS — the probes ARE the reproduction, and each review's probes live with its install.** `/tmp/probe-storeroom-020` (the `0.2.0` install; the probe set `probes/*.mjs`, cited by row in `DEF-A`…`DEF-F`) · **`/tmp/probe-storeroom-031`** (the `0.3.1` install and its probes) · **`/tmp/probe-storeroom-040`** (the `0.4.0` install and its probes — the source of every `0.4.0` row below). Installs were made with `npm install provident-storeroom@<version> --cache /tmp/npmcache-pk`; node `v24.20.0`, uid `1000`. **The catalogue is `docs/defects.md`; the reviews' verdicts are the supervisor's requirement scoring and are recorded at `docs/next-steps.md`'s `2026-10-13` review block** (the sixteen requirements `R1`–`R16` are **not filed as a numbered list in this repo** — see that block's structural finding). **THE PROBES CITE `observed` RESULTS ONLY; EVERY CODE CITATION IS `read`; A MECHANISM NOT READ IS LABELLED `derived` IN ITS ROW.**

### The package-gap set, by state at the newly published versions

| Row | State at `0.4.0` | One line, for the upstream project |
| --- | --- | --- |
| **`DEF-A`** | **CLOSED at `0.4.0`** | the caller-shaped `{status,message}` laundering is gone: the config path moved outside the `try` and the discriminator is a `Symbol.for` identity mark. **No action owed — recorded so the closure is not re-filed.** |
| **`DEF-B`** | **HALF CLOSED — STILL OWED** | the code reads the body from an undeclared sixth key `element.constraint`, but the shipped `index.d.ts` still declares the element `{address; id}`: **a typed consumer cannot use the batch route without a cast.** The declaration half is re-filed as `DEF-K`. |
| **`DEF-C`** | **NOT RE-MEASURED — left as filed at `0.2.0`** | three wrong refusal messages (an authoring placeholder printed as the subject; a SHAPE message for a well-shaped entry; an ungrammatical key list). **The honest state is that no pass re-drove it against `0.3.1`/`0.4.0`.** |
| **`DEF-D`** | **NARROWED, NOT FIXED** | an abandoned adoption is still drawn by the next unrelated write, withholding that write's delivery. `0.4.0` improves only the **visibility** (the failure form names the attempt's own `opId`s where `0.2.0` produced no error, warning or log). |
| **`DEF-E`** | **NOT FIXED** | never-consumed adoptions are still retained unboundedly in three strong-reference ledgers. **`DEF-J` is the second instance of the same retention class**, on the kernel's own `CLOSED` map. |
| **`DEF-F`** | **CLOSED at `0.3.1`** | the constraint kernel is published as the fourth `files` entry and the write evaluates constraints. **QUALIFIER owed to the reviews: published is not exported** — the kernel is not in the `exports` map, so its element shape remains unreachable by a consumer import (which is why `DEF-F`'s closure did not by itself close `R3`). |
| **`DEF-G`** | **OPEN — new at `0.4.0`** | **the reversal OVERSHOOTS its scope:** a pre-existing version that no constraint ever judged is destroyed and the recorded id cannot recover it (`RollbackCompacted`). The package's own spec fixes the correct target (*only the ops after the last valid state are undone*), so **the build contradicts its own declared rule**. |
| **`DEF-H`** | **OPEN — new at `0.4.0`** | **a fabricated status:** a constraint-refused write throws `{status:'FileCommitFailed', …}` — the store's **save**-failure code — while the kernel's real token is demoted to `log[].state`. **Nothing failed to save.** |
| **`DEF-I`** | **OPEN — new at `0.4.0`; FILE IT AS A COLLISION** | **the undo handle is now published to the client:** the kernel reverses via `rollback(op.opId)` per still-owed op, and `log[].opId` hands those ids to the caller — so the datum a consumer must treat as **a record, never an undo handle** arrives as **exactly the argument a reversal takes**. |
| **`DEF-J`** | **OPEN — new at `0.4.0`** | **unbounded retention:** the kernel's `CLOSED` map grows without deletion — no per-attempt removal, no size bound, no declared cap. |
| **`DEF-K`** | **OPEN — new at `0.4.0`** | **the shipped declaration declares nothing that can carry a constraint body**, and the package's own release record notes its `index.d.ts` is type-checked by **nothing** — so `StoreRefusal`'s three-member and `LogEntry`'s six-member declarations ship as **unverified text**. |
| **`DEF-L`** | **OPEN — new at `0.4.0`, a RECORD/BUILD CONTRADICTION to hand over, NOT to adjudicate** | the `0.4.0` release note says a registration-time evaluation ruling is ***"IMPLEMENTED NOWHERE"***, while the **installed `0.4.0` was observed running a registration-time evaluation that refuses a registration whose constraint fails at registration** — and reporting it with a message that **misnames a well-formed pair** as *"not a valid constraint entry"*. **Observed-on-installed-bytes vs declared-on-record; this repo does not resolve which is right.** |

**THE REQUIREMENT VIEW, SO THE UPSTREAM SEES THE GAPS AS REQUIREMENTS AND NOT ONLY AS DEFECTS.** Three reviews scored sixteen requirements; **still NOT met at `0.4.0`:** **`R3`** — a commit registry of commits **not yet past all constraints**, with their ops and error messages. The new `{status, message, log}` form carries **the ATTEMPT's** trace (`LogEntry` = `{seq, kind, id, message, opId, state}`, kinds `constraint-check`/`repair-run`/`commit`/`outcome`), it crosses **only on failure**, the attempt is released at the terminal arm, the log carries **no address and no attempt id**, and its element shape is in a kernel module the `exports` map does not publish. **`R6`** — no name reaches any register. **`R14`** — no graph or `secure` concept at all (`'secure'` is `OutOfDomainTier`; one factory, one registry per instance). **`R15`** — every data condition still **throws**, where this consumer's rulings (`D-1`/`X-1`) require a **returned record**. **`R16`** — nothing is removed on reversal and **no declared bound** (the kernel's `CLOSED` map grows without deletion; cf. `DEF-G`, `DEF-J`).

**WHAT THIS ROUND ASKS FOR, IN ONE PARAGRAPH, AND WHAT IT DOES NOT.** **ASKED:** that the upstream project treat `DEF-B`'s declaration half, `DEF-D`, `DEF-E`, and the five new rows `DEF-G`…`DEF-L` as open items against `0.4.0` (and `DEF-C` as **un-re-measured rather than resolved**), and that each row's fix shape be read where it is filed in `docs/defects.md` — every one carries **observed symptom · reproduction · suspected root cause · proposed fix shape**, and the fix shapes are **upstream-owned**. **NOT ASKED, AND NOT DONE HERE:** **THIS PROJECT DOES NOT PATCH THE PACKAGE** (`AGENTS.md` item 7). **No file under `node_modules/**`, no published artifact and no byte of `Provident-Storeroom` was written by this pass** — delivery into the sibling tree is the architect's own act, and this round is the consumer-side record. **NO PACKAGE BYTE WAS PATCHED.**

### ⟶ THE ROUND EXTENDED AT `provident-storeroom@1.0.0`, DATED `2026-10-14` (an ANCHORED INSERTION after this round's `2026-10-13` assembly; `RCA-8(d)`/`RCA-8(g)`: no pre-existing byte of this file was rewritten, moved, reflowed or deleted — the `0.4.0` and `0.5.0` tables above stand byte-for-byte and are read THROUGH this extension, and where they disagree with the table below, the table below governs. `RCA-8(f)`: no unit admitted, no ledger row added, no count moved.)

**THE ARTIFACT:** `provident-storeroom@1.0.0` is **published and `dist-tags.latest`** (supervisor-measured). **TWO INDEPENDENT PASSES ran against it** — an **`18`-experiment LIVE PROBE of the INSTALLED artifact** (`/tmp/probe-storeroom-100`, node `v24.20.0`, uid `1000`; labelled `observed`) and a **SOURCE/RECORD CRITIQUE** (`read` for code and declaration citations, `declared` for the package's own prose and guide, `derived` for a mechanism not read), reconciled by the supervisor. **THE RECONCILED VERDICT IS `MEETS-IN-PART`, AND THE DECIDING REQUIREMENT `R3` IS STILL UNCHANGED: this consumer's COMMIT register — commits not yet past all constraints, with their ops and error messages — DOES NOT EXIST AT ANY VERSION `0.2.0`→`1.0.0`.** **THE TALLY, PRINTED WITH ITS TERMS: `6 MET` (`R1`, `R2`, `R5`, `R10`, `R11`, `R13`) + `3 PARTIAL` (`R4`, `R7`, `R8`) + `7 NOT MET` (`R3`, `R6`, `R9`, `R12`, `R14`, `R15`, `R16`) = `16` ✓.** **THE CATALOGUE IS `docs/defects.md` (`DEF-P`…`DEF-V` are its new rows, filed `2026-10-14`); that file is authoritative and this table is the handoff assembly.**

**THE SURFACE MOVED MATERIALLY, AND ONE REMOVAL IS THE HEADLINE: `13` members → `14`.** **`settle` IS REMOVED WHOLE** — the ordering seam a `0.5.0` consumer called — and **`index.d.ts` carries the removal clause in capitals**; **`removeConstraint` ADDED** · **`removeListener` ADDED** · **`listen` RE-SIGNATURED to `listen(handle, addresses)`** · **five own symbols added**; **`WriteRecord.triggered` / `CommitRecord.pending` now carry `{handle, address}`, and `Handle` is a `string`.**

| Row | State at `1.0.0` | One line, for the upstream project |
| --- | --- | --- |
| **`DEF-K`** | **CLOSED at `1.0.0` — recorded so the closure is not re-filed** | the shipped batch element now declares **`{address, id, constraint}` with the body REQUIRED**, and the code reads exactly those three: **a typed consumer can use the batch route without a cast.** **One qualifier: the class moved one element along** — the same declaration's `address` now declares unlawful a pair the code accepts and unions, filed as **`DEF-P`** — and **no type-check leg for `index.d.ts` was read at `1.0.0`**, so the row's second half is unverified rather than done. |
| **`DEF-G`** | **CLOSED, RE-CONFIRMED — on the ancestry-sibling arm** | `0.4.0` and `0.5.0` both answered **`AddressNotFound`** on that arm; **`1.0.0` answers the intact sibling** (`observed`). **No action owed on this half.** |
| **`DEF-M`** | **OPEN, UNCHANGED IN BEHAVIOUR — and WORSE IN RECORD: the package's own e2e now PINS the outcome** | the `0.5.0` scenario re-run verbatim: the repair's write lands (`9` → `1`), the write fails, **the store still reads `9`.** **Your own suite carries a scenario TITLED with that outcome** (*"… the composition reverses the repaired op … so the attempt's first write stands"*) **plus a measured cell stating *"NOTHING is restored"*** — so **a `1.x` patch that fixed it would redden your own suite**, and the defect is now a declared behaviour rather than an omission. **The asymmetry is recorded because no document names it: on the PASSING arm the repaired value is asserted to stand; on the FAILING arm the reverse is asserted.** **And a new lie rides the same arm: a SUCCESSFUL repaired write returns an `op` whose `after` reads the REJECTING value (`value: 9`) while the store holds `1`** (`observed`). |
| **`DEF-L`** | **WIDENED, NOT CLOSED — the review's first headline, and it is a RECORD/BYTES matter for you to reconcile** | **your SHIPPED `README.md` documents a surface that no longer exists:** it is a `files` row, so it rides **every tarball**, and it describes a **twelve-member** instance **including `settle`**, a `listen(address)`, a **two-member** `{status, message}` failure form and the commit at *"the FIFTH position"* — 0.2.0-era prose **at the one version where a semver guarantee starts to bind**. **A consumer following it gets `TypeError: store.settle is not a function`.** **The stale ordinal survives in shipped bytes:** the `write` commit-position `TypeError` still says *"the fifth argument"* for a **fourth**-position parameter. **And the new consumer guide is NOT IN THE TARBALL AT ALL** (the allowlist is five rows): it is a checkout document whose own §0 says *"THE VERSION THIS GUIDE DESCRIBES IS `0.5.0`"*, and whose §12 promise (*"we tell you where our promises stop"*) **never once reaches the constraint surface** — no repair section, nothing on what a refused constraint write leaves in the store, nothing on the log's kinds, nothing on the published id being a live `rollback` argument. |
| **`DEF-N`** | **OPEN — UNCHANGED IN BEHAVIOUR, WORSENED IN CONTRACT** | `addConstraint` still evaluates the function once at registration and refuses a **well-formed** pair answering non-`true` with the *malformed-entry* sentence **`ConstraintListInvalid`**, and a re-enable at `constraintOn` can be refused the same way (`observed`). **At `0.5.0` that throw was undeclared on a version that did not bind; at `1.0.0` it is undeclared on a SEMVER-BOUND method whose declaration names only two refusal arms.** |
| **`DEF-H` · `DEF-I` · `DEF-J` · `DEF-O` · the live-`log` finding** | **UNCHANGED at `1.0.0`** | the fabricated `FileCommitFailed` label, the published undo handle, the unbounded `CLOSED` map, the constraint-register reader shipped as the `R3` delivery, and the log-is-a-live-reference finding all stand exactly as the tables above state them. **`R12` sharpens `DEF-I` and is worth reading: a REFUSED attempt's `opId` is COMPACTED and refused by `rollback`, while a PASSING write's `opId` IS ACCEPTED** (`observed`) — **the published id is both a record and a handle, and your own guide says so in words.** |

**SEVEN NEW ROWS, ONE LINE EACH — all `docs/defects.md` `DEF-P`…`DEF-V`, all `2026-10-14`, all carrying symptom · reproduction · suspected root cause · proposed fix shape, and all with upstream-owned fix shapes.** **`DEF-P`** the `ConstraintPair.address` declaration calls a legal pair unlawful while the code unions it. **`DEF-Q`** the `KC-3` log message **lost its address** (`… at undefined`, where `0.5.0` printed `… at ["a"]`), so a consumer's diagnostics degrade. **`DEF-R`** `constraints()` **re-orders its own array on a toggle** — two of five snapshots differ and the difference means nothing. **`DEF-S`** **a constraint body's throw propagates RAW and UNCONVERTED** — a raw `Error` with no `log`, and a thrown string escaping as a string. **`DEF-T`** **a detached constraint call produces two spellings of one message** (the four constraint members rebuild it on the JS side; the seven store-reaching verbs use the facade's). **`DEF-U`** **your own suite ships red by ruling** — one held disagreement between a floor token and a blind cell, so a consumer reading the suite as evidence cannot tell which half is the contract (**not published-reachable: a checkout/release-record artifact, not a tarball row**). **`DEF-V`** `write(h, ['a'], undefined, 1)` answers **`AddressMalformed`** for a **supplied** `undefined` tier — the refusal names the wrong subject. **BESIDE THEM, THE REMAINING REQUIREMENT GAPS AT `1.0.0`, RANKED:** **`R3`** not met (the deciding one) · **`R6`**, **`R9`** not met · **`R12`** not met (the record/handle collision above) · **`R14`** not met (no per-graph split; your withdrawal of `R14` still stands against this consumer's binding `UK-5` ruling, reconciled by nobody) · **`R15`** not met, with the throwing surface **widened to four sites** (the four constraint members' receiver arm is the fourth) · **`R16`** not met (`200` pairs survive `200` reversals at `+540 KB` heap, **no declared bound**).

**WHAT THIS EXTENSION ASKS FOR, AND WHAT IT DOES NOT.** **ASKED:** that the upstream project **reconcile its shipped README and its shipped `TypeError` ordinal to the surface it actually ships**, **declare or repair the repair-arm outcome its own suite now pins** (`DEF-M`), **declare the two refusal arms `DEF-N` and `DEF-V` actually reach**, and **read `DEF-P`…`DEF-V` as open items with their fix shapes where filed**; and that `DEF-K`'s and `DEF-G`'s states be read as closures — a closed defect is as important as an open one. **NOT ASKED, AND NOT DONE HERE:** **THIS PROJECT DOES NOT PATCH THE PACKAGE** (`AGENTS.md` item 7). **No file under `node_modules/**`, no published artifact and no byte of `Provident-Storeroom` was written by this pass** — delivery into the sibling tree is the architect's own act. **NO PACKAGE BYTE WAS PATCHED.** **LABEL DISCIPLINE, STATED FOR THE READER OF THIS TABLE: every `observed` is a probe execution, every `read` is a code or declaration citation, every `declared` is the package's own prose — and NO RELEASE NOTE'S, README'S OR GUIDE'S CLAIM IS PRESENTED HERE AS A MEASUREMENT.**

### ⟶ ROUND 11 AMENDED AT THE ARCHITECT'S `2026-10-14` RULING — THE **VISIBLE COMMIT REGISTER** IS **WITHDRAWN** AS A DEMAND, AND THE ASKS THAT SURVIVE ARE THE STATE-INTEGRITY AND CHANNEL SET BESIDE THE SPLIT AND THE BOUND (an ANCHORED INSERTION at the foot of this round's `1.0.0` extension, immediately above the `2026-10-14` op-id amendment — `RCA-8(d)`/`RCA-8(g)`: no pre-existing byte of this file was rewritten, moved, reflowed or deleted; the `0.4.0`, `0.5.0` and `1.0.0` tables above stand byte-for-byte and are read **THROUGH** this clause; `RCA-8(f)`: no unit admitted, no ledger row added, no count moved.)

**THE RULING, VERBATIM (the architect, `2026-10-14`):** *"Also stop asking for a visible commit register. The commit register is for tracking midflight changes and operates on the JS thread, it will be empty when the store is at rest anyway."* **The operative decision row is `docs/decisions/ACTIVE-store-and-package-binding.md`'s `2026-10-14` row `COMMIT-REGISTER-IS-A-MIDFLIGHT-JS-THREAD-STRUCTURE-EMPTY-AT-REST`; the catalogue clause is `docs/defects.md`'s (`DEF-O` withdrawn, `DEF-J` re-read as retention).**

**WHAT THIS ROUND WITHDRAWS, QUOTED — the sentences above that present the ABSENCE OF A VISIBLE COMMIT REGISTER as the reason this consumer's verdict is `MEETS-IN-PART`. Each is WITHDRAWN, not deleted.** **(i) The `0.5.0` extension's verdict sentence:** *"THE RECONCILED VERDICT IS `MEETS-IN-PART`, AND THE DECIDING REQUIREMENT `R3` IS UNCHANGED: this consumer's COMMIT register — commits not yet past all constraints, with their ops and error messages — DOES NOT EXIST AT ANY PUBLISHED VERSION."* **(ii) The `1.0.0` extension's verdict sentence:** *"THE RECONCILED VERDICT IS `MEETS-IN-PART`, AND THE DECIDING REQUIREMENT `R3` IS STILL UNCHANGED: this consumer's COMMIT register — commits not yet past all constraints, with their ops and error messages — DOES NOT EXIST AT ANY VERSION `0.2.0`→`1.0.0`."* **(iii) The two ranked requirement views:** *"`R3` — the commit register; the whole of this consumer's second table. NOT MET, and it decides the verdict."* and *"`R3` not met (the deciding one)"*. **(iv) The `DEF-O` assembly row's closing sentence:** *"the constraint-register reader shipped as the `R3` delivery … it closes nothing of `R3`/`R6`/`R9`/`R16`."* **WHY THEY ARE WITHDRAWN (`derived` from the ruling): the register is a MID-FLIGHT, JS-THREAD structure that is EMPTY AT REST — so it is not a public surface, no package version owes a visible one, and asking a store published from an addon for a JS-thread mid-flight structure is a category error; a consumer reading it at rest would find an empty table.** **`R3`'s SUBSTANCE IS NOT WITHDRAWN:** it stands as an **internal mechanism** whose only legitimate observable is **the attempt's record on the failure arm** — the attempt's own `log` (`constraint-check` · `repair-run` · `outcome`, naming the constraint id, the write's op id and the message), which the package **already ships** and the probe measured (**`observed`**). **`R6` and `R9` are re-read against an internal register, not deleted:** `R6`'s substance (the constraint's name is **associated with the attempt**) is `observed` on the failure arm; `R9` (the register empties when the attempt settles) is `derived` from the ruling and **not measurable** through any published surface, since nothing exposes the register to inspect.

**WHAT THIS ROUND STILL ASKS FOR, NAMED ITEM BY ITEM — and not one item is the withdrawn ask.** **THE STATE-INTEGRITY ROWS:** **`DEF-M`** (the repair-arm inversion — the store persists the value the constraint **refused**, and your own suite now pins that outcome) · **`DEF-W`** (the reversal path is unjudged — its `restoredTo` is a state no constraint ever approved). **THE CHANNEL ROWS:** **`DEF-H`** (a constraint verdict labelled `FileCommitFailed`, a status the store never minted) · **`DEF-N`** (a well-formed pair refused with a malformed-entry code, at registration and again at `constraintOn`) · **`DEF-S`** (a constraint body's throw propagates raw and unconverted, with no `log`). **THE PER-GRAPH SPLIT QUESTION:** **`R14`** — no per-graph split at all, and this repo's binding `UK-5` ruling still stands against the sibling's withdrawal of `R14`, reconciled by nobody. **THE RETENTION BOUND:** **`R16`** — no removal arm and no declared bound (`200` reversals at **`+540 KB`** heap, `observed`; `DEF-J`'s `CLOSED` map grows with no delete site). **THE REQUIREMENT THAT NOW DECIDES IS `R15`** — a data condition must cross as the package's **declared record** (`status` · `message` · the attempt's `log`), **never a raw throw** — because the failure arm's record is now the **sole** carrier of `R3`'s substance and is not guaranteed to exist (`DEF-S`, `DEF-H`, `DEF-N`, `DEF-V`, all `observed`). **NOT ASKED, AND NOT DONE HERE:** **THIS PROJECT DOES NOT PATCH THE PACKAGE** (`AGENTS.md` item 7) — **no file under `node_modules/**`, no published artifact and no byte of `Provident-Storeroom` was written by this pass.** **LABEL DISCIPLINE FOR THIS CLAUSE: every sentence withdrawn above is quoted, not paraphrased; the ruling's consequences are `derived`; the `log` readings and every defect figure cited are `observed` or `read` as `docs/defects.md` marks them.**

### ⟶ ROUND 11 AMENDED AT THE ARCHITECT'S `2026-10-14` RULING — THE PUBLISHED ID IS **WITHDRAWN** AS A DEFECT, AND WHAT THIS ROUND ASKS FOR IS THE **TERMINAL-STATE CHECK ON THE REVERSAL PATH** (an ANCHORED APPEND at the foot of the `1.0.0` extension's closing paragraph — `RCA-8(d)`/`RCA-8(g)`: no pre-existing byte of this file was rewritten, moved, reflowed or deleted; the `0.4.0`, `0.5.0` and `1.0.0` tables above stand byte-for-byte and are read **THROUGH** this clause, and where they disagree with it, **this clause governs**; `RCA-8(f)`: no unit admitted, no ledger row added, no count moved.)

**THE RULING, VERBATIM (the architect, `2026-10-14`):** *"The opID is the correct parameter, stop calling that a defect. This is separate from the rollback not being constraint-checked"*. **The operative decision row is `docs/decisions/ACTIVE-store-and-package-binding.md`'s `2026-10-14` row `OPID-IS-THE-LAWFUL-REVERSAL-PARAMETER`; the surviving finding is `docs/defects.md` `DEF-W`; the catalogue's `DEF-I` carries the dated split clause.**

**WHAT THIS ROUND WITHDRAWS, QUOTED — these are the sentences above that present the published id as ITSELF the defect, and each is WITHDRAWN, not deleted.** **(i) The `0.4.0` table's `DEF-I` state cell:** *"**OPEN — new at `0.4.0`; FILE IT AS A COLLISION**"* — **and its one-line cell:** *"**the undo handle is now published to the client:** the kernel reverses via `rollback(op.opId)` per still-owed op, and `log[].opId` hands those ids to the caller — so the datum a consumer must treat as **a record, never an undo handle** arrives as **exactly the argument a reversal takes**"*. **(ii) The `0.5.0` table's `DEF-I` row — state cell *"UNCHANGED"* — one-line cell:** *"the undo handle is still published in `log[].opId` — the datum that must be **a record, not an undo handle** still arrives as exactly the argument `rollback(opId)` accepts. **Still a collision, not merely a defect.**"*. **(iii) The `1.0.0` table's grouped row — state cell *"UNCHANGED at `1.0.0`"* — the clause** *"the published undo handle"*, **and the `R12` sentence it carries:** *"a REFUSED attempt's `opId` is COMPACTED and refused by `rollback`, while a PASSING write's `opId` IS ACCEPTED (`observed`) — the published id is both a record and a handle, and your own guide says so in words."* **WHY THEY ARE WITHDRAWN:** an op id is **the lawful and correct parameter of a reversal verb**, and a record may legitimately carry a value a reversal would accept — **recording and reversing are different acts, not different values**. **The parameter choice is not a defect, and a consumer's catalogue must stop filing it as one.** **The `0.4.0` and `0.5.0` asks above that listed `DEF-I` among the items to be treated as open are read THROUGH this clause on that subject and are otherwise unchanged.**

**WHAT STANDS, AND IT IS THE ONLY THING THIS ROUND ASKS ON THIS SUBJECT — THE REVERSAL PATH IS NOT CONSTRAINT-CHECKED (`read`, `bindings/js/index.mjs:483-486`).** `rollback(opId)` does `Reflect.apply(entryOf().rollback, this, args)`, reaching the **addon entry DIRECTLY**: it never passes through `bindings/js/src/entry/kernel-commit.mjs`'s `kernel.commit`, nor through `constraints.mjs`. **So no constraint is consulted on the reversal path at all**, and the answer's **`restoredTo`** is **a state no constraint ever approved**. **Your own doc block calls this verb *"the constraint pattern's reverse step"* (`PAR-JS-9`) — the compensating-transaction reading. That reading is not the defect; the absence of judgement on the path is.**

**THE ASK, RESTATED IN FULL, SO IT CANNOT BE MISREAD AS THE WITHDRAWN ONE: THE REVERSAL PATH MUST BE CONSTRAINT-CHECKED AT ITS TERMINAL STATE, OR THE PACKAGE MUST DECLARE IT UNJUDGED.** **The check belongs at the TERMINAL STATE, never per unwinding step** — a per-step check is **unsound**, because an unwinding composition passes through **intermediate states no constraint would approve**. **The property, stated so it can be tested:** *after a reversal completes, the store's state satisfies every registered constraint, or the reversal fails and the register records it.* **That shape also names why the per-op unwinding is where the missing check bites** (`kernel-terminal.mjs`'s composition — the `DEF-M` mechanism — is the **second reachable path**, since the kernel's own unwind reverses through the same unjudged verb). **Either discharge is acceptable to this consumer: the CHECK, or the DECLARATION that the reversal path is unjudged** — but the declaration must ride **the record a consumer reads**, not be inferred from the bytes. **`D-1` IS NOT REOPENED BY ANY OF THIS:** *"the op id is a record, not an undo handle"* binds **the violation path** (a violation lands nothing; its id is a record of what happened) and does **not** answer what parameter a reversal verb takes. **NOT ASKED, AND NOT DONE HERE:** **THIS PROJECT DOES NOT PATCH THE PACKAGE** (`AGENTS.md` item 7) — **no file under `node_modules/**`, no published artifact and no byte of `Provident-Storeroom` was written by this pass.** **LABEL DISCIPLINE FOR THIS CLAUSE: the `index.mjs:483-486` citation is `read`; the terminal-state fix shape is `derived`, not measured; every sentence withdrawn above is quoted, not paraphrased.** **PLACEMENT, STATED SO NO READER IS MISLED: the unattributed fragment below this clause is PRE-EXISTING bytes of the earlier `0.1.3` extension, belongs to it, and is neither adopted nor edited here** (`RCA-8(d)`: it was not moved to put this clause in place — the anchor was the `1.0.0` extension's own last sentence).

(measured: `after storeCreate : EXISTS size=0`), **by the sibling's own explicit ruling, and the create is EXCLUSIVE and never truncating** (measured: reconstruction over committed bytes leaves `17` → `17`, boot-load returns the committed value); **THE CORRECTED ASSERTION: a path the process cannot write must be refused at construction; an absent parent and a directory each answer `FilePathUnreachable`; a writable parent with an absent file constructs, creates a ZERO-LENGTH store file, and commits no byte.** **This repo's own mis-filing is reconciled with it** (we filed the probe as a code defect against `A52`/`A55`/`DD-40` and never cited `DD-45`; the sibling re-filed it as `DEF-20`, a DECISION CONFLICT, and the amendment resolved that conflict by moving the clause), **and the class's fourth member — a dangling symlink, `DEF-2026-10-13-D` — was found by the sibling's own blind set, not by us.** **ITEM 3 (one clause emitted for two unrelated failures) IS UNCHANGED AND LATENT.** **THE NEW DOCUMENT: `docs/handoffs/2026-10-13-consumer-verification-of-storeroom-0.1.3.md`** — the canonical account, whose every battery figure is a command's own output against the registry's `0.1.3` tarballs in a clean directory (`linux-x64-gnu`, uid `1000`, `2026-10-13`). **DELIVERY INTO THE SIBLING TREE, STATED HONESTLY BECAUSE IT HAS NOT LANDED: THIS DOCUMENT HAS NOT BEEN PLACED IN THE SIBLING TREE** — the write outside the workspace was DENIED and the escalation was DECLINED, exactly as for the `2026-10-12` document, **whose non-delivery correction stands and is inherited here**; the two retries exist in THIS repo only, and their delivery is owed (**its subject matter does not depend on it** — the sibling independently shipped `0.1.3` and reconciled our `§5` assertion 5 against `docs/specs/storeroom-native/contract.md` :211). **`docs/defects.md`'s row `STOREROOM-FILE-PROBE-FALSE-PASS` IS RESOLVED BY UPSTREAM**; **`R-3` stays discharged and `R-4` (`P-9`'s collision clause, an architect act) alone holds the consumer's hard stop**; `RCA-8(f)`: no unit admitted, no ledger row added, no count moved — `33 DONE / 2 open` UNITS = `35`, `37` live rows. **NO PACKAGE BYTE WAS PATCHED.**; **this repo's own filing is corrected with it** (its `docs/defects.md` row `STOREROOM-FILE-PROBE-FALSE-PASS`, which also carries the now-MEASURED deferred consequence: the first `file`-tier write over an unwritable path throws `FileCommitFailed`, where the previous pass had labelled that consequence *derived*). **The verification document, with the battery's raw outputs and the correction, is `docs/handoffs/2026-10-12-consumer-verification-of-storeroom-0.1.2.md`** (**⟶ CORRECTION, DATED `2026-10-12` — ADDED BY THE SUPERVISOR-RECONCILIATION PASS: THE CLAUSE AS FILED IN THIS PARENTHESIS — *"delivered byte-identically into the sibling tree"* — IS FALSE AND IS RETRACTED (the as-filed words are quoted here so the retraction is auditable; they are NOT a standing claim).** The `2026-10-12` verification document was **not** delivered into the sibling tree: **the write outside the workspace was DENIED and the escalation was DECLINED by the architect, and it was NOT retried** — so `docs/handoffs/2026-10-12-consumer-verification-of-storeroom-0.1.2.md` **stands in THIS REPO ONLY**, and a later pass (or the architect, by manual copy of that document into `Provident-Storeroom/docs/handoffs/`) **OWES that delivery**. **The correct statement of record is the `⟶ THE RETRY AGAINST provident-storeroom@0.1.2` section of `docs/next-steps.md`, which records the non-delivery; the copy that IS placed in the sibling tree is the `2026-10-11` handoff's alone** (and the sibling has since received, re-run and filed that one)). **NO PACKAGE BYTE WAS PATCHED HERE.**
