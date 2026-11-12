// src/shared/demo-envelope.ts — the demo legacy envelope the renderer bootstraps.
//
// This is the input to `translateLegacy` (docs/specs/translate.md §1
// `LegacyInitialData`): the legacy JSON envelope. Handler bodies are
// function-STRING data (translate.md §2 — the data format). Every rendered
// element and every handler below ships as DATA — the renderer module is
// core-only plumbing.
//
// The demo exercises the two MCP endpoint surfaces:
//   - synthetic-event access: dispatch 'click' on #inc / #dec / #reset
//     (counter), 'input' on #echo-input (echo) — the graph mutates +
//     re-renders.
//   - rendered-HTML visibility: the live #app innerHTML + the SSR re-emit.
//
// Handler bodies follow the framework's canonical MODERN convention
// `(ctx, value)` where `value` = args[0] (the synthetic event's first arg,
// the Phase B `event.value` equivalent). Inline handler bodies default to
// modern (translate.ts FORMAT MARKER) — no `format` field needed.
//
// THE LAYOUT SKELETON (`D-176`, `D-183`, `D-185`-`D-193`) stands INSIDE the authored app root: a DRAGGING
// top-bar whose NAME IS ITS OWN CHILD NODE (`APP_NAME_ID`; the user's ruling, which supersedes `D-177`'s
// content-string cut for that one node so the sheet can truncate it), the tabs row a placement mint
// targets, the four zone nodes (`top`/`bottom`/`left`/`right`, authored where the record's declared ids
// are), one arrangement container that nothing resolves by id, and the DERIVED stage holding the record's
// two terminal pages — with the `h1` and the four content cards inside the landing page. **THIS FILE
// AUTHORS NO GEOMETRY A RECORD OWNS**: a zone's fixed axis and the menus pane's width arrive as the
// paint's `css.style` write, and no authored figure and no fallback stands in for one the record has not
// stated (`D-129`, `D-174`, `D-185`). What a row may not read here is anything `overflow` or
// `-webkit-app-region` claims: both are layout and compositor behaviour, invisible to a rendered read
// (`D-178`, `D-183`, `D-187`).
//
// CATALOGUED FINDINGS (see docs/defects.md):
//   - Inline `handlers` bodies DEFAULT to the modern (ctx, ...args)
//     convention; the legacy `(event, context)` arg order requires an
//     explicit `format: 'legacy'`. The synthetic-event contract's legacy
//     `event.value = args[0]` stub applies only to wrapped handlers (seam
//     form or explicit format). An MCP/Electron host dispatching with args
//     must know which convention the target handler uses.
//   - The framework's runtime lookup (ctx.tree.getNode / clientAPI.apply /
//     dispatchEvent) is nodeId/wire-scoped — css.id is a RENDER attribute,
//     not a runtime lookup key. A handler body reaching a sibling must scan
//     `ctx.tree.allNodes()` for the authored props.id (the upstream
//     feature-showcase precedent) or hold the minted nodeId. css.id →
//     node resolution is a HOST-side concern (our MCP target resolver).

// Counter increment: find the counter node by authored props.id, write
// content+1.
const INC_BODY = `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'counter'; });
  if (!node) return;
  const cur = Number(node.content ?? 0);
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: String(cur + 1) }]);
}`
const DEC_BODY = `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'counter'; });
  if (!node) return;
  const cur = Number(node.content ?? 0);
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: String(cur - 1) }]);
}`
const RESET_BODY = `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'counter'; });
  if (!node) return;
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: '0' }]);
}`
// Gutter handle (U-GUTTER-UI): the authored `pointerdown` body. It exists so the affordance is
// `list_targets`-visible and `provident.dispatch`-reachable (the same surface every authored
// element has); the DRAG itself is the composed gesture session's — the module installs its own
// listeners through the wiring's source and this body writes NO content of its own.
const GUTTER_DRAG_BODY = `function (ctx) {
  void ctx;
}`
// ⟶ ADDED 2026-09-27 (`U-THEME-CONTROL`, `docs/specs/theme-control.md` §2.1 item 3, §2.3 item 3):
// THE AUTHORED INITIAL SETTING TOKEN, AND IT IS DEMO DATA. It is ONE member of the appearance
// control's CLOSED two-member setting block (the two `theme-set` buttons carry `'dark'` and
// `'light'`); the repo asserts NOTHING about what either member MEANS, and NOTHING here reads the
// environment, the OS or a stored preference to choose it (`P-TC-3`). The setting lives in the live
// graph and nowhere else (`§1` item 6, `P-TC-4`): a re-boot reconstructs THIS value.
const THEME_INITIAL_TOKEN = 'dark'

// **THE TWO CONTROLS' OWN TOKENS, DECLARED ONCE AND REFERENCED — NOT RE-QUOTED IN THE CARD** (`D-126`). Each
// `theme-set` control now authors its token as `props.value`, because on the DOM path THE CALLER IS THE BROWSER AND A
// BROWSER SUPPLIES NO ARGUMENT: `HTMLButtonElement.value` is `''` unless the control authors one, so a real click
// handed the handler `''` and the carrier recorded the EMPTY setting while the store was never asked at all. The
// handler may not repair that itself — `theme-control.md` §2.3 item 2 FAILS a body that substitutes a default for an
// absent argument, and `''` is itself a token outside the declared closed block (§2.2(D)) — so the token has to come
// from the control as DATA, which is what `props.value` is: the runtime's own DOM bridge reads exactly it
// (`src/renderer/runtime.ts`: `'value' in target ? [String(target.value)] : []`).
//
// **AND IT IS SPELLED BY REFERENCE SO THE CARD'S VOCABULARY DOES NOT MOVE.** `§3.4` R-6 and `§3.2` F-1 read the card
// region's QUOTED literals and require them to be EXACTLY the two handler bodies' — a second `'dark'` in the card
// would red both. An identifier is not a quoted literal, so the pair stays spelled once here and once in each body,
// and the closed two-member block stays closed at two.
const THEME_DARK_TOKEN = 'dark'
const THEME_LIGHT_TOKEN = 'light'

// Echo: args[0] (the synthetic input event's value) into the echo-out node.
const ECHO_BODY = `function (ctx, value) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'echo-out'; });
  if (!node) return;
  const t = value == null ? '' : String(value);
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: t }]);
}`

// ---------------------------------------------------------------------------
// ⟶ ADDED 2026-09-27 (`U-GUTTER-UI`, `docs/specs/gutter-ui.md` §2.1 item 7): THE GUTTER CARD —
// the authored affordance / target / status nodes, plus THIS REPO'S ONE EXAMPLE IMPLEMENTATION
// of the caller seams the affordance's wiring passes in (SIX, measured — see the example's own
// docblock). EVERY element below is
// provident DATA (envelope nodes + handler-body strings); the renderer-side wiring resolves the
// elements from the producing graph and passes these closures in. IT IS AN IMPLEMENTATION,
// NEVER THE CONTRACT — the contract is the affordance module's exported seam types.
//
// The demo's own axis mapping is DATA here because a cursor declaration is a VALUE, and the
// affordance module is policy-free about cursor vocabulary (`§2.2` P-4, `§8` item 8): the
// module carries no cursor literal, no axis literal and no unit string of its own.
// ---------------------------------------------------------------------------

/** **THE FOUR ZONE STRIPS' IDS — PRIVATE, AND THE ONE SPELLING THIS FILE NEEDS OF EACH**
 *  (`docs/L3/renderer-wiring/design-zone-handles.md` rev 1 §2–§3; `D-234`, `D-238`, `D-243`). Each string is
 *  the strip's `css.id`, its `props.id` AND its `props.axis` — ONE token, three slots, exactly as
 *  `MENUS_AFFORDANCE_ID`'s node does, because the affordance's own `axisOf` seam reads `props.axis` as the bare
 *  `axis` attribute and that token is the cursor map's key.
 *  **THEY ARE PRIVATE CONSTANTS AND NOT EXPORTS**: a published name here would move this module's surface, which
 *  the design refuses (§1: *no export … and no published name is added*), while a triple-spelled literal would be
 *  the drift `D-188` debt 2 names. A private constant is neither: it is one spelling inside the one file that
 *  authors the node. **THE WIRING SPELLS THE SAME FOUR IDS IN ITS OWN TABLE** (`renderer.ts`'s
 *  `ZONE_DRAG_HANDLES`), and that equality is a ROW's business (`PS-1`'s census, `AL-10`'s form) and never a
 *  derivation — the ids cannot cross the module boundary without becoming published names.
 *  **WHICH SIDE EACH ONE STANDS ON IS THE STAGE'S RULE AND NOT A TASTE**: every strip stands on its zone's
 *  **bounding edge facing the stage**, because that is the edge whose POSITION is the zone's `size` (`D-185`) —
 *  `top`'s BOTTOM edge, `bottom`'s TOP edge, `left`'s RIGHT edge, `right`'s LEFT edge.
 *  **AND THE TWO HORIZONTAL ONES SPAN THE VERTICAL AXIS**: the token names the GUTTER's own orientation, exactly
 *  as `GUTTER_AFFORDANCE_ID`'s does (`D-193`), so a strip that resizes a HEIGHT carries a `row-resize` cursor and
 *  a strip that resizes a WIDTH a `col-resize` one. */
const ZONE_TOP_STRIP_ID = 'zone-top-horizontal'
const ZONE_BOTTOM_STRIP_ID = 'zone-bottom-horizontal'
const ZONE_LEFT_STRIP_ID = 'zone-left-vertical'
const ZONE_RIGHT_STRIP_ID = 'zone-right-vertical'

/** **THE CURSOR MAP, KEYED BY THE AUTHORED AXIS TOKEN** (`D-189`, `D-192`, `D-243`) — a cursor declaration is a
 *  VALUE and the affordance module carries none of its own (`§2.2` P-4, `§8` item 8). Seven keys, and
 *  each one answers for the bar its token names:
 *   · `gutter-horizontal` — `GUTTER_AFFORDANCE_ID`'s own axis; the gutter card's handle now spans the
 *     HORIZONTAL (a `row-resize` grip at the pane's top-right, where it moves the pane's HEIGHT:
 *     `D-189`'s top-right rule for a vertically-oriented pane);
 *   · `menus-vertical` — `MENUS_AFFORDANCE_ID`'s own axis; a vertical bar at the menus pane's LEFT
 *     EDGE, where it moves the pane's WIDTH, so the affordance's axis seam answers `col-resize`;
 *   · `gutter-vertical` — the token the affordance's own contract still spells, and NO authored node
 *     carries it since `D-189` moved that handle. The key is RETAINED rather than deleted because
 *     `tests/gutter-ui.test.ts`'s `R-9` reads this file's TEXT for exactly that token and measures a
 *     spelling's presence, never an axis (design §8, `interaction`'s row);
 *   · the FOUR STRIP IDS above — `row-resize` for the two that stand on a zone's horizontal bound
 *     (`top`/`bottom`, whose fixed axis is the HEIGHT) and `col-resize` for the two that stand on a
 *     vertical one (`left`/`right`, whose fixed axis is the WIDTH). The cursor is a DECLARATION and not a
 *     mechanism: the wiring's `cursorOf` reads this map through the same `axisOf` seam every handle uses.
 *  **THE MAP IS PRIVATE AND STAYS PRIVATE**: `cursorOf` is the only reader, so the nineteenth published
 *  name is the menus pane's NODE ID and never a cursor entry (`D-192`, `D-193`) — and the four keys below add
 *  no name to the surface for the same reason. */
const GUTTER_CURSORS: Readonly<Record<string, string>> = {
  'gutter-vertical': 'col-resize',
  'gutter-horizontal': 'row-resize',
  'menus-vertical': 'col-resize',
  [ZONE_TOP_STRIP_ID]: 'row-resize',
  [ZONE_BOTTOM_STRIP_ID]: 'row-resize',
  [ZONE_LEFT_STRIP_ID]: 'col-resize',
  [ZONE_RIGHT_STRIP_ID]: 'col-resize',
}
/** The authored status node's engine id — the ONE node the DELIVERY's read-out turn patches
 *  (`renderPaneSize`, `D-164`: the sink's `commit`-route write this docblock once named is gone).
 *  It is deliberately OUTSIDE the affordance's own node, so the write patches a peer and never the
 *  handle the listeners are attached to (`§2.3` row 15, `§2.6` item 5). The node authors NO
 *  `content` of its own — the read-out is the delivery's (`F3`, `D-129`). */
export const GUTTER_STATUS_ID = 'gutter-status'
/** **THE AUTHORED AFFORDANCE NODE'S ID — the handle the pointer is over.** **THE TOKEN NAMES THE BAR'S OWN
 *  ORIENTATION, NOT THE PANE'S** (`D-193`, correcting a name whose subject had moved): `D-189` puts a
 *  VERTICALLY-oriented pane's handle at its TOP-RIGHT, so the bar itself spans the horizontal and the
 *  gesture adjusts the pane's HEIGHT — hence `gutter-horizontal`, and the cursor map above answers
 *  `row-resize` for it. `pane-a` is such a pane: it carries no `zone` (`C-9`), so `D-187` makes it behave
 *  as a sidebar pane, whose adjustable axis is the height. **THE VALUE IS THE ONLY THING THAT MOVES**: the
 *  node, its `props.axis`, its handler and its reader (`AL-1` measures its presence under this id) stand
 *  exactly as authored. */
export const GUTTER_AFFORDANCE_ID = 'gutter-horizontal'
/** The authored target node's id — the pane the affordance resizes. */
export const GUTTER_TARGET_ID = 'gutter-target'
/** **THE MENUS PANE'S OWN HANDLE — THE NINETEENTH PUBLISHED NAME** (`D-192` settled that the node needs an
 *  id of its own and left the spelling to this design; `D-193` mints it). It is THE `GUTTER_AFFORDANCE_ID`
 *  SHAPE EXACTLY, because that is the shape the mechanism already expects: `css.id` = `props.id` =
 *  `props.axis` = this one string, `css.classes: ['gutter-handle']` as the SHARED styling hook (nothing
 *  reads either class token), `cursor: 'col-resize'` plus the strip's `14px` thickness on the axis the
 *  strip spans, `content: ''`, and the ONE authored `pointerdown` body the gutter handle carries, shared,
 *  writing nothing.
 *  **ITS READER, IN ONE LINE**: `AL-1` measures its PRESENCE under this id and `AL-10` measures the pane
 *  width it drives — no row drives the gesture and no row reads the edge (L1 §6(vi): the tree's one drag
 *  composition is bound to `DEFAULT_PANE_ID`, so this handle has no composition to carry it),
 *  `renderer-wiring`'s residue.
 *  **AND THE CURSOR KEY IS THE ONLY PLACE IT ENTERS A MAP** (`GUTTER_CURSORS` above): `cursorOf` answers
 *  for it, and NO new export joins the module for that reason — the surface is `18 + 1 = 19`. */
export const MENUS_AFFORDANCE_ID = 'menus-vertical'

