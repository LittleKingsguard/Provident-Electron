<!-- Purpose: the honesty document — which layer verifies what, what is red or owed at this head, and what a reader should not believe. -->
Status: ACTIVE · authored 2026-10-29 · source of truth: the code, cited per row

# Limits and state

**This reviewer's wall has no shell: it ran no suite, no `tsc`, no build, no Electron boot and no git
command.** Every figure below is one of three things, and its row says which: read from code (cited
`path:line` / glob) · quoted from a tracker **with the tracker named and the date of its measurement** ·
or marked **`measured this pass`**, which means the supervisor's own shell took the reading at this
head and this review records it rather than re-taking it. Where a figure was neither read, quoted nor
measured, it says so.

## §1. The layers — what each one can and cannot see

The repo declares its own layer labels; every behavioural claim in this repo is supposed to carry one.
The declaration, verbatim from `docs/specs/foundation-app-data-model.md:20-27` (which carries it from
`docs/specs/ci-ui-leg.md`):

| Label | Layer | What it is |
| --- | --- | --- |
| `[T]` | node suite / pure module | the vitest files under the shim; **never assembled-app evidence** (no window, no IPC, no transport) |
| `[H]` | host-side | this repo's `src/**` — main process, preload, renderer wiring |
| `[X]` | shim leg | the DOM shim and the shim battery host |
| `[A]` | divergence leg | `npm run divergence` — structural-surfaces-only identity evidence; never IPC-layer |
| `[U]` | real-DOM leg | `npm run ui` — a real `BrowserWindow` under a scratch profile; **not the packaged app** |
| `APP` | assembled app | a reading taken from the running assembled Electron app; **no such reading exists in this pass** |

The five instruments, and the honest boundary of each:

| Instrument | Runs where | Can see | Cannot see | Cite |
| --- | --- | --- | --- | --- |
| `npm test` (vitest) | node, under the DOM shim | pure-module and main-process behaviour, the renderer's logic via the shim | no window, no IPC transport, **no real layout or computed style** | `vitest.config.ts:5`, `src/shared/dom-shim.ts:1-3` |
| `npm run typecheck:tests` (additive) | node | that the whole `tests/**/*.ts` tree compiles at the unit leg's strictness — a leg `npm run typecheck` never reads, because that one includes `src/**` and excludes `tests` | any behaviour at all | `package.json:14-15`, `AGENTS.md` item 4 |
| blind-greens battery (`*-greens.md`) | node / agent | whether the **documentation** suffices to drive the behaviour — authored from docs alone, no implementation read | whether the documented behaviour is the assembled app's behaviour | `docs/specs/*-greens.md` (54 files, glob); `AGENTS.md` item 10a |
| live battery (`*-live-battery.md` + `.mjs` drivers) | the assembled app, often a human at the window | rendered/observable behaviour of the assembled app, including operator-visible values | nothing about the packaged product; some rows need a human and cannot be substituted by tool output | `docs/specs/*-live-battery.md` (6 records, glob); `docs/pending.md:75` |
| Electron legs (`npm run ui`, `npm run divergence`) | real `BrowserWindow`, scratch profile | `ui`: one real measurement (a layout rect + a resolved computed style). `divergence`: shim-vs-real identity on the pinned `N = 9` surfaces | `ui` is observational, not an identity check; `divergence` is structural only, never IPC-layer | `scripts/electron-ui.mjs:1-50`; `docs/specs/ci-divergence-leg.md §5`; `docs/specs/foundation-app-data-model.md:25` |

## §2. The one rule a reader must carry: node-suite green is ENVELOPE-green, never APP-green

- `[T]` is *"never assembled-app evidence"* (`docs/specs/foundation-app-data-model.md:22`). A green node
  suite therefore proves the contract holds **under the shim**, and says nothing about the app a human
  boots.
- The rule has a name in this repo's record (`RCA-12`) and is stated in the artefacts as well:
  a node-green in the demo file is *"ENVELOPE-green and is NEVER APP-green, and no `[T]` row — and
  nothing in this file — claims that either page was SEEN"* (`src/shared/demo-envelope.ts:131-133`);
  a store wave is `"ENVELOPE-GREEN IN THE SEAT ROOT, never APP-green"` (`docs/specs/store-core-graph-compliance-review.md:280`),
  and the store's own contract repeats it (`docs/specs/store-core-graph.md:82`).
