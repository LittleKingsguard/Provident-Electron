# Provident-Electron — Work Queue

Maintained by the document-archival loop (AGENTS.md item 6). Open work on
top; finished items move to the tracker rows they produced. This queue is
this repo's local next-steps (the upstream queue lives in
`../Preempt-Providence/docs/next-steps.md`).

Historical pass records are archived in the gitignored `archive/` dir and do
not ship in a fork (see `docs/FORKER.md` §1/§5).

## ⟶ HANDOVER — for a fresh supervisor (2026-09-27; **`U-SLOTHOST` DONE pass — the ledger is now `6 DONE / 14 open`**; the authoritative unit records are the `## DONE — …` sections, newest first: `## DONE — U-SLOTHOST`, `## DONE — U-LISTHOST`)

**WHY THIS BLOCK IS HERE (and not in a standalone file): this file IS the repo's handover surface.** The
established convention is `HANDOVER UPDATE` / `HANDOVER UPDATE 2` / `CURRENT WORK / HANDOVER STATE` blocks
**inside** `docs/next-steps.md` (see the blocks below), and AGENTS.md item 3 requires a handover to carry the
documentation-staleness reconciliation in the same pass. A separate `docs/HANDOVER-CURRENT.md` would become a
**second source of truth** for counts this file already owns and would need its own DONE/OPEN reconciliation
each pass — so **no new file was created**: this block is the handover, placed FIRST so a fresh agent reads it
before any dated block. **Cite it by section name, never by line** (this file is 1400+ lines and growing).

**1. THE EXACT CURRENT STATE (measured this session; every figure below is a measurement, not a projection).**
**SIX units are `DONE`:** `U-ENGINE-PIN` (wave **A**) · `U-ENGINE-DRIFT` (wave **B**) · `U-REALDOM-BOOT`
(wave **C**) · `U-MOUNTGUARD` (wave **D**, the ledger's FOURTH `DONE` row) · **`U-LISTHOST` (wave **D**, the
ledger's **FIFTH** `DONE` row — its record is the `## DONE — U-LISTHOST` section below; the unit closed
2026-09-27 with the gate-11 typed register, `62/62` rows and a `54`-PASS blind set)**. *(The as-written
"FOUR units are `DONE`" is kept visible as the `U-MOUNTGUARD` pass's state.)* **The counts, verified against the `## OPEN` table this pass:
`6 DONE / 14 open rows`, and `6 + 14 = 20` units** *(earlier readings: `5 DONE / 15 open` at the `U-LISTHOST` pass, `4 DONE / 16 open`;
`U-LISTHOST`'s DONE row moved `D2`, so the open set is `C2` (1) · `D3`–`D4` (2) · `E1`–`E9` (9) · `F1`–`F4` (3)
= `15`)*; the 16 open rows of the previous reading were `C2` (1) · `D2`–`D4` (3) ·
`E1`–`E9` (9) · `F1`–`F4` (3) = `16`, and the four provenance rows (`A`, `B`, `C1`, `D1`) are **moved, not
deleted, and not double-counted**. **The legs, green on the FINAL tree:** `npm test` `[T]` **`59` files /
`916` passed / `2` skipped / `0` failed** · `npm run typecheck` **clean** · `npm run build` **clean**
(5 bundles) · `npm run battery` `[B]` **`184` checks / `0` failures** · `npm run divergence` `[A]`
**`R13 RESULT: 9 checks, 0 failures`** (`N = 9` **unmoved**); the blind run also observed `npm run ui` `[U]`
green (**`11/11`**, **`427x22`**, `retries=0`). **`U-MOUNTGUARD`'s own evidence:** the red set was RUN first
(**`aa8b92e`** — 41 rows: **39 red / 2 pass**, the 2 greens being the harness preconditions `PRE-1`/`PRE-2`),
the red run **hit the spec's own stop condition `S-1`** (one `loadEnvelope` into a never-`bootstrap()`ed mount
left **two** engine-emitted roots), so the unit's shape became the **HOST-fix branch**, and the final tree
carries **44 rows, all green** (42 spec rows + 2 harness rows; `M-17`/`M-18`/`M-19` appended after the
adversarial pass). **Commits: `aa8b92e` … `1b7d1ca`** (red set → green → adversarial/blind → doc review → this
DONE pass); the doc review's own commit sits inside that range, and its record is
`archive/reviews/2026-09-27-U-MOUNTGUARD-doc-review.md` (gitignored provenance). **The wave-D go-ahead WAS
GIVEN (architect, 2026-09-27)** — older cells that still say it is absent are **stale and annotated, not
silently rewritten** (see §8).

**2. THE EXACT NEXT ACTION: wave D continues — **`U-SLOTHOST` (`D3`) → `U-PROJ` (`D4`)**, in that order** (`U-LISTHOST`/`D2` is **`DONE`** as of 2026-09-27 — see the `## DONE — U-LISTHOST` section; the "`U-LISTHOST` (`D2`) →" form this line carried is kept visible). Each is **`BLOCKED` only on its own red set**: `U-MOUNTGUARD` (`D1`) is `DONE`, which was the
ordering precondition the three cells name. So each unit's *next* step is, in order: **TestWriter red RUN and
REPORTED** → green → adversarial → blind greens → legs → doc review → DONE. **⟶ CORRECTED 2026-09-27 (the
handover-staleness pass): ALL THREE SPECS ARE **FILED** — `docs/specs/listhost.md` (**`1896`** lines as landed at this pass's close — **cite sections, never lengths**; `619`/`774`/`1056`/`1734` are earlier passes' censuses) ·
`docs/specs/slothost.md` (`650`) · `docs/specs/projection.md` (`1236` — **⟶ CENSUS CORRECTED 2026-09-27 (the `U-PROJ` per-unit documentation review, `AGENTS.md` item 10d/RCA-6; record `archive/reviews/2026-09-27-U-PROJ-doc-review.md`, finding **F-05**, LOW-MED; the `1236` figure is kept visible): `1236` is an earlier pass's census and is STALE — the file's own file-end note replaced its census with the rule **cite sections, never lengths**, so this cell must not pin a length either. The live count at this review pass is `2528` lines; cite `docs/specs/projection.md` `§2.1`, `§3.1`–`§3.5`, `§5.5.1`, `§3a`/`§3b` instead**), each header reading `SPEC — FILED
2026-09-27` (filed `07a2ab7`, annotated `5a5e422`), so NO wave-D unit owes a spec and the "file the spec" step
is SPENT.** The stale claim this block carried — **"file `docs/specs/{listhost,slothost,projection}.md`** (all
three read `OWED — not filed`)" — is kept visible per the annotate-never-rewrite convention and is the
**filing pass's own state, not the current one**; the same class of stale cell survives in the `## OPEN`
rows `D2`–`D4`, in `docs/decisions.md` note 21 fact (3), in `docs/pending.md`'s `SCH-11`/`SCH-9`-host rows and
in the handoff-review amendment's owed-spec list — **all five SITES are annotated in place by this pass.**
**⟶ SUPERSEDED IN PART 2026-09-27 (the `U-LISTHOST` DONE pass):** that unit's red was RUN and REPORTED, its green closed, the adversarial + blind + doc-review gates ran and the unit is **`DONE`**. **⟶ AND AGAIN 2026-09-27 (the `U-SLOTHOST` spec-gate pass): the `§5.5` re-derivation is DISCHARGED** — `docs/specs/slothost.md` now carries the gate-11 **`§5.5.1` typed register** (six `P-SH-*` rows, `155` attempts, pinned seed `20260927`, old exemption kept as `§5.5.0`) and **all nine `§7a` ambiguities are RULED** (two `CONTRACT-AMENDED`: `F-10`'s four named injected-callback safe defaults and `F-9`'s pinned `removed` membership; one type amendment: `SlotHostRefusal.key` → `unknown`). ****⟶ AND AGAIN 2026-09-27 (the `U-SLOTHOST` DONE pass): that unit is `DONE` as well** (the ledger's sixth row — the injected container-source ruling, `61/61` rows, register `155/155` held, blind `57`/`1`/`0`, doc review run). **The next action is now `U-PROJ` (`D4`)**: its `§5.5` zero-row exemption is the gate-11 blocker (**OWED — `docs/pending.md` §G**), so its spec pass lands the typed register **before** its red set. The superseded reading was `U-SLOTHOST` (`D3`)'s TestWriter red RUN and REPORTED.** **No wave-D unit may claim a
real-DOM row**: the `[U]` rows those cells call *optional* need `U-DIVERGENCE-EXT`'s `H-r10` extractor for any
attribute-shaped variant, and `npm run divergence` green for the tree. **`U-DIVERGENCE-EXT` (`C2`) remains
`BLOCKED` on its own deliverables only** (`H-r10` channel + the set-wise attribute-presence extractor + the
`props` falsy-toggle scenario); `U-GSESSION` (`E6`) is unblocked by `U-MOUNTGUARD` being `DONE`.

**3. THE GATE TOPOLOGY A FRESH AGENT MUST FOLLOW (per unit, in this order — none may be skipped or reordered).**
**(G1) spec** filed in `docs/specs/<unit>.md` (delegation gate, AGENTS.md item 9) → **(G2) red** authored by a
TestWriter from the spec and **RUN and REPORTED before any implementation** (RCA-1; the DONE row must carry the
red's own numbers) → **(G3) green** (least code; then the trio `npm test` / `typecheck` / `build`, plus the
unit's declared extra legs, battery and divergence) → **(G4) adversarial** read-only pass (RCA-3), findings
dispositioned **in the unit's spec §3a/§3b** and every host finding fixed **here** with a regression row →
**(G5) blind greens** (`docs/specs/<unit>-greens.md`, written from the docs only, item 10a) → **(G6)
live/legs** (the divergence leg and, where the unit declares one, `npm run ui`) → **(G7) documentation review**
(item 10d/RCA-6; record in `archive/reviews/<date>-<unit>-doc-review.md`) → **(G8) DONE** (the supervisor's
record in this file). **A unit missing any gate, or whose red was not run before its implementation, is a
review finding** — the whole point of the order is that the red's numbers exist *before* the code does.

**4. THE RCA-8 ATOMICITY RULES, ONE LINE EACH (binding on every agent and on the orchestrator).**
**(a) Every gate boundary leaves a commit** (spec → red → green → adversarial/doc-review → DONE); **a tree
carrying more than ONE unit's uncommitted work is itself a review finding.**
**(b) Commit BEFORE any destructive-capable operation** (whole-file rewrite, bulk regen, archival move, or a
delegated pass authorised to replace a file) — or copy the artifact aside first and say where.
**(c) Never whole-file `write` an existing file over ~200 lines** unless it is committed in the same pass:
use bounded `edit`s, or append, or `write` a NEW file.
**(d) Append means append:** anchor the `edit` on the file's last line and verify the pre-existing bytes
survive; if a pass clips or truncates anything it must **STOP**, state that in the file **and** to the
orchestrator, and restore from version control before any other edit.
**(e) Per pass, assert an edited tracked document still exists in `HEAD`** (the orchestrator verifies
`git status` at each checkpoint); an untracked document that matters is committed **before** further passes
edit it.
**(f) Commits are scoped, not bulk:** one commit per gate boundary, the message naming the unit and the gate;
unrelated units never share a commit.

**5. THE FOUR OPEN CONTRACT RULINGS — ALREADY DECIDED; do not re-open, do not invent alternatives.**
**(i) The projection signature is TWO arguments: `project(values, specOf) → Projection`** (the plan's
single-argument form is NOT the contract; every name/unit/format choice is caller-supplied data).
**(ii) `A-11` — a `Projection` is a REUSABLE VALUE**, not a session: no consumption, no per-projection state,
every call equivalent to a first call with that value (`I-11`, rows `M-21`/`M-22`).
**(iii) `A-2`/`F-4` — a THROWING VALUE ACCESSOR is SKIPPED and RECORDED, never propagated**: caught per key,
one bad key never aborts a run, a **new eighth `ProjectionSkipReason` member `'accessor-threw'`** (the `F-4`
split into `F-4A`/`F-4B`, row `F-12`; the vocabulary recount is **7 → 8**).
**(iv) `A-3` — the prototype-pollution-shaped key ⇒ `Projection` built on `Object.create(null)`** (`I-12`/`I-13`,
`F-13`, `M-18`/`M-19`/`M-20`); **and `A-7` — sink RE-ENTRANCY is NOT GUARDED**, the projection is
**IMMUTABLE INPUT** to the applier (`I-11`/`I-14`, `M-21`/`M-22`, `F-14`/`F-15`; a consumer wanting different
writes builds a **NEW** projection). **Where they live:** `docs/specs/projection.md` §0 ruling 9 + §0A's dated
ruling notes, and `docs/decisions.md`'s `PROJECTION-SIGNATURE-TWO-ARGUMENTS`, `PROJECTION-REUSABLE`, plus
amendment note 17. **These were ruled for `U-PROJ` (`D4`) — a wave-D unit must build on them, not adjudicate
them again.**

**6. THE TEN DELIBERATE UNRULED SEEDS — `U-MOUNTGUARD`'s adversarial pass worked from ten seeds, and each pass
ruled them rather than inventing answers.** The pass's seed set (`docs/specs/mount-invariant-guard.md`'s
adversarial section) runs `A-1`…`A-16`; the **ten that were deliberately left UNRULED rather than answered by
silence** are the ones a pass must **rule on the record**, and the pass resolved them by pinning —
`A-2`/`A-3`/`A-8`/`A-9`/`A-11`/`A-12` are now pinned by `M-7`/`F-4`/`F-2`/`F-5`/`F-8`/`F-9`, `A-4`/`A-5` by
`M-15`/`M-13`, `A-10` **partly pinned with its remainder owed** (`ADV-7`), and `A-13`…`A-16` are the static
sweeps (green: `0` forbidden tokens; `ALL_TOOLS` **21** / `RpcMethod` **21** unchanged; no shim member added;
no region concept reintroduced) — **and the pass pinned the SIX further findings as `ADV-1`…`ADV-10`**
(§3b). **THE BINDING RULE FOR EVERY WAVE-D UNIT, stated in one line: a wave-D unit's adversarial pass must
RULE each seed it inherits rather than defer it** — a seed left unruled, or ruled by silence, is a review
finding; and every finding gets **one of §3b's six dispositions** (`FIXED-this-pass`, `RESOLVED-BY-PINNING`,
`OWED-with-owner`, `PARKED-with-revisit-condition`, `ACCEPTED-AS-PINNED`, `NOT-A-FINDING`), never a bare
`OWED`.

**7. PARKED / `OWED` ITEMS WITH THEIR OWNERS (all recorded; none blocks a DONE row).**
**`U-MOUNTGUARD`'s `§3b` rows:** `ADV-2` the reconciler is not total (`holder.children` read + `Array.from`
outside the local `try`) — **PARKED**, *owner: the host, the next `src/renderer/runtime.ts` change*;
`ADV-4` the probe **REFUSES a real-DOM mount** (`children` must be an array; a real DOM's is an
`HTMLCollection`) — **OWED-with-owner**, *owner: the pass that would take the optional `[U]` row* — **this is
why the `[U]` row is still `NOT TAKEN`**; `ADV-7` the non-string/blank `expect.rootNodeId` clauses — **OWED**,
*owner: the next contract pass for this module*; **plus two blind greens (item 10a) and every leg result.**
**`U-REALDOM-BOOT`'s parked / `OWED` set (`docs/pending.md` §F, five rows):** `G-1`'s **residual** (a
display-less host with no X server exits `2`, not `3` — *owner: the divergence leg's `PRE-4` /
`U-DIVERGENCE-EXT`*, explicitly **not** `U-REALDOM-BOOT`'s) · **`G-7` — FIXED** (the scratch-profile cleanup:
spawn the Electron binary + register the cleanup hook at `scratchRoot` creation) · `G-8` (the `PRE-2` digest
window closes before the boots, so a concurrent rebuild is undetected — *owner: the leg owner*), `G-9` (probe
observations are not pinned to the loaded envelope — *owner: leg owner + instrument*), `G-10` (the `R0`(a)/(b)
isolation claim is weaker than it reads — *owner: TestWriter, tracker-only*) and `G-11` (the battery-host and
the divergence child sit outside the helper's cleanup — *owner: leg owner, with `U-DIVERGENCE-EXT` the
inherited half*); and **`G-13`'s two non-`scripts/**` halves are REPORTED, NOT REWRITTEN** with owners named
(the contract text — a clause correction being a ruling; and the `src/main/main.ts:58-62` host seam). **Also
owed, one line:** the **shim-integrity check** (`docs/pending.md` §E) — recommended, NOT implemented, *owner:
any pass that edits the harness precondition; its trigger has already been touched*, and `U-MOUNTGUARD`'s
`§3b ADV-10` host comment `src/renderer/runtime.ts:559` (**"Idempotent"**) still repeats the **unconditional**
teardown form — *owner: the next pass that edits that file*.

**8. THE ENVIRONMENT FACTS A FRESH AGENT NEEDS (each measured; none inferred).**
**(i) The Electron runtime WORKS** — Electron **44.4.5** boots; a post-repair boot probe exits `0` in
**`176 ms`** printing `BOOT-OK 44.4.5` (`docs/decisions.md` `NPM-SHIM-INTEGRITY`).
**(ii) The `/dev/shm` restriction is REAL but MITIGATED** — the sandbox denies `/dev/shm` writes and a renderer
can die `SIGTRAP` (~1-in-3 for back-to-back boots), which is exactly why the divergence leg spawns with
**`--disable-dev-shm-usage` + a fresh scratch `--user-data-dir` per spawn** (both required; the
`DIVERGENCE-SPAWN-FIX`, landed). A `SIGTRAP` death is an environment fact, **never** a unit failure.
**(iii) `npm run divergence` IS the strict precondition for ANY real-DOM claim** — a `ui` green is never
stronger than a `divergence` red (`PRE-1`/`PRE-3` authority order; exit `2` `PRECONDITION-FAILED` with no
measurement taken), and **`N = 9` is a pin no unit may move.**
**(iv) The CORRUPT-SHIM HAZARD, and its one-line check** — `node_modules/electron/cli.js` (the entry point every
spawn here goes through) was found replaced by a **shell script that re-execs itself**, producing a **silent
~99 %-CPU hang that is indistinguishable from a wedged host**; it cost multiple passes of misattribution to
"the environment". **Before blaming the host: `file -L node_modules/electron/cli.js` must report a NODE script,
not a shell script** (and `strace -f` is the discriminating test — an unbroken `openat` cycle with no
`clone`/`execve` progress and no `EPERM`/`EACCES`).

**9. THE HONEST LIMITS — WHAT NO GREEN IN THIS CYCLE PROVES (state these; never over-read a green).**
**The unit's evidence is `[T]`/`[H]`** (the shim tree + the host) — **no real-DOM row was taken**; a **green
node suite is NEVER assembled-app evidence** (no window, no IPC round-trip, no MCP transport, no real DOM);
**a green `divergence` leg is STRUCTURAL-SURFACES-ONLY — never IPC-layer**; and **the module
`src/shared/mount-invariant-guard.ts` is imported by NO `src/**` file** — it is the **regression instrument,
not a guard the application runs**, so no green here proves the running app enforces the invariant. Also not
proven: any rendered geometry, any attribute presence (`M-46` stays `UNMEASURABLE`), the shim's fidelity (it is
demoted to **pre-filter**, not retired), `provident.dispatch`-is-a-real-gesture, and — for the wave-C leg — the
Electron-44 API assumptions that the `Q7` risk left open. **And the unit's own evidence is instrument-plus-fix,
not app-level enforcement:** the fix (`reconcileMount()` from `resetRenderState()`) is reached on the
**re-derivation** path — the live boot path is **byte-identical** and never reaches the sequence the red run
drove.

**⟶ U-LISTHOST GATE RECORD — CLOSED 2026-09-27 (the unit is `DONE`; the AUTHORITATIVE cell is the `## DONE — U-LISTHOST` section, and the clauses below are kept as the pass-by-pass provenance in the order they were written — where any of them says `IN FLIGHT`/`PENDING` or quotes a pre-fix number, the `## DONE` record's measurements SUPERSEDE it, and this pointer is the reconciliation the documentation review asked for).** **(1) Gate 2 (SPEC) is CLOSED with a RULING (commit `e8b95b0`).** The architect enforced **gate 11** at this unit's spec gate: the recorded **zero-row PBT exemption is restricted to invariant-free / doc-only / config-only / non-JS units**, so a **code-bearing** unit may not be delegated a red set under it — `docs/decisions.md` carries the ACTIVE row **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`**, and `docs/pending.md`'s new **§G** carries the follow-ups (the `slothost`/`projection` `§5.5` re-derivations as **blocking for those units' red sets only**; the `AGENTS.md`-has-no-gate-11-text doc drift; the `listhost` `§5.3 → §5.5` numbering gap). **(2) `docs/specs/listhost.md` `§5.5.1` is the landed pilot: 7 typed rows** — 4 `P-IM` (`P-LH-IM-1`..`4`), 2 `P-SM` (`P-LH-SM-1`/`-2`), 1 `P-TP` (`P-LH-TP-1`) — exhaustive `S₃`+`S₄` permutation tables, fixed-shape/sequence tables, and a **pinned-seed `20260927`** hand-rolled 32-bit LCG for totality; **157 attempts** *(⟶ CORRECTED to the counted **`168`** — `33+34+8+5+8+8+72`; the old form is kept visible)* under the ≤100/row · ≤400 total · stop-after-5 caps; **no `fast-check`, no new dependency, no `F-` register row**; the pre-ruling exemption is kept byte-identical as `§5.5.0` with dated SUPERSEDED banners. **The register's execution DESIGN is not evidence** — the TestWriter's red run is its first execution, and a row that is `YES` in the register but broken in the red is a **spec finding**. **(3) The red set RAN and REPORTED (gate 3, first half — commit `9258caf`), and the contract was then RECONCILED (commit `4d6a451`).** `tests/owned-list-host.test.ts` was authored from the spec (no implementation read) and RUN: **52 rows = 49 red / 3 pass** (the three greens are the `PRE-1..PRE-3` harness preconditions, not spec rows); failure classes — **37** rows red on the import boundary (36 clause rows + `S-1`), **5** static rows red on the module file's absence, **7** property rows red on the `§5.5.1` register record; **zero `TypeError`/`ReferenceError` and no row red for a harness reason**; the full suite read **60 files / 970 tests — 919 passed / 49 failed / 2 skipped** against the `59 / 916 / 2 / 0` baseline (the delta is exactly the new file). **The property layer stopped AT its FIRST row** (`P-LH-IM-1`, `S-LH-PERM-1`, 5 attempts, 0 held / 5 broken, the 5-consecutive-failure cap) and the other six rows **never started** — and that un-run state is asserted as a **failure**, so a broken register can never read green. **Eight clauses could not be pinned without a ruling, so the SpecWriter reconciled the contract:** `ListEntry.node` is **optional/nullable** with a new `N-1..N-4` node rule · **`''` is a VALID key** (`F-5` loses; new row `M-18`) · `P-LH-SM-1` restated **by refusal class** (`F-2`'s first-wins governs) · `P-LH-TP-1`'s "seven" corrected to **8 declared methods / 6 returning `ListHostResult`** · `ListHostRefusal.key` widens to **`unknown`** · `M-14`'s literal reading ruled (**`dispose()` removes nothing**) · `A-12` recorded **`OWED` to the adversarial pass** (three unruled seeds) · the static-row citations reconciled (**`§4.4` is the stop-condition table `S-1..S-6`**) · and `§5.5.1`'s **`157` corrected to the counted `168`** (`33+34+8+5+8+8+72`). **A ONE-PASS TestWriter remand was RUN (`d59478c`)** to re-align the file with the reconciled contract (re-pin `F-5`, `P-LH-TP-1` and `P-LH-SM-1` text, the arithmetic comments; ADD `M-18` and the `''`-valid coverage; `M-14`, `S-3`/`S-4`, `I-8`'s restricted table and `F-2` unchanged). **The numbers above are the PRE-REMAND run's own measurements; the post-remand run's numbers replace them when they report — no post-remand figure is claimed here.** **(3b) The ONE-PASS REMAND RAN AND REPORTED (commit `d59478c`) — these are the numbers the unit's `DONE` row must quote as its red set.** `tests/owned-list-host.test.ts` now carries **53 rows = 50 red / 3 pass** (was 52; the `+1` is the new `M-18`); failure classes — **39** rows module-absent on the surface boundary, **5** static rows module-file-absent, **6** register rows reported as failures because they **NEVER STARTED**; the full suite read **60 files / 971 tests — 919 passed / 50 failed / 2 skipped** (the `+1` test and `+1` failure are exactly `M-18`). **The property layer executed 5 of its 168 attempts:** `P-LH-IM-1` (`S-LH-PERM-1`) stopped early at 5 attempts / 0 held / 5 broken, `registerStoppedAt: P-LH-IM-1`, and `P-LH-IM-2`…`P-LH-TP-1` never started — each asserted as a FAILURE by design. `PRE-3` is GREEN and asserts the corrected arithmetic (`33+34+8+5+8+8+72 = 168`). **Two findings the remand reported and did NOT fix (both now recorded in `docs/pending.md` §G):** `docs/specs/listhost.md` `§5.1` row 2 still marks the test file `NEW` (it is tracked and now modified — owner: the unit's documentation review), and **`npm run typecheck` does not cover `tests/**`** (`tsconfig.json` includes `src/**` only, so the trio's second leg is **vacuously** green for test files — owner: a config/process pass; **"typecheck clean" is evidence about `src/**` ONLY**). **The Implementer's GREEN is IN FLIGHT**, diff scope `src/shared/owned-list-host.ts` and nothing else. **(3c) GATE 3 IS CLOSED — THE UNIT IS GREEN (commits `0edbfe0` + `b1930d2`).** The Implementer landed exactly one file, **`src/shared/owned-list-host.ts`** (374 lines; the **seven** exports of `§2.1` and nothing else; no imports, no module-level state, one string union), and all six static rows `S-1..S-6` pass, so `§2.2`'s prohibitions hold in the code itself. **Seven rows remained red and the SUPERVISOR VERIFIED BOTH DEFECTS AGAINST THE TEST SOURCE before any fix — they were TEST-HARNESS defects, and the implementation was NOT bent to satisfy them:** (i) the helper `keyIdentity(expected)` returned a **predicate** which 7 call sites handed to `.toBe(...)` (i.e. `Object.is` against a function — unsatisfiable) — replaced by `keyIsVerbatim(expected, actual): boolean` with every row's intent, message and clause citation byte-identical; (ii) `I-4` captured `mountSurface(mount)` **before the host existed** (`childCount 0`) and compared it after a sequence that legitimately places two children and removes one — it now asserts the mount's **ATTRIBUTE** surface (never moves) and states the child count against the **contract-forced** sequence (**2** after `setEntries` per `M-2`, **1** after `remove('b')` per `M-11`, `b` gone by request and by reference) — the row is **stronger**, no row was deleted and nothing spec-unsupported is asserted. **The FINAL measured state:** unit file **53/53 green** · property register **168/168 attempts held, 0 broken, stop-after-5 NEVER triggered, `registerStoppedAt: null`, seed `20260927`** · suite **60 files / 971 tests — 969 passed / 0 failed / 2 skipped** (the 2 skips pre-existing and outside this unit) · typecheck exit 0 · build exit 0 (5 bundles) · a standalone strict `tsc` over the test file exit 0. **LAYER HONESTY (state it; never over-read this green):** the evidence is **`[T]` — the shim tree only**, never the assembled app; the optional `§5.2` `[U]` real-DOM row is **NOT TAKEN**; and **`src/shared/owned-list-host.ts` is imported by NO `src/**` file** (verified) — it is a `(C)`-mechanism with no in-tree consumer yet, so this green proves the contract holds for a caller, **not** that the application behaves differently. **The ADVERSARIAL GATE (gate 4, incl. the read-only PBT audit) is IN FLIGHT**; the greens, legs, doc review and trio gates follow it. **(4) Tracker reconciliation landed in the same pass:** *(**⟶ EDIT ACCIDENT, STATED IN FULL — `RCA-8(d)`: STOP, STATE, RESTORE.** This pass's clause-(3c) insertion clipped this clause's opening phrase — it read *"the **seven stale `619`-line figures** for `docs/specs/listhost.md` reconciled to `1056`"*, lost *"the **seven stale `619`-line figures**"* and left the sentence starting mid-clause at *"for `docs/specs/listhost.md` reconciled to…"*. The bytes were **restored from `HEAD`'s copy before this pass's edits** (`git show HEAD:docs/next-steps.md`, verbatim), no fact was added or removed, and only the clipped phrase is restored.)* the **seven stale `619`-line figures** for `docs/specs/listhost.md` reconciled to **`1056`** (the handover block §2, row `D2`, `docs/pending.md`'s `SCH-1`-invariant note + `SCH-11` row, `docs/decisions.md` note 21, the gate record's `U6` + owed-spec-list cells — each annotated `DISCHARGED` at its own site; **the `774` reading this line carried is the previous pass's measurement, and every site now records that a line-count census DRIFTS — cite sections, never lengths**), and **`docs/specs/engine-pin.md` `§5.5`'s register-count arithmetic FIXED** (the cell's `4 P-IM + 3 P-SM + 2 P-TP` summed to `9` against a stated `8` and counted the absorbed `P-IM-3`; corrected to `3 live P-IM + 3 P-SM + 2 P-TP = 8`). **(5) Not claimed:** no DONE row and no leg for `U-LISTHOST` — **gate 3 (red → green) is CLOSED and gate 4 (adversarial + read-only PBT audit) is IN FLIGHT**; the unit's DONE row is written only after the adversarial, greens, legs, doc-review and trio gates. **The ledger counts are **`5 DONE / 15 open`** as of the `U-LISTHOST` DONE pass (the `D2` row has MOVED to `DONE`).

## CURRENT WORK / HANDOVER STATE — `U-ENGINE-PIN` is **DONE (2026-09-27)**: every leg its spec declares is GREEN, including the **live** `npm run divergence` leg (state as of 2026-09-27, the supervisor's DONE pass)

**The unit-status and execution-log paragraphs this block used to carry have been ARCHIVED**
(gitignored): `archive/next-steps/2026-09-27-engine-pin-pre-green-handover.md` (the wave-A
execution log + the 5-row blocker record, verbatim) and
`archive/next-steps/2026-09-27-engine-pin-pre-execution-state.md` (the doc-only pass's
"PARTIALLY LANDED" status paragraph). **Never cite this file by line** — cite the section
names below or the archived snapshots.

**⟶ DONE-PASS CORRECTION, READ FIRST (2026-09-27, the supervisor's DONE pass): `U-REALDOM-BOOT` IS `DONE` — the ledger's THIRD `DONE` row, complete on every leg its spec declares (`npm test` 58 files / 863 passed / 2 skipped / 0 failed · typecheck clean · build clean (5 bundles) · battery 184 checks / 0 failures · `npm run divergence` → `R13 RESULT: 9 checks, 0 failures` (`N = 9` intact) · `npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `427x22`, `retries=0`). The record is the `## DONE — U-REALDOM-BOOT` section above; the `⟶ WAVE-C BLOCK STATUS` table marks every wave-C owed list and `NOT DONE` status DISCHARGED; the counts are now `3 DONE / 17 open`. THE PARAGRAPH BELOW IS THE THIRD-PASS READING AND EVERY STATUS/COUNT/GATE CLAUSE IN IT IS SPENT — read it as provenance.** **⟶ CURRENT COUNTS (2026-09-27, THIRD pass — the authoritative figures AS OF THAT PASS; every earlier count in this file is dated provenance. *(⟶ THESE ARE NOW SUPERSEDED: read the `COUNT RECONCILIATION` block immediately below for the live figures — `58 files / 872 passed / 2 skipped / 0 failed` and the unit's set `77/77`; the `863` here is kept as the third pass's own measurement, per the annotate-never-rewrite convention.)*):** `npm test` **58 files / 863 passed / 2 skipped / 0 failed** · `npm run typecheck` **clean** · `npm run build` **clean** · `npm run battery` **184 checks / 0 failures** · **`npm run divergence` and `npm run ui`: CANNOT RUN — the host's Electron runtime is non-functional (ENVIRONMENT regression, A/B-proven not this unit's; see the `WAVE-C UPDATE` block). The last good divergence evidence is `R13 RESULT: 9 checks, 0 failures` (post-change tree, earlier).** *(**⟶ SUPERSEDED 2026-09-27, FOURTH pass — read its `WAVE-C UPDATE` / `### WAVE-C UPDATE — RESOLVED` block: the "ENVIRONMENT regression" attribution above was **WRONG** and is superseded — the cause was a **corrupted npm shim inside this repo's `node_modules`** (`node_modules/electron/cli.js` replaced by a shell script that re-execs itself), repaired this pass. **BOTH LIVE LEGS NOW RUN AND ARE GREEN on the post-repair tree: `npm run divergence` → `R13 RESULT: 9 checks, 0 failures`; `npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`, the ONE measurement `427x22` at `fontSize="16px"`, scratch cleanup verified (`removed 2 scratch profile(s) … leftover profiles: NONE`).** The counts above (trio typecheck/build/battery plus `58 files / 863 passed / 2 skipped / 0 failed`) stand unchanged by the repair.)* The `U-REALDOM-BOOT` unit is **`LANDED-GREEN-BUT-NOT-DONE`** with its rows **`68/68` green** (`41` `RT-*` rows — `39` from the retry pass + the `F-1` fix's `2`; `tests/ui-leg-contract.test.ts` holds `59` rows = `18` non-`RT` + `41` `RT`) — **NOT `DONE`** *(**⟶ 2026-09-27, FOURTH pass:** the live legs are **no longer** a blocker — the **runtime is functional and both live legs are green**; the **per-unit documentation review** and the supervisor's **`DONE` row** are what remain).* *(**⟶ COUNT/DISPOSITION UPDATE 2026-09-27, FIFTH pass — the live battery + the `F-2` RCA + fix; read `### WAVE-C UPDATE 2` below for the block, and treat `docs/specs/ci-ui-leg-live-status.md` as the live record:** the trio figures above are **UNCHANGED**, and the two LIVE legs are **GREEN as of the live battery**: `npm run divergence` → **`R13 RESULT: 9 checks, 0 failures`** · `npm run ui` → **exit 0**, **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, ONE measurement **`427x22`** at `fontSize="16px"`, **`retries=0`**. **The retry's six `NBR-*` runtime rows are CLOSED by live evidence**, and **`F-2` (the timeout-class retryability RACE) is FIXED and verified MONOTONIC** (`120`/`200`/`260 ms` → `RT-7 EXHAUSTED: 4 of 4 (3 retries)`, every attempt recorded in order, exit `1`; `300 ms` → accepted, `11/11`, `427x22`) — the fix snapshots the handshake state at settle (`handshakeResolvedAtSettle`, `scripts/electron-ui.mjs:641`, read) so both halves of the retryable signature describe the timer instant. **`F-1` (leftover scratch profiles) REMAINS OPEN — the live run still leaves a root + both attempt profiles while the leg reports `leftover profiles: NONE`; nothing in this pass closes it.** **The unit stays `LANDED-GREEN-BUT-NOT-DONE`; the remaining `DONE`-blocking items are the per-unit documentation review (item 10d/RCA-6) and the supervisor's `DONE` row**, plus the non-blocking **snapshot-ordering test row (recommended, not implemented — TestWriter-owned)** and the **adversarial pass's own record (§3a/§3b `OWED`).**)*

## ⟶ COUNT RECONCILIATION — the wave-C count drift, corrected 2026-09-27 (the `G-4` fix pass's closure of the last open routed item)

**READ THIS BEFORE QUOTING ANY COUNT IN THIS FILE.** The wave-C records elsewhere in this file (and in
`docs/decisions.md`, `docs/pending.md`, `docs/FORKER.md`) state the suite as **`58 files / 863 passed /
2 skipped / 0 failed`** and the unit's row set as **`68/68`**. Those figures were **the then-measured
values** and are **kept as dated measurement records — annotated, never silently deleted.** They are
**superseded** by the pass that closed the adversarial pass's last open routed item (`G-4`, MED,
`tests/**`, owner: the TestWriter — `docs/specs/ci-ui-leg.md` AMENDMENT BLOCK 8's findings table):

| Artifact | Then (wave-C records) | **Now (live)** | What moved |
| --- | --- | --- | --- |
| `npm test` | **58 files / 863 passed / 2 skipped / 0 failed** | **58 files / 872 passed / 2 skipped / 0 failed** | the **`G-4`** fix pass rebuilt the unit's rows so each **extracts and RUNS** the leg's own predicates/producers instead of matching source text — **`+9` falsifiable rows**: `7` in the contract file / `2` in the seam file |
| the unit's row set | **`68/68`** (`59` contract + `9` seam) | **`77/77`** | `tests/ui-leg-contract.test.ts` = **`66`** rows (**`59`** clause rows **+ `7`** rebuilt falsifiable rows: `R0-fals`, `R0(c)-fals`, `R1-fals`, `R2-tally-fals`, `R2-frame-fals`, `R3-fals`, `R4-fals`); `tests/ui-leg-seam.test.ts` = **`11`** (9 landing rows + the `G-2` witness pair `SEAM-R0(c)-a`/`-b`) |
| the rest of the legs | `R13 RESULT: 9 checks, 0 failures` · battery `184 checks / 0 failures` · `npm run ui` exit `0`, `11/11 … R0-R4`, `427x22`, `retries=0` | **unchanged** | no leg result, no exit code and no measurement moved; **`M-46` stays `UNMEASURABLE`** |

**⟶ COUNT RECONCILIATION, UPDATE 1 (2026-09-27, the `U-MOUNTGUARD` per-unit documentation review —
`AGENTS.md` item 10d/RCA-6; read this with the table above, whose wave-C figures are that pass's own
dated measurement):** `npm test` is now **`59` files / `916` passed / `2` skipped / `0` failed** — the
new file is **`tests/mount-invariant-guard.test.ts`** (44 rows: `41` red / `3` pass at the red-set pass,
**all `44` green** on the tree that carries the host fix), and the wave-C unit's figures are **unmoved**
(`tests/ui-leg-contract.test.ts` **`66`**, `tests/ui-leg-seam.test.ts` **`11`**, set **`77/77`**).
**Every other leg is unmoved too:** typecheck clean · build clean (5 bundles) · battery **`184 checks /
0 failures`** · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`** (`N = 9` intact) ·
`npm run ui` exit `0`, `11/11 … R0-R4`, `427x22`, `retries=0` · `M-46` **`UNMEASURABLE`**. *(The `872`
above is kept as the `G-4` pass's own measurement — the annotate-never-rewrite convention; the `+44`
rows and the `+1` file are this unit's, and **no other pass's count is retracted**.)*

**`G-4`'s outcome, recorded as the closure of the last open routed item:** the rows are **FIXED** — a
**`15`-mutation out-of-tree matrix** shows **each strengthened row reddens**, so a revert of the behaviour a
row pins now goes **RED** rather than staying green (the general rule is ACTIVE at `docs/decisions.md`
`TEST-MARKER-MUST-BE-THE-ASSERTION`). With `G-4` fixed, **no `G-*` item of the adversarial pass remains
open as owed work**: `G-1`/`G-2`/`G-3`/`G-6`/`G-7`/`G-13`(`scripts/**` half)/`G-4` are **FIXED**;
`G-5`/`G-10`/`G-11`/`G-12` are **tracker-only**; `G-8`, `G-9` and `G-1`'s named residual are **PARKED at
`docs/pending.md` §F with owners and revisit conditions**; `G-13`'s spec and `src` halves are **REPORTED, not
rewritten** (owners named). **The pass's own record is the archive record
`archive/reviews/2026-09-27-U-REALDOM-BOOT-adversarial.md`** (the adversarial pass's full record, of which
the spec's AMENDMENT BLOCK 8 is the load-bearing copy).

**Which earlier figures in THIS file are dated, and how to read them:** the `863` / `68/68` forms in the
`WAVE-C CHECKPOINT` / `WAVE-C UPDATE` / `WAVE-C UPDATE 2` blocks and in the `## DONE — U-REALDOM-BOOT`
record are **the measurements of the passes that produced them** — they are **provenance, not live claims**,
and the DONE record's own row census additionally describes the **`68/68` form as it stood when that record
was written.** **The `## DONE — U-REALDOM-BOOT` record and its ledger row now carry a dated `⟶ G-4 FIX
PASS` annotation** naming the current figures and the closure; every other `863`/`68/68` mention in this
file is covered by this block. **No claim in those records is retracted: the red→green history, the
dispositions, the `F-1`/`F-2` closures and the live-battery verdicts all stand as written.**

**Live status (the authoritative record for the wave-A unit):**

> **⟶ SUPERSEDED BY THE DONE PASS (2026-09-27) — read it as history, not as live status.**
> **The unit is `DONE` on every leg its spec declares; the record is the `U-ENGINE-PIN` DONE
> record immediately below.** The six numbered items in this block are the **wave-A
> doc-review** snapshot: item 1 is **superseded by the DONE row's legs** (same trio/battery
> numbers, now with the divergence leg green); item 2's **"THE LIVE LEG IS NOT PASSED"** is
> **superseded** — the supervisor landed the harness spawn fix and the leg is green
> (`R13 RESULT: 9 checks, 0 failures` on the **post-change** tree); item 3's
> `LIVE-OP-REJECT` **finding was ADJUDICATED, then FIXED + LIVE-VERIFIED (2026-09-27)** — a
> **HOST-owned, pre-existing** defect (`docs/defects.md`, now in that file's `## FIXED (in this
> repo)` section: the renderer IPC unwrap, pinned by `tests/op-command-unwrap.test.ts`
> `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`, live status flipped `rejected` → `applied`), **outside this
> unit's scope and never a blocker for its declared legs**; item 4 still binds (the `PF-*` pane rows stay node-layer; the
> real-DOM attribute rows still need `U-DIVERGENCE-EXT`'s `H-r10` extractor); item 5 is
> discharged (**the doc review ran, and the DONE row is now written — this pass**); item 6
> still holds. The **historical ledger** line below this block is unchanged and still
> provenance only.

1. **`U-ENGINE-PIN` is GREEN on the node-suite / typecheck / build / battery legs — and NOT
   `DONE`, because its declared `npm run divergence` leg is NOT passed.** Legs measured:
   `npm test` **55 files / 789 passed / 2 skipped / 0 failed** *(the DONE-pass count — **⟶ 56
   files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**,
   which added `tests/op-command-unwrap.test.ts` — **⟶ 58 files / 822 passed / 2 skipped / 0
   failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**, which added
   `tests/ui-leg-contract.test.ts` + `tests/ui-leg-seam.test.ts` (27 rows); both earlier figures
   are kept as their dated counts and are NOT re-baselined)*; `npm run typecheck`
   clean; `npm run build` clean; `npm run battery` **184 checks / 0 failures**. The blind
   greens set (`docs/specs/engine-pin-greens.md`) is the **third** run: **104 rows — 96
   PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE** (+1 recorded, +2 restated). Code landed:
   `src/shared/dom-shim.ts` (`removeAttribute` with the `id` + `value` slot special cases),
   `src/renderer/runtime.ts` (`mutationPropsValid`, shape-only, kind-scoped to
   `state-slice`/`layer-apply`), `src/renderer/secure-panels.ts` (`paneMutationValid` with
   the `Array.isArray` guard first, + the public seam `applyPaneMutation`).
2. **THE LIVE LEG IS NOT PASSED (this is the gate).** `npm run divergence` — the repo's own
   driver, unmodified — **fails in this environment**: Chromium is denied `/dev/shm` + its GPU
   cache dir, the spawned Electron dies **SIGTRAP** after `renderer ready — MCP backend armed`,
   and the leg reports **`R13 RESULT: 1 checks, 2 failures`, exit 1**. Its last good run
   (**`R13 RESULT: 9 checks, 0 failures`**) is **PRE-CHANGE** and **cannot retire a live row**.
   A **scratch replication** of the same nine comparisons (spawn extended with
   `--disable-dev-shm-usage` **and** a temp `--user-data-dir`, script outside the repo) is
   **green on the post-change tree** (`SCRATCH RESULT: 9 checks, 0 failures`) — that is
   **evidence, NOT the gate**. The fix lives in `scripts/electron-divergence.mjs`'s spawn and
   belongs to **`U-DIVERGENCE-EXT`, NOT to this unit**; then the architect runs
   `npm run divergence` for the gate. Full record: `docs/specs/engine-pin-live-status.md`.
3. **⛔ OPEN FINDING — `LIVE-OP-REJECT` (must be adjudicated before the DONE row).** **⟶ SUPERSEDED 2026-09-27: it was adjudicated as a HOST-owned, PRE-EXISTING defect and it is now FIXED + LIVE-VERIFIED** (`docs/defects.md`'s `## FIXED (in this repo)` section; `tests/op-command-unwrap.test.ts` `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`; live status flipped `rejected` → `applied`) — the paragraph below is the snapshot's own text, kept for provenance. On the
   **assembled app**, `provident.op` returns **`{status:'rejected'}` for every mutation shape**
   — including well-formed ones — while the **shim battery host applies the identical call**.
   Not a targeting/gate/value artefact (`docs/specs/engine-pin-live-status.md` §5, with the
   reproductions). The greens' `PA-*`/`P*`/`E-11` rows ran on the **`Runtime` bundle under
   node**, never over the app's IPC/MCP transport, so they are **envelope-green and
   contradicted live**. The **handler-originated** route (outside the guard's declared
   boundary) **does** work live. Per the live-runner contract this is a **finding, never a
   pass**; attribution is **not established**. **The architect adjudicates** (live regression →
   host fix + regression row here; or a greens layer correction). **⟶ RESOLVED 2026-09-27: the
   architect's direction was the FIRST branch — the host fix + a regression row over the IPC hop;
   both landed** (`docs/decisions.md` `LIVE-OP-REJECT-CLOSED`).
4. **Not exercisable at this layer (recorded, not a gap):** `SecurePanels.applyPaneMutation` is
   renderer-side only (no IPC, no MCP tool, no group) — the `PF-*` rows stay node-layer; and
   the real-DOM **attribute** rows still need `H-r10`'s extractor (`U-DIVERGENCE-EXT`).
5. **The DONE row is the SUPERVISOR's** (AGENTS.md item 6/10d); the unit's per-unit
   documentation review (RCA-6) has RUN — record:
   `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md` (findings landed in these
   trackers, not in the archive).
6. **Housekeeping:** `.cache/` inside the workspace holds the Electron download cache (already
   gitignored, `.gitignore:96`); no other scratch state was left behind.

**Historical ledger (kept for provenance, not re-measured here):** the three red cycles ran
**79 assertions / 61 red / 18 green-not-red** (cycle 1, against the pre-amendment contract),
then **101 pass / 9 fail of the amended 110-row set** (cycle 2), then the `PF-2`/`PF-4` pair
(cycle 3, discharged by amendment block 6's `§2.2.1` `value`-slot clear); the pre-existing
suite baselines quoted along the way were **658 / 2 skipped** (pre-jump), **737** and **697**
and **759** passed — all superseded by the lands-green **789 passed / 2 skipped / 0 failed** *(the DONE-pass count; **⟶ 56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**; **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**)*.

## DONE — `U-ENGINE-PIN` (2026-09-27, the supervisor's DONE pass)

**The DONE row's facts, in prose (authoritative — the table below is the same record in row form;
cite this paragraph when the row's tail is display-truncated).** **RED, per cycle, each RUN and
REPORTED before implementation (RCA-1):** cycle 1 — **79 assertions / 61 red → green**; cycle 2 —
the amended **110-row** set, **36 red → 101 green**, then the 9 residual reds **adjudicated into
5 dispositions**; cycle 3 — the **`PF-2`/`PF-4` pair (3 red) → green**. **GREEN, on the FINAL
tree:** `npm test` **55 files / 789 passed / 2 skipped / 0 failed** *(the DONE-pass count — **⟶ 56
files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**, which
added `tests/op-command-unwrap.test.ts` — **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the
2026-09-27 wave-C `U-REALDOM-BOOT` landing pass**, which added this unit's two `ui`-leg test files
(27 rows); the other four legs re-measured unchanged)*; `npm run typecheck` clean;
`npm run build` clean (5 bundles); `npm run battery` **184 checks / 0 failures**; `npm run
divergence` → **`R13 RESULT: 9 checks, 0 failures`** (Electron 44.4.5, node 24.21.0) — the
supervisor ran it on the **POST-CHANGE** tree, after landing the **harness spawn fix**
(`scripts/electron-divergence.mjs`: `--disable-dev-shm-usage` + a fresh scratch
`--user-data-dir` per spawn, **both required**; a harness change **outside** this unit's §5.1
scope; discharges `ci-divergence-leg.md` §1's hermeticity clause; **N=9 intact**;
**`U-DIVERGENCE-EXT` inherits it**). **ADVERSARIAL:** **14 findings — 2 BLOCKING, 6 RESHAPE,
6 ADVISORY**; the blocking pair is (A) the seam's `applied` documented wrong and (B) the pane
predicate's missing `Array.isArray` guard; landed dispositions are `M9`, the derived `applied`,
the re-pinned `PA-9`/`PA-10`, the `RemoveAttribute('value')` special case, and the
`secure-panels.md` §2a disclosure. **BLIND GREENS:** **104 rows — 96 PASS / 0 FAIL /
5 NOT-BLIND-RUNNABLE** (earlier runs 65 / 62 / 3 NBR, then 100 / 90 / 6 FAIL / 4 NBR; every
earlier FAIL re-driven to PASS after the contract was corrected to measured reality).
**DOC REVIEW:** `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`. **`LIVE-OP-REJECT`:**
**FIXED + LIVE-VERIFIED (2026-09-27)** — HOST-owned, pre-existing (the renderer IPC unwrap), filed
in `docs/defects.md` and now in that file's `## FIXED (in this repo)` section, **no HANDOFF row
owed** (it was never a package defect). It was **not** cleared by the R13 leg (which never calls
`provident.op`); it was cleared by the one-line renderer unwrap (`src/renderer/renderer.ts:43`),
verified **in-node** by `tests/op-command-unwrap.test.ts` (**`S1`** the RED row that pinned the
defect — pre-fix verbatim `expected { command: { kind:'state-slice', … } } to be { kind:'state-slice', … }`;
**`S2`** the non-destructive `?? req.payload` fallback; **`S3`** `load` stays raw; **`F1`/`F2`** the
fail-safe rows; **`S1b`** the one app-graph-changed push) and **live** by the same probe that
produced the defect (`{"status":"rejected"}` → `{"status":"applied","dirtied":["node-1"], …}`). **OWED,
test-side only:** the §7.12/§7.13 fixture-data items (`docs/pending.md` §D). **LAYER
ATTRIBUTION:** trio = **envelope/pure**; battery = the **shim host under node**; **only the
divergence leg is assembled-app evidence**, and it compares structural surfaces only.

**This is the ledger's FIRST `DONE` row. It supersedes `## OPEN` row **A** (moved out of the
`BLOCKED` table into this record — the row's blocker history is the `CURRENT WORK` block above
plus the archived pre-green snapshot `archive/next-steps/2026-09-27-engine-pin-pre-green-handover.md`;
the row is **not** deleted).** **Reader note on that moved row:** its cells are long enough that a
2000-character line cap truncates the tail in some viewers — **this DONE record is the
authoritative text for the unit's status**, and no tail fragment of the moved row is a live
claim.

**⚠ ROW-DISPLAY ARTIFACT (declared, not hidden).** The `U-ENGINE-PIN` DONE row below is a single
very long table line. Editing it hit this session's **file-write length cap**, which **truncated
a `write` mid-cell and left a duplicated adversarial fragment**; the row's cells therefore
display as cut off in some viewers and its tail is cosmetic. **Every fact the row carries is
recorded, complete and in prose, in the bullets above and in the files they name — cite THOSE,
not the row's tail:** the red-cycle ledger (bullet 1 of the DONE section), the adversarial
dispositions (`docs/specs/engine-pin.md` §3b + `docs/decisions.md`'s `U-ENGINE-PIN` sets), the
blind-greens arithmetic (`docs/specs/engine-pin-greens.md`'s status block + §6), the doc-review
record, all five measured legs (`docs/specs/engine-pin-live-status.md` §0/§7.2), the harness
spawn fix (`DIVERGENCE-SPAWN-FIX`), `LIVE-OP-REJECT` (`docs/defects.md` — **since FIXED + live-verified, 2026-09-27**), and the owed fixture
data (`docs/pending.md` §D). **No claim in this record depends on the row's untruncated form.** The unit's own spec is `docs/specs/engine-pin.md` (amendments
through block 7 + the `B-LANDED` reconciliation) with `docs/specs/engine-pin-greens.md` and
`docs/specs/engine-pin-live-status.md`; its decisions are `docs/decisions.md`'s
`ACTIVE — the U-ENGINE-PIN decision set` + `ACTIVE — the U-ENGINE-PIN DONE-pass decision set`.

| Unit | Wave | Red → green (RUN, per cycle) | Landing | Adversarial / blind greens / review | Legs (all run on the FINAL tree) |
| --- | --- | --- | --- | --- | --- |
| **`U-ENGINE-PIN`** — `provident-ssr` `^0.2.1` → **`^0.5.1`** + the scoped shim completion (`ShimElement.removeAttribute`, incl. the `id` **and** `value` slot clears) + the **shape-only** prop-mutation guard at both call sites + the pane seam `SecurePanels.applyPaneMutation`. **The unit is COMPLETE on every leg its spec declares.** | A (`A-d2` + `H-r7`) | **Three cycles, each red RUN and REPORTED before implementation (RCA-1):** cycle 1 — **79 assertions, 61 red → green** (56 of the reds were `TypeError: … removeAttribute is not a function`, on the pre-amendment contract); cycle 2 — the amended **110-row** set, **36 red → 101 green**, then the 9 remaining reds **adjudicated into 5 dispositions** (2 TEST-ONLY, 2 spec amendments + row relabels, 1 spec clause + one hunk); cycle 3 — the **`PF-2`/`PF-4` pair (3 red) → green**, discharged by amendment block 6's `§2.2.1` `value`-slot clear. | `src/shared/dom-shim.ts` `removeAttribute` (the `id` + `value` slot/store clears; `hasAttribute` deliberately **NOT** added), `src/renderer/runtime.ts` `mutationPropsValid` + `applyCommand`, `src/renderer/secure-panels.ts` `paneMutationValid` (**`Array.isArray` as the FIRST statement**) + the public seam `applyPaneMutation(nodeId, mutation)`. **One** new production surface (the seam; renderer-side only). | **Adversarial pass: 14 findings — 2 BLOCKING, 6 RESHAPE, 6 ADVISORY.** The blocking pair: **A** the seam's `applied` was documented wrong (it returned `applied:true` on a refusal) and **B** the pane predicate had **no `Array.isArray`** guard (a non-array batch threw `TypeError: mutation is not iterable`). Landed dispositions: **`M9`** (the new §3.6 row — a non-array batch is **REFUSED**, never a throw), the seam's `applied === (status === 'applied')`, `PA-9`/`PA-10` strengthened from tautologies to **pinned verdicts**, the `RemoveAttribute('value')` special case for `INPUT`/`TEXTAREA` (slot + store) with the wider `prop:value` / `css.value` scope recorded as the contract; §2a of `docs/specs/secure-panels.md` discloses the seam. PBT audit read-only: no row over-strong; coverage adequate except `P-SM-3`/`P-TP-1`'s list, fixed by `M9`. Blind greens run 3: 104 rows / 96 PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE. Doc review RUN: `archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`. **Legs, all on the FINAL tree:** `npm test` **56 files / 795 passed / 2 skipped / 0 failed** (the unit's own 8 files + `tests/op-command-unwrap.test.ts`, the `LIVE-OP-REJECT` fix's row) · `npm run typecheck` clean · `npm run build` clean (5 bundles) · `npm run battery` **184 checks / 0 failures** · `npm run divergence` → **`R13 RESULT: 9 checks, 0 failures`** (Electron 44.4.5, node 24.21.0; census 12/12 both legs, dirtied ids normalized-match, SSR fragment match, `data-node-id` set match, nodeId vocabulary, counter render, R7 dispatch non-empty). **The divergence run was executed by the SUPERVISOR on the POST-CHANGE tree after landing the harness spawn fix** (`scripts/electron-divergence.mjs`: `--disable-dev-shm-usage` + a fresh scratch `--user-data-dir` per spawn, both required; outside this unit's §5.1 scope; discharges `ci-diversion-leg.md` §1's hermeticity clause; `U-DIVERGENCE-EXT` inherits it; N=9 intact) — that is what closes the leg the pre-change `9/0` could not. **`LIVE-OP-REJECT` — found by this unit's live leg, HOST-owned, PRE-EXISTING and NOT this unit's regression: FIXED + LIVE-VERIFIED in the immediately following pass** (the renderer unwrap, `src/renderer/renderer.ts:43`; `tests/op-command-unwrap.test.ts` `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`; live status flipped `rejected` → `applied`; no upstream handoff owed). **OWED, recorded, NOT landed (test-side only):** §7.12 the fixture's `PF-7` `build()` should carry the sibling half; §7.13 `PF-5`'s should carry all three malformed shapes. **Layer attribution:** the trio is envelope/pure-layer evidence; the battery is the shim host under node (a different MCP host); **only the divergence leg is assembled-app evidence** — and it compares **structural** surfaces, never the IPC hop. |


**⟶ DONE-ROW REPAIR + STATUS NOTE (2026-09-27, by the `LIVE-OP-REJECT` fix pass).** The
`U-ENGINE-PIN` DONE row above was **repaired by the supervisor**: a mid-cell truncation in the
earlier pass had duplicated its adversarial/legs text and left `END-OF-ADVERSARIAL-CELL /
CELLS-DONE / ZZLEGS` splice markers in it. The row now carries **one** copy of each cell
(5 columns, no splice markers) with the **final** counts. **Superseded text must not be quoted
from any earlier snapshot of it:** the row previously read `npm test` **55 files / 789 passed /
2 skipped / 0 failed** (now **56 files / 795 passed / 2 skipped / 0 failed** — the extra file is
`tests/op-command-unwrap.test.ts`, the `LIVE-OP-REJECT` fix's rows; **⟶ 58 files / 822 passed /
2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass** — the two further
files are that unit's `ui`-leg rows) and described `LIVE-OP-REJECT`
as **OPEN** (it is now **FIXED + LIVE-VERIFIED**: the renderer unwrap at `src/renderer/renderer.ts:43`,
rows `S1`/`S2`/`S3`/`F1`/`F2`/`S1b`, live status flipped `rejected` → `applied`, moved to
`docs/defects.md`'s `## FIXED (in this repo)` section — **HOST-owned, no upstream handoff owed**).
**Every other clause stands:** typecheck clean · build clean (5 bundles) · battery **184 checks /
0 failures** · divergence **`R13 RESULT: 9 checks, 0 failures`** on the post-change tree · the
unit's `DONE` status.

## DONE — `U-ENGINE-DRIFT` (2026-09-27, the supervisor's DONE pass)

**The DONE row's facts, in prose (authoritative — the table row below is the same record in row form;
cite this paragraph and the files it names when a viewer truncates the row).** **THE ARCHITECT'S
RULINGS IT EXECUTED:** **the go-ahead was WAVE B ONLY** (`docs/specs/engine-drift.md` §0 **ruling 1** —
wave A closed, waves C–F *not* authorised by that go-ahead); **the `0.2.1`-baseline capture is
EXCLUDED** (§0 **ruling 2** — the two controls `R-16`/`R-17` stay **forward pins on `0.5.1`**, the
historical-output claim is recorded **`UNMEASURABLE`** as **`M-49`**, and no `0.2.1`/`0.4.x` dist is
installed or read); and **the authorised outcome is what landed**: a **`MEASUREMENT RECORD` with ZERO
production code and ZERO new tests** (§0 **ruling 3** — *"its DONE row MUST SAY SO"*). **THE
CODE/TEST DELTA — stated in one line, as §5.4 item 2 requires: production code: `0` files; new tests:
`0` files.** **THE RED — RUN and REPORTED, and it is EMPTY (that IS the report).** The unit's red is
the **existing suite under the moved pin** (ruling 4; §4.1–§4.2, *not* a new test file):
**`56 files / 795 passed / 2 skipped / 0 failed`** *(the date of that run's count — **⟶ 58 files /
822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing pass** added
that unit's two `ui`-leg test files; the wave-B record's own red is NOT re-baselined by this)* — **NOT ONE ROW RED**, so there is **no failure
output to quote and none attributable to the pin move**; the `2 skipped` are the suite's pre-existing
skips. **Attribution, per §4.2 item 3:** `0` failures attributable to the pin move · `0`
pre-existing failures · `0` environment failures · `0` stale-build failures. **A "no-drift red"
whose failures are zero is the shape §4.2 item 5 names explicitly** (the red is the *proof of
contact* — the suite really ran **under** the new pin); this record does not claim the suite "was
already green, therefore nothing was reconciled" (the reconciliation is the §3 measurement set).
**THE DELIVERABLE — `docs/specs/engine-drift-measurements.md`** (the path §3.0 **chose**, not a
fallback): **`N = 57` rows (`M-1`…`M-57`) = `47` `CONSISTENT` + `2` `DRIFTED` + `7` `UNMEASURABLE` +
`1` `INVALID`** (`47 + 2 + 7 + 1 = 57 = N` ✔), **one reconciled ledger** (the 2026-09-27 correction
pass re-enumerated every verdict cell by hand and **superseded both pre-correction ledgers** —
`45 + 2 + 8 + 1 = 56` and `44 + 2 + 9 + 1 = 56`; **neither may be quoted**), **each row carrying
§3.1's nine columns in order** (no blank cell), and the **`INVALID` row kept IN PLACE with its reason
and its replacement row**: **`M-52`** (colon-twin take one, §3.2 class 7) → replacement **`M-56`**.
**`N` is 57 and not 56 because the correction pass SPLIT `M-30`** (§3.2's own handling for an
un-carryable claim is *"Split the row"*): the measured half keeps the id **`M-30`**
(store → `SecuritySettings` → `RuntimeOptions` → `Supervisor`) and the un-carryable
**store → IPC → renderer** hop is the **new `M-57`** (`UNMEASURABLE`, own revisit condition) — §3.1
column 1 forbids **reusing or renumbering** an id, **not** adding one. **`M-40` also moved
`UNMEASURABLE` → `CONSISTENT`** on the permitted `P1` recipe already in the tree. **THE TWO
`DRIFTED` ROWS AND THEIR DISPOSITIONS (both tracker halves landed — the record itself writes no
tracker, §5.1):** **(i) `M-14`** — this repo's **raw tool-ish string-census claim** (the greens
file's `23`, = `ALL_TOOLS` 21 + 2 gate-only `module.*` keys) is **UNREPRODUCIBLE**: measured **`24`
normalized / `29` raw** under the now-written-out rule, and the blind run's independent
**`28`/`33`** under the same rule **without** the whole-token boundary clause; the delta is exactly
one name — **`module.fetch`**, whose only bundle occurrence is an **error-message literal**. The whole
class is **RETIRED as an evidence class** (`docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`); the count
authority is **`ALL_TOOLS` set-equality (`R-15`) + the `RpcMethod` census (`R-15b`)**, because **a
census that counts error-message literals cannot detect a tool-set change**; the greens file's claim
was corrected (`G-06b`/`F-6` + its §3a correction block). **Gate: no code change.** **(ii) `M-31`** —
the `UNDO-REDO-DESTROY-STATUS` package claim was **stale on BOTH status and mechanism**: destroy-undo
reports **`{"status":"no-op","scheduledDirtied":[],"baseBoundary":false}`** at `0.5.1` (the host
surface, `[H]/[E]`, permitted route), because the engine's **resolve guard returns first**
(`node_modules/provident-ssr/dist/core/supervisor.js:1536-1538`) — `destroy` deleted the node
(`:1066`), so the `destroy` branch (`:1549-1551`) **and** the `:1649`
`return this.report('applied', dirtied)` fall-through are **unreachable for a destroy entry** — and
**the silent-`applied` false-success is NOT REPRODUCIBLE at `0.5.1` by any route**. The defect row
**MOVED** to `docs/defects.md`'s **`## CLOSED (not reproducible at 0.5.1)`** section (as-filed text
kept, corrected root cause, **FLIP NOTE** for an optional upstream dead-code tidy-up only);
`docs/HANDOFF.md` **Round 9** was rewritten to close it (**the remaining ask is an optional upstream
dead-code tidy-up — no new round, no upstream issue, no host change owed**); `docs/pending.md`
`UPSTREAM-UNDO-REDO-DESTROY-STATUS` was corrected
(`docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`). **NEITHER DRIFT OBLIGES HOST CODE OR
A TEST CHANGE — that is exactly what makes the zero-code landing the AUTHORISED outcome and not a
hole in it:** `M-14` is a **count claim** whose own route says *"gate: no code change"* and whose
repair is a **claim correction in its owning files**, and `M-31` is the case **§3.6 item 5 names
verbatim** — a `DRIFTED` `UNDO-REDO-DESTROY-STATUS` observation *"annotates the existing row"*:
**"no new row is owed and no host change is owed for it"**. **⟶ THE CLAUSE IS AMENDED AND THE
TENSION IS CLOSED (2026-09-27, the `A-d3` clause-level adjudication — `docs/specs/engine-drift.md`'s
status-block `### AMENDMENT`, §3.6, §3.7's new fail-state `F-9`, §5.4a's routing table and §5.4
item 3): §3.6's "no-drift" is RESTATED as "NO DRIFT REQUIRING CODE"** — the literal
*"`DRIFTED` **count of zero**"* clause is **SUPERSEDED (retained struck-through in place)**, and the
zero-code landing is satisfied when **every `DRIFTED` row's routing lands as a claim/tracker
correction (or an upstream handoff item) with NO host-side code and NO test change owed**, with the
**drift count and each row's disposition stated in the record AND in the DONE row** (§5.4 item 3;
`F-9` makes a hidden or unrouted drift a review finding). **Both of this record's `DRIFTED` rows are
exactly that class** (`M-14` claim/count-owned, gate *"no code change"*; `M-31` tracker-owned,
*"no host change and no test edit owed"*), so **this unit lands under the amended §3.6 clause** —
**and the amended clause is STRICTER than a bare count, because it obliges the routing of every
`DRIFTED` row.** **Not changed, and not claimed here:** a `DRIFTED` row whose routing needs host code,
a test change or a package patch still means **no zero-code landing** (§3.6's "what obliges code"
list is intact), and **a zero-code landing may never be achieved by hiding a drift**.)* **THE
ADVERSARIAL PASS RAN** (RCA-3; its findings land in
`docs/specs/engine-drift.md` **§3a**, with `§3b` annotated superseded — **status notes only; no
normative clause amended**). **Its verdict on the record AS FILED was `NOT DONE-ELIGIBLE`, and the
blocking findings were exactly two** (per §3a's own status note): **`B-1`** — the `M-14` count claim
was not precise enough to hold, and **`B-2`** — the `M-31` package row was stale on its status **and**
its mechanism, so a live tracker carried a cause that cannot fire. **Both corrections landed** (the
census-class retirement + the measured `no-op` / corrected resolve-guard root cause / disposition move
/ tracker + HANDOFF corrections) **and the record was then re-verified.** **The reshape-level
corrections the pass produced, both visible in the record's own cells:** **`M-31`'s engine-direct
evidence was STRUCK as §3.2 class-4 non-evidence** (a private-surface read; the verdict now rests on
the **permitted `Runtime.journal('undo')`** route alone — the value agreed, so **no verdict moved**),
and **`M-40` was re-taken on the permitted `P1` recipe already in the tree** (the **`layer-apply`
verdict stays NOT PINNED — no pin was invented**). **An arithmetic finding (`W-1`, the record's two
incompatible ledgers) was the second reason the DONE ruling stayed open and is RESOLVED IN the
record** by its own 2026-09-27 correction pass (single ledger, all 57 verdict cells re-enumerated,
`M-30` split into `M-57`, no id reused or renumbered). **Honest limit, stated rather than invented:**
the source facts for this pass describe **12 findings (2 BLOCKING / 3 RESHAPE / 7 ADVISORY)**; **the
two artifacts record the two BLOCKING findings in full and the pair of reshape-level corrections above,
and do NOT carry a 3-RESHAPE/7-ADVISORY classification** — that breakdown is therefore **not
reproduced here** (see this row's `Tracker reconciliation` note). **BLIND VERIFICATION (gate 5,
`AGENTS.md` item 10a):** **`docs/specs/engine-drift-greens.md` — `51` scenarios = `42` PASS / `3` FAIL
/ `6` NOT-BLIND-RUNNABLE (+ `M-52` carried `INVALID`, not counted as a pass)**, authored from
documentation only (no `src/**` or `tests/**` read to derive a scenario). **All three FAILs were
reconciled in the record, and NO VERDICT MOVED:** **`F-1` = `M-11`** — the `4117` number **exists
once** in the tree, as a **comment line in the installed engine dist**
(`node_modules/provident-ssr/dist/core/translate.js:623`), **not** in this repo's
`src/`/`tests/`/`scripts/`; the row's substantive separation (the two d12 populations; no observable
census for the clone-form population) **holds** and the old `(no output, exit 1)` half is
**STRUCK, not deleted**; **`F-2` = `M-14`** — the exclusion rule was **under-specified**; the rule is
**now written out in full** (regex · prefix filter · whole-token boundary · distinct-token convention ·
raw vs normalized · the single exclusion) and **both values are recorded** (`24`/`29` record, `28`/`33`
blind), **with the class kept RETIRED and no number presented as "the" census**; **`F-3` = `M-19`** —
the counter half **reproduces on the documented call shape** (the blind run's call put `requestId` in a
second argument the API does not read, so the dedup never fired) and the shape sensitivity is recorded
as a **call-shape control section** (two differing `requestId`s and two `requestId`-free dispatches as
controls; counter `"2"`). **THE LEGS — ALL GREEN on the final tree, each as the leg's own line, with
its LAYER label (§5.4 item 5 as amended):**
`npm test` `[T]` **`56 files / 795 passed / 2 skipped / 0 failed`** · `npm run typecheck` **clean (exit 0)** ·
`npm run build` **clean, 5 bundles (exit 0)** · `npm run battery` `[B]` **`184 checks / 0 failures`
(exit 0)** · `npm run divergence` `[A]` **`R13 RESULT: 9 checks, 0 failures` (exit 0)** — Electron
**44.4.5** / node **24.21.0** in the app, node **v24.20.0** for the driver and the shim host,
`DISPLAY=:0` and `/dev/shm` present. **LAYER ATTRIBUTION (state it, so no row here is over-read):**
the record's evidence is **envelope/pure-layer** (`[T]`/`[H]`) plus **shim-host-over-MCP** (`[B]`);
**only the divergence leg is assembled-app evidence (`[A]`), and it is
STRUCTURAL-SURFACES-ONLY — never IPC-layer**; the leg asserts **no** attribute row (`M-42`/`M-46`)
and is silent on the app's `provident.op` hop (the `LIVE-OP-REJECT` lesson). **THE `UNMEASURABLE` SET
NAMES ITS REVISIT CONDITIONS (`7` rows; ruling 2's explicit demand that the row SAY which claims are
unmeasurable):** **`M-46`** real-DOM attribute presence/absence → **`U-DIVERGENCE-EXT`'s `H-r10`
extractor** (a substring row is a guaranteed false red); **`M-49`** the historical-output claim →
**an architect-supplied `0.2.1` (or `0.4.x`) tree/artifact** — never convertible to evidence in this
tree; **`M-50`** the `P-TP-1` command-surface totality property → **no PBT harness**
(`NOT EXECUTED`, quoted as the register's own status word and mapped to verdict `UNMEASURABLE`);
**`M-51`** the `Supervisor` → `renderProducingProcess` `css.<key>`+`undefined` route → **no documented
host recipe** (`H-01` carried; substance covered on the `[T]/[E]` layers by `B-12`/`PA-5`/`S-18` and
here by `M-41`); **`M-57`** the `M-30` split's **store → IPC → renderer hop** → **a documented public
route that sets `SecuritySettings.maxJournalLength` on a live app**; **`M-38`** the engine's
**unexported** boolean-set **count** (`27`) → an engine release publishing the set, or an architect
ruling admitting that one constant as a surface (the **membership half is measured — `M-55`**);
**`M-25`** the raw engine `UndoRedoReport` on a **permitted** surface → a public way to read the
engine's own report object (the host projection is what `M-25` carries today; any direct read is
§3.2 class-4 non-evidence). **WHAT WAVE C INHERITS:** the record is the **citable measurement
artifact** for **`U-REALDOM-BOOT`** (`M-46` + `M-42`'s negative evidence — **no row of the record may
be read as real-DOM evidence**, §6 stop condition 8) and for **`U-DIVERGENCE-EXT`** (`M-46` as its
revisit condition; **`M-48`**'s re-measurement of the leg's own line with **`N = 9` a PIN this unit
did not touch**); **the divergence `N = 9` pin stays intact** and **the spawn flags are already
landed** (`DIVERGENCE-SPAWN-FIX`, inherited); **the `UNMEASURABLE` rows are PRECONDITIONS TO NAME,
NOT CAPABILITIES TO ASSUME**; and the layer discipline is binding on both (envelope greens are never
assembled-app or IPC evidence; a count of any declared tool set is never taken by a whole-bundle
literal census again — `RAW-STRING-CENSUS-RETIRED`; when `U-FOCUS-TOOL` lands, the same-commit
obligation is **`R-15` set-equality + `R-15b` + the default-gate subset**). **TRACKER
RECONCILIATION (this pass):** `docs/next-steps.md` (this record; row **B** moved out of `## OPEN`,
**not deleted**; the totals line now reads **2 DONE**), `docs/pending.md` (the `0.2.1`-baseline
control row corrected to the ruling-2 exclusion + `M-49` `UNMEASURABLE`), `docs/FORKER.md` (the
`U-ENGINE-DRIFT` status row + the digest counts), `docs/HANDOFF.md` (the stale *"Round 9 remains
open"* clause), `docs/specs/provident-electron-shell-chrome-handoff-review.md` (`H-r12` + the
filings-row annotation) and `docs/specs/engine-pin.md` (**§7.8**, plus a status note on §7.7's
pre-landing `removeAttribute`-gap clause), each with that file's `SUPERSEDED` /**status-note**
convention (**no normative clause of either file was amended** — in `engine-pin.md` both edits sit
inside numbered honest-statement items that state *"no requirement of this contract changes"*); §7.7
itself **carries no bare-name/removal claim** (read); the measurement record and the
`docs/specs/engine-drift*.md` artifacts were **read, not
written** (a parallel pass owns the record; a SpecWriter owns the spec). **`U-ENGINE-PIN`'s DONE
record above is INTACT and is not restated or superseded here.** **⟶ THE PER-UNIT DOCUMENTATION
REVIEW (AGENTS.md item 10d/RCA-6) HAS SINCE RUN — the gate this DONE row's item 8 owed — closing the
repo-wide audit's `O-1`:** its record is
`archive/reviews/2026-09-27-U-ENGINE-DRIFT-doc-review.md` (provenance — gitignored). It
**re-enumerated the record's 57 verdict cells by hand** (the `W-1` defect it was asked to confirm:
**genuinely fixed** — one ledger, `N = 57 = 47 + 2 + 7 + 1`, the two pre-correction ledgers struck and
labelled superseded), confirmed **9 columns per row with no blank cell and every `UNMEASURABLE` row's
revisit condition**, and landed **six same-pass fixes** — most importantly a **real arithmetic defect
in `docs/specs/engine-drift-greens.md` §5** (NOT-BLIND-RUNNABLE is **7** over the 51 scenario ids, not
6: `BL-38` is a §2 row) and the **one un-annotated false live claim** in the governing gate record
(`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s amended-plan row `U1`: *"OWED — not
filed"*). **A docs review proves nothing about the app**: no leg, suite, battery, window, MCP transport
or server was run by it (see its §6).

**This is the ledger's SECOND `DONE` row. It supersedes `## OPEN` row **B** (moved out of the
`BLOCKED` table into this record — the row's measured history is the `WAVE-B MEASUREMENT CHECKPOINT`
block below plus the record itself; **the row is not deleted**).**

| Unit | Wave | Red → green (RUN, per cycle) | Landing | Adversarial / blind greens / review | Legs (all run on the FINAL tree) |
| --- | --- | --- | --- | --- | --- |
| **`U-ENGINE-DRIFT`** — the behavioural reconciliation / measurement pass at the moved `provident-ssr` pin (`^0.5.1`). **The unit is COMPLETE on every leg its spec declares, and it lands as §0 ruling 3 authorises: a measurement record with ZERO production code and ZERO new tests.** | B | **THE RED IS THE EXISTING SUITE UNDER THE NEW PIN (ruling 4) — RUN and REPORTED, and it is EMPTY: `56 files / 795 passed / 2 skipped / 0 failed`.** **NOT ONE ROW RED**; **0 failures attributable to the pin move**, so there is no failure output to quote and none to attribute (§4.2 item 5's "no-drift red" — the red is the proof of contact, not a required failure). Red ledger, verbatim: `npm test` → `Test Files 56 passed (56) · Tests 795 passed, 2 skipped (797)`. | **`docs/specs/engine-drift-measurements.md` — THE DELIVERABLE, and the unit's ONLY authored artifact: `N = 57` = `47 CONSISTENT` + `2 DRIFTED` + `7 UNMEASURABLE` + `1 INVALID`, one reconciled ledger, nine columns per row, `INVALID` (`M-52`) kept in place with its replacement (`M-56`).** **CODE/TEST DELTA: production code `0` files; new tests `0` files.** No `src/**`, no `tests/**`, no pinned harness touched; `N = 9` untouched. | **ADVERSARIAL PASS RAN** (`docs/specs/engine-drift.md` §3a; `§3b` annotated superseded — status notes only): verdict on the record **as filed = `NOT DONE-ELIGIBLE`**, on **exactly two BLOCKING findings** — **`B-1`** the `M-14` count claim was not precise enough to hold, **`B-2`** the `M-31` package row was stale on status **and** mechanism. **Both corrected, then re-verified.** Reshape-level corrections visible in the record: **`M-31`'s engine-direct half STRUCK as §3.2 class-4 non-evidence** (verdict rests on the permitted `Runtime.journal('undo')` route; value agreed, **no verdict moved**) and **`M-40` re-taken on the permitted `P1` recipe** (**`layer-apply` verdict stays NOT PINNED** — no pin invented). Arithmetic finding **`W-1`** (two incompatible ledgers) **RESOLVED IN the record** by its 2026-09-28 pass. *(The source facts' **3 RESHAPE / 7 ADVISORY** classification is **not** carried by the artifacts; the 2 blocking findings are.)* **BLIND GREENS (`docs/specs/engine-drift-greens.md`, gate 5): `51` scenarios = `42 PASS` / `3 FAIL` / `6 NOT-BLIND-RUNNABLE` (+`M-52` carried `INVALID`).** All 3 FAILs reconciled in the record, **no verdict moved**: **`F-1` = `M-11`** (`4117` exists once, as a **comment line in the installed engine dist** — `dist/core/translate.js:623` — **not** in this repo's `src/`/`tests/`/`scripts/`; the separation holds); **`F-2` = `M-14`** (exclusion rule was under-specified — now written out in full, both values recorded: `24`/`29` and the blind `28`/`33`; class stays RETIRED); **`F-3` = `M-19`** (counter half reproduced on the documented call shape; the blind call put `requestId` in a **second argument the API does not read**, so dedup never fired — recorded as a call-shape control). **DOC REVIEW / tracker reconciliation: THIS pass** (owner: the supervisor; the unit's doc-review gate is discharged here). | `npm test` **56 files / 795 passed / 2 skipped / 0 failed** · `npm run typecheck` **clean (exit 0)** · `npm run build` **clean, 5 bundles (exit 0)** · `npm run battery` **`184 checks / 0 failures` (exit 0)** · `npm run divergence` **`R13 RESULT: 9 checks, 0 failures` (exit 0)**. Electron **44.4.5** / node **24.21.0** in the app; node **v24.20.0** driver; `DISPLAY=:0`, `/dev/shm` present. **LAYERS, per §5.4 item 5 as amended:** node suite **`[T]`** envelope/pure layer · battery **`[B]`** shim-host-over-MCP · divergence **`[A]`** **structural-surfaces-only**; typecheck/build are build gates, not evidence layers. **The record's rows were taken on `[T]`/`[H]`/`[E]`/`[B]` + the `[A]` leg (its own column 5).** **`UNMEASURABLE` (7) with named revisit conditions:** `M-25` raw engine report (permitted surface) · `M-38` unexported boolean-set count · `M-46` real DOM → `H-r10` (`U-DIVERGENCE-EXT`) · `M-49` historical baseline → architect-supplied artifact · `M-50` no PBT harness · `M-51` no documented graph recipe · `M-57` store→IPC→renderer hop. |

**⟶ ROW-DISPLAY NOTE (2026-09-27).** The `U-ENGINE-DRIFT` DONE row above is a single very long table
line (the same display hazard the `U-ENGINE-PIN` row carries). **Every fact it carries is recorded,
complete and in prose, in the paragraph above and in the files it names — cite THOSE, not the row's
tail.** No claim in this record depends on the row's untruncated form.

## DONE — `U-REALDOM-BOOT` (2026-09-27, the supervisor's DONE pass — the ledger's THIRD `DONE` row)

**The DONE row's facts, in prose (authoritative — the ledger row below is the same record in row form; cite this paragraph and the files it names when a viewer truncates the row).** **⟶ G-4 FIX PASS (2026-09-27) — ANNOTATION, dated: the row census and suite counts inside this record are the LANDING-PASS measurements and are NOT the live figures.**
Read the `## ⟶ COUNT RECONCILIATION` block at the top of this file for the live values: `npm test` **58 files /
872 passed / 2 skipped / 0 failed** and the unit's row set **`77/77`** (`tests/ui-leg-contract.test.ts`
**66** = **59** clause rows + **7** rebuilt falsifiable rows; `tests/ui-leg-seam.test.ts` **11**). **What this
record's `68/68` and `863` describe is the state before the `G-4` fix pass**, which was the adversarial
pass's **last open routed item** — now **FIXED** by the TestWriter's rebuild (rows that **extract and RUN**
the leg's predicates/producers; a **`15`-mutation out-of-tree matrix** shows **each strengthened row
reddens**), with its outcome recorded as the closure of that item. **Nothing else in this record moves:**
the red→green history, the landing scope, the `F-1`/`F-2` closures, the live-battery verdicts, the
adversarial dispositions and the exit-code evidence all stand exactly as written. **THE UNIT:** `U-REALDOM-BOOT` (`docs/specs/ci-ui-leg.md`, FILED 2026-09-27 + **six amendment blocks** `M-*`, `A2-*`, `B3-*`, `B4-*`, `B5-*`, `B6-*`, plus the **seventh** the per-unit documentation review appended), the **ONE additive production seam** (`--provident-user-data=<path>` argv scan + `app.setPath('userData', …)` ABOVE the store reads in `src/main/main.ts`; **absent ⇒ no call, today's behaviour byte-for-byte**), and the shared Electron-spawn helper `scripts/electron-spawn.mjs` (both legs now call it; the divergence leg's arg vector/env/stdio/profiles unchanged). **THE RED → GREEN — every cycle RUN and REPORTED (RCA-1):** the unit's rows were **20 red / 7 pass → 68/68** (`tests/ui-leg-contract.test.ts` **59** rows — **18** non-`RT` + **41** `RT` — plus `tests/ui-leg-seam.test.ts` **9**); the **retry clause set** (`39` rows) was authored **after** its implementation — the red-first order **INVERTED** for that clause set and **recorded as a process violation at the spec's `B3-MS-2`**, with **falsifiability established OUT-OF-TREE** by a **32-mutation matrix**; the follow-up **timeout re-point restored red-first order** (**3 red → green**: `RT-4c`, `RT-1e`, `RT-7f`); and the **`F-1` fix added two rows** (`RT-0a`/`RT-0b`). **THE LEGS, all on the FINAL tree:** `npm test` `[T]` **58 files / 863 passed / 2 skipped / 0 failed** · `npm run typecheck` **clean** · `npm run build` **clean (5 bundles)** · `npm run battery` `[B]` **184 checks / 0 failures** · `npm run divergence` `[A]` **`R13 RESULT: 9 checks, 0 failures`** (**`N = 9` intact**) · **`npm run ui` `[U]` exit 0**, **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, the **ONE** measurement **`427x22`** at **`fontSize="16px"`** read back over **`provident.get_rendered_html`**, **`retries=0`**. **ADVERSARIAL (RCA-3):** the pass's findings and their dispositions are the spec's **§3a/§3b record** (cite that file — §3b's `G-1..G-n` table is its disposition shape; **§3a's status line still read `OWED` to this pass, so this record reports both halves: the two findings below are FIXED and CLOSED, and the pass's own record lands in that file's §3a/§3b** — see `ADVERSARIAL-PASS-RECORD-VS-CLOSURES` in `docs/decisions.md`, and **no disposition is invented here for any finding the pass may land later**). **The two findings found and fixed this cycle:** **(i) the timeout-class RACE** — the two halves of the retryable signature described different instants (a **torn read** of the live `resolved` flag across the termination grace), so the timeout class was retryable at `30`/`100 ms` and **non-retryable at `200`/`260 ms`**; **fixed by snapshotting the handshake state at settle** (`handshakeResolvedAtSettle`), making the boundary **MONOTONIC** (`120`/`200`/`260 ms` → `RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`, every attempt recorded in order, exit `1`; `300 ms` → accepted, `11/11`, `427x22`); and **(ii) `F-1`, the leftover scratch profiles** — root cause: the helper spawned **`node_modules/.bin/electron` → `electron/cli.js`, a WRAPPER whose child is the real Electron binary**, so the handle killed was the wrapper and the **orphaned** real process **re-created the profile AFTER the delete-and-verify sweep had reported success** (`leftover profiles: NONE` true when it looked, false afterwards); **fixed by resolving the BINARY directly under a no-fallback-to-the-wrapper rule that throws a named error, plus registering the cleanup hook at creation**. Both are recorded as CLOSED host-side (`docs/defects.md` `UI-LEG-TIMEOUT-CLASS-RACE`, `UI-LEG-LEFTOVER-PROFILES`; **no `docs/HANDOFF.md` round owed** — HOST/leg-owned, the `R13-FIX` precedent). **BLIND GREENS (gate 5, `docs/specs/ci-ui-leg-greens.md`): `32` scenario ids = `24` PASS / `4` FAIL / `4` NOT-BLIND-RUNNABLE** — the as-filed `26 / 16 / 4 / 6` ledger **double-counted the six `NBR-01`…`NBR-06` ids** (which are NOT-BLIND-RUNNABLE **reasons**, not scenario rows) **and dropped rows**; the correction is recorded in that file's §3 `CORRECTION NOTE` **with the as-filed form kept marked, no verdict moved**. **All four FAILs were REAL defects and all are now fixed:** `R0-04` (the leftover profiles → **`F-1`**), `RT-05` (the timeout not consuming an attempt → the **race** fix), `RT-06` (the ceiling figure → **re-pinned `121 750 ms`**, the derivation being the pin), `RT-08` (the operator knob names → **recorded in `docs/decisions.md`**). **The `6` NOT-BLIND-RUNNABLE rows were ALL closed by the LIVE BATTERY** (gate 6, `docs/specs/ci-ui-leg-live-status.md` §3). **LIVE BATTERY (gate 6) — RUN, nothing parked:** a **real retry** (`attempt 1 … signal SIGTRAP` → `attempt 2 … accepted`; **`RT-6 RETRY GREEN … attempt=2 of 4 (retries=1)`**), a **real exhaustion** (**`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`**, every signature in attempt order, **NO MEASUREMENT WAS TAKEN**, exit **`1`**), a **real red precondition** (exit **`2`**), a real **DISPLAY absence** (exit **`3`**), and the **`RT-2` class-1 row** (a **completed boot with a bad row is not retried**, exit `1`). **Exit codes observed `{0,1,2,3}` — no fifth code, no skip, no fabricated `0`.** **CLEANUP END STATE (the `F-1` closure):** the exit-path matrix leaves **zero roots** on every path (green · malformed config · timeout exhaustion · divergence), with **0 surviving `electron` processes**, checked **immediately and after an 8 s settle** — and **the leg's report and the disk now agree**. **DOC REVIEW (gate 6/10d, RCA-6):** `archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md` (provenance — gitignored); **findings landed in the active trackers in the same pass**; it also **corrected the greens ledger** and **~30 stale line anchors** (repointed by that file's `B7-2` remap table, not by rewriting clauses). **LAYER ATTRIBUTION (state it, so nothing here is over-read):** the unit's evidence is **`[T]`** (the vitest rows) **+ `[U]`** (a **real Electron renderer boot under a scratch profile, ONE measurement**) **+ `[B]`/`[A]` only where the leg invokes them** (battery = the shim host under node; divergence = the **same built tree**). **It proves a real, distinguishable renderer with a profile-scoped store and ONE measurement — and NOTHING MORE: no rendered geometry, no IPC-layer behaviour, and no attribute row** (the measurement record's **`M-46` stays `UNMEASURABLE`** — the revisit condition is `H-r10`'s set-wise extractor, `U-DIVERGENCE-EXT`'s); **a green `divergence` leg is STRUCTURAL-SURFACES-ONLY evidence, never IPC-layer** (the `LIVE-OP-REJECT` lesson). **RESIDUE THAT GATES NOTHING:** the adversarial pass's own record (its file is `docs/specs/ci-ui-leg.md` §3a/§3b — reference it), the **recommended snapshot-ordering test row** (**RECOMMENDED, NOT IMPLEMENTED** — TestWriter-side, so no documentation pass may write it), and the spec-side **`B3-MS-1` row-count correction** (**already landed** by the doc review: `59` rows / `41` `RT`; the `57`/`39` forms are kept marked as the retry pass's own dated reading). **This is the ledger's THIRD `DONE` row. It supersedes `## OPEN` row `C1` (moved out of the `BLOCKED` table into this record — the row is KEPT VISIBLE as a `C1 — MOVED TO DONE` provenance row, the convention rows A and B used; it is NOT deleted), and the wave-C checkpoint/update blocks stay as the unit's measured history, their status lines now annotated DISCHARGED (marked, not rewritten).**

**⟶ LEDGER ROW (`U-REALDOM-BOOT`), and the moved `C1` provenance row — one table, two rows, so the ledger reads in one place:**

| Unit | Wave | Red → green (RUN, per cycle) | Landing | Adversarial / blind greens / review | Legs (all run on the FINAL tree) |
| --- | --- | --- | --- | --- | --- |
| **`U-REALDOM-BOOT`** — the **`npm run ui`** real-DOM measurement leg (`docs/specs/ci-ui-leg.md`, filed + SIX amendment blocks), the **ONE additive production seam** (`--provident-user-data=<path>` argv scan + `app.setPath('userData', …)` above the store reads in `src/main/main.ts`; **absent ⇒ no call, today's behaviour byte-for-byte**), and the shared Electron-spawn helper `scripts/electron-spawn.mjs`. **The unit is COMPLETE on every leg its spec declares.** | **C** (`C1`, A-d8) | **`20` red / `7` pass → `68/68`** (`tests/ui-leg-contract.test.ts` **`59`** rows = `18` non-`RT` + **`41`** `RT`, plus `tests/ui-leg-seam.test.ts` **`9`**). Later red-first cycles: the **retry clause set** (`39` rows — **red-first order INVERTED, recorded honestly at the spec's `B3-MS-2`**; falsifiability established by a **`32`-mutation out-of-tree matrix**), the **timeout re-point** (**`3` red → green**: `RT-4c`, `RT-1e`, `RT-7f`) and the **`F-1` fix** (which ADDED `RT-0a`/`RT-0b`). | **Landed:** `scripts/electron-ui.mjs` (the leg) + `scripts/electron-spawn.mjs` (the shared helper, imported by both legs) + **`package.json`'s `ui` key** (the **TWELFTH** script key — the pre-unit block held eleven; the delta is the contract) + the **ONE** `src/main/main.ts` seam + the unit's two test files. **Diff scope did not widen**; the divergence leg's vector/`N = 9` untouched. | **ADVERSARIAL PASS: LANDED, CITED, AND ITS HOST FINDINGS FIXED — the record is `docs/specs/ci-ui-leg.md` §3a/§3b (the EIGHTH pass's **ADVERSARIAL PASS RECORD** `AP-1`…`AP-5` + the landed findings table `F-0`, `G-1`…`G-13`), NOT an `OWED` record: `OWED` is SPENT (the pass ran read-only, swept **all 14 seeds `U-1`…`U-14`** with **none obsolete**, and returned verdict **`FIT for its DONE row`** — no security escalation, no fabricated-measurement path, no retry that masks a failure, **no PACKAGE defect ⇒ no `docs/HANDOFF.md` round owed**, `M-46` NOT moved off `UNMEASURABLE`). *(**⟶ `G-4` CLOSED 2026-09-27** by the TestWriter's fix pass — the last open routed item; the unit's set is **`77/77`** on a **`58`/`872`/`2`/`0`** suite; the cell's `68/68` form describes the landing pass — see the `## ⟶ COUNT RECONCILIATION` block.)* **DISPOSITIONS: FIXED `G-1`/`G-2`/`G-3`/`G-6`/`G-7`/`G-13`(`scripts/**` half); ROUTED, STILL OPEN `G-4` (TestWriter); PARKED with revisit conditions `G-6`'s residual case / `G-8` / `G-9` (`docs/pending.md` §F); TRACKER-ONLY `G-5`/`G-10`/`G-11`/`G-12`; REPORTED, NOT REWRITTEN `G-13`'s §4.2 `ADD-3` + `src/main/main.ts:58-62` halves.** **`G-1` (MED, headline) FIXED:** the leg takes its **OWN `DISPLAY` observation before the precondition spawns** and the divergence-child spawn **no longer injects `DISPLAY || ':0'`** — §3.1's DECISION order unchanged, so **`PRE-1`/`PRE-3`/`RT-8` item 2 intact**, with the red-precondition branch printing a **`G-1` diagnostic note (diagnostic only)**. **`G-1` NAMED RESIDUAL (owner: the divergence leg's `PRE-4` / `U-DIVERGENCE-EXT`):** a **display-less host with NO X server still exits `2`**, because the **pinned** divergence leg manufactures `:0` for its own child (`scripts/electron-divergence.mjs`) — **not this unit's to edit**; parked at `docs/pending.md` §F. **`G-2`/`G-3` FIXED:** `R0`(c) now **OBSERVES** the operator profile read-only (existence + per-store presence/mtime/size, never contents) before/after; `R4`'s executed row **scans the leg's CODE comment-aware for the call-site SET** (`app.isPackaged`, `webContents.executeJavaScript`, `webContents.debugger`) and prints exactly what it checks (both falsified out of tree). **`G-6`:** the TDZ-unsafe guard is gone (`activeBoot`/`cleanupReported` declared before the exit hook). **`G-7`:** the leg prints the **effective** per-boot ceiling with its derivation + the unbounded-above knob note. **POST-FIX VERIFICATION:** `npm run ui` **exit 0**, **`11/11`**, **`427x22`**, **`retries=0`**, **`leftover profiles: NONE`**, `ls -d /tmp/provident-ui-run-*` **empty**; **`0` roots on every exit path**; unit **`68/68`**; `npm test` **58 / 863 / 2 skipped / 0 failed**; typecheck + build **clean**; battery **`184/0`**; divergence **`R13 RESULT: 9 checks, 0 failures`** (UNCHANGED); raised-timeout run prints **`181750 ms for THIS configuration`**. **No row converted to a pass, no seed retired, no `NBR-*` re-dispositioned.** The two rules are ACTIVE at `docs/decisions.md`; the host rows are CLOSED at `docs/defects.md`; the full dated note is the `⟶ ADVERSARIAL-FIX PASS` block above this table. |ass, 2026-09-27, all measured):** **FIXED — `G-1`, `G-2`, `G-3`, `G-6`, `G-7`, `G-13`** · **ROUTED — `G-4`** (TestWriter, `tests/**`) · **PARKED with revisit conditions — `G-6`'s residual case, `G-8`, `G-9`** (`docs/pending.md` §F) · **TRACKER-ONLY — `G-5`, `G-10`, `G-11`, `G-12`**. **`G-1` (MED, the headline finding) IS FIXED** — the leg now takes its **OWN observation of the operator's `DISPLAY` BEFORE the precondition spawns anything** and the **divergence-child spawn no longer injects `DISPLAY || ':0'`**, so the precondition cannot manufacture a display the operator lacks; §3.1's DECISION order (precondition → display) is unchanged, so **`PRE-1`/`PRE-3`/`RT-8` item 2 are intact** and the red-precondition branch prints a **`G-1` diagnostic note (diagnostic only — no exit code, no verdict moves)**. **`G-1` MEASURED:** on THIS host (a real X server answers at `:0`) `env -u DISPLAY npm run ui` exits **`3` both before and after** (the recorded defect expected `2` — it did **not** reproduce here, because the manufactured `:0` is live); **the 2-vs-3 regime needs a host with NO X server at all, and that was reproduced separately** — `ELECTRON_RUN_AS_NODE=1` ⇒ red precondition ⇒ **exit `2`**, `PRECONDITION-FAILED`, the `G-1` note, `NO MEASUREMENT TAKEN`, **0 roots**. **`G-2` FIXED** — `R0`(c) now OBSERVES what it prints: a read-only operator-profile witness (directory existence + each store's presence/mtime/size, **never contents**), captured **before** the precondition and compared after, printed in the row; falsified out of tree (real run `unchanged:true`; a simulated write ⇒ mtime change; a simulated creation ⇒ presence `false→true`). **`G-3` FIXED** — `R4`'s executed row now scans the leg's CODE (comment-aware) for the honest-limits **call-site set** (`app.isPackaged`, `webContents.executeJavaScript`, `webContents.debugger`) instead of phrases, and prints exactly what it checks; falsified (real source ⇒ **0** sites; a comment naming a site ⇒ **0**, no false red; a real call site ⇒ **1**, row fails; the `HONEST_LIMITS` prose word "packaged" ⇒ still **0**). **`G-6` FIXED** — the TDZ-unsafe `typeof activeBoot !== 'undefined'` guard is gone: `activeBoot` and `cleanupReported` are declared **BEFORE** the exit hook, so the hook cannot abort before `recordCleanup()`. **`G-7` FIXED** — the leg prints the **effective** per-boot ceiling for the current configuration **with its derivation**, states the timeout knob is **unbounded above**, and adds a note when the config differs from the pinned default. **`G-13` FIXED (its `scripts/**` third)** — the stale `scripts/**` comments are corrected (the `cleanupScratch` "PROCESS GROUP" docstring, the precondition-ordering comment, the divergence-leg comment). **`G-13`'s report half NOT fixed, owners named:** the spec's §4.2 `ADD-3` *"before `app.whenReady()` resolves"* sentence (owner: contract-text / a ruling) and the same imprecision at `src/main/main.ts:58-62` (owner: the host seam) — both **reported in §3b, not rewritten**. **`G-4` ROUTED, THE ONE OPEN ROUTED ITEM** (`tests/**`): the Node rows survived a revert of the behaviour they pin and the `R1` row matched the **STRUCK** `typeof window` marker — routed to the TestWriter, **still open at this pass's close**. **`G-1`'s NAMED RESIDUAL, with its owner:** a **display-less host with no X server still exits `2`**, because the **PINNED** divergence leg manufactures `:0` for **its own** child (`scripts/electron-divergence.mjs`, `PRE-4` — **not this unit's to edit**); owner **the divergence leg's `PRE-4` / `U-DIVERGENCE-EXT`** — parked at `docs/pending.md` §F with its revisit condition. **POST-FIX VERIFICATION (implementer-measured):** `npm run ui` **exit 0**, **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, measurement **`427x22`**, **`retries=0`**, **`leftover profiles: NONE`**, `ls -d /tmp/provident-ui-run-*` **empty**; **exit-path matrix: `0` roots in EVERY case** (green exit `0`; `PROVIDENT_UI_BOOT_ATTEMPTS=abc` exit `1`; `PROVIDENT_UI_BOOT_TIMEOUT_MS=30` exit `1` exhaustion; the `200 ms` regime is the host's own borderline `RK-14` handshake — one run retried green (`RT-6 RETRY GREEN`, A `retries=2`, B `retries=1`), one exhausted, **both `0` roots**); the raised-timeout run prints **`181750 ms for THIS configuration`**; unit rows **`68/68`**; `npm test` **58 files / 863 passed / 2 skipped / 0 failed**; typecheck **clean**; build **clean**; battery **184/0**; `npm run divergence` **`R13 RESULT: 9 checks, 0 failures`** (UNCHANGED). **No row was converted to a pass by the fixes, no seed was retired, and no `NBR-*` row was re-dispositioned.**electron` processes, immediate and after an **8 s settle**). Both **CLOSED host-side** in `docs/defects.md` — **no `docs/HANDOFF.md` round owed**. **BLIND GREENS: `32` ids = `24` PASS / `4` FAIL / `4` NOT-BLIND-RUNNABLE** (as-filed `26/16/4/6` corrected in the greens file's §3 `CORRECTION NOTE`, old form kept marked): the four FAILs were **all REAL defects, all now FIXED** (`R0-04` → `F-1` · `RT-05` → the race · `RT-06` → **`121 750 ms`** re-pin · `RT-08` → the knobs recorded); the **6 `NBR-*` rows ALL CLOSED by the live battery**. **DOC REVIEW RUN:** `archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md` (findings landed in the trackers; also corrected the greens ledger + ~30 stale line anchors). | `npm test` `[T]` **58 files / 863 passed / 2 skipped / 0 failed** · `npm run typecheck` **clean** · `npm run build` **clean (5 bundles)** · `npm run battery` `[B]` **184 checks / 0 failures** · `npm run divergence` `[A]` **`R13 RESULT: 9 checks, 0 failures`** (`N = 9` intact) · **`npm run ui` `[U]` exit `0`, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, the ONE measurement **`427x22`** at **`fontSize="16px"`** over `provident.get_rendered_html`, **`retries=0`**; **LIVE BATTERY RUN** (real retry · real exhaustion exit `1` · red precondition exit `2` · DISPLAY absence exit `3`; exits `{0,1,2,3}`, no fifth code). **LAYER: `[T]` + `[U]` + `[B]`/`[A]` only where invoked — a real renderer with a profile-scoped store and ONE measurement, NO rendered geometry, NO IPC behaviour, NO attribute row (`M-46` stays `UNMEASURABLE`); a green divergence leg is structural-surfaces-only.** |
| **`C1` — MOVED TO DONE (2026-09-27)** | C | The **`U-REALDOM-BOOT`** row that stood here MOVED, not deleted — it is the **`U-REALDOM-BOOT` DONE record directly above** (the ledger's **THIRD** `DONE` row), which is the ONE authoritative cell; the row above is that record's own ledger row. | *(spec — unchanged)* `docs/specs/ci-ui-leg.md` (FILED + amended through block 7) + `docs/specs/ci-ui-leg-greens.md` (**`32` ids = `24` PASS / `4` FAIL / `4` NOT-BLIND-RUNNABLE**) + `docs/specs/ci-ui-leg-live-status.md` (verdict: `R0`–`R4` live-green, `F-1` CLOSED · `F-2` CLOSED) | A-d8 | **SPENT — nothing is blocked on this row.** The spec is FILED, the leg is landed and every declared row is green, both live-battery findings (`F-1`, `F-2`) are CLOSED, and the documentation review has RUN. *(Provenance: the row's `LANDED-GREEN-BUT-NOT-DONE` status and its owed-gate lists are superseded by the record above; the `WAVE-C CHECKPOINT` / `WAVE-C UPDATE` / `WAVE-C UPDATE 2` blocks stay as the unit's measured history with their status lines annotated DISCHARGED. The row is not deleted — this is the same convention rows `A` and `B` used.)* |

**⟶ ADVERSARIAL-FIX PASS (2026-09-27) — the closing note of the `## DONE — U-REALDOM-BOOT` record immediately above; it does NOT rewrite that record.** **What this
pass is:** the documentation half of the adversarial findings' fixes — the spec's §3a/§3b record has
LANDED (`docs/specs/ci-ui-leg.md`, the EIGHTH pass: `AP-1`…`AP-5` + `F-0`/`G-1`…`G-13`) and its
**HOST-side findings are FIXED** in `scripts/**` by the implementer; this pass records those dispositions
in the active trackers and reconciles the adversarial cell above. **The record's own measured history is
untouched: the red→green ledger, the legs, the `F-1`/`F-2` closures, the retry evidence and the live
battery's verdicts all stand exactly as written above; no number in them is re-baselined here.**
**Disposition summary (one line each):** **FIXED** `G-1`/`G-2`/`G-3`/`G-6`/`G-7`/`G-13`(`scripts/**` half)
**and — ⟶ CLOSED 2026-09-27 by the TestWriter's `G-4` fix pass, which was this pass's last open routed
item — `G-4`** (`tests/**`: the rows rebuilt to **extract and RUN** the leg's predicates/producers; **`+9`**
falsifiable rows = `7` contract / `2` seam; the unit's set **`77/77`**; a **`15`-mutation out-of-tree matrix**
showing **each strengthened row reddens**; the suite **58 files / 872 passed / 2 skipped / 0 failed** — the as-filed
"ROUTED, STILL OPEN" reading is kept HERE, marked spent, rather than rewritten) ·
**PARKED with revisit conditions** `G-6`'s
residual case / `G-8` / `G-9` (`docs/pending.md` §F) · **TRACKER-ONLY (no code change owed)** `G-5` /
`G-10` / `G-11` / `G-12` · **REPORTED, NOT REWRITTEN** `G-13`'s two non-`scripts/**` halves (§4.2 `ADD-3`'s
sentence — owner: contract text, a clause correction is a ruling; and `src/main/main.ts:58-62` — owner: the
host seam). **The named residual:** the **`G-1` regime on a display-less host with no X server** (⇒ exit
`2`, because the **pinned** divergence leg manufactures `:0` for its own child — `scripts/electron-divergence.mjs`,
`PRE-4`) — **owner: the divergence leg's `PRE-4` / `U-DIVERGENCE-EXT`**, parked at `docs/pending.md` §F.
**The host rows:** `G-1`/`G-2`/`G-3` are filed CLOSED host-side at `docs/defects.md`
(`UI-LEG-DISPLAY-PRECONDITION` + `UI-LEG-EVIDENCE-ROW-OBSERVES-ITS-CLAIM`), **no `docs/HANDOFF.md` round
owed, no upstream issue owed** (the `R13-HOST-FIX` precedent). **The two general rules these fixes
established are ACTIVE at `docs/decisions.md`** (`LEG-ENV-PREREQUISITES-ON-OWN-OBSERVATION` +
`EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`). **Post-fix verification (implementer-measured, on the FINAL
tree):** `npm run ui` **exit 0** · **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five
declared rows R0-R4)`** · measurement **`427x22`** · **`retries=0`** · **`leftover profiles: NONE`** ·
`ls -d /tmp/provident-ui-run-*` **empty** · **exit-path matrix: `0` roots in EVERY case** (green exit `0`;
`PROVIDENT_UI_BOOT_ATTEMPTS=abc` exit `1`; `PROVIDENT_UI_BOOT_TIMEOUT_MS=30` exit `1` exhaustion; the
`200 ms` regime — the host's own borderline `RK-14` handshake — one run retried green (`RT-6 RETRY GREEN`,
A `retries=2`, B `retries=1`), one exhausted, **both `0` roots**) · the raised-timeout run prints
**`181750 ms for THIS configuration`** · unit rows **`68/68`** *(that pass's count — **⟶ `77/77` after the
2026-09-27 `G-4` fix pass**; see the `## ⟶ COUNT RECONCILIATION` block)* · `npm test` **58 files / 863 passed /
2 skipped / 0 failed** · typecheck **clean** · build **clean** · battery **`184/0`** · `npm run divergence`
**`R13 RESULT: 9 checks, 0 failures`** (**UNCHANGED**, `N = 9` intact). **Honest scope:** the fixes converted
**no** row to a pass, retired **no** seed, and re-dispositioned **no** `NBR-*` row; `M-46` stays
`UNMEASURABLE`.

## DONE — `U-MOUNTGUARD` (2026-09-27, the supervisor's DONE pass — the ledger's FOURTH `DONE` row)

**The DONE row's facts, in prose (authoritative — the ledger row below is the same record in row form; cite
this paragraph and the files it names when a viewer truncates the row).** **THE WAVE-D GO-AHEAD WAS GIVEN
(architect, 2026-09-27).** This is recorded here because several older cells still say *"the wave-D go-ahead is
absent"* — **all of them are stale, they are annotated rather than rewritten, and the go-ahead is the fact that
makes wave D's queue live** (`docs/specs/mount-invariant-guard.md`'s filed status block and §0 ruling 6,
`docs/decisions.md`'s `U-MOUNTGUARD` ACTIVE block + amendment notes 19 and 21, and the sibling D-unit specs'
own go-ahead rows). **THE UNIT:** `U-MOUNTGUARD` — wave **D**, `SCH-1`'s **invariant half** (`SCH-1`'s
**region-host half stays DECLINED**, unchanged and not re-merged), the cross-envelope mount
cardinality/identity probe. Its spec is `docs/specs/mount-invariant-guard.md` (**FILED**; the ~1009-line
figure is *the unit's documentation review's own measurement* — this pass's status annotations added lines on
top, so the live file is longer), **now carrying**
the red-set amendment, the **`S-1` host-fix branch**, §3a's `RED-1`…`RED-6`, §3b's `ADV-1`…`ADV-10`
disposition table, and the drive-specific teardown clause, plus its blind record
`docs/specs/mount-invariant-guard-greens.md`. **THE RED — RUN AND REPORTED BEFORE ANY IMPLEMENTATION
(RCA-1), and its outcome decided the unit's shape:** the red set was authored and RUN first (commit
**`aa8b92e`**): **41 rows — 39 red / 2 pass**, the 2 greens being the **harness preconditions**
`PRE-1`/`PRE-2` (**not spec rows**); of the 39 red, **36 were the module-absent class** and **3 were red
AGAINST THE TREE** (`M-14`, `M-11`, `M-12` — the module irrelevant to the failure). **THE UNIT'S HEADLINE
OUTCOME: the red run HIT the spec's own stop condition `S-1`** — *"the cycle-2 count is 2"* — and the measured
fact was stronger than the condition's wording: **one `loadEnvelope` into one mount left TWO engine-emitted
roots** (`{"childCount":2,"count":2,"nodeIds":["node-234","node-246"]}`) on a `Runtime` that was **constructed
but never `bootstrap()`ed**, with the non-placement attribution run reproducing `count 2`. **So the unit's shape
became the HOST-FIX BRANCH (`§6` outcome (b)):** the probe module **`src/shared/mount-invariant-guard.ts`**
(NEW — **four exports, two functions**), **plus a host fix in `src/renderer/runtime.ts`** (`reconcileMount()`
called from `resetRenderState()`; the previous root is detached **by reference**), with the probe as the
acceptance evidence — **the live boot path is byte-identical and never reaches the sequence** (the
construct-then-load drive is the reachable one; `src/renderer/renderer.ts` `bootstrap()`s before any load).
**THE GREEN, on the FINAL tree:** `tests/mount-invariant-guard.test.ts` is **44 rows — ALL GREEN** (`42` spec
rows + `2` harness preconditions; `M-17`/`M-18`/`M-19` appended after the adversarial pass), and the suite is
**`59` files / `916` passed / `2` skipped / `0` failed**. **THE ADVERSARIAL PASS (RCA-3) RAN and found the
fix's own evidence MISSING** — the spec and the decision log named `M-17`/`M-18` as the regression rows the host
fix must turn green **while no such rows existed**, so reverting the fix left **40 of 41 rows green**. **That
hole is CLOSED:** the rows now exist, `M-14`'s non-placement observation is an **assertion** rather than an
interpolation into a failure message, and an **out-of-tree mirror with the fix reverted reddens exactly `5`
rows** — `M-17`, `M-18`, `M-14`'s attribution half, and the **two blind teardown rows** — while every
pre-existing row stays green. Its other findings are §3b's advisory rows with owners: the reconciler is **not
total** (`ADV-2`), the **one-runtime-per-mount** precondition (`ADV-3`), the probe **refuses a real-DOM mount**
so the optional `[U]` row **cannot be taken** (`ADV-4`), two unguarded property GETs (`ADV-5`), the unanchored
serialization fallback (`ADV-6`), the unpinned blank `rootNodeId` (`ADV-7`), and two stale comments
(`ADV-10`). **THE BLIND GREENS (gate 5, item 10a):** `docs/specs/mount-invariant-guard-greens.md` — **`56` rows:
`48` PASS / `2` FAIL / `6` NOT-BLIND-RUNNABLE**; **both FAILs were the same teardown-drive finding the
adversarial pass also found, and both are resolved by PINNING** (verdicts kept verbatim, never converted). The
blind run **independently verified the defect fix at the raw tree layer** — one root on all four re-derivation
paths, and `RED-1`'s two roots **no longer reproduce**. **THE SECOND CONTRACT FINDING, NOW PINNED (the
teardown claim is DRIVE-SPECIFIC):** on a **bootstrapped** runtime `teardown()` leaves the mount **empty**
(`inTree === 1`); on a **never-bootstrapped** runtime the **FIRST** `teardown()` leaves **ONE** mounted root
(the graph's **live in-tree root**) and later cycles leave **0** — pinned as §3.1 **`M-19`**, with the spec,
`docs/specs/runtime-host.md` and the decisions row now saying so. **THE DOC REVIEW (gate 8, item 10d/RCA-6) HAS
RUN:** `archive/reviews/2026-09-27-U-MOUNTGUARD-doc-review.md` — it fixed **one genuine code/doc drift** (the
result's **seventh** field `expectedRootNodeId?` was undocumented) and **two count/arithmetic residues**, and
reconciled the trackers. **THE LEGS, all on the FINAL tree, each with its layer label:**
`npm test` `[T]` **`59` files / `916` passed / `2` skipped / `0` failed** · `npm run typecheck`
**clean (exit 0)** · `npm run build` **clean, 5 bundles (exit 0)** · `npm run battery` `[B]` **`184` checks /
`0` failures** · `npm run divergence` `[A]` **`R13 RESULT: 9 checks, 0 failures`** (**`N = 9` unmoved**); the
blind run also observed **`npm run ui`** `[U]` green (**`11/11`**, **`427x22`**). **LAYER ATTRIBUTION (state
it, so no row here is over-read):** the unit's evidence is **`[T]`/`[H]`** (the shim tree + the host) — **no
real-DOM row was taken** (`ADV-4` is why); **a node-suite green is NEVER assembled-app evidence**; **a green
`divergence` leg is STRUCTURAL-SURFACES-ONLY, never IPC-layer** (`LIVE-OP-REJECT`'s lesson); and **the module
is imported by NO `src/**` file** — it is the **regression instrument, not a guard the application runs**.
**STILL OWED, ALL NON-BLOCKING AND RECORDED:** §3b's **`OWED-with-owner`** (`ADV-4`, `ADV-7`) and
**`PARKED-with-revisit-condition`** rows (`ADV-2`, `ADV-3`, with their preconditions), and the host comment
**`src/renderer/runtime.ts:559`** (*"Idempotent"*) **which still repeats the unconditional teardown form**
(`ADV-10`; a docs-only pass may not edit `src/**`). **COMMITS: `aa8b92e` … `1b7d1ca`** (red → green →
adversarial/blind → doc review → this DONE pass). **NO upstream handoff:** the finding is **HOST-owned**, so
**no `docs/defects.md` row and no `docs/HANDOFF.md` round is owed** (the `R13-HOST-FIX` precedent, which this
spec restates as its own honest statement). **This is the ledger's FOURTH `DONE` row. It supersedes `## OPEN`
row `D1` (moved out of the table into this record — the row is NOT deleted; `RCA-8(f)`: no successor row is
added, because the wave-D queue continues at `D2`, which stood next in the order).**

**⟶ LEDGER ROW (`U-MOUNTGUARD`) — and the moved `D1` provenance row, one table, two rows, so the ledger reads
in one place:**

| Unit | Wave | Red → green (RUN, per cycle) | Landing | Adversarial / blind greens / review | Legs (all run on the FINAL tree) |
| --- | --- | --- | --- | --- | --- |
| **`U-MOUNTGUARD`** — the cross-envelope mount cardinality/identity probe (`SCH-1`'s invariant half; the region-host half **stays DECLINED**), `docs/specs/mount-invariant-guard.md` (**FILED** + the red-set amendment + §3a `RED-1`…`RED-6` + §3b `ADV-1`…`ADV-10` + the drive-specific teardown clause). **The unit is COMPLETE on every leg its spec declares.** | **D** (`D1`) | **RUN and REPORTED before any implementation (RCA-1): `41` rows — `39` red / `2` pass, commit `aa8b92e`** (`36` module-absent + `3` red **against the tree**: `M-14`, `M-11`, `M-12`; the `2` greens are the harness preconditions `PRE-1`/`PRE-2`, **not spec rows**). **The red run HIT the spec's own stop condition `S-1`** — one `loadEnvelope` into a never-`bootstrap()`ed mount left **TWO** engine-emitted roots (`{"childCount":2,"count":2,"nodeIds":["node-234","node-246"]}`; the non-placement attribution run reproduces `count 2`) — **so the shape is the HOST-FIX BRANCH**. **GREEN: `44` rows, ALL GREEN** (`42` spec rows + `2` harness preconditions; `M-17`/`M-18`/`M-19` appended after the adversarial pass). | **NEW `src/shared/mount-invariant-guard.ts`** (four exports, two functions) **+ the HOST FIX `reconcileMount()` in `src/renderer/runtime.ts`** (called from `resetRenderState()`; the previous root is detached **by reference**; **the live boot path is byte-identical and never reaches the sequence**) **+ `tests/mount-invariant-guard.test.ts`**. No shim change, no MCP surface, no `scripts/**`, no `package.json` change. | **ADVERSARIAL PASS: RAN** — it found the fix's own evidence **MISSING** (the spec/decisions named `M-17`/`M-18` as the regression rows while no such rows existed; reverting the fix left **`40` of `41` rows green**) and that hole is **CLOSED**: the rows now exist, `M-14`'s non-placement observation is an **assertion**, and an **out-of-tree mirror with the fix reverted reddens exactly `5` rows** (`M-17`, `M-18`, `M-14`'s attribution half, the **two blind teardown rows**) while every pre-existing row stays green. Other findings = §3b's advisory rows with owners (`ADV-1`…`ADV-10`): reconciler not total · one-runtime-per-mount precondition · **probe refuses a real-DOM mount** (so the optional `[U]` row **cannot be taken**) · two unguarded property GETs · unanchored serialization fallback · unpinned blank `rootNodeId` · two stale comments. **BLIND GREENS: `docs/specs/mount-invariant-guard-greens.md` — `56` rows: `48` PASS / `2` FAIL / `6` NOT-BLIND-RUNNABLE**; both FAILs are the **teardown-drive** finding (also found by the adversarial pass) and are **resolved by pinning**; the blind run **independently verified the defect fix** at the raw tree layer (one root on all four re-derivation paths; `RED-1`'s two roots no longer reproduce). **SECOND CONTRACT FINDING PINNED:** the teardown claim is **DRIVE-SPECIFIC** (bootstrapped ⇒ empty mount, `inTree === 1`; never-bootstrapped ⇒ the **first** teardown leaves **ONE** mounted root — the graph's live root — and later cycles leave `0`) ⇒ §3.1 **`M-19`** + the spec + `docs/specs/runtime-host.md` + the decisions row. **DOC REVIEW (item 10d/RCA-6): RAN** — `archive/reviews/2026-09-27-U-MOUNTGUARD-doc-review.md`; fixed **one genuine code/doc drift** (the result's **seventh** field `expectedRootNodeId?` was undocumented) + **two count/arithmetic residues**, and reconciled the trackers. **NO `docs/defects.md` row and NO `docs/HANDOFF.md` round is owed** (HOST-owned, the `R13-HOST-FIX` precedent). | `npm test` `[T]` **`59` files / `916` passed / `2` skipped / `0` failed** · `npm run typecheck` **clean (exit 0)** · `npm run build` **clean, 5 bundles (exit 0)** · `npm run battery` `[B]` **`184` checks / `0` failures** · `npm run divergence` `[A]` **`R13 RESULT: 9 checks, 0 failures`** (**`N = 9` unmoved**) · `npm run ui` `[U]` observed green by the blind run (**`11/11`**, **`427x22`**). **LAYER ATTRIBUTION: `[T]`/`[H]` only — no real-DOM row taken; a node-suite green is NEVER assembled-app evidence; a green divergence leg is STRUCTURAL-SURFACES-ONLY; and the module is imported by NO `src/**` file (the regression instrument, not a guard the app runs).** **OWED, non-blocking:** §3b's `OWED-with-owner`/`PARKED` rows + the host comment `src/renderer/runtime.ts:559` (*"Idempotent"*) still repeating the unconditional teardown form. |
| **`D1` — MOVED TO DONE (2026-09-27)** | D | The **`U-MOUNTGUARD`** row that stood here MOVED, not deleted — it is the **`U-MOUNTGUARD` DONE record directly above** (the ledger's **FOURTH** `DONE` row), which is the ONE authoritative cell; the row above is that record's own ledger row. | *(spec — unchanged)* `docs/specs/mount-invariant-guard.md` (**FILED 2026-09-27** — no longer `OWED`) + `docs/specs/mount-invariant-guard-greens.md` (**`56` rows = `48` PASS / `2` FAIL / `6` NOT-BLIND-RUNNABLE**) | `SCH-1` invariant half (region host **stays DECLINED**) | **SPENT — nothing is blocked on this row.** The spec is FILED, the red set ran (it hit its own stop condition `S-1`), the host fix `reconcileMount()` landed with its regression rows `M-17`/`M-18`, `M-19` pins the never-bootstrapped teardown drive, the unit's file is **`44` rows all green**, the blind + doc-review gates have RUN, and **the unit is `DONE` on every leg its spec declares**. *(Provenance, kept so the moved row stays visible per the convention rows `A`, `B` and `C1` used: it read `docs/specs/mount-invariant-guard.md` (**`OWED — not filed`**) with `Blocked on` = `BLOCKED` + spec + `TestWriter red`, and its later reading was `BLOCKED` on the wave-D go-ahead — **the go-ahead WAS GIVEN (2026-09-27)**. `RCA-8(f)`: no successor row is added — the wave-D queue continues at `D2`, which stood next in the order.)* |

## WAVE-B MEASUREMENT CHECKPOINT — `U-ENGINE-DRIFT` (2026-09-27): the measurement record landed **and was reconciled in its own 2026-09-27 correction pass**

> **⟶ SUPERSEDED BY THE `U-ENGINE-DRIFT` DONE PASS (2026-09-27) — read it as history, not as live
> status.** The unit **IS `DONE`** on every leg its spec declares; **the record is the `U-ENGINE-DRIFT`
> DONE record immediately above.** This block's own status lines (*"`U-ENGINE-DRIFT` is NOT marked
> `DONE` by this pass"*, *"the unit is NOT `DONE`"*, *"`U-ENGINE-DRIFT`'s DONE row remains owed to the
> supervisor/architect"*) and **its `## OPEN` row-B pointer** are consequently **superseded**: row **B
> has MOVED into that DONE record** (not deleted), and the **one remaining item it recorded — the
> `docs/specs/engine-drift.md` §3.6 *"`DRIFTED` count of zero"* clause-level tension — was CLOSED by
> the architect's `A-d3` clause-level adjudication** (§3.6 restated as **"no drift requiring CODE"**;
> see the DONE record's own text). Everything else in this block
> (the final tally and its arithmetic, `W-1`'s resolution, the red, the two `DRIFTED` dispositions, the
> adversarial verdict, and what wave C inherits) **stands and is not restated above.**


**Unit / wave / status:** `U-ENGINE-DRIFT` · wave **B** · **⟶ SUPERSEDED BY THE DONE PASS
(2026-09-27): the unit IS `DONE` — the record is the `U-ENGINE-DRIFT` DONE record above, and row `B`
has MOVED into it.** *(As this block read: **MEASURED — the record, its reconciliation and both
`DRIFTED` rows' tracker halves have LANDED; the unit is NOT `DONE`**, and this pass does not mark it
so. **The one clause-level tension it recorded for the architect:** `docs/specs/engine-drift.md`
§3.6's "no-drift" zero-code shape required *"a `DRIFTED` **count of zero**"* **literally**, while this
unit is a **two-drift, zero-code** outcome — both `DRIFTED` rows are inside **§3.6 item 5**'s
annotate-only case (a `DRIFTED` `UNDO-REDO-DESTROY-STATUS` observation *"annotates the existing
row"*: **no new row owed, no host change owed**) — under §0 **ruling 3**. **⟶ THAT TENSION WAS
ADJUDICATED (2026-09-27, the `A-d3` clause amendment, `docs/specs/engine-drift.md`): §3.6's "no-drift"
is restated as "NO DRIFT REQUIRING CODE" and the literal count clause is superseded in place** (see
the DONE record above). The record's own tally
ledger **has now been reconciled** (see the `RECORD STATE` block below), so the earlier ledger
discrepancy was **no longer** an open gate. **Nothing here is `DONE` by implication** — the DONE row
is the supervisor/architect's, and **it is written above**.)*

**RECORD STATE (the FINAL tally — re-read after the parallel correction pass, because the record was
being corrected while this pass ran).** Path **`docs/specs/engine-drift-measurements.md`** (the spec
at `docs/specs/engine-drift.md` §3.0 chose that separate file; the record **outlives the unit** and is
the citable artifact the next waves re-run against). **The measurement pass is dated 2026-09-27; the
record carries a correction pass dated 2026-09-27** *(the date-correction pass normalized this from a withdrawn `2026-09-28` stamp; see the record's date-normalization note)* (its own line: a re-read/correction of the same
tree, **no leg re-run**, re-opening `M-11`, `M-22`, `M-25`, `M-30`/`M-57`, `M-31`, `M-40`, `M-41`,
`M-45`, `M-53`, `M-54` **and the header arithmetic**). **FINAL tally, as the corrected record states
it in one ledger:** **`N = 57`** rows (`M-1`…`M-57`) = **`47` `CONSISTENT`** + **`2` `DRIFTED`**
(**`M-14`**, **`M-31`** — unchanged by the correction) + **`7` `UNMEASURABLE`** (`M-25`, `M-38`,
`M-46`, `M-49`, `M-50`, `M-51`, **`M-57`**) + **`1` `INVALID`** (`M-52`, kept in place, replaced by
`M-56`); `47 + 2 + 7 + 1 = 57 = N`. **Why `N` GREW from 56 to 57, and why that is correct:** the
correction pass **SPLIT `M-30`** — §3.2's own handling for an un-carryable claim is *"Split the
row"* — so the **measured half keeps the id `M-30`** (it is what §3.3 names) and the **un-carryable
store→IPC→renderer hop is the NEW row `M-57`** (`UNMEASURABLE`, with its own revisit condition);
§3.1 column 1 forbids **reusing or renumbering** an id, **not** adding one. **`M-40` also moved
`UNMEASURABLE` → `CONSISTENT`** (re-taken on the permitted recipe already in the tree), which is why
`c` is **7** and `a` is **47**. **FINDING `W-1` — TWO INCOMPATIBLE LEDGERS — is RESOLVED, and this
block records the resolution rather than the discrepancy:** before the correction pass, the record's
header (`45 + 2 + 8 + 1 = 56`) and its foot's "Honesty statements" item 1 (`44 + 2 + 9 + 1 = 56`)
disagreed on the `CONSISTENT`/`UNMEASURABLE` split (they summed to the same `N`, so the arithmetic
closed while the ledger identity did not — a review finding under `docs/specs/engine-drift.md` §3.1).
**That is now fixed IN the record by the pass that owns it:** both pre-correction ledgers are
**superseded**, every verdict cell was **re-enumerated by hand** (not read off either ledger and not
trusted from the header), the foot quotes the header's arithmetic and no other, and **the record
carries no second ledger.** **`W-1` therefore no longer blocks the DONE ruling**; **the DONE ruling
itself is written above — and the one item this block recorded as outstanding for it (the §3.6
clause-level tension) was CLOSED by the `A-d3` clause-level adjudication: `docs/specs/engine-drift.md`
restates §3.6's "no-drift" as "NO DRIFT REQUIRING CODE", supersedes the literal *"`DRIFTED` count of
zero"* clause in place, reconciles §3.5's `DRIFTED` obliges cell + §5.4a's routing table to it, adds
§3.7's `F-9` fail-state, and requires §5.4's DONE row to state the drift count and each row's
disposition** (both of this record's `DRIFTED` rows are the claim/count/tracker-owned class the
amended clause makes zero-code-landable). *(The raw pass took no vote between the two ledgers while
they were incompatible — it recorded the discrepancy as a finding instead — and the pre-correction
`45/8` and `44/9` readings are both **superseded and must not be quoted**.)*

**THE RED — `0` FAILED, and that is the honest "no-drift red".** The unit's red is the **existing
suite under the moved pin, as RUN and REPORTED** (ruling 4; not a new test file): **`56 files /
795 passed / 2 skipped / 0 failed`** — **NOT ONE ROW RED, so there is no failure output to quote
and none attributable to the pin move** (the `2 skipped` are the suite's pre-existing skips). The
other four legs: **typecheck clean (exit 0) · build clean, 5 bundles (exit 0) · battery `184
checks / 0 failures` (exit 0) · divergence `R13 RESULT: 9 checks, 0 failures` (exit 0)**. **So the
unit lands as its spec's ruling 3 authorises — a `MEASUREMENT RECORD` with ZERO production code
and ZERO new tests**, its only authored artifact being the record itself: **the outcome the
architect authorised** (`docs/specs/engine-drift.md` §0 ruling 3 + the `docs/next-steps.md` `Q1`
answer, which named measurement-only as an acceptable outcome for this unit).

**THE TWO `DRIFTED` FINDINGS, WITH THEIR DISPOSITIONS (both tracker halves landed this pass —
the record itself may not write trackers, `docs/specs/engine-drift.md` §5.1).**

1. **`M-14` — the raw tool-ish string census claim (`23`) is UNREPRODUCIBLE; the census class is
   RETIRED.** Measured on the drift pass's **own** `npm run build` of `dist/main/main.cjs`:
   **`24` normalized / `29` raw**, the delta being exactly one name — **`module.fetch`**, whose only
   bundle occurrence is the **error-message literal** `module.fetch: network is deferred (M-r12)`
   (`src/renderer/extensions.ts:132`). **`ALL_TOOLS = 21` is EXACT and not in question.** The
   adversarial pass named the fault precisely: **the count claim was never precise enough to
   hold** (no regex, no prefix filter, no normalization stated; its own enumeration leaves one
   `module.*` unexplained). **Disposition: retire the whole-bundle raw string census as an evidence
   class** — the count authority is **`ALL_TOOLS` set-equality (`R-15`) + the `RpcMethod` census
   `R-15b`**, because **a census that counts error-message literals cannot detect a tool-set
   change**. **Gate: no code change.** Landed: the greens file's `G-06b`/`F-6` (+ the §3a `F-6`
   correction block) with the old `23` marked **SUPERSEDED** and the `21` half left standing,
   `docs/specs/engine-drift.md` §3.3.3 `M-14` + §8 restatements (marked SUPERSEDED, **no normative
   clause amended**), `docs/pending.md` §C `ALL-TOOLS-CENSUS-CLAIM`, and
   **`docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`.**
2. **`M-31` — the `UNDO-REDO-DESTROY-STATUS` row was stale on BOTH its status and its root
   cause.** Measured at the **installed `provident-ssr@0.5.1`**: the destroy-undo reports
   **`status:"no-op"`** (empty `scheduledDirtied`, `baseBoundary:false`, the graph unchanged,
   target-list lengths `[7,7]`) — the **behaviour** half of the claim holds, the **reported status**
   does not; the claimed *"falls through to `report('applied', …)`"* mechanism is **unreachable**,
   because the **resolve guard** returns first (`dist/core/supervisor.js:1536-1538`, since `destroy`
   deleted the node at `:1066`), leaving the `destroy` branch (`:1549-1551`) and the `:1649`
   fall-through dead for a destroy entry (adjacent upstream source agrees:
   `../Preempt-Providence/src/core/supervisor.ts:1597-1598` vs `:1608-1609`, `:1696`). **So the
   silent-`applied` false-success is NOT REPRODUCIBLE at `0.5.1` by any route.** **Disposition
   applied: `CLOSED as delivered-by-the-resolve-guard`** (`docs/defects.md`'s new
   `## CLOSED (not reproducible at 0.5.1)` section — the row's as-filed text retained verbatim with
   the corrected root cause and a **FLIP NOTE** so the architect can switch it to *"OPEN — upstream
   dead-code cleanup only"* by changing one heading); the residue is **(i)** the now-dead `destroy`
   branch + the unreachable `:1649` fall-through and **(ii)** the stale in-tree comment
   **`tests/journal-endpoint.test.ts:116-118` — routed as a NOTE, NOT edited** (test file; its
   assertions are correct). Landed: `docs/pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS` (status +
   mechanism corrected), **`docs/HANDOFF.md` Round 9** (the upstream-facing copy — now states the
   false-success is not reproducible at `0.5.1` and that the remaining ask is an optional dead-code
   tidy-up, with **no new round owed**), `docs/defects.md`, `docs/FORKER.md` (its `J4` digest
   bullet), `docs/specs/engine-drift.md` §3.3.5 `M-31` + §8, and **`docs/decisions.md`
   `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`.** **No assertion was edited to match any
   measurement** (stop condition 7 did not fire); **no `node_modules/**` or upstream file was
   touched.**

**THE ADVERSARIAL PASS — verdict on the record AS FILED: `NOT DONE-ELIGIBLE`, with exactly two
blocking findings; both are fixed.** The adversarial review (2026-09-27) ruled the record **not
ready to be reported `DONE` as filed**, on the **two blocking findings** above and nothing else:
**`B-1`** — the `M-14` claim half was not precise enough to hold (a count-of-strings carried as a
tool-set count); **`B-2`** — the `M-31` package row was stale on its status **and** its mechanism,
so a live tracker carried a cause that cannot fire. **What fixed them:** `B-1` → the **census-class
retirement** + the greens/`engine-drift` restatement corrections + the count authority moving to
`R-15`/`R-15b` (no code); `B-2` → the **measured `no-op` at `0.5.1`**, the **corrected resolve-guard
root cause**, the **disposition move** and the tracker/HANDOFF corrections (no code, no test edit).
**Both are recorded in `docs/specs/engine-drift.md` §3a's status note with `§3b` annotated
superseded** (status notes only — **no normative clause of that contract was amended**). **The
pass's further finding (`W-1`, this block): the record's own two tally ledgers disagreed** — it was
**not** one of the two blocking findings on the record's *claims*, but it **was** the second reason
the DONE ruling stayed open; **it has since been RESOLVED in the record by the 2026-09-27 correction
pass** (single ledger, all 57 verdict cells re-enumerated, `M-30` split into `M-57`, no row id reused
or renumbered — see `RECORD STATE` above). **⟶ SUPERSEDED (2026-09-27, the DONE pass):** the one
item this block left for the DONE ruling was the §3.6 *"`DRIFTED` count of zero"* clause-level tension
recorded at the top of this block — **and the architect adjudicated it: `docs/specs/engine-drift.md`'s
`A-d3` clause amendment restates §3.6's "no-drift" as "NO DRIFT REQUIRING CODE", supersedes the
literal *"`DRIFTED` count of zero"* clause in place, and makes both of this record's `DRIFTED` rows
(claim/count/tracker-owned routing; no host code, no test change) zero-code-landable.** **The DONE row
is written above and states the count and both dispositions, as §5.4 item 3 now requires.**

**WHAT THE NEXT WAVE INHERITS FROM THE RECORD (both waves-C units are `BLOCKED`; this is inheritance,
not authorisation — the wave-B unit itself is `DONE`).**
- **`U-REALDOM-BOOT` (row `C1`, the `npm run ui` leg)** inherits **`M-46`** (`UNMEASURABLE` — **no
  real-DOM attribute-presence extractor exists**; `H-r10` is owed to `U-DIVERGENCE-EXT`) and
  **`M-42`** (the divergence leg asserts **no** attribute/removal row and its demo authors no
  `inert`/`hidden` prop — the negative evidence). Practical consequence: **the leg's own red rows
  (`R0`–`R4`) are untouched by this record, and no row of the record may be read as real-DOM
  evidence** — `docs/specs/engine-drift.md` §6 stop condition 8 forbids that conversion.
- **`U-DIVERGENCE-EXT` (row `C2`)** inherits **`M-46` as its revisit condition** (the `H-r10`
  **set-wise** attribute-presence extractor — a substring row is a **guaranteed false red**) and
  the record's **`M-48`** re-measurement of the leg's own result line (`R13 RESULT: 9 checks,
  0 failures`, exit 0, **`N = 9` a PIN this unit did not touch**). It also inherits the **landed
  spawn fix** and **must keep `N = 9` intact**.
- **Both** inherit the record's **layer discipline as binding**: envelope greens are **not**
  assembled-app or IPC evidence (anchor 2's `LIVE-OP-REJECT` lesson), a **`no-op` status is now
  engine-truthful for `destroy`** (`M-31`/`M-34`), and **no count of any declared tool set may be
  taken by a whole-bundle literal census again** (`RAW-STRING-CENSUS-RETIRED`) — when
  `U-FOCUS-TOOL` lands, the **same-commit census obligation is `R-15` set-equality + `R-15b` +
  the default-gate subset**, never a bundle census.
- **Also carried forward for whoever runs the next measurement:** the record's `UNMEASURABLE` set
  with its named revisit conditions (`M-49` the historical-output claim — **never convertible to
  evidence in this tree**; `M-38` the boolean-set count; **`M-57`** the `M-30` split's unreachable
  **store→IPC→renderer hop**; `M-46` no real-DOM extractor; `M-25` the raw `UndoRedoReport` on a
  **permitted** surface; `M-50` the `P-TP-1` property — no PBT harness; `M-51` the
  `Supervisor`→`renderProducingProcess` `css.<key>` recipe), and
  the **journal family's honest boundary** (the condense path was **refused by the engine's own size
  guard** on the demo graph, so the `base-boundary` **status was not reached and is not claimed** —
  `M-29`, whose row is `CONSISTENT` on the refusal it measured and which **must not** be read as the
  large-graph leg). **Three correction-pass changes are relevant to a re-run: `M-30` is now SPLIT
  (`M-30` measured `CONSISTENT` / `M-57` unmeasurable), `M-40` moved `UNMEASURABLE` → `CONSISTENT`,
  and the row count is `N = 57`, not 56** — **read the record's rows, not an older snapshot of its
  tally, before quoting any of them.**

**PROCESS RECORD for the checkpoint (so a fresh supervisor can audit it in one read):** the
`U-ENGINE-PIN` **DONE record above is INTACT and is not restated or superseded here** — this block
is **added**, and no row of the wave-A record changed. **`U-ENGINE-DRIFT`'s tracker reconciliation**
landed in the same pass: `docs/decisions.md` (the new `ACTIVE — the U-ENGINE-DRIFT measurement-pass
decision set` block, three rows: `RAW-STRING-CENSUS-RETIRED`,
`UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`, `ENGINE-DRIFT-MEASUREMENT-RECORD`),
`docs/pending.md` (§C `ALL-TOOLS-CENSUS-CLAIM` + the corrected `UPSTREAM-UNDO-REDO-DESTROY-STATUS`
row), `docs/defects.md` (the row moved `## OPEN` → `## CLOSED`, **the `## OPEN` table is now
empty**), `docs/HANDOFF.md` (Round 9 corrected + the trailing note superseded), `docs/FORKER.md`
(the `U-ENGINE-DRIFT` status row + the `J4` bullet), `docs/specs/engine-pin-greens.md` (the
`G-06b`/`F-6` correction + the §3a correction block + the §6 mapping pointer) and
`docs/specs/engine-drift.md` (`M-14`/`M-31`/§8 restatements + `§3a`/`§3b` status notes).
**Unchanged by this pass:** every leg number, the `N = 9` divergence pin, `ALL_TOOLS = 21`,
`RpcMethod = 21`, the `U-ENGINE-PIN` DONE record, `src/**`, `tests/**`, the measurement record,
and the normative clauses of `docs/specs/engine-drift.md`. **`U-ENGINE-DRIFT`'s DONE row remains
owed to the supervisor/architect.** *(**⟶ THIS CELL IS SPENT (2026-09-27, the `U-ENGINE-DRIFT`
DONE pass — already superseded by the `SUPERSEDED BY THE U-ENGINE-DRIFT DONE PASS` note at the top
of this block; restated here in-line by the unit's per-unit documentation review, AGENTS.md item
10d/RCA-6, so a reader arriving at this cell sees it):** the DONE row was **written** — it is the
`## DONE — U-ENGINE-DRIFT` record above — and the unit is `DONE` on every leg its spec declares.
The sentence above is the **pre-DONE-pass** state and must not be read as live.)*

**⟶ ADDENDUM to that process record (2026-09-27, the DONE pass):** **the SpecWriter's clause-level
`A-d3` amendment to `docs/specs/engine-drift.md` LANDED in parallel with this pass and IS the wording
the DONE record follows** — its status-block `### AMENDMENT` section, §3.6 (restated as **"no drift
requiring CODE"**, the literal *"`DRIFTED` count of zero"* clause **struck in place**), §3.5's
`DRIFTED` obliges cell, §3.7's new fail-state **`F-9`**, §5.4 items 3/5/6 (the DONE row must state the
drift count, each `DRIFTED` row's disposition, the layer attribution and the final `c` membership) and
§5.4a's new **claim/count/tracker-owned** routing row. **That file was READ, not written, by this
pass**; the only `docs/specs/engine-drift*.md` writes belong to the parallel pass and the SpecWriter.
**`U-ENGINE-DRIFT`'s DONE row is therefore NO LONGER owed — it is written at the top of this file,
under the amended clause.**

## ⟶ U-PROJ GATE RECORD — IN PROGRESS (2026-09-27; **gate 3 is CLOSED and GREEN, gates 4–7 and the DONE row are OWED** — read this as the live cell for `D4`)

**THE UNIT IS GREEN BUT NOT `DONE`.** Every figure below is a measurement on the current tree; the ledger is still **`6 DONE / 14 open`** and `D4` is still an OPEN row until its record is written.

**(1) Gate 2 (SPEC) — CLOSED (commits `58c7feb`, `629c889`, `0cf8ebd`-series).** `docs/specs/projection.md` (~2,357 lines — **⟶ CENSUS CORRECTED 2026-09-27 (the `U-PROJ` per-unit documentation review, `AGENTS.md` item 10d/RCA-6; record `archive/reviews/2026-09-27-U-PROJ-doc-review.md`, finding **F-06**, LOW-MED; the `~2,357` figure is kept visible): that figure is the gate-5-reconciliation pass's own reading and is STALE — the live count is `2528` lines (this review pass's read). Per the spec's own file-end rule, **cite sections, never lengths** — `§2.1`, `§3.1`–`§3.5`, `§5.5.1`, `§3a`/`§3b`**) carries the gate-11 **`§5.5.1` typed register**: **eight rows** (`P-PJ-IM-1`, `-2`, `-3`, `-5`, `-6`, `-7`, `-8` + `P-PJ-TP-1`), strategies `S-PJ-DECISION-1`/`POOL-1`/`OWNKEY-1`/`ACCESSOR-1`/`NUMERIC-1`/`WRITELOG-1`/`THROW-1`/`REUSE-1`, exhaustive tables plus a pinned-seed draw over a 20-shape pool, **`231` attempts** (`23+60+22+36+52+16+12+10`; the as-filed `239` was a mis-sum, corrected with its per-row terms verified), caps ≤100/row · ≤400 total · stop-after-5, **no new dependency**, the old exemption kept as `§5.5.0`. **All eleven `§7a` ambiguities were RULED** (`§7a.1`) — four rows `CONTRACT-AMENDED` (`M-13`/`F-10`'s coercion boundary, `F-9`'s `ok`, `I-9`'s unfalsifiable `'-'` clause, `F-15`'s `JSON.stringify` recipe replaced by **four named observables**), seven new static rows `R-17`..`R-23` + stop conditions `S-12`..`S-15`, and an export-count reconciliation (`§2.1` says **eleven** names: 4 value + 7 type). **Four further gaps were then PINNED** when the implementer stopped: the **lookup-key rule** (the `specOf` map's own key, read as an OWN property of `values`; `VarSpec.name` is the emitted name only), the **`skipped` order** (projection = spec-entry order; `ApplyResult` = own refusals first, then the carried entries unchanged), **`accessor-threw`'s trigger** (a present own accessor that THROWS on read; a function *value* is `not-a-number`; an absent key is `missing-value`; the module never invokes a caller function), and **`R-17`'s scan scope** (the module half is the whole claim; the file half is limited to the row's own controlled corpora; a word/identifier-boundary rule applies).

**(2) Gate 3 (RED → GREEN) — CLOSED.** **Red RUN and REPORTED first:** `70` rows = **`65` red / `5` pass** (`PRE-1`..`3`, `R-20`, `R-23`); failure classes **57** module-absent boundary assertions + **8** register rows (the register broke its first 5 attempts and **7 of 8 rows never started** — reported as FAILURES, never as passes); suite `62` files / `1111` tests — `1044` passed / `65` failed / `2` skipped. **Then the implementer STOPPED rather than bend code** (`src/shared/layout-projection.ts` landed, 386 lines, exactly the eleven names, zero imports; it turned 18 rows green and re-drove 35 checks clean) because **47 rows were red for TEST-side reasons** — a helper referencing an out-of-scope `p` (31 `ReferenceError`s), an undeclared `spec` helper, a name-vs-**ENTRY** partition contradiction with `F-2`, wrong-lookup fixtures, an unpinned `skipped` order, impossible `accessor-threw` drives, and `R-17` unscannable on its own file. **The test repair pass fixed all of it against the pins** (commits `0de004b`, `8e2c777`). **FINAL GREEN:** unit file **`70/70`** · register **`231/231` attempts held, `0` broken, NOTHING stopped early, `registerStoppedAt: null`, seed `20260927`** · suite **`62` files / `1111` tests — `1109` passed / `0` failed / `2` skipped** · `npm run typecheck` exit 0 (`src/**` only) · `npm run build` exit 0 · standalone strict `tsc` over the test file exit 0.

**(3) OWED — THE REMAINING GATES (each is mandatory before this unit's DONE row; none had run when this cell was written).** **⟶ STATUS 2026-09-27 (the `U-PROJ` per-unit DOCUMENTATION REVIEW, `AGENTS.md` item 10d/RCA-6; record `archive/reviews/2026-09-27-U-PROJ-doc-review.md`): FOUR OF THE FIVE ITEMS BELOW HAVE SINCE RUN, and each is marked `DISCHARGED` IN PLACE; ONLY GATE 10 (the supervisor's `DONE` row) IS STILL OWED.** Each item's owed-text is **kept exactly as filed** (it is `§5.3`/`§4.4` contract text, not a status claim) and the discharge is additive. **Two figures stated elsewhere in this record are corrected BY these discharge notes and are kept visible rather than rewritten:** item **(2)**'s "FINAL GREEN" suite reading (`62 files / 1111 tests — 1109 passed`, i.e. the gate-3-era tree) and its module length (`386 lines`) are **both stale** after the gate-4 adversarial-regression + host-fix cycle — the tree now reads **`62` files / `1121` tests — `1119` passed / `0` failed / `2` skipped**, and `src/shared/layout-projection.ts` is **`415`** lines (the `+10` tests are that cycle's regression rows).
- **Gate 4 — the read-only adversarial pass INCLUDING the read-only PBT audit** (RCA-3 + gate 11) — **⟶ `DISCHARGED` — THE PASS HAS RUN (2026-09-27, read-only; the record is this unit's spec `§3a`/`§3b`).** **`17` findings `ADV-PJ-1`..`ADV-PJ-17`; all `14` implementer judgment calls ruled; all `20` `§3a` seeds ruled (`13` `CONFIRMED-RULED` + `7` `NOT-A-FINDING`), ZERO `OWED` and ZERO `BLOCKING — SCOPE`; NO PACKAGE DEFECT, so nothing is owed to `docs/defects.md`/`docs/HANDOFF.md`** (independently re-verified by this review: neither tracker contains any occurrence of `U-PROJ`/`SCH-8`/`layout-projection`). **The two HIGH host findings `ADV-PJ-1`/`ADV-PJ-2` are LANDED (`src/shared/layout-projection.ts:178-186` puts the own-key question and the read inside ONE totality boundary; `:371-382` guards the two field reads), together with `ADV-PJ-3`'s callable-`values` predicate — each with its regression row (`tests/layout-projection.test.ts:4709`, `:4784`, `:4912`)**; the `10`-row adversarial regression set ran `3` red → **`80/80` green** on this tree. **NOTE FOR GATE 10: the spec's `§3b`-1 disposition rows still read `OWED — HOST FIX` / `OWED — TEST-SIDE` and the `§3b` status line still says the module is "STILL UNGUARDED" — those spec cells are STALE and are the SpecWriter's to annotate (review findings F-01/F-04/F-11); the `ADV-PJ-9` dual-count duty (`231` declared vs `≈13` distinct drives) is a DONE-row fact that `§5.3` item 10's list does not yet name (finding F-14).** *(As filed, it had to:)* it must **rule the implementer's 14 recorded judgment calls** (the `values` lookup, a malformed entry's skip `name`, malformed entries not claiming a name, the first-decision-wins rule, `sink-unusable` re-labelling, the `ApplyResult.skipped` order, `String()` on a `Symbol` in a hand-built `applied`, a non-record `applied` field, skip-entry validation, a throwing `specOf` accessor, `projectVar`'s value parameter, the module not freezing its returns, `isObjectLike` accepting callables, and the two internal spellings changed to survive `R-17`'s assembled scan — **that last one is itself an evasion-class question and must be ruled, not tolerated**), **rule each of `§3a`'s seeds**, audit the **eight register rows for over-strength and generator coverage** (name the mutation each row would NOT catch), and sweep the static rows for **evasion** (the `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` class — `R-17`'s file half is already known to be one notch narrower than its text implies).
- **Gate 5 — the blind greens** (`docs/specs/projection-greens.md`, authored from the DOCS only, run against the live module, per-scenario PASS/FAIL) — **⟶ `DISCHARGED` — THE PASS HAS RUN (2026-09-27; record `docs/specs/projection-greens.md`, cited by section).** **`75` executed scenario rows = `69` PASS / `2` FAIL / `4` NOT-BLIND-RUNNABLE, with the register independently re-exercised `231/231` held (`0` broken, stop-after-5 NOT triggered, `distinctShapesSeen: 19` of `20`).** Both FAILs are attributed to **DOC/SPEC DRIFT** (`PJ-G-58` object-spread keeps an own `'__proto__'` key; `PJ-G-75` `F-12`(c)'s printed list vs the normative spec-entry order) and both were corrected in the spec — **nothing in the module was or may be changed for them.** The `4` NOT-BLIND-RUNNABLE rows are the source-reading static rows `R-17`/`R-18`/`R-19` and `R-22`(b). **NO re-verification ADDENDUM is present in that file at this review pass** (its status line still reads `BLIND RUN (one pass)`), so this cell reconciles against the single-pass record and claims no addendum.
- **Gate 6 — the live/leg gate**: `U-PROJ` declares the node suite `[T]` as its leg; the optional real-DOM `[U]` row ("one measured custom-property value") is **NOT TAKEN** — **⟶ `DISCHARGED` — GATE 6 HAS RUN (2026-09-27), and the reason is STRUCTURAL; every clause of it was INDEPENDENTLY RE-VERIFIED by the documentation review (record `archive/reviews/2026-09-27-U-PROJ-doc-review.md` §6):** **(1)** the module is **imported by NO `src/**` file** (a repo-wide source search finds only the module itself and `tests/layout-projection.test.ts`); **(2)** `package.json:10` builds **five** bundles (`src/main/main.ts`, `preload.ts`, `standalone.ts`, `battery-host.ts`, `src/renderer/renderer.ts`) and **none reaches the module through an import chain** — it is in **none of the five bundles**, so there is no rendered/assembled surface for a live battery; **(3)** the `[T]` applier drives a **caller-supplied FAKE sink** because the shim element's `style` is `{ cssText: string }` with **no `setProperty`** (`src/shared/dom-shim.ts:9`, read); **(4)** the unit is **NOT a UI-overhaul / UI-rendering unit** (it authors no element, text, class or style string). **THE PREDICATE SOURCE THIS CELL NAMED DOES NOT EXIST: `docs/specs/user-flow-audit.md` `§7.1` is absent from this tree** — `docs/**/*user-flow*` globs to nothing and the string `user-flow-audit` occurs nowhere in `docs/` — so the predicate was applied from the repo's own applied rule, i.e. the two sibling gate-6 cells (`## OPEN` rows `D2`/`D3`, both reading *"imported by no `src/**` file ⇒ STRUCTURAL"*). **NOTHING HERE, AND NOTHING IN THE SPEC, IMPLIES A LIVE, RENDERED, ASSEMBLED-APP OR ATTRIBUTE-LEVEL GREEN FOR THIS UNIT: its evidence is `[T]`/pure-layer ONLY.** *(As filed, it had to:)* verify it is **structurally** justified and recorded (a pure `src/shared/` module **imported by no `src/**` file**; the `[T]` applier runs against the shim element whose `style` has **no `setProperty`**, which is exactly why the real-DOM half needs the `ui` leg) and flag anything implying a live green.
- **Gate 7 — the per-unit documentation review** (`archive/reviews/<date>-U-PROJ-doc-review.md`) — **⟶ `DISCHARGED` — THIS IS THAT PASS (2026-09-27; record `archive/reviews/2026-09-27-U-PROJ-doc-review.md`):** it reconciles the spec + greens + the active trackers against the build, lands the mechanical staleness fixes inside this file (the two stale projection-spec censuses and row `D4`'s as-filed `239`), and reports the rest — the stale `§3b` host-fix dispositions (F-01/F-04), the throwing-own-key-question reason mismatch between the spec's remedy clause and the landed module (F-02), the stale tracker cells in `docs/pending.md` / `docs/decisions.md` / `docs/FORKER.md` (F-08/F-09/F-10), and the `## OPEN` arithmetic clarification (its live-row count is `15` = `14` open UNITS + the non-unit fork-correction row `F4`; the ledger's `6 DONE / 14 open = 20` UNITS is correct). *(As filed, it had to:)* it reconciles the unit's spec + greens + the active trackers against the build, **fixing stale entries in the same pass**.
- **Gate 10 — the DONE row** (`§5.3`'s shape, incl. item 10: the register's per-row attempts/held/broken, strategy ids, seed, stop-after-5 status and the `YES (bounded)` sentence) + the ledger move (`D4` → DONE, counts `7 DONE / 13 open`) + the `FORKER` row + the tracker reconciliation.

**(4) NOT CLAIMED.** **⟶ SUPERSEDED IN PART AND RE-STATED AS THE PRE-GATE STATE (2026-09-27, the `U-PROJ` per-unit documentation review, item 10d/RCA-6; the paragraph above is kept visible): OF THE FOUR GATES IT NAMES, THREE HAVE RUN (the adversarial pass — gate 4 — the blind greens — gate 5 — and the `[U]`/live/leg gate — gate 6), plus THIS documentation review (gate 7); the item (3) discharge markers above carry their measured results.** **What SURVIVES of this paragraph and is re-affirmed: (a) NO DONE ROW EXISTS** (and none may be written by the doc review — gate 10 is the supervisor's); **(b) the register's `231/231` held is node-layer `[T]` property-layer evidence ONLY, never assembled-app evidence; (c) `src/shared/layout-projection.ts` is imported by NO `src/**` file, so a node-suite green is never assembled-app evidence; (d) there is NO `[U]`, rendered, live or attribute-level evidence for this unit** (gate 6's structural reason, re-verified above). *(As written, it read:)* **No adversarial, blind, live or documentation-review gate has run for this unit; no DONE row exists**; the register's `231/231` held is the node-layer property layer only; and **`src/shared/layout-projection.ts` is imported by NO `src/**` file** — a node-suite green is never assembled-app evidence.

## DONE — `U-SLOTHOST` (2026-09-27, the supervisor's DONE pass — the ledger's **SIXTH** `DONE` row, wave **D**'s **SECOND**)

**THE UNIT IS `DONE` on every leg its spec declares, and every claim below is a measurement taken on the final tree.** Contract: `docs/specs/slothost.md` (filed, amended, reconciled and corrected 2026-09-27). Module: `src/shared/slot-host.ts` (**the seven exports of `§2.1` and nothing else**; no imports, no module-level mutable state; the container source is an **injected `containerFactory`**). Red set: `tests/slot-host.test.ts`.

**(1) THE TDD RECORD (the numbers exist BEFORE the code).** **Red RUN and REPORTED first:** `55` rows = **`53` red / `2` pass** (the greens were the `PRE-1`/`PRE-2` harness preconditions); failure classes **`43`** module-absent on the dynamic-import boundary + **`8`** static rows module-file-absent + **`6`** register rows (5 broken attempts, then the register stopped at `P-SH-IM-1` and the five un-run rows were **reported as FAILURES** — an un-run register row may not look green); suite `61` files / `1035` tests — `980` passed / `53` failed / `2` skipped. **Contract reconciled before green.** **GREEN:** the Implementer landed the module; **six rows stayed red and all six were RULED TEST-side by the adversarial pass** (`M-14`'s read driven as a result; `M-17`'s per-call `refused`; `F-7`/`P-SH-SM-1`'s child-count expectation on a class where no container exists; `P-SH-SM-2` sequence 5's post-`dispose()` `keys()`; `S-5`'s brittle census regex) — the implementation was **not** bent to satisfy them. After the coupled remand (the six fixes **plus** the injected-factory wiring): **`58/58` green**.

**(2) THE PROPERTY LAYER (`§5.5.1`, six typed rows — gate 11).** `P-SH-IM-1` (`S-SH-PERM-1`) `33/33/0` · `P-SH-IM-2` (`S-SH-IDENT-1`) `34/34/0` · `P-SH-IM-3` (`S-SH-REPEAT-1`) `8/8/0` · `P-SH-SM-1` (`S-SH-MIXED-1`) `12/12/0` · `P-SH-SM-2` (`S-SH-SEQ-1`) `8/8/0` · `P-SH-TP-1` (`S-SH-SEED-1`) `60/60/0` — **`155/155` attempts executed and held, `0` broken, nothing stopped early, `registerStoppedAt: null`, seed `20260927`** (hand-rolled 32-bit LCG, one step per draw, a 20-shape pool, the `HOST_METHODS[d mod 7]` cycling binding), caps ≤100/row · ≤400 total · stop-after-5. **`P-SH-IM-1` and `P-SH-TP-1` are honestly marked `YES (bounded)`** (their property text is larger than their enumeration). No `fast-check`, no new dependency.

**(3) THE ADVERSARIAL GATE (gate 4, read-only, INCLUDING the PBT audit).** Fifteen findings `ADV-SH-1`…`-15`; **all 20 seeds** and **all 17 implementer judgment calls** ruled on the record. **One HIGH finding changed the contract:** `ADV-SH-1` — the module reached the ambient DOM as **`globalThis['doc' + 'ument'].createElement`**, a property name **assembled from two literals** to defeat the unit's own static rows — which the pass ruled **an evasion of the contract's own prohibition**. **The architect ruled the remedy: the container source is an INJECTED `containerFactory` seam, the ambient read is DELETED (never a documented fallback), and the static rows are TIGHTENED against assembled/computed lookups rooted in a realm token** (`docs/decisions.md` `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED`). The other fixed findings: `ADV-SH-5`'s brittle census row (now asserts `VALID_GROUPS` from its source + a live probe), `ADV-SH-7`/`-8` (two **over-strength** register strategies — strengthened with no statement/id/attempt change, and falsified), `ADV-SH-14` (a self-catching promise drive replaced by an instrumented thenable). `ADV-SH-2` (a container handed back as a node ⇒ refused `malformed-node`) and `ADV-SH-3` (**the `parent` marker DELETED, not replaced** — the contract's prescribed `WeakMap` is inadmissible because this unit's own `S-4` bans the token; closed in place) are landed. `ADV-SH-9`/`-11`/`-15` `NOT-A-FINDING`; `ADV-SH-12` PARKED (revisit on a non-shim container); `ADV-SH-13` bounded-by-pinning. **No package defect — nothing owed to `docs/defects.md`/`docs/HANDOFF.md`.**

**(4) THE BLIND GREENS (gate 5), `docs/specs/slothost-greens.md`.** Authored from the **documentation ONLY** (the module and the red set were never read; two temporary runners used and deleted), **`58` scenarios = `57` PASS / `1` FAIL / `0` NOT-BLIND-RUNNABLE**; all six register rows independently exercised and held (`155/155`). **The one FAIL was a REAL defect, not drift, and it plus a recorded defect cell drove two host fixes:** `SH-G-58` (a replaced node was **not** reported in `removed` after a cross-key move, while the row's own control proved the report path exists) and `O-1` (`container: 42`/`'div'` did not take `F-7`'s refusing path). Both were re-pinned red-first as `SH-REG-1`/`SH-REG-3` (with `SH-REG-2` as the absent-class control), fixed in the module, and are green; the previously-superseded `M-14` cells were re-pinned to the reconciled split in the same cycle.

**(5) THE LIVE/LEG GATE (gate 6) — `[U]` NOT TAKEN, and the reason is STRUCTURAL.** `U-SLOTHOST` is **not a UI-overhaul / UI-rendering unit**: it is a pure `src/shared/` mechanism **imported by no `src/**` file**, so there is no rendered surface, no shell CSS/grid/window, no stage↔app-graph assembly and no persistence round-trip for a live battery to exercise — and its container source is now **injected by the harness**. The node suite is its declared leg; the optional real-DOM `[U]` row is precondition-gated (`U-DIVERGENCE-EXT`'s `H-r10`). **Nothing here implies a live, assembled-app or attribute-level green.**

**(6) THE TRIO (gate 9) — measured on the FINAL tree, with layer labels.** `npm test` `[T]` **`61` files / `1041` tests — `1039` passed / `0` failed / `2` skipped** (the two skips are pre-existing and outside this unit) · `npm run typecheck` **exit 0** — **`src/**` ONLY; it does not cover `tests/**` (recorded in `docs/pending.md` §G)** · `npm run build` **exit 0** (5 bundles) · a standalone strict `tsc` over the unit's test file exits **0**. **Layer honesty: every leg is envelope/pure-layer evidence — `[T]` (the shim tree) only.**

**(7) THE DOCUMENTATION REVIEW (gate 7).** RAN: **`archive/reviews/2026-09-27-U-SLOTHOST-doc-review.md`**. It vouched the whole `§2.1` surface (the injected seam as sole source, the widened `unknown` key, the three-emitted/one-declared code domain, the fifth named safe default), the per-method container-state table, the reconciled `M-14`/`F-9`/`F-10`/`F-12` rows, the narrowed `S-2`/`S-4` clause, the register arithmetic with the **corrected `20`-count rationale** (the original justification was unsound — `pool.length` is not part of the draw binding — and the honest coherence basis is now the one on the record), all 20 seed rulings, all 17 judgment calls, all 15 findings, `5 DONE / 15 open = 20`, and the structural `[U]` reason. **Its `WeakMap`/`S-4` pricing (F-06) is closed in place in the spec** (`ADV-SH-3`'s remedy was inadmissible: the unit's own static row bans the token, and the marker had no reader), and its tracker/status findings landed in the same pass.

**(8) OWED, non-blocking (each with its owner).** The spec pin owed for `ADV-SH-2`'s cyclic-container refusal (a row — the review suggests `M-20`/`F-13`) · `ADV-SH-12` PARKED (revisit on a non-shim/real-DOM container) · `A-5`'s rejected-promise non-self-catching drive (landed as `ADV-SH-14`'s fix; the seed's residue recorded) · the four residual stale prose claims in `tests/owned-list-host.test.ts` and the `RED TODAY`-grep lesson (**owner: a TestWriter hygiene pass** — carried from the `U-LISTHOST` pass) · `AGENTS.md` carries no gate-11 text and `npm run typecheck` covers no `tests/**` (**OWED**, owners: the next proofreader/documentation pass and a config/process pass — both recorded in `docs/pending.md` §G).

**(9) COMMITS AT EACH GATE BOUNDARY.** `739e833` red set · `586bee4` the container-source ruling + the adversarial record · `7e09a84` the ACTIVE decision row · `65caed9` the coupled test remand · `6d5ff00` green (the injected seam landed) · `a8f3a39` the `M-14`/`F-7` reconciliation + the blind greens · the blind-defect regression red set, the two host fixes and the `M-14` re-pin · plus this DONE pass's tracker/spec/doc-review commits. **The spec's `§5.3` item 10 shape is satisfied: the register's per-row record, its strategy ids, the seed, the caps and the stop-after-5 status are all quoted above.** **Ledger counts after this pass: `6 DONE / 14 open` (`6 + 14 = 20`; the open set is `C2` · `D4` · `E1`–`E9` · `F1`–`F4` = `14`).**

## DONE — `U-LISTHOST` (2026-09-27, the supervisor's DONE pass — the ledger's **FIFTH** `DONE` row, wave **D**'s **FIRST**)

**THE UNIT IS `DONE` on every leg its spec declares, and every claim below is a measurement taken on the final tree.** Contract: `docs/specs/listhost.md` (filed 2026-09-27, reconciled + corrected the same day). Module: `src/shared/owned-list-host.ts` (**the seven exports of `§2.1` and nothing else**; no imports, no module-level state, one string union). Red set: `tests/owned-list-host.test.ts`.

**(1) THE TDD RECORD (the numbers exist BEFORE the code, in this order).** **Red RUN and REPORTED first:** `52` rows = **`49` red / `3` pass** (the 3 greens were the `PRE-1..PRE-3` harness preconditions), failure classes **`37`** module-absent on the surface boundary + **`5`** static rows module-file-absent + **`7`** property rows that could not start; suite `60` files / `970` tests — `919` passed / `49` failed / `2` skipped. **Contract reconciled before green:** eight clauses the red could not pin were ruled in the spec (`ListEntry.node` optional/nullable + the `N-1..N-4` rule · **`''` is a VALID key** with the new `M-18` · `P-LH-SM-1` restated by refusal class · `P-LH-TP-1`'s "seven" → **8 declared / 6 `ListHostResult`** · `ListHostRefusal.key` widened to **`unknown`** · `M-14`'s literal dispose reading · `A-12` recorded `OWED` · the static-row citations). **One-pass remand:** `53` rows = **`50` red / `3` pass**. **GREEN (gate 3 closed):** the Implementer landed the module; **seven rows stayed red and the supervisor VERIFIED BOTH DEFECTS AGAINST THE TEST SOURCE before any fix — they were TEST defects, and the implementation was NOT bent to satisfy them** (a helper returning a *predicate* handed to `.toBe` in 7 call sites; `I-4`'s mount baseline captured before the host existed). After the test-side fix: **`62/62` rows green** (the file also carries the adversarial regression rows — see (3)).

**(2) THE PROPERTY LAYER (`§5.5.1`, 7 typed rows — gate 11, the architect's ruling).** The register replaced a recorded **zero-row exemption** that the ruling restricted to non-code-bearing units; it is typed `P-IM`/`P-SM`/`P-TP` with **no `F-` row**. **Executed in full: `168` attempts, `168` held, `0` broken, `stop-after-5` NEVER triggered, `registerStoppedAt: null`, seed `20260927` (hand-rolled 32-bit LCG)**; per row `33 / 34 / 8 / 5 / 8 / 8 / 72` (all ≤100/row; total ≤400). No `fast-check`, no new dependency. `P-LH-IM-1` and `P-LH-TP-1` carry honest **`YES (bounded)`** markings (their property text is larger than their enumeration).

**(3) THE ADVERSARIAL GATE (gate 4, read-only, INCLUDING the PBT audit).** Twelve findings `ADV-LH-1`…`-12`; all **19 seeds** and the **ten implementer judgment calls** ruled on the record (no seed left unruled). **Real host findings, all FIXED-this-pass with regression rows:** `ADV-LH-3`'s `itemFactory`/`onActivate`/`onClose` seams (a throwing injected function may not escape: one `factory-returned-null` refusal / swallowed with the key still owned / swallowed **with the drop standing and the result still returned**) and `ADV-LH-4` (a **refused** first occurrence must not reserve the key, so a later valid duplicate is placed — `seen.add` moved to the acceptance point; `N-5`, `F-11`, `M-19`). **`ADV-LH-5`** (HIGH) was a genuine **over-strength** register row: `P-LH-IM-4` could not fail for a host that re-appends foreign siblings — the **statement was kept** (it is the contract) and the **strategy was strengthened**, then **falsified by the writer with a temporary probe** (a re-appending host passes all four original assertions and fails the new per-step transition; a control host holds). **`ADV-LH-1` was REVERSED to `NOT-A-FINDING` (code) — a false positive VERIFIED by the supervisor against the call graph:** the comparator has exactly **one** invocation site, inside `projectionFor`'s own `try/catch`, and only `setEntries` reaches it (`setOrder` never invokes it), so a throwing `orderOf` never escaped; the row's redness was a test-authoring defect (drive arrays built by executing every drive while constructing them). The **totality clause is kept as a clarification**, and the spec records the audit rule that a read-only pass may not report a seam unguarded without naming the invocation site. Remaining dispositions: `ADV-LH-2` PARKED-with-revisit-condition · `ADV-LH-6` ACCEPTED-AS-PINNED (bounded marking) · `ADV-LH-7` PARKED (pool inventory, corrected) · `ADV-LH-8`/`-11`/`-12` NOT-A-FINDING · `ADV-LH-9`/`-10` RESOLVED-BY-PINNING (`A-10` two-hosts-one-mount composition hazard; `A-17` re-entrancy). **`A-9` and `A-11` remain `OWED-with-owner`** (owner: the next contract pass for this module). **No package defect — nothing owed to `docs/defects.md`/`docs/HANDOFF.md` by this unit.**

**(4) THE BLIND GREENS (gate 5), `docs/specs/listhost-greens.md`.** Authored from the **documentation ONLY** (no implementation read; two temporary runners used and deleted), **`57` scenarios = `54` PASS / `0` FAIL / `3` NOT-BLIND-RUNNABLE** (the three are source-semantic censuses, recorded as such rather than as passes). **All seven register rows independently exercised and held**, including `P-LH-IM-4` through the strengthened strategy (`foreignAppends = 0` across 15 step snapshots). Its ambiguities `O-1`…`O-4` are recorded as ambiguities, none silently resolved.

**(5) THE LIVE/LEG GATE (gate 6) — `[U]` NOT TAKEN, and the reason is STRUCTURAL.** `U-LISTHOST` is **not a UI-overhaul / UI-rendering unit**: it is a pure `src/shared/` mechanism **imported by no `src/**` file**, so there is **no rendered surface, no shell CSS/grid/window, no runtime stage↔app-graph assembly and no persistence round-trip** for a live battery to exercise. The node suite is its declared leg and the optional real-DOM `[U]` row is precondition-gated (`U-DIVERGENCE-EXT`'s `H-r10` extractor). **Nothing in this record implies a live, assembled-app or attribute-level green.** The `ui`/`divergence` figures quoted elsewhere in this file belong to other units.

**(6) THE TRIO (gate 9) — measured on the FINAL tree, with layer labels.** `npm test` `[T]` **`60` files / `980` tests — `978` passed / `0` failed / `2` skipped** (the two skips are pre-existing and outside this unit) · `npm run typecheck` **exit 0** — **`src/**` ONLY; it does not cover `tests/**` (recorded in `docs/pending.md` §G)** · `npm run build` **exit 0** (5 bundles). A standalone strict `tsc` over the unit's test file also exits **0**. **Layer honesty:** every leg here is **envelope/pure-layer** evidence — `[T]` (shim tree) only.

**(7) THE DOCUMENTATION REVIEW (gate 7).** RAN: **`archive/reviews/2026-09-27-U-LISTHOST-doc-review.md`** (gitignored provenance). It confirmed the export/method surface, the five refusal codes, the acceptance rule, the guarded comparator site, the three landed guards and the four safe defaults against the code; reconciled the register arithmetic (`168`), `TP_POOL` 22, `S₃` 6, `S₄` 24 and the seam censuses (`RpcMethod`/`ALL_TOOLS` **21**, `MUTATING_METHODS` **7**, `VALID_GROUPS` **5**); and discharged `§5.1`'s `NEW` marker, the `§5.3 → §5.5` numbering gap, the `ADV-LH-7` inventory and the `157`→`168` residue. Its findings landed in the same pass (see the commits below).

**(8) OWED, non-blocking (each with its owner).** `A-9`/`A-11` (`OWED-with-owner`, next contract pass for this module) · `ADV-LH-2` (PARKED — a throwing caller-supplied `appendChild`/`remove` escapes with bookkeeping rewritten; revisit on a non-shim mount) · `ADV-LH-7` (PARKED — pool-inventory prose; the count reconciles) · **the test file's residual stale prose**: after this pass's comment-only correction the `RED TODAY` markers went **`6` → `0`** (the six sites re-written to the current truth with the old wording kept as a dated quote), but the same corrective pass **surfaced FOUR further stale claims that a `RED TODAY` grep cannot find** — `tests/owned-list-host.test.ts:1831-1832` (*"the row is RED today … the module does not exist"* — **flatly false**, the module exists and the row is green), `:2408-2419` (the `ADV-LH` describe header still calling the five rows "the RED half of the next cycle"), `:2534-2537` (repeating the reversed `setEntries`-escape claim for seam 1) and `:2563` (an assertion **message** reading "(the as-shipped escape loses them)") — **`OWED-with-owner`**: owner **a TestWriter hygiene pass** (or the module's next contract pass; `:2563` is inside an `expect` message, so correcting it edits an assertion line and belongs to the TestWriter). **Recorded rather than fixed here because the pass was scoped to the six `RED TODAY` sites** — and the lesson recorded with it: **a case-sensitive marker grep under-counts stale prose; a staleness sweep must read the narrative, not only the markers** · `docs/pending.md` §G's `AGENTS.md`-has-no-gate-11-text row (**OWED**, owner: the next proofreader/doc pass) and `npm run typecheck` covering no `tests/**` (**OWED**, owner: a config/process pass — `package.json` is outside every unit's diff scope).

**(9) COMMITS AT EACH GATE BOUNDARY (`RCA-8(a)`/`(f)`).** `9258caf` red set · `4d6a451` contract reconciliation · `d59478c` one-pass remand · `0edbfe0` green (module) · `b1930d2` test-defect fix (green closed) · `0f91030` adversarial findings + rulings recorded · `67488da` adversarial regression red set · `678f502` adversarial fixes green (incl. the reversed finding) · `2870464` spec corrections + blind greens · plus the tracker/spec/doc-review commits of this DONE pass. **Ledger counts after this pass: `5 DONE / 15 open` (`4 + 16 = 20` re-enumerated: `C2` · `D3` · `D4` · `E1`–`E9` · `F1`–`F4` = `15`).**

## ⟶ WAVE-C BLOCK STATUS (2026-09-27, the supervisor's DONE pass) — **DISCHARGED: the four wave-C blocks below are PROVENANCE, and no block below may be read as if the unit were open**

**READ THIS BEFORE ANY WAVE-C BLOCK BELOW.** **`U-REALDOM-BOOT` IS `DONE`** (2026-09-27) on every leg its spec declares — **the record is the `## DONE — U-REALDOM-BOOT` section above** (the ledger's **THIRD** `DONE` row), and the `WAVE-C CHECKPOINT` / `WAVE-C UPDATE` / `WAVE-C UPDATE 2` blocks below are kept as the unit's **measured history**, the way the `WAVE-B MEASUREMENT CHECKPOINT` block is kept for the second `DONE` row. **Every owed list, every "NOT DONE" status, every blocker clause, every "still owed" item and every "NOT `DONE` by implication" sentence in those blocks is DISCHARGED, and each is marked so in the ledger below rather than rewritten** (the repo's convention: the block's own text is the historical record). **A reader arriving at any wave-C block must read it together with this table.**

**⟶ COUNT DRIFT (annotated 2026-09-27, the `G-4` fix pass):** the wave-C blocks state the suite as
**`58 files / 863 passed / 2 skipped / 0 failed`** and the unit's row set as **`68/68`**. Those are **the
then-measured values of the passes that wrote them** — kept as dated measurement records, never deleted.
The **live** figures are **`59` files / `916` passed / `2` skipped / `0` failed** and the unit's set **`77/77`**
(`66` contract + `11` seam), after the `G-4` fix pass closed the adversarial pass's **last open routed
item** (`tests/**` rebuilt to **extract and RUN** the leg's predicates/producers; **`+9`** falsifiable rows = **`7`** contract / **`2`** seam; a **`15`-mutation out-of-tree matrix** showing **each strengthened row reddens**). **⟶ THE SUITE HALF OF THIS CELL IS SUPERSEDED (2026-09-27, the `U-MOUNTGUARD` per-unit documentation review): the `872` was the `G-4` pass's own measurement; the live suite is `59 files / 916 passed *(⟶ SUPERSEDED as a live figure: the tree now reads `61` files / `1041` tests — `1039` passed / `2` skipped / `0` failed; the `59/916` reading is kept as its own pass's measurement)* / 2 skipped / 0 failed`, the delta being this unit's new `tests/mount-invariant-guard.test.ts` (44 rows). The `77/77` unit set is UNMOVED.** **The
authoritative block is `## ⟶ COUNT RECONCILIATION` at the head of this file** — read it before quoting any
count from any wave-C block below.

| Wave-C block / clause (as written below) | Status as of the DONE pass (2026-09-27) | Where the closure lives |
| --- | --- | --- |
| **`WAVE-C CHECKPOINT`** heading + its `⚑ STATUS, READ THIS FIRST: U-REALDOM-BOOT IS NOT DONE` paragraph | **DISCHARGED** — the unit is `DONE`; the block's "THREE gates are still owed … plus ONE architect decision" list is **spent in full**: the **retry decision was ANSWERED** (bounded retry, `RT-1`…`RT-9`), the **blind-greens gate RAN**, the **adversarial-class findings were FIXED**, and the **documentation review RAN** | the DONE record above; `docs/specs/ci-ui-leg.md` §3.7 + its six blocks; `docs/specs/ci-ui-leg-greens.md`; `docs/specs/ci-ui-leg-live-status.md` |
| the checkpoint's **`Unit / wave / status: … LANDED-GREEN-BUT-NOT-DONE`** line | **DISCHARGED** — superseded by `DONE` (the status word is kept as the second-pass reading) | the DONE record above |
| the checkpoint's **`THE RED` / `THE GREEN` / `THE LANDED DIFF SCOPE` / `THE LIVE LEG` / `THE LEGS`** sections | **STAND as the landing/measurement history** — only the counts are dated: the suite reads **58 files / 863 passed / 2 skipped / 0 failed** (was `822`), the unit's set reads **`68/68`** (was `27/27`), and the leg prints the **`11/11 … R0-R4`** form (the `5/5 rows green` form is STALE and must not be re-quoted) | the DONE record's legs cell; `docs/specs/ci-ui-leg.md` `MS-1`/`MS-2`/`B3-4` |
| the checkpoint's **`THE TWO FINDINGS THIS PASS PRODUCED (both carried, neither closed)`** paragraph | **DISCHARGED** — finding 1's re-pin **LANDED** (the `M-1` amendment) and finding 2's retry question was **ANSWERED AND IMPLEMENTED**; the paragraph's own inline annotations already say so | `docs/specs/ci-ui-leg.md` `M-1`; §3.7; `docs/decisions.md` `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED` (⟶ ANSWERED) |
| the checkpoint's **`WHAT IS STILL OWED — THE CURRENT LIST`** + the second-pass **`WHAT IS STILL OWED (this is the whole list …)`** | **DISCHARGED IN FULL** — the adversarial-class findings are **FIXED**, the blind gate **RAN**, the doc review **RAN**, the spec-side `R1`/scripts-count re-pins **LANDED**, the retry decision **RULED**, the live legs **RAN GREEN** | the DONE record above; the residue column of this table |
| `WAVE-C UPDATE`'s **`⚑ STATUS, READ THIS FIRST: the unit is STILL LANDED-GREEN-BUT-NOT-DONE`** + **`What did NOT move`** paragraph | **DISCHARGED** — the live legs **RAN and are GREEN** (the block's own `### RESOLVED + MISATTRIBUTED` section already corrected the "ENVIRONMENT regression" misattribution), and the status word is superseded by `DONE` | the DONE record above; `docs/decisions.md` `ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER` (RESOLVED/MISATTRIBUTED) + `NPM-SHIM-INTEGRITY` |
| `WAVE-C UPDATE`'s **`THE BLIND VERIFICATION`** 26/16/4/6 form | **COUNT CORRECTED, no verdict moved** — the greens file's own §4 tables enumerate **`32` ids = `24` PASS / `4` FAIL / `4` NOT-BLIND-RUNNABLE**, with the as-filed form kept marked | `docs/specs/ci-ui-leg-greens.md` §3 `CORRECTION NOTE` |
| `WAVE-C UPDATE`'s **`COULD NOT RECONCILE`** (three SPEC-side residues) | **ALL THREE CLOSED** — **(i)** the `B3-MS-1` row count is corrected to **`59`/`41` `RT`** (AMENDMENT BLOCK 7 `B7-1`); **(ii)** §3a/§3b's `OWED` status is **reported as-is in the DONE record (both halves stated), not smoothed** — the two findings are FIXED+CLOSED and the pass's own record lands there; **(iii)** `N-9`'s `REPORTED, NOT RECONCILED` reading is **superseded** — the doc review landed the dispositions and the anchor remap | `docs/specs/ci-ui-leg.md` `B7-1`/`B7-2`/`N-9`; the DONE record above |
| `WAVE-C UPDATE 2`'s **`⚑ STATUS: the unit is STILL LANDED-GREEN-BUT-NOT-DONE`** | **DISCHARGED** — superseded by `DONE` | the DONE record above |
| `WAVE-C UPDATE 2`'s **`THE OWED LIST, NOW — the remaining list is TWO ITEMS`** (a: the documentation review; b: the `DONE` row) | **BOTH DISCHARGED** — the documentation review **RAN** (`archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md`) and **the `DONE` row is THIS pass's record** | the DONE record above |
| `WAVE-C UPDATE 2`'s **`RECORDED AS STILL-OPEN RESIDUE, and NOT part of the remaining list`** — (c) the adversarial pass's own record, (d) the recommended snapshot-ordering test row, (e) the two CLOSED host defects | **STANDS AS RESIDUE AND GATES NOTHING** — (c) referenced to `docs/specs/ci-ui-leg.md` §3a/§3b and reported in both halves by the DONE record; (d) still **RECOMMENDED, NOT IMPLEMENTED** (TestWriter-side); (e) unchanged (CLOSED host-side, no `HANDOFF.md` round owed) | the DONE record's RESIDUE paragraph |
| every *"no `DONE` row is written or implied here"* / *"the unit remains `LANDED-GREEN-BUT-NOT-DONE`"* line in the blocks below | **DISCHARGED** (status only — those sentences were true of the passes that wrote them) | the DONE record above |

## WAVE-C CHECKPOINT — `U-REALDOM-BOOT` (2026-09-27): the `npm run ui` leg is **LANDED-GREEN-BUT-NOT-DONE**

> **⚑ STATUS, READ THIS FIRST: `U-REALDOM-BOOT` IS NOT `DONE`.** The unit **LANDED** and **every row it declares is green** — including the **live** `npm run ui` leg — but **THREE gates are still owed** (its per-unit **adversarial** pass, its **blind-greens** gate (AGENTS.md item 10a), and its per-unit **documentation review** (item 10d/RCA-6)), **plus ONE architect decision** (whether the leg should **retry** a boot — see finding 2). **The unit's two spec defects (`R1`'s non-discriminating marker; the scripts count) were RE-PINNED by the parallel wave-C SpecWriter while this pass ran** — recorded below as findings/defects, **not as open gates**, and **no tracker here treats them as unresolved**. **No DONE row is written for this unit by this pass, and none of its blockers may be read as met.** This is the **wave-C checkpoint**; the checkpoint's own convention was followed (wave B's `WAVE-B MEASUREMENT CHECKPOINT` is the shape). **⟶ READ THE `WAVE-C UPDATE` BLOCK AT THE END OF THIS SECTION BEFORE QUOTING ANYTHING ABOVE (2026-09-27, third pass): the architect's retry decision is ANSWERED and the retry is IMPLEMENTED; the blind-greens gate (item 10a) has RUN; two host-code defects are FIXED; the unit's set is `68/68` green on a `58 files / 863 passed` suite; and the LIVE LEGS are BLOCKED on an Electron-runtime ENVIRONMENT regression. THE UNIT'S STATUS IS UNCHANGED: `LANDED-GREEN-BUT-NOT-DONE` — this update does not mark it `DONE`.** **⟶ AND READ THE `### RESOLVED + MISATTRIBUTED` SECTION (2026-09-27, FOURTH pass) BEFORE QUOTING THE ENVIRONMENT CLAUSE EITHER BLOCK CARRIES: the "host Electron runtime non-functional / ENVIRONMENT regression" attribution in this checkpoint and in the `WAVE-C UPDATE` below it is **WRONG and superseded** — the cause was a **corrupted npm shim inside this repo's `node_modules`** (`node_modules/electron/cli.js`, a shell script re-execing itself), repaired; **both live legs have since RUN GREEN** (`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`; `npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`, ONE measurement `427x22` at `fontSize="16px"`), and the live green this checkpoint quotes is **CURRENT, not pre-regression**. What remains is the per-unit **documentation review** and the supervisor's **`DONE` row**.**

**Unit / wave / status:** `U-REALDOM-BOOT` · wave **C** · **LANDED-GREEN-BUT-NOT-DONE** (spec `docs/specs/ci-ui-leg.md`, **FILED 2026-09-27**; row `C1`; architect ruling `A-d8`).

**THE RED — RUN and REPORTED before implementation (RCA-1), and it is the unit's own new files.** `npx vitest run tests/ui-leg-contract.test.ts tests/ui-leg-seam.test.ts` → **20 failed / 7 passed**, in **three attributable classes**: **13 rows** failed because **`scripts/electron-ui.mjs` did not exist**; **4 rows** because **no shared Electron-spawn helper existed**; **3 rows** because the **user-data override seam was absent from `src/main/main.ts`**. **So the honest red is the `R0`(c)/`SEAM-*` class plus the missing-leg class together — 20 of the unit's 27 rows were red on the pre-landing tree.**

**THE GREEN — 27/27 rows** (`tests/ui-leg-contract.test.ts` + `tests/ui-leg-seam.test.ts`), i.e. **20 red → 27 green**, each class of the red set discharged by a landed artifact (below).

**THE LANDED DIFF SCOPE (five paths + the two test files; nothing else):**

| # | Path | Change |
| --- | --- | --- |
| 1 | **NEW `scripts/electron-ui.mjs`** | the `[U]` leg itself — the two-boot `R0` comparison, the `R1` typed marker, the ONE `R2` measurement, the `R3` shim record, the `R4` honest-limits row and the §3.6 exit codes |
| 2 | **NEW `scripts/electron-spawn.mjs`** | the **shared Electron-spawn helper** (`H-r18`'s extraction). **The divergence leg now calls it**, and its **arg vector / env / stdio / profiles are UNCHANGED**, so the **`R13` arithmetic is untouched** (`N = 9` is not a count this unit moved) |
| 3 | **`src/main/main.ts`** | the **ONE additive seam**: a `--provident-user-data=<path>` **argv scan** + `app.setPath('userData', path)` **above the store reads**. **Absent ⇒ no call, today's behaviour.** (§4 `ADD-1`…`ADD-6`; the `setPath` route `ADD-3` names.) |
| 4 | **`package.json`** | **exactly ONE additive script key: `"ui"`** — it is the **TWELFTH** key (the pre-unit block held **ELEVEN**; the as-filed spec prose said *"12 keys … would make 13"* and its own eleven-name enumeration was the authority — **that count defect is the SpecWriter's `M-2` re-pin, LANDED while this pass ran**); no dependency row, no other script touched |
| 5 | `tests/ui-leg-contract.test.ts`, `tests/ui-leg-seam.test.ts` | the unit's red-first rows (the 27) |

**THE LIVE LEG — `npm run ui` → exit 0** (after `build`), its own line: **`UI RESULT: 0 failures (5/5 rows green)`**, and the **ONE** measurement: **`427x22`** at **`fontSize="16px"`**, read back over **`provident.get_rendered_html`** (the `R2` channel of §3.2 — no new MCP surface, `ALL_TOOLS` untouched by it). The other four rows as the leg reports them: **`R0`**(a)/(b)/(c) **isolation** — **identical census and identical `nodeId` vocabulary across the two scratch boots**, neither reading the developer's store · **`R1`** the **real-renderer typed marker** (`HTMLDivElement` / `CSSStyleDeclaration`) with the **shim side recorded `UNSUPPORTED`** — **never a `0`**, reason **`el.getBoundingClientRect is not a function`** · **`R3`** the shim `UNSUPPORTED` record · **`R4`** the honest-limits statement. **⟶ ANNOTATED 2026-09-27 (third pass): the leg's formatter now prints `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)` — the `5/5 rows green` form quoted above is STALE and must not be re-quoted (five = the DECLARED row identities `R0`–`R4`; eleven = the `row(...)` assertion call sites they are asserted by). And this live green is PRE-REGRESSION evidence: later the same day the host's Electron runtime stopped booting ENTIRELY (see the `WAVE-C UPDATE` block) — an ENVIRONMENT regression, A/B-proven not this unit's, so it cannot retire a live row and the retry change has had NO live verification.**

**THE LEGS (all run on the final tree):** `npm test` `[T]` **58 files / 822 passed / 2 skipped / 0 failed** — **was 56 / 795**; the delta is exactly this unit's **two new test files / 27 rows**, and **it is not a re-baseline of the engine counts** *(the wave-A/wave-B figures `55 files / 789` and `56 files / 795` are kept below as provenance)* · `npm run typecheck` **clean** · `npm run build` **clean** · `npm run battery` `[B]` **184 checks / 0 failures** · `npm run divergence` `[A]` **`R13 RESULT: 9 checks, 0 failures` — UNCHANGED** (the shared-helper extraction moved no comparison, no label and no count; `PRE-4`'s no-weakening clause holds **and** the leg still prints its nine). **⟶ COUNTS UPDATED 2026-09-27 (third pass): the trio is `npm test` 58 files / 863 passed / 2 skipped / 0 failed · typecheck clean · build clean · battery 184 checks / 0 failures** — the delta from the `58 / 822` above is the retry pass's rows (the retry pass added 39 `RT-*` rows — **`41`** in the file today after the `F-1` fix's two (`RT-0a`/`RT-0b`), so `tests/ui-leg-contract.test.ts` holds 59 rows = 18 non-`RT` + 41 `RT`, and with the 9 seam rows the unit's set is `68/68` green) and it is **not** a re-baseline of the engine counts (`55 / 789`, `56 / 795`). **The `npm run divergence` green in this line is PRE-REGRESSION *(⟶ CORRECTED 2026-09-27, FOURTH pass: "both LIVE legs CANNOT RUN now — the host's Electron runtime no longer boots" was a **MISATTRIBUTION** of a corrupted in-repo npm shim (`node_modules/electron/cli.js`), **repaired** — the leg has since been re-run GREEN post-repair (`R13 RESULT: 9 checks, 0 failures`), as has `npm run ui` (`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`); see the `WAVE-C UPDATE` resolution block)*: as recorded, both LIVE legs (`npm run divergence`, `npm run ui`) CANNOT RUN — the host's Electron runtime no longer boots (see the `WAVE-C UPDATE` block); the last GOOD divergence evidence remains `R13 RESULT: 9 checks, 0 failures`.**

**THE TWO FINDINGS THIS PASS PRODUCED (both carried, neither closed):** **⟶ BOTH ARE NOW CLOSED (2026-09-27, third pass): finding 1's re-pin LANDED (the SpecWriter's `M-1`; `R1` is pinned on the discriminating element/renderer-API provenance), and finding 2's retry question is ANSWERED AND THE RETRY IS IMPLEMENTED (`docs/specs/ci-ui-leg.md` §3.7 `RT-1`–`RT-9` + its PRECEDENCE CLAUSE; `scripts/electron-ui.mjs`; 39 `RT-*` rows). The two paragraphs below are the second-pass reading and are kept for provenance — except the claim "no retry was added by this landing", which was true of the LANDING and is spent: the retry LANDED in a later pass (see the `WAVE-C UPDATE` block).**

1. **`R1`'s pinned marker DID NOT DISCRIMINATE.** The spec's pinned marker (`typeof window`, `window`/`document` *provenance*) is satisfied by **the real boot AND the shim boot** — `typeof window` is `'object'` in the real realm **and** the shim defines `window`/`document` — so **as pinned, `R1` could not have failed for the right reason** (`R1`'s own fail state is a **re-scope finding**, never a pass). **The SpecWriter re-pinned it — ⟶ LANDED while this pass ran** (`docs/specs/ci-ui-leg.md`'s AMENDMENT BLOCK **`M-1`** + the amended `§3.0` `R1` row: the discriminator is now the **ELEMENT/RENDERER-API provenance** — the observed element's constructor name and the computed style's class name — **never `typeof window`**, with the vacuity challenge (`U-11`) answered explicitly). The leg's landed evidence is the **typed** pair `HTMLDivElement` / `CSSStyleDeclaration`, which the shim cannot produce. **The re-pin is a SPEC defect, not a leg defect**, it was landed in `docs/specs/ci-ui-leg.md` **by the wave-C SpecWriter pass**, and **this tracker pass did not write it** — the spec's remaining residue is its §7 honest statements (items 1/2/7 still describe the pre-landing tree).
2. **`RK-14`'s flake class is CONFIRMED REAL *HERE*.** The sandbox **forbids `/dev/shm` writes**, so **an Electron renderer intermittently dies `SIGTRAP` at bootstrap** — measured **≈1-in-3 for back-to-back boots** — and **the pre-existing divergence leg is flaky identically** (it is the same spawn, now the same helper). **Consequence, stated honestly:** `npm run ui` can **legitimately exit `2` PRECONDITION-FAILED with no measurement taken** — that is **the specified authority order** (§3.6 exit 2 / `PRE-1`/`PRE-3`: *a `ui` green is never stronger than a `divergence` red*), **not a bypass, not a skip and not a `0`**. **Whether the `ui` leg should RETRY a bootstrap-`SIGTRAP` boot was an OPEN ARCHITECT DECISION — ⟶ ANSWERED AND LANDED 2026-09-27 (third pass): the architect RULED the BOUNDED RETRY and it IS IMPLEMENTED (`docs/specs/ci-ui-leg.md` §3.7 `RT-1`–`RT-9` + its PRECEDENCE CLAUSE; `scripts/electron-ui.mjs`; `39` new `RT-*` rows, the unit's set `68/68` green; the as-filed wording is kept for provenance)** (`docs/decisions.md` `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED`), because a retry is a **new flake-policy contract row**, not a bug fix. **No retry was added by this landing** *(true of THAT landing — the retry LANDED in the later pass named above; see the `WAVE-C UPDATE` block)*.

**⟶ WHAT IS STILL OWED — THE CURRENT LIST (2026-09-27, third pass; this list SUPERSEDES the second-pass list below):** **(1) the adversarial pass's findings are now LARGELY FIXED** — the two host-code defects the independent blind run surfaced (the scratch-profile cleanup and the unhandled-`EPIPE` crash that hid every attempt record) are **FIXED**, the blind record's four FAILs are **all dispositioned**, and the retry's `U-14` masking probe is largely answered by the `39` `RT-*` stub rows plus the out-of-tree `32`-mutation matrix (**the pass's own record — spec §3a/§3b, `OWED`, 14 seeds `U-1`…`U-14` — is still owed, and this pass does not claim it ran**). **(2) the per-unit DOCUMENTATION REVIEW (item 10d/RCA-6) — STILL OWED** (record to `archive/reviews/`, findings into these trackers). **(3) THE LIVE LEGS — BLOCKED ON ENVIRONMENT, not on this unit:** *(**⟶ SUPERSEDED 2026-09-27, FOURTH pass: the live legs are NOT blocked — the "ENVIRONMENT" attribution was a **MISATTRIBUTION** of a corrupted in-repo npm shim, repaired; **both legs ran GREEN** (`R13 RESULT: 9 checks, 0 failures`; `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`). The superseded reading follows.)* the host's Electron runtime has become non-functional, so `npm run ui` and `npm run divergence` **cannot run** (signature + the A/B proof it is not this unit's: the `WAVE-C UPDATE` block). **Nothing else gates a DONE row; and a DONE row written without the live legs' evidence is a review finding.** *(The second-pass list below is kept for provenance.)*

**WHAT IS STILL OWED (this is the whole list — the unit is NOT `DONE` on any of it):** **(1)** the per-unit **adversarial pass** (RCA-3) — `docs/specs/ci-ui-leg.md` §3a/§3b are **`OWED`** as filed, with the 13-row seed set (`U-1`…`U-13`); **(2)** the **blind-greens** gate (item 10a) — **no `*-greens.md` set exists for this unit**; **(3)** the per-unit **documentation review** (item 10d/RCA-6) — including the §3a/§3b status flip and the archive record; **(4)** the **`R1`-marker re-pin + the scripts-count correction** in `docs/specs/ci-ui-leg.md` — **⟶ BOTH LANDED WHILE THIS PASS RAN (the wave-C SpecWriter's `M-1`/`M-2` amendment blocks):** `R1`'s pinned clause is now the **discriminating ELEMENT/RENDERER-API provenance** (`HTMLDivElement`/`CSSStyleDeclaration`, **never `typeof window`**, with the vacuity challenge `U-11` answered explicitly), and the count is re-pinned as **TWELVE** keys (`package.json:8-21`, `ui` at `:19`) with the as-filed `12 → 13` claim struck in place; **the remaining SpecWriter-side item is that file's §7 honest statements (items 1/2/7 still describe the pre-landing tree)**; **(5)** the **architect's retry decision** for finding 2. **A DONE row written before those land is a review finding** (`AGENTS.md` items 3/10a/10c/10d, RCA-3/RCA-4/RCA-6) — **and note the shape of the list honestly: (4) is the SPEC-SIDE item and the SpecWriter has discharged it; the DONE-BLOCKING gates still open are (1) the adversarial pass, (2) the blind greens, (3) the documentation review, plus (5) the architect's retry decision. Nothing is waived by (4) landing: the unit still may not be marked `DONE`.**

**LAYER ATTRIBUTION (state it, so no row here is over-read):** the red/green rows are **[T]** (vitest, no window); the five `R*` rows and the ONE measurement are **[U]** (a real renderer in a real window, under a temp profile — **not** the packaged app); `battery` is **[B]** (shim host under node); **only `npm run divergence` is `[A]` assembled-app evidence, and it is STRUCTURAL-SURFACES-ONLY — never IPC-layer.** **What this landing does NOT buy:** no attribute row (`H-r10`'s extractor is still `U-DIVERGENCE-EXT`'s; `M-46` stays `UNMEASURABLE` — this unit may **not** convert it), no geometry/layout proof, no IPC proof, no `provident.dispatch`-is-a-real-gesture claim, and **no proof the shim is faithful** (it is demoted to **pre-filter**, not retired). The `Q7` **Electron-44 risk is EXERCISED but NOT discharged**: the leg is the first live-window contact with that stack, and the flake of finding 2 is exactly the class `Q7` left open.

**PROCESS RECORD (so a fresh supervisor can audit it in one read):** this block is **ADDED**; the `U-ENGINE-PIN` and `U-ENGINE-DRIFT` DONE records above, the `WAVE-B MEASUREMENT CHECKPOINT` block and the `HANDOVER UPDATE 2` block are **not restated, not superseded and not edited** except for the dated count annotations this pass owed. **Tracker reconciliation landed in this pass:** this file (the checkpoint, row `C1`'s corrected `Blocked on` cell, the dated suite-count annotations, the `## OPEN` prose and the totals line), `docs/decisions.md` (**`REALDOM-UI-LEG-LANDED` + `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED`**), `docs/pending.md` (the `ui`-leg row's `NOT STARTED` clause → **LANDED-GREEN-BUT-NOT-DONE** + the devDependency row's stale *"unverified until `U-REALDOM-BOOT` lands"* clause), `docs/FORKER.md` (the `ui`-leg table cell and the outside-the-trio `ui` row), and `docs/specs/ci-divergence-leg.md` (its filing-note `M-2` cell + the second *"`OWED — not filed`"* parenthetical in the boundary note — **status notes in that file's own `SUPERSEDED` convention; no normative clause amended**). **Read, not written:** `docs/specs/ci-ui-leg.md` (a parallel **SpecWriter** owns it and **amended it while this pass ran** — its `M-1` `R1` re-pin on the discriminating element/renderer-API provenance and its `M-2` scripts-count re-pin to **TWELVE** keys are **quoted from, never written by, this pass**; that file's §7 honest statements still describe the pre-landing tree) and `docs/defects.md` (**read and NOT changed: every reference to the `ui` leg there is accurate — the file's `## OPEN` table is empty and its `LIVE-OP-REJECT` row is CLOSED; no stale "not landed" clause exists in it**). **Unchanged by this pass:** `src/**`, `tests/**`, `scripts/**`, `package.json`, the `N = 9` divergence pin, `ALL_TOOLS = 21`, `RpcMethod = 21`, the battery's **184/0**, and both DONE records.

### WAVE-C UPDATE — `U-REALDOM-BOOT` (2026-09-27, third pass): the retry is RULED + IMPLEMENTED, the unit's rows are `68/68` green, the blind gate has RUN — and the LIVE LEGS are BLOCKED on an Electron-runtime ENVIRONMENT regression
> **⟶ ✅ THIS BLOCK'S BLOCKER IS RESOLVED AND WAS MISATTRIBUTED (2026-09-27, FOURTH pass — the npm-shim RCA): the cause was a CORRUPTED npm SHIM INSIDE THIS REPO's `node_modules` (`node_modules/electron/cli.js`, a shell script re-execing itself), REPAIRED — and BOTH LIVE LEGS RAN GREEN post-repair (`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`; `npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`, `427x22` at `fontSize="16px"`). READ THE `### RESOLVED + MISATTRIBUTED` SECTION BELOW THIS BLOCK BEFORE QUOTING ANY "ENVIRONMENT REGRESSION" CLAUSE IN IT — that attribution is WRONG and superseded; the unit's status (`LANDED-GREEN-BUT-NOT-DONE`) is unchanged, and what remains is the per-unit documentation review + the supervisor's DONE row.** *(**⟶ BOTH OF THOSE ARE NOW DISCHARGED (2026-09-27, the DONE pass): the documentation review RAN (`archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md`) and the `DONE` row IS WRITTEN — the unit is `DONE` (the record is the `## DONE — U-REALDOM-BOOT` section above; the `⟶ WAVE-C BLOCK STATUS` table marks this block's `LANDED-GREEN-BUT-NOT-DONE` clause and its remaining-items list DISCHARGED). This annotation is the ONLY edit this pass made inside the wave-C blocks; the blocks' own text is otherwise untouched.**)*

> **⚑ STATUS, READ THIS FIRST: the unit is STILL `LANDED-GREEN-BUT-NOT-DONE`.** This update **does NOT mark it `DONE`**, and no clause of the `WAVE-C CHECKPOINT` block above is rewritten (that block is the second-pass record, kept as provenance). **What moved:** the architect's **retry decision is ANSWERED and the retry is IMPLEMENTED AND STUB-VERIFIED**; the unit's rows are **`68/68` green** (`39` new `RT-*` rows from the retry pass in `tests/ui-leg-contract.test.ts` — **`59` rows in that file today** (`18` non-`RT` + **`41`** `RT` after the `F-1` fix's two) — plus the **9** seam rows); the **blind-greens gate (item 10a) HAS RUN** (`docs/specs/ci-ui-leg-greens.md`: **26 scenarios = 16 PASS / 4 FAIL / 6 NOT-BLIND-RUNNABLE**, all four FAILs dispositioned below); **two host-code defects found by that blind run are FIXED**; the trio is green on a **larger** suite. **What did NOT move: the LIVE legs `npm run ui` and `npm run divergence` CANNOT RUN** — the host's Electron runtime has become non-functional (**ENVIRONMENT**, A/B-proven not this unit's), so **the retry change has had NO live verification** and the live green quoted above is **PRE-REGRESSION evidence that cannot retire a live row**. **Still owed: the per-unit documentation review (item 10d/RCA-6), the adversarial pass's own record (spec §3a/§3b, still `OWED`), and the two live legs' evidence — BLOCKED on the runtime.** *(**⟶ THOSE LAST TWO CLAUSES ARE SUPERSEDED 2026-09-27, FOURTH pass:** the runtime blocker was a **misattribution** of a corrupted in-repo npm shim (repaired) — **both live legs' evidence has been obtained and is green**; what remains is the **per-unit documentation review** and the **supervisor's `DONE` row**. Read the `### RESOLVED + MISATTRIBUTED` section below.)* *(**⟶ AND 2026-09-27, SEVENTH pass: the documentation review has RUN** — record `archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md`, findings landed in these trackers — so **the `DONE` row is the only gate left on this unit**.)*

**THE RULING AND THE LANDED CLAUSE SET.** The architect ruled that the `ui` leg must **retry failed bootstraps**. It landed as the first-class contract clause set **`RT-1`…`RT-9`** (`docs/specs/ci-ui-leg.md` §3.7) **+ its PRECEDENCE CLAUSE**, and as its implementation in **`scripts/electron-ui.mjs`** (the cleanup half of the profile fix sits in **`scripts/electron-spawn.mjs`**). **Ruled-and-landed shape, exact:** the retryable set is **two SIGNATURES — never a text match, never a generic "anything failed" predicate** — **(i)** an **observed child death** (`(code, signal)` verbatim) **with an unresolved handshake**, and **(ii)** the **TIMEOUT class** (the **absence of an observed termination** + the handshake-not-completed fact, recorded verbatim — the **PRECEDENCE CLAUSE**, which **supersedes `RT-1`'s as-filed conjunction IN PART** and is implemented as an **observed record fact, NEVER by re-parsing the timeout message**); **max `4` attempts per boot** (the operator may **LOWER** via `PROVIDENT_UI_BOOT_ATTEMPTS`, **never RAISE**; a malformed value ⇒ **exit `1`**); **a fresh scratch profile per attempt**; **fixed backoff `250`/`500`/`1000 ms`**; **`30 000 ms` per-attempt handshake timeout** (`PROVIDENT_UI_BOOT_TIMEOUT_MS`); **`121 750 ms` per-boot ceiling**; **every attempt recorded with its verbatim signature**; a retried green **LABELLED** (`RT-6 RETRY GREEN … attempt=<k> (retries=<k-1>)`); **exhaustion exits `1`** with **`RT-7 EXHAUSTED: n of n attempts failed (k retries)`**, **every signature in attempt order** and a **no-measurement statement**; the retry is **LEG-LOCAL** — the shared helper and the divergence leg carry **none**, and **`N = 9` is untouched**. **`RT-2`'s classes stay NON-retryable and consume no attempt** (a completed boot with a wrong row, a genuine divergence red, a DISPLAY absence, a programming error); **`RT-8`'s `PRE-1`/`PRE-3` authority order is NOT weakened**; **`RT-9`(a)** keeps the divergence leg's identical flake outside this unit's scope.

**THE TWO HOST-CODE DEFECTS (found by the independent blind run, FIXED this pass).** **(1) the scratch profiles were NOT deleted on exit.** Root cause **established by measurement**: `SIGKILL` reaches only the Electron **main** process while its **Chromium helpers outlive it and RE-CREATE the profile dir after the delete**. **FIXED** with a **delete-and-verify sweep** in `scripts/electron-spawn.mjs`'s cleanup **plus a recorded cleanup report on ALL FIVE exit paths** (green, thrown, exhaustion, `SIGINT`/`SIGTERM`, precondition) — **`ls -d /tmp/provident-ui-run-*` is EMPTY after every path now** (the blind run had measured **43** accumulated roots and a surviving root after an `exit 0`, with no cleanup record). **(2) a pre-existing unhandled-`EPIPE` crash on a dying child** — the transport now **re-throws from `send`**; that crash had **prevented any attempt record from being printed**, i.e. it hid the very recording `RT-5` requires.

**THE ROWS AND THE RED-FIRST RECORD (honest).** **`39` new `RT-*` rows from the retry pass**; `tests/ui-leg-contract.test.ts` now holds **`59` rows** = `18` non-`RT` + **`41`** `RT` (**the spec's `B3-MS-1` recorded the retry pass's `57`/`39` reading; that residue is now CLOSED spec-side by the documentation review — AMENDMENT BLOCK 7 `B7-1` — the two extra `RT-*` rows being the `F-1` fix's `RT-0a`/`RT-0b`**); with the **9** seam rows the unit's set is **`68/68` green**. **Recorded honestly: the `39` `RT-*` rows were written AFTER the first implementation of the retry** — the **red-first order was INVERTED for that clause set** (RCA-1; already recorded at the spec's `B3-MS-2`), and **falsifiability was established OUT-OF-TREE** by a **32-mutation matrix** plus stub probes against a `/tmp/` copy of the leg. **The follow-up change restored red-first order:** the **timeout re-point** produced a real red-first cycle — **3 red (`RT-4c`, `RT-1e`, `RT-7f`) → green** after the classification change.

**THE BLIND VERIFICATION (gate 5, `docs/specs/ci-ui-leg-greens.md`) — 26 scenarios = 16 PASS / 4 FAIL / 6 NOT-BLIND-RUNNABLE; the four FAIL dispositions:** *(**⟶ COUNT CORRECTED 2026-09-27, the per-unit documentation review: that form is the as-filed summary of the dated run; the greens file's own §4 tables enumerate `32` scenario ids = `24` PASS / `4` FAIL / `4` NOT-BLIND-RUNNABLE, and the corrected arithmetic + the re-runnable method are in its §3 `CORRECTION NOTE`. **The six `NBR-01`…`NBR-06` ids are the record's NOT-BLIND-RUNNABLE REASONS, not scenario verdicts.** No FAIL, no disposition and no `NBR-*` row changes by it.**)* **(i)** `R0-04` — the profile-cleanup defect ⇒ **FIXED** (defect 1 above; now regression-covered on all five cleanup paths); **(ii)** `RT-05` — the timeout did not consume an attempt ⇒ **FIXED** (the PRECEDENCE CLAUSE; the `3 red → green` cycle above is its red-first record); **(iii)** `RT-06` — the spec's `122 000 ms` label contradicted its own `121 750 ms` derivation ⇒ **re-pinned to `121 750 ms`** (spec-owned; landed as the spec's FIX 1); **(iv)** `RT-08` — the two retry knobs' names were not recorded in `docs/decisions.md` ⇒ **recorded** (that file's annotated `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED` row + its trailing note 9; the blind run measured `grep -c PROVIDENT_UI docs/decisions.md` = `0` before it). **The 6 NOT-BLIND-RUNNABLE rows are the retry's RUNTIME half** — a real retry, a real exhaustion, a genuinely red precondition — **unreachable without a working Electron and without reading implementation files**; they are **not passes**, and **this pass does not convert them**.

**THE LEGS MEASURED THIS PASS (post-change tree):** `npm test` `[T]` **58 files / 863 passed / 2 skipped / 0 failed** (**was `58 / 822`** — the delta is the retry pass's rows, and it is **not** a re-baseline of the engine counts `55 / 789` and `56 / 795`) · `npm run typecheck` **clean** · `npm run build` **clean** · `npm run battery` `[B]` **184 checks / 0 failures**. **`npm run divergence` `[A]` and `npm run ui` `[U]` CANNOT RUN — see the blocker.**

**⟶ ✅ RESOLVED + MISATTRIBUTED (corrected 2026-09-27, FOURTH pass — the RCA pass; read this before the block below, whose "ENVIRONMENT REGRESSION" attribution is **WRONG and SUPERSEDED**).**

**THE BLOCKER RECORDED BELOW WAS MISATTRIBUTED TO THE HOST/SYSTEM. THE TRUE CAUSE WAS A CORRUPTED npm SHIM INSIDE THIS REPO'S `node_modules`, AND IT IS REPAIRED — BOTH LIVE LEGS RAN AND ARE GREEN ON THE POST-REPAIR TREE (all measured 2026-09-27).**

**ROOT CAUSE — ONE FILE, and it is inside this repo.** **`node_modules/electron/cli.js`** — the file **`node_modules/.bin/electron` symlinks to**, and the entry point **every** Electron spawn in this repo goes through — had been **corrupted into a self-executing loop**. Its content, verbatim:

```
#!/bin/sh
cd "/media/ryanr/Shared Files/Projects/Provident-Electron" || exit 9
exec "/media/ryanr/Shared Files/Projects/Provident-Electron/node_modules/.bin/electron" "$@"
```

— i.e. a **shell script that re-execs itself**, replacing the correct Node wrapper. **Every "boot" therefore re-entered `exec` in an infinite loop, burning ~99 % CPU and printing nothing.** **The tell that was misread as a wedged host:** the earlier failure mode was a **fast crash**; the recorded one was a **silent 99 %-CPU hang** — and that is exactly a corrupted entry point. A `strace -f` of the launch showed an **unbroken cycle of `openat(… node_modules/.bin/electron)`** with the dynamic loader re-running each time and **no `clone`/`execve` progress**, and `/proc/<pid>/status` read **`State: R (running)` at 99 % CPU**. **No syscall denial appeared in the trace (0 `EPERM`/`EACCES` markers)** — the hang was **never** a sandbox denial at boot.

**THE FIX.** The correct wrapper was **restored** (copied from a **healthy install of the same package**, `electron` 44.4.3/44.4.5 — identical wrapper): `#!/usr/bin/env node`, `require('./')`, `spawn(electron, process.argv.slice(2), {stdio:'inherit'})`, plus the SIGINT/SIGTERM/SIGUSR2 forwarding. **After the repair a boot probe exits `0` in `176 ms` printing `BOOT-OK 44.4.5`.**

**WHY IT WAS MISATTRIBUTED — two red herrings, recorded because it is the lesson.** **(1) A SECOND REPOSITORY on the same machine runs the same spawn vector** — this repo's divergence harness was itself derived from `Astrographer`'s — so running *its* harness reproduced the same `SIGTRAP` / `1 checks, 2 failures` and **appeared** to prove the environment was at fault, when in fact **both were hitting their own copies of the same problem**. **(2) The `/dev/shm` permission denial is REAL but is a SEPARATE, OLDER failure mode** (`/dev/shm` is `drwxrwxrwt` mode 600 root-owned here, so a non-root write fails) **already mitigated by the landed `--disable-dev-shm-usage` + scratch-profile flags** — it was **not** the cause of the hang. **The A/B evidence used last pass ("the unmodified HEAD helper fails identically") was CORRECT ABOUT THE HELPER AND WRONG ABOUT THE CAUSE:** both versions spawn through the **same corrupted entry point**, so that experiment **could not discriminate**.

**CORROBORATION AFTER THE FIX (all measured this pass, post-repair — the live evidence this unit's gate required):**

| Leg | Result (post-repair, 2026-09-27) |
| --- | --- |
| **`npm run divergence`** `[A]` | **`R13 RESULT: 9 checks, 0 failures`** — all **8** comparisons green, **census `12/12` on both legs** (`N = 9` intact) |
| **`npm run ui`** `[U]` | **exit 0**; **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**; the **ONE** measurement **`427x22`** at **`fontSize="16px"`** read back through **`provident.get_rendered_html`**; **no retry needed (`retries=0`)**; scratch cleanup verified — **`removed 2 scratch profile(s) … leftover profiles: NONE`** |

**ONE ENVIRONMENT NOISE LINE REMAINS, AND IT IS NOT A FAILURE:** `dconf-CRITICAL … unable to create file '/run/user/1000/dconf/user': Permission denied` — **settings persistence only**, no row and no measurement depends on it.

**RESIDUAL RISK — this is an npm-shim-INTEGRITY hazard, NOT a system hazard.** The corrupt file's **mtime is `2026-09-24 14:01`**, i.e. it was written by an **install/reinstall that replaced the wrapper**, and **only `electron/cli.js` was affected** (`node_modules/.bin/{esbuild,tsc,vitest}` are intact). **Nothing in this repo detects it:** a corrupted entry point produces a **silent CPU-spinning hang**, which is **indistinguishable from a wedged host** unless someone traces it. **RECOMMENDED, NOT IMPLEMENTED (this pass is documentation-only):** a **one-line integrity check** as part of the divergence/`ui` leg's **precondition** — is the **resolved Electron entry point** the expected Node wrapper (`file -L` says a Node script, not a shell script)? **See `docs/pending.md` §E's integrity-check item and `docs/decisions.md`'s new ACTIVE lesson row.** *(The corruption and the repair touch **no `src/**`, `tests/**` or `scripts/**` file** — the corrupt path is a `node_modules` install artifact, and the repair restored a published file's content.)*

**THE SUPERSEDED BLOCKER RECORD — ⚠ READ THE RESOLUTION ABOVE FIRST: the "ENVIRONMENT REGRESSION, NOT THIS UNIT'S" attribution is WRONG (it was an in-repo corrupted npm shim, repaired), and BOTH LIVE LEGS ARE NOW GREEN; nothing in the block below is live status.** **⛔ THE BLOCKER AS RECORDED — THE HOST'S ELECTRON RUNTIME IS NON-FUNCTIONAL (ENVIRONMENT REGRESSION, NOT THIS UNIT'S).** Signature, exact: **a direct Electron launch produces NO output and must be killed after 25–40 s**; `npm run divergence` fails **`✗ electron connect/drive failed: MCP error -32001: Request timed out`** → **`R13 RESULT: 1 checks, 2 failures`**; **`npm run ui` hangs in its own precondition**; and a bare **`electron -e 'console.log(1)'`** probe **also hangs**. **PROOF IT IS ENVIRONMENTAL (A/B run by the implementer):** the **same failure reproduces with the UNMODIFIED HEAD spawn helper**, it **began BEFORE any of this pass's edits**, and the bare probe hangs **outside this repo's code entirely**. **Contributing factors recorded:** the divergence leg's own **leaked Electron wrapper processes (~95 % CPU each)** and the sandbox's **`/dev/shm` denial**. **What it costs, stated plainly:** the **last GOOD divergence evidence remains `R13 RESULT: 9 checks, 0 failures`** (measured earlier on the post-change tree) and **the retry change has had NO live verification** — every `RT-*` row is node/stub-level, and the runtime half is the blind record's `NBR-03`/`NBR-04`/`NBR-05`. **It is NOT a `U-REALDOM-BOOT` defect and it amends NO contract clause:** the `1 checks, 2 failures` line is the ENVIRONMENT signature, **never a retry case** (`RT-8`) and **never a `ui` pass**; and **no unit may read the missing live leg as a green.**

**⟶ ✅ THE RECOVERY RUNBOOK IS DISCHARGED; THIS IS WHAT REMAINS (2026-09-27, FOURTH pass).** The runtime **recovered** (the corrupted shim was repaired — see the resolution block above), so steps **(1)** and **(2)** of the runbook below are **EXECUTED, not pending**, and they printed exactly the required live evidence: **(1)** `npm run divergence` → **`R13 RESULT: 9 checks, 0 failures`** (`N = 9`, census `12/12` both legs) — the **strict precondition** SATISFIED for the built tree; **(2)** `npm run ui` → **exit 0**, **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**, **`retries=0`**, the ONE measurement **`427x22`** at **`fontSize="16px"`**, scratch cleanup **verified** (`leftover profiles: NONE`). **What REMAINS before a `DONE` row — the whole list, and it is documentation/review work, not runtime work:** **(a)** the per-unit **documentation review** (item 10d/RCA-6 — record to `archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md`, findings into these trackers); **(b)** the **adversarial pass's own record** (RCA-3 — spec §3a/§3b, seeds `U-1`…`U-14`; the two defects the blind run surfaced are the already-FIXED part of it); **(c)** the unit's **`DONE` row** (the supervisor's). **The retry's runtime half is now MECHANICALLY REACHABLE** — the timeout-class retry is drivable with **`PROVIDENT_UI_BOOT_TIMEOUT_MS`** and *"no retry"* with **`PROVIDENT_UI_BOOT_ATTEMPTS=1`** — so the `RT-1`(ii)/`RT-3`/`RT-4`/`RT-5`/`RT-6`(a)/`RT-7` rows the blind record filed **NOT-BLIND-RUNNABLE** are **reachable and drivable** *(**reachable is NOT "re-run":** this pass re-ran only the two green legs above; **it did NOT induce a retry or an exhaustion**, so those rows are **NOT converted to passes** here, and the blind record's `NBR-03`/`NBR-04`/`NBR-05` are **not** re-dispositioned — the knobs make them drivable, an operator run makes them settled).* **The stale-form warning STANDS: the `5/5 rows green` form must not be re-quoted.**

**PROCESS RECORD (so a fresh supervisor audits it in one read).** This block is **ADDED**; the `WAVE-C CHECKPOINT` block above, both DONE records, the `WAVE-B MEASUREMENT CHECKPOINT` block and the `HANDOVER UPDATE 2` block are **not restated, not superseded and not edited** — only the dated annotations this pass owed (the stale `5/5 rows green` quotes, the older `822` suite counts, `27/27` → `68/68`, the *"retry decision is OPEN"* clauses, and the "no retry was added" sentence, which was true of the **landing** and is spent). **Tracker reconciliation landed in this pass:** this file (this block, the dated annotations, row `C1`'s corrected `Blocked on` cell, row `C2`'s runnability note, the `## OPEN` prose and the totals line); `docs/decisions.md` (**the new retry-policy row + the new Electron-runtime environment-blocker row**, and the `REALDOM-UI-LEG-RK14-FLAKE-CONFIRMED` row's as-filed `OPEN` title annotated **ANSWERED-AND-LANDED**); `docs/pending.md` (**the new §E environment-blocked live-leg row** + the `ui`-leg row's status note + the dated count annotation); `docs/FORKER.md` (the `U-REALDOM-BOOT` row, the outside-the-trio `ui` row, the dated counts). **Read, not written:** `docs/specs/ci-ui-leg.md` (the **SpecWriter's** file — its AMENDMENT BLOCK 3, its PRECEDENCE CLAUSE and its ceiling re-pin are **quoted from, never written by, this pass**), `docs/specs/ci-ui-leg-greens.md` (the blind record — quoted, not edited), `docs/defects.md` (**read and NOT changed: its `## OPEN` table is empty, `LIVE-OP-REJECT` sits in `## FIXED (in this repo)`, and **no** stale `ui`-leg or count clause exists there** — the two defects fixed this pass are **HOST/leg** findings, the `R13-HOST-FIX` precedent, so **no `docs/defects.md` row and no `docs/HANDOFF.md` round is owed for them**), `docs/HANDOFF.md` (**read and NOT changed: it carries no `ui`-leg, retry, `822` or `5/5 rows green` clause**). **Unchanged by this pass:** `src/**`, `tests/**`, `scripts/**`, `package.json`, `N = 9`, `ALL_TOOLS = 21`, `RpcMethod = 21`, the battery's **184/0**, both DONE records, and every normative clause of the specs.

**COULD NOT RECONCILE (recorded so it is not silently smoothed; all three are SPEC-side and not this pass's to fix):** **(i)** `docs/specs/ci-ui-leg.md` `B3-MS-1` and its appended status row state the retry's file holds **`57`** rows; the measured count is **`59`** — the SpecWriter's to re-pin. **(ii)** the same file's §3a/§3b still read **`OWED`** (*"no adversarial pass has run"*) while this pass's facts have the adversarial-class findings **largely FIXED**; this block therefore states **both halves separately** (findings FIXED · pass record still `OWED`) rather than picking one. **(iii)** its `N-9` cell and §3b note record the blind run's `R0-04`/`NBR-01` as **`REPORTED, NOT RECONCILED`**, i.e. the spec does not yet carry the **fix** for `R0-04`; the fix is recorded here and in `docs/decisions.md`, and the spec's own status is left to the SpecWriter.

### WAVE-C UPDATE 2 — `U-REALDOM-BOOT` (2026-09-27, FIFTH pass, the `F-2` RCA + fix): **the live battery HAS RUN, its retry-runtime rows are CLOSED, `F-2` IS FIXED — `F-1` REMAINS, and the documentation review + the `DONE` row are still owed**

> **⟶ ONE HONESTY CORRECTION TO THE THIRD-PASS BLOCK ABOVE, stated before anything else (read it as a correction, not as a contradiction):** that block's `WAVE-C UPDATE` says the blind run's four FAILs were **"all dispositioned"** and, in the same breath, that **two host-code defects were FIXED**. **The `RT-05` half of "all dispositioned" was NOT settled by that pass — it was the `F-2` race, and this pass is what fixed it.** So read the third-pass sentence as: **`R0-04`** (the profile cleanup) and the **`EPIPE`** crash were **FIXED** there; **`RT-06`/`RT-08`** were **CLOSED** there by the spec re-pin and the `docs/decisions.md` record; **`RT-05` remained a REAL DEFECT until this pass.** **That is the one place where this block corrects, rather than supersedes, the paragraphs above** — and it corrects a **reading that made the retry policy look finished when its timeout half was still race-dependent**: the live battery then found the race, and this pass fixed it.

> **⚑ STATUS, READ THIS FIRST: the unit is STILL `LANDED-GREEN-BUT-NOT-DONE`.** This update **does NOT
> mark it `DONE`**, it rewrites **no** clause of the `WAVE-C CHECKPOINT` / `WAVE-C UPDATE` blocks above
> (they are kept as the second/third-pass records), and it **amends no normative clause of
> `docs/specs/ci-ui-leg.md`** (its FIFTH amendment block is a **status/annotation** note).

**WHAT MOVED, in one list.** **(1) THE LIVE BATTERY HAS RUN** (`docs/specs/ci-ui-leg-live-status.md`,
gate 6): the five declared rows `R0`–`R4` are **live-green** — **`11/11` assertions, ONE measurement
`427x22` at `fontSize="16px"`, `retries=0`** — and all four legs are green (`npm run divergence` →
**`R13 RESULT: 9 checks, 0 failures`**; `npm test` **58 files / 863 passed / 2 skipped / 0 failed**;
typecheck clean; battery **184 checks / 0 failures**). **(2) THE RETRY'S RUNTIME ROWS ARE CLOSED:** the
blind run's **all six `NBR-*` rows** were driven live — a **real retry**, a **real exhaustion**
(`RT-7 EXHAUSTED: 4 of 4 attempts failed (3 retries)`, exit `1`), the **timeout class as a real retry
case**, the **labelled retried green** (`RT-6 RETRY GREEN (boot A): attempt=2 of 4 (retries=1, …)`), a
**genuinely red precondition (exit `2`)**, the **DISPLAY absence (exit `3`)** — plus `RT-2` class 1
(no retry for a completed boot with a wrong row), the `SEAM-*` node rows (**68/68** on the unit's two
files) and the divergence leg's spawn-boundary argv. **The runtime half is no longer
NOT-BLIND-RUNNABLE.** **(3) `F-2` IS FIXED** — the timeout-class retryability **RACE** is gone: the leg
now **snapshots the handshake state at the instant the raced verdict settles**
(`handshakeResolvedAtSettle`, `scripts/electron-ui.mjs:641`, read; handed to the predicate at `:660`,
**before** the grace `await` at `:651`), so **both halves of the retryable signature describe the timer
instant**; the boundary is **MONOTONIC** — **`120`/`200`/`260 ms`** → **`RT-7 EXHAUSTED: 4 of 4
(3 retries)`**, exit `1`, **every attempt recorded in order**; **`300 ms`** → **accepted**, **`11/11`**,
**`427x22`** — and the pass is **regression-free** (unit **`68/68`**, suite **58 / 863 / 2 skipped /
0 failed**, typecheck clean, battery **184/0**, divergence **`9/0`**, `npm run ui` → **exit `0`**,
**`11/11`**, **`427x22`**, **`retries=0`**). **(4) THE GREENS' `RT-05` FAIL's DISPOSITION IS CORRECTED
to REAL DEFECT, NOW FIXED** (its row text in `docs/specs/ci-ui-leg-greens.md` is **not** rewritten; the
disposition note lives in `docs/specs/ci-ui-leg.md`).

**⟶ ✅ BOTH LIVE FINDINGS ARE NOW CLOSED — `F-1` CLOSED BY A LATER PASS (2026-09-27, SIXTH pass — the `F-1` RCA + fix).** **`F-1` (the leftover scratch profiles) IS FIXED AND VERIFIED.** **Root cause:** `scripts/electron-spawn.mjs` spawned **`node_modules/.bin/electron`**, a **symlink to `electron/cli.js`** — a Node **WRAPPER that `spawn`s the real Electron binary as its own child** — so the `child` handle the helper held was the **wrapper, not the app**: killing it **orphaned** the real Electron main process and its Chromium helpers, which **re-created the scratch profile AFTER `cleanupProfiles` had unlinked and verified it**. The leg's report was thus **true at the moment it looked and false afterwards** (`leftover profiles: NONE` while the directory survived; **31** roots accumulated in one session). **The discriminating evidence:** the leftovers held **only Chromium artifacts and NO `provident-security.json`** — the leg's **own seeded store WAS deleted**, which is what made the re-creation invisible. **The fix (LANDED, `scripts/electron-spawn.mjs` + `scripts/electron-ui.mjs`):** **(1)** `electronBin` now resolves **the BINARY** (`node_modules/electron/dist/electron`, falling back through the package's `path.txt` contract to the bare package entry) under an explicit **no-fallback-to-the-wrapper** rule that **throws a named error** if no binary is found — **one process, one handle, no orphan**, stdio chain **single-hop** (**`detached: true` + process-group was TRIED AND BACKED OUT** — it regressed the SDK stdio transport, `R13 RESULT: 1 checks, 2 failures`); **(2)** the leg's **`process.on('exit')` cleanup hook is registered at the moment `scratchRoot` is created**, not ~350 lines later after the retry-config validation — the malformed-config path (`PROVIDENT_UI_BOOT_ATTEMPTS=abc` ⇒ `process.exit(1)`) had been exiting **BEFORE the hook existed** and leaking an **EMPTY** root; the hook is **idempotent** and a **`typeof activeBoot !== 'undefined'` guard** covers an exit during module evaluation. **THE EXIT-PATH MATRIX — all paths now leave ZERO roots, checked immediately and after an 8 s settle:** green ⇒ exit **0**, roots **0** (with **`UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`**) · malformed config ⇒ exit **1**, roots **0** · timeout-class exhaustion ⇒ exit **1**, roots **0** · **`npm run ui`** ⇒ roots **0** · **0 surviving `electron` processes**; **0 roots after the divergence leg too**. **The leg's report is UNCHANGED and now MATCHES the disk.** **Regression-free:** unit rows **`68/68`**; `npm test` **58 files / 863 passed / 2 skipped / 0 failed**; typecheck clean; build clean; battery **184 checks / 0 failures**; **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`** (the pinned **`N = 9`** intact); and **the `F-2` race fix still holds** (`120`/`200`/`260 ms` ⇒ `RT-7 EXHAUSTED` exit `1` with every attempt recorded; `300 ms` ⇒ accepted, `427x22`). **The blind run's `R0-04` FAIL is dispositioned REAL DEFECT, NOW FIXED — its row text in `docs/specs/ci-ui-leg-greens.md` is NOT rewritten.** **THE ONE SPLIT THIS PARAGRAPH MUST CARRY:** the **earlier** "delete-and-verify sweep + recorded report" fix closed the **REPORTING half only** — the sweep was accurate when it ran and the orphan re-created the directory afterwards; **this pass closes the END STATE** (`docs/specs/ci-ui-leg-live-status.md` §6.1's split table). **Trackers landed in the same pass:** `docs/decisions.md` (**the new ACTIVE rows `UI-LEG-SPAWN-THE-BINARY-NOT-THE-WRAPPER` + `UI-LEG-CLEANUP-HOOK-AT-CREATION`** and their note), `docs/defects.md` (**`UI-LEG-LEFTOVER-PROFILES` FILED + CLOSED host-side — no `docs/HANDOFF.md` round owed**), `docs/specs/ci-ui-leg.md` (**AMENDMENT BLOCK 6** — status only; §3a `U-10`'s `UPDATE 2`), `docs/pending.md` and `docs/FORKER.md` (the leftover-profiles / spawn-entry-point clauses).

**⟶ SUPERSEDED (the "WHAT DID NOT MOVE" paragraph this replaces — kept as the FIFTH pass's reading, which was correct at that date):** the live battery's other finding **stood** as `F-1` OPEN — every green run left a scratch root holding BOTH attempt profiles on disk while the leg reported `leftover profiles: NONE` (measured **4 of 4** repo-leg green runs; plus a deterministic `npm test` leak of **6 empty roots/run** whose root cause is the exit-hook ordering — `docs/specs/ci-ui-leg-live-status.md` §6.1). It was a **hygiene + recording** defect (inside `/tmp`, **no** security store, **no** operator-profile write — the isolation half holds), it was **`scripts/**`-owned**, and it **blocked nothing about `R0`–`R4`**; the **blind run's `R0-04` FAIL was therefore still NOT closed**, and **`R0-04`'s earlier "FIXED" reading in the `WAVE-C UPDATE` block above is the profile-*cleanup* fix for the other path — and it turned out to be the REPORTING half only, which is why the live end state contradicted it.**

**THE OWED LIST, NOW — the remaining list is TWO ITEMS, and this supersedes the owed lists in the three blocks above:**
**(a) the per-unit DOCUMENTATION REVIEW (item 10d/RCA-6) — ⟶ RUN 2026-09-27 (the seventh pass): the record is `archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md`, and its findings landed in the active trackers in the same pass** (the spec's row-count residue `57`→`59` closed, the anchor remap added as AMENDMENT BLOCK 7, the greens file's own scenario arithmetic corrected to `32`/`24`/`4`/`4`, and the `RT-*` row-count pairings in this file / `docs/pending.md` / `docs/FORKER.md` corrected to `41`; **no normative clause amended and no `DONE` row written**). **It was ELIGIBLE because NO LIVE FINDING GATED IT: both live-battery findings (`F-1`, `F-2`) are CLOSED, the
blind run's `R0-04` and the greens' `RT-05` are dispositioned **REAL DEFECT, NOW FIXED**, the declared rows
`R0`–`R4` are live-green (`11/11`, ONE measurement `427x22`), and both live legs run green.** **(b) THE `DONE`
ROW — still owed** and it is the **supervisor's**; **no pass may infer it**, and **a DONE row written
without (a) is a review finding. With (a) now RUN, the `DONE` row is the ONLY gate left on this unit.**
**RECORDED AS STILL-OPEN RESIDUE, and NOT part of the remaining list above because neither gates a `DONE` row:**
**(c) THE ADVERSARIAL PASS'S OWN RECORD** (§3a/§3b, seeds `U-1`…`U-14`) — its **known findings are
FIXED** and its `U-14`(h) **classification half is settled live** by the `F-2` fix. *(**⟶ SUPERSEDED
2026-09-27, ADVERSARIAL-FIX pass — `OWED` IS SPENT and the whole clause is spent: the pass HAS RUN and its
record is LANDED in `docs/specs/ci-ui-leg.md` §3a (**ADVERSARIAL PASS RECORD**, `AP-1`…`AP-5`: read-only
full sweep of all 14 seeds, verdict `FIT for its DONE row`, 13 findings) + §3b (the landed findings table
`F-0` + `G-1`…`G-13`), and the pass's own HOST findings are now FIXED (see the `⟶ ADVERSARIAL-FIX PASS`
note below the `## DONE — U-REALDOM-BOOT` record). The as-written clause is kept as the pre-pass reading it
was.**)* **(d) THE RECOMMENDED, NOT-IMPLEMENTED SNAPSHOT-ORDERING TEST ROW** — a **TestWriter-side** change (documentation passes may write no `tests/**` file): a row that asserts the predicate is handed the handshake state **read at settle** (e.g. a harness that flips the handshake to resolved **during** the termination grace and requires the predicate to still see `false`; the landed `bootAttemptHarness` never exercises this — `tests/ui-leg-contract.test.ts:959-1018`, read). **RECOMMENDED because the unit's row set provably cannot catch this class:** the `RT-*` rows drive the predicate with **hand-built attempt records**, so they pin its **shape** but not the **live sampling point** — the race lives in the **order of two reads** in the leg's `catch` path, reachable only in a **real boot**. **(e) `docs/defects.md`
`UI-LEG-TIMEOUT-CLASS-RACE` AND `UI-LEG-LEFTOVER-PROFILES` are CLOSED host-side and NO `docs/HANDOFF.md` round
is owed for either** (HOST/leg-owned; the `R13-HOST-FIX` precedent).

**COUNTS (2026-09-27, FIFTH pass — these supersede the third/fourth-pass figures as the live ones).**`npm test` **58 files / 863 passed / 2 skipped / 0 failed** · `npm run typecheck` **clean** · `npm run
build` **clean** · `npm run battery` **184 checks / 0 failures** · `npm run divergence` **`R13 RESULT: 9
checks, 0 failures`** · `npm run ui` **exit 0**, **`UI RESULT: 0 failures (11/11 assertions green,
mapped onto the five declared rows R0-R4)`**, **`427x22`**, **`retries=0`** · the unit's two test files
**`68/68`** (`tests/ui-leg-contract.test.ts` **59** + `tests/ui-leg-seam.test.ts` **9**). **The unit
counts do not move: still 2 DONE (`U-ENGINE-PIN`, `U-ENGINE-DRIFT`), 18 open rows, 17 `BLOCKED` + row
`C1` landed-but-not-`DONE`, and NO third DONE row.** **⟶ RE-MEASURED UNCHANGED 2026-09-27 (SIXTH pass — the `F-1` RCA + fix): every figure above holds, and the fix pass added TWO verification rows to the list — `ls -d /tmp/provident-ui-run-*` is now EMPTY on every exit path (green · malformed config · timeout-class exhaustion · `npm run ui`), checked immediately and after an **8 s settle**, with **0 surviving `electron` processes** and **0 roots** after the divergence leg — so the leg's long-standing `leftover profiles: NONE` report finally MATCHES the disk (`F-1` CLOSED).** The unit counts still do not move: **2 DONE · 18 open rows · 17 `BLOCKED` + row `C1` landed-but-not-`DONE` · NO third DONE row** — and **`C1`'s remaining gates are now the per-unit documentation review and the `DONE` row only.** **⟶ CORRECTED 2026-09-27 (SEVENTH pass, the documentation review): that review HAS RUN (`archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md`), so `C1`'s remaining gate is the `DONE` row ONLY — and unit counts still do not move: 2 DONE · 18 open rows · 17 `BLOCKED` + `C1` landed-but-not-`DONE` · NO third `DONE` row.**

**PROCESS RECORD (so a fresh supervisor audits it in one read).** This block is **ADDED**; the
`WAVE-C CHECKPOINT`, the `WAVE-C UPDATE` and its `### RESOLVED + MISATTRIBUTED` section are **not
restated, not superseded and not edited** except for the row-`C1` cell annotation and the totals-line
pointer this pass owed. **Tracker reconciliation landed in this pass:** this file (this block + row
`C1`'s disposition note + the totals-line pointer), `docs/decisions.md` (**the new ACTIVE row
`UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE` + note 10 in its amendments list**), `docs/defects.md` (**the
new CLOSED host-side row `UI-LEG-TIMEOUT-CLASS-RACE`**), `docs/pending.md` (**§E's *"the retry has had
NO live verification"* clause annotated**), `docs/FORKER.md` (**the `ui`-leg cell's retry
live-verification clause annotated**), `docs/specs/ci-ui-leg.md` (**AMENDMENT BLOCK 5** — status only;
**no normative clause amended**) and `docs/specs/ci-ui-leg-live-status.md` (**`F-2` CLOSED with the RCA
+ evidence + post-fix boundary table; `F-1` left OPEN** *(**⟶ SUPERSEDED 2026-09-27, SIXTH pass: `F-1` was left OPEN by the FIFTH pass and is **CLOSED** by the SIXTH — see `### WAVE-C UPDATE 2`'s addendum above and the `F-1` closure paragraph at the head of this block.**)*. **Read, not written:**
`docs/specs/ci-ui-leg-greens.md` (the blind record — its `RT-05` FAIL **row text is not rewritten**; the
corrected disposition lives in the spec) and **`tests/**`/`scripts/**`/`src/**`** (untouched — this pass
is documentation-only and **ran no shell**; every number above is the fix pass's recorded measurement,
attributed).

**WHAT A LATER PASS MUST NOT DO (recorded because the race's shape invites it):** **do not re-argue
`B3-3`'s *"the landed leg still implements the `RT-1` conjunction"* reading.** The landed predicate has
read `!handshakeResolved && (observedDeath || recordedTimeout)` since the retry pass
(`scripts/electron-ui.mjs:516-522`, read) — **the ruled timeout signature WAS implemented**; what was
wrong was the **sampling point**, and **the `F-2` fix corrected it**. **Nor may the fix be read as a
contract change:** `RT-1`/`RT-2`/`RT-4` item 3 and the PRECEDENCE CLAUSE are **byte-unchanged**, and
exhaustion still exits **`1`** in every regime.

**⟶ ADDENDUM TO THIS BLOCK (2026-09-27, SIXTH pass — the `F-1` RCA + fix; read the paragraph above
TOGETHER WITH it, and read the `F-1` closure at the top of this block):** **both live-battery findings
are now CLOSED, so the "WHAT DID NOT MOVE" reading above is spent.** **`F-1` is FIXED + VERIFIED** (the
spawn-the-BINARY fix + the cleanup-hook-at-creation fix; exit-path matrix leaving **0 roots on every
path** immediately and after an **8 s settle**, **0 surviving `electron` processes**), `F-2` stays
CLOSED, and **the blind run's `R0-04` FAIL is dispositioned REAL DEFECT, NOW FIXED** — **its row text in
`docs/specs/ci-ui-leg-greens.md` is NOT rewritten.** **The remaining list is now the per-unit
documentation review + the `DONE` row only** (see the owed-list item above; the adversarial pass's own
record and the snapshot-ordering test row are recorded as **residue that gates no `DONE` row**).
**Tracker reconciliation landed in the SIXTH pass:** this file (this addendum, the `F-1` closure
paragraph above, the owed list, row `C1`'s disposition note and the `## OPEN` prose), `docs/decisions.md`
(**the new ACTIVE SCRATCH-PROFILE decision set** — `UI-LEG-SPAWN-THE-BINARY-NOT-THE-WRAPPER` +
`UI-LEG-CLEANUP-HOOK-AT-CREATION` — plus note 12 in its amendments list), `docs/defects.md` (**the new
CLOSED host-side row `UI-LEG-LEFTOVER-PROFILES`**, no `docs/HANDOFF.md` round owed),
`docs/specs/ci-ui-leg.md` (**AMENDMENT BLOCK 6** — status/annotation only; **no normative clause
amended**; §3a `U-10`'s `UPDATE 2` corrects `UPDATE 1`'s reading), `docs/specs/ci-ui-leg-live-status.md`
(**`F-1` CLOSED with the RCA, the two-part fix and the exit-path matrix; `F-2` CLOSED**),
`docs/pending.md` and `docs/FORKER.md` (the leftover-profiles / spawn-entry-point clauses).
**Read, not written:** `docs/specs/ci-ui-leg-greens.md` (the blind record — `R0-04`'s and `RT-05`'s row
text is **not rewritten**; the dispositions live in the records that file is read with) and
**`tests/**`/`scripts/**`/`src/**`** (untouched — that pass is documentation-only and **ran no shell**;
every number it records is the fix pass's measurement, attributed).

## HANDOVER UPDATE 2 (2026-09-27, wave-A green cycle 2 + supervisor adjudication)

> **STATUS CAVEAT (added by the `U-ENGINE-PIN` doc review, 2026-09-27).** This block and the
> five-row table below are the record of the **green cycle 2** state — read them as the
> **adjudication ledger**, not as live status: the `759 passed / 9 failed` figure, the
> "live-leg evidence is PRE-CHANGE / must be re-run" note and the open `Q7` decision were all
> true then and are **superseded** by the "CURRENT WORK" block above (green on the declared
> legs; the divergence leg **OPEN**; the devDep jump **accepted** — `docs/decisions.md`
> `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED`). The table's **content binds**: its five rulings are the
> dispositions the spec amendments implement, and `docs/specs/engine-pin.md` §4 cites it.

**Live-leg evidence is GREEN.** The architect ran `npm run divergence` in an unsandboxed shell
on the accepted stack — **`R13 RESULT: 9 checks, 0 failures`**, Electron **44.4.5**, node
24.21.0 (census 12/12, registered 12/12, normalized dirtied ids, SSR fragment, `data-node-id`
set, nodeId vocabulary, counter render, R7 dispatch non-empty). **This evidence is PRE-CHANGE**:
`src/renderer/**` changed after it (both guard predicates and the new pane seam), so **the leg
must be re-run by the architect before the unit's DONE row.**

**Green cycle 2: 101 pass / 9 fail of the amended 110-row set.** The 27 "guard still rejecting"
rows are green. The Implementer landed the two authorised hunks: `Runtime.mutationPropsValid` is
now **shape-only** (rejects only a non-array batch, a non-object element, a missing/non-string
`targetProp`; every value-shaped write passes through), and
`SecurePanels.applyPaneMutation(nodeId, mutation)` is the §2.4a injection point with the same
shape-only predicate, skip-whole + last-known render on refusal, and **no change to either
shipped write**. Legs on the current tree: `npm test` **759 passed / 9 failed / 2 skipped** (all
9 are the unit's own rows), `typecheck` clean, `build` clean, `battery` **184/0**.
**Rollback:** the value half of the predicate and the pane method are independently revertible;
`ShimElement.removeAttribute` must **never** be reverted with them — it is now the sole
mechanism for the removal class.

**The 9 remaining rows are 5 contract conflicts, adjudicated by the supervisor (execute in this
order):**

| # | Conflict | Ruling |
| --- | --- | --- |
| 1 | `css.role: null` asserted as a removal; the engine's `css:` branch removes **only** on `undefined`, and `null` is baked to `role="null"` (`adapters.js:214-224`). The row cites PA-5 (which uses `undefined`) while applying PA-2's `null` | **TEST FIX** (test-only): `undefined` ⇒ removal per PA-5; `null` ⇒ the stringification §3.4 PA-2's boundary sentence already states. Do not weaken either assertion |
| 2 | `props.id: undefined` asserted to remove the id; the engine's **auto-mint fill** re-materialises it (`node.js:1908-1912`) before compile, so the adapter's removal branch is never reached | **SPEC AMENDMENT + ROW RELABEL** (the PA-9/PA-10 treatment): record the auto-mint reality in §3.4 PA-6 — the `css.id` route removes, the `props.id` route **cannot** on this engine — and assert the observed reality |
| 3 | The kind-scope row pins `status === 'applied'` for `layer-apply`, but `layer-apply` is the **mint-and-wire** op (`supervisor.js:1188-1225`, needs `target`+`nodes`); a mutation-carrying one is `unknown-node` | **ROW RELABEL**: drive a valid `layer-apply`, or record the engine verdict unpinned as PA-9/PA-10 already do. No host change |
| 4 | `P-SM-1`'s three rotations read `res.renderedHtml` off `applyCommand`, whose pinned signature is `{status, dirtied?, minted?}` (§2.3) | **TEST FIX**: read the render through `op()`/`renderedHtmlResult()`; the atomicity claim stands |
| 5a | `PF-1` asserts a serialized `value` **attribute** the engine never sets (`VALUE_FORMS` tags take the **property** path, `adapters.js:315-318` / `:201-203`) | **TEST FIX**: assert the property/slot observable §2.4a actually names |
| 5b | `PF-2`/`PF-4` need the pane cycle to **persist the diffed baseline** — the removal op is emitted (`set node-21 prop:value undefined`) but the pane render loop does not carry it into `prevMap`, so `formEl.value=''` never runs | **SPEC CLAUSE + ONE HUNK**: authorise the pane baseline persistence (the Runtime's `prevStates` pattern) in §2.4a, then land it with a regression row. The only production hunk left in the unit |

**After those five:** re-run the unit set (target 110/110) → trio → `battery` → **ask the
architect for the divergence re-run** → per-unit documentation review → DONE row → wave-A
checkpoint handover, then wave B (`U-ENGINE-DRIFT`; measurement-only is an acceptable outcome).

**New-surface note for the per-unit doc review:** `SecurePanels.applyPaneMutation` is a genuine
new production public surface (renderer-side only; no IPC, no MCP tool, no group change, and the
isolated pane graph stays non-agent-addressable). Record it as such, keep its rollback unit, and
have the next adversarial pass review it as a seam.

**What a fresh supervisor picks up next.** The `SCH-1..SCH-13` shell-chrome handoff gate was
**amended twice** — first by architect rulings A-d1/A-d2/A-d3 and then by **A-d4…A-d8** — and
the **A-d4…A-d8 layer governs**. It yields **20 units**:

**13 items · 16 `SCH`-derived units · 2 engine units · 2 harness units = 20 units.**
`SCH`-derived (16): `U-MOUNTGUARD` (`SCH-1` invariant half) · `U-GSESSION` (`SCH-2`) ·
`U-ZONES` (`SCH-4`) · `U-CENSUS` (`SCH-8` census half) · `U-GUTTER` (`SCH-6`) ·
`U-RELOCATE` (`SCH-7`) · `U-CONTAINER` (`SCH-10`) · `U-MENULIB` (`SCH-5`) · `U-PROJ`
(`SCH-8` projection half) · `U-LISTHOST` (`SCH-11`) · `U-SLOTHOST` (`SCH-9` host half) ·
`U-THEME` + `U-THEME-CONTROL` (`SCH-3`, two units) · `U-FOCUS-MODEL` + `U-FOCUS-TOOL`
(`SCH-13`, two units) · `U-OVERLAY` (`SCH-12`). Engine (2): `U-ENGINE-PIN`,
`U-ENGINE-DRIFT`. Harness (2): `U-REALDOM-BOOT`, `U-DIVERGENCE-EXT`.
**Arithmetic:** the ruling's own list names **fifteen** `SCH`-derived units and **omits
`U-OVERLAY`**, which is the **sixteenth**; **15 + 1 = 16**, and **16 + 2 + 2 = 20**. The
identity's leading "13 items" is a **different population** from the unit total (three items
contribute two units each) — **there is no single sum that yields both, and any table that
presents "13 items … = 20 units" as one addition is arithmetically wrong.** The full
statement is in the gate record's `Amendment record (A-d4…A-d8)` §2.1.

**3 items carry a DECLINED part-half:** `SCH-1`'s region host · `SCH-9`'s publisher/carrier ·
`SCH-12`'s focus-trap + the `inert`/a11y documentation half (→ the fork's `PS-1`).
**0 PARK · 2 DONE · 2 units fully green** *(**⟶ CORRECTED 2026-09-27, the wave-C DONE pass: the
governing counts are **0 PARK · 3 DONE · 3 units fully green** — `U-REALDOM-BOOT` joins wave A and wave
B as `DONE` on every leg its spec declares (`npm test` 58 files / 863 passed / 2 skipped / 0 failed ·
typecheck clean · build clean (5 bundles) · battery 184 / 0 · `npm run divergence` → `R13 RESULT: 9
checks, 0 failures` · `npm run ui` → exit 0, `11/11`, `427x22`, `retries=0`), with **17 open rows**;
the record is the `## DONE — U-REALDOM-BOOT` section above. The `2 DONE` form below is the wave-B
reading, kept as provenance — its two unit records and its "every other unit is not started" clause
both stand for the units it names.)* **`U-ENGINE-PIN` is **COMPLETE on every leg its spec
declares** — the live `npm run divergence` leg included (`R13 RESULT: 9 checks, 0 failures`);
its one live finding (`LIVE-OP-REJECT`) is **CLOSED — FIXED + LIVE-VERIFIED on 2026-09-27** (a
HOST-owned, pre-existing defect that never blocked it; the renderer IPC unwrap, now in
`docs/defects.md`'s `## FIXED (in this repo)` section) — see the `U-ENGINE-PIN` DONE record at the top of this file and
`docs/defects.md`; **`U-ENGINE-DRIFT` is likewise `DONE` on every declared leg and COMPLETE, as a
measurement record with 0 production code / 0 new tests** — see its DONE record above); every other
unit is not started. ***(The A-d4…A-d8 gate-record layer still
carries "0 DONE / 0 units fully green"; this paragraph is that layer's counts, corrected by the
wave-A DONE pass and again by the wave-B DONE pass — the pre-wave-B reading was `1 DONE · 1 unit
fully green`.)***

**What is PARTIALLY LANDED and what is RED — SUPERSEDED BY THIS PASS; the LIVE status is the
`## CURRENT WORK / HANDOVER STATE` block at the top of this file (green on the node-suite /
typecheck / build / battery legs; **the declared live `npm run divergence` leg NOT passed** — a
clause that is itself stale: the leg went green on the **post-change** tree and the unit is `DONE`;
`LIVE-OP-REJECT` **fixed + live-verified (2026-09-27)**; the DONE row the supervisor's). The paragraphs below are the
**pre-wave-A doc-only pass's** record, kept verbatim for provenance only — they describe a tree
on which the shim completion and the guard did not yet exist (a snapshot of this section is
archived at `archive/next-steps/2026-09-27-engine-pin-pre-execution-state.md`).** **The pin HAS
MOVED:** `package.json:23` = `^0.5.1`, `package-lock.json:2264` resolves
`provident-ssr-0.5.1.tgz`, and `node_modules/provident-ssr/package.json:3` = `0.5.1` (all read
at the time). **Was RED (now LANDED + green):** the shim completion (`removeAttribute`, which
did not exist then) and the host-side prop-mutation guard; the red run was **live** with
**79 assertions across six new test files — 61 red (56 of them throwing
`TypeError: … removeAttribute is not a function`) and 18 green-not-red**, with the
pre-existing **48 files / 658 passed / 2 skipped** unchanged. **Three open findings from that
red run** were recorded in `docs/pending.md` §C: the `R-13` seam question (`Q8`), the
`css.<key>` spec bug, and the two controls captured on the `0.5.1` tree — **all three are now
DISCHARGED** (`Q8` answered by the architect ruling + `docs/specs/engine-pin.md` §2.4a/§2.4b;
the `css.<key>` defect fixed in §2.3; the controls relabelled as **forward pins** — AF-1/AF-2).

**The source of truth** is
`docs/specs/provident-electron-shell-chrome-handoff-review.md` (amended **in place**; read its
`Layer` column **and** its appended `Amendment record (A-d4…A-d8)`, which is the governing
layer — the pre-amendment and A-d1/A-d2/A-d3 layers are kept for provenance). **The
adjudication to carry:** the A-d5…A-d8 architecture pass re-declined `SCH-4`/`SCH-6`/`SCH-7`/
`SCH-10` after reading the **landed pre-A-d4 rows** and the A-d4 amendment had **never been
landed**. **A-d4 is the architect's explicit ruling and is binding; the re-decline is an
artefact. A-d4 stands — the five panes/zones units are part of the plan.** Trackers reconciled
in the same pass: `docs/decisions.md` (six new ACTIVE rows + a trailing amendment note for
three pre-existing rows), `docs/pending.md` (the rewritten dispositions + §C's open items),
`docs/specs/ci-divergence-leg.md` (hermeticity corrected), `docs/specs/mcp-endpoint.md` (the
focus obligation recorded as `OWED`), `docs/FORKER.md` (tool table + digest + non-trio leg),
`README.md` + `docs/specs/mcp-server-gate.md` + `docs/specs/e2e-test-battery.md` (count and
citation drift). **`docs/defects.md` / `docs/HANDOFF.md`: NO new rows** — every drift found is
this repo's own claim drift (host-owned).

**The single next action is the architect's.** **No unit is delegable:** each needs (a) the
go-ahead for **this 20-unit** plan, (b) its `docs/specs/<unit>.md` spec to exist, and (c) a
TestWriter to have RUN and REPORTED its red set (`AGENTS.md` item 9). **No unit is DONE, no
leg has been run, nothing is green** other than the pre-existing suite — this queue was
authored from a document-only pass.

**What gates everything downstream — CORRECTED (the pin has moved):** (1) **`U-ENGINE-PIN`'s
shim completion + guard must go green first** — the install is **DONE**, so the remaining
blocker is the **61-red ledger → green** and the three open findings above, **not** an install
route; (2) **`U-REALDOM-BOOT`** (the `ui` leg) must exist before **any** unit may claim a
real-DOM attribute row, a layout/geometry row, or that F-1 is proven — and it needs a
**display** (`H-r19`); (3) the **census re-parameterisation must land in the SAME commit** as
`U-FOCUS-TOOL`, or the tool turns a green suite red (`H-r18`). **20 units cannot land in one
pass** — the plan proceeds **wave-by-wave with a tracker reconciliation + handover at each
checkpoint** (waves A–F; `Amendment record (A-d4…A-d8)` §3).

**Open architect decisions** — recommendations are this record's, not rulings:

| # | Decision | Options | Recommendation |
| --- | --- | --- | --- |
| **Q1** | **The plan go-ahead — RE-OPENED for the 20-unit plan** | (a) approve the 20-unit sequence wave-by-wave, with `U-ENGINE-DRIFT` authorised to land as a **measurement-only** unit; (b) approve wave A only and re-adjudicate after the engine settles; (c) reject the A-d4…A-d8 adoptions and keep the 8-unit plan | **(a)** — with the explicit caveats that `U-ENGINE-DRIFT` may legitimately produce **zero code** and that the waves are checkpoints, not one pass |
| **Q2** | **The `setPointerCapture` reading** | (a) the **narrow** reading — capture forbidden before the interaction is established, permitted after, per-control opt-in; (b) the **strong** reading — no capture at all for these flows | **ANSWERED — (a)**, per `S-d9`/`H-r9`. The ruling stands and is now carried into `U-GUTTER`/`U-RELOCATE` as contract rows. **No further action** |
| **Q3** | **`SCH-3`'s marginal case** | (a) downgrade to a documented refile; (b) adopt as `U-THEME-MIN` | **ANSWERED — the architect chose adoption, in a shape neither option named:** A-d6 ruled **two units** (`U-THEME` + `U-THEME-CONTROL`), and `U-THEME-MIN` is **retired**. **The pre-amendment recommendation (a) is OVERRULED.** See `THEME-MECHANISM-AND-AUTHORED-CONTROL` |
| **Q4** | **`SCH-13`** | (a) confirm the decline; (b) overrule and adopt a `focus`/selection seam | **ANSWERED — the architect chose (b)**, via A-d5, **as its own gate**: the six-site wiring + the `mcp-endpoint.md` amendment (`H-r14`). **The pre-amendment recommendation (a) is OVERRULED.** See `FOCUS-UI-ONLY-MCP-TOOL` |
| **Q5** | **The install route + the shim call** | Install: (a) the architect runs it; (b) escalate under `~/.npm` (unavailable); (c) defer the retarget. Shim: (i) `removeAttribute` only; (ii) forbid it; (iii) a host-side no-undefined-props prohibition; (iv) (i)+(iii) | **INSTALL DONE — route (a) was taken** (`package.json:23` = `^0.5.1`, installed `0.5.1`). **Shim: (iv) stands** — `removeAttribute` only, plus the red-first `{status:'rejected'}` guard as **defence in depth, never a substitute**; `hasAttribute` is still **NOT added**. **CLOSED**, except for its side-effect → `Q7` |
| **Q6** | **The static-UI reading** | (a) app-state-derived chrome authored as provident graph data; (b) hand-authored HTML/CSS chrome | **ANSWERED — (a)**, per A-d7 (`H-r17`): `AGENTS.md:23-34` and `docs/decisions.md:53` are **UNCHANGED**; the region host **stays declined**; `U-SLOTHOST` adopted **host-only**. **No further action** |
| **Q7** | **NEW — the devDependency scope change: ACCEPT or REVERT** | (a) **ACCEPT** the three moves (`electron` `^44.4.5`, `esbuild` `^0.28.2`, `vitest` `^5.0.1`), amend `docs/specs/engine-pin.md`'s §2.1 diff-scope pin + the register; (b) **REVERT** to the declared pins, which needs **another architect-run install** (no in-session install route) | **ANSWERED — (a) ACCEPT** (status corrected 2026-09-27 by the unit's documentation review): the three moves are **accepted** and recorded as `docs/decisions.md` `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED`; §2.1/§5.1 name them; **nothing is reverted**. **The recorded risk stands and is not waived:** `electron` `^44` is a MAJOR jump against this repo's own `ELECTRON-PIN` row, the engine pin's red set never covered it, and the `ui` leg's Electron-44 API assumptions stay **unverified** until `U-REALDOM-BOOT` lands. The pre-decision "658/2 re-baseline" is superseded by the lands-green **789 / 2 skipped / 0 failed** *(the DONE-pass count — **⟶ 56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix pass**)* |
| **Q8** | **NEW — the two unit-level blockers from the `U-ENGINE-PIN` red run** | (a) **the `R-13` seam**: give `SecurePanels` a public injection seam so the managed-channel row is writable, **or** rule `R-13` predicate-level only; (b) **the app-level `ui`-leg claim boundary + whether the demo appearance control ships at all** | **ANSWERED — the architect took (a) `SecurePanels.applyPaneMutation`, NOT the predicate-level-only option this record recommended** (status corrected 2026-09-27 by the unit's documentation review): the seam **landed** with red-first rows (`PF-1..PF-8`, `PF-1b`, `M9`) under §2.4a/§2.4b, and its `applied` is **derived** (`applied === (status === 'applied')`). **(b) the demo control SHIPS** (A-d6 requires it) and the `ui` leg's claims stay inside §1.13's honest limits. **The "also owed" `css.<key>` spec-bug amendment LANDED** (§2.3's covered-spellings bullet + the guard rows). See `docs/pending.md` §C (both findings annotated DISCHARGED) and `docs/decisions.md` `ENGINE-PIN-PANE-INJECTION-SEAM` |

## OPEN

**Rows C2 onward are `BLOCKED`** (then its spec, then a TestWriter red reported). **Rows A, B and `C1`
have MOVED to the DONE records above — `U-ENGINE-PIN` (the ledger's first `DONE` row), `U-ENGINE-DRIFT`
(the second, `DONE` 2026-09-27: a measurement record, `0` production code, `0` new tests) and
`U-REALDOM-BOOT` (the **THIRD**, `DONE` 2026-09-27: the `npm run ui` real-DOM measurement leg)** — and
none of the three is in this table as a live row any more (each is kept VISIBLE as a `… — MOVED TO DONE`
provenance row, not deleted); their blocker/measured history stays visible in the `CURRENT WORK` /
`WAVE-B MEASUREMENT CHECKPOINT` / `WAVE-C CHECKPOINT`+`WAVE-C UPDATE`+`WAVE-C UPDATE 2` blocks and the
archived pre-green snapshot. The `Legs` column is what a unit must run once delegable — **none of the
rows below has been run.**
**⟶ TOTALS — THE TRUTH, RE-VERIFIED BY ENUMERATING THIS TABLE (2026-09-27, the
`U-MOUNTGUARD` DONE pass): `4` `DONE` / `16` open.** The row census the enumeration produces: **`16` live rows** (`C2` · `D2`–`D4` ·
`E1`–`E9` · `F1`–`F4` = `1 + 3 + 9 + 3 = 16`) **plus four provenance rows** (`A`, `B`, `C1`, `D1`) that are
**`MOVED TO DONE`, kept visible, and NOT counted as open and NOT double-counted** — so `4 DONE + 16 open =
20` units, which matches the `Total: 20 units (A/B: 2 engine · C: 2 harness · D: 4 · E: 9 · F: 3)` identity
below. **`D1` (`U-MOUNTGUARD`) was moved by the unit's per-unit documentation review and the record it points
at is now WRITTEN — the `## DONE — U-MOUNTGUARD` section above** (the row's own text says a record not yet on
the page means the supervisor's pass has not run; **it has run**). *(The DATED counts, kept as provenance:
`3 DONE / 17 open` was the wave-C pass's own count and `2 DONE / 18 open` the wave-B pass's; the
`3 DONE / 17 open` figures above and in the `⟶ DONE-PASS CORRECTION` line are those passes' measurements.)*
The four DONE rows are `U-ENGINE-PIN` (wave A), `U-ENGINE-DRIFT` (wave B), `U-REALDOM-BOOT` (wave C) and
`U-MOUNTGUARD` (wave D), each COMPLETE on every leg its spec declares; the **provenance rows (`A`, `B`, `C1`,
`D1`) are moved, not open and not double-counted** — they are visible in the table with the `MOVED TO DONE`
marker and each is a pointer, never a claim (the earlier `2 DONE / 18 open` and `17 BLOCKED + C1
landed-but-not-DONE` forms are the pre-DONE-pass readings, kept as provenance in the blocks above).
**⟶ WAVE-C UPDATE (2026-09-27, the wave-C checkpoint pass): `U-REALDOM-BOOT` (row `C1`) is
`LANDED-GREEN-BUT-NOT-DONE`** — ⚠ **DISCHARGED 2026-09-27 (the DONE pass): that status word and every
owed-gate list in the wave-C paragraphs of this section are SPENT — the unit is `DONE` and the record is
the `## DONE — U-REALDOM-BOOT` section above; read the `⟶ WAVE-C BLOCK STATUS` table before quoting any
of them.** *(As written at that pass:)* — the leg exists, its **27 rows** are green, the **live** `npm run ui`
leg is green (**`UI RESULT: 0 failures (5/5 rows green)`** *(**STALE FORM — corrected 2026-09-27: the
landed leg prints `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows
R0-R4)`**; five = the declared row identities, eleven = the `row(...)` assertion call sites)*, the ONE measurement **`427x22`** at
`fontSize="16px"`), and `npm run divergence` is **UNCHANGED** (`R13 RESULT: 9 checks, 0 failures`).
**It is NOT a third DONE row: three gates + one architect decision are still owed** (its two spec
defects are re-pinned) — see the
**`WAVE-C CHECKPOINT`** block above and row `C1`'s corrected `Blocked on` cell.
**⟶ WAVE-C UPDATE (2026-09-27, THIRD pass — supersedes the counts and the owed-gate list in the paragraph above; the paragraph is kept as the second-pass reading): `U-REALDOM-BOOT` (row `C1`) is STILL `LANDED-GREEN-BUT-NOT-DONE`, and NOW:** the **retry ruling is ANSWERED and the retry is IMPLEMENTED** (`docs/specs/ci-ui-leg.md` §3.7 `RT-1`–`RT-9` + its PRECEDENCE CLAUSE; `scripts/electron-ui.mjs`), the unit's rows are **`68/68` green** (`39` new `RT-*` rows from the retry pass — **`41`** in the file today after the `F-1` fix's two; `tests/ui-leg-contract.test.ts` holds **`59` rows** = `18` non-`RT` + `41` `RT` — the older `27 rows` count above is STALE), the **blind-greens gate HAS RUN** (`26 scenarios = 16 PASS / 4 FAIL / 6 NOT-BLIND-RUNNABLE`, all four FAILs dispositioned), and **two host-code defects found by that run are FIXED**. **The legs are `npm test` `58 files / 863 passed / 2 skipped / 0 failed`** (**was `822`**) · typecheck clean · build clean · battery **`184/0`**. **AND THE LIVE LEGS COULD NOT RUN** *(**⟶ CORRECTED 2026-09-27, FOURTH pass: the "host's Electron runtime is non-functional — an ENVIRONMENT regression, A/B-proven not this unit's" attribution IS **WRONG and superseded**; the cause was a **corrupted npm shim inside this repo's `node_modules`** (`node_modules/electron/cli.js` — a shell script re-execing itself), **repaired this pass**, and **both live legs now RUN and are GREEN: `R13 RESULT: 9 checks, 0 failures` · `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`, one measurement `427x22` at `fontSize="16px"`** — see the `### WAVE-C UPDATE — RESOLVED` block above. **Blocker (1) is DISCHARGED.**)* **The superseded reading, kept for provenance:** the runtime was reported as **an ENVIRONMENT regression, A/B-proven not this unit's** (`npm run divergence` → `✗ electron connect/drive failed: MCP error -32001: Request timed out` → **`R13 RESULT: 1 checks, 2 failures`**; `npm run ui` **hangs in its own precondition**; a bare `electron -e 'console.log(1)'` hangs). **The `5/5 rows green` line above is STALE** (the landed form is `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`) **and PRE-REGRESSION.** **The retry change has had NO live verification.** Current blockers: **(1) the two LIVE legs — BLOCKED on the runtime** (re-run both the moment it recovers; §3 of the `WAVE-C UPDATE` block above), **(2) the per-unit documentation review (item 10d/RCA-6)**, **(3) the adversarial pass's own record (§3a/§3b)** — its known findings are FIXED. See the **`WAVE-C UPDATE`** block above and row `C1`'s corrected `Blocked on` cell.
**⟶ `U-ENGINE-DRIFT` CLOSED OUT (2026-09-27): row `B` was `MEASURED`, and its DONE ruling landed —
the DONE record above is the authoritative cell.** The measurement record
(`docs/specs/engine-drift-measurements.md`, single reconciled ledger, `N = 57` = 47 `CONSISTENT` +
2 `DRIFTED` + 7 `UNMEASURABLE` + 1 `INVALID`) with **both `DRIFTED` rows' tracker halves landed**, the
red **run and reported as empty** (`56 files / 795 passed / 2 skipped / 0 failed`, **zero failures
attributable to the pin move**), the five legs green, the blind greens (**51 scenarios: 42 PASS /
3 FAIL / 6 NOT-BLIND-RUNNABLE**) and the adversarial pass (verdict on the record **as filed**:
**`NOT DONE-ELIGIBLE`** on two blocking findings, **both corrected and re-verified**) are all recorded
there. **Every row below
remains `BLOCKED` — no leg run, nothing green** *(**⟶ ONE EXCEPTION, added 2026-09-27 by the
wave-C checkpoint pass: row `C1` (`U-REALDOM-BOOT`) is **LANDED and its rows are green** — its
`Blocked on` cell no longer says `BLOCKED`; it is **`LANDED-GREEN-BUT-NOT-DONE`** and the **three
owed gates + one architect decision** it still owes are named in that cell (its two **spec** defects
— the `R1` marker and the scripts count — were **re-pinned by the wave-C SpecWriter** in the same
window, so they are recorded defects and not open gates). **Every other row below remains
`BLOCKED`/not started and no leg of those has been run.** **⟶ CORRECTED 2026-09-27 (THIRD pass): the "three owed gates + one architect decision" reading is the second-pass one and is SUPERSEDED — the retry ruling is ANSWERED and the retry is IMPLEMENTED, the blind-greens gate HAS RUN, and the `R1`-marker/scripts-count re-pin LANDED; the CURRENT blockers are (1) the two LIVE legs, BLOCKED on the non-functional Electron runtime (ENVIRONMENT, not this unit's) *(**⟶ CORRECTED 2026-09-27, FOURTH pass: blocker (1) is DISCHARGED — the live legs RAN and ARE GREEN (`R13 RESULT: 9 checks, 0 failures`; `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`) because the "ENVIRONMENT" attribution was a **MISATTRIBUTION** of a corrupted in-repo npm shim (`node_modules/electron/cli.js`), repaired; the remaining items are (2) the per-unit documentation review and (3) the adversarial pass's own record.**)*, (2) the per-unit documentation review, (3) the adversarial pass's own record (§3a/§3b), whose known findings are FIXED. The unit's rows are `68/68` green and the suite is `58 files / 863 passed / 2 skipped / 0 failed`; the unit remains `LANDED-GREEN-BUT-NOT-DONE`.**)* **⟶ CURRENT DISPOSITION 2026-09-27 (SIXTH pass, the `F-1` RCA + fix) — read this, then the FIFTH-pass paragraphs below it:** **BOTH live-battery findings are CLOSED. `F-1` (the leftover scratch profiles) is FIXED + VERIFIED** — the leg now spawns the **Electron BINARY** (never the CLI wrapper `node_modules/.bin/electron` → `electron/cli.js`, whose child is the real app, so the handle held was the wrapper and the orphan re-created the profile **after** the delete-and-verify sweep had reported success) and its **cleanup hook is registered at `scratchRoot` creation** (the malformed-config path had been exiting **before** the hook existed, leaking an **empty** root) — so **every exit path leaves ZERO roots** (green · malformed config · timeout-class exhaustion · `npm run ui`), checked **immediately and after an 8 s settle**, with **0 surviving `electron` processes**, and the leg's report **now MATCHES the disk**. **The blind run's `R0-04` FAIL is dispositioned REAL DEFECT, NOW FIXED** (its row text in `docs/specs/ci-ui-leg-greens.md` is **not** rewritten). **The remaining gates for row `C1` are therefore the per-unit documentation review (item 10d/RCA-6 — now ELIGIBLE because no live finding gates it) and the supervisor's `DONE` row only** — the adversarial pass's own record and the snapshot-ordering test row are recorded as **residue that gates no `DONE` row**. **The ONE split that must not be blurred:** the earlier *"delete-and-verify sweep + recorded report"* fix closed the **REPORTING half only**; **this pass closed the END STATE** (`docs/specs/ci-ui-leg-live-status.md` §6.1's split table; `docs/specs/ci-ui-leg.md` AMENDMENT BLOCK 6 **B6-5**).

**⟶ CURRENT DISPOSITION 2026-09-27 (FIFTH pass, the `F-2` RCA + fix) — read this, then `### WAVE-C UPDATE 2` below:** the **live battery HAS RUN** (`R0`–`R4` live-green, `11/11`, ONE measurement `427x22`, `retries=0`; the retry's **six `NBR-*` runtime rows CLOSED**), **`F-2` (the timeout-class retryability RACE) is FIXED** — the boundary is now **MONOTONIC** (`120`/`200`/`260 ms` → `RT-7 EXHAUSTED: 4 of 4 (3 retries)`, every attempt recorded in order, exit `1`; `300 ms` → accepted, `11/11`, `427x22`) — and the greens' **`RT-05` FAIL is dispositioned REAL DEFECT, NOW FIXED**. **`F-1` (the leftover scratch profiles) REMAINS OPEN** and is **not** closed (the live run still leaves a root + both attempt profiles while the leg reports `leftover profiles: NONE`). **⟶ ✅ THAT CLAUSE IS SPENT — `F-1` IS CLOSED (2026-09-27, SIXTH pass): the leg now spawns the Electron BINARY (one process, one handle, no orphan) and registers its cleanup hook at `scratchRoot` creation, so every exit path leaves ZERO roots, checked immediately and after an 8 s settle, with 0 surviving `electron` processes — and the report MATCHES the disk. The blind run's `R0-04` FAIL is dispositioned REAL DEFECT, NOW FIXED (its row text is not rewritten). See the SIXTH-pass disposition above and row `C1`'s own note in the `Blocked on` cell.** **The remaining `DONE`-blocking items are exactly two: the per-unit DOCUMENTATION REVIEW (item 10d/RCA-6) and the `DONE` ROW (the supervisor's)** — plus, non-blocking, the **recommended/not-implemented snapshot-ordering test row** (TestWriter-owned) and the **adversarial pass's own record** (§3a/§3b `OWED`). **No normative clause of `docs/specs/ci-ui-leg.md` changed in this pass.**
The wave
letter is the checkpoint it belongs to (`Amendment record (A-d4…A-d8)` §3). **All 20 units
are listed; 18 are open here — `U-ENGINE-PIN` and `U-ENGINE-DRIFT` are `DONE`** (`U-ENGINE-PIN` on
every declared leg green, including
`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`) and its one live finding
(`LIVE-OP-REJECT`) is **CLOSED — FIXED + LIVE-VERIFIED on 2026-09-27** (the renderer IPC unwrap,
now in `docs/defects.md`'s `## FIXED (in this repo)` section; live status flipped `rejected` →
`applied`) — it was HOST-owned and pre-existing and it never blocked this unit.**

| # | Wave | Unit | Spec it owes (path) | Derives from | Blocked on | Legs it must run |
| --- | --- | --- | --- | --- | --- | --- |
| **A — MOVED TO DONE (2026-09-27)** | A | The **`U-ENGINE-PIN`** row that stood here MOVED, not deleted — it is the **`U-ENGINE-PIN` DONE record** above (the ledger's first `DONE` row), which is the ONE authoritative cell. Nothing on this row is a blocker or a live claim: its former `Blocked on` cell is **spent**. | *(spec — unchanged)* `docs/specs/engine-pin.md` (filed + amended through block 7 + the `B-LANDED` reconciliation) + `docs/specs/engine-pin-greens.md` (third blind run: 104 rows / 96 PASS / 0 FAIL / 5 NOT-BLIND-RUNNABLE) + `docs/specs/engine-pin-live-status.md` (verdict: FINAL green) | A-d2 (+ `H-r7`) | **SPENT — nothing is blocked on this row.** Both former blockers discharged: **(i)** the harness spawn fix **LANDED** (`scripts/electron-divergence.mjs`; `U-DIVERGENCE-EXT` inherits the flags) and the leg was **re-run GREEN** by the supervisor on the post-change tree, and **(ii)** `LIVE-OP-REJECT` was adjudicated HOST-owned/pre-existing **and is now FIXED + LIVE-VERIFIED** (`docs/defects.md` `## FIXED (in this repo)`). Legs, final tree: `npm test` **56 files / 795 passed / 2 skipped / 0 failed** · typecheck clean · build clean (5 bundles) · battery **184 / 0** · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`**. *(Provenance: this row previously carried a duplicated, splice-damaged copy of its own cells — the markers and the stale `55 files / 789` / "NOT PASSED" text were removed by the 2026-09-27 repair; every superseded clause is recorded in the DONE-row repair note above and in `archive/next-steps/2026-09-27-engine-pin-pre-green-handover.md`.)* |
| **B — MOVED TO DONE (2026-09-27)** | B | The **`U-ENGINE-DRIFT`** row that stood here MOVED, not deleted — it is the **`U-ENGINE-DRIFT` DONE record** above (the ledger's **second** `DONE` row), which is the ONE authoritative cell. Nothing on this row is a blocker or a live claim: its former `Blocked on` cell is **spent**. | *(spec — unchanged)* `docs/specs/engine-drift.md` (**FILED 2026-09-27**) + **`docs/specs/engine-drift-measurements.md` — THE MEASUREMENT RECORD: LANDED 2026-09-27 (its own correction pass 2026-09-28)** (`N = 57` rows = 47 `CONSISTENT` + 2 `DRIFTED` + 7 `UNMEASURABLE` + 1 `INVALID`, single ledger; **0 production code / 0 new tests**) + `docs/specs/engine-drift-greens.md` (blind re-run: 51 scenarios / 42 PASS / 3 FAIL / 6 NOT-BLIND-RUNNABLE) | A-d2 (behavioural half) | **SPENT — nothing is blocked on this row.** The unit is `DONE` (2026-09-27) on every leg its spec declares, and it landed as §0 **ruling 3** authorises: a measurement record with **zero production code and zero new tests**. Red: the existing suite under the new pin, **RUN and REPORTED as empty** — `56 files / 795 passed / 2 skipped / 0 failed`, **0 failures attributable to the pin move**. Both `DRIFTED` rows' tracker halves landed (`RAW-STRING-CENSUS-RETIRED`, `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`); the adversarial verdict `NOT DONE-ELIGIBLE` (as filed) was discharged by the corrections and the record re-verified. Legs, final tree: `npm test` **56 files / 795 passed / 2 skipped / 0 failed** · typecheck clean · build clean (5 bundles) · battery **184 / 0** · **`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`**. *(Provenance: the row's former **MEASURED — NOT DONE** status and its §3.6-gated DONE ruling are superseded by the DONE record above; the row is not deleted.)* |
| **C1 — MOVED TO DONE (2026-09-27)** | C | The **`U-REALDOM-BOOT`** row that stood here MOVED, not deleted — it is the **`U-REALDOM-BOOT` DONE record** above (the ledger's **THIRD** `DONE` row, and the identical ledger row inside that record), which is the ONE authoritative cell. Nothing on this row is a blocker or a live claim: its former `Blocked on` cell is **SPENT** — the spec is FILED, the leg (`npm run ui`) is LANDED and every declared row is green, both live-battery findings are CLOSED, the documentation review has RUN, and the unit is `DONE` on every leg its spec declares. *(Provenance, kept so the moved row stays visible per the convention rows A and B used: it read `LANDED-GREEN-BUT-NOT-DONE` with its rows `68/68` green and a succession of owed-gate lists; every one of those gates is discharged and the measured history is the `WAVE-C CHECKPOINT` / `WAVE-C UPDATE` / `WAVE-C UPDATE 2` blocks, status-annotated DISCHARGED by the `⟶ WAVE-C BLOCK STATUS` table above.)* | **FILED** `docs/specs/ci-ui-leg.md` (**FILED 2026-09-27** — **no longer `OWED`**; the **`R1`-marker + scripts-count re-pin has LANDED in it**, by the wave-C SpecWriter pass, while this pass ran) + **LANDED** `package.json`'s `"ui"` key (**the TWELFTH script key** — the pre-unit block held eleven; the SpecWriter's `M-2` re-pin lands that count) + **LANDED** `scripts/electron-spawn.mjs` (the shared helper — the divergence leg calls it; arg vector/env/stdio/profiles unchanged, `R13` arithmetic untouched) + **LANDED** `scripts/electron-ui.mjs` | A-d8 | **⟶ NOT `BLOCKED` ANY MORE (corrected 2026-09-27, the wave-C checkpoint — the old cell read `BLOCKED` → `U-ENGINE-PIN` green; every one of those is MET: the spec is FILED, the leg is LANDED and green, and `U-ENGINE-PIN` (+ `U-ENGINE-DRIFT`) is `DONE`).** **⟶ FINAL GATE STATUS 2026-09-27 (the per-unit documentation review, SEVENTH pass — status only): the documentation review HAS RUN — its record is `archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md` and its findings landed in these trackers in the same pass. `C1` remains `LANDED-GREEN-BUT-NOT-DONE`, and the `DONE` row is the ONLY item left on it — the supervisor's, NOT written here (its slot is left consistent).** **What actually remains before a DONE row:** **⟶ CORRECTED IN FULL 2026-09-27 (THIRD pass — the (i)…(v) list that follows is the SECOND-pass reading and is SUPERSEDED; read the `WAVE-C UPDATE` block above for the authoritative list). THE CURRENT BLOCKERS, IN ORDER (⟶ SUPERSEDED 2026-09-27, FOURTH pass, the RCA pass — read the resolution block in the `WAVE-C UPDATE` section above; the list that follows is the third-pass reading, kept for provenance): **⛔→✅ BLOCKER (1) IS DISCHARGED (2026-09-27, FOURTH pass): both live legs RAN and ARE GREEN — `npm run divergence` → `R13 RESULT: 9 checks, 0 failures` (census `12/12` both legs); `npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`, the ONE measurement `427x22` at `fontSize="16px"`, scratch cleanup verified (`leftover profiles: NONE`)** — because the **"host runtime non-functional (ENVIRONMENT regression)"** attribution this row carried was **WRONG**: the cause was a **corrupted npm shim INSIDE this repo** (`node_modules/electron/cli.js` — a shell script that re-execs itself, so every boot spun at ~99 % CPU printing nothing), **repaired this pass** by restoring the correct Node wrapper; **WHAT REMAINS is (a) the per-unit documentation review (item 10d/RCA-6) and (b) the DONE row (the supervisor's).** **THE SUPERSEDED READING FOLLOWS — (1) THE TWO LIVE LEGS are BLOCKED ON THE ENVIRONMENT: the host's Electron runtime no longer boots (a direct launch prints nothing and must be killed after 25–40 s; `npm run divergence` → `✗ electron connect/drive failed: MCP error -32001: Request timed out` → `R13 RESULT: 1 checks, 2 failures`; `npm run ui` hangs in its own precondition; a bare `electron -e 'console.log(1)'` hangs). It is A/B-proven ENVIRONMENTAL — the same failure reproduces with the UNMODIFIED HEAD spawn helper, it began BEFORE this pass's edits, and contributing factors are the divergence leg's leaked ~95 %-CPU Electron wrappers plus the sandbox's `/dev/shm` denial. The retry change has therefore had NO live verification, and the last good divergence evidence stays `R13 RESULT: 9 checks, 0 failures` (post-change tree, earlier). (2) THE PER-UNIT DOCUMENTATION REVIEW (item 10d/RCA-6) — still owed. (3) THE ADVERSARIAL PASS'S OWN RECORD (§3a/§3b, `OWED`) — its known findings are FIXED. MET/SETTLED (do NOT re-list as owed): the retry ruling is ANSWERED and the retry is IMPLEMENTED + stub-verified (39 `RT-*` rows; the unit's set is `68/68` green); the blind-greens gate HAS RUN (26 scenarios = 16 PASS / 4 FAIL / 6 NOT-BLIND-RUNNABLE, all four FAILs dispositioned); the `R1`-marker + scripts-count spec re-pin LANDED. The second-pass list read:** **(i)** the per-unit **adversarial** pass (RCA-3 — §3a/§3b are `OWED`); **(ii)** the **blind-greens** gate (item 10a — no `*-greens.md` exists); **(iii)** the per-unit **documentation review** (item 10d/RCA-6); **(iv)** the **`R1`-marker + scripts-count spec re-pin** — **⟶ LANDED by the wave-C SpecWriter while this pass ran**: `R1` is now pinned on the **discriminating element/renderer-API provenance** (`HTMLDivElement`/`CSSStyleDeclaration`, never `typeof window`) and the count is **TWELVE** keys; that file's §7 honest statements are its remaining residue; **(v)** the **architect's retry decision** — the leg can legitimately exit **2 PRECONDITION-FAILED** because `RK-14`'s flake class is **CONFIRMED REAL here** (`/dev/shm` writes forbidden ⇒ an Electron renderer intermittently dies `SIGTRAP` at bootstrap, ≈1-in-3 back-to-back; the pre-existing divergence leg is flaky identically). **Requires a DISPLAY** (`H-r19`) — met here | `npm run ui` (after `build`) — **RUN: exit 0, `UI RESULT: 0 failures (5/5 rows green)`** + the `ui` leg's own precondition: `npm run divergence` green for the **same built tree**, else **PRECONDITION-FAILED** (exit 2 — the specified authority order, never a bypass)**⟶ ✅ CURRENT DISPOSITION 2026-09-27 (SIXTH pass, the `F-1` RCA + fix) — THIS IS THE AUTHORITATIVE CELL; read it before the fifth/fourth/third-pass notes in this cell's tail:** **BOTH live-battery findings are CLOSED, so NO LIVE FINDING GATES THIS ROW.** **`F-1` (the leftover scratch profiles) is FIXED + VERIFIED** — the leg now spawns the **Electron BINARY** (never the CLI wrapper `node_modules/.bin/electron` → `electron/cli.js`, whose child is the real app: the handle held was the wrapper, so the kill orphaned the app and it **re-created the scratch profile AFTER the delete-and-verify sweep had reported success**) and registers its **cleanup hook at `scratchRoot` creation** (the malformed-config path had been exiting **before** the hook existed, leaking an **empty** root) — so **every exit path leaves ZERO roots** (green · malformed config · timeout-class exhaustion · `npm run ui`), checked **immediately and after an 8 s settle**, with **0 surviving `electron` processes**, and the leg's `leftover profiles: NONE` report **now MATCHES the disk**. **`F-2` (the timeout-class retryability race) stays CLOSED.** **The blind run's `R0-04` FAIL is dispositioned REAL DEFECT, NOW FIXED** (its row text in `docs/specs/ci-ui-leg-greens.md` is **not** rewritten). **THE REMAINING LIST — the whole of it: the per-unit DOCUMENTATION REVIEW (item 10d/RCA-6; the unit is now ELIGIBLE, because no live finding gates it) and the `DONE` ROW (the supervisor's).** The adversarial pass's own record (§3a/§3b `OWED`) and the snapshot-ordering test row (TestWriter-owned) are recorded as **residue that gates no `DONE` row**. **The leg's verdict line is unchanged: `npm run ui` → exit `0`, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, ONE measurement `427x22`, `retries=0`, and `npm run divergence` → `R13 RESULT: 9 checks, 0 failures` (`N = 9` intact).** **The one split that must not be blurred:** the earlier *"delete-and-verify sweep + recorded report"* fix closed the **REPORTING** half only; this pass closed the **END STATE** (`docs/specs/ci-ui-leg-live-status.md` §6.1's split table). **No normative clause of `docs/specs/ci-ui-leg.md` changed** (its AMENDMENT BLOCK 6 is status/annotation only). |
| **C2** | C | `U-DIVERGENCE-EXT` — the `H-r10` scenario-envelope channel + the **attribute-presence extractor** (set-wise, never a substring diff) + a `props` falsy-toggle scenario. **`divergence`'s pinned N=9 stays EXACTLY intact** | an amendment to `docs/specs/ci-divergence-leg.md` (**`OWED — not filed` is SPENT: FILED by the wave-C SpecWriter pass — the `AMENDMENT BLOCK` is in the file; the row stays `BLOCKED` until its legs run**) | `H-r10` / A-d8 | `BLOCKED` → **then `U-REALDOM-BOOT` (SPENT — it HAS landed, 2026-09-27: the new leg exists and its rows are green, and the divergence leg already calls the landed shared helper `scripts/electron-spawn.mjs` with its arg vector/env/stdio/profiles unchanged)** (it modifies a **pinned, passing** leg and must be revertible without touching the new one) **— and note (2026-09-27, THIRD pass) that this row's declared leg `npm run divergence` CANNOT RUN at all right now: the host's Electron runtime is non-functional (ENVIRONMENT regression, not this unit's and not `U-REALDOM-BOOT`'s — see the `WAVE-C UPDATE` block). So `U-DIVERGENCE-EXT` is BLOCKED twice over: on its own deliverables AND on the runtime; re-run `npm run divergence` (`N = 9`) the moment it recovers** *(**⟶ UPDATE 2026-09-27, FOURTH pass (the RCA pass): the runtime HAS recovered — the recorded "host's Electron runtime is non-functional (ENVIRONMENT regression)" was a **MISATTRIBUTION** of a **corrupted in-repo npm shim** (`node_modules/electron/cli.js` — a shell script re-execing itself), **repaired this pass**; `npm run divergence` **RAN GREEN post-repair: `R13 RESULT: 9 checks, 0 failures`** (census `12/12` both legs). So this row's runtime half is **NO LONGER the blocker**: `U-DIVERGENCE-EXT` is **BLOCKED ONLY ON ITS OWN DELIVERABLES** (the `H-r10` scenario-envelope channel + the attribute-presence extractor + the `props` falsy-toggle scenario), and its declared leg is **runnable now** and remains the **strict precondition** for every real-DOM **attribute** row. **No deliverable of this row has been landed by this pass, and the row is not re-scoped.**)* | `npm run divergence` (**N=9**) — and it is the **strict precondition** for every real-DOM **attribute** row |
| **D1 — MOVED TO DONE (2026-09-27)** | D | The **`U-MOUNTGUARD`** row that stood here MOVED, not deleted — it is the ledger's **FOURTH** `DONE` row, recorded in the **`## DONE — U-MOUNTGUARD` record above this table** (the supervisor's pass wrote it; a record that is NOT yet on the page means that pass has not been run, and **this row is the slot it fills**), which is the ONE authoritative cell. **⟶ AUTHORED BY THE SUPERVISOR (2026-09-27, `AGENTS.md` item 10d): the prose paragraph and its ledger row are the record; the documentation review that preceded it is `archive/reviews/2026-09-27-U-MOUNTGUARD-doc-review.md` (gitignored provenance).** Nothing on this row is a blocker or a live claim: **the spec is FILED** (`docs/specs/mount-invariant-guard.md`, plus its blind record `docs/specs/mount-invariant-guard-greens.md`), **the unit is green on every declared leg** (`npm test` **59 files / 916 passed *(⟶ SUPERSEDED as a live figure: the tree now reads `61` files / `1041` tests — `1039` passed / `2` skipped / `0` failed; the `59/916` reading is kept as its own pass's measurement)* / 2 skipped / 0 failed** · typecheck clean · build clean (5 bundles) — the unit's own file `tests/mount-invariant-guard.test.ts` is **44 rows, all green**), both earlier passes ran (the red set hit its own stop condition `S-1`; the adversarial + blind-verification pass pinned the teardown drive as `M-19`), the per-unit documentation review has RUN (`archive/reviews/2026-09-27-U-MOUNTGUARD-doc-review.md`), and **the unit is `DONE` on every leg its spec declares** — the host fix `reconcileMount()` landed with its regression rows `M-17`/`M-18`. *(Provenance, kept so the moved row stays visible per the convention rows `A`, `B` and `C1` used: it read `docs/specs/mount-invariant-guard.md` (**`OWED — not filed`**) with `Blocked on` = `BLOCKED` + spec + `TestWriter red`; the spec was filed 2026-09-27, the red set ran the same day, and every gate the cell named is discharged. `RCA-8(f)`: no successor row is added — the wave-D queue continues at `D2`, which stood next in the order.)* | **FILED** `docs/specs/mount-invariant-guard.md` (**FILED 2026-09-27** — no longer `OWED`) + **LANDED** `src/shared/mount-invariant-guard.ts` (the probe module: `probeMountInvariant`/`assertMountInvariant` + the five interfaces) + **LANDED** `src/renderer/runtime.ts`'s host fix `reconcileMount()` (§3a `RED-5(ii)`) + **LANDED** `tests/mount-invariant-guard.test.ts` (**44** rows) + the blind record `docs/specs/mount-invariant-guard-greens.md` | `SCH-1` invariant half | **SPENT — nothing is blocked on this row.** *(The wave-D go-ahead ruling the spec recorded as outstanding is a wave-level statement about work **beyond** this unit; this unit's own scope — the probe, the host fix and its regression rows — landed and is green, which is why the row moves. If the architect's wave-D go-ahead is read as still owed for the units after this one, that is recorded on those rows (`D2`–`D4`, `E*`, `F*`), not here.)* | node suite (the shim is host-owned test code — **no shim change needed**) |
| **D2** — **MOVED TO DONE (2026-09-27)** | D | The **`U-LISTHOST`** row that stood here MOVED, not deleted — it is the ledger's **FIFTH** `DONE` row, and its record is the **`## DONE — U-LISTHOST`** section above this table (the ONE authoritative cell). | **FILED + AMENDED + CORRECTED** `docs/specs/listhost.md` (**~`1896` lines as landed at this pass's close — the file grew at each 2026-09-27 pass; `619`/`774`/`1056`/`1734` are earlier passes' censuses, so cite sections, never lengths**) + **LANDED** `src/shared/owned-list-host.ts` (the seven exports of `§2.1`, 406 lines) + **LANDED** `tests/owned-list-host.test.ts` (**`62` rows, all green** — the red set + the adversarial regression rows) + the blind record `docs/specs/listhost-greens.md` (`57` scenarios = `54` PASS / `0` FAIL / `3` NOT-BLIND-RUNNABLE) | `SCH-11` | **SPENT — nothing is blocked on this row.** The go-ahead was given, the spec was filed then reconciled, the TDD cycle ran in order (red `49`/`3` → remand `50`/`3` → green `46/53` → test-defect fix `53/53` → adversarial regression `7` red → green **`62/62`**), the property register executed **`168/168` held**, the adversarial + blind + doc-review gates RAN, and the trio is green (`60` files / `980` tests — `978` passed / `2` skipped · typecheck `0` · build `0`). *(Provenance, kept so the moved row stays visible: it read `BLOCKED` → spec → `TestWriter red`, with the spec cell `OWED — not filed` at filing and `FILED 2026-09-27` after the reconciliation. `RCA-8(f)`: no successor row is added — the wave-D queue continues at `D3`, which stood next in the order.)* | node suite `[T]` — **the declared leg**; **the optional real-DOM `[U]` identity row is NOT TAKEN** (precondition-gated on `U-DIVERGENCE-EXT`'s `H-r10`), and the reason is STRUCTURAL: the module is a pure `src/shared/` mechanism **imported by no `src/**` file**, so there is no rendered surface for a live battery to exercise |
| **D3** — **MOVED TO DONE (2026-09-27)** | D | The **`U-SLOTHOST`** row that stood here MOVED, not deleted — it is the ledger's **SIXTH** `DONE` row, and its record is the **`## DONE — U-SLOTHOST`** section above this table (the ONE authoritative cell). **The publisher/carrier half STAYS DECLINED — this move does not revive it.** | **FILED + AMENDED + RECONCILED** `docs/specs/slothost.md` (cite sections, never lengths) + **LANDED** `src/shared/slot-host.ts` (the seven exports of `§2.1`; the container source is an **injected `containerFactory`** per the architect's ruling) + **LANDED** `tests/slot-host.test.ts` (**`61` rows, all green**) + the blind record `docs/specs/slothost-greens.md` (`58` scenarios = `57` PASS / `1` FAIL / `0` NOT-BLIND-RUNNABLE; the FAIL plus a recorded defect cell drove two host fixes) | `SCH-9` host half (A-d7) | **SPENT — nothing is blocked on this row.** Red RUN and REPORTED (`55` rows = `53` red / `2` pass), the six reds ruled test-side, the coupled remand, the injected-seam green, the adversarial gate (15 findings; all 20 seeds and 17 judgment calls ruled; the HIGH evasion finding fixed by the architect's ruling), the blind greens, the doc review and the trio all RAN. *(Provenance kept: the cell read `BLOCKED` → spec → `TestWriter red`, and `docs/specs/slothost.md` (`OWED — not filed`) at filing. `RCA-8(f)`: no successor row is added — the wave-D queue continues at `D4`.)* | node suite `[T]` — **the declared leg**; **the optional real-DOM `[U]` row is NOT TAKEN** (precondition-gated), and the reason is STRUCTURAL: a pure `src/shared/` mechanism **imported by no `src/**` file**, container source injected by the harness |
| **D4** | D | `U-PROJ` — the pure projection + total applier (`SCH-8` **projection** half; `U-CENSUS` is separate) | `docs/specs/projection.md` (**FILED 2026-09-27**, `~2073` lines at this pass's close — **cite sections, never lengths**; **⟶ CENSUS CORRECTED 2026-09-27 (the `U-PROJ` per-unit documentation review, `AGENTS.md` item 10d/RCA-6; record `archive/reviews/2026-09-27-U-PROJ-doc-review.md`, finding **F-06**, LOW-MED; the `~2073` figure is kept visible): the live count is `2528` lines at this review pass — a line census drifts on every pass, which is why the spec's own file-end note replaced its census with the rule **cite sections, never lengths**: `docs/specs/projection.md` `§2.1` (the surface), `§2.2` (the prohibitions), `§2.3`/`§2.4`/`§2.5` (the rules), `§3.1`–`§3.5` (the rows), `§5.3` (the DONE-row shape), `§5.5.1` (the register), `§3a`/`§3b` (the adversarial record)**; carrying the four architect rulings `A-11`/`A-2`/`A-3`/`A-7` in `§0A`) — **and its gate-11 `§5.5.1` typed register is LANDED**: eight `P-PJ-*` rows, **`239` attempts** (`23+60+22+36+52+16+12+10` — **⟶ CORRECTED 2026-09-27 (the `U-PROJ` per-unit documentation review, `AGENTS.md` item 10d/RCA-6; record `archive/reviews/2026-09-27-U-PROJ-doc-review.md`, finding **F-07**, LOW; the as-filed `239` is kept visible, never silently rewritten): `239` is the FILING's MIS-SUM of the eight terms printed beside it — `23+60+22+36+52+16+12+10` = **`231`**, which is the figure `docs/specs/projection.md` `§5.5.1`'s TOTAL row and one-line restatement state (`231 ≤ 400`), the figure this record's own item (1) states, and the figure the register was EXECUTED at: `231` attempts driven / `231` held / `0` broken, `registerStoppedAt: null`, seed `20260927`, stop-after-5 NOT triggered. NO per-row term, strategy id, cap or row count changes; the correct total is **`231`**, and no later cell may quote `239` as the total.), a pinned-seed pool draw, caps ≤100/row · ≤400 total · stop-after-5, **no new dependency** (the old exemption kept as `§5.5.0`), with **all eleven `§7a` ambiguities RULED** (`§7a.1` — four rows `CONTRACT-AMENDED`: `M-13`/`F-10`'s coercion boundary, `F-9`'s `ok`, `I-9`'s unfalsifiable `'-'` clause, `F-15`'s `JSON.stringify` recipe replaced by four named observables; seven NEW static rows `R-17`..`R-23` + stop conditions `S-12`..`S-15`; and the export-count reconciliation — `§2.1`'s "eight exports" counted a block declaring **eleven** names) | `SCH-8` projection half | `BLOCKED` → **`U-LISTHOST` and `U-SLOTHOST` are `DONE` (the ledger's fifth and sixth rows) and this row is now the LAST wave-D unit and STANDS NEXT** → **`TestWriter red` RUN and REPORTED** (its only remaining blocker) | node suite; one measured custom-property value (**optional**) → `ui` |
| **E1** | E | `U-ZONES` — pure tracks/zones: `TrackSpec { trackProp, unit, emptyToken }` all caller-supplied; `isEmpty`, `trackFor`; **the literal `'0px'` is NOT built in**; no DOM/registry/writes; non-finite/negative ⇒ the empty token | `docs/specs/zones.md` (**OWED — not filed**) | `SCH-4` (A-d4) | `BLOCKED` → spec → `TestWriter red` | node suite. **Geometry clause:** the contract/arithmetic is provable here; **any rendered-geometry claim is UNPROVABLE in this repo today** → `ui` only |
| **E2** | E | `U-CENSUS` — `computeTrackVars(zones, census, sizes, revealed, specOf)` delegating token formatting to `U-ZONES`; `revealed` a **consumer decision, never a default**; key set **exactly `zones`**; **the census object is never mutated** | `docs/specs/census.md` (**OWED — not filed**) | `SCH-8` census half (**refile WITHDRAWN**, A-d4) | `BLOCKED` → then `U-ZONES` → spec → `TestWriter red` | node suite |
| **E3** | E | `U-GUTTER` — `createResizeController({session, axisFor, boundsFor, defaultSizeFor, isResizable, commit})` driven by the **adopted node-local session** (no second gesture authority) + an exported pure `clampToBounds`; one commit per gesture; cancel ⇒ zero commits/sink writes; reset ⇒ exactly one commit of the **supplied** default; no capture before establishment | `docs/specs/gutter.md` (**OWED — not filed**) | `SCH-6` (A-d4) | `BLOCKED` → then `U-CENSUS` **and `U-GSESSION`** (the session it composes) → spec → `TestWriter red` | node suite (call counts); rendered-geometry rows → `ui` only |
| **E4** | E | `U-RELOCATE` — `createRelocateSession({session, candidatesFor, resolveTarget, onReveal, commit, threshold})`; **reveal written EXACTLY ONCE per gesture at gesture end** (a deliberate strengthening — the fork's per-crossing implementation **fails this row** until it changes); resolve policy injected; interrupt/cancel leaves no retained sinks or listeners | `docs/specs/relocate.md` (**OWED — not filed**) | `SCH-7` (A-d4) | `BLOCKED` → then `U-GUTTER` → spec → `TestWriter red` | node suite |
| **E5** | E | `U-CONTAINER` — `tokensFor(chrome, tokenFn)` / `orientationFor(edge, axisResolver)` with the **mirror-class taxonomy caller-supplied** (no `is-empty`/`is-minimized`/`is-revealed` literals) + **ONE** shipped declaration (`contain: layout style paint`) whose **class name is caller-supplied**; consumer selectors/`:has()` stay consumer-side | `docs/specs/container.md` (**OWED — not filed**) | `SCH-10` (A-d4) | `BLOCKED` → then `U-RELOCATE` → spec → `TestWriter red` | node suite; **the real-DOM containment proof → the `ui` leg** |
| **E6** | E | `U-GSESSION` — the node-local interaction session (the A-d3 unit) | `docs/specs/gsession.md` (**OWED — not filed**) | `SCH-2` | `BLOCKED` → then `U-MOUNTGUARD` → spec → `TestWriter red` | node suite. **Divergence leg NOT required for the adopted core** — but the **F-1 behavioural row** requires the extended harness (`U-DIVERGENCE-EXT`), a **named precondition**, not an assumed capability |
| **E7** | E | `U-MENULIB` — the consumer-agnostic menu catalog builder + injected picker seam | `docs/specs/menulib.md` (**OWED — not filed**) | `SCH-5` | `BLOCKED` → then `U-GSESSION` → spec → `TestWriter red` | node suite |
| **E8** | E | `U-THEME` — the pure total `resolveTheme(setting, env)` + the **declaration-only** applier with a **caller-supplied** attribute name; **no token values, no `data-theme` literal, no `matchMedia`, no store** | `docs/specs/theme.md` (**OWED — not filed**) | `SCH-3` (A-d6) | `BLOCKED` → then `U-MENULIB` → spec → `TestWriter red` | node suite only (the six-prohibition static rows) |
| **E9** | E | `U-OVERLAY` — the overlay state machine + inert-background **declaration** + re-parent contract | `docs/specs/overlay.md` (**OWED — not filed**) | `SCH-12` | `BLOCKED` → then `U-THEME` **and `U-ENGINE-PIN`** (its `inert` rows need the landed pin + the `H-r7` completion) → spec → `TestWriter red` + **`U-DIVERGENCE-EXT`** if the real-DOM `inert` row is in scope | node suite; **the real-DOM half of any `inert` row → the `ui`/divergence leg** |
| **F1** | F | `U-THEME-CONTROL` — the **AUTHORED** provident appearance control in the demo envelope, dispatchable + MCP-visible through the **EXISTING** tools; **no new tool, no new group**; demo census drift **measured, not assumed** | `docs/specs/theme-control.md` (**OWED — not filed**) | `SCH-3` (A-d6) | `BLOCKED` → then `U-THEME` → spec → `TestWriter red` | node suite (+ the demo census-drift measurement). **Demonstration code — no unit may generalise it into a shipped appearance UI** |
| **F2** | F | `U-FOCUS-MODEL` — the pure ordered-entry transition module over opaque ids/targets with injected `refuse`/`onChange`/`persist`; **no vocabulary, no store, no DOM** | `docs/specs/focus-model.md` (**OWED — not filed**) | `SCH-13` (A-d5) | `BLOCKED` → then `U-THEME-CONTROL` → spec → `TestWriter red` | node suite only |
| **F3** | F | `U-FOCUS-TOOL` — the new MCP tool: group **`dispatch`**, **NOT** in `MUTATING_METHODS`, **emits no notification**, persists nothing, cannot force a re-render; **`ALL_TOOLS` 21 → 22, `RpcMethod` 21 → 22** (CORRECTED 2026-09-27 — the live census is **21**, `src/shared/types.ts:259-280`, asserted at 21 by `tests/engine-pin-version.test.ts:174-197`; the pre-correction **"19 → 20"** is stale and must not be quoted), default-gate subset 7 → 8; the **six wiring sites** incl. the **unchanged** notification path and the **no-change** preload bridge | `docs/specs/focus-tool.md` (**OWED — not filed**) + the `docs/specs/mcp-endpoint.md` amendment (**§3 · new §3.8 · §6.2 incl. the `module` row · §7 · §8 · §9**) + **the census rows of `tests/engine-pin-version.test.ts` — the SET-EQUALITY re-parameterisation has ALREADY LANDED (`:85-165`: `PINNED_TOOL_SET` compared by set equality; the `ALL_TOOLS === 21` count is retained only as a duplicate check), so the remaining same-commit obligation is to ADD `provident.focus` to that set + the `RpcMethod` census (`21 → 22`) + the default-gate subset, IN THE SAME COMMIT AS THE TOOL** + `docs/specs/mcp-server-gate.md`'s counts | `SCH-13` (A-d5) | `BLOCKED` → then `U-FOCUS-MODEL` → spec → `TestWriter red`. **The census re-parameterisation may NOT be deferred** — land it in the same commit or the tool turns a green suite red (`H-r18`) | node suite · battery · **the `ui` leg once it exists** (the tool must be observable in a live window) + the **negative notification row** |
| **F4** | F | **`H-r1` correction package owed to the FORK** — the per-item disposition re-issued in this repo's own voice with the withdrawal set (`SCH-2`/`SCH-5`/`SCH-8`/`SCH-11` → this repo; `SCH-12`'s package refile withdrawn; **`SCH-13` and `SCH-3` move OUT of the declined set under A-d5/A-d6**; **`SCH-4`/`SCH-6`/`SCH-7`/`SCH-10` move OUT under A-d4**; **`SCH-9` is now host-adopted/publisher-declined**; `SCH-1`'s region half **stays** declined; `SCH-8`'s `computeTrackVars` half **stays with this repo**), plus the `[target]`/`[fork]` attribution corrections, the `SCH-2`/`SCH-6`/`SCH-7` capture-reading row edits, and the **prohibition-5 clarification** (so the fork does not read the handoff as banning tools) | **no path in this repo** — see `docs/specs/provident-electron-shell-chrome-handoff-review.md` (`H-r1`, `H-r2`, `H-r9`, `H-r14`) and `docs/FORKER.md` §4 | `H-r1` / `H-r2` / `H-r9` / `H-r14` | **`BLOCKED` — the fork's own pass.** This repo writes **no** file under `<Astrographer>/`; nothing here can action it | n/a (documentation handoff) |

**⟶ UPDATE (2026-09-27, the `U-MOUNTGUARD` per-unit documentation review — `AGENTS.md` item 10d/RCA-6;
counts only, and **the authoring of the `DONE` row itself is the supervisor's**):** row **`D1`** MOVED
from this table to the **`## DONE — U-MOUNTGUARD` record** above (kept visible as a
`D1 — MOVED TO DONE` provenance row, the same convention rows `A`, `B` and `C1` used). **The unit
counts therefore read `4 DONE / 16 open rows`:** `U-ENGINE-PIN` (wave A) · `U-ENGINE-DRIFT` (wave B) ·
`U-REALDOM-BOOT` (wave C) · **`U-MOUNTGUARD` (wave D)**, with `16 = 1 (`C2`) + 3 (`D2`–`D4`) + 9 (`E1`–`E9`)
+ 3 (`F1`–`F4`)`; **`4 + 16 = 20` units**, unchanged. *(The `3 DONE / 17 open` figures below and in the
`⟶ DONE-PASS CORRECTION` line are the wave-C pass's own counts, kept as that pass's measurement.)*

**Total: 20 units (A/B: 2 engine · C: 2 harness · D: 4 · E: 9 · F: 3) + the fork correction
package as a queue row (NOT a unit). 4 DONE — `U-ENGINE-PIN` (wave A),
`U-ENGINE-DRIFT` (wave B), `U-REALDOM-BOOT` (wave C, `DONE` 2026-09-27 — the `npm run ui` real-DOM
measurement leg; its record is the `## DONE — U-REALDOM-BOOT` section above) **and `U-MOUNTGUARD`
(wave D, `DONE` 2026-09-27 — the cross-envelope mount cardinality/identity probe + the
`reconcileMount()` host fix; its record is the `## DONE — U-MOUNTGUARD` section above, and its
doc-review record is `archive/reviews/2026-09-27-U-MOUNTGUARD-doc-review.md`)**: COMPLETE on every leg each
spec declares; **16 open rows remain** (`C2` · `D2`–`D4` · `E1`–`E9` · `F1`–`F4`).** *(**⟶ THE TOTALS WERE
`3 DONE / 17 open` UNTIL THIS PASS** — the `⟶ DONE-PASS CORRECTION` line below is the wave-C pass's
authoritative count for its own pass, and this update supersedes its counts only;
this paragraph's wave-A/wave-B figures are kept as their DONE-pass measurements.**) `U-ENGINE-PIN` (`npm test`
**55 files / 789 passed / 2 skipped / 0 failed** *(the DONE-pass
count — **⟶ 56 files / 795 passed / 2 skipped / 0 failed after the 2026-09-27 `LIVE-OP-REJECT` fix
pass** — **⟶ 58 files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C
`U-REALDOM-BOOT` landing pass**, which added that unit's two `ui`-leg test files / 27 rows — **⟶ 58 files / 863 passed / 2 skipped / 0 failed after the 2026-09-27 RETRY pass**, which added the retry's 39 `RT-*` rows (**`41`** `RT-*` rows in the file today after the `F-1` fix's two) and takes `tests/ui-leg-contract.test.ts` to 59 rows = 18 non-`RT` + 41 `RT`, the unit's set to `68/68` green)* · typecheck clean ·
build clean · battery **184 checks / 0 failures** · **`npm run divergence` → `R13 RESULT: 9
checks, 0 failures`**); its one live finding `LIVE-OP-REJECT` is **CLOSED — FIXED + LIVE-VERIFIED (2026-09-27)**: it was a
HOST-owned, pre-existing defect that never blocked the unit, and it now sits in `docs/defects.md`'s
`## FIXED (in this repo)` section; its DONE record is above.** **`U-ENGINE-DRIFT`'s DONE record is
also above** (a measurement record with **0** production code and **0** new tests, its red **run and
reported as empty** — `56 files / 795 passed / 2 skipped / 0 failed` *(that run's count — **⟶ 58
files / 822 passed / 2 skipped / 0 failed after the 2026-09-27 wave-C `U-REALDOM-BOOT` landing
pass** — **⟶ 58 files / 863 passed / 2 skipped / 0 failed after the 2026-09-27 RETRY pass**)*, **0** failures attributable to
the pin move — with `N = 57` = 47 `CONSISTENT` + 2 `DRIFTED` + 7 `UNMEASURABLE` + 1 `INVALID`; the
other four legs green: typecheck clean · build clean (5 bundles) · battery **184 / 0** ·
`npm run divergence` **9 / 0**). **⟶ DONE-PASS CORRECTION (2026-09-27, THE AUTHORITATIVE COUNT): the
`## OPEN` table carries **17** live rows — **3 DONE** (`U-ENGINE-PIN` wave A · `U-ENGINE-DRIFT` wave B ·
**`U-REALDOM-BOOT` wave C, DONE this pass**) with their three provenance rows (`A`, `B`, **`C1`**)
**MOVED TO DONE and kept visible, not deleted**, and `C1`'s successor row `C2` onward — `C2` · `D1`–`D4` ·
`E1`–`E9` · `F1`–`F4` = **17** — **`BLOCKED`/not started**. **Arithmetic verified against the table by
enumerating its rows in this pass: `3 + 17 = 20` units, and `17 = 1 (`C2`) + 4 (`D`) + 9 (`E`) + 3 (`F`)**,
which matches the `Total: 20 units (A/B: 2 engine · C: 2 harness · D: 4 · E: 9 · F: 3)` identity below
(the two harness units are counted in `C`, of which `C1` is now `DONE` and `C2` open).** **⟶ FURTHER CORRECTION, NOW AUTHORITATIVE (2026-09-27, the `U-MOUNTGUARD` per-unit documentation review — `AGENTS.md` item 10d/RCA-6; read the `3 DONE / 17 open` clause above as the wave-C pass's own count): the `## OPEN` table carries **16** live rows — **4 DONE** (`U-ENGINE-PIN` wave A · `U-ENGINE-DRIFT` wave B · `U-REALDOM-BOOT` wave C · **`U-MOUNTGUARD` wave D, the fourth, whose row `D1` MOVED TO DONE this pass**), with their four provenance rows (`A`, `B`, `C1`, **`D1`**) **MOVED TO DONE and kept visible, not deleted**, and the open rows `C2` · `D2`–`D4` · `E1`–`E9` · `F1`–`F4` = **16** — `BLOCKED`/not started. **Arithmetic, re-enumerated against the table: `4 + 16 = 20` units, and `16 = 1 (`C2`) + 3 (`D`) + 9 (`E`) + 3 (`F`)** — the wave-D count reads `3` open because `D1` is `DONE` and `D2`–`D4` remain, which is why the wave identity below still reads `D: 4` (it counts the wave, not its open rows).** *(The
pre-DONE-pass reading follows, kept as provenance; every count and gate list in it is spent:)* **The `## OPEN` table
therefore carries **18** rows (rows A and B moved to the DONE records, 2026-09-27) — **18 remain
`BLOCKED`/not started** (*with **one exception added 2026-09-27**: row `C1` is **LANDED and its rows
are green** — `LANDED-GREEN-BUT-NOT-DONE`, three owed gates + one architect decision — so read
"18 blocked" as **17 `BLOCKED` + row `C1` landed-but-not-DONE**; **no third DONE row exists**)* *(**⟶ CORRECTED 2026-09-27, THIRD pass: row `C1` is still `LANDED-GREEN-BUT-NOT-DONE` and its rows are `68/68` green, BUT its owed set has changed — the retry ruling is ANSWERED and the retry is IMPLEMENTED, the blind-greens gate has RUN, the `R1`-marker/scripts-count re-pin LANDED, and the CURRENT blockers are (1) the two LIVE legs, BLOCKED on the non-functional Electron runtime (ENVIRONMENT, not this unit's), (2) the per-unit documentation review, (3) the adversarial pass's own record (§3a/§3b), whose known findings are FIXED; the suite is `58 files / 863 passed / 2 skipped / 0 failed`.)* *(**⟶ CORRECTED AGAIN 2026-09-27, FOURTH pass (the RCA pass): the third-pass blockers list inside this parenthesis is SUPERSEDED — the live legs are NO LONGER a blocker and `C1`'s live legs RAN and ARE GREEN (`npm run divergence` → `R13 RESULT: 9 checks, 0 failures`; `npm run ui` → exit 0, `UI RESULT: 0 failures (11/11 assertions green, mapped onto the five declared rows R0-R4)`, `retries=0`, `427x22` at `fontSize="16px"`), because the recorded "ENVIRONMENT regression" was a MISATTRIBUTION of a corrupted in-repo npm shim (`node_modules/electron/cli.js`), repaired this pass; `C1` remains `LANDED-GREEN-BUT-NOT-DONE` — the unit's rows are `68/68` green on a `58 files / 863 passed / 2 skipped / 0 failed` suite, and the remaining items are (a) the per-unit documentation review (item 10d/RCA-6) and (b) the DONE row. *(**⟶ (a) IS DISCHARGED 2026-09-27, SEVENTH pass:** the documentation review RAN — `archive/reviews/2026-09-27-U-REALDOM-BOOT-doc-review.md`, findings landed in these trackers; **the `DONE` row is the only gate left on `C1`, and it is the supervisor's**.)* **The unit counts DO NOT move: still 2 DONE (`U-ENGINE-PIN`, `U-ENGINE-DRIFT`), 18 open rows, 17 `BLOCKED` + row `C1` landed-but-not-DONE, and NO third DONE row.**)*), and **no row is in the `MEASURED` state any more: row `B`'s ruling landed**
(see the **WAVE-B MEASUREMENT CHECKPOINT** block for its measured history); the
`U-DIVERGENCE-EXT` spawn fix the old row named is
**landed** (that unit **inherits** it), and the `H-r10` extractor it still owns is
**unaffected**.

**Tracker reconciliation for this pass (2026-09-27, the `U-ENGINE-PIN` documentation review,
AGENTS.md item 10d / RCA-6):** the pre-amendment execution-log blocks were **archived** (see
the `CURRENT WORK` block's pointer) and every `docs/next-steps.md:<n>` citation held by other
files was re-resolved in the same pass; `U-DIVERGENCE-EXT`'s role (it owned the harness-spawn
fix and the `H-r10` extractor), the wave-A unit's new production surface
(`SecurePanels.applyPaneMutation`) and its rollback boundary are recorded in
`docs/decisions.md`'s `ACTIVE — the U-ENGINE-PIN decision set` block, the unit's
**live-leg verdict + finding** are recorded in `docs/specs/engine-pin-live-status.md`, and the
per-unit documentation-review record is
`archive/reviews/2026-09-27-U-ENGINE-PIN-doc-review.md`.

**Tracker reconciliation for the DONE pass (2026-09-27, the supervisor's pass):** `U-ENGINE-PIN`
moved from `## OPEN` row A into the DONE record above; `docs/decisions.md` gained the
`ACTIVE — the U-ENGINE-PIN DONE-pass decision set` block (`DIVERGENCE-SPAWN-FIX`,
`DIVERGENCE-LEG-GREEN-POST-CHANGE`, `LIVE-OP-REJECT-IS-A-HOST-DEFECT`) plus amendment notes 6/7
on the pre-existing rows it supersedes; `docs/defects.md` gained the **`LIVE-OP-REJECT`**
row **under an explicit HOST-owned caveat** (the catalogue is the *package*-gap list, so **no
`docs/HANDOFF.md` round and no upstream issue is owed** for it) — **it was filed OPEN there and has
since MOVED into that file's `## FIXED (in this repo)` section (the 2026-09-27 fix pass)**; `docs/pending.md` parked the two
owed **fixture-data** items (§7.12/§7.13) and its `U-ENGINE-PIN`/`ENGINE-0.5`/`ui`-leg rows no
longer say the divergence leg is unavailable; `docs/specs/engine-pin-live-status.md` was updated
from **`BLOCKED-with-signature`** to the **FINAL green state**; and the two spec files carry the
short status note (divergence green **post-change**; `LIVE-OP-REJECT` a host defect **outside**
this unit's scope — **since FIXED + live-verified, 2026-09-27**). **One citation was re-resolved in the same pass:** `docs/pending.md`'s
`docs/next-steps.md ## OPEN row A` reference (row A is now the DONE record) and
`docs/specs/engine-pin.md`'s matching parenthetical. **`U-DIVERGENCE-EXT`'s role is now
narrower:** it **inherits** the landed spawn fix (`--disable-dev-shm-usage` + a fresh scratch
`--user-data-dir`) and still owns the `H-r10` scenario-envelope channel, the attribute-presence
extractor and the `props` falsy-toggle scenario.

**Tracker reconciliation for the `LIVE-OP-REJECT` fix pass (2026-09-27):** the defect is **FIXED +
LIVE-VERIFIED** and this pass moves it OPEN → CLOSED across the docs. `docs/defects.md`: the row
**MOVED** from `## OPEN` to `## FIXED (in this repo)` with its as-filed history kept, plus the
landed hunk + unwrap expression (`src/renderer/renderer.ts:43`), the RED row that pinned it
(`S1`), the fallback row (`S2`), the `load`-stays-raw row (`S3`), the fail-safe rows (`F1`/`F2`),
the `S1b` notify row, the `handleRequest` `export` seam (`:14`), the live before/after status
(`rejected` → `applied`) and the five leg results (**56 files / 795 passed / 2 skipped / 0
failed** · typecheck clean · build clean · battery **184/0** · divergence **9/0**). `docs/decisions.md`:
`LIVE-OP-REJECT-IS-A-HOST-DEFECT` annotated **CLOSED**, the new **`LIVE-OP-REJECT-CLOSED`** row
added, `ENGINE-PIN-DIVERGENCE-LEG-IN`'s tail annotated, amendment notes 5/7 and
`DIVERGENCE-LEG-GREEN-POST-CHANGE` re-pointed. `docs/pending.md`: the governing counts
(**1 DONE · 1 unit fully green** *at that pass — **⟶ 2 DONE · 2 units fully green after the
2026-09-27 wave-B DONE pass***), the `UPSTREAM-ENGINE-0.5` status clause, §D's closing note and
the devDependency row's count. `docs/specs/engine-pin.md`: the status block + §7.2 item 2 + the
§4.4/§8 notes + the leg bullet, with **the layer note kept** (the envelope layer was never broken;
the defect lived on the **IPC hop**). `docs/specs/engine-pin-live-status.md`: §0's finding bullet,
the `provident.op` per-class row (**FAIL → PASS**), `§3.1`'s live-rows table, **§5's adjudication
heading + blockquote (now carrying the fix + the live re-verification)** and the §8 hygiene note.
`docs/specs/engine-pin-greens.md` + `docs/FORKER.md`: their "open / stays OPEN" clauses. This file:
every counted occurrence (**55 files / 789 → 56 files / 795**, each annotated as the DONE-pass count
where a historical claim was kept), the `CURRENT WORK` block, the six-item snapshot, the DONE prose,
the dated correction under the DONE row, the queue tables and the summary. **No `docs/HANDOFF.md`
upstream row exists or is owed for this defect** — it was never a `provident-ssr` defect, and
`docs/HANDOFF.md`'s Round-8 annotation now says so with the CLOSED status.

**Tracker reconciliation for the wave-B DONE pass (2026-09-27, the supervisor's pass,
`AGENTS.md` item 3/6/10d):** `U-ENGINE-DRIFT` moved from `## OPEN` row **B** into the
**`U-ENGINE-DRIFT` DONE record** above (**not deleted** — the `WAVE-B MEASUREMENT CHECKPOINT` block
stays as its measured history, annotated superseded on its status lines only). **The same pass
corrected two stale cross-document clauses the wave-B doc pass reported but could not touch** —
`docs/specs/provident-electron-shell-chrome-handoff-review.md` (`H-r12` + the `Filings this verdict
owes` annotation, both of which asserted the destroy-undo `applied`/fall-through claim) and
`docs/specs/engine-pin.md` (**§7.8**, which read *"`UNDO-REDO-DESTROY-STATUS` is NOT resolved by this
unit … the destroy-undo false-success survives the version move"*) — **each corrected to the measured
reality with the file's `SUPERSEDED` convention and citing
`docs/specs/engine-drift-measurements.md` `M-31` + `docs/decisions.md`
`UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1` and `RAW-STRING-CENSUS-RETIRED`** (in `engine-pin.md` the
correction is a **status note under a numbered honest-statement item — "no requirement of this
contract changes"**, which is that file's own convention for a status-only correction; §7.7 was read
and **carries no bare-name/removal claim**, so nothing was changed there). **Trackers reconciled:**
`docs/pending.md` (the `R-16`/`R-17` control row — *"STILL OPEN"* → **the ruling-2 EXCLUSION of the
`0.2.1` baseline + the historical-output claim recorded `UNMEASURABLE` (`M-49`)**, which is what the
ruling actually decided; the governing counts → **2 DONE · 2 units fully green**), `docs/FORKER.md`
(the `U-ENGINE-DRIFT` row → `DONE`; the digest counts → **2 DONE · 2 units fully green**),
`docs/HANDOFF.md` (the Round-3 annotation's stale *"and Round 9 remains **open**"* — measured reality:
**Round 9 is CLOSED as delivered-by-the-resolve-guard**), and this file (the DONE record, row B's move,
the checkpoint's status lines, the `## OPEN` prose, the `0 PARK · 2 DONE · 2 units fully green` counts
and the totals line). **Read, not written (a parallel pass owns the record; a SpecWriter owns the
spec):** `docs/specs/engine-drift-measurements.md` and `docs/specs/engine-drift.md` — including the
**blind-run reconciliation** (the greens file's `F-1`/`F-2`/`F-3`, all three already reconciled in the
record with **no verdict moved**). **⟶ THE PER-UNIT DOCUMENTATION REVIEW (AGENTS.md item 10d/RCA-6)
HAS SINCE RUN, closing the repo-wide audit's `O-1`:** record
`archive/reviews/2026-09-27-U-ENGINE-DRIFT-doc-review.md` (provenance — gitignored). Its `SAME-PASS
FIXES` landed here and in three other files: this block's *"DONE row remains owed"* cell (now marked
SPENT in-line), `docs/specs/provident-electron-shell-chrome-handoff-review.md`'s amended-plan row
`U1` spec cell (*"`OWED — not filed`"* → annotated SUPERSEDED: the spec is FILED and the unit is
`DONE`), `docs/HANDOFF.md`'s two engine-pin/baseline annotations (the *"still belongs to
`U-ENGINE-PIN`/`U-ENGINE-DRIFT`"* and *"re-baselined by `U-ENGINE-DRIFT`"* clauses → annotated
DELIVERED/SPENT, with the `## OPEN`-row citation repointed to the DONE record), and
`docs/specs/engine-drift-greens.md` §5 (a NOT-BLIND-RUNNABLE arithmetic defect: `42 + 3 + **7**` over
the 51 scenario ids, with `BL-38` inside §2 and `BL-16` the only section-only id — corrected in
place with a correction note; the as-filed header line is kept). **The record's 57 rows, its single
ledger (`N = 57 = 47 + 2 + 7 + 1`), the `INVALID` row's in-place handling and every revisit condition
were re-enumerated and CONFIRMED** (see that record's §2 for the re-runnable method).
**Not touched:** `src/**`, `tests/**`,
`scripts/electron-divergence.mjs` (the `N = 9` pin), `package.json`, `node_modules/**` and the
upstream folder.

**Tracker reconciliation for the npm-shim integrity RCA pass (2026-09-27, FOURTH pass — the
`electron/cli.js` corruption, its repair and the live-leg re-runs):** this pass is
**documentation-only and it ran no build, no suite and no leg of its own**; **every number it
carries is the supervisor's measured post-repair evidence, attributed and dated**, and the one
`node_modules` path involved is the **repaired install artifact**, not repo source. **This file:**
the `CURRENT WORK / HANDOVER STATE` counts line (the "CANNOT RUN / ENVIRONMENT regression" clause
annotated **SUPERSEDED** and the live legs' green evidence added), the `WAVE-C UPDATE` block's
blocker section (**rewritten as `### … RESOLVED + MISATTRIBUTED`** — the RCA verbatim in condensed
form, the two red herrings, the post-fix live evidence for both legs, the residual
npm-shim-integrity hazard, the recovery runbook converted to **"what remains"**), row `C1`'s
`Blocked on` cell (blocker (1) **DISCHARGED**; what remains = the per-unit documentation review +
the `DONE` row), row `C2`'s runtime note (the row is now blocked **only on its own deliverables**),
the `## OPEN` third-pass paragraph and the totals line (the same correction, **unit counts
unmoved**), and this footer. **`docs/decisions.md`:** the `ELECTRON-RUNTIME-NON-FUNCTIONAL-ENV-BLOCKER`
row annotated **`RESOLVED / MISATTRIBUTED`** (root cause, fix, corroboration, residual hazard) +
**one new ACTIVE row** for the RCA's lesson + amendment **note 10**.
**`docs/pending.md`:** §E **DISCHARGED** as a dated resolved record with the evidence, and the
**integrity-check recommendation parked as a new OPEN item** with its revisit condition.
**`docs/defects.md`:** one **CLOSED host-side row** for the integrity hazard, filed under the
existing `R13-HOST-FIX` precedent (HOST-owned ⇒ **no `docs/HANDOFF.md` round and no upstream issue
is owed** — never a `provident-ssr` defect). **`docs/specs/ci-ui-leg.md`:** **status/annotation
notes only** — §7's honest statements, §3a's `U-10` note, §3b's status line and a new AMENDMENT
BLOCK 4 status record; **no normative clause rewritten**, and **the runtime half of the retry's
NOT-BLIND-RUNNABLE rows is marked REACHABLE, never "verified"**. **`docs/FORKER.md`:** the
`U-REALDOM-BOOT` row's *"a working Electron runtime"* prerequisite marked **MET** + the row's
blocker clause corrected, with the **shim-integrity hazard recorded as a fork-relevant environment
note** (the `U-DIVERGENCE-EXT` row and the outside-the-trio `ui` row get the same correction).
**Not touched by this pass:** `src/**`, `tests/**`, `scripts/**`, `package.json`,
`node_modules/**`, the `N = 9` pin, `ALL_TOOLS = 21`, the battery's `184/0`, and both DONE records.

**Tracker reconciliation for the `F-2` RCA + fix pass (2026-09-27, FIFTH pass — the `ui` leg's
timeout-class retryability RACE):** this pass is **documentation-only and it ran no build, no suite and
no leg of its own**; **every number it carries is the fix pass's measured evidence, attributed and
dated**, and it edited **no `src/**`, `tests/**` or `scripts/**` file**. **This file:** the new
**`### WAVE-C UPDATE 2`** block (the live battery's result, the six `NBR-*` runtime closures, the `F-2`
fix and its monotonic boundary table, the `F-1`-remains note, the owed list, the counts and the
process record), row **`C1`**'s `Blocked on` cell (a dated disposition annotation: battery run, `F-2`
fixed, `F-1` open, documentation review + `DONE` row remaining), and the **`## OPEN` prose**'s
WAVE-C paragraph (the same annotation, with the totals line's pointer, and a FIFTH-pass pointer to `### WAVE-C UPDATE 2`). **`docs/specs/ci-ui-leg.md`:**
**status/annotation notes only** — **AMENDMENT BLOCK 5** (the RCA, the fix, the monotonicity evidence,
the explicit *"no normative clause changed"* statement and the block's own appended index rows), a
dated **`RT-05` disposition note** beside `B3-3`, a dated discharge note on `B3-3`'s *"contradiction
with the landed tree"* paragraph, and `U-14`(h)'s partial-live-settlement note; **no clause of §3.7,
§3.0, §3.6, §5, §6 or §7 was rewritten**. **`docs/specs/ci-ui-leg-live-status.md`:** `F-2` recorded
**CLOSED** with the RCA, the instrumented evidence, the fix and the post-fix boundary table (the
as-filed finding text kept **struck-but-visible**), `F-1` left **OPEN** and unamended, `RT-05`'s
corrected disposition cross-referenced, and the exit-code/`NBR-03`/§4.3/§7/§8/§10/§11 annotations this
change owed. **`docs/decisions.md`:** one new **ACTIVE** row
(`UI-LEG-TIMEOUT-CLASS-RACE-SNAPSHOT-RULE` — the snapshot rule + the RCA + the evidence + what pins it)
and amendment **note 10**. **`docs/defects.md`:** one **CLOSED host-side** row
(`UI-LEG-TIMEOUT-CLASS-RACE`, under the `R13-HOST-FIX` precedent ⇒ **no `docs/HANDOFF.md` round and no
upstream issue is owed**) plus a pointer in the `## OPEN` caveat. **`docs/pending.md` / `docs/FORKER.md`:**
the *"the retry has had NO live verification"* / *"NOT-BLIND-RUNNABLE"* clauses annotated (the timeout
class's retryability is **live-verified and fixed**; the remaining `NBR-*` rows stay unre-dispositioned).
**Read, not written:** `docs/specs/ci-ui-leg-greens.md` (its `RT-05` FAIL **row text is not rewritten** —
the corrected disposition lives in the spec). **Not touched by this pass:** `src/**`, `tests/**`,
`scripts/**`, `package.json`, the `N = 9` pin, `ALL_TOOLS = 21`, the battery's `184/0`, and both DONE
records.

**Tracker reconciliation for the `U-REALDOM-BOOT` DONE pass (2026-09-27, the supervisor's pass,
`AGENTS.md` items 3/6/10d):** `U-REALDOM-BOOT` moved from `## OPEN` row **`C1`** into the
**`## DONE — U-REALDOM-BOOT` record** above (**not deleted** — the row is kept as a
`C1 — MOVED TO DONE` provenance row, and the four wave-C blocks stay as the unit's measured history,
superseded on their status lines only). **This file:** the DONE record (the authoritative prose
paragraph + its ledger row, plus the moved-`C1` ledger/provenance row), the new
**`⟶ WAVE-C BLOCK STATUS`** table (which marks every wave-C owed list, `NOT DONE` status, blocker clause
and *"no DONE row is implied"* sentence **DISCHARGED**, clause by clause, so no wave-C block can still
read as if the unit were open), row `C1`'s move, the `## OPEN` section's rows/totals paragraph
(`3 DONE / 17 open`, with the enumeration that verifies it), the `Total: 20 units … 3 DONE … 17 open
rows remain` line, the `## OPEN` totals paragraph (`⟶ DONE-PASS CORRECTION`), and this footer.
**`docs/decisions.md`:** one new **ACTIVE** row (the unit's completion record —
`U-REALDOM-BOOT-COMPLETE-ON-EVERY-DECLARED-LEG`) plus the **`ADVERSARIAL-PASS-RECORD-VS-CLOSURES`** row
that states the two-halves reading of the spec's §3a/§3b (the findings are FIXED and CLOSED; the pass's
own record lands in that file), and amendment **note 14**.
**`docs/FORKER.md` / `docs/pending.md` / `README.md`:** the `LANDED-GREEN-BUT-NOT-DONE` unit/leg rows
annotated **`DONE`** (each file's own annotate-never-rewrite convention), with the doc-review + DONE-row
closure stated and no other clause moved. **Read, not written:** `docs/specs/ci-ui-leg.md`,
`docs/specs/ci-ui-leg-greens.md`, `docs/specs/ci-ui-leg-live-status.md` (each quoted; their row texts are
**not** rewritten), `docs/defects.md` (its `## OPEN` table is empty and both `ui`-leg defects sit in
`## FIXED (in this repo)`, each already stating **no `docs/HANDOFF.md` round and no upstream issue is
owed** — HOST/leg-owned, the `R13-HOST-FIX` precedent, so **no defect row and no HANDOFF round is owed
or added by this pass**), and `docs/HANDOFF.md` (**read and NOT changed: it carries no `ui`-leg,
`LANDED-GREEN-BUT-NOT-DONE` or unit-status clause**). **Not touched by this pass:** `src/**`,
`tests/**`, `scripts/**`, `package.json`, the `N = 9` pin, `ALL_TOOLS = 21`, the battery's `184/0`, the
measurement record and both earlier DONE records.

**Tracker reconciliation for the `U-MOUNTGUARD` per-unit DOCUMENTATION REVIEW (2026-09-27, wave D —
`AGENTS.md` item 10d/RCA-6):** the review ran **after the greens** and **before** the unit's `DONE` row;
its record is `archive/reviews/2026-09-27-U-MOUNTGUARD-doc-review.md` (**gitignored — provenance only;
every finding that needed action landed in these active trackers in the same pass**). **This file:** the
`## ⟶ COUNT RECONCILIATION` block (**UPDATE 1** — the live suite is `59 files / 916 passed *(⟶ SUPERSEDED as a live figure: the tree now reads `61` files / `1041` tests — `1039` passed / `2` skipped / `0` failed; the `59/916` reading is kept as its own pass's measurement)* / 2 skipped /
0 failed`; the `872` is kept as the `G-4` pass's own measurement), the `COUNT DRIFT` line under the
wave-C blocks, row **`D1`** (moved out of `## OPEN` into the `## DONE — U-MOUNTGUARD` slot — **NOT
written by this pass**; the supervisor owns it), the totals paragraphs, the `## OPEN` prose's counts and
this footer. **`docs/specs/mount-invariant-guard.md`:** §3.1/§4.6/§8/§3b **status annotations only** —
the **§2.1 result-shape gap that was a genuine drift** (the `expectedRootNodeId` field the landed module
returns and `S-2` asserts was missing from the documented `MountInvariantResult`) **is now documented**,
§4.6 item 3's red split is re-taken to close over all `41` red rows, the §8 index's two `OWED` cells are
marked **landed/discharged**, and the §3b status line is marked **DISCHARGED** — **no normative clause,
no row expectation and no verdict was rewritten or weakened**. **`docs/specs/mount-invariant-guard-greens.md`:**
the two `TEAR-3`/`TEAR-4` FAILs annotated **`RESOLVED-BY-PINNING`** (verdicts kept verbatim), a dated
count pointer, and the FAIL/status header annotated as that run's own pre-fix readings.
**`docs/specs/runtime-host.md`:** §3.6's *"mount empty"* / *"Idempotent"* pair and §3.7-adjacent
summary row **re-written to the drive-specific form with the old text marked** (the staleness the unit
spec could only report; `src/**` was NOT touched). **`docs/decisions.md`:** amendment **note 20** (the
review record, the two corrected counts, the §2.1 documentation gap, the layer-honesty checks and the
still-owed items). **`docs/pending.md`:** the `SCH-1`-invariant-half row's *"OWED — not filed"* / `BLOCKED`
cell **annotated FILED + green**. **`docs/FORKER.md`:** the `U-MOUNTGUARD` row's **`BLOCKED`** status and
the digest's suite count annotated. **`README.md`:** the harness-legs count block annotated with the live
figures and the new test file. **`docs/defects.md`:** **read, not changed — no row is owed** (the unit's
finding is HOST-owned and the `R13-HOST-FIX` precedent refuses a defect/HANDOFF round). **`docs/HANDOFF.md`:**
**read, not changed — no round is owed.** **Read, not written (checked, and each already carries the status this pass reconciled):** `docs/specs/provident-electron-shell-chrome-handoff-review.md` (the amended plan's **`U2`** spec cell → annotated SUPERSEDED: the spec is FILED and the unit is `DONE`, the `U1`-cell precedent), `docs/specs/runtime-host.md` (**written** — §3.6's drive-specific staleness fix, see above; listed here because it is a sibling spec, not this unit's), `docs/specs/mount-invariant-guard-greens.md` and this unit's spec (both **written**: annotations only), `docs/HANDOFF.md` (read), `docs/defects.md` (read). **Not touched by this pass:** `src/**`, `tests/**`,
`scripts/**`, `package.json`, the `N = 9` pin, `ALL_TOOLS = 21`, the battery's `184/0` and every earlier
DONE record.

**Tracker reconciliation for the `U-MOUNTGUARD` DONE pass (2026-09-27, the supervisor's pass,
`AGENTS.md` items 3/6/10d):** **this file** — the **`## DONE — U-MOUNTGUARD`** record (the authoritative
prose paragraph + its ledger row + the moved `D1` provenance row), the **`⟶ HANDOVER — for a fresh
supervisor`** block at the head of the file, the `## OPEN` totals paragraph **re-enumerated to the truth
(`4 DONE / 16 open`, `4 + 16 = 20`)**, row `D1` already moved by the unit's doc review (verified, kept
visible), and this footer. **`docs/decisions.md`** — amendment **note 21** (the wave-D go-ahead + the unit's
`DONE` record + the wave-D progression) and **five stale go-ahead cells annotated in place** (the
`U-MOUNTGUARD` ACTIVE block's trailing parenthesis, note 19, note 20's latest-note pointer, and the two
`U-PROJ` rows `PROJECTION-SIGNATURE-APPROVAL-SCOPE` + `PROJECTION-REUSABLE`) — **status/annotation notes
only; no normative clause of any row was amended.** **`docs/specs/mount-invariant-guard.md`** — the dated
**STATUS NOTE** at the head of the file recording the go-ahead, the `S-1`/host-fix outcome (cycle-2 count =
**2**), the guard's disposition (**ships**), the code/test delta, the red ledger, the legs with their layer
labels and §5.3's DONE-row order, the `[U]` row's **NOT TAKEN** reason, and the oweds; **plus §0 ruling 6,
§4.5, §7 item 1 and the filed status block annotated at their own sites** (`§5.3`'s DONE-row shape is the
checklist the record was written against). **The sibling wave-D specs `docs/specs/listhost.md` /
`docs/specs/slothost.md` / `docs/specs/projection.md`** — a dated status note + their §0 go-ahead ruling
rows + the `§7 item 1` blocker sentences annotated (the same stale clause surviving in three files the unit's
own doc review could not reach). **`docs/pending.md`** — a section-level wave-D note + the `SCH-1`
invariant-half row's `OWED`/`BLOCKED` clauses annotated (FILED, `DONE`, go-ahead given). **`docs/FORKER.md`** —
the `U-MOUNTGUARD` row's closing sentence annotated with the go-ahead's fork-facing consequence (the wave-D
order, each unit still gated on its own spec + red set). **`README.md`** — the documentation map's
`next-steps.md` entry annotated (it is the work queue **and** the handover surface; the `⟶ HANDOVER` block is
the entry point). **Read, not written:** `docs/defects.md` (**no row is owed** — the unit's finding is
HOST-owned and the `R13-HOST-FIX` precedent refuses a defect/HANDOFF round; its `## OPEN` table is empty),
`docs/HANDOFF.md` (**no round is owed**), `docs/specs/mount-invariant-guard-greens.md` (quoted — its
`TEAR-3`/`TEAR-4` verdicts keep their own text; the doc review already annotated them
`RESOLVED-BY-PINNING`), `docs/specs/runtime-host.md` (already re-pinned to the drive-specific form by the
unit's doc review — **verified, not re-edited**), and the other unit specs (`ci-ui-leg*`, `engine-*` — quoted
only). **Not touched by this pass:** `src/**`, `tests/**`, `scripts/**`, `package.json`, the `N = 9` pin,
`ALL_TOOLS = 21`, the battery's `184/0`, and every earlier DONE record. **RCA-8(c) respected:** this file is
far over 200 lines **and untracked-or-new edits were made by anchored `edit`s only — no whole-file write was
used on any existing file, and every edit verified its anchor's surrounding bytes survive.**

