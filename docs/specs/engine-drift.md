# Spec — `U-ENGINE-DRIFT`: the behavioural reconciliation / measurement pass at the moved `provident-ssr` pin (`^0.5.1`)

Status: **SPEC — FILED 2026-09-27** (wave **B**, unit `U-ENGINE-DRIFT`, the behavioural half of
architect amendment **A-d2**; spec path owed by `docs/next-steps.md`'s `## OPEN` row **B**
(**was `OWED — not filed`; this file is that filing**) and by
`docs/specs/provident-electron-shell-chrome-handoff-review.md` §8's owed-spec list
(`engine-drift.md` — **OWED — not filed (19)**).
*(**STATUS NOTE 2026-09-27 (the wave-B DONE pass + the repo-wide documentation audit — status
only; NO normative clause of this file is amended):** the unit **HAS** run and is **`DONE`** on
every leg this spec declares, landing as §0 ruling 3 authorises — a measurement record with
**zero production code and zero new tests**. **`docs/next-steps.md` row `B` has MOVED** out of
that file's `## OPEN` table into its **`## DONE — U-ENGINE-DRIFT` record** (not deleted); every
citation in this file that names *"`## OPEN` row B"* therefore resolves to that DONE record, and
the paragraph below is the pre-run filing status, kept as history.)*
**The unit has NOT run: no measurement is taken by this pass, nothing here is `DONE`, and every
numeric claim this file makes about the tree is a claim about what the sources say, not a
measurement this pass took.** Source: `docs/specs/provident-electron-shell-chrome-handoff-review.md`
— amendment **A-d2** ("Update for provident version"), the `S-d10` prerequisite item (the two engine
units land **before every shell-chrome unit**; the pin unit owns the pin, this unit owns the
**behavioural reconciliation + drift list + no silent test edits**), and the risk row **`RK-2`**
("Census / `dirtied` drift from the 0.4.x–0.5.x engine work — this repo pins **exact** census
equalities… `U-ENGINE-DRIFT` as a measurement unit; any delta ⇒ a host-side fix, never a package
patch (`AGENTS.md` item 7)").

### AMENDMENT (2026-09-27 — the `A-d3` clause-level adjudication): §3.6's "no-drift" restated as **"no drift requiring CODE"**

**What was amended and why, in one paragraph.** §3.6's zero-code shape previously required *"a
`DRIFTED` **count of zero**"* **literally** (`§3.6`'s pre-amendment list, retained below as
`SUPERSEDED`), while this unit's **measured** outcome is a **TWO-`DRIFTED`-row, zero-code** landing —
the outcome **architect ruling 3 authorises** (§0 ruling 3: a measurement record with **zero
production code and zero new tests**). `docs/next-steps.md`'s **WAVE-B MEASUREMENT CHECKPOINT** block
recorded the tension as the unit's **only** remaining gate (*"one clause-level tension remains for the
architect"*) and gated the DONE ruling on that clause's **literal** wording. **The architect
adjudicated the clause:** "no-drift" now means **"no drift requiring CODE"**, and the zero-code landing
is satisfied when **every `DRIFTED` row's routing lands as a claim/tracker correction (or an upstream
handoff item) with no host-side code and no test change owed**.

**The two `DRIFTED` rows this amendment makes landable, with their routing:**