- Consequence, stated as a rule for anyone reading a status word: **an `ENVELOPE-green` row forbids no
  live claim and grants none.** A rendered claim needs `[U]`; an app claim needs `APP`; and **no `APP`
  reading exists in any file this pass read** — the layer declaration's own words are *"No such reading
  exists in this pass"* (`docs/specs/foundation-app-data-model.md:27`), which is the strongest form the
  record supports and is why the ceiling claimed here is `[U]`, never `APP`.
- The corollary that bites: **the shim cannot see layout at all** — it says so in its own header
  (`src/shared/dom-shim.ts:1-3`) — so any claim about geometry, size, overflow, cursor feel or paint
  order is `[U]`-only by construction.

## §3. Known red at this head — named, counted, and what is still unmeasured

**Three *test* rows are red at this head, and they are the only test rows red** — `3 failed / 3,109
passed / 2 skipped` of **`3,114`** collected cases over **`91`** test files (`measured this pass`, the
supervisor's shell; include `tests/**/*.test.ts`, `vitest.config.ts:5`). The three are long-standing rows
in the live-battery / re-grain class, **none new to this head**: `tests/store-core-graph.test.ts` `§5.1`
(its row at `:1027`), `tests/store-tabs-record.test.ts` `§4.2` item 7 (`:1415`) and `§4.2` item 8
(`:1776`). The other three legs read green on the same run — `npm run typecheck` `0` errors, `npm run
build` OK, `npm run typecheck:tests` `0` errors (`measured this pass`). **The trackers' own last words,
and the counts this section owns:**

| Thing | Count at this head | Where it says so |
| --- | --- | --- |
| Live defect rows in the implementation-test catalogue | **42** | `docs/next-steps.md:253` (the newest block, 2026-10-29) |
| …of which **behaviour demands** | **0** | `docs/defects.md:29-35` (the one-place log) and `docs/next-steps.md:253`: *"ZERO behaviour demands"* |
| …of which **documentary demands** | **2** — `DOC-1` (`DEF-AV`) and `DOC-2` (`DEF-AC`'s residue) | `docs/defects.md:29,31,33` — the block headed *"THE REMAINING DOCUMENTATION ISSUES, LOGGED IN ONE PLACE … **TWO, AND ONLY TWO**"* |
| Documentation issues in `docs/defects.md`'s OPEN section | **2**, beside **three** items the same block records as **NOT** issues | `docs/defects.md:29,31,33,35` |
| Which count governs | **the catalogue's — 2 documentary / 0 behaviour.** `docs/HANDOFF.md:34-36` makes `docs/defects.md` govern on any disagreement; the per-entry tallies at `docs/next-steps.md:248` (`DEF-AC`'s residue as *"ONE OBSERVATION, NO DEMAND"*) and `:253` (*"ONE documentary demand"*) are that pass's own dated readings, written before the one-place log consolidated them, and are kept visible as such | `docs/defects.md:29-35`; `docs/HANDOFF.md:34-36`; `docs/next-steps.md:248,253` |
| Units | **33 DONE / 3 open = 36** | `docs/next-steps.md:22` — the block labelled *"THIS IS THE LIVE ENUMERATION"*, which prints the identity clause `2 + 2 + 4 + 10 + 3 + 3 + 4 + 1 + 1 + 3 + 3 = 36` with its terms; restated at `:218` |
| Historically red, now closed — but **one row red again at this head** | the legacy store suite's **11** red rows, trajectory `11 → 12 → 11 → 0`, recorded at `71 passed (71)`, exit 0, with the integration set `40/40` beside it (**the 2026-10-03 re-grain reading**); at this head that same file carries **1** failing row, `§5.1` | `docs/specs/store-core-graph-greens.md:3,15`; `tests/store-core-graph.test.ts:1027`; `measured this pass` |
| Blind-set rows recorded **FAIL** and never corrected | **1** — `SCG-G-28`: `docs/specs/store-core-graph-summary.md §3.1` still presents a **withdrawn** merged read arm as live, with no beside-annotation. It is a `[DOC]`-layer drift, and the greens set says *"Nothing in this set corrects it"* | `docs/specs/store-core-graph-greens.md:17-23` |
| Blind rows that were not runnable | **6** `NOT-BLIND-RUNNABLE` rows — **all six now CLOSED**, each by a named live drive or an out-of-band source read; what survives is `NBR-01`'s **sub-finding** (the `R4` row asserts the narrower half of its clause). Not an open obligation | `docs/specs/ci-ui-leg-live-status.md:6` (the 6); `:251-256,648-655` (the closures, and `NBR-01`'s surviving sub-finding) |
| Live-battery rows that need a human | **2** (`U-3`, `U-6` of the gutter battery) — *"NO HUMAN OPERATOR WAS PRESENT in either session, so the operator halves are NOT TAKEN"* | `docs/pending.md:75` |

