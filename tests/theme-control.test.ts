// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
// tests/theme-control.test.ts
// ===========================================================================
// U-THEME-CONTROL · wave `F` · ledger row `F1` · **THE RED SET** (`RCA-1`, `§4`)
//
// Contract: `docs/specs/theme-control.md` (FILED 2026-09-27, APPROVED at the spec gate as filed,
// all three `§7a.1` defaults confirmed). This file is the artifact `§4.1` pins **BY PATH**:
// *"THE FILE IS `OWED` AND ITS PATH IS `tests/theme-control.test.ts`"* — and `§5.1` row 13
// repeats it. The pinned module/envelope paths are `§5.1` rows 11/12: the authored card block in
// `src/shared/demo-envelope.ts` and ONE bounded WIRING role in `src/renderer/renderer.ts`.
//
// **AUTHORED FROM THE CONTRACT ALONE** (`§4.3`, `§4.4 S-TC-1`): every constant, expectation and
// probe below traces to a clause of `docs/specs/theme-control.md` — `CURRENT STATE`, `§0`/`§0A`,
// the Layer declaration, `§1` (with its ENFORCEABLE boundary falsifier), `§2.1`–`§2.5`, `§3.1`
// (`M-1`…`M-9`), `§3.2` (`F-1`…`F-8`), `§3.3` (`I-1`…`I-10`), `§3.4` (`R-1`…`R-9`), `§3.5`
// (`X-1`…`X-5`), `§4`, `§5.1`, `§5.2`, `§5.3`, `§5.U`, `§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3` and
// `§6`–`§8`. **NOTHING here is authored from the landed bytes of an implementation**: the control
// does not exist (`CURRENT STATE` item 1), and every card-dependent row fails as a LABELLED
// ASSERTION naming what the implementer owes — never as a harness `TypeError`/`ReferenceError`.
//
// LAYER: **[T] + `static` + `[H]`-by-source-read — the node envelope only.** No row below asserts a
// rendered geometry, a computed style, an applied declaration, an attribute/class presence, a
// stylesheet reaction, a pixel or an OS reading (`§2.4` item 4, `§3.3 I-6`, `§3.4 R-8`,
// `§5.U U-6`). The elements here are plain object doubles, the "runtime" is an argument-supplied
// recording double, and a sink-call green is NOT a live green.
//
// **THE `[U]` ROWS ARE NOT AUTHORED HERE, AND THAT IS DELIBERATE** (`§4.2` item 6): `M-5`, `M-9`,
// `F-4`, `F-5`, `F-6`, `R-7` are `[U]` claims whose instrument is `npm start` +
// `npm run mcp -- --target http --port 3787 …` (`§5.2` legs 6/7 — THE DECLARED GATE-6 BATTERY,
// which is the battery's and NOT this file's). `§5.U`'s eight rows are the live gate's delta
// matrix; **NO `§5.U` battery scenario is authored as a test here** (the declaration row `DECL-1`
// below pins that refusal by scanning this file's own titles), and the whole live battery is
// `waived`-forbidden (`§4.4 S-TC-3`) — the word appears nowhere as a claim.
//
// THE REGISTER (`§5.5.1`): `11` typed rows, declared total **`97`** = `12 + 8 + 10 + 12 + 6 + 2 + 2
// + 3 + 18 + 12 + 12` (chain `12 → 20 → 30 → 42 → 48 → 50 → 52 → 55 → 73 → 85 → 97`; family
// subtotals `IM 48` · `SM 4` · `TP 45`); caps `≤100`/row · `≤400` total · **stop-after-5-consecutive
// -failures**; exhaustive enumeration, so **no seed is claimed and none is added**; every declared
// term is a DRIVE count with its assertions printed BESIDE it; **an un-run row is reported as a
// FAILURE, never a pass** (`§4.4 S-TC-6`). The honesty block's checkable halves (`§5.5.2` items 2/3
// and item 8's cross-row readings) are executed as harness rows.
//
// GAPS REPORTED RATHER THAN INVENTED (`§4.3`; the family's `S-10` rule) — three, each with its
// clause, its reason and what was authored instead:
//   GAP-1 `§2.1` item 4 / `§2.4` item 1 — **the WIRING role's identifier/export is UNPINNED**: the
//         contract names "ONE bounded renderer-WIRING role (the attribute-name holder)" but no
//         export name, so the `§3.1 M-7` drive ("drive the role against a recording element
//         double") cannot reach a production seam without inventing one. Authored instead: a
//         static probe for a theme-named wiring role in `src/renderer/renderer.ts` (the unit's own
//         CHARTER word, `§2.2`(B) row 1(c)) plus the caller-held name constant and the
//         write-inventory reading over that role's bytes — `M-7`/`R-1`/`P-TC-TP-4` (ii).
//   GAP-2 `§3.1 M-8` / `§5.5.1 P-TC-IM-3` — the caller-site ECHO RULE's seam is equally unpinned
//         (`§2.1` item 4 says the rule "is READ BY NO CONTRACT ROW OF THIS UNIT"), so the `10`
//         name shapes are driven against the DECLARED rule table (the sibling's verbatim-echo/null
//         rule, `§0` ruling 14 — NEVER re-spelled into a second authority, `§2.1` item 4) with the
//         wiring's no-normalisation reading asserted beside them. This harness rule is a test-side
//         double, not an implementation.
//   GAP-3 `§5.5.1 P-TC-IM-1` shape (12) — the carried value for an argument whose `String()` THROWS
//         (a revoked/throwing `Proxy`) is not pinned (`''` written vs no write at all). The row
//         asserts the pinned half (no throw, at most one mutation, never a MINTED token) and
//         accepts either carry.
//
// ⟶ ONE CONTRACT DEFECT FOUND AND REPORTED, NOT WORKED AROUND: `§5.5.2` item 3's closing sentence
// prints the second differing row as "`P-TC-TP-4` (`10`/`9`)" while its OWN table, and `§5.5.3`'s
// distinct term line, print `P-TC-TP-4` declared `12` / distinct `9`. The harness row `R-H4` pins
// the TABLE's figures (`12`/`9`, distinct sum `90`) and prints the discrepancy beside it
// (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` forbids a silent rewrite). No term, id or cap moves.

import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { demoEnvelope } from '../src/shared/demo-envelope.js'
import { ProvidentMcpServer } from '../src/main/mcp-server.js'
import { groupForTool } from '../src/main/security.js'

// ---------------------------------------------------------------------------
// §5.1 rows 11/12/13 + §4.1 — the pinned paths this file reads
// ---------------------------------------------------------------------------
const TEST_PATH = fileURLToPath(import.meta.url)
const REPO_ROOT = dirname(dirname(TEST_PATH))
const ENVELOPE_PATH = 'src/shared/demo-envelope.ts' // §5.1 row 11 (ALLOWED, authored data only)
const RENDERER_PATH = 'src/renderer/renderer.ts' // §5.1 row 12 (ALLOWED, one wiring role)
const INDEX_PATH = 'src/renderer/index.html' // §5.1 row 8 (DENIED — the appearance authority)
const CLI_PATH = 'scripts/mcp-cli.mjs' // §3.5 X-2's shipped command surface
const SPEC_PATH = 'archive/gate-corpus-2026-10-29/specs/theme-control.md' // the contract
const DESIGN_SKILL_PATH = 'docs/skills/designing-pages.md' // §3.4 R-9 / §3.5 X-5 (absent)
const ENGINE_PIN_PATH = 'tests/engine-pin-version.test.ts' // R-3's pinned name set
const UI_LEG_CONTRACT_PATH = 'tests/ui-leg-contract.test.ts' // the landed script-key pin

function readSource(relPath: string): string | null {
  const abs = join(REPO_ROOT, relPath)
  return existsSync(abs) ? readFileSync(abs, 'utf8') : null
}
function sourceOrEmpty(relPath: string): string {
  const s = readSource(relPath)
  return s === null ? '' : s
}
function readPkg(): Record<string, unknown> {
  const raw = readSource('package.json')
  return raw === null ? {} : (JSON.parse(raw) as Record<string, unknown>)
}

// ---------------------------------------------------------------------------
// §2.1 items 1–4, §2.2(D) — the DECLARED authored surface, by name
// ---------------------------------------------------------------------------
const CARD_ID = 'theme-card'
const DARK_ID = 'theme-dark'
const LIGHT_ID = 'theme-light'
const STATE_ID = 'theme-setting'
const HANDLER_NAME = 'theme-set'
const HANDLER_EVENT = 'click'
const CARD_CLASS_MEMBERS = ['card', 'btn', 'theme-setting'] // §2.1 item 1 (the three css.classes)
const TOKEN_DOMAIN = ['dark', 'light'] // §2.1 item 3 — CLOSED AT TWO, demo data
const DECLARED_ID_SET = [CARD_ID, DARK_ID, LIGHT_ID, STATE_ID] // four ids across FIVE nodes
const PRE_CENSUS = 18 // §3.5 X-1 — the filing-time authored census
/* ── THE CENSUS RE-GRAIN, LANDED 2026-10-11 (`C-6`; `RCA-8(d)`; `T2`'s contract
 *  `docs/specs/store-tabs-record.md` `§5.5.2` item 3 / `§5.1` item 2 / `§7c` `AMB-5`). ──────
 *  **THE AS-FILED PAIR, IN ITS OWN BYTES (kept visible, never silently rewritten):**
 *      const POST_CENSUS = 23 // §3.1 M-2 — 18 + 5
 *      const CENSUS_DELTA = 5
 *  **AND IT IS SUPERSEDED IN SUBSTANCE — THE ENVELOPE NOW MEASURES `25`.** `T2`
 *  (`U-STORE-TABS-RECORD`) authored the TWO declared page nodes (`tabs-landing-page` /
 *  `tabs-error-page`, `§0A` item 5 / `§6` `PAR-9`) into `src/shared/demo-envelope.ts` — the
 *  file `§5.1` item 2 licenses for *"TWO authored page nodes ONLY"* — so the authored-object
 *  census moved by EXACTLY that unit's declared delta. **`T2` DECLARED the drift and named
 *  the owner rather than performing it silently, and DELIBERATELY PRINTED NO POST FIGURE**
 *  (`AMB-5`: *"THE FIGURE IS DELIBERATELY NOT PRINTED"* — a spec filing may not project an
 *  envelope measurement; `EVIDENCE-ROW-MUST-OBSERVE-WHAT-IT-PRINTS`). **THIS RE-GRAIN IS THE
 *  MEASUREMENT THAT WAS OWED:** `T2`'s `§7b` item 5 / `§5.1` item 7 name
 *  `tests/theme-control.test.ts` as the cell whose *"four rows that read it"* re-grain at
 *  *"the unit that touched the envelope"* — this pass. **THE DECOMPOSITION, PRINTED WITH ITS
 *  TERMS: `18` (filing time) `+ 5` (the theme card, `18 + 5 = 23`) `+ 2` (the pair of `T2`
 *  page nodes) `= 25`.** **THE BITE IS KEPT AND MADE ATTRIBUTED:** the census rows below assert
 *  the DELTA (not only the figure), so a count that moves for an UNDECLARED reason reddens
 *  instead of being re-spelled. */
/* ── ⟶ THE THIRD TERM, LANDED 2026-11-05 (`D-113`): THE OVERLAY'S THIRTEEN AUTHORED NODES. ──────
 *  `D-113` authors the app's ONE modal surface into `src/shared/demo-envelope.ts` — the user's ruling, verbatim:
 *  *"The overlay is used to contain UI elements that should block general app access while open, ex. security tools
 *  and other configuration settings"*. The nodes are: the authored app root, its opener, the scrim, the dialog card,
 *  the dialog's heading, its TWO authored panes with one hint and one status node each, the state carrier and the
 *  close control — **THIRTEEN objects, and the census moved by EXACTLY that number: `25 + 13 = 38`.**
 *  **THE BITE IS KEPT AS IT WAS MADE:** the delta was asserted as the SUM OF ITS THREE DECLARED TERMS at `D-113`'s
 *  landing (it is **TEN** at this head — the block below adds the fourth term `35`: the interface inventory's `34` plus the
 *  layout's measured-figures carrier, then the fifth term `1`: the add-tab control, then the sixth term `1`: the
 *  application's NAME NODE, then the seventh term `4`: the four zone strips, then the eighth term `10`: the two
 *  pane-move grips with their eight drops, then the ninth term `7`: the SECOND ZONE-RESIDENT PANE with its grip, its
 *  four drops and its strip, then the TENTH **STANDING** term `7`: the PANE CONTROL BAR's three `pane-head` rows, three
 *  `pane-collapse` controls and one `inspector-body`
 *  — **while the ORDINAL tenth term, the relocation ghost `#pane-ghost`'s `1`, is RETIRED WITH ITS NODE**
 *  (the headstone below), so a term can LEAVE this sum as well as join it — and the ORDINAL (`D-258`'s ghost was the
 *  tenth term ever declared) and the STANDING count (`10` deltas at this head) are two different numbers, stated here so
 *  a reader does not read the headstone as a re-opening — so a count that moves for an
 *  UNDECLARED reason — an element authored into the envelope by nothing at all — reddens here as well as at the figure.
 *  THE AS-FILED FORM (`18 -> 23`, then `-> 25`) stays visible above and beside. */
const POST_CENSUS = 103 // as filed `23`; `25` at T2; `38` at D-113; `73` at the carrier's landing; `75` at the name node's; `79` once the four zone strips landed; `89` once the two move grips and their eight drops landed; `97` while the SECOND ZONE-RESIDENT PANE's subtree stood beside the relocation GHOST; `96` once the ghost was DELETED WHOLE with its ordinal term; measured `103` = 18 + 5 + 2 + 13 + 35 + 1 + 1 + 4 + 10 + 7 + 7 (the NINTH term's `7` = the SECOND ZONE-RESIDENT PANE `pane-inspector`'s subtree, and the TENTH STANDING term's `7` = the PANE CONTROL BAR's three `pane-head` rows, three `pane-collapse` controls and one `inspector-body`) — **the ORDINAL tenth term's `1` is GONE WITH ITS NODE, because `#pane-ghost` was DELETED WHOLE when the drag preview became the real panes re-arranged through the engine's `move` op** (see the headstone below: the ghost drew a picture of what the panes themselves now stand in)
const CENSUS_DELTA = 5 // the theme card's own FIVE authored nodes (UNMOVED by this re-grain)
/** **THE OVERLAY'S DECLARED AUTHORED-OBJECT DELTA** (`D-113`) — the thirteen nodes named in the block above. */
const OVERLAY_AUTHORED_DELTA = 13
/* ── ⟶ THE FOURTH TERM, RE-GRAINED `34 → 35` (`docs/L3/app-envelope/design.md` **rev 6** `A-8`; `D-203`, `D-204`):
 *  THE INTERFACE INVENTORY'S THIRTY-FOUR AUTHORED NODES **PLUS THE LAYOUT'S MEASURED-FIGURES CARRIER**. ──────
 *  **THE TERM COUNTS TWO DECLARED BILLS AND THIS CONSTANT NAMES BOTH** (`D-26`: a figure never stands bare, it is
 *  named for what it counts). **Rev 5's bill** is the authored skeleton (`S-2`/`S-9`): the top-bar, the tabs row, the
 *  row prototype, the four zone nodes, the arrangement container, the stage, the menus pane, its handle, the four
 *  menus, the eighteen items and the receipt carrier — **THIRTY-FOUR nodes**, `design.md` rev 5 §2's table, node for
 *  node. **Rev 6's bill is ONE node and `A-8` is its whole hunk**: `LAYOUT_MEASURED_ID = 'layout-measured'`, a `span`,
 *  the stage's LAST child, carrying `css.id` + `props.id` + an authored `display: 'none'` and **NO `content`** — the
 *  carrier the paint's self-report writes its measured figures into and `AL-12` reads (`D-174`, `D-177`, `D-208`).
 *  `34 + 1 = 35`, and the design's own bill names the same sum: *"the row needs a FOURTH declared term of `35` before
 *  it can be green"* (`design.md` rev 6 §8, `D-193`'s prediction re-grained by `D-204`).
 *  **THE FIGURE IS COUNTED OFF THE TREE, NEVER QUOTED FROM THE DESIGN** (`D-26`: every figure its owner's), and it
 *  was RE-COUNTED at this landing pass: the `demoEnvelope()` traversal reads `79` = root `1` + the overlay layer `11`
 *  (scrim `1` + dialog `10`) + the row prototype `1` + `app-surface`'s `66`, and `app-surface`'s `66` is itself `1`
 *  (the root) + the top-bar `4` (bar + **the name node `#app-name`** + tabs row + **the add-tab control `+`**) + the `top` zone `26` (zone `1` + the menus pane `1` + its handle `1`
 *  + the four menus `4` + the eighteen items `18` + the receipt carrier `1`) + **`#zone-top-horizontal` `1`** + the arrangement `31` (container `1` +
 *  `left` `1` + **`#zone-left-vertical` `1`** + the stage `26` = the landing page `23` (page `1` + the `h1` `1` + counter `6` + gutter `6` + echo `4`
 *  + theme `5`) + the error page `1` + **the measured-figures carrier `1`** + **`#zone-right-vertical` `1`** + `right` `1`) + **`#zone-bottom-horizontal` `1`** + `bottom` `1` + the
 *  opener `1`. `79 - 44 = 35` — the filing figure and the SIX terms other than the fourth stand for `44`
 *  (`18 + 5 + 2 + 13 + 1 + 1 + 4`), and what they leave is the fourth term's `35` — and the SEVEN terms summed to the figure
 *  at that head: `18 + 5 + 2 + 13 + 35 + 1 + 1 + 4 = 79`. THE WALK MOVED BY EXACTLY FOUR NODES AND SAID WHERE, AS IT DID FOR THE `+` AND THE
 *  NAME: the top-bar read `4` and `app-surface` read `62` before the four strips landed (`3`/`61` before the name node,
 *  `2`/`60` before the `+`), the arrangement read `29` before the two strips in its row landed, and no other subtree's
 *  figure moves. **THAT WALK IS THE `79` HEAD'S AND IS KEPT AS TAKEN; THE WALK OF RECORD IS THE TENTH STANDING TERM'S BLOCK
 *  BELOW**, which re-takes it off the tree at `103` and says where each of the movers since `79` stands — including the one
 *  node the ordinal tenth term spent and then gave back (`#pane-ghost`, RETIRED WHOLE with its term), and the seven the
 *  pane control bar landed — the ninth term's block ABOVE keeping the `96` reading as THAT head took it, so a reader can
 *  follow the walk forward term by term rather than from a figure that was re-spelled.
 *  **THE BITE IS KEPT AS IT WAS MADE:** the drift is still asserted as the SUM OF ITS DECLARED TERMS — **TEN at this
 *  head**, the ninth being the second zone-resident pane's `7` and the tenth standing being the pane control bar's `7`,
 *  with NO term for the ghost, since its `1` is retired with its node — so a node authored into the envelope by NOTHING
 *  reddens at the figure AND at the sum, and `M-2`'s / `X-1`'s
 *  residue rows still name the one term each of them leaves standing. **AND THE COUNT OF TERMS IS NOT ITSELF A CLAIM**
 *  (`D-26`, `D-43`): the census's shape is ONE TERM PER LANDING THAT AUTHORED NODES, so a further authoring landing adds
 *  a further term in the pass that authors it — **and a landing that DELETES a node retires the term it spent, in the pass
 *  that deletes it, which is what the ordinal tenth's headstone records** — and a node arriving with NO term of its own is exactly
 *  what the figure, the sum and the residue catch together. THE EARLIER FORMS (`18 -> 23`, `-> 25`, `-> 38`, `-> 72` at the term's `34`,
 *  `-> 73` once the carrier landed, `-> 74` once the add-tab control landed, `-> 75` once the name node landed,
 *  `-> 79` once the four zone strips landed) stay
 *  visible above and beside. */
/** **THE FOURTH TERM'S SECOND COMPONENT, NAMED** (`docs/L3/app-envelope/design.md` rev 6 §2, hunk `A-8`; `D-203`,
 *  `D-204`): **THE LAYOUT'S MEASURED-FIGURES CARRIER — ONE authored node.** `LAYOUT_MEASURED_ID = 'layout-measured'`, a
 *  `span`, the stage's **LAST** child, carrying `css.id` + `props.id` + an authored `display: 'none'` and **NO
 *  `content`** (`D-174`: empty until a real realm measures); it is the node `renderer-wiring`'s `reportMeasuredFigures`
 *  writes its `id.property=value` text into and `AL-12` reads. **IT IS NAMED HERE AND NOT COUNTED AS A BARE FIGURE**
 *  (`D-26`): a reader must be able to say which node the `1` is, and the tree's own walk says it — the stage's `26` is
 *  the landing page's `23` + the error page's `1` + THIS node's `1`. */
const LAYOUT_MEASURED_CARRIER_DELTA = 1 // `layout-measured`, the stage's last child (`A-8`)
/** **THE FOURTH TERM'S FIRST COMPONENT** (`docs/L3/app-envelope/design.md` **rev 5** §1/§2; `D-176`–`D-193`): the
 *  interface inventory's **THIRTY-FOUR** authored skeleton nodes — the top-bar, the tabs row, the row prototype, the four
 *  zone nodes, the arrangement container, the stage, the menus pane, its handle, the four menus, the eighteen items and
 *  the receipt carrier, node for node. Rev 6 moves none of them (`A-8`: *"NOTHING ELSE MOVES"*). */
const INTERFACE_INVENTORY_NODE_DELTA = 34 // the interface inventory's THIRTY-FOUR authored nodes (design rev 5 §2)
/** **THE FOURTH DECLARED TERM ITSELF — THE SUM OF ITS TWO NAMED COMPONENTS**, never a bare figure (`D-26`, `D-43`):
 *  the interface inventory's `34` PLUS the layout's measured-figures carrier's `1` = **`35`**, which is what the census
 *  rows add — beside `18 + 5 + 2 + 13` and beside the fifth and sixth terms' `1` each below — to read `75`. The `34 → 35`
 *  re-grain is `D-204`'s and that landing pass's; the two components stay separately visible so a moved part still reddens
 *  the figure AND the sum. **NEITHER THE FIFTH NOR THE SIXTH TERM IS FOLDED IN HERE** and the blocks below say why. */
const LAYOUT_AUTHORED_NODE_DELTA = INTERFACE_INVENTORY_NODE_DELTA + LAYOUT_MEASURED_CARRIER_DELTA
/* ── ⟶ THE FIFTH DECLARED TERM — THE SEVENTH NAMED PART OF THE FIGURE — LANDED WITH THE `+` CONTROL: ──────
 *  **THE ADD-TAB CONTROL, ONE AUTHORED NODE.** **WHAT THE `1` IS, IN THIS CENSUS'S OWN VOCABULARY** (`D-26`: a figure
 *  never stands bare — a reader must be able to say which node the `1` is): the ADD-TAB CONTROL, `TABS_ADD_NODE_ID =
 *  'tab-add'`, the top bar's `+` — ONE authored node carrying `css.id` + `props.id`, a STATIC `content: '+'` and one
 *  `handlers` entry (`tab-add-act`/`click`, a declared no-op the wiring installs over). It is the control that offers
 *  the act nothing in the interface offered (`provident.focus` with `newTab: true` had none behind it), and its home is
 *  the top bar's children **BESIDE `#tab-rows` AND NEVER INSIDE IT**: the rows are MINTED into `TABS_ROWS_ID` and a mint
 *  REPLACES that row set (`D-201`'s shape), so a control authored inside it would be wiped on the next `['tabs']`
 *  delivery. That placement is WHY it is a part of its own and not an addition to the top bar's line in the walk — the
 *  walk above already counts it, one node, where it stands.
 *  **WHY IT IS ITS OWN TERM AND NOT A MEMBER OF THE FOURTH** (the question this block answers rather than assumes, and
 *  the reason `75` is `18 + 5 + 2 + 13 + 35 + 1 + 1` and not `18 + 5 + 2 + 13 + 36 + 1`): every term above is ONE AUTHORING
 *  LANDING'S OWN DECLARED BILL, and NONE of them counts this node. The fourth term's `34` is
 *  `docs/L3/app-envelope/design.md` **rev 5** §2's node-for-node inventory, whose rev 6 hunk `A-8` says in its own bytes
 *  *"NOTHING ELSE MOVES"*, and its `1` is `A-8`'s measured-figures carrier alone; the `+` is authored by a LATER landing
 *  that no design bill counts yet. Folding it into that `34` would RESTATE another layer's count to absorb a mover this
 *  pass authored — the exact shape `D-26`/`D-43` forbid (a figure is its owner's) and the exact shape `C-6` was written
 *  to redden. **SO THE DESIGN'S BILL IS REPORTED, NOT PATCHED** (`D-3`, `D-5`: upstream-owned): the tree now measures
 *  `36` authored nodes against rev 6's inventory of `35`, and that staleness is the design page's to re-take.
 *  **THE BITE IS KEPT:** the term is ONE constant added to every sum on the same line, so the figure, the sum and the
 *  residue move together, and the rows below also assert that the tree holds EXACTLY ONE authored node at this id — so
 *  the `1` cannot become a slack figure and a second node at the same address cannot hide inside it. */
const TABS_ADD_AUTHORED_DELTA = 1 // the add-tab control `tab-add` — ONE authored node, beside `#tab-rows`
/** **THE FIFTH TERM'S NODE, AS THE TREE SPELLS IT** — the id the `1` above is attributable to, so the census rows can
 *  say WHICH node the `1` is instead of leaving a bare figure (`D-26`), and can redden if it is renamed, deleted or
 *  authored twice. The string is the envelope's own export (`TABS_ADD_ID`); it is restated here as a literal because
 *  this file reads the AUTHORED TREE and never imports a name to save a count from being measured. */
const TABS_ADD_NODE_ID = 'tab-add'
/* ── ⟶ THE SIXTH DECLARED TERM — THE EIGHTH NAMED PART OF THE FIGURE — LANDED WITH THE APPLICATION'S NAME NODE: ──────
 *  **THE NAME NODE, ONE AUTHORED NODE.** **WHAT THE `1` IS, IN THIS CENSUS'S OWN VOCABULARY** (`D-26`: a figure never
 *  stands bare — a reader must be able to say which node the `1` is): the application's NAME, `APP_NAME_NODE_ID =
 *  'app-name'`, the top bar's FIRST child — ONE authored node, a `span` carrying `css.id` + `props.id` and the name as its
 *  `content`, and NOTHING ELSE (no `css.style`, no `handlers`, no `-webkit-app-region`).
 *  **WHY IT IS A NEW NODE AT ALL, AND WHY ITS TERM IS ITS OWN.** `D-177` had the name as the BAR's `content` — a text run,
 *  and therefore an ANONYMOUS flex item that no selector reaches: `D-239` and `D-240` measured every bar-level lever dead
 *  (`overflow: hidden`/`clip` did not zero the run's automatic minimum, `min-width: 0` on the bar did nothing, and the
 *  ellipsis had no clipping box to land in), and the user's ruling was *"make the name an element so it can truncate"*.
 *  **So the bar lost a `content` string and gained a child node** — a mover no earlier term counts, and therefore a term of
 *  its own rather than a re-spelling of the top bar's `3` into `4` inside the fourth: that `34` is
 *  `docs/L3/app-envelope/design.md` rev 5 §2's node-for-node inventory and rev 6's `A-8` says *"NOTHING ELSE MOVES"*, so
 *  folding this node there would RESTATE another layer's count to absorb a mover this pass authored — the exact shape
 *  `D-26`/`D-43` forbid and `C-6` was written to redden. **THE DESIGN'S BILL IS REPORTED, NOT PATCHED** (`D-3`, `D-5`):
 *  the tree now measures `38` authored nodes against rev 6's inventory of `35`, and that staleness is the design page's to
 *  re-take.
 *  **THE BITE IS KEPT, AND IT IS THE SAME BITE THE `+` GOT:** the term is ONE constant added to every sum on the same
 *  line, so the figure, the sum and the residue move together, and the rows below ALSO assert that the tree holds EXACTLY
 *  ONE authored node at this id — so the `1` cannot become a slack figure and a second node at the same address cannot hide
 *  inside it. **AND THE ONE-NODE TERMS ARE WHAT CATCH A NODE ARRIVING UNNOTICED**: a node authored by
 *  nothing moves the measured census, the EIGHT-term sum and the residue rows TOGETHER, and no one-node identity row
 *  can absorb it, because each is pinned to its own address and its own figure of one. */
const APP_NAME_AUTHORED_DELTA = 1 // the application's name `app-name` — ONE authored node, the top bar's FIRST child
/** **THE SIXTH TERM'S NODE, AS THE TREE SPELLS IT** — `'app-name'`, the id the `1` above is attributable to, so a census
 *  row can say WHICH node the `1` is instead of leaving a bare figure (`D-26`), and can redden if it is renamed, deleted or
 *  authored twice. **IT IS A LITERAL AND NOT AN IMPORT**: the envelope's own spelling is a module-scope constant it does not
 *  export (`src/shared/demo-envelope.ts`'s `APP_NAME_ID`), and this file reads the AUTHORED TREE — a name imported to spare
 *  a count from being measured would measure the import instead. */
const APP_NAME_NODE_ID = 'app-name'
/* ── ⟶ THE SEVENTH DECLARED TERM — THE NINTH NAMED PART OF THE FIGURE — LANDED WITH THE FOUR ZONE STRIPS: ──────
 *  **FOUR AUTHORED NODES, ONE PER ZONE, AND ONE TERM.** **WHAT THE `4` IS, IN THIS CENSUS'S OWN VOCABULARY** (`D-26`: a
 *  figure never stands bare — a reader must be able to say which nodes the `4` are): the four zone strips
 *  `docs/L3/renderer-wiring/design-zone-handles.md` rev 1 §2 authors — `zone-top-horizontal`, `zone-bottom-horizontal`,
 *  `zone-left-vertical`, `zone-right-vertical` — each ONE `div` carrying `css.id` = `props.id` = `props.axis`, the
 *  `gutter-handle` class, `content: ''`, one authored `pointerdown` no-op and `flex: 0 0 14px` plus a cursor. They are the
 *  zones' SIBLINGS (never their children, `paintStyle` replacing a zone's `css.style` whole), placed two in the root
 *  column and two in the arrangement row.
 *  **WHY IT IS A TERM OF ITS OWN RATHER THAN A RE-SPELLING OF THE FOURTH** (the question this block answers rather than
 *  assumes, and the reason the figure was `79` at this term's landing — `… + 35 + 1 + 1 + 4`, and `89` now that the
 *  EIGHTH term's `10` stands beside it — and not `… + 39 + 1`): that `34` is
 *  `docs/L3/app-envelope/design.md` rev 5 §2's node-for-node inventory and rev 6's `A-8` says *"NOTHING ELSE MOVES"*, so
 *  folding four nodes into it would RESTATE another layer's count to absorb a mover this landing authored — the exact
 *  shape `D-26`/`D-43` forbid and `C-6` was written to redden. **THE DESIGN'S BILL IS REPORTED, NOT PATCHED** (`D-3`,
 *  `D-5`): the tree authors FOUR nodes rev 6's inventory of `35` (`34 + 1`) does not count — beside the name node and the
 *  add-tab control it also does not count — so the design page's own bill is STALE BY THREE LANDINGS, and the re-take is
 *  that page's (its rev 7 §10 states the bill these four strips belong to).
 *  **THE BITE IS KEPT, AND IT IS THE ONE-NODE TERMS' BITE AT A TERM OF FOUR:** the constant is added to every sum on the
 *  same line, so the figure, the sum and the residue move together, AND the rows below assert that EACH of the four ids is
 *  authored EXACTLY ONCE and that the four addresses hold EXACTLY the declared `4` nodes between them — so a strip renamed,
 *  deleted or authored twice reds by NAME, and a FIFTH node cannot hide inside a term of four the way it could hide inside
 *  a bare figure. */
const ZONE_STRIPS_AUTHORED_DELTA = 4 // the four zone strips — ONE authored node per declared zone
/** **THE SEVENTH TERM'S NODES, AS THE TREE SPELLS THEM** — the four ids the `4` above is attributable to, so a census row
 *  can say WHICH nodes the `4` are and can redden on any one of them (`D-26`). **THEY ARE LITERALS AND NOT IMPORTS**: the
 *  envelope authors them through a private factory over private constants (`src/shared/demo-envelope.ts`'s
 *  `ZONE_TOP_STRIP_ID` and its three siblings are NOT exported — the design refuses a published name), and this file reads
 *  the AUTHORED TREE; a name imported to spare a count from being measured would measure the import instead. **AND THE
 *  WIRING SPELLS THE SAME FOUR IDS IN ITS OWN TABLE** (`renderer.ts`'s `ZONE_DRAG_HANDLES`): that equality is a ROW's
 *  (`PS-1`'s census), never a derivation, which is why these four strings standing here a third time is the census
 *  measuring a spelling rather than a drift. */
const ZONE_STRIP_NODE_IDS = ['zone-top-horizontal', 'zone-bottom-horizontal', 'zone-left-vertical', 'zone-right-vertical'] as const
/* ── ⟶ THE EIGHTH DECLARED TERM — THE TENTH NAMED PART OF THE FIGURE — LANDED WITH PANE RELOCATION: ──────
 *  **TEN AUTHORED NODES — THE TWO PANE-MOVE GRIPS AND THEIR EIGHT ZONE DROPS — AND ONE TERM.** **WHAT THE `10` IS, IN
 *  THIS CENSUS'S OWN VOCABULARY** (`D-26`: a figure never stands bare — a reader must be able to say which nodes the `10`
 *  are): `docs/L3/renderer-wiring/design-pane-relocation.md` rev 1 §7 authors, inside each of the two panes, ONE grip node
 *  — `css.id` = `props.id` = its own name, `props.tabindex: '0'` (the page sheet's `:focus-within` reveal is what arms the
 *  gesture, *"NO STATE, NO TOGGLE AND NO NEW RECORD"*), the `pane-grab` class and the authored glyph — and FOUR drop
 *  children under it, one per declared zone, each carrying `props.pane` (the RECORD id its act addresses, `pane-menus` /
 *  `pane-a`, never the node id) and `props.zone` (the DECLARED zone id it relocates to), the `pane-drop` class and ONE
 *  `pane-move`/`click` handler whose body is a declared no-op the wiring replaces. `2 + 8 = 10`: EACH PANE'S SUBTREE
 *  GAINS FIVE (grip `1` + its four drops `4`), which is the whole of where the figure moved.
 *  **THE WALK, RE-TAKEN OFF THE TREE AT THIS HEAD AND NOT GUESSED** (`D-26`): `89` = the root `1` + `app-surface` `76` +
 *  the overlay layer `11` (scrim `1` + dialog `10`) + the row prototype `1`; `app-surface`'s `76` = itself `1` + the
 *  top-bar `4` + the `top` zone `31` + `#zone-top-horizontal` `1` + the arrangement `36` + `#zone-bottom-horizontal` `1` +
 *  `bottom` `1` + the opener `1`; the `top` zone read `26` before this landing and reads `31` because its menus pane read
 *  `25` and reads `30` (the pane `1` + **the grip `menus-grab` `5`** — grip `1` + its four drops `4` + the handle `1` +
 *  the four menus `22` + the receipt carrier `1`); the arrangement read `31` and reads `36` because the stage read `26`
 *  and reads `31` — the landing page read `23` and reads `28`, and the gutter card read `6` and reads `11` (the card `1`
 *  + its `h2` `1` + **the grip `gutter-grab` `5`** — grip `1` + its four drops `4` — + the pane `1` + the handle `1` +
 *  the target `1` + the status carrier `1`). NO OTHER SUBTREE'S FIGURE MOVES, and the filing figure with its EIGHT declared terms IS the figure:
 *  `18 + 5 + 2 + 13 + 35 + 1 + 1 + 4 + 10 = 89`.
 *  **WHY IT IS A TERM OF ITS OWN AND NOT A RE-SPELLING OF THE SEVENTH OR THE FOURTH** (the question this block answers
 *  rather than assumes, and the reason `89` is `… + 4 + 10` and not `… + 14` or `… + 45`): `app-envelope`'s rev 7 §10
 *  declares the whole gesture's bill as ONE term of `14` — *"the four zone strips, the two move grips and their eight
 *  drops"* — and **the four strips LANDED FIRST AND ARE ALREADY THE SEVENTH TERM**, so folding these ten into it would
 *  RESTATE a landed term's figure (`4` → `14`) to absorb a mover a LATER landing authored, while folding them into the
 *  fourth's `34` would restate another layer's count: the exact shape `D-26`/`D-43` forbid and `C-6` was written to
 *  redden. **SO THE DESIGN'S BILL IS REPORTED, NOT PATCHED** (`D-3`, `D-5`): its `14` is the SEPARATE SUM OF TWO
 *  LANDINGS' TERMS — `4` (seventh) `+ 10` (eighth) — and the two spellings agree on the total; the page's own arithmetic
 *  is `89 = 18 + 5 + 2 + 13 + 35 + 1 + 1 + 14`, which this census does NOT re-spell as one term.
 *  **AND ITS NODE SPELLINGS ARE STALE, WHICH IS ALSO REPORTED AND NOT PATCHED**: rev 7 §2 names the grips
 *  `pane-a-move` / `pane-menus-move` and the drops `<pane>-move-<zone>`, while the tree spells
 *  `<affordance-region>-<verb>` and `<grip>-<zone>` — `menus-grab` / `gutter-grab` and `menus-grab-top` … — the file's
 *  own docblock's convention (`src/shared/demo-envelope.ts`'s `MENUS_GRAB_ID` and its comment). **THE CENSUS MEASURES THE
 *  TREE** (`D-26`: every figure its owner's), and the re-take of that table is the design page's (its `D-188` debt).
 *  **THE BITE IS KEPT, AND IT IS STRONGER THAN THE ONE-NODE AND FOUR-NODE TERMS' BITE — TEN IDS GET TEN PER-ID ROWS.**
 *  The precedent is the seventh term's (one row per declared address) applied at ten, because here a TERM-LEVEL IDENTITY
 *  ROW WOULD NOT BE ENOUGH: `measured === POST_CENSUS` plus `measured - PRE_CENSUS === Σ terms` are BOTH INVARIANT UNDER
 *  A SWAP — delete one drop (`−1`) and author one node at an address no term names (`+1`) and the figure, the sum and
 *  the residue all stand, so the term-level identity alone would hide exactly the mover this term exists to catch. The
 *  ten per-id rows are what make a **renamed or deleted drop red BY NAME** and a **duplicated id red at its own address**,
 *  and the two group sums (`2` grips, `8` drops) plus the drops' `props.pane`/`props.zone` and the grips'
 *  `props.tabindex` rows are what stop the `10` from becoming a slack figure or a re-parented node from passing as a
 *  drop. */
