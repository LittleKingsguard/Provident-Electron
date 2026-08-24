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
  tracker). Round 1 issues are closed by 0.1.1; REQ-GAP-8 is the open follow-up.
- None of these require a behavior change in THIS repo to unblock; the consumer
  workarounds are in place.
- Environment-only findings (Node 18 vs Electron 43 tooling, ESM-main CJS
  requirement, MCP SDK stateless-HTTP wiring) are NOT package defects — they are
  recorded in `docs/decisions.md` / `docs/pending.md` for this repo's own
  maintenance.

## Round 5 — DEFECT-SSR-REMOVE (filed 2026-08-23, from the adapter-parity battery)

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
  only does `fragments.delete(wireKey(...))` — it never detaches the fragment
  from its parent's `children` array nor rematerializes the owner, so the
  removed element survives serialization. `DomAdapter.removeEl`
  (adapters.js:213-229) detaches + removes.
- **Proposed fix shape (upstream-owned)**: `SSRFragmentAdapter.removeEl`
  should splice the child out of its parent state's `children`, set its parent
  to null, and call `rematerialize(parent)` — mirroring the DomAdapter detach.
- **This repo's response**: defect recorded + handed off (this row); the DOM
  collapse is asserted as the host green and the SSR retention is pinned as the
  defect in the battery (NEVER patched here).

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