// ---------------------------------------------------------------------------
// ⟶ ADDED (`D-176`-`D-183`, `docs/L3/app-envelope/design.md` rev 5 §2-§4): **THE THREE NAMES THE LAYOUT
// SKELETON'S CONSUMERS RESOLVE** — the tabs row and its prototype (the mint's operands) and the ONE node
// a menus answer is written into. Each is resolved BY ID OR BY NAME from outside this module, which is
// the whole reason it is exported (`D-41`: an id a consumer resolves is derived or exported, never
// re-spelled at the call site). The five REGION ids are the deliberate exception (§9 below): they are
// authored as LITERALS at the site, because five more exports would move the published surface past the
// `19` the map carries.
// ---------------------------------------------------------------------------

/** **THE TABS ROW'S AUTHORED ID — AND THE NAME ITS PLACEMENT HOOK IS DECLARED UNDER** (`D-179`, `D-182`;
 *  ASM-AE-2). ONE string in two roles: the node's id, the mint op's `target`, its `hookName` and its
 *  `placementName`, so no consumer spells any of them twice.
 *  **ITS READER, IN ONE LINE**: the mint turn, whose `rows-mint` op names this node as its `target`
 *  (resolved from a STRING by the runtime's own arm) and this string as its declared hook; and the row
 *  paint, which writes each minted row's label and active marker (`AL-2`, `AL-4`). The rows themselves are
 *  MINTED and never authored, which is why the node carries no `content`. */
export const TABS_ROWS_ID = 'tab-rows'
/** **THE ADD-A-TAB CONTROL'S OWN ID — THE ONE NODE THAT OFFERS THE ACT NOTHING IN THE INTERFACE OFFERED**
 *  (`provident.focus` with `newTab: true` existed with no control behind it). It is the TWENTY-FIRST published
 *  name in `design.md` rev 6 §2's count (`A-8`'s carrier is the twentieth), in `MENUS_AFFORDANCE_ID`'s form
 *  (`css.id` + `props.id` on one authored node), and it stands
 *  **BESIDE THE ROW SET AND NEVER INSIDE IT**: the rows are MINTED into `TABS_ROWS_ID` and a mint REPLACES the
 *  row set (`D-201`), so a control authored INSIDE `#tab-rows` would be wiped on the next delivery — the node
 *  is instead the row's FOLLOWING SIBLING in the bar, in the drag region's `no-drag` like the chips.
 *  **ITS READER, IN ONE LINE**: `renderer-wiring`'s `startAddTab`, whose census resolves it BY THIS ID off
 *  `listTargets`, installs the agent's live body under the SAME handler name the node authors, and attaches
 *  the human's `click` — one act, two causes, exactly the menus' path.
 *  **A STATIC NODE, SO ITS `+` LABEL IS LAWFUL** (`D-177`): the label is authored data and nothing computes it. */
export const TABS_ADD_ID = 'tab-add'
/** **THE ROW PROTOTYPE'S OWN NAME** — the def-root `component` node the mint resolves BY NAME, the last
 *  child of `template.root`. Without it the mint answers `rows-prototype-unresolved` and a row has no shape
 *  (`D-179`, `D-182` measurement 1).
 *  **ITS READER, IN ONE LINE**: the engine's mint, by name and never by id — which is why the node carries
 *  `component.reference` equal to this string and NO `css.id` (the mint reaches it by name, so nothing about
 *  it is an address).
 *  **IT IS THE PROVIDER AS WELL AS THE NAME** (`D-199`): the node carries this string as `props.id` AND as the
 *  `component.value`'s inline def, so the def-root prototype `defRootPrototypeFor` answers is the one the mint
 *  copies a row's `type` and `css` off. A reference WITHOUT that value binds a consumer with no provider, which
 *  is exactly the `unresolved-reference` every load emitted and the `rows-prototype-unresolved` the mint
 *  refused — measured, then corrected here. */
export const TABS_ROW_PROTOTYPE_ID = 'tab-row'
/** **THE RECEIPT CARRIER'S AUTHORED ID — THE ONE NODE A MENUS ANSWER IS WRITTEN INTO** (`D-129`): the
 *  `GUTTER_STATUS_ID` form exactly, resolved BY ID by the menus turn, and it authors NO `content` — what
 *  stands before the first answer is EMPTY, never a placeholder word (`D-127`, `D-174`).
 *  **ITS READER, IN ONE LINE**: the menus turn writes the route's answer into it as a `state-slice`
 *  `content` (`AL-7`). */
export const MENUS_RECEIPT_ID = 'menus-receipt'
/** **THE MEASURED-FIGURES CARRIER'S AUTHORED ID — THE ONE NODE A COMPUTED STYLE IS WRITTEN INTO** (`D-203`,
 *  `D-204`, `D-207`, `D-208`; `docs/L3/app-envelope/design.md` rev 6 §2's `A-8`, the TWENTIETH published
 *  name): a `span` inside the stage and its **LAST** child, carrying `css.id` + `props.id` and an authored
 *  `display: 'none'`, so a node that exists to be READ takes no ground from the region it reports.
 *  **IT AUTHORS NO `content`**, exactly as `MENUS_RECEIPT_ID` and `GUTTER_STATUS_ID` author none: what stands
 *  before a real realm measures is EMPTY, never a placeholder figure — an authored figure standing in for a
 *  measurement is right once and false after (`D-174`, `D-129`).
 *  **ITS READER, IN ONE LINE**: `renderer-wiring`'s `reportMeasuredFigures` writes the paint's own subjects'
 *  COMPUTED figures into its `content` as `id.property=value` text, and `AL-12` reads that TEXT — the ONE
 *  place a computed style can reach a row (`D-208`). **AND THE FORM IS `content` AND NEVER `css.style`**
 *  (`D-203`): a text member is applied as written in both realms, where a `css.style` OBJECT answers
 *  `applied` and writes nothing — and `css.style`'s serialisation is the one property on which the shim and
 *  the browser disagree, so a reading written there would be an instrument nobody could trust. */
export const LAYOUT_MEASURED_ID = 'layout-measured'

// ---------------------------------------------------------------------------
// ⟶ ADDED (`U-STORE-TABS-RECORD`, `T2`, `docs/specs/store-tabs-record.md` `§0A` item 5, `§6`
// `PAR-9`, `§3.5` items 1/2, `§5.1` item 2): THE RECORD'S TWO AUTHORED TERMINAL PAGES — the
// LANDING PAGE and the ERROR PAGE, authored HERE as envelope DATA plus handler-body STRINGS,
// exactly as every other element of this file is authored. They are the record's terminals: the
// surface the operator sees when the RESERVED LANDING ENTRY is the active entry and no other tab
// is active, and the surface the operator sees for a tab whose `error` leaf carries the caller's
// own error token.
//
// THE PROJECT-WIDE UI CONSTRAINT IS HONOURED BY CONSTRUCTION (`AGENTS.md`): every element below
// is provident-ssr DATA driven through the producing graph — NO hand-written DOM exists in this
// unit's diff and no `createElement` appears anywhere in it. WHAT THE RECORD DOES AND WHAT THE
// PAGE DOES ARE SEPARATE: the pages carry NO state of their own and render from the record — the
// wiring's bounded role reads the record's witness (`file.tabs.landing` reading active by the
// declared accessor pair; a tab whose `error` leaf carries a value) and drives the authored node.
//
// THEIR `[U]` HALF IS GATE 6'S (`§1.3` item 3, `§5.2` items 5/7): a node-green here is
// ENVELOPE-green and is NEVER APP-green, and no `[T]` row — and nothing in this file — claims
// that either page was SEEN.
// ---------------------------------------------------------------------------

/** THE LANDING PAGE'S AUTHORED NODE ID (`§0A` item 5, `DECLARED-DEFAULT`). The record's
 *  ZERO-ACTIVE terminal. */
export const TABS_LANDING_PAGE_ID = 'tabs-landing-page'
/** THE ERROR PAGE'S AUTHORED NODE ID (`§0A` item 5, `DECLARED-DEFAULT`). The record's ERROR
 *  terminal — a tab whose `error` leaf carries the caller's error token. */
export const TABS_ERROR_PAGE_ID = 'tabs-error-page'

/** THE TWO PAGES' AUTHORED BASE STYLE — DATA, as every `css.style` object in this file is. Each
 *  page is a `card`-classed `section` like the demo's other panels; the style carries NO geometry
 *  claim and no measurement (`§1.3` item 4). */
const tabsPageStyle: Record<string, string> = { display: 'block' }

/** THE LANDING PAGE'S AUTHORED HANDLER BODY — a function STRING, the data format this file uses
 *  (`translate.md` §2), following the framework's canonical `(ctx, value)` convention. It is
 *  `list_targets`-visible and `provident.dispatch`-reachable exactly as every other authored
 *  element is, and it writes NOTHING of its own: the page renders from the RECORD, and the
 *  record's witness is the landing entry reading active with no other active entry (`§3.5`
 *  item 1). A body that carried the page's truth in a closure or a remembered event would violate
 *  that clause, so this one holds no state. */
const TABS_LANDING_PAGE_BODY = `function (ctx) {
  void ctx;
}`

/** THE ERROR PAGE'S AUTHORED HANDLER BODY — the same declared form. The page's truth is the
 *  record's own: a tab whose `error` leaf carries a value (`§3.5` item 2), never a `null` — a tab
 *  whose `error` leaf holds no value MUST NOT render the error page (`§6` PAR-5). */
const TABS_ERROR_PAGE_BODY = `function (ctx) {
  void ctx;
}`

/** THIS REPO'S ONE EXAMPLE IMPLEMENTATION OF THE **SIX** CALLER SEAMS ITS TWO CONSUMERS TAKE — a count
 *  MEASURED, never remembered (`docs/L3/app-envelope/design.md` §2): `src/renderer/renderer.ts` reads
 *  five (`sizeFromPointer`, `pointerOf`, `axisOf`, `cursorOf`, `resizableOf`) and
 *  `demo/pane-drag-demo/demo.ts` four (`pointerOf`, `axisOf`, `applyCursor`, `resizableOf`), six in
 *  UNION, `applyCursor` being the demo's alone. Each closure is the shape the affordance's own option
 *  set names (`GutterAffordanceOptions`); the wiring reads the handle's authored axis token, maps it to
 *  a cursor declaration, and supplies the pane's RESIZABILITY decision. The example holds NO geometry
 *  of its own: the pre-drag size and the bounds pair left it with the props they read — `['panes']`'s
 *  since `D-117`, and the props gone from the node at `F11` (`D-129`) — and it reads the handle's
 *  authored data attributes, which are DATA, and never a rendered measurement. */
export function gutterSeamExample(): {
  readonly sizeFromPointer: (pointer: { readonly x: number }, start: number) => number
  readonly axisOf: (element: unknown) => unknown
  readonly cursorOf: (token: unknown) => unknown
  readonly applyCursor: (element: unknown, declaration: string | undefined) => void
  readonly resizableOf: (element: unknown) => boolean
  readonly pointerOf: (event: unknown) => { readonly x: number; readonly y: number } | null
} {
  /** **L-6/ADV-GU-7 — THE READ IS THE BARE ATTRIBUTE, BECAUSE THAT IS WHAT THE RUNTIME EMITS.**
   *  An authored `props` entry is rendered by the `DomAdapter` through its `css:<key>` /
   *  bare-attribute op path, so `props: {resizable: 'true'}` lands on the pane element as the bare
   *  `resizable="true"` and the handle's `props: {axis: …}` as its `axis` attribute — and NOT as
   *  `data-resizable="…"`. The example used to read `dataset['resizable']` there, which MISSES EVERY
   *  TIME, so every seam answered its hard-coded fallback and the card's authored data drove nothing.
   *  This helper reads the attribute the runtime actually emits, falls back to a `dataset` entry when
   *  a caller has one (the same value under the `data-*` spelling), and is TOTAL: a null / non-object /
   *  attribute-less / throwing-accessor holder answers `null` and never throws. */
  const attributeOf = (element: unknown, key: string): string | null => {
    if (element === null || element === undefined || typeof element !== 'object') return null
    try {
      const read = (element as { readonly getAttribute?: unknown })['getAttribute']
      if (typeof read === 'function') {
        const carried = (read as (name: string) => unknown).call(element, key)
        if (typeof carried === 'string' && carried.length > 0) return carried
      }
    } catch {
      /* a throwing accessor answers "absent" — the declared degradation, never a throw */
    }
    const holder = element as { readonly dataset?: Record<string, unknown> } | null | undefined
    const raw = holder?.dataset?.[key]
    return typeof raw === 'string' && raw.length > 0 ? raw : null
  }
  /** The handle's authored axis token, read from DATA (the authored `props.axis` on the handle,
   *  emitted as the bare `axis` attribute), never from a gesture or a coordinate. */
  const axisOf = (element: unknown): unknown => {
    const authored = attributeOf(element, 'axis')
    return authored !== null ? authored : GUTTER_AFFORDANCE_ID
  }
  /** THE PANE the handle lives in: the authored element whose ONE surviving geometry claim is the
   *  RESIZABILITY decision (`props.resizable` → the bare attribute), reached as the handle's own
   *  parent — never a lookup, a selector or a created element. The size and the bounds pair are
   *  `['panes']`'s since `D-117` and are gone from this node at `F11` (`D-129`). */
  const paneOf = (element: unknown): unknown =>
    (element as { readonly parentElement?: unknown } | null | undefined)?.parentElement
  return {
    /** THE SIZE the drag asks for: the pointer's own coordinate minus the pre-drag size, which
     *  is the mapping the demo's authored pane declares. `start` is whatever the gesture's own
     *  pre-drag read answered, so the `typeof` gate mirrors the family's one coordinate rule. */
    sizeFromPointer: (pointer: { readonly x: number }, start: number): number =>
      typeof pointer?.x === 'number' ? pointer.x - start : Number.NaN,
    axisOf,
    /** THE CURSOR the axis token maps to — a VALUE in this DATA file, never in the module. */
    cursorOf: (token: unknown): unknown => ({ cursor: GUTTER_CURSORS[String(token)] }),
    /** THE CURSOR: the handle's own declaration is written through its style member. */
    applyCursor: (element: unknown, declaration: string | undefined): void => {
      const holder = element as { readonly style?: Record<string, unknown> } | null | undefined
      if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
      holder.style['cursor'] = declaration === undefined ? '' : declaration
    },
    /** THE RESIZABILITY: the authored pane declares it (`props.resizable` → the bare
     *  `resizable` attribute); an ABSENT attribute is the demo's own "no veto" reading. */
    resizableOf: (element: unknown): boolean => attributeOf(paneOf(element), 'resizable') !== 'false',
    /** **THE POINTER RESOLVER — THE EXAMPLE'S OWN READS OF THE FORWARDED EVENT** (`§2.1`'s
     *  `pointerOf` cell, `§2.4` item 1/2, `§3.1 M-12): the wiring's source forwards the DOM event
     *  as the handler's first argument, so the example obtains the pair from it through the SAME
     *  `typeof` + `Number.isFinite` gate the affordance's own resolver uses. Returning `null` here
     *  (the as-filed form) made every live move INVALID by rule (`§2.3` item 5 clause (i), the
     *  reset arm) and the authored card could drive nothing — L-4/ADV-GU-7. A non-object, an
     *  absent or non-number member and a throwing accessor all answer `null`, so a caller's
     *  miswiring is still the DECLARED degradation and never a throw. */
    pointerOf: (event: unknown): { readonly x: number; readonly y: number } | null => {
      if (event === null || event === undefined || typeof event !== 'object') return null
      let x: unknown
      let y: unknown
      try {
        const holder = event as Record<string, unknown>
        x = holder['clientX']
        y = holder['clientY']
      } catch {
        return null
      }
      if (typeof x !== 'number' || typeof y !== 'number') return null
      if (!Number.isFinite(x) || !Number.isFinite(y)) return null
      return Object.freeze({ x, y })
    },
  }
}