| `DRIFTED` row | What drifted | Routing that obliges no host code and no test change | Recorded decision |
| --- | --- | --- | --- |
| **`M-14`** | a claim/count **in THIS repo** that was **never precise enough to hold** — the whole-bundle raw string census, now **RETIRED as an evidence class** (measured `24` normalized / `29` raw against the claim's `23`) | claim/tracker correction — the count authority is `ALL_TOOLS` set-equality (`R-15`) + the `RpcMethod` census (`R-15b`); owner **supervisor / doc-review**; gate **no code change** | `docs/decisions.md` **`RAW-STRING-CENSUS-RETIRED`** |
| **`M-31`** | a **PACKAGE** claim in this repo's defect row that is **stale on BOTH status and mechanism** — `undo()` of a `destroy` entry reports **`no-op`**, **not** `applied`, at `0.5.1` | tracker/handoff correction — `docs/defects.md` row **CLOSED** as *delivered-by-the-resolve-guard*, its `docs/pending.md` + `docs/HANDOFF.md` copies corrected; residue = an upstream dead-code cleanup only; **no host change and no test edit owed** (`§3.6` item 5) | `docs/decisions.md` **`UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`** |

**The clause-level consequences of this amendment: §3.6's zero-code list and item 1 are restated
there; §3.5's `DRIFTED` "obliges" cell and §5.4a's routing table are reconciled to it; §5.4's
DONE-row shape now REQUIRES the drift count with each `DRIFTED` row's disposition; and §3.7 gains
fail-state **F-9** (a hidden or unrouted drift).** **What does NOT change:** §0's four rulings; the
`UNMEASURABLE` obligations; the §3.6 stop conditions and "what obliges code" list (**intact — a
`DRIFTED` row that needs host code still means the unit does NOT land zero-code and the architect is
asked**); the mandatory statement of the drift count and its dispositions **in the record AND in the
DONE row** (a zero-code landing may never hide a drift or skip its routing); the record's zero-row
register exemption (§5.5); and every section number (**nothing is renumbered**).

## 0. The architect's rulings (recorded, NOT re-opened) and the go-ahead

**Four rulings bind this unit. They are recorded verbatim-in-substance here and are NOT open
questions for this spec, its TestWriter, its Implementer or any later pass that cites this file.**

| # | Ruling | Where it lands |
| --- | --- | --- |
| **1** | **The go-ahead is WAVE B ONLY** (architect, 2026-09-27): this unit proceeds; **the remaining waves are re-adjudicated at this unit's checkpoint** — not before, not by this unit. Wave **A** is closed (`U-ENGINE-PIN` is `DONE`, 2026-09-27); waves **C–F** are **not** authorised by this go-ahead. | §1, §6, §7.1 |
| **2** | **`0.2.1`-baseline capture is EXCLUDED** (architect, 2026-09-27). The two controls `R-16`/`R-17` were **re-labelled as forward pins on `0.5.1`** during the pin unit (`docs/specs/engine-pin.md` §3b **`AF-1`**/**`AF-2`**; §4.1's "What the two controls are NOT"), and **the `0.2.1` dist is no longer installed**, so **no historical-baseline capture is owed**. **The measurement is on `0.5.1` only**, and this spec must say **plainly which claims that makes UNMEASURABLE** rather than pretending they are covered. | **§0.2**, §3.6, §3.7, §4 |
| **3** | **The unit may legitimately land as a MEASUREMENT RECORD with ZERO production code and zero new tests, and its DONE row MUST SAY SO.** The record is defined exactly (§3.0/§3.1) and its path is **chosen, not left open**: `docs/specs/engine-drift-measurements.md` (rationale in §3.0). | §3.0, §3.1, §5.1, §5.4, §6 |
| **4** | **The existing suite under the new pin IS the red** (the unit's own framing). The spec must state **how that red is established and reported**, and **what a "no-drift" outcome looks like versus what obliges code**. | §4, §5.4, §6 |

### 0.1 The pin-unit layer this unit inherits (read so nothing is re-litigated)

The pin unit is **`DONE` (2026-09-27)** and **COMPLETE on every leg its spec declares**, the live
`npm run divergence` leg included (`R13 RESULT: 9 checks, 0 failures`, **post-change** tree, after
the supervisor landed the harness spawn fix — `docs/specs/engine-pin.md`'s status block and
`docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE`). **This unit inherits, and may not
re-open:** the retarget itself (`package.json:23` = `^0.5.1`, read this pass), the scoped shim
completion (`ShimElement.removeAttribute`, incl. the `id` and `value` slot clears), the
**shape-only** host guard at both call sites, the pane seam
(`SecurePanels.applyPaneMutation(nodeId, mutation)`), the **ruling-1 pass-through** contract
(a nullish attribute-path write is a legitimate REMOVAL and is **applied**), the forward-pin
relabel of `R-16`/`R-17`, the AF-9 **count-freeze re-parameterisation rule**, and the four
`0.5.1` forward pins' provenance. **A later pass that re-litigates any of them is repeating a
landed ruling.**

### 0.2 What ruling 2 makes UNMEASURABLE — stated once, plainly, in this spec's own voice

| Claim the trackers or the pin-unit rows carry | Measurable here? | Why |
| --- | --- | --- |
| *"`0.2.1` → `0.5.1` changed nothing observable"* (`R-16`/`R-17`'s **superseded** label; `AF-1`/`AF-2`) | **NO — UNMEASURABLE** | No `0.2.1` dist is installed, no `0.2.1` rendered bytes exist in this tree, and **the architect EXCLUDED the historical-baseline capture (ruling 2)**. The two controls are **forward pins on `0.5.1`** (`docs/specs/engine-pin.md` §4.1 `R-16`/`R-17` + "What the two controls are NOT") and are **explicitly NOT retarget evidence**. |
| *"the 0.4.x-era behaviour was matched"* (`docs/next-steps.md` `## OPEN` row **B**'s phrase *"behavioural reconciliation of 0.4.x/0.5.x"*) | **NO — UNMEASURABLE** | **No `0.4.x` dist is installed and this repo records no `0.4.x`-era `dirtied`/`journal` baseline anywhere.** The only in-repo pins are (a) the `0.5.1`-tree **forward pins** (`R-16`/`R-17`), and (b) **the suite's own assertions as they stand**. A "no-drift" verdict is therefore establishable **against the in-repo pins and the moved pin's own suite** — never against `0.2.1` or `0.4.x` bytes. **This contradicts the row's wording and is reported rather than silently reconciled (§7.2 item 1).** |
| The pinned **census** equalities, `dirtied` non-emptiness/identity, the journal report shape, `maxJournalLength` wiring, boolean-attribute emit | **YES** | Provable on layers this repo owns (§2, §2.3), against the installed `0.5.1` dist and the tracked files. |
| **Real-DOM** attribute serialization; real-DOM boolean-attribute presence | **NO — UNMEASURABLE at this unit's layers** | The divergence harness has **no attribute-presence extractor** (`H-r10` is owed to `U-DIVERGENCE-EXT`) and its demo envelope authors no `inert`/`hidden` prop (`docs/specs/engine-pin.md` §4.4). The `ui` leg does not exist. |

## Layer declaration (read this before any table below)

**This spec is DOC/MEASUREMENT-LAYER: it declares a measurement contract. No leg of it has been
run by this pass.** The following are the **only** layers a measurement row of this unit may be
read on, and every row in §3 carries its layer label.

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) run under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — the `Runtime` public API, `SecurePanels`, `src/main/mcp-server.ts`, `src/shared/types.ts` | not engine-internal behaviour |
| **[E]** | engine-side | the **installed** `provident-ssr` `0.5.1` dist's own behaviour, as observed through a public engine surface | not a package defect call — see §5.4a |
| **[B]** | shim-battery host | the shim host driven over MCP by `npm run battery` (`src/main/battery-host.ts`, `tests/e2e-battery.test.mjs`) | not the assembled app |
| **[A]** | assembled app | `npm run divergence` (real Electron + real DOM vs the shim, **structural surfaces only**) | **never IPC-layer evidence** — see §2.3's `LIVE-OP-REJECT` lesson |

**Three honesty anchors, carried from the pin unit so no row here over-reads its layer:**

1. **A green node-suite is envelope/pure-layer evidence** — it says the repo's vitest files pass
   under the shim. It is **not** assembled-app evidence: no window is booted, no IPC round-trip
   runs, no MCP transport is exercised, no real DOM is touched
   (`docs/specs/engine-pin-greens.md`'s layer caveat, carried by §1 of that file).
2. **A green divergence leg is STRUCTURAL-SURFACES-ONLY evidence, never IPC-layer evidence.**
   The `9 checks, 0 failures` leg compares the harness's structural surfaces; it asserts **no
   attribute row**, and it is **silent** on the app's `provident.op` hop. **The `LIVE-OP-REJECT`
   lesson is the proof:** the pin unit's envelope-layer `PA-*`/`P*`/`E-11` rows were **green**
   while the **assembled app refused every `provident.op` command shape** — a HOST-owned,
   pre-existing defect (the renderer IPC unwrap; **since FIXED + LIVE-VERIFIED, 2026-09-27**,
   `docs/defects.md` `## FIXED (in this repo)`, `docs/decisions.md` `LIVE-OP-REJECT-CLOSED`).
   **No row of this unit may convert an envelope green into an IPC claim, and none may read a
   `9/0` divergence as an IPC pass.**
3. **The `0.5.1` statements this tree carries are partly `(engine recon)`-attributed.** Where a
   claim is a **recon** claim (e.g. the engine's closed boolean set, `docs/decisions.md`
   `ENGINE-PIN-0.5`; `docs/pending.md` `UPSTREAM-CAPABILITY-FLOOR`) **this unit MEASURES it or
   files it UNMEASURABLE — it never asserts it.** `recon` is an attribution, not evidence.

## 1. Scope

**One deliverable: the measurement record** (§3.0/§3.1) — the census / `dirtied` / journal /
boolean-attribute reconciliation of the **existing suite and legs under the moved pin**, plus the
pin-unit hand-offs enumerated in §3.3, each recorded as a **verdict-carrying row**.

1. **The red is the existing suite under the moved pin** (ruling 4). The repo's own suite, the
   battery and the divergence leg, **as they stand**, are run on the `0.5.1` tree and every
   failure is recorded — see §4. **This unit may not edit an existing test to make a row pass**
   (`S-d10`'s "no silent test edits"; `docs/specs/engine-pin.md` §6 stop condition 4).
2. **The measurements** of §3 are taken with the probes of §2. If a measurement is not takeable
   on a permitted layer, it is recorded **UNMEASURABLE with its reason and its revisit
   condition** — never silently omitted (ruling 2's explicit demand).
3. **Any delta is routed, never patched here** (§5.4a): a **host-owned** delta is a host fix with
   a regression row under an architect ruling; a **package** delta is a
   `docs/defects.md` + `docs/HANDOFF.md` issue. **`node_modules/provident-ssr/**` and
   `../Preempt-Providence/**` are NEVER edited** (`AGENTS.md` goal 1 + item 7).
4. **The unit may land ZERO production code and ZERO new tests** (ruling 3) — but **only** if the
   measurement record exists, is complete over §3.1's 9 columns, and its DONE row says so
   (§5.4's zero-code shape).

**Explicitly OUT of scope (do not do in this unit):**

- **Any engine fix, shim change, host guard change, or wrapper.** No `ShimElement` member (the
  shim stays at its one admitted completion); no `Supervisor`/`clientAPI` wrapping (`docs/specs/engine-pin.md`
  §1's REJECTED option, recorded); no predicate change (re-broadening it into a value check would
  **reverse ruling 1**). **This unit re-measures; it does not re-decide.**
- **Any new MCP surface.** No tool, resource, group, `VALID_GROUPS` member, `RpcMethod` member or
  `MUTATING_METHODS` entry. `ALL_TOOLS` **stays 21** and `RpcMethod` **stays 21** for this unit
  (§3.4); the `21 → 22` moves belong to `U-FOCUS-TOOL` and land **in the same commit as that
  tool** (`docs/specs/engine-pin.md` §3b `AF-9`).
- **Any change to a pinned, passing harness leg.** `npm run divergence`'s **`N = 9` is a PIN**
  and **is not touched** by this unit; the `H-r10` extractor + scenario channel belong to
  `U-DIVERGENCE-EXT`.
- **Any wave C–F unit.** `U-REALDOM-BOOT`, `U-DIVERGENCE-EXT`, and every `SCH`-derived unit are
  **not started** under ruling 1.
- **Any `0.2.1`/`0.4.x` install, fetch, or registry read.** No in-session install route exists,
  and ruling 2 excludes the baseline capture. **No test may install or read the registry**
  (`docs/specs/engine-pin.md` §2.1).
- **Any claim about `bodyRuns`/`BARE-TEXT-EMIT`.** `H-r11` forbids the overclaim outright; this
  repo authors no `type:'text'` node and no `bodyRuns` (`docs/pending.md`
  `UPSTREAM-DIAGNOSTICS-BODYRUNS`). **Recording a `console.warn` observation is permitted (it is
  a measurement); claiming the channel is verified is not.**
- **Re-labelling, deleting or "fixing" a pin-unit row.** This unit **may** add
  `SUPERSEDED`-style status corrections to its **own** record; it may **not** edit the pin unit's
  spec, greens or trackers (those are the supervisor's / doc-review's pass).
- **`docs/skills/designing-pages.md` and the page-design layer.** **No such file exists in this
  tree** (verified by glob over `**/designing-pages*`: no match), and this unit changes no page
  design. **Recorded so no later pass looks for an owed page-design update that ruling 3 does not
  create.**

## 2. The probe surface (what a measurement may be taken WITH)

**The distinction that decides validity (§3.2): a probe may only drive a surface the docs name as
public. A number read off a private field, an engine internal, or a monkey-patch is NOT a
measurement of this unit.** This mirrors the pin spec's honesty boundaries
(`docs/specs/engine-pin.md` §2.4b item 4 — "no public pane-side accessor converts an authored
`props.id` into an engine nodeId"; §7.11 — the pane-side `listTargets`-analogue is
**recommended, NOT admitted**).

### 2.1 PERMITTED probe surfaces

| # | Surface | Exact form | Rows it can carry |
| --- | --- | --- | --- |
| **P1** | **The `Runtime` public API under node** | `new Runtime({mount, envelope, maxJournalLength?})` · `bootstrap()` · `load(req: LoadPayload): LoadResult` (`src/renderer/runtime.ts:356`, read) · `applyCommand(cmd: {kind: string; node?: string; [k: string]: unknown} \| null \| undefined): {status: string; dirtied?: string[]; minted?: string[]}` (`:380`, read) · `op(cmd: unknown): OpResult` (`:598`) · `dispatch(req: DispatchRequest): Promise<DispatchResult>` (`:1069`) · `renderedHtmlResult(): RenderedHtmlResult` (`:1102`, read — `{renderedHtml, ssrHtml, census}`) · `markdownResult()` / `markdown()` (`:1112`/`:1137`) · `listTargets(): ListTargetsResult` (`:1149`) · `teardownResult(): Promise<TeardownResult>` (`:571`) · `journal(action: 'undo'\|'redo'\|'replay'): Promise<JournalResult>` (`:620`, read) | **[H]/[E]** census, `dirtied`, journal, boolean emit, pane seam via its own public method |
| **P2** | **The DOM shim + the engine's published adapters mounted on it** | `ShimElement` directly; the engine's published `DomAdapter` / `SSRFragmentAdapter` surface | **[T]** shim states, attribute serialization on the SHIM side |
| **P3** | **The battery host over MCP** | `npm run battery` → `tests/e2e-battery.test.mjs` driving `src/main/battery-host.ts`'s tools (`provident.load`/`op`/`get_rendered_html`/`dispatch`/`list_targets`/`journal`/`validate`/`export`/`teardown`) | **[B]** the shim host's census/`dirtied`/journal behaviour through the real tool surface |
| **P4** | **The `SecurePanels` public seam** | `new SecurePanels(mount)` · `refresh()` · **`applyPaneMutation(nodeId, mutation)`** (the pin unit's ONE admitted production seam) · `dispatch(id)` | **[H]** the pane channel's census/pane behaviour. **Its first parameter is the ENGINE `nodeId`** — an authored `props.id` is an unresolved id; see §3.2's `INVALID` class 6 |
| **P5** | **`npm run divergence`** | `scripts/electron-divergence.mjs` — the assembled app vs the shim battery host on the harness's **own** comparison set | **[A]** the harness's **structural** comparisons only (§2.3) |
| **P6** | **Repo JSON + the installed engine manifest** | `package.json` · `package-lock.json` · `node_modules/provident-ssr/package.json` | **[H]/[E]** version/pin agreement (§3.3 item 1) |
| **P7** | **The built artifact** | `dist/main/main.cjs` after `npm run build` (the artifact census the pin unit's greens used for `ALL_TOOLS`, `docs/specs/engine-pin-greens.md` §2.9 `G-06`/`G-06b`) | **[H]** artifact-level census claims — **and only with the exact artifact a leg drove** (§3.2 `INVALID` class 2) |

### 2.2 FORBIDDEN probe surfaces — a row taken on any of them is INVALID by construction

| # | Forbidden | Why | What to do instead |
| --- | --- | --- | --- |
| **F1** | **Engine internals read directly** — `dist/core/*` private fields, `Supervisor`'s private stacks, `ctx.clientAPI.***`, `ctx.node.receiveNextState` — to **derive** an observable | The contract's boundary is the **command surface** + published adapters; a private read measures this repo's reading, not the engine's behaviour (`docs/specs/engine-pin.md` §2.3's boundary statement; `ENGINE-PIN-SHAPE-ONLY-PREDICATE`) | Drive the same behaviour through **P1/P2/P3** |
| **F2** | **Private host members** — `Runtime`'s `supervisor`, `nodes`, `prevStates`; `SecurePanels`' private `supervisor`; `paneMutationValid` | The pin unit's own blind harness had to read a private field for pane-id resolution and **recorded it as a harness detail, NOT a contract route** (`docs/specs/engine-pin.md` §7.11, §2.4b item 4) | Use a documented route; if none exists, the row is **UNMEASURABLE — no public route** (that is exactly the §3.3 `A-10`-family handling) |
| **F3** | **Monkey-patching / instrumenting a shipped module** to make an observable appear | Changes the thing measured; the pin unit's instrumented-completion rows (`B-11`/`B-12`) instrumented the **shim under test** on the **[T]** layer only — never a shipped path | Take the observable on a layer that exposes it; else **UNMEASURABLE** |
| **F4** | **Editing any tracked file to change what a leg reports** — an existing test, a harness script, a spec, or `src/**` — before/while taking the measurement | It is the "silent test edit" `S-d10` forbids and it destroys the red (ruling 4) | Record the delta (§3.5) and route it (§5.4a) |
| **F5** | **Adding assertions to a pinned harness** (`scripts/electron-divergence.mjs` — **`N = 9` is a PIN**) | The harness change belongs to `U-DIVERGENCE-EXT` | Record the **UNMEASURABLE** row with `H-r10` as the revisit condition |
| **F6** | **Reading `tests/**` to derive a measurement that claims to be blind** | The blind layer's own rule (`docs/specs/engine-pin-greens.md`'s closing note) | This unit's rows are **not** blind rows and may read `tests/**`; a row that claims blind provenance may not (§3.2 `INVALID` class 5) |

### 2.3 The divergence leg's exact scope (so an `[A]` row is not over-read)

**Documented scope, as the pin spec records it** (`docs/specs/engine-pin.md` §4.4 and
`docs/decisions.md` `ENGINE-PIN-DIVERGENCE-LEG-IN`, both cited **by section/ID, never by line**):
the leg buys the harness's **structural** comparisons — **census `inTree`, census `registered`,
normalized `dirtied` ids, normalized SSR fragment, `data-node-id` set, nodeId vocabulary, the
counter rendered in BOTH, and dispatch-results-non-empty** — and its result line is
`R13 RESULT: 9 checks, 0 failures` (the repo's own driver, post-change tree, after the harness
spawn fix).

**The 9-check arithmetic, and one correction that must be recorded (not silently repeated).**
The pin unit's `§5.3` leg-6 bullet and `§4.4` enumerate the comparison set as **eight** structural
comparisons; the legs table in `docs/specs/engine-pin-greens.md` records the run as
`R13 RESULT: 9 checks, 0 failures`, and `docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE`
records the same **9**. **This spec does not resolve the 8-vs-9 difference from its own reading,
and deliberately does not invent a ninth check name:**
`scripts/electron-divergence.mjs`'s **own** summary line is the authoritative statement of `N`,
and **`N` is a PIN owned by `ci-divergence-leg.md` §5 + `docs/decisions.md`
`DIVERGENCE-LEG-GREEN-POST-CHANGE`.** A **single** `ok(...)`-labelled check in that script is
attributed by its own string (`'electron: dispatch renderedNonEmpty'`) while the eight comparison
labels are quoted from the pin spec's list — **the enumeration in this spec is therefore
partially attributed, not fully re-read, and is marked as such.** **Consequence for this unit's
rows: no row may assert a check LABEL; rows assert the leg's own result line + exit code, and the
leg's scope as the pin spec words it.**

**The `counterPresent` observation, recorded as a caveat rather than a finding.** That check's
label is *"counter increment rendered in BOTH"*; the observable its own source comment describes
is the rendered HTML containing 'counter' — a **substring** test on a demo whose envelope also
authors `counter-card` / `counter-value`, so it can be satisfied without the increment being
rendered. **The legs are green and this caveat does not change any verdict; it is recorded so a
later pass does not read that check as an increment-render assertion.** *(This is a
source-reading observation by this pass, marked accordingly; the script is `U-DIVERGENCE-EXT`'s
file and this unit changes nothing in it.)*

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[E]** engine-side · **[H]** host-side · **[T]** harness-side ·
**[B]** shim-battery host · **[A]** assembled app (see the Layer declaration).

### 3.0 THE DELIVERABLE: the measurement record — where it lives (the choice, stated)

**Chosen path: `docs/specs/engine-drift-measurements.md`** — a **separate file**, not a section of
this spec. **Three reasons, stated so the choice is auditable:**

1. **The spec is the frozen contract; the record is append-only evidence.** Rows the unit's
   TestWriter and supervisor write **after** this spec is filed (verbatim observed values) would
   otherwise mutate the contract file, which is the exact hazard the repo's doc-review gate exists
   to catch (`AGENTS.md` item 10d, RCA-6).
2. **The record outlives the unit.** `docs/next-steps.md`'s row **B** — **MOVED 2026-09-27: the
   row is now that file's `## DONE — U-ENGINE-DRIFT` record (its measured history is the
   `## WAVE-B MEASUREMENT CHECKPOINT` block), and the `## OPEN` table keeps only a provenance row
   naming the move** — names a *"census/`dirtied`/journal measurements **recorded**"* deliverable; a separate file is a citable artifact other
   units can re-run against (`U-FOCUS-TOOL`'s census change, `U-DIVERGENCE-EXT`'s extractor,
   `U-REALDOM-BOOT`'s `ui` leg), whereas a §-numbered section of a `DONE` spec is read as history.
3. **It keeps this spec readable with the record deleted** — the same discipline
   `docs/decisions.md` imposes on `U-THEME`/`U-THEME-CONTROL` (a mechanism spec must be readable
   with the demo deleted).

**Fallback, admitted only if the supervisor rules it:** the same table may live in **this file's
§3.3.1** as a clearly-fenced "RECORD (measurements taken YYYY-MM-DD)" block. **This spec's
normative text does not depend on the location** — it depends on the 9 columns of §3.1 and the
verdict vocabulary of §3.5. **No third location is admissible.**

### 3.1 The exact shape of a measurement row (all 9 columns REQUIRED)

`docs/specs/engine-drift-measurements.md` carries, as its first content block, this schema, and
one table with **exactly these nine columns in this order**:

| # | Column | Required content | A row is INVALID if… |
| --- | --- | --- | --- |
| 1 | **`M-n`** | a stable row id, `M-1`, `M-2`, … in filing order; **never renumbered**; a superseded row keeps its id and gains a `SUPERSEDED` note | the id is reused for different content |
| 2 | **Measurement** | one sentence naming **exactly what was observed** — no claim, no verdict | it states a conclusion ("no drift in census") instead of an observation |
| 3 | **Source row id + section** | **each** row/probe/finding it tests, **cited by its own id AND section** (`docs/specs/engine-pin.md` §3a `A-4`; §3b `AF-4`; §3.3 `PA-2`; §5.3 leg 6; `docs/specs/engine-pin-greens.md` §4 `SC-2`; `docs/next-steps.md` `## OPEN` row B; `docs/decisions.md` `ENGINE-PIN-0.5`; `docs/pending.md` §C; `RK-2`) — **loose paraphrase is not a citation** | it cites a file without its row id, or cites a line number into `docs/next-steps.md` (**never cite that file by line** — its own CURRENT WORK block forbids it) |
| 4 | **Command / probe** | the **exact** invocation, reproducible verbatim: the npm script **or** the node/module call with its arguments, the envelope/fixture used, the resolved target, and the layer label | a reader cannot reproduce it; or the probe is on a §2.2 forbidden surface |
| 5 | **Tree / stack** | what it was taken on: the **built tree** (`npm test` suite state / `divergence` after `npm run build`), the **declared pin** (`package.json:23`), the **installed dist version** (`node_modules/provident-ssr/package.json`), node version, and Electron version where an `[A]` row is involved | the tree is not identifiable, **or** it is not the final tree (§3.2 `INVALID` class 2) |
| 6 | **Observed value (verbatim)** | the raw output — the object, the string, the number, the throw message — **quoted, never paraphrased**, and for a normalized comparison **the pre-normalization form as well** | it is a summary; or a normalized-id claim records only the normalized form (§3.2 `INVALID` class 3) |
| 7 | **Claim it tests** | the exact in-tree claim, quoted, with its owning row id (e.g. `"inTree === 23 at d12"`, `tests/runtime-battery.test.ts:100-101` → *the claim* is the assertion, the *source row* is the unit's `§6` stop-condition-2 list) | the claim is not a claim this repo actually carries |
| 8 | **Verdict** | exactly one of **`CONSISTENT`** / **`DRIFTED`** / **`UNMEASURABLE`** (§3.5) | it uses any other word, or hedges (`CONSISTENT-ish`, `probably`, `assumed`) |
| 9 | **Follow-up** | for `DRIFTED`: the routing (§5.4a) + the owner + the gate it needs (**a claim/tracker correction that owes no host code and no test change is a complete entry — §3.6's amended "no drift requiring CODE" clause; this cell is what the record's tally and the DONE row's disposition list are read from**). For `UNMEASURABLE`: the **named revisit condition** (what would make it measurable). For `CONSISTENT`: `none` — **an empty follow-up is a claim that nothing is owed, and it is not optional** | `DRIFTED` with no route; `UNMEASURABLE` with no revisit condition; a blank cell |

**The record's own header must also carry:** the unit id (`U-ENGINE-DRIFT`), the date of each
measurement pass, **the tally by verdict** (`N` rows = `a` `CONSISTENT` + `b` `DRIFTED` +
`c` `UNMEASURABLE` + `d` `INVALID`), and the `INVALID` rows kept **in place** with their reason and
their replacement row's id. **`a + b + c + d` must equal `N`** — an arithmetic that does not
reconcile is a review finding, exactly as in `docs/specs/engine-pin-greens.md` §6's status
arithmetic.

### 3.2 What makes a measurement INVALID (the fail-states of the record itself)

**An `INVALID` row is not a failed measurement — it is a measurement that cannot support any
verdict. It is recorded (never deleted) and re-taken. An `INVALID` row may never be counted as
evidence, may never be reported as `CONSISTENT`, and may not be quietly dropped.**

| # | Invalid class | Detection rule | Required handling |
| --- | --- | --- | --- |
| **1** | **Wrong tree** | The row was taken on a tree that is not the final `0.5.1` tree: a pre-change tree, a tree with uncommitted edits, or a tree whose `package.json:23` / installed dist disagree | Retake on the final tree; if it cannot be retaken, the row becomes **UNMEASURABLE** with the reason |
| **2** | **Stale build / stale dist** | An `[A]`/`[H]`-artifact row read a `dist/**` artifact **not** produced by the `npm run build` of the same tree the row names, or a row was taken while `node_modules/provident-ssr` reported anything other than the declared pin's version | Rebuild, re-read the installed manifest, retake. **A `0.2.1` dist under a `^0.5.1` pin is the half-installed signature** (`docs/specs/engine-pin.md` §3.7's version-skew row) — the row is `INVALID`, and the tree state is itself a finding |
| **3** | **Unnormalized ids in a normalized-id claim** | A row claiming a `dirtied`-id or `data-node-id` **match** compared **raw** ids across hosts | Retake with the normalization form §3.4.2 pins; **record both forms** |
| **4** | **Private surface** | The probe derived its observable through any §2.2 `F1`/`F2` surface (engine internals, a private host member) | Retake through a permitted surface; if none exists, **UNMEASURABLE — no public route**, with the missing route named |
| **5** | **A claim from a layer that cannot carry it** | An **[E]/[T]/[H]/[B]** observation is used to support a **real-DOM** or **IPC-layer** claim; or a **blind** claim rests on a read of `tests/**`/`src/**` | Split the row: the envelope-layer fact may stand as its own row; the un-carryable claim becomes **UNMEASURABLE** with the layer named (e.g. *real-DOM attribute serialization: no extractor — `H-r10`*). **This is the `LIVE-OP-REJECT` class** |
| **6** | **Wrong vocabulary** | A pane row addressed a node by its **authored `props.id`** where the surface requires the **engine `nodeId`**, or a mutation targeted a spelling the contract names as **INERT** (a bare attribute name; the `css:<key>` colon twin) and called the result a removal | Retake with the engine `nodeId` / the four prefixed spellings (`props.<key>`, `css.<key>`, `props:<key>`, `css:<key>`). **A bare name or colon twin is ALLOWED but is NEVER the row that proves a removal** (`docs/specs/engine-pin.md` §3.4 `PA-9`/`PA-10`) |
| **7** | **Instrumented subject** | The probe monkey-patched or edited the module under measurement (§2.2 `F3`/`F4`) | Retake un-instrumented; the instrumented row is kept as `INVALID` with its reason |
| **8** | **Unreproducible command** | Column 4 cannot be run by a fresh agent (missing args, missing envelope, missing target) | Complete it; a row whose command cannot be completed is `INVALID` and gets a **new** row id |

### 3.3 The measurement list (each entry: the measurement, its source row id, its layer)

**Legend for `Layer`:** the labels of the Layer declaration. **`Src`** cites the row **and its
section** in the file that hands the measurement to this unit. Rows marked **`[R]`** are
**REPORTED CONTRADICTIONS** — the sources disagree and this spec does not silently reconcile them
(§7.2).

#### 3.3.1 Version / pin agreement (the measurement must state WHICH tree it is on)

| id | Measurement | Src | Layer |
| --- | --- | --- | --- |
| **M-1** | The declared pin and the installed dist agree (`^0.5.1` / `0.5.1`), and the install's three accepted devDependency moves are as recorded | `docs/specs/engine-pin.md` §4.1 `R-14` (+ `/4.1` §4.4 `P-IM-4a`); `docs/decisions.md` `ENGINE-PIN-0.5`, `ENGINE-PIN-DEVDEP-JUMP-ACCEPTED` | [H]/[E] |
| **M-2** | `package-lock.json` resolves `provident-ssr-0.5.1.tgz` (installer-owned; bytes read, not asserted) | `docs/specs/provident-electron-shell-chrome-handoff-review.md` §4.1; `docs/specs/engine-pin.md` §2.1 | [H] |

#### 3.3.2 Census claims (`inTree` / `registered` / `unplaced` / `destroyed` / `prototypes`)

| id | Measurement | Src | Layer |
| --- | --- | --- | --- |
| **M-3** | The `Census` surface the host reports has **exactly** the five fields `registered`, `inTree`, `unplaced`, `destroyed`, `prototypes`, and the MCP render result carries them | `src/shared/types.ts:85-91` (read: `interface Census`); `docs/specs/mcp-endpoint.md`'s census clause (*"a node/compile census (registered / in-tree / unplaced / destroyed / prototypes) for debugging exposure"*, read); `docs/specs/debug-panel.md`'s census line | [H]/[T] |
| **M-4** | The pin unit's own scenario envelope's census: `registered` / `inTree` = 5, the rest 0 | `docs/specs/engine-pin.md` §4.1 `R-17`, §4.2 (the `BASE` envelope); `docs/specs/engine-pin-greens.md` §2.9 `CEN-1`, §2.7 `P-IM-4b` | [T] |
| **M-5** | The demo envelope's census on the final tree (`npm run divergence`'s `census inTree` / `registered`, Electron vs shim) | `docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE` (**census 12/12 on both legs**, recorded); `scripts/electron-divergence.mjs`'s comparison set | [A] + [B] |
| **M-6** | After `teardown`, `inTree === 1` | `tests/e2e-battery.test.mjs:57-58` (read: `ok('post-teardown inTree === 1', …)`) and `:106`; the claim is named in `docs/specs/engine-pin.md` §6 stop condition 2's pinned-equality list | [B] |
| **M-7** | The path-fork cycle variant at d12: `inTree === 23` and `registered === 23` | `tests/runtime-battery.test.ts:97-102` (read) and `tests/gemma4-blind-battery.test.ts:190-196` (read); named in `docs/specs/engine-pin.md` §6 stop condition 2's list | [H] |
| **M-8** | The four fork-stress d12 variants: `inTree === 23` and `registered >= 23` (**never equality** — the REQ-GAP-11 discipline) | `tests/e2e-battery.test.mjs:130-148` (read: the `ok(...)` pair at `:146`/`:148`) | [B] |
| **M-9** | The path-fork translation at d12: `translateLegacy(...).nodes.length === 23` | `tests/path-fork-cycle.test.ts:93-98` (read) | [T] |
| **M-10** | The placement-routed depth-4 envelope: `inTree === 7`, and the `data-node-id` element count is a bounded band (`> 3`, `< 100`) — **the exact count is explicitly not pinned** | `tests/runtime-host.test.ts:182-194` (read) | [H] |
| **M-11** | `[R]` **The `inTree` arithmetic contradiction.** Two tracked claims describe d12: **(a)** `inTree = 2·depth − 1 = 23` (the static family's census) and **(b)** `inTree = 2^d − 1 + 2(d−1)` **= 4117** at d12 (the **clone-form** runtime census). `docs/specs/e2e-test-battery.md` (read) states (a) as the battery's contract **and** states that the `inTree === 4117` runtime census *"is **wrong** for these variants (that count belongs to the clone form, not in the battery)"*; `docs/FORKER.md` §4's `R1-R16` digest (**read**) reproduces (b) as a **fork-stress** census-arithmetic reshape. **Both numbers are in the tree; they are the two populations, and no source in this repo records a measurement of either on `0.5.1`.** | `docs/specs/e2e-test-battery.md` (census block, read); `docs/FORKER.md` §4 `R1-R16` → `R4` (**read**); `tests/runtime-battery.test.ts:97-102`; `tests/e2e-battery.test.mjs:130-148` | [H] + [B] |

**Census rows must record the population, not just the number.** A census measurement is only
meaningful with **(i)** the envelope/fixture it was taken on, **(ii)** the load route (envelope
load vs commands load vs placement-routed `compilePath` per node), **(iii)** the moment (post-load
/ post-dispatch / post-teardown), and **(iv)** the field name — `inTree` vs `registered` are
**different populations** and the repo's own discipline is *assert `inTree`; treat `registered`
as `>=`, never equality* (REQ-GAP-11; `docs/specs/e2e-test-battery.md` read).

#### 3.3.3 `RpcMethod` / `ALL_TOOLS` census (and the stale-count pair)

| id | Measurement | Src | Layer |
| --- | --- | --- | --- |
| **M-12** | `RpcMethod` has **21** union members; the exhaustive runtime census asserts **21** | `src/shared/types.ts:259-280` (**read: 21 members**, `dispatch` … `module.list`); `tests/engine-pin-version.test.ts:169-199` (**read**: the `RPC_METHOD_CENSUS` record + `expect(Object.keys(RPC_METHOD_CENSUS).length).toBe(21)` at `:197`) | [T] |
| **M-13** | `ALL_TOOLS` is a **21-name set** (18 `provident.*` + the `module.*` trio), the two census halves describe the same set, and the default-gate registered subset is **7** | `tests/engine-pin-version.test.ts:85-167` (**read**: `PINNED_TOOL_SET` 21 names, set-equality at `:126`, the duplicate check at `:127`, the `PINNED` tool→group map at `:138-160`, the same-set check at `:163`); `src/main/mcp-server.ts:281-303`; `docs/FORKER.md`'s counts block + `docs/pending.md`'s doc-drift row (both list **21** today, default gate **7**) | [T]/[H] |
| **M-14** | A **raw** tool-ish string census over the built bundle reads **23** (the 21 `ALL_TOOLS` + the gate-map-only group keys `module.enable`/`module.disable`) — **⟶ SUPERSEDED (2026-09-27, factual restatement only — NOT a normative clause of this contract): the measured value is `24` normalized / `29` raw; the whole-bundle raw string census is RETIRED as an evidence class. Corrected by the supervisor/doc-review pass routed by `docs/specs/engine-drift-measurements.md` `M-14` (`DRIFTED`); see `docs/specs/engine-pin-greens.md` §3a `F-6`'s correction block + `docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`. The `ALL_TOOLS = 21` half of this row is EXACT and is the count authority (`R-15` set-equality + `R-15b`). No normative clause of this file is amended by this correction.** **⟶ AMENDMENT LINK (2026-09-27, `A-d3`): this is `DRIFTED` row `M-14` of the record, routed per §5.4a's claim/count/tracker-owned class — a claim correction with gate *no code change*, so it owes NO host code and NO test change and does not block the zero-code landing (§3.6).** | `docs/specs/engine-pin-greens.md` §2.9 `G-06b` (the third-run observation) and §3b `F-6`; `docs/specs/engine-pin.md` §3b `AF-9`'s count-freeze note (**the `21`-vs-`23` question is declared a greens-layer measurement there**) | [H] |
| **M-15** | The stale pair: the trackers now carry **`ALL_TOOLS` 21 → 22** and **`RpcMethod` 21 → 22**, and the pre-correction **"19 → 20"** is **stale and must not be quoted** | `docs/next-steps.md` `## OPEN` row **`F3`** (**read**: *"the live census is **21** … the pre-correction **"19 → 20"** is stale"*); `docs/pending.md` §C's doc-drift row (**read**, same correction); `docs/decisions.md` `FOCUS-UI-ONLY-MCP-TOOL` | [T]/[H] |
| **M-16** | The forward move's obligation: when `provident.focus` lands, the **set-equality** re-parameterisation + the `RpcMethod` census + the default-gate subset land **in the same commit as the tool**, or the tool turns a green suite red | `docs/specs/engine-pin.md` §3b `AF-9`, §7.10; `docs/next-steps.md` `## OPEN` row **`F3`** (the set-equality re-parameterisation **has already landed** at `tests/engine-pin-version.test.ts:85-165`, read); `H-r18` | [T] |

**`U-FOCUS-TOOL` is not this unit's change** (`docs/next-steps.md` `## OPEN` row `F3` is wave F).
**M-15/M-16 are recorded so that a red `R-15` is attributed correctly** — the pin spec's own rule:
*"a later pass seeing `R-15` red **must check whether `U-FOCUS-TOOL` landed first** before filing
anything against this unit."*

#### 3.3.4 `dirtied` id sets / ordering

| id | Measurement | Src | Layer |
| --- | --- | --- | --- |
| **M-17** | The `inc` click dispatch's `dirtied` is **non-empty** and is a `string[]` of node ids | `tests/runtime.test.ts:55-66` (**read**: `result.dirtied.length` `.toBeGreaterThan(0)` at `:62`); `tests/e2e-battery.test.mjs:182-184` (**read**: the `R7` non-empty check); `docs/FORKER.md`'s battery digest `R7` | [H] + [B] |
| **M-18** | The dispatch `dirtied` **contains the mutated counter's nodeId** (resolved via `listTargets()`' `propsId`) | `tests/runtime.test.ts:68-75` (**read**: `.toContain(counter.nodeId)`) | [H] |
| **M-19** | A duplicate `requestId` dispatch **echoes the first report**: `second.dirtied` deep-equals `first.dirtied`, and the counter does **not** advance twice | `tests/runtime.test.ts:102-113` (**read**) | [H]/[E] |
| **M-20** | `dirtied` ids **match across hosts after normalization** (`node-N` → `node#`) — the divergence leg's own normalized comparison | `docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE` (*"dirtied ids normalized-match"*, recorded); `docs/specs/engine-pin.md` §4.4's "buys" list; `scripts/electron-divergence.mjs`'s comparison set | [A] + [B] |
| **M-21** | The **normalization form** used: raw ids are compared **after** the harness's own normalization, and the row records **both** forms | §3.2 `INVALID` class 3 (this spec's own rule — a measurement that records only the normalized form is INVALID) | [A] + [B] |
| **M-22** | An **idempotence** observation on a repeated identical dispatch (whether the `dirtied` set is stable across two identical dispatches in one runtime — M-19's engine-owned `requestId` path is one instance; a **requestId-free** repeat is the open one) | not an in-repo pin; recorded as a **new measurement** owed by this unit's §3.3 framing (*"the unit owns whether the behaviour matched the 0.4.x-era expectation"* — `docs/next-steps.md` `## OPEN` row B, read) | [H] |
| **M-23** | **`dirtied` on the pane/command path**: the `Runtime.applyCommand` verdict's `dirtied` is present (the **engine ran** — a host rejection returns the bare `{status:'rejected'}`) | `tests/host-guard.test.ts:726-737` (**read**: *"the ENGINE ran (a host rejection returns the bare `{status:'rejected'}`)"*) | [H] |
| **M-24** | **`dirtied` ORDER is not pinned anywhere** — no in-repo row asserts an order, only set membership/count; the measurement records the **verbatim array** so an order change becomes visible without inventing a pin | `docs/specs/engine-pin.md` §6 stop condition 2 names the pinned `dirtied` equalities as *the amended unit plan's list* (**attributed, not re-read**); the in-repo rows above assert membership only | [H]/[B] |

#### 3.3.5 Journal behaviour (`undo`/`redo`/`replay` + the condense threshold)

| id | Measurement | Src | Layer |
| --- | --- | --- | --- |
| **M-25** | The engine report shape is `{status: 'applied'\|'no-op'\|'base-boundary'; scheduledDirtied: NodeId[]; stackTopKind?: string; redoTopKind?: string; baseBoundary: boolean}` | `node_modules/provident-ssr/dist/core/supervisor.d.ts:37-50` (**read**, the `UndoRedoReport` interface with its doc comment) | [E] |
| **M-26** | The host result adds both views + warnings on top of the report: `{status, scheduledDirtied, stackTopKind?, redoTopKind?, baseBoundary, renderedHtml, ssrHtml, warnings}`; `stackTopKind`/`redoTopKind` are **omitted when undefined** (spread-guarded) | `src/shared/types.ts:143-158` (**read**, `interface JournalResult`); `src/renderer/runtime.ts:637-646` (**read**) | [H] |
| **M-27** | `undo` after ordinary state-slice writes returns `status === 'applied'` **and** `baseBoundary === false` on the demo graph (no condense) | `tests/journal-endpoint.test.ts:291-309` (**read**: `.toBe('applied')` at `:307`, `.toBe(false)` at `:308`) | [H] |
| **M-28** | With `maxJournalLength` set (`2`) and the journal exceeding the threshold, `undo` returns one of `['applied','no-op','base-boundary']` and **never throws**; the `base-boundary` **status** is an engine concern surfaced verbatim | `tests/journal-endpoint.test.ts:311-332` (**read**) | [H]/[E] |
| **M-29** | The `base-boundary` status is **reachable only on graphs large enough that the base snapshot is smaller than the pre-base journal**; the condense size guard prevents it on small graphs | `docs/pending.md` §DEFERRED's GAP-1 row (**read**: *"The base-boundary status is reachable only on graphs large enough that the base snapshot is smaller than the pre-base journal."*) | [E] |
| **M-30** | `maxJournalLength` is threaded end-to-end: `SecuritySettings` → store → IPC → renderer → `RuntimeOptions.maxJournalLength` → `new Supervisor({events, maxJournalLength})` | `docs/pending.md` §DEFERRED GAP-1 (**read**); `src/renderer/runtime.ts:65-67` and `:85`/`:111`/`:116` (read) | [H] |
| **M-31** | **`UNDO-REDO-DESTROY-STATUS` survives the pin move**: `undo()` of a `destroy` entry reports `status:'applied'` with an **empty** `scheduledDirtied` and an unchanged graph — a silent false-success. **It is re-verified at `0.5.1`, NOT resolved by the version move** — **⟶ SUPERSEDED (2026-09-27, factual restatement only — NOT a normative clause of this contract): measured at the installed `0.5.1` the status is `no-op`, because the engine's resolve guard (`dist/core/supervisor.js:1536-1538`) returns before the `destroy` branch (`:1549-1551`) and before the `return this.report('applied', dirtied)` fall-through (`:1649`), and `destroy` deleted the node (`:1066`). The silent-`applied` false-success is therefore NOT reproducible at `0.5.1` by any route; the row is CLOSED as delivered-by-the-resolve-guard (`docs/defects.md` `## CLOSED`), its `docs/pending.md` row and `docs/HANDOFF.md` Round 9 are corrected, and the residue is an upstream dead-code cleanup only. Routed by `docs/specs/engine-drift-measurements.md` `M-31` (`DRIFTED`); see `docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`. No normative clause of this file is amended by this correction.** **⟶ AMENDMENT LINK (2026-09-27, `A-d3`): this is `DRIFTED` row `M-31` of the record, routed per §5.4a's claim/count/tracker-owned class — a tracker/handoff correction with no host change and no test edit owed, so it does not block the zero-code landing (§3.6 item 5).** | `docs/pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS` (**read**: *"re-verified at 0.5.1, NOT resolved by the version move"*, `H-r12`); `docs/defects.md` `UNDO-REDO-DESTROY-STATUS` (**as filed OPEN; since 2026-09-27 CLOSED — see that file's `## CLOSED` section**) | [E]/[H] |
| **M-32** | The journal **return-shape** rows (`scheduledDirtied` exists; `stackTopKind`/`redoTopKind` exist) are asserted as **properties**, and their **exact contents/values are explicitly DEFERRED** — asserting them couples a host test to engine internals | `docs/pending.md` §DEFERRED GAP-2 (**read**: `scheduledDirtied` contents) + GAP-3 (**read**: `stackTopKind`/`redoTopKind` values); `tests/journal-endpoint.test.ts:87-101` (**read**: `toHaveProperty('status')`, `('baseBoundary')`, `scheduledDirtied`) | [H] |
| **M-33** | `provident.journal`'s **action guard**: an action outside `undo`/`redo`/`replay` throws `unknown journal action: <value>` (a **documented throw**, not a silent no-op); the MCP layer's `z.enum(['undo','redo','replay'])` is the outer boundary | `src/renderer/runtime.ts:620-623` (**read**); `docs/pending.md` §DEFERRED GAP-11 (**read**) | [H]/[B] |
| **M-34** | The **`no-op`** status is reachable on the demo graph for a replay-then-redo sequence | `tests/journal-endpoint.test.ts` (`redoRes.status` `.toBe('no-op')`, `:150`) — **cited from the earlier grep read of that file, not from a full re-read of the test body; marked attributed** | [H] |
| **M-35** | `Supervisor.journalEntries(opts?)` (the **read** API the journal tool *would* want) is **available at 0.5.x but UNADOPTED**, and adopting it would be a **new MCP surface needing its own gate** | `docs/pending.md` `UPSTREAM-AVAILABLE-0.5` (**read**); `node_modules/provident-ssr/dist/core/supervisor.d.ts:51-59` (**read**, `JournalEntryView`) | [E] |

**The journal family's honest boundary — stated once:** the **`base-boundary` leg is not
reachable on the demo graph** (M-29), so this unit may record the status vocabulary and the
small-graph behaviour, and must record the **large-graph** leg as **`UNMEASURABLE`** with the
named revisit condition *"an envelope whose base snapshot is smaller than the pre-base journal"*
(RK-1's `base-boundary` question is the same class). **A row that claims the condense path fired
must show the threshold, the journal length, and the `baseBoundary` value — not just a
permissive `toContain` over three statuses.**

#### 3.3.6 Boolean-attribute emit + the `null` member (the pin unit's carried probe)

| id | Measurement | Src | Layer |
| --- | --- | --- | --- |
| **M-36** | A boolean member with a **`null`** value on the **DOM leg**: is the attribute absent (OFF) or present? | `docs/specs/engine-pin.md` §3.3's `null` row (**the pin unit does NOT assert it**); §3a `A-4`; §3b `AF-4`; `docs/specs/engine-pin-greens.md` §2.3 `B-10` and §4's carried-rows note (**read**: *"Run on the DOM leg and observed (`attr=null`, `<div></div>`, i.e. OFF), but §3.3's `null` row keeps the `null` member case outside this unit's pin"*) | [T]/[E] |
| **M-37** | The same `null` member on the **SSR leg** — whether the branch is entered at all (the pin unit's read: the SSR branch is entered only when `val !== undefined`) | `docs/specs/engine-pin.md` §3.3 (`:520`-anchored read of the dist, quoted by the pin spec); §3b `AF-4` | [E] |
| **M-38** | The engine's **closed boolean set's membership** — `'inert'` present, `'download'` absent, **27 members** — is currently a **`(engine recon)`** claim, NOT verified by this repo | `docs/decisions.md` `ENGINE-PIN-0.5` (**read**: *"27 members counted"*, `'inert'` at `:57`, `'download'` deliberately absent — cited from the adjacent source); `docs/pending.md` `UPSTREAM-CAPABILITY-FLOOR` (**read**); `docs/defects.md:80` (**read**, same attribution); `docs/HANDOFF.md:324` | [E] |
| **M-39** | The boolean emit contract on both adapters under `0.5.1` (ON ⇒ the authored string form; OFF ⇒ **ABSENT**, never `k="false"`; two named members `inert`/`readonly`), re-driven on the final tree | `docs/specs/engine-pin.md` §3.3 + §4.1 `R-1`..`R-5`; `docs/specs/engine-pin-greens.md` §2.3 `B-01`..`B-13` | [T]/[E] |
| **M-40** | A **mutation-carrying `layer-apply`** verdict is **NOT PINNED**; the shape-malformed half is the decidable one; and the landed row records that `layer-apply` **ignores `mutation`** for a well-formed shape (the attribute stays as authored) | `docs/specs/engine-pin.md` §2.3's kind-scope bullet + §3.5 `P7b`; `docs/specs/engine-pin-greens.md` §3 `F-3`; `tests/host-guard.test.ts:726-744` (**read**: the comment at `:737` *"no removal is claimed: layer-apply ignores `mutation`"*) | [H]/[E] |
| **M-41** | `undefined`/absent/`null` removal pass-through on the **attribute** paths, with `null` on a `VALUE_FORMS` tag being **stringified** instead of cleared | `docs/specs/engine-pin.md` §3.4 `PA-1`/`PA-2`/`PA-4`/`PA-5` (boundary sentences) + §3b `AF-7`; `docs/specs/engine-pin-greens.md` §2.4 | [T]/[E] |
| **M-42** | The divergence leg asserts **NO** boolean-attribute or removal-write row — its demo envelope authors no `inert`/`hidden` prop and the harness has **no** attribute-presence extractor | `docs/specs/engine-pin.md` §4.4's "does NOT buy" clause + §6 stop condition 8; `docs/specs/engine-pin-greens.md` §4 `SC-2` | [A] |

#### 3.3.7 The pin-unit hand-offs (`§3a` `A-*`, `§3b` `AF-*`, the greens' carried rows)

**Every `A-*` probe's disposition, as the pin spec records it** (`docs/specs/engine-pin.md` §3a,
read in full). **This unit's inheritance is the last column — and it is deliberately narrow:
several of these are closed by a pin-unit ruling, and this unit may NOT re-open them (ruling 4 +
`AGENTS.md` item 8's gate discipline).**

| Pin row | What it probed (pin spec's own words) | Disposition in the pin spec | This unit's inheritance |
| --- | --- | --- | --- |
| **`A-1`** | `removeAttribute('id')` incl. the overwrite path and `css:{id}` after a `props.id` auto-mint | **STANDS — landed test row** (`R-10`); the **deliberately CONFLICTING `css.id ≠ props.id` pair remains an OPEN PROBE — not written as a row** | **INHERITS the open half:** measure the conflicting `css.id ≠ props.id` pair (last-write-wins + which the removal clears). → **M-43** |
| **`A-2`** | Guard bypass: omitted `value` key; `load({kind:'commands'})`; `JSON.parse` (`null` only reachable); a nullish array element | **SETTLED BY RULING 1** — nothing to bypass; the shape half survives as `M2`/`M3` | **NO inheritance** (ruling 1 is not re-opened). The `load({kind:'commands'})` route is **covered**, not a distinct row |
| **`A-3`** | Array/object value on `props` | **SETTLED** — `P4` + `P-SM-2`; the engine verdict is **recorded, not pinned** | **INHERITS the measurement half:** record the engine's verdict verbatim (§3.1 column 6) without pinning it → **M-44** |
| **`A-4`** | A boolean attr with `'0'`/`''`/`0` on both legs | **STANDS** — `P-TP-2`'s 16-row table; **the `null` member case stays outside it** | **INHERITS the `null` member case** → **M-36/M-37** |
| **`A-5`** | The `css:` path with `undefined` through the engine, incl. `css:id`/`css:classes`/`css:style` (which do **not** call `removeAttribute`) vs any other `css:` key (which does) | **SETTLED BY RULING 1 + the defect fix**; the seed's `css:` spelling is corrected to **`css.<key>`** | **NO inheritance** (settled). The corrected spelling is a **validity rule** here (§3.2 `INVALID` class 6) |
| **`A-6`** | The predicate's namespace narrowness: bare name, `on:*`/`data:*`/`handlers` with nullish values | **REMOVED BY RULING 1(c)** — no capability loss to rule on; bare names allowed but **INERT** | **INHERITS the inertness measurement** (already measured by the blind layer; re-record it on the final tree) → **M-45** |
| **`A-7`** | The real-DOM serialization difference; the `H-r10` extractor as a **precondition**; a substring row as a guaranteed false red | **STANDS with one correction** — the divergence leg **is** a leg of the pin unit, but asserts structural surfaces only | **INHERITS as UNMEASURABLE** at this unit's layers; the extractor is `U-DIVERGENCE-EXT`'s → **M-46** |
| **`A-8`** | Capability-loss probe | **RESOLVED BY RULING 1** — the capability is NOT removed | **NO inheritance** |
| **`A-9`** | `syncConfig`'s shipped writes still pass; a `null` `maxJournalLength` is not silently converted into a lost last-known value | **STANDS, re-scoped** — the last-known-value question survives **only for the shape path** (`PF-5`) | **INHERITS the `maxJournalLength` half only** (it is a journal-threshold claim) → **M-30**; the `PF-*`/`PF-5` test-shape half stays test-side (`docs/pending.md` §D's owed fixture data) |
| **`A-10`** | `RK-1`'s blast radius: is `removeAttribute` reachable from any **other** host path (battery host, `SecurePanels`, `MarkdownAdapter`)? | **STANDS — partially settled.** `SecurePanels`' reachability is now contract; **the battery host and `MarkdownAdapter` paths remain an OPEN enumeration (each either covered by the completion or a measurement)** | **INHERITS the open enumeration** → **M-47** |
| **`A-11`** | Does the moved Electron-44 stack + the completion + the predicate hold on the real renderer? | **RULED IN as a leg; GREEN** (`R13 RESULT: 9 checks, 0 failures`, post-change tree) | **INHERITS a re-measurement only** (take the leg's own result line + exit code on the final tree; **do not add checks**) → **M-48** |

**Every `AF-*` finding's disposition, as the pin spec records it** (`docs/specs/engine-pin.md` §3b,
read in full). **The AF rows are, almost without exception, CLOSED at the contract layer — the
pin unit folded them in. This unit may measure the ones with a live measurement half and must NOT
re-open the rest.**

| Pin row | Finding (pin spec's own summary) | Disposition | This unit's inheritance |
| --- | --- | --- | --- |
| **`AF-1`** | `R-16`/`R-17` labelled "byte-identical to `0.2.1`" but no `0.2.1` bytes exist | **FOLDED IN — RELABELLED.** They are **forward pins on `0.5.1`**, **explicitly NOT retarget evidence**; *"that measurement belongs to `U-ENGINE-DRIFT`"* | **INHERITS the UNMEASURABLE disposition** (ruling 2) — **this is the row that hands the historical claim to this unit and simultaneously makes it unmeasurable.** → **M-49** |
| **`AF-2`** | The same drift in §4.1's column headers | **FOLDED IN** — columns relabelled historical-vs-landed | **NO inheritance** (a doc relabel, done) |
| **`AF-3`** | not restated in the pin spec; substance covered by `AF-6`/`AF-10` | **CARRIED** — see `AF-6`/`AF-10` | **NO inheritance** |
| **`AF-4`** | The `null` boolean-attribute cell is not asserted by the pin unit; the SSR branch is entered only when `val !== undefined` | **CARRIED, unchanged**; the non-boolean `null` value is now **IN-contract** (`PA-2`, `PF-3`) | **INHERITS the `null` member measurement** → **M-36/M-37** |
| **`AF-5`** | The `props.data-*`/`props.on-*` spellings were never decided; the bare-name half was **corrected** by measurement | **DECIDED AND STATED** — the four prefixed spellings; the predicate inspects no `value`; the **bare name is ALLOWED but INERT** | **INHERITS the inertness re-measurement** → **M-45**, plus the validity rule (§3.2 class 6) |
| **`AF-6`** | Whether the (pre-amendment) guard's restriction needed documenting as a capability loss | **REMOVED** — no capability loss to rule on | **NO inheritance** |
| **`AF-7`** | The absent-`value` case vs what the engine does with it | **FOLDED IN AND STATED ONCE** — absent ≡ explicit `undefined` (one contract); explicit `null` is a removal on the **attribute** paths but **stringified** on a `VALUE_FORMS` tag | **INHERITS the re-measurement of the three forms** → **M-41** |
| **`AF-8`** | the reachability/last-known-value class | **CARRIED via ruling 2** — last-known-value survives only for the shape path | **NO inheritance** (pane test-side) |
| **`AF-9`** | `ALL_TOOLS === 21` is a count freeze the later `provident.focus` unit changes; the built artifact census read **23** | **FOLDED IN** — the re-parameterisation rule is recorded **in the pin unit's contract text**; the `21`-vs-`23` question is declared a **greens-layer measurement, not a contract change** | **INHERITS the artifact census + the stale-pair correction** → **M-13/M-14/M-15/M-16** |
| **`AF-10`** | The `H-02`/`R-13` false-green: the pane predicate was **unreachable** | **FOLDED IN AS THE PANE-FIXTURE RULING** (`PF-1..PF-8`); `A-10`'s reachability enumeration stays open for the other host paths | **INHERITS only `A-10`'s open enumeration** → **M-47**; the pane fixture itself is test-side (`docs/pending.md` §D) |
| **`AF-11`** | §5.1 said four test files while §5.2 listed six; status lines described the halves as unlanded | **CORRECTED IN PLACE** — the post-amendment count is **seven test files + one fixture** | **NO inheritance** (a doc correction; **this unit must not re-count it as `0.5.1`-drift**) |

**The greens file's carried / not-blind-runnable rows** (`docs/specs/engine-pin-greens.md` §4, read
in full) — **these are NOT all this unit's; the file's own note says the divergence-leg statements
were superseded as status by the DONE pass.**

| Greens row | Why it could not be blind-run / what it recorded | This unit's inheritance |
| --- | --- | --- |
| **`P-TP-1`** | The **command-surface totality property** — the property quantifies over every input, a table can only sample, and **the repo has NO PBT harness** (the file's own verification: `devDependencies` = `@types/node`, `electron`, `esbuild`, `typescript`, `vitest`) | **INHERITS a repeat of the compensating rows only**; the property itself stays **NOT EXECUTED** and is this spec's **§5.5** zero-row-exemption reference → **M-50** |
| **`SC-2`** | The **real-DOM half** — §2.2.1's semantics note is the **shim's own contract**, *"NOT a claim about `HTMLElement`"*; the only shim-vs-real-DOM check is the Electron divergence script | **INHERITS as UNMEASURABLE** at this unit's layers → **M-46** |
| **`SC-3`** | The **test-side items** (`§2.2.1` regression row; the `PF-1` assertion reconciliation; the `M9`/`PF-1b` re-writes) — a blind writer may not read `tests/**` | **INHERITS nothing normative**: the doc-review resolution in that same cell records the items as **LANDED**, and the two **fixture-data** items (`PF-5`/`PF-7` `build()` coverage = pin spec §7.12/§7.13) remain genuinely owed **test-side only** (`docs/pending.md` §D) |
| **`DIV-1`** | The divergence leg needed a live Electron window; **RESOLVED** — the leg is green post-change, after the landed spawn fix (`U-DIVERGENCE-EXT` **inherits** the fix) | **INHERITS a re-measurement of the leg's own result line only** → **M-48** |
| **`H-01` (carried)** | Still **no documented host recipe** for the `Supervisor` → `renderProducingProcess` `css.<key>`+`undefined` route | **INHERITS as UNMEASURABLE — no documented recipe** at the blind layer; the substance is covered by `B-12`/`PA-5`/`S-18` on the **[T]/[E]** layers. → **M-51** |
| **`H-02` (carried)** | **RESTATED: RUNNABLE NOW** — the pane predicate unreachability is discharged | **NO inheritance** |
| **`H-03` (carried)** | **RESTATED: no longer a claim** — `R-16`/`R-17` are forward pins | **NO inheritance beyond `AF-1`'s UNMEASURABLE row** → **M-49** |
| **`B-10`** | **Recorded, not asserted**: the boolean member with a `null` value (run on the DOM leg; observed OFF) | **INHERITS the measurement** → **M-36/M-37** |
| **`PA-9`'s inertness** | Asserted only as *"nothing throws and `role` is still present"* — the spec pins **no verdict** for the colon spelling | **INHERITS a verbatim recording only** (no stronger claim) → **M-52** |
| The greens' closing clause | *"**No row in this run asserts `applied` for a mutation-carrying `layer-apply`** … and **no row asserts a bare-name or colon-spelling removal**"* | **INHERITS as a validity rule** (§3.2 class 6) |

**The pin spec's §7 owed/gap items, checked individually** (`docs/specs/engine-pin.md` §7, read in
full) — **the routing, so nothing is silently dropped:**

| Pin §7 item | Owed to | This unit? |
| --- | --- | --- |
| §7.1 the mount invariant + every shell-chrome item blocked | wave C+ | **NO** |
| §7.2 the unit's DONE state (+ the `LIVE-OP-REJECT` record) | supervisor | **NO** (but `LIVE-OP-REJECT`'s **layer lesson** binds this unit — Layer declaration anchor 2) |
| §7.3 no shim expansion beyond the one method | landed | **NO** |
| §7.4 the divergence leg's hermeticity drift — **the SPAWN half is discharged**; the `H-r10` extractor and the `ci-divergence-leg.md` wording remain | `U-DIVERGENCE-EXT` | **NO** (this unit may **measure** the leg; it may not change it) |
| §7.5 the lockfile bytes are not verifiable in-session | architect input | **PARTLY** — M-2 records the read, and the **unverifiable half is stated** |
| §7.6 the `0.5.1` line numbers re-read at install | done | **NO** |
| §7.7 no new `docs/defects.md`/`docs/HANDOFF.md` row is owed by the pin unit | — | **NO** — and **this unit owes a row there only on a `DRIFTED` package verdict** (§5.4a) |
| §7.8 `UNDO-REDO-DESTROY-STATUS` is **NOT** resolved by the pin unit | upstream | **YES — measurement M-31** |
| §7.9 one production surface (the pane seam) | landed | **NO** (seam is **P4**, a permitted probe surface) |
| §7.10 the `ALL_TOOLS === 21` count freeze is deliberate + time-bounded | `U-FOCUS-TOOL` | **PARTLY** — M-15/M-16 |
| §7.11 **OWED: a pane-side id-resolution route** (the `listTargets`-analogue) — **recommended, NOT admitted**; a later pass wanting it must land it as an **explicit re-admission** | a later pass | **NO as a deliverable**, but **its absence is a validity rule** (§3.2 class 6) and a **measured UNMEASURABLE** (`A-10`-family) |
| §7.12 / §7.13 fixture DATA (`PF-7`/`PF-5` `build()` coverage) — test-side only, parked in `docs/pending.md` §D | the TestWriter | **NO** — explicitly *"never a source pass"* |

### 3.4 The additional inherited measurements (the rows §3.3's tables reference)

| id | Measurement | Src | Layer |
| --- | --- | --- | --- |
| **M-43** | The deliberately **conflicting `css.id ≠ props.id`** pair: which write wins on the shim slot, and which one `removeAttribute('id')` clears | `docs/specs/engine-pin.md` §3a **`A-1`** (the open probe) + §4.2's conflicting-pair clause | [T] |
| **M-44** | The engine's own verdict for an array/object `props` value (`props.tags: ['x']` / `{a:1}`) — **recorded, NOT pinned** | `docs/specs/engine-pin.md` §3a `A-3`, §3.5 `P4` | [H]/[E] |
| **M-45** | A **bare** attribute name is **INERT** as a mutation target (a nullish write and a defined write both leave the attribute byte-identical), while the `props.<key>` control **does** remove — re-recorded on the final tree | `docs/specs/engine-pin.md` §3a `A-6`, §3b `AF-5`, §3.4 `PA-10`, §2.3's spellings bullet; `docs/specs/engine-pin-greens.md` §3a `F-1` | [H]/[E] |
| **M-46** | **Real-DOM attribute presence/absence** for a boolean member or a removal write | `docs/specs/engine-pin.md` §3a `A-7`, §4.4's "does NOT buy"; `docs/specs/engine-pin-greens.md` §4 `SC-2`; `H-r10` | **UNMEASURABLE** (no extractor; revisit = `U-DIVERGENCE-EXT`) |
| **M-47** | The **`RK-1` reachability enumeration**: is `removeAttribute` reachable from the **battery host** and the **`MarkdownAdapter`** paths, or from any other host path? | `docs/specs/engine-pin.md` §3a `A-10` (*"the battery host and `MarkdownAdapter` paths remain an OPEN enumeration (each either covered by the completion or a measurement)"*) | [T]/[B]/[E] |
| **M-48** | The divergence leg's own result line + exit code on the final tree, with both legs producing a result | `docs/specs/engine-pin.md` §5.3 leg 6, §6 stop condition 8; `docs/specs/engine-pin-greens.md` §4 `DIV-1`; `docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE` | [A] |
| **M-49** | **The historical-output claim**: that `^0.2.1` → `^0.5.1` changed the rendered output at all | `docs/specs/engine-pin.md` §4.1 ("What the two controls are NOT") — *"**That measurement belongs to `U-ENGINE-DRIFT`**"* — and §3b `AF-1` | **UNMEASURABLE** (ruling 2; revisit = an architect-supplied `0.2.1` tree/artifact) |
| **M-50** | The command-surface totality property (`P-TP-1`) and its compensating rows' repeat | `docs/specs/engine-pin.md` §5.5 `P-TP-1`; `docs/specs/engine-pin-greens.md` §4 `P-TP-1` | **NOT EXECUTED** (no PBT harness) — this spec's §5.5 |
| **M-51** | The `css.<key>`+`undefined` route driven through the **graph engine** (`Supervisor` → `renderProducingProcess`) | `docs/specs/engine-pin-greens.md` §4 `H-01` | **UNMEASURABLE — no documented host recipe**; substance covered by `B-12`/`PA-5`/`S-18` |
| **M-52** | The **`css:<key>` colon twin**'s verdict (pinned as **no verdict**) and the `PA-9` inertness form | `docs/specs/engine-pin.md` §3.4 `PA-9`; `docs/specs/engine-pin-greens.md` §4's closing clause | [H]/[E] |
| **M-53** | **`Supervisor.dispose()` / `finalizeHookCount()`** (arrived in `0.4.1`) — `dispose()` is a **real follow-on** (this repo creates several `Supervisor` instances and disposes none) but has **no in-tree consumer and no filed fork request** | `docs/pending.md` `UPSTREAM-AVAILABLE-0.5` (read) | **MEASURE the non-disposal fact only** (a count observation); **adoption is NOT this unit's** |
| **M-54** | The **`console.warn`** a render can now emit (`BODYRUNS-DROP-DIAGNOSTICS`, 0.5.1; process-level dedup) — whether any leg's render writes one, recorded with the warning channel | `docs/pending.md` `UPSTREAM-DIAGNOSTICS-BODYRUNS` (read, with the *"an absent warn line must not be read as 'nothing dropped'"* obligation); `H-r11` | [B]/[A] — **observation only; no verification claim** |

### 3.5 The verdict vocabulary (exactly three words, plus the invalid marker)

| Verdict | Means | Obliges |
| --- | --- | --- |
| **`CONSISTENT`** | The measured value **equals** the claim the row tests (after the row's stated normalization, if any). | **Nothing** — but the follow-up cell must say `none` explicitly. **A `CONSISTENT` row whose measurement differs in form from the claim is only `CONSISTENT` if the row states the equivalence.** |
| **`DRIFTED`** | The measured value **contradicts** the claim: a pinned census equality, a `dirtied` membership, a journal status/shape, a tool/RPC count, or a version agreement. | **Code/artefact work is obliged** — ***(SUPERSEDED (2026-09-27, `A-d3`): this clause read as if code were obliged unconditionally. The restated obligation is: the routing §5.4a assigns IS obliged — code/artefact work **when the routing is host-owned or package-behavioural**, and a **claim/tracker correction (or an upstream handoff item)** when the routing is claim-owned, count-owned or tracker-owned, in which case **no host code and no test change is owed** and the zero-code landing may stand (`§3.6`'s "no drift requiring CODE"). The pre-amendment wording is retained here because the obligation it states is NOT withdrawn for the classes that need code.**)* → §5.4a's routing + an architect ruling if the change is behavioural; the row's follow-up names the owner, the routing, and the gate. **A `DRIFTED` row may not be closed by editing the claim's assertion to match the measurement** — that is the silent test edit `S-d10` forbids (the claim is amended only by its owning unit, with the amendment recorded). **A `DRIFTED` row's count and its disposition are REQUIRED content of both the record and the unit's DONE row (§3.6, §5.4 item 3) — the verdict may never be carried silently.** |
| **`UNMEASURABLE`** | The claim cannot be tested at any layer this unit may use (§0.2, §3.2 `INVALID` class 5, `A-10`-family surfaces). | **A named revisit condition** (what would make it measurable: an architect-owed install/artifact, an owed harness extension, an owed public route). **An `UNMEASURABLE` row may NEVER be reported as, or counted with, `CONSISTENT`.** |
| *(`INVALID`)* | not a verdict — a row that cannot support any verdict (§3.2). | Retake, or re-file as `UNMEASURABLE`. **Kept in the table with its reason.** |

**Forbidden words in the verdict cell, stated so the record cannot hedge:**
`CONSISTENT-ish`, `probably`, `assumed`, `no evidence of drift`, `OK`, `pass`, `n/a`, `unknown`.
*"No evidence of drift"* is **not** a verdict: it is the **absence of a measurement**, and it
belongs in an `UNMEASURABLE` row's reason cell with its revisit condition.

### 3.6 The "no-drift" outcome vs what obliges code *(heading retained; AMENDED 2026-09-27, `A-d3` — the subject is now **"no drift requiring CODE"**)*

**This is ruling 4's second half, stated as an executable rule.** **AMENDED 2026-09-27 by the
`A-d3` clause-level adjudication (see the status block's AMENDMENT block): this section's subject is
"no drift **requiring CODE**", not a literal zero `DRIFTED` count.**

**A "no-drift" outcome — restated as "NO DRIFT REQUIRING CODE" — is the zero-code landing, and it
requires ALL of:**
- every §3.3 row carrying exactly one verdict of the §3.5 vocabulary (§3.2's `INVALID` rows kept in
  place with their reason and replacement id), and **at least one `CONSISTENT` row per concern family**
  (census · counts · `dirtied` · journal · boolean emit/`null`) — **a family whose count-bearing row is
  `DRIFTED` does NOT forfeit the family: what the family needs is a measured, `CONSISTENT` row in it,
  which is exactly the case the `M-14`-class count drift creates**,
- **every `DRIFTED` row's routing landed as a claim/tracker correction (or an upstream handoff item)
  with NO host-side code and NO test change owed** — the routing and its gate are named in the row's
  own follow-up cell (§3.1 column 9) and in §5.4a's vocabulary,
- the `UNMEASURABLE` rows **explicitly recorded with revisit conditions** — including the
  historical-output row (`M-49`), which **may not be claimed as covered by any later measurement**
  in this tree, and
- the red established and reported per §4 (**no failing row attributable to the pin move** — the
  pre-existing suite's own baseline behaviour; see §4.2), and
- all five legs green (§5.3), and
- ~~a `DRIFTED` **count of zero**~~ ***(SUPERSEDED 2026-09-27 — `A-d3`; the literal zero was what the
  measured two-`DRIFTED`, zero-code outcome could not satisfy. The requirement that replaces it is the
  "no host code / no test change owed" clause above, which is stricter than a bare count because it
  obliges the routing of EVERY `DRIFTED` row. Retained, not deleted, so a later pass can see what the
  clause used to demand.)***

**A "no drift requiring code" outcome is NOT satisfied — and the zero-code landing does NOT hold — if
ANY `DRIFTED` row's routing requires host code, a test change, or a package patch.** Then the code
obligation below applies in full and the unit does **NOT** land zero-code: the architect is asked
before any diff grows (§5.1's "if and only if §3.6 obliges code", §6 stop conditions 3/7). *(This is
the direction the `DRIFTED` obligation always ran in §3.5; the amendment makes it the load-bearing
test, rather than the `DRIFTED` count.)*

**The drift count and its dispositions must be STATED — a zero-code landing may never hide a drift,
and may never skip the routing.** The **count** (`b` `DRIFTED` rows) and **each `DRIFTED` row's id +
its disposition** are REQUIRED content of the **record** (§3.1's header tally + the row's own
follow-up cell) **and of the unit's DONE row** (§5.4 item 3). **A zero-code landing whose DONE row
omits the drift count, or names a `DRIFTED` row without its routing, is a review finding and the unit
is not complete** (§3.7 `F-9`; §6 stop condition 6). The amendment **does not** license a "no-drift"
claim over a drift that was measured: the two rows this unit measured are **`M-14`** and **`M-31`**,
both routed to claim/tracker corrections with **no host code and no test change owed**
(`docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`, `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`).

**Then:** the unit lands **ZERO production code and zero new tests** (ruling 3) and its DONE row
says so (§5.4). **This is the shape the measured outcome actually took** — `docs/specs/engine-drift-measurements.md`'s
tally is `N = 57` = `47 CONSISTENT` + **`2 DRIFTED`** + `7 UNMEASURABLE` + `1 INVALID`, with the red
`56 files / 795 passed / 2 skipped / 0 failed` (no failure attributable to the pin move) and all five
legs green.

**What obliges code — any ONE of these:** *(the list is NOT weakened by the amendment; item 1's
opening clause is the only clause restated, and the addition to item 5 records the routing that was
actually taken for `M-31`)*
1. **A `CONSISTENT` count that is not achievable because a pinned equality actually moved**
   (`DRIFTED`):** route per §5.4a. A **host-owned** delta (this repo's own reader/host code
   mis-reporting a moved value) → a host fix with a **regression row**, under an architect ruling
   if it changes behaviour. A **package** delta → `docs/defects.md` + `docs/HANDOFF.md`, **never**
   a patch here. ***(A `DRIFTED` row whose §5.4a routing lands as a claim/tracker correction (or an
   upstream handoff item) with no host code and no test change owed does NOT trigger this item — that
   is the amendment's "no drift requiring CODE" case, and its obligation is the routing itself.)***
2. **The suite under the moved pin has a failing row attributable to the pin move:** that is
   §5.4a's routing — **not** a test edit by this unit.
3. **A red divergence leg:** record the leg's own line (`R13 RESULT: <N> checks, <M> failures`,
   exit code) and the failing comparison by name; **never re-run until green and never rebaseline
   the harness** (`docs/specs/engine-pin.md` §6 stop condition 8). Note: the leg is **green**
   as of the pin unit's DONE pass, so a red here is a **new** finding on a tree that changed after
   it.
4. **A `DRIFTED` boolean-attribute or removal-write behaviour:** the pin unit's rows are the
   contract; a drift here touches the shim completion or the engine's emit path — **route, do not
   re-decide** (`docs/specs/engine-pin.md` §6 stop conditions 2/3/7).
5. **A `DRIFTED` `UNDO-REDO-DESTROY-STATUS` observation:** it is already an OPEN package row
   (`docs/defects.md`, `docs/pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS`, `H-r12`) — the
   measurement **annotates the existing row**; **no new row is owed and no host change** is owed
   for it (the host surfaces the engine's status faithfully by design). ***(Amended 2026-09-27,
   `A-d3` — the measured disposition of `M-31` adds: the annotation IS itself a tracker correction
   (`docs/defects.md` `## CLOSED` + `docs/pending.md` + `docs/HANDOFF.md`), it owes **no package
   patch and no test change**, and the residue is an upstream dead-code cleanup only
   (`docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`).)***
6. **A row that turns out to need a surface this unit may not add** (a new MCP tool, a new shim
   member, a new pane accessor): **STOP and report to the architect** — the pin spec's §6 stop
   condition 3 pattern. **This unit adds no surface** (§1).

**What a "no-drift" outcome does NOT license, stated because the pin unit's own history is the
cautionary case:** it does **not** license an "the upgrade is verified safe" claim
(`docs/specs/engine-pin.md` §4.4's overclaim clause), it does **not** upgrade any envelope green
into an assembled-app or IPC claim (Layer declaration anchor 2), and it does **not** retire
`H-r10`.

### 3.7 Fail-states of this unit (what makes the UNIT fail, distinct from a `DRIFTED` row)

| # | Fail-state | Detection | Handling |
| --- | --- | --- | --- |
| **F-1** | The suite's own red is **not reported** before any code | The DONE row carries no red ledger | **Review finding** (RCA-1; `docs/specs/engine-pin.md` §4.3 item 5's rule generalized) |
| **F-2** | A measurement claims a layer that cannot carry it | §3.2 `INVALID` class 5 | Row `INVALID`; if repeated, STOP and report |
| **F-3** | An existing test, harness or `src/**` file was edited to make a leg pass | Diff shows it; the leg's numbers change between runs | **Review finding** — `S-d10`'s silent test edit; revert, re-take |
| **F-4** | The record is incomplete over §3.1's 9 columns | Any blank cell; any un-reconciled tally | The record is **not** a DONE deliverable |
| **F-5** | A package defect is filed as a host fix, or a host finding is filed in `docs/defects.md` | Wrong file for the class (`docs/defects.md` is the **package**-gap catalogue — `docs/defects.md:3-9`, read; the `R13-HOST-FIX` precedent, `docs/decisions.md:39`) | **Review finding**; re-route |
| **F-6** | This unit re-opens a pin-unit landed decision | The record cites a ruling and contradicts it | **Review finding** (ruling 1's checkpoint discipline) |
| **F-7** | `node_modules/provident-ssr/**` or `../Preempt-Providence/**` was modified | Any write under those paths | **Process violation** (`AGENTS.md` goal 1 + item 7); the tree must be restored and the measurement retaken |
| **F-8** | The `N = 9` divergence pin was changed | `scripts/electron-divergence.mjs`'s diff | **Review finding** — that pin is `ci-divergence-leg.md` §5's + `U-DIVERGENCE-EXT`'s |
| **F-9** *(added 2026-09-27, the `A-d3` amendment — the "no hiding" half of §3.6)* | **A measured drift is hidden or its routing is skipped**: a `DRIFTED` row exists in the record and is **not** stated (with its id and its disposition) in the unit's DONE row; or a `DRIFTED` row is re-labelled/omitted to preserve a "zero `DRIFTED`" reading; or a `DRIFTED` row's follow-up cell names no route/owner/gate | §3.1's header tally vs the record's verdict cells; the DONE row's drift count vs the record's `b`; the row's column 9 | **Review finding**, and the unit is **not complete** (`§3.6`; §6 stop condition 6). **A zero-code landing may never be achieved by hiding a drift** — the landing it is entitled to is *"no drift requiring CODE"*, which is claimed by stating the count and routing every row, never by lowering the count. **Note: this fail-state is NOT satisfied by a landing that states `2 DRIFTED` and both dispositions — that is exactly the amended §3.6 shape.** |

## 4. The red (ruling 4) — how the existing suite under the new pin IS the red

### 4.1 The red statement

**`U-ENGINE-PIN`'s own thin-red fact (`docs/specs/engine-pin.md` §4.4, read) is this unit's
starting condition:** *"**No existing test fails because of the upgrade.** The `0.2.1` → `0.5.1`
move's own regression evidence is **`U-ENGINE-DRIFT`'s run of the existing suite + battery +
divergence legs against the moved pin** … it is **not** created by this unit, and this unit must
not claim it."* **The unit's red is therefore the EXISTING suite and the existing legs, run on the
`0.5.1` tree, with every failure recorded — not a new test file.**

### 4.2 How the red is established and reported

1. **Run the full suite and the legs on the final tree, BEFORE any code/measurement change**
   (§5.3's order). The **pre-existing suite baseline** the pin unit recorded is
   `56 files / 795 passed / 2 skipped / 0 failed` on the **final** tree
   (`docs/next-steps.md`'s `U-ENGINE-PIN` DONE-row repair note, read; the DONE-pass count was
   `55 files / 789 passed / 2 skipped / 0 failed`, superseded by the `LIVE-OP-REJECT` fix pass's
   `tests/op-command-unwrap.test.ts`).
2. **Record the red per cycle, verbatim, with the failing row NAMES** — the same discipline
   `docs/specs/engine-pin.md` §4.3 imposes (a DONE row that reports only the post-completion
   numbers without the failure classes accounted for is a **review finding**).
3. **Attribute each failure**: `attributable to the pin move` / `pre-existing` / `environment`
   (e.g. a missing `DISPLAY`) / `stale build`. **An unattributed failure may not be reported as
   green-adjacent.**
4. **The ledger's count is the unit's red evidence and must be quoted verbatim** (e.g.
   *"`npm test` N files / N passed / N failed"*), **never restated as a row inventory.**
5. **A red with zero failures attributable to the pin move IS the "no-drift" red** — i.e. the red
   is the *proof of contact* (the suite really ran **under** the new pin), not a required failure.
   **A unit that reports "the suite was already green, therefore there is nothing to reconcile"
   is a review finding** — the reconciliation is the measurement set (§3), not the failures.

### 4.3 What the red is NOT

- **Not a new test file this unit writes.** If this unit writes any test at all (it may write
  zero — ruling 3), it is only ever a **probe/record-carrying** row, and it may not assert a
  contract this spec has not stated.
- **Not a licence to edit `tests/**`.** `S-d10`'s "no silent test edits" + `docs/specs/engine-pin.md`
  §6 stop condition 4: an existing test failing because of the retarget is **this unit's business
  to route**, not to edit.
- **Not the pin unit's red set (re-run).** That set is `U-ENGINE-PIN`'s evidence and is quoted as
  **history** if cited at all.

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

**Default — the zero-code case (ruling 3):**

| # | Path | Change |
| --- | --- | --- |
| 1 | `docs/specs/engine-drift-measurements.md` | **NEW — the measurement record** (§3.0/§3.1). The only authored artifact. |
| 2 | `docs/specs/engine-drift.md` | this spec (filed by the `SpecWriter` pass; **no normative change** after the record lands) |

**If and only if §3.6 obliges code**, the diff scope grows to **exactly**:
3. the host file(s) named in the ruling (a host fix, with its regression row);
4. `docs/defects.md` + `docs/HANDOFF.md` — **only** on a package-class `DRIFTED` verdict;
5. `docs/pending.md` / `docs/decisions.md` / `docs/next-steps.md` — the tracker rows this unit's
   pass produces (the supervisor's / doc-review's pass owns the DONE row).

**Outside the scope, always:** `package.json` / `package-lock.json` (the pin is landed and this
unit does not move it), `src/shared/dom-shim.ts`, `src/renderer/runtime.ts`'s predicates,
`src/renderer/secure-panels.ts`, `scripts/electron-divergence.mjs` (**`N = 9` is pinned**),
`node_modules/**`, `../Preempt-Providence/**`, and **any existing test file**.

### 5.2 The probes (how the record's rows are taken — reproducible by a fresh agent)

Every row's column 4 must be one of these forms, exactly:

```bash
# the five legs (§5.3) — the red and the green are the same three legs + two more
npm test            # vitest, full suite
npm run typecheck   # tsc --noEmit -p tsconfig.json
npm run build       # esbuild, the bundles (also the precondition of the two legs below)
npm run battery     # tests/e2e-battery.test.mjs → "BATTERY RESULT: <N> checks, <M> failures"
npm run divergence  # scripts/electron-divergence.mjs → "R13 RESULT: <N> checks, <M> failures"
```

```ts
// the node-layer probe surface (P1) — a measurement row quotes the call, not a description
const rt = new Runtime({ mount, envelope })            // the demo envelope / the pinned §4.2 envelope
rt.bootstrap()
rt.renderedHtmlResult()                                // { renderedHtml, ssrHtml, census }  ← M-3/M-4/M-5
rt.load({ kind: 'envelope', envelope })                // → LoadResult { census, … }         ← M-7/M-8
rt.dispatch({ target: { kind: 'cssId', cssId: 'inc' }, event: 'click' })  // → { results, dirtied, … } ← M-17/M-18
rt.applyCommand({ kind: 'state-slice', node, mutation: [...] })           // → { status, dirtied?, minted? } ← M-23
rt.journal('undo')                                     // → JournalResult                    ← M-25..M-34
rt.listTargets()                                       // → { nodes }  (nodeId is the authoritative vocabulary)
```

**Probe-writing rules (each is a validity condition):**
- **Quote the raw output** (column 6). For a normalized comparison, **record the raw ids first**,
  then the normalized form (§3.2 class 3).
- **Name the envelope/fixture and its source file** — a census number without its envelope is not
  a measurement (M-4's row shows the form).
- **Read the census from a public accessor** (`renderedHtmlResult().census` / `LoadResult.census`
  / the MCP tool payload) — never from a private field.
- **For pane rows, resolve the engine `nodeId`** through a documentable route; if none exists,
  the row is `UNMEASURABLE — no public route` (§2.2 `F2`) and **must name the missing route**
  (the pin unit's §7.11 analogue).

### 5.3 The legs this unit MUST run (in this order)

| # | Leg | Command | Expected evidence | Notes |
| --- | --- | --- | --- | --- |
| 1 | node suite | `npm test` | the run's file/pass/fail/skip counts, exit code | the red (§4.2) **and** the green are this same leg, run before and after |
| 2 | typecheck | `npm run typecheck` | clean, exit 0 | `RpcMethod`'s union is a compile-time census — a new member is a `tsc` error (`tests/engine-pin-version.test.ts:169-173`'s own note, read) |
| 3 | build | `npm run build` | clean, the bundles emitted, exit 0 | **precondition** of legs 4 and 5 |
| 4 | battery | `npm run battery` | the battery's own result line — last measured **`184 checks / 0 failures`** (`docs/specs/engine-pin-greens.md` §2's legs table + §5, read; re-measured unchanged by the `LIVE-OP-REJECT` fix pass) | the leg most exposed to the shim's removal class |
| 5 | divergence | `npm run divergence` | the script's own summary line + exit 0 — last measured **`R13 RESULT: 9 checks, 0 failures`** (post-change tree; Electron 44.4.5 / node 24.21.0, per `docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE`) | **`N = 9` is a PIN**; needs a **DISPLAY**; a red is recorded verbatim, never re-run until green |

**The measured baselines above are QUOTED (attributed to the files that recorded them), not
re-measured by this pass.** They exist so the unit's own run can be compared like-for-like; a
difference is a **finding**, not a licence to rebaseline.

### 5.4 The DONE row's shape (including the zero-code case)

The unit is **not delegable** until (a) this spec exists, and (b) a **TestWriter has RUN and
REPORTED the red set** (`AGENTS.md` item 9). ***(Amended 2026-09-27, `A-d3` — the reconciliation of
that gate with a ZERO-CODE unit, stated so the literal wording does not forbid the landing this unit
actually made: the gate's purpose is that a RED has been RUN and REPORTED **before any code**, and for
this unit §4.1/§4.2 define the red as **the EXISTING suite and legs run under the moved pin** — *"the
unit's red is therefore the EXISTING suite … not a new test file"* — so the gate is satisfied by that
run's ledger (`56 files / 795 passed / 2 skipped / 0 failed`, **no failure attributable to the pin
move**; §4.2 item 5's "no-drift red") being RUN and REPORTED, with the TestWriter's role here being to
run and report that pre-existing red rather than to author tests. Nothing in this amendment excuses
an unreported red** (§3.7 `F-1` still fires on a DONE row with no red ledger), and item 2's
zero-delta line stays mandatory (ruling 3).*** The DONE row (`docs/next-steps.md`, the supervisor's
pass) must carry, in this order:

1. **Unit + wave + status**: `U-ENGINE-DRIFT` · wave **B** · `DONE` (or the honest non-DONE status).
2. **THE CODE/TEST DELTA — stated in one line, and it must be able to say ZERO:**
   *"production code: **0 files**; new tests: **0 files**"* — or the named files + their ruling.
   **A DONE row that omits this line is a review finding** (ruling 3).
3. **The measurement tally**, reconciled: `N` rows = `a CONSISTENT` + `b DRIFTED` +
   `c UNMEASURABLE` + `d INVALID`, with the record's path (§3.0). ***(Amended 2026-09-27, `A-d3` —
   required, not optional: the DONE row must also carry the `DRIFTED` COUNT (`b`) **as its own stated
   number**, each `DRIFTED` row **by id WITH ITS DISPOSITION** (the §5.4a routing + the owner + the
   gate it needs — e.g. `M-14` → claim/tracker correction, gate *no code change*; `M-31` →
   tracker/handoff correction, no host change and no test edit), and its **layer attribution**
   (which layers the measured rows were taken on, per the Layer declaration's `[T]`/`[H]`/`[E]`/`[B]`/`[A]`
   labels — the record's own column 5). A zero-code landing may not be claimed without the drift count
   and every disposition stated (§3.6; §3.7 `F-9`).)***
4. **The red, per §4.2** — the failing set as RUN and REPORTED, with its attribution, and the
   explicit statement of **which failures were attributable to the pin move** (possibly none).
5. **The five legs' results, on the final tree** (§5.3), each as the leg's own line, **with the leg's
   LAYER label stated** (node suite = `[T]` envelope/pure layer; battery = `[B]` shim host over MCP;
   divergence = `[A]` structural-surfaces-only — **the layer attribution** §5.4 item 3's amendment and
   the Layer declaration's anchors 1–2 require; **no leg's green may be stated without it**).
6. **The `UNMEASURABLE` list, by row id** — ***(amended 2026-09-27, `A-d3`: the list must be the
   record's FINAL `c` membership, not a pre-correction snapshot — the record's row ids are stable but
   a row may be SPLIT (§3.2's *"Split the row"*: the measured half keeps its id, the un-carryable hop
   becomes a new id) or may leave `c` when it becomes measurable, so the DONE row cites the row ids the
   record's single ledger names. In this unit's record that means `M-25`, `M-38`, `M-46`, `M-49`,
   `M-50`, `M-51`, **`M-57`** — the IPC hop split out of `M-30`, which is itself now
   `CONSISTENT`.)*** — **including `M-49`** (the historical-output claim) with
   its revisit condition. **Ruling 2's explicit demand: the row must SAY which claims are
   unmeasurable rather than implying they are covered.**
7. **The adversarial pass's findings**, folded into this spec's **§3a** (`AGENTS.md` item 6/RCA-3 —
   mandatory per completed unit), with each host finding fixed + regression-tested and each
   package finding routed.
8. **The blind-greens + per-unit documentation-review record** (`AGENTS.md` item 10a/10d, RCA-4/6).
   **The blind layer may read only `docs/specs/engine-drift.md` + the measurement record** — and
   for this unit that is a **natural fit**: the record IS documentation-layer output.
9. **The tracker reconciliation** performed in the same pass (`AGENTS.md` item 3/6).

### 5.4a Routing a `DRIFTED` verdict (never a patch here)

| Delta class | Route | Gate |
| --- | --- | --- |
| **Host-owned** (this repo's `src/**` mis-reports or mishandles a moved value) | a host fix + a regression row, recorded in this spec's **§3a** and in `docs/decisions.md` | `R13-HOST-FIX` precedent (`docs/decisions.md:39`, read: it **explicitly refuses** a `defects.md`/`HANDOFF.md` row for a host finding) + an architect ruling if it changes behaviour |
| **Package-owned** (a `provident-ssr` behaviour contradicting the upstream specs, or a requirement gap) | a `docs/defects.md` row (**symptom · repro · suspected root cause · proposed fix shape**) → `docs/HANDOFF.md` | `AGENTS.md` item 7; **the package is NEVER patched** |
| **Contract-owned** (the claim is the pin unit's and it moved) | **not this unit's to amend** — report to the architect; the pin unit's owning unit amends its own claim | `AGENTS.md` item 8's gate discipline |
| **Instrument/harness-owned** (the leg itself changed) | `U-DIVERGENCE-EXT` / `U-REALDOM-BOOT` | ruling 1: those waves are re-adjudicated at this unit's checkpoint |
| **Environment-owned** (no `DISPLAY`, no `/dev/shm`) | recorded as an environment limitation with the measured signature, **not** as a parity finding | the pin unit's precedent (`docs/specs/engine-pin-greens.md` §4 `DIV-1`) |
| **A genuinely package-correct but host-inconvenient** behaviour | a `docs/pending.md` row with a **revisit condition** | `AGENTS.md` item 6 |
| **Claim/count/tracker-owned** *(added 2026-09-27, `A-d3` — the routing class the two measured `DRIFTED` rows actually took)* | **a claim/tracker correction** (or an **upstream handoff item**): the owning file's claim is corrected **by its owner**, the old text kept as `SUPERSEDED`, and the correction recorded as a `docs/decisions.md` row — **this route owes NO host code and NO test change** | `AGENTS.md` item 6/7's tracker discipline; **the amendment's "no drift requiring CODE" clause** (`§3.6`): this is the route that lets the unit land zero-code. **Two instances on this unit's record: `M-14` → `docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`; `M-31` → `docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`.** |

**No `DRIFTED` verdict may be closed by:** quoting the engine's own behaviour as justification,
re-running the leg until green, narrowing the claim's assertion without its owning unit, or
re-labelling the row `CONSISTENT`. **Each of those is a review finding.** ***(A claim/tracker
correction is NOT any of those four: it keeps the row `DRIFTED`, states the count, corrects the
CLAIM in its owning file — by its owner — and records the correction as a decision row. Closing a
`DRIFTED` row means making it disappear; correcting its claim's file leaves the verdict standing and
the drift visible, which is what §3.6's "stated" requirement demands.)***

## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**

**`H-r4` obliges an explicit zero-row/typed PBT decision per unit. Stated exactly as
`docs/specs/engine-pin.md` §5.5 states it: THIS REPO HAS NO PBT HARNESS.** The `devDependencies`
key set is `@types/node`, `electron`, `esbuild`, `typescript`, `vitest` (`package.json:25-31`,
**read this pass** — five keys, no `fast-check`, no `hypothesis`, no property runner). **Every row
this unit can take is either a single measurement record or a deterministic table-driven
repeat — so this spec records a ZERO-ROW register, and here is why that is the honest answer
rather than a dodge.**

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **One candidate, and it is already owned elsewhere:** the *"for every `dirtied` id, the id resolves to a registered node"* / *"no value-shaped write is ever refused"* class. The second is `docs/specs/engine-pin.md` §5.5's **`P-TP-1`**, marked `NOT EXECUTED — no PBT harness`, with named compensating rows — and a copy here would be a **second authority** over a landed register. |
| Could this unit execute a table-driven property **as a property**? | **No — and not because of effort.** Every §3.3 row is **one measurement of one claim**; there is no quantified input space in this unit's list that is not the **pin unit's own** (`P-TP-1`'s command surface, `P-SM-1`'s atomicity, `P-SM-2`'s value space, `P-IM-2`'s idempotence). **A measurement record is not a property register, and dressing a single measurement as one would misreport its evidence class.** |
| Do the layers permit a property run here? | **No for the interesting half.** The real-DOM and IPC-layer claims (§0.2) are **UNMEASURABLE at this unit's layers**; a property over an unmountable population is not executable at any layer. |
| How are the deterministic tables here executed? | **Plain vitest, fixed input, fixed order, no randomness, no shrinking, no generated inputs** — the pin spec's §5.5 strategy discipline, applied to whatever probe rows the record carries (each names its strategy-id, e.g. `S-TAB-DRIFT-CENSUS-1`, `S-TAB-DRIFT-DIRT-1`, `S-TAB-DRIFT-JOURNAL-1`). **A strategy-id here is a repeat-drive label, not a property id.** |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.** The honest statements that
replace a register:

1. **No row of this unit may be reported as "executed" if it was sampled** — the pin spec's
   honesty anchor (§5.5), carried.
2. **One quantified claim exists in this unit's own framing and is recorded as `NOT EXECUTED —
   no PBT harness`** (`M-50`; the pin unit's `P-TP-1`), with its compensating rows named there and
   here: `PA-1..PA-10` + `P1..P7b` (§3.4/§3.5 of the pin spec) and the §3.3 `dirtied` rows
   `M-17`..`M-23` of this record. **The property is not thereby proven — a sampled table is not the
   property.**
3. **No `fast-check` and no generator is added by this unit** — adding one would be a
   `devDependencies` change, i.e. outside §5.1's diff scope, and would need its own gate.

**Register change summary: none** — this spec introduces no register row, so there is nothing to
reconcile with `docs/specs/engine-pin.md` §5.5's 8-row register (4 `P-IM` + 3 `P-SM` + 2 `P-TP`,
7 executed deterministically, `P-TP-1` `NOT EXECUTED`; **read**, that file's register
count paragraph).

## 3a. Adversarial findings (the pass RAN: 2026-09-27 — **2 blocking findings against the record, both corrected in the trackers**; the seed table below is retained)

> **⟶ STATUS SUPERSEDED (2026-09-27, by the measurement pass's own adversarial review —
> `AGENTS.md` item 6/RCA-3, `docs/specs/engine-drift-measurements.md` `M-14`/`M-31`). This is a
> STATUS note, not a contract amendment: no requirement of this file is changed.**
>
> **THIS PASS TOOK NO MEASUREMENT AND RAN NO ADVERSARIAL REVIEW for `U-ENGINE-DRIFT`.** — true of
> the **spec-filing pass** this section was written by; **superseded by the measurement pass**, which
> ran the adversarial review on 2026-09-27.
>
> **The pass's verdict on the record: `NOT DONE-ELIGIBLE AS FILED`, with exactly two blocking
> findings** — both of them rows the record itself had already marked `DRIFTED`:
>
> - **`B-1` — the claim half of `M-14` was not precise enough to hold** (no regex, no prefix filter,
>   no normalization stated, and its own enumeration left one `module.*` name unexplained), so a
>   count-of-strings claim was being carried as if it measured a declared tool set. **Fixed by
>   retiring the whole-bundle raw string census as an evidence class** — the count authority is
>   `ALL_TOOLS` set-equality (`R-15`) + `R-15b` — and by correcting the greens set's `G-06b`/`F-6`
>   claim. **Disposition: `docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`; trackers
>   `docs/pending.md` §C `ALL-TOOLS-CENSUS-CLAIM`; greens `§3a F-6` correction block; this file's
>   §3.3.3 `M-14` restatement marked `SUPERSEDED`.** **No code change was obliged** (the measurement
>   record's own route: *"gate: no code change"*).
> - **`B-2` — the `M-31` package row's cause half was stale on both the status and the mechanism.**
>   The claimed silent `applied` false-success is **not reproducible at `0.5.1` by any route**: the
>   engine's resolve guard returns first. **Fixed by correcting `docs/defects.md`'s row (moved to its
>   `## CLOSED` section, delivered-by-the-resolve-guard), `docs/pending.md`'s
>   `UPSTREAM-UNDO-REDO-DESTROY-STATUS` row, and `docs/HANDOFF.md` Round 9; the in-tree test comment
>   that repeats the stale claim is routed as a NOTE only (`tests/journal-endpoint.test.ts:116-118`
>   is a test file and was NOT edited).** **Disposition: `docs/decisions.md`
>   `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`; the only live residue is an upstream dead-code
>   cleanup** (the now-dead `destroy` branch + the unreachable `applied` fall-through), for which
>   **no new upstream round and no host change is owed.**
>
> **What the corrections do NOT do:** they weaken no assertion, edit no `src/**`/`tests/**` file,
> and convert neither `DRIFTED` row into `CONSISTENT` (§3.5's `DRIFTED` obligation is explicit that a
> drift is never closed by narrowing the claim's assertion — both corrections are the **owning**
> claim's, made by its owner with the old text retained as `SUPERSEDED`). **The seed table below
> stays live as the seed set for any later pass; it is not a findings table.**
>
> **The record's red/green legs are unaffected** (`56 files / 795 passed / 2 skipped / 0 failed`;
> no red row attributable to the pin move) — the two findings are about the record's **claims**, not
> about the suite.

**Status (as filed, retained verbatim): THIS PASS TOOK NO MEASUREMENT AND RAN NO ADVERSARIAL REVIEW for `U-ENGINE-DRIFT`.**
The section exists as the **seed table** the adversarial reviewer starts from, plus the pin unit's
own adversarial record where it hands this unit something. **Per `AGENTS.md` item 6 / RCA-3 the
adversarial pass is MANDATORY per completed unit** — a DONE row that cites none is a review
finding. When it runs, its findings land **here** (host findings fixed + regression-tested;
package findings → `docs/defects.md` + `docs/HANDOFF.md`).

| Seed | What to probe (edge cases / unauthorized access / malformed inputs, in this unit's terms) | Why it is a seed |
| --- | --- | --- |
| **D-1** | **The record's own honesty**: take a row and re-take it with the **wrong** envelope/target; does the record's column 4 actually reproduce? | §3.1's reproducibility column is only real if a second agent can re-run it |
| **D-2** | **Normalization laundering**: a `dirtied` row that records only the normalized form, hiding a real id-population change (`node-21` → `node#` erases which node) | §3.2 `INVALID` class 3 |
| **D-3** | **Layer smuggling**: a real-DOM or IPC claim built from an `[E]`/`[T]`/`[B]` green (the `LIVE-OP-REJECT` class) | Layer declaration anchor 2 |
| **D-4** | **Stale-build green**: an `[A]`/`[H]`-artifact row read before a rebuild, or with `node_modules` at a version other than the declared pin | §3.2 `INVALID` class 2; the pin spec's version-skew signature |
| **D-5** | **Census population substitution**: a `23` from the static family swapped for a `4117` clone-form number (or vice versa) — the `M-11` contradiction | `M-11` is exactly this trap |
| **D-6** | **`null` vs `undefined` on a `VALUE_FORMS` tag**: a row that generalizes "nullish ⇒ removal" across both, when the contract strings it | `docs/specs/engine-pin.md` §3.4 `PA-2`'s boundary + §3.5 `PF-3` |
| **D-7** | **A bare-name or colon-twin "removal" row** (both INERT) | §3.2 `INVALID` class 6 |
| **D-8** | **An authored `props.id` handed to the pane seam** and its refusal read as a drift | §3.2 `INVALID` class 6; `PF-1b` |
| **D-9** | **`base-boundary` claimed from a small graph** (unreachable) | `M-29`; the journal family's stated boundary |
| **D-10** | **`UNDO-REDO-DESTROY-STATUS` read as resolved** because the version moved | `M-31`; `RK-11` (`docs/specs/provident-electron-shell-chrome-handoff-review.md` §6, read) |
| **D-11** | **`ALL_TOOLS`/`RpcMethod` red attributed to this unit** when `U-FOCUS-TOOL` is the mover | `M-15`/`M-16`; the pin spec's `AF-9` rule |
| **D-12** | **A `console.warn`-absence read as "nothing dropped"** | `M-54`; `H-r11` |
| **D-13** | **A record row that edits a claim's assertion to match the measurement** (the silent test edit in a new dress) | §3.5's `DRIFTED` obligation; `S-d10` |

**The pin unit's `§3a` seeds this unit inherits as probes:** `A-1`'s conflicting-id pair
(**M-43**), `A-4`'s `null` member (**M-36/M-37**), `A-6`'s bare-name inertness (**M-45**),
`A-7`'s real-DOM precondition (**M-46**), `A-10`'s reachability enumeration (**M-47**),
`A-11`'s real-renderer leg (**M-48**). **Everything else in that file's `A-*` table is settled by
a pin-unit ruling and must not be re-litigated here** (see §3.3.7's two tables for the row-by-row
statement).

## 6. Falsification / stop conditions

Any of these **kills or reshapes** the unit; none may be worked around silently:

1. **A measurement cannot be taken on any permitted surface.** Then the row is `UNMEASURABLE` with
   its revisit condition — **and if it is a row this unit's framing *requires* (the census /
   `dirtied` / journal set), the unit STOPS and reports** rather than landing a record with a hole
   in a required family.
2. **The census / `dirtied` pin moved.** Then §5.4a's routing: a **host** fix (never a package
   patch), with the architect's ruling if it is behavioural. **The delta is recorded against the
   exact `tests/**` or harness anchor that pinned it** (the pin spec's §6 stop condition 2 names
   the anchor set: `tests/runtime-battery.test.ts`, `tests/gemma4-blind-battery.test.ts`,
   `tests/runtime-host.test.ts`, `tests/path-fork-cycle.test.ts` — **quoted from that list and
   re-anchored here only by file, never by a line this pass did not read**).
3. **A row needs a surface this unit may not add** (a shim member, an MCP tool, a pane accessor, a
   harness comparison). **STOP and return to the architect** — the pin spec's §6 stop condition 3
   pattern. This unit adds **no** surface.
4. **The divergence leg is red.** Record the leg's own line + exit code and the failing comparison
   **by name**; **never a re-run-until-green and never a rebaseline** (the pin spec's §6 stop
   condition 8, verbatim in substance). Re-check whether the tree changed after the pin unit's
   green first.
5. **`node_modules/provident-ssr` does not report the declared pin's version.** STOP: the tree's
   skew makes every `[E]` row `INVALID` (pin spec §3.7's version-skew row), and the skew itself is
   the finding.
6. **The record cannot be made to reconcile** (the tally arithmetic; a row missing one of §3.1's
   9 columns). Then the unit is **not** complete — a partial record reported as the deliverable is
   a review finding.
7. **A `DRIFTED` verdict would be closed by editing an assertion.** STOP; that is the silent test
   edit. Route it (§5.4a).
8. **The measurement record starts asserting the historical claim** (`M-49`) **or a real-DOM
   attribute claim** (`M-46`) as `CONSISTENT`. STOP: ruling 2 excludes the first and `H-r10` has
   not landed for the second. **Both are `UNMEASURABLE` by this spec's own text.**

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **Nothing in this unit is `DONE` and no leg has been run by this pass.** This pass files the
   contract. **The unit has no measurements yet**, and the record (§3.0) does not exist yet.
2. **Two contradictions between the sources are REPORTED, not reconciled:**
   1. **`docs/next-steps.md` `## OPEN` row B's wording** — *"behavioural reconciliation of
      **0.4.x/0.5.x**"* — **presupposes a `0.4.x` baseline this repo does not have.** No `0.4.x`
      dist is installed and **no `0.4.x`-era behavioural baseline is recorded anywhere in this
      tree**. **Ruling 2 excludes the `0.2.1` capture; nothing replaces it for `0.4.x`.** The
      measurable form is *"reconciliation at `0.5.1`, against the suite's own assertions and the
      `0.5.1` forward pins"* → **§0.2**, and the claim is recorded **UNMEASURABLE** (`M-49`'s
      sibling statement) **rather than papered over.** **The architect's ruling stands; the row's
      wording is what this spec flags.**
   2. **The d12 `inTree` arithmetic** — `23` (static family; the battery's contract and the
      in-repo assertions) vs `4117` (**clone form**; `FORKER.md` §4's `R1-R16` digest reproduces
      it as the fork-stress reshape, while `docs/specs/e2e-test-battery.md` states the `4117`
      runtime census **"is wrong for these variants"**). **Both numbers are in the tree and they
      are two populations.** `M-11` measures them **separately** and records both; **this spec does
      not declare either one "the" census.**
3. **The four rulings in §0 are recorded, not re-opened.** A later pass that cites this file to
   argue about the wave-B go-ahead, the `0.2.1` baseline, the zero-code outcome, or the red's
   nature is **repeating a landed ruling with this file's own counter-text in front of it.**
4. **This unit cannot make the historical claim true.** `R-16`/`R-17` cannot be converted into
   retarget evidence by any measurement taken here (ruling 2; `AF-1`). **The most this unit can do
   is measure the `0.5.1` side thoroughly and state the gap.**
5. **The `(engine recon)` attributions stay attributed.** The 27-member boolean set, the
   `bodyRuns` diagnostics channel, the `dispose()`/`journalEntries()` arrivals, and the `0.4.x`/
   `0.5.0`/`0.5.1` feature provenance are **recon** claims; this unit **measures or marks
   UNMEASURABLE**, and **no unit may claim those surfaces are exercised here** (`docs/pending.md`
   `UPSTREAM-AVAILABLE-0.5`'s own "No overclaim" clause, read).
6. **The leg baselines quoted in §5.3 are QUOTED, not re-measured** — `184 checks / 0 failures`
   (battery), `R13 RESULT: 9 checks, 0 failures` (divergence), `56 files / 795 passed / 2 skipped /
   0 failed` (suite, the post-`LIVE-OP-REJECT`-fix count), `789 passed / 2 skipped / 0 failed`
   (the DONE-pass count). **A difference between a quoted baseline and this unit's own run is a
   FINDING, not a rebaseline.**
7. **The divergence leg's 8-vs-9 enumeration is left attributed** (§2.3): this spec quotes the
   pin spec's eight-comparison list **and** the run's `9` result line, and **names no ninth
   check**. `N` is pinned by `ci-divergence-leg.md` §5 + `docs/decisions.md`
   `DIVERGENCE-LEG-GREEN-POST-CHANGE`, and the script's own summary line is authoritative.
8. **This unit discharges nothing in `docs/defects.md` and owes no `docs/HANDOFF.md` round** —
   **unless** a `DRIFTED` package verdict appears, in which case §5.4a's route applies and the row
   is written by **that** pass. **`UNDO-REDO-DESTROY-STATUS` (M-31) is an existing OPEN row and is
   annotated, not duplicated.** *(Amended 2026-09-27, `A-d3` — the measured outcome, stated so the
   clause is not read as forbidding what the pass did: the `M-31` verdict **did** appear, its row is
   **CLOSED as delivered-by-the-resolve-guard with the old text retained as `SUPERSEDED`**, and its
   `docs/pending.md` + `docs/HANDOFF.md` copies were **corrected** — a **tracker/handoff correction by
   its owner** (`docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`), **not** a discharge by
   this unit and **not** a new HANDOFF round. **Neither `DRIFTED` row owes a package patch or a test
   change**, and `docs/HANDOFF.md` carries no NEW issue for this unit.)*
9. **The page-design layer is NOT touched.** `docs/skills/designing-pages.md` **does not exist in
   this tree** (verified by glob: `**/designing-pages*` → no match), so there is **no
   test-use-case coverage matrix and no demo-page index to update**, and this unit makes no page
   design change. **Recorded so a later pass does not hunt for an owed page-design edit.**
10. **No production surface is added by this unit** — the zero-code case adds none by definition,
    and the code case (if obliged) is a **host fix**, not a new surface (`§7.9`'s
    production-surface discipline, carried: any new surface needs an **explicit re-admission**
    with its own rows and its own register entry — never smuggled in).
11. **The measurement record is a NEW artifact, not a re-count of an existing one.** Nothing in
    this unit duplicates `docs/specs/engine-pin-greens.md`: that file's rows are a **blind green
    run against a contract**; this record is a **reconciliation of claims against a moved pin**.
    They may cite each other; neither replaces the other.
12. **The `A-d3` amendment (2026-09-27) changes ONE clause-level requirement and adds ONE fail-state;
    it re-opens no ruling and renumbers nothing.** *"No-drift"* now means **"no drift requiring
    CODE"** (§3.6), the `DRIFTED` obligation is expressed as *the routing §5.4a assigns* (§3.5), the
    drift count and every disposition are required content of the record **and** the DONE row
    (§5.4 items 3/5), a claim/tracker-owned routing class is added to §5.4a, and §3.7 gains `F-9`.
    **Every pre-amendment clause is retained, marked `SUPERSEDED` where it changed.** **What it does
    NOT do, stated so a later pass cannot read it as a weakening: it does not make a drift
    disappear, does not license a "no-drift" claim over a measured drift, does not reduce the
    obligations of any `DRIFTED` row that needs host code (§3.6's "what obliges code" list is
    intact, and §5.1's *"if and only if §3.6 obliges code"* diff scope is unchanged), and does not
    convert any `UNMEASURABLE` row into a covered one.** **The DONE ruling on `U-ENGINE-DRIFT`
    remains the architect's/supervisor's to make — this file makes no DONE claim** (§7 item 1's
    discipline, carried).

## 3b. The adversarial pass's findings — disposition as THIS contract now reflects them

> **⟶ STATUS SUPERSEDED (2026-09-27): the adversarial pass HAS run** (the measurement pass's own
> review; findings in §3a's status note — **2 blocking, both corrected in the trackers**). This §3b
> table's `G-1..G-n` row below is retained as the **owed disposition table's shape**; the pass's own
> findings landed in §3a rather than duplicated here. **No requirement of this contract changes.**

**Status: `OWED`. ⟶ SUPERSEDED (2026-09-27, added by the repo-wide documentation audit):** the
adversarial pass **HAS run** — every clause of this Status line is the **spec-filing pass's**
state and is **spent**; the run's findings are in **§3a** (status note + the two BLOCKING
findings `B-1`/`B-2`, both corrected, plus `W-1`), which is why the table below stays as the
**owed disposition table's SHAPE** rather than a findings table. **No requirement of this
contract changes.** *(The retained verbatim Status text that follows — as filed, `OWED` / "no pass
has run" — is the **spec-filing pass's own** state and is what the supersession above replaces.)*
**Status as filed: `OWED`. No adversarial pass has run for `U-ENGINE-DRIFT` (this pass is the spec
filing). **The table below is therefore the OWED DISPOSITION TABLE — the shape the findings must
land in — plus the pin unit's findings where they hand this unit something.**

| # | Finding (this unit's — to be filled) | Class | Disposition in this contract |
| --- | --- | --- | --- |
| **G-1..G-n** | *(to be filled by the adversarial pass; each entry states what was probed, the observation, and the classification)* | host / package / contract / instrument / environment | *(per finding: fixed here + regression row, or routed per §5.4a)* |

**The pin unit's findings that this contract must reflect (each already disposed of by the pin
unit — listed so no later pass reads them as live):**

| Pin `AF-*` | This contract's disposition of it |
| --- | --- |
| **`AF-1`/`AF-2`** | **CARRIED as this unit's UNMEASURABLE entry** (`M-49`) — the relabel is landed and the historical measurement is excluded by ruling 2. **This contract does NOT claim `R-16`/`R-17` as evidence.** |
| **`AF-4`** | **CARRIED as measurement rows** `M-36`/`M-37` (the `null` boolean member), with the pin unit's non-assertion intact. |
| **`AF-5`** | **CARRIED as a validity rule** (§3.2 class 6: a bare name / colon twin is never a removal row) + the inertness measurement `M-45`. |
| **`AF-7`** | **CARRIED as measurement row** `M-41` (three nullish forms; the `VALUE_FORMS` boundary). |
| **`AF-9`** | **CARRIED as measurement rows** `M-13`..`M-16` + the attribution rule (a red `R-15` is checked against `U-FOCUS-TOOL` first). |
| **`AF-10`** | **CARRIED only as `A-10`'s open enumeration** `M-47`; the pane fixture itself is test-side and parked (`docs/pending.md` §D). |
| **`AF-3`/`AF-6`/`AF-8`/`AF-11`** | **NO contract text**: the pin unit's `AF-3` is deliberately unrestated, `AF-6` is removed by ruling 1(c), `AF-8` is carried via the pane ruling (test-side), and `AF-11` is a doc correction this unit must not re-count as drift. |

## 8. Supersession index (every pin-unit row this unit discharges, inherits, or must not touch)

**Reading the index:** **DISCHARGED** = the row's obligation is met by this unit's record (the row
id in the last column is where it is measured). **INHERITED-ONLY** = this unit re-measures the same
claim and adds nothing. **NOT THIS UNIT** = the row is closed elsewhere, or belongs to another
unit — **listed so a later pass does not route it here.** **UNMEASURABLE** = this unit records the
row's claim as untestable at its layers, with a revisit condition.

| Pin-unit / tracker row | Section | Status for `U-ENGINE-DRIFT` | Row(s) here |
| --- | --- | --- | --- |
| `R-14` / `R-14b` / `P-IM-4a` | §4.1, §5.5 | DISCHARGED (version/pin agreement re-read) | **M-1** |
| (the lockfile resolution) | §2.1; handoff review §4.1 | DISCHARGED (read + the unverifiable half stated) | **M-2** |
| `R-15` / `AF-9` count freeze + the `19 → 20` stale pair | §4.1, §3b | DISCHARGED (counts + the stale pair + the forward rule) | **M-12**..**M-16** — **⟶ the `M-14` count-of-strings half is SUPERSEDED (2026-09-27): measured `24` normalized / `29` raw; the whole-bundle raw census is RETIRED as an evidence class (`docs/decisions.md` `RAW-STRING-CENSUS-RETIRED`). The `ALL_TOOLS = 21` / `RpcMethod = 21` halves and the forward rule are unaffected.** **⟶ AMENDMENT LINK (`A-d3`): this supersession IS the record's `DRIFTED` `M-14`, routed as a claim correction (gate *no code change*) — no host code and no test change is owed, so it does not block the zero-code landing (§3.6).** |
| `R-16` / `R-17` (the two controls) | §4.1 + "What the two controls are NOT" | **UNMEASURABLE** (ruling 2) | **M-49** |
| `AF-1` / `AF-2` | §3b | CARRIED as the UNMEASURABLE entry + the relabel acknowledgement | **M-49** |
| `R-1`..`R-5` + §3.3's boolean table | §4.1, §3.3 | INHERITED-ONLY (re-driven on the final tree) | **M-39** |
| §3.3's `null` member row | §3.3, §3a `A-4`, §3b `AF-4` | DISCHARGED (the carried probe becomes a measurement) | **M-36**, **M-37** |
| `B-10` (greens: recorded, not asserted) | engine-pin-greens §2.3, §4 | DISCHARGED (same) | **M-36** |
| the boolean set's membership (`27`; `download` absent) | `docs/decisions.md` `ENGINE-PIN-0.5`; pending `UPSTREAM-CAPABILITY-FLOOR` | DISCHARGED-as-measured **or** UNMEASURABLE (recon-attributed) | **M-38** |
| `PA-1`..`PA-10` (`§3.4`) | §3.4, §3a `A-5`/`A-6`, §3b `AF-5`/`AF-7` | INHERITED-ONLY for the pass-through table; **DISCHARGED** for the bare-name inertness (`PA-10`) and the nullish-form boundary (`PA-2`/`PA-4`) | **M-41**, **M-45**, **M-52** |
| `PA-9`'s "no pinned verdict" | §3.4 | INHERITED-ONLY (verbatim recording) | **M-52** |
| `P1`..`P7b` (`§3.5`) | §3.5, engine-pin-greens §3 `F-3` | INHERITED-ONLY; the `layer-apply` non-pin is a **validity rule** here | **M-40** |
| `A-1`'s open probe (the conflicting `css.id ≠ props.id` pair) | §3a, §4.2 | **DISCHARGED** (the open probe becomes a measurement) | **M-43** |
| `A-3`'s recorded-not-pinned engine verdict | §3a, §3.5 `P4` | DISCHARGED (recorded verbatim, unpinned) | **M-44** |
| `A-7` + `H-r10` + greens `SC-2` | §3a, §4.4, greens §4 | **UNMEASURABLE** (revisit = `U-DIVERGENCE-EXT`) | **M-46** |
| `A-10`'s open enumeration | §3a | DISCHARGED (the battery-host + `MarkdownAdapter` paths measured or found covered) | **M-47** |
| `A-11` | §3a, §5.3 leg 6 | INHERITED-ONLY (the leg's own result line; no new checks) | **M-48** |
| greens `H-01` (no documented recipe) | greens §4 | **UNMEASURABLE — no documented recipe** | **M-51** |
| greens `P-TP-1` (command-surface totality) | greens §4, engine-pin §5.5 | NOT EXECUTED (no PBT harness) — **this spec's §5.5** exemption's anchor | **M-50** |
| greens `DIV-1` | greens §4 | INHERITED-ONLY (the leg ran; a re-measure of its result line) | **M-48** |
| greens `H-02` / `H-03` | greens §4 | NOT THIS UNIT (discharged / no longer a claim) | — |
| the census pins named in §6 stop condition 2 (`tests/runtime-battery.test.ts` `:100-101`; `tests/gemma4-blind-battery.test.ts` `:194-195`,`:215`; `tests/runtime-host.test.ts` `:188`,`:367`; `tests/path-fork-cycle.test.ts` `:28`,`:93`) | §6 | DISCHARGED — **re-anchored by file and by the lines this pass actually read** (`:100-101` and `:97-102`; `:190-196`; `:182-194` — **`:188` read, `:367` is out of range for a 320-line file and is recorded as a stale anchor**; `:93-98`); the rest are `M-8`'s battery form | **M-6**, **M-7**, **M-8**, **M-9**, **M-10**, **M-11** |
| `M-11`'s `4117` / `23` contradiction | `docs/specs/e2e-test-battery.md`; `docs/FORKER.md` §4 `R1-R16` | **REPORTED, not reconciled** (§7.2 item 2) | **M-11** |
| the `dirtied` dispatch pins (`tests/runtime.test.ts`) | `RK-2`; `docs/specs/engine-pin.md` §6 | DISCHARGED (non-emptiness, membership, echo, cross-host normalization) | **M-17**..**M-24** |
| `RK-2` (census/`dirtied` drift; measurement unit) | handoff-review §6 risk register | **DISCHARGED as this unit's charter** | all of §3.3.2/§3.3.4 |
| `RK-11` (`UNDO-REDO-DESTROY-STATUS` misread as resolved) | handoff-review §6 | DISCHARGED (measured + the misread named) | **M-31** |
| `UNDO-REDO-DESTROY-STATUS` / `UPSTREAM-UNDO-REDO-DESTROY-STATUS` (`H-r12`) | `docs/defects.md`; `docs/pending.md` | INHERITED-ONLY (annotated, not duplicated) | **M-31** — **⟶ STATUS CORRECTED (2026-09-27, tracker half of `M-31`): the row is CLOSED as delivered-by-the-resolve-guard (`docs/defects.md` `## CLOSED`) and its `docs/pending.md`/`docs/HANDOFF.md` copies are corrected; the residue is an upstream dead-code cleanup. See `docs/decisions.md` `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1`.** **⟶ AMENDMENT LINK (`A-d3`): the correction owes NO host code and NO test change — it is §5.4a's claim/count/tracker-owned route, i.e. the class §3.6's "no drift requiring CODE" clause treats as zero-code-landable.** |
| the journal report/return shape (`J1`/`J-return`) | `docs/FORKER.md` §4 `J1`; `docs/pending.md` GAP-2/GAP-3 | DISCHARGED (shape + the deferred-contents boundary) | **M-25**, **M-26**, **M-32** |
| `maxJournalLength` / base-boundary (`GAP 1`) | `docs/pending.md` §DEFERRED; `tests/journal-endpoint.test.ts` | DISCHARGED for the wiring + the small-graph behaviour; **UNMEASURABLE** for the large-graph boundary | **M-27**..**M-30** |
| the journal action guard (`GAP 11`) | `docs/pending.md` §DEFERRED | INHERITED-ONLY (recorded) | **M-33** |
| `UPSTREAM-AVAILABLE-0.5` (`dispose()` / `journalEntries()`) | `docs/pending.md` §A | MEASURE-ONLY, adoption NOT this unit's | **M-53** |
| `UPSTREAM-DIAGNOSTICS-BODYRUNS` (`H-r11`) | `docs/pending.md` §A | OBSERVATION-ONLY, no verification claim | **M-54** |
| §7.11's owed pane-side id-resolution route | engine-pin §7.11 | NOT THIS UNIT as a deliverable; **a validity rule here** (§3.2 class 6) | — |
| §7.12 / §7.13 (fixture data) | engine-pin §7.12/§7.13; `docs/pending.md` §D | NOT THIS UNIT (test-side, "never a source pass") | — |
| `LIVE-OP-REJECT` / `LIVE-OP-REJECT-CLOSED` | `docs/defects.md` (FIXED); `docs/decisions.md` | NOT THIS UNIT (fixed + live-verified) — **but its layer lesson binds** (Layer declaration anchor 2) | — |
| `DIVERGENCE-SPAWN-FIX` | `docs/decisions.md` | NOT THIS UNIT (`U-DIVERGENCE-EXT` inherits it); this unit only **re-measures the leg** | **M-48** |
| `DIVERGENCE-LEG-GREEN-POST-CHANGE` | `docs/decisions.md` | INHERITED-ONLY (quoted baseline) | **M-48** |
| `FOCUS-UI-ONLY-MCP-TOOL`'s counts | `docs/decisions.md`; `docs/next-steps.md` `F3` | NOT THIS UNIT (wave F) — measured only as the **forward obligation** | **M-15**, **M-16** |
| the pin unit's DONE record + the `U-ENGINE-PIN` decision sets | `docs/next-steps.md`; `docs/decisions.md` | NOT THIS UNIT's to edit; **inherited as landed state** | §0.1 |
| `docs/pending.md` §C's control row (`R-16`/`R-17` captured on `0.5.1`) | `docs/pending.md` §C | **DISCHARGED as routed to this unit** — and the routing's *"behavioural reconciliation"* half is **UNMEASURABLE** by ruling 2 | **M-49** |
| **`M-14`** (the record's `DRIFTED` count claim — the raw string census) | `docs/specs/engine-drift-measurements.md` `M-14`; greens `§2.9 G-06b` / `§3b F-6` | **DRIFTED — ROUTED, NOT CODE-BLOCKING** (claim/tracker-owned; gate *no code change*) — **§3.6's "no drift requiring CODE" clause applies under the `A-d3` amendment** | **M-14** (`§3.3.3`) |
| **`M-31`** (the record's `DRIFTED` package-status claim) | `docs/specs/engine-drift-measurements.md` `M-31`; `docs/pending.md` `UPSTREAM-UNDO-REDO-DESTROY-STATUS`; `H-r12` | **DRIFTED — ROUTED, NOT CODE-BLOCKING** (tracker/handoff-owned; **no host change, no test edit owed**; residue = upstream dead-code cleanup) — **§3.6 item 5 applies** | **M-31** (`§3.3.5`) |
| **the `A-d3` clause amendment itself** (this file's AMENDMENT block) | the status block; **§3.5** (`DRIFTED` obliges cell) · **§3.6** · **§3.7 `F-9`** · **§5.4 items 3/6** · **§5.4a** · §7 item 8 | **AMENDMENT, NOT A PIN-UNIT ROW** — recorded here so a later pass reading the index finds the clause-level change: *"no-drift" = **"no drift requiring CODE"**; the drift count and every disposition must be stated in the record **and** the DONE row | §3.6 (amended) |
| `docs/decisions.md` `RAW-STRING-CENSUS-RETIRED` / `UNDO-REDO-DESTROY-STATUS-CLOSED-AT-0.5.1` / `ENGINE-DRIFT-MEASUREMENT-RECORD` | `docs/decisions.md` | **THE LANDED TRACKER HALVES** — inherited as landed state; this unit does not edit them (**read this pass, cited by row id**) | **M-14**, **M-31**, the tally |
| `docs/next-steps.md` **WAVE-B MEASUREMENT CHECKPOINT** block's *"one clause-level tension remains for the architect"* gate | `docs/next-steps.md` (`## WAVE-B MEASUREMENT CHECKPOINT`; cited by section, **never by line**) | **DISCHARGED BY THIS AMENDMENT** — the gate was §3.6's literal *"`DRIFTED` count of zero"*, which the amendment supersedes with the *"no drift requiring CODE"* clause; **the DONE ruling is the architect/supervisor's to make and is not made by this file** | §3.6 (amended) |
| `docs/specs/provident-electron-shell-chrome-handoff-review.md` §8's owed-spec list entry `engine-drift.md` | §8 | **DISCHARGED by this filing** (the file now exists) | this file |

**Cross-file correction this pass found and did NOT make (it is not this unit's file to edit, and
the rule is "report, do not silently reconcile"):** the pin spec's §6 stop condition 2 quotes
`tests/runtime-host.test.ts:367`, and **that file is 320 lines** (read this pass: the read at
offset 362 returned *"offset 362 is out of range … (320 lines)"*). **The anchor is stale.** This
unit's `M-10` re-anchors the same claim at the lines it read (`:182-194`); **the stale citation
itself belongs to the pin unit's / supervisor's reconciliation pass.** **Same class, recorded:**
`docs/specs/engine-pin-greens.md`'s line-number-freeze table explicitly freezes its own `(l.<n>)`
citations and instructs readers to **"cite the section, not the number"** — this spec follows that
rule for every pin-unit citation and **cites `docs/next-steps.md` by section only, never by line**
(that file's own CURRENT WORK block forbids line citations).
