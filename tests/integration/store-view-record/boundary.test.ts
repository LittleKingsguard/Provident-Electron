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
 * the reading is `git status --porcelain --untracked-files=all` over the whole repository, and the
 * supervisor commits at the gate boundary. Nothing in this file may be weakened to make a dirty tree
 * green. **THE FLAG IS NOT DECORATION, AND `focus-retirement` MEASURED WHY**: a bare `--porcelain`
 * collapses a wholly untracked directory into ONE line that names no file (`docs/L2/app-shell/`), so
 * a scope written to satisfy that reading has to declare the DIRECTORY — and a declared directory
 * admits every file a later pass drops under it, which is a path that measures nothing. Enumerated,
 * each new file is its own offender until it is declared by name, and the near-miss arm of `B-2`
 * bites on a new filename in a directory this union already carries.
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
 *
 * **AN EDIT AT A PATH OUTSIDE THIS UNION MUST STILL RED** — that is the row, and it is why every
 * entry below is a FILE carrying its own reason: never a directory, never a prefix, never a glob.
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
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-125` — THE STORE DRIVES AND THE RENDERER RENDERS. **ONE PATH IS NEW TO THIS UNION AND IT IS A BATTERY**; the rest of
  //    this pass's edits stand on paths the declarations above already own, named here so a reader can see which they were:
  //    the two secure-crossing modules (`src/main/operator-settings/index.ts`, `src/main/settings-surface/index.ts`) and the
  //    renderer's client (`src/renderer/security-client.ts`), the wiring (`src/renderer/renderer.ts`) and both lockstep
  //    halves of the `get()` declaration (`src/main/preload.ts`, `src/renderer/secure-panels.ts`), the four batteries
  //    re-derived row by row (`value-arms`, `security-delivery`, `creation-declarations`, `port-follow`), the overlay
  //    consumer's own file, the demo bundle the source change rebuilds (`demo/pane-drag-demo/demo.mjs`), and the three
  //    `security-store-storeroom` documents. **THE ONE NEW PATH IS THIS ROW'S OWN SUBJECT**: the secure pane battery that
  //    counts the read answer's members, because that answer gained the pane's word.
  'tests/integration/secure-panels/persistence.test.ts',
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
  // ── `D-115` AND `D-116` — THE HANDOVER'S CEILING IS `60`, AND THE GATE-INDEPENDENCE RULE IS ADOPTED WITH
  //    `strata/modules.md` AS ITS CARRIER. **ONE PATH IS NEW TO THIS UNION AND IT IS NAMED, not admitted by a prefix**;
  //    every other path this pass writes is ALREADY DECLARED ABOVE and is named below so a reader can check the claim.
  //    THE CARRIER `D-116` NAMES: the procedure that owns the harness stood at exactly `40/40`, so its clause was paid
  //    for — §1's second paragraph re-wrapped from three lines to two with not one word changed, the freed line
  //    carrying the clause at the end of §5, the file holding at exactly `40` before and after — and no earlier block of
  //    this union has ever carried it.
  'strata/modules.md',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `strata/decisions.md` (the two rows and the pointer clause appended at `D-114`'s own row, which may not be
  //    reworded), `strata/pending.md` (the three descriptions corrected in place against the instrument's shipped bytes —
  //    the three forms over a site rule, the seven over-long register rows, the flat record discovery — the file holding
  //    at `34`) and `strata/next-steps.md` (the same parser description at `35`). **THREE PATHS ARE DELIBERATELY ABSENT AND
  //    THE ABSENCE IS THE RECORD**: `strata/marks.json` (no test file is added or removed and no collected row moves, so
  //    `strata-marks.mjs check` stays green UNREGENERATED), `strata/brief.md` (no §6 figure moves — no row, no file, no
  //    `src/` byte) and `strata/platform.md` (`60/60`, no platform fact moves). **AND `strata/records/handover.md` IS
  //    ABSENT FOR A REASON OF ITS OWN**: `D-115` rules on its ceiling and its own bytes already say nothing of it — it
  //    states no ceiling at all — so the file is not written and stands at `39` of `60`.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-117` — THE TWO LEFTOVERS: `src/main/tier4-state.ts` is RETIRED and the live pane drag is WIRED onto `['panes']`.
  //    **TWO OF THE FOUR PATHS THIS BLOCK ADDS ARE `src/` PATHS AND BOTH ARE NAMED, not admitted by a prefix** — the
  //    DELETED holder (a deletion is a path `git status` reports) and the two batteries whose holder rows had no subject
  //    left or whose census term moved. `src/main/settings-surface/index.ts`, which carried one of the holder's two writer
  //    sites, is already declared above.
  'src/main/tier4-state.ts',
  'tests/unit/settings-surface/surface.test.ts',
  'tests/tier4-arbitrary-storage-register.ts',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `src/main/settings-surface/index.ts` (its two `setTier4OpenState` sites and the import leave), `src/main/main.ts`
  //    (the ASM-4 note that named the holder), `src/renderer/renderer.ts` (the drag's four seams, `release` as the sink,
  //    the `writes` array's deletion and `tabsClientReading`'s reader), `tests/tier4-arbitrary-storage.test.ts` (`FS-T4-09`
  //    retired with its subject, `FS-T4-12` re-grained onto the whole tree), `tests/pane-drag-compliance.test.ts` (the
  //    `D-117/LIVE-READ` row), `tests/fork-store-reads.test.ts` (`S-9`'s call-site term `1 → 2`),
  //    `tests/gesture-session.test.ts` (`F-9(b)`'s sibling list gains the deleted holder), `strata/decisions.md` (the row),
  //    `strata/brief.md` (§6's figures), `strata/marks.json` (two new `strata:gates` sites), `strata/modules.json` (the
  //    `operator-settings` row loses the deleted path) and `strata/next-steps.md` (the focus-family gap). **ONE PATH IS NEW
  //    TO THIS UNION BESIDE THE TWO ABOVE** and it is an L1 document no earlier block wrote: the exception's `§6` states
  //    that the holder's retirement is PARKED, and this pass IS the retirement, so the parked clause is corrected in place.
  'docs/L1/security-store-storeroom-exception.md',
  //    **THREE PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/pending.md` (its table is empty and
  //    `D-117` blocks nothing, so no row is added), `strata/records/handover.md` (`39` of `60`, untouched) and
  //    `strata/records/store-tabs-record-unit.md` (exactly `40`, untouched).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-118` — THE PANE-DRAG DEMO IS REBUILT FROM SOURCE AND GETS A GENERATOR, A STALENESS ROW AND A LIVE DRIVE.
  //    **THE NEW SOURCE, ITS GENERATOR AND ITS BATTERY ARE NAMED ONE BY ONE** (not admitted by a prefix): `demo.ts` and
  //    `README.md` are ALREADY DECLARED above (from `D-94`, where `demo.ts` was a deletion) and are NOT re-listed — this
  //    pass writes both again, which is the difference between a write and a claim.
  'demo/pane-drag-demo/stub-view.ts',
  'demo/pane-drag-demo/build.mjs',
  'demo/pane-drag-demo/demo.mjs',
  'demo/pane-drag-demo/index.html',
  'demo/pane-drag-demo/run-live.mjs',
  //    THE OLD ARTIFACT'S IMAGES: three screenshots OF the retired store-backed demo (the drag ghost among them), removed
  //    with the artifact they depicted. A deletion is a path `git status` reports like any other write.
  'demo/pane-drag-demo/shot-boot.png',
  'demo/pane-drag-demo/shot-committed.png',
  'demo/pane-drag-demo/shot-ghost.png',
  //    THE BATTERY: four gating rows (the staleness check, its fail-able control, the import-not-transcription census and
  //    the retired mechanism's absence). It is a NEW test file, so `strata/marks.json` is REGENERATED for it below.
  'tests/demo-bundle.test.ts',
  //    THE TWO FILES OUTSIDE `demo/` THIS PASS WRITES: the typecheck leg is made to READ the demo's source (`D-94`'s
  //    latent defect was a source no leg compiled), and the pointer file's `demo/` row names the demo's new shape.
  'tsconfig.json',
  'AGENTS.md',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `demo/pane-drag-demo/demo.ts`, `demo/pane-drag-demo/README.md` (both above), `strata/decisions.md` (the row),
  //    `strata/brief.md` (§6's `npm test` figure and the test-file count), `strata/marks.json` (REGENERATED — a test file
  //    is added), `strata/modules.json` (the `demo-panes` row gains the battery's path; `mapRows` stays `21`) and
  //    `tests/integration/store-view-record/boundary.test.ts` (this block). **NO `src/` PATH IS WRITTEN** — which is why
  //    the five Electron legs are not owed — and **THREE PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**:
  //    `package.json` (NO `scripts` key is added: the build is the literal `node demo/pane-drag-demo/build.mjs`, so none
  //    of the six key-set censuses moves), `strata/platform.md` (`60/60`, no platform fact moves) and
  //    `strata/records/store-tabs-record-unit.md` (exactly `40`, untouched).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-120` — THE THREE MEASURED DEFECTS: the shell's page CSS makes the window legible on a dark-preference desktop
  //    and carries the appearance rules the authored attribute was owed, and the envelope's own `css` puts the overlay
  //    layer over the app instead of below it. **ONE PATH IS NEW TO THIS UNION AND IT IS NAMED, not admitted by a
  //    prefix**: `src/renderer/index.html`, the shell chrome this corpus has called the appearance authority since
  //    `U-THEME-CONTROL` and which no earlier block ever wrote — its `:root` arm is pinned to `light`, `body` gains the
  //    foreground every unset element inherits, and the layer's two visibility rules key on the `inert` attribute the
  //    overlay's consumer already applies. Its styling is presentation for the SHELL, never authored provident data
  //    (`AGENTS.md` § "UI authority"): the overlay's GEOMETRY went to the envelope, which is why both paths move.
  'src/renderer/index.html',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `src/shared/demo-envelope.ts` (the two overlay-layer style objects, `overlayScrimStyle` and `overlayDialogStyle`,
  //    which stood at `{display: 'block'}` and now carry the full-viewport inset and the centring pair; the surface was
  //    declared at `D-113`), `tests/integration/overlay-application.test.ts` (`OV-11`/`OV-12`, declared at `D-113`),
  //    `tests/theme-declaration.test.ts` (`T-8`/`T-9`, declared at `D-97`), `demo/pane-drag-demo/demo.mjs` (REBUILT by
  //    `node demo/pane-drag-demo/build.mjs` because the demo's source imports `src/` and the envelope moved — the
  //    generator and its staleness row were declared at `D-118`), `strata/decisions.md` (this row),
  //    `strata/brief.md` (§6's `npm test` figure and its mark census, both re-written IN PLACE on the lines that
  //    already carry them, so the file holds at `148` of `150`), `strata/marks.json` (REGENERATED by
  //    `strata-marks.mjs index`: the four rows join two files that were ALREADY indexed, so `gating` moves `263 → 267`
  //    sites in the same `36` files and nothing else moves) and `tests/integration/store-view-record/boundary.test.ts`
  //    (this block). **AND `strata/modules.json` IS UNTOUCHED, WHICH IS A MEASUREMENT AND NOT AN OVERSIGHT**: the map
  //    already claims this pass's one new write path on `renderer-wiring`, and adding it to the `chrome` row as well was
  //    a DOUBLE CLAIM `strata-lint` refused by name, so `mapRows` stays `21` and no `endpoints` figure moves.
  //    **TWO PATHS ARE
  //    DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/pending.md` (`34` lines; the table is empty and this
  //    pass closes no tracked row) and `strata/next-steps.md` (`36`; the one open row is the focus family's, untouched).
  //    **`docs/L1`/`docs/L2`/`docs/L3`
  //    ARE UNTOUCHED AND THE ABSENCE IS MEASURED**: no layer document declares the shell's styling or the overlay's
  //    presentation — a search of the three trees for `index.html` answers the bundle-boot-seam rows that name the HTML
  //    EMISSION and the ui leg's `#panes` citation, and neither claims a declaration.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-123` — THE INVARIANT: "the security pane cannot be open while the MCP ports are open" becomes a CONSTRAINT on
  //    the secure crossing instead of `D-122`'s imperative sequence. **THREE PATHS ARE NEW TO THIS UNION AND EACH IS
  //    NAMED, not admitted by a prefix**: the crossing's fourth address and its one invariant declaration make the
  //    surface's seventh verb cross the boundary, so the two member-set rows that pin the surface's and the instance's
  //    own shapes are re-derived (`tests/unit/settings-carrier-retirement/settings-surface.test.ts`,
  //    `tests/integration/settings-carrier-retirement/surface.test.ts`), and the design document that declares the
  //    surface's six-and-no-seventh clause is re-grained to seven rather than left contradicting the code
  //    (`docs/L3/security-store-storeroom/design-settings-surface.md`).
  'tests/unit/settings-carrier-retirement/settings-surface.test.ts',
  'tests/integration/settings-carrier-retirement/surface.test.ts',
  'docs/L3/security-store-storeroom/design-settings-surface.md',
  //    AND ONE BATTERY IS NEW TO THE TREE: the socket's own, because a constraint cannot move one and the split therefore
  //    needs a file where the socket IS the subject — the HTTP listener's two directions, the stdio arm's measured
  //    absence, the follow's idempotence and the delivery that drives it. It is authored after the `D-30` sweep and
  //    carries no marker, so it gates.
  'tests/integration/security-store-storeroom/port-follow.test.ts',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `src/main/operator-settings/index.ts` and `src/main/settings-surface/index.ts` (the fourth address, its existence
  //    pair, the one invariant at the store's root, the seventh surface verb and the exclusion's own delivery callback —
  //    declared at `D-84`, `D-85` and `D-106`), `src/main/store-channels.ts` (`IPC_SECURITY_PANE`; declared at `D-93`),
  //    `src/main/preload.ts` and `src/renderer/secure-panels.ts` (the `setPane` member and its lockstep half; declared at
  //    `D-63`), `src/main/main.ts` (the pane's handler and the port's follow; declared at `D-87`), `src/main/mcp-server.ts`
  //    (`followExclusion`; declared at `D-103`), `src/renderer/renderer.ts` (the overlay's report on the user's act;
  //    declared at `D-87`), `demo/pane-drag-demo/demo.mjs` (REBUILT by `node demo/pane-drag-demo/build.mjs` because the
  //    demo's source imports `src/renderer`; declared at `D-118`), the six batteries whose censuses move
  //    (`tests/unit/security-store-storeroom/creation-declarations.test.ts` at `D-85`,
  //    `tests/unit/settings-carrier-retirement/operator-settings.test.ts` at `D-85`,
  //    `tests/integration/central-data/value-arms.test.ts` at `D-105`,
  //    `tests/integration/settings-carrier-retirement/retirement.test.ts` and both `isolation.test.ts` files at `D-93`,
  //    `tests/secure-exclusion.test.ts` at `D-93`), `strata/decisions.md` (this row), `strata/brief.md` (§6's `npm test`
  //    figure and its mark census, re-written IN PLACE on the lines that already carry them), `strata/marks.json`
  //    (REGENERATED by `strata-marks.mjs index`: no test file is added, so the file's own counts move by the rows the
  //    six batteries gained and nothing else) and `docs/L2/security-store-storeroom/interface.md` and
  //    `docs/L3/security-store-storeroom/{design,signatures}.md` (the declared shape, at their own ceilings).
  //    **TWO PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/pending.md` (`34`; this pass closes no
  //    tracked row) and `strata/next-steps.md` (`36`; the one open row is the focus family's, untouched). **AND
  //    `strata/modules.md` AND `strata/platform.md` ARE UNTOUCHED**: this pass adds no module row (`followExclusion` is a
  //    member of the server the map already claims) and no platform fact.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-124` — THE INVARIANT'S ROOT PAIR BECOMES TWO SEATS, each at the half whose landing op asks it, and NO BEHAVIOUR
  //    MOVES: a coupling fix, measured at both edges before and after. **NO PATH IS NEW TO THIS UNION AND THE ABSENCE IS THE
  //    RECORD** — this pass adds no module, no channel, no test file and no document, so nothing is appended to this list
  //    (a second spelling of a path already here is the duplicate that reddens `B-1`). **EVERY PATH THIS PASS WRITES IS
  //    NAMED HERE SO A READER CAN CHECK THE CLAIM WITHOUT TRUSTING IT**: `src/main/operator-settings/index.ts` (the two seats,
  //    the one body they share and the removed `ROOT_ADDRESS`; declared at `D-84`), `tests/unit/security-store-storeroom/
  //    creation-declarations.test.ts` (`CD-16` inverted and `CD-18`/`CD-19` added; declared at `D-105`),
  //    `tests/integration/central-data/value-arms.test.ts` (`VA-14`'s census `5 → 6` / `15 → 16` and the pane family's
  //    existence pair driven at last; declared at `D-105`), `docs/L2/security-store-storeroom/interface.md` (§1's table row and
  //    its clause, rev 16, traded IN PLACE at `150`), `docs/L3/security-store-storeroom/design.md` (rev 5, §1's row and §3's
  //    helper row, in place at `150`), `docs/L3/security-store-storeroom/signatures.md` (rev 7, §1's row, in place at `150`),
  //    `strata/decisions.md` (`D-124` and `D-123`'s supersession pointer), `strata/brief.md` (§6's `npm test` figure, its
  //    mark census and its `onNotice` re-taking, all re-written IN PLACE on the lines that already carried them),
  //    `strata/marks.json` (REGENERATED by `strata-marks.mjs index`: no test file is added, so the file count stands at `37`
  //    and only the site count moves, `276 → 278`) and this file (this block).
  //    **FOUR PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/pending.md` (`34`; this pass closes no
  //    tracked row), `strata/next-steps.md` (`36`; the one open row is the focus family's), `strata/modules.md` (exactly `40`;
  //    the two seats are private declarations of a row the map already claims, so no module row, no `endpoints` figure and no
  //    cap moves) and `strata/platform.md` (`60`; no platform fact moves — the read's non-bracketing is the package's own
  //    declared behaviour and is cited, never restated).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-126` — THE HUMAN'S CLICK BECOMES AN ACT THAT REACHES THE STORE, in the appearance family (`D-125`'s correction,
  //    which ruled it for the pane). **TWO PATHS JOIN THIS UNION AND NEITHER IS ADMITTED BY A PREFIX**: the AUTHORED
  //    ENVELOPE, because the token has to come from the control as DATA — `§2.3` item 2 forbids the handler substituting one
  //    for an absent argument — and the battery that measures the new turn. `src/renderer/renderer.ts` is ALREADY DECLARED
  //    above (the drag's reads at `D-88`) AND SO IS `src/shared/demo-envelope.ts` (the overlay's authored surface at
  //    `D-113`), so neither is appended and a second spelling of either would be the duplicate that reddens `B-1` itself.
  'tests/theme-act.test.ts',
  'tests/renderer-delivery-compliance.test.ts',
  // ── `D-129` — THE AUDIT'S `F4`, THE PANE'S FABRICATED GATE CONFIGURATION, and the four rows that pinned it. **THE PATHS JOIN
  //    THIS UNION BECAUSE THEY ARE THE ONES THAT MOVED**: `src/renderer/secure-panels.ts` (the `cfg` member's `null` arm), and
  //    the two batteries that asserted the default by name — `tests/host-guard-panes.test.ts` (`PF-6`/`PF-7`'s premise and both
  //    siblings' boot state) and `tests/tier4-arbitrary-storage.test.ts` (the `F1-S1` fidelity anchor). `src/renderer/renderer.ts`
  //    and the audit's own battery are already declared, as are `src/renderer/secure-panels.ts` (the overlay's lockstep half at
  //    `D-113`) and `tests/tier4-arbitrary-storage.test.ts` (the pane channel at `D-101`), so ONE path is appended and a second
  //    spelling of either of those would be the duplicate that reddens `B-1` itself.
  'tests/host-guard-panes.test.ts',
  //    **THE TOKENS ARE SPELLED BY REFERENCE AND THAT IS WHY `src/shared/demo-envelope.ts` MOVES AT ALL**: the card authors
  //    `props.value`, and `§3.4` R-6 / `§3.2` F-1 read the card region's QUOTED literals — so the pair is declared once
  //    beside `THEME_INITIAL_TOKEN` and referenced there, and the closed two-member block stays closed at two.
  //    **THE ABSENCES ARE THE RECORD**: `src/shared/dom-shim.ts` is NOT here and MUST NOT BE — `engine-pin` §2.2.4 closes its
  //    member set, and three other units' `R-6`/`R-7` rows assert this pass's change set never touches it — so the platform's
  //    `value` REFLECTION is supplied by the battery's own click rather than by growing the shim.
  //    ── `D-127` ADDS `tests/renderer-delivery-compliance.test.ts`, THE AUDIT'S OWN BATTERY, where each of `D-126`'s eleven
  //    findings lands as a row as it is closed; `src/renderer/renderer.ts` is already declared, so the tab terminals' drive
  //    appends nothing for it. **`docs/L2/store-tabs-record/interface.md` AND `strata/brief.md` ARE ABSENT AND THE ABSENCE IS
  //    THE RECORD**: the drive is the WIRING's role and not the module's, so no declared shape moves, and `brief.md`'s `npm
  //    test` figures move IN PLACE on the lines that already carry them.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-141`/`D-142` — THE `focus-retirement` UNIT: the `focus` tool's act moves INTO the tab record and the `['focus']`
  //    mirror family goes WHOLE (`strata/next-steps.md` row `2`, closed). **EIGHTEEN PATHS JOIN THIS UNION AND EACH IS
  //    NAMED WITH THE ARTIFACT IT IS, not admitted by a prefix**: the L1 design, the two state files the instrument writes,
  //    the SEVEN layer documents this unit CREATED, the FIVE it REPLACED IN PLACE, the two `focus` tool batteries it
  //    re-grained, and the ONE e2e battery. **`src/` ADDS NOTHING HERE**, which is a measurement and not an omission: the
  //    TEN files this unit's five passes land (`E-1`…`E-5`) are ALREADY DECLARED ABOVE and are named below so a reader can
  //    check the claim rather than trust it.
  //    THE L1 DESIGN: this unit's own scope — the order neither half may land alone in (§1), the module map claim with the
  //    five map defects it repairs (§2), the `§5.U`-style matrix `F-1`…`F-5` (§4) and the licensed edit list `E-1`…`E-12`
  //    (§6) — whose rev 2 amends §1, §2, §4 and §6 on the two L2 passes' measurement. Every entry below cites it, so it is
  //    declared first (D-141, D-142, D-3).
  'docs/L1/focus-retirement.md',
  //    THE UNIT'S STATE, WRITTEN BY THE INSTRUMENT AND BY NOTHING ELSE (D-99's discipline): the unit file the loop's
  //    instrument creates and advances, and the return envelope its `l1-design` artifact answered with. Neither is hand-
  //    edited from this seat, and both are paths `git status` reports like any other write.
  'strata/.strata/units/focus-retirement.json',
  'strata/.strata/returns/focus-retirement-l1-design.json',
  //    THE FOUR L2 SCOPES THIS UNIT CREATED — one per module whose arrangement the deletion moves, and each named rather
  //    than admitted by a directory prefix (`docs/L2/` carries sixteen other modules' documents this unit never wrote):
  //    `app-shell` (the `view` member's THREE removals in ONE edit — `commitFocus` beside the two ENTAILMENTS the ruling's
  //    own member drags with it, D-112's lockstep rule, `E-3`); `renderer-wiring` (the `focus` route's ONE new body that
  //    composes the record from the tabs client's committed reading and hands it to `window.provident.data.write`, the
  //    four-member carrier's deletion, and `composeRecord` BOOKED rather than hidden — `E-1`, D-136, D-142's settled `(b)`);
  //    `mcp-surface` (the tool keeps its name, its shape and its one invoke seam, and its DESCRIPTION stops naming "the
  //    renderer's focus model" — `E-5`, D-18, D-141); and `focus-model` (the model RETAINED as a design with no `src/`
  //    reader — the disposition row `D-141` left open, D-111).
  'docs/L2/app-shell/interface.md',
  'docs/L2/renderer-wiring/interface.md',
  'docs/L2/mcp-surface/interface.md',
  'docs/L2/focus-model/interface.md',
  //    THE THREE L3 SCOPES THIS UNIT CREATED: `app-shell`'s structure and the exact edit of a two-file surface subtraction
  //    (`E-3`), and `renderer-wiring`'s design with its signatures document beside it — rev 3 being the amendment an L4
  //    `D-45` FAIL forced, because only L3 may name a symbol its own document does not.
  'docs/L3/app-shell/design.md',
  'docs/L3/renderer-wiring/design.md',
  'docs/L3/renderer-wiring/signatures.md',
  //    THE FIVE LAYER DOCUMENTS REPLACED IN PLACE, each for the sentence the deletion falsifies and each traded inside its
  //    own ceiling: the secure crossing's L2 rev 7 (§4's bridge surface route by route with `commitFocus` STRUCK, and the
  //    `read` line that spells the whole answer losing `focus`/`source.focus` with it — `E-4`'s entailment, D-142) with its
  //    L3 design and signatures re-derived beside it; and `store-tabs-record`'s L2 rev 5 with its L3 rev 12, which stop
  //    FORBIDDING the arrangement `D-142` lands — the `data.*` write at `['tabs']`, the client's `order`, and a write
  //    outside `commit`/`remove` (`E-11`, D-136, D-3). Neither document may go on forbidding what the ruling settles.
  'docs/L2/secure-panels/interface.md',
  'docs/L3/secure-panels/design.md',
  'docs/L3/secure-panels/signatures.md',
  'docs/L2/store-tabs-record/interface.md',
  'docs/L3/store-tabs-record/design.md',
  //    THE `focus` TOOL'S OWN TWO BATTERY FILES, RE-GRAINED AND NOT RETIRED: they pin the tool's ROLE BYTES and its ANSWER
  //    SHAPE, and the shape is what moves when the act stops answering the deleted model's `{activeId, entries, opened}`
  //    (`E-5`, `ASM-2`, D-18, D-141). Their terms — the declared arguments, the one invoke seam and the refusals — are
  //    UNMOVED, so each file keeps its claim and can still fail.
  'tests/focus-tool.test.ts',
  'tests/focus-tool-register.ts',
  //    THE E2E BATTERY (§4's matrix): FIVE rows, each an agent-or-drive exchange at a process boundary — the durable act
  //    across a restart, `exactly-one-active` judging the write, the renderer following the tab record's own push, the
  //    deleted family's absence at BOTH its address and its bridge member, and totality over the other three families.
  //    Authored AFTER the `D-30` sweep, so it carries no marker and GATES (D-40). **IT IS THE FILE AND NOT THE DIRECTORY**:
  //    `tests/e2e/focus-retirement/` as a prefix would admit a second battery nobody declared, which is the widening this
  //    row's own header forbids.
  'tests/e2e/focus-retirement/focus-retirement.test.ts',
  //    AND EVERY OTHER PATH THIS UNIT WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM: the
  //    TEN `src/` files its five passes land — `E-1` `src/renderer/renderer.ts`; `E-2` `src/main/view-record/index.ts`,
  //    `src/main/view-surface/index.ts`, `src/shared/view-channels.ts`, `src/renderer/view-client.ts` and
  //    `src/shared/view-shape.ts`; `E-3` `src/main/main.ts` with `src/main/preload.ts` (ONE edit, never two: the `view`
  //    member is declared TWICE); `E-4` `src/renderer/secure-panels.ts` (its lockstep half, in that same edit); and
  //    `E-5` `src/main/mcp-server.ts` — and `src/shared/focus-model.ts` is NOT written at all, because the model is
  //    retained (§7, D-141);
  //    the FIVE `store-view-record` batteries `E-9`'s L2 pass re-grains (`client`, `crossing`, `theme-family`, `zone-family`
  //    and THIS FILE, which takes the module's THREE-root statement and this block); `tests/store-focus.test.ts`, DELETED
  //    WHOLE with the carrier it pinned (`E-6`, D-9's retire-with-its-referent class — a deletion is a path `git status`
  //    reports); `tests/theme-declaration.test.ts`, `tests/theme-act.test.ts`, `tests/pane-drag-compliance.test.ts` and
  //    `tests/fork-store-reads.test.ts`, the four shapes carrying `commitFocus`/`focus` or pinning `mirrorStateOf`
  //    (`E-12`); the three `central-data` batteries (`E-7`, the gating `['focus']` arms re-grained or retired with their
  //    subject) with `docs/L2/central-data/interface.md` (`E-10`, rev 11: the declared-root sentence stops naming a root
  //    that no longer stands); `tests/e2e/store-crossings/crossings-live.mjs` (`E-8`: `V-2`, `V-6` and `V-9` retire with
  //    the family and `V-1`'s prose is re-grained to a DELETED address); `docs/L2/view-record/interface.md` with
  //    `docs/L3/view-record/design.md` (`E-9`) and `docs/L3/store-tabs-record/signatures.md` (the `D-45` comparator's
  //    rev 11 → 12 transcription); the demo bundle the source change rebuilds by its own generator
  //    (`demo/pane-drag-demo/demo.mjs`, D-118); and the corpus — `strata/decisions.md` (`D-141`, `D-142`),
  //    `strata/next-steps.md` (row `2`'s narrowing), `strata/pending.md`, `strata/records/handover.md`,
  //    `strata/marks.json` (REGENERATED by `strata-marks.mjs index`, because a test file is added),
  //    `strata/modules.json` (the `renderer-wiring` row gains the battery's path and §2's five map defects are repaired)
  //    and this file.
  //    **AND THE TREE CARRIES EARLIER PASSES' WRITES THAT ARE NOT THIS UNIT'S, NAMED SO NOT ONE IS ABSORBED SILENTLY.** The
  //    uncommitted set this row reads is the WHOLE LOOP'S since the last gate commit, so nine of its paths belong to rows
  //    that landed before this one: `D-126`'s authored theme tokens (`src/shared/demo-envelope.ts`), `D-127`'s audit battery
  //    (`tests/renderer-delivery-compliance.test.ts`), `D-129`'s pane gate (`tests/host-guard-panes.test.ts`,
  //    `tests/tier4-arbitrary-storage.test.ts`), `D-131`'s overlay toggle (`tests/integration/overlay-application.test.ts`)
  //    and `D-134`'s `1.10.0` bump (`package.json`, `package-lock.json`, `src/main/storeroom.ts`,
  //    `tests/storeroom-surface.test.ts`, `tests/e2e/central-data/scenarios.test.ts`). **EVERY ONE OF THEM IS ALREADY
  //    DECLARED ABOVE** (its own block names it), so the decision here is the one this file's header states: a path already
  //    in the union needs no second spelling, and a second spelling is the duplicate that reddens `B-1`'s set assertion.
  //    None is absorbed by a prefix, none is widened, and not one is declared here for the first time.
  //    **TWO PATHS ARE DELIBERATELY ABSENT AND THE ABSENCE IS THE RECORD**: `strata/proposals.md` (nothing this unit did is
  //    an unasked idea) and `strata/platform.md` (`60/60`, no platform fact moves — the package is read and never modified,
  //    D-5). `strata/records/focus-retirement-unit.md` did not stand at THIS block's head either, and that was a measurement
  //    rather than an omission: the unit's state file read `stage: design` then, so the record its close owed was not yet
  //    written — **THE CLOSE HAS SINCE WRITTEN IT, AND THE `D-143` BLOCK BELOW DECLARES IT**, which is why this sentence
  //    speaks in the past tense and the path is not spelled a second time here (a second spelling is the duplicate that
  //    reddens `B-1`'s own set assertion).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-143` — THE CLOSE-OUT: the unit's own record and the exit walkthrough's record, both written by L0 at the close that
  //    lands `D-141`/`D-142` (`D-143`, `walkthrough.md` §6). **TWO PATHS JOIN THIS UNION AND NEITHER IS ADMITTED BY A PREFIX**;
  //    every other path the close writes is ALREADY DECLARED ABOVE and is named below so a reader can check the claim rather
  //    than trust it. **THIS BLOCK EXISTS BECAUSE THE ROW DID ITS JOB**: both paths were red in `B-1`'s offender list until they
  //    stood here — a path this unit's own record pins is still a path, and an undeclared one is an edit nobody named.
  //    THE UNIT'S OWN RECORD: the artifact `D-5`/`D-52` make the owner of an upstream-owned finding and that this unit's close
  //    owes — §1's one line per module against `E-1`…`E-12`, §2's readings at this head (`npm test` `2,904 passed / 2 skipped`
  //    of `2,906` over `137` files, `typecheck`/`typecheck:tests` `0`, `build` exit `0`, `crossings` `28` rows and `0` failures,
  //    `strata-marks.mjs check` exit `0`), §3's `STALE` walkthrough verdict and the four residuals it names by their owners
  //    (`D-143`). It is declared HERE rather than above because the `D-141`/`D-142` block recorded it as NOT YET WRITTEN at its
  //    own head (`stage: design`), and a record that now stands is a write this union must carry.
  'strata/records/focus-retirement-unit.md',
  //    THE EXIT WALKTHROUGH'S RECORD (`walkthrough.md` §6, §5's verdict): twelve blind documentation steps with their citations
  //    and a `resolved · outcome · guessed` row each, the `docs-insufficient` / `undocumented` / `docs-stale` classes, and the
  //    routing of the currency defect to the OWNING LAYERS with `L0 editing none` — the record of a run that had seen neither
  //    the code nor the design work, which is why it is a file of its own beside the unit's and why the unit is presented as
  //    landed-and-green with the walkthrough still owed rather than as ready (`D-143`, `D-1` §4.1).
  'strata/records/focus-retirement-walkthrough.md',
  //    AND EVERY OTHER PATH THIS CLOSE WRITES IS ALREADY DECLARED ABOVE AND IS NAMED HERE SO A READER CAN CHECK THE CLAIM:
  //    `strata/decisions.md` (the `D-143` row itself), `strata/brief.md` and `strata/proposals.md` (the two citations the
  //    walkthrough's §2 finds — an off-by-one in §6's source count and row `1`'s dead subject — which `D-143` says are L0's
  //    and are closed in its own edits), with `strata/pending.md`, `strata/next-steps.md`, `strata/records/handover.md`,
  //    `strata/marks.json` (regenerated by `strata-marks.mjs index` while a battery is added and one retired, `E-6`) and
  //    `strata/modules.json` each declared on its own block above — so no entry is added for any of them, and
  //    `strata/platform.md` stays absent for the reason the block above gives (`60/60`, no platform fact moves, `D-5`).
  //    **NOTHING THE CLOSE WROTE IS ABSORBED SILENTLY**: the two entries above are the whole of what `B-1` reported outside this
  //    union, and the battery itself is not a new entry because it already stands above — a write is not a claim.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-133`/`D-134` — THE `tier-readout` UNIT, LANDED: a passing `provident.data.read` answer stops carrying a BARE value and
  //    carries the release's own `TieredNode` at EVERY node it returns — an object node `{_tier, …members}` with its members
  //    INLINE, an array node `{_tier, value:[…]}`, a leaf `{_tier, value:<literal>}` — `read` composing `store.readTiered` at ONE
  //    call site, `kind` compiled FROM the node, the `absent` and `DataLedger` arms gaining nothing, and the seam gaining no byte.
  //    `D-133` is the defect row (the user's finding, verbatim — *"The returned object should already include the tier data. If it
  //    doesn't that is a defect."*) and `D-134` is the adoption that answers it at `1.10.0`. **THREE PATHS JOIN THIS UNION AND
  //    NOT ONE IS ADMITTED BY A PREFIX**; every other path this unit writes is ALREADY DECLARED ABOVE and is named at the end of
  //    this block so a reader can check the claim rather than trust it.
  //    THE UNIT'S OWN L1 SCOPE: `docs/L1/tier-readout.md` — the artifact `D-3` files with L1 and no earlier block of this union has
  //    ever carried. Its Status moves DESIGN → LANDED against the composition, §4's `T-1`…`T-8` matrix stops reading RED, §7's
  //    licensed edit list takes each `E`-row's disposition (`E-5`/`E-6`/`E-7` landed, `E-8` OWED at the crossings leg) and §8 stops
  //    forbidding the re-grain it now records as done. It is declared HERE rather than above because the unit was admitted RED-FIRST
  //    at the last gate commit, so its design document was not a path this union had a write to carry (D-133, D-134, D-40).
  'docs/L1/tier-readout.md',
  //    THE UNIT'S E2E BATTERY: `tests/e2e/tier-readout/tier-readout.test.ts` — the eight rows §4 declares (`T-1`…`T-8`), each an
  //    agent-or-drive exchange AT A PROCESS BOUNDARY (an MCP call over the built bundle's stdio, the app's own profile bytes read by
  //    this process, a SECOND boot on the same profile, and once the renderer's own `window.provident.data` member driven inside its
  //    realm), re-grained at this head from the red-first record of the bare-value answer to the node shape. **IT IS THE FILE AND
  //    NEVER THE DIRECTORY**: a declared `tests/e2e/tier-readout/` prefix would admit every battery a later pass drops beside it, and
  //    a `tests/e2e/` file is NEVER marked, so this one gates (D-30, D-40, D-10, D-27).
  'tests/e2e/tier-readout/tier-readout.test.ts',
  //    THE UNIT BATTERY, FILED BY ITS L3 AT THE UNIT GRAIN (`D-143`'s unit discipline, `D-3`'s split): the THREE rows no gating
  //    row drives at a process boundary and therefore not a second reading of one claim — `R-1` the object node whose own member is
  //    named `value` (the shape a key-count discriminator misreads as a leaf, which is why `kind` is compiled from the node's KIND),
  //    `R-2` an open register holding nothing answering the STORE's own `{_tier}` node and never a `{}` this module composed, and
  //    `R-3` the cold arm answering `absent` at `[]` with no tier minted. It is a NEW unmarked file, so it gates; `tests/unit/` is
  //    L3's, which is exactly why this unit's L2 could not file it and this union must carry it by name (D-143, D-3, D-40).
  'tests/unit/central-data/read-node-readout.test.ts',
  //    AND EVERY OTHER PATH THIS UNIT WRITES IS ALREADY DECLARED ABOVE AND IS NAMED SO A READER CAN CHECK THE CLAIM:
  //    `src/main/data/surface.ts` and `src/main/data/types.ts` (the ONE `readTiered` call, the `kind` derivation and the read node's
  //    alias; `D-101`), `src/main/data/index.ts` (the type re-export; `D-103`), `src/main/mcp-server.ts` (`E-4`'s one description
  //    sentence; `D-101`), `tests/e2e/central-data/scenarios.test.ts` (`E-5`'s six leaf-node literals; `D-101`),
  //    `tests/integration/central-data/surface.test.ts`, `tests/integration/central-data/profile-file.test.ts` and
  //    `tests/integration/central-data/registration.test.ts` (`SF-1`…`SF-6`, `PF-1`…`PF-3`, `RG-1`; `D-101`, `D-98`),
  //    `tests/unit/central-data/cold-and-write.test.ts`, `delete-and-journal.test.ts`, `refusals.test.ts` and
  //    `surface-and-profile.test.ts` (the fourteen marked sites re-grained in place; `D-103`), `tests/e2e/focus-retirement/
  //    focus-retirement.test.ts` with `docs/L1/focus-retirement.md` (`E-7`'s `plainOf`, and the same reading inside its own unit's
  //    block above), `docs/L2/central-data/interface.md` (§2's node table, §2a, §9's `H-1`…`H-4` and rev 15's disposition block),
  //    `docs/L3/central-data/design.md` (§1's census, §3's pseudocode and §4's `G13`/`G14`) and `docs/L3/central-data/signatures.md`
  //    (`D-45`'s declared node), all three declared at `D-101`; `strata/marks.json` (`D-93`) and this file (this block).
  //    **NO `strata/.strata/` PATH IS DECLARED HERE BECAUSE `B-1` REPORTED NONE**, which is a measurement and not an omission: the
  //    unit's state file and its `l1-design` return envelope were written EARLIER in this loop and both stand at the LAST GATE
  //    COMMIT, so neither is an uncommitted edit and a declaration for either would be a claim about a path this pass did not write.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-144` — THE `tier-readout` CLOSE'S OWN RECORD, AND IT IS THE WHOLE OF WHAT THIS ROW REPORTED. **ONE PATH JOINS THIS UNION
  //    AND IT IS NOT ADMITTED BY A PREFIX OF ITS NEIGHBOURS**; every other path the close writes is ALREADY DECLARED ABOVE — the
  //    `D-133`/`D-134` block carries the unit's own writes (`docs/L1/tier-readout.md`, its e2e battery, its unit battery and every
  //    re-grained file it names path by path) — so no entry is added for any of them. **THIS BLOCK EXISTS BECAUSE THE ROW DID ITS JOB**:
  //    the path stood red in `B-1`'s offender list, ALONE, and a path THIS UNIT'S OWN RECORD pins is still a path — the unit
  //    discipline `D-143` states, that a unit owns what its own close writes. It is declared HERE rather than inside the unit block
  //    because that block was written at its own head, before the close had run, and a record that now stands is a write this union
  //    must carry rather than one a reader is asked to assume.
  'strata/records/tier-readout-walkthrough.md',
  //    THE UNIT'S EXIT WALKTHROUGH RECORD, and each clause of it is why the file is a path and not a courtesy: §1's ten-step set
  //    with `goal · expected · source` and its citation to the layer document that states it; §2's report, whose
  //    `docs-stale`/`docs-insufficient`/`undocumented` classes name `central-data`'s four documents as the currency debt; §3's
  //    verdict **`STALE`** — the contract is right and the set that states it is not — with its routing to those OWNING layers'
  //    own passes and `L0 editing none`; and §5's instrument note recording what the staged root could not EXECUTE as
  //    **unverifiable, never falsified**. It is the record of a run that had seen neither the code nor the design work, which is
  //    why it stands as a file of its own beside the unit's and why the unit is presented landed-and-green with the currency pass
  //    owed rather than as ready (`D-144`, `walkthrough.md` §5/§6, `D-1` §4.1).
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── REV 7 OF `store-view-record` — THE `pane-drag-temp` UNIT'S `temp` FAMILY (`D-132`, `D-137`, `D-101`). **FOUR PATHS JOIN
  //    THIS UNION AND NOT ONE IS ADMITTED BY A PREFIX**; the unit's `src/` writes and the five `store-view-record` batteries it
  //    re-grains are ALREADY DECLARED ABOVE (`src/main/view-record/index.ts`, `src/main/view-surface/index.ts`,
  //    `src/shared/view-channels.ts`, `src/renderer/view-client.ts`, `src/main/main.ts`, `src/main/preload.ts`,
  //    `src/renderer/secure-panels.ts` and every file under `tests/integration/store-view-record/`), so no second spelling of
  //    any of them is added here — `B-1`'s set assertion refuses a duplicate, which is the difference between a write and a claim.
  //
  //    **AND THE ROW HAD ALREADY REDDENED ON ALL FOUR**, which is why they are here rather than left to a later pass: the four
  //    paths below are what `git status --porcelain --untracked-files=all` reported OUTSIDE this union when this pass opened it.
  //    THE UNIT'S OWN L1 SCOPE: the design this pass transcribes — the two-phase gesture kept, the in-process reading made an
  //    addressable fact at `['drag']` at `temp`, the root DECLARED with no declaration, the six-row e2e matrix and the eight
  //    licensed edits (`D-132`, `D-137`, `D-138`, `D-101`). It is declared by NAME, never as `docs/L1/`, because a prefix admits
  //    every design a later unit drops beside it.
  'docs/L1/pane-drag-temp.md',
  //    THE UNIT'S E2E BATTERY, THE FILE AND NEVER THE DIRECTORY (`P-1`…`P-6`'s six agent-or-drive rows at a process boundary).
  //    A `tests/e2e/pane-drag-temp/` prefix would admit a second battery nobody declared — and a `tests/e2e/` file is NEVER
  //    marked, so this one gates (D-30, D-40, D-10, D-27).
  'tests/e2e/pane-drag-temp/pane-drag-temp.test.ts',
  //    THE UNIT'S STATE, WRITTEN BY THE LOOP'S INSTRUMENT AND BY NOTHING ELSE (`D-99`'s discipline): the unit file the
  //    instrument creates and advances, and the return envelope its `l1-design` artifact answered with. Neither is hand-edited
  //    from this seat, and both are paths `git status` reports like any other write.
  'strata/.strata/units/pane-drag-temp.json',
  'strata/.strata/returns/pane-drag-temp-l1-design.json',
  //    AND EVERY OTHER PATH THIS PASS WRITES IS ALREADY DECLARED ABOVE: `docs/L2/view-record/interface.md` (rev 7 in place — the
  //    fourth family row, the two routes, the four published roots and §8's ten-hunk licence, inside its `150`-line ceiling), the
  //    five batteries (the crossing's THREE new and THREE re-grained rows — the unpaired root, the outside-`temp` delivery, the
  //    seven-site route census, the write census `three → four`, the published set and the lockstep pair — the client's `C-11`, the
  //    zone family's `Z-6` census and this block), `strata/decisions.md` and `strata/modules.json` (the row and the `endpoints`
  //    figure the unit's L1 already moved to `7` — both already dirty at this head and both declared above). **AND
  //    `strata/marks.json` IS ABSENT FOR A MEASURED REASON RATHER THAN BY OMISSION**: no test file is added or removed and no
  //    marker moves, but FOUR gating `it(` rows are (three in `crossing.test.ts`, `C-11` in `client.test.ts`), so the index's
  //    `readings` move — MEASURED at this head: `node scripts/strata-marks.mjs check` exits `1` with `FAIL index readings
  //    disagrees with the sources — run \`index\``, `316` gating sites in `43` files against the index's `312` in `43`. That is a
  //    corpus act this pass does not own and the unit's close owes (`node scripts/strata-marks.mjs index`, `D-107`'s lesson).
  //    `strata/brief.md` is absent because this pass does not write it.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── `D-145` — THE `pane-drag-temp` CLOSE'S OWN TWO RECORDS, AND THEY ARE THE WHOLE OF WHAT THIS ROW REPORTED. **TWO PATHS
  //    JOIN THIS UNION AND NEITHER IS ADMITTED BY A PREFIX OF ITS NEIGHBOURS**: `strata/records/` carries three other units'
  //    records that this unit never wrote, so a declared directory would admit every record a later close drops beside them,
  //    and `B-2`'s undeclared-sibling arm is what would then bite on a file nobody named.
  //    **THIS BLOCK EXISTS BECAUSE THE ROW DID ITS JOB**: both paths stood red in `B-1`'s offender list, ALONE, after the
  //    unit's own writes and its re-grains (`docs/L1/pane-drag-temp.md`, the e2e battery, the two `strata/.strata/` state
  //    files, `strata/decisions.md`, `strata/modules.json` and the re-grained batteries) had all been declared — the unit
  //    discipline `D-143`/`D-144` state, that a unit owns what its own close writes and that a record which now stands is a
  //    write this union must carry rather than one a reader is asked to assume.
  //    THE UNIT'S OWN RECORD: the artifact `D-5`/`D-52` make the owner of an upstream-owned finding and that this close owes
  //    — §1's one line per module against `E-1`…`E-8` (`store-view-record`, `app-shell`/`secure-panels`, `renderer-wiring`,
  //    `central-data`, `demo-panes` and the leaf-node deviation recorded rather than smoothed), §2's readings at this head
  //    (`npm test` `2,928 passed / 2 skipped` of `2,930` over `140` files, all three other legs `0`, `crossings` `0`
  //    failures over `28` rows, marks `319` gating sites in `43` files) and §3's `STALE` walkthrough verdict with the row
  //    its own arm names (`D-145`).
  'strata/records/pane-drag-temp-unit.md',
  //    THE EXIT WALKTHROUGH'S RECORD (`walkthrough.md` §1–§3): ten blind documentation steps with their `goal · expected ·
  //    source` citations, §2's report — whose substance agreed with `src/` and `dist/` byte for byte and whose `docs-stale`
  //    class names five L2/L3 pages plus two corpus rows still asserting the pair's absence, the `view` member at five,
  //    `main()` at eighteen handlers, `viewDeclaredRoots()` at three/four and `G8`'s bare-number predicate — and §3's
  //    **`STALE`** verdict on CURRENCY and never on substance, routed to the owning layers with the loop recommendation
  //    made a rule of the close. It is the record of a run that had seen neither the code nor the design work, which is why
  //    it stands as a file of its own beside the unit's (`D-145`, `walkthrough.md` §3, `D-1` §4.1).
  'strata/records/pane-drag-temp-walkthrough.md',
  //    AND EVERY OTHER PATH THIS CLOSE WRITES IS ALREADY DECLARED ABOVE AND IS NAMED HERE SO A READER CAN CHECK THE CLAIM:
  //    `strata/decisions.md` (the row), `strata/brief.md`, `strata/pending.md`, `strata/next-steps.md`, `strata/marks.json`
  //    (REGENERATED by `strata-marks.mjs index`) and `strata/modules.json` each stand on a block above, so no second
  //    spelling of any is added — a second spelling is the duplicate that reddens `B-1`'s own set assertion.
  //    **NOTHING THE CLOSE WROTE IS ABSORBED SILENTLY**: the two entries above are the whole of what `B-1` reported outside
  //    this union at this head, and `docs/L1/pane-drag-temp.md`, `docs/L2/view-record/interface.md`, the re-grained batteries
  //    and the two `strata/.strata/` state files are not new entries because they already stand above — a write is not a claim.
  // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // ── THE DRAG'S SEAT — `tests/unit/renderer-wiring/preview-seat.test.ts`, AND IT JOINS THIS UNION AS ONE PATH AND NEVER AS A
  //    PREFIX (`tests/unit/renderer-wiring/` would admit every file a later pass drops beside it, and a directory measures
  //    nothing). **THE FILE IS THIS UNIT'S EVEN THOUGH IT SITS UNDER ANOTHER MODULE'S UNIT PATH**: `docs/L3/renderer-wiring/
  //    design.md` §8 records that the drag's seat is measured by NOTHING AT ALL and names this row as the one OWED for it, so
  //    `store-view-record` declares it here rather than leaving the pass that writes it to widen a scope it does not own. A
  //    file no entry above carries is exactly what `B-1` reports as an offender, which is why the entry is added WITH the file
  //    and not after it.
  'tests/unit/renderer-wiring/preview-seat.test.ts',
  // ── THE STATE CHECK'S OWN BATTERY — `tests/unit/renderer-wiring/state-checked-paint.test.ts`, AND IT JOINS THIS UNION AS ITS OWN
  //    ENTRY WITH ITS OWN REASON, NEVER AS A PREFIX OF THE NEIGHBOUR ABOVE (`tests/unit/renderer-wiring/` would admit every file a
  //    later pass drops beside them, and a directory measures nothing). **THE FILE IS `renderer-wiring`'s AND IS DECLARED HERE FOR
  //    THE REASON THE SEAT ABOVE IS**: this row asserts the worktree's edit set against a scope, so every path a pass writes is a
  //    path this union must carry whatever module authored it — and `B-1` reports a new file no entry names as an offender rather
  //    than letting it slide in behind a directory. It is created WITH this entry in the SAME pass and not after it (`D-146`'s
  //    precedent): `D-163`'s battery, `RS-1`…`RS-5`, the first `props.<name>` read-back in the tree and the row that would have
  //    caught `OV-12`/`OV-14`.
  'tests/unit/renderer-wiring/state-checked-paint.test.ts',
  // ── THE `app-envelope` SEAM CENSUS — `tests/unit/app-envelope/live-seams.test.ts`, AND IT JOINS THIS UNION AS ITS OWN ENTRY
  //    WITH ITS OWN REASON, NEVER AS A PREFIX (`tests/unit/app-envelope/` would admit every file a later pass drops beside it,
  //    and a directory measures nothing). **THE FILE IS `app-envelope`'s AND IS DECLARED HERE FOR THE REASON THE TWO ENTRIES
  //    ABOVE ARE**: this row asserts the worktree's edit set against a scope, so EVERY path a pass writes is a path this union
  //    must carry whatever module authored it — and `B-1` reports a new file no entry names as an offender rather than letting
  //    it slide in behind a directory. It is created WITH this entry in the SAME pass and not after it (`D-146`'s precedent).
  //    **ITS SUBJECT IS THE ONE INSTRUMENT `docs/L3/app-envelope/design.md` §5 NAMED AS OWED**: `gutterSeamExample()`'s six
  //    members set-equal to the declared six by name, each one reached through a binding DERIVED from its consumer's call
  //    site (`renderer.ts` five, `demo.ts` four), `dead === []`, and the census's own plantable control — the property that
  //    makes a fourth dead member unrepresentable rather than a hand census taken after the fact (`F8`, `D-168`, `D-169`).
  //    `strata/modules.json`'s `app-envelope` row claims the path in the same pass, so the map and this union agree.
  'tests/unit/app-envelope/live-seams.test.ts',
  // ── `renderer-wiring`'S TRANSCRIPTION PIN — `tests/unit/renderer-wiring/signatures.test.ts`, AND IT JOINS THIS UNION AS ITS OWN
  //    ENTRY WITH ITS OWN REASON, NEVER AS A PREFIX OF THE TWO ENTRIES ABOVE (`tests/unit/renderer-wiring/` would admit every file a
  //    later pass drops beside them, and a directory measures nothing — `B-2`'s undeclared-sibling arm is what bites when one is
  //    dropped without a name). **THE FILE IS `renderer-wiring`'s AND IS DECLARED HERE FOR THE REASON `preview-seat` AND
  //    `state-checked-paint` ARE**: this row asserts the worktree's edit set against a scope, so EVERY path a pass writes is a path
  //    this union must carry whatever module authored it, and it is created WITH this entry in the same pass (`D-146`'s precedent),
  //    never after it. **ITS SUBJECT IS THE INSTRUMENT GAP `D-170` NAMED**: no row pinned this module's signature transcription —
  //    `C-7` pins the *tabs* page and nothing pinned this one — so `signatures.md`'s `transcribing \`design.md\` rev N` claim and
  //    `design.md`'s `**Rev:** N` are compared, with a synthetic control in both directions and a parse control that answers `null`
  //    rather than comparing equal (`D-45`, `D-46`, `D-26`). `strata/modules.json`'s `renderer-wiring` row claims the same path in
  //    the same pass, so the map and this union agree.
  'tests/unit/renderer-wiring/signatures.test.ts',
  // ── THE CASUALTY'S OWN INSTRUMENT — `tests/e2e/bundle-boot-seam/boot-contract.test.ts`, AND IT JOINS THIS UNION AS ITS OWN
  //    ENTRY WITH ITS OWN REASON, NEVER AS A PREFIX (`tests/e2e/bundle-boot-seam/` would admit every battery a later pass drops
  //    beside it, and a directory measures nothing; a `tests/e2e/` file is NEVER marked, so this one gates — `D-30`, `D-40`).
  //    **THE BATTERY IS `bundle-boot-seam`'s AND IS DECLARED HERE FOR THE REASON THE THREE ENTRIES ABOVE ARE**: this row asserts
  //    the worktree's edit set against a scope, so EVERY path a pass writes is a path this union must carry whatever module
  //    authored it — and `B-1` reports a path no entry names as an offender rather than letting it slide in behind a directory
  //    (`D-146`'s precedent: the entry is added WITH the edit that dirtied the path, never after it).
  //    **ITS SUBJECT IS `D-173`'S FIRST RECOMMENDATION, TAKEN** — that row measured that the booting batteries cannot diagnose
  //    their own casualties: stderr is piped and then DROPPED on the connect path, and the child's exit code and signal are
  //    computed and swallowed by the SDK, so `-32000` cannot tell an OOM `SIGKILL` from an `exit 1`. The four booting files now
  //    set `transport.onerror` BEFORE `connect` (so the SDK's wrapper preserves it), record the child's `close` `{code,
  //    signal}`, and throw a `cause`-carrying error naming the stderr tail; and THIS file's unconditional `npm run build` in
  //    `beforeAll` became CONDITIONAL on the artifact set being ABSENT, the form its two siblings already use — the change
  //    that stops this battery opening the `~54 ms` `dist/` window `arrangement.test.ts:90`–`:105` measures.
  //    **NO PRODUCT BYTE MOVES AND NO ASSERTION MOVES**: this is the instrument being made able to speak, not the app.
  'tests/e2e/bundle-boot-seam/boot-contract.test.ts',
  // ── THE RESIDUE PAGE'S OWN DISCHARGE — `docs/L3/app-envelope/design.md`, AND IT JOINS THIS UNION AS ITS OWN ENTRY WITH ITS OWN
  //    REASON, NEVER AS A PREFIX OF THE NEIGHBOUR ABOVE (`docs/L3/` would admit every design a later pass drops beside it, and a
  //    directory measures nothing). **THE FILE IS `app-envelope`'s AND IS DECLARED HERE FOR THE REASON THE FOUR ENTRIES ABOVE ARE**:
  //    this row asserts the worktree's edit set against a scope, so EVERY path a pass writes is a path this union must carry whatever
  //    module authored it — and the entry is added WITH the edit that dirtied the path, never after it (`D-146`'s precedent).
  //    **ITS SUBJECT IS THE ONE ROW `D-174`'S FOLLOW-UP PASS RE-GRAINED, AND NOTHING ELSE MOVES ON THE PAGE**: §5's row that listed
  //    `docs/L3/renderer-wiring/design.md:108` as **OWED** now reads **DISCHARGED AT THAT PAGE'S REV 17**, because that page's rev 17
  //    re-grained the sentence to what the tree measures and cited `D-171` at the site — so the obligation the row carried was met by
  //    the page that owned it, and the row states the discharge instead of an instruction (`D-171`, `D-174`'s residue (iii), `D-46`).
  //    The page's own rev moved to `4` for that one row; no export, id, count, hunk or guardrail of the module moves with it, and no
  //    `strata/` byte does either — which is why this is a DOCUMENT's entry and not a module's. **IT IS THE LAST ENTRY THIS UNION IS
  //    OWED**: `B-1` reported this path as its ONE offender on this tree, so the row is green on the dirty tree only because the path
  //    stands here, and a prefix declared in its place would admit a page nobody named.
  'docs/L3/app-envelope/design.md',
  // ── `app-shell`'S TRANSCRIPTION PAGE — `docs/L3/app-shell/signatures.md`, AND IT JOINS THIS UNION AS ITS OWN ENTRY WITH ITS
  //    OWN REASON, NEVER AS A PREFIX OF THE NEIGHBOUR ABOVE (`docs/L3/app-shell/` would admit every page a later pass drops
  //    beside it, and a directory measures nothing — `B-2`'s undeclared-sibling arm is what bites when one is dropped without a
  //    name). **THE FILE IS `app-shell`'s AND IS DECLARED HERE FOR THE REASON THE FIVE ENTRIES ABOVE ARE**: this row asserts
  //    the worktree's edit set against a scope, so EVERY path a pass writes is a path this union must carry whatever module
  //    authored it — and the entry is added WITH the edit that dirtied the path, never after it (`D-146`'s precedent; the
  //    sentence above that called `app-envelope`'s page *"the last entry this union is owed"* is that page's own reading at
  //    its date and is read THROUGH this entry rather than reworded, `D-46`).
  //    **ITS SUBJECT IS THE MODULE'S FIRST TRANSCRIPTION PAGE**: `app-shell`'s design went to rev 5 for the window and the
  //    menus route's main half and this page was CREATED (`D-45`'s declared-names form) because the pass mints a signature of
  //    its own — the bridge's tenth member `menu`, the one channel constant `IPC_MENU_ROLE` in `src/main/store-channels.ts`
  //    whose own census moves `2 → 3`, the two role sets and the ONE `ipcMain.handle` admitting eleven and refusing seven
  //    (`D-195`, `D-196`). `docs/L3/app-shell/design.md` stands declared above; this page did not, so `B-1` red the path BY
  //    NAME until this entry did (`D-195`'s OWED-8) — which is the precondition, not a defect.
  'docs/L3/app-shell/signatures.md',
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
 *  which is exactly as much of an edit as a write.
 *
 *  **`--untracked-files=all` IS PART OF THE INSTRUMENT** (`focus-retirement`'s measurement): without
 *  it git collapses a wholly untracked directory into one line that names no FILE
 *  (`docs/L2/app-shell/`), and the only scope that can satisfy such a reading is one that declares
 *  the DIRECTORY — which would admit every file a later pass drops under it, measured by nothing.
 *  With it, each new file is its own entry: a `focus-retirement` pass that creates seven documents
 *  in five directories owes seven declarations, and a NEW filename in a directory this union already
 *  carries reds by name rather than sliding in behind a prefix. */
function editSetFromWorkingTree(): readonly string[] {
  let out: string
  try {
    out = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd: REPO_ROOT, encoding: 'utf8' }) as unknown as string
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
    //     AND THE SAME BITE ONE LEVEL OUT, ON THE FORM `focus-retirement` WAS TEMPTED BY: a DIRECTORY carries no entry
    //     here, so a second document dropped beside the four this unit declares is an offender by name — which is what
    //     `--untracked-files=all` makes visible and what a declared `docs/L2/app-shell/` prefix would have hidden.
    expect(editSetIsSubset(['docs/L2/app-shell/protocol.md'], DECLARED_SCOPE).ok, 'a declared FILE admits no undeclared sibling').toBe(false)
    expect(editSetIsSubset(['docs/L2/app-shell/'], DECLARED_SCOPE).ok, 'and no directory spelling of a declared file is admissible either').toBe(false)
    // (c) THE DECLARED SET IS ADMITTED WHOLE — the instrument is not simply always-red, which is how a boundary row lies.
    expect(editSetIsSubset(DECLARED_SCOPE, DECLARED_SCOPE).ok, 'every declared path is admissible, so the assertion has two arms').toBe(true)
  })

  it('B-3 · THE READING IS THE TREE\'S AND NOT A LIST — the edit set is read from `git status --porcelain --untracked-files=all` over the whole repository, so a pass that edits a path and forgets to declare it reddens `B-1` rather than reporting a clean scope', () => {
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
