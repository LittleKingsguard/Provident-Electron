# E2E-Test-Battery plan — change-analysis review (step 3 of the three-agent gate)

Status: **change-analysis review of the E2E test battery proposal** in
`docs/specs/e2e-test-battery.md` (the MCP contract extension + the test
sequence). Synthesizes the step-1 validity and step-2 critique outputs; my own
re-read of every cited source site confirms both steps' line references and
claims. No files changed by this document. Companion context:
`docs/specs/mcp-endpoint.md`, `docs/defects.md` (REQ-GAP-9..12),
`docs/HANDOFF.md` Round 4, `../Preempt-Providence/docs/specs/handoffs-review-2.md`
(the upstream Round-4 change-analysis of OUR REQ-GAP-9..12 handoff — the
pivotal fact, below), `../Preempt-Providence/docs/specs/serialize.md`,
`ssr-synthetic-event.md` §2-4, `fork-stress-data.md`, the F-13 census re-pin
(`docs/specs/fork-stress-data.md:18-22`), node/registry/supervisor source.
No code changed by this document; it is the step-3 artifact.

## 1. The pivotal fact

This plan's Round-4 handoff (REQ-GAP-9..12, filed 2026-08-21) was ANSWERED
the same day by the upstream's own three-agent gate
(`handoffs-review-2.md`, dated 2026-08-21/22): all four are
**APPROVED-WITH-RESHAPE** and **landed in the upstream working tree**
(`createLinkHub` at `translate.ts:185` + `src/index.ts:10`; the seed-hub
threading at `node.ts:463`; the `serialize.md` 4-step recipe; the addLayer seam
letter; the self-evicting sweep `evictDestroyedNode`/`destroyedRefs` at
`registry.ts:259-271` + `supervisor.ts:122-158/713-716`; the destroy-cascade
flag `markCascadeExplicit` at `registry.ts:79` + `supervisor.ts:702`), with
three user rulings (cascade scope = explicit children, skip placements +
`'component'`-token prototypes; rows-mint-on-reseed = documented caveat,
component-bearing docs go through `translateLegacy(doc, {hub})`; no public
reset — reset/prune/unregister REJECTED, eviction is the answer).

**BUT** the published package this repo installs (`node_modules/provident-ssr`
= 0.1.2, the npm latest at review time) contains NONE of these landings
(verified: no `createLinkHub` in `dist/index.d.ts`, no `destroyedRefs` in
`dist/core/supervisor.js`). The upstream landings are **unpublished** (working
tree only). So the plan must be written to be correct against **0.1.2 today**
AND forward-compatible with **the next published version**.

## 2. What the proposal asks (recapped)

A single-process, no-external-reset MCP test battery that builds, drives,
exports, validates, and tears down the four upstream scenario families
(fork-stress-d12 cycle + placement/link/values-only; placeholderLanding +
logged-inLanding as one user-data-conditional page; hooks-scenarios;
handlers-scenarios) using three build mechanisms (A1 `SerializedRenderDoc`
loadState; A2 legacy envelope `translateLegacy`; A3 series of managed-channel
single-action commands), on an MCP contract extended with five additive tools
(`load`/`op`/`export`/`validate`/`teardown`).

## 3. Feasibility verdict (the step-1 + step-2 synthesis)

