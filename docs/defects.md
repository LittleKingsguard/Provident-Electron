# Provident-Electron — Active Defect / Requirement-Gap List

Maintained by the document-archival loop (AGENTS.md item 6). This is the
implementation-test catalogue: defects and requirement gaps discovered while
consuming `provident-ssr` (the npm package whose source lives in the adjacent
`Preempt-Providence` folder). Open gaps on top; PUBLISHED and RESOLVED rows
(with their dispositions) below. THIS PROJECT DOES NOT FIX THE
PACKAGE — every row is a handoff candidate to the upstream project (see
`docs/HANDOFF.md`).

Naming: `REQ-GAP-<n>` — a requirement gap, documentation gap, or missing
convenience for an MCP/Electron (or general non-DOM) host. Observed symptom →
reproduction → suspected root cause → proposed fix shape (upstream-owned).

## OPEN

**THIS TABLE IS THE PACKAGE-GAP CATALOGUE — and one row below is not a package gap, so
read the caveat first.** The file's catalogue rule (`docs/defects.md:3-9`: a defect or
requirement gap in `provident-ssr`) still governs **every upstream-owned row**; a row that is
**HOST**-owned is recorded here **only so no later pass re-files it upstream**, following the
`R13-HOST-FIX` precedent (`docs/decisions.md:39`). The `LIVE-OP-REJECT` row is
HOST-owned: it is a defect in **this repo's own renderer IPC hop**, **not** a `provident-ssr`
defect, and it therefore goes to **neither** of this file's handoff surfaces —
**no `docs/HANDOFF.md` round**, and **no upstream issue**. **It is no longer in this OPEN
table: filed here OPEN on 2026-09-27, it was FIXED + LIVE-VERIFIED on 2026-09-27 and it now
sits in the `## FIXED (in this repo)` section below, carrying its as-filed history verbatim.**
`UNDO-REDO-DESTROY-STATUS` is the
genuine package row (Round 9, `docs/HANDOFF.md`) — and, after that move, the only row this
table held. **⟶ IT IS NO LONGER OPEN EITHER (2026-09-27, `M-31`): it MOVED to the
`## CLOSED (not reproducible at 0.5.1)` section — the canonical one, below the `## NOT FILED …`
block** — the row's **status half** was measured
unreproducible at the installed `provident-ssr@0.5.1` (the destroy-undo answers **`no-op`**, not
`applied`; `docs/specs/engine-drift-measurements.md` `M-31`, `DRIFTED`), so its as-filed claim is
discharged by the engine's own resolve guard. **This table is therefore EMPTY today — no package
gap is open in this repo.** The caveat above still governs anything filed here later.

| ID | Defect (as filed) | Observed symptom / repro | Suspected root cause | Proposed fix shape (upstream-owned) |
| --- | --- | --- | --- | --- |
| _(none — the last open package row, `UNDO-REDO-DESTROY-STATUS`, moved to `## CLOSED (not reproducible at 0.5.1)` on 2026-09-27; see that section for its as-filed text, the corrected root cause and the residue)_ | — | — | — | — |

## CLOSED — POINTER ONLY: the canonical section sits below the `## NOT FILED …` block

**The canonical `## CLOSED (not reproducible at 0.5.1)` section is further down this file** (below
`## NOT FILED BY THE 2026-09-27 ENGINE-PIN AMENDMENT …`) and carries: the section's convention, the
row's as-filed text, its own **"RE-VERIFIED STILL OPEN against `provident-ssr` 0.5.1"** clause
retained verbatim with the supersession note, the **corrected root cause**, the measured reality,
the **disposition + the flip note** and the tracker routing. **Read that section, not this pointer.**
*(Why a pointer rather than the section in two places: `UNDO-REDO-DESTROY-STATUS` is the only row
that ever lived in `## OPEN`, and two copies would let a later pass read one row twice — the row
table lives in exactly ONE place.)*

**The section's convention is stated once, in the canonical section below** — not repeated here, so
the two copies cannot drift apart. **In one line:** a row lands here only when a **re-measurement at
the installed pin** shows the filed claim is **not reproducible** (the defect was **delivered by the
engine**, not fixed here), the old text is **annotated, never deleted**, and **no upstream issue, no
`docs/HANDOFF.md` round and no host change is owed** — at most an **optional upstream dead-code
cleanup**. **This differs from `## FIXED (in this repo)`** (HOST-owned, fixed in this tree) **and
from `## RESOLVED BY UPSTREAM`** (an upstream release fixed the filed defect).


## NOT FILED BY THE 2026-09-27 ENGINE-PIN AMENDMENT — and why (state this explicitly so no later pass re-files them here)

The `provident-ssr` 0.2.1 → 0.5.1 amendment (architect ruling A-d2) **adds NO new
package-defect row**, and that is a checked conclusion, not an omission — **and the
2026-09-27 A-d4…A-d8 amendment adds none either** (its eight doc-drift findings are this
repo's own claim drift: host-owned, `AGENTS.md` item 6 discipline; the `setCaptureProvider`
finding is fixed here if it needs a host fix). **The only edits this file has taken from the
A-d4…A-d8 pass are one-line SUPERSESSION annotations on existing rows** (the version-bound
"install has NOT been performed" clause below), **never a new row.** The two
gaps the recon surfaced are **not** package defects and do not belong in this
file (this file is the **package**-gap catalogue — `docs/defects.md:3-9` above;
host findings follow the `R13-HOST-FIX` precedent, `docs/decisions.md:39`):