// ---------------------------------------------------------------------------
// ⟶ ADDED (`D-113`): THE OVERLAY — THE ONE MODAL SURFACE THIS APP AUTHORS, AND THE CONSUMER THE MECHANISM WAS OWED.
//
// The user's ruling, VERBATIM: "The overlay is used to contain UI elements that should block general app
// access while open, ex. security tools and other configuration settings". `src/shared/overlay.ts` has carried
// the mechanism since the gate corpus and had NO CONSUMER — `D-96` stopped on exactly that, because this app
// authored no overlay for a declaration to land on. THIS IS THE SURFACE IT WAS OWED, authored the way every
// other element of this file is: envelope nodes plus handler-body STRINGS, `props` for the attributes the
// runtime emits, `css` for the declarations, and NO hand-written DOM anywhere.
//
// THE SHAPE IS THREE PARTS AND ONE STATE CARRIER:
//   · THE AUTHORED APP ROOT (`APP_ROOT_ID`) — every general-app card this file already authored now stands
//     inside it, and it is THE NODE the mechanism's inert declaration lands on (`props.<name>`, the route the
//     overlay guide names in its own words: "`props: { inert: 'true' }` on an authored node — the project-wide
//     UI-constraint route");
//   · THE OVERLAY LAYER, deliberately a SIBLING of that root and never inside it — a scrim and the dialog card
//     with its close control, so the modal's own controls stay operable while the app behind them is inert.
//     THIS IS THE WHOLE OF THE DESIGN: `inert` on a root that CONTAINED the dialog would block the dialog too,
//     and the ruling's subject — the tools the overlay is open FOR — would be unreachable;
//   · THE STATE CARRIER (`OVERLAY_STATE_ID`) — the ONE graph-readable node carrying the caller's VERB token,
//     exactly as `theme-setting` carries the appearance token. The authored bodies write the CALLER's verb and
//     interpret nothing; the wiring reads the node and hands the verb to `overlayTransition`.
//
// NO CAPABILITY UI IS AUTHORED HERE, AND THAT IS MEASURED RATHER THAN ASSUMED: the Security pane and the Settings
// surface are the ISOLATED pane graph's (`src/renderer/secure-panels.ts`), and
// `tests/isolation-adversarial-e2e.test.ts` REFUSES their ids and their words inside the app graph's rendered
// HTML — because an app-graph node is `provident.dispatch`-reachable and an agent must never be able to grant
// itself capabilities. So the dialog hosts the FRAME those surfaces belong to and authors no route of its own.
// ---------------------------------------------------------------------------

/** **THE AUTHORED APP ROOT'S ID** — the node the consumer's inert declaration is written to. It is the app's
 *  general surface: the counter, the gutter, the echo, the appearance card, the record's two terminal pages and
 *  the overlay's own opener, and nothing that belongs to the modal. */
export const APP_ROOT_ID = 'app-surface'
/** THE OVERLAY LAYER'S FIVE AUTHORED IDS — the scrim, the dialog, its close control, the app root's opener and
 *  the state carrier. All DATA, all dispatched the way any authored element is (`list_targets`-visible,
 *  `provident.dispatch`-reachable). */
export const OVERLAY_SCRIM_ID = 'overlay-scrim'
export const OVERLAY_DIALOG_ID = 'overlay-dialog'
export const OVERLAY_CLOSE_ID = 'overlay-close'
export const OVERLAY_OPEN_ID = 'overlay-open'
export const OVERLAY_STATE_ID = 'overlay-state'
/** THE DIALOG'S TWO AUTHORED PANES. They are the modal's OWN sections and they carry the APP GRAPH's words; the
 *  capability UI is the isolated pane graph's and is not authored here (see the block above). */
export const OVERLAY_SECURITY_PANE_ID = 'overlay-security-pane'
export const OVERLAY_SETTINGS_SURFACE_ID = 'overlay-settings-surface'

/** THE AUTHORED INITIAL STATE TOKEN — one of the machine's own four state words, so the wiring's seed is the
 *  GRAPH's rather than a literal of its own. Nothing here interprets it. */
const OVERLAY_INITIAL_STATE = 'closed'

/** **THE AUTHORED VERB TOKENS — the caller's verbs, spelled ONCE, as DATA.** `overlay.ts` owns no verb word and
 *  no attribute name: both are the CONSUMER's, and this file is where the demo spells them. */
/** **`open` IS NOW A VERB THE ENVELOPE WRITES AND `toggle` IS NOT** (`D-131`): the opener resolves the state itself and
 *  asks for a TARGET, so no authored body writes a toggle word any more. The mechanism keeps `toggle` as a member of its
 *  closed verb set (`overlay.ts`) — it is simply not what this surface sends. */
const OVERLAY_VERB_OPEN = 'open'
const OVERLAY_VERB_CLOSE = 'close'
const OVERLAY_VERB_ESCAPE = 'escape'

/** **THE AUTHORED STYLES — data, as every `css.style` object in this file is.** `appRootStyle` and `overlayPaneStyle` are
 *  flow declarations and claim nothing else — **and `appRootStyle`'s `display` moved at `S-2`**: it stood at
 *  `{display: 'block'}` and is now the ARRANGEMENT's own COLUMN, because the authored app root holds the
 *  top-bar, the four zones' arrangement and the opener in that order (`D-176`, `D-185`, `C-5`). It states no
 *  dimension of its own: the zones' fixed axes are the RECORD's and arrive through the paint (`D-129`).
 *  THE TWO OVERLAY-LAYER STYLES BELOW ARE THE GEOMETRY (`D-120`), and they
 *  are the surface's HOME FOR POSITION because these are AUTHORED provident nodes: a scrim's backdrop and a dialog's
 *  centring are the node's own presentation, so they ride `css` as data rather than a hand-written rule in the shell's
 *  stylesheet (`AGENTS.md` § "UI authority"). What each one carries, and what it deliberately does NOT:
 *   · `overlayScrimStyle` — `position: fixed` over all four insets, i.e. a FULL-VIEWPORT backdrop, translucent and dark so
 *     the app behind it stays visible. It stood at `{display: 'block'}`, which left the scrim IN FLOW at zero height and
 *     so painted nothing at all;
 *   · `overlayDialogStyle` — `position: fixed` with the `top/left: 50%` + `translate(-50%, -50%)` pair, i.e. a CARD
 *     CENTRED OVER the app, bounded so a long dialog never leaves the viewport. It stood at `{display: 'block'}` and
 *     measured IN FLOW BELOW the app cards.
 *  **NEITHER CARRIES `display`, AND THAT IS THE ONE DELIBERATE OMISSION**: whether the layer is shown is the four-state
 *  machine's decision, and the consumer's declared product of it is the `inert` attribute on the AUTHORED app root —
 *  the shell's page CSS keys the layer's `display` on exactly that attribute. An INLINE `display` here would outrank the
 *  keyed rule and pin a CLOSED overlay open, so the authored data carries geometry and the mechanism keeps visibility. */
const appRootStyle: Record<string, string> = { display: 'flex', 'flex-direction': 'column' }
const overlayScrimStyle: Record<string, string> = {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  background: 'rgba(10, 14, 20, 0.55)',
  'z-index': '10',
}
const overlayDialogStyle: Record<string, string> = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(420px, 90vw)',
  'max-height': '80vh',
  'overflow': 'auto',
  'z-index': '11',
  'box-shadow': '0 18px 48px rgba(0, 0, 0, 0.35)',
}
const overlayPaneStyle: Record<string, string> = { display: 'block' }

/** **THE STATE CARRIER'S AUTHORED HANDLER BODY — the same `(ctx, value)` string form every handler in this file
 *  uses.** It writes the CALLER'S verb token into the authored state node and interprets nothing: no transition,
 *  no state word of its own, no attribute. The WIRING is what transitions (`overlayTransition`) and what applies
 *  (`overlayInertDeclaration`); this body records the act and nothing else. */
/** **THE TOGGLE BODY READS THE STATE AND WRITES THE TARGET — IT DOES NOT REPEAT A VERB** (`D-131`, `D-126`'s finding
 *  `F2`). The opener's handler used to write the literal `toggle` on every click, so an agent's SECOND
 *  `provident.dispatch` at that control found the carrier holding the word it already held, and the wiring's `changed`
 *  guard — rightly — refused to ask the store the same question twice. The store's pane was left open and the act was
 *  silently dropped. **The carrier is kept TRUTHFUL BY THE DELIVERY** (the consumer writes the store's own word into it on
 *  every delivery), so reading it is reading the PANE'S STATE, and the body writes the state the click ASKS FOR: `close`
 *  when the pane is up and `open` when it is not. The carrier therefore MOVES on every click that would change something,
 *  and a click that would change nothing reads the same word twice and still writes it — the guard stays the only judge. */
function overlayToggleBody(): string {
  return `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === '${OVERLAY_STATE_ID}'; });
  if (!node) return;
  let held = '';
  try {
    const states = ctx.tree.getState(node.id);
    const first = states && states.length ? states[0] : null;
    held = first && first.content != null ? String(first.content) : '';
  } catch (ignored) { return; }
  try { ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: held === 'open' ? '${OVERLAY_VERB_CLOSE}' : '${OVERLAY_VERB_OPEN}' }]); } catch (e) { void e; }
}`
}

function overlayVerbBody(verb: string): string {
  return `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === '${OVERLAY_STATE_ID}'; });
  if (!node) return;
  try { ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: '${verb}' }]); } catch (e) { void e; }
}`
}

// ---------------------------------------------------------------------------
// ⟶ ADDED (`D-176`-`D-193`, `docs/L3/app-envelope/design.md` rev 5 §2-§5): **THE LAYOUT SKELETON'S OWN
// DECLARATIONS** — the eleven admitted menu items' ONE shared body, the tabs row's declared hook KIND,
// and the authored `css` blocks the skeleton's nodes carry.
//
// THREE THINGS THIS BLOCK DELIBERATELY DOES NOT CARRY, each a `D-129` second authority:
//   · NO ZONE DIMENSION AND NO ZONE `display` — the fixed axis of `top`/`bottom` (a height) and of
//     `left`/`right` (a width) is `['zones'].size`'s and reaches the node as the paint's `css.style` write
//     (`D-185`). A zone stating no `size` is written NOTHING, and nothing authored stands in for it
//     (`D-174`, `D-191`);
//   · NO PANE `width` — the menus pane's width is `['panes', 'pane-menus', 'width']`'s, painted
//     (`D-186`, `D-189`, `D-191`);
//   · NO STAGE DIMENSION — the stage is DERIVED: the flex remainder, never stored, never painted
//     (`D-185`).
// AND TWO DECLARATIONS THE SUITE CANNOT SEE, stated as such rather than implied as tested (`D-178`):
// `overflow` and `-webkit-app-region` are layout and compositor behaviour, invisible to a rendered read.
// ---------------------------------------------------------------------------

/** **THE ELEVEN ADMITTED MENU ITEMS' ONE SHARED BODY — authored once and REFERENCED ELEVEN TIMES**
 *  (`D-126`'s discipline against a body repeated eleven times, `D-177`'s cut list). It writes NOTHING, and
 *  that is the whole claim: the node it stands on is `list_targets`-visible and
 *  `provident.dispatch`-reachable exactly as every other authored element is — **REACHABILITY AND NO
 *  ROUTE**. An authored body can reach no record and no main-process command, so the role's journey to
 *  `main` is `renderer-wiring`'s `startMenusItems` and `app-shell`'s ONE route, on the CLICK path
 *  (design §8 (iv), `D-181`). A body that fabricated the route's answer here would be a writer of the
 *  receipt the menus turn owns (`D-129`). */
const MENUS_ITEM_BODY = `function (ctx) {
  void ctx;
}`

/** **THE ADD-A-TAB CONTROL'S AUTHORED BODY — A DECLARED NO-OP, AND THE MENUS' ITEM BODY IS ITS PRECEDENT**
 *  (`D-209`'s path, followed and not joined by a second one). An authored body is a STRING compiled in the
 *  renderer's global scope, so it can reach no record and no main-process command: it exists to keep the node
 *  `list_targets`-visible and `provident.dispatch`-reachable with the handler NAME the wiring appends over.
 *  **`renderer-wiring`'s `installAddTabHandler` REPLACES this entry under the SAME `(name, event)` pair** with a
 *  LIVE closure that calls the realm's own `focusActRoute({ target, newTab: true })` — the engine's append-with-
 *  override rule is what makes the replacement REPLACE rather than add a second `click`. **SO THE AUTHORED BODY
 *  NAMES NO ACT**: a string that fabricated one would be a writer of the act the wiring owns (`D-129`). */
const TABS_ADD_BODY = `function (ctx) {
  void ctx;
}`

/** **THE ADD-A-TAB CONTROL'S ONE HANDLER NAME, AUTHORED HERE AND INSTALLED-OVER THERE**: the two spellings of one
 *  `(name, event)` pair live one per realm — the envelope authors it (this string) and `src/renderer/renderer.ts`
 *  states its copy as `TABS_ADD_HANDLER` — because the envelope authors no executable body and the wiring names
 *  the body it installs. A rename on either side silently turns the install into a SECOND handler, which is why
 *  both sites say so. */
const TABS_ADD_HANDLER_NAME = 'tab-add-act'

/** **THE TABS ROW'S DECLARED HOOK KIND** (`D-179`, `D-182`; design §4): the closed kind union's
 *  `'placement'`. An undeclared placement mint is REFUSED `hook-kind-mismatch`, so the declaration is what
 *  makes the mint lawful at all; the record is typed against the union's closed set rather than left to
 *  widen into `string`, because a widened member would not survive the round-trip. */
const TABS_ROW_HOOKS_KIND: Record<string, 'value' | 'component' | 'placement'> = { [TABS_ROWS_ID]: 'placement' }

