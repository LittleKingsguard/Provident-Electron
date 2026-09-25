# Spec — `U-ENGINE-PIN`: the `provident-ssr` `^0.2.1` → `^0.5.1` retarget + the scoped shim completion + the host-side prop-mutation guard

Status: **SPEC — AMENDED 2026-09-27** (the `H-r4` contract for unit `U0` of the amended
shell-chrome plan, re-issued after the adversarial pass and the architect's four rulings:
§2.3 pass-through, §2.4a the pane-fixture/testability ruling, §2.1/§5.3 the accepted
dependency jump + the divergence leg, §3b the AF-1..AF-11 fold-in).
**Amendment block 5 (2026-09-27, post the SECOND red cycle)**: the supervisor adjudicated
the second red cycle's **9 failures** (`101 pass / 9 fail` of the amended **110-row** set —
`docs/next-steps.md`'s `## DONE — U-ENGINE-PIN` record's red/green prose, read; the count lives
there and in that file's `CURRENT WORK` block's historical-ledger paragraph) into five
dispositions (`docs/next-steps.md`'s `## HANDOVER UPDATE 2` five-row adjudication table,
read — rows `1`/`2`/`3`/`4`/`5a`/`5b`);
**three are spec amendments landed in this file** — §3.4 **`PA-6` rewritten** to the
engine's auto-mint reality (the `props.id` route **cannot** remove; `PA-7`'s `css.id` route
can), §2.3's **kind-scope** claim corrected (predicate-scoped to both studied kinds, the
engine verdict for a mutation-carrying `layer-apply` **NOT PINNED**), and the **NEW
§2.4a.1** baseline-persistence clause (+ its §5.1 item 5 hunk) that `PF-2`/`PF-4` need —
all three listed in the §8 index. **AMENDMENT BLOCK 6 (2026-09-27, the THIRD red cycle — the
last red pair `PF-2`/`PF-4`) then DISPROVED §2.4a.1's diagnosis and re-diagnosed the pair:
the pane loop already persists its baseline; the owed change is the `value`-slot clear inside
the EXISTING `ShimElement.removeAttribute` (NEW `§2.2.1`), authorised by the architect**, with
the `PF-2`/`PF-4` observable now **PINNED** (`el.value === ''`) — see the block-6 note below
and the §8 index. The other two dispositions are **TEST-ONLY** and change
nothing here (§8's amendment-block note). **The §2.4a.1 hunk as ORIGINALLY written is NOT
landed and is NOT owed** — its diagnosis was **DISPROVED by the Implementer's live traces and
adjudicated in AMENDMENT BLOCK 6** (below, + §8): the pane loop **does** persist
`this.prevMap`, the removal op **is** emitted and applied, and the residual is the
`ShimElement.removeAttribute` **`value`-slot** clear, now **authorised and required** as
§2.2.1. A `PF-2`/`PF-4` green taken on the old clause's reasoning is a **false green**; a
green taken on §2.2.1 + §2.4a.1 (as amended) is the real one.
**Unit status: `DONE` (2026-09-27) — COMPLETE on every leg this spec declares, the divergence
leg included; adversarial findings folded in; nothing is owed on the contract.** Measured on the
final tree: `npm test` **55 files / 789 passed / 2 skipped / 0 failed** *(the DONE-pass count — **⟶
56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**, which
added `tests/op-command-unwrap.test.ts`; the other four legs re-measured unchanged)*; `npm run typecheck`
clean; `npm run build` clean (5 bundles); `npm run battery` **184 checks / 0 failures**;
**`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`** (the repo's own driver, run by the
supervisor on the **post-change** tree **after landing the harness spawn fix** —
`--disable-dev-shm-usage` + a fresh scratch `--user-data-dir`, a **harness** change outside
§5.1's diff scope; `docs/decisions.md` `DIVERGENCE-SPAWN-FIX`). The blind greens set is
**104 rows — 96 PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE** and the per-unit documentation review
(`AGENTS.md` item 10d, RCA-6) **HAS run**: `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`
(findings landed in the trackers; the DONE row is `docs/next-steps.md`'s `U-ENGINE-PIN` DONE
record). **One live finding was recorded OUTSIDE this unit's scope and is now FIXED + LIVE-VERIFIED
(2026-09-27):**
**`LIVE-OP-REJECT`** — over the app's IPC/MCP hop `provident.op` refused every command shape
(the renderer's IPC unwrap of the **wrapped** MCP payload; `src/renderer/renderer.ts` is
**untouched** by this unit, so the defect is **PRE-EXISTING and NOT a regression of this unit**).
It was filed as a **HOST-owned** defect in `docs/defects.md` (fix shape + adjudication:
`docs/decisions.md` `LIVE-OP-REJECT-IS-A-HOST-DEFECT`, now annotated **CLOSED**; the fix row is
`LIVE-OP-REJECT-CLOSED`) and the fix **landed** in `src/renderer/renderer.ts:43` —
`runtime.op(((req.payload as { command?: unknown })?.command ?? req.payload) as never)` — pinned by
the new node-suite file `tests/op-command-unwrap.test.ts` (**`S1`** the RED row that pinned the
defect; **`S2`** the non-destructive `?? req.payload` fallback; **`S3`** `load` stays raw;
**`F1`/`F2`** the fail-safe rows; **`S1b`** one app-graph-changed push) and **re-verified live**:
the probe that produced the defect now answers `{"status":"applied","dirtied":["node-1"], …}` where
it returned `{"status":"rejected"}`. **It never blocked this unit:** the
declared legs do not exercise that route, and the `R13` battery never calls `provident.op`, so
the `9/0` leg is **silent** on it. **The layer note does not change: the envelope layer was never
broken — this defect lived on the IPC hop.** The live leg's verdict record is
`docs/specs/engine-pin-live-status.md` — **now the FINAL green state, not
`BLOCKED-with-signature`**. Source: `docs/specs/provident-electron-shell-chrome-handoff-review.md` —
blocking reshape **`H-r7`** (the amended verification layer: `ShimElement.removeAttribute`
as a scoped harness completion + a red-first `HOST-OP-REJECT`-shaped prop guard) with
`H-r5` (no browser-emulation expansion) and `H-r10` (the divergence-harness precondition);
architect amendment **A-d2** ("Update for provident version"); the decisions ledger row
`docs/decisions.md:55` `DECIDED: ENGINE-PIN-0.5` and `docs/decisions.md:57`
`DECIDED: SHIM-COMPLETION-CARVE-OUT`; the amended unit plan's **`U0`** row
(`docs/next-steps.md` — **the row MOVED out of `## OPEN` on 2026-09-27: it is now that file's
`U-ENGINE-PIN` DONE record** ("`## DONE — U-ENGINE-PIN`"), whose `## OPEN` table keeps only a
provenance row naming the move; **re-resolved by the DONE pass**, previously re-resolved
2026-09-27 by the unit's documentation review from the pre-review `:104`, which itself was
re-resolved earlier from the pre-amendment `:60`);
the `HOST-OP-REJECT` precedent (`docs/decisions.md:42`) and
`R13-HOST-FIX` (`docs/decisions.md:39`); the `UI-RENDERED-WITH-PROVIDENT` constraint
(`docs/decisions.md:53`, `AGENTS.md:23-34`); the engine recon's `removeAttribute` /
boolean-attribute findings, adjudicated in the gate record's
"Amendment corrections to the engine recon" block. The unit is a **host-side**
retarget + harness completion + a host guard: **no package edit, no upstream edit, no
`node_modules/provident-ssr/` edit** (`AGENTS.md` goal 1, item 7).

## Layer declaration (read this before any table below)

> **ANCHOR CONVENTION (added 2026-09-27 by the `U-ENGINE-PIN` proofreader pass — read this
> before resolving ANY citation in this file).** **Section names and row ids are the PRIMARY
> KEY; line numbers are ADVISORY.** Every `§X:NNNN` / `file:NNNN` anchor an earlier pass wrote
> into this file recorded the documents as they stood **at that pass**; because this spec's
> amendment blocks are appended and superseded **in place**, those numbers drift on every later
> edit and **must not be used as addresses**. Resolve by the section and row (`§3.6` `M9`,
> `§5.5` `P-SM-2`, `§2.2.1` item 3, `§4.2`'s pane-vocabulary bullet) — those cannot drift.
> **This pass converted every line anchor inside this file's own amendment tables to that form**
> (the anchors it could verify in one read) and **dropped the ones whose section was already
> named in the same cell**; a surviving `:NNNN` in this file is a dated, advisory snapshot only.
> **The dated line measurement lives in `docs/specs/engine-pin-greens.md`'s
> "LINE-NUMBER FREEZE + remap" block**, which carries the date of its measurement **and this
> file's line count at that date** — that block is where a reader who genuinely wants a line
> number should look. **Code-file anchors** (`src/**`, `node_modules/**`, `tests/**`,
> `scripts/**`) are a different class: they are read against the tree by the pass that cites
> them and are not part of this convention.

> **AMENDED 2026-09-27 (the architect's rulings on the unit's four open points, after
> the adversarial pass).** `U-ENGINE-PIN` is **no longer DOC-LAYER only**: the pin, the
> shim completion and the guard all landed and went green on their declared legs; this
> amendment rewrites the contract those landed halves must now satisfy. The four binding
> rulings and where each lands:
>
> | Ruling (architect, verbatim-in-substance) | What it changes | Anchors |
> | --- | --- | --- |
> | **1. "Pass removals through."** A nullish/absent `value` on `props.<key>` / `css.<key>` (or the colon twin) is a legitimate attribute REMOVAL and must be **applied**, not rejected; the safety is the shim completion (`H-r7`), **not** a host rejection. The host guard is **malformed-SHAPE validation only**, over the **command surface** (handler-originated writes are outside it — the honest boundary). The AF-6 restriction is **REMOVED**. | §1.3, §2.3, §2.4, §3.4, §3.5, §3.6, §3.7, §4.1 (`R-6`/`R-11`/`R-12`), §5.5, §3a/§3b, §6, §7 | §1.3 · §2.3 · §2.4 · §3.4 · §3.6 · §3.7 · §4.1 `R-6`/`R-11`/`R-12` · §5.5 |
> | **2. "Add test panes to the suite for testability."** The pane-managed channel gets a **test pane fixture** that drives it with a defined *and* a nullish value; `R-13` is **no longer "not executable"** and becomes the pane-fixture rows (`PF-1..PF-8`). | §2.4, §2.4a, §2.4a.1, §4.1 `R-13`, §5.1, §5.2, §5.5 `P-SM-3`, §7.9 | §2.4a · **§2.4a.1** · §4.1 `R-13` · §5.1 · §5.2 · §5.5 `P-SM-3` |
> | **3. "Accept dependency jump."** The install's `electron ^33.4.11→^44.4.5`, `esbuild ^0.24.0→^0.28.2`, `vitest ^2.0.0→^5.0.1` moves are ACCEPTED (the pre-existing 658 tests / 2 skipped still pass under vitest 5 — **reported**), and **`npm run divergence` on the Electron-44 stack is now a leg of this unit** (in flight; a red is a unit finding). | §2.1, §5.1, §5.3 leg 6, §4.4, §5.4, §6 stop 8 | §2.1 · §4.4 · §5.3 leg 6 |
> | **4. Fold the adversarial pass's other findings (AF-1..AF-11) into the text.** Forward pins, not byte-identity (AF-1/AF-2); the covered attribute spellings (AF-5); the absent-`value` reconciliation (AF-7); the `ALL_TOOLS` count-freeze re-parameterisation (AF-9); the §5.1 "four vs six" correction + the status lines (AF-11). | §0, §2.3, §3.4, §4.1, §4.3, §4.4, §5.1, §5.2, §5.3, §5.5, §3b, §8 | §0 · §4.1 `R-15`..`R-17` · §5.1 · §8 · §3b |
>
> **Two genuine spec defects are also corrected in place** (found by the TestWriter /
> Implementer against the landed tree): the predicate/namespace text must name the
> engine-effective **`css.<key>`** (§2.3), and §4.3's ledger shape records the
> **actual observed** pre-completion `TypeError` blast radius rather than the predicted
> split (§4.3). **Nothing here is `DONE`**: the per-unit documentation review
> (`AGENTS.md` item 10d) has **not** run, and the divergence leg's result was **not
> known** when this amendment was written.
>
> **AMENDMENT BLOCK 5 (2026-09-27, the second red cycle's three spec-half adjudications).**
> The supervisor's dispositions of the second red cycle's 9 failures
> (`docs/next-steps.md`'s `## HANDOVER UPDATE 2` five-row adjudication table, read) that land
> in THIS file, each with the anchors it moved:
>
> | Adjudication | What it changes | Anchors |
> | --- | --- | --- |
> | **#2 — the `props.id` auto-mint reality** (test-only relabel + this spec amendment) | §3.4 `PA-6` rewritten: the `props.id` route is **applied but does NOT remove** the `id` attribute (`ensureAutoIds`, `node.js:1908-1912`, runs at `compileLocal` `:1009-1010`, so the adapter's `removeAttribute('id')` branch is never reached); `PA-7`'s `css.id` route (`elem.id = ''`, `adapters.js:216-218`) is the route that **does** remove, and the contrast is now explicit. `G6`'s superseded mechanism phrase is marked superseded. | §3.4 `PA-6`/`PA-7` · §3.4 `G6` · §4.1 PA-6 row |
> | **#3 — the `layer-apply` kind-scope verdict** | §2.3's kind scope stated exactly: the predicate is kind-scoped at the **PREDICATE** level to BOTH studied kinds (`runtime.ts:425`), the **ENGINE VERDICT for a mutation-carrying `layer-apply` is NOT PINNED** (`supervisor.js:1188-1225`: `unknown-node`/`malformed-op`, no `mutation` shape). §3.5 `P7b` added; §5.5 `P-TP-1` restated. | §2.3's kind-scope bullet · §3.5 `P7b` · §5.5 `P-TP-1` |
> | **#5b — the pane baseline persistence** (NEW CLAUSE + one production hunk) | **§2.4a.1**: the pane render cycle MUST carry the diffed baseline across cycles (the `Runtime` `prevStates`/`prevMap` pattern), so a removal op reaches the pane's shim element; `PF-2`/`PF-4`'s observable + fail-state stated; §5.1 item 5 carries the hunk. **SUPERSEDED IN PART BY AMENDMENT BLOCK 6 (below): that DIAGNOSIS was disproved on the landed tree — the pane loop already persists the baseline and the removal op is emitted and applied; the residual is the shim's `value`-slot clear, now authorised as §2.2.1.** | **§2.4a.1** · §2.4a `PF-2`/`PF-4` · §5.1 item 5 |
>
> **The two TEST-ONLY dispositions (#1 the `css.role: null` row; #4 `P-SM-1`'s `renderedHtml`
> read route) change nothing in this file** — recorded here so no later pass invents spec
> text for them (§8's amendment-block note). **The §2.4a.1 hunk is NOT yet landed; this pass
> is the SPEC half only.**
>
> **AMENDMENT BLOCK 6 (2026-09-27, the THIRD red cycle: the `PF-2`/`PF-4` pair — the LAST red
> pair of `U-ENGINE-PIN`). The Implementer DISPROVED `§2.4a.1`'s diagnosis with live traces,
> and the architect adjudicated the conflict.** This block is the SPEC half of that ruling.
> What was disproved, in one line: the clause argued the pane render loop **drops the diffed
> baseline** so an emitted removal op never reaches the element — **measured on the landed
> tree, the baseline IS persisted** (`src/renderer/secure-panels.ts:226`, `:398`, `:400`, read:
> a typed field, passed in and re-assigned from the loop's own return, exactly as
> `Runtime` does at `src/renderer/runtime.ts:192-194`), the removal op **IS** emitted
> (`{kind:'set', wire:'node-21', name:'prop:value', value:undefined}`) and **IS** applied —
> the adapter reaches `elem.removeAttribute('value')`
> (`node_modules/provident-ssr/dist/core/adapters.js:296-298`, read) and the serialized
> `value` attribute **is** gone after the write. The **real** residual is the one the clause
> declared out of scope: `ShimElement.removeAttribute(k)` special-cases only `id`
> (`src/shared/dom-shim.ts:54-61`, read), so it clears `value` from the attribute store but
> not from the `value` **slot** (`src/shared/dom-shim.ts:14`, read), which the adapter writes
> directly on the form-control path (`dist/core/adapters.js:203-208`, read) — leaving
> `el.value === '7'` while `getAttribute('value') === null`.
>
> | Ruling (architect, verbatim-in-substance) | What it changes | Anchors |
> | --- | --- | --- |
> | **A. "The `value`-slot clear inside the EXISTING `ShimElement.removeAttribute` is AUTHORISED and REQUIRED."** It is the same species as the method's existing `id` special case, and it is what makes the `PF-2`/`PF-4` rows' observable true. **Completion of the one admitted method, NOT a new shim member**: `H-r7`'s "only `removeAttribute`" ruling (`docs/decisions.md:57`, read) STANDS and the §0 six-prohibition block still holds — **no new member, no new DOM capability, no vocabulary, no content, no default, no store, no MCP surface.** The prior text's boundary ("an actively-cleared slot is a NEW contract question") is OVERRULED. | **§2.2.1 (NEW: the `value` special case)** · §2.2 items 4/7 · §2.4a.1 items 3/4 (SUPERSEDED diagnosis + OVERRULED boundary) · §2.4a.1 items 1/5 (the required behaviour + the observable) · §3.2 (the value-state rows) · §5.1 item 3 | **§2.2.1 (NEW, re-read this pass)** · §2.2 item 4 · §2.4a.1 · §3.2 (the `value` rows) · §5.1 item 3 |
> | **B. "§2.2 / §2.2.1 must carry the contract"**, in the same table shape as the `id` row `§3.2` already has: form-control `value` slot written **and** attribute serialized ⇒ `removeAttribute('value')` clears **BOTH** ⇒ `el.value === ''` **AND** `getAttribute('value') === null` **AND** `outerHTML` no longer contains `value="7"`; untouched slot (the `''` default) ⇒ idempotent no-op, no throw; a **NON**-form-control tag ⇒ the existing store-only behaviour, i.e. scoped **exactly as narrowly as the adapter's `VALUE_FORMS` path** (read: `dist/core/adapters.js:19-25` + `:315-318`). | **§2.2.1 (the state table + the scope statement)** · §3.2 (two rows) · §5.1 item 3 | **§2.2.1 (NEW)** · §3.2 (the `value` row) |
> | **C. The honest semantics note (recorded, NOT over-claimed).** The real DOM does **not** clear a *dirty* input's `.value` on `removeAttribute('value')`; this shim is a synthetic harness and its rule is stated as **the shim's own contract** (a removal makes the serialized form and the readable value agree), **NOT** as a claim about `HTMLElement`. | **§2.2.1 item 4 (one sentence, so no later pass reads it as browser behaviour)** | **§2.2.1 item 4 (NEW)** |
> | **D. The `PF-2`/`PF-4` observables are PINNED, not "recorded-not-pinned".** The rows assert `el.value !== '7'`, `el.value === ''` and the serialized attribute absent; the clause now pins `el.value === ''` as the observable. | §2.4a `PF-2`/`PF-4` cells · §2.4a.1 item 5 (observable table) — the hedge is removed **where it now conflicts**, and kept for `PF-3`'s `String(null)` form, which this ruling does not touch | §2.4a `PF-2`/`PF-4` · §2.4a.1 item 2 |
> | **E. §5.1's diff scope must list the added shim hunk exactly** (item 3's `src/shared/dom-shim.ts` entry: the same one method, whose **body** now includes this special case — **no new item**), item 5's pane entry **stays as-is**, and `§5.2`'s `tests/dom-shim-remove-attribute.test.ts` row is reconciled so the new regression row for the special case is **contract-backed** (the Implementer adds it under that file). `§5.5`'s property register: **no row is affected** — the new contract is a **plain state row** (`§3.2` + the `R-10` sibling), not a register row. | §5.1 item 3 · §5.2 (the `dom-shim-remove-attribute` row) · §5.5 (the change summary) | §5.1 item 3 · §5.2 (the `dom-shim-remove-attribute` row) · §5.5 (the block-6 summary) |
>
> **ONE TEST-SIDE READING IS REPORTED, NOT SILENTLY RECONCILED (see §8's block-6 note and
> this pass's report).** Ruling D pins `el.value === ''` for `PF-2`/`PF-4`, and the LANDED
> rows already assert exactly that (`tests/host-guard-panes.test.ts:321-326`, `:349-351`,
> read: `el.value` is `''`, `el.value` is not `'7'`, and the `value` attribute is not `'7'`).
> **The one reading this pass could NOT settle from the spec side is `PF-1`'s landed
> assertion** (`tests/host-guard-panes.test.ts:290-293`, read), which asserts
> `attrsOfPropsId(...).has('value') === false` — **no `value` attribute at all** after a
> **defined** write — on the recorded argument that a `VALUE_FORMS` tag takes the property
> path and never gets a `value` attribute. That argument is **supported by the engine read in
> this pass** (`dist/core/adapters.js:315-318`, read: `attr === 'value' && VALUE_FORMS.has(...)`
> ⇒ `elem.value = bakeValue(val)`, i.e. a **property** write), and it is **consistent** with
> ruling D (`PF-2`'s `el.value === ''` + `getAttribute('value') === null` can both hold while
> `PF-1`'s attribute was never written). **What it does mean is that §2.2.1's attribute half
> can only be exercised by a DIRECT shim row** — the new `tests/dom-shim-remove-attribute.test.ts`
> row (§5.2) seeds `setAttribute('value','7')` **and** the slot itself — and **§2.4a.1 item 2
> says so explicitly.** This spec may not edit `tests/**`; the reconciliation (if the
> TestWriter judges one is owed) is the TestWriter's, and **the contract text below is written
> to rulings B/D and does not assert any row's current byte form.**
>
> **AMENDMENT BLOCK 7 (2026-09-27, the ADVERSARIAL-PASS RECONCILIATION — the SPEC half).** The
> unit is **green on its own declared legs** (`npm test` 782 passed / 2 skipped / 0 failed;
> typecheck clean; build clean; battery **184 checks / 0 failures**) — and, in parallel, the
> **adversarial reviewer** and an **independent BLIND re-run of the greens set**
> (`docs/specs/engine-pin-greens.md`, rewritten against THIS amended contract: **100 rows — 90
> PASS / 6 FAIL / 4 NOT-BLIND-RUNNABLE**) each **measured** clauses this contract words wrongly
> or leaves unpinned. **A green unit is not a correct contract**: this block is the spec half of
> that reconciliation, and nothing here re-opens a landed behaviour, weakens an assertion to fit
> the code, or invents a production surface. The nine dispositions, plus the reconciliation pass's
> `B-LANDED` status follow-up to item **B**, each with the anchors it moved:
>
> | # | What was measured / ruled | What it changes | Anchors |
> | --- | --- | --- | --- |
> | **A** | **The pane seam's `applied` field is WRONG as documented.** §2.4a's option table defines only the `false` branch; the landed method returns `applied: true` for **every** shape-valid call (`src/renderer/secure-panels.ts:299-305`, read: `applied: true` on the call that forwards the engine's status). Measured: `applyPaneMutation('no-such-node', [{targetProp:'props.value', value:'7'}])` ⇒ `{status:'rejected', applied:true}`; the blind layer observed the identical value (`PF-1b`, `docs/specs/engine-pin-greens.md` §2.8's pane-row table, read). **Ruling: `applied` means "the ENGINE applied it" — `applied === (status === 'applied')`; a refusal is never reported as applied.** | §2.4a's injection-point row (SUPERSEDED shape) + **NEW §2.4b** (the pinned two-branch return shape, the **three** reachable outcomes, the reachable engine-refusal causes) + §4.2 + §7.9 | §2.4a's injection-point row (SUPERSEDED note in the cell) · **§2.4b (NEW)** · §4.2 · §7.9 |
> | **B** | **The pane seam's `mutation` parameter lacks the Runtime's ARRAY guard. *(STATUS-CORRECTED 2026-09-27 by the `B-LANDED` follow-up row below — the guard has SINCE landed; this row is kept as the measurement that produced the requirement.)*** `paneMutationValid` never tests `Array.isArray` (`src/renderer/secure-panels.ts:72-79`, read **at the time of this measurement**), so `applyPaneMutation(id, {} as never)` throws **`TypeError: mutation is not iterable`** — a **THROW** where the contract promises a status (`M8`'s "skip whole, never a throw"). `Runtime` guards the identical call (`src/renderer/runtime.ts:409-414`, read: `!Array.isArray(cmd.mutation)` ⇒ `{status:'rejected'}` for both `state-slice` and `layer-apply`). | §2.4 (the same-class requirement made explicit for the non-array batch) + §2.4b + **NEW row `M9`** (§3.6, sitting with `M2`/`M3`/`M8`) + §4.1 + §5.2 + §5.5 `P-TP-1`'s compensating-rows list | §2.4 · §2.4b item 3 · **§3.6 `M9`** · §4.1 `M9` · §5.2 · §5.5 `P-TP-1` |
> | **C** | **§2.2.1 item 3's scope statement was too narrow about `css.value`, and two attribution sentences were factually wrong.** The adapter's `css:` branch has **no** `VALUE_FORMS` test, so a `css.value` key outside `{id, classes, style, cssDef}` takes `elem.removeAttribute(key)` (`node_modules/provident-ssr/dist/core/adapters.js:214-224`, read this pass — `:224` is that fallback). The landed special case is therefore keyed on the **ATTRIBUTE KEY `'value'`** and the **ELEMENT TAG** (`INPUT`/`TEXTAREA`), **not** on which adapter branch arrived: `prop:value` (`:296-298`, read) and `css.value` (`:214-224`) both reach it; only non-`value` keys and non-form-control tags stay store-only. Also corrected: the two sentences that claimed the shim's `removeAttribute` is *not* reached for the `prop:value` removal — **`:297-298` IS the path a `prop:value` removal takes.** | **§2.2.1 item 3 (the wider landed rule, recorded honestly — the CODE is not narrowed)** + §2.4a `PF-2`'s mechanism note (corrected-with-reason) + §3.2's `value` state row | §2.2.1 item 3 · §2.4a `PF-2` · §3.2's `value` row |
> | **D** | **`PA-10`'s bare-name claim is contradicted by measurement.** The blind run measured a bare `targetProp:'hidden'` / `'title'` as **INERT at the engine level** — `{status:'applied'}` with the attribute present **before and after** — and a **defined** bare-name write (`title:'v'`) is a no-op too, while the `props.title` control on the same node **does** remove (`docs/specs/engine-pin-greens.md` §3a's `F-1` row, read). Grounded: `Node.applySlice` matches only the `props.`/`css.`/`hooks.`/`type`/`content`/`handlers` **prefixes** (`node_modules/provident-ssr/dist/core/node.js:1410-1445`, read: `props.` `:1422`, `css.` `:1427`, `hooks.` `:1432`), so a bare name creates **no layer** and the adapter's fallback branch is never reached with it. | §3.4 `PA-10` (rewritten) + §2.3's covered-spellings bullet (bare name moved OUT of the removal list) + §3b `AF-5` (the same claim corrected) | **§3.4 `PA-10`** · §2.3's spellings bullet · §3b `AF-5` |
> | **E** | **§5.5 `P-SM-2`'s (b)-half asserted a removal the contract elsewhere denies.** Its four-prefixed-spellings row claimed "the attribute absent" — false for `css.<key>` + `null`, which the engine stringifies (`role="null"`). The **supervisor adjudicated this TEST-side** (`docs/next-steps.md`, `## HANDOVER UPDATE 2` table row 1, read: *"`undefined` ⇒ removal per PA-5; `null` ⇒ the stringification"*) and §8's block-5 note called it test-only — **but the register cell was never amended**, so the contract contradicted itself. | §5.5 `P-SM-2` (the (b)-half reconciled to the true per-spelling observables) + §5.5's change summary | **§5.5 `P-SM-2`** · §5.5's block-7 change summary |
> | **F** | **Two claims the blind layer could NOT settle, worded honestly.** (1) §3.5 `P7b` / §2.3 asked for "NOT rejected by the predicate" — **not decidable on the public surface**: a mutation-carrying `layer-apply` **and** the spec's own valid `target`+`nodes` shape **both** return the identical opaque `{status:'rejected'}` (`P7b-ii`, `F-3`, `docs/specs/engine-pin-greens.md` §3a, read), so the predicate-vs-engine attribution is unobservable there. (2) §2.4a documented the seam's first parameter as `nodeId` while §4.2 said the pane fixture addresses pane nodes by their authored `props.id` — and **no documented route converts one into the other**. | §3.5 `P7b` (the decidable half stated; the valid-`layer-apply` verdict explicitly **NOT PINNED**) + §2.3's kind-scope bullet + **§4.2's pane-vocabulary note (the resolution route, decided)** + §7 (the owed public route) | **§3.5 `P7b`** · §2.3's kind-scope bullet · **§4.2's pane-vocabulary bullet** · **§2.4b item 4** · §2.4a's PF-table preamble · §7.11 |
> | **G** | **`docs/specs/secure-panels.md` did not disclose the new public member.** `SecurePanels.applyPaneMutation(nodeId, mutation)` is a new public method (`src/renderer/secure-panels.ts:299`, read) and that spec's surface list (`docs/specs/secure-panels.md:24-36`, read) did not name it. | **`docs/specs/secure-panels.md` §2a (NEW)** — the exact signature/return contract (the amended §2.4a/§2.4b shape), renderer-side only, **not** IPC/MCP-reachable, and the accepted broadening (it can write `content`/`handlers`/`props.*`/`css.*`/`hooks.*` on **any** node of the PANE graph) | `docs/specs/secure-panels.md:24` region + §2a (NEW) |
> | **H** | **Census correction: the `RpcMethod` count.** This spec's §3b `AF-9` carried the stale *"`RpcMethod` 19 → 20"*; the live census is **21** (`src/shared/types.ts:259-280`, read this pass) and is asserted at **21** by `tests/engine-pin-version.test.ts:174-197` (read: the exhaustive `RPC_METHOD_CENSUS` + `expect(… .length).toBe(21)`). The future `provident.focus` tool's move is therefore **21 → 22**. | §3b `AF-9` (the stale clause marked superseded with its reason) | **§3b `AF-9`** · the superseded clause kept verbatim below that table |
> | **I** | **§5.1's diff-scope completeness.** `package.json` gained an `allowScripts` block (`package.json:32-34`, read this pass: `{"esbuild@0.28.2": true}`) that §5.1 item 1's "nothing else authored" claim did not cover. **Which owner it is cannot be established from this tree** (the write is not attributable in-session), so it is recorded as **installer/agent-added with the reason and the unverifiable half stated**, not asserted as pre-existing. | §5.1 item 1 (the `allowScripts` block recorded) + §8 index | **§5.1 item 1** |
> | **B-LANDED** *(status follow-up to item **B** — the requirement landed, so the row's LANDED status is corrected, not the requirement)* | **`M9` is no longer an un-met requirement.** Read this pass: the pane predicate **now CARRIES the array guard** — `paneMutationValid` tests `Array.isArray` as its **first statement** (`src/renderer/secure-panels.ts:81-89`, read: `:82` `if (!Array.isArray(mutation)) return false`, then the `for (const m of mutation)` loop) — and the seam's `applied` field is **derived** (`:334`, read: `return { status, applied: status === 'applied' }`), so `applied === (status === 'applied')` **as item A pinned it**. The seam therefore returns `{status:'rejected', applied:false}` for a non-array batch instead of `TypeError: mutation is not iterable`; the landed harness row drives a **fixed six-shape table** (`{}`, `undefined`, a string, a number, `null`, and a `Symbol.iterator`-throwing Proxy — the last two being the rows a duck-typed check would wrongly admit; `tests/host-guard-panes.test.ts:578-640`, read), and the three `applied`-semantics rows pin outcomes (i)/(ii)/(iii) (`:642-714`, read). **No assertion is weakened and no contract text changes**: item B's *requirement* stands exactly as written; only the "not landed" status is superseded. | §3.6 `M9`'s landed cell + §2.4 + §2.4b item 3/item 5 + §4.1 `M9`'s landed cell + §5.2 + §7.2 + §8 index | **§3.6 `M9`** · §2.4 · §2.4b items 3/5 · §4.1 `M9` · §5.2 · §7.2 · §8 index |
>
> **`DONE` STATE (2026-09-27, the supervisor's DONE pass — supersedes the "nothing here is
> `DONE`" line this block used to carry):** the per-unit documentation review (`AGENTS.md` item
> 10d, RCA-6) **HAS run**, and the **divergence leg IS GREEN on the post-change tree**
> (`R13 RESULT: 9 checks, 0 failures`, after the supervisor landed the harness spawn fix) — so
> the two clauses that stood here ("the review has still not run as of this amendment block";
> "the divergence leg is still **NOT RUN on a live window**", citing
> `docs/specs/engine-pin-greens.md` §4's `DIV-1` row by section because that file's line numbers
> were re-set by the third run) are **both spent**; the greens' `DIV-1` row carries the
> post-change update in place. **The unit is `DONE`**; the one live finding
> (`LIVE-OP-REJECT`) is a **HOST** defect recorded outside this unit's scope — **since FIXED +
> LIVE-VERIFIED (2026-09-27; the landed unwrap + the new `tests/op-command-unwrap.test.ts`
> `S1`/`S2`/`S3`/`F1`/`F2`/`S1b` rows; see the status block at the head of this file)**. **One item is a
> cross-FILE conflict,
> reported rather than silently reconciled:** item H's instruction names *"§5.5/§8-region … the
> `RpcMethod` 19 → 20"* claim, but in this file the stale pair lives in **§3b `AF-9`**
> (cited by section name; the line anchor this parenthetical used to carry drifted and is
> dropped) — §5.5/§8 carry no `RpcMethod` count at all (grep over this file, read), so the
> correction lands in `AF-9` and the §8 index notes it. **`docs/next-steps.md`'s identical
> stale `RpcMethod 19 → 20` was left to the supervisor's reconciliation pass at the time —
> and the doc-review pass has since CORRECTED it there (`## OPEN` row `F3`, `RpcMethod`
> **21 → 22**) together with `docs/decisions.md` `FOCUS-UI-ONLY-MCP-TOOL`.**

1. **State of execution, corrected (was: "nothing has been executed").** The unit's three
   halves **landed** and were run on the legs §5.3 declares: the pin is moved
   (`package.json:23` = `^0.5.1`, read this session), the shim completion exists
   (`src/shared/dom-shim.ts:54-61`, read), the guard exists at both call sites
   (`src/renderer/runtime.ts:425` + `:481-489` and `src/renderer/secure-panels.ts:81-89`
   + `:415`, read **at the pre-block-7 state — the pane predicate's anchor was `:68-85` then,
   read this pass: the `Array.isArray` first statement (block-7 `B-LANDED`) shifted it**) — **and
   since this pass the two pane-seam contract fixes it named have landed too** (the guard +
   the derived `applied`, §2.4b items 1/3/item 5). The pre-change behaviour claims in §4 are now **historical**: they
   describe the tree **before** the completion + guard landed (`0.2.1` dist +
   method-less shim), which is **the tree the red run executed on** (`docs/next-steps.md`,
   `## OPEN` row **A** **(MOVED 2026-09-27: the row is now that file's `U-ENGINE-PIN` DONE record; the `## OPEN` table keeps a provenance row naming the move)** / its `CURRENT WORK` block: "79 assertions / 61 red / 18 green-not-red").
   **This amendment is written
   against the LANDED tree**; every behaviour it asserts is re-derivable there.
   *(SUPERSEDED: the original item 1's "no test was written, no red set was run, no trio
   leg was run, no Electron window booted" — the red set ran, the trio legs were run at
   the greens layer (`docs/specs/engine-pin-greens.md` §5's corroboration block) and this amendment's
   divergence leg is in flight. Why: the unit's halves are landed, so a DOC-LAYER
   declaration would now misdescribe the tree.)*
2. **The architect answered `Q1` (option (a)) and `Q5`'s install route (a).** `U0` may
   land first, `U-ENGINE-DRIFT` may land as a **measurement-only** unit, and the install
   is run by **the architect in an unsandboxed shell**. This spec **states honestly**
   that it cannot perform the install: **no in-session `npm install` is possible** (the
   session's write boundary + disabled approval prompts; escalation under `~/.npm` is
   the unavailable route `Q5(b)`). **The install has since run** (`docs/next-steps.md`,
   `## OPEN` row **A** "install DONE" — **MOVED 2026-09-27 to that file's `U-ENGINE-PIN` DONE record**), and the `0.5.1`-dist citations below are now **read from the
   installed tree** — see item 3 and §2.1.
3. **The `0.5.1` behaviour is now read from the INSTALLED DIST, not the adjacent source.**
   `node_modules/provident-ssr/package.json:3` = `0.5.1` (read this session);
   `node_modules/provident-ssr/dist/core/adapters.js` now carries `BOOLEAN_ATTRS`
   (`:25`), `booleanAttrValue` (`:56`), the `undefined`/`data:`/prop-attr removal paths
   (`:290-291`, `:297-298`) and the boolean branch (`:300-313` DOM, `:520-527` SSR),
   with the SSR delete form at `:512`/`:519`/`:527` (all read this session). The
   **adjacent-source** anchors of the pre-amendment text
   (`../Preempt-Providence/src/core/adapters.ts:292-302`, `:513-519`, `:291`) are kept
   below **marked (recon/adjacent)**, since a later pass may still need them for the
   tarball-vs-source equivalence question. *(Correction to the pre-amendment item 3:
   "the published `0.5.1` dist was NOT fetched, NOT installed and NOT read by this pass"
   — it **is** installed and **is** read now; the equivalence question is closed by the
   install, not left open.)*
4. **The thin-red situation, stated plainly.** There is **no EXISTING test in
   `tests/**` that fails because of the upgrade** — the retarget's own red set is the
   `U-ENGINE-DRIFT` regression net (`docs/next-steps.md`, `## OPEN` row **B** — **MOVED
   2026-09-27 into that file's `## DONE — U-ENGINE-DRIFT` record, whose `## OPEN` table now
   keeps only a provenance row naming the move**; the earlier re-resolution (the queue was
   re-issued with 20 units, so the old `:61` anchor no longer pointed at that row) is history), plus the rows in §4
   ("which are new tests this unit creates"). §4's table is therefore the **whole** of
   this unit's red evidence, and the honest fact that it is thin is recorded, not
   disguised.
5. **One ruled deviation from pure RCA-1 — historical, and its ledger shape is
   corrected in §4.3.** The shim rows (`R-7`, `R-8`, `R-9`, `R-10`) **throw `TypeError`
   before the `removeAttribute` completion exists** (and, before this amendment, the
   guard rows `R-6`/`R-11` shared that mechanism), so the completion had to land
   **first**, and the red set ran against the tree on which **only the shim half** had
   been completed. The gate record rules this explicitly
   ("an explicitly ruled deviation from pure RCA-1, recorded so no later pass calls the
   red set doctored", `docs/specs/provident-electron-shell-chrome-handoff-review.md`
   `U0` row). §4.3 now carries the **observed** ledger shape (the pre-completion
   `TypeError` in the **initial render** takes that render's sibling DOM rows down with
   it — the predicted "clean split" was wrong; defect fix, §8).
6. **The pin HAS moved (was: "the pin has not moved").** `package.json:23` reads
   `provident-ssr: "^0.5.1"` and `node_modules/provident-ssr/package.json:3` reads
   `0.5.1` (both read this session; the install ran — `docs/next-steps.md`, the `## OPEN` row **A** provenance row **(the row MOVED to that file's `U-ENGINE-PIN` DONE record on 2026-09-27)**).
   *(SUPERSEDED: "`package.json:23` reads `provident-ssr: "^0.2.1"` … The pin has **not**
   moved." Why: the architect's install landed; the `0.2.1` state is now the
   **pre-change/historical** tree the red run executed on, cited as such throughout §4.)*

## 0. Contract-prohibitions (the `H-r8` block, asserted for this unit)

`H-r8` owes the six-prohibition table to each **adopted shell-chrome** unit. This unit
is not one of those six, but it is the unit that **moves the pin under all of them**, so
the block is carried here as an explicit non-goal: the retarget must not become the
vehicle for any of the six.

| # | Prohibition (`S-d8`, `(C)#1..#6`) | Assertion for THIS unit | Carried by |
| --- | --- | --- | --- |
| 1 | consumer vocabulary as symbols / enumerated constants | The unit adds no symbol, type, union member, default or documented constant naming a consumer's id/zone/pane/tab/region/token. The retarget changes a version string; the guard adds no exported identifier. | `tests/engine-pin-version.test.ts` (the static seam row) |
| 2 | app UI content authored | No authored text, control, affordance, class taxonomy, slot model or styling is added to **shipped** data. `syncConfig`'s content writes keep their existing authored strings, byte-for-byte (`src/renderer/secure-panels.ts:344-359`, read — the pre-amendment `:316-331` anchor was pre-install drift). The pane fixture's authored envelope lives in `tests/fixtures/` and is **test data**, not a shipped pane (ruling 2, §2.4a). | `tests/secure-panels.test.ts` (existing) re-run, plus the `PF-7` sibling-pane control |
| 3 | policy defaults | The predicate changes no default value, no `DEFAULTS` row, no option default. `maxJournalLength`'s absent-vs-present semantics are unchanged (`null`/absent stay the same "off" state); **and post-amendment the predicate has no value semantics at all** (ruling 1). | `tests/host-guard.test.ts` (the pass-through rows, §3.4/§3.5) |
| 4 | a UI-config store or its own persistence | No store, file, `localStorage` or persistence is added; the retarget writes only `package.json:23` + the lockfile; the guard writes no state. | the `R-14` diff-scope row (§5.1) |
| 5 | a new MCP surface | The unit adds no tool, resource, tool group, `VALID_GROUPS` member, renderer RPC case (`src/shared/types.ts:259`) or `MUTATING_METHODS` entry. **No new IPC method, no new `RpcMethod` member.** The unit's own static rows assert the tool list **by SET**, not by count: `ALL_TOOLS` was **21** names when the retarget landed (`src/main/mcp-server.ts:281-303`, read: 18 `provident.*` + the `module.*` trio) and **`ALL_TOOLS === 21` is a COUNT FREEZE this unit records, not a claim it defends** — see the AF-9 re-parameterisation rule in §3b. | `tests/engine-pin-version.test.ts` (the static seam row), `tests/security-gate.test.ts` (existing, re-run) |
| 6 | an unverifiable criterion | Every row in §4 is falsifiable on a layer this repo owns (the node suite / the battery). The real-DOM half is **not asserted as an attribute row here** — the `H-r10` attribute-presence extractor remains a named precondition for any real-DOM **attribute** row. As of the 2026-09-27 amendment the **divergence leg itself IS a leg of this unit** (ruling 3, §5.3), but it measures the census/SSR/`dirtied`/`data-node-id` **structural** surfaces the script already compares (`scripts/electron-divergence.mjs:143-150`, read) — not boolean-attribute serialization. | §4 (row-by-row), §5.3 leg 6 |

## 1. Scope

Three coupled changes, one unit, one install:

1. **The retarget (A-d2).** `package.json:23` moves `provident-ssr` from `^0.2.1` to
   `^0.5.1`; the lockfile entry is regenerated by the architect's install. This is the
   change that makes `H-r5`'s absent capabilities (`BOOLEAN_ATTRS`, the boolean
   attribute branch) present in an installed dist.
2. **The scoped shim completion (`H-r7`).** `ShimElement.removeAttribute(k)` is added to
   `src/shared/dom-shim.ts` — one method, admitted on a **named engine call site in a
   dist this repo installs** (`node_modules/provident-ssr/dist/core/adapters.js:120`
   (`css:<key>` + `undefined`), `:187` (`data:*` + `undefined`), `:194`
   (bare/`prop:*` + `undefined`) — all read in this session; plus a fourth site at
   `0.5.1` from the adjacent source, `../Preempt-Providence/src/core/adapters.ts:291`,
   read this session).
3. **The host-side shape guard — PASS-THROUGH (ruling 1, 2026-09-27; this REPLACES the
   pre-amendment "reject-on-nullish" guard).** A `state-slice` / `layer-apply` mutation
   whose `props.<key>` / `css.<key>` (or the colon twin `props:<key>` / `css:<key>`)
   target carries an absent / `undefined` / `null` `value` is a **legitimate attribute
   REMOVAL in the engine** and is **APPLIED**, not rejected: the write reaches the
   engine, the attribute is gone from the DOM/SSR output, nothing throws, siblings and
   other props are untouched. **The mechanism that makes that safe is the shim
   completion (`ShimElement.removeAttribute`, `H-r7`, §2.2) — not a host rejection.**
   The guard's remaining scope is **malformed-SHAPE validation only** — a mutation that
   is not an object, a missing/non-string `targetProp`, and (the CONTAINER class) a
   `mutation` that is **not an array** — **clarified 2026-09-27, amendment block 7 item B:
   the non-array batch is refused at `Runtime`'s container guard (`src/renderer/runtime.ts:409-414`,
   read) and the pane seam owes the same class (the new `M9`, §2.4b)** — and it covers the
   **command surface** only: `provident.op` /
   `Runtime.applyCommand` (`src/renderer/runtime.ts:380`, read) and the pane-managed
   channel `SecurePanels.syncConfig` (`src/renderer/secure-panels.ts:338-365`, read).
   **Handler-originated writes are OUTSIDE it** — see §2.3's boundary statement.
   *(SUPERSEDED: "a non-object batch" as the third listed class — why: that phrasing named
   the non-array **container** while describing it as an element-level shape; the container
   class is now named exactly (`M9`) and pinned as the SEAM's obligation too.)*
   *(SUPERSEDED: "A `state-slice` mutation whose `props.<key>` / `css:<key>` target
   carries an absent / `undefined` / `null` value is **rejected** with
   `{status:'rejected'}` … at the two managed channels this repo owns." Why: ruling 1
   — "Pass removals through"; the reject semantics were a capability LOSS the engine
   does not have, and the completion already makes the write safe.)*

**Explicitly OUT of scope (do not implement in this unit):**

- **Any `SCH-n` mechanism** — no region host, gesture session, menu catalog, projection,
  list host or overlay. They are `U2..U7`, gated behind `U0` → `U1`.
- **Any new MCP tool, resource, tool group, `VALID_GROUPS` member, renderer RPC method or
  `MUTATING_METHODS` entry** (`src/main/mcp-server.ts:281-303`,
  `src/shared/types.ts:259`). `ALL_TOOLS` is **21** names in the landed tree (count
  freeze, AF-9 §3b).
- **Any UI-config store, persistence, or settings surface** — including any store that
  would "fix" `syncConfig` by persisting a better value than the channel's own
  last-known-state behaviour.
- **Any wrapping or patching of the ENGINE to widen the guard's boundary** — do not
  wrap `Supervisor`/`clientAPI` (or `ctx.clientAPI.apply`/`ctx.node.receiveNextState`)
  to intercept handler-originated writes. **REJECTED OPTION, recorded** (ruling 1b):
  the engine is off-limits (`AGENTS.md` goal 1 + item 7) and a wrapper would put host
  code inside a render path this unit does not own, breaking `H-r5`'s no-expansion
  rule and the `R13-HOST-FIX` precedent (`docs/decisions.md:39`) without buying a
  falsifiable row. The honest alternative is the **stated boundary** (§2.3).
- **Any other shim member.** `hasAttribute` is **NOT added** (ruling in §2.2); `closest`,
  `querySelector(All)`, `dispatchEvent`, pointer/capture, `matchMedia`, `activeElement`/
  focus walk, `getComputedStyle`, `setProperty` and any render-count seam stay forbidden
  (`H-r5`, `S-d3`, `docs/decisions.md:57`).
- **Any edit to `node_modules/provident-ssr/` or to the upstream tree**
  (`AGENTS.md` goal 1 + item 7). A behavioural difference found after the retarget is a
  **host-side fix** (`docs/decisions.md:39` `R13-HOST-FIX` precedent) or an
  `U-ENGINE-DRIFT` measurement — never a package patch.
- **Any claim about `bodyRuns` / `BARE-TEXT-EMIT`** (`H-r11`), and any new
  `docs/defects.md` / `docs/HANDOFF.md` row (the amendment's "NOT FILED — and why" block,
  `docs/defects.md`'s `## NOT FILED BY THE 2026-09-27 ENGINE-PIN AMENDMENT — and why` block).

## 2. The surface (exact)

### 2.1 `package.json:23` + the lockfile

```jsonc
// package.json:23 — PRE-change (the state the red run executed on)
"provident-ssr": "^0.2.1"
// LANDED (the state this amendment is written against)
"provident-ssr": "^0.5.1"
```

- **The dependency jump is ACCEPTED by the architect (ruling 3, verbatim:
  "Accept dependency jump").** The single install moved, alongside the `provident-ssr`
  `^0.2.1 → ^0.5.1` retarget: **`electron` `^33.4.11 → ^44.4.5`**, **`esbuild`
  `^0.24.0 → ^0.28.2`**, **`vitest` `^2.0.0 → ^5.0.1`** (`package.json:25-31`, read this
  session: `electron ^44.4.5`, `esbuild ^0.28.2`, `vitest ^5.0.1`). These `devDependencies`
  moves are the **installer's** doing, not authored edits of this unit — §5.1's diff
  scope below is therefore amended to say so. **The pre-existing suite still passes under
  vitest 5**: **658 tests / 2 skipped (reported)** at the pre-jump baseline; the greens
  layer measured the post-jump suite at **"55 files / 789 passed, 2 skipped, 0 failed"**
  (`docs/specs/engine-pin-greens.md` §5's command block, read — the third blind run; the same file's
  superseded second-run status line recorded a **"54 files / 737 passed, 2 skipped"** count that
  **can no longer be located in that file** — the claim is REPORTED, and the citation is kept by
  section, never by line). *(The two
  counts are different layers of the same suite — 658 is the architect-reported pre-jump
  baseline, 789 is the third blind run's measurement after the unit's own new files landed;
  neither is a claim this spec verified in-session.)*
- **The install has RUN** (architect-owned; `docs/next-steps.md`, the `## OPEN` row **A** provenance row **(the row MOVED to that file's `U-ENGINE-PIN` DONE record on 2026-09-27)** "install
  DONE"). What this spec now reads as fact: `package.json:23` = `^0.5.1`;
  `node_modules/provident-ssr/package.json:3` = `0.5.1`; the installed dist carries the
  boolean branch (§3.3 is re-cited to the installed `dist` in §Layer declaration item 3).
- The only **declarative dependency** edit of this unit is the version in that one
  dependency line. No `scripts` entry, `exports`, `files`, `engines` or `type` changes
  (`package.json:6` `"type": "module"` is untouched — the package stays ESM-only,
  `docs/decisions.md:30`). The `devDependencies` **values** moved with the installer and
  are accepted; **no `devDependencies` KEY was added or removed** (`package.json:25-31`
  still carries exactly `@types/node`, `electron`, `esbuild`, `typescript`, `vitest` —
  read this session — so §5.5's "no PBT harness" statement stands).
- `package-lock.json` (present at the repo root) is regenerated **by the architect's
  install**, not by this unit's writing agent. The lockfile diff is therefore
  **installer-owned and unverified in-session**: this spec asserts the *requirement*
  (the single `provident-ssr` `node_modules/provident-ssr` entry resolves to `0.5.1`
  with its integrity string and no other dependency's resolution changes — now
  **amended**: the `electron`/`esbuild`/`vitest` resolution changes ARE expected and
  accepted under ruling 3, so **those three are no longer "findings"**) and cannot
  assert the *bytes*. **Anything else moving in the lockfile remains a finding.**
- **No test may install, and no test may read the registry.** The `R-14` row (§5.1) is a
  diff-scope assertion over the tracked files, not a network check.

### 2.2 `src/shared/dom-shim.ts` — `ShimElement.removeAttribute(k)` (the ONE admitted method)

```ts
// proposed; the ONLY member added to ShimElement by this unit
removeAttribute(k: string): void
```

```ts
// src/shared/dom-shim.ts:54 — LANDED (read this session); the ONLY member this unit adds
removeAttribute(k: string): void
```

Semantics (all of these are acceptance rows in §4):

1. **BOTH stores are cleared.** `k === 'id'` clears the `id` **slot** (`this.id = ''`,
   `src/shared/dom-shim.ts:13`) **and** `delete this.attrs['id']`; `k === 'value'` on a
   form-control element clears the `value` **slot** **and** `attrs['value']` (**NEW
   2026-09-27 — amendment block 6; §2.2.1 states the special case, its state table and its
   exact scope**); any other `k` deletes`this.attrs[k]`. Rationale (read this session): the
   shim's `setAttribute('id', v)` writes `this.id` and deliberately **deletes**
   `this.attrs['id']` (`src/shared/dom-shim.ts:31-37`), `getAttribute('id')` reads the `id`
   slot (`:42`), and `outerHTML` appends `id="${this.id}"` **from the slot** (`:80`) — so a
   completion that only `delete`d `attrs['id']` would leave `outerHTML` emitting `id="…"`
   and silently mask a real-DOM difference; the **same slot/store split** is what the
   `value` special case closes (§2.2.1), there against the adapter's form-control property
   write (`dist/core/adapters.js:203-208`, read). That is the exact hazard
   `SHIM-COMPLETION-CARVE-OUT` names (`docs/decisions.md:57`).
2. **Idempotent, never throws.** Removing an absent key is a no-op; a non-string `k`
   stringifies through the object-key coercion (`this.attrs[String(k)]`) and is a no-op
   when absent. No `TypeError`, ever — the engine reaches this method from a `setProp`
   path that must not crash a render.
3. **No other member, and no other contract change.** `setAttribute`
   (`src/shared/dom-shim.ts:30-39`, stringifying, with its `id` special case),
   `getAttribute` (`:41-44`), `innerHTML` (`:71-73`), `outerHTML` (`:77-88`),
   `appendChild`, `remove`, `addEventListener`/`removeEventListener` and the
   `shimDocument`/`installShim`/`mountEl` exports are **unchanged**, byte-for-byte.
   **The ONLY byte that changes in this file is inside the one admitted method's body** —
   item 4's `value` branch (amendment block 6) — which is why §5.1 item 3's diff scope is
   still one method + its doc comment.
4. **`value` on a form-control element is cleared in BOTH stores — the second special case
   (AMENDED 2026-09-27, amendment block 6; §2.2.1 states it in full).** This is a
   **completion of the ONE admitted method's body, NOT a new shim member**: the adapter
   writes a form control's `value` to the **property slot** (`dist/core/adapters.js:203-208`,
   read) and its removal op reaches `removeAttribute('value')` (`:296-298`, read), so a clear
   that touched only `attrs['value']` would leave the slot stale. **No second method, no new
   public identifier, no new DOM capability.**
5. **`hasAttribute` is NOT added — ruling on the evidence.** `H-r7` admits it "only if a
   red run names a real call site". Read this session, **no call site exists**: a grep
   for `hasAttribute` over the installed `0.2.1` dist
   (`node_modules/provident-ssr/dist/core/adapters.js`) returns **no match**; the only
   `.has(` on an attribute-like receiver is `VALUE_FORMS.has(el.tagName)` (`:196`, read);
   and the adjacent `0.5.1` source's boolean branch probes the **DOM property**
   (`typeof el[attr] === 'boolean'`, `../Preempt-Providence/src/core/adapters.ts:301-302`,
   read) rather than the attribute, and its `data:`/`css:`/`prop:` paths call
   `removeAttribute`/`setAttribute` only (`:286`, `:291`, `:299-300`, `:306`, read).
   **Ruling: `hasAttribute` is NOT added by this unit**, and a later pass may add it only
   with a named red-run call site, per `H-r7`. If the red run throws
   `el.hasAttribute is not a function`, that *is* the named call site and §6's stop
   condition applies (architect re-admission, not an implementer decision).
6. **What the completion does NOT buy, stated up front.** The shim still observes
   set/overwrite/delete only; it is **not** a browser. No real-DOM claim may be made from
   a node-green (`docs/specs/provident-electron-shell-chrome-handoff-review.md`, "What
   every node-green must NOT be claimed as").
7. **This method is the safety mechanism for every removal write (ruling 1).** After the
   2026-09-27 amendment the engine's `undefined`-valued attribute paths are **not**
   intercepted at the host: `props.<key>` / `css.<key>` / `props:<key>` / `css:<key>`
   nullish writes are applied (§2.3), so the **only** thing standing between a removal
   write and a crash is this method (`§3.7`). A later pass that weakens or bypasses the
   completion re-opens the crash the whole unit exists to close.

### 2.2.1 `ShimElement.removeAttribute('value')` — the `value`-slot special case (NEW CLAUSE, 2026-09-27) **[T]**

**Why this sub-clause exists (the disproved diagnosis, recorded not hidden).** Amendment
block 5's §2.4a.1 argued that the pane render loop **drops the diffed baseline**, so an
emitted removal op never reaches the element; item 3 there says so and its hunk is
**SUPERSEDED**. Measured on the landed tree: the pane loop **already persists its baseline**
(`src/renderer/secure-panels.ts:226`, `:398`, `:400`, read), the removal op **is** emitted and
applied, and the adapter **does** reach `elem.removeAttribute('value')`
(`node_modules/provident-ssr/dist/core/adapters.js:296-298`, read) — the serialized `value`
attribute **is** gone after the write. The residual is the **slot/store split inside the one
admitted method**: the method special-cases only `id` (`src/shared/dom-shim.ts:54-61`, read),
so an `INPUT`'s `value` slot — written by the engine's form-control property path
(`dist/core/adapters.js:203-208`, read) — keeps its stale `'7'` while
`getAttribute('value') === null`. **A removal must leave the shim's serialized form and its
readable value in agreement**; that is the whole of this sub-clause's object.

**1. The special case, stated as contract.** In the EXISTING
`ShimElement.removeAttribute(k)` (`src/shared/dom-shim.ts:54`), when **both** (a) `k === 'value'`
and (b) the element is a **form-control** whose tag the adapter sends down its property path
(the scope in item 3) hold, the method clears **BOTH stores**: `this.value = ''` **and**
`delete this.attrs['value']`. Every other `k` keeps item 1's behaviour (`id` slot+store;
otherwise the attribute store). `k === 'id'` is unchanged.

**2. The states (acceptance rows; carried by `§3.2`'s table and the `R-10` sibling row in
`tests/dom-shim-remove-attribute.test.ts`, `§5.2`).**

| Element state | `removeAttribute('value')` observable |
| --- | --- |
| A form-control element whose `value` **slot was written** (`el.value = '7'`) **and** whose attribute was also serialized (`el.setAttribute('value','7')` → `attrs['value'] = '7'`, `outerHTML` carries `value="7"`) | **BOTH cleared** — `el.value === ''` **AND** `getAttribute('value') === null` **AND** `outerHTML` no longer contains `value="7"` |
| A form-control element whose `value` slot is **untouched** (the `''` default, `src/shared/dom-shim.ts:14`) and no `value` attribute in the store | **idempotent no-op, no throw**; `el.value === ''` before and after; `outerHTML` byte-identical; repeat calls identical (the `P-IM-2`/`S-TAB-IDEMP-1` shape) |
| A form-control element with `attrs['value']` present but the slot at its default | attribute store cleared; `el.value` is `''` (it already was) — the state is the same as the row above after the call |
| A **NON**-form-control element (a `div`, `section`, `span`, `p`, …) with `attrs['value']` present | **the store-only behaviour, unchanged**: `delete attrs['value']`, `getAttribute('value') === null`, `outerHTML` no longer carries it; the element's `value` **slot is NOT touched** (item 3's scope) |
| Any element, a non-`value` key | item 1's behaviour, unchanged (`id` → slot+store; otherwise store) |

**3. The scope, pinned exactly (and how it was resolved — not guessed). WIDENED 2026-09-27
(amendment block 7, item C) to state the LANDED rule honestly — the code is NOT narrowed.**
The landed special case is keyed on **two** things only: the **ATTRIBUTE KEY `'value'`** and the
**ELEMENT TAG**. It is **NOT** keyed on which adapter branch arrived, and the contract must not
claim otherwise:

- **Both adapter routes reach it.** (i) the **fallback/attribute route**: a `props.value`
  mutation becomes the op-name **`prop:value`**, whose `val === undefined` branch is
  `elem.removeAttribute(attr)` with `attr = name.slice('prop:'.length)`
  (`dist/core/adapters.js:296-298`, **read this pass**) — this **IS** the path a `prop:value`
  removal takes; and (ii) the **`css:` route**: the adapter's `css:` branch has **NO**
  `VALUE_FORMS` test, so any `css.<key>` whose key is outside `{id, classes, style, cssDef}`
  takes `elem.removeAttribute(key)` (`dist/core/adapters.js:214-224`, **read this pass** —
  `:214` the branch, `:216-222` the `id`/`classes`/`style` special cases, **`:224` the
  fallback**). So `[{targetProp:'css.value', value: undefined}]` on an `INPUT` **also** reaches
  this method and clears the slot. *(The pre-amendment text scoped the case to "the tags the
  engine sends down its property path" and read as if only that path existed; the width of the
  **landed** rule is what is recorded here.)*
- **What stays store-only:** a **non-`value` KEY** (any `k !== 'value'` on a form control keeps
  the store rule) and a **non-form-control TAG** (a `div`/`section`/`span`/`p`/… with
  `attrs['value']` present). `SELECT` is the named tag case: it is in `FORM_CONTROLS`
  (`:19`, read: `new Set(['TEXTAREA','INPUT','SELECT'])`) but **NOT** in `VALUE_FORMS`
  (`:20`, read), so it keeps the store-only rule.
- **The tag test is still the engine's own set.** The property-path test the landed dist makes
  is `attr === 'value' && VALUE_FORMS.has(elem.tagName)` → `elem.value = bakeValue(val)`
  (`node_modules/provident-ssr/dist/core/adapters.js:315-318`, **read this session**), and
  `VALUE_FORMS` is declared **one line above** its use as
  `const VALUE_FORMS = new Set(['INPUT', 'TEXTAREA']);`
  (`dist/core/adapters.js:19-25`, **read this session** — `:19` is `FORM_CONTROLS`,
  `:20` is `VALUE_FORMS`). **The membership is therefore exactly two tags: `INPUT` and
  `TEXTAREA`** — note `SELECT` is in `FORM_CONTROLS` but **NOT** in `VALUE_FORMS`, so a
  `SELECT` takes the else-branch below it (`elem.setAttribute('value', …)` /
  `removeAttribute('value')`) and **keeps the store-only rule**. The tag-name test is
  **exact and derivable from the shim's own data**: `ShimElement` stores
  `tagName = tag.toUpperCase()` (`src/shared/dom-shim.ts:5` the field, `:18-20` the constructor,
  read) and the engine's set is uppercase, so
  `this.tagName === 'INPUT' || this.tagName === 'TEXTAREA'` is the **same test the adapter
  makes** — an exact replication of the engine's tag-name rule, not an inference, and the shim
  imports nothing (it stays dependency-free). **Unverified, stated as
  such:** whether the engine's `VALUE_FORMS` set may grow in a later dist is **not** pinned
  here — a later pass re-reads `dist/core/adapters.js:20` at install; **until then the scope is
  exactly `INPUT`/`TEXTAREA` and a wider or narrower scope is a finding, not a judgement call.**
  **No other tag may be added by inference** (a non-`VALUE_FORMS` `value` clear would change
  the store-only contract of a tag nothing measured). **The honest ONE-LINE form of this item,
  for any later pass:** *the special case is keyed on the attribute key `'value'` **and** the
  element tag (`INPUT`/`TEXTAREA`) — so `prop:value` (the fallback removal path, `:296-298`) and
  `css.value` (the `css:` fallback, `:214-224`) both clear the slot, while a non-`value` key and
  a non-form-control tag stay store-only.* **The landed code is the contract here; this item
  widens the text, never narrows the behaviour.**

**4. Honest semantics note (this is the SHIM's contract, deliberately NOT a browser claim).**
The real DOM does **not** clear a *dirty* input's `.value` on `removeAttribute('value')` — the
attribute and the property are separate there, and the property keeps the user's edit; this
shim is a **synthetic harness**, so its rule is stated as the shim's own contract — *a removal
makes the serialized form and the readable value agree* — and **no later pass may read this
sub-clause as a claim about `HTMLElement`/`HTMLInputElement` behaviour**, nor lift it into
any real-DOM row (the `H-r10` extractor precondition, §4/§4.4, still governs those).

**5. What this sub-clause does NOT authorise (boundary; the §0 six-prohibition block still
holds).** **No new shim member** (`H-r7` stands: only `removeAttribute`; item 5 above), **no
new DOM capability** (no `hasAttribute`, no layout/CSS/pointer/focus/`matchMedia`/render-count
seam), **no vocabulary** (the tag names come from the ENGINE's set, not from any consumer),
**no content**, **no default**, **no store**, **no MCP/IPC surface** — the special case adds
**none** of the six. It is **not** a `secure-panels.ts` hunk and **not** a baseline hunk:
this unit's ONE production change for the pane half remains `applyPaneMutation` (§2.4a), and
the pane render loop needs **no** change (§2.4a.1 item 1).

### 2.3 `src/renderer/runtime.ts` — the shape guard in `applyCommand` (pass-through)

```ts
// src/renderer/runtime.ts:380 — signature unchanged
applyCommand(cmd: { kind: string; node?: string; [k: string]: unknown } | null | undefined):
  { status: string; dirtied?: string[]; minted?: string[] }

// PRIVATE static helper (not exported, not on the MCP surface) — LANDED at :481-489
private static mutationPropsValid(mutation: unknown[]): boolean
```

Placed **after** the existing malformed-`mutation` rejections (`src/renderer/runtime.ts:409-414`)
and **before** `this.supervisor.apply(payload)` (`:434`; landed call site at `:425`, read):

```
if ((cmd.kind === 'state-slice' || cmd.kind === 'layer-apply') && !Runtime.mutationPropsValid(cmd.mutation)) return { status: 'rejected' }
```

- **The kind scope, stated exactly (AMENDED 2026-09-27 — the `layer-apply` verdict is NOT PINNED).** The predicate is **kind-scoped at the PREDICATE level to BOTH studied kinds** — `state-slice` **and** `layer-apply` — because the landed `mutationPropsValid` call site runs for both (`src/renderer/runtime.ts:425`, read: `if ((cmd.kind === 'state-slice' || cmd.kind === 'layer-apply') && !Runtime.mutationPropsValid(cmd.mutation)) return { status: 'rejected' }`); that is a statement about **which kinds the host validates for SHAPE**, and nothing more. **The ENGINE VERDICT for a mutation-carrying `layer-apply` is explicitly NOT PINNED** (the same "the engine's own verdict — not pinned" treatment `PA-9`/`PA-10` get): `layer-apply` is the engine's **mint-and-wire op** — `Supervisor.apply`'s branch at `dist/core/supervisor.js:1188-1225` (read) reads `op.target` (`:1194`, rejecting `unknown-node` with no target at `:1195-1196`), requires `op.nodes` to be an **array** (`:1199`, rejecting `malformed-op` otherwise at `:1200`) and then mints + wires through `layerApply(op, …)` (`:1202`) — so **a mutation-carrying `layer-apply` is not a shape the engine's `layer-apply` op accepts**, and its verdict is an **unstudied op shape** (the `rejected` / `unknown-node`-class family, per the op's own guards) rather than `applied`. **Consequence for the rows, stated so no later pass reads a green into the wrong claim:** no row may assert `status === 'applied'` **for a `layer-apply` carrying a `mutation`**; a row that wants the kind-scope proven drives a **valid** `layer-apply` (`target` + `nodes`, `:1194-1202`) or asserts only that the **predicate did not refuse it** (`NOT rejected by the predicate` — the P7 form, §3.5), and a row that wants a removal proven uses the `state-slice` PA-rows (§3.4). The host's own layer-apply shape gate is `src/renderer/runtime.ts:412-414` (`!Array.isArray(cmd.mutation)` ⇒ `{status:'rejected'}`, read).
  **AMENDED 2026-09-27 (amendment block 7, item F(1)) — the "NOT rejected by the predicate" form is NOT DECIDABLE on the public surface, stated here so §3.5's `P7b` is not read as a runnable row.** The blind layer measured **both** shapes — a mutation-carrying `layer-apply` (no `target`/`nodes`) **and** this clause's own "valid `layer-apply`" shape (`target` + a `nodes` array) — returning the **identical opaque `{status:'rejected'}`** (`docs/specs/engine-pin-greens.md` §2.5's `P7b-ii` row + §3a's `F-3`, read: *"the public `{status}` carries **no** predicate-vs-engine discriminator, so `status !== 'rejected'` cannot attribute the verdict"*). **The decidable half is the SHAPE-MALFORMED one:** a `layer-apply` carrying a shape-malformed element (`[null]`) **does** return `{status:'rejected'}` and **that** is the observation that goes red if the predicate is removed from the call site (`src/renderer/runtime.ts:425`) — so the predicate's kind scope is provable **by construction of the malformed case alone**. **The `applied`/verdict for a VALID `layer-apply` stays `NOT PINNED`** (the engine's own op semantics, not this unit's), and **no row may claim otherwise.** *(SUPERSEDED in wording, not in substance: the earlier "a row that wants the kind-scope proven drives a **valid** `layer-apply` … or asserts only that the predicate did not refuse it" — the valid-shape leg is retained as a **recorded non-pin**, but it proves nothing on the public surface; why: the `F-3` measurement above.)*
  **The ARRAY guard is part of this bullet's contract too (amendment block 7, item B; see §2.4b):** for **both** studied kinds a **non-array** `mutation` is refused by the **shape gate** — `src/renderer/runtime.ts:409-414` (read: `state-slice` at `:409`, `layer-apply` at `:412`), each returning `{status:'rejected'}` **without a throw**. The pane channel owes the **same** class (§2.4).

**`mutationPropsValid(mutations)` returns `false` for SHAPE violations only** — any element
that is:
- not a non-null object (`null`, `'x'`, `42`);
- missing `targetProp`, or carrying a non-`string` `targetProp`;
- (and the batch itself, when it is not an array).

**It returns `true` for EVERY value-shaped write, including the nullish ones.** The
pre-amendment reject classes (`value === undefined`, `value === null`, absent `value` on an
attribute-path namespace) are **REMOVED**: such a write is a legitimate attribute
**removal** (ruling 1: *"Pass removals through"*), it is **applied**, and the shim
completion makes it safe (§2.2 item 7, §3.7).

- **The covered spellings, decided and stated once (AF-5 disposition + defect (a); CORRECTED
  2026-09-27 — amendment block 7, item D; the bare-name half of this bullet is
  SUPERSEDED).** A nullish removal write may legitimately use **the four prefixed
  spellings** that reach an attribute in the engine: `props.<key>`, `css.<key>`,
  `props:<key>`, `css:<key>`. **The contract ALLOWS all of them and lets the shim's method
  perform the removal**; the guard does not enumerate the spellings at all any more, because
  it no longer inspects `value`. The landed predicate still lists
  `props.`/`props:`/`css.`/`css:` in its doc comment (`src/renderer/runtime.ts:462-480`) —
  after this amendment that list describes **what the engine accepts**, not what the predicate
  refuses; the predicate's only remaining `targetProp` test is `typeof target === 'string'`.
  **A BARE attribute name is NOT a fifth removal spelling (MEASURED, not judged).** The blind
  layer measured a bare `targetProp:'title'` / `'hidden'` as **INERT as a mutation target**:
  `{status:'applied'}`, **no `dirtied` attribute change**, the attribute **present before and
  after**, and a **defined** bare-name write (`title:'v'`) equally a no-op — while the
  `props.title` control on the same node **did** remove it
  (`docs/specs/engine-pin-greens.md` §3a `F-1`, read). The ground, read this pass:
  `Node.applySlice` matches only the **prefixes** `type` / `content` / `handlers` /
  `props.` / `css.` / `hooks.` (`node_modules/provident-ssr/dist/core/node.js:1410-1445`, read:
  `:1410` `type`, `:1414` `content`, `:1418` `handlers`, `:1422` `props.`, `:1427` `css.`,
  `:1432` `hooks.`), so a bare name creates **no layer at all** and the adapter's fallback
  branch is never reached with it. **A bare name remains ALLOWED by this contract** (nothing
  is refused — value-shaped writes are not the predicate's business) but it is **never a row
  that proves a removal**, and `§3.4 PA-10` carries the same correction.
  *(SUPERSEDED: "**and a bare attribute name** (`targetProp:'hidden'`, no prefix), which the
  engine's adapter also routes to `removeAttribute` (`…adapters.js:296-298`, read)" — why:
  the adapter's `:296-298` fallback is reached by the **`prop:`-prefixed op-name** route and by
  the `css:`/`data:` branches, **not** by a bare `targetProp`, which `applySlice` never turns
  into an op; the measurement above is the authority.)*
- **The engine-effective namespace is `css.<key>`, NOT the colon `css:<key>` (defect fix,
  with the evidence).** `Node.applySlice` dispatches on `props.` / `css.` / `hooks.` /
  `type` / `content` / `handlers` (`node_modules/provident-ssr/dist/core/node.js:1410-1445`,
  read: `startsWith('props.')` `:1422`, `startsWith('css.')` `:1427`), so a
  `targetProp:'css:<key>'` mutation matches **no** branch and is **silently inert** as a
  mutation target; `css:<key>` is the **adapter's op-name spelling**
  (`dist/core/adapters.js:214`, read), not a `targetProp` namespace. Any row that means to
  exercise the engine's `css` removal path **must** write `css.<key>` (the landed
  `R-7`/`R-11` rows do — `tests/dom-shim-remove-attribute.test.ts:164`,
  `tests/host-guard.test.ts:167`, read). *(Correction to §2.3/§3.4/§4.1's `css:<key>`
  spelling: kept below marked SUPERSEDED wherever it carried a row's meaning.)*
- **Never throws.** The shape rejections keep the `{status:'rejected'}` shape matching the
  existing F1/F5/F6/F10 rejections (`src/renderer/runtime.ts:383-414`).
- **Shape rejection is total, never partial**: one malformed element in a 3-mutation batch
  rejects the batch (the `HOST-OP-REJECT` shape, `docs/decisions.md:42`); the host never
  half-applies. **Value-shaped writes are never batch-rejected** — a 3-element batch whose
  middle element is a nullish `props.<key>` write applies all three (§3.4 PA-rows).
- **The BATCH ITSELF is part of the shape class (amendment block 7, item B)**: a `mutation`
  that is **not an array** is refused with `{status:'rejected'}` by the pre-existing guard
  **before** the predicate runs — `src/renderer/runtime.ts:409-414` (read: `:409`
  `state-slice`, `:412` `layer-apply`, each `!Array.isArray(cmd.mutation)` ⇒
  `{status:'rejected'}`) — never a throw. **This is the container half of the "same class"
  claim §2.4 makes, and the pane channel owes it identically** (the new `M9` row, §2.4b).
- **Both entry points inherit it for free**: `op(cmd)` (`src/renderer/runtime.ts:602-606`,
  read) and `load({kind:'commands'})` both route through `applyCommand`; no second guard is
  written for them.
- **THE BOUNDARY — what this predicate does NOT cover (ruling 1b, stated so nothing is
  over-claimed).** This is a **command-surface** predicate. It covers the two call sites
  the host owns: `provident.op` / `Runtime.applyCommand` (here) and the pane-managed
  channel (§2.4). **Handler-originated writes reach `supervisor.apply` directly and are
  OUTSIDE the predicate** — `ctx.clientAPI.apply` builds `{kind:'state-slice', …}` and
  calls `supervisor.apply(op)` itself (`node_modules/provident-ssr/dist/core/client.js:3-48`,
  read: `:41`), and `ctx.node.receiveNextState` / the legacy handler surface likewise
  never pass through `Runtime.applyCommand`. **The contract therefore claims NO totality
  over all writes**; it claims exactly: *every mutation that reaches
  `Runtime.applyCommand` (any kind) or the pane channel is shape-validated, and no
  value-shaped write is intercepted at either site.* The engine's own paths are covered by
  the **completion**, not by this predicate. **Wrapping `supervisor`/`clientAPI` to widen
  the boundary is a REJECTED OPTION** (§1, out-of-scope list: recorded with its reason) —
  the correct response to a nullish write on a handler path is that the **completion**
  handles the removal, which is exactly the `H-r7` carve-out.
- **(c) The AF-6 restriction is REMOVED, not documented.** The pre-amendment seed `A-6`
  (a bare attribute name / `on:*` / `data:*` with a nullish value must be probed for a
  *rejection* posture) is withdrawn: there is **no capability loss to rule on**, because no
  value-shaped write is rejected anywhere. `on:*`/`data:*`/`content`/`handlers`/bare names
  remain **inside the engine's own ownership** and are untouched by the predicate — for
  shape reasons only.

### 2.4 `src/renderer/secure-panels.ts` — the same shape guard on the pane channel

`SecurePanels.syncConfig()` (`src/renderer/secure-panels.ts:338-365`, read: the
pre-amendment `:310-337` anchor was pre-install drift) writes `props.<name>` /
`props.value` with `mode:'replace'` into the **isolated pane graph** through its own
`this.supervisor.apply({kind:'state-slice', node: n, mutation})` (`:362`, read) — it does
**not** route through `Runtime.applyCommand`, so the predicate is applied at its own call
site (the "same guard on the pane channel", a module-local helper `paneMutationValid`
at `:81-89`, read — not exported, not on the class, no new public API).

- **Post-amendment semantics (ruling 1 applied here identically).** The predicate returns
  `false` for **SHAPE violations only**: a non-object element, a missing/non-string
  `targetProp`. **It no longer rejects nullish `value`s** — a `props.<key>` / `css.<key>` /
  `props:<key>` / `css:<key>` element carrying `undefined`/`null`/absent `value` is
  **applied** through `supervisor.apply` and the attribute is **removed** (the shim
  completion handles it: the pane graph renders through the same `DomAdapter` +
  `ShimElement` pair — `src/renderer/secure-panels.ts:255`, `:417`, read).
- **The pane channel's fail-state, stated positively.** A **shape**-invalid batch for a
  node is **skipped whole** (the node keeps its prior state and re-renders last-known —
  `syncConfig` returns `void` and has no status channel; the "last-known state survives a
  bad refresh" contract mirroring the `try/catch` behaviour at `:313-315`, `:326-328`,
  read). A **value-nullish** element is **not** a fail-state: it applies, removes, and
  leaves other panes untouched. **A divergence between this predicate and §2.3's is a
  finding** — but after this amendment the two must differ in **nothing but their
  container**.
- **"Nothing but their container" INCLUDES the non-array batch (AMENDED 2026-09-27 —
  amendment block 7, item B; the same class requirement made explicit; the LANDED status
  corrected by block 7's `B-LANDED` follow-up).** The old parenthetical
  (*"array check here is implicit: `syncConfig` always passes an array"*) described the
  **shipped** call site, not the **contract**: the **public seam** `applyPaneMutation(nodeId,
  mutation)` (§2.4a) takes the mutation from a **caller**, so a non-array can reach
  `paneMutationValid` there. **Read this pass — the requirement is MET:** the landed predicate
  (`src/renderer/secure-panels.ts:81-89`, read) tests `Array.isArray` as its **first
  statement** (`:82` `if (!Array.isArray(mutation)) return false`) **before** iterating its
  argument (`:83` `for (const m of mutation)`), so `applyPaneMutation(id, {} as never)` returns
  the **status** this contract promises — `{status:'rejected', applied:false}` (§2.4b outcome
  (i)) — and **no longer throws** (`TypeError: mutation is not iterable` was the pre-status
  behaviour, when the predicate iterated its argument with no guard; the throw was measured by
  the adversarial reviewer, and the landed harness row now asserts the refusal —
  `tests/host-guard-panes.test.ts:578-640`, read). The guard lives **in the predicate**, so
  **both** call sites carry the same class: the seam returns outcome (i) and `syncConfig`'s own
  call site keeps its skip-whole behaviour. `Runtime` guards the identical call at
  `src/renderer/runtime.ts:409-414` (read). **Pinned requirement (unchanged, met): the pane
  predicate's reject class must be the SAME class as `Runtime`'s, differing in nothing but
  its container — and that class explicitly includes the NON-ARRAY batch**, which must
  produce a status (`{status:'rejected', applied:false}` from the seam, §2.4b) and **never** a
  throw. The
  carrying row is the new **`M9`** (§3.6 with `M2`/`M3`/`M8`; named in §4.1, §5.2 and §5.5's
  `P-TP-1` compensating-rows list). *(The pre-amendment sentence is kept above so a later
  pass sees what it replaced; it was a statement about a call site, read as a statement about
  the class.)*
- The two shipped writes stay **legal and unchanged**: `props.data-on` is given
  `'true'`/`'false'` (`src/renderer/secure-panels.ts:352`) and `props.value` is given
  `this.cfg.maxJournalLength ?? ''` (`:355`) — both defined strings. Neither may be
  changed to `undefined`/`null` to "exercise" the channel: **the pane-fixture rows inject
  their own mutation through the documented injection point (§2.4a)**.

### 2.4a The pane test fixture — how the pane channel is driven for real (ruling 2)

**The problem this closes (adversarial finding).** Before the ruling the pane predicate
was **unreachable in the suite**: `syncConfig()` is private
(`src/renderer/secure-panels.ts:338`, read), both shipped writes it can build are
**defined** (`:352`, `:355`), and **no test referenced the predicate** (grep over
`tests/**` for `paneMutationValid`/`syncConfig`: no match, read this session). Any green
recorded for a pane row would have been a **false green** — which is exactly what the
blind layer reported (`docs/specs/engine-pin-greens.md` §4's `H-02` line: *"the row's 'a
mutation carrying `props.value = undefined` that the guard must see' has **no documented
injection channel**"*). Ruling 2 — *"Add test panes to the suite for testability"* —
makes the channel **reachable, and tested**, positively.

**Where the fixture lives: a `tests/` fixture file, plus a documented test-only injection
point on the pane host.** One choice, justified against the six prohibitions (§0) and
`H-r7`:

| Option | Verdict | Why |
| --- | --- | --- |
| `tests/fixtures/pane-mutation-fixture.mjs` (an authored pane/envelope used only by the suite) | **ADOPTED — the fixture half.** | A fixture is a **file the suite owns**: it adds no `src/` surface, no exported identifier, no vocabulary (prohibition 1), no authored UI content in shipped code (prohibition 2 — its authored envelope is **test data**, not a shipped pane), no default (3), no store (4), no MCP surface (5), and every row it carries is falsifiable in the node suite (6). It is the same shape the repo already uses for suite-only data (`tests/fixtures/hooks-scenarios-data.mjs`, read). |
| an authored pane definition in a **separate** suite-local `SecurePanels` instance | **REJECTED as the primary route.** | `SecurePanels`'s envelope is a **module-local function** with no argument (`src/renderer/secure-panels.ts:131`, read: `paneEnvelope()` takes nothing) — so a caller cannot inject a pane without a **new `src/` seam argument**, which is a bigger surface change than the injection point below, and it still does not let a row carry a **nullish** value (the shipped writes are defined). |
| a minimal **test-only injection point** on the pane host | **ADOPTED — the injection half.** | It is the smallest thing that makes the channel reachable: **one public method** `SecurePanels.applyPaneMutation(nodeId: string, mutation: unknown[]): { status: string; applied: boolean }` that (a) runs `paneMutationValid(mutation)` and (b) on `true` calls `this.supervisor.apply({kind:'state-slice', node, mutation})` + `this.render()`, returning the engine's `status`; on `false` it returns `{ status: 'rejected', applied: false }` and applies nothing. **It ships in `src/**` and is therefore a real surface change** — accepted because it (i) is the architect-ruled answer to the false-green, (ii) adds **no** vocabulary (the ids are the caller's), **no** content, **no** default, **no** store, **no** MCP surface (§0 prohibitions 1-5 all hold), and (iii) is **falsifiable in the node suite** (prohibition 6). It is **not** `H-r7` shim expansion: `H-r7` governs `src/shared/dom-shim.ts`, and this method adds no shim member, no DOM capability, and no browser emulation. **Recorded honestly: this is the one production seam this unit adds for testability**, and the alternative the architect weighed — adding a pane-*injection* argument to the constructor — was not chosen because it changes the shipped constructor signature. **AMENDED 2026-09-27 (amendment block 7, item A) — this cell's two-branch description of the RETURN SHAPE is SUPERSEDED; §2.4b pins it.** *(SUPERSEDED: the "returning the engine's `status`; on `false` it returns `{status:'rejected', applied:false}` … and applies nothing" phrasing — **why:** read in this pass, the landed method (`src/renderer/secure-panels.ts:299-305`) returns **`applied: true` on every shape-valid call**, so the engine-refused branch (`{status:'rejected', applied:true}` — measured with an unknown `nodeId`, `PF-1b`) has **no** corresponding text here. The two-branch description is replaced by §2.4b's **three** outcomes, pinned as `applied === (status === 'applied')`, plus the required array guard (the new `M9`).)* |
| wrapping/patching `Supervisor` or `clientAPI` in the suite | **REJECTED.** | §1's out-of-scope list: the engine is off-limits; a monkey-patch would test the patch, not the channel. |

**What the fixture must be able to inject.** (i) a **defined** value (the control: the
write applies and the attribute/state changes); (ii) an explicit **`undefined`**; (iii) an
explicit **`null`**; (iv) an element with the `value` key **absent**; (v) a **shape-malformed**
element (non-object, missing/non-string `targetProp` — **all three forms**, each as its own
fixture export; `PF-5`'s multi-shape drive and the fixture-data rule below) to prove the pane
half's reject path is real and skip-whole; (vi) the same mutation against **two different pane nodes** so the
"other panes untouched" row has an observable; (vii) the **last-known-still-rendered**
observation after a shape-reject.

**The fixture's rows (they supersede `R-13`'s single "not executable" row — see §4.1).**
`PF-1`..`PF-8`, carried by `tests/fixtures/pane-mutation-fixture.mjs` +
`tests/host-guard-panes.test.ts` (§5.2). Each row names its **state**, its **fail-state**
and its observable; the pane-fixture register entry is **`P-SM-3` / `S-TAB-PANE-1`** (§5.5).

**FIXTURE DATA vs ROW SCOPE — the reconciliation rule, read this before the table (NEW
2026-09-27, the adversarial/TestWriter reconciliation pass).** Two things are separate and must
not be confused, because a row's **scope** must never be narrowed to fit the fixture's **data**:

- **the ROW's scope** is what the row drives and asserts. Where a row names **several**
  malformed shapes, **all** of them are driven (the landed `PF-5` drives three:
  `[null]`, a missing `targetProp` and a non-string `targetProp` —
  `tests/host-guard-panes.test.ts:395-410`, read) — the fixture carries them as
  **separate named exports** (`malformedNonObjectMutation`,
  `malformedMissingTargetPropMutation`, `malformedNonStringTargetPropMutation`,
  `tests/fixtures/pane-mutation-fixture.mjs:104-116`, read);
- **the fixture's `build()` data** is the per-row mutation **the register row compares** against
  the landed row's own builder (`S-TAB-PANE-1`'s fixture-register row). `build()` returns the
  row's mutation, or **one representative shape** where the row names variants; a row whose
  drive needs a **second** mutation takes it from the fixture's own named builder rather than
  from `build()`. **An amended `PF-5`/`PF-7` cell below states its drive exactly, so neither
  cell can be read as a `build()` composition the fixture does not carry** — and no row's
  **assertion** is reduced by this rule (§7.12/§7.13 are the two fixture-data items recorded
  for a later pass).

**HOW A PANE NODE IS ADDRESSED — read this before the table (AMENDED 2026-09-27, amendment
block 7, item F(2); §2.4b item 4).** Wherever a row below names a pane node by an **authored
`props.id`** (`journal-length-input`, `toggle:read`), that is the node's **authored label**,
**not** the value passed to the seam: the first argument of
`SecurePanels.applyPaneMutation` is the node's **engine `nodeId`**, and the **test harness
resolves the label → nodeId from the pane graph's own node list** (the landed suite does
exactly this at `tests/host-guard-panes.test.ts:116-125`, read: `nodeIdOf`). An authored
`props.id` passed **directly** to the seam is an **unresolved id** and yields outcome (iii)
(engine refused) — measured, `PF-1`/`F-2`. **No row below may be read as "pass the
`props.id`".** *(SUPERSEDED: §4.2's sentence making the authored `props.id` the pane
vocabulary — see §2.4b item 4 and §4.2's amended bullet.)*

| Row | Injected | Expected (all: `not.toThrow()`) |
| --- | --- | --- |
| **PF-1** | `props.value: '7'` on `journal-length-input` (**the harness's label for that pane node — resolved to its engine `nodeId` by `nodeIdOf`, see the note above**) | `{status:'applied', applied:true}`; the input's shim `value` slot is `'7'`; the pane re-renders with the value present. |
| **PF-2** | `props.value: undefined` on the same node | **`{status:'applied', applied:true}` — the nullish write PASSES THROUGH (ruling 1)**; no throw; **the prior value is gone, not held — REACHED (verified) and now PINNED** (amendment block 6: the removal op **is** emitted and applied — `{kind:'set', wire:'node-21', name:'prop:value', value:undefined}` — the adapter **does** reach `elem.removeAttribute('value')` (`dist/core/adapters.js:296-298`, read), and the `value` **slot** is cleared **by the shim's `value` special case** (`§2.2.1`, NEW 2026-09-27; the pre-declared "baseline persistence" diagnosis is **SUPERSEDED** — see §2.4a.1 item 3). **Mechanism recorded precisely (do not over-claim; the attribution sentence is CORRECTED 2026-09-27 — amendment block 7, item C).** The *landed* dist's adapter handles `undefined` on a `VALUE_FORMS` tag by `formEl.value = ''` (`dist/core/adapters.js:203-208`, read: the form-control branch, `val === undefined` at `:203-205`) — a **second** route to the same `el.value === ''` state — **and** the removal op's op-name is `prop:value`, whose `undefined` branch **is** `elem.removeAttribute('value')` (`dist/core/adapters.js:296-298`, read: `:296` `const attr = name.startsWith('prop:') ? name.slice(5) : name`, `:297-298` `if (val === undefined) elem.removeAttribute(attr)`). *(SUPERSEDED — corrected-with-reason: the earlier sentence read "the shim's `removeAttribute` is reached for the **attribute** paths (`:290-291`, `:297-298`, read) … `:297-298` IS the path a `prop:value` removal takes; the two are consistent, and the row asserts the STATE, not which call performed it. **The pre-amendment wording denied that attribution** — it claimed `:297-298` was *not* the path a form control's `value` takes — which the adapter read contradicts.)* **The observable is unchanged and needs no attribution:** `el.value === ''` after the removal, whichever reachable route cleared the slot; the row asserts the STATE. **Its observable is PINNED: `el.value === ''` **and** `el.value !== '7'`, `getAttribute('value') === null`, and the serialized attribute no longer `'7'`** (§2.4a.1 item 5 — the "exact serialized form recorded, not pinned" hedge is REMOVED where it conflicted; it survives only for `PF-3`'s `null` = `String(null)` form, which this ruling does not touch). |
| **PF-3** | `props.value: null` | **`{status:'applied', applied:true}`** and the prior `'7'` is **not** retained. **Mechanism recorded precisely:** `null` is **not** `undefined`, so on a `VALUE_FORMS` tag it takes the `bakeValue(val)` branch (`dist/core/adapters.js:206-207` + `bakeValue`, read) — i.e. it stringifies rather than clearing. The row asserts the **pass-through verdict** (`applied`, no throw, prior value not retained); the exact serialized form is **recorded, not pinned** (this is the AF-7 boundary: `null` == an attribute removal on the **attribute** paths — `PA-2` — but is `String(null)` on a form control). |
| **PF-4** | `props.value` with the **`value` key absent** | Same as `PF-2` — reconciled once with the engine's layer merge (AF-7, §3.4 `PA-4`): an absent key and an explicit `undefined` are **the same removal** (both build `{props:{[key]: undefined}}` through `dist/core/node.js:1521`, read). **The removal therefore reaches the element and the observable is `PF-2`'s, PINNED as `el.value === ''`** (amendment block 6: the op is emitted and applied; the slot is cleared by §2.2.1's `value` special case). **The fail-state is the prior `'7'` retained** — which now attributes to the shim's slot/store split (§2.2.1), **not** to a dropped pane baseline (§2.4a.1 item 4). |
| **PF-5** | a **shape-malformed** element — **all three shapes are driven** (a non-object; a missing `targetProp`; a non-string `targetProp`), per the fixture-data rule above | `{status:'rejected', applied:false}`; **nothing applied**; the node's state is unchanged; **last-known state still rendered** after the rejected call. **The same cell carries the new `M9` shape (`M9`, §3.6): a NON-ARRAY batch is the SAME outcome** — `{status:'rejected', applied:false}`, nothing applied, **never a throw** (§2.4b item 1's requirement). **FIXTURE DATA, stated exactly (amended 2026-09-27 — the fixture mismatch):** the fixture carries the three shapes as the three named exports above, and its `PF-5` row's `build()` returns **one representative shape, the non-object `[null]` form** (`tests/fixtures/pane-mutation-fixture.mjs:104-106`, read) — `build()` is the mutation the register row compares, **not** the whole three-shape drive; the row drives all three from the exports, so **no assertion is reduced** (recorded as §7.13). |
| **PF-6** | `props.data-on: 'false'` on `toggle:read` (the shipped write's shape, injected; **authored label → engine `nodeId` via the harness, per the note above**) | applied; `data-on="false"` renders; proves the fixture drives the real channel and not only the removal path. |
| **PF-7** | **`PF-2`'s nullish mutation on the target node PLUS a defined write on a SIBLING pane node**, then a second `PF-2` call — **the sibling half is driven as a SEPARATE call through the same seam, not composed into the nullish call's array** (AMENDED 2026-09-27 — the fixture mismatch: the sibling write is the fixture's own named builder `siblingDefinedMutation('false')` on `toggle:dispatch`/`toggle:read`, and a nullish write on one node **cannot** carry a sibling node's mutation — a mutation array targets ONE node by construction, and composing two nodes into one array is not a shape this contract has ever defined) | **other panes untouched**: the sibling's observable is unchanged **across the nullish call**; the nullish node's own siblings (other `props`) are unchanged; **and a third node in the same pane is unchanged too** (the landed row's third observation, `tests/host-guard-panes.test.ts:477`, read). **FIXTURE DATA, stated exactly:** the fixture's `PF-7` row carries the **nullish half only** — `build()` returns `undefinedValueMutation()` (`pane-mutation-fixture.mjs:187-194`, read) — and the sibling's defined write is the fixture's own builder, so the two are driven as **two calls** (`tests/host-guard-panes.test.ts:444-481`, read). **This is a ROW-DRIVE detail, not a weakened assertion**: the sibling's observable is still asserted unchanged across the nullish call, and §7.12 records the fixture-data half a later pass may add (`build()` returning the nullish + sibling-defined pair) so the register row compares the whole drive. |
| **PF-8** | a repeated `PF-2` (idempotence) | second call: still `applied`, still no throw, `outerHTML`/state identical to after the first (the removal is idempotent through the completion). |

#### 2.4a.1 Baseline persistence and the `value`-slot clear — the two clauses the `PF-2`/`PF-4` pair needs (NEW CLAUSE 2026-09-27; **REWRITTEN 2026-09-27, amendment block 6**) **[H] + [E] + [T]**

**Why this clause exists (the diagnosis, then its correction — both recorded, neither hidden).**
Amendment block 5 argued that this defect was a **dropped render baseline**: the pane's render
cycle allegedly built its previous-element map fresh and discarded it, so an emitted removal op
never reached the element. **Measured on the landed tree, that diagnosis is DISPROVED by the
Implementer's live traces, and the architect adjudicated the conflict (amendment block 6):**

- the pane loop **already persists its baseline across cycles exactly as `Runtime` does** —
  `private prevMap: Map<string, unknown> | null = null` (`src/renderer/secure-panels.ts:236`,
  read), passed into the loop (`:428`, read: `renderProducingProcess(…, this.prevMap as never,
  renderOptions)`) and re-assigned from the loop's own return (`:430`, read:
  `this.prevMap = dom.prevMap …`) — mirroring `Runtime`'s `this.domPrevMap`/`this.ssrPrevMap`
  (`src/renderer/runtime.ts:192-194`, read). **There was no dropped-baseline defect and no such
  hunk is owed.**
- the removal op **IS** emitted and **IS** applied: `diffMinimal` yields
  `{kind:'set', wire:'node-21', name:'prop:value', value:undefined}` (the value-`undefined` set
  op — `dist/core/render.js:37-41`, read) and the adapter reaches
  `elem.removeAttribute('value')` (`node_modules/provident-ssr/dist/core/adapters.js:296-298`,
  read); **the serialized `value` attribute IS gone after the write.**
- the **REAL residual**: `ShimElement.removeAttribute(k)` special-cases only `id`
  (`src/shared/dom-shim.ts:54-61`, read), so the `value` **SLOT** — the plain public field at
  `src/shared/dom-shim.ts:14`, read — keeps its stale `'7'` while
  `getAttribute('value') === null`: **the shim's slot and its serialized attribute DISAGREE
  after a removal.** The architect's ruling: **the `value`-slot clear inside the EXISTING
  `removeAttribute` is AUTHORISED and REQUIRED** as the completion of that one admitted method
  — the contract is **§2.2.1**, and it adds no member/capability/vocabulary/content/default/
  store/MCP surface.

**1. Normative sub-clause (the required behaviour).** In the EXISTING
`ShimElement.removeAttribute(k)`, `k === 'value'` on a form-control element clears **BOTH** the
`value` slot and `attrs['value']`, scoped exactly as the adapter's `VALUE_FORMS` path is
(`INPUT`/`TEXTAREA`) — **§2.2.1 states it in full, with its state table and the evidence for
the scope.** The **pane render loop additionally MUST keep carrying its diffed baseline across
cycles** (it does, per the measurement above) — stated because the baseline is what makes an
emitted removal op reachable at all: `Runtime`'s maps are caller-owned per-tree state, assigned
from the loop's own return value and fed back into the next call
(`src/renderer/runtime.ts:192-194`, read), reset **only** on a graph reload
(`resetRenderState()`; `src/renderer/runtime.ts:789-809`, read: `prevStates.clear()` +
the prevMaps nulled), and the exported loop's own ownership note says *"the caller OWNS the
per-tree `prevMap` … the loop keeps NO module-level render state"*
(`dist/core/render-helpers.js:427-441`, read), returning a new map that *"feeds the next call"*
(`:442-451`, read). **The pane half needs no change to satisfy this** — the required production
change for `PF-2`/`PF-4` is **§2.2.1's shim clear, and nothing else.**

**2. Observable for `PF-2` / `PF-4` (PINNED — amendment block 6 ruling D).** After the nullish
write on `journal-length-input`:

| Observable | Assertion (post-clause, **pinned**) |
| --- | --- |
| the `value` SLOT | **`el.value === ''`** and `el.value !== '7'` — the prior value is **gone, not retained**; this is the assertion §2.2.1's special case makes true **actively**, not by the slot default |
| the serialized attribute | `attrsOfPropsId(html, 'journal-length-input').get('value')` **≠** `'7'` (absent), and `getAttribute('value') === null` |
| the verdict | `{status:'applied', applied:true}`, no throw (unchanged — ruling 1) |
| the exact byte form of the ABSENCE | **recorded, not pinned, and this hedge now covers ONLY `PF-3`** — `PF-3`'s `null` is `String(null)` on a `VALUE_FORMS` tag (`PF-3`, §3.4 `PA-2`); the hedge **no longer** applies to `PF-2`/`PF-4`, whose observable is pinned as `el.value === ''` |

*(One honest scope question for the TestWriter, flagged rather than papered over: whether the
**pane** path can place a `value` **attribute** in `attrs` at all. The adapter writes a
`VALUE_FORMS` tag's `value` to the **property slot** and never to `setAttribute`
(`dist/core/adapters.js:315-318`, read), and `ShimElement.setAttribute` has no `value` branch
that touches the slot (`src/shared/dom-shim.ts:30-39`, read) — so on the pane path the
attribute half of §2.2.1's state table may be asserted **vacuously absent** (`getAttribute` is
`null` because no attribute was ever written, while the slot half is the real assertion). The
**direct** §2.2.1 rows — `tests/dom-shim-remove-attribute.test.ts` (`§5.2`) — are where the
attribute half is non-vacuous: they seed `setAttribute('value','7')` **and** `el.value = '7'`
themselves. The reconciliation of the pane fixture's pre-existing `PF-1` assertion
(`tests/host-guard-panes.test.ts:290-293`, read: no `value` attribute is asserted) is the
TestWriter's — recorded in §8's block-6 note, not silently changed here.)*

**3. Fail-state.** The **prior value retained** — the pane's shim element still carrying
`'7'` **in the `value` slot** after an `applied` nullish write (with `getAttribute('value')`
already `null`). That state means the **`value` special case did NOT clear the slot** (§2.2.1),
i.e. the shim's slot and its serialization disagree; it is a **host-owned harness defect in
`src/shared/dom-shim.ts`**, **not** an engine finding and **not** a `secure-panels.ts` baseline
defect, and it is the fail-state `PF-2`/`PF-4` exist to catch. *(The pre-amendment attribution —
"the baseline did **not** persist … a host defect in `src/renderer/secure-panels.ts`", i.e. the
old item 3 — is **SUPERSEDED** by the measurement in the block above; kept in substance here so
no later pass re-files it against the pane loop.)*

**4. The `formEl.value = ''` mechanism and the slot/store split, re-stated for the landed tree
(do not over-claim; and the boundary that was OVERRULED).** Three precision notes bind any
later pass: (a) the adapter ALSO handles an `undefined` value on a `VALUE_FORMS` tag by
`formEl.value = ''` (`dist/core/adapters.js:203-208`, read: the form-control branch,
`val === undefined` at `:203-205`), so a row must assert **the STATE**, never *"which call
performed it"*; (b) the **attribute** route for `props.value` on a shim element is
`removeAttribute(attr)` (`:296-298`, read: `prop:value` → the fallback branch, `val ===
undefined`), and the shim's `value` **slot** is a separate field from the attribute store
(`src/shared/dom-shim.ts:9-14`, `:54-61`, read: `this.attrs` vs `this.value = ''`) — **read
this session, no shim method writes the `value` slot; only the engine's form-control path
writes it**; and (c) **the pre-amendment boundary is OVERRULED, recorded verbatim so no later
pass cites it:** the old text read *"the clause does not require a shim `value` write of any
kind"* and *"if a later pass wants the slot *actively* cleared, that is a **new** contract
question (a shim or adapter concern …), **not** a §2.4a.1 deliverable"* — the architect's
ruling (amendment block 6, ruling A) **authorises and requires exactly that clear**, as the
**completion of the one existing admitted method**, and it is **§2.2.1's** contract. What this
clause authorises is therefore **baseline persistence AND the §2.2.1 `value`-slot clear — and
nothing else**; no third production hunk may be smuggled in under it. **Honest semantics note
(ruling C, one sentence):** the real DOM does **not** clear a *dirty* input's `.value` on
`removeAttribute('value')` — this is the **shim's own contract** (a removal makes the
serialized form and the readable value agree), **not a claim about `HTMLElement`**, and it must
never be lifted into a real-DOM row (§4/§4.4's `H-r10` precondition).

**5. What is NOT authorised here (boundary).** No **new shim member** (`H-r7` stands: only
`removeAttribute` — `§2.2` item 5; the `value` clear is that method's **body**, not a second
member), no wrapper/patch of the engine (§1 rejected option), no change to `syncConfig`'s
shipped writes (§2.4), and no `props.id`-style auto-mint interaction (that is `PA-6`/`PA-7`,
§3.4). The one new production surface this unit adds for testability remains
`applyPaneMutation` (§2.4a option table, §7.9).

### 2.4b The pane seam's CONTRACT — the return shape, the array guard and the nodeId vocabulary (NEW CLAUSE, 2026-09-27, amendment block 7) **[H]**

**Why this clause exists (both halves MEASURED, neither inferred).** §2.4a's option table
described the seam with **two** branches and only one of them fully. Two independent
measurements in this pass contradicted that text:

- **the `applied` field** — the landed method returns `applied: true` for **every** shape-valid
  call (`src/renderer/secure-panels.ts:299-305` as read **when this clause was written**: the
  tail was `return { status: typeof result?.status === 'string' ? result.status : 'unknown', applied: true }`),
  so an **engine refusal** was reported as *applied*. Measured:
  `applyPaneMutation('no-such-node', [{targetProp:'props.value', value:'7'}])` ⇒
  **`{status:'rejected', applied:true}`** — and the blind layer independently observed the same
  value (`docs/specs/engine-pin-greens.md` §2.8's `PF-1b` row, read). **STATUS-CORRECTED 2026-09-27
  (block 7's `B-LANDED` follow-up, read this pass): the landed tail is now
  `return { status, applied: status === 'applied' }` (`src/renderer/secure-panels.ts:334`, read),
  i.e. exactly the ruling below — an engine refusal is no longer reported as applied. This
  bullet is kept as the measurement that produced the ruling; the ruling text is unchanged.**
- **the `mutation` parameter** — the landed predicate never tests `Array.isArray`
  (`src/renderer/secure-panels.ts:72-79`, read **at the time of this measurement**:
  `for (const m of mutation)` at `:73` with no
  guard before it), so a non-array **threw** (`TypeError: mutation is not iterable` —
  **derived from the read**, not re-run in this pass: iterating a plain object is exactly that
  error; the **adversarial reviewer reported the throw**, and this clause pins the required
  behaviour regardless) where every other fail-state in this contract is a **status**.
  **STATUS-CORRECTED 2026-09-27 (same follow-up): `Array.isArray` is now the predicate's FIRST
  statement (`:82`, read, ahead of the loop at `:83`), so a non-array is refused with a status
  — the throw is no longer reachable (item 3's requirement, met).**

**1. The pinned return shape (replaces §2.4a's two-branch description).**

```ts
// src/renderer/secure-panels.ts:328 — the seam's signature (read this pass: the
// pre-block-7 `:299` anchor moved when the §2.2.1 `value`-slot clear landed)
applyPaneMutation(nodeId: string, mutation: unknown[]): { status: string; applied: boolean }
```

**THE RULING, verbatim as the contract:** **`applied` must mean "the ENGINE applied it", i.e.
`applied === (status === 'applied')`; a refusal is never reported as applied.** Both branches
are pinned exactly, and the **THREE** reachable outcomes are these — no fourth outcome is
reachable, and no outcome may report `applied: true` with a non-`applied` `status`:

| # | Outcome | Condition | Returned shape (pinned) |
| --- | --- | --- | --- |
| **(i)** | **shape-refused** | the **pane predicate** refuses: `mutation` is **not an array** (the new `M9`), an element is **not a non-null object**, or an element's `targetProp` is **missing / non-string** (the landed predicate's ONLY reject class, `src/renderer/secure-panels.ts:81-89`, read) | **`{ status: 'rejected', applied: false }`** — **nothing is applied**, nothing is rendered, and the node keeps its prior state and its last-known render (`M8`, §3.6). **NEVER a throw** — the non-array batch included. |
| **(ii)** | **engine-applied** | the predicate passes **and** the engine applies the op (`Supervisor.apply`'s **`state-slice`** branch (`node_modules/provident-ssr/dist/core/supervisor.js:913`, read) returns `status: 'applied'` at its tail, `:1012-1027`, read) | **`{ status: 'applied', applied: true }`** |
| **(iii)** | **engine-refused** — *the branch the current text omitted* | the predicate passes **and** the engine refuses (its own verdict, **not** this unit's to pin as a code) | **`{ status: <the engine's verdict>, applied: false }`** — e.g. `{status:'rejected', applied:false}` for the reachable cause named below. **`applied` is `false` because the ENGINE did not apply it**, even though the *predicate* passed. |

- **The `status` field stays the ENGINE's verdict where the engine was reached** (`'applied'`,
  its `rejected`, or the engine's own other verdict); the predicate's own refusal contributes
  the one literal `'rejected'` of outcome (i). **`applied` is DERIVED from that verdict** —
  `applied === (status === 'applied')` — never a separate flag.
- **`applied: false` is therefore not a synonym for "the predicate refused"**: it is the
  honest answer to *"did the engine apply this write?"* for outcomes (i) **and** (iii). A row
  that wants to attribute a refusal to the **predicate** must use a **shape-malformed** input
  (`PF-5`), because the public `{status}` alone carries no predicate-vs-engine discriminator
  (the same limit §2.3 / §3.5 `P7b` states for `layer-apply`).
- **The row the TestWriter carries for this:** `PF-1b`'s shape is superseded by this clause —
  the assertion is `{status:'rejected', applied:false}` for an unresolved `nodeId`, **not** the
  landed `applied:true`.

**2. The reachable engine-refusal causes (named, so the outcome above is not a hypothetical).**
The reachable cause on this host is an **unknown / foreign `nodeId`**:

- the seam resolves the target with the ENGINE's own accessor — `const node =
  this.supervisor.getNode(nodeId)` (`src/renderer/secure-panels.ts:301`, read);
- `Supervisor.getNode(id)` is `this.nodes.get(id) ?? this.destroyedRefs.get(id)`
  (`node_modules/provident-ssr/dist/core/supervisor.js:155-157`, read), so an id that is not a
  registered node of **the pane's isolated graph** (or not a destroyed-ref) yields
  **`undefined`**;
- `Supervisor.apply` then takes its first guard: `if (!node && op.kind !== 'clone-instance' &&
  op.kind !== 'layer-apply' && op.kind !== 'rows-mint' && op.kind !== 'rows-clear') return
  { status: 'rejected', error: { code: 'unknown-node' } }`
  (`node_modules/provident-ssr/dist/core/supervisor.js:847-850`, read this pass) — so a
  `state-slice` with no resolved node is the engine's **`unknown-node` rejection**, and the
  seam's outcome is (iii) with `status: 'rejected'`, `applied: false`.
- **A FOREIGN nodeId is the same class**: the pane graph is isolated, so an id from the APP
  graph does not resolve in the pane supervisor's registry — `getNode` returns `undefined` and
  the engine's `unknown-node` guard fires identically. **No row may call a foreign id "applied".**
- **Not a cause, recorded so it is not invented:** the engine does **not** throw out of `apply`
  on an unresolved node (the guard is a contained `rejected`, above) — so outcome (iii) is a
  status, never a throw, and the seam's "never a throw" claim survives for it.

**3. The `mutation` parameter's array guard (item B) — pinned as a REQUIREMENT, MET by the
landed tree (status corrected 2026-09-27, block 7's `B-LANDED` follow-up; the requirement text
is unchanged).** The pane predicate's reject class **must be the same class as `Runtime`'s,
differing in nothing but its container (§2.4)**, and that class **explicitly includes the
non-array batch**:

- `Runtime`'s container guard is `src/renderer/runtime.ts:409-414` (read this pass:
  `if (cmd.kind === 'state-slice' && !Array.isArray(cmd.mutation)) return { status: 'rejected' }`
  at `:409-411`, and the same for `layer-apply` at `:412-414`);
- the pane channel's equivalent **refuses** a non-array `mutation` the **same way** —
  `{status:'rejected', applied:false}` (outcome (i)) from the seam, and for `syncConfig`'s own
  call site the existing skip-whole behaviour — and **never** throws. **Read this pass, it now
  does**: the guard is the **first statement** of `paneMutationValid`
  (`src/renderer/secure-panels.ts:81-89`, read: `:82` `if (!Array.isArray(mutation)) return
  false`, ahead of the `for (const m of mutation)` loop at `:83`), so it covers **both** call
  sites from inside the predicate — the seam (outcome (i)) and `syncConfig` (skip-whole);
  the landed harness row asserts the **six-shape** table
  (`tests/host-guard-panes.test.ts:578-640`, read);
- **the row id the TestWriter carries for it is `M9`** (§3.6, with `M2`/`M3`/`M8`; named in
  §4.1, §5.2 and §5.5's `P-TP-1` compensating-rows list, which over-claimed the pane channel's
  coverage **until this clause** — `M8` covered only a shape-malformed **element** inside an
  array, never the container).
- **Layer label: [H] requirement, [T] row.** The requirement is host contract; `M9` is the
  harness row that makes it falsifiable.

**4. The nodeId vocabulary, DECIDED (item F(2)) — the parameter takes the ENGINE nodeId, and
no documented route converts an authored `props.id` into it.** This resolves the conflict
between §2.4a's `nodeId` parameter name and §4.2's pane-fixture sentence (which said the pane
fixture *"addresses pane nodes by their **authored `props.id`** because that is the vocabulary
`SecurePanels` itself uses"*):

- **Supported vocabulary: the ENGINE nodeId** — the same id vocabulary as `Runtime`'s
  `docs/decisions.md:24` authority and the id `n.id` the pane graph's own supervisor registers
  (`src/renderer/secure-panels.ts:244-247`, read). An authored `props.id` passed here is an
  **unresolved id** and yields outcome (iii) — measured, `PF-1`/`F-2`
  (`docs/specs/engine-pin-greens.md` §2.8's `PF-1` row and its finding `F-2` — read; `F-2` is
  recorded in that file's §3a, where the two id forms are compared on the same call).
- **The resolution route a caller is ALLOWED to use, stated plainly: the host's own id index
  — there is NO public pane-side accessor for it today, and this spec does not invent one.**
  What was checked by reading, this pass:
  - `Runtime.listTargets()` **is** a public surface and **does** expose the `nodeId` ↔
    `cssId`/`propsId` mapping (`src/renderer/runtime.ts:1149-1174`, read: each `NodeInfo`
    carries `nodeId` plus optional `cssId`/`propsId`) — **but it reads the APP graph**
    (`this.supervisor`, the app `Runtime`'s) and is **blind to the isolated pane graph**, so it
    is **not** a resolution route for a pane node (the isolation guarantee
    `docs/specs/secure-panels.md:59-65`, read);
  - `SecurePanels.dispatch(id)` **does** accept an authored `props.id` and resolves it
    internally (`src/renderer/secure-panels.ts:268-275`, read: `allNodes().find((n) =>
    n.props?.id === id)`) — but it is a **click-dispatch** seam (`dispatchEvent(node.id,
    'click')`), it returns `void`, and **it exposes no id**; it is therefore **not** a
    documented resolution route either. It is cited here only so a later pass does not
    "discover" it as one;
  - no other public pane-side accessor exists on the class
    (`src/renderer/secure-panels.ts:219-402`, read; the public members are `debugText`,
    `dispatch`, `applyPaneMutation`, `refreshDebug`, `refresh` plus `constructor`).
  - **Therefore:** *callers must resolve the pane node's engine nodeId through the host's own
    id index* (i.e. from the pane graph's node list, which is the host's data), and **the
    test-side resolution is a TEST HARNESS DETAIL, not a contract route**: the landed pane
    suite reaches it as `(panels as unknown as {supervisor:{allNodes()…}}).supervisor.allNodes()`
    (`tests/host-guard-panes.test.ts:116-129`, read: `nodeIdOf`) — a **read of a private field
    by the suite**, permitted as a harness detail and **not** offered to any caller as API.
- **A new public route on `SecurePanels` (a `listTargets`-analogue for the pane graph) is
  RECOMMENDED, NOT ADMITTED by this pass — it is parked in §7's owed list** (item 11) because
  adding it would be a **new production surface** and this unit's one admitted testability seam
  is already recorded (`§7.9`, §2.4a). **No such method may be added silently under this
  clause**; if a later pass wants it, it lands as a re-admission with its own rows.
- **§4.2's pane-fixture sentence is AMENDED to match**: the fixture addresses pane nodes by
  their **engine `nodeId`, resolved from the pane graph's node list by the test harness** —
  **not** by the authored `props.id`. *(SUPERSEDED, at §4.2: "the pane fixture … addresses pane
  nodes by their **authored `props.id`** because that is the vocabulary `SecurePanels` itself
  uses (`src/renderer/secure-panels.ts:340`, read)" — why: measured false at the seam,
  `PF-1`/`F-2`; and `:340` is the **`syncConfig` loop's own** `props.id` read, a different
  code path from the seam's parameter.)*

**5. What this clause does NOT change (boundary).** No new method, no new exported identifier,
no shim member, no DOM capability, no vocabulary, no content, no default, no store and **no
MCP/IPC surface** (§0's six prohibitions all hold): this clause pins the **contract of one
already-admitted method** plus the **`M9` requirement** that makes its reject class match
`Runtime`'s. `syncConfig`'s shipped writes are untouched (§2.4). **The two contract violations
this clause originally named have SINCE been fixed on the landed tree, and the text here is
STATUS-CORRECTED, not re-scoped (block 7's `B-LANDED` follow-up, read this pass):** the seam
now returns `applied: status === 'applied'` (`src/renderer/secure-panels.ts:334`, read) — so an
engine refusal is no longer reported as applied — and the array guard is the predicate's first
statement (`:81-89`, read), so the non-array batch is refused with a status. **What is NOT
established here:** the harness rows' green measurement — that is the ledger's (§4.3), and the
per-unit documentation review (item 10d) still owns the row-by-row reconciliation. *(The
pre-status sentence read: "The landed `applied: true`
behaviour and the missing array guard are **contract violations this clause names** — the
TestWriter's red for them is the next pass's work (`§4.1`'s `M9` row, `§7.2`)." — SUPERSEDED
as a STATUS statement only; every requirement it carried stands.)*

## 3. Behavior (every state / fail-state)

**Layer labels:** **[E]** = engine-side (behaviour of the installed `provident-ssr`
dist); **[H]** = host-side (this repo's `src/**`); **[T]** = harness-side (this repo's
`tests/**` + `src/shared/dom-shim.ts`, which is host-owned test code).

**Section order note.** The adversarial record for this unit is **§3a** (probe seeds and
their disposition) and **§3b** (the AF-1..AF-11 findings as this contract now reflects
them); both sit at the **end of the file**, after §7, matching the
`renderer-backend-hardening.md` §3a convention. §3.4/§3.6 are the tables those sections
dispose of.

### 3.1 The retarget state **[H] + [E]**

- **Pre-retarget (historical — the tree the red run executed on).** `package.json:23` was
  `^0.2.1`; the installed dist was `0.2.1`; the `props.` / `css:` / `data:` `undefined`
  paths call `removeAttribute` (`:194`, `:120`, `:187` of the **pre-install** dist, read
  then); there was **no** boolean-attribute branch and **no** `BOOLEAN_ATTRS` (grep for
  `BOOLEAN_ATTRS|booleanAttrValue|hasAttribute|inert` over that dist: no match, read in
  that pass) — so `props.hidden:'false'` rendered `hidden="false"` (present, wrong).
  *(Pre-amendment label: "**Pre-retarget (today)**" — the install has since landed, so
  "today" is now **landed**; kept as historical with the citation marked pre-install.)*
- **Post-retarget (landed).** `package.json:23` = `^0.5.1` + the installer-regenerated
  lockfile; the **installed** dist carries the boolean branch and the set:
  `BOOLEAN_ATTRS` `:25`, `booleanAttrValue` `:56`, the DOM boolean branch `:300-313`, the
  SSR boolean branch `:520-527`, the removal paths `:290-291`/`:297-298` (all read this
  session). The adjacent-source anchors (`:292-302` DOM / `:513-519` SSR) are
  **(recon/adjacent)** — the dist citations supersede them (§Layer declaration 3). Nothing
  else in this repo's declarative state changed.
- **Install ownership.** The install was run by the architect outside the session and is
  **DONE** (`docs/next-steps.md`, the `## OPEN` row **A** provenance row **(the row MOVED to that file's `U-ENGINE-PIN` DONE record on 2026-09-27)**); this repo's writing agents **cannot** run
  `npm install` (no in-session install route). The lockfile diff remains an
  **architect-supplied input**; the installed dist's line numbers above were read directly.
- **Fail-state (retarget).** If the install could not resolve `0.5.1`, or the resolved dist
  lacked the boolean branch, the unit **stops** and returns to the architect — the red
  set is re-derived (§7), and §4's boolean rows are **void, not waived**. *(The installed
  dist carries the branch — this fail-state did not fire.)*

### 3.2 `removeAttribute` — the shim states **[T]**

| State | Behaviour |
| --- | --- |
| Attribute present via `setAttribute('title','t')` | `removeAttribute('title')` → `getAttribute('title') === null`; `outerHTML` no longer contains `title="t"`. |
| Attribute **absent** | `removeAttribute('title')` → no-op, no throw, `outerHTML` unchanged (idempotent). Repeated calls are idempotent. |
| `id` set via the **special case** (`setAttribute('id','x')` → the `id` slot) | `removeAttribute('id')` → `getAttribute('id') === null` **and** `outerHTML` no longer contains `id="x"`. Both stores cleared (§2.2 item 1; the `value` twin's contract is §2.2.1). |
| `id` set via the special case, then a **non-`id`** removal | `id` slot + `id="…"` survive. |
| `value` set via `setAttribute('value','7')` (the **store**; `setAttribute` has no `value` special case, so the slot is only written when the adapter's form-control path writes it — `dist/core/adapters.js:203-208`, read) | `outerHTML` carries `value="7"` and `getAttribute('value') === '7'`. **This row is about `setAttribute`, not about which removal route arrives**: the removal side is keyed on the KEY `'value'` + the TAG (§2.2.1 item 3, amendment block 7) — a `prop:value` removal (`dist/core/adapters.js:296-298`) and a `css.value` removal (`:214-224`) **both** reach the same special case on an `INPUT`/`TEXTAREA`. |
| `value` **slot** written (`el.value = '7'`) **plus** the attribute serialized, on a **form-control** element (`INPUT`/`TEXTAREA` — §2.2.1 item 3) | `removeAttribute('value')` clears **BOTH** (`§2.2.1`): `el.value === ''` **AND** `getAttribute('value') === null` **AND** `outerHTML` no longer contains `value="7"`. **This is the state `PF-2`/`PF-4`'s observable depends on** (§2.2.1, amendment block 6). |
| `value` slot untouched (the `''` default, `src/shared/dom-shim.ts:14`, read) on a form control, no `value` attribute present | `removeAttribute('value')` is an **idempotent no-op, never throws**; `el.value === ''` before and after; repeat calls leave `outerHTML` identical (`P-IM-2`). |
| `value` attribute present on a **NON**-form-control element (a `div` with a `props.value`) | **store-only**, unchanged: `getAttribute('value') === null`, `outerHTML` no longer carries it, the element's `value` slot is **not** touched (§2.2.1 item 3 pins the scope — a wider scope is a finding). |
| Non-string key | Coerces; absence → no-op; never throws. |
| Element with `className` / `style.cssText` set | Unaffected by any `removeAttribute` call (those are not attribute-store members). |

### 3.3 The boolean-attribute emit contract, BOTH adapters, under `0.5.1` **[E]**

Applies to the **engine's closed boolean set** (not enumerated here as contract; exactly
**two named members** are asserted — `inert` and `readonly`):

| Authored / mutated value | DOM adapter (shim leg) | SSR adapter (fragment leg) |
| --- | --- | --- |
| truthy string (`'true'`) | attribute **present**, `getAttribute` returns the authored string form `'true'`; `outerHTML`/`innerHTML` contains `inert="true"` | attribute **present** with the same authored string form (`inert="true"`); `openTag` builds `k="v"` (`:586-589`, read) |
| `false` (or any falsy literal: `0`, `'0'`, `'false'`, `''`) | attribute **ABSENT** (`getAttribute` → `null`; the shim reaches `removeAttribute`) — never `inert="false"` | attribute **ABSENT** (`state.attrs.delete`) — never `inert="false"` |
| `undefined` on a boolean member | attribute absent (the `undefined` path, `:290-291` DOM / `:512` SSR) | attribute absent |
| `null` | **NOT asserted by this unit** — the truthiness rule makes `null` OFF on the DOM leg (`:298` pre-install dist; the landed dist's equivalent is the boolean branch at `:306`, read), but the SSR branch is entered only when `val !== undefined` (`:520`, read), so the `null` **member** form is an `U-ENGINE-DRIFT`/adversarial probe, not a pin here. §3a `A-4` names it, §3b AF-4 carries it. |

- **ON ⇒ the authored string form** (the engine's own comment calls `hidden="true"` "the
  existing pin", `:294`, `:514-515`); **OFF ⇒ absent**, never `k="false"`. This is the
  capability the `^0.2.1` pin does not have (§3.1) and the reason `SCH-12`'s `inert`
  criterion becomes expressible only after this unit (`H-r3` amended).
- **The `inert` name is used through the engine** — this repo hard-codes no
  `inert` string in any mechanism (`U-OVERLAY`'s contract is the declaration); the
  `inert` rows here are **engine-contract proofs**, authored as envelope/test data.

### 3.4 The host shape guard — the attribute-path PASS-THROUGH table **[H] + [E]**

**Post-amendment (ruling 1).** Every row below is **APPLIED** — `{status:'applied'}`, no
throw, the attribute **gone** from the DOM and the SSR output, siblings and other props
untouched. Nothing here is a fail-state any more. The **only** fail-states left in this
section's family are §3.6's **shape** rejections.

| # | Mutation reaching the engine via `applyCommand` | Verdict | Observable |
| --- | --- | --- | --- |
| **PA-1** | `[{targetProp:'props.hidden', value: undefined}]` | **`{status:'applied'}`** | the node's `hidden` attribute is **absent** (`getAttribute('hidden') === null`; the SSR fragment has no `hidden=`) — the engine's prop-attr `undefined` path calls the completion (`dist/core/adapters.js:297-298`, read) |
| **PA-2** | `[{targetProp:'props.hidden', value: null}]` | **`{status:'applied'}`** | same absence — reconciliation of AF-7: the layer merge keeps the key with a `null` value and the render diff emits `set … value: undefined` (`dist/core/render.js:32-41`, read: the removal op is `{kind:'set', name, value: undefined}` at `:39`), which lands on the adapter's `val === undefined` path (`:297`). **Boundary (stated so it is not over-generalised):** `null` is an attribute **removal** on the **attribute** paths; on a `VALUE_FORMS` tag (`input`) `val === null` is **not** `undefined`, so the adapter stringifies it instead of clearing (`:315-318`, read) — see `PF-3` |
| **PA-3** | `[{targetProp:'props.hidden', value: undefined}]` **+ a sibling `props.title:'t'`** | applied, whole batch | `hidden` absent **and** `title="t"` present — **siblings untouched** |
| **PA-4** | `[{targetProp:'props.hidden'}]` (no `value` key) | **`{status:'applied'}`** | same absence. **AF-7, stated once:** an **absent** `value` key and an explicit `undefined` are the **same removal** in the engine — `applyPropSlice` builds `{props:{[key]: undefined}}` (`dist/core/node.js:1521`, read), the merge copies the key (`:961-963`, read) and the diff emits the value-`undefined` set op; the two forms are therefore **one contract**, not two |
| **PA-5** | `[{targetProp:'css.role', value: undefined}]` | **`{status:'applied'}`** | `role` absent from the DOM/SSR of that node; the adapter's `css:` op path takes the `removeAttribute(key)` branch (`dist/core/adapters.js:214-224`, read — `key ≠ id/classes/style`) |
| **PA-6** *(REWRITTEN 2026-09-27 — the engine's auto-mint reality)* | `[{targetProp:'props.id', value: undefined}]` | **`{status:'applied'}` — but the `id` attribute is NOT removed on this engine** | **Observed (the honest observable — the row fails today if it asserts absence):** `getAttribute('id') !== null`, i.e. an `id` is still **present**, and it is **no longer the authored value** — the engine's **auto-mint fill re-materialises `props.id`** (`this.pass1.props.id = \`preempt-node-${this.id}\``, `node.js:1908-1912`, read) at the END of `compileLocal` (`node.js:1009-1010`, read: `this.pass1 = {…}; this.ensureAutoIds();`), so by the time the element is emitted the `id` key is a **string again** and the **`removeAttribute('id')` branch is NEVER reached** (`adapters.js:296-298`, read: that branch fires only when the value reaching `setProp` is `undefined`). The attribute that survives therefore carries the **synthesized** `preempt-node-<nodeId>` form — which is an **authored-`props.id`-independent string** the row observes by inequality, its exact form being **recorded, not pinned** — so the observable is **`getAttribute('id') !== '<authored id>'` + the attribute still present**, NOT "absent". *(SUPERSEDED: "the `id` attribute is **absent** — the adapter's prop-attr branch calls `removeAttribute('id')` (`:296-298`, read), which is the shim's **slot + store** clear …" — why: the removal branch is unreachable for `props.id` on this installed dist; the auto-mint wins. The mechanism sentence is kept in this cell rather than deleted.)* |
| **PA-7** | `[{targetProp:'css.id', value: undefined}]` | **`{status:'applied'}`** | the `id` attribute is **absent** — by the **adapter's `css:` path**, `elem.id = ''` (`adapters.js:216-218`, read: `if (val === undefined) { if (key === 'id') elem.id = '' … }`), **not** by `removeAttribute`. **The PA-6/PA-7 contrast, stated so no later pass mistakes one for the other:** `css.id` (this row) reaches the adapter as the op-name **`css:id`** and **does remove** the slot (`elem.id = ''`); `props.id` (PA-6) reaches it as the op-name **`prop:id`** and **cannot remove** — the engine's own auto-mint fill overwrites the key to a string before the emit, so `setProp` never sees `undefined` for it. **`props.id: undefined` is therefore NOT a route that removes the `id` attribute on this engine, and no later row may assert that it is.** Both shim-side routes still exist and are asserted in this unit (`R-10` covers `ShimElement.removeAttribute('id')` directly; this row covers the `css.id` route). **Why `props.id` cannot simply be "written as a string again":** the engine's fill runs *after* every layer merge and only for a **non-string** id (`node.js:1908-1911`, read), so no host write can make the compiled id `undefined` for that key — the `css.id` route is the one whose op-name (`css:id`) the adapter handles *after* the compile, and it therefore clears the slot (`elem.id = ''`, mirrored by the shim's `id` **slot** clear, `src/shared/dom-shim.ts:55-58`) |
| **PA-8** | 3-element batch, the MIDDLE element a nullish `props.<key>` write, the other two defined writes with distinct observables | **applied, whole batch** | all three observables changed (both defined writes + the removal) — the pre-amendment "atomic reject" shape is **gone**: the host never half-applies a **malformed** batch, and never refuses a **value-shaped** one |
| **PA-9** | `[{targetProp:'css:<key>', value: undefined}]` (the COLON spelling) | `{status}` = the engine's own verdict — **not pinned**, and the row exists to record the boundary (defect fix) | **Honest expectation: the colon spelling is INERT as a mutation target.** `Node.applySlice` matches `props.`/`css.`/`hooks.` only (`dist/core/node.js:1422`, `:1427`, read) and `css:<key>` is the **adapter's op-name** (`dist/core/adapters.js:214`), so no attribute is removed and nothing throws. **Allowed** by this contract (no value-shaped write is refused anywhere — AF-5) but **never the row that proves a removal**: use `css.<key>` |
| **PA-10** *(REWRITTEN 2026-09-27 — amendment block 7, item D: the bare-name claim is contradicted by measurement)* | a **bare** attribute name (`targetProp:'hidden'`, no prefix) with a nullish value — **and** the same bare name with a DEFINED value | `{status}` = the engine's own verdict (**not pinned**); no host interception — **and the spelling is INERT as a mutation target.** | **MEASURED (the honest observable — this row is NOT a removal row):** the blind layer measured a bare `targetProp:'title'` / `'hidden'` returning **`{status:'applied'}`** with the attribute **present BEFORE and AFTER** the call (no attribute change at all), and a **DEFINED** bare-name write (`title:'v'`) **equally a no-op** — while the `props.title` control on the **same node** **does** remove it (`docs/specs/engine-pin-greens.md` §3a's `F-1` row, read). **The engine ground (read this pass):** `Node.applySlice` matches only the **prefixes** `type` / `content` / `handlers` / `props.` / `css.` / `hooks.` (`dist/core/node.js:1410-1445`, read: `:1410` `type`, `:1414` `content`, `:1418` `handlers`, `:1422` `props.`, `:1427` `css.`, `:1432` `hooks.`), so a bare name creates **no layer at all** — the adapter's `removeAttribute(attr)` fallback (`dist/core/adapters.js:296-298`, read) is **never reached with it**. **The shim's method is reached by the `props.`/`css.`-PREFIXED routes** (`prop:value` → `:296-298`; `css.<key>` → `:214-224`), **not by a bare name.** **Allowed by this contract** (nothing is refused — a value-shaped write is never the predicate's business) but **NEVER a row that proves a removal**; the bare-name half of §2.3's covered-spellings list and of §3b `AF-5` carry this same correction. *(SUPERSEDED: "the adapter's fallback branch routes a bare name to `removeAttribute(attr)` … **AF-5 disposition: allowed, and the shim's method performs the removal**" — why: the measurement above; the `:296-298` fallback is reached by the `prop:`-prefixed op-name route, which a bare `targetProp` never produces.)* |

**Superseded reject rows (`G1..G8`), with what replaces each.** These were §3.4's
`{status:'rejected'}` table; they are kept, struck through in meaning, so no later pass
cites them:

| Old row (pre-amendment text) | Status | Replaced by |
| --- | --- | --- |
| **G1** `props.X: undefined` → rejected | **SUPERSEDED BY ruling 1** ("Pass removals through") | **PA-1** |
| **G2** `props.X: null` → rejected | **SUPERSEDED BY ruling 1** | **PA-2** |
| **G3** `props.X` with no `value` key → rejected | **SUPERSEDED BY ruling 1** (+ AF-7 reconciliation) | **PA-4** |
| **G4** `css:X: undefined` → rejected | **SUPERSEDED BY ruling 1** (+ the defect fix: the engine-effective name is `css.<key>`, not `css:X`) | **PA-5** |
| **G5** `css:id: undefined` → rejected ("before the engine's `el.id = ''` path") | **SUPERSEDED BY ruling 1** — the `el.id = ''` path is now **the contract**, not something to pre-empt | **PA-7** |
| **G6** `props.id: undefined` → rejected ("before the `removeAttribute('id')` path") | **SUPERSEDED BY ruling 1, AND its mechanism sentence is SUPERSEDED by the engine's auto-mint reality (2026-09-27)** — `removeAttribute('id')` is **not** the mechanism on this engine: the auto-mint fill re-materialises `props.id` (`node.js:1908-1912`, `:1009-1010`, read) so that branch is never reached and the attribute **survives** as the synthesized `preempt-node-<nodeId>` form. The pre-amendment phrase *"before the `removeAttribute('id')` path"* is kept here (superseded, never deleted) so a later pass sees what it replaced | **PA-6** (rewritten: applied **without** removal, `css.id` is the route that removes) |
| **G7** 3-element batch with one nullish element → rejected whole ("atomic") | **SUPERSEDED BY ruling 1** — value-shaped writes are not batch-refused; **shape** rejection stays atomic (§3.6) | **PA-8** (+ §3.6 `M2`/`M3` for the shape half) |
| **G8** `content` with `undefined` → pass-through | **STANDS** (unchanged by ruling 1; it was already pass-through) | itself — now one row among PA-rows, not an exception |

### 3.5 The host guard — the defined-value pass-through paths **[H]**

**Post-amendment:** these are still pass-through, but the reason has **changed**: the guard
no longer discriminates on `value` at all, so a reject here would now be a **shape**
false-positive, not a nullish-value one. (Pre-amendment framing: *"not rejected by this
guard, and must reach the engine (a reject here is a false positive that breaks shipped
behaviour)"* — SUPERSEDED in premise by ruling 1; the rows stand.)

| # | Mutation | Expected |
| --- | --- | --- |
| P1 | `props.X: 'v'` (defined string) | applied; `result.status === 'applied'` (`tests/host-guard.test.ts:309-315`, read) |
| P2 | `props.value: ''` on a `VALUE_FORMS` tag (`input`) | applied; the element's `value` **property** is `''` (adapter's `VALUE_FORMS` branch, `dist/core/adapters.js:315-318`, read) |
| P3 | `props.data-on: 'false'` (defined falsy literal, the shipped pane write `src/renderer/secure-panels.ts:352`) | applied — **falsy ≠ nullish**, and neither is refused now |
| P4 | `props.tags: ['x']` / `props.tags: {a:1}` (array/object value) | applied (array/object handling is the engine's; `apply()`'s `status` is **not** pinned as `'applied'` here — the row asserts "not rejected by the guard" + the graph value). **`append`/`replaceAll` modes on an array prop are the engine's `applyPropSlice` modes** (`dist/core/node.js:1512-1521`, read) |
| P5 | `props.X: 0` / `props.X: false` | applied — falsy, defined |
| P6 | zero-mutation `mutation: []` | applied; the engine's no-op verdict (`status` is **not** pinned here — see §4.1 `R-12` note) |
| P7 | a non-`state-slice`/non-`layer-apply` kind carrying a nullish `props.` mutation | not intercepted by this predicate (it is **kind-scoped**); the engine's verdict stands. **Note the boundary:** kinds that reach `applyCommand` are covered for **shape**; handler-originated writes of ANY kind are not covered at all (§2.3 boundary) |
| P7b *(NEW 2026-09-27 — the `layer-apply` half of the kind scope; **REWORDED 2026-09-27, amendment block 7 item F(1)**)* | a **`layer-apply`** carrying a `mutation` (and no `target`/`nodes`) | **The decidable half is the SHAPE-MALFORMED one, and only that half is a row.** A `layer-apply` carrying a shape-malformed element (`[null]`, `[{targetProp:5}]`) returns **`{status:'rejected'}`** — that is the observation that **goes red if the predicate is removed** from `src/renderer/runtime.ts:425` (read), so the predicate's kind scope is **provable by construction of the malformed case alone** (the blind layer reproduced exactly this: `P7b-i`, `docs/specs/engine-pin-greens.md` §2.5, read). **The previous "NOT rejected by the predicate" form is NOT DECIDABLE on the public surface** — measured: a mutation-carrying `layer-apply` **and** the spec's own valid `layer-apply` shape (`target` + `nodes`) **both** return the identical opaque `{status:'rejected'}`, so no `status !== 'rejected'` assertion can attribute the verdict to the predicate or the engine (`P7b-ii`, `docs/specs/engine-pin-greens.md` §2.5, read; the finding is `F-3`, recorded in full in that file's §3a). **Therefore: the `applied`/verdict for a VALID `layer-apply` stays NOT PINNED**, and a row may assert only the **malformed** half. **A row may NOT assert `status === 'applied'` here**: `layer-apply` is the engine's mint-and-wire op, which needs `target` + a `nodes` array (`dist/core/supervisor.js:1188-1225`, read: `:1194-1196` `unknown-node`, `:1199-1201` `malformed-op`). *(SUPERSEDED in wording: "the row may assert only **'NOT rejected by the predicate'** (`status !== 'rejected'`-by-the-predicate) or the engine's own verdict, NOT PINNED … a valid `layer-apply` (`target` + `nodes`) is the shape that reaches `applied`" — why: the valid-shape leg proves nothing on this surface and the `applied` half of the sentence is not reachable as measured.)* |

### 3.6 Malformed mutations and unknown nodes **[H]** (pre-existing rejects, re-asserted)

| # | Input | Verdict | Source of the guard |
| --- | --- | --- | --- |
| M1 | `mutation` not an array (`'x'`, `{}`, missing) on a `state-slice` **(the `Runtime`/app channel — the PANE channel's container case is `M9`)** | `{status:'rejected'}` | `src/renderer/runtime.ts:409` (existing; the `layer-apply` twin is `:412-414`) |
| M2 | a mutation element that is not a non-null object (`null`, `'x'`, `42`) | `{status:'rejected'}` | **this unit's predicate** (landed `src/renderer/runtime.ts:481-489`; post-amendment: **shape only**) |
| M3 | a mutation element missing `targetProp` / non-string `targetProp` | `{status:'rejected'}` | **this unit's predicate** (post-amendment: **shape only** — the nullish-VALUE class is REMOVED, §3.4) |
| M4 | `node` a string that does not resolve | `{status:'rejected'}` | `:389` (existing) |
| M5 | `node` a non-string/non-object (number) | `{status:'rejected'}` | `:394` (existing) |
| M6 | `node` an object that is not a registered `Node` | `{status:'rejected'}` | `:401` (existing) |
| M7 | `cmd` `null` / `undefined` / primitive | `{status:'rejected'}` | `:383` (existing) |
| M8 | (pane channel) a shape-malformed **element** in a node's batch | that node's batch **skipped whole**; last-known state re-rendered (§2.4) | `paneMutationValid` (`src/renderer/secure-panels.ts:81-89`, read this pass — the pre-status `:68-85` anchor moved when the `Array.isArray` first statement landed, item B-LANDED) |
| **M9** *(NEW 2026-09-27 — amendment block 7, item B; §2.4b item 3)* | (pane channel) a **NON-ARRAY** `mutation` (`{}`, `'x'`, missing) handed to the public seam `SecurePanels.applyPaneMutation(nodeId, mutation)` — **and** the same container on the `Runtime` side, already refused | `{status:'rejected', applied:false}` from the seam (**outcome (i)**, §2.4b); **nothing applied**; the node's batch **skipped whole**; the last-known state stays rendered; **NEVER a throw** | **This row is the REQUIREMENT this unit pins, and the LANDED predicate now CARRIES it (status corrected 2026-09-27, the block-7 `B-LANDED` follow-up — the requirement itself is unchanged).** The `Runtime` container guard is `src/renderer/runtime.ts:409-414` (read: `!Array.isArray(cmd.mutation)` ⇒ `{status:'rejected'}` for `state-slice` **and** `layer-apply`); the pane predicate owes the **same** class and **now has it** — `paneMutationValid` tests `Array.isArray` as its **first statement** (`src/renderer/secure-panels.ts:81-89`, read: `:82` `if (!Array.isArray(mutation)) return false` before the `for (const m of mutation)` loop at `:83`), so the non-array batch is refused **at the predicate**, for **both** call sites, and the seam's `applied` is derived there too (`:334`, read: `applied: status === 'applied'`) — so a refused batch returns the **status** this row pins (`{status:'rejected', applied:false}`) instead of throwing. **The throw is therefore no longer reachable** (`TypeError: mutation is not iterable` was the pre-status behaviour: the predicate iterated its argument with no guard, `:72-79` of the pre-status read, and the throw was measured by the adversarial reviewer). **Landed status of the ROW: written and landed** — the harness row is a fixed **six-shape** table (`{}`, `undefined`, a string, a number, `null`, and a `Symbol.iterator`-throwing Proxy — the last two are the shapes a duck-typed check would wrongly admit; `tests/host-guard-panes.test.ts:578-640`, read, fixed order), each asserting `{status:'rejected', applied:false}`, no throw, nothing applied and the last-known render unchanged. **What is still NOT established by this pass:** the row's own **green measurement** (the ledger §4.3 owns that) — the *behaviour* is read from the landed tree, not re-run here. |

All M-rows are **host-side, never-throw** rows in the `HOST-OP-REJECT` shape. M2/M3 are
strictly **additive** to the existing gates: no existing test in `tests/**` feeds a
mutation element without a `targetProp` (checked by grep over `tests/**` for
`targetProp`, read this session: every hit is `content`, `props.tags`, `placement`,
`props.data-on`, `props.value`) — so the new rejects cannot silently convert a green into
a red. **Post-amendment the M-rows are the predicate's ONLY reject class**: a reject on a
**value-shaped** write is now a **false positive** (§3.4 PA-rows) and a review finding.
*(SUPERSEDED framing: the pre-amendment M2/M3 were described as the reject class beside
the nullish-value class; the nullish-value class no longer exists — ruling 1.)*
**`M9` (NEW 2026-09-27) is the one M-row whose LANDED status moved after the amendment was
written, and it is now STATUS-CORRECTED (block-7 `B-LANDED`, read this pass): the `Runtime`
half was always landed (`src/renderer/runtime.ts:409-414`, read) and the **pane half has since
landed too** — `paneMutationValid` tests `Array.isArray` as its first statement
(`src/renderer/secure-panels.ts:81-89`, read), so the seam refuses a non-array batch with a
status instead of throwing, and the landed harness row asserts exactly that
(`tests/host-guard-panes.test.ts:578-640`, read). **No M-row's landed behaviour contradicts its
row any more**; the requirement text (§2.4b item 3) is unchanged (§2.4b item 5).

### 3.7 The version-mismatch fail-state **[E] + [H]**

| State | Behaviour | Layer |
| --- | --- | --- |
| Under the **OLD** pin (`^0.2.1`), an `undefined` `prop:`/`css:`/`data:` write **reaches** the adapter | `el.removeAttribute(...)` is called on `ShimElement`, which had no such method → **`TypeError: el.removeAttribute is not a function`** thrown out of `setProp`/`renderProducingProcess` — a **crash**, not a clean fail. This is the pre-existing latent gap (`RK-1`), and the red run observed exactly it. | [E]→[T] |
| Under the **NEW** pin, boolean **OFF** (`props.hidden: false`) | the same `removeAttribute` call comes from the boolean branch (`dist/core/adapters.js:310`, read) → identical `TypeError` **without** the completion. The gap was therefore *wider* at `0.5.1`, not new. | [E]→[T] |
| With the **completion landed** (this unit) | every path is clean: the attribute is deleted (slot **and** store for `id`, and now for `value` on a form control too — the block-6 second special case, §2.2.1); no throw. **The completion IS the mechanism** — §2.2 item 7. | [T] |
| ~~"With the **host guard landed**, the `undefined`-reach-adapter path is additionally **prevented** at the two managed channels — the engine never sees the nullish value there."~~ **SUPERSEDED BY ruling 1** ("the mechanism that makes it safe is the shim completion … NOT a host rejection"). | **Replaced by:** the host predicate lets nullish values **through** by design; the **completion** is what keeps every nullish removal write (managed channel, handler path, or engine-internal) from crashing. There is **no** capability-restricting state any more, and no "guard prevents the engine from seeing it" claim anywhere in this contract. | [H] |
| **Version skew** (pin `0.5.1`, `node_modules` stale at `0.2.1`) | boolean-OFF rows fail as `hidden="false"` present; boolean-ON rows pass; the pass-through rows pass. That combination is the signature of a **half-installed** tree; the `R-14` row asserts the installed `node_modules/provident-ssr/package.json` version so skew cannot be silently green. | [E] |

**Honest statement about the predicate's relation to the completion (rewritten for ruling
1).** The completion is the **only** mechanism — not "defence in depth" beside a rejecting
guard: *"the mechanism that makes it safe is the shim completion (`ShimElement.removeAttribute`,
`H-r7`), NOT a host rejection"* (architect, ruling 1, verbatim in substance). The
predicate covers exactly two host call sites, **for shape**; the completion is what keeps
the **engine's** own `undefined` paths — including `ctx.clientAPI.apply` handler writes
the predicate never sees (§2.3 boundary) and any future call site in a dist this repo
installs — from crashing a shim render.

## 4. Verify (states) — the RED SET

**Test-file status, corrected (AF-11) — read this, not the superseded block below.** All
**six** files exist and are landed (`tests/engine-pin-boolean-ssr.test.ts`,
`tests/engine-pin-boolean-dom.test.ts`, `tests/dom-shim-remove-attribute.test.ts`,
`tests/host-guard.test.ts`, `tests/engine-pin-version.test.ts`,
`tests/engine-pin-controls.test.ts` — all read this session; **the seventh file
`tests/host-guard-panes.test.ts` + `tests/fixtures/pane-mutation-fixture.mjs` have since
landed too — both read this session**), and the red run measured
**79 assertions / 61 red / 18 green-not-red** against them (`docs/next-steps.md`'s
`U-ENGINE-PIN` DONE record — read `## DONE — U-ENGINE-PIN`, whose entry supersedes the former `## OPEN` row **A** (the row MOVED, not deleted) — together with that file's `CURRENT WORK` block's historical-ledger paragraph, read). **Post-amendment the count is SEVEN test files + one fixture** — the pane
half needs its own file (`tests/host-guard-panes.test.ts` + `tests/fixtures/pane-mutation-fixture.mjs`,
§2.4a/§5.2) — which is the second half of the AF-11 fix (§5.1's "the **four** new test
files" was wrong in the other direction).

**The SECOND red cycle, recorded here as the supervisor reported it (2026-09-27; NOT
re-measured by this pass).** The amended 110-row set ran **101 pass / 9 fail**
(`docs/next-steps.md`'s `## DONE — U-ENGINE-PIN` record, its red/green prose — the ledger's
second line is that file's `CURRENT WORK` block, `Historical ledger` paragraph), the 9 being
**five adjudicated contract conflicts** (`docs/next-steps.md`'s `## HANDOVER UPDATE 2`
five-row adjudication table, read) — of which **three are the SPEC half this amendment
discharges**: the `props.id` auto-mint reality (**§3.4 `PA-6`**, `PA-6`-rewrite above), the
`layer-apply` kind-scope verdict (**§2.3** kind-scope note + §3.5 `P7b`), and the pane
baseline persistence (**§2.4a.1**, the new clause; and its §5.1 item 5 hunk). **The other
two dispositions are TEST-ONLY (the `css.role: null` row — that table's row `1` — and `P-SM-1`'s
`renderedHtml` read route — that table's row `4`) and are deliberately NOT spec amendments** — this
file does not assert either of them, so nothing here is changed for them. **No numeric
claim in this section is re-derived by this amendment**: the 79/61/18 line is the FIRST
red run and the 110/101/9 line is the SECOND; a later pass must quote them as the two
distinct measurements they are (`§4.3` item 2's rule stands).

**The THIRD red cycle — the LAST red pair of this unit (`PF-2`/`PF-4`), recorded as the
supervisor reported it (2026-09-27; NOT re-measured by this pass).** The second cycle's
adjudication #5b (the `§2.4a.1` **baseline-persistence** diagnosis) was **DISPROVED by the
Implementer's live traces** and re-adjudicated by the architect as **amendment block 6**: the
pane loop **does** persist its baseline, the removal op **is** emitted and applied, and the
owed change is the **`value`-slot clear inside the EXISTING `removeAttribute`** — the NEW
**§2.2.1** contract — with `PF-2`/`PF-4`'s observable now **PINNED** as `el.value === ''`.
**§2.4a.1's original diagnosis, its "no shim `value` write of any kind" boundary and the
one "baseline-persistence hunk" §5.1 item 5 authorised are SUPERSEDED (§8's index); the
measurements quoted above are untouched** — a later pass must still quote 79/61/18 and
110/101/9 as the two distinct measurements they are.

*(SUPERSEDED — kept verbatim with its one-line why:)* "**Test-file status, stated
plainly.** The **six** files below **do not exist yet**; they are the files this unit WILL
create. There are no pre-existing tests for this surface: `U-ENGINE-PIN`'s red set is **new
evidence**, which is exactly why the thin-red fact is recorded (§4.4)." — *why: the
TestWriter/Implementer pass landed them, so the rows below are now the rows this amendment
re-scopes rather than a to-be-created set.*

**Shared harness (test-only, created by this unit, not exported to `src/`):**

```ts
// in each new test file (duplicated deliberately — no new src module)
// 1) a character-level attribute extractor — NOT a regex, NOT substring matching
function attrsOfTag(html: string, tag: string): Map<string, string | null> | null
//    walks `html`, tracks in-tag vs text state, honours `"…"`/`'…'`/unquoted values,
//    returns the attributes of the FIRST `<tag …>` it meets, null if the tag is absent
function attrsPresent(html: string, tag: string): Set<string>   // = keySet(attrsOfTag(...))
function attrsOf(html: string, tag: string): Record<string, string>  // {} if absent
function ssrOf(env: LegacyInitialData): string   // translateLegacy → SSRFragmentAdapter → toString()
```

Why an extractor and not `includes('hidden="true"')`: the real DOM serializes a boolean
attribute **without its value** (`<div hidden>`) while the shim/SSR serialize `k="v"`
(`src/shared/dom-shim.ts:79`, read) — a substring row is a **guaranteed false red**
(`RK-6`, `H-r10`). The extractor is a **precondition of any real-DOM attribute row** and
is authored in this unit's test files so the divergence-harness extension (`H-r10`) can
lift it. **Post-amendment (ruling 3) the divergence leg itself IS a leg of this unit
(§5.3 leg 6)** — but it asserts the harness's **existing structural** surfaces
(census / SSR fragment / `dirtied` / `data-node-id` set, `scripts/electron-divergence.mjs:143-150`,
read), **not** boolean-attribute serialization; the extractor is still **not** lifted into
the harness by this unit, so no real-DOM **attribute** claim is made anywhere
(`docs/specs/engine-pin-greens.md` §4's `DIV-1` row recorded the pre-amendment "not a leg"
posture — SUPERSEDED by ruling 3).

### 4.1 The red-set table

`Pre-change behaviour` is read against the tree described in each column:
**`0.2.1+shim`** = the pre-install pin with the `removeAttribute` completion landed (the
state the red run executed on, §4.3); **`0.5.1+shim`** = after the retarget with the
completion landed (the landed tree). **Post-amendment the "post-change" column is
re-scoped by ruling 1**: every value-shaped row now expects **`applied` + removal**, and
only shape-malformed rows expect `rejected`.

| ID | File | Test name | Exact assertion | Pre-change (`0.2.1+shim`) | Post-change (`0.5.1+shim`) |
| --- | --- | --- | --- | --- | --- |
| **PA-6** *(row-level relabel, 2026-09-27 — carried by `tests/host-guard.test.ts`, §3.4)* | `tests/host-guard.test.ts` | `§3.4 PA-6 — props.id: undefined …` | **Not a new row: the §3.4 `PA-6` row's own test, re-scoped by the auto-mint rewrite.** The landed assertion `getAttribute('id') === null` / `attrsOfNode(…).has('id') === false` / the SSR absence are **the pre-rewrite text**; the amended assertion is **the attribute still PRESENT and `!==` the authored id** (`getAttribute('id') !== '<authored id>'`), i.e. it fails **on absence, not on presence**. `getAttribute('id') === null` is **NOT a reachable observable for the `props.id` route** on this engine (§3.4 `PA-6`, `node.js:1908-1912`, `:1009-1010`, read) | **FAILS AS ASSERTION** — the attribute is present with the auto-minted value | **`applied` + the authored id GONE, the attribute still present as the synthesized form** — *the TestWriter's re-write of this one assertion is the row-level relabel the supervisor adjudicated; nothing in §3.4 changes with it* |
| **R-1** | `tests/engine-pin-boolean-ssr.test.ts` | `boolean ON emits the authored form in the SSR fragment (inert)` | load scenario envelope (§4.2); `attrsOf(ssrOf(env),'div')['inert'] === 'true'` for the `inert`-bearing node's tag | **PASSES** (no boolean branch ⇒ the generic `setAttribute` path already emits `inert="true"`) — an **anti-regression** row, not an upgrade proof | PASSES |
| **R-2** | same file | `boolean OFF is ABSENT in the SSR fragment, never ="false" (inert)` | `props.inert:'false'` authored; `expect(attrsPresent(ssrOf(env),'div').has('inert')).toBe(false)` and `expect(ssrOf(env)).not.toContain('inert="false"')` | **FAILS AS ASSERTION** — `inert="false"` IS present (no boolean branch in the 0.2.1 dist: grep `BOOLEAN_ATTRS` over `node_modules/provident-ssr/dist/core/adapters.js` → no match, read) | PASSES |
| **R-3** | `tests/engine-pin-boolean-dom.test.ts` | `boolean ON is present with the authored form in the shim DOM (inert)` | `attrsOf(mount.innerHTML,'div')['inert'] === 'true'` | PASSES (same reason as R-1) | PASSES |
| **R-4** | same file | `boolean OFF is ABSENT in the shim DOM, never ="false" (inert)` | `attrsPresent(mount.innerHTML,'div').has('inert') === false`; `getAttribute('inert') === null`; `innerHTML` does not contain `inert="false"` | **FAILS AS ASSERTION** (`inert="false"` present) | PASSES |
| **R-5** | both boolean files (one row each, `readonly` instead of `inert`) | `the boolean set is not an inert special case (readonly OFF is absent)` | authored `props.readonly:'false'` ⇒ absent in the SSR fragment **and** in `mount.innerHTML`; and `props.readonly:'true'` ⇒ present. **Two named members only — never an enumeration of the engine's set** (so the engine's internal list is not imported as contract) | **FAILS AS ASSERTION** (both legs) | PASSES |
| **R-6** *(REWRITTEN — ruling 1)* | `tests/host-guard.test.ts` | `props.X: undefined is APPLIED as an attribute removal, never thrown` | `expect(() => runtime.op({ kind:'state-slice', node: <nodeId>, mutation:[{ targetProp:'props.hidden', mode:'replace', value: undefined }] })).not.toThrow()`; the returned `.status === 'applied'`; `hidden` is **ABSENT** from the re-rendered `renderedHtml` (`getAttribute('hidden') === null`) and the SSR fragment; **siblings and other props untouched**; `applyCommand` (the direct seam) returns the same verdict | **FAILS AS ASSERTION** (the `undefined` reached the adapter and the shim **threw `TypeError`** — the assertion failed on the throw; `0.2.1` dist `:194`, read). **This is the ONLY row whose pre-change failure does not depend on the retarget.** *(Old name: "`props.X: undefined is rejected, never thrown`" — SUPERSEDED BY ruling 1; the reject half of this row and the §3.4 `G1`/`G3` rows it mirrored are replaced by `PA-1`/`PA-4`.)* | **APPLIED + removal** — **the TestWriter's re-write HAS LANDED**: the landed `R-6` row asserts the pass-through contract (`tests/host-guard.test.ts:240-282`, read: `.status === 'applied'`, the direct `applyCommand` seam at `:280-281`), so the "landed test still asserts `rejected`" hedge is superseded |
| **R-7** | `tests/dom-shim-remove-attribute.test.ts` | `css.<key> undefined removal is clean on the pre-existing engine path` | build a graph directly (`translateLegacy` → `Supervisor` → `DomAdapter` → `renderProducingProcess`) with a node whose `css:{ id:'k', role:'x' }`; apply `state-slice` with **`targetProp:'css.role'`** (the engine-effective namespace — **not** `'css:role'`, which `Node.applySlice` does not match and which is therefore inert; defect fix, §2.3), `value: undefined`, through the **engine** (not the host predicate); assert no throw and `getAttribute('role') === null`; plus the control that a **defined** `css.role:'v'` still applies | **THROWS `TypeError`** (`el.removeAttribute` absent) — the row was **not assertable** until the completion landed; it is the row that proves the completion covers the **pre-existing call sites** too | PASSES (landed: `tests/dom-shim-remove-attribute.test.ts:125-206`, read) |
| **R-8** | `tests/dom-shim-remove-attribute.test.ts` | `removeAttribute clears a present attribute` | `el.setAttribute('title','t')`; `el.removeAttribute('title')`; `getAttribute('title') === null`; `outerHTML` has no `title=`; a sibling attribute survives | THROWS `TypeError` pre-completion; PASSES post-completion (green at the pre-install pin — the method is the unit's own) | PASSES |
| **R-9** | same file | `removeAttribute of an absent attribute is idempotent, never throws` | two calls on an absent key; `outerHTML` identical before/after; no throw | THROWS pre-completion; PASSES post-completion | PASSES |
| **R-10** | same file | `removeAttribute('id') clears BOTH the id slot and the attribute store` | `el.setAttribute('id','x')`; `el.removeAttribute('id')`; `getAttribute('id') === null` **and** `outerHTML` does not contain `id="x"`; `attrs['id']` undefined; and a control that removes a non-`id` key while the `id` slot survives; plus the overwrite path (`setAttribute('id','x')` then `'y'`) | THROWS pre-completion; PASSES post-completion. **This row is the `id`-slot guard the carve-out names** (`docs/decisions.md:57`) | PASSES |
| **R-11** *(REWRITTEN — ruling 1 + defect (a))* | `tests/host-guard.test.ts` | `css.<key>: undefined is APPLIED as an attribute removal; a defined css.<key> still applies` | `PA-5` (`css.role`, `undefined` ⇒ `applied`, `role` absent from the DOM/SSR) + `P1` (`css.role:'v'` ⇒ `applied` with `role="v"` rendered) — **the target must be spelled `css.role`**, the engine-effective namespace | **FAILS AS ASSERTION** (throw on the undefined half) | **APPLIED + removal** — **the landed `R-11` row asserts it** (`tests/host-guard.test.ts:284-313`, read: the `css.<key>` undefined removal is `applied`; the "landed test still asserts `rejected`" hedge is superseded) |
| **R-12** *(NARROWED — ruling 1)* | `tests/host-guard.test.ts` | `shape-malformed mutations are rejected, never thrown` | `M1..M8` as a table (`it.each`), each asserting `{status:'rejected'}` (or, for `M8`, the pane batch being skipped whole) and **no throw**; **no nullish-value row belongs in this table any more** | **FAILS AS ASSERTION for M2/M3 only** (the new shape rejects); M1/M4..M7 passed on the pre-change tree (existing guards, `src/renderer/runtime.ts:383-414`) | PASSES. *(The M-rows are host-side only; the retarget is irrelevant to them. **The reject half of the old R-12 — the value-shaped rows — is SUPERSEDED BY ruling 1 and replaced by the §3.4 PA-rows.**)* |
| **M9** *(NEW 2026-09-27 — amendment block 7, item B; §2.4b item 3)* | `tests/host-guard-panes.test.ts` (+ the `Runtime` half in `tests/host-guard.test.ts`) | `M9 — a NON-ARRAY mutation is refused with a status, never thrown (the container half of M8)` | `M9` as §3.6 defines it. **`Runtime` half (landed):** `expect(() => runtime.applyCommand({kind:'state-slice', node:<resolved>, mutation: {} as never})).not.toThrow()` and `.status === 'rejected'` (`src/renderer/runtime.ts:409-414`, read). **Pane half (the requirement this row adds):** `expect(() => panels.applyPaneMutation(<engine nodeId>, {} as never)).not.toThrow()` and the result **`toEqual({status:'rejected', applied:false})`** — **no `TypeError`, nothing applied, the node's last-known render unchanged**. **Attribution:** the row is the SEAM's (it is the only public surface that takes a caller-supplied `mutation`); `syncConfig`'s own call site always builds an array (§2.4) | *(REWRITTEN 2026-09-27 — `B-LANDED`)* **Landed status CORRECTED 2026-09-27 (block 7's `B-LANDED` follow-up, read this pass): the pane half HAS landed** — the predicate tests `Array.isArray` first (`src/renderer/secure-panels.ts:81-89`, read: `:82`) and the seam derives `applied` (`:334`, read), so the call **no longer throws** and the landed harness row drives a **fixed six-shape** table (`{}`, `undefined`, a string, a number, `null`, a `Symbol.iterator`-throwing Proxy) asserting `{status:'rejected', applied:false}`, no throw and an unchanged render (`tests/host-guard-panes.test.ts:578-640`, read, fixed order); the three `applied`-semantics rows carry outcomes (i)/(ii)/(iii) (`:642-714`, read). **What this row still does NOT carry:** its own green measurement — the ledger (§4.3) owns that. *(Pre-status text: "**FAILS as written today on the pane half** — the landed predicate has no `Array.isArray` test, so the call **throws `TypeError: mutation is not iterable`** (`src/renderer/secure-panels.ts:72-79`, read)" — SUPERSEDED as a status statement only.)* | **`{status:'rejected', applied:false}`, no throw** (the amended contract) — **LANDED** |
| **R-13** *(REPLACED — ruling 2)* | `tests/host-guard-panes.test.ts` + `tests/fixtures/pane-mutation-fixture.mjs` | **the pane-fixture rows `PF-1..PF-8`** (§2.4a) — no longer a single "not executable" row | the rows drive the pane-managed channel through the documented injection point with a **defined** value (`PF-1`), **`undefined`** (`PF-2`), **`null`** (`PF-3`), an **absent** `value` key (`PF-4`), a **shape-malformed** element (`PF-5`), the shipped write's shape (`PF-6`), a **sibling-pane** control (`PF-7`) and an **idempotence** repeat (`PF-8`). `PF-2`/`PF-3`/`PF-4` prove the channel **tolerates** a nullish value (applied + removal) rather than needing a reject; `PF-5` proves the shape path skips the node's batch whole and re-renders last-known | **NOT RUN YET as written** — the pre-amendment row had **no injection channel** (the adversarial pass found the predicate unreachable: `syncConfig` private, both shipped writes defined, no test reference — `docs/specs/engine-pin-greens.md` §4's `H-02` line). *(Old row text: "`the SecurePanels managed channel refuses a nullish props.value write and keeps the last-known value`" … "the guard does not exist, the nullish value is applied and `removeAttribute('value')` empties the last-known value" — **SUPERSEDED BY ruling 2**: the "refuses … and keeps the last-known value" expectation was the pre-amendment reject semantics; the last-known-value observation survives only for the **shape** row `PF-5`, and the nullish rows now assert the **removal** instead.)* | **Expected on the landed tree** (assertions, not a run — the row is **unwritten**): `PF-1`, `PF-6`, `PF-7`, `PF-8` follow the shipped channel's behaviour; `PF-5` follows the shape path (skip-whole); `PF-2`..`PF-4` follow from the predicate no longer inspecting `value`. **The old quoted text's mechanism claim is also imprecise and is corrected in §2.4a `PF-2`:** on a `VALUE_FORMS` tag the `undefined` path is `formEl.value = ''` (`dist/core/adapters.js:203-208`, read), not `removeAttribute('value')`. |
| **R-14** | `tests/engine-pin-version.test.ts` | `the declared pin is ^0.5.1 and the installed dist is 0.5.1` | `package.json`'s `dependencies['provident-ssr'] === '^0.5.1'`; `node_modules/provident-ssr/package.json.version === '0.5.1'` | **FAILS AS ASSERTION** on the pre-install tree (both reads were `0.2.1`) | PASSES on the landed tree (both read `0.5.1` / `^0.5.1` — read this session). **Skew protection**: this row is what stops a stale `node_modules` from producing a partially green suite (§3.7) |
| **R-15** *(NARROWED — AF-9)* | `tests/engine-pin-version.test.ts` | `no new MCP surface was added by the retarget` | **Re-parameterised to SET-equality:** the tool set equals the fixed 21-name set already pinned in the test's `PINNED_TOOL_SET`/`PINNED` maps (`tests/engine-pin-version.test.ts:102-160`, read — a name absent from the map fails the row, a name removed fails it too), plus every tool resolving to a `VALID_GROUPS` member and the `RpcMethod` census being unchanged. **`ALL_TOOLS.length === 21` is a COUNT FREEZE, not a defended claim** — see the AF-9 rule in §3b | PASSES on the landed tree (`ProvidentMcpServer.ALL_TOOLS` = 18 `provident.*` + `module.install`/`update`/`list`, `src/main/mcp-server.ts:281-303`, read) | PASSES **until `U-FOCUS-TOOL` lands** |
| **R-16** *(RELABELLED — AF-1)* | `tests/engine-pin-controls.test.ts` | **CONTROL-1** `a defined boolean literal renders byte-identically to the PINNED FORWARD CAPTURE (0.5.1)` | a scenario envelope with `props.hidden:'true'` and `props.inert:'true'`: `expect(runtime.renderedHtmlResult().renderedHtml).toBe(<pinned literal>)` and `expect(ssrHtml).toBe(<pinned literal>)` — the literals are the **`0.5.1` forward pin captured pre-completion** (`tests/engine-pin-controls.test.ts:12-15`, read: *"the literals below are therefore the `0.5.1` baseline, which is the only honest 'pre-change' state the red run has"*), **including the `data-node-id` sequence ids** | **PASSES** — it *is* the forward pin. *(Old label: "renders byte-identically to **0.2.1**" and "the expected strings are the **0.2.1** output captured before the retarget" — **SUPERSEDED BY AF-1/AF-2**: the `0.2.1` bytes became uncapturable when the install landed mid-session, so the row is a **FORWARD PIN**, not a backward one.)* | PASSES — any diff is a **real drift** and belongs to `U-ENGINE-DRIFT` |
| **R-17** *(RELABELLED — AF-1)* | same file | **CONTROL-2** `an envelope with no boolean and no falsy props renders byte-identically to the PINNED FORWARD CAPTURE (0.5.1)` | the §4.2 envelope's boolean-free variant: `renderedHtml` and `ssrHtml` equal their pinned literals; `census` equal to its pinned numbers — again the **`0.5.1` forward pin**, not a `0.2.1` capture | **PASSES** (forward pin) | PASSES |

**What the two controls are NOT (AF-1/AF-2, stated once).** `R-16`/`R-17` are **forward
pins captured on `0.5.1`** and they are **explicitly NOT retarget evidence**: they cannot
show that `0.2.1 → 0.5.1` changed nothing, because no `0.2.1` bytes exist to compare
against. **That measurement belongs to `U-ENGINE-DRIFT`** (`docs/next-steps.md`, `## OPEN` row
**B** — **MOVED 2026-09-27 into that file's `## DONE — U-ENGINE-DRIFT` record**; its evidence is the existing suite + battery + divergence legs against the moved
pin). A later pass that cites `R-16`/`R-17` as the retarget's regression proof is
over-reading them; the honest claim is *"the landed `0.5.1` output is frozen, so a later
drift is detectable"*.

**Pre-change behaviour, aggregated honestly (this is the sentence the gate record owes
`RCA-1`) — RE-STATED for the landed tree.** On the tree the red run executed on
(`0.2.1` + completion, before the guard), of the seventeen original rows: **seven failed
as assertions** (`R-2`, `R-4`, `R-5`, `R-6`, `R-11`, `R-13`, `R-14`), **one failed
partially** (`R-12`: M2/M3 failed, M1/M4..M7 passed), and the completion-dependent rows
(`R-7`, `R-8`, `R-9`, `R-10`) **threw `TypeError` rather than failing** — the ruled,
recorded deviation from pure RCA-1 (`H-r7`; gate record `U0` row), whose **observed**
blast radius is corrected in §4.3. **The aggregate counts above describe the ORIGINAL row
set; post-amendment the row set has changed** (see the AF-11/§8 supersession index):
`R-6`/`R-11`/`R-12` are re-scoped, `R-13` is replaced by `PF-1..PF-8`, `R-15` is
re-parameterised, `R-16`/`R-17` are relabelled. **The unit's DONE row must quote the red
set as it was run and the re-scope as a separate line** — never merge the two into one
"17 pass" claim.

### 4.2 The scenario envelope (test-only, pinned here so both legs are identical)

```ts
const BASE = {
  template: { root: { type: 'div', css: { id: 'r' }, props: { id: 'r' }, children: [
    { type: 'div', css: { id: 'n-inert'  }, props: { id: 'n-inert',  inert: 'true'  } },
    { type: 'div', css: { id: 'n-hidden' }, props: { id: 'n-hidden', hidden: 'true' } },
    { type: 'div', css: { id: 'n-ro'     }, props: { id: 'n-ro',     readonly: 'false' } },
    { type: 'div', css: { id: 'n-plain'  } },
  ] } },
  content: [],
  clientConfig: { runInstantiation: true, runRendering: true },
}
```

- `readonly` (not `hidden`) carries R-5's second-member proof: it is a **named** boolean
  member of the engine's set (`../Preempt-Providence/src/core/adapters.ts:67`, read) and
  is already used by shipped data (`src/renderer/secure-panels.ts:135`
  `props: { id: 'token-input', placeholder: '(none)', readonly: true }`) — so the ON
  half is a shipped-shape claim, and the ON/OFF pair proves the set is not an `inert`
  special case **without enumerating the set**.
- `hidden` appears in the envelope but carries **no assertion** beyond
  `R-16`'s byte-identity control (the **forward pin** is captured with it present — AF-1).
- Tag choice matters for the extractor: the **first** `<div …>` in `innerHTML` is the
  root (`css.id:'r'`); per-node rows therefore resolve their node by `data-node-id`
  (`renderOptions.nodeIdAttribute === true`, `src/renderer/runtime.ts:90`) and extract
  the tag containing that id — the extractor's `attrsOfTag` is called with a
  `findTagByAttr(html,'data-node-id', nodeId)` helper, whose contract is "the first tag
  carrying that attribute", so two nodes with the same attribute set cannot be confused.
- **Mutation-driven rows** (`R-6`, `R-7`, `R-11`, and the pane rows `PF-1..PF-8`) must
  reach the node by `nodeId` (the authoritative vocabulary, `docs/decisions.md:24`), not
  by `cssId` — **and that now holds for the pane rows too (AMENDED 2026-09-27, amendment
  block 7, item F(2); see §2.4b item 4).** *(SUPERSEDED: "**except the pane fixture, which
  addresses pane nodes by their **authored `props.id`** because that is the vocabulary
  `SecurePanels` itself uses (`src/renderer/secure-panels.ts:340`, read)" — why: MEASURED
  false at the seam — `applyPaneMutation('journal-length-input', …)` returns the engine's
  `rejected` because the seam resolves with `this.supervisor.getNode(nodeId)`
  (`src/renderer/secure-panels.ts:301`, read) and an authored `props.id` is not a registered
  node id (`PF-1`/`F-2`, `docs/specs/engine-pin-greens.md` §2.8 + §3a, read); and the
  cited `:340` is the `syncConfig` loop's OWN `props.id` read — a different code path from the
  seam's parameter.)* **The supported vocabulary is the ENGINE `nodeId`, and the harness
  resolves it from the pane graph's node list; there is no public pane-side resolution route
  today (§2.4b item 4, §7.11).**
- **`css.id` and `props.id` are given the SAME value per node** (e.g. `css:{id:'n-inert'}`
  + `props:{id:'n-inert'}`, the shipped demo shape, `tests/runtime-host.test.ts:48-50`
  (`css: { id: 'ud-out' }` + `props: { id: 'ud-out' }`, read)).
  They write the **same** shim slot (`src/shared/dom-shim.ts:31-37`), so the authored data
  cannot produce a split `id` — but the two writes are ordered, and the **adversarial
  pass must probe a deliberately CONFLICTING pair** (`css.id` ≠ `props.id`) to confirm the
  last-write-wins behaviour the shim's own comment claims (`:32-34`) and that
  `removeAttribute('id')` clears whichever one won (§3a `A-1`).

### 4.3 The red-run ledger shape (so `RCA-1` is honoured, not doctored)

**CORRECTED 2026-09-27 (defect fix (b)) — recorded from the run, not predicted.** The
pre-amendment version of this section asserted a **clean split**: the four shim rows throw,
the rest fail as assertions, and the two halves are legible separately. **That prediction
was wrong**, and the actual shape must be recorded so no later pass "fixes" it back:

1. **The `TypeError` originates in the INITIAL RENDER, so it takes that render's other
   rows down with it.** `ShimElement.removeAttribute` is reached during a
   `renderProducingProcess` pass — including the pass that renders the node the row is
   about. On the pre-completion tree the throw escapes out of the render call itself
   (`RK-1`'s mechanism, §3.7), so **any row whose setup renders the affected node fails at
   the throw**, not at its own assertion. The rows are therefore **not** separable into
   "throws" vs "asserts" by row name: the observed ledger reports **the throw as the
   failure of the row that triggered the render**, and the DOM-leg rows of the same render
   are reported as **not-run/failed by the same throw** rather than as independent
   assertion failures. *(The pre-amendment text: "the ledger records, per row: `PASS` /
   `FAIL(assertion)` / `FAIL(throws TypeError)` — with the throw rows' messages quoted
   verbatim" — **SUPERSEDED**: the observed ledger needs the fourth class
   **`FAIL(blocked by the initial-render TypeError)`**, and the throw's message is quoted
   once with the render that produced it, not per row.)*
2. **The row-count arithmetic in the DONE row must follow the observed shape.** The
   `docs/next-steps.md` row A measured the landed red run at **"79 assertions / 61 red /
   18 green-not-red"** (`docs/next-steps.md`, the `## OPEN` row **A** provenance row **(the row MOVED to that file's `U-ENGINE-PIN` DONE record on 2026-09-27)**, read) — a finer-grained count than the
   pre-amendment "17 rows". **That count is the unit's red evidence**, and the DONE row
   must carry it verbatim rather than a 17-row restatement. *(Pre-amendment step 2: "All
   seventeen rows are written and RUN once, on the tree `0.2.1 + completion`. …" —
   SUPERSEDED as the authoritative count; the seventeen-row table remains the row
   **inventory**, the 79/61/18 measurement is the **ledger**.)*
3. **Step 1 — the completion lands alone.** `ShimElement.removeAttribute` is added with its
   §2.2 contract. The shim rows (`R-8`, `R-9`, `R-10`) are therefore **green before the red
   run**; that is stated in the ledger, not hidden. *(Unchanged.)*
4. **Step 2 — the retarget + the shape guard.** The architect's install moved the pin; the
   predicate was implemented (post-amendment: **shape-only**, ruling 1). The ledger was
   re-run and the landed rows pass; **the rows this amendment re-scoped have SINCE been
   re-written and RE-RUN** — the landed `tests/host-guard.test.ts` now asserts the
   pass-through contract for `R-6`/`R-11` (`:240-282`, `:284-313`, read), and the `R-13` row
   is gone (replaced by the pane file). *(The pre-status sentence read: "the landed
   `tests/host-guard.test.ts` still asserts the old reject semantics for `R-6`/`R-11` and is
   therefore expected to go RED until the TestWriter's re-write lands" — **SUPERSEDED as a
   status statement only; no requirement changes.**)*
5. **A DONE row that reports only the post-completion numbers without the throw-class rows
   accounted for is a review finding.** *(Unchanged.)*

### 4.4 The honest thin-red fact

**No existing test fails because of the upgrade.** The `0.2.1` → `0.5.1` move's own
regression evidence is `U-ENGINE-DRIFT`'s run of the existing suite + battery +
divergence legs against the moved pin (`docs/next-steps.md`, `## OPEN` row **B** — **MOVED
2026-09-27 into that file's `## DONE — U-ENGINE-DRIFT` record**; the earlier re-resolution from the pre-amendment `:61`, the amended unit plan's
`U1` row, is history) — it is **not** created by this unit, and this unit must not claim it. What
this unit contributes is: (a) the boolean-attribute contract rows that do not exist at
the old pin at all, (b) the shim completion's rows, (c) the shape guard's rows **and the
pane-fixture rows that make the pane half reachable** (`PF-1..PF-8`, ruling 2), and (d) the
**forward-pin** controls (`R-16`/`R-17`) that make a later drift detectable. Any statement
that "the upgrade is verified safe" on the strength of §4 alone is an overclaim.

**The divergence leg (ruling 3, corrected).** Pre-amendment this section said the
divergence leg's real-DOM half is "a **named precondition** (`H-r10`) that this unit does
**not** satisfy". **Post-amendment: `npm run divergence` on the Electron-44 stack IS a leg
of this unit** (§5.3 leg 6) — the architect accepted the dependency jump and ruled the leg
in. What that does and does **not** buy, stated so the leg is not over-read:

- **It is the ONLY shim-vs-real-DOM check in the repo** (`scripts/electron-divergence.mjs:1-7`,
  read: *"the ONE Electron-run divergence check"*). Nothing else compares the shim against
  a real DOM.
- **It buys:** the structural surfaces — census (`inTree`, `registered`), the normalized
  SSR fragment, the normalized `dirtied` ids, the `data-node-id` set, the nodeId
  vocabulary, and "the counter increment rendered in BOTH" (`:143-150`, read).
- **It does NOT buy:** any **boolean-attribute** or **removal-write** row. The harness has
  no attribute-presence extractor (`H-r10` is still a separate owed filing) and its demo
  envelope authors no `inert`/`hidden` prop (`:45-70`, read), so a shim-vs-dom divergence
  in *attribute serialization* is invisible to it. **No real-DOM attribute claim is made by
  this unit** — the leg is evidence of structural parity and process survival, not of
  §3.3/§3.4's attribute semantics.
- **A red there is a UNIT FINDING** (ruling 3), not an `U-ENGINE-DRIFT` deferral: the leg
  moved onto this unit's stack, so a failure now means the moved pin + the completion + the
  guard do not hold on the real renderer, and it blocks this unit's DONE row.
- **⟶ RESULT (2026-09-27, the DONE pass): GREEN — `R13 RESULT: 9 checks, 0 failures`** on the
  **post-change** tree (after the harness spawn fix; the repo's own driver). The leg is
  therefore **not** red, the bullet above never fired, and the structural-parity claim it buys
  is **measured, not assumed**. **Every "does not buy" clause above still binds** — the green is
  **not** an attribute row, and `H-r10` stays owed to `U-DIVERGENCE-EXT`. **The leg does not
  cover the app's IPC hop either:** the live finding `LIVE-OP-REJECT` (§7.2 item 2) is outside
  its comparison set — **and that finding has since been FIXED + LIVE-VERIFIED (2026-09-27) by that route's own fix, not by this leg, which remains silent on it**.

## 5. Wiring

### 5.1 Diff scope (the `R-14`/prohibition-4 pin)

Exactly these tracked files change:
1. `package.json:23` — the version string, nothing else **authored**. (`package.json`'s
   `devDependencies` **values** also moved — §2.1 — but they are **installer-owned and
   architect-accepted** under ruling 3, not an authored edit of this unit.)
   **AMENDED 2026-09-27 (amendment block 7, item I) — the file also gained an `allowScripts`
   block, recorded so "nothing else authored" is not read as "nothing else changed in the
   file".** Read this pass: `package.json:32-34` carries
   `"allowScripts": { "esbuild@0.28.2": true }` — a top-level key outside `dependencies` /
   `devDependencies` / `scripts`. **Owner, stated honestly: INSTALLER/AGENT-ADDED, and
   `allowScripts` is not a key this unit's authored diff names.** It is the npm install-script
   **allow-list** for the accepted `esbuild ^0.24.0 → ^0.28.2` jump (ruling 3, §2.1): esbuild's
   postinstall must be permitted for the accepted stack, which is why the key appeared with the
   install rather than with an authored edit. **What could NOT be established from this tree
   (marked unverified): whether the block pre-dated this unit's install or was written by it** —
   the spec has no in-session attribution route for that (no shell, no install in-session,
   §7.5), so it is **recorded as installer-owned with the reason** rather than asserted as
   pre-existing. **Consequences stated exactly:** it is **not** a `devDependencies` KEY change
   (§2.1's "no key added or removed" stays true — the read at `package.json:25-31` is
   unchanged), it is **not** a new dependency, it adds **no** script, and it touches **none** of
   §0's six prohibitions; a later pass that needs byte-attribution must take it from the
   install's commit, not from this spec.
2. `package-lock.json` — **installer-owned**; the diff must contain the `provident-ssr`
   version/resolved/integrity rows **and the accepted `electron` / `esbuild` / `vitest`
   resolution changes** (ruling 3, §2.1 — these three are **no longer findings**). **Any
   OTHER dependency's resolution change is a finding, not a side-effect.**
3. `src/shared/dom-shim.ts` — the **existing** `ShimElement.removeAttribute(k)` method whose
   **body now includes the `value`-slot special case** (`§2.2.1`, NEW 2026-09-27 — amendment
   block 6), plus the doc comment on that same method. **No new item, no new member, no
   second method**: the scope statement is exact — a `k === 'value'` branch in the one
   admitted method's body, scoped to `INPUT`/`TEXTAREA` (`§2.2.1` item 3, read from
   `dist/core/adapters.js:19-25`).
4. `src/renderer/runtime.ts` — the shape predicate (post-amendment: **no** value class).
5. `src/renderer/secure-panels.ts` — the same predicate at the pane channel's apply site,
   **plus the test-only injection point `applyPaneMutation` the pane-fixture ruling
   requires** (§2.4a). **The `§2.4a.1` baseline-persistence hunk is NOT owed (SUPERSEDED
   2026-09-27, amendment block 6):** the pane render loop **already** carries the diffed
   baseline across cycles — the typed field (`:236`), the pass-in (`:428`) and the
   re-assignment from the loop's own return (`:430`) mirror `Runtime`'s
   `prevStates`/`prevMap` pattern (`src/renderer/runtime.ts:192-194`, read) — so §5.1 item 5
   is **unchanged in scope: the predicate + `applyPaneMutation` only**. The `PF-2`/`PF-4`
   production change is the **shim** side (§5.1 item 3, `§2.2.1`). No other member, no
   constructor change, no `syncConfig` write change.
6. the **six** new test files (below) **+ `tests/fixtures/pane-mutation-fixture.mjs`**
   (the pane fixture, §2.4a).

*(SUPERSEDED: "the **four** new test files (below)" — AF-11: §5.2 listed **six** and the
post-amendment count is six **existing** files + a seventh pane test file + the fixture.
Why: the count was stale against the TestWriter's landing, and ruling 2 adds the pane
half.)*

No `docs/specs/*.md` file other than this one is edited by the implementer; tracker rows
(`docs/next-steps.md`, `docs/decisions.md` if an amendment is needed, `docs/defects.md`
**only** if a genuine package defect is found with symptom/repro/root-cause/fix-shape)
are the supervisor's pass, not the implementer's.

### 5.2 The test files this unit creates/carries

| File | Rows it carries | State |
| --- | --- | --- |
| `tests/engine-pin-boolean-ssr.test.ts` | R-1, R-2, R-5 (SSR leg) | **landed** |
| `tests/engine-pin-boolean-dom.test.ts` | R-3, R-4, R-5 (DOM/shim leg) | **landed** |
| `tests/dom-shim-remove-attribute.test.ts` | R-7, R-8, R-9, R-10 (+ P-IM-2's `S-TAB-IDEMP-1` table, + the static "exactly one member" row, + **NEW 2026-09-27 — the `value`-special-case regression row**): **`removeAttribute('value')` on an `INPUT` clears BOTH the `value` SLOT and `attrs['value']`** — seeded `el.value = '7'` **and** `setAttribute('value','7')` — asserting `el.value === ''`, `getAttribute('value') === null`, `outerHTML` without `value="7"`, plus the three siblings §2.2.1 item 2 names (untouched-slot idempotent no-op; store-only on a **non**-form-control tag; the untouched `value` slot stays the store's rule). **Contract-backed by §2.2.1 (amendment block 6 ruling E) — the Implementer adds it under THIS file; no new file** | **landed — incl. the `value`-case rows** (`R-10 (value sibling…)` at `:140`/`:174`, the `SELECT` store-only case, the P-IM-2 `value` extension at `:317-365`, and the static "exactly one member" row at `:368`, read) |
| `tests/host-guard.test.ts` | R-6, R-11, R-12 (+ **`M9`'s `Runtime` half** — the non-array container refusal, new 2026-09-27, §3.6/§2.4b) (+ §3.5 P1..P7, §3.4 PA-rows, the `S-TAB-ATOMIC-1`/`S-TAB-PASS-1` tables) — **R-6/R-11 must be re-written to the pass-through contract and R-13's row removed from this file** | **landed, incl. the re-scope** (`R-6` at `:240`, `R-11` at `:284`, `R-12` at `:315`, the `PA-*` rows at `:360-596`, `P1..P7` at `:596-667`, `G8` at `:670`, read — the landed `R-6`/`R-11` assert the pass-through contract, not the old reject semantics) |
| `tests/host-guard-panes.test.ts` | **`PF-1..PF-8`** (the pane-fixture rows, §2.4a) + **the NEW `M9` pane half** (the non-array `mutation` → `{status:'rejected', applied:false}`, never a throw — §3.6/§2.4b item 3) + **`PF-1b`'s superseded assertion** (`applied:false` on an unresolved `nodeId`, §2.4b item 1) + `S-TAB-PANE-1` (P-SM-3) — **`PF-2`/`PF-4`'s "prior value gone" assertions are now PINNED as `el.value === ''` and depend on the §2.2.1 `value`-slot clear (amendment block 6), NOT on a pane-baseline hunk (§2.4a.1 item 1: the loop already carries the baseline)** | **TO CREATE (ruling 2)** *(as §4's test-file-status block records: the TestWriter's second red cycle has since landed it — see the supervisor's `docs/next-steps.md` red-cycle-2 row; the status line here is the pre-red-cycle text, left standing because the tracker is the supervisor's pass). **Amendment block 7 added two re-writes to this file: `M9` and `PF-1b`** (§2.4b items 1/3) — the landed file already carries the `nodeIdOf` harness resolution (§2.4b item 4). **RECONCILIATION PASS 2026-09-27 (block 7's `B-LANDED` follow-up): both re-writes have SINCE landed on this file's tree, read this pass** — `M9`'s six-shape refusal table (`tests/host-guard-panes.test.ts:578-640`, read) and the three `applied`-semantics rows (`:642-714`, read, including the engine-refused case). **This pass does NOT claim their green measurement** (the ledger §4.3 owns it), and the two OWED **fixture-data** items live in §7.12/§7.13 (the fixture's `PF-7`/`PF-5` `build()` coverage), **not** in this file.* |
| `tests/fixtures/pane-mutation-fixture.mjs` | the fixture data the pane rows inject (authored ids + the fixed mutation table, suite-only) | **TO CREATE (ruling 2)** *(same note: landed with the second red cycle)* |
| `tests/engine-pin-version.test.ts` | R-14 (+ R-14b, R-15b) — **R-15's `ALL_TOOLS.length === 21` assertion is re-parameterised to set-equality** (§3b AF-9) | **landed, incl. the AF-9 re-parameterisation** (`:85-167`: set equality against `PINNED_TOOL_SET`, with the bare `21` surviving only as the *pinned list's own* size/duplicate check at `:127`/`:129`, read) |
| `tests/engine-pin-controls.test.ts` | R-16 (CONTROL-1), R-17 (CONTROL-2) — **relabelled as forward pins** (AF-1) | **landed, incl. the relabel** (`:320`/`:352` name the `0.5.1` forward capture, read) |

No existing test file is edited by this unit (a suite edit is a `HOST-OP-REJECT`-class
finding unless a row above proves it necessary, and the gate record's `S-d10` names the
unit as owning "no silent test edits"). **`tests/host-guard.test.ts` is this unit's own
file, so re-writing its `R-6`/`R-11` rows is not a "silent test edit"** — it is the
amendment's required change and must be reported as such in the DONE row.

### 5.3 The legs (each must run, in this order, before the unit is reported)

1. **The install — architect-owned, outside the session, and DONE.** No in-session
   `npm install` (`docs/next-steps.md`, the `## OPEN` row **A** provenance row **(the row MOVED to that file's `U-ENGINE-PIN` DONE record on 2026-09-27)**: "install DONE").
2. `npm test` — vitest 5, full suite (the seven unit files + every existing file); the
   pre-existing suite measured **789 passed / 2 skipped / 0 failed** at the greens layer
   (`docs/specs/engine-pin-greens.md` §5's corroboration block, read) and **658 / 2 skipped (reported)** at the
   pre-jump baseline (§2.1).
3. `npm run typecheck` — `tsc --noEmit -p tsconfig.json`.
4. `npm run build` — the five esbuild bundles (`package.json:10`), now under **esbuild
   `^0.28.2`** (accepted jump, §2.1).
5. `npm run battery` — `tests/e2e-battery.test.mjs` (`package.json:17`); the battery is
   the leg most exposed to `RK-1` (it drives the shim through `src/main/battery-host.ts`).
   Measured **184 checks / 0 failures** at the greens layer
   (`docs/specs/engine-pin-greens.md` §5's corroboration block, read). **The divergence leg's live measurement is
   NOT part of that line**: it is its own leg (below, leg 6) and it is **GREEN** on the DONE
   pass's final tree — **`R13 RESULT: 9 checks, 0 failures`** (as is `npm run battery`, at
   **184 checks / 0 failures**, re-measured in the same pass).
6. **`npm run divergence` — NOW A LEG OF THIS UNIT (ruling 3, superseding the unit plan's
   "No divergence leg") AND IT IS GREEN (2026-09-27, the DONE pass).** Run on the
   **Electron-44 stack** (`electron ^44.4.5`, §2.1); **measured `R13 RESULT: 9 checks, 0
   failures`** (Electron 44.4.5, node 24.21.0) by the supervisor on the **post-change** tree,
   after landing the harness spawn fix (`--disable-dev-shm-usage` + a fresh scratch
   `--user-data-dir` — a **harness** change outside §5.1's diff scope, `docs/decisions.md`
   `DIVERGENCE-SPAWN-FIX`). **`N = 9` is a PIN and did not drift.**
   **Expected evidence:** the script's own summary line **`R13 RESULT: <N> checks, 0
   failures`** and **exit 0** (`scripts/electron-divergence.mjs:159-165`, read), with both
   legs producing a result — the real-Electron leg (`:124`) and the shim leg — and the
   eight structural comparisons green (`:143-150`: census `inTree`, census `registered`,
   normalized `dirtied`, normalized SSR fragment, `data-node-id` set, nodeId vocabulary,
   counter-in-both, dispatch-results-non-empty). **A red here is a UNIT FINDING**
   (ruling 3): record it as this unit's finding, do not defer it to `U-ENGINE-DRIFT`.
   *(SUPERSEDED: "**`npm run divergence` — NOT a leg of this unit.** The unit plan says so
   explicitly ("**No divergence leg** (no real-DOM claim is asserted here)", `U0` row;
   `docs/next-steps.md`, the `## OPEN` row **A** provenance row **(the row MOVED to that file's `U-ENGINE-PIN` DONE record on 2026-09-27)**'s pre-amendment text) … recorded here as a **deliberate omission with a named
   precondition** … the harness row is itself `BLOCKED — blocked on U-ENGINE-PIN`". Why
   superseded: ruling 3 — *"`npm run divergence` on the Electron-44 stack is now a leg of
   this unit"* — and the leg is no longer blocked: the completion landed, so the shim leg
   no longer throws during `provident.load`. The `H-r10` extension remains owed for
   real-DOM **attribute** rows, which this leg still does not assert — §4.4.)*
7. `U-ENGINE-DRIFT` (U1) then runs **its own** divergence leg + the measurement set, and
   owns the `0.2.1`-vs-`0.5.1` behavioural reconciliation (the two controls are **forward
   pins** and are not that measurement — AF-1/AF-2, §4.1).

### 5.4 Rollback

- **The retarget is one revert**: `git revert`/reset of the `package.json` + lockfile
  commit restores `^0.2.1` and the prior lockfile resolution in a single diff. Nothing
  else in the unit depends on the version string.
- **The shim method is independently revertible**: deleting `removeAttribute` from
  `ShimElement` restores the shim's prior surface — **but** it must be reverted
  **together** with any test row that exercises it (R-7..R-10), and a revert leaves the
  `RK-1` latent crash in place (documented, not fixed).
- **The host predicate is independently revertible**: deleting the predicate + its two
  call sites restores the prior `applyCommand` behaviour; the predicate does **not** depend
  on the retarget, so it may stay if the retarget is reverted (and the unit plan notes the
  completion is justified by the old pin's **own** call sites). **Post-amendment the
  revert is cheaper and the stakes are lower**: the predicate no longer refuses any
  value-shaped write (ruling 1), so reverting it can only lose the shape rejections
  (`M2`/`M3`), not a removal capability — **but the completion must stay**, since it is now
  the only mechanism (§3.7).
- **The pane injection point is independently revertible**: deleting
  `SecurePanels.applyPaneMutation` (and the pane test file + fixture) restores the class's
  prior public surface; **the shape predicate at `syncConfig`'s own call site must stay**
  (it is the shipped channel's guard), so the revert removes testability, not behaviour.
- **The accepted `electron`/`esbuild`/`vitest` jumps are NOT this unit's to revert alone**:
  they came with the architect's install (ruling 3) and reverting them would need another
  architect-run install. Recorded so no agent proposes a "clean" rollback that silently
  undoes the accepted stack.
- **The install is not revertible in-session** — re-installing `^0.2.1` is another
  architect-run install. This is recorded so no agent promises a one-step rollback of
  `node_modules`.

## 5.5 Typed Property register (executed deterministically, no PBT harness)

**`H-r4` obliges an explicit zero-row/typed PBT decision. Stated honestly: this repo has
NO PBT harness.** `devDependencies` are `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` (`package.json:25-31`, read) — **no `fast-check`, no
`hypothesis`, no property runner**. Every row below is therefore executed by a
**deterministic, table-driven plain-vitest strategy**: a fixed, enumerated input table
evaluated in a fixed order, with **no randomness, no shrinking, and no generated
inputs**. Each row names its strategy-id and the test that carries it. A row that
genuinely needs a generator is marked **`NOT EXECUTED — no PBT harness`** with the
compensating example-based row.

| ID | Type | Property | Executed? | Strategy-id | Deterministic strategy (fixed table, fixed order) | Carried by |
| --- | --- | --- | --- | --- | --- | --- |
| **P-IM-1** | invariant | For the pinned scenario envelope, the SSR fragment and the shim DOM agree on the **set of attribute names per tag** (and on the value for present boolean members). | YES | `S-TAB-PAIR-1` | 2 envelopes (`BASE`, `BASE-boolean-OFF`) × 2 legs (`SSRFragmentAdapter`, `DomAdapter`+shim) × fixed tag order (`root, n-inert, n-hidden, n-ro, n-plain`); compare `attrsPresent` sets element-wise. | `tests/engine-pin-controls.test.ts` (SSR/shim pair rows) |
| **P-IM-2** | invariant | `removeAttribute` is idempotent: `remove(k)` repeated N times leaves `getAttribute(k)`/`outerHTML` identical to a single call. | YES | `S-TAB-IDEMP-1` | fixed table of 4 keys (`'title'`, `'id'`, `'absent'`, `'data-x'`) × call counts `[1,2,3]`, fixed order; compare `outerHTML` strings. **The `'value'` key is NOT a register row** (amendment block 6, ruling E): the `value` special case (`§2.2.1`) is a **plain state row** (`§3.2` + the `R-10`-style sibling in `tests/dom-shim-remove-attribute.test.ts`) — this strategy-id's table, if a later pass wants the idempotence half of the `value` case, is **extended** with the fixed key `'value'` on an `INPUT` (`setAttribute('value','7')` **+** the slot seeded to `'7'`), never re-scoped. | `tests/dom-shim-remove-attribute.test.ts` |
| **P-SM-1** *(REWRITTEN — ruling 1)* | state-machine | A 3-element mutation batch containing exactly one **nullish attribute-path** element is **APPLIED whole**: the nullish target is **REMOVED** and **both** other targets change (never a refusal, never a partial non-application); the only batch-**refusal** shape left is a **malformed** element (`M2`/`M3`), which refuses the batch whole. | YES | `S-TAB-ATOMIC-1` *(strategy-id kept; the table now runs the PASS-THROUGH form first and the shape-refusal form second)* | **Two fixed tables, fixed order.** (a) 3 rotations of `{props.hidden:<nullish>, props.title:'t', content:'X'}` — the rotation names which element is nullish — each asserting `{status:'applied'}` + `hidden` absent + `title="t"` present + the `content` change observable. (b) the same 3-batch with one element **malformed** (non-object / no `targetProp`) instead of nullish, each asserting `{status:'rejected'}` + **all three** observables unchanged. **Both halves are required**: (a) proves the removal passes through, (b) proves refusal is still atomic for shape. | `tests/host-guard.test.ts` |
| **P-SM-2** *(REWRITTEN — ruling 1 + AF-5; **(b)-half RECONCILED 2026-09-27, amendment block 7, item E**)* | state-machine | The attribute-path **pass-through set** is the whole value space — `['v','',0,false,[],{}]` **and** the nullish forms `undefined`, `null`, and an absent `value` key — on every spellings family the engine accepts (`props.<key>`, `css.<key>`, `props:<key>`, `css:<key>`, a bare name): none is refused **by the predicate**. | YES | `S-TAB-PASS-1` *(strategy-id kept; the value table is extended and a spellings table is added)* | (a) fixed 6-value table on `props.X` (`'v'`, `''`, `0`, `false`, `[]`, `{}`), fixed order, one `op()` call each, each asserting "not rejected **by the predicate**" (the engine's own verdict for arrays/objects is recorded, not pinned). (b) fixed 5-spellings × 3-nullish-forms = 15-row table (`props.hidden`, `css.role`, `props:hidden`, `css:role`, bare `title`) × (`undefined`, `null`, key-absent), fixed order, each asserting `NOT rejected by the predicate` **and the TRUE PER-SPELLING OBSERVABLE below — never one blanket "the attribute absent" expectation.** **The per-spelling observables, reconciled to the authoritative boundary (`§3.4 PA-2`/`AF-7`; the supervisor's adjudication is `docs/next-steps.md`'s `## HANDOVER UPDATE 2` table row 1 — cited by section, never by line), stated so the table has no over-claim:** (i) **`props.<key>` with `undefined` or an ABSENT key ⇒ the attribute is REMOVED** (the engine's prop-attr `undefined` path, `§3.4 PA-1`/`PA-4`); **`props.<key>` with `null` ⇒ also removed** on an ordinary attribute path (`PA-2`'s boundary is explicit: `null` is a removal on the **attribute** paths), **but a row asserting the removal must NOT be reused for a `VALUE_FORMS` tag** (there `null` is `String(null)`, `§3.4 PA-2` boundary + `PF-3`). (ii) **`css.<key>` with `undefined` ⇒ removed** (`PA-5`, the adapter's `css:` path `:214-224`); **`css.<key>` with `null` ⇒ NOT removed — the engine STRINGIFIES it** (`role="null"`; measured, `F-4`, `docs/specs/engine-pin-greens.md:204`, `:322-342`, read) — so this row asserts **the pass-through verdict (`not rejected`) + the stringified value**, never absence. (iii) **the colon twins `props:<key>` / `css:<key>` ⇒ INERT as mutation targets** (no layer; `Node.applySlice` matches only prefixes, `§2.3`/`PA-9`): the row asserts **no throw + `status !== 'rejected'`-by-the-predicate + NO removal observation** (the attribute's presence is unchanged — never asserted as absent). (iv) **a bare `title` ⇒ INERT too** (`PA-10`, amendment block 7 item D; measured): same three assertions, **never a removal**. **No row of this table may assert "the attribute absent" for a `null`+`css.<key>`, colon, or bare-name spelling.** | `tests/host-guard.test.ts` |
| **P-SM-3** *(NEW — ruling 2)* | state-machine | The **pane channel** applies a nullish attribute-path write as a removal, refuses a malformed batch whole, and leaves other panes untouched. | YES | `S-TAB-PANE-1` | **`PF-1..PF-8`** (§2.4a) as a fixed 8-row table, fixed order, driven through `SecurePanels.applyPaneMutation` by the `tests/fixtures/pane-mutation-fixture.mjs` fixture: defined value (`PF-1`), `undefined` (`PF-2`), `null` (`PF-3`), absent `value` (`PF-4`), malformed/shape (`PF-5`), the shipped write's shape (`PF-6`), sibling-pane control (`PF-7`), idempotent repeat (`PF-8`). | `tests/host-guard-panes.test.ts` |
| **P-TP-1** *(NARROWED — ruling 1b)* | totality | **For every mutation reaching the COMMAND SURFACE** (`Runtime.applyCommand` — i.e. `provident.op` / `load({kind:'commands'})` — and the pane channel), the predicate's verdict is shape-only and no value-shaped write is refused. **The scope is deliberately the command surface, NOT "all writes"**: handler-originated writes (`ctx.clientAPI.apply`, `ctx.node.receiveNextState`, the legacy handler surface) reach `supervisor.apply` directly and are outside it (§2.3 boundary), and wrapping the engine to widen it is a REJECTED option (§1's out-of-scope list, recorded). | **`NOT EXECUTED — no PBT harness`** — the property quantifies over all inputs, and a table can only sample. **Compensating example-based rows (re-pointed after ruling 1; `M9` ADDED 2026-09-27, amendment block 7 item B):** `PA-1`..`PA-10` (§3.4) for the value space × spellings, `PF-1`..`PF-8` (`P-SM-3`) for the pane channel, **`M2`/`M3`/`M8`/`M9` (§3.6) for the shape refusal — `M9` being the CONTAINER half (the non-array `mutation`) the pane channel's coverage over-claimed until this amendment (`M8` covered only a shape-malformed ELEMENT inside an array); **`M9`'s landed status is corrected by the reconciliation pass (block 7's `B-LANDED` follow-up): the CONTAINER row's behaviour HAS landed, so `M9` is a compensating row that EXISTS rather than one that is owed (`src/renderer/secure-panels.ts:82`, read; `tests/host-guard-panes.test.ts:578-640`, read) — its own green measurement is still the ledger's (§4.3)** — `P-SM-2` (the non-nullish + nullish complement) — plus the **structural** argument that the predicate is a single function called at exactly two sites (`src/renderer/runtime.ts:425`, read; `src/renderer/secure-panels.ts:415`, read) and that both are **kind-scoped to the command surface** — **kind-scoped at the PREDICATE level to the two studied kinds `state-slice` AND `layer-apply`** (`src/renderer/runtime.ts:425`, read), while the **engine's verdict for a mutation-carrying `layer-apply` is NOT PINNED** (§2.3: `layer-apply` is the mint-and-wire op at `dist/core/supervisor.js:1188-1225`, read, which accepts no `mutation`; and §2.3/§3.5 `P7b` now state that the predicate-vs-engine attribution for a VALID `layer-apply` is **not decidable** on the public `{status}` — amendment block 7 item F(1)). | `tests/host-guard.test.ts` + `tests/host-guard-panes.test.ts` (+ the §0 static row) |
| **P-TP-2** | totality | No boolean-member OFF write ever emits `k="false"` on either leg (for the two asserted members). | YES (weaker, enumerated form) | `S-TAB-OFF-2` | fixed table: members `['inert','readonly']` × falsy values `['false', 0, '0', '']` (4) × legs (2) = 16 rows, fixed order; assert attribute absent. **The full-`null` member case stays outside the table** (§3.3) — but note the **`null` VALUE on a non-boolean attribute** is now in-contract (`PA-2`/`PF-3`). | `tests/engine-pin-boolean-ssr.test.ts` + `…-dom.test.ts` |
| **P-IM-4** *(FOLDED — absorbs the former `P-IM-3`; both are "read the frozen captures once")* | invariant | The declared pin and the installed dist agree (`^0.5.1` / `0.5.1`) **and** the two controls' expected strings are stable across a second render cycle (no render-count/order nondeterminism in the pinned envelope). | YES | `S-READ-JSON-1` **+** `S-TAB-CYCLE-2` *(both strategy-ids kept; one register row, two fixed tables)* | (a) read `package.json` + `node_modules/provident-ssr/package.json` once, assert the two literals (fixed, no table) — `tests/engine-pin-version.test.ts` (`R-14`). (b) render the pinned envelope twice in one runtime (2 fixed cycles), assert `renderedHtml`/`ssrHtml`/`census` equal their **forward-pinned literals** on both (AF-1: the literals are the `0.5.1` capture) — `tests/engine-pin-controls.test.ts`. | `tests/engine-pin-version.test.ts` **+** `tests/engine-pin-controls.test.ts` |

Register count: **8 rows** — **4 `P-IM`** *(**⟶ ARITHMETIC CORRECTED 2026-09-27, the `U-LISTHOST` `§5.5` re-derivation pass:** this cell's `4 \`P-IM\`` counts the **ABSORBED** `P-IM-3` as well as the three live rows, so its own split (`4 + 3 + 2`) reads as `9` against the stated total of `8`. **The table carries `8` rows: `3` live `P-IM` (`P-IM-1`, `P-IM-2`, `P-IM-4`) + `3` `P-SM` + `2` `P-TP`.** The wrong form is kept visible per the annotate-never-rewrite convention; the `4`/`3`/`2` split was inherited verbatim by the wave-D specs' superseded `§5.5` cells, which the same pass re-derived.)* (`P-IM-1`, `P-IM-2`, and `P-IM-4`, which
**absorbs the former `P-IM-3`**; see the change summary below), **3 `P-SM`** (`P-SM-1`,
`P-SM-2`, `P-SM-3`), **2 `P-TP`** (`P-TP-1`, `P-TP-2`). The ids are the **pre-amendment**
ones wherever a row survived, kept deliberately so no existing citation breaks; only
`P-SM-3` is new and only `P-IM-3` no longer appears as a row of its own (its property and
strategy-id live inside `P-IM-4`).
**7 executed deterministically by table; 1 (`P-TP-1`) `NOT EXECUTED`** with its
compensating example-based rows named. **No row may be reported as executed if it was
sampled** — the `P-TP-1` marking is the register's honesty anchor.

**Register change summary (what THIS amendment did to §5.5).** `P-SM-1` — **rewritten**
(reject-total → pass-through-total + shape-refusal, `S-TAB-ATOMIC-1` kept).
`P-SM-2` — **rewritten/extended** (non-nullish complement → the whole value space incl.
nullish, plus the 5-spellings table, `S-TAB-PASS-1` kept). `P-SM-3` — **NEW**
(`S-TAB-PANE-1`, the `PF-1..PF-8` pane table, ruling 2). `P-TP-1` — **narrowed** (all
writes → the command surface; compensating rows re-pointed to `PA-*`/`PF-*`/`M2`/`M3` — **the list is extended to `M2`/`M3`/`M8`/`M9` by amendment block 7, item B: `M8` was named nowhere in this summary and the CONTAINER row `M9` did not exist**).
`P-IM-3` — **folded into `P-IM-4`** to keep the register at ≤8 rows while adding the pane
row (both are "read frozen captures once"; **both strategy-ids preserved**). Unchanged:
`P-IM-1`, `P-IM-2`, `P-TP-2`; `P-IM-4`'s property text gained the AF-1 forward-pin
provenance. **No `fast-check` and no generator was added** — the no-PBT-harness statement
above still holds (`package.json:25-31`, read: the `devDependencies` key set is unchanged).

**Register change summary for AMENDMENT BLOCK 6 (2026-09-27, the §2.2.1 `value`-slot clear).**
**NO register row is affected** — stated explicitly because the change looks like it could
touch `P-IM-2`: the new contract is a **plain state row** (`§3.2`'s `value` rows; the
`R-10`-style sibling row in `tests/dom-shim-remove-attribute.test.ts`, §5.2), so the register
stays at **8 rows — *the split this cell carried (`4` `P-IM` + `3` `P-SM` + `2` `P-TP`) sums to `9` against the stated `8` and double-counts the absorbed `P-IM-3`; the counted split is **`3` live `P-IM` + `3` `P-SM` + `2` `P-TP` = `8`*** **⟶ CORRECTED 2026-09-27 (the `U-PROJ` per-unit documentation review, finding `F-12` of `archive/reviews/2026-09-27-U-PROJ-doc-review.md`; a status/annotation note in this file's own convention — it amends no clause of THIS unit's contract)**; 7 executed deterministically, 1
(`P-TP-1`) `NOT EXECUTED`** (unchanged). The `value` case's **idempotence** half, if a later
pass wants it in a table, is an **extension of `P-IM-2`'s fixed key set** (above), not a new
row: `P-IM-2`'s property already covers "any key". **No row may be reported as executed if it
was sampled** — that honesty anchor is untouched.

**Register change summary for AMENDMENT BLOCK 7 (2026-09-27, the adversarial reconciliation).**
**Again NO register row is added, removed or re-scoped — the count is unchanged: 8 rows, 4
`P-IM` + 3 `P-SM` + 2 `P-TP`, 7 executed deterministically, `P-TP-1` `NOT EXECUTED`.** Two
**texts** change and one is only re-pointed:

- **`P-SM-2`'s (b)-half is reconciled** (item E): the blanket *"the attribute absent"*
  expectation for the four prefixed spellings is replaced by the **true per-spelling
  observables** — `undefined` ⇒ removed; `null` + `css.<key>` ⇒ **pass-through verdict +
  `role="null"`** (never absence); the colon twins and bare names ⇒ **inert, no removal
  observation**. The **strategy-id `S-TAB-PASS-1` and the 15-row shape are unchanged** (a row's
  *expectation* was wrong, not the table).
- **`P-TP-1`'s compensating-rows list gains `M9`** (item B) — a **list edit**, not a row
  change: `M8` was the only pane shape row named, and it does not cover the **container**.
- **`P-IM-2` stays untouched**: amendment block 6's `value`-case note above still governs it
  (the block-7 items do **not** change the `value`-slot contract; they state its **scope**
  wider, `§2.2.1` item 3 — and a wider scope does not add a table row, because the property is
  already "any key" with the tag/key scope named).
- **`P-TP-1` remains `NOT EXECUTED`** and the block-7 items do **not** make it executable — the
  blind layer reproduced all of its named compensating rows and still recorded it as
  **NOT-BLIND-RUNNABLE** (`docs/specs/engine-pin-greens.md` §2.7's `P-TP-1` row + §4, read). **No row may be
  reported as executed if it was sampled** — that anchor is untouched.

## 3a. Adversarial findings (probe seeds — the pass RAN; rulings recorded here, the pass's own record owed separately)

**Status, corrected.** The adversarial pass **has run** (it is what produced the four open
points the architect ruled on — §Layer declaration amendment block). **This section states
ONLY what the contract now says**; the pass's own findings record (its raw observations,
its host/package classification, its per-seed evidence) is **owed separately by the
per-unit documentation review** (`AGENTS.md` item 10d; §3b is the contract-side
disposition, not the review record). The seeds below are kept — with their disposition —
so a later pass can see which were **settled by a ruling**, which are **now test rows**, and
which remain open. **No seed is deleted.**

| Seed | What the pass probed | Disposition as the contract now reflects it |
| --- | --- | --- |
| **A-1** | `removeAttribute('id')` on an element whose `id` came from the **special case** — including the `setAttribute('id')` → `setAttribute('id')` overwrite path, and `css:{id}` after a `props.id` auto-mint (`src/shared/dom-shim.ts:31-37`, `:54-61`, `:97`) | **STANDS — now a landed test row.** `R-10` carries both stores + the non-`id` control + the overwrite path (`tests/dom-shim-remove-attribute.test.ts:85-123`, read). The deliberately **CONFLICTING** `css.id ≠ props.id` pair (§4.2) remains an **OPEN probe** — not written as a row. |
| **A-2** | Guard bypass: omitted `value` key; via `load({kind:'commands'})`; via `JSON.parse` (only `null` reachable); a nullish in an array element | **SETTLED BY RULING 1.** There is no bypass class any more because there is **nothing to bypass**: nullish/absent/`null` values are legitimate removals and are **applied** (`PA-2`, `PA-4`, `PA-9`, `PA-10`). The **shape** half of the seed survives as `M2`/`M3`. The `load({kind:'commands'})` route is still **covered** (it routes through `applyCommand`, §2.3) and is **not** a distinct row. |
| **A-3** | An array/object value on `props` (`props.tags:['x']`, `{a:1}`) | **SETTLED** — `P4` (+ `P-SM-2`). Not refused by the predicate; the engine's own verdict is **recorded, not pinned**. |
| **A-4** | A boolean attr with `'0'` / `''` / `0` on both legs | **STANDS** — `P-TP-2`'s 16-row table (`S-TAB-OFF-2`). The `null` member case stays outside it (§3.3). |
| **A-5** | The `css:` path with `undefined` driven through the engine, incl. `css:id`/`css:classes`/`css:style` (which do **not** call `removeAttribute`, `dist/core/adapters.js:217-224`, read) vs any other `css:` key (which does, `:224`, read) | **SETTLED BY RULING 1 + the defect fix.** The host does **not** reject the nullish ones (they apply — `PA-5`, `PA-7`); the engine path is clean (landed `R-7`). **The seed's `css:` spelling is corrected**: the engine-effective mutation namespace is **`css.<key>`** (§2.3, defect (a)). |
| **A-6** | The predicate's namespace narrowness: a bare attribute name, `on:*`/`data:*`/`handlers` with nullish values; "if the engine throws on any of them that is a new admission question" | **REMOVED BY RULING 1(c) — there is no capability loss to rule on.** Bare names / `on:*` / `data:*` / `content` / `handlers` are **allowed** (`PA-10`, `G8`→stands); the predicate inspects no `value`, so it neither covers nor refuses them. **The only surviving admission question** is the `H-r7` one: a **shim member** the engine actually calls and the shim lacks (§6 stop condition 3). |
| **A-7** | The real-DOM serialization difference (`<div hidden>` vs `k="v"`); the `H-r10` attribute-presence extractor as a **precondition**; a naive `includes('hidden="true"')` row is a guaranteed false red | **STANDS, with one correction.** The extractor precondition holds for real-DOM **attribute** rows (`§4` harness, §4.4). **Correction (ruling 3): the divergence leg IS now a leg of this unit** (§5.3 leg 6) — but it asserts the harness's existing **structural** surfaces only, so this seed's substance (attribute serialization) is **still not asserted**. |
| **A-8** | Capability-loss probe: the engine supports `props.X: undefined` as a deliberate removal write, and the (pre-amendment) guard removed that capability | **RESOLVED BY RULING 1 — the capability is NOT removed.** This was "the strongest argument against the guard", and the ruling accepted it: the write passes through and the completion makes it safe (architect, verbatim: *"Pass removals through"*). **No capability restriction is recorded**; the pre-amendment expectation ("record it as a documented, ruled capability restriction (`H-r7`/`Q5(iv)`: reject, never throw)") is **SUPERSEDED**. |
| **A-9** | `syncConfig`'s own shipped writes (`props.data-on` `:352`, `props.value … ?? ''` `:355`) still pass; a `null` `maxJournalLength` is not silently converted into a lost last-known value | **STANDS, re-scoped.** Both writes are legal (`P3`; the pane fixture's `PF-6` injects the same shape). The **last-known-value** question survives **only for the shape path** (`PF-5`) — a nullish value no longer skips the write (§2.4, ruling 1). |
| **A-10** | `RK-1`'s blast radius: is `removeAttribute` reachable from any **other** host path (battery host, `SecurePanels`, `MarkdownAdapter`)? | **STANDS — partially settled.** `SecurePanels`' reachability is now **contract** (§2.4/§2.4a); the battery host and `MarkdownAdapter` paths remain an **OPEN enumeration** (each either covered by the completion or a measurement). |
| **A-11** *(NEW — ruling 3)* | Does the moved **Electron-44** stack + the completion + the predicate hold on the **real renderer**? | **RULED IN as a leg** (§5.3 leg 6). Expected evidence: `R13 RESULT: <N> checks, 0 failures`, exit 0 (`scripts/electron-divergence.mjs:159-165`, read). **A red is a UNIT FINDING.** |

## 6. Falsification / stop conditions

Any of these **kills or reshapes** the unit; none of them may be worked around silently:

1. **Tarball ≠ adjacent build.** If the installed `0.5.1` dist's boolean branch, the
   engine's boolean set, or the `removeAttribute` call sites differ from the adjacent
   source read in this pass (`../Preempt-Providence/src/core/adapters.ts:292-302`,
   `:513-519`, `:291`), then **the red set re-derives at install**: the affected rows are
   re-written to the installed dist's actual behaviour, the line numbers are re-read
   (never carried over), and §3.3's table is corrected **before** the red run is
   reported green. The prior derivation is recorded, not deleted.
2. **A census / `dirtied` pin moves** (`tests/runtime-battery.test.ts:100-101`,
   `tests/gemma4-blind-battery.test.ts:194-195,215`, `tests/runtime-host.test.ts:188,367`,
   `tests/path-fork-cycle.test.ts:28,93` — the pinned equalities named by the amended unit
   plan — **these `tests/**` anchors are quoted from that plan's `U1` row and were NOT
   re-read by this pass**). Then the unit is **re-scoped as a HOST fix** (`docs/decisions.md:39`
   `R13-HOST-FIX` precedent) and lands in `U-ENGINE-DRIFT`; the package is **never**
   patched (`AGENTS.md` item 7).
3. **A shim member other than `removeAttribute` is required** (the red run throws
   `hasAttribute`/`getComputedStyle`/`activeElement`/`closest`/…). Then **stop** and
   return to the architect: `H-r7`'s admission test requires **both** a named call site
   **and** a forbidden-category check, and `hasAttribute` is admitted only on a named red
   call site (`docs/decisions.md:57`). An implementer may not add a second member.
4. **An existing test fails because of the retarget.** That is **`U-ENGINE-DRIFT`'s**
   business, not a silent test edit here: record it, do not edit the test in this unit,
   and let U1 own the reconciliation (the unit plan's "no silent test edits").
5. **The predicate causes a shipped-behaviour regression** *(post-amendment: a **shape**
   false positive — a legitimate non-object element, or an element whose `targetProp` a
   shipped caller genuinely omits; the pre-amendment "a legitimately-supported removal
   write is now rejected" case is GONE, since removals pass through by ruling 1)*. Then
   the predicate is **narrowed** to the shape set the rows above name, and the narrowing is
   recorded in the spec — the predicate is never broadened to "fix" a symptom, and it is
   **never re-broadened into a value check** (that would reverse ruling 1).
6. **The install is unavailable.** If the architect's install cannot run, the retarget
   half is **deferred**: the shim completion + the shape predicate may still land (they are
   justified by the old pin's own call sites — the `Q5` row's install option (c) reasoning,
   `docs/next-steps.md`'s `## HANDOVER UPDATE 2` open-decisions table, row **`Q5`** —
   **re-resolved 2026-09-27** from the pre-amendment `:49` of that file's earlier revision;
   **and note the `Q5` install is now DONE** (same table row's `INSTALL DONE` status), so this
   stop condition is historical), but
   then the unit **must not** claim the boolean rows and `R-14` fails — a partial unit
   reported as complete is a review finding.
7. **A `prop:` write that reaches the adapter with an `undefined` value under the OLD
   pin** (§3.7) — the version-mismatch state. If that state is observed in a **shipped**
   path (not a test), the finding is `RK-1` firing for real: the completion's priority
   rises to blocking, and **every** host path that can reach an attribute write is
   re-audited for coverage (the predicate cannot be the answer — by ruling 1 it refuses
   nothing value-shaped; the completion is the mechanism).
8. **The divergence leg is red on the Electron-44 stack (ruling 3).** Then the unit
   **stops and reports**: the finding is this unit's (`§4.4`), not an `U-ENGINE-DRIFT`
   deferral. Record the leg's own line (`R13 RESULT: <N> checks, <M> failures`, exit code)
   and the failing comparison by name (`scripts/electron-divergence.mjs:143-150`, read) —
   never a re-run-until-green and never a rebaseline of the harness.

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **The mount invariant and everything else in the shell-chrome plan remain blocked
   behind this unit.** `U-MOUNTGUARD`'s cardinality question is **still UNPROVEN**
   (the gate record's Layer declaration item 2); `U-GSESSION`, `U-MENULIB`, `U-PROJ`,
   `U-LISTHOST`, `U-OVERLAY` are all behind `U0 → U1`. Nothing here settles them.
2. **This unit is `DONE` (2026-09-27).** *(Rewritten by the DONE pass; the pre-DONE text read
   "**Nothing in this unit is `DONE`** … the divergence leg is in flight".)* The unit is
   **COMPLETE on every leg §5.3 declares — including leg 6, `npm run divergence` →
   `R13 RESULT: 9 checks, 0 failures` on the post-change tree** (the harness spawn fix landed
   first); the adversarial findings are folded in; the per-unit documentation review (`AGENTS.md`
   item 10d, RCA-6) **HAS run** (2026-09-27), record in
   `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`; and the
   amendment's re-scoped rows (`R-6`/`R-11` pass-through, `R-13` → `PF-1..PF-8`, `R-15`
   set-equality, `R-16`/`R-17` relabel) **have since been re-written and re-run** — the landed
   tree carries them (`tests/host-guard.test.ts` `R-6`/`R-11`/`R-12`, the `PA-*` rows,
   `tests/host-guard-panes.test.ts` `PF-*`/`M9`), green in the **789 passed / 2 skipped /
   0 failed** run. **Amendment block 6 adds one more owed re-write to that same next pass:**
   the `PF-2`/`PF-4` observables are **pinned** as `el.value === ''` (§2.4a.1 item 2) and
   the **§2.2.1 `value`-special-case regression row** must be added under
   `tests/dom-shim-remove-attribute.test.ts` (§5.2). **Amendment block 7 added the pane seam's
   two owed re-writes and one requirement — and the `B-LANDED` follow-up (read this pass)
   records that both re-writes HAVE LANDED, so the requirement is met and neither is owed any
   more:** the seam's `applied` field is now `applied === (status === 'applied')`
   (`src/renderer/secure-panels.ts:334`, read — so `PF-1b`'s landed
   `{status:'rejected', applied:true}` is now `{status:'rejected', applied:false}`, driven by the
   `applied`-semantics rows at `tests/host-guard-panes.test.ts:642-714`, read), and the
   **`M9`** row (the non-array `mutation`, §3.6/§2.4b item 3) is **written and landed**: the
   predicate tests `Array.isArray` as its first statement (`src/renderer/secure-panels.ts:82`,
   read) and the harness drives a fixed **six-shape** table
   (`tests/host-guard-panes.test.ts:578-640`, read). **(The pre-status text read: "the `M9` row
   must be written, which is a **REQUIREMENT the landed pane predicate does not meet today**
   (`paneMutationValid` has no `Array.isArray` test, so the seam **throws** — §2.4b item 5)" —
   **SUPERSEDED as a STATUS statement only; the requirement itself is unchanged and met.**)**
   And §2.2.1 item 3's **wider
   scope** (`prop:value` **and** `css.value` clear the slot) is the contract, not a code
   change. **Still owed on the fixture side (NEW 2026-09-27 — items 12/13 below):** the pane
   fixture's per-row `build()` data for `PF-5`/`PF-7` (§7.12/§7.13) — **the unit's ONLY
   residue, and it is test-side fixture data with no assertion weakened**; it is parked in
   `docs/pending.md` §D with its revisit condition (a later test-side pass). *(Pre-amendment text: "No code, no
   test, no install, no leg" — **SUPERSEDED**: the pin, the completion and the predicate all
   landed, the install ran, and the trio legs ran at the greens layer
   (`docs/specs/engine-pin-greens.md` §5's corroboration block).)*
   **ONE LIVE FINDING OUTSIDE THIS UNIT'S SCOPE, recorded not folded in — SINCE FIXED +
   LIVE-VERIFIED (2026-09-27): `LIVE-OP-REJECT`.**
   Over the assembled app's **IPC/MCP hop** the `provident.op` tool refused **every** command
   shape while the in-process `Runtime` route applied the identical call. The root cause is
   **this repo's own** renderer IPC unwrap (the **pre-fix** `src/renderer/renderer.ts:38` passed the
   raw args object into `Runtime.op`; `src/main/battery-host.ts:50` unwraps it), **`src/renderer/renderer.ts`
   is untouched by this unit** (`git log -1` = `715a923`), and the unit's kind-scoped predicate
   never runs on that path — so it is **PRE-EXISTING, HOST-owned, and NOT a package defect**.
   Filed OPEN in `docs/defects.md` with its fix shape; **it is not** a blocker, because this
   unit's declared legs do not exercise `provident.op` over the IPC hop and the `R13` leg never
   calls it. **THE FIX (landed 2026-09-27, `src/renderer/renderer.ts:43`):**
   `runtime.op(((req.payload as { command?: unknown })?.command ?? req.payload) as never)` —
   the unwrap this paragraph's fix shape named, with the `?? req.payload` fallback so an
   already-bare command still passes through; the testability seam is the `export` keyword on
   `handleRequest` (`:14`), and **no other route changed** (`load` deliberately stays raw — its
   schema puts the fields at the top level, `src/main/mcp-server.ts:650`). **Pinned in-node by the
   new `tests/op-command-unwrap.test.ts` (`S1`** — the RED row that pinned the defect;
   **`S2`** the fallback; **`S3`** `load` stays raw; **`F1`/`F2`** fail-safe; **`S1b`** the single
   app-graph-changed push**) and verified live** — the probe that produced the defect now answers
   `{"status":"applied","dirtied":["node-1"], …}` where it returned `{"status":"rejected"}`. The
   defect row therefore moved to `docs/defects.md`'s `## FIXED (in this repo)` section
   (`docs/decisions.md` `LIVE-OP-REJECT-CLOSED`). **The layer note stands unchanged: the envelope
   layer was never broken; the defect lived on the IPC hop.** Full record:
   `docs/specs/engine-pin-live-status.md` §5.
3. **No shim expansion beyond the one method.** `hasAttribute` is **not** added (§2.2,
   item 5);
   every other member on `H-r5`'s forbidden list stays forbidden; the shim's header
   comment (`src/shared/dom-shim.ts:1-3`) remains an accurate description of its scope.
   **Landing status: the one admitted method IS landed** (`src/shared/dom-shim.ts:54-61`,
   read) — "not added" above refers to every *other* member. **Amendment block 6's
   `value`-slot clear is NOT an exception to this statement**: it is that same landed
   method's **body** (`§2.2.1`), adding no member, no DOM capability, no vocabulary, no
   content, no default, no store and no MCP surface (§0's six prohibitions all still hold).
4. **The divergence leg's own hermeticity drift is recorded, not fixed here.** The leg
   spawns with `DISPLAY`/x11 flags while `docs/specs/ci-divergence-leg.md:22-25` claims
   hermeticity (`RK-7`, attributed to the engine recon). This unit does not fix the spawn
   and does not amend that spec; the `H-r10` amendment is a separate owed filing.
   **This drift now sits inside a leg of this unit (ruling 3)** — if the leg is red, the
   hermeticity drift is a **first-class suspect** (the leg requires `DISPLAY`, so a
   headless run can fail for a reason that is not a parity finding); record which it was.
   **⟶ PARTLY DISCHARGED (2026-09-27, the DONE pass): the SPAWN half is fixed.** The
   supervisor landed `--disable-dev-shm-usage` **and** a fresh scratch `--user-data-dir` per
   spawn in `scripts/electron-divergence.mjs`, which **is** `ci-divergence-leg.md` §1's
   isolation clause ("a temp `userData` profile … no writes outside the temp dir") — so the leg
   no longer writes `~/.config/Electron/GPUCache` and the leg is green
   (`R13 RESULT: 9 checks, 0 failures`; `docs/decisions.md` `DIVERGENCE-SPAWN-FIX`). **What
   remains true:** the leg still needs a **display** (`DISPLAY`/x11 flags — `H-r19`'s
   prerequisite and the `ui` leg's business), the `H-r10` extractor filing is still owed to
   `U-DIVERGENCE-EXT`, and the `ci-divergence-leg.md` headlessness wording is still that file's
   to fix.
5. **The lockfile bytes are still not verifiable from inside a session** *(narrowed)*.
   The lockfile diff, the resolved `0.5.1` integrity string, and the lockfile's
   `electron`/`esbuild`/`vitest` resolutions are **installer-owned inputs**; what this
   spec now reads as fact is the **installed package version** (§2.1) and the **declared**
   dependency strings (§2.1, §Layer declaration item 3). It still asserts the requirements
   and the stop conditions, not the bytes.
6. **The `0.5.1` line numbers were re-read at install** *(corrected)* — they are now cited
   from `node_modules/provident-ssr/dist/core/*` (§Layer declaration item 3), and only the
   blocks explicitly marked **(recon/adjacent)** still come from
   `../Preempt-Providence/src/core/adapters.ts`. *(Pre-amendment: "The `0.5.1` line numbers
   are (engine recon)/(adjacent-source) derived … must be re-read at install" — the
   install happened, so this is discharged for the dist citations.)*
7. **No new `docs/defects.md` / `docs/HANDOFF.md` row** is owed by this unit. The
   `removeAttribute` gap is a **host-owned harness gap** and the `inert` gap is **closed
   by the pin** (`docs/defects.md`'s `## NOT FILED BY THE 2026-09-27 ENGINE-PIN AMENDMENT — and why` block, item 2; the stale `:36-64` anchor is dropped — that range is the empty OPEN table and the CLOSED pointer since the 2026-09-27 re-sectioning). If a genuine package defect is found — a
   symptom contradicting `../Preempt-Providence/docs/specs/*.md` — it lands in those two
   files in **that** pass, with symptom/repro/root-cause/fix-shape, and the package is
   still never patched.
   **⟶ STATUS NOTE (2026-09-27, the wave-B DONE pass — status only: NO REQUIREMENT of this
   contract changes, and this item's "no row is owed" half stands.** The sentence above is a
   **pre-landing** description of the `removeAttribute` gap: the scoped `H-r7` harness completion
   **LANDED** in this unit (`src/shared/dom-shim.ts` `removeAttribute`, incl. the `id` and `value`
   slot clears — §2.2/§2.2.1, §5.4; `docs/decisions.md` `SHIM-COMPLETION-CARVE-OUT`,
   `ENGINE-PIN-VALUE-SLOT-CLEAR`), so "no new row is owed" is now true because **the gap is closed
   here**, not because it is still open. Two consequences recorded so a later pass does not read the
   gap as live: **(i)** the completion is the **sole mechanism for the removal class**, so **no
   rollback may delete it** (§5.4's rollback boundary); **(ii)** the residue is **test-side fixture
   DATA only** (§7.12/§7.13, parked in `docs/pending.md` §D) — never a package row.)**
8. **`UNDO-REDO-DESTROY-STATUS` is NOT resolved by this unit.** `H-r12`'s obligation is
   an annotation ("re-verified against 0.5.1"), already landed (`docs/defects.md`'s `## CLOSED (not reproducible at 0.5.1)` section, the `UNDO-REDO-DESTROY-STATUS` row's `H-r12` annotation — the stale `:21-34` anchor is dropped, that range is the OPEN section's status prose since the 2026-09-27 re-sectioning);
   the destroy-undo false-success survives the version move.
   **⟶ SUPERSEDED (2026-09-27, the wave-B DONE pass — a status correction only: NO REQUIREMENT of
   this contract changes; this item is retained verbatim above as what the pin unit recorded, and
   `H-r12` itself carries the matching correction).** The destroy-undo **does NOT survive the version
   move, and it does not report `applied`.** Measured at the installed `provident-ssr@0.5.1` on the
   **permitted route** (`Runtime.journal('undo')`): the destroy-undo reports
   **`{"status":"no-op","scheduledDirtied":[],"baseBoundary":false}`** with the graph unchanged —
   the **behaviour** half of the as-filed claim holds, the **reported status** does not — and the
   claimed fall-through to `report('applied', …)` is **unreachable**: the engine's **resolve guard**
   returns first (`node_modules/provident-ssr/dist/core/supervisor.js:1536-1538`) because `destroy`
   deleted the node (`:1066`), leaving the `destroy` branch (`:1549-1551`) and the `:1649`
   fall-through dead for a destroy entry. **The silent-`applied` false-success is therefore NOT
   reproducible at `0.5.1` by any route**; the row moved to `docs/defects.md`'s `## CLOSED (not
   reproducible at 0.5.1)` section (as-filed text kept, corrected root cause, **FLIP NOTE**), and
   `docs/HANDOFF.md` Round 9 was rewritten to close it — **the remaining ask is an optional upstream
   dead-code tidy-up only: no new round, no upstream issue, no host change owed.** **What this item
   still owns:** its *routing* — the measurement is `M-31` of `U-ENGINE-DRIFT`'s record, i.e. **a
   package claim of this pin unit measured by the next unit**, exactly the hand-off §7.8 declared.
   **Sources:** `docs/specs/engine-drift-measurements.md` `M-31` (`DRIFTED`);
   `docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`;
   `docs/pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS`.**
9. **This amendment adds exactly ONE production surface for testability — the pane
   injection point** (`SecurePanels.applyPaneMutation`, §2.4a), and it is recorded as such
   so no later pass calls it covert. Every other post-amendment change is **contract text**
   (the predicate's scope, the spelling decision, the boundary, the row re-scopes) or a
   **test-side** change (the fixture + pane test file). **No engine wrapper was added**: that
   option is REJECTED and recorded (§1).
10. **The `ALL_TOOLS === 21` count freeze is a DELIBERATE, time-bounded claim** (AF-9, §3b):
   the already-adopted `U-FOCUS-TOOL` unit changes it to 22, and the re-parameterisation
   rule below must be executed **in the same commit as that tool** so its red is not
   misread as a `U-ENGINE-PIN` regression.
11. **OWED (recommended by amendment block 7, item F(2); NOT admitted by this unit): a
   pane-side id-resolution route.** As the contract now stands (§2.4b item 4), a caller of
   `SecurePanels.applyPaneMutation` must already hold the pane node's **engine `nodeId`**, and
   **no public pane-side surface converts an authored `props.id` into it**: `Runtime.listTargets()`
   is public but reads the **APP** graph (`src/renderer/runtime.ts:1149-1174`, read) and the
   isolated pane graph is invisible to it (`docs/specs/secure-panels.md:59-65`, read), while
   `SecurePanels.dispatch(id)` resolves an authored id internally but is a **click seam** and
   exposes no id (`src/renderer/secure-panels.ts:268-275`, read). **The test-side resolution is
   a harness detail, not a contract route** (it reads the class's private `supervisor`;
   `tests/host-guard-panes.test.ts:90-100`, read). **A `listTargets`-analogue on
   `SecurePanels` would remove that asymmetry and is RECOMMENDED for a later pass — it is NOT
   added here**, because it would be a **new production surface** and this unit admits exactly
   one (`§7.9`, §2.4a). If a later pass wants it, it lands as an **explicit re-admission** with
   its own rows and its own register entry — **never smuggled in under §2.4b**.
12. **OWED (fixture DATA only — the fixture-mismatch reconciliation, 2026-09-27): `PF-7`'s
   `build()` carries the nullish half only.** §2.4a's `PF-7` row requires **`PF-2`'s nullish
   mutation on the target PLUS a defined write on a SIBLING pane node**, and the landed row
   drives exactly that — but as **two calls**: the sibling's defined write is the fixture's own
   named builder `siblingDefinedMutation('false')` on `toggle:dispatch`
   (`tests/host-guard-panes.test.ts:454`, read), while the fixture's `PF-7` row `build()`
   returns `undefinedValueMutation()` — the **nullish half only**
   (`tests/fixtures/pane-mutation-fixture.mjs:187-194`, read). **Why the two-call form is the
   honest shape, stated so this is not read as a loosened contract:** a mutation array targets
   **one** node by construction (the seam's first argument is a single `nodeId`, §2.4b), so a
   **single call cannot carry a write to a sibling node** — "in the same call" in the
   pre-amendment cell could only ever have meant "in the same row drive". **No assertion is
   weakened** (`§2.4a PF-7` still requires the sibling's observable unchanged **across the
   nullish call**, and the landed row asserts it after **each** of the two nullish calls plus a
   third same-pane node's observable). **What is owed and routed, exactly:** the fixture's
   `PF-7` row's `build()` is extended to return the **pair** — the nullish mutation on the
   target **and** `siblingDefinedMutation('false')` as the row's second mutation (so the
   `S-TAB-PANE-1` fixture-register row compares the whole drive, not half of it) — and the
   register row's landed-comparison entry is then reconciled to it by the **TestWriter**, in
   the same pass. **This is fixture data, not a new surface**: no `src/**` change, no new
   export is needed (both builders already exist), and `paneFixtureRows()`'s 8-row fixed order
   and `P-SM-3`/`S-TAB-PANE-1` are unchanged.
13. **OWED (fixture DATA only, same pass — the `PF-5` half): `PF-5`'s `build()` returns ONE of
   the three malformed shapes.** The row drives **three** (`[null]`, a missing `targetProp`, a
   non-string `targetProp`) from the fixture's three named exports
   (`tests/fixtures/pane-mutation-fixture.mjs:104-116`, read;
   `tests/host-guard-panes.test.ts:395-410`, read), while `build()` returns only the
   **non-object representative** (`tests/fixtures/pane-mutation-fixture.mjs:104-106`). **No assertion is
   weakened and no row is narrowed** — this item exists so the fixture's `build()` and the
   `S-TAB-PANE-1` register claim cannot be read as covering all three when they cover one.
   **Routed fix (either form is honest, and the TestWriter picks one):** `build()` returns the
   three shapes' concatenation, **or** the register row's comparison is stated per-shape
   against each named export. No `src/**` change.

## 8. Supersession index (every pre-amendment clause this file replaces, and by what)

**Read this before quoting any pre-amendment anchor.** Nothing was deleted silently: each
pre-amendment clause is either **retained** (the landed truth), **annotated
`SUPERSEDED BY <ruling>` in place**, or **replaced and listed here**. The four rulings are
numbered as in the §Layer declaration amendment block (1 = pass-through, 2 = pane
fixture/testability, 3 = accepted dependency jump + divergence leg, 4 = the AF fold-in).
**Amendment block 5 (2026-09-27, after the SECOND red cycle: 101 pass / 9 fail of the
amended 110-row set — `docs/next-steps.md`'s `## DONE — U-ENGINE-PIN` record, its red/green
prose, read).** The supervisor adjudicated the 9
failures into **five** dispositions (`docs/next-steps.md`'s `## HANDOVER UPDATE 2` five-row
adjudication table, read); **three are spec
amendments and are recorded above the §3a/§3b note below — `PA-6`'s auto-mint rewrite, the
`layer-apply` kind-scope correction, and the NEW §2.4a.1 baseline-persistence clause with
its §5.1 item 5 hunk** — and **two are TEST-ONLY and deliberately change nothing here**
(the `css.role: null` row of adjudication #1 and `P-SM-1`'s `renderedHtml` read route of
adjudication #4: this file asserts neither, so an amendment for either would be inventing
contract text the adjudication did not order).
**Amendment block 6 (2026-09-27, the THIRD red cycle — the LAST red pair, `PF-2`/`PF-4`).**
Amendment block 5's §2.4a.1 **diagnosis was DISPROVED** by the Implementer's live traces (the
pane render loop **does** persist `this.prevMap` — `src/renderer/secure-panels.ts:236`, `:428`,
`:430`, read; the removal op **is** emitted and applied, reaching
`elem.removeAttribute('value')` — `dist/core/adapters.js:296-298`, read; the serialized
`value` attribute **is** gone), and the **architect adjudicated the conflict**: the
`value`-**slot** clear inside the EXISTING `ShimElement.removeAttribute` is **AUTHORISED and
REQUIRED** as the completion of that one admitted method — **new contract §2.2.1** — the
`PF-2`/`PF-4` observables become **PINNED** (`el.value === ''`), and the **baseline-persistence
hunk is NOT owed**. **One test-side reading is REPORTED, not silently reconciled:** the landed
`tests/host-guard-panes.test.ts:290-293` (`PF-1`, read) asserts **no** `value` attribute after a
**defined** write, on the property-path argument this pass re-read as supported
(`dist/core/adapters.js:315-318`) — so §2.2.1's **attribute** half is non-vacuous only in the
**direct** shim rows, and §2.4a.1 item 2 says so. The spec may not edit `tests/**`; the
reconciliation (if owed) is the TestWriter's, and the contract is written to rulings B/D
without asserting any row's current byte form. **Nothing here is `DONE`.**
**Amendment block 7 (2026-09-27, the ADVERSARIAL-PASS RECONCILIATION — nine items, A–I).** The
unit is green on its own legs (`npm test` 782/2 skipped/0; typecheck clean; build clean; battery
**184/0**) **and the contract still worded nine things wrongly or not at all** — each **measured**
by the adversarial reviewer and/or by the independent blind re-run of the greens set
(`docs/specs/engine-pin-greens.md`, rewritten against this contract: **100 rows — 90 PASS / 6
FAIL / 4 NOT-BLIND-RUNNABLE**). Every item is recorded at its anchor **and** in the table below:
**(A)** §2.4a's two-branch seam description → **NEW §2.4b** (the pinned return shape, three
outcomes, `applied === (status === 'applied')`); **(B)** the missing **container** guard → §2.4 +
§2.4b item 3 + **the new `M9`** (§3.6 with `M2`/`M3`/`M8`, named in §4.1, §5.2 and §5.5's
`P-TP-1` list); **(C)** §2.2.1 item 3's over-narrow scope (**widened to the landed rule**:
`prop:value` **and** `css.value` clear the slot) **plus two corrected attributions** (§2.4a
`PF-2`'s mechanism sentence; §3.2's `value` row); **(D)** `PA-10`'s bare-name claim (rewritten:
**inert**, never a removal row) + §2.3's spellings bullet + §3b `AF-5`; **(E)** §5.5 `P-SM-2`'s
(b)-half (the already-adjudicated TEST-side conflict, **finally reconciled in the register
text**); **(F)** the two un-settleable claims — `P7b`/§2.3's kind scope (**the malformed half is
the decidable one**; the valid-`layer-apply` verdict stays **NOT PINNED**) and **§2.4b item 4**'s
**nodeId vocabulary** (§4.2's authored-`props.id` sentence superseded; the resolution route
stated; a pane-side accessor **recommended, parked in §7.11, NOT admitted**); **(G)**
`docs/specs/secure-panels.md` **§2a (NEW)** disclosing `applyPaneMutation`; **(H)** the stale
**`RpcMethod` count** in §3b `AF-9` (**21 live**, `tests/engine-pin-version.test.ts:174-197`,
read — so the future `provident.focus` move is **21 → 22**); **(I)** §5.1 item 1's diff-scope
completeness (`package.json`'s installer-owned `allowScripts` block, `:32-34`). **One cross-FILE
conflict is REPORTED, not silently reconciled:** item H's instruction points at *"§5.5/§8"*, but
this file's stale `RpcMethod` pair lives only in **§3b `AF-9`** (`docs/next-steps.md`'s identical
identical claim is the supervisor's pass). **Two TEST-side readings stay REPORTED-only**
(unchanged from block 6): `PF-1`'s landed attribute assertion, and `PF-1b`'s landed
`applied:true` — the contract is written to §2.4b's ruling and asserts no row's current byte
form. **Nothing here is `DONE`; the documentation review (item 10d) HAS NOW RUN** (2026-09-27 —
record: `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`; its findings landed in the
trackers and in this file's own citation anchors). **⟶ SUPERSEDED BY THE DONE PASS (2026-09-27):
the unit IS `DONE`**, and the divergence leg is **no longer "NOT RUN on a live window"** — it is
**GREEN on the post-change tree** (`R13 RESULT: 9 checks, 0 failures`) after the supervisor
landed the harness spawn fix in `scripts/electron-divergence.mjs` (`--disable-dev-shm-usage` +
a fresh scratch `--user-data-dir`; `docs/decisions.md` `DIVERGENCE-SPAWN-FIX`), so the
`sandboxed attempt dies SIGTRAP after renderer ready — MCP backend armed` note and the
`the fix belongs to U-DIVERGENCE-EXT` attribution are **both spent** (that unit **inherits**
the fix; **the death is also before that line, per
`docs/specs/engine-pin-live-status.md` §1.2**). **The other live finding stood, recorded
outside this unit — SINCE FIXED + LIVE-VERIFIED (2026-09-27, the renderer unwrap +
`tests/op-command-unwrap.test.ts`):** `LIVE-OP-REJECT` (HOST-owned, pre-existing; `docs/defects.md`,
now in that file's `## FIXED (in this repo)` section).
**The statement above is kept in its pre-review form on purpose: it is
what this contract said when the greens shipped.**
**CROSS-FILE ITEMS FROM THE PRE-REVIEW NOTES — ALL RECONCILED 2026-09-27** (the doc-review pass,
in the trackers rather than here, exactly as the notes demanded): **(a)** `docs/next-steps.md`'s
stale `RpcMethod 19 → 20` pair → corrected to **21 → 22** at both places it appeared (the
`U-FOCUS-TOOL` row and `docs/decisions.md` `FOCUS-UI-ONLY-MCP-TOOL`); **(b)** the greens set's
`21`-vs-`23` census question → **settled** by the third blind run's `G-06b` row (`ALL_TOOLS`
array = **21**; the `23` is the raw literal census incl. the two gate-map-only `module.*` group
keys); **(c)** the pre-green status lines → corrected in `docs/next-steps.md`, `docs/pending.md`,
`docs/HANDOVER.md`, `docs/defects.md` and `docs/FORKER.md`, with the pre-change execution log
**archived**; **(d)** the two fixture-data items (`§7.12`/`§7.13`) → still owed, **test-side
only**, and recorded as such in the greens set's `SC-3` row.
**The RECONCILIATION PASS's additions to this index (2026-09-27) are the two rows appended after
the `PF-5` row:** block 7's `B-LANDED` status follow-up (the `M9`/`applied` requirements have
**landed**), and the `PF-7`/`PF-5` **row-drive** re-scope (with the two fixture-data items
§7.12/§7.13 owed to a later pass) — **and nothing else** — **no contract requirement is weakened anywhere in this
pass, and no row count changes**: §3.6's `M`-table still carries `M1..M9` (**9 rows**), §4.1's
row set is unchanged, and §5.5's register stays at **8 rows**. **What this pass does NOT
establish:** any harness row's green measurement (the ledger §4.3 owns that) — the landed
behaviour is **read**, not re-run. *Sections §3a and §3b — the adversarial record — follow this
index at the end of the file.*

| Pre-amendment location/content | Status | Replaced by |
| --- | --- | --- |
| §Layer declaration 1 — "nothing in this unit has been executed … DOC-LAYER" | SUPERSEDED (AF-11) | §Layer declaration 1 (landed state; red run = `docs/next-steps.md`, the `## OPEN` row **A** provenance row **(the row MOVED to that file's `U-ENGINE-PIN` DONE record on 2026-09-27)**) |
| §Layer declaration 3 — "the published `0.5.1` dist was NOT fetched, NOT installed and NOT read" | SUPERSEDED | §Layer declaration 3 (read from `node_modules/provident-ssr/dist/core/*`) |
| §Layer declaration 5's ledger prediction | CORRECTED | §4.3 items 1-2 (observed shape) |
| §Layer declaration 6 — "the pin has **not** moved" | SUPERSEDED | §Layer declaration 6 (pin moved) |
| §0 prohibition 5 — "`ALL_TOOLS` stays **21** names" | NARROWED (AF-9) | §0 prohibition 5 (set-equality + time-bounded freeze) + §3b AF-9 rule |
| §0 prohibition 6 — the real-DOM half "not asserted here" | NARROWED (ruling 3) | §0 prohibition 6 (leg in; attribute rows still not asserted) |
| §1.3 — the red-first guard with **reject** semantics | **SUPERSEDED BY ruling 1** | §1.3 (pass-through + shape-only) |
| §2.1's "the only declarative edit … no `devDependencies` entry" | AMENDED (ruling 3) | §2.1 (devDependency jump accepted, installer-owned) |
| §2.2's "proposed; the ONLY member added" | ANNOTATED | §2.2 (LANDED at `src/shared/dom-shim.ts:54`) |
| §2.3's predicate description (three reject classes incl. the nullish `value`) | **SUPERSEDED BY ruling 1** | §2.3 (shape-only; the spellings decision; the command-surface boundary) |
| §2.3/§3.4/§4.1's `css:<key>` mutation spelling | **CORRECTED (defect (a))** | §2.3 (the engine-effective `css.<key>`, with the `node.js:1422/:1427` evidence) |
| §2.4's `syncConfig` anchors `:310-337`, `:334`, `:283-287`, `:298-300`, `:324`, `:327` | CORRECTED (pre-install drift) | §2.4 (`:338-365`, `:362`, `:313-315`/`:326-328`, `:352`, `:355`) + §2.4a |
| §2.4's "that node's whole mutation batch is skipped" for a **nullish** element | **SUPERSEDED BY ruling 1** | §2.4 (only **shape**-invalid batches are skipped; nullish applies) |
| §3.4 `G1..G8` reject table | **G1-G7 SUPERSEDED BY ruling 1; G8 STANDS** | §3.4 `PA-1..PA-10`; `AF-6` (§3b) records the removed capability question |
| §3.4 `PA-6`'s "the `id` attribute is **absent** — the adapter's prop-attr branch calls `removeAttribute('id')`" | **REWRITTEN 2026-09-27 (the auto-mint reality; the second red cycle's adjudication #2 — `docs/next-steps.md`'s `## HANDOVER UPDATE 2` five-row adjudication table, row `2`)** | §3.4 `PA-6` (applied **without** removal: `ensureAutoIds` re-materialises `props.id` at `node.js:1908-1912`/`:1009-1010` before the adapter can see `undefined`; the row's observable is "the authored id gone, an attribute still present") — and §3.4 `PA-7`, which is the route that **does** remove (`css.id` → `elem.id = ''`, `adapters.js:216-218`) |
| §3.4 `G6`'s mechanism phrase "before the `removeAttribute('id')` path" | **SUPERSEDED with `PA-6` (same adjudication)** | §3.4 `G6` (rewritten: the removal branch is unreachable for `props.id`; `PA-6` keeps the pre-amendment phrase marked superseded) + §3.4 `PA-6` |
| §2.3's kind-scope statement (a `layer-apply`-kind removal reads as an ordinary `applied` row) | **AMENDED 2026-09-27 (the second red cycle's adjudication #3 — `docs/next-steps.md`'s `## HANDOVER UPDATE 2` five-row adjudication table, row `3`)** | §2.3's kind-scope bullet (the predicate is kind-scoped at the **PREDICATE** level to both studied kinds — `runtime.ts:425` — while the **ENGINE VERDICT for a mutation-carrying `layer-apply` is NOT PINNED**, `supervisor.js:1188-1225`) + §3.5 `P7b` + §5.5 `P-TP-1` |
| §2.4a's pane rows without a baseline-persistence requirement (`PF-2`/`PF-4` "prior value gone" read as a consequence of ruling 1 alone) | **NEW CLAUSE 2026-09-27 (the second red cycle's adjudication #5b — `docs/next-steps.md`'s `## HANDOVER UPDATE 2` five-row adjudication table, row `5b`); the clause's DIAGNOSIS then SUPERSEDED by block 6 (2026-09-27)** | **§2.4a.1** as **rewritten** (item 1: the loop already carries the baseline + the `§2.2.1` slot clear is the owed change; item 2: the `PF-2`/`PF-4` observable **pinned**; item 3: the fail-state re-attributed to `src/shared/dom-shim.ts`; item 4: the OVERRULED "no shim `value` write" boundary; item 5: the boundary) + §2.4a `PF-2`/`PF-4` + §5.1 items 3/5 |
| §2.4a.1's **baseline-dropping diagnosis** — "the pane render loop does not carry it into `prevMap`", "a diffed removal op could be emitted and then dropped", "the clause does not require a shim `value` write of any kind", "if a later pass wants the slot *actively* cleared, that is a **new** contract question … **not** a §2.4a.1 deliverable", and the one "baseline-persistence hunk" §5.1 item 5 authorised | **DISPROVED ON THE LANDED TREE AND SUPERSEDED BY amendment block 6 (2026-09-27, the last red pair `PF-2`/`PF-4`)** — measured: the loop persists `this.prevMap` (`src/renderer/secure-panels.ts:236`, `:428`, `:430`, read), the removal op **is** emitted and applied (`dist/core/adapters.js:296-298`, read), the serialized attribute **is** gone; the residual is the `value` SLOT (`src/shared/dom-shim.ts:14`, read). The architect ruled the slot clear **AUTHORISED and REQUIRED** as the completion of the one admitted method, and **OVERRODE** the "new contract question" boundary | **NEW §2.2.1** (the `value` special case: contract, state table, exact `VALUE_FORMS` scope, the honest semantics note, the boundary) + §2.2 items 1/4/7 + §3.2 (the `value` rows) + §2.4a.1 items 1-5 + §5.1 item 3 (the exact hunk) + §5.2 (`tests/dom-shim-remove-attribute.test.ts`'s new row) + §5.5 (block-6 note: no register row affected) |
| §2.4a `PF-2`/`PF-4`'s "its observable is `el.value !== '7'` … the exact serialized form is RECORDED, NOT PINNED" | **PINNED 2026-09-27 (amendment block 6, ruling D)** | §2.4a `PF-2`/`PF-4` (the pinned observable: `el.value === ''`, `el.value !== '7'`, `getAttribute('value') === null`) + §2.4a.1 item 2's table — the `recorded, not pinned` hedge now survives **only** for `PF-3`'s `String(null)` form |
| §3.5's premise ("a reject here is a false positive that breaks shipped behaviour") | SUPERSEDED (premise only) | §3.5 (rows stand; the reason is now shape, not value) |
| §3.6 `M2`/`M3` described as "new (this unit)" beside the nullish class | NARROWED | §3.6 (`M2`/`M3` = the predicate's ONLY reject class; `M8` added) |
| §3.7 "With the **host guard** landed, … the engine never sees the nullish value there" | **SUPERSEDED BY ruling 1** | §3.7 (the completion is the only mechanism) |
| §4's "the six files below **do not exist yet**" | SUPERSEDED (AF-11) | §4 test-file-status block (landed; 7 files + 1 fixture) |
| §4's "the divergence leg itself is **not** run or claimed here" | SUPERSEDED (ruling 3) | §4 harness note (leg in; attribute rows still out) + §4.4 |
| §4.1 `R-6`, `R-11` (reject assertions) | **REWRITTEN (ruling 1)** | `R-6`/`R-11` pass-through rows (§4.1) |
| §4.1 `R-12` (incl. the nullish half) | NARROWED (ruling 1) | `R-12` (shape rows only) |
| §4.1 `R-13` (the single unexecutable pane row) | **REPLACED (ruling 2)** | `PF-1..PF-8` (§2.4a, §4.1, `P-SM-3`) |
| §4.1 `R-15` (`ALL_TOOLS.length === 21`) | NARROWED (AF-9) | `R-15` (set-equality) |
| §4.1 `R-16`/`R-17` ("byte-identically to `0.2.1`") | RELABELLED (AF-1/AF-2) | `R-16`/`R-17` (forward pins on `0.5.1`) |
| §4.2's `R-13` mention in the mutation-driven-rows list | AMENDED (ruling 2) | §4.2 (pane rows address pane nodes by authored `props.id`) |
| §4.3's predicted clean split + "seventeen rows" ledger | **CORRECTED (defect (b))** | §4.3 items 1-2 (initial-render blast radius; 79/61/18 measurement) |
| §4.4's "the divergence leg's real-DOM half is a named precondition this unit does not satisfy" | SUPERSEDED (ruling 3) | §4.4 (the divergence leg is in; what it does/does not buy) |
| §5.1 item 6 — "the **four** new test files" | CORRECTED (AF-11) | §5.1 item 6 (six + the pane file + the fixture) |
| §5.1 item 2 — "**any** other dependency's change is a finding" | AMENDED (ruling 3) | §5.1 item 2 (the three accepted devDependency resolutions are not findings) |
| §5.3 leg 2 — "the six new files" | AMENDED (AF-11) | §5.3 leg 2 (seven unit files + every existing file) |
| §5.3 leg 6 — "**NOT a leg of this unit**" | **SUPERSEDED BY ruling 3** | §5.3 leg 6 (the divergence leg, its expected evidence, and "a red is a unit finding") |
| §5.3 leg 5's battery line (no measurement) | ANNOTATED | §5.3 leg 5 (184/0 measured at the greens layer) |
| §5.4 "the host guard is independently revertible … restores the prior `applyCommand` behaviour" | AMENDED | §5.4 (the predicate's revert is now cheaper; the completion must stay) |
| §5.5 `P-SM-1`, `P-SM-2`, `P-TP-1` | REWRITTEN/NARROWED (rulings 1-2) | §5.5 (`P-SM-1` pass-through + shape; `P-SM-2` nullish + spellings; `P-TP-1` command surface) |
| §5.5 register count (8 rows: 4 `P-IM`, 2 `P-SM`, 2 `P-TP`) | AMENDED | §5.5 (8 rows: 4 `P-IM`, **3 `P-SM`**, 2 `P-TP`) — `P-IM-4` folded its content into the relabelled forward-pin strategy |
| §6 stop condition 5 ("a legitimately-supported removal write … is now rejected") | AMENDED (ruling 1) | §6 stop condition 5 (shape false positives only) |
| §7.2 — "No code, no test, no install, no leg" | SUPERSEDED (AF-11) | §7.2 (green on declared legs; divergence in flight; doc review not run) |
| §7.5/§7.6 — the install "not verifiable from inside a session"; the `0.5.1` line numbers recon-derived | NARROWED | §7.5/§7.6 (the installed version and dist line numbers read; the lockfile bytes still not) |
| §3a's status — "the adversarial pass has NOT run. Nothing below is a finding." | SUPERSEDED | §3a (the pass ran; per-seed disposition; the pass's own record owed by the doc review) + §3b |
| **§2.4a's injection-point row** — "on `true` it calls `this.supervisor.apply(…)` … returning the engine's `status`; on `false` it returns `{ status: 'rejected', applied: false }` and applies nothing" (the two-branch return-shape description) | **SUPERSEDED 2026-09-27 (amendment block 7, item A)** — measured: the landed seam returns **`applied: true` on every shape-valid call**, so the engine-refused branch was undocumented (`PF-1b` → `{status:'rejected', applied:true}`) | **NEW §2.4b item 1** (the pinned two-branch shape, the **three** reachable outcomes, and the ruling `applied === (status === 'applied')`; an engine refusal is never reported as applied) + §2.4b item 2 (the reachable engine-refusal causes: unknown/foreign `nodeId` → `getNode` `undefined` → the engine's `unknown-node` at `supervisor.js:847-850`, read) |
| **§2.4's parenthetical** — "array check here is implicit: `syncConfig` always passes an array" | **SUPERSEDED 2026-09-27 (amendment block 7, item B)** — it described the shipped **call site**, not the public seam's **class**; **as measured then** the predicate had no `Array.isArray`, so the seam **threw** `TypeError: mutation is not iterable` *(STATUS-CORRECTED by the `B-LANDED` follow-up: the guard has since landed as the predicate's first statement)* | §2.4 (the same-class requirement made explicit **including the non-array batch**) + §2.4b item 3 + **§3.6 `M9`** + §4.1 `M9` row + §5.2 + §5.5 `P-TP-1` |
| **§2.2.1 item 3** — "scoped to exactly the tags the engine sends down its **property** path" (read as: only that path reaches the case) | **WIDENED 2026-09-27 (amendment block 7, item C)** — the landed rule is keyed on the ATTRIBUTE KEY `'value'` + the ELEMENT TAG: the adapter's `css:` branch has **no** `VALUE_FORMS` test (`dist/core/adapters.js:214-224`, read, `:224` the fallback), so `css.value` reaches the same `removeAttribute` | §2.2.1 item 3 (the wider landed rule, stated honestly; the code is **not** narrowed) + §2.2.1's one-line summary + §3.2's `value` row |
| **§2.4a `PF-2`'s mechanism sentence** — "the shim's `removeAttribute` is reached for the **attribute** paths (`:290-291`, `:297-298`, read) — … **not** for a form control's `value`" | **CORRECTED 2026-09-27 (amendment block 7, item C)** — `:296-298` **IS** the path a `prop:value` removal takes (`:296` the `prop:` slice, `:297-298` the `element.removeAttribute(attr)` branch, read) | §2.4a `PF-2` (the corrected-with-reason attribution; the state assertion is unchanged) |
| **§2.3's covered-spellings bullet** + **§3.4 `PA-10`** + **§3b `AF-5`** — "**and a bare attribute name** (`targetProp:'hidden'`, no prefix), which the engine's adapter also routes to `removeAttribute` … the shim's method performs the removal" | **SUPERSEDED 2026-09-27 (amendment block 7, item D)** — MEASURED inert: a bare name is a **no-op** (attribute present before and after; a defined bare write too), because `Node.applySlice` matches only the `type`/`content`/`handlers`/`props.`/`css.`/`hooks.` **prefixes** (`dist/core/node.js:1410-1445`, read) | §3.4 `PA-10` (rewritten: **inert as a mutation target**, never a removal row; the prefixed routes are what reach the shim) + §2.3's spellings bullet (four prefixed spellings only) + §3b `AF-5` (same correction) |
| **§5.5 `P-SM-2`'s (b)-half** — "each asserting `NOT rejected by the predicate` and (for the four prefixed spellings with an authored-attribute node) **the attribute absent**" | **RECONCILED 2026-09-27 (amendment block 7, item E)** — false for `css.<key>` + `null` (the engine stringifies: `role="null"`, `F-4`, measured); the adjudication was TEST-side (`docs/next-steps.md`'s `## HANDOVER UPDATE 2` five-row adjudication table, row `1`, read) but the register text was never amended | §5.5 `P-SM-2` (the **true per-spelling observables**: `undefined` ⇒ removed; `null` + `css.<key>` ⇒ pass-through verdict + the stringified value; colon twins and bare names ⇒ inert, no removal observation) + §5.5's block-7 summary |
| **§3.5 `P7b`** — "the row may assert only **'NOT rejected by the predicate'** (`status !== 'rejected'`-by-the-predicate) … a valid `layer-apply` (`target` + `nodes`) is the shape that reaches `applied`" + §2.3's matching clause | **REWORDED 2026-09-27 (amendment block 7, item F(1))** — MEASURED not decidable on the public surface: a mutation-carrying `layer-apply` **and** a valid `target`+`nodes` shape **both** return the identical opaque `{status:'rejected'}` (`P7b-ii`/`F-3`, read) | §3.5 `P7b` (the **shape-malformed half is the decidable one**, and it goes red if the predicate is removed; the valid-`layer-apply` **verdict stays NOT PINNED**) + §2.3's kind-scope bullet + §5.5 `P-TP-1` |
| **§4.2's pane-fixture sentence** — "the pane fixture … addresses pane nodes by their **authored `props.id`** because that is the vocabulary `SecurePanels` itself uses (`src/renderer/secure-panels.ts:340`, read)" | **SUPERSEDED 2026-09-27 (amendment block 7, item F(2))** — MEASURED false at the seam: `applyPaneMutation` resolves via `this.supervisor.getNode(nodeId)` (`:301`, read) and an authored `props.id` is not a registered node id (`PF-1`/`F-2`, read); the cited `:340` is `syncConfig`'s OWN `props.id` read | §2.4b item 4 (the supported vocabulary = the **engine nodeId**; the allowed resolution route; the test-side harness detail; a pane-side accessor **recommended, parked in §7.11, NOT admitted**) + §4.2 (amended bullet) + **§2.4a's PF-table preamble** (any authored-`props.id` label in the `PF-*` cells is a harness label, never the seam's argument) |
| **§3b `AF-9`'s** "the `RpcMethod` census … (`RpcMethod` 19 → 20)" | **CORRECTED 2026-09-27 (amendment block 7, item H)** — the live census is **21** (`src/shared/types.ts:259-280`, read; asserted at 21 by `tests/engine-pin-version.test.ts:174-197`, read), so the future `provident.focus` move is **21 → 22** | §3b `AF-9` (the corrected pair, with the stale one marked superseded **in place**) — **`docs/next-steps.md`'s identical stale claim was the supervisor's pass; the doc-review pass has since corrected it there (`## OPEN` row **F3**, `RpcMethod` **21 → 22**)** |
| **§5.1 item 1** — "`package.json:23` — the version string, nothing else **authored**" | **AMENDED 2026-09-27 (amendment block 7, item I)** — the file also gained an installer-owned `allowScripts` block (`package.json:32-34`, read: `{"esbuild@0.28.2": true}`); whether it pre-dated this unit's install is **NOT establishable from the tree** and is marked so | §5.1 item 1 (the block recorded as installer-owned with its reason; not a `devDependencies` key change, no new dependency, no new script, none of §0's six prohibitions) |
| §2.4a's `PF-5` cell (the pane shape outcome, unnamed container) | EXTENDED (amendment block 7, item B) | §2.4a `PF-5` (the **same outcome** for the non-array batch, `M9`, never a throw) + §3.6 `M9` |
| **§3.6 `M9`'s landed cell** — "**This row is the REQUIREMENT this unit pins, not the landed behaviour** … the pane predicate **does not have it today** … so the seam **throws `TypeError: mutation is not iterable`**", its §3.6 footnote ("the one M-row whose landed behaviour CONTRADICTS the row"), and §2.4b item 5's "the landed `applied: true` behaviour and the missing array guard are **contract violations this clause names** — the TestWriter's red for them is the next pass's work" | **STATUS-CORRECTED 2026-09-27 (the reconciliation pass — block 7's `B-LANDED` follow-up)** — read this pass: the pane predicate **now CARRIES the guard** (`Array.isArray` as `paneMutationValid`'s **first statement**, `src/renderer/secure-panels.ts:82`, read) and the seam **derives** `applied` (`:334`, read: `applied: status === 'applied'`), so the non-array batch returns `{status:'rejected', applied:false}` instead of throwing; the harness row drives a fixed **six-shape** table (`tests/host-guard-panes.test.ts:578-640`, read) plus the three `applied`-semantics rows (`:642-714`, read). **The requirement text is NOT weakened** — only the "not landed" status is superseded | §3.6 `M9` (landed cell + footnote) + §2.4's array-guard bullet + §2.4b items 3/5 + §4.1 `M9`'s landed cell + §5.2 + §7.2 + the block-7 `B-LANDED` row |
| **§2.4a `PF-7`** — "`PF-2`'s mutation **plus** a defined write on a sibling pane node in the same call" (read as a `build()` composition) and **§2.4a `PF-5`**'s unnamed multi-shape drive | **A ROW-DRIVE CELL RE-SCOPED, NOT AN ASSERTION WEAKENED 2026-09-27 (the reconciliation pass)** — measured: the fixture's `PF-7` row `build()` carries the **nullish half only** (`pane-mutation-fixture.mjs:187-194`, read) and its `PF-5` row `build()` returns **one** of the three malformed shapes (`:104-106`, read), while the landed rows drive the sibling write as a **second call** (`tests/host-guard-panes.test.ts:454`, read) and all **three** shapes from the fixture's exports (`:395-410`, read); a single call **cannot** carry a sibling node's mutation (the seam's first argument is one `nodeId`, §2.4b) | §2.4a's `PF-7`/`PF-5` cells (the exact drive stated) + §2.4a's new **fixture-data vs row-scope** preamble + **§7.12/§7.13** (the two fixture-data items owed to a later pass — no `src/**` change, no new export) |

**Cross-file note — RE-RESOLVED 2026-09-27 (the doc-review pass), EXTENDED 2026-09-27 (the wave-B
citation sweep): `docs/next-steps.md` must
never be cited by line number (the file's own `CURRENT WORK` block says so: its
pre-amendment execution log was archived).** The citations below therefore name the
**section/row**, not a line. The status lines this amendment corrects live in the trackers —
`docs/next-steps.md`'s `## OPEN` row **A** (`U-ENGINE-PIN`) and its `CURRENT WORK` block.
**⟶ RECONCILED 2026-09-27 (the supervisor's DONE pass):** row **A** has **MOVED** out of
`## OPEN` and is now that file's **`U-ENGINE-PIN` DONE record** (`## DONE — U-ENGINE-PIN`), with
a provenance row left in `## OPEN` naming the move; the `CURRENT WORK` block carries a
supersession banner. **The obligation this paragraph names is therefore discharged** —
the DONE/status rows have been reconciled against this file.
**Those are the supervisor's pass**, not this file's: this
amendment records what `docs/specs/engine-pin.md` now says, and the DONE/status rows must
be reconciled against it in the supervisor's next tracker pass (`AGENTS.md` item 6/10d).
**Amendment block 7 adds two more cross-FILE items to that same owed pass** (reported, not
reconciled here — the amendment pass edits exactly two files, `docs/specs/engine-pin.md` and
`docs/specs/secure-panels.md`): **(i)** the `## OPEN` row **F3** (`U-FOCUS-TOOL`) carried the
stale *"`ALL_TOOLS` 21 → 22, `RpcMethod` **19 → 20**"* pair (item H — the live census is
**21**, so the move is **21 → 22**); **the doc-review pass has since corrected that row in
place**; **(ii)** the greens set's own `F-6`/`G-06b` string-census question
(built bundle **23** tool names vs the pinned **21**) is **NOT resolved by this pass** — it
needs `src/main/mcp-server.ts` read against the module group table, which is the documentation
review's item, not a contract change (`§3b AF-9` says so).
**The RECONCILIATION pass (2026-09-27) adds two more items to that same owed cross-file pass, and
edits ONLY `docs/specs/engine-pin.md`:** **(iii)** the `M9` landed-status correction (block 7's
`B-LANDED`) supersedes status lines that name the pane seam's missing array guard /
unconditional `applied` as un-landed — **the supervisor's tracker pass must not repeat them**
(the authoritative anchors are §3.6 `M9`, §2.4b items 3/5, §4.1 `M9`, §7.2); **(iv)** the two
**fixture-data** items (`§7.12`/`§7.13`: the fixture's `PF-7`/`PF-5` `build()` coverage) are
owed to a later implementation pass **inside `tests/fixtures/pane-mutation-fixture.mjs` +
`tests/host-guard-panes.test.ts` only** — no `src/**` change, no new export, and **no assertion
weakened** (the rows' scopes are unchanged; only their per-`build()` data is incomplete).
**Nothing here is `DONE`: the per-unit documentation review (`AGENTS.md` item 10d, RCA-6) still
owns the row-by-row reconciliation, including each row's green measurement (§4.3).**

## 3b. The adversarial pass's findings — disposition as THIS contract now reflects them

**Scope note (do not over-read this table).** This is **not** the adversarial pass's
record: the raw observations, per-seed evidence, host/package classification and the
review write-up are **owed separately by the per-unit documentation review** (`AGENTS.md`
item 10d, RCA-6; the repo's own convention is `archive/reviews/<date>-<unit>-doc-review.md`).
What follows is only **what the amended contract says** about each finding, so the
TestWriter and Implementer can act without inference. **Nothing here is `DONE`.**

| # | Finding (as the pass reported it) | Class | Disposition in this contract |
| --- | --- | --- | --- |
| **AF-1** | The two control rows (`R-16`/`R-17`) were labelled "byte-identical to `0.2.1`", but the install landed mid-session so no `0.2.1` bytes exist (`tests/engine-pin-controls.test.ts:20-24`, read) | host-spec drift | **FOLDED IN — RELABELLED, not a code change.** `R-16`/`R-17` are **forward pins captured on `0.5.1`** (§4.1, §4.4). They are **explicitly NOT retarget evidence**; that measurement belongs to `U-ENGINE-DRIFT` (`docs/next-steps.md`, `## OPEN` row **B** — **MOVED 2026-09-27 into that file's `## DONE — U-ENGINE-DRIFT` record**). |
| **AF-2** | The same drift as AF-1 in the table's `Pre-change`/`Post-change` column headers (`0.2.1+shim` / `0.5.1+shim`), which assert a comparison the session can no longer make | host-spec drift | **FOLDED IN.** §4.1's column pair is re-labelled as **historical** (the tree the red run executed on) vs **landed**; the controls' provenance is stated once (§4.1 "What the two controls are NOT"). |
| **AF-3** | *(pass's third finding — not restated here; its substance is covered by AF-6/AF-10's reachability class)* — recorded in the pass's own record owed by the doc review | host-spec drift | **CARRIED** — see AF-6 and AF-10; **no separate contract text** is invented for it here, deliberately (nothing is stated the pass did not report). |
| **AF-4** | The `null` boolean-attribute cell (§3.3) is not asserted by this unit; the SSR branch is entered only when `val !== undefined` (`dist/core/adapters.js:520`, read) | open probe | **CARRIED, unchanged.** §3.3 keeps the `null` member case outside the pin; `P-TP-2`'s table (`S-TAB-OFF-2`) still excludes it. **The non-boolean `null` value is now IN-contract** (`PA-2`, `PF-3`). |
| **AF-5** | Either the predicate covers the `props.data-*`/`props.on-*` spellings or the totality claim is narrowed — the spellings were never decided | host-spec drift | **DECIDED AND STATED (ruling 1); the bare-name half CORRECTED 2026-09-27 (amendment block 7, item D).** §2.3 states **which spellings a nullish write may legitimately use and how the contract words it**: `props.<key>`, `css.<key>`, `props:<key>`, `css:<key>` — **the four PREFIXED spellings, and the shim's method performs the removal for them.** The predicate inspects **no `value`**, so it neither covers nor refuses any spelling; its only `targetProp` test is `typeof targetProp === 'string'`. `props.data-*` / `props.on-*` / `on:*` / `data:*` are **engine-owned and untouched** (`PA-10`, `G8`→stands). **The totality claim is narrowed accordingly** — and further, by ruling 1b, to the **command surface** only (`P-TP-1`). *(SUPERSEDED — the pre-amendment clause "**and a bare attribute name** are all **ALLOWED**, and the **shim's method performs the removal**": the bare name is **ALLOWED** but is **INERT as a mutation target** and **never** performs a removal — MEASURED (`docs/specs/engine-pin-greens.md` §3a's `F-1` row, read; `Node.applySlice` matches only the `props.`/`css.`/`hooks.`/`type`/`content`/`handlers` prefixes, `dist/core/node.js:1410-1445`, read). See §3.4 `PA-10` and §2.3's covered-spellings bullet for the corrected contract.)* |
| **AF-6** | The pass's open question: whether the (pre-amendment) guard's restriction — removing the engine's `props.X: undefined` removal capability — needed to be documented as a capability loss | open question | **REMOVED — there is no capability loss to rule on** (ruling 1c). §2.3 states this explicitly; `A-8` (§3a) is recorded as **RESOLVED BY ruling 1**; the pre-amendment "documented, ruled capability restriction" expectation is **SUPERSEDED** and must not be carried forward. |
| **AF-7** | The absent-`value` case was not reconciled with what the engine does with it (absent key vs explicit `undefined` under the layer merge) | host-spec drift | **FOLDED IN AND STATED ONCE.** §3.4 `PA-4`: an **absent** `value` key and an explicit `undefined` are **the same removal** — `applyPropSlice` builds `{props:{[key]: undefined}}` (`dist/core/node.js:1521`, read), the merge copies the key (`:961-963`, read), and the diff emits the value-`undefined` set op (`dist/core/render.js:32-41`, read). The **third** form, explicit `null`, is an attribute removal on the **attribute** paths (`PA-2`) but is **stringified** on a `VALUE_FORMS` tag (`dist/core/adapters.js:315-318`, read) — that boundary is stated in `PA-2` and `PF-3`, so a later pass does not generalise "nullish ⇒ removal" across both. The pane fixture carries the absent-key form as **`PF-4`** and the `null` form as **`PF-3`**. |
| **AF-8** | *(pass's eighth finding — its substance is the reachability/last-known-value class)* — see the pass's own record owed by the doc review | host-spec drift | **CARRIED via ruling 2.** The last-known-value observation survives **only** for the **shape** path (`PF-5`); the nullish rows assert the **removal** instead (§2.4, `R-13`). |
| **AF-9** | `ALL_TOOLS === 21` is a **count freeze** the later, already-adopted `provident.focus` unit (`U-FOCUS-TOOL`, `docs/decisions.md:61`) will change — and the built artifact's own string census counted **23** tool names (`docs/specs/engine-pin-greens.md` §3a's `F-6`/`F-1` rows) | host-spec drift (numeric claim) | **FOLDED IN — the re-parameterisation rule is recorded HERE, in this unit's contract text:** **when `provident.focus` lands, the count assertion is replaced by SET-equality against the pinned name list — `ALL_TOOLS` gains `provident.focus` and the set comparison becomes the assertion — IN THE SAME COMMIT AS THE TOOL**, together with the `RpcMethod` census (**21 → 22 in the landed census** — CORRECTED 2026-09-27, amendment block 7 item H; `docs/decisions.md:61`'s `ALL_TOOLS` 21 → 22 is right, but its `RpcMethod` **19 → 20** is stale) and the default-gate subset (7 → 8). The carrying rows are `tests/engine-pin-version.test.ts:102-124` (the pinned 21-name list, whose size is asserted at `:127`) and the tool→group `PINNED` map at `:138-160` (read) — **the map is the load-bearing half and any bare count is the disposable half.** **So that red is not misread as a `U-ENGINE-PIN` regression**: the unit **states** the freeze is time-bounded (`§0` prohibition 5, `R-15`, §7.10), and a later pass seeing `R-15` red **must check whether `U-FOCUS-TOOL` landed first** before filing anything against this unit. **The `21`-vs-`23` census discrepancy is NOT resolved here** — the source constant is 21 (`src/main/mcp-server.ts:281-303`, read) and the built-artifact count of 23 is a **greens-layer string census (reported)**, not re-verified in this pass; it is a **doc/measurement item for the doc review**, not a contract change. |
| **AF-10** | The `H-02`/`R-13` false-green: the pane predicate was **unreachable** (`syncConfig` private, both shipped writes defined, no test reference) | host-spec drift (unstated surface requirement) | **FOLDED IN AS THE PANE-FIXTURE RULING.** §2.4a defines the fixture, the justified injection point and the `PF-1..PF-8` rows; `R-13` is **no longer "not executable"** (§4.1); `P-SM-3`/`S-TAB-PANE-1` carries it in the register (§5.5); `A-10`'s reachability enumeration stays open for the other host paths. |
| **AF-11** | §5.1 said "the **four** new test files" while §5.2 listed **six**; and the spec's status lines still described the halves as unlanded | host-spec drift | **CORRECTED IN PLACE** (§5.1 item 6 + its supersession note; §4's test-file-status block; §5.2's table; §Layer declaration item 1; §7.2). The post-amendment count is **seven test files + one fixture** (§5.1, §5.2) — the third count, stated so no later pass quotes the wrong one. |

**Amendment block 7's superseded clause, kept verbatim so no later pass quotes it as current
(the rest of block 7 is recorded in the §Layer-declaration table, the §8 index and the
sections it moved).**

*(SUPERSEDED — `§3b AF-9`'s RpcMethod pair, verbatim from block 5's text:)* "`RpcMethod` 19 → 20"
*(and its surrounding* "`ALL_TOOLS` 21 → 22, `RpcMethod` 19 → 20" *form).* **Why: the live
census is 21** — `src/shared/types.ts:259-280` (read this pass) lists 21 union members
(`dispatch`, `renderedHtml`, `markdown`, `listTargets`, `nodeState`, `load`, `op`, `export`,
`validate`, `teardown`, the seven `code.*`, `journal`, the `module.*` trio) and
`tests/engine-pin-version.test.ts:174-197` (read) asserts exactly that: the exhaustive
`RPC_METHOD_CENSUS` record plus `expect(Object.keys(RPC_METHOD_CENSUS).length).toBe(21)`. **The
future `provident.focus` move is therefore `21 → 22`**, and `docs/decisions.md:61`'s
`RpcMethod 19 → 20` (a tracker row, **not** edited here) carries the same stale pair — the
supervisor's reconciliation pass owns it (§8's cross-file note). **The `AF-9` row above is
rewritten in place; nothing about the `ALL_TOOLS` half changes** (`ALL_TOOLS` = 21 names,
`src/main/mcp-server.ts:281-303`, read; the count freeze 21 → 22 stands).