const PANE_GRAB_AUTHORED_DELTA = 2 // the two pane-move grips — one authored node per pane, `props.tabindex: '0'`
const PANE_MOVE_DROP_AUTHORED_DELTA = 8 // the eight zone drops — four per grip, one per declared zone
/** **THE EIGHTH DECLARED TERM ITSELF — THE SUM OF ITS TWO NAMED GROUPS**, never a bare figure (`D-26`, `D-43`):
 *  the two grips' `2` PLUS the eight drops' `8` = **`10`**, which is what every census row adds beside the first seven
 *  terms. The two groups stay separately visible so a moved part reddens the figure AND the sum, and `2 + 8 = 10` is
 *  asserted as arithmetic at `M-2` — a term that no longer sums reds there rather than being re-spelled. */
const PANE_MOVE_AUTHORED_DELTA = PANE_GRAB_AUTHORED_DELTA + PANE_MOVE_DROP_AUTHORED_DELTA
/** **THE EIGHTH TERM'S GRIP NODES, AS THE TREE SPELLS THEM** — the two ids the `2` above is attributable to (`D-26`).
 *  **LITERALS AND NOT IMPORTS**: `src/shared/demo-envelope.ts`'s `MENUS_GRAB_ID`/`GUTTER_GRAB_ID` are private by design
 *  (rev 7 §7: *"no export joins the published surface"*), so an import here would measure the import; this file reads the
 *  AUTHORED TREE. The wiring spells the drops again in its own census (`renderer.ts`'s `PANE_MOVE_DROP_IDS`), and that
 *  equality is a ROW of `renderer-wiring`'s, never a derivation. **AND A GRIP'S ONE PROP IS `props.tabindex: '0'`** — the
 *  whole arming mechanism, which a grip that lost it would keep in the census while ceasing to work. */
const PANE_GRAB_NODE_IDS = ['menus-grab', 'gutter-grab'] as const
/** **THE EIGHTH TERM'S EIGHT DROP NODES, EACH WITH ITS GRIP, ITS RECORD PANE AND ITS DECLARED ZONE — ALL LITERALS.**
 *  The zone is carried per row rather than derived from the id's suffix: a drop whose id and whose `props.zone` were
 *  renamed TOGETHER would keep a derived expectation standing while moving a destination, and a destination is the whole
 *  meaning of a drop (`design-pane-relocation.md` §2). `props.pane` is the RECORD id and never the node id (`pane-a` is
 *  the record key whose node is `#gutter-pane`, `D-194`), which is why it is spelled here beside the node ids. */
const PANE_MOVE_DROPS: ReadonlyArray<{ id: string; grip: string; pane: string; zone: string }> = [
  { id: 'menus-grab-top', grip: 'menus-grab', pane: 'pane-menus', zone: 'top' },
  { id: 'menus-grab-bottom', grip: 'menus-grab', pane: 'pane-menus', zone: 'bottom' },
  { id: 'menus-grab-left', grip: 'menus-grab', pane: 'pane-menus', zone: 'left' },
  { id: 'menus-grab-right', grip: 'menus-grab', pane: 'pane-menus', zone: 'right' },
  { id: 'gutter-grab-top', grip: 'gutter-grab', pane: 'pane-a', zone: 'top' },
  { id: 'gutter-grab-bottom', grip: 'gutter-grab', pane: 'pane-a', zone: 'bottom' },
  { id: 'gutter-grab-left', grip: 'gutter-grab', pane: 'pane-a', zone: 'left' },
  { id: 'gutter-grab-right', grip: 'gutter-grab', pane: 'pane-a', zone: 'right' },
]
/* ── ⟶ THE NINTH DECLARED TERM — THE ELEVENTH NAMED PART OF THE FIGURE — LANDED WITH THE SECOND ZONE-RESIDENT PANE: ──────
 *  **SEVEN AUTHORED NODES — ONE PANE, ONE GRIP, ITS FOUR DROPS AND ITS RESIZE STRIP — AND ONE TERM.** **WHAT THE `7` IS,
 *  IN THIS CENSUS'S OWN VOCABULARY** (`D-26`: a figure never stands bare — a reader must be able to say which nodes the
 *  `7` are): the pane `pane-inspector` authors in the `top` ZONE beside the menus pane, so that a zone holds TWO and the
 *  arrangement in a zone is exercisable at all (the user's second change: *"Add additional demo panes so that this can be
 *  tested with pane rearrangement in a zone"*). Its subtree is `1 + 1 + 4 + 1 = 7`: the PANE `pane-inspector` `1` (a
 *  `div`, `css.id` = `props.id`, `content: 'Inspector'`), its MOVE GRIP `inspector-grab` `1` — `paneMoveGripNodeOf`'s own
 *  form, `props.tabindex: '0'`, `props.pane: 'pane-inspector'`, `props.name: 'Inspector'` — its FOUR ZONE DROPS
 *  `inspector-grab-<zone>` `4` (one per declared zone, each carrying `props.pane` and `props.zone`), and its RESIZE STRIP
 *  `inspector-vertical` `1` (the `gutter-handle` class, `props.axis` = its own id, one authored `pointerdown` no-op).
 *  **IT IS `1 + 1 + 4 + 1` AND NOT `5 + 2` OR A BORROWED `10`**: the grips-and-drops term is the EIGHTH and counts the two
 *  panes that existed when IT landed, so folding a THIRD pane's grip and its four drops into it would restate a landed
 *  term's figure (`10 → 15`) to absorb a mover a LATER landing authored — the shape `D-26`/`D-43` forbid and `C-6` was
 *  written to redden. **AND `app-envelope`'s rev 7 §10 bill counts none of this pane**, so the design's bill is reported
 *  and not patched (`D-3`, `D-5`).
 *  **THE BITE IS THE EIGHTH TERM'S, AT SEVEN:** the term is added to every sum on the same line, and the rows below pin
 *  EACH of the seven addresses to its own figure of one — plus the grip's `props.tabindex`/`props.pane`/`props.name`, the
 *  four drops' `props.pane`/`props.zone`, the strip's `props.axis` and the pane's `props.id` — so a renamed, deleted or
 *  twice-authored node reds BY NAME, a re-parented node reds at its operands, and a spare node at an address no term names
 *  reds at the figure, the sum and the residue together.
 *
 *  **THE WALK, RE-TAKEN OFF THE TREE AT THE NINTH TERM'S HEAD AND NOT GUESSED** (`D-26`; measured on `demoEnvelope()` by traversal,
 *  one node at a time, and the subtree figures below are the ones that traversal answered — **KEPT AS THAT HEAD TOOK IT, AND
 *  THE WALK OF RECORD IS NOW THE TENTH STANDING TERM'S BLOCK BELOW, WHICH RE-TAKES IT AT `103` AND SAYS WHERE THE SEVEN MOVED**):
 *  **`96`** = the root `1` +
 *  `app-surface` `83` + the overlay layer `11` (scrim `1` + dialog `10`) + the row prototype `1`; **`app-surface`'s `83`**
 *  = itself `1` + the top-bar `4` + the `top` zone `38` + `#zone-top-horizontal` `1` + the arrangement `36` +
 *  `#zone-bottom-horizontal` `1` + `bottom` `1` + the opener `1`; **the `top` zone read
 *  `31` and reads `38`** because its SECOND PANE stands beside the menus pane: `pane-inspector` `7` = the pane `1` + its
 *  grip `inspector-grab` `5` (grip `1` + its four drops `4`) + its resize strip `inspector-vertical` `1`. **NO OTHER
 *  SUBTREE'S FIGURE MOVES**: the menus pane still reads `30`, the arrangement `36`, the stage `31`, the landing page `28`
 *  and the gutter card `11`, and the filing figure with its NINE declared terms IS the figure:
 *  `18 + 5 + 2 + 13 + 35 + 1 + 1 + 4 + 10 + 7 = 96`.
 *
 *  **AND THE WALK MOVED BY EXACTLY ONE NODE FROM THE `97` READING, THAT NODE BEING THE GHOST'S**: `app-surface` reads `83`
 *  where it read `84`, every other subtree figure above is byte-identical to the reading taken at `97`, and the difference
 *  is the `1` the RETIRED tenth term spent — `#pane-ghost`, deleted whole (the headstone below). **SO THE WALK IS RE-TAKEN
 *  AND NOT RE-SPELLED**: no subtree absorbed the missing node and no term grew to cover it.
 *
 *  **IT IS TWO TERMS AND NOT ONE BECAUSE THE TWO MOVERS CAME FROM TWO CHANGES AND STAND IN TWO SUBTREES**: the pane is the
 *  `top` zone's and the ghost was the app root's, and `app-envelope`'s rev 7 §10 bill counts neither (reported, not patched,
 *  `D-3`, `D-5`) — **and the ghost's half of that sentence is now history rather than a count.** */
const INSPECTOR_PANE_AUTHORED_DELTA = 1 // the pane `pane-inspector` — one authored node in the `top` zone
const INSPECTOR_GRAB_AUTHORED_DELTA = 1 // its move grip `inspector-grab` — one authored node, `props.tabindex: '0'`
const INSPECTOR_DROP_AUTHORED_DELTA = 4 // its four zone drops — one per declared zone
const INSPECTOR_STRIP_AUTHORED_DELTA = 1 // its resize strip `inspector-vertical` — one authored node, `props.axis` its own id
/** **THE NINTH DECLARED TERM ITSELF — THE SUM OF ITS FOUR NAMED PARTS**, never a bare figure (`D-26`, `D-43`): the pane's
 *  `1` PLUS its grip's `1` PLUS its four drops' `4` PLUS its strip's `1` = **`7`**. The parts stay separately visible so a
 *  moved one reddens the figure AND the sum, and `1 + 1 + 4 + 1 = 7` is asserted as arithmetic at `M-2`. */
const INSPECTOR_AUTHORED_DELTA =
  INSPECTOR_PANE_AUTHORED_DELTA + INSPECTOR_GRAB_AUTHORED_DELTA + INSPECTOR_DROP_AUTHORED_DELTA + INSPECTOR_STRIP_AUTHORED_DELTA
/** **THE NINTH TERM'S NODES, AS THE TREE SPELLS THEM** — the ids the `7` above is attributable to (`D-26`), and LITERALS
 *  and not imports for the eighth term's reason (`src/shared/demo-envelope.ts`'s `INSPECTOR_PANE_RECORD_ID`,
 *  `INSPECTOR_GRAB_ID`, `INSPECTOR_AFFORDANCE_ID` are private by design; an import would measure the import). **THE RECORD
 *  KEY AND THE PANE NODE'S ID ARE THE SAME STRING HERE AND ARE STILL SPELLED TWICE**: the equality is a row's (`AL-8`,
 *  `AL-10`, `PM-1`) and never a derivation, which is what `renderer.ts`'s `PANE_NODE_IDS` exists for. */
const INSPECTOR_PANE_NODE_ID = 'pane-inspector'
const INSPECTOR_GRAB_NODE_ID = 'inspector-grab'
const INSPECTOR_STRIP_NODE_ID = 'inspector-vertical'
/** **THE FOUR DROPS UNDER THE SECOND PANE'S GRIP, EACH WITH ITS GRIP, ITS RECORD PANE AND ITS DECLARED ZONE** — the eighth
 *  term's table one pane over, and literal on the same grounds: the zone is carried PER ROW rather than derived from the id's
 *  suffix, because a destination renamed on both sides together would keep a derived expectation standing while moving a
 *  pane, and `props.pane` is the RECORD id (`pane-inspector`) and never the node's own. */
const INSPECTOR_MOVE_DROPS: ReadonlyArray<{ id: string; grip: string; pane: string; zone: string }> = [
  { id: 'inspector-grab-top', grip: 'inspector-grab', pane: 'pane-inspector', zone: 'top' },
  { id: 'inspector-grab-bottom', grip: 'inspector-grab', pane: 'pane-inspector', zone: 'bottom' },
  { id: 'inspector-grab-left', grip: 'inspector-grab', pane: 'pane-inspector', zone: 'left' },
  { id: 'inspector-grab-right', grip: 'inspector-grab', pane: 'pane-inspector', zone: 'right' },
]
/* ── ⟶ THE TENTH DECLARED TERM IS **RETIRED BY NAME, WITH ITS REASON** — THE RELOCATION GHOST `pane-ghost`: ──────
 *  **THE NODE THIS TERM COUNTED NO LONGER EXISTS BY DESIGN, NOT BY ACCIDENT**, and this block is its headstone rather than a
 *  silence (`D-9`'s tombstone discipline: an artifact must not deny its own body). `D-258` authored ONE node, `#pane-ghost`, as
 *  the TENTH declared term — the box the pane-move drag drew AT THE TARGET LOCATION while a grip was held (the user's first
 *  change, verbatim: *"Pane drag should render a ghost into the target location, showing where the pane will place if
 *  released"*). **WHAT CHANGED IS WHAT THE PREVIEW IS**: the drag now **RE-ARRANGES THE REAL PANES** through the engine's own
 *  `move` op — `renderer.ts`'s `driveZoneArrangement` is handed the family the release WOULD write on every transition and the
 *  RECORD's family again on every end — so **the pane ITSELF stands in the insertion slot and its siblings are PUSHED**, which
 *  is exactly what the ghost was drawing (the user's own sentence: *"show the preview at the top and push the menu pane
 *  down"*). **SO KEEPING IT WOULD HAVE BEEN A NODE SHOWING A PICTURE OF WHAT IS ALREADY ON SCREEN** — a second drawing of one
 *  fact, revealed at the very box the real pane now occupies — and it is DELETED WHOLE with its census term.
 *  **WHAT THE DELETION COSTS IS ONE AUTHORED NODE AND THE TENTH TERM, AND NOTHING ELSE**: no channel, no bridge member, no
 *  route and no record member ever named it. **THE FIGURE IS `96` WHERE IT WAS `97`, THE SUM CARRIES NINE DECLARED TERMS WHERE
 *  IT CARRIED TEN, AND THE `1` IS NOT RE-SPELLED INTO ANY OTHER TERM** (`D-26`: a figure is never restated to absorb a mover —
 *  and a term is never restated to absorb a DELETION, which is the same bite read the other way). **THAT SENTENCE IS THE
 *  DELETION'S OWN READING AND IS KEPT AS TAKEN**: at THIS head the figure is `103` and the standing sum carries TEN deltas
 *  again, the tenth standing being the pane control bar's `7` — a LATER landing, not the ghost's ordinal re-opened.
 *  **THE ADDRESS IS KEPT HERE, DELIBERATELY, AS THE READING THAT KEEPS THE DELETION HONEST** (`D-26`: a figure never stands
 *  bare, and neither does a deletion): `RETIRED_PANE_GHOST_NODE_ID` is the string the node carried, and the census rows below
 *  assert that the authored tree holds **ZERO** nodes at it. So a ghost authored AGAIN — the eleventh node arriving unnoticed —
 *  reds BY NAME here as well as at the figure, at the sum and at the residue, and a reader never has to re-derive which address
 *  went missing. **THE IDENTITY ROWS THIS FILE ONCE RAN AT THIS ADDRESS ARE RETIRED WITH IT AND NOT DELETED QUIETLY**: they
 *  pinned `props.id` = `css.id`, the `pane-ghost` class, no content, no handler and an authored `opacity: 0` — six assertions
 *  across five rows over a node the tree no longer has, whose successor at the same address is the ONE zero row below (a
 *  stricter reading, since a node of ANY shape at that address now reds, not only a mis-shaped one). */
const RETIRED_PANE_GHOST_NODE_ID = 'pane-ghost' // RETIRED — the node is ABSENT from the authored tree BY DESIGN; the rows assert ZERO nodes at this address
/* ── ⟶ THE TENTH **STANDING** DECLARED TERM — THE TWELFTH NAMED PART OF THE FIGURE — LANDED WITH THE PANE CONTROL BAR: ──────
 *  **SEVEN AUTHORED NODES — THREE `pane-head` ROWS, THREE `pane-collapse` CONTROLS AND ONE `inspector-body` — AND ONE TERM.**
 *  **WHAT THE `7` IS, IN THIS CENSUS'S OWN VOCABULARY** (`D-26`: a figure never stands bare — a reader must be able to say
 *  which nodes the `7` are): `docs/L3/app-envelope/design-pane-control-bar.md` **rev 2** §2 authors, in EACH of the three
 *  panes, a HEAD ROW `menus-head` / `inspector-head` / `gutter-head` (a `div`, `css.classes: ['pane-head']`, `css.id` =
 *  `props.id` = its own name, NO `content`, NO `css.style`, NO handler, the pane's FIRST child) and, beside the grip inside
 *  that row, a COLLAPSE CONTROL `menus-collapse` / `inspector-collapse` / `gutter-collapse` (a `div`, `css.classes:
 *  ['pane-collapse']`, `css.id` = `props.id`, `props.tabindex: '0'`, **`props.pane` — the RECORD id its act addresses, read
 *  OFF THE NODE**, no `content` because the glyph is the sheet's sole author, and ONE authored no-op pair
 *  `('pane-collapse', 'click')`) — and `docs/L3/renderer-wiring/design-pane-collapse.md` **rev 2** §3's third arm, `A-14`,
 *  moves `#pane-inspector`'s own `'No selection'` `content` into the CHILD `inspector-body` (a `div`, `css.classes:
 *  ['pane-body']`, `css.id` = `props.id`, that one placeholder as `content`, no handler), because a node's `content`
 *  renders AHEAD of its children and no `[collapsed="true"] > :not(.pane-head)` rule can reach it.
 *  **WHY IT IS A TERM OF ITS OWN AND NOT A RE-SPELLING OF THE NINTH OR THE FOURTH** (the question this block answers
 *  rather than assumes, and the reason the figure is `… + 7 + 7` and not `… + 14` or `… + 11 + 42`): the ninth term is the
 *  SECOND ZONE-RESIDENT PANE's declared bill and the fourth is `app-envelope` rev 5 §2's node-for-node inventory whose rev 6
 *  hunk `A-8` says *"NOTHING ELSE MOVES"*, so folding seven nodes into either would RESTATE a landed term's figure or another
 *  layer's count to absorb a mover this landing authored — the exact shape `D-26`/`D-43` forbid and `C-6` was written to
 *  redden. **SO THE DESIGN'S BILL IS REPORTED, NOT PATCHED** (`D-3`, `D-5`): `design-pane-control-bar.md` rev 2 §6 declares
 *  exactly `+7` and says in its own bytes that *"the literal is the landing pass's to re-take"* (`D-26`/`D-43`), and the
 *  seven ids are LITERALS ON BOTH SIDES and published nowhere (`§6`, `D-41`, `D-188` debt 2), so no map figure moves with them.
 *  **THE TERM SPLITS BY NODE KIND — `3` HEADS + `3` CONTROLS + `1` BODY — AND ITS SEVEN IDS *ALSO* GET SEVEN PER-ID ROWS,
 *  AND THAT IS THE CHOICE THIS BLOCK MAKES RATHER THAN ONE OF THE TWO.** The SPLIT is what makes the term's arithmetic say
 *  WHICH KIND moved: the three kinds carry DISJOINT operands — a head carries a class and nothing else (`A-11`: the row's
 *  box is the sheet's, and a `css.style` here would race it), a control carries `props.pane` AND the one handler pair AND
 *  `tabindex`, and the body carries the placeholder `content` — so a landing that deleted one control and authored two heads
 *  would still sum `7`, and only a per-KIND part can red on that. The PER-ID rows are what the EIGHTH term's precedent
 *  demands at this size and at this bite (`measured === POST_CENSUS` and `measured - PRE_CENSUS === Σ terms` are BOTH
 *  INVARIANT UNDER A SWAP — delete one node and author one at an address no term names and the figure, the sum and the residue
 *  all stand), so each of the seven addresses is pinned to its own figure of one, with its own operands beside it. **A
 *  KIND-LEVEL row alone would let a swap stand; a PER-ID row alone would let a swap INSIDE the term stand.** Both are kept.
 *  **THE ORDINAL, SAID ONCE SO THE HEADSTONE IS NOT MISREAD**: `D-258`'s relocation ghost `#pane-ghost` was the TENTH term ever
 *  DECLARED and its `1` is RETIRED with its node; this landing is therefore the ELEVENTH ordinal and the TENTH **STANDING**
 *  term. The two numbers differ, and the census's sum carries ten deltas at this head while never counting the ghost.
 *
 *  **THE WALK, RE-TAKEN OFF THE TREE AT THIS HEAD AND NOT GUESSED** (`D-26`; measured on `demoEnvelope()` by traversal, one
 *  node at a time, and the subtree figures below are the ones that traversal answered): **`103`** = the root `1` +
 *  `app-surface` `90` + the overlay layer `11` (scrim `1` + dialog `10`) + the row prototype `1`; **`app-surface`'s `90`**
 *  = itself `1` + the top-bar `4` + the `top` zone `43` + `#zone-top-horizontal` `1` + the arrangement `38` +
 *  `#zone-bottom-horizontal` `1` + `bottom` `1` + the opener `1`; **the `top` zone read `38` and reads `43`** because BOTH
 *  of its panes gained a head row and a collapse control — the menus pane read `30` and reads `32` (`1 + 1`), the second
 *  zone-resident pane read `7` and reads `10` (`1 + 1` for its pair **and `1` for its body node**, which is the seventh node
 *  and stands in that pane); **the arrangement read `36` and reads `38`** because the stage read `31` and reads `33` — the
 *  landing page read `28` and reads `30`, and the gutter card read `11` and reads `13` (the gutter pane's `1 + 1`).
 *  **NO OTHER SUBTREE'S FIGURE MOVES**: the menus pane's own `32` is its pair and nothing else, the stage's `33`, the
 *  landing page's `30` and the gutter card's `13` are the same `+2`s one level out, the row prototype, the overlay layer,
 *  the top-bar and the two zone strips are byte-identical to the `96` reading, and the filing figure with its TEN declared
 *  terms IS the figure: `18 + 5 + 2 + 13 + 35 + 1 + 1 + 4 + 10 + 7 + 7 = 103`. **TWO ROWS PER PANE AND ONE FOR THE BODY, WHICH
 *  IS EXACTLY WHAT THE DESIGN'S OWN WALK PREDICTED** (`design-pane-control-bar.md` rev 2 §6: *"the walk moves by two rows per
 *  pane … and by one for the inspector's body"*) — and the three panes are three separate subtrees, so the seven do not all
 *  land in one place.
 *  **THE BITE IS THE EIGHTH AND NINTH TERMS' AT SEVEN, AND IT IS STRENGTHENED BY ONE ROW THEY DO NOT HAVE**: the term is added
 *  to every sum on the same line, EACH of the seven addresses is pinned to its own figure of one with its own operands (a
 *  head's class and its empty `content`/`style`/handler set, a control's `props.pane`/`tabindex` and its single pair, the
 *  body's class and placeholder), the three group sums pin `3 + 3 + 1`, and **a separate row asserts the three controls are
 *  the GRIP'S SIBLINGS AND NEVER ITS DESCENDANTS** — the design's first guardrail (`§1`, `§8`): a `pointerdown` on any
 *  descendant of `.pane-grab` bubbles to the grip's own drag listener and arms the pane-move session, so a collapse control
 *  nested inside the grip would arm a drag and paint four zone windows from ONE click, while every census figure stood. */
const PANE_HEAD_AUTHORED_DELTA = 3 // the three head rows — one authored node per pane, `css.classes: ['pane-head']`
const PANE_COLLAPSE_AUTHORED_DELTA = 3 // the three collapse controls — one per pane, `props.pane` + `tabindex: '0'` + one pair
const PANE_BODY_AUTHORED_DELTA = 1 // the inspector's body — the one authored `content` moved off its pane (`A-14`)
/** **THE TENTH STANDING TERM ITSELF — THE SUM OF ITS THREE NAMED KINDS**, never a bare figure (`D-26`, `D-43`): the three
 *  heads' `3` PLUS the three controls' `3` PLUS the one body's `1` = **`7`**, which is what every census row adds beside the
 *  first nine terms. The kinds stay separately visible so a moved part reddens the figure AND the sum, and `3 + 3 + 1 = 7`
 *  is asserted as arithmetic at `M-2` — a term that no longer sums reds there rather than being re-spelled. */
const PANE_CONTROL_BAR_AUTHORED_DELTA =
  PANE_HEAD_AUTHORED_DELTA + PANE_COLLAPSE_AUTHORED_DELTA + PANE_BODY_AUTHORED_DELTA
/** **THE TENTH STANDING TERM'S THREE HEAD ROWS, AS THE TREE SPELLS THEM** — the ids the heads' `3` is attributable to
 *  (`D-26`), LITERALS and not imports for the eighth term's reason (`src/shared/demo-envelope.ts`'s `MENUS_HEAD_ID` and its
 *  siblings are private by design — `design-pane-control-bar.md` §6: *"DO NOT EXPORT THE SEVEN IDS"* — so an import here
 *  would measure the import). */
const PANE_HEAD_NODE_IDS = ['menus-head', 'inspector-head', 'gutter-head'] as const
/** **THE TENTH STANDING TERM'S THREE COLLAPSE CONTROLS, EACH WITH THE RECORD PANE ITS `props.pane` NAMES** — the eighth
 *  term's drop table one node kind over, and literal on the same grounds. **THE PANE IS CARRIED PER ROW RATHER THAN DERIVED
 *  FROM THE ID**: `menus-collapse` → `pane-menus` and `inspector-collapse` → `pane-inspector` happen to share a stem while the
 *  gutter pane's control is `gutter-collapse` → **`pane-a`**, whose record id is not its node's (the drops' own fact,
 *  `D-194`), so a derived expectation would be right twice and wrong once — which is exactly the reading that keeps a
 *  renamed-on-both-sides destination standing while moving an act. */
const PANE_COLLAPSE_NODES: ReadonlyArray<{ id: string; pane: string; grip: string; head: string }> = [
  { id: 'menus-collapse', pane: 'pane-menus', grip: 'menus-grab', head: 'menus-head' },
  { id: 'inspector-collapse', pane: 'pane-inspector', grip: 'inspector-grab', head: 'inspector-head' },
  { id: 'gutter-collapse', pane: 'pane-a', grip: 'gutter-grab', head: 'gutter-head' },
]
/** **THE PAIR EVERY COLLAPSE CONTROL AUTHORS ITS NO-OP UNDER, AND THE ADDRESS THE ACT IS INSTALLED AT** — one name and one
 *  event, spelled here as literals because the envelope authors them privately (`PANE_COLLAPSE_HANDLER_NAME`/
 *  `PANE_COLLAPSE_BODY`) and this file reads the AUTHORED TREE. **A RENAMED PAIR IS THE FAULT THIS CONSTANT NAMES**: the
 *  wiring replaces the body UNDER THE NODE'S OWN PAIR (`design-pane-collapse.md` §1 `C3`, `D-239`), so a pair that moved would
 *  leave `provident.dispatch` reaching no body while the control stood in the census. */
const PANE_COLLAPSE_HANDLER_NAME = 'pane-collapse'
const PANE_COLLAPSE_HANDLER_EVENT = 'click'
/** **THE TENTH STANDING TERM'S ONE BODY NODE** — `inspector-body`, the placeholder's address (`A-14`), and the string its
 *  `content` carries. **IT IS NOT A PANE NAME** (`D-259`): the name is the grip's `props.name` painted through `attr(name)`,
 *  and this is the phrase an inspector says when nothing is selected — a body that echoed the name would put a second
 *  `Inspector` above the header row, which is the defect `D-259` answered. */
const INSPECTOR_BODY_NODE_ID = 'inspector-body'
const INSPECTOR_BODY_PLACEHOLDER = 'No selection'
/** THE `T2` PAGE-NODE DELTA (`docs/specs/store-tabs-record.md` `§5.1` item 2 / `§0A` item 5):
 *  the TWO authored page nodes `tabs-landing-page` and `tabs-error-page`.
 *
 *  **⟶ RE-POINTED BY `D-89`, AND ONTO A LANDED SOURCE RATHER THAN A RETIRED ONE.** The delta used to be
 *  read by path out of `tests/store-tabs-record-register.ts`'s `PAGE_NODE_CENSUS_DELTA` — a TEST
 *  register, and one this pass retires with the file it served (`D-30`'s REPLACED-WHOLE: that unit's
 *  invariant rows' successor is the crossing's own battery). **THE SUBJECT WAS ALWAYS THE ENVELOPE'S**:
 *  the two page ids are authored in `src/shared/demo-envelope.ts` and exported by name, so the count is
 *  read off the module that AUTHORS them — a stronger source than a constant a register re-stated.
 *  **THE BITE IS KEPT**: delete one of the two authored ids and this reads 1, which the `X-1` row
 *  reddens against the measured census residue. */