**The suite figure, and the prose that is stale about it.** The live reading is **`91` test files,
`3,114` collected, `3,109` passed / `3` failed / `2` skipped** (`measured this pass`, the supervisor's
shell at this head). **`README.md:78-83` still carries `59` files / `916` passed / `2` skipped / `0`
failed, dated 2026-09-27** (the `U-MOUNTGUARD` documentation review), and `README.md:72-73` the earlier
`58` / `872` of the same day, which `docs/defects.md:18` still quotes. Those are **dated readings of a
smaller tree and are superseded** by the figure above: this brief quotes the measured one, and it edits
neither file. The `3` red rows are named in the table above; **the `2` skipped rows are not named in any
file this pass read**, so the set stays `UNVERIFIED — reason: the runner names its skipped cases, and no
tracker or spec quotes them.`

**The legs not run in this pass, and their dated figures — `UNVERIFIED — reason: not run in this pass;
the figures below are the 2026-09-27 readings, quoted with their source.`** `divergence` `R13 RESULT: 9
checks, 0 failures` (`N = 9`), `battery` `184 checks / 0 failures`, `ui` exit `0` with `11/11` assertions
green and one measurement `427x22` (`README.md:76-78`). **A reader must not take these as this head's
readings**: only the suite, `typecheck`, `build` and `typecheck:tests` were taken here, and `ui` needs a
`DISPLAY` besides.

## §4. What is owed

### 4.1 Live-battery obligations

| What | Why it is still owed | Cite |
| --- | --- | --- |
| Two operator rows in the gutter live battery (`U-3`, `U-6`) | the discharge is an operator record: boot, run the sequence, print the observed value. No tool output may be substituted | `docs/pending.md:75` |
| Six blind rows of the `ui` leg's set — **DISCHARGED, nothing owed** | all six (`NBR-01`…`NBR-06`) are recorded **CLOSED**, each by a named live drive or an out-of-band source read; what survives is `NBR-01`'s **sub-finding** — the executed `R4` row asserts the narrower half of its clause, which is a documentation over-read and not a live obligation | `docs/specs/ci-ui-leg-live-status.md:6` (the 6 `NOT-BLIND-RUNNABLE`); `:251-256,648-655` (the six closures and the surviving sub-finding) |
| The `U-DIVERGENCE-EXT` gate set — adversarial pass, blind-greens file, gate-11 register, documentation review | four items recorded `OWED`; `docs/specs/ci-divergence-ext-greens.md` does **not** exist (glob) | `docs/pending.md:68` |
| A `§5.U` delta matrix + `§6.1` coverage report + `§6.2` audit for `U-STORE-TABS-STRIP`, once it exists | both limbs of the trigger predicate fire for that unit | `docs/pending.md:78`; `docs/specs/user-flow-audit.md §1` |

### 4.2 Pending items a pass with its own gate can close

