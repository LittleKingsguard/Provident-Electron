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
  readonly moveTypeOf: () => string
} {
  /** The handle's authored axis token, read from DATA (`data-node-id`'s companion on the card:
   *  the authored `css.id`), never from a gesture or a coordinate. */
  const axisOf = (element: unknown): unknown => {
    const holder = element as { readonly dataset?: Record<string, unknown> } | null | undefined
    const authored = holder?.dataset?.['axis']
    return typeof authored === 'string' && authored.length > 0 ? authored : GUTTER_AFFORDANCE_ID
  }
  const numberFrom = (element: unknown, key: string, fallback: number): number => {
    const holder = element as { readonly dataset?: Record<string, unknown> } | null | undefined
    const raw = holder?.dataset?.[key]
    const parsed = typeof raw === 'string' ? Number(raw) : Number.NaN
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return {
    /** THE SIZE the drag asks for: the pointer's own coordinate minus the pre-drag size, which
     *  is the mapping the demo's authored pane declares. */
    sizeFromPointer: (pointer: { readonly x: number }, start: number): number => pointer.x - start,
    axisOf,
    /** THE CURSOR the axis token maps to — a VALUE in this DATA file, never in the module. */
    cursorOf: (token: unknown): unknown => ({ cursor: GUTTER_CURSORS[String(token)] }),
    /** THE VISIBLE PREVIEW: this example answers NO presentation write of its own — the wiring
     *  owns the pane's authored reading and patches it through the managed channel, so the seam
     *  here is the declared degradation of a presentation hook the fork did not implement. */
    applyPreview: (_state: unknown): void => undefined,
    /** THE CURSOR: the handle's own declaration is written through its style member. */
    applyCursor: (element: unknown, declaration: string | undefined): void => {
      const holder = element as { readonly style?: Record<string, unknown> } | null | undefined
      if (holder === null || holder === undefined || holder.style === null || holder.style === undefined) return
      holder.style['cursor'] = declaration === undefined ? '' : declaration
    },
    /** THE PRE-DRAG SIZE: the pane's authored starting size, read from DATA. */
    startSizeOf: (element: unknown): number => numberFrom((element as { readonly parentElement?: unknown } | null | undefined)?.parentElement, 'size', 100),
    /** THE BOUNDS PAIR: the pane's authored minimum and maximum, read from DATA. */
    boundsOf: (element: unknown): { readonly min: number; readonly max: number } => {
      const pane = (element as { readonly parentElement?: unknown } | null | undefined)?.parentElement
      return { min: numberFrom(pane, 'min', 0), max: numberFrom(pane, 'max', 200) }
    },
    /** THE RESIZABILITY: the authored pane declares it. */
    resizableOf: (element: unknown): boolean => {
      const pane = (element as { readonly parentElement?: unknown } | null | undefined)?.parentElement
      const holder = pane as { readonly dataset?: Record<string, unknown> } | null | undefined
      return holder?.dataset?.['resizable'] !== 'false'
    },
    /** THE OPTIONAL POINTER RESOLVER: the example delegates to the affordance's own TOTAL gate
     *  by answering `null`, which makes every observed move INVALID — the declared degradation
     *  of an unimplemented optional seam, never a throw. A fork owning its event channel
     *  supplies its own. */
    pointerOf: (): { readonly x: number; readonly y: number } | null => null,
    /** THE OPTIONAL MOVE TYPE: the session's OWN exported token, which the affordance imports. */
    moveTypeOf: (): string => 'pointermove',
  }
}

/** The demo legacy envelope. */
export function demoEnvelope() {
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
                css: { id: 'gutter-pane', classes: ['gutter-pane'] },
                props: { id: 'gutter-pane', size: '100', min: '0', max: '200', resizable: 'true' },
                children: [
                  {
                    type: 'div',
                    css: { id: GUTTER_AFFORDANCE_ID, classes: ['gutter-handle'] },
                    props: { id: GUTTER_AFFORDANCE_ID, axis: GUTTER_AFFORDANCE_ID },
                    content: '',
                    handlers: [{ name: 'gutter-drag', event: 'pointerdown', body: GUTTER_DRAG_BODY }],
                  },
                  {
                    type: 'div',
                    css: { id: GUTTER_TARGET_ID, classes: ['gutter-target'] },
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
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}