/** **THE DRAG REGION'S TWO DECLARATIONS AND ONE ABSENCE** (`C-10`, `D-183`, `D-179`): the top-bar DRAGS,
 *  the tabs row's own box does NOT carry `no-drag` and its CHIPS do — the declaration stands on the row
 *  prototype's `css` below, so the mint copies it onto every chip and the bar's `drag` owns every pixel
 *  the chips do not cover (a `no-drag` on this row blanketed the whole bar and the window could not be
 *  moved at all) — and the strip the native controls occupy gets NO NODE and NOTHING — the platform
 *  owns its own region, and an authored px inset there would be a figure of the WINDOW rather than of the
 *  app. The bar's `36px` is `D-179`'s MEASURED title-bar area (`[0, 0, 607, 36]`).
 *
 *  **⟶ AND THE TABS ROW AUTHORS NO WIDTH AT ALL — THE ONE DECLARATION THIS PASS REMOVES, AND WHY IT WAS
 *  THE CROWDING RATHER THAN THE CURE** (`D-193`'s `env(titlebar-area-width, 100%)`, which stood here as
 *  `tabsRowStyle`). An explicit `width` IS a flex item's BASE SIZE (`flex-basis: auto` resolves to it), so
 *  the row CLAIMED THE WHOLE FREE AREA and the NAME beside it — the bar's `content`, an anonymous flex item —
 *  was the box left to fight for what remained; with `white-space: nowrap` on the bar the name then crowded
 *  rather than yielded, and the row never needed to scroll because it was never the constrained box. The
 *  charter's own allocation is that **"the space in between is occupied by the tabs row"** (`D-176`), and only
 *  FLEX can compute a remainder: the row's `flex: 1 1 auto; min-width: 0` with `overflow-x: auto`, and the
 *  `+`-control's `flex: 0 0 auto`, are the page sheet's (`src/renderer/index.html`), and **the name holds its
 *  line by the sheet's `#app-name` `white-space: nowrap` — and NOT by the bar's, which stood here until the name
 *  became a node** (`APP_NAME_ID` below: the user's ruling, which supersedes `D-177`'s content-string cut for this
 *  one node). **NOTHING ELSE IN THE TREE READ THE WIDTH**: no module resolved
 *  it, no row measured it, and the one place it appears in prose is the sheet's own note.
 *  **WHAT REMOVING IT COSTS, STATED**: the WCO free area is where the bar already sits — `titleBarOverlay:
 *  true` with `titleBarStyle: 'hidden'` (`src/main/main.ts`) draws the platform's controls over the strip's
 *  RIGHT end and `getTitlebarAreaRect()` answers `x: 0`, so the row's remainder is inside the window and its
 *  right end reaches the bar's own content edge (`D-179`'s probe: the controls took `113px`), which nothing
 *  reserves either before or after this change — the width was a BASE SIZE and never a reservation, since the
 *  row stood AFTER the name and shrank past the free area's edge in any crowded window. What is lost is the
 *  sparse-window box: the row no longer stretches to the free area's width with its chips bunched at the left. */
const topBarStyle: Record<string, string> = {
  display: 'flex',
  'align-items': 'center',
  flex: '0 0 36px',
  '-webkit-app-region': 'drag',
}

/** **THE APPLICATION'S NAME, AS A NODE AND NEVER AS THE BAR'S `content` — AND THAT IS THE USER'S RULING OVER
 *  `D-177`'s CUT FOR THIS ONE NODE.** The report was *"the overflow also causes the title to switch to two lines"* and
 *  the ruling was *"make the name an element so it can truncate"*. **WHAT `D-177` HAD RIGHT AND WHY THE RULING IS STILL
 *  THE CURE**: a text run is an ANONYMOUS flex item, so no selector reaches it — it can neither be given `min-width: 0`
 *  nor an `overflow` of its own, so the ellipsis `D-240` measured as UNAVAILABLE on the bar is unavailable for exactly
 *  one reason, the missing element. As a child node the name keeps `css.id` + `props.id` and the string as its
 *  `content`, and `src/renderer/index.html`'s `#app-name` rule gives it the four declarations an anonymous run can never
 *  hold (`overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`, `min-width: 0`) plus `flex: 0 1 auto`, so
 *  a narrow window truncates the name to `Providen…` instead of wrapping it or pushing the row out from under the
 *  platform's controls.
 *  **IT STANDS FIRST IN THE BAR SO THE BAR'S ORDER IS UNCHANGED** — name, then the tabs row, then the `+` — and it
 *  carries NOTHING ELSE: no authoring of a look, no `handlers`, no `-webkit-app-region` (the bar's `drag` owns every
 *  pixel its children do not claim, and a name that could not drag would be a hole in the window's own handle).
 *  **ITS ID IS A LITERAL AND NOT AN EXPORT, for the reason the four zone nodes' ids are literals** (`docs/L3/app-envelope/
 *  design.md` §9): a further export moves the module's published-name surface, and no module resolves this node by id —
 *  its reader is the page sheet's `#app-name` rule (`D-240`'s lever, now writable) and the rendered markup `AL-1` reads.
 *  **ITS READER, IN ONE LINE**: the sheet's truncation rule and the rendered read — and, unlike the zones, nothing else. */
const APP_NAME_ID = 'app-name'

/** **THE ADD-A-TAB CONTROL'S TWO DECLARATIONS, AND ONE OF THEM IS THE DRAG REGION'S** (`C-10`'s rule applied
 *  to a node the chips do not own): `no-drag`, exactly as the row PROTOTYPE's `css` carries it for every minted
 *  chip — the bar's `drag` covers every pixel its children do not claim, so a control that could not be pressed
 *  would be a node rendered for nothing. **AND `flex: 0 0 auto` IS THE `+`'s OWN BELT**: a flex item's default
 *  `flex-shrink: 1` would squeeze a one-character label to nothing in a crowded bar, and the control has to keep
 *  its own box while the ROW is the box that yields (the chips' `flex: 0 0 auto`, one level out).
 *  **IT AUTHORS NO FIGURE AND NO LOOK**: width, height, padding, border, radius, font and the cursor are the
 *  page sheet's (`src/renderer/index.html`'s `#tab-add`), the same division `.tab-row` already has. */
const tabAddStyle: Record<string, string> = {
  '-webkit-app-region': 'no-drag',
  flex: '0 0 auto',
}

/** **THE ARRANGEMENT** (`D-176`'s charter, `D-185`): the app root is a COLUMN — the top-bar, then the `top`
 *  zone spanning the full width, then the row of `left` + stage + `right`, then the `bottom` zone spanning
 *  the full width — and the container between the two full-width zones is a ROW whose middle child takes
 *  the remainder. It is `css` on containers and NOTHING stores it; the record's `display` is the ZONE's
 *  participation and is the paint's, which is why no zone authors one beside it (`D-129`). **The root's own
 *  column is `appRootStyle` above**, whose `display` this unit re-authors from `block` to the layout
 *  column: a `display` the RECORD owns is a zone's, and the root is no zone (`D-185`). */
const arrangementStyle: Record<string, string> = { display: 'flex', 'flex-direction': 'row' }
/** **THE STAGE — THE FLEX REMAINDER AND `overflow`, AND NO DIMENSION** (`D-185`): derived, so a figure here
 *  would be the second authority the record does not have. `overflow: auto` is `D-187`'s one declaration
 *  for the depth the stage adds to the two the zones and the panes carry. */
const stageStyle: Record<string, string> = { flex: '1 1 0', overflow: 'auto' }
/** **THE MEASURED-FIGURES CARRIER'S AUTHORED STYLE — ONE DECLARATION, AND IT IS `display: 'none'`**
 *  (`docs/L3/app-envelope/design.md` rev 6 §2, `A-8`): the node exists to be READ, so it takes no ground from
 *  the region it reports. **AUTHORED `css` IS NOT A WRITE**, so `D-203` (a `css.style` *write* must carry CSS
 *  TEXT) does not reach it: this object is the engine's authored layer, serialised at translate time like every
 *  other `css.style` in this file, while the carrier's measured figures land in its `content` — a different
 *  mechanism, one `state-slice` away. */
const measuredCarrierStyle: Record<string, string> = { display: 'none' }

/** **THE ZONES' OWN SCROLLING ON THEIR ARRANGEMENT AXIS** (`C-12`, `D-187`) — and NOTHING ELSE: a zone
 *  authors no fixed dimension and no `display`, which the paint owns. **THE PROHIBITION IS THE POINT**: an
 *  authored figure beside `['zones'].size` is `D-129`'s second authority, and where no `size` stands the
 *  paint writes NO dimension and nothing authored stands in. **The `overflow` itself is unseeable** (the
 *  third of the unverifiable pair's family, `D-178`); what `AL-10` can check is the painted figure that
 *  replaces the absence. */
const horizontalZoneStyle: Record<string, string> = { 'overflow-x': 'auto' }
const verticalZoneStyle: Record<string, string> = { 'overflow-y': 'auto' }

/** **THE FOUR ZONE STRIPS' OWN DECLARATIONS — A THICKNESS AND A CURSOR, AND NOTHING ELSE**
 *  (`docs/L3/renderer-wiring/design-zone-handles.md` rev 1 §2; `D-194`'s `14px`, `D-234`, `D-238`).
 *  **`flex: 0 0 14px` IS THE WHOLE OF THE BOX, ON THE AXIS THE STRIP'S CONTAINER RUNS**: each strip is a FLEX ITEM
 *  of the container that holds its zone — the app root's COLUMN for `top`/`bottom`, the arrangement's ROW for
 *  `left`/`right` — so one `flex-basis` gives each one its `14px` thickness (a `height` on the column's axis, a
 *  `width` on the row's) and `flex: 0 0 …` is the belt against a crowded container squeezing it away. **AND ITS
 *  OTHER AXIS IS NO FIGURE AT ALL**: `align-self`'s default `stretch` makes every strip span its zone's edge, and
 *  an authored figure there would be a second authority beside `['zones', <id>, 'size']` (`D-129`, `D-174`).
 *  **THE THICKNESS IS STRUCTURAL AND NOT COSMETIC** (`D-194`, `OWED-1`'s taken figure): a strip of zero thickness
 *  is an element no press can land on, which is why the same `14px` is the pane handles' and why the strip is the
 *  zone's SIBLING — a strip inside a zone the record dragged to `0` would be a strip the tree had deleted.
 *  **THE CURSOR IS THE STRIP'S OWN AND IT COMES FROM THE PRIVATE MAP ABOVE**: the affordance's `cursorOf` reads
 *  `props.axis` off THIS node and paints the declaration, so the map's key is these ids and this `css.style` states
 *  the same token a second time only so the strip reads as a grip before any gesture installs (`GUTTER_CURSORS`'
 *  own two-line reason, `D-192`). **NOTHING HERE IS EVER PAINTED**: `paintStyle`'s subjects are the four zones, the
 *  panes and the rows' targets, so a strip's authored placement is stable by construction — which is exactly what
 *  a zone's authored style is NOT (`D-234` measured a zone reading `height: 140px` and nothing else). */
const horizontalZoneStripStyle: Record<string, string> = { flex: '0 0 14px', cursor: 'row-resize' }
const verticalZoneStripStyle: Record<string, string> = { flex: '0 0 14px', cursor: 'col-resize' }

/** **ONE ZONE STRIP, AUTHORED ONCE AND PLACED FOUR TIMES** — the `gutter-handle` SHAPE `MENUS_AFFORDANCE_ID` already
 *  carries (`css.id` = `props.id` = `props.axis` = the one string, `css.classes: ['gutter-handle']` as the shared
 *  styling hook, `content: ''`, and the ONE authored `pointerdown` body the gutter handle carries, shared, writing
 *  nothing), so the node is `list_targets`-visible and `provident.dispatch`-reachable exactly as every authored
 *  control is (`D-177`, `D-192`).
 *  **WHAT IT DELIBERATELY DOES NOT CARRY**: no zone id (the strip is the ZONE's sibling, never its child, so it names
 *  nothing about the box it stands beside — `renderer.ts`'s `ZONE_DRAG_HANDLES` is where node id and zone id are
 *  compared, one row per strip), no dimension of the zone (`['zones', id, 'size']` is that figure's ONE source), no
 *  `resizable` (`gutterSeamExample().resizableOf` reads the PARENT element and an absent attribute is the example's
 *  own "no veto" reading, so a strip whose parent is `app-surface` or the arrangement is resizable by declaration
 *  and nothing is authored for it), and no authored style beyond the two lines above.
 *  **THE HANDLER NAME IS THE STRIP'S OWN** rather than one shared token, because a `name` is what `list_targets`
 *  reports; the BODY is the gutter handle's shared no-op, since the drag itself is the composed gesture session's
 *  and this node authors no mechanism. */
function zoneStripNodeOf (id: string, style: Record<string, string>): Record<string, unknown> {
  return {
    type: 'div',
    css: { id, classes: ['gutter-handle'], style },
    props: { id, axis: id },
    content: '',
    handlers: [{ name: `${id}-drag`, event: 'pointerdown', body: GUTTER_DRAG_BODY }],
  }
}

/** **THE TWO MOVE GRIPS' IDS AND THE TWO RECORD PANE IDS THEIR DROPS NAME — PRIVATE, LITERAL, AND NOT EXPORTS**
 *  (`docs/L3/renderer-wiring/design-pane-relocation.md` rev 1 §7; `app-envelope` rev 7 §10; `D-41`, `D-188` debt 2).
 *  Each grip id is its node's `css.id` and `props.id`, and each of its four drops is `${gripId}-${zone}` — so the
 *  eight drop ids are DERIVED FROM THE GRIP'S ONE SPELLING INSIDE THIS FILE and stand as four LITERALS in the
 *  wiring's census (`renderer.ts`'s `PANE_MOVE_DROP_IDS`), which is the `ZONE_DRAG_HANDLES` precedent exactly: the
 *  equality between the two spellings is a ROW and never a derivation, because an export here would move this
 *  module's published surface and the design refuses that (§7). **THE RECORD'S PANE IDS ARE THE SECOND SPELLING**:
 *  `pane-a` is the RECORD key of the stage pane whose NODE is `#gutter-pane` (`renderer.ts`'s `PANE_NODE_IDS` maps
 *  the two, `D-194`), so `props.pane` names the record and never the node — the act addresses the store.
 *  **THE IDS FOLLOW THE CORPUS'S OWN CONVENTIONS**: `<affordance-region>-<verb>` for a handle, as
 *  `gutter-horizontal`/`menus-vertical` carry `<region>-<axis>` and the strips carry `zone-<id>-<orientation>`; and
 *  `<grip>-<zone>` for a drop, because a drop's whole meaning IS its destination. */
const MENUS_GRAB_ID = 'menus-grab'
const GUTTER_GRAB_ID = 'gutter-grab'
const MENUS_PANE_RECORD_ID = 'pane-menus'
const GUTTER_PANE_RECORD_ID = 'pane-a'

