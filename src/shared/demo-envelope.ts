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

/** The gutter handle's own axis mapping, keyed by the AUTHORED axis token the affordance's
 *  axis seam answers for the handle (`gutter-vertical`). */
const GUTTER_CURSORS: Readonly<Record<string, string>> = { 'gutter-vertical': 'col-resize', 'gutter-horizontal': 'row-resize' }
/** The authored status node's engine id — the ONE node the DELIVERY's read-out turn patches
 *  (`renderPaneSize`, `D-164`: the sink's `commit`-route write this docblock once named is gone).
 *  It is deliberately OUTSIDE the affordance's own node, so the write patches a peer and never the
 *  handle the listeners are attached to (`§2.3` row 15, `§2.6` item 5). The node authors NO
 *  `content` of its own — the read-out is the delivery's (`F3`, `D-129`). */
export const GUTTER_STATUS_ID = 'gutter-status'
/** The authored affordance node's id — the handle the pointer is over. */
export const GUTTER_AFFORDANCE_ID = 'gutter-vertical'
/** The authored target node's id — the pane the affordance resizes. */
export const GUTTER_TARGET_ID = 'gutter-target'

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
 *  flow declarations and claim nothing else. THE TWO OVERLAY-LAYER STYLES BELOW ARE THE GEOMETRY (`D-120`), and they
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
const appRootStyle: Record<string, string> = { display: 'block' }
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