1. **The `removeAttribute` / boolean-attribute gap is a HOST-owned HARNESS gap — and it is
   now CLOSED.** The upstream engine calls `element.removeAttribute(...)` on real call paths
   (three sites reachable at the pre-retarget `^0.2.1` pin:
   `node_modules/provident-ssr/dist/core/adapters.js:120`, `:187`, `:194`; a
   fourth plus the `BOOLEAN_ATTRS` set at 0.5.1) and **this repo's `src/shared/dom-shim.ts`
   did not implement it then** (it had `setAttribute`/`getAttribute` only, `:30`,`:41`).
   The **shim is host-owned test code**, not the package: the engine's behaviour is
   correct, the harness was incomplete. **Fixed here, never handed off** — the scoped
   `H-r7` completion + the shape-only prop-mutation guard
   (`docs/decisions.md` `SHIM-COMPLETION-CARVE-OUT`, `ENGINE-PIN-VALUE-SLOT-CLEAR`,
   `ENGINE-PIN-SHAPE-ONLY-PREDICATE`). **LANDED and green** (`src/shared/dom-shim.ts`
   `removeAttribute(k)` clears the `id` slot + store, and — for `INPUT`/`TEXTAREA` — the
   `value` slot + store; `hasAttribute` is still deliberately NOT added), so a later pass
   must **not** re-file it or re-open the completion: deleting `removeAttribute` is now the
   one revert that would re-open a crash, and no rollback may take it with the guard
   (`docs/specs/engine-pin.md` §2.2 item 7, §5.4).
2. **The `inert` gap is CLOSED BY THE PIN, not created by it.** `inert` is a member
   of the engine's closed boolean-attribute set as of 0.4.1/0.5.1 `(engine recon)`,
   so there is nothing to request upstream — the capability exists. The residual
   `inert`/a11y work is a **documentation** request that stays with the fork's
   `PS-1` stream, and the focus-trap half stays refiled (`docs/pending.md`).

**No genuine package defect with a symptom / reproduction / suspected root cause /
proposed fix shape is recorded in the amendment's source material, so no row is
added.** If `U-ENGINE-DRIFT` or a later unit's adversarial pass surfaces one, it
lands here + in `docs/HANDOFF.md` in that unit's own pass (`AGENTS.md` item 7) —
and the package is still never patched from this repo.

