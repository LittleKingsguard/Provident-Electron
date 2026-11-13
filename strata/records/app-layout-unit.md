# app-layout — unit record

**The unit that surfaced these findings** · `provident-ssr` defects are **upstream-owned and never patched here** (`AGENTS.md`'s non-negotiable, `D-5`, `D-52`). Each finding carries its symptom, its reproduction, its suspected root cause and its proposed fix shape, and **stays live until the package discharges it** — a discharged finding keeps its own row and says what discharged it, the way `ST-F1` does in `store-tabs-record-unit.md`.

## 1. Package findings — `provident-ssr`, upstream-owned, never patched (D-5)

**AL-F1 — A NAME-CONSUMED PROVIDER IS DROPPED FROM RENDER, TAKING ITS WHOLE SUBTREE WITH IT — so positional inheritance cannot be used for a provider that is also an element.** Surfaced 2026-11-12 while replacing the renderer's written `props.zone` attribute with the engine's own component resolution (`D-253` … `D-264`), on the user's direction: *"This is what the provident-ssr component resolution behavior is for, inheriting information like class names and css from parent data based on the position in the tree."*

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

**It is the difference between styling that cannot go stale and styling that is written and re-written.** This repo has **five rows** (`D-253`, `D-260`, `D-262`, `D-263`, `D-264`) patching an attribute-plus-paint arrangement — a cold-order fallback, a preview paint, a per-move guard, a total restore — each of which exists only because the fact describing a pane's zone is **written** rather than **derived from where the node stands**. **One predicate upstream deletes that class of defect here.** A fork reading this should know that is the trade, not merely a nicety.

### Discharge state

**OPEN as of 2026-11-12**, measured on the installed `provident-ssr` in `/media/ryanr/Shared Files/Projects/Provident-Electron`; not patched, per `D-5`. **What this unit does meanwhile** is stated in its own rows: the pane's zone stays a **painted `props.zone` attribute** (`D-253`), the sheet keys the zone-aware forms on `[zone]:has(> .pane-grab)` so every pane gets them by position within that mechanism, and the round trip was measured byte-identical across three consecutive trips (`D-264`'s evidence). **If the package narrows the predicate, this finding is re-read against the new version and either discharged with that version named or re-stated with what remains.**
