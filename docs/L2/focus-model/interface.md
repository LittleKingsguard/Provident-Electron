# L2 — `focus-model`: the interface

- **Layer:** L2 · **Unit:** `focus-model` · **Branch:** `strata` (D-6) · **Rev:** 2 — the pass AFTER the carrier's deletion: §1's
  reader column and §2's census state the MEASUREMENT (no `src/` import, no `src/` call; the reader that reached it is the deleted
  carrier's, six of its eight names surviving only in a headstone) and §3 is the authority; Rev 1 was the `focus-retirement` L2 pass that owed §4 and retired `E-6` (D-111, D-142, D-145, D-9).
- **Inputs:** `D-141` (the model may be exercised over the tab record's state, and a model reading `['tabs']` needs no
  carrier) · `D-142` (the family and its carrier go, in that order) · `D-111` (the ruling on an unimported `src/shared/`
  module: **carried as designs**) · `D-9` (a battery retires with its referent) · `D-140`/`D-76` (the active tab is a
  derived fact with an owner) · `D-18` (no new MCP surface) · `D-30`/`D-40` (marks) · `D-3`/`D-26`/`D-43`.
- **Ceiling:** 150 lines · **Citations:** a source cite names its **site** and never an offset (D-41); no count or stage
  owned by another document or by state is restated here (D-26, D-43).

## 0. Scope