**⟶ UPDATED 2026-09-27 (`U-ENGINE-DRIFT`'s measurement pass, `M-31`):** that unit **did** surface
something here — not a **new** row, but a **correction to the one row this file carries**.
`UNDO-REDO-DESTROY-STATUS` was re-measured at the installed `0.5.1`: its claimed `applied`
status is **not reproducible**, its claimed fall-through mechanism is **unreachable**, and the row
has therefore moved to this file's `## CLOSED (not reproducible at 0.5.1)` section. **No new row
was added** (consistent with the paragraph above) and **no upstream issue is owed** beyond the
optional dead-code cleanup the CLOSED row records.

## CLOSED (not reproducible at 0.5.1) — as-filed text retained, nothing owed upstream

**Convention:** this section holds rows that were filed in this file and are **no longer
reproducible at the current pin** — the defect was **delivered by the engine** rather than fixed
here. Distinct from `## FIXED (in this repo)` (HOST-owned, fixed in this tree) and from
`## RESOLVED BY UPSTREAM` (an upstream release fixed the filed defect). A row lands here only with
a **re-measurement at the installed pin** naming the route that makes the claim unreachable; the
old text is **annotated, never deleted**, and its own proposed fix shape is checked against the
current engine behaviour. **No upstream issue, no `docs/HANDOFF.md` round and no host change is
owed** for a row in this section — at most an **optional upstream dead-code cleanup**, recorded in
the row as residue.

| ID | Defect (as filed) | Observed symptom / repro (as filed) | Suspected root cause (as filed) | Proposed fix shape (as filed, upstream-owned) |
| --- | --- | --- | --- | --- |
| **UNDO-REDO-DESTROY-STATUS** *(filed 2026-08-26 by the journal-endpoint adversarial pass; **moved here from `## OPEN` on 2026-09-27** by `U-ENGINE-DRIFT`'s measurement pass — `docs/specs/engine-drift-measurements.md` `M-31`, `DRIFTED`)* | `Supervisor.undo()` of a `destroy` entry (a G14 PINNED NO-OP) reports `status:'applied'` with an empty `scheduledDirtied` and an unchanged graph — a silent false-success. | `apply({kind:'destroy', node})` then `undo()` → the report is `{status:'applied', scheduledDirtied:[]}` and the render is unchanged. An MCP host surfaces `status:'applied'` verbatim, so an agent cannot tell a real undo from a no-op — exactly the "no-op must never be silent" trap (docs/FORKER.md §4 J4). Repro: `tests/journal-endpoint.test.ts` J-adversarial destroy-undo. | `supervisor.js:1477-1479` — the destroy branch does nothing (no inverse, no dirtied ids) then falls through to `return this.report('applied', dirtied)` (:1577). The G14 pinned-no-op contract says destroy-undo is a no-op, but the report says `applied`. **(Those are 0.2.1-era dist lines: at `0.5.1` the branch sits at `:1549-1551` and the fall-through at `:1649` — see the annotation below.)** | `undo()` should return `status:'no-op'` for a `destroy` entry (matching the G14 pinned-no-op contract), or expose a `destroyed` hint so a host can distinguish a no-op from a real inverse. **⟶ THIS SHAPE IS NOW THE ENGINE'S BEHAVIOUR at `0.5.1` (`status:"no-op"`), which is why the row is closed.** |

**The row's own "RE-VERIFIED STILL OPEN against `provident-ssr` 0.5.1" clause — retained verbatim
(it moved here with the row) and SUPERSEDED in place, so the wrong reading stays auditable.**

> **RE-VERIFIED STILL OPEN against `provident-ssr` 0.5.1 (2026-09-27, the engine-pin
> amendment's `H-r12` obligation).** The version move does **NOT** resolve this row.
> The destroy-undo branch is **still an empty no-op** in 0.5.1 and it **still falls
> through to `report('applied', …)`** — so the false-success reporting shape survives
> the upgrade unchanged (evidence attributed to the engine recon, which read the 0.5.1
> dist; the branch's corrected 0.5.1 line numbers are recorded in `docs/HANDOFF.md`
> Round 9 and differ from the 0.2.1-era lines cited above). **One honest qualification:**
> the **upstream repo classifies the no-op itself as contract-correct** (its own
> adversarial pass recorded destroy-undo as a probe PASS), while the **`applied` status
> is unaddressed** upstream — i.e. the two repos do **not** disagree about the branch,
> only about whether the reporting shape is a defect. That is why this row **stays OPEN
> here** rather than being closed as a false positive. `tests/journal-endpoint.test.ts`'s
> J-adversarial comment stays accurate. **Revisit condition:** the upstream returns
> `status:'no-op'` (or a `destroyed` hint) for a destroy entry.
>
> **⟶ SUPERSEDED (2026-09-27, `M-31`) — the clause above is CORRECTED, not deleted.** The
> **`applied` half was wrong**, and so was the *"still falls through"* mechanism: measured at the
> **installed `provident-ssr@0.5.1`**, `undo()` of a `destroy` entry reports
> **`status:"no-op"`** (empty `scheduledDirtied`, `baseBoundary:false`, the target list identical
> before and after — `docs/specs/engine-drift-measurements.md` `M-31`, verdict **`DRIFTED`**). The
> engine's **resolve guard** returns first (`dist/core/supervisor.js:1536-1538`), because `destroy`
> deleted the node (`:1066`) — so the `destroy` branch (`:1549-1551`) **and** the
> `return this.report('applied', dirtied)` fall-through (`:1649`) are **unreachable for a destroy
> entry**, and the **silent-`applied` false-success is not reproducible at `0.5.1` by any route**.
> The **behaviour** half of the as-filed claim (no-op, empty `scheduledDirtied`, unchanged graph)
> holds; its **reported status does not**. The row's **own proposed fix shape** (*"`undo()` should
> return `status:'no-op'` for a `destroy` entry"*) **is now the engine's behaviour** — disposition
> **`CLOSED as delivered-by-the-resolve-guard`** (this section's annotation below carries the
> corrected root cause, the residue, the flip note and the tracker routing).

**The annotation — the corrected root cause, the residue, and the tracker routing (2026-09-27,
`M-31`).** The as-filed row is retained verbatim above and is read **together with** this note.

- **Measured reality (installed `provident-ssr@0.5.1`, on the PERMITTED route only):** `destroy
  verdict {"status":"applied","dirtied":["node-7"]}` · **`undo-of-destroy status "no-op"`** ·
  `scheduledDirtied []` · `baseBoundary false` · the graph unchanged (`target-list-length [7,7]`,
  the target list identical before and after) — taken through the **host `Runtime` path** (the
  `Runtime.journal` reading, which the host copies through verbatim;
  `docs/specs/engine-drift-measurements.md` `M-31`). **The status is `no-op`; the as-filed claim
  says `applied`.** The **behaviour** half of the claim holds; the **reported status does not.**
  **One correction-pass qualification, so nothing here rests on a forbidden reading:** the record's
  *engine-direct* half (`supervisor.undo()` reached through the private `Runtime.supervisor`) is
  **STRUCK by the record's own correction pass as `INVALID` for the §3.2 class-4 private-surface
  reason** — its value **agreed** (`no-op`, recorded as an observation) but it is **not evidence**,
  and **the `DRIFTED` verdict rests on the permitted reading alone.** **This row therefore cites no
  engine-direct value.**
- **Corrected root cause (a READ of the installed dist file, not a call through it):** `undo()` pops the
  `destroy` entry and then the **resolve guard returns first** —
  `node_modules/provident-ssr/dist/core/supervisor.js:1536-1538`:
  `const resolved = !node.destroyed && this.nodes.get(node.id) === node ? node : (this.nodes.get(node.id) ?? null); if (!resolved) return this.report('no-op', new Set())`.
  A `destroy` **deletes** the node (`:1066` — `this.nodes.delete(target.id)`), `node.destroyed` is
  true and the map entry is gone, so `resolved` is `null` and the guard returns. **The `destroy`
  branch (`:1549-1551`) and the `return this.report('applied', dirtied)` fall-through (`:1649`) are
  therefore UNREACHABLE for a destroy entry** — the as-filed mechanism (*"still falls through to
  `report('applied', …)`"*) cannot fire. The adjacent upstream source agrees
  (`../Preempt-Providence/src/core/supervisor.ts:1597-1598` guard vs `:1608-1609` branch, `:1696`
  fall-through).
- **Disposition: `CLOSED as delivered-by-the-resolve-guard` (recommended and APPLIED).** The row's
  own proposed fix shape **is the engine's behaviour**, so the defect is discharged by the engine and
  nothing is owed upstream beyond dead code. **NOT taken:** keeping the row `OPEN` re-worded as a
  dead-code cleanup. **FLIP NOTE (so the architect can reverse this cheaply):** if the live-work form
  is preferred, the alternate honest disposition is **`OPEN — upstream dead-code cleanup only`**, and
  the change is confined to this row's disposition heading — the measured reality, the corrected root
  cause, the residue and the `docs/HANDOFF.md` Round 9 wording all stand either way. **No assertion
  was edited to match the measurement** (`docs/specs/engine-drift.md` §6 stop condition 7 did not
  fire).
- **THE ONLY LIVE RESIDUE — (i) dead code, (ii) a stale in-tree comment (routed, NOT edited):**
  **(i)** the now-**dead** `destroy` branch at `dist/core/supervisor.js:1549-1551` and the
  **unreachable** `return this.report('applied', dirtied)` at `:1649` — an upstream tidy-up, optional,
  with **no behavioural defect attached**; **(ii) `tests/journal-endpoint.test.ts:116-118` carries a
  comment that repeats the stale claim** (*"the engine currently reports 'applied' with an empty
  scheduledDirtied for a destroy-undo"*) — **it is a TEST file, it was NOT edited by this pass, and
  its assertions (`toHaveProperty('status')` etc.) are correct and unchanged.** **NOTE routed here so
  it is not lost:** the comment's wording is stale, its **assertion is not**, so a later test-side
  pass may re-word the comment with the `M-31` reference — **no assertion may be weakened or
  strengthened to do it**, and nothing is owed by this pass.
- **Tracker routing (all landed this pass):** `docs/pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS`
  (corrected) · `docs/HANDOFF.md` Round 9 (corrected — the upstream-facing copy) ·
  `docs/specs/engine-drift.md` §3.3.5 `M-31` + §8 (restatement corrected, no normative clause
  amended) · `docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1` (the decision).

## RESOLVED BY UPSTREAM (provident-ssr 0.2.1, 2026-08-26)

| ID | Defect (as filed) | Resolution in 0.2.1 | This repo's verification |
| --- | --- | --- | --- |
| **UNDO-REDO-REPORT (J1)** — `Supervisor.undo()`/`redo()`/`replay()` return `void` and the `undoStack`/`redoStack` are private, so an MCP/Electron host cannot faithfully report status / dirtied / stack-top-kind after a journal op (cannot distinguish "work done + which nodes touched" from "silent no-op", nor know the next undoable/redoable op or the condensed-base boundary). | **FIXED (0.2.1, commit `be11b2e`)** — `undo()`/`redo()`/`replay()` now return an `UndoRedoReport` (`{ status: 'applied'|'no-op'|'base-boundary', scheduledDirtied, stackTopKind?, redoTopKind?, baseBoundary }`) + read-only stack accessors (`undoDepth`/`redoDepth`/`undoTopKind`/`redoTopKind`/`undoBaseBoundary`). `scheduledDirtied` is the markPass2-SCHEDULED (pending-flush) set; a host awaiting settled states must `await flush()` + `takePass2States()`. Spec `../Preempt-Providence/docs/specs/undo-redo-report.md` (DECIDED). | **This repo bumped to `provident-ssr@^0.2.1` (2026-08-26); typecheck clean — that verification statement is version-bound and is SUPERSEDED BY A-d2: the pin is moving to `^0.5.1` (`docs/decisions.md` `ENGINE-PIN-0.5`), and the re-verification at the new pin belongs to `U-ENGINE-PIN`/`U-ENGINE-DRIFT` (the install has NOT been performed; `package.json:23` still reads `^0.2.1`).** **⟶ SUPERSEDED BY A-d4…A-d8 (2026-09-27): the install HAS been performed** — `package.json:23` reads **`^0.5.1`**, the lockfile resolves **`provident-ssr-0.5.1.tgz`**, and the installed copy reports **`0.5.1`** (all read 2026-09-27); `U-ENGINE-PIN` is **`DONE` (2026-09-27) — COMPLETE on every leg it declares** (suite **789 passed / 2 skipped / 0 failed**, typecheck clean, build clean, battery **184 checks / 0 failures**, **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`** on the post-change tree; the pre-change `9/0` run and the sandboxed SIGTRAP are **superseded**). **The re-verification statement at the new pin has therefore been DELIVERED for the envelope layer**; the **residual** belongs to `U-ENGINE-DRIFT` (the behavioural re-baseline — `R-16`/`R-17` are **forward pins on `0.5.1`**, not a pre/post comparison, `docs/pending.md` §C). The journal-endpoint proposal's J1 reshape is unblocked — the host can now report `status`/`scheduledDirtied`/`stackTopKind`/`baseBoundary` faithfully. |

## RESOLVED BY UPSTREAM (provident-ssr 0.2.0-rc.4, 2026-08-25)

| ID | Defect (as filed) | Resolution in 0.2.0-rc.4 | This repo's verification |
| --- | --- | --- | --- |
| **ISO-ADV-D (X13)** — `translateNodeData` `data.children` recursion drops `graphScope`, so an isolated graph's children fall into `DEFAULT_SCOPE` (an isolation leak + the rc.3 cross-graph guard rejects `state-slice` on them) | **FIXED (0.2.0-rc.4, commit `d1691cd`)** — threaded `graphScope` into the `data.children` recursion (`translate.ts:1046`), matching the def-children :835 + template/content-children :1117 sites. One-line fix as filed. | `tests/secure-panels.test.ts` (group-toggle) + `tests/isolation-adversarial-e2e.test.ts` (pane mutation/teardown) pass again; `tests/isolation-adv-d.test.ts` (1) asserts an isolated graph's child carries the scope (not resolvable from the default/app scope, resolvable from its own). **9/9 + 1 green.** |



## RESOLVED BY UPSTREAM (provident-ssr 0.1.5, 2026-08-24)

| ID | Gap (as filed) | Resolution in 0.1.5 | This repo's verification |
| --- | --- | --- | --- |
| **DEFECT-JOURNAL-UNDO** | `Supervisor.undo()` reverted only `attach`/`destroy`/`rows-mint`; a `state-slice`/`detach`/`clone-instance` undo was a silent no-op. | **FIXED (0.1.5)** — `undo()` now inverts `state-slice` EXACTLY (the journaled `sliceLayers` → removeLayer per id, hooks `hookUndo` anchor restore, `markPass2` + E2E-3 consumer walk; per-inverse try/catch, destroyed/missing silent). `detach`/`move`/`clone-instance`/`layer-apply`/`placement-attach`/`rows-clear` are now **DOCUMENTED NO-OPs** (the G14 per-kind table, ops.md §6 — each with its parked fact-set for a future user-gated pass), NOT silent gaps. | `tests/journal-reversibility.test.ts` O1 asserts state-slice undo reverts; O5/O7 assert the documented no-op pins. 9/9 green. |
| **DEFECT-JOURNAL-REPLAY-APPEND** | A `state-slice append` replayed against an already-appended array grew it (`["x"]`→`["x","x"]`→`["x","x","x","x"]`). | **FIXED (0.1.5)** — replay() now gates a state-slice whose recorded `sliceLayers` all exist (the OO-2 idempotency pattern); a replayed append never grows. `redo()` is no-journal (one entry per op, no double-undo). Clone-instance replay gates on the recorded `minted` set resolving live. | `tests/journal-reversibility.test.ts` O2/O2b/O3 assert replay idempotency. **9/9 green.** |


## RESOLVED BY UPSTREAM (provident-ssr 0.1.4, 2026-08-24)

| ID | Gap (as filed) | Resolution in 0.1.4 | Reference |
| --- | --- | --- | --- |
| **DEFECT-SSR-REMOVE** | `SSRFragmentAdapter` retained removed/destroyed elements in the serialized fragment (the adapter-parity battery P6 probe) | **FIXED (0.1.4)** — `SSRFragmentAdapter.removeEl` now detaches the fragment from its parent's `children` array, nulls its parent, purges it from `created`, and rematerializes the parent (dist/core/adapters.js:397-424) — mirroring `DomAdapter.removeEl` (PAR-5/SSR-F4 parity). The adapter-parity battery S5 now reports "SSR drops the destroyed element (parity recovered)" (73 checks, 0 failures). | handoffs-review-3.md (2026-08-23), the adapter-parity battery `docs/specs/adapter-parity-battery.md` + `docs/specs/adapter-parity-greens.md` |

## PUBLISHED (provident-ssr 0.1.3) — Round 4 / REQ-GAP-9..12

Answered by the upstream's three-agent gate
(`../Preempt-Providence/docs/specs/handoffs-review-2.md`, user rulings
2026-08-21/22) with reshapes landed in the WORKING TREE and **PUBLISHED in
provident-ssr 0.1.3** (verified in the installed dist: `createLinkHub`,
`evictDestroyedNode`/`destroyedRefs`, `markCascadeExplicit`). These rows are
the UPSTREAM dispositions; the battery's workarounds are now droppable in
favor of the published surfaces.

| ID | Gap (as filed) | Upstream disposition (published 0.1.3) | This repo's response |
| --- | --- | --- | --- |
| **REQ-GAP-9** | No public `LinkConfigNameHub` factory / no documented `loadState`→graph construction | **PASS-WITH-RESHAPE** — `createLinkHub()` exported (`translate.ts:185`, the barrel) + `LinkConfigNameHub` type barrel-export; the `node.ts:463` seed hub threading; the corrected 4-step recipe in serialize.md/contract.md (loadState → `new Node(d, hub)` template-first → `reconcileParentTargets(nodes)` → `supervisor.registerNode` per node, ONE hub shared). CAVEAT (user ruling): component-bearing docs → `translateLegacy(doc, {hub})`; `serializeSlice`→`loadState` is snapshot/restore-only (def-less/seam-less — rows-mint on reseed throws `rows-prototype-unresolved`; def-prototype round-trip parked). | PUBLISHED in 0.1.3 — the battery uses the exported `createLinkHub()` (no vendored hub). A1 first-class loads for component-bearing docs use `translateLegacy(doc,{hub})` (the recipe caveat). |
| **REQ-GAP-10** | No sanctioned handler-BODY-by-name injection | **PASS-WITH-RESHAPE (doc-only)** — the addLayer seam is sanctioned for PRE-MOUNT prototype/out-of-tree body setup (the fork-stress pattern); in-tree live injection uses the journaled `state-slice handlers` / `layer-apply` (function bodies per the RUNTIME-WRITE BODY LETTER); prefix rules (`slice-`/`hook-` reserved; `handler-seam` excluded from reverse); the hooks delimiter (value providers → managed channel ONLY; bodies → layer surface); D16 append-with-override precedence + clone inheritance WITHOUT teardown. `registerHandlerBody` REJECTED (eval-gate contamination). | PUBLISHED (doc-only) — the battery's pre-mount prototype injection is the sanctioned addLayer seam (import the upstream demo body + a guard test). |
| **REQ-GAP-11** | No `Supervisor` reset/unregister; destroyed nodes accumulate | **PASS-WITH-RESHAPE** — the self-evicting sweep: `finalizeDestroyed` EVICTS finalized nodes from `registered`/`byId`/`contentNodes`/`mintedByLayer` + the supervisor's `this.nodes` (the `destroyedRefs` tombstone keeps `getNode` resolution). Retention/`runtimeMinted` + in-tree/prototype nodes are untouched (the permanent-owner gate). `reset()`/`prune()`/`unregisterNode` REJECTED as new surface (wrong predicate; process-wide hazards). RequestId-per-scenario noted (the dedup window is per-supervisor; reusing a requestId across scenarios echoes stale reports — the battery uses fresh requestIds). | PUBLISHED in 0.1.3 (`evictDestroyedNode`/`destroyedRefs`) — the registry no longer grows across the battery's teardowns; the battery still asserts `inTree`/mount only (version-stable discipline, not a compromise). |
| **REQ-GAP-12** | No single clear-children op (per-child destroy loop) | **PASS-WITH-RESHAPE** — the destroy-CASCADE trigger flag: an explicit-destroy recurses EXPLICIT family children, SKIPPING placements + `'component'`-token prototypes, and routes `runtimeMinted` children to `markDestroyed` retention. The `clear-children` op REJECTED (the cascade flag fixes the real root cause — `finalizeDestroyed`'s content exemption — without a new op). **Per-child destroy STAYS the pinned teardown for fork-stress** (clones are runtimeMinted → retention; prototypes are skipped). User ruling: cascade applies to explicit children, skipping placements + component prototypes. | PUBLISHED in 0.1.3 (`markCascadeExplicit`) — the cascade handles plain family trees; fork-stress teardown keeps the per-child loop (runtimeMinted retention + prototype skip). |

## RESOLVED BY UPSTREAM (provident-ssr 0.1.1 / 0.1.2, 2026-08-21)

| ID | Gap (as filed) | Resolution in 0.1.x | Reference |
| --- | --- | --- | --- |
| **REQ-GAP-8** | `renderProducingProcess` (the canonical re-emit loop) cannot thread the opt-in `nodeIdAttribute` | **PASS (0.1.2)** — `renderProducingProcess(actionable, nodeById, adapter, prevMap, renderOptions?)` now accepts the optional `renderOptions` and threads it to `emitElements`; `{ nodeIdAttribute: true }` stamps `data-node-id`, default undefined = byte-identical render. Ownership rules unchanged (caller owns prevMap, destroy-prune, caller drain, on-demand). THIS HOST NOW ADOPTS THE CANONICAL LOOP (the explicit emit-with-options loop is removed). | upstream decisions.md REQ-GAP-8 row (2026-08-21), ssr-synthetic-event.md §2.4/§4 |
| **REQ-GAP-1** | Inline handler bodies default MODERN; the legacy `(event, context)` stub is not the synthetic-event default | **PASS-AS-DOCUMENTED** — handlers.md/translate.md FORMAT MARKER pins the split; ssr-synthetic-event.md §2.3 gained the "inline defaults modern" sentence. No runtime format field on `HandlerDef` (deliberate). | handoffs-review §3.1, translate.md FORMAT MARKER |
| **REQ-GAP-2** | Runtime lookup is nodeId/wire-scoped; css.id is a render attribute only | **PASS-WITH-RESHAPE** — host-side only (by design). ssr-synthetic-event.md §2.2 pins: css.id→node is host-side, css.id is a SET (non-unique), a host index excludes destroyed/unplaced/prototype. NO engine lookup surface. | handoffs-review §3.2, ssr-synthetic-event.md §2.2 |
| **REQ-GAP-3** | Two id vocabularies + auto-mint collide in emitted HTML | **PASS-WITH-RESHAPE** — DEFECT #28 (auto-mint excluded from reverse; `json-out = json-in` restored), precedence documented (`css.id > authored props.id > mint`), and the opt-in `renderOptions: { nodeIdAttribute: true }` stamps `data-node-id` on every emitted element (DOM + SSR) — the element→graph traceability seam this host adopts. | handoffs-review §3.3/§A, DEFECT #28, ssr-synthetic-event.md §4 |
| **REQ-GAP-4** | `dispatchEvent` returns no apply/dirtied info; host derives it from the journal | **PASS** — the shared `Supervisor.dispatchAndReport(target, event, options, ...args): Promise<{results, dirtied}>` lands (additive; `dispatchEvent` unchanged). `dirtied = apply().dirtied ∪ keys(takePass2States())` (bounded, non-draining). Opt-in bounded `requestId` dedup (synchronous registration, echo semantics). This host adopts it. | handoffs-review §3.4/§C, ssr-synthetic-event.md §3 |
| **REQ-GAP-5** | Dispatch never re-renders; the re-emit loop is host-built boilerplate | **PASS (0.1.1 + 0.1.2)** — `renderProducingProcess(actionable, nodeById, adapter, prevMap, renderOptions?)` exported from core (per-tree prevMap ownership, destroy-prune, caller drain, on-demand/P4 untouched) + the public `Supervisor.flush()` deterministic settle (D2). The 0.1.2 `renderOptions` threading closes the REQ-GAP-8 residual. | handoffs-review §3.5/§B, ssr-synthetic-event.md §2.4 |
| **REQ-GAP-6** | `DomAdapter` requires a DOM at construction | **CLOSED-ALREADY-ADDRESSED** — documented (adapters.md, contract.md); non-DOM hosts route to `SSRFragmentAdapter` + producing-process graph. | handoffs-review §3.6 |
| **REQ-GAP-7** | Strict CSP silently skips function-STRING handler bodies | **PASS-WITH-RESHAPE** — distinct `handler-body-eval-blocked` warn code (EvalError / "Refused to evaluate" / CSP signature) branched before `handler-body-invalid`; translate.md/handlers.md pin that function-SOURCE bodies require `'unsafe-eval'` and hosts must read `TranslatedTree.warnings`. NOTE (environment constraint, not package-fixed): the renderer still needs `'unsafe-eval'` for function-source bodies (new Function is the data format); the fix makes the failure DETECTABLE, not avoided. | handoffs-review §3.7, translate.ts `handler-body-eval-blocked` |

## FIXED (in this repo)

**Convention:** this section holds rows that were filed in this file but are **HOST-owned** —
i.e. defects fixed **here**, never handed off (`## OPEN`'s caveat; the `R13-HOST-FIX`
precedent, `docs/decisions.md:39`). The former placeholder — _"(none this pass — the battery
plan is gated (docs/FORKER.md §4 R1-R16) and the 0.1.2 adoption is verified; no open gaps
remain.)"_ — is **SUPERSEDED**: a host row has since been filed and fixed. Table shape mirrors
the `## RESOLVED BY UPSTREAM` sections (ID · as filed · disposition · verification).

**PROVENANCE OF THE LEG NUMBERS BELOW (stated so no later pass over-reads them):** the five leg
results and the live probe line are the **fix pass's recorded measurements**, supplied to the
2026-09-27 documentation pass that wrote this row as its evidence. **That documentation pass ran
no leg** (its tool wall is read/search + doc writes — no shell). It verified **statically** only:
the landed hunk + its comment (`src/renderer/renderer.ts:43`), the `export` seam (`:14`), the
untouched-raw `load` route (`:35`), the unchanged tool schema (`src/main/mcp-server.ts:651`) and
the **6 row ids** in `tests/op-command-unwrap.test.ts` (`S1`/`S2`/`S3`/`F1`/`F2`/`S1b`).
**A later pass with a shell should re-run the five legs to make them first-hand.**

| ID | Defect (as filed) | Disposition (HOST-owned) | Verification (in-node + live) |
| --- | --- | --- | --- |
| **`LIVE-OP-REJECT`** *(filed OPEN 2026-09-27 by the `U-ENGINE-PIN` supervisor pass; **FIXED + LIVE-VERIFIED 2026-09-27**)* | Over the live app's IPC/MCP route, **the `provident.op` tool answers `{status:'rejected'}` for EVERY command shape** — including well-formed ones — while the in-process `Runtime` route applies the identical call. Discovered by the unit's live leg; the engine's `malformed-op` refusal is correct, the **payload handed to it is not**. **PRE-EXISTING, and NOT a `U-ENGINE-PIN` regression:** `src/renderer/renderer.ts` was **UNTOUCHED** by that unit (`git log -1` = `715a923`, pre-unit) and the defect sits on the **IPC hop**, a layer that unit never exercised. **HOST-owned → no `docs/HANDOFF.md` upstream row exists for it and no upstream issue is owed** (this file's `## OPEN` caveat; the `R13-HOST-FIX` precedent, `docs/decisions.md:39`). | **AS FILED — established by reading the code, not inferred:** `src/main/battery-host.ts:50` **unwraps** the tool payload (`this.runtime.op(p.command)`) but the renderer's IPC handler did **NOT** — the **pre-fix** `src/renderer/renderer.ts:38` passed the **RAW args object** into `Runtime.op` (`value = runtime.op(req.payload)`, i.e. `{command: <cmd>}`), which forwards it to `applyCommand`, whose `cmd.kind` is then **`undefined`**, so the engine refuses a malformed op. The MCP tool schema registers the argument as **`command`** (`src/main/mcp-server.ts:651`), and the SDK **rejects a bare command object** ("MCP error …"), so the **wrapped shape is the only one reachable** over the transport — i.e. the broken route was the only route. **Independent of `U-ENGINE-PIN`:** the rejection comes from the engine's **malformed-op path**; that unit's `mutationPropsValid` predicate is **kind-scoped** and therefore **never runs** for `kind: undefined`. **THE LAYER NOTE (kept): the envelope layer was never broken — the defect lived on the IPC hop**, which is why every node-suite/battery `PA-*`/`P*` row was green while the app was not. *(Anchor moved by this fix: the `op` route is now `src/renderer/renderer.ts:43`; `:38` is the pre-fix line and must not be cited as current.)* **LANDED (2026-09-27)** — the one-line host unwrap in the `op` case of `handleRequest`, **`src/renderer/renderer.ts:43`**: `value = runtime.op(((req.payload as { command?: unknown })?.command ?? req.payload) as never)`, with a comment naming the defect id and the `?? req.payload` fallback. **No other route changed:** `load` deliberately stays **raw** (`src/renderer/renderer.ts:35`) because the `provident.load` schema puts its fields at the **top level** (`src/main/mcp-server.ts:650`: `kind`/`envelope`/`doc`/`commands`/`userData`) — pinned by a **new row** (`S3`), so no later pass "fixes" `load` by analogy. **TESTABILITY SEAM (a production-surface change that is part of this fix, one keyword):** `export` added to `handleRequest` (`src/renderer/renderer.ts:14`) so the handler is reachable from a test without booting the browser entry — no body/semantics change, and the module's import-time side effects are guarded. | **REPRODUCTION (as filed):** on the **post-change** tree (the same tree whose `R13 RESULT: 9 checks, 0 failures` leg is green), `graph` group enabled, **six** shapes were all `{status:'rejected'}`: `mutation:[]`; a **defined** `props.title` write; a `content` write; an unknown `kind`; no `node` key; an unknown `node`. Probe commands (outside the repo): `node /tmp/engine-pin-live/op-variants2.mjs` (the **wrapped** shape, reachable over MCP) and `/tmp/engine-pin-live/ab-op.mjs` (A/B — Electron vs the shim battery host, same command object). The shim battery host applied the identical call: `{"status":"applied","dirtied":["node-3"]}`. **IN-NODE — `tests/op-command-unwrap.test.ts` (NEW file, 6 rows in the node suite):** **`S1`** is the **RED row that pinned the defect** — pre-fix it failed verbatim with `expected { command: { kind:'state-slice', … } } to be { kind:'state-slice', … }` (the wrapped `{command: CMD}` was reaching `runtime.op`); **`S2`** pins the **non-destructive fallback** (a bare payload passes through unchanged — a naive unwrap without `?? req.payload` fails it); **`S3`** pins that the **`load` route stays raw**; **`F1`/`F2`** are the fail-safe rows (a throwing `op` → `{ok:false,error}`; an unknown method → `{ok:false,error:'unknown method: …'}`); **`S1b`** pins that a successful op still emits **exactly one** app-graph-changed push. **LIVE — the decisive evidence, measured AFTER the fix on the rebuilt app:** the **same probe that produced the defect** now returns **`{"status":"applied","dirtied":["node-1"], …}` for BOTH wrapped shapes**, where it returned **`{"status":"rejected"}` before** (real Electron, hermetic scratch profile, `--disable-dev-shm-usage`). The tool's **registered schema is unchanged**, so a **bare** command object is still rejected by the SDK at the MCP layer (`MCP error …`) — the wrapped shape is the only reachable one, which is why the **renderer-side unwrap is the correct fix**. **LEGS AFTER THE FIX (all recorded by the fix pass):** `npm test` **56 files / 795 passed / 2 skipped / 0 failed** (was **789 + 2 skipped** before the new file) · `npm run typecheck` clean · `npm run build` clean · `npm run battery` **184 checks / 0 failures** · the divergence leg still green (**`R13 RESULT: 9 checks, 0 failures`**). |

## DOC-CONSISTENCY FINDINGS (2026-08-23 — the gemma4 blind battery)

These are NOT package gaps (no `provident-ssr` defect; the engine + host code
are consistent). They are THIS-REPO documentation defects that sent the blind
writer (`docs/specs/gemma4-blind-battery.md` → `tests/gemma4-blind-battery.test.ts`)
to wrong assertions, and one ground-truth defect in the companion
`docs/specs/gemma4-blind-expected.md`. All fixed in the same pass (the
docs below were corrected; the review record is archived (gitignored) — the
corrected artifacts are the active `docs/specs/gemma4-blind-battery.md` +
`docs/specs/gemma4-blind-expected.md`).

| ID | Doc artifact (line) | Doc claim | LIVE behavior (probed 2026-08-23) | Class | Disposition |
| --- | --- | --- | --- | --- | --- |
| D1 | `battery-handlers-greens.md` H1 (20–24) | anon S1a rendered HTML **IS present** `dropdown-menu` (the component-def node emits it) | anon render has **NO** `dropdown-menu` — `AUTH_INIT_BODY` destroys the dropdown child (kids[1]) and destroyed nodes are pruned from the emit | CODE-CONSISTENCY (doc vs live) | greens corrected; `gemma4-blind-expected.md` S28 corrected (same claim) |
| D2 | `gemma4-blind-expected.md` S16 (35) | cycle d12 DOM view emits **4096** `data-node-id`, SSR **4095** (root adds one) | DOM **4095**, SSR **4095** — the root does NOT add a `data-node-id` occurrence in the DOM view (it carries the attr once as a node, and 4095 path-states is the full set) | CODE-CONSISTENCY (expected-map wrong; the greens/spec 4095 claim is right) | expected map corrected to 4095/4095 |
| D3 | `runtime-host.md` §3.3 + `runtime-host-greens.md` R4 #14 (F2) | an unknown op `kind` → `{status:'rejected'}` (implied for ANY op) | `op({kind:'bogus', node:<valid>})` → `{status:'no-usable-state'}` — the engine returns `no-usable-state` for an unhandled kind on a RESOLVED node; the host's `rejected` guard covers only the unknown-kind path with NO resolvable node | DOC-COMPLETENESS (the `no-usable-state` verdict is never named; the rejection vocabulary is imprecise) | runtime-host.md §3.3 + greens note the split |
| D4 | `runtime-host-greens.md` R2 (5–6) + battery S2 | "load `userEnvelope()`" | `userEnvelope` is NOT defined/pinned anywhere in the read-set — the fixture the scenario depends on is absent; a blind writer must reconstruct it from prose | DOC-COMPLETENESS | greens note the fixture is not pinned |
| D5 | `runtime-host.md` §2/§3.4 + battery S8 | `validateExport`/`validate` both named; `treeSigMatch` implied a field on the round-trip | `validateExport` returns `{valid, censusMatch, warnings}` (NO `treeSigMatch`); only the MCP `validate()` wrapper adds `treeSigMatch`. A reader can't tell which returns what | DOC-CLARITY | runtime-host.md pins the two signatures |
| D6 | battery S10/S11 (`teardown` vs `teardownResult`) | "after `teardown()` (or `await teardownResult()`)" then read `.inTree` | `teardown()` returns a bare `Census`; `teardownResult()` returns `{census, renderedHtml, warnings}`. `load()` returns `{census, …}` not a bare Census. Reading `.inTree` off the wrapper is a mis-assertion | DOC-CLARITY (return shapes never pinned) | greens + battery note the wrapper shapes |
| D7 | battery S26 / `mcp-endpoint.md` §3.1 `args` | `args?` (no array pin) | `dispatch` spreads `...args`; a non-array `args:'light'` becomes chars → `themeName="l"`; only `args:['light']` bakes `"light"` | DOC-CLARITY | mcp-endpoint.md pins `args` as an array |
| D8 | battery S13/edge `listTargets` root id | (implicit) root nodeId `'0'` | root `nodeId` is `'0'` and has NO authored `cssId` (D2/H2-correct) | PASS (no defect) | — |
| D9 | battery S22/S23 + runtime-battery greens | `codeSet`/`codeDelete` after a plain constructor boot | the constructor's `{envelope:}` option does NOT populate the CRUD `this.envelope` — `codeSet` throws `no envelope loaded` until a `loadEnvelope`/`load`. The greenspace implies a prior load but never states the constructor path | DOC-COMPLETENESS (minor) | runtime-host.md §2 notes the CRUD envelope is only set by load paths |
| D10 | battery edge + `mcp-endpoint.md` §3.1 | unknown-target → "tool error" | `dispatch` throws `unresolved target: {"kind":"cssId","cssId":"nope"}` (wording `/unresolved target/`, not `/unresolved node target/`) | DOC-CLARITY | mcp-endpoint.md pins the message shape |
| D11 | `runtime-host-greens.md` R5 #21/#22 + `gemma4-blind-expected.md` S10 | teardown mount is "root-only — `mount.innerHTML` is the root's own serialization, NOT `''`" | after `teardown()` the mount is **EMPTY** (`innerHTML === ''`, inTree === 1) — the root element is NOT re-emitted; `tests/runtime-host.test.ts:157` asserts `innerHTML === ''` | CODE-CONSISTENCY (doc vs live) | greens + expected map corrected to `''` |

## SUPERSEDED / ARCHIVED

_(none.)_

**This section's own status — read it with the line above (added 2026-09-27 by the
repo-wide documentation audit).** The placeholder says "none", which is correct **about this
section** — but it is **not** a claim that nothing in this file is superseded: this file's
supersession convention is the **in-place `⟶ SUPERSEDED` annotation** on the row or clause
concerned (e.g. the `UNDO-REDO-DESTROY-STATUS` row's retained-and-annotated *"RE-VERIFIED STILL
OPEN against `provident-ssr` 0.5.1"* clause in `## CLOSED (not reproducible at 0.5.1)`, the
`## RESOLVED BY UPSTREAM (0.2.1)` row's version-bound verification clause, and the *"(none this
pass …)"* placeholder in `## FIXED (in this repo)`), so **no row is copied into this section and
the two cannot drift apart.** Two conventions in one file is a hazard for a fresh reader, so it is
stated rather than left implicit.