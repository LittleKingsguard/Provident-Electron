# Spec — `U-STORE-FOCUS` (`H1`): the FOCUS STATE'S RE-HOME ONTO THE STORE — the `mem.focus.*` mirror, the store-backed `persist(seam, state)` SEAM TARGET, and the rule-2 STORE SUBSCRIPTION

**Unit `H1` · `U-STORE-FOCUS` — the LAST wave-`H` unit (`docs/next-steps.md` row `H1`, the §Q two-rule flip's `provident.focus`
PENDING-REBUILD cell; wave `H`'s remaining open row — `H2a`/`H2b`/`H3`/`H4` are `DONE`; the ledger `24 DONE / 6 open` UNITS = `30`
**⟶ 2026-10-03 (THE H1 GATE-7+8 DOC-REVIEW — `RCA-8(d)` ANNOTATE-BESIDE; the as-filed `24 DONE / 6 open` above is KEPT VISIBLE and this is the OPERATIVE reading): the LIVE ledger is `26 DONE / 4 open` UNITS = `30`** — `H2a` (`U-STORE-MODULES-BYTES`, the TWENTY-FIFTH `DONE` row) and `H2b` (`U-STORE-MODULES-SEAMS`, the TWENTY-SIXTH) both moved to `DONE` 2026-10-03; the open set stays `G1` · `G2` · `G3` · `H1` = `4` (`26 + 4 = 30` ✓, the wave-`H` count block's own "`26` labelled `MOVED TO DONE` + `4` open" live arithmetic); the as-filed figure is the block's pre-landing reading.
per the wave-`H` count block, the open set `G1` · `G2` · `G3` · `H1` — this unit's DONE move is gate 10's, the supervisor's) —
**the focus state's carrier moves off the renderer's module-level `const holder` (`src/renderer/renderer.ts`, the symbol read this
pass as `renderer.ts:holder`; the §Q cell's own dated reading cites `renderer.ts:314`) into the store's PROPOSED references
`mem.focus.entries` / `mem.focus.activeId` — the module's existing caller-called `persist(seam, state)` seam's TARGET becoming
store-backed (the seam's implementation changes; the module's own bytes do NOT move) — with consumers observing focus via a STORE
SUBSCRIPTION (rule 2), and the reply shape of `provident.focus` declared BEHAVIOUR-PRESERVING.** · derives the compliance cell
(`docs/pending.md` §Q's two-rule re-read, 2026-10-03, the `provident.focus` PENDING REBUILD flip: rule-1 ✗ the module-level
carrier, rule-2 ✗ no store listener) · the queue row (`docs/next-steps.md` row `H1`: the plan's PROPOSED names, the seam-target
obligation, the tier-1 authority, the store-subscription observation, the register's three store-backed rows; spec path
`docs/specs/store-focus.md` **verified free** 2026-10-03 and re-verified free this pass) · the plan
(`docs/specs/data-ownership-model-plan.md` `§5.2.7` row 13 + its round-3 named-obligation table — **the live reason is the
architect's SCOPE RULING (`R3-4`), the seam-target rule + the three register rows, NO module byte changes**; `§1.1` Store 2 — the
`mem` tier's scope/lifetime/failure modes and the tier-2 collection-cap clause; `§1.7` — the TABS/FOCUS slice, items 1/2/4/5/9 and
its reference table's `mem.focus.*` row — **the AUTHORITY has moved to `file.tabs.*`**; `§3.4` row 2.4-1 — the holder's MOVE INTO
STORE 2 + the `focus-tool.md` §2.1 item 6 carrier amendment; `§5.6.1` row 13 — `EDGE-READ+WRITE via its existing persist seam`,
**NO byte change required by the plan**; `§7.1` `RH-4` (+ its amended block — `Q-9` SUPERSEDED, the cap answer WITHDRAWN, the
entry set bounded BY CONSTRUCTION by the tab list) · the landed focus units (`docs/specs/focus-model.md` — the module's
`persist(seam, state)` seam, its `§2.4` seam 3 and `§0A` note 3's imprecision record, the `FocusState` shape; `docs/specs/focus-tool.md`
— the tool's §2.1 items 5/6/7, §2.3 items 3/5, §2.5 items 2/5, the layer-map site 6; the bytes `src/shared/focus-model.ts` and
`src/renderer/renderer.ts`'s focus region — read this pass, `[READ]`) · the FROZEN store contract (`docs/specs/store-core-graph.md`
`§2.1` — the `GraphStore` interface: `resolve`/`set`/`commit`/`subscribe`/`tiers`, the `GraphSubscription` shape; `§2.4` — the
register (top-level names only, the cold-item rule); `§2.5` — the read's HIT/MISS answers; `§2.7` — the constraint/repair
function-carrier machinery, `CONSTRAINTS-ARE-PASSED-FUNCTIONS`; `§2.8` — the write surface (`commit` MINTS and re-mints; `set`
NEVER mints; tier-free writes refused `'malformed-name'`); `§2.10` — the event surface, per-realm-per-reference delivery, the
subscriber-release rule and `unsubscribe()`'s `true`-then-`false`; `§2.11` — the realm rule) · the landed precedents
(`docs/specs/store-modules-bytes.md` — `§2.2` the `dispose()` UNSUBSCRIBE-ON-DISPOSE RELEASE OBLIGATION with its post-conditions
`P1`…`P7` and the leak's three-arm detection — **the H2a pattern THIS unit's wiring subscription carries**; `§2.4` the
exact-reference subscription discipline; `docs/specs/pane-drag-compliance.md` — `§2.3` the WIRING's STORE-SUBSCRIBER registration
(rule 2's shape, the tier-qualified prefix form and the `origin.startsWith(subscriber.name + '.')` fan-out constraint), `§5.1`
row 1 the bounded wiring role, `§7a.1` item 4's boot mint-declare; `docs/specs/store-modules-seams.md` — the caller/seam-side
filing form this unit is the six's `focus-model` member's home for (`H2b`'s header names `focus-model.ts`'s obligation `H1`'s)) ·
filed 2026-10-05 (machine clock).**

**THE UNIT'S THREE AUTHORITY CLUSTERS, STATED ONCE. (1) THE QUEUE ROW + THE COMPLIANCE CELL** — `docs/next-steps.md` row `H1`
and `docs/pending.md` §Q's two-rule re-read: the focus state must move off the module-level `const holder` into the store under
the plan's own PROPOSED names `mem.focus.entries` / `mem.focus.activeId` (§5.2.7 row 13); the module's existing
`persist(seam, state)` seam's TARGET becomes store-backed (**the seam's implementation changes, the module's own bytes do not**);
the state's AUTHORITY is tier 1's tab list (§1.7; `Q-9` superseded); consumers observe focus via a STORE SUBSCRIPTION/snapshot
(rule 2) — the `provident.focus` tool's route reads the store-carried value, never a module variable; the register carries the
three store-backed rows (§5.2.7 item (4)); the entry condition's two open questions — **the authority (tier 1, per `Q-9`) and the
reply shape (DECLARED behaviour-preserving, §2.5)** — are answered by this filing, each with its reason. **(2) THE PLAN'S NAMED
OBLIGATION** — `data-ownership-model-plan.md` `§5.2.7` row 13 (+ round-3 recast): `focus-model.ts` reads/writes `mem.focus.entries` /
`mem.focus.activeId` **through its already-exported caller-called `persist(seam, state)`**; the seam is a calling param, so the
module's own bytes do not move; the unit owns **the SEAM's TARGET rule** (what the caller's `persist` implementation must do) and
**the three register rows** — plus `§5.6.1` row 13's "re-run its rows (the persist seam's target changes semantics: caller-called →
store-backed)" and `RH-4`'s growth note (`§7.1`: `Q-9` SUPERSEDED — answered by the slice's tab list + removal path, NOT by a cap
on the holder). **(3) THE FROZEN STORE SURFACE** — `store-core-graph.md` `§2.1` (`GraphStore` block: `resolve(name)` →
`GraphResolveResult`; `commit(name, value, opts?)` → `GraphWriteReceipt`; `subscribe(name, listener, opts?)` →
`GraphSubscription` with `unsubscribe(): boolean`; `tiers`), `§2.5` (the read; HIT/MISS shapes), `§2.8` (the write surface),
`§2.10` items 1–6 (the event surface + the release rules), `§2.11` item 1 (the realm rule — **THE STORE IS FROZEN: this unit
changes NO byte of it and adds NO member**).**

**CITE SECTIONS AND ROW IDS, NEVER LINE NUMBERS, OF ANY FILE; BYTES BY `file:symbol`.** **THIS SPEC CARRIES NO LENGTH CENSUS OF
ANY FILE** (a line-count census drifts on every pass — the sibling convention). **`docs/decisions.md` rows are cited BY ROW NAME;
`docs/next-steps.md` BY ROW ID; `docs/pending.md` BY §/clause.** **ONE FILE, ONE CONCERN: this unit's concern is the focus
state's re-home onto the store — the `mem.focus.*` mirror, the seam's store-backed target, and the rule-2 subscription — and
NOTHING ELSE** (the tabs-slice RECORD landing, the strip, the two authored pages, the store's own contract and the fork's UI
bytes are named non-concerns with their owners, `§1`). **A LATER PASS THAT RE-OPENS A LANDED `DONE` UNIT FOR THIS FILE'S SAKE
REVERSES THE `F2`/`F3` CLOSE-OUT AND MUST OPEN A GATE** — the F2/F3 units are this unit's SUPERSEDED-CARRIER provenance
(`§0A.3` edge `S-6`/`S-7`), never its re-litigation target.

**LAYER LABELS (`RCA-12`), binding on every behavioural claim below:** **[T]** node suite / pure module layer · **[H]** this
repo's `src/**` (here: the WIRING's focus region in `src/renderer/renderer.ts`) · **[U]** the real-DOM `ui` leg · **[D]** the
divergence leg · **APP** the assembled app.

**STATUS: GATE 2 — THE SPEC GATE, FILED 2026-10-05 AWAITING THE ARCHITECT'S APPROVAL. NOTHING ELSE IS ADVANCED.** This filing
lands **one NEW file** (`docs/specs/store-focus.md`) **and nothing else** (`RCA-8`): **no tracker row, no decision row, no
sibling spec, no gate record, no `src/**` byte, no `tests/**` byte is touched** (the amend-beside targets of `§5.1` are the
LANDING pass's act, never this filing's). **No red set has been authored or run; no leg, no trio, no register row has been
EXECUTED; no gate record after gate 1 exists.** The unit stays an open `## OPEN` row (`H1`) with **`OWED — not filed`** spent
on its spec status by THIS filing (the tracker edit is the supervisor's at gate 10, `RCA-8(f)`), and it is **NOT delegable until a
TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`). **⟶ 2026-10-03 THE GATE-4 FINDINGS-LANDING PASS
(FINDINGS A + G) — THE STATUS LINE IS ANNOTATED BESIDE, NEVER REWRITTEN (`RCA-8(d)`; the as-filed GATE-2 form above is KEPT
VISIBLE and this paragraph is the OPERATIVE reading): THE UNIT HAS ADVANCED PAST THE FILING STATE — the TestWriter's red set
exists (`tests/store-focus.test.ts`, authored from this spec alone), the wiring's re-home focus region is IMPLEMENTED
(`src/renderer/renderer.ts`'s `createFocusCarrier(store)` with its FOUR-member surface, the store-backed `persistTarget`, the
mirror reads `mem.focus.entries`/`mem.focus.activeId`, the two exact-reference subscriptions + the `dispose()` release; the
module-level `const holder` is GONE — `[READ]` this pass), and the gate-4 audit returned Findings A + G, whose spec-side
landings THIS pass carries (§2.2 item 3 · §3.1 `M-4` · §3.2 `F-5` · §5.5.1 `P-SF-TP-2` · §5.5.2 item 3 · §7a.1 item 7 ·
§0A note 6 · §5.1 row 5).** **THIS PASS EDITS NO TRACKER, NO `src/**` BYTE AND NO `tests/**` BYTE; the DONE row, the ledger
move and the §Q flips remain the supervisor's gate-10 acts (`RCA-8(f)`).** **CURRENT STATE items 1–10 are the FILING-TIME
snapshot and stay as-filed; their full reconciliation is the gate-8 documentation-review pass's (`AGENTS.md` item 10d) —
recorded here so no reader takes them as current.**

---

## CURRENT STATE (2026-10-05) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end note — the
placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY. THE CURRENT SHAPE EXISTS AND IS GREEN AS THE F2/F3 UNITS' LANDED ARTIFACT; THE RE-HOME IS NOT
   IMPLEMENTED, AND NOTHING OF THIS UNIT IS.** This pass wrote **exactly ONE NEW file — `docs/specs/store-focus.md` (this
   contract) — and edited NO existing file**: not the two landed focus specs, not the plan, not the store contract, not a
   tracker, not `docs/decisions.md`, not `AGENTS.md`, not `package.json`, and no `src/**` or `tests/**` byte. **THE CURRENT
   CARRIER, READ THIS PASS (`[READ]`): `src/renderer/renderer.ts` holds the module-level binding `const holder: { state: FocusState }
   = { state: { entries: [], activeId: null } }` (the symbol `renderer.ts:holder`; the §Q cell's own dated reading cites
   `renderer.ts:314`), mutated ONLY by `answerForHolder`'s accepted branch (`holder.state = result.state`, `renderer.ts`), read by
   `focusRoute` (`renderer.ts`), and observed by NO store listener.** `provident.focus`'s route is the renderer's method switch's
   `case 'focus'` → `focusRoute(req.payload)` (the `F3` layer-map site 6); the answer surface is `FocusAnswer`
   (`{ activeId: unknown; entries: unknown[]; opened: boolean; refused?: { reason: unknown } }` — the untyped form of the tool's
   normative reply, passed out by identity). **THE STORE IS LANDED-GREEN and FROZEN-artifacted** (`store-core-graph.md`; the
   storage module wave `FROZEN` 2026-10-03, `AMENDMENT CONSTRAINT-RE-DERIVE-1`; the freeze records at
   `docs/specs/store-core-module-store-core-graph-surface.md` field 8): **this unit changes NO store byte and NO store member
   (`§2.6` prohibition 2)** — and the store's own legacy suite is the documented T9-class red residue, OWED a re-author under the
   re-frozen artifact, the architect's ruling its entry condition (`§7` item 1; NOT this unit's act). The unit is **`OWED` at
   every gate after this one** (`§4.5`).
2. **THE SURFACE THIS FILING PINS (none of it exists in `src` yet):** the renderer's focus region is REPLACED by a **carrier
   factory** — the exported `createFocusCarrier(store)` returning the bounded surface over the WIRING-held store (`§2.3`): the
   mirror reads `mem.focus.entries` / `mem.focus.activeId` (tier `mem`; a MISS reads the DECLARED EMPTY state), the write-through
   turn invokes the module's caller-called `persist(seam, state)` with the STORE-BACKED SEAM (the seam-target rule, `§2.1` item
   4), the two exact-reference subscriptions (rule 2, `§2.4`) and the wiring's `dispose()` release (the **H2a pattern**,
   `§2.2` of `store-modules-bytes.md`). **The module `src/shared/focus-model.ts` is BYTE-UNCHANGED** — its 0-import census and its
   `4 + 5 = 9`-name export census are RE-VERIFIED by the register's census row (`§5.5.1` `P-SF-IM-1`), **and NO `focus-model`
   register re-grain is owed** (`§1.7` item 9 — the refusal union stays the module's own, five members, function-internal).
3. **THE TWO ENTRY-CONDITION QUESTIONS, ANSWERED BY THIS FILING (each with its reason; nothing is `undefined-until-answered`):**
   **(a) THE AUTHORITY — DECLARED TIER 1.** The focus state's authority is tier 1's tab list (`data-ownership-model-plan.md`
   `§1.7` item 1; `Q-9` SUPERSEDED — `§9.1`'s `Q-9` row: *"the holder STOPS BEING THE AUTHORITY"*); the `mem.focus.*` row is the
   RESIDUAL WORKING COPY (`§1.7`'s reference-table row: *"any residual renderer-realm working copy of the focus state — and note
   that under this slice the AUTHORITY has moved to `file.tabs.*`"*). **The store row is a MIRROR, never a second authority; on
   divergence the tab list wins and the RECONCILE is DECLARED** (`§2.2`). **(b) THE REPLY SHAPE — DECLARED BEHAVIOUR-PRESERVING.**
   The tool's normative reply `{ activeId: string | null, entries: string[], opened: boolean, refused?: { reason: string } }`
   (`docs/specs/mcp-endpoint.md` §3.8 item 2; `focus-tool.md` §2.1 item 5) is UNCHANGED by the carrier move — the answer's members
   are assembled from the store-carried mirror and passed out by identity exactly as today (`§2.5`); **the queue row's "a BREAK if
   so" is therefore NOT triggered, and NO fork consent is owed** (the fork's OBSERVATION-channel re-route is the fork's own pass
   under `H-r6`, a recorded carry — `§2.5` item 4).
4. **THE REGISTER (`§5.5.1`): `6` typed rows — `2` `P-IM` + `2` `P-SM` + `2` `P-TP` — `96` declared attempts, printed WITH their
   six terms and with a term-by-term addition at `§5.5.3`**, `6` strategy ids (`S-SF-*`), NO generator, NO pinned seed, NO new
   dependency (plain deterministic vitest tables + fixed corpus scans — `AGENTS.md` item 11(d), the `engine-pin` precedent) and
   `0` `(bounded)` rows. **The module's plan-mandated folded THREE are `P-SF-IM-1` (import census + positive control),
   `P-SF-IM-2` (no module-level binding) and `P-SF-TP-1` (the two-run store-state-independence differential) — `§5.2.7` item
   (4)'s set, driving the CALLER-side file that gained the store-backed seam target with the module census verified unchanged**;
   the THREE further rows (`P-SF-SM-1` the write-through turns, `P-SF-SM-2` the subscription + release, `P-SF-TP-2` the mirror-read
   totality) are the caller-side property rows this unit's own contract demands — the row count is an OUTCOME, not a budget
   (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`).** The caps are compared against the DECLARED
   figures: per-row maximum `24` (`P-SF-TP-1`) ≤ `100` · total `96` ≤ `400` (headroom `304`); the `≤8` component-breakdown signal
   is not a ceiling (`AGENTS.md` item 11(f)).
5. **THE LEGS THIS UNIT DECLARES (none run): `npm test` `[T]`** — the unit's home `tests/store-focus.test.ts` (the carrier, the
   mirror, the turns, the subscription/release, the register) — plus `npm run typecheck` `[H]` (**`src/**` ONLY — it never reads
   `tests/**`), `npm run typecheck:tests` `[H]` (**the additive fourth leg — the ONLY typecheck leg that reads this unit's test
   file**, `AGENTS.md` item 4), `npm run build` `[H]` (the five bundles stay green; `focus-model.ts` was and remains imported by NO
   `src/**` file, and the renderer bundle's focus-region delta is the unit's own), and a **standalone strict `tsc --noEmit` over
   `tests/store-focus.test.ts`** as the named leg that pins the type half of the exported carrier surface (`§5.2`). **NO `[U]`
   ROW IS OFFERED** (the queue row: `[U]` NOT OFFERED — no rendered surface; the store-carried state is node-observable; the
   rendered strip is the fork's/deferred) **and `[D]` IS NOT CLAIMED** — both refusals are STRUCTURAL (`§6`). **GATE 6 IS
   `STRUCTURAL`, never `waived`** (`§5.2`).
6. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no read-only PBT audit, no
   blind-greens record (`docs/specs/store-focus-greens.md` is named in the diff scope and is `OWED`), no per-unit documentation
   review and no DONE row (`§5.3` fixes its shape).
7. **THE QUEUE ROW'S OPEN QUESTIONS ARE ANSWERED HERE (`§0A` note 1), AND THE CARRIED ITEMS ARE NAMED WITH OWNERS (`§7a.1`):**
   the authority (tier 1) and the reply shape (unchanged) are answered above; the CARRIED items — **the `unknown-id`
   routed pair of the slice** (`docs/specs/focus-model.md`'s refusal rows + `docs/specs/focus-tool-greens.md` `FT-09`, each under
   its own gate — `§1.7` item 8's round-3 bullet; NOT this unit's act, NOT a blocker of the re-home: this unit is
   behaviour-preserving on the refusal path), **the tabs-slice RECORD landing** (`file.tabs.*` + the close verb + the landing
   reference + the exactly-one-active repair — the deferred units', per `§1.7` STATUS and `§6.5` round-2 clause (a); THIS unit
   declares the authority and the mirror rule only, `§2.2`), **the fork's observation-channel re-route** (`H-r6`; `§2.5` item 4),
   **the `§Q` flip cells** (the supervisor's, at gate 10) and **the `mcp-endpoint.md` §3.8 documented repair** (routed to the
   §Q finding's owed documentation pass, NOT this unit's — `§1`'s non-concern table). Each is a NAMED carry with its owner, never
   a bare `OWED`.
8. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` this pass: `process-guardrails.md` alone), so
   **there is no test-use-case coverage matrix and no demo-page index to update** — and this unit renders no page, authors no
   element and mounts nothing (`§3.5` `X-5`'s probe; `§5.2`'s `§7.1` determination). The slice's two authored pages (landing +
   error) are the slice's own, deferred; this unit owes NO `§5.U` row.
9. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO tracker):** the `H1` queue
   row's spec cell (`OWED — not filed`) is spent only on its spec half by this filing; the §Q `provident.focus` PENDING-REBUILD
   cell flips to COMPLIANT when THIS unit lands (the gate-10 act); the ledger stays `24 DONE / 6 open` UNITS = `30`
    **⟶ 2026-10-03 (THE H1 GATE-7+8 DOC-REVIEW — `RCA-8(d)` ANNOTATE-BESIDE; the as-filed figure above is KEPT VISIBLE and this is the OPERATIVE reading): the ledger reads `26 DONE / 4 open` UNITS = `30`** — `H2a`/`H2b` moved to `DONE` 2026-10-03, the open set `G1` · `G2` · `G3` · `H1` unchanged (`§1`'s queue-row citation reconciles to the same reading).
   (`RCA-8(f)` — the architect admits ROWS, not a pass). **AND THE ONE §Q CARRIED DOC REPAIR STANDS UNTOUCHED: the
   `mcp-endpoint.md` §3.8 repair the §Q finding records is the routed documentation pass's, never this unit's** (`§1`).
10. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **One file written, zero files edited, no test run, no leg run,
    no trio run, no `tsc` invocation, no Electron boot, no MCP session, no `git` command, no commit.** The new file is
    **untracked and must be committed by the supervisor** (`RCA-8(a)`'s per-gate commit rule; `RCA-8(c)` — it is a NEW file).
    **NO MEASUREMENT OF A LEG WAS TAKEN BY THIS PASS, AND NONE MAY BE QUOTED FROM IT** (`RCA-12`).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.** **Every ruling is cited by
§/row id or ROW NAME, never restated in words that weaken it.**

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **THE TWO-RULE COMPLIANCE CELL** — `docs/pending.md` §Q's two-rule re-read, the `provident.focus` row (2026-10-03): rule-1 ✗ the focus entries/activeId live in a MODULE-LEVEL binding (`renderer.ts`'s `holder`, mutated by `focusRoute`), not the store; rule-2 ✗ the focus change notifies nothing through a store listener; **PENDING REBUILD: move the focus state into the store (`mem.focus.*`) and have consumers observe it via a store listener/snapshot — the plan's own `U-STORE-FOCUS` obligations.** The queue row's own words are the operative form (`§0` cluster (1)). | `§1`, `§2.1`, `§2.3`, `§2.4`, `§2.5` |
| **2** | **THE H1 QUEUE ROW** — `docs/next-steps.md` row `H1` (`U-STORE-FOCUS`, 2026-10-03): the module-level `const holder` is moved into the store under `mem.focus.entries` / `mem.focus.activeId` (§5.2.7 row 13); **the module's existing `persist(seam, state)` seam's TARGET becomes store-backed (the seam's implementation changes, the module's own bytes do not)**; the state's AUTHORITY is tier 1's tab list (§1.7; `Q-9` superseded); **consumers observe focus via a store subscription/snapshot** (rule 2) — the `provident.focus` tool's route reads the store-carried value, never a module variable; the register's three store-backed rows; the four legs + the register leg; `[U]` NOT OFFERED | `§2.1`–`§2.5`, `§4`, `§5`, `§5.5` |
| **3** | **THE PLAN'S NAMED OBLIGATION, ROW 13** — `data-ownership-model-plan.md` `§5.2.7` row 13 + its **round-3 recast (`R3-4`)**: `focus-model.ts` reads/writes `mem.focus.entries` / `mem.focus.activeId` through its already-exported caller-called `persist(seam, state)`; the seam is a calling param, so the module's own bytes do NOT move; **the state's AUTHORITY is tier 1's tab list (`§1.7`, `Q-9` superseded)**; the unit owns **the SEAM's TARGET rule and the three register rows** — step 1's `N-6` caught that the criterion alone would return `PURE`; the verdict is the SCOPE RULING | `§2.1`, `§2.2`, `§5.5.1` |
| **4** | **THE SEAM'S OWN CONTRACT** — `docs/specs/focus-model.md` `§2.4` seam 3 + `§0A` note 3: `persist(seam, state)` is a RETURNED-WRITE seam — an optional caller callback this module CALLS with the next state, whose return value it hands back; **absent / non-callable / THROWING ⇒ the declared absence `{present:false, value:undefined}`**; `persist` is NOT a store, NOT persisted by the module, and the module NEVER calls it itself (`focusTransition`'s own doc); the SEAM's TARGET is the CALLER's implementation | `§2.1` item 4, `§2.3` item 4 |
| **5** | **THE TOOL'S NORMATIVE REPLY SHAPE AND ITS CARRIER CLAUSE** — `focus-tool.md` §2.1 items 5/6, §2.3 items 3/5, §2.5 item 2 (the wiring holds the live authority; the tool owns only the route + the echo and holds NOTHING between calls); the shape `{ activeId, entries, opened, refused? }` is fixed by `mcp-endpoint.md` §3.8 item 2 | `§2.5` |
| **6** | **THE RE-HOME'S AUTHORITY RULE** — `data-ownership-model-plan.md` `§1.7` (the tabs/focus slice; the reference table's `mem.focus.*` row) + `§9.1` `Q-9` (SUPERSEDED: the holder STOPS BEING THE AUTHORITY; `RH-4` answered by the slice, NOT by a cap) + `§7.1` `RH-4`'s amended block (**the as-filed tier-2-cap answer is WITHDRAWN**) | `§2.2` |
| **7** | **THE HOLDER'S ROW 2.4-1** — `data-ownership-model-plan.md` `§3.4` row 2.4-1: the holder MOVES INTO STORE 2 (**tier 2 is what this holder already IS** — realm lifetime, lost on realm death); it costs the contract amendment to `focus-tool.md` §2.1 item 6 (*the holder is the live authority* stays true; **its carrier changes from a module-level `const` to a tier-2 reference**) — the amendment is the LANDING pass's annotated-beside act (`§5.1`) | `§2.3`, `§5.1` |
| **8** | **THE FROZEN STORE SURFACE** — `store-core-graph.md` `§2.1` (`GraphStore` = `resolve` · `set` · `commit` · `remove` · `clear` · `sweep` · `export` · `sever` · `subscribe` · `tiers` · `register` · `constraints`; `GraphSubscription` = `{name, subtree, unsubscribe(): boolean}`), `§2.5` (the HIT/MISS answers), `§2.8` (the write surface: `set` NEVER MINTS — a `set` on a path with NO node is refused `'undeclared-name'`; `commit` MINTS and re-mints, `{onRepeat:'edit'}` routes a repeat; a tier-free write is refused `'malformed-name'`), `§2.10` items 1–6 (the eight-arm event surface; an exact-reference subscription is NEVER capped — `§2.4`'s `RCAP-3`; per-realm-per-reference delivery; `unsubscribe()` `true`-then-`false`; release triggers sever/realm-death/`reset()`), `§2.11` item 1 (the realm rule) | `§2.1`, `§2.3`, `§2.4` |
| **9** | **THE RELEASE OBLIGATION (THE H2a PATTERN)** — `store-modules-bytes.md` `§2.2`: `dispose()` releases EXACTLY the subscriptions the wiring registered — **UNSUBSCRIBE-ON-DISPOSE**, never the store's `sever` path; the post-conditions `P1`…`P7` and the leak's THREE-ARM detection are the form this unit's wiring release carries | `§2.4` |
| **10** | **THE WIRING SUBSCRIBER PRECEDENT** — `pane-drag-compliance.md` `§2.3` (the listener is a STORE SUBSCRIBER; the registration name must satisfy the LANDED fan-out cell `origin.startsWith(subscriber.name + '.')` — the tier-qualified form the wiring itself registers), `§5.1` row 1 (the bounded wiring role), `§7a.1` item 4 (the boot mint-declare: `commit` the root then `clear` it — a declared-but-unwritten root answers the DECLARED MISS, never a refusal) | `§2.3`, `§2.4` |
| **11** | **THE THREE REGISTER ROWS** — `data-ownership-model-plan.md` `§5.2.7`'s round-3 item (4) (`R-2`/`R-3`, step 2's `§4.1`): per STORE-BACKED module, **(a)** the import-census `P-IM` row with its POSITIVE CONTROL, **(b)** the NO-MODULE-LEVEL-BINDING `P-IM` row, **(c)** the STORE-STATE-INDEPENDENCE DIFFERENTIAL `P-TP` row — TWO-RUN: a FIXED ARGUMENT TUPLE's answer is identical when the tiers are COLD / hold a SHADOWING `temp`/`mem` value / hold a committed `file` value — with the round-3 comparator ruling (`R-3`): `===` only for a primitive return; **CANONICAL STRUCTURAL COMPARISON** for an object return (own enumerable keys, sorted, primitives by value; NO deep-equality dependency) | `§5.5.1` `P-SF-IM-1`/`-IM-2`/`-TP-1` |
| **12** | **THE CALLER-OWNED-SPELLING RULE** — `data-ownership-model-plan.md` `§1.3` `R-1`/`R-2`/`R-3`/`R-6` (*"a declared name is a declaration of the CALLER'S spelling, not a vocabulary the store owns"*; one spelling, one home): the store ships NO `focus` vocabulary; `mem.focus.entries` / `mem.focus.activeId` are THE CALLER'S declarable spellings, PROPOSED by the plan and LANDED by this unit | `§2.1`, `§2.6` |
| **13** | **THE REGISTER DISCIPLINE** — `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` (all cited by ROW NAME, `docs/decisions.md`): a code-bearing unit's spec MUST carry its typed register BEFORE the red set (the zero-row exemption is UNAVAILABLE — **this unit is CODE-BEARING in the wiring**, `AGENTS.md` item 11(g)); a declared term is a DRIVE count; the total is printed WITH its terms; an un-run row is a FAILURE | `§5.5` |
| **14** | **THE THROW-ABSORPTION RULE** — `docs/decisions.md` `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION` (cited by ROW NAME): a throwing caller-supplied seam/handle is absorbed at the WIRING turn, never at the store's evaluation; the store's surface stays UNGUARDED | `§2.3` item 6, `§3.2` `F-6` |
| **15** | **THE F2/F3 CLOSE-OUTS ARE NOT RE-OPENABLE** — `docs/specs/focus-model.md`'s DONE record and `docs/specs/focus-tool.md`'s `§2.5` item 2 (the module's authority is not shared; the tool's own route is the unit's) — this unit AMENDS neither module contract's own clauses (the amend-beside targets are the CARRIER clauses of §2.5/§2.1 items, `§5.1` row 5) | `§1`, `§5.1` |
| **16** | **THE AUTHORED-SURFACES BOUNDARY OF THE SLICE** — `data-ownership-model-plan.md` `§1.7` items 6/8 + `§6.5` round-2 clause (a) (the strip is NOT this unit's; the two authored pages are the slice's, `§5.U`-owed there) — this unit's flows are STORE-ONLY | `§1`, `§5.2`, `§3.5` `X-5` |

### 0A. The dated ruling notes — the clauses the record leaves to this filing, DECIDED here (2026-10-05)

**What this subsection is, and what it is not.** The queue row and the plan decide the CARRIER question, the AUTHORITY and the
obligation shape; they leave THIS filing several clauses a TestWriter must have before it can author a falsifiable row. **This
filing DECIDES each of those clauses here**, each with its reason and its landing site. **No note below weakens a ruling, a
landed clause or a register row**; the places where a clause is **this filing's own choice rather than a derivation** are
flagged as such and reported at `§7a.1`.

**Note 1 — THE TWO ENTRY-CONDITION QUESTIONS, ANSWERED (the queue row's own "Entry condition / decisions owed" cell).** **(a)
THE AUTHORITY IS TIER 1'S TAB LIST** — the plan's `Q-9` supersession says tier 1, the `§1.7` reference table says the authority
"has moved to `file.tabs.*`", and the queue row repeats it; **this filing takes the plan's reading and DECLARES it** (`§2.2`).
**(b) THE REPLY SHAPE IS UNCHANGED** — the tool's reply is assembled from the state the transition answers; the re-home changes
the CARRIER, not the answer's members, and the values pass out by identity (`§2.5`). **Neither is left open, and neither is
`undefined-until-answered`** (`G-3`'s form). A pass that re-opens either OWES a gate (`§7a.1`).

**Note 2 — THE CARRIED PAIR THIS UNIT DOES NOT RESOLVE (the slice's `unknown-id` route).** `§1.7` item 8's round-3 correction
names the REAL binding sites for the slice's "`unknown-id` becomes unreachable from the focus verb" amendment: `docs/specs/focus-model.md`'s
REFUSAL ROWS (the union's `'unknown-id'` member and the arms that still produce it) and `docs/specs/focus-tool-greens.md`'s `FT-09`
(each owes its own gate; the union-membership question stays CARRIED, not answered). **THE RE-HOME IS BEHAVIOUR-PRESERVING ON THE
REFUSAL PATH: `'unknown-id'` stays EMITTED for an unowned/unknown id exactly as today** (the route still calls the module with
unowned ids and the module still refuses) — so the pair is NOT a blocker of THIS unit's re-home, and the plan's first-amendment
sentence *"`U-STORE-FOCUS`'s contract may not be finalized before both land"* is read, in its round-3 form, as gating the SLICE's
`unknown-id` AMENDMENT (the error-tab flow's prerequisite), which this unit does not carry. Recorded with owners at `§7a.1` item
1; a pass that reads the pair as a blocker of this filing is over-reading.

**Note 3 — THE SEAM-TARGET RULE, NAMED PRECISELY (plan row 13's own words: "the unit owes the seam's target rule").** **THE
RULE, IN THIS CONTRACT'S OWN TERMS — `§2.1` item 4:** *the CALLER of `persist` supplies a seam whose implementation writes the
mirror references `mem.focus.entries` and `mem.focus.activeId` (tier `mem`, `commit` with the default `{onRepeat:'edit'}`), and
whose return value is the store's declared return (the receipt) or the store's declared answer; the module's `persist(seam, state)`
export is UNCHANGED — it still calls the caller's function and returns `{present, value}`; an absent/non-callable/throwing seam
still reads the DECLARED ABSENCE via the module's own `try`.** **The in-tree caller is the renderer's focus region, and its
write-through turn IS the store-backed target's exercise** (`§2.3` item 4) — the wiring calls the module's own `persist(seam, state)`
with its store-backed seam, so the seam is exercised per its contract and the seam's TARGET (the caller's implementation) is
store-backed; **the module's own bytes stay identical** (`§5.5.1` `P-SF-IM-1`).

**Note 4 — THE CARRIED P-16 READING (the carrier question `fork-store-reads.md` §2.4 non-case 5 routes to H1).** The H3 unit's
`GCR-1` rule named the focus path "a `P-16`-clean shape; not a template for a store-addressed read (**that carrier question is
`H1`'s, not this unit's**)". **THIS UNIT IS THAT CARRIER ANSWER: the focus route becomes the sanctioned store-carried read** —
the two-rule criterion is the OPERATIVE compliance reading of §Q (the letter-rows stand visible; the two-rule read governs), the
queue row mandates *"the `provident.focus` tool's route reads the store-carried value, never a module variable"*, and the
focus state is the tool's OWN state, deliberately NOT graph-carried (`focus-tool.md` §2.5 item 5) — it is not the multi-store
slice's store state that `P-16`/`GCR-1` govern (`fork-store-reads.md` §2.2's store-axis closure: `GCR-1`'s subject is the
four-tier facility + the values its tiers carry; the focus mirror IS such a value, and the route's read is the compliance
criterion's OWN mandated shape). **`P-16` STAYS UNQUALIFIED and `GCR-1` stands; the §Q P-16 lane and the non-case-5 sentence are
annotated BESIDE by the landing pass** (`§5.1` row 5; `§0A.3` edge `S-2`).

**Note 5 — THE MIRROR CAP QUESTION, DECLARED-FREE.** `RH-4`'s as-filed answer (a declared cap on the tier-2 holder) is
WITHDRAWN BY `Q-9`'s supersession: the entry set is bounded by construction (tier 1's tab list + its first-class removal path),
NOT by a numeric cap (`data-ownership-model-plan.md` `§7.1`'s amended block, `§9.1` `Q-9`). **THEREFORE THIS UNIT ADDS NO CAP ROW
ON `mem.focus.entries`** — and the mirror's bounded-by-construction property is DECLARED (`§2.2` item 4) and becomes EXECUTABLE
when the slice's record lands (the slice units' obligation, named with its owner). **A later pass that adds a cap to the mirror
as "the `RH-4` fix" is re-literalising a superseded answer and MUST OPEN A GATE.**

**Note 6 — THE BOOT MINT (the declared-but-unwritten root).** The mirror reads MUST answer a MISS on a cold store, never a
REFUSAL: without a declared root, `resolve('mem.focus.entries')` would answer `'undeclared-name'` at `C-TOP`. **The carrier
therefore MINT-DECLARES its root at construction — `commit('mem.focus', undefined)` then `clear('mem.focus')` — so the register's
row pre-exists the first write and a cold read answers the DECLARED MISS** (the `pane-drag-compliance.md` §7a.1-item-4 reading,
landed at `createPaneDrag`'s bootstrap). A hostile store absorbs every step (`§2.3` item 6). **⟶ 2026-10-03 THE GATE-4
AUDIT'S FINDING G (DOC-REVIEW-ITEM) — THE COLD READ'S LITERAL ANSWER CORRECTED BESIDE (`RCA-8(d)` ANNOTATE-BESIDE; the as-filed
note above is KEPT VISIBLE and this paragraph is the OPERATIVE reading).** **THE COLD READ ANSWERS THE DECLARED-EMPTY OUTCOME
VIA THE CARRIER'S CONSUMPTION OF THE STORE'S D-ANCHOR READ-SIDE REFUSAL: after the boot mint (`commit('mem.focus', undefined)`
+ `clear('mem.focus')`), `resolve('mem.focus.entries')` / `resolve('mem.focus.activeId')` on the CURRENT frozen store answer the
READ-SIDE REFUSAL RECORD `{reason:'no-such-anchor', step:'D-ANCHOR'}` — the walk arm (ii) of `store-core-graph.md` §2.3 item 6,
never a throw and never a `GraphReadHit` (documented by the red set's `S23-2b`/`S23-3b` rows, `[READ]` this pass); the carrier's
read turn CONSUMES that refusal as the same declared-empty reading — `§2.1` item 6's LAST SENTENCE and `§2.3` item 6 are the
CONSUMPTION RULE whose letter carries this outcome.** **`'undeclared-name'` CANNOT OCCUR POST-MINT: the boot mint declares +
mints the root (the register row pre-exists the first write), so `C-TOP` is passed and the leaf references answer
`'no-such-anchor'` at `D-ANCHOR` — `'undeclared-name'` at `C-TOP` is the PRE-MINT tree's answer only.** **The as-filed sentence
*"a cold read answers the DECLARED MISS, never a refusal"* is therefore READ AS THE OUTCOME CLAIM (the declared-empty reading),
not as the store's literal record — the store's literal post-mint answer is the D-ANCHOR read-side refusal consumed as that
outcome.** **AND THE FINDING'S SECOND HALF, RECORDED HERE AS A `DOC-REVIEW-ITEM` (a TestWriter-side fix, NOT executed at this
gate — the scheduling the gate's ruling names): the red set's header cell `tests/store-focus.test.ts` line 4 reads
*"docs/specs/store-focus.md (952 lines, read in full)"* while the file measures **953** lines at this pass — the header's
count is corrected by the TestWriter's next pass (this spec carries no length census of its own by its own rule; the
line-count claim is the test-side cell's, and its correction lives in the test file, never here).**

**Note 7 — THE MIRROR'S VALUE SEMANTICS.** The store holds node VALUES as `unknown` — the wiring commits the CALLER'S OWN entry
objects (the `FocusEntry` records, by reference) and reads them back as the node's own value. **This filing pins the READER'S
discipline, not the store's internals: the wiring never mutates a read value, and the register's differential compares by the
CANONICAL STRUCTURAL form (`R-3`), never by deep-equality (`§5.5.1` `P-SF-TP-1`).**

---

### 0A.1 THE CLAIM LEDGER — THE CLOSED FIVE-FORM AUTHORITY ENUM AND THE CLOSED CLAIM-CLASS SET

**EVERY LOAD-BEARING CLAIM IN THIS FILE CARRIES ONE AUTHORITY LABEL FROM THE CLOSED ENUM BELOW, AND ONE CLAIM-CLASS LABEL FROM
THE CLOSED SET BELOW. A claim carrying no label is not a claim of this file.**

**THE AUTHORITY ENUM, CLOSED AT FIVE** *(the `Agent Harness` `spec-authoring-discipline.md` §3.3 five-form enum, cited by row id,
as rendered at `docs/specs/fork-store-reads.md` §0A.1; used exactly, no sixth label invented):*

| Label | Means | Where this file's instances live |
| --- | --- | --- |
| **`[RULING]`** | a recorded architect decision row / directive, cited by row name or row id | `§0` rows 1/2 (the §Q cell's two-rule re-read; the queue row `H1`), `§0` row 3 (`R3-4`), `§0` rows 11/13/14 (the register rows; the discipline rows), `§2.2` |
| **`[SPEC]`** | a landed contract clause of a sibling spec or the plan, cited by §/row id | `§0` rows 4/5/6/7/8/9/10/12/15/16; the `§2.1`–`§2.6` citations; the `§3` row citations |
| **`[READ]`** | a reading this pass took of bytes at a named path, with the path stated | `CURRENT STATE` item 1 (the holder, the `case 'focus'`, `FocusAnswer`), `§2.1` (the module census), `§2.3` (the carrier's current site), `§3.5` (the existence probes) |
| **`[DERIVE]`** | a clause DERIVED from `[RULING]`/`[SPEC]`/`[READ]` inputs, with those inputs named in the same row | `§2.1` item 4 (the seam-target rule), `§2.2` (the divergence/reconcile), `§2.3` items 3/4 (the turns), `§2.4` (the release post-conditions), `§2.5` (the reply determination), `§5.5.1` (the register rows) |
| **`[DECL]`** | a clause this file DECLARES normatively and for which it names the site at which it becomes checkable — never a measurement | `§2.2` item 4 (the bounded-by-construction declaration), `§2.5` (the behaviour-preserving declaration), `§7a.1` (the carried items) |

**NO CLAIM OF THIS FILE IS LABELLED WITH AN AUTHORITY OUTSIDE THESE FIVE.** A claim whose only support is *"a later pass will
measure it"* is **not** filed here — that would be a `PRED`, and this file's `PRED` count is `0` because the two places such a
claim could be made are instead `OPEN` carries with owners (`§7a.1` items 1–5).

### 0A.2 THE CLOSED CLAIM-CLASS SET, WITH ITS PRINTED TOTALS

*(`spec-authoring-discipline.md` §3.2's claim-class set, cited by row id; used exactly, with no sixth class. The counts are the
CLAIM-BEARING ROW GROUPS this file enumerates, per major section — the sibling form of `fork-store-reads.md` §0A.2.)*

| Class | Means | Count in this file, printed with its terms |
| --- | --- | --- |
| **`NORM`** | a normative clause: it obliges, forbids or declares a shape | **`80`** = `5` (`§1` — the numbered scope items) + `32` (`§2` — itself `6` (`§2.1`) + `5` (`§2.2`) + `6` (`§2.3`) + `4` (`§2.4`) + `5` (`§2.5`) + `6` (`§2.6`)) + `24` (`§3`'s BEHAVIOURAL rows — itself `6` (`§3.1`) + `6` (`§3.2`) + `6` (`§3.3`) + `6` (`§3.4`); §3.5's existence probes are `FACT` readings, NOT counted twice) + `5` (`§4`) + `3` (`§5` — the diff scope, the legs, the DONE-row shape) + `3` (`§6`) + `7` (`§7` — the numbered honest statements) + `1` (`§7a.1` — the answered-decision ledger's closing rule) |
| **`FACT`** | a reading of landed bytes or a quoted landed clause | **`11`** = `1` (`CURRENT STATE` item 1 — the holder/`FocusAnswer` read) + `1` (`§2.1` item 3 — the module-census read) + `3` (`§0`'s quoted cells — the §Q cell, the queue row, the plan row 13) + `5` (`§3.5`'s existence probes `X-1`…`X-5`) + `1` (`§8`'s authority table) |
| **`PRED`** | a prediction about a later pass's behaviour, with its falsifier | **`0`** — this file makes NO prediction: every clause that would be a prediction is a `NORM` declaration or an `OPEN` carry (`§7a.1`) |
| **`OPEN`** | a named, owned, unresolved item carried rather than decided | **`6`** = `§7a.1` items `1` – `6` (the `unknown-id` pair · the slice record landing · the fork observation-channel carry · the §Q flip cells · the `mcp-endpoint.md` §3.8 repair · the register's execution) **⟶ 2026-10-03 (THE GATE-4 FINDING-A LANDING — `RCA-8(d)` ANNOTATE-BESIDE; the as-filed `6` above is KEPT VISIBLE and this is the OPERATIVE reading): `7` = `§7a.1` items `1` – `7`** — the six as-filed + **item 7 (the re-seed WRITE half's deferral, added by this pass)** |

**THE TOTAL, PRINTED WITH ITS TERMS (a total without its terms is a review finding — `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`):
`80` `NORM` + `11` `FACT` + `0` `PRED` + `6` `OPEN` = `97` claims.** **THE IDENTITY CHECK: `80 + 11 + 0 + 6 = 97` ✓ — and the
subsection terms re-check: `5 + 32 + 24 + 5 + 3 + 3 + 7 + 1 = 80` ✓ · `6 + 5 + 6 + 4 + 5 + 6 = 32` ✓ · `6 + 6 + 6 + 6 = 24` ✓ ·
`1 + 1 + 3 + 5 + 1 = 11` ✓.** **⟶ 2026-10-03 (THE GATE-4 FINDING-A LANDING — `RCA-8(d)` ANNOTATE-BESIDE; the as-filed `97`
form above is KEPT VISIBLE and this is the OPERATIVE reading): `80` `NORM` + `11` `FACT` + `0` `PRED` + `7` `OPEN` = `98`
claims — identity `80 + 11 + 0 + 7 = 98` ✓; the subsection terms re-check is UNCHANGED (only the `OPEN` term moved `6 → 7`,
the added `§7a.1` item 7).**

### 0A.3 THE SUPERSESSION POINTER EDGES — CLOSED AND ENUMERATED

**A claim that supersedes or re-points a landed clause MUST carry a SUPERSESSION POINTER EDGE, and this file's edges are CLOSED
AND ENUMERATED — a supersession whose edge is absent is a review finding.**

| # | This file's clause | The landed clause it points at | The edge's KIND |
| --- | --- | --- | --- |
| **S-1** | `§1`/`§2.3`/`§2.4`'s re-home (the mirror + the subscription) | `docs/pending.md` §Q's `provident.focus` PENDING-REBUILD cell (rule-1 ✗ / rule-2 ✗, 2026-10-03) | **ARM-TAKEN** — the REBUILD arm is taken; the cell's PENDING-REBUILD mark flips at gate 10 (the supervisor's act), and the cell's own bytes are NOT edited by this file |
| **S-2** | `§0A` note 4's carrier answer (the route reads the store-carried value) | `docs/specs/fork-store-reads.md` §2.4 non-case 5 (*"`provident.focus` … reads NO store value … not a template for a store-addressed read (**that carrier question is `H1`'s**)"*) and §Q's P-16 lane (*"the focus path reads NO store value and NO graph node"*) | **CARRIED-ANSWERED** — H1 IS that carrier answer; the path becomes the mandated store-carried read under the two-rule criterion's operative status; `P-16` stays UNQUALIFIED and `GCR-1` stands; the two cells are annotated BESIDE by the landing pass, never rewritten |
| **S-3** | `§2.1`/`§5.5.1` (the landed references + the register rows) | `data-ownership-model-plan.md` `§5.2.7` row 13 + its round-3 named-obligation table (the PROPOSED `mem.focus.*` spellings; the seam-target rule; the three register rows; NO module byte change) | **IMPLEMENTED-NOT-OVERRIDING** — this unit lands exactly that obligation; the plan row stays the authority, and the plan's PROPOSED spellings become the LANDED references |
| **S-4** | `§2.2` (the authority + the mirror rule) | `data-ownership-model-plan.md` `§1.7`'s reference-table `mem.focus.*` row, `§9.1` `Q-9` (SUPERSEDED) and `§7.1` `RH-4`'s amended block (the cap answer WITHDRAWN) | **AUTHORITY-DECLARED** — the tier-1 authority and the mirror-not-second-authority rule are declared and become executable when the slice's record lands (the deferred units' landing); no `file.tabs.*` record is landed by this file |
| **S-5** | `§5.1` row 5's amendment set (the `focus-tool.md` §2.1 item 6 carrier amendment) | `data-ownership-model-plan.md` `§3.4` row 2.4-1's cost clause (*the holder is the live authority* stays true; its carrier changes from a module-level `const` to a tier-2 reference) | **LANDED-AS-H1** — this unit is that row's landing; the amendment is an annotated-beside target of the landing pass, per the plan's own words |
| **S-6** | `§2.1` item 4's seam-target rule | `docs/specs/focus-model.md` `§2.4` seam 3 (+ `§0A` note 3): the module's `persist` touches no storage surface | **TARGET-SUPERSEDED** — the MODULE's bytes and its seam contract are unchanged; the SEAM's TARGET semantics change from caller-called to store-backed AT THE CALLER, carried as an annotated-beside note in `focus-model.md` (no clause weakened, no register re-grain — `§1.7` item 9) |
| **S-7** | `§2.5` (the tool's reply + the wiring's carrier) | `docs/specs/focus-tool.md` §2.1 item 6 / §2.5 items 2/5 / §2.4 row 4 / §2.1 item 7 (the wiring-held live authority; the tool's "no store" negatives) | **CARRIER-AMENDED** — the live authority's CARRIER changes from the module-level `const` to the tier-2 mirror (the tool's reply shape and the TOOL's own negative claims stay); the wiring half's "any store" denial narrows to the TOOL's own bytes; each cell amended BESIDE by the landing pass |
| **S-8** | §2.2 item 3's dated annotation (+ `§3.1` `M-4`'s, `§3.2` `F-5`'s, `§5.5.1` `P-SF-TP-2` drive-5's and `§5.5.2` item 3's — the gate-4 Finding-A landing, 2026-10-03) | THIS file's OWN as-filed DRIVEN reading — *"the mirror is RE-PROJECTED from the tab list (the mirror's entry set and seat are re-seeded to the tab list's projection in the same committed write)"* (`§2.2` item 3 as filed; `§3.1` `M-4`'s as-filed "in one committed write"; `§3.2` `F-5`'s as-filed "re-projects the mirror"; `P-SF-TP-2`'s as-filed "the declared re-projection on divergence") | **SELF-ANNOTATED-BESIDE** — the re-seed WRITE is DECLARED-DEFERRED (`§7a.1` item 7, its own future register drive); the executed half is the divergence DETECTION + the declared reconcile READING; the as-filed forms stay visible (`RCA-8(d)`) |

**SEVEN EDGES, ENUMERATED AND COUNTED: `7` ✓.** **⟶ 2026-10-03 (THE GATE-4 FINDING-A LANDING — `RCA-8(d)` ANNOTATE-BESIDE;
the as-filed seven is KEPT VISIBLE and this is the OPERATIVE reading): EIGHT EDGES, ENUMERATED AND COUNTED: `8` ✓** — `S-8`
added by this pass (a self-re-pointing edge on this file's own as-filed reading, no marker on any cited ruling row). **NO clause of this file supersedes a landed clause without an edge above, and
no edge above is an `AMENDED`/`SUPERSEDED` marker on a cited ruling row** (the discipline the sibling specs state as *"a landed
ruling re-opened silently"* is a finding).

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass**: no suite ran, no trio ran, no `tsc` invocation was made, no
Electron window booted, and **no result is recorded here.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` under the node suite, driving pure values and recording closures — here `tests/store-focus.test.ts` | not a browser, not a real OS, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here the WIRING's focus region in `src/renderer/renderer.ts` (the carrier factory + the boot construction) | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg | **NOT OFFERED BY THIS SPEC** (`§5.2`: no rendered surface — the store-carried state is node-observable) |
| **[D]** | divergence harness | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned) | **nothing this unit's contract needs to observe**; **NO `[D]` ROW IS CLAIMED** (`§5.2`) |

**Seven honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence, and NEVER OS evidence.** It says this
   repo's vitest files pass against the carrier + the store + the module. **No window is booted, no element is touched, no MCP
   transport is exercised, and NO FOCUS IS MOVED ANYWHERE** in the run — the route's answer is a VALUE question, nothing is ever
   focused by this unit (`focus-tool.md` §2.5 item 5's graph-invisibility claim is UNCHANGED).
2. **This unit touches NO DOM, at all — not even the shim.** Its rows need no element from a document: the subject is a state
   carrier (the store references), a pure module's functions, and the wiring closures that compose them.
3. **The module reads NO ambient global and performs NO realm access** — unchanged, and RE-VERIFIED by `P-SF-IM-1` (its census is
   its own landed contract's fact; this unit adds nothing to it).
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its rows are authored in
   this unit's own test file and executed by the same node suite — so a register row is `[T]` evidence exactly as a `§3` row is,
   and no register row may be read as `[H]`, `[U]`, `[D]`, OS or assembled-app evidence.
5. **A green on the carrier's REPLY is NOT a green on a FOCUSED ELEMENT.** No row of this unit may be read as evidence that
   anything was focused, that a tab or a pane changed, or that any user-visible flow changed — the rendered strip is the
   fork's/deferred, and this unit's flows are STORE-ONLY (`§0` ruling 16).
6. **The `mem.focus.*` mirror is a WORKING COPY, never an authority over tier 1** — no row of this file may be read as granting
   the mirror a say the tab list does not have (`§2.2`).
7. **A green on the store's settled receipts is the STORE's contract's evidence, not this unit's invention** — every assertion
   about receipts, events and deliveries is pinned against the FROZEN surface's declared shapes (`store-core-graph.md` §2.8/§2.10),
   and this unit adds no member to that surface.

---

## 1. Scope

**One deliverable: the focus state's re-home onto the store — the `mem.focus.*` mirror in the renderer wiring, the
`persist(seam, state)` seam's store-backed TARGET, and the rule-2 store subscription with its release — landed in the WIRING's
focus region of `src/renderer/renderer.ts` (the ONLY in-tree `src/**` file that changes), with the module's bytes verified
unchanged and the register's three store-backed rows + the caller-side property rows driving the whole.**

1. **What it is, in one sentence.** The renderer's module-level `const holder` is REPLACED by a store-carried mirror
   (`mem.focus.entries` / `mem.focus.activeId`, tier `mem`): the wiring's focus route writes the mirror through the module's own
   caller-called `persist(seam, state)` seam whose TARGET implementation is store-backed, reads the mirror for its answer
   assembly, and registers a store subscription through which consumers observe focus changes (rule 2), releasing it by the
   wiring's `dispose()` (the H2a pattern).
2. **What it is NOT.** It is **not** the tabs-slice RECORD landing (`file.tabs.*` + the close verb + the reserved landing
   reference + the exactly-one-active constraint's repair arm — the deferred units', `§1.7`'s STATUS says the slice is a PLAN no
   unit carries yet, and `§6.5` round-2 clause (a) narrows `U-STORE-FOCUS`'s slice scope away from the strip); **not** the
   rendered tab strip or the two authored pages (the strip's deferred unit + the slice's own `§5.U` rows); **not** a store change
   (the store is FROZEN); **not** the tool's main-side bytes (the `provident.focus` handler, the preload and the MCP surface are
   untouched); **not** the `unknown-id` unreachability amendment (the slice's routed pair, `§0A` note 2); **not** the
   `mcp-endpoint.md` §3.8 documentation repair (the §Q finding's routed documentation pass); **not** the fork's UI/observation
   bytes (the fork's own pass under `H-r6`); **not** a page design (`§5.2`).
3. **What the unit may land.** `src/renderer/renderer.ts`'s bounded focus region ONLY (`§5.1` row 1) + `tests/store-focus.test.ts`
   (NEW) + this spec + the `*-greens.md` record + the amendment set of `§5.1` row 5 (annotated-beside, `RCA-8(d)`). **No other
   file's bytes move, and NO `src/shared/**` module is edited.**
4. **The unit is CODE-BEARING in the wiring** — the zero-row register exemption is UNAVAILABLE (`AGENTS.md` item 11(g); `§0`
   ruling 13): the wiring's focus region changes, so the register is MANDATORY before the red set (`§5.5.1`).
5. **The F2/F3 close-outs are not re-opened** — `src/shared/focus-model.ts`'s contract and `docs/specs/focus-tool.md`'s route
   clauses stay; this unit's amendment set targets the CARRIER clauses only (`§5.1` row 5; `§0A.3` edges `S-6`/`S-7`).

**Explicitly OUT of scope (do not do in this unit):** every `src/shared/**` module (the module is byte-unchanged and its
`focus-model.md` register is NOT re-grained — `§1.7` item 9); every store byte and member (`src/renderer/store-core-graph.ts`,
`store-graph-references.ts` — FROZEN); `src/main/**`, the preload bridge, the MCP server, `scripts/**`, `package.json`/lock,
`tsconfig*`, `vitest.config`; every tracker (`docs/next-steps.md` · `docs/pending.md` · `docs/decisions.md` · `docs/defects.md` ·
`docs/HANDOFF.md` — the supervisor's gate-10 acts); `<Astrographer>/**` (`H-r6`); `docs/skills/designing-pages.md` (does not
exist).

---

## 2. The surface (exact)

### 2.1 The store route and the carried state shape — the mirror, the tier, the spelling, the seam target

1. **THE STORE ROUTE, EXACT — TWO REFERENCES, TIER `mem`, SPELLED BY THE CALLER.** The focus state's carrier is
   **`mem.focus.entries`** (the entries — a `readonly FocusEntry[]`, the CALLER'S OWN entry records in the caller's own order)
   and **`mem.focus.activeId`** (the seated id — `FocusId | null`), **both at tier `mem`** — the renderer realm, per the realm
   rule (`store-core-graph.md` §2.11 item 1) and the plan's tier table (`data-ownership-model-plan.md` §1.1 Store 2; the
   fork-store-reads §2.2 realm table: tier-2 values are the renderer's). **THE STORE SHIPS NO `focus` VOCABULARY**: the two
   spellings are the CALLER'S declarable spellings (`§1.3` `R-1`/`R-6` — *"a declared name is a declaration of the CALLER'S
   spelling, not a vocabulary the store owns"*), PROPOSED by the plan (§5.2.7 row 13) and LANDED by this unit; no `focus`,
   `entry`, `active` or `focus-id` token appears in any store byte, and a register row keeps the DECLARED SPELLING at the
   wiring's own commit/read calls (`§2.3`).
2. **THE CARRIED STATE SHAPE, EXACT — `FocusState`'s TWO MEMBERS, SPREAD ACROSS THE TWO REFERENCES.** The mirror carries
   exactly the member set `docs/specs/focus-model.md` `§2.1` declares for `FocusState`: `entries: readonly FocusEntry[]`
   (`FocusEntry` = `{ readonly id: unknown; readonly target: unknown; readonly label?: string }`, the caller's own records) and
   `activeId: FocusId | null` (`FocusId = unknown`; `null` = nothing active; `undefined` is a LEGAL opaque id carried by
   identity, DISTINCT from `null` — `focus-model.md` §2.3 item 5's dated extension, UNCHANGED). **THERE IS NO THIRD REFERENCE
   AND NO DERIVED MEMBER**: the mirror is the state, nothing more (a `cache`, a `tier` label or an `order` copy is a second
   carrier — FAILS `F-7`). **The entry objects stored are THE CALLER'S OWN OBJECTS BY REFERENCE** (`§0A` note 7) — the store
   holds values as `unknown`, the wiring writes what it owns, and a reader never mutates a read value.
3. **THE MODULE'S OWN BYTES DO NOT MOVE — THE CENSUS IS VERIFIED, NOT CHANGED.** `src/shared/focus-model.ts` keeps its
   **0-import census** and its **`4 + 5 = 9`-name export census** (the value exports `focusTransition` · `focusOrder` ·
   `focusIndex` · `persist`; the type declarations `FocusId` · `FocusEntry` · `FocusVerb` · `FocusRefusalCode` · `FocusState`) —
   the byte-identity the plan's `R3-4` and `§5.6.1` row 13 pin (`NO byte change required by the plan`). **The unit's own
   row `P-SF-IM-1` (`§5.5.1`) RE-VERIFIES that census with its positive control.** The census the plan pins is the IMPORT
   census OF THE MODULE (0 imports, UNCHANGED — the module's own bytes never gain a store read); the module IS imported BY the
   wiring (`src/renderer/renderer.ts` imports the module per the F2 composition answer — that is the CALLER's import, not the
   module's, and it is the pre-existing F2 state). **NO `focus-model` register re-grain is owed** (`§1.7` item 9).
4. **THE SEAM-TARGET RULE, EXACT (`[DERIVE]`; from plan row 13's round-3 clause + `focus-model.md` §2.4 seam 3 + §0A note 3).**
   **`persist(seam, state)` is a CALLER-CALLED, RETURNED-WRITE seam** — the module invokes the caller's function with the next
   state and hands the returned value back (`{present, value}`; absent/non-callable/THROWING ⇒ the DECLARED ABSENCE
   `{present:false, value:undefined}`; the module NEVER calls it itself — `focusTransition`'s own doc). **THE TARGET RULE: THE
   CALLER of `persist` supplies a seam whose implementation — the TARGET — is STORE-BACKED: given a `FocusState`, it commits
   `mem.focus.entries` = the state's `entries` and `mem.focus.activeId` = the state's `activeId` (tier `mem`, `commit` with the
   default `{onRepeat:'edit'}`), and its return value is the store's declared return (the receipt) or the store's declared
   answer.** The seam's OBSERVABLE is the `persist` return (`{present:true, value:<the seam's return>}`), and a seam that RETURNS
   has its return handed back BY IDENTITY whatever its shape (`focus-model.md` §2.4 seam 3). **The module's own `persist` bytes
   are UNMOVED; only the TARGET's semantics change (caller-called → store-backed) — the plan's §5.6.1 row 13's "re-run its
   rows" consequence is THIS unit's register's differential (`P-SF-TP-1`).**
5. **THE THROW PATTERNS, CLOSED.** **(a)** `createFocusCarrier`'s ONE declared throw: an ABSENT/non-store argument is refused
   at construction with a typed `Error` (the carrier's whole point is the store carrier; the `createGraphStore` load-refusal
   form, `store-core-graph.md` §2.1). **(b)** The module's functions never throw (its own contract), and the carrier's turns
   never throw for ANY argument (the wiring-turn absorption rule, `§0` ruling 14). **(c)** The store's own surface returns
   RECORDS and never throws on the shapes this unit drives (`store-core-graph.md` §2.2 `P-5`); a HOSTILE store/throwing handle
   is absorbed by the wiring turn (`§2.3` item 6). **(d)** NO OTHER THROW IS DECLARED.
6. **THE MIRROR'S COLD-HOME, EXACT.** A store MISS on either reference (`{found:false, value:undefined, tier:null, cache:null,
   name}` — `store-core-graph.md` §2.5) reads the DECLARED EMPTY member: entries MISS ⇒ `[]`; activeId MISS ⇒ `null`. **A
   REFUSAL (`'undeclared-name'`) cannot occur for the unit's own spellings** — the boot mint declares the root first (`§0A`
   note 6; `§2.3` item 2) — and if one is ever returned by a hostile store, it is consumed as the same declared-empty outcome
   (`§2.3` item 6). The declared-empty pair IS the module's own declared start `{entries: [], activeId: null}` — no value is
   invented (`§2.1` item 5's MISS rule of the H2a form — here the "bookkeeping" is the mirror itself).

### 2.2 The authority and the divergence — the mirror is a projection, tier 1's tab list wins

1. **THE AUTHORITY IS TIER 1'S TAB LIST (`[RULING]`; `§1.7`, `Q-9` SUPERSEDED).** The entry set the focus state projects is
   **tier-1 data** — the plan's `§1.7` item 1 (*"the tab list … is tier-1 data and therefore survives a restart"*) — and the
   `mem.focus.*` row is the RESIDUAL RENDERER-REALM WORKING COPY (*"any residual renderer-realm working copy of the focus
   state — and note that under this slice the AUTHORITY has moved to `file.tabs.*`"*, `§1.7`'s reference table). **A unit FAILS
   this clause if the tab list is held in a renderer module binding instead of the store** (`§1.7` item 1's own fail clause,
   cited) and **if the mirror is read as a second authority over the entry set** (the `V-13`/`A-19` one-authority class).
2. **THE MIRROR NEVER BECOMES THE AUTHORITY — THE ROW LEVEL.** **The wiring NEVER writes tier 1 from the mirror and NEVER lets
   the mirror override the tab list.** The mirror's write-through is a WORKING COPY write; the tab list's values (its entries,
   their order per `file.tabs.order`, the active tab per `file.tabs.<tabId>.active`) are the authority for anything the answer
   or a subsequent write-through computes. **A store-side write to `mem.focus.*` that contradicts the tab list never wins a
   read that can see the tab list.**
3. **THE DIVERGENCE AND THE DECLARED RECONCILE (`[DERIVE]`; inputs `§1.7` items 1/2/4/5, `R3-1`/`R3-2`, `Q-9`).** **DIVERGENCE
   = a state in which the mirror's entry set or seat disagrees with the tab list's declared projection** (an entry the tab list
   does not carry, a seat the tab list does not mark active, an order the tab list does not project, or a closed tab still
   readable). **ON DIVERGENCE THE TAB LIST WINS, AND THE RECONCILE IS DECLARED:** the answer and the subsequent write-through are
   computed FROM THE TAB LIST'S VALUES, and the mirror is RE-PROJECTED from the tab list (the mirror's entry set and seat are
   re-seeded to the tab list's projection in the same committed write) — never the reverse, and never a mirror-side guess. **THE
   FALSIFIER, SO THE RULE IS NOT PROSE: a fixture that (i) writes a mirror value the tab list does not project and reads an
   answer computed from the mirror, or (ii) closes a tab and reads the mirror still carrying it, FAILS.** **The declared
   reconcile is EXECUTABLE where the slice's record exists** — on today's tree the tab list is a PLAN reference no unit has
   landed, so the driveable half is the DECLARATION's mirror-side rows (`§3.1` `M-4`, `§3.2` `F-5`): the mirror never
   self-authorises, and the wiring never writes tier 1. **The slice record's landing is the deferred units' (their owner,
   `§7a.1` item 2); this unit declares the rule their landing will execute.** **⟶ 2026-10-03 THE GATE-4 AUDIT'S FINDING A —
   THE RE-SEED IS DECLARED-DEFERRED; THE AS-FILED DRIVEN READING IS NARROWED BESIDE, NEVER REWRITTEN (`RCA-8(d)`; the
   supervisor's ruling, per this spec's own `§5.5.2` item 3 "the driveable half today" reading — the words above are KEPT
   VISIBLE and this paragraph is the OPERATIVE reading). THE RE-PROJECTION'S TWO HALVES, SPLIT: (1) THE DIVERGENCE
   **DETECTION** + THE DECLARED RECONCILE **READING** — the answer and the subsequent write-through computed FROM THE TAB
   LIST'S VALUES, the mirror's value honestly read and NEVER self-authorised, the wiring NEVER writing tier 1 — **THIS HALF
   IS DRIVEN AND LANDED HERE** (`§3.1` `M-4`'s executed arm, `§3.2` `F-5`, `§5.5.1` `P-SF-TP-2`'s drive-5 cell, the red set's
   `S22-5b`; the landed projection path answers from the projection and writes NOTHING — `renderer.ts`'s `projectionAnswerOf`
   doc, *"written to NOTHING"*, `[READ]` this pass). (2) THE RE-SEED **WRITE** — the mirror's entry set and seat re-seeded to
   the tab list's projection IN ONE COMMITTED WRITE — **IS DECLARED-DEFERRED: it lands WITH the slice's projection source
   (tier 1's projection authority — the deferred units' `file.tabs.*` record + projection landing, `§7a.1` items 2/7) and is
   NEVER executed or asserted by THIS unit. ITS REVISIT CONDITION, NAMED: when the slice's projection source lands, the re-seed
   WRITE becomes executable and MUST be driven by a register row of THAT landing unit's own register, reported under that
   unit's gate (`§7a.1` item 7). A PASS THAT READS OR REPORTS THE RE-SEED WRITE AS LANDED BY THIS UNIT — including a pass
   citing the as-filed "re-projected (re-seeded) … in one committed write" sentence as H1's landed behaviour — IS A REVIEW
   FINDING. AND, AS THE AUDIT RECORDED: the red set's `S22-3` commit-census (an EXACT two-reference census) would REDDEN the
   moment a re-seed write lands — the census matches only while the projection path writes NOTHING, so it is a
   nothing-write detector, never the re-seed's landing evidence; the re-seed's real drive is the slice unit's own register.**
4. **`RH-4` IS ANSWERED BY THE SLICE, NOT BY A CAP — DECLARED.** **NO declared cap is added to `mem.focus.entries`** (`Q-9`
   SUPERSEDED; `§7.1`'s amended block: the as-filed tier-2-cap answer is WITHDRAWN AS THE ANSWER). The mirror's growth is
   bounded BY CONSTRUCTION by the tab list's first-class removal path (`§1.7` items 4/5 — removal is the close verb, a PERSISTED
   removal, and the landing reference keeps the set non-empty) — a property this unit DECLARES (`[DECL]`) and the slice's
   landing makes executable. **This unit's own row: the mirror's entry set is the tab list's projectable set; the route writes
   through the caller's entries and NEVER accumulates a set the authority does not project** (`§3.3` `I-5`).
5. **THE ONE-SPELLING RULE (CARRIED).** `mem.focus.*` and `file.tabs.*` are DIFFERENT-SPELLED copies of related state — the
   working copy vs the authority — so `B-1`'s logical-path clear does NOT reach across them (`§6.5` round-2 clause (b): *"the
   working copy's logical path must either BE the tab list's own path or the authority must be declared explicitly"*). **THE
   AUTHORITY IS DECLARED EXPLICITLY (item 1), which is the clause's alternative — and the declared reconcile (item 3) is the
   cross-path rule.** A pass that re-derives the working copy as its own authority FAILS this item.

### 2.3 The re-home — the carrier surface, the boot construction, the turns

1. **THE CARRIER — THE ONE EXPORTED SEAM SURFACE OF THIS UNIT (`[DECL]`; the `createPaneDrag(store, source)` precedent's
   form).** The renderer's focus region exports **`createFocusCarrier(store)`** — the factory the boot sequence calls with the
   wired store — returning the bounded surface
   **`FocusCarrierSurface`** with exactly FOUR members: **`state()`** (the mirror-state read: `readonly { entries: unknown;
   activeId: unknown }` — the `FocusState` members, `unknown`-typed at the seam), **`focusRoute(payload)`** (the re-homed route,
   the same answer shape the current `focusRoute` answers — `FocusAnswer`), **`persistTarget(state)`** (the STORE-BACKED SEAM
   implementation itself, per `§2.1` item 4's target rule), and **`dispose()`** (the release, `§2.4`). **The factory's `store`
   argument is REQUIRED and is the SOLE store-access path** — the store handle is a WIRING-HELD ARGUMENT passed into the
   carrier's closures, never a module-scope binding of the focus state (`pane-drag-compliance.md`'s `§3.4 R-2` discipline;
   `§5.5.1` `P-SF-IM-2`). **The internal plumbing between `handleRequest`'s `case 'focus'` and the carrier is the unit's
   bounded wiring choice (the carrier is boot-constructed from `getWiredGraphStore()` and reaches the switch through the
   request path, exactly as `runtime` does)** — pinned as an OBSERVABLE: the case's answer is the carrier's answer, and no
   module-level binding holds the focus state.
2. **THE BOOT CONSTRUCTION AND THE BOOT MINT (`[DERIVE]`; the `pane-drag-compliance.md` §7a.1-item-4 reading).** At boot,
   after the store's single construction (`getWiredGraphStore()`), the wiring constructs the carrier and MINT-DECLARES its root:
   **`commit('mem.focus', undefined)` + `clear('mem.focus')`** — the register's row pre-exists the first write, and a cold read
   answers the DECLARED MISS, never a refusal (`§0A` note 6). **The carrier's subscription registrations (`§2.4`) happen at the
   same construction point.** The whole boot step is TOTAL: a hostile store absorbs every step and the carrier still constructs
   (`§2.3` item 6).
3. **THE READ TURN — the mirror-state read (`[DERIVE]`; the `pane-drag` `tierRead` form).** `state()` and the route's answer
   assembly read **`resolve('mem.focus.entries')`** and **`resolve('mem.focus.activeId')`** (the tier-qualified resolver route,
   primary), with the tier-handle form (`store.tiers['mem'].get('focus.entries')` etc.) as the admissible fallback; a MISS
   answers the DECLARED EMPTY member (`§2.1` item 6); a hostile/throwing surface answers the same declared degradation and
   never throws out of the turn (`§2.3` item 6). **The answer assembly is UNCHANGED IN SHAPE: `carriedEntryIds` echoes the
   entry ids through the module's own `focusOrder` (no sort, no dedupe, no re-key — `focus-tool.md` §2.3 item 3), `refused`
   becomes an own key exactly when the refusal record carries a reason, and NO MEMBER EVER EMITS AS `undefined`** (the
   `§0A-note-8` defect-3 rule of `focus-tool.md`, carried verbatim).
4. **THE WRITE-THROUGH TURN — the seam-target's exercise (`[DERIVE]`; from `§2.1` item 4 + the current `answerForHolder`'s
   accepted branch).** On an ACCEPTED transition whose `changed` is `true`, the route calls the module's own
   **`persist(seamTarget, nextState)`** with the carrier's store-backed seam — the seam **commits `mem.focus.entries` =
   `nextState.entries` AND `mem.focus.activeId` = `nextState.activeId` (tier `mem`, `{onRepeat:'edit'}`), exercising the
   seam-target rule exactly; the `persist` return (`{present, value}`) is consumed as the module's declared return and the
   receipt is the store's declared return (`GraphWriteReceipt`)**. **On a REFUSED transition and on an ACCEPTED NO-OP
   (`changed:false`, whose `nextState` is the prior state BY IDENTITY), the route writes NOTHING** — *"changes nothing"* is the
   endpoint contract's claim about the focus state (`focus-tool.md` §2.1 item 9), and the mirror already holds the equal values
   (`§0A`-note's equal-value reasoning: committing equal values would fire events the contract does not owe). **Each accepted
   and changed transition ⇒ EXACTLY ONE `commit` per reference — the single committed write the register's `P-SF-SM-1` counts.**
5. **THE ROUTE'S TOTALITY.** `focusRoute(payload)` is TOTAL for EVERY payload: `resolveForHolder`'s current shape is unchanged
   (no `target` ⇒ `standingAnswer()`; `newTab: true` ⇒ `open`, else `activate`; the caller's own string is the legal entry id;
   no id is minted, no verb is chosen beyond the caller's flag, no refusal is derived) — the ONLY change is the state source
   (the mirror) and the write-through turn (item 4). **A refusal is never a throw** (`F-3`); the declared-empty mirror state is
   a valid base for every verb (an `activate` on the empty mirror refuses `'unknown-id'` exactly as on the empty holder today).
6. **THE HOSTILE-STORE DEGRADATION (`[DERIVE]`; `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN`, `§3.2` `F-8`'s form).**
   An ABSENT store-member argument (the factory's declared construction refusal, `§2.1` item 5(a)), a hostile store, and a
   throwing tier-handle/`resolve`/`commit`/`subscribe` surface **all land the DECLARED degradation and never let a throw escape
   a wiring turn**: `state()` answers the declared-empty pair; the write-through answers a declared no-write (`{present:false}`);
   the subscription refuses to register (registered NOTHING); the boot mint is a no-op; and `dispose()` still returns normally.
   The `[T]` harness drives both shapes (the recording double AND the real `createGraphStore`), the H2a `§2.1`-item-4 form.

### 2.4 THE SUBSCRIPTION — rule 2's shape, the registration, the release (the H2a pattern)

1. **THE OBSERVATION IS A STORE SUBSCRIPTION (`[RULING]`; the §Q rule-2 ✗ flip + the queue row: "consumers observe focus via a
   store subscription/snapshot").** The wiring registers its consumer channel ON THE STORE — `store.subscribe(name, listener)`
   — with the EXACT-REFERENCE forms on the mirror's two fixed references: **`mem.focus.entries`** and **`mem.focus.activeId`**
   (the exact-reference form is NEVER capped — `store-core-graph.md` §2.4's `RCAP-3` — and the two reference spellings are fully
   tier-qualified, satisfying the LANDED fan-out cell `origin.startsWith(subscriber.name + '.')` the way `pane-drag-compliance.md`
   §2.3's annotation requires: an exact subscription on `'mem.focus.entries'` receives the commit whose event `name` is the
   caller's own spelling `'mem.focus.entries'`). **The count is EXACTLY TWO subscriptions while alive, `0` after
   `dispose()`**, and **the count after `N` graph re-derivations stays `2`** (the per-realm-per-reference rule, §2.10 item 4).
   **The tier-qualified prefix form (`'mem.focus'` with `{subtree:true}`) is the admissible alternative; the spec's rows assert
   the OBSERVABLE DELTA (the event arrives with the declared arm; the delivery record counts it) and never the internal
   bookkeeping name** (the pane-drag §2.3-item-2 discipline).
2. **THE LISTENER BODY — the wiring's consumer channel, READ-ONLY (`[DERIVE]`; the H2a `§2.4` listener discipline).** The
   listener is the wiring's own closure: it forwards the event to the wiring's DECLARED CONSUMER CHANNEL (the seam a future
   consumer — the fork's strip — plugs into; **in-tree, no consumer exists today — the strip is the fork's/deferred — so the
   channel is a declared, test-driven recorder: the `[T]` harness attaches a delivery recorder and asserts the delta**). The
   listener body **never writes the store from inside the listener** (the write-loop proof: the route's own write fires the
   subscription; the listener's body reads or forwards — never writes — so each transition yields at most the declared two
   events and the fan-out terminates after the one re-invocation). A throwing listener body cannot propagate (the store catches
   it — §2.10 item 4).
3. **THE RELEASE — UNSUBSCRIBE-ON-DISPOSE, THE H2A PATTERN (`[SPEC]`; `store-modules-bytes.md` §2.2).** The carrier's
   **`dispose()`** releases **every subscription the wiring registered** — each held `GraphSubscription`'s `unsubscribe()` is
   called EXACTLY ONCE (registration order), the first call answers `true`, every later call answers `false` — **never the
   store's `sever` path** (the H2a decision's four-part reason applies verbatim: `sever` has no subject for the wiring's own
   `mem.*` references, the store's own declared release surface IS `unsubscribe()`, the observable the contract must prove is
   the `unsubscribe()` return shape, and unsubscribe-on-dispose touches NO store member). The release **emits NO store event**
   (no `'severed'`, no `'clear'`, no `'set'` attributable to the `dispose()` call — the `'severed'` arm is the SEVERANCE's own,
   §2.10 item 3), **leaves the mirror's records in place** (disposal releases subscriptions, not records), and is **idempotent
   and non-throwing** (a second and every later `dispose()` is a no-op).
4. **THE POST-CONDITIONS, ENUMERATED (each a row a TestWriter can FAIL — the H2a `P1`…`P7` set, adapted):**

   | # | Post-condition | Row |
   | --- | --- | --- |
   | **P1** | Every subscription the wiring registered is released: each handle's `unsubscribe()` is called EXACTLY ONCE, each first call answers `true`, later calls `false`, never a throw (`store-core-graph.md` §2.10 item 4) | `F-2`, `F-3` |
   | **P2** | NO further delivery to a disposed carrier: a post-dispose write to either released name delivers NOTHING to the wiring's listener (the delivery-recorder counter stays at its pre-write value) | `F-2`, `M-5` |
   | **P3** | Idempotence: a second (and every later) `dispose()` is a no-op — no handle is called again | `M-5`, `F-3` |
   | **P4** | A delivery in flight during `dispose()` COMPLETES (the store's fan-out is synchronous in registration order, §2.10 items 4/5); from the moment `dispose()` begins NO FURTHER delivery is dispatched to the wiring's listener | `M-5` |
   | **P5** | NO store event is emitted by the release itself — `events: 0` attributable to `dispose()` | `F-4` |
   | **P6** | The records REMAIN: `dispose()` deletes/clears/re-mints NOTHING on `mem.focus.*` | `M-5`, `P-SF-SM-2` |
   | **P7** | NO SECOND RELEASE AUTHORITY and NO SECOND SUBSCRIPTION AUTHORITY: `dispose()` releases EXACTLY the wiring's registrations, and nothing else registers on the mirror's references (the per-reference count is EXACTLY the wiring's own) | `F-3`, `M-6` |

   **THE LEAK FAIL-STATE AND ITS DETECTION — `SF-LEAK` = a registration the wiring made that `dispose()` did not release.
   Detection is THREE-ARMED (H2a's form): (a) DELIVERY AFTER DISPOSE — a post-dispose write with any delivery to the wiring's
   listener FAILS (`F-2`); (b) THE HANDLE'S RETURN SHAPE — the held handles' first `unsubscribe()` must answer `true` and the
   active set must read EMPTY after dispose (`F-3`); (c) THE EVENT NEGATIVE — `dispose()` adds `0` to the store's event census
   (`F-4`).** The only way a leak survives all three is a registration made outside the carrier's closure-held handle set —
   which the registration discipline (item 1: the two handles live in the factory's closure) forbids by construction, and the
   no-module-level-binding row (`P-SF-IM-2`) scans for.

### 2.5 The tool's route and the reply-shape determination

1. **THE ROUTE IS UNCHANGED IN ITS ARCHITECTURE (`[SPEC]`; `focus-tool.md` §2.1 item 3, `§2.5` items 1/4/5).** `provident.focus`
   → the `RpcMethod` member `'focus'` → the renderer's method switch's `case 'focus'` → the carrier's `focusRoute(payload)` →
   the answer verbatim. **The main-side handler is NOT touched; the preload is NOT touched; `MUTATING_METHODS` stays at its
   seven members with `'focus'` ABSENT** (the notify predicate stays keyed on the set — a later `MUTATING_METHODS` addition is
   a CONTRACT VIOLATION per the §3.8-item-4 clause; the re-home adds no push and no re-render); **the not-ready rejection and
   the validation throw classes are UNCHANGED** (`focus-tool.md` §2.1 item 8).
2. **THE ANSWER IS ASSEMBLED FROM THE STORE-CARRIED VALUE (`[RULING]`; the queue row: "the `provident.focus` tool's route reads
   the store-carried value, never a module variable").** The answer's `entries`/`activeId`/`opened`/`refused` members are
   computed from the mirror read (`§2.3` item 3) and the transition's result — **NEVER from a module-level variable and NEVER
   from a second carrier** (a residual holder, a memo or a cached answer FAILS `F-6`). **Whether the answer is a READ of the
   mirror or a SNAPSHOT VIA THE SUBSCRIPTION is the wiring's recorded choice: the route READS the mirror (the `resolve` turn) —
   the subscription is the CONSUMER channel (rule 2), not the route's data source** (a route that polls the subscription
   handle would conflate the two surfaces — `F-6`'s second arm).
3. **THE REPLY-SHAPE DETERMINATION — DECLARED BEHAVIOUR-PRESERVING (`[DECL]`; the queue row's "a BREAK if so").** **THE TOOL'S
   NORMATIVE REPLY — `{ activeId: string | null, entries: string[], opened: boolean, refused?: { reason: string } }`
   (`mcp-endpoint.md` §3.8 item 2; `focus-tool.md` §2.1 item 5) — DOES NOT CHANGE.** The members' VALUES are the same values
   the holder carried (the write-through keeps the mirror equal to the holder's state at every turn, `§2.3` item 4), the
   answer's untyped seam carries them BY IDENTITY (`focus-tool.md` §2.3 item 3), and the refusal path still ships
   `{refused: {reason}}` with NO FIFTH MEMBER. **THE RE-HOME IS THEREFORE NOT A FORK-FACING COMPATIBILITY BREAK: NO ARCHITECT
   RULING IS OWED FOR THE REPLY SHAPE, and the queue row's BREAK clause is NOT triggered.** The determination is recorded as
   an answered entry-condition question (`§0A` note 1).
4. **THE FORK-FACING CARRY (not a consent item): the OBSERVATION channel re-routes under `H-r6`.** The §Q cell records that the
   UI "observes [the focus change] through the tool's own wiring, not a store subscription" — TODAY the fork's UI reads the
   tool's answer. **AFTER the re-home, the fork's focus-state observers must observe via a STORE SUBSCRIPTION on
   `mem.focus.entries`/`mem.focus.activeId` (rule 2's shape) — the fork's own pass under `H-r6` (this repo writes no file under
   `<Astrographer>/`)**. The tool's REPLY is unchanged (item 3), so no fork consent is needed for the surface the fork consumes
   through the tool; the observation-channel change is the compliance fix's own mandate, recorded with its owner (`§7a.1` item
   3). The in-tree subscriber (`§2.4`) is the foundation-side half of that channel.
5. **THE TOOL'S OWN NEGATIVE CLAIMS STAY, NARROWED TO THE TOOL'S OWN BYTES (`[SPEC]`; `focus-tool.md` §2.4 rows 1–4, §2.1 item
   7, §5.5.1 `RF-3`/`RF-4`).** The TOOL (the main-side handler + its registered surface) still persists nothing, imports no
   storage module, reads no store and holds nothing between calls — the RE-HOME moves the WIRING's carrier, not the tool's
   surface. **The wiring half of the "any store" denial — the cells whose static scans cover `renderer.ts`'s focus region —
   is narrowed by this unit's landing (annotated-beside, `§5.1` row 5): the routed answer is store-carried, which is the
   compliance criterion's OWN mandated shape (`§0A` note 4).** A static scan that still forbids a store read in the ROUTE's
   bytes after this unit lands is a stale scan and is the landing pass's amendment target, never a reason to leave the §Q flip
   un-landed.

### 2.6 The prohibitions — every prohibition cites an ENUMERATED static row (`§3.4`)

| # | Prohibition | Pinned by |
| --- | --- | --- |
| **1** | **THE MODULE'S BYTES ARE UNMOVED** — `src/shared/focus-model.ts` keeps its 0-import census and its `4 + 5 = 9`-name export census; no `focus-model` register re-grain is owed (the refusal union stays the module's, function-internal, `§1.7` item 9) | `§3.4 R-1`; `§5.5.1 P-SF-IM-1` |
| **2** | **THE STORE IS FROZEN** — no store byte, no store member, no refusal token, no event arm, no release trigger is added or moved by this unit (`store-core-graph.md`'s contract and the frozen-surface artifacts govern) | `§3.4 R-2`; `§5.1` row 6 |
| **3** | **`renderer.ts`'s edit is BOUNDED to the focus region** — the holder's removal, the carrier factory + the boot construction/pass-through, the store-backed seam target, the two subscriptions, and the switch case's routing — and NOTHING else (no UI content, no DOM authoring, no other wiring region, no MCP surface) | `§3.4 R-3`; `§5.1` row 1 |
| **4** | **NO SECOND SUBSCRIPTION AUTHORITY** — the wiring's two registrations are the ONLY subscriptions on the mirror's references; a second party registering on `mem.focus.*` FAILS the per-reference count | `§3.4 R-4`; `§2.4` item 1, `P7` |
| **5** | **THE STORE IS NEVER THE AUTHORITY OVER TIER 1** — the mirror never writes the tab list; on divergence the tab list wins and the reconcile is declared (`§2.2`) | `§3.4 R-5`; `§2.2` items 2/3 |
| **6** | **NO CAP ROW ON THE MIRROR** — `Q-9` SUPERSEDED; `RH-4` is answered by the slice's tab list + removal path, not by a numeric cap; a capped mirror re-literalises a withdrawn answer and OWES A GATE | `§3.4 R-6`; `§2.2` item 4 |

---

## 3. Behaviour (every state / fail-state)

### 3.1 Valid / happy states

| # | The state | The declared behaviour |
| --- | --- | --- |
| **M-1** | COLD (the boot mint done, nothing written) | `state()` answers the DECLARED EMPTY pair (`[]`/`null`); a `focusRoute` with no target answers `{activeId:null, entries:[], opened:false}`; an `activate` on the empty mirror refuses `'unknown-id'` — exactly the empty-holder behaviour today | `§2.1` item 6, `§2.3` items 3/5 |
| **M-2** | ONE ACCEPTED, CHANGED TRANSITION (`newTab:true` on a fresh target) | the mirror reads the fresh state (`entries` carries the caller's own entry object by identity; `activeId` is the caller's string); the answer echoes them by identity; EXACTLY ONE `commit` per reference fired `cause:'commit'`; the persisted record reads `{present:true, value:<receipt>}` | `§2.3` item 4, `§5.5.1 P-SF-SM-1` |
| **M-3** | ACTIVATE on an owned id (`changed:true`) | the seat changes, the entries array is UNTOUCHED (same reference — the module returns the caller's array unchanged); only `mem.focus.activeId`'s commit changes substance; both commits still fire (the transition changed) | `§2.3` item 4, `§3.3 I-4` |
| **M-4** | A DIVERGENT MIRROR against a fixture-supplied tab-list projection | the answer and the subsequent write-through compute FROM THE TAB LIST; the mirror is re-projected (re-seeded) from the tab list in one committed write — never the reverse **⟶ 2026-10-03 THE GATE-4 AUDIT'S FINDING A — THIS ROW'S EXECUTED ARM IS THE DECLARED READING, NOT THE RE-SEED COMMIT (`RCA-8(d)` ANNOTATE-BESIDE; the as-filed cell above is KEPT VISIBLE and this clause is the OPERATIVE reading): THE EXECUTED ARM OF `M-4` IS THE DIVERGENCE DETECTION + THE DECLARED RECONCILE READING — the answer and the subsequent write-through compute FROM THE TAB LIST'S VALUES, the mirror's value honestly computed and NEVER self-authorised, the wiring never writing tier 1. THE RE-SEED WRITE HALF (the mirror re-projected "in one committed write") IS DECLARED-DEFERRED and is NEVER asserted by this row — it lands with the slice's projection source (`§2.2` item 3's dated annotation; `§7a.1` item 7); a pass that reports the re-seed WRITE as this row's landed reading — or asserts the one-committed-write census as this row's executed behaviour — is a finding.** | `§2.2` item 3, `§3.2 F-5` |
| **M-5** | POST-DISPOSE | every handle's `unsubscribe()` answered `true` once then `false`; a write to either released name delivers NOTHING; a second `dispose()` is a no-op; the mirror's records REMAIN readable (`resolve` still answers HIT) | `§2.4` items 3/4 |
| **M-6** | THE REAL-STORE DRIVE (the wired `createGraphStore`, this unit's composition rows) | every turn's receipt is the store's settled `GraphWriteReceipt`; the events count matches the store's own delivery record; the subscription count on the two references reads exactly `2` while alive — the "wired-store integration" reading of the register (`§5.5.1`) | `§2.4`, `§5.2` leg 6 |

### 3.2 Documented fail-states / non-happy states

| # | The fail-state | The declared outcome |
| --- | --- | --- |
| **F-1** | A REFUSED transition (duplicate-id / unknown-id / no-next / no-previous / unknown-verb) | `{refused:{reason}}` in the answer; the mirror writes NOTHING (the state is unchanged — *"changes nothing"*); the persisted record for the turn is the DECLARED not-called `{present:false, value:undefined}` (the module's own semantics, `focus-model.md` §2.4); **NO member emits as `undefined`** | `§2.3` items 4/5, `§2.5` item 3 |
| **F-2** | **`SF-LEAK` — DELIVERY AFTER DISPOSE** | a post-dispose write to a released name with ANY delivery to the wiring's listener FAILS (the delivery-recorder counter must stay at its pre-write value) | `§2.4` item 4 `P2` |
| **F-3** | **`SF-LEAK` — THE HANDLE'S RETURN SHAPE / NO SECOND RELEASE AUTHORITY** | a held handle whose first `unsubscribe()` answers `false`, or an active set non-empty after dispose, FAILS; a release of a subscription another party registered FAILS | `§2.4` item 4 `P1`/`P7` |
| **F-4** | **`SF-LEAK` — THE EVENT NEGATIVE** | a `'severed'`/`'clear'`/`'set'` event attributable to the `dispose()` call FAILS (`events: 0` attributable) | `§2.4` item 4 `P5` |
| **F-5** | A MIRROR THAT SELF-AUTHORISES (a fixture writes `mem.focus.*` a value the tab list does not project, then reads an answer computed from the mirror) | FAILS the divergence rule — the tab list wins and the declared reconcile re-projects the mirror; the mirror's value is NEVER the answer's authority **⟶ 2026-10-03 (FINDING A'S LANDING, `RCA-8(d)` ANNOTATE-BESIDE — the as-filed cell above is KEPT VISIBLE and this clause is the OPERATIVE reading): this row's EXECUTED arm is the mirror-never-self-authorises reading (the answer computed from the tab list, the wiring never writing tier 1); the "re-projects the mirror" half is the DECLARED reading, executed by the slice's projection-source landing (`§2.2` item 3's dated annotation; `§7a.1` item 7), never asserted by this unit.** | `§2.2` item 3 |
| **F-6** | A SECOND CARRIER (a residual module-level holder of the focus state, a memo of the last answer, or a route that consumes the SUBSCRIPTION as its data source) | FAILS the re-home's carrier rule — the answer must come from the mirror read; a second carrier is the §Q rule-1 ✗ shape resurrected | `§2.3` item 1, `§2.5` item 2, `§5.5.1 P-SF-IM-2` |

### 3.3 Invariants that hold in every state

| # | Invariant |
| --- | --- |
| **I-1** | **The mirror equals the holder's state at every turn.** For every sequence of route calls, the mirror's canonical projection (entries ids in order + the seat) equals the state the pre-re-home holder would have carried (`P-SF-TP-1`'s drive is the instrument). |
| **I-2** | **The module's answer is a function of its arguments alone.** `focusTransition`/`focusOrder`/`focusIndex`/`persist` consult no ambient value and no store value — the differential (`P-SF-TP-1`) proves the two runs' canonical identity. |
| **I-3** | **No throw escapes a wiring turn.** Every turn of the carrier is TOTAL — hostile store, hostile tier handle, throwing seam, throwing listener — the declared degradation answers, never a throw (`§3.2 F-6`'s opposite). |
| **I-4** | **The caller's own entry objects and order are preserved by identity.** The mirror stores what the caller wrote; `focusOrder` echoes them by identity; nothing sorts, dedupes, re-keys or copies (`focus-tool.md` §2.3 item 3; `focus-model.md` §2.3 item 3 — UNCHANGED). |
| **I-5** | **The mirror never grows beyond the projectable set.** The route writes through the caller's entries and the mirror never accumulates an entry the authority does not project (the bounded-by-construction declaration, `§2.2` item 4; executable when the slice record lands). |
| **I-6** | **`'focus'` stays absent from `MUTATING_METHODS`** and the notify predicate stays keyed on the seven-member set — the re-home adds no push, no re-render and no graph write (`focus-tool.md` §2.4 row 2; the route's graph-invisibility claim UNCHANGED). |

### 3.4 The STATIC rows — the rows `§2.6`'s prohibition table cites, ENUMERATED

| # | The row | The probe |
| --- | --- | --- |
| **R-1** | THE MODULE CENSUS UNCHANGED | `src/shared/focus-model.ts`'s raw bytes carry ZERO import statements and the `4 + 5 = 9`-name export census; the positive control: a fixture importing the store into the module-position FAILS (the scanner pattern of `container.md` §3.4 `R-1` / `zones.md` §3.4 `R-3`) |
| **R-2** | THE STORE BYTES UNTOUCHED | `src/renderer/store-core-graph.ts` + `store-graph-references.ts` are NOT in this unit's diff scope; their census/digest cells in the frozen artifacts' field 8 stay as frozen (`§5.1` row 6) |
| **R-3** | THE FOCUS-REGION BOUND | `src/renderer/renderer.ts`'s delta is the focus region ONLY — the holder's removal, the carrier, the turns, the subscriptions — and NO other region (the wiring-role discipline: no UI content, no DOM authoring — `AGENTS.md`'s provident-authoring constraint and `focus-tool.md` §2.5 item 3's denied set, CARRIED; a diff widening to another wiring region FAILS) |
| **R-4** | NO SECOND SUBSCRIPTION AUTHORITY | the store's subscription counts on `mem.focus.entries`/`mem.focus.activeId` read exactly `2` while the carrier is alive (the wiring's own registrations), and `0` after dispose — a second party's registration FAILS the count |
| **R-5** | THE MIRROR NEVER WRITES TIER 1 | no byte of the focus region writes a `file.tabs.*` name or any tier-1 spelling; the divergence path's re-projection writes the MIRROR only (`§2.2` item 2) |
| **R-6** | NO CAP ON THE MIRROR | no declared cap, no overflow limit and no eviction policy appears in the focus region's contract or bytes; a cap row is an OWES-A-GATE reversal (`§2.6` prohibition 6) |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| # | The claim | The probe |
| --- | --- | --- |
| **X-1** | THE CURRENT CARRIER IS THE MODULE-LEVEL `holder` | `src/renderer/renderer.ts`'s focus region carries `const holder: { state: FocusState }` (the §Q cell's own cited site) at RED time — the fixture the red set drives first; AT GREEN the symbol is GONE (`F-6`'s positive state) |
| **X-2** | THE MODULE IS IMPORTED BY THE WIRING (the F2 composition answer) | `renderer.ts` imports `focusTransition`/`focusOrder`/`FocusEntry`/`FocusState` from `../shared/focus-model.js` — the module's OWN import census is `0` (R-1) and unchanged |
| **X-3** | THE TOOL'S REPLY IS THE §3.8 SHAPE | the `FocusAnswer` seam's members match the normative `{activeId, entries, opened, refused?}` — verified by name at red time; the re-home adds no fifth member (`§2.5`) |
| **X-4** | THE STORE'S LEGACY SUITE IS THE DOCUMENTED T9-CLASS RED RESIDUE | `tests/store-core-graph.test.ts` is byte-unchanged T9-class evidence (H4's disposition): OWED a re-author under the re-frozen artifact with the architect's ruling as its entry condition — NOT this unit's act, and this unit's trio legs report it as the store's own residue, never as this unit's failure (`§7` item 1) |
| **X-5** | NO PAGE, NO ELEMENT, NO `§5.U` ROW IS OWED BY THIS UNIT | the unit authors no element, no envelope node, no handler body and no control; the slice's two authored pages are the slice's own (`§0` ruling 16); `docs/skills/designing-pages.md` does not exist (`CURRENT STATE` item 8) |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**A TestWriter authors `tests/store-focus.test.ts` FROM THIS SPEC ALONE (plus the frozen store artifacts, `§5.2` leg 5) and RUNS
it RED — against the CURRENT tree, where the carrier does not exist, the holder still exists and `mem.focus.*` is
unminted — BEFORE any implementation.** The red set MUST include, at minimum, one row per cell of `§2.1`–`§2.5`, one row per
`§3.1`/`§3.2`/`§3.3` row, one row per `§3.4` static, one row per `§3.5` probe, and the six register rows' UN-RUN state reported
as FAILURES (`§5.5.1`'s execution discipline). The expected failing class: the carrier factory does not exist (a `TS2307`-class
missing-symbol red on the import line of the test file), the holder still exists (X-1's red-time branch), and `mem.focus.*`
reads/writes have no subject.

### 4.2 Red-set authoring order

**(1)** the §Q-facing carrier rows first (the mirror read, the write-through, the subscription) — the compliance cell's own
order; **(2)** the answer-shape rows (behaviour-preserving); **(3)** the authority/divergence rows; **(4)** the release rows
(H2a); **(5)** the statics and the existence rows; **(6)** the register (its six rows' declared attempt counts, per `§5.5.1`).

### 4.3 What the red is NOT

**The red is NOT a re-litigation of `F2`/`F3`**: the module's own rows (`tests/focus-model.test.ts` — 78/78 landed green) and the
tool's own rows (`tests/focus-tool.test.ts`) are UNTOUCHED, and a red set that edits either landed suite is a diff-scope
violation (`§5.1`). **The red is NOT a re-run of the store's legacy suite** (T9-class; `§3.5 X-4`).

### 4.4 The stop conditions (binding)

The register's execution stops after **5 consecutive failures** (`AGENTS.md` item 11(b)); **an un-run register row is reported as a
FAILURE, never as a pass**; the caps are `≤100` per row and `≤400` total against the DECLARED `96` (`§5.5.3`); the red RUN's
failing count MUST be reported to the supervisor BEFORE the Implementer is delegated (`AGENTS.md` item 9, `RCA-1`).

### 4.5 Delegation gate

**The unit is NOT delegable until the TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9). The Implementer runs
after the red is reported, lands the least code that goes green (the bounded focus-region edit ONLY, `§5.1`), re-runs the red→green
set and the trio (`§5.2`), and the adversarial + PBT audit (gate 4) is MANDATORY before the unit is reported done (`AGENTS.md`
item 10; `§3a`/`§3b`).

---

## 5. Wiring

### 5.1 Diff scope (what this unit MAY touch)

| # | Path | Status | The bounded role |
| --- | --- | --- | --- |
| 1 | `src/renderer/renderer.ts` | **ALLOWED — the wiring role, BOUNDED to the focus region** | the `const holder`'s REMOVAL; the exported `createFocusCarrier(store)` + its `FocusCarrierSurface`; the carrier's boot construction from `getWiredGraphStore()` and its pass-through to the request path (like `runtime`); the store-backed seam target (`persistTarget`) and the write-through turn; the two exact-reference subscriptions + the `dispose()` release; the `case 'focus'` body's routing — **and NOTHING else** (no UI content, no DOM authoring, no other wiring region, no MCP surface — `§2.6` prohibition 3; the `MUTATING_METHODS`, `getWiredGraphStore` and `createPaneDrag` regions are UNTOUCHED) |
| 2 | `tests/store-focus.test.ts` | **ALLOWED — NEW** | the unit's whole red/green/register home |
| 3 | `docs/specs/store-focus.md` + `store-focus-greens.md` + the records under `archive/reviews/` | **ALLOWED — NEW** | this filing + the unit's records |
| 4 | `tests/store-core-graph-integration.test.ts` | **CITE-ONLY — never edited by this unit** | the module-external end point (`TENANT-1`); this unit's composition rows live in THIS unit's own new test file |
| 5 | **THE AMENDMENT SET (annotated-beside, `RCA-8(d)` — the LANDING pass's act, each dated, NEVER a rewrite):** `docs/specs/focus-tool.md` (`§2.1` item 6 — the carrier changes from the module-level `const` to the tier-2 reference, per plan `§3.4` row 2.4-1; `§2.5` items 2/5 — the wiring-held authority is the mirror, the tool's own route clause; `§2.4` row 4 + `§5.5.1` `RF-3`/`RF-4` — the "any store" static scans narrowed to the TOOL's own bytes; `§2.1` item 7 — the "NO STORE" negative narrowed to the tool's surface) · `docs/specs/focus-model.md` (`§2.4` seam 3 — the seam's TARGET semantics become store-backed at the caller; no clause weakened, no register re-grain) · `docs/specs/fork-store-reads.md` (`§2.4` non-case 5 — the carrier question answered: the focus path becomes the mandated store-carried read; `P-16` unchanged) | **ALLOWED — the amendment set ONLY (supersession-beside)** | one dated annotation per named cell, each keeping its landed bytes visible (`§0A.3` edges `S-2`/`S-5`/`S-6`/`S-7`) **⟶ 2026-10-03 (THE LANDING PASS — `RCA-8(d)` ANNOTATE-BESIDE; the as-filed set above is KEPT VISIBLE and this note is the OPERATIVE schedule record): THE SET IS LANDED AS THE GATE'S RULING SCHEDULES IT — `focus-tool.md` §2.1 item 6 + §2.5 items 2/5 and `focus-model.md` §2.4 seam 3 are annotated BESIDE IN THIS PASS** (the two halves this pass's ruling names); **the `fork-store-reads.md` §2.4 non-case 5 half is recorded as the TestWriter-pass-amended half per the gate's scheduling** (the pass report flags that the current tree's cell still reads as-filed — verified this pass — and that discrepancy is the supervisor's to reconcile before the DONE row / the §Q flip; THIS pass does not touch `fork-store-reads.md`); **⟶ 2026-10-03 (THE H1 GATE-7+8 DOC-REVIEW — `RCA-8(d)` ANNOTATE-BESIDE; the scheduling record above stays visible and this clause is the RECONCILED reading): THE DELTA RESOLVES TOWARD THE TREE — `docs/specs/fork-store-reads.md` §2.4 non-case 5 NOW CARRIES its dated `2026-10-03` annotation** (the gate-4 repairs commit `b6e7219`, *"H1 GATE-4 REPAIRS LANDED"*, touched the file, +2 lines, its own message naming the non-case-5 carrier-changed annotation as the S-9 test amendment's spec sibling), **verified by a read of that cell THIS pass**; the *"still reads as-filed"* sentence above is SPENT FOR THAT CELL — the scheduling delta the gate-5 set reported (`store-focus-greens.md` §5.1) is closed, and NO supervisor reconciliation is owed on this point at gate 10; **the remaining named cells (`focus-tool.md` §2.4 row 4 + `§5.5.1` `RF-3`/`RF-4` + §2.1 item 7 — the "any store" static-scan-narrowing cells) are NOT landed by this pass and stay scheduled** |
| 6 | **DENIED: `src/renderer/store-core-graph.ts` · `store-graph-references.ts`** | one row | the landed/frozen store surfaces are untouched (`§2.6` prohibition 2) |
| 7 | **DENIED: every `src/shared/**` module** (…`focus-model.ts` INCLUDED) | one row | the module's bytes are UNMOVED; `tests/focus-model.test.ts`/`tests/focus-tool.test.ts` are UNTOUCHED (`§4.3`) |
| 8 | **DENIED: `src/main/**` · the preload/MCP surface · the shell chrome · `scripts/**` · `package.json`/`package-lock.json`/`tsconfig*`/`vitest.config`** | one row | no store surface, no MCP surface, no config key (`§2.6` prohibition 3's MCP half) |
| 9 | **DENIED: `<Astrographer>/**` and every tracker (`docs/next-steps.md` · `docs/pending.md` · `docs/decisions.md` · `docs/defects.md` · `docs/HANDOFF.md`)** | one row | `H-r6` + this pass edits no tracker (`E-4`-form; the §Q flips are gate 10's) |
| 10 | **DENIED: `docs/skills/designing-pages.md`** | one row | does not exist; no coverage matrix and no demo-page index to update (`CURRENT STATE` item 8) |

### 5.2 The legs this unit MUST run

| # | Leg | What it proves | This unit's relation |
| --- | --- | --- | --- |
| 1 | **`npm test` `[T]`** — the node suite | the unit's rows + the whole suite stay green | the unit's home: `tests/store-focus.test.ts` — the carrier, the mirror, the turns, the subscription/release and the register all drivable on the NODE HOST (the recording store double + the REAL `createGraphStore`, `§3.1 M-6`) |
| 2 | **`npm run typecheck` `[H]`** | `src/**` compiles | **`src/**` ONLY — it never reads a test file** (`tsconfig.json`'s include/exclude), so this leg does NOT cover `tests/store-focus.test.ts` |
| 3 | **`npm run typecheck:tests` `[H]`** | the whole `tests/**` tree under the SAME strictness a unit's leg 4 uses | **THE leg that reads THIS unit's test file** (`AGENTS.md` item 4 — a unit citing typecheck as evidence about its OWN test file MUST cite this leg) |
| 4 | **`npm run build` `[H]`** | the five bundles stay green | the wiring's focus-region delta must not break the bundles; `focus-model.ts`'s bundle membership is unchanged (it was and remains wiring-imported) |
| 5 | **A STANDALONE STRICT `tsc --noEmit` over `tests/store-focus.test.ts`** | the type half of the exported carrier surface pins (the `FocusCarrierSurface` members' shapes) | the named leg that makes the surface's type half checkable the way `focus-model.md` §5.2's named leg does |
| 6 | **THE WIRED-STORE INTEGRATION SEAM** — the module-external composition, per `TENANT-1`'s END (`tests/store-core-graph-integration.test.ts`, CITE-ONLY) | the boot wiring shape's settled end states | this unit's real-store rows compose the SAME boot wiring shape; **gate-12 reading: ENVELOPE/INTEGRATION-GREEN**; the store's settled receipts/events asserted module-externally, never from the module's internals |

**`[U]` IS NOT OFFERED, and the three-part refusal form is stated:** **(1) the refusal** — no behaviour of this unit is
declared `[U]`; **(2) the structural reason** — no rendered surface changes (the store-carried state is node-observable; the
rendered strip is the fork's/deferred, and the slice's two authored pages are the slice's own), so the real-DOM leg has no
subject; **(3) the `S-6` sentence** — a later pass may not move a `[T]` row of this unit to the `ui` leg silently. **`[D]` NOT
CLAIMED.** **THE `user-flow-audit.md` `§7.1` PREDICATE IS DETERMINED AS NOT TRIGGERING, RECORDED, AND NO REPORT IS DUE:** limb A
absent (this unit authors no element, no envelope node, no handler body, no component binding and no control) and limb B absent
(no assembled rendered flow changes — the focus flows are store-only and the strip is not in-tree), so the admissible form is NO
report; a zero-row report is INVALID (`§6`).

### 5.3 The DONE row's shape

The DONE row (written by the supervisor at gate 10) fills the twelve-item sibling shape, item by item: **(1)** the unit's
queue/admission state (the `H1` row's `OWED — not filed` spent; the `§Q` `provident.focus` cell flipped to COMPLIANT; the ledger
move — all the supervisor's); **(2)** the surface this unit landed (the `mem.focus.*` mirror, the seam target, the two
subscriptions, the release — `§2.1`–`§2.5`); **(3)** the export/diff census — NO new shared module, NO new store surface, the
wiring-delta file named (`src/renderer/renderer.ts`, bounded to the focus region), the module census verified unchanged
(`§3.5`); **(4)** the red set, RUN and REPORTED with its failing class (a TestWriter red: N failing against the absent carrier);
**(5)** the green set (the rows of `tests/store-focus.test.ts`, all green, with the register's EXECUTED layer); **(6)** the
adversarial pass + PBT audit (`§3a`/`§3b`, gate 4) with each finding dispositioned; **(7)** the blind-greens record
(`docs/specs/store-focus-greens.md`, authored by a blind-test writer from THIS spec + the greens artifact only); **(8)** the
per-unit documentation review (`archive/reviews/<date>-U-STORE-FOCUS-doc-review.md`, `AGENTS.md` item 10d); **(9)** the legs'
green — `npm test` `[T]` · `npm run typecheck` · `npm run typecheck:tests` (leg 3, the only typecheck leg that reads this
unit's test file) · `npm run build` · the standalone strict `tsc` (leg 5) · the wired-store integration seam's reading (leg 6,
ENVELOPE/INTEGRATION-GREEN); **(10)** the register's per-row attempts/held/broken counts and ITS strategy ids (`§5.5.1`'s six);
**(11)** the register arithmetic in the `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` form — the total WITH its terms
(`96 = 10 + 12 + 18 + 16 + 24 + 16`); **(12)** the layer honesty statement of `§6` — `[T]`+integration evidence ONLY, `[U]` NOT
OFFERED with the structural reason, the fork's observation-channel re-route never claimed as landing here (`H-r6`).

---

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**WHY THIS UNIT CARRIES A REGISTER AT ALL — THE ZERO-ROW EXEMPTION IS EXPLICITLY UNAVAILABLE (`AGENTS.md` item 11(g); `§0`
ruling 13): this unit is CODE-BEARING in the wiring (the bounded `src/renderer/renderer.ts` edit), so the typed register MUST
precede its red set.** The register's THREE plan-mandated rows are the §5.2.7 item-(4) folded set — the rows the unit OWES as
`focus-model`'s store-backed obligation — driving the CALLER-side file that gained the store-backed seam target with the module
census verified unchanged; the THREE further rows are the caller-side properties this unit's own contract demands. **NO SEED AND
NO GENERATOR: the register is EXHAUSTIVE ENUMERATION throughout** (every domain is finite and bounded), caps `≤100`/row · `≤400`
total · stop-after-5-consecutive-failures, and NO new dependency (plain deterministic vitest tables + fixed corpus scans).

### 5.5.1 THE REGISTER — `6` typed rows, `2` `P-IM` + `2` `P-SM` + `2` `P-TP`, ALL executed by design

| # | Row (its declared property) | Type | Strategy id | Declared term |
| --- | --- | --- | --- | --- |
| **`P-SF-IM-1`** | **THE MODULE CENSUS VERIFIED UNCHANGED — the import-census row WITH ITS POSITIVE CONTROL** (`§5.2.7` item (4)(a)): `src/shared/focus-model.ts`'s raw bytes carry `0` import statements and the `4 + 5 = 9`-name export census, BY NAME; **the positive control: a fixture that imports the store into the module-position FAILS the row** (the `container.md` §3.4 `R-1` / `zones.md` §3.4 `R-3` scanner pattern) — driving the CALLER-side file that gained the store-backed seam target with the module census verified unchanged | `P-IM` | `S-SF-CENSUS-1` | `10` |
| **`P-SF-IM-2`** | **THE NO-MODULE-LEVEL-BINDING ROW** (`§5.2.7` item (4)(b)): after the re-home, `src/renderer/renderer.ts`'s focus region holds NO module-level focus-state carrier (the `const holder` is GONE) and the store handle stays the WIRING-HELD boot binding (the factory's argument + the closures); **the positive control: a fixture that re-adds a module-level focus-state holder (or a module-scope store handle in the focus region) FAILS** | `P-IM` | `S-SF-STATIC-1` | `12` |
| **`P-SF-SM-1`** | **THE MIRROR WRITE-THROUGH TURNS** — for each declared turn class (accepted+changed · accepted-no-op · refused · no-target): **accepted+changed ⇒ EXACTLY ONE `commit` per reference** (`mem.focus.entries` AND `mem.focus.activeId`), each answering the store's settled `GraphWriteReceipt`, the `persist` return reading `{present:true, value:<receipt>}`; **refused ⇒ ZERO writes** (the mirror byte-identical, the persisted record the declared not-called); **no-op acceptance ⇒ ZERO writes**; no-target ⇒ ZERO writes; the events count matches the store's own delivery record | `P-SM` | `S-SF-TURNS-1` | `18` |
| **`P-SF-SM-2`** | **THE SUBSCRIPTION + RELEASE** — the subscription count reads exactly `2` at construction and stays `2` across `N` graph re-derivations (per-realm-per-reference); `dispose()` releases EVERY registration: each handle's `unsubscribe()` first-call-`true` then-`false`, idempotent second dispose, post-dispose writes deliver NOTHING, the release emits NO store event (`events: 0`), the mirror's records REMAIN (`resolve` still answers HIT), and no second party's registration on the references survives (per-reference count exactly the wiring's own) | `P-SM` | `S-SF-RELEASE-1` | `16` |
| **`P-SF-TP-1`** | **THE TWO-RUN STORE-STATE-INDEPENDENCE DIFFERENTIAL** (`§5.2.7` item (4)(c); `R-3`'s comparator): for FIXED ARGUMENT TUPLES over the module's four value exports, the answers are CANONICAL-STRUCTURALLY IDENTICAL when the tiers are COLD / hold a SHADOWING `temp`/`mem` value / hold a committed `file` value — **the module consults NO store value**; the comparator is the CANONICAL STRUCTURAL COMPARISON for object returns (own enumerable keys, sorted, primitives by value; `===` for primitives; NO deep-equality dependency); **the positive control: the CALLER-side carrier's read of the mirror DOES change with the mirror — the store-sourced state is the WIRING's state, which is the sanctioned dependence** | `P-TP` | `S-SF-DIFF-1` | `24` |
| **`P-SF-TP-2`** | **THE MIRROR READ TOTALITY** — for EVERY store state (cold root · minted-but-unwritten · one reference held · both held · a divergent mirror against a fixture tab-list projection) and EVERY hostile surface (absent store argument refusal · throwing `resolve`·throwing `commit`·throwing `subscribe`·throwing listener), the carrier's turns answer the DECLARED record (the declared-empty pair on a MISS; the declared re-projection on divergence; the declared degradation on hostility) and NO throw escapes a wiring turn **⟶ 2026-10-03 THE GATE-4 AUDIT'S FINDING A — THE DRIVE-5 CELL'S EXECUTED READING IS THE DECLARED READING, NOT THE RE-SEED COMMIT (`RCA-8(d)` ANNOTATE-BESIDE; the as-filed property text above is KEPT VISIBLE and this clause is the OPERATIVE reading): the divergent-mirror drive executes the DECLARED RECONCILE READING — the answer computed from the tab-list projection's values, the mirror never self-authorised, the wiring never writing tier 1 (the driveable half today, `§5.5.2` item 3 / `§2.2` item 3). THE RE-SEED WRITE IS THE DEFERRED HALF: NO drive of this row asserts the mirror re-seeded into one committed write — that write is the slice's projection-source landing's own future register drive (`§7a.1` item 7), and a pass reading this row's `16` terms as a landed re-seed drive over-reads the register. THE ROW'S TYPE, STRATEGY ID AND DECLARED TERM ARE UNCHANGED (`P-TP` · `S-SF-TOTAL-1` · `16`): this is a reading annotation, NOT a re-grain** (`§5.5.3`'s form — the register's terms are untouched). | `P-TP` | `S-SF-TOTAL-1` | `16` |

**THE SIX ROWS = THE PLAN-MANDATED THREE (`P-SF-IM-1` · `P-SF-IM-2` · `P-SF-TP-1`) + THE THREE CALLER-SIDE PROPERTY ROWS
(`P-SF-SM-1` · `P-SF-SM-2` · `P-SF-TP-2`).** The row count is an OUTCOME, not a budget
(`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`): the `≤8` threshold is a component-breakdown SIGNAL and
no discernible property was dropped, merged or left unenumerated to fit it.

### 5.5.2 The register's honesty block — what is NOT proven

1. **A green register row is `[T]` evidence only** — envelope/pure-layer, never APP-green and never OS evidence (`Layer
   declaration` anchor 4). The real-DOM consequence of the focus state (the fork's strip) is NOT this unit's leg and is not
   proven by any row.
2. **The differential proves the module's argument-freedom, not the wiring's.** The carrier's sanctioned store dependence is
   the point of the re-home; the differential's subject is the MODULE (its answer is a function of its arguments), with the
   caller-side dependence asserted as the positive control.
3. **The divergence row drives the DECLARED reconcile against a fixture PROJECTION of the tab list** — the real `file.tabs.*`
   record does not exist until the slice lands; the row proves the mirror never self-authorises and the wiring never writes
   tier 1, which is the driveable half today (`§2.2` item 3). **⟶ 2026-10-03 THE GATE-4 AUDIT'S FINDING A — THE "DRIVEABLE
   HALF TODAY" READING CONFIRMED AND SHARPENED BESIDE (`RCA-8(d)` ANNOTATE-BESIDE; the as-filed item above is KEPT VISIBLE and
   this clause is the OPERATIVE reading): THE EXECUTED HALF IS DISTINGUISHABLE FROM THE DECLARED HALF, AND THE DISTINCTION IS A
   FINDING.** **THE EXECUTED HALF = the divergence DETECTION + the declared reconcile READING** (the answer computed from the
   tab list's values; the mirror never self-authorises; no tier-1 write — `§3.1` `M-4`, `§3.2` `F-5`, `§5.5.1` `P-SF-TP-2`
   drive-5). **THE DECLARED HALF = the re-seed WRITE** (the mirror re-projected into one committed write), DECLARED-DEFERRED to
   the slice's projection-source landing (`§2.2` item 3's dated annotation; `§7a.1` item 7). **A pass, a greens scenario or a
   DONE row that reports the re-seed WRITE as landed by THIS unit — or that reads the as-filed "in one committed write"
   sentence as executed H1 behaviour — is a finding, never a pass** (`§7a.1` item 7's falsifier).
4. **No timing, no size and no memory figure is claimed anywhere in this file** (`RCA-12`).
5. **A register row is not a licence to move the module's or the store's contracts** — every row's subject is this unit's own
   surface; the module's and the store's own registers are UNTOUCHED.

### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLE

**THE DECLARED TOTAL, WITH ITS TERMS: `96 = 10 + 12 + 18 + 16 + 24 + 16`.** **The term-by-term addition: `10 + 12 = 22` ·
`22 + 18 = 40` · `40 + 16 = 56` · `56 + 24 = 80` · `80 + 16 = 96` ✓.** **The caps: the largest row `24` (`P-SF-TP-1`) ≤ `100`
(headroom `76`) · the total `96` ≤ `400` (headroom `304`) ✓.** **Family subtotals: `P-IM` `10 + 12 = 22` · `P-SM`
`18 + 16 = 34` · `P-TP` `24 + 16 = 40` — and `22 + 34 + 40 = 96` ✓.** **A total that is not the sum of its own terms, or a
total quoted without its terms, is a review finding — the EXECUTED layer's totals are reported in the SAME form by the DONE
row (`§5.3` item 11), and a mis-sum is corrected by annotating beside the as-filed form, never by silently rewriting it.**

---

## 6. Falsification / stop conditions

1. **THE `§Q` FLIP IS THE UNIT'S ACCEPTANCE SURFACE.** The unit's landing is what makes the `docs/pending.md` §Q
   `provident.focus` cell's PENDING-REBUILD mark flippable (the supervisor's gate-10 act): **rule 1 now ✓** (the state is
   centrally stored — `mem.focus.*`), **rule 2 now ✓** (consumers observe via a store subscription). A pass that lands the
   carrier without the subscription, or with a second module-level carrier, FAILS the flip's own two rules.
2. **THE MODULE-LEVEL CARRIER IS GONE.** At green, `src/renderer/renderer.ts`'s focus region has NO `const holder` — the
   re-home's first observable (`§3.5 X-1`'s green branch). A residual holder of any spelling is the §Q rule-1 ✗ shape
   resurrected (`F-6`).
3. **THE STORE AND THE MODULE ARE BYTE-STATIC.** The store's frozen-surface digests (`store-core-module-store-core-graph-surface.md`
   field 8) and the module's census stay exactly as frozen/landed — a passing row may not cite a changed store or a changed
   module (`§5.1` rows 1/6/7). **The store's own legacy suite's T9-class red residue is the store's documented disposition
   (`§3.5 X-4`): this unit's trio report names it as the store's own residue and NEVER as this unit's failure, and NO pass of
   this unit may order or perform the legacy suite's re-author (the architect's ruling is its entry condition).**

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **The store's legacy suite is red on the current tree** (`tests/store-core-graph.test.ts`, the T9-class residue, §Q/H4's
   documented disposition). **This unit does NOT fix it, does NOT re-author it, does NOT retire it, and does NOT claim a green
   trio-suite reading while it is red** — the unit's own legs are its own surface + the suite's standing state, reported with
   the store's own scoping sentence (`§6` item 3).
2. **The re-home is behaviour-preserving on the tool's surface (declared, not measured).** NO leg was run by this filing; the
   determination rests on the write-through's value-equality argument (`§2.3` item 4) and the identity-pass-through rule
   (`focus-tool.md` §2.3 item 3) — a green on the red set's answer-shape rows is what executes it.
3. **The fork's observation-channel re-route is NOT landed by this unit** — the fork's own pass under `H-r6`, recorded with its
   owner (`§7a.1` item 3); this unit's in-tree subscriber is the foundation-side half of that channel.
4. **The tab-slice record is NOT landed by this unit** — the authority is DECLARED and the reconcile is DECLARED; their
   execution against a real `file.tabs.*` record is the deferred units' (`§7a.1` item 2).
5. **`provident.list_targets` / `get_rendered_html` / `get_markdown` / `get_node_state` still NEVER observe a focus call's
   effect** (`focus-tool.md` §2.5 item 5) — the re-home moves the state's carrier inside the RENDERER, not into the graph, and
   the tool's graph-invisibility contract is UNCHANGED.
6. **The unit owns no numbered `P-n` policy row and moves no store policy** — `P-16` stays UNQUALIFIED; the carrier answer is
   the compliance criterion's own mandated shape (`§0A` note 4), never a policy amendment.
7. **The answer-shape determination is this filing's declaration, and its execution is the red set's answer-shape rows** — a
   later pass that reads a shape change out of the landing MUST OPEN A GATE (`§0A` note 1(b)).

## 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from without a default

**The queue row and the plan answer the authority and the reply shape; every other clause of this contract is derived above.
The remaining items are CARRIED, and each is a NAMED item with its owner — nothing is `undefined-until-answered`.**

### 7a.1 THE CARRIED ITEMS AND THE ANSWERED DECISIONS — each with its owner/route

| # | The item | Its state / owner / route |
| --- | --- | --- |
| **1** | **THE `unknown-id` ROUTED PAIR** (`docs/specs/focus-model.md`'s refusal rows + `docs/specs/focus-tool-greens.md` `FT-09`, the slice's amendment prerequisite) | **CARRIED** — each owes its own gate; NOT this unit's act and NOT a blocker of the re-home (behaviour-preserving on the refusal path, `§0A` note 2); owner: the slice's own amendment gate |
| **2** | **THE TABS-SLICE RECORD LANDING** (`file.tabs.*` + the close verb + the reserved landing reference + the exactly-one-active constraint's repair arm + the two authored pages) | **CARRIED** — the deferred units' (the slice / the pending tab-strip proposal; `§1.7` STATUS: a PLAN no unit carries yet, `§6.5` round-2 clause (a)); THIS unit declares the authority + the mirror rule (`§2.2`) and the bounded-by-construction property (`§2.2` item 4) that their landing executes |
| **3** | **THE FORK'S OBSERVATION-CHANNEL RE-ROUTE** (the fork's UI reading the tool's answer must re-route to a store subscription on `mem.focus.*`) | **CARRIED** — the fork's own pass under `H-r6`; the reply shape is UNCHANGED so no fork consent is owed (`§2.5` items 3/4); recorded here with its owner |
| **4** | **THE `§Q` FLIP CELLS + THE TRACKER MOVES** (the `provident.focus` PENDING-REBUILD cell, the `H1` row's status, the ledger move) | **CARRIED** — the supervisor's gate-10 acts; this pass edits no tracker (`§5.1` row 9) |
| **5** | **THE `mcp-endpoint.md` §3.8 DOCUMENTATION REPAIR** (the §Q finding's recorded carry: the unit's own same-commit §3.8 amendment was never performed) | **CARRIED** — the §Q finding's owed documentation pass; NOT this unit's (`§1`'s non-concern table) |
| **6** | **THE REGISTER'S EXECUTION** (the six rows' declared `96` attempts) | **CARRIED** — the TestWriter's red set executes it; an un-run row is a FAILURE; the executed totals are reported in the same terms-form (`§5.5.3`) |
| **7** | **THE RE-SEED WRITE HALF — the mirror re-projected (re-seeded) from the tab list's projection IN ONE COMMITTED WRITE on divergence — DECLARED-DEFERRED** (the gate-4 audit's Finding A, landed 2026-10-03; `§2.2` item 3's dated annotation) | **CARRIED-DEFERRED** — lands WITH the slice's projection source (tier 1's projection authority: the deferred units' `file.tabs.*` record + projection landing — `§7a.1` item 2's owner); **REVISIT CONDITION, NAMED: when that record + projection source land, the re-seed WRITE becomes executable and MUST be driven by a register row of that landing unit's own register and reported under that unit's gate — never claimed by THIS one**; THIS unit's executed half is the divergence DETECTION + the declared reconcile READING (`§3.1` `M-4`, `§3.2` `F-5`, `§5.5.1` `P-SF-TP-2` drive-5, `§5.5.2` item 3). **A pass that reports the re-seed as landed by `U-STORE-FOCUS` — or that reads the as-filed "in one committed write" sentence as landed H1 behaviour — is a review finding.** |

**THE ANSWERED DECISIONS (each with its reason, NONE `undefined-until-answered`):** the **AUTHORITY** — tier 1's tab list
(`§2.2`; `Q-9`); the **REPLY SHAPE** — behaviour-preserving, unchanged (`§2.5`; the BREAK clause not triggered); the
**RELEASE SHAPE** — unsubscribe-on-dispose, the H2a pattern (`§2.4` item 3); the **REGISTRATION TIMING** — at construction,
count `2` from construction (`§2.4` item 1, note 1's H2a discipline); the **MIRROR MISS RULE** — the declared-empty pair, no
invented default (`§2.1` item 6); the **NO-CAP DECLARATION** — no cap row, `Q-9` superseded (`§2.2` item 4). **A later pass
that changes any of these OWES A GATE.**

---

## 8. Supersession / citation index

**The authority table for the load-bearing claims of this file (cited by §/row id; `docs/decisions.md` rows BY ROW NAME —
that ledger is appended-to and its line anchors drift):**

| # | The authority | Cited at |
| --- | --- | --- |
| 1 | `docs/pending.md` §Q — the two-rule re-read + the `provident.focus` PENDING-REBUILD cell (2026-10-03) | `§0` row 1, `§0A.3` `S-1`, `§6` item 1 |
| 2 | `docs/next-steps.md` row `H1` (the queue row, 2026-10-03) + the wave-`H` count block | `CURRENT STATE`, `§0` row 2, `§2.5` |
| 3 | `docs/specs/data-ownership-model-plan.md` `§5.2.7` row 13 + round-3 (`R3-4`), `§1.1` Store 2, `§1.3` `R-1`/`R-2`/`R-3`/`R-6`, `§1.7` items 1/2/4/5/8/9 + the reference table's `mem.focus.*` row, `§3.4` row 2.4-1, `§5.6.1` row 13, `§6.4`/`§6.5`'s `U-STORE-FOCUS` rows (amended), `§7.1` `RH-4` (+ amended), `§9.1` `Q-9` | `§0` rows 3/6/7/11/12/16; `§2.1`, `§2.2`, `§5.5.1` |
| 4 | `docs/specs/focus-model.md` `§2.1`/`§2.4` seam 3/`§0A` note 3/`§2.3` items 3/5 — the module's contract, the seams, the state shape | `§0` rows 4/15; `§2.1` |
| 5 | `docs/specs/focus-tool.md` §2.1 items 3/5/6/7/8/9, §2.3 items 3/5, §2.4 rows 1–4, §2.5 items 1–5 — the tool's route, its reply, its negatives | `§0` rows 5/15; `§2.5` |
| 6 | `docs/specs/mcp-endpoint.md` §3.8 item 2 — the tool's normative reply and route | `§0` row 5; `§2.5` items 1/3 |
| 7 | `docs/specs/store-core-graph.md` `§2.1` (`GraphStore`/`GraphSubscription`), `§2.4` (register + `RCAP-3`), `§2.5` (the read), `§2.7` (constraints-as-functions), `§2.8` (the write surface), `§2.10` items 1–6 (the event surface + release), `§2.11` item 1 (the realm rule); the frozen-surface artifact `store-core-module-store-core-graph-surface.md` field 8 | `§0` row 8; `§2.1`, `§2.3`, `§2.4` |
| 8 | `docs/specs/store-modules-bytes.md` `§2.2` (the H2a dispose obligation, `P1`–`P7`, the leak's three-arm detection), `§2.4` (the subscription discipline) | `§0` row 9; `§2.4` |
| 9 | `docs/specs/pane-drag-compliance.md` `§2.3` (the wiring subscriber, the fan-out constraint), `§5.1` row 1 (the bounded wiring role), `§7a.1` item 4 (the boot mint-declare) | `§0` row 10; `§2.3`, `§2.4` |
| 10 | `docs/specs/store-modules-seams.md` — the caller/seam-side filing form; `H2b`'s header naming `focus-model.ts`'s obligation `H1`'s | `CURRENT STATE`; `§1` |
| 11 | `docs/specs/fork-store-reads.md` `§2.2` (the store-axis closure), `§2.4` non-case 5 (the carrier question), `§0A` (the ledger form this file follows) | `§0A` notes 1/4; `§0A.1`–`§0A.3` |
| 12 | `docs/decisions.md` BY ROW NAME — `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` · `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` · `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` · `THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION`; `docs/decisions.md`'s `FOCUS-UI-ONLY-MCP-TOOL` (`S-d12`, `A-d5`) | `§0` rows 13/14; `§5.5`, `§2.3` |

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**The adversarial pass (gate 4, read-only — `AGENTS.md` item 10; RCA-3) runs AFTER the unit's green and hunts edge cases,
unauthorized access and malformed inputs; its findings are dispositioned in `§3b`; host findings are fixed here + regression-tested;
PACKAGE findings go to `docs/defects.md`/`docs/HANDOFF.md` (never patched).**

| # | Seed (the shape the pass must hunt) | The clause it probes |
| --- | --- | --- |
| **ADV-SF-1** | A payload with an own enumerable key outside `{target, newTab}` — the route's validation fence (`focus-tool.md` §2.1 item 8(a)) must still throw BEFORE any store turn; the re-home adds no second validation path | `§2.3` item 5, `§2.5` item 1 |
| **ADV-SF-2** | A HOSTILE store: a throwing `resolve`/`commit`/`subscribe`, a revoked/throwing tier handle, a throwing listener body — the declared degradation must answer, and NO throw may escape a wiring turn | `§2.3` item 6, `§3.2` `F-6` |
| **ADV-SF-3** | The write-loop: the route's own commit fires the wiring's subscription; the listener must never write the store from inside the body (the fan-out terminates after at most the declared two events per transition) | `§2.4` item 2 |
| **ADV-SF-4** | A post-dispose drive: writes to the released references, a second `dispose()`, a re-entrant `dispose()` from inside a listener body (the in-flight delivery completes) | `§2.4` items 3/4 |
| **ADV-SF-5** | A divergent-mirror drive: a fixture writes a mirror value the tab-list projection does not carry — the answer must come from the tab list and the mirror must be re-projected, and the wiring must never write tier 1 | `§2.2` item 3, `§3.2` `F-5` |
| **ADV-SF-6** | A SECOND CARRIER: any residual module-level focus-state binding, memo or cached answer in the landed focus region (the `§Q` rule-1 ✗ shape must not resurface under a new name) | `§3.2` `F-6`, `§5.5.1 P-SF-IM-2` |
| **ADV-SF-7** | The PBT audit (over-strength / under-assertion / evasion) over the register's six rows — each row's strategy id executes its declared terms with no un-run row | `§5.5.1` |

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**As filed, `OWED` (the sibling convention): the pass that runs at gate 4 fills each seed's verdict and any additional findings
into this table, each dispositioned with ONE of the six recorded dispositions (FIXED-IN-TREE · RED-SET-FIX · SPEC-AMENDMENT ·
DOC-REPAIR · NOT-A-DEFECT (with the reason) · ROUTED-WITH-OWNER) — never a bare `OWED`; the table is appended beside this as-filed
form, which stays visible (`RCA-8(d)`). The register's row-1 positive control and row-2's positive control are the PBT audit's
checked fixtures; a finding that moves a term, a strategy id or a cap is a re-grain with its own dated annotation (`§5.5.3`'s
form).**

---

*File-end note (the sibling convention): nothing follows this line. `§3b` is the file-end attachment; the `CURRENT STATE` block
sits before `§0`; a reader who found a section numbered after `§3b` should treat it as a drifted addition, not this unit's.*

---

**⟶ DATED POINTER, `2026-10-11` — THE `docs/pending.md` CITATIONS IN THIS FILE RESOLVE HERE (`RCA-8(d)`: an ADDITIVE block past the file-end note; NOT ONE PRE-EXISTING BYTE IS REWRITTEN, no section, row id or count moves).** **THE CITED SECTION IS `docs/pending.md` `§Q` — the two-rule re-read and the `provident.focus` `PENDING-REBUILD` cell (cited at `§0` row 1, `§0A.3` `S-1`, `§1`/`§2.3`/`§2.4`'s re-home row, and `§6` item 1).** **`§Q` IS RETIRED BY THE `2026-10-11` SWEEP, AND EVERY CITE-SITE RESOLVES TO ITS STUB IN `docs/pending.md` `§6.4` + `§6.6`.** **THE PER-ROW RECORD IS `archive/pending/2026-10-11-retired-rows-index.md` (`§E`); THE AS-FILED TEXT IS `archive/pending/2026-10-11-pending-as-filed-pre-sweep.md` (`sha256 b437a7db5398af3f14d8286f8b3e442ceae38308baf17ee8970da4fa89368382`, byte-identical to `git show 35fc7f2:docs/pending.md`).** **THIS FILE'S OWN LANDING (the store-mirror re-home plus the two subscriptions) IS THE `§Q` REBUILD; the cell's flip was the supervisor's act at gate 10 and is recorded at `docs/next-steps.md`'s `## DONE — U-STORE-FOCUS` section, NOT in `docs/pending.md`. The live `§Q` obligation that survives is `docs/pending.md` `§1(i)` (the exemption arm).**