| # | Item | Cite |
| --- | --- | --- |
| 2.3 | Repair `docs/specs/mcp-endpoint.md §3.8` (still `OWED — NOT WRITTEN`, still *"the tool DOES NOT EXIST YET"*) and its `§6.2` group table (four groups listed, five in code at `src/main/security.ts:151`); the tool count moves 21 → **22** and the default-gate subset 7 → **8** | `docs/pending.md:70`; `docs/specs/mcp-endpoint.md:214` |
| 2.9 | Six `docs/FORKER.md` seam/glossary blocks, all `OWED` — a fork inherits the code but not a written fork contract | `docs/pending.md:76` |
| 2.10 | `O-1` container call discipline + two lifecycle residues; `O-2` the missing `slothost` negative pin; **`O-3` the repo-wide stale `ALL_TOOLS`/`21` drift, measured at `170` hit sites across `20+` docs files** | `docs/pending.md:77` |
| 2.11 | `docs/specs/mcp-server-gate.md §3`'s counts; a stale 15-name tool list in `tests/blind-security-gate.test.ts:31-47` (doc hygiene — it is never count-asserted) | `docs/pending.md:79` |

### 4.3 The one adopted-but-unanswered item

**`U-STORE-CONSTRAINT-REGISTRY`** — a contract directory is filed (`docs/specs/store-constraint-registry/`,
8 part files) and the unit is admitted, **but it is HELD at the spec gate with one open question `C-5`**,
so no red set may be authored for it. Its owed clause is already written down: every constraint/listener
body this project registers must decide its act from the state it was handed and must not make an
unconditional edit to a sub-property of its own address. **No such body exists in `src/` today**, so the
clause is prospective. Cite: `docs/next-steps.md:218-226` (the phrase *"HELD with `C-5` open"* recurs at
`:218`, `:222`, `:224`, `:226`).

### 4.4 The handoff round, and the ask

`docs/HANDOFF.md` at this head is **Round 15**, regenerated against published `provident-storeroom@1.5.0`
(`docs/HANDOFF.md:1-8`), and it carries *"Six rows carry a demand (§2) and two are observations with no
demand (§3)"* (`docs/HANDOFF.md:30-32`). **Every one of those six demands has since closed.**

| Fact | Cite |
| --- | --- |
| The catalogue now reviews `1.6.1`: `DEF-AR`, `DEF-AH`, `DEF-AU`, `DEF-AT`, `DEF-AC` all closed; **zero behaviour demands remain** | `docs/next-steps.md:245,248` |
| The repo records it explicitly: *"Round 15 states six demands that no longer hold, and a handoff repeating a stale demand is the staleness the rules forbid"* — **Round 16 is OWED and is a closure record, not a demand set** | `docs/next-steps.md:245,248` |
| The package pin is consistent with the catalogue: `provident-storeroom ^1.6.1` | `package.json:26` |
| On any disagreement the catalogue governs | `docs/HANDOFF.md:34-36` |

**THE ASK, in one paragraph.** The handoff is not a list of demands any more: it is a closure record plus
the two documentary rows that remain (`DEF-AV`'s present-tense raise receipt; `DEF-AC`'s one surviving
version cell, `docs/defects.md:31,33`). What the upstream maintainer is asked for is therefore **not a
fix but two sentence-level corrections in the shipped guide/notes**, and what this repo owes in exchange
is **Round 16 of the handoff, regenerated against `1.6.1`**, so that no downstream reader sees a demand
list that has already been satisfied.

## §5. The package relationship

