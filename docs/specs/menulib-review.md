# Review — `U-MENULIB` (wave **E**, ledger row `E7`) — **GATE 1: the four-step proposal review**

**Status: STEPS `1`, `2`, `3` AND `4` HAVE RETURNED — `VALID-WITH-CONDITIONS` (step 1, 15 findings) ·
`SOUND-WITH-CONDITIONS` (step 2, 25 findings) · step 3's derivation · and step 4's verdict below.
GATE 1 IS COMPLETE AS A REVIEW AND IS NOT CLOSED, because the two architect answers of §4.2 are
`OWED`; this pass HOLDS NO SHELL, ran no leg, and every figure it quotes is a measured input or a
quoted reading, never its own measurement (`RCA-12`).**
**THE FILING HOME OF STEPS 1–3 IS THIS FILE — the two verdicts and step 3's resolution are carried by
this record as filed.** **`OWED IN THE SAME PASS AND NOT YET WRITTEN: the two provenance copies
(`archive/gate1/2026-09-27-E7-gate1-steps1-2.md` and `…-step3-architecture.md`), which `archive/`'s
gitignored convention expects beside the record — the `E4` cycle's `P-1`
(`docs/specs/relocate-review.md` §5.9) found step-1/2 reports that were *never filed at all*, and this
unit does not repeat that (§7 `P-1`; owner: the supervisor's commit pass).**
**`A-d4` AND EVERY LANDED CONTRACT ARE CITED AND NOT RE-OPENED.** The landed sibling contracts
(`gsession.md`, `zones.md`, `census.md`, `relocate.md`, `container.md`, `gutter.md`, `listhost.md`,
`projection.md`) are cited. So is `MENU-CATALOG-CONTRACT` (`SCH-5`, `docs/decisions.md:75`,
`docs/pending.md:105`, the amended gate record
`docs/specs/provident-electron-shell-chrome-handoff-review.md:288`).

---

## §1 WHAT THE PROPOSAL ASKS

`U-MENULIB` (`SCH-5`, adopted-reshaped, `ADOPTED-OS-INTEGRATION`): a **consumer-agnostic menu catalog
builder + one injected picker seam**, as **one pure shared module + its node test + its spec**. The
fork's `buildMenuFromCatalog` is **RENAMED** to a symbol with **no app item names** in the type; the
untrusted-catalog normalizer is this repo's; **no policy defaults** (no default accelerators, no
default roles); the picker is **injected, not owned**; import **semantics** stay fork-side
(`docs/pending.md:105`). Step 3 resolves the shape into one module
(`src/shared/menu-template.ts` + `tests/menu-template.test.ts`): **one pure normalizer + platform-shape
projector over caller data with one injected answering seam**, 3 value exports (`normalizeCatalog`,
`buildMenuTemplate`, `selectCatalogItem`) + 6 type declarations, the emitted five-member shape
(`items` + `platform {recognized, collapsing}`) carrying **exactly seven consumer keys verbatim**
(`id`·`label`·`accelerator`·`role`·`kind`·`submenu`·`enabled`, any other own key **dropped, never
copied**), all members typed `unknown`, one **optional** `picker` seam
(`(catalog: readonly unknown[]) => unknown`) with declared degradations, and a **required opaque
`platform` caller string** whose only structural effect is the **`'darwin'` collapse**.

## §2 FEASIBILITY VERDICT

Step 1's measured facts bind and are not in dispute: `docs/specs/menulib.md` **does not exist**;
**`src/**` ships no menu surface at all** (no `Menu`, no `setApplicationMenu`, no `accelerator`, no
`dialog`); `darwin` occurs nowhere in `docs/**`; **no `SC-7` text exists in this repo** (the only
`SC-7` occurrences are the gate record's own citations, `…handoff-review.md:31`/`:266`/`:288`); the
`E7` ledger row is missing its `Blocked on` cell. The consequence: **the whole contract is a
forward declaration with nothing in-repo to reverse-engineer from**, so its only honest legs are the
node suite and the static rows — which is exactly what step 3's layer map claims (`[H]` legs 2/3/4 +
a standalone strict `tsc`; **`[U]` refused three ways; `[D]` NOT CLAIMED**).

**The proposal is a good idea on balance, in step 3's resolved form and in no other form.** What
makes it adoptable is the prohibition audit holding and the OS boundary being **named rather than
assumed**: the mechanism emits a **caller-shaped value and nothing else**, so it composes no `Menu`,
applies no accelerator, renders no picker and asserts no equivalence between the native menu and any
in-renderer picker (that equivalence is the fork's app concern, `SCH-9`'s declined territory —
`…handoff-review.md:375`). Every remaining defect is a **filing obligation**, not a design gap.

## §3 THE VERDICT (STEP 4)

**`DELEGABLE-WITH-CONDITIONS` — and this is a verdict about READINESS FOR THE SPEC GATE, not about
any red set, green run or leg.** No red set is delegable today: `menulib.md` does not exist and
`AGENTS.md` item 11 requires the typed `§5.x` register to exist **before** a red set is authored. The
verdict says: **the spec may be FILED from step 3's resolved shape plus the conditions below, and may
then be approved as filed.**

| | Condition | Falsifiable discharge test |
| --- | --- | --- |
| **G-1** | `docs/specs/menulib.md` is filed from step 3's resolution, not from the fork's `buildMenuFromCatalog` shape. | The filed spec's `§2.1` names `normalizeCatalog` · `buildMenuTemplate` · `selectCatalogItem`, and no clause of it names `buildMenuFromCatalog` except as the RENAMED provenance (grep) |
| **G-2** | The emitted member list is pinned as **exactly seven** carried keys, others **dropped**. | The spec carries a key-set row asserting a **negative** (an eighth own key is absent from the emitted item) — not merely a positive pass-through |
| **G-3** | The platform ruling is pinned: **exactly `'darwin'`** collapses; **any other value is the identity projection**; **unrecognised ⇒ `recognized:false` and NO collapse, never a silent darwin default**. | Two static rows: a non-`'darwin'` recognized-platform case has no collapse and `collapsing:false`; an unrecognised string has no collapse **and** `recognized:false` |
| **G-4** | The seam's four degradations are separate rows: **absent/non-callable ⇒ the `'picker'`-kind item emitted DISABLED, never dropped, and `selectCatalogItem ⇒ null`** · **throwing ⇒ caught inside the wrapper, item disabled / `null` returned, counted ONCE, never propagated** · **non-`null` answer that is not a known `id` ⇒ `null`**. | Each row is individually driveable and individually falsifiable; the "counted once" clause is an asserted count, not a prose claim |
| **G-5** | The OS-boundary clause is in `§2.4` in the words the prohibition demands (emits a caller-shaped template value and nothing else; composes no `Menu`; applies no accelerators; renders no picker; opens no dialog; asserts no equivalence between the native menu and any in-renderer picker). | The clause is present verbatim in `§2.4`; a falsifier row exists for each of its six halves |
| **G-6** | Gate 6 is **`STRUCTURAL`, never waived**, with its falsifier stated. | The spec declares the falsifier: a `§5.1` containing `src/renderer/**`, `src/main/**`, the demo-envelope path, an authored element/class write, or a probe composing a real `Menu` |
| **G-7** | The `§7.1` predicate is recorded as **`DOES NOT TRIGGER`** with its own evidence and falsifier. | The predicate id, evidence and falsifier all appear in the spec |
| **G-8** | Gate 11 binds: the register lands **before** the red set, with the four domains declared and the attempt terms printed (§6). | The register tables exist in the filed spec with row ids, terms, seed, caps and subtotals |
| **G-9** | The DENIED set is carried in the spec's diff-scope section as **`src/main/**` · `src/renderer/**` · `src/preload/**` · the shim · `package.json` · any store · any MCP surface · `mcp-endpoint.md` · every sibling**, with the `src/main/**` derivation stated (§5). | A grep of the filed spec's diff scope returns all nine members and the prohibition-5 derivation sentence |
| **G-10** | The two surviving architect answers are **recorded as working defaults before the filing**, in the sibling `§7a.1` form, and **not** left as blocking `OWED` items (§4.2). | `docs/decisions.md` (or the spec's `§7a.1`) carries each default with its alternative and the clause it blocks |

**NOT TAKEN, and no later pass should take them as owed:** `[U]` (the three-part refusal stands) and
`[D]` (not claimed). **The picker's rendering is not a blocker** — `UI-RENDERED-WITH-PROVIDENT` plus
`SHELL-CHROME-CARVE-OUT-FUNCTIONAL` (`docs/decisions.md:71`) already rule a mechanism out of that
constraint's object, and step 3's prohibition audit finds all six prohibitions PASS (the last two
conditionally).

## §4 DISPOSITION OF STEPS 1 AND 2 — IN GROUPS, NOTHING UNASSIGNED

### §4.1 Step 1's 15 findings

| Group | Disposition |
| --- | --- |
| **Facts that kill the naive framing** — no `menulib.md`; no `src/**` menu surface; no `darwin` in `docs/**`; no `SC-7` in this repo | **DISCHARGED BY STEP 3** — its layer map claims only `[T]` + the three `[H]` legs, refuses `[U]` three ways, and does not claim `[D]` |
| **Provenance findings** — the fork's `SC-7` citation resolves to the sibling repo only; the `buildMenuFromCatalog` name is consumer vocabulary | **DISCHARGED BY STEP 3** (the RENAMED symbol) **+ OWED TO THE SPEC as `G-1`** (the rename must be stated in `§2.1`) |
| **Ledger/record findings** — the `E7` row's missing `Blocked on` cell; the row reads `BLOCKED → then U-GSESSION` while its dependency is `DONE` | **OWED TO THE FILING PASS** (supervisor-owned; §7 `P-2`), **not** to the spec |
| **Unverifiable-in-repo conditions** — anything the fork's app menu would have to supply | **OWED TO THE TESTWRITER** as named `[T]` rows, and to the spec's `§7.1` predicate record |

### §4.2 Step 2's 25 findings

| Group | Disposition |
| --- | --- |
| The critique's three architect questions | **`Q3` filed as a duty** (the OS-boundary clause ⇒ **OWED TO THE SPEC as `G-5`**); **`Q1` and `Q2` DERIVED by step 3 and, per §4.3, ANSWERABLE BY RECORDED DEFAULT** — **BLOCKED BY Q1** is the residue of the key-set/collapse shape and shrinks to the two rows named in §4.3, and **BLOCKED BY Q2** likewise |
| Consumer-vocabulary / app-item-name findings | **DISCHARGED BY STEP 3** — every member is typed `unknown`, no app item name or vocabulary is in the type |
| Emitted-shape and member-list findings | **OWED TO THE SPEC as `G-2`**, with the residual fork left to **Q1** (§4.3) |
| Platform-shape and collapse findings | **OWED TO THE SPEC as `G-3`**, with the residual fork left to **Q2** (§4.3) |
| Seam/degradation findings (absent, non-callable, throwing, unknown-id, counted-once) | **OWED TO THE SPEC as `G-4`**, and **OWED TO THE TESTWRITER** as the corresponding `[T]` rows and register rows |
| Refusal/leg findings (the `[U]` three-part refusal, the `[D]` non-claim) | **DISCHARGED BY STEP 3**; carried into the spec as `G-6`/`G-7` text |
| Prohibition findings | **DISCHARGED BY STEP 3** (all six PASS, last two conditionally) **+ OWED TO THE SPEC as `G-5`** for the clause that makes the last two durable |
| Process findings (reports not filed; ledger cell; the row's stale status chain) | **DISCHARGED BY THIS FILING** (step 1/2 filed here + provenance copies) and **OWED TO THE FILING PASS** for the ledger cell — §7 |

**No bare `OWED` survives: every group above names the artifact that discharges it.**

### §4.3 The two surviving questions, tested against `AGENTS.md` item 10a

**Item 10a's blocker test is: a genuine architect/design question the contract cannot answer, or a
scope/behaviour fork.** Applied honestly: **Q1 and Q2 are genuine architect-owned questions** (each
changes a public symbol/shape or a consumer-visible behaviour) — **but neither is a BLOCKER, because
each has a recorded working default with an architect-reversible alternative**, which is exactly the
`E5-B-3` precedent: *"`FILEABLE` AS A RECORDED WORKING DEFAULT … it does NOT gate the filing"*
(`docs/decisions.md:23`, whose sibling form is `docs/specs/gutter-ui.md` `§7a.1`). **So my step-4
position is: AGREE that both questions are owed to the architect; DISAGREE that either blocks the
filing.** Record both; file on the defaults; let the architect reverse by dated annotation.

| | Minimal question to the architect | Options | Recommendation | What it blocks |
| --- | --- | --- | --- | --- |
| **Q1** | *Is `buildMenuTemplate` the renamed consumer-agnostic symbol, and is the emitted item's carried key set exactly the seven own keys `id`·`label`·`accelerator`·`role`·`kind`·`submenu`·`enabled` with any other own key dropped rather than copied?* | `(A)` the step-3 pin as stated · `(B)` the same symbol with a **narrower** carried set · `(C)` the same symbol with an **allow-listed pass-through** of named extras | **`(A)`** — it is the least surprising for a fork's real catalogs and the narrowest thing consistent with "consumer data carried verbatim" | `§2.1`, the key-set rows, and `P-ML-IM-3` |
| **Q2** | *Is the collapse triggered by the single literal `'darwin'` (adjacent `'picker'`-kind items collapsing into one entry whose `submenu` carries the rest in catalog order), with every other string an identity projection and an unrecognised string emitting `recognized:false` with NO collapse?* | `(A)` exactly `'darwin'` · `(B)` a caller-supplied collapse token instead of a literal · `(C)` no collapse at all in v1 (identity for every platform) | **`(A)`** — it is the OS-integration claim `SCH-5` was adopted for, and `(B)`/`(C)` are additive later moves on a pure function | `§2.2`, `P-ML-IM-6`, `P-ML-IM-7` |

**Costs of filing on the defaults: one dated annotation if the architect picks `(B)`/`(C)`, and the
register terms for those two rows re-derived in that pass.** That is strictly cheaper than a
round-trip that holds the whole unit — and note the asymmetry: **`Q3` owes no architect answer at
all** (it is a filing duty on the spec, `G-5`).

## §5 SCOPE / CHANGE-IMPACT AGAINST THE LANDED TREE

**What `E7` adds — exactly three new files, and no edit to any existing file:**
`src/shared/menu-template.ts` (new) · `tests/menu-template.test.ts` (new) · `docs/specs/menulib.md`
(new, from this gate's conditions). **No `src/**` edit. No config change. No `package.json` change.
No new dependency** (`AGENTS.md` item 11d forbids one for the register layer anyway). The new module
is **imported by no `src/**` file**, exactly as `relocate.ts` and `container.ts` landed
(`docs/next-steps.md:2015`/`:2018`), so the build's output set is unmoved and the script-key census
that `tests/ui-leg-contract.test.ts`'s `L-1` pins must not move — which is why `package.json` is in
the DENIED set and why the add-a-leg temptation is refused.

**The derived DENIED set: CONFIRMED, with the `src/main/**` derivation SOUND and here restated so the
spec can cite it.** `src/main/**` · `src/renderer/**` · `src/preload/**` · the shim ·
`package.json` · any store · any MCP surface · `mcp-endpoint.md` · every sibling. The
`src/main/**` question is not a prohibition-5 question and does resolve by derivation: **prohibition 5
bounds UNIT ADOPTION — a (C)-admissible unit's own contract may not itself require a new MCP surface —
and a unit whose contract *requires* a new tool is still not adoptable as a unit; it never forbade this
repo adding a tool** (`PROHIBITION-5-IS-AN-ADOPTION-BOUND`, `docs/decisions.md:83`). Two independent
grounds therefore deny `src/main/**`: **(i)** the proposal's own acceptance pins *the builder imports
neither `electron` nor `fs`*, and shipping a menu surface under `src/main/**` would need one of them;
**(ii)** admission clause **(C)** admits a *reusable shell-chrome mechanism* and `S-d8`'s test is a
mechanism-vs-UI-element test (`docs/decisions.md:71`) — an Electron-shell menu **integration** is not
a mechanism, it is the shell's chrome work, which is the fork's. **A later pass asserting an edit
under `src/main/**` is a finding.**

## §6 GATE 11 ASSESSMENT

**The register binds: `AGENTS.md` item 11 + `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`
(`docs/decisions.md:88`) — `U-MENULIB` is code-bearing, the zero-row exemption is UNAVAILABLE, and the
register must exist BEFORE the red set.**

**Step 3's 11-row sketch (`P-ML-IM-1`…`IM-7`, `P-ML-SM-1`/`SM-2`, `P-ML-TP-1`/`TP-2`) — assessed
as a sketch, not as a filed register.** Over-strength · under-assertion · non-falsifiable · missing:

| Axis | Assessment |
| --- | --- |
| **Binds** | The row ids, the three typed prefixes, the domains and the falsifiability intent are all correct for this unit. **Nothing in the sketch is an `F-` row or a `§6`/`FS-n` citation used as a register row.** |
| **Over-strength** | **`P-ML-SM-1`/`SM-2` are the risk.** A pure normalizer + projector has almost no state machine; a two-row `SM` class asserting state transitions risks asserting **more than the mechanism owns** (it owns no lifecycle, no activation, no menu session). **The spec must re-derive both as state **classes of the emitted value** (`recognized` × `collapsing`), not as a machine the model does not have.** |
| **Under-assertion** | **`TP` is the gap.** The seam's four degradations and the platform's three-outcome pool are genuine **totality** claims (every input shape and every platform string lands in a declared member, never a throw), and two `TP` rows is thin. The unknown-`id` answer, the non-callable seam and the absent seam each deserve their own bounded row. |
| **Non-falsifiable** | Two hazards: a row asserting *"members are `unknown`"* is a **type-level** claim that needs the standalone strict `tsc` leg to fail (mirroring `gsession.md`'s leg 4); and a row asserting *"other own keys are dropped"* is falsifiable **only as a negative** — the spec must drive an item carrying an eighth own key and assert the emitted key set exactly. |
| **Missing** | (a) The **collapse's ordering** row (the `submenu` carries the rest **in catalog order**); (b) the **"counted once"** row for the throwing seam (an asserted count, per `G-4`); (c) a **`§5.5.2`-style honesty block** naming what the register cannot prove; (d) no row for the **identity projection** of a recognized non-`darwin` platform. |

**The four DOMAINS ARE DECLARED and I confirm the declaration**: the 12-shape catalog/entry pool; the
closed three-outcome platform pool; the picker-answer pool; and the opaque, **never-validated** `id`
domain. A domain that is *never validated* must be declared as such in the register's own terms, or the
`id` rows read as validation rows.

**The term/cap/seed form the filing MUST print** (the landed form: `container.md` `§5.5.1`,
`§5.5.3`; `docs/next-steps.md:2018`): the **row count**; the **declared total printed as the sum of
its own per-row terms** (a total that is not the sum of its terms, or a total quoted without its
terms, is a review finding — `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`); the **subtotals by class**
(`IM` / `SM` / `TP`); the **caps** `≤100` per row · `≤400` total · **stop-after-5-consecutive-failures**;
the **pinned seed** `20260927`; each row's **strategy id** and **held/broken**; and the honest note
that an **un-run register row is reported as a FAILURE, never a pass**. **The row count is an OUTCOME,
not a budget** — 11 rows exceeds the `≤8` breakdown signal, which is a **signal, never a ceiling**, and
is **no reason to merge or drop a discernible property**. **No new dependency, no fourth leg.**

## §7 PROCESS FINDINGS THIS GATE PRODUCED

| | Finding | Owner |
| --- | --- | --- |
| **P-1** | **THE STEPS 1 AND 2 ARTIFACTS ARE NOT YET FILED AS A RECORD.** This file is their filing home and the two provenance copies are written in the same pass; **a gate whose step-1/2 reports exist only in a session is the exact `E4` `P-1` defect** (`docs/specs/relocate-review.md` §5.9), and it is caught here only because this unit's step 4 filed them. | **The supervisor** (it owns gate boundaries and `RCA-8(a)` commits) — with the step-4 author as the filing hand |
| **P-2** | **THE `E7` LEDGER ROW IS MISSING ITS `Blocked on` CELL** — measured at `docs/next-steps.md:2020`: seven cells against the sibling rows' eight, and the `BLOCKED → then U-GSESSION → spec → TestWriter red` chain sits in the cell a reader would read as `Blocked on`, so **`SCH-5` is silently read as the blocker and the dependency is unreadable**. | **The next filing pass** (a cell repair, `RCA-8(d)`-safe: annotate beside, never rewrite) |
| **P-3** | **THE ROW'S STATUS CHAIN IS STALE IN A SECOND WAY:** it reads `BLOCKED` while its own named dependency (`U-GSESSION`, `E6`) is `DONE` and the tracker says `E7` is **free** (`docs/next-steps.md:405`). The row and the queue block disagree; a fresh reader can start from the wrong state. | **The next filing pass**, in the same edit as `P-2` |
| **P-4** | **NO LEG WAS RUN THIS PASS AND THIS PASS HOLDS NO SHELL** — recorded so no later pass quotes any figure here as a measurement of its own (`RCA-12`). Every figure in this record is an input or a citation. | **The supervisor**, at gate 9 (its measurement is the only one that counts) |
| **P-5** | **THE `§7.1` PREDICATE'S EVIDENCE IS A FILING DUTY WITH NO ARCHITECT ANSWER OWED** (`Q3`) — it must not be re-typed as an architect question in the next pass, which would manufacture a blocker out of a template row. | **The spec writer** (`role_spec_writer`), enforced by **this record's `G-7`** |

## §8 WHAT MUST HAPPEN NEXT, IN ORDER

1. **File the step-1/2/3 provenance copies and this record in the same commit** (`RCA-8(a)`), so the
   gate leaves a commit rather than a session (`P-1`).
2. **Record `Q1` and `Q2` as working defaults in the `§7a.1` form** — default stated, alternative
   named, blocked clause named — and **do not hold the filing for a round-trip** (§4.3).
3. **File `docs/specs/menulib.md`** carrying step 3's resolution plus `G-1`…`G-10`, its `§0`
   six-prohibition table, its `§2.4` OS-boundary clause in the ruled words, its `§5.1` diff scope with
   the confirmed DENIED set, and its typed `§5.5.x` register **with the four domains declared and the
   terms/caps/seed printed in the §6 form**.
4. **Repair the `E7` row's `Blocked on` cell and its status chain** (`P-2`/`P-3`) in that same pass.
5. **Put the spec to the spec gate** (`AGENTS.md` item 10a) — and, if the architect rules on `Q1`/`Q2`
   at that moment, land the ruling as a `DECIDED` row and re-grain the two affected register rows; if
   not, the defaults stand and the unit proceeds.
6. **Only after the spec gate: the TestWriter red** (item 9) — never before.

**The ONE thing that must reach the architect, and WHEN:** **`Q1` and `Q2`, NOW but as a RECORDED
DEFAULT, not as a stop.** The filing may proceed; the spec gate is the natural place for the answer,
and either ordering needs no second round-trip.
