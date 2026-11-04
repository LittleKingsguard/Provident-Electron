// tests/integration/store-view-record/boundary.test.ts — **THE WORKTREE BOUNDARY ROAD, RE-HOMED** (D-89).
// AUTHORED AFTER the D-30 sweep, so this file carries NO `strata:marked` marker and GATES (D-40, `AGENTS.md`).
/**
 * ============================================================================
 * THE BOUNDARY ROW'S NEW HOME, AND WHY IT HAD TO MOVE.
 *
 * `AGENTS.md`: *"Never marked: a `tests/e2e/` file, or the worktree boundary row — a loop that
 * marks the row measuring its own tree measures nothing."* `strata/next-steps.md` row 1 said the
 * retirement of `tests/store-tabs-record.test.ts` requires *"re-homing the boundary row onto a
 * unit that owns main-side paths"*. That file's `S-1` (and the `§4.2 item 8` register row whose
 * drive embedded the same assertion) declared a scope of TEN paths — `src/renderer/renderer.ts`,
 * one shared file, six test/spec documents — and explicitly DENIED `src/main/` as a prefix
 * (`DENIED_PATH_PREFIXES`). **THE PURGE TOUCHES `src/main/view-record/index.ts`**: the shape's
 * vocabulary left that module for `src/shared/view-shape.ts` so both realms read one spelling,
 * and a row that denies `src/main/` cannot measure the pass that changes it. So the assertion
 * moved here, onto the unit whose declared scope IS the purge's own path set.
 *
 * WHAT THE ROW IS, UNCHANGED IN SUBSTANCE: `edit-set ⊆ declared scope`, asserted AS A SET and
 * never as a count, with a POSITIVE CONTROL that an edit outside the union FAILS. The one thing
 * that must never change is that it can still fail: a re-homed row that cannot fail is a
 * deleted row wearing a new name, and `B-2` exists to prove this one can (it drives the subset
 * assertion over a synthetic edit set that must be refused, and over the declared set itself,
 * which must be admitted).
 *
 * THE SCOPE IS DECLARED AND EACH ENTRY IS NAMED — the precedent's discipline (`RCA-8(d)`): a
 * path is here because THIS pass wrote it or because it is the unit's own, and a fourth path
 * added by a future pass WITHOUT naming it here reddens rather than sliding through.
 *
 * **IT IS RED ON A DIRTY TREE BY CONSTRUCTION** — that is the instrument working, not a defect:
 * the reading is `git status --porcelain` over the whole repository, and the supervisor commits
 * at the gate boundary. Nothing in this file may be weakened to make a dirty tree green.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url))

/**
 * **THE DECLARED SCOPE — THE PATHS THIS PASS AND THIS UNIT OWN**, each with the reason it is
 * admissible. A SUBSET ASSERTION OVER THIS SET IS THE WHOLE CLAIM: nothing outside it may be
 * edited, and the reasons are what make a path's presence reviewable rather than habitual.
 */
