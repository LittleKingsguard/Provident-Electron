# app-layout — unit record

**The unit that surfaced these findings** · `provident-ssr` defects are **upstream-owned and never patched here** (`AGENTS.md`'s non-negotiable, `D-5`, `D-52`). Each finding carries its symptom, its reproduction, its suspected root cause and its proposed fix shape, and **stays live until the package discharges it** — a discharged finding keeps its own row and says what discharged it, the way `ST-F1` does in `store-tabs-record-unit.md`.

## 1. Package findings — `provident-ssr`, upstream-owned, never patched (D-5)

**AL-F1 — A NAME-CONSUMED PROVIDER IS DROPPED FROM RENDER, TAKING ITS WHOLE SUBTREE WITH IT — so positional inheritance cannot be used for a provider that is also an element.** **⟶ PARTLY DISCHARGED by `provident-ssr@0.5.2`: the ELEMENT half is discharged on the installed bytes; the POSITION half of the seam escape remains open and is upstream's own `R-VPD-1`.** Surfaced 2026-11-12 while replacing the renderer's written `props.zone` attribute with the engine's own component resolution (`D-253` … `D-264`), on the user's direction: *"This is what the provident-ssr component resolution behavior is for, inheriting information like class names and css from parent data based on the position in the tree."*

### What is correct, and must not be lost in the fix

The resolution mechanism the direction depends on **works, and was measured working**:
`fitReference` resolves a consumer's binding **by tree position**, walking own → descendants → then **`for (let cur = node.parent; cur; cur = cur.parent)`**, nearest ancestor first (`dist/core/resolve.js:180-227`); and `applyDerived` **appends** the resolved classes rather than replacing them (`evaluatedCss = { ...cs.css, classes: [...host, ...injected] }`, `dist/core/derived.js:332`). So a consumer inherits class names **from whichever ancestor it currently stands under**, which is exactly the property that cannot go stale.

### Symptom

A **zone node that provides styling for its children** — carrying `component: { reference: 'zone-format', value: ['zone-sidebar-format'] }` — **disappears from the compiled tree when its panes consume it**, and the panes it contained are **orphaned**: they are not re-parented, they are not rendered.

### Reproduction, measured on the installed package in a real renderer

Each pane authors `component: { reference: 'zone-format', target: 'css.classes' }`; each zone authors a `component` value under the same `reference`.

- `rootNode.compile(nodes)` answers **`actionable = [app, pane-menus]`** — **`#top` is absent**, `app.childOrder` is `['node-2']`, and **`node-2` is never created**.
- **While the inheritance itself is correct**: the pane's own `css.classes` read `['pane', 'in-top']` — the binding resolved against the position the pane had. **So the value is right and the element is gone.**

### Suspected root cause

`dist/core/node.js:1223`:

```js
if (hasAnyTarget && isResolutionParticipant(node) && !isSeamProvider(node)) continue;
```

with its own docblock at `dist/core/node.js:1154` stating the intent: **"a PURE provider (a source-only node) consumed by name is dropped from render — it is a value holder, never an element."** A duplex is dropped too, because it carries no `target`-role anchor.

**The predicate is total**: it drops **every** name-consumed provider, whether or not the node stands in the family with children of its own. The docblock's sentence is true of a `rows-mint` prototype and **false of a zone**, which is a value holder **and** an element.

### The seam escape keeps the zone and loses the position — a second finding

`target: 'type'` renders the zone (**the shell collapses**) **and** puts the definition's classes on the pane's own element — **but the definition is read BY NAME**: `providerValueFromLink(link)` / `defRootPrototypeFor(link)` resolve **one prototype per `reference`** (`dist/core/registry.js:132-135`). Measured with two zones authoring the same `reference` and different values: **the pane standing in `top` emitted `classes: ['in-left']` — the last-registered prototype — while its compiled `bindings` said `in-top`.** **The emitted format contradicts the position**, which is the one property the whole approach exists to guarantee. So the seam is not a substitute for the fix, it is a second symptom of the same name-versus-position conflation.

### Proposed fix shape

**Narrow the drop predicate so it asks whether the provider is an ELEMENT rather than whether it participates.** The smallest change that carries the case:

- **drop a name-consumed provider only when it has NO FAMILY PARENT** — a node whose parent is the family root is a value holder (the `rows-mint` prototype shape); a node with a family parent is an element and survives;

or, if that is too broad for the shapes already shipped:

- **an explicit opt-in on the binding** — `component: { …, provide: 'element' }` — under which the provider renders and its value is still consumed by name. **This is additive and cannot change any existing consumer's behaviour.**

**The larger alternative, named so it can be rejected on cost**: make `materializeSeam`'s definition read **nearest-ancestor** rather than per-link and mint **one def-root prototype per provider**. That fixes both findings at once — but it changes how every seam in the package resolves, and this project's need is one opt-in.

### Why this matters beyond this unit

**It is the difference between styling that cannot go stale and styling that is written and re-written.** This repo has **five rows** (`D-253`, `D-260`, `D-262`, `D-263`, `D-264`) patching an attribute-plus-paint arrangement — a cold-order fallback, a preview paint, a per-move guard, a total restore — each of which exists only because the fact describing a pane's zone is **written** rather than **derived from where the node stands**. **One predicate upstream deletes that class of defect here — and on `0.5.2` it has**: this pass deletes the attribute half of `D-253`/`D-263` and the sheet's attribute keys (`D-264`'s own next step, whose row L0 files), leaving the fill/figure/scroll paint that a class was never going to carry. A fork reading this should know that is the trade, not merely a nicety.

### Discharge state — **PARTLY DISCHARGED, 2026-11-13, on the installed `provident-ssr@0.5.2`**

**THE FIRST HALF IS DISCHARGED AND THE VERSION IS NAMED.** `0.5.2` (`9cfea9f`, `VALUE-PROVIDER-RENDER-DISPOSITION`) narrows the compile emit gate from *any name-consumed provider* to *a runtime-minted VALUE RECORD only* — `node.js`'s emit gate is now `hasAnyTarget && isResolutionParticipant(node)` with `const seamExempt = isSeamProvider(node)` evaluated **first** and `if (!seamExempt && node.valueRecord === true)` as the **last** conjunct, and its docblock states *"an AUTHORED provider IS an element and renders"*. **`valueRecord` is written by ONE site and no other** — `ops.js`'s `mintRowNode` (`node.valueRecord = true`), the rows-mint family — so an authored node reads `undefined` and can never be dropped by this predicate, and a document cannot forge the marker (`parseNodeState`'s key whitelist). **Re-measured on the installed `0.5.2` dist with this record's own reproduction**: `compile()` answers **`actionable = [app, top, pane-menus]`** — **`#top` PRESENT**, `app.childOrder = ['node-2']` with `node-2` **CREATED**, `top.childOrder = ['pane-menus']` — and the emitted markup carries the zone as a `<section>` with its pane inside it, the pane reading `css.classes = ['pane', 'zone-sidebar-format']`. **So the value was right AND the element is now there.**

**AND THE SECOND FINDING MOVED FOR `css.classes` AND DID NOT MOVE FOR THE SEAM.** With TWO zones authoring the SAME `reference` and different values, the panes now read **their own position's class** — `top`'s pane `['pane','in-top']`, `left`'s pane `['pane','in-left']` — and the reading is **identical with the document order of the two zones FLIPPED**, so **the position wins and the last-registered prototype no longer decides**. That is the second half of this finding measured GREEN on the path this unit uses. **The seam escape (`target: 'type'`) is the half that did not move**: with `top` authored first and the pane standing in `top`, the pane's compiled `bindings` say `in-top` while its **emitted element carries `['in-left']`** — the last-registered def root — exactly as filed, and upstream records it as **`R-VPD-1`, "NOT fixed here"**, with `C5` exclusion 3 stating that no position index is supplied. **SO WHAT REMAINS OF AL-F1 IS THE SEAM'S NAME-KEYED DEF-ROOT RESOLUTION, UPSTREAM-OWNED AND NOT PATCHED HERE (`D-5`)**; the proposed fix shape stands unchanged (nearest-ancestor definition reads and one def-root per provider), and it is not on this app's path: the binding authored below consumes `css.classes`, which is the seam this unit uses and the one that resolves by position.

**Also measured on `0.5.2`, and it bounds what this unit could ever use**: **`css.classes` is still the only css seam** — `target: 'css.style.<key>'` is a BLOCKED css-family target (`component-target-skipped`, measured) — so a pane can inherit CLASS NAMES and no declaration, which is why the fill/figure/scroll stay the paint's (below).

### What this unit does with the discharge (`D-264`'s next step)

**THE PANE'S ZONE FORMAT IS NOW INHERITED BY POSITION AND NOTHING WRITES IT.** Each of the four zones authors `component: { reference: 'zone-format', value: ['pane-in-<zone>'] }`; the app root authors the STAGE's value (`pane-in-stage`, so a stage pane resolves instead of emitting `unresolved-reference` on every compile — measured); each of the three panes authors the one-line consumer `component: { reference: 'zone-format', target: 'css.classes' }`. **`css.classes` is the seam and the class is the fact**, so moving a pane changes the class it wears on the move's own render, with no write — and the sheet's zone-aware rules key on `.pane-in-left`/`.pane-in-right`, so **a FOURTH pane authored with that one consumer inherits the sidebar form with no CSS edit**, which is `D-264`'s `:has(> .pane-grab)` property now structural (and that guard is deleted with its reason: the twelve drop overlays can never wear a consumed class).

**DELETED, each with what it removes**: the pane's painted **`props.zone`** attribute (`renderer.ts`'s pane arm — the second mutation `paintStyle` carried, so `paintStyle` now takes no attribute list at all); **`declaredZoneNameOf`**, the closed-four reader that existed only to spell it; **`publishedZoneOf`**, the preview's guard, re-pointed at the pane's `style` text because the style is the only surface statement the preview still needs; the sheet's `[zone=…]:has(> .pane-grab)` keys and the guard. **KEPT, because a class carries no declaration**: the pane's ADJUSTABLE FIGURE (the RECORD's, `D-243`) and the fill/scroll RELATION (the LAYOUT's, `PANE_FILL`/`LAYOUT_ZONE_AXES`) are still written by `panePaintOf` on every delivery and by the preview mid-gesture — measured, one style write per zone transition and zero attribute writes across a whole crossing. **KEPT, because the inheritance does not cover it**: `D-262`'s declared-place fallback for the ORDER (`['panes'].index` and the engine's `move` — a class says WHICH zone, never where among its panes), and the drops' authored `props.zone`, which is the ACT's destination operand and not a formatting key. **Measured after, on a fresh profile with real drags**: `#pane-menus` in `top` reads `pane-in-top`, the stage's pane reads `gutter-pane pane-in-stage`, a `['panes','pane-menus','zone']` write to `left` repaints it `pane-in-left` (`width: 100%; height: 100px; overflow-y: auto`) and the write back restores **a byte-identical rendered HTML**; mid-drag the pane carries `pane-in-left` at `[0,190,120,100]` while the pointer is over `left` and returns to `pane-in-top` off-zone before any release, **with the record untouched by the gesture**.

**If a later package version resolves the seam's def root by position, the remaining half is re-read here the same way and this finding closes.**