| Fact | Cite |
| --- | --- |
| Two consumed packages, pinned: `provident-ssr ^0.5.1`, `provident-storeroom ^1.6.1` | `package.json:25-26` |
| `provident-ssr` is **never modified**; its source lives in the adjacent `../Preempt-Providence/` | `AGENTS.md:8-15`; `docs/defects.md:7-9` |
| Every `provident-ssr`/`provident-storeroom` finding is a **catalogue row** (symptom → reproduction → suspected root cause → proposed fix shape, upstream-owned) and a **handoff** line | `docs/defects.md:11-13`; `AGENTS.md:191-198` |
| A **host-side** finding (this repo's `src/`) is fixed here with a regression test, never handed off | `AGENTS.md:196-198` |
| The app's single `provident-storeroom` import is the 75-line seam in `src/main/storeroom.ts`; it exposes nothing over MCP | `src/main/storeroom.ts:9-21,45-50` |
| The catalogue's own discipline about instrument error: **three demands withdrawn on this consumer's own probes** (`DEF-AO`, `DEF-X`, `DEF-AV` — the last survives only as documentation) — the pinned lesson is *trace the frame numbers, never read a receipt as a verdict* | `docs/next-steps.md:253` |

## §6. What would make a reader distrust this brief

Each item below is a place where the honest reading is weaker than the status word suggests. They are
listed so a reviewer can falsify the brief rather than inherit it.

1. **The suite is measured, and it is not green.** At this head `3` of `3,114` collected rows are red
   over `91` test files, and the three are named (§3). **`README.md`'s `59` / `916` / `0` is the
   2026-09-27 reading of a smaller tree**, so any use of *"the suite is green"* as a fact about *this*
   tree is unsupported — and any use of *"the suite is red"* as a fact about the app is a layer error (see
   item 7).
2. **The MCP tool count is 22 in the code and 21 or 18 in the prose.** `docs/specs/mcp-endpoint.md §3.8`
   says the focus tool does not exist; `docs/specs/mcp-server-gate.md:56-57,70` says 21 names and 7
   default-gate tools; the code says 22 names (`src/main/mcp-server.ts:576-599`) and 8 default-gate tools
   (`src/main/mcp-server.ts:604`). The measured drift is **170 doc sites**
   (`docs/pending.md:77`). A reader who quotes a spec number instead of the code is quoting a stale one.
3. **The demand count is two documentary and zero behaviour, and the catalogue's one-place log is what
   fixes it** — `DOC-1` (`DEF-AV`) and `DOC-2` (`DEF-AC`'s residue), with three recorded non-issues
   beside them (`docs/defects.md:29-35`). The older per-entry tallies (`docs/next-steps.md:248`, `:253`)
   read one demand and one observation because they were written per entry, before the consolidation;
   `docs/HANDOFF.md:34-36` makes the catalogue govern, so no reader has to choose between them.
4. **`docs/HANDOFF.md` is stale by one package line and by six demands.** It digests `1.5.0`
   (`docs/HANDOFF.md:1-8`) while the catalogue reviews `1.6.1` (`package.json:26`), and it says six rows
   carry a demand — all six have since closed. Round 16 is owed (§4.4). A reader taking the handoff as the
   delivery list is reading a satisfied list.
5. **Most of `src/shared/` is not wired into the app.** Eight shared modules — zones, census,
   layout-projection, container, relocate, menu-template, owned-list-host, slot-host — are landed,
   spec'd and unit-tested, and the app renderer imports **none** of them; the two caller-side store
   turns (`theme-store.ts`, `overlay-store.ts`) are likewise unimported. The renderer's whole import
   list is ten modules (`src/renderer/renderer.ts:4-13`), and within `src/` the only edge among the
   eight is `census.ts:15` importing `zones` (grep). "It is in the repo, spec'd and green" is not "the
   app uses it".
6. **The demo is a demo.** It is one authored envelope with a counter, an echo field, a gutter card, two
   theme buttons and two tab terminals (`src/shared/demo-envelope.ts:1-141`). Nothing here claims a
   product's feature set; a fork replaces it wholesale (see `use-cases.md`, UC-7).
7. **No `APP` reading exists in any file this pass read.** The strongest available claim about the
   running app is `[U]` (a real `BrowserWindow` under a scratch profile) — and even that is dated
   2026-09-27 and was not re-taken here (§3); the `ui` leg is explicitly *observational, not identity*
   (`scripts/electron-ui.mjs:4-9`), and the layer declaration's own words are *"No such reading exists in
   this pass"* (`docs/specs/foundation-app-data-model.md:27`). **No node-suite row, green or red, may be
   promoted into an app claim on the strength of this brief.**
8. **`get_rendered_html` is not always the fragment.** Past 1,000,000 characters the answer is a census
   plus a 64-bit digest and a 512-character preview (`src/main/mcp-server.ts:1457-1484`). A reader who
   diffs "the HTML" may be diffing a hash.
9. **A UI element outside the provident graph is invisible to the whole surface** — not merely
   unstyled. That is a review finding in this repo, not a preference (`AGENTS.md:22-34`).
10. **Some numbers in this brief are counts of files, not of behaviour.** 181 spec files (163 flat + 18
    part files), **54** greens sets, 6 live-battery records, 91 test files, 39 source files — each a glob
    at this head. Volume is not coverage, and this brief never uses a file count as evidence that
    something works.