const DECLARED_SCOPE: readonly string[] = [
  // ── THE UNIT'S OWN SOURCE: the shape's vocabulary (both realms), the crossing module that
  //    declares the two addresses, and the renderer-side client that holds the shape.
  'src/shared/view-shape.ts',
  'src/main/view-record/index.ts',
  'src/renderer/view-client.ts',
  // ── THE WIRING THE SWAP LANDED: the drag's reads, the focus carrier and the boot's one
  //    subscription. It is the ONE `src/` file outside this unit's address space that the swap
  //    edits, and it is NAMED here rather than admitted by a prefix.
  'src/renderer/renderer.ts',
  // ── THE THIRD FAMILY'S CROSSING (D-91), named path by path because a bridge route is never one
  //    file's: the zone family's address, declaration and route live in `view-record` (already
  //    above), and they reach a caller only through the surface's read answer and shape arm, the
  //    shared channel module, the boot's batch and handler, and BOTH lockstep halves of the
  //    `view` member. This pass writes each of those six, and not one is admitted by a prefix.
  'src/main/view-surface/index.ts',
  'src/shared/view-channels.ts',
  'src/main/main.ts',
  'src/main/preload.ts',
  'src/renderer/secure-panels.ts',
  // ── THIS PASS'S OWN BATTERY: the four clauses driven per address for the zone family. It is the
  //    unit's fourth test file and it is listed here for the same reason the other three are.
  'tests/integration/store-view-record/zone-family.test.ts',
  // ── THE BATTERIES: this unit's own three, and the four flat files whose rows pinned the
  //    machinery the swap replaces and were re-grained onto the shape and the route call log.
  'tests/integration/store-view-record/boundary.test.ts',
  'tests/integration/store-view-record/client.test.ts',
  'tests/integration/store-view-record/crossing.test.ts',
  'tests/store-focus.test.ts',
  'tests/pane-drag-compliance.test.ts',
  'tests/store-modules-seams.test.ts',
  // ── THE RETIREMENT: the file D-30 replaced whole, deleted with the region it pinned, and the
  //    two rows that read a constant off it (the register it declared and the theme census that
  //    read that constant by path) re-grained rather than left pointing at a deleted file.
  'tests/store-tabs-record.test.ts',
  'tests/store-tabs-record-register.ts',
  'tests/theme-control.test.ts',
  // ── THE ROWS THAT READ A DELETED MECHANISM AND SAY SO: the store-read admission that named
  //    the focus mirror's literal resolve site (`fork-store-reads`' `S-9`), and the sibling-
  //    artifact exclusion that charged this pass's new renderer file to another unit
  //    (`gesture-session`'s `F-9(b)`).
  'tests/fork-store-reads.test.ts',
  'tests/gesture-session.test.ts',
  // ── THE LIVE DRIVER: its rows were re-pointed at the crossing's shapes and its unrun status stated.
  'tests/store-tabs-record-live.mjs',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── THE PURGE'S LAST DELETION (`D-93`) — the pass that deletes the frozen graph store, taken AFTER `D-92` made it
  //    UNUSED. Every path it writes is declared here, one reason each, and NOT ONE is admitted by a prefix.
  //
  //    THE SOURCE THE DELETION REMOVES, PATH BY PATH: the frozen store itself and its declaration-input module, and the
  //    two store-shaped caller turns whose whole subject was that store's address space and which had NO live consumer
  //    under `src/`. A DELETION IS A PATH THIS PASS REMOVED, and `git status` reports it like any other write.
  'src/renderer/store-core-graph.ts',
  'src/renderer/store-graph-references.ts',
  'src/renderer/overlay-store.ts',
  'src/renderer/theme-store.ts',
  //    THE SOURCE THE DELETION EDITS: the renderer loses its store wiring whole (the binding, the two construction
  //    functions, the declaration set, the hand-off, the hydration, the crossing seam, the Y-3 registration and the
  //    composition's `frozen` backing + bootstrap); the main process loses the two channel handlers and the `file.*`
  //    projection loop; the preload loses the three `store` members and its `store:file:changed` local; the channel file
  //    loses two of its three constants and keeps the secure crossing's; `types.ts` re-grains the tab row's note; and the
  //    record's client gains the dated headstone that records Stage A's spent paragraph.
  'src/main/store-channels.ts',
  'src/renderer/tabs-client.ts',
  'src/shared/types.ts',
  //    THE BATTERIES: the FIVE files whose subject IS the deleted module, RETIRED WHOLE by `D-30`'s REPLACED-WHOLE (their
  //    `strata:marked-file` markers said so and `D-78`'s purge is what replaced them) — and the files whose censuses
  //    count the store, the bridge members, the channel constants or the renderer's export set, re-grained in place.
  'tests/store-core-graph.test.ts',
  'tests/store-core-graph-integration.test.ts',
  'tests/store-persist.test.ts',
  'tests/store-security.test.ts',
  'tests/store-core-graph-register.ts',
  //    Re-grained, each keeping its term with a control (see each file's own `D-93` headstones):
  'tests/store-modules-bytes.test.ts',
  'tests/overlay.test.ts',
  'tests/theme.test.ts',
  'tests/gutter-ui.test.ts',
  'tests/secure-exclusion.test.ts',
  'tests/secure-exclusion-register.ts',
  'tests/e2e/security-store-storeroom/isolation.test.ts',
  'tests/integration/security-store-storeroom/isolation.test.ts',
  'tests/integration/settings-carrier-retirement/retirement.test.ts',
  'tests/e2e/settings-carrier-retirement/scenarios.test.ts',
  //    THE SECOND LIVE DRIVER: `store-tabs-record-live.mjs` was the one `D-92` named as owed; this pass owns it together
  //    with its sibling `store-compliance-live.mjs`, whose fourteen `getWiredGraphStore` rows reach the deleted module.
  'tests/store-compliance-live.mjs',
  // ── THE CORPUS (the record of this pass) AND THE TWO LAYER DOCUMENTS WHOSE CONTRACTS THE SWAP
  //    MAKES TRUE: the client's contract, and the design that names the chain it implements.
  'strata/decisions.md',
  'strata/next-steps.md',
  'strata/brief.md',
  'strata/marks.json',
  'strata/modules.json',
  'strata/records/store-tabs-record-unit.md',
  'strata/pending.md',
  'docs/L2/view-record/interface.md',
  'docs/L3/view-record/design.md',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-94` — THE IMPORT FIXES AND THE LIVE INSTRUMENT (`pending.md` row 5's closure). Every path it writes is
  //    declared here, one reason each, and NOT ONE is admitted by a prefix.
  //
  //    THE STALE IMPORT: one line, in the headless host, whose construction never existed (the bundler had already
  //    dropped it, so the artifact is byte-identical across the removal — measured, `D-94`).
  'src/main/battery-host.ts',
  //    THE DEMO'S STALE SOURCES: `demo.ts` imported the store `D-93` deleted and could not compile against this
  //    tree; `demo-entry.ts` was its entry. Both DELETED, with the checked-in self-contained `demo.mjs` carrying the
  //    demo, and the README re-grained to say so (a deletion is a path this pass removed).
  'demo/pane-drag-demo/demo.ts',
  'demo/pane-drag-demo/demo-entry.ts',
  'demo/pane-drag-demo/README.md',
  //    THE INSTRUMENT: its `scripts` key, the leg itself, and the SIX key-set censuses the key moves (each extended
  //    beside its own as-filed text, D-38) — the seventh, `theme-control`, reads L-1's pin and follows it.
  'package.json',
  'tests/e2e/store-crossings/crossings-live.mjs',
  'tests/ui-leg-contract.test.ts',
  'tests/focus-model.test.ts',
  'tests/container.test.ts',
  'tests/menu-template.test.ts',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-95` — THE `view` LEG, THE TOTAL PANE READS, AND TWO ITEMS ANSWERED BY FINDING. **Every path that pass writes
  //    is ALREADY DECLARED ABOVE and NOT ONE is added here**, which is why this note is a comment and not four entries:
  //    `src/renderer/renderer.ts` (the two pane reads made total), `tests/pane-drag-compliance.test.ts` (the `F-8` row
  //    that proves it and reds without the guard), `tests/e2e/store-crossings/crossings-live.mjs` (the `view` leg's ten
  //    rows — the instrument EXTENDED, not a second one, so no `scripts` key moved and none of the six key-set censuses
  //    did) and `strata/brief.md` with `strata/decisions.md` (the figures and the row that owns them). **IT DELETES
  //    NOTHING**: `src/shared/overlay.ts` and `src/shared/theme.ts` were measured to be no part of the deleted address
  //    space and are left exactly where `D-93` left them, and `demo/pane-drag-demo/` is a path the corpus names, so
  //    neither owes this row a path. A reader who expects an entry here is owed the reason it is absent — this is it.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-96` — THE APPEARANCE MECHANISM'S CONSUMER (`D-95`'s open item *(a)*, taken as a RULING). The mechanism
  //    `src/shared/theme.ts` is wired at the app renderer's `startThemeDeclaration`: a change of the authored setting is
  //    resolved, declared, and written as provident data (`props.<name>`) on the authored state node. **THE ONE NEW PATH
  //    IS ITS PROOF**, and every other path this pass writes is ALREADY DECLARED ABOVE — `src/renderer/renderer.ts` (the
  //    role and its one wiring site), `tests/theme.test.ts`, `tests/theme-control.test.ts` and
  //    `tests/store-modules-seams.test.ts` (the three no-importer forms re-grained to a closed set with its one named
  //    member), `strata/decisions.md`, `strata/brief.md`, `strata/pending.md`, `strata/next-steps.md`, `strata/marks.json`
  //    (a test file was added) and `strata/modules.json` (the map claim for it) — so no entry is added for any of them,
  //    and `src/shared/overlay.ts` is NOT written at all: `D-96` records why its consumer is not buildable here.
  'tests/theme-declaration.test.ts',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-97` — THE APPEARANCE FAMILY, AND THE INSTRUCTION *"No boot time declarations — Use constraint repairs"*. **THE ONE
  //    NEW PATH IS ITS BATTERY**, and every other path this pass writes is ALREADY DECLARED ABOVE — `src/main/view-record/
  //    index.ts` (the address, the pair and the derivation), `src/main/view-surface/index.ts` and `src/shared/view-channels.ts`
  //    (the surface's answer and the channel), `src/shared/view-shape.ts` (the record's vocabulary), `src/renderer/
  //    view-client.ts` (the client's read and route), `src/main/preload.ts` with `src/renderer/secure-panels.ts` (both lockstep
  //    halves), `src/main/main.ts` (the batch and the handler) and `src/renderer/renderer.ts` (the application that replaces
  //    `D-96`'s deleted drive) — so no entry is added for any of them. The batteries re-grained in place are named for the
  //    same reason: `tests/theme.test.ts` and `tests/theme-control.test.ts` (the mechanism's carrier and name censuses),
  //    `tests/store-modules-seams.test.ts` (the same carrier, three rows), `tests/store-focus.test.ts` and
  //    `tests/pane-drag-compliance.test.ts` and `tests/integration/store-view-record/client.test.ts` (the crossing doubles
  //    that now speak the fourth family), `tests/integration/store-view-record/crossing.test.ts` and its `zone-family`
  //    sibling (the read census and the lockstep pair), `tests/theme-declaration.test.ts` (RE-GRAINED WHOLE onto the
  //    application) and `tests/gesture-session.test.ts` (the sibling-artifact list gains the view surface module). **AND THE
  //    CORPUS THIS PASS WRITES IS ALREADY DECLARED TOO** — `strata/decisions.md`, `strata/brief.md`, `strata/marks.json`,
  //    `strata/modules.json`, `strata/next-steps.md`, `strata/pending.md`, `strata/records/store-tabs-record-unit.md`,
  //    `docs/L2/view-record/interface.md` and `docs/L3/view-record/design.md` — so this block adds ONE path and no second
  //    spelling of one already in the union: `B-1`'s set assertion refuses a duplicate, which is how this comment was
  //    written: the first draft declared six corpus paths twice and the row reddened on it.
  'tests/integration/store-view-record/theme-family.test.ts',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-98` — THE TIER CHANGE ON THE USER'S RULING **"Appearance preferences should be durable"**: `['theme']` moves
  //    from `mem` to `file`, so the appearance family's boot data is the FILE and its own rows are INVERTED to pin that.
  //    **THE ONE NEW PATH IS THE CENSUS THAT MOVES WITH IT**, and it is named rather than admitted: no `.json` name is
  //    added anywhere (the record joins `provident-profile.json`, already declared), but this file ASSERTS THE PROFILE'S
  //    ROOTS AS A CLOSED SET, so a tier change is exactly the move it exists to catch — `['panes','tabs']` becomes
  //    `['panes','tabs','theme']` with the third root's placeholder asserted beside it.
  'tests/integration/central-data/profile-file.test.ts',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE, and each is named so a reader can check the claim
  //    rather than trust it: `src/main/view-record/index.ts` (the tier constant and the address's declaration),
  //    `src/shared/view-shape.ts` (the placeholder's note, corrected where it claimed the placeholder is what keeps a
  //    boot silent), `src/renderer/renderer.ts` (three notes on the same point — boot silence is the boot PATH's) and
  //    `tests/theme-declaration.test.ts` (`T-4`, RE-GRAINED: its durable half boots over a profile that already carries a
  //    legal declaration and proves the boot read still writes nothing, with the control that the same record applied by
  //    hand DOES write — the row that reds when an application is added to the fill's continuation),
  //    `tests/integration/store-view-record/theme-family.test.ts` (`TH-1`, `TH-4`, `TH-8` and `TH-9`, inverted to the
  //    durable shape with their controls kept), `tests/integration/store-view-record/crossing.test.ts` (two rows that
  //    read the profile's roots and one control that compared whole bytes), `tests/integration/store-view-record/
  //    boundary.test.ts` (this block), `strata/decisions.md` (the new row and the supersession pointer),
  //    `strata/brief.md` (the families table's tier word), `docs/L2/view-record/interface.md` (the table row, the rev
  //    block and §1's tier clause) and `docs/L3/view-record/design.md` (the rev block, the address line and §2's tier
  //    paragraph). **THREE PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/marks.json` (no test
  //    file is added or removed, so `strata-marks.mjs check` stays green unregenerated), `strata/modules.json` (no new
  //    module, so no map row and no `endpoints` figure moves) and `strata/pending.md` (`D-96`'s `overlay` blocker is
  //    untouched by a tier change) — so this block adds ONE path and no second spelling of one already in the union.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-99` — THE PASS THAT MAKES THE CORPUS TELL THE TRUTH ABOUT ITSELF: it closes `store-tabs-record` through the
  //    instrument's own `close`, rewrites `records/handover.md`, re-homes and drops four stale map paths, and re-grains
  //    five pieces of prose (two corpus files, the renderer's dead re-export, the headless host's invented store seam,
  //    and the crossings leg's two stale references). **THREE PATHS ARE NEW TO THIS UNION AND EACH IS NAMED, not
  //    admitted by a prefix**: the handover record and `proposals.md` are corpus files no earlier block wrote, and the
  //    unit's state file is written by the instrument rather than by hand — so a reader can see that the one file this
  //    pass may not edit is edited by the script it was told to run and by nothing else.
  'strata/records/handover.md',
  'strata/proposals.md',
  'strata/.strata/units/store-tabs-record.json',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE: `strata/decisions.md` (the row), `strata/next-steps.md`
  //    (ROW 1's closure sentence and the fifth `pending.md` row), `strata/modules.json` (the four stale paths), the two
  //    `src/` files whose prose is corrected (`renderer.ts`'s dead re-export, `battery-host.ts`'s invented seam) and
  //    `tests/e2e/store-crossings/crossings-live.mjs` (the row-5 and three-families re-grains) — so no entry is added for
  //    any of them. **TWO PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/marks.json` (no test file
  //    is added or removed, so `strata-marks.mjs check` stays green unregenerated) and `strata/brief.md` (no count moves:
  //    `srcTypeScriptFiles` `50`, `mapRows` `21`, `126` test files), with `strata/pending.md` untouched at `39` because
  //    `D-96`'s `overlay` blocker is not a prose defect and `strata/records/store-tabs-record-unit.md` untouched at exactly
  //    `40`. This block adds THREE paths and no second spelling of one already in the union.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-100` — THE SUITE'S INPUTS BECOME CHECKOUT-VISIBLE: a fresh clone of this branch ran RED, because `D-2` moved
  //    the gate corpus under `archive/`, `.gitignore` had excluded that path since the initial commit, and `D-8`'s sweep
  //    had then re-pointed the test rows that read it. **THE FIX IS TWO PATHS PLUS THE THIRTY-ONE CORPUS FILES THE SUITE
  //    ACTUALLY READS**, and every one of the thirty-three is named here rather than admitted by a prefix:
  //    `.gitignore` itself (the negation block that admits them and nothing else), `docs/L1/store-tabs-record.md` (the
  //    retired-driver paragraph corrected in that document's own voice), and then the read set — the corpus root's two
  //    files, all seven ACTIVE decision shards, the one skill `readdirSync` walks, and the twenty-one `specs/` contracts
  //    that were re-pointed at `D-8`. **THE OTHER 190 CORPUS FILES ARE NOT HERE BECAUSE THEY ARE NOT WRITTEN**: they stay
  //    ignored, and a path this union does not name is one `git status` reports the moment a pass touches it.
  '.gitignore',
  'docs/L1/store-tabs-record.md',
  'archive/gate-corpus-2026-10-29/decisions.md',
  'archive/gate-corpus-2026-10-29/FORKER.md',
  'archive/gate-corpus-2026-10-29/decisions/ACTIVE-data-ownership-and-tiers.md',
  'archive/gate-corpus-2026-10-29/decisions/ACTIVE-engine-drift-and-registers.md',
  'archive/gate-corpus-2026-10-29/decisions/ACTIVE-engine-pin-and-divergence.md',
  'archive/gate-corpus-2026-10-29/decisions/ACTIVE-mcp-engine-and-process.md',
  'archive/gate-corpus-2026-10-29/decisions/ACTIVE-projection-and-store-facility.md',
  'archive/gate-corpus-2026-10-29/decisions/ACTIVE-store-and-package-binding.md',
  'archive/gate-corpus-2026-10-29/decisions/ACTIVE-tier4-and-secure-graph.md',
  'archive/gate-corpus-2026-10-29/skills/process-guardrails.md',
  'archive/gate-corpus-2026-10-29/specs/container.md',
  'archive/gate-corpus-2026-10-29/specs/container-review.md',
  'archive/gate-corpus-2026-10-29/specs/focus-model.md',
  'archive/gate-corpus-2026-10-29/specs/focus-model-review.md',
  'archive/gate-corpus-2026-10-29/specs/focus-model-adoption-dossier.md',
  'archive/gate-corpus-2026-10-29/specs/focus-tool.md',
  'archive/gate-corpus-2026-10-29/specs/focus-tool-review.md',
  'archive/gate-corpus-2026-10-29/specs/focus-tool-adoption-dossier.md',
  'archive/gate-corpus-2026-10-29/specs/fork-store-reads.md',
  'archive/gate-corpus-2026-10-29/specs/gsession.md',
  'archive/gate-corpus-2026-10-29/specs/gutter-ui.md',
  'archive/gate-corpus-2026-10-29/specs/menulib.md',
  'archive/gate-corpus-2026-10-29/specs/menulib-review.md',
  'archive/gate-corpus-2026-10-29/specs/overlay.md',
  'archive/gate-corpus-2026-10-29/specs/overlay-review.md',
  'archive/gate-corpus-2026-10-29/specs/relocate.md',
  'archive/gate-corpus-2026-10-29/specs/store-core-module-store-core-graph-surface.md',
  'archive/gate-corpus-2026-10-29/specs/theme.md',
  'archive/gate-corpus-2026-10-29/specs/theme-review.md',
  'archive/gate-corpus-2026-10-29/specs/theme-control.md',
  'archive/gate-corpus-2026-10-29/specs/user-flow-audit.md',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE — `strata/decisions.md` (the row),
  //    `strata/brief.md` (three of §6's sentences) and this file — so no entry is added for them. **ONE PATH IS
  //    DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/marks.json`, because no test file is added or removed
  //    and no marker moves, so `strata-marks.mjs check` stays green UNREGENERATED. `strata/pending.md` stays `39`,
  //    `strata/next-steps.md` `29`, `strata/proposals.md` `13`, `strata/modules.json` `21` rows and
  //    `strata/records/store-tabs-record-unit.md` exactly `40` — this pass writes none of them.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-101` — THE TIER BECOMES THE CALLER'S ON THE `data.*` SURFACE, AND THE CROSSINGS' DECLARED ROOTS GET A GUARD.
  //    Every path this pass writes is declared here, one reason each, and NOT ONE is admitted by a prefix.
  //
  //    THE MODULE (`central-data`): its four files, the twelfth refusal word, the tier's domain and two defaults, the
  //    declared-root guard and the option the composition hands it.
  'src/main/data/types.ts',
  'src/main/data/args.ts',
  'src/main/data/mapper.ts',
  'src/main/data/surface.ts',
  //    THE TWO MODULES THAT DECLARE THE ROOTS: each gains the pair its guard reads, built from its OWN address and
  //    tier constants (`tabsDeclaredRoots`, `viewDeclaredRoots`) — the guard imports them and spells neither.
  //    `src/main/view-record/index.ts` is ALREADY DECLARED ABOVE (D-87/D-89) and is not re-listed: this pass adds its
  //    second export to a path the union already carries, which is the difference between a write and a claim.
  'src/main/tabs-record/index.ts',
  //    THE SURFACE'S DECLARED MEMBERS: the three `data` tools' JSON schemas gain `tier`, which is a census move in the
  //    MCP server and in `main.ts`'s one options line (`src/main/main.ts` is already declared above).
  'src/main/mcp-server.ts',
  //    THE BATTERIES: this pass's own gating battery (`declared-root.test.ts`, EIGHT rows, no other file added or
  //    removed) and the four files whose `createDataSurface` call sites gain the now-REQUIRED `declaredRoots` member
  //    (`tests/integration/central-data/profile-file.test.ts`, `tests/e2e/security-store-storeroom/isolation.test.ts`,
  //    `tests/e2e/settings-carrier-retirement/scenarios.test.ts` and
  //    `tests/integration/security-store-storeroom/isolation.test.ts` are ALREADY DECLARED ABOVE) — and not one assertion
  //    moves in any of them, the three GATING `tests/e2e/` files among them.
  'tests/integration/central-data/declared-root.test.ts',
  'tests/unit/central-data/support/temp-profile.ts',
  'tests/integration/central-data/surface.test.ts',
  'tests/integration/central-data/registration.test.ts',
  'tests/e2e/central-data/scenarios.test.ts',
  //    TWO SIBLING UNITS' ROWS RE-DERIVED RATHER THAN WEAKENED, each keeping its control: `gesture-session`'s `F-9(b)`
  //    sibling-artifact list gains this pass's `src/main/` paths BY NAME (its illustration moves from `mcp-server.ts`
  //    to `security.ts`, so a path no declaration names still fails), and `gutter-ui`'s `I-12` exclusion gains
  //    `src/main/mcp-server.ts` and is RENAMED with its control moved to `src/renderer/index.html`.
  //    THE DOCUMENTS: the L2 interface's argument table and §2 block (the tier member, the twelfth reason word and the
  //    new required option — paid for by ONE freed line), the behaviour, persistence and both L3 files corrected within
  //    their ceilings, and `docs/L3/store-tabs-record/signatures.md`, whose `D-45` block MUST declare the export the
  //    comparator would otherwise fail on (one line added, one re-flowed to pay for it).
  'docs/L2/central-data/interface.md',
  'docs/L2/central-data/behaviour.md',
  'docs/L2/central-data/persistence.md',
  'docs/L3/central-data/design.md',
  'docs/L3/central-data/signatures.md',
  'docs/L3/store-tabs-record/signatures.md',
  //    THE CORPUS: the row itself, the `npm test` figure its own rows move and the mark index REGENERATED because this
  //    pass adds a test file. `strata/pending.md` stays `39` and `strata/modules.json` `21` rows — the map's
  //    `central-data` row already claims `tests/integration/central-data/` as a directory and no `endpoints` figure
  //    moves, so this pass writes neither.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-102` — THE MESSAGE LOG, MEASURED AT LAST. A passing `write` is handed `{op, watched, triggered}` and nothing else, and
  //    the package DROPS the entries at the handoff, so the row that would have carried them (`D-82`'s `V4`) is BLOCKED on a
  //    package release rather than landed — and NO `src/` path, no test row and no test file moves with it. **THE ONE PATH NOT
  //    ALREADY DECLARED ABOVE IS THE FINDING'S HOME**: `CD-F3` is filed in the data unit's own record, which `D-5`/`D-52` make the
  //    owner of an upstream-owned finding, and it is named here rather than admitted by a prefix like every other entry.
  //    `strata/decisions.md` (the row), `strata/pending.md` (row `6`) and this file are already declared above; `strata/brief.md`
  //    and `strata/marks.json` are DELIBERATELY ABSENT — no count moves and no test file is added, so no figure and no marker does.
  'strata/records/central-data-management-unit.md',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-103` — THE BUMP TO `provident-storeroom@1.9.2` AND THE COMMIT'S LOG ON THE `data.*` ANSWERS. Nine paths, each
  //    named with its reason and NOT ONE admitted by a prefix; every other path this pass writes is ALREADY DECLARED
  //    ABOVE (the module's `types.ts`, `surface.ts` and `mapper.ts`, `mcp-server.ts`, the two crossings' modules, both
  //    `docs/` scopes, `strata/decisions.md`, `strata/pending.md`, `strata/brief.md`, `strata/marks.json`,
  //    `strata/next-steps.md`, `tests/gesture-session.test.ts` and the seven `central-data` batteries), so no entry is
  //    added for any of them.
  //    THE LOCK: the one command this pass runs is an install, and `npm install` writes the lock. It is here because the
  //    eleven cells and the six lock nodes moved with the pin, and a boundary row that could not see the lock could not
  //    say so — the pin is `package.json`'s (declared above) and this is the file that records what it resolved to.
  'package-lock.json',
  //    THE PIN'S OWN PIN: `tests/storeroom-surface.test.ts` carries the reviewed version as a LITERAL, so the bump moves
  //    it — and it is NOT a `src/main/data/` path, which is why it is new to this union.
  'tests/storeroom-surface.test.ts',
  //    THE SEAM: the one declared accessor of the store's NON-ENUMERABLE `log` member, the re-export of the package's own
  //    `LogEntry`, and the census header re-measured at `1.9.2`. It is where the narrowing has to live, so the module
  //    under `src/main/data/` never spells the member (`D-103`'s `L-6`).
  'src/main/storeroom.ts',
  //    THE MODULE'S ENTRY: it gains the `DataLogEntry` export and nothing else. The four files `D-101` declared are the
  //    module's internals; this is the one file another module imports, and it was not written by that pass.
  'src/main/data/index.ts',
  //    THE NEW BATTERY — six rows, unmarked and GATING (D-40): the repaired arm, the clean arm, a delete that ran a pass,
  //    the three verbs that carry no log, the materialized array, and the narrowing's one home.
  'tests/integration/central-data/message-log.test.ts',
  //    THE FOUR UNIT FILES WHOSE ROWS PIN A WHOLE COMMITTED ANSWER and therefore meet the two new members: each is
  //    re-derived by ADDING them to the object it already compared, so no row is weakened to a member read
  //    (`cold-and-write`, `delete-and-journal`, `refusals`, `surface-and-profile`).
  'tests/unit/central-data/cold-and-write.test.ts',
  'tests/unit/central-data/delete-and-journal.test.ts',
  'tests/unit/central-data/refusals.test.ts',
  'tests/unit/central-data/surface-and-profile.test.ts',
  //    AND THE THIRD PATH THE INSTRUCTION NAMED IS THE ONE ABOVE, `src/main/storeroom.ts` — so the three it listed
  //    (`package-lock.json`, `tests/storeroom-surface.test.ts`, `src/main/storeroom.ts`) are all here, and `B-2`'s
  //    control is untouched: `EDIT_SET_OFFENDER_FIXTURE` is still `src/main/security.ts`, a real file no declaration
  //    names, and (b)/(c) below still drive the near-miss and the whole-set arms.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-104` — THE APP-STATE ROWS GET AN ADDRESS THE RENDERER LISTENS TO (`D-82`'s `V3` closed; the user's rule, *"the
  //    renderer does not ask state, it listens"*). **FIVE PATHS ARE NEW TO THIS UNION AND EACH IS NAMED, not admitted by a
  //    prefix**; every other path this pass writes is ALREADY DECLARED ABOVE.
  //    THE NEW MODULE: the shape the delivery fills — the app-state rows held in this realm, filled by a re-read taken
  //    INSIDE the listener, with one stated boot fill. It is a `src/renderer/` path and the renderer is where the pull it
  //    removes lived.
  'src/renderer/module-client.ts',
  //    THE BATTERY: five gating rows — the delivery measured by the realm's own handler counter, the shape against a read,
  //    the structural no-pull census over comment-elided code, the control for a family the realm does not listen to, and
  //    the two main-side halves.
  'tests/integration/settings-carrier-retirement/app-state-delivery.test.ts',
  //    THE TWO ROWS RE-GRAINED IN PLACE, both keeping their claim and each able to fail: `tests/ui-leg-seam.test.ts`'s
  //    `SETTINGS_CARRIER` was the ONE-LINE `createSettingsSurface({ userDataDir: app.getPath('userData') })` literal and
  //    becomes the derivation EXPRESSION, because this pass gives that option object a second member and a byte-for-byte
  //    `toContain` over the whole call would have measured formatting; `tests/module-pane.test.ts`'s rows 3 and 4 called
  //    `panels.refresh()` and read the module list out of it — the pull this pass deletes — and now drive the client's one
  //    read, its adopted shape and `applyAppState`, which is the same path the app takes.
  'tests/ui-leg-seam.test.ts',
  'tests/module-pane.test.ts',
  //    THE TWO MAIN-SIDE PATHS THIS PASS WRITES, AND NEITHER WAS DECLARED ABOVE — this unit's union has never carried the
  //    secure crossing's own two files, and this pass writes both: the INSTANCE (the third address joins the one
  //    subscription, with its own delivery body routed by the module's own constant) and the SURFACE (the body that hands
  //    the change to the composition's broadcast, and the option it gains).
  'src/main/operator-settings/index.ts',
  'src/main/settings-surface/index.ts',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `src/main/main.ts` (the broadcast, on the new channel), `src/main/preload.ts` with
  //    `src/renderer/secure-panels.ts` (both lockstep halves of `module.onChanged`, and the pane's `applyAppState`), 
  //    `src/shared/types.ts` (the `IPC_MODULE_CHANGED` constant), `src/renderer/renderer.ts` (the client's factory, the one
  //    boot site and the third held registration), `tests/gesture-session.test.ts` (`F-9(b)`'s sibling-artifact list gains
  //    this pass's three `src/` paths by name, its predicate and positive control untouched),
  //    `strata/decisions.md` (the row and `D-82`'s
  //    supersession pointer), `strata/brief.md` (the `npm test` figure), `strata/modules.json` (the new module's map claim
  //    and the `ipc-contract` endpoints the new channel moves), `strata/marks.json` (REGENERATED by `strata-marks.mjs
  //    index`, because a test file is added), `docs/L2/security-store-storeroom/interface.md` (§1's no-listener sentence,
  //    §2's `subscribe` block, §5's options block and `ASM-L2-1`, re-grained IN PLACE so the file stays at its ceiling),
  //    `tests/e2e/store-crossings/crossings-live.mjs` (the leg gains the app-state push row, `X-14b`, and the two acts it
  //    drives — the subscriber it installs and the counter it reads back) and `tests/integration/store-view-record/
  //    boundary.test.ts` (this block). **THE THREE DOCUMENTS ARE NEW TO THIS UNION AND EACH IS NAMED**: this unit's union
  //    has never carried the secure crossing's L2/L3 scopes, and this pass re-grains the three declarations that say the
  //    third address has no listener — `docs/L2/security-store-storeroom/interface.md` (§1's no-listener sentence, §2's
  //    `subscribe` block, §5's options block and `ASM-L2-1`, traded IN PLACE so the file stays at `150`), `docs/L2/
  //    settings-carrier-retirement/interface.md` (§1's table row and its new bullet, §2's `subscribe`) and `docs/L3/
  //    security-store-storeroom/signatures.md` (a second body on the declared `subscribe` plus the type it takes, inside
  //    the file's own two free lines).
  //    AND THE LIVE LEG, ALREADY DECLARED ABOVE (D-94), GAINS THE APP-STATE PUSH ROW `X-14b` AND THE TWO ACTS IT DRIVES — the
  //    subscriber it installs and the counter it reads back — so it adds no second spelling here.
  'docs/L2/security-store-storeroom/interface.md',
  'docs/L2/settings-carrier-retirement/interface.md',
  'docs/L3/security-store-storeroom/signatures.md',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-105` — THE VALUE ARMS, AND THE RULING THAT NAMED THEM: *"`Data.*` should be package-surface tools. Package surface
  //    tools execute constraints on write. If a family invariant can be subverted then this is a failure to enforce
  //    invariants with constraints"*. **THREE PATHS ARE NEW TO THIS UNION AND EACH IS NAMED, not admitted by a prefix**;
  //    every other path this pass writes is ALREADY DECLARED ABOVE.
  //    THE BATTERY: thirteen gating rows — claim one's verb census, claim two's own log on the `data.*` write path, the
  //    seven families' arms and the appearance family's REPAIR arm beside them, the existence arms, the restarts, and the
  //    one arm the value arms do not take. It is a SECOND `tests/integration/central-data/` file and the directory is not a
  //    prefix this union admits, so it is listed here like every other one.
  'tests/integration/central-data/value-arms.test.ts',
  //    THE TWO MODULES THAT DECLARE THE ARMS: the three older view families' (`panes-must-stand`, `focus-must-stand`,
  //    `zones-must-stand`) bodies, their admissions and their three sentences; and the secure crossing's three bodies
  //    (`operator-record-must-stand`, `operator-exclusion-must-stand`, `operator-app-state-must-stand`) with theirs. **Each
  //    file already stood in this union** — `src/main/view-record/index.ts` since `D-87` and `src/main/operator-settings/
  //    index.ts` since `D-104` — so neither is re-listed, which is the difference between a write and a claim.
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `tests/integration/central-data/declared-root.test.ts` (`D-5`, INVERTED: the residual half it measured as landing is
  //    now the refusal, with every control kept), `docs/L2/view-record/interface.md` and `docs/L3/view-record/design.md`
  //    (§3's second kind, §4's rule and §5's discharged debt; §4's and §7's arms, both re-packed inside their ceilings),
  //    `docs/L2/security-store-storeroom/interface.md` (§2's `SAFE_PAIR` clause re-grained IN PLACE), `docs/L3/
  //    security-store-storeroom/signatures.md` and `docs/L3/security-store-storeroom/design.md` (the two private-name
  //    censuses, each edited in place), `strata/decisions.md` (the row and `D-82`'s and `D-101`'s supersession pointers),
  //    `strata/brief.md` (the `npm test` figure), `strata/marks.json` (REGENERATED by `strata-marks.mjs index`, because a
  //    test file is added) and this file (this block). **TWO PATHS ARE NEW BECAUSE THIS UNIT'S UNION HAS NEVER CARRIED
  //    THEM AND THIS PASS WRITES BOTH: `tests/unit/security-store-storeroom/creation-declarations.test.ts` (`CD-4`, whose
  //    landing-instant clause was inverted and whose creation-instant arm is now its control) and
  //    `tests/unit/settings-carrier-retirement/operator-settings.test.ts` (`OS-5`, whose skip rule is proved at the only
  //    door that can now produce a bad row — the profile's bytes — with the refused write as its control).**
  'tests/unit/security-store-storeroom/creation-declarations.test.ts',
  'tests/unit/settings-carrier-retirement/operator-settings.test.ts',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-106` — THE SECURITY RECORD GETS THE DELIVERY IT NEVER HAD (`D-104`'s rule read as the architecture: *"the renderer
  //    does not ask state, it listens. If it needs to ask, it does so within a listener."*). **THE NEW PATHS ARE FOUR AND
  //    EACH IS NAMED, not admitted by a prefix; every other path this pass writes is ALREADY DECLARED ABOVE.**
  //    THE NEW MODULE: the shape the delivery fills — the security record held in this realm, filled by a re-read taken
  //    INSIDE the listener, with one stated boot fill. It is a `src/renderer/` path, and the renderer is where the pull it
  //    removes lived.
  'src/renderer/security-client.ts',
  //    THE BATTERY: five gating rows — the delivery measured by the realm's own handler counter, the shape against a read,
  //    the structural no-pull census over comment-elided code, the control for a family the realm does not listen to, and the
  //    two main-side halves with the lockstep pair. It is a SIBLING of `D-104`'s rather than four more rows in it, because its
  //    subject is the FIRST delivery body (the record and the pair) and that file's is the SECOND (the app-state rows).
  'tests/integration/settings-carrier-retirement/security-delivery.test.ts',
  //    THE THREE ROWS RE-GRAINED IN PLACE, each keeping its claim and each able to fail:
  //    `tests/integration/secure-panels/roster.test.ts` (its `clickRow` drove `panels.refresh()` for a carrier reading — the
  //    pull this pass deletes — and now drives the shape's one read and the pane's adopt step, so the direction a click
  //    composes is still read off the CARRIER's answer), `tests/isolation-adversarial-e2e.test.ts` and
  //    `tests/secure-panels.test.ts` (the same drive, on the same three arms, with their token/group assertions unmoved).
  'tests/integration/secure-panels/roster.test.ts',
  'tests/isolation-adversarial-e2e.test.ts',
  'tests/secure-panels.test.ts',
  //    THE FOURTH ROW RE-GRAINED: `tests/tier4-arbitrary-storage.test.ts`'s pane fixture took the carrier's reading by
  //    awaiting `refresh()`, and takes it through the shape now; its `F1-S4` arm — a carrier answer that OMITS the `exclusion`
  //    member — is now measured where the answer is admitted, which is the shape's own arm, and the paint it measures is
  //    unchanged.
  'tests/tier4-arbitrary-storage.test.ts',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `src/shared/types.ts` (the `IPC_SECURITY_CHANGED` constant), `src/main/preload.ts` with
  //    `src/renderer/secure-panels.ts` (both lockstep halves of `security.onChanged`, the preload's registration, and the
  //    pane's `applySecurity`), `src/main/main.ts` (the broadcast), `src/main/settings-surface/index.ts` (the push option and
  //    the call inside the delivery body), `src/renderer/renderer.ts` (the client's factory, the one boot site and the fourth
  //    held registration), `tests/secure-exclusion.test.ts` (its `security` member census moves `3 → 4` with the delivery
  //    NAMED, its control still refusing an undeclared extra, and its three G6 rows re-grained onto the same drive),
  //    `tests/integration/security-store-storeroom/isolation.test.ts` and `tests/e2e/security-store-storeroom/isolation.test.ts`
  //    (`ISO-4`/`S-11`: four routes, three of them requests, and four security channels by constant value),
  //    `tests/gesture-session.test.ts` (`F-9(b)`'s sibling list gains this pass's one new `src/renderer/` path by name, its
  //    predicate and positive control untouched), `tests/e2e/store-crossings/crossings-live.mjs` (the leg gains the
  //    security-push row `X-13b` and the two acts it drives), `strata/decisions.md` (this row and its supersession pointer),
  //    `strata/brief.md` (the `npm test` figure and the source count), `strata/modules.json` (the new module's map claim, the
  //    `ipc-contract` `endpoints` the new channel moves and the battery's path on the `operator-settings` row),
  //    `strata/marks.json` (REGENERATED by `strata-marks.mjs index`, because a test file is added),
  //    `docs/L2/security-store-storeroom/interface.md` (the rev block, §1's third-address clause, §5's options block and the
  //    `N` bullet that says why the surface's `19` is unmoved, traded IN PLACE so the file stays at its ceiling) and
  //    `docs/L3/security-store-storeroom/signatures.md` (ALREADY DECLARED ABOVE at `D-104`; this pass writes it again, on the
  //    line the surface is declared on, and does not re-list it — the difference between a write and a claim). **THE ONE L3
  //    PATH NEW TO THIS UNION IS NAMED**: this unit's union has never carried the secure crossing's instance design, and this
  //    pass spends its last free line there — one bullet, the delivery that leaves this process and the surface as the site
  //    where it does (`149 → 150`, inside its ceiling).
  'docs/L3/security-store-storeroom/design.md',
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-107` — THE REFUSAL LEDGER'S `log`, THE `data.*` CLAUSE-2 CELL RE-READ AS `N/A`, TWO PROSE CORRECTIONS AND
  //    `ST-F1` RE-MEASURED AT `1.9.2`. **FOUR PATHS ARE NEW TO THIS UNION AND EACH IS NAMED, not admitted by a prefix;
  //    every other path this pass writes is ALREADY DECLARED ABOVE.**
  //    THE FOUR LAYER DOCUMENTS WHOSE CITATIONS NAMED FILES THAT NO LONGER STAND: each names a path `D-93` (or `D-89`)
  //    deleted — `tests/store-persist.test.ts`, `tests/store-security.test.ts`, `src/renderer/store-core-graph.ts`, or
  //    a row of a driver no leg runs — and each is RE-POINTED at a living subject (the settled profile's written-name
  //    census, `RET-5` and the boot's own name census; the seven `scripts` key-set rows and the boundary row at its new
  //    home; `writeAppState` and `AS-3`) with the deleted path kept and LABELLED as the reading of its own date. A
  //    document that names a deleted file is a citation no `B-1` can measure, so the four are listed here path by path.
  'docs/L1/central-data-management.md',
  'docs/L1/central-data-census-exception.md',
  'docs/L1/secure-panels.md',
  'docs/L2/settings-carrier-retirement/behaviour.md',
  //    AND THE MODULE'S OWN L3 SCOPE, which a member on the ledger reaches — `docs/L3/central-data/signatures.md`'s §1
  //    `DataLedger` line, its rev block and §4's answer clause, traded IN PLACE so the file stays at `150`, because a
  //    signatures document declaring the old ledger shape is the drift `D-53` keeps catching. **IT IS ALREADY DECLARED
  //    ABOVE** (`D-101`) and is NOT re-listed: the first draft of this block declared it a second time and `B-1`
  //    reddened on the duplicate, which is the row doing its job — the difference between a write and a claim.
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `src/main/data/mapper.ts`, `types.ts` and `surface.ts` (the forwarded member, the ledger's optional `log` and the
  //    header clause that said the refusal arm carried none — all three declared at `D-101`), `src/main/storeroom.ts`
  //    (the one accessor's docblock gains its fourth measured fact, declared at `D-103`),
  //    `tests/integration/central-data/message-log.test.ts` (`L-7` and `L-8` join `D-103`'s six; declared at `D-103`),
  //    `docs/L2/central-data/interface.md` (§2's ledger arm, §3's table row and bullet, and the rev block, traded IN
  //    PLACE so the file stays at `149`), `strata/decisions.md` (this row, `D-106`'s pointer clause and `D-103`'s
  //    supersession pointer), `strata/brief.md` (the stale sentence, the boundary row's new home and the `npm test`
  //    figure), `strata/pending.md` (row 1's revival condition), `strata/records/store-tabs-record-unit.md` (`ST-F1`'s
  //    re-read, one line spent and one freed), `strata/marks.json` (ALREADY DECLARED ABOVE at `D-93`, and written here
  //    because its `readings` move with the two rows — `gating` reads `232 → 234` sites in the SAME `31` files, and
  //    `index` is run because `check` reds on a `readings` disagreement and not on a marker drift; no test file is
  //    added or removed) and this file (this block). **ONE PATH IS DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**:
  //    `strata/modules.json` — no module is added, no path set changes and no `endpoints` figure moves.
  //    `strata/next-steps.md` and `strata/platform.md` are untouched, at `29` and `60/60`.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-108` — `ST-F1` MADE STRUCTURAL HERE, AND THE UNREACHABLE POPULATION CENSUSED. **NOT ONE PATH IS NEW TO THIS
  //    UNION**, which is why this note is a comment and not four entries: a claim that spells a path twice is not a
  //    claim, and `B-1`'s set assertion refuses a duplicate.
  //    THE ROW IS AN EXTENSION OF A DECLARED BATTERY: `tests/integration/central-data/value-arms.test.ts` gains `VA-14`
  //    and `VA-15` — declared at `D-105` and written again, the difference this union keeps insisting on between a
  //    write and a claim.
  //    AND THE CORPUS IS ALL DECLARED TOO: `strata/decisions.md` (the row), `strata/brief.md` (the `npm test` figure and
  //    the mark census, both inside the sentence that already carried them), `strata/pending.md` (row `6`, the
  //    population's disposal, which is where a BLOCKED item belongs and not in `strata/next-steps.md`),
  //    `strata/records/store-tabs-record-unit.md` (§1's immunity clause: one line spent and one freed inside §3) and
  //    `strata/marks.json` (REGENERATED by `strata-marks.mjs index`, because rows join a file already indexed and
  //    `check` reds on a `readings` disagreement — `D-107`'s lesson, so `index` is RUN and not assumed).
  //    **FOUR PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/modules.json` (no module is added,
  //    no path set changes and no `endpoints` figure moves), `strata/next-steps.md` (`29` — an unimported population
  //    whose disposal is a DESIGN ACT is not actionable work), `strata/platform.md` (`60/60`, no platform fact moves)
  //    and **`src/` ITSELF, OF WHICH NOT ONE BYTE IS WRITTEN**: the census is an analysis whose instruments live outside
  //    the repository, and the immunity is a DRIVE over the modules as they stand. A pass that writes no `src/` path
  //    owes the five Electron legs nothing — they were driven anyway and read unmoved (`D-108`'s measurement clause).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-109` — THE BUMP TO `provident-storeroom@1.9.3` AND `ST-F1` DISCHARGED UPSTREAM. **NOT ONE PATH IS NEW TO THIS
  //    UNION**, which is why this note is a comment and not one entry: a claim that spells a path twice is not a claim,
  //    and `B-1`'s set assertion refuses a duplicate — the row that reddened on exactly that while `D-97`'s and
  //    `D-107`'s blocks were being written.
  //    THE BUMP'S THREE PATHS ARE ALL DECLARED ABOVE: `package.json` (the pin, `D-94`), `package-lock.json` (the eleven
  //    cells and the six nodes the install resolved, `D-103`) and `tests/storeroom-surface.test.ts` (the reviewed
  //    version's own pin and the comment that carries its subject, `D-103`) — written AGAIN by this pass, which is the
  //    difference this union keeps insisting on between a write and a claim.
  //    THE SEAM is `src/main/storeroom.ts`, declared at `D-103`: the census header's version moves and no figure does.
  //    THE INSTRUMENT is `tests/integration/central-data/value-arms.test.ts`, declared at `D-105`: `VA-15(a)` is
  //    RE-DERIVED into its inverse in place and `VA-14`'s prose clauses corrected beside it, so no test file is added,
  //    none is removed, and not one spec site moves.
  //    AND THE CORPUS IS ALL DECLARED TOO: `strata/decisions.md` (the row and its two supersession pointers),
  //    `strata/brief.md` (§2's pinned row and its reason sentence), `strata/pending.md` (the `ST-F1` sentence, inside its
  //    ceiling of `40`), `strata/next-steps.md` (the same sentence at `29`), `strata/records/store-tabs-record-unit.md`
  //    (the discharge, one line spent and one freed, `40 → 40`) and this file (this block). **TWO PATHS ARE DELIBERATELY
  //    ABSENT AND THE ABSENCE IS THE RECORD**: `strata/marks.json` — no test file is added or removed and no spec site
  //    moves, so `strata-marks.mjs check` is green UNREGENERATED — and `strata/platform.md` (`60/60`, no platform fact
  //    moves). `src/` owes the five Electron legs nothing: no render path moves and `src/renderer/` is untouched.
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-111` — THE RULING ON THE ELEVEN UNIMPORTED `src/shared/` MODULES IS TAKEN (**carried as designs**) AND THIS
  //    ROW GAINS NO ENTRY, WHICH IS THE WHOLE OF ITS CLAIM HERE. Every path that pass writes is ALREADY DECLARED ABOVE and
  //    not one is admitted by a prefix: `src/renderer/renderer.ts` (the one false claim about the population, corrected in
  //    `candidatesFor`'s own docblock), `strata/decisions.md` (the row), `strata/pending.md` (row six's departure and its
  //    reason, in the deletions paragraph), `strata/next-steps.md` (the same departure on its own line),
  //    `strata/records/handover.md` (the eleven struck from the blocked list it named) and this file (this block). **TWO
  //    PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/marks.json` — no test file is added or removed
  //    and no spec site joins an indexed file, so `strata-marks.mjs check` is green UNREGENERATED — and `strata/brief.md`,
  //    which is absent for a MEASURED reason rather than by omission: §6 carries the five legs and no artifact byte figure,
  //    so the `474`-byte move in the renderer bundle has no cell there to have changed and nothing there is rewritten.
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-112` — THE FIVE `data.*` ROUTES ARE ANSWERED, AND `strata/pending.md` ROW 1 LEAVES BECAUSE ITS WORK LANDED.
  //    **TWO PATHS ARE NEW TO THIS UNION AND BOTH ARE NAMED, not admitted by a prefix**; every other path this pass
  //    writes is ALREADY DECLARED ABOVE and is named below so a reader can check the claim rather than trust it.
  //    THE BATTERY: eleven gating rows (`BR-1`..`BR-11`) driving each of the five arms through the REAL `handleRequest`,
  //    the REAL preload-shaped member and the REAL `createDataSurface` over the REAL store — plus the refusal ledger, the
  //    payload-identity arm, the seven-member `MUTATING_METHODS` with its `dispatch` control, the no-listener census, the
  //    five `ipcMain.handle` sites beside the ABSENT frame guard, and the `unknown method` control.
  'tests/integration/central-data/bridge-route.test.ts',
  //    THE ONE LAYER DOCUMENT NEW TO THIS UNION: the secure crossing's `behaviour.md`, whose `RQ-1` cell carried *"whether
  //    the route then answers is not this row's … no `data.*` arm stands at this head"* — a dated citation of
  //    central-data's §5 clause that this pass makes false. It is corrected IN PLACE, keeping its claim and its cites and
  //    staying inside its own `150`-line ceiling (`129` at this head).
  'docs/L2/security-store-storeroom/behaviour.md',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE: `src/shared/types.ts` (the five `IPC_DATA_*`
  //    constants and the block that says why no sixth exists), `src/main/main.ts` (the surface named once and the five
  //    `ipcMain.handle` sites), `src/main/preload.ts` with `src/renderer/secure-panels.ts` (both lockstep halves of the
  //    `data` member), `src/renderer/renderer.ts` (the five arms and `dataRoute`), `tests/e2e/security-store-storeroom/
  //    isolation.test.ts`, `tests/integration/security-store-storeroom/isolation.test.ts` and `tests/e2e/
  //    settings-carrier-retirement/scenarios.test.ts` (`ISO-4`/`S-11`: the bridge member census `8 → 9`, each moved with
  //    its own dated note), `tests/e2e/store-crossings/crossings-live.mjs` (the route act and the row `X-31`), the four
  //    `docs/` scopes whose clauses cited the unanswered routes (`docs/L1/central-data-management.md`'s map parenthetical
  //    and its "unlanded" paragraph, `docs/L1/central-data-census-exception.md`'s `N` clause,
  //    `docs/L2/security-store-storeroom/interface.md`'s settled clause and `docs/L2/central-data/interface.md`'s §5 and
  //    rev block — each traded IN PLACE and each left inside its ceiling), `strata/decisions.md` (the row),
  //    `strata/pending.md` (row 1's departure and its reason, in the deletions paragraph), `strata/next-steps.md` and
  //    `strata/records/handover.md` (the same departure where each names its rows), `strata/modules.json`
  //    (`ipc-contract` `10 → 15`, the five channel constants, cap `150 → 200`) and `strata/brief.md` (the `npm test`
  //    figure, the crossings row and the mark census) — so no entry is added for any of them.
  //    **TWO PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/records/store-tabs-record-unit.md`
  //    (exactly `40`, and no clause of it is this pass's subject) and `strata/platform.md` (`60/60`, no platform fact
  //    moves).
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-113` — THE OVERLAY'S CONSUMER, AND `strata/pending.md` ROW `5` LEAVES BECAUSE ITS WORK LANDED. The user's ruling,
  //    VERBATIM: *"The overlay is used to contain UI elements that should block general app access while open, ex. security
  //    tools and other configuration settings"*. `src/shared/overlay.ts` is now consumed; the app AUTHORS the modal surface
  //    the mechanism was owed. **SIX PATHS ARE NEW TO THIS UNION AND EACH IS NAMED, not admitted by a prefix**; every other
  //    path this pass writes is ALREADY DECLARED ABOVE and is named below so a reader can check the claim.
  //    THE AUTHORED SURFACE: the envelope gains the overlay layer — the app root the inert declaration lands on, the opal
  //    scrim, the dialog card with its two panes and its close control, the opener and the state carrier. It is the ONE
  //    `src/shared/` file this pass writes, and no earlier block of this union has ever carried it.
  'src/shared/demo-envelope.ts',
  //    THE BATTERY: ten gating rows (`OV-1`..`OV-10`) driving the transition machine through the consumer, the escape arm's
  //    callback and its absorption, the `{name, value, removal, target}` declaration on both arms, the authored surface as a
  //    provident node against a hand-written-DOM positive control, the dialog's containment of the two panes, the
  //    nothing-else-moves arm, the drive through the producing graph, the MEASURED reach of `provident.dispatch` under an
  //    inert root, the gesture session's untouched commit route, and the one-spelling census of the attribute name.
  'tests/integration/overlay-application.test.ts',
  //    THE INSTRUMENT: the `ui` leg gains the row that observes the overlay AT THE BOUNDARY — the authored opener dispatched
  //    over MCP, the attribute read back over `provident.get_rendered_html`, the close control dispatched and the attribute
  //    gone. It is a row EXTENDED beside the leg's five, and the census that counts the leg's `row(...)` call sites is
  //    re-pinned `11 -> 12` in `tests/ui-leg-contract.test.ts` (ALREADY DECLARED ABOVE at `D-94`) rather than left to drift.
  'scripts/electron-ui.mjs',
  //    THE THREE BLIND BATTERIES whose rows read a DEEP envelope path by INDEX: `D-113` puts the app's general surface at the
  //    root's first child with the modal layer beside it, so each row re-derives its path to the same authored card it
  //    already reached. Their terms — "a defined value at a deep envelope path" — are UNMOVED.
  'tests/runtime-battery.test.ts',
  'tests/blind-runtime-host.test.ts',
  'tests/blind-battery-verify.test.ts',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `src/renderer/renderer.ts` (the `overlayWiringRole` role and the `startOverlayApplication` consumer, and the one
  //    turn the reply route takes beside the appearance act), `tests/overlay.test.ts` (`X-5` re-grainined to the two admitted
  //    surface paths and `X-6` to ONE named importer), `tests/store-modules-seams.test.ts` (`S-OV-1`, `E-OV-1` and
  //    `P-SMS-OV-IM-1`, the same closed-set form `D-96` took for `theme`), `tests/theme-control.test.ts` (four census rows,
  //    `25 -> 38` with the thirteen overlay nodes as the THIRD declared term), `tests/menu-template.test.ts` (`X-5`'s `dialog`
  //    spec admits ONE path by name, the other five still sweep it), `tests/ui-leg-contract.test.ts` (the `11 -> 12` pin),
  //    `strata/decisions.md` (the row), `strata/pending.md` (row `5`'s departure and its reason, in the deletions
  //    paragraph), `strata/next-steps.md`, `strata/records/handover.md` and `strata/brief.md` (the departures and the
  //    `npm test` figure), `strata/marks.json` (REGENERATED by `strata-marks.mjs index`, because a test file is added),
  //    `strata/modules.json` (the `chrome` row's new node paths and the `app-envelope` row's `endpoints`, which the eight
  //    new exported ids move) and this file (this block).
  //    **TWO PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/records/store-tabs-record-unit.md`
  //    (exactly `40`, and no clause of it is this pass's subject) and `strata/platform.md` (`60/60`, no platform fact moves).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-114` — THE INSTRUMENT MEASURES `strata/records/` AND THE FOUR TRACKERS, THE FOUR REDS THAT COVERAGE RAISES ARE
  //    DISPOSED IN PROSE, AND `strata/pending.md` ROW `4` LEAVES WITH ITS TABLE EMPTY. **ONE PATH IS NEW TO THIS UNION AND
  //    IT IS NAMED, not admitted by a prefix**; every other path this pass writes is ALREADY DECLARED ABOVE and is named
  //    below so a reader can check the claim.
  //    THE RECORD THE NEW RECORD-PATTERN COVERAGE FIRST REDDENED AND THIS PASS REPAIRS: the bootstrap retrospective is the
  //    `*-retrospective.md` shape — its `20`-line ceiling resolves from its PATH, which is exactly what the pattern table
  //    exists for — and no earlier block of this union has ever carried it.
  'strata/records/strata-bootstrap-retrospective.md',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `strata/decisions.md` (the row and nothing else), `strata/pending.md` (row `4`'s departure and its reason, the
  //    preamble's empty-table sentence and its citation, and the removal of the row's own line — the file SHRINKS
  //    `35` → `34`), `strata/next-steps.md` (the same statement about an empty list, at `35`), `strata/records/handover.md`
  //    (the same statement for a fresh seat, at `39`), `strata/records/store-tabs-record-unit.md` (the `1.6.1` reading's
  //    citation, exactly `40`), `strata/records/central-data-management-unit.md` (the assumption named by its HOME rather
  //    than by bare id, `40/40`) and this file (this block). **THREE PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE
  //    RECORD**: `strata/marks.json` (no test file is added or removed and no collected row moves, so
  //    `strata-marks.mjs check` stays green UNREGENERATED), `strata/brief.md` (no §6 figure moves — no row, no file, no
  //    `src/` byte) and `strata/platform.md` (`60/60`, no platform fact moves).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
]

/** **THE SET-SHAPE CLAIM, STATED AS ITS OWN TERM**: a duplicate path inflates a count without
 *  widening a scope, so the declared set is compared against its own members. */
const DECLARED_SCOPE_IS_A_SET = new Set(DECLARED_SCOPE).size === DECLARED_SCOPE.length

/**
 * **THE POSITIVE CONTROL** — a path outside the union. It is deliberately a REAL file in this
 * repository (an MCP-surface module the purge never touches), so the control cannot be
 * satisfied by a string that names nothing.
 */
const EDIT_SET_OFFENDER_FIXTURE = 'src/main/security.ts' // `D-101`: `mcp-server.ts` is declared above from this pass;
// the fixture moves to the gate, a real MCP-surface module that no pass has touched and no declaration names.

/** `edit-set ⊆ declared scope`, as a SET, with the offenders NAMED rather than counted. */
function editSetIsSubset(changed: readonly string[], scope: readonly string[]): { readonly ok: boolean; readonly offenders: readonly string[] } {
  const offenders = changed.filter((path) => !scope.includes(path))
  return { ok: offenders.length === 0, offenders }
}

/** **THE EDIT SET, READ OFF THE TREE ITSELF** — porcelain lines are `XY <path>`, so the path is
 *  sliced from index 3 and the line is NOT trimmed first (an unstaged modification reads
 *  `" M tests/…"`, and trimming before the slice shifted the path by one byte — the
 *  `RCA-8(d)` defect the retired register kept visible). A RENAME carries `old -> new`; the
 *  destination is the path that must be declared, and a DELETION is a path this pass removed,
 *  which is exactly as much of an edit as a write. */
function editSetFromWorkingTree(): readonly string[] {
  let out: string
  try {
    out = execFileSync('git', ['status', '--porcelain'], { cwd: REPO_ROOT, encoding: 'utf8' }) as unknown as string
  } catch {
    return ['__GIT_READING_FAILED__']
  }
  return out
    .split('\n')
    .filter((line) => line.length > 3)
    .map((line) => {
      const path = line.slice(3)
      const arrow = path.indexOf(' -> ')
      return (arrow >= 0 ? path.slice(arrow + 4) : path).trim()
    })
    .filter((entry) => entry.length > 0)
}

describe('store-view-record · THE WORKTREE BOUNDARY (re-homed from `tests/store-tabs-record.test.ts` `S-1`)', () => {
  it('B-1 · `edit-set ⊆ declared scope`, asserted AS A SET and never as a count — and the declared scope is a set (no duplicate path inflates it)', () => {
    expect(DECLARED_SCOPE_IS_A_SET, 'the declared scope carries no duplicate path').toBe(true)
    expect(DECLARED_SCOPE).toContain('src/main/view-record/index.ts')
    expect(DECLARED_SCOPE.some((path) => path.startsWith('src/main/')), 'this unit OWNS main-side paths — the retired row denied them, which is why it could not measure this pass').toBe(true)
    const changed = editSetFromWorkingTree()
    const subset = editSetIsSubset(changed, DECLARED_SCOPE)
    expect(
      subset.ok,
      `edits outside the union: ${JSON.stringify(subset.offenders)} — a path this pass wrote must be DECLARED here with its reason; this row is red BY CONSTRUCTION on a dirty tree and is never touched to make one green`,
    ).toBe(true)
  })

  it('B-2 · **THE ROW CAN STILL FAIL** — the same instrument refuses an edit outside the union, refuses an UNDECLARED SIBLING of a declared path, and ADMITS the declared set itself; a re-homed row that cannot fail is a deleted row wearing a new name', () => {
    // (a) A PATH OUTSIDE THE UNION FAILS — the positive control `C-9` requires.
    const control = editSetIsSubset([EDIT_SET_OFFENDER_FIXTURE], DECLARED_SCOPE)
    expect(control.ok, 'the control path is outside the union and MUST fail it').toBe(false)
    expect(control.offenders, 'and the offender is NAMED, never merely counted').toEqual([EDIT_SET_OFFENDER_FIXTURE])
    // (b) A PATH ONE SEGMENT OFF A DECLARED PATH FAILS TOO — the set is exact membership and not a prefix match, so
    //     `src/main/view-record/` being declared cannot admit a fourth module in that directory.
    expect(editSetIsSubset(['src/main/view-record/extra.ts'], DECLARED_SCOPE).ok, 'the scope admits no undeclared sibling').toBe(false)
    expect(editSetIsSubset(['src/renderer/view-client2.ts'], DECLARED_SCOPE).ok, 'and no near-miss of a declared name').toBe(false)
    // (c) THE DECLARED SET IS ADMITTED WHOLE — the instrument is not simply always-red, which is how a boundary row lies.
    expect(editSetIsSubset(DECLARED_SCOPE, DECLARED_SCOPE).ok, 'every declared path is admissible, so the assertion has two arms').toBe(true)
  })

  it('B-3 · THE READING IS THE TREE\'S AND NOT A LIST — the edit set is read from `git status --porcelain` over the whole repository, so a pass that edits a path and forgets to declare it reddens `B-1` rather than reporting a clean scope', () => {
    const changed = editSetFromWorkingTree()
    // (a) The instrument answers a LIST (possibly empty, on a committed tree) and never a placeholder, unless the READ
    //     itself failed — in which case the sentinel is returned and the subset assertion FAILS, which is the honest arm.
    expect(Array.isArray(changed)).toBe(true)
    expect(changed.includes('__GIT_READING_FAILED__'), 'a failed git read must surface as a red row, never as an empty set').toBe(false)
    // (b) THE INSTRUMENT IS NOT VACUOUS: over the tree as it stands during this pass, the reading carries this unit's own
    //     files at least while they are uncommitted; once committed the list is empty and the reading still answers a list.
    //     So the bite is the assertion in (a) plus the CONTROL in `B-2`, never a claim about today's list.
    expect(changed.every((path) => path.length > 0), 'no empty or mangled path survives the slice').toBe(true)
  })
})
