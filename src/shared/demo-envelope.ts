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
// of the eleven caller seams the affordance's wiring passes in. EVERY element below is
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
/** **THE MOVE-EVENT TYPE IS THE SESSION'S OWN TOKEN, NOT A LITERAL.** `§2.1` item 9 / `§R.2`
 *  `R-11` (condition `C-3`): *"the type the module registers for its own move listener must BE
 *  the type the session itself dispatches"*, and the affordance module already carries the
 *  session's exported constant as a `VALUE` import (`POINTER_TYPES.move`) for exactly that
 *  reason. The example therefore returns **the module's own fallback** by answering nothing at
 *  all: this is not a degradation (the module's fallback IS `POINTER_TYPES.move`), it is the
 *  example declining to hand-spell a token the session owns — a literal here would be the
 *  `B-9`/`P-9` false-green class (`§3.1 M-18`: the registered TYPE must match the session's). */
const GUTTER_MOVE_TYPE: undefined = undefined

/** The authored status node's engine id — the ONE node the wiring's `commit` route writes. It is
 *  deliberately OUTSIDE the affordance's own node, so the write patches a peer and never the
 *  handle the listeners are attached to (`§2.3` row 15, `§2.6` item 5). */
export const GUTTER_STATUS_ID = 'gutter-status'
/** The authored affordance node's id — the handle the pointer is over. */
export const GUTTER_AFFORDANCE_ID = 'gutter-vertical'
/** The authored target node's id — the pane the affordance resizes. */
export const GUTTER_TARGET_ID = 'gutter-target'

/** THIS REPO'S ONE EXAMPLE IMPLEMENTATION OF THE ELEVEN CALLER SEAMS. Each closure is the
 *  shape the affordance's own option set names (`GutterAffordanceOptions`); the wiring reads the
 *  handle's authored axis token, maps it to a cursor declaration, and supplies the pane's own
 *  bounds, pre-drag size and resizability. The example holds NO geometry of its own — it reads
 *  the handle's authored data attributes, which are DATA, and never a rendered measurement. */
export function gutterSeamExample(): {
  readonly sizeFromPointer: (pointer: { readonly x: number }, start: number) => number
  readonly axisOf: (element: unknown) => unknown
  readonly cursorOf: (token: unknown) => unknown
  readonly applyPreview: (state: unknown) => void
  readonly applyCursor: (element: unknown, declaration: string | undefined) => void
  readonly startSizeOf: (element: unknown) => number
  readonly boundsOf: (element: unknown) => { readonly min: number; readonly max: number }
  readonly resizableOf: (element: unknown) => boolean
  readonly pointerOf: (event: unknown) => { readonly x: number; readonly y: number } | null
  readonly moveTypeOf: () => undefined
} {
  /** **L-6/ADV-GU-7 — THE READ IS THE BARE ATTRIBUTE, BECAUSE THAT IS WHAT THE RUNTIME EMITS.**
   *  An authored `props` entry is rendered by the `DomAdapter` through its `css:<key>` /
   *  bare-attribute op path, so `props: {size: '100', min: '0', …}` lands on the element as the
   *  attributes `size="100" min="0" …` and NOT as `data-size="…"`. The example used to read
   *  `dataset['size']` there, which MISSES EVERY TIME, so every seam answered its hard-coded
   *  fallback and the card's authored data drove nothing. This helper reads the attribute the
   *  runtime actually emits, falls back to a `dataset` entry when a caller has one (the same
   *  value under the `data-*` spelling), and is TOTAL: a null / non-object / attribute-less /
   *  throwing-accessor holder answers `null` and never throws. */
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
  const numberFrom = (element: unknown, key: string, fallback: number): number => {
    const raw = attributeOf(element, key)
    const parsed = raw === null ? Number.NaN : Number(raw)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  /** THE PANE the handle and the target live in: the authored geometry carrier (its `props`
   *  carry the pre-drag size, the bounds pair and the resizability decision), reached as the
   *  handle's own parent — never a lookup, a selector or a created element. */
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
    /** THE VISIBLE PREVIEW: the concrete form is the WIRING's (`src/renderer/renderer.ts` — a
     *  transient inline-style write on the live provident-rendered TARGET element, `§2.5` item 4),
     *  so this example carries no presentation write of its own and hands the state straight on. */
    applyPreview: (_state: unknown): void => undefined,
    /** THE CURSOR: the handle's own declaration is written through its style member. */
    applyCursor: (element: unknown, declaration: string | undefined): void => {
      const holder = element as { readonly style?: Record<string, unknown> } | null | undefined
      if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
      holder.style['cursor'] = declaration === undefined ? '' : declaration
    },
    /** THE PRE-DRAG SIZE: the pane's authored starting size, read from the attribute the runtime
     *  emits for `props.size`. */
    startSizeOf: (element: unknown): number => numberFrom(paneOf(element), 'size', 100),
    /** THE BOUNDS PAIR: the pane's authored minimum and maximum, read the same way. */
    boundsOf: (element: unknown): { readonly min: number; readonly max: number } => {
      const pane = paneOf(element)
      return { min: numberFrom(pane, 'min', 0), max: numberFrom(pane, 'max', 200) }
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
    /** THE OPTIONAL MOVE TYPE: `undefined`, so the affordance module registers ITS OWN fallback —
     *  the session's exported token it already value-imports (`POINTER_TYPES.move`). */
    moveTypeOf: (): undefined => GUTTER_MOVE_TYPE,
  }
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
          // resizes, and the read-out the wiring's ONE `state-slice` write patches.
          {
            type: 'section',
            css: { id: 'gutter-card', classes: ['card'] },
            children: [
              { type: 'h2', content: 'Gutter (drag to resize)' },
              {
                type: 'div',
                css: { id: 'gutter-pane', classes: ['gutter-pane'], style: paneStyle },
                props: { id: 'gutter-pane', size: '100', min: '0', max: '200', resizable: 'true' },
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
                    // `css.style` carrying a BASE SIZE DECLARATIVE, and an authored `props.id`. The
                    // authored `props` below are the DRAG'S OWN DATA (`size` = the pre-drag size,
                    // `min`/`max` = the bounds pair, `resizable` = the decision) and the runtime
                    // emits them as BARE ATTRIBUTES on the element — which is what the demo seams
                    // read (L-6/ADV-GU-7: they used to read `dataset[...]` and every read missed).
                    type: 'div',
                    css: { id: GUTTER_TARGET_ID, classes: ['gutter-target'], style: targetStyle },
                    props: { id: GUTTER_TARGET_ID },
                    content: 'resizable pane',
                  },
                ],
              },
              {
                type: 'div',
                css: { id: GUTTER_STATUS_ID, classes: ['gutter-status'] },
                props: { id: GUTTER_STATUS_ID },
                content: '100',
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
  try { carried = value == null ? '' : String(value); } catch (e) { carried = ''; }
  try { ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: carried }]); } catch (e) { void e; }
}`,
                  },
                ],
              },
              {
                type: 'button',
                css: { id: 'theme-light', classes: ['btn'] },
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
  try { carried = value == null ? '' : String(value); } catch (e) { carried = ''; }
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
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}