/** The demo legacy envelope. */
export function demoEnvelope() {
  /** The authored `css.style` OBJECTS are the two spots where the literal's inferred shape has to
   *  be pinned: `serializeStyle` (`translate.js`) turns an OBJECT of `k: v` pairs into the kebab
   *  `k: v;` CSS string at translate time, and its declared `Record<string, string>` would
   *  otherwise be inferred as a union of optional-`undefined` members across the two nodes. */
  const handleStyle: Record<string, string> = { cursor: 'col-resize', width: '200px' }
  const paneStyle: Record<string, string> = { display: 'flex', 'align-items': 'stretch' }
  const targetStyle: Record<string, string> = { width: '100px', 'min-height': '28px' }
  return {
    template: {
      root: {
        type: 'div',
        css: { classes: ['demo-shell'] },
        children: [
          // ---- THE AUTHORED APP ROOT (`D-113`) -------------------------------------------
          // EVERY general-app card below stands INSIDE this node, and this node is what the overlay's inert
          // declaration is written to. The opener is its LAST child on purpose: while the overlay is closed the
          // root is not inert and the button is pressable; while it is open the root IS inert and the button is
          // not — the modal's own controls live in the layer BELOW, outside this subtree.
          {
            type: 'div',
            css: { id: APP_ROOT_ID, classes: ['app-surface'], style: appRootStyle },
            props: { id: APP_ROOT_ID },
            children: [
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
              // ---- gutter card (U-GUTTER-UI) ----------------------------------
              // The affordance / target / status triple, authored as DATA: the handle the pointer is
              // over (its own `pointerdown` handler keeps it `list_targets`-visible), the pane it
              // resizes, and the read-out the wiring's ONE `state-slice` write patches — the read-out
              // authoring NO figure of its own, and standing EMPTY until its first delivery paints it
              // (`F3`, `D-129`).
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
                      {
                        // (a) THE AFFORDANCE — `§2.1` item 7(a): an authored `css.id`, an authored
                        // `css.classes` list, an authored `css.style` carrying THE BASE `cursor`
                        // DECLARATION **AND NO GEOMETRY CLAIM**, an authored `props.id`, and the
                        // authored `pointerdown` handler. L-3's live finding was exactly this missing
                        // declaration: the element rendered `<div … class="gutter-handle"
                        // data-node-id="node-12">` with NO `cursor` and no `style` attribute at all,
                        // so `U-2`(a) could not be satisfied by any shipped instrument. The declared
                        // degradation the module carries (no pointer CAPTURE) means a drag that leaves
                        // the handle's own box loses its reading (`§2.6` item 4) — which is why the
                        // handle's box must be a real, pressable strip: it STRETCHES to the row's own
                        // height through the pane's authored flex declarations, and its own base size
                        // declaration gives the strip its WIDTH. Measured live (L-2): without a width
                        // the handle's rendered box was `w=0, h=44` — an empty `div` whose width comes
                        // from its (empty) content — so hit-testing could not land on it at all and a
                        // real CDP press at its centre produced ZERO effect. The TARGET's own base size
                        // (item 7(b) below) is the pane the drag resizes and the node the preview
                        // writes; the handle's is the pointer's landing strip, and it has to be WIDE
                        // enough to hold a drag: this composition installs NO pointer capture (`§2.6`
                        // item 4 — the capture opt-in is an `E3`-SIDE owed item), so the session's
                        // tracking listeners are LOCAL to the element and a drag that leaves the
                        // handle's box loses its reading (the spec's own honest UX consequence).
                        type: 'div',
                        css: { id: GUTTER_AFFORDANCE_ID, classes: ['gutter-handle'], style: handleStyle },
                        props: { id: GUTTER_AFFORDANCE_ID, axis: GUTTER_AFFORDANCE_ID },
                        content: '',
                        handlers: [{ name: 'gutter-drag', event: 'pointerdown', body: GUTTER_DRAG_BODY }],
                      },
                      {
                        // (b) THE TARGET — `§2.1` item 7(b): an authored `css.id`, an authored
                        // `css.style` carrying a BASE SIZE DECLARATIVE, and an authored `props.id` —
                        // and NOTHING ELSE. The pre-drag size and the bounds pair that once stood on
                        // the PANE's `props` as `size`/`min`/`max` are `['panes']`'s since `D-117` and
                        // left the node at `F11` (`D-129`), so no seam reads a geometry off an element
                        // any more. An authored `props` entry still renders as a BARE ATTRIBUTE (the
                        // pane's `resizable`, the handle's `axis`), which is what the surviving seams
                        // read (L-6/ADV-GU-7: those reads used to go through `dataset[...]` and every
                        // one missed).
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
                    // pane's size is a shape `['panes']` at `file` owns — `panesMustStand` repairs it
                    // and `paneGeometryIn` answers the measured default for a pane the family does
                    // not name — and the literal's only reader was the paint's own comparison, so it
                    // bought a skipped write at the price of a figure the store can falsify. NOTHING
                    // REPLACES IT — not `''`, not `'0'`, not a placeholder word, which would be a new
                    // local default on the same shape: the read-out reads EMPTY until a `'record'`-arm
                    // delivery paints it, which is never wrong, and that paint is `renderer.ts`'s
                    // `renderPaneSize` (`S1`–`S4`) — the delivery is the read-out's only author.
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
              // ---- theme card (U-THEME-CONTROL, docs/specs/theme-control.md §2.1) -------------------
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
              // ---- the tab record's two authored terminal pages (U-STORE-TABS-RECORD) ---------
              // THE LANDING PAGE and THE ERROR PAGE, `page`-roled TERMINALS rather than list rows
              // (`§0A` item 5). They are the record's own terminals and they are AUTHORED HERE, one
              // node each with its own authored structure, its own authored handler STRING and its
              // own `data-*`-free declarative styling — the same envelope-data form the gutter and
              // theme cards above use. NEITHER page carries state: each renders from the record, and
              // the wiring's bounded role reads the record's witness and drives the node (`§3.5`
              // items 1/3). The two ids are the declared pairs `PAR-9` names and `T1` must read from
              // the contract rather than re-declare.
              {
                type: 'section',
                css: { id: TABS_LANDING_PAGE_ID, classes: ['card', 'tabs-page'], style: tabsPageStyle },
                props: { id: TABS_LANDING_PAGE_ID, role: 'page' },
                content: 'Landing',
                handlers: [{ name: 'tabs-landing-page-open', event: 'click', body: TABS_LANDING_PAGE_BODY }],
              },
              {
                type: 'section',
                css: { id: TABS_ERROR_PAGE_ID, classes: ['card', 'tabs-page'], style: tabsPageStyle },
                props: { id: TABS_ERROR_PAGE_ID, role: 'page' },
                content: 'Tab error',
                handlers: [{ name: 'tabs-error-page-open', event: 'click', body: TABS_ERROR_PAGE_BODY }],
              },

              // THE OPENER — an authored `button` with an authored `click` body, so it is `list_targets`-visible and
              // `provident.dispatch`-reachable exactly as every other control in this file is.
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
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}