/** **THE PANE-MOVE GRIP'S ONE HANDLER NAME, THE DECLARED NO-OP BODY BESIDE IT, AND THE FOUR DESTINATIONS**
 *  (`docs/L3/renderer-wiring/design-pane-relocation.md` rev 1 §1–§3; `app-envelope` rev 7 §10's `A-10`).
 *  **A GRIP IS A DRAG HANDLE, AND ITS FOUR DROPS ARE THE ZONES IT CAN BE DRAGGED INTO** (the user's own words: *"It
 *  should act as a drag handle — click-drag into the vicinity of a zone and it shows a preview of the pane's placement,
 *  release causes it to commit to the relocation"*). The grip authors NO handler: a press on it FOCUSES it, the sheet's
 *  `:focus-within` rule reveals its four overlays (*"NO STATE, NO TOGGLE AND NO NEW RECORD"*), and the renderer's drag
 *  turn — `renderer.ts`'s `installPaneMoveDrag` — is what reads the pointer, draws the placement preview and commits on
 *  release. **THE DROPS ARE STILL THE CONTROLS AN AGENT MAY DISPATCH**, and each authors the `(name, event)` pair the
 *  wiring REPLACES with a live body under the same pair (`TABS_ADD_BODY`'s path, `D-239`): one shared NAME, because one
 *  act serves all eight, and a declared NO-OP body, because an authored string can reach no record and must not fabricate
 *  the act the wiring owns (`D-129`, `D-177`). **THE FOUR DESTINATIONS ARE ZONE IDS AND NEVER THE STAGE**: `C-9`'s
 *  absence rule means the stage is no destination (the design's §7), so the four literals below are the four DECLARED
 *  zone ids, spelled here as the four zone NODES spell them at their own sites — the equality is a row's business and
 *  never a derivation (`D-188` debt 2, `D-41`). */
const PANE_MOVE_HANDLER_NAME = 'pane-move'
const PANE_MOVE_BODY = `function (ctx) {
  void ctx;
}`
const PANE_MOVE_DESTINATIONS: readonly string[] = ['top', 'bottom', 'left', 'right']
/** **THE FOUR OVERLAY BANDS' TWO FIGURES — THE VIEWPORT'S OWN UNITS, BECAUSE THE ZONES' PIXELS ARE THE RECORD'S.**
 *  A drop is a **ZONE-SIZED OVERLAY while the grip is pressed**, and this file may not state a zone's extent: that figure
 *  is `['zones', <id>, 'size']` and the paint's (`D-234`, `D-243`), so an authored pixel band here would be `D-129`'s
 *  second authority in the exact form `D-174` forbids. What is authored instead is a WINDOW in the viewport's own units
 *  — *the vicinity of a zone*, which is what the gesture resolves: `top`/`bottom` own a BAND along their edge and
 *  `left`/`right` own a LANE along theirs. **THE FOUR WINDOWS ARE DISJOINT BY CONSTRUCTION** (`top` and `bottom` take the
 *  bands, the verticals take the middle of the height), so exactly one overlay is under any pointer and the drag's answer
 *  is never an ordering accident; the MIDDLE of the window — the stage — belongs to none of them, which is what keeps a
 *  press elsewhere from being read as a destination. */
const PANE_MOVE_OVERLAY_BAND = '25vh'
const PANE_MOVE_OVERLAY_LANE = '20vw'
/** **EACH DROP'S BOX IS ITS ZONE'S WINDOW, AND ITS `content` IS THE ONLY STRING ON IT.** It is `position: fixed`, so it is
 *  placed against the VIEWPORT and not against the grip — which is also how a scroller (`#pane-menus`' `overflow-x: auto`,
 *  `D-243`) cannot carry it: the `position: absolute` this object used to carry put the four drops in a fan beside the
 *  grip, inside the pane, and a drag cannot resolve a target from a `14px` fan. **WHAT THAT COSTS IS NAMED**: the drops
 *  lose the absolute-inside-the-grip placement, and with it the grip's own `position` stops being their containing
 *  block — the grip keeps `D-246`'s pin for the reason `D-248` measured (it is the resize grip's sibling in a scroller),
 *  but no drop is placed against it any more. Nothing else moves: the nodes, their ids, their classes and their two
 *  authored operands are the bytes they were. */
const paneMoveDropStyleOf = (zone: string): Record<string, string> => {
  const box: Record<string, Record<string, string>> = {
    top: { top: '0', left: '0', right: '0', height: PANE_MOVE_OVERLAY_BAND },
    bottom: { bottom: '0', left: '0', right: '0', height: PANE_MOVE_OVERLAY_BAND },
    left: { top: PANE_MOVE_OVERLAY_BAND, bottom: PANE_MOVE_OVERLAY_BAND, left: '0', width: PANE_MOVE_OVERLAY_LANE },
    right: { top: PANE_MOVE_OVERLAY_BAND, bottom: PANE_MOVE_OVERLAY_BAND, right: '0', width: PANE_MOVE_OVERLAY_LANE },
  }
  return { position: 'fixed', cursor: 'pointer', ...(box[zone] ?? {}) }
}

/** **ONE PANE-MOVE DROP: AN AUTHORED HANDLER PAIR, TWO AUTHORED OPERANDS, AND NO ARITHMETIC** — the node the
 *  wiring's turn reads `props.pane` and `props.zone` OFF, which is the whole of how *"which zone?"* is answered
 *  (`design-pane-relocation.md` §2) — and, since the gesture is a drag, the ZONE-SIZED OVERLAY the DOM resolves the
 *  pointer against while the grip is pressed (`renderer.ts`'s `paneMoveDropUnderPointer`: `elementFromPoint` in a window,
 *  the event's own `target` in a layout-less realm). **`props.pane` is the RECORD id its act addresses and `props.zone`
 *  the DECLARED zone id it relocates to**, both rendered as bare attributes, so the act's two operands are DATA with a
 *  node id in the address book (`D-177`, `D-235`) and **NO HIT-TEST MEASURES A BOX**: `getBoundingClientRect` THROWS in
 *  the layout-less DOM shim, so a rect-resolved drop could be measured in no module row at all (§2) — what the drag reads
 *  instead is which of these AUTHORED overlays the pointer is standing on. `css.id` = `props.id`, and the `pane-drop`
 *  class is the sheet's reveal hook. Reader: that turn's census and its drag, and the rendered markup. */
function paneMoveDropNodeOf (id: string, paneId: string, zone: string): Record<string, unknown> {
  return {
    type: 'div',
    css: { id, classes: ['pane-drop'], style: paneMoveDropStyleOf(zone) },
    props: { id, pane: paneId, zone },
    content: zone,
    handlers: [{ name: PANE_MOVE_HANDLER_NAME, event: 'click', body: PANE_MOVE_BODY }],
  }
}

/** **ONE PANE-MOVE GRIP AND ITS FOUR DROPS — A DRAG HANDLE, FOCUSABLE, AND THE PANE'S FIRST CHILD** (`design-pane-relocation.md`
 *  rev 1 §1, §7; `app-envelope` rev 7 §10). **`props.tabindex: '0'` IS THE WHOLE REVEAL MECHANISM** (`demo-envelope.ts`'s
 *  four menus carry the same prop for the same reason): the paint writes `props.*` as attributes, so this is the bare
 *  `tabindex="0"` the page sheet keys `.pane-grab:focus-within` on — a press focuses the grip, a click elsewhere blurs it,
 *  and that focus is what shows the four zone overlays the drag resolves against. **NO STATE, NO TOGGLE AND NO NEW
 *  RECORD.** The glyph is a STATIC authored string and therefore lawful (the `+`'s own case, `D-239`); the four drops are
 *  its CHILDREN so `:focus-within` on the grip reveals exactly them, and each drop is a VIEWPORT-FIXED zone window of its
 *  own (`paneMoveDropStyleOf` above) — no drop is placed against the grip, and the grip's own `css` is unpainted by any
 *  delivery (`paintStyle`'s subjects are the zones, the panes and the rows' targets — `D-234`, `D-243`).
 *  **THE `-webkit-app-region` THE CHIPS CARRY IS DELIBERATELY ABSENT** (`no-drag`, `C-10`): the drag region is the
 *  top-bar's alone and BOTH panes stand outside it — one in the `top` ZONE below the bar, one in the stage's gutter
 *  card — so a `no-drag` here would guard against a region the compositor never had (the same reading
 *  `src/renderer/index.html` states for `#menus-vertical`). Reader: the sheet's `.pane-grab` rules, `renderer.ts`'s
 *  `installPaneMoveDrag`, and the rendered markup. */
function paneMoveGripNodeOf (id: string, paneId: string, style: Record<string, string>): Record<string, unknown> {
  return {
    type: 'div',
    css: { id, classes: ['pane-grab'], style },
    props: { id, tabindex: '0' },
    content: '⠿',
    children: PANE_MOVE_DESTINATIONS.map((zone) => paneMoveDropNodeOf(`${id}-${zone}`, paneId, zone)),
  }
}

/** **THE MENUS PANE'S MOVE GRIP — AND ITS BOX IS *PINNED* RATHER THAN FLOWED, FOR `D-246`'S MEASURED REASON.**
 *  The menu pane is a SCROLLER (`D-243`'s `overflow-x: auto`), and every descendant of a scroll container is
 *  translated by its `scrollLeft` — `D-246` measured the resize strip travelling `[84,36,14,125] → [-12,36,14,125]`
 *  for exactly this cause, and the user's report *"the drag handle moves with the scrollbar, it should be external"*
 *  is that measurement in a person's words. **THIS GRIP CANNOT TAKE THE STRIPS' SIBLING FIX** (`D-244`): its parent
 *  is a PAINTED node whose `css.style` is replaced WHOLE (`#pane-menus` reads `height: 100%; width: 100px;
 *  overflow-x: auto` and nothing else after the first paint), so no `position` survives on it to hold an absolute
 *  drop set. It therefore takes `D-246`'s SECOND form instead — the SAME pin the resize strip in this pane already
 *  carries — with the float's lane on the LEFT, where this grip stands and where the resize strip does not:
 *  `float: left` takes it OUT OF THE MENUS' LINE (`white-space: nowrap` would otherwise put it on a line of its own),
 *  `position: sticky` + `left: 0` holds it against the pane's left edge while the menus scroll under it, and
 *  `position: sticky` is a POSITIONED value, so it is also the containing block its four `position: absolute` drops
 *  are placed against. **THE BOX IT TAKES IS THE LANE ITS OWN FLOAT CREATES**: the menus start where the float ends,
 *  so the strip's `14px` is spent out of the content the pane scrolls and no `padding` on the pane moves — which is
 *  what keeps `D-246`'s measured `#menus-vertical` box (`[86,36,14,125]`) exactly where it was measured. **AND NO
 *  FIGURE OF THE RECORD'S STANDS HERE**: no width of the pane, no height of the zone — only the grip's own `14px`
 *  thickness, `OWED-1`'s measured handle box (`D-194`). */
const menusGrabStyle: Record<string, string> = {
  cursor: 'grab',
  width: '14px',
  height: '14px',
  float: 'left',
  position: 'sticky',
  left: '0',
}
/** **THE GUTTER PANE'S MOVE GRIP — THE DESIGN'S OWN FORM, BECAUSE THIS PANE DOES NOT SCROLL.** `#gutter-pane`
 *  computes no `overflow` and `D-246` measured `scrollWidth == clientWidth == 100` on it, so nothing inside it can
 *  carry the grip away and no pin is owed: it stands at the pane's FLOW ORIGIN as its first child, `position:
 *  'relative'` (a positioned value on a node the paint never writes), which is the containing block its four drops
 *  are placed against. `align-self: flex-start` is authored with the group (`app-envelope` rev 7 §10) and is INERT
 *  here once the paint replaces the pane's authored `display: flex` — carried because it states where the grip sits
 *  in the pane's flow before the first delivery, and no rule of the sheet restates the box. */
const gutterGrabStyle: Record<string, string> = {
  cursor: 'grab',
  width: '14px',
  height: '14px',
  'align-self': 'flex-start',
  position: 'relative',
}

/** **THE MENUS PANE** (`D-187`'s invariant, `D-192`'s column, `D-191`'s wire): a COLUMN in the top zone at
 *  its own stored width — it FILLS the zone's height as a RELATION (`height: '100%'`, never a figure), it
 *  ADJUSTS its width, and it SCROLLS the axis it adjusts (`overflow-x`), so the eighteen items scroll
 *  rather than clip when the pane is narrow. **ITS WIDTH IS NOT AUTHORED**: the paint writes it from
 *  `['panes', 'pane-menus', 'width']`, the member its `zone` makes adjustable (`D-186`, `D-189`).
 *  **AND ONE CONSEQUENCE THAT IS NOT A FIGURE**: the top zone authors no height either, so on a first
 *  boot the strip's height is its CONTENT's until the paint's first `['zones', 'top', 'size']` write fixes
 *  it. Nothing is authored to paper over it — a fallback would be right on one boot and false on the next
 *  (`D-174`). */
const menusPaneStyle: Record<string, string> = { height: '100%', 'overflow-x': 'auto' }
/** **THE MENUS PANE'S HANDLE AT THE PANE'S LEFT EDGE** (`C-13`, `D-189`, `D-192`): the horizontal pane's
 *  adjustable axis is its WIDTH, so its bar stands vertical at the left edge and its cursor is
 *  `col-resize`. **THE THICKNESS IS THE STRIP'S, ON THE AXIS THE STRIP SPANS — `14px`**, the demo page's
 *  one measured handle box (OWED-1's proposal, taken as the user's ruling; `D-194`). A strip of zero
 *  thickness is an element that cannot be pressed at all, which is what makes the figure structural rather
 *  than cosmetic. */
const menusHandleStyle: Record<string, string> = { cursor: 'col-resize', width: '14px' }
/** **THE FOUR MENUS AND THEIR ITEMS** (`D-180`, `D-181`, `D-177`'s static enumeration): the menu is a `div`
 *  whose `content` is the MEASURED name, the item a `div` whose `content` is its label and whose
 *  `props.role` is the role the menus turn reads OFF THE NODE. There are FOUR menus and EIGHTEEN items —
 *  `1 + 7 + 7 + 3`, the enumeration `D-181` corrected the arithmetic of and `D-188` re-counted. **The three
 *  separators in `D-180`'s table are NOT nodes.** **THE SEVEN THE ROUTE REFUSES AN AGENT** (`quit`, `reload`,
 *  `forcereload`, `toggledevtools`, `minimize`, `zoom`, `close`) **CARRY NO `props.disabled` MARK**. They used to,
 *  and the mark was a lie: `disabled` is a FORM-CONTROL attribute and does nothing on a `div`, so the seven were
 *  only STYLED inert while `D-232`'s trusted path EXECUTED them for a person (a real click is `isTrusted === true`) —
 *  the contradiction the user's ruling ended: *"un-grey them — they work for a person, so show them enabled"*. **THE
 *  MARK WAS AUTHORED PER NODE AND IS REMOVED PER NODE**: no role set stands behind it here, so there is no set to
 *  change. The agent's refusal is UNMOVED and stays `main`'s admitted set (`D-196`); a `disabled` mark that ever
 *  returns is INERT at BOTH guard layers (`src/renderer/renderer.ts`'s `attachMenuItem` and `src/main/preload.ts`'s
 *  gesture witness), so it cannot half-work again. **NEITHER NODE AUTHORS A FIGURE**: a menu's and an item's shape
 *  is the class hook's, and `D-187`'s fill/adjust/scroll rule is the PANE's and never theirs. */