**VALID-WITH-CHANGES — the shape is sound; several details MUST be rebased
and pinned before TestWriter red.** All step-1 "[PASSES]" claims are verified
against the upstream source (op vocabulary, serialize/translate/payload/node
surfaces, census filters, scenario data modules, 0.1.2's `renderProducingProcess
(renderOptions)` + `data-node-id`). Every step-2 "[critical]"/"[high]" critique
finding is sustained and folded into the reshapes below.

### The required reshapes (the costs-benefits + must-NOT-do items)

| # | Plan change required | Why (evidence) | Cost / benefit |
| --- | --- | --- | --- |
| R1 | **Pin the target package version + reconcile the trackers.** State which teardown/census semantics the battery encodes (0.1.2 per-op vs next-version cascade), and update the Round-4 rows (defects.md/HANDOFF.md) from "OPEN + workaround" to their shipped dispositions. | handoffs-review-2 landings + user rulings; installed 0.1.2 lacks them — a battery written against 0.1.2's `registered`/teardown semantics silently changes meaning when 0.1.3 (or later) publishes. | doc + tracker (near-zero); prevents stale-baseline tests |
| R2 | **A1 recipe — adopt the corrected 4-step recipe verbatim** (`loadState` → `new Node(d, hub)` template-first → `reconcileParentTargets(nodes)` → `supervisor.registerNode` per node), ONE `createLinkHub()` shared by the seeds AND the supervisor. On 1.2 the hub must be vendored (the plan's REQ-GAP-9 workaround stays); when the upstream publishes, drop the vendored copy. | handoffs-review-2 §3 REQ-GAP-9; the plan's A1 line omits `reconcileParentTargets` (would leave child anchors on per-node fresh links) and never shares the hub with the supervisor. | The vendored hub is deleted on the next package refresh; the recipe is pinned regardless. |
| R3 | **A1 scope — snapshot-parity only.** Def/seam/rows machinery is translate-bound (registry holds translate-minted prototype Node objects serialization never carries); `rows-mint` on a reseeded graph throws `rows-prototype-unresolved`. So A1-first-class loads validate to census/treeSig/structural parity, NEVER full behavioral parity for component-bearing scenarios; component-bearing first-class loads go through A2 (`translateLegacy(doc, { hub })`). | handoffs-review-2 §5 ruling 2 + §3 REQ-GAP-9; fork-stress link variant + the landing seams are def-bearing. | doc + scenario-shape pinning (no code) |
| R4 | **fork-stress census — the F-13 arithmetic.** inTree at depth d = `2^d − 1 + 2(d−1)` prototypes (the content-node prototypes are family-in-tree): d12 → **4117**, not 4095; `cloneOps = 4094`; unplaced = 0. Post-teardown: inTree = 1 + the payload prototypes' fate pinned below. NEVER assert `registered` equality. | fork-stress-data.md:18-22 + smoke `assertForkStressCensus` (demo-smoke.mjs:140-169); step-2 finding 3. | doc correction (plan §5.1 assertions) |
| R5 | **C4-vs-d12 amendment.** d12 for ONE variant (placement — the family baseline), d8/d10 for the values/link/cycle variants. Per-scenario wall-time budget assertions. The `flush()` cascade is depth-serial (≥10-12 macrotask hops per d12 build ×4 variants) — the upstream isolates per-subprocess for exactly this reason. | step-2 finding 2; supervisor.flush is task-based (`supervisor.ts:256-262`); demo-smoke isolation rationale (demo-smoke.mjs:108-175). | doc + battery runner structure (cost: smaller trees; benefit: the battery stays CI-viable) |
| R6 | **`hasPendingWork()` settle-gate inside teardown.** `provident.teardown` ends with `while (hasPendingWork()) await flush()`, then re-render, then assert root-only. This is the one guard that makes "a torn-down graph cannot resume expanding" provable (a pending after-compile on a destroyed clone must be confirmed quiescent, not assumed). | step-2 finding 6; supervisor.ts:400-403 (`hasPendingWork` is the non-draining probe); fork-stress `stress-expand` guard is `children.length`-only. | tiny host code inside the teardown tool |
| R7 | **Battery assertion hygiene.** Key on authored `css.id`/`props.id` (never engine-minted `node-N`); every dispatch assertion requires `results.length > 0` or an expected `dirtied` set (an empty report is a failure, never a green pass — the silent `[]` on a destroyed/unknown target must not mask a mis-resolution); fresh `requestId`s per scenario (a reused requestId echoes a stale report across scenarios); never `requestId`s inside command arrays (the dedup LRU is cap-128, it overflows). | step-2 finding 4; runtime.ts resolveString tries getNode first (destroyed nodes resolve); supervisor.ts:228/302; handoffs-review-2 REQ-GAP-11 host note. | battery-runner rules (doc + assertions) |
| R8 | **userData lifecycle.** The landings/handlers conditional seam reads `context.supervisor.userData` (translate-scoped module state). The A2 path must SET it on load and CLEAR it on teardown, or an anon-after-alice load still sees alice's userData (cross-scenario contamination outside the destroy machinery). | step-2 finding 8c; translate.ts:1146-1152 (`setTranslateUserData`); handlers-scenarios.js:86. | tiny host code + a tracker row |
| R9 | **Pass-2 drain ownership for the new tools** — mirror mcp-endpoint.md §3.1's "dispatchAndReport consumed the drain; refresh from non-draining getResolvedStates". State explicitly who drains `takePass2States` on load/op/teardown (the renderer's own drain, consumed exactly once per operation) so the baseline never double-drains or strands states. | step-2 finding 8b; mcp-endpoint.md §3.1 is the precedent. | doc pin in the plan §3 tool table |
| R10 | **Warning surfacing in `provident.load`/`validate`** — return `warnings` (esp. `handler-body-eval-blocked`, now detectable post-0.1.1) so a CSP-blocked handler load is an MCP-visible failure, not a silently dead page. | step-2 finding 10d; REQ-GAP-7's host-must-read-warnings pin. | tiny host code (the Runtime already calls translateLegacy — keep its warnings) |
| R11 | **Cycle-variant A3 scoping.** A static command array cannot name freshly-minted clone ids (runtime-minted; clone-N's dirtied[0] feeds a later op's target). EITHER pin the symbolic-id indirection OR scope the A3 cycle variant to a shallow depth (d4/d6) where the array is fully enumerable; d12 cycle stays A2-only. | step-2 finding 11; fork-stress-data.md:132-138 (the parent chain sets the CHILDREN's chains from the clone op's dirtied[0]). | battery runner shape (doc) |
| R12 | **stress-expand body provenance.** The envelope declares `{name:'stress-expand', phase:'after-compile'}` (name-only); the host injects the body PRE-MOUNT on the prototypes via `Node.addLayer` (the fork-stress page pattern — the now-documented sanctioned seam). Vendor-import the upstream `demo/fork-stress-data.js` body (or vendor it with a provenance comment + a guard test: no self-op, no allNodes scan). The handler names in the envelope stay function-free across MCP (P-E6); the injected bodies are host-side only. | step-1 finding 8 + step-2 finding 9; fork-stress-data.js:107/:209-259; handoffs-review-2 §REQ-GAP-10 (the seam letter). | vendored body + guard test |
| R13 | **DOM-shim fidelity.** The shim is proven for the 12-element counter only. Assert primarily on census + node_state + SSR fragment (shim-stable); treat live-DOM innerHTML substring asserts as secondary; run the Electron-mode battery as a REQUIRED divergence check (not optional) before the shim is trusted. | step-2 finding 10a. | battery runner structure |
| R14 | **live-prod privacy guard rail.** The two live envelopes are upstream-gitignored private payload; the battery uses the sanitized `userAuthEnvelope`-style equivalent ONLY (make it the sole source in §5.2; demote live-prod to a provenance footnote) AND add `live-prod/` to this repo's .gitignore. | step-1 finding 15 + step-2 finding 10c; this repo currently has NO live-prod ignore entry. | .gitignore line + doc sentence |
| R15 | **`hook-kind-mismatch` in §5.3's containment list** (the plan's §5.3 omits it; it's a real managed-channel code). | step-1 finding 16; supervisor.ts:635-640. | doc one-word add |
| R16 | **C3 wording** — the Runtime constructor requires an envelope; "boot root-only" = "boot with a root-only envelope" (translate a bare-root envelope). | step-1 finding 19. | doc correction |

### Explicit rejections the gate adopts (the step-3 verdict carries them)

- No `reset()`/`prune()`/`unregisterNode` (self-evicting sweep is the answer;
  handoffs-review-2 §REQ-GAP-11).
- No `registerHandlerBody` (the journaled live-injection paths exist; the
  addLayer seam is sanctioned for pre-mount only; handoffs-review-2 §REQ-GAP-10).
- No `clear-children`/`reset-subtree` new op (the cascade flag fixes the real
  root cause; handoffs-review-2 §REQ-GAP-12). Note: the cascade is EXCLUSIVE
  of placements + `'component'`-token prototypes; the fork-stress clones are
  `runtimeMinted`-routed to retention (`markDestroyed`), so the per-op loop is
  THE pinned teardown for fork-stress even after cascade lands — the battery
  keeps its loop there.
- No `Supervisor.dispatchEvent` change; no render/HTML change beyond the
  opt-in `data-node-id` this repo already opts into.
- `loadState` does NOT restore def/seam/rows behavior (snapshot-only; R3).

## 4. Verdict

**APPROVED-WITH-RESHAPE — proceed only after the reshapes R1..R16 land in
`docs/specs/e2e-test-battery.md`, the trackers are re-baselined (defects.md/
HANDOFF.md Round 4 → shipped dispositions), and the user go-ahead is explicit.**
The battery is structurally sound (MCP-only drive, interface-driven teardown,
three mechanisms, mechanism coverage matrix, no external reset) and every
upstream surface it names exists. What failed review was DRAFTING, not
CONCEPT: the census arithmetic (F-13), the A1 recipe, the validate-parity
scope, the wall-time/trap at d12×4, the unhandled userData + pass-2-drain +
warning lifecycle seams, and the assertion-hygiene rules all need rewriting to
the Round-4 semantics BEFORE the item-6/7 step gates continue.

Sequencing: (1) apply R1..R16 to the plan (one pass); (2) reconcile trackers
(R1); (3) TestWriter red against the revised spec; (4) Implementer green;
(5) the trio + the battery; (6) document the REQ-GAP landing-vs-publish split
in decisions.md (target-version pin). Trackers updated in the same pass;
this review is the artifact at `docs/specs/e2e-test-battery-review.md`.

---

# Addendum 2026-08-22 — the fork-stress structure ruling (user correction)

**Ruling (user, 2026-08-22):** the fork-stress scenarios the battery replicates
are the STATIC path-enumeration family ONLY — the graph holds `root + 22`
prototypes (23 nodes at d12); the 4095 rendered elements are the `2^d − 1`
path-states produced by ONE `compilePath()` enumeration pass (the prototypes
generate an element per valid path back to root). The runtime clone family
(`forkStressLegacyData` + the after-compile recursion) is OUT of scope.

What this corrected:
1. The gate's R4 census arithmetic (`inTree = 2^d − 1 + 2·(d−1) = 4117` at
   d12, from the upstream smoke) describes the RUNTIME clone family's census,
   NOT the static trio's — and the pre-correction §5.1 described the runtime
   form. The static census is `inTree = 23` (graph nodes incl. root) /
   `elements = 4095` / `cloneOps = 0`.
2. The C4-vs-d12 concern (R5) shrank: the depth-serial `flush()` cascade was a
   property of the runtime clone form. The static trio + cycle run ONE
   enumeration pass each; all four variants run at d12.
3. **No static cycle variant exists upstream** (`pathForkLegacyData` supports
   only `placement` / `values` / `link` — the runtime's `handler` mechanism is
   clone-recursion, which has no static equivalent). The cycle variant is a
   NEW spec deliverable in this step (`docs/specs/e2e-test-battery.md §5.1.x` —
   `pathForkCycleLegacyData(depth)`: the path-fork topology with the component
   mechanism cycling placement-only → values → link per layer; `handler`
   excluded — the "handler expands children if there are none" runtime pattern
   is deliberately NOT used (it would mint real nodes into a static tree,
   break the census, and reintroduce the flush cascade this family avoids).
4. The A3 mechanism is exercised only by hook writes + teardown destroys;
   §5.1 is A2-only in this step.
5. A host capability is pinned: the A2/A1 bootstrap for placement-routed
   scenarios must enumerate via `compilePath()` per node (NOT the default
   `rootNode.compile(nodes)` pass). `compilePath` is a public `Node` method —
   host extension, not a package gap.

The rest of the gate (R1..R16) is unchanged. **R1's version split is CLOSED:
the upstream published `provident-ssr@0.1.3` on 2026-08-22 (REQ-GAP-9..12
landings verified in the installed dist), so the battery targets 0.1.3 with
no vendored machinery — the "0.1.2 today vs next-version" framing below is
historical only.** The deliverable for this step is
**specifications + design plan only**; TDD implementation is delegated to
later agents.

## Residual watch items for the delegated TestWriter pass

- The cycle variant is data-only (component fields); its render assertions
  sample elements per mechanism layer; no handler body injection needed in
  §5.1 (REQ-GAP-10's addLayer seam rides only the landings/handlers scenarios
  that still carry name-only handlers).
- The path-fork census must never be asserted as `inTree === 4095` (that is
  the runtime clone census); it is `inTree === 23`, `elements === 4095`.
- `hash64`-class digest assertions only over large renders — never the raw
  4095-element fragment string.