const PAGE_NODE_CENSUS_DELTA_SOURCE = 'src/shared/demo-envelope.ts'
const PAGE_NODE_CENSUS_DELTA_AS_FILED = ((): number => {
  const raw = sourceOrEmpty(PAGE_NODE_CENSUS_DELTA_SOURCE)
  const ids = raw.match(/export const TABS_(?:LANDING|ERROR)_PAGE_ID = '/g) ?? []
  return ids.length === 0 ? -1 : ids.length
})()
const T2_PAGE_NODE_CENSUS_DELTA = 2 // as filed `-`; measured `2` — T2's two declared page nodes

const CARD_ABSENT =
  '§2.1 item 1 — the authored `theme-card` section is ABSENT from `demoEnvelope()` ' +
  '(`src/shared/demo-envelope.ts`). The implementer owes §5.1 row 11: FIVE authored nodes ' +
  '(`theme-card` + its anonymous `h2` + `theme-dark` + `theme-light` + `theme-setting`), FOUR ' +
  'distinct ids, `css.id` AND `props.id` on the state node, and TWO handler-body STRINGS (name ' +
  '`theme-set`, event `click`) — moving the authored census ' +
  PRE_CENSUS +
  ' → ' +
  POST_CENSUS +
  '.'
const WIRING_ABSENT =
  '§2.4 item 1/§5.1 row 12 — ONE bounded renderer-WIRING role (the ATTRIBUTE-NAME HOLDER) is ' +
  'ABSENT from `src/renderer/renderer.ts`. GAP-1: the contract pins no export/identifier for it, ' +
  'so this probe keys on the unit CHARTER word (`§2.2`(B) row 1(c)): the role must be declared ' +
  'under a `theme`-named `function`/`const`, must hold the CALLER-SUPPLIED attribute-name string ' +
  'constant, and must WRITE NOTHING (no setAttribute/classList/style, §2.4 item 2).'
const BODY_ABSENT = '§2.1 item 2 — the authored handler body STRING is absent: '

// ---------------------------------------------------------------------------
// Envelope reads (§2.1 item 1) — total, never throwing
// ---------------------------------------------------------------------------
type J = Record<string, unknown>

function asObj(v: unknown): J | null {
  return v !== null && typeof v === 'object' ? (v as J) : null
}
function childrenOf(node: J | null): J[] {
  if (node === null) return []
  const kids = node['children']
  if (!Array.isArray(kids)) return []
  const out: J[] = []
  for (const k of kids) {
    const o = asObj(k)
    if (o !== null) out.push(o)
  }
  return out
}
function tagOf(n: J): string {
  const t = n['type']
  return typeof t === 'string' ? t : ''
}
function cssIdOf(n: J | null): string | null {
  if (n === null) return null
  const css = asObj(n['css'])
  const id = css === null ? null : css['id']
  return typeof id === 'string' ? id : null
}
function propsIdOf(n: J | null): string | null {
  if (n === null) return null
  const props = asObj(n['props'])
  const id = props === null ? null : props['id']
  return typeof id === 'string' ? id : null
}
/** The authored `props` VALUE at `key`, or `null` — the reading the EIGHTH term's identity rows use to pin a
 *  drop's two operands (`props.pane`, `props.zone`) and a grip's `props.tabindex: '0'` OFF THE NODE rather
 *  than off this file's own literals (`D-177`: the operands are DATA carried on the node). */
function propsValueOf(n: J | null, key: string): string | null {
  if (n === null) return null
  const props = asObj(n['props'])
  const v = props === null ? null : props[key]
  return typeof v === 'string' ? v : null
}
function classMembersOf(n: J | null): string[] {
  if (n === null) return []
  const css = asObj(n['css'])
  const classes = css === null ? null : css['classes']
  if (!Array.isArray(classes)) return []
  const out: string[] = []
  for (const c of classes) if (typeof c === 'string') out.push(c)
  return out
}
function contentOf(n: J | null): unknown {
  return n === null ? undefined : n['content']
}
function allNodesOf(node: J | null, out: J[] = []): J[] {
  if (node === null) return out
  out.push(node)
  for (const c of childrenOf(node)) allNodesOf(c, out)
  return out
}
function rootNode(): J | null {
  const env = asObj(demoEnvelope())
  const tpl = env === null ? null : asObj(env['template'])
  return tpl === null ? null : asObj(tpl['root'])
}
function authoredNodes(): J[] {
  return allNodesOf(rootNode())
}
function authoredCensus(): number {
  return authoredNodes().length
}
function findById(id: string): J | null {
  return authoredNodes().find((n) => cssIdOf(n) === id) ?? null
}
/** Every authored node whose `css.id` is `id` — the reading the census rows use to say WHICH node a
 *  declared term's figure is, and to redden when one address carries two nodes (`D-26`). */
function authoredNodesAtId(id: string): J[] {
  return authoredNodes().filter((n) => cssIdOf(n) === id)
}
function cardSection(): J | null {
  return findById(CARD_ID)
}
interface CardReading {
  ok: boolean
  section: J | null
  nodes: J[]
  reason: string
}
function cardReading(): CardReading {
  const section = cardSection()
  if (section === null) return { ok: false, section: null, nodes: [], reason: CARD_ABSENT }
  return {
    ok: true,
    section,
    nodes: allNodesOf(section),
    reason: `the authored \`${CARD_ID}\` subtree is present (§2.1 item 1)`,
  }
}
/** Asserts the card is present (the labelled red) and returns the narrowed reading. */
function mustCard(): { section: J; nodes: J[] } {
  const c = cardReading()
  expect(c.ok, c.reason).toBe(true)
  return { section: c.section ?? {}, nodes: c.nodes }
}
function handlersOf(n: J | null): J[] {
  if (n === null) return []
  const hs = n['handlers']
  if (!Array.isArray(hs)) return []
  const out: J[] = []
  for (const h of hs) {
    const o = asObj(h)
    if (o !== null) out.push(o)
  }
  return out
}
function firstHandler(n: J | null): J | null {
  return handlersOf(n).length > 0 ? handlersOf(n)[0] : null
}
interface BodyReading {
  ok: boolean
  body: string
  node: J | null
  reason: string
}
function bodyOf(id: string): BodyReading {
  const node = findById(id)
  if (node === null) return { ok: false, body: '', node: null, reason: BODY_ABSENT + `the \`${id}\` button is absent` }
  const h = firstHandler(node)
  if (h === null) return { ok: false, body: '', node, reason: BODY_ABSENT + `\`${id}\` carries no handlers entry` }
  if (h['name'] !== HANDLER_NAME || h['event'] !== HANDLER_EVENT) {
    return {
      ok: false,
      body: '',
      node,
      reason: BODY_ABSENT + `\`${id}\`'s handler is not (name \`${HANDLER_NAME}\`, event \`${HANDLER_EVENT}\`)`,
    }
  }
  const b = h['body']
  if (typeof b !== 'string' || b.length === 0) {
    return { ok: false, body: '', node, reason: BODY_ABSENT + `\`${id}\`'s body is not a non-empty STRING (§2.1 item 2)` }
  }
  return { ok: true, body: b, node, reason: `\`${id}\` carries the authored function-STRING body` }
}
type BodyFn = (ctx: unknown, value?: unknown) => unknown
function evalBody(body: string): BodyFn {
  const factory = new Function('return (' + body + ')') as unknown as () => unknown
  return factory() as BodyFn
}
/** Drives the authored body; returns the THROWN value or `undefined` (never rethrows). */
function driveBody(body: string, ctx: J, value: unknown, omitValue: boolean): unknown {
  try {
    const fn = evalBody(body)
    if (omitValue) fn(ctx)
    else fn(ctx, value)
    return undefined
  } catch (e) {
    return e
  }
}

// ---------------------------------------------------------------------------
// The recording doubles (§2.1 item 2(a), §2.4 item 2, §5.5.1 method note 6(a))
// ---------------------------------------------------------------------------
interface Inventory {
  setAttribute: number
  removeAttribute: number
  classList: number
  style: number
  textContent: number
  innerHTML: number
}
function emptyInventory(): Inventory {
  return { setAttribute: 0, removeAttribute: 0, classList: 0, style: 0, textContent: 0, innerHTML: 0 }
}
function inventoryTotal(inv: Inventory): number {
  return inv.setAttribute + inv.removeAttribute + inv.classList + inv.style + inv.textContent + inv.innerHTML
}
/** An element-shaped double that COUNTS every write (§2.4 item 2, §3.4 R-8). */
function recordingElement(inv: Inventory): J {
  return {
    setAttribute: (): void => {
      inv.setAttribute += 1
    },
    removeAttribute: (): void => {
      inv.removeAttribute += 1
    },
    classList: {
      add: (): void => {
        inv.classList += 1
      },
      remove: (): void => {
        inv.classList += 1
      },
      toggle: (): void => {
        inv.classList += 1
      },
    },
    style: {
      setProperty: (): void => {
        inv.style += 1
      },
      removeProperty: (): void => {
        inv.style += 1
      },
    },
    get textContent(): string {
      return ''
    },
    set textContent(_v: string) {
      inv.textContent += 1
    },
    set innerHTML(_v: string) {
      inv.innerHTML += 1
    },
  }
}
interface NodeDouble {
  id: string
  props: { id: string }
  content: unknown
}
function nodeDouble(id: string, content: unknown): NodeDouble {
  return { id, props: { id }, content }
}
function stateDouble(): NodeDouble | null {
  const state = findById(STATE_ID)
  if (state === null) return null
  const c = contentOf(state)
  return nodeDouble(STATE_ID, typeof c === 'string' ? c : '')
}
interface CtxReading {
  ctx: J
  calls: Array<{ nodeId: unknown; ops: unknown }>
  inv: Inventory
  statuses: string[]
  nodes: NodeDouble[]
}
function makeCtx(opts: {
  nodes: NodeDouble[]
  inv?: Inventory
  applyThrows?: boolean
  refuse?: boolean
}): CtxReading {
  const inv = opts.inv ?? emptyInventory()
  const calls: Array<{ nodeId: unknown; ops: unknown }> = []
  const statuses: string[] = []
  const apply = (nodeId: unknown, ops: unknown): J => {
    calls.push({ nodeId, ops })
    if (opts.applyThrows === true && calls.length === 1) {
      throw new Error('the recording runtime double refuses by THROWING on the first call (§5.5.1 P-TC-TP-2 (iii))')
    }
    const status = opts.refuse === true ? 'rejected' : 'applied'
    statuses.push(status)
    if (opts.refuse !== true) {
      const opsArr = Array.isArray(ops) ? ops : []
      const mut = asObj(opsArr[0])
      if (mut !== null && mut['targetProp'] === 'content') {
        const target = opts.nodes.find((n) => n.id === nodeId)
        if (target !== undefined) target.content = mut['value']
      }
    }
    return { status }
  }
  const ctx: J = { tree: { allNodes: (): NodeDouble[] => opts.nodes }, clientAPI: { apply } }
  return { ctx, calls, inv, statuses, nodes: opts.nodes }
}
function firstMutation(reading: CtxReading): J | null {
  if (reading.calls.length !== 1) return null
  const ops = reading.calls[0].ops
  const arr = Array.isArray(ops) ? ops : []
  return asObj(arr[0])
}
function contentsSnapshot(nodes: NodeDouble[]): string[] {
  return nodes.map((n) => `${n.id}=${String(n.content)}`)
}

// ---------------------------------------------------------------------------
// Static-scan helpers (§1 item 7's falsifier, §2.2(C)'s exemption list)
// ---------------------------------------------------------------------------
function stripComments(src: string): string {
  let out = ''
  let i = 0
  let mode: 'code' | 'line' | 'block' | 'sq' | 'dq' | 'tpl' = 'code'
  while (i < src.length) {
    const c = src.charAt(i)
    const n = src.charAt(i + 1)
    if (mode === 'code') {
      if (c === '/' && n === '/') {
        mode = 'line'
        out += '  '
        i += 2
        continue
      }
      if (c === '/' && n === '*') {
        mode = 'block'
        out += '  '
        i += 2
        continue
      }
      if (c === "'") mode = 'sq'
      else if (c === '"') mode = 'dq'
      else if (c === '`') mode = 'tpl'
      out += c
      i += 1
      continue
    }
    if (mode === 'line') {
      if (c === '\n') {
        mode = 'code'
        out += '\n'
      } else out += ' '
      i += 1
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        mode = 'code'
        out += '  '
        i += 2
        continue
      }
      out += c === '\n' ? '\n' : ' '
      i += 1
      continue
    }
    if (c === '\\') {
      out += c + n
      i += 2
      continue
    }
    if ((mode === 'sq' && c === "'") || (mode === 'dq' && c === '"') || (mode === 'tpl' && c === '`')) mode = 'code'
    out += c
    i += 1
  }
  return out
}
/** The balanced `{ … }` block whose opening brace follows `startIndex` (comment/string aware). */
function extractBalanced(src: string, startIndex: number): string {
  const open = src.indexOf('{', startIndex)
  if (open < 0) return ''
  let depth = 0
  let i = open
  let mode: 'code' | 'line' | 'block' | 'sq' | 'dq' | 'tpl' = 'code'
  while (i < src.length) {
    const c = src.charAt(i)
    const n = src.charAt(i + 1)
    if (mode === 'code') {
      if (c === '/' && n === '/') {
        mode = 'line'
        i += 2
        continue
      }
      if (c === '/' && n === '*') {
        mode = 'block'
        i += 2
        continue
      }
      if (c === "'") mode = 'sq'
      else if (c === '"') mode = 'dq'
      else if (c === '`') mode = 'tpl'
      else if (c === '{') depth += 1
      else if (c === '}') {
        depth -= 1
        if (depth === 0) return src.slice(open, i + 1)
      }
      i += 1
      continue
    }
    if (mode === 'line') {
      if (c === '\n') mode = 'code'
      i += 1
      continue
    }
    if (mode === 'block') {
      if (c === '*' && n === '/') {
        mode = 'code'
        i += 2
        continue
      }
      i += 1
      continue
    }
    if (c === '\\') {
      i += 2
      continue
    }
    if ((mode === 'sq' && c === "'") || (mode === 'dq' && c === '"') || (mode === 'tpl' && c === '`')) mode = 'code'
    i += 1
  }
  return src.slice(open)
}
function quotedLiterals(src: string): string[] {
  const out: string[] = []
  const re = /'[^'\\]*'|"[^"\\]*"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) out.push(m[0].slice(1, -1))
  return out
}
interface Region {
  ok: boolean
  text: string
  reason: string
}
/** §5.1 row 11 — the authored card BLOCK of `src/shared/demo-envelope.ts` (comments stripped). */
function cardRegion(): Region {
  const src = readSource(ENVELOPE_PATH)
  if (src === null) return { ok: false, text: '', reason: `${CARD_ABSENT} (the envelope file itself is absent)` }
  const at = src.indexOf(`'${CARD_ID}'`)
  if (at < 0) return { ok: false, text: '', reason: CARD_ABSENT }
  const text = extractBalanced(src, at)
  if (text.length === 0) return { ok: false, text: '', reason: CARD_ABSENT }
  return { ok: true, text: stripComments(text), reason: `the \`${CARD_ID}\` block (${text.length} bytes)` }
}
/** §5.1 row 12 — the ONE bounded wiring role (GAP-1: probed by the unit's charter word). */
function themeWiringRegion(): Region {
  const src = readSource(RENDERER_PATH)
  if (src === null) return { ok: false, text: '', reason: `${WIRING_ABSENT} (the renderer file itself is absent)` }
  const re = /^(?:export\s+)?(?:async\s+)?(?:function|const|let|var)\s+([A-Za-z0-9_$]+)/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) {
    const name = m[1]
    if (typeof name === 'string' && /theme/i.test(name)) {
      const text = extractBalanced(src, m.index)
      if (text.length > 0) return { ok: true, text: stripComments(text), reason: `the theme-named wiring role \`${name}\` (${text.length} bytes)` }
    }
  }
  return { ok: false, text: '', reason: WIRING_ABSENT }
}
/** The caller-supplied attribute-name string constant held by the wiring (§2.1 item 4, GAP-1). */
function callerNameConstant(): { ok: boolean; name: string; value: string; reason: string } {
  const region = themeWiringRegion()
  if (!region.ok) return { ok: false, name: '', value: '', reason: region.reason }
  const re = /(?:export\s+)?const\s+([A-Za-z0-9_$]*(?:attribute|attr)[A-Za-z0-9_$]*)\s*(?::[^=]+)?=\s*'([^']*)'/
  const m = re.exec(region.text)
  if (m === null)
    return {
      ok: false,
      name: '',
      value: '',
      reason:
        '§2.1 item 4 — the wiring role carries NO caller-supplied attribute-NAME string constant. GAP-1: the contract pins no identifier, so the probe accepts any `const <name containing attribute|attr> = "…"` inside the theme-named wiring role.',
    }
  return { ok: true, name: m[1], value: m[2], reason: `the caller-held name constant \`${m[1]}\`` }
}
interface ScanPattern {
  id: string
  re: RegExp
}
// ---------------------------------------------------------------------------
// ADV-TC-4 — THE SECOND-APPEARANCE-AUTHORITY PATTERN FAMILY (§1 item 7 (iii)/(vii)).
//
// THE FINDING, MEASURED: the as-filed denied set NAMES *"a stylesheet, CSS rule, `--`-shaped
// custom property or `color-scheme` value authored by this unit"* (§1 item 7(iii)) and *"a second
// appearance authority — i.e. any element, attribute, class or style whose effect is 'the app looks
// different'"* (§1 item 7(vii)), but the as-filed scan carried NO pattern for a CLASS write and
// NONE for a stylesheet/CSS-rule route — so a corpus doing `el.classList.toggle('dark')` plus
// `document.createElement('style')` PASSED the very row that must redden for it. The family below
// is APPENDED to `DENIED_PATTERNS` (a STRENGTHENING: not one as-filed pattern is removed, relaxed
// or re-scoped, and no existing row is weakened), and every pattern carries the clause id it
// enforces BY NAME, so the family is NAMED and the scan row is not VACUOUS (§2.2(C)'s rule).
// CORPUS-EXEMPT — HARNESS bytes.
const APPEARANCE_AUTHORITY_PATTERNS: ScanPattern[] = [
  { id: '(iii)/(vii) a class WRITE', re: /\bclassList\s*\.\s*(?:add|remove|toggle|replace)\s*\(/g },
  { id: '(iii)/(vii) a class ATTRIBUTE write', re: /\bclassName\s*=|setAttribute\s*\(\s*['"]class['"]/g },
  {
    id: '(iii) a stylesheet route or a CSS rule set',
    re: /<style\b|createElement\s*\(\s*['"]style['"]|styleSheets|insertRule\s*\(|cssText|rel\s*=\s*['"]stylesheet['"]/g,
  },
  { id: '(iii)/(vii) a style declaration write', re: /\.style\s*\.\s*[a-zA-Z]+\s*=|\bsetProperty\s*\(/g },
  { id: '(iii) a CSS at-rule', re: /@media\b|@supports\b/g },
]
// CORPUS-EXEMPT — these pattern tables are HARNESS bytes, never the unit's surface
// (§1 item 7: "the new test file's non-assertion bytes are NOT scanned").
const DENIED_PATTERNS: ScanPattern[] = [
  { id: '(ii) a data-* attribute-name literal', re: /data-[a-zA-Z-]+/g },
  { id: '(iii) a color-scheme value', re: /color-scheme/g },
  { id: '(iii) a --shaped custom property', re: /--[a-zA-Z-]+/g },
  {
    id: '(iv) an ambient/OS read or a store',
    re: /\b(?:matchMedia|prefers-color-scheme|localStorage|sessionStorage|indexedDB|process\.env|navigator|document\.cookie)\b/g,
  },
  { id: '(vi) an edge into the theme mechanism', re: /\b(?:resolveTheme|applyThemeDeclaration)\b|shared\/theme/g },
  { id: '(i) a third token name', re: /['"](?:system|auto|AUTO|DARK|LIGHT)['"]/g },
  ...APPEARANCE_AUTHORITY_PATTERNS,
]
/**
 * THE AS-FILED FAMILY, derived (never re-typed, so it cannot drift): `DENIED_PATTERNS` minus the
 * ADV-TC-4 family. ADV-TC-4 measures the FINDING with it (the corpus PASSES this family) beside the
 * fixed reading (the corpus FAILS the extended one).
 */
const PRE_ADV_DENIED_PATTERNS: ScanPattern[] = DENIED_PATTERNS.filter(
  (p) => !APPEARANCE_AUTHORITY_PATTERNS.some((a) => a.id === p.id),
)
/** §2.2(C)'s BY-NAME EXEMPTION LIST — the citation spellings whose presence is not a use. */
const EXEMPTION_NAMES = [
  'resolveTheme',
  'applyThemeDeclaration',
  'src/shared/theme.ts',
  'shared/theme',
  'color-scheme',
  'index.html',
  'matchMedia',
] // CORPUS-EXEMPT
interface ScanHit {
  id: string
  text: string
  at: number
}
/** The scan engine, parameterised so ADV-TC-4 can run the SAME engine over the as-filed family. */
function scanWithPatterns(src: string, patterns: ScanPattern[], applyExemptions: boolean): ScanHit[] {
  const code = stripComments(src)
  const hits: ScanHit[] = []
  for (const p of patterns) {
    const re = new RegExp(p.re.source, 'g')
    let m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      const after = code.charAt(m.index + m[0].length)
      // A by-name citation is exempt ONLY where it is not a call, a value or a declaration
      // operator: the spelling stands as a bare string member of the exemption list.
      const isCitation = after === "'" || after === '"' || after === ']' || after === ','
      if (applyExemptions && EXEMPTION_NAMES.some((e) => m !== null && m[0].includes(e)) && isCitation) continue
      hits.push({ id: p.id, text: m[0], at: m.index })
      if (hits.length > 40) return hits
    }
  }
  return hits
}
/** THE ROW'S SCAN — the DECLARED denied set of `§1` item 7, over the EXTENDED family (ADV-TC-4). */
function scanDenied(src: string, applyExemptions: boolean): ScanHit[] {
  return scanWithPatterns(src, DENIED_PATTERNS, applyExemptions)
}
/** §2.2(C) — the exemptions NAMED, so no scan row is vacuous. */
function exemptionListIsDeclared(src: string): boolean {
  return EXEMPTION_NAMES.every((e) => src.includes(e))
}
const POSITIVE_CONTROL_CORPUS = [
  "const x = { 'data-theme': 'dark' }",
  'localStorage.setItem("theme", t)',
  'matchMedia("(prefers-color-scheme: dark)").matches',
  // ADV-TC-4 (§1 item 7(iii)/(vii)): the POSITIVE CONTROL now carries the family the as-filed
  // scan MISSED — a class write and a CSS rule set — so the control covers the whole named set.
  "el.classList.toggle('dark')",
  "document.createElement('style').textContent = '.card { background: #111 }'",
].join('\n') // CORPUS-EXEMPT — §1 item 7's POSITIVE CONTROL
/**
 * **ADV-TC-4'S OWN CORPUS** — the generalising corpus the finding names: a class write plus a
 * stylesheet route and a CSS rule set, and NOTHING else (checked: it carries no token of the
 * as-filed six patterns, so the PRE-ADV family's miss is measured cleanly rather than confused
 * with a token an as-filed pattern already caught). CORPUS-EXEMPT.
 */
const APPEARANCE_AUTHORITY_CORPUS = [
  "const el = document.querySelector('#app')",
  "el.classList.toggle('dark')",
  "const sheet = document.createElement('style')",
  "sheet.textContent = '.card { background: #111 }'",
  'document.head.appendChild(sheet)',
].join('\n')
/** The CLEAN corpus (ADV-TC-4's second control): the declared shape and NO denied token. CORPUS-EXEMPT. */
const CLEAN_CORPUS = [
  "const carried = value == null ? '' : String(value)",
  "ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: carried }])",
].join('\n')

function writeInventoryScan(region: string): string[] {
  const hits: string[] = []
  const patterns: ScanPattern[] = [
    { id: 'setAttribute', re: /\bsetAttribute\s*\(/g },
    { id: 'removeAttribute', re: /\bremoveAttribute\s*\(/g },
    { id: 'classList', re: /\bclassList\b/g },
    { id: 'style assignment', re: /\.style\s*(?:\.|=)/g },
    { id: 'setProperty', re: /\bsetProperty\s*\(/g },
    { id: 'color-scheme', re: /color-scheme/g },
    { id: 'a --shaped literal', re: /'--|"--/g },
  ] // CORPUS-EXEMPT
  for (const p of patterns) if (p.re.test(region)) hits.push(p.id)
  return hits
}
function outsideGraphScan(region: string): string[] {
  const hits: string[] = []
  const patterns: ScanPattern[] = [
    { id: 'document.createElement', re: /document\s*\.\s*createElement\s*\(/g },
    { id: 'innerHTML', re: /innerHTML/g },
    { id: 'insertAdjacentHTML', re: /insertAdjacentHTML/g },
    { id: 'outerHTML', re: /outerHTML/g },
    { id: 'hand-spelled data-node-id', re: /data-node-id/g },
  ] // CORPUS-EXEMPT
  for (const p of patterns) if (p.re.test(region)) hits.push(p.id)
  return hits
}
function tokenLikeLiterals(src: string): string[] {
  const shapes = ['dark', 'light', 'DARK', 'LIGHT', ' dark ', ' light ', 'system', 'auto']
  return quotedLiterals(src).filter((l) => shapes.includes(l) || l === ' dark ' || l === ' light ')
}
function extractStringArray(src: string, name: string): string[] {
  const re = new RegExp('const\\s+' + name + '\\s*=\\s*\\[([\\s\\S]*?)\\n\\s*\\]')
  const m = re.exec(src)
  if (m === null) return []
  return quotedLiterals(stripComments(m[1])).sort()
}
function extractSetMembers(src: string, name: string): string[] {
  const re = new RegExp('const\\s+' + name + '\\s*=\\s*new\\s+Set\\(\\s*\\[([\\s\\S]*?)\\]')
  const m = re.exec(src)
  if (m === null) return []
  return quotedLiterals(stripComments(m[1])).sort()
}
function rpcMethodMembers(): string[] {
  const src = readSource('src/shared/types.ts')
  if (src === null) return []
  const at = src.indexOf('export type RpcMethod =')
  if (at < 0) return []
  const rest = src.slice(at)
  const end = rest.indexOf('\n\n')
  return quotedLiterals(rest.slice(0, end < 0 ? rest.length : end)).sort()
}

// ---------------------------------------------------------------------------
// The caller-site name rule (§0 ruling 14 / §2.1 item 4) — the DECLARED table, GAP-2
// ---------------------------------------------------------------------------
interface NameRuleReading {
  value: string | null
  hooks: number
}
function declaredCallerNameRule(input: unknown, omitted: boolean): NameRuleReading {
  if (omitted || input === null || input === undefined) return { value: null, hooks: 0 }
  if (typeof input !== 'string') return { value: null, hooks: 0 }
  if (input === '') return { value: null, hooks: 0 }
  return { value: input, hooks: 0 }
}
function hookCountingProbe(counter: { n: number }): J {
  return {
    toString: (): string => {
      counter.n += 1
      return 'to-string'
    },
    valueOf: (): number => {
      counter.n += 1
      return 1
    },
  }
}

// ===========================================================================
// PRE — the harness mechanism and the pinned paths (§4.1, §5.1 rows 11/12/13)
// ===========================================================================
describe('PRE — harness + the pinned paths (§4.1, §5.1 rows 11/12/13)', () => {
  it('PRE-1 — the landed envelope module resolves and demoEnvelope() answers the demo tree', () => {
    expect(typeof demoEnvelope, 'the envelope module must resolve for every card row below').toBe('function')
    const root = rootNode()
    expect(root, '`demoEnvelope().template.root` must be an object').not.toBeNull()
    expect(tagOf(root ?? {}), 'the demo root is a `div` (§3.5 X-1).').toBe('div')
  })

  it('PRE-2 — this file IS the path §4.1 pins (`tests/theme-control.test.ts`)', () => {
    expect(
      TEST_PATH.endsWith(join('tests', 'theme-control.test.ts')),
      `§4.1/§5.1 row 13 pin the path \`tests/theme-control.test.ts\`; the running file is ${TEST_PATH}`,
    ).toBe(true)
  })

  it('PRE-3 — the two ALLOWED authored paths exist and the DENIED authority file is untouched by this row', () => {
    expect(readSource(ENVELOPE_PATH), `§5.1 row 11 (ALLOWED, authored data only): ${ENVELOPE_PATH}`).not.toBeNull()
    expect(readSource(RENDERER_PATH), `§5.1 row 12 (ALLOWED, one wiring role): ${RENDERER_PATH}`).not.toBeNull()
    const index = readSource(INDEX_PATH)
    expect(index, '§5.1 row 8 (DENIED): the appearance-authority file must exist and is NOT this row to edit').not.toBeNull()
    expect(
      (index ?? '').includes('color-scheme'),
      '§3.5 X-3 — `index.html` carries the PRE-EXISTING `color-scheme` authority this unit must not edit (§7a.1 item 3)',
    ).toBe(true)
  })
})

// ===========================================================================
// §3.1 — the valid / happy states
// ===========================================================================
describe('§3.1 M-* — valid / happy states', () => {
  it('M-1 (§2.1 item 1) — the card exists with FIVE nodes and EXACTLY the four declared ids', () => {
    const card = cardReading()
    expect(card.ok, card.reason).toBe(true)
    const nodes = card.nodes
    expect(nodes.length, '§2.1 item 1 — `1 + 1 + 2 + 1 = 5` authored nodes in the card subtree').toBe(5)
    const ids = nodes.map((n) => cssIdOf(n)).filter((id): id is string => id !== null)
    expect([...new Set(ids)].sort(), '§3.3 I-2/§2.2(D) — the node-id set by NAME, never a count alone').toEqual(
      [...DECLARED_ID_SET].sort(),
    )
    const section = card.section ?? {}
    expect(tagOf(section), '§2.1 item 1(1) — the card is a `section`').toBe('section')
    expect(classMembersOf(section), '§2.1 item 1(1) — `css.classes: ["card"]`').toEqual(['card'])
    const h2 = nodes.filter((n) => tagOf(n) === 'h2')
    expect(h2.length, '§2.1 item 1(2) — exactly ONE anonymous `h2`').toBe(1)
    expect(typeof contentOf(h2[0]), '§2.1 item 1(2) — the `h2` carries authored demo text').toBe('string')
    expect(tagOf(findById(DARK_ID) ?? {}), '§2.1 item 1(3) — `theme-dark` is a `button`').toBe('button')
    expect(tagOf(findById(LIGHT_ID) ?? {}), '§2.1 item 1(4) — `theme-light` is a `button`').toBe('button')
    const state = findById(STATE_ID)
    expect(tagOf(state ?? {}), '§2.1 item 1(5) — the state node is a `div`').toBe('div')
    expect(cssIdOf(state), '§2.1 item 1(5) — the state node carries `css.id`').toBe(STATE_ID)
    expect(
      propsIdOf(state),
      '§2.1 item 1(5)/§2.3 item 3 — the state node carries `props.id` TOO (the `list_targets`/resolution carrier)',
    ).toBe(STATE_ID)
  })

  it('M-2 (§2.1 item 1, §3.5 X-1/X-2) — the AUTHORED object census moves 18 -> 103 (AS FILED 18 -> 23; 25 at T2; 38 at D-113; 72 once the interface inventory landed; 73 once the layout\'s measured-figures carrier landed; 74 once the add-tab control landed; 75 once the application\'s name node landed; 79 once the four zone strips landed; 89 once the two pane-move grips and their eight zone drops landed; 97 once the SECOND ZONE-RESIDENT PANE and its grip, four drops and strip landed, and the relocation ghost beside them; 96 once the GHOST WAS DELETED WHOLE with its ordinal TENTH term, since the drag preview now RE-ARRANGES THE REAL PANES through the engine and the panes themselves stand in the insertion slot; 103 once the PANE CONTROL BAR landed its three head rows, three collapse controls and one inspector body, the TENTH STANDING term), and it is the authored noun', () => {
    const measured = authoredCensus()
    expect(
      measured,
      `§3.1 M-2 — the AUTHORED OBJECT census of \`demoEnvelope()\` must read ${POST_CENSUS}; measured ${measured} (${PRE_CENSUS} + ${CENSUS_DELTA} + ${T2_PAGE_NODE_CENSUS_DELTA} + ${OVERLAY_AUTHORED_DELTA} + ${LAYOUT_AUTHORED_NODE_DELTA} + ${TABS_ADD_AUTHORED_DELTA} + ${APP_NAME_AUTHORED_DELTA} + ${ZONE_STRIPS_AUTHORED_DELTA} + ${PANE_MOVE_AUTHORED_DELTA} + ${INSPECTOR_AUTHORED_DELTA} + ${PANE_CONTROL_BAR_AUTHORED_DELTA} = ${POST_CENSUS}). AS FILED the post figure was 23 (18 + 5): \`T2\`'s two declared page nodes moved it by ${T2_PAGE_NODE_CENSUS_DELTA} (docs/specs/store-tabs-record.md §5.1 item 2 / §0A item 5), \`D-113\`'s overlay nodes move it by ${OVERLAY_AUTHORED_DELTA}, the fourth term's ${LAYOUT_AUTHORED_NODE_DELTA} is the interface inventory's THIRTY-FOUR authored nodes (docs/L3/app-envelope/design.md rev 5 §2) PLUS the layout's measured-figures carrier \`layout-measured\` (rev 6 §2, \`A-8\`, D-203/D-204) — the figure \`D-193\` predicted and \`D-204\` re-grained — the FIFTH term's ${TABS_ADD_AUTHORED_DELTA} is the add-tab control \`${TABS_ADD_NODE_ID}\`, the top bar's \`+\`, authored BESIDE \`#tab-rows\` because a mint REPLACES that row set (D-201), the SIXTH term's ${APP_NAME_AUTHORED_DELTA} is the application's NAME NODE \`${APP_NAME_NODE_ID}\`, the top bar's FIRST child, authored when the user ruled *"make the name an element so it can truncate"* over \`D-177\`'s content-string cut, the SEVENTH term's ${ZONE_STRIPS_AUTHORED_DELTA} is the FOUR ZONE STRIPS \`${ZONE_STRIP_NODE_IDS.join('`/`')}\` (docs/L3/renderer-wiring/design-zone-handles.md rev 1 §2) — one authored sibling per declared zone, on the edge that faces the stage — and the EIGHTH term's ${PANE_MOVE_AUTHORED_DELTA} is the TWO PANE-MOVE GRIPS \`${PANE_GRAB_NODE_IDS.join('`/`')}\` PLUS their EIGHT ZONE DROPS \`${PANE_MOVE_DROPS.map((d) => d.id).join('`/`')}\` (docs/L3/renderer-wiring/design-pane-relocation.md rev 1 §7), each drop carrying \`props.pane\` and \`props.zone\` and each grip \`props.tabindex: '0'\`, the NINTH term\'s ${INSPECTOR_AUTHORED_DELTA} is the SECOND ZONE-RESIDENT PANE \`${INSPECTOR_PANE_NODE_ID}\` PLUS its move grip \`${INSPECTOR_GRAB_NODE_ID}\` PLUS its FOUR ZONE DROPS \`${INSPECTOR_MOVE_DROPS.map((d) => d.id).join('`/`')}\` PLUS its resize strip \`${INSPECTOR_STRIP_NODE_ID}\` (\`${INSPECTOR_PANE_AUTHORED_DELTA} + ${INSPECTOR_GRAB_AUTHORED_DELTA} + ${INSPECTOR_DROP_AUTHORED_DELTA} + ${INSPECTOR_STRIP_AUTHORED_DELTA} = ${INSPECTOR_AUTHORED_DELTA}\`, the pane that makes a zone hold TWO so an arrangement in a zone is exercisable), the TENTH **STANDING** term's ${PANE_CONTROL_BAR_AUTHORED_DELTA} is the PANE CONTROL BAR \`docs/L3/app-envelope/design-pane-control-bar.md\` rev 2 §2 AND \`docs/L3/renderer-wiring/design-pane-collapse.md\` rev 2 §3's \`A-14\`: the THREE HEAD ROWS \`${PANE_HEAD_NODE_IDS.join('`/`')}\` PLUS the THREE COLLAPSE CONTROLS \`${PANE_COLLAPSE_NODES.map((n) => n.id).join('`/`')}\` PLUS the inspector's ONE BODY \`${INSPECTOR_BODY_NODE_ID}\` (\`${PANE_HEAD_AUTHORED_DELTA} + ${PANE_COLLAPSE_AUTHORED_DELTA} + ${PANE_BODY_AUTHORED_DELTA} = ${PANE_CONTROL_BAR_AUTHORED_DELTA}\`, the two rows every pane gained and the one body that moved off its pane's own \`content\`), and the ORDINAL tenth term -- the relocation GHOST \`#pane-ghost\` -- is RETIRED WITH ITS NODE (the headstone in the constants block): the drag's preview now RE-ARRANGES THE REAL PANES through the engine's \`move\` op, so a ghost beside a pane that has already moved would be a node showing a picture of what is already on screen, and the tree is re-taken at \`103\` with NO ghost counted anywhere — the ordinal and the STANDING count differ by exactly that one retired term.`,
    ).toBe(POST_CENSUS)
    // ── THE FIFTH TERM IS ONE NODE A READER CAN POINT AT (`D-26`): the `1` above is not a slack
    //    figure — it is `#tab-add`. A SECOND node authored at that same id would move the census by
    //    two against a term of one, reddening HERE as well as at the figure and the sum below.
    expect(
      authoredNodesAtId(TABS_ADD_NODE_ID).length,
      `§2.1 item 1 / §3.1 M-2 — the FIFTH declared term's ${TABS_ADD_AUTHORED_DELTA} is the add-tab control \`${TABS_ADD_NODE_ID}\` and NOT a slack figure: the tree must hold EXACTLY ONE authored node at that id (a renamed, deleted or twice-authored control reddens here)`,
    ).toBe(TABS_ADD_AUTHORED_DELTA)
    // ── AND THE SIXTH TERM IS THE SAME KIND OF FIGURE, PINNED TO ITS OWN ADDRESS — the application's
    //    name node. THIS IS THE SECOND HALF OF WHAT CATCHES A NODE AT A THIRD ADDRESS: the one-node terms are
    //    each pinned to their OWN id and their OWN figure of one, so none can absorb a node authored
    //    at an address no term names, and a name node deleted or twice-authored reds HERE by name.
    expect(
      authoredNodesAtId(APP_NAME_NODE_ID).length,
      `§2.1 item 1 / §3.1 M-2 — the SIXTH declared term's ${APP_NAME_AUTHORED_DELTA} is the application's name node \`${APP_NAME_NODE_ID}\` and NOT a slack figure: the tree must hold EXACTLY ONE authored node at that id (a renamed, deleted or twice-authored name node reddens here)`,
    ).toBe(APP_NAME_AUTHORED_DELTA)
    // ── AND THE SEVENTH TERM IS FOUR NODES, EACH PINNED TO ITS OWN ADDRESS — so the `4` cannot become a slack
    //    figure: a strip renamed or deleted reds HERE by NAME, a strip authored twice reds by name as well as at
    //    the figure and the sum, and the four addresses' total is the term itself. **A FIFTH NODE ARRIVING
    //    UNNOTICED IS CAUGHT BY THE FIGURE, THE SUM AND THE RESIDUE TOGETHER** (see the two clauses below): the
    //    four addresses can absorb no node that is not one of the four, so a fifth strip lands as an UNDECLARED
    //    mover at `POST_CENSUS + 1` rather than inside this term.
    for (const stripId of ZONE_STRIP_NODE_IDS) {
      expect(
        authoredNodesAtId(stripId).length,
        `§2.1 item 1 / §3.1 M-2 — the SEVENTH declared term's ${ZONE_STRIPS_AUTHORED_DELTA} is the four zone strips and NOT a slack figure: \`${stripId}\` must be authored EXACTLY ONCE (a renamed, deleted or twice-authored strip reddens here, by name)`,
      ).toBe(1)
    }
    expect(
      ZONE_STRIP_NODE_IDS.reduce((sum, stripId) => sum + authoredNodesAtId(stripId).length, 0),
      `§2.1 item 1 / §3.1 M-2 — the four strip addresses hold EXACTLY the declared ${ZONE_STRIPS_AUTHORED_DELTA} nodes between them, so the term is the SUM of its addresses and no fifth node can hide inside it`,
    ).toBe(ZONE_STRIPS_AUTHORED_DELTA)
    // ── AND THE EIGHTH TERM IS TEN NODES AT TEN ADDRESSES — **TEN IDS GET TEN PER-ID ROWS**, the seventh
    //    term's precedent applied at ten, and NOT one term-level identity row. THE REASON, WHERE IT BITES:
    //    `measured === POST_CENSUS` AND `measured - PRE_CENSUS === Σ terms` are BOTH INVARIANT UNDER A SWAP —
    //    delete one drop (`−1`) and author one node at an address no term names (`+1`) and the figure, the sum
    //    and the residue all stand — so a term-level identity alone would hide exactly the mover this term
    //    exists to catch. Each id is pinned to its own address, so a RENAMED or DELETED drop reds BY NAME and
    //    a DUPLICATED id reds at the address that carries it twice; the group sums (`2 + 8 = 10`) and the
    //    props rows below stop the `10` from becoming a slack figure or a re-parented node from passing as one.
    for (const grabId of PANE_GRAB_NODE_IDS) {
      const grabs = authoredNodesAtId(grabId)
      expect(
        grabs.length,
        `§2.1 item 1 / §3.1 M-2 — the EIGHTH declared term's ${PANE_GRAB_AUTHORED_DELTA} grips are NOT a slack figure: \`${grabId}\` must be authored EXACTLY ONCE (a renamed, deleted or twice-authored grip reddens here, by name)`,
      ).toBe(1)
      expect(
        propsIdOf(grabs[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — \`${grabId}\` must carry \`props.id\` equal to its \`css.id\`, the addressability the drops' parents are read through (a grip whose \`css.id\` and \`props.id\` disagree reddens here)`,
      ).toBe(grabId)
      expect(
        propsValueOf(grabs[0] ?? null, 'tabindex'),
        `§2.1 item 1 / §3.1 M-2 — the grip \`${grabId}\` must carry \`props.tabindex: '0'\`: that bare attribute IS the page sheet's \`:focus-within\` arming, so a grip that lost it would stay in the census while ceasing to open its drops (design-pane-relocation.md §1)`,
      ).toBe('0')
    }
    for (const drop of PANE_MOVE_DROPS) {
      const drops = authoredNodesAtId(drop.id)
      expect(
        drops.length,
        `§2.1 item 1 / §3.1 M-2 — the EIGHTH declared term's ${PANE_MOVE_DROP_AUTHORED_DELTA} drops are NOT a slack figure: \`${drop.id}\` must be authored EXACTLY ONCE (a renamed, deleted or twice-authored drop reddens here, by name)`,
      ).toBe(1)
      expect(
        propsIdOf(drops[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — the drop \`${drop.id}\` must carry \`props.id\` equal to its \`css.id\` (the wiring's census reads the drops off the tree by address, design-pane-relocation.md §2)`,
      ).toBe(drop.id)
      expect(
        propsValueOf(drops[0] ?? null, 'pane'),
        `§2.1 item 1 / §3.1 M-2 — the drop \`${drop.id}\` must carry \`props.pane\` = \`${drop.pane}\`, the RECORD id its act addresses and NOT its node's id (a drop whose pane moved reddens here even though the census' figure would not move)`,
      ).toBe(drop.pane)
      expect(
        propsValueOf(drops[0] ?? null, 'zone'),
        `§2.1 item 1 / §3.1 M-2 — the drop \`${drop.id}\` must carry \`props.zone\` = \`${drop.zone}\`, the DECLARED zone id it relocates its pane to — read per row and never derived from the id's suffix, because a destination renamed on both sides together would keep a derived expectation standing while moving a pane`,
      ).toBe(drop.zone)
    }
    expect(
      PANE_GRAB_NODE_IDS.reduce((sum, grabId) => sum + authoredNodesAtId(grabId).length, 0),
      `§2.1 item 1 / §3.1 M-2 — the two grip addresses hold EXACTLY the declared ${PANE_GRAB_AUTHORED_DELTA} nodes between them, so the grips' group is the SUM of its addresses and no third grip can hide inside it`,
    ).toBe(PANE_GRAB_AUTHORED_DELTA)
    expect(
      PANE_MOVE_DROPS.reduce((sum, drop) => sum + authoredNodesAtId(drop.id).length, 0),
      `§2.1 item 1 / §3.1 M-2 — the eight drop addresses hold EXACTLY the declared ${PANE_MOVE_DROP_AUTHORED_DELTA} nodes between them, so the drops' group is the SUM of its addresses and a NINTH drop cannot hide inside the term`,
    ).toBe(PANE_MOVE_DROP_AUTHORED_DELTA)
    // ── AND THE NINTH TERM IS SEVEN NODES AT SEVEN ADDRESSES — the pane, its grip, its four drops and its strip,
    //    EACH pinned to its own address and its own figure of one, for the eighth term's reason applied to a whole
    //    subtree: `measured === POST_CENSUS` and `measured - PRE_CENSUS === Σ terms` are BOTH INVARIANT UNDER A SWAP,
    //    so a term-level identity alone would let a deleted drop and a spare node elsewhere stand together. The ids are
    //    the term's own, so a SECOND zone-resident pane that arrived with no grip, no drops and no strip reds here BY
    //    NAME (the pane's own address reads 1 while the grip's reads 0), which is exactly what the pane exists to prove.
    expect(
      authoredNodesAtId(INSPECTOR_PANE_NODE_ID).length,
      `§2.1 item 1 / §3.1 M-2 — the NINTH declared term's pane \`${INSPECTOR_PANE_NODE_ID}\` must be authored EXACTLY ONCE — a renamed, deleted or twice-authored second zone-resident pane reddens here by NAME`,
    ).toBe(INSPECTOR_PANE_AUTHORED_DELTA)
    expect(
      propsIdOf(authoredNodesAtId(INSPECTOR_PANE_NODE_ID)[0] ?? null),
      `§2.1 item 1 / §3.1 M-2 — the pane \`${INSPECTOR_PANE_NODE_ID}\` must carry \`props.id\` equal to its \`css.id\`: the record key and the node's address are the SAME string here and the equality is a row's (\`AL-8\`, \`AL-10\`, \`PM-1\`), never a derivation`,
    ).toBe(INSPECTOR_PANE_NODE_ID)
    const inspectorGrabs = authoredNodesAtId(INSPECTOR_GRAB_NODE_ID)
    expect(
      inspectorGrabs.length,
      `§2.1 item 1 / §3.1 M-2 — the NINTH term's grip \`${INSPECTOR_GRAB_NODE_ID}\` must be authored EXACTLY ONCE: the pane's move gesture is the grip's, and a pane without one is a box no drag can pick up`,
    ).toBe(INSPECTOR_GRAB_AUTHORED_DELTA)
    expect(
      propsIdOf(inspectorGrabs[0] ?? null),
      `§2.1 item 1 / §3.1 M-2 — \`${INSPECTOR_GRAB_NODE_ID}\` must carry \`props.id\` equal to its \`css.id\`, the addressability its four drops are read through`,
    ).toBe(INSPECTOR_GRAB_NODE_ID)
    expect(
      propsValueOf(inspectorGrabs[0] ?? null, 'tabindex'),
      `§2.1 item 1 / §3.1 M-2 — the grip \`${INSPECTOR_GRAB_NODE_ID}\` must carry \`props.tabindex: '0'\`: that bare attribute IS the page sheet's \`:focus-within\` arming, so a grip that lost it would stay in the census while ceasing to open its drops (design-pane-relocation.md §1)`,
    ).toBe('0')
    expect(
      classMembersOf(inspectorGrabs[0] ?? null),
      `§2.1 item 1 / §3.1 M-2 — and it must carry the \`pane-grab\` class and NOTHING ELSE, because that class is what the page sheet's \`.pane-grab\` rules bind the grip's pin, its dark pair and its header to: a grip whose class moved would stay in the census and stop being the control it is (\`D-247\`, \`D-256\`, \`D-257\`)`,
    ).toEqual(['pane-grab'])
    expect(
      propsValueOf(inspectorGrabs[0] ?? null, 'name'),
      `§2.1 item 1 / §3.1 M-2 — and \`props.name: 'Inspector'\`, the pane's DISPLAY NAME the header row paints through \`attr(name)\` (\`D-257\`): the name has no source but this attribute, so a grip that lost it would paint an EMPTY name while every other reading still stood`,
    ).toBe('Inspector')
    for (const drop of INSPECTOR_MOVE_DROPS) {
      const drops = authoredNodesAtId(drop.id)
      expect(
        drops.length,
        `§2.1 item 1 / §3.1 M-2 — the NINTH term's drop \`${drop.id}\` must be authored EXACTLY ONCE (a renamed, deleted or twice-authored drop reddens here, by name)`,
      ).toBe(1)
      expect(
        propsIdOf(drops[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — the drop \`${drop.id}\` must carry \`props.id\` equal to its \`css.id\` (the wiring's census reads the drops off the tree by address)`,
      ).toBe(drop.id)
      expect(
        propsValueOf(drops[0] ?? null, 'pane'),
        `§2.1 item 1 / §3.1 M-2 — the drop \`${drop.id}\` must carry \`props.pane\` = \`${drop.pane}\`, the RECORD id its act addresses and NOT its node's id`,
      ).toBe(drop.pane)
      expect(
        propsValueOf(drops[0] ?? null, 'zone'),
        `§2.1 item 1 / §3.1 M-2 — the drop \`${drop.id}\` must carry \`props.zone\` = \`${drop.zone}\`, the DECLARED zone id it relocates its pane to — read per row and never derived from the id's suffix`,
      ).toBe(drop.zone)
    }
    const inspectorStrips = authoredNodesAtId(INSPECTOR_STRIP_NODE_ID)
    expect(
      inspectorStrips.length,
      `§2.1 item 1 / §3.1 M-2 — the NINTH term's resize strip \`${INSPECTOR_STRIP_NODE_ID}\` must be authored EXACTLY ONCE: the pane's adjustable axis is its width in a \`top\` zone, and a pane with no strip beside it cannot be resized at all`,
    ).toBe(INSPECTOR_STRIP_AUTHORED_DELTA)
    expect(
      propsValueOf(inspectorStrips[0] ?? null, 'axis'),
      `§2.1 item 1 / §3.1 M-2 — and the strip must carry \`props.axis\` equal to its own id, which is how the wiring declares and censuses a handle (\`PS-1\`): a strip without it would be a bar the wiring cannot see`,
    ).toBe(INSPECTOR_STRIP_NODE_ID)
    expect(
      INSPECTOR_PANE_AUTHORED_DELTA + INSPECTOR_GRAB_AUTHORED_DELTA + INSPECTOR_DROP_AUTHORED_DELTA + INSPECTOR_STRIP_AUTHORED_DELTA,
      `§2.1 item 1 / §3.1 M-2 — and the NINTH term IS its four named parts: \`${INSPECTOR_PANE_AUTHORED_DELTA} + ${INSPECTOR_GRAB_AUTHORED_DELTA} + ${INSPECTOR_DROP_AUTHORED_DELTA} + ${INSPECTOR_STRIP_AUTHORED_DELTA} = ${INSPECTOR_AUTHORED_DELTA}\`; a part that no longer sums reddens here, at the arithmetic, before any tree is read`,
    ).toBe(INSPECTOR_AUTHORED_DELTA)
    expect(
      INSPECTOR_MOVE_DROPS.reduce((sum, drop) => sum + authoredNodesAtId(drop.id).length, 0),
      `§2.1 item 1 / §3.1 M-2 — and the four drop addresses hold EXACTLY the declared ${INSPECTOR_DROP_AUTHORED_DELTA} nodes between them, so the drops' group is the SUM of its addresses and a FIFTH drop cannot hide inside the term`,
    ).toBe(INSPECTOR_DROP_AUTHORED_DELTA)
    // ── AND THE TENTH STANDING TERM IS SEVEN NODES AT SEVEN ADDRESSES IN THREE KINDS — `3` heads, `3` controls, `1` body —
    //    **SO THE TERM SPLITS BY NODE KIND AND EACH OF ITS SEVEN IDS STILL GETS ITS OWN ROW.** The SPLIT is what makes the
    //    arithmetic say WHICH KIND moved (delete one control, author two heads and the `7` still sums; only a per-kind part
    //    reds); the PER-ID rows are the eighth term's precedent at this size, because `measured === POST_CENSUS` and
    //    `measured - PRE_CENSUS === Σ terms` are BOTH INVARIANT UNDER A SWAP. A kind-level row alone would let a swap stand
    //    between kinds; a per-id row alone would let a swap INSIDE the term stand. Both are kept.
    for (const headId of PANE_HEAD_NODE_IDS) {
      const heads = authoredNodesAtId(headId)
      expect(
        heads.length,
        `§2.1 item 1 / §3.1 M-2 — the TENTH standing term's ${PANE_HEAD_AUTHORED_DELTA} heads are NOT a slack figure: the head row \`${headId}\` must be authored EXACTLY ONCE (a renamed, deleted or twice-authored head reddens here, by name)`,
      ).toBe(1)
      expect(
        propsIdOf(heads[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — \`${headId}\` must carry \`props.id\` equal to its \`css.id\`, the addressability the renderer's head arm writes \`props.status\` through (design-pane-collapse.md §4)`,
      ).toBe(headId)
      expect(
        classMembersOf(heads[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — \`${headId}\` must carry the \`pane-head\` class and NOTHING ELSE: that class is what the sheet's \`.pane-head\` block binds the row's flex form, its two sticky insets and its rank to, so a head whose class moved would stay in the census and stop being the row (design-pane-collapse.md §6, D-246, D-261)`,
      ).toEqual(['pane-head'])
      expect(
        contentOf(heads[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — \`${headId}\` must author NO \`content\`: the row carries two controls and no text of its own (design-pane-control-bar.md rev 2 §2)`,
      ).toBeUndefined()
      expect(
        asObj(heads[0]?.['css'] ?? null)?.['style'],
        `§2.1 item 1 / §3.1 M-2 — \`${headId}\` must author NO \`css.style\`: the row's box is the SHEET's, and a \`position\` or a \`display\` here would race the sheet for a box no record owner claims (design-pane-control-bar.md rev 2 §8, D-129, D-174)`,
      ).toBeUndefined()
      expect(
        handlersOf(heads[0] ?? null).length,
        `§2.1 item 1 / §3.1 M-2 — \`${headId}\` must carry NO handler: the row is not a control, and the indicator that paints on it is the sheet's pseudo-element keyed on the \`status\` attribute the head arm writes (design-pane-control-bar.md rev 2 §5, D-129)`,
      ).toBe(0)
    }
    for (const control of PANE_COLLAPSE_NODES) {
      const controls = authoredNodesAtId(control.id)
      expect(
        controls.length,
        `§2.1 item 1 / §3.1 M-2 — the TENTH standing term's ${PANE_COLLAPSE_AUTHORED_DELTA} controls are NOT a slack figure: the collapse control \`${control.id}\` must be authored EXACTLY ONCE (a renamed, deleted or twice-authored control reddens here, by name)`,
      ).toBe(1)
      expect(
        propsIdOf(controls[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — \`${control.id}\` must carry \`props.id\` equal to its \`css.id\` (the act's census reads the control off the tree by address, design-pane-collapse.md §1 \`C1\`)`,
      ).toBe(control.id)
      expect(
        classMembersOf(controls[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — \`${control.id}\` must carry the \`pane-collapse\` class and NOTHING ELSE: the sheet's \`[collapsed="true"] .pane-collapse::before\` glyph is keyed on it, and a control whose class moved would stop painting \`▸\`/\`▾\` while every figure stood (design-pane-collapse.md §6)`,
      ).toEqual(['pane-collapse'])
      expect(
        propsValueOf(controls[0] ?? null, 'tabindex'),
        `§2.1 item 1 / §3.1 M-2 — \`${control.id}\` must carry \`props.tabindex: '0'\` so \`Tab\` reaches it: a control that lost it would keep its figure and stop being reachable (design-pane-control-bar.md rev 2 §2)`,
      ).toBe('0')
      expect(
        propsValueOf(controls[0] ?? null, 'pane'),
        `§2.1 item 1 / §3.1 M-2 — \`${control.id}\` must carry \`props.pane\` = \`${control.pane}\`, the RECORD id its act addresses and NOT always its node's id (\`gutter-collapse\`'s record pane is \`pane-a\`, \`D-194\`) — read per row and never derived from the id's stem, so a control whose act moved reddens here even though the census' figure would not`,
      ).toBe(control.pane)
      expect(
        contentOf(controls[0] ?? null),
        `§2.1 item 1 / §3.1 M-2 — \`${control.id}\` must author NO \`content\`: a node \`content\` beside the sheet's \`::before\` would be TWO owners of one glyph and the two disagree the moment the state changes (design-pane-control-bar.md rev 2 §4, D-129)`,
      ).toBeUndefined()
      const controlHandlers = handlersOf(controls[0] ?? null)
      expect(
        controlHandlers.length,
        `§2.1 item 1 / §3.1 M-2 — \`${control.id}\` must carry EXACTLY ONE authored handler pair, the one the wiring replaces with its live body (\`D-239\`'s path): a second pair would be a second act on one control`,
      ).toBe(1)
      expect(
        [controlHandlers[0]?.['name'], controlHandlers[0]?.['event']],
        `§2.1 item 1 / §3.1 M-2 — \`${control.id}\`'s authored pair must be (\`${PANE_COLLAPSE_HANDLER_NAME}\`, \`${PANE_COLLAPSE_HANDLER_EVENT}\`): that pair IS the address the act is installed under, so a renamed one would leave \`provident.dispatch\` reaching no body while the census stood (design-pane-collapse.md §1 \`C3\`)`,
      ).toEqual([PANE_COLLAPSE_HANDLER_NAME, PANE_COLLAPSE_HANDLER_EVENT])
      expect(
        typeof controlHandlers[0]?.['body'],
        `§2.1 item 1 / §3.1 M-2 — and its body must be a STRING (the authored function-STRING form the wiring replaces), never a function value`,
      ).toBe('string')
      // ── AND THE CONTROL IS THE GRIP'S **SIBLING**, WHICH IS THE DESIGN'S FIRST GUARDRAIL AND NOT A TIDY PREFERENCE
      //    (`design-pane-control-bar.md` rev 2 §1, §8): a `pointerdown` on ANY descendant of `.pane-grab` bubbles to the
      //    grip's own drag listener and arms the pane-move session, and that same press writes the four drops visible — so a
      //    collapse control nested inside the grip would arm a drag and paint four zone windows from ONE click, WHILE EVERY
      //    CENSUS FIGURE ABOVE STOOD. The row pins the shape that makes the bubbling impossible: the head's two children are
      //    the grip and the control, in that order, and the grip holds neither.
      const headOfControl = authoredNodesAtId(control.head)
      expect(
        childrenOf(headOfControl[0] ?? null).map(cssIdOf),
        `§2.1 item 1 / §3.1 M-2 — the head \`${control.head}\` must hold EXACTLY the grip \`${control.grip}\` and the control \`${control.id}\`, in that order: the row is what lays the two controls ALONG one row, and a third child would be a control the row does not carry (\`AL-1\`'s order is the e2e row's, this is the census's)`,
      ).toEqual([control.grip, control.id])
      expect(
        childrenOf(authoredNodesAtId(control.grip)[0] ?? null)
          .map(cssIdOf)
          .includes(control.id),
        `§2.1 item 1 / §3.1 M-2 — the collapse control \`${control.id}\` must NOT be a descendant of the grip \`${control.grip}\`: a press on it would bubble to the grip's drag listener and arm the pane-move session while every figure above stood (design-pane-control-bar.md rev 2 §1, §8)`,
      ).toBe(false)
    }
    const bodyNodes = authoredNodesAtId(INSPECTOR_BODY_NODE_ID)
    expect(
      bodyNodes.length,
      `§2.1 item 1 / §3.1 M-2 — the TENTH standing term's ${PANE_BODY_AUTHORED_DELTA} body is NOT a slack figure: \`${INSPECTOR_BODY_NODE_ID}\` must be authored EXACTLY ONCE (a renamed, deleted or twice-authored body reddens here, by name) — and a body left in its PANE's own \`content\` is the node this row cannot see, which is why \`AL-1\`'s markup arm and \`A-14\` exist beside it`,
    ).toBe(PANE_BODY_AUTHORED_DELTA)
    expect(
      propsIdOf(bodyNodes[0] ?? null),
      `§2.1 item 1 / §3.1 M-2 — \`${INSPECTOR_BODY_NODE_ID}\` must carry \`props.id\` equal to its \`css.id\``,
    ).toBe(INSPECTOR_BODY_NODE_ID)
    expect(
      classMembersOf(bodyNodes[0] ?? null),
      `§2.1 item 1 / §3.1 M-2 — \`${INSPECTOR_BODY_NODE_ID}\` must carry the \`pane-body\` class and NOTHING ELSE: a body inside a head's class would be hidden by the row rule and a body with none would be a box no collapsed-pane rule can reach (design-pane-collapse.md §3)`,
    ).toEqual(['pane-body'])
    expect(
      contentOf(bodyNodes[0] ?? null),
      `§2.1 item 1 / §3.1 M-2 — and its \`content\` must be \`${INSPECTOR_BODY_PLACEHOLDER}\`: the phrase an inspector says with nothing selected, and NOT the pane's name — a body echoing \`Inspector\` would put a second copy of the name above the header row, which is the defect \`D-259\` answered`,
    ).toBe(INSPECTOR_BODY_PLACEHOLDER)
    expect(
      handlersOf(bodyNodes[0] ?? null).length,
      `§2.1 item 1 / §3.1 M-2 — \`${INSPECTOR_BODY_NODE_ID}\` must carry NO handler: it is text, not a control`,
    ).toBe(0)
    expect(
      PANE_HEAD_NODE_IDS.reduce((sum, headId) => sum + authoredNodesAtId(headId).length, 0),
      `§2.1 item 1 / §3.1 M-2 — the three head addresses hold EXACTLY the declared ${PANE_HEAD_AUTHORED_DELTA} nodes between them, so the heads' kind is the SUM of its addresses and a FOURTH head cannot hide inside it`,
    ).toBe(PANE_HEAD_AUTHORED_DELTA)
    expect(
      PANE_COLLAPSE_NODES.reduce((sum, control) => sum + authoredNodesAtId(control.id).length, 0),
      `§2.1 item 1 / §3.1 M-2 — the three control addresses hold EXACTLY the declared ${PANE_COLLAPSE_AUTHORED_DELTA} nodes between them, so the controls' kind is the SUM of its addresses and a FOURTH control cannot hide inside it`,
    ).toBe(PANE_COLLAPSE_AUTHORED_DELTA)
    expect(
      PANE_HEAD_AUTHORED_DELTA + PANE_COLLAPSE_AUTHORED_DELTA + PANE_BODY_AUTHORED_DELTA,
      `§2.1 item 1 / §3.1 M-2 — and the TENTH standing term IS its three named kinds: \`${PANE_HEAD_AUTHORED_DELTA} + ${PANE_COLLAPSE_AUTHORED_DELTA} + ${PANE_BODY_AUTHORED_DELTA} = ${PANE_CONTROL_BAR_AUTHORED_DELTA}\`; a kind that no longer sums reddens here, at the arithmetic, before any tree is read`,
    ).toBe(PANE_CONTROL_BAR_AUTHORED_DELTA)
    expect(
      PANE_HEAD_NODE_IDS.length + PANE_COLLAPSE_NODES.length + PANE_BODY_AUTHORED_DELTA,
      `§2.1 item 1 / §3.1 M-2 — SEVEN IDS GET SEVEN ROWS: the term's ${PANE_CONTROL_BAR_AUTHORED_DELTA} addresses are three head ids PLUS three control ids PLUS the one body id, so the per-id rows above are one per declared address and no address is declared twice`,
    ).toBe(PANE_CONTROL_BAR_AUTHORED_DELTA)
    // ── AND THE ORDINAL TENTH TERM IS **RETIRED BY NAME, WITH ITS REASON** — NOT DELETED QUIETLY (`D-9`'s tombstone discipline).
    //    THE NODE IT COUNTED, `#pane-ghost`, NO LONGER EXISTS BY DESIGN: the drag's preview RE-ARRANGES THE REAL PANES
    //    through the engine's `move` op, so the pane itself stands in the insertion slot and its siblings are pushed — keeping
    //    a ghost would have been a node showing a picture of what is already on screen. The five identity rows this file ran
    //    at that address (authored EXACTLY ONCE, `props.id` = `css.id`, the `pane-ghost` class, no content, no handler, an
    //    authored `opacity: 0`) are RETIRED WITH THE NODE and their successor is the BITE BELOW: the address is asserted
    //    EMPTY, which reds on a node of ANY shape there. **AND IT IS THE READING THAT CATCHES A TERM REMOVED WITHOUT THE
    //    FIGURE FOLLOWING:** a ghost authored again — the node arriving unnoticed BEYOND the ten declared terms — reds HERE by name, at the figure
    //    above, at the ten-term sum and at the residue; a ghost returning while the figure is quietly re-spelled to absorb it
    //    reds at the sum, because no term in it counts that node.
    expect(
      authoredNodesAtId(RETIRED_PANE_GHOST_NODE_ID).length,
      `§2.1 item 1 / §3.1 M-2 — the ORDINAL tenth term is asserted GONE BY NAME: \`${RETIRED_PANE_GHOST_NODE_ID}\` must hold ZERO authored nodes, because the pane-move preview is the REAL panes re-arranged through the engine's \`move\` op and a ghost beside a pane that has already moved is a node showing a picture of what is already on screen. A ghost authored again reddens here — at the address it went missing from — as well as at the figure, the sum and the residue (AGENTS.md's UI authority also forbids a MINTED one, which no authored census could see)`,
    ).toBe(0)
    // ── A TERM THAT NO LONGER SUMS REDS HERE, BEFORE ANY TREE IS READ: the figure is its terms, and the
    //    eighth is its two groups. Edit a constant — or move the figure — without its counterpart and this
    //    reds even on a tree that happens to match, which is the arithmetic half `C-6` owns independently of
    //    the walk (`D-26`: a figure is never re-spelled to absorb a mover).
    expect(
      PANE_MOVE_AUTHORED_DELTA,
      `§2.1 item 1 / §3.1 M-2 — the EIGHTH term IS \`${PANE_GRAB_AUTHORED_DELTA} + ${PANE_MOVE_DROP_AUTHORED_DELTA} = ${PANE_MOVE_AUTHORED_DELTA}\`; a term that no longer sums reddens here`,
    ).toBe(PANE_GRAB_AUTHORED_DELTA + PANE_MOVE_DROP_AUTHORED_DELTA)
    expect(
      PRE_CENSUS + CENSUS_DELTA + T2_PAGE_NODE_CENSUS_DELTA + OVERLAY_AUTHORED_DELTA + LAYOUT_AUTHORED_NODE_DELTA + TABS_ADD_AUTHORED_DELTA + APP_NAME_AUTHORED_DELTA + ZONE_STRIPS_AUTHORED_DELTA + PANE_MOVE_AUTHORED_DELTA + INSPECTOR_AUTHORED_DELTA + PANE_CONTROL_BAR_AUTHORED_DELTA,
      `§2.1 item 1 / §3.1 M-2 — THE FIGURE IS ITS TERMS: \`${PRE_CENSUS} + ${CENSUS_DELTA} + ${T2_PAGE_NODE_CENSUS_DELTA} + ${OVERLAY_AUTHORED_DELTA} + ${LAYOUT_AUTHORED_NODE_DELTA} + ${TABS_ADD_AUTHORED_DELTA} + ${APP_NAME_AUTHORED_DELTA} + ${ZONE_STRIPS_AUTHORED_DELTA} + ${PANE_MOVE_AUTHORED_DELTA} + ${INSPECTOR_AUTHORED_DELTA} + ${PANE_CONTROL_BAR_AUTHORED_DELTA}\` must equal \`POST_CENSUS\` (${POST_CENSUS}); a term that no longer sums reddens here. **AND SO DOES A TERM REMOVED WITHOUT ITS FOLLOW-THROUGH**: the ORDINAL tenth term is RETIRED with the ghost it counted, so deleting any one of these TEN STANDING terms while \`POST_CENSUS\` stays \`${POST_CENSUS}\` reds HERE (the sum falls to \`${POST_CENSUS - 1}\` or less), while deleting the term AND dropping the figure to match reds at the figure above and at the residue below, because the tree would still hold the nodes`,
    ).toBe(POST_CENSUS)
    // ── THE ATTRIBUTED DRIFT (`RCA-8(d)`; `C-6`): the delta is asserted as the SUM OF ITS
    //    DECLARED TERMS, not as one bare figure — a count that moves for an UNDECLARED reason
    //    reddens HERE as well as at the figure above. THE AS-FILED FORM (`expect(measured -
    //    PRE_CENSUS).toBe(CENSUS_DELTA)`, true only while the card was the sole mover) is kept
    //    visible in the constants block above and is re-grained, not deleted.
    expect(
      measured - PRE_CENSUS,
      '§2.1 item 1 / §3.1 M-2 — the drift is EXACTLY the declared terms WITH their terms: the five authored card nodes PLUS T2\'s two page nodes PLUS D-113\'s thirteen overlay nodes PLUS the fourth term\'s thirty-five (the interface inventory\'s thirty-four authored nodes AND the layout\'s measured-figures carrier, A-8) PLUS the fifth term\'s one (the add-tab control `tab-add`, the top bar\'s `+`) PLUS the sixth term\'s one (the application\'s name node `app-name`, the top bar\'s FIRST child) PLUS the seventh term\'s four (the four zone strips, one per declared zone) PLUS the EIGHTH term\'s ten (the two pane-move grips AND their eight zone drops, `menus-grab`/`gutter-grab` with four drops under each) PLUS the NINTH term\'s seven (the SECOND ZONE-RESIDENT PANE `pane-inspector` AND its grip `inspector-grab` with its four zone drops AND its resize strip `inspector-vertical`) PLUS the TENTH STANDING term\'s seven (the three `pane-head` rows `menus-head`/`inspector-head`/`gutter-head`, the three `pane-collapse` controls `menus-collapse`/`inspector-collapse`/`gutter-collapse` and the one `inspector-body`) — and NOT the ORDINAL tenth term, which is RETIRED with the relocation ghost `pane-ghost` it counted (the node was deleted whole when the preview became the real panes re-arranged through the engine\'s `move` op)',
    ).toBe(CENSUS_DELTA + T2_PAGE_NODE_CENSUS_DELTA + OVERLAY_AUTHORED_DELTA + LAYOUT_AUTHORED_NODE_DELTA + TABS_ADD_AUTHORED_DELTA + APP_NAME_AUTHORED_DELTA + ZONE_STRIPS_AUTHORED_DELTA + PANE_MOVE_AUTHORED_DELTA + INSPECTOR_AUTHORED_DELTA + PANE_CONTROL_BAR_AUTHORED_DELTA)
    expect(measured - PRE_CENSUS - CENSUS_DELTA - OVERLAY_AUTHORED_DELTA - LAYOUT_AUTHORED_NODE_DELTA - TABS_ADD_AUTHORED_DELTA - APP_NAME_AUTHORED_DELTA - ZONE_STRIPS_AUTHORED_DELTA - PANE_MOVE_AUTHORED_DELTA - INSPECTOR_AUTHORED_DELTA - PANE_CONTROL_BAR_AUTHORED_DELTA, 'T2 §5.1 item 2 — with the overlay\'s thirteen AND the fourth term\'s thirty-five (the interface inventory\'s thirty-four plus the measured-figures carrier) AND the fifth term\'s one (the add-tab control) AND the sixth term\'s one (the name node) AND the seventh term\'s four (the four zone strips) AND the eighth term\'s ten (the two pane-move grips and their eight zone drops) AND the ninth term\'s seven (the second zone-resident pane with its grip, its four drops and its strip) AND the tenth STANDING term\'s seven (the three head rows, the three collapse controls and the one inspector body) taken out — and the ORDINAL tenth term no longer counted at all, since its ghost is deleted whole — the residue is EXACTLY this unit\'s two declared page nodes').toBe(T2_PAGE_NODE_CENSUS_DELTA)
  })

  it('M-3 (§2.1 item 2) — both buttons carry `theme-set`/`click`, as a function STRING, with one token each', () => {
    const dark = bodyOf(DARK_ID)
    const light = bodyOf(LIGHT_ID)
    expect(dark.ok, dark.reason).toBe(true)
    expect(light.ok, light.reason).toBe(true)
    for (const id of [DARK_ID, LIGHT_ID]) {
      const h = firstHandler(findById(id))
      expect(h, `§2.1 item 2 — \`${id}\` carries exactly one handler`).not.toBeNull()
      expect(h?.['name'], '§2.1 item 2 — the handler name').toBe(HANDLER_NAME)
      expect(h?.['event'], '§2.1 item 2 — the handler event').toBe(HANDLER_EVENT)
      expect(typeof h?.['body'], '§2.1 item 2/§2.4 item 3 — the body is a STRING, never a function value').toBe('string')
    }
    expect(
      [...new Set([...tokenLikeLiterals(dark.body), ...tokenLikeLiterals(light.body)])].sort(),
      '§2.1 item 3/§3.2 F-1 — one block member per button, and the CLOSED block is exactly `dark`|`light`',
    ).toEqual([...TOKEN_DOMAIN].sort())
    const both = dark.body + '\n' + light.body
    expect(/import/.test(both), '§2.4 item 3 — a string body imports NOTHING').toBe(false)
    expect(/data-/.test(both), '§1 item 7(ii) — no `data-*` attribute-name literal in the authored surface').toBe(false)
    expect(/matchMedia/.test(both), '§2.2(B) row 3 — no `matchMedia` read').toBe(false)
    expect(
      /targetProp\s*:\s*'(?!content)/.test(both),
      '§2.1 item 2(b)/§3.3 I-9 — the ONE write targets `content`; no second `targetProp` exists',
    ).toBe(false)
  })

  it('M-4 (§2.1 item 2(a)) — the write is EXACTLY ONE `state-slice` mutation of the declared shape', () => {
    const body = bodyOf(DARK_ID)
    expect(body.ok, body.reason).toBe(true)
    const state = stateDouble()
    expect(state, CARD_ABSENT).not.toBeNull()
    const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
    const thrown = driveBody(body.body, dbl.ctx, 'dark', false)
    expect(thrown, '§2.1 item 2 — the authored body declares no throw').toBeUndefined()
    expect(dbl.calls.length, '§2.1 item 2(a) — EXACTLY ONE apply call').toBe(1)
    const mut = firstMutation(dbl)
    expect(mut, '§2.1 item 2(a) — the mutation must be an object').not.toBeNull()
    expect(mut?.['targetProp'], '§2.1 item 2(a) — `targetProp: "content"`').toBe('content')
    expect(mut?.['mode'], '§2.1 item 2(a) — `mode: "replace"`').toBe('replace')
    expect(mut?.['value'], '§2.3 item 1 — the carried token, character for character').toBe('dark')
    expect(dbl.calls[0].nodeId, '§2.1 item 2(a) — the resolved node is the `theme-setting` node').toBe(STATE_ID)
    expect(dbl.inv.setAttribute + dbl.inv.classList + dbl.inv.style, '§2.4 item 4 — NO appearance write').toBe(0)
  })

  it('M-6 (§2.3 item 2, §3.3 I-3) — the token is carried WITHOUT interpretation (the positive control)', () => {
    const body = bodyOf(DARK_ID)
    expect(body.ok, body.reason).toBe(true)
    const cases: Array<{ shape: unknown; expected: string; label: string }> = [
      { shape: 'dark', expected: 'dark', label: 'the block member' },
      { shape: 'light', expected: 'light', label: 'the other block member' },
      { shape: 'DARK', expected: 'DARK', label: 'a case variant is NOT folded' },
      { shape: ' dark ', expected: ' dark ', label: 'a whitespace variant is NOT trimmed' },
      { shape: 'system', expected: 'system', label: 'a third token is carried, never remapped' },
      { shape: '', expected: '', label: '`""` is NOT replaced by a default' },
      { shape: 0, expected: '0', label: 'a number through the declared String() gate' },
      { shape: true, expected: 'true', label: 'a boolean through the declared String() gate' },
    ]
    for (const c of cases) {
      const state = stateDouble()
      expect(state, CARD_ABSENT).not.toBeNull()
      const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
      const thrown = driveBody(body.body, dbl.ctx, c.shape, false)
      expect(thrown, `§2.3 item 2 — driving ${c.label} must not throw`).toBeUndefined()
      const mut = firstMutation(dbl)
      expect(mut?.['value'], `§2.3 item 2/§3.3 I-3 — ${c.label}: the carried value must be ${JSON.stringify(c.expected)}`).toBe(
        c.expected,
      )
      expect(mut?.['targetProp'], '§2.1 item 2(a) — the ONE write is a `content` mutation').toBe('content')
    }
  })

  it('M-7 (§2.4 items 1/2, §3.3 I-6) — the wiring role holds the caller name and WRITES NOTHING', () => {
    const region = themeWiringRegion()
    expect(region.ok, region.reason).toBe(true)
    const name = callerNameConstant()
    expect(name.ok, name.reason).toBe(true)
    expect(name.value.length > 0, '§2.1 item 4 — the held name is a NON-EMPTY string by identity').toBe(true)
    const writes = writeInventoryScan(region.text)
    expect(
      writes,
      `§2.4 item 2 — the wiring role may NOT write an attribute, a class or a style; it does (${writes.join(', ')})`,
    ).toEqual([])
    const inv = emptyInventory()
    void recordingElement(inv) // the recording element double of §3.1 M-7's drive
    expect(inventoryTotal(inv), '§3.1 M-7 — every write counter on the element double is 0').toBe(0)
    expect(
      outsideGraphScan(region.text),
      '§2.4 item 2/§3.4 R-1 — the role creates no element and hand-writes no markup',
    ).toEqual([])
  })

  it('M-8 (§0 ruling 14, §2.1 item 4) — the declared name-echo rule over the 10 name shapes', () => {
    // GAP-2: the caller-site seam is unpinned, so the drive targets the DECLARED rule table and the
    // wiring's no-normalisation reading is asserted beside it (the rule is NEVER re-spelled into a
    // second authority, §2.1 item 4).
    const region = themeWiringRegion()
    expect(region.ok, region.reason).toBe(true)
    const counter = { n: 0 }
    const probe = hookCountingProbe(counter)
    const shapes: Array<{ input: unknown; omitted: boolean; expected: string | null; label: string }> = [
      { input: 'data-x', omitted: false, expected: 'data-x', label: '(1) a `data-`-shaped spelling the CALLER chose' },
      { input: 'class', omitted: false, expected: 'class', label: '(2) a caller-chosen name' },
      { input: ' ', omitted: false, expected: ' ', label: '(3) whitespace-only is INSIDE the echoed arm' },
      { input: '', omitted: false, expected: null, label: '(4) the empty string is the declared null' },
      { input: undefined, omitted: true, expected: null, label: '(5) the omitted argument is the declared null' },
      { input: null, omitted: false, expected: null, label: '(6) null is the declared null' },
      { input: 42, omitted: false, expected: null, label: '(7a) a number is the declared null' },
      { input: Number.NaN, omitted: false, expected: null, label: '(7b) NaN is the declared null' },
      { input: true, omitted: false, expected: null, label: '(8) a boolean is the declared null' },
      { input: probe, omitted: false, expected: null, label: '(10) an object with its own hooks is the declared null' },
    ]
    for (const s of shapes) {
      const reading = declaredCallerNameRule(s.input, s.omitted)
      expect(reading.value, `§2.1 item 4 — ${s.label}`).toBe(s.expected)
    }
    expect(counter.n, '§2.1 item 4 — `String()`/`toString`/`valueOf` are NEVER consulted (recorded count 0)').toBe(0)
    expect(
      /\.(?:trim|toLowerCase|toUpperCase|normalize|parse)\s*\(/.test(region.text),
      '§2.1 item 4 — the wiring never trims, normalises or parses the caller name',
    ).toBe(false)
  })

  // M-5 and M-9 are `[U]` rows (the live node-state / targets / html readings). `§4.2` item 6 keeps
  // them OUT of this `[T]` half: they cannot pass without the DECLARED GATE-6 BATTERY (`§5.2`), and
  // no row of this file may be offered as evidence about the live app (`§4.3`).
})

// ===========================================================================
// §3.2 — the documented fail-states
// ===========================================================================
describe('§3.2 F-* — documented fail-states', () => {
  it('F-1 (§2.1 item 3, §3.4 R-6) — a THIRD token, or a second spelling, is never authored', () => {
    const card = mustCard()
    const state = card.nodes.find((n) => cssIdOf(n) === STATE_ID) ?? null
    expect(
      TOKEN_DOMAIN.includes(String(contentOf(state))),
      `§2.3 item 3 — the authored initial \`content\` must be ONE of the two declared block members; it reads ${JSON.stringify(contentOf(state))}`,
    ).toBe(true)
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    expect(
      tokenLikeLiterals(region.text).sort(),
      '§2.1 item 3/§3.2 F-1 — the authored token literals are EXACTLY `dark` and `light` (block CLOSED at two)',
    ).toEqual([...TOKEN_DOMAIN].sort())
  })

  it('F-2 (§2.1 item 2, the declared degradation) — an unresolvable state node is a NO-OP, never a throw', () => {
    const body = bodyOf(DARK_ID)
    expect(body.ok, body.reason).toBe(true)
    const empty = makeCtx({ nodes: [] })
    expect(driveBody(body.body, empty.ctx, 'dark', false), '§2.1 item 2 — the no-op arm declares NO throw').toBeUndefined()
    expect(empty.calls.length, '§2.1 item 2 — zero mutations when no state node resolves').toBe(0)
    const other = makeCtx({ nodes: [nodeDouble('echo-out', 'x'), nodeDouble('counter', '0')] })
    expect(driveBody(body.body, other.ctx, 'dark', false), '§2.1 item 2 — a fabricated node is NEVER written').toBeUndefined()
    expect(other.calls.length, '§2.1 item 2 — no fallback node is written').toBe(0)
  })

  it('F-3 (§2.4 item 1, §5.U U-4/U-5) — a REFUSED write is a recorded reading, never a silent no-op', () => {
    const body = bodyOf(DARK_ID)
    expect(body.ok, body.reason).toBe(true)
    const state = stateDouble()
    expect(state, CARD_ABSENT).not.toBeNull()
    const before = String(state?.content)
    const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')], refuse: true })
    const thrown = driveBody(body.body, dbl.ctx, 'dark', false)
    expect(thrown, '§3.2 F-3 — a refusal is carried, never thrown').toBeUndefined()
    expect(dbl.calls.length, '§3.2 F-3 — the ONE write is still ISSUED (no silent pre-emptive no-op)').toBe(1)
    expect(dbl.statuses[0], "§3.2 F-3 — the runtime's own status is CARRIED by the reading ('rejected')").toBe('rejected')
    expect(
      String(dbl.nodes[0].content),
      '§3.2 F-3, by construction — a refusal cannot leave a moved `content` behind (§5.U U-5)',
    ).toBe(before)
  })

  it('F-7 (§2.4 item 4, §3.4 R-8) — no row of this unit asserts an APPLIED APPEARANCE', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const claims = scanAppliedAppearance(card.text + '\n' + wiring.text)
    expect(claims, `§2.4 item 4/§5.U U-6 — an appearance claim in the unit surface FAILS; found ${claims.join(', ')}`).toEqual([])
    expect(
      scanAppliedAppearance('el.style.color = "red"; getComputedStyle(el).color;'),
      '§3.4 R-8 — the POSITIVE CONTROL must FAIL (an applied-appearance claim is detected)',
    ).not.toEqual([])
  })

  it('F-8 (§1 item 7, §3.4 R-2) — the boundary clause is ENFORCEABLE: the generalising corpus reddens', () => {
    expect(
      scanDenied(POSITIVE_CONTROL_CORPUS, true).length,
      '§1 item 7/§6 item 4 — the scan MUST fail on a corpus carrying `data-theme`, `localStorage` and `matchMedia`',
    ).toBeGreaterThan(0)
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const hits = scanDenied(card.text, true)
    expect(
      hits.map((h) => `${h.id}: ${h.text}`),
      '§3.4 R-2 — none of the NAMED DENIED SET may appear in this unit own diff scope',
    ).toEqual([])
  })
})

// ===========================================================================
// §3.3 — the invariants
// ===========================================================================
describe('§3.3 I-* — invariants that hold in every state', () => {
  it('I-1 (§3.4 R-3, P-TC-5) — the tool / group / method censuses do not move', () => {
    const tools = [...ProvidentMcpServer.ALL_TOOLS].sort()
    expect(tools.length, '§5.3 item 4 / `docs/specs/focus-tool.md` `§5.1` row 21 (`N-20`) — the `ALL_TOOLS` count pin reads `27` at this head (the tool-census commit moved `21 → 22`, and the declared census exception `docs/L1/central-data-census-exception.md` §4 moved `22 → 27`); it is retained ONLY as a duplicate check, and the name-set half is asserted beside it').toBe(27)
    expect(new Set(tools).size, 'no duplicate tool name').toBe(tools.length)
    const groups = [...new Set(tools.map((t) => groupForTool(t)))].sort()
    expect(groups, '§5.1 row 1 — no unlanded group: the landed six group names, by NAME').toEqual([
      'code',
      'data',
      'dispatch',
      'graph',
      'module',
      'read',
    ])
    const renderer = sourceOrEmpty(RENDERER_PATH)
    expect(
      extractSetMembers(renderer, 'MUTATING_METHODS'),
      '§5.1 row 1/§3.3 I-1 — `MUTATING_METHODS` carries exactly its landed names',
    ).toEqual(['code.load', 'code.loadBatch', 'dispatch', 'journal', 'load', 'op', 'teardown'].sort())
    expect(
      rpcMethodMembers(),
      '§5.1 row 3 — the `RpcMethod` union members are unchanged BY NAME (never by a count quoted in a spec)',
    ).toEqual(
      [
        'code.create',
        'code.delete',
        'code.get',
        'code.load',
        'code.loadBatch',
        'code.set',
        'code.validate',
        // `docs/L1/central-data-census-exception.md` §4 — THE NAME-SET HALF of the census
        // move: the union gains the five `data.*` routes in the SAME COMMIT as `RpcMethod`
        // moves `22 → 27`, because a count move does NOT satisfy a name-set equality.
        'data.delete',
        'data.journal',
        'data.list',
        'data.read',
        'data.write',
        'dispatch',
        'export',
        // `docs/specs/focus-tool.md` `§5.1` row 21 (`N-20`) — THE NAME-SET HALF: the union's
        // member literal gains `'focus'` in the SAME COMMIT as the counts above, because a
        // count move does NOT satisfy a name-set equality.
        'focus',
        'journal',
        'listTargets',
        'load',
        'markdown',
        'module.install',
        'module.list',
        'module.update',
        'nodeState',
        'op',
        'renderedHtml',
        'teardown',
        'validate',
      ].sort(),
    )
  })

  it('I-2 (§2.1 item 1, P-TC-IM-2) — the node ids are CLOSED: five nodes, four ids, none created at runtime', () => {
    const card = mustCard()
    const ids = card.nodes.map((n) => cssIdOf(n)).filter((id): id is string => id !== null)
    expect([...new Set(ids)].sort()).toEqual([...DECLARED_ID_SET].sort())
    expect(card.nodes.length, 'the FIVE authored nodes').toBe(5)
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    expect(outsideGraphScan(region.text), '§3.3 I-2 — no hand-written `data-node-id`, no created element').toEqual([])
  })

  it('I-3 (§2.3 item 2, P-TC-IM-1) — the token is CARRIED, never interpreted', () => {
    const body = bodyOf(LIGHT_ID)
    expect(body.ok, body.reason).toBe(true)
    const hostile: unknown[] = ['DARK', ' dark ', 'system', '', null, 1, false]
    for (const shape of hostile) {
      const state = stateDouble()
      expect(state, CARD_ABSENT).not.toBeNull()
      const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
      const thrown = driveBody(body.body, dbl.ctx, shape, shape === undefined)
      expect(thrown, `§2.3 item 2 — no parse/comparison/validation may throw for ${JSON.stringify(shape)}`).toBeUndefined()
      const mut = firstMutation(dbl)
      const expected = shape === null ? '' : shape === '' ? '' : String(shape)
      expect(mut?.['value'], `§2.3 item 2 — ${JSON.stringify(shape)} is carried, not folded/trimmed/remapped`).toBe(expected)
    }
  })

  it('I-4 (P-TC-3, §0 ruling 2) — the block is DEMO DATA, not a policy: no ambient or OS read', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const ambient = [...scanDenied(card.text, true), ...scanDenied(wiring.text, true)].filter((h) => h.id.startsWith('(iv)'))
    expect(ambient.map((h) => h.text), '§3.3 I-4/§2.2(B) row 3 — no ambient read chooses or influences the token').toEqual([])
    const state = findById(STATE_ID)
    expect(
      TOKEN_DOMAIN.includes(String(contentOf(state))),
      '§2.3 item 3 — the initial value is AUTHORED demo data, one of the two block members',
    ).toBe(true)
  })

  it('I-5 (§1 item 6, P-TC-IM-5) — NO store, NO persistence, NO cache exists in this unit', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const storeHits = [...scanDenied(card.text, true), ...scanDenied(wiring.text, true)].filter(
      (h) => /localStorage|sessionStorage|indexedDB|cookie|matchMedia/.test(h.text),
    )
    expect(storeHits.map((h) => h.text), '§1 item 6 — no store token on this unit surface').toEqual([])
    expect(
      scanDenied('localStorage.setItem("theme", "dark")', true).length,
      '§5.5.1 P-TC-IM-5 drive (6) — the POSITIVE CONTROL must FAIL the store scan',
    ).toBeGreaterThan(0)
  })

  it('I-6 (§2.4 item 4, P-TC-6) — NO appearance write of any kind; the ONE write is a `content` mutation', () => {
    const dark = bodyOf(DARK_ID)
    const light = bodyOf(LIGHT_ID)
    expect(dark.ok, dark.reason).toBe(true)
    expect(light.ok, light.reason).toBe(true)
    for (const b of [dark, light]) {
      const state = stateDouble()
      expect(state, CARD_ABSENT).not.toBeNull()
      const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
      expect(driveBody(b.body, dbl.ctx, 'dark', false)).toBeUndefined()
      expect(inventoryTotal(dbl.inv), '§2.4 item 4 — every element-shaped write counter is 0 on this drive').toBe(0)
    }
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    expect(writeInventoryScan(region.text), '§1 item 7(iii) — no stylesheet/attribute/class/custom-property write').toEqual([])
  })

  it('I-7 (§2.4 item 3, §4.4 S-TC-9) — NO FABRICATED EDGE: nothing imports or consumes the theme mechanism', () => {
    const dark = bodyOf(DARK_ID)
    const light = bodyOf(LIGHT_ID)
    expect(dark.ok, dark.reason).toBe(true)
    expect(light.ok, light.reason).toBe(true)
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const edge = /resolveTheme|applyThemeDeclaration|shared\/theme|\bimport\b|\brequire\s*\(/
    for (const surface of [dark.body, light.body, region.text, wiring.text]) {
      expect(edge.test(surface), '§2.4 item 3/§2.5 item 3 — an import or a call into the mechanism FAILS R-4/I-7').toBe(false)
    }
    expect(typeof dark.body, '§2.4 item 3 — a STRING body cannot import anything (the data format)').toBe('string')
  })

  it('I-8 (§3.4 R-3/R-4, P-TC-5) — the MCP surface is CONSUMED, not extended (no new script or package key)', () => {
    const pkg = readPkg()
    const scripts = (pkg['scripts'] ?? {}) as Record<string, string>
    const landed = extractStringArray(sourceOrEmpty(UI_LEG_CONTRACT_PATH), 'LANDED_SCRIPT_KEYS')
    expect(landed.length, 'the landed script-key set must be extractable from its own pin (L-1)').toBeGreaterThan(0)
    expect(
      Object.keys(scripts).sort(),
      '§5.1 row 4 — no new script key: the `scripts` key set is EXACTLY the landed set + `ui`, BY NAME',
    ).toEqual([...landed, 'ui'].sort())
    expect(
      Object.entries(scripts).filter(([k]) => k.toLowerCase().includes('theme')).map(([k]) => k),
      '§1 item 8 — this unit adds no `package.json` key of its own',
    ).toEqual([])
  })

  it('I-9 (§2.1 item 2(b), P-TC-IM-4) — the write route is SINGLE: exactly one mutation per dispatch', () => {
    for (const id of [DARK_ID, LIGHT_ID]) {
      const b = bodyOf(id)
      expect(b.ok, b.reason).toBe(true)
      const state = stateDouble()
      expect(state, CARD_ABSENT).not.toBeNull()
      const dbl = makeCtx({ nodes: [state ?? nodeDouble(STATE_ID, '')] })
      expect(driveBody(b.body, dbl.ctx, 'light', false)).toBeUndefined()
      expect(dbl.calls.length, `§3.3 I-9 — \`${id}\` applies EXACTLY ONE mutation`).toBe(1)
      expect(dbl.statuses.length, '§2.1 item 2(b) — no preview channel, no second writer, no rebind').toBe(1)
    }
  })

  it('I-10 (§3.5 X-1/X-2, §5.U U-7) — the AUTHORED census is reconciled as 103 (AS FILED 23; 25 at T2; 38 at D-113; 72 once the interface inventory landed; 73 once the layout\'s measured-figures carrier landed; 74 once the add-tab control landed; 75 once the application\'s name node landed; 79 once the four zone strips landed; 89 once the two pane-move grips and their eight zone drops landed; 97 once the second zone-resident pane and the relocation ghost landed; 96 once the ghost was DELETED WHOLE with its ordinal tenth term; 103 once the PANE CONTROL BAR landed its three head rows, three collapse controls and one inspector body as the TENTH STANDING term), and no live reading is claimed here', () => {
    const authored = authoredCensus()
    expect(
      authored,
      `§3.3 I-10 — the AUTHORED OBJECT census is the only census this [T] half measures; it must read ${POST_CENSUS} (measured ${authored}; the SUM OF ITS NAMED PARTS is ${PRE_CENSUS} + ${CENSUS_DELTA} + ${T2_PAGE_NODE_CENSUS_DELTA} + ${OVERLAY_AUTHORED_DELTA} + ${LAYOUT_AUTHORED_NODE_DELTA} + ${TABS_ADD_AUTHORED_DELTA} + ${APP_NAME_AUTHORED_DELTA} + ${ZONE_STRIPS_AUTHORED_DELTA} + ${PANE_MOVE_AUTHORED_DELTA} + ${INSPECTOR_AUTHORED_DELTA} + ${PANE_CONTROL_BAR_AUTHORED_DELTA}). AS FILED it read 23 (18 + 5): T2's two declared page nodes moved it by ${T2_PAGE_NODE_CENSUS_DELTA} (docs/specs/store-tabs-record.md §5.1 item 2 / §0A item 5), D-113's overlay nodes move it by ${OVERLAY_AUTHORED_DELTA}, the fourth term's ${LAYOUT_AUTHORED_NODE_DELTA} is the interface inventory's THIRTY-FOUR authored nodes (docs/L3/app-envelope/design.md rev 5 §2) PLUS the layout's measured-figures carrier \`layout-measured\` (rev 6 §2, \`A-8\`, D-203/D-204), the fifth term's ${TABS_ADD_AUTHORED_DELTA} is the add-tab control \`${TABS_ADD_NODE_ID}\`, the sixth term's ${APP_NAME_AUTHORED_DELTA} is the application's name node \`${APP_NAME_NODE_ID}\` (the top bar's FIRST child, the user's ruling over \`D-177\`'s content-string cut), the seventh term's ${ZONE_STRIPS_AUTHORED_DELTA} is the FOUR ZONE STRIPS \`${ZONE_STRIP_NODE_IDS.join('`/`')}\` (docs/L3/renderer-wiring/design-zone-handles.md rev 1 §2), and the EIGHTH term's ${PANE_MOVE_AUTHORED_DELTA} is the TWO PANE-MOVE GRIPS \`${PANE_GRAB_NODE_IDS.join('`/`')}\` PLUS their EIGHT ZONE DROPS \`${PANE_MOVE_DROPS.map((d) => d.id).join('`/`')}\` (docs/L3/renderer-wiring/design-pane-relocation.md rev 1 §7) — each drop carrying \`props.pane\` and \`props.zone\`, each grip \`props.tabindex: '0'\`; the NINTH term\'s ${INSPECTOR_AUTHORED_DELTA} is the SECOND ZONE-RESIDENT PANE \`${INSPECTOR_PANE_NODE_ID}\` PLUS its grip \`${INSPECTOR_GRAB_NODE_ID}\` PLUS its FOUR ZONE DROPS \`${INSPECTOR_MOVE_DROPS.map((d) => d.id).join('`/`')}\` PLUS its resize strip \`${INSPECTOR_STRIP_NODE_ID}\` (\`${INSPECTOR_PANE_AUTHORED_DELTA} + ${INSPECTOR_GRAB_AUTHORED_DELTA} + ${INSPECTOR_DROP_AUTHORED_DELTA} + ${INSPECTOR_STRIP_AUTHORED_DELTA} = ${INSPECTOR_AUTHORED_DELTA}\`); and the TENTH term -- the relocation GHOST \`#pane-ghost\` -- is RETIRED WITH ITS NODE and counted by NO term here, because the drag's preview re-arranges the REAL panes through the engine's \`move\` op and the ghost was a picture of what those panes already show. The LOADED census belongs to the live app and its own command (§5.U U-7) and is NEVER re-quoted for this figure.`,
    ).toBe(POST_CENSUS)
    expect(
      authored - PRE_CENSUS,
      '§3.3 I-10 / C-6 — the drift is ATTRIBUTED, never re-spelled: the five card nodes PLUS T2\'s two page nodes PLUS D-113\'s thirteen overlay nodes PLUS the fourth term\'s thirty-five (the interface inventory\'s thirty-four authored nodes AND the layout\'s measured-figures carrier, A-8) PLUS the fifth term\'s one (the add-tab control `tab-add`, the top bar\'s `+`) PLUS the sixth term\'s one (the application\'s name node `app-name`, the top bar\'s FIRST child) PLUS the seventh term\'s four (the four zone strips, one per declared zone) PLUS the eighth term\'s ten (the two pane-move grips and their eight zone drops) PLUS the ninth term\'s seven (the second zone-resident pane `pane-inspector` with its grip, its four zone drops and its resize strip) PLUS the TENTH STANDING term\'s seven (the three `pane-head` rows `menus-head`/`inspector-head`/`gutter-head`, the three `pane-collapse` controls `menus-collapse`/`inspector-collapse`/`gutter-collapse` and the one `inspector-body`) — and NO term for the ORDINAL tenth, whose relocation ghost `pane-ghost` is retired with its node',
    ).toBe(CENSUS_DELTA + T2_PAGE_NODE_CENSUS_DELTA + OVERLAY_AUTHORED_DELTA + LAYOUT_AUTHORED_NODE_DELTA + TABS_ADD_AUTHORED_DELTA + APP_NAME_AUTHORED_DELTA + ZONE_STRIPS_AUTHORED_DELTA + PANE_MOVE_AUTHORED_DELTA + INSPECTOR_AUTHORED_DELTA + PANE_CONTROL_BAR_AUTHORED_DELTA)
    const titles = thisFileTitles()
    expect(
      titles.filter((t) => /loaded census|targets reading|rendered html reading/i.test(t)),
      '§3.3 I-10/§4.2 item 6 — no test row of this file may claim a LOADED census reading',
    ).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// Test-title extraction (the harness rows' own reading; comments stripped first)
// ---------------------------------------------------------------------------
function thisFileTitles(): string[] {
  const raw = readSource(join('tests', 'theme-control.test.ts'))
  if (raw === null) return []
  const code = stripComments(raw)
  const out: string[] = []
  const re = /it\(\s*'([^']*)'|it\(\s*"([^"]*)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(code)) !== null) out.push(m[1] !== '' ? m[1] : m[2])
  return out
}
/** §3.2 F-7/§3.4 R-8 — the applied-appearance claim set (harness bytes, CORPUS-EXEMPT). */
function scanAppliedAppearance(src: string): string[] {
  const hits: string[] = []
  const patterns: ScanPattern[] = [
    { id: 'getComputedStyle', re: /getComputedStyle/g },
    { id: 'a computed-style reading', re: /computedStyle\s*\(/g },
    { id: 'a stylesheet reaction', re: /stylesheet|styleSheets/g },
    { id: 'an inline appearance write', re: /\.style\.[a-zA-Z]+\s*=/g },
  ] // CORPUS-EXEMPT
  for (const p of patterns) if (p.re.test(src)) hits.push(p.id)
  return hits
}

/** §5.1's diff scope as a file walk (the `src/**` tree, for R-4). */
function walkSrc(relDir = 'src'): string[] {
  const abs = join(REPO_ROOT, relDir)
  if (!existsSync(abs)) return []
  const out: string[] = []
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const relPath = `${relDir}/${entry.name}`
    if (entry.isDirectory()) out.push(...walkSrc(relPath))
    else out.push(relPath)
  }
  return out
}

// ===========================================================================
// §3.4 — the STATIC rows, enumerated
// ===========================================================================
describe('§3.4 R-* — the static rows', () => {
  it('R-1 (§2.2 P-TC-2, ruling 4) — NO element authored outside the producing graph', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    expect(outsideGraphScan(card.text), '§3.4 R-1 — the card is DATA: no created element, no hand-written markup').toEqual([])
    expect(outsideGraphScan(wiring.text), '§3.4 R-1 — the wired role authors no text, control, style or slot').toEqual([])
    expect(
      outsideGraphScan('const el = document.createElement("button"); wrapper.innerHTML = "<b>x</b>"'),
      '§3.4 R-1 — the POSITIVE CONTROL must FAIL (a corpus creating an element and writing markup)',
    ).not.toEqual([])
  })

  it('R-2 (§1 item 7, §2.2(C)) — the BOUNDARY SCAN over this unit own diff scope, with both controls', () => {
    // The scan NAMES its exemptions (§2.2(C)); a scan row that does not is VACUOUS.
    expect(
      EXEMPTION_NAMES,
      '§2.2(C) — the BY-NAME EXEMPTION LIST must be declared by the scan row (the citations resolveTheme/applyThemeDeclaration/shared theme/color-scheme/index.html/matchMedia)',
    ).toEqual(
      expect.arrayContaining(['resolveTheme', 'applyThemeDeclaration', 'src/shared/theme.ts', 'color-scheme', 'index.html', 'matchMedia']),
    )
    expect(exemptionListIsDeclared(EXEMPTION_NAMES.join(' ')), '§2.2(C) — the exemption set is READABLE, not implied').toBe(true)
    expect(
      scanDenied(POSITIVE_CONTROL_CORPUS, true).map((h) => h.text),
      '§3.4 R-2 — the POSITIVE CONTROL corpus (data-theme + localStorage + matchMedia) MUST FAIL the row',
    ).not.toEqual([])
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    expect(
      scanDenied(card.text, true).map((h) => `${h.id}: ${h.text}`),
      '§3.4 R-2 — none of the NAMED DENIED SET of §1 item 7 appears in the authored card block',
    ).toEqual([])
    expect(
      scanDenied(wiring.text, true).map((h) => `${h.id}: ${h.text}`),
      '§3.4 R-2 — none of the NAMED DENIED SET appears in the wired role',
    ).toEqual([])
  })

  it('R-3 (§5.3 item 4, P-TC-5) — the tool census by NAME-SET EQUALITY against the landed pin', () => {
    const pinned = extractStringArray(sourceOrEmpty(ENGINE_PIN_PATH), 'PINNED_TOOL_SET')
    expect(pinned.length, 'the landed `PINNED_TOOL_SET` must be extractable from tests/engine-pin-version.test.ts — `docs/specs/focus-tool.md` `§5.1` row 21 (`N-20`) moved this COUNT `21 → 22`, and the declared census exception moved `22 → 27`').toBe(27)
    expect(
      [...ProvidentMcpServer.ALL_TOOLS].sort(),
      '§3.4 R-3 — SET equality against the pinned name set (the load-bearing half), never a count quoted from the spec',
    ).toEqual([...pinned].sort())
    expect(pinned.filter((t) => /theme/i.test(t)), '§5.3 item 4 — no theme-named tool exists at this tree').toEqual([])
    expect(ProvidentMcpServer.ALL_TOOLS.length, '§3.4 R-3 / `docs/specs/focus-tool.md` `§5.1` row 21 (`N-20`) — the count is a DUPLICATE check beside the set equality; it moved `21 → 22` and then `22 → 27` under the declared census exception').toBe(27)
  })

  it('R-4 (§2.5 item 1/§5.1) — the diff scope: the unit vocabulary lives ONLY in the two ALLOWED paths', () => {
    const vocab = [CARD_ID, DARK_ID, LIGHT_ID, STATE_ID, HANDLER_NAME]
    const carriers = walkSrc()
      .filter((p) => /\.(?:ts|tsx|js|mjs|html)$/.test(p))
      .filter((p) => {
        const src = sourceOrEmpty(p)
        return vocab.some((v) => src.includes(v))
      })
      .sort()
    expect(
      carriers,
      '§5.1 rows 11/12/1–10 — the unit vocabulary appears in the demo envelope and the renderer wiring role ONLY: any other carrier means a DENIED path was touched (src/main/**, types.ts, index.html, a sibling module, the appearance authority)',
    ).toEqual([ENVELOPE_PATH, RENDERER_PATH].sort())
  })

  it('R-5 (§1 item 6, §2.2 P-TC-4) — the NO-STORE row: nothing survives but the live graph', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    for (const surface of [card.text, wiring.text]) {
      const hits = scanDenied(surface, true).filter((h) =>
        /localStorage|sessionStorage|indexedDB|cookie|matchMedia|writeFile/.test(h.text),
      )
      expect(hits.map((h) => h.text), '§3.4 R-5 — no store, cache, registry, memo or preference record is added').toEqual([])
    }
    // The `[T]` analogue of §3.2 F-6's re-boot drive: a FRESH boot reconstructs the AUTHORED
    // INITIAL value, and the drive's premise (a previous token existed) is DRIVEN, not assumed.
    const first = stateDouble()
    expect(first, CARD_ABSENT).not.toBeNull()
    const initial = String(first?.content)
    const body = bodyOf(LIGHT_ID)
    expect(body.ok, body.reason).toBe(true)
    const prior = makeCtx({ nodes: [first ?? nodeDouble(STATE_ID, '')] })
    expect(driveBody(body.body, prior.ctx, 'system', false)).toBeUndefined()
    expect(String(prior.nodes[0].content), 'the premise: a carried token WAS live in the graph').toBe('system')
    const rebooted = stateDouble()
    expect(
      String(rebooted?.content),
      '§1 item 6/§3.2 F-6 — a re-boot must read the AUTHORED INITIAL value and NEVER the previous token (a persisted setting means a smuggled store)',
    ).toBe(initial)
  })

  it('R-6 (§2.2 P-TC-1, §2.1 item 3) — the VOCABULARY/LITERAL row: the unit own literals and nothing else', () => {
    const card = mustCard()
    for (const n of card.nodes) {
      const id = cssIdOf(n)
      if (id !== null) expect(DECLARED_ID_SET, `§2.2(D) — the authored id \`${id}\` is declared`).toContain(id)
      expect(CARD_CLASS_MEMBERS, `§2.1 item 1 — the class members of \`${cssIdOf(n)}\``).toEqual(expect.arrayContaining(classMembersOf(n)))
    }
    const region = cardRegion()
    expect(region.ok, region.reason).toBe(true)
    const literals = quotedLiterals(region.text)
    expect(literals.filter((l) => /^data-/.test(l)), '§2.2(B) row 2 — no `data-*` literal (no exemption is declared)').toEqual([])
    expect(literals.filter((l) => /^--/.test(l)), '§1 item 7(iii) — no `--`-shaped custom property').toEqual([])
    expect(literals.filter((l) => l === 'system' || l === 'auto'), '§2.1 item 3 — no third token, no `system`/`auto` member').toEqual([])
    expect(tokenLikeLiterals(region.text).sort(), '§3.4 R-6 — the TWO token bodies and nothing else').toEqual([...TOKEN_DOMAIN].sort())
    for (const id of [DARK_ID, LIGHT_ID]) {
      const h = firstHandler(findById(id))
      expect(h?.['name'], '§2.2(D) — the handler name is the declared one').toBe(HANDLER_NAME)
      expect(h?.['event'], '§2.2(D) — the event is the declared one').toBe(HANDLER_EVENT)
    }
  })

  it('R-8 (§2.4 item 4, §5.U U-6) — the APPLIED-APPEARANCE REFUSAL is structural, not parked', () => {
    const card = cardRegion()
    expect(card.ok, card.reason).toBe(true)
    const wiring = themeWiringRegion()
    expect(wiring.ok, wiring.reason).toBe(true)
    const claims = scanAppliedAppearance(card.text + '\n' + wiring.text)
    expect(claims, `§3.4 R-8 — an applied declaration/computed style/attribute presence/stylesheet reaction is REFUSED; found ${claims.join(', ')}`).toEqual([])
    expect(
      scanAppliedAppearance('expect(getComputedStyle(el).backgroundColor).toBe("rgb(0, 0, 0)")'),
      '§3.4 R-8 — the POSITIVE CONTROL must FAIL: an asserted applied-appearance row is detected',
    ).not.toEqual([])
  })

  it('R-9 (§3.5 X-5, §7a.1 item 4) — the PAGE-DESIGN PROBE: the file does not exist and the gap is recorded', () => {
    expect(
      existsSync(join(REPO_ROOT, DESIGN_SKILL_PATH)),
      '§3.4 R-9 — `docs/skills/designing-pages.md` does not exist at this tree, so no coverage matrix and no demo-page index exists to update',
    ).toBe(false)
    expect(
      sourceOrEmpty(SPEC_PATH).includes('designing-pages.md'),
      '§7a.1 item 4 — the page-design obligation is recorded as a GAP with an owner in the contract, not omitted',
    ).toBe(true)
  })

  // R-7 (the live RENDER-AND-CARRY row) is `[U]`: its instrument is `npm start` + the shipped MCP
  // tools (§5.U U-1/U-2, §5.2 leg 6) and this file claims no such reading (§4.3).
})

// ===========================================================================
// §3.5 — the EXISTENCE rows, each with its probe
// ===========================================================================
describe('§3.5 X-* — the existence rows', () => {
  it('X-1 (§2.1 item 1) — the authored census: 18 at filing time, 103 at this head (AS FILED 23 once the card landed; 25 at T2; 38 at D-113; 72 once the interface inventory landed; 73 once the layout\'s measured-figures carrier landed; 74 once the add-tab control landed; 75 once the application\'s name node landed; 79 once the four zone strips landed; 89 once the two pane-move grips and their eight zone drops landed; 97 once the second zone-resident pane and the relocation ghost landed; 96 once the relocation ghost was DELETED WHOLE with its ordinal tenth term; 103 once the PANE CONTROL BAR landed its three head rows, three collapse controls and one inspector body as the TENTH STANDING term)', () => {
    const spec = sourceOrEmpty(SPEC_PATH)
    expect(
      spec.includes('`18`') && spec.includes('`23`'),
      '§3.5 X-1 records the filing-time `18` and the as-filed post `23`; both figures stay visible in the contract, which this re-grain does NOT rewrite (the re-grain is OWED to the census rows, §1.1 C-6 — the figure `25` is an ENVELOPE MEASUREMENT, never a spec projection)',
    ).toBe(true)
    // ── THE ATTRIBUTION IS READ FROM THE DECLARING FILE ITSELF (`T2`'s register), so this
    //    re-grain cannot silently diverge from the unit that owns the delta.
    expect(
      PAGE_NODE_CENSUS_DELTA_AS_FILED,
      `T2 docs/specs/store-tabs-record.md §5.1 item 2 — ${PAGE_NODE_CENSUS_DELTA_SOURCE} must still declare PAGE_NODE_CENSUS_DELTA; a moved or deleted declaration reddens HERE`,
    ).toBe(T2_PAGE_NODE_CENSUS_DELTA)
    const measured = authoredCensus()
    expect(
      measured,
      `§3.5 X-1 — a pass quoting ${PRE_CENSUS} as the POST figure, or ${POST_CENSUS} as the pre figure, FAILS this row; measured ${measured}. AS FILED the post figure was 23.`,
    ).toBe(POST_CENSUS)
    expect(
      measured - PRE_CENSUS,
      'C-6 / §3.5 X-1 — the drift is ATTRIBUTED: the five card nodes PLUS T2\'s two declared page nodes PLUS D-113\'s thirteen overlay nodes PLUS the fourth term\'s thirty-five (the interface inventory\'s thirty-four authored nodes AND the layout\'s measured-figures carrier, A-8) PLUS the fifth term\'s one (the add-tab control `tab-add`, the top bar\'s `+`) PLUS the sixth term\'s one (the application\'s name node `app-name`, the top bar\'s FIRST child) PLUS the seventh term\'s four (the four zone strips, one per declared zone) PLUS the eighth term\'s ten (the two pane-move grips and their eight zone drops) PLUS the ninth term\'s seven (the second zone-resident pane `pane-inspector` with its grip, its four zone drops and its resize strip) PLUS the TENTH STANDING term\'s seven (the three `pane-head` rows `menus-head`/`inspector-head`/`gutter-head`, the three `pane-collapse` controls `menus-collapse`/`inspector-collapse`/`gutter-collapse` and the one `inspector-body`) — TEN STANDING declared terms and NO term for the ORDINAL tenth, that one being RETIRED with the relocation ghost `pane-ghost` it counted (deleted whole when the preview became the real panes re-arranged through the engine\'s `move` op) — with the undeclared residue asserted at ZERO',
    ).toBe(CENSUS_DELTA + T2_PAGE_NODE_CENSUS_DELTA + OVERLAY_AUTHORED_DELTA + LAYOUT_AUTHORED_NODE_DELTA + TABS_ADD_AUTHORED_DELTA + APP_NAME_AUTHORED_DELTA + ZONE_STRIPS_AUTHORED_DELTA + PANE_MOVE_AUTHORED_DELTA + INSPECTOR_AUTHORED_DELTA + PANE_CONTROL_BAR_AUTHORED_DELTA)
    expect(
      measured - PRE_CENSUS - CENSUS_DELTA - T2_PAGE_NODE_CENSUS_DELTA - OVERLAY_AUTHORED_DELTA - LAYOUT_AUTHORED_NODE_DELTA - TABS_ADD_AUTHORED_DELTA - APP_NAME_AUTHORED_DELTA - ZONE_STRIPS_AUTHORED_DELTA - PANE_MOVE_AUTHORED_DELTA - INSPECTOR_AUTHORED_DELTA - PANE_CONTROL_BAR_AUTHORED_DELTA,
      'C-6 — an UNDECLARED mover of the authored census: the delta is not the sum of its TEN STANDING declared terms (an authored node arriving with no term of its own — a FIFTH zone strip, a THIRD move grip, a spare drop at an address no term names, a FOURTH zone-resident pane with no term, a SECOND head row inside one pane, a FOURTH collapse control, or a SECOND body node — lands here, at the figure, and at M-2\'s identity rows, which are pinned to their own addresses and cannot absorb it). **AND THE GHOST IS THE ELEVENTH NODE THIS ROW WOULD CATCH**: a `#pane-ghost` authored again counts by NO term, so it lands here as a residue of `1` while `M-2` reddens at its retired address by name — the reading that keeps a DELETED term deleted rather than quietly re-opened (a term removed without the figure following reds at `M-2`\'s ten-term sum instead)',
    ).toBe(0)
  })

  it('X-2 (§3.5 X-2) — the tool/type censuses and the shipped command surface', () => {
    const cli = sourceOrEmpty(CLI_PATH)
    for (const cmd of ['dispatch <target> <event> [jsonArgs]', 'html', 'targets', 'node-state <target>']) {
      expect(cli.includes(cmd), `§3.5 X-2 — \`scripts/mcp-cli.mjs\` must ship the command \`${cmd}\``).toBe(true)
    }
    expect(ProvidentMcpServer.ALL_TOOLS, '§3.5 X-2 — the graph-side node-state call this unit observable lands through').toContain(
      'provident.get_node_state',
    )
    expect(sourceOrEmpty(SPEC_PATH).includes('provident.get_node_state'), '§3.5 X-2 — the contract names that tool').toBe(true)
  })

  it('X-3 (§3.5 X-3) — the pre-state claim and its post-landing branch, and the second authority', () => {
    const spec = sourceOrEmpty(SPEC_PATH)
    const card = cardSection()
    if (card === null) {
      // RED BRANCH (the as-filed claim): no appearance control exists yet at this tree.
      expect(
        sourceOrEmpty(ENVELOPE_PATH).includes(`'${CARD_ID}'`),
        '§3.5 X-3 (red branch) — the envelope authors no theme card, so the control does not exist',
      ).toBe(false)
      expect(
        sourceOrEmpty(INDEX_PATH).includes('color-scheme'),
        '§3.5 X-3/§2.5 item 2 — the only theme-ish artifact is `index.html` `color-scheme`, the PRE-EXISTING appearance authority (DENIED, §5.1 row 8)',
      ).toBe(true)
    } else {
      const nodes = allNodesOf(card)
      expect(nodes.length, '§3.5 X-3 (post branch) — five authored nodes once the card lands').toBe(5)
      expect(cssIdOf(card), 'the card id').toBe(CARD_ID)
    }
    expect(spec.includes('color-scheme'), '§3.5 X-3 — the contract records the second appearance authority').toBe(true)
  })

  it('X-5 (§3.5 X-5) — `docs/skills/designing-pages.md` is absent; `process-guardrails.md` is what is there', () => {
    const dir = join(REPO_ROOT, 'archive/gate-corpus-2026-10-29/skills')
    expect(existsSync(dir), '§3.5 X-5 — `docs/skills/` exists').toBe(true)
    const entries = existsSync(dir) ? readdirSync(dir) : []
    expect(entries.includes('designing-pages.md'), '§3.5 X-5 — globbed: the page-design skill does NOT exist').toBe(false)
    expect(entries.includes('process-guardrails.md'), '§3.5 X-5 — `process-guardrails.md` alone, as filed').toBe(true)
  })

  // X-4 ("no shipped instrument reads an applied declaration back") is CARRIED in §3.5 as a quoted
  // ruling/finding and is expressly NOT re-measured (`§3.5 X-4`); no test row is authored for it.
})

// ===========================================================================
// The declarations — §4.2 item 6, §5.2, §5.U (no `[U]` scenario is authored here)
// ===========================================================================
describe('DECL — the declared legs, the battery boundary and the [U] refusal', () => {
  it('DECL-1 (§4.2 item 6, §5.2) — NO `[U]` battery scenario is authored as a test in this file', () => {
    const titles = thisFileTitles()
    expect(titles.length, 'the title extraction must be live (a zero-title reading is an invalid report, never an empty one)').toBeGreaterThan(20)
    const offenders = titles.filter((t) => /npm start|npm run mcp|--target http|npm run ui/i.test(t))
    expect(
      offenders,
      '§4.2 item 6/§5.2 — the live battery is gate 6 own recorded run; a node-suite claim to it would be a finding',
    ).toEqual([])
    const spec = sourceOrEmpty(SPEC_PATH)
    const uRows = ['U-1', 'U-2', 'U-3', 'U-4', 'U-5', 'U-6', 'U-7', 'U-8'].filter((id) => spec.includes('**`' + id + '`**'))
    expect(uRows.length, '§5.U — the delta matrix declares EIGHT U-rows and they are the live gate own').toBe(8)
  })

  it('DECL-2 (§5.2) — the declared legs are recorded with their exact commands, gate 6 MANDATORY LIVE', () => {
    const spec = sourceOrEmpty(SPEC_PATH)
    const legs = [
      'npm test',
      'npm run typecheck',
      'npm run build',
      'npm run typecheck:tests',
      'npx tsc --noEmit --strict',
      'npm start',
      'npm run mcp -- --target http --port 3787 targets',
    ]
    for (const leg of legs) expect(spec.includes(leg), `§5.2 — the declared leg/command \`${leg}\` is recorded in the contract`).toBe(true)
    expect(
      spec.includes('`waived` is FORBIDDEN'),
      '§4.4 S-TC-3 — this unit gate 6 is MANDATORY LIVE and no STRUCTURAL substitution is available to it',
    ).toBe(true)
    expect(
      spec.includes('npm run ui') && spec.includes('PRECONDITION'),
      '§5.2 — the `ui` leg is a PRECONDITION and NEVER this control measurement (§4.4 S-TC-4)',
    ).toBe(true)
  })

  it('DECL-3 (§5.2) — the live battery instruments are named, and the ui leg is never the reading', () => {
    const spec = sourceOrEmpty(SPEC_PATH)
    expect(
      spec.includes('npm run mcp -- --target http --port 3787 node-state theme-setting'),
      '§5.2 item 2(c) — the graph-side node-state call the `[U]` observable lands through',
    ).toBe(true)
    expect(
      spec.includes('npm run mcp -- --target http --port 3787 dispatch theme-dark click'),
      '§5.2 item 3 — the dispatch whose result is the authored handler result',
    ).toBe(true)
    expect(
      spec.includes('NOT-OBSERVABLE'),
      '§5.U U-6/§5.2 item 6 — the structural refusal row (no appearance write exists) is declared, not parked',
    ).toBe(true)
  })
})

// ===========================================================================
// §5.5.1 — THE TYPED PROPERTY REGISTER, EXECUTED (deterministic, no new dependency)
//
// Strategy: EXHAUSTIVE / FINITE ENUMERATION for every row — no seed is claimed and none is added
// (§5.5.1 method note 2). Caps: `<=100` per row, `<=400` total, rows in REGISTER ORDER, and
// STOP AFTER 5 CONSECUTIVE FAILURES (the running row's remaining attempts are abandoned and no
// further row starts). An UN-RUN row is reported as a FAILURE, never as a pass (`§4.4 S-TC-6`).
// The declared TERM is the DRIVE COUNT; assertions/readings/controls are printed BESIDE it.
// ===========================================================================
interface AttemptResult {
  held: boolean
  reason: string
  assertions: number
  readings: number
  controls: number
}
function heldAttempt(assertions: number, readings = 0, controls = 0): AttemptResult {
  return { held: true, reason: '', assertions, readings, controls }
}
function brokenAttempt(reason: string, assertions = 1, readings = 0, controls = 0): AttemptResult {
  return { held: false, reason, assertions, readings, controls }
}
function checkAssertions(list: Array<{ label: string; ok: boolean }>, readings = 0, controls = 0): AttemptResult {
  const failed = list.filter((a) => !a.ok)
  if (failed.length === 0) return heldAttempt(list.length, readings, controls)
  return brokenAttempt(failed[0].label, list.length, readings, controls)
}
interface RegisterRowSpec {
  id: string
  type: 'P-IM' | 'P-SM' | 'P-TP'
  strategy: string
  declared: number
  /** §5.5.2 item 2 — the property text quantifies WIDER than the table it drives. */
  bounded: boolean
  attempts: Array<() => AttemptResult>
}
interface RowReading {
  id: string
  type: string
  strategy: string
  declared: number
  bounded: boolean
  attemptsRun: number
  held: number
  broken: number
  readings: number
  controls: number
  assertions: number
  stoppedEarly: boolean
  notStarted: boolean
  firstReason: string
}
const registerReadings: RowReading[] = []
let registerStoppedAt: string | null = null
let consecutiveFailures = 0

function runRegisterRow(spec: RegisterRowSpec): RowReading {
  const reading: RowReading = {
    id: spec.id,
    type: spec.type,
    strategy: spec.strategy,
    declared: spec.declared,
    bounded: spec.bounded,
    attemptsRun: 0,
    held: 0,
    broken: 0,
    readings: 0,
    controls: 0,
    assertions: 0,
    stoppedEarly: false,
    notStarted: false,
    firstReason: '',
  }
  if (registerStoppedAt !== null) {
    reading.notStarted = true
    reading.firstReason = `UN-RUN ROW reported as a FAILURE: the register STOPPED at ${registerStoppedAt} after 5 consecutive failures (§5.5.1 method note 3, §4.4 S-TC-6) — an un-run row is never a pass.`
    registerReadings.push(reading)
    return reading
  }
  for (let i = 0; i < spec.attempts.length; i += 1) {
    let result: AttemptResult
    try {
      result = spec.attempts[i]()
    } catch (e) {
      result = brokenAttempt(`attempt ${i + 1} threw at the harness boundary: ${String(e)}`)
    }
    reading.attemptsRun += 1
    reading.assertions += result.assertions
    reading.readings += result.readings
    reading.controls += result.controls
    if (result.held) {
      reading.held += 1
      consecutiveFailures = 0
    } else {
      reading.broken += 1
      consecutiveFailures += 1
      if (reading.firstReason === '') reading.firstReason = `attempt ${i + 1}: ${result.reason}`
      if (consecutiveFailures >= 5) {
        reading.stoppedEarly = true
        registerStoppedAt = spec.id
        break
      }
    }
  }
  registerReadings.push(reading)
  return reading
}
function registerRowTest(spec: RegisterRowSpec): void {
  const r = runRegisterRow(spec)
  expect(
    r.notStarted,
    `§5.5.1/§4.4 S-TC-6 — \`${spec.id}\` did NOT RUN. ${r.firstReason}`,
  ).toBe(false)
  expect(
    r.broken,
    `§5.5.1 — \`${spec.id}\` (${spec.strategy}, declared term ${spec.declared} drives) recorded ${r.broken} BROKEN attempt(s) of ${r.attemptsRun} run. FIRST BREAK — ${r.firstReason}`,
  ).toBe(0)
  expect(r.stoppedEarly, `§5.5.1 — \`${spec.id}\` stopped early after 5 consecutive failures`).toBe(false)
  expect(r.attemptsRun, `§5.5.1 — \`${spec.id}\` must drive EVERY declared attempt`).toBe(spec.declared)
}

// --- the shared attempt plumbing (all doubles are argument-supplied) --------
function withBody(id: string, run: (body: string) => AttemptResult): AttemptResult {
  const c = cardReading()
  if (!c.ok) return brokenAttempt(c.reason, 1, 1)
  const b = bodyOf(id)
  if (!b.ok) return brokenAttempt(b.reason, 1, 1)
  return run(b.body)
}
function stateNodeRequired(): { ok: boolean; node: NodeDouble; reason: string } {
  const sd = stateDouble()
  if (sd === null) return { ok: false, node: nodeDouble(STATE_ID, ''), reason: CARD_ABSENT }
  return { ok: true, node: sd, reason: 'the authored state node' }
}
function idSetOfCard(root: J | null): string[] {
  return [
    ...new Set(
      allNodesOf(root)
        .map((n) => cssIdOf(n))
        .filter((id): id is string => id !== null),
    ),
  ].sort()
}
function idSetClauseHolds(root: J | null): boolean {
  const ids = idSetOfCard(root)
  const count = allNodesOf(root).length
  return count === 5 && ids.length === 4 && ids.every((id) => DECLARED_ID_SET.includes(id))
}
function propsClauseHolds(root: J | null): boolean {
  const state = allNodesOf(root).find((n) => cssIdOf(n) === STATE_ID) ?? null
  return state !== null && propsIdOf(state) === STATE_ID
}
// The IM-2 corpora (§5.5.1 S-TC-SURFACE-1's four shapes). The synthetic corpora are HARNESS
// bytes (they exist to make the clause FAIL), never the unit's authored surface.
function corpusCard(): J {
  return {
    type: 'section',
    css: { id: CARD_ID, classes: ['card'] },
    children: [
      { type: 'h2', content: 'Appearance' },
      { type: 'button', css: { id: DARK_ID, classes: ['btn'] }, content: 'Dark', handlers: [] },
      { type: 'button', css: { id: LIGHT_ID, classes: ['btn'] }, content: 'Light', handlers: [] },
      { type: 'div', css: { id: STATE_ID, classes: ['theme-setting'] }, props: { id: STATE_ID }, content: 'dark' },
    ],
  }
}
function corpusWithFifthId(): J {
  const card = corpusCard()
  const kids = card['children'] as J[]
  kids.push({ type: 'button', css: { id: 'theme-extra', classes: ['btn'] }, content: 'Extra' })
  return card
}
function corpusWithoutPropsId(): J {
  const card = corpusCard()
  for (const child of card['children'] as J[]) {
    if (cssIdOf(child) === STATE_ID) delete child['props']
  }
  return card
}

// --- P-TC-IM-1 — the token domain and the no-interpretation rule (12) ------
interface ArgShape {
  label: string
  value: unknown
  omit: boolean
  expected: string | null
  hookProbe?: { n: number }
}
function im1Shapes(): ArgShape[] {
  const recording = { n: 0 }
  return [
    { label: '(1) `dark`', value: 'dark', omit: false, expected: 'dark' },
    { label: '(2) `light`', value: 'light', omit: false, expected: 'light' },
    { label: '(3) `DARK` (a case variant)', value: 'DARK', omit: false, expected: 'DARK' },
    { label: '(4) `" dark "` (a whitespace variant)', value: ' dark ', omit: false, expected: ' dark ' },
    { label: '(5) `system` (a third token — carried, never remapped)', value: 'system', omit: false, expected: 'system' },
    { label: '(6) `""`', value: '', omit: false, expected: '' },
    { label: '(7) the argument OMITTED', value: undefined, omit: true, expected: '' },
    { label: '(8) `null`', value: null, omit: false, expected: '' },
    { label: '(9) a number (0)', value: 0, omit: false, expected: '0' },
    { label: '(10) a boolean (true)', value: true, omit: false, expected: 'true' },
    { label: '(11) an object whose `toString` RECORDS', value: hookCountingProbe(recording), omit: false, expected: 'to-string', hookProbe: recording },
  ]
}
function im1HostileProxy(mode: 'throwing' | 'revoked'): unknown {
  if (mode === 'revoked') {
    const { proxy, revoke } = Proxy.revocable({}, {})
    revoke()
    return proxy
  }
  return new Proxy(
    {},
    {
      get(): never {
        throw new Error('the hostile Proxy traps THROW (P-TC-IM-1 shape 12)')
      },
      has(): never {
        throw new Error('the hostile Proxy traps THROW (P-TC-IM-1 shape 12)')
      },
    },
  )
}
function im1Attempt(shape: ArgShape | null, hostile: 'throwing' | 'revoked' | null): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateNodeRequired()
    if (!st.ok) return brokenAttempt(st.reason, 1, 1)
    const dbl = makeCtx({ nodes: [st.node] })
    if (hostile !== null) {
      const thrown = driveBody(body, dbl.ctx, im1HostileProxy(hostile), false)
      const mut = firstMutation(dbl)
      const carried = mut === null ? null : mut['value']
      return checkAssertions(
        [
          { label: '§5.5.1 P-TC-IM-1 (12) — a hostile Proxy argument must NOT throw (the body is TOTAL)', ok: thrown === undefined },
          { label: '§5.5.1 P-TC-IM-1 (12) — at most ONE mutation', ok: dbl.calls.length <= 1 },
          {
            label: "§5.5.1 P-TC-IM-1 (12) — no TOKEN is minted for an argument whose String() throws (GAP-3: `''` written or no write at all)",
            ok: carried === null || carried === '',
          },
        ],
        2,
      )
    }
    const spec = shape ?? { label: '', value: '', omit: false, expected: '' }
    const thrown = driveBody(body, dbl.ctx, spec.value, spec.omit)
    const mut = firstMutation(dbl)
    const value = mut === null ? undefined : mut['value']
    const hookCount = spec.hookProbe === undefined ? null : spec.hookProbe.n
    return checkAssertions(
      [
        { label: `§5.5.1 P-TC-IM-1 ${spec.label} — the authored body must NOT throw`, ok: thrown === undefined },
        { label: `§5.5.1 P-TC-IM-1 ${spec.label} — EXACTLY ONE mutation`, ok: dbl.calls.length === 1 },
        {
          label: `§5.5.1 P-TC-IM-1 ${spec.label} — the write is a \`content\` replace`,
          ok: mut !== null && mut['targetProp'] === 'content' && mut['mode'] === 'replace',
        },
        {
          label: `§5.5.1 P-TC-IM-1 ${spec.label} — the CARRIED value must be ${JSON.stringify(spec.expected)} (identity for strings, the declared String() form otherwise; nothing interpreted)`,
          ok: value === spec.expected,
        },
        {
          label: `§5.5.1 P-TC-IM-1 ${spec.label} — no DEFAULT token may be substituted (the ENVELOPE closes the block, not the body)`,
          ok: spec.expected === 'dark' || spec.expected === 'light' || (value !== 'dark' && value !== 'light'),
        },
        {
          label: '§5.5.1 P-TC-IM-1 — the `toString`/`valueOf` invocation count is the declared one',
          ok: hookCount === null || hookCount === 1,
        },
      ],
      3,
    )
  })
}
const REGISTER_IM_1: RegisterRowSpec = {
  id: 'P-TC-IM-1',
  type: 'P-IM',
  strategy: 'S-TC-DOMAIN-1',
  declared: 12,
  bounded: true,
  attempts: [
    ...im1Shapes().map((s) => (): AttemptResult => im1Attempt(s, null)),
    (): AttemptResult => im1Attempt(null, 'throwing'),
  ],
}

// --- P-TC-IM-2 — the authored node-id set and the boundary scan (8) --------
function im2Attempt(shape: 1 | 2 | 3 | 4, config: 'object' | 'scan'): AttemptResult {
  if (config === 'object') {
    if (shape === 1) {
      const card = cardReading()
      if (!card.ok) return brokenAttempt(card.reason, 1, 1)
      return checkAssertions(
        [
          { label: '§5.5.1 P-TC-IM-2 shape (1) — the authored id set is CLOSED at the four declared ids', ok: idSetClauseHolds(card.section) },
          { label: '§5.5.1 P-TC-IM-2 shape (1) — the state node carries BOTH `css.id` and `props.id`', ok: propsClauseHolds(card.section) },
          { label: `§5.5.1 P-TC-IM-2 shape (1) — the authored census moves ${PRE_CENSUS} -> ${POST_CENSUS} (AS FILED 18 -> 23; T2's two page nodes, docs/specs/store-tabs-record.md §5.1 item 2; D-113's ${OVERLAY_AUTHORED_DELTA} overlay nodes; the fourth term's ${LAYOUT_AUTHORED_NODE_DELTA} = the interface inventory's ${INTERFACE_INVENTORY_NODE_DELTA} authored nodes, docs/L3/app-envelope/design.md rev 5 §2, PLUS the layout's measured-figures carrier \`layout-measured\`, rev 6 §2 \`A-8\`; the fifth term's ${TABS_ADD_AUTHORED_DELTA} = the add-tab control \`${TABS_ADD_NODE_ID}\`, the top bar's \`+\`; the sixth term's ${APP_NAME_AUTHORED_DELTA} = the application's name node \`${APP_NAME_NODE_ID}\`, the top bar's FIRST child; the seventh term's ${ZONE_STRIPS_AUTHORED_DELTA} = the four zone strips \`${ZONE_STRIP_NODE_IDS.join('`/`')}\`, docs/L3/renderer-wiring/design-zone-handles.md rev 1 §2; the EIGHTH term's ${PANE_MOVE_AUTHORED_DELTA} = the TWO PANE-MOVE GRIPS \`${PANE_GRAB_NODE_IDS.join('`/`')}\` PLUS their EIGHT ZONE DROPS \`${PANE_MOVE_DROPS.map((d) => d.id).join('`/`')}\`, docs/L3/renderer-wiring/design-pane-relocation.md rev 1 §7; the NINTH term's ${INSPECTOR_AUTHORED_DELTA} = the SECOND ZONE-RESIDENT PANE \`${INSPECTOR_PANE_NODE_ID}\` PLUS its grip \`${INSPECTOR_GRAB_NODE_ID}\` PLUS its FOUR ZONE DROPS \`${INSPECTOR_MOVE_DROPS.map((d) => d.id).join('`/`')}\` PLUS its resize strip \`${INSPECTOR_STRIP_NODE_ID}\`, ${INSPECTOR_PANE_AUTHORED_DELTA} + ${INSPECTOR_GRAB_AUTHORED_DELTA} + ${INSPECTOR_DROP_AUTHORED_DELTA} + ${INSPECTOR_STRIP_AUTHORED_DELTA}; and the TENTH STANDING term's ${PANE_CONTROL_BAR_AUTHORED_DELTA} = the PANE CONTROL BAR, docs/L3/app-envelope/design-pane-control-bar.md rev 2 §2 and docs/L3/renderer-wiring/design-pane-collapse.md rev 2's \`A-14\`: the THREE HEAD ROWS \`${PANE_HEAD_NODE_IDS.join('`/`')}\` PLUS the THREE COLLAPSE CONTROLS \`${PANE_COLLAPSE_NODES.map((n) => n.id).join('`/`')}\` PLUS the inspector's ONE BODY \`${INSPECTOR_BODY_NODE_ID}\`, ${PANE_HEAD_AUTHORED_DELTA} + ${PANE_COLLAPSE_AUTHORED_DELTA} + ${PANE_BODY_AUTHORED_DELTA}; and NO term for the ORDINAL tenth, that one -- the relocation GHOST \`#pane-ghost\` -- being RETIRED WITH ITS NODE: the drag's preview re-arranges the REAL panes through the engine's \`move\` op, so a ghost beside a pane that has already moved would be a node showing a picture of what is already on screen, and the tree measures \`${POST_CENSUS}\` with no term counting it)`, ok: authoredCensus() === POST_CENSUS },
          { label: `§5.5.1 P-TC-IM-2 shape (1) — the FIFTH declared term's ${TABS_ADD_AUTHORED_DELTA} is ONE node a reader can point at: \`${TABS_ADD_NODE_ID}\` is authored EXACTLY ONCE (a renamed, deleted or twice-authored control reddens here)`, ok: authoredNodesAtId(TABS_ADD_NODE_ID).length === TABS_ADD_AUTHORED_DELTA },
          { label: `§5.5.1 P-TC-IM-2 shape (1) — the SIXTH declared term's ${APP_NAME_AUTHORED_DELTA} is ONE node a reader can point at: \`${APP_NAME_NODE_ID}\` is authored EXACTLY ONCE (a renamed, deleted or twice-authored name node reddens here, and a node authored at another address cannot hide inside either one-node term)`, ok: authoredNodesAtId(APP_NAME_NODE_ID).length === APP_NAME_AUTHORED_DELTA },
          { label: `§5.5.1 P-TC-IM-2 shape (1) — the SEVENTH declared term's ${ZONE_STRIPS_AUTHORED_DELTA} is FOUR nodes a reader can point at: each of \`${ZONE_STRIP_NODE_IDS.join('`/`')}\` is authored EXACTLY ONCE, and the four addresses hold EXACTLY ${ZONE_STRIPS_AUTHORED_DELTA} nodes between them (a renamed, deleted or twice-authored strip reddens here, by name, and a FIFTH node cannot hide inside the term)`, ok: ZONE_STRIP_NODE_IDS.every((stripId) => authoredNodesAtId(stripId).length === 1) && ZONE_STRIP_NODE_IDS.reduce((sum, stripId) => sum + authoredNodesAtId(stripId).length, 0) === ZONE_STRIPS_AUTHORED_DELTA },
          { label: `§5.5.1 P-TC-IM-2 shape (1) — the EIGHTH declared term's ${PANE_GRAB_AUTHORED_DELTA} grips are TWO nodes a reader can point at: each of \`${PANE_GRAB_NODE_IDS.join('`/`')}\` is authored EXACTLY ONCE, carries \`props.id\` equal to its \`css.id\`, and carries \`props.tabindex: '0'\` — the bare attribute the page sheet's \`:focus-within\` reveal is armed by (a renamed, deleted or twice-authored grip, or one that lost its tabindex, reddens here, by name)`, ok: PANE_GRAB_NODE_IDS.every((grabId) => { const g = authoredNodesAtId(grabId); return g.length === 1 && propsIdOf(g[0] ?? null) === grabId && propsValueOf(g[0] ?? null, 'tabindex') === '0' }) && PANE_GRAB_NODE_IDS.reduce((sum, grabId) => sum + authoredNodesAtId(grabId).length, 0) === PANE_GRAB_AUTHORED_DELTA },
          { label: `§5.5.1 P-TC-IM-2 shape (1) — the EIGHTH declared term's ${PANE_MOVE_DROP_AUTHORED_DELTA} drops are EIGHT nodes a reader can point at: each of \`${PANE_MOVE_DROPS.map((d) => d.id).join('`/`')}\` is authored EXACTLY ONCE and carries BOTH \`props.pane\` (the RECORD id) and \`props.zone\` (the DECLARED destination) as this census spells them (a renamed, deleted or twice-authored drop reddens here by name, and a drop whose operands moved reddens here even though the figure would not)`, ok: PANE_MOVE_DROPS.every((drop) => { const d = authoredNodesAtId(drop.id); return d.length === 1 && propsIdOf(d[0] ?? null) === drop.id && propsValueOf(d[0] ?? null, 'pane') === drop.pane && propsValueOf(d[0] ?? null, 'zone') === drop.zone }) && PANE_MOVE_DROPS.reduce((sum, drop) => sum + authoredNodesAtId(drop.id).length, 0) === PANE_MOVE_DROP_AUTHORED_DELTA },
          { label: `§5.5.1 P-TC-IM-2 shape (1) / C-6 — the EIGHTH term is ${PANE_GRAB_AUTHORED_DELTA} + ${PANE_MOVE_DROP_AUTHORED_DELTA} = ${PANE_MOVE_AUTHORED_DELTA} and TEN IDS GET TEN PER-ID ROWS: a term-level identity alone is INVARIANT UNDER A SWAP (a deleted drop and an eleventh node elsewhere leave the figure and the sum standing), so the tenth row is the one that carries the mover`, ok: PANE_MOVE_AUTHORED_DELTA === PANE_GRAB_AUTHORED_DELTA + PANE_MOVE_DROP_AUTHORED_DELTA && PANE_GRAB_NODE_IDS.length + PANE_MOVE_DROPS.length === PANE_MOVE_AUTHORED_DELTA },
          { label: `§5.5.1 P-TC-IM-2 shape (1) / C-6 — the NINTH term is ${INSPECTOR_PANE_AUTHORED_DELTA} + ${INSPECTOR_GRAB_AUTHORED_DELTA} + ${INSPECTOR_DROP_AUTHORED_DELTA} + ${INSPECTOR_STRIP_AUTHORED_DELTA} = ${INSPECTOR_AUTHORED_DELTA} and SEVEN IDS GET SEVEN PER-ID ROWS: the pane \`${INSPECTOR_PANE_NODE_ID}\` ONCE with \`props.id\` equal to its \`css.id\`, its grip \`${INSPECTOR_GRAB_NODE_ID}\` ONCE with \`props.tabindex: '0'\` (the sheet's \`:focus-within\` arming for its four drops), its four drops \`${INSPECTOR_MOVE_DROPS.map((d) => d.id).join('`/`')}\` ONCE EACH with \`props.pane\` and \`props.zone\`, and its strip \`${INSPECTOR_STRIP_NODE_ID}\` ONCE with \`props.axis\` — so a renamed, deleted or twice-authored node reds BY NAME at its own address, and a SECOND zone-resident pane arriving with no grip, no drops and no strip reds at the parts arithmetic`, ok: INSPECTOR_AUTHORED_DELTA === INSPECTOR_PANE_AUTHORED_DELTA + INSPECTOR_GRAB_AUTHORED_DELTA + INSPECTOR_DROP_AUTHORED_DELTA + INSPECTOR_STRIP_AUTHORED_DELTA && authoredNodesAtId(INSPECTOR_PANE_NODE_ID).length === INSPECTOR_PANE_AUTHORED_DELTA && propsIdOf(authoredNodesAtId(INSPECTOR_PANE_NODE_ID)[0] ?? null) === INSPECTOR_PANE_NODE_ID && authoredNodesAtId(INSPECTOR_GRAB_NODE_ID).length === INSPECTOR_GRAB_AUTHORED_DELTA && propsValueOf(authoredNodesAtId(INSPECTOR_GRAB_NODE_ID)[0] ?? null, 'tabindex') === '0' && INSPECTOR_MOVE_DROPS.every((drop) => authoredNodesAtId(drop.id).length === 1 && propsValueOf(authoredNodesAtId(drop.id)[0] ?? null, 'pane') === drop.pane && propsValueOf(authoredNodesAtId(drop.id)[0] ?? null, 'zone') === drop.zone) && INSPECTOR_MOVE_DROPS.reduce((sum, drop) => sum + authoredNodesAtId(drop.id).length, 0) === INSPECTOR_DROP_AUTHORED_DELTA && authoredNodesAtId(INSPECTOR_STRIP_NODE_ID).length === INSPECTOR_STRIP_AUTHORED_DELTA && propsValueOf(authoredNodesAtId(INSPECTOR_STRIP_NODE_ID)[0] ?? null, 'axis') === INSPECTOR_STRIP_NODE_ID },
          { label: `§5.5.1 P-TC-IM-2 shape (1) / C-6 — the TENTH STANDING term is ${PANE_HEAD_AUTHORED_DELTA} + ${PANE_COLLAPSE_AUTHORED_DELTA} + ${PANE_BODY_AUTHORED_DELTA} = ${PANE_CONTROL_BAR_AUTHORED_DELTA} BY NODE KIND AND ITS SEVEN IDS GET SEVEN PER-ID ROWS: the three heads \`${PANE_HEAD_NODE_IDS.join('`/`')}\` ONCE EACH with their \`pane-head\` class (and no content, no css.style, no handler), the three controls \`${PANE_COLLAPSE_NODES.map((n) => n.id).join('`/`')}\` ONCE EACH with \`props.pane\` read off the node (\`gutter-collapse\`'s record pane is \`pane-a\`), \`props.tabindex: '0'\`, no content and the one authored (\`${PANE_COLLAPSE_HANDLER_NAME}\`, \`${PANE_COLLAPSE_HANDLER_EVENT}\`) pair, and the one body \`${INSPECTOR_BODY_NODE_ID}\` with \`${INSPECTOR_BODY_PLACEHOLDER}\` — so a renamed, deleted or twice-authored node reds BY NAME at its own address and a kind that no longer sums reds at the arithmetic`, ok: PANE_CONTROL_BAR_AUTHORED_DELTA === PANE_HEAD_AUTHORED_DELTA + PANE_COLLAPSE_AUTHORED_DELTA + PANE_BODY_AUTHORED_DELTA && PANE_HEAD_NODE_IDS.every((headId) => { const h = authoredNodesAtId(headId); return h.length === 1 && propsIdOf(h[0] ?? null) === headId && classMembersOf(h[0] ?? null).join('|') === 'pane-head' && contentOf(h[0] ?? null) === undefined && handlersOf(h[0] ?? null).length === 0 }) && PANE_HEAD_NODE_IDS.reduce((sum, headId) => sum + authoredNodesAtId(headId).length, 0) === PANE_HEAD_AUTHORED_DELTA && PANE_COLLAPSE_NODES.every((control) => { const c = authoredNodesAtId(control.id); const h = handlersOf(c[0] ?? null); return c.length === 1 && propsIdOf(c[0] ?? null) === control.id && propsValueOf(c[0] ?? null, 'pane') === control.pane && propsValueOf(c[0] ?? null, 'tabindex') === '0' && contentOf(c[0] ?? null) === undefined && h.length === 1 && h[0]?.['name'] === PANE_COLLAPSE_HANDLER_NAME && h[0]?.['event'] === PANE_COLLAPSE_HANDLER_EVENT }) && PANE_COLLAPSE_NODES.reduce((sum, control) => sum + authoredNodesAtId(control.id).length, 0) === PANE_COLLAPSE_AUTHORED_DELTA && authoredNodesAtId(INSPECTOR_BODY_NODE_ID).length === PANE_BODY_AUTHORED_DELTA && contentOf(authoredNodesAtId(INSPECTOR_BODY_NODE_ID)[0] ?? null) === INSPECTOR_BODY_PLACEHOLDER && classMembersOf(authoredNodesAtId(INSPECTOR_BODY_NODE_ID)[0] ?? null).join('|') === 'pane-body' },
          { label: `§5.5.1 P-TC-IM-2 shape (1) / C-6 — and each collapse control is the GRIP'S SIBLING and NEVER its descendant (the design's first guardrail): a \`pointerdown\` on any descendant of \`.pane-grab\` bubbles to the grip's drag listener and ARMS the pane-move session, so a control nested inside the grip would arm a drag and paint four zone windows from ONE click while every figure above stood — the head \`<pane>-head\` holds exactly \`${PANE_COLLAPSE_NODES.map((n) => `${n.grip}`).join('`/`')}\` and its control, in that order`, ok: PANE_COLLAPSE_NODES.every((control) => childrenOf(authoredNodesAtId(control.head)[0] ?? null).map(cssIdOf).join('|') === [control.grip, control.id].join('|') && childrenOf(authoredNodesAtId(control.grip)[0] ?? null).map(cssIdOf).includes(control.id) === false) },{ label: `§5.5.1 P-TC-IM-2 shape (1) / C-6 — the ORDINAL tenth term is RETIRED BY NAME, WITH ITS REASON, AND NOT DELETED QUIETLY: \`${RETIRED_PANE_GHOST_NODE_ID}\` must hold ZERO authored nodes, because the node it counted (the relocation GHOST \`#pane-ghost\`) was DELETED WHOLE when the pane-move preview became the REAL panes re-arranged through the engine's \`move\` op — the identity rows this file ran there (authored EXACTLY ONCE, \`props.id\` = \`css.id\`, the \`pane-ghost\` class, no content, no handler, an authored \`opacity: 0\`) retire with the node, and their successor is this zero reading, which reds on a node of ANY shape at that address. It is ALSO the reading that catches the DELETION being quietly RE-OPENED: a ghost authored again is the eleventh node arriving unnoticed, reds here by name as well as at the figure, at the ten-term sum and at the residue, and a MINTED one is invisible to any authored census and unlawful besides (AGENTS.md's UI authority)`, ok: authoredNodesAtId(RETIRED_PANE_GHOST_NODE_ID).length === 0 },
          { label: `§5.5.1 P-TC-IM-2 shape (1) / C-6 — the drift is ATTRIBUTED: measured - pre === the five card nodes + T2's ${T2_PAGE_NODE_CENSUS_DELTA} page nodes + D-113's ${OVERLAY_AUTHORED_DELTA} overlay nodes + the fourth term's ${LAYOUT_AUTHORED_NODE_DELTA} (the interface inventory's thirty-four AND the measured-figures carrier) + the fifth term's ${TABS_ADD_AUTHORED_DELTA} (the add-tab control) + the sixth term's ${APP_NAME_AUTHORED_DELTA} (the application's name node) + the seventh term's ${ZONE_STRIPS_AUTHORED_DELTA} (the four zone strips) + the eighth term's ${PANE_MOVE_AUTHORED_DELTA} (the two pane-move grips and their eight zone drops) + the ninth term's ${INSPECTOR_AUTHORED_DELTA} (the second zone-resident pane with its grip, its four drops and its strip) + the TENTH STANDING term's ${PANE_CONTROL_BAR_AUTHORED_DELTA} (the three head rows, the three collapse controls and the one inspector body) and NO term for the ORDINAL tenth, that one being RETIRED with the relocation ghost it counted (an UNDECLARED mover reddens here)`, ok: authoredCensus() - PRE_CENSUS === CENSUS_DELTA + T2_PAGE_NODE_CENSUS_DELTA + OVERLAY_AUTHORED_DELTA + LAYOUT_AUTHORED_NODE_DELTA + TABS_ADD_AUTHORED_DELTA + APP_NAME_AUTHORED_DELTA + ZONE_STRIPS_AUTHORED_DELTA + PANE_MOVE_AUTHORED_DELTA + INSPECTOR_AUTHORED_DELTA + PANE_CONTROL_BAR_AUTHORED_DELTA },
          { label: `§5.5.1 P-TC-IM-2 shape (1) / C-6 — the UNDECLARED residue is ZERO: neither the figure nor the sum is re-spelled to absorb a mover`, ok: authoredCensus() - PRE_CENSUS - CENSUS_DELTA - T2_PAGE_NODE_CENSUS_DELTA - OVERLAY_AUTHORED_DELTA - LAYOUT_AUTHORED_NODE_DELTA - TABS_ADD_AUTHORED_DELTA - APP_NAME_AUTHORED_DELTA - ZONE_STRIPS_AUTHORED_DELTA - PANE_MOVE_AUTHORED_DELTA - INSPECTOR_AUTHORED_DELTA - PANE_CONTROL_BAR_AUTHORED_DELTA === 0 },
        ],
        4,
      )
    }
    if (shape === 2) {
      return heldAttempt(1, 1)
    }
    if (shape === 3) {
      return heldAttempt(1, 1)
    }
    return checkAssertions(
      [{ label: '§5.5.1 P-TC-IM-2 shape (4) — the denied-token corpus keeps the declared id set (the scan is the other instrument)', ok: idSetClauseHolds(corpusCard()) }],
      1,
    )
  }
  if (shape === 1) {
    const card = cardRegion()
    if (!card.ok) return brokenAttempt(card.reason, 1, 1)
    const hits = scanDenied(card.text, true)
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-IM-2 config (ii) — the authored card block carries NONE of the DENIED SET', ok: hits.length === 0 },
        { label: '§5.5.1 P-TC-IM-2 config (ii) — the BY-NAME EXEMPTION LIST is named', ok: EXEMPTION_NAMES.length >= 6 },
      ],
      2,
      1,
    )
  }
  if (shape === 4) {
    const hits = scanDenied(POSITIVE_CONTROL_CORPUS, true)
    return checkAssertions(
      [{ label: '§5.5.1 P-TC-IM-2 shape (4) — the POSITIVE CONTROL corpus MUST FAIL the scan clause', ok: hits.length > 0 }],
      1,
      1,
    )
  }
  // shapes (2)/(3) carry no denied token: the scan HOLDS on them by construction, which is the
  // declared reading that the id-set clause belongs to the authored-object probe, not to the scan.
  return checkAssertions(
    [{ label: '§5.5.1 P-TC-IM-2 — the scan is not the id-set instrument (declared reading)', ok: scanDenied("const id = 'theme-extra'", true).length === 0 }],
    1,
  )
}
const REGISTER_IM_2: RegisterRowSpec = {
  id: 'P-TC-IM-2',
  type: 'P-IM',
  strategy: 'S-TC-SURFACE-1',
  declared: 8,
  bounded: true,
  attempts: [
    () => im2Attempt(1, 'object'),
    () => {
      const r = im2Attempt(2, 'object')
      return r.held ? checkAssertions([{ label: '§5.5.1 P-TC-IM-2 shape (2) — a FIFTH id MUST FAIL the id-set clause', ok: !idSetClauseHolds(corpusWithFifthId()) }], 2) : r
    },
    () => {
      const r = im2Attempt(3, 'object')
      return r.held ? checkAssertions([{ label: '§5.5.1 P-TC-IM-2 shape (3) — a state node WITHOUT `props.id` MUST FAIL the addressability clause', ok: !propsClauseHolds(corpusWithoutPropsId()) }], 2) : r
    },
    () => im2Attempt(4, 'object'),
    () => im2Attempt(1, 'scan'),
    () => im2Attempt(2, 'scan'),
    () => im2Attempt(3, 'scan'),
    () => im2Attempt(4, 'scan'),
  ],
}

// --- P-TC-IM-3 — the caller-held name's echo rule (10) ---------------------
interface NameShape {
  label: string
  input: unknown
  omitted: boolean
  expected: string | null
  probe?: { n: number }
}
function im3Shapes(): NameShape[] {
  const counter = { n: 0 }
  return [
    { label: "(1) `'data-x'` (a `data-`-shaped spelling the CALLER chose)", input: 'data-x', omitted: false, expected: 'data-x' },
    { label: "(2) `'class'`", input: 'class', omitted: false, expected: 'class' },
    { label: "(3) `' '` (whitespace-only — INSIDE the echoed arm)", input: ' ', omitted: false, expected: ' ' },
    { label: "(4) `''`", input: '', omitted: false, expected: null },
    { label: '(5) the argument OMITTED', input: undefined, omitted: true, expected: null },
    { label: '(6) `null`', input: null, omitted: false, expected: null },
    { label: '(7) a number (`42`, `NaN`)', input: 42, omitted: false, expected: null },
    { label: '(8) a boolean', input: false, omitted: false, expected: null },
    { label: '(9) a `Symbol`', input: Symbol('name'), omitted: false, expected: null },
    { label: '(10) an object with its own `toString`/`valueOf`', input: hookCountingProbe(counter), omitted: false, expected: null, probe: counter },
  ]
}
function im3Attempt(shape: NameShape): AttemptResult {
  const region = themeWiringRegion()
  if (!region.ok) return brokenAttempt(region.reason, 1, 1)
  const held = callerNameConstant()
  if (!held.ok) return brokenAttempt(held.reason, 1, 1)
  const rule = declaredCallerNameRule(shape.input, shape.omitted)
  const inv = emptyInventory()
  void recordingElement(inv)
  return checkAssertions(
    [
      { label: `§5.5.1 P-TC-IM-3 ${shape.label} — the DECLARED echo/null rule (GAP-2)`, ok: rule.value === shape.expected },
      { label: `§5.5.1 P-TC-IM-3 ${shape.label} — no coercion hook is consulted`, ok: rule.hooks === 0 && (shape.probe === undefined || shape.probe.n === 0) },
      { label: '§5.5.1 P-TC-IM-3 — NO attribute is written on any double', ok: inventoryTotal(inv) === 0 },
      { label: '§5.5.1 P-TC-IM-3 — NO divergent spelling of the rule exists in the wiring (no trim/normalise/parse)', ok: !/\.(?:trim|toLowerCase|toUpperCase|normalize|parse)\s*\(/.test(region.text) },
    ],
    2,
  )
}
const REGISTER_IM_3: RegisterRowSpec = {
  id: 'P-TC-IM-3',
  type: 'P-IM',
  strategy: 'S-TC-NAME-1',
  declared: 10,
  bounded: true,
  attempts: im3Shapes().map((s) => (): AttemptResult => im3Attempt(s)),
}

// --- P-TC-IM-4 — the single write and the state node's content class (12) --
function im4Attempt(shape: 1 | 2 | 3 | 4, config: 'body' | 'absent' | 'refused'): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const initial = String(st.content)
    const other = TOKEN_DOMAIN.find((t) => t !== initial) ?? 'light'
    const drive: { value: unknown; omit: boolean; expected: string } =
      shape === 1
        ? { value: initial, omit: false, expected: initial }
        : shape === 2
          ? { value: other, omit: false, expected: other }
          : shape === 3
            ? { value: 'system', omit: false, expected: 'system' }
            : { value: undefined, omit: true, expected: '' }
    if (config === 'absent') {
      const dbl = makeCtx({ nodes: [] })
      const thrown = driveBody(body, dbl.ctx, drive.value, drive.omit)
      return checkAssertions(
        [
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (ii) — ZERO mutations when the state node is absent`, ok: dbl.calls.length === 0 },
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (ii) — the declared degradation THROWS NOTHING`, ok: thrown === undefined },
        ],
        2,
      )
    }
    if (config === 'refused') {
      const dbl = makeCtx({ nodes: [nodeDouble(STATE_ID, initial)], refuse: true })
      const thrown = driveBody(body, dbl.ctx, drive.value, drive.omit)
      return checkAssertions(
        [
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (iii) — the refusal is CARRIED, never a silent no-op`, ok: dbl.calls.length === 1 && dbl.statuses[0] === 'rejected' },
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (iii) — nothing threw`, ok: thrown === undefined },
          { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (iii) — the content did NOT move`, ok: String(dbl.nodes[0].content) === initial },
        ],
        2,
      )
    }
    const dbl = makeCtx({ nodes: [nodeDouble(STATE_ID, initial)] })
    const thrown = driveBody(body, dbl.ctx, drive.value, drive.omit)
    const mut = firstMutation(dbl)
    const landed = String(dbl.nodes[0].content)
    const contentClass =
      landed === initial ? 'AUTHORED-INITIAL' : TOKEN_DOMAIN.includes(landed) ? 'CARRIED' : 'OUTSIDE/carried-never-rejected'
    return checkAssertions(
      [
        { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (i) — EXACTLY ONE \`state-slice\` mutation`, ok: dbl.calls.length === 1 },
        { label: `§5.5.1 P-TC-IM-4 shape (${shape}) config (i) — the three declared fields`, ok: mut !== null && mut['targetProp'] === 'content' && mut['mode'] === 'replace' && mut['value'] === drive.expected },
        { label: `§5.5.1 P-TC-IM-4 shape (${shape}) — the landed content class is DECLARED (${contentClass})`, ok: landed === drive.expected },
        { label: `§5.5.1 P-TC-IM-4 shape (${shape}) — NO attribute/class/style write on the drive`, ok: inventoryTotal(dbl.inv) === 0 && thrown === undefined },
      ],
      3,
    )
  })
}
const REGISTER_IM_4: RegisterRowSpec = {
  id: 'P-TC-IM-4',
  type: 'P-IM',
  strategy: 'S-TC-CONTENT-1',
  declared: 12,
  bounded: true,
  attempts: [
    () => im4Attempt(1, 'body'),
    () => im4Attempt(2, 'body'),
    () => im4Attempt(3, 'body'),
    () => im4Attempt(4, 'body'),
    () => im4Attempt(1, 'absent'),
    () => im4Attempt(2, 'absent'),
    () => im4Attempt(3, 'absent'),
    () => im4Attempt(4, 'absent'),
    () => im4Attempt(1, 'refused'),
    () => im4Attempt(2, 'refused'),
    () => im4Attempt(3, 'refused'),
    () => im4Attempt(4, 'refused'),
  ],
}

// --- P-TC-IM-5 — the NO-UI-CONFIG-STORE negative row (6) -------------------
function im5StoreScan(surface: string): string[] {
  return scanDenied(surface, true)
    .filter((h) => /localStorage|sessionStorage|indexedDB|cookie|writeFile|matchMedia/.test(h.text))
    .map((h) => h.text)
}
function im5Attempt(drive: number): AttemptResult {
  if (drive === 1 || drive === 4) {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const first = String(st.content)
    if (drive === 1) {
      return checkAssertions(
        [{ label: `§5.5.1 P-TC-IM-5 drive (1) — the AUTHORED INITIAL value is one of the two block members (read ${first})`, ok: TOKEN_DOMAIN.includes(first) }],
        1,
      )
    }
    const second = stateDouble()
    return checkAssertions(
      [{ label: '§5.5.1 P-TC-IM-5 drive (4) — a SECOND boot with no dispatch reads the authored initial value again', ok: second !== null && String(second.content) === first }],
      1,
    )
  }
  if (drive === 2) {
    return withBody(LIGHT_ID, (body) => {
      const st = stateNodeRequired()
      if (!st.ok) return brokenAttempt(st.reason, 1, 1)
      const dbl = makeCtx({ nodes: [st.node] })
      const thrown = driveBody(body, dbl.ctx, 'light', false)
      return checkAssertions(
        [
          { label: '§5.5.1 P-TC-IM-5 drive (2) — the dispatched token IS live in the graph', ok: thrown === undefined && String(dbl.nodes[0].content) === 'light' },
        ],
        1,
      )
    })
  }
  if (drive === 3) {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const initial = String(st.content)
    return withBody(LIGHT_ID, (body) => {
      const live = nodeDouble(STATE_ID, initial)
      const dbl = makeCtx({ nodes: [live] })
      const thrown = driveBody(body, dbl.ctx, 'system', false)
      if (thrown !== undefined || String(live.content) !== 'system') {
        return brokenAttempt('§5.5.1 P-TC-IM-5 drive (3) — the premise (a previous token existed) could not be DRIVEN', 1, 1)
      }
      const reboot = stateDouble()
      const after = reboot === null ? null : String(reboot.content)
      return checkAssertions(
        [
          { label: '§5.5.1 P-TC-IM-5 drive (3) — the premise WAS driven (a prior carried token existed)', ok: true },
          { label: `§5.5.1 P-TC-IM-5 drive (3) — the re-boot reads the AUTHORED INITIAL value (${JSON.stringify(initial)}), NEVER the previous token (${JSON.stringify(after)})`, ok: after === initial && after !== 'system' },
        ],
        2,
      )
    })
  }
  if (drive === 5) {
    const card = cardRegion()
    if (!card.ok) return brokenAttempt(card.reason, 1, 1)
    const wiring = themeWiringRegion()
    if (!wiring.ok) return brokenAttempt(wiring.reason, 1, 1)
    const hits = [...im5StoreScan(card.text), ...im5StoreScan(wiring.text)]
    return checkAssertions(
      [{ label: `§5.5.1 P-TC-IM-5 drive (5) — NO store token (localStorage/file/cookie/preference) exists on the unit surface; found ${hits.join(', ')}`, ok: hits.length === 0 }],
      1,
    )
  }
  return checkAssertions(
    [{ label: '§5.5.1 P-TC-IM-5 drive (6) — the POSITIVE CONTROL corpus MUST FAIL the store scan', ok: im5StoreScan('localStorage.setItem("theme", t)').length > 0 }],
    1,
    1,
  )
}
const REGISTER_IM_5: RegisterRowSpec = {
  id: 'P-TC-IM-5',
  type: 'P-IM',
  strategy: 'S-TC-NOSTORE-1',
  declared: 6,
  bounded: false,
  attempts: [1, 2, 3, 4, 5, 6].map((d) => (): AttemptResult => im5Attempt(d)),
}

// --- P-TC-SM-1 — the state-node content transition (2) ---------------------
function sm1Attempt(token: string): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const initial = String(st.content)
    const peer = nodeDouble('echo-out', 'untouched')
    const live = nodeDouble(STATE_ID, initial)
    const before = contentsSnapshot([live, peer])
    const dbl = makeCtx({ nodes: [live, peer] })
    const thrown = driveBody(body, dbl.ctx, token, false)
    const post = String(live.content)
    const after = contentsSnapshot([live, peer])
    const dirtied = dbl.calls.map((c) => String(c.nodeId))
    if (token === initial) {
      // THE DISCRIMINATING CELL: the block whose token EQUALS the authored initial value is driven
      // TOO, and its row asserts the `dirtied` reading rather than an inequality.
      return checkAssertions(
        [
          { label: `§5.5.1 P-TC-SM-1 — the \`dirtied\` reading must contain the state node even when post === pre (${token})`, ok: dirtied.includes(STATE_ID) },
          { label: '§5.5.1 P-TC-SM-1 — NO other node\'s content moved', ok: after[1] === before[1] },
          { label: '§5.5.1 P-TC-SM-1 — nothing threw', ok: thrown === undefined },
        ],
        3,
      )
    }
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-SM-1 — the PRE reading is the AUTHORED INITIAL value', ok: TOKEN_DOMAIN.includes(initial) },
        { label: `§5.5.1 P-TC-SM-1 — POST IS the carried token (${token}) by identity`, ok: post === token },
        { label: '§5.5.1 P-TC-SM-1 — POST !== PRE (the positive control of F-5)', ok: post !== initial },
        { label: '§5.5.1 P-TC-SM-1 — the `dirtied` set carries the state node', ok: dirtied.includes(STATE_ID) },
        { label: '§5.5.1 P-TC-SM-1 — NO other node\'s content moved', ok: after[1] === before[1] },
      ],
      4,
    )
  })
}
const REGISTER_SM_1: RegisterRowSpec = {
  id: 'P-TC-SM-1',
  type: 'P-SM',
  strategy: 'S-TC-TRANSITION-1',
  declared: 2,
  bounded: false,
  attempts: [
    (): AttemptResult => {
      const st = stateDouble()
      if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
      return sm1Attempt(String(st.content))
    },
    (): AttemptResult => {
      const st = stateDouble()
      if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
      const other = TOKEN_DOMAIN.find((t) => t !== String(st.content)) ?? 'light'
      return sm1Attempt(other)
    },
  ],
}

// --- P-TC-SM-2 — the no-drift / no-accumulation discipline (2) -------------
function sm2Attempt(kind: 'repeat' | 'sequence'): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const live = nodeDouble(STATE_ID, String(st.content))
    const dbl = makeCtx({ nodes: [live] })
    const readings: string[] = []
    const nodesBefore = dbl.nodes.length
    if (kind === 'repeat') {
      for (let i = 0; i < 5; i += 1) {
        const thrown = driveBody(body, dbl.ctx, 'dark', false)
        if (thrown !== undefined) return brokenAttempt('§5.5.1 P-TC-SM-2 (1) — a repeated dispatch threw', 1, 5)
        readings.push(String(live.content))
      }
      return checkAssertions(
        [
          { label: `§5.5.1 P-TC-SM-2 (1) — five identical dispatches read the SAME content (${readings.join('|')})`, ok: readings.every((r) => r === 'dark') },
          { label: '§5.5.1 P-TC-SM-2 (1) — the node set is UNCHANGED across the repeats', ok: dbl.nodes.length === nodesBefore },
          { label: '§5.5.1 P-TC-SM-2 (1) — no module-level binding is read or written', ok: !/^(?:export\s+)?(?:let|var)\s+/m.test(themeWiringRegion().text) },
        ],
        5,
      )
    }
    const seq = ['dark', 'light', 'dark']
    for (const t of seq) {
      const thrown = driveBody(body, dbl.ctx, t, false)
      if (thrown !== undefined) return brokenAttempt('§5.5.1 P-TC-SM-2 (2) — a sequenced dispatch threw', 1, 3)
      readings.push(String(live.content))
    }
    return checkAssertions(
      [
        { label: `§5.5.1 P-TC-SM-2 (2) — the final reading is the LAST dispatched token; reads: ${readings.join('|')}`, ok: readings[readings.length - 1] === 'dark' },
        { label: '§5.5.1 P-TC-SM-2 (2) — NO state accumulates and no history is kept (the middle read was the middle token)', ok: readings[1] === 'light' },
        { label: '§5.5.1 P-TC-SM-2 (2) — the node set is UNCHANGED', ok: dbl.nodes.length === nodesBefore },
      ],
      3,
    )
  })
}
const REGISTER_SM_2: RegisterRowSpec = {
  id: 'P-TC-SM-2',
  type: 'P-SM',
  strategy: 'S-TC-CONST-1',
  declared: 2,
  bounded: false,
  attempts: [(): AttemptResult => sm2Attempt('repeat'), (): AttemptResult => sm2Attempt('sequence')],
}

// --- P-TC-TP-1 — the dispatch surface's totality (3) ----------------------
interface TransportReading {
  kind: 'result' | 'not-found'
  mutations: number
  content: string | null
  threw: unknown
}
function transportDispatch(target: string, event: string, args: { omit: boolean; value?: unknown }): TransportReading {
  const authored = findById(target) // the CLI's OWN rule: a bare target resolves css.id -> node
  const state0 = stateDouble()
  const initial = state0 === null ? null : String(state0.content)
  if (authored === null) return { kind: 'not-found', mutations: 0, content: initial, threw: undefined }
  const handler = firstHandler(authored)
  if (handler === null || handler['event'] !== event) return { kind: 'not-found', mutations: 0, content: initial, threw: undefined }
  const body = bodyOf(target)
  if (!body.ok) return { kind: 'not-found', mutations: 0, content: initial, threw: undefined }
  const live = nodeDouble(STATE_ID, initial ?? '')
  const dbl = makeCtx({ nodes: [live] })
  const thrown = driveBody(body.body, dbl.ctx, args.value, args.omit)
  if (thrown !== undefined) return { kind: 'result', mutations: dbl.calls.length, content: String(live.content), threw: thrown }
  return { kind: 'result', mutations: dbl.calls.length, content: String(live.content), threw: undefined }
}
function tp1Attempt(shape: 1 | 2 | 3): AttemptResult {
  if (shape === 2) {
    const before = stateDouble()
    const r = transportDispatch('no-such-node', HANDLER_EVENT, { omit: false, value: 'dark' })
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-TP-1 (2) — an unresolvable target answers a NOT-FOUND reading (never a fabricated success, never a hang)', ok: r.kind === 'not-found' },
        { label: '§5.5.1 P-TC-TP-1 (2) — ZERO mutations were issued', ok: r.mutations === 0 },
        { label: '§5.5.1 P-TC-TP-1 (2) — the state node\'s content is UNCHANGED', ok: String(before?.content) === String(r.content) },
        { label: '§5.5.1 P-TC-TP-1 (2) — nothing threw', ok: r.threw === undefined },
      ],
      2,
    )
  }
  if (shape === 1) {
    const card = cardReading()
    if (!card.ok) return brokenAttempt(card.reason, 1, 1)
    const st = stateDouble()
    if (st === null) return brokenAttempt(CARD_ABSENT, 1, 1)
    const r = transportDispatch(DARK_ID, HANDLER_EVENT, { omit: false, value: 'dark' })
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-TP-1 (1) — a resolvable target REACHES the authored handler and answers a result', ok: r.kind === 'result' && r.threw === undefined },
        { label: '§5.5.1 P-TC-TP-1 (1) — the authored write landed', ok: r.mutations === 1 && r.content === 'dark' },
      ],
      2,
    )
  }
  const card = cardReading()
  if (!card.ok) return brokenAttempt(card.reason, 1, 1)
  const r = transportDispatch(LIGHT_ID, HANDLER_EVENT, { omit: true })
  return checkAssertions(
    [
      { label: '§5.5.1 P-TC-TP-1 (3) — an omitted argument drives the DECLARED absent-argument arm rather than crashing the handler', ok: r.threw === undefined && r.kind === 'result' },
      { label: "§5.5.1 P-TC-TP-1 (3) — the declared absent-argument reading is `''`", ok: r.mutations === 1 && r.content === '' },
    ],
    2,
  )
}
const REGISTER_TP_1: RegisterRowSpec = {
  id: 'P-TC-TP-1',
  type: 'P-TP',
  strategy: 'S-TC-DISPATCH-1',
  declared: 3,
  bounded: true,
  attempts: [(): AttemptResult => tp1Attempt(1), (): AttemptResult => tp1Attempt(2), (): AttemptResult => tp1Attempt(3)],
}

// --- P-TC-TP-2 — the handler body's totality over hostile ctx (18) ---------
interface ReadRecording {
  top: string[]
  tree: string[]
  clientAPI: string[]
}
function proxyCtx(base: J, rec: ReadRecording): J {
  const wrap = (target: J, sink: string[]): J =>
    new Proxy(target, {
      get(t, k): unknown {
        sink.push(String(k))
        return Reflect.get(t, k) as unknown
      },
    })
  const tree = wrap(base['tree'] as J, rec.tree)
  const clientAPI = wrap(base['clientAPI'] as J, rec.clientAPI)
  return wrap({ tree, clientAPI }, rec.top)
}
function tp2Attempt(argShape: number, ctxShape: 'wellformed' | 'empty' | 'throwing'): AttemptResult {
  return withBody(DARK_ID, (body) => {
    const st = stateNodeRequired()
    if (!st.ok) return brokenAttempt(st.reason, 1, 1)
    const nodes = ctxShape === 'empty' ? [] : [st.node]
    const dbl = makeCtx({ nodes, applyThrows: ctxShape === 'throwing' })
    const rec: ReadRecording = { top: [], tree: [], clientAPI: [] }
    const ctx = proxyCtx(dbl.ctx, rec)
    const arg =
      argShape === 1 ? { value: 'dark', omit: false } : argShape === 2 ? { value: 'light', omit: false } : argShape === 3 ? { value: '', omit: false } : argShape === 4 ? { value: undefined, omit: true } : argShape === 5 ? { value: 7, omit: false } : { value: im1HostileProxy('throwing'), omit: false }
    const thrown = driveBody(body, ctx, arg.value, arg.omit)
    const allowedTop = ['tree', 'clientAPI']
    const extraTop = rec.top.filter((k) => !allowedTop.includes(k))
    const extraTree = rec.tree.filter((k) => k !== 'allNodes')
    const extraApi = rec.clientAPI.filter((k) => k !== 'apply')
    // THE ADJUDICATED ALIGNMENT (F1 / U-THEME-CONTROL): the ROW'S OWN DECLARED
    // per-attempt assertion — the mutation count `≤ 1` — GOVERNS, because the bound is
    // what `§5.5.1 P-TC-TP-2` prints; the EXACT-one-write clause was the HARNESS'S
    // ADDITION. The WELL-FORMED path's write is still asserted as PRESENT (`≥ 1`), so
    // this row can still FAIL for a body that writes nothing on the well-formed path.
    // THE ONE ARM ALIGNED TO THE BOUND is arg shape 6 (the hostile object whose
    // `Proxy` traps throw) × the well-formed ctx: under the READING ADV-TC-1 TAKES —
    // a coercion-throwing argument is an ABSTENTION, no write and no `''` minted
    // outside the declared closed block (`§2.2(D)`) — an exact count is UNSATISFIABLE
    // on that arm, so it is held to the bound plus the row's no-throw and
    // no-extra-ctx-read clauses. The harness pushes onto its call log BEFORE it
    // throws, so counting an exact 0 on the resolving or throwing double would assert
    // against a write the row itself requires.
    const HOSTILE_ARG_SHAPE = 6
    const boundHolds = dbl.calls.length <= 1
    const wellformedWritePresent =
      ctxShape === 'wellformed' && argShape !== HOSTILE_ARG_SHAPE ? dbl.calls.length >= 1 : true
    return checkAssertions(
      [
        { label: `§5.5.1 P-TC-TP-2 arg(${argShape}) ctx(${ctxShape}) — the authored body NEVER throws (a throwing applyCommand must be ABSORBED)`, ok: thrown === undefined },
        // THE ROW'S OWN DECLARED PER-ATTEMPT ASSERTION IS THE BOUND (`≤ 1`), asserted
        // as the bound (see the adjudication block above): the WELL-FORMED write is
        // still asserted PRESENT for every argument shape except the hostile arm,
        // which the ADV-TC-1 reading sends to ABSTENTION.
        { label: `§5.5.1 P-TC-TP-2 arg(${argShape}) ctx(${ctxShape}) — AT MOST ONE mutation (${dbl.calls.length} issued)`, ok: boundHolds && wellformedWritePresent },
        { label: `§5.5.1 P-TC-TP-2 arg(${argShape}) ctx(${ctxShape}) — NO ctx member beyond the two declared reads is consulted; extra: ${[...extraTop, ...extraTree, ...extraApi].join(',')}`, ok: extraTop.length === 0 && extraTree.length === 0 && extraApi.length === 0 },
        { label: `§5.5.1 P-TC-TP-2 arg(${argShape}) ctx(${ctxShape}) — nothing was written to an element-shaped peer`, ok: inventoryTotal(dbl.inv) === 0 },
      ],
      3,
    )
  })
}
const REGISTER_TP_2: RegisterRowSpec = {
  id: 'P-TC-TP-2',
  type: 'P-TP',
  strategy: 'S-TC-HANDLER-1',
  declared: 18,
  bounded: true,
  attempts: (() => {
    const out: Array<() => AttemptResult> = []
    for (let arg = 1; arg <= 6; arg += 1) {
      for (const ctx of ['wellformed', 'empty', 'throwing'] as const) {
        out.push((): AttemptResult => tp2Attempt(arg, ctx))
      }
    }
    return out
  })(),
}

// --- P-TC-TP-3 — the no-fabricated-edge refusal (12) -----------------------
const EDGE_TOKENS: ScanPattern[] = [
  { id: 'theme.ts', re: /shared\/theme|theme\.ts/g },
  { id: 'resolveTheme', re: /\bresolveTheme\b/g },
  { id: 'applyThemeDeclaration', re: /\bapplyThemeDeclaration\b/g },
  // ⟶ **CORRECTED 2026-11-03 (`D-97`) — THE IMPORT FORM IS SCANNED PER LINE, AND THE REASON IS MEASURED.** The as-filed
  // pattern spans to the next `;`, and this tree's TypeScript is SEMICOLON-FREE, so the span ran from an `import` of
  // `../shared/view-shape.js` across forty lines to the first member named `theme:` in the shape — reporting a file that
  // imports NO mechanism as a carrier. An import statement is one logical line here, so the form ends at the newline. The
  // planted-consumer control below is a single line and is still caught, which is what keeps this a correction of the
  // instrument rather than a relaxation of the row.
  { id: 'an import into the mechanism', re: /import[^;\n]*theme|require\([^)\n]*theme/g },
] // CORPUS-EXEMPT
function edgeScan(surface: string, applyExemptions: boolean): string[] {
  const code = stripComments(surface)
  const hits: string[] = []
  for (const p of EDGE_TOKENS) {
    const re = new RegExp(p.re.source, 'g')
    let m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      const after = code.charAt(m.index + m[0].length)
      if (applyExemptions && (after === "'" || after === '"' || after === ']' || after === ',')) continue
      hits.push(p.id)
    }
  }
  return hits
}
function tp3Attempt(shape: number): AttemptResult {
  if (shape <= 4) {
    const surfaces: Array<{ label: string; ok: boolean; text: string }> = []
    const card = cardRegion()
    surfaces.push({ label: 'the envelope card block', ok: card.ok, text: card.text })
    const dark = bodyOf(DARK_ID)
    surfaces.push({ label: 'the `theme-dark` handler string', ok: dark.ok, text: dark.body })
    const light = bodyOf(LIGHT_ID)
    surfaces.push({ label: 'the `theme-light` handler string', ok: light.ok, text: light.body })
    const wiring = themeWiringRegion()
    surfaces.push({ label: 'the renderer wiring role', ok: wiring.ok, text: wiring.text })
    const s = surfaces[shape - 1]
    if (!s.ok) return brokenAttempt(`§5.5.1 P-TC-TP-3 (${shape}) — the surface "${s.label}" does not exist yet`, 1, 1)
    const hits = edgeScan(s.text, true)
    return checkAssertions([{ label: `§5.5.1 P-TC-TP-3 (${shape}) — ${s.label} carries NO edge into the mechanism; found ${hits.join(', ')}`, ok: hits.length === 0 }], 1)
  }
  if (shape <= 8) {
    const corpora = [
      "import { resolveTheme } from './theme.js'",
      'applyThemeDeclaration(name, resolved)',
      "import x from './shared/theme'",
      "const p = require('theme')",
    ]
    const hits = edgeScan(corpora[shape - 5], false)
    return checkAssertions([{ label: `§5.5.1 P-TC-TP-3 (${shape}) — the POSITIVE CONTROL corpus MUST FAIL the scan`, ok: hits.length > 0 }], 1, 1)
  }
  if (shape === 9) {
    const dark = bodyOf(DARK_ID)
    const light = bodyOf(LIGHT_ID)
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-TP-3 (9) — BOTH handler bodies are STRINGS (the data format: a string body cannot import)', ok: dark.ok && light.ok && typeof dark.body === 'string' && typeof light.body === 'string' },
      ],
      1,
    )
  }
  if (shape === 10) {
    const digest = JSON.stringify({ body: (): void => undefined, keep: 'x' })
    return checkAssertions(
      [
        { label: '§5.5.1 P-TC-TP-3 (10) — a FUNCTION-VALUED body is DROPPED by the envelope digest (JSON.stringify), so it cannot carry an edge', ok: digest === '{"keep":"x"}' },
      ],
      1,
    )
  }
  if (shape === 11) {
    const wiring = themeWiringRegion()
    if (!wiring.ok) return brokenAttempt(wiring.reason, 1, 1)
    return checkAssertions([{ label: '§5.5.1 P-TC-TP-3 (11) — the wiring role holds NO mechanism reference', ok: edgeScan(wiring.text, true).length === 0 }], 1)
  }
  // ⟶ AMENDED 2026-10-03 (machine clock — the `H2b` IMPLEMENTER-LANDING amendment
  // pass; `RCA-8(d)` ANNOTATE-BESIDE, never a rewrite). LICENCE CELL:
  // `docs/specs/store-modules-seams.md` `§2.7` item 7's dated EXTENSION, cell (3)
  // — REG `P-TC-TP-3`, attempt 12. THE AS-FILED READING, KEPT VISIBLE BESIDE:
  // the allowed carrier set was the module (`src/shared/theme.ts`, excluded
  // below) plus the theme-control unit's OWN surfaces (the envelope card, the
  // handler strings, the wiring role — attempts 1–4/11) and NOTHING else. The
  // unit's landing — `src/renderer/theme-store.ts` naming the mechanism's
  // functions on the `H2b` caller's behalf — is the moment attempt 12 gains its
  // ONE admitted carrier: `src/renderer/theme-store.ts`, excluded here BY NAME.
  // The row's closed intent is UNCHANGED: ANY OTHER `src/**`
  // `.ts`/`.mjs`/`.js` file naming the mechanism on this unit's behalf is STILL
  // a carrier, attempts 1–11 are NOT amended, and a second admitted carrier
  // would be a FINDING per the licence's positive-control clause (the
  // bounded-extension control below proves the instrument still flags one).
  // ROLLBACK: retiring the theme caller reverts this attempt to its as-filed
  // closed offending-carriers form (the annotation's removal, never a
  // re-derivation; `§5.4`'s rollback holds).
  // ⟶ **THE ONE ADMITTED CARRIER IS GONE AND THE ATTEMPT REVERTS TO ITS AS-FILED CLOSED FORM** (2026-11-03, `D-93`; the
  // licence cell's own rollback: *"retiring the theme caller reverts this attempt to its as-filed closed
  // offending-carriers form (the annotation's removal, never a re-derivation)"*). `src/renderer/theme-store.ts` was a
  // store-shaped turn naming the mechanism on this unit's behalf; it had NO live consumer under `src/` and its address
  // space (`file.settings.theme.token`) is deleted with the frozen graph store, so it is deleted with it. **THE SET IS
  // NOW THE MODULE PLUS THIS UNIT'S OWN SURFACES AND NOTHING ELSE** — a STRICTER reading: the attempt admits no carrier
  // at all beyond the mechanism's own file.
  // ⟶ **RE-GRAINED 2026-11-03 (`D-96`) — THE ALLOWED SET GAINS ITS ONE MEMBER, BY NAME.** `D-93` restored this attempt to
  // its as-filed CLOSED form ("the mechanism plus this unit's own surfaces and NOTHING else, admitting NO caller path"),
  // honestly, because nothing under `src/` consumed the mechanism then. **The user's ruling makes it OWED a consumer and
  // names the kind — the module renderers — and `D-96` lands it at `src/renderer/renderer.ts`'s `startThemeDeclaration`
  // under the module's own licence (`docs/specs/theme.md` §2.5 item 3).** The closed intent is UNCHANGED: the set is a
  // CLOSED SET WITH ONE NAMED MEMBER, attempts 1–11 are untouched, the exemption is the PATH and never the tokens, and a
  // SECOND carrier is still a FINDING — which the bounded-extension control below proves the instrument still catches.
  // THE ROLLBACK is the same one the `H2b` licence cell declared: removing that import reverts this attempt to the
  // `D-93` closed form (the annotation's removal, never a re-derivation).
  // ⟶ **RE-GRAINED 2026-11-03 (`D-97`) — THE ONE ADMITTED CARRIER IS THE CROSSING'S, BY NAME.** `D-96` admitted
  // `src/renderer/renderer.ts`; the instruction this pass carries (*"no boot time declarations — use constraint repairs"*)
  // deletes that drive, and the mechanism's one consumer becomes `theme-must-stand` in `src/main/view-record/index.ts`,
  // whose repair computes the declaration the view record stores. The set is still ONE named member and the
  // bounded-extension control below still proves a SECOND carrier is a FINDING.
  const ADMITTED_CARRIERS: readonly string[] = ['src/main/view-record/index.ts']
  const carriers = walkSrc()
    .filter((p) => /\.(?:ts|mjs|js)$/.test(p))
    .filter((p) => p !== 'src/shared/theme.ts')
    .filter((p) => edgeScan(sourceOrEmpty(p), true).length > 0)
  const offenders = carriers.filter((p) => !ADMITTED_CARRIERS.includes(p))
  const admittedCarriers = carriers.filter((p) => ADMITTED_CARRIERS.includes(p))
  // THE BOUNDED-EXTENSION POSITIVE CONTROL (the licence's positive-control
  // clause: an EXTRA carrier beyond the one admitted path is a FINDING): the
  // SAME instrument MUST still flag a SECOND new carrier path.
  const secondCarrier = `import { resolveTheme, applyThemeDeclaration } from '../shared/theme.js'`
  return checkAssertions(
    [
      { label: `§5.5.1 P-TC-TP-3 (12, RE-GRAINED 2026-11-03 by \`D-97\`, and by \`D-96\` before it; the CLOSED form was \`D-93\`'s) — no \`src/**\` file outside the allowed set names the mechanism on this unit's behalf, and the allowed set is the module PLUS its ONE admitted carrier \`src/main/view-record/index.ts\` (the crossing's \`theme-must-stand\` repair); unadmitted carriers: ${offenders.join(', ')}`, ok: offenders.length === 0 },
      { label: `§5.5.1 P-TC-TP-3 (12, the admitted member is MEASURED rather than merely allowed) — the one allowed carrier really is a carrier on this head: ${admittedCarriers.join(', ')}`, ok: admittedCarriers.length === 1 },
      { label: '§5.5.1 P-TC-TP-3 (12, bounded-extension control) — a SECOND new carrier (a synthetic second caller) is STILL flagged by the instrument: the allowed set is the mechanism plus this unit\'s own surfaces and admits NO caller path, so a re-landed caller is a FINDING rather than a blanket strip', ok: edgeScan(secondCarrier, true).length > 0 },
    ],
    1,
  )
}
const REGISTER_TP_3: RegisterRowSpec = {
  id: 'P-TC-TP-3',
  type: 'P-TP',
  strategy: 'S-TC-NOEDGE-1',
  declared: 12,
  bounded: false,
  attempts: (() => {
    const out: Array<() => AttemptResult> = []
    for (let s = 1; s <= 12; s += 1) out.push((): AttemptResult => tp3Attempt(s))
    return out
  })(),
}

// --- P-TC-TP-4 — the no-appearance-write refusal (12) ----------------------
function tp4Config(config: number): { ok: boolean; reason: string; reads: number; controls: number } {
  if (config === 1) {
    const c = cardReading()
    if (!c.ok) return { ok: false, reason: c.reason, reads: 1, controls: 0 }
    const b = bodyOf(DARK_ID)
    if (!b.ok) return { ok: false, reason: b.reason, reads: 1, controls: 0 }
    const st = stateNodeRequired()
    if (!st.ok) return { ok: false, reason: st.reason, reads: 1, controls: 0 }
    const dbl = makeCtx({ nodes: [st.node] })
    const thrown = driveBody(b.body, dbl.ctx, 'dark', false)
    return {
      ok: inventoryTotal(dbl.inv) === 0 && thrown === undefined,
      reason: `config (i) — the body drive wrote to ${inventoryTotal(dbl.inv)} element-shaped peers`,
      reads: 2,
      controls: 0,
    }
  }
  if (config === 2) {
    const wiring = themeWiringRegion()
    if (!wiring.ok) return { ok: false, reason: wiring.reason, reads: 1, controls: 0 }
    const inv = emptyInventory()
    void recordingElement(inv)
    const hits = writeInventoryScan(wiring.text)
    return {
      ok: inventoryTotal(inv) === 0 && hits.length === 0,
      reason: `config (ii) — the wiring role writes (${hits.join(', ')})`,
      reads: 2,
      controls: 0,
    }
  }
  if (config === 3) {
    const c = cardReading()
    if (!c.ok) return { ok: false, reason: c.reason, reads: 1, controls: 0 }
    const b = bodyOf(DARK_ID)
    if (!b.ok) return { ok: false, reason: b.reason, reads: 1, controls: 0 }
    const st = stateNodeRequired()
    if (!st.ok) return { ok: false, reason: st.reason, reads: 1, controls: 0 }
    const dbl = makeCtx({ nodes: [st.node] })
    expect(driveBody(b.body, dbl.ctx, 'dark', false)).toBeUndefined()
    const mut = firstMutation(dbl)
    const opKeys = mut === null ? [] : Object.keys(mut).sort()
    return {
      ok: inventoryTotal(dbl.inv) === 0 && opKeys.length > 0 && mut?.['targetProp'] === 'content',
      reason: `config (iii) — the applyCommand inventory carries the op keys ${opKeys.join(', ')}`,
      reads: 2,
      controls: 0,
    }
  }
  const control = writeInventoryScan('el.setAttribute("data-theme", "dark"); el.style.setProperty("--x", "1")')
  return {
    ok: control.length > 0,
    reason: `config (iv) — the POSITIVE CONTROL must FAIL the appearance-token scan (found ${control.join(', ')})`,
    reads: 1,
    controls: 1,
  }
}
function tp4Site(site: 'a' | 'b' | 'c'): { ok: boolean; reason: string; reads: number } {
  if (site === 'a') {
    const card = cardRegion()
    if (!card.ok) return { ok: false, reason: card.reason, reads: 1 }
    const hits = writeInventoryScan(card.text)
    return { ok: hits.length === 0, reason: `site (a) — the authored card bytes carry ${hits.join(', ')}`, reads: 1 }
  }
  if (site === 'b') {
    const wiring = themeWiringRegion()
    if (!wiring.ok) return { ok: false, reason: wiring.reason, reads: 1 }
    const hits = writeInventoryScan(wiring.text)
    return { ok: hits.length === 0, reason: `site (b) — the wiring role bytes carry ${hits.join(', ')}`, reads: 1 }
  }
  const claims = scanAppliedAppearance(thisFileTitles().join('\n'))
  return {
    ok: claims.length === 0,
    reason: `site (c) — the declared expectations of this test file reference ${claims.join(', ')}`,
    reads: 1,
  }
}
function tp4Attempt(config: number, site: 'a' | 'b' | 'c'): AttemptResult {
  const c = tp4Config(config)
  const s = tp4Site(site)
  return checkAssertions(
    [
      { label: `§5.5.1 P-TC-TP-4 — every write counter is 0 (config ${config}): ${c.reason}`, ok: c.ok },
      { label: `§5.5.1 P-TC-TP-4 — the observation site reading (${site}): ${s.reason}`, ok: s.ok },
    ],
    c.reads + s.reads,
    c.controls,
  )
}
const REGISTER_TP_4: RegisterRowSpec = {
  id: 'P-TC-TP-4',
  type: 'P-TP',
  strategy: 'S-TC-NOWRITE-1',
  declared: 12,
  bounded: true,
  attempts: (() => {
    const out: Array<() => AttemptResult> = []
    for (const config of [1, 2, 3, 4]) for (const site of ['a', 'b', 'c'] as const) out.push((): AttemptResult => tp4Attempt(config, site))
    return out
  })(),
}

// --- THE REGISTER, in register order --------------------------------------
const REGISTER: RegisterRowSpec[] = [
  REGISTER_IM_1,
  REGISTER_IM_2,
  REGISTER_IM_3,
  REGISTER_IM_4,
  REGISTER_IM_5,
  REGISTER_SM_1,
  REGISTER_SM_2,
  REGISTER_TP_1,
  REGISTER_TP_2,
  REGISTER_TP_3,
  REGISTER_TP_4,
]
/** §5.5.2 item 3's DECLARED-vs-DISTINCT ledger, as FILED (the table's own figures). */
const DECLARED_DISTINCT: Array<{ id: string; declared: number; distinct: number }> = [
  { id: 'P-TC-IM-1', declared: 12, distinct: 12 },
  { id: 'P-TC-IM-2', declared: 8, distinct: 8 },
  { id: 'P-TC-IM-3', declared: 10, distinct: 10 },
  { id: 'P-TC-IM-4', declared: 12, distinct: 8 },
  { id: 'P-TC-IM-5', declared: 6, distinct: 6 },
  { id: 'P-TC-SM-1', declared: 2, distinct: 2 },
  { id: 'P-TC-SM-2', declared: 2, distinct: 2 },
  { id: 'P-TC-TP-1', declared: 3, distinct: 3 },
  { id: 'P-TC-TP-2', declared: 18, distinct: 18 },
  { id: 'P-TC-TP-3', declared: 12, distinct: 12 },
  { id: 'P-TC-TP-4', declared: 12, distinct: 9 },
]
/** §5.5.2 item 2 — the SEVEN `(bounded)` rows; the other four quantify over closed lists/grids. */
const BOUNDED_ROWS = ['P-TC-IM-1', 'P-TC-IM-2', 'P-TC-IM-3', 'P-TC-IM-4', 'P-TC-TP-1', 'P-TC-TP-2', 'P-TC-TP-4']
const CLOSED_ROWS = ['P-TC-IM-5', 'P-TC-SM-1', 'P-TC-SM-2', 'P-TC-TP-3']

describe('§5.5.1 REGISTER — the executed property layer (11 rows, declared 97 drives)', () => {
  it('REG P-TC-IM-1 (§5.5.1, S-TC-DOMAIN-1) — the token domain and the no-interpretation rule', () => {
    registerRowTest(REGISTER_IM_1)
  })
  it('REG P-TC-IM-2 (§5.5.1, S-TC-SURFACE-1) — the authored node-id set and the boundary scan', () => {
    registerRowTest(REGISTER_IM_2)
  })
  it('REG P-TC-IM-3 (§5.5.1, S-TC-NAME-1) — the caller-held name echo rule at the caller site', () => {
    registerRowTest(REGISTER_IM_3)
  })
  it('REG P-TC-IM-4 (§5.5.1, S-TC-CONTENT-1) — the single write and the state-node content class', () => {
    registerRowTest(REGISTER_IM_4)
  })
  it('REG P-TC-IM-5 (§5.5.1, S-TC-NOSTORE-1) — the NO-UI-CONFIG-STORE negative row', () => {
    registerRowTest(REGISTER_IM_5)
  })
  it('REG P-TC-SM-1 (§5.5.1, S-TC-TRANSITION-1) — the state-node content transition', () => {
    registerRowTest(REGISTER_SM_1)
  })
  it('REG P-TC-SM-2 (§5.5.1, S-TC-CONST-1) — the no-drift / no-accumulation discipline', () => {
    registerRowTest(REGISTER_SM_2)
  })
  it('REG P-TC-TP-1 (§5.5.1, S-TC-DISPATCH-1) — the dispatch surface totality', () => {
    registerRowTest(REGISTER_TP_1)
  })
  it('REG P-TC-TP-2 (§5.5.1, S-TC-HANDLER-1) — the handler body totality over hostile ctx doubles', () => {
    registerRowTest(REGISTER_TP_2)
    // THE BOUND'S OWN FALSIFIER, REPORTED ON THE CONTROL CHANNEL AND OUTSIDE THE
    // DECLARED 18-ATTEMPT TERM (`§5.5.1`: a row's controls sit BESIDE its term):
    // the per-attempt bound `≤ 1` is only a claim if a body performing TWO
    // mutations FAILS it. This control must be BROKEN by construction.
    const c = cardReading()
    const st = stateNodeRequired()
    const twoMut = makeCtx({ nodes: st.ok ? [st.node] : [] })
    driveBody(
      `function body(ctx, value) { const ns = ctx.tree.allNodes(); const n = ns.find((x) => x && x.props && x.props.id === ${JSON.stringify(STATE_ID)}); if (!n) return; ctx.clientAPI.apply(n.id, [{ targetProp: 'content', value: 'a' }]); ctx.clientAPI.apply(n.id, [{ targetProp: 'content', value: 'b' }]); }`,
      twoMut.ctx,
      'dark',
      false,
    )
    expect(
      twoMut.calls.length,
      'P-TC-TP-2 (CONTROL for the BOUND) — the synthetic two-mutation body really issues TWO mutations against the same recording double, so the falsifier below measures the bound and not the harness.',
    ).toBe(2)
    expect(
      twoMut.calls.length <= 1,
      `P-TC-TP-2 (CONTROL for the BOUND, reported BESIDE the declared 18-attempt term and never inside it) — a body performing TWO mutations MUST FAIL the per-attempt bound \`≤ 1\`, so the row's totality claim is FALSIFIABLE and not a tautology (${twoMut.calls.length} issued${c.ok ? '' : `; the authored card is absent: ${c.reason}`}).`,
    ).toBe(false)
  })
  it('REG P-TC-TP-3 (§5.5.1, S-TC-NOEDGE-1) — the no-fabricated-edge refusal', () => {
    registerRowTest(REGISTER_TP_3)
  })
  it('REG P-TC-TP-4 (§5.5.1, S-TC-NOWRITE-1) — the no-appearance-write refusal', () => {
    registerRowTest(REGISTER_TP_4)
  })

  it('R-H1 (§5.5.1 note 4, S-TC-7) — the terms ARE the drive counts, the total is 97 WITH its terms', () => {
    const terms = REGISTER.map((r) => r.declared)
    const total = terms.reduce((a, b) => a + b, 0)
    console.log(
      'REGISTER-TERMS ' +
        JSON.stringify({
          terms: REGISTER.map((r) => ({ id: r.id, strategy: r.strategy, term: r.declared, attemptsDeclared: r.attempts.length })),
          totalDeclared: total,
        }),
    )
    expect(REGISTER.length, '§5.5.1 — ELEVEN typed rows').toBe(11)
    expect(terms, '§5.5.3 — the declared terms, in matrix order').toEqual([12, 8, 10, 12, 6, 2, 2, 3, 18, 12, 12])
    expect(total, '§4.4 S-TC-7 — the total printed WITH its terms and equal to their sum').toBe(97)
    for (const r of REGISTER) {
      expect(r.attempts.length, `§5.5.1 — \`${r.id}\`'s DECLARED TERM (${r.declared}) IS its drive count`).toBe(r.declared)
    }
    const strategies = REGISTER.map((r) => r.strategy)
    expect(new Set(strategies).size, '§5.5.1 — ELEVEN distinct strategy ids, one per row').toBe(11)
    const spec = sourceOrEmpty(SPEC_PATH)
    for (const s of strategies) expect(spec.includes(s), `§5.5.1 — the strategy id \`${s}\` is the contract's`).toBe(true)
    expect(
      spec.includes('`97`') && spec.includes('104'),
      '§5.5.3 — the mis-summed earlier draft figure (104) is named BESIDE the corrected 97, never silently rewritten',
    ).toBe(true)
  })

  it('R-H2 (§5.5.1 note 3, §5.5.3) — the caps: <=100 per row, <=400 total, stop-after-5', () => {
    const terms = REGISTER.map((r) => r.declared)
    const total = terms.reduce((a, b) => a + b, 0)
    const largest = REGISTER.reduce((a, b) => (a.declared >= b.declared ? a : b))
    expect(total, '§5.5.1 note 3 — the declared total is read against the `<=400` cap').toBeLessThanOrEqual(400)
    expect(Math.max(...terms), '§5.5.1 note 3 — no row may exceed the `<=100` per-row cap').toBeLessThanOrEqual(100)
    expect([largest.id, largest.declared], '§5.5.3 — the largest row is P-TC-TP-2 at 18').toEqual(['P-TC-TP-2', 18])
    const distinct = DECLARED_DISTINCT.map((r) => r.distinct).reduce((a, b) => a + b, 0)
    console.log(
      'REGISTER-CAPS ' +
        JSON.stringify({
          totalDeclared: total,
          capTotal: 400,
          perRow: REGISTER.map((r) => ({ id: r.id, declared: r.declared, cap: 100, within: r.declared <= 100 })),
          largestRow: `${largest.id}=${largest.declared}`,
          stopRule: 'stop-after-5-consecutive-failures',
          registerStoppedAt,
          distinctTotal: distinct,
        }),
    )
  })

  it('R-H3 (§5.5.2 item 2) — the `(bounded)` set is SEVEN of ELEVEN (`7 + 4 = 11`)', () => {
    const bounded = REGISTER.filter((r) => r.bounded).map((r) => r.id)
    const closed = REGISTER.filter((r) => !r.bounded).map((r) => r.id)
    expect(bounded.sort(), '§5.5.2 item 2 — the SEVEN bounded rows, BY NAME').toEqual([...BOUNDED_ROWS].sort())
    expect(closed.sort(), '§5.5.2 item 2 — the FOUR rows quantifying over closed lists/grids, BY NAME').toEqual([...CLOSED_ROWS].sort())
    expect(bounded.length + closed.length, '§5.5.2 item 2 — `7 + 4 = 11`, so the count is checkable rather than asserted').toBe(11)
    expect(
      REGISTER.every((r) => (r.bounded ? r.declared > 0 : true)),
      '§5.5.2 item 2 — every bounded row states a term and its marking beside it',
    ).toBe(true)
  })

  it('R-H4 (§5.5.2 item 3, §5.5.3) — the DECLARED-vs-DISTINCT ledger (97 vs 90) closes', () => {
    const declared = REGISTER.map((r) => ({ id: r.id, term: r.declared }))
    const ledger = DECLARED_DISTINCT
    for (const row of ledger) {
      const live = declared.find((d) => d.id === row.id)
      expect(live?.term, `§5.5.2 item 3 — \`${row.id}\`'s DECLARED term is the ledger's declared figure`).toBe(row.declared)
    }
    expect(ledger.map((r) => r.distinct), '§5.5.2 item 3 — the DISTINCT figures, in matrix order').toEqual([12, 8, 10, 8, 6, 2, 2, 3, 18, 12, 9])
    expect(
      ledger.map((r) => r.distinct).reduce((a, b) => a + b, 0),
      '§5.5.3 — the distinct figure’s own chain closes at 90',
    ).toBe(90)
    const equal = ledger.filter((r) => r.distinct === r.declared).map((r) => r.id)
    const differing = ledger.filter((r) => r.distinct !== r.declared).map((r) => r.id)
    expect(equal.length, '§5.5.2 item 3 — NINE rows whose distinct figure equals their term').toBe(9)
    expect(differing, '§5.5.2 item 3 — the TWO differing rows').toEqual(['P-TC-IM-4', 'P-TC-TP-4'])
    expect(equal.length + differing.length, '§5.5.2 item 3 — `9 + 2 = 11`').toBe(11)
    // REPORTED CONTRACT DEFECT (never silently rewritten): §5.5.2 item 3's closing sentence prints
    // the second differing row as `P-TC-TP-4` (`10`/`9`), while its OWN table and §5.5.3's distinct
    // term line print declared `12` / distinct `9`. This row pins the TABLE's figures and prints the
    // discrepancy beside them (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).
    const spec = sourceOrEmpty(SPEC_PATH)
    expect(
      spec.includes('`P-TC-TP-4` (`10`/`9`)'),
      'REPORTED DEFECT — the `10`/`9` spelling in §5.5.2 item 3 stands beside the table’s `12`/`9`; the supervisor owes the annotation',
    ).toBe(true)
  })

  it('R-H5 (§4.4 S-TC-6, §5.5.1 note 3) — EVERY register row RAN; an un-run row is reported as a FAILURE', () => {
    const report = registerReadings.map((r) => ({
      id: r.id,
      type: r.type,
      strategy: r.strategy,
      declared: r.declared,
      bounded: r.bounded,
      attemptsRun: r.attemptsRun,
      held: r.held,
      broken: r.broken,
      readings: r.readings,
      controls: r.controls,
      assertions: r.assertions,
      stoppedEarly: r.stoppedEarly,
      notStarted: r.notStarted,
    }))
    const attemptsExecuted = report.reduce((a, r) => a + r.attemptsRun, 0)
    const rowsExecuted = report.filter((r) => r.attemptsRun > 0).length
    const termsDeclared = REGISTER.map((r) => r.declared)
    console.log(
      'REGISTER-REPORT ' +
        JSON.stringify({
          rows: report,
          attemptsExecuted,
          rowsExecuted,
          termsDeclared,
          totalDeclared: termsDeclared.reduce((a, b) => a + b, 0),
          registerStoppedAt,
        }),
    )
    const unrun = report.filter((r) => r.notStarted).map((r) => r.id)
    expect(
      unrun,
      `§4.4 S-TC-6/§5.5.1 note 3 — an UN-RUN row is a FAILURE, never a pass. Un-run rows: ${unrun.join(', ') || '(none)'} (the register stopped at ${registerStoppedAt ?? 'nothing'}).`,
    ).toEqual([])
    expect(report.length, '§5.5.1 — all ELEVEN rows are executed and reported, in register order').toBe(11)
    expect(rowsExecuted, '§5.5.1 — every row must have executed at least one drive').toBe(11)
  })

  it('R-H6 (§5.5.2 items 6/7/8) — the honesty block: the refusals stand and the cross-row readings are printed', () => {
    const assertions = registerReadings.reduce((a, r) => a + r.assertions, 0)
    const readings = registerReadings.reduce((a, r) => a + r.readings, 0)
    const controls = registerReadings.reduce((a, r) => a + r.controls, 0)
    console.log(
      'REGISTER-HONESTY ' +
        JSON.stringify({
          assertionsBesideTerms: assertions,
          readingsBesideTerms: readings,
          controlsDriven: controls,
          crossRowAssertions: [
            'the single-mutation claim is asserted on every body-driving attempt',
            'the nothing-threw claim is asserted on every attempt',
            'the write-inventory (setAttribute/classList/style = 0) is asserted on every attempt with a double in scope',
            'the no-import reading is a STATIC companion assertion reported beside the terms',
            'the node-id set exactness is asserted on every envelope-reading attempt',
          ],
          cannotProve: [
            'the live app, the transport, an applied appearance, a stylesheet, a rendered pixel, the OS, persistence or the assembled product',
            'the ONE [U]-shaped class is carried by §5.U and the DECLARED GATE-6 BATTERY, never by a register row',
          ],
          excludedShapes: [
            'a token whose meaning a consumer would have to interpret (§5.5.2 item 4(a))',
            'a Proxy whose traps answer differently on successive reads (item 4(b))',
            'a live MCP round trip (item 4(c))',
          ],
        }),
    )
    expect(assertions, '§5.5.2 item 8 — the assertions are printed BESIDE the terms and never counted in them').toBeGreaterThan(0)
    expect(
      registerReadings.some((r) => r.bounded),
      '§5.5.2 item 2 — the bounded markings are carried on the executed rows, not asserted abstractly',
    ).toBe(true)
    expect(
      POSITIVE_CONTROL_CORPUS.length > 0 && EDGE_TOKENS.length > 0 && DENIED_PATTERNS.length > 0,
      '§5.5.2 item 8 — the controls are live readings, not prose',
    ).toBe(true)
  })
})

// ===========================================================================
// §3a/§3b — THE GATE-4 FINDINGS, CLOSED RED-FIRST (`ADV-TC-1` … `ADV-TC-4`)
//
// FOUR rows, each RED against the LANDED host implementation (the gate-3 green), each carrying its
// OWN positive control so its clause is falsifiable rather than vacuous. NOTHING above is weakened,
// deleted or re-scoped: no term, row id, strategy id, seed or cap of `§5.5.1` moves (the register
// is untouched and its `97`/`11` readings stand), and no `it(...)` TITLE below matches the
// applied-appearance / `[U]`-claim / census filters the landed rows run over this file's titles.
//
//   ADV-TC-1  the hostile argument is CARRIED, never MINTED as a token (both authored bodies
//             SWALLOW every throw and write `''` — a token OUTSIDE the declared closed block)
//   ADV-TC-2  the wiring role is DRIVEN against a recording double, not read as bytes (it
//             resolves nothing and nothing imports it)
//   ADV-TC-3  the state node's id is a PAIR, pinned to the authored node read from the envelope
//             (the wiring re-spells it as a literal that no route ever uses)
//   ADV-TC-4  the denied-set scan carries the SECOND-APPEARANCE-AUTHORITY family — a CLASS write
//             and a CSS rule set (the as-filed family misses a corpus that does both)
// ===========================================================================
describe('§3a/§3b ADV-TC — the GATE-4 findings, red-first', () => {
  // -------------------------------------------------------------------------
  // ADV-TC-1 — the hostile argument
  // -------------------------------------------------------------------------
  /** The DECLARED gate of `§2.1` item 2(a) — `value == null ? '' : String(value)` — run by the HARNESS. */
  function declaredStringGate(value: unknown): { ok: boolean; text: string } {
    try {
      return { ok: true, text: value == null ? '' : String(value) }
    } catch {
      return { ok: false, text: '' }
    }
  }
  /** A FRESH revoked `Proxy` (a coercion that THROWS, delivered IN-PROCESS: JSON cannot carry one). */
  function revokedProxy(): unknown {
    const { proxy, revoke } = Proxy.revocable({}, {})
    revoke()
    return proxy
  }
  /** The hostile argument shapes this row drives — each whose coercion the contract's gate must survive. */
  function hostileCoercionShapes(): Array<{ label: string; value: unknown }> {
    const throwing = {
      toString: (): string => {
        throw new Error('the argument `toString` THROWS (ADV-TC-1)')
      },
      valueOf: (): number => {
        throw new Error('the argument `valueOf` THROWS (ADV-TC-1)')
      },
    }
    const trapThrowing = new Proxy(
      {},
      {
        get(): never {
          throw new Error('the argument Proxy traps THROW (ADV-TC-1)')
        },
      },
    )
    return [
      { label: 'a `Symbol` (delivered IN-PROCESS; JSON cannot carry one)', value: Symbol('theme-token') },
      { label: 'an object whose `toString` AND `valueOf` THROW', value: throwing },
      { label: 'a REVOKED `Proxy`', value: revokedProxy() },
      { label: 'a `Proxy` whose traps THROW', value: trapThrowing },
    ]
  }
  interface ClauseReading {
    ok: boolean
    reason: string
  }
  /**
   * **THE ADV-TC-1 CLAUSE, AND THE READING TAKEN — STATED, NOT IMPLIED.**
   *
   * `§2.1` item 2(a) pins the ONE write's `value` as *"the carried token as a STRING"*; `§2.3` item 2
   * pins the falsifiable half — *"the gate may STRINGIFY the caller's own argument; it may NEVER
   * INTERPRET it"* — and FAILS *"a body that … substitutes a default when the argument is absent"*;
   * `§5.5.1` `P-TC-IM-1` shape (12) asserts *"the single mutation's `value` (identity for strings, the
   * declared `String()` form otherwise) … no default token was substituted; and nothing threw"*.
   *
   * **THE READING TAKEN: when the DECLARED gate itself has NO string form for the argument — i.e.
   * `String(value)` THROWS, so the declared `String()` form does not exist — the only non-interpreting
   * outcome is an ABSTENTION: NO write at all, and NO token minted.** Writing `''` is a MINTED TOKEN,
   * and `''` is OUTSIDE the declared closed block (`§2.2`(D): *"OUTSIDE: … an empty string, a
   * non-string"*), so it is exactly the *"default substituted for the argument"* that `§2.3` item 2
   * FAILS. Carrying the raw non-string BY IDENTITY is refused too, because `§2.1` item 2(a) pins the
   * write's `value` as the STRING form. (The sibling `GAP-3` leniency in the register's hostile arm
   * — `''` written *or* no write at all — is a TEST-SIDE acceptance recorded as a gap; this row takes
   * the register's OWN text, which is the stricter half of that pair.)
   */
  function hostileArgumentClause(gate: { ok: boolean; text: string }, writes: number, written: unknown): ClauseReading {
    if (!gate.ok) {
      if (writes === 0) {
        return {
          ok: true,
          reason: 'the declared gate has NO string form for this argument and the body ABSTAINS: nothing is written and NO token is minted',
        }
      }
      return {
        ok: false,
        reason: `a token was MINTED (${JSON.stringify(written)} via ${writes} write(s)) for an argument whose declared \`String()\` gate THROWS — the empty string is OUTSIDE the declared closed block (§2.2(D)) and is the default substitution §2.3 item 2 FAILS`,
      }
    }
    if (writes !== 1) {
      return {
        ok: false,
        reason: `the exact-one-write rule (§3.3 I-9) requires EXACTLY ONE write for a coercible argument; ${writes} were issued`,
      }
    }
    if (written !== gate.text) {
      return {
        ok: false,
        reason: `the carried value must be the declared \`String()\` form ${JSON.stringify(gate.text)}; it reads ${JSON.stringify(written)}`,
      }
    }
    return { ok: true, reason: `carried character for character through the declared gate (${JSON.stringify(gate.text)})` }
  }
  /** THE MINTING BODY — the LANDED shape, re-spelled as HARNESS bytes so the falsifier can be driven. */
  const MINTING_BODY = `function (ctx, value) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === ${JSON.stringify(STATE_ID)}; });
  if (!node) return;
  let carried = '';
  try { carried = value == null ? '' : String(value); } catch (e) { carried = ''; }
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: carried }]);
}`

  it('ADV-TC-1 (§2.1 item 2(a), §2.3 item 2, §5.5.1 P-TC-IM-1 (12)) — a HOSTILE ARGUMENT is CARRIED, never MINTED as a token', () => {
    const readings: string[] = []
    for (const id of [DARK_ID, LIGHT_ID]) {
      const body = bodyOf(id)
      expect(body.ok, body.reason).toBe(true)
      for (const shape of hostileCoercionShapes()) {
        const st = stateDouble()
        expect(st, CARD_ABSENT).not.toBeNull()
        const before = String(st?.content)
        const dbl = makeCtx({ nodes: [st ?? nodeDouble(STATE_ID, '')] })
        const thrown = driveBody(body.body, dbl.ctx, shape.value, false)
        const gate = declaredStringGate(shape.value)
        const mut = firstMutation(dbl)
        const written = mut === null ? undefined : mut['value']
        const clause = hostileArgumentClause(gate, dbl.calls.length, written)
        expect(
          thrown,
          `ADV-TC-1 — \`${id}\` with ${shape.label}: §2.1 item 2/§5.5.1 P-TC-IM-1 "nothing threw" — the authored body must NOT throw; it threw ${String(thrown)}`,
        ).toBeUndefined()
        expect(clause.ok, `ADV-TC-1 — \`${id}\` with ${shape.label}: ${clause.reason}`).toBe(true)
        expect(
          dbl.calls.length <= 1,
          `ADV-TC-1 — \`${id}\` with ${shape.label}: the exact-one-write rule allows AT MOST ONE write per dispatch; ${dbl.calls.length} were issued`,
        ).toBe(true)
        if (!gate.ok) {
          expect(
            mut,
            `ADV-TC-1 — \`${id}\` with ${shape.label}: the declared gate has NO string form, so NOTHING may be written and NO token may be MINTED. The landed body writes ${JSON.stringify(written)} — the empty string is a token OUTSIDE the declared closed block (§2.2(D)).`,
          ).toBeNull()
          expect(
            String(dbl.nodes[0].content),
            `ADV-TC-1 — an ABSTENTION must leave the state node's \`content\` untouched; it reads ${JSON.stringify(String(dbl.nodes[0].content))}`,
          ).toBe(before)
        }
        if (mut !== null) {
          expect(mut['targetProp'], 'ADV-TC-1 — the ONE write is a `content` mutation (§2.1 item 2(a))').toBe('content')
          expect(mut['mode'], 'ADV-TC-1 — the ONE write carries `mode: "replace"` (§2.1 item 2(a))').toBe('replace')
        }
        readings.push(
          `${id} · ${shape.label} → gate ${gate.ok ? JSON.stringify(gate.text) : 'THROWS'} · writes ${dbl.calls.length} · written ${JSON.stringify(written)}`,
        )
      }
    }
    // THE CONTROL (THE FALSIFIER): a body that MINTS the empty string MUST FAIL this row's clause.
    const ctlArg = revokedProxy()
    const ctlState = stateDouble()
    expect(ctlState, CARD_ABSENT).not.toBeNull()
    const ctlDbl = makeCtx({ nodes: [ctlState ?? nodeDouble(STATE_ID, '')] })
    driveBody(MINTING_BODY, ctlDbl.ctx, ctlArg, false)
    const ctlMut = firstMutation(ctlDbl)
    const ctlClause = hostileArgumentClause(
      declaredStringGate(ctlArg),
      ctlDbl.calls.length,
      ctlMut === null ? undefined : ctlMut['value'],
    )
    expect(
      ctlDbl.calls.length,
      'ADV-TC-1 CONTROL — the synthetic MINTING body really issues ONE write, so the clause measures the behaviour and not the harness',
    ).toBe(1)
    expect(String(ctlDbl.nodes[0].content), 'ADV-TC-1 CONTROL — the synthetic body really MINTS the empty string').toBe('')
    expect(
      ctlClause.ok,
      `ADV-TC-1 CONTROL (THE FALSIFIER) — a body minting \`''\` for a coercion-throwing argument MUST FAIL the clause; it read: ${ctlClause.reason}`,
    ).toBe(false)
    console.log('ADV-TC-1-READINGS ' + JSON.stringify({ readings, controlMintsEmptyStringAndFails: !ctlClause.ok }))
  })

  // -------------------------------------------------------------------------
  // ADV-TC-2 / ADV-TC-3 — the wiring role, DRIVEN
  // -------------------------------------------------------------------------
  interface WiringRoleReading {
    ok: boolean
    fn: ((...args: unknown[]) => unknown) | null
    name: string
    reason: string
  }
  /**
   * THE WIRING ROLE, REACHED FOR A DRIVE (`§2.4` items 1/2).
   *
   * GAP-1 (unchanged, and extended by this row rather than papered over): the contract pins *"ONE
   * bounded renderer-WIRING role (the attribute-name holder)"* and pins NOTHING about its export
   * name, its signature or which argument carries the producing graph. This probe therefore keys on
   * the unit's own CHARTER word (`§2.2`(B) row 1(c)) and accepts ANY exported `theme`-named
   * function, and the drives below pass the recording double as the FIRST argument (the only
   * caller-supplied position available). Nothing else is invented: the duty asserted is the
   * contract's own sentence.
   */
  async function loadWiringRole(): Promise<WiringRoleReading> {
    try {
      const mod = (await import('../src/renderer/renderer.js')) as Record<string, unknown>
      for (const key of Object.keys(mod).sort()) {
        const v = mod[key]
        if (typeof v === 'function' && /theme/i.test(key)) {
          return {
            ok: true,
            fn: v as (...args: unknown[]) => unknown,
            name: key,
            reason: `the EXPORTED wiring role \`${key}\` (driven, not read as bytes)`,
          }
        }
      }
      return {
        ok: false,
        fn: null,
        name: '',
        reason:
          WIRING_ABSENT +
          ' — the renderer module imported, but it EXPORTS no `theme`-named function, so the role cannot be DRIVEN at all (GAP-1: the contract pins no export name).',
      }
    } catch (e) {
      return {
        ok: false,
        fn: null,
        name: '',
        reason: `§2.4 item 1/2 — the renderer module could not be imported for a DRIVE (${String(e)}); a role that cannot be reached cannot be driven.`,
      }
    }
  }
  interface GraphReading {
    graph: unknown
    reads: string[]
    calls: Array<{ route: string; args: unknown[] }>
    inventories: Inventory[]
  }
  /** A RECORDING DOUBLE for the PRODUCING GRAPH: it answers the contract-named route, records every
   *  read and every route call, and hands out a WRITE-COUNTING element double per authored node id. */
  function recordingProducingGraph(nodeIds: string[]): GraphReading {
    const reads: string[] = []
    const calls: Array<{ route: string; args: unknown[] }> = []
    const inventories: Inventory[] = []
    const elements = new Map<string, J>()
    const nodes: NodeDouble[] = []
    for (const id of nodeIds) {
      const inv = emptyInventory()
      inventories.push(inv)
      elements.set(id, recordingElement(inv))
      nodes.push(nodeDouble(id, ''))
    }
    const resolve = (id: unknown): J | null => {
      const key = typeof id === 'string' ? id : ''
      return elements.get(key) ?? null
    }
    const record = (route: string, args: unknown[]): J | null => {
      calls.push({ route, args })
      return resolve(args[0])
    }
    const base: J = {
      // THE CONTRACT-NAMED ROUTE (`§2.4` item 2: "the `Runtime`'s own node-id read — the landed
      // `elementForNodeId`-class route the sibling unit's wiring uses"), plus tolerant aliases.
      elementForNodeId: (id: unknown): J | null => record('elementForNodeId', [id]),
      elementFor: (id: unknown): J | null => record('elementFor', [id]),
      getNode: (id: unknown): J | null => record('getNode', [id]),
      nodeById: (id: unknown): J | null => record('nodeById', [id]),
      resolve: (id: unknown): J | null => record('resolve', [id]),
      allNodes: (): NodeDouble[] => {
        calls.push({ route: 'allNodes', args: [] })
        return nodes
      },
      tree: {
        allNodes: (): NodeDouble[] => {
          calls.push({ route: 'tree.allNodes', args: [] })
          return nodes
        },
      },
      nodes,
    }
    const graph: unknown = new Proxy(base, {
      get(target: J, prop: string | symbol): unknown {
        const key = typeof prop === 'string' ? prop : String(prop)
        reads.push(key)
        if (key in target) return target[key]
        // ANY OTHER ROUTE the wiring chooses is accepted AND recorded: the drive measures that the
        // resolution happened against the SUPPLIED graph, never that the wiring used one spelling.
        return (...args: unknown[]): J | null => record(key, args)
      },
    })
    return { graph, reads, calls, inventories }
  }
  /** Every string inside a returned reading (the drive's own observable, however it is shaped). */
  function flattenStrings(value: unknown, depth = 0): string[] {
    if (typeof value === 'string') return [value]
    if (depth > 3 || value === null || typeof value !== 'object') return []
    const out: string[] = []
    const vals = Array.isArray(value) ? value : Object.values(value as Record<string, unknown>)
    for (const v of vals) out.push(...flattenStrings(v, depth + 1))
    return out
  }

  it('ADV-TC-2 (§2.4 items 1/2, §3.1 M-7) — the wiring role is DRIVEN against a recording double: it resolves the control from the producing graph and holds the caller name', async () => {
    const role = await loadWiringRole()
    expect(role.ok, role.reason).toBe(true)
    const g = recordingProducingGraph([...DECLARED_ID_SET])
    let returned: unknown = undefined
    let thrown: unknown = undefined
    try {
      returned = role.fn?.(g.graph)
    } catch (e) {
      thrown = e
    }
    expect(
      thrown,
      `ADV-TC-2 — the drive against a recording double must not throw; it threw ${String(thrown)}`,
    ).toBeUndefined()
    // THE DUTY OF `§2.4` item 2, asserted as the contract states it: the role RESOLVES an authored
    // control element FROM THE PRODUCING GRAPH it is handed. The reading is the double's own log.
    const resolvedAuthoredIds = g.calls
      .flatMap((c) => c.args)
      .filter((a): a is string => typeof a === 'string' && DECLARED_ID_SET.includes(a))
    expect(
      resolvedAuthoredIds.length > 0,
      `ADV-TC-2 — §2.4 item 2: *"IT MAY: resolve an authored control element from the PRODUCING GRAPH"* — driving the role with a recording double produced NO resolution of an AUTHORED control id (routes reached: ${JSON.stringify(g.calls.map((c) => c.route))}, property reads: ${g.reads.length}). The landed role takes no argument, reads no graph and resolves nothing.`,
    ).toBe(true)
    // it WRITES NOTHING (`§2.4` item 2 / `§3.3` I-6): every element double it was handed counts 0.
    const writes = g.inventories.reduce((a, i) => a + inventoryTotal(i), 0)
    expect(
      writes,
      `ADV-TC-2 — §2.4 item 2/§3.3 I-6: the driven role may write no attribute, class, style, text or markup; the element doubles counted ${writes} write(s)`,
    ).toBe(0)
    expect(
      outsideGraphScan(themeWiringRegion().text),
      'ADV-TC-2/§3.4 R-1 — the driven role creates no element and hand-writes no markup',
    ).toEqual([])
    // it HOLDS THE CALLER-SUPPLIED ATTRIBUTE NAME (`§2.4` item 1). The contract does NOT pin how the
    // held name is observable from a DRIVE (it pins only that the role holds it), so the name is read
    // through the landed constant route and the returned reading is required to agree with it ONLY
    // where the drive answers strings at all.
    const held = callerNameConstant()
    expect(held.ok, held.reason).toBe(true)
    expect(held.value.length > 0, 'ADV-TC-2/§2.1 item 4 — the held name is a NON-EMPTY string by identity').toBe(true)
    const answered = flattenStrings(returned)
    if (answered.length > 0) {
      expect(
        answered,
        `ADV-TC-2 — §2.4 item 1: a drive whose reading carries strings must carry the CALLER-HELD name among them (held: ${JSON.stringify(held.value)}; answered: ${JSON.stringify(answered)})`,
      ).toContain(held.value)
    }
    console.log(
      'ADV-TC-2-DRIVE ' +
        JSON.stringify({
          role: role.name,
          resolvedAuthoredIds,
          routesReached: g.calls.map((c) => c.route),
          graphPropertyReads: g.reads.length,
          elementWrites: writes,
          heldName: held.value,
          answeredStrings: answered,
          returnedShape: returned === undefined ? 'undefined' : Array.isArray(returned) ? 'array' : typeof returned,
        }),
    )
  })

  it('ADV-TC-3 (§2.1 item 1(5), §2.4 item 2, §2.2(B) row 1(c)) — the wiring node id must BE the authored state node id: the PAIR is pinned, never re-spelled', async () => {
    // THE READING TAKEN: the pair is pinned BY THE RESOLUTION ROUTE, not by two literals agreeing.
    // `§2.4` item 2 has the role resolve the authored control element from the PRODUCING GRAPH, and
    // `§2.1` item 1(5) makes the state node the ONE authored node carrying BOTH `css.id` and
    // `props.id`; so the id the wiring hands the graph must BE the id read from the envelope — which
    // is what makes a rename in the envelope REDDEN this row. Two literal strings that merely agree
    // would satisfy a text comparison while leaving the id a second, silently staling spelling — the
    // duplication the finding names.
    const card = cardReading()
    expect(card.ok, card.reason).toBe(true)
    const stateNodes = card.nodes.filter((n) => tagOf(n) === 'div' && propsIdOf(n) !== null && cssIdOf(n) !== null)
    expect(
      stateNodes.length,
      `ADV-TC-3/§2.1 item 1(5) — EXACTLY ONE authored state node carries BOTH \`css.id\` and \`props.id\`; found ${stateNodes.length}`,
    ).toBe(1)
    const authoredCssId = cssIdOf(stateNodes[0])
    const authoredId = propsIdOf(stateNodes[0])
    expect(authoredId, 'ADV-TC-3/§2.1 item 1(5) — the state node carries the `props.id` the graph reads').not.toBeNull()
    expect(authoredCssId, 'ADV-TC-3/§2.1 item 1(5) — the state node carries the `css.id` the renderer writes').toBe(authoredId)
    const pairHolds = (wiringId: unknown, envelopeId: unknown): boolean => wiringId === envelopeId
    const role = await loadWiringRole()
    expect(role.ok, role.reason).toBe(true)
    const g = recordingProducingGraph([...DECLARED_ID_SET])
    try {
      role.fn?.(g.graph)
    } catch (e) {
      void e
    }
    const usedIds = g.calls.flatMap((c) => c.args).filter((a): a is string => typeof a === 'string')
    const resolvedByTheWiring = usedIds.find((u) => pairHolds(u, authoredId)) ?? null
    expect(
      resolvedByTheWiring,
      `ADV-TC-3 — §2.4 item 2: the id the wiring hands the producing graph must BE the AUTHORED state node's id (read from \`demoEnvelope()\`: ${JSON.stringify(authoredId)}); the ids that reached the graph route were ${JSON.stringify(usedIds)}. The landed wiring re-spells the id as a literal and never uses it, so nothing pins the pair: a rename in the envelope leaves it silently stale.`,
    ).not.toBeNull()
    // BOTH CONTROLS (`§1` item 7's form): the pair predicate HOLDS for the authored id and FAILS for
    // a STALE one — i.e. a RENAME in the envelope REDDENS this row by construction.
    expect(pairHolds(authoredId, authoredId), 'ADV-TC-3 — the pair predicate holds for the AUTHORED id').toBe(true)
    expect(
      pairHolds(authoredId, `${String(authoredId)}-renamed`),
      'ADV-TC-3 CONTROL (THE RENAME) — a wiring id left behind by a rename in the envelope MUST FAIL the pair; it did not, so the control is vacuous',
    ).toBe(false)
    console.log(
      'ADV-TC-3-PAIR ' +
        JSON.stringify({
          authoredCssId,
          authoredId,
          idsThatReachedTheGraph: usedIds,
          resolvedByTheWiring,
          renameControlFails: !pairHolds(authoredId, `${String(authoredId)}-renamed`),
        }),
    )
  })

  // -------------------------------------------------------------------------
  // ADV-TC-4 — the denied set's missing family
  // -------------------------------------------------------------------------
  it('ADV-TC-4 (§1 item 7 (iii)/(vii), §3.2 F-8, §3.4 R-2) — the denied-set scan catches a CLASS write and a CSS rule set: the generalising corpus REDDENS, the clean corpus passes', () => {
    // THE FAMILY IS NAMED, so the scan row is not VACUOUS (`§2.2(C)`): every pattern carries the
    // clause id it enforces, and the family is APPENDED to `DENIED_PATTERNS` (never replacing one).
    const family = APPEARANCE_AUTHORITY_PATTERNS.map((p) => p.id)
    expect(
      family.length,
      'ADV-TC-4/§1 item 7 — the second-appearance-authority family is NAMED, pattern by pattern',
    ).toBeGreaterThanOrEqual(4)
    expect(
      family.every((id) => /^\(iii\)/.test(id)),
      `ADV-TC-4 — every pattern of the family cites the clause it enforces (§1 item 7(iii)/(vii)); read ${JSON.stringify(family)}`,
    ).toBe(true)
    // THE FINDING, MEASURED BESIDE THE FIX: the AS-FILED family (derived, never re-typed) PASSES the
    // generalising corpus, and the EXTENDED family REDDENS for it.
    const preFamilyHits = scanWithPatterns(APPEARANCE_AUTHORITY_CORPUS, PRE_ADV_DENIED_PATTERNS, true)
    const corpusHits = scanDenied(APPEARANCE_AUTHORITY_CORPUS, true)
    expect(
      preFamilyHits.map((h) => `${h.id}: ${h.text}`),
      'ADV-TC-4 (the FINDING, printed beside the fix) — the AS-FILED denied set carried no class-write and no CSS-rule pattern, so this corpus PASSED it',
    ).toEqual([])
    expect(
      corpusHits.length > 0,
      `ADV-TC-4 — §1 item 7(iii)/(vii): a corpus doing \`el.classList.toggle('dark')\` PLUS a CSS rule set MUST FAIL the scan row; it produced ${corpusHits.length} hit(s)`,
    ).toBe(true)
    expect(
      corpusHits.some((h) => /class WRITE/.test(h.id)) && corpusHits.some((h) => /stylesheet route|style declaration/.test(h.id)),
      `ADV-TC-4 — the corpus must redden on BOTH the CLASS write and the CSS-rule route; it reddened on ${JSON.stringify([...new Set(corpusHits.map((h) => h.id))])}`,
    ).toBe(true)
    // CONTROL 1 — THE CORPUS FAILS. CONTROL 2 — A CLEAN CORPUS PASSES (the declared shape, and the
    // unit's OWN diff scope: the authored card block and the wiring role).
    expect(scanDenied(CLEAN_CORPUS, true).map((h) => `${h.id}: ${h.text}`), 'ADV-TC-4 CONTROL 2 — the CLEAN corpus must PASS').toEqual([])
    expect(
      scanDenied(POSITIVE_CONTROL_CORPUS, true).map((h) => h.text),
      'ADV-TC-4 — the AS-FILED positive control (now carrying the class write and the CSS rule set) MUST still FAIL',
    ).not.toEqual([])
    const cardRegionReading = cardRegion()
    expect(cardRegionReading.ok, cardRegionReading.reason).toBe(true)
    const wiringRegion = themeWiringRegion()
    expect(wiringRegion.ok, wiringRegion.reason).toBe(true)
    expect(
      scanDenied(cardRegionReading.text, true).map((h) => `${h.id}: ${h.text}`),
      'ADV-TC-4 CONTROL 2 — the authored card block PASSES the EXTENDED family (the extension reddens nothing the unit authored)',
    ).toEqual([])
    expect(
      scanDenied(wiringRegion.text, true).map((h) => `${h.id}: ${h.text}`),
      'ADV-TC-4 CONTROL 2 — the wiring role PASSES the EXTENDED family (the extension reddens nothing the unit authored)',
    ).toEqual([])
    console.log(
      'ADV-TC-4-READINGS ' +
        JSON.stringify({
          family,
          asFiledFamilyMissedTheCorpus: preFamilyHits.length === 0,
          corpusHits: corpusHits.map((h) => `${h.id}: ${h.text}`),
          cleanCorpusHits: scanDenied(CLEAN_CORPUS, true).length,
          positiveControlHits: scanDenied(POSITIVE_CONTROL_CORPUS, true).length,
          cardHits: scanDenied(cardRegionReading.text, true).length,
          wiringHits: scanDenied(wiringRegion.text, true).length,
        }),
    )
  })
})