This document fixes the model's I/O surface, its readers, and its **disposition** after the `['focus']` family and its
carrier are deleted — never its internals (its battery's and L3's, §3's L2 row; `modules.md` §1) nor another module's
surface (D-3).

## 1. The surface as it stands — four value exports, five type declarations, with their sites

| Export | Argument | Answer | Its `src/` reader — the DELETED carrier's (§2, §3) |
|---|---|---|---|
| `focusTransition(state, verb, arg?)` | the caller's state, an unknown verb token, an optional `{entry?, id?, refuse?, onChange?}` | a **seven-member** result — `state`, `accepted`, `verb`, `refusals`, `seated`, `changed`, `persisted`; a refusal is a VALUE, and a refused attempt hands the prior state back by identity | **none**: the carrier's `focusRoute` and its two `focusTransition(` arms, both deleted — `focusRoute` is spelled in no `src/` byte at all (D-142, §2) |
| `focusOrder(entries)` | the caller's sequence | the SAME array, in the caller's order — nothing sorted, deduped or copied | **none**: the carrier's `carriedEntryIds`, DELETED (D-142, §2) |
| `focusIndex(state, id)` | the caller's state and an id | the owned index, or the `-1` sentinel | **none**: no `src/` file ever calls it (measured, §2; D-111) |
| `persist(seam, state)` | a caller-supplied seam and the state | `{present, value}` — the seam's return handed back by identity; **it calls no storage** | **none**: the carrier's `answerForCarrier`, DELETED (D-142, §2) |

| Type | Members | Its `src/` use — the DELETED carrier's (§2, §3) |
|---|---|---|
| `FocusId` | `unknown` — opacity declared as a TYPE, so no coercion or structural comparison is available | through `FocusState`/`FocusEntry` below (D-141) |
| `FocusEntry` | closed: `id`, `target`, `label?` | **none**: the carrier's `tabListProjectionOf`, `projectionAnswerOf`, `mirrorStateOf`, `carriedEntryIds`, `resolveForHolder` — DELETED (D-142) |
| `FocusVerb` | closed five: `open`, `activate`, `close`, `next`, `prev` | passed through, never named by a route (D-141) |
| `FocusRefusalCode` | closed five: `unknown-verb`, `duplicate-id`, `unknown-id`, `no-next`, `no-previous` | read off a result, never minted by a caller (D-141) |
| `FocusState` | `entries` then `activeId` — **the CALLER's record** | **none**: the carrier's `mirrorStateOf`, `answerForCarrier` and its `persistTarget` — DELETED (D-142, D-140) |

**The model holds no state, opens no address, calls no store and mints no vocabulary**: a pure ordered-entry reducer over
opaque ids and targets, its own bytes declaring that (`src/shared/focus-model.ts`'s header and its `FocusState`/`FocusEntry`
declarations; D-141, D-140).

**Two `src/` shapes CITE it without importing it, and both went with the deleted mirror**: `src/shared/view-shape.ts` declared
`ViewFocusEntry`/`ViewFocusMirror` as the model's first two shapes narrowed to what the crossing's boundary admits, and
`src/renderer/view-client.ts`'s held-shape note did the same for `FocusState`; no `src/` byte spells either name at this head, and
neither ever asserted anything about the model (D-142, `E-2`, D-9).

## 2. Who imports it under `src/` — the measurement, and the census is EMPTY

**NO statement under `src/` imports it. ONE did, and it was the carrier's**: `src/renderer/renderer.ts`'s import block —
`import { focusTransition, focusOrder, persist, type FocusEntry, type FocusState } from '../shared/focus-model.js'` (`D-41`: the
site) — deleted by `D-142` with the region every use of it sat in: `tabListProjectionOf`, `projectionAnswerOf`, `mirrorStateOf`,
`carriedEntryIds`, `resolveForHolder`, `answerForCarrier`, the `focusRoute` arms and the carrier's `persistTarget` (`D-142`, `E-1`).

**The census is empty, measured over `src/**` in all four import forms** (value, type-only, `import(`, `require(`): not one
statement, and `focusIndex` never had a caller (`D-108`'s instrument class). **What survives of that one reader is a HEADSTONE, not a
reader**: `renderer.ts`'s `focus`-act region note names SIX of the eight sites `D-142` deleted — `mirrorStateOf`, `tabListProjectionOf`,
`projectionAnswerOf`, `carriedEntryIds`, `resolveForHolder`, `answerForCarrier` — while `focusRoute` and `persistTarget` are spelled in no `src/` byte at this head (`D-41`, `D-142`, §3).

**What the deleted reader left in a built artifact, and no longer does**: `demo/pane-drag-demo/demo.mjs`'s provenance carried a
`@source … src/shared/focus-model.ts` row while that import reached it; the pass that deleted the import REBUILT it, so the row is gone and `DB-1` stays green (`D-118`).

**The battery-side readers**, so none is counted missing: `tests/focus-model.test.ts` (type-only, plus the
computed-specifier dynamic read its red boundary needs); and `tests/store-focus.test.ts`, the carrier's battery, retired by §5 (D-9, `E-6`). **`tests/focus-tool-register.ts` holds NO claim about it**: that register's `focusTransition`/`focusOrder`/`FocusState` import went with the answer shape it served, so the tool's authority is the tab record (D-142, `E-5`, `ASM-2`).

## 3. The disposition — RETAINED AS A DESIGN, with no `src/` reader

**The measurement that decides it**: the model's only `src/` reader is the carrier `D-142` deletes, so after this unit it
is reached by no entry point at all — the population `D-111` rules on, where the ruling taken is **carried as designs**: an
unimported module may be a deliverable; a contract can be complete, tested and correct while no entry point reaches it; and
it stands as a surface a caller — this app's, or a fork's — may one day adopt (D-111, D-108). The class applies by that
measurement and not by a layer's re-ruling: the population's size is `D-111`'s reading, not re-counted here (D-26, D-43).
**Nothing it computes is lost by the deletion and nothing is re-derived elsewhere** (§4).

**`tests/focus-model.test.ts` therefore STANDS WHOLE AND UNEDITED.** No row of it is reached: its export census, its
import-boundary rows, its purity/order/opacity totality rows and its register drive the model's own bytes and arguments.
Its two `src/`-importer rows (`X-5`, `R-6`) assert zero offenders OUTSIDE a declared exemption naming the renderer and
REPORT the exempted reads without asserting them — the exemption's occurrence going to zero leaves both green and buys
them no edit; only its recorded reason becomes historical, which the rows report and never assert (D-40, D-30).

**Rejected: retarget it over `['tabs']`** (D-141 offers it; it is the one alternative that is a design act rather than a
deletion). Cost, measured: a retarget needs a CALLER to be anything but the retained design, and the act is no longer a
transition — it is one whole-record composition handed to `data.write` at `['tabs']` at `file`, the record's repair
settling the pair (D-142, D-136). A caller would be an INVENTED consumer, which `D-90` refused to author, and would seat a
second derivation of the active row beside `landingOf` — the second spelling `D-140` named and `D-142` deleted. A retarget
with no caller is the retained design under a new name, for a new contract and a re-grain of the two no-importer rows.

**Rejected: retire it whole.** Its premise is measurably false: the tab record holds `order`, one row per tab, the
`exactly-one-active` pair and `landingOf`'s derivation, and produces none of the model's alphabet — no one-step
`next`/`prev` over the caller's order, no ends-refuse instead of a wrap, no activation by an identical target, no `-1`
sentinel (`src/main/tabs-record/index.ts`'s constraint and read sites, against §1; D-76, D-142). And it is the arm `D-111`
records as REJECTED by the user's own ruling — *"retired with their contracts and batteries"* — so a layer may not take it
as a measurement. Its cost: a declared deliverable deleted with its contract and its battery, and a map row left claiming
a dead path (D-111, D-30, D-3).

## 4. The contract it keeps: caller-owned state, no carrier, no derivation of its own

- **The state is the caller's and the model is a reducer over it** (`FocusState`, with §1's four exports): it mutates no
  argument, retains no seam after a call, keeps no cache and no default, and hands a refusal the prior state by identity
  (D-141, D-140). **It owns no carrier and holds no state**: the carrier it was driven through was the RENDERER's (D-142).
- **Its shape is COMPATIBLE with the tab record's, and that is not consumption**: `read()` answers `order` plus a
  `landing` it derives plus one row per tab (`src/main/tabs-record/index.ts`'s `seats()` and `landingOf`) — an ordered
  sequence and an active id, which is what the model takes from ANY caller. It names no address, no tier, no store, no
  channel and no member of this app, so nothing flows between them today (D-141, D-142).
- **The derivation of the active tab is the RECORD's, never the model's**: `landingOf` derives the witness from the rows
  and `exactly-one-active` (`TABS_CONSTRAINT_ID`) enforces one active at the record's own address, its normalisation being
  the repair's (`healRecord`) (D-76, D-140, D-142). The model derives none — its `activeId` is whatever its caller handed
  it — and where its `close` re-seating rule and the record's successor rule would disagree, the RECORD's governs: the
  record is the address, the model a design awaiting a caller (D-76, D-142).
- **It adds no route, member, tool, resource or group, and answers no agent**: the model is not a crossing and owns no
  MCP surface (D-18, D-142).

## 5. What the deletion leaves — the battery retired, the address gone, nothing added

**`tests/store-focus.test.ts` is RETIRED WHOLE** (`E-6`): a battery whose subject is gone does not linger as a green row
about nothing (D-9). What it pinned, recorded so the retirement is an act rather than a deletion (D-9, D-111): the store
route and the carried state shape (`S21-1`…`S21-6b`); the authority and the divergence, the re-seed write pinned as the
declared-deferred half (`S22-1`…`S22-5b`, `M-4`, `F-5`); the re-home's carrier surface, read turn, write-through turn,
totality and hostile degradation, and the holder's absence (`S23-1`…`S23-6b`, `THE-REHOME`); ONE subscription and its
release (`S24-1`…`S24-3`, `P1`…`P7`, `SF-LEAK`, two working defaults); the tool's route, its
`{activeId, entries, opened, refused?}` reply and the seven-member `MUTATING_METHODS` set without `focus`
(`S25-1a`…`S25-5b`); the six prohibitions with the `M`/`F`/`I`/`R`/`X` rows and §7a.1's defaults; and the `§5.5.1`
register's six rows with its totals row (`REG-IM-1`…`REG-TP-2`, `REG-TOTALS`). **What the retirement loses, stated**: it was
the only battery driving the model INSIDE a composed route — write-through, release, reply assembly — so the loss is a
composition's, not a property of the model's (D-9).

**The family's address is gone**: no read answers at `['focus']`, no declaration and no declared root stand at it, and a
write there is ADMITTED as an undeclared root rather than refused — the arm that measures the deletion (D-142, D-101).
**No route, bridge member, MCP tool, resource or group is added by this pass**, and `src/**` gains no byte of mine
(D-18, D-142, D-3). **The instruments re-grained elsewhere, each named rather than left to be discovered** (D-30, D-43):

| Instrument | What it carries of the retired path | Whose edit |
|---|---|---|
| `strata/modules.json`'s `focus-model` row | its `paths` claimed `tests/store-focus.test.ts` | **L1's** — LANDED: the row's `paths` are `src/shared/focus-model.ts` and `tests/focus-model.test.ts`, so a deleted path is claimed by nothing (D-7, D-30, D-3) |
| `strata/marks.json` | the file's `strata:marked-file` entry | REGENERATED by `strata-marks.mjs index`, never hand-edited: no `store-focus` row stands and `check` is green (D-30) |
| `tests/integration/store-view-record/boundary.test.ts` | its declared scope already carried the retired path, so the deletion is admitted | that row is `store-view-record`'s — LANDED: its `DECLARED_SCOPE` names `docs/L2/focus-model/interface.md` (D-30, D-3) |
| `src/renderer/renderer.ts`'s boot-region note | it cited `tests/store-focus.test.ts`'s `S22-1` as the row that attributed a literal; a deletion reds no row on a comment | `renderer-wiring`'s L4 pass — COMMENT-ONLY re-grain LANDED: the note names the battery as retired and gone from the tree (D-41, D-3) |
| `demo/pane-drag-demo/demo.mjs` | its provenance carried the model through the renderer's import | REBUILT by the pass that deleted that import: no `focus-model` `@source` row stands and `DB-1` is green (D-118) |

## 6. Marks, for every row this pass touches (D-30, D-40)

| Path | Marker it carries | Its reading after this pass |
|---|---|---|
| `tests/focus-model.test.ts` | `strata:marked-file` (rework, D-30) plus two `strata:gates` carve-outs — `I-9` and `R-3`'s config half, both being the script key set, an instrument (D-38) | UNMOVED: on notice, with those two carve-outs gating; no row is edited (§3) |
| `tests/store-focus.test.ts` | `strata:marked-file` (rework, D-30) and no carve-out | RETIRED whole and OUT of the index: no entry stands and `strata-marks.mjs check` is green (§5; D-30, D-9) |

## 7. What this document does not decide

- **Whether a caller ever adopts the model** — not designed here and not foreclosed, because a ratified design has no
  expiry to miss (D-111). **The tool's answer shape and description** are `mcp-surface`'s (§2; `E-5`, D-141). **Every other
  module's documents and batteries** leave by their own edits in the same unit (`E-7`…`E-11`; D-142, D-3).