/** The demo legacy envelope. */
export function demoEnvelope() {
  /** The authored `css.style` OBJECTS are the two spots where the literal's inferred shape has to
   *  be pinned: `serializeStyle` (`translate.js`) turns an OBJECT of `k: v` pairs into the kebab
   *  `k: v;` CSS string at translate time, and its declared `Record<string, string>` would
   *  otherwise be inferred as a union of optional-`undefined` members across the two nodes. */
  /** **THE GUTTER CARD'S HANDLE — RE-AUTHORED IN PLACE, AND ITS POSITION IS THE POINT** (`C-13`, `D-189`):
   *  `pane-a` carries no `zone`, so `D-187` makes it behave as a SIDEBAR pane, whose adjustable axis is its
   *  HEIGHT — and a vertically-oriented pane's handle sits at the pane's **TOP-RIGHT**, inside the pane's
   *  own flex row (`align-self: flex-start` takes the top, `margin-left: auto` takes the right). The bar
   *  therefore spans the HORIZONTAL, its cursor is `row-resize`, and its thickness is the `14px` the demo
   *  page measured as a pressable strip's box — **NOT the `200px` this once carried**, which was the OLD
   *  left strip's landing WIDTH and never a thickness at all. A zero-thickness strip is one a press cannot
   *  land on (the measured `w=0, h=44` of L-2), which is what makes the figure structural.
   *  **NEITHER CROSSES THE AXIS ITS ZONE FIXES**: this bar slides on the vertical, the menus pane's on the
   *  horizontal, and neither states a pane figure — `pane-a`'s height is `['panes']`'s (`D-191`). */
  const handleStyle: Record<string, string> = {
    cursor: 'row-resize',
    height: '14px',
    'align-self': 'flex-start',
    'margin-left': 'auto',
  }
  /** The demo card's own pane and target styles; the drag's `pane-a` geometry is `['panes']`'s and neither
   *  of these states one (`D-117`, `D-129`, `D-191`). */
  const paneStyle: Record<string, string> = { display: 'flex', 'align-items': 'stretch' }
  const targetStyle: Record<string, string> = { width: '100px', 'min-height': '28px' }
  return {
    template: {
      root: {
        type: 'div',
        css: { classes: ['demo-shell'] },
        children: [
          // ---- THE AUTHORED APP ROOT (`D-113`, `S-2`) -------------------------------------
          // EVERY node of the app's own surface stands INSIDE this node, and this node is what the overlay's
          // inert declaration is written to — which is why `S-2`'s skeleton is authored HERE and never beside
          // the root: the top-bar, the zones, the arrangement and the cards all go inert under the modal
          // (`C-5`, `D-178` §3). The opener is its LAST child on purpose and the overlay LAYER its FOLLOWING
          // SIBLING below: while the overlay is closed the root is not inert and the button is pressable;
          // while it is open the root IS inert and the button is not — the modal's own controls live in that
          // sibling, outside this subtree, where `inert` cannot reach them.
          {
            type: 'div',
            css: { id: APP_ROOT_ID, classes: ['app-surface'], style: appRootStyle },
            props: { id: APP_ROOT_ID },
            children: [
              // ---- THE TOP-BAR (`S-2`, `D-176`, `D-178` §3, `D-183`) ------------------------------
              // **THE BAR AUTHORS NO `content` AND ITS NAME IS A CHILD NODE (`APP_NAME_ID` above), WHICH IS THE
              // USER'S RULING AND SUPERSEDES `D-177`'s content-string cut FOR THIS NODE ALONE.** The name stands FIRST
              // in `children`, so the bar's order — name, tabs row, `+` — is exactly what it was when the name was the
              // bar's own text run; what changed is that the run has an element of its own to truncate in.
              // It is resolved by NO module by id — **no module reads this node's geometry** (`C-10`). Its
              // `css` carries the window's DRAG REGION: with `titleBarStyle: 'hidden'` the OS bar is gone, so
              // without `-webkit-app-region: drag` here the window cannot be moved at all (`D-183`). **The
              // strip the native controls occupy gets NO NODE and NOTHING** — the platform owns its own
              // region, and an authored inset there would be a figure of the WINDOW (`D-179`).
              {
                type: 'div',
                css: { classes: ['top-bar'], style: topBarStyle },
                children: [
                  // ---- THE APPLICATION'S NAME (`APP_NAME_ID`, the user's ruling over `D-177`'s cut) ------
                  // An element and not a text run, so the sheet can give it `min-width: 0` and an `overflow` of its
                  // own and the ellipsis becomes available (`D-240` measured it UNAVAILABLE on the bar for the one
                  // reason this node removes). **IT CARRIES THE STRING AND NOTHING ELSE**: its id on `css.id` and on
                  // `props.id`, and the name as `content` — no `css.style` (the whole truncation is the sheet's
                  // `#app-name` rule), no `handlers`, no `-webkit-app-region`. Reader: that rule, and the rendered
                  // markup (`AL-1`).
                  {
                    type: 'span',
                    css: { id: APP_NAME_ID },
                    props: { id: APP_NAME_ID },
                    content: 'Provident-Electron',
                  },
                  // ---- THE TABS ROW (`D-179`, `D-182`) --------------------------------------------
                  // **NO `content`**: its rows are MINTED and their labels PAINTED, so an authored string
                  // here would be a label nothing computed (`D-177`). The `hooks` entry IS `TABS_ROWS_ID`,
                  // because the node id, the mint op's `target` and its hook name are ONE string
                  // (ASM-AE-2), and `hooksKind` declares it `'placement'` — without that declaration a
                  // placement mint is REFUSED `hook-kind-mismatch`. It stands INSIDE the dragging bar
                  // because that is the only place `no-drag` means anything (`D-183`).
                  // **AND IT AUTHORS NO `css.style` AT ALL** — see `topBarStyle`'s block above: the width that
                  // stood here was a flex BASE SIZE, and the charter's allocation is that the row occupies "the
                  // space in between" (`D-176`), which the sheet's `flex: 1 1 auto; min-width: 0` computes.
                  // Readers: the mint turn (its `target`) and the row paint (`AL-2`, `AL-4`).
                  {
                    type: 'div',
                    css: { id: TABS_ROWS_ID },
                    props: { id: TABS_ROWS_ID },
                    hooks: [TABS_ROWS_ID],
                    hooksKind: TABS_ROW_HOOKS_KIND,
                  },
                  // ---- THE ADD-A-TAB CONTROL (`TABS_ADD_ID`, the twenty-first published name) -----
                  // **IT STANDS BESIDE THE ROW SET AND NEVER INSIDE IT, AND THAT IS STRUCTURAL**: the rows are
                  // MINTED into `TABS_ROWS_ID` and a mint REPLACES the row set (`D-201`, `D-182`), so a control
                  // authored inside that node would be destroyed on the next `['tabs']` delivery. As the row's
                  // FOLLOWING SIBLING it is the bar's own child, untouched by every mint this app will ever
                  // make. It is in the drag region's `no-drag` (`tabAddStyle`), like every chip.
                  // `content: '+'` is a STATIC authored label and therefore lawful (`D-177`: the rule bars a
                  // label NOTHING computed, and nothing computes this one). The `handlers` entry is the
                  // DECLARED no-op (`TABS_ADD_BODY`) whose `(name, event)` pair `renderer-wiring`'s install
                  // OVERRIDES with the live body that calls the row's own act — the menus' path, not a second
                  // one. Reader: that turn's census (by THIS id) and its two attaches.
                  {
                    type: 'div',
                    css: { id: TABS_ADD_ID, style: tabAddStyle },
                    props: { id: TABS_ADD_ID },
                    content: '+',
                    handlers: [{ name: TABS_ADD_HANDLER_NAME, event: 'click', body: TABS_ADD_BODY }],
                  },
                ],
              },
              // ---- THE TOP ZONE (`D-185`, `D-187`) ------------------------------------------------
              // The four zone nodes carry the record's DECLARED ids as LITERALS, on `css.id` AND `props.id`,
              // because the paint addresses a zone BY ID and no op takes a walk — and because five more
              // exports would move the published surface past the `19` the map carries (design §9). **The id
              // must EQUAL `DECLARED_ZONE_IDS`' member of the same name**: the equality is a constraint
              // `AL-10` measures, never a derivation (ASM-AE-1). `top`/`bottom` fix the HEIGHT and
              // `left`/`right` the WIDTH, and **NEITHER FIGURE IS AUTHORED HERE**: `['zones', id, 'size']`
              // owns it and the paint writes it, and where no `size` stands the paint writes NO dimension and
              // nothing authored stands in (`D-174`, `D-185`, `D-129`). Each zone authors its own `overflow`
              // on the ARRANGEMENT axis — the OUTER of `D-187`'s two depths. Reader: the paint's `css.style`
              // write (`AL-10`).
              {
                type: 'div',
                css: { id: 'top', style: horizontalZoneStyle },
                props: { id: 'top' },
                children: [
                  // ---- THE MENUS PANE (`S-9`, `D-186`, `D-187`, `D-191`, `D-192`) -------------------
                  // A **COLUMN in the top zone at its own stored width**: it fills the zone's HEIGHT
                  // (a RELATION, `height: '100%'`), adjusts its WIDTH, and scrolls the axis it adjusts
                  // (`overflow-x`), so twelve characters too many scroll rather than clip. **ITS WIDTH IS
                  // NOT AUTHORED** — the paint writes it from `['panes', 'pane-menus', 'width']`, the member
                  // its `zone` makes adjustable (`D-186`, `D-189`, `D-191`). Readers: that paint (`AL-10`) and
                  // the menus turn, which attaches the items (`AL-6`, `AL-7`).
                  {
                    type: 'div',
                    css: { id: 'pane-menus', style: menusPaneStyle },
                    props: { id: 'pane-menus' },
                    children: [
                      // (a0) **THE PANE-MOVE GRIP AND ITS FOUR ZONE DROPS** (`MENUS_GRAB_ID`, the relocation's
                      // second affordance — `docs/L3/renderer-wiring/design-pane-relocation.md` rev 1 §1, §7).
                      // **IT IS THE PANE'S FIRST CHILD AND IT IS PINNED, NOT FLOWED**, and both halves are
                      // `D-246`'s: this pane SCROLLS (`overflow-x: auto`, `D-243`), so a control inside it travels
                      // with the content unless it is pinned — the defect the user reported against the resize
                      // strip below, one node over — while the pane's own `css.style` is PAINTED and replaced
                      // WHOLE (`D-234`), so no `position` on the pane survives to hold an absolute drop set and
                      // the strips' SIBLING fix (`D-244`) is not available here. `float: left` + `position:
                      // sticky` + `left: 0` is `D-246`'s own second form, on the edge this grip stands on and the
                      // resize strip does not. **IT AUTHORS NO ACT AND NO FIGURE**: a press on it only focuses it,
                      // and the sheet's `.pane-grab:focus-within` rule is what reveals the drops beneath it
                      // (`props.tabindex`, the menus' mechanism, *"NO STATE, NO TOGGLE AND NO NEW RECORD"*).
                      // Its `props.pane` operand is the RECORD's id, spelled as written in `shared/view-shape.ts`
                      // and NOT this node's own id (`PANE_NODE_IDS`' two-name reason, `D-194`). Reader:
                      // `renderer.ts`'s `startPaneMove` census, and the rendered markup.
                      paneMoveGripNodeOf(MENUS_GRAB_ID, MENUS_PANE_RECORD_ID, menusGrabStyle),
                      // (a) THE HANDLE (`MENUS_AFFORDANCE_ID`, §3 above) — THE GUTTER HANDLE'S OWN SHAPE: a
                      // real, pressable `14px` strip at the pane's LEFT EDGE, the edge its ADJUSTABLE axis
                      // (the width) can move, and it crosses no axis (`C-13`, `D-189`, `D-192`). Its shared
                      // `pointerdown` body keeps the node `list_targets`-visible and
                      // `provident.dispatch`-reachable and writes nothing; **no composition carries the
                      // gesture** (the tree's one drag composition is bound to `DEFAULT_PANE_ID`), so no row
                      // drives it and no row reads the edge — `AL-1` measures its PRESENCE under this id.
                      {
                        type: 'div',
                        css: { id: MENUS_AFFORDANCE_ID, classes: ['gutter-handle'], style: menusHandleStyle },
                        props: { id: MENUS_AFFORDANCE_ID, axis: MENUS_AFFORDANCE_ID },
                        content: '',
                        handlers: [{ name: 'menus-drag', event: 'pointerdown', body: GUTTER_DRAG_BODY }],
                      },
                      // (b) THE FOUR MENUS AND THEIR EIGHTEEN ITEMS (`D-180`, `D-181`, `D-188`) — a STATIC
                      // enumeration, and a static node is exactly what makes an authored label lawful
                      // (`D-177`). Each item carries its `props.role` so the menus turn reads the role OFF
                      // THE NODE and never from a table of its own; **NO ITEM CARRIES `props.disabled`**: the seven
                      // the route refuses an agent are STYLED ENABLED because they WORK for a person (`D-232`'s
                      // trusted path), and the unbypassable guard is `main`'s admitted set (`D-181`, `D-196`).
                      // Readers: the menus turn, `AL-6`, `AL-7`.
                      //
                      // **AND EACH MENU CARRIES `props.tabindex: '0'`, WHICH IS THE DROP-DOWN'S WHOLE MECHANISM.** The paint
                      // writes `props.*` as attributes, so this is the bare `tabindex="0"` the page sheet keys on: a menu NAME
                      // becomes focusable, `:focus-within` IS THE CLICK (a click focuses, a click elsewhere blurs), and
                      // `src/renderer/index.html` hides `.menus-menu > .menu-item` until then. **NO STATE, NO TOGGLE AND NO NEW
                      // RECORD** — the four names stand in a horizontal strip, a name's items drop VERTICALLY below it on a
                      // click, and the items remain in the markup (hidden by CSS, never deleted): `provident.dispatch`,
                      // `list_targets`, `get_rendered_html` and `get_markdown` all still see all eighteen, and `AL-6`'s count
                      // is unmoved. It is also the honest control for a keyboard user: `Tab` reaches each name and the items
                      // open on focus. **NOTHING HERE IS A FIGURE OR A LABEL**: the prop adds no node, no class, no content and
                      // no handler, and every role, label and mark below is the landed text, unchanged.
                      {
                        type: 'div',
                        css: { classes: ['menus-menu'] },
                        props: { tabindex: '0' },
                        content: 'File',
                        children: [
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'quit' },
                            content: 'Quit',
                          },
                        ],
                      },
                      {
                        type: 'div',
                        css: { classes: ['menus-menu'] },
                        props: { tabindex: '0' },
                        content: 'Edit',
                        children: [
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'undo' },
                            content: 'Undo', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'redo' },
                            content: 'Redo', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'cut' },
                            content: 'Cut', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'copy' },
                            content: 'Copy', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'paste' },
                            content: 'Paste', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'delete' },
                            content: 'Delete', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'selectall' },
                            content: 'Select All', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                        ],
                      },
                      {
                        type: 'div',
                        css: { classes: ['menus-menu'] },
                        props: { tabindex: '0' },
                        content: 'View',
                        children: [
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'reload' },
                            content: 'Reload',
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'forcereload' },
                            content: 'Force Reload',
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'toggledevtools' },
                            content: 'Toggle Developer Tools',
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'resetzoom' },
                            content: 'Actual Size', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'zoomin' },
                            content: 'Zoom In', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'zoomout' },
                            content: 'Zoom Out', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'togglefullscreen' },
                            content: 'Toggle Full Screen', handlers: [{ name: 'menu-item', event: 'click', body: MENUS_ITEM_BODY }],
                          },
                        ],
                      },
                      {
                        type: 'div',
                        css: { classes: ['menus-menu'] },
                        props: { tabindex: '0' },
                        content: 'Window',
                        children: [
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'minimize' },
                            content: 'Minimize',
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'zoom' },
                            content: 'Zoom',
                          },
                          {
                            type: 'div', css: { classes: ['menu-item'] }, props: { role: 'close' },
                            content: 'Close',
                          },
                        ],
                      },
                      // (c) THE RECEIPT CARRIER (`MENUS_RECEIPT_ID`) — **NO `content`**: what stands
                      // between a boot and the first answer is EMPTY, never a figure and never a placeholder
                      // word (`D-129`, `D-174`). Reader: the menus turn writes the route's answer into it
                      // (`AL-7`). **The carrier is a NODE because the write is a `state-slice` content write
                      // on an authored id** — an authored body can reach no route, so the click path is where
                      // the answer comes from (design §8 (iv)).
                      {
                        type: 'div',
                        css: { id: MENUS_RECEIPT_ID },
                        props: { id: MENUS_RECEIPT_ID },
                      },
                    ],
                  },
                ],
              },
              // ---- THE `top` ZONE'S STRIP — ITS **FOLLOWING SIBLING** IN THE ROOT COLUMN ---------------------
              // **THE ZONE'S SIBLING AND NEVER ITS CHILD, AND THAT IS MEASURED RATHER THAN PREFERRED**
              // (`docs/L3/renderer-wiring/design-zone-handles.md` rev 1 §2; `D-234`): `paintStyle` hands the engine
              // ONE `css.style` value in `replace` mode, so a ZONE's authored style does not survive its first paint
              // (`#top` reads `height: 140px` and nothing else) — which means a zone can carry no `position:
              // relative` for an absolutely placed child and no authored layout at all for a flowed one, and the tree
              // could state no placement for a strip inside it. **AND THE SECOND REASON IS STRUCTURAL**: the record
              // admits a zone of `size: 0` (`D-234`'s minimize marker), and a handle inside a zero-sized zone is a
              // handle no press can land on — where a SIBLING keeps its own `14px` and a zone dragged to nothing is a
              // zone dragged back.
              // **IT STANDS ON THE ZONE'S BOTTOM EDGE**, the one facing the stage: that edge's position IS the zone's
              // `size` (`D-185`), so it is the edge a person pushes. Its pointer axis is `y` and its sign is `+1`
              // (the figure grows as the edge moves DOWN) — all three in `renderer.ts`'s `ZONE_DRAG_HANDLES`, which
              // is the wiring's half of this node.
              zoneStripNodeOf(ZONE_TOP_STRIP_ID, horizontalZoneStripStyle),
              // ---- THE ARRANGEMENT CONTAINER (`D-176`, `D-185`) ----------------------------------
              // ONE `div` between the two full-width zones, holding `left` + the stage + `right` in a ROW so
              // the sidebars stretch BETWEEN the top and bottom zones — the charter's own nesting, in `css`
              // and nowhere else. **STRUCTURAL, AND RESOLVED BY NOTHING**: it authors no id because no reader
              // can be written for one (`D-177`), and it states no dimension because the stage takes the
              // remainder (`D-185`).
              {
                type: 'div',
                css: { classes: ['arrangement'], style: arrangementStyle },
                children: [
                  // ---- THE LEFT SIDEBAR ZONE (`D-185`) --------------------------------------------
                  // A sidebar fixes the WIDTH and leaves the height adjustable; its `overflow-y` scrolls the
                  // axis it fixes at the zone depth, and no figure is authored for it (`D-174`, `AL-10`).
                  {
                    type: 'div',
                    css: { id: 'left', style: verticalZoneStyle },
                    props: { id: 'left' },
                  },
                  // ---- THE `left` ZONE'S STRIP — ITS **FOLLOWING SIBLING** IN THE ARRANGEMENT ROW ------------
                  // **ON THE ZONE'S RIGHT EDGE**, the one facing the stage, because that edge's position is the
                  // width `['zones','left','size']` carries; pointer axis `x`, sign `+1` (the figure grows as the
                  // edge moves RIGHT) — `renderer.ts`'s `ZONE_DRAG_HANDLES`. It is the zone's SIBLING for the two
                  // reasons the `top` strip's comment states (a replaced `css.style` and a lawful `size: 0`), and
                  // this row is the ROW container, so its `flex: 0 0 14px` is a WIDTH here.
                  zoneStripNodeOf(ZONE_LEFT_STRIP_ID, verticalZoneStripStyle),
                  // ---- THE STAGE (`D-185`) ------------------------------------------------------
                  // THE FLEX REMAINDER and `overflow`, and **NO dimension**: the stage is DERIVED, so a figure
                  // here would be a second authority nothing stores and nothing repairs. **RESOLVED BY
                  // NOTHING, NEVER PAINTED, NEVER STORED** (`D-185`) — no reader can be written for it by id,
                  // which is why it authors none (`D-177`) — and the ONE body that decides its children's
                  // `display` is the stage paint's (`C-4`, `D-129`). Its children are the record's TWO
                  // TERMINAL PAGES, and the landing page holds the `h1` and the four content cards.
                  {
                    type: 'div',
                    css: { classes: ['stage'], style: stageStyle },
                    children: [
                      // ---- the tab record's two authored terminal pages (U-STORE-TABS-RECORD) -------
                      // THE LANDING PAGE and THE ERROR PAGE, `page`-roled TERMINALS rather than list rows
                      // (`§0A` item 5). They are the record's own terminals and they are AUTHORED HERE, one
                      // node each with its own authored structure, its own authored handler STRING and its
                      // own `data-*`-free declarative styling — the same envelope-data form the gutter and
                      // theme cards use. NEITHER page carries state: each renders from the record, and the
                      // wiring's bounded role reads the record's witness and drives the node (`§3.5`
                      // items 1/3). The two ids are the declared pairs `PAR-9` names and `T1` must read from
                      // the contract rather than re-declare. **THE MOVE IS `A-5`'S**: they stand here instead
                      // of inside the app root, and the landing page gains the `h1` and the four content cards
                      // as children (`C-5`) — which keeps `inert` covering them, because the stage is inside
                      // the root and so are they.
                      {
                        type: 'section',
                        css: { id: TABS_LANDING_PAGE_ID, classes: ['card', 'tabs-page'], style: tabsPageStyle },
                        props: { id: TABS_LANDING_PAGE_ID, role: 'page' },
                        content: 'Landing',
                        handlers: [{ name: 'tabs-landing-page-open', event: 'click', body: TABS_LANDING_PAGE_BODY }],
                        children: [
                          // ---- THE DEMO HEADING, RE-PARENTED FIRST (`A-5`) --------------------------
                          // The app root's FIRST child until this pass, and it had no home in L2 §2's
                          // root-child order; it stands FIRST here, inside the landing page, so the active
                          // tab's stage content is one subtree and `inert` still covers it (`C-5`).
                          { type: 'h1', content: 'Provident-Electron — MCP endpoint demo' },
                          // ---- counter card ------------------------------------------------
                          {
                            type: 'section',
                            css: { id: 'counter-card', classes: ['card'] },
                            children: [
                              { type: 'h2', content: 'Counter' },
                              {
                                type: 'div',
                                css: { id: 'counter', classes: ['counter-value'] },
                                props: { id: 'counter' },
                                content: '0',
                              },
                              {
                                type: 'button',
                                css: { id: 'inc', classes: ['btn'] },
                                content: 'Increment (+1)',
                                handlers: [{ name: 'inc', event: 'click', body: INC_BODY }],
                              },
                              {
                                type: 'button',
                                css: { id: 'dec', classes: ['btn'] },
                                content: 'Decrement (-1)',
                                handlers: [{ name: 'dec', event: 'click', body: DEC_BODY }],
                              },
                              {
                                type: 'button',
                                css: { id: 'reset', classes: ['btn'] },
                                content: 'Reset',
                                handlers: [{ name: 'reset', event: 'click', body: RESET_BODY }],
                              },
                            ],
                          },
                          // ---- gutter card (U-GUTTER-UI) -----------------------------------
                          // The affordance / target / status triple, authored as DATA: the handle the pointer
                          // is over (its own `pointerdown` handler keeps it `list_targets`-visible), the pane
                          // it resizes, and the read-out the wiring's ONE `state-slice` write patches — the
                          // read-out authoring NO figure of its own, and standing EMPTY until its first
                          // delivery paints it (`F3`, `D-129`). **NOTHING INSIDE THIS CARD MOVED WITH IT**:
                          // its nodes, `props`, `css` and handler bodies are the bytes they were (`A-5`).
                          {
                            type: 'section',
                            css: { id: 'gutter-card', classes: ['card'] },
                            children: [
                              { type: 'h2', content: 'Gutter (drag to resize)' },
                              {
                                type: 'div',
                                css: { id: 'gutter-pane', classes: ['gutter-pane'], style: paneStyle },
                                props: { id: 'gutter-pane', resizable: 'true' },
                                children: [
                                  // (a0) **THE GUTTER PANE'S MOVE GRIP AND ITS FOUR ZONE DROPS** (`GUTTER_GRAB_ID`;
                                  // `docs/L3/renderer-wiring/design-pane-relocation.md` rev 1 §1, §7). **THE DESIGN'S
                                  // OWN FORM, UNPINNED, AND THAT IS MEASURED RATHER THAN ASSUMED**: this pane computes
                                  // no `overflow` and `D-246` read `scrollWidth == clientWidth == 100` on it, so
                                  // nothing inside it can carry the grip away and no `sticky` inset is owed — the
                                  // pane's FIRST child at its flow origin, `position: relative` for its absolutely
                                  // placed drops. **ITS `props.pane` IS THE RECORD'S KEY AND NOT THIS NODE'S ID**:
                                  // the pane's node is `#gutter-pane` and its record is `['panes','pane-a']`
                                  // (`PANE_NODE_IDS`' two-name reason, `D-194`) — the act addresses the store.
                                  // Reader: `renderer.ts`'s `startPaneMove` census, and the rendered markup.
                                  paneMoveGripNodeOf(GUTTER_GRAB_ID, GUTTER_PANE_RECORD_ID, gutterGrabStyle),
                                  {
                                    // (a) THE AFFORDANCE — `§2.1` item 7(a): an authored `css.id`, an authored
                                    // `css.classes` list, an authored `css.style` carrying THE BASE `cursor`
                                    // DECLARATION **AND THE STRIP'S THICKNESS, AND NO GEOMETRY CLAIM**
                                    // (`D-189`, `D-193`), an authored `props.id`, and the authored
                                    // `pointerdown` handler. L-3's live finding was exactly this missing
                                    // declaration: the element rendered `<div … class="gutter-handle"
                                    // data-node-id="node-12">` with NO `cursor` and no `style` attribute at
                                    // all, so `U-2`(a) could not be satisfied by any shipped instrument — and a
                                    // measured `w=0, h=44` box is one no press can land on.
                                    // **WHAT THE BOX SAYS NOW**: `handleStyle` carries the `14px` THICKNESS on
                                    // the axis the strip spans, the `row-resize` cursor, and the TOP-RIGHT
                                    // placement `D-189` gives a vertically-oriented pane's handle — the strip
                                    // stands at the edge its ADJUSTABLE axis (the height) can move, and it
                                    // crosses no axis. **THE `200px` THIS ONCE CARRIED IS GONE**: it was the old
                                    // left strip's landing WIDTH, never a thickness, and `pane-a`'s height is
                                    // `['panes']`'s since `D-117` (`D-129`). The declared degradation is
                                    // unchanged (no pointer CAPTURE, `§2.6` item 4), so a drag that leaves the
                                    // strip's box loses its reading — which is exactly why the strip has to be
                                    // pressable at all: this composition installs NO pointer capture, so the
                                    // session's tracking listeners are LOCAL to the element.
                                    type: 'div',
                                    css: { id: GUTTER_AFFORDANCE_ID, classes: ['gutter-handle'], style: handleStyle },
                                    props: { id: GUTTER_AFFORDANCE_ID, axis: GUTTER_AFFORDANCE_ID },
                                    content: '',
                                    handlers: [{ name: 'gutter-drag', event: 'pointerdown', body: GUTTER_DRAG_BODY }],
                                  },
                                  {
                                    // (b) THE TARGET — `§2.1` item 7(b): an authored `css.id`, an authored
                                    // `css.style` carrying a BASE SIZE DECLARATIVE, and an authored `props.id` —
                                    // and NOTHING ELSE. The pre-drag size and the bounds pair that once stood
                                    // on the PANE's `props` as `size`/`min`/`max` are `['panes']`'s since
                                    // `D-117` and left the node at `F11` (`D-129`), so no seam reads a geometry
                                    // off an element any more. An authored `props` entry still renders as a
                                    // BARE ATTRIBUTE (the pane's `resizable`, the handle's `axis`), which is
                                    // what the surviving seams read (L-6/ADV-GU-7: those reads used to go
                                    // through `dataset[...]` and every one missed).
                                    type: 'div',
                                    css: { id: GUTTER_TARGET_ID, classes: ['gutter-target'], style: targetStyle },
                                    props: { id: GUTTER_TARGET_ID },
                                    content: 'resizable pane',
                                  },
                                ],
                              },
                              {
                                // (c) THE READ-OUT — an authored `css.id`, an authored `css.classes` and an
                                // authored `props.id`, and NO FIGURE OF ITS OWN. It carried `content: '100'`
                                // until `F3`, and that figure was a SECOND AUTHORITY (`D-129`, case (b)): the
                                // pane's geometry is a shape `['panes']` at `file` owns — `panesMustStand`
                                // repairs it and `paneGeometryIn` answers the measured default for a pane the
                                // family does not name — and the literal's only reader was the paint's own
                                // comparison, so it bought a skipped write at the price of a figure the store
                                // can falsify. NOTHING REPLACES IT — not `''`, not `'0'`, not a placeholder
                                // word, which would be a new local default on the same shape: the read-out
                                // reads EMPTY until a `'record'`-arm delivery paints it, which is never wrong,
                                // and that paint is `renderer.ts`'s `renderPaneSize` (`S1`–`S4`) — the delivery
                                // is the read-out's only author.
                                type: 'div',
                                css: { id: GUTTER_STATUS_ID, classes: ['gutter-status'] },
                                props: { id: GUTTER_STATUS_ID },
                              },
                            ],
                          },
                          // ---- echo card ---------------------------------------------------
                          {
                            type: 'section',
                            css: { id: 'echo-card', classes: ['card'] },
                            children: [
                              { type: 'h2', content: 'Echo (input -> echo-out)' },
                              {
                                type: 'input',
                                css: { id: 'echo-input' },
                                props: { id: 'echo-input' },
                                handlers: [{ name: 'echo', event: 'input', body: ECHO_BODY }],
                              },
                              {
                                type: 'div',
                                css: { id: 'echo-out', classes: ['echo-out'] },
                                props: { id: 'echo-out' },
                                content: '(nothing yet)',
                              },
                            ],
                          },
                          // ---- theme card (U-THEME-CONTROL, docs/specs/theme-control.md §2.1) -----------
                          // 'theme-card' — THE AUTHORED APPEARANCE CONTROL, and it is FIVE nodes: this section,
                          // its heading, the two setting-token buttons and the state node whose `content` carries
                          // the setting. THE TOKEN BLOCK IS CLOSED AT TWO and it is DEMO DATA: the repo asserts
                          // nothing about what either member MEANS, the authored handler CARRIES the caller's token
                          // and interprets nothing, the state node is the ONE graph-readable carrier, NO attribute
                          // is written, and no unit may generalise this card into a shipped appearance UI (§1
                          // item 7). Each button's handler carries its OWN authored block member; the value it
                          // WRITES is the CALLER's (`provident.dispatch theme-dark click` with the token as its
                          // argument), which is why the body declares its member and substitutes no default.
                          {
                            type: 'section',
                            css: { id: 'theme-card', classes: ['card'] },
                            children: [
                              { type: 'h2', content: 'Appearance (demo)' },
                              {
                                type: 'button',
                                css: { id: 'theme-dark', classes: ['btn'] },
                                props: { value: THEME_DARK_TOKEN },
                                content: 'Dark',
                                handlers: [
                                  {
                                    name: 'theme-set',
                                    event: 'click',
                                    body: `function (ctx, value) {
      const authoredToken = 'dark';
      void authoredToken;
      const all = ctx.tree.allNodes();
      const node = all.find(function (n) { return n && n.props && n.props.id === 'theme-setting'; });
      if (!node) return;
      let carried = '';
      try { carried = value == null ? '' : String(value); } catch (ignored) { return; }
      try { ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: carried }]); } catch (e) { void e; }
    }`,
                                  },
                                ],
                              },
                              {
                                type: 'button',
                                css: { id: 'theme-light', classes: ['btn'] },
                                props: { value: THEME_LIGHT_TOKEN },
                                content: 'Light',
                                handlers: [
                                  {
                                    name: 'theme-set',
                                    event: 'click',
                                    body: `function (ctx, value) {
      const authoredToken = 'light';
      void authoredToken;
      const all = ctx.tree.allNodes();
      const node = all.find(function (n) { return n && n.props && n.props.id === 'theme-setting'; });
      if (!node) return;
      let carried = '';
      try { carried = value == null ? '' : String(value); } catch (ignored) { return; }
      try { ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: carried }]); } catch (e) { void e; }
    }`,
                                  },
                                ],
                              },
                              {
                                type: 'div',
                                css: { id: 'theme-setting', classes: ['theme-setting'] },
                                props: { id: 'theme-setting' },
                                content: THEME_INITIAL_TOKEN,
                              },
                            ],
                          },
                        ],
                      },
                      // ---- THE ERROR PAGE — the same moved shape, and it keeps its own children: none. ----
                      {
                        type: 'section',
                        css: { id: TABS_ERROR_PAGE_ID, classes: ['card', 'tabs-page'], style: tabsPageStyle },
                        props: { id: TABS_ERROR_PAGE_ID, role: 'page' },
                        content: 'Tab error',
                        handlers: [{ name: 'tabs-error-page-open', event: 'click', body: TABS_ERROR_PAGE_BODY }],
                      },
                      // ---- THE MEASURED-FIGURES CARRIER (`D-203`, `D-204`, `D-207`, `D-208`; `A-8`) ----
                      // **THE STAGE'S LAST CHILD, AND IT IS AN INSTRUMENT AND NOT A REGION**: a `span` carrying
                      // its two ids and an authored `display: 'none'`, so it takes no ground from the stage it
                      // stands in (`docs/L3/app-envelope/design.md` rev 6 §2). **NO `content` IS AUTHORED** —
                      // what stands before a real realm measures is EMPTY (`D-174`, `D-129`) — and **NO
                      // `handlers` BODY**: a figure here is MEASURED and never computed, and `D-208` measured
                      // twice why a driven body cannot take the reading at all (the app boots through
                      // `bootstrap()`, and every driver envelope replaces the graph the app renders). **ITS
                      // WRITER IS `renderer-wiring`'s `reportMeasuredFigures`**, the paint turn's last act; its
                      // ONE reader is `AL-12`, which reads this node's TEXT out of
                      // `provident.get_rendered_html` — the ONE way a COMPUTED style reaches a battery row.
                      {
                        type: 'span',
                        css: { id: LAYOUT_MEASURED_ID, style: measuredCarrierStyle },
                        props: { id: LAYOUT_MEASURED_ID },
                      },
                    ],
                  },
                  // ---- THE `right` ZONE'S STRIP — ITS **PRECEDING SIBLING** IN THE ARRANGEMENT ROW ------------
                  // **ON THE ZONE'S LEFT EDGE**, the edge facing the stage, so the same leftward pointer GROWS this
                  // zone's width where it SHRANK `left`'s — the sign is one coefficient negated (`-1`), `D-238`'s own
                  // form. It is the `right` zone's PRECEDING sibling and the stage's FOLLOWING one, which is the one
                  // place the two affordances' boxes could meet; the strip wins there because it is the later sibling
                  // in markup order (the design's §6 corner, stated rather than measured).
                  zoneStripNodeOf(ZONE_RIGHT_STRIP_ID, verticalZoneStripStyle),
                  // ---- THE RIGHT SIDEBAR ZONE (`D-185`) -------------------------------------------
                  {
                    type: 'div',
                    css: { id: 'right', style: verticalZoneStyle },
                    props: { id: 'right' },
                  },
                ],
              },
              // ---- THE `bottom` ZONE'S STRIP — ITS **PRECEDING SIBLING** IN THE ROOT COLUMN ------------
              // **ON THE ZONE'S TOP EDGE**: the figure is the distance from the window's FOOT up to that edge
              // (`D-185`), so the same downward pointer SHRINKS this zone's height where it grew `top`'s — sign
              // `-1`, axis `y`. It stands BEFORE the zone it moves and it is not inside it, so a `bottom` zone the
              // record drags to `0` is still a zone a person can pull back out.
              zoneStripNodeOf(ZONE_BOTTOM_STRIP_ID, horizontalZoneStripStyle),
              // ---- THE BOTTOM ZONE (`D-185`) -----------------------------------------------------
              // The second full-width zone: it fixes the HEIGHT and leaves each pane's width adjustable, and it
              // authors no figure (`D-174`, `D-191`).
              {
                type: 'div',
                css: { id: 'bottom', style: horizontalZoneStyle },
                props: { id: 'bottom' },
              },

              // THE OPENER — an authored `button` with an authored `click` body, so it is `list_targets`-visible and
              // `provident.dispatch`-reachable exactly as every other control in this file is. **IT STAYS THE APP
              // ROOT'S LAST CHILD** across this pass's re-parent (`A-5`, `D-178` §3): the overlay LAYER below is its
              // FOLLOWING SIBLING, and moving either would put the modal's own controls inside the subtree that
              // `inert` is written to.
              {
                type: 'button',
                css: { id: OVERLAY_OPEN_ID, classes: ['btn', 'overlay-open'] },
                props: { id: OVERLAY_OPEN_ID },
                content: 'Security & settings…',
                handlers: [{ name: 'overlay-open', event: 'click', body: overlayToggleBody() }],
              },
            ],
          },
          // ---- THE OVERLAY LAYER (`D-113`) ------------------------------------------------
          // A SIBLING of the authored app root, never a child of it: `inert` on the root blocks the app's general
          // surface and leaves these three nodes operable. The scrim closes on a click and the dialog carries the
          // close control, so the modal is escapable by the operator's own gesture and not only by a dispatch.
          {
            type: 'div',
            css: { id: OVERLAY_SCRIM_ID, classes: ['overlay-scrim'], style: overlayScrimStyle },
            props: { id: OVERLAY_SCRIM_ID, role: 'presentation' },
            content: '',
            handlers: [{ name: 'overlay-scrim-close', event: 'click', body: overlayVerbBody(OVERLAY_VERB_CLOSE) }],
          },
          {
            type: 'section',
            css: { id: OVERLAY_DIALOG_ID, classes: ['card', 'overlay-dialog'], style: overlayDialogStyle },
            props: { id: OVERLAY_DIALOG_ID, role: 'dialog', 'aria-modal': 'true' },
            children: [
              { type: 'h2', content: 'Security & settings' },
              // THE DIALOG'S TWO AUTHORED PANES. They carry the APP GRAPH's words and no route: the capability UI is
              // the isolated pane graph's, and `tests/isolation-adversarial-e2e.test.ts` refuses its ids and its words
              // here by name. What the modal is FOR is the frame these two sections name, and the overlay's whole
              // measurable achievement is that the app behind it is inert while they are up.
              {
                type: 'section',
                css: { id: OVERLAY_SECURITY_PANE_ID, classes: ['overlay-pane'], style: overlayPaneStyle },
                props: { id: OVERLAY_SECURITY_PANE_ID, role: 'pane' },
                children: [
                  { type: 'p', css: { classes: ['hint'] }, content: 'Security' },
                  {
                    type: 'div',
                    css: { id: 'overlay-security-line', classes: ['overlay-status'] },
                    props: { id: 'overlay-security-line' },
                    content: 'operator panes — manual UI, never over MCP',
                  },
                ],
              },
              {
                type: 'section',
                css: { id: OVERLAY_SETTINGS_SURFACE_ID, classes: ['overlay-pane'], style: overlayPaneStyle },
                props: { id: OVERLAY_SETTINGS_SURFACE_ID, role: 'pane' },
                children: [
                  { type: 'p', css: { classes: ['hint'] }, content: 'Settings' },
                  {
                    type: 'div',
                    css: { id: 'overlay-settings-line', classes: ['overlay-status'] },
                    props: { id: 'overlay-settings-line' },
                    content: 'appearance and operator configuration',
                  },
                ],
              },
              // THE STATE CARRIER — the ONE graph-readable node carrying A WORD ABOUT THE PANE, the `theme-setting`
              // precedent. **IT HAS TWO AUTHORS AND THE SPLIT IS THE DESIGN** (`D-131`): an ACT's body writes the state
              // the operator ASKED FOR (`open`/`close`) and the DELIVERY writes the state the STORE HOLDS
              // (`open`/`closed`), so between the two the node always reads what was last true and the toggle body can
              // resolve the next target from it. It renders as its own word, as that node does.
              {
                type: 'div',
                css: { id: OVERLAY_STATE_ID, classes: ['overlay-state'] },
                props: { id: OVERLAY_STATE_ID },
                content: OVERLAY_INITIAL_STATE,
              },
              {
                type: 'button',
                css: { id: OVERLAY_CLOSE_ID, classes: ['btn', 'overlay-close'] },
                props: { id: OVERLAY_CLOSE_ID },
                content: 'Close',
                handlers: [
                  { name: 'overlay-close', event: 'click', body: overlayVerbBody(OVERLAY_VERB_CLOSE) },
                  { name: 'overlay-escape', event: 'keydown', body: overlayVerbBody(OVERLAY_VERB_ESCAPE) },
                ],
              },
            ],
          },
          // ---- THE ROW PROTOTYPE (`D-179`, `D-182`, `D-199`; design §4) -------------------------
          // **A DEF-ROOT `component` NODE, AND `template.root`'s LAST CHILD** — the position is load-bearing and
          // does not move. The engine's mint resolves it BY NAME — `component.reference` IS
          // `TABS_ROW_PROTOTYPE_ID` — and without it the mint answers `rows-prototype-unresolved` and a row has no
          // shape at all. It authors NO `css.id` (the mint reaches it by NAME, never by address), NO `content` (a
          // row's label is PAINTED off the record), and it stands OUTSIDE the app root, in the region the modal's
          // `inert` write cannot reach — the same choice the overlay layer makes below, for the same reason
          // (`D-113`, `D-178` §3). **ITS READER, IN ONE LINE**: the engine's mint, by name (`AL-2`'s first
          // measurement).
          //
          // **`D-199`'s CORRECTION, AND BOTH HALVES OF IT ARE LOAD-BEARING.** A REFERENCE ALONE BINDS A CONSUMER:
          // it publishes a `target` anchor, and with nothing in the tree providing that name every load emitted
          // `unresolved-reference` and the mint refused `rows-prototype-unresolved` (`D-199` measured both). The
          // PROVIDER half `D-179`'s spike carried and this shape lacked is the INLINE `component.value` — *the def
          // that makes the name resolvable*, resolved on the path `D-179` recorded: the def-ROOT prototype
          // `defRootPrototypeFor` answers, the node the mint copies a row's `type` and `css` off. So the `value`
          // is ONE ROW's def, spelled in THIS app's vocabulary and not the spike's: a **`div`** — the tabs row is
          // a `div` in the top-bar's flex row and the app's other authored click targets (the menu items) are
          // `div`s, so no `li` and no list the app does not author — carrying the one **`tab-row`** class this
          // prototype and design §2 already spell. **IT AUTHORS NO `props`**, and that is measured rather than
          // stylistic: the mint takes only `type` and `css` off the shape, so a row's label, its `props.active`
          // marker and its `keyField` datum are the PAINT's and the row DATUM's, and an authored `props` here
          // would be dead data.
          // AND THE PROVIDER IS ADDRESSABLE: `props.id` is the prototype's own name (`D-179`'s
          // `prototype-provider` precedent, and `D-199`'s other half), so the def-root has an address a
          // diagnostic can name — beside the `css` it still declares, and with no `css.id` added.
          // **AND THE CHIPS' `no-drag` STANDS IN THE DEF'S `css` AND NOT BESIDE IT**: the mint copies a
          // row's `css` off the def-ROOT prototype, which translate mints from `component.value.css`
          // (`translate.js:665-675`), and `mintRowNode` builds each row as
          // `css: fields.css ?? shape.css` (`ops.js:477`) — so this one entry is read onto EVERY minted
          // chip, where the same entry on the node's own `css` would be copied nowhere. It is the chips
          // that must not drag, never the row's box: a `no-drag` on `#tab-rows` blanketed the whole bar
          // and the window could not be moved at all.
          {
            type: 'div',
            css: { classes: ['tab-row'] },
            props: { id: TABS_ROW_PROTOTYPE_ID },
            component: {
              reference: TABS_ROW_PROTOTYPE_ID,
              value: {
                type: 'div',
                css: { classes: ['tab-row'], style: { '-webkit-app-region': 'no-drag' } },
              },
            